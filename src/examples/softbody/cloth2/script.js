const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",
  softbody: true,

  gravity: {
    x: 0,
    y: -9.8,
    z: 0
  },

  camera: {
    far: 10000,
    y: 100,
    z: 300
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  },

  background: {
    color: 0xaaaaaa
  }
});

const arm = new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 160,
    height: 12,
    depth: 12
  },

  mass: 0,

  material: {
    color: 0x00ff00
  },

  position: {
    y: 130,
    z: 30
  }
});

arm.addTo(GAME);

const cloth = new WHS.Plane({ // Softbody (blue).
  geometry: {
    width: 160,
    height: 80,
    wSegments: 20,
    hSegments: 15
  },

  mass: 10,
  softbody: true,

  material: {
    color: 0x0000ff,
    kind: 'phong',
    side: THREE.DoubleSide
  },

  physics: {
    margin: 2
  },

  position: {
    y: 90
  },

  rotation: {
    x: Math.PI / 4
  }
});

cloth.addTo(GAME);

cloth.appendAnchor(GAME, arm, 0, 1, false);
cloth.appendAnchor(GAME, arm, 20, 1, false);

new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 72,
    height: 72,
    depth: 72
  },

  mass: 10,

  material: {
    color: 0x00ff00
  },

  position: {
    y: 36
  }
}).addTo(GAME);

new WHS.Box({
  geometry: {
    width: 2500,
    height: 1,
    depth: 2500
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'phong'
  },

  position: {
    x: 0,
    y: -20,
    z: 0
  }
}).addTo(GAME);

new WHS.DirectionalLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 1
  },

  position: {
    x: 0,
    y: 10,
    z: 30
  },

  target: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.5
  }
}).addTo(GAME);

GAME.setControls(new WHS.OrbitControls());
GAME.start();
