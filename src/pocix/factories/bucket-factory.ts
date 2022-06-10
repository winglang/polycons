import { IConstruct } from "constructs";
import { polycons } from "../..";
import { ICapturable } from "../../polycons/capturable";

export const BUCKET_QUALIFIER = "pocix.Bucket";

export interface IBucket extends IConstruct, ICapturable {
  readonly public: boolean;
}

export interface IBucketClient {
  download(path: string): Promise<any>;
  upload(path: string, value: any): Promise<any>;
}

export interface IBucketProps {
  readonly public?: boolean;
}

export type Bucket = {
  new (scope: IConstruct, id: string, props?: IBucketProps): IBucket;
};

export const Bucket: Bucket =
  polycons.PolyconResolver.registerPolycon(BUCKET_QUALIFIER);
