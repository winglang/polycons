import chalk from "chalk";
import { std } from "../src";
import { NodeProcess } from "../src/polycons";
import { CDKTerraformApp } from "../src/providers/cdktf-aws/cdkts-app";
// import { LocalNodeJSApp } from "../src/providers/local-nodejs/nodejs-app";

const app = new CDKTerraformApp();

const queue = new std.Queue(app, "Queue");
const storage = new std.Bucket(app, "Storage");

const func = new std.Function(app, "AdderLambda", {
  env: {
    TEST_ENV: "cool value",
    QUEUE_ID: queue.node.addr,
    BUCKET_ID: storage.node.addr,
  },
  process: new NodeProcess({
    id: "1",
    entryFile: __dirname + "/test-lambda.ts",
    entryName: "coolEntry",
    captures: [
      {
        obj: storage,
        symbol: "bucket",
        methods: ["get"],
        client: {
          getClientStatement(obj: any) {
            return "''";
            // return `require('../../local-nodejs/prebundle/${obj.node.addr}.js').default`;
          },
        },
      },
      {
        obj: queue,
        symbol: "queue",
        methods: ["enqueue", "dequeue"],
        client: {
          getClientStatement(obj: any) {
            return "''";
            // return `require('../../local-nodejs/prebundle/${obj.node.addr}.js').default`;
          },
        },
      },
    ],
  }),
});

// queue.enqueue("blah1");
// queue.enqueue("blah2");
func.invoke();

queue.addWorkerFunction(func);

const code = app.synth();

console.log(chalk.gray(code));

console.log(chalk.green("==="));

// wrapped in function for scope
// (function runStuff() {
//   // eslint-disable-next-line @typescript-eslint/no-require-imports
//   const MyCloud = require(code);
//   console.log(MyCloud);
//   // eslint-disable-next-line @typescript-eslint/no-require-imports
//   const repl = require("repl").start("MyCloud> ");
//   repl.context.MyCloud = MyCloud;
// })();
