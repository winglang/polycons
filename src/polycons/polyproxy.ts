import { Construct, IConstruct } from "constructs";
import { PolyconResolver } from "./polycon-resolver";

export class Polyproxy extends Construct implements IConstruct {
  protected readonly innie: IConstruct;

  constructor(qualifier: string, scope: Construct, id: string, props?: any) {
    super(scope, id);

    const innie = PolyconResolver.resolve(qualifier, this, id, props);
    this.innie = innie;

    return new Proxy<Polyproxy>(this, {
      get(_target: Polyproxy, prop: string | symbol, _receiver: any) {
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
