import { IConstruct } from "constructs";

/**
 * Map of a polycon qualifier to an existing constructor
 */
export interface IPolyconFactoryConstructors {
  readonly [qualifier: string]: new (
    scope: IConstruct,
    id: string,
    props?: any
  ) => IConstruct;
}

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

  private static FACTORY_SYMBOL = Symbol.for("_Factory");

  public abstract resolve(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct;
}
