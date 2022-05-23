import { IConstruct } from "constructs";
import { FunctionProps, IFunction } from "../../std/factories/function-factory";
import { InvokeFunction } from "./invoke-function";
import { JavascriptConstruct } from "./javascript-construct";

export class FunctionFunction extends JavascriptConstruct implements IFunction {
  private functionDefinition: () => any;
  private env: any;

  // NOT IMPLEMENTED
  private file?: string;

  constructor(scope: IConstruct, id: string, props: FunctionProps) {
    super(scope, id);

    this.functionDefinition = props.function;
    this.env = props.env ?? {};
    this.file = props.file;
  }

  invoke(scope: IConstruct, id: string, _args?: any) {
    new InvokeFunction(scope, id, this);
  }

  renderPrefix(): string {
    return ``;
  }
  renderPostfix(): string {
    return ``;
  }

  renderScript(): string {
    return (
      this.functionDefinition.toString() +
      "\n" +
      Object.entries(this.env)
        .map(
          (entry) => `process.env.${entry[0]} = ${JSON.stringify(entry[1])};`
        )
        .join("\n")
    );
  }
}
