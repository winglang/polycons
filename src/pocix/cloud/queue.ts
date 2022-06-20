import { IConstruct } from "constructs";
import { ICapturable, Polycon } from "../../polycons";
import { IFunction } from "./function";

export const QUEUE_QUALIFIER = "pocix.cloud.Queue";

export interface IQueue extends IConstruct, ICapturable {
  enqueue(scope: IConstruct, id: string, stuff: any): void;
  dequeue(scope: IConstruct, id: string): any;
  addWorkerFunction(func: IFunction): void;
}

export interface IQueueClient {
  dequeue(): Promise<any>;
  enqueue(value: any): Promise<any>;
}

export interface QueueProps {}

export class Queue extends Polycon implements IQueue, IConstruct {
  constructor(scope: IConstruct, id: string, props?: QueueProps) {
    super(QUEUE_QUALIFIER, scope, id, props);
  }
  bindCapture(obj: IConstruct): void {
    throw this.proxyError("bindCapture", obj);
  }
  enqueue(scope: IConstruct, id: string, stuff: any): void {
    this.proxyError("enqueue", scope, id, stuff);
  }
  dequeue(scope: IConstruct, id: string) {
    this.proxyError("dequeue", scope, id);
  }
  addWorkerFunction(func: IFunction): void {
    this.proxyError("addWorkerFunction", func);
  }
}
