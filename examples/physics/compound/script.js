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
      mass: 10 // Mass of physics object.
    })
  ],

  material: new THREE.MeshLambertMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 100, 0]
});

const box = new WHS.Box({ // Create sphere comonent.
  geometry: [2, 2, 2],

  modules: [
    new PHYSICS.BoxModule({
      mass: 10 // Mass of physics object.
    })
  ],

  material: new THREE.MeshLambertMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [2, -3, 2]
});

box.addTo(sphere);
sphere.addTo(world);

UTILS.addPlane(world);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.]
