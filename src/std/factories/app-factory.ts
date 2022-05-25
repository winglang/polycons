import { Construct, IConstruct } from "constructs";
import { Polycon } from "../../polycon";
import { PolyconFactory } from "../../polycon-factory";

export interface AppProps {
  readonly factory: PolyconFactory;
}

export interface IApp extends IConstruct {
  synth(): string;
}

export interface IAppFactory {
  constructApp(scope: IConstruct, id: string, props: AppProps): IApp;
}

export class App extends Polycon implements IApp {
  constructor(props: AppProps) {
    const root = new Construct(undefined as any, "");
    PolyconFactory.register(root, props.factory);

    super("App", root, "App", props);
  }
  synth(): string {
    throw this.proxyError();
  }
}
