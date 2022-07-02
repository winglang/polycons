import { Capture } from "./capture";
import { FileModule, Module } from "./module";
import { IProcessConsumer } from "./process-consumer";

export interface Process extends FileModule {
  /** Format: {module name}.{export} */
  readonly entrypoint: string;

  readonly captures: Capture[];
}

export abstract class ProcessBuilder {
  protected modules: Module[];
  protected captures: Capture[];
  protected entrypoint: string;

  addEntryModule(exportName: string, module: Module) {
    this.modules.push(module);
    this.entrypoint = `${module.name}.${exportName}`;
    return this;
  }

  addModule(module: Module) {
    this.modules.push(module);
    return this;
  }

  addCapture(capture: Capture) {
    this.captures.push(capture);
    return this;
  }

  abstract build(consumer: IProcessConsumer): Process;
}
