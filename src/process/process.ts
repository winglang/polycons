import { Capture } from "./capture";

export interface IProcess {
  readonly entryFile: string;
  readonly entryName: string;

  // Storing subprocesses is probably important to avoid duplication
  readonly subprocesses: IProcess[];
}

export interface ProcessOptions {
  // TODO id is only a temporary solution, unique identity should be handled by an "asset" system
  readonly id: string;
  readonly entryFile: string;
  readonly entryName: string;
  readonly captures: Capture[];
}
