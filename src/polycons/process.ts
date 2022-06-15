import { writeFileSync } from "fs";
import { posix } from "path";
import { buildSync } from "esbuild";

const ORIGINAL_ENTRY_FILE = "__original_entry_bundle.js";
const NEW_ENTRY_FILE = "__new_entry_bundle.js";
const FINAL_BUNDLE = "final_bundle.js";

export interface IProcess {}

export interface ProcessOptions {
  readonly entryFile: string;
  readonly entryName: string;
}

export class NodeESBuildProcess implements IProcess {
  entryFile: string;
  entryName: string;
  constructor(options: ProcessOptions) {
    this.entryFile = options.entryFile;
    this.entryName = options.entryName;
  }

  bundle(outDir: string, captures: { [key: string]: string }) {
    // bundle original to new place
    const originalOutfile = posix.join(outDir, ORIGINAL_ENTRY_FILE);
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
    return require('./${originalOutfile}')['${this.entryName}'](originalEvent, {
        ${Object.entries(captures)
          .map((entry) => `        ${entry[0]}: ${entry[1]},`)
          .join("\n")}
          });
}`;
    const newEntryPath = posix.join(outDir, NEW_ENTRY_FILE);
    writeFileSync(newEntryPath, newEntry);

    const build = buildSync({
      bundle: true,
      platform: "node",
      keepNames: true,
      entryPoints: [newEntryPath],
      format: "cjs",
      outfile: FINAL_BUNDLE,
      allowOverwrite: true,
      absWorkingDir: outDir,
    });

    return build.outputFiles![0].path;
  }
}
