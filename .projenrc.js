const { cdk, github } = require("projen");
const project = new cdk.JsiiProject({
  name: "polycons",
  packageName: "@monadahq/polycons",
  author: "Monada, Inc.",
  authorAddress: "ping@monada.co",
  defaultReleaseBranch: "main",
  repositoryUrl: "https://github.com/monadahq/polycons",

  peerDeps: ["constructs@^10"],
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
});
project.synth();
