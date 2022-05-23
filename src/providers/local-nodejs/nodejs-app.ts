import { Construct } from "constructs";
import * as esbuild from "esbuild";
import { IApp } from "../../std/factories/app-factory";
import { JavascriptConstruct } from "./javascript-construct";

export class LocalNodeJSApp extends Construct implements IApp {
  synth() {
    let returnString = `\
#!/usr/bin/env node
const MyCloud = {};

`;

    for (const construct of this.node.findAll()) {
      if (construct instanceof JavascriptConstruct) {
        const rendered = construct.iife
          ? `(${construct.render()})()`
          : construct.render();
        const statement = construct.assign
          ? `${construct.identifierExpression()} = ${rendered}\n\n`
          : rendered;

        returnString += construct.renderPrefix();
        returnString += statement;
        returnString += "\n\n";
      }
    }

    returnString += `
console.log("Your cloud, available via 'MyCloud':", MyCloud);
const repl = require('repl').start('MyCloudREPL::> ');
repl.context.MyCloud = MyCloud;
`;

    const build = esbuild.buildSync({
      bundle: true,
      platform: "node",
      target: "node16",
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
