import { Construct, IConstruct } from "constructs";

const FACTORY_SYMBOL = Symbol.for("_Factory");

export interface IPolconFactoryConstructors {
  readonly [qualifier: string]: new (
    scope: Construct,
    id: string,
    props?: any
  ) => IConstruct;
}

export abstract class PolyconFactory {
  public static of(scope: IConstruct): PolyconFactory | undefined {
    const root = scope.node.root;
    return (root as any)[FACTORY_SYMBOL] as PolyconFactory;
  }

  public static register(scope: IConstruct, factory: PolyconFactory) {
    Object.defineProperty(scope.node.root, FACTORY_SYMBOL, {
      value: factory,
      enumerable: false,
    });
  }

  public constructors: IPolconFactoryConstructors = {};
}
