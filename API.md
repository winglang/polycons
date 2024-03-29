# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### Polycons <a name="Polycons" id="polycons.Polycons"></a>

Functions for resolving polycons (polymorphic constructs) into specific constructs.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.Polycons.newInstance">newInstance</a></code> | Creates a new instance of a polycon. |
| <code><a href="#polycons.Polycons.register">register</a></code> | Adds a factory at given scope. |

---

##### `newInstance` <a name="newInstance" id="polycons.Polycons.newInstance"></a>

```typescript
import { Polycons } from 'polycons'

Polycons.newInstance(type: string, scope: IConstruct, id: string, args: any)
```

Creates a new instance of a polycon.

The polycon is resolved using the
polycon factory that is registered nearest to it in the tree.

For example, if a construct tree has Root -> Parent -> MyPoly, and FactoryA
is registered to Root while FactoryB is registered to Parent, then
FactoryB will be used to resolve MyPoly.

###### `type`<sup>Required</sup> <a name="type" id="polycons.Polycons.newInstance.parameter.type"></a>

- *Type:* string

The type identifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.Polycons.newInstance.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="polycons.Polycons.newInstance.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `args`<sup>Required</sup> <a name="args" id="polycons.Polycons.newInstance.parameter.args"></a>

- *Type:* any

The rest of the construct's arguments.

---

##### `register` <a name="register" id="polycons.Polycons.register"></a>

```typescript
import { Polycons } from 'polycons'

Polycons.register(scope: IConstruct, factory: IPolyconFactory)
```

Adds a factory at given scope.

This factory will be used for resolving
polycons under this scope into constructs.

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.Polycons.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `factory`<sup>Required</sup> <a name="factory" id="polycons.Polycons.register.parameter.factory"></a>

- *Type:* <a href="#polycons.IPolyconFactory">IPolyconFactory</a>

---



## Protocols <a name="Protocols" id="Protocols"></a>

### IPolyconFactory <a name="IPolyconFactory" id="polycons.IPolyconFactory"></a>

- *Implemented By:* <a href="#polycons.IPolyconFactory">IPolyconFactory</a>

A factory that determines how to turn polycons into concrete constructs.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#polycons.IPolyconFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="polycons.IPolyconFactory.resolve"></a>

```typescript
public resolve(type: string, scope: IConstruct, id: string, args: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

###### `type`<sup>Required</sup> <a name="type" id="polycons.IPolyconFactory.resolve.parameter.type"></a>

- *Type:* string

The type identifier.

---

###### `scope`<sup>Required</sup> <a name="scope" id="polycons.IPolyconFactory.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

The construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="polycons.IPolyconFactory.resolve.parameter.id"></a>

- *Type:* string

The construct identifier.

---

###### `args`<sup>Required</sup> <a name="args" id="polycons.IPolyconFactory.resolve.parameter.args"></a>

- *Type:* any

The rest of the construct's arguments.

---


