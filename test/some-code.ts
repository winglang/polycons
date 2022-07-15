import { IBucketClient } from "../src/pocix";

interface MyCaptures {
  bucket: IBucketClient;
}

export async function handler(_event, captures: MyCaptures) {
  const bucket = captures.bucket;
  await bucket.download("counter");
  console.log("hello world!");
}
