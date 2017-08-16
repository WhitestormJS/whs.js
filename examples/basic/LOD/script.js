import * as UTILS from '../../globals';

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: {
      y: 10,
      z: 50
    }
  })),
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
    }),
    new WHS.LODModule(app)
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: new THREE.Vector3(0, 20, 0)
});

sphere.addTo(app);

UTILS.addBoxPlane(app);
UTILS.addBasicLights(app);

app.start(); // Start animations and physics simulation.



// const sphere = new WHS.Cylinder({ // Create sphere comonent.
//   geometry: {
//     radiusTop: 1,
//     radiusBottom: 1,
//     height: 2,
//     radiusSegments: 32,
//     heightSegments: 32,
//   },

//   modules: [
//     new WHS.LODModule(app)
//   ],

//   material: new THREE.MeshPhongMaterial({
//     color: UTILS.$colors.mesh
//   }),

//   position: new THREE.Vector3(0, 20, 0)
// });

// sphere.addTo(app);

// UTILS.addBoxPlane(app);
// UTILS.addBasicLights(app);

//app.start(); // Start animations and physics simulation.
