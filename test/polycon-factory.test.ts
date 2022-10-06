import { Construct, IConstruct } from "constructs";
import { IPolyconResolver, PolyconFactory, Polycons } from "../src";
import { polyconFactoryOf } from "../src/internal";

describe("polycon constructor", () => {
  // this is important for languages that use nominal typing (like Java)
  it("instanceof Construct", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });
    expect(piffle instanceof Construct).toBeTruthy();
  });

  it("does not get called more than once", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });
    const biffle = new Dog(app, "biffle", {
      name: "biffle",
      treats: 5,
      friends: [piffle],
    });

    expect(biffle.friendCount).toEqual(1);
    expect(piffle.friendCount).toEqual(1);
  });
});

describe("factory creation", () => {
  it("can create a factory with no resolvers", () => {
    const app = new App();
    const factory = PolyconFactory.create();
    expect(factory).toBeDefined();
    Polycons.register(app, factory);
  });

  it("can create a factory with multiple resolvers", () => {
    const app = new App();
    const factory = PolyconFactory.create(
      new PoodleResolver(),
      new ShorthairResolver()
    );
    expect(factory).toBeDefined();
    Polycons.register(app, factory);
  });

  it("throws if two resolvers have the same type", () => {
    expect(() =>
      PolyconFactory.create(new PoodleResolver(), new LabradorResolver())
    ).toThrow();
  });

  it("can be extended after initialization", () => {
    const app = new App();
    const factory = PolyconFactory.create(new ShorthairResolver());
    factory.addResolver(new PoodleResolver());
    expect(factory).toBeDefined();
    Polycons.register(app, factory);

    const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });
    expect(piffle.toString()).toEqual("Poodle with 5 treats.");
  });

  it("throws if adding a resolver with the same type", () => {
    const factory = PolyconFactory.create(new PoodleResolver());
    expect(() => factory.addResolver(new LabradorResolver())).toThrow();
  });
});

describe("factory registration", () => {
  it("can be registered to the root", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);

    expect(polyconFactoryOf(app)).toEqual(factory);
  });

  it("can be registered to the registered to a scope besides the root", () => {
    const app = new App();
    const pets = new Construct(app, "pets");
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(pets, factory);

    expect(polyconFactoryOf(pets)).toEqual(factory);
    expect(polyconFactoryOf(app)).toEqual(undefined);
  });

  test("more than one polycon factory can be registered in a construct tree", () => {
    const app = new App();
    const cats = new Construct(app, "cats");
    const dogs = new Construct(app, "dogs");
    const catFactory = PolyconFactory.create(new ShorthairResolver());
    const dogFactory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(dogs, dogFactory);
    Polycons.register(cats, catFactory);

    expect(polyconFactoryOf(cats)).toEqual(catFactory);
    expect(polyconFactoryOf(dogs)).toEqual(dogFactory);
  });

  it("cannot register two polycon factories to the same scope", () => {
    const app = new App();
    const catFactory = PolyconFactory.create(new ShorthairResolver());
    const dogFactory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, catFactory);
    expect(() => Polycons.register(app, dogFactory)).toThrowError(
      /There is already a polycon factory registered in this scope/
    );
  });
});

describe("a polycon", () => {
  it("cannot be instantiated without a factory", () => {
    const app = new App();
    expect(
      () => new Dog(app, "dog", { name: "piffle", treats: 5 })
    ).toThrowError(
      /Cannot find any registered Polycon factories \(directly or indirectly\)/
    );
  });

  it("cannot be instantiated if the registered factory does not have a resolver for it", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    expect(() => new Cat(app, "cat", "alice", { scritches: 5 })).toThrowError(
      /This factory does not have any resolvers to resolve a polycon with type "test\.cat"/
    );
  });
});

