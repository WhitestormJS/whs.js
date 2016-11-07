# [![logo](https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/dev/media/art/logo/big.png)](https://whsjs.io/)

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)
[![NPM Version](https://img.shields.io/npm/v/whitestormjs.svg?style=flat-square)](https://www.npmjs.com/package/whitestormjs)
[![Build Status](https://img.shields.io/travis/WhitestormJS/whitestorm.js.svg?style=flat-square)](https://travis-ci.org/WhitestormJS/whitestorm)
[![Dependency Status](https://dependencyci.com/github/WhitestormJS/whitestorm.js/badge?style=flat-square)](https://dependencyci.com/github/WhitestormJS/whitestorm.js)
[![Slack](https://whslack.herokuapp.com/badge.svg?style=flat-square)](https://whslack.herokuapp.com/)

> Framework for developing 3D web apps

## Features

* **Simple shape crafting** - We use a JSON-like structure for creating objects from inputted data and adding them to your 3D world.
* **Physics with WebWorkers** - We use the [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) library for calculating physics of 3D shapes with **WebWorkers technology** that allows for rendering and calculating physics in multiple threads.
* **Plugin system** - Framework supports *plugins & components* made by other users. You need to include them after whitestorm.js and follow provided instructions.
* **Automatization of rendering** - Our framework does rendering automatically and doesn't need a to be called. Functionality like the `resize` function can be called automatically by setting additional parameters such as `autoresize: true`.
* **ES6 Features** - Framework is written using the latest features of ECMAScript 6 and ECMAScript 7 (beta) features and compiled with [Babel](https://babeljs.io/).
* **Softbodies** - WhitestormJS is the only engine (except native `ammo.js`) that supports softbodies.

## Installation
### NODE

```bash
$ npm install --save whs
```

### WEBPACK

See [WhitestormJS/test-whitestorm-webpack](https://github.com/WhitestormJS/test-whitestorm-webpack) for more details.

## Documentation

Full documentation of guides and APIs are located at [here](http://whsjs.io/#/api).

## Usage

### Hello world

Basic white sphere that falls down.

```javascript
const world = new WHS.World({
    stats: "fps", // fps, ms, mb or false if not need.
    autoresize: "window",

    gravity: [0, 100, 0], // Physic gravity.

    camera: {
      position: {
        z: 50 // Move camera.
      }
    }
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xffffff, // White color.
    kind: 'basic' // THREE.MeshBasicMaterial
  },

  position: [0, 100, 0]
});

sphere.addTo(world);
console.log(sphere.native); // Returns THREE.Mesh of this object.

world.start(); // Start animations and physics simulation.
```

### Making a custom component

```javascript
import * as THREE from 'three';

// Basic component class.
import {Component} from 'whitestormjs/core/Component';
// Decorator for THREE.Mesh for component class.
import MeshComponent from 'whitestormjs/core/MeshComponent';
// Some utils that should help.
import {extend, loadMaterial} from 'whitestormjs/utils/index';

@MeshComponent
class BasicSphere extends Component {
  constructor(params = {}) {
    super(params, BasicSphere.defaults);

    extend(params, {
      myParameter: 10 // Default for myParameter. (Sphere radius)
    });

    if (params.build) { // params.build is "true" by default. (@MeshComponent)
      this.build(params);
      // Apply position & rotation, scale ...
      super.wrap();
    }
  }

  build(params = {}) {
    // Load THREE.Material from properties.
    const material = loadMaterial(params.material);

    return new Promise((resolve) => {
      this.native = new THREE.Mesh(
        new THREE.SphereGeometry(params.myParameter, 16, 16),
        material
      );

      resolve();
    });
  }

  clone() {
    return new Sphere({build: false}).copy(this);
  }
}

export {
  BasicSphere
};
```

## Playground!

[![playground](http://i.imgur.com/6EdMjm1.gif)](http://whsjs.io/playground/?example=saturn&dir=demo)

## Showcases

You can find lots of examples at [showcases](https://whs-dev.surge.sh/examples/).

### :space_invader:

* [Basic / Hello world](https://whs-dev.surge.sh/examples/#basic/helloworld)  (Basic "Hello world!" example.)
* [Basic / Model](https://whs-dev.surge.sh/examples/#basic/model)  (Basic model example.)
* [Basic / Debugging](https://whs-dev.surge.sh/examples/#basic/debugging)  (Object's debug example.)
* [Basic / Extending](https://whs-dev.surge.sh/examples/#basic/extending)  (Extending api example.)
* [Basic / Softbody](https://whs-dev.surge.sh/examples/#basic/softbody)  (Basic softbody implementation.)
* [Basic / Three.js](https://whs-dev.surge.sh/examples/#basic/threejs)  (Importing three.js scene to whitestormjs core.)

### :bowling:

* [Softbody / Cloth](https://whs-dev.surge.sh/examples/#basic/cloth)  (Example of softbody cloth.)
* [Softbody / Cloth 2](https://whs-dev.surge.sh/examples/#basic/cloth2)  (Example of softbody cloth 2.)
* [Softbody / Cloth 3](https://whs-dev.surge.sh/examples/#basic/cloth3)  (Example of softbody cloth 3.)
* [Constraints / DOF](https://whs-dev.surge.sh/examples/#constraints/dof)  (DOF Constraint.)
* [Constraints / Hinge](https://whs-dev.surge.sh/examples/#constraints/hinge)  (Hinge Constraint.)
* [Constraints / Point](https://whs-dev.surge.sh/examples/#constraints/point)  (Point Constraint.)
* [Constraints / Slider](https://whs-dev.surge.sh/examples/#constraints/slider)  (Point Slider.)
* [Physics / Dominos](https://whs-dev.surge.sh/examples/#physics/domino)  (Physics example with dominos.)
* [Physics / Filtering](https://whs-dev.surge.sh/examples/#physics/filtering)  (Filtering collision groups.)

### :gem:

* [Design / Saturn](http://192.241.128.187/current/examples/design/saturn/)  (Saturn planet example from: http://codepen.io/Yakudoo/pen/qbygaJ)
* [Design / Easter](http://192.241.128.187/current/examples/design/easter/)  (Easter rabbit with easter eggs.)
* [Design / Points](http://192.241.128.187/current/examples/design/points/)  (Using WHS.Points to make a point cloud shaped in cube.)

### :snowboarder:

* [FPS / Shooter](https://whs-dev.surge.sh/examples/#fps/shooter/)  (First person example)

### :rocket:

* [Performance / Sticks](http://192.241.128.187/current/examples/performance/sticks/)  (Collisions performance of 320 basic box objects.)
* [Performance / Softbodies](http://192.241.128.187/current/examples/performance/softbodies/)  (Collisions performance of 30 softbody icosahedron objects.)

## Contributors

[![Author](http://wsbadge.herokuapp.com/badge/Author-Alexander%20Buzin-orange.svg?style=flat-square)](https://github.com/sasha240100)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-jackdalton-green.svg?style=flat-square)](https://github.com/jackdalton)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-Noctisdark-green.svg?style=flat-square)](https://github.com/noctisdark)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-bdirl-green.svg?style=flat-square)](https://github.com/bdirl)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-preco21-green.svg?style=flat-square)](https://github.com/preco21)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-yeliex-green.svg?style=flat-square)](https://github.com/yeliex)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-t4r0-green.svg?style=flat-square)](https://github.com/t4r0)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-electron0zero-green.svg?style=flat-square)](https://github.com/electron0zero)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-typedef42-green.svg?style=flat-square)](https://github.com/typedef42)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://alexbuzin.me/)
