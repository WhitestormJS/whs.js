const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  helpers: {
    grid: {
      size: 100,
      step: 3
    },
    axis: {
      size: 100
    }
  },

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    x: 62,
    y: 30,
    z: 44
  },

  background: 0xcccccc
});

new WHS.Sphere({
  geometry: {
    radius: 4
  },

  mass: 5,

  material: {
    color: 0x0000ff,
    kind: 'phong',
    rest: 0
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
}).addTo(GAME);

const tramplin = new WHS.Box({
  geometry: {
    height: 2,
    width: 20,
    depth: 4
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'phong',
    rest: 0
  },

  pos: {
    x: 0,
    y: 4,
    z: 0
  },

  rot: {
    z: -Math.PI / 6
  }
});

tramplin.addTo(GAME);

const tramplin2 = tramplin.clone();
tramplin2.position.y = 44;
tramplin2.addTo(GAME);

const tramplin3 = tramplin.clone();
tramplin3.position.set(24, 24, 0);
tramplin3.rotation.z = Math.PI / 6;
tramplin3.addTo(GAME);

const domino = new WHS.Box({
  geometry: {
    height: 8,
    width: 1,
    depth: 4
  },

  mass: 5,

  material: {
    color: 0x00ff00,
    kind: 'phong',
    rest: 0.5,
    fri: 1
  },

  pos: {
    x: 20,
    y: 4,
    z: 0
  }
});

let d = domino.clone();
for (let i = 0; i < 4; i++) {
  d = d.clone();
  d.position.x += 8;
  d.addTo(GAME);
}

new WHS.Box({
  geometry: {
    width: 250,
    depth: 250,
    height: 1
  },

  mass: 0,

  material: {
    color: 0xcccccc,
    kind: 'basic',
    rest: 0,
    fri: 1
  },

  pos: {
    x: 0,
    y: -0.5,
    z: 0
  }
}).addTo(GAME);

new WHS.PointLight({
  light: {
    intensity: 2,
    distance: 200
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
    intensity: 0.5
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());
GAME.start();
