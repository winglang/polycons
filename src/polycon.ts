import { Construct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

const POLYCON_SYMBOL = Symbol.for("polycons.Polycon");

/**
 * A polymorphic construct that can be resolved at construction time into a more
 * specific construct.
 */
export abstract class Polycon extends Construct {
  /**
   * Checks if `x` is a polycon.
   * @returns true if `x` is an object created from a class which extends `Polycon`.
   * @param x Any object
   */
  public static isPolycon(x: any): x is Polycon {
    return x && typeof x === "object" && x[POLYCON_SYMBOL];
  }

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

    // annotate the particular instance returned by this constructor as being
    // a polycon
    Object.defineProperty(resolved, POLYCON_SYMBOL, {
      value: true,
      enumerable: false,
      writable: false,
    });

    return resolved as Polycon;
  }
}
