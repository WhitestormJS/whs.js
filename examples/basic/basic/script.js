(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _index = require('../lib/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GAME = new _index2.default.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  },

  paths: {
    worker: '../../libs/physijs_worker.js',
    ammo: '../../libs/ammo.js'
  }
});

var sphere = new _index2.default.Sphere({
  geometry: {
    radius: 3
  },

  mass: 10,
  onlyvis: false,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
});

var plane = new _index2.default.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 0,
    z: 0
  },

  rot: {
    x: -Math.PI / 2
  }
});

GAME.add(sphere);
GAME.add(plane);
GAME.start(plane);

},{"../lib/index":19}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeCamera = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Camera2 = require('../core/Camera');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var CubeCamera = function (_Camera) {
  (0, _inherits3.default)(CubeCamera, _Camera);

  function CubeCamera() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, CubeCamera);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CubeCamera).call(this, params, 'cubecamera'));

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(CubeCamera.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(CubeCamera, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new Promse(function (resolve) {
        _this2.setNative(new THREE.CubeCamera(params.camera.near, params.camera.far, params.camera.cubeResolution));

        resolve();
      });
    }
  }]);
  return CubeCamera;
}(_Camera2.Camera);

exports.CubeCamera = CubeCamera;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Camera":6,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrtographicCamera = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Camera2 = require('../core/Camera');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var OrtographicCamera = function (_Camera) {
  (0, _inherits3.default)(OrtographicCamera, _Camera);

  function OrtographicCamera() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, OrtographicCamera);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(OrtographicCamera).call(this, params, 'ortographiccamera'));

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(OrtographicCamera.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(OrtographicCamera, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new _promise2.default(function (resolve) {
        _this2.setNative(new THREE.OrtographicCamera(params.camera.left, params.camera.right, params.camera.top, params.camera.bottom, params.camera.near, params.camera.far));

        resolve();
      });
    }
  }]);
  return OrtographicCamera;
}(_Camera2.Camera);

exports.OrtographicCamera = OrtographicCamera;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Camera":6,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCamera = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Camera2 = require('../core/Camera');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var PerspectiveCamera = function (_Camera) {
  (0, _inherits3.default)(PerspectiveCamera, _Camera);

  function PerspectiveCamera() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, PerspectiveCamera);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PerspectiveCamera).call(this, params, 'perspectivecamera'));

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(PerspectiveCamera.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(PerspectiveCamera, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new _promise2.default(function (resolve) {
        _this2.setNative(new THREE.PerspectiveCamera(params.camera.fov, params.camera.aspect, params.camera.near, params.camera.far));

        resolve();
      });
    }
  }]);
  return PerspectiveCamera;
}(_Camera2.Camera);

exports.PerspectiveCamera = PerspectiveCamera;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Camera":6,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],5:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CubeCamera = require('./CubeCamera');

(0, _keys2.default)(_CubeCamera).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _CubeCamera[key];
    }
  });
});

var _OrtographicCamera = require('./OrtographicCamera');

(0, _keys2.default)(_OrtographicCamera).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _OrtographicCamera[key];
    }
  });
});

var _PerspectiveCamera = require('./PerspectiveCamera');

(0, _keys2.default)(_PerspectiveCamera).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _PerspectiveCamera[key];
    }
  });
});


},{"./CubeCamera":2,"./OrtographicCamera":3,"./PerspectiveCamera":4,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Loop = require('../extensions/Loop');

var _defaults = require('../utils/defaults');

var _Object = require('./Object');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Camera = function (_WHSObject) {
  (0, _inherits3.default)(Camera, _WHSObject);

  function Camera(params, type) {
    var _ret;

    (0, _classCallCheck3.default)(this, Camera);

    if (!type) console.error('@constructor: Please specify " type ".');

    var _set = function _set(x, y, z) {
      _this.x = x;
      _this.y = y;
      _this.z = z;
    };

    params.useTarget = Boolean(params.target);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Camera).call(this, {
      camera: {
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1000,
        left: window.innerWidth / -2,
        right: window.innerWidth / 2,
        top: window.innerHeight / 2,
        bottom: window.innerHeight / -2,
        cubeResolution: 128
      },
      helper: false,
      pos: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },
      rot: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },
      target: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      }
    }));

    (0, _get3.default)((0, _getPrototypeOf2.default)(Camera.prototype), 'setParams', _this).call(_this, params);

    var scope = (0, _assign2.default)(_this, {
      _type: type,
      helper: false
    });

    if (_defaults.defaults.debug) console.debug('@WHS.Camera: Camera ' + scope._type + ' found.', scope);

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Camera, [{
    key: 'wrap',
    value: function wrap() {
      var _this2 = this;

      for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
        tags[_key] = arguments[_key];
      }

      return new _promise2.default(function (resolve, reject) {
        try {
          _this2.position.set(_this2.__params.pos.x, _this2.__params.pos.y, _this2.__params.pos.z);

          _this2.rotation.set(_this2.__params.rot.x, _this2.__params.rot.y, _this2.__params.rot.z);

          if (_this2.__params.useTarget) _this2.lookAt(_this2.__params.target);

          if (_this2.__params.helper) {
            _this2.helper = new THREE.CameraHelper(_this2.getNative());
          }

          tags.forEach(function (tag) {
            _this2[tag] = true;
          });

          if (_defaults.defaults.debug) console.debug('@WHS.Camera: Camera ' + _this2._type + ' is ready.', _this2);

          _this2.emit('ready');

          resolve(_this2);
        } catch (err) {
          console.error(err.message);
          reject();
        }
      });
    }
  }, {
    key: 'addTo',
    value: function addTo(parent) {
      this.parent = parent;

      var _helper = this.helper,
          _scope = this;

      return new _promise2.default(function (resolve, reject) {
        try {
          _scope.parent.getScene().add(_scope.getNative());
          _scope.parent.children.push(_scope);

          if (_helper) _scope.parent.getScene().add(_helper);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (_defaults.defaults.debug) {
            console.debug('@WHS.Camera: Camera ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
          }

          resolve(_scope);

          _scope.emit('ready');
        }
      });
    }

    /**
     * Clone camera.
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new Shape(this.__params, this._type).copy(this);
    }

    /**
     * Copy camera.
     *
     * @param {WHS.Camera} source - Source object, that will be applied to this.
     */

  }, {
    key: 'copy',
    value: function copy(source) {
      this.mesh = source.mesh.clone();

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();

      this._type = source._type;

      return this;
    }
  }, {
    key: 'setNative',
    value: function setNative(native) {
      this.native = native;
      return this.native;
    }
  }, {
    key: 'getNative',
    value: function getNative() {
      return this.native;
    }
  }, {
    key: 'follow',
    value: function follow(curve) {
      var time = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];
      var loop = arguments[2];
      var lookAt = arguments[3];

      var _scope = this,
          gEnd = time;

      var animation = new _Loop.Loop(function (clock) {
        var u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u),
            vec2 = curve.getPoint((u + 0.01) % 1);

        _scope.position.set(vec1.x, vec1.y, vec1.z);

        if (!lookAt) _scope.lookAt(vec2);else if (lookAt instanceof TVector3) _scope.lookAt(lookAt);else if (lookAt instanceof TCurve || lookAt instanceof TCurvePath) _scope.lookAt(lookAt.getPoint(u));
      });

      animation.start();

      if (loop) {
        setInterval(function () {
          animation.stop();

          animation = new _Loop.Loop(function (clock) {
            var u = clock.getElapsedTime() * 1000 / gEnd,
                vec1 = curve.getPoint(u),
                vec2 = curve.getPoint((u + 0.01) % 1);

            _scope.position.set(vec1.x, vec1.y, vec1.z);

            if (!lookAt) _scope.lookAt(vec2);else if (lookAt instanceof TVector3) _scope.lookAt(lookAt);else if (lookAt instanceof TCurve || lookAt instanceof TCurvePath) _scope.lookAt(lookAt.getPoint(u));
          });

          animation.start();
        }, time);
      } else {
        setTimeout(function () {
          animation.stop();
        }, time);
      }
    }
  }, {
    key: 'lookAt',
    value: function lookAt(vector3) {
      return this.getNative().lookAt(vector3);
    }
  }, {
    key: 'getWorldDirection',
    value: function getWorldDirection(vector3) {
      return this.getNative().getWorldDirection(vector3);
    }
  }, {
    key: 'position',
    get: function get() {
      return this.getNative().position;
    },
    set: function set(vector3) {
      return this.getNative().position.copy(vector3);
    }
  }, {
    key: 'rotation',
    get: function get() {
      return this.getNative().rotation;
    },
    set: function set(euler) {
      return this.getNative().rotation.copy(euler);
    }
  }]);
  return Camera;
}(_Object.WHSObject);

exports.Camera = Camera;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../extensions/Loop":13,"../utils/defaults":55,"./Object":9,"babel-runtime/core-js/object/assign":58,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Curve = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _api = require('../extras/api');

var _defaults = require('../utils/defaults');

var _Object = require('./Object');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Curve = function (_WHSObject) {
  (0, _inherits3.default)(Curve, _WHSObject);

  /**
   * Create curve.
   *
   * Todo
   */

  function Curve(params) {
    var _ret;

    (0, _classCallCheck3.default)(this, Curve);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Curve).call(this, {
      geometry: {
        curve: false,
        points: 50
      }
    }));

    (0, _get3.default)((0, _getPrototypeOf2.default)(Curve.prototype), 'setParams', _this).call(_this, params);

    var geometry = new THREE.Geometry();
    geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

    var curve = new THREE.Line(geometry, (0, _api.loadMaterial)(params.material, false)._material);

    _this.setNative(curve);

    var scope = (0, _assign2.default)(_this, {
      _type: 'curve',
      __path: params.geometry.curve
    });

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * Add curve to scene.
   */

  (0, _createClass3.default)(Curve, [{
    key: 'addTo',
    value: function addTo(parent) {
      var _scope = this;
      _scope.parent = parent;

      return new _promise2.default(function (resolve, reject) {
        try {
          _scope.parent.getScene().add(_scope.getNative());
          _scope.parent.children.push(_scope);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (_defaults.defaults.debug) {
            console.debug('@WHS.Curve: Curve ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
          }

          resolve(_scope);
        }
      });
    }

    /* Access private data */

  }, {
    key: 'setNative',
    value: function setNative(native) {
      this.native = native;
      return this.native;
    }
  }, {
    key: 'getNative',
    value: function getNative() {
      return this.native;
    }

    /**
     * Clone curve.
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new Curve(this.__params).copy(this);
    }

    /**
     * Copy curve.
     *
     * @param {WHS.Curve} source - Source object, that will be applied to this.
     */

  }, {
    key: 'copy',
    value: function copy(source) {
      this.setNative(source.getNative().clone());

      this._type = source._type;

      return this;
    }

    /**
     * Remove this curve from world.
     *
     * @return {WHS.Curve} - this.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.parent.getScene().remove(this.getNative());

      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;

      this.emit('remove');

      if (_defaults.defaults.debug) {
        console.debug('@WHS.Curve: Curve ' + this._type + ' was removed from world', [_scope]);
      }

      return this;
    }
  }]);
  return Curve;
}(_Object.WHSObject);

exports.Curve = Curve;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../extras/api":15,"../utils/defaults":55,"./Object":9,"babel-runtime/core-js/object/assign":58,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Light = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Loop = require('../extensions/Loop');

var _defaults = require('../utils/defaults');

var _Object = require('./Object');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Light = function (_WHSObject) {
  (0, _inherits3.default)(Light, _WHSObject);

  /**
   * Constructing WHS.Light object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Light type.
   * @return {WHS.Light}
   */

  function Light(params, type) {
    var _ret;

    (0, _classCallCheck3.default)(this, Light);

    if (!type) console.error('@constructor: Please specify " type ".');

    var _set = function _set(x, y, z) {
      _this.x = x;
      _this.y = y;
      _this.z = z;
    };

    // Polyfill for 3D.

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Light).call(this, {

      light: {
        color: 0xffffff,
        skyColor: 0xffffff,
        groundColor: 0xffffff,

        intensity: 1,
        distance: 100,
        angle: Math.PI / 3,
        exponent: 0,
        decay: 1
      },

      helper: false,

      shadowmap: {
        cast: true,

        bias: 0,

        width: 1024,
        height: 1024,

        near: true,
        far: 400,
        fov: 60,
        darkness: 0.3,

        top: 200,
        bottom: -200,
        left: -200,
        right: 200
      },

      pos: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      rot: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      target: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      }

    }));

    (0, _get3.default)((0, _getPrototypeOf2.default)(Light.prototype), 'setParams', _this).call(_this, params);

    var scope = (0, _assign2.default)(_this, {
      _type: type,

      _light: _this.__params.light,
      _shadowmap: _this.__params.shadowmap
    });

    if (_defaults.defaults.debug) console.debug('@WHS.Light: Light ' + scope._type + ' found.', scope);

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * Applying shadow & position & rotation.
   *
   * @param {...String} tags - Tags that defines what to do with light
   * additionally.
   */

  (0, _createClass3.default)(Light, [{
    key: 'wrap',
    value: function wrap() {
      for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
        tags[_key] = arguments[_key];
      }

      var _scope = this;

      return new _promise2.default(function (resolve, reject) {
        try {
          if (tags.indexOf('noshadows') < 0) {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;
          }

          _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

          _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

          tags.forEach(function (tag) {
            _scope[tag] = true;
          });

          if (_defaults.defaults.debug) console.debug('@WHS.Light: Light ' + _scope._type + ' + \' is ready.', _scope);

          _scope.emit('ready');

          resolve(_scope);
        } catch (err) {
          console.error(err.message);
          reject();
        }
      });
    }

    /**
     * Add light to WHS.World object.
     *
     * @param {WHS.World} root - World, were this light will be.
     * @param {...String} tags - Tags for compiling.
     */

  }, {
    key: 'addTo',
    value: function addTo(parent) {
      this.parent = parent;

      var _helper = this.helper,
          _scope = this;

      return new _promise2.default(function (resolve, reject) {
        try {
          _scope.parent.getScene().add(_scope.getNative());
          _scope.parent.children.push(_scope);

          if (_helper) _scope.parent.getScene().add(_helper);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (_defaults.defaults.debug) {
            console.debug('@WHS.Camera: Camera ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
          }

          resolve(_scope);
          _scope.emit('ready');
        }
      });
    }

    /**
     * Set shadow properties for light.
     */

  }, {
    key: 'wrapShadow',
    value: function wrapShadow() {
      var _this2 = this;

      var _scope = this;

      return new _promise2.default(function (resolve, reject) {
        try {
          _scope.getNative().shadow.mapSize.width = _this2._shadowmap.width;
          _scope.getNative().shadow.mapSize.height = _this2._shadowmap.height;
          _scope.getNative().shadow.bias = _this2._shadowmap.bias;

          _scope.getNative().shadow.camera.near = _this2._shadowmap.near;
          _scope.getNative().shadow.camera.far = _this2._shadowmap.far;
          _scope.getNative().shadow.camera.fov = _this2._shadowmap.fov;

          _scope.getNative().shadow.camera.left = _this2._shadowmap.left;
          _scope.getNative().shadow.camera.right = _this2._shadowmap.right;
          _scope.getNative().shadow.camera.top = _this2._shadowmap.top;
          _scope.getNative().shadow.camera.bottom = _this2._shadowmap.bottom;
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          resolve(_scope);
        }
      });
    }

    /**
     * Clone light.
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new Light(this.__params, this._type).copy(this);
    }

    /**
     * Copy light.
     *
     * @param {WHS.Light} source - Source object, that will be applied to this.
     */

  }, {
    key: 'copy',
    value: function copy(source) {
      this.light = source.getNative().clone();
      if (source.helper) this.helper = source.helper.clone();

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();

      this._type = source._type;

      return this;
    }

    /**
     * Remove this light from world.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.parent.getScene().remove(this.getNative());
      if (source.helper) this.parent.getScene().remove(this.helper);

      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;

      this.emit('remove');

      return this;
    }

    /* Access private data */

  }, {
    key: 'setNative',
    value: function setNative(native) {
      this.native = native;
      return this.native;
    }
  }, {
    key: 'getNative',
    value: function getNative() {
      return this.native;
    }
  }, {
    key: 'follow',
    value: function follow(curve) {
      var time = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];
      var loop = arguments[2];
      var lookAt = arguments[3];

      var _scope = this,
          gEnd = time;

      var animation = new _Loop.Loop(function (clock) {
        var u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u),
            vec2 = curve.getPoint((u + 0.01) % 1);

        _scope.position.set(vec1.x, vec1.y, vec1.z);

        if (!lookAt) _scope.lookAt(vec2);else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);else if (lookAt instanceof THREE.Curve || lookAt instanceof THREE.CurvePath) _scope.lookAt(lookAt.getPoint(u));
      });

      animation.start();

      if (loop) {
        setInterval(function () {
          animation.stop();

          animation = new _Loop.Loop(function (clock) {
            var u = clock.getElapsedtime() * 1000 / gEnd,
                vec1 = curve.getPoint(u),
                vec2 = curve.getPoint((u + 0.01) % 1);

            _scope.position.set(vec1.x, vec1.y, vec1.z);

            if (!lookAt) _scope.lookAt(vec2);else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);else if (lookAt instanceof THREE.Curve || lookAt instanceof THREE.CurvePath) _scope.lookAt(lookAt.getPoint(u));
          });

          animation.start();
        }, time);
      } else {
        setTimeout(function () {
          animation.stop();
        }, time);
      }
    }
  }, {
    key: 'position',
    get: function get() {
      return this.getNative().position;
    },
    set: function set(vector3) {
      return this.getNative().position.copy(vector3);
    }
  }, {
    key: 'rotation',
    get: function get() {
      return this.getNative().rotation;
    },
    set: function set(euler) {
      return this.getNative().rotation.copy(euler);
    }
  }, {
    key: 'target',
    get: function get() {
      return this.getNative().target.position;
    },
    set: function set(vector3) {
      return this.getNative().target.position.copy(vector3);
    }
  }]);
  return Light;
}(_Object.WHSObject);

exports.Light = Light;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../extensions/Loop":13,"../utils/defaults":55,"./Object":9,"babel-runtime/core-js/object/assign":58,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHSObject = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _minivents = require('minivents');

var _minivents2 = _interopRequireDefault(_minivents);

var _api = require('../extras/api');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var WHSObject = function () {
  /**
   * Constructing WHS.Shape object.
   *
   * @param {Boolean} structurable - true if object has parents and children.
   * @param {String} type - Shape type.
   * @return {WHS.Object}
   */

  function WHSObject() {
    var defaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var structurable = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    (0, _classCallCheck3.default)(this, WHSObject);

    var scope = structurable ? (0, _assign2.default)(this, {
      __whsobject: true,
      __releaseTime: new Date().getTime(),
      __params: {},
      __defaults: defaults,

      parent: null,
      children: []
    }, new _minivents2.default()) : (0, _assign2.default)(this, {
      __whsobject: true,
      __releaseTime: new Date().getTime(),
      __params: {}
    }, new _minivents2.default());

    return scope;
  }

  (0, _createClass3.default)(WHSObject, [{
    key: 'setParams',
    value: function setParams() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.__params = (0, _api.extend)(params, this.__defaults);
    }
  }, {
    key: 'updateParams',
    value: function updateParams() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.__params = (0, _api.extend)(params, this.__params);
    }
  }, {
    key: 'getParams',
    value: function getParams() {
      return this.__params;
    }
  }, {
    key: 'add',
    value: function add(children) {
      var _scope = this;

      if (children.addTo) return children.addTo(this);else if (children instanceof Object) {
        return new _promise2.default(function (resolve) {
          children.parent = _scope;

          _scope.getNative().add(children.getNative());
          _scope.children.push(_scope);

          resolve();
        });
      }
    }
  }]);
  return WHSObject;
}();

