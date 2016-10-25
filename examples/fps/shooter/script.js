(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// TODO: import Terrain from 'whs-component-terrain';

var GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 1000
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  },

  background: {
    color: 0x70DBFF
  }
});

var terrain = new Terrain({
  geometry: {
    map: '../../_assets/terrain/default_terrain.png',
    depth: 100,
    width: 256,
    height: 256
  },

  mass: 0,

  physics: {
    friction: 1,
    restitution: 0
  },

  material: ['default', [WHS.texture('../../_assets/textures/terrain/dirt-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/sand-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/grass-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/rock-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/snow-512.jpg', {})]],

  position: {
    x: 0,
    y: 0,
    z: 0
  }
});

terrain.addTo(GAME, 'wait');

// NOTE: Default light.
new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.2
  }
}).addTo(GAME);

// NOTE: Default light.
new WHS.SpotLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 0.3,
    distance: 500
  },

  shadowmap: {
    width: 2048,
    height: 2048,
    top: 0,
    fov: 90
  },

  position: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
}).addTo(GAME);

var parrot = new WHS.Morph({

  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: '../../_assets/models/morph/parrot.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  position: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 0.4,
    speed: 200
  }

});

var parrotPath = [new THREE.CubicBezierCurve3(new THREE.Vector3(-100, 100, 50), new THREE.Vector3(-200, 120, -50), new THREE.Vector3(200, 120, -50), new THREE.Vector3(100, 100, 50)), new THREE.CubicBezierCurve3(new THREE.Vector3(100, 100, 50), new THREE.Vector3(-200, 80, 150), new THREE.Vector3(200, 60, 150), new THREE.Vector3(-100, 100, 50))];

var parrotgoes = new THREE.CurvePath();

parrotgoes.add(parrotPath[0]);
parrotgoes.add(parrotPath[1]);

var flamingo = new WHS.Morph({
  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: '../../_assets/models/morph/flamingo.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  position: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 2,
    speed: 50
  }
});

var flamingoPath = [new THREE.CubicBezierCurve3(new THREE.Vector3(-100, 100, 50), new THREE.Vector3(-100, 160, 300), new THREE.Vector3(200, 180, 30), new THREE.Vector3(100, 140, 80)), new THREE.CubicBezierCurve3(new THREE.Vector3(100, 140, 80), new THREE.Vector3(200, 80, 150), new THREE.Vector3(-200, 60, -100), new THREE.Vector3(200, 100, 350)), new THREE.CubicBezierCurve3(new THREE.Vector3(200, 100, 350), new THREE.Vector3(200, 80, 150), new THREE.Vector3(-200, 60, -100), new THREE.Vector3(-100, 100, 50))];

var flamingogoes = new THREE.CurvePath();

flamingogoes.add(flamingoPath[0]);
flamingogoes.add(flamingoPath[1]);
flamingogoes.add(flamingoPath[2]);

flamingo.addTo(GAME, 'wait').then(function (obj) {
  obj.follow(parrotgoes, // flamingogoes
  26000, true);
});

parrot.addTo(GAME, 'wait').then(function (obj) {
  obj.follow(flamingogoes, 20000, true);
});

new WHS.Skybox({
  path: '../../_assets/textures/skybox/skymap',
  imgSuffix: '.png',
  skyType: 'sphere',
  radius: GAME.camera.params.camera.far,
  rotation: { y: Math.PI / 180 * -90 },
  position: { y: -200 }
}).addTo(GAME);

var box = new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,
  onlyvis: false,

  material: {
    kind: 'lambert',
    map: WHS.texture('../../_assets/textures/box.jpg')
  },

  position: {
    x: 50,
    y: 70,
    z: 60
  }
});

GAME.add(box).then(function () {
  var checker1 = new WHS.Loop(function () {
    if (box.position.y < -200) {
      box.position.set(50, 70, 60);

      box.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      box.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  GAME.addLoop(checker1);

  checker1.start();
});

new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,

  material: {
    kind: 'lambert',
    map: WHS.texture('../../_assets/textures/box.jpg')
  },

  position: {
    x: 30,
    y: 50,
    z: 0
  }
}).addTo(GAME);

var person = new WHS.Sphere({
  geometry: {
    radius: 2
  },

  mass: 10,

  physics: {
    friction: 1,
    restitution: 0,
    damping: 0
  },

  material: {
    color: 0xffffff,
    kind: 'lambert'
  },

  position: {
    x: 0,
    y: 100,
    z: 0
  }
});

GAME.add(person).then(function () {
  var checker2 = new WHS.Loop(function () {
    if (person.position.y < -200) {
      person.position.set(0, 100, 0);

      person.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      person.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  GAME.addLoop(checker2);

  checker2.start();
});

GAME.setControls(WHS.firstPersonControls(person, {
  speed: 3
}));

GAME.start();

},{}]},{},[1]);
