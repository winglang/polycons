import { IConstruct } from "constructs";
import { polycons } from "../..";

export const APP_QUALIFIER = "std.App";

export interface AppProps {
  readonly factory: polycons.PolyconFactory;
}

export interface IApp extends IConstruct {
  synth(): string;
}

// Special case
export const App: {
  new (props: AppProps): IApp;
} = function (props: AppProps) {
  const app = new props.factory.constructors[APP_QUALIFIER](
    undefined as any,
    "",
    props
  );
  polycons.PolyconFactory.register(app, props.factory);
  return app as unknown as IApp;
} as any;
