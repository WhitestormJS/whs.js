(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _globals = require('./globals');

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var world = new (PHYSICS.$world(WHS.World))(_extends({}, UTILS.$world, {

  physics: {
    ammo: 'http://localhost:8001/vendor/ammo.js'
  },

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 1000,
    position: [0, 30, 90]
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  } // ,

  // physics: {
  //   broadphase: {type: 'sweepprune'}
  // }
}));

var stick = new (PHYSICS.$rigidBody(WHS.Box, PHYSICS.BOX))({
  geometry: {
    width: 5,
    height: 1,
    depth: 1
  },

  mass: 1,

  material: {
    kind: 'phong',
    color: UTILS.$colors.mesh
  },

  physics: {
    restitution: 0,
    friction: 0.5,
    state: 4
  },

  shadow: {
    cast: false,
    receive: false
  },

  position: {
    y: 0.5
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
        newStick.position.set(1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);

        newStick2.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick2.position.set(-1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);
      } else {
        newStick.position.y = 0.5 + delta + (1 + delta) * i;
        newStick2.position.y = 0.5 + delta + (1 + delta) * i;
        newStick.position.z = 6 * j;
        newStick2.position.z = 2 + 6 * j;
        newStick.position.x = newStick2.position.x = 6 * k;
      }

      objects += 2;

      newStick.addTo(world);
      newStick2.addTo(world);
    }
  }
}

document.querySelector('.object_count').innerText = objects + ' objects';

var sphere = new (PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.BOX))({
  geometry: {
    radius: 1,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    x: -20,
    y: 1
  }
});

sphere.addTo(world).then(function (sphere) {
  var mx = 60,
      mz = 20;

  sphere.setAngularVelocity({ x: mx, y: 0, z: mz });
  sphere.setLinearVelocity({ x: mx, y: 0, z: mz });
});

UTILS.addBoxPlane(world, 250).then(function (o) {
  o.position.y = -1;
});
UTILS.addBasicLights(world, 0.5, [100, 100, 100], 200);

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

    modules: [new PHYSICS.PlaneModule({
      mass: 0
    })],

    material: new THREE.MeshPhongMaterial({ color: 0x447F8B }),

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

    modules: [new PHYSICS.BoxModule({
      mass: 0
    })],

    material: new THREE.MeshPhongMaterial({ color: 0x447F8B })
  }).addTo(world);
}

},{}]},{},[1]);
