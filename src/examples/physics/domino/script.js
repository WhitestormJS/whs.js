import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  camera: {
    far: 10000,
    position: [62, 30, 130]
  }
});

new WHS.Sphere({
  geometry: [4, 32, 32],

  mass: 5,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong',
    rest: 0
  },

  position: [0, 100, 0]
}).addTo(world);

const tramplin = new WHS.Box({
  geometry: {
    height: 2,
    width: 20,
    depth: 4
  },

  mass: 0,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong',
    rest: 0
  },

  position: {
    x: 0,
    y: 4,
    z: 0
  },

  rotation: {
    z: - Math.PI / 6
  }
});

tramplin.rotation = new THREE.Euler(0, 0, -Math.PI/6);

tramplin.addTo(world);

const tramplin2 = tramplin.clone();
tramplin2.position.y = 44;
tramplin2.addTo(world);

const tramplin3 = tramplin.clone();
tramplin3.position.set(24, 24, 0);
tramplin3.rotation.z = Math.PI / 6;
tramplin3.addTo(world);

const domino = new WHS.Box({
  geometry: {
    height: 8,
    width: 1,
    depth: 4
  },

  mass: 5,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong',
    rest: 0.5,
    fri: 1
  },

  position: {
    x: 20,
    y: 4,
    z: 0
  }
});

let d = domino.clone();
for (let i = 0; i < 13; i++) {
  d = d.clone();
  d.position.x += 8;
  d.addTo(world);
}

UTILS.addBoxPlane(world, 250).then(o => o.position.y = -0.5);
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();
