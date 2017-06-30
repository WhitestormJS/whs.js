<img src="http://i.imgur.com/EgdbmwO.png" width="40%"></img>


[![](https://img.shields.io/github/release/WhitestormJS/whitestorm.js.svg?style=flat-square)](https://github.com/WhitestormJS/whitestorm.js/releases)
[![Three][three]][three-url]
[![Build Status][travis]][travis-url]

- [Documentation](http://whsjs.io/)
- [Examples](https://whs-dev.surge.sh/examples/)

Community chat. [Join us!][discord-url]

[![Discord][discord]][discord-url]

### Table of content

- [Basic setup](#basic-setup)
   - [npm](#npm)
- [Featured projects](#featured-projects)
- [Features](#features)
- [Why?](/.github/WHY.md)


### Basic setup

```bash
# Install npm version
$ npm install whs --save-dev
```

Download the [minified library](https://raw.githubusercontent.com/WhitestormJS/whs.js/dev/build/whs.min.js) or link the one from [CDN](https://cdnjs.com/libraries/whitestorm.js)

```html
<script src="js/three.min.js"></script>
<script src="js/whs.min.js"></script>
```

The code below makes a `WHS.App` instance which handles all your [modules]() and components for better work with `WebGL`. This one creates a _scene_, _camera_ and _renderer_ - we add the following modules to the App.

```js
const app = new WHS.App([
  new WHS.ElementModule(), // Apply to DOM.
  new WHS.SceneModule(), // Create a new THREE.Scene and set it to app.

  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({ // Apply a camera.
    position: new Vector3(0, 0, 50)
  })),

  new WHS.RenderingModule({bgColor: 0x162129}), // Apply THREE.WebGLRenderer
  new WHS.ResizeModule() // Make it resizable.
]);

app.start(); // Run app.
```

<a href="http://codepen.io/sasha240100/pen/JELBGX"><img src="http://blog.codepen.io/wp-content/uploads/2012/06/TryItOn-CodePen.png" height="50" /></a>


#### NPM

```bash
# Install npm version
$ npm install whs
```

[![NPM Version][npm]][npm-url]

### Featured projects

<a href="http://theroguepixel.com/">
  <img src="http://whsjs.io/images/showcase/roguepixel.jpg" alt="http://theroguepixel.com/" width="30%" />
</a>

<a href="http://supertiny.agency/">
  <img src="http://whsjs.io/images/showcase/supertiny.jpg" alt="http://supertiny.agency/" width="30%" />
</a>

<a href="https://alexbuzin.me/">
  <img src="http://whsjs.io/images/showcase/alexbuzinme.jpg" alt="https://alexbuzin.me/" width="30%" />
</a>

<a href="https://spatial.100shapes.com/">
  <img src="http://whsjs.io/images/showcase/spatial.jpg" alt="https://spatial.100shapes.com/" width="30%" />
</a>

<a href="http://plateux.space/">
  <img src="http://whsjs.io/images/showcase/plateux.jpg" alt="http://plateux.space/" width="30%" />
</a>


### Features

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


[xo]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
[xo-url]: https://github.com/sindresorhus/xo

[three]: https://img.shields.io/badge/three-r86-blue.svg?style=flat-square
[three-url]: https://github.com/mrdoob/three.js/

[npm]: https://img.shields.io/npm/v/whs.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/whs

[travis]: https://img.shields.io/travis/WhitestormJS/whitestorm.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/WhitestormJS/whitestorm.js?branch=beta

[discord]: https://discordapp.com/api/guilds/238405369859145729/widget.png
[discord-url]: https://discord.gg/frNetGE
