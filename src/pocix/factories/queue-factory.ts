import { IConstruct } from "constructs";
import { polycons } from "../..";
import { IFunction } from "./function-factory";

export const QUEUE_QUALIFIER = "std.Queue";

export interface IQueue extends IConstruct {
  enqueue(scope: IConstruct, id: string, stuff: any): void;
  dequeue(scope: IConstruct, id: string): any;
  addWorkerFunction(func: IFunction): void;
}

export interface QueueProps {}

export const Queue: {
  new (scope: IConstruct, id: string, props: QueueProps): IQueue;
} = polycons.PolyconResolver.createPolyconConstructor(QUEUE_QUALIFIER);
