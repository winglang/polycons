import { IConstruct } from "constructs";
import { std } from "../..";
import { JavascriptFunctionModule } from "./javascript-function-module";

export class BucketFunction
  extends JavascriptFunctionModule
  implements std.IBucket
{
  public: boolean = true;
  constructor(scope: IConstruct, id: string) {
    super(scope, id, {
      fn: () => {
        const _data: any = {};
        return {
          get(key: string) {
            return _data[key];
          },
          set(key: string, value: any) {
            _data[key] = value;
          },
        };
      },
      invokeWith: [],
    });
  }
}
