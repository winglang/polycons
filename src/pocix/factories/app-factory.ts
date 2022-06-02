import { Construct, IConstruct } from "constructs";
import { polycons } from "../..";

export const APP_QUALIFIER = "std.App";

export interface IApp extends IConstruct {
  synth(): string;
}

export interface IAppProps {
  readonly factory: polycons.PolyconFactory;
}

export type App = {
  new (props: IAppProps): IApp;
};

// Special Case
// Ensures a root is created with the desired factory first
export const App: App = function (props: IAppProps) {
  const root = new Construct(undefined as any, "");
  polycons.PolyconFactory.register(root, props.factory);
  console.log("register");
  return new (polycons.PolyconResolver.registerPolycon(APP_QUALIFIER) as any)(
    root,
    "App",
    props
  ) as any;
} as any;
