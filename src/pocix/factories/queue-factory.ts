import { Construct, IConstruct } from "constructs";
import { polycons } from "../..";
import { IFunction } from "./function-factory";

export const QUEUE_QUALIFIER = "pocix.Queue";

export interface IQueue extends IConstruct {
  enqueue(scope: IConstruct, id: string, stuff: any): void;
  dequeue(scope: IConstruct, id: string): any;
  addWorkerFunction(func: IFunction): void;
}

export interface QueueProps {}

export const Queue: {
  new (scope: Construct, id: string, props: QueueProps): IQueue;
} = function (scope: Construct, id: string, props: QueueProps) {
  return new polycons.Polycon(
    QUEUE_QUALIFIER,
    scope,
    id,
    props
  ) as unknown as IFunction;
} as any;
