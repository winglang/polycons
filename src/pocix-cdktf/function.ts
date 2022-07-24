import * as fs from "fs";
import * as path from "path";
import { IamRole, IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam";
import {
  LambdaFunction,
  LambdaInvocation,
} from "@cdktf/provider-aws/lib/lambdafunction";
import { S3Bucket, S3Object } from "@cdktf/provider-aws/lib/s3";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { buildSync } from "esbuild";
import { FunctionProps, IFunction } from "../pocix";
import { Capture, Process } from "../polycons";

export class CdktfAwsFunction extends Construct implements IFunction {
  public readonly lambda: LambdaFunction;
  public readonly lambdaRole: IamRole;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);

    const process = props.process;

    this.rewriteHandler(process);

    const lambdaRolePolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "sts:AssumeRole",
          Principal: {
            Service: "lambda.amazonaws.com",
          },
          Effect: "Allow",
        },
      ],
    };

    // Create unique S3 bucket that hosts Lambda executable
    const bucket = new S3Bucket(this, "AssetBucket");

    // Upload Lambda zip file to newly created S3 bucket
    let lambdaArchive: S3Object;
    if (process.code.path) {
      const asset = new TerraformAsset(this, "Asset", {
        path: process.code.path,
        type: AssetType.FILE,
      });
      lambdaArchive = new S3Object(this, "LambdaData", {
        bucket: bucket.bucket,
        key: "index.js",
        source: asset.path,
      });
    } else {
      lambdaArchive = new S3Object(this, "LambdaData", {
        bucket: bucket.bucket,
        key: "index.js",
        content: process.code.text,
      });
    }

    // Create Lambda role
    this.lambdaRole = new IamRole(this, "ExecRole", {
      assumeRolePolicy: JSON.stringify(lambdaRolePolicy),
    });

    // Add execution role for lambda to write to CloudWatch logs
    new IamRolePolicyAttachment(this, "ManagedPolicy", {
      policyArn:
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      role: this.lambdaRole.name,
    });

    // Create Lambda function
    this.lambda = new LambdaFunction(this, "Lambda", {
      functionName: id,
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "exports." + process.entrypoint,
      runtime: "nodejs14.x",
      role: this.lambdaRole.arn,
    });

    for (const [name, capture] of Object.entries(process.captures)) {
      capture.recipe.bindToCompute(name, this);
    }
  }

  private rewriteHandler(process: Process) {
    // TODO: handle inline text case
    const targetPath = process.code.path!;
    const targetDir = path.dirname(targetPath);
    const targetFile = path.basename(targetPath);

    // index.handler -> handler
    const entryExportName = process.entrypoint.split(".")[1];

    const newEntrypoint = path.join(targetDir, targetFile + ".new.js");
    fs.writeFileSync(
      newEntrypoint,
      `\
const CAPTURES = {
${Object.entries(process.captures)
  .map(([name, capture]) => `  ${name}: ${renderCapture(name, capture)},`)
  .join("\n")}
};

module.exports['${entryExportName}'] = function(originalEvent) {
    return require('${targetPath}')['${entryExportName}'](originalEvent, CAPTURES);
};`
    );

    buildSync({
      bundle: true,
      target: "node16",
      platform: "node",
      format: "cjs",
      entryPoints: [newEntrypoint],
      absWorkingDir: targetDir,
      outfile: targetPath,
      external: ["aws-sdk"],
      allowOverwrite: true,
    });
  }

  public setEnvironment(name: string, value: string): void {
    this.lambda.addOverride(`environment.variables.${name}`, value);
  }

  public invoke(args?: any) {
    new LambdaInvocation(this, "Invoke", {
      functionName: this.lambda.functionName,
      input: args ? JSON.stringify(args) : "",
    });
  }
}

function renderCapture(name: string, capture: Capture): string {
  if (capture.recipe.code.path) {
    return `require("${capture.recipe.code.path}")(process.env["__CAPTURE_SYM_${name}}"])`;
  } else if (capture.recipe.code.text) {
    return capture.recipe.code.text;
  } else {
    throw new Error("No code found in capture.");
  }
}
