(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

var GAME = new WHS.World({
  stats: false,
  autoresize: "window",

  gravity: {
    x: 0,
    y: 0,
    z: 0
  },

  camera: {
    far: 2000,
    near: 1,
    z: 400,
    y: 100
  },

  background: {
    color: 0x2a3340
  }
});

window.space = new WHS.Group();
space.addTo(GAME);
space.rotation.z = Math.PI / 12;

var planet = new WHS.Tetrahedron({
  geometry: {
    radius: planetSize,
    detail: 2
  },

  mass: 100,

  material: {
    color: 0xee5624,
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000,
    kind: 'standard'
  }
});

planet.addTo(space);

// LIGHTS.
new WHS.AmbientLight({
  light: {
    color: 0x663344,
    intensity: 2
  }
}).addTo(GAME);

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
}).addTo(GAME);

var s1 = new WHS.Dodecahedron({
  geometry: {
    buffer: true,
    radius: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    emissive: 0x270000,
    roughness: 0.9,
    kind: 'standard'
  }
});

var s2 = new WHS.Box({
  geometry: {
    buffer: true,
    width: 10,
    height: 10,
    depth: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000,
    kind: 'standard'
  }
});

var s3 = new WHS.Cylinder({
  geometry: {
    buffer: true,
    radiusTop: 0,
    radiusBottom: 10,
    height: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000,
    kind: 'standard'
  }
});

var s4 = new WHS.Sphere({
  geometry: {
    buffer: true,
    radius: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000,
    kind: 'standard'
  }
});

var asteroids = new WHS.Group();
asteroids.addTo(space);

// Materials.
var mat = [new THREE.MeshPhongMaterial({ color: colors.green, shading: THREE.FlatShading }), new THREE.MeshPhongMaterial({ color: colors.blue, shading: THREE.FlatShading }), new THREE.MeshPhongMaterial({ color: colors.orange, shading: THREE.FlatShading }), new THREE.MeshPhongMaterial({ color: colors.yellow, shading: THREE.FlatShading })];

for (var i = 0; i < particleCount; i++) {
  var particle = [s1, s2, s3, s4][Math.ceil(Math.random() * 3)].clone(),
      radius = particleMinRadius + Math.random() * (particleMaxRadius - particleMinRadius);

  particle.G_({
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

GAME.addLoop(animation);
GAME.setControls(WHS.orbitControls());

animation.start();

// Start rendering.
GAME.start();

},{}]},{},[1]);
