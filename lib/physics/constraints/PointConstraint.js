'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointConstraint = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _api = require('../api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PointConstraint = exports.PointConstraint = function () {
  function PointConstraint(obja, objb, position) {
    (0, _classCallCheck3.default)(this, PointConstraint);

    var objecta = obja.getNative();
    var objectb = obja.getNative();

    if (position === undefined) {
      position = objectb;
      objectb = undefined;
    }

    this.type = 'point';
    this.appliedImpulse = 0;
    this.id = (0, _api.getObjectId)();
    this.objecta = objecta._physijs.id;
    this.positiona = (0, _api.convertWorldPositionToObject)(position, objecta).clone();

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = (0, _api.convertWorldPositionToObject)(position, objectb).clone();
    }
  }

  (0, _createClass3.default)(PointConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb
      };
    }
  }]);
  return PointConstraint;
}();
//# sourceMappingURL=PointConstraint.js.map
