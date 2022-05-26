import { Construct, IConstruct } from "constructs";
import { polycons } from "../..";

export const APP_QUALIFIER = "pocix.App";

export interface AppProps {
  readonly factory: polycons.PolyconFactory;
}

export interface IApp extends IConstruct {
  synth(): string;
}

export const App: {
  new (props: AppProps): IApp;
} = function (props: AppProps) {
  const root = new Construct(undefined as any, "");
  polycons.PolyconFactory.register(root, props.factory);
  return new polycons.Polycon(
    APP_QUALIFIER,
    root,
    "App",
    props
  ) as unknown as IApp;
} as any;
