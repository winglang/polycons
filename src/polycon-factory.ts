import { IConstruct } from "constructs";

const FACTORY_SYMBOL = Symbol.for("polycons.PolyconFactory");

/**
 * A factory that can be used to resolve polycons (polymorphic constructs) into
 * specific constructs.
 */
export abstract class PolyconFactory {
  /**
   * Returns the polycon factory registered in a given scope.
   */
  public static of(scope: IConstruct): PolyconFactory {
    const factory = (scope.node.root as any)[FACTORY_SYMBOL] as PolyconFactory;

    if (!factory) {
      throw new Error(
        "No polycon factory has been registered to the construct tree."
      );
    }

    return factory;
  }

  /**
   * Adds a factory at the root of the construct tree.
   * This factory will be used for resolving all polycons into constructs.
   */
  public static register(scope: IConstruct, factory: PolyconFactory) {
    const existing = (scope.node.root as any)[FACTORY_SYMBOL];
    if (existing !== undefined) {
      throw new Error(
        "There is already a polycon factory registered in this scope. Try removing the existing factory and then registering the new one."
      );
    }

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
