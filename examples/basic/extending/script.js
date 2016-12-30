(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _globals = require('./globals');

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

WHS.Component.prototype.changeColor = function (world) {
  var object = this,
      color = new THREE.Color();

  var animation = new WHS.Loop(function () {
    object.material.color = color;

    if (color.r <= 1) color.r += 0.01;
    if (color.g >= 0) color.g -= 0.01;
    if (color.b >= 0) color.b -= 0.01;
    if (color.r >= 1) {
      (function () {
        animation.stop(world);

        object.material.color.setRGB(1, 0, 0);

        var animation2 = new WHS.Loop(function () {
          object.material.color = color;
          if (color.r >= 0) color.r -= 0.01;
          if (color.g <= 1) color.g += 0.01;
          if (color.b >= 0) color.b -= 0.01;
          if (color.r <= 0 && color.g >= 1) {
            (function () {
              animation2.stop(world);

              object.material.color.setRGB(1, 0, 0);
              var animation3 = new WHS.Loop(function () {
                object.material.color = color;
                if (color.r >= 0) color.r -= 0.01;
                if (color.g >= 0) color.g -= 0.01;
                if (color.b <= 1) color.b += 0.01;
                if (color.g <= 0 && color.b >= 1) {
                  animation3.stop(world);

                  object.material.color.setRGB(0, 0, 1);
                  animation.start(world);
                }
              });

              animation3.start(world);
            })();
          }
        });

        animation2.start(world);
      })();
    }
  });

  animation.start(world);
};

var world = new (PHYSICS.$world(WHS.World))(_extends({}, UTILS.$world, {

  physics: {
    ammo: 'http://localhost:8001/vendor/ammo.js'
  },

  camera: {
    far: 10000,
    position: [0, 10, 30]
  }
}));

var torus = new WHS.Torus({
  geometry: {
    radius: 5,
    tube: 2
  },

  mass: 0,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    x: 0,
    y: 10,
    z: 0
  }
});

world.add(torus);

torus.changeColor(world);

UTILS.addBoxPlane(world, 250);
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

  modules: [new WHS.modules.ElementModule(), new WHS.modules.SceneModule(), new WHS.modules.RenderingModule(), new WHS.modules.CameraModule()],

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

  return new (PHYSICS.$rigidBody(WHS.Plane, PHYSICS.PLANE))({
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

  return new (PHYSICS.$rigidBody(WHS.Box, PHYSICS.BOX))({
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
