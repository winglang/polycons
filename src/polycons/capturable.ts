import { IConstruct } from "constructs";

export interface CaptureInfo {
  /** Name of (scoped) symbol */
  readonly symbol: string;

  /** The captured object */
  readonly obj: ICapturable;

  /** Which methods are called on the captured object */
  readonly methods?: string[];
  // could add additional optional diagnostics here (linenumber, etc.)
}

export interface ICapturable {
  capture(options: CaptureInfo): ICaptureSource;
}

/**
 * A computational platform capable of running a "process"
 */
export interface IProcessRunner {
  captures: CaptureInfo[];
  resolveCaptures(): void;
  addEnvironment(env: { [name: string]: string }): void;
  get grantable(): IConstruct;
}

export interface ICaptureSource {
  info: CaptureInfo;
  bind(proc: IProcessRunner): void;
}
