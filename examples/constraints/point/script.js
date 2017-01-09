import * as UTILS from '../../globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: process.ammoPath
  },

  camera: {
    far: 10000,
    position: [0, 40, 70]
  }
});

const halfMat = {
  kind: 'phong',
  transparent: true,
  opacity: 0.5
};

const PhysicsBox = PHYSICS.$rigidBody(WHS.Box, PHYSICS.BOX);

const box = new PhysicsBox({
  geometry: {
    width: 2,
    height: 20,
    depth: 2
  },

  mass: 0,

  material: {
    color: UTILS.$colors.mesh,
    ...halfMat
  },

  position: {
    y: 40
  }
});

const box2 = new PhysicsBox({
  geometry: {
    width: 2,
    height: 2,
    depth: 20
  },

  mass: 10,

  material: {
    color: UTILS.$colors.softbody,
    ...halfMat
  },

  physics: {
    damping: 0.1
  },

  position: {
    y: 28,
    z: 10
  }
});

const pointer = new (PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.SPHERE))({material: {color: UTILS.$colors.mesh}});
pointer.position.set(0.5, 60, -8);
pointer.addTo(world);

box.addTo(world);
box2.addTo(world);

const constraint = new PHYSICS.PointConstraint(box2.native, box.native,
  new THREE.Vector3(0, box2.position.y, 1)
);

world.addConstraint(constraint);

UTILS.addPlane(world, 250);
UTILS.addBasicLights(world);

world.start();
world.setControls(new WHS.OrbitControls());
