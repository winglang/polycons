const { cdk } = require("projen");

const project = new cdk.JsiiProject({
  name: "polyconstruct",
  description: "Polymorphic constructs framework",
  author: "Monada",
  authorAddress: "eladb@monada.co",
  defaultReleaseBranch: "main",
  repositoryUrl: "https://github.com/monadahq/polyconstruct.git",
  deps: ["constructs@^10", "aws-cdk-lib"],
  bundledDeps: ["esbuild@0.14.31", "aws-sdk"],
  peerDeps: ["constructs@^10"],
  devDeps: ["chalk"],
  prettier: true,
});

// just for testing
project.addGitIgnore("polycons.out/");

project.synth();
