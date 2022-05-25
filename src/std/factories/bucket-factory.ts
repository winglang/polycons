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

export const Bucket: {
  new (scope: Construct, id: string, props: BucketProps): IBucket;
} = function (scope: Construct, id: string, props: BucketProps) {
  return new Polycon("Bucket", scope, id, props) as unknown as IBucket;
} as any;
