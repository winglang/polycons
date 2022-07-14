const { cdk } = require("projen");

const project = new cdk.JsiiProject({
  name: "polycons",
  description: "Polymorphic constructs framework",
  author: "Monada",
  authorAddress: "ping@monada.co",
  defaultReleaseBranch: "main",
  repositoryUrl: "https://github.com/monadahq/polycons.git",
  deps: [
    "constructs@^10",
    "aws-cdk-lib",
    "cdktf",
    "@cdktf/provider-aws",
    "@cdktf/provider-azurerm",
  ],
  bundledDeps: ["esbuild@0.14.31", "aws-sdk"],
  peerDeps: ["constructs@^10"],
  devDeps: ["chalk"],
  prettier: true,
});

// just for testing
project.addGitIgnore("polycons.out/");
project.addGitIgnore("*.tfstate");

project.synth();
