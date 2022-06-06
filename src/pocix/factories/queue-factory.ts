import { IConstruct } from "constructs";
import { polycons } from "../..";
import { IFunction } from "./function-factory";

export const QUEUE_QUALIFIER = "std.Queue";

export interface IQueue extends IConstruct {
  enqueue(scope: IConstruct, id: string, stuff: any): void;
  dequeue(scope: IConstruct, id: string): any;
  addWorkerFunction(func: IFunction): void;
}

export interface IQueueProps {}

export type Queue = {
  new (scope: IConstruct, id: string, props?: IQueueProps): IQueue;
};

export const Queue: Queue =
  polycons.PolyconResolver.registerPolycon(QUEUE_QUALIFIER);
