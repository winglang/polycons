import { IConstruct } from "constructs";
import { std } from "../..";
import { FunctionFunction } from "./function-function";
import { JavascriptFunctionModule } from "./javascript-function-module";
import { RawJavascriptModule } from "./raw-module";

// The worst "fifo queue" implementation you've ever seen lol
export class QueueFuction
  extends JavascriptFunctionModule
  implements std.IQueue
{
  constructor(scope: IConstruct, id: string) {
    super(scope, id, {
      fn: () => {
        const _data: any[] = [];
        const _workers: any[] = [];

        setInterval(() => {
          if (_workers.length > 0 && _data.length > 0) {
            for (const worker of _workers) {
              worker();
            }
          }
        }, 1000);

        return {
          dequeue() {
            return _data.pop();
          },
          enqueue(value: any) {
            _data.push(value);
          },
          size() {
            return _data.length;
          },
          addWorker(worker: any) {
            return _workers.push(worker);
          },
        };
      },
      invokeWith: [],
    });
  }

  enqueue(scope: IConstruct, id: string, stuff: any): void {
    new RawJavascriptModule(
      scope,
      id,
      `${this.identifierRequire()}.enqueue(JSON.parse(\`${JSON.stringify(
        stuff
      )}\`))`
    );
  }
  dequeue(scope: IConstruct, id: string) {
    new RawJavascriptModule(scope, id, `${this.identifierRequire()}.dequeue()`);
  }
  addWorkerFunction(func: FunctionFunction): void {
    const construct = new RawJavascriptModule(
      func,
      `Listener${func.node.id}`,
      `\
${func.module.identifierRequireConst()};
${this.identifierRequireConst()};
${this.identifier()}.addWorker(${func.module.identifier()});`
    );

    construct.node.addDependency(this);
  }
}
