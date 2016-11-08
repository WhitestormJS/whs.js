# [![logo](https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/media/art/logo/big.png)](https://whsjs.io/)

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)
[![NPM Version](https://img.shields.io/npm/v/whitestormjs.svg?style=flat-square)](https://www.npmjs.com/package/whitestormjs)
[![Build Status](https://img.shields.io/travis/WhitestormJS/whitestorm.js.svg?style=flat-square)](https://travis-ci.org/WhitestormJS/whitestorm)
[![Dependency Status](https://dependencyci.com/github/WhitestormJS/whitestorm.js/badge?style=flat-square)](https://dependencyci.com/github/WhitestormJS/whitestorm.js)
[![Discord](https://img.shields.io/badge/discord-WhitestormJS-738bd7.svg?style=flat-square)](https://discord.gg/frNetGE)

> Framework for developing 3D web apps

## Features

* **Simple shape crafting**
* **Physics with WebWorkers**
* **Automatization of rendering**
* **Plugin system**
* **Softbodies**

## Install

```bash
$ npm install --save whs
```

See [WhitestormJS/test-whitestorm-webpack](https://github.com/WhitestormJS/test-whitestorm-webpack) for more details.

## Documentation

Full documentation of guides and APIs are located at [here](http://whsjs.io/).

## Usage

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

## Playground!

[![playground](http://i.imgur.com/6EdMjm1.gif)](http://whsjs.io/playground/?example=saturn&dir=demo)

## Showcases

You can find lots of examples at [showcases](https://whs-dev.surge.sh/examples/).

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
