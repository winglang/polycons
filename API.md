# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### BucketProps <a name="BucketProps" id="polycons.BucketProps"></a>

#### Initializer <a name="Initializer" id="polycons.BucketProps.Initializer"></a>

```typescript
import { BucketProps } from 'polycons'

const bucketProps: BucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.BucketProps.property.public">public</a></code> | <code>boolean</code> | *No description.* |

---

##### `public`<sup>Optional</sup> <a name="public" id="polycons.BucketProps.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---

### FunctionProps <a name="FunctionProps" id="polycons.FunctionProps"></a>

#### Initializer <a name="Initializer" id="polycons.FunctionProps.Initializer"></a>

```typescript
import { FunctionProps } from 'polycons'

const functionProps: FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.FunctionProps.property.process">process</a></code> | <code><a href="#polycons.Process">Process</a></code> | *No description.* |
| <code><a href="#polycons.FunctionProps.property.env">env</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `process`<sup>Required</sup> <a name="process" id="polycons.FunctionProps.property.process"></a>

```typescript
public readonly process: Process;
```

- *Type:* <a href="#polycons.Process">Process</a>

---

##### `env`<sup>Optional</sup> <a name="env" id="polycons.FunctionProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

### Process <a name="Process" id="polycons.Process"></a>

#### Initializer <a name="Initializer" id="polycons.Process.Initializer"></a>

```typescript
import { Process } from 'polycons'

const process: Process = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Process.property.captures">captures</a></code> | <code>{[ key: string ]: <a href="#polycons.Capture">Capture</a>}</code> | *No description.* |
| <code><a href="#polycons.Process.property.code">code</a></code> | <code><a href="#polycons.Code">Code</a></code> | *No description.* |
| <code><a href="#polycons.Process.property.entrypoint">entrypoint</a></code> | <code>string</code> | *No description.* |

---

##### `captures`<sup>Required</sup> <a name="captures" id="polycons.Process.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: <a href="#polycons.Capture">Capture</a>}

---

##### `code`<sup>Required</sup> <a name="code" id="polycons.Process.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* <a href="#polycons.Code">Code</a>

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="polycons.Process.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

---

### QueueProps <a name="QueueProps" id="polycons.QueueProps"></a>

#### Initializer <a name="Initializer" id="polycons.QueueProps.Initializer"></a>

```typescript
import { QueueProps } from 'polycons'

const queueProps: QueueProps = { ... }
```


## Classes <a name="Classes" id="Classes"></a>

### Bucket <a name="Bucket" id="polycons.Bucket"></a>

- *Implements:* <a href="#polycons.IBucket">IBucket</a>

#### Initializers <a name="Initializers" id="polycons.Bucket.Initializer"></a>

```typescript
import { Bucket } from 'polycons'

