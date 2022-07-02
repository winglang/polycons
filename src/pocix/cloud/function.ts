import { IConstruct } from "constructs";
import { Polycon } from "../../polycons";
import { IProcessConsumer, ProcessBuilder } from "../../process";

export const FUNCTION_QUALIFIER = "pocix.cloud.Function";

export interface IFunction extends IConstruct, IProcessConsumer {
  invoke(args?: any): any;
}
export interface FunctionProps {
  readonly env?: { [name: string]: any };
  readonly processBuilder: ProcessBuilder;
}

export class Function extends Polycon implements IFunction {
  constructor(scope: IConstruct, id: string, props: FunctionProps) {
    super(FUNCTION_QUALIFIER, scope, id, props);
  }
  setEnvironment(name: string, value: string): void {
    throw this.proxyError("setEnvironment", name, value);
  }
  invoke(args?: any): any {
    throw this.proxyError("invoke", args);
  }
}
