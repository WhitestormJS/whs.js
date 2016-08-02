window.GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,
  softbody: true,

  gravity: {
    x: 0,
    y: -9.8,
    z: 0
  },

  camera: {
    far: 10000,
    near: 0.01,
    y: 6,
    z: 18
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  },

  background: {
    color: 0xaaaaaa
  }
});

var sphere = new WHS.Icosahedron({ // Softbody.
  geometry: {
    radius: 1,
    detail: 2
  },

  mass: 2,
  softbody: true,

  physics: {
    pressure: 100,
    damping: 0.01,
    friction: 0.3,

    klst: 0.6,
    kast: 0.6,
    margin: 0.05,

    viterations: 10,
    piterations: 10,
    citerations: 4,
    diterations: 0
  },

  material: {
    color: 0x000ff,
    wireframe: true,
    kind: 'phong'
  },

  pos: {
    y: 5
  }
});

sphere.getNative().frustumCulled = false;

sphere.addTo(GAME).then(function () {
  for (var i = 0; i < 30; i++) {
    let newSphere = sphere.clone();
    newSphere.position.y = 4 * (i + 1);
    newSphere.getNative().frustumCulled = false;
    newSphere.addTo(GAME);
  }
});

new WHS.Box({
  geometry: {
    width: 2500,
    height: 4,
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
