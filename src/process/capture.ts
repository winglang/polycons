import { IBindable } from "./binding";

export interface ICaptureClient {
  renderCapture(obj: any): string;
}

export interface ICapturable extends IBindable {
  readonly client: ICaptureClient;
}

export interface Capture {
  /** Name of (scoped) symbol */
  readonly symbol: string;

  /** Construction-time object */
  readonly target: any;

  /** Which methods are called on the captured object */
  readonly methods?: string[];

  /** Optional override for the target's client */
  readonly client?: ICaptureClient;

  // could add additional optional diagnostics here (linenumber, etc.)
}

/** Directly serialize an object as a capture */
export function directCapture(symbol: string, obj: any): Capture {
  return {
    symbol,
    target: obj,
    client: {
      renderCapture(capture: Capture): string {
        return JSON.stringify(capture.target);
      },
    },
  };
}
