/* Physics module AmmoNext v0.1.2 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('whs')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', 'whs'], factory) :
	(factory((global.PHYSICS = {}),global.THREE,global.WHS));
}(this, (function (exports,three,whs) { 'use strict';

var MESSAGE_TYPES = {
  WORLDREPORT: 0,
  COLLISIONREPORT: 1,
  VEHICLEREPORT: 2,
  CONSTRAINTREPORT: 3,
  SOFTREPORT: 4
};

var REPORT_ITEMSIZE = 14;
var COLLISIONREPORT_ITEMSIZE = 5;
var VEHICLEREPORT_ITEMSIZE = 9;
var CONSTRAINTREPORT_ITEMSIZE = 6;

var temp1Vector3 = new three.Vector3();
var temp2Vector3 = new three.Vector3();
var temp1Matrix4 = new three.Matrix4();
var temp1Quat = new three.Quaternion();

var getEulerXYZFromQuaternion = function getEulerXYZFromQuaternion(x, y, z, w) {
  return new three.Vector3(Math.atan2(2 * (x * w - y * z), w * w - x * x - y * y + z * z), Math.asin(2 * (x * z + y * w)), Math.atan2(2 * (z * w - x * y), w * w + x * x - y * y - z * z));
};

var getQuatertionFromEuler = function getQuatertionFromEuler(x, y, z) {
  var c1 = Math.cos(y);
  var s1 = Math.sin(y);
  var c2 = Math.cos(-z);
  var s2 = Math.sin(-z);
  var c3 = Math.cos(x);
  var s3 = Math.sin(x);
  var c1c2 = c1 * c2;
  var s1s2 = s1 * s2;

  return {
    w: c1c2 * c3 - s1s2 * s3,
    x: c1c2 * s3 + s1s2 * c3,
    y: s1 * c2 * c3 + c1 * s2 * s3,
    z: c1 * s2 * c3 - s1 * c2 * s3
  };
};

var convertWorldPositionToObject = function convertWorldPositionToObject(position, object) {
  temp1Matrix4.identity(); // reset temp matrix

  // Set the temp matrix's rotation to the object's rotation
  temp1Matrix4.identity().makeRotationFromQuaternion(object.quaternion);

  // Invert rotation matrix in order to "unrotate" a point back to object space
  temp1Matrix4.getInverse(temp1Matrix4);

  // Yay! Temp vars!
  temp1Vector3.copy(position);
  temp2Vector3.copy(object.position);

  // Apply the rotation
  return temp1Vector3.sub(temp2Vector3).applyMatrix4(temp1Matrix4);
};

var addObjectChildren = function addObjectChildren(parent, object) {
  for (var i = 0; i < object.children.length; i++) {
    var child = object.children[i];
    var physics = child.component ? child.component.use('physics') : false;

    if (physics) {
      var data = physics.data;

      child.updateMatrix();
      child.updateMatrixWorld();

      temp1Vector3.setFromMatrixPosition(child.matrixWorld);
      temp1Quat.setFromRotationMatrix(child.matrixWorld);

      data.position_offset = {
        x: temp1Vector3.x,
        y: temp1Vector3.y,
        z: temp1Vector3.z
      };

      data.rotation = {
        x: temp1Quat.x,
        y: temp1Quat.y,
        z: temp1Quat.z,
        w: temp1Quat.w
      };

      parent.component.use('physics').data.children.push(data);
    }

    addObjectChildren(parent, child);
  }
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Eventable = function () {
  function Eventable() {
    classCallCheck(this, Eventable);

    this._eventListeners = {};
  }

  createClass(Eventable, [{
    key: "addEventListener",
    value: function addEventListener(event_name, callback) {
      if (!this._eventListeners.hasOwnProperty(event_name)) this._eventListeners[event_name] = [];

      this._eventListeners[event_name].push(callback);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event_name, callback) {
      var index = void 0;

      if (!this._eventListeners.hasOwnProperty(event_name)) return false;

      if ((index = this._eventListeners[event_name].indexOf(callback)) >= 0) {
        this._eventListeners[event_name].splice(index, 1);
        return true;
      }

      return false;
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event_name) {
      var i = void 0;
      var parameters = Array.prototype.splice.call(arguments, 1);

      if (this._eventListeners.hasOwnProperty(event_name)) {
        for (i = 0; i < this._eventListeners[event_name].length; i++) {
          this._eventListeners[event_name][i].apply(this, parameters);
        }
      }
    }
  }], [{
    key: "make",
    value: function make(obj) {
      obj.prototype.addEventListener = Eventable.prototype.addEventListener;
      obj.prototype.removeEventListener = Eventable.prototype.removeEventListener;
      obj.prototype.dispatchEvent = Eventable.prototype.dispatchEvent;
    }
  }]);
  return Eventable;
}();

var ConeTwistConstraint = function () {
  function ConeTwistConstraint(obja, objb, position) {
    classCallCheck(this, ConeTwistConstraint);

    var objecta = obja;
    var objectb = obja;

    if (position === undefined) console.error('Both objects must be defined in a ConeTwistConstraint.');

    this.type = 'conetwist';
    this.appliedImpulse = 0;
    this.worldModule = null; // Will be redefined by .addConstraint
    this.objecta = objecta.use('physics').data.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.objectb = objectb.use('physics').data.id;
    this.positionb = convertWorldPositionToObject(position, objectb).clone();
    this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };
    this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
  }

  createClass(ConeTwistConstraint, [{
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
      if (this.worldModule) this.worldModule.execute('conetwist_setLimit', { constraint: this.id, x: x, y: y, z: z });
    }
  }, {
    key: 'enableMotor',
    value: function enableMotor() {
      if (this.worldModule) this.worldModule.execute('conetwist_enableMotor', { constraint: this.id });
    }
  }, {
    key: 'setMaxMotorImpulse',
    value: function setMaxMotorImpulse(max_impulse) {
      if (this.worldModule) this.worldModule.execute('conetwist_setMaxMotorImpulse', { constraint: this.id, max_impulse: max_impulse });
    }
  }, {
    key: 'setMotorTarget',
    value: function setMotorTarget(target) {
      if (target instanceof THREE.Vector3) target = new THREE.Quaternion().setFromEuler(new THREE.Euler(target.x, target.y, target.z));else if (target instanceof THREE.Euler) target = new THREE.Quaternion().setFromEuler(target);else if (target instanceof THREE.Matrix4) target = new THREE.Quaternion().setFromRotationMatrix(target);

      if (this.worldModule) this.worldModule.execute('conetwist_setMotorTarget', {
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

var HingeConstraint = function () {
  function HingeConstraint(obja, objb, position, axis) {
    classCallCheck(this, HingeConstraint);

    var objecta = obja;
    var objectb = objb;

    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'hinge';
    this.appliedImpulse = 0;
    this.worldModule = null; // Will be redefined by .addConstraint
    this.objecta = objecta.use('physics').data.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.position = position.clone();
    this.axis = axis;

    if (objectb) {
      this.objectb = objectb.use('physics').data.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
    }
  }

  createClass(HingeConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb,
        axis: this.axis
      };
    }
  }, {
    key: 'setLimits',
    value: function setLimits(low, high, bias_factor, relaxation_factor) {
      if (this.worldModule) this.worldModule.execute('hinge_setLimits', {
        constraint: this.id,
        low: low,
        high: high,
        bias_factor: bias_factor,
        relaxation_factor: relaxation_factor
      });
    }
  }, {
    key: 'enableAngularMotor',
    value: function enableAngularMotor(velocity, acceleration) {
      if (this.worldModule) this.worldModule.execute('hinge_enableAngularMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableMotor',
    value: function disableMotor() {
      if (this.worldModule) this.worldModule.execute('hinge_disableMotor', { constraint: this.id });
    }
  }]);
  return HingeConstraint;
}();

var PointConstraint = function () {
  function PointConstraint(obja, objb, position) {
    classCallCheck(this, PointConstraint);

    var objecta = obja;
    var objectb = objb;

    if (position === undefined) {
      position = objectb;
      objectb = undefined;
    }

    this.type = 'point';
    this.appliedImpulse = 0;
    this.objecta = objecta.use('physics').data.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();

    if (objectb) {
      this.objectb = objectb.use('physics').data.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
    }
  }

  createClass(PointConstraint, [{
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

var SliderConstraint = function () {
  function SliderConstraint(obja, objb, position, axis) {
    classCallCheck(this, SliderConstraint);

    var objecta = obja;
    var objectb = objb;

    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'slider';
    this.appliedImpulse = 0;
    this.worldModule = null; // Will be redefined by .addConstraint
    this.objecta = objecta.use('physics').data.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.axis = axis;

    if (objectb) {
      this.objectb = objectb.use('physics').data.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
    }
  }

  createClass(SliderConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb,
        axis: this.axis
      };
    }
  }, {
    key: 'setLimits',
    value: function setLimits(lin_lower, lin_upper, ang_lower, ang_upper) {
      if (this.worldModule) this.worldModule.execute('slider_setLimits', {
        constraint: this.id,
        lin_lower: lin_lower,
        lin_upper: lin_upper,
        ang_lower: ang_lower,
        ang_upper: ang_upper
      });
    }
  }, {
    key: 'setRestitution',
    value: function setRestitution(linear, angular) {
      if (this.worldModule) this.worldModule.execute('slider_setRestitution', {
        constraint: this.id,
        linear: linear,
        angular: angular
      });
    }
  }, {
    key: 'enableLinearMotor',
    value: function enableLinearMotor(velocity, acceleration) {
      if (this.worldModule) this.worldModule.execute('slider_enableLinearMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableLinearMotor',
    value: function disableLinearMotor() {
      if (this.worldModule) this.worldModule.execute('slider_disableLinearMotor', { constraint: this.id });
    }
  }, {
    key: 'enableAngularMotor',
    value: function enableAngularMotor(velocity, acceleration) {
      this.scene.execute('slider_enableAngularMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableAngularMotor',
    value: function disableAngularMotor() {
      if (this.worldModule) this.worldModule.execute('slider_disableAngularMotor', { constraint: this.id });
    }
  }]);
  return SliderConstraint;
}();

var DOFConstraint = function () {
  function DOFConstraint(obja, objb, position) {
    classCallCheck(this, DOFConstraint);

    var objecta = obja;
    var objectb = objb;

    if (position === undefined) {
      position = objectb;
      objectb = undefined;
    }

    this.type = 'dof';
    this.appliedImpulse = 0;
    this.worldModule = null; // Will be redefined by .addConstraint
    this.objecta = objecta.use('physics').data.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };

    if (objectb) {
      this.objectb = objectb.use('physics').data.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
      this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
    }
  }

  createClass(DOFConstraint, [{
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
    key: 'setLinearLowerLimit',
    value: function setLinearLowerLimit(limit) {
      if (this.worldModule) this.worldModule.execute('dof_setLinearLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setLinearUpperLimit',
    value: function setLinearUpperLimit(limit) {
      if (this.worldModule) this.worldModule.execute('dof_setLinearUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setAngularLowerLimit',
    value: function setAngularLowerLimit(limit) {
      if (this.worldModule) this.worldModule.execute('dof_setAngularLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setAngularUpperLimit',
    value: function setAngularUpperLimit(limit) {
      if (this.worldModule) this.worldModule.execute('dof_setAngularUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'enableAngularMotor',
    value: function enableAngularMotor(which) {
      if (this.worldModule) this.worldModule.execute('dof_enableAngularMotor', { constraint: this.id, which: which });
    }
  }, {
    key: 'configureAngularMotor',
    value: function configureAngularMotor(which, low_angle, high_angle, velocity, max_force) {
      if (this.worldModule) this.worldModule.execute('dof_configureAngularMotor', { constraint: this.id, which: which, low_angle: low_angle, high_angle: high_angle, velocity: velocity, max_force: max_force });
    }
  }, {
    key: 'disableAngularMotor',
    value: function disableAngularMotor(which) {
      if (this.worldModule) this.worldModule.execute('dof_disableAngularMotor', { constraint: this.id, which: which });
    }
  }]);
  return DOFConstraint;
}();

var Vehicle = function () {
  function Vehicle(mesh) {
    var tuning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new VehicleTuning();
    classCallCheck(this, Vehicle);

    this.mesh = mesh;
    this.wheels = [];

    this._physijs = {
      id: getObjectId(),
      rigidBody: mesh._physijs.id,
      suspension_stiffness: tuning.suspension_stiffness,
      suspension_compression: tuning.suspension_compression,
      suspension_damping: tuning.suspension_damping,
      max_suspension_travel: tuning.max_suspension_travel,
      friction_slip: tuning.friction_slip,
      max_suspension_force: tuning.max_suspension_force
    };
  }

  createClass(Vehicle, [{
    key: 'addWheel',
    value: function addWheel(wheel_geometry, wheel_material, connection_point, wheel_direction, wheel_axle, suspension_rest_length, wheel_radius, is_front_wheel, tuning) {
      var wheel = new three.Mesh(wheel_geometry, wheel_material);

      wheel.castShadow = wheel.receiveShadow = true;
      wheel.position.copy(wheel_direction).multiplyScalar(suspension_rest_length / 100).add(connection_point);

      this.world.add(wheel);
      this.wheels.push(wheel);

      this.world.execute('addWheel', {
        id: this._physijs.id,
        connection_point: { x: connection_point.x, y: connection_point.y, z: connection_point.z },
        wheel_direction: { x: wheel_direction.x, y: wheel_direction.y, z: wheel_direction.z },
        wheel_axle: { x: wheel_axle.x, y: wheel_axle.y, z: wheel_axle.z },
        suspension_rest_length: suspension_rest_length,
        wheel_radius: wheel_radius,
        is_front_wheel: is_front_wheel,
        tuning: tuning
      });
    }
  }, {
    key: 'setSteering',
    value: function setSteering(amount, wheel) {
      if (wheel !== undefined && this.wheels[wheel] !== undefined) this.world.execute('setSteering', { id: this._physijs.id, wheel: wheel, steering: amount });else if (this.wheels.length > 0) {
        for (var i = 0; i < this.wheels.length; i++) {
          this.world.execute('setSteering', { id: this._physijs.id, wheel: i, steering: amount });
        }
      }
    }
  }, {
    key: 'setBrake',
    value: function setBrake(amount, wheel) {
      if (wheel !== undefined && this.wheels[wheel] !== undefined) this.world.execute('setBrake', { id: this._physijs.id, wheel: wheel, brake: amount });else if (this.wheels.length > 0) {
        for (var i = 0; i < this.wheels.length; i++) {
          this.world.execute('setBrake', { id: this._physijs.id, wheel: i, brake: amount });
        }
      }
    }
  }, {
    key: 'applyEngineForce',
    value: function applyEngineForce(amount, wheel) {
      if (wheel !== undefined && this.wheels[wheel] !== undefined) this.world.execute('applyEngineForce', { id: this._physijs.id, wheel: wheel, force: amount });else if (this.wheels.length > 0) {
        for (var i = 0; i < this.wheels.length; i++) {
          this.world.execute('applyEngineForce', { id: this._physijs.id, wheel: i, force: amount });
        }
      }
    }
  }]);
  return Vehicle;
}();

var _class;
var _temp2;

var WorldModuleBase = (_temp2 = _class = function (_Eventable) {
  inherits(WorldModuleBase, _Eventable);

  function WorldModuleBase(options) {
    classCallCheck(this, WorldModuleBase);

    var _this = possibleConstructorReturn(this, (WorldModuleBase.__proto__ || Object.getPrototypeOf(WorldModuleBase)).call(this));

    _this.bridge = {
      onAdd: function onAdd(component, self) {
        if (component.use('physics')) return self.defer(self.onAddCallback.bind(self), [component]);
        return;
      },
      onRemove: function onRemove(component, self) {
        if (component.use('physics')) return self.defer(self.onRemoveCallback.bind(self), [component]);
        return;
      }
    };


    _this.options = Object.assign(WorldModuleBase.defaults, options);

    _this.objects = {};
    _this.vehicles = {};
    _this.constraints = {};
    _this.isSimulating = false;

    _this.getObjectId = function () {
      var id = 1;
      return function () {
        return id++;
      };
    }();
    return _this;
  }

  createClass(WorldModuleBase, [{
    key: 'setup',
    value: function setup() {
      var _this2 = this;

      this.receive(function (event) {
        var _temp = void 0,
            data = event.data;

        if (data instanceof ArrayBuffer && data.byteLength !== 1) // byteLength === 1 is the worker making a SUPPORT_TRANSFERABLE test
          data = new Float32Array(data);

        if (data instanceof Float32Array) {
          // transferable object
          switch (data[0]) {
            case MESSAGE_TYPES.WORLDREPORT:
              _this2.updateScene(data);
              break;

            case MESSAGE_TYPES.SOFTREPORT:
              _this2.updateSoftbodies(data);
              break;

            case MESSAGE_TYPES.COLLISIONREPORT:
              _this2.updateCollisions(data);
              break;

            case MESSAGE_TYPES.VEHICLEREPORT:
              _this2.updateVehicles(data);
              break;

            case MESSAGE_TYPES.CONSTRAINTREPORT:
              _this2.updateConstraints(data);
              break;
            default:
          }
        } else if (data.cmd) {
          // non-transferable object
          switch (data.cmd) {
            case 'objectReady':
              _temp = data.params;
              if (_this2.objects[_temp]) _this2.objects[_temp].dispatchEvent('ready');
              break;

            case 'worldReady':
              _this2.dispatchEvent('ready');
              break;

            case 'ammoLoaded':
              _this2.dispatchEvent('loaded');
              // console.log("Physics loading time: " + (performance.now() - start) + "ms");
              break;

            case 'vehicle':
              window.test = data;
              break;

            default:
              // Do nothing, just show the message
              console.debug('Received: ' + data.cmd);
              console.dir(data.params);
              break;
          }
        } else {
          switch (data[0]) {
            case MESSAGE_TYPES.WORLDREPORT:
              _this2.updateScene(data);
              break;

            case MESSAGE_TYPES.COLLISIONREPORT:
              _this2.updateCollisions(data);
              break;

            case MESSAGE_TYPES.VEHICLEREPORT:
              _this2.updateVehicles(data);
              break;

            case MESSAGE_TYPES.CONSTRAINTREPORT:
              _this2.updateConstraints(data);
              break;
            default:
          }
        }
      });
    }
  }, {
    key: 'updateScene',
    value: function updateScene(info) {
      var index = info[1];

      while (index--) {
        var offset = 2 + index * REPORT_ITEMSIZE;
        var object = this.objects[info[offset]];
        var component = object.component;
        var data = component.use('physics').data;

        if (object === null) continue;

        if (component.__dirtyPosition === false) {
          object.position.set(info[offset + 1], info[offset + 2], info[offset + 3]);

          component.__dirtyPosition = false;
        }

        if (component.__dirtyRotation === false) {
          object.quaternion.set(info[offset + 4], info[offset + 5], info[offset + 6], info[offset + 7]);

          component.__dirtyRotation = false;
        }

        data.linearVelocity.set(info[offset + 8], info[offset + 9], info[offset + 10]);

        data.angularVelocity.set(info[offset + 11], info[offset + 12], info[offset + 13]);
      }

      if (this.SUPPORT_TRANSFERABLE) this.send(info.buffer, [info.buffer]); // Give the typed array back to the worker

      this.isSimulating = false;
      this.dispatchEvent('update');
    }
  }, {
    key: 'updateSoftbodies',
    value: function updateSoftbodies(info) {
      var index = info[1],
          offset = 2;

      while (index--) {
        var size = info[offset + 1];
        var object = this.objects[info[offset]];

        if (object === null) continue;

        var data = object.component.use('physics').data;

        var attributes = object.geometry.attributes;
        var volumePositions = attributes.position.array;

        var offsetVert = offset + 2;

        // console.log(data.id);
        if (!data.isSoftBodyReset) {
          object.position.set(0, 0, 0);
          object.quaternion.set(0, 0, 0, 0);

          data.isSoftBodyReset = true;
        }

        if (data.type === "softTrimesh") {
          var volumeNormals = attributes.normal.array;

          for (var i = 0; i < size; i++) {
            var offs = offsetVert + i * 18;

            var x1 = info[offs];
            var y1 = info[offs + 1];
            var z1 = info[offs + 2];

            var nx1 = info[offs + 3];
            var ny1 = info[offs + 4];
            var nz1 = info[offs + 5];

            var x2 = info[offs + 6];
            var y2 = info[offs + 7];
            var z2 = info[offs + 8];

            var nx2 = info[offs + 9];
            var ny2 = info[offs + 10];
            var nz2 = info[offs + 11];

            var x3 = info[offs + 12];
            var y3 = info[offs + 13];
            var z3 = info[offs + 14];

            var nx3 = info[offs + 15];
            var ny3 = info[offs + 16];
            var nz3 = info[offs + 17];

            var i9 = i * 9;

            volumePositions[i9] = x1;
            volumePositions[i9 + 1] = y1;
            volumePositions[i9 + 2] = z1;

            volumePositions[i9 + 3] = x2;
            volumePositions[i9 + 4] = y2;
            volumePositions[i9 + 5] = z2;

            volumePositions[i9 + 6] = x3;
            volumePositions[i9 + 7] = y3;
            volumePositions[i9 + 8] = z3;

            volumeNormals[i9] = nx1;
            volumeNormals[i9 + 1] = ny1;
            volumeNormals[i9 + 2] = nz1;

            volumeNormals[i9 + 3] = nx2;
            volumeNormals[i9 + 4] = ny2;
            volumeNormals[i9 + 5] = nz2;

            volumeNormals[i9 + 6] = nx3;
            volumeNormals[i9 + 7] = ny3;
            volumeNormals[i9 + 8] = nz3;
          }

          attributes.normal.needsUpdate = true;
          offset += 2 + size * 18;
        } else if (data.type === "softRopeMesh") {
          for (var _i = 0; _i < size; _i++) {
            var _offs = offsetVert + _i * 3;

            var x = info[_offs];
            var y = info[_offs + 1];
            var z = info[_offs + 2];

            volumePositions[_i * 3] = x;
            volumePositions[_i * 3 + 1] = y;
            volumePositions[_i * 3 + 2] = z;
          }

          offset += 2 + size * 3;
        } else {
          var _volumeNormals = attributes.normal.array;

          for (var _i2 = 0; _i2 < size; _i2++) {
            var _offs2 = offsetVert + _i2 * 6;

            var _x = info[_offs2];
            var _y = info[_offs2 + 1];
            var _z = info[_offs2 + 2];

            var nx = info[_offs2 + 3];
            var ny = info[_offs2 + 4];
            var nz = info[_offs2 + 5];

            volumePositions[_i2 * 3] = _x;
            volumePositions[_i2 * 3 + 1] = _y;
            volumePositions[_i2 * 3 + 2] = _z;

            // FIXME: Normals are pointed to look inside;
            _volumeNormals[_i2 * 3] = nx;
            _volumeNormals[_i2 * 3 + 1] = ny;
            _volumeNormals[_i2 * 3 + 2] = nz;
          }

          attributes.normal.needsUpdate = true;
          offset += 2 + size * 6;
        }

        attributes.position.needsUpdate = true;
      }

      // if (this.SUPPORT_TRANSFERABLE)
      //   this.send(info.buffer, [info.buffer]); // Give the typed array back to the worker

      this.isSimulating = false;
    }
  }, {
    key: 'updateVehicles',
    value: function updateVehicles(data) {
      var vehicle = void 0,
          wheel = void 0;

      for (var i = 0; i < (data.length - 1) / VEHICLEREPORT_ITEMSIZE; i++) {
        var offset = 1 + i * VEHICLEREPORT_ITEMSIZE;
        vehicle = this.vehicles[data[offset]];

        if (vehicle === null) continue;

        wheel = vehicle.wheels[data[offset + 1]];

        wheel.position.set(data[offset + 2], data[offset + 3], data[offset + 4]);

        wheel.quaternion.set(data[offset + 5], data[offset + 6], data[offset + 7], data[offset + 8]);
      }

      if (this.SUPPORT_TRANSFERABLE) this.send(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: 'updateConstraints',
    value: function updateConstraints(data) {
      var constraint = void 0,
          object = void 0;

      for (var i = 0; i < (data.length - 1) / CONSTRAINTREPORT_ITEMSIZE; i++) {
        var offset = 1 + i * CONSTRAINTREPORT_ITEMSIZE;
        constraint = this.constraints[data[offset]];
        object = this.objects[data[offset + 1]];

        if (constraint === undefined || object === undefined) continue;

        temp1Vector3.set(data[offset + 2], data[offset + 3], data[offset + 4]);

        temp1Matrix4.extractRotation(object.matrix);
        temp1Vector3.applyMatrix4(temp1Matrix4);

        constraint.positiona.addVectors(object.position, temp1Vector3);
        constraint.appliedImpulse = data[offset + 5];
      }

      if (this.SUPPORT_TRANSFERABLE) this.send(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: 'updateCollisions',
    value: function updateCollisions(info) {
      /**
       * #TODO
       * This is probably the worst way ever to handle collisions. The inherent evilness is a residual
       * effect from the previous version's evilness which mutated when switching to transferable objects.
       *
       * If you feel inclined to make this better, please do so.
       */

      var collisions = {},
          normal_offsets = {};

      // Build collision manifest
      for (var i = 0; i < info[1]; i++) {
        var offset = 2 + i * COLLISIONREPORT_ITEMSIZE;
        var object = info[offset];
        var object2 = info[offset + 1];

        normal_offsets[object + '-' + object2] = offset + 2;
        normal_offsets[object2 + '-' + object] = -1 * (offset + 2);

        // Register collisions for both the object colliding and the object being collided with
        if (!collisions[object]) collisions[object] = [];
        collisions[object].push(object2);

        if (!collisions[object2]) collisions[object2] = [];
        collisions[object2].push(object);
      }

      // Deal with collisions
      for (var id1 in this.objects) {
        if (!this.objects.hasOwnProperty(id1)) continue;
        var _object = this.objects[id1];
        var component = _object.component;
        var data = component.use('physics').data;

        if (_object === null) continue;

        // If object touches anything, ...
        if (collisions[id1]) {
          // Clean up touches array
          for (var j = 0; j < data.touches.length; j++) {
            if (collisions[id1].indexOf(data.touches[j]) === -1) data.touches.splice(j--, 1);
          }

          // Handle each colliding object
          for (var _j = 0; _j < collisions[id1].length; _j++) {
            var id2 = collisions[id1][_j];
            var _object2 = this.objects[id2];
            var component2 = _object2.component;
            var data2 = component2.use('physics').data;

            if (_object2) {
              // If object was not already touching object2, notify object
              if (data.touches.indexOf(id2) === -1) {
                data.touches.push(id2);

                var vel = component.use('physics').getLinearVelocity();
                var vel2 = component2.use('physics').getLinearVelocity();

                temp1Vector3.subVectors(vel, vel2);
                var temp1 = temp1Vector3.clone();

                temp1Vector3.subVectors(vel, vel2);
                var temp2 = temp1Vector3.clone();

                var normal_offset = normal_offsets[data.id + '-' + data2.id];

                if (normal_offset > 0) {
                  temp1Vector3.set(-info[normal_offset], -info[normal_offset + 1], -info[normal_offset + 2]);
                } else {
                  normal_offset *= -1;

                  temp1Vector3.set(info[normal_offset], info[normal_offset + 1], info[normal_offset + 2]);
                }

                component.emit('collision', _object2, temp1, temp2, temp1Vector3);
              }
            }
          }
        } else data.touches.length = 0; // not touching other objects
      }

      this.collisions = collisions;

      if (this.SUPPORT_TRANSFERABLE) this.send(info.buffer, [info.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: 'addConstraint',
    value: function addConstraint(constraint, show_marker) {
      constraint.id = this.getObjectId();
      this.constraints[constraint.id] = constraint;
      constraint.worldModule = this;
      this.execute('addConstraint', constraint.getDefinition());

      if (show_marker) {
        var marker = void 0;

        switch (constraint.type) {
          case 'point':
            marker = new three.Mesh(new three.SphereGeometry(1.5), new three.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this.objects[constraint.objecta].add(marker);
            break;

          case 'hinge':
            marker = new three.Mesh(new three.SphereGeometry(1.5), new three.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this.objects[constraint.objecta].add(marker);
            break;

          case 'slider':
            marker = new three.Mesh(new three.BoxGeometry(10, 1, 1), new three.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);

            // This rotation isn't right if all three axis are non-0 values
            // TODO: change marker's rotation order to ZYX
            marker.rotation.set(constraint.axis.y, // yes, y and
            constraint.axis.x, // x axis are swapped
            constraint.axis.z);
            this.objects[constraint.objecta].add(marker);
            break;

          case 'conetwist':
            marker = new three.Mesh(new three.SphereGeometry(1.5), new three.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this.objects[constraint.objecta].add(marker);
            break;

          case 'dof':
            marker = new three.Mesh(new three.SphereGeometry(1.5), new three.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this.objects[constraint.objecta].add(marker);
            break;
          default:
        }
      }

      return constraint;
    }
  }, {
    key: 'onSimulationResume',
    value: function onSimulationResume() {
      this.execute('onSimulationResume', {});
    }
  }, {
    key: 'removeConstraint',
    value: function removeConstraint(constraint) {
      if (this.constraints[constraint.id] !== undefined) {
        this.execute('removeConstraint', { id: constraint.id });
        delete this.constraints[constraint.id];
      }
    }
  }, {
    key: 'execute',
    value: function execute(cmd, params) {
      this.send({ cmd: cmd, params: params });
    }
  }, {
    key: 'onAddCallback',
    value: function onAddCallback(component) {
      var object = component.native;
      var data = object.component.use('physics').data;

      if (data) {
        component.manager.set('module:world', this);
        data.id = this.getObjectId();
        object.component.use('physics').data = data;

        if (object instanceof Vehicle) {
          this.onAddCallback(object.mesh);
          this.vehicles[data.id] = object;
          this.execute('addVehicle', data);
        } else {
          component.__dirtyPosition = false;
          component.__dirtyRotation = false;
          this.objects[data.id] = object;

          if (object.children.length) {
            data.children = [];
            addObjectChildren(object, object);
          }

          // object.quaternion.setFromEuler(object.rotation);
          //
          // console.log(object.component);
          // console.log(object.rotation);

          // Object starting position + rotation
          data.position = {
            x: object.position.x,
            y: object.position.y,
            z: object.position.z
          };

          data.rotation = {
            x: object.quaternion.x,
            y: object.quaternion.y,
            z: object.quaternion.z,
            w: object.quaternion.w
          };

          if (data.width) data.width *= object.scale.x;
          if (data.height) data.height *= object.scale.y;
          if (data.depth) data.depth *= object.scale.z;

          this.execute('addObject', data);
        }

        component.emit('physics:added');
      }
    }
  }, {
    key: 'onRemoveCallback',
    value: function onRemoveCallback(component) {
      var object = component.native;

      if (object instanceof Vehicle) {
        this.execute('removeVehicle', { id: object._physijs.id });
        while (object.wheels.length) {
          this.remove(object.wheels.pop());
        }this.remove(object.mesh);
        this.vehicles[object._physijs.id] = null;
      } else {
        // Mesh.prototype.remove.call(this, object);

        if (object._physijs) {
          component.manager.remove('module:world');
          this.objects[object._physijs.id] = null;
          this.execute('removeObject', { id: object._physijs.id });
        }
      }
    }
  }, {
    key: 'defer',
    value: function defer(func, args) {
      var _this3 = this;

      return new Promise(function (resolve) {
        if (_this3.isLoaded) {
          func.apply(undefined, toConsumableArray(args));
          resolve();
        } else _this3.loader.then(function () {
          func.apply(undefined, toConsumableArray(args));
          resolve();
        });
      });
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.set('physicsWorker', this.worker);
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      var _this4 = this;

      // ...

      this.setFixedTimeStep = function (fixedTimeStep) {
        if (fixedTimeStep) self.execute('setFixedTimeStep', fixedTimeStep);
      };

      this.setGravity = function (gravity) {
        if (gravity) self.execute('setGravity', gravity);
      };

      this.addConstraint = self.addConstraint.bind(self);

      this.simulate = function (timeStep, maxSubSteps) {
        if (self._stats) self._stats.begin();

        if (self.isSimulating) return false;
        self.isSimulating = true;

        for (var object_id in self.objects) {
          if (!self.objects.hasOwnProperty(object_id)) continue;

          var object = self.objects[object_id];
          var component = object.component;
          var data = component.use('physics').data;

          if (object !== null && (component.__dirtyPosition || component.__dirtyRotation)) {
            var update = { id: data.id };

            if (component.__dirtyPosition) {
              update.pos = {
                x: object.position.x,
                y: object.position.y,
                z: object.position.z
              };

              if (data.isSoftbody) object.position.set(0, 0, 0);

              component.__dirtyPosition = false;
            }

            if (component.__dirtyRotation) {
              update.quat = {
                x: object.quaternion.x,
                y: object.quaternion.y,
                z: object.quaternion.z,
                w: object.quaternion.w
              };

              if (data.isSoftbody) object.rotation.set(0, 0, 0);

              component.__dirtyRotation = false;
            }

            self.execute('updateTransform', update);
          }
        }

        self.execute('simulate', { timeStep: timeStep, maxSubSteps: maxSubSteps });

        if (self._stats) self._stats.end();
        return true;
      };

      // const simulateProcess = (t) => {
      //   window.requestAnimationFrame(simulateProcess);

      //   this.simulate(1/60, 1); // delta, 1
      // }

      // simulateProcess();

      self.loader.then(function () {
        self.simulateLoop = new whs.Loop(function (clock) {
          _this4.simulate(clock.getDelta(), 1); // delta, 1
        });

        self.simulateLoop.start(_this4);

        _this4.setGravity(self.options.gravity);
      });
    }
  }]);
  return WorldModuleBase;
}(Eventable), _class.defaults = {
  fixedTimeStep: 1 / 60,
  rateLimit: true,
  ammo: "",
  softbody: false,
  gravity: new three.Vector3(0, -100, 0)
}, _temp2);

var TARGET = typeof Symbol === 'undefined' ? '__target' : Symbol();
var SCRIPT_TYPE = 'application/javascript';
var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
var URL = window.URL || window.webkitURL;
var Worker = window.Worker;

/**
 * Returns a wrapper around Web Worker code that is constructible.
 *
 * @function shimWorker
 *
 * @param { String }    filename    The name of the file
 * @param { Function }  fn          Function wrapping the code of the worker
 */
function shimWorker(filename, fn) {
    return function ShimWorker(forceFallback) {
        var o = this;

        if (!fn) {
            return new Worker(filename);
        } else if (Worker && !forceFallback) {
            // Convert the function's inner code to a string to construct the worker
            var source = fn.toString().replace(/^function.+?{/, '').slice(0, -1),
                objURL = createSourceObject(source);

            this[TARGET] = new Worker(objURL);
            URL.revokeObjectURL(objURL);
            return this[TARGET];
        } else {
            var selfShim = {
                postMessage: function postMessage(m) {
                    if (o.onmessage) {
                        setTimeout(function () {
                            o.onmessage({ data: m, target: selfShim });
                        });
                    }
                }
            };

            fn.call(selfShim);
            this.postMessage = function (m) {
                setTimeout(function () {
                    selfShim.onmessage({ data: m, target: o });
                });
            };
            this.isThisThread = true;
        }
    };
}

// Test Worker capabilities
if (Worker) {
    var testWorker,
        objURL = createSourceObject('self.onmessage = function () {}'),
        testArray = new Uint8Array(1);

    try {
        // No workers via blobs in Edge 12 and IE 11 and lower :(
        if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) {
            throw new Error('Not available');
        }
        testWorker = new Worker(objURL);

        // Native browser on some Samsung devices throws for transferables, let's detect it
        testWorker.postMessage(testArray, [testArray.buffer]);
    } catch (e) {
        Worker = null;
    } finally {
        URL.revokeObjectURL(objURL);
        if (testWorker) {
            testWorker.terminate();
        }
    }
}

function createSourceObject(str) {
    try {
        return URL.createObjectURL(new Blob([str], { type: SCRIPT_TYPE }));
    } catch (e) {
        var blob = new BlobBuilder();
        blob.append(str);
        return URL.createObjectURL(blob.getBlob(type));
    }
}

var PhysicsWorker = new shimWorker("../worker.js", function (window, document) {
  var self = this;
  function Events(target) {
    var events = {},
        empty = [];
    target = target || this;
    /**
     *  On: listen to events
     */
    target.on = function (type, func, ctx) {
      (events[type] = events[type] || []).push([func, ctx]);
      return target;
    };
    /**
     *  Off: stop listening to event / specific callback
     */
    target.off = function (type, func) {
      type || (events = {});
      var list = events[type] || empty,
          i = list.length = func ? list.length : 0;
      while (i--) {
        func == list[i][0] && list.splice(i, 1);
      }return target;
    };
    /**
     * Emit: send event, callbacks will be triggered
     */
    target.emit = function (type) {
      var e = events[type] || empty,
          list = e.length > 0 ? e.slice(0, e.length) : e,
          i = 0,
          j;
      while (j = list[i++]) {
        j[0].apply(j[1], empty.slice.call(arguments, 1));
      }return target;
    };
  }

  var insideWorker = !self.document;
  if (!insideWorker) self = new Events();

  var send = insideWorker ? self.webkitPostMessage || self.postMessage : function (data) {
    self.emit('message', { data: data });
  };

  self.send = send;

  var SUPPORT_TRANSFERABLE = void 0;

  if (insideWorker) {
    var ab = new ArrayBuffer(1);

    send(ab, [ab]);
    SUPPORT_TRANSFERABLE = ab.byteLength === 0;
  }

  var MESSAGE_TYPES = {
    WORLDREPORT: 0,
    COLLISIONREPORT: 1,
    VEHICLEREPORT: 2,
    CONSTRAINTREPORT: 3,
    SOFTREPORT: 4
  };

  // temp variables
  var _object = void 0,
      _vector = void 0,
      _transform = void 0,
      _transform_pos = void 0,
      _softbody_enabled = false,
      last_simulation_duration = 0,
      _num_objects = 0,
      _num_rigidbody_objects = 0,
      _num_softbody_objects = 0,
      _num_wheels = 0,
      _num_constraints = 0,
      _softbody_report_size = 0,


  // world variables
  fixedTimeStep = void 0,
      // used when calling stepSimulation
  last_simulation_time = void 0,
      world = void 0,
      _vec3_1 = void 0,
      _vec3_2 = void 0,
      _vec3_3 = void 0,
      _quat = void 0;

  // private cache
  var public_functions = {},
      _objects = [],
      _vehicles = [],
      _constraints = [],
      _objects_ammo = {},
      _object_shapes = {},


  // The following objects are to track objects that ammo.js doesn't clean
  // up. All are cleaned up when they're corresponding body is destroyed.
  // Unfortunately, it's very difficult to get at these objects from the
  // body, so we have to track them ourselves.
  _motion_states = {},

  // Don't need to worry about it for cached shapes.
  _noncached_shapes = {},

  // A body with a compound shape always has a regular shape as well, so we
  // have track them separately.
  _compound_shapes = {};

  // object reporting
  var REPORT_CHUNKSIZE = void 0,
      // report array is increased in increments of this chunk size
  worldreport = void 0,
      softreport = void 0,
      collisionreport = void 0,
      vehiclereport = void 0,
      constraintreport = void 0;

  var WORLDREPORT_ITEMSIZE = 14,
      // how many float values each reported item needs
  COLLISIONREPORT_ITEMSIZE = 5,
      // one float for each object id, and a Vec3 contact normal
  VEHICLEREPORT_ITEMSIZE = 9,
      // vehicle id, wheel index, 3 for position, 4 for rotation
  CONSTRAINTREPORT_ITEMSIZE = 6; // constraint id, offset object, offset, applied impulse

  var getShapeFromCache = function getShapeFromCache(cache_key) {
    if (_object_shapes[cache_key] !== undefined) return _object_shapes[cache_key];

    return null;
  };

  var setShapeCache = function setShapeCache(cache_key, shape) {
    _object_shapes[cache_key] = shape;
  };

  var createShape = function createShape(description) {
    var shape = void 0;

    _transform.setIdentity();
    switch (description.type) {
      case 'compound':
        {
          shape = new Ammo.btCompoundShape();

          break;
        }
      case 'plane':
        {
          var cache_key = 'plane_' + description.normal.x + '_' + description.normal.y + '_' + description.normal.z;

          if ((shape = getShapeFromCache(cache_key)) === null) {
            _vec3_1.setX(description.normal.x);
            _vec3_1.setY(description.normal.y);
            _vec3_1.setZ(description.normal.z);
            shape = new Ammo.btStaticPlaneShape(_vec3_1, 0);
            setShapeCache(cache_key, shape);
          }

          break;
        }
      case 'box':
        {
          var _cache_key = 'box_' + description.width + '_' + description.height + '_' + description.depth;

          if ((shape = getShapeFromCache(_cache_key)) === null) {
            _vec3_1.setX(description.width / 2);
            _vec3_1.setY(description.height / 2);
            _vec3_1.setZ(description.depth / 2);
            shape = new Ammo.btBoxShape(_vec3_1);
            setShapeCache(_cache_key, shape);
          }

          break;
        }
      case 'sphere':
        {
          var _cache_key2 = 'sphere_' + description.radius;

          if ((shape = getShapeFromCache(_cache_key2)) === null) {
            shape = new Ammo.btSphereShape(description.radius);
            setShapeCache(_cache_key2, shape);
          }

          break;
        }
      case 'cylinder':
        {
          var _cache_key3 = 'cylinder_' + description.width + '_' + description.height + '_' + description.depth;

          if ((shape = getShapeFromCache(_cache_key3)) === null) {
            _vec3_1.setX(description.width / 2);
            _vec3_1.setY(description.height / 2);
            _vec3_1.setZ(description.depth / 2);
            shape = new Ammo.btCylinderShape(_vec3_1);
            setShapeCache(_cache_key3, shape);
          }

          break;
        }
      case 'capsule':
        {
          var _cache_key4 = 'capsule_' + description.radius + '_' + description.height;

          if ((shape = getShapeFromCache(_cache_key4)) === null) {
            // In Bullet, capsule height excludes the end spheres
            shape = new Ammo.btCapsuleShape(description.radius, description.height - 2 * description.radius);
            setShapeCache(_cache_key4, shape);
          }

          break;
        }
      case 'cone':
        {
          var _cache_key5 = 'cone_' + description.radius + '_' + description.height;

          if ((shape = getShapeFromCache(_cache_key5)) === null) {
            shape = new Ammo.btConeShape(description.radius, description.height);
            setShapeCache(_cache_key5, shape);
          }

          break;
        }
      case 'concave':
        {
          var triangle_mesh = new Ammo.btTriangleMesh();
          if (!description.data.length) return false;
          var data = description.data;

          for (var i = 0; i < data.length / 9; i++) {
            _vec3_1.setX(data[i * 9]);
            _vec3_1.setY(data[i * 9 + 1]);
            _vec3_1.setZ(data[i * 9 + 2]);

            _vec3_2.setX(data[i * 9 + 3]);
            _vec3_2.setY(data[i * 9 + 4]);
            _vec3_2.setZ(data[i * 9 + 5]);

            _vec3_3.setX(data[i * 9 + 6]);
            _vec3_3.setY(data[i * 9 + 7]);
            _vec3_3.setZ(data[i * 9 + 8]);

            triangle_mesh.addTriangle(_vec3_1, _vec3_2, _vec3_3, false);
          }

          shape = new Ammo.btBvhTriangleMeshShape(triangle_mesh, true, true);

          _noncached_shapes[description.id] = shape;

          break;
        }
      case 'convex':
        {
          shape = new Ammo.btConvexHullShape();
          var _data = description.data;

          for (var _i = 0; _i < _data.length / 3; _i++) {
            _vec3_1.setX(_data[_i * 3]);
            _vec3_1.setY(_data[_i * 3 + 1]);
            _vec3_1.setZ(_data[_i * 3 + 2]);

            shape.addPoint(_vec3_1);
          }

          _noncached_shapes[description.id] = shape;

          break;
        }
      case 'heightfield':
        {
          var xpts = description.xpts,
              ypts = description.ypts,
              points = description.points,
              ptr = Ammo._malloc(4 * xpts * ypts);

          for (var _i2 = 0, p = 0, p2 = 0; _i2 < xpts; _i2++) {
            for (var j = 0; j < ypts; j++) {
              Ammo.HEAPF32[ptr + p2 >> 2] = points[p];

              p++;
              p2 += 4;
            }
          }

          shape = new Ammo.btHeightfieldTerrainShape(description.xpts, description.ypts, ptr, 1, -description.absMaxHeight, description.absMaxHeight, 1, 'PHY_FLOAT', false);

          _noncached_shapes[description.id] = shape;
          break;
        }
      default:
        // Not recognized
        return;
    }

    return shape;
  };

  var createSoftBody = function createSoftBody(description) {
    var body = void 0;

    var softBodyHelpers = new Ammo.btSoftBodyHelpers();

    switch (description.type) {
      case 'softTrimesh':
        {
          if (!description.aVertices.length) return false;

          body = softBodyHelpers.CreateFromTriMesh(world.getWorldInfo(), description.aVertices, description.aIndices, description.aIndices.length / 3, false);

          break;
        }
      case 'softClothMesh':
        {
          var cr = description.corners;

          body = softBodyHelpers.CreatePatch(world.getWorldInfo(), new Ammo.btVector3(cr[0], cr[1], cr[2]), new Ammo.btVector3(cr[3], cr[4], cr[5]), new Ammo.btVector3(cr[6], cr[7], cr[8]), new Ammo.btVector3(cr[9], cr[10], cr[11]), description.segments[0], description.segments[1], 0, true);

          break;
        }
      case 'softRopeMesh':
        {
          var data = description.data;

          body = softBodyHelpers.CreateRope(world.getWorldInfo(), new Ammo.btVector3(data[0], data[1], data[2]), new Ammo.btVector3(data[3], data[4], data[5]), data[6] - 1, 0);

          break;
        }
      default:
        // Not recognized
        return;
    }

    return body;
  };

  public_functions.init = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (params.noWorker) {
      window.Ammo = new params.ammo();
      public_functions.makeWorld(params);
      return;
    }

    if (params.wasmBuffer) {
      importScripts(params.ammo);

      self.Ammo = new loadAmmoFromBinary(params.wasmBuffer)();
      send({ cmd: 'ammoLoaded' });
      public_functions.makeWorld(params);
    } else {
      importScripts(params.ammo);
      send({ cmd: 'ammoLoaded' });

      self.Ammo = new Ammo();
      public_functions.makeWorld(params);
    }
  };

  public_functions.makeWorld = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _transform = new Ammo.btTransform();
    _transform_pos = new Ammo.btTransform();
    _vec3_1 = new Ammo.btVector3(0, 0, 0);
    _vec3_2 = new Ammo.btVector3(0, 0, 0);
    _vec3_3 = new Ammo.btVector3(0, 0, 0);
    _quat = new Ammo.btQuaternion(0, 0, 0, 0);

    REPORT_CHUNKSIZE = params.reportsize || 50;

    if (SUPPORT_TRANSFERABLE) {
      // Transferable messages are supported, take advantage of them with TypedArrays
      worldreport = new Float32Array(2 + REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE); // message id + # of objects to report + chunk size * # of values per object
      collisionreport = new Float32Array(2 + REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE); // message id + # of collisions to report + chunk size * # of values per object
      vehiclereport = new Float32Array(2 + REPORT_CHUNKSIZE * VEHICLEREPORT_ITEMSIZE); // message id + # of vehicles to report + chunk size * # of values per object
      constraintreport = new Float32Array(2 + REPORT_CHUNKSIZE * CONSTRAINTREPORT_ITEMSIZE); // message id + # of constraints to report + chunk size * # of values per object
    } else {
      // Transferable messages are not supported, send data as normal arrays
      worldreport = [];
      collisionreport = [];
      vehiclereport = [];
      constraintreport = [];
    }

    worldreport[0] = MESSAGE_TYPES.WORLDREPORT;
    collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;
    vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;
    constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;

    var collisionConfiguration = params.softbody ? new Ammo.btSoftBodyRigidBodyCollisionConfiguration() : new Ammo.btDefaultCollisionConfiguration(),
        dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
        solver = new Ammo.btSequentialImpulseConstraintSolver();

    var broadphase = void 0;

    if (!params.broadphase) params.broadphase = { type: 'dynamic' };
    // TODO!!!
    /* if (params.broadphase.type === 'sweepprune') {
      extend(params.broadphase, {
        aabbmin: {
          x: -50,
          y: -50,
          z: -50
        },
         aabbmax: {
          x: 50,
          y: 50,
          z: 50
        },
      });
    }*/

    switch (params.broadphase.type) {
      case 'sweepprune':
        _vec3_1.setX(params.broadphase.aabbmin.x);
        _vec3_1.setY(params.broadphase.aabbmin.y);
        _vec3_1.setZ(params.broadphase.aabbmin.z);

        _vec3_2.setX(params.broadphase.aabbmax.x);
        _vec3_2.setY(params.broadphase.aabbmax.y);
        _vec3_2.setZ(params.broadphase.aabbmax.z);

        broadphase = new Ammo.btAxisSweep3(_vec3_1, _vec3_2);

        break;
      case 'dynamic':
      default:
        broadphase = new Ammo.btDbvtBroadphase();
        break;
    }

    world = params.softbody ? new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, new Ammo.btDefaultSoftBodySolver()) : new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
    fixedTimeStep = params.fixedTimeStep;

    if (params.softbody) _softbody_enabled = true;

    send({ cmd: 'worldReady' });
  };

  public_functions.setFixedTimeStep = function (description) {
    fixedTimeStep = description;
  };

  public_functions.setGravity = function (description) {
    _vec3_1.setX(description.x);
    _vec3_1.setY(description.y);
    _vec3_1.setZ(description.z);
    world.setGravity(_vec3_1);
  };

  public_functions.appendAnchor = function (description) {
    _objects[description.obj].appendAnchor(description.node, _objects[description.obj2], description.collisionBetweenLinkedBodies, description.influence);
  };

  public_functions.addObject = function (description) {
    var body = void 0,
        motionState = void 0;

    if (description.type.indexOf('soft') !== -1) {
      body = createSoftBody(description);

      var sbConfig = body.get_m_cfg();

      if (description.viterations) sbConfig.set_viterations(description.viterations);
      if (description.piterations) sbConfig.set_piterations(description.piterations);
      if (description.diterations) sbConfig.set_diterations(description.diterations);
      if (description.citerations) sbConfig.set_citerations(description.citerations);
      sbConfig.set_collisions(0x11);
      sbConfig.set_kDF(description.friction);
      sbConfig.set_kDP(description.damping);
      if (description.pressure) sbConfig.set_kPR(description.pressure);
      if (description.drag) sbConfig.set_kDG(description.drag);
      if (description.lift) sbConfig.set_kLF(description.lift);
      if (description.anchorHardness) sbConfig.set_kAHR(description.anchorHardness);
      if (description.rigidHardness) sbConfig.set_kCHR(description.rigidHardness);

      if (description.klst) body.get_m_materials().at(0).set_m_kLST(description.klst);
      if (description.kast) body.get_m_materials().at(0).set_m_kAST(description.kast);
      if (description.kvst) body.get_m_materials().at(0).set_m_kVST(description.kvst);

      Ammo.castObject(body, Ammo.btCollisionObject).getCollisionShape().setMargin(description.margin ? description.margin : 0.1);

      // Ammo.castObject(body, Ammo.btCollisionObject).getCollisionShape().setLocalScaling(_vec3_1);
      body.setActivationState(description.state || 4);
      body.type = 0; // SoftBody.
      if (description.type === 'softRopeMesh') body.rope = true;
      if (description.type === 'softClothMesh') body.cloth = true;

      _transform.setIdentity();

      _vec3_1.setX(description.position.x);
      _vec3_1.setY(description.position.y);
      _vec3_1.setZ(description.position.z);
      _transform.setOrigin(_vec3_1);

      _quat.setX(description.rotation.x);
      _quat.setY(description.rotation.y);
      _quat.setZ(description.rotation.z);
      _quat.setW(description.rotation.w);
      _transform.setRotation(_quat);

      body.transform(_transform);

      _vec3_1.setX(description.scale.x);
      _vec3_1.setY(description.scale.y);
      _vec3_1.setZ(description.scale.z);

      body.scale(_vec3_1);

      body.setTotalMass(description.mass, false);
      world.addSoftBody(body, 1, -1);
      if (description.type === 'softTrimesh') _softbody_report_size += body.get_m_faces().size() * 3;else if (description.type === 'softRopeMesh') _softbody_report_size += body.get_m_nodes().size();else _softbody_report_size += body.get_m_nodes().size() * 3;

      _num_softbody_objects++;
    } else {
      var shape = createShape(description);

      if (!shape) return;

      // If there are children then this is a compound shape
      if (description.children) {
        var compound_shape = new Ammo.btCompoundShape();
        compound_shape.addChildShape(_transform, shape);

        for (var i = 0; i < description.children.length; i++) {
          var _child = description.children[i];

          var trans = new Ammo.btTransform();
          trans.setIdentity();

          _vec3_1.setX(_child.position_offset.x);
          _vec3_1.setY(_child.position_offset.y);
          _vec3_1.setZ(_child.position_offset.z);
          trans.setOrigin(_vec3_1);

          _quat.setX(_child.rotation.x);
          _quat.setY(_child.rotation.y);
          _quat.setZ(_child.rotation.z);
          _quat.setW(_child.rotation.w);
          trans.setRotation(_quat);

          shape = createShape(description.children[i]);
          compound_shape.addChildShape(trans, shape);
          Ammo.destroy(trans);
        }

        shape = compound_shape;
        _compound_shapes[description.id] = shape;
      }

      _vec3_1.setX(description.scale.x);
      _vec3_1.setY(description.scale.y);
      _vec3_1.setZ(description.scale.z);

      shape.setLocalScaling(_vec3_1);
      shape.setMargin(description.margin ? description.margin : 0);

      _vec3_1.setX(0);
      _vec3_1.setY(0);
      _vec3_1.setZ(0);
      shape.calculateLocalInertia(description.mass, _vec3_1);

      _transform.setIdentity();

      _vec3_2.setX(description.position.x);
      _vec3_2.setY(description.position.y);
      _vec3_2.setZ(description.position.z);
      _transform.setOrigin(_vec3_2);

      _quat.setX(description.rotation.x);
      _quat.setY(description.rotation.y);
      _quat.setZ(description.rotation.z);
      _quat.setW(description.rotation.w);
      _transform.setRotation(_quat);

      motionState = new Ammo.btDefaultMotionState(_transform); // #TODO: btDefaultMotionState supports center of mass offset as second argument - implement
      var rbInfo = new Ammo.btRigidBodyConstructionInfo(description.mass, motionState, shape, _vec3_1);

      rbInfo.set_m_friction(description.friction);
      rbInfo.set_m_restitution(description.restitution);
      rbInfo.set_m_linearDamping(description.damping);
      rbInfo.set_m_angularDamping(description.damping);

      body = new Ammo.btRigidBody(rbInfo);
      body.setActivationState(description.state || 4);
      Ammo.destroy(rbInfo);

      if (typeof description.collision_flags !== 'undefined') body.setCollisionFlags(description.collision_flags);

      if (description.group && description.mask) world.addRigidBody(body, description.group, description.mask);else world.addRigidBody(body);
      body.type = 1; // RigidBody.
      _num_rigidbody_objects++;
    }

    body.activate();

    body.id = description.id;
    _objects[body.id] = body;
    _motion_states[body.id] = motionState;

    _objects_ammo[body.a === undefined ? body.ptr : body.a] = body.id;
    _num_objects++;

    send({ cmd: 'objectReady', params: body.id });
  };

  public_functions.addVehicle = function (description) {
    var vehicle_tuning = new Ammo.btVehicleTuning();

    vehicle_tuning.set_m_suspensionStiffness(description.suspension_stiffness);
    vehicle_tuning.set_m_suspensionCompression(description.suspension_compression);
    vehicle_tuning.set_m_suspensionDamping(description.suspension_damping);
    vehicle_tuning.set_m_maxSuspensionTravelCm(description.max_suspension_travel);
    vehicle_tuning.set_m_maxSuspensionForce(description.max_suspension_force);

    var vehicle = new Ammo.btRaycastVehicle(vehicle_tuning, _objects[description.rigidBody], new Ammo.btDefaultVehicleRaycaster(world));

    vehicle.tuning = vehicle_tuning;
    _objects[description.rigidBody].setActivationState(4);
    vehicle.setCoordinateSystem(0, 1, 2);

    world.addVehicle(vehicle);
    _vehicles[description.id] = vehicle;
  };
  public_functions.removeVehicle = function (description) {
    _vehicles[description.id] = null;
  };

  public_functions.addWheel = function (description) {
    if (_vehicles[description.id] !== undefined) {
      var tuning = _vehicles[description.id].tuning;
      if (description.tuning !== undefined) {
        tuning = new Ammo.btVehicleTuning();
        tuning.set_m_suspensionStiffness(description.tuning.suspension_stiffness);
        tuning.set_m_suspensionCompression(description.tuning.suspension_compression);
        tuning.set_m_suspensionDamping(description.tuning.suspension_damping);
        tuning.set_m_maxSuspensionTravelCm(description.tuning.max_suspension_travel);
        tuning.set_m_maxSuspensionForce(description.tuning.max_suspension_force);
      }

      _vec3_1.setX(description.connection_point.x);
      _vec3_1.setY(description.connection_point.y);
      _vec3_1.setZ(description.connection_point.z);

      _vec3_2.setX(description.wheel_direction.x);
      _vec3_2.setY(description.wheel_direction.y);
      _vec3_2.setZ(description.wheel_direction.z);

      _vec3_3.setX(description.wheel_axle.x);
      _vec3_3.setY(description.wheel_axle.y);
      _vec3_3.setZ(description.wheel_axle.z);

      _vehicles[description.id].addWheel(_vec3_1, _vec3_2, _vec3_3, description.suspension_rest_length, description.wheel_radius, tuning, description.is_front_wheel);
    }

    _num_wheels++;

    if (SUPPORT_TRANSFERABLE) {
      vehiclereport = new Float32Array(1 + _num_wheels * VEHICLEREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )
      vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;
    } else vehiclereport = [MESSAGE_TYPES.VEHICLEREPORT];
  };

  public_functions.setSteering = function (details) {
    if (_vehicles[details.id] !== undefined) _vehicles[details.id].setSteeringValue(details.steering, details.wheel);
  };

  public_functions.setBrake = function (details) {
    if (_vehicles[details.id] !== undefined) _vehicles[details.id].setBrake(details.brake, details.wheel);
  };

  public_functions.applyEngineForce = function (details) {
    if (_vehicles[details.id] !== undefined) _vehicles[details.id].applyEngineForce(details.force, details.wheel);
  };

  public_functions.removeObject = function (details) {
    if (_objects[details.id].type === 0) {
      _num_softbody_objects--;
      _softbody_report_size -= _objects[details.id].get_m_nodes().size();
      world.removeSoftBody(_objects[details.id]);
    } else if (_objects[details.id].type === 1) {
      _num_rigidbody_objects--;
      world.removeRigidBody(_objects[details.id]);
      Ammo.destroy(_motion_states[details.id]);
    }

    Ammo.destroy(_objects[details.id]);
    if (_compound_shapes[details.id]) Ammo.destroy(_compound_shapes[details.id]);
    if (_noncached_shapes[details.id]) Ammo.destroy(_noncached_shapes[details.id]);

    _objects_ammo[_objects[details.id].a === undefined ? _objects[details.id].a : _objects[details.id].ptr] = null;
    _objects[details.id] = null;
    _motion_states[details.id] = null;

    if (_compound_shapes[details.id]) _compound_shapes[details.id] = null;
    if (_noncached_shapes[details.id]) _noncached_shapes[details.id] = null;
    _num_objects--;
  };

  public_functions.updateTransform = function (details) {
    _object = _objects[details.id];

    if (_object.type === 1) {
      _object.getMotionState().getWorldTransform(_transform);

      if (details.pos) {
        _vec3_1.setX(details.pos.x);
        _vec3_1.setY(details.pos.y);
        _vec3_1.setZ(details.pos.z);
        _transform.setOrigin(_vec3_1);
      }

      if (details.quat) {
        _quat.setX(details.quat.x);
        _quat.setY(details.quat.y);
        _quat.setZ(details.quat.z);
        _quat.setW(details.quat.w);
        _transform.setRotation(_quat);
      }

      _object.setWorldTransform(_transform);
      _object.activate();
    } else if (_object.type === 0) {
      // _object.getWorldTransform(_transform);

      if (details.pos) {
        _vec3_1.setX(details.pos.x);
        _vec3_1.setY(details.pos.y);
        _vec3_1.setZ(details.pos.z);
        _transform.setOrigin(_vec3_1);
      }

      if (details.quat) {
        _quat.setX(details.quat.x);
        _quat.setY(details.quat.y);
        _quat.setZ(details.quat.z);
        _quat.setW(details.quat.w);
        _transform.setRotation(_quat);
      }

      _object.transform(_transform);
    }
  };

  public_functions.updateMass = function (details) {
    // #TODO: changing a static object into dynamic is buggy
    _object = _objects[details.id];

    // Per http://www.bulletphysics.org/Bullet/phpBB3/viewtopic.php?p=&f=9&t=3663#p13816
    world.removeRigidBody(_object);

    _vec3_1.setX(0);
    _vec3_1.setY(0);
    _vec3_1.setZ(0);

    _object.setMassProps(details.mass, _vec3_1);
    world.addRigidBody(_object);
    _object.activate();
  };

  public_functions.applyCentralImpulse = function (details) {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].applyCentralImpulse(_vec3_1);
    _objects[details.id].activate();
  };

  public_functions.applyImpulse = function (details) {
    _vec3_1.setX(details.impulse_x);
    _vec3_1.setY(details.impulse_y);
    _vec3_1.setZ(details.impulse_z);

    _vec3_2.setX(details.x);
    _vec3_2.setY(details.y);
    _vec3_2.setZ(details.z);

    _objects[details.id].applyImpulse(_vec3_1, _vec3_2);
    _objects[details.id].activate();
  };

  public_functions.applyTorque = function (details) {
    _vec3_1.setX(details.torque_x);
    _vec3_1.setY(details.torque_y);
    _vec3_1.setZ(details.torque_z);

    _objects[details.id].applyTorque(_vec3_1);
    _objects[details.id].activate();
  };

  public_functions.applyCentralForce = function (details) {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].applyCentralForce(_vec3_1);
    _objects[details.id].activate();
  };

  public_functions.applyForce = function (details) {
    _vec3_1.setX(details.force_x);
    _vec3_1.setY(details.force_y);
    _vec3_1.setZ(details.force_z);

    _vec3_2.setX(details.x);
    _vec3_2.setY(details.y);
    _vec3_2.setZ(details.z);

    _objects[details.id].applyForce(_vec3_1, _vec3_2);
    _objects[details.id].activate();
  };

  public_functions.onSimulationResume = function () {
    
  };

  public_functions.setAngularVelocity = function (details) {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setAngularVelocity(_vec3_1);
    _objects[details.id].activate();
  };

  public_functions.setLinearVelocity = function (details) {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setLinearVelocity(_vec3_1);
    _objects[details.id].activate();
  };

  public_functions.setAngularFactor = function (details) {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setAngularFactor(_vec3_1);
  };

  public_functions.setLinearFactor = function (details) {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setLinearFactor(_vec3_1);
  };

  public_functions.setDamping = function (details) {
    _objects[details.id].setDamping(details.linear, details.angular);
  };

  public_functions.setCcdMotionThreshold = function (details) {
    _objects[details.id].setCcdMotionThreshold(details.threshold);
  };

  public_functions.setCcdSweptSphereRadius = function (details) {
    _objects[details.id].setCcdSweptSphereRadius(details.radius);
  };

  public_functions.addConstraint = function (details) {
    var constraint = void 0;

    switch (details.type) {

      case 'point':
        {
          if (details.objectb === undefined) {
            _vec3_1.setX(details.positiona.x);
            _vec3_1.setY(details.positiona.y);
            _vec3_1.setZ(details.positiona.z);

            constraint = new Ammo.btPoint2PointConstraint(_objects[details.objecta], _vec3_1);
          } else {
            _vec3_1.setX(details.positiona.x);
            _vec3_1.setY(details.positiona.y);
            _vec3_1.setZ(details.positiona.z);

            _vec3_2.setX(details.positionb.x);
            _vec3_2.setY(details.positionb.y);
            _vec3_2.setZ(details.positionb.z);

            constraint = new Ammo.btPoint2PointConstraint(_objects[details.objecta], _objects[details.objectb], _vec3_1, _vec3_2);
          }
          break;
        }
      case 'hinge':
        {
          if (details.objectb === undefined) {
            _vec3_1.setX(details.positiona.x);
            _vec3_1.setY(details.positiona.y);
            _vec3_1.setZ(details.positiona.z);

            _vec3_2.setX(details.axis.x);
            _vec3_2.setY(details.axis.y);
            _vec3_2.setZ(details.axis.z);

            constraint = new Ammo.btHingeConstraint(_objects[details.objecta], _vec3_1, _vec3_2);
          } else {
            _vec3_1.setX(details.positiona.x);
            _vec3_1.setY(details.positiona.y);
            _vec3_1.setZ(details.positiona.z);

            _vec3_2.setX(details.positionb.x);
            _vec3_2.setY(details.positionb.y);
            _vec3_2.setZ(details.positionb.z);

            _vec3_3.setX(details.axis.x);
            _vec3_3.setY(details.axis.y);
            _vec3_3.setZ(details.axis.z);

            constraint = new Ammo.btHingeConstraint(_objects[details.objecta], _objects[details.objectb], _vec3_1, _vec3_2, _vec3_3, _vec3_3);
          }
          break;
        }
      case 'slider':
        {
          var transformb = void 0;
          var transforma = new Ammo.btTransform();

          _vec3_1.setX(details.positiona.x);
          _vec3_1.setY(details.positiona.y);
          _vec3_1.setZ(details.positiona.z);

          transforma.setOrigin(_vec3_1);

          var rotation = transforma.getRotation();
          rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);
          transforma.setRotation(rotation);

          if (details.objectb) {
            transformb = new Ammo.btTransform();

            _vec3_2.setX(details.positionb.x);
            _vec3_2.setY(details.positionb.y);
            _vec3_2.setZ(details.positionb.z);

            transformb.setOrigin(_vec3_2);

            rotation = transformb.getRotation();
            rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);
            transformb.setRotation(rotation);

            constraint = new Ammo.btSliderConstraint(_objects[details.objecta], _objects[details.objectb], transforma, transformb, true);
          } else {
            constraint = new Ammo.btSliderConstraint(_objects[details.objecta], transforma, true);
          }

          constraint.ta = transforma;
          constraint.tb = transformb;

          Ammo.destroy(transforma);
          if (transformb !== undefined) Ammo.destroy(transformb);

          break;
        }
      case 'conetwist':
        {
          var _transforma = new Ammo.btTransform();
          _transforma.setIdentity();

          var _transformb = new Ammo.btTransform();
          _transformb.setIdentity();

          _vec3_1.setX(details.positiona.x);
          _vec3_1.setY(details.positiona.y);
          _vec3_1.setZ(details.positiona.z);

          _vec3_2.setX(details.positionb.x);
          _vec3_2.setY(details.positionb.y);
          _vec3_2.setZ(details.positionb.z);

          _transforma.setOrigin(_vec3_1);
          _transformb.setOrigin(_vec3_2);

          var _rotation = _transforma.getRotation();
          _rotation.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);
          _transforma.setRotation(_rotation);

          _rotation = _transformb.getRotation();
          _rotation.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);
          _transformb.setRotation(_rotation);

          constraint = new Ammo.btConeTwistConstraint(_objects[details.objecta], _objects[details.objectb], _transforma, _transformb);

          constraint.setLimit(Math.PI, 0, Math.PI);

          constraint.ta = _transforma;
          constraint.tb = _transformb;

          Ammo.destroy(_transforma);
          Ammo.destroy(_transformb);

          break;
        }
      case 'dof':
        {
          var _transformb2 = void 0;

          var _transforma2 = new Ammo.btTransform();
          _transforma2.setIdentity();

          _vec3_1.setX(details.positiona.x);
          _vec3_1.setY(details.positiona.y);
          _vec3_1.setZ(details.positiona.z);

          _transforma2.setOrigin(_vec3_1);

          var _rotation2 = _transforma2.getRotation();
          _rotation2.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);
          _transforma2.setRotation(_rotation2);

          if (details.objectb) {
            _transformb2 = new Ammo.btTransform();
            _transformb2.setIdentity();

            _vec3_2.setX(details.positionb.x);
            _vec3_2.setY(details.positionb.y);
            _vec3_2.setZ(details.positionb.z);

            _transformb2.setOrigin(_vec3_2);

            _rotation2 = _transformb2.getRotation();
            _rotation2.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);
            _transformb2.setRotation(_rotation2);

            constraint = new Ammo.btGeneric6DofConstraint(_objects[details.objecta], _objects[details.objectb], _transforma2, _transformb2, true);
          } else {
            constraint = new Ammo.btGeneric6DofConstraint(_objects[details.objecta], _transforma2, true);
          }

          constraint.ta = _transforma2;
          constraint.tb = _transformb2;

          Ammo.destroy(_transforma2);
          if (_transformb2 !== undefined) Ammo.destroy(_transformb2);

          break;
        }
      default:
        return;
    }

    world.addConstraint(constraint);

    constraint.a = _objects[details.objecta];
    constraint.b = _objects[details.objectb];

    constraint.enableFeedback();
    _constraints[details.id] = constraint;
    _num_constraints++;

    if (SUPPORT_TRANSFERABLE) {
      constraintreport = new Float32Array(1 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )
      constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;
    } else constraintreport = [MESSAGE_TYPES.CONSTRAINTREPORT];
  };

  public_functions.removeConstraint = function (details) {
    var constraint = _constraints[details.id];

    if (constraint !== undefined) {
      world.removeConstraint(constraint);
      _constraints[details.id] = null;
      _num_constraints--;
    }
  };

  public_functions.constraint_setBreakingImpulseThreshold = function (details) {
    var constraint = _constraints[details.id];
    if (constraint !== undefind) constraint.setBreakingImpulseThreshold(details.threshold);
  };

  public_functions.simulate = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (world) {
      if (params.timeStep && params.timeStep < fixedTimeStep) params.timeStep = fixedTimeStep;

      params.maxSubSteps = params.maxSubSteps || Math.ceil(params.timeStep / fixedTimeStep); // If maxSubSteps is not defined, keep the simulation fully up to date

      world.stepSimulation(params.timeStep, params.maxSubSteps, fixedTimeStep);

      if (_vehicles.length > 0) reportVehicles();
      reportCollisions();
      if (_constraints.length > 0) reportConstraints();
      reportWorld();
      if (_softbody_enabled) reportWorld_softbodies();
    }
  };

  // Constraint functions
  public_functions.hinge_setLimits = function (params) {
    _constraints[params.constraint].setLimit(params.low, params.high, 0, params.bias_factor, params.relaxation_factor);
  };

  public_functions.hinge_enableAngularMotor = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.enableAngularMotor(true, params.velocity, params.acceleration);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.hinge_disableMotor = function (params) {
    _constraints[params.constraint].enableMotor(false);
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_setLimits = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.setLowerLinLimit(params.lin_lower || 0);
    constraint.setUpperLinLimit(params.lin_upper || 0);

    constraint.setLowerAngLimit(params.ang_lower || 0);
    constraint.setUpperAngLimit(params.ang_upper || 0);
  };

  public_functions.slider_setRestitution = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.setSoftnessLimLin(params.linear || 0);
    constraint.setSoftnessLimAng(params.angular || 0);
  };

  public_functions.slider_enableLinearMotor = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.setTargetLinMotorVelocity(params.velocity);
    constraint.setMaxLinMotorForce(params.acceleration);
    constraint.setPoweredLinMotor(true);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_disableLinearMotor = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.setPoweredLinMotor(false);
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_enableAngularMotor = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.setTargetAngMotorVelocity(params.velocity);
    constraint.setMaxAngMotorForce(params.acceleration);
    constraint.setPoweredAngMotor(true);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_disableAngularMotor = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.setPoweredAngMotor(false);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.conetwist_setLimit = function (params) {
    _constraints[params.constraint].setLimit(params.z, params.y, params.x); // ZYX order
  };

  public_functions.conetwist_enableMotor = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.enableMotor(true);
    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.conetwist_setMaxMotorImpulse = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.setMaxMotorImpulse(params.max_impulse);
    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.conetwist_setMotorTarget = function (params) {
    var constraint = _constraints[params.constraint];

    _quat.setX(params.x);
    _quat.setY(params.y);
    _quat.setZ(params.z);
    _quat.setW(params.w);

    constraint.setMotorTarget(_quat);

    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.conetwist_disableMotor = function (params) {
    var constraint = _constraints[params.constraint];
    constraint.enableMotor(false);
    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.dof_setLinearLowerLimit = function (params) {
    var constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setLinearLowerLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_setLinearUpperLimit = function (params) {
    var constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setLinearUpperLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_setAngularLowerLimit = function (params) {
    var constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setAngularLowerLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_setAngularUpperLimit = function (params) {
    var constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setAngularUpperLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_enableAngularMotor = function (params) {
    var constraint = _constraints[params.constraint];

    var motor = constraint.getRotationalLimitMotor(params.which);
    motor.set_m_enableMotor(true);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_configureAngularMotor = function (params) {
    var constraint = _constraints[params.constraint],
        motor = constraint.getRotationalLimitMotor(params.which);

    motor.set_m_loLimit(params.low_angle);
    motor.set_m_hiLimit(params.high_angle);
    motor.set_m_targetVelocity(params.velocity);
    motor.set_m_maxMotorForce(params.max_force);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_disableAngularMotor = function (params) {
    var constraint = _constraints[params.constraint],
        motor = constraint.getRotationalLimitMotor(params.which);

    motor.set_m_enableMotor(false);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  var reportWorld = function reportWorld() {
    if (SUPPORT_TRANSFERABLE && worldreport.length < 2 + _num_rigidbody_objects * WORLDREPORT_ITEMSIZE) {
      worldreport = new Float32Array(2 // message id & # objects in report
      + Math.ceil(_num_rigidbody_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE // # of values needed * item size
      );

      worldreport[0] = MESSAGE_TYPES.WORLDREPORT;
    }

    worldreport[1] = _num_rigidbody_objects; // record how many objects we're reporting on

    {
      var i = 0,
          index = _objects.length;

      while (index--) {
        var object = _objects[index];

        if (object && object.type === 1) {
          // RigidBodies.
          // #TODO: we can't use center of mass transform when center of mass can change,
          //        but getMotionState().getWorldTransform() screws up on objects that have been moved
          // object.getMotionState().getWorldTransform( transform );
          // object.getMotionState().getWorldTransform(_transform);

          var transform = object.getCenterOfMassTransform();
          var origin = transform.getOrigin();
          var rotation = transform.getRotation();

          // add values to report
          var offset = 2 + i++ * WORLDREPORT_ITEMSIZE;

          worldreport[offset] = object.id;

          worldreport[offset + 1] = origin.x();
          worldreport[offset + 2] = origin.y();
          worldreport[offset + 3] = origin.z();

          worldreport[offset + 4] = rotation.x();
          worldreport[offset + 5] = rotation.y();
          worldreport[offset + 6] = rotation.z();
          worldreport[offset + 7] = rotation.w();

          _vector = object.getLinearVelocity();
          worldreport[offset + 8] = _vector.x();
          worldreport[offset + 9] = _vector.y();
          worldreport[offset + 10] = _vector.z();

          _vector = object.getAngularVelocity();
          worldreport[offset + 11] = _vector.x();
          worldreport[offset + 12] = _vector.y();
          worldreport[offset + 13] = _vector.z();
        }
      }
    }

    if (SUPPORT_TRANSFERABLE) send(worldreport.buffer, [worldreport.buffer]);else send(worldreport);
  };

  var reportWorld_softbodies = function reportWorld_softbodies() {
    // TODO: Add SUPPORTTRANSFERABLE.

    softreport = new Float32Array(2 // message id & # objects in report
    + _num_softbody_objects * 2 + _softbody_report_size * 6);

    softreport[0] = MESSAGE_TYPES.SOFTREPORT;
    softreport[1] = _num_softbody_objects; // record how many objects we're reporting on

    {
      var offset = 2,
          index = _objects.length;

      while (index--) {
        var object = _objects[index];

        if (object && object.type === 0) {
          // SoftBodies.

          softreport[offset] = object.id;

          var offsetVert = offset + 2;

          if (object.rope === true) {
            var nodes = object.get_m_nodes();
            var size = nodes.size();
            softreport[offset + 1] = size;

            for (var i = 0; i < size; i++) {
              var node = nodes.at(i);
              var vert = node.get_m_x();
              var off = offsetVert + i * 3;

              softreport[off] = vert.x();
              softreport[off + 1] = vert.y();
              softreport[off + 2] = vert.z();
            }

            offset += size * 3 + 2;
          } else if (object.cloth) {
            var _nodes = object.get_m_nodes();
            var _size = _nodes.size();
            softreport[offset + 1] = _size;

            for (var _i3 = 0; _i3 < _size; _i3++) {
              var _node = _nodes.at(_i3);
              var _vert = _node.get_m_x();
              var normal = _node.get_m_n();
              var _off = offsetVert + _i3 * 6;

              softreport[_off] = _vert.x();
              softreport[_off + 1] = _vert.y();
              softreport[_off + 2] = _vert.z();

              softreport[_off + 3] = normal.x();
              softreport[_off + 4] = normal.y();
              softreport[_off + 5] = normal.z();
            }

            offset += _size * 6 + 2;
          } else {
            var faces = object.get_m_faces();
            var _size2 = faces.size();
            softreport[offset + 1] = _size2;

            for (var _i4 = 0; _i4 < _size2; _i4++) {
              var face = faces.at(_i4);

              var node1 = face.get_m_n(0);
              var node2 = face.get_m_n(1);
              var node3 = face.get_m_n(2);

              var vert1 = node1.get_m_x();
              var vert2 = node2.get_m_x();
              var vert3 = node3.get_m_x();

              var normal1 = node1.get_m_n();
              var normal2 = node2.get_m_n();
              var normal3 = node3.get_m_n();

              var _off2 = offsetVert + _i4 * 18;

              softreport[_off2] = vert1.x();
              softreport[_off2 + 1] = vert1.y();
              softreport[_off2 + 2] = vert1.z();

              softreport[_off2 + 3] = normal1.x();
              softreport[_off2 + 4] = normal1.y();
              softreport[_off2 + 5] = normal1.z();

              softreport[_off2 + 6] = vert2.x();
              softreport[_off2 + 7] = vert2.y();
              softreport[_off2 + 8] = vert2.z();

              softreport[_off2 + 9] = normal2.x();
              softreport[_off2 + 10] = normal2.y();
              softreport[_off2 + 11] = normal2.z();

              softreport[_off2 + 12] = vert3.x();
              softreport[_off2 + 13] = vert3.y();
              softreport[_off2 + 14] = vert3.z();

              softreport[_off2 + 15] = normal3.x();
              softreport[_off2 + 16] = normal3.y();
              softreport[_off2 + 17] = normal3.z();
            }

            offset += _size2 * 18 + 2;
          }
        }
      }
    }

    // if (SUPPORT_TRANSFERABLE) send(softreport.buffer, [softreport.buffer]);
    // else send(softreport);
    send(softreport);
  };

  var reportCollisions = function reportCollisions() {
    var dp = world.getDispatcher(),
        num = dp.getNumManifolds();
    // _collided = false;

    if (SUPPORT_TRANSFERABLE) {
      if (collisionreport.length < 2 + num * COLLISIONREPORT_ITEMSIZE) {
        collisionreport = new Float32Array(2 // message id & # objects in report
        + Math.ceil(_num_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE // # of values needed * item size
        );
        collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;
      }
    }

    collisionreport[1] = 0; // how many collisions we're reporting on

    for (var i = 0; i < num; i++) {
      var manifold = dp.getManifoldByIndexInternal(i),
          num_contacts = manifold.getNumContacts();

      if (num_contacts === 0) continue;

      for (var j = 0; j < num_contacts; j++) {
        var pt = manifold.getContactPoint(j);

        // if ( pt.getDistance() < 0 ) {
        var offset = 2 + collisionreport[1]++ * COLLISIONREPORT_ITEMSIZE;
        collisionreport[offset] = _objects_ammo[manifold.getBody0().ptr];
        collisionreport[offset + 1] = _objects_ammo[manifold.getBody1().ptr];

        _vector = pt.get_m_normalWorldOnB();
        collisionreport[offset + 2] = _vector.x();
        collisionreport[offset + 3] = _vector.y();
        collisionreport[offset + 4] = _vector.z();
        break;
        // }
        // send(_objects_ammo);
      }
    }

    if (SUPPORT_TRANSFERABLE) send(collisionreport.buffer, [collisionreport.buffer]);else send(collisionreport);
  };

  var reportVehicles = function reportVehicles() {
    if (SUPPORT_TRANSFERABLE) {
      if (vehiclereport.length < 2 + _num_wheels * VEHICLEREPORT_ITEMSIZE) {
        vehiclereport = new Float32Array(2 // message id & # objects in report
        + Math.ceil(_num_wheels / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * VEHICLEREPORT_ITEMSIZE // # of values needed * item size
        );
        vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;
      }
    }

    {
      var i = 0,
          j = 0,
          index = _vehicles.length;

      while (index--) {
        if (_vehicles[index]) {
          var vehicle = _vehicles[index];

          for (j = 0; j < vehicle.getNumWheels(); j++) {
            // vehicle.updateWheelTransform( j, true );
            // transform = vehicle.getWheelTransformWS( j );
            var transform = vehicle.getWheelInfo(j).get_m_worldTransform();

            var origin = transform.getOrigin();
            var rotation = transform.getRotation();

            // add values to report
            var offset = 1 + i++ * VEHICLEREPORT_ITEMSIZE;

            vehiclereport[offset] = index;
            vehiclereport[offset + 1] = j;

            vehiclereport[offset + 2] = origin.x();
            vehiclereport[offset + 3] = origin.y();
            vehiclereport[offset + 4] = origin.z();

            vehiclereport[offset + 5] = rotation.x();
            vehiclereport[offset + 6] = rotation.y();
            vehiclereport[offset + 7] = rotation.z();
            vehiclereport[offset + 8] = rotation.w();
          }
        }
      }

      if (SUPPORT_TRANSFERABLE && j !== 0) send(vehiclereport.buffer, [vehiclereport.buffer]);else if (j !== 0) send(vehiclereport);
    }
  };

  var reportConstraints = function reportConstraints() {
    if (SUPPORT_TRANSFERABLE) {
      if (constraintreport.length < 2 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE) {
        constraintreport = new Float32Array(2 // message id & # objects in report
        + Math.ceil(_num_constraints / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * CONSTRAINTREPORT_ITEMSIZE // # of values needed * item size
        );
        constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;
      }
    }

    {
      var offset = 0,
          i = 0,
          index = _constraints.lenght;

      while (index--) {
        if (_constraints[index]) {
          var _constraint = _constraints[index];
          var offset_body = _constraint.a;
          var transform = _constraint.ta;
          var origin = transform.getOrigin();

          // add values to report
          offset = 1 + i++ * CONSTRAINTREPORT_ITEMSIZE;

          constraintreport[offset] = index;
          constraintreport[offset + 1] = offset_body.id;
          constraintreport[offset + 2] = origin.x;
          constraintreport[offset + 3] = origin.y;
          constraintreport[offset + 4] = origin.z;
          constraintreport[offset + 5] = _constraint.getBreakingImpulseThreshold();
        }
      }

      if (SUPPORT_TRANSFERABLE && i !== 0) send(constraintreport.buffer, [constraintreport.buffer]);else if (i !== 0) send(constraintreport);
    }
  };

  self.onmessage = function (event) {
    if (event.data instanceof Float32Array) {
      // transferable object
      switch (event.data[0]) {
        case MESSAGE_TYPES.WORLDREPORT:
          {
            worldreport = new Float32Array(event.data);
            break;
          }
        case MESSAGE_TYPES.COLLISIONREPORT:
          {
            collisionreport = new Float32Array(event.data);
            break;
          }
        case MESSAGE_TYPES.VEHICLEREPORT:
          {
            vehiclereport = new Float32Array(event.data);
            break;
          }
        case MESSAGE_TYPES.CONSTRAINTREPORT:
          {
            constraintreport = new Float32Array(event.data);
            break;
          }
        default:
      }

      return;
    } else if (event.data.cmd && public_functions[event.data.cmd]) public_functions[event.data.cmd](event.data.params);
  };

  self.receive = self.onmessage;
});

var WorldModule = function (_WorldModuleBase) {
  inherits(WorldModule, _WorldModuleBase);

  function WorldModule() {
    var _ref;

    classCallCheck(this, WorldModule);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = WorldModule.__proto__ || Object.getPrototypeOf(WorldModule)).call.apply(_ref, [this].concat(args)));

    _this.worker = new PhysicsWorker();
    _this.worker.transferableMessage = _this.worker.webkitPostMessage || _this.worker.postMessage;

    _this.isLoaded = false;

    var options = _this.options;

    _this.loader = new Promise(function (resolve, reject) {
      // if (options.wasm) {
      //   fetch(options.wasm)
      //     .then(response => response.arrayBuffer())
      //     .then(buffer => {
      //       options.wasmBuffer = buffer;
      //
      //       this.execute('init', options);
      //       resolve();
      //     });
      // } else {
      _this.execute('init', options);
      resolve();
      // }
    });

    _this.loader.then(function () {
      _this.isLoaded = true;
    });

    // Test SUPPORT_TRANSFERABLE

    var ab = new ArrayBuffer(1);
    _this.worker.transferableMessage(ab, [ab]);
    _this.SUPPORT_TRANSFERABLE = ab.byteLength === 0;

    _this.setup();
    return _this;
  }

  createClass(WorldModule, [{
    key: 'send',
    value: function send() {
      var _worker;

      (_worker = this.worker).transferableMessage.apply(_worker, arguments);
    }
  }, {
    key: 'receive',
    value: function receive(callback) {
      this.worker.addEventListener('message', callback);
    }
  }]);
  return WorldModule;
}(WorldModuleBase);

var _class$1;
var _temp;

var properties = {
  position: {
    get: function get$$1() {
      return this._native.position;
    },
    set: function set$$1(vector3) {
      var pos = this._native.position;
      var scope = this;

      Object.defineProperties(pos, {
        x: {
          get: function get$$1() {
            return this._x;
          },
          set: function set$$1(x) {
            scope.__dirtyPosition = true;
            this._x = x;
          }
        },
        y: {
          get: function get$$1() {
            return this._y;
          },
          set: function set$$1(y) {
            scope.__dirtyPosition = true;
            this._y = y;
          }
        },
        z: {
          get: function get$$1() {
            return this._z;
          },
          set: function set$$1(z) {
            scope.__dirtyPosition = true;
            this._z = z;
          }
        }
      });

      scope.__dirtyPosition = true;

      pos.copy(vector3);
    }
  },

  quaternion: {
    get: function get$$1() {
      this.__c_rot = true;
      return this.native.quaternion;
    },
    set: function set$$1(quaternion) {
      var _this = this;

      var quat = this._native.quaternion,
          native = this._native;

      quat.copy(quaternion);

      quat.onChange(function () {
        if (_this.__c_rot) {
          if (native.__dirtyRotation === true) {
            _this.__c_rot = false;
            native.__dirtyRotation = false;
          }
          native.__dirtyRotation = true;
        }
      });
    }
  },

  rotation: {
    get: function get$$1() {
      this.__c_rot = true;
      return this._native.rotation;
    },
    set: function set$$1(euler) {
      var _this2 = this;

      var rot = this._native.rotation,
          native = this._native;

      this.quaternion.copy(new three.Quaternion().setFromEuler(euler));

      rot.onChange(function () {
        if (_this2.__c_rot) {
          _this2.quaternion.copy(new three.Quaternion().setFromEuler(rot));
          native.__dirtyRotation = true;
        }
      });
    }
  }
};

function wrapPhysicsPrototype(scope) {
  for (var key in properties) {
    Object.defineProperty(scope, key, {
      get: properties[key].get.bind(scope),
      set: properties[key].set.bind(scope),
      configurable: true,
      enumerable: true
    });
  }
}

function onCopy(source) {
  wrapPhysicsPrototype(this);

  var physics = this.use('physics');
  var sourcePhysics = source.use('physics');

  this.manager.modules.physics = physics.clone(this.manager);

  physics.data = _extends({}, sourcePhysics.data);
  physics.data.isSoftBodyReset = false;
  if (physics.data.isSoftbody) physics.data.isSoftBodyReset = false;

  this.position = this.position.clone();
  this.rotation = this.rotation.clone();
  this.quaternion = this.quaternion.clone();

  return source;
}

function onWrap() {
  this.position = this.position.clone();
  this.rotation = this.rotation.clone();
  this.quaternion = this.quaternion.clone();
}

var API = function () {
  function API() {
    classCallCheck(this, API);
  }

  createClass(API, [{
    key: 'applyCentralImpulse',
    value: function applyCentralImpulse(force) {
      this.execute('applyCentralImpulse', { id: this.data.id, x: force.x, y: force.y, z: force.z });
    }
  }, {
    key: 'applyImpulse',
    value: function applyImpulse(force, offset) {
      this.execute('applyImpulse', {
        id: this.data.id,
        impulse_x: force.x,
        impulse_y: force.y,
        impulse_z: force.z,
        x: offset.x,
        y: offset.y,
        z: offset.z
      });
    }
  }, {
    key: 'applyTorque',
    value: function applyTorque(force) {
      this.execute('applyTorque', {
        id: this.data.id,
        torque_x: force.x,
        torque_y: force.y,
        torque_z: force.z
      });
    }
  }, {
    key: 'applyCentralForce',
    value: function applyCentralForce(force) {
      this.execute('applyCentralForce', {
        id: this.data.id,
        x: force.x,
        y: force.y,
        z: force.z
      });
    }
  }, {
    key: 'applyForce',
    value: function applyForce(force, offset) {
      this.execute('applyForce', {
        id: this.data.id,
        force_x: force.x,
        force_y: force.y,
        force_z: force.z,
        x: offset.x,
        y: offset.y,
        z: offset.z
      });
    }
  }, {
    key: 'getAngularVelocity',
    value: function getAngularVelocity() {
      return this.data.angularVelocity;
    }
  }, {
    key: 'setAngularVelocity',
    value: function setAngularVelocity(velocity) {
      this.execute('setAngularVelocity', { id: this.data.id, x: velocity.x, y: velocity.y, z: velocity.z });
    }
  }, {
    key: 'getLinearVelocity',
    value: function getLinearVelocity() {
      return this.data.linearVelocity;
    }
  }, {
    key: 'setLinearVelocity',
    value: function setLinearVelocity(velocity) {
      this.execute('setLinearVelocity', { id: this.data.id, x: velocity.x, y: velocity.y, z: velocity.z });
    }
  }, {
    key: 'setAngularFactor',
    value: function setAngularFactor(factor) {
      this.execute('setAngularFactor', { id: this.data.id, x: factor.x, y: factor.y, z: factor.z });
    }
  }, {
    key: 'setLinearFactor',
    value: function setLinearFactor(factor) {
      this.execute('setLinearFactor', { id: this.data.id, x: factor.x, y: factor.y, z: factor.z });
    }
  }, {
    key: 'setDamping',
    value: function setDamping(linear, angular) {
      this.execute('setDamping', { id: this.data.id, linear: linear, angular: angular });
    }
  }, {
    key: 'setCcdMotionThreshold',
    value: function setCcdMotionThreshold(threshold) {
      this.execute('setCcdMotionThreshold', { id: this.data.id, threshold: threshold });
    }
  }, {
    key: 'setCcdSweptSphereRadius',
    value: function setCcdSweptSphereRadius(radius) {
      this.execute('setCcdSweptSphereRadius', { id: this.data.id, radius: radius });
    }
  }]);
  return API;
}();

var _default = (_temp = _class$1 = function (_API) {
  inherits(_default, _API);

  function _default(defaults$$1, data) {
    classCallCheck(this, _default);

    var _this3 = possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this3.bridge = {
      onCopy: onCopy,
      onWrap: onWrap
    };

    _this3.data = Object.assign(defaults$$1, data);
    return _this3;
  }

  createClass(_default, [{
    key: 'integrate',
    value: function integrate(self) {
      wrapPhysicsPrototype(this);
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('physics');

      this.execute = function () {
        var _manager$get;

        return _manager.has('module:world') ? (_manager$get = _manager.get('module:world')).execute.apply(_manager$get, arguments) : function () {};
      };
    }
  }, {
    key: 'updateData',
    value: function updateData(callback) {
      this.bridge.geometry = function (geometry, module) {
        if (!callback) return geometry;

        var result = callback(geometry, module);
        return result ? result : geometry;
      };
    }
  }, {
    key: 'clone',
    value: function clone(manager) {
      var clone = new this.constructor();
      clone.data = _extends({}, this.data);
      clone.bridge.geometry = this.bridge.geometry;
      this.manager.apply(clone, [manager]);

      return clone;
    }
  }]);
  return _default;
}(API), _class$1.rigidbody = function () {
  return {
    touches: [],
    linearVelocity: new three.Vector3(),
    angularVelocity: new three.Vector3(),
    mass: 10,
    scale: new three.Vector3(1, 1, 1),
    restitution: 0.3,
    friction: 0.8,
    damping: 0,
    margin: 0
  };
}, _class$1.softbody = function () {
  return {
    touches: [],
    restitution: 0.3,
    friction: 0.8,
    damping: 0,
    scale: new three.Vector3(1, 1, 1),
    pressure: 100,
    margin: 0,
    klst: 0.9,
    kvst: 0.9,
    kast: 0.9,
    piterations: 1,
    viterations: 0,
    diterations: 0,
    citerations: 4,
    anchorHardness: 0.7,
    rigidHardness: 1,
    isSoftbody: true,
    isSoftBodyReset: false
  };
}, _class$1.rope = function () {
  return {
    touches: [],
    friction: 0.8,
    scale: new three.Vector3(1, 1, 1),
    damping: 0,
    margin: 0,
    klst: 0.9,
    kvst: 0.9,
    kast: 0.9,
    piterations: 1,
    viterations: 0,
    diterations: 0,
    citerations: 4,
    anchorHardness: 0.7,
    rigidHardness: 1,
    isSoftbody: true
  };
}, _class$1.cloth = function () {
  return {
    touches: [],
    friction: 0.8,
    damping: 0,
    margin: 0,
    scale: new three.Vector3(1, 1, 1),
    klst: 0.9,
    kvst: 0.9,
    kast: 0.9,
    piterations: 1,
    viterations: 0,
    diterations: 0,
    citerations: 4,
    anchorHardness: 0.7,
    rigidHardness: 1
  };
}, _temp);

var BoxModule = function (_PhysicsModule) {
  inherits(BoxModule, _PhysicsModule);

  function BoxModule(params) {
    classCallCheck(this, BoxModule);

    var _this = possibleConstructorReturn(this, (BoxModule.__proto__ || Object.getPrototypeOf(BoxModule)).call(this, _extends({
      type: 'box'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.boundingBox) geometry.computeBoundingBox();

      data.width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      data.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
      data.depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
    });
    return _this;
  }

  return BoxModule;
}(_default);

var CompoundModule = function (_PhysicsModule) {
  inherits(CompoundModule, _PhysicsModule);

  function CompoundModule(params) {
    classCallCheck(this, CompoundModule);
    return possibleConstructorReturn(this, (CompoundModule.__proto__ || Object.getPrototypeOf(CompoundModule)).call(this, _extends({
      type: 'compound'
    }, _default.rigidbody()), params));
  }

  return CompoundModule;
}(_default);

var CapsuleModule = function (_PhysicsModule) {
  inherits(CapsuleModule, _PhysicsModule);

  function CapsuleModule(params) {
    classCallCheck(this, CapsuleModule);

    var _this = possibleConstructorReturn(this, (CapsuleModule.__proto__ || Object.getPrototypeOf(CapsuleModule)).call(this, _extends({
      type: 'capsule'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.boundingBox) geometry.computeBoundingBox();

      data.width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      data.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
      data.depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
    });
    return _this;
  }

  return CapsuleModule;
}(_default);

var ConcaveModule = function (_PhysicsModule) {
  inherits(ConcaveModule, _PhysicsModule);

  function ConcaveModule(params) {
    classCallCheck(this, ConcaveModule);

    var _this = possibleConstructorReturn(this, (ConcaveModule.__proto__ || Object.getPrototypeOf(ConcaveModule)).call(this, _extends({
      type: 'concave'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      data.data = _this.geometryProcessor(geometry);
    });
    return _this;
  }

  createClass(ConcaveModule, [{
    key: 'geometryProcessor',
    value: function geometryProcessor(geometry) {
      if (!geometry.boundingBox) geometry.computeBoundingBox();

      var data = geometry.isBufferGeometry ? geometry.attributes.position.array : new Float32Array(geometry.faces.length * 9);

      if (!geometry.isBufferGeometry) {
        var vertices = geometry.vertices;

        for (var i = 0; i < geometry.faces.length; i++) {
          var face = geometry.faces[i];

          var vA = vertices[face.a];
          var vB = vertices[face.b];
          var vC = vertices[face.c];

          var i9 = i * 9;

          data[i9] = vA.x;
          data[i9 + 1] = vA.y;
          data[i9 + 2] = vA.z;

          data[i9 + 3] = vB.x;
          data[i9 + 4] = vB.y;
          data[i9 + 5] = vB.z;

          data[i9 + 6] = vC.x;
          data[i9 + 7] = vC.y;
          data[i9 + 8] = vC.z;
        }
      }

      return data;
    }
  }]);
  return ConcaveModule;
}(_default);

var ConeModule = function (_PhysicsModule) {
  inherits(ConeModule, _PhysicsModule);

  function ConeModule(params) {
    classCallCheck(this, ConeModule);

    var _this = possibleConstructorReturn(this, (ConeModule.__proto__ || Object.getPrototypeOf(ConeModule)).call(this, _extends({
      type: 'cone'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.boundingBox) geometry.computeBoundingBox();

      data.radius = (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2;
      data.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    });
    return _this;
  }

  return ConeModule;
}(_default);

var ConvexModule = function (_PhysicsModule) {
  inherits(ConvexModule, _PhysicsModule);

  function ConvexModule(params) {
    classCallCheck(this, ConvexModule);

    var _this = possibleConstructorReturn(this, (ConvexModule.__proto__ || Object.getPrototypeOf(ConvexModule)).call(this, _extends({
      type: 'convex'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.boundingBox) geometry.computeBoundingBox();
      if (!geometry.isBufferGeometry) geometry._bufferGeometry = new three.BufferGeometry().fromGeometry(geometry);

      data.data = geometry.isBufferGeometry ? geometry.attributes.position.array : geometry._bufferGeometry.attributes.position.array;
    });
    return _this;
  }

  return ConvexModule;
}(_default);

var CylinderModule = function (_PhysicsModule) {
  inherits(CylinderModule, _PhysicsModule);

  function CylinderModule(params) {
    classCallCheck(this, CylinderModule);

    var _this = possibleConstructorReturn(this, (CylinderModule.__proto__ || Object.getPrototypeOf(CylinderModule)).call(this, _extends({
      type: 'cylinder'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.boundingBox) geometry.computeBoundingBox();

      data.width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      data.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
      data.depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
    });
    return _this;
  }

  return CylinderModule;
}(_default);

var HeightfieldModule = function (_PhysicsModule) {
  inherits(HeightfieldModule, _PhysicsModule);

  function HeightfieldModule(params) {
    classCallCheck(this, HeightfieldModule);

    var _this = possibleConstructorReturn(this, (HeightfieldModule.__proto__ || Object.getPrototypeOf(HeightfieldModule)).call(this, _extends({
      type: 'heightfield',
      size: new three.Vector2(1, 1),
      autoAlign: false
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;
      var _data$size = data.size,
          xdiv = _data$size.x,
          ydiv = _data$size.y;

      var verts = geometry.isBufferGeometry ? geometry.attributes.position.array : geometry.vertices;
      var size = geometry.isBufferGeometry ? verts.length / 3 : verts.length;

      if (!geometry.boundingBox) geometry.computeBoundingBox();

      var xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      var ysize = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

      data.xpts = typeof xdiv === 'undefined' ? Math.sqrt(size) : xdiv + 1;
      data.ypts = typeof ydiv === 'undefined' ? Math.sqrt(size) : ydiv + 1;

      // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
      data.absMaxHeight = Math.max(geometry.boundingBox.max.y, Math.abs(geometry.boundingBox.min.y));

      var points = new Float32Array(size),
          xpts = data.xpts,
          ypts = data.ypts;

      while (size--) {
        var vNum = size % xpts + (ypts - Math.round(size / xpts - size % xpts / xpts) - 1) * ypts;

        if (geometry.isBufferGeometry) points[size] = verts[vNum * 3 + 1];else points[size] = verts[vNum].y;
      }

      data.points = points;

      data.scale.multiply(new three.Vector3(xsize / (xpts - 1), 1, ysize / (ypts - 1)));

      if (data.autoAlign) geometry.translate(xsize / -2, 0, ysize / -2);
    });
    return _this;
  }

  return HeightfieldModule;
}(_default);

var PlaneModule = function (_PhysicsModule) {
  inherits(PlaneModule, _PhysicsModule);

  function PlaneModule(params) {
    classCallCheck(this, PlaneModule);

    var _this = possibleConstructorReturn(this, (PlaneModule.__proto__ || Object.getPrototypeOf(PlaneModule)).call(this, _extends({
      type: 'plane'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.boundingBox) geometry.computeBoundingBox();

      data.width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      data.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
      data.normal = geometry.faces[0].normal.clone();
    });
    return _this;
  }

  return PlaneModule;
}(_default);

var SphereModule = function (_PhysicsModule) {
  inherits(SphereModule, _PhysicsModule);

  function SphereModule(params) {
    classCallCheck(this, SphereModule);

    var _this = possibleConstructorReturn(this, (SphereModule.__proto__ || Object.getPrototypeOf(SphereModule)).call(this, _extends({
      type: 'sphere'
    }, _default.rigidbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.boundingSphere) geometry.computeBoundingSphere();
      data.radius = geometry.boundingSphere.radius;
    });
    return _this;
  }

  return SphereModule;
}(_default);

var SoftbodyModule = function (_PhysicsModule) {
  inherits(SoftbodyModule, _PhysicsModule);

  function SoftbodyModule(params) {
    classCallCheck(this, SoftbodyModule);

    var _this = possibleConstructorReturn(this, (SoftbodyModule.__proto__ || Object.getPrototypeOf(SoftbodyModule)).call(this, _extends({
      type: 'softTrimesh'
    }, _default.softbody()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      var idxGeometry = geometry.isBufferGeometry ? geometry : function () {
        geometry.mergeVertices();

        var bufferGeometry = new three.BufferGeometry();

        bufferGeometry.addAttribute('position', new three.BufferAttribute(new Float32Array(geometry.vertices.length * 3), 3).copyVector3sArray(geometry.vertices));

        bufferGeometry.setIndex(new three.BufferAttribute(new (geometry.faces.length * 3 > 65535 ? Uint32Array : Uint16Array)(geometry.faces.length * 3), 1).copyIndicesArray(geometry.faces));

        return bufferGeometry;
      }();

      data.aVertices = idxGeometry.attributes.position.array;
      data.aIndices = idxGeometry.index.array;

      return new three.BufferGeometry().fromGeometry(geometry);
    });
    return _this;
  }

  createClass(SoftbodyModule, [{
    key: 'appendAnchor',
    value: function appendAnchor(object, node, influence) {
      var collisionBetweenLinkedBodies = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var o1 = this.data.id;
      var o2 = object.use('physics').data.id;

      this.execute('appendAnchor', {
        obj: o1,
        obj2: o2,
        node: node,
        influence: influence,
        collisionBetweenLinkedBodies: collisionBetweenLinkedBodies
      });
    }
  }]);
  return SoftbodyModule;
}(_default);

var ClothModule = function (_PhysicsModule) {
  inherits(ClothModule, _PhysicsModule);

  function ClothModule(params) {
    classCallCheck(this, ClothModule);

    var _this = possibleConstructorReturn(this, (ClothModule.__proto__ || Object.getPrototypeOf(ClothModule)).call(this, _extends({
      type: 'softClothMesh'
    }, _default.cloth()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      var geomParams = geometry.parameters;

      var geom = geometry.isBufferGeometry ? geometry : function () {
        geometry.mergeVertices();

        var bufferGeometry = new three.BufferGeometry();

        bufferGeometry.addAttribute('position', new three.BufferAttribute(new Float32Array(geometry.vertices.length * 3), 3).copyVector3sArray(geometry.vertices));

        var faces = geometry.faces,
            facesLength = faces.length;
        var normalsArray = new Float32Array(facesLength * 3);

        for (var i = 0; i < facesLength; i++) {
          var i3 = i * 3;
          var normal = faces[i].normal || new Vector3();

          normalsArray[i3] = normal.x;
          normalsArray[i3 + 1] = normal.y;
          normalsArray[i3 + 2] = normal.z;
        }

        bufferGeometry.addAttribute('normal', new three.BufferAttribute(normalsArray, 3));

        bufferGeometry.setIndex(new three.BufferAttribute(new (facesLength * 3 > 65535 ? Uint32Array : Uint16Array)(facesLength * 3), 1).copyIndicesArray(faces));

        return bufferGeometry;
      }();

      var verts = geom.attributes.position.array;

      if (!geomParams.widthSegments) geomParams.widthSegments = 1;
      if (!geomParams.heightSegments) geomParams.heightSegments = 1;

      var idx00 = 0;
      var idx01 = geomParams.widthSegments;
      var idx10 = (geomParams.heightSegments + 1) * (geomParams.widthSegments + 1) - (geomParams.widthSegments + 1);
      var idx11 = verts.length / 3 - 1;

      data.corners = [verts[idx01 * 3], verts[idx01 * 3 + 1], verts[idx01 * 3 + 2], //   ╗
      verts[idx00 * 3], verts[idx00 * 3 + 1], verts[idx00 * 3 + 2], // ╔
      verts[idx11 * 3], verts[idx11 * 3 + 1], verts[idx11 * 3 + 2], //       ╝
      verts[idx10 * 3], verts[idx10 * 3 + 1], verts[idx10 * 3 + 2]];

      data.segments = [geomParams.widthSegments + 1, geomParams.heightSegments + 1];

      return geom;
    });
    return _this;
  }

  createClass(ClothModule, [{
    key: 'appendAnchor',
    value: function appendAnchor(object, node, influence) {
      var collisionBetweenLinkedBodies = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var o1 = this.data.id;
      var o2 = object.use('physics').data.id;

      this.execute('appendAnchor', {
        obj: o1,
        obj2: o2,
        node: node,
        influence: influence,
        collisionBetweenLinkedBodies: collisionBetweenLinkedBodies
      });
    }
  }]);
  return ClothModule;
}(_default);

var RopeModule = function (_PhysicsModule) {
  inherits(RopeModule, _PhysicsModule);

  function RopeModule(params) {
    classCallCheck(this, RopeModule);

    var _this = possibleConstructorReturn(this, (RopeModule.__proto__ || Object.getPrototypeOf(RopeModule)).call(this, _extends({
      type: 'softRopeMesh'
    }, _default.rope()), params));

    _this.updateData(function (geometry, _ref) {
      var data = _ref.data;

      if (!geometry.isBufferGeometry) {
        geometry = function () {
          var buff = new three.BufferGeometry();

          buff.addAttribute('position', new three.BufferAttribute(new Float32Array(geometry.vertices.length * 3), 3).copyVector3sArray(geometry.vertices));

          return buff;
        }();
      }

      var length = geometry.attributes.position.array.length / 3;
      var vert = function vert(n) {
        return new three.Vector3().fromArray(geometry.attributes.position.array, n * 3);
      };

      var v1 = vert(0);
      var v2 = vert(length - 1);

      data.data = [v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, length];

      return geometry;
    });
    return _this;
  }

  createClass(RopeModule, [{
    key: 'appendAnchor',
    value: function appendAnchor(object, node, influence) {
      var collisionBetweenLinkedBodies = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var o1 = this.data.id;
      var o2 = object.use('physics').data.id;

      this.execute('appendAnchor', {
        obj: o1,
        obj2: o2,
        node: node,
        influence: influence,
        collisionBetweenLinkedBodies: collisionBetweenLinkedBodies
      });
    }
  }]);
  return RopeModule;
}(_default);

var _class$2;
var _temp$1;

var PI_2 = Math.PI / 2;

// TODO: Fix DOM
function FirstPersonControlsSolver(camera, mesh, params) {
  var _this = this;

  var velocityFactor = 1;
  var runVelocity = 0.25;

  mesh.use('physics').setAngularFactor({ x: 0, y: 0, z: 0 });
  camera.position.set(0, 0, 0);

  /* Init */
  var player = mesh,
      pitchObject = new three.Object3D();

  pitchObject.add(camera.native);

  var yawObject = new three.Object3D();

  yawObject.position.y = params.ypos; // eyes are 2 meters above the ground
  yawObject.add(pitchObject);

  var quat = new three.Quaternion();

  var canJump = false,

  // Moves.
  moveForward = false,
      moveBackward = false,
      moveLeft = false,
      moveRight = false;

  player.on('collision', function (otherObject, v, r, contactNormal) {
    console.log(contactNormal.y);
    if (contactNormal.y < 0.5) // Use a "good" threshold value between 0 and 1 here!
      canJump = true;
  });

  var onMouseMove = function onMouseMove(event) {
    if (_this.enabled === false) return;

    var movementX = typeof event.movementX === 'number' ? event.movementX : typeof event.mozMovementX === 'number' ? event.mozMovementX : typeof event.getMovementX === 'function' ? event.getMovementX() : 0;
    var movementY = typeof event.movementY === 'number' ? event.movementY : typeof event.mozMovementY === 'number' ? event.mozMovementY : typeof event.getMovementY === 'function' ? event.getMovementY() : 0;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
  };

  var physics = player.use('physics');

  var onKeyDown = function onKeyDown(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87:
        // w
        moveForward = true;
        break;

      case 37: // left
      case 65:
        // a
        moveLeft = true;
        break;

      case 40: // down
      case 83:
        // s
        moveBackward = true;
        break;

      case 39: // right
      case 68:
        // d
        moveRight = true;
        break;

      case 32:
        // space
        console.log(canJump);
        if (canJump === true) physics.applyCentralImpulse({ x: 0, y: 300, z: 0 });
        canJump = false;
        break;

      case 16:
        // shift
        runVelocity = 0.5;
        break;

      default:
    }
  };

  var onKeyUp = function onKeyUp(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87:
        // w
        moveForward = false;
        break;

      case 37: // left
      case 65:
        // a
        moveLeft = false;
        break;

      case 40: // down
      case 83:
        // a
        moveBackward = false;
        break;

      case 39: // right
      case 68:
        // d
        moveRight = false;
        break;

      case 16:
        // shift
        runVelocity = 0.25;
        break;

      default:
    }
  };

  document.body.addEventListener('mousemove', onMouseMove, false);
  document.body.addEventListener('keydown', onKeyDown, false);
  document.body.addEventListener('keyup', onKeyUp, false);

  this.enabled = false;
  this.getObject = function () {
    return yawObject;
  };

  this.getDirection = function (targetVec) {
    targetVec.set(0, 0, -1);
    quat.multiplyVector3(targetVec);
  };

  // Moves the camera to the Physi.js object position
  // and adds velocity to the object if the run key is down.
  var inputVelocity = new three.Vector3(),
      euler = new three.Euler();

  this.update = function (delta) {
    if (_this.enabled === false) return;

    delta = delta || 0.5;
    delta = Math.min(delta, 0.5, delta);

    inputVelocity.set(0, 0, 0);

    var speed = velocityFactor * delta * params.speed * runVelocity;

    if (moveForward) inputVelocity.z = -speed;
    if (moveBackward) inputVelocity.z = speed;
    if (moveLeft) inputVelocity.x = -speed;
    if (moveRight) inputVelocity.x = speed;

    // Convert velocity to world coordinates
    euler.x = pitchObject.rotation.x;
    euler.y = yawObject.rotation.y;
    euler.order = 'XYZ';

    quat.setFromEuler(euler);

    inputVelocity.applyQuaternion(quat);

    physics.applyCentralImpulse({ x: inputVelocity.x, y: 0, z: inputVelocity.z });
    physics.setAngularVelocity({ x: inputVelocity.z, y: 0, z: -inputVelocity.x });
    physics.setAngularFactor({ x: 0, y: 0, z: 0 });
  };

  player.on('physics:added', function () {
    player.manager.get('module:world').addEventListener('update', function () {
      if (_this.enabled === false) return;
      yawObject.position.copy(player.position);
    });
  });
}

var FirstPersonModule = (_temp$1 = _class$2 = function () {
  function FirstPersonModule(object) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, FirstPersonModule);

    this.object = object;
    this.params = params;

    if (!this.params.block) {
      this.params.block = document.getElementById('blocker');
    }
  }

  createClass(FirstPersonModule, [{
    key: 'manager',
    value: function manager(_manager) {
      var _this2 = this;

      this.controls = new FirstPersonControlsSolver(_manager.get('camera'), this.object, this.params);

      if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {
        var element = document.body;

        var pointerlockchange = function pointerlockchange() {
          if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            _this2.controls.enabled = true;
            _this2.params.block.style.display = 'none';
          } else {
            _this2.controls.enabled = false;
            _this2.params.block.style.display = 'block';
          }
        };

        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

        var pointerlockerror = function pointerlockerror() {
          console.warn('Pointer lock error.');
        };

        document.addEventListener('pointerlockerror', pointerlockerror, false);
        document.addEventListener('mozpointerlockerror', pointerlockerror, false);
        document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

        document.querySelector('body').addEventListener('click', function () {
          element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

          element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

          if (/Firefox/i.test(navigator.userAgent)) {
            var fullscreenchange = function fullscreenchange() {
              if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
                document.removeEventListener('fullscreenchange', fullscreenchange);
                document.removeEventListener('mozfullscreenchange', fullscreenchange);

                element.requestPointerLock();
              }
            };

            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen();
          } else element.requestPointerLock();
        });
      } else console.warn('Your browser does not support the PointerLock');

      _manager.get('scene').add(this.controls.getObject());
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      var updateProcessor = function updateProcessor(c) {
        self.controls.update(c.getDelta());
      };

      self.updateLoop = new whs.Loop(updateProcessor).start(this);
    }
  }]);
  return FirstPersonModule;
}(), _class$2.defaults = {
  block: null,
  speed: 1,
  ypos: 1
}, _temp$1);

exports.getEulerXYZFromQuaternion = getEulerXYZFromQuaternion;
exports.getQuatertionFromEuler = getQuatertionFromEuler;
exports.convertWorldPositionToObject = convertWorldPositionToObject;
exports.addObjectChildren = addObjectChildren;
exports.MESSAGE_TYPES = MESSAGE_TYPES;
exports.REPORT_ITEMSIZE = REPORT_ITEMSIZE;
exports.COLLISIONREPORT_ITEMSIZE = COLLISIONREPORT_ITEMSIZE;
exports.VEHICLEREPORT_ITEMSIZE = VEHICLEREPORT_ITEMSIZE;
exports.CONSTRAINTREPORT_ITEMSIZE = CONSTRAINTREPORT_ITEMSIZE;
exports.temp1Vector3 = temp1Vector3;
exports.temp2Vector3 = temp2Vector3;
exports.temp1Matrix4 = temp1Matrix4;
exports.temp1Quat = temp1Quat;
exports.Eventable = Eventable;
exports.ConeTwistConstraint = ConeTwistConstraint;
exports.HingeConstraint = HingeConstraint;
exports.PointConstraint = PointConstraint;
exports.SliderConstraint = SliderConstraint;
exports.DOFConstraint = DOFConstraint;
exports.WorldModule = WorldModule;
exports.BoxModule = BoxModule;
exports.CompoundModule = CompoundModule;
exports.CapsuleModule = CapsuleModule;
exports.ConcaveModule = ConcaveModule;
exports.ConeModule = ConeModule;
exports.ConvexModule = ConvexModule;
exports.CylinderModule = CylinderModule;
exports.HeightfieldModule = HeightfieldModule;
exports.PlaneModule = PlaneModule;
exports.SphereModule = SphereModule;
exports.SoftbodyModule = SoftbodyModule;
exports.ClothModule = ClothModule;
exports.RopeModule = RopeModule;
exports.FirstPersonModule = FirstPersonModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=physics-module.js.map
