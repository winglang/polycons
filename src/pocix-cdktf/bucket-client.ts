import { S3 } from "aws-sdk";
import { IBucketClient } from "../pocix";

export class LocalAWSBucketClient implements IBucketClient {
  private readonly client: S3;

  constructor(readonly bucketArn: string) {
    this.client = new S3({ apiVersion: "2006-03-01" });
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
        Body: value,
      })
      .promise();
  }
}
