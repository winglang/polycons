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
import { Capture, CaptureClient } from "../../process";
import { BucketCaptureClient, TFBucket } from "./bucket";
import { QueueCaptureClient, TFQueue } from "./queue";

export class CDKTerraformAWSFactory extends PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    switch (qualifier) {
      case std.BUCKET_QUALIFIER:
        const bucket = new TFBucket(scope, id, props);
        CaptureClient.register(bucket, new BucketCaptureClient());
        return bucket;
      case std.QUEUE_QUALIFIER:
        const queue = new TFQueue(scope, id, props);
        CaptureClient.register(queue, new QueueCaptureClient());
        return queue;
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

    const process = props.processBuilder.createProcess();

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

    process.captures.forEach((c: Capture) =>
      c.client.bindToProcessConsumer(c, this)
    );
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
