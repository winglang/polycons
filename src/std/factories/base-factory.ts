import { IConstruct } from "constructs";

const FACTORY_SYMBOL = Symbol.for("Factory");

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
}
