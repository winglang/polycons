import { IConstruct } from "constructs";
import { polycons } from "../..";

export const BUCKET_QUALIFIER = "pocix.Bucket";

export interface IBucket extends IConstruct {
  readonly public: boolean;
}

export interface IBucketProps {
  readonly public?: boolean;
}

type Bucket = {
  new (scope: IConstruct, id: string, props?: IBucketProps): IBucket;
};

export const Bucket: Bucket =
  polycons.PolyconResolver.registerPolycon(BUCKET_QUALIFIER);
