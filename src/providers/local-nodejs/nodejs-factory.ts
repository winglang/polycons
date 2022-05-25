import { Construct, IConstruct } from "constructs";
import { PolyconFactory } from "../../polycon-factory";
import { AppProps, IAppFactory } from "../../std/factories/app-factory";
import {
  BucketProps,
  IBucket,
  IBucketFactory,
} from "../../std/factories/bucket-factory";
import {
  IFunctionProps,
  IFunction,
  IFunctionFactory,
} from "../../std/factories/function-factory";
import {
  IQueue,
  IQueueFactory,
  QueueProps,
} from "../../std/factories/queue-factory";
import { BucketFunction } from "./bucket-function";
import { FunctionFunction } from "./function-function";
import { LocalNodeJSApp } from "./nodejs-app";
import { QueueFuction } from "./queue-function";

// Sythesized to single nodejs file
export class LocalNodeJSFactory
  extends PolyconFactory
  implements IAppFactory, IBucketFactory, IQueueFactory, IFunctionFactory
{
  constructApp(
    scope: IConstruct,
    id: string,
    _props: AppProps
  ): LocalNodeJSApp {
    return new LocalNodeJSApp(scope, id);
  }
  constructBucket(scope: Construct, id: string, _props: BucketProps): IBucket {
    return new BucketFunction(scope, id);
  }
  constructQueue(scope: Construct, id: string, _props: QueueProps): IQueue {
    return new QueueFuction(scope, id);
  }
  constructFunction(
    scope: Construct,
    id: string,
    props: IFunctionProps
  ): IFunction {
    return new FunctionFunction(scope, id, props);
  }
}
