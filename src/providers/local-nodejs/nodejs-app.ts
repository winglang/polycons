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
    let mainFile = `\
#!/usr/bin/env node
${LOCAL_CLOUD_IDENTIFIER} = {};

`;

    const files = [];
    const dir = posix.join(cwd().replace(/\\/g, "/"), "polycons.out/");
    mkdirSync(dir, {
      recursive: true,
    });

    for (const construct of this.node.findAll()) {
      if (construct instanceof JavascriptModule) {
        let fileContents = "";
        fileContents += construct.renderPrefix();
        fileContents += construct.render();
        fileContents += construct.renderPostfix();
        fileContents += "\n\n";

        const path = posix.join(dir, `${construct.identifier()}.js`);

        writeFileSync(path, fileContents);
        mainFile += `${construct.identifierRequireConst()};\n`;
        mainFile += `${LOCAL_CLOUD_IDENTIFIER}[${JSON.stringify(
          construct.node.path
        )}] = ${construct.identifier()};\n`;

        files.push(path);
      }
    }

    mainFile += `
console.log("Your cloud, available via '${LOCAL_CLOUD_IDENTIFIER}':", ${LOCAL_CLOUD_IDENTIFIER});
const repl = require('repl').start('${LOCAL_CLOUD_IDENTIFIER}> ');
repl.context.${LOCAL_CLOUD_IDENTIFIER} = ${LOCAL_CLOUD_IDENTIFIER};
`;

    const mainFilePath = posix.join(dir, `entry.ts`);

    writeFileSync(mainFilePath, mainFile);
    const outfile = posix.join(dir, "cloud.js");

    buildSync({
      bundle: true,
      platform: "node",
      target: "node16",
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
