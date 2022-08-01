import { IConstruct } from "constructs";

const FACTORY_SYMBOL = Symbol.for("polycons.PolyconFactory");

/**
 * Functions for resolving polycons (polymorphic constructs) into
 * specific constructs.
 */
export class Polycons {
  /**
   * Adds a factory at the root of the construct tree.
   * This factory will be used for resolving all polycons into constructs.
   */
  public static register(scope: IConstruct, factory: IPolyconFactory) {
    const existing = (scope.node.root as any)[FACTORY_SYMBOL];
    if (existing !== undefined) {
      throw new Error(
        "There is already a polycon factory registered in this scope. Try removing the existing factory and then registering the new one."
      );
    }

    Object.defineProperty(scope.node.root, FACTORY_SYMBOL, {
      value: factory,
      enumerable: false,
      writable: false,
    });
  }

  /**
   * Creates a new instance of a polycon by resolving it through the registered
   * factory.
   *
   * @param qualifier The type qualifier
   * @param scope The construct scope
   * @param id The construct identifier
   * @param props The construct props
   * @returns The resolved construct
   */
  public static newInstance(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    const factory = polyconFactoryOf(scope);
    return factory.resolve(qualifier, scope, id, props);
  }

  private constructor() {}
}

/**
 * Returns the polycon factory registered in a given scope.
 */
export function polyconFactoryOf(scope: IConstruct): IPolyconFactory {
  const factory = (scope.node.root as any)[FACTORY_SYMBOL] as IPolyconFactory;

  if (!factory) {
    throw new Error(
      "No polycon factory has been registered to the construct tree."
    );
  }

  return factory;
}

/**
 * A factory that determines how to turn polycons into concrete constructs.
 */
export interface IPolyconFactory {
  /**
   * Resolve the parameters needed for creating a specific polycon into a
   * concrete construct.
   *
   * @param qualifier The type qualifier
   * @param scope The construct scope
   * @param id The construct identifier
   * @param props The construct props
   * @returns The resolved construct
   */
  resolve(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct;
}
