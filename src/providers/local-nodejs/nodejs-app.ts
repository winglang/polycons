import { mkdirSync, writeFileSync } from "fs";
import { posix } from "path";
import { cwd } from "process";
import { Construct } from "constructs";
import { buildSync } from "esbuild";
import { std } from "../..";
import { LOCAL_CLOUD_IDENTIFIER } from "./constants";
import { JavascriptModule } from "./javascript-module";

export class LocalNodeJSApp extends Construct implements std.IApp {
  synth() {
    let entryFileLines = Array<string>();
    entryFileLines.push(`global.${LOCAL_CLOUD_IDENTIFIER} = { modules: {}};`);
    entryFileLines.push(
      `var ${LOCAL_CLOUD_IDENTIFIER} = global.${LOCAL_CLOUD_IDENTIFIER};`
    );

    const outdir = posix.join(
      cwd().replace(/\\/g, "/"),
      "polycons.out/local-nodejs/"
    );
    const rawDir = posix.join(outdir, `prebundle/`);

    mkdirSync(rawDir, {
      recursive: true,
    });

    for (const construct of this.node.findAll()) {
      if (construct instanceof JavascriptModule) {
        const moduleName = construct.identifier();
        const moduleText = `${construct.renderPrefix()}${construct.render()}${construct.renderPostfix()}`;

        const path = posix.join(rawDir, `${moduleName}.js`);

        writeFileSync(path, moduleText);
        entryFileLines.push(`${construct.identifierRequireConst()};`);
        entryFileLines.push(
          `${LOCAL_CLOUD_IDENTIFIER}.modules["${moduleName}"] = ${moduleName};`
        );
        entryFileLines.push(
          `${LOCAL_CLOUD_IDENTIFIER}[${JSON.stringify(
            construct.node.path
          )}] = ${moduleName};`
        );
      }
    }

    entryFileLines.push(`module.exports = ${LOCAL_CLOUD_IDENTIFIER};`);

    const mainFilePath = posix.join(rawDir, `_prebundle.js`);
    writeFileSync(mainFilePath, entryFileLines.join("\n"));

    const outfile = posix.join(outdir, "mycloud.js");
    buildSync({
      bundle: true,
      platform: "node",
      keepNames: true,
      entryPoints: [mainFilePath],
      format: "cjs",
      treeShaking: false,
      outfile,
      allowOverwrite: true,
    });

    return outfile;
  }
}
