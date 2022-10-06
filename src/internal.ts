import { IConstruct } from "constructs";
import { PolyconFactory } from "./polycon-factory";

export const FACTORY_SYMBOL = Symbol.for("polycons.PolyconFactory");

/**
 * Returns the nearest polycon factory registered in a given scope.
 */
export function polyconFactoryOf(
  scope: IConstruct
): PolyconFactory | undefined {
  const factory = (scope as any)[FACTORY_SYMBOL] as PolyconFactory;

  if (factory) {
    return factory;
  }

  const parent = scope.node.scope;
  if (!parent) {
    return undefined;
  }

  return polyconFactoryOf(parent);
}
