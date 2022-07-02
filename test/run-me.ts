import chalk from "chalk";
import { std } from "../src";
import { CaptureHelper } from "../src/process/capture";
import { FileModule } from "../src/process/module";
import { NodeProcessBuilder } from "../src/process/node-process";
import { CDKTerraformApp } from "../src/providers/cdktf-aws/cdkts-app";

const app = new CDKTerraformApp();

const queue = new std.Queue(app, "Queue");
const storage = new std.Bucket(app, "Storage");

const processBuilder = new NodeProcessBuilder()
  .addEntryModule("coolEntry", {
    name: "fun",
    filePath: __dirname + "/test-lambda.ts",
  } as FileModule)
  .addCapture(
    CaptureHelper.client({
      symbol: "bucket",
      target: storage,
      methods: ["get"],
    })
  )
  .addCapture(
    CaptureHelper.client({
      symbol: "queue",
      target: queue,
      methods: ["enqueue", "dequeue"],
    })
  )
  .addCapture(
    CaptureHelper.direct({
      symbol: "config",
      target: {
        apiUrl: "https://api.example.com",
      },
    })
  );

// const process = new NodeProcess({
//   id: "1",
//   entryFile: __dirname + "/test-lambda.ts",
//   entryName: "coolEntry",
//   captures: [
//     {
//       target: storage,
//       symbol: "bucket",
//       methods: ["get"],
//       // client: {
//       //   renderCapture(obj: IConstruct) {
//       //     return `require('${clientProcess.outputDir}/bucket-client.js')(process.env._${obj.node.addr}_ARN)`;
//       //   },
//       // },
//     },
//     {
//       target: queue,
//       symbol: "queue",
//       methods: ["enqueue", "dequeue"],
//       // client: {
//       //   renderCapture(obj: any) {
//       //     return "''";
//       //     // return `require('../../local-nodejs/prebundle/${obj.node.addr}.js').default`;
//       //   },
//       // },
//     },
//     directCapture("config", {
//       apiUrl: "https://api.example.com",
//     }),
//   ],
// });

const func = new std.Function(app, "AdderLambda", {
  env: {
    TEST_ENV: "cool value",
  },
  processBuilder,
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
