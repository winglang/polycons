import { AwsFactory, Bucket, App } from '../src';

test('hello', () => {
  const app = new App({ factory: new AwsFactory() });
  new Bucket(app, 'MyBucket', {
    public: true,
  });

  const dir = app.synth();
  console.log(dir);
});