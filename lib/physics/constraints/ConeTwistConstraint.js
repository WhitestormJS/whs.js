'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConeTwistConstraint = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _api = require('../api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConeTwistConstraint = exports.ConeTwistConstraint = function () {
  function ConeTwistConstraint(objecta, objectb, position) {
    (0, _classCallCheck3.default)(this, ConeTwistConstraint);

    if (position === undefined) console.error('Both objects must be defined in a ConeTwistConstraint.');
    this.type = 'conetwist';
    this.appliedImpulse = 0;
    this.id = (0, _api.getObjectId)();
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = (0, _api.convertWorldPositionToObject)(position, objecta).clone();
    this.objectb = objectb._physijs.id;
    this.positionb = (0, _api.convertWorldPositionToObject)(position, objectb).clone();
    this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };
    this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
  }

  (0, _createClass3.default)(ConeTwistConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb,
        axisa: this.axisa,
        axisb: this.axisb
      };
    }
  }, {
    key: 'setLimit',
    value: function setLimit(x, y, z) {
      this.scene.execute('conetwist_setLimit', { constraint: this.id, x: x, y: y, z: z });
    }
  }, {
    key: 'enableMotor',
    value: function enableMotor() {
      this.scene.execute('conetwist_enableMotor', { constraint: this.id });
    }
  }, {
    key: 'setMaxMotorImpulse',
    value: function setMaxMotorImpulse(max_impulse) {
      this.scene.execute('conetwist_setMaxMotorImpulse', { constraint: this.id, max_impulse: max_impulse });
    }
  }, {
    key: 'setMotorTarget',
    value: function setMotorTarget(target) {
      if (target instanceof THREE.Vector3) target = new THREE.Quaternion().setFromEuler(new THREE.Euler(target.x, target.y, target.z));else if (target instanceof THREE.Euler) target = new THREE.Quaternion().setFromEuler(target);else if (target instanceof THREE.Matrix4) target = new THREE.Quaternion().setFromRotationMatrix(target);

      this.scene.execute('conetwist_setMotorTarget', {
        constraint: this.id,
        x: target.x,
        y: target.y,
        z: target.z,
        w: target.w
      });
    }
  }]);
  return ConeTwistConstraint;
}();
//# sourceMappingURL=ConeTwistConstraint.js.map
