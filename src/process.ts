/**
 * Capture information.
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
export class Code {
  /**
   * Reference code from a file path.
   */
  public static fromFile(path: string) {
    return new Code(path, undefined);
  }
  /**
   * Reference code directly from a string.
   */
  public static fromInline(text: string) {
    return new Code(undefined, text);
  }
  private constructor(
    /**
     * Path to a file.
     */
    public readonly path: string | undefined,
    /**
     * Text of a file.
     */
    public readonly text: string | undefined
  ) {}
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
 * Runtime code with a single entrypoint.
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
