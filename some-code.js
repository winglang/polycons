export async function handler(captures) {
  const bucket = captures.bucket;
  await bucket.download("counter");
  console.log("hello world!");
}