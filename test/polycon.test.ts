import { Construct, IConstruct } from "constructs";
import { Polycon, PolyconFactory } from "../src";

test("Polycon.isPolycon returns true for polycons", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const dog = Dog.create(app, "dog", { name: "piffle", treats: 5 });

  expect(Polycon.isPolycon(dog)).toBeTruthy();
  expect(Polycon.isPolycon(app)).toBeFalsy();
});

test("polycon creation marker is deleted from the scope", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  Dog.create(app, "dog", { name: "piffle", treats: 5 });

  const marker = Symbol.for("polycons.init[test.dog]#dog");
  expect(marker in app).toBeFalsy();
});

// this is important for languages that use nominal typing (like Java)
test("polycon instanceof Construct", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = Dog.create(app, "piffle", { name: "piffle", treats: 5 });
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
  expect(() =>
    Dog.create(app, "dog", { name: "piffle", treats: 5 })
  ).toThrowError(
    /No polycon factory has been registered to the construct tree/
  );
});

test("a polycon cannot be instantiated if the registered factory does not support it", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  expect(() => Cat.create(app, "cat", { scritches: 5 })).toThrowError(
    /Qualifier test\.cat not implemented/
  );
});

test("polycons can be resolved to constructs by a factory", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = Dog.create(app, "piffle", { name: "piffle", treats: 5 });
  const biffle = Dog.create(app, "biffle", { name: "biffle", treats: 7 });

  expect(piffle.toString()).toEqual("Poodle with 5 treats.");
  expect(biffle.toString()).toEqual("Poodle with 7 treats.");

  expect(app.synth()).toEqual(["root", "root/piffle", "root/biffle"]);
});

test("polycons can access properties and methods from their parent classes", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = Dog.create(app, "piffle", { name: "piffle", treats: 5 });

  // method is defined on Dog but available to Poodle via inheritance
  expect(piffle.toStringUppercase()).toEqual("POODLE WITH 5 TREATS.");
  // property is defined on Dog but available to Poodle via inheritance
  expect(piffle.species).toEqual("Canis familiaris");
});

test("node.findChild() returns the polycon that was constructed", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = Dog.create(app, "piffle", { name: "piffle", treats: 5 });

  expect(app.node.findChild("piffle")).toBe(piffle);
});

test("factory is able to make decisions based on the id of the polycon", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const notSpecial = Dog.create(app, "not-special", { name: "jo", treats: 1 });
  const special = Dog.create(app, "labrador", { name: "shmo", treats: 1 });
  expect(notSpecial instanceof Poodle).toBeTruthy();
  expect(special instanceof Labrador).toBeTruthy();
});

test("polycon constructor does not get called more than once", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = Dog.create(app, "piffle", { name: "piffle", treats: 5 });
  const biffle = Dog.create(app, "biffle", {
    name: "biffle",
    treats: 5,
    friends: [piffle],
  });

  expect(piffle.friendCount).toEqual(1);
  expect(biffle.friendCount).toEqual(1);
});

test("a polycon cannot be instantiated through its regular constructor", () => {
  const app = new App();
  expect(() => new Dog(app, "dog", { name: "piffle", treats: 5 })).toThrowError(
    /Polycons cannot be directly instantiated through their constructors/
  );
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
  readonly friends?: Dog[];
}

class Dog extends Polycon {
  public static create(scope: Construct, id: string, props: DogProps): Dog {
    return Polycon.resolve(DOG_QUALIFIER, scope, id, props) as Dog;
  }
  public readonly species = "Canis familiaris";
  public readonly treats: number;
  public friendCount: number;
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);

    this.treats = props.treats;
    this.friendCount = 0;

    for (const friend of props.friends ?? []) {
      this.addFriend();
      friend.addFriend();
    }
  }
  public addFriend() {
    this.friendCount += 1;
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

class Labrador extends Dog {}

// == cat data structures ==

const CAT_QUALIFIER = "test.cat";

interface CatProps {
  readonly scritches: number;
}

class Cat extends Polycon {
  public static create(scope: Construct, id: string, props: CatProps): Cat {
    return Polycon.resolve(CAT_QUALIFIER, scope, id, props) as Cat;
  }
  constructor(scope: Construct, id: string, _props: CatProps) {
    super(scope, id);
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
