window.GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,
  softbody: true,

  gravity: {
    x: 0,
    y: -9.8 * 100,
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

  physics: {
    fixedTimeStep: 1 / 120
  },

  background: {
    color: 0xaaaaaa
  }
});

const sphere = new WHS.Sphere({ // Softbody.
  geometry: {
    radius: 12,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 15000,
  softbody: true,

  physics: {
    pressure: 50000
  },

  material: {
    color: 0x000ff,
    kind: 'phong'
  },

  pos: {
    y: 12
  }
});

sphere.addTo(GAME).then(() => {
  for (let i = 0; i < 10; i++) {
    const newSphere = sphere.clone();
    newSphere.position.y = 50 * (i + 1);
    newSphere.addTo(GAME);
  }
});

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

  pos: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

new WHS.DirectionalLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 1
  },

  pos: {
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

GAME.setControls(WHS.orbitControls());
GAME.start();
