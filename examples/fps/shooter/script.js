import * as UTILS from '../../globals';

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 1,
      restitution: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: new THREE.Vector3(0, 100, 0)
});

const world = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 10, 50)
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
    ammo: process.ammoPath
  }),
  new PHYSICS.FirstPersonModule(sphere, {
    speed: 500,
    ypos: 0
  }),
  new WHS.app.ResizeModule()
]);

sphere.addTo(world);

for (let i = 0; i < 10; i++) {
  const height = 10 + Math.random() * 90;

  new WHS.Box({
    geometry: {
      width: 10 + Math.random() * 90,
      height,
      depth: 10 + Math.random() * 90
    },

    modules: [
      new PHYSICS.SphereModule({
        mass: 0,
        restitution: 1
      })
    ],

    material: new THREE.MeshPhongMaterial({color: UTILS.$colors.mesh}),

    position: {
      x: Math.random() * 1000 - 500,
      y: height / 2,
      z: Math.random() * 1000 - 500
    }
  }).addTo(world);
}

UTILS.addPlane(world, 1000);
UTILS.addBasicLights(world);

world.start();
