import { readFileSync } from "fs";
import { IConstruct } from "constructs";
import { JavascriptModule } from "./javascript-module";

export class JavascriptFileModule extends JavascriptModule {
  constructor(scope: IConstruct, id: string, private readonly file: string) {
    super(scope, id);
  }
  render(): string {
    return readFileSync(this.file, "utf-8");
  }
}
