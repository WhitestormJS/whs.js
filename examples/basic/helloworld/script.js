(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: true,

  gravity: { // Physic gravity.
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    z: 50, // Move camera.
    y: 10
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  }
});

var sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xF2F2F2,
    kind: 'lambert'
  },

  position: [0, 100, 0]
});

var plane = new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    x: -Math.PI / 2
  }
});

new WHS.PointLight({
  light: {
    intensity: 0.5
  },

  shadowmap: {
    fov: 90
  },

  position: [0, 10, 10]
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.5
  }
}).addTo(world);

sphere.addTo(world);
plane.addTo(world);

world.start(); // Start animations and physics simulation.
world.setControls(WHS.orbitControls());

},{}]},{},[1]);
