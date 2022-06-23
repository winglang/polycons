export interface ICaptureClient {
  renderCapture(obj: any): string;
}

export interface ICapturable {
  capture(options: ICapture): Capture;
}

export interface ICapture {
  readonly symbol: string;
  readonly target: any;
  readonly methods?: string[];
}

export abstract class Capture implements ICapture {
  // TODO maybe doesn't belong here
  abstract get client(): ICaptureClient;

  abstract get target(): any;

  /** Which methods are called on the captured object */
  abstract get methods(): string[] | undefined;

  /** Name of (scoped) symbol */
  abstract get symbol(): string;

  // could add additional optional diagnostics here (linenumber, etc.)

  /** Directly serialize an object as a capture */
  public static direct(symbol: string, obj: any): Capture {
    return new DirectCapture(symbol, obj);
  }
}

export class DirectCaptureClient implements ICaptureClient {
  public renderCapture(capture: DirectCapture): string {
    return JSON.stringify(capture.target);
  }
}

export class DirectCapture extends Capture {
  public readonly methods = undefined;
  public readonly client: ICaptureClient = new DirectCaptureClient();

  constructor(public readonly symbol: string, public readonly target: any) {
    super();
  }
}
