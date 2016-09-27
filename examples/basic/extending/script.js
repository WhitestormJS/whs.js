(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

var GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",

  gravity: {
    x: 0,
    y: -50,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  }
});

var torus = new WHS.Torus({
  geometry: {
    radius: 5,
    tube: 2
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'phong'
  },

  position: {
    x: 0,
    y: 10,
    z: 0
  }
});

GAME.add(torus);

torus.changeColor(GAME);

new WHS.Box({

  geometry: {
    width: 250,
    height: 1,
    depth: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'phong'
  },

  position: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

new WHS.DirectionalLight({
  color: 0xffffff, // 0x00ff00,
  intensity: 2,

  position: {
    x: 0,
    y: 10,
    z: 30
  },

  target: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());
GAME.start();

},{}]},{},[1]);
