import { IBucketClient } from "../../std/clients/bucket-client";

export class LocalBucketClient implements IBucketClient {
  private bucket: any;
  constructor(bucketId: string) {
    this.bucket = (global as any).MyCloud[bucketId];
  }
  get<TObjectType>(key: string): TObjectType {
    return this.bucket.get(key);
  }
  set<TObjectType>(key: string, value: TObjectType): void {
    this.bucket.set(key, value);
  }
}
