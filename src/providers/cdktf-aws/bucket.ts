import {
  S3Bucket,
  S3BucketPublicAccessBlock,
} from "@cdktf/provider-aws/lib/s3";
import { Construct, IConstruct } from "constructs";
import { BucketProps, IBucket } from "../../pocix";
import { Capture } from "../../process/capture";
import { IProcessConsumer } from "../../process/process-consumer";
import { AWSSDKCaptureClient, AWS_SDK_MODULE } from "./base-client";
import { TFLambdaFunction } from "./cdktf-aws-factory";

export class TFBucket extends Construct implements IBucket {
  public public: boolean;
  public bucket: S3Bucket;

  constructor(scope: IConstruct, id: string, props?: BucketProps) {
    super(scope, id);

    this.public = props?.public ?? false;

    this.bucket = new S3Bucket(this, "Bucket");

    new S3BucketPublicAccessBlock(this, "BlockPublicAccess", {
      bucket: this.bucket.bucket,
      blockPublicAcls: !this.public,
      blockPublicPolicy: !this.public,
      ignorePublicAcls: !this.public,
      restrictPublicBuckets: !this.public,
    });
  }
}

export class BucketCaptureClient extends AWSSDKCaptureClient {
  constructor() {
    super({
      name: "aws-sdk-bucket-client",
      filePath: `${__dirname}/runtime/bucket-client.ts`,
      imports: [AWS_SDK_MODULE],
    });
  }

  bindToProcessConsumer(capture: Capture, consumer: IProcessConsumer): void {
    const target = capture.target as TFBucket;
    consumer.setEnvironment(this.getEnvName(capture), target.bucket.arn);

    // TODO only supports lambda for now
    if (consumer instanceof TFLambdaFunction) {
      consumer.lambdaRole.putInlinePolicy([
        {
          policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                // TODO this policy sucks
                Action: "s3:*",
                Effect: "Allow",
                Resource: target.bucket.arn,
              },
            ],
          }),
        },
      ]);
    }
    throw new Error("Method not implemented.");
  }
}
