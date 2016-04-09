

<p align="center"><img src="https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/development/art/logo/big-inverse.png"></p>

<p align="center">
    <a href="https://travis-ci.org/WhitestormJS/whitestorm.js" align="center">
        <img src="https://travis-ci.org/WhitestormJS/whitestorm.js.svg">
    </a>&nbsp;&nbsp;
    <a href="https://www.npmjs.com/package/whitestormjs"><img src="http://wsbadge.herokuapp.com/npm/v/whitestormjs.svg"></a>&nbsp;&nbsp;          
    <a href="https://github.com/WhitestormJS/whitestorm.js"><img src="http://wsbadge.herokuapp.com/bower/v/whitestormjs.svg"></a>&nbsp;&nbsp;
    <a href="https://whslack.herokuapp.com/"><img src="https://whslack.herokuapp.com/badge.svg"></a>
    <br>

    <p align="center"><i><b>jQuery for Three.js and Physi.js</b></i></p>
</p>

<br>

------

## Features

* **Simple shape crafting** — We use JSON-like structure for creating objects by inputed data and adding them to 3d world.

* **Physics with WebWorkers** — It uses [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) library for calculating physics of 3D shapes with **WebWorkers technology** that allows to make rendering an calculating physics in multiple threads.

* **Plugin system** — Framework supports *plugins & components* made by other users. You need to include them after whitestorm.js and follow provided instructions.

* **Automatization of rendering** — Framework does rendering automatically and doesn't need function to be called for it. Functionality like `resize` function can be called automatically by setting additional parameters such as `autoresize: true`.

## Installation

> It is advised to download your own copies of the following libraries, as large changes can break backwards compatibility.

Include [Three.js](http://threejs.org/build/three.min.js) and [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) libraries.
Include a script tag linking the [WhitestormJS](https://cdn.jsdelivr.net/whitestormjs/latest/whitestorm.min.js) library in your `head` or after your `body`:

```html
<script src="three.js"></script>
<script src="physi.js"></script>
<!-- WhitestormJS library -->
<script src="{path_to_lib}/whitestorm.js"></script>
```

After adding these libraries, you can configure your app:
```javascript
var world = new WHS.World({
    stats: "fps", // fps, ms, mb or false if not need.

    gravity: { // Physic gravity.
        x: 0,
        y: -100,
        z: 0
    },

    path_worker: 'physijs_worker.js', // Path to Physijs worker here.
    path_ammo: 'ammo.js' // Path to Ammo.js from Physijs worker.
});

// Define your scene objects here.

world.start(); // Start animations and physics simulation.
```

[![Join the chat at https://gitter.im/WhitestormJS/whitestorm.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/WhitestormJS/whitestorm.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<br>

## Structure
![Whitestorm.js structure](https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/development/art/coggle/WhitestormJS.png)

## Examples:
 * [FPS](http://192.241.128.187/current/examples/fps.html)  (First person example with Wagner effects and terrain.)
 * [Basic](http://192.241.128.187/current/examples/basic.html)  (Basic "Hello world!" example.)
 * [Material](http://192.241.128.187/current/examples/basic_material.html)  (Basic example with material.)
 * [Object/Model](http://192.241.128.187/current/examples/basic_model.html)  (Teapot model with *Three.js* JSONLoader.)
 * [Object/Wall](http://192.241.128.187/current/examples/stone_wall.html)  (Stone wall (basic).)
 * [Plugin/Color](http://192.241.128.187/current/examples/plugin_example.html)  (Basic plugin example.)
 * [Skybox](http://192.241.128.187/current/examples/skybox.html) (Skybox example)

##### Docs: [Look here](http://whitestormjs.xyz/init/)
##### Changelog: [Look here](https://github.com/WhitestormJS/whitestorm.js/blob/master/CHANGELOG.md)

----

### Contributors:
[![Author](http://wsbadge.herokuapp.com/badge/Author-Alexander%20Buzin-red.svg)](https://github.com/sasha240100)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-jackdalton-blue.svg)](https://github.com/jackdalton)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-Noctisdark-blue.svg)](https://github.com/noctisdark)

[![Contributor](http://wsbadge.herokuapp.com/badge/Contributor-bdirl-blue.svg)](https://github.com/bdirl)

<br>

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Лицензия Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />

<br>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://alexbuzin.me/)
