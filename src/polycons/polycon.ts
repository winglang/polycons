import { Construct, IConstruct } from "constructs";
import { PolyconResolver } from "./polycon-resolver";

export class Polycon extends Construct implements IConstruct {
  protected readonly innie: IConstruct;

  constructor(qualifier: string, scope: Construct, id: string, props?: any) {
    super(scope, id);

    const innie = PolyconResolver.resolve(qualifier, this, id, props);
    this.innie = innie;

    // or just this if we don't want/need a proxy
    // return innie;

    return new Proxy<Polycon>(this, {
      get(_target: Polycon, prop: string | symbol, _receiver: any) {
        if (prop === "innie") {
          return innie;
        }
        return Reflect.get(innie, prop);
      },
    });
  }

  protected proxyError(...args: any[]) {
    return `Proxy method not used. ARGS: ${args.join(",")}`;
  }
}
