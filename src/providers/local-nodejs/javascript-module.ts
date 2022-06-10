import { Construct, IConstruct } from "constructs";
import { LOCAL_CLOUD_IDENTIFIER } from "./constants";

export abstract class JavascriptModule extends Construct {
  public prefix: string = "";
  public postfix: string = "";
  public subAccess: string = "";

  constructor(scope: IConstruct, id: string) {
    super(scope, id);
  }

  identifier() {
    return this.node.addr;
  }

  identifierRequire() {
    return `require('./${this.identifier()}.js')${this.subAccess}`;
  }

  identifierRequireConst() {
    return `const ${this.identifier()} = ${this.identifierRequire()}`;
  }

  identifierExpression() {
    return `${LOCAL_CLOUD_IDENTIFIER}[${this.identifier()}]`;
  }

  invokeExpression(...args: any[]) {
    const argText = args.length === 0 ? "" : JSON.stringify(args);
    return `${this.identifierExpression()}(${argText})`;
  }

  abstract render(): string;
}
