import { IConstruct } from "constructs";
import { std } from "../..";
import { IQueueClient } from "../../pocix";
import { ICapturable } from "../../polycons";
import { JavascriptFunctionModule } from "./javascript-function-module";
import { NodeFunction } from "./node-function";
import { RawJavascriptModule } from "./raw-module";

// The worst "fifo queue" implementation you've ever seen lol
export class NodeQueue
  extends JavascriptFunctionModule
  implements std.IQueue, ICapturable
{
  constructor(scope: IConstruct, id: string) {
    const clientFunction: () => IQueueClient = () => {
      const _data: any[] = [];
      const _workers: any[] = [];

      setInterval(() => {
        console.log(_workers.length, _data.length);
        if (_workers.length > 0 && _data.length > 0) {
          for (const worker of _workers) {
            worker();
          }
        }
      }, 1000);

      return {
        async dequeue() {
          return _data.pop();
        },
        async enqueue(value: any) {
          return _data.push(value);
        },
        async size() {
          return _data.length;
        },
        addWorker(worker: any) {
          return _workers.push(worker);
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
  bindCapture(_obj: IConstruct): void {}

  enqueue(stuff: any): void {
    new RawJavascriptModule(
      this,
      "Enqueue",
      `${this.identifierRequire()}.enqueue(JSON.parse(\`${JSON.stringify(
        stuff
      )}\`))`
    );
  }
  addWorkerFunction(func: NodeFunction): void {
    const construct = new RawJavascriptModule(
      func,
      `Listener${func.node.id}`,
      `\
${func.module.identifierRequireConst()};
${this.identifierRequireConst()};
${this.identifier()}.addWorker(${func.module.identifier()}.${func.entrypoint});`
    );

    construct.node.addDependency(this, func);
  }
}
