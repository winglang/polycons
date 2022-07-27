import { Construct, IConstruct, Node } from "constructs";
import { PolyconFactory } from "./polycon-factory";

export const POLYCON_SYMBOL = Symbol.for("polycons.Polycon");
export const POLYCON_CONSTRUCTION_LOOKUP = Symbol.for(
  "polycons.PolyconConstructionLookup"
);

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

    // Check if this polycon has already started construction to prevent
    // infinite looping.
    //
    // Suppose we have an inheritance tree as follows:
    //
    //  ┌───────────────┐
    //  │               │
    //  │    Polycon    │
    //  │               │
    //  └───────────────┘
    //          ▲
    //          │
    //  ┌───────┴───────┐
    //  │               │
    //  │   MyPolycon   │
    //  │               │
    //  └───────────────┘
    //          ▲
    //          │
    //  ┌───────┴───────┐
    //  │               │
    //  │ MyPolyconImpl │
    //  │               │
    //  └───────────────┘
    //
    // When someone constructs MyPolycon, this constructor will try to find a
    // Polycon factory and request a MyPolyconImpl instance from it -- this is
    // the core of how the polycon dependency injection system works.
    //
    // However, in order to inherit properties and methods, MyPolyconImpl must
    // have MyPolycon as its superclass. This means constructing MyPolyconImpl
    // will run the constructors for MyPolycon and Polycon again, which would
    // continue looping until a stack overflow.
    //
    // To avoid this, the first time we create `MyPolycon` we register it in a
    // global key-value store. When we detect this constructor is being run a
    // second time, we simply return that value and skip invoking the factory.

    const CURRENTLY_IN_CONSTRUCTION = this.getConstructionLookup(scope);
    const path = calculatePath(scope, id);

    if (CURRENTLY_IN_CONSTRUCTION.has(path)) {
      const thing = CURRENTLY_IN_CONSTRUCTION.get(path)!;
      const construct = new Construct(scope, id);
      Object.setPrototypeOf(thing, construct);
      this.node = thing.node;
      return this;
    }

    CURRENTLY_IN_CONSTRUCTION.set(path, this);

    const resolved = factory.resolveConstruct(qualifier, scope, id, props);

    // annotate the particular instance returned by this constructor as being
    // a polycon
    Object.defineProperty(resolved, POLYCON_SYMBOL, {
      value: true,
      enumerable: false,
      writable: false,
    });

    this.node = resolved.node;

    CURRENTLY_IN_CONSTRUCTION.delete(path);

    return resolved as Polycon;
  }

  private getConstructionLookup(scope: IConstruct): Map<string, any> {
    const root = scope.node.root;
    let lookup = (root as any)[POLYCON_CONSTRUCTION_LOOKUP];
    if (!lookup) {
      lookup = new Map();
      Object.defineProperty(root, POLYCON_CONSTRUCTION_LOOKUP, {
        value: lookup,
        enumerable: false,
        writable: false,
      });
    }

    return lookup;
  }
}

// not strictly needed, but future proofing in case there is another way to
// construct Polycons in the future
Object.defineProperty(Polycon.prototype, POLYCON_SYMBOL, {
  value: true,
  enumerable: false,
  writable: false,
});

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
