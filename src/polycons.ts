import { Construct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

/**
 * A class used to create polycons
 */
export class Polycons {
  public static create(
    qualifier: string,
    scope: Construct,
    id: string,
    props?: any
  ) {
    const factory = PolyconFactory.of(scope);
    if (!factory) {
      throw new Error(`No factory defined within scope of "${id}"`);
    }

    return factory.resolveConstruct(qualifier, scope, id, props);
  }

  private constructor() {}
}
