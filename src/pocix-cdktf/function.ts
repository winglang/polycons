import { IamRole, IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam";
import {
  LambdaFunction,
  LambdaInvocation,
} from "@cdktf/provider-aws/lib/lambdafunction";
import { S3Bucket, S3Object } from "@cdktf/provider-aws/lib/s3";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { FunctionProps, IFunction } from "../pocix";

export class CdktfAwsFunction extends Construct implements IFunction {
  public readonly lambda: LambdaFunction;
  public readonly lambdaRole: IamRole;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);

    const process = props.process;

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

  setEnvironment(name: string, value: string): void {
    this.lambda.addOverride(`environment.variables.${name}`, value);
  }

  invoke(args?: any) {
    new LambdaInvocation(this, "Invoke", {
      functionName: this.lambda.functionName,
      input: args ? JSON.stringify(args) : "",
    });
  }
}
