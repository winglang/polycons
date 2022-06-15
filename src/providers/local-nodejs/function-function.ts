import { Construct, IConstruct } from "constructs";
import { std } from "../..";
import { CaptureInfo } from "../../polycons/capturable";
import { JavascriptFileModule } from "./javascript-file-module";
import { JavascriptFunctionModule } from "./javascript-function-module";
import { JavascriptModule } from "./javascript-module";
import { RawJavascriptModule } from "./raw-module";

const INJECTED_ENTRYPOINT = "__handler";

export class FunctionFunction extends Construct implements std.IFunction {
  public readonly module: JavascriptModule;
  public readonly entrypoint: string = INJECTED_ENTRYPOINT;
  captures: CaptureInfo[] = [];

  constructor(scope: IConstruct, id: string, props: std.IFunctionProps) {
    super(scope, id);
    this.entrypoint = props.entrypoint;

    if (props.file) {
      this.module = new JavascriptFileModule(this, "File", {
        path: props.file,
        entrypoint: props.entrypoint,
      });
    } else if (props.fn) {
      this.module = new JavascriptFunctionModule(this, "Function", {
        fn: props.fn,
        entrypoint: props.entrypoint,
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

  // create a function that invoke the entrypoint with the captured clients/values
  resolveCaptures(): void {
    const captureObject: Record<string, string> = {};
    for (const capture of this.captures) {
      console.log("ADDING CAPTURE");
      if (capture.obj instanceof JavascriptModule) {
        const module = capture.obj;
        // Add client for the given symbol
        captureObject[capture.symbol] = module.identifierRequire();
        console.log("ADDING CAPTURE", capture.symbol);
      }
    }

    this.module.postfix += `
module.exports['${INJECTED_ENTRYPOINT}'] = async function ${INJECTED_ENTRYPOINT}(event) {
  return ${this.entrypoint}(event, {
${Object.entries(captureObject)
  .map((entry) => `    ${entry[0]}: ${entry[1]},`)
  .join("\n")}
  })
}
`;
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

  invoke(scope: IConstruct, id: string, args?: any) {
    const argText = args ? "" : JSON.stringify(args);

    new RawJavascriptModule(
      scope,
      id,
      `\
console.group('Invoking Function "${this.node.id}"');
(${this.module.identifierRequire()}.${INJECTED_ENTRYPOINT})(${argText});
console.groupEnd();`
    );
  }
}
