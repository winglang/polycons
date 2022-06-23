import { IConstruct } from "constructs";
import { Polycon } from "../../polycons";
import { IFunction } from "./function";

export const QUEUE_QUALIFIER = "pocix.cloud.Queue";

export interface IQueue extends IConstruct {
  enqueue(obj: any): void;
  addWorkerFunction(func: IFunction): void;
}

export interface IQueueClient {
  dequeue(): Promise<any>;
  enqueue(value: any): Promise<any>;
}

export interface QueueProps {}

export class Queue extends Polycon implements IQueue {
  constructor(scope: IConstruct, id: string, props?: QueueProps) {
    super(QUEUE_QUALIFIER, scope, id, props);
  }

  enqueue(stuff: any): void {
    throw this.proxyError("enqueue", stuff);
  }

  addWorkerFunction(func: IFunction): void {
    throw this.proxyError("addWorkerFunction", func);
  }
}
