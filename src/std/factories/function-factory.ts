import { Construct, IConstruct } from "constructs";
import { Polycon } from "../../polycon";

export const FUNCTION_QUALIFIER = "pocix.Function";

export interface IFunction extends IConstruct {
  invoke(scope: IConstruct, id: string, args?: any): any;
}

export interface IFunctionProps {
  readonly env?: any;
  readonly file?: string;
  function(): any;
}

export const Function: {
  new (scope: Construct, id: string, props: IFunctionProps): IFunction;
} = function (scope: Construct, id: string, props: IFunctionProps) {
  return new Polycon(
    FUNCTION_QUALIFIER,
    scope,
    id,
    props
  ) as unknown as IFunction;
} as any;
