import { Construct, IConstruct } from "constructs";
import { Polycon, PolyconFactory } from "../src";

test("a polycon factory can be registered", () => {
  const app = new App();
  const factory = new PoodleFactory();
  PolyconFactory.register(app, factory);

  expect(PolyconFactory.of(app)).toEqual(factory);
});

test("you cannot register two polycon factories to a tree", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  expect(() => PolyconFactory.register(app, new TerrierFactory())).toThrowError(
    /There is already a polycon factory registered in this scope/
  );
});

test("a polycon cannot be instantiated without a factory", () => {
  const app = new App();
  expect(() => new Dog(app, "dog", { treats: 5 })).toThrowError(
    /No polycon factory has been registered to the construct tree/
  );
});

test("a polycon can be instantiated with a factory", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  expect(() => new Dog(app, "dog", { treats: 5 })).not.toThrow();
});

class App extends Construct {
  constructor() {
    super(undefined as any, "root");
  }
}

const DOG_QUALIFIER = "test.dog";

interface DogProps {
  readonly treats: number;
}

class Dog extends Polycon {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(DOG_QUALIFIER, scope, id, props);
  }
}

class Poodle extends Construct {
  public readonly treats: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);
    this.treats = props.treats;
  }
  public toString() {
    return `Poodle with ${this.treats} treats.`;
  }
}

class Terrier extends Construct {
  public readonly treats: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);
    this.treats = props.treats;
  }
  public toString() {
    return `Terrier with ${this.treats} treats.`;
  }
}

class PoodleFactory extends PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct {
    switch (qualifier) {
      case "test.dog":
        return new Poodle(scope, id, props);
      default:
        throw new Error(`Qualifier ${qualifier} not implemented.`);
    }
  }
}

class TerrierFactory extends PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct {
    switch (qualifier) {
      case "test.dog":
        return new Terrier(scope, id, props);
      default:
        throw new Error(`Qualifier ${qualifier} not implemented.`);
    }
  }
}
