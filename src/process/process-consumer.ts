/**
 * Exposes an api to mutate a compute system
 *
 * TODO Not sure if this is worth doing, cause it's probably going to be the leakiest abstraction in the universe
 */
export interface IProcessConsumer {
  setEnvironment(name: string, value: string): void;
}