exports.WHSObject = WHSObject;


},{"../extras/api":15,"babel-runtime/core-js/object/assign":58,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"minivents":176}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _api = require('../extras/api');

var _Loop = require('../extensions/Loop');

var _defaults = require('../utils/defaults');

var _World = require('./World');

var _Object = require('./Object');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Shape = function (_WHSObject) {
  (0, _inherits3.default)(Shape, _WHSObject);

  /**
   * Constructing WHS.Shape object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Shape type.
   * @return {WHS.Shape}
   */

  function Shape(params, type) {
    var _ret;

    (0, _classCallCheck3.default)(this, Shape);

    if (!type) console.error('@constructor: Please specify " type ".');

    var _set = function _set(x, y, z) {
      _this.x = x;
      _this.y = y;
      _this.z = z;
    };

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Shape).call(this, {

      mass: 10,

      helpers: {
        box: false,
        boundingBox: false,
        edges: false,
        faceNormals: false
      },

      pos: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      rot: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      scale: {
        x: 1,
        y: 1,
        z: 1,
        set: _set
      },

      target: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      morph: {
        speed: 1,
        duration: 1
      },

      physics: true

    }));

    (0, _get3.default)((0, _getPrototypeOf2.default)(Shape.prototype), 'setParams', _this).call(_this, params);

    var scope = (0, _assign2.default)(_this, {
      _type: type,
      __params: params,

      wait: [],
      helpers: {
        box: false
      },

      physics: params.physics
    });

    if (_defaults.defaults.debug) console.debug('@WHS.Shape: Shape ' + scope._type + ' found.', scope);

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Shape, [{
    key: 'wait',
    value: function wait(promise) {
      this.wait.push(promise);
      return this;
    }

    /**
     * Applying shadow & position & rotation.
     *
     * @param {...String} tags - Tags that defines what to do with shape
     * additionally.
     */

  }, {
    key: 'wrap',
    value: function wrap() {
      var _scope = this;

      for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
        tags[_key] = arguments[_key];
      }

      if (tags.indexOf('wait') >= 0) {
        return new _promise2.default(function (resolve, reject) {
          _promise2.default.all(_scope.wait).then(function () {
            try {
              _scope.getNative().castShadow = true;
              _scope.getNative().receiveShadow = true;

              _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

              _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

              _scope.scale.set(_scope.__params.scale.x, _scope.__params.scale.y, _scope.__params.scale.z);

              // Box helper.
              if (_scope.__params.helpers.box) {
                _scope.helpers.box = new THREE.BoxHelper(_scope.getNative());
              }

              // Bounding box helper.
              if (_scope.__params.helpers.boundingBox) {
                _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(_scope.getNative(), _scope.__params.helpers.boundingBox.color ? _scope.__params.helpers.boundingBox.color : 0xffffff);
              }

              // Edges helper.
              if (_scope.__params.helpers.edges) {
                _scope.helpers.edges = new THREE.EdgesHelper(_scope.getNative(), _scope.__params.helpers.edges.color ? _scope.__params.helpers.edges.color : 0xffffff);
              }

              // faceNormals helper.
              if (_scope.__params.helpers.faceNormals) {
                _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(_scope.getNative(), _scope.__params.helpers.faceNormals.size ? _scope.__params.helpers.faceNormals.size : 2, _scope.__params.helpers.faceNormals.color ? _scope.__params.helpers.faceNormals.color : 0xffffff, _scope.__params.helpers.faceNormals.linewidth ? _scope.__params.helpers.faceNormals.linewidth : 1);
              }

              // vertexNormals helper.
              if (_scope.__params.helpers.vertexNormals) {
                _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(_scope.getNative(), _scope.__params.helpers.vertexNormals.size ? _scope.__params.helpers.vertexNormals.size : 2, _scope.__params.helpers.vertexNormals.color ? _scope.__params.helpers.vertexNormals.color : 0xffffff, _scope.__params.helpers.vertexNormals.linewidth ? _scope.__params.helpers.vertexNormals.linewidth : 1);
              }

              if (_defaults.defaults.debug) console.debug('@WHS.Shape: Shape ' + _scope._type + ' is ready.', _scope);

              _scope.emit('ready');

              resolve();
            } catch (err) {
              console.error(err.message);
              reject();
            }
          });
        });
      } else {
        return new _promise2.default(function (resolve, reject) {
          try {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;

            _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

            _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);

            _scope.scale.set(_scope.__params.scale.x, _scope.__params.scale.y, _scope.__params.scale.z);

            // Box helper.
            if (_scope.__params.helpers.box) {
              _scope.helpers.box = new THREE.BoxHelper(_scope.getNative());
            }

            // Bounding box helper.
            if (_scope.__params.helpers.boundingBox) {
              _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(_scope.getNative(), _scope.__params.helpers.boundingBox.color ? _scope.__params.helpers.boundingBox.color : 0xffffff);
            }

            // Edges helper.
            if (_scope.__params.helpers.edges) {
              _scope.helpers.edges = new THREE.EdgesHelper(_scope.getNative(), _scope.__params.helpers.edges.color ? _scope.__params.helpers.edges.color : 0xffffff);
            }

            // faceNormals helper.
            if (_scope.__params.helpers.faceNormals) {
              _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(_scope.getNative(), _scope.__params.helpers.faceNormals.size ? _scope.__params.helpers.faceNormals.size : 2, _scope.__params.helpers.faceNormals.color ? _scope.__params.helpers.faceNormals.color : 0xffffff, _scope.__params.helpers.faceNormals.linewidth ? _scope.__params.helpers.faceNormals.linewidth : 1);
            }

            // vertexNormals helper.
            if (_scope.__params.helpers.vertexNormals) {
              _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(_scope.getNative(), _scope.__params.helpers.vertexNormals.size ? _scope.__params.helpers.vertexNormals.size : 2, _scope.__params.helpers.vertexNormals.color ? _scope.__params.helpers.vertexNormals.color : 0xffffff, _scope.__params.helpers.vertexNormals.linewidth ? _scope.__params.helpers.vertexNormals.linewidth : 1);
            }

            if (_defaults.defaults.debug) console.debug('@WHS.Shape: Shape ' + _scope._type + ' is ready.', _scope);

            resolve();

            _scope.emit('ready');
          } catch (err) {
            console.error(err.message);
            reject();
          }
        });
      }
    }

    /**
     * Add shape to WHS.World object.
     *
     * @param {WHS.World} parent - World, were this shape will be.
     * @param {...String} tags - Tags for compiling.
     */

  }, {
    key: 'addTo',
    value: function addTo(parent) {
      var _helpers = this.helpers,
          _scope = this;

      _scope.parent = parent;

      for (var _len2 = arguments.length, tags = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tags[_key2 - 1] = arguments[_key2];
      }

      if (tags.indexOf('wait') >= 0) {
        return new _promise2.default(function (resolve, reject) {
          _promise2.default.all(_scope.wait).then(function () {
            try {
              console.log(_scope.parent instanceof _World.World);
              var parentNative = _scope.parent instanceof _World.World ? _scope.parent.getScene() : _scope.parent.getNative();

              parentNative.add(_scope.getNative());
              _scope.parent.children.push(_scope);

              if (_scope.__params.helpers.box) parentNative.add(_helpers.box);

              if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);

              if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);

              if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);

              if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
            } catch (err) {
              console.error(err.message);
              reject();
            } finally {
              if (_scope._wait) {
                _scope.getNative().addEventListener('ready', function () {
                  resolve(_scope);
                });
              } else resolve(_scope);

              _scope.getNative().addEventListener('collide', function () {
                _scope.emit('collide');
              });

              if (_defaults.defaults.debug) {
                console.debug('@WHS.Shape: Shape ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
              }
            }
          });
        });
      } else {
        return new _promise2.default(function (resolve, reject) {
          try {
            console.log(_scope.parent instanceof _World.World);
            var parentNative = _scope.parent instanceof _World.World ? _scope.parent.getScene() : _scope.parent.getNative();

            parentNative.add(_scope.getNative());
            _scope.parent.children.push(_scope);

            if (_scope.__params.helpers.box) parentNative.add(_helpers.box);

            if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);

            if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);

            if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);

            if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
          } catch (err) {
            console.error(err.message);
            reject();
          } finally {
            if (_scope._wait) {
              _scope.getNative().addEventListener('ready', function () {
                resolve(_scope);
              });
            } else resolve(_scope);

            _scope.getNative().addEventListener('collide', function () {
              _scope.emit('ready');
            });

            if (_defaults.defaults.debug) {
              console.debug('@WHS.Shape: Shape ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
            }
          }
        });
      }
    }

    /**
     * Initialize shape's material object.
     */

  }, {
    key: '_initMaterial',
    value: function _initMaterial(params) {
      return this.physics ? (0, _api.loadMaterial)(params)._material : (0, _api.loadMaterial)(params)._materialP;
    }

    /**
     * Clone shape.
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new WHS.Shape(this.getParams(), this._type).copy(this);
    }

    /**
     * Copy shape.
     *
     * @param {WHS.Shape} source - Source object, that will be applied to this.
     */

  }, {
    key: 'copy',
    value: function copy(source) {
      this.setNative(source.getNative().clone());

      console.log(source.rotation);

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();

      this._type = source._type;

      return this;
    }

    /**
     * Remove this shape from world.
     *
     * @return {WHS.Shape} - this.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.parent.getScene().remove(this.getNative());

      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;

      this.emit('remove');

      if (_defaults.defaults.debug) {
        console.debug('@WHS.Shape: Shape ' + this._type + ' was removed from world', [this]);
      }

      return this;
    }

    /**
     * @return {WHS.World} - World object.
     */

  }, {
    key: 'getWorld',
    value: function getWorld() {
      var p = this.parent;

      while (!(p instanceof _World.World)) {
        if (p) p = p.parent;else return false;
      }

      return p;
    }
  }, {
    key: 'setNative',

    /* Access private data */

    value: function setNative(native) {
      this.native = native;
      return this.native;
    }
  }, {
    key: 'getNative',
    value: function getNative() {
      return this.native;
    }
  }, {
    key: 'setMaterial',
    value: function setMaterial(material) {
      this.native.material = material;
      return this.native.material;
    }
  }, {
    key: 'setAngularVelocity',
    value: function setAngularVelocity() {
      var _getNative;

      return (_getNative = this.getNative()).setAngularVelocity.apply(_getNative, arguments);
    }
  }, {
    key: 'setLinearVelocity',
    value: function setLinearVelocity() {
      var _getNative2;

      return (_getNative2 = this.getNative()).setLinearVelocity.apply(_getNative2, arguments);
    }
  }, {
    key: 'follow',
    value: function follow(curve) {
      var time = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];
      var loop = arguments[2];

      var _scope = this,
          gEnd = time;

      var animation = new _Loop.Loop(function (clock) {
        var u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u % 1),
            vec2 = curve.getPoint((u + 0.01) % 1);

        _scope.position.set(vec1.x, vec1.y, vec1.z);
        _scope.getNative().lookAt(vec2);
      });

      _scope.getWorld().addLoop(animation);

      animation.start();

      if (loop) {
        setInterval(function () {
          animation.stop();

          animation = new _Loop.Loop(function (clock) {
            var u = clock.getElapsedTime() * 1000 / gEnd,
                vec1 = curve.getPoint(u % 1),
                vec2 = curve.getPoint((u + 0.01) % 1);

            _scope.position.set(vec1.x, vec1.y, vec1.z);
            _scope.getNative().lookAt(vec2);
          });

          _scope.getWorld().addLoop(animation);

          animation.start();
        }, time);
      } else {
        setTimeout(function () {
          animation.stop();
          _scope.getWorld().removeLoop(animation);
        }, time);
      }
    }
  }, {
    key: 'nposition',
    get: function get() {
      return this.getNative().position;
    }
  }, {
    key: 'nrotation',
    get: function get() {
      return this.getNative().position;
    }
  }, {
    key: 'position',
    get: function get() {
      this.getNative().__dirtyPosition = true;
      return this.getNative().position;
    },
    set: function set(vector3) {
      this.getNative().__dirtyPosition = true;
      return this.getNative().position.copy(vector3);
    }
  }, {
    key: 'rotation',
    get: function get() {
      this.getNative().__dirtyRotation = true;
      return this.getNative().rotation;
    },
    set: function set(euler) {
      this.getNative().__dirtyRotation = true;
      this.getNative().rotation.copy(euler);

      return this.getNative().rotation;
    }
  }, {
    key: 'scale',
    get: function get() {
      return this.getNative().scale;
    },
    set: function set(vector3) {
      this.getNative().scale = vector3;
      return this.getNative().scale;
    }
  }]);
  return Shape;
}(_Object.WHSObject);

exports.Shape = Shape;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../extensions/Loop":13,"../extras/api":15,"../utils/defaults":55,"./Object":9,"./World":11,"babel-runtime/core-js/object/assign":58,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],11:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.World = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _stats = require('stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _PerspectiveCamera = require('../cameras/PerspectiveCamera');

var _Camera = require('./Camera');

var _Object = require('./Object');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var World = function (_WHSObject) {
  (0, _inherits3.default)(World, _WHSObject);

  /**
   * Create a 3D world and define defaults.
   *
   * @param {object} params - The scene settings object.
   * @return {World} A 3D world whs object.
   */

  function World() {
    var _ret;

    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, World);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(World).call(this, {

      stats: false,
      autoresize: false,

      shadowmap: {
        enabled: true,
        type: THREE.PCFSoftShadowMap
      },

      helpers: {
        grid: false,
        axis: false
      },

      gravity: {
        x: 0,
        y: 0,
        z: 0
      },

      camera: {
        aspect: 75,
        near: 1,
        far: 1000,

        x: 0,
        y: 0,
        z: 0
      },

      rWidth: 1, // Resolution(width).
      rHeight: 1, // Resolution(height).

      width: window.innerWidth, // Container(width).
      height: window.innerHeight, // Container(height).

      physics: {

        quatNormalizeSkip: 0,
        quatNormalizeFast: false,

        solver: {
          iterations: 20,
          tolerance: 0
        },

        defMaterial: {
          contactEquationStiffness: 1e8,
          contactEquationRegularizationTime: 3
        }

      },

      background: 0x000000,
      assets: './assets',
      container: document.body,

      paths: {
        worker: '../libs/physijs_worker.js',
        ammo: '../libs/ammo.js'
      }

    }));

    (0, _get3.default)((0, _getPrototypeOf2.default)(World.prototype), 'setParams', _this).call(_this, params);

    // INIT.
    _this._initScene();
    _this._initDOM();
    _this._initStats();
    _this._initCamera();
    _this._initRenderer();
    _this._initHelpers();

    // NOTE: ==================== Autoresize. ======================
    var scope = _this;

    if (_this.getParams().autoresize) {
      window.addEventListener('resize', function () {
        scope.setSize(window.innerWidth, window.innerHeight);
      });
    }

    scope.loops = [];

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * Initialize THREE.js scene object.
   */

  (0, _createClass3.default)(World, [{
    key: '_initScene',
    value: function _initScene() {
      this._initPhysiJS();

      var scene = new _physi2.default.Scene();

      scene.setGravity(new THREE.Vector3(this.getParams().gravity.x, this.getParams().gravity.y, this.getParams().gravity.z));

      this.setScene(scene);

      // Array for processing.
      this.children = [];
    }
  }, {
    key: 'addLoop',
    value: function addLoop(loop) {
      this.loops.push(loop); // TODO: Process loops on start
      // like: this.loops.forEach((elem) => elem.start());
    }
  }, {
    key: 'removeLoop',
    value: function removeLoop(loop) {
      this.loops.filter(function (l) {
        return l !== loop;
      });
    }

    /**
     * Set Physi.js scripts pathes.
     */

  }, {
    key: '_initPhysiJS',
    value: function _initPhysiJS() {
      this.simulate = true;

      _physi2.default.scripts.worker = this.getParams().paths.worker;
      _physi2.default.scripts.ammo = this.getParams().paths.ammo;
    }

    /**
     * Initialize DOM structure for whitestorm.
     */

  }, {
    key: '_initDOM',
    value: function _initDOM() {
      this.getParams().container.style.margin = 0;
      this.getParams().container.style.padding = 0;
      this.getParams().container.style.position = 'relative';
      this.getParams().container.style.overflow = 'hidden';

      this._dom = document.createElement('div');
      this._dom.className = 'whs';

      this.getParams().container.appendChild(this._dom);

      return this._dom;
    }

    /**
     * Inititialize stats plugin.
     */

  }, {
    key: '_initStats',
    value: function _initStats() {
      // Debug Renderer
      if (this.getParams().stats) {
        this._stats = new _stats2.default();

        if (this.getParams().stats === 'fps') this._stats.setMode(0);else if (this.getParams().stats === 'ms') this._stats.setMode(1);else if (this.getParams().stats === 'mb') this._stats.setMode(1);else {
          this._stats.setMode(0);
          console.warn([this._stats], 'Please, apply stats mode [fps, ms, mb] .');
        }

        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '0px';
        this._stats.domElement.style.bottom = '0px';

        this._dom.appendChild(this._stats.domElement);
      }
    }

    /**
     * Create a camera and add it to scene.
     */

  }, {
    key: '_initCamera',
    value: function _initCamera() {
      console.log(this.getParams());

      this.setCamera(new _PerspectiveCamera.PerspectiveCamera({
        camera: {
          fov: this.getParams().camera.aspect,
          aspect: this.getParams().width / this.getParams().height,
          near: this.getParams().camera.near,
          far: this.getParams().camera.far
        },

        pos: {
          x: this.getParams().camera.x,
          y: this.getParams().camera.y,
          z: this.getParams().camera.z
        }
      }));

      this.getCamera().addTo(this);
    }

    /**
     * Create a renderer and apply it's options.
     */

  }, {
    key: '_initRenderer',
    value: function _initRenderer() {
      this.render = true;

      // Renderer.
      this.setRenderer(new THREE.WebGLRenderer());
      this.getRenderer().setClearColor(this.getParams().background);

      // Shadowmap.
      this.getRenderer().shadowMap.enabled = this.getParams().shadowmap.enabled;
      this.getRenderer().shadowMap.type = this.getParams().shadowmap.type;
      this.getRenderer().shadowMap.cascade = true;

      this.getRenderer().setSize(Number(this.getParams().width * this.getParams().rWidth).toFixed(), Number(this.getParams().height * this.getParams().rHeight).toFixed());

      this.getRenderer().render(this.getScene(), this.getCamera().getNative());

      this._dom.appendChild(this.getRenderer().domElement);

      this.getRenderer().domElement.style.width = '100%';
      this.getRenderer().domElement.style.height = '100%';
    }

    /**
     * Add helpers to scene.
     */

  }, {
    key: '_initHelpers',
    value: function _initHelpers() {
      if (this.getParams().helpers.axis) {
        this.getScene().add(new THREE.AxisHelper(this.getParams().helpers.axis.size ? this.getParams().helpers.axis.size : 5));
      }

      if (this.getParams().helpers.grid) {
        this.getScene().add(new THREE.GridHelper(this.getParams().helpers.grid.size ? this.getParams().helpers.grid.size : 10, this.getParams().helpers.grid.step ? this.getParams().helpers.grid.step : 1));
      }
    }

    /**
     * Start animation.
     */

  }, {
    key: 'start',
    value: function start() {
      var clock = new THREE.Clock(),
          scope = this,
          scene = scope.getScene(),
          cameraNative = scope.getCamera().getNative(),
          renderer = scope.getRenderer();

      window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      }();

      function reDraw(time) {
        window.requestAnimFrame(reDraw);

        // Init stats.
        if (scope._stats) scope._stats.begin();

        scope._process(clock);

        if (scope.simulate) scene.simulate();
        if (scope.controls) scope._updateControls();

        // Effects rendering.
        if (scope._composer && scope.render) {
          scope._composer.reset();
          scope._composer.render(scene, cameraNative);
          scope._composer.pass(scope._composer.stack);
          scope._composer.toScreen();
        } else if (scope.render) renderer.render(scene, cameraNative);

        scope._execLoops(time);

        // End helper.
        if (scope._stats) scope._stats.end();
      }

      this._update = reDraw;

      scope._update();
    }

    /**
     * Execute all loops with a specific time.
     *
     * @params {number} time - The time value that will be passed to loops.
     */

  }, {
    key: '_execLoops',
    value: function _execLoops(time) {
      for (var i = 0; i < this.loops.length; i++) {
        var e = this.loops[i];
        if (e.enabled) e.execute(e.clock, time);
      }
    }

    /**
     * Update controls time values.
     */

  }, {
    key: '_updateControls',
    value: function _updateControls() {
      this.controls.update(Date.now() - this.time);
      this.time = Date.now();
    }

    /**
     * Update morphs animations.
     *
     * @params {THREE.Clock} clock - The clock object, which.
     */

  }, {
    key: '_process',
    value: function _process(clock) {
      var delta = clock.getDelta();

      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i]._type === 'morph') this.children[i].getNative().mixer.update(delta);
      }
    }

    /**
     * This functon will scene properties when it's called.
     */

  }, {
    key: 'setSize',
    value: function setSize() {
      var width = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var height = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.getCamera().getNative().aspect = width / height;
      this.getCamera().getNative().updateProjectionMatrix();

      this.getRenderer().setSize(Number(width * this.getParams().rWidth).toFixed(), Number(height * this.getParams().rHeight).toFixed());
    }
  }, {
    key: 'setScene',
    value: function setScene(scene) {
      this.scene = scene;
      return this.scene;
    }
  }, {
    key: 'getScene',
    value: function getScene() {
      return this.scene;
    }
  }, {
    key: 'setRenderer',
    value: function setRenderer(renderer) {
      this.renderer = renderer;
      return this.renderer;
    }
  }, {
    key: 'getRenderer',
    value: function getRenderer() {
      return this.renderer;
    }
  }, {
    key: 'setControls',
    value: function setControls(controls) {
      var recieved = controls(this);

      this.controls = recieved instanceof Array ? recieved[0] : recieved;

      if (recieved instanceof Array && typeof recieved[1] === 'function') recieved[1](this);

      return this.controls;
    }

    /**
     * Set a camera for rendering world.
     *
     * @params {WHS.Camera} camera - The camera to be rendered.
     */

  }, {
    key: 'setCamera',
    value: function setCamera(camera) {
      if (camera instanceof _Camera.Camera) this.camera = camera;else console.error('@WHS.World: camera in not an instance of WHS.Camera.');
    }
  }, {
    key: 'getCamera',
    value: function getCamera() {
      return this.camera;
    }
  }]);
  return World;
}(_Object.WHSObject);

