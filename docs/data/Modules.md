# Modules

Modules provide easy integration with components. They can make a lot of complex things much simpler to other developers (such as adding 3D physics).

### Articles:

- [Migrating to WhitestormJS v2 beta. Module system](https://hackernoon.com/migrating-to-whitestormjs-v2-beta-module-system-2eeaeda08a80)

## Simple module

Let's create a simple module that will add `.alertRandom()` method to component, in which this module is used.

```js
export default class SimpleModule {
  integrate() {
    this.alertRandom = function () {
      alert(Math.random());
    }
  }
}
```

```js
import SimpleModule from './SimpleModule';

const sphere = new WHS.Sphere({
  modules: [
    new SimpleModule()
  ]
});

sphere.alertRandom(); // will alert a random number.
```

## Advanced module

This example demonstrates the power of using modules.

```js
export default class AdvancedModule {
  constructor(params = {}) {
    this.params = Object.assign({
      color: 0xff0000 // red
    }, params); // Polyfill params with default values
  }

  bridge = {
    material(inputMaterial, self) { // self - module scope
      const outputMaterial = inputMaterial.clone(); // You know, it's not required

      outputMaterial.color.setHex(self.params.color);

      return outputMaterial;
    }
  }

  integrate(self) { // self - module scope
    this.checkForColor = function () {
      if (this.material.color.getHex() === self.params.color) {
        alert("color is the same");
      } else {
        alert("???");
      }
    }
  }

  manager(manager) {
    manager.set('usedColor', this.params.color); // other modules can access this
  }
}
```

```js
import {MeshComponent} from WHS;
import AdvancedModule from './AdvancedModule';

class MyComponent extends MeshComponent {
  build() {
    return new THREE.Mesh(
      new THREE.SphereGeometry(),
      this.applyBridge({material: new THREE.MeshBasicMaterial()}).material
    )
  }
}

const myInstance = new MyComponent({
  modules: [
    new AdvancedModule({color: 0x0000ff}) // blue color
  ]
});

myInstance.checkForColor(); // alerts "color is the same"
```

## API

### `constructor()`

Used to handle input parameters that define module's behavior


### `.integrate(self)`

In this method of any module, `this` is replaced with component's instance.
`integrate()` is executed once when component instance is created with `new` keyword.

`self` - module scope.


### `.postIntegrate(self)`

Same as `.integrate(self)`, but is invoked after `.build()`, that means you can use `.defer(() => {})` inside it.
Will be useful for working with models (`WHS.Importer`) and `.native` objects.

### `.manager(manager)`

Allows components communicate with each other.
`manager` - is a ModuleManager instance provided by Component or App, where module is used

### `.bridge`

- Object that handles functions called from component's code with `.applyBridge()` method.
- Used to overwrite some parts of component.
- Functions will be called only if specific component provides API for this "bridge" (using `.applyBridge({bridgeName: inputData}).bridgeName`).

## Module LifeCycle

Module methods are executed in this order:
1. `constructor()`
2. if ModuleManager is provided by component & .manager() exists -> `.manager(manager)`
3. if .integrate() exists ->  `.integrate()`
4. bridges are executed if such API is provided by components.

> Only `constructor()` is executed once when you create a module instance. All other methods are executed once per component, where they are used.
>
> **Therefore, you can use one module instance per multiple components in performance reasons (Recommended)**

## Bridges provided by included components (WHS.Sphere, ...)

| Bridge name | Value provided |
| ----------- | -------------- |
| `geometry`  | `THREE.Geometry` instance |
| `material`  | `THREE.Material` instance |
| `mesh`      | `THREE.Mesh` instance |


[> Animation Clips](Animation Clips.html)
