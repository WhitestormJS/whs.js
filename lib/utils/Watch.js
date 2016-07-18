"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Watch = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Watch = function () {
  function Watch(queue) {
    (0, _classCallCheck3.default)(this, Watch);

    this._queue = Array.isArray(queue) ? queue.slice() : [];
  }

  (0, _createClass3.default)(Watch, [{
    key: "add",
    value: function add(element) {
      this._queue.push(element);
    }
  }, {
    key: "remove",
    value: function remove(element) {
      this._queue = this._queue.filter(function (item) {
        return item !== element;
      });
    }
  }]);
  return Watch;
}();

exports.Watch = Watch;