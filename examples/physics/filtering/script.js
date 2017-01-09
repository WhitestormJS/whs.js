import * as UTILS from '../../globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: process.ammoPath
  }
});

const PhysicsSphere = PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.SPHERE);
const PhysicsBox = PHYSICS.$rigidBody(WHS.Box, PHYSICS.BOX);

const sphere = new PhysicsSphere({ // Create sphere comonent.
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

  physics: {
    group: 1,
    mask: 2
  },

  position: [-20, 100, 0]
});

sphere.addTo(world);

const sphere2 = new PhysicsSphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xff0000,
    kind: 'lambert'
  },

  physics: {
    group: 1,
    mask: 2
  },

  position: [20, 100, 0]
});

sphere2.addTo(world);

UTILS.addPlane(world).then(o => {
  const planeParams = {
    geometry: [10, 1, 40],
    material: o.material,
    mass: 0
  };

  new PhysicsBox({
    ...planeParams,
    rotation: [0, 0, -Math.PI / 4],
    position: [-20, 3, 0]
  }).addTo(world);

  new PhysicsBox({
    ...planeParams,
    rotation: [0, 0, Math.PI / 4],
    position: [20, 3, 0]
  }).addTo(world);
});
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
world.setControls(new WHS.OrbitControls());
