# WhitestormJS
JQuery for Three.js

----

[![Build Status](https://travis-ci.org/WhitestormJS/whitestorm.js.svg)](https://travis-ci.org/WhitestormJS/whitestorm.js)
[![npm](http://wsbadge.herokuapp.com/npm/v/whitestormjs.svg)](https://www.npmjs.com/package/whitestormjs) [![bower](http://wsbadge.herokuapp.com/bower/v/whitestormjs.svg)](https://github.com/WhitestormJS/whitestorm.js)

[![Issues](http://wsbadge.herokuapp.com/npm/dt/whitestormjs.svg)](https://www.npmjs.com/package/whitestormjs)
[![Slack Status](https://whslack.herokuapp.com/badge.svg)](https://whslack.herokuapp.com)
[![bitHound Overall Score](https://www.bithound.io/github/WhitestormJS/whitestorm.js/badges/score.svg)](https://www.bithound.io/github/WhitestormJS/whitestorm.js)


----

<br>

**WhitestormJS** is a 3D Javascript engine based on [**Three.js**](http://threejs.org/). It uses physics and effects libraries to define WhitestormJS API™ that contains useful scripts for **terrain generation, skybox, animation, physics simulation and post-effects**. WhitestormJS simplifies _Three.js object crafting algorithm_ to javascript methods with parameters.

WhitestormJS is [hosted by jsDelivr](http://www.jsdelivr.com/projects/whitestormjs). You can link to the latest [minified version](https://cdn.jsdelivr.net/whitestormjs/latest/whitestorm.min.js), [full version](https://cdn.jsdelivr.net/whitestormjs/latest/whitestorm.js), or [download both](https://cdn.jsdelivr.net/whitestormjs/latest/whitestormjs.zip).

![WhitestormJS](https://raw.githubusercontent.com/WhitestormJS/whitestorm.js/master/development/art/logo/big.png)

<br>

## Installation
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](https://github.com/search?l=JavaScript&q=%23javasript&ref=searchresults&type=Repositories&utf8=%E2%9C%93)

\* It is advised to download your own copies of the following libraries, as large changes can break backwards compatibility.

Include [Three.js](http://threejs.org/build/three.min.js), [Wagner](http://spite.github.io/wagner/Wagner.js), and [Physi.js](https://github.com/chandlerprall/Physijs/blob/master/physi.js) libraries.
Include a script tag linking the [WhitestormJS](https://cdn.jsdelivr.net/whitestormjs/latest/whitestorm.min.js) library in your `head` or after your `body`:

```html
<script src="three.js"></script>
<script src="physi.js"></script>
<script src="wagner.js"></script>
<!-- WhitestormJS library -->
<script src="{path_to_lib}/whitestorm.js"></script>
```

After adding these libraries, you can configure your game:
```javascript
var GAME = new WHS.init({
    anaglyph: false, // Anaglyph effect.
    stats: "fps", // fps, ms, mb or false if not need.
    wagner: WAGNER, // wagner library variable

    gravity: { // Physic gravity.
        x: 0,
        y: -100,
        z: 0
    }

    path_worker: 'physijs_worker.js' // Path to Physijs worker here.
    path_ammo: 'ammo.js' // Path to Ammo.js.
});

// Define your scene objects here.

GAME.start(); // Start animations and physics simulation.
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
