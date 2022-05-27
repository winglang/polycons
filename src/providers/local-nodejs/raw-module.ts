import { IConstruct } from "constructs";
import { JavascriptModule } from "./javascript-module";

export class RawJavascriptModule extends JavascriptModule {
  constructor(scope: IConstruct, id: string, private readonly content: string) {
    super(scope, id);
  }
  render(): string {
    return this.content;
  }
}
