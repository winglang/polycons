import { SQS } from "aws-sdk";
import { IQueueClient } from "../../../pocix";

export class LocalAWSBucketClient implements IQueueClient {
  client: SQS;

  constructor(readonly queueArn: string) {
    this.client = new SQS({
      apiVersion: "2006-03-01",
      endpoint: `http://localhost:4566`, // This two lines are
      s3ForcePathStyle: true, // only needed for LocalStack.
    });
  }
  dequeue(): Promise<any> {
    return this.client
      .receiveMessage({
        QueueUrl: this.queueArn,
      })
      .promise();
  }
  enqueue(value: any): Promise<any> {
    return this.client
      .sendMessage({
        MessageBody: JSON.stringify(value),
        QueueUrl: this.queueArn,
      })
      .promise();
  }
}
