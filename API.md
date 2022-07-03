# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### BaseCaptureOptions <a name="BaseCaptureOptions" id="polyconstruct.process.BaseCaptureOptions"></a>

#### Initializer <a name="Initializer" id="polyconstruct.process.BaseCaptureOptions.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const baseCaptureOptions: process.BaseCaptureOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.BaseCaptureOptions.property.symbol">symbol</a></code> | <code>string</code> | Name of (scoped) symbol. |
| <code><a href="#polyconstruct.process.BaseCaptureOptions.property.target">target</a></code> | <code>any</code> | Construction-time object. |

---

##### `symbol`<sup>Required</sup> <a name="symbol" id="polyconstruct.process.BaseCaptureOptions.property.symbol"></a>

```typescript
public readonly symbol: string;
```

- *Type:* string

Name of (scoped) symbol.

---

##### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.BaseCaptureOptions.property.target"></a>

```typescript
public readonly target: any;
```

- *Type:* any

Construction-time object.

---

### BucketProps <a name="BucketProps" id="polyconstruct.std.BucketProps"></a>

construction properties.

#### Initializer <a name="Initializer" id="polyconstruct.std.BucketProps.Initializer"></a>

```typescript
import { std } from 'polyconstruct'

const bucketProps: std.BucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.BucketProps.property.public">public</a></code> | <code>boolean</code> | *No description.* |

---

##### `public`<sup>Optional</sup> <a name="public" id="polyconstruct.std.BucketProps.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---

### Capture <a name="Capture" id="polyconstruct.process.Capture"></a>

#### Initializer <a name="Initializer" id="polyconstruct.process.Capture.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const capture: process.Capture = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.Capture.property.client">client</a></code> | <code>polyconstruct.process.CaptureClient</code> | Override for the target's module. |
| <code><a href="#polyconstruct.process.Capture.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |
| <code><a href="#polyconstruct.process.Capture.property.symbol">symbol</a></code> | <code>string</code> | Name of (scoped) symbol. |
| <code><a href="#polyconstruct.process.Capture.property.target">target</a></code> | <code>any</code> | Construction-time object. |

---

##### `client`<sup>Required</sup> <a name="client" id="polyconstruct.process.Capture.property.client"></a>

```typescript
public readonly client: CaptureClient;
```

- *Type:* polyconstruct.process.CaptureClient

Override for the target's module.

---

##### `methods`<sup>Required</sup> <a name="methods" id="polyconstruct.process.Capture.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

##### `symbol`<sup>Required</sup> <a name="symbol" id="polyconstruct.process.Capture.property.symbol"></a>

```typescript
public readonly symbol: string;
```

- *Type:* string

Name of (scoped) symbol.

---

##### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.Capture.property.target"></a>

```typescript
public readonly target: any;
```

- *Type:* any

Construction-time object.

---

### CaptureOptions <a name="CaptureOptions" id="polyconstruct.process.CaptureOptions"></a>

#### Initializer <a name="Initializer" id="polyconstruct.process.CaptureOptions.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const captureOptions: process.CaptureOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.CaptureOptions.property.symbol">symbol</a></code> | <code>string</code> | Name of (scoped) symbol. |
| <code><a href="#polyconstruct.process.CaptureOptions.property.target">target</a></code> | <code>any</code> | Construction-time object. |
| <code><a href="#polyconstruct.process.CaptureOptions.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |
| <code><a href="#polyconstruct.process.CaptureOptions.property.client">client</a></code> | <code>polyconstruct.process.CaptureClient</code> | Override for the target's module. |

---

##### `symbol`<sup>Required</sup> <a name="symbol" id="polyconstruct.process.CaptureOptions.property.symbol"></a>

```typescript
public readonly symbol: string;
```

- *Type:* string

Name of (scoped) symbol.

---

##### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.CaptureOptions.property.target"></a>

```typescript
public readonly target: any;
```

- *Type:* any

Construction-time object.

---

##### `methods`<sup>Required</sup> <a name="methods" id="polyconstruct.process.CaptureOptions.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

##### `client`<sup>Required</sup> <a name="client" id="polyconstruct.process.CaptureOptions.property.client"></a>

```typescript
public readonly client: CaptureClient;
```

- *Type:* polyconstruct.process.CaptureClient

Override for the target's module.

---

### ClientCaptureOptions <a name="ClientCaptureOptions" id="polyconstruct.process.ClientCaptureOptions"></a>

#### Initializer <a name="Initializer" id="polyconstruct.process.ClientCaptureOptions.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const clientCaptureOptions: process.ClientCaptureOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.ClientCaptureOptions.property.symbol">symbol</a></code> | <code>string</code> | Name of (scoped) symbol. |
| <code><a href="#polyconstruct.process.ClientCaptureOptions.property.target">target</a></code> | <code>any</code> | Construction-time object. |
| <code><a href="#polyconstruct.process.ClientCaptureOptions.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |

---

##### `symbol`<sup>Required</sup> <a name="symbol" id="polyconstruct.process.ClientCaptureOptions.property.symbol"></a>

```typescript
public readonly symbol: string;
```

- *Type:* string

Name of (scoped) symbol.

---

##### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.ClientCaptureOptions.property.target"></a>

```typescript
public readonly target: any;
```

- *Type:* any

Construction-time object.

---

##### `methods`<sup>Required</sup> <a name="methods" id="polyconstruct.process.ClientCaptureOptions.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

### DirectoryModule <a name="DirectoryModule" id="polyconstruct.process.DirectoryModule"></a>

#### Initializer <a name="Initializer" id="polyconstruct.process.DirectoryModule.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const directoryModule: process.DirectoryModule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.DirectoryModule.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.process.DirectoryModule.property.imports">imports</a></code> | <code>polyconstruct.process.Module[]</code> | *No description.* |
| <code><a href="#polyconstruct.process.DirectoryModule.property.directoryPath">directoryPath</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="polyconstruct.process.DirectoryModule.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `imports`<sup>Optional</sup> <a name="imports" id="polyconstruct.process.DirectoryModule.property.imports"></a>

```typescript
public readonly imports: Module[];
```

- *Type:* polyconstruct.process.Module[]

---

##### `directoryPath`<sup>Required</sup> <a name="directoryPath" id="polyconstruct.process.DirectoryModule.property.directoryPath"></a>

```typescript
public readonly directoryPath: string;
```

- *Type:* string

---

### FileModule <a name="FileModule" id="polyconstruct.process.FileModule"></a>

#### Initializer <a name="Initializer" id="polyconstruct.process.FileModule.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const fileModule: process.FileModule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.FileModule.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.process.FileModule.property.imports">imports</a></code> | <code>polyconstruct.process.Module[]</code> | *No description.* |
| <code><a href="#polyconstruct.process.FileModule.property.filePath">filePath</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="polyconstruct.process.FileModule.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `imports`<sup>Optional</sup> <a name="imports" id="polyconstruct.process.FileModule.property.imports"></a>

```typescript
public readonly imports: Module[];
```

- *Type:* polyconstruct.process.Module[]

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="polyconstruct.process.FileModule.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

---

### FunctionProps <a name="FunctionProps" id="polyconstruct.std.FunctionProps"></a>

#### Initializer <a name="Initializer" id="polyconstruct.std.FunctionProps.Initializer"></a>

```typescript
import { std } from 'polyconstruct'

