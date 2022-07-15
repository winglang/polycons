import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { buildSync } from "esbuild";
import { Capture } from "./capture";

export class Code {
  public static fromFile(path: string) {
    return new Code(path, undefined);
  }
  public static fromInline(text: string) {
    return new Code(undefined, text);
  }
  private constructor(
    public readonly path: string | undefined,
    public readonly text: string | undefined
  ) {}
}

export interface ProcessProps {
  readonly code: Code;
  readonly entrypoint: string;
  readonly captures: Record<string, Capture>;
}

export class Process {
  public readonly code: Code;
  public readonly entrypoint: string;
  public readonly captures: Record<string, Capture>;
  constructor(props: ProcessProps) {
    this.entrypoint = props.entrypoint;
    this.captures = props.captures;
    this.code = this.bundleFile(props.code);
  }

  private bundleFile(code: Code): Code {
    const tmpdir = fs.mkdtempSync(join(os.tmpdir(), "polycons-"));

    // TODO: handle inline text case
    const originalFileName = code.path!;

    // index.handler -> handler
    const entryExportName = this.entrypoint.split(".")[1];

    const newEntrypoint = join(tmpdir, "index.js");
    fs.writeFileSync(
      newEntrypoint,
      `\
const CAPTURES = {
${Object.entries(this.captures)
  .map(([name, capture]) => `  ${name}: ${renderCapture(name, capture)},`)
  .join("\n")}
};

module.exports['${entryExportName}'] = function(originalEvent) {
    return require('${originalFileName}')['${entryExportName}'](originalEvent, CAPTURES);
};`
    );
    console.error(fs.readFileSync(newEntrypoint).toString());

    const outfile = join(tmpdir, "bundle.js");
    buildSync({
      bundle: true,
      platform: "node",
      format: "cjs",
      entryPoints: [newEntrypoint],
      outfile,
      allowOverwrite: true,
    });
    console.error(fs.readFileSync(outfile));

    return Code.fromFile(outfile);
  }
}

function renderCapture(name: string, capture: Capture): string {
  if (capture.recipe.code.path) {
    return `require("${capture.recipe.code.path}")(process.env["__CAPTURE_SYM_${name}}"])`;
  } else if (capture.recipe.code.text) {
    return capture.recipe.code.text;
  } else {
    throw new Error("No code found in capture.");
  }
}
