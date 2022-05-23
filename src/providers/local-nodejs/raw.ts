import { IConstruct } from "constructs";
import { JavascriptConstruct } from "./javascript-construct";

export class RawJavascript extends JavascriptConstruct {
  constructor(scope: IConstruct, id: string, private readonly rawText: string) {
    super(scope, id);
  }
  renderPrefix(): string {
    return ``;
  }
  renderPostfix(): string {
    return ``;
  }
  renderScript(): string {
    return this.rawText;
  }
}
