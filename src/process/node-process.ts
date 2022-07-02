import { writeFileSync } from "fs";
import { posix } from "path";
import { cwd } from "process";
import { buildSync } from "esbuild";
import { FileModule } from "./module";
import { Process, ProcessBuilder } from "./process";
import { IProcessConsumer } from "./process-consumer";

// TODO we need an Asset system
const GLOBAL_OUTPUT = "polycons.out/process";
const ORIGINAL_ENTRY_FILE = "__original_entry_bundle.js";
const NEW_ENTRY_FILE = "__new_entry_bundle.js";
const FINAL_BUNDLE = "final_bundle.js";

export class NodeProcessBuilder extends ProcessBuilder {
  build(consumer: IProcessConsumer): Process {
    if (this.entrypoint == null) {
      throw new Error("Entrypoint not set");
    }

    // TODO idk
    const outpath = "";

    const entryModuleName = this.entrypoint.split(".")[0];
    const entryExportName = this.entrypoint.split(".")[1];

    const entryModule = this.modules.find(
      (m) => m.name === entryModuleName
    ) as FileModule;

    if (entryModule == null) {
      throw new Error(`Entry module ${entryModuleName} not found`);
    }

    if (entryModule.filePath == null) {
      // TODO only supports single files for now
      throw new Error(`Module ${entryModule.name} is not a file`);
    }

    const mainOutdir = posix.join(cwd(), GLOBAL_OUTPUT, outpath);

    // bundle original to new place
    // TODO probs don't need this

    const originalOutfile = posix.join(mainOutdir, ORIGINAL_ENTRY_FILE);
    const originalDirectory = posix.dirname(entryModule.filePath);

    // TODO add all modules to the bundle

    buildSync({
      bundle: true,
      platform: "node",
      keepNames: true,
      entryPoints: [entryModule.filePath],
      format: "cjs",
      outfile: originalOutfile,
      allowOverwrite: true,
      absWorkingDir: originalDirectory,
    });

    this.captures.forEach((c) => c.client.bindToProcessConsumer(c, consumer));

    // create new entry facade that invokes true entrypoint with two args
    const newEntrypoint = `\
module.exports['${entryExportName}'] = function(originalEvent) {
    return require('${originalOutfile}')['${entryExportName}'](originalEvent, {
        ${this.captures
          .map(
            (entry) =>
              `        ${entry.symbol}: ${(
                entry.client ?? entry.target.client
              )?.renderCapture(entry)},`
          )
          .join("\n")}
          });
}`;
    const newEntryPath = posix.join(mainOutdir, NEW_ENTRY_FILE);
    writeFileSync(newEntryPath, newEntrypoint);

    buildSync({
      bundle: true,
      platform: "node",
      keepNames: true,
      entryPoints: [newEntryPath],
      format: "cjs",
      outfile: FINAL_BUNDLE,
      allowOverwrite: true,
      absWorkingDir: mainOutdir,
    });

    const entryFile = mainOutdir + "/" + FINAL_BUNDLE;

    return {
      name: entryModuleName + "Process",
      filePath: entryFile,
      entrypoint: this.entrypoint,
      captures: this.captures,
      imports: this.modules,
    };
  }
}
