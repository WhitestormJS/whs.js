# Cube #

### How It Works ###

In this example, we will be creating a ball, and use a box creation to create a room-like enviroment for our ball to bounce in.

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
    <title>WHS.JS Cube Example</title>
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
const ad = UTILS.appDefaults;

const controlsModule = new WHS.OrbitControlsModule();

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }, ad.rendering, ad.physics, false),
  controlsModule
]);

controlsModule.controls.autoRotate = true;
```
SO basically, the lines above will define what modules of WhitestormJS you will be using, as well as what type of module you wish to use. I'm going to go over them individually below:
1. `const ad = UTILS.appDefaults` :: This line is simply referencing the default modules, etc, for easy use.
2. `const controlsModule = new WHS.OrbitControlsModule()` :: This is creating our controls module outside of the app decleration, but it still maintains the same behavior as though you declared it in the statement.
3. `const app - new WHS.App` :: This is the creation of your base connection to all things WhitestormJS in your scripts.
4. `...UTILS.appModules` :: This is saying, use all the default modules, and use these settings for it...
5. `position: new THREE.Vector3(0, 10, 200)` :: This tells the script where to put the camera in the scene.
6. `ad.rendering, ad.physics, false` :: This is saying use default rendering, default physics, and not to use the default controls (the false).
7. `controlsModule` :: This says, instead of the default controls, use this module we declared.
8. `controlsModule.controls.autoRotate = true` :: This tells the camera to automatically orbit/rotate around it's origin.

There, that's all there is to the first 4 statements.

Next up we have the decleration and creation of our sphere:
```javascript
// Create a ball
const ball = new WHS.Sphere({
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      restitution: 3,
      friction: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 30, 0]
});
```
The above code is quite simple to understand:
1. `const ball = new WHS.Sphere` :: This declares a new variable called ball, and says it is a WhitestormJS Sphere.
2.
```javascript
geometry: {
  radius: 5,
  widthSegments: 32,
  heightSegments: 32
}
```

:: Says that the ball will have a radius of 5 units and will be smooth on the width by 32, and smooth on the height by 32.3.

3. 
```javascript
modules: [
  new PHYSICS.SphereModule({
    mass: 10,
    restitution: 3,
    friction: 0
  })
]
```

:: This says that the ball will be accustomed and follow physics, with a mass of 10, a bounciness (restitution) of 3, and zero friction.

4. `position: [0, 30, 0]` :: This says where the ball will start out in the scene. (Starting Position)

---

Next, we are going to create a function to create our room-like box.

```javascript
// Create all sides of the box
function makeBoxWall(attrs = {}, size = 100) {
  return new WHS.Box({
    ...attrs,

    geometry: {
      width: size,
      height: size,
      depth: 0
    },

    modules: [
      new PHYSICS.BoxModule({
        mass: 0,
        restitution: 3,
        friction: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({
      color: 0x447F8B,
      transparent: true,
      opacity: 0.125
    })
  });
}
```

This code is simple on the inside, but when used, it gets continuous and a little long, but it is always still simple.
1. `function makeBoxWall(attrs = {}, size = 100)` :: This is saying that there is a function calle makeBoxWall that takes two parameters: Attributes, and it's size, which defaults to 100.
2. `return new WHS.Box` :: This is saying, return a new WhitestormJS Box. (Obviously)
3. `...attrs` :: This says that first off, reference the attributes provided for customization.
4.
```javascript
geometry: {
  width: size,
  height: size,
  depth: 0
}
```

:: This simply says that the width and height of the new "wall" will be the size, and it will not have a depth (0).

5.
```javascript
modules: [
  new PHYSICS.BoxModule({
    mass: 0,
    restitution: 3,
    friction: 0
  })
]
```

:: This code says that the box will have physics based on a boxes physics, and it will have a mass of 0, a bounciness (restitution) of 3, and no friction (0).

6.
```javascript
material: new THREE.MeshPhongMaterial({
  color: 0x447F8B,
  transparent: true,
  opacity: 0.125
})
```

:: This code defines the material, or outer look of the "wall", having a color of 0x447F8B, being transparent, and having a slight opacity, but being mostly transparent (0.125).

Next up for our script, we have the longest statement in our little example, which utilizes the function we just created. Write this into the script file:

```javascript
// Create wireframe box
new WHS.Box({
  geometry: {
    width: 100,
    height: 100,
    depth: 100
  },

  modules: [
    new PHYSICS.CompoundModule({
      mass: 100
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true
  }),

  position: [0, 0, 0],
  rotation: [0, 0, 25]
}).defer(box => {
  makeBoxWall({
    position: [0, 0, 50]
  }).addTo(box);

  makeBoxWall({
    position: [0, 0, -50]
  }).addTo(box);

  makeBoxWall({
    rotation: {x: -Math.PI / 2},
    position: [0, 50, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {x: -Math.PI / 2},
    position: [0, -50, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {y: -Math.PI / 2},
    position: [50, 0, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {y: -Math.PI / 2},
    position: [-50, 0, 0]
  }).addTo(box);

  box.addTo(app).then(() => {
    const v = new THREE.Vector3(0, 0, 1);

    box.setLinearFactor(new THREE.Vector3(0, 0, 0));

    new WHS.Loop(() => {
      box.setAngularVelocity(v);
    }).start(app);
  });
});
```

What's happening here is that we are creating a new box, defining some main attributes, such as full additive depth, width, and  height. We also define the material for the box, it's physics module and it's mass. Then we get on to creating the individual walls.

1.
```javascript
geometry: {
  width: 100,
  height: 100,
  depth: 100
},

modules: [
  new PHYSICS.CompoundModule({
    mass: 100
  })
],

material: new THREE.MeshPhongMaterial({
  color: 0xffffff,
  wireframe: true
}),

position: [0, 0, 0],
rotation: [0, 0, 25]
```

:: This was described above, it defines the full width (100), height (100), and depth (100) of the room, as well as it's physics module, mass (100), and material (oxffffff). It also defines it's position and rotation in the scene.

2. `}).defer(box => {` :: This is a very important line. This line says that instead of using the default WhitestormJS box creation process (which wouldn't make it hollow and without a roof), we are going to defer the construction function to this custom (lambda) function that we will define in our statement.

3.
```javascript
makeBoxWall({
  position: [0, 0, 50]
}).addTo(box);

makeBoxWall({
  position: [0, 0, -50]
}).addTo(box);

makeBoxWall({
  rotation: {x: -Math.PI / 2},
  position: [0, 50, 0]
}).addTo(box);

makeBoxWall({
  rotation: {x: -Math.PI / 2},
  position: [0, -50, 0]
}).addTo(box);

makeBoxWall({
  rotation: {y: -Math.PI / 2},
  position: [50, 0, 0]
}).addTo(box);

makeBoxWall({
  rotation: {y: -Math.PI / 2},
  position: [-50, 0, 0]
}).addTo(box);
```

:: While this is a long block of code is just a repeat of the function we created above. it creates the individual walls and the floor, and that's it. So basically, just different rotations and positions.


Lastly, we are going to add the defered and newly created parent box to our app, write this in the file:

```javascript
box.addTo(app).then(() => {
  const v = new THREE.Vector3(0, 0, 1);

  box.setLinearFactor(new THREE.Vector3(0, 0, 0));

  new WHS.Loop(() => {
    box.setAngularVelocity(v);
  }).start(app);
});
```

Then we have this: `ball.addTo(app)`. This adds the ball to the app, after we have added the room.

So, what we do here is say that after we add our box, we are going to create a new constant variable called v, and it will be a THREE Vector3 with the values 0, 0, and 1. then we set the boxe's linear factor to a zero-ed vector, which is just a physics thing, saying that the box will have no physical (simulation) linear speed (it won't be bound by physics through the y axis.

Now, we have to put some lights in our scene, for simplicities purposes. Add tis line:
```javascript
UTILS.addBasicLights(app);
```
Those are pretty straightfoward. Those are just for easier and cleaner code, since those are easy to understand.

The last line you need to add is the most obvious and blatant, so I won't really explain it:
```javascript
app.start();
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
    <title>WHS.JS Cube Example</title>
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
import * as UTILS from '../../globals';

const ad = UTILS.appDefaults;

const controlsModule = new WHS.OrbitControlsModule();

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }, ad.rendering, ad.physics, false),
  controlsModule
]);

controlsModule.controls.autoRotate = true;

// Create a ball
const ball = new WHS.Sphere({
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      restitution: 3,
      friction: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 30, 0]
});

// Create all sides of the box
function makeBoxWall(attrs = {}, size = 100) {
  return new WHS.Box({
    ...attrs,

    geometry: {
      width: size,
      height: size,
      depth: 0
    },

    modules: [
      new PHYSICS.BoxModule({
        mass: 0,
        restitution: 3,
        friction: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({
      color: 0x447F8B,
      transparent: true,
      opacity: 0.125
    })
  });
}

// Create wireframe box
new WHS.Box({
  geometry: {
    width: 100,
    height: 100,
    depth: 100
  },

  modules: [
    new PHYSICS.CompoundModule({
      mass: 100
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true
  }),

  position: [0, 0, 0],
  rotation: [0, 0, 25]
}).defer(box => {
  makeBoxWall({
    position: [0, 0, 50]
  }).addTo(box);

  makeBoxWall({
    position: [0, 0, -50]
  }).addTo(box);

  makeBoxWall({
    rotation: {x: -Math.PI / 2},
    position: [0, 50, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {x: -Math.PI / 2},
    position: [0, -50, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {y: -Math.PI / 2},
    position: [50, 0, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {y: -Math.PI / 2},
    position: [-50, 0, 0]
  }).addTo(box);

  box.addTo(app).then(() => {
    const v = new THREE.Vector3(0, 0, 1);

    box.setLinearFactor(new THREE.Vector3(0, 0, 0));

    new WHS.Loop(() => {
      box.setAngularVelocity(v);
    }).start(app);
  });
});

ball.addTo(app);

UTILS.addBasicLights(app);

app.start();
```

We hope you enjoyed this tutorial!

---

Some Examples/Tutorials to build from this:
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
