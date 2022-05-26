import { IConstruct } from "constructs";
import { std } from "../..";
import { JavascriptConstruct } from "./javascript-construct";

export class BucketFunction extends JavascriptConstruct implements std.IBucket {
  public: boolean = true;
  constructor(scope: IConstruct, id: string) {
    super(scope, id, {
      assign: true,
      iife: true,
    });
  }
  render(): string {
    const fn = () => {
      const _data: any = {};
      return {
        get(key: string) {
          return _data[key];
        },
        set(key: string, value: any) {
          _data[key] = value;
        },
      };
    };

    return fn.toString();
  }
  renderPrefix(): string {
    return "";
  }
}
