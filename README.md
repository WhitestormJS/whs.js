<img src="http://i.imgur.com/EgdbmwO.png" width="40%"></img>


[![](https://img.shields.io/github/release/WhitestormJS/whitestorm.js.svg?style=flat-square)](https://github.com/WhitestormJS/whitestorm.js/releases)
[![Three][three]][three-url]
[![Build Status][travis]][travis-url]


- [Documentation](http://whs.io/)
- [Examples](https://whs-dev.surge.sh/examples/)
- [Donate / OpenCollective](https://opencollective.com/whitestormjs)

Community chat. [Join us!][discord-url]

[![Discord][discord]][discord-url]

### Table of content

- [Basic setup](#basic-setup)
   - [npm](#npm)
- [Featured projects](#featured-projects)
- [Features](#features)
- [Donate](#donate)
- [Why?](/.github/WHY.md)

##### New releases

> `whs` is currently at v2 major version. We don't have clear plans for v3 yet. So v2 will probably remain the main stable version until at least 2018.

> We try to publish **patch releases every 20 days** or even more often.

> We try to publish **minor update releases every 60 days** or even more often depending on the amount of features that sometimes get added in a very small period of time. We want the community to profit from new modules, components and feature enhancements as soon as they are implemented.


### Basic setup

Download the [minified library](https://raw.githubusercontent.com/WhitestormJS/whs.js/dev/build/whs.min.js) or link the one from [CDN](https://cdnjs.com/libraries/whitestorm.js)

```html
<script src="js/three.min.js"></script>
<script src="js/whs.min.js"></script>
```

The code below makes a `WHS.App` instance which handles all your [modules](modules) and components for better work with `WebGL`. This one creates a _scene_, _camera_ and _renderer_ - we add the following modules to the App.

```js
const app = new WHS.App([
  new WHS.ElementModule(), // Apply to DOM.
  new WHS.SceneModule(), // Create a new THREE.Scene and set it to app.

  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({ // Apply a camera.
    position: new THREE.Vector3(0, 0, 50)
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

<a href="http://abdaily.surge.sh/4/">
  <img src="http://whs.io/images/showcase/daily4.png" alt="http://abdaily.surge.sh/4/" width="30%" />
</a>

<a href="http://abdaily.surge.sh/3/">
  <img src="http://whs.io/images/showcase/daily3.png" alt="http://abdaily.surge.sh/3/" width="30%" />
</a>

<a href="http://abdaily.surge.sh/2/">
  <img src="http://whs.io/images/showcase/daily2.png" alt="http://abdaily.surge.sh/2/" width="30%" />
</a>

<a href="http://abdaily.surge.sh/1/">
  <img src="http://whs.io/images/showcase/daily1.png" alt="http://abdaily.surge.sh/1/" width="30%" />
</a>

<a href="http://theroguepixel.com/">
  <img src="http://whs.io/images/showcase/roguepixel.jpg" alt="http://theroguepixel.com/" width="30%" />
</a>

<a href="http://supertiny.agency/">
  <img src="http://whs.io/images/showcase/supertiny.jpg" alt="http://supertiny.agency/" width="30%" />
</a>

<a href="https://alexbuzin.me/">
  <img src="http://whs.io/images/showcase/alexbuzinme.jpg" alt="https://alexbuzin.me/" width="30%" />
</a>

<a href="https://spatial.100shapes.com/">
  <img src="http://whs.io/images/showcase/spatial.jpg" alt="https://spatial.100shapes.com/" width="30%" />
</a>

<a href="http://plateaux.space/">
  <img src="http://whs.io/images/showcase/plateux.jpg" alt="http://plateaux.space/" width="30%" />
</a>


### Features

* 💎 **Simple in usage**
* :rocket: Speeds up 3D scene prototyping
* 🔌  **Component based scene graph**
* 💣 Simple integration of any **high performance physics** even with `Worker` (Multithreading)
* :dizzy: Automatization of rendering
* 🆕 **ES2015+ based**
* :large_blue_diamond: Extension system (modules)
* :package: [Webpack](https://whs.io/Usage%20with%20webpack.html) friendly
* ✔️ **Integrated [Three.js](https://threejs.org/) rendering engine**
* :revolving_hearts: Work with whs.js and Three.js at the same time

### External Modules

|Name|Status|Description|
|:--:|:----:|:----------|
|[physics-module-ammonext][physics-ammonext]|![physics-ammonext-npm]|Physics module based on [Ammo.js](https://github.com/kripken/ammo.js/)|

[physics-ammonext]: https://github.com/WhitestormJS/physics-module-ammonext
[physics-ammonext-npm]: https://img.shields.io/npm/v/physics-module-ammonext.svg?style=flat-square

### Donate

[![OpenCollective Backers][backer-badge]][backer-url]
[![OpenCollective Sponsors][sponsor-badge]][sponsor-url]

#### Backers

Support us with a monthly donation and help us continue framework development🎉 and adding new features💡🎁.


<a href="https://opencollective.com/whitestormjs/backer/0/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/0/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/1/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/1/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/2/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/2/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/3/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/3/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/4/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/4/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/5/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/5/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/6/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/6/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/7/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/7/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/8/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/8/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/9/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/9/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/10/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/10/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/11/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/11/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/12/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/12/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/13/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/13/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/14/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/14/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/15/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/15/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/16/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/16/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/17/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/17/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/18/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/18/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/19/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/19/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/20/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/20/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/21/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/21/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/22/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/22/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/23/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/23/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/24/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/24/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/25/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/25/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/26/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/26/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/27/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/27/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/28/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/28/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/29/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/29/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/30/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/30/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/31/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/31/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/32/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/32/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/33/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/33/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/34/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/34/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/35/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/35/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/36/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/36/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/37/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/37/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/38/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/38/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/39/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/39/avatar"></a>
<a href="https://opencollective.com/whitestormjs/backer/40/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/40/avatar"></a>

[xo]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square
[xo-url]: https://github.com/sindresorhus/xo

[three]: https://img.shields.io/badge/three-r86-blue.svg?style=flat-square
[three-url]: https://github.com/mrdoob/three.js/

[npm]: https://img.shields.io/npm/v/whs.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/whs

[travis]: https://img.shields.io/travis/WhitestormJS/whs.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/WhitestormJS/whs.js?branch=develop

[discord]: https://discordapp.com/api/guilds/238405369859145729/widget.png
[discord-url]: https://discord.gg/frNetGE

[backer-url]: https://opencollective.com/whitestormjs
[backer-badge]: https://opencollective.com/whitestormjs/backers/badge.svg?color=blue
[support-url]: https://opencollective.com/whitestormjs#support
[sponsor-url]: https://opencollective.com/whitestormjs
[sponsor-badge]: https://opencollective.com/whitestormjs/sponsors/badge.svg?color=blue
