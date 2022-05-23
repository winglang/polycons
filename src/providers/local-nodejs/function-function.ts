import { IConstruct } from "constructs";
import { FunctionProps, IFunction } from "../../std/factories/function-factory";
import { JavascriptConstruct } from "./javascript-construct";
import { RawJavascript } from "./raw";

export class FunctionFunction extends JavascriptConstruct implements IFunction {
  private functionDefinition: () => any;
  private env: any;

  constructor(scope: IConstruct, id: string, props: FunctionProps) {
    super(scope, id, {
      assign: true,
      iife: false,
    });

    this.functionDefinition = props.function;
    this.env = props.env ?? {};
  }

  invoke(scope: IConstruct, id: string, _args?: any) {
    new RawJavascript(
      scope,
      id,
      `\
console.group('Invoking Function "${this.node.id}"');
${this.invokeExpression()};
console.groupEnd();`
    );
  }
  renderPrefix(): string {
    return Object.entries(this.env)
      .map((entry) => `process.env.${entry[0]} = ${JSON.stringify(entry[1])};`)
      .join("\n");
  }
  render(): string {
    return this.functionDefinition.toString();
  }
}
