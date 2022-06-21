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
    this.entrypoint = props.process.entryName;

    props.process.entryFile;
    this.module = new JavascriptFileModule(this, "File", {
      path: props.process.entryFile,
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

  addEnvironment(env: { [name: string]: string }): void {
    this.module.prefix +=
      Object.entries(env)
        .map(
          (entry) => `process.env.${entry[0]} = ${JSON.stringify(entry[1])};`
        )
        .join("\n") + "\n";
  }
  grantable(): IConstruct {
    return this;
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
