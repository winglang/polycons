# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### Polycons <a name="Polycons" id="@monadahq/polycons.Polycons"></a>

Functions for resolving polycons (polymorphic constructs) into specific constructs.

#### Initializers <a name="Initializers" id="@monadahq/polycons.Polycons.Initializer"></a>

```typescript
import { Polycons } from '@monadahq/polycons'

new Polycons()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.Polycons.newInstance">newInstance</a></code> | Creates a new instance of a polycon by resolving it through the registered factory. |
| <code><a href="#@monadahq/polycons.Polycons.register">register</a></code> | Adds a factory at the root of the construct tree. |
| <code><a href="#@monadahq/polycons.Polycons.scope">scope</a></code> | *No description.* |

---

##### `newInstance` <a name="newInstance" id="@monadahq/polycons.Polycons.newInstance"></a>

```typescript
import { Polycons } from '@monadahq/polycons'

Polycons.newInstance(qualifier: string, scope: IConstruct, id: string, props?: any)
```

Creates a new instance of a polycon by resolving it through the registered factory.

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="@monadahq/polycons.Polycons.newInstance.parameter.qualifier"></a>

- *Type:* string

The type qualifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.Polycons.newInstance.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.Polycons.newInstance.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/polycons.Polycons.newInstance.parameter.props"></a>

- *Type:* any

The construct props.

---

##### `register` <a name="register" id="@monadahq/polycons.Polycons.register"></a>

```typescript
import { Polycons } from '@monadahq/polycons'

Polycons.register(scope: IConstruct, factory: IPolyconFactory)
```

Adds a factory at the root of the construct tree.

This factory will be used for resolving all polycons into constructs.

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.Polycons.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `factory`<sup>Required</sup> <a name="factory" id="@monadahq/polycons.Polycons.register.parameter.factory"></a>

- *Type:* <a href="#@monadahq/polycons.IPolyconFactory">IPolyconFactory</a>

---

##### `scope` <a name="scope" id="@monadahq/polycons.Polycons.scope"></a>

```typescript
import { Polycons } from '@monadahq/polycons'

Polycons.scope()
```



## Protocols <a name="Protocols" id="Protocols"></a>

### IPolyconFactory <a name="IPolyconFactory" id="@monadahq/polycons.IPolyconFactory"></a>

- *Implemented By:* <a href="#@monadahq/polycons.IPolyconFactory">IPolyconFactory</a>

A factory that determines how to turn polycons into concrete constructs.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.IPolyconFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="@monadahq/polycons.IPolyconFactory.resolve"></a>

```typescript
public resolve(qualifier: string, scope: IConstruct, id: string, props?: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="@monadahq/polycons.IPolyconFactory.resolve.parameter.qualifier"></a>

- *Type:* string

The type qualifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.IPolyconFactory.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.IPolyconFactory.resolve.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/polycons.IPolyconFactory.resolve.parameter.props"></a>

- *Type:* any

The construct props.

---


