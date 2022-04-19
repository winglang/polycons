const { cdk } = require('projen');
const project = new cdk.JsiiProject({
  author: 'Elad Ben-Israel',
  authorAddress: 'elad.benisrael@gmail.com',
  defaultReleaseBranch: 'main',
  name: 'polyconstruct',
  repositoryUrl: 'git@github.com:monadahq/polyconstruct.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();