exports.World = World;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../cameras/PerspectiveCamera":4,"../physics/physi.js":49,"./Camera":6,"./Object":9,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73,"stats.js":177}],12:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Camera = require('./Camera');

(0, _keys2.default)(_Camera).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Camera[key];
    }
  });
});

var _Curve = require('./Curve');

(0, _keys2.default)(_Curve).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Curve[key];
    }
  });
});

var _Light = require('./Light');

(0, _keys2.default)(_Light).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Light[key];
    }
  });
});

var _Object = require('./Object');

(0, _keys2.default)(_Object).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Object[key];
    }
  });
});

var _Shape = require('./Shape');

(0, _keys2.default)(_Shape).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Shape[key];
    }
  });
});

var _World = require('./World');

(0, _keys2.default)(_World).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _World[key];
    }
  });
});


},{"./Camera":6,"./Curve":7,"./Light":8,"./Object":9,"./Shape":10,"./World":11,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],13:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loop = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Loop = function () {
  function Loop(func) {
    (0, _classCallCheck3.default)(this, Loop);

    this.func = func;
    this.clock = new THREE.Clock();
    this.enabled = false;
  }

  (0, _createClass3.default)(Loop, [{
    key: 'start',
    value: function start() {
      this.clock.start();
      this.enabled = true;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.clock.stop();
      this.enabled = false;
    }
  }, {
    key: 'execute',
    value: function execute(time) {
      return this.func(this.clock, time);
    }
  }]);
  return Loop;
}();

exports.Loop = Loop;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70}],14:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Loop = require('./Loop');

(0, _keys2.default)(_Loop).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Loop[key];
    }
  });
});


},{"./Loop":13,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],15:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMaterial = exports.extend = exports.texture = exports.TextureLoader = exports.JSONLoader = exports.FontLoader = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _loaders = require('../utils/loaders');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var extend = function extend(object) {
  for (var _len = arguments.length, extensions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extensions[_key - 1] = arguments[_key];
  }

  // $.extend alternative, ... is the spread operator.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(extensions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var extension = _step.value;

      // console.log(extension);
      // console.log(typeof extension);

      if (!extension) continue; // Ignore null and undefined objects and paramaters.

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)((0, _getOwnPropertyNames2.default)(extension)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;
          // Do not traverse the prototype chain.
          if (object[prop] !== undefined && object[prop].toString() === '[object Object]' && extension[prop].toString() === '[object Object]')

            // Goes deep only if object[prop] and extension[prop] are both objects !
            extend(object[prop], extension[prop]);else object[prop] = object[prop] === 0 ? 0 : object[prop];
          if (typeof object[prop] === 'undefined') object[prop] = extension[prop]; // Add values that do not already exist.
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return object;
};

var texture = function texture(url, options) {
  var texture = _loaders.TextureLoader.load(url);

  if (options) {
    var opt = (0, _assign2.default)({}, options, {
      offset: {
        x: 0,
        y: 0
      },
      repeat: {
        x: 1,
        y: 1
      }
    });

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    texture.offset.set(opt.offset.x, opt.offset.y);
    texture.repeat.set(opt.repeat.x, opt.repeat.y);

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
  }

  return texture;
};

var loadMaterial = function loadMaterial() {
  var material = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var isPhysics = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  if (typeof material.kind !== 'string') console.error('Type of material is undefined or not a string. @loadMaterial');

  var scope = {
    _type: material.kind,
    _restitution: !isNaN(parseFloat(material.restitution)) ? material.restitution : !isNaN(parseFloat(material.rest)) ? material.rest : 0.3,
    _friction: !isNaN(parseFloat(material.friction)) ? material.friction : !isNaN(parseFloat(material.fri)) ? material.fri : 0.8
  };

  if (material.texture) material.map = texture(material.texture);

  var params = (0, _assign2.default)({}, material);

  delete params.kind;

  delete params.friction;
  delete params.fri;

  delete params.restitution;
  delete params.rest;

  delete params.useCustomMaterial;
  delete params.useVertexColors;

  switch (material.kind) {
    case 'basic':
      scope._material = new THREE.MeshBasicMaterial(params);
      break;

    case 'linebasic':
      scope._material = new THREE.LineBasicMaterial(params);
      break;

    case 'linedashed':
      scope._material = new THREE.LineDashedMaterial(params);
      break;

    case 'material':
      scope._material = new THREE.Material(params);
      break;

    case 'depth':
      scope._material = new THREE.MeshDepthMaterial(params);
      break;

    case 'face':
      scope._material = new THREE.MeshFaceMaterial(params);
      break;

    case 'lambert':
      scope._material = new THREE.MeshLambertMaterial(params);
      break;

    case 'normal':
      scope._material = new THREE.MeshNormalMaterial(params);
      break;

    case 'phong':
      scope._material = new THREE.MeshPhongMaterial(params);
      break;

    case 'pointcloud':
      scope._material = new THREE.PointCloudMaterial(params);
      break;

    case 'rawshader':
      scope._material = new THREE.RawShaderMaterial(params);
      break;

    case 'shader':
      scope._material = new THREE.ShaderMaterial(params);
      break;

    case 'spritecanvas':
      scope._material = new THREE.SpriteCanvasMaterial(params);
      break;

    case 'sprite':
      scope._material = new THREE.SpriteMaterial(params);
      break;

    default:
  }

  if (isPhysics) {
    scope._materialP = _physi2.default.createMaterial(scope._material, scope._friction, scope._restitution);
  }

  return scope;
};

exports.FontLoader = _loaders.FontLoader;
exports.JSONLoader = _loaders.JSONLoader;
exports.TextureLoader = _loaders.TextureLoader;
exports.texture = texture;
exports.extend = extend;
exports.loadMaterial = loadMaterial;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../physics/physi.js":49,"../utils/loaders":56,"babel-runtime/core-js/get-iterator":57,"babel-runtime/core-js/object/assign":58,"babel-runtime/core-js/object/get-own-property-names":62}],16:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstPersonControls = firstPersonControls;

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _api = require('../api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

var PI_2 = Math.PI / 2;

function firstPersonControls(object) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function (world) {
    var target = (0, _api.extend)(params, {
      block: document.getElementById('blocker'),
      speed: 1,
      ypos: 1
    });

    var controls = new function (camera, mesh, params) {
      var velocityFactor = 1;
      var runVelocity = 0.25;

      mesh.setAngularFactor({ x: 0, y: 0, z: 0 });

      /* Init */
      var scope = this;
      var player = mesh,
          pitchObject = new THREE.Object3D();

      pitchObject.add(camera.getNative());

      var yawObject = new THREE.Object3D();

      yawObject.position.y = params.ypos; // eyes are 2 meters above the ground
      yawObject.add(pitchObject);

      var quat = new THREE.Quaternion();

      var canJump = false,


      // Moves.
      moveForward = false,
          moveBackward = false,
          moveLeft = false,
          moveRight = false;

      player.addEventListener('collision', function (otherObject, v, r, contactNormal) {
        if (contactNormal.y < 0.5) // Use a "good" threshold value between 0 and 1 here!
          canJump = true;
      });

      function onMouseMove(event) {
        if (scope.enabled === false) return;

        var movementX = typeof event.movementX === 'number' ? event.movementX : typeof event.mozMovementX === 'number' ? event.mozMovementX : typeof event.getMovementX === 'function' ? event.getMovementX() : 0;
        var movementY = typeof event.movementY === 'number' ? event.movementY : typeof event.mozMovementY === 'number' ? event.mozMovementY : typeof event.getMovementY === 'function' ? event.getMovementY() : 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
      }

      function onKeyDown(event) {
        switch (event.keyCode) {
          case 38: // up
          case 87:
            // w
            moveForward = true;
            break;

          case 37: // left
          case 65:
            // a
            moveLeft = true;
            break;

          case 40: // down
          case 83:
            // s
            moveBackward = true;
            break;

          case 39: // right
          case 68:
            // d
            moveRight = true;
            break;

          case 32:
            // space
            if (canJump === true) player.applyCentralImpulse({ x: 0, y: 300, z: 0 });
            canJump = false;
            break;

          case 16:
            // shift
            runVelocity = 0.5;
            break;

          default:
        }
      }

      function onKeyUp(event) {
        switch (event.keyCode) {
          case 38: // up
          case 87:
            // w
            moveForward = false;
            break;

          case 37: // left
          case 65:
            // a
            moveLeft = false;
            break;

          case 40: // down
          case 83:
            // a
            moveBackward = false;
            break;

          case 39: // right
          case 68:
            // d
            moveRight = false;
            break;

          case 16:
            // shift
            runVelocity = 0.25;
            break;

          default:
        }
      }

      document.body.addEventListener('mousemove', onMouseMove, false);
      document.body.addEventListener('keydown', onKeyDown, false);
      document.body.addEventListener('keyup', onKeyUp, false);

      this.enabled = false;

      this.getObject = function () {
        return yawObject;
      };

      this.getDirection = function (targetVec) {
        targetVec.set(0, 0, -1);
        quat.multiplyVector3(targetVec);
      };

      // Moves the camera to the Cannon.js object position
      // and adds velocity to the object if the run key is down.
      var inputVelocity = new THREE.Vector3(),
          euler = new THREE.Euler();

      this.update = function (delta) {
        if (scope.enabled === false) return;

        delta = delta || 0.5;
        delta = Math.min(delta, 0.5);

        inputVelocity.set(0, 0, 0);

        var speed = velocityFactor * delta * params.speed * runVelocity;

        if (moveForward) inputVelocity.z = -speed;
        if (moveBackward) inputVelocity.z = speed;
        if (moveLeft) inputVelocity.x = -speed;
        if (moveRight) inputVelocity.x = speed;

        // Convert velocity to world coordinates
        euler.x = pitchObject.rotation.x;
        euler.y = yawObject.rotation.y;
        euler.order = 'XYZ';

        quat.setFromEuler(euler);

        inputVelocity.applyQuaternion(quat);

        player.applyCentralImpulse({ x: inputVelocity.x * 10, y: 0, z: inputVelocity.z * 10 });
        player.setAngularVelocity({ x: inputVelocity.z * 10, y: 0, z: -inputVelocity.x * 10 });
        player.setAngularFactor({ x: 0, y: 0, z: 0 });

        yawObject.position.copy(player.position);
      };
    }(world.getCamera(), object.getNative(), target);

    if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {
      (function () {
        var element = document.body;

        world.pointerlockchange = function () {
          if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            controls.enabled = true;
            target.block.style.display = 'none';
          } else {
            controls.enabled = false;
            target.block.style.display = 'block';
          }
        };

        document.addEventListener('pointerlockchange', world.pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', world.pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', world.pointerlockchange, false);

        world.pointerlockerror = function () {
          console.warn('Pointer lock error.');
        };

        document.addEventListener('pointerlockerror', world.pointerlockerror, false);
        document.addEventListener('mozpointerlockerror', world.pointerlockerror, false);
        document.addEventListener('webkitpointerlockerror', world.pointerlockerror, false);

        target.block.addEventListener('click', function () {
          element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

          element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

          if (/Firefox/i.test(navigator.userAgent)) {
            (function () {
              var fullscreenchange = function fullscreenchange() {
                if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
                  document.removeEventListener('fullscreenchange', fullscreenchange);
                  document.removeEventListener('mozfullscreenchange', fullscreenchange);

                  element.requestPointerLock();
                }
              };

              document.addEventListener('fullscreenchange', fullscreenchange, false);
              document.addEventListener('mozfullscreenchange', fullscreenchange, false);

              element.requestFullscreen();
            })();
          } else element.requestPointerLock();
        });
      })();
    } else console.warn('Your browser does not support the PointerLock WHS.API.');

    function callback(world) {
      world.getScene().add(world.controls.getObject());
    }

    return [controls, callback];
  };
}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../api":15}],17:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.orbitControls = orbitControls;

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _threeOrbitControls = require('three-orbit-controls');

var _threeOrbitControls2 = _interopRequireDefault(_threeOrbitControls);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ThreeOrbitControls = (0, _threeOrbitControls2.default)(THREE);

function orbitControls(object) {
  return function (world) {
    var controls = new ThreeOrbitControls(world.getCamera().getNative(), world.getRenderer().domElement);

    if (object && object.__whsobject) {
      var _target = object ? object.mesh.position : new THREE.Vector3(0, 0, 0);

      controls.target = _target;
    } else if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object') controls.target.copy(target);

    return controls;
  };
}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-runtime/helpers/typeof":74,"three-orbit-controls":178}],18:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firstPersonControls = require('./controls/firstPersonControls');

(0, _keys2.default)(_firstPersonControls).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _firstPersonControls[key];
    }
  });
});

var _orbitControls = require('./controls/orbitControls');

(0, _keys2.default)(_orbitControls).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _orbitControls[key];
    }
  });
});

var _api = require('./api');

(0, _keys2.default)(_api).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _api[key];
    }
  });
});


},{"./api":15,"./controls/firstPersonControls":16,"./controls/orbitControls":17,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],19:[function(require,module,exports){
(function (global){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./cameras/index');

(0, _keys2.default)(_index).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = require('./core/index');

(0, _keys2.default)(_index2).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});

var _index3 = require('./extensions/index');

(0, _keys2.default)(_index3).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _index3[key];
    }
  });
});

var _index4 = require('./extras/index');

(0, _keys2.default)(_index4).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _index4[key];
    }
  });
});

var _index5 = require('./lights/index');

(0, _keys2.default)(_index5).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _index5[key];
    }
  });
});

var _index6 = require('./meshes/index');

(0, _keys2.default)(_index6).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _index6[key];
    }
  });
});

var _index7 = require('./scenes/index');

(0, _keys2.default)(_index7).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _index7[key];
    }
  });
});

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('./physics/physi.js');

var Physijs = _interopRequireWildcard(_physi);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

if (window) {
  window.THREE = THREE;
  window.Physijs = Physijs;
}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cameras/index":5,"./core/index":12,"./extensions/index":14,"./extras/index":18,"./lights/index":26,"./meshes/index":48,"./physics/physi.js":49,"./scenes/index":54,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],20:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmbientLight = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Light2 = require('../core/Light');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var AmbientLight = function (_Light) {
  (0, _inherits3.default)(AmbientLight, _Light);

  function AmbientLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, AmbientLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AmbientLight).call(this, params, 'ambientlight'));

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(AmbientLight.prototype), 'wrap', _this).call(_this, 'noshadows');
    return _this;
  }

  (0, _createClass3.default)(AmbientLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.AmbientLight(params.light.color, params.light.intensity));

        resolve();
      });
    }
  }]);
  return AmbientLight;
}(_Light2.Light);

exports.AmbientLight = AmbientLight;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Light":8,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],21:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionalLight = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Light2 = require('../core/Light');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var DirectionalLight = function (_Light) {
  (0, _inherits3.default)(DirectionalLight, _Light);

  function DirectionalLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, DirectionalLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DirectionalLight).call(this, params, 'directionallight'));

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(DirectionalLight.prototype), 'wrap', _this).call(_this);
    (0, _get3.default)((0, _getPrototypeOf2.default)(DirectionalLight.prototype), 'wrapShadow', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(DirectionalLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.DirectionalLight(params.light.color, params.light.intensity));

        if (params.helper) {
          _scope.helper = new THREE.DirectionalLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);
        }

        resolve();
      });
    }
  }]);
  return DirectionalLight;
}(_Light2.Light);

exports.DirectionalLight = DirectionalLight;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Light":8,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],22:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HemisphereLight = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Light2 = require('../core/Light');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var HemisphereLight = function (_Light) {
  (0, _inherits3.default)(HemisphereLight, _Light);

  function HemisphereLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, HemisphereLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HemisphereLight).call(this, params, 'hemispherelight'));

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(HemisphereLight.prototype), 'wrap', _this).call(_this);
    (0, _get3.default)((0, _getPrototypeOf2.default)(HemisphereLight.prototype), 'wrapShadow', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(HemisphereLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.HemisphereLight(params.light.skyColor, params.light.groundColor, params.light.intensity));

        if (params.helper) {
          _scope.helper = new THREE.HemisphereLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);
        }

        resolve();
      });
    }
  }]);
  return HemisphereLight;
}(_Light2.Light);

