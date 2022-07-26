# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### Capture <a name="Capture" id="@monadahq/polycons.Capture"></a>

Capture information.

A capture is a reference from a Process to a
construction-time object or value.

#### Initializer <a name="Initializer" id="@monadahq/polycons.Capture.Initializer"></a>

```typescript
import { Capture } from '@monadahq/polycons'

const capture: Capture = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.Capture.property.obj">obj</a></code> | <code>any</code> | The captured object. |
| <code><a href="#@monadahq/polycons.Capture.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@monadahq/polycons.Capture.property.obj"></a>

```typescript
public readonly obj: any;
```

- *Type:* any

The captured object.

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@monadahq/polycons.Capture.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

### ProcessProps <a name="ProcessProps" id="@monadahq/polycons.ProcessProps"></a>

Options for `Process`.

#### Initializer <a name="Initializer" id="@monadahq/polycons.ProcessProps.Initializer"></a>

```typescript
import { ProcessProps } from '@monadahq/polycons'

const processProps: ProcessProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.ProcessProps.property.code">code</a></code> | <code><a href="#@monadahq/polycons.Code">Code</a></code> | Reference to code containing the entrypoint function. |
| <code><a href="#@monadahq/polycons.ProcessProps.property.entrypoint">entrypoint</a></code> | <code>string</code> | Name of the exported function which will be run. |
| <code><a href="#@monadahq/polycons.ProcessProps.property.captures">captures</a></code> | <code>{[ key: string ]: <a href="#@monadahq/polycons.Capture">Capture</a>}</code> | Capture information. |

---

##### `code`<sup>Required</sup> <a name="code" id="@monadahq/polycons.ProcessProps.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* <a href="#@monadahq/polycons.Code">Code</a>

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@monadahq/polycons.ProcessProps.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

Name of the exported function which will be run.

---

##### `captures`<sup>Optional</sup> <a name="captures" id="@monadahq/polycons.ProcessProps.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: <a href="#@monadahq/polycons.Capture">Capture</a>}

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

## Classes <a name="Classes" id="Classes"></a>

### Code <a name="Code" id="@monadahq/polycons.Code"></a>

Reference to a piece of code.

#### Initializers <a name="Initializers" id="@monadahq/polycons.Code.Initializer"></a>

```typescript
import { Code } from '@monadahq/polycons'

new Code()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.Code.property.language">language</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/polycons.Code.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/polycons.Code.property.text">text</a></code> | <code>string</code> | *No description.* |

---

##### `language`<sup>Required</sup> <a name="language" id="@monadahq/polycons.Code.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/polycons.Code.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `text`<sup>Required</sup> <a name="text" id="@monadahq/polycons.Code.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

---


### JSCode <a name="JSCode" id="@monadahq/polycons.JSCode"></a>

Reference to a piece of JavaScript code.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.JSCode.fromFile">fromFile</a></code> | Reference code from a file path. |
| <code><a href="#@monadahq/polycons.JSCode.fromInline">fromInline</a></code> | Reference code directly from a string. |

---

##### `fromFile` <a name="fromFile" id="@monadahq/polycons.JSCode.fromFile"></a>

```typescript
import { JSCode } from '@monadahq/polycons'

JSCode.fromFile(path: string)
```

Reference code from a file path.

###### `path`<sup>Required</sup> <a name="path" id="@monadahq/polycons.JSCode.fromFile.parameter.path"></a>

- *Type:* string

---

##### `fromInline` <a name="fromInline" id="@monadahq/polycons.JSCode.fromInline"></a>

```typescript
import { JSCode } from '@monadahq/polycons'

JSCode.fromInline(text: string)
```

Reference code directly from a string.

###### `text`<sup>Required</sup> <a name="text" id="@monadahq/polycons.JSCode.fromInline.parameter.text"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.JSCode.property.language">language</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/polycons.JSCode.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/polycons.JSCode.property.text">text</a></code> | <code>string</code> | Returns the text contents. |

---

##### `language`<sup>Required</sup> <a name="language" id="@monadahq/polycons.JSCode.property.language"></a>

```typescript
public readonly language: string;
```

- *Type:* string

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/polycons.JSCode.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `text`<sup>Required</sup> <a name="text" id="@monadahq/polycons.JSCode.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

Returns the text contents.

---


### Polycon <a name="Polycon" id="@monadahq/polycons.Polycon"></a>

- *Implements:* constructs.IConstruct

A polymorphic construct that can be resolved at construction time into a more specific construct.

#### Initializers <a name="Initializers" id="@monadahq/polycons.Polycon.Initializer"></a>

```typescript
import { Polycon } from '@monadahq/polycons'

