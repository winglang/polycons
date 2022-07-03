import { Capture } from "./capture";
import { FileModule, Module } from "./module";

/**
 * A process is a module that exposes an entrypoint and can capture values to include
 */
export interface Process extends FileModule {
  /** Format: {module name}.{export} */
  readonly entrypoint: string;

  readonly captures: Capture[];
}

/**
 * A process builder provide a fluent API for creating a process.
 *
 * Processes are immutable while a process builder is mutable.
 */
export abstract class ProcessBuilder {
  protected modules: Module[] = [];
  protected captures: Capture[] = [];
  protected entrypoint: string = "";

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

  abstract createProcess(): Process;
}
