'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHSObject = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _minivents = require('minivents');

var _minivents2 = _interopRequireDefault(_minivents);

var _api = require('../extras/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var scope = structurable ? Object.assign(this, {
      __whsobject: true,
      __releaseTime: new Date().getTime(),
      __params: {},
      __defaults: defaults,

      parent: null,
      children: []
    }, new _minivents2.default()) : Object.assign(this, {
      __whsobject: true,
      __releaseTime: new Date().getTime(),
      __params: {},
      __defaults: defaults
    }, new _minivents2.default());

    return scope;
  }

  (0, _createClass3.default)(WHSObject, [{
    key: 'setParams',
    value: function setParams() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.__params = (0, _api.extend)(params, this.__defaults);
      return this.__params;
    }
  }, {
    key: 'updateParams',
    value: function updateParams() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.__params = (0, _api.extend)(params, this.__params);
      return this.__params;
    }
  }, {
    key: 'getParams',
    value: function getParams() {
      return this.__params;
    }
  }, {
    key: 'setNative',
    value: function setNative(native) {
      this._native = native;
      return this.native;
    }
  }, {
    key: 'getNative',
    value: function getNative() {
      return this._native;
    }
  }, {
    key: 'add',
    value: function add(children) {
      var _scope = this;

      if (children.addTo) return children.addTo(this);else if (children instanceof Object) {
        return new Promise(function (resolve) {
          children.parent = _scope;

          _scope.getNative().add(children.getNative());
          _scope.children.push(_scope);

          resolve();
        });
      }
    }

    /**
     * Remove this shape from world.
     *
     * @return {WHS.Shape} - this.
     */

  }, {
    key: 'remove',
    value: function remove(source) {
      this.getNative().remove(source.getNative());

      this.children.splice(this.children.indexOf(source), 1);
      source.parent = null;

      source.emit('remove');

      if (WHS.debug) {
        console.debug('@WHS.Shape: Shape ' + source._type + ' was removed from world', [source]);
      }

      return this;
    }
  }]);
  return WHSObject;
}();

exports.WHSObject = WHSObject;
//# sourceMappingURL=Object.js.map
