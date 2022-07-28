import { Construct, IConstruct, Node } from "constructs";
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
    // scope. if so, we will initialize this as an empty construct. after
    // construction is finished, the marker will be deleted
    const path = calculatePath(scope, id);
    const marker = Symbol.for(`polycons.init[${path}]`);
    if (marker in scope) {
      super(scope, id);
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

    delete (scope as any)[marker]; // delete the marker

    // annotate the particular instance returned by this constructor as being
    // a polycon
    Object.defineProperty(resolved, POLYCON_SYMBOL, {
      value: true,
      enumerable: false,
      writable: false,
    });

    return resolved as Polycon;
  }

  /**
   * Whether it's safe to initialize the polycon.
   *
   * If this value is true, then we're in the process of being constructed as
   * part of the super() call made by a specific polycon implementation, and
   * it's OK to initialize private variables and private members and call
   * other initialization methods.
   *
   * If this value is false, then the polycon is just being used to invoke a
   * polycon factory, so no initialization should be performed.
   */
  public get safeToInitialize(): true {
    if (!this.node.scope) {
      throw new Error("Polycon must be created in a scope.");
    }
    const path = calculatePath(this.node.scope, this.node.id);
    const marker = Symbol.for(`polycons.init[${path}]`);
    return (marker in this.node.scope) as true;
  }
}

// copied from aws/constructs
const PATH_SEP_REGEX = new RegExp(`${Node.PATH_SEP}`, "g");

function calculatePath(scope: IConstruct, id: string) {
  const components = scope.node.scopes
    .filter((c) => c.node.id)
    .map((c) => c.node.id);
  const sanitized = id.replace(PATH_SEP_REGEX, "--");
  components.push(sanitized);
  return components.join(Node.PATH_SEP);
}
