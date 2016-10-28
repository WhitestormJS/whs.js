

<p align="center"><img src="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/media/art/logo/big.png"></p>


<p align="center">
    <a href="https://travis-ci.org/WhitestormJS/whitestorm.js" align="center"><img src="http://wsbadge.herokuapp.com/travis/WhitestormJS/whitestorm.js.svg?style=flat-square"></a>&nbsp;&nbsp;
    <a href="https://www.npmjs.com/package/whitestormjs"><img src="http://wsbadge.herokuapp.com/npm/v/whitestormjs.svg?style=flat-square"></a>&nbsp;&nbsp;          
    <a href="https://github.com/WhitestormJS/whitestorm.js"><img src="http://wsbadge.herokuapp.com/bower/v/whitestormjs.svg?style=flat-square"></a>&nbsp;&nbsp;
    <a href="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/LICENSE" alt="License"><img src="http://wsbadge.herokuapp.com/github/license/WhitestormJS/whitestorm.js.svg?style=flat-square"></a>&nbsp;&nbsp;
    <a href="https://whslack.herokuapp.com/"><img src="https://whslack.herokuapp.com/badge.svg?style=flat-square"></a>


    <p align="center"><i><b>Framework for developing 3D web apps. <a href="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/cece6dacfbbc7ee158ca86b782521da65c44c6e7/build/whitestorm.js" download>Physics version</a><sup>[2.86 Mb]</sup> | <a href="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/dev/build/whitestorm.light.js" download>Light version</a><sup>[1.00 Mb]</sup>(no physics engine).</b></i></p>
    <p align="center"><b>*</b>Made <b>by people</b> who want to create <b>awesome</b> browser games</p>
</p>

<br>

------

## PLAYGROUND :rocket:
<a href="http://ow.ly/J4Tw302obGz"><img src="http://i.imgur.com/6EdMjm1.gif"></a>

## GAME EXAMPLE :video_game:
<p align="center">
<a href="http://whsjs.io/StreetBasketballGame/" target="_blank"><img src="https://camo.githubusercontent.com/e11edd02f96c306bf5b929c65d75f552d072d61c/687474703a2f2f692e696d6775722e636f6d2f51445a636141532e706e67"></a>
</p>

## INSTALLATION &#10540; USAGE

#### NODE

```bash
npm install whitestormjs
```

#### BOWER

```bash
bower install whitestormjs
```

#### BROWSER

