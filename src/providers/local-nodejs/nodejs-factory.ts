import { pocix, polycons } from "../..";
import { BucketFunction } from "./bucket-function";
import { FunctionFunction } from "./function-function";
import { LocalNodeJSApp } from "./nodejs-app";
import { QueueFuction } from "./queue-function";

// Sythesized to single nodejs file
export class LocalNodeJSFactory extends polycons.PolyconFactory {
  public constructors: polycons.IPolconFactoryConstructors = {
    [pocix.APP_QUALIFIER]: LocalNodeJSApp,
    [pocix.BUCKET_QUALIFIER]: BucketFunction,
    [pocix.QUEUE_QUALIFIER]: QueueFuction,
    [pocix.FUNCTION_QUALIFIER]: FunctionFunction,
  };
}
