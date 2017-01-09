import * as UTILS from '../../globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: process.ammoPath
  },

  camera: {
    position: {
      z: 10
    }
  }
});

const sphere = new (PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.SPHERE))({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 2, // Mass of physics object.

  material: {
    color: UTILS.$colors.mesh,
    kind: 'lambert'
  },

  position: [0, 100, 0]
});

sphere.addTo(world);

const material = new THREE.MeshPhongMaterial({color: UTILS.$colors.mesh});

const PhysicsBox = PHYSICS.$rigidBody(WHS.Box, PHYSICS.BOX);

for (let i = 0; i < 10; i++) {
  new PhysicsBox({
    geometry: [10 + Math.random() * 90, 10 + Math.random() * 90, 10 + Math.random() * 90],
    material,
    position: [Math.random() * 1000 - 500, 100, Math.random() * 1000 - 500]
  }).addTo(world);
}

UTILS.addPlane(world, 1000);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
world.setControls(new WHS.FirstPersonControls(sphere, {
  speed: 3,
  ypos: -10
}));
