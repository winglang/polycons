import { IConstruct } from "constructs";
import { FACTORY_SYMBOL, polyconFactoryOf } from "./internal";

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
   * @param type The type identifier
   * @param scope The construct scope
   * @param id The construct identifier
   * @param args The rest of the construct's arguments
   * @returns The resolved construct
   */
  public static newInstance(
    type: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ) {
    if (!scope) {
      throw new Error(
        `Cannot construct a polycon with a scope of "${scope}". Check that the correct arguments were passed to the constructor.`
      );
    }

    const factory = polyconFactoryOf(scope);
    if (!factory) {
      throw new Error(
        `Cannot find a Polycon factory registered to the scope "${scope.node.path}" or its parent scopes.`
      );
    }

    return factory.resolve(type, scope, id, ...args);
  }

  private constructor() {}
}

/**
 * A factory that determines how to turn polycons into concrete constructs.
 */
export interface IPolyconFactory {
  /**
   * Resolve the parameters needed for creating a specific polycon into a
   * concrete construct.
   *
   * @param type The type identifier
   * @param scope The construct scope
   * @param id The construct identifier
   * @param args The rest of the construct's arguments
   * @returns The resolved construct
   */
  resolve(
    type: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct;
}