const functionProps: std.FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.FunctionProps.property.process">process</a></code> | <code>polyconstruct.process.Process</code> | *No description.* |
| <code><a href="#polyconstruct.std.FunctionProps.property.env">env</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `process`<sup>Required</sup> <a name="process" id="polyconstruct.std.FunctionProps.property.process"></a>

```typescript
public readonly process: Process;
```

- *Type:* polyconstruct.process.Process

---

##### `env`<sup>Optional</sup> <a name="env" id="polyconstruct.std.FunctionProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

### Module <a name="Module" id="polyconstruct.process.Module"></a>

Purpose: Immutable description of code "module" "module" in this sense should be very similar in concept to an ESM, WASM, or other module.

TODO Not really sure about a model for this yet

#### Initializer <a name="Initializer" id="polyconstruct.process.Module.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const module: process.Module = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.Module.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.process.Module.property.imports">imports</a></code> | <code>polyconstruct.process.Module[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="polyconstruct.process.Module.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `imports`<sup>Optional</sup> <a name="imports" id="polyconstruct.process.Module.property.imports"></a>

```typescript
public readonly imports: Module[];
```

- *Type:* polyconstruct.process.Module[]

---

### NodeModule <a name="NodeModule" id="polyconstruct.process.NodeModule"></a>

#### Initializer <a name="Initializer" id="polyconstruct.process.NodeModule.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const nodeModule: process.NodeModule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.NodeModule.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.process.NodeModule.property.imports">imports</a></code> | <code>polyconstruct.process.Module[]</code> | *No description.* |
| <code><a href="#polyconstruct.process.NodeModule.property.spec">spec</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="polyconstruct.process.NodeModule.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `imports`<sup>Optional</sup> <a name="imports" id="polyconstruct.process.NodeModule.property.imports"></a>

```typescript
public readonly imports: Module[];
```

- *Type:* polyconstruct.process.Module[]

---

##### `spec`<sup>Required</sup> <a name="spec" id="polyconstruct.process.NodeModule.property.spec"></a>

```typescript
public readonly spec: string;
```

- *Type:* string

---

### Process <a name="Process" id="polyconstruct.process.Process"></a>

A process is a module that exposes an entrypoint and can capture values to include.

