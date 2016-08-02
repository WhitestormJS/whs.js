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
        radius: 1,

        width: 1024,
        height: 1024,

        near: true,
        far: 400,
        fov: 60,

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
      var _this2 = this;

      for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
        tags[_key] = arguments[_key];
      }

      return new Promise(function (resolve, reject) {
        var _native = _this2.getNative();

        if (tags.indexOf('no-shadows') < 0) {
          _native.castShadow = _this2._shadowmap.cast;
        }

        if (tags.indexOf('no-transforms') < 0) {
          _this2.position.set(_this2.__params.pos.x, _this2.__params.pos.y, _this2.__params.pos.z);

          _this2.rotation.set(_this2.__params.rot.x, _this2.__params.rot.y, _this2.__params.rot.z);

          if (_native.target) {
            _this2.target.set(_this2.__params.target.x, _this2.__params.target.y, _this2.__params.target.z);
          }
        }

        tags.forEach(function (tag) {
          _this2[tag] = true;
        });

        if (_defaults.defaults.debug) console.debug('@WHS.Light: Light ' + _this2._type + ' + \' is ready.', _this2);

        _this2.emit('ready');

        resolve(_this2);
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
      var _this3 = this;

      this.parent = parent;

      return new Promise(function (resolve, reject) {
        var _native = _this3.getNative();

        parent.getScene().add(_native);
        parent.children.push(_this3);

        if (_this3.helper) _this3.parent.getScene().add(_this3.helper);
        if (_native.target) _this3.parent.getScene().add(_native.target);
        if (_defaults.defaults.debug) {
          console.debug('@WHS.Camera: Camera ' + _this3._type + ' was added to world.', [_this3, _this3.parent]);
        }

        resolve(_this3);
        _this3.emit('ready');
      });
    }

    /**
     * Set shadow properties for light.
     */

  }, {
    key: 'wrapShadow',
    value: function wrapShadow() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var _native = _this4.getNative(),
            _shadow = _this4._shadowmap;

        _native.shadow.mapSize.width = _shadow.width;
        _native.shadow.mapSize.height = _shadow.height;
        _native.shadow.bias = _shadow.bias;
        _native.shadow.radius = _shadow.radius;

        var _shadowCamera = _native.shadow.camera;

        _shadowCamera.near = _shadow.near;
        _shadowCamera.far = _shadow.far;
        _shadowCamera.fov = _shadow.fov;

        _shadowCamera.left = _shadow.left;
        _shadowCamera.right = _shadow.right;
        _shadowCamera.top = _shadow.top;
        _shadowCamera.bottom = _shadow.bottom;

        resolve(_this4);
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
      this.setNative(source.getNative().clone());
      if (source.helper) this.helper = source.helper.clone();
      this.setParams(source.getParams());

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

    /* VISIBILITY */

  }, {
    key: 'show',
    value: function show() {
      this.getNative().visible = true;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.getNative().visible = false;
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
