const { cdk, github } = require("projen");
const { NodePackageManager } = require("projen/lib/javascript");
const project = new cdk.JsiiProject({
  name: "polycons",
  packageName: "@monadahq/polycons",
  author: "Monada, Inc.",
  authorOrganization: true,
  authorAddress: "ping@monada.co",
  defaultReleaseBranch: "main",
  repositoryUrl: "https://github.com/monadahq/polycons",
  packageManager: NodePackageManager.NPM,
  peerDeps: ["constructs@^10.0.25"],
  prettier: true,

  npmRegistryUrl: "https://npm.pkg.github.com",
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["monada-bot[bot]"],
    secret: "PROJEN_GITHUB_TOKEN",
  },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  workflowNodeVersion: "16.x",
  gitignore: [".DS_Store"],
  codeCov: true,
  codeCovTokenSecret: "CODECOV_TOKEN",

  // disabled until we have publishing accounts set up...
  // publishToPypi: {
  //   distName: "polycons",
  //   module: "polycons",
  // },
  // publishToMaven: {
  //   mavenGroupId: "io.github.monadahq",
  //   javaPackage: "io.github.monadahq.polycons",
  //   mavenArtifactId: "polycons",
  // },
  // publishToNuget: {
  //   packageId: "Monada.Polycons",
  //   dotNetNamespace: "Monada.Polycons",
  // },
  // publishToGo: {
  //   moduleName: "github.com/monadahq/polycons-go",
  // },
});
project.synth();