exports.HemisphereLight = HemisphereLight;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Light":8,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],23:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalLight = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Light2 = require('../core/Light');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var NormalLight = function (_Light) {
  (0, _inherits3.default)(NormalLight, _Light);

  function NormalLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, NormalLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NormalLight).call(this, params, 'normallight'));

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(NormalLight.prototype), 'wrap', _this).call(_this);
    (0, _get3.default)((0, _getPrototypeOf2.default)(NormalLight.prototype), 'wrapShadow', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(NormalLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.Light(params.light.color));

        resolve();
      });
    }
  }]);
  return NormalLight;
}(_Light2.Light);

exports.NormalLight = NormalLight;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Light":8,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],24:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointLight = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Light2 = require('../core/Light');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var PointLight = function (_Light) {
  (0, _inherits3.default)(PointLight, _Light);

  function PointLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, PointLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PointLight).call(this, params, 'pointlight'));

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(PointLight.prototype), 'wrap', _this).call(_this);
    (0, _get3.default)((0, _getPrototypeOf2.default)(PointLight.prototype), 'wrapShadow', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(PointLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.PointLight(params.light.color, params.light.intensity, params.light.distance, params.light.decay));

        if (params.helper) {
          _scope.helper = new THREE.PointLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);
        }

        resolve();
      });
    }
  }]);
  return PointLight;
}(_Light2.Light);

exports.PointLight = PointLight;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Light":8,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],25:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpotLight = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Light2 = require('../core/Light');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SpotLight = function (_Light) {
  (0, _inherits3.default)(SpotLight, _Light);

  function SpotLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, SpotLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SpotLight).call(this, params, 'spotlight'));

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(SpotLight.prototype), 'wrap', _this).call(_this);
    (0, _get3.default)((0, _getPrototypeOf2.default)(SpotLight.prototype), 'wrapShadow', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(SpotLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.SpotLight(params.light.color, params.light.intensity, params.light.distance, params.light.angle, params.light.exponent, params.light.decay));

        if (params.helper) _scope.helper = new THREE.SpotLightHelper(_scope.light);

        resolve();
      });
    }
  }]);
  return SpotLight;
}(_Light2.Light);

exports.SpotLight = SpotLight;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Light":8,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],26:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AmbientLight = require('./AmbientLight');

(0, _keys2.default)(_AmbientLight).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _AmbientLight[key];
    }
  });
});

var _DirectionalLight = require('./DirectionalLight');

(0, _keys2.default)(_DirectionalLight).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _DirectionalLight[key];
    }
  });
});

var _HemisphereLight = require('./HemisphereLight');

(0, _keys2.default)(_HemisphereLight).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _HemisphereLight[key];
    }
  });
});

var _NormalLight = require('./NormalLight');

(0, _keys2.default)(_NormalLight).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _NormalLight[key];
    }
  });
});

var _PointLight = require('./PointLight');

(0, _keys2.default)(_PointLight).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _PointLight[key];
    }
  });
});

var _SpotLight = require('./SpotLight');

(0, _keys2.default)(_SpotLight).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _SpotLight[key];
    }
  });
});


},{"./AmbientLight":20,"./DirectionalLight":21,"./HemisphereLight":22,"./NormalLight":23,"./PointLight":24,"./SpotLight":25,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],27:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Box = function (_Shape) {
  (0, _inherits3.default)(Box, _Shape);

  function Box() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Box);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Box).call(this, params, 'box'));

    (0, _api.extend)(params.geometry, {
      width: 1,
      height: 1,
      depth: 1
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Box.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Box, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var Mesh = this.physics ? _physi2.default.BoxMesh : THREE.Mesh;
      var material = (0, _get3.default)((0, _getPrototypeOf2.default)(Box.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _this2.setNative(new Mesh(new THREE.BoxGeometry(params.geometry.width, params.geometry.height, params.geometry.depth), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Box(this.getParams(), this._type).copy(this);
    }
  }]);
  return Box;
}(_Shape2.Shape);

exports.Box = Box;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],28:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvexModel = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ConvexModel = function (_Shape) {
  (0, _inherits3.default)(ConvexModel, _Shape);

  function ConvexModel() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ConvexModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ConvexModel).call(this, params, 'model'));

    (0, _api.extend)(params.geometry, {
      path: '',
      physics: ''
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(ConvexModel.prototype), 'wrap', _this).call(_this, 'wait');
    return _this;
  }

  (0, _createClass3.default)(ConvexModel, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh;

      var promise = new _promise2.default(function (resolve) {
        _api.JSONLoader.load(params.geometry.path, function (data, materials) {
          if (params.geometry.physics) {
            _api.JSONLoader.load(params.geometry.physics, function (data2) {
              var material = void 0;

              if (params.material.useVertexColors) {
                material = (0, _api.loadMaterial)((0, _api.extend)(params.material, {
                  morphTargets: true,
                  vertexColors: THREE.FaceColors
                }))._material;
              } else if (!materials || params.material.useCustomMaterial) {
                material = (0, _api.loadMaterial)(params.material)._material;
              } else material = new THREE.MultiMaterial(materials);

              data.computeFaceNormals();
              data.computeVertexNormals();

              _scope.setNative(new Mesh(data, material, params.mass, data2, params.scale));

              resolve();
            });
          } else {
            var material = void 0;

            if (params.material.useVertexColors) {
              material = (0, _api.loadMaterial)((0, _api.extend)(params.material, {
                morphTargets: true,
                vertexColors: THREE.FaceColors
              }))._material;
            } else if (!materials || params.material.useCustomMaterial) {
              material = (0, _api.loadMaterial)(params.material)._material;
            } else material = new THREE.MultiMaterial(materials);

            data.computeFaceNormals();
            data.computeVertexNormals();

            _scope.setNative(new Mesh(data, material, params.mass));

            resolve();
          }
        });
      });

      (0, _get3.default)((0, _getPrototypeOf2.default)(ConvexModel.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new ConvexModel(this.getParams()).copy(this);
    }
  }]);
  return ConvexModel;
}(_Shape2.Shape);

exports.ConvexModel = ConvexModel;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],29:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cylinder = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Cylinder = function (_Shape) {
  (0, _inherits3.default)(Cylinder, _Shape);

  function Cylinder() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Cylinder);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Cylinder).call(this, params, 'cylinder'));

    (0, _api.extend)(params.geometry, {

      radiusTop: 1,
      radiusBottom: 1,
      height: 1,
      radiusSegments: 32

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Cylinder.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Cylinder, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.CylinderMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Cylinder.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.CylinderGeometry(params.geometry.radiusTop, params.geometry.radiusBottom, params.geometry.height, params.geometry.radiusSegments), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Cylinder(this.getParams(), this._type).copy(this);
    }
  }]);
  return Cylinder;
}(_Shape2.Shape);

exports.Cylinder = Cylinder;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],30:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dodecahedron = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Dodecahedron = function (_Shape) {
  (0, _inherits3.default)(Dodecahedron, _Shape);

  function Dodecahedron() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Dodecahedron);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Dodecahedron).call(this, params, 'dodecahedron'));

    (0, _api.extend)(params.geometry, {

      radius: 1,
      detail: 0

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Dodecahedron.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Dodecahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Dodecahedron.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.DodecahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Dodecahedron(this.getParams(), this._type).copy(this);
    }
  }]);
  return Dodecahedron;
}(_Shape2.Shape);

exports.Dodecahedron = Dodecahedron;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],31:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Extrude = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Extrude = function (_Shape) {
  (0, _inherits3.default)(Extrude, _Shape);

  function Extrude() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Extrude);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Extrude).call(this, params, 'extrude'));

    (0, _api.extend)(params.geometry, {

      shapes: [],
      options: {}

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Extrude.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Extrude, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Extrude.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.ExtrudeGeometry(params.geometry.shapes, params.geometry.options), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Extrude(this.getParams(), this._type).copy(this);
    }
  }]);
  return Extrude;
}(_Shape2.Shape);

exports.Extrude = Extrude;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],32:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icosahedron = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Icosahedron = function (_Shape) {
  (0, _inherits3.default)(Icosahedron, _Shape);

  function Icosahedron() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Icosahedron);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Icosahedron).call(this, params, 'icosahedron'));

    (0, _api.extend)(params.geometry, {

      radius: 1,
      detail: 0

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Icosahedron.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Icosahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Icosahedron.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.IcosahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Icosahderon(this.getParams(), this._type).copy(this);
    }
  }]);
  return Icosahedron;
}(_Shape2.Shape);

exports.Icosahedron = Icosahedron;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],33:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lathe = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Lathe = function (_Shape) {
  (0, _inherits3.default)(Lathe, _Shape);

  function Lathe() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Lathe);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Lathe).call(this, params, 'lathe'));

    (0, _api.extend)(params.geometry, {
      points: []
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Lathe.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Lathe, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Lathe.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.LatheGeometry(params.geometry.points), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Lathe(this.getParams(), this._type).copy(this);
    }
  }]);
  return Lathe;
}(_Shape2.Shape);

exports.Lathe = Lathe;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],34:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Model = function (_Shape) {
  (0, _inherits3.default)(Model, _Shape);

  function Model() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Model);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Model).call(this, params, 'model'));

    (0, _api.extend)(params.geometry, {

      path: '',
      physics: ''

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Model.prototype), 'wrap', _this).call(_this, 'wait');
    return _this;
  }

  (0, _createClass3.default)(Model, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConcaveMesh : THREE.Mesh;

      var promise = new _promise2.default(function (resolve) {
        _api.JSONLoader.load(params.geometry.path, function (data, materials) {
          if (params.geometry.physics) {
            _api.JSONLoader.load(params.geometry.physics, function (data2) {
              var material = void 0;
              if (params.material.useVertexColors) {
                material = (0, _api.loadMaterial)((0, _api.extend)(params.material, {
                  morphTargets: true,
                  vertexColors: THREE.FaceColors
                }))._material;
              } else if (!materials || params.material.useCustomMaterial) {
                material = (0, _api.loadMaterial)(params.material)._material;
              } else material = new THREE.MultiMaterial(materials);

              data.computeFaceNormals();
              data.computeVertexNormals();

              _scope.setNative(new Mesh(data, material, params.mass, data2, params.scale));

              resolve();
            });
          } else {
            if (params.material.useVertexColors) {
              var _material = void 0;
              _material = (0, _api.loadMaterial)((0, _api.extend)(params.material, {
                morphTargets: true,
                vertexColors: THREE.FaceColors
              }))._material;
            } else if (!materials || params.material.useCustomMaterial) {
              material = (0, _api.loadMaterial)(params.material)._material;
            } else material = new THREE.MultiMaterial(materials);

            data.computeFaceNormals();
            data.computeVertexNormals();

            _scope.setNative(new Mesh(data, material, params.mass));

            resolve();
          }
        });
      });

      (0, _get3.default)((0, _getPrototypeOf2.default)(Model.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Model(this.getParams(), this._type).copy(this);
    }
  }]);
  return Model;
}(_Shape2.Shape);

exports.Model = Model;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],35:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Morph = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

var _loaders = require('../utils/loaders');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Morph = function (_Shape) {
  (0, _inherits3.default)(Morph, _Shape);

  function Morph() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Morph);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Morph).call(this, params, 'morph'));

    (0, _api.extend)(params.geometry, {
      path: ''
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Morph.prototype), 'wrap', _this).call(_this, 'wait');
    return _this;
  }

  (0, _createClass3.default)(Morph, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      var promise = new _promise2.default(function (resolve) {
        _loaders.JSONLoader.load(params.geometry.path, function (data, materials) {
          var material = void 0;
          if (params.material.useVertexColors) {
            material = (0, _api.loadMaterial)((0, _api.extend)(params.material, {
              morphTargets: true,
              vertexColors: THREE.FaceColors
            }))._material;
          } else if (!materials || params.material.useCustomMaterial) {
            material = (0, _api.loadMaterial)(params.material)._material;
          } else material = new THREE.MultiMaterial(materials);

          data.computeFaceNormals();
          data.computeVertexNormals();

          // Visualization.
          var mesh = new THREE.Mesh(data, material);
          mesh.speed = params.morph.speed;
          mesh.mixer = new THREE.AnimationMixer(mesh);

          mesh.mixer.clipAction(data.animations[0]).setDuration(params.morph.duration).play();

          _scope.setNative(mesh);

          resolve();
        });
      });

      (0, _get3.default)((0, _getPrototypeOf2.default)(Morph.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Morph(this.getParams(), this._type).copy(this);
    }
  }]);
  return Morph;
}(_Shape2.Shape);

exports.Morph = Morph;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"../utils/loaders":56,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],36:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Octahedron = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Octahedron = function (_Shape) {
  (0, _inherits3.default)(Octahedron, _Shape);

  function Octahedron() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Octahedron);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Octahedron).call(this, params, 'octahedron'));

    (0, _api.extend)(params.geometry, {

      radius: 1,
      detail: 0

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Octahedron.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Octahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Octahedron.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.OctahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Octahedron(this.getParams(), this._type).copy(this);
    }
  }]);
  return Octahedron;
}(_Shape2.Shape);

exports.Octahedron = Octahedron;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],37:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parametric = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Parametric = function (_Shape) {
  (0, _inherits3.default)(Parametric, _Shape);

  function Parametric() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Parametric);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Parametric).call(this, params, 'parametric'));

    (0, _api.extend)(params.geometry, {
      func: function func() {},

      slices: 10,
      stacks: 10

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Parametric.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Parametric, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConcaveMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Parametric.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.ParametricGeometry(params.geometry.func, params.geometry.slices, params.geometry.stacks), material, params.mass));

        resolve();
      });
    }

    /**
     * Clone parametric.
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new Parametric(this.getParams(), this._type).copy(this);
    }
  }]);
  return Parametric;
}(_Shape2.Shape);

exports.Parametric = Parametric;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],38:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Plane = function (_Shape) {
  (0, _inherits3.default)(Plane, _Shape);

  function Plane() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Plane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Plane).call(this, params, 'plane'));

    (0, _api.extend)(params.geometry, {

      width: 10,
      height: 10,
      segments: 32

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Plane.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Plane, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.PlaneMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Plane.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.PlaneGeometry(params.geometry.width, params.geometry.height, params.geometry.segments), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Plane(this.getParams(), this._type).copy(this);
    }
  }]);
  return Plane;
}(_Shape2.Shape);

exports.Plane = Plane;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],39:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polyhedron = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Polyhedron = function (_Shape) {
  (0, _inherits3.default)(Polyhedron, _Shape);

  function Polyhedron() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Polyhedron);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Polyhedron).call(this, params, 'polyhedron'));

    (0, _api.extend)(params.geometry, {

      verticesOfCube: _this.verticesOfCube,
      indicesOfFaces: _this.indicesOfFaces,
      radius: 6,
      detail: 2

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Polyhedron.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Polyhedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Polyhedron.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.PolyhedronGeometry(params.geometry.verticesOfCube, params.geometry.indicesOfFaces, params.geometry.radius, params.geometry.detail), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Polyhedron(this.getParams(), this._type).copy(this);
    }
  }, {
    key: 'verticesOfCube',
    get: function get() {
      return [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
    }
  }, {
    key: 'indicesOfFaces',
    get: function get() {
      return [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4];
    }
  }]);
  return Polyhedron;
}(_Shape2.Shape);

exports.Polyhedron = Polyhedron;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],40:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ring = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Ring = function (_Shape) {
  (0, _inherits3.default)(Ring, _Shape);

  function Ring() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Ring);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Ring).call(this, params, 'ring'));

    (0, _api.extend)(params.geometry, {

      innerRadius: 0,
      outerRadius: 50,
      thetaSegments: 8,
      phiSegments: 8,
      thetaStart: 0,
      thetaLength: Math.PI * 2

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Ring.prototype), 'wrap', _this).call(_this, 'onlyvis');
    return _this;
  }

  (0, _createClass3.default)(Ring, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Ring.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.Mesh(new THREE.RingGeometry(params.geometry.innerRadius, params.geometry.outerRadius, params.geometry.thetaSegments, params.geometry.phiSegments, params.geometry.thetaStart, params.geometry.thetaLength), material));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Ring(this.getParams(), this._type).copy(this);
    }
  }]);
  return Ring;
}(_Shape2.Shape);

exports.Ring = Ring;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],41:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape2D = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Shape2D = function (_Shape) {
  (0, _inherits3.default)(Shape2D, _Shape);

  function Shape2D() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Shape2D);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Shape2D).call(this, params, 'shape2D'));

    (0, _api.extend)(params.geometry, {
      shapes: []
    });

    (0, _get3.default)((0, _getPrototypeOf2.default)(Shape2D.prototype), 'build', _this).call(_this, params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Shape2D.prototype), 'wrap', _this).call(_this, 'onlyvis');
    return _this;
  }

  (0, _createClass3.default)(Shape2D, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Shape2D.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.Mesh(new THREE.ShapeGeometry(params.geometry.shapes), material));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Shape2D(this.getParams(), this._type).copy(this);
    }
  }]);
  return Shape2D;
}(_Shape2.Shape);

exports.Shape2D = Shape2D;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],42:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sphere = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Sphere = function (_Shape) {
  (0, _inherits3.default)(Sphere, _Shape);

  function Sphere() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Sphere);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Sphere).call(this, params, 'sphere'));

    (0, _api.extend)(params.geometry, {

      radius: 1,
      segmentA: 32,
      segmentB: 32

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Sphere.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Sphere, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.SphereMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Sphere.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.SphereGeometry(params.geometry.radius, params.geometry.segmentA, params.geometry.segmentB), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Sphere(this.getParams(), this._type).copy(this);
    }
  }]);
  return Sphere;
}(_Shape2.Shape);

exports.Sphere = Sphere;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],43:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tetrahedron = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Tetrahedron = function (_Shape) {
  (0, _inherits3.default)(Tetrahedron, _Shape);

  function Tetrahedron() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Tetrahedron);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tetrahedron).call(this, params, 'tetrahedron'));

    (0, _api.extend)(params.geometry, {

      radius: 1,
      detail: 0

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Tetrahedron.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Tetrahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Tetrahedron.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.TetrahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Tetrahedron(this.getParams(), this._type).copy(this);
    }
  }]);
  return Tetrahedron;
}(_Shape2.Shape);

exports.Tetrahedron = Tetrahedron;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],44:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Text = function (_Shape) {
  (0, _inherits3.default)(Text, _Shape);

  function Text() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Text);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Text).call(this, params, 'text'));

    (0, _api.extend)(params.geometry, {
      text: 'Hello World!',

      parameters: {
        size: 12,
        height: 50,
        curveSegments: 12,
        font: new THREE.Font(),
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8
      }
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Text.prototype), 'wrap', _this).call(_this, 'wait');
    return _this;
  }

  (0, _createClass3.default)(Text, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConcaveMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Text.prototype), '_initMaterial', this).call(this, params.material);

      var promise = new _promise2.default(function (resolve) {
        _api.FontLoader.load(params.geometry.parameters.font, function (font) {
          params.geometry.parameters.font = font;

          _scope.setNative(new Mesh(new THREE.TextGeometry(params.geometry.text, params.geometry.parameters), material, params.mass));

          resolve();
        });
      });

      (0, _get3.default)((0, _getPrototypeOf2.default)(Text.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Text(this.getParams(), this._type).copy(this);
    }
  }]);
  return Text;
}(_Shape2.Shape);

exports.Text = Text;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],45:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Torus = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Torus = function (_Shape) {
  (0, _inherits3.default)(Torus, _Shape);

  function Torus() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Torus);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Torus).call(this, params, 'torus'));

    (0, _api.extend)(params.geometry, {

      radius: 100,
      tube: 40,
      radialSegments: 8,
      tubularSegments: 6,
      arc: Math.PI * 2

    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Torus.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Torus, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Torus.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.TorusGeometry(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.arc), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Torus(this.getParams(), this._type).copy(this);
    }
  }]);
  return Torus;
}(_Shape2.Shape);

exports.Torus = Torus;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],46:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Torusknot = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Torusknot = function (_Shape) {
  (0, _inherits3.default)(Torusknot, _Shape);

  function Torusknot() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Torusknot);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Torusknot).call(this, params, 'Torusknot'));

    (0, _api.extend)(params.geometry, {

      radius: 100,
      tube: 40,
      radialSegments: 64,
      tubularSegments: 8,
      p: 2,
      q: 3,
      heightScale: 1

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Torusknot.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Torusknot, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Torusknot.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.TorusKnotGeometry(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.p, params.geometry.q, params.geometry.heightScale), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Torusknot(this.getParams(), this._type).copy(this);
    }
  }]);
  return Torusknot;
}(_Shape2.Shape);

exports.Torusknot = Torusknot;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],47:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tube = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Tube = function (_Shape) {
  (0, _inherits3.default)(Tube, _Shape);

  function Tube() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Tube);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tube).call(this, params, 'tube'));

    (0, _api.extend)(params.geometry, {

      path: options.geometryOptions.path ? new _this.CustomSinCurve(100) : false,
      segments: 20,
      radius: 2,
      radiusSegments: 8,
      closed: false

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Tube.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Tube, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Tube.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.TubeGeometry(params.geometry.path, params.geometry.segments, params.geometry.radius, params.geometry.radiusSegments, params.geometry.closed), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',

    /**
     * Clone tube.
     */
    value: function clone() {
      return new Tube(this.getParams(), this._type).copy(this);
    }
  }, {
    key: 'CustomSinCurve',
    get: function get() {
      var _this2 = this;

      return THREE.Curve.create(function (scale) {
        // custom curve constructor
        _this2.scale = scale || 1;
      }, function (t) {
        // getPoint: t is between 0-1
        var tx = t * 3 - 1.5,
            ty = Math.sin(2 * Math.PI * t),
            tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(_this2.scale);
      });
    }
  }]);
  return Tube;
}(_Shape2.Shape);

