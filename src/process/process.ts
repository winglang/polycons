import { Capture } from "./capture";
import { Module } from "./module";

// export interface IProcessRunner {
//   readonly process: IProcess;
//   bindCapture(capture: ICapturable);
// }

export interface Process extends Module {
  /** Format: {module name}.{export} */
  readonly entrypoint: string;

  readonly captures: Capture[];
}
