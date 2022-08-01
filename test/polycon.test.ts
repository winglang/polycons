import { Construct, IConstruct } from "constructs";
import { IPolyconResolver, PolyconFactory, polyconFactoryOf } from "../src";

test("polycon creation marker is deleted from the scope", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  new Dog(app, "dog", { name: "piffle", treats: 5 });

  const marker = Symbol.for("polycons.init[test.dog]#dog");
  expect(marker in app).toBeFalsy();
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

  expect(polyconFactoryOf(app)).toEqual(factory);
});

test("a polycon factory is always registered to the root", () => {
  const app = new App();
  const pets = new Construct(app, "pets");
  const factory = new PoodleFactory();
  PolyconFactory.register(pets, factory);

  expect(polyconFactoryOf(app)).toEqual(factory);
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

test("factory is able to change props passed into the polycon", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const special = new Dog(app, "labrador", { name: "shmo", treats: 3 });

  // factory lets labradors get twice the number of treats
  expect(special.treats).toEqual(6);
  expect(special.toString()).toEqual("Labrador with 6 treats.");
});

test("polycon constructor does not get called more than once", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });
  const biffle = new Dog(app, "biffle", {
    name: "biffle",
    treats: 5,
    friends: [piffle],
  });

  expect(biffle.friendCount).toEqual(1);
  expect(piffle.friendCount).toEqual(1);
});

test("concretes can be defined explicitly", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const lab = new Labrador(app, "my_lab", { name: "lab", treats: 5 });

  expect(lab.toString()).toEqual("Labrador with 5 treats.");
  expect(app.synth()).toStrictEqual(["root", "root/my_lab"]);
});

test("polycons can be created without base classes", () => {
  const app = new App();
  PolyconFactory.register(app, new ShorthairFactory());
  const cat = new Shorthair(app, "muffins", { scritches: 5 });

  expect(cat.toString()).toEqual("Shorthair cat with 5 scritches.");
  expect(app.synth()).toStrictEqual(["root", "root/muffins"]);
});

test("constructs can be composed of polycons, and are still resolved", () => {
  const app = new App();
  PolyconFactory.register(app, new PoodleFactory());
  const family = new LabFamily(app, "family");

  const defaultChild = family.node.defaultChild as Dog;
  expect(defaultChild.toString()).toEqual("Poodle with 2 treats.");
  expect(family.pupper.toString()).toEqual("Poodle with 6 treats.");
  expect(app.synth()).toStrictEqual([
    "root",
    "root/family",
    "root/family/Default",
    "root/family/pupper",
  ]);
});

class App extends Construct {
  constructor() {
    super(undefined as any, "root");
  }
  public synth() {
    return this.node.findAll().map((x) => x.node.path);
  }
}

// == dog fixtures ==

const DOG_QUALIFIER = "test.dog";

interface DogProps {
  readonly name: string;
  readonly treats: number;
  readonly friends?: Dog[];
}

abstract class DogBase extends Construct {
  public readonly species = "Canis familiaris";
  public readonly treats: number;
  public friendCount: number;

  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id);
    if (!scope) {
      // initialized through the polycon, just dummy values
      this.friendCount = 0;
      this.treats = 0;
      return;
    }

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
  public abstract toString(): string;
}

class Dog extends DogBase {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(null as any, id, props);
    return PolyconFactory.newInstance(DOG_QUALIFIER, scope, id, props) as Dog;
  }

  public toString(): string {
    throw new Error("unimplemented");
  }
}

class Poodle extends DogBase {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id, props);
  }
  public toString() {
    return `Poodle with ${this.treats} treats.`;
  }
}

class Labrador extends DogBase {
  constructor(scope: Construct, id: string, props: DogProps) {
    super(scope, id, props);
  }
  public toString() {
    return `Labrador with ${this.treats} treats.`;
  }
}

class LabFamily extends Construct {
  public readonly pupper: Dog;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Dog(this, "Default", { name: "cardie", treats: 2 });
    this.pupper = new Dog(this, "pupper", { name: "duncan", treats: 6 });
  }
}

// == cat fixtures ==

const CAT_QUALIFIER = "test.cat";

interface CatProps {
  readonly scritches: number;
}

// example of a polycon with no base class

class Cat {
  constructor(scope: Construct, id: string, props: CatProps) {
    return PolyconFactory.newInstance(CAT_QUALIFIER, scope, id, props) as Cat;
  }
  public toString(): string {
    throw new Error("unimplemented");
  }
}

class Shorthair extends Construct {
  public readonly scritches: number;
  constructor(scope: Construct, id: string, props: CatProps) {
    super(scope, id);
    this.scritches = props.scritches;
  }
  public toString() {
    return `Shorthair cat with ${this.scritches} scritches.`;
  }
}

// == factories ==

class PoodleFactory implements IPolyconResolver {
  public resolve(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct {
    switch (qualifier) {
      case DOG_QUALIFIER:
        if (id === "labrador") {
          return new Labrador(scope, id, {
            ...props,
            treats: props.treats * 2,
          });
        }
        return new Poodle(scope, id, props);
      default:
        throw new Error(`Qualifier ${qualifier} not implemented.`);
    }
  }
}

class ShorthairFactory implements IPolyconResolver {
  public resolve(
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