#### Initializer <a name="Initializer" id="polyconstruct.process.Process.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const process: process.Process = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.Process.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.process.Process.property.imports">imports</a></code> | <code>polyconstruct.process.Module[]</code> | *No description.* |
| <code><a href="#polyconstruct.process.Process.property.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.process.Process.property.captures">captures</a></code> | <code>polyconstruct.process.Capture[]</code> | *No description.* |
| <code><a href="#polyconstruct.process.Process.property.entrypoint">entrypoint</a></code> | <code>string</code> | Format: {module name}.{export}. |

---

##### `name`<sup>Required</sup> <a name="name" id="polyconstruct.process.Process.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `imports`<sup>Optional</sup> <a name="imports" id="polyconstruct.process.Process.property.imports"></a>

```typescript
public readonly imports: Module[];
```

- *Type:* polyconstruct.process.Module[]

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="polyconstruct.process.Process.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

---

##### `captures`<sup>Required</sup> <a name="captures" id="polyconstruct.process.Process.property.captures"></a>

```typescript
public readonly captures: Capture[];
```

- *Type:* polyconstruct.process.Capture[]

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="polyconstruct.process.Process.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

Format: {module name}.{export}.

---

### QueueProps <a name="QueueProps" id="polyconstruct.std.QueueProps"></a>

#### Initializer <a name="Initializer" id="polyconstruct.std.QueueProps.Initializer"></a>

```typescript
import { std } from 'polyconstruct'

const queueProps: std.QueueProps = { ... }
```


### TextModule <a name="TextModule" id="polyconstruct.process.TextModule"></a>

Raw/in-memory module data.

#### Initializer <a name="Initializer" id="polyconstruct.process.TextModule.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

const textModule: process.TextModule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.TextModule.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.process.TextModule.property.imports">imports</a></code> | <code>polyconstruct.process.Module[]</code> | *No description.* |
| <code><a href="#polyconstruct.process.TextModule.property.text">text</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="polyconstruct.process.TextModule.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `imports`<sup>Optional</sup> <a name="imports" id="polyconstruct.process.TextModule.property.imports"></a>

```typescript
public readonly imports: Module[];
```

- *Type:* polyconstruct.process.Module[]

---

##### `text`<sup>Required</sup> <a name="text" id="polyconstruct.process.TextModule.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

---

## Classes <a name="Classes" id="Classes"></a>

### Bucket <a name="Bucket" id="polyconstruct.std.Bucket"></a>

- *Implements:* polyconstruct.std.IBucket

Object storage.

#### Initializers <a name="Initializers" id="polyconstruct.std.Bucket.Initializer"></a>

