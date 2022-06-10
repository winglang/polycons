import { IConstruct } from "constructs";
import { buildSync } from "esbuild";
import { JavascriptModule } from "./javascript-module";

export interface JavascriptFileModuleOptions {
  path: string;
  entrypoint: string;
}

export class JavascriptFileModule extends JavascriptModule {
  constructor(
    scope: IConstruct,
    id: string,
    private readonly props: JavascriptFileModuleOptions
  ) {
    super(scope, id);
  }
  render(): string {
    const build = buildSync({
      bundle: true,
      platform: "node",
      keepNames: true,
      entryPoints: [this.props.path],
      format: "cjs",
      treeShaking: false,
      write: false,
    });

    return build.outputFiles![0].text;
  }
}
