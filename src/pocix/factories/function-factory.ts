import { IConstruct } from "constructs";
import { polycons } from "../..";
import { IProcessRunner } from "../../polycons/capturable";

export const FUNCTION_QUALIFIER = "std.Function";

export interface IFunction extends IConstruct, IProcessRunner {
  invoke(scope: IConstruct, id: string, args?: any): any;
}

export interface IFunctionProps {
  readonly env?: any;
  readonly file?: string;
  readonly entrypoint: string;
  fn?(): any;
}

type Function = {
  new (scope: IConstruct, id: string, props: IFunctionProps): IFunction;
};

export const Function: Function =
  polycons.PolyconResolver.registerPolycon(FUNCTION_QUALIFIER);
