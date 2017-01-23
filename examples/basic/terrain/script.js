import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 30, -100)
  })
]);

const func = (u, v) =>
  new THREE.Vector3(u * 100, Math.sin(u * 10) * 4, v * 100);

const terrain = new WHS.Parametric({
  geometry: {
    func,
    slices: 40,
    stacks: 40
  },

  shadow: {
    cast: false
  },

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh,
    side: THREE.DoubleSide
  }),

  modules: [
    new PHYSICS.HeightfieldModule({
      mass: 0,
      size: new THREE.Vector2(40, 40),
      autoAlign: true
    })
  ]
});

terrain.addTo(world);

const sphere = new WHS.Sphere({
  geometry: {
    radius: 1,
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

  position: new THREE.Vector3(-31, 20, 0) // -30, 120, -40
});

sphere.addTo(world);

UTILS.addBasicLights(world, 0.5, [0, 10, 10], 100, {
  bias: 0.0001,
  radius: 2,

  camera: {
    fov: 90
  }
});

world.start(); // Start animations and physics simulation.
