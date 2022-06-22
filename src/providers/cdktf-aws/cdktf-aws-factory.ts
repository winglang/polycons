import { resolve } from "path";
import { IamRole, IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam";
import {
  LambdaEventSourceMapping,
  LambdaFunction,
  LambdaInvocation,
} from "@cdktf/provider-aws/lib/lambdafunction";
import {
  S3Bucket,
  S3BucketPublicAccessBlock,
  S3Object,
} from "@cdktf/provider-aws/lib/s3";
import { SqsQueue } from "@cdktf/provider-aws/lib/sqs";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct, IConstruct } from "constructs";
import { std } from "../..";
import {
  BucketProps,
  FunctionProps,
  IBucket,
  IFunction,
  IQueue,
  QueueProps,
} from "../../pocix";
import { Polycon, PolyconFactory } from "../../polycons";

export class CDKTerraformAWSFactory extends PolyconFactory {
  public resolve(
    qualifier: string,
    scope: IConstruct,
    id: string,
    props?: any
  ) {
    switch (qualifier) {
      case std.BUCKET_QUALIFIER:
        return new TFBucket(scope, id, props);
      case std.QUEUE_QUALIFIER:
        return new TFQueue(scope, id, props);
      case std.FUNCTION_QUALIFIER:
        return new TFLambdaFunction(scope, id, props);
      default:
        throw new Error("Qualifier not implemented.");
    }
  }

  public resolveClient(polycon: Polycon): any {
    switch (polycon.qualifier) {
      case std.BUCKET_QUALIFIER:
        return {};
      case std.QUEUE_QUALIFIER:
        return {};
      case std.FUNCTION_QUALIFIER:
        return {};
      default:
        throw new Error("Qualifier not implemented.");
    }
  }
}

export class TFQueue extends Construct implements IQueue {
  public queue: SqsQueue;

  constructor(scope: IConstruct, id: string, _props: QueueProps) {
    super(scope, id);

    this.queue = new SqsQueue(this, "Queue");
  }

  enqueue(_stuff: any): void {
    // TODO
    throw new Error("Method not implemented.");
  }
  addWorkerFunction(func: TFLambdaFunction): void {
    new LambdaEventSourceMapping(this, `Worker${func.node.id}`, {
      eventSourceArn: this.queue.arn,
      enabled: true,
      functionName: func.lambda.functionName,
    });
  }
  bindCapture(obj: IConstruct): void {
    const queuePolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          // TODO terrible policy
          Action: "sqs:*",
          Effect: "Allow",
          Resource: this.queue.arn,
        },
      ],
    };
    if (obj instanceof TFLambdaFunction) {
      obj.lambda.environment.variables[`_${this.node.addr}_ARN`] =
        this.queue.arn;
      obj.lambdaRole.putInlinePolicy([
        {
          policy: JSON.stringify(queuePolicy),
        },
      ]);
    }
  }
}

export class TFBucket extends Construct implements IBucket {
  public public: boolean;
  public bucket: S3Bucket;

  /**
   *
   */
  constructor(scope: IConstruct, id: string, props?: BucketProps) {
    super(scope, id);

    this.public = props?.public ?? false;

    this.bucket = new S3Bucket(this, "Bucket");

    new S3BucketPublicAccessBlock(this, "BlockPublicAccess", {
      bucket: this.bucket.bucket,
      blockPublicAcls: !this.public,
      blockPublicPolicy: !this.public,
      ignorePublicAcls: !this.public,
      restrictPublicBuckets: !this.public,
    });
  }

  bindCapture(obj: IConstruct): void {
    const bucketPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          // TODO terrible policy
          Action: "s3:*",
          Effect: "Allow",
          Resource: this.bucket.arn,
        },
      ],
    };
    if (obj instanceof TFLambdaFunction) {
      obj.lambdaRole.putInlinePolicy([
        {
          policy: JSON.stringify(bucketPolicy),
        },
      ]);
    }
  }
}

export class TFLambdaFunction extends Construct implements IFunction {
  public readonly lambda: LambdaFunction;
  public readonly lambdaRole: IamRole;

  constructor(scope: IConstruct, id: string, props: FunctionProps) {
    super(scope, id);

    const asset = new TerraformAsset(this, "Asset", {
      path: resolve(__dirname, props.process.entryFile),
      type: AssetType.FILE,
    });

    const lambdaRolePolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "sts:AssumeRole",
          Principal: {
            Service: "lambda.amazonaws.com",
          },
          Effect: "Allow",
        },
      ],
    };

    // Create unique S3 bucket that hosts Lambda executable
    const bucket = new S3Bucket(this, "AssetBucket");

    // Upload Lambda zip file to newly created S3 bucket
    const lambdaArchive = new S3Object(this, "LambdaData", {
      bucket: bucket.bucket,
      key: "index.js",
      source: asset.path,
    });

    // Create Lambda role
    this.lambdaRole = new IamRole(this, "ExecRole", {
      assumeRolePolicy: JSON.stringify(lambdaRolePolicy),
    });

    // Add execution role for lambda to write to CloudWatch logs
    new IamRolePolicyAttachment(this, "ManagedPolicy", {
      policyArn:
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      role: this.lambdaRole.name,
    });

    // Create Lambda function
    this.lambda = new LambdaFunction(this, "Lambda", {
      functionName: id,
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "exports." + props.process.entryName,
      runtime: "nodejs14.x",
      role: this.lambdaRole.arn,
    });
  }

  invoke(args?: any) {
    new LambdaInvocation(this, "Invoke", {
      functionName: this.lambda.functionName,
      input: args ? JSON.stringify(args) : "",
    });
  }
}
