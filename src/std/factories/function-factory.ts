import { Construct, IConstruct } from "constructs";
import { Polycon } from "../../polycon";

export interface IFunction extends IConstruct {
  invoke(scope: IConstruct, id: string, args?: any): any;
}

export interface FunctionProps {
  env?: any;
  file?: string;
  function(): any;
}

export interface IFunctionFactory {
  constructFunction(
    scope: Construct,
    id: string,
    props: FunctionProps
  ): IFunction;
}

export class Function extends Polycon implements IFunction {
  constructor(scope: Construct, id: string, props: FunctionProps) {
    super("Function", scope, id, props);
  }
  invoke(_scope: IConstruct, _id: string, _args?: any) {
    throw new Error("Proxy method not used.");
  }
}
