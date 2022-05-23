import { Construct } from "constructs";

export interface JavascriptConstructOptions {
  assign: boolean;
  iife: boolean;
}

export abstract class JavascriptConstruct extends Construct {
  iife: boolean;
  assign: boolean;

  constructor(scope: Construct, id: string, props: JavascriptConstructOptions) {
    super(scope, id);

    this.iife = props.iife;
    this.assign = props.assign;
  }

  identifierExpression() {
    return `MyCloud[${JSON.stringify(this.node.path)}]`;
  }

  invokeExpression(...args: any[]) {
    const argText = args.length === 0 ? "" : JSON.stringify(args);
    return `MyCloud[${JSON.stringify(this.node.path)}](${argText})`;
  }

  abstract renderPrefix(): string;

  abstract render(): string;
}
