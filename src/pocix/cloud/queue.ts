import { IConstruct } from "constructs";
import { Polycon } from "../../polycons";
import { IFunction } from "./function";

export const QUEUE_QUALIFIER = "pocix.cloud.Queue";

export interface IQueue extends IConstruct {
  /** Enqueue value to queue during "deployment" */
  enqueue(obj: any): void;

  /** Register function to listen to this queue and receive message from it */
  addWorkerFunction(func: IFunction): void;
}

export interface QueueProps {
  // Leaving values out of the interface for now
  // See IBucket for an example of props
}

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

///

/**
 * Inflight client for constructs implementing IQueue
 */
export interface IQueueClient {
  dequeue(): Promise<any>;
  enqueue(value: any): Promise<any>;
}
