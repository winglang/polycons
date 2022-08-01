# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

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


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.PolyconFactory.newInstance">newInstance</a></code> | Creates a new instance of a polycons by resolving it through the registered factory. |
| <code><a href="#@monadahq/polycons.PolyconFactory.register">register</a></code> | Adds a factory at the root of the construct tree. |

---

##### `newInstance` <a name="newInstance" id="@monadahq/polycons.PolyconFactory.newInstance"></a>

```typescript
import { PolyconFactory } from '@monadahq/polycons'

PolyconFactory.newInstance(qualifier: string, scope: IConstruct, id: string, props?: any)
```

Creates a new instance of a polycons by resolving it through the registered factory.

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.qualifier"></a>

- *Type:* string

The type qualifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.props"></a>

- *Type:* any

The construct props.

---

##### `register` <a name="register" id="@monadahq/polycons.PolyconFactory.register"></a>

```typescript
import { PolyconFactory } from '@monadahq/polycons'

PolyconFactory.register(scope: IConstruct, factory: IPolyconResolver)
```

Adds a factory at the root of the construct tree.

This factory will be used for resolving all polycons into constructs.

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.PolyconFactory.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `factory`<sup>Required</sup> <a name="factory" id="@monadahq/polycons.PolyconFactory.register.parameter.factory"></a>

- *Type:* <a href="#@monadahq/polycons.IPolyconResolver">IPolyconResolver</a>

---



## Protocols <a name="Protocols" id="Protocols"></a>

### IPolyconResolver <a name="IPolyconResolver" id="@monadahq/polycons.IPolyconResolver"></a>

- *Implemented By:* <a href="#@monadahq/polycons.IPolyconResolver">IPolyconResolver</a>

A resolver that determines how to turn polycons into concrete constructs.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.IPolyconResolver.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="@monadahq/polycons.IPolyconResolver.resolve"></a>

```typescript
public resolve(qualifier: string, scope: IConstruct, id: string, props?: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

Depending on your use case, it's possible to
resolve constructs differently based on the id, or to override the
props of a created construct.

###### `qualifier`<sup>Required</sup> <a name="qualifier" id="@monadahq/polycons.IPolyconResolver.resolve.parameter.qualifier"></a>

- *Type:* string

The type qualifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.IPolyconResolver.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.IPolyconResolver.resolve.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/polycons.IPolyconResolver.resolve.parameter.props"></a>

- *Type:* any

The construct props.

---


