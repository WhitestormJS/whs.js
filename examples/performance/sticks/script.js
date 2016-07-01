(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -1000,
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

var stick = new WHS.Box({
  geometry: {
    width: 40,
    height: 8,
    depth: 8
  },

  mass: 100,

  material: {
    kind: 'lambert',
    color: 0xffa54f,
    friction: 1,
    restitution: 0
  },

  pos: {
    y: 4
  }
});

var stick2 = stick.clone();
stick2.position.set(0, 4, 20);

var height = 10; // BASE: 6, 0, 2, 2.
var delta = 0;
var cols = 4,
    rows = 4;

var objects = 0;

for (var k = 0; k < rows; k++) {
  for (var j = 0; j < cols; j++) {
    for (var i = 0; i < height; i++) {
      var newStick = stick.clone();
      var newStick2 = stick2.clone();

      if (i % 2 === 0) {
        newStick.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick.position.set(8 + 41 * k, 4 + delta + (8 + delta) * i, 8 + 41 * j);

        newStick2.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick2.position.set(-8 + 41 * k, 4 + delta + (8 + delta) * i, 8 + 41 * j);
      } else {
        newStick.position.y = 4 + delta + (8 + delta) * i;
        newStick2.position.y = 4 + delta + (8 + delta) * i;
        newStick.position.z = 41 * j;
        newStick2.position.z = 16 + 41 * j;
        newStick.position.x = newStick2.position.x = 41 * k;
      }

      objects += 2;

      newStick.addTo(GAME);
      newStick2.addTo(GAME);
    }
  }
}

document.querySelector('.object_count').innerText = objects + ' objects';

new WHS.Sphere({
  geometry: {
    radius: 12,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 1000,

  material: {
    color: 0x000ff
  },

  pos: {
    x: -100,
    y: 12
  }
}).addTo(GAME).then(function (sphere) {
  var mx = 1000,
      mz = 500;

  sphere.setAngularVelocity({ x: mx, y: 0, z: mz });
  sphere.setLinearVelocity({ x: mx, y: 0, z: mz });
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

},{}]},{},[1]);
