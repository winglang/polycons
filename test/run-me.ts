import chalk, { ChalkInstance } from "chalk";
import { pocix } from "../src";
import { LocalNodeJSFactory } from "../src/providers/local-nodejs/nodejs-factory";

const app = new pocix.App({
  factory: new LocalNodeJSFactory(),
});

const MyCloud = {
  Queue: new pocix.Queue(app, "Queue", {}),
  Storage: new pocix.Bucket(app, "Storage", {}),
};

const func = new pocix.Function(app, "AdderLambda", {
  env: {
    TEST_ENV: "cool value",
    QUEUE_ID: MyCloud.Queue.node.path,
    BUCKET_ID: MyCloud.Storage.node.path,
  },
  function: async () => {
    const getClient = (id: string) => {
      return MyCloud[id] as any;
    };
    // This code is currently serialized via .toString()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const testRequire: ChalkInstance = require("chalk").default;
    console.group(
      testRequire.yellow(`process.env.TEST_ENV="${process.env.TEST_ENV}"`)
    );
    const bucket = getClient(process.env.BUCKET_ID);
    const queue = getClient(process.env.QUEUE_ID);

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