```typescript
import { std } from 'polyconstruct'

new std.Bucket(scope: IConstruct, id: string, props?: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#polyconstruct.std.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.std.Bucket.Initializer.parameter.props">props</a></code> | <code>polyconstruct.std.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.std.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `id`<sup>Required</sup> <a name="id" id="polyconstruct.std.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="polyconstruct.std.Bucket.Initializer.parameter.props"></a>

- *Type:* polyconstruct.std.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.Bucket.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="polyconstruct.std.Bucket.capture"></a>

```typescript
public capture(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.Bucket.of">of</a></code> | *No description.* |

---

##### `of` <a name="of" id="polyconstruct.std.Bucket.of"></a>

```typescript
import { std } from 'polyconstruct'

std.Bucket.of(scope: IConstruct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.std.Bucket.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polyconstruct.std.Bucket.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.std.Bucket.property.public">public</a></code> | <code>boolean</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.std.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polyconstruct.std.Bucket.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---

##### `public`<sup>Required</sup> <a name="public" id="polyconstruct.std.Bucket.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---


### CaptureClient <a name="CaptureClient" id="polyconstruct.process.CaptureClient"></a>

Client to interact with preflight objects while inflight.

#### Initializers <a name="Initializers" id="polyconstruct.process.CaptureClient.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

new process.CaptureClient()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.CaptureClient.bindToProcessConsumer">bindToProcessConsumer</a></code> | May add system dependencies (e.g. environment variables). |
| <code><a href="#polyconstruct.process.CaptureClient.renderCapture">renderCapture</a></code> | *No description.* |

---

##### `bindToProcessConsumer` <a name="bindToProcessConsumer" id="polyconstruct.process.CaptureClient.bindToProcessConsumer"></a>

```typescript
public bindToProcessConsumer(capture: Capture, consumer: IProcessConsumer): void
```

May add system dependencies (e.g. environment variables).

Note: The responsibility of invoking this method is typically done the IProcessConsumer

###### `capture`<sup>Required</sup> <a name="capture" id="polyconstruct.process.CaptureClient.bindToProcessConsumer.parameter.capture"></a>

- *Type:* polyconstruct.process.Capture

---

###### `consumer`<sup>Required</sup> <a name="consumer" id="polyconstruct.process.CaptureClient.bindToProcessConsumer.parameter.consumer"></a>

- *Type:* polyconstruct.process.IProcessConsumer

---

##### `renderCapture` <a name="renderCapture" id="polyconstruct.process.CaptureClient.renderCapture"></a>

```typescript
public renderCapture(capture: Capture): string
```

###### `capture`<sup>Required</sup> <a name="capture" id="polyconstruct.process.CaptureClient.renderCapture.parameter.capture"></a>

- *Type:* polyconstruct.process.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.CaptureClient.of">of</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.CaptureClient.register">register</a></code> | Allows you to attach a client to a given object to provide a default/expected client. |

---

##### `of` <a name="of" id="polyconstruct.process.CaptureClient.of"></a>

```typescript
import { process } from 'polyconstruct'

process.CaptureClient.of(target: any)
```

###### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.CaptureClient.of.parameter.target"></a>

- *Type:* any

---

##### `register` <a name="register" id="polyconstruct.process.CaptureClient.register"></a>

```typescript
import { process } from 'polyconstruct'

process.CaptureClient.register(target: any, client: CaptureClient)
```

Allows you to attach a client to a given object to provide a default/expected client.

###### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.CaptureClient.register.parameter.target"></a>

- *Type:* any

---

###### `client`<sup>Required</sup> <a name="client" id="polyconstruct.process.CaptureClient.register.parameter.client"></a>

- *Type:* polyconstruct.process.CaptureClient

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.CaptureClient.property.clientModule">clientModule</a></code> | <code>polyconstruct.process.Module</code> | Optional module to expose to consuming processes. |

---

##### `clientModule`<sup>Optional</sup> <a name="clientModule" id="polyconstruct.process.CaptureClient.property.clientModule"></a>

```typescript
public readonly clientModule: Module;
```

- *Type:* polyconstruct.process.Module

Optional module to expose to consuming processes.

---


### CaptureHelper <a name="CaptureHelper" id="polyconstruct.process.CaptureHelper"></a>

#### Initializers <a name="Initializers" id="polyconstruct.process.CaptureHelper.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

new process.CaptureHelper(options: CaptureOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.CaptureHelper.Initializer.parameter.options">options</a></code> | <code>polyconstruct.process.CaptureOptions</code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="polyconstruct.process.CaptureHelper.Initializer.parameter.options"></a>

- *Type:* polyconstruct.process.CaptureOptions

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.CaptureHelper.client">client</a></code> | Creates a Capture to interact with the target object through an ICaptureClient. |
| <code><a href="#polyconstruct.process.CaptureHelper.custom">custom</a></code> | Creates a Capture to interact with the target object through the provided ICaptureClient. |
| <code><a href="#polyconstruct.process.CaptureHelper.direct">direct</a></code> | Creates a Capture represented via a client that serializes the target. |

---

##### `client` <a name="client" id="polyconstruct.process.CaptureHelper.client"></a>

```typescript
import { process } from 'polyconstruct'

process.CaptureHelper.client(options: ClientCaptureOptions)
```

Creates a Capture to interact with the target object through an ICaptureClient.

The client is fetched from the target itself with `CaptureClient.of(target)`

###### `options`<sup>Required</sup> <a name="options" id="polyconstruct.process.CaptureHelper.client.parameter.options"></a>

- *Type:* polyconstruct.process.ClientCaptureOptions

---

##### `custom` <a name="custom" id="polyconstruct.process.CaptureHelper.custom"></a>

```typescript
import { process } from 'polyconstruct'

process.CaptureHelper.custom(options: CaptureOptions)
```

Creates a Capture to interact with the target object through the provided ICaptureClient.

###### `options`<sup>Required</sup> <a name="options" id="polyconstruct.process.CaptureHelper.custom.parameter.options"></a>

- *Type:* polyconstruct.process.CaptureOptions

---

##### `direct` <a name="direct" id="polyconstruct.process.CaptureHelper.direct"></a>

```typescript
import { process } from 'polyconstruct'

process.CaptureHelper.direct(options: BaseCaptureOptions)
```

Creates a Capture represented via a client that serializes the target.

###### `options`<sup>Required</sup> <a name="options" id="polyconstruct.process.CaptureHelper.direct.parameter.options"></a>

- *Type:* polyconstruct.process.BaseCaptureOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.CaptureHelper.property.options">options</a></code> | <code>polyconstruct.process.CaptureOptions</code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="polyconstruct.process.CaptureHelper.property.options"></a>

```typescript
public readonly options: CaptureOptions;
```

- *Type:* polyconstruct.process.CaptureOptions

---


### DirectCaptureClient <a name="DirectCaptureClient" id="polyconstruct.process.DirectCaptureClient"></a>

#### Initializers <a name="Initializers" id="polyconstruct.process.DirectCaptureClient.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

new process.DirectCaptureClient()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.DirectCaptureClient.bindToProcessConsumer">bindToProcessConsumer</a></code> | No binding required. |
| <code><a href="#polyconstruct.process.DirectCaptureClient.renderCapture">renderCapture</a></code> | *No description.* |

---

##### `bindToProcessConsumer` <a name="bindToProcessConsumer" id="polyconstruct.process.DirectCaptureClient.bindToProcessConsumer"></a>

```typescript
public bindToProcessConsumer(_capture: Capture, _consumer: IProcessConsumer): void
```

No binding required.

###### `_capture`<sup>Required</sup> <a name="_capture" id="polyconstruct.process.DirectCaptureClient.bindToProcessConsumer.parameter._capture"></a>

- *Type:* polyconstruct.process.Capture

---

###### `_consumer`<sup>Required</sup> <a name="_consumer" id="polyconstruct.process.DirectCaptureClient.bindToProcessConsumer.parameter._consumer"></a>

- *Type:* polyconstruct.process.IProcessConsumer

---

##### `renderCapture` <a name="renderCapture" id="polyconstruct.process.DirectCaptureClient.renderCapture"></a>

```typescript
public renderCapture(capture: Capture): string
```

###### `capture`<sup>Required</sup> <a name="capture" id="polyconstruct.process.DirectCaptureClient.renderCapture.parameter.capture"></a>

- *Type:* polyconstruct.process.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.DirectCaptureClient.of">of</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.DirectCaptureClient.register">register</a></code> | Allows you to attach a client to a given object to provide a default/expected client. |

---

##### `of` <a name="of" id="polyconstruct.process.DirectCaptureClient.of"></a>

```typescript
import { process } from 'polyconstruct'

process.DirectCaptureClient.of(target: any)
```

###### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.DirectCaptureClient.of.parameter.target"></a>

- *Type:* any

---

##### `register` <a name="register" id="polyconstruct.process.DirectCaptureClient.register"></a>

```typescript
import { process } from 'polyconstruct'

process.DirectCaptureClient.register(target: any, client: CaptureClient)
```

Allows you to attach a client to a given object to provide a default/expected client.

###### `target`<sup>Required</sup> <a name="target" id="polyconstruct.process.DirectCaptureClient.register.parameter.target"></a>

- *Type:* any

---

###### `client`<sup>Required</sup> <a name="client" id="polyconstruct.process.DirectCaptureClient.register.parameter.client"></a>

- *Type:* polyconstruct.process.CaptureClient

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.process.DirectCaptureClient.property.clientModule">clientModule</a></code> | <code>polyconstruct.process.Module</code> | Optional module to expose to consuming processes. |

---

##### `clientModule`<sup>Optional</sup> <a name="clientModule" id="polyconstruct.process.DirectCaptureClient.property.clientModule"></a>

```typescript
public readonly clientModule: Module;
```

- *Type:* polyconstruct.process.Module

Optional module to expose to consuming processes.

---


### Function <a name="Function" id="polyconstruct.std.Function"></a>

- *Implements:* polyconstruct.std.IFunction

#### Initializers <a name="Initializers" id="polyconstruct.std.Function.Initializer"></a>

```typescript
import { std } from 'polyconstruct'

new std.Function(scope: IConstruct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#polyconstruct.std.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.std.Function.Initializer.parameter.props">props</a></code> | <code>polyconstruct.std.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.std.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `id`<sup>Required</sup> <a name="id" id="polyconstruct.std.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="polyconstruct.std.Function.Initializer.parameter.props"></a>

- *Type:* polyconstruct.std.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.Function.capture">capture</a></code> | *No description.* |
| <code><a href="#polyconstruct.std.Function.invoke">invoke</a></code> | Invoke function during "deployment". |
| <code><a href="#polyconstruct.std.Function.setEnvironment">setEnvironment</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="polyconstruct.std.Function.capture"></a>

```typescript
public capture(): void
```

##### `invoke` <a name="invoke" id="polyconstruct.std.Function.invoke"></a>

```typescript
public invoke(args?: any): any
```

Invoke function during "deployment".

###### `args`<sup>Optional</sup> <a name="args" id="polyconstruct.std.Function.invoke.parameter.args"></a>

- *Type:* any

---

##### `setEnvironment` <a name="setEnvironment" id="polyconstruct.std.Function.setEnvironment"></a>

```typescript
public setEnvironment(name: string, value: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="polyconstruct.std.Function.setEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="polyconstruct.std.Function.setEnvironment.parameter.value"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.Function.of">of</a></code> | *No description.* |

---

##### `of` <a name="of" id="polyconstruct.std.Function.of"></a>

```typescript
import { std } from 'polyconstruct'

std.Function.of(scope: IConstruct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.std.Function.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polyconstruct.std.Function.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.std.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polyconstruct.std.Function.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---


### NodeProcessBuilder <a name="NodeProcessBuilder" id="polyconstruct.process.NodeProcessBuilder"></a>

Create a single-file bundle to be run in a NodeJS process.

#### Initializers <a name="Initializers" id="polyconstruct.process.NodeProcessBuilder.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

new process.NodeProcessBuilder()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.NodeProcessBuilder.addCapture">addCapture</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.NodeProcessBuilder.addEntryModule">addEntryModule</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.NodeProcessBuilder.addModule">addModule</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.NodeProcessBuilder.createProcess">createProcess</a></code> | *No description.* |

---

##### `addCapture` <a name="addCapture" id="polyconstruct.process.NodeProcessBuilder.addCapture"></a>

```typescript
public addCapture(capture: Capture): ProcessBuilder
```

###### `capture`<sup>Required</sup> <a name="capture" id="polyconstruct.process.NodeProcessBuilder.addCapture.parameter.capture"></a>

- *Type:* polyconstruct.process.Capture

---

##### `addEntryModule` <a name="addEntryModule" id="polyconstruct.process.NodeProcessBuilder.addEntryModule"></a>

```typescript
public addEntryModule(exportName: string, module: Module): ProcessBuilder
```

###### `exportName`<sup>Required</sup> <a name="exportName" id="polyconstruct.process.NodeProcessBuilder.addEntryModule.parameter.exportName"></a>

- *Type:* string

---

###### `module`<sup>Required</sup> <a name="module" id="polyconstruct.process.NodeProcessBuilder.addEntryModule.parameter.module"></a>

- *Type:* polyconstruct.process.Module

---

##### `addModule` <a name="addModule" id="polyconstruct.process.NodeProcessBuilder.addModule"></a>

```typescript
public addModule(module: Module): ProcessBuilder
```

###### `module`<sup>Required</sup> <a name="module" id="polyconstruct.process.NodeProcessBuilder.addModule.parameter.module"></a>

- *Type:* polyconstruct.process.Module

---

##### `createProcess` <a name="createProcess" id="polyconstruct.process.NodeProcessBuilder.createProcess"></a>

```typescript
public createProcess(): Process
```




### Polycon <a name="Polycon" id="polyconstruct.polycons.Polycon"></a>

- *Implements:* constructs.IConstruct

#### Initializers <a name="Initializers" id="polyconstruct.polycons.Polycon.Initializer"></a>

```typescript
import { polycons } from 'polyconstruct'

new polycons.Polycon(qualifier: string, scope: IConstruct, id: string, props?: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.polycons.Polycon.Initializer.parameter.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.polycons.Polycon.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#polyconstruct.polycons.Polycon.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.polycons.Polycon.Initializer.parameter.props">props</a></code> | <code>any</code> | *No description.* |

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polyconstruct.polycons.Polycon.Initializer.parameter.qualifier"></a>

- *Type:* string

---

##### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.polycons.Polycon.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `id`<sup>Required</sup> <a name="id" id="polyconstruct.polycons.Polycon.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="polyconstruct.polycons.Polycon.Initializer.parameter.props"></a>

- *Type:* any

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.polycons.Polycon.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="polyconstruct.polycons.Polycon.capture"></a>

```typescript
public capture(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.polycons.Polycon.of">of</a></code> | *No description.* |

---

##### `of` <a name="of" id="polyconstruct.polycons.Polycon.of"></a>

```typescript
import { polycons } from 'polyconstruct'

polycons.Polycon.of(scope: IConstruct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.polycons.Polycon.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.polycons.Polycon.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polyconstruct.polycons.Polycon.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.polycons.Polycon.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polyconstruct.polycons.Polycon.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---


### PolyconFactory <a name="PolyconFactory" id="polyconstruct.polycons.PolyconFactory"></a>

#### Initializers <a name="Initializers" id="polyconstruct.polycons.PolyconFactory.Initializer"></a>

```typescript
import { polycons } from 'polyconstruct'

new polycons.PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.polycons.PolyconFactory.resolveConstruct">resolveConstruct</a></code> | *No description.* |

---

##### `resolveConstruct` <a name="resolveConstruct" id="polyconstruct.polycons.PolyconFactory.resolveConstruct"></a>

```typescript
public resolveConstruct(qualifier: string, scope: IConstruct, id: string, props?: any): IConstruct
```

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="polyconstruct.polycons.PolyconFactory.resolveConstruct.parameter.qualifier"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.polycons.PolyconFactory.resolveConstruct.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="polyconstruct.polycons.PolyconFactory.resolveConstruct.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="polyconstruct.polycons.PolyconFactory.resolveConstruct.parameter.props"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.polycons.PolyconFactory.of">of</a></code> | Returns the polycon factory associated with a Construct. |
| <code><a href="#polyconstruct.polycons.PolyconFactory.register">register</a></code> | Adds a factory at the root of the construct tree. |

---

##### `of` <a name="of" id="polyconstruct.polycons.PolyconFactory.of"></a>

```typescript
import { polycons } from 'polyconstruct'

polycons.PolyconFactory.of(scope: IConstruct)
```

Returns the polycon factory associated with a Construct.

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.polycons.PolyconFactory.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `register` <a name="register" id="polyconstruct.polycons.PolyconFactory.register"></a>

```typescript
import { polycons } from 'polyconstruct'

polycons.PolyconFactory.register(scope: IConstruct, factory: PolyconFactory)
```

Adds a factory at the root of the construct tree.

This factory will be used by default for polycon concretization.

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.polycons.PolyconFactory.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

construct within the tree to register the factory.

---

###### `factory`<sup>Required</sup> <a name="factory" id="polyconstruct.polycons.PolyconFactory.register.parameter.factory"></a>

- *Type:* polyconstruct.polycons.PolyconFactory

a PolyconFactory to register.

---



### ProcessBuilder <a name="ProcessBuilder" id="polyconstruct.process.ProcessBuilder"></a>

A process builder provide a fluent API for creating a process.

Processes are immutable while a process builder is mutable.

#### Initializers <a name="Initializers" id="polyconstruct.process.ProcessBuilder.Initializer"></a>

```typescript
import { process } from 'polyconstruct'

new process.ProcessBuilder()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.ProcessBuilder.addCapture">addCapture</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.ProcessBuilder.addEntryModule">addEntryModule</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.ProcessBuilder.addModule">addModule</a></code> | *No description.* |
| <code><a href="#polyconstruct.process.ProcessBuilder.createProcess">createProcess</a></code> | *No description.* |

---

##### `addCapture` <a name="addCapture" id="polyconstruct.process.ProcessBuilder.addCapture"></a>

```typescript
public addCapture(capture: Capture): ProcessBuilder
```

###### `capture`<sup>Required</sup> <a name="capture" id="polyconstruct.process.ProcessBuilder.addCapture.parameter.capture"></a>

- *Type:* polyconstruct.process.Capture

---

##### `addEntryModule` <a name="addEntryModule" id="polyconstruct.process.ProcessBuilder.addEntryModule"></a>

```typescript
public addEntryModule(exportName: string, module: Module): ProcessBuilder
```

###### `exportName`<sup>Required</sup> <a name="exportName" id="polyconstruct.process.ProcessBuilder.addEntryModule.parameter.exportName"></a>

- *Type:* string

---

###### `module`<sup>Required</sup> <a name="module" id="polyconstruct.process.ProcessBuilder.addEntryModule.parameter.module"></a>

- *Type:* polyconstruct.process.Module

---

##### `addModule` <a name="addModule" id="polyconstruct.process.ProcessBuilder.addModule"></a>

```typescript
public addModule(module: Module): ProcessBuilder
```

###### `module`<sup>Required</sup> <a name="module" id="polyconstruct.process.ProcessBuilder.addModule.parameter.module"></a>

- *Type:* polyconstruct.process.Module

---

##### `createProcess` <a name="createProcess" id="polyconstruct.process.ProcessBuilder.createProcess"></a>

```typescript
public createProcess(): Process
```




### Queue <a name="Queue" id="polyconstruct.std.Queue"></a>

- *Implements:* polyconstruct.std.IQueue

#### Initializers <a name="Initializers" id="polyconstruct.std.Queue.Initializer"></a>

```typescript
import { std } from 'polyconstruct'

new std.Queue(scope: IConstruct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#polyconstruct.std.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.std.Queue.Initializer.parameter.props">props</a></code> | <code>polyconstruct.std.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.std.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `id`<sup>Required</sup> <a name="id" id="polyconstruct.std.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="polyconstruct.std.Queue.Initializer.parameter.props"></a>

- *Type:* polyconstruct.std.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.Queue.capture">capture</a></code> | *No description.* |
| <code><a href="#polyconstruct.std.Queue.addWorkerFunction">addWorkerFunction</a></code> | Register function to listen to this queue and receive message from it. |
| <code><a href="#polyconstruct.std.Queue.enqueue">enqueue</a></code> | Enqueue value to queue during "deployment". |

---

##### `capture` <a name="capture" id="polyconstruct.std.Queue.capture"></a>

```typescript
public capture(): void
```

##### `addWorkerFunction` <a name="addWorkerFunction" id="polyconstruct.std.Queue.addWorkerFunction"></a>

```typescript
public addWorkerFunction(func: IFunction): void
```

Register function to listen to this queue and receive message from it.

###### `func`<sup>Required</sup> <a name="func" id="polyconstruct.std.Queue.addWorkerFunction.parameter.func"></a>

- *Type:* polyconstruct.std.IFunction

---

##### `enqueue` <a name="enqueue" id="polyconstruct.std.Queue.enqueue"></a>

```typescript
public enqueue(stuff: any): void
```

Enqueue value to queue during "deployment".

###### `stuff`<sup>Required</sup> <a name="stuff" id="polyconstruct.std.Queue.enqueue.parameter.stuff"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.Queue.of">of</a></code> | *No description.* |

---

##### `of` <a name="of" id="polyconstruct.std.Queue.of"></a>

```typescript
import { std } from 'polyconstruct'

std.Queue.of(scope: IConstruct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.std.Queue.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polyconstruct.std.Queue.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.std.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polyconstruct.std.Queue.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IBucket <a name="IBucket" id="polyconstruct.std.IBucket"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* polyconstruct.std.Bucket, polyconstruct.std.IBucket

This interface is shared by the polycon and the underlying concrete construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.IBucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polyconstruct.std.IBucket.property.public">public</a></code> | <code>boolean</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.std.IBucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `public`<sup>Required</sup> <a name="public" id="polyconstruct.std.IBucket.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---

### IBucketClient <a name="IBucketClient" id="polyconstruct.std.IBucketClient"></a>

- *Implemented By:* polyconstruct.std.IBucketClient

Inflight client for constructs implementing IBucket.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.IBucketClient.download">download</a></code> | *No description.* |
| <code><a href="#polyconstruct.std.IBucketClient.upload">upload</a></code> | *No description.* |

---

##### `download` <a name="download" id="polyconstruct.std.IBucketClient.download"></a>

```typescript
public download(path: string): any
```

###### `path`<sup>Required</sup> <a name="path" id="polyconstruct.std.IBucketClient.download.parameter.path"></a>

- *Type:* string

---

##### `upload` <a name="upload" id="polyconstruct.std.IBucketClient.upload"></a>

```typescript
public upload(path: string, value: any): any
```

###### `path`<sup>Required</sup> <a name="path" id="polyconstruct.std.IBucketClient.upload.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="polyconstruct.std.IBucketClient.upload.parameter.value"></a>

- *Type:* any

---


### IFunction <a name="IFunction" id="polyconstruct.std.IFunction"></a>

- *Extends:* constructs.IConstruct, polyconstruct.process.IProcessConsumer

- *Implemented By:* polyconstruct.std.Function, polyconstruct.std.IFunction

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.IFunction.invoke">invoke</a></code> | Invoke function during "deployment". |

---

##### `invoke` <a name="invoke" id="polyconstruct.std.IFunction.invoke"></a>

```typescript
public invoke(args?: any): any
```

Invoke function during "deployment".

###### `args`<sup>Optional</sup> <a name="args" id="polyconstruct.std.IFunction.invoke.parameter.args"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.IFunction.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.std.IFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IProcessConsumer <a name="IProcessConsumer" id="polyconstruct.process.IProcessConsumer"></a>

- *Implemented By:* polyconstruct.std.Function, polyconstruct.process.IProcessConsumer, polyconstruct.std.IFunction

Exposes an api to mutate a compute system.

Currently used to allow clients to make changes to the system they're running on to ensure they'll work correctly.


TODO Not sure if this is worth doing, cause it's probably going to be the leakiest abstraction in the universe

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.process.IProcessConsumer.setEnvironment">setEnvironment</a></code> | *No description.* |

---

##### `setEnvironment` <a name="setEnvironment" id="polyconstruct.process.IProcessConsumer.setEnvironment"></a>

```typescript
public setEnvironment(name: string, value: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="polyconstruct.process.IProcessConsumer.setEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="polyconstruct.process.IProcessConsumer.setEnvironment.parameter.value"></a>

- *Type:* string

---


### IQueue <a name="IQueue" id="polyconstruct.std.IQueue"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* polyconstruct.std.Queue, polyconstruct.std.IQueue

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.IQueue.addWorkerFunction">addWorkerFunction</a></code> | Register function to listen to this queue and receive message from it. |
| <code><a href="#polyconstruct.std.IQueue.enqueue">enqueue</a></code> | Enqueue value to queue during "deployment". |

---

##### `addWorkerFunction` <a name="addWorkerFunction" id="polyconstruct.std.IQueue.addWorkerFunction"></a>

```typescript
public addWorkerFunction(func: IFunction): void
```

Register function to listen to this queue and receive message from it.

###### `func`<sup>Required</sup> <a name="func" id="polyconstruct.std.IQueue.addWorkerFunction.parameter.func"></a>

- *Type:* polyconstruct.std.IFunction

---

##### `enqueue` <a name="enqueue" id="polyconstruct.std.IQueue.enqueue"></a>

```typescript
public enqueue(obj: any): void
```

Enqueue value to queue during "deployment".

###### `obj`<sup>Required</sup> <a name="obj" id="polyconstruct.std.IQueue.enqueue.parameter.obj"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.std.IQueue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.std.IQueue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IQueueClient <a name="IQueueClient" id="polyconstruct.std.IQueueClient"></a>

- *Implemented By:* polyconstruct.std.IQueueClient

Inflight client for constructs implementing IQueue.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.std.IQueueClient.dequeue">dequeue</a></code> | *No description.* |
| <code><a href="#polyconstruct.std.IQueueClient.enqueue">enqueue</a></code> | *No description.* |

---

##### `dequeue` <a name="dequeue" id="polyconstruct.std.IQueueClient.dequeue"></a>

```typescript
public dequeue(): any
```

##### `enqueue` <a name="enqueue" id="polyconstruct.std.IQueueClient.enqueue"></a>

```typescript
public enqueue(value: any): any
```

###### `value`<sup>Required</sup> <a name="value" id="polyconstruct.std.IQueueClient.enqueue.parameter.value"></a>

- *Type:* any

---


