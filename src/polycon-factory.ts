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
  public static register(scope: IConstruct, factory: PolyconFactory) {
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
    const factory = polyconFactoryOf(scope);

    if (!factory) {
      throw new Error(
        `Cannot find any registered Polycon factories (directly or indirectly).`
      );
    }

    return factory.newInstance(type, scope, id, ...args);
  }

  private constructor() {}
}

/**
 * A factory that determines how to turn polycons into concrete constructs.
 */
export class PolyconFactory {
  /**
   * Creates a polycon factory from a list of individual polycon resolvers.
   * No two resolvers can be associated with the same polycon type.
   *
   * @param resolvers An array of resolvers
   * @returns A polycon factory
   */
  public static create(...resolvers: IPolyconResolver[]): PolyconFactory {
    const map: { [key: string]: IPolyconResolver } = {};
    for (const resolver of resolvers) {
      if (resolver.type in map) {
        throw new Error(
          `A polycon resolver has already been registered for type "${resolver.type}".`
        );
      }
      map[resolver.type] = resolver;
    }
    return new PolyconFactory(map);
  }

  private readonly resolvers = new Map<string, IPolyconResolver>();

  private constructor(resolvers: { [key: string]: IPolyconResolver }) {
    for (const [type, resolver] of Object.entries(resolvers)) {
      this.resolvers.set(type, resolver);
    }
  }

  /**
   * Creates a new instance of a polycon.
   *
   * @param type The type identifier
   * @param scope The construct scope
   * @param id The construct identifier
   * @param args The rest of the construct's arguments
   * @returns The resolved construct
   */
  public newInstance(
    type: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ) {
    const resolver = this.resolvers.get(type);
    if (!resolver) {
      throw new Error(
        `This factory does not have any resolvers to resolve a polycon with type "${type}".`
      );
    }

    return resolver.resolve(scope, id, ...args);
  }
}

/**
 * A resolver that knows how to resolve a specific polycon type.
 */
export interface IPolyconResolver {
  /**
   * The type identifier of the polycon this resolver can resolve.
   */
  readonly type: string;

  /**
   * Creates a new instance of a polycon.
   *
   * @param scope The construct scope
   * @param id The construct identifier
   * @param args The rest of the construct's arguments
   * @returns The resolved construct
   */
  resolve(scope: IConstruct, id: string, ...args: any[]): IConstruct;
}
