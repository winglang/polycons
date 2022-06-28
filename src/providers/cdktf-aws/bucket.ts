import {
  S3Bucket,
  S3BucketPublicAccessBlock,
} from "@cdktf/provider-aws/lib/s3";
import { Capture } from "aws-cdk-lib/assertions";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct, IConstruct } from "constructs";
import { BucketProps, IBucket } from "../../pocix";
import { ICaptureClient, NodeProcess } from "../../process-construction";
import { TFLambdaFunction } from "./cdktf-aws-factory";

export class TFBucket extends Construct implements IBucket {
  public public: boolean;
  public bucket: S3Bucket;

  /**
   *
   */
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
  bind(other: any): void {
    throw new Error("Method not implemented.");
  }

  bindCapture(obj: IConstruct): void {
    const bucketPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          // TODO terrible policy
          Action: "s3:*",
          Effect: "Allow",
          Resource: this.bucket.arn,
        },
      ],
    };
    if (obj instanceof TFLambdaFunction) {
      obj.lambdaRole.putInlinePolicy([
        {
          policy: JSON.stringify(bucketPolicy),
        },
      ]);
    }
  }
}
