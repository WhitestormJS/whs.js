## Changelog
**current**
- Made `WHS.API.construct.build` parameters optional.
- Fixed [basic model example](http://192.241.128.187/current/examples/basic_model.html).
- Added *api.loadMaterial* function.
- Added *api.construct* function.
- Fixed *lathe* physics error.
- Changed coggle.
- Gulpfile update.
- Fixed `addLight()`.
- Added `_state` property to scope which is `deferred.promise()`.

**current** (v0.0.6-alpha)
- added Coggle.
- *WHS.init(THREE, CANNON, params) -> WHS.init(params)*
- Fixed *api.Wrap* error in *addGround*.
- Added *api.Wrap* to *addGrass*.
- Name fixed in examples.
- Fixed *stone_wall.html* example.
- MaterialOptions: *.type -> .kind*
- **THREE.js upgrade. r69 -> r73**.
- Changed terrain generation script.

-- Improved loading time ( < 1 sec. ).

-- FPS improved. (59-60 fps.)

Issues:

-- Shadows don't work.

-- addGrass doesn't work.

-- Cannon.js heightmap is not smooth yet.

**v0.0.5**
- Basic_material example fixed.
- addModel() *func* for adding an object from JSON file.
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
- PackUvs *func* for add UVs for custom geometry.
- Improved FPS rate. (from 40 fps to 50-60 fps).

**v0.0.2**
- Terrain fixed. (from 20 fps to 40 fps //collisions//)
- License fixed.
- Funcs added ( **API** ).
- Examples added.

**v0.0.1**
- AddObject function
- Terrain added.
- Basic API
