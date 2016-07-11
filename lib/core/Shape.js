'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = undefined;

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

var _api = require('../extras/api');

var _Loop = require('../extensions/Loop');

var _defaults = require('../utils/defaults');

var _World = require('./World');

var _Object = require('./Object');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shape = function (_WHSObject) {
  (0, _inherits3.default)(Shape, _WHSObject);

  /**
   * Constructing WHS.Shape object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Shape type.
   * @return {WHS.Shape}
   */

  function Shape() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ret;

    var type = arguments.length <= 1 || arguments[1] === undefined ? 'mesh' : arguments[1];
    (0, _classCallCheck3.default)(this, Shape);

    var _set = function _set(x, y, z) {
      _this.x = x;
      _this.y = y;
      _this.z = z;
    };

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Shape).call(this, {
      mass: 10,
      build: true,
      softbody: false,
      geometry: {},

      material: {
        kind: 'basic'
      },

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

      physics: !!'physics'

    }));

    if (params instanceof THREE.Object3D) {
      (0, _get3.default)(Object.getPrototypeOf(Shape.prototype), 'setParams', _this).call(_this, {
        pos: { x: params.position.x, y: params.position.y, z: params.position.z },
        rot: { x: params.rotation.x, y: params.rotation.y, z: params.rotation.z },
        scale: { x: params.scale.x, y: params.scale.y, z: params.scale.z },
        mass: params.mass,
        physics: Boolean(params._physijs)
      });
    } else (0, _get3.default)(Object.getPrototypeOf(Shape.prototype), 'setParams', _this).call(_this, params);

    var scope = Object.assign(_this, {
      _type: type,
      __c_rot: false,

      _wait: [],

      helpers: {
        box: false,
        boundingBox: false,
        edges: false,
        faceNormals: false
      },

      physics: params.physics
    });

    if (params instanceof THREE.Object3D) _this.setNative(params);
    if (_defaults.defaults.debug) console.debug('@WHS.Shape: Shape ' + scope._type + ' found.', scope);

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Shape, [{
    key: 'wait',
    value: function wait(promise) {
      this._wait.push(promise);
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
      var _this2 = this;

      for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
        tags[_key] = arguments[_key];
      }

      if (this._wait.length) {
        return new Promise(function (resolve, reject) {
          Promise.all(_this2._wait).then(function () {
            var _native = _this2.getNative(),
                _params = _this2.getParams(),
                _params_helpers = _params.helpers;

            if (!_native) reject();

            if (tags.indexOf('no-shadows') < 0) {
              _native.castShadow = true;
              _native.receiveShadow = true;
            }

            if (tags.indexOf('no-transforms') < 0) {
              if (!_params.softbody) {
                var _params_pos = _params.pos,
                    _params_rot = _params.rot,
                    _params_scale = _params.scale;

                _this2.position.set(_params_pos.x, _params_pos.y, _params_pos.z);

                _this2.rotation.set(_params_rot.x, _params_rot.y, _params_rot.z);

                _this2.scale.set(_params_scale.x, _params_scale.y, _params_scale.z);
              }
            }

            // Box helper.
            if (_params_helpers.box) {
              _this2.helpers.box = new THREE.BoxHelper(_native);
            }

            // Bounding box helper.
            if (_params_helpers.boundingBox) {
              (0, _api.extend)(_params_helpers.boundingBox, {
                color: 0xffffff
              });

              _this2.helpers.boundingBox = new THREE.BoundingBoxHelper(_native, _params_helpers.boundingBox.color ? _params_helpers.boundingBox.color : 0xffffff);
            }

            // Edges helper.
            if (_params_helpers.edges) {
              (0, _api.extend)(_params_helpers.edges, {
                color: 0xffffff
              });

              _this2.helpers.edges = new THREE.EdgesHelper(_native, _params_helpers.edges.color);
            }

            // faceNormals helper.
            if (_params_helpers.faceNormals) {
              var _params_helpers_faceNormals = _params_helpers.faceNormals;

              (0, _api.extend)(_params_helpers_faceNormals, {
                size: 2,
                color: 0xffffff,
                linewidth: 1
              });

              _this2.helpers.faceNormals = new THREE.FaceNormalsHelper(_native, _params_helpers_faceNormals.size, _params_helpers_faceNormals.color, _params_helpers_faceNormals.linewidth);
            }

            // vertexNormals helper.
            if (_params_helpers.vertexNormals) {
              var _params_helpers_vertexNormals = _params_helpers.vertexNormals;

              (0, _api.extend)(_params_helpers_vertexNormals, {
                size: 2,
                color: 0xffffff,
                linewidth: 1
              });

              _this2.helpers.vertexNormals = new THREE.VertexNormalsHelper(_native, _params_helpers_vertexNormals.size, _params_helpers_vertexNormals.color, _params_helpers_vertexNormals.linewidth);
            }

            resolve(_this2);

            if (WHS.debug) console.debug('@WHS.Shape: Shape ' + _this2._type + ' is ready.', _this2);
          });
        });
      } else {
        return new Promise(function (resolve, reject) {
          var _native = _this2.getNative(),
              _params = _this2.getParams(),
              _params_helpers = _params.helpers;

          if (!_native) reject();

          if (tags.indexOf('no-shadows') < 0) {
            _native.castShadow = true;
            _native.receiveShadow = true;
          }

          if (tags.indexOf('no-transforms') < 0) {
            if (!_params.softbody) {
              var _params_pos = _params.pos,
                  _params_rot = _params.rot,
                  _params_scale = _params.scale;

              _this2.position.set(_params_pos.x, _params_pos.y, _params_pos.z);

              _this2.rotation.set(_params_rot.x, _params_rot.y, _params_rot.z);

              _this2.scale.set(_params_scale.x, _params_scale.y, _params_scale.z);
            }
          }

          // Box helper.
          if (_params_helpers.box) {
            _this2.helpers.box = new THREE.BoxHelper(_native);
          }

          // Bounding box helper.
          if (_params_helpers.boundingBox) {
            (0, _api.extend)(_params_helpers.boundingBox, {
              color: 0xffffff
            });

            _this2.helpers.boundingBox = new THREE.BoundingBoxHelper(_native, _params_helpers.boundingBox.color ? _params_helpers.boundingBox.color : 0xffffff);
          }

          // Edges helper.
          if (_params_helpers.edges) {
            (0, _api.extend)(_params_helpers.edges, {
              color: 0xffffff
            });

            _this2.helpers.edges = new THREE.EdgesHelper(_native, _params_helpers.edges.color);
          }

          // faceNormals helper.
          if (_params_helpers.faceNormals) {
            var _params_helpers_faceNormals = _params_helpers.faceNormals;

            (0, _api.extend)(_params_helpers_faceNormals, {
              size: 2,
              color: 0xffffff,
              linewidth: 1
            });

            _this2.helpers.faceNormals = new THREE.FaceNormalsHelper(_native, _params_helpers_faceNormals.size, _params_helpers_faceNormals.color, _params_helpers_faceNormals.linewidth);
          }

          // vertexNormals helper.
          if (_params_helpers.vertexNormals) {
            var _params_helpers_vertexNormals = _params_helpers.vertexNormals;

            (0, _api.extend)(_params_helpers_vertexNormals, {
              size: 2,
              color: 0xffffff,
              linewidth: 1
            });

            _this2.helpers.vertexNormals = new THREE.VertexNormalsHelper(_native, _params_helpers_vertexNormals.size, _params_helpers_vertexNormals.color, _params_helpers_vertexNormals.linewidth);
          }

          resolve(_this2);

          if (WHS.debug) console.debug('@WHS.Shape: Shape ' + _this2._type + ' is ready.', _this2);
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
      var _this3 = this;

      var _helpers = this.helpers;
      this.parent = parent;

      if (this._wait.length) {
        return new Promise(function (resolve, reject) {
          Promise.all(_this3._wait).then(function () {
            var _native = _this3.getNative(),
                _params = _this3.getParams(),
                _params_helpers = _params.helpers,
                _parent = _this3.parent;

            if (!_native) reject();

            var parentNative = _parent instanceof _World.World ? _parent.getScene() : _parent.getNative();

            parentNative.add(_native);
            _this3.parent.children.push(_this3);

            if (_params.softbody) {
              _native.position.set(0, 0, 0);
              _native.rotation.set(0, 0, 0);
            }

            if (_params_helpers.box) parentNative.add(_helpers.box);
            if (_params_helpers.boundingBox) parentNative.add(_helpers.boundingBox);
            if (_params_helpers.edges) parentNative.add(_helpers.edges);
            if (_params_helpers.faceNormals) parentNative.add(_helpers.faceNormals);
            if (_params_helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);

            resolve(_this3);

            _native.addEventListener('collide', function () {
              _this3.emit('collide');
            });

            if (WHS.debug) {
              console.debug('@WHS.Shape: Shape ' + _this3._type + ' was added to world.', [_this3, _parent]);
            }
          });
        });
      } else {
        return new Promise(function (resolve, reject) {
          var _native = _this3.getNative(),
              _params = _this3.getParams(),
              _params_helpers = _params.helpers,
              _parent = _this3.parent;

          if (!_native) reject();

          var parentNative = _parent instanceof _World.World ? _parent.getScene() : _parent.getNative();

          parentNative.add(_native);
          _this3.parent.children.push(_this3);

          if (_params.softbody) {
            _native.position.set(0, 0, 0);
            _native.rotation.set(0, 0, 0);
          }

          if (_params_helpers.box) parentNative.add(_helpers.box);
          if (_params_helpers.boundingBox) parentNative.add(_helpers.boundingBox);
          if (_params_helpers.edges) parentNative.add(_helpers.edges);
          if (_params_helpers.faceNormals) parentNative.add(_helpers.faceNormals);
          if (_params_helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);

          resolve(_this3);

          _native.addEventListener('collide', function () {
            _this3.emit('collide');
          });

          if (WHS.debug) {
            console.debug('@WHS.Shape: Shape ' + _this3._type + ' was added to world.', [_this3, _parent]);
          }
        });
      }
    }

    /**
     * Initialize shape's material object.
     */

  }, {
    key: '_initMaterial',
    value: function _initMaterial() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return this.getParams().physics ? (0, _api.loadMaterial)(params)._materialP : (0, _api.loadMaterial)(params)._material;
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
      var sourceNative = source.getNative();

      if (source.getParams().softbody) this.setNative(new sourceNative.constructor(sourceNative.tempGeometry.clone(), sourceNative.material, source.getParams()));else this.setNative(sourceNative.clone());

      this.wrap();

      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);

      this.getNative().mass = source.getNative().mass;

      return this;
    }
  }, {
    key: 'getParent',
    value: function getParent() {
      return this.parent;
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
    key: 'G_',
    value: function G_() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (this.buildGeometry) {
        this.getNative().geometry = this.buildGeometry(this.updateParams({ geometry: params }));
      }
    }
  }, {
    key: 'M_',
    value: function M_() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.getNative().material = this._initMaterial(this.updateParams({ material: params }).material);
    }
  }, {
    key: 'proccessSoftbodyGeometry',
    value: function proccessSoftbodyGeometry(geometry) {
      geometry.rotateX(this.__params.rot.x);
      geometry.rotateY(this.__params.rot.x);
      geometry.rotateZ(this.__params.rot.x);

      geometry.scale(this.__params.scale.x, this.__params.scale.y, this.__params.scale.z);

      geometry.translate(this.__params.pos.x, this.__params.pos.y, this.__params.pos.z);
    }

    /* Access private data */

  }, {
    key: 'setNative',
    value: function setNative(native) {
      this._native = native;

      this.position = native.position.clone();
      this.quaternion = native.quaternion.clone();
      this.rotation = native.rotation.clone();
    }
  }, {
    key: 'setMaterial',
    value: function setMaterial(material) {
      this._native.material = material;
      return this._native.material;
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
    key: 'raycast',
    value: function raycast() {
      var _getNative3;

      return (_getNative3 = this.getNative()).lookAt.apply(_getNative3, arguments);
    }
  }, {
    key: 'follow',
    value: function follow(curve) {
      var _this4 = this;

      var time = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];
      var loop = arguments[2];

      var gEnd = time;

      var animation = new _Loop.Loop(function (clock) {
        var u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u % 1),
            vec2 = curve.getPoint((u + 0.01) % 1);

        _this4.position.set(vec1.x, vec1.y, vec1.z);
        _this4.getNative().lookAt(vec2);
      });

      this.getWorld().addLoop(animation);

      animation.start();

      if (loop) {
        setInterval(function () {
          animation.stop();

          animation = new _Loop.Loop(function (clock) {
            var u = clock.getElapsedTime() * 1000 / gEnd,
                vec1 = curve.getPoint(u % 1),
                vec2 = curve.getPoint((u + 0.01) % 1);

            _this4.position.set(vec1.x, vec1.y, vec1.z);
            _this4.getNative().lookAt(vec2);
          });

          _this4.getWorld().addLoop(animation);

          animation.start();
        }, time);
      } else {
        setTimeout(function () {
          animation.stop();
          _this4.getWorld().removeLoop(animation);
        }, time);
      }
    }
  }, {
    key: 'position',
    get: function get() {
      return this.getNative().position;
    },
    set: function set(vector3) {
      var pos = this.getNative().position,
          native = this.getNative();

      Object.defineProperties(pos, {
        x: {
          get: function get() {
            return this._x;
          },
          set: function set(x) {
            native.__dirtyPosition = true;
            this._x = x;
          }
        },
        y: {
          get: function get() {
            return this._y;
          },
          set: function set(y) {
            native.__dirtyPosition = true;
            this._y = y;
          }
        },
        z: {
          get: function get() {
            return this._z;
          },
          set: function set(z) {
            native.__dirtyPosition = true;
            this._z = z;
          }
        }
      });

      native.__dirtyPosition = true;

      return pos.copy(vector3);
    }
  }, {
    key: 'quaternion',
    get: function get() {
      this.__c_rot = true;
      return this.getNative().quaternion;
    },
    set: function set(quaternion) {
      var _this5 = this;

      var quat = this.getNative().quaternion,
          native = this.getNative();

      quat.copy(quaternion);

      quat.onChange(function () {
        if (_this5.__c_rot) {
          if (native.__dirtyRotation === true) {
            _this5.__c_rot = false;
            native.__dirtyRotation = false;
          }
          native.__dirtyRotation = true;
        }
      });

      return quat;
    }
  }, {
    key: 'rotation',
    get: function get() {
      this.__c_rot = true;
      return this.getNative().rotation;
    },
    set: function set(euler) {
      var _this6 = this;

      var rot = this.getNative().rotation,
          native = this.getNative();

      rot.copy(euler);

      rot.onChange(function () {
        if (_this6.__c_rot) {
          _this6.quaternion.copy(new THREE.Quaternion().setFromEuler(rot));
          native.__dirtyRotation = true;
        }
      });

      return rot;
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
  }, {
    key: 'M_color',
    set: function set(val) {
      this.updateParams({ material: { color: val } });
      this.getNative().material.color = new THREE.Color(val);
    },
    get: function get() {
      return this.getNative().material.color;
    }
  }]);
  return Shape;
}(_Object.WHSObject);

exports.Shape = Shape;
//# sourceMappingURL=Shape.js.map
