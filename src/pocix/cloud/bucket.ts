import { IConstruct } from "constructs";
import { polycons } from "../..";
import { ICapturable } from "../../polycons/capturable";

export const BUCKET_QUALIFIER = "pocix.Bucket";

export interface IBucket extends IConstruct, ICapturable {
  readonly public: boolean;
}

export interface BucketProps {
  readonly public?: boolean;
}

export interface IBucketClient {
  download(path: string): Promise<any>;
  upload(path: string, value: any): Promise<any>;
}

export const Bucket: {
  new (scope: IConstruct, id: string, props?: BucketProps): IBucket;
} = polycons.Polycon.createConstructor(BUCKET_QUALIFIER);
