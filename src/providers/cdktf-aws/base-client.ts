import { Capture, CaptureClient, FileModule, NodeModule } from "../../process";

export const AWS_SDK_MODULE: NodeModule = {
  name: "aws-sdk",
  spec: "aws-sdk",
};

export abstract class AWSSDKCaptureClient extends CaptureClient {
  /**
   *
   */
  constructor(protected readonly clientFile: FileModule) {
    super();
  }

  public get clientModule(): FileModule {
    return this.clientFile;
  }

  protected getEnvName(capture: Capture): string {
    return `__CAPTURE_SYM_${capture.symbol}`;
  }

  renderCapture(capture: Capture): string {
    // TODO a require statement to import the client code
    return `require("${
      this.clientModule.filePath
    }")(process.env["${this.getEnvName(capture)}"])`;
  }
}
