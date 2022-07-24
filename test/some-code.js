var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../src/pocix-cdktf/bucket-client.ts
var bucket_client_exports = {};
__export(bucket_client_exports, {
  LocalAWSBucketClient: () => LocalAWSBucketClient
});
var import_aws_sdk, LocalAWSBucketClient;
var init_bucket_client = __esm({
  "../src/pocix-cdktf/bucket-client.ts"() {
    import_aws_sdk = require("aws-sdk");
    LocalAWSBucketClient = class {
      constructor(bucketArn) {
        this.bucketArn = bucketArn;
        this.client = new import_aws_sdk.S3({ apiVersion: "2006-03-01" });
      }
      async download(path) {
        return this.client.getObject({
          Bucket: this.bucketArn,
          Key: path
        }).promise();
      }
      async upload(path, value) {
        return this.client.upload({
          Bucket: this.bucketArn,
          Key: path,
          Body: value
        }).promise();
      }
    };
  }
});

// some-code.js
var some_code_exports = {};
__export(some_code_exports, {
  handler: () => handler
});
async function handler(captures) {
  const bucket = captures.bucket;
  await bucket.download("counter");
  console.log("hello world!");
}
var init_some_code = __esm({
  "some-code.js"() {
  }
});

// some-code.js.new.js
var CAPTURES = {
  foo: 123,
  bucket: (init_bucket_client(), __toCommonJS(bucket_client_exports))(process.env["__CAPTURE_SYM_bucket}"])
};
module.exports["handler"] = function(originalEvent) {
  return (init_some_code(), __toCommonJS(some_code_exports))["handler"](originalEvent, CAPTURES);
};
