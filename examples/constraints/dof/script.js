(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var GAME = new WHS.World({
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
    z: 100
  }
});

var halfMat = {
  kind: 'basic',
  transparent: true,
  opacity: 0.5
};

var box = new WHS.Box({
  geometry: {
    width: 30,
    height: 2,
    depth: 2
  },

  mass: 0,

  material: _extends({
    color: 0xffffff
  }, halfMat),

  position: {
    y: 40
  }
});

var box2 = new WHS.Box({
  geometry: {
    width: 30,
    height: 1,
    depth: 20
  },

  mass: 10,

  material: _extends({
    color: 0x0000ff
  }, halfMat),

  physics: {
    damping: 0.1
  },

  position: {
    y: 38,
    z: 12
  }
});

var pointer = new WHS.Sphere({ material: { color: 0x00ff00 } });
pointer.position.set(0, 60, -8);
pointer.addTo(GAME);

box.addTo(GAME);
box2.addTo(GAME);

var constraint = new WHS.DOFConstraint(box2, box, new THREE.Vector3(0, 38, 1));

GAME.scene.addConstraint(constraint);
constraint.enableAngularMotor(10, 20);

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
GAME.setControls(WHS.orbitControls());

},{}]},{},[1]);
