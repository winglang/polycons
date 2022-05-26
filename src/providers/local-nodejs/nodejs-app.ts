import { Construct } from "constructs";
import { buildSync } from "esbuild";
import { pocix } from "../..";
import { LOCAL_CLOUD_IDENTIFIER } from "./constants";
import { JavascriptConstruct } from "./javascript-construct";

export class LocalNodeJSApp extends Construct implements pocix.IApp {
  synth() {
    let returnString = `\
#!/usr/bin/env node
const ${LOCAL_CLOUD_IDENTIFIER} = {};

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
console.log("Your cloud, available via '${LOCAL_CLOUD_IDENTIFIER}':", ${LOCAL_CLOUD_IDENTIFIER});
const repl = require('repl').start('${LOCAL_CLOUD_IDENTIFIER}> ');
repl.context.${LOCAL_CLOUD_IDENTIFIER} = ${LOCAL_CLOUD_IDENTIFIER};
`;

    const build = buildSync({
      bundle: true,
      platform: "node",
      target: "node16",
      keepNames: true,
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
