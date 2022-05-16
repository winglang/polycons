import { Construct, IConstruct } from 'constructs';
import { Factory } from './factory';

export interface AppProps {
  readonly factory: Factory;
}

export interface IApp extends IConstruct {
  synth(): string;
}

export class App extends Construct {
  private innie: IApp;

  constructor(props: AppProps) {
    const root = props.factory.construct('App', undefined as any, undefined as any, undefined) as IApp;
    super(root, 'Root');

    this.innie = root;
    Factory.register(this, props.factory);
  }

  public synth() {
    return this.innie.synth();
  }
}