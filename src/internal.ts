import { IConstruct } from "constructs";
import { IPolyconFactory } from "./polycon-factory";

export const FACTORY_SYMBOL = Symbol.for("polycons.PolyconFactory");

/**
 * Returns the nearest polycon factory registered in a given scope.
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
