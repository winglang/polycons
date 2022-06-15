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
  // getProcessBinder(): IProcessBinder;
}

/**
 * A computational platform capable of running a "process"
 */
export interface IProcessRunner {
  captures: CaptureInfo[];
  resolveCaptures(): void;
  addEnvironment(env: { [name: string]: string }): void;
  grantable(): IConstruct;
}

export interface IProcessBinder {
  info: CaptureInfo;
  bind(proc: IProcessRunner): void;
}
