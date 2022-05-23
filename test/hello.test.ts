// import * as aws from 'aws-cdk-lib';
import { writeFileSync } from 'fs';
import { Bucket, App } from '../src';
import { LocalNodeJSFactory } from '../src/providers/local-nodejs/nodejs-factory';

test('hello', () => {
  // const app = new App({ factory: new AwsFactory() });
  const app = new App({ factory: new LocalNodeJSFactory() });
  new Bucket(app, 'AbstractBucket', {
    public: true,
  });
  // new aws.aws_s3.Bucket(app, 'RawCDKBucket', {
  //   publicReadAccess: false,
  // });

  const dir = app.synth();
  writeFileSync('test.js', dir, 'utf8');

  console.log(dir);
});