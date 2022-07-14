import { IConstruct } from "constructs";

const FACTORY_SYMBOL = Symbol.for("polycons.PolyconFactory");

export abstract class PolyconFactory {
  public static of(scope: IConstruct): PolyconFactory {
    const factory = (scope.node.root as any)[FACTORY_SYMBOL] as PolyconFactory;

    if (!factory) {
      throw new Error(
        "No polycon factory has been registered to the construct tree."
      );
    }

    return factory;
  }

  public static register(scope: IConstruct, factory: PolyconFactory) {
    Object.defineProperty(scope.node.root, FACTORY_SYMBOL, {
      value: factory,
      enumerable: false,
    });
  }

  public abstract resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct;
}
