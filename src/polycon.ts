import { Construct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

/**
 * A polymorphic construct that can be resolved at construction time into a more
 * specific construct.
 */
export abstract class Polycon extends Construct {
  protected constructor(
    qualifier: string,
    scope: Construct,
    id: string,
    props?: any
  ) {
    if (qualifier === "") {
      // The target class is being constructed directly, skip factory logic
      super(scope, id);
      return;
    }

    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw new Error(`No factory defined within scope of "${id}"`);
    }

    const resolved = factory.resolveConstruct(qualifier, scope, id, props);

    return resolved as Polycon;
  }
}
