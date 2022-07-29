import { Construct, IConstruct } from "constructs";
import { Polycon, PolyconFactory } from "../src";

test("can construct concrete polycons directly", () => {
  const app = new App();
  const dog = new Poodle(app, "dog", { name: "piffle", treats: 5 });

  expect(Polycon.isPolycon(dog)).toBeFalsy();
  expect(Polycon.isPolyconClass(Poodle)).toBeFalsy();
});

test("Polycon.isPolycon returns true for polycons", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const dog = new Dog(app, "dog", { name: "piffle", treats: 5 });

  expect(Polycon.isPolycon(dog)).toBeTruthy();
  expect(Polycon.isPolycon(app)).toBeFalsy();
  expect(Polycon.isPolyconClass(Dog)).toBeTruthy();
});

// this is important for languages that use nominal typing (like Java)
test("polycon instanceof Construct", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });
  expect(piffle instanceof Construct).toBeTruthy();
});

test("a polycon factory can be registered", () => {
  const app = new App();
  const factory = new PoodleFactory();
  PolyconFactory.register(app, factory);

  expect(PolyconFactory.of(app)).toEqual(factory);
});

test("a polycon factory is always registered to the root", () => {
  const app = new App();
  const pets = new Construct(app, "pets");
  const factory = new PoodleFactory();
  PolyconFactory.register(pets, factory);

  expect(PolyconFactory.of(app)).toEqual(factory);
});

test("PolyconFactory.of throws if no factory is registered", () => {
  const app = new App();

  expect(() => PolyconFactory.of(app)).toThrowError(
    /No polycon factory has been registered to the construct tree/
  );
});

test("you cannot register two polycon factories to a single tree", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  expect(() =>
    PolyconFactory.register(app, new ShorthairFactory())
  ).toThrowError(/There is already a polycon factory registered in this scope/);
});

test("a polycon cannot be instantiated without a factory", () => {
  const app = new App();
  expect(() => new Dog(app, "dog", { name: "piffle", treats: 5 })).toThrowError(
    /No polycon factory has been registered to the construct tree/
  );
});

test("a polycon cannot be instantiated if the registered factory does not support it", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  expect(() => new Cat(app, "cat", { scritches: 5 })).toThrowError(
    /Qualifier test\.cat not implemented/
  );
});

test("polycons can be resolved to constructs by a factory", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });
  const biffle = new Dog(app, "biffle", { name: "biffle", treats: 7 });

  expect(piffle.toString()).toEqual("Poodle with 5 treats.");
  expect(biffle.toString()).toEqual("Poodle with 7 treats.");

  expect(app.synth()).toEqual(["root", "root/piffle", "root/biffle"]);
});

test("polycons can access properties and methods from their parent classes", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });

  // method is defined on Dog but available to Poodle via inheritance
  expect(piffle.toStringUppercase()).toEqual("POODLE WITH 5 TREATS.");
  // property is defined on Dog but available to Poodle via inheritance
  expect(piffle.species).toEqual("Canis familiaris");
});

test("node.findChild() returns the polycon that was constructed", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });

  expect(app.node.findChild("piffle")).toBe(piffle);
});

test("factory is able to make decisions based on the id of the polycon", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const notSpecial = new Dog(app, "not-special", { name: "jo", treats: 1 });
  const special = new Dog(app, "labrador", { name: "shmo", treats: 1 });
  expect(notSpecial instanceof Poodle).toBeTruthy();
  expect(special instanceof Labrador).toBeTruthy();
});

class App extends Construct {
  constructor() {
    super(undefined as any, "root");
  }
  public synth() {
    return this.node.findAll().map((x) => x.node.path);
  }
}

// == dog data structures ==

const DOG_QUALIFIER = "test.dog";

interface DogProps {
  readonly name: string;
  readonly treats: number;
}

class Dog extends Polycon {
  public readonly species = "Canis familiaris";
  public readonly treats: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(DOG_QUALIFIER, scope, id, props);

    this.treats = props.treats;
  }
  public toStringUppercase() {
    return this.toString().toUpperCase();
  }
  public toString(): string {
    throw new Error("unimplemented");
  }
}

class Poodle extends Dog {
  public readonly treats: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id, props);
    this.treats = props.treats;
  }
  public toString() {
    return `Poodle with ${this.treats} treats.`;
  }
}
Poodle.concretize();

class Labrador extends Dog {}
Labrador.concretize();

// == cat data structures ==

const CAT_QUALIFIER = "test.cat";

interface CatProps {
  readonly scritches: number;
}

class Cat extends Polycon {
  constructor(scope: Construct, id: string, props: CatProps) {
    super(CAT_QUALIFIER, scope, id, props);
  }
  public toString(): string {
    throw new Error("unimplemented");
  }
}

class Shorthair extends Cat {
  public readonly scritches: number;
  constructor(scope: Construct, id: string, props: CatProps) {
    super(scope, id, props);
    this.scritches = props.scritches;
  }
  public toString() {
    return `Shorthair cat with ${this.scritches} scritches.`;
  }
}
Shorthair.concretize();

// == factories ==

class PoodleFactory extends PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct {
    switch (qualifier) {
      case DOG_QUALIFIER:
        if (id === "labrador") {
          return new Labrador(scope, id, props);
        }
        return new Poodle(scope, id, props);
      default:
        throw new Error(`Qualifier ${qualifier} not implemented.`);
    }
  }
}

class ShorthairFactory extends PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct {
    switch (qualifier) {
      case CAT_QUALIFIER:
        return new Shorthair(scope, id, props);
      default:
        throw new Error(`Qualifier ${qualifier} not implemented.`);
    }
  }
}
