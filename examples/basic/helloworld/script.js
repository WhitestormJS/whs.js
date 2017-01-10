import * as UTILS from '../../globals';

const world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new WHS.modules.CameraModule({
    position: new THREE.Vector3(0, 10, 50)
  }),
  new WHS.modules.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: 'http://localhost:8080/assets/ammoloader.js',
    wasm: 'http://localhost:8001/vendor/ammo.wasm'
  }),
  new WHS.OrbitControlsModule(),
  new WHS.modules.AutoresizeModule()
]);

// world.module(new WHS.modules.CameraModule({
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
