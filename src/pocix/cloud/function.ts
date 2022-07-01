import { IConstruct } from "constructs";
import { Polycon } from "../../polycons";
import { Process } from "../../process";

export const FUNCTION_QUALIFIER = "pocix.cloud.Function";

export interface IFunction extends IConstruct {
  invoke(args?: any): any;
}

export interface FunctionProps {
  readonly env?: { [name: string]: any };
  readonly process: Process;
}

export class Function extends Polycon implements IFunction {
  constructor(scope: IConstruct, id: string, props?: FunctionProps) {
    super(FUNCTION_QUALIFIER, scope, id, props);
  }
  invoke(args?: any) {
    throw this.proxyError("invoke", args);
  }
}
