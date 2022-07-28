import { Construct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

/**
 * A class used to create polycons
 */
export class Polycons {
  public static create(
    qualifier: string,
    scope: Construct,
    id: string,
    props?: any
  ) {
    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw new Error(`No factory defined within scope of "${id}"`);
    }

    const marker = Symbol.for(`polycons.init[${qualifier}]#${id}`);

    // check if we are being called from a polycon resolution code path
    // this is done by checking if a marker for this polycon is present in the
    // scope. if so, we return the construct that was created by the polycon's
    // call to super() and delete the marker
    if (marker in scope) {
      const child = scope.node.tryFindChild(id);
      delete (scope as any)[marker]; // delete the marker
      return child;
    }

    // remove the child since we will be replacing it with the construct
    // produced by the polycon factory
    scope.node.tryRemoveChild(id);

    // add the initialization marker to avoid re-entering this path
    // when the resolved polycon is initialized.
    Object.defineProperty(scope, marker, {
      value: true,
      enumerable: false,
      writable: false,
      configurable: true,
    });

    const resolved = factory.resolveConstruct(qualifier, scope, id, props);

    return resolved as Polycons;
  }

  private constructor() {}
}
