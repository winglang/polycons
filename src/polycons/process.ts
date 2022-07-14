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

export interface Process {
  readonly code: Code;
  readonly entrypoint: string;
  readonly captures: Record<string, Capture>;
}
