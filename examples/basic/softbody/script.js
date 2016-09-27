(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",
  softbody: true,

  gravity: {
    x: 0,
    y: -9.8 * 10,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
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

new WHS.Sphere({ // Softbody (blue).
  geometry: {
    radius: 4,
    widthSegments: 16,
    heightSegments: 16
  },

  mass: 15,
  softbody: true,

  physics: {
    pressure: 2000,

    piteration: 40,
    viteration: 40
  },

  material: {
    color: 0x000ff,
    kind: 'phong'
  },

  position: {
    y: 4
  }
}).addTo(GAME).then(function (obj) {
  obj.native.frustumCulled = false;
});

new WHS.Sphere({ // Rigidbody (green).
  geometry: {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16
  },

  mass: 2,

  material: {
    color: 0x00ff00
  },

  position: {
    y: 30,
    x: -0.5,
    z: 0.5
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
    y: 0,
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

GAME.setControls(WHS.orbitControls());
GAME.start();

},{}]},{},[1]);
