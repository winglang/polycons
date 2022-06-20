import { IConstruct } from "constructs";
import { std } from "../..";
import { JavascriptFunctionModule } from "./javascript-function-module";

export class BucketFunction
  extends JavascriptFunctionModule
  implements std.IBucket
{
  public readonly public: boolean = true;

  constructor(scope: IConstruct, id: string) {
    // IIFE to create a module for a baby bucket concept
    super(scope, id, {
      fn: () => {
        const _data: any = {};
        return {
          async download(path: string) {
            return _data[path];
          },
          async upload(path: string, value: any) {
            _data[path] = value;
            return true;
          },
        };
      },
      invokeWith: [],
      entrypoint: "default",
    });
    this.subAccess = ".default";
  }
  bindCapture(obj: IConstruct): void {
    throw new Error("Method not implemented.");
  }
}
