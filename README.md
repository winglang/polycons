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

This polymorphism extends to interactions in your runtime code, allowing for the creation of implementation-agnostic and logic-focused applications.

__Note:__ This framework is not a CDK, it operates on a layer above [constructs](https://github.com/aws/constructs) and intends to utilize existing CDKs and provisioning engines to do what they do best.

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

    // Seed the Queue during creation
    queue.enqueue({ message: "Hello Polycons!" });
  }
}
```

This construct contains a Queue resource from a library of polycons. 
This queue could be any implementation deployed to any cloud (or maybe not even a cloud at all!). 
This construct is now completely portable!

### Runtime Clients

Very often you will want to interact with a polycon construct in your runtime code. 
In the framework, this interop is called a "capture" and the result is similarly polymorphic. 
This means the code below would work just as well deployed to a Lambda in AWS to push to SQS, as it would running in a local Node process pushing to a global in-memory queue.

```ts
// app.ts

export class QueuePusher extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const myQueue = new Queue(this, "Queue");
    
    const func = new Function(this, "Function", {
      process: {
        code: Code.fromFile(join(__dirname, "queue-code.ts")),
        entrypoint: "handler",
        captures: [
          // The name used to reference this capture in the runtime code
          queue: {
            // The polycon to bind to the runtime
            target: myQueue,
            // The methods intended to be used
            methods: ["push"],
          },
        ],
      }
    });
  }
}
```

```ts
// queue-code.ts

import { QueueClient } from "my-polycons-clients";

interface Captures {
  queue: QueueClient;
}

// This handler will be invoked by a shim containing clients for the captures
export async function handler(_event: any, captures: Captures) {
  // The client implementation knows how to talk to the queue you care about!
  await captures.queue.push({ message: "Hello Polycons!" });
}
```
