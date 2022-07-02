import { LambdaEventSourceMapping } from "@cdktf/provider-aws/lib/lambdafunction";
import { SqsQueue } from "@cdktf/provider-aws/lib/sqs";
import { Construct, IConstruct } from "constructs";
import { IFunction, IQueue, QueueProps } from "../../pocix";
import { Capture, IProcessConsumer } from "../../process";
import { AWSSDKCaptureClient, AWS_SDK_MODULE } from "./base-client";
import { TFLambdaFunction } from "./cdktf-aws-factory";

export class TFQueue extends Construct implements IQueue {
  public queue: SqsQueue;

  constructor(scope: IConstruct, id: string, _props: QueueProps) {
    super(scope, id);

    this.queue = new SqsQueue(this, "Queue");
  }

  enqueue(_stuff: any): void {
    // TODO
    throw new Error("Method not implemented.");
  }

  addWorkerFunction(func: IFunction): void {
    if (func instanceof TFLambdaFunction) {
      new LambdaEventSourceMapping(this, `Worker${func.node.id}`, {
        eventSourceArn: this.queue.arn,
        enabled: true,
        functionName: func.lambda.functionName,
      });
    }
  }
}

export class QueueCaptureClient extends AWSSDKCaptureClient {
  constructor() {
    super({
      name: "aws-sdk-queue-client",
      // TODO UPDATE THIS
      filePath: `${__dirname}/runtime/queue-client.ts`,
      imports: [AWS_SDK_MODULE],
    });
  }

  bindToProcessConsumer(capture: Capture, consumer: IProcessConsumer): void {
    const target = capture.target as TFQueue;
    consumer.setEnvironment(this.getEnvName(capture), target.queue.arn);

    // TODO only supports lambda for now
    if (consumer instanceof TFLambdaFunction) {
      consumer.lambdaRole.putInlinePolicy([
        {
          policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                // TODO terrible policy
                Action: "sqs:*",
                Effect: "Allow",
                Resource: target.queue.arn,
              },
            ],
          }),
        },
      ]);
    }
  }
}
