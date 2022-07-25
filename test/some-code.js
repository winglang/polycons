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
        var __commonJS22 = (cb, mod) => function __require() {
          return mod || (0, cb[__getOwnPropNames22(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
        var require_some_code22 = __commonJS22({
          "some-code.js"(exports222, module222) {
            var __defProp222 = Object.defineProperty;
            var __getOwnPropDesc222 = Object.getOwnPropertyDescriptor;
            var __getOwnPropNames222 = Object.getOwnPropertyNames;
            var __hasOwnProp222 = Object.prototype.hasOwnProperty;
            var __esm222 = (fn, res) => function __init() {
              return fn && (res = (0, fn[__getOwnPropNames222(fn)[0]])(fn = 0)), res;
            };
            var __commonJS222 = (cb, mod) => function __require() {
              return mod || (0, cb[__getOwnPropNames222(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
            };
            var __export222 = (target, all) => {
              for (var name in all)
                __defProp222(target, name, { get: all[name], enumerable: true });
            };
            var __copyProps222 = (to, from, except, desc) => {
              if (from && typeof from === "object" || typeof from === "function") {
                for (let key of __getOwnPropNames222(from))
                  if (!__hasOwnProp222.call(to, key) && key !== except)
                    __defProp222(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc222(from, key)) || desc.enumerable });
              }
              return to;
            };
            var __toCommonJS222 = (mod) => __copyProps222(__defProp222({}, "__esModule", { value: true }), mod);
            var bucket_client_exports222 = {};
            __export222(bucket_client_exports222, {
              LocalAWSBucketClient: () => LocalAWSBucketClient222
            });
            var import_aws_sdk222;
            var LocalAWSBucketClient222;
            var init_bucket_client222 = __esm222({
              "../src/pocix-cdktf/bucket-client.ts"() {
                import_aws_sdk222 = require("aws-sdk");
                LocalAWSBucketClient222 = class {
                  constructor(bucketArn) {
                    this.bucketArn = bucketArn;
                    this.client = new import_aws_sdk222.S3({ apiVersion: "2006-03-01" });
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
            var require_some_code222 = __commonJS222({
              "some-code.js"(exports2222, module2222) {
                var __defProp2222 = Object.defineProperty;
                var __getOwnPropDesc2222 = Object.getOwnPropertyDescriptor;
                var __getOwnPropNames2222 = Object.getOwnPropertyNames;
                var __hasOwnProp2222 = Object.prototype.hasOwnProperty;
                var __esm2222 = (fn, res) => function __init() {
                  return fn && (res = (0, fn[__getOwnPropNames2222(fn)[0]])(fn = 0)), res;
                };
                var __commonJS2222 = (cb, mod) => function __require() {
                  return mod || (0, cb[__getOwnPropNames2222(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
                };
                var __export2222 = (target, all) => {
                  for (var name in all)
                    __defProp2222(target, name, { get: all[name], enumerable: true });
                };
                var __copyProps2222 = (to, from, except, desc) => {
                  if (from && typeof from === "object" || typeof from === "function") {
                    for (let key of __getOwnPropNames2222(from))
                      if (!__hasOwnProp2222.call(to, key) && key !== except)
                        __defProp2222(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2222(from, key)) || desc.enumerable });
                  }
                  return to;
                };
                var __toCommonJS2222 = (mod) => __copyProps2222(__defProp2222({}, "__esModule", { value: true }), mod);
                var bucket_client_exports2222 = {};
                __export2222(bucket_client_exports2222, {
                  LocalAWSBucketClient: () => LocalAWSBucketClient2222
                });
                var import_aws_sdk2222;
                var LocalAWSBucketClient2222;
                var init_bucket_client2222 = __esm2222({
                  "../src/pocix-cdktf/bucket-client.ts"() {
                    import_aws_sdk2222 = require("aws-sdk");
                    LocalAWSBucketClient2222 = class {
                      constructor(bucketArn) {
                        this.bucketArn = bucketArn;
                        this.client = new import_aws_sdk2222.S3({ apiVersion: "2006-03-01" });
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
                var require_some_code2222 = __commonJS2222({
                  "some-code.js"(exports22222, module22222) {
                    var __defProp22222 = Object.defineProperty;
                    var __getOwnPropDesc22222 = Object.getOwnPropertyDescriptor;
                    var __getOwnPropNames22222 = Object.getOwnPropertyNames;
                    var __hasOwnProp22222 = Object.prototype.hasOwnProperty;
                    var __esm22222 = (fn, res) => function __init() {
                      return fn && (res = (0, fn[__getOwnPropNames22222(fn)[0]])(fn = 0)), res;
                    };
                    var __export22222 = (target, all) => {
                      for (var name in all)
                        __defProp22222(target, name, { get: all[name], enumerable: true });
                    };
                    var __copyProps22222 = (to, from, except, desc) => {
                      if (from && typeof from === "object" || typeof from === "function") {
                        for (let key of __getOwnPropNames22222(from))
                          if (!__hasOwnProp22222.call(to, key) && key !== except)
                            __defProp22222(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22222(from, key)) || desc.enumerable });
                      }
                      return to;
                    };
                    var __toCommonJS22222 = (mod) => __copyProps22222(__defProp22222({}, "__esModule", { value: true }), mod);
                    var bucket_client_exports22222 = {};
                    __export22222(bucket_client_exports22222, {
                      LocalAWSBucketClient: () => LocalAWSBucketClient22222
                    });
                    var import_aws_sdk22222;
                    var LocalAWSBucketClient22222;
                    var init_bucket_client22222 = __esm22222({
                      "../src/pocix-cdktf/bucket-client.ts"() {
                        import_aws_sdk22222 = require("aws-sdk");
                        LocalAWSBucketClient22222 = class {
                          constructor(bucketArn) {
                            this.bucketArn = bucketArn;
                            this.client = new import_aws_sdk22222.S3({ apiVersion: "2006-03-01" });
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
                    __export22222(some_code_exports, {
                      handler: () => handler
                    });
                    async function handler(captures) {
                      const bucket = captures.bucket;
                      await bucket.download("counter");
                      console.log("hello world!");
                    }
                    var init_some_code = __esm22222({
                      "some-code.js"() {
                      }
                    });
                    var CAPTURES22222 = {
                      foo: 123,
                      bucket: (init_bucket_client22222(), __toCommonJS22222(bucket_client_exports22222))(process.env["__CAPTURE_SYM_bucket}"])
                    };
                    module22222.exports["handler"] = function(originalEvent) {
                      return (init_some_code(), __toCommonJS22222(some_code_exports))["handler"](originalEvent, CAPTURES22222);
                    };
                  }
                });
                var CAPTURES2222 = {
                  foo: 123,
                  bucket: (init_bucket_client2222(), __toCommonJS2222(bucket_client_exports2222))(process.env["__CAPTURE_SYM_bucket}"])
                };
                module2222.exports["handler"] = function(originalEvent) {
                  return require_some_code2222()["handler"](originalEvent, CAPTURES2222);
                };
              }
            });
            var CAPTURES222 = {
              foo: 123,
              bucket: (init_bucket_client222(), __toCommonJS222(bucket_client_exports222))(process.env["__CAPTURE_SYM_bucket}"])
            };
            module222.exports["handler"] = function(originalEvent) {
              return require_some_code222()["handler"](originalEvent, CAPTURES222);
            };
          }
        });
        var CAPTURES22 = {
          foo: 123,
          bucket: (init_bucket_client22(), __toCommonJS22(bucket_client_exports22))(process.env["__CAPTURE_SYM_bucket}"])
        };
        module22.exports["handler"] = function(originalEvent) {
          return require_some_code22()["handler"](originalEvent, CAPTURES22);
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
