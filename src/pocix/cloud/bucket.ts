import { IConstruct } from "constructs";
import { Polycon } from "../../polycons";

/** Derived from JSII type */
export const BUCKET_QUALIFIER = "pocix.cloud.Bucket";

/**
 * This interface is shared by the polycon and the underlying concrete construct.
 */
export interface IBucket extends IConstruct {
  readonly public: boolean;
}

/**
 * construction properties
 */
export interface BucketProps {
  readonly public?: boolean;
}

/**
 * Object storage
 */
export class Bucket extends Polycon implements IBucket {
  public get public(): boolean {
    // This class is mostly a facade, so we don't need really need to implement the interface.
    // However, we want to be able to use `new Bucket(...)` so we have to provide some implementation
    throw this.proxyError("public");
  }

  constructor(scope: IConstruct, id: string, props?: BucketProps) {
    super(BUCKET_QUALIFIER, scope, id, props);
  }
}

///

/**
 * Inflight client for constructs implementing IBucket
 */
export interface IBucketClient {
  // Currently overusing "any" here because a real type is not currently interesting yet

  // Presumably, the final type would be something like `Promise<DownloadResult>` or something
  download(path: string): Promise<any>;
  upload(path: string, value: any): Promise<any>;
}
