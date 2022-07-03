/**
 * Exposes an api to mutate a compute system
 *
 * Currently used to allow clients to make changes to the system they're running on to ensure they'll work correctly.
 *
 *
 * TODO Not sure if this is worth doing, cause it's probably going to be the leakiest abstraction in the universe
 */
export interface IProcessConsumer {
  setEnvironment(name: string, value: string): void;

  // setFlag(name: string, value: string): void;
}
