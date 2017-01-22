import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules()
]);

const func = (u, v) =>
  new THREE.Vector3(u*300, 0, v*300);

const terrain = new WHS.Parametric({
  geometry: {
    func,
    slices: 300,
    stacks: 300
  },

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh,
    side: THREE.DoubleSide
  }),

  modules: [
    new PHYSICS.HeightfieldModule({
      mass: 0
    })
  ],

  position: new THREE.Vector3(-150, 0, -150),
  // rotation: new THREE.Euler(Math.PI, 0, 0)
});

terrain.addTo(world);

const sphere = new WHS.Sphere({
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 2,
      restitution: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: new THREE.Vector3(0, 50, 0)
});

sphere.addTo(world);

UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
