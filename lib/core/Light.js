'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Light = undefined;

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

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Light).call(this, {

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

    (0, _get3.default)(Object.getPrototypeOf(Light.prototype), 'setParams', _this).call(_this, params);

    var scope = Object.assign(_this, {
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

      return new Promise(function (resolve, reject) {
        try {
          if (tags.indexOf('no-shadows') < 0) {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;
          }

          if (tags.indexOf('no-transforms') < 0) {
            _scope.position.set(_scope.__params.pos.x, _scope.__params.pos.y, _scope.__params.pos.z);

            _scope.rotation.set(_scope.__params.rot.x, _scope.__params.rot.y, _scope.__params.rot.z);
          }

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

      return new Promise(function (resolve, reject) {
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

      return new Promise(function (resolve, reject) {
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
//# sourceMappingURL=Light.js.map
