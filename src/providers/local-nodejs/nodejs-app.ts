import { Construct } from "constructs";
import * as esbuild from "esbuild";
import { IApp } from "../../std/factories/app-factory";
import { JavascriptConstruct } from "./javascript-construct";

export class LocalNodeJSApp extends Construct implements IApp {
  synth() {
    let returnString = "#!/usr/bin/env node\nconst MyCloud = {};\n";

    for (const construct of this.node.findAll()) {
      if (construct instanceof JavascriptConstruct) {
        returnString += construct.renderPrefix();
        returnString += `MyCloud[${JSON.stringify(
          construct.node.path
        )}] = ${construct.renderScript()};`;
        returnString += construct.renderPostfix();
        returnString += "\n\n";
      }
    }

    returnString += `\nconsole.log("Your cloud, available via 'MyCloud':", MyCloud);\nconst repl = require('repl').start('MyCloudREPL::> ');\nrepl.context.MyCloud = MyCloud;\n`;

    const build = esbuild.buildSync({
      bundle: true,
      platform: "node",
      target: "node14",
      stdin: {
        contents: returnString,
        resolveDir: process.cwd(),
      },
      treeShaking: false,
      write: false,
    });

    return build.outputFiles[0].text;
  }
}
