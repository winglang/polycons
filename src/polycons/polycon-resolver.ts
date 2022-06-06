import { IConstruct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

/**
 *
 */
export interface IResolverRule {
  /**
   *
   */
  readonly selector: string;

  /**
   *
   * @param qualifier
   * @param scope
   * @param id
   * @param props
   */
  construction(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct;
}

const GLOBAL_FACTORY_RULE: IResolverRule = {
  selector: "*",
  construction(qualifier: string, scope: IConstruct, id: string, props?: any) {
    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw `No factory defined within scope of "${id}"`;
    }

    const concreteConstructor = factory.constructors[qualifier];
    if (concreteConstructor === undefined) {
      throw `Factory does not support "${qualifier}"`;
    }

    return new concreteConstructor(scope, id, props);
  },
};

export abstract class PolyconResolver {
  public static addRule(rule: IResolverRule) {
    this._rules.push(rule);
  }

  public static resolve(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props: any
  ) {
    // TODO just use default for now
    // TODO qualifer can be used for matching rules. Perhaps a CSS like matching system?
    return this._rules[0].construction(qualifier, scope, id, props);
  }

  /**
   * Ensures the resolver is aware of the qualifier and returns the constructor
   * @param qualifier
   * @returns
   */
  public static registerPolycon(qualifier: string): any {
    // Note the return type is "any" because JSII does not support the actual type `new (...)`

    if (PolyconResolver._polycons.has(qualifier)) {
      throw `"${qualifier}" is already a registered Polycon`;
    } else {
      PolyconResolver._polycons.add(qualifier);
    }
    return function (scope: IConstruct, id: string, props?: any) {
      return PolyconResolver.resolve(qualifier, scope, id, props) as any;
    } as any;
  }

  private static _rules: IResolverRule[] = [GLOBAL_FACTORY_RULE];
  private static _polycons: Set<string> = new Set<string>();
}
