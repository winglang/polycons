import { Construct, IConstruct } from "constructs";
import { IClientRecipe, Polycon } from "../polycons";
import { IFunction } from "./function";

export const QUEUE_QUALIFIER = "pocix.Queue";

export interface IQueue extends IConstruct {
  addWorkerFunction(func: IFunction): void;
}

export interface QueueProps {}

export class Queue extends Polycon implements IQueue {
  constructor(scope: Construct, id: string, props?: QueueProps) {
    super(QUEUE_QUALIFIER, scope, id, props);
  }

  public capture(): IClientRecipe {
    throw this.proxyError("capture");
  }

  public addWorkerFunction(func: IFunction): void {
    throw this.proxyError("addWorkerFunction", func);
  }
}

export interface IQueueClient {
  dequeue(): Promise<any>;
  enqueue(value: any): Promise<any>;
}
