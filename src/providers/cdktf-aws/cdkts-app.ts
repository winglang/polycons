import { AwsProvider } from "@cdktf/provider-aws";
import { App, TerraformStack } from "cdktf";
import { polycons } from "../..";
import { CDKTerraformAWSFactory } from "./cdktf-aws-factory";

export class CDKTerraformApp extends TerraformStack {
  public app: App;

  constructor() {
    const app = new App({ outdir: "polycons.out/cdktf.out" });
    super(app, "Stack");

    this.app = app;

    polycons.PolyconFactory.register(this, new CDKTerraformAWSFactory());
    new AwsProvider(this, "AWS", {
      region: "us-east-1",
    });
  }

  public synth(): string {
    this.app.synth();
    return "";
  }
}
