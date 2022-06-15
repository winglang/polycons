import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Trigger } from "aws-cdk-lib/triggers";
import { Construct, IConstruct } from "constructs";
import { std, polycons } from "../..";
import { BucketProps, IFunctionProps, QueueProps } from "../../pocix";
import { CaptureInfo, IProcessBinder } from "../../polycons/capturable";

export class AWSCDKFactory extends polycons.PolyconFactory {
  public resolve(
    _qualifier: string,
    _scope: IConstruct,
    _id: string,
    _props?: any
  ) {
    throw new Error("Method not implemented.");
  }
  // public constructors: polycons.IPolyconFactoryConstructors = {
  //   [std.BUCKET_QUALIFIER]: AWSCDKBucket,
  //   [std.QUEUE_QUALIFIER]: AWSCDKQueue,
  //   [std.FUNCTION_QUALIFIER]: AWSCDKFunction,
  // };
}

export class AWSCDKBucket extends Bucket implements std.IBucket {
  public: boolean;

  constructor(scope: IConstruct, id: string, props?: BucketProps) {
    const isPublic = props?.public ?? false;
    super(scope, id, {
      publicReadAccess: isPublic,
    });
    this.public = isPublic;
  }
  getProcessBinder(): IProcessBinder {
    throw new Error("Method not implemented.");
  }
}

export class AWSCDKQueue extends Queue implements std.IQueue {
  constructor(scope: IConstruct, id: string, _props?: QueueProps) {
    super(scope, id);
  }
  getProcessBinder(): IProcessBinder {
    throw new Error("Method not implemented.");
  }
  enqueue(_scope: IConstruct, _id: string, _stuff: any): void {
    throw new Error("Method not implemented.");
  }
  dequeue(_scope: IConstruct, _id: string) {
    throw new Error("Method not implemented.");
  }
  addWorkerFunction(func: AWSCDKFunction): void {
    func.innie.addEventSource(new SqsEventSource(this));
  }
}

export class AWSCDKFunction extends Construct implements std.IFunction {
  captures: CaptureInfo[] = [];
  innie: Function;
  constructor(scope: IConstruct, id: string, props: IFunctionProps) {
    super(scope, id);

    const code = props.file
      ? Code.fromAsset(props.file)
      : Code.fromInline(props.fn!.toString());

    this.innie = new Function(this, id, {
      code,
      environment: {
        ...(props.env ?? {}),
      },
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
    });
  }

  addEnvironment(env: { [name: string]: string }): void {
    for (const e of Object.keys(env)) {
      this.innie.addEnvironment(e, env[e]);
    }
  }
  resolveCaptures(): void {
    throw new Error("Method not implemented.");
  }
  grantable(): IConstruct {
    return this.innie;
  }
  invoke(scope: IConstruct, id: string, _args?: any) {
    new Trigger(scope, id, {
      handler: this.innie,
    });
  }
}
