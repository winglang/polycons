import { writeFileSync } from "fs";
import { posix } from "path";
import { cwd } from "process";
import { buildSync } from "esbuild";
import { Capture } from "./capture";
import { IProcess, ProcessOptions } from "./process";

// TODO we need an Asset system
const GLOBAL_OUTPUT = "polycons.out/process";
const ORIGINAL_ENTRY_FILE = "__original_entry_bundle.js";
const NEW_ENTRY_FILE = "__new_entry_bundle.js";
const FINAL_BUNDLE = "final_bundle.js";
export class NodeProcess implements IProcess {
  public readonly entryFile: string;
  public readonly entryName: string;
  public readonly captures: Capture[];
  public readonly outputDir: string;
  public readonly subprocesses: IProcess[];

  constructor(options: ProcessOptions) {
    const mainOutdir = posix.join(cwd(), GLOBAL_OUTPUT, options.id);

    this.outputDir = mainOutdir;
    this.entryFile = options.entryFile;
    this.entryName = options.entryName;
    this.captures = options.captures;
    this.subprocesses = [];

    // bundle original to new place

    const originalOutfile = posix.join(this.outputDir, ORIGINAL_ENTRY_FILE);
    const originalDirectory = posix.dirname(this.entryFile);

    buildSync({
      bundle: true,
      platform: "node",
      keepNames: true,
      entryPoints: [this.entryFile],
      format: "cjs",
      outfile: originalOutfile,
      allowOverwrite: true,
      absWorkingDir: originalDirectory,
    });

    // create new entry facade that invokes true entrypoint with two args
    const newEntry = `\
module.exports['${this.entryName}'] = function(originalEvent) {
    return require('${originalOutfile}')['${this.entryName}'](originalEvent, {
        ${this.captures
          .map(
            (entry) =>
              `        ${entry.symbol}: ${entry.client.renderCapture(entry)},`
          )
          .join("\n")}
          });
}`;
    const newEntryPath = posix.join(this.outputDir, NEW_ENTRY_FILE);
    writeFileSync(newEntryPath, newEntry);

    buildSync({
      bundle: true,
      platform: "node",
      keepNames: true,
      entryPoints: [newEntryPath],
      format: "cjs",
      outfile: FINAL_BUNDLE,
      allowOverwrite: true,
      absWorkingDir: this.outputDir,
    });

    this.entryFile = this.outputDir + "/" + FINAL_BUNDLE;
  }
}
