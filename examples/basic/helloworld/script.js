import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules()
]);

// world.module(new WHS.app.CameraModule({
//   position: new THREE.Vector3(0, 100, 50)
// }));


// world.$camera = new WHS.PerspectiveCamera({
//   camera: {
//     near: 1,
//     far: 1000,
//     fov: 45,
//     aspect: window.innerWidth / window.innerHeight
//   },
//
//   position: [200, 200, 200]
// });


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

sphere.addTo(world);

UTILS.addBoxPlane(world);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
