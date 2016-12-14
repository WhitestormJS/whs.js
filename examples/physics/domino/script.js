(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _globals = require('./globals');

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var world = new (PHYSICS.$world(WHS.World))(_extends({}, UTILS.$world, {

  camera: {
    far: 10000,
    position: [62, 30, 130]
  }
}));

new WHS.Sphere({
  geometry: [4, 32, 32],

  mass: 5,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong',
    rest: 0
  },

  position: [0, 100, 0]
}).addTo(world);

var tramplin = new WHS.Box({
  geometry: {
    height: 2,
    width: 20,
    depth: 4
  },

  mass: 0,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong',
    rest: 0
  },

  position: {
    x: 0,
    y: 4,
    z: 0
  },

  rotation: {
    z: -Math.PI / 6
  }
});

tramplin.rotation = new THREE.Euler(0, 0, -Math.PI / 6);

tramplin.addTo(world);

var tramplin2 = tramplin.clone();
tramplin2.position.y = 44;
tramplin2.addTo(world);

var tramplin3 = tramplin.clone();
tramplin3.position.set(24, 24, 0);
tramplin3.rotation.z = Math.PI / 6;
tramplin3.addTo(world);

var domino = new WHS.Box({
  geometry: {
    height: 8,
    width: 1,
    depth: 4
  },

  mass: 5,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong',
    rest: 0.5,
    fri: 1
  },

  position: {
    x: 20,
    y: 4,
    z: 0
  }
});

var d = domino.clone();
for (var i = 0; i < 13; i++) {
  d = d.clone();
  d.position.x += 8;
  d.addTo(world);
}

UTILS.addBoxPlane(world, 250).then(function (o) {
  return o.position.y = -0.5;
});
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();

},{"./globals":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAmbient = addAmbient;
exports.addBasicLights = addBasicLights;
exports.addPlane = addPlane;
exports.addBoxPlane = addBoxPlane;
var $world = exports.$world = {
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: "window",

  gravity: [0, -100, 0],

  camera: {
    position: [0, 10, 50]
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  }
};

var $colors = exports.$colors = {
  bg: 0x162129,
  plane: 0x447F8B,
  mesh: 0xF2F2F2,
  softbody: 0x434B7F
};

function addAmbient(world, intensity) {
  new WHS.AmbientLight({
    light: {
      intensity: intensity
    }
  }).addTo(world);
}

function addBasicLights(world) {
  var intensity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 10, 10];
  var distance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

  addAmbient(world, 1 - intensity);

  return new WHS.PointLight({
    light: {
      intensity: intensity,
      distance: distance
    },

    shadowmap: {
      fov: 90
    },

    position: position
  }).addTo(world);
}

function addPlane(world) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  WHS.PlanePhysics = PHYSICS.RigidbodyComponent(WHS.Plane);

  return new WHS.PlanePhysics({
    geometry: {
      width: size,
      height: size
    },

    physics: {
      create: PHYSICS.createPlane
    },

    mass: 0,

    material: {
      color: 0x447F8B,
      kind: 'phong'
    },

    rotation: {
      x: -Math.PI / 2
    }
  }).addTo(world);
}

function addBoxPlane(world) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  return new WHS.Box({
    geometry: {
      width: size,
      height: 1,
      depth: size
    },

    mass: 0,

    material: {
      color: 0x447F8B,
      kind: 'phong'
    }
  }).addTo(world);
}

},{}]},{},[1]);
