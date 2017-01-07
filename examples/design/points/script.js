(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var world = new WHS.App([new WHS.modules.ElementModule(), new WHS.modules.SceneModule(), new WHS.modules.CameraModule({
  position: new THREE.Vector3(-8, 5, 20),
  far: 2000,
  near: 1,
  fov: 45
}), new WHS.modules.RenderingModule({
  bgColor: 0xffffff,

  renderer: {
    antialias: true,
    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }
}), new WHS.OrbitControlsModule({ target: new THREE.Vector3(50, 50, 50) }), new WHS.modules.AutoresizeModule()]);

var data = new Float32Array(3993000);
var colors = new Float32Array(3993000);

var i = 0;
for (var x = 0; x <= 100; x++) {
  for (var y = 0; y <= 100; y++) {
    for (var z = 0; z <= 100; z++) {
      data[i * 3] = x;
      data[i * 3 + 1] = y;
      data[i * 3 + 2] = z;
      colors[i * 3] = x / 100;
      colors[i * 3 + 1] = y / 100;
      colors[i * 3 + 2] = z / 100;
      i++;
    }
  }
}

var geom = new THREE.BufferGeometry();

geom.addAttribute('position', new THREE.BufferAttribute(data, 3));
geom.addAttribute('color', new THREE.BufferAttribute(colors, 3));

var Points = function (_WHS$MeshComponent) {
  _inherits(Points, _WHS$MeshComponent);

  function Points() {
    _classCallCheck(this, Points);

    return _possibleConstructorReturn(this, (Points.__proto__ || Object.getPrototypeOf(Points)).apply(this, arguments));
  }

  _createClass(Points, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new THREE.Points(params.geom, new THREE.PointsMaterial({ vertexColors: THREE.VertexColors, size: 0.1 }));
    }
  }]);

  return Points;
}(WHS.MeshComponent);

new Points({ geom: geom }).addTo(world);

// Start rendering.
world.start();

},{}]},{},[1]);
