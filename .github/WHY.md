### Why?
* 🤔 Because making of even **a basic Three.js application requires at least ~20 lines of code** (see [this tutorial](https://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene))
  - **Three.js:** you will need to setup: _scene, renderer, camera_, make an `animate()` function before making the actual app.
  - **Whitestorm.js:** There are modules that helps you easily setup them:

    ```javascript
    const app = new WHS.App([
      new WHS.ElementModule(), // attach to DOM
      new WHS.SceneModule(), // creates THREE.Scene instance
      new WHS.DefineModule('camera', new WHS.PerspectiveCamera()), // creates PerspectiveCamera instance
      new WHS.RenderingModule() // creates WebGLRenderer instance
    ]);

    app.start(); // run animation
    ```

    See [more about modules](https://medium.com/whitestormjs-framework/migrating-to-whitestormjs-v2-beta-module-system-2eeaeda08a80#.qqdn2mhct)

* 💣 **Adding physics is hard.**
  - **Three.js:** To make your app run with physics you need to make a second world with same 3d objects and apply their transform (position & rotation) to your rendered scene objects (`THREE.Scene` for example) in every frame.
  - **Whitestorm.js:** Can be done with modules in a few lines:

    ```javascript
    const app = new WHS.App([
      // Other modules...
      new PHYSICS.WorldModule()
    ]);

    const sphere = new WHS.Sphere({
      geometry: {
        radius: 3
      },

      modules: [
        new PHYSICS.SphereModule({
          mass: 10
        })
      ],

      material: new THREE.MeshBasicMaterial({color: 0xff0000}) // red material
    });

    app.start(); // run animation
    ```

    Use [physics-module-ammonext](https://github.com/WhitestormJS/physics-module-ammonext) as your physics module.

    Try with **physics** on [**Codepen**](http://codepen.io/sasha240100/pen/wgEXwN):

    <a href="http://codepen.io/sasha240100/pen/wgEXwN"><img src="http://i.imgur.com/AcsnqTs.png" height="50" /></a>


* 🔌 **Components & plugins**
  - **Three.js:** You can create meshes with geometry and material.
  - **Whitestorm.js:** You can create components with advanced custom functionality.

    ```javascript
    export class BasicComponent extends WHS.MeshComponent {
      build() {
        return new THREE.Mesh(
          new THREE.IcosahedronGeometry(3, 5),
          new THREE.MeshBasicMaterial({color: 0xffffff})
        )
      }

      randomize() { // Additional function
        this.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
      }
    }
    ```

  - See [Component system in interactive 3D of web](https://medium.com/@_alex_buzin/component-system-in-interactive-3d-of-web-18348eecf270#.lynivy4ut) article for more info.
