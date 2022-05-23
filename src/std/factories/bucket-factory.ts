import { Construct, IConstruct } from "constructs";
import { Polycon } from "../../polycon";

export interface IBucket extends IConstruct {
  readonly public: boolean;
}

export interface BucketProps {
  readonly public?: boolean;
}

export interface IBucketFactory {
  constructBucket(scope: Construct, id: string, props: BucketProps): IBucket;
}

export class Bucket extends Polycon implements IBucket {
  readonly public!: boolean;

  constructor(scope: Construct, id: string, props: BucketProps) {
    super("Bucket", scope, id, props);
  }
}
