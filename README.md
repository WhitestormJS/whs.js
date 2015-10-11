# WhiteStormJS
[![npm](https://img.shields.io/npm/v/whitestormjs.svg)](https://www.npmjs.com/package/whitestormjs) [![bower](https://img.shields.io/bower/v/whitestormjs.svg)](https://github.com/sasha240100/WhitestormJS) [![Gitter](https://img.shields.io/badge/GITTER-JOIN_CHAT_%E2%86%92-1dce73.svg)](https://gitter.im/sasha240100/WhitestormJS)

[![Issues](https://img.shields.io/npm/dt/whitestormjs.svg)](https://www.npmjs.com/package/whitestormjs)
[![License](https://img.shields.io/github/license/sasha240100/whitestormjs.svg)](https://github.com/sasha240100/WhitestormJS/blob/master/LICENSE)


[![Author](https://img.shields.io/badge/Author-Alexander%20Buzin-red.svg)](https://github.com/sasha240100)


----------------------------------------------------------------------------------------------------------------


#####Code style check:   [![Codacy Badge](https://api.codacy.com/project/badge/8f5d1eab0569415b983bf0c1b7323d68)](https://www.codacy.com/app/siteprogcom/WhitestormJS)

----------------------------------------------------------------------------------------------------------------

**WhitestormJS** is a library to combine [**Three.Js**](https://github.com/mrdoob/three.js/) with [**Cannon.js**](https://github.com/schteppe/cannon.js/). It ***makes WebGL*** development **easy**.

![WhitestormJS](https://raw.githubusercontent.com/sasha240100/WhitestormJS/master/logos/whitestormjs.png)

## Installation
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](https://github.com/search?l=JavaScript&q=%23javasript&ref=searchresults&type=Repositories&utf8=%E2%9C%93)


Include *three.js* and *cannon.js* libraries.
Include script tag pointing to **Whitestorm.js** library to your *head* or *after body*:

```html
<script src="three.js"></script>
<script src="cannon.js"></script>
<!-- WhitestormJS library -->
<script src="{path_to_lib}/whitestorm.js"></script>
```

After adding libs you need to configure your game:
```javascript
var GAME = new WHS.init( THREE, CANNON,
{
    anaglyph: false, // Anaglyph effect.
    helper: false, // Cannon.js shape helper
    stats: "fps", // fps, ms, mb or false if not need.
    wagner: WAGNER, // wagner library variable
    gravity: { // Physic gravity.
        x: 0,
        y: -200,
        z: 0
    }
});
```

[![Join the chat at https://gitter.im/sasha240100/WhitestormJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sasha240100/WhitestormJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Examples:
 * [FPS](http://192.241.128.187/current/)  (First person example with wagner effects and terrain.)
 * [Basic](http://192.241.128.187/current/examples/basic.html)  (Basic "Hello world!" example.)
 
### Author: 
@sasha240100 [![forthebadge](https://img.shields.io/twitter/url/http/alexbuzin.me.svg?style=social)](https://twitter.com/intent/tweet?text=Check+this+developer:&url=http%3A%2F%2Falexbuzin.me)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://alexbuzin.me/)
