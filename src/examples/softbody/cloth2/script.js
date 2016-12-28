import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: '{{ ammojs }}'
  },

  softbody: true,

  gravity: {
    y: -9.8,
  },

  camera: {
    far: 10000,
    position: [0, 30, 90]
  }
});

const arm = new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 80,
    height: 6,
    depth: 6
  },

  mass: 0,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    y: 50,
    z: 10
  }
});

arm.addTo(world);

const cloth = new WHS.Plane({ // Softbody (blue).
  geometry: {
    width: 80,
    height: 40,
    wSegments: 20,
    hSegments: 15
  },

  mass: 10,
  softbody: true,

  material: {
    color: UTILS.$colors.softbody,
    kind: 'phong',
    side: THREE.DoubleSide
  },

  physics: {
    margin: 1,
    // damping: 0.03,
    piterations: 12
  },

  position: {
    y: 30
  },

  rotation: {
    x: Math.PI / 4
  }
});

cloth.addTo(world);

cloth.appendAnchor(world, arm, 0, 1, false);
cloth.appendAnchor(world, arm, 20, 1, false);

new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 10,
    height: 10,
    depth: 10
  },

  mass: 10,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    y: 18
  }
}).addTo(world);

UTILS.addBoxPlane(world, 250);
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();
