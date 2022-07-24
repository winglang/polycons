var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var require_some_code = __commonJS({
  "some-code.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __esm2 = (fn, res) => function __init() {
      return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
    };
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var bucket_client_exports2 = {};
    __export2(bucket_client_exports2, {
      LocalAWSBucketClient: () => LocalAWSBucketClient2
    });
    var import_aws_sdk2;
    var LocalAWSBucketClient2;
    var init_bucket_client2 = __esm2({
      "../src/pocix-cdktf/bucket-client.ts"() {
        import_aws_sdk2 = require("aws-sdk");
        LocalAWSBucketClient2 = class {
          constructor(bucketArn) {
            this.bucketArn = bucketArn;
            this.client = new import_aws_sdk2.S3({ apiVersion: "2006-03-01" });
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
    var require_some_code2 = __commonJS2({
      "some-code.js"(exports22, module22) {
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __esm22 = (fn, res) => function __init() {
          return fn && (res = (0, fn[__getOwnPropNames22(fn)[0]])(fn = 0)), res;
        };
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from, except, desc) => {
          if (from && typeof from === "object" || typeof from === "function") {
            for (let key of __getOwnPropNames22(from))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var bucket_client_exports22 = {};
        __export22(bucket_client_exports22, {
          LocalAWSBucketClient: () => LocalAWSBucketClient22
        });
        var import_aws_sdk22;
        var LocalAWSBucketClient22;
        var init_bucket_client22 = __esm22({
          "../src/pocix-cdktf/bucket-client.ts"() {
            import_aws_sdk22 = require("aws-sdk");
            LocalAWSBucketClient22 = class {
              constructor(bucketArn) {
                this.bucketArn = bucketArn;
                this.client = new import_aws_sdk22.S3({ apiVersion: "2006-03-01" });
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
        var some_code_exports = {};
        __export22(some_code_exports, {
          handler: () => handler
        });
        async function handler(captures) {
          const bucket = captures.bucket;
          await bucket.download("counter");
          console.log("hello world!");
        }
        var init_some_code = __esm22({
          "some-code.js"() {
          }
        });
        var CAPTURES22 = {
          foo: 123,
          bucket: (init_bucket_client22(), __toCommonJS22(bucket_client_exports22))(process.env["__CAPTURE_SYM_bucket}"])
        };
        module22.exports["handler"] = function(originalEvent) {
          return (init_some_code(), __toCommonJS22(some_code_exports))["handler"](originalEvent, CAPTURES22);
        };
      }
    });
    var CAPTURES2 = {
      foo: 123,
      bucket: (init_bucket_client2(), __toCommonJS2(bucket_client_exports2))(process.env["__CAPTURE_SYM_bucket}"])
    };
    module2.exports["handler"] = function(originalEvent) {
      return require_some_code2()["handler"](originalEvent, CAPTURES2);
    };
  }
});

// some-code.js.new.js
var CAPTURES = {
  foo: 123,
  bucket: (init_bucket_client(), __toCommonJS(bucket_client_exports))(process.env["__CAPTURE_SYM_bucket}"])
};
module.exports["handler"] = function(originalEvent) {
  return require_some_code()["handler"](originalEvent, CAPTURES);
};
