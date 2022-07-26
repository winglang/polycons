import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

/**
 * Capture information. A capture is a reference from a Process to a
 * construction-time object or value.
 */
export interface Capture {
  /**
   * The captured object
   */
  readonly obj: any;

  /**
   * Which methods are called on the captured object
   */
  readonly methods?: string[];
}

/**
 * Represents something that is capturable.
 */
export interface ICapturable {
  capture(consumer: any, capture: Capture): Code;
}

/**
 * Reference to a piece of code.
 */
export abstract class Code {
  public abstract readonly language: string;
  public abstract readonly text: string;
  public abstract readonly path: string;
}

/**
 * Reference to a piece of JavaScript code.
 */
export class JSCode extends Code {
  public readonly language = "javascript";

  /**
   * Reference code from a file path.
   */
  public static fromFile(path: string) {
    return new JSCode(path);
  }

  /**
   * Reference code directly from a string.
   */
  public static fromInline(text: string) {
    const tempdir = mkdtempSync(join(tmpdir(), "polycons-"));
    const file = join(tempdir, "index.js");
    writeFileSync(file, text);
    return new JSCode(file);
  }

  private constructor(
    public readonly path: string,
  ) {
    super()
  }

  /**
   * Returns the text contents.
   */
  public get text(): string {
    return readFileSync(this.path, "utf-8");
  }
}

/**
 * Options for `Process`.
 */
export interface ProcessProps {
  /**
   * Reference to code containing the entrypoint function.
   */
  readonly code: Code;
  /**
   * Name of the exported function which will be run.
   */
  readonly entrypoint: string;
  /**
   * Capture information. During runtime, a map containing all captured values
   * will be passed as the first argument of the entrypoint function.
   *
   * Each key here will be the key for the final value in the map.
   */
  readonly captures?: { [name: string]: Capture };
}

/**
 * Runtime code with a named entrypoint. Typically this represents code
 * that exists to be run outside of the scope of a `constructs` application.
 */
export class Process {
  public readonly code: Code;
  public readonly entrypoint: string;
  public readonly captures: { [name: string]: Capture };

  constructor(props: ProcessProps) {
    this.code = props.code;
    this.entrypoint = props.entrypoint;
    this.captures = props.captures ?? {};
  }
}
