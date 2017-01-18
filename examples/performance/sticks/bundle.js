/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAmbient = addAmbient;
exports.addBasicLights = addBasicLights;
exports.addPlane = addPlane;
exports.addBoxPlane = addBoxPlane;
var $world = exports.$world = {
  stats: 'fps', // fps, ms, mb or false if not need.
  autoresize: 'window',

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _globals = __webpack_require__(0);

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var world = new WHS.App([new WHS.app.ElementModule(), new WHS.app.SceneModule(), new WHS.app.CameraModule({
  position: new THREE.Vector3(0, 10, 50)
}), new WHS.app.RenderingModule({
  bgColor: 0x162129,

  renderer: {
    antialias: true,
    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }
}), new PHYSICS.WorldModule({
  ammo: `${window.location.href}../../../vendor/ammo.js`
}), new WHS.OrbitControlsModule(), new WHS.app.AutoresizeModule()]);

var stick = new WHS.Box({
  geometry: {
    width: 5,
    height: 1,
    depth: 1
  },

  material: new THREE.MeshPhongMaterial({ color: UTILS.$colors.mesh }),

  modules: [new PHYSICS.BoxModule({
    mass: 1,
    restitution: 0,
    friction: 0.5,
    state: 4
  })],

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
      var newStick = stick.clone(false, true);
      var newStick2 = stick2.clone(false, true);

      newStick.material.color.add(new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(0.2));
      newStick2.material.color.add(new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(0.2));

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

var sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [new PHYSICS.SphereModule({
    mass: 10
  })],

  material: new THREE.MeshStandardMaterial({
    emissive: 0xaaaaaa,
    color: UTILS.$colors.mesh,
    metalness: 0.8,
    roughness: 0.5
  }),

  position: {
    x: -20,
    y: 3
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

world.start();

/***/ }
/******/ ]);