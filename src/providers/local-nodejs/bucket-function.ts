import { IBucket } from "../../std/factories/bucket-factory";
import { JavascriptConstruct } from "./javascript-construct";

export class BucketFunction extends JavascriptConstruct implements IBucket {
  public: boolean = true;
  renderPrefix(): string {
    return ``;
  }
  renderPostfix(): string {
    return ``;
  }
  renderScript(): string {
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

    return `(${fn.toString()})()`;
  }
}
