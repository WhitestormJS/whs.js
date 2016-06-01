'use strict';

_Object3.default.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _three2 = _interopRequireDefault(_three);

var _api = require('../extras/api');

var _api2 = _interopRequireDefault(_api);

var _Object2 = require('./Object');

var _Object3 = _interopRequireDefault(_Object2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Curve = function (_Object) {
  (0, _inherits3.default)(Curve, _Object);

  /**
   * Create curve.
   *
   * Todo
   */

  function Curve(params) {
    var _ret;

    (0, _classCallCheck3.default)(this, Curve);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Object3.default.getPrototypeOf(Curve).call(this, {
      geometry: {
        curve: false,
        points: 50
      }
    }));

    (0, _get3.default)(_Object3.default.getPrototypeOf(Curve.prototype), 'setParams', _this).call(_this, params);

    var geometry = new _three2.default.Geometry();

    geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

    var curve = new _three2.default.Line(geometry, (0, _api2.default)(params.material, false)._material);

    _this.setNative(curve);

    var scope = _Object3.default.assign(_this, {
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
          if (WHS.debug) {
            console.debug('@WHS.Curve: Curve ' + _scope._type + ' was added to world.', [_scope, _scope.parent]);
          }

          resolve(_scope);
        }
      });
    }

    /* Access private data */

  }, {
    key: 'setNative',
    value: function setNative(curve) {
      return native.set(this, curve);
    }
  }, {
    key: 'getNative',
    value: function getNative() {
      return native.get(this);
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

      if (WHS.debug) {
        console.debug('@WHS.Curve: Curve ' + this._type + ' was removed from world', [_scope]);
      }

      return this;
    }
  }]);
  return Curve;
}(_Object3.default);

exports.default = Curve;
//# sourceMappingURL=Curve.js.map