exports.Tube = Tube;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"../physics/physi.js":49,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/core-js/promise":66,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],48:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Box = require('./Box');

(0, _keys2.default)(_Box).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Box[key];
    }
  });
});

var _ConvexModel = require('./ConvexModel');

(0, _keys2.default)(_ConvexModel).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConvexModel[key];
    }
  });
});

var _Cylinder = require('./Cylinder');

(0, _keys2.default)(_Cylinder).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Cylinder[key];
    }
  });
});

var _Dodecahedron = require('./Dodecahedron');

(0, _keys2.default)(_Dodecahedron).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Dodecahedron[key];
    }
  });
});

var _Extrude = require('./Extrude');

(0, _keys2.default)(_Extrude).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Extrude[key];
    }
  });
});

var _Icosahedron = require('./Icosahedron');

(0, _keys2.default)(_Icosahedron).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Icosahedron[key];
    }
  });
});

var _Lathe = require('./Lathe');

(0, _keys2.default)(_Lathe).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Lathe[key];
    }
  });
});

var _Model = require('./Model');

(0, _keys2.default)(_Model).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Model[key];
    }
  });
});

var _Morph = require('./Morph');

(0, _keys2.default)(_Morph).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Morph[key];
    }
  });
});

var _Octahedron = require('./Octahedron');

(0, _keys2.default)(_Octahedron).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Octahedron[key];
    }
  });
});

var _Parametric = require('./Parametric');

(0, _keys2.default)(_Parametric).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Parametric[key];
    }
  });
});

var _Plane = require('./Plane');

(0, _keys2.default)(_Plane).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Plane[key];
    }
  });
});

var _Polyhedron = require('./Polyhedron');

(0, _keys2.default)(_Polyhedron).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Polyhedron[key];
    }
  });
});

var _Ring = require('./Ring');

(0, _keys2.default)(_Ring).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Ring[key];
    }
  });
});

var _Shape2D = require('./Shape2D');

(0, _keys2.default)(_Shape2D).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Shape2D[key];
    }
  });
});

var _Sphere = require('./Sphere');

(0, _keys2.default)(_Sphere).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Sphere[key];
    }
  });
});

var _Tetrahedron = require('./Tetrahedron');

(0, _keys2.default)(_Tetrahedron).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Tetrahedron[key];
    }
  });
});

var _Text = require('./Text');

(0, _keys2.default)(_Text).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Text[key];
    }
  });
});

var _Torus = require('./Torus');

(0, _keys2.default)(_Torus).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Torus[key];
    }
  });
});

var _Torusknot = require('./Torusknot');

(0, _keys2.default)(_Torusknot).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Torusknot[key];
    }
  });
});

var _Tube = require('./Tube');

(0, _keys2.default)(_Tube).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Tube[key];
    }
  });
});


},{"./Box":27,"./ConvexModel":28,"./Cylinder":29,"./Dodecahedron":30,"./Extrude":31,"./Icosahedron":32,"./Lathe":33,"./Model":34,"./Morph":35,"./Octahedron":36,"./Parametric":37,"./Plane":38,"./Polyhedron":39,"./Ring":40,"./Shape2D":41,"./Sphere":42,"./Tetrahedron":43,"./Text":44,"./Torus":45,"./Torusknot":46,"./Tube":47,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],49:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

var SUPPORT_TRANSFERABLE,
    _Physijs = Physijs,


// used for noConflict method
Physijs = {},


// object assigned to window.Physijs
Eventable,


// class to provide simple event methods
getObjectId,


// returns a unique ID for a Physijs mesh object
getEulerXYZFromQuaternion,
    getQuatertionFromEuler,
    convertWorldPositionToObject,


// Converts a world-space position to object-space
_addObjectChildren,
    _temp1,
    _temp2,
    _temp_vector3_1 = new THREE.Vector3(),
    _temp_vector3_2 = new THREE.Vector3(),
    _temp_matrix4_1 = new THREE.Matrix4(),
    _quaternion_1 = new THREE.Quaternion(),


// constants
MESSAGE_TYPES = {
  WORLDREPORT: 0,
  COLLISIONREPORT: 1,
  VEHICLEREPORT: 2,
  CONSTRAINTREPORT: 3
},
    REPORT_ITEMSIZE = 14,
    COLLISIONREPORT_ITEMSIZE = 5,
    VEHICLEREPORT_ITEMSIZE = 9,
    CONSTRAINTREPORT_ITEMSIZE = 6;

Physijs.scripts = {};

Eventable = function Eventable() {
  this._eventListeners = {};
};
Eventable.prototype.addEventListener = function (event_name, callback) {
  if (!this._eventListeners.hasOwnProperty(event_name)) {
    this._eventListeners[event_name] = [];
  }
  this._eventListeners[event_name].push(callback);
};
Eventable.prototype.removeEventListener = function (event_name, callback) {
  var index;

  if (!this._eventListeners.hasOwnProperty(event_name)) return false;

  if ((index = this._eventListeners[event_name].indexOf(callback)) >= 0) {
    this._eventListeners[event_name].splice(index, 1);
    return true;
  }

  return false;
};
Eventable.prototype.dispatchEvent = function (event_name) {
  var i,
      parameters = Array.prototype.splice.call(arguments, 1);

  if (this._eventListeners.hasOwnProperty(event_name)) {
    for (i = 0; i < this._eventListeners[event_name].length; i++) {
      this._eventListeners[event_name][i].apply(this, parameters);
    }
  }
};
Eventable.make = function (obj) {
  obj.prototype.addEventListener = Eventable.prototype.addEventListener;
  obj.prototype.removeEventListener = Eventable.prototype.removeEventListener;
  obj.prototype.dispatchEvent = Eventable.prototype.dispatchEvent;
};

getObjectId = function () {
  var _id = 1;
  return function () {
    return _id++;
  };
}();

getEulerXYZFromQuaternion = function getEulerXYZFromQuaternion(x, y, z, w) {
  return new THREE.Vector3(Math.atan2(2 * (x * w - y * z), w * w - x * x - y * y + z * z), Math.asin(2 * (x * z + y * w)), Math.atan2(2 * (z * w - x * y), w * w + x * x - y * y - z * z));
};

getQuatertionFromEuler = function getQuatertionFromEuler(x, y, z) {
  var c1, s1, c2, s2, c3, s3, c1c2, s1s2;
  c1 = Math.cos(y);
  s1 = Math.sin(y);
  c2 = Math.cos(-z);
  s2 = Math.sin(-z);
  c3 = Math.cos(x);
  s3 = Math.sin(x);

  c1c2 = c1 * c2;
  s1s2 = s1 * s2;

  return {
    w: c1c2 * c3 - s1s2 * s3,
    x: c1c2 * s3 + s1s2 * c3,
    y: s1 * c2 * c3 + c1 * s2 * s3,
    z: c1 * s2 * c3 - s1 * c2 * s3
  };
};

convertWorldPositionToObject = function convertWorldPositionToObject(position, object) {
  _temp_matrix4_1.identity(); // reset temp matrix

  // Set the temp matrix's rotation to the object's rotation
  _temp_matrix4_1.identity().makeRotationFromQuaternion(object.quaternion);

  // Invert rotation matrix in order to "unrotate" a point back to object space
  _temp_matrix4_1.getInverse(_temp_matrix4_1);

  // Yay! Temp vars!
  _temp_vector3_1.copy(position);
  _temp_vector3_2.copy(object.position);

  // Apply the rotation

  return _temp_vector3_1.sub(_temp_vector3_2).applyMatrix4(_temp_matrix4_1);
};

// Physijs.noConflict
Physijs.noConflict = function () {
  window.Physijs = _Physijs;
  return Physijs;
};

// Physijs.createMaterial
Physijs.createMaterial = function (material, friction, restitution) {
  var physijs_material = function physijs_material() {};
  physijs_material.prototype = material;
  physijs_material = new physijs_material();

  physijs_material._physijs = {
    id: material.id,
    friction: friction === undefined ? .8 : friction,
    restitution: restitution === undefined ? .2 : restitution
  };

  return physijs_material;
};

// Constraints
Physijs.PointConstraint = function (objecta, objectb, position) {
  if (position === undefined) {
    position = objectb;
    objectb = undefined;
  }

  this.type = 'point';
  this.appliedImpulse = 0;
  this.id = getObjectId();
  this.objecta = objecta._physijs.id;
  this.positiona = convertWorldPositionToObject(position, objecta).clone();

  if (objectb) {
    this.objectb = objectb._physijs.id;
    this.positionb = convertWorldPositionToObject(position, objectb).clone();
  }
};
Physijs.PointConstraint.prototype.getDefinition = function () {
  return {
    type: this.type,
    id: this.id,
    objecta: this.objecta,
    objectb: this.objectb,
    positiona: this.positiona,
    positionb: this.positionb
  };
};

Physijs.HingeConstraint = function (objecta, objectb, position, axis) {
  if (axis === undefined) {
    axis = position;
    position = objectb;
    objectb = undefined;
  }

  this.type = 'hinge';
  this.appliedImpulse = 0;
  this.id = getObjectId();
  this.scene = objecta.parent;
  this.objecta = objecta._physijs.id;
  this.positiona = convertWorldPositionToObject(position, objecta).clone();
  this.position = position.clone();
  this.axis = axis;

  if (objectb) {
    this.objectb = objectb._physijs.id;
    this.positionb = convertWorldPositionToObject(position, objectb).clone();
  }
};
Physijs.HingeConstraint.prototype.getDefinition = function () {
  return {
    type: this.type,
    id: this.id,
    objecta: this.objecta,
    objectb: this.objectb,
    positiona: this.positiona,
    positionb: this.positionb,
    axis: this.axis
  };
};
/*
 * low = minimum angle in radians
 * high = maximum angle in radians
 * bias_factor = applied as a factor to constraint error
 * relaxation_factor = controls bounce (0.0 == no bounce)
 */
Physijs.HingeConstraint.prototype.setLimits = function (low, high, bias_factor, relaxation_factor) {
  this.scene.execute('hinge_setLimits', {
    constraint: this.id,
    low: low,
    high: high,
    bias_factor: bias_factor,
    relaxation_factor: relaxation_factor
  });
};
Physijs.HingeConstraint.prototype.enableAngularMotor = function (velocity, acceleration) {
  this.scene.execute('hinge_enableAngularMotor', {
    constraint: this.id,
    velocity: velocity,
    acceleration: acceleration
  });
};
Physijs.HingeConstraint.prototype.disableMotor = function (velocity, acceleration) {
  this.scene.execute('hinge_disableMotor', { constraint: this.id });
};

Physijs.SliderConstraint = function (objecta, objectb, position, axis) {
  if (axis === undefined) {
    axis = position;
    position = objectb;
    objectb = undefined;
  }

  this.type = 'slider';
  this.appliedImpulse = 0;
  this.id = getObjectId();
  this.scene = objecta.parent;
  this.objecta = objecta._physijs.id;
  this.positiona = convertWorldPositionToObject(position, objecta).clone();
  this.axis = axis;

  if (objectb) {
    this.objectb = objectb._physijs.id;
    this.positionb = convertWorldPositionToObject(position, objectb).clone();
  }
};
Physijs.SliderConstraint.prototype.getDefinition = function () {
  return {
    type: this.type,
    id: this.id,
    objecta: this.objecta,
    objectb: this.objectb,
    positiona: this.positiona,
    positionb: this.positionb,
    axis: this.axis
  };
};
Physijs.SliderConstraint.prototype.setLimits = function (lin_lower, lin_upper, ang_lower, ang_upper) {
  this.scene.execute('slider_setLimits', {
    constraint: this.id,
    lin_lower: lin_lower,
    lin_upper: lin_upper,
    ang_lower: ang_lower,
    ang_upper: ang_upper
  });
};
Physijs.SliderConstraint.prototype.setRestitution = function (linear, angular) {
  this.scene.execute('slider_setRestitution', {
    constraint: this.id,
    linear: linear,
    angular: angular
  });
};
Physijs.SliderConstraint.prototype.enableLinearMotor = function (velocity, acceleration) {
  this.scene.execute('slider_enableLinearMotor', {
    constraint: this.id,
    velocity: velocity,
    acceleration: acceleration
  });
};
Physijs.SliderConstraint.prototype.disableLinearMotor = function () {
  this.scene.execute('slider_disableLinearMotor', { constraint: this.id });
};
Physijs.SliderConstraint.prototype.enableAngularMotor = function (velocity, acceleration) {
  this.scene.execute('slider_enableAngularMotor', {
    constraint: this.id,
    velocity: velocity,
    acceleration: acceleration
  });
};
Physijs.SliderConstraint.prototype.disableAngularMotor = function () {
  this.scene.execute('slider_disableAngularMotor', { constraint: this.id });
};

Physijs.ConeTwistConstraint = function (objecta, objectb, position) {
  if (position === undefined) {
    throw 'Both objects must be defined in a ConeTwistConstraint.';
  }
  this.type = 'conetwist';
  this.appliedImpulse = 0;
  this.id = getObjectId();
  this.scene = objecta.parent;
  this.objecta = objecta._physijs.id;
  this.positiona = convertWorldPositionToObject(position, objecta).clone();
  this.objectb = objectb._physijs.id;
  this.positionb = convertWorldPositionToObject(position, objectb).clone();
  this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };
  this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
};
Physijs.ConeTwistConstraint.prototype.getDefinition = function () {
  return {
    type: this.type,
    id: this.id,
    objecta: this.objecta,
    objectb: this.objectb,
    positiona: this.positiona,
    positionb: this.positionb,
    axisa: this.axisa,
    axisb: this.axisb
  };
};
Physijs.ConeTwistConstraint.prototype.setLimit = function (x, y, z) {
  this.scene.execute('conetwist_setLimit', { constraint: this.id, x: x, y: y, z: z });
};
Physijs.ConeTwistConstraint.prototype.enableMotor = function () {
  this.scene.execute('conetwist_enableMotor', { constraint: this.id });
};
Physijs.ConeTwistConstraint.prototype.setMaxMotorImpulse = function (max_impulse) {
  this.scene.execute('conetwist_setMaxMotorImpulse', { constraint: this.id, max_impulse: max_impulse });
};
Physijs.ConeTwistConstraint.prototype.setMotorTarget = function (target) {
  if (target instanceof THREE.Vector3) {
    target = new THREE.Quaternion().setFromEuler(new THREE.Euler(target.x, target.y, target.z));
  } else if (target instanceof THREE.Euler) {
    target = new THREE.Quaternion().setFromEuler(target);
  } else if (target instanceof THREE.Matrix4) {
    target = new THREE.Quaternion().setFromRotationMatrix(target);
  }
  this.scene.execute('conetwist_setMotorTarget', {
    constraint: this.id,
    x: target.x,
    y: target.y,
    z: target.z,
    w: target.w
  });
};
Physijs.ConeTwistConstraint.prototype.disableMotor = function () {
  this.scene.execute('conetwist_disableMotor', { constraint: this.id });
};

