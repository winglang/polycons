/**
 * Purpose: Immutable description of code "module"
 * "module" in this sense should be very similar in concept to an ESM, WASM, or other module.
 *
 * TODO Not really sure about a model for this yet
 */
export interface Module {
  readonly name: string;

  // TODO Will we need an actual module graph? Do we need to reinvent that wheel?
  readonly imports?: Module[];

  // readonly exports?: Module[];
}

/**
 * Raw/in-memory module data
 */
export interface TextModule extends Module {
  readonly text: string;
}

export interface FileModule extends Module {
  readonly filePath: string;
}

export interface DirectoryModule extends Module {
  readonly directoryPath: string;
}

export interface NodeModule extends Module {
  readonly spec: string;
}
