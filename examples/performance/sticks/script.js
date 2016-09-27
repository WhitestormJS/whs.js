(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 1000,
    y: 10,
    z: 30
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  },

  physics: {
    broadphase: { type: 'sweepprune' }
  },

  rHeight: 1.5,
  rWidth: 1.5,

  background: {
    color: 0xaaaaaa
  }
});

var stick = new WHS.Box({
  geometry: {
    width: 5,
    height: 1,
    depth: 1
  },

  mass: 1,

  material: {
    kind: 'phong',
    map: WHS.texture('../../_assets/textures/retina_wood.jpg'),
    specularMap: WHS.texture('../../_assets/textures/SpecularMap.png'),
    normalMap: WHS.texture('../../_assets/textures/NormalMap.png'),
    shininess: 0
  },

  physics: {
    restitution: 0,
    friction: 0.5,
    state: 4
  },

  position: {
    y: 0.5
  }
});

var stick2 = stick.clone();
stick2.position.set(0, 4, 20);

var height = 10; // BASE: 6, 0, 2, 2.
var delta = 0;
var cols = 8,
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

      newStick.addTo(GAME);
      newStick2.addTo(GAME);
    }
  }
}

document.querySelector('.object_count').innerText = objects + ' objects';

window.sphere = new WHS.Sphere({
  geometry: {
    radius: 1,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 100,

  material: {
    color: 0x000ff,
    kind: 'phong'
  },

  position: {
    x: -20,
    y: 1
  }
});

window.sphere.addTo(GAME).then(function (sphere) {
  var mx = 60,
      mz = 40;

  sphere.setAngularVelocity({ x: mx, y: 0, z: mz });
  sphere.setLinearVelocity({ x: mx, y: 0, z: mz });
});

window.ground = new WHS.Box({
  geometry: {
    width: 250,
    height: 5,
    depth: 250
  },

  mass: 0,

  material: {
    map: WHS.texture('../../_assets/textures/metal.png', { repeat: { x: 20, y: 20 } }),
    normalMap: WHS.texture('../../_assets/textures/NormalMap_metal.png', { repeat: { x: 20, y: 20 } }),
    kind: 'phong'
  },

  physics: {
    margin: 1
  },

  position: {
    x: 0,
    y: -3,
    z: 0
  }
});
window.ground.addTo(GAME);

var light = new WHS.DirectionalLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 1,
    distance: 400
  },

  shadowmap: {
    far: 250,

    left: -40,
    right: 40
  },

  position: {
    x: 0,
    y: 100,
    z: 300
  }
});

light.addTo(GAME);

console.log(light);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.2
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());
GAME.start();

},{}]},{},[1]);
