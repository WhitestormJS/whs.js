
<a href="https://discord.gg/frNetGE"><img width="100%" src="http://i.imgur.com/Dr9m7Xj.jpg"></a>

[![XO code style][xo]][xo-url]
[![Three][three]][three-url]
[![NPM Version][npm]][npm-url]
[![Build Status][travis]][travis-url]
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Coverage Status][coverage]][coverage-url]
[![Known Vulnerabilities][snyk]][snyk-url]
[![Discord][discord]][discord-url]


[![OpenCollective Backers][backer-badge]][backer-url]
[![OpenCollective Sponsors][sponsor-badge]][sponsor-url]

[xo]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
[xo-url]: https://github.com/sindresorhus/xo

[three]: https://img.shields.io/badge/three-r84-blue.svg?style=flat-square
[three-url]: https://github.com/mrdoob/three.js/

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

### Contributors welcome! :P [Contact me](mailto:alexbuzin88@gmail.com)
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

    See [more about modules](https://medium.com/whitestormjs-framework/migrating-to-whitestormjs-v2-beta-module-system-2eeaeda08a80#.qqdn2mhct)

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

    Try with **physics** on [**Codepen**](http://codepen.io/sasha240100/pen/wgEXwN):

    <a href="http://codepen.io/sasha240100/pen/wgEXwN"><img src="http://i.imgur.com/AcsnqTs.png" height="50" /></a>


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
* :rocket: Speeds up 3D scene prototyping
* 🔌  **Component based scene graph**
* 💣 Simple integration of any **high performance physics** even with `Worker` (Multithreading)
* :dizzy: Automatization of rendering
* 🆕 **ES2015+ based**
* :large_blue_diamond: Extension system (modules)
* :package: [Webpack](https://whsjs.io/#/api/webpack) friendly
* ✔️ **Integrated [Three.js](https://threejs.org/) rendering engine**
* :revolving_hearts: Work with Whitestorm.js and Three.js at the same time

### WEBPACK

Use [whitestorm-app-boilerplate](https://github.com/WhitestormJS/whitestorm-app-boilerplate)

## Documentation

Documentation for beta is currently in progress. [Contact developers in discord chat](https://discord.gg/frNetGE)

## Basic application

Try on [**Codepen**](http://codepen.io/sasha240100/pen/JELBGX):

<a href="http://codepen.io/sasha240100/pen/JELBGX"><img src="http://i.imgur.com/AcsnqTs.png" height="50" /></a>

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

You can easily integrate Whitestorm.js with React using [react-whs](https://github.com/WhitestormJS/react-whs) tool!

```bash
$ npm install react react-whs --save
```

Try with **React** on [**Codepen**](http://codepen.io/sasha240100/pen/dNqKMd?editors=1010):

<a href="http://codepen.io/sasha240100/pen/dNqKMd?editors=1010"><img src="http://i.imgur.com/AcsnqTs.png" height="50" /></a>

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

<a href="https://opencollective.com/whitestormjs/backer/0/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/1/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/2/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/3/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/4/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/5/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/6/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/7/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/8/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/9/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/10/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/11/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/12/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/13/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/14/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/15/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/16/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/17/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/18/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/19/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/20/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/21/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/22/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/23/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/24/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/25/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/26/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/27/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/28/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/29/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/29/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/30/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/30/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/31/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/31/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/32/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/32/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/33/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/33/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/34/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/34/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/35/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/35/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/36/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/36/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/37/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/37/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/38/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/38/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/39/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/39/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/40/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/40/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/41/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/41/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/42/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/42/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/43/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/43/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/44/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/44/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/45/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/45/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/46/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/46/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/47/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/47/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/48/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/48/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/49/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/49/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/50/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/50/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/51/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/51/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/52/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/52/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/53/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/53/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/54/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/54/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/55/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/55/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/56/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/56/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/57/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/57/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/58/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/58/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/59/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/59/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/60/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/60/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/61/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/61/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/62/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/62/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/63/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/63/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/64/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/64/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/65/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/65/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/66/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/66/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/67/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/67/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/68/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/68/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/69/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/69/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/70/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/70/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/71/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/71/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/72/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/72/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/73/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/73/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/74/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/74/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/75/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/75/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/76/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/76/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/77/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/77/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/78/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/78/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/79/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/79/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/80/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/80/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/81/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/81/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/82/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/82/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/83/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/83/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/84/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/84/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/85/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/85/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/86/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/86/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/87/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/87/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/88/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/88/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/89/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/89/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/90/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/90/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/91/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/91/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/92/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/92/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/93/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/93/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/94/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/94/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/95/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/95/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/96/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/96/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/97/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/97/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/98/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/98/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/99/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/99/avatar.svg"></a>
<a href="https://opencollective.com/whitestormjs/backer/100/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/100/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on on our README on Github with a link to your website🔭.

[![Sponsors][sponsors-image]][support-url]

[statsjs]: https://github.com/WhitestormJS/whitestorm.js/tree/beta/modules/whs-module-statsjs
[statsjs-npm]: https://img.shields.io/npm/v/whs-module-statsjs.svg?style=flat-square

[datgui]: https://github.com/WhitestormJS/whitestorm.js/tree/beta/modules/whs-module-dat.gui
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
