import { IConstruct } from "constructs";
import { JavascriptConstruct } from "./javascript-construct";

export class RawJavascript extends JavascriptConstruct {
  constructor(scope: IConstruct, id: string, private readonly text: string) {
    super(scope, id, {
      assign: false,
      iife: false,
    });
  }
  renderPrefix(): string {
    return "";
  }
  render(): string {
    return this.text;
  }
}
