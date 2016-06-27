'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _eventable = require('../eventable');

var _api = require('../api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mesh = exports.Mesh = function (_THREE$Mesh) {
  (0, _inherits3.default)(Mesh, _THREE$Mesh);

  function Mesh(geometry, material, mass) {
    (0, _classCallCheck3.default)(this, Mesh);

    if (!geometry) return (0, _possibleConstructorReturn3.default)(_this);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Mesh).call(this, geometry, material));

    Object.assign(_this, new _eventable.Eventable());
    _eventable.Eventable.make(Mesh);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    _this._physijs = {
      type: null,
      id: (0, _api.getObjectId)(),
      mass: mass || 0,
      touches: [],
      linearVelocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3()
    };
    return _this;
  }

  (0, _createClass3.default)(Mesh, [{
    key: 'applyCentralImpulse',
    value: function applyCentralImpulse(force) {
      if (this.world) this.world.execute('applyCentralImpulse', { id: this._physijs.id, x: force.x, y: force.y, z: force.z });
    }
  }, {
    key: 'applyImpulse',
    value: function applyImpulse(force, offset) {
      if (this.world) {
        this.world.execute('applyImpulse', {
          id: this._physijs.id,
          impulse_x: force.x,
          impulse_y: force.y,
          impulse_z: force.z,
          x: offset.x,
          y: offset.y,
          z: offset.z
        });
      }
    }
  }, {
    key: 'applyTorque',
    value: function applyTorque(force) {
      if (this.world) {
        this.world.execute('applyTorque', {
          id: this._physijs.id,
          torque_x: force.x,
          torque_y: force.y,
          torque_z: force.z
        });
      }
    }
  }, {
    key: 'applyCentralForce',
    value: function applyCentralForce(force) {
      if (this.world) this.world.execute('applyCentralForce', { id: this._physijs.id, x: force.x, y: force.y, z: force.z });
    }
  }, {
    key: 'applyForce',
    value: function applyForce(force, offset) {
      if (this.world) {
        this.world.execute('applyForce', {
          id: this._physijs.id,
          force_x: force.x,
          force_y: force.y,
          force_z: force.z,
          x: offset.x,
          y: offset.y,
          z: offset.z
        });
      }
    }
  }, {
    key: 'getAngularVelocity',
    value: function getAngularVelocity() {
      return this._physijs.angularVelocity;
    }
  }, {
    key: 'setAngularVelocity',
    value: function setAngularVelocity(velocity) {
      if (this.world) this.world.execute('setAngularVelocity', { id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z });
    }
  }, {
    key: 'getLinearVelocity',
    value: function getLinearVelocity() {
      return this._physijs.linearVelocity;
    }
  }, {
    key: 'setLinearVelocity',
    value: function setLinearVelocity(velocity) {
      if (this.world) this.world.execute('setLinearVelocity', { id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z });
    }
  }, {
    key: 'setAngularFactor',
    value: function setAngularFactor(factor) {
      if (this.world) this.world.execute('setAngularFactor', { id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z });
    }
  }, {
    key: 'setLinearFactor',
    value: function setLinearFactor(factor) {
      if (this.world) this.world.execute('setLinearFactor', { id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z });
    }
  }, {
    key: 'setDamping',
    value: function setDamping(linear, angular) {
      if (this.world) this.world.execute('setDamping', { id: this._physijs.id, linear: linear, angular: angular });
    }
  }, {
    key: 'setCcdMotionThreshold',
    value: function setCcdMotionThreshold(threshold) {
      if (this.world) this.world.execute('setCcdMotionThreshold', { id: this._physijs.id, threshold: threshold });
    }
  }, {
    key: 'setCcdSweptSphereRadius',
    value: function setCcdSweptSphereRadius(radius) {
      if (this.world) this.world.execute('setCcdSweptSphereRadius', { id: this._physijs.id, radius: radius });
    }
  }, {
    key: 'mass',
    get: function get() {
      return this._physijs.mass;
    },
    set: function set(mass) {
      this._physijs.mass = mass;
      if (this.world) this.world.execute('updateMass', { id: this._physijs.id, mass: mass });
    }
  }]);
  return Mesh;
}(THREE.Mesh);
//# sourceMappingURL=mesh.js.map
