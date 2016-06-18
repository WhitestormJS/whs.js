

<p align="center"><img src="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/development/art/logo/big-inverse.png"></p>

<p align="center">
    <a href="https://travis-ci.org/WhitestormJS/whitestorm.js" align="center">
        <img src="https://travis-ci.org/WhitestormJS/whitestorm.js.svg">
    </a>&nbsp;&nbsp;
    <a href="https://www.npmjs.com/package/whitestormjs"><img src="http://wsbadge.herokuapp.com/npm/v/whitestormjs.svg"></a>&nbsp;&nbsp;          
    <a href="https://github.com/WhitestormJS/whitestorm.js"><img src="http://wsbadge.herokuapp.com/bower/v/whitestormjs.svg"></a>&nbsp;&nbsp;
    <a href="https://whslack.herokuapp.com/"><img src="https://whslack.herokuapp.com/badge.svg"></a>
    <br>

    <p align="center"><i><b>Framework for developing 3D web apps with physics.</b></i></p>
</p>

<br>

------

## Features

* **Simple shape crafting** — We use JSON-like structure for creating objects by inputed data and adding them to 3d world.

<p align="center">
    <img src="http://whitestormjs.xyz/images/shapes/dodecahedron.gif" height="100" alt="dodecahedron"> 
    <img src="http://whitestormjs.xyz/images/shapes/polyhedron.gif" height="100" alt="polyhedron">
    <img src="http://whitestormjs.xyz/images/shapes/icosahedron.gif" height="100" alt="icosahedron"> 
    <img src="http://whitestormjs.xyz/images/shapes/tetrahedron.gif" height="100" alt="tetrahedron">
</p>

* **Physics with WebWorkers** — It uses [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) library for calculating physics of 3D shapes with **WebWorkers technology** that allows to make rendering an calculating physics in multiple threads.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://i.imgur.com/LN1Ymsz.gif" height="100">

* **Plugin system** — Framework supports *plugins & components* made by other users. You need to include them after whitestorm.js and follow provided instructions.

* **Automatization of rendering** — Framework does rendering automatically and doesn't need function to be called for it. Functionality like `resize` function can be called automatically by setting additional parameters such as `autoresize: true`.

* **ES6 Features** - Framework is written with using latest features of ECMAScript 6 and ECMAScript 7 (beta) features and compiled with [Babel](https://babeljs.io/).
<p align="center"><img src="http://blog.makersquare.com/wp-content/uploads/2015/06/es6-logo.png" height="100" alt="es6">&nbsp;&nbsp; &nbsp;&nbsp; 
<img src="https://cms-assets.tutsplus.com/uploads/users/16/posts/24511/preview_image/babel-1.png" height="100" alt="babel"></p>


## Installation

> It is advised to download your own copies of the following libraries, as large changes can break backwards compatibility.

Include [Three.js](http://threejs.org/build/three.min.js) and [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) libraries.
Include a script tag linking the [WhitestormJS](https://cdn.jsdelivr.net/whitestormjs/latest/whitestorm.min.js) library in your `head` or after your `body`:

```html
<script src="{path_to_lib}/whitestorm.js"></script>
```

After adding these libraries, you can configure your app:
```javascript
const world = new WHS.World({
    stats: "fps", // fps, ms, mb or false if not need.

    gravity: { // Physic gravity.
        x: 0,
        y: -100,
        z: 0
    }
});

// Define your scene objects here.

world.start(); // Start animations and physics simulation.
```

[![Join the chat at https://gitter.im/WhitestormJS/whitestorm.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/WhitestormJS/whitestorm.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

##### Documentation: [Look here](http://whitestormjs.xyz//)

<br>

## Game example
<a href="http://192.241.128.187/current/examples/fps/shooter/" target="_blank"><img src="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/development/art/splash.png"></a>

## Other examples:
 * [Basic / Hello world](http://192.241.128.187/current/examples/basic/helloworld/)  (Basic "Hello world!" example.)
 * [Basic / Model](http://192.241.128.187/current/examples/basic/model/)  (Basic model example.)
 * [Basic / Debugging](http://192.241.128.187/current/examples/debugging/)  (Object's debug example.)
 * [Basic / Extending API](http://192.241.128.187/current/examples/extending/)  (Extending api example.)

 * [Design / Saturn](http://192.241.128.187/current/examples/design/saturn/)  (Saturn planet example from: http://codepen.io/Yakudoo/pen/qbygaJ)
 * [Design / Easter](http://192.241.128.187/current/examples/design/easter/)  (Easter rabbit with easter eggs.)

 * [FPS / Shooter](http://192.241.128.187/current/examples/fps/shooter/)  (First person example with Wagner effects and terrain. + fog)
 * [FPS / Fog](http://192.241.128.187/current/examples/fps/fog/)  (First person game with animated objects)

 * [Physics/Dominos](http://192.241.128.187/current/examples/physics/dominos/)  (Physics example with dominos.)

##### Changelog: [Look here](https://github.com/WhitestormJS/whitestorm.js/blob/master/CHANGELOG.md)

----

### Contributors:
[![Author](http://wsbadge.herokuapp.com/badge/Author-Alexander%20Buzin-red.svg)](https://github.com/sasha240100)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-jackdalton-blue.svg)](https://github.com/jackdalton)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-Noctisdark-blue.svg)](https://github.com/noctisdark)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-bdirl-blue.svg)](https://github.com/bdirl)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-preco21-blue.svg)](https://github.com/preco21)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-yeliex-blue.svg)](https://github.com/yeliex)

<br>

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Лицензия Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />

<br>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://alexbuzin.me/)
