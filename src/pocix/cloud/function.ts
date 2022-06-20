import { IConstruct } from "constructs";
import { Polycon } from "../../polycons";
import { IProcess } from "../../polycons/process";

export const FUNCTION_QUALIFIER = "pocix.cloud.Function";

export interface IFunction {
  invoke(scope: IConstruct, id: string, args?: any): any;
}

export interface FunctionProps {
  readonly env?: any;
  readonly process: IProcess;
}

export class Function extends Polycon implements IFunction, IConstruct {
  constructor(scope: IConstruct, id: string, props?: FunctionProps) {
    super(FUNCTION_QUALIFIER, scope, id, props);
  }
  invoke(scope: IConstruct, id: string, args?: any) {
    throw this.proxyError("invoke", scope, id, args);
  }
}
