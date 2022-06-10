import { IConstruct } from "constructs";
import { polycons } from "../..";
import { ICapturable } from "../../polycons/capturable";
import { IFunction } from "./function-factory";

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

export interface IQueueProps {}

type Queue = {
  new (scope: IConstruct, id: string, props?: IQueueProps): IQueue;
};

export const Queue: Queue =
  polycons.PolyconResolver.registerPolycon(QUEUE_QUALIFIER);
