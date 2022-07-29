import { Construct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

const POLYCON_SYMBOL = Symbol.for("polycons.Polycon");
const POLYCON_CLASS_SYMBOL = Symbol.for("polycons.Polycon_ABSTRACT");

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

  /**
   * Checks if `x` is a polycon-based class that should be considered abstract.
   * @returns true if `x` is a class that extends `Polycon` and is not allowed to be constructed directly.
   * @param x Any class (function)
   */
  public static isPolyconClass(x: any): x is Polycon {
    return x && typeof x === "function" && x[POLYCON_CLASS_SYMBOL];
  }

  /** Allow the given class to be constructed directly, even when it inherits from Polycon */
  public static allowConcrete(clazz: Object) {
    Object.defineProperty(clazz, POLYCON_CLASS_SYMBOL, {
      value: false,
    });
  }

  protected constructor(
    qualifier: string,
    scope: Construct,
    id: string,
    props?: any
  ) {
    if (!Polycon.isPolyconClass(new.target)) {
      // The target class is being constructed directly, skip factory logic
      super(scope, id);
      return;
    }

    // since we eventually return the resolved polycon, we can just initialize
    // the base class as an empty root construct (it won't be used)
    super(null as any, "");

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

    return resolved as Polycon;
  }
}

// This property gets inherited by all subclasses
Object.defineProperty(Polycon, POLYCON_CLASS_SYMBOL, {
  value: true,
  enumerable: false,
  configurable: false,
});
