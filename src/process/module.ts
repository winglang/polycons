export interface Module {
  readonly name: string;

  // Will we need an actual module graph? Do we need to reinvent that wheel?
  readonly imports?: Module[];
  readonly exports?: Module[];
}

export interface TextModule extends Module {
  readonly text: string;
}

export interface FileModule extends Module {
  readonly filePath: string;
}

export interface DirectoryModule extends Module {
  readonly directoryPath: string;
}
