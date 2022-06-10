import { IConstruct } from "constructs";

export enum PolylinkKind {
  ConsumerOf,
  ProducerFor,
}

export class Polylink {
  public static of() {}

  private readonly others: IConstruct[];

  constructor(
    private readonly initial: IConstruct,
    private readonly kind: PolylinkKind,
    ...others: IConstruct[]
  ) {
    this.others = others;
  }
}
