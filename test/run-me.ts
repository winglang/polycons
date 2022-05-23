import chalk, { ChalkInstance } from "chalk";
import { LocalNodeJSFactory } from "../src/providers/local-nodejs/nodejs-factory";
import { App } from "../src/std/factories/app-factory";
import { Bucket } from "../src/std/factories/bucket-factory";
import { Function } from "../src/std/factories/function-factory";
import { Queue } from "../src/std/factories/queue-factory";

const app = new App({ factory: new LocalNodeJSFactory() });

const MyCloud = {
  Queue: new Queue(app, "Queue", {}),
  Storage: new Bucket(app, "Storage", {}),
};

const func = new Function(app, "AdderLambda", {
  env: {
    TEST_ENV: "cool value",
    QUEUE_ID: MyCloud.Queue.node.path,
    BUCKET_ID: MyCloud.Storage.node.path,
  },
  function: async () => {
    // This code is currently serialized via .toString()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const testRequire: ChalkInstance = require("chalk").default;
    console.group(
      testRequire.yellow(`process.env.TEST_ENV="${process.env.TEST_ENV}"`)
    );
    const bucket = MyCloud[process.env.BUCKET_ID] as any;
    const queue = MyCloud[process.env.QUEUE_ID] as any;

    let queueValue = queue.dequeue();
    while (queueValue !== undefined) {
      let val = bucket.get("counter") as number;
      let newVal = (val ?? 0) + 1;

      bucket.set("counter", newVal);
      console.log(
        testRequire.yellow(`Dequeued ${queueValue}\n`),
        testRequire.yellow(`Counter: ${newVal}\n`)
      );

      queueValue = queue.dequeue();
    }
    console.log(testRequire.yellow(`Queue is empty, function complete`));
    console.groupEnd();
  },
});

MyCloud.Queue.enqueue(MyCloud.Queue, "Enqueue1", "blah1");
MyCloud.Queue.enqueue(MyCloud.Queue, "Enqueue2", "blah2");
func.invoke(func, "Invoke1");

MyCloud.Queue.addWorkerFunction(func);

const code = app.synth();

console.log(chalk.gray(code));

console.log(chalk.green("Starting Cloud..."));

// wrapped in function for scope
(function runStuff() {
  eval(code);
})();
