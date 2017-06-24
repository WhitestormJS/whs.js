import * as UTILS from '../../globals';

const world = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera(UTILS.appDefaults.camera)),
  new WHS.RenderingModule(UTILS.appDefaults.rendering, {
    shadow: true
  }),
  new PHYSICS.WorldModule(UTILS.appDefaults.physics),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  new StatsModule(),
  new WHS.StateModule().default({
    sphereColor: UTILS.$colors.mesh
  })
]);

const state = world.manager.use('state');
window.state = state;

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
    color: state.get('sphereColor')
  }),

  position: new THREE.Vector3(0, 20, 0)
});

sphere.addTo(world);

UTILS.addBoxPlane(world);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.

// STATE
state.update({
  sphereColor: color => {
    sphere.material.color.setHex(color);
  }
});

state.config({
  green: {
    sphereColor: 0x00ff00
  }
});