new Polycon(qualifier: string, scope: IConstruct, id: string, props?: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.Polycon.Initializer.parameter.qualifier">qualifier</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/polycons.Polycon.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#@monadahq/polycons.Polycon.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/polycons.Polycon.Initializer.parameter.props">props</a></code> | <code>any</code> | *No description.* |

---

##### `qualifier`<sup>Required</sup> <a name="qualifier" id="@monadahq/polycons.Polycon.Initializer.parameter.qualifier"></a>

- *Type:* string

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.Polycon.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.Polycon.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/polycons.Polycon.Initializer.parameter.props"></a>

- *Type:* any

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.Polycon.isPolycon">isPolycon</a></code> | Checks if `x` is a construct. |

---

##### `isPolycon` <a name="isPolycon" id="@monadahq/polycons.Polycon.isPolycon"></a>

```typescript
import { Polycon } from '@monadahq/polycons'

Polycon.isPolycon(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/polycons.Polycon.isPolycon.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.Polycon.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/polycons.Polycon.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### PolyconFactory <a name="PolyconFactory" id="@monadahq/polycons.PolyconFactory"></a>

A factory that can be used to resolve polycons (polymorphic constructs) into specific constructs.

#### Initializers <a name="Initializers" id="@monadahq/polycons.PolyconFactory.Initializer"></a>

```typescript
import { PolyconFactory } from '@monadahq/polycons'

new PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.PolyconFactory.resolveConstruct">resolveConstruct</a></code> | *No description.* |

---

##### `resolveConstruct` <a name="resolveConstruct" id="@monadahq/polycons.PolyconFactory.resolveConstruct"></a>

```typescript
public resolveConstruct(qualifier: string, scope: IConstruct, id: string, props?: any): IConstruct
```

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="@monadahq/polycons.PolyconFactory.resolveConstruct.parameter.qualifier"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.PolyconFactory.resolveConstruct.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.PolyconFactory.resolveConstruct.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/polycons.PolyconFactory.resolveConstruct.parameter.props"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.PolyconFactory.of">of</a></code> | Returns the polycon factory registered in a given scope. |
| <code><a href="#@monadahq/polycons.PolyconFactory.register">register</a></code> | Adds a factory at the root of the construct tree. |

---

##### `of` <a name="of" id="@monadahq/polycons.PolyconFactory.of"></a>

```typescript
import { PolyconFactory } from '@monadahq/polycons'

PolyconFactory.of(scope: IConstruct)
```

Returns the polycon factory registered in a given scope.

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.PolyconFactory.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `register` <a name="register" id="@monadahq/polycons.PolyconFactory.register"></a>

```typescript
import { PolyconFactory } from '@monadahq/polycons'

PolyconFactory.register(scope: IConstruct, factory: PolyconFactory)
```

Adds a factory at the root of the construct tree.

This factory will be used for resolving all polycons into constructs.

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.PolyconFactory.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `factory`<sup>Required</sup> <a name="factory" id="@monadahq/polycons.PolyconFactory.register.parameter.factory"></a>

- *Type:* <a href="#@monadahq/polycons.PolyconFactory">PolyconFactory</a>

---



### Process <a name="Process" id="@monadahq/polycons.Process"></a>

Runtime code with a named entrypoint.

Typically this represents code
that exists to be run outside of the scope of a `constructs` application.

#### Initializers <a name="Initializers" id="@monadahq/polycons.Process.Initializer"></a>

```typescript
import { Process } from '@monadahq/polycons'

new Process(props: ProcessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.Process.Initializer.parameter.props">props</a></code> | <code><a href="#@monadahq/polycons.ProcessProps">ProcessProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/polycons.Process.Initializer.parameter.props"></a>

- *Type:* <a href="#@monadahq/polycons.ProcessProps">ProcessProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.Process.property.captures">captures</a></code> | <code>{[ key: string ]: <a href="#@monadahq/polycons.Capture">Capture</a>}</code> | *No description.* |
| <code><a href="#@monadahq/polycons.Process.property.code">code</a></code> | <code><a href="#@monadahq/polycons.Code">Code</a></code> | *No description.* |
| <code><a href="#@monadahq/polycons.Process.property.entrypoint">entrypoint</a></code> | <code>string</code> | *No description.* |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@monadahq/polycons.Process.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: <a href="#@monadahq/polycons.Capture">Capture</a>}

---

##### `code`<sup>Required</sup> <a name="code" id="@monadahq/polycons.Process.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* <a href="#@monadahq/polycons.Code">Code</a>

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@monadahq/polycons.Process.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ICapturable <a name="ICapturable" id="@monadahq/polycons.ICapturable"></a>

- *Implemented By:* <a href="#@monadahq/polycons.ICapturable">ICapturable</a>

Represents something that is capturable.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.ICapturable.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="@monadahq/polycons.ICapturable.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): Code
```

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/polycons.ICapturable.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/polycons.ICapturable.capture.parameter.capture"></a>

- *Type:* <a href="#@monadahq/polycons.Capture">Capture</a>

---


