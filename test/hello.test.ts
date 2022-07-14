import { join } from "path";
import { AwsProvider } from "@cdktf/provider-aws";
import { App as CdktfApp, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { Bucket, Function } from "../src/pocix";
import { CdktfAwsFactory } from "../src/pocix-cdktf";
import { Capture, Code, PolyconFactory } from "../src/polycons";

// test("cdktf bucket with function", () => {
//   const snapshot = Testing.synthScope((scope) => {
//     PolyconFactory.register(scope, new CdktfAwsFactory());
//     new AwsProvider(scope, "AWS", { region: "us-east-1" });

//     addBucketAndFunction(scope);
//   });

//   expect(snapshot).toMatchSnapshot();
// });

test("output cdktf bucket with function", () => {
  const app = new CdktfApp({ outdir: "polycons.out/cdktf.out" });
  const stack = new TerraformStack(app, "stack");
  PolyconFactory.register(stack, new CdktfAwsFactory());
  new AwsProvider(stack, "AWS", { region: "us-east-1" });

  addBucketAndFunction(stack);

  app.synth();
});

function addBucketAndFunction(scope: Construct) {
  const bucket = new Bucket(scope, "MyBucket");
  new Function(scope, "MyFunction", {
    process: {
      code: Code.fromFile(join(__dirname, "some-code.js")),
      entrypoint: "handler",
      captures: {
        foo: Capture.primitive(123),
        bucket: Capture.polycon(bucket),
      },
    },
  });
}
