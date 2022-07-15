import { Construct, IConstruct } from "constructs";
import { Polycon } from "./polycon";
import { Code } from "./process";

export interface IClientRecipe {
  code: Code;
  bindToCompute(name: string, compute: IConstruct): void;
}

export class Capture {
  public static primitive(value: any) {
    if (Construct.isConstruct(value)) {
      throw new Error("A construct is not a valid primitive value.");
    }

    const recipe = {
      code: Code.fromInline(value.toString()),
      bindToCompute(_name: string, _compute: IConstruct) {
        return;
      },
    };
    return new Capture(recipe);
  }

  public static polycon(polycon: Polycon) {
    return new Capture(polycon.capture());
  }

  private constructor(public readonly recipe: IClientRecipe) {}
}