new Bucket(scope: Construct, id: string, props?: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#polycons.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polycons.Bucket.Initializer.parameter.props">props</a></code> | <code><a href="#polycons.BucketProps">BucketProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="polycons.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="polycons.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="polycons.Bucket.Initializer.parameter.props"></a>

- *Type:* <a href="#polycons.BucketProps">BucketProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Bucket.capture">capture</a></code> | *No description.* |
| <code><a href="#polycons.Bucket.addUploadHandler">addUploadHandler</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="polycons.Bucket.capture"></a>

```typescript
public capture(): IClientRecipe
```

##### `addUploadHandler` <a name="addUploadHandler" id="polycons.Bucket.addUploadHandler"></a>

```typescript
public addUploadHandler(_fn: IFunction): void
```

###### `_fn`<sup>Required</sup> <a name="_fn" id="polycons.Bucket.addUploadHandler.parameter._fn"></a>

- *Type:* <a href="#polycons.IFunction">IFunction</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Bucket.isPolycon">isPolycon</a></code> | *No description.* |

---

##### `isPolycon` <a name="isPolycon" id="polycons.Bucket.isPolycon"></a>

```typescript
import { Bucket } from 'polycons'

Bucket.isPolycon(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="polycons.Bucket.isPolycon.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polycons.Bucket.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polycons.Bucket.property.isPublic">isPublic</a></code> | <code>boolean</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polycons.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polycons.Bucket.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---

##### `isPublic`<sup>Required</sup> <a name="isPublic" id="polycons.Bucket.property.isPublic"></a>

```typescript
public readonly isPublic: boolean;
```

- *Type:* boolean

---


### Capture <a name="Capture" id="polycons.Capture"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Capture.polycon">polycon</a></code> | *No description.* |
| <code><a href="#polycons.Capture.primitive">primitive</a></code> | *No description.* |

---

##### `polycon` <a name="polycon" id="polycons.Capture.polycon"></a>

```typescript
import { Capture } from 'polycons'

Capture.polycon(polycon: Polycon)
```

###### `polycon`<sup>Required</sup> <a name="polycon" id="polycons.Capture.polycon.parameter.polycon"></a>

- *Type:* <a href="#polycons.Polycon">Polycon</a>

---

##### `primitive` <a name="primitive" id="polycons.Capture.primitive"></a>

```typescript
import { Capture } from 'polycons'

Capture.primitive(value: any)
```

###### `value`<sup>Required</sup> <a name="value" id="polycons.Capture.primitive.parameter.value"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Capture.property.recipe">recipe</a></code> | <code><a href="#polycons.IClientRecipe">IClientRecipe</a></code> | *No description.* |

---

##### `recipe`<sup>Required</sup> <a name="recipe" id="polycons.Capture.property.recipe"></a>

```typescript
public readonly recipe: IClientRecipe;
```

- *Type:* <a href="#polycons.IClientRecipe">IClientRecipe</a>

---


### CdktfAwsFactory <a name="CdktfAwsFactory" id="polycons.CdktfAwsFactory"></a>

#### Initializers <a name="Initializers" id="polycons.CdktfAwsFactory.Initializer"></a>

```typescript
import { CdktfAwsFactory } from 'polycons'

new CdktfAwsFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.CdktfAwsFactory.resolveConstruct">resolveConstruct</a></code> | *No description.* |

---

##### `resolveConstruct` <a name="resolveConstruct" id="polycons.CdktfAwsFactory.resolveConstruct"></a>

```typescript
public resolveConstruct(qualifier: string, scope: IConstruct, id: string, props?: any): IConstruct
```

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="polycons.CdktfAwsFactory.resolveConstruct.parameter.qualifier"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.CdktfAwsFactory.resolveConstruct.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="polycons.CdktfAwsFactory.resolveConstruct.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="polycons.CdktfAwsFactory.resolveConstruct.parameter.props"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.CdktfAwsFactory.of">of</a></code> | *No description.* |
| <code><a href="#polycons.CdktfAwsFactory.register">register</a></code> | *No description.* |

---

##### `of` <a name="of" id="polycons.CdktfAwsFactory.of"></a>

```typescript
import { CdktfAwsFactory } from 'polycons'

CdktfAwsFactory.of(scope: IConstruct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.CdktfAwsFactory.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `register` <a name="register" id="polycons.CdktfAwsFactory.register"></a>

```typescript
import { CdktfAwsFactory } from 'polycons'

CdktfAwsFactory.register(scope: IConstruct, factory: PolyconFactory)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.CdktfAwsFactory.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `factory`<sup>Required</sup> <a name="factory" id="polycons.CdktfAwsFactory.register.parameter.factory"></a>

- *Type:* <a href="#polycons.PolyconFactory">PolyconFactory</a>

---



### Code <a name="Code" id="polycons.Code"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Code.fromFile">fromFile</a></code> | *No description.* |
| <code><a href="#polycons.Code.fromInline">fromInline</a></code> | *No description.* |

---

##### `fromFile` <a name="fromFile" id="polycons.Code.fromFile"></a>

```typescript
import { Code } from 'polycons'

Code.fromFile(path: string)
```

###### `path`<sup>Required</sup> <a name="path" id="polycons.Code.fromFile.parameter.path"></a>

- *Type:* string

---

##### `fromInline` <a name="fromInline" id="polycons.Code.fromInline"></a>

```typescript
import { Code } from 'polycons'

Code.fromInline(text: string)
```

###### `text`<sup>Required</sup> <a name="text" id="polycons.Code.fromInline.parameter.text"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Code.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polycons.Code.property.text">text</a></code> | <code>string</code> | *No description.* |

---

##### `path`<sup>Optional</sup> <a name="path" id="polycons.Code.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `text`<sup>Optional</sup> <a name="text" id="polycons.Code.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

---


### Function <a name="Function" id="polycons.Function"></a>

- *Implements:* <a href="#polycons.IFunction">IFunction</a>

#### Initializers <a name="Initializers" id="polycons.Function.Initializer"></a>

```typescript
import { Function } from 'polycons'

new Function(scope: Construct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#polycons.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polycons.Function.Initializer.parameter.props">props</a></code> | <code><a href="#polycons.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="polycons.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="polycons.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="polycons.Function.Initializer.parameter.props"></a>

- *Type:* <a href="#polycons.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Function.capture">capture</a></code> | *No description.* |
| <code><a href="#polycons.Function.setEnvironment">setEnvironment</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="polycons.Function.capture"></a>

```typescript
public capture(): IClientRecipe
```

##### `setEnvironment` <a name="setEnvironment" id="polycons.Function.setEnvironment"></a>

```typescript
public setEnvironment(name: string, value: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="polycons.Function.setEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="polycons.Function.setEnvironment.parameter.value"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Function.isPolycon">isPolycon</a></code> | *No description.* |

---

##### `isPolycon` <a name="isPolycon" id="polycons.Function.isPolycon"></a>

```typescript
import { Function } from 'polycons'

Function.isPolycon(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="polycons.Function.isPolycon.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polycons.Function.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polycons.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polycons.Function.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---


### Polycon <a name="Polycon" id="polycons.Polycon"></a>

- *Implements:* constructs.IConstruct

#### Initializers <a name="Initializers" id="polycons.Polycon.Initializer"></a>

```typescript
import { Polycon } from 'polycons'

new Polycon(qualifier: string, scope: IConstruct, id: string, props?: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Polycon.Initializer.parameter.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polycons.Polycon.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#polycons.Polycon.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polycons.Polycon.Initializer.parameter.props">props</a></code> | <code>any</code> | *No description.* |

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polycons.Polycon.Initializer.parameter.qualifier"></a>

- *Type:* string

---

##### `scope`<sup>Required</sup> <a name="scope" id="polycons.Polycon.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `id`<sup>Required</sup> <a name="id" id="polycons.Polycon.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="polycons.Polycon.Initializer.parameter.props"></a>

- *Type:* any

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Polycon.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="polycons.Polycon.capture"></a>

```typescript
public capture(): IClientRecipe
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Polycon.isPolycon">isPolycon</a></code> | *No description.* |

---

##### `isPolycon` <a name="isPolycon" id="polycons.Polycon.isPolycon"></a>

```typescript
import { Polycon } from 'polycons'

Polycon.isPolycon(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="polycons.Polycon.isPolycon.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Polycon.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polycons.Polycon.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polycons.Polycon.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polycons.Polycon.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---


### PolyconFactory <a name="PolyconFactory" id="polycons.PolyconFactory"></a>

#### Initializers <a name="Initializers" id="polycons.PolyconFactory.Initializer"></a>

```typescript
import { PolyconFactory } from 'polycons'

new PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.PolyconFactory.resolveConstruct">resolveConstruct</a></code> | *No description.* |

---

##### `resolveConstruct` <a name="resolveConstruct" id="polycons.PolyconFactory.resolveConstruct"></a>

```typescript
public resolveConstruct(qualifier: string, scope: IConstruct, id: string, props?: any): IConstruct
```

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="polycons.PolyconFactory.resolveConstruct.parameter.qualifier"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.PolyconFactory.resolveConstruct.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="polycons.PolyconFactory.resolveConstruct.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="polycons.PolyconFactory.resolveConstruct.parameter.props"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.PolyconFactory.of">of</a></code> | *No description.* |
| <code><a href="#polycons.PolyconFactory.register">register</a></code> | *No description.* |

---

##### `of` <a name="of" id="polycons.PolyconFactory.of"></a>

```typescript
import { PolyconFactory } from 'polycons'

PolyconFactory.of(scope: IConstruct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.PolyconFactory.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `register` <a name="register" id="polycons.PolyconFactory.register"></a>

```typescript
import { PolyconFactory } from 'polycons'

PolyconFactory.register(scope: IConstruct, factory: PolyconFactory)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.PolyconFactory.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `factory`<sup>Required</sup> <a name="factory" id="polycons.PolyconFactory.register.parameter.factory"></a>

- *Type:* <a href="#polycons.PolyconFactory">PolyconFactory</a>

---



### Queue <a name="Queue" id="polycons.Queue"></a>

- *Implements:* <a href="#polycons.IQueue">IQueue</a>

#### Initializers <a name="Initializers" id="polycons.Queue.Initializer"></a>

```typescript
import { Queue } from 'polycons'

new Queue(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#polycons.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polycons.Queue.Initializer.parameter.props">props</a></code> | <code><a href="#polycons.QueueProps">QueueProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="polycons.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="polycons.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="polycons.Queue.Initializer.parameter.props"></a>

- *Type:* <a href="#polycons.QueueProps">QueueProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Queue.capture">capture</a></code> | *No description.* |
| <code><a href="#polycons.Queue.addWorkerFunction">addWorkerFunction</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="polycons.Queue.capture"></a>

```typescript
public capture(): IClientRecipe
```

##### `addWorkerFunction` <a name="addWorkerFunction" id="polycons.Queue.addWorkerFunction"></a>

```typescript
public addWorkerFunction(func: IFunction): void
```

###### `func`<sup>Required</sup> <a name="func" id="polycons.Queue.addWorkerFunction.parameter.func"></a>

- *Type:* <a href="#polycons.IFunction">IFunction</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Queue.isPolycon">isPolycon</a></code> | *No description.* |

---

##### `isPolycon` <a name="isPolycon" id="polycons.Queue.isPolycon"></a>

```typescript
import { Queue } from 'polycons'

Queue.isPolycon(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="polycons.Queue.isPolycon.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polycons.Queue.property.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polycons.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="polycons.Queue.property.qualifier"></a>

```typescript
public readonly qualifier: string;
```

- *Type:* string

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IBucket <a name="IBucket" id="polycons.IBucket"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#polycons.Bucket">Bucket</a>, <a href="#polycons.IBucket">IBucket</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IBucket.addUploadHandler">addUploadHandler</a></code> | *No description.* |

---

##### `addUploadHandler` <a name="addUploadHandler" id="polycons.IBucket.addUploadHandler"></a>

```typescript
public addUploadHandler(fn: IFunction): void
```

###### `fn`<sup>Required</sup> <a name="fn" id="polycons.IBucket.addUploadHandler.parameter.fn"></a>

- *Type:* <a href="#polycons.IFunction">IFunction</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.IBucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polycons.IBucket.property.isPublic">isPublic</a></code> | <code>boolean</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polycons.IBucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `isPublic`<sup>Required</sup> <a name="isPublic" id="polycons.IBucket.property.isPublic"></a>

```typescript
public readonly isPublic: boolean;
```

- *Type:* boolean

---

### IBucketClient <a name="IBucketClient" id="polycons.IBucketClient"></a>

- *Implemented By:* <a href="#polycons.IBucketClient">IBucketClient</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IBucketClient.download">download</a></code> | *No description.* |
| <code><a href="#polycons.IBucketClient.upload">upload</a></code> | *No description.* |

---

##### `download` <a name="download" id="polycons.IBucketClient.download"></a>

```typescript
public download(path: string): any
```

###### `path`<sup>Required</sup> <a name="path" id="polycons.IBucketClient.download.parameter.path"></a>

- *Type:* string

---

##### `upload` <a name="upload" id="polycons.IBucketClient.upload"></a>

```typescript
public upload(path: string, value: any): any
```

###### `path`<sup>Required</sup> <a name="path" id="polycons.IBucketClient.upload.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="polycons.IBucketClient.upload.parameter.value"></a>

- *Type:* any

---


### IClientRecipe <a name="IClientRecipe" id="polycons.IClientRecipe"></a>

- *Implemented By:* <a href="#polycons.IClientRecipe">IClientRecipe</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IClientRecipe.bindToCompute">bindToCompute</a></code> | *No description.* |

---

##### `bindToCompute` <a name="bindToCompute" id="polycons.IClientRecipe.bindToCompute"></a>

```typescript
public bindToCompute(name: string, compute: IConstruct): void
```

###### `name`<sup>Required</sup> <a name="name" id="polycons.IClientRecipe.bindToCompute.parameter.name"></a>

- *Type:* string

---

###### `compute`<sup>Required</sup> <a name="compute" id="polycons.IClientRecipe.bindToCompute.parameter.compute"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.IClientRecipe.property.code">code</a></code> | <code><a href="#polycons.Code">Code</a></code> | *No description.* |

---

##### `code`<sup>Required</sup> <a name="code" id="polycons.IClientRecipe.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* <a href="#polycons.Code">Code</a>

---

### IFunction <a name="IFunction" id="polycons.IFunction"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#polycons.Function">Function</a>, <a href="#polycons.IFunction">IFunction</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IFunction.setEnvironment">setEnvironment</a></code> | *No description.* |

---

##### `setEnvironment` <a name="setEnvironment" id="polycons.IFunction.setEnvironment"></a>

```typescript
public setEnvironment(name: string, value: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="polycons.IFunction.setEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="polycons.IFunction.setEnvironment.parameter.value"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.IFunction.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="polycons.IFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IFunctionClient <a name="IFunctionClient" id="polycons.IFunctionClient"></a>

- *Implemented By:* <a href="#polycons.IFunctionClient">IFunctionClient</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IFunctionClient.invoke">invoke</a></code> | *No description.* |

---

##### `invoke` <a name="invoke" id="polycons.IFunctionClient.invoke"></a>

```typescript
public invoke(event: any): any
```

###### `event`<sup>Required</sup> <a name="event" id="polycons.IFunctionClient.invoke.parameter.event"></a>

- *Type:* any

---


### IQueue <a name="IQueue" id="polycons.IQueue"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#polycons.Queue">Queue</a>, <a href="#polycons.IQueue">IQueue</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IQueue.addWorkerFunction">addWorkerFunction</a></code> | *No description.* |

---

##### `addWorkerFunction` <a name="addWorkerFunction" id="polycons.IQueue.addWorkerFunction"></a>

```typescript
public addWorkerFunction(func: IFunction): void
```

###### `func`<sup>Required</sup> <a name="func" id="polycons.IQueue.addWorkerFunction.parameter.func"></a>

- *Type:* <a href="#polycons.IFunction">IFunction</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polycons.IQueue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="polycons.IQueue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IQueueClient <a name="IQueueClient" id="polycons.IQueueClient"></a>

- *Implemented By:* <a href="#polycons.IQueueClient">IQueueClient</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IQueueClient.dequeue">dequeue</a></code> | *No description.* |
| <code><a href="#polycons.IQueueClient.enqueue">enqueue</a></code> | *No description.* |

---

##### `dequeue` <a name="dequeue" id="polycons.IQueueClient.dequeue"></a>

```typescript
public dequeue(): any
```

##### `enqueue` <a name="enqueue" id="polycons.IQueueClient.enqueue"></a>

```typescript
public enqueue(value: any): any
```

###### `value`<sup>Required</sup> <a name="value" id="polycons.IQueueClient.enqueue.parameter.value"></a>

- *Type:* any

---


