## Changelog

##### Before contibuting here see [rules](https://github.com/WhitestormJS/whitestorm.js/blob/master/CONTRIBUTING.md#-adding-changes-to-changelogmd)
**current**
- Engine rebuild commit:
   - Functions (prototype) replaced with es6 classes
   - *api.construct -> WHS.Shape*
   - *api.Wrap -> WHS.Shape.addTo*
   - *WHS.plugins.loop -> WHS.loop*
   - Plugin system with `WHS.Shape.prototype.pluginName`
   - Skybox: *src -> path*
- Fixed speed bug when press *shift* on fps example.
- Removed unused files.
- #51: Update `Core.js`
   - _initStats()
   - _initDOM()
   - _initCamera()
   - _initRenderer()
   - *whselement var -> this._dom*
   - _loop in start()
   - _updateControls() in start()
   - _process in start()
   - *this.update -> this._update*
   - _initScene()
- #53: Wagner moved to plugins.
- Fixed resize. *rWidth, rHeight default parameter is now 1.*
- #52: *libs/three.js r73 -> libs/three.js r74*
- Terrain moved to plugins.
- Cleanup folders.
- Loaders fix.
- Fix for Model & Morph: *useVertexColors*, *useCustomMaterial*.
- Fix for terrain shadows. (Now it can receive).
- Fix for zero values in friction and restitution.
- *MakeFirstPerson -> FPSControls* 
- #61: *libs/three.js r74 -> libs/three.js r75*
- Fixed Text shape.

**v0.0.7**
- Fixed #16 "object.assign() chrome bug."
- Base rewrite(fix). part 4
- Added the following effects to `addWagner`:
  - `grayscalePass`
  - `halftonePass`
  - `invertPass`
- *logos/ -> development/art/logo/*
- *development/art/logo/* + sorted = */ai, /animation_fla, /animation_gif*
- *development/coggle/ -> development/art/coggle/*
- *development/ -> development/screenshots/*
- Added warning in case of invalid Wagner effect referenced (addWagner.js)
- *src/libs/{jquery} - > ./libs/{jquery}*
- Fixed `onlyvis`.
- Added Plugin support (`src/Plugins/`).
- New example (`examples/plugin_example.html`).
- Added skybox support (`WHS.init.prototype.addSkybox`).
- New example (`examples/skybox.html`).
- Added `whs.preloader` plugin.
- Skybox added to fps example.
- ** CannonJS changed to PhysiJS(ammo.js version) **
- Removed example (`examples/basic_object.html`).
- `GAME.start()` added.
- CSF. ShaderTerrain.js
- Edit skybox example to prevent dodecahedron from rolling off of the ground
- CSF. `skybox.html`
- CSF. `addSkybox.js`
- CSF. `prefix.js`
- CSF. `addObject.js`
- CSF. `API/*.js`
- CSF. `FPSControls.js`
- Fixed OrbitControls parameter.
- Fixed parrot scale in fps example.
- CSF. `addMorph.js`
- CSF. `addModel.js`
- *scope.visible -> scope.mesh*
- *scope.body -> x*
- CSF. `addGround.js`
- CSF. `game.js`
- CSF. `addMorph.js`
- CSF. `loop.js`
- CSF. `register.js`
- CSF. `watch.js`
- Jquery is replaced with DOM in engine.
- CSF. `addWagner.js`
- *prefix.js (polyfill part) -> polyfill.js*
- CSF. `addLight.js`
- Removed `api.def()`.
- CSF. `whitestorm.js`
- Jquery removed from engine.
- Add warning in case of PointerLock API incompatibility.

**v0.0.6**
- Made `WHS.API.construct.build` parameters optional.
- Fixed [basic model example](http://192.241.128.187/current/examples/basic_model.html).
- Added *api.loadMaterial* function.
- Added *api.construct* function.
- Fixed *lathe* physics error.
- Changed coggle.
- Gulpfile update.
- Fixed `addLight()`.
- Added `_state` property to scope which is `deferred.promise()`.
- Disabled defining `this.composer.eff` in `WHS.init` unless Wagner is enabled.
- Fixed autoresize.
- Added the following effects to `addWagner`:
  - `ASCIIPass`
  - `dotScreenPass`
  - `fxaaPass`
  - `chromaticAberrationPass`
  - `dirtPass`
  - `edgeDetectionPass`
  - `highPassPass`
- Removed unusable libs.

**v0.0.6-alpha**
- Added Coggle.
- *WHS.init(THREE, CANNON, params) -> WHS.init(params)*
- Fixed *api.Wrap* error in *addGround*.
- Added *api.Wrap* to *addGrass*.
- Fixed name in examples.
- Fixed *stone_wall.html* example.
- MaterialOptions: *.type -> .kind*
- **THREE.js updade. r69 -> r73**.
- Changed terrain generation script.

-- Improved loading time ( < 1 sec. ).

-- FPS improved. (59-60 fps.)

Issues:

-- Shadows don't work.

-- addGrass doesn't work.

-- Cannon.js heightmap is not smooth yet.

**v0.0.5**
- Basic_material example fixed.
- `addModel()` for adding an object from JSON file.
- basic_material *example*
- *THREE.JSONLoader -> API*
- Added Wrap function.
- Removed all console.log's.
- *src/libs/Wagner.base.js -> libs/Wagner.base.js*
- CSF. Line-wrap, blocks.

**v0.0.4**
- Shader terrain material added.
- Shadows fixed.
- Lambert material issue fixed.
- *index.html -> examples/fps.html*.
- autoresize for *basic_object* example fixed.
- Source tree restructured. (All code now in *src* folder)
- *build* folder consist of *whitestorm.js*(original) and *whitestorm.min.js*(minified).
- *textures -> assets/textures, terrain -> assets/terrain*
- Three.js and cannon.js moved to *libs*.

**v0.0.3**
- Ground fixed.
- Grass added(+-)
- `PackUvs()` for add UVs for custom geometry.
- Improved FPS rate. (from 40 fps to 50-60 fps).

**v0.0.2**
- Terrain performance fixed. (from 20 fps to 40 fps //collisions//)
- License fixed.
- Funcs added ( **API** ).
- Examples added.

**v0.0.1**
- AddObject function
- Terrain added.
- Basic API
