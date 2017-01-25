import * as UTILS from '../../globals';

const world = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 60, 120),
    far: 10000
  }),
  new WHS.app.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath,
    gravity: new THREE.Vector3(0, -9.8, 0),
    softbody: true
  }),
  new WHS.controls.OrbitModule(),
  new WHS.app.ResizeModule()
]);

const cloth = new WHS.Plane({ // Softbody (blue).
  geometry: {
    width: 60,
    height: 20,
    wSegments: 120, // 40
    hSegments: 40 // 30
  },

  // buffer: true,

  modules: [
    new PHYSICS.ClothModule({
      mass: 4,
      margin: 1,
      damping: 0.01,
      piterations: 12
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.softbody,
    side: THREE.DoubleSide
  }),

  position: {
    y: 50
  },

  rotation: {
    x: Math.PI / 4
  }
});

cloth.addTo(world);

new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 3,
    height: 3,
    depth: 3
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 36
  }
}).addTo(world);

UTILS.addBoxPlane(world, 250);
UTILS.addBasicLights(world, 0.5, [60, 60, 20], 400);

world.start();
