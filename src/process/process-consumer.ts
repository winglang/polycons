export interface IProcessConsumer {
  name: string;
  addEnvironmentVariable(name: string, value: string): void;
}
