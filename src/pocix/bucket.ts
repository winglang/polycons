import { Construct, IConstruct } from "constructs";
import { IClientRecipe, Polycon } from "../polycons";
import { IFunction } from "./function";

export const BUCKET_QUALIFIER = "pocix.Bucket";

export interface IBucket extends IConstruct {
  readonly isPublic: boolean;
  addUploadHandler(fn: IFunction): void;
}

export interface BucketProps {
  readonly public?: boolean;
}

export class Bucket extends Polycon implements IBucket {
  constructor(scope: Construct, id: string, props?: BucketProps) {
    super(BUCKET_QUALIFIER, scope, id, props);
  }

  public capture(): IClientRecipe {
    throw this.proxyError("capture");
  }

  public get isPublic(): boolean {
    throw this.proxyError("public");
  }

  public addUploadHandler(_fn: IFunction): void {
    throw this.proxyError("addUploadHandler");
  }
}

export interface IBucketClient {
  download(path: string): Promise<any>;
  upload(path: string, value: any): Promise<any>;
}
