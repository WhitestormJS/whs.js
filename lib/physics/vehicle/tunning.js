"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleTunning = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VehicleTunning = exports.VehicleTunning = function VehicleTunning() {
  var suspension_stiffness = arguments.length <= 0 || arguments[0] === undefined ? 5.88 : arguments[0];
  var suspension_compression = arguments.length <= 1 || arguments[1] === undefined ? 0.83 : arguments[1];
  var suspension_damping = arguments.length <= 2 || arguments[2] === undefined ? 0.88 : arguments[2];
  var max_suspension_travel = arguments.length <= 3 || arguments[3] === undefined ? 500 : arguments[3];
  var friction_slip = arguments.length <= 4 || arguments[4] === undefined ? 10.5 : arguments[4];
  var max_suspension_force = arguments.length <= 5 || arguments[5] === undefined ? 6000 : arguments[5];
  (0, _classCallCheck3.default)(this, VehicleTunning);

  this.suspension_stiffness = suspension_stiffness;
  this.suspension_compression = suspension_compression;
  this.suspension_damping = suspension_damping;
  this.max_suspension_travel = max_suspension_travel;
  this.friction_slip = friction_slip;
  this.max_suspension_force = max_suspension_force;
};
//# sourceMappingURL=tunning.js.map
