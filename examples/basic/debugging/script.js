(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _globals = require('./globals');

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var world = new WHS.World(_extends({}, UTILS.$world, {

  helpers: {
    grid: {
      size: 100,
      step: 100,
      color1: 0xff0000
    },
    axis: {
      size: 100
    }
  },

  camera: {
    far: 10000,
    position: [0, 10, 30]
  }
}));

var sphere = new WHS.Sphere({
  geometry: {
    radius: 2,
    widthSegments: 16,
    heightSegments: 16
  },

  mass: 0,
  physics: false,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: [0, 10, 0]
});

sphere.wait().then(function () {
  var boxHelper = sphere.clone();
  boxHelper.addTo(world);
  boxHelper.addHelper('box');

  var faceNormalsHelper = sphere.clone();
  faceNormalsHelper.position.x = 10;
  faceNormalsHelper.addTo(world);
  faceNormalsHelper.addHelper('faceNormals', { color: 0x0000ff, size: 0.5 });

  var vertexNormalsHelper = sphere.clone();
  vertexNormalsHelper.position.set(10, 10, 10);
  vertexNormalsHelper.addTo(world);
  vertexNormalsHelper.addHelper('vertexNormals', { color: 0x00ff00, size: 0.5 });

  window.boundingBoxHelper = sphere.clone();
  boundingBoxHelper.params.physics = WHS.physicsDefaults;
  boundingBoxHelper.wrap();
  boundingBoxHelper.build();

  boundingBoxHelper.position.y = 10;
  boundingBoxHelper.position.z = 10;
  boundingBoxHelper.native.mass = 10;
  boundingBoxHelper.addTo(world);
  boundingBoxHelper.addHelper('boundingBox', { color: 0x00ffff });

  new WHS.Loop(function () {
    return boundingBoxHelper.updateHelper('boundingBox');
  }).start(world);
});

UTILS.addPlane(world, 250);
UTILS.addBasicLights(world, 0.5, [0, 50, 50], 200).then(function (o) {
  o.addHelper('default', { size: 1 });
});

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

  return new WHS.Plane({
    geometry: {
      width: size,
      height: size
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
