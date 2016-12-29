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

  softbody: true,

  gravity: [0, -10, 0]
}));

var tubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  emissive: 0x333333,
  roughness: 0.4
});

// TOP.
var toptube = new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(-30, 30, 0), new THREE.Vector3(30, 30, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
});

toptube.addTo(world);

// LEFT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(-29.5, 30.5, 0), new THREE.Vector3(-40, 0, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
}).addTo(world);

// RIGHT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(29.5, 30.5, 0), new THREE.Vector3(40, 0, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
}).addTo(world);

var sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 3,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  position: {
    x: -20,
    y: 10,
    z: 0
  }
});

var sphereHandler = [];

var _loop = function _loop(i) {
  var sc = sphere.clone();
  sc.position.x = -20 + i * 6;
  sc.material = sc.material.clone();
  sc.addTo(world);
  sphereHandler.push(sc);

  var v1 = sc.position.clone();
  var v2 = sc.position.clone();
  v2.y = 30;

  var rope = new WHS.Line({
    geometry: {
      curve: new THREE.LineCurve3(v1, v2)
    },

    physics: {
      piterations: 10,
      viterations: 10
    },

    mass: 1,

    softbody: true
  });

  rope.addTo(world).then(function () {
    rope.appendAnchor(world, toptube, 50, 1);
    rope.appendAnchor(world, sc, 0, 1);
  });
};

for (var i = 0; i < 5; i++) {
  _loop(i);
}

var sphereStart = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 3,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  position: {
    x: 25,
    y: 15,
    z: 0
  }
});

sphereStart.addTo(world);
sphereHandler.push(sphereStart);

var rope1 = new WHS.Line({
  geometry: {
    curve: new THREE.LineCurve3(sphereStart.position.clone(), new THREE.Vector3(10, 30, 0))
  },

  physics: {
    piterations: 10,
    viterations: 10
  },

  mass: 1,

  softbody: true
});

rope1.addTo(world);

rope1.appendAnchor(world, toptube, 50, 1);
rope1.appendAnchor(world, sphereStart, 0, 1);

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

  position: {
    x: 0,
    y: 0,
    z: 0
  },

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(world);

new WHS.SpotLight({
  light: {
    intensity: 6,
    distance: 100,
    angle: 90
  },

  position: {
    y: 50
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.6,
    color: 0xffffff
  }
}).addTo(world);

world.start();

// Check mouse.
var mouse = new WHS.VirtualMouse(world);

var _loop2 = function _loop2(i, max) {
  var nows = sphereHandler[i];
  mouse.track(nows);

  var dragged = void 0;

  nows.on('mouseover', function () {
    if (!dragged) nows.material.color.set(0xff0000);
  });

  nows.on('mouseout', function () {
    if (!dragged) nows.material.color.set(0xffffff);
  });

  nows.on('mousedown', function () {
    nows.material.color.set(0xff0000);
    dragged = true;
  });

  mouse.on('mouseup', function () {
    nows.material.color.set(0xffffff);
    dragged = false;
  });

  mouse.on('move', function () {
    if (dragged) nows.setLinearVelocity(mouse.project().sub(nows.position).multiplyScalar(3));
  });
};

for (var i = 0, max = sphereHandler.length; i < max; i++) {
  _loop2(i, max);
}

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