Physijs.DOFConstraint = function (objecta, objectb, position) {
  if (position === undefined) {
    position = objectb;
    objectb = undefined;
  }
  this.type = 'dof';
  this.appliedImpulse = 0;
  this.id = getObjectId();
  this.scene = objecta.parent;
  this.objecta = objecta._physijs.id;
  this.positiona = convertWorldPositionToObject(position, objecta).clone();
  this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };

  if (objectb) {
    this.objectb = objectb._physijs.id;
    this.positionb = convertWorldPositionToObject(position, objectb).clone();
    this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
  }
};
Physijs.DOFConstraint.prototype.getDefinition = function () {
  return {
    type: this.type,
    id: this.id,
    objecta: this.objecta,
    objectb: this.objectb,
    positiona: this.positiona,
    positionb: this.positionb,
    axisa: this.axisa,
    axisb: this.axisb
  };
};
Physijs.DOFConstraint.prototype.setLinearLowerLimit = function (limit) {
  this.scene.execute('dof_setLinearLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
};
Physijs.DOFConstraint.prototype.setLinearUpperLimit = function (limit) {
  this.scene.execute('dof_setLinearUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
};
Physijs.DOFConstraint.prototype.setAngularLowerLimit = function (limit) {
  this.scene.execute('dof_setAngularLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
};
Physijs.DOFConstraint.prototype.setAngularUpperLimit = function (limit) {
  this.scene.execute('dof_setAngularUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
};
Physijs.DOFConstraint.prototype.enableAngularMotor = function (which) {
  this.scene.execute('dof_enableAngularMotor', { constraint: this.id, which: which });
};
Physijs.DOFConstraint.prototype.configureAngularMotor = function (which, low_angle, high_angle, velocity, max_force) {
  this.scene.execute('dof_configureAngularMotor', {
    constraint: this.id,
    which: which,
    low_angle: low_angle,
    high_angle: high_angle,
    velocity: velocity,
    max_force: max_force
  });
};
Physijs.DOFConstraint.prototype.disableAngularMotor = function (which) {
  this.scene.execute('dof_disableAngularMotor', { constraint: this.id, which: which });
};

// Physijs.Scene
Physijs.Scene = function (params) {
  var self = this;

  Eventable.call(this);
  THREE.Scene.call(this);

  this._worker = new Worker(Physijs.scripts.worker || 'physijs_worker.js');
  this._worker.transferableMessage = this._worker.webkitPostMessage || this._worker.postMessage;
  this._materials_ref_counts = {};
  this._objects = {};
  this._vehicles = {};
  this._constraints = {};
  this._is_simulating = false;

  var ab = new ArrayBuffer(1);
  this._worker.transferableMessage(ab, [ab]);
  SUPPORT_TRANSFERABLE = ab.byteLength === 0;

  this._worker.onmessage = function (event) {
    var _temp,
        data = event.data;

    if (data instanceof ArrayBuffer && data.byteLength !== 1) {
      // byteLength === 1 is the worker making a SUPPORT_TRANSFERABLE test
      data = new Float32Array(data);
    }

    if (data instanceof Float32Array) {

      // transferable object
      switch (data[0]) {
        case MESSAGE_TYPES.WORLDREPORT:
          self._updateScene(data);
          break;

        case MESSAGE_TYPES.COLLISIONREPORT:
          self._updateCollisions(data);
          break;

        case MESSAGE_TYPES.VEHICLEREPORT:
          self._updateVehicles(data);
          break;

        case MESSAGE_TYPES.CONSTRAINTREPORT:
          self._updateConstraints(data);
          break;
      }
    } else {

      if (data.cmd) {

        // non-transferable object
        switch (data.cmd) {
          case 'objectReady':
            _temp = data.params;
            if (self._objects[_temp]) {
              self._objects[_temp].dispatchEvent('ready');
            }
            break;

          case 'worldReady':
            self.dispatchEvent('ready');
            break;

          case 'vehicle':
            window.test = data;
            break;

          default:
            // Do nothing, just show the message
            console.debug('Received: ' + data.cmd);
            console.dir(data.params);
            break;
        }
      } else {

        switch (data[0]) {
          case MESSAGE_TYPES.WORLDREPORT:
            self._updateScene(data);
            break;

          case MESSAGE_TYPES.COLLISIONREPORT:
            self._updateCollisions(data);
            break;

          case MESSAGE_TYPES.VEHICLEREPORT:
            self._updateVehicles(data);
            break;

          case MESSAGE_TYPES.CONSTRAINTREPORT:
            self._updateConstraints(data);
            break;
        }
      }
    }
  };

  params = params || {};
  params.ammo = Physijs.scripts.ammo || 'ammo.js';
  params.fixedTimeStep = params.fixedTimeStep || 1 / 60;
  params.rateLimit = params.rateLimit || true;
  this.execute('init', params);

  console.log(this._worker);
};

Physijs.Scene.prototype = new THREE.Scene();
Physijs.Scene.prototype.constructor = Physijs.Scene;
Eventable.make(Physijs.Scene);

Physijs.Scene.prototype._updateScene = function (data) {
  var num_objects = data[1],
      object,
      i,
      offset;

  for (i = 0; i < num_objects; i++) {
    offset = 2 + i * REPORT_ITEMSIZE;
    object = this._objects[data[offset]];

    if (object === undefined) {
      continue;
    }

    if (object.__dirtyPosition === false) {
      object.position.set(data[offset + 1], data[offset + 2], data[offset + 3]);
    }

    if (object.__dirtyRotation === false) {
      object.quaternion.set(data[offset + 4], data[offset + 5], data[offset + 6], data[offset + 7]);
    }

    object._physijs.linearVelocity.set(data[offset + 8], data[offset + 9], data[offset + 10]);

    object._physijs.angularVelocity.set(data[offset + 11], data[offset + 12], data[offset + 13]);
  }

  if (SUPPORT_TRANSFERABLE) {
    // Give the typed array back to the worker
    this._worker.transferableMessage(data.buffer, [data.buffer]);
  }

  this._is_simulating = false;
  this.dispatchEvent('update');
};

Physijs.Scene.prototype._updateVehicles = function (data) {
  var vehicle, wheel, i, offset;

  for (i = 0; i < (data.length - 1) / VEHICLEREPORT_ITEMSIZE; i++) {
    offset = 1 + i * VEHICLEREPORT_ITEMSIZE;
    vehicle = this._vehicles[data[offset]];

    if (vehicle === undefined) {
      continue;
    }

    wheel = vehicle.wheels[data[offset + 1]];

    wheel.position.set(data[offset + 2], data[offset + 3], data[offset + 4]);

    wheel.quaternion.set(data[offset + 5], data[offset + 6], data[offset + 7], data[offset + 8]);
  }

  if (SUPPORT_TRANSFERABLE) {
    // Give the typed array back to the worker
    this._worker.transferableMessage(data.buffer, [data.buffer]);
  }
};

Physijs.Scene.prototype._updateConstraints = function (data) {
  var constraint, object, i, offset;

  for (i = 0; i < (data.length - 1) / CONSTRAINTREPORT_ITEMSIZE; i++) {
    offset = 1 + i * CONSTRAINTREPORT_ITEMSIZE;
    constraint = this._constraints[data[offset]];
    object = this._objects[data[offset + 1]];

    if (constraint === undefined || object === undefined) {
      continue;
    }

    _temp_vector3_1.set(data[offset + 2], data[offset + 3], data[offset + 4]);
    _temp_matrix4_1.extractRotation(object.matrix);
    _temp_vector3_1.applyMatrix4(_temp_matrix4_1);

    constraint.positiona.addVectors(object.position, _temp_vector3_1);
    constraint.appliedImpulse = data[offset + 5];
  }

  if (SUPPORT_TRANSFERABLE) {
    // Give the typed array back to the worker
    this._worker.transferableMessage(data.buffer, [data.buffer]);
  }
};

Physijs.Scene.prototype._updateCollisions = function (data) {
  /**
   * #TODO
   * This is probably the worst way ever to handle collisions. The inherent evilness is a residual
   * effect from the previous version's evilness which mutated when switching to transferable objects.
   *
   * If you feel inclined to make this better, please do so.
   */

  var i,
      j,
      offset,
      object,
      object2,
      id1,
      id2,
      collisions = {},
      normal_offsets = {};

  // Build collision manifest
  for (i = 0; i < data[1]; i++) {
    offset = 2 + i * COLLISIONREPORT_ITEMSIZE;
    object = data[offset];
    object2 = data[offset + 1];

    normal_offsets[object + '-' + object2] = offset + 2;
    normal_offsets[object2 + '-' + object] = -1 * (offset + 2);

    // Register collisions for both the object colliding and the object being collided with
    if (!collisions[object]) collisions[object] = [];
    collisions[object].push(object2);

    if (!collisions[object2]) collisions[object2] = [];
    collisions[object2].push(object);
  }

  // Deal with collisions
  for (id1 in this._objects) {
    if (!this._objects.hasOwnProperty(id1)) continue;
    object = this._objects[id1];

    // If object touches anything, ...
    if (collisions[id1]) {

      // Clean up touches array
      for (j = 0; j < object._physijs.touches.length; j++) {
        if (collisions[id1].indexOf(object._physijs.touches[j]) === -1) {
          object._physijs.touches.splice(j--, 1);
        }
      }

      // Handle each colliding object
      for (j = 0; j < collisions[id1].length; j++) {
        id2 = collisions[id1][j];
        object2 = this._objects[id2];

        if (object2) {
          // If object was not already touching object2, notify object
          if (object._physijs.touches.indexOf(id2) === -1) {
            object._physijs.touches.push(id2);

            _temp_vector3_1.subVectors(object.getLinearVelocity(), object2.getLinearVelocity());
            _temp1 = _temp_vector3_1.clone();

            _temp_vector3_1.subVectors(object.getAngularVelocity(), object2.getAngularVelocity());
            _temp2 = _temp_vector3_1.clone();

            var normal_offset = normal_offsets[object._physijs.id + '-' + object2._physijs.id];
            if (normal_offset > 0) {
              _temp_vector3_1.set(-data[normal_offset], -data[normal_offset + 1], -data[normal_offset + 2]);
            } else {
              normal_offset *= -1;
              _temp_vector3_1.set(data[normal_offset], data[normal_offset + 1], data[normal_offset + 2]);
            }

            object.dispatchEvent('collision', object2, _temp1, _temp2, _temp_vector3_1);
          }
        }
      }
    } else {

      // not touching other objects
      object._physijs.touches.length = 0;
    }
  }

  this.collisions = collisions;

  if (SUPPORT_TRANSFERABLE) {
    // Give the typed array back to the worker
    this._worker.transferableMessage(data.buffer, [data.buffer]);
  }
};

Physijs.Scene.prototype.addConstraint = function (constraint, show_marker) {
  this._constraints[constraint.id] = constraint;
  this.execute('addConstraint', constraint.getDefinition());

  if (show_marker) {
    var marker;

    switch (constraint.type) {
      case 'point':
        marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());
        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;

      case 'hinge':
        marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());
        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;

      case 'slider':
        marker = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 1), new THREE.MeshNormalMaterial());
        marker.position.copy(constraint.positiona);
        // This rotation isn't right if all three axis are non-0 values
        // TODO: change marker's rotation order to ZYX
        marker.rotation.set(constraint.axis.y, // yes, y and
        constraint.axis.x, // x axis are swapped
        constraint.axis.z);
        this._objects[constraint.objecta].add(marker);
        break;

      case 'conetwist':
        marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());
        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;

      case 'dof':
        marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());
        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;
    }
  }

  return constraint;
};

Physijs.Scene.prototype.onSimulationResume = function () {
  this.execute('onSimulationResume', {});
};

Physijs.Scene.prototype.removeConstraint = function (constraint) {
  if (this._constraints[constraint.id] !== undefined) {
    this.execute('removeConstraint', { id: constraint.id });
    delete this._constraints[constraint.id];
  }
};

Physijs.Scene.prototype.execute = function (cmd, params) {
  this._worker.postMessage({ cmd: cmd, params: params });
};

_addObjectChildren = function addObjectChildren(parent, object) {
  var i;

  for (i = 0; i < object.children.length; i++) {
    if (object.children[i]._physijs) {
      object.children[i].updateMatrix();
      object.children[i].updateMatrixWorld();

      _temp_vector3_1.setFromMatrixPosition(object.children[i].matrixWorld);
      _quaternion_1.setFromRotationMatrix(object.children[i].matrixWorld);

      object.children[i]._physijs.position_offset = {
        x: _temp_vector3_1.x,
        y: _temp_vector3_1.y,
        z: _temp_vector3_1.z
      };

      object.children[i]._physijs.rotation = {
        x: _quaternion_1.x,
        y: _quaternion_1.y,
        z: _quaternion_1.z,
        w: _quaternion_1.w
      };

      parent._physijs.children.push(object.children[i]._physijs);
    }

    _addObjectChildren(parent, object.children[i]);
  }
};

Physijs.Scene.prototype.add = function (object) {
  THREE.Mesh.prototype.add.call(this, object);

  if (object._physijs) {

    object.world = this;

    if (object instanceof Physijs.Vehicle) {

      this.add(object.mesh);
      this._vehicles[object._physijs.id] = object;
      this.execute('addVehicle', object._physijs);
    } else {

      object.__dirtyPosition = false;
      object.__dirtyRotation = false;
      this._objects[object._physijs.id] = object;

      if (object.children.length) {
        object._physijs.children = [];
        _addObjectChildren(object, object);
      }

      if (object.material._physijs) {
        if (!this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) {
          this.execute('registerMaterial', object.material._physijs);
          object._physijs.materialId = object.material._physijs.id;
          this._materials_ref_counts[object.material._physijs.id] = 1;
        } else {
          this._materials_ref_counts[object.material._physijs.id]++;
        }
      }

      // Object starting position + rotation
      object._physijs.position = { x: object.position.x, y: object.position.y, z: object.position.z };
      object._physijs.rotation = {
        x: object.quaternion.x,
        y: object.quaternion.y,
        z: object.quaternion.z,
        w: object.quaternion.w
      };

      // Check for scaling
      var mass_scaling = new THREE.Vector3(1, 1, 1);
      if (object._physijs.width) {
        object._physijs.width *= object.scale.x;
      }
      if (object._physijs.height) {
        object._physijs.height *= object.scale.y;
      }
      if (object._physijs.depth) {
        object._physijs.depth *= object.scale.z;
      }

      this.execute('addObject', object._physijs);
    }
  }
};

Physijs.Scene.prototype.remove = function (object) {
  if (object instanceof Physijs.Vehicle) {
    this.execute('removeVehicle', { id: object._physijs.id });
    while (object.wheels.length) {
      this.remove(object.wheels.pop());
    }
    this.remove(object.mesh);
    delete this._vehicles[object._physijs.id];
  } else {
    THREE.Mesh.prototype.remove.call(this, object);
    if (object._physijs) {
      delete this._objects[object._physijs.id];
      this.execute('removeObject', { id: object._physijs.id });
    }
  }
  if (object.material && object.material._physijs && this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) {
    this._materials_ref_counts[object.material._physijs.id]--;
    if (this._materials_ref_counts[object.material._physijs.id] == 0) {
      this.execute('unRegisterMaterial', object.material._physijs);
      delete this._materials_ref_counts[object.material._physijs.id];
    }
  }
};

Physijs.Scene.prototype.setFixedTimeStep = function (fixedTimeStep) {
  if (fixedTimeStep) {
    this.execute('setFixedTimeStep', fixedTimeStep);
  }
};

Physijs.Scene.prototype.setGravity = function (gravity) {
  if (gravity) {
    this.execute('setGravity', gravity);
  }
};

Physijs.Scene.prototype.simulate = function (timeStep, maxSubSteps) {
  var object_id, object, update;

  if (this._is_simulating) {
    return false;
  }

  this._is_simulating = true;

  for (object_id in this._objects) {
    if (!this._objects.hasOwnProperty(object_id)) continue;

    object = this._objects[object_id];

    if (object.__dirtyPosition || object.__dirtyRotation) {
      update = { id: object._physijs.id };

      if (object.__dirtyPosition) {
        update.pos = { x: object.position.x, y: object.position.y, z: object.position.z };
        object.__dirtyPosition = false;
      }

      if (object.__dirtyRotation) {
        update.quat = {
          x: object.quaternion.x,
          y: object.quaternion.y,
          z: object.quaternion.z,
          w: object.quaternion.w
        };
        object.__dirtyRotation = false;
      }

      this.execute('updateTransform', update);
    }
  }

  this.execute('simulate', { timeStep: timeStep, maxSubSteps: maxSubSteps });

  return true;
};

// Phsijs.Mesh
Physijs.Mesh = function (geometry, material, mass) {
  var index;

  if (!geometry) {
    return;
  }

  Eventable.call(this);
  THREE.Mesh.call(this, geometry, material);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  this._physijs = {
    type: null,
    id: getObjectId(),
    mass: mass || 0,
    touches: [],
    linearVelocity: new THREE.Vector3(),
    angularVelocity: new THREE.Vector3()
  };
};
Physijs.Mesh.prototype = new THREE.Mesh();
Physijs.Mesh.prototype.constructor = Physijs.Mesh;
Eventable.make(Physijs.Mesh);

// Physijs.Mesh.mass
Physijs.Mesh.prototype.__defineGetter__('mass', function () {
  return this._physijs.mass;
});
Physijs.Mesh.prototype.__defineSetter__('mass', function (mass) {
  this._physijs.mass = mass;
  if (this.world) {
    this.world.execute('updateMass', { id: this._physijs.id, mass: mass });
  }
});

// Physijs.Mesh.applyCentralImpulse
Physijs.Mesh.prototype.applyCentralImpulse = function (force) {
  if (this.world) {
    this.world.execute('applyCentralImpulse', { id: this._physijs.id, x: force.x, y: force.y, z: force.z });
  }
};

// Physijs.Mesh.applyImpulse
Physijs.Mesh.prototype.applyImpulse = function (force, offset) {
  if (this.world) {
    this.world.execute('applyImpulse', {
      id: this._physijs.id,
      impulse_x: force.x,
      impulse_y: force.y,
      impulse_z: force.z,
      x: offset.x,
      y: offset.y,
      z: offset.z
    });
  }
};

// Physijs.Mesh.applyTorque
Physijs.Mesh.prototype.applyTorque = function (force) {
  if (this.world) {
    this.world.execute('applyTorque', {
      id: this._physijs.id,
      torque_x: force.x,
      torque_y: force.y,
      torque_z: force.z
    });
  }
};

// Physijs.Mesh.applyCentralForce
Physijs.Mesh.prototype.applyCentralForce = function (force) {
  if (this.world) {
    this.world.execute('applyCentralForce', { id: this._physijs.id, x: force.x, y: force.y, z: force.z });
  }
};

// Physijs.Mesh.applyForce
Physijs.Mesh.prototype.applyForce = function (force, offset) {
  if (this.world) {
    this.world.execute('applyForce', {
      id: this._physijs.id,
      force_x: force.x,
      force_y: force.y,
      force_z: force.z,
      x: offset.x,
      y: offset.y,
      z: offset.z
    });
  }
};

// Physijs.Mesh.getAngularVelocity
Physijs.Mesh.prototype.getAngularVelocity = function () {
  return this._physijs.angularVelocity;
};

// Physijs.Mesh.setAngularVelocity
Physijs.Mesh.prototype.setAngularVelocity = function (velocity) {
  if (this.world) {
    this.world.execute('setAngularVelocity', { id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z });
  }
};

// Physijs.Mesh.getLinearVelocity
Physijs.Mesh.prototype.getLinearVelocity = function () {
  return this._physijs.linearVelocity;
};

// Physijs.Mesh.setLinearVelocity
Physijs.Mesh.prototype.setLinearVelocity = function (velocity) {
  if (this.world) {
    this.world.execute('setLinearVelocity', { id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z });
  }
};

// Physijs.Mesh.setAngularFactor
Physijs.Mesh.prototype.setAngularFactor = function (factor) {
  if (this.world) {
    this.world.execute('setAngularFactor', { id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z });
  }
};

// Physijs.Mesh.setLinearFactor
Physijs.Mesh.prototype.setLinearFactor = function (factor) {
  if (this.world) {
    this.world.execute('setLinearFactor', { id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z });
  }
};

// Physijs.Mesh.setDamping
Physijs.Mesh.prototype.setDamping = function (linear, angular) {
  if (this.world) {
    this.world.execute('setDamping', { id: this._physijs.id, linear: linear, angular: angular });
  }
};

// Physijs.Mesh.setCcdMotionThreshold
Physijs.Mesh.prototype.setCcdMotionThreshold = function (threshold) {
  if (this.world) {
    this.world.execute('setCcdMotionThreshold', { id: this._physijs.id, threshold: threshold });
  }
};

// Physijs.Mesh.setCcdSweptSphereRadius
Physijs.Mesh.prototype.setCcdSweptSphereRadius = function (radius) {
  if (this.world) {
    this.world.execute('setCcdSweptSphereRadius', { id: this._physijs.id, radius: radius });
  }
};

// Physijs.PlaneMesh
Physijs.PlaneMesh = function (geometry, material, mass) {
  var width, height;

  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

  this._physijs.type = 'plane';
  this._physijs.normal = geometry.faces[0].normal.clone();
  this._physijs.mass = typeof mass === 'undefined' ? width * height : mass;
};
Physijs.PlaneMesh.prototype = new Physijs.Mesh();
Physijs.PlaneMesh.prototype.constructor = Physijs.PlaneMesh;

// Physijs.HeightfieldMesh
Physijs.HeightfieldMesh = function (geometry, material, mass, xdiv, ydiv) {
  Physijs.Mesh.call(this, geometry, material, mass);

  this._physijs.type = 'heightfield';
  this._physijs.xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  this._physijs.ysize = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  this._physijs.xpts = typeof xdiv === 'undefined' ? Math.sqrt(geometry.vertices.length) : xdiv + 1;
  this._physijs.ypts = typeof ydiv === 'undefined' ? Math.sqrt(geometry.vertices.length) : ydiv + 1;
  // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
  this._physijs.absMaxHeight = Math.max(geometry.boundingBox.max.z, Math.abs(geometry.boundingBox.min.z));

  var points = [];

  var a, b;
  for (var i = 0; i < geometry.vertices.length; i++) {

    a = i % this._physijs.xpts;
    b = Math.round(i / this._physijs.xpts - i % this._physijs.xpts / this._physijs.xpts);
    points[i] = geometry.vertices[a + (this._physijs.ypts - b - 1) * this._physijs.ypts].z;

    //points[i] = geometry.vertices[i];
  }

  this._physijs.points = points;
};
Physijs.HeightfieldMesh.prototype = new Physijs.Mesh();
Physijs.HeightfieldMesh.prototype.constructor = Physijs.HeightfieldMesh;

