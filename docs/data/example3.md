# Welcome to whs.js docs!

**whs.js** is a framework for 3D web apps built with Three.js technology.

It implements a core with component system and plugin support for fast development of 3D scene with physics.

Automizing your web app with whitestorm is fast and comfortable. This engine has physics support implemented by custom Physi.js library, which is much faster than others. Framework provides extended component control and high frame rate, because it uses WebWorkers technology for multithreading.

```javascript
const app = new WHS.App([
  new WHS.ElementModule(), // Apply to DOM.
  new WHS.SceneModule(), // Create a new THREE.Scene and set it to app.

  new WHS.CameraModule({ // Apply a camera.
    position: new Vector3(0, 0, 50)
  }),

  new WHS.RenderingModule({bgColor: 0x162129}), // Apply THREE.WebGLRenderer
  new WHS.ResizeModule() // Make it resizable.
]);

app.start(); // Run app.
```
