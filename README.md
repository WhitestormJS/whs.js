# [![logo](https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/dev/media/art/logo/big-inverted.png)](https://whsjs.io/)

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)
[![NPM Version](https://img.shields.io/npm/v/whs.svg?style=flat-square)](https://www.npmjs.com/package/whs)
[![Build Status](https://img.shields.io/travis/WhitestormJS/whitestorm.js.svg?style=flat-square)](https://travis-ci.org/WhitestormJS/whitestorm.js)
[![Known Vulnerabilities](https://snyk.io/test/npm/whs/badge.svg?style=flat-square)](https://snyk.io/test/npm/whs)
[![Discord](https://discordapp.com/api/guilds/238405369859145729/widget.png)](https://discord.gg/frNetGE)

> **Framework for developing 3D web apps**

## [Showcases](https://whs-dev.surge.sh/examples/)

You can find lots of examples at [showcases](https://whs-dev.surge.sh/examples/).

<a href="https://whs-dev.surge.sh/examples/#basic/helloworld">
  <img alt="basic/helloworld" target="_blank" src="http://i.imgur.com/IRq5Hp4.gif" width="33%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#basic/model">
  <img alt="basic/model" target="_blank" src="http://i.imgur.com/RmTjjiA.gif" width="33%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#softbody/cloth3">
  <img alt="softbody/cloth3" target="_blank" src="http://i.imgur.com/BgHdX56.gif" width="33%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#post-processing/basic-glitch">
  <img alt="postprocessing/basic-glitch" target="_blank" src="http://i.imgur.com/ASUN7tR.gif" width="33%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#softbody/ropes">
  <img alt="softbody/ropes" target="_blank" src="http://i.imgur.com/wRFKfTM.gif" width="33%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#design/saturn">
  <img alt="design/saturn" target="_blank" src="http://i.imgur.com/JZ5HryS.gif" width="33%" />
</a>

### Why?
* 🤔 Because making of even **a basic Three.js application requires at least ~20 lines of code** (see [this tutorial](https://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene))
  - **Native three.js:** you will need to setup: _scene, renderer, camera_, make an `animate()` function before making the actual app.
  - **Whitestorm.js:** all those values are filled with defaults, you just need to define your own values **only if they differs from defaults**.

* 💣 **Adding physics is hard.**
  - **Other frameworks:** To make your app run with physics you need to make a second world with same 3d objects and apply their transform (position & rotation) to your rendered scene objects (`THREE.Scene` for example) in every frame.
  - **Whitestorm.js:** All this can be done **automatically**.

* 🔌 **Components & plugins**
  - **Other:** `Unknown yet`.
  - **Whitestorm.js:** It provides ability to create your own components using framework's tools. (**You can add a component** like `WHS.Box` or `WHS.PointLight` but for creating a _terrain (`WHS.Terrain`) / aquarium (`WHS.Aquarium`) / car (`WHS.Car`) / any other_ with specific merhods and scripts.
  - See [Component system in interactive 3D of web](https://medium.com/@_alex_buzin/component-system-in-interactive-3d-of-web-18348eecf270#.lynivy4ut) article for more info.

-----


## Features

* 💎 **Simple in usage**
* Minimize 3D scene prototyping
* 🔌  **Component based scene graph**
* 💣 Integrated **high performance physics** with `Worker` (Multithreading)
* Automatization of rendering
* Enhanced **softbodies**
* 🆕 **ES2015+ based**
* Extension system (plugins)
* Dynamic geometry update
* [asm.js](http://asmjs.org/) acceleration
* [Webpack](https://whsjs.io/#/api/webpack) friendly
* ✔️ **Integrated [Three.js](https://threejs.org/) rendering engine**
* Work with Whitestorm.js and Three.js at the same time

## Installation
### NODE

```bash
$ npm install --save whs
```

### WEBPACK

See [WhitestormJS/test-whitestorm-webpack](https://github.com/WhitestormJS/test-whitestorm-webpack) for more details.

## Documentation

Full documentation of guides and APIs are located at [here](http://whsjs.io/).

## Usage

```javascript
const world = new WHS.World({
    stats: "fps", // fps, ms, mb or false if not need.
    autoresize: "window",

    gravity: [0, -100, 0], // Physic gravity.

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

  position: [0, 10, 0]
});

sphere.addTo(world);
console.log(sphere.native); // Returns THREE.Mesh of this object.

world.start(); // Start animations and physics simulation.
```

## Playground!

[![playground](http://i.imgur.com/6EdMjm1.gif)](http://whsjs.io/playground/)


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
