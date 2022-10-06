# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### PolyconFactory <a name="PolyconFactory" id="@monadahq/polycons.PolyconFactory"></a>

A factory that determines how to turn polycons into concrete constructs.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.PolyconFactory.addResolver">addResolver</a></code> | Adds a new resolver to this factory. |
| <code><a href="#@monadahq/polycons.PolyconFactory.newInstance">newInstance</a></code> | Creates a new instance of a polycon. |

---

##### `addResolver` <a name="addResolver" id="@monadahq/polycons.PolyconFactory.addResolver"></a>

```typescript
public addResolver(resolver: IPolyconResolver): void
```

Adds a new resolver to this factory.

###### `resolver`<sup>Required</sup> <a name="resolver" id="@monadahq/polycons.PolyconFactory.addResolver.parameter.resolver"></a>

- *Type:* <a href="#@monadahq/polycons.IPolyconResolver">IPolyconResolver</a>

The resolver to add.

---

##### `newInstance` <a name="newInstance" id="@monadahq/polycons.PolyconFactory.newInstance"></a>

```typescript
public newInstance(type: string, scope: IConstruct, id: string, args: any): IConstruct
```

Creates a new instance of a polycon.

###### `type`<sup>Required</sup> <a name="type" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.type"></a>

- *Type:* string

The type identifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `args`<sup>Required</sup> <a name="args" id="@monadahq/polycons.PolyconFactory.newInstance.parameter.args"></a>

- *Type:* any

The rest of the construct's arguments.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.PolyconFactory.create">create</a></code> | Creates a polycon factory from a list of individual polycon resolvers. |

---

##### `create` <a name="create" id="@monadahq/polycons.PolyconFactory.create"></a>

```typescript
import { PolyconFactory } from '@monadahq/polycons'

PolyconFactory.create(resolvers: IPolyconResolver)
```

Creates a polycon factory from a list of individual polycon resolvers.

No two resolvers can be associated with the same polycon type.

###### `resolvers`<sup>Required</sup> <a name="resolvers" id="@monadahq/polycons.PolyconFactory.create.parameter.resolvers"></a>

- *Type:* <a href="#@monadahq/polycons.IPolyconResolver">IPolyconResolver</a>

An array of resolvers.

---



### Polycons <a name="Polycons" id="@monadahq/polycons.Polycons"></a>

Functions for resolving polycons (polymorphic constructs) into specific constructs.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.Polycons.newInstance">newInstance</a></code> | Creates a new instance of a polycon. |
| <code><a href="#@monadahq/polycons.Polycons.register">register</a></code> | Adds a factory at given scope. |

---

##### `newInstance` <a name="newInstance" id="@monadahq/polycons.Polycons.newInstance"></a>

```typescript
import { Polycons } from '@monadahq/polycons'

Polycons.newInstance(type: string, scope: IConstruct, id: string, args: any)
```

Creates a new instance of a polycon.

The polycon is resolved using the
polycon factory that is registered nearest to it in the tree.

For example, if a construct tree has Root -> Parent -> MyPoly, and FactoryA
is registered to Root while FactoryB is registered to Parent, then
FactoryB will be used to resolve MyPoly.

###### `type`<sup>Required</sup> <a name="type" id="@monadahq/polycons.Polycons.newInstance.parameter.type"></a>

- *Type:* string

The type identifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.Polycons.newInstance.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.Polycons.newInstance.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `args`<sup>Required</sup> <a name="args" id="@monadahq/polycons.Polycons.newInstance.parameter.args"></a>

- *Type:* any

The rest of the construct's arguments.

---

##### `register` <a name="register" id="@monadahq/polycons.Polycons.register"></a>

```typescript
import { Polycons } from '@monadahq/polycons'

Polycons.register(scope: IConstruct, factory: PolyconFactory)
```

Adds a factory at given scope.

This factory will be used for resolving
polycons under this scope into constructs.

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.Polycons.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `factory`<sup>Required</sup> <a name="factory" id="@monadahq/polycons.Polycons.register.parameter.factory"></a>

- *Type:* <a href="#@monadahq/polycons.PolyconFactory">PolyconFactory</a>

---



## Protocols <a name="Protocols" id="Protocols"></a>

### IPolyconResolver <a name="IPolyconResolver" id="@monadahq/polycons.IPolyconResolver"></a>

- *Implemented By:* <a href="#@monadahq/polycons.IPolyconResolver">IPolyconResolver</a>

A resolver that knows how to resolve a specific polycon type.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/polycons.IPolyconResolver.resolve">resolve</a></code> | Creates a new instance of a polycon. |

---

##### `resolve` <a name="resolve" id="@monadahq/polycons.IPolyconResolver.resolve"></a>

```typescript
public resolve(scope: IConstruct, id: string, args: any): IConstruct
```

Creates a new instance of a polycon.

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/polycons.IPolyconResolver.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/polycons.IPolyconResolver.resolve.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `args`<sup>Required</sup> <a name="args" id="@monadahq/polycons.IPolyconResolver.resolve.parameter.args"></a>

- *Type:* any

The rest of the construct's arguments.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/polycons.IPolyconResolver.property.type">type</a></code> | <code>string</code> | The type identifier of the polycon this resolver can resolve. |

---

##### `type`<sup>Required</sup> <a name="type" id="@monadahq/polycons.IPolyconResolver.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The type identifier of the polycon this resolver can resolve.

---

