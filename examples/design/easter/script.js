(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var GAME = new WHS.World({
  autoresize: "window",

  gravity: {
    x: 0,
    y: -10,
    z: 0
  },

  camera: {
    far: 2000,
    near: 1,
    z: 20,
    x: -8,
    y: 5,

    aspect: 45
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  },

  background: {
    color: 0xffffff
  }
});

GAME.getCamera().lookAt(new THREE.Vector3(0, 0, 0));

// Start rendering.
GAME.start();

new WHS.Box({
  geometry: {
    width: 100,
    height: 1,
    depth: 100
  },

  mass: 0,

  material: {
    kind: 'phong',
    color: 0xffffff
  },

  pos: {
    x: 0,
    y: -1,
    z: 0
  }
}).addTo(GAME);

var egg = new WHS.Model({
  geometry: {
    path: '../../_assets/models/egg_light.json',
    physics: '../../_assets/models/egg_low.json'
  },

  mass: 10,

  material: {
    kind: 'lambert',
    map: WHS.texture('../../_assets/textures/easter/egg1.jpg'),
    color: 0xffffff,
    rest: 1
  },

  scale: {
    x: 1,
    y: 1,
    z: 1
  },

  pos: {
    y: 0,
    x: -10
  },

  rot: {
    x: Math.PI / 2,
    y: Math.PI / 8
  }
});

var rabbit = new WHS.Model({
  geometry: {
    path: '../../_assets/models/rabbit3.json',
    physics: '../../_assets/models/rabbit3_low.json'
  },

  material: {
    kind: 'lambert',
    side: THREE.DoubleSide,
    rest: 1
  },

  physics: {
    type: 'concave'
  },

  scale: {
    x: 0.5,
    y: 0.5,
    z: 0.5
  },

  pos: {
    y: 5,
    x: -3
  },

  rot: {
    x: Math.PI / 2
  }
});

rabbit.addTo(GAME, 'wait');

new WHS.SpotLight({
  light: {
    color: 0xffffff,
    decay: 1,
    distance: 150,
    intensity: 1
  },

  shadowmap: {
    left: -20,
    top: 20,
    bottom: -20,
    right: 20,

    bias: -0.0001,

    width: 4096,
    height: 4096,

    near: 1,
    far: 100,

    fov: 10
  },

  pos: {
    z: 20,
    x: 20,
    y: 20
  },

  target: {
    x: -10,
    y: 0,
    z: 0
  }
}).addTo(GAME);

new WHS.AmbientLight({
  light: {
    intensity: 0.9,
    color: 0xffffff
  }
}).addTo(GAME);

var egg2 = void 0,
    egg3 = void 0,
    egg4 = void 0,
    egg5 = void 0,
    egg6 = void 0,
    egg7 = void 0,
    egg8 = void 0,
    egg9 = void 0;

egg.addTo(GAME, 'wait').then(function (object) {
  egg2 = object.clone();
  console.log(egg2);
  egg2.M_({ map: new WHS.texture('../../_assets/textures/easter/egg2.jpg') });

  egg2.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg3 = object.clone();
  egg3.M_({ map: new WHS.texture('../../_assets/textures/easter/egg3.jpg') });

  egg3.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg4 = object.clone();
  egg4.M_({ map: new WHS.texture('../../_assets/textures/easter/egg4.jpg') });

  egg4.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0);
    obj.position.setZ(-1.5);
  });

  egg5 = object.clone();
  egg5.M_({ map: new WHS.texture('../../_assets/textures/easter/egg1.jpg') });

  egg5.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(2.5);
  });

  egg6 = object.clone();
  egg6.M_({ map: new WHS.texture('../../_assets/textures/easter/egg2.jpg') });

  egg6.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0.5);
    obj.position.setZ(1.5);
  });

  egg7 = object.clone();
  egg7.M_({ map: new WHS.texture('../../_assets/textures/easter/egg3.jpg') });

  egg7.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(-1.5);
  });

  egg8 = object.clone();
  egg8.M_({ map: new WHS.texture('../../_assets/textures/easter/egg4.jpg') });

  egg8.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(1);
    obj.position.setZ(2.5);
  });

  egg9 = object.clone();
  egg9.M_({ map: new WHS.texture('../../_assets/textures/easter/egg1.jpg') });

  egg9.addTo(GAME, 'wait').then(function (obj) {
    obj.wrap('no-transforms');

    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(3);
    obj.position.setZ(-1.5);
  });
});

document.body.addEventListener('mousemove', function (e) {
  GAME.getCamera().position.x = -8 + (e.screenX - window.innerWidth / 2) / 40;
  GAME.getCamera().position.y = 5 + (e.screenY - window.innerHeight / 2) / 80;
  GAME.getCamera().lookAt(new THREE.Vector3(-4, 0, 0));
});

document.body.addEventListener('click', function () {
  rabbit.setLinearVelocity(new THREE.Vector3(0, 5, 0));
  egg.setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg2.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg3.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg4.setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg5.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg6.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg7.setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg8.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg9.setAngularVelocity(new THREE.Vector3(0, -10, 0));
});

},{}]},{},[1]);
