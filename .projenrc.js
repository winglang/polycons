const { cdk } = require('projen');
const project = new cdk.JsiiProject({
  name: 'polyconstruct',
  description: 'Polymorphic constructs',
  author: 'Elad Ben-Israel',
  authorAddress: 'eladb@monada.co',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/monadahq/polyconstruct.git',
  deps: [
    'constructs@^10',
    'aws-cdk-lib',
  ],
  peerDeps: ['constructs'],
});
project.synth();