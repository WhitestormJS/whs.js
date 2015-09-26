# About.

[![Join the chat at https://gitter.im/sasha240100/WhitestormJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sasha240100/WhitestormJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
**WhitestormJS** is a library to combine [**Three.Js**](https://github.com/mrdoob/three.js/) with [**Cannon.js**](https://github.com/schteppe/cannon.js/). It ***makes WebGL*** development **easy**.

![WhitestormJS](https://raw.githubusercontent.com/sasha240100/WhitestormJS/master/WhitestormJS-logo-colored.png)

## Installation
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

## Examples:
 * [FPS](http://sitepro.ga/proj/whitestorm/)  (First person example with wagner effects and terrain.)
 
### Author: 
@sasha240100
