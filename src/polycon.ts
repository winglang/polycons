import { Construct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

const POLYCON_SYMBOL = Symbol.for("polycons.Polycon");
const POLYCON_ID_SUFFIX = "$B91BC3FD-4D3D-4820-88A7-0D38770ED2EB";

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
    // const key = Symbol.for(`polycons.${qualifier}.${id}`);

    if (id.endsWith(POLYCON_ID_SUFFIX)) {
      super(scope, id.substring(0, id.length - POLYCON_ID_SUFFIX.length));
      return this;
    }

    super(undefined as any, id + ".dummy");

    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw new Error(`No factory defined within scope of "${id}"`);
    }

    const resolved = factory.resolveConstruct(
      qualifier,
      scope,
      id + POLYCON_ID_SUFFIX,
      props
    );

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
