(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.GAME = new WHS.World({
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

  background: {
    opacity: 0
  },

  rWidth: 1.5,
  rHeight: 1.5,

  renderer: {
    alpha: true
  }
});

var envMap = WHS.texture('../../_assets/background.jpg');
envMap.mapping = THREE.SphericalReflectionMapping;

var sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'basic',
    envMap: envMap,
    refractionRatio: 0.95
  },

  pos: {
    x: -20,
    y: 20,
    z: 0
  }
});

sphere.addTo(GAME);

for (var i = 0; i < 5; i++) {
  var sc = sphere.clone();
  sc.position.x = -20 + i * 6;
  sc.addTo(GAME);
}

new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic',
    transparent: true,
    opacity: 0
  },

  pos: {
    x: 0,
    y: 0,
    z: 0
  },

  rot: {
    x: -Math.PI / 2
  }
}).addTo(GAME);

new WHS.PointLight({
  light: {
    intensity: 6,
    distance: 100
  },

  pos: {
    y: 50
  }
}).addTo(GAME);

new WHS.AmbientLight({
  light: {
    intensity: 10,
    color: 0xffffff
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());

GAME.start();

},{}]},{},[1]);
