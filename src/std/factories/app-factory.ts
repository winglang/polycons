import { Construct, IConstruct } from "constructs";
import { Polycon } from "../../polycon";
import { PolyconFactory } from "../../polycon-factory";

export const APP_QUALIFIER = "pocix.App";

export interface AppProps {
  readonly factory: PolyconFactory;
}

export interface IApp extends IConstruct {
  synth(): string;
}

export const App: {
  new (props: AppProps): IApp;
} = function (props: AppProps) {
  const root = new Construct(undefined as any, "");
  PolyconFactory.register(root, props.factory);
  return new Polycon(APP_QUALIFIER, root, "App", props) as unknown as IApp;
} as any;
