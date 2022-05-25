import { Construct, IConstruct } from "constructs";
import { Polycon } from "../../polycon";

export interface IFunction extends IConstruct {
  invoke(scope: IConstruct, id: string, args?: any): any;
}

export interface IFunctionProps {
  readonly env?: any;
  readonly file?: string;
  function(): any;
}

export interface IFunctionFactory {
  constructFunction(
    scope: Construct,
    id: string,
    props: IFunctionProps
  ): IFunction;
}

export class Function extends Polycon implements IFunction {
  constructor(scope: Construct, id: string, props: IFunctionProps) {
    super("Function", scope, id, props);
  }
  invoke(scope: IConstruct, id: string, args?: any): any {
    throw this.proxyError(scope, id, args);
  }
}
