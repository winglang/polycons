import { Construct, IConstruct } from "constructs";
import { std } from "../..";
import { JavascriptFileModule } from "./javascript-file-module";
import { JavascriptFunctionModule } from "./javascript-function-module";
import { JavascriptModule } from "./javascript-module";
import { RawJavascriptModule } from "./raw-module";

export class FunctionFunction extends Construct implements std.IFunction {
  public readonly module: JavascriptModule;

  constructor(scope: IConstruct, id: string, props: std.IFunctionProps) {
    super(scope, id);

    if (props.file) {
      this.module = new JavascriptFileModule(this, "File", props.file);
    } else if (props.fn) {
      this.module = new JavascriptFunctionModule(this, "Function", {
        fn: props.fn,
      });
    } else {
      throw "Must provide fn or file";
    }

    if (props.env) {
      new RawJavascriptModule(
        this,
        id,
        Object.entries(props.env)
          .map(
            (entry) => `process.env.${entry[0]} = ${JSON.stringify(entry[1])};`
          )
          .join("\n")
      );
    }
  }

  invoke(scope: IConstruct, id: string, args?: any) {
    const argText = args ? "" : JSON.stringify(args);

    new RawJavascriptModule(
      scope,
      id,
      `\
console.group('Invoking Function "${this.node.id}"');
(${this.module.identifierRequire()}.default)(${argText});
console.groupEnd();`
    );
  }
}
