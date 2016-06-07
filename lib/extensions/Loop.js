'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loop = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=Loop.js.map
