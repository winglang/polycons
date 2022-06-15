import { IConstruct } from "constructs";
import { std, polycons } from "../..";
import { BucketFunction } from "./bucket-function";
import { FunctionFunction } from "./function-function";
import { QueueFuction } from "./queue-function";

// Sythesized to single nodejs file
export class LocalNodeJSFactory extends polycons.PolyconFactory {
  public resolve(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    switch (qualifier) {
      case std.BUCKET_QUALIFIER:
        return new BucketFunction(scope, id);
      case std.QUEUE_QUALIFIER:
        return new QueueFuction(scope, id);
      case std.FUNCTION_QUALIFIER:
        return new FunctionFunction(scope, id, props);
      default:
        throw new Error("Method not implemented.");
    }
  }
}
