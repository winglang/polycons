import { Construct, IConstruct } from 'constructs';

const FACTORY_SYMBOL = Symbol.for('Factory');

export abstract class Factory {
  public static of(scope: Construct): Factory {
    const root = scope.node.root;
    return (root as any)[FACTORY_SYMBOL] as Factory;
  }

  public static register(scope: Construct, factory: Factory) {
    Object.defineProperty(scope.node.root, FACTORY_SYMBOL, {
      value: factory,
      enumerable: false,
    });
  }

  public abstract construct(type: string, scope: Construct, id: string, props: any): IConstruct;
}