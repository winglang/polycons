import { IConstruct } from "constructs";
import { IFunction } from "../../std/factories/function-factory";
import { JavascriptConstruct } from "./javascript-construct";

export class InvokeFunction extends JavascriptConstruct {
  constructor(
    scope: IConstruct,
    id: string,
    private readonly functionToInvoke: IFunction
  ) {
    super(scope, id);
  }
  renderPrefix(): string {
    return `console.group('Invoking Function "${this.functionToInvoke.node.id}"');\n`;
  }
  renderPostfix(): string {
    return `console.groupEnd();`;
  }
  renderScript(): string {
    return `MyCloud[${JSON.stringify(this.functionToInvoke.node.path)}]()`;
  }
}
