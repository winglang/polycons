import { createReadStream } from "fs";
import { S3 } from "aws-sdk";
import { IBucketClient } from "../../pocix";

export class LocalAWSBucketClient implements IBucketClient {
  client: S3;

  constructor(readonly bucketArn: string) {
    this.client = new S3({
      apiVersion: "2006-03-01",
      endpoint: `http://localhost:4566`, // This two lines are
      s3ForcePathStyle: true, // only needed for LocalStack.
    });
  }
  async download(path: string): Promise<any> {
    return this.client
      .getObject({
        Bucket: this.bucketArn,
        Key: path,
      })
      .promise();
  }
  async upload(path: string, value: any): Promise<any> {
    return this.client
      .upload({
        Bucket: this.bucketArn,
        Key: path,
        Body: createReadStream(value),
      })
      .promise();
  }
}
