import { IConstruct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

export class Polycon {
  static createConstructor(qualifier: string): any {
    return function (scope: IConstruct, id: string, props?: any) {
      return new Polycon(qualifier, scope, id, props);
    } as any;
  }

  protected readonly innie: IConstruct;
  protected readonly qualifier: string;

  constructor(qualifier: string, scope: IConstruct, id: string, props?: any) {
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

  protected proxyError(...args: any[]) {
    return `Proxy method not used. ARGS: ${args.join(",")}`;
  }
}
