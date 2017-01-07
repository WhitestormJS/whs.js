(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _globals = require('./globals');

var UTILS = _interopRequireWildcard(_globals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var world = new WHS.App([new WHS.modules.ElementModule(), new WHS.modules.SceneModule(), new PHYSICS.WorldModule({
  ammo: 'http://localhost:8001/vendor/ammo.js',
  gravity: {
    x: 0,
    y: -10,
    z: 0
  }
}), new WHS.modules.CameraModule({
  position: new THREE.Vector3(-8, 5, 20),
  fov: 45,
  far: 2000
}), new WHS.modules.RenderingModule({
  bgColor: 0xffffff,

  renderer: {
    antialias: true,
    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }
}), new WHS.modules.AutoresizeModule()]);

// world.$camera.lookAt(new THREE.Vector3(0, 0, 0));

// Start rendering.
world.start();

new WHS.Box({
  geometry: {
    width: 100,
    height: 1,
    depth: 100
  },
  modules: [new PHYSICS.BoxModule({
    mass: 0
  })],

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff
  }),

  position: {
    x: 0,
    y: -1,
    z: 0
  }
}).addTo(world);

var egg = new WHS.Model({
  geometry: {
    path: '../../_assets/models/easter/egg_light.json'
  },

  modules: [new PHYSICS.ConvexModule({
    path: '../../_assets/models/easter/egg_low.json'
  })],

  useCustomMaterial: true,

  material: new THREE.MeshPhongMaterial({
    shading: THREE.SmoothShading,
    map: WHS.texture('../../_assets/textures/easter/egg1.jpg'),
    side: THREE.DoubleSide
  }),

  position: {
    y: 0,
    x: -10
  },

  rotation: {
    x: Math.PI / 2,
    y: Math.PI / 8
  }
});

var rabbit = new WHS.Model({
  geometry: {
    path: '../../_assets/models/easter/rabbit.json'
  },

  modules: [new PHYSICS.ConcaveModule({
    path: '../../_assets/models/easter/rabbit_low.json',
    scale: new THREE.Vector3(0.5, 0.5, 0.5)
  })],

  material: new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    shading: THREE.SmoothShading
  }),

  position: {
    y: 5,
    x: -3
  },

  rotation: {
    x: Math.PI / 2
  },

  scale: [0.5, 0.5, 0.5]
});

rabbit.addTo(world, 'wait');

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

  position: {
    z: 20,
    x: 20,
    y: 20
  },

  target: {
    x: -10,
    y: 0,
    z: 0
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.9,
    color: 0xffffff
  }
}).addTo(world);

var egg2 = void 0,
    egg3 = void 0,
    egg4 = void 0,
    egg5 = void 0,
    egg6 = void 0,
    egg7 = void 0,
    egg8 = void 0,
    egg9 = void 0;

egg.addTo(world).then(function (object) {
  egg2 = object.clone(false, true);
  egg2.m_({ map: new WHS.texture('../../_assets/textures/easter/egg2.jpg') });

  egg2.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg3 = object.clone(false, true);
  egg3.m_({ map: new WHS.texture('../../_assets/textures/easter/egg3.jpg') });

  egg3.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg4 = object.clone(false, true);
  egg4.m_({ map: new WHS.texture('../../_assets/textures/easter/egg4.jpg') });

  egg4.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0);
    obj.position.setZ(-1.5);
  });

  egg5 = object.clone(false, true);
  egg5.m_({ map: new WHS.texture('../../_assets/textures/easter/egg1.jpg') });

  egg5.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(2.5);
  });

  egg6 = object.clone(false, true);
  egg6.m_({ map: new WHS.texture('../../_assets/textures/easter/egg2.jpg') });

  egg6.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0.5);
    obj.position.setZ(1.5);
  });

  egg7 = object.clone(false, true);
  egg7.m_({ map: new WHS.texture('../../_assets/textures/easter/egg3.jpg') });

  egg7.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(-1.5);
  });

  egg8 = object.clone(false, true);
  egg8.m_({ map: new WHS.texture('../../_assets/textures/easter/egg4.jpg') });

  egg8.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(1);
    obj.position.setZ(2.5);
  });

  egg9 = object.clone(false, true);
  egg9.m_({ map: new WHS.texture('../../_assets/textures/easter/egg1.jpg') });

  egg9.addTo(world).then(function (obj) {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(3);
    obj.position.setZ(-1.5);
  });
});

document.body.addEventListener('mousemove', function (e) {
  world.$camera.position.x = -8 + (e.screenX - window.innerWidth / 2) / 40;
  world.$camera.position.y = 5 + (e.screenY - window.innerHeight / 2) / 80;
  world.$camera.native.lookAt(new THREE.Vector3(-4, 0, 0));
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
