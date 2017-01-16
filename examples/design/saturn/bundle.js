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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";

var radiusMin = 110,
    // Min radius of the asteroid belt.
radiusMax = 220,
    // Max radius of the asteroid belt.
particleCount = 400,
    // Ammount of asteroids.
particleMinRadius = 0.1,
    // Min of asteroid radius.
particleMaxRadius = 4,
    // Max of asteroid radius.
planetSize = 50; // Radius of planet.

var colors = {
  green: 0x8fc999,
  blue: 0x5fc4d0,
  orange: 0xee5624,
  yellow: 0xfaff70
};

var world = new WHS.App([new WHS.modules.ElementModule(), new WHS.modules.SceneModule(), new WHS.modules.CameraModule({
  position: new THREE.Vector3(0, 100, 400),
  far: 2000,
  near: 1
}), new WHS.modules.RenderingModule({
  bgColor: 0x2a3340,

  renderer: {
    antialias: true,
    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }
}), new WHS.OrbitControlsModule(), new WHS.modules.AutoresizeModule()]);

var space = new WHS.Group();
space.addTo(world);
space.rotation.z = Math.PI / 12;

var planet = new WHS.Tetrahedron({
  geometry: {
    radius: planetSize,
    detail: 2
  },

  material: new THREE.MeshStandardMaterial({
    color: 0xee5624,
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000
  })
});

planet.addTo(space);

// LIGHTS.
new WHS.AmbientLight({
  light: {
    color: 0x663344,
    intensity: 2
  }
}).addTo(world);

new WHS.DirectionalLight({
  light: {
    color: 0xffffff,
    intensity: 1.5,
    distance: 800
  },

  shadowmap: {
    width: 2048,
    height: 2048,

    left: -800,
    right: 800,
    top: 800,
    bottom: -800,
    far: 800
  },

  position: {
    x: 300,
    z: 300,
    y: 100
  }
}).addTo(world);

var s1 = new WHS.Dodecahedron({
  geometry: {
    buffer: true,
    radius: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    emissive: 0x270000,
    roughness: 0.9
  })
});

var s2 = new WHS.Box({
  geometry: {
    buffer: true,
    width: 10,
    height: 10,
    depth: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000
  })
});

var s3 = new WHS.Cylinder({
  geometry: {
    buffer: true,
    radiusTop: 0,
    radiusBottom: 10,
    height: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000
  })
});

var s4 = new WHS.Sphere({
  geometry: {
    buffer: true,
    radius: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000
  })
});

var asteroids = new WHS.Group();
asteroids.addTo(space);

// Materials.
var mat = [new THREE.MeshPhongMaterial({ color: colors.green, shading: THREE.FlatShading }), new THREE.MeshPhongMaterial({ color: colors.blue, shading: THREE.FlatShading }), new THREE.MeshPhongMaterial({ color: colors.orange, shading: THREE.FlatShading }), new THREE.MeshPhongMaterial({ color: colors.yellow, shading: THREE.FlatShading })];

for (var i = 0; i < particleCount; i++) {
  var particle = [s1, s2, s3, s4][Math.ceil(Math.random() * 3)].clone(),
      radius = particleMinRadius + Math.random() * (particleMaxRadius - particleMinRadius);

  particle.g_({
    radiusBottom: radius,
    radiusTop: 0,
    height: particle instanceof WHS.Cylinder ? radius * 2 : radius,
    width: radius,
    depth: radius,
    radius: radius
  });

  particle.material = mat[Math.floor(4 * Math.random())]; // Set custom THREE.Material to mesh.

  // Particle data.
  particle.data = {
    distance: radiusMin + Math.random() * (radiusMax - radiusMin),
    angle: Math.random() * Math.PI * 2
  };

  // Set position & rotation.
  particle.position.x = Math.cos(particle.data.angle) * particle.data.distance;
  particle.position.z = Math.sin(particle.data.angle) * particle.data.distance;
  particle.position.y = -10 * Math.random() + 4;

  particle.rotation.set(Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random());

  particle.addTo(asteroids);
}

// Animating rotating shapes around planet.
var particles = asteroids.children;
console.log(asteroids);

var animation = new WHS.Loop(function () {
  for (var _i = 0, max = particles.length; _i < max; _i++) {
    var _particle = particles[_i];

    _particle.data.angle += 0.02 * _particle.data.distance / radiusMax;

    _particle.position.x = Math.cos(_particle.data.angle) * _particle.data.distance;
    _particle.position.z = Math.sin(_particle.data.angle) * _particle.data.distance;

    _particle.rotation.x += Math.PI / 60;
    _particle.rotation.y += Math.PI / 60;
  }

  planet.rotation.y += 0.005;
});

world.addLoop(animation);

animation.start();

// Start rendering.
world.start();

/***/ }
/******/ ]);