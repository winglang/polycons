import chalk from "chalk";
import { IBucketClient, IQueueClient } from "../src/pocix";

interface MyCaptures {
  bucket: IBucketClient;
  queue: IQueueClient;
}
// Hack
export async function coolEntry(_event, captures: MyCaptures) {
  console.group(chalk.yellow(`process.env.TEST_ENV="${process.env.TEST_ENV}"`));
  const bucket = captures.bucket;
  const queue = captures.queue;

  let queueValue = await queue.dequeue();
  while (queueValue !== undefined) {
    let val = await bucket.download("counter");
    let newVal = (val ?? 0) + 1;

    await bucket.upload("counter", newVal);
    console.log(
      chalk.yellow(`Dequeued ${queueValue}\n`),
      chalk.yellow(`Counter: ${newVal}\n`)
    );

    queueValue = await queue.dequeue();
  }
  console.log(chalk.yellow(`Queue is empty, function complete`));
  console.groupEnd();
}
