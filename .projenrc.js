const { cdk } = require('projen');
const project = new cdk.JsiiProject({
  author: 'Christopher Rybicki',
  authorAddress: 'crybicki98@gmail.com',
  defaultReleaseBranch: 'main',
  name: 'polycons',
  repositoryUrl: 'https://github.com/monadahq/polycons',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();