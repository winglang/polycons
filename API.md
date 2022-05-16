# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="polyconstruct.App"></a>

#### Initializers <a name="Initializers" id="polyconstruct.App.Initializer"></a>

```typescript
import { App } from 'polyconstruct'

new App(props: AppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.App.Initializer.parameter.props">props</a></code> | <code><a href="#polyconstruct.AppProps">AppProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="polyconstruct.App.Initializer.parameter.props"></a>

- *Type:* <a href="#polyconstruct.AppProps">AppProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#polyconstruct.App.synth">synth</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="polyconstruct.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="polyconstruct.App.synth"></a>

```typescript
public synth(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="polyconstruct.App.isConstruct"></a>

```typescript
import { App } from 'polyconstruct'

App.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="polyconstruct.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Bucket <a name="Bucket" id="polyconstruct.Bucket"></a>

- *Implements:* <a href="#polyconstruct.IBucket">IBucket</a>

#### Initializers <a name="Initializers" id="polyconstruct.Bucket.Initializer"></a>

```typescript
import { Bucket } from 'polyconstruct'

new Bucket(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#polyconstruct.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#polyconstruct.Bucket.Initializer.parameter.props">props</a></code> | <code><a href="#polyconstruct.BucketProps">BucketProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="polyconstruct.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="polyconstruct.Bucket.Initializer.parameter.props"></a>

- *Type:* <a href="#polyconstruct.BucketProps">BucketProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="polyconstruct.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="polyconstruct.Bucket.isConstruct"></a>

```typescript
import { Bucket } from 'polyconstruct'

Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="polyconstruct.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polyconstruct.Bucket.property.public">public</a></code> | <code>boolean</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `public`<sup>Required</sup> <a name="public" id="polyconstruct.Bucket.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---


## Structs <a name="Structs" id="Structs"></a>

### AppProps <a name="AppProps" id="polyconstruct.AppProps"></a>

#### Initializer <a name="Initializer" id="polyconstruct.AppProps.Initializer"></a>

```typescript
import { AppProps } from 'polyconstruct'

const appProps: AppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.AppProps.property.factory">factory</a></code> | <code><a href="#polyconstruct.Factory">Factory</a></code> | *No description.* |

---

##### `factory`<sup>Required</sup> <a name="factory" id="polyconstruct.AppProps.property.factory"></a>

```typescript
public readonly factory: Factory;
```

- *Type:* <a href="#polyconstruct.Factory">Factory</a>

---

### BucketProps <a name="BucketProps" id="polyconstruct.BucketProps"></a>

#### Initializer <a name="Initializer" id="polyconstruct.BucketProps.Initializer"></a>

```typescript
import { BucketProps } from 'polyconstruct'

const bucketProps: BucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.BucketProps.property.public">public</a></code> | <code>boolean</code> | *No description.* |

---

##### `public`<sup>Optional</sup> <a name="public" id="polyconstruct.BucketProps.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---

## Classes <a name="Classes" id="Classes"></a>

### AwsFactory <a name="AwsFactory" id="polyconstruct.AwsFactory"></a>

#### Initializers <a name="Initializers" id="polyconstruct.AwsFactory.Initializer"></a>

```typescript
import { AwsFactory } from 'polyconstruct'

new AwsFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.AwsFactory.construct">construct</a></code> | *No description.* |

---

##### `construct` <a name="construct" id="polyconstruct.AwsFactory.construct"></a>

```typescript
public construct(type: string, scope: Construct, name: string, props: any): IConstruct
```

###### `type`<sup>Required</sup> <a name="type" id="polyconstruct.AwsFactory.construct.parameter.type"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.AwsFactory.construct.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `name`<sup>Required</sup> <a name="name" id="polyconstruct.AwsFactory.construct.parameter.name"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="polyconstruct.AwsFactory.construct.parameter.props"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.AwsFactory.of">of</a></code> | *No description.* |
| <code><a href="#polyconstruct.AwsFactory.register">register</a></code> | *No description.* |

---

##### `of` <a name="of" id="polyconstruct.AwsFactory.of"></a>

```typescript
import { AwsFactory } from 'polyconstruct'

AwsFactory.of(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.AwsFactory.of.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `register` <a name="register" id="polyconstruct.AwsFactory.register"></a>

```typescript
import { AwsFactory } from 'polyconstruct'

AwsFactory.register(scope: Construct, factory: Factory)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.AwsFactory.register.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `factory`<sup>Required</sup> <a name="factory" id="polyconstruct.AwsFactory.register.parameter.factory"></a>

- *Type:* <a href="#polyconstruct.Factory">Factory</a>

---



### Factory <a name="Factory" id="polyconstruct.Factory"></a>

#### Initializers <a name="Initializers" id="polyconstruct.Factory.Initializer"></a>

```typescript
import { Factory } from 'polyconstruct'

new Factory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.Factory.construct">construct</a></code> | *No description.* |

---

##### `construct` <a name="construct" id="polyconstruct.Factory.construct"></a>

```typescript
public construct(type: string, scope: Construct, id: string, props: any): IConstruct
```

###### `type`<sup>Required</sup> <a name="type" id="polyconstruct.Factory.construct.parameter.type"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.Factory.construct.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="polyconstruct.Factory.construct.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="polyconstruct.Factory.construct.parameter.props"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.Factory.of">of</a></code> | *No description.* |
| <code><a href="#polyconstruct.Factory.register">register</a></code> | *No description.* |

---

##### `of` <a name="of" id="polyconstruct.Factory.of"></a>

```typescript
import { Factory } from 'polyconstruct'

Factory.of(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.Factory.of.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `register` <a name="register" id="polyconstruct.Factory.register"></a>

```typescript
import { Factory } from 'polyconstruct'

Factory.register(scope: Construct, factory: Factory)
```

###### `scope`<sup>Required</sup> <a name="scope" id="polyconstruct.Factory.register.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `factory`<sup>Required</sup> <a name="factory" id="polyconstruct.Factory.register.parameter.factory"></a>

- *Type:* <a href="#polyconstruct.Factory">Factory</a>

---



## Protocols <a name="Protocols" id="Protocols"></a>

### IApp <a name="IApp" id="polyconstruct.IApp"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#polyconstruct.IApp">IApp</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polyconstruct.IApp.synth">synth</a></code> | *No description.* |

---

##### `synth` <a name="synth" id="polyconstruct.IApp.synth"></a>

```typescript
public synth(): string
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.IApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.IApp.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IBucket <a name="IBucket" id="polyconstruct.IBucket"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#polyconstruct.Bucket">Bucket</a>, <a href="#polyconstruct.IBucket">IBucket</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#polyconstruct.IBucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#polyconstruct.IBucket.property.public">public</a></code> | <code>boolean</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="polyconstruct.IBucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `public`<sup>Required</sup> <a name="public" id="polyconstruct.IBucket.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean

---

