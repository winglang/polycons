import chalk from "chalk";
import { std } from "../src";
import { LocalNodeJSApp } from "../src/providers/local-nodejs/nodejs-app";

const app = new LocalNodeJSApp();

const queue = new std.Queue(app, "Queue");
const storage = new std.Bucket(app, "Storage");

const func = new std.Function(app, "AdderLambda", {
  env: {
    TEST_ENV: "cool value",
    QUEUE_ID: queue.node.addr,
    BUCKET_ID: storage.node.addr,
  },
  entrypoint: "originalEntry",
  file: __dirname + "/test-lambda.ts",
});

storage
  .capture({
    obj: storage,
    symbol: "bucket",
    methods: ["get"],
  })
  .bind(func);
queue
  .capture({
    obj: queue,
    symbol: "queue",
    methods: ["enqueue", "dequeue"],
  })
  .bind(func);

queue.enqueue(queue, "Enqueue1", "blah1");
queue.enqueue(queue, "Enqueue2", "blah2");
func.invoke(func, "Invoke1");

queue.addWorkerFunction(func);

const code = app.synth();

console.log(chalk.gray(code));

console.log(chalk.green("Starting Cloud..."));

// wrapped in function for scope
(function runStuff() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const MyCloud = require(code);
  console.log(MyCloud);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const repl = require("repl").start("MyCloud> ");
  repl.context.MyCloud = MyCloud;
})();
