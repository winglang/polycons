import { Construct, IConstruct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

export interface IResolverRule {
  readonly selector: string;
  construction(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props: any
  ): Construct;
}

const DEFAULT_RULE: IResolverRule = {
  selector: "*",
  construction(qualifier: string, scope: IConstruct, id: string, props: any) {
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
    this.rules.push(rule);
  }

  public static resolve(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props: any
  ) {
    // TODO just use default for now
    // TODO qualifer can be used for matching rules. Perhaps a CSS like matching system?
    return this.rules[0].construction(qualifier, scope, id, props);
  }

  public static createPolyconConstructor(qualifier: string): {
    new (scope: IConstruct, id: string, props?: any): any;
  } {
    if (PolyconResolver.polycons.has(qualifier)) {
      throw `"${qualifier}" is already a registered Polycon`;
    } else {
      PolyconResolver.polycons.add(qualifier);
    }
    return function (scope: IConstruct, id: string, props?: any) {
      const polycon = PolyconResolver.resolve(
        qualifier,
        scope,
        id,
        props
      ) as any;
      return polycon;
    } as any;
  }

  private static rules: IResolverRule[] = [DEFAULT_RULE];
  private static polycons: Set<string> = new Set<string>();
}
