import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: '{{ ammojs }}'
  },

  softbody: true,

  camera: {
    far: 10000,
    position: [0, 60, 120]
  },

  gravity: {
    y: -9.8,
  },
});

const cloth = new WHS.Plane({ // Softbody (blue).
  geometry: {
    width: 60,
    height: 20,
    wSegments: 40,
    hSegments: 30
  },

  mass: 1,
  softbody: true,

  material: {
    color: UTILS.$colors.softbody,
    kind: 'phong',
    side: THREE.DoubleSide
  },

  physics: {
    margin: 1,
    damping: 0.02,
    piterations: 12
  },

  position: {
    y: 50
  },

  rotation: {
    x: Math.PI / 4
  }
});

cloth.addTo(world);

new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 3,
    height: 3,
    depth: 3
  },

  mass: 0,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    y: 36
  }
}).addTo(world);

UTILS.addBoxPlane(world, 250);
UTILS.addBasicLights(world, 0.5, [60, 60, 20], 400);

world.setControls(new WHS.OrbitControls());
world.start();
