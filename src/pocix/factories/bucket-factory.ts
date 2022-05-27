import { IConstruct } from "constructs";
import { polycons } from "../..";

export const BUCKET_QUALIFIER = "std.Bucket";

export interface IBucket extends IConstruct {
  readonly public: boolean;
}

export interface BucketProps {
  readonly public?: boolean;
}

export const Bucket: {
  new (scope: IConstruct, id: string, props: BucketProps): IBucket;
} = polycons.PolyconResolver.createPolyconConstructor(BUCKET_QUALIFIER);