Include a script tag linking the [WhitestormJS](https://cdn.jsdelivr.net/whitestormjs/latest/whitestorm.min.js) library in your `head` or after your `body`:

```html
<script src="{path_to_lib}/whitestorm.js"></script>
```

After adding the library, you can configure your app.

#### WEBPACK

See [WhitestormJS/test-whitestorm-webpack](https://github.com/WhitestormJS/test-whitestorm-webpack) for more details.

## DEVELOPING AN APP/GAME

```javascript
const world = new WHS.World({
    stats: "fps", // fps, ms, mb or false if not need.
    autoresize: true,

    gravity: { // Physic gravity.
        x: 0,
        y: -100,
        z: 0
    },
    
    camera: {
      z: 50 // Move camera.
    }
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
});

sphere.addTo(world);
sphere.getNative(); // Returns THREE.Mesh of this object.

world.start(); // Start animations and physics simulation.
```

## DEVELOPING A COMPONENT

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

## FEATURES

* **Simple shape crafting** — We use a JSON-like structure for creating objects from inputted data and adding them to your 3D world.

* **Physics with WebWorkers** — We use the [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) library for calculating physics of 3D shapes with **WebWorkers technology** that allows for rendering and calculating physics in multiple threads.

* **Plugin system** — Our framework supports *plugins & components* made by other users. You need to include them after whitestorm.js and follow provided instructions.

* **Automatization of rendering** — Our framework does rendering automatically and doesn't need a to be called. Functionality like the `resize` function can be called automatically by setting additional parameters such as `autoresize: true`.

* **ES6 Features** - Our framework is written using the latest features of ECMAScript 6 and ECMAScript 7 (beta) features and compiled with [Babel](https://babeljs.io/).

* **Softbodies** - WhitestormJS is the only engine (except native ammo.js) that supports softbodies.


<br>

## [Examples](http://192.241.128.187/current/examples/):

#### :space_invader: BASIC:
 * [Basic / Hello world](http://192.241.128.187/current/examples/basic/helloworld/)  (Basic "Hello world!" example.)
 * [Basic / Model](http://192.241.128.187/current/examples/basic/model/)  (Basic model example.)
 * [Basic / Debugging](http://192.241.128.187/current/examples/basic/debugging/)  (Object's debug example.)
 * [Basic / Extending API](http://192.241.128.187/current/examples/basic/extending/)  (Extending api example.)
 * [Basic / Softbody](http://192.241.128.187/current/examples/basic/softbody/)  (Basic softbody implementation.)
 * [Basic / Three.js](http://192.241.128.187/current/examples/basic/threejs/)  (Importing three.js scene to whitestormjs core.)
 * [Basic / Cloth](http://192.241.128.187/current/examples/basic/cloth/)  (Example of softbody cloth.)
 * [Basic / Cloth 2](http://192.241.128.187/current/examples/basic/cloth2/)  (Example of softbody cloth 2.)
 * [Basic / Cloth 3](http://192.241.128.187/current/examples/basic/cloth3/)  (Example of softbody cloth 3.)

#### :gem: DESIGN:
 * [Design / Saturn](http://192.241.128.187/current/examples/design/saturn/)  (Saturn planet example from: http://codepen.io/Yakudoo/pen/qbygaJ)
 * [Design / Easter](http://192.241.128.187/current/examples/design/easter/)  (Easter rabbit with easter eggs.)
 * [Design / Points](http://192.241.128.187/current/examples/design/points/)  (Using WHS.Points to make a point cloud shaped in cube.)

#### :snowboarder: FIRST-PERSON:
 * [FPS / Shooter](http://192.241.128.187/current/examples/fps/shooter/)  (First person example with Wagner effects and terrain. + fog) [TODO]
 * [FPS / Fog](http://192.241.128.187/current/examples/fps/fog/)  (First person game with animated objects) [TODO]

#### :bowling: PHYSICS:
 * [Physics / Dominos](http://192.241.128.187/current/examples/physics/domino/)  (Physics example with dominos.)

#### :rocket: PERFORMANCE:
 * [Performance / Sticks](http://192.241.128.187/current/examples/performance/sticks/)  (Collisions performance of 320 basic box objects.)
 * [Performance / Softbodies](http://192.241.128.187/current/examples/performance/softbodies/)  (Collisions performance of 30 softbody icosahedron objects.)

----

#### :chart_with_upwards_trend: [Changelog](https://github.com/WhitestormJS/whitestorm.js/blob/master/.github/CHANGELOG.md) | :book: [Documentation](http://whsjs.io/) | :video_game: [Playground](http://whsjs.io/playground/)

----

## [Contributors](https://github.com/WhitestormJS/whitestorm.js/graphs/contributors):
[![Author](http://wsbadge.herokuapp.com/badge/Author-Alexander%20Buzin-red.svg)](https://github.com/sasha240100)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-jackdalton-blue.svg)](https://github.com/jackdalton)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-Noctisdark-blue.svg)](https://github.com/noctisdark)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-bdirl-blue.svg)](https://github.com/bdirl)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-preco21-blue.svg)](https://github.com/preco21)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-yeliex-blue.svg)](https://github.com/yeliex)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-t4r0-blue.svg)](https://github.com/t4r0)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-electron0zero-blue.svg)](https://github.com/electron0zero)
[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-typedef42-blue.svg)](https://github.com/typedef42)

<br>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://alexbuzin.me/)
