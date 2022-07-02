import { resolve } from "path";
import { IamRole, IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam";
import {
  LambdaFunction,
  LambdaInvocation,
} from "@cdktf/provider-aws/lib/lambdafunction";
import { S3Bucket, S3Object } from "@cdktf/provider-aws/lib/s3";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct, IConstruct } from "constructs";
import { std } from "../..";
import { FunctionProps, IFunction } from "../../pocix";
import { PolyconFactory } from "../../polycons";
import { TFBucket } from "./bucket";
import { TFQueue } from "./queue";

export class CDKTerraformAWSFactory extends PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    switch (qualifier) {
      case std.BUCKET_QUALIFIER:
        return new TFBucket(scope, id, props);
      case std.QUEUE_QUALIFIER:
        return new TFQueue(scope, id, props);
      case std.FUNCTION_QUALIFIER:
        return new TFLambdaFunction(scope, id, props);
      default:
        throw new Error("Qualifier not implemented.");
    }
  }
}

export class TFLambdaFunction extends Construct implements IFunction {
  public readonly lambda: LambdaFunction;
  public readonly lambdaRole: IamRole;

  constructor(scope: IConstruct, id: string, props: FunctionProps) {
    super(scope, id);

    const process = props.processBuilder.build(this);

    const asset = new TerraformAsset(this, "Asset", {
      // TODO HMM
      path: process.filePath,
      type: AssetType.FILE,
    });

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
    const lambdaArchive = new S3Object(this, "LambdaData", {
      bucket: bucket.bucket,
      key: "index.js",
      source: asset.path,
    });

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
  }

  setEnvironment(name: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  invoke(args?: any) {
    new LambdaInvocation(this, "Invoke", {
      functionName: this.lambda.functionName,
      input: args ? JSON.stringify(args) : "",
    });
  }
}
