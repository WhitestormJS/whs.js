import test from 'ava';
import * as WHS from '../lib/index';

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

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
    worker: '../src-examples/libs/physijs_worker.js',
    ammo: '../src-examples/libs/ammo.js'
  }
});

test('basic', t => {
  new WHS.Sphere({
    geometry: {
      radius: 3
    },

    mass: 10,

    material: {
      color: 0xffffff,
      kind: 'basic'
    },

    pos: {
      x: 0,
      y: 100,
      z: 0
    }
  }).addTo(GAME).then(() => {
    t.pass();
  });
});
