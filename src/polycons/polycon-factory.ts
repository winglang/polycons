import { IConstruct } from "constructs";

/**
 *
 */
export abstract class PolyconFactory {
  /**
   * Returns the polycon factory associated with a Construct
   */
  public static of(scope: IConstruct): PolyconFactory | undefined {
    return (scope.node.root as any)[
      PolyconFactory.FACTORY_SYMBOL
    ] as PolyconFactory;
  }

  /**
   * Adds a factory at the root of the construct tree.
   * This factory will be used by default for polycon concretization.
   *
   * @param scope construct within the tree to register the factory
   * @param factory a PolyconFactory to register
   */
  public static register(scope: IConstruct, factory: PolyconFactory) {
    Object.defineProperty(scope.node.root, PolyconFactory.FACTORY_SYMBOL, {
      value: factory,
      enumerable: false,
    });
  }

  private static FACTORY_SYMBOL = Symbol.for("_PolyconFactory");

  public abstract resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct;
}
