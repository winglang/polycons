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

  public static resolve(
    qualifier: string,
    scope: Construct,
    id: string,
    props?: any
  ) {
    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw new Error(`No factory defined within scope of "${id}"`);
    }

    const path = calculatePath(scope, id);
    const marker = Symbol.for(`polycons.init[${path}]`);
    Object.defineProperty(scope, marker, {
      value: true,
      enumerable: false,
      writable: false,
      configurable: true, // we are deleting the marker after construction
    });

    const resolved = factory.resolveConstruct(qualifier, scope, id, props);

    return resolved as Polycon;
  }

  protected constructor(scope: Construct, id: string) {
    super(scope, id);

    // use a marker to ensure polycons are only instantiated through the
    // resolve method
    const path = calculatePath(scope, id);
    const marker = Symbol.for(`polycons.init[${path}]`);
    if (!(marker in scope)) {
      throw new Error(
        `Polycons cannot be directly instantiated through their constructors -- use a static factory instead.`
      );
    }
    delete (scope as any)[marker]; // delete the marker
  }
}

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
