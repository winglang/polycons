import { IConstruct } from "constructs";
import { IFunction } from "../../std/factories/function-factory";
import { IQueue } from "../../std/factories/queue-factory";
import { JavascriptConstruct } from "./javascript-construct";
import { RawJavascript } from "./raw";

// The worst "fifo queue" implementation you've ever seen lol
export class QueueFuction extends JavascriptConstruct implements IQueue {
  enqueue(scope: IConstruct, id: string, stuff: any): void {
    new RawJavascript(
      scope,
      id,
      `MyCloud[${JSON.stringify(
        this.node.path
      )}].enqueue(JSON.parse(\`${JSON.stringify(stuff)}\`))`
    );
  }
  dequeue(scope: IConstruct, id: string) {
    new RawJavascript(
      scope,
      id,
      `MyCloud[${JSON.stringify(this.node.path)}].dequeue()`
    );
  }
  addWorkerFunction(func: IFunction): void {
    const construct = new RawJavascript(
      func,
      `Listener${func.node.id}`,
      `MyCloud[${JSON.stringify(
        this.node.path
      )}].addWorker(MyCloud[${JSON.stringify(func.node.path)}])`
    );

    construct.node.addDependency(this);
  }

  renderPrefix(): string {
    return ``;
  }
  renderPostfix(): string {
    return ``;
  }

  renderScript(): string {
    const fn = () => {
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
    };

    return `(${fn.toString()})()`;
  }
}
