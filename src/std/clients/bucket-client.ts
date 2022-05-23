export interface IBucketClient {
  get(key: string): any;
  set(key: string, value: any): void;
}