// Physijs.BoxMesh
Physijs.BoxMesh = function (geometry, material, mass) {
  var width, height, depth;

  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'box';
  this._physijs.width = width;
  this._physijs.height = height;
  this._physijs.depth = depth;
  this._physijs.mass = typeof mass === 'undefined' ? width * height * depth : mass;
};
Physijs.BoxMesh.prototype = new Physijs.Mesh();
Physijs.BoxMesh.prototype.constructor = Physijs.BoxMesh;

// Physijs.SphereMesh
Physijs.SphereMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingSphere) {
    geometry.computeBoundingSphere();
  }

  this._physijs.type = 'sphere';
  this._physijs.radius = geometry.boundingSphere.radius;
  this._physijs.mass = typeof mass === 'undefined' ? 4 / 3 * Math.PI * Math.pow(this._physijs.radius, 3) : mass;
};
Physijs.SphereMesh.prototype = new Physijs.Mesh();
Physijs.SphereMesh.prototype.constructor = Physijs.SphereMesh;

// Physijs.CylinderMesh
Physijs.CylinderMesh = function (geometry, material, mass) {
  var width, height, depth;

  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'cylinder';
  this._physijs.width = width;
  this._physijs.height = height;
  this._physijs.depth = depth;
  this._physijs.mass = typeof mass === 'undefined' ? width * height * depth : mass;
};
Physijs.CylinderMesh.prototype = new Physijs.Mesh();
Physijs.CylinderMesh.prototype.constructor = Physijs.CylinderMesh;

// Physijs.CapsuleMesh
Physijs.CapsuleMesh = function (geometry, material, mass) {
  var width, height, depth;

  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'capsule';
  this._physijs.radius = Math.max(width / 2, depth / 2);
  this._physijs.height = height;
  this._physijs.mass = typeof mass === 'undefined' ? width * height * depth : mass;
};
Physijs.CapsuleMesh.prototype = new Physijs.Mesh();
Physijs.CapsuleMesh.prototype.constructor = Physijs.CapsuleMesh;

// Physijs.ConeMesh
Physijs.ConeMesh = function (geometry, material, mass) {
  var width, height, depth;

  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

  this._physijs.type = 'cone';
  this._physijs.radius = width / 2;
  this._physijs.height = height;
  this._physijs.mass = typeof mass === 'undefined' ? width * height : mass;
};
Physijs.ConeMesh.prototype = new Physijs.Mesh();
Physijs.ConeMesh.prototype.constructor = Physijs.ConeMesh;

// Physijs.ConcaveMesh
Physijs.ConcaveMesh = function (geom, material, mass, cGeometry, cScale) {
  var i,
      width,
      height,
      depth,
      vertices,
      face,
      geometry = cGeometry ? cGeometry : geom,
      triangles = new Array(geometry.faces.length);

  Physijs.Mesh.call(this, geom, material, mass);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  cScale = cScale || { x: 1, y: 1, z: 1 };
  cScale.x = cScale.x || 1;
  cScale.y = cScale.y || 1;
  cScale.z = cScale.z || 1;

  vertices = geometry.vertices;

  for (i = 0; i < geometry.faces.length; i++) {
    face = geometry.faces[i];

    triangles[i] = [{ x: vertices[face.a].x * cScale.x, y: vertices[face.a].y * cScale.y, z: vertices[face.a].z * cScale.z }, { x: vertices[face.b].x * cScale.x, y: vertices[face.b].y * cScale.y, z: vertices[face.b].z * cScale.z }, { x: vertices[face.c].x * cScale.x, y: vertices[face.c].y * cScale.y, z: vertices[face.c].z * cScale.z }];
  }

  width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'concave';
  this._physijs.triangles = triangles;
  this._physijs.mass = typeof mass === 'undefined' ? width * height * depth : mass;
};
Physijs.ConcaveMesh.prototype = new Physijs.Mesh();
Physijs.ConcaveMesh.prototype.constructor = Physijs.ConcaveMesh;

// Physijs.ConvexMesh
Physijs.ConvexMesh = function (geometry, material, mass) {
  var i,
      width,
      height,
      depth,
      points = [];

  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  for (i = 0; i < geometry.vertices.length; i++) {
    points.push({
      x: geometry.vertices[i].x,
      y: geometry.vertices[i].y,
      z: geometry.vertices[i].z
    });
  }

  width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'convex';
  this._physijs.points = points;
  this._physijs.mass = typeof mass === 'undefined' ? width * height * depth : mass;
};
Physijs.ConvexMesh.prototype = new Physijs.Mesh();
Physijs.ConvexMesh.prototype.constructor = Physijs.ConvexMesh;

// Physijs.Vehicle
Physijs.Vehicle = function (mesh, tuning) {
  tuning = tuning || new Physijs.VehicleTuning();
  this.mesh = mesh;
  this.wheels = [];
  this._physijs = {
    id: getObjectId(),
    rigidBody: mesh._physijs.id,
    suspension_stiffness: tuning.suspension_stiffness,
    suspension_compression: tuning.suspension_compression,
    suspension_damping: tuning.suspension_damping,
    max_suspension_travel: tuning.max_suspension_travel,
    friction_slip: tuning.friction_slip,
    max_suspension_force: tuning.max_suspension_force
  };
};
Physijs.Vehicle.prototype.addWheel = function (wheel_geometry, wheel_material, connection_point, wheel_direction, wheel_axle, suspension_rest_length, wheel_radius, is_front_wheel, tuning) {
  var wheel = new THREE.Mesh(wheel_geometry, wheel_material);
  wheel.castShadow = wheel.receiveShadow = true;
  wheel.position.copy(wheel_direction).multiplyScalar(suspension_rest_length / 100).add(connection_point);
  this.world.add(wheel);
  this.wheels.push(wheel);

  this.world.execute('addWheel', {
    id: this._physijs.id,
    connection_point: { x: connection_point.x, y: connection_point.y, z: connection_point.z },
    wheel_direction: { x: wheel_direction.x, y: wheel_direction.y, z: wheel_direction.z },
    wheel_axle: { x: wheel_axle.x, y: wheel_axle.y, z: wheel_axle.z },
    suspension_rest_length: suspension_rest_length,
    wheel_radius: wheel_radius,
    is_front_wheel: is_front_wheel,
    tuning: tuning
  });
};
Physijs.Vehicle.prototype.setSteering = function (amount, wheel) {
  if (wheel !== undefined && this.wheels[wheel] !== undefined) {
    this.world.execute('setSteering', { id: this._physijs.id, wheel: wheel, steering: amount });
  } else if (this.wheels.length > 0) {
    for (var i = 0; i < this.wheels.length; i++) {
      this.world.execute('setSteering', { id: this._physijs.id, wheel: i, steering: amount });
    }
  }
};
Physijs.Vehicle.prototype.setBrake = function (amount, wheel) {
  if (wheel !== undefined && this.wheels[wheel] !== undefined) {
    this.world.execute('setBrake', { id: this._physijs.id, wheel: wheel, brake: amount });
  } else if (this.wheels.length > 0) {
    for (var i = 0; i < this.wheels.length; i++) {
      this.world.execute('setBrake', { id: this._physijs.id, wheel: i, brake: amount });
    }
  }
};
Physijs.Vehicle.prototype.applyEngineForce = function (amount, wheel) {
  if (wheel !== undefined && this.wheels[wheel] !== undefined) {
    this.world.execute('applyEngineForce', { id: this._physijs.id, wheel: wheel, force: amount });
  } else if (this.wheels.length > 0) {
    for (var i = 0; i < this.wheels.length; i++) {
      this.world.execute('applyEngineForce', { id: this._physijs.id, wheel: i, force: amount });
    }
  }
};

// Physijs.VehicleTuning
Physijs.VehicleTuning = function (suspension_stiffness, suspension_compression, suspension_damping, max_suspension_travel, friction_slip, max_suspension_force) {
  this.suspension_stiffness = suspension_stiffness !== undefined ? suspension_stiffness : 5.88;
  this.suspension_compression = suspension_compression !== undefined ? suspension_compression : 0.83;
  this.suspension_damping = suspension_damping !== undefined ? suspension_damping : 0.88;
  this.max_suspension_travel = max_suspension_travel !== undefined ? max_suspension_travel : 500;
  this.friction_slip = friction_slip !== undefined ? friction_slip : 10.5;
  this.max_suspension_force = max_suspension_force !== undefined ? max_suspension_force : 6000;
};

exports.default = Physijs;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],50:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fog = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Fog = function () {
  function Fog() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Fog);

    WHS.API.extend(params, {
      hex: 0x000000,
      near: 1,
      far: 1000
    });

    this.fog = new THREE.Fog(params.hex, params.near, params.far);
    this.type = 'fog';
  }

  (0, _createClass3.default)(Fog, [{
    key: 'addTo',
    value: function addTo(root) {
      root.getScene().fog = this.fog;
    }
  }]);
  return Fog;
}();

exports.Fog = Fog;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70}],51:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FogExp2 = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var FogExp2 = function () {
  function FogExp2() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, FogExp2);

    WHS.API.extend(params, {
      hex: 0x000000,
      density: 0.00025
    });

    this.fog = new THREE.FogExp2(params.hex, params.density);
    this.type = 'fogexp2';
  }

  (0, _createClass3.default)(FogExp2, [{
    key: 'addTo',
    value: function addTo(root) {
      root.getScene().fog = this.fog;
    }
  }]);
  return FogExp2;
}();

exports.FogExp2 = FogExp2;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/createClass":70}],52:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _Shape2 = require('../core/Shape');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Group = function (_Shape) {
  (0, _inherits3.default)(Group, _Shape);

  function Group() {
    (0, _classCallCheck3.default)(this, Group);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Group).call(this, {}, 'group'));

    (0, _get3.default)((0, _getPrototypeOf2.default)(Group.prototype), 'setNative', _this).call(_this, new Object3D());
    (0, _get3.default)((0, _getPrototypeOf2.default)(Group.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  return Group;
}(_Shape2.Shape);

exports.Group = Group;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],53:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skybox = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _api = require('../extras/api');

var _Shape2 = require('../core/Shape');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Skybox = function (_Shape) {
  (0, _inherits3.default)(Skybox, _Shape);

  function Skybox() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Skybox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Skybox).call(this, params, 'skybox'));

    (0, _api.extend)(params, {
      skyType: 'box',
      detail: '.png',
      radius: 10,
      fog: true,
      path: ''
    });

    var skyGeometry = void 0,
        skyMat = void 0;

    switch (params.skyType) {
      case 'box':
        {
          var directions = ['xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg'],
              matArray = [];

          skyGeometry = new THREE.CubeGeometry(params.radius, params.radius, params.radius);

          for (var i = 0; i < 6; i++) {
            matArray.push(new MeshBasicMaterial({
              map: (0, _api.texture)(params.path + directions[i] + params.imgSuffix),
              side: THREE.BackSide,
              fog: params.fog
            }));
          }

          skyMat = new THREE.MeshFaceMaterial(matArray);

          break;
        }
      case 'sphere':
        {
          skyGeometry = new THREE.SphereGeometry(params.radius / 2, 60, 40);
          skyMat = new THREE.MeshBasicMaterial({
            map: (0, _api.texture)(params.path + params.imgSuffix),
            side: THREE.BackSide,
            fog: params.fog
          });

          break;
        }
      default:
    }

    var mesh = new THREE.Mesh(skyGeometry, skyMat);
    mesh.renderDepth = 1000.0;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Skybox.prototype), 'setNative', _this).call(_this, mesh);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Skybox.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  return Skybox;
}(_Shape2.Shape);

exports.Skybox = Skybox;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../core/Shape":10,"../extras/api":15,"babel-runtime/core-js/object/get-prototype-of":63,"babel-runtime/helpers/classCallCheck":69,"babel-runtime/helpers/get":71,"babel-runtime/helpers/inherits":72,"babel-runtime/helpers/possibleConstructorReturn":73}],54:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Fog = require('./Fog');

(0, _keys2.default)(_Fog).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Fog[key];
    }
  });
});

var _FogExp = require('./FogExp2');

(0, _keys2.default)(_FogExp).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _FogExp[key];
    }
  });
});

var _Group = require('./Group');

(0, _keys2.default)(_Group).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Group[key];
    }
  });
});

var _Skybox = require('./Skybox');

(0, _keys2.default)(_Skybox).forEach(function (key) {
  if (key === "default") return;

  (0, _defineProperty2.default)(exports, key, {
    enumerable: true,
    get: function get() {
      return _Skybox[key];
    }
  });
});


},{"./Fog":50,"./FogExp2":51,"./Group":52,"./Skybox":53,"babel-runtime/core-js/object/define-property":60,"babel-runtime/core-js/object/keys":64}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaults = {
  debug: false
};

exports.defaults = defaults;


},{}],56:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontLoader = exports.TextureLoader = exports.JSONLoader = undefined;

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

var JSONLoader = new THREE.JSONLoader();
var TextureLoader = new THREE.TextureLoader();
var FontLoader = new THREE.FontLoader();

