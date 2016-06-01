"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Object = function () {
  /**
   * Constructing WHS.Shape object.
   *
   * @param {Boolean} structurable - true if object has parents and children.
   * @param {String} type - Shape type.
   * @return {WHS.Object}
   */

  function Object() {
    var defaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var structurable = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    (0, _classCallCheck3.default)(this, Object);

    var scope = structurable ? Object.assign(this, {
      __whsobject: true,
      __releaseTime: new Date().getTime(),
      __params: {},
      __defaults: defaults,

      parent: null,
      children: []
    }, new Events()) : Object.assign(this, {
      __whsobject: true,
      __releaseTime: new Date().getTime(),
      __params: {}
    }, new Events());

    return scope;
  }

  (0, _createClass3.default)(Object, [{
    key: "setParams",
    value: function setParams() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.__params = WHS.API.extend(params, this.__defaults);
    }
  }, {
    key: "updateParams",
    value: function updateParams() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.__params = WHS.API.extend(params, this.__params);
    }
  }, {
    key: "getParams",
    value: function getParams() {
      return this.__params;
    }
  }, {
    key: "add",
    value: function add(children) {
      var _scope = this;

      if (children instanceof WHS.Shape || children instanceof WHS.Light) return children.addTo(this);else if (children instanceof WHS.Object) {
        return new _promise2.default(function (resolve) {
          children.parent = _scope;

          _scope.getNative().add(children.getNative());
          _scope.children.push(_scope);

          resolve();
        });
      }
    }
  }]);
  return Object;
}();

exports.default = Object;
//# sourceMappingURL=Object.js.map
