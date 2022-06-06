import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Trigger } from "aws-cdk-lib/triggers";
import { IConstruct } from "constructs";
import { std, polycons } from "../..";
import { IBucketProps, IFunctionProps, IQueueProps } from "../../pocix";

export class AWSCDKFactory extends polycons.PolyconFactory {
  public constructors: polycons.IPolyconFactoryConstructors = {
    [std.BUCKET_QUALIFIER]: AWSCDKBucket,
    [std.QUEUE_QUALIFIER]: AWSCDKQueue,
    [std.FUNCTION_QUALIFIER]: AWSCDKFunction,
  };
}

export class AWSCDKBucket extends Bucket implements std.IBucket {
  public: boolean;

  constructor(scope: IConstruct, id: string, props?: IBucketProps) {
    const isPublic = props?.public ?? false;
    super(scope, id, {
      publicReadAccess: isPublic,
    });
    this.public = isPublic;
  }
}

export class AWSCDKQueue extends Queue implements std.IQueue {
  constructor(scope: IConstruct, id: string, _props?: IQueueProps) {
    super(scope, id);
  }
  enqueue(scope: IConstruct, id: string, stuff: any): void {
    throw new Error("Method not implemented.");
  }
  dequeue(scope: IConstruct, id: string) {
    throw new Error("Method not implemented.");
  }
  addWorkerFunction(func: AWSCDKFunction): void {
    func.addEventSource(new SqsEventSource(this));
  }
}

export class AWSCDKFunction extends Function implements std.IFunction {
  constructor(scope: IConstruct, id: string, props: IFunctionProps) {
    const code = props.file
      ? Code.fromAsset(props.file)
      : Code.fromInline(props.fn!.toString());
    super(scope, id, {
      code,
      environment: {
        ...(props.env ?? {}),
      },
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
    });
  }
  invoke(scope: IConstruct, id: string, _args?: any) {
    new Trigger(scope, id, {
      handler: this,
    });
  }
}
