import { IConstruct } from "constructs";
import * as pocix from "../pocix";
import { PolyconFactory } from "../polycons";
import { CdktfAwsBucket } from "./bucket";
import { CdktfAwsFunction } from "./function";

export class CdktfAwsFactory extends PolyconFactory {
  public resolveConstruct(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct {
    switch (qualifier) {
      case pocix.BUCKET_QUALIFIER:
        return new CdktfAwsBucket(scope, id, props);
      case pocix.FUNCTION_QUALIFIER:
        return new CdktfAwsFunction(scope, id, props);
      default:
        throw new Error(`Qualifier ${qualifier} not implemented.`);
    }
  }
}
