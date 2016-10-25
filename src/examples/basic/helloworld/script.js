const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  }
});

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  position: [0, 100, 0]
});

console.log(WHS.Sphere.instructions);

sphere.addTo(GAME);

new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: {
    x: 0,
    y: 0,
    z: 0
  },

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(GAME);

GAME.start();
