import * as UTILS from './globals';

window.world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new PHYSICS.WorldModule({
    ammo: '{{ ammojs }}',
    gravity: {x: 0, y: -10, z: 0}
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
  }),
  new WHS.OrbitControlsModule()
]);

const sphere = new WHS.Cylinder({ // Create sphere comonent.
  geometry: {
    radiusTop: 3,
    radiusBottom: 3,
    height: 5
  },

  modules: [
    new PHYSICS.CylinderModule({
      mass: 1
    })
  ],

  material: {
    color: UTILS.$colors.mesh,
    kind: 'basic' // lambert
  },

  position: [0, 10, 0] // 0 100 0
});

sphere.addTo(world);

// world.add(sphere);

UTILS.addBoxPlane(world);
UTILS.addBasicLights(world).then(o => console.log(o.native));

world.start(); // Start animations and physics simulation.
// world.setControls(new WHS.OrbitControls());
