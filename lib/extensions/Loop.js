'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = require('three');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loop = function () {
  function Loop(func) {
    (0, _classCallCheck3.default)(this, Loop);

    this.func = func;
    this.clock = new _three.Clock();
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

exports.default = Loop;
//# sourceMappingURL=Loop.js.map
