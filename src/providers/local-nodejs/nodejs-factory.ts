import { std, polycons } from "../..";
import { BucketFunction } from "./bucket-function";
import { FunctionFunction } from "./function-function";
import { QueueFuction } from "./queue-function";

// Sythesized to single nodejs file
export class LocalNodeJSFactory extends polycons.PolyconFactory {
  public constructors: polycons.IPolyconFactoryConstructors = {
    [std.BUCKET_QUALIFIER]: BucketFunction,
    [std.QUEUE_QUALIFIER]: QueueFuction,
    [std.FUNCTION_QUALIFIER]: FunctionFunction,
  };
}
