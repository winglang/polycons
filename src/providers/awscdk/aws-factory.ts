import * as aws from 'aws-cdk-lib';
import { Construct, IConstruct } from 'constructs';
import { PolyconFactory } from '../../std/factories/base-factory';
import { BucketProps, IBucket } from '../../std/factories/bucket-factory';

export class AwsFactory {
  // constructApp(): IConstruct {
  //   return new aws.Stack(new aws.App());
  // }

  // constructBucket(scope: Construct, name: string, props: BucketProps): IBucket {
  //   return new aws.aws_s3.Bucket(scope, name, {
  //     publicReadAccess: props.public,
  //   });
  // }
}