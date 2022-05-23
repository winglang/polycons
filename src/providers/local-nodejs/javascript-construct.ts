import { Construct } from "constructs";

export interface IJavascriptConstructProps {
  text?: string;
  files?: string[];
  function?(...args: any[]): any;
}

export abstract class JavascriptConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  abstract renderScript(): string;
  abstract renderPrefix(): string;
  abstract renderPostfix(): string;
}
