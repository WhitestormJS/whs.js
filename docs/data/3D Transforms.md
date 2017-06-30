# 3D transforms


### `.position`

> Used in: `MeshComponent`, `LightComponent`, `CameraComponent`

**position** is a 3D vector ([`THREE.Vector3`](https://threejs.org/docs/index.html#Reference/Math/Vector3)) object that defines where mesh is located in space.

```js
ball.position.set(10, 20, 45);

ball.position.x // -> 10
ball.position.y // -> 20
ball.position.z // -> 45
```

#### Modifying values and methods

That's several examples of how you can modify positon:

  - `ball.position.set( x, y, z )`
  - `ball.position.setX( x )`, (`.setX()`, `.setY()`, `.setZ()` methods).
  - `ball.position = new THREE.Vector3( x, y, z )`

There are a lot of other methods that `.position` handles as a `THREE.Vector3`. You may see the [list of methods](https://threejs.org/docs/index.html#Reference/Math/Vector3.set) at Three.js documentation.

### `.rotation`

> Used in: `MeshComponent`, `LightComponent`, `CameraComponent`

**rotation** is a [`THREE.Euler`](https://threejs.org/docs/index.html#Reference/Math/Euler) with _x, y and z_ values and has almost same methods as a `.position`. It defines a rotation regarding object position.

#### Modifying values and methods

Commonly used:

  - `ball.rotation.set( x, y, z )`
  - `ball.rotation.setX( x )`, (`.setX()`, `.setY()`, `.setZ()` methods).
  - `ball.rotation = new THREE.Euler( x, y, z )`

See [list of THREE.Euler methods](https://threejs.org/docs/index.html#Reference/Math/Euler.set) at Three.js documentation.

> `.rotation` will be converted to a _quaternion_ and applied to it's physics object linked to the component. (Only if you use a Physics version [Todo: add link]).

## `.quaternion`

> Used in: `MeshComponent`, `LightComponent`, `CameraComponent`

**quaternion**, [`THREE.Quaternion`](https://threejs.org/docs/index.html#Reference/Math/Quaternion) is another way to rotate 3D object in space. It has _x, y, z and w_ values.

```js
// Convert euler to quaternion.
ball.quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
// Set values.
ball.quaternion.set(10, 20, 45, 60);

ball.quaternion.x // -> 10
ball.quaternion.y // -> 20
ball.quaternion.z // -> 45
ball.quaternion.w // -> 60
```

#### Modifying values and methods

Commonly used:

  - `ball.quaternion.set( x, y, z, w )`
  - `ball.quaternion.setX( x )`, (`.setX()`, `.setY()`, `.setZ()`, `.setW()` methods).
  - `ball.quaternion = new THREE.Quaternion( x, y, z, w )`
  - `ball.quaternion.setFromEuler(new THREE.Euler( x, y, z ))`

See [list of THREE.Quaternion methods](https://threejs.org/docs/index.html#Reference/Math/Quaternion.set) at Three.js documentation.

## `.scale`

> Used in: `MeshComponent`

**scale**, [`THREE.Vector3`](https://threejs.org/docs/index.html#Reference/Math/Vector3) is a vector that defines mesh scale.

```js
ball.scale.set(2, 2, 2)

ball.scale.x // -> 2
ball.scale.y // -> 2
ball.scale.z // -> 2
```

#### Modifying values and methods

Commonly used:

  - `ball.scale.set( x, y, z )`
  - `ball.scale.setX( x )`, (`.setX()`, `.setY()`, `.setZ()` methods).
  - `ball.scale= new THREE.Vector3( x, y, z )`

See [list of THREE.Vector3 methods](https://threejs.org/docs/index.html#Reference/Math/Vector3.set) at Three.js documentation.

[> Usage with webpack](Usage with webpack.html)
