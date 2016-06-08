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

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _Loop = require('../extensions/Loop');

var _defaults = require('../utils/defaults');

var _Object = require('./Object');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=Camera.js.map
