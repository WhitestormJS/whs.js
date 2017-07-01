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
- [Donate](#donate)
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

<a href="http://plateaux.space/">
  <img src="http://whsjs.io/images/showcase/plateux.jpg" alt="http://plateaux.space/" width="30%" />
</a>


### Features

* 💎 **Simple in usage**
* :rocket: Speeds up 3D scene prototyping
* 🔌  **Component based scene graph**
* 💣 Simple integration of any **high performance physics** even with `Worker` (Multithreading)
* :dizzy: Automatization of rendering
* 🆕 **ES2015+ based**
* :large_blue_diamond: Extension system (modules)
* :package: [Webpack](https://whsjs.io/Usage%20with%20webpack.html) friendly
* ✔️ **Integrated [Three.js](https://threejs.org/) rendering engine**
* :revolving_hearts: Work with whs.js and Three.js at the same time

### Donate

[![OpenCollective Backers][backer-badge]][backer-url]
[![OpenCollective Sponsors][sponsor-badge]][sponsor-url]

#### Backers

Support us with a monthly donation and help us continue framework development🎉 and adding new features💡🎁.


<a href="https://opencollective.com/whitestormjs/backer/0/website" target="_blank"><img src="https://opencollective.com/whitestormjs/backer/0/avatar.svg"></a>
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

[backer-url]: #backers
[backer-badge]: https://opencollective.com/whitestormjs/backers/badge.svg?color=blue
[support-url]: https://opencollective.com/whitestormjs#support
[sponsor-url]: #sponsors
[sponsor-badge]: https://opencollective.com/whitestormjs/sponsors/badge.svg?color=blue
