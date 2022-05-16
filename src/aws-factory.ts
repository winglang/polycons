import * as aws from 'aws-cdk-lib';
import { Construct, IConstruct } from 'constructs';
import { IApp } from './app';
import { BucketProps, IBucket } from './bucket';
import { Factory } from './factory';

export class AwsFactory extends Factory {
  public construct(type: string, scope: Construct, name: string, props: any): IConstruct {
    switch (type) {
      case 'App': return this.constructApp();
      case 'Bucket': return this.constructBucket(scope, name, props);
      default:
        throw new Error('Unsupported polymorphic type');
    }
  }

  private constructApp() {
    const app = new aws.App();

    class Innie extends aws.Stack implements IApp {
      synth(): string {
        return app.synth().directory;
      }
    }
    return new Innie(app, 'Stack');
  }

  private constructBucket(scope: Construct, name: string, props: BucketProps): IConstruct {
    new aws.aws_s3.Bucket(scope, name + '.Resource', {
      publicReadAccess: props.public,
    });

    class Innie extends Construct implements IBucket {
      public: boolean = props.public ?? false;
    }

    return new Innie(scope, name);
  }
}