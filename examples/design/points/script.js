(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var world = new WHS.World({
  autoresize: "window",

  gravity: {
    x: 0,
    y: -10,
    z: 0
  },

  camera: {
    far: 2000,
    near: 1,
    z: 20,
    x: -8,
    y: 5,

    aspect: 45
  },

  rendering: {
    background: {
      color: 0xffffff
    }
  }
});

var data = new Float32Array(3993000);
var colors = new Float32Array(3993000);

var i = 0;
for (var x = 0; x <= 100; x++) {
  for (var y = 0; y <= 100; y++) {
    for (var z = 0; z <= 100; z++) {
      data[i * 3] = x;
      data[i * 3 + 1] = y;
      data[i * 3 + 2] = z;
      colors[i * 3] = x / 100;
      colors[i * 3 + 1] = y / 100;
      colors[i * 3 + 2] = z / 100;
      i++;
    }
  }
}

var geom = new THREE.BufferGeometry();

geom.addAttribute('position', new THREE.BufferAttribute(data, 3));
geom.addAttribute('color', new THREE.BufferAttribute(colors, 3));

var points = new WHS.Shape(new THREE.Points(geom, new THREE.PointsMaterial({ vertexColors: THREE.VertexColors, size: 0.1 })));

points.addTo(world);

world.setControls(new WHS.OrbitControls(new THREE.Vector3(50, 50, 50)));

// Start rendering.
world.start();

},{}]},{},[1]);
