import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 1000,
    position: [0, 30, 90]
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  }// ,

  // physics: {
  //   broadphase: {type: 'sweepprune'}
  // }
});

const stick = new WHS.Box({
  geometry: {
    width: 5,
    height: 1,
    depth: 1
  },

  mass: 1,

  material: {
    kind: 'phong',
    color: UTILS.$colors.mesh
  },

  physics: {
    restitution: 0,
    friction: 0.5,
    state: 4
  },

  shadow: {
    cast: false,
    receive: false
  },

  position: {
    y: 0.5
  }
});

const stick2 = stick.clone();
stick2.position.set(0, 4, 20);

const height = 10; // BASE: 6, 0, 2, 2.
const delta = 0;
const cols = 4,
  rows = 4;

let objects = 0;

for (let k = 0; k < rows; k++) {
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < height; i++) {
      const newStick = stick.clone();
      const newStick2 = stick2.clone();

      if (i % 2 === 0) {
        newStick.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick.position.set(1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);

        newStick2.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick2.position.set(-1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);
      } else {
        newStick.position.y = 0.5 + delta + (1 + delta) * i;
        newStick2.position.y = 0.5 + delta + (1 + delta) * i;
        newStick.position.z = 6 * j;
        newStick2.position.z = 2 + 6 * j;
        newStick.position.x = newStick2.position.x = 6 * k;
      }

      objects += 2;

      newStick.addTo(world);
      newStick2.addTo(world);
    }
  }
}

document.querySelector('.object_count').innerText = `${objects} objects`;

const sphere = new WHS.Sphere({
  geometry: {
    radius: 1,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    x: -20,
    y: 1
  }
});

sphere.addTo(world).then((sphere) => {
  const mx = 60,
    mz = 20;

  sphere.setAngularVelocity({x: mx, y: 0, z: mz});
  sphere.setLinearVelocity({x: mx, y: 0, z: mz});
});

UTILS.addBoxPlane(world, 250).then(o => {o.position.y = -1});
UTILS.addBasicLights(world, 0.5, [100, 100, 100], 200);

world.setControls(new WHS.OrbitControls());
world.start();
