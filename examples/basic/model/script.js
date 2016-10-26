(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _globals = require('./globals');

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var GAME = new WHS.World(_extends({}, UTILS.$world, {

  camera: {
    far: 10000,
    y: 100,
    z: 300
  }
}));

var teapot = new WHS.Model({
  geometry: {
    path: '../../_assets/models/teapot/utah-teapot-large.json',
    physics: '../../_assets/models/teapot/utah-teapot-light.json'
  },

  mass: 200,

  physics: {
    type: 'concave',
    friction: 1,
    restitution: 0.5
  },

  material: {
    kind: 'phong',
    shading: THREE.SmoothShading,
    map: WHS.texture('../../_assets/textures/teapot.jpg', { repeat: { x: 1, y: 1 } }),
    side: THREE.DoubleSide,
    useCustomMaterial: true
  },

  position: {
    y: 100
  },

  scale: [4, 4, 4]
});

var ball = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 16,
    heightSegments: 16
  },

  mass: 60,

  material: {
    kind: 'phong',
    color: UTILS.$colors.mesh
  },

  physics: {
    restitution: 1
  },

  position: [10, 250, -1.969]
});

teapot.addTo(GAME).then(function () {
  ball.addTo(GAME);
});

UTILS.addBoxPlane(GAME, 500);

new WHS.SpotLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 1,
    distance: 300,
    angle: 180
  },

  shadowmap: {
    fov: 90
  },

  position: {
    x: 0,
    y: 150,
    z: 50
  }
}).addTo(GAME);

UTILS.addAmbient(GAME, 0.3);

GAME.setControls(WHS.orbitControls());
GAME.start();

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
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  }
};

var $colors = exports.$colors = {
  bg: 0x162129,
  plane: 0x447F8B,
  mesh: 0xF2F2F2
};

function addAmbient(world, intensity) {
  new WHS.AmbientLight({
    light: {
      intensity: intensity
    }
  }).addTo(world);
}

function addBasicLights(world) {
  var intensity = arguments.length <= 1 || arguments[1] === undefined ? 0.5 : arguments[1];
  var position = arguments.length <= 2 || arguments[2] === undefined ? [0, 10, 10] : arguments[2];

  new WHS.PointLight({
    light: {
      intensity: intensity
    },

    shadowmap: {
      fov: 90
    },

    position: [0, 10, 10]
  }).addTo(world);

  addAmbient(world, 1 - intensity);
}

function addPlane(world) {
  var size = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

  new WHS.Plane({
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
  var size = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

  new WHS.Box({
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
