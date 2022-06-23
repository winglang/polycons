import chalk from "chalk";
import { std } from "../src";
import { NodeProcess } from "../src/process-construction";
import { CDKTerraformApp } from "../src/providers/cdktf-aws/cdkts-app";
// import { LocalNodeJSApp } from "../src/providers/local-nodejs/nodejs-app";

const clientProcess = new NodeProcess({
  entryFile: __dirname + "/src/providers/cdktf-aws/bucket-client.ts",
});

const app = new CDKTerraformApp();

const queue = new std.Queue(app, "Queue");
const storage = new std.Bucket(app, "Storage");

queue.qualifier;

const process = new NodeProcess({
  id: "1",
  entryFile: __dirname + "/test-lambda.ts",
  entryName: "coolEntry",
  captures: [
    {
      target: storage,
      symbol: "bucket",
      methods: ["get"],
      client: {
        renderCapture(obj: any) {
          return `require('${clientProcess.outputDir}/bucket-client.js')(process.env.BUCKET)`;
          // return `require('../../local-nodejs/prebundle/${obj.node.addr}.js').default`;
        },
      },
    },
    {
      target: queue,
      symbol: "queue",
      methods: ["enqueue", "dequeue"],
      client: {
        renderCapture(obj: any) {
          return "''";
          // return `require('../../local-nodejs/prebundle/${obj.node.addr}.js').default`;
        },
      },
    },
  ],
});

const func = new std.Function(app, "AdderLambda", {
  env: {
    TEST_ENV: "cool value",
  },
  process,
});

queue.bind(func);

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
