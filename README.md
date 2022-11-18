# Polycons

A meta CDK framework for building polymorphic [constructs](https://github.com/aws/constructs). Think of polycons like dependency injection, for constructs.

polycons can be used with any CDK framework, including [AWS CDK], [cdktf], and [cdk8s].

[aws cdk]: https://github.com/aws/aws-cdk
[cdktf]: https://github.com/hashicorp/terraform-cdk
[cdk8s]: https://github.com/cdk8s-team/cdk8s

## 🚀 Getting started

Polycons can be used just like ordinary CDK constructs:

```ts
import { Dog } from "@acme/shared-polycons";
import { Construct } from "constructs";

class Pets extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // this is a polycon!
    new Dog(this, "Dog", { treats: 5 });

    // like ordinary constructs, polycons can have methods, properties, etc.
    dog.giveBone();
  }
}
```

This `Pets` construct contains a `Dog` from a library of polycons.
The dog could have multiple implementations -- a `Labrador`, a `Terrier`, or your own implementation.

To use polycons in an application, you need to register a factory that specifies how to turn polycons into concrete constructs.
In the example below, a `PetFactory` is used, which has been defined to resolve each `Dog` in the construct tree into a `Labrador`.
By registering it to the root `App` construct, each `Dog` in the construct tree will be created as a `Labrador`.

```ts
import { App } from "<cdk-framework>";
import { PetFactory } from "@acme/shared-polycons";
import { Polycons } from "polycons";

const app = new App();
Polycons.register(app, new PetFactory());
new Pets(app, "MyPets");
```

Check out the usage guide for more details about how to create your own polycons and polycon factories.

## 📖 Documentation

Click [here](./API.md) to visit the polycons API reference.

### 🏭 Polycon factories

A polycon factory is a class that implements the `IPolyconFactory` interface, which has a single `resolve()` method.
This method accepts a `type` and a list of construct arguments, and returns a concrete construct. For example:

```ts
import { DOG_TYPE, CAT_TYPE, Labrador, Kitten } from "@acme/shared-polycons";

class PetFactory implements IPolyconFactory {
  public resolve(
    type: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): Construct {
    switch (type) {
      case DOG_TYPE:
        return new Labrador(scope, id, ...args);
      case CAT_TYPE:
        return new Kitten(scope, id, ...args);
      default:
        throw new Error(`Type "${type}" not implemented.`);
    }
  }
}
```

In the above example, `DOG_TYPE` and `CAT_TYPE` are unique string constants associated with the respective polycons. 

By customizing the `resolve()` method, it's possible to change construct IDs, override properties, or even make factories that call other factories.

### ✍️ Creating polycons

You can define a new polycon by creating a class that returns a new Polycon instance in its constructor.
Each polycon must be associated with a unique identifying string.

```ts
import { Constructs } from "constructs";
import { Polycons } from "polycons";

export interface DogProps {
  readonly name?: string;
  readonly treats?: number;
}

// make sure your polycon has a globally unique name!
export const DOG_TYPE = "@acme/shared-polycons.Dog";

export class Dog extends Construct {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(null as any, id); // (1)
    return Polycons.newInstance(DOG_TYPE, scope, id, props) as Dog;
  }
}
```

The `Dog` class definition serves as an empty shell, or placeholder -- only when a user calls `new Dog()`, a real construct will be returned.

In the constructor of `Dog`, a null value MUST be passed as the first argument to `super()` (1). This is needed because actually two constructs are produced (one by calling `super`, and one by calling `Polycons.newInstance`), and the first one should be thrown away, and not added to the construct tree.

Concrete implementations of a polycon can be written like ordinary constructs:

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

### 🤝 Sharing behavior

Oftentimes, you may want all polycons to share some properties or methods.

You can achieve this by defining a base class, and having the polycon extend the base class:

```ts
export interface DogProps {
  readonly name?: string;
  readonly treats?: number;
}

export const DOG_TYPE = "@acme/shared-polycons.Dog";

// This is the polycon.
export class Dog extends DogBase {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(null as any, id, props); // [1]
    return Polycons.newInstance(DOG_TYPE, scope, id, props) as Dog;
  }
  public toString() {
    throw new Error("Method not implemented"); // [2]
  }
}

// This is the base class.
export abstract class DogBase extends Construct {
  public readonly species = "Canis familiaris";
  public readonly treats: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);

    // [3]
    if (!scope) {
      this.treats = 0;
      return;
    }

    this.treats = props.treats;
  }
  public abstract toString(): string;
}
```

Please take note:

1. In the constructor of the polycon (`Dog`), a null value MUST be passed as the first argument to `super()`.
2. Since the `Dog` class is just an empty shell, and does not get returned to the user, any methods required by the `abstract` base class can be left unimplemented.
3. In the constructor of the base class (`DogBase`), the constructor should have no side effects or mutations when an empty `scope` is passed (otherwise, side effects may occur multiple times). In the example above, we set dummy values when the scope is empty (`this.treats = 0;`) and return early.

When a polycon has a base class, every polycon implementation should extend it instead of extending `Construct`:

```ts
export class Labrador extends DogBase {
  public readonly name: string;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id, props);
    this.name = props.name;
  }
  public toString() {
    return `Labrador with ${this.treats} treats.`;
  }
}
```

## ✋ Contributing

We welcome community contributions and pull requests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to set up a development environment and submit code on GitHub.

## ⚖️ License

This library is licensed under the Apache-2.0 license.
