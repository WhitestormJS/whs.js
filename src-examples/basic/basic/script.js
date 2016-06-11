import WHS from '../lib/index';

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
  },

  paths: {
    worker: '{{ libs }}/physijs_worker.js',
    ammo: '{{ libs }}/ammo.js'
  }
});

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3
  },

  mass: 10,
  onlyvis: false,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
});

const plane = new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 0,
    z: 0
  },

  rot: {
    x: -Math.PI / 2
  }
});

GAME.add(sphere);
GAME.add(plane);
GAME.start(plane);
