export interface Module {
  readonly name: string;
  readonly path: string;

  // Will we need an actual module graph? Do we need to reinvent that wheel?
  readonly imports?: Module[];
  readonly exports?: Module[];
}
