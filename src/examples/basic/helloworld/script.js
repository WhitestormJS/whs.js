import * as UTILS from './globals';

const world = new WHS.World({
  ...UTILS.$world
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: UTILS.$colors.mesh,
    kind: 'lambert'
  },

  position: [0, 100, 0]
});

sphere.addTo(world);

UTILS.addPlane(world);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
world.setControls(WHS.orbitControls());
