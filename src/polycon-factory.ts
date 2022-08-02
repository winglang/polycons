import { IConstruct } from "constructs";

const FACTORY_SYMBOL = Symbol.for("polycons.PolyconFactory");

/**
 * Functions for resolving polycons (polymorphic constructs) into
 * specific constructs.
 */
export class Polycons {
  /**
   * Adds a factory at given scope. This factory will be used for resolving
   * polycons under this scope into constructs.
   */
  public static register(scope: IConstruct, factory: IPolyconFactory) {
    const existing = (scope as any)[FACTORY_SYMBOL];
    if (existing !== undefined) {
      throw new Error(
        "There is already a polycon factory registered in this scope."
      );
    }

    Object.defineProperty(scope, FACTORY_SYMBOL, {
      value: factory,
      enumerable: false,
      writable: false,
    });
  }

  /**
   * Creates a new instance of a polycon. The polycon is resolved using the
   * polycon factory that is registered nearest to it in the tree.
   *
   * For example, if a construct tree has Root -> Parent -> MyPoly, and FactoryA
   * is registered to Root while FactoryB is registered to Parent, then
   * FactoryB will be used to resolve MyPoly.
   *
   * @param polyconId The type identifier
   * @param scope The construct scope
   * @param id The construct identifier
   * @param props The construct props
   * @returns The resolved construct
   */
  public static newInstance(
    polyconId: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    const factory = polyconFactoryOf(scope);

    if (!factory) {
      throw new Error(
        "Cannot find a Polycon factory (directly or indirectly) to resolve this polycon."
      );
    }

    return factory.resolve(polyconId, scope, id, props);
  }

  private constructor() {}
}

/**
 * Returns the polycon factory registered in a given scope.
 */
export function polyconFactoryOf(
  scope: IConstruct
): IPolyconFactory | undefined {
  const factory = (scope as any)[FACTORY_SYMBOL] as IPolyconFactory;

  if (factory) {
    return factory;
  }

  const parent = scope.node.scope;
  if (!parent) {
    return undefined;
  }

  return polyconFactoryOf(parent);
}

/**
 * A factory that determines how to turn polycons into concrete constructs.
 */
export interface IPolyconFactory {
  /**
   * Resolve the parameters needed for creating a specific polycon into a
   * concrete construct.
   *
   * @param polyconId The type identifier
   * @param scope The construct scope
   * @param id The construct identifier
   * @param props The construct props
   * @returns The resolved construct
   */
  resolve(
    polyconId: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct;
}
