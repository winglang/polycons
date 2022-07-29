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
    // check if we are being called from a polycon resolution code path
    // this is done by checking if a marker for this polycon is present in the
    // scope. if so, we will initialize this as an empty construct and delete
    // the marker
    const marker = Symbol.for(`polycons.init[${qualifier}]#${id}`);
    if (marker in scope) {
      super(scope, id);
      delete (scope as any)[marker]; // delete the marker
      return this;
    }

    // since we eventually return the resolved polycon, we can just initialize
    // the base class as an empty root construct (it won't be used)
    super(null as any, "");

    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw new Error(`No factory defined within scope of "${id}"`);
    }

    // add the initialization marker to avoid re-entering this path
    // when the resolved polycon is initialized.
    Object.defineProperty(scope, marker, {
      value: true,
      enumerable: false,
      writable: false,
      configurable: true, // we are deleting the marker after construction
    });

    const resolved = factory.resolveConstruct(qualifier, scope, id, props);

    return resolved as Polycon;
  }
}
