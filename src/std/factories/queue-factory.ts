import { Construct, IConstruct } from "constructs";
import { Polycon } from "../../polycon";
import { IFunction } from "./function-factory";

export interface IQueue extends IConstruct {
  enqueue(scope: IConstruct, id: string, stuff: any): void;
  dequeue(scope: IConstruct, id: string): any;
  addWorkerFunction(func: IFunction): void;
}

export interface QueueProps {}

export interface IQueueFactory {
  constructQueue(scope: Construct, id: string, props: QueueProps): IQueue;
}

export class Queue extends Polycon implements IQueue {
  constructor(scope: Construct, id: string, props: QueueProps) {
    super("Queue", scope, id, props);
  }
  addWorkerFunction(func: IFunction) {
    throw this.proxyError(func);
  }
  enqueue(scope: IConstruct, id: string, stuff: any): void {
    throw this.proxyError(scope, id, stuff);
  }
  dequeue(scope: IConstruct, id: string): any {
    throw this.proxyError(scope, id);
  }
}
