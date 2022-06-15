import { IConstruct } from "constructs";
import { polycons } from "../..";
import { ICapturable } from "../../polycons/capturable";
import { IFunction } from "./function";

export const QUEUE_QUALIFIER = "std.Queue";

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

export const Queue: {
  new (scope: IConstruct, id: string, props?: QueueProps): IQueue;
} = polycons.Polycon.createConstructor(QUEUE_QUALIFIER);
