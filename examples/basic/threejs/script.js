(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",

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

  init: {
    scene: false
  }
});

var scene = new THREE.Scene();

var obj1 = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
obj1.position.set(6, 6, 0);

scene.add(obj1);

var obj2 = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
obj2.position.set(12, 6, 0);

scene.add(obj2);

var obj3 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
obj3.position.set(0, 0, 3);

// Nested object.
obj2.add(obj3);

GAME.importScene(scene, true);
GAME._initCamera();
GAME._initRenderer();
GAME._initHelpers();

var sphere = new WHS.Shape(new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff })));

sphere.addTo(GAME);
sphere.position.y = 3;

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

},{}]},{},[1]);
