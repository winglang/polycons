# Library author guide

## Polycon factories

A polycon factory is an object that implements the `IPolyconFactory` interface, which has a single `resolve()` method.
This method takes a `type` and the construct arguments, and should return a concrete construct. For example:

```ts
import { DOG_ID, CAT_ID, Labrador, Kitten } from "@acme/shared-polycons";

class PetFactory implements IPolyconFactory {
  public resolve(
    type: string,
    scope: Construct,
    id: string,
    props?: any
  ): Construct {
    switch (type) {
      case DOG_ID:
        return new Labrador(scope, id, props);
      case CAT_ID:
        return new Kitten(scope, id, props);
      default:
        throw new Error(`Type "${type}" not implemented.`);
    }
  }
}
```

By customizing the `resolve()` method, it's possible to change construct IDs, override properties, or even make factories out of other factories.

## Authoring polycons

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
    return Polycons.newInstance(DOG_ID, scope, id, props) as Dog;
  }
}
```

Concrete implementations of your polycon can be ordinary constructs:

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

### Sharing behavior

Oftentimes you want all polycons to share some properties or methods - like they're all implementing a common interface.

You can achieve this by extending the polycon with a base class:

```ts
export interface DogProps {
  readonly name?: string;
  readonly treats?: number;
}

export const DogPolycon = "@acme/shared-polycons.Dog";

export class Dog extends DogBase {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(null as any, id, props); // 1. pass empty scope in polycon
    return Polycons.newInstance(DOG_ID, scope, id, props) as Dog;
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

Please take note:

1. In the constructor of the polycon (`Dog`), an empty value must be passed as the first argument to `super()`.
2. In the constructor of the polycon base class (`DogBase`), the constructor should have no side effects or mutations if an empty scope is passed. In the above example, we set dummy values when the scope is empty and return early.

> **Technical aside:** These changes made with the `scope` value ensure that no surprising errors occur when the polycons are instantiated.
> When a polycon is instantiated through `new Dog()`, the constructor for `DogBase` will actually run twice: once with an empty scope, and once with the correct scope.
> When an empty scope is passed, this is signaling that the base class is being initialized as part of the `new Dog()` construction path instead of through the `new Labrador()` construction path.
>
> Because of this, if your polycon implementation performs any mutations (like calling methods on other constructs), they should be skipped when the scope is empty, otherwise they may run twice.