exports.JSONLoader = JSONLoader;
exports.TextureLoader = TextureLoader;
exports.FontLoader = FontLoader;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],57:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":75}],58:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":76}],59:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":77}],60:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":78}],61:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":79}],62:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-names"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-names":80}],63:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":81}],64:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":82}],65:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":83}],66:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":84}],67:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":85}],68:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":86}],69:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],70:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":60}],71:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":61,"../core-js/object/get-prototype-of":63}],72:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":59,"../core-js/object/set-prototype-of":65,"../helpers/typeof":74}],73:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":74}],74:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":67,"../core-js/symbol/iterator":68}],75:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":159,"../modules/es6.string.iterator":171,"../modules/web.dom.iterable":175}],76:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":94,"../../modules/es6.object.assign":161}],77:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":94,"../../modules/es6.object.create":162}],78:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":94,"../../modules/es6.object.define-property":163}],79:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":94,"../../modules/es6.object.get-own-property-descriptor":164}],80:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-names');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyNames(it){
  return $Object.getOwnPropertyNames(it);
};
},{"../../modules/_core":94,"../../modules/es6.object.get-own-property-names":165}],81:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":94,"../../modules/es6.object.get-prototype-of":166}],82:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":94,"../../modules/es6.object.keys":167}],83:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":94,"../../modules/es6.object.set-prototype-of":168}],84:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":94,"../modules/es6.object.to-string":169,"../modules/es6.promise":170,"../modules/es6.string.iterator":171,"../modules/web.dom.iterable":175}],85:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":94,"../../modules/es6.object.to-string":169,"../../modules/es6.symbol":172,"../../modules/es7.symbol.async-iterator":173,"../../modules/es7.symbol.observable":174}],86:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":156,"../../modules/es6.string.iterator":171,"../../modules/web.dom.iterable":175}],87:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],88:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],89:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],90:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":113}],91:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":148,"./_to-iobject":150,"./_to-length":151}],92:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":93,"./_wks":157}],93:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],94:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],95:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":87}],96:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],97:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":102}],98:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":104,"./_is-object":113}],99:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],100:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":131,"./_object-keys":134,"./_object-pie":135}],101:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":94,"./_ctx":95,"./_global":104,"./_hide":106}],102:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],103:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":90,"./_ctx":95,"./_is-array-iter":111,"./_iter-call":114,"./_to-length":151,"./core.get-iterator-method":158}],104:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],105:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],106:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":97,"./_object-dp":126,"./_property-desc":137}],107:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":104}],108:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":97,"./_dom-create":98,"./_fails":102}],109:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],110:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":93}],111:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":119,"./_wks":157}],112:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":93}],113:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],114:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":90}],115:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":106,"./_object-create":125,"./_property-desc":137,"./_set-to-string-tag":142,"./_wks":157}],116:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":101,"./_has":105,"./_hide":106,"./_iter-create":115,"./_iterators":119,"./_library":121,"./_object-gpo":132,"./_redefine":139,"./_set-to-string-tag":142,"./_wks":157}],117:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":157}],118:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],119:[function(require,module,exports){
module.exports = {};
},{}],120:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":134,"./_to-iobject":150}],121:[function(require,module,exports){
module.exports = true;
},{}],122:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":102,"./_has":105,"./_is-object":113,"./_object-dp":126,"./_uid":154}],123:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":93,"./_global":104,"./_task":147}],124:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":102,"./_iobject":110,"./_object-gops":131,"./_object-keys":134,"./_object-pie":135,"./_to-object":152}],125:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
},{"./_an-object":90,"./_dom-create":98,"./_enum-bug-keys":99,"./_html":107,"./_object-dps":127,"./_shared-key":143}],126:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":90,"./_descriptors":97,"./_ie8-dom-define":108,"./_to-primitive":153}],127:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":90,"./_descriptors":97,"./_object-dp":126,"./_object-keys":134}],128:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":97,"./_has":105,"./_ie8-dom-define":108,"./_object-pie":135,"./_property-desc":137,"./_to-iobject":150,"./_to-primitive":153}],129:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":130,"./_to-iobject":150}],130:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":99,"./_object-keys-internal":133}],131:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],132:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":105,"./_shared-key":143,"./_to-object":152}],133:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":91,"./_has":105,"./_shared-key":143,"./_to-iobject":150}],134:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":99,"./_object-keys-internal":133}],135:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],136:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":94,"./_export":101,"./_fails":102}],137:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],138:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":106}],139:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":106}],140:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":90,"./_ctx":95,"./_is-object":113,"./_object-gopd":128}],141:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":94,"./_descriptors":97,"./_global":104,"./_object-dp":126,"./_wks":157}],142:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":105,"./_object-dp":126,"./_wks":157}],143:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":144,"./_uid":154}],144:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":104}],145:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":87,"./_an-object":90,"./_wks":157}],146:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":96,"./_to-integer":149}],147:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":93,"./_ctx":95,"./_dom-create":98,"./_global":104,"./_html":107,"./_invoke":109}],148:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":149}],149:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],150:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":96,"./_iobject":110}],151:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":149}],152:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":96}],153:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":113}],154:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],155:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":94,"./_global":104,"./_library":121,"./_object-dp":126,"./_wks-ext":156}],156:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":157}],157:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":104,"./_shared":144,"./_uid":154}],158:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":92,"./_core":94,"./_iterators":119,"./_wks":157}],159:[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":90,"./_core":94,"./core.get-iterator-method":158}],160:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":88,"./_iter-define":116,"./_iter-step":118,"./_iterators":119,"./_to-iobject":150}],161:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":101,"./_object-assign":124}],162:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":101,"./_object-create":125}],163:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":97,"./_export":101,"./_object-dp":126}],164:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":128,"./_object-sap":136,"./_to-iobject":150}],165:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":129,"./_object-sap":136}],166:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":132,"./_object-sap":136,"./_to-object":152}],167:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":134,"./_object-sap":136,"./_to-object":152}],168:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":101,"./_set-proto":140}],169:[function(require,module,exports){

},{}],170:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , anObject           = require('./_an-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , setProto           = require('./_set-proto').set
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":87,"./_an-instance":89,"./_an-object":90,"./_classof":92,"./_core":94,"./_ctx":95,"./_export":101,"./_for-of":103,"./_global":104,"./_is-object":113,"./_iter-detect":117,"./_library":121,"./_microtask":123,"./_redefine-all":138,"./_set-proto":140,"./_set-species":141,"./_set-to-string-tag":142,"./_species-constructor":145,"./_task":147,"./_wks":157}],171:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":116,"./_string-at":146}],172:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":90,"./_descriptors":97,"./_enum-keys":100,"./_export":101,"./_fails":102,"./_global":104,"./_has":105,"./_hide":106,"./_is-array":112,"./_keyof":120,"./_library":121,"./_meta":122,"./_object-create":125,"./_object-dp":126,"./_object-gopd":128,"./_object-gopn":130,"./_object-gopn-ext":129,"./_object-gops":131,"./_object-keys":134,"./_object-pie":135,"./_property-desc":137,"./_redefine":139,"./_set-to-string-tag":142,"./_shared":144,"./_to-iobject":150,"./_to-primitive":153,"./_uid":154,"./_wks":157,"./_wks-define":155,"./_wks-ext":156}],173:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":155}],174:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":155}],175:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":104,"./_hide":106,"./_iterators":119,"./_wks":157,"./es6.array.iterator":160}],176:[function(require,module,exports){
module.exports=function(n){var t={},e=[];n=n||this,n.on=function(n,e,l){(t[n]=t[n]||[]).push([e,l])},n.off=function(n,l){n||(t={});for(var o=t[n]||e,i=o.length=l?o.length:0;i--;)l==o[i][0]&&o.splice(i,1)},n.emit=function(n){for(var l,o=t[n]||e,i=o.length>0?o.slice(0,o.length):o,c=0;l=i[c++];)l[0].apply(l[1],e.slice.call(arguments,1))}};
},{}],177:[function(require,module,exports){
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);

},{}],178:[function(require,module,exports){
module.exports = function(THREE) {
	var MOUSE = THREE.MOUSE
	if (!MOUSE)
		MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */
	/*global THREE, console */

	function OrbitConstraint ( object ) {

		this.object = object;

		// "target" sets the location of focus, where the object orbits around
		// and where it pans with respect to.
		this.target = new THREE.Vector3();

		// Limits to how far you can dolly in and out ( PerspectiveCamera only )
		this.minDistance = 0;
		this.maxDistance = Infinity;

		// Limits to how far you can zoom in and out ( OrthographicCamera only )
		this.minZoom = 0;
		this.maxZoom = Infinity;

		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		this.minAzimuthAngle = - Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians

		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.25;

		////////////
		// internals

		var scope = this;

		var EPS = 0.000001;

		// Current position in spherical coordinate system.
		var theta;
		var phi;

		// Pending changes
		var phiDelta = 0;
		var thetaDelta = 0;
		var scale = 1;
		var panOffset = new THREE.Vector3();
		var zoomChanged = false;

		// API

		this.getPolarAngle = function () {

			return phi;

		};

		this.getAzimuthalAngle = function () {

			return theta;

		};

		this.rotateLeft = function ( angle ) {

			thetaDelta -= angle;

		};

		this.rotateUp = function ( angle ) {

			phiDelta -= angle;

		};

		// pass in distance in world space to move left
		this.panLeft = function() {

			var v = new THREE.Vector3();

			return function panLeft ( distance ) {

				var te = this.object.matrix.elements;

				// get X column of matrix
				v.set( te[ 0 ], te[ 1 ], te[ 2 ] );
				v.multiplyScalar( - distance );

				panOffset.add( v );

			};

		}();

		// pass in distance in world space to move up
		this.panUp = function() {

			var v = new THREE.Vector3();

			return function panUp ( distance ) {

				var te = this.object.matrix.elements;

				// get Y column of matrix
				v.set( te[ 4 ], te[ 5 ], te[ 6 ] );
				v.multiplyScalar( distance );

				panOffset.add( v );

			};

		}();

		// pass in x,y of change desired in pixel space,
		// right and down are positive
		this.pan = function ( deltaX, deltaY, screenWidth, screenHeight ) {

			if ( scope.object instanceof THREE.PerspectiveCamera ) {

				// perspective
				var position = scope.object.position;
				var offset = position.clone().sub( scope.target );
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

				// we actually don't use screenWidth, since perspective camera is fixed to screen height
				scope.panLeft( 2 * deltaX * targetDistance / screenHeight );
				scope.panUp( 2 * deltaY * targetDistance / screenHeight );

			} else if ( scope.object instanceof THREE.OrthographicCamera ) {

				// orthographic
				scope.panLeft( deltaX * ( scope.object.right - scope.object.left ) / screenWidth );
				scope.panUp( deltaY * ( scope.object.top - scope.object.bottom ) / screenHeight );

			} else {

				// camera neither orthographic or perspective
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

			}

		};

		this.dollyIn = function ( dollyScale ) {

			if ( scope.object instanceof THREE.PerspectiveCamera ) {

				scale /= dollyScale;

			} else if ( scope.object instanceof THREE.OrthographicCamera ) {

				scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

			}

		};

		this.dollyOut = function ( dollyScale ) {

			if ( scope.object instanceof THREE.PerspectiveCamera ) {

				scale *= dollyScale;

			} else if ( scope.object instanceof THREE.OrthographicCamera ) {

				scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

			}

		};

		this.update = function() {

			var offset = new THREE.Vector3();

			// so camera.up is the orbit axis
			var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
			var quatInverse = quat.clone().inverse();

			var lastPosition = new THREE.Vector3();
			var lastQuaternion = new THREE.Quaternion();

			return function () {

				var position = this.object.position;

				offset.copy( position ).sub( this.target );

				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion( quat );

				// angle from z-axis around y-axis

				theta = Math.atan2( offset.x, offset.z );

				// angle from y-axis

				phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

				theta += thetaDelta;
				phi += phiDelta;

				// restrict theta to be between desired limits
				theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

				// restrict phi to be between desired limits
				phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

				// restrict phi to be betwee EPS and PI-EPS
				phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

				var radius = offset.length() * scale;

				// restrict radius to be between desired limits
				radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

				// move target to panned location
				this.target.add( panOffset );

				offset.x = radius * Math.sin( phi ) * Math.sin( theta );
				offset.y = radius * Math.cos( phi );
				offset.z = radius * Math.sin( phi ) * Math.cos( theta );

				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion( quatInverse );

				position.copy( this.target ).add( offset );

				this.object.lookAt( this.target );

				if ( this.enableDamping === true ) {

					thetaDelta *= ( 1 - this.dampingFactor );
					phiDelta *= ( 1 - this.dampingFactor );

				} else {

					thetaDelta = 0;
					phiDelta = 0;

				}

				scale = 1;
				panOffset.set( 0, 0, 0 );

				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8

				if ( zoomChanged ||
					 lastPosition.distanceToSquared( this.object.position ) > EPS ||
					8 * ( 1 - lastQuaternion.dot( this.object.quaternion ) ) > EPS ) {

					lastPosition.copy( this.object.position );
					lastQuaternion.copy( this.object.quaternion );
					zoomChanged = false;

					return true;

				}

				return false;

			};

		}();

	};


	// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
	// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
	// supported.
	//
	//    Orbit - left mouse / touch: one finger move
	//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
	//    Pan - right mouse, or arrow keys / touch: three finter swipe

	function OrbitControls ( object, domElement ) {

		var constraint = new OrbitConstraint( object );

		this.domElement = ( domElement !== undefined ) ? domElement : document;

		// API

		Object.defineProperty( this, 'constraint', {

			get: function() {

				return constraint;

			}

		} );

		this.getPolarAngle = function () {

			return constraint.getPolarAngle();

		};

		this.getAzimuthalAngle = function () {

			return constraint.getAzimuthalAngle();

		};

		// Set to false to disable this control
		this.enabled = true;

		// center is old, deprecated; use "target" instead
		this.center = this.target;

		// This option actually enables dollying in and out; left as "zoom" for
		// backwards compatibility.
		// Set to false to disable zooming
		this.enableZoom = true;
		this.zoomSpeed = 1.0;

		// Set to false to disable rotating
		this.enableRotate = true;
		this.rotateSpeed = 1.0;

		// Set to false to disable panning
		this.enablePan = true;
		this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

		// Set to false to disable use of the keys
		this.enableKeys = true;

		// The four arrow keys
		this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

		// Mouse buttons
		this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

		////////////
		// internals

		var scope = this;

		var rotateStart = new THREE.Vector2();
		var rotateEnd = new THREE.Vector2();
		var rotateDelta = new THREE.Vector2();

		var panStart = new THREE.Vector2();
		var panEnd = new THREE.Vector2();
		var panDelta = new THREE.Vector2();

		var dollyStart = new THREE.Vector2();
		var dollyEnd = new THREE.Vector2();
		var dollyDelta = new THREE.Vector2();

		var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

		var state = STATE.NONE;

		// for reset

		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;

		// events

		var changeEvent = { type: 'change' };
		var startEvent = { type: 'start' };
		var endEvent = { type: 'end' };

		// pass in x,y of change desired in pixel space,
		// right and down are positive
		function pan( deltaX, deltaY ) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			constraint.pan( deltaX, deltaY, element.clientWidth, element.clientHeight );

		}

		this.update = function () {

			if ( this.autoRotate && state === STATE.NONE ) {

				constraint.rotateLeft( getAutoRotationAngle() );

			}

			if ( constraint.update() === true ) {

				this.dispatchEvent( changeEvent );

			}

		};

		this.reset = function () {

			state = STATE.NONE;

			this.target.copy( this.target0 );
			this.object.position.copy( this.position0 );
			this.object.zoom = this.zoom0;

			this.object.updateProjectionMatrix();
			this.dispatchEvent( changeEvent );

			this.update();

		};

		function getAutoRotationAngle() {

			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

		}

		function getZoomScale() {

			return Math.pow( 0.95, scope.zoomSpeed );

		}

		function onMouseDown( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();

			if ( event.button === scope.mouseButtons.ORBIT ) {

				if ( scope.enableRotate === false ) return;

				state = STATE.ROTATE;

				rotateStart.set( event.clientX, event.clientY );

			} else if ( event.button === scope.mouseButtons.ZOOM ) {

				if ( scope.enableZoom === false ) return;

				state = STATE.DOLLY;

				dollyStart.set( event.clientX, event.clientY );

			} else if ( event.button === scope.mouseButtons.PAN ) {

				if ( scope.enablePan === false ) return;

				state = STATE.PAN;

				panStart.set( event.clientX, event.clientY );

			}

			if ( state !== STATE.NONE ) {

				document.addEventListener( 'mousemove', onMouseMove, false );
				document.addEventListener( 'mouseup', onMouseUp, false );
				scope.dispatchEvent( startEvent );

			}

		}

		function onMouseMove( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			if ( state === STATE.ROTATE ) {

				if ( scope.enableRotate === false ) return;

				rotateEnd.set( event.clientX, event.clientY );
				rotateDelta.subVectors( rotateEnd, rotateStart );

				// rotating across whole screen goes 360 degrees around
				constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

				// rotating up and down along whole screen attempts to go 360, but limited to 180
				constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

				rotateStart.copy( rotateEnd );

			} else if ( state === STATE.DOLLY ) {

				if ( scope.enableZoom === false ) return;

				dollyEnd.set( event.clientX, event.clientY );
				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y > 0 ) {

					constraint.dollyIn( getZoomScale() );

				} else if ( dollyDelta.y < 0 ) {

					constraint.dollyOut( getZoomScale() );

				}

				dollyStart.copy( dollyEnd );

			} else if ( state === STATE.PAN ) {

				if ( scope.enablePan === false ) return;

				panEnd.set( event.clientX, event.clientY );
				panDelta.subVectors( panEnd, panStart );

				pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

			}

			if ( state !== STATE.NONE ) scope.update();

		}

		function onMouseUp( /* event */ ) {

			if ( scope.enabled === false ) return;

			document.removeEventListener( 'mousemove', onMouseMove, false );
			document.removeEventListener( 'mouseup', onMouseUp, false );
			scope.dispatchEvent( endEvent );
			state = STATE.NONE;

		}

		function onMouseWheel( event ) {

			if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;

			event.preventDefault();
			event.stopPropagation();

			var delta = 0;

			if ( event.wheelDelta !== undefined ) {

				// WebKit / Opera / Explorer 9

				delta = event.wheelDelta;

			} else if ( event.detail !== undefined ) {

				// Firefox

				delta = - event.detail;

			}

			if ( delta > 0 ) {

				constraint.dollyOut( getZoomScale() );

			} else if ( delta < 0 ) {

				constraint.dollyIn( getZoomScale() );

			}

			scope.update();
			scope.dispatchEvent( startEvent );
			scope.dispatchEvent( endEvent );

		}

		function onKeyDown( event ) {

			if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

			switch ( event.keyCode ) {

				case scope.keys.UP:
					pan( 0, scope.keyPanSpeed );
					scope.update();
					break;

				case scope.keys.BOTTOM:
					pan( 0, - scope.keyPanSpeed );
					scope.update();
					break;

				case scope.keys.LEFT:
					pan( scope.keyPanSpeed, 0 );
					scope.update();
					break;

				case scope.keys.RIGHT:
					pan( - scope.keyPanSpeed, 0 );
					scope.update();
					break;

			}

		}

		function touchstart( event ) {

			if ( scope.enabled === false ) return;

			switch ( event.touches.length ) {

				case 1:	// one-fingered touch: rotate

					if ( scope.enableRotate === false ) return;

					state = STATE.TOUCH_ROTATE;

					rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
					break;

				case 2:	// two-fingered touch: dolly

					if ( scope.enableZoom === false ) return;

					state = STATE.TOUCH_DOLLY;

					var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
					var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
					var distance = Math.sqrt( dx * dx + dy * dy );
					dollyStart.set( 0, distance );
					break;

				case 3: // three-fingered touch: pan

					if ( scope.enablePan === false ) return;

					state = STATE.TOUCH_PAN;

					panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
					break;

				default:

					state = STATE.NONE;

			}

			if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );

		}

		function touchmove( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();
			event.stopPropagation();

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			switch ( event.touches.length ) {

				case 1: // one-fingered touch: rotate

					if ( scope.enableRotate === false ) return;
					if ( state !== STATE.TOUCH_ROTATE ) return;

					rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
					rotateDelta.subVectors( rotateEnd, rotateStart );

					// rotating across whole screen goes 360 degrees around
					constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
					// rotating up and down along whole screen attempts to go 360, but limited to 180
					constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

					rotateStart.copy( rotateEnd );

					scope.update();
					break;

				case 2: // two-fingered touch: dolly

					if ( scope.enableZoom === false ) return;
					if ( state !== STATE.TOUCH_DOLLY ) return;

					var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
					var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
					var distance = Math.sqrt( dx * dx + dy * dy );

					dollyEnd.set( 0, distance );
					dollyDelta.subVectors( dollyEnd, dollyStart );

					if ( dollyDelta.y > 0 ) {

						constraint.dollyOut( getZoomScale() );

					} else if ( dollyDelta.y < 0 ) {

						constraint.dollyIn( getZoomScale() );

					}

					dollyStart.copy( dollyEnd );

					scope.update();
					break;

				case 3: // three-fingered touch: pan

					if ( scope.enablePan === false ) return;
					if ( state !== STATE.TOUCH_PAN ) return;

					panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
					panDelta.subVectors( panEnd, panStart );

					pan( panDelta.x, panDelta.y );

					panStart.copy( panEnd );

					scope.update();
					break;

				default:

					state = STATE.NONE;

			}

		}

		function touchend( /* event */ ) {

			if ( scope.enabled === false ) return;

			scope.dispatchEvent( endEvent );
			state = STATE.NONE;

		}

		function contextmenu( event ) {

			event.preventDefault();

		}

		this.dispose = function() {

			this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
			this.domElement.removeEventListener( 'mousedown', onMouseDown, false );
			this.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
			this.domElement.removeEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

			this.domElement.removeEventListener( 'touchstart', touchstart, false );
			this.domElement.removeEventListener( 'touchend', touchend, false );
			this.domElement.removeEventListener( 'touchmove', touchmove, false );

			document.removeEventListener( 'mousemove', onMouseMove, false );
			document.removeEventListener( 'mouseup', onMouseUp, false );

			window.removeEventListener( 'keydown', onKeyDown, false );

		}

		this.domElement.addEventListener( 'contextmenu', contextmenu, false );

		this.domElement.addEventListener( 'mousedown', onMouseDown, false );
		this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
		this.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

		this.domElement.addEventListener( 'touchstart', touchstart, false );
		this.domElement.addEventListener( 'touchend', touchend, false );
		this.domElement.addEventListener( 'touchmove', touchmove, false );

		window.addEventListener( 'keydown', onKeyDown, false );

		// force an update at start
		this.update();

	};

	OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
	OrbitControls.prototype.constructor = OrbitControls;

	Object.defineProperties( OrbitControls.prototype, {

		object: {

			get: function () {

				return this.constraint.object;

			}

		},

		target: {

			get: function () {

				return this.constraint.target;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: target is now immutable. Use target.set() instead.' );
				this.constraint.target.copy( value );

			}

		},

		minDistance : {

			get: function () {

				return this.constraint.minDistance;

			},

			set: function ( value ) {

				this.constraint.minDistance = value;

			}

		},

		maxDistance : {

			get: function () {

				return this.constraint.maxDistance;

			},

			set: function ( value ) {

				this.constraint.maxDistance = value;

			}

		},

		minZoom : {

			get: function () {

				return this.constraint.minZoom;

			},

			set: function ( value ) {

				this.constraint.minZoom = value;

			}

		},

		maxZoom : {

			get: function () {

				return this.constraint.maxZoom;

			},

			set: function ( value ) {

				this.constraint.maxZoom = value;

			}

		},

		minPolarAngle : {

			get: function () {

				return this.constraint.minPolarAngle;

			},

			set: function ( value ) {

				this.constraint.minPolarAngle = value;

			}

		},

		maxPolarAngle : {

			get: function () {

				return this.constraint.maxPolarAngle;

			},

			set: function ( value ) {

				this.constraint.maxPolarAngle = value;

			}

		},

		minAzimuthAngle : {

			get: function () {

				return this.constraint.minAzimuthAngle;

			},

			set: function ( value ) {

				this.constraint.minAzimuthAngle = value;

			}

		},

		maxAzimuthAngle : {

			get: function () {

				return this.constraint.maxAzimuthAngle;

			},

			set: function ( value ) {

				this.constraint.maxAzimuthAngle = value;

			}

		},

		enableDamping : {

			get: function () {

				return this.constraint.enableDamping;

			},

			set: function ( value ) {

				this.constraint.enableDamping = value;

			}

		},

		dampingFactor : {

			get: function () {

				return this.constraint.dampingFactor;

			},

			set: function ( value ) {

				this.constraint.dampingFactor = value;

			}

		},

		// backward compatibility

		noZoom: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
				return ! this.enableZoom;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
				this.enableZoom = ! value;

			}

		},

		noRotate: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
				return ! this.enableRotate;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
				this.enableRotate = ! value;

			}

		},

		noPan: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
				return ! this.enablePan;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
				this.enablePan = ! value;

			}

		},

		noKeys: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
				return ! this.enableKeys;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
				this.enableKeys = ! value;

			}

		},

		staticMoving : {

			get: function () {

				console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
				return ! this.constraint.enableDamping;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
				this.constraint.enableDamping = ! value;

			}

		},

		dynamicDampingFactor : {

			get: function () {

				console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
				return this.constraint.dampingFactor;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
				this.constraint.dampingFactor = value;

			}

		}

	} );

	return OrbitControls;
}

},{}]},{},[1]);