describe("polycons", () => {
  it("can be resolved to constructs by a factory", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });
    const biffle = new Dog(app, "biffle", { name: "biffle", treats: 7 });

    expect(piffle.toString()).toEqual("Poodle with 5 treats.");
    expect(biffle.toString()).toEqual("Poodle with 7 treats.");

    expect(app.synth()).toEqual(["root", "root/piffle", "root/biffle"]);
  });

  it("can access properties and methods from their parent classes", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });

    // method is defined on Dog but available to Poodle via inheritance
    expect(piffle.toStringUppercase()).toEqual("POODLE WITH 5 TREATS.");
    // property is defined on Dog but available to Poodle via inheritance
    expect(piffle.species).toEqual("Canis familiaris");
  });

  test("polycons can be created without base classes", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    const cat = new Shorthair(app, "muffins", "alice", { scritches: 5 });

    expect(cat.toString()).toEqual("Shorthair cat with 5 scritches.");
    expect(app.synth()).toStrictEqual(["root", "root/muffins"]);
  });

  test("polycons are resolved using the nearest factory", () => {
    const app = new App();
    const pets = new Construct(app, "pets");
    const poodleFactory = PolyconFactory.create(new PoodleResolver());
    const labFactory = PolyconFactory.create(new LabradorResolver());
    Polycons.register(app, poodleFactory);
    Polycons.register(pets, labFactory);
    const dog = new Dog(pets, "dog", { name: "piffle", treats: 4 });

    expect(polyconFactoryOf(dog)).toEqual(labFactory);
    expect(dog.toString()).toEqual("Labrador with 4 treats.");
  });

  test("polycons that are children of plain constructs are still resolved", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
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
});

test("node.findChild() returns the polycon that was constructed", () => {
  const app = new App();
  const factory = PolyconFactory.create(new PoodleResolver());
  Polycons.register(app, factory);
  const piffle = new Dog(app, "piffle", { name: "piffle", treats: 5 });

  expect(app.node.findChild("piffle")).toBe(piffle);
});

describe("polycon resolvers", () => {
  test("can make decisions based on the id of the polycon", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    const notSpecial = new Dog(app, "not-special", { name: "jo", treats: 1 });
    const special = new Dog(app, "labrador", { name: "shmo", treats: 1 });
    expect(notSpecial instanceof Poodle).toBeTruthy();
    expect(special instanceof Labrador).toBeTruthy();
  });

  test("can change props passed into the polycon", () => {
    const app = new App();
    const factory = PolyconFactory.create(new PoodleResolver());
    Polycons.register(app, factory);
    const special = new Dog(app, "labrador", { name: "shmo", treats: 3 });

    // factory lets labradors get twice the number of treats
    expect(special.treats).toEqual(6);
    expect(special.toString()).toEqual("Labrador with 6 treats.");
  });
});

test("concretes can be defined explicitly", () => {
  const app = new App();
  const factory = PolyconFactory.create(new PoodleResolver());
  Polycons.register(app, factory);
  const lab = new Labrador(app, "my_lab", { name: "lab", treats: 5 });

  expect(lab.toString()).toEqual("Labrador with 5 treats.");
  expect(app.synth()).toStrictEqual(["root", "root/my_lab"]);
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

const DOG_ID = "test.dog";

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
    return Polycons.newInstance(DOG_ID, scope, id, props) as Dog;
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

const CAT_ID = "test.cat";

interface CatProps {
  readonly scritches: number;
}

// example of a polycon with no base class

class Cat {
  constructor(scope: Construct, id: string, owner: string, props: CatProps) {
    return Polycons.newInstance(CAT_ID, scope, id, owner, props) as Cat;
  }

  public toString(): string {
    throw new Error("unimplemented");
  }
}

class Shorthair extends Construct {
  public readonly owner: string;
  public readonly scritches: number;

  constructor(scope: Construct, id: string, owner: string, props: CatProps) {
    super(scope, id);
    this.owner = owner;
    this.scritches = props.scritches;
  }

  public toString() {
    return `Shorthair cat with ${this.scritches} scritches.`;
  }
}

// == resolvers ==

class PoodleResolver implements IPolyconResolver {
  readonly type = DOG_ID;
  public resolve(scope: IConstruct, id: string, ...args: any[]) {
    const props = args[0];
    if (id === "labrador") {
      return new Labrador(scope, id, {
        ...props,
        treats: props.treats * 2,
      });
    }
    return new Poodle(scope, id, props);
  }
}

class LabradorResolver implements IPolyconResolver {
  readonly type = DOG_ID;
  public resolve(scope: IConstruct, id: string, ...args: any[]): IConstruct {
    const props = args[0];
    return new Labrador(scope, id, props);
  }
}

class ShorthairResolver implements IPolyconResolver {
  readonly type = CAT_ID;
  public resolve(scope: IConstruct, id: string, ...args: any[]): IConstruct {
    const [owner, props] = args;
    return new Shorthair(scope, id, owner, props);
  }
}
