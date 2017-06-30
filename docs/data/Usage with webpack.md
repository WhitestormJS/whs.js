# Usage with webpack

> For better understanding see [whitestorm-app-boilerplate](https://github.com/WhitestormJS/whitestorm-app-boilerplate)

## Using predefined alias

WhitestormJS provides alias configuration for all its source files to help you build awesome applications with webpack or other tools even faster.

```js
import alias from 'whs/tools/alias';

export default {
  // ...

  resolve: {
    alias
  }
}
```

With just a few lines of setup - you can use our shorteners for src/ files:

 - `@three` - Three.js used in Whitestorm.js
 - `@whs:app` - App modules
 - `@whs:app/element` - Alias for specific app module (`camera`, `rendering`, ..)
 - `@whs:controls` - Controls modules
 - `@whs:controls/oribt` - Alias for specific controls module (... `firstperson`)
 - `@whs+meshes` - Mesh components
 - `@whs+meshes/Box`, `@whs+meshes/Sphere`, and so on....
 - `@whs+lights` - Light components
 - `@whs+lights/AmbientLight`, `@whs+lights/DirectionalLight`, ...


 [> Modules](Modules.html)
