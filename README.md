# Polycons

A meta CDK framework for building polymorphic [constructs](https://github.com/aws/constructs). Think of polycons like dependency injection, for constructs.

polycons can be used with any CDK framework, including [AWS CDK], [cdktf], and [cdk8s].

[aws cdk]: https://github.com/aws/aws-cdk
[cdktf]: https://github.com/hashicorp/terraform-cdk
[cdk8s]: https://github.com/cdk8s-team/cdk8s

## 📝 Usage

Polycons can be used just like ordinary CDK constructs:

```ts
import { Dog } from "@acme/shared-polycons";
import { Construct } from "constructs";

class Pets extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Dog(this, "Dog", { treats: 5 });
    dog.giveBone();
  }
}
```

This construct contains a `Dog` from a library of polycons.
The dog could have any implementation -- a `Labrador` implementation, a `Terrier` implementation, and so on.

To use it in an application, you need to register a factory that specifies how to turn polycons into concrete constructs.
In the example below, a `PetFactory` is registered to the application, ensuring that each `Dog` defined in the construct tree will be resolved into a `Labrador`.

```ts
import { App } from "<cdk-framework>";
import { PetFactory } from "@acme/shared-polycons";
import { Polycons } from "polycons";

const app = new App();
Polycons.register(app, new PetFactory());
```

See the documentation for details on how to create your own polycons and polycon factories.

## 📖 Documentation

- [Library author guide](./docs)
- [API reference](./API.md)

## ✋ Contributing

We welcome community contributions and pull requests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to set up a development environment and submit code on GitHub.

## 🐣 Getting help

If you need help either using or contributing to this project, please join us on our [Discord server](https://discord.gg/5KP9KNcB).

## ⚖️ License

This library is licensed under the Apache-2.0 license.
