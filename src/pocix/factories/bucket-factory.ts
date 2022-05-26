import { Construct, IConstruct } from "constructs";
import { polycons } from "../..";

export const BUCKET_QUALIFIER = "pocix.Bucket";

export interface IBucket extends IConstruct {
  readonly public: boolean;
}

export interface BucketProps {
  readonly public?: boolean;
}

export const Bucket: {
  new (scope: Construct, id: string, props: BucketProps): IBucket;
} = function (scope: Construct, id: string, props: BucketProps) {
  return new polycons.Polycon(
    BUCKET_QUALIFIER,
    scope,
    id,
    props
  ) as unknown as IBucket;
} as any;
