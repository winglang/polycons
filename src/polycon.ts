import { Construct, IConstruct } from "constructs";
import { PolyconFactory } from "./std/factories/base-factory";

export class Polycon extends Construct implements IConstruct {
  protected readonly innie: IConstruct;

  constructor(type: string, scope: Construct, id: string, props?: any) {
    super(scope, id);

    const factory = PolyconFactory.of(this);
    if (!factory) {
      throw `No factory defined within scope of "${id}"`;
    }

    const constructFunction = Reflect.get(factory, `construct${type}`);
    if (constructFunction === undefined) {
      throw `Factory does not support "${type}", no "construct${type}" method available`;
    }

    const innie = constructFunction(this, id, props) as any;
    this.innie = innie;

    // or just this if we don't want/need a proxy
    // return innie;

    return new Proxy<Polycon>(this, {
      get(target: Polycon, p: string | symbol, _receiver: any) {
        if (p === "innie") {
          return target.innie;
        }
        return innie[p];
      },
    });
  }

  protected proxyError(...args: any[]) {
    return new Error(`Proxy method not used. ARGS: ${args.join(",")}`);
  }
}
