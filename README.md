
<a href="https://discord.gg/frNetGE"><img width="100%" src="http://i.imgur.com/Dr9m7Xj.jpg"></a>

[![XO code style][xo]][xo-url]
[![NPM Version][npm]][npm-url]
[![Build Status][travis]][travis-url]
[![Coverage Status][coverage]][coverage-url]
[![Known Vulnerabilities][snyk]][snyk-url]
[![Discord][discord]][discord-url]
[![OpenCollective Backers][backer-badge]][backer-url]
[![OpenCollective Sponsors][sponsor-badge]][sponsor-url]

[xo]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
[xo-url]: https://github.com/sindresorhus/xo

[npm]: https://img.shields.io/npm/v/whs.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/whs

[travis]: https://img.shields.io/travis/WhitestormJS/whitestorm.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/WhitestormJS/whitestorm.js

[coverage]: https://img.shields.io/coveralls/WhitestormJS/whitestorm.js/beta.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/WhitestormJS/whitestorm.js?branch=beta

[snyk]: https://snyk.io/test/npm/whs/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/whs

[discord]: https://discordapp.com/api/guilds/238405369859145729/widget.png
[discord-url]: https://discord.gg/frNetGE

> **Framework for developing 3D web apps**

### [Development chat](https://discord.gg/frNetGE) - opens in discord app. Ask for help here;)
### [Support the project](https://opencollective.com/whitestormjs#support) - [Donate] buy developers a ☕

```bash
$ npm install --save whs
```

## [Showcases](https://whs-dev.surge.sh/examples/)

