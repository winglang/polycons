# Polycons

> 🚧 Note: This README is still under construction! 🚧

A meta CDK framework for building portable [constructs](https://github.com/aws/constructs).

## Why?

When working in existing CDKs (aws-cdk, cdktf, cdk8s, etc.), constructs immediately become tied to their **provisioning system/format** (cloudformation, terraform, etc) and their eventual **target platform** (AWS, Kubernetes, etc).

Polycons represent a resource whose implementation is injected during construction to create constructs whose implementation can change based on the provisioning system or target platform.

For examples:

- `Function` - AWS Lambda or a GCP Cloud Function
- `Bucket` - AWS S3 Bucket or Cloudflare R2 storage
- `Queue` - In-memory queue running in Node or SQS Queue

**Note:** This framework is not a CDK, it operates on a layer above [constructs](https://github.com/aws/constructs) and intends to utilize existing CDKs and provisioning engines to do what they do best.

## Usage

Polycons can be created just like ordinary CDK constructs:

### Polymorphic Constructs

```ts
// construct.ts

import { Queue } from "my-polycons";
import { Construct } from "constructs";

export class SeededQueue extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const queue = new Queue(this, "Queue");
  }
}
```

This construct contains a Queue resource from a library of polycons.
This queue could be any implementation deployed to any cloud (or maybe not even a cloud at all!).
This construct is now completely portable!
