import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: '{{ ammojs }}'
  }
});

const sphere = new (PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.SPHERE))({ // Create sphere comonent.
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

const box = new (PHYSICS.$rigidBody(WHS.Box, PHYSICS.BOX))({ // Create sphere comonent.
  geometry: [2, 2, 2],

  mass: 10, // Mass of physics object.

  material: {
    color: UTILS.$colors.mesh,
    kind: 'lambert'
  },

  position: [2, -3, 2]
});

box.addTo(sphere);

sphere.addTo(world);

UTILS.addPlane(world);
UTILS.addBasicLights(world).then(o => console.log(o.native));

world.start(); // Start animations and physics simulation.
world.setControls(new WHS.OrbitControls());
