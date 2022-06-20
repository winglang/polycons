import { IConstruct, Node } from "constructs";
import { PolyconFactory } from "./polycon-factory";

export abstract class Polycon implements IConstruct {
  // TODO Should traverse up tree?
  public static of(scope: IConstruct): Polycon | undefined {
    return (scope as any)[Polycon.POLYCON_SYMBOL] as Polycon;
  }
  private static POLYCON_SYMBOL = Symbol.for("_Polycon");

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

    const innie = factory.resolve(qualifier, scope, id, props);
    if (innie === undefined) {
      throw `Factory does not support "${qualifier}"`;
    }

    this.qualifier = qualifier;
    this.innie = innie;
    this.node = this.innie.node;

    // Allows one to bypass proxy
    Object.defineProperty(innie, Polycon.POLYCON_SYMBOL, {
      value: this,
      enumerable: false,
    });

    return new Proxy(this, {
      get(_target: Polycon, prop: string | symbol, _receiver: any) {
        if (prop === "innie") {
          return innie;
        } else if (prop === "qualifier") {
          return qualifier;
        }
        return Reflect.get(innie, prop);
      },
    });
  }

  protected proxyError(methodName: string, ...args: any[]) {
    return `Proxy method "${methodName}" not used. ARGS: ${args.join(",")}`;
  }
}
