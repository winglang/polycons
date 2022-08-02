# Polycons

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
import { Bucket } from "my-polycons";
import { Construct } from "constructs";

class Website extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const queue = new Bucket(this, "Queue", { source: "./build" });
  }
}
```

This construct contains a Bucket resource from a library of polycons.
This bucket could be any implementation deployed to any cloud (or maybe not even a cloud at all!).
This construct is now completely portable!

To use it in an application, you need to register a factory that specifies how to turn polycons into concrete constructs.
In the example below, a `KubernetesFactory` is registered to the application, ensuring that each polycon defined in the construct tree will be resolved into a kubernetes-based implementation of a storage bucket.

```ts
import { App } from "cdk-framework";
import { KubernetesFactory } from "my-polycons";

const app = new App();
Polycons.register(app, new KubernetesFactory());
```

See the authoring guide for details on how to create your own polycons and polycon factories.

## Library authors guide

### Polycon Factories

To create a polycon factory, you can specify a class with a `resolve` method.
This method should dispatch on the value of `polyconId`, and return a concrete construct.

```ts
import { BUCKET_ID, MyBucketImplementation } from "my-polycons";

class MyFactory implements IPolyconFactory {
  public resolve(
    polyconId: string,
    scope: Construct,
    id: string,
    props?: any
  ): Construct {
    switch (polyconId) {
      case BUCKET_ID:
        return new MyBucketImplementation(scope, id, props);
      default:
        throw new Error(`Type "${polyconId}" not implemented.`);
    }
  }
}
```

By customizing the factory's code, it's possible to change construct IDs, override properties, or even make factories composed from other factories.

### Polycons

You can define a polycon by creating a class that returns a new Polycon instance in the constructor. Each polycon must be associated with a unique identifier.

```ts
export interface DogProps {
  readonly name?: string;
  readonly treats?: number;
}

// make sure your polycon has a globally unique name!
export const DOG_ID = "@acme/shared-polycons.Dog";

export class Dog {
  constructor(scope: Construct, id: string, props: DogProps) {
    return Polycons.newInstance(DOG_ID, scope, id, props) as Cat;
  }
}
```

Concrete implementations of your polycon can just be ordinary constructs:

```ts
export class Labrador extends Construct {
  public readonly name: string;
  private readonly treats: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);
    this.name = props.name;
    this.treats = props.treats;
  }
  public toString() {
    return `Labrador with ${this.treats} treats.`;
  }
}
```

#### Sharing behavior

Oftentimes you want all polycons to share some properties or methods - like they're all implementing a common interface.

You can achieve this by extending the polycon with a base class:

```ts
export interface DogProps {
  readonly name?: string;
  readonly treats?: number;
  readonly cat?: ICat;
}

export const DogPolycon = "@acme/shared-polycons.Dog";

export class Dog extends DogBase {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(null as any, id, props); // 1. pass empty scope in polycon
    return Polycons.newInstance(DOG_ID, scope, id, props) as Cat;
  }
}

export abstract class DogBase extends Construct {
  public readonly species = "Canis familiaris";
  public readonly treats: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);

    // 2. return early if scope is empty
    if (!scope) {
      this.treats = 0;
      return;
    }

    this.treats = props.treats;
    props.cat.chase();
  }
  public abstract toString(): string;
}
```

and implementations should also extend the base class:

```ts
export class Labrador extends DogBase {
  public readonly name: string;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);
    this.name = props.name;
  }
  public toString() {
    return `Labrador with ${this.treats} treats.`;
  }
}
```

Please make note of the following:

1. In the constructor of the polycon (`Dog`), an empty value must be passed as the first argument to `super()`.
2. In the constructor of the polycon base class (`DogBase`), the constructor should have no side effects or mutations if an empty scope is passed. In the above example, we set dummy values when the scope is empty and return early.

> **Technical aside:** These checks ensure no surprising errors occur when the polycons are instantiated.
> When a polycon is instantiated through `new Dog()`, the constructor for `DogBase` will actually run twice: once with an empty scope, and once with the correct scope.
> When an empty `scope` is passed, this is signaling that the base class is being initialized as part of the `new Dog()` construction path instead of through the `new Labrador()` construction path.
>
> Because of this, if your polycon implementation performs any mutations (like calling methods on other `Dog` instances), they should be skipped when the scope is empty, otherwise they may run twice.
