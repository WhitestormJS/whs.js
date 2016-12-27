import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

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
    width: 30,
    height: 2,
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
    width: 30,
    height: 1,
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
    y: 38,
    z: 12
  }
});

const pointer = new (PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.SPHERE))({material: {color: 0x00ff00}});
pointer.position.set(0, 60, -8);
pointer.addTo(world);

box.addTo(world);
box2.addTo(world);

const constraint = new PHYSICS.HingeConstraint(box2.native, box.native,
  new THREE.Vector3(0, 38, 1),
  new THREE.Vector3(1, 0, 0)
)

world.addConstraint(constraint);
constraint.enableAngularMotor(10, 20);

UTILS.addPlane(world, 250);
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();
