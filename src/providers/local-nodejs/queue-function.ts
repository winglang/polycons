import { IConstruct } from "constructs";
import { IQueue } from "../../std/factories/queue-factory";
import { FunctionFunction } from "./function-function";
import { JavascriptConstruct } from "./javascript-construct";
import { RawJavascript } from "./raw";

// The worst "fifo queue" implementation you've ever seen lol
export class QueueFuction extends JavascriptConstruct implements IQueue {
  constructor(scope: IConstruct, id: string) {
    super(scope, id, {
      assign: true,
      iife: true,
    });
  }

  enqueue(scope: IConstruct, id: string, stuff: any): void {
    new RawJavascript(
      scope,
      id,
      `${this.identifierExpression()}.enqueue(JSON.parse(\`${JSON.stringify(
        stuff
      )}\`))`
    );
  }
  dequeue(scope: IConstruct, id: string) {
    new RawJavascript(scope, id, `${this.identifierExpression()}.dequeue()`);
  }
  addWorkerFunction(func: FunctionFunction): void {
    const construct = new RawJavascript(
      func,
      `Listener${func.node.id}`,
      `${this.identifierExpression()}.addWorker(${func.identifierExpression()})`
    );

    construct.node.addDependency(this);
  }
  renderPrefix(): string {
    return "";
  }
  render(): string {
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

    return fn.toString();
  }
}
