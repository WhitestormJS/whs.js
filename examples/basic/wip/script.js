(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var GAME = new WHS.World({
  autoresize: true,
  softbody: true,

  gravity: {
    x: 0,
    y: -9.8,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  },

  background: {
    opacity: 0
  },

  rWidth: 1.5,
  rHeight: 1.5,

  renderer: {
    alpha: true
  }
});

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

toptube.addTo(GAME);

// LEFT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(-29.5, 30.5, 0), new THREE.Vector3(-40, 0, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
}).addTo(GAME);

// RIGHT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(29.5, 30.5, 0), new THREE.Vector3(40, 0, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
}).addTo(GAME);

var envMap = WHS.texture('img/background.jpg');
envMap.mapping = THREE.SphericalReflectionMapping;

var sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 3,

  material: {
    color: 0xffffff,
    kind: 'basic',
    envMap: envMap,
    refractionRatio: 0.95
  },

  pos: {
    x: -20,
    y: 10,
    z: 0
  }
});

for (var i = 0; i < 5; i++) {
  var sc = sphere.clone();
  sc.position.x = -20 + i * 6;
  sc.addTo(GAME);

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

  rope.addTo(GAME);

  rope.appendAnchor(GAME, toptube, 50, 1);
  rope.appendAnchor(GAME, sc, 0, 1);
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
    kind: 'basic',
    envMap: envMap,
    refractionRatio: 0.95
  },

  pos: {
    x: 25,
    y: 15,
    z: 0
  }
});

sphereStart.addTo(GAME);

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

rope1.addTo(GAME);

rope1.appendAnchor(GAME, toptube, 50, 1);
rope1.appendAnchor(GAME, sphereStart, 0, 1);

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

  pos: {
    x: 0,
    y: 0,
    z: 0
  },

  rot: {
    x: -Math.PI / 2
  }
}).addTo(GAME);

new WHS.SpotLight({
  light: {
    intensity: 6,
    distance: 100,
    angle: 90
  },

  pos: {
    y: 50
  }
}).addTo(GAME);

new WHS.AmbientLight({
  light: {
    intensity: 0.6,
    color: 0xffffff
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());

GAME.start();

// Check mouse.

window.addEventListener('mousemove', function (e) {
  sphereStart.setLinearVelocity({ x: e.movementX, y: 0, z: 0 });
});

},{}]},{},[1]);
