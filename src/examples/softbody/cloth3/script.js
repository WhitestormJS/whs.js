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

const mouse = new WHS.VirtualMouse(world);

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

const cloth = new WHS.Tube({ // Softbody (blue).
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(0, 30, 0), new THREE.Vector3(0, 10, 0)),
    segments: 20,
    radius: 12,
    radiusSegments: 16,
    closed: false
  },

  mass: 1,
  softbody: true,

  physics: {
    margin: 1,
    damping: 0.03,
    piterations: 12
  },

  material: {
    color: UTILS.$colors.softbody,
    kind: 'phong',
    side: THREE.DoubleSide
  }
});

cloth.addTo(world);

cloth.appendAnchor(world, arm, 0, 1, false);
cloth.appendAnchor(world, arm, 40, 1, false);

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
}).addTo(world).then(box => {
  mouse.on('move', () => {
    box.setLinearVelocity(mouse.project().sub(box.position));
  });
});

UTILS.addBoxPlane(world, 250);
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();
