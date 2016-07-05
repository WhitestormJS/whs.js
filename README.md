

<p align="center"><img src="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/media/art/logo/big-inverse.png"></p>

<p align="center">
    <a href="https://travis-ci.org/WhitestormJS/whitestorm.js" align="center">
        <img src="https://travis-ci.org/WhitestormJS/whitestorm.js.svg">
    </a>&nbsp;&nbsp;
    <a href="https://www.npmjs.com/package/whitestormjs"><img src="http://wsbadge.herokuapp.com/npm/v/whitestormjs.svg"></a>&nbsp;&nbsp;          
    <a href="https://github.com/WhitestormJS/whitestorm.js"><img src="http://wsbadge.herokuapp.com/bower/v/whitestormjs.svg"></a>&nbsp;&nbsp;
    <a href="https://whslack.herokuapp.com/"><img src="https://whslack.herokuapp.com/badge.svg"></a>
   .<a href="http://baikal.io/sasha240100/whitestorm-js"><img alt="Baikal" src="http://baikal.io/badges/sasha240100/whitestorm-js"></a>
    <br>

    <p align="center"><i><b>Framework for developing 3D web apps with physics.</b></i></p>
</p>

<br>

------

## Features

* **Simple shape crafting** — We use JSON-like structure for creating objects by inputed data and adding them to 3d world.

* **Physics with WebWorkers** — It uses [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) library for calculating physics of 3D shapes with **WebWorkers technology** that allows to make rendering an calculating physics in multiple threads.

* **Plugin system** — Framework supports *plugins & components* made by other users. You need to include them after whitestorm.js and follow provided instructions.

* **Automatization of rendering** — Framework does rendering automatically and doesn't need function to be called for it. Functionality like `resize` function can be called automatically by setting additional parameters such as `autoresize: true`.

* **ES6 Features** - Framework is written with using latest features of ECMAScript 6 and ECMAScript 7 (beta) features and compiled with [Babel](https://babeljs.io/).

* **Softbodies** - WhitestormJS is the only engine (except native ammo.js) that supports softbodies. 


## Installation
Include a script tag linking the [WhitestormJS](https://cdn.jsdelivr.net/whitestormjs/latest/whitestorm.min.js) library in your `head` or after your `body`:

```html
<script src="{path_to_lib}/whitestorm.js"></script>
```

After adding these libraries, you can configure your app:
```javascript
const world = new WHS.World({
    stats: "fps", // fps, ms, mb or false if not need.
    autoresize: true,

    gravity: { // Physic gravity.
        x: 0,
        y: -100,
        z: 0
    }
});

const sphere = new WHS.Sphere({ // Create
  geometry: {
    radius: 3
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
})

sphere.addTo(GAME);

world.start(); // Start animations and physics simulation.
```

[![Join the chat at https://gitter.im/WhitestormJS/whitestorm.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/WhitestormJS/whitestorm.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

##### Documentation: [Look here](http://whitestormjs.xyz//)

<br>

## Game example
<a href="http://192.241.128.187/current/examples/fps/shooter/" target="_blank"><img src="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/media/art/splash.png"></a>

## [Examples](http://192.241.128.187/current/examples/):

#### BASIC:
 * [Basic / Hello world](http://192.241.128.187/current/examples/basic/helloworld/)  (Basic "Hello world!" example.)
 * [Basic / Model](http://192.241.128.187/current/examples/basic/model/)  (Basic model example.)
 * [Basic / Debugging](http://192.241.128.187/current/examples/basic/debugging/)  (Object's debug example.)
 * [Basic / Extending API](http://192.241.128.187/current/examples/basic/extending/)  (Extending api example.)
 * [Basic / Softbody](http://192.241.128.187/current/examples/basic/softbody/)  (Basic softbody implementation.)

#### DESIGN:
 * [Design / Saturn](http://192.241.128.187/current/examples/design/saturn/)  (Saturn planet example from: http://codepen.io/Yakudoo/pen/qbygaJ)
 * [Design / Easter](http://192.241.128.187/current/examples/design/easter/)  (Easter rabbit with easter eggs.)

#### FIRST-PERSON:
 * [FPS / Shooter](http://192.241.128.187/current/examples/fps/shooter/)  (First person example with Wagner effects and terrain. + fog)
 * [FPS / Fog](http://192.241.128.187/current/examples/fps/fog/)  (First person game with animated objects)

#### PHYSICS:
 * [Physics / Dominos](http://192.241.128.187/current/examples/physics/domino/)  (Physics example with dominos.)

#### PERFORMANCE:
 * [Performance / Sticks](http://192.241.128.187/current/examples/performance/sticks/)  (Collisions performance of 320 basic box objects.)
 * [Performance / Softbodies](http://192.241.128.187/current/examples/performance/softbodies/)  (Collisions performance of 10 softbodies.)

----

#### [Changelog](https://github.com/WhitestormJS/whitestorm.js/blob/master/CHANGELOG.md)

## [Contributors](https://github.com/WhitestormJS/whitestorm.js/graphs/contributors):
[![Author](http://wsbadge.herokuapp.com/badge/Author-Alexander%20Buzin-red.svg)](https://github.com/sasha240100)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-jackdalton-blue.svg)](https://github.com/jackdalton)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-Noctisdark-blue.svg)](https://github.com/noctisdark)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-bdirl-blue.svg)](https://github.com/bdirl)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-preco21-blue.svg)](https://github.com/preco21)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-yeliex-blue.svg)](https://github.com/yeliex)

<br>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://alexbuzin.me/)   <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Лицензия Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>
