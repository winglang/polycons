import { IConstruct, Node } from "constructs";
import { IClientRecipe } from "./capture";
import { PolyconFactory } from "./polycon-factory";

export const POLYCON_SYMBOL = Symbol.for("polycons.Polycon");

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
      throw `No factory defined within scope of "${id}"`;
    }

    const innie = factory.resolveConstruct(qualifier, scope, id, props);
    if (innie === undefined) {
      throw `Factory within scope of "${id}" does not support polycon "${qualifier}"`;
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

  protected proxyError(methodName: string, ...args: any[]) {
    return `Proxy method "${methodName}" not used. ARGS: ${args.join(",")}`;
  }

  public capture(): IClientRecipe {
    throw this.proxyError(
      "No capture method has been defined for this polycon."
    );
  }
}
