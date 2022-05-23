export interface IBucketClient {
  get<TObjectType>(key: string): TObjectType;
  set<TObjectType>(key: string, value: TObjectType): void;
}
