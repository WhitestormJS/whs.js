# [Example Name] #

### How It Works ###

[EXPLANATION OF WHAT EXAMPLE IS SHOWING]

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
7. `new WHS.[CONTROLS MODULE]()` :: Another simple one, this one is importing some of the default controls available through WhitestormJS; In this case, the [CONTROLS].
8. `new WHS.ResizeModule()` :: This is another simple one, this is saying the [CONTROLS] can also zoom in and out of the scene.
9. `new WHS.StatsModule()` :: This one is probably the simplest one here, this simply says, display the fps and other statistics of the app.

Whooee, that's a long explanation, but hopefully you are still following along!

---
## THE REST OF THE EXAMPLE'S CODE ##
---

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

[SCREENSHOT OF FINAL PRODUCT]

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

**REST OF CODE IN EXAMPLE**

UTILS.addBoxPlane(app);
UTILS.addBasicLights(app);

app.start(); // Start animations and physics simulation.
```

We hope you enjoyed this tutorial!

---

Some Examples/Tutorials to build from this:

[LIST]
