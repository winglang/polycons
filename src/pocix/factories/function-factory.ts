import { IConstruct } from "constructs";
import { polycons } from "../..";

export const FUNCTION_QUALIFIER = "std.Function";

export interface IFunction extends IConstruct {
  invoke(scope: IConstruct, id: string, args?: any): any;
}

export interface IFunctionProps {
  readonly env?: any;
  readonly file?: string;
  fn?(): any;
}

export const Function: {
  new (scope: IConstruct, id: string, props: IFunctionProps): IFunction;
} = polycons.PolyconResolver.createPolyconConstructor(FUNCTION_QUALIFIER);
