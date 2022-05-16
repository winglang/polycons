import { Construct, IConstruct } from 'constructs';
import { Factory } from './factory';

export interface IBucket extends IConstruct {
  readonly public: boolean;
}

export interface BucketProps {
  readonly public?: boolean;
}

export class Bucket extends Construct implements IBucket {
  private readonly innie: IBucket;

  constructor(scope: Construct, id: string, props: BucketProps) {
    super(scope, id + '.Outie');

    this.innie = Factory.of(this).construct('Bucket', scope, id, props) as IBucket;
  }

  public get public(): boolean { return this.innie.public; };
}