You can find lots of examples at [showcases](https://whs-dev.surge.sh/examples/).

<a href="https://whs-dev.surge.sh/examples/#basic/helloworld">
  <img alt="basic/helloworld" target="_blank" src="http://i.imgur.com/IRq5Hp4.gif" width="32%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#basic/model">
  <img alt="basic/model" target="_blank" src="http://i.imgur.com/RmTjjiA.gif" width="32%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#softbody/cloth3">
  <img alt="softbody/cloth3" target="_blank" src="http://i.imgur.com/BgHdX56.gif" width="32%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#post-processing/basic-glitch">
  <img alt="postprocessing/basic-glitch" target="_blank" src="http://i.imgur.com/ASUN7tR.gif" width="32%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#softbody/ropes">
  <img alt="softbody/ropes" target="_blank" src="http://i.imgur.com/wRFKfTM.gif" width="32%" />
</a>
<a href="https://whs-dev.surge.sh/examples/#design/saturn">
  <img alt="design/saturn" target="_blank" src="http://i.imgur.com/JZ5HryS.gif" width="32%" />
</a>

### Why?
* 🤔 Because making of even **a basic Three.js application requires at least ~20 lines of code** (see [this tutorial](https://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene))
  - **Three.js:** you will need to setup: _scene, renderer, camera_, make an `animate()` function before making the actual app.
  - **Whitestorm.js:** There are modules that helps you easily setup them:
  
    ```javascript
    const app = new WHS.App([
      new WHS.app.ElementModule(), // attach to DOM
      new WHS.app.SceneModule(), // creates THREE.Scene instance
      new WHS.app.CameraModule(), // creates PerspectiveCamera instance
      new WHS.app.RenderingModule() // creates WebGLRenderer instance
    ]);

    app.start(); // run animation
    ```

* 💣 **Adding physics is hard.**
  - **Three.js:** To make your app run with physics you need to make a second world with same 3d objects and apply their transform (position & rotation) to your rendered scene objects (`THREE.Scene` for example) in every frame.
  - **Whitestorm.js:** Can be done with modules in a few lines:
  
    ```javascript
    const app = new WHS.App([
      // Other modules...
      new PHYSICS.WorldModule()
    ]);

    const sphere = new WHS.Sphere({
      geometry: {
        radius: 3
      },

      modules: [
        new PHYSICS.SphereModule({
          mass: 10
        })
      ],

      material: new THREE.MeshBasicMaterial({color: 0xff0000}) // red material
    });

    app.start(); // run animation
    ```
    
    Use [physics-module-ammonext](https://github.com/WhitestormJS/physics-module-ammonext) as your physics module.

* 🔌 **Components & plugins**
  - **Three.js:** You can create meshes with geometry and material.
  - **Whitestorm.js:** You can create components with advanced custom functionality.
    
    ```javascript
    export class BasicComponent extends WHS.MeshComponent {
      build() {
        return new THREE.Mesh(
          new THREE.IcosahedronGeometry(3, 5),
          new THREE.MeshBasicMaterial({color: 0xffffff})
        )
      }

      randomize() { // Additional function
        this.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
      }
    }
    ```
  
  - See [Component system in interactive 3D of web](https://medium.com/@_alex_buzin/component-system-in-interactive-3d-of-web-18348eecf270#.lynivy4ut) article for more info.

-----

## Download

<a href="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/beta/build/whitestorm.js"><img src="http://i.imgur.com/qKJEb5t.png" height="40" /></a>

<a href="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/beta/build/whitestorm.compact.js"><img src="http://i.imgur.com/RY9kDFD.png" height="40" /></a>

## CDN

Proudly hosted by [cdnjs](https://cdnjs.com/):D (soon)


## Features

* 💎 **Simple in usage**
* Minimize 3D scene prototyping
* 🔌  **Component based scene graph**
* 💣 Simple integration of any **high performance physics** even with `Worker` (Multithreading)
* Automatization of rendering
* 🆕 **ES2015+ based**
* Extension system (modules)
* [Webpack](https://whsjs.io/#/api/webpack) friendly
* ✔️ **Integrated [Three.js](https://threejs.org/) rendering engine**
* Work with Whitestorm.js and Three.js at the same time

### WEBPACK

Use [whitestorm-app-boilerplate](https://github.com/WhitestormJS/whitestorm-app-boilerplate)

## Documentation

Documentation for beta is not yet released. [Contact developers in discord chat](https://discord.gg/frNetGE)

## Basic application

```javascript
const app = new WHS.App([
  new WHS.app.ElementModule(), // attach to DOM
  new WHS.app.SceneModule(), // creates THREE.Scene instance
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 0, -10)
  }), // creates PerspectiveCamera instance
  new WHS.app.RenderingModule(), // creates WebGLRenderer instance
  new WHS.controls.OrbitModule() // orbit controls
]);

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3
  },

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff, // White color.
  }),

  position: new THREE.Vector3(0, 1, 0) // x: 0, y: 1, z: 0
});

sphere.addTo(app);
console.log(sphere.native); // Logs THREE.Mesh of this component

app.start(); // run animation
```

# [React integration](https://github.com/WhitestormJS/react-whs)

You can easilty integrate Whitestorm.js with React using [react-whs](https://github.com/WhitestormJS/react-whs) tool! 

```bash
$ npm install react react-whs --save
```

**Example:**

```javascript

import React, {Component} from 'react';
import {App, Sphere} from 'react-whs';

export class Application extends Component {
  render() {
    return (
      <App modules={[
        new WHS.app.SceneModule(),
        new WHS.app.CameraModule({
          position: {
            z: 20
          }
        }),
        new WHS.app.RenderingModule(),
        new WHS.controls.OrbitModule()
      ]}>
        <Sphere
          geometry={[3, 32, 32]}
          material={new THREE.MeshBasicMaterial({color: 0xffffff})}
          key="1"
        />
      </App>
    )
  }
}
```

## Modules
### Devtools


|Name|Status|Description|
|:--:|:----:|:----------|
|[whs-module-statsjs][statsjs]|![statsjs-npm]|WhitestormJS module for JavaScript Performance Monitor ⚡⌛|
|[whs-module-dat.gui][datgui]|![datgui-npm]|User Interface for runtime editing properties 🔑🛠🔩|

### Physics


|Name|Status|Description|
|:--:|:----:|:----------|
|[physics-module-ammonext][physics-ammonext]|![physics-ammonext-npm]|Physics module based on [Ammo.js](https://github.com/kripken/ammo.js/)|

### Integrations


|Name|Status|Description|
|:--:|:----:|:----------|
|[react-whs][react-whs]|![react-whs-npm]|Integration with [ReactJS](https://facebook.github.io/react/)|

## Backers

Support us with a monthly donation and help us continue framework development🎉 and adding new features💡🎁.

[![Backers][backers-image]][support-url]

## Sponsors

Become a sponsor and get your logo on on our README on Github with a link to your website🔭. 

[![Sponsors][sponsors-image]][support-url]

[statsjs]: https://github.com/WhitestormJS/whs-module-statsjs
[statsjs-npm]: https://img.shields.io/npm/v/whs-module-statsjs.svg?style=flat-square

[datgui]: https://github.com/WhitestormJS/whs-module-dat.gui
[datgui-npm]: https://img.shields.io/npm/v/whs-module-dat.gui.svg?style=flat-square

[physics-ammonext]: https://github.com/WhitestormJS/physics-module-ammonext
[physics-ammonext-npm]: https://img.shields.io/npm/v/physics-module-ammonext.svg?style=flat-square

[react-whs]: https://github.com/WhitestormJS/react-whs
[react-whs-npm]: https://img.shields.io/npm/v/react-whs.svg?style=flat-square

[backer-url]: #backers
[backer-badge]: https://opencollective.com/whitestormjs/backers/badge.svg?color=blue
[support-url]: https://opencollective.com/whitestormjs#support
[sponsor-url]: #sponsors
[sponsor-badge]: https://opencollective.com/whitestormjs/sponsors/badge.svg?color=blue

[backers-image]: https://opencollective.com/whitestormjs/backers.svg
[sponsors-image]: https://opencollective.com/whitestormjs/sponsors.svg

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://alexbuzin.me/)
