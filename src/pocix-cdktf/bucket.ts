import { join } from "path";
import {
  S3Bucket,
  S3BucketPublicAccessBlock,
} from "@cdktf/provider-aws/lib/s3";
import { Construct, IConstruct } from "constructs";
import { BucketProps, IBucket } from "../pocix/bucket";
import { IFunction } from "../pocix/function";
import { Code, IClientRecipe } from "../polycons";
import { CdktfAwsFunction } from "./function";

export class CdktfAwsBucket extends Construct implements IBucket {
  public isPublic: boolean;
  private bucket: S3Bucket;

  constructor(scope: Construct, id: string, props: BucketProps) {
    super(scope, id);

    this.isPublic = props?.public ?? false;

    this.bucket = new S3Bucket(this, "Bucket");

    new S3BucketPublicAccessBlock(this, "BlockPublicAccess", {
      bucket: this.bucket.bucket,
      blockPublicAcls: !this.isPublic,
      blockPublicPolicy: !this.isPublic,
      ignorePublicAcls: !this.isPublic,
      restrictPublicBuckets: !this.isPublic,
    });
  }

  public addUploadHandler(_fn: IFunction): void {
    // implementation omitted
  }

  public capture(): IClientRecipe {
    const bucket = this.bucket;
    return {
      code: Code.fromFile(join(__dirname, "bucket-client.ts")),
      bindToCompute(name: string, consumer: IConstruct): void {
        if (consumer instanceof CdktfAwsFunction) {
          consumer.lambda.putEnvironment({
            variables: {
              [`__CAPTURE_SYM_${name}`]: bucket.arn,
            },
          });
          consumer.lambdaRole.putInlinePolicy([
            {
              policy: JSON.stringify({
                Version: "2012-10-17",
                Statement: [
                  {
                    // TODO this policy sucks
                    Action: "s3:*",
                    Effect: "Allow",
                    Resource: bucket.arn,
                  },
                ],
              }),
            },
          ]);
        }
      },
    };
  }
}
