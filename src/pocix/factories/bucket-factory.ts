import { IConstruct } from "constructs";
import { polycons } from "../..";

export const BUCKET_QUALIFIER = "std.Bucket";

export interface IBucket extends IConstruct {
  readonly public: boolean;
}

export interface IBucketProps {
  readonly public?: boolean;
}

export type Bucket = {
  new (scope: IConstruct, id: string, props?: IBucketProps): IBucket;
};

export const Bucket: Bucket =
  polycons.PolyconResolver.registerPolycon(BUCKET_QUALIFIER);
