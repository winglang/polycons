import { Construct, IConstruct } from "constructs";
import { LOCAL_CLOUD_IDENTIFIER } from "./constants";

export abstract class JavascriptModule extends Construct {
  constructor(scope: IConstruct, id: string) {
    super(scope, id);
  }

  identifier() {
    return this.node.addr;
  }

  identifierRequire() {
    return `require('./${this.identifier()}.js')`;
  }

  identifierRequireConst() {
    return `const ${this.identifier()} = require('./${this.identifier()}.js')`;
  }

  identifierExpression() {
    return `${LOCAL_CLOUD_IDENTIFIER}[${this.identifier()}]`;
  }

  invokeExpression(...args: any[]) {
    const argText = args.length === 0 ? "" : JSON.stringify(args);
    return `${this.identifierExpression()}(${argText})`;
  }

  renderPrefix(): string {
    return "";
  }

  renderPostfix(): string {
    return "";
  }

  extension(): string {
    return ".js";
  }

  abstract render(): string;
}
