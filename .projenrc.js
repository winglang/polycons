const { cdk, github } = require("projen");
const { NodePackageManager } = require("projen/lib/javascript");
const project = new cdk.JsiiProject({
  name: "polycons",
  packageName: "polycons",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  license: "MIT",

  defaultReleaseBranch: "main",
  repositoryUrl: "https://github.com/winglang/polycons",
  packageManager: NodePackageManager.NPM,
  peerDeps: ["constructs@^10.0.25"],
  prettier: true,

  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["monada-bot[bot]"],
    secret: "PROJEN_GITHUB_TOKEN",
  },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromPersonalAccessToken(),
  },
  workflowNodeVersion: "16.x",
  gitignore: [".DS_Store"],
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",

  releaseToNpm: true,
  publishToPypi: {
    distName: "polycons",
    module: "polycons",
  },

  // disabled until we have publishing accounts set up...
  // publishToMaven: {
  //   mavenGroupId: "io.github.winglang",
  //   javaPackage: "io.github.winglang.polycons",
  //   mavenArtifactId: "polycons",
  // },
  // publishToNuget: {
  //   packageId: "Monada.Polycons",
  //   dotNetNamespace: "Monada.Polycons",
  // },
  // publishToGo: {
  //   moduleName: "github.com/winglang/polycons-go",
  // },
});
project.synth();
