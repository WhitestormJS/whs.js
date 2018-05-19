[//]: # (title: Hello world example explanation)
[//]: # (date: 12 DAYS AGO)
[//]: # (level: beginner)

### How It Works ###

By the end of this quick tutorial, we'll have created a nice little WhitestormJS App that has a floor, camera, scene, and most specially of all, a sphere for us to rotate around and zoom in on.

*NOTE:*
*This is basically a tutorial showing how to build this yourself on your own computer, but if you just wanna copy the files, they're available at the bottom, or you can get them yourself from this repository's code, or the downloaded WhitestormJS directory on your computer.*

### Code ###

So, to first setup your example, you need to link to `http://localhost:8080/build/whs.js` in your html.

The next line we will add will link our main javascript page, `script.js`

Let's go ahead and write up our basic HTML5 page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WHS.JS [EXAMPLE NAME]</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script type="text/javascript" src="http://localhost:8080/build/whs.js"></script> <!-- Our link to the framework -->
    <script type="text/javascript" src="script.js"></script> <!-- This is the file where we'll add all of our code -->
  </body>
</html>
```

So, once you have your basic HTML5 page, we need to open/create the file script.js in the same directory as our html page, and open it up. Once you have opened your page, let's go ahead and setup our basic WhitestormJS scene, world, and camera.

*NOTE: WhitestormJS's syntax is highly object and property oriented, so prepare for a lot of brackets and braces!*

The first real line we need to add to our file will initialize our WhitestormJS App, but first, we have to import the utilites for quick and easy use of WhitestormJS. Do so by simply adding this line at the top of the file (replace [whs-directory] with the name of your WhitestormJS dowloaded directory):
```javascript
import * as UTILS from '[whs-directory]/examples/globals';
```

Now that we've done that, we can initialize WhitestormJS. Finally! Write this in the next lines:
```javascript
const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera(UTILS.appDefaults.camera)),
  new WHS.RenderingModule(UTILS.appDefaults.rendering, {
    shadow: true
  }),
  new PHYSICS.WorldModule(UTILS.appDefaults.physics),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  new StatsModule()
]);
```
SO basically, the lines above will define what modules of WhitestormJS you will be using, as well as what type of module you wish to use. I'm going to go over them individually below:
1. `const app = new WHS.App` :: Basically, this line is creating the new WhitestormJS instance that you will use to access everything you need to make your awesome project.
2. `new WHS.ElementModule()` :: This is where you tell it you are using a module, in this case the ElementModule, which is almost necessary for any type of creation whatsoever, this allows you to create elements, for example, a cube, in your scene/world.
3. `new WHS.SceneModule()` :: Another module creation, this one is pretty obvious, you have to have a place to store all of your awesome 3D Objects, right?
4. `new DefineModule('camera', new WHS.PerspectiveCamera(UTILS.appDefaults.camera))` :: Don't be scared of this line, basically, all this is is saying, I want to create a new module called "camera", and it is really a PerspectiveCamera using the default configurations, I'm just too lazy to type "PerspectiveCamera" the whole time.
5. `new WHS.RenderingModule(UTILS.appDefaults.rendering, { shadow: true })` :: This one looks difficult, but all it's saying is create a window on the html page for the viewer to see what's going on inside the scene!
6. `new PHYSICS.WorldModule(UTILS.appDefaults.physics)` :: This line is basically saying, "I want physics, I want them to be a part of my world, and I want them to be the WhitestormJS default physics.
7. `new WHS.OrbitControls()` :: Another simple one, this one is importing some of the default controls available through WhitestormJS; In this case, the Orbit Controls.
8. `new WHS.ResizeModule()` :: This is another simple one, this is saying the Orbit Controls can also zoom in and out of the scene.
9. `new WHS.StatsModule()` :: This one is probably the simplest one here, this simply says, display the fps (frames per second) and other statistics of the app.

Pheew, that was a long explanation, but hopefully you are still following along!

Next on the list, we are going to create a sphere, this is another long line of code, however, this time, it's not nearly as complicated, or difficult to understand. Add these lines to your file, and I'll explain them at the bottom.

```javascript
const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      restitution: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: new THREE.Vector3(0, 20, 0)
});
```
Here's the promised explanation:

1. `const sphere = new WHS.Sphere` :: This is just like the app, it creates a WhitestormJS sphere object.
2.

```javascript
geometry: {
  radius: 5,
  widthSegments: 32,
  heightSegments: 32
}
```
:: This code says that the shape of the sphere will be like this: 5 units in radius, and it will be smoothed on the width by a factor of 32, and smoothed on the height by a factor of 32.

3.

```javascript
modules: [
  new PHYSICS.SphereModule({
    mass: 10,
    restitution: 1
  })
]
```
:: This code is basically saying, "I want my sphere to have physics, and I want it's mass to be 10, and I want it to be slightly bouncy, so I'll give it a restitution of 1."

4.
```javascript
material: new THREE.MeshPhongMaterial({
  color: UTILS.$colors.mesh
})
```
:: This code is simple, and it states that it wants the sphere to be made of a MeshPhongMaterial, which is like a pretty often used material, with shininess and specular highlights (another shininess thing).

5. `position: new THREE.Vector3(0, 20, 0)` :: This is where the sphere will appear in the scene (and be present in the physics simulations).

Now, we have to put some lights in our scene, and a floor, for simplicities purposes. Add these lines:
```javascript
UTILS.addBoxPlane(app);
UTILS.addBasicLights(app);
```
Those are pretty straightfoward. Those are just for easier and cleaner code, since those are easy to understand.

The last line you need to add is the most obvious and blatant, so I won't really explain it:
```javascript
app.start(); // Start animations and physics simultation.
```

---

If you followed these instructions without error, open your browser and go to your html file. You should get something that looks like this:
![Screenshot of HelloWorld Example](https://github.com/WhitestormJS/whs.js/raw/master/examples/basic/helloworld/screenshot.png)

---

### Final Files: ###

Here are the final files for y'all, check and see if your files looks like these!

##### Index.html #####

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WHS.JS [EXAMPLE NAME]</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script type="text/javascript" src="http://localhost:8080/build/whs.js"></script> <!-- Our link to the framework -->
    <script type="text/javascript" src="script.js"></script> <!-- This is the file where we'll add all of our code -->
  </body>
</html>
```

##### Script.js #####
```javascript
import * as UTILS from '@utils';

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera(UTILS.appDefaults.camera)),
  new WHS.RenderingModule(UTILS.appDefaults.rendering, {
    shadow: true
  }),
  new PHYSICS.WorldModule(UTILS.appDefaults.physics),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  new StatsModule()
]);

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      restitution: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: new THREE.Vector3(0, 20, 0)
});

UTILS.addBoxPlane(app);
UTILS.addBasicLights(app);

app.start(); // Start animations and physics simulation.
```

We hope you enjoyed this tutorial!

---

Some Examples/Tutorials to build from this:

**Basic Examples**
- [Cube](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/cube)
- [Cylinder](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/cylinder)
- [Dragging](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/dragging)
- [Embedded](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/embeded)
- [FogEXP](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/fogexp)
- [Line](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/line)
- [Model](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/model)
- [Mouse-Group](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/mouse-group)
- [Mouse](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/mouse)
- [State](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/state)
- [Terrain](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/terrain)
- [Text](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/text)
- [Three.js](https://github.com/WhitestormJS/whs.js/tree/master/examples/basic/three.js)
