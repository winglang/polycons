const { cdk } = require("projen");

const project = new cdk.JsiiProject({
  name: "polyconstruct",
  description: "Polymorphic constructs",
  author: "Elad Ben-Israel",
  authorAddress: "eladb@monada.co",
  defaultReleaseBranch: "main",
  repositoryUrl: "https://github.com/monadahq/polyconstruct.git",
  deps: ["constructs@^10", "aws-cdk-lib", "@pulumi/pulumi", "esbuild"],
  peerDeps: ["constructs@^10"],
  devDeps: ["chalk"],
  prettier: true,
});

// temp fix for windows
delete project.jest.config.testMatch;

project.synth();
