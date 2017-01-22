import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules()
]);

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      group: 1,
      mask: 2
    })
  ],

  material: new THREE.MeshLambertMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [-20, 100, 0]
});

sphere.addTo(world);

const sphere2 = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      group: 1,
      mask: 2
    })
  ],

  material: new THREE.MeshLambertMaterial({
    color: 0xff0000
  }),

  position: [20, 100, 0]
});

sphere2.addTo(world);

UTILS.addPlane(world).then(o => {
  const boxModule = new PHYSICS.BoxModule({
    mass: 0
  });

  const planeParams = {
    geometry: [10, 1, 40],
    material: o.material,
    modules: [boxModule]
  };

  new WHS.Box({
    ...planeParams,
    rotation: [0, 0, -Math.PI / 4],
    position: [-20, 3, 0]
  }).addTo(world);

  new WHS.Box({
    ...planeParams,
    rotation: [0, 0, Math.PI / 4],
    position: [20, 3, 0]
  }).addTo(world);
});
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
