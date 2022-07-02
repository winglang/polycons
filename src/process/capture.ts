import { Module } from "./module";
import { IProcessConsumer } from "./process-consumer";

export abstract class CaptureClient {
  public static of(target: any): CaptureClient | undefined {
    // If it has a client, use that
    const client = target[CaptureClient.CLIENT_SYMBOL] as CaptureClient;
    if (client) {
      return client;
    } else {
      return undefined;
    }
  }

  public static register(target: any, client: CaptureClient) {
    Object.defineProperty(target, CaptureClient.CLIENT_SYMBOL, {
      value: client,
      enumerable: false,
    });
  }

  private static CLIENT_SYMBOL = Symbol.for("_CaptureClient");

  /**
   * Optional module to expose to consuming processes
   * */
  public abstract get clientModule(): Module | undefined;

  // Don't need it probably. Modules should be immutable and declare their own deps anyways
  // abstract bindToModule(capture: Capture, module: Module): void;

  /**
   *
   * May add system dependencies (e.g. environment variables)
   * */
  abstract bindToProcessConsumer(
    capture: Capture,
    consumer: IProcessConsumer
  ): void;

  abstract renderCapture(capture: Capture): string;
}

export interface BaseCaptureOptions {
  /** Name of (scoped) symbol */
  readonly symbol: string;

  /** Construction-time object */
  readonly target: any;

  // could add additional optional diagnostics here (linenumber, etc.)
}

export interface ClientCaptureOptions extends BaseCaptureOptions {
  /** Which methods are called on the captured object */
  readonly methods: string[];
}

export interface CaptureOptions extends ClientCaptureOptions {
  /** Override for the target's module */
  readonly client: CaptureClient;
}

export interface Capture {
  /** Name of (scoped) symbol */
  readonly symbol: string;

  /** Construction-time object */
  readonly target: any;

  /** Which methods are called on the captured object */
  readonly methods: string[];

  /** Override for the target's module */
  readonly client: CaptureClient;
}

export abstract class CaptureHelper {
  public static client(options: ClientCaptureOptions): Capture {
    const client = CaptureClient.of(options.target);
    if (!client) {
      throw new Error(`No client found for ${options.target}`);
    }

    return {
      ...options,
      client,
    };
  }

  public static direct(options: BaseCaptureOptions): Capture {
    return {
      ...options,
      methods: [],
      client: new DirectCaptureClient(),
    };
  }

  public static custom(options: CaptureOptions): Capture {
    return options;
  }

  constructor(public readonly options: CaptureOptions) {}
}

export class DirectCaptureClient extends CaptureClient {
  public get clientModule(): Module | undefined {
    return;
  }

  public bindToProcessConsumer(_capture: Capture, _consumer: IProcessConsumer) {
    // no-op
  }

  public renderCapture(capture: Capture): string {
    return JSON.stringify(capture.target);
  }
}
