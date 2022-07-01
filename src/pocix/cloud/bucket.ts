import { IConstruct } from "constructs";
import { Polycon } from "../../polycons";

export const BUCKET_QUALIFIER = "pocix.cloud.Bucket";

export interface IBucket extends IConstruct {
  readonly public: boolean;
}

export interface BucketProps {
  readonly public?: boolean;
}

export class Bucket extends Polycon implements IBucket {
  public get public(): boolean {
    throw this.proxyError("public");
  }

  constructor(scope: IConstruct, id: string, props?: BucketProps) {
    super(BUCKET_QUALIFIER, scope, id, props);
  }
}

///

export interface IBucketClient {
  download(path: string): Promise<any>;
  upload(path: string, value: any): Promise<any>;
}
