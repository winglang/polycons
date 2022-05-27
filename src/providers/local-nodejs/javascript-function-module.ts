import { IConstruct } from "constructs";
import { JavascriptModule } from "./javascript-module";

export interface IJavascriptFunctionModuleOptions {
  readonly invokeWith?: any[];
  fn(...args: any[]): any;
}

export class JavascriptFunctionModule extends JavascriptModule {
  constructor(
    scope: IConstruct,
    id: string,
    private readonly props: IJavascriptFunctionModuleOptions
  ) {
    super(scope, id);
  }
  render(): string {
    if (this.props.invokeWith) {
      return `module.exports = (${this.props.fn.toString()})(${
        this.props.invokeWith
          .map((i) => JSON.stringify(i))
          .map((j) => `JSON.parse(\`${j}\`)`)
          .join(", ") ?? ""
      });`;
    } else {
      return `module.exports = ${this.props.fn.toString()};`;
    }
  }
}
