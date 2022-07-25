import { IConstruct, Node } from "constructs";
import { PolyconFactory } from "./polycon-factory";

export const POLYCON_SYMBOL = Symbol.for("polycons.Polycon");

/**
 * A polymorphic construct that can be resolved at construction time into a more
 * specific construct.
 */
export abstract class Polycon implements IConstruct {
  public static isPolycon(x: any): x is Polycon {
    return x && typeof x === "object" && x[POLYCON_SYMBOL];
  }

  protected readonly innie: IConstruct;

  public readonly qualifier: string;
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

    const innie = factory.resolveConstruct(qualifier, scope, id, props);
    if (innie === undefined) {
      throw new Error(
        `Factory within scope of "${id}" does not support polycon "${qualifier}"`
      );
    }

    Object.defineProperty(Polycon.prototype, POLYCON_SYMBOL, {
      value: true,
      enumerable: false,
      writable: false,
    });

    this.qualifier = qualifier;
    this.innie = innie;
    this.node = this.innie.node;

    return innie as Polycon;
  }
}
