import * as UTILS from './globals';

window.world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new PHYSICS.WorldModule({
    ammo: '{{ ammojs }}'
  }),
  new WHS.modules.RenderingModule({
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    },

    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }),
  new WHS.modules.CameraModule({
    position: new THREE.Vector3(0, 10, 50)
  })
]);

console.log(world);

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10
    })
  ],

  material: {
    color: UTILS.$colors.mesh,
    kind: 'basic' // lambert
  },

  position: [0, 100, 0] // 0 100 0
});

sphere.addTo(world);

// world.add(sphere);

UTILS.addBoxPlane(world);
UTILS.addBasicLights(world).then(o => console.log(o.native));

world.start(); // Start animations and physics simulation.
// world.setControls(new WHS.OrbitControls());
