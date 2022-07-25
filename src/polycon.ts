import { IConstruct, Node } from "constructs";
import { PolyconFactory } from "./polycon-factory";

export const POLYCON_SYMBOL = Symbol.for("polycons.Polycon");

/**
 * A polymorphic construct that can be resolved at construction time into a more
 * specific construct.
 */
export abstract class Polycon implements IConstruct {
  /**
   * Checks if `x` is a construct.
   * @returns true if `x` is an object created from a class which extends `Construct`.
   * @param x Any object
   */
  public static isPolycon(x: any): x is Polycon {
    return x && typeof x === "object" && x[POLYCON_SYMBOL];
  }

  /**
   * The tree node.
   */
  public readonly node: Node;

  protected constructor(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw new Error(`No factory defined within scope of "${id}"`);
    }

    const resolved = factory.resolveConstruct(qualifier, scope, id, props);

    // annotate the particular instance returned by this constructor as being
    // a polycon
    Object.defineProperty(resolved, POLYCON_SYMBOL, {
      value: true,
      enumerable: false,
      writable: false,
    });

    this.node = resolved.node;

    return resolved as Polycon;
  }
}

// not strictly needed, but future proofing in case there is another way to
// construct Polycons in the future
Object.defineProperty(Polycon.prototype, POLYCON_SYMBOL, {
  value: true,
  enumerable: false,
  writable: false,
});
