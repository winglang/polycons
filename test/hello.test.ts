// import * as aws from 'aws-cdk-lib';
import { Bucket } from "../src/pocix";
import { LocalNodeJSApp } from "../src/providers/local-nodejs/nodejs-app";

test("local app", () => {
  // const app = new App({ factory: new AwsFactory() });
  const app = new LocalNodeJSApp();
  new Bucket(app, "AbstractBucket", {
    public: true,
  });

  const file = app.synth();

  console.log(file);
});

test("cdk app", () => {
  // const app = new App({ factory: new AwsFactory() });
  const app = new LocalNodeJSApp();
  new Bucket(app, "AbstractBucket", {
    public: true,
  });
  // new aws.aws_s3.Bucket(app, 'RawCDKBucket', {
  //   publicReadAccess: false,
  // });

  const dir = app.synth();

  console.log(dir);
});
