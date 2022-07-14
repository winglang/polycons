import { Construct, IConstruct } from "constructs";
import { Polycon, Process } from "../polycons";

export const FUNCTION_QUALIFIER = "pocix.Function";

// TODO: implement IProcessConsumer?
export interface IFunction extends IConstruct {
  invoke(event: any): any;
}

export interface FunctionProps {
  readonly env?: { [name: string]: any };
  readonly process: Process;
}

export class Function extends Polycon implements IFunction {
  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(FUNCTION_QUALIFIER, scope, id, props);
  }

  public setEnvironment(name: string, value: string): void {
    throw this.proxyError("setEnvironment", name, value);
  }

  public invoke(args?: any): any {
    throw this.proxyError("invoke", args);
  }
}
