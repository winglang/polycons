import { IConstruct } from "constructs";
import { std, polycons } from "../..";
import { NodeBucket } from "./node-bucket";
import { NodeFunction } from "./node-function";
import { NodeQueue } from "./node-queue";

// Synthesized to single nodejs file
export class LocalNodeJSFactory extends polycons.PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    switch (qualifier) {
      case std.BUCKET_QUALIFIER:
        return new NodeBucket(scope, id);
      case std.QUEUE_QUALIFIER:
        return new NodeQueue(scope, id);
      case std.FUNCTION_QUALIFIER:
        return new NodeFunction(scope, id, props);
      default:
        throw new Error("Qualifier not implemented.");
    }
  }
}
