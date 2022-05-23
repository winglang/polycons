import { IBucketClient } from "../../std/clients/bucket-client";

export class LocalBucketClient implements IBucketClient {
  constructor(private readonly bucketId: string) {}

  get(key: string) {
    throw new Error("Method not implemented.");
  }
  set(key: string, value: any): void {
    throw new Error("Method not implemented.");
  }
}
