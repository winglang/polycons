import { IConstruct } from "constructs";
import { std } from "../..";
import { IBucketClient } from "../../pocix";
import { CaptureInfo, ICaptureSource } from "../../polycons/capturable";
import { JavascriptFunctionModule } from "./javascript-function-module";

export class BucketFunction
  extends JavascriptFunctionModule
  implements std.IBucket
{
  public: boolean = true;
  constructor(scope: IConstruct, id: string) {
    // IIFE to create a module for a baby bucket concept
    const clientFunction: () => IBucketClient = () => {
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
    };
    super(scope, id, {
      fn: clientFunction,
      invokeWith: [],
      entrypoint: "default",
    });
    this.subAccess = ".default";
  }
  capture(info: CaptureInfo): ICaptureSource {
    return {
      info,
      bind: (proc) => {
        proc.captures.push(info);
      },
    };
  }
}
