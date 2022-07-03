import { Construct, IConstruct } from "constructs";
import { std } from "../..";
import { JavascriptFileModule } from "./javascript-file-module";
import { JavascriptModule } from "./javascript-module";
import { RawJavascriptModule } from "./raw-module";

export class NodeFunction extends Construct implements std.IFunction {
  public readonly module: JavascriptModule;
  public readonly entrypoint: string;

  constructor(scope: IConstruct, id: string, props: std.FunctionProps) {
    super(scope, id);
    const process = props.process;

    this.entrypoint = process.entrypoint;

    this.module = new JavascriptFileModule(this, "File", {
      path: process.filePath,
      entrypoint: this.entrypoint,
    });

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
  setEnvironment(name: string, value: string): void {
    this.module.prefix += `process.env.${name} = ${value};\n`;
  }

  invoke(args?: any) {
    const argText = args ? "" : JSON.stringify(args);

    new RawJavascriptModule(
      this,
      "Invoke",
      `\
console.group('Invoking Function "${this.node.id}"');
(${this.module.identifierRequire()}.${this.entrypoint})(${argText});
console.groupEnd();`
    );
  }
}
