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
    this.code = props.code;
  }
}
