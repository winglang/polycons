import chalk from "chalk";
import { getClient } from "../src/providers/local-nodejs/client";

// Hack
export default function test() {
  console.group(chalk.yellow(`process.env.TEST_ENV="${process.env.TEST_ENV}"`));
  const bucket = getClient<any>(process.env.BUCKET_ID);
  const queue = getClient<any>(process.env.QUEUE_ID);

  let queueValue = queue.dequeue();
  while (queueValue !== undefined) {
    let val = bucket.get("counter");
    let newVal = (val ?? 0) + 1;

    bucket.set("counter", newVal);
    console.log(
      chalk.yellow(`Dequeued ${queueValue}\n`),
      chalk.yellow(`Counter: ${newVal}\n`)
    );

    queueValue = queue.dequeue();
  }
  console.log(chalk.yellow(`Queue is empty, function complete`));
  console.groupEnd();
}
