import {
  IPolconFactoryConstructors,
  PolyconFactory,
} from "../../polycon-factory";
import * as pocix from "../../std";
import { BucketFunction } from "./bucket-function";
import { FunctionFunction } from "./function-function";
import { LocalNodeJSApp } from "./nodejs-app";
import { QueueFuction } from "./queue-function";

// Sythesized to single nodejs file
export class LocalNodeJSFactory extends PolyconFactory {
  public constructors: IPolconFactoryConstructors = {
    [pocix.APP_QUALIFIER]: LocalNodeJSApp,
    [pocix.BUCKET_QUALIFIER]: BucketFunction,
    [pocix.QUEUE_QUALIFIER]: QueueFuction,
    [pocix.FUNCTION_QUALIFIER]: FunctionFunction,
  };
}
