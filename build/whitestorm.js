(function (exports,THREE$1) {
  'use strict';

  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

  class Loop {
    constructor(func) {
      this.func = func;
      this.clock = new THREE$1.Clock();
      this.enabled = false;
    }

    start() {
      this.clock.start();
      this.enabled = true;
    }

    stop() {
      this.clock.stop();
      this.enabled = false;
    }

    execute(time) {
      return this.func(this.clock, time);
    }
  }

  var minivents_commonjs = __commonjs(function (module) {
  module.exports = function Events(target){
    var events = {}, empty = [];
    target = target || this
    /**
     *  On: listen to events
     */
    target.on = function(type, func, ctx){
      (events[type] = events[type] || []).push([func, ctx])
    }
    /**
     *  Off: stop listening to event / specific callback
     */
    target.off = function(type, func){
      type || (events = {})
      var list = events[type] || empty,
          i = list.length = func ? list.length : 0;
      while(i--) func == list[i][0] && list.splice(i,1)
    }
    /** 
     * Emit: send event, callbacks will be triggered
     */
    target.emit = function(type){
      var e = events[type] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i=0, j;
      while(j=list[i++]) j[0].apply(j[1], empty.slice.call(arguments, 1))
    };
  };
  });

  var Events = (minivents_commonjs && typeof minivents_commonjs === 'object' && 'default' in minivents_commonjs ? minivents_commonjs['default'] : minivents_commonjs);

  var SUPPORT_TRANSFERABLE;
  var _Physijs = Physijs;
  var Physijs = {};
  var Eventable;
  var getObjectId;
  var convertWorldPositionToObject;
  var addObjectChildren;
  var _temp1;
  var _temp2;
  var _temp_vector3_1 = new THREE$1.Vector3();
  var _temp_vector3_2 = new THREE$1.Vector3();
  var _temp_matrix4_1 = new THREE$1.Matrix4();
  var _quaternion_1 = new THREE$1.Quaternion();
  var MESSAGE_TYPES = {
      WORLDREPORT: 0,
      COLLISIONREPORT: 1,
      VEHICLEREPORT: 2,
      CONSTRAINTREPORT: 3
    };
  var REPORT_ITEMSIZE = 14;
  var COLLISIONREPORT_ITEMSIZE = 5;
  var VEHICLEREPORT_ITEMSIZE = 9;
  var CONSTRAINTREPORT_ITEMSIZE = 6;
  Physijs.scripts = {};

  Eventable = function () {
    this._eventListeners = {};
  };
  Eventable.prototype.addEventListener = function (event_name, callback) {
    if (!this._eventListeners.hasOwnProperty(event_name)) {
      this._eventListeners[event_name] = [];
    }
    this._eventListeners[event_name].push(callback);
  };
  Eventable.prototype.removeEventListener = function (event_name, callback) {
    var index;

    if (!this._eventListeners.hasOwnProperty(event_name)) return false;

    if ((index = this._eventListeners[event_name].indexOf(callback)) >= 0) {
      this._eventListeners[event_name].splice(index, 1);
      return true;
    }

    return false;
  };
  Eventable.prototype.dispatchEvent = function (event_name) {
    var i,
      parameters = Array.prototype.splice.call(arguments, 1);

    if (this._eventListeners.hasOwnProperty(event_name)) {
      for (i = 0; i < this._eventListeners[event_name].length; i++) {
        this._eventListeners[event_name][i].apply(this, parameters);
      }
    }
  };
  Eventable.make = function (obj) {
    obj.prototype.addEventListener = Eventable.prototype.addEventListener;
    obj.prototype.removeEventListener = Eventable.prototype.removeEventListener;
    obj.prototype.dispatchEvent = Eventable.prototype.dispatchEvent;
  };

  getObjectId = (function () {
    var _id = 1;
    return function () {
      return _id++;
    };
  })();

  convertWorldPositionToObject = function (position, object) {
    _temp_matrix4_1.identity(); // reset temp matrix

    // Set the temp matrix's rotation to the object's rotation
    _temp_matrix4_1.identity().makeRotationFromQuaternion(object.quaternion);

    // Invert rotation matrix in order to "unrotate" a point back to object space
    _temp_matrix4_1.getInverse(_temp_matrix4_1);

    // Yay! Temp vars!
    _temp_vector3_1.copy(position);
    _temp_vector3_2.copy(object.position);

    // Apply the rotation

    return _temp_vector3_1.sub(_temp_vector3_2).applyMatrix4(_temp_matrix4_1);
  };


  // Physijs.noConflict
  Physijs.noConflict = function () {
    window.Physijs = _Physijs;
    return Physijs;
  };


  // Physijs.createMaterial
  Physijs.createMaterial = function (material, friction, restitution) {
    var physijs_material = function () {
    };
    physijs_material.prototype = material;
    physijs_material = new physijs_material;

    physijs_material._physijs = {
      id: material.id,
      friction: friction === undefined ? .8 : friction,
      restitution: restitution === undefined ? .2 : restitution
    };

    return physijs_material;
  };


  // Constraints
  Physijs.PointConstraint = function (objecta, objectb, position) {
    if (position === undefined) {
      position = objectb;
      objectb = undefined;
    }

    this.type = 'point';
    this.appliedImpulse = 0;
    this.id = getObjectId();
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
    }
  };
  Physijs.PointConstraint.prototype.getDefinition = function () {
    return {
      type: this.type,
      id: this.id,
      objecta: this.objecta,
      objectb: this.objectb,
      positiona: this.positiona,
      positionb: this.positionb
    };
  };

  Physijs.HingeConstraint = function (objecta, objectb, position, axis) {
    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'hinge';
    this.appliedImpulse = 0;
    this.id = getObjectId();
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.position = position.clone();
    this.axis = axis;

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
    }
  };
  Physijs.HingeConstraint.prototype.getDefinition = function () {
    return {
      type: this.type,
      id: this.id,
      objecta: this.objecta,
      objectb: this.objectb,
      positiona: this.positiona,
      positionb: this.positionb,
      axis: this.axis
    };
  };
  /*
   * low = minimum angle in radians
   * high = maximum angle in radians
   * bias_factor = applied as a factor to constraint error
   * relaxation_factor = controls bounce (0.0 == no bounce)
   */
  Physijs.HingeConstraint.prototype.setLimits = function (low, high, bias_factor, relaxation_factor) {
    this.scene.execute('hinge_setLimits', {
      constraint: this.id,
      low: low,
      high: high,
      bias_factor: bias_factor,
      relaxation_factor: relaxation_factor
    });
  };
  Physijs.HingeConstraint.prototype.enableAngularMotor = function (velocity, acceleration) {
    this.scene.execute('hinge_enableAngularMotor', {
      constraint: this.id,
      velocity: velocity,
      acceleration: acceleration
    });
  };
  Physijs.HingeConstraint.prototype.disableMotor = function (velocity, acceleration) {
    this.scene.execute('hinge_disableMotor', {constraint: this.id});
  };

  Physijs.SliderConstraint = function (objecta, objectb, position, axis) {
    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'slider';
    this.appliedImpulse = 0;
    this.id = getObjectId();
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.axis = axis;

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
    }
  };
  Physijs.SliderConstraint.prototype.getDefinition = function () {
    return {
      type: this.type,
      id: this.id,
      objecta: this.objecta,
      objectb: this.objectb,
      positiona: this.positiona,
      positionb: this.positionb,
      axis: this.axis
    };
  };
  Physijs.SliderConstraint.prototype.setLimits = function (lin_lower, lin_upper, ang_lower, ang_upper) {
    this.scene.execute('slider_setLimits', {
      constraint: this.id,
      lin_lower: lin_lower,
      lin_upper: lin_upper,
      ang_lower: ang_lower,
      ang_upper: ang_upper
    });
  };
  Physijs.SliderConstraint.prototype.setRestitution = function (linear, angular) {
    this.scene.execute(
      'slider_setRestitution',
      {
        constraint: this.id,
        linear: linear,
        angular: angular
      }
    );
  };
  Physijs.SliderConstraint.prototype.enableLinearMotor = function (velocity, acceleration) {
    this.scene.execute('slider_enableLinearMotor', {
      constraint: this.id,
      velocity: velocity,
      acceleration: acceleration
    });
  };
  Physijs.SliderConstraint.prototype.disableLinearMotor = function () {
    this.scene.execute('slider_disableLinearMotor', {constraint: this.id});
  };
  Physijs.SliderConstraint.prototype.enableAngularMotor = function (velocity, acceleration) {
    this.scene.execute('slider_enableAngularMotor', {
      constraint: this.id,
      velocity: velocity,
      acceleration: acceleration
    });
  };
  Physijs.SliderConstraint.prototype.disableAngularMotor = function () {
    this.scene.execute('slider_disableAngularMotor', {constraint: this.id});
  };

  Physijs.ConeTwistConstraint = function (objecta, objectb, position) {
    if (position === undefined) {
      throw 'Both objects must be defined in a ConeTwistConstraint.';
    }
    this.type = 'conetwist';
    this.appliedImpulse = 0;
    this.id = getObjectId();
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.objectb = objectb._physijs.id;
    this.positionb = convertWorldPositionToObject(position, objectb).clone();
    this.axisa = {x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z};
    this.axisb = {x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z};
  };
  Physijs.ConeTwistConstraint.prototype.getDefinition = function () {
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
  };
  Physijs.ConeTwistConstraint.prototype.setLimit = function (x, y, z) {
    this.scene.execute('conetwist_setLimit', {constraint: this.id, x: x, y: y, z: z});
  };
  Physijs.ConeTwistConstraint.prototype.enableMotor = function () {
    this.scene.execute('conetwist_enableMotor', {constraint: this.id});
  };
  Physijs.ConeTwistConstraint.prototype.setMaxMotorImpulse = function (max_impulse) {
    this.scene.execute('conetwist_setMaxMotorImpulse', {constraint: this.id, max_impulse: max_impulse});
  };
  Physijs.ConeTwistConstraint.prototype.setMotorTarget = function (target) {
    if (target instanceof THREE$1.Vector3) {
      target = new THREE$1.Quaternion().setFromEuler(new THREE$1.Euler(target.x, target.y, target.z));
    } else if (target instanceof THREE$1.Euler) {
      target = new THREE$1.Quaternion().setFromEuler(target);
    } else if (target instanceof THREE$1.Matrix4) {
      target = new THREE$1.Quaternion().setFromRotationMatrix(target);
    }
    this.scene.execute('conetwist_setMotorTarget', {
      constraint: this.id,
      x: target.x,
      y: target.y,
      z: target.z,
      w: target.w
    });
  };
  Physijs.ConeTwistConstraint.prototype.disableMotor = function () {
    this.scene.execute('conetwist_disableMotor', {constraint: this.id});
  };

  Physijs.DOFConstraint = function (objecta, objectb, position) {
    if (position === undefined) {
      position = objectb;
      objectb = undefined;
    }
    this.type = 'dof';
    this.appliedImpulse = 0;
    this.id = getObjectId();
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.axisa = {x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z};

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
      this.axisb = {x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z};
    }
  };
  Physijs.DOFConstraint.prototype.getDefinition = function () {
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
  };
  Physijs.DOFConstraint.prototype.setLinearLowerLimit = function (limit) {
    this.scene.execute('dof_setLinearLowerLimit', {constraint: this.id, x: limit.x, y: limit.y, z: limit.z});
  };
  Physijs.DOFConstraint.prototype.setLinearUpperLimit = function (limit) {
    this.scene.execute('dof_setLinearUpperLimit', {constraint: this.id, x: limit.x, y: limit.y, z: limit.z});
  };
  Physijs.DOFConstraint.prototype.setAngularLowerLimit = function (limit) {
    this.scene.execute('dof_setAngularLowerLimit', {constraint: this.id, x: limit.x, y: limit.y, z: limit.z});
  };
  Physijs.DOFConstraint.prototype.setAngularUpperLimit = function (limit) {
    this.scene.execute('dof_setAngularUpperLimit', {constraint: this.id, x: limit.x, y: limit.y, z: limit.z});
  };
  Physijs.DOFConstraint.prototype.enableAngularMotor = function (which) {
    this.scene.execute('dof_enableAngularMotor', {constraint: this.id, which: which});
  };
  Physijs.DOFConstraint.prototype.configureAngularMotor = function (which, low_angle, high_angle, velocity, max_force) {
    this.scene.execute('dof_configureAngularMotor', {
      constraint: this.id,
      which: which,
      low_angle: low_angle,
      high_angle: high_angle,
      velocity: velocity,
      max_force: max_force
    });
  };
  Physijs.DOFConstraint.prototype.disableAngularMotor = function (which) {
    this.scene.execute('dof_disableAngularMotor', {constraint: this.id, which: which});
  };

  // Physijs.Scene
  Physijs.Scene = function (params) {
    var self = this;

    Eventable.call(this);
    THREE$1.Scene.call(this);

    this._worker = new Worker(Physijs.scripts.worker || 'physijs_worker.js');
    this._worker.transferableMessage = this._worker.webkitPostMessage || this._worker.postMessage;
    this._materials_ref_counts = {};
    this._objects = {};
    this._vehicles = {};
    this._constraints = {};
    this._is_simulating = false;

    var ab = new ArrayBuffer(1);
    this._worker.transferableMessage(ab, [ab]);
    SUPPORT_TRANSFERABLE = ( ab.byteLength === 0 );

    this._worker.onmessage = function (event) {
      var _temp,
        data = event.data;

      if (data instanceof ArrayBuffer && data.byteLength !== 1) { // byteLength === 1 is the worker making a SUPPORT_TRANSFERABLE test
        data = new Float32Array(data);
      }

      if (data instanceof Float32Array) {

        // transferable object
        switch (data[0]) {
          case MESSAGE_TYPES.WORLDREPORT:
            self._updateScene(data);
            break;

          case MESSAGE_TYPES.COLLISIONREPORT:
            self._updateCollisions(data);
            break;

          case MESSAGE_TYPES.VEHICLEREPORT:
            self._updateVehicles(data);
            break;

          case MESSAGE_TYPES.CONSTRAINTREPORT:
            self._updateConstraints(data);
            break;
        }

      } else {

        if (data.cmd) {

          // non-transferable object
          switch (data.cmd) {
            case 'objectReady':
              _temp = data.params;
              if (self._objects[_temp]) {
                self._objects[_temp].dispatchEvent('ready');
              }
              break;

            case 'worldReady':
              self.dispatchEvent('ready');
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
              self._updateScene(data);
              break;

            case MESSAGE_TYPES.COLLISIONREPORT:
              self._updateCollisions(data);
              break;

            case MESSAGE_TYPES.VEHICLEREPORT:
              self._updateVehicles(data);
              break;

            case MESSAGE_TYPES.CONSTRAINTREPORT:
              self._updateConstraints(data);
              break;
          }

        }

      }
    };


    params = params || {};
    params.ammo = Physijs.scripts.ammo || 'ammo.js';
    params.fixedTimeStep = params.fixedTimeStep || 1 / 60;
    params.rateLimit = params.rateLimit || true;
    this.execute('init', params);

    console.log(this._worker);
  };

  Physijs.Scene.prototype = new THREE$1.Scene;
  Physijs.Scene.prototype.constructor = Physijs.Scene;
  Eventable.make(Physijs.Scene);

  Physijs.Scene.prototype._updateScene = function (data) {
    var num_objects = data[1],
      object,
      i, offset;

    for (i = 0; i < num_objects; i++) {
      offset = 2 + i * REPORT_ITEMSIZE;
      object = this._objects[data[offset]];

      if (object === undefined) {
        continue;
      }

      if (object.__dirtyPosition === false) {
        object.position.set(
          data[offset + 1],
          data[offset + 2],
          data[offset + 3]
        );
      }

      if (object.__dirtyRotation === false) {
        object.quaternion.set(
          data[offset + 4],
          data[offset + 5],
          data[offset + 6],
          data[offset + 7]
        );
      }

      object._physijs.linearVelocity.set(
        data[offset + 8],
        data[offset + 9],
        data[offset + 10]
      );

      object._physijs.angularVelocity.set(
        data[offset + 11],
        data[offset + 12],
        data[offset + 13]
      );

    }

    if (SUPPORT_TRANSFERABLE) {
      // Give the typed array back to the worker
      this._worker.transferableMessage(data.buffer, [data.buffer]);
    }

    this._is_simulating = false;
    this.dispatchEvent('update');
  };

  Physijs.Scene.prototype._updateVehicles = function (data) {
    var vehicle, wheel,
      i, offset;

    for (i = 0; i < ( data.length - 1 ) / VEHICLEREPORT_ITEMSIZE; i++) {
      offset = 1 + i * VEHICLEREPORT_ITEMSIZE;
      vehicle = this._vehicles[data[offset]];

      if (vehicle === undefined) {
        continue;
      }

      wheel = vehicle.wheels[data[offset + 1]];

      wheel.position.set(
        data[offset + 2],
        data[offset + 3],
        data[offset + 4]
      );

      wheel.quaternion.set(
        data[offset + 5],
        data[offset + 6],
        data[offset + 7],
        data[offset + 8]
      );
    }

    if (SUPPORT_TRANSFERABLE) {
      // Give the typed array back to the worker
      this._worker.transferableMessage(data.buffer, [data.buffer]);
    }
  };

  Physijs.Scene.prototype._updateConstraints = function (data) {
    var constraint, object,
      i, offset;

    for (i = 0; i < ( data.length - 1 ) / CONSTRAINTREPORT_ITEMSIZE; i++) {
      offset = 1 + i * CONSTRAINTREPORT_ITEMSIZE;
      constraint = this._constraints[data[offset]];
      object = this._objects[data[offset + 1]];

      if (constraint === undefined || object === undefined) {
        continue;
      }

      _temp_vector3_1.set(
        data[offset + 2],
        data[offset + 3],
        data[offset + 4]
      );
      _temp_matrix4_1.extractRotation(object.matrix);
      _temp_vector3_1.applyMatrix4(_temp_matrix4_1);

      constraint.positiona.addVectors(object.position, _temp_vector3_1);
      constraint.appliedImpulse = data[offset + 5];
    }

    if (SUPPORT_TRANSFERABLE) {
      // Give the typed array back to the worker
      this._worker.transferableMessage(data.buffer, [data.buffer]);
    }
  };

  Physijs.Scene.prototype._updateCollisions = function (data) {
    /**
     * #TODO
     * This is probably the worst way ever to handle collisions. The inherent evilness is a residual
     * effect from the previous version's evilness which mutated when switching to transferable objects.
     *
     * If you feel inclined to make this better, please do so.
     */

    var i, j, offset, object, object2, id1, id2,
      collisions = {}, normal_offsets = {};

    // Build collision manifest
    for (i = 0; i < data[1]; i++) {
      offset = 2 + i * COLLISIONREPORT_ITEMSIZE;
      object = data[offset];
      object2 = data[offset + 1];

      normal_offsets[object + '-' + object2] = offset + 2;
      normal_offsets[object2 + '-' + object] = -1 * ( offset + 2 );

      // Register collisions for both the object colliding and the object being collided with
      if (!collisions[object]) collisions[object] = [];
      collisions[object].push(object2);

      if (!collisions[object2]) collisions[object2] = [];
      collisions[object2].push(object);
    }

    // Deal with collisions
    for (id1 in this._objects) {
      if (!this._objects.hasOwnProperty(id1)) continue;
      object = this._objects[id1];

      // If object touches anything, ...
      if (collisions[id1]) {

        // Clean up touches array
        for (j = 0; j < object._physijs.touches.length; j++) {
          if (collisions[id1].indexOf(object._physijs.touches[j]) === -1) {
            object._physijs.touches.splice(j--, 1);
          }
        }

        // Handle each colliding object
        for (j = 0; j < collisions[id1].length; j++) {
          id2 = collisions[id1][j];
          object2 = this._objects[id2];

          if (object2) {
            // If object was not already touching object2, notify object
            if (object._physijs.touches.indexOf(id2) === -1) {
              object._physijs.touches.push(id2);

              _temp_vector3_1.subVectors(object.getLinearVelocity(), object2.getLinearVelocity());
              _temp1 = _temp_vector3_1.clone();

              _temp_vector3_1.subVectors(object.getAngularVelocity(), object2.getAngularVelocity());
              _temp2 = _temp_vector3_1.clone();

              var normal_offset = normal_offsets[object._physijs.id + '-' + object2._physijs.id];
              if (normal_offset > 0) {
                _temp_vector3_1.set(
                  -data[normal_offset],
                  -data[normal_offset + 1],
                  -data[normal_offset + 2]
                );
              } else {
                normal_offset *= -1;
                _temp_vector3_1.set(
                  data[normal_offset],
                  data[normal_offset + 1],
                  data[normal_offset + 2]
                );
              }

              object.dispatchEvent('collision', object2, _temp1, _temp2, _temp_vector3_1);
            }
          }
        }

      } else {

        // not touching other objects
        object._physijs.touches.length = 0;

      }

    }

    this.collisions = collisions;

    if (SUPPORT_TRANSFERABLE) {
      // Give the typed array back to the worker
      this._worker.transferableMessage(data.buffer, [data.buffer]);
    }
  };

  Physijs.Scene.prototype.addConstraint = function (constraint, show_marker) {
    this._constraints[constraint.id] = constraint;
    this.execute('addConstraint', constraint.getDefinition());

    if (show_marker) {
      var marker;

      switch (constraint.type) {
        case 'point':
          marker = new THREE$1.Mesh(
            new THREE$1.SphereGeometry(1.5),
            new THREE$1.MeshNormalMaterial
          );
          marker.position.copy(constraint.positiona);
          this._objects[constraint.objecta].add(marker);
          break;

        case 'hinge':
          marker = new THREE$1.Mesh(
            new THREE$1.SphereGeometry(1.5),
            new THREE$1.MeshNormalMaterial
          );
          marker.position.copy(constraint.positiona);
          this._objects[constraint.objecta].add(marker);
          break;

        case 'slider':
          marker = new THREE$1.Mesh(
            new THREE$1.BoxGeometry(10, 1, 1),
            new THREE$1.MeshNormalMaterial
          );
          marker.position.copy(constraint.positiona);
          // This rotation isn't right if all three axis are non-0 values
          // TODO: change marker's rotation order to ZYX
          marker.rotation.set(
            constraint.axis.y, // yes, y and
            constraint.axis.x, // x axis are swapped
            constraint.axis.z
          );
          this._objects[constraint.objecta].add(marker);
          break;

        case 'conetwist':
          marker = new THREE$1.Mesh(
            new THREE$1.SphereGeometry(1.5),
            new THREE$1.MeshNormalMaterial
          );
          marker.position.copy(constraint.positiona);
          this._objects[constraint.objecta].add(marker);
          break;

        case 'dof':
          marker = new THREE$1.Mesh(
            new THREE$1.SphereGeometry(1.5),
            new THREE$1.MeshNormalMaterial
          );
          marker.position.copy(constraint.positiona);
          this._objects[constraint.objecta].add(marker);
          break;
      }
    }

    return constraint;
  };

  Physijs.Scene.prototype.onSimulationResume = function () {
    this.execute('onSimulationResume', {});
  };

  Physijs.Scene.prototype.removeConstraint = function (constraint) {
    if (this._constraints[constraint.id] !== undefined) {
      this.execute('removeConstraint', {id: constraint.id});
      delete this._constraints[constraint.id];
    }
  };

  Physijs.Scene.prototype.execute = function (cmd, params) {
    this._worker.postMessage({cmd: cmd, params: params});
  };

  addObjectChildren = function (parent, object) {
    var i;

    for (i = 0; i < object.children.length; i++) {
      if (object.children[i]._physijs) {
        object.children[i].updateMatrix();
        object.children[i].updateMatrixWorld();

        _temp_vector3_1.setFromMatrixPosition(object.children[i].matrixWorld);
        _quaternion_1.setFromRotationMatrix(object.children[i].matrixWorld);

        object.children[i]._physijs.position_offset = {
          x: _temp_vector3_1.x,
          y: _temp_vector3_1.y,
          z: _temp_vector3_1.z
        };

        object.children[i]._physijs.rotation = {
          x: _quaternion_1.x,
          y: _quaternion_1.y,
          z: _quaternion_1.z,
          w: _quaternion_1.w
        };

        parent._physijs.children.push(object.children[i]._physijs);
      }

      addObjectChildren(parent, object.children[i]);
    }
  };

  Physijs.Scene.prototype.add = function (object) {
    THREE$1.Mesh.prototype.add.call(this, object);

    if (object._physijs) {

      object.world = this;

      if (object instanceof Physijs.Vehicle) {

        this.add(object.mesh);
        this._vehicles[object._physijs.id] = object;
        this.execute('addVehicle', object._physijs);

      } else {

        object.__dirtyPosition = false;
        object.__dirtyRotation = false;
        this._objects[object._physijs.id] = object;

        if (object.children.length) {
          object._physijs.children = [];
          addObjectChildren(object, object);
        }

        if (object.material._physijs) {
          if (!this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) {
            this.execute('registerMaterial', object.material._physijs);
            object._physijs.materialId = object.material._physijs.id;
            this._materials_ref_counts[object.material._physijs.id] = 1;
          } else {
            this._materials_ref_counts[object.material._physijs.id]++;
          }
        }

        // Object starting position + rotation
        object._physijs.position = {x: object.position.x, y: object.position.y, z: object.position.z};
        object._physijs.rotation = {
          x: object.quaternion.x,
          y: object.quaternion.y,
          z: object.quaternion.z,
          w: object.quaternion.w
        };

        // Check for scaling
        var mass_scaling = new THREE$1.Vector3(1, 1, 1);
        if (object._physijs.width) {
          object._physijs.width *= object.scale.x;
        }
        if (object._physijs.height) {
          object._physijs.height *= object.scale.y;
        }
        if (object._physijs.depth) {
          object._physijs.depth *= object.scale.z;
        }

        this.execute('addObject', object._physijs);

      }
    }
  };

  Physijs.Scene.prototype.remove = function (object) {
    if (object instanceof Physijs.Vehicle) {
      this.execute('removeVehicle', {id: object._physijs.id});
      while (object.wheels.length) {
        this.remove(object.wheels.pop());
      }
      this.remove(object.mesh);
      delete this._vehicles[object._physijs.id];
    } else {
      THREE$1.Mesh.prototype.remove.call(this, object);
      if (object._physijs) {
        delete this._objects[object._physijs.id];
        this.execute('removeObject', {id: object._physijs.id});
      }
    }
    if (object.material && object.material._physijs && this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) {
      this._materials_ref_counts[object.material._physijs.id]--;
      if (this._materials_ref_counts[object.material._physijs.id] == 0) {
        this.execute('unRegisterMaterial', object.material._physijs);
        delete this._materials_ref_counts[object.material._physijs.id];
      }
    }
  };

  Physijs.Scene.prototype.setFixedTimeStep = function (fixedTimeStep) {
    if (fixedTimeStep) {
      this.execute('setFixedTimeStep', fixedTimeStep);
    }
  };

  Physijs.Scene.prototype.setGravity = function (gravity) {
    if (gravity) {
      this.execute('setGravity', gravity);
    }
  };

  Physijs.Scene.prototype.simulate = function (timeStep, maxSubSteps) {
    var object_id, object, update;

    if (this._is_simulating) {
      return false;
    }

    this._is_simulating = true;

    for (object_id in this._objects) {
      if (!this._objects.hasOwnProperty(object_id)) continue;

      object = this._objects[object_id];

      if (object.__dirtyPosition || object.__dirtyRotation) {
        update = {id: object._physijs.id};

        if (object.__dirtyPosition) {
          update.pos = {x: object.position.x, y: object.position.y, z: object.position.z};
          object.__dirtyPosition = false;
        }

        if (object.__dirtyRotation) {
          update.quat = {
            x: object.quaternion.x,
            y: object.quaternion.y,
            z: object.quaternion.z,
            w: object.quaternion.w
          };
          object.__dirtyRotation = false;
        }

        this.execute('updateTransform', update);
      }
    }

    this.execute('simulate', {timeStep: timeStep, maxSubSteps: maxSubSteps});

    return true;
  };


  // Phsijs.Mesh
  Physijs.Mesh = function (geometry, material, mass) {
    var index;

    if (!geometry) {
      return;
    }

    Eventable.call(this);
    THREE$1.Mesh.call(this, geometry, material);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    this._physijs = {
      type: null,
      id: getObjectId(),
      mass: mass || 0,
      touches: [],
      linearVelocity: new THREE$1.Vector3,
      angularVelocity: new THREE$1.Vector3
    };
  };
  Physijs.Mesh.prototype = new THREE$1.Mesh;
  Physijs.Mesh.prototype.constructor = Physijs.Mesh;
  Eventable.make(Physijs.Mesh);

  // Physijs.Mesh.mass
  Physijs.Mesh.prototype.__defineGetter__('mass', function () {
    return this._physijs.mass;
  });
  Physijs.Mesh.prototype.__defineSetter__('mass', function (mass) {
    this._physijs.mass = mass;
    if (this.world) {
      this.world.execute('updateMass', {id: this._physijs.id, mass: mass});
    }
  });

  // Physijs.Mesh.applyCentralImpulse
  Physijs.Mesh.prototype.applyCentralImpulse = function (force) {
    if (this.world) {
      this.world.execute('applyCentralImpulse', {id: this._physijs.id, x: force.x, y: force.y, z: force.z});
    }
  };

  // Physijs.Mesh.applyImpulse
  Physijs.Mesh.prototype.applyImpulse = function (force, offset) {
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
  };

  // Physijs.Mesh.applyTorque
  Physijs.Mesh.prototype.applyTorque = function (force) {
    if (this.world) {
      this.world.execute('applyTorque', {
        id: this._physijs.id,
        torque_x: force.x,
        torque_y: force.y,
        torque_z: force.z
      });
    }
  };

  // Physijs.Mesh.applyCentralForce
  Physijs.Mesh.prototype.applyCentralForce = function (force) {
    if (this.world) {
      this.world.execute('applyCentralForce', {id: this._physijs.id, x: force.x, y: force.y, z: force.z});
    }
  };

  // Physijs.Mesh.applyForce
  Physijs.Mesh.prototype.applyForce = function (force, offset) {
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
  };

  // Physijs.Mesh.getAngularVelocity
  Physijs.Mesh.prototype.getAngularVelocity = function () {
    return this._physijs.angularVelocity;
  };

  // Physijs.Mesh.setAngularVelocity
  Physijs.Mesh.prototype.setAngularVelocity = function (velocity) {
    if (this.world) {
      this.world.execute('setAngularVelocity', {id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z});
    }
  };

  // Physijs.Mesh.getLinearVelocity
  Physijs.Mesh.prototype.getLinearVelocity = function () {
    return this._physijs.linearVelocity;
  };

  // Physijs.Mesh.setLinearVelocity
  Physijs.Mesh.prototype.setLinearVelocity = function (velocity) {
    if (this.world) {
      this.world.execute('setLinearVelocity', {id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z});
    }
  };

  // Physijs.Mesh.setAngularFactor
  Physijs.Mesh.prototype.setAngularFactor = function (factor) {
    if (this.world) {
      this.world.execute('setAngularFactor', {id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z});
    }
  };

  // Physijs.Mesh.setLinearFactor
  Physijs.Mesh.prototype.setLinearFactor = function (factor) {
    if (this.world) {
      this.world.execute('setLinearFactor', {id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z});
    }
  };

  // Physijs.Mesh.setDamping
  Physijs.Mesh.prototype.setDamping = function (linear, angular) {
    if (this.world) {
      this.world.execute('setDamping', {id: this._physijs.id, linear: linear, angular: angular});
    }
  };

  // Physijs.Mesh.setCcdMotionThreshold
  Physijs.Mesh.prototype.setCcdMotionThreshold = function (threshold) {
    if (this.world) {
      this.world.execute('setCcdMotionThreshold', {id: this._physijs.id, threshold: threshold});
    }
  };

  // Physijs.Mesh.setCcdSweptSphereRadius
  Physijs.Mesh.prototype.setCcdSweptSphereRadius = function (radius) {
    if (this.world) {
      this.world.execute('setCcdSweptSphereRadius', {id: this._physijs.id, radius: radius});
    }
  };


  // Physijs.PlaneMesh
  Physijs.PlaneMesh = function (geometry, material, mass) {
    var width, height;

    Physijs.Mesh.call(this, geometry, material, mass);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

    this._physijs.type = 'plane';
    this._physijs.normal = geometry.faces[0].normal.clone();
    this._physijs.mass = (typeof mass === 'undefined') ? width * height : mass;
  };
  Physijs.PlaneMesh.prototype = new Physijs.Mesh;
  Physijs.PlaneMesh.prototype.constructor = Physijs.PlaneMesh;

  // Physijs.HeightfieldMesh
  Physijs.HeightfieldMesh = function (geometry, material, mass, xdiv, ydiv) {
    Physijs.Mesh.call(this, geometry, material, mass);

    this._physijs.type = 'heightfield';
    this._physijs.xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    this._physijs.ysize = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    this._physijs.xpts = (typeof xdiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : xdiv + 1;
    this._physijs.ypts = (typeof ydiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : ydiv + 1;
    // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
    this._physijs.absMaxHeight = Math.max(geometry.boundingBox.max.z, Math.abs(geometry.boundingBox.min.z));

    var points = [];

    var a, b;
    for (var i = 0; i < geometry.vertices.length; i++) {

      a = i % this._physijs.xpts;
      b = Math.round(( i / this._physijs.xpts ) - ( (i % this._physijs.xpts) / this._physijs.xpts ));
      points[i] = geometry.vertices[a + ( ( this._physijs.ypts - b - 1 ) * this._physijs.ypts )].z;

      //points[i] = geometry.vertices[i];
    }

    this._physijs.points = points;
  };
  Physijs.HeightfieldMesh.prototype = new Physijs.Mesh;
  Physijs.HeightfieldMesh.prototype.constructor = Physijs.HeightfieldMesh;

  // Physijs.BoxMesh
  Physijs.BoxMesh = function (geometry, material, mass) {
    var width, height, depth;

    Physijs.Mesh.call(this, geometry, material, mass);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'box';
    this._physijs.width = width;
    this._physijs.height = height;
    this._physijs.depth = depth;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  };
  Physijs.BoxMesh.prototype = new Physijs.Mesh;
  Physijs.BoxMesh.prototype.constructor = Physijs.BoxMesh;


  // Physijs.SphereMesh
  Physijs.SphereMesh = function (geometry, material, mass) {
    Physijs.Mesh.call(this, geometry, material, mass);

    if (!geometry.boundingSphere) {
      geometry.computeBoundingSphere();
    }

    this._physijs.type = 'sphere';
    this._physijs.radius = geometry.boundingSphere.radius;
    this._physijs.mass = (typeof mass === 'undefined') ? (4 / 3) * Math.PI * Math.pow(this._physijs.radius, 3) : mass;
  };
  Physijs.SphereMesh.prototype = new Physijs.Mesh;
  Physijs.SphereMesh.prototype.constructor = Physijs.SphereMesh;


  // Physijs.CylinderMesh
  Physijs.CylinderMesh = function (geometry, material, mass) {
    var width, height, depth;

    Physijs.Mesh.call(this, geometry, material, mass);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'cylinder';
    this._physijs.width = width;
    this._physijs.height = height;
    this._physijs.depth = depth;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  };
  Physijs.CylinderMesh.prototype = new Physijs.Mesh;
  Physijs.CylinderMesh.prototype.constructor = Physijs.CylinderMesh;


  // Physijs.CapsuleMesh
  Physijs.CapsuleMesh = function (geometry, material, mass) {
    var width, height, depth;

    Physijs.Mesh.call(this, geometry, material, mass);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'capsule';
    this._physijs.radius = Math.max(width / 2, depth / 2);
    this._physijs.height = height;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  };
  Physijs.CapsuleMesh.prototype = new Physijs.Mesh;
  Physijs.CapsuleMesh.prototype.constructor = Physijs.CapsuleMesh;


  // Physijs.ConeMesh
  Physijs.ConeMesh = function (geometry, material, mass) {
    var width, height, depth;

    Physijs.Mesh.call(this, geometry, material, mass);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

    this._physijs.type = 'cone';
    this._physijs.radius = width / 2;
    this._physijs.height = height;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height : mass;
  };
  Physijs.ConeMesh.prototype = new Physijs.Mesh;
  Physijs.ConeMesh.prototype.constructor = Physijs.ConeMesh;


  // Physijs.ConcaveMesh
  Physijs.ConcaveMesh = function (geom, material, mass, cGeometry, cScale) {
    var i,
      width, height, depth,
      vertices, face,
      geometry = cGeometry ? cGeometry : geom,
      triangles = new Array(geometry.faces.length);

    Physijs.Mesh.call(this, geom, material, mass);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    cScale = cScale || {x: 1, y: 1, z: 1};
    cScale.x = cScale.x || 1;
    cScale.y = cScale.y || 1;
    cScale.z = cScale.z || 1;

    vertices = geometry.vertices;

    for (i = 0; i < geometry.faces.length; i++) {
      face = geometry.faces[i];

      triangles[i] = [
        {x: vertices[face.a].x * cScale.x, y: vertices[face.a].y * cScale.y, z: vertices[face.a].z * cScale.z},
        {x: vertices[face.b].x * cScale.x, y: vertices[face.b].y * cScale.y, z: vertices[face.b].z * cScale.z},
        {x: vertices[face.c].x * cScale.x, y: vertices[face.c].y * cScale.y, z: vertices[face.c].z * cScale.z}
      ];
    }

    width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'concave';
    this._physijs.triangles = triangles;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  };
  Physijs.ConcaveMesh.prototype = new Physijs.Mesh;
  Physijs.ConcaveMesh.prototype.constructor = Physijs.ConcaveMesh;


  // Physijs.ConvexMesh
  Physijs.ConvexMesh = function (geometry, material, mass) {
    var i,
      width, height, depth,
      points = [];

    Physijs.Mesh.call(this, geometry, material, mass);

    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }

    for (i = 0; i < geometry.vertices.length; i++) {
      points.push({
        x: geometry.vertices[i].x,
        y: geometry.vertices[i].y,
        z: geometry.vertices[i].z
      });
    }


    width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'convex';
    this._physijs.points = points;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  };
  Physijs.ConvexMesh.prototype = new Physijs.Mesh;
  Physijs.ConvexMesh.prototype.constructor = Physijs.ConvexMesh;


  // Physijs.Vehicle
  Physijs.Vehicle = function (mesh, tuning) {
    tuning = tuning || new Physijs.VehicleTuning;
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
  };
  Physijs.Vehicle.prototype.addWheel = function (wheel_geometry, wheel_material, connection_point, wheel_direction, wheel_axle, suspension_rest_length, wheel_radius, is_front_wheel, tuning) {
    var wheel = new THREE$1.Mesh(wheel_geometry, wheel_material);
    wheel.castShadow = wheel.receiveShadow = true;
    wheel.position.copy(wheel_direction).multiplyScalar(suspension_rest_length / 100).add(connection_point);
    this.world.add(wheel);
    this.wheels.push(wheel);

    this.world.execute('addWheel', {
      id: this._physijs.id,
      connection_point: {x: connection_point.x, y: connection_point.y, z: connection_point.z},
      wheel_direction: {x: wheel_direction.x, y: wheel_direction.y, z: wheel_direction.z},
      wheel_axle: {x: wheel_axle.x, y: wheel_axle.y, z: wheel_axle.z},
      suspension_rest_length: suspension_rest_length,
      wheel_radius: wheel_radius,
      is_front_wheel: is_front_wheel,
      tuning: tuning
    });
  };
  Physijs.Vehicle.prototype.setSteering = function (amount, wheel) {
    if (wheel !== undefined && this.wheels[wheel] !== undefined) {
      this.world.execute('setSteering', {id: this._physijs.id, wheel: wheel, steering: amount});
    } else if (this.wheels.length > 0) {
      for (var i = 0; i < this.wheels.length; i++) {
        this.world.execute('setSteering', {id: this._physijs.id, wheel: i, steering: amount});
      }
    }
  };
  Physijs.Vehicle.prototype.setBrake = function (amount, wheel) {
    if (wheel !== undefined && this.wheels[wheel] !== undefined) {
      this.world.execute('setBrake', {id: this._physijs.id, wheel: wheel, brake: amount});
    } else if (this.wheels.length > 0) {
      for (var i = 0; i < this.wheels.length; i++) {
        this.world.execute('setBrake', {id: this._physijs.id, wheel: i, brake: amount});
      }
    }
  };
  Physijs.Vehicle.prototype.applyEngineForce = function (amount, wheel) {
    if (wheel !== undefined && this.wheels[wheel] !== undefined) {
      this.world.execute('applyEngineForce', {id: this._physijs.id, wheel: wheel, force: amount});
    } else if (this.wheels.length > 0) {
      for (var i = 0; i < this.wheels.length; i++) {
        this.world.execute('applyEngineForce', {id: this._physijs.id, wheel: i, force: amount});
      }
    }
  };

  // Physijs.VehicleTuning
  Physijs.VehicleTuning = function (suspension_stiffness, suspension_compression, suspension_damping, max_suspension_travel, friction_slip, max_suspension_force) {
    this.suspension_stiffness = suspension_stiffness !== undefined ? suspension_stiffness : 5.88;
    this.suspension_compression = suspension_compression !== undefined ? suspension_compression : 0.83;
    this.suspension_damping = suspension_damping !== undefined ? suspension_damping : 0.88;
    this.max_suspension_travel = max_suspension_travel !== undefined ? max_suspension_travel : 500;
    this.friction_slip = friction_slip !== undefined ? friction_slip : 10.5;
    this.max_suspension_force = max_suspension_force !== undefined ? max_suspension_force : 6000;
  };

  const loadJson = new THREE$1.JSONLoader().load;
  const loadTexture = new THREE$1.TextureLoader().load;
  const loadFont$1 = new THREE$1.FontLoader().load;

  const extend = (object, ...extensions) => { // $.extend alternative, ... is the spread operator.
    for (const extension of extensions) {
      // console.log(extension);
      // console.log(typeof extension);

      if (!extension)
        continue; // Ignore null and undefined objects and paramaters.

      for (const prop of Object.getOwnPropertyNames(extension)) { // Do not traverse the prototype chain.
        if (object[prop] !== undefined
          && object[prop].toString() === '[object Object]'
          && extension[prop].toString() === '[object Object]')

          // Goes deep only if object[prop] and extension[prop] are both objects !
          extend(object[prop], extension[prop]);

        else
          object[prop] = (object[prop] === 0) ? 0 : object[prop];
        if (typeof object[prop] === 'undefined') object[prop] = extension[prop]; // Add values that do not already exist.
      }
    }

    return object;
  };

  const texture = (url, options) => {
    const texture = loadTexture(url);

    if (options) {
      const opt = Object.assign({}, options, {
        offset: {
          x: 0,
          y: 0
        },
        repeat: {
          x: 1,
          y: 1
        }
      });

      texture.wrapS = texture.wrapT = THREE$1.RepeatWrapping;

      texture.offset.set(opt.offset.x, opt.offset.y);
      texture.repeat.set(opt.repeat.x, opt.repeat.y);

      texture.magFilter = THREE$1.NearestFilter;
      texture.minFilter = THREE$1.LinearMipMapLinearFilter;
    }

    return texture;
  };

  const loadMaterial = (material = {}, isPhysics = true) => {
    if (typeof material.kind !== 'string')
      console.error('Type of material is undefined or not a string. @loadMaterial');

    const scope = {
      _type: material.kind,
      _restitution: !isNaN(parseFloat(material.restitution)) ?
        material.restitution : !isNaN(parseFloat(material.rest)) ?
        material.rest : 0.3,
      _friction: !isNaN(parseFloat(material.friction)) ?
        material.friction : !isNaN(parseFloat(material.fri)) ?
        material.fri : 0.8
    };

    if (material.texture) material.map = texture(material.texture);

    const params = Object.assign({}, material);

    delete params.kind;

    delete params.friction;
    delete params.fri;

    delete params.restitution;
    delete params.rest;

    delete params.useCustomMaterial;
    delete params.useVertexColors;

    switch (material.kind) {
      case 'basic':
        scope._material = new THREE$1.MeshBasicMaterial(params);
        break;

      case 'linebasic':
        scope._material = new THREE$1.LineBasicMaterial(params);
        break;

      case 'linedashed':
        scope._material = new THREE$1.LineDashedMaterial(params);
        break;

      case 'material':
        scope._material = new THREE$1.Material(params);
        break;

      case 'depth':
        scope._material = new THREE$1.MeshDepthMaterial(params);
        break;

      case 'face':
        scope._material = new THREE$1.MeshFaceMaterial(params);
        break;

      case 'lambert':
        scope._material = new THREE$1.MeshLambertMaterial(params);
        break;

      case 'normal':
        scope._material = new THREE$1.MeshNormalMaterial(params);
        break;

      case 'phong':
        scope._material = new THREE$1.MeshPhongMaterial(params);
        break;

      case 'pointcloud':
        scope._material = new THREE$1.PointCloudMaterial(params);
        break;

      case 'rawshader':
        scope._material = new THREE$1.RawShaderMaterial(params);
        break;

      case 'shader':
        scope._material = new THREE$1.ShaderMaterial(params);
        break;

      case 'spritecanvas':
        scope._material = new THREE$1.SpriteCanvasMaterial(params);
        break;

      case 'sprite':
        scope._material = new THREE$1.SpriteMaterial(params);
        break;

      default:
    }

    if (isPhysics) {
      scope._materialP = Physijs.createMaterial(
        scope._material,
        scope._friction,
        scope._restitution
      );
    }

    return scope;
  };

  class WHSObject {
    /**
     * Constructing WHS.Shape object.
     *
     * @param {Boolean} structurable - true if object has parents and children.
     * @param {String} type - Shape type.
     * @return {WHS.Object}
     */
    constructor(defaults = {}, structurable = true) {
      const scope = structurable
      ? Object.assign(this,
        {
          __whsobject: true,
          __releaseTime: new Date().getTime(),
          __params: {},
          __defaults: defaults,

          parent: null,
          children: []
        },
      new Events())
      : Object.assign(this,
        {
          __whsobject: true,
          __releaseTime: new Date().getTime(),
          __params: {}
        },
      new Events());

      return scope;
    }

    setParams(params = {}) {
      this.__params = extend(params, this.__defaults);
    }

    updateParams(params = {}) {
      this.__params = extend(params, this.__params);
    }

    getParams() {
      return this.__params;
    }

    add(children) {
      const _scope = this;

      if (children instanceof WHS.Shape || children instanceof WHS.Light)
        return children.addTo(this);
      else if (children instanceof WHS.Object) {
        return new Promise((resolve) => {
          children.parent = _scope;

          _scope.getNative().add(children.getNative());
          _scope.children.push(_scope);

          resolve();
        });
      }
    }
  }

  class Camera extends WHSObject {
    constructor(params, type) {
      if (!type) console.error('@constructor: Please specify " type ".');

      const _set = (x, y, z) => {
        this.x = x;
        this.y = y;
        this.z = z;
      };

      params.useTarget = Boolean(params.target);

      super({
        camera: {
          fov: 45,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 1000,
          left: window.innerWidth / -2,
          right: window.innerWidth / 2,
          top: window.innerHeight / 2,
          bottom: window.innerHeight / -2,
          cubeResolution: 128
        },
        helper: false,
        pos: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        },
        rot: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        },
        target: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        }
      });

      super.setParams(params);

      const scope = Object.assign(this, {
        _type: type,
        helper: false
      });

      if (WHS.debug)
        console.debug(`@WHS.Camera: Camera ${scope._type} found.`, scope);

      return scope;
    }

    wrap(...tags) {
      return new Promise((resolve, reject) => {
        try {
          this.position.set(
            this.__params.pos.x,
            this.__params.pos.y,
            this.__params.pos.z
          );

          this.rotation.set(
            this.__params.rot.x,
            this.__params.rot.y,
            this.__params.rot.z
          );

          if (this.__params.useTarget) this.lookAt(this.__params.target);

          if (this.__params.helper) {
            this.helper = new THREE$1.CameraHelper(
              this.getNative()
            );
          }

          tags.forEach(tag => {
            this[tag] = true;
          });

          if (WHS.debug)
            console.debug(`@WHS.Camera: Camera ${this._type} is ready.`, this);

          this.emit('ready');

          resolve(this);
        } catch (err) {
          console.error(err.message);
          reject();
        }
      });
    }

    addTo(parent) {
      this.parent = parent;

      const _helper = this.helper,
        _scope = this;

      return new Promise((resolve, reject) => {
        try {
          _scope.parent.getScene().add(_scope.getNative());
          _scope.parent.children.push(_scope);

          if (_helper) _scope.parent.getScene().add(_helper);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (WHS.debug) {
            console.debug(
              `@WHS.Camera: Camera ${_scope._type} was added to world.`,
              [_scope, _scope.parent]
            );
          }

          resolve(_scope);

          _scope.emit('ready');
        }
      });
    }

    /**
     * Clone camera.
     */
    clone() {
      return new Shape(this.__params, this._type).copy(this);
    }

    /**
     * Copy camera.
     *
     * @param {WHS.Camera} source - Source object, that will be applied to this.
     */
    copy(source) {
      this.mesh = source.mesh.clone();

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();

      this._type = source._type;

      return this;
    }

    setNative(native) {
      this.native = native;
      return this.native;
    }

    getNative() {
      return this.native;
    }

    get position() {
      return this.getNative().position;
    }

    set position(vector3) {
      return this.getNative().position.copy(vector3);
    }

    get rotation() {
      return this.getNative().rotation;
    }

    set rotation(euler) {
      return this.getNative().rotation.copy(euler);
    }

    follow(curve, time = 1000, loop, lookAt) {
      const _scope = this,
        gEnd = time;

      let animation = new Loop(clock => {
        const u = clock.getElapsedTime() * 1000 / gEnd,
          vec1 = curve.getPoint(u),
          vec2 = curve.getPoint((u + 0.01) % 1);

        _scope.position.set(vec1.x, vec1.y, vec1.z);

        if (!lookAt) _scope.lookAt(vec2);
        else if (lookAt instanceof TVector3) _scope.lookAt(lookAt);
        else if (
            lookAt instanceof TCurve
            || lookAt instanceof TCurvePath
          ) _scope.lookAt(lookAt.getPoint(u));
      });

      animation.start();

      if (loop) {
        setInterval(() => {
          animation.stop();

          animation = new Loop(clock => {
            const u = clock.getElapsedTime() * 1000 / gEnd,
              vec1 = curve.getPoint(u),
              vec2 = curve.getPoint((u + 0.01) % 1);

            _scope.position.set(vec1.x, vec1.y, vec1.z);

            if (!lookAt) _scope.lookAt(vec2);
            else if (lookAt instanceof TVector3) _scope.lookAt(lookAt);
            else if (
                lookAt instanceof TCurve
                || lookAt instanceof TCurvePath
              ) _scope.lookAt(lookAt.getPoint(u));
          });

          animation.start();
        }, time);
      } else {
        setTimeout(() => {
          animation.stop();
        }, time);
      }
    }

    lookAt(vector3) {
      return this.getNative().lookAt(vector3);
    }

    getWorldDirection(vector3) {
      return this.getNative().getWorldDirection(vector3);
    }
  }

  class CubeCamera extends Camera {
    constructor(params = {}) {
      super(params, 'cubecamera');

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      return new Promse((resolve) => {
        this.setNative(new THREE$1.CubeCamera(
          params.camera.near,
          params.camera.far,
          params.camera.cubeResolution
        ));

        resolve();
      });
    }
  }

  class OrtographicCamera extends Camera {
    constructor(params = {}) {
      super(params, 'ortographiccamera');

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      return new Promise((resolve) => {
        this.setNative(new THREE$1.OrtographicCamera(
          params.camera.left,
          params.camera.right,
          params.camera.top,
          params.camera.bottom,
          params.camera.near,
          params.camera.far
        ));

        resolve();
      });
    }
  }

  class PerspectiveCamera extends Camera {
    constructor(params = {}) {
      super(params, 'perspectivecamera');

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      return new Promise((resolve) => {
        this.setNative(new THREE$1.PerspectiveCamera(
          params.camera.fov,
          params.camera.aspect,
          params.camera.near,
          params.camera.far
        ));

        resolve();
      });
    }
  }

  class Curve extends WHSObject {
    /**
     * Create curve.
     *
     * Todo
     */
    constructor(params) {
      super({
        geometry: {
          curve: false,
          points: 50
        }
      });

      super.setParams(params);

      const geometry = new THREE$1.Geometry();

      geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

      const curve = new THREE$1.Line(
          geometry,
          loadMaterial(params.material, false)._material
      );

      this.setNative(curve);

      const scope = Object.assign(this,
        {
          _type: 'curve',
          __path: params.geometry.curve
        }
      );

      return scope;
    }

      /**
       * Add curve to scene.
       */
    addTo(parent) {
      const _scope = this;
      _scope.parent = parent;

      return new Promise((resolve, reject) => {
        try {
          _scope.parent.getScene().add(_scope.getNative());
          _scope.parent.children.push(_scope);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (WHS.debug) {
            console.debug(
              `@WHS.Curve: Curve ${_scope._type} was added to world.`,
              [_scope, _scope.parent]
            );
          }

          resolve(_scope);
        }
      });
    }

    /* Access private data */
    setNative(native) {
      this.native = native;
      return this.native;
    }

    getNative() {
      return this.native;
    }

      /**
       * Clone curve.
       */
    clone() {
      return new Curve(this.__params).copy(this);
    }

      /**
       * Copy curve.
       *
       * @param {WHS.Curve} source - Source object, that will be applied to this.
       */
    copy(source) {
      this.setNative(source.getNative().clone());

      this._type = source._type;

      return this;
    }

      /**
       * Remove this curve from world.
       *
       * @return {WHS.Curve} - this.
       */
    remove() {
      this.parent.getScene().remove(this.getNative());

      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;

      this.emit('remove');

      if (WHS.debug) {
        console.debug(
          `@WHS.Curve: Curve ${this._type} was removed from world`,
          [_scope]
        );
      }

      return this;
    }
  }

  class Light extends WHSObject {
    /**
     * Constructing WHS.Light object.
     *
     * @param {Object} params - Inputed parameters.
     * @param {String} type - Light type.
     * @return {WHS.Light}
     */
    constructor(params, type) {
      if (!type)
        console.error('@constructor: Please specify " type ".');

      const _set = (x, y, z) => {
        this.x = x;
        this.y = y;
        this.z = z;
      };

      // Polyfill for 3D.
      super({

        light: {
          color: 0xffffff,
          skyColor: 0xffffff,
          groundColor: 0xffffff,

          intensity: 1,
          distance: 100,
          angle: Math.PI / 3,
          exponent: 0,
          decay: 1
        },

        helper: false,

        shadowmap: {
          cast: true,

          bias: 0,

          width: 1024,
          height: 1024,

          near: true,
          far: 400,
          fov: 60,
          darkness: 0.3,

          top: 200,
          bottom: -200,
          left: -200,
          right: 200
        },

        pos: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        },

        rot: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        },

        target: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        }

      });

      super.setParams(params);

      const scope = Object.assign(this,
        {
          _type: type,

          _light: this.__params.light,
          _shadowmap: this.__params.shadowmap
        });

      if (WHS.debug)
        console.debug(`@WHS.Light: Light ${scope._type} found.`, scope);

      return scope;
    }

    /**
     * Applying shadow & position & rotation.
     *
     * @param {...String} tags - Tags that defines what to do with light
     * additionally.
     */
    wrap(...tags) {
      const _scope = this;

      return new Promise((resolve, reject) => {
        try {
          if (tags.indexOf('noshadows') < 0) {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;
          }

          _scope.position.set(
            _scope.__params.pos.x,
            _scope.__params.pos.y,
            _scope.__params.pos.z
          );

          _scope.rotation.set(
            _scope.__params.rot.x,
            _scope.__params.rot.y,
            _scope.__params.rot.z
          );

          tags.forEach(tag => {
            _scope[tag] = true;
          });

          if (WHS.debug)
            console.debug(`@WHS.Light: Light ${_scope._type} + ' is ready.`, _scope);

          _scope.emit('ready');

          resolve(_scope);
        } catch (err) {
          console.error(err.message);
          reject();
        }
      });
    }

    /**
     * Add light to WHS.World object.
     *
     * @param {WHS.World} root - World, were this light will be.
     * @param {...String} tags - Tags for compiling.
     */
    addTo(parent) {
      this.parent = parent;

      const _helper = this.helper,
        _scope = this;

      return new Promise((resolve, reject) => {
        try {
          _scope.parent.getScene().add(_scope.getNative());
          _scope.parent.children.push(_scope);

          if (_helper) _scope.parent.getScene().add(_helper);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (WHS.debug) {
            console.debug(
              `@WHS.Camera: Camera ${_scope._type} was added to world.`,
              [_scope, _scope.parent]
            );
          }

          resolve(_scope);
          _scope.emit('ready');
        }
      });
    }

    /**
     * Set shadow properties for light.
     */
    wrapShadow() {
      const _scope = this;

      return new Promise((resolve, reject) => {
        try {
          _scope.getNative().shadow.mapSize.width = this._shadowmap.width;
          _scope.getNative().shadow.mapSize.height = this._shadowmap.height;
          _scope.getNative().shadow.bias = this._shadowmap.bias;

          _scope.getNative().shadow.camera.near = this._shadowmap.near;
          _scope.getNative().shadow.camera.far = this._shadowmap.far;
          _scope.getNative().shadow.camera.fov = this._shadowmap.fov;

          _scope.getNative().shadow.camera.left = this._shadowmap.left;
          _scope.getNative().shadow.camera.right = this._shadowmap.right;
          _scope.getNative().shadow.camera.top = this._shadowmap.top;
          _scope.getNative().shadow.camera.bottom = this._shadowmap.bottom;
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          resolve(_scope);
        }
      });
    }

    /**
     * Clone light.
     */
    clone() {
      return new Light(this.__params, this._type).copy(this);
    }

    /**
     * Copy light.
     *
     * @param {WHS.Light} source - Source object, that will be applied to this.
     */
    copy(source) {
      this.light = source.getNative().clone();
      if (source.helper) this.helper = source.helper.clone();

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();

      this._type = source._type;

      return this;
    }

    /**
     * Remove this light from world.
     */
    remove() {
      this.parent.getScene().remove(this.getNative());
      if (source.helper) this.parent.getScene().remove(this.helper);

      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;

      this.emit('remove');

      return this;
    }

    /* Access private data */

    setNative(native) {
      this.native = native;
      return this.native;
    }

    getNative() {
      return this.native;
    }

    get position() {
      return this.getNative().position;
    }

    set position(vector3) {
      return this.getNative().position.copy(vector3);
    }

    get rotation() {
      return this.getNative().rotation;
    }

    set rotation(euler) {
      return this.getNative().rotation.copy(euler);
    }

    get target() {
      return this.getNative().target.position;
    }

    set target(vector3) {
      return this.getNative().target.position.copy(vector3);
    }

    follow(curve, time = 1000, loop, lookAt) {
      const _scope = this,
        gEnd = time;

      let animation = new Loop(clock => {
        const u = clock.getElapsedTime() * 1000 / gEnd,
          vec1 = curve.getPoint(u),
          vec2 = curve.getPoint((u + 0.01) % 1);

        _scope.position.set(vec1.x, vec1.y, vec1.z);

        if (!lookAt) _scope.lookAt(vec2);
        else if (lookAt instanceof THREE$1.Vector3) _scope.lookAt(lookAt);
        else if (
            lookAt instanceof THREE$1.Curve
            || lookAt instanceof THREE$1.CurvePath
          ) _scope.lookAt(lookAt.getPoint(u));
      });

      animation.start();

      if (loop) {
        setInterval(() => {
          animation.stop();

          animation = new Loop(clock => {
            const u = clock.getElapsedtime() * 1000 / gEnd,
              vec1 = curve.getPoint(u),
              vec2 = curve.getPoint((u + 0.01) % 1);

            _scope.position.set(vec1.x, vec1.y, vec1.z);

            if (!lookAt) _scope.lookAt(vec2);
            else if (lookAt instanceof THREE$1.Vector3) _scope.lookAt(lookAt);
            else if (
                lookAt instanceof THREE$1.Curve
                || lookAt instanceof THREE$1.CurvePath
              ) _scope.lookAt(lookAt.getPoint(u));
          });

          animation.start();
        }, time);
      } else {
        setTimeout(() => {
          animation.stop();
        }, time);
      }
    }
  }

  var stats_min = __commonjs(function (module) {
  // stats.js - http://github.com/mrdoob/stats.js
  var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
  if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
  Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
  v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);
  });

  var Stats = (stats_min && typeof stats_min === 'object' && 'default' in stats_min ? stats_min['default'] : stats_min);

  class World extends WHSObject {
    /**
     * Create a 3D world and define defaults.
     *
     * @param {object} params - The scene settings object.
     * @return {World} A 3D world whs object.
     */
    constructor(params = {}) {
      super({

        stats: false,
        autoresize: false,

        shadowmap: {
          enabled: true,
          type: THREE$1.PCFSoftShadowMap
        },

        helpers: {
          grid: false,
          axis: false
        },

        gravity: {
          x: 0,
          y: 0,
          z: 0
        },

        camera: {
          aspect: 75,
          near: 1,
          far: 1000,

          x: 0,
          y: 0,
          z: 0
        },

        rWidth: 1, // Resolution(width).
        rHeight: 1, // Resolution(height).

        width: window.innerWidth, // Container(width).
        height: window.innerHeight, // Container(height).

        physics: {

          quatNormalizeSkip: 0,
          quatNormalizeFast: false,

          solver: {
            iterations: 20,
            tolerance: 0
          },

          defMaterial: {
            contactEquationStiffness: 1e8,
            contactEquationRegularizationTime: 3
          }

        },

        background: 0x000000,
        assets: './assets',
        container: document.body,

        paths: {
          worker: '../libs/physijs_worker.js',
          ammo: '../libs/ammo.js'
        }

      });

      super.setParams(params);

      // INIT.
      this._initScene();
      this._initDOM();
      this._initStats();
      this._initCamera();
      this._initRenderer();
      this._initHelpers();

      // NOTE: ==================== Autoresize. ======================
      const scope = this;

      if (this.getParams().autoresize) {
        window.addEventListener('resize', () => {
          scope.setSize(window.innerWidth, window.innerHeight);
        });
      }

      scope.loops = [];

      return scope;
    }

    /**
     * Initialize THREE.js scene object.
     */
    _initScene() {
      this._initPhysiJS();

      const scene = new Physijs.Scene();

      scene.setGravity(
        new THREE$1.Vector3(
          this.getParams().gravity.x,
          this.getParams().gravity.y,
          this.getParams().gravity.z
        )
      );

      this.setScene(scene);

      // Array for processing.
      this.children = [];
    }

    addLoop(loop) {
      this.loops.push(loop); // TODO: Process loops on start
      // like: this.loops.forEach((elem) => elem.start());
    }

    removeLoop(loop) {
      this.loops.filter((l) => l !== loop);
    }

    /**
     * Set Physi.js scripts pathes.
     */
    _initPhysiJS() {
      this.simulate = true;

      Physijs.scripts.worker = this.getParams().paths.worker;
      Physijs.scripts.ammo = this.getParams().paths.ammo;
    }

    /**
     * Initialize DOM structure for whitestorm.
     */
    _initDOM() {
      this.getParams().container.style.margin = 0;
      this.getParams().container.style.padding = 0;
      this.getParams().container.style.position = 'relative';
      this.getParams().container.style.overflow = 'hidden';

      this._dom = document.createElement('div');
      this._dom.className = 'whs';

      this.getParams().container.appendChild(this._dom);

      return this._dom;
    }

    /**
     * Inititialize stats plugin.
     */
    _initStats() {
      // Debug Renderer
      if (this.getParams().stats) {
        this._stats = new Stats();

        if (this.getParams().stats === 'fps')
          this._stats.setMode(0);

        else if (this.getParams().stats === 'ms')
          this._stats.setMode(1);

        else if (this.getParams().stats === 'mb')
          this._stats.setMode(1);

        else {
          this._stats.setMode(0);
          console.warn([this._stats], 'Please, apply stats mode [fps, ms, mb] .');
        }

        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '0px';
        this._stats.domElement.style.bottom = '0px';

        this._dom.appendChild(this._stats.domElement);
      }
    }

    /**
     * Create a camera and add it to scene.
     */
    _initCamera() {
      console.log(this.getParams());

      this.setCamera(new PerspectiveCamera({
        camera: {
          fov: this.getParams().camera.aspect,
          aspect: this.getParams().width / this.getParams().height,
          near: this.getParams().camera.near,
          far: this.getParams().camera.far
        },

        pos: {
          x: this.getParams().camera.x,
          y: this.getParams().camera.y,
          z: this.getParams().camera.z
        }
      }));

      this.getCamera().addTo(this);
    }

    /**
     * Create a renderer and apply it's options.
     */
    _initRenderer() {
      this.render = true;

          // Renderer.
      this.setRenderer(new THREE$1.WebGLRenderer());
      this.getRenderer().setClearColor(this.getParams().background);

          // Shadowmap.
      this.getRenderer().shadowMap.enabled = this.getParams().shadowmap.enabled;
      this.getRenderer().shadowMap.type = this.getParams().shadowmap.type;
      this.getRenderer().shadowMap.cascade = true;

      this.getRenderer().setSize(
              Number(this.getParams().width * this.getParams().rWidth).toFixed(),
              Number(this.getParams().height * this.getParams().rHeight).toFixed()
          );

      this.getRenderer().render(this.getScene(), this.getCamera().getNative());

      this._dom.appendChild(this.getRenderer().domElement);

      this.getRenderer().domElement.style.width = '100%';
      this.getRenderer().domElement.style.height = '100%';
    }

    /**
     * Add helpers to scene.
     */
    _initHelpers() {
      if (this.getParams().helpers.axis) {
        this.getScene().add(
          new THREE$1.AxisHelper(
            this.getParams().helpers.axis.size
            ? this.getParams().helpers.axis.size
            : 5
          )
        );
      }

      if (this.getParams().helpers.grid) {
        this.getScene().add(
          new THREE$1.GridHelper(
            this.getParams().helpers.grid.size
            ? this.getParams().helpers.grid.size
            : 10,
            this.getParams().helpers.grid.step
            ? this.getParams().helpers.grid.step
            : 1
          )
        );
      }
    }

    /**
     * Start animation.
     */
    start() {
      const clock = new THREE$1.Clock(),
        scope = this,
        scene = scope.getScene(),
        cameraNative = scope.getCamera().getNative(),
        renderer = scope.getRenderer();

      window.requestAnimFrame = (() => {
        return window.requestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.mozRequestAnimationFrame
          || function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      function reDraw(time) {
        window.requestAnimFrame(reDraw);

        // Init stats.
        if (scope._stats) scope._stats.begin();

        scope._process(clock);

        if (scope.simulate) scene.simulate();
        if (scope.controls) scope._updateControls();

        // Effects rendering.
        if (scope._composer && scope.render) {
          scope._composer.reset();
          scope._composer.render(scene, cameraNative);
          scope._composer.pass(scope._composer.stack);
          scope._composer.toScreen();
        } else if (scope.render) renderer.render(scene, cameraNative);

        scope._execLoops(time);

        // End helper.
        if (scope._stats) scope._stats.end();
      }

      this._update = reDraw;

      scope._update();
    }

    /**
     * Execute all loops with a specific time.
     *
     * @params {number} time - The time value that will be passed to loops.
     */
    _execLoops(time) {
      for (let i = 0; i < this.loops.length; i++) {
        const e = this.loops[i];
        if (e.enabled) e.execute(e.clock, time);
      }
    }

    /**
     * Update controls time values.
     */
    _updateControls() {
      this.controls.update(Date.now() - this.time);
      this.time = Date.now();
    }

    /**
     * Update morphs animations.
     *
     * @params {THREE.Clock} clock - The clock object, which.
     */
    _process(clock) {
      const delta = clock.getDelta();

      for (let i = 0; i < this.children.length; i++)
        if (this.children[i]._type === 'morph') this.children[i].getNative().mixer.update(delta);
    }

    /**
     * This functon will scene properties when it's called.
     */
    setSize(width = 1, height = 1) {
      this.getCamera().getNative().aspect = width / height;
      this.getCamera().getNative().updateProjectionMatrix();

      this.getRenderer().setSize(
        Number(width * this.getParams().rWidth).toFixed(),
        Number(height * this.getParams().rHeight).toFixed()
      );
    }

    setScene(scene) {
      this.scene = scene;
      return this.scene;
    }

    getScene() {
      return this.scene;
    }

    setRenderer(renderer) {
      this.renderer = renderer;
      return this.renderer;
    }

    getRenderer() {
      return this.renderer;
    }

    /**
     * Set a camera for rendering world.
     *
     * @params {WHS.Camera} camera - The camera to be rendered.
     */
    setCamera(camera) {
      if (camera instanceof Camera)
        this.camera = camera;
      else
        console.error('@WHS.World: camera in not an instance of WHS.Camera.');
    }

    getCamera() {
      return this.camera;
    }
  }

  class Shape$1 extends WHSObject {
    /**
     * Constructing WHS.Shape object.
     *
     * @param {Object} params - Inputed parameters.
     * @param {String} type - Shape type.
     * @return {WHS.Shape}
     */
    constructor(params, type) {
      if (!type) console.error('@constructor: Please specify " type ".');

      const _set = (x, y, z) => {
        this.x = x;
        this.y = y;
        this.z = z;
      };

      super({

        mass: 10,

        helpers: {
          box: false,
          boundingBox: false,
          edges: false,
          faceNormals: false
        },

        pos: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        },

        rot: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        },

        scale: {
          x: 1,
          y: 1,
          z: 1,
          set: _set
        },

        target: {
          x: 0,
          y: 0,
          z: 0,
          set: _set
        },

        morph: {
          speed: 1,
          duration: 1
        },

        physics: true

      });

      super.setParams(params);

      const scope = Object.assign(this,
        {
          _type: type,
          __params: params,

          wait: [],
          helpers: {
            box: false
          },

          physics: params.physics
        });

      if (WHS.debug) console.debug(`@WHS.Shape: Shape ${scope._type} found.`, scope);

      return scope;
    }

    wait(promise) {
      this.wait.push(promise);
      return this;
    }

    /**
     * Applying shadow & position & rotation.
     *
     * @param {...String} tags - Tags that defines what to do with shape
     * additionally.
     */
    wrap(...tags) {
      const _scope = this;

      if (tags.indexOf('wait') >= 0) {
        return new Promise((resolve, reject) => {
          Promise.all(_scope.wait).then(() => {
            try {
              _scope.getNative().castShadow = true;
              _scope.getNative().receiveShadow = true;

              _scope.position.set(
                _scope.__params.pos.x,
                _scope.__params.pos.y,
                _scope.__params.pos.z
              );

              _scope.rotation.set(
                _scope.__params.rot.x,
                _scope.__params.rot.y,
                _scope.__params.rot.z
              );

              _scope.scale.set(
                _scope.__params.scale.x,
                _scope.__params.scale.y,
                _scope.__params.scale.z
              );

              // Box helper.
              if (_scope.__params.helpers.box) {
                _scope.helpers.box = new THREE$1.BoxHelper(
                  _scope.getNative()
                );
              }

              // Bounding box helper.
              if (_scope.__params.helpers.boundingBox) {
                _scope.helpers.boundingBox = new THREE$1.BoundingBoxHelper(
                  _scope.getNative(),
                  _scope.__params.helpers.boundingBox.color
                  ? _scope.__params.helpers.boundingBox.color
                  : 0xffffff
                );
              }

              // Edges helper.
              if (_scope.__params.helpers.edges) {
                _scope.helpers.edges = new THREE$1.EdgesHelper(
                  _scope.getNative(),
                  _scope.__params.helpers.edges.color
                  ? _scope.__params.helpers.edges.color
                  : 0xffffff
                );
              }

              // faceNormals helper.
              if (_scope.__params.helpers.faceNormals) {
                _scope.helpers.faceNormals = new THREE$1.FaceNormalsHelper(
                  _scope.getNative(),
                  _scope.__params.helpers.faceNormals.size
                  ? _scope.__params.helpers.faceNormals.size
                  : 2,
                  _scope.__params.helpers.faceNormals.color
                  ? _scope.__params.helpers.faceNormals.color
                  : 0xffffff,
                  _scope.__params.helpers.faceNormals.linewidth
                  ? _scope.__params.helpers.faceNormals.linewidth
                  : 1
                );
              }

              // vertexNormals helper.
              if (_scope.__params.helpers.vertexNormals) {
                _scope.helpers.vertexNormals = new THREE$1.VertexNormalsHelper(
                  _scope.getNative(),
                  _scope.__params.helpers.vertexNormals.size
                  ? _scope.__params.helpers.vertexNormals.size
                  : 2,
                  _scope.__params.helpers.vertexNormals.color
                  ? _scope.__params.helpers.vertexNormals.color
                  : 0xffffff,
                  _scope.__params.helpers.vertexNormals.linewidth
                  ? _scope.__params.helpers.vertexNormals.linewidth
                  : 1
                );
              }

              if (WHS.debug) console.debug(`@WHS.Shape: Shape ${_scope._type} is ready.`, _scope);

              _scope.emit('ready');

              resolve();
            } catch (err) {
              console.error(err.message);
              reject();
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          try {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;

            _scope.position.set(
              _scope.__params.pos.x,
              _scope.__params.pos.y,
              _scope.__params.pos.z
            );

            _scope.rotation.set(
              _scope.__params.rot.x,
              _scope.__params.rot.y,
              _scope.__params.rot.z
            );

            _scope.scale.set(
              _scope.__params.scale.x,
              _scope.__params.scale.y,
              _scope.__params.scale.z
            );

            // Box helper.
            if (_scope.__params.helpers.box) {
              _scope.helpers.box = new THREE$1.BoxHelper(
                _scope.getNative()
              );
            }

            // Bounding box helper.
            if (_scope.__params.helpers.boundingBox) {
              _scope.helpers.boundingBox = new THREE$1.BoundingBoxHelper(
                _scope.getNative(),
                _scope.__params.helpers.boundingBox.color
                ? _scope.__params.helpers.boundingBox.color
                : 0xffffff
              );
            }

            // Edges helper.
            if (_scope.__params.helpers.edges) {
              _scope.helpers.edges = new THREE$1.EdgesHelper(
                _scope.getNative(),
                _scope.__params.helpers.edges.color
                ? _scope.__params.helpers.edges.color
                : 0xffffff
              );
            }

            // faceNormals helper.
            if (_scope.__params.helpers.faceNormals) {
              _scope.helpers.faceNormals = new THREE$1.FaceNormalsHelper(
                _scope.getNative(),
                _scope.__params.helpers.faceNormals.size
                ? _scope.__params.helpers.faceNormals.size
                : 2,
                _scope.__params.helpers.faceNormals.color
                ? _scope.__params.helpers.faceNormals.color
                : 0xffffff,
                _scope.__params.helpers.faceNormals.linewidth
                ? _scope.__params.helpers.faceNormals.linewidth
                : 1
              );
            }

            // vertexNormals helper.
            if (_scope.__params.helpers.vertexNormals) {
              _scope.helpers.vertexNormals = new THREE$1.VertexNormalsHelper(
                _scope.getNative(),
                _scope.__params.helpers.vertexNormals.size
                ? _scope.__params.helpers.vertexNormals.size
                : 2,
                _scope.__params.helpers.vertexNormals.color
                ? _scope.__params.helpers.vertexNormals.color
                : 0xffffff,
                _scope.__params.helpers.vertexNormals.linewidth
                ? _scope.__params.helpers.vertexNormals.linewidth
                : 1
              );
            }

            if (WHS.debug) console.debug(`@WHS.Shape: Shape ${_scope._type} is ready.`, _scope);

            resolve();

            _scope.emit('ready');
          } catch (err) {
            console.error(err.message);
            reject();
          }
        });
      }
    }

    /**
     * Add shape to WHS.World object.
     *
     * @param {WHS.World} parent - World, were this shape will be.
     * @param {...String} tags - Tags for compiling.
     */
    addTo(parent, ...tags) {
      const _helpers = this.helpers,
        _scope = this;

      _scope.parent = parent;

      if (tags.indexOf('wait') >= 0) {
        return new Promise((resolve, reject) => {
          Promise.all(_scope.wait).then(() => {
            try {
              const parentNative = _scope.parent instanceof World
                ? _scope.parent.getScene()
                : _scope.parent.getNative();

              parentNative.add(_scope.getNative());
              _scope.parent.children.push(_scope);

              if (_scope.__params.helpers.box) parentNative.add(_helpers.box);

              if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);

              if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);

              if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);

              if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
            } catch (err) {
              console.error(err.message);
              reject();
            } finally {
              if (_scope._wait) {
                _scope.getNative().addEventListener('ready', () => {
                  resolve(_scope);
                });
              } else resolve(_scope);

              _scope.getNative().addEventListener('collide', () => {
                _scope.emit('collide');
              });

              if (WHS.debug) {
                console.debug(
                  `@WHS.Shape: Shape ${_scope._type} was added to world.`,
                  [_scope, _scope.parent]
                );
              }
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          try {
            const parentNative = _scope.parent instanceof World
              ? _scope.parent.getScene()
              : _scope.parent.getNative();

            parentNative.add(_scope.getNative());
            _scope.parent.children.push(_scope);

            if (_scope.__params.helpers.box)
              parentNative.add(_helpers.box);

            if (_scope.__params.helpers.boundingBox)
              parentNative.add(_helpers.boundingBox);

            if (_scope.__params.helpers.edges)
              parentNative.add(_helpers.edges);

            if (_scope.__params.helpers.faceNormals)
              parentNative.add(_helpers.faceNormals);

            if (_scope.__params.helpers.vertexNormals)
              parentNative.add(_helpers.vertexNormals);
          } catch (err) {
            console.error(err.message);
            reject();
          } finally {
            if (_scope._wait) {
              _scope.getNative().addEventListener('ready', () => {
                resolve(_scope);
              });
            } else resolve(_scope);

            _scope.getNative().addEventListener('collide', () => {
              _scope.emit('ready');
            });

            if (WHS.debug) {
              console.debug(
                  `@WHS.Shape: Shape ${_scope._type} was added to world.`,
                  [_scope, _scope.parent]
                );
            }
          }
        });
      }
    }

    /**
     * Initialize shape's material object.
     */
    _initMaterial(params) {
      return this.physics
        ? loadMaterial(params)._material
        : loadMaterial(params)._materialP;
    }

    /**
     * Clone shape.
     */
    clone() {
      return new WHS.Shape(this.getParams(), this._type).copy(this);
    }

    /**
     * Copy shape.
     *
     * @param {WHS.Shape} source - Source object, that will be applied to this.
     */
    copy(source) {
      this.setNative(source.getNative().clone());

      console.log(source.rotation);

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();

      this._type = source._type;

      return this;
    }

    /**
     * Remove this shape from world.
     *
     * @return {WHS.Shape} - this.
     */
    remove() {
      this.parent.getScene().remove(this.getNative());

      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;

      this.emit('remove');

      if (WHS.debug) {
        console.debug(
          `@WHS.Shape: Shape ${this._type} was removed from world`,
          [this]
        );
      }

      return this;
    }

    /**
     * @return {WHS.World} - World object.
     */
    getWorld() {
      let p = this.parent;

      while (!(p instanceof World)) {
        if (p) p = p.parent;
        else return false;
      }

      return p;
    }

    get nposition() {
      return this.getNative().position;
    }

    get nrotation() {
      return this.getNative().position;
    }

    get position() {
      this.getNative().__dirtyPosition = true;
      return this.getNative().position;
    }

    set position(vector3) {
      this.getNative().__dirtyPosition = true;
      return this.getNative().position.copy(vector3);
    }

    get rotation() {
      this.getNative().__dirtyRotation = true;
      return this.getNative().rotation;
    }

    set rotation(euler) {
      this.getNative().__dirtyRotation = true;
      this.getNative().rotation.copy(euler);

      return this.getNative().rotation;
    }

    get scale() {
      return this.getNative().scale;
    }

    set scale(vector3) {
      this.getNative().scale = vector3;
      return this.getNative().scale;
    }

    /* Access private data */

    setNative(native) {
      this.native = native;
      return this.native;
    }

    getNative() {
      return this.native;
    }

    setMaterial(material) {
      this.native.material = material;
      return this.native.material;
    }

    setAngularVelocity(...args) {
      return this.getNative().setAngularVelocity(...args);
    }

    setLinearVelocity(...args) {
      return this.getNative().setLinearVelocity(...args);
    }

    follow(curve, time = 1000, loop) {
      const _scope = this,
        gEnd = time;

      let animation = new Loop(clock => {
        const u = clock.getElapsedTime() * 1000 / gEnd,
          vec1 = curve.getPoint(u % 1),
          vec2 = curve.getPoint((u + 0.01) % 1);

        _scope.position.set(vec1.x, vec1.y, vec1.z);
        _scope.getNative().lookAt(vec2);
      });

      animation.start();

      if (loop) {
        setInterval(() => {
          animation.stop();

          animation = new Loop(clock => {
            const u = clock.getElapsedTime() * 1000 / gEnd,
              vec1 = curve.getPoint(u % 1),
              vec2 = curve.getPoint((u + 0.01) % 1);

            _scope.position.set(vec1.x, vec1.y, vec1.z);
            _scope.getNative().lookAt(vec2);
          });

          animation.start();
        }, time);
      } else {
        setTimeout(() => {
          animation.stop();
        }, time);
      }
    }
  }

  class AmbientLight extends Light {
    constructor(params = {}) {
      super(params, 'ambientlight');

      this.build(params);

      super.wrap('noshadows');
    }

    build(params = {}) {
      const _scope = this;

      return new Promise((resolve) => {
        _scope.setNative(new THREE.AmbientLight(
          params.light.color,
          params.light.intensity
        ));

        resolve();
      });
    }
  }

  class DirectionalLight extends Light {
    /**
     * Directional light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     */
    constructor(params = {}) {
      super(params, 'directionallight');

      this.build(params);

      super.wrap();
      super.wrapShadow();
    }

    build(params = {}) {
      const _scope = this;

      return new Promise((resolve) => {
        _scope.setNative(new THREE.DirectionalLight(
          params.light.color,
          params.light.intensity
        ));

        if (params.helper) {
          _scope.helper = new THREE.DirectionalLightHelper(
            _scope.light,
            params.helper.size ? params.helper.size : 0
          );
        }

        resolve();
      });
    }
  }

  class HemisphereLight extends Light {
    /**
     * Hemisphere light.
     *
     * @param {Object} params.light.skyColor - Light sky color.
     * @param {Object} params.light.groundColor - Light ground color.
     * @param {Object} params.light.intensity - Light intensity.
     */
    constructor(params = {}) {
      super(params, 'hemispherelight');

      this.build(params);

      super.wrap();
      super.wrapShadow();
    }

    build(params = {}) {
      const _scope = this;

      return new Promise((resolve) => {
        _scope.setNative(new THREE.HemisphereLight(
          params.light.skyColor,
          params.light.groundColor,
          params.light.intensity
        ));

        if (params.helper) {
          _scope.helper = new THREE.HemisphereLightHelper(
            _scope.light,
            params.helper.size ? params.helper.size : 0
          );
        }

        resolve();
      });
    }
  }

  class NormalLight extends Light {
    /**
     * Normal light.
     *
     * @param {Object} params.light.color - Light color.
     */
    constructor(params = {}) {
      super(params, 'normallight');

      this.build(params);

      super.wrap();
      super.wrapShadow();
    }

    build(params = {}) {
      const _scope = this;

      return new Promise((resolve) => {
        _scope.setNative(new THREE.Light(
          params.light.color
        ));

        resolve();
      });
    }
  }

  class PointLight extends Light {
    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.decay - Light decay.
     */
    constructor(params = {}) {
      super(params, 'pointlight');

      this.build(params);

      super.wrap();
      super.wrapShadow();
    }

    build(params = {}) {
      const _scope = this;

      return new Promise((resolve) => {
        _scope.setNative(new THREE.PointLight(
          params.light.color,
          params.light.intensity,
          params.light.distance,
          params.light.decay
        ));

        if (params.helper) {
          _scope.helper = new THREE.PointLightHelper(
            _scope.light,
            params.helper.size ? params.helper.size : 0
          );
        }

        resolve();
      });
    }
  }

  class SpotLight extends Light {
    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.angle - Light angle.
     * @param {Object} params.light.exponent - Light exponent.
     * @param {Object} params.light.decay - Light decay.
     */
    constructor(params = {}) {
      super(params, 'spotlight');

      this.build(params);

      super.wrap();
      super.wrapShadow();
    }

    build(params = {}) {
      const _scope = this;

      return new Promise((resolve) => {
        _scope.setNative(new THREE.SpotLight(
          params.light.color,
          params.light.intensity,
          params.light.distance,
          params.light.angle,
          params.light.exponent,
          params.light.decay
        ));

        if (params.helper)
          _scope.helper = new THREE.SpotLightHelper(_scope.light);

        resolve();
      });
    }
  }

  class Box extends Shape$1 {
    constructor(params = {}) {
      super(params, 'box');

      extend(params.geometry, {
        width: 1,
        height: 1,
        depth: 1
      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const Mesh = this.physics ? Physijs.BoxMesh : THREE$1.Mesh;
      const material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        this.setNative(new Mesh(
          new THREE$1.BoxGeometry(
            params.geometry.width,
            params.geometry.height,
            params.geometry.depth
          ),
          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Box(this.getParams(), this._type).copy(this);
    }
  }

  class ConvexModel extends Shape$1 {
    constructor(params = {}) {
      super(params, 'model');

      extend(params.geometry, {
        path: '',
        physics: ''
      });

      this.build(params);
      super.wrap('wait');
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh;

      const promise = new Promise((resolve) => {
        loadJson(params.geometry.path, (data, materials) => {
          if (params.geometry.physics) {
            loadJson(params.geometry.physics, data2 => {
              let material;

              if (params.material.useVertexColors) {
                material = loadMaterial(
                  extend(params.material, {
                    morphTargets: true,
                    vertexColors: THREE$1.FaceColors
                  })
                )._material;
              } else if (!materials || params.material.useCustomMaterial) {
                material = loadMaterial(
                  params.material
                )._material;
              } else material = new THREE$1.MultiMaterial(materials);

              data.computeFaceNormals();
              data.computeVertexNormals();

              _scope.setNative(new Mesh(
                data,
                material,
                params.mass,
                data2,
                params.scale
              ));

              resolve();
            });
          } else {
            let material;

            if (params.material.useVertexColors) {
              material = loadMaterial(
                extend(params.material, {
                  morphTargets: true,
                  vertexColors: THREE$1.FaceColors
                })
              )._material;
            } else if (!materials || params.material.useCustomMaterial) {
              material = loadMaterial(
                params.material
              )._material;
            } else material = new THREE$1.MultiMaterial(materials);

            data.computeFaceNormals();
            data.computeVertexNormals();

            _scope.setNative(new Mesh(
              data,
              material,
              params.mass
            ));

            resolve();
          }
        });
      });

      super.wait(promise);

      return promise;
    }

    clone() {
      return new ConvexModel(this.getParams()).copy(this);
    }
  }

  class Cylinder extends Shape$1 {
    constructor(params = {}) {
      super(params, 'cylinder');

      extend(params.geometry, {

        radiusTop: 1,
        radiusBottom: 1,
        height: 1,
        radiusSegments: 32

      });

      this.build(params);

      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.CylinderMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.CylinderGeometry(

            params.geometry.radiusTop,
            params.geometry.radiusBottom,
            params.geometry.height,
            params.geometry.radiusSegments

          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Cylinder(this.getParams(), this._type).copy(this);
    }
  }

  class Dodecahedron extends Shape$1 {
    constructor(params = {}) {
      super(params, 'dodecahedron');

      extend(params.geometry, {

        radius: 1,
        detail: 0

      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.DodecahedronGeometry(
            params.geometry.radius,
            params.geometry.detail
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Dodecahedron(this.getParams(), this._type).copy(this);
    }
  }

  class Extrude extends Shape$1 {
    constructor(params = {}) {
      super(params, 'extrude');

      extend(params.geometry, {

        shapes: [],
        options: {}

      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.ExtrudeGeometry(
            params.geometry.shapes,
            params.geometry.options
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Extrude(this.getParams(), this._type).copy(this);
    }
  }

  class Icosahedron extends Shape$1 {
    constructor(params = {}) {
      super(params, 'icosahedron');

      extend(params.geometry, {

        radius: 1,
        detail: 0

      });

      this.build(params);

      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.IcosahedronGeometry(
            params.geometry.radius,
            params.geometry.detail
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Icosahderon(this.getParams(), this._type).copy(this);
    }
  }

  class Lathe extends Shape$1 {
    constructor(params = {}) {
      super(params, 'lathe');

      extend(params.geometry, {
        points: []
      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.LatheGeometry(
            params.geometry.points
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Lathe(this.getParams(), this._type).copy(this);
    }
  }

  class Model extends Shape$1 {
    constructor(params = {}) {
      super(params, 'model');

      extend(params.geometry, {

        path: '',
        physics: ''

      });

      this.build(params);
      super.wrap('wait');
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConcaveMesh : THREE$1.Mesh;

      const promise = new Promise((resolve) => {
        loadJson(params.geometry.path, (data, materials) => {
          if (params.geometry.physics) {
            loadJson(params.geometry.physics, data2 => {
              if (params.material.useVertexColors) {
                material = loadMaterial(
                  extend(params.material, {
                    morphTargets: true,
                    vertexColors: THREE$1.FaceColors
                  })
                )._material;
              } else if (!materials || params.material.useCustomMaterial) {
                material = loadMaterial(
                  params.material
                )._material;
              } else material = new THREE$1.MultiMaterial(materials);

              data.computeFaceNormals();
              data.computeVertexNormals();

              _scope.setNative(new Mesh(
                data,
                material,
                params.mass,
                data2,
                params.scale
              ));

              resolve();
            });
          } else {
            if (params.material.useVertexColors) {
              material = loadMaterial(
                extend(params.material, {
                  morphTargets: true,
                  vertexColors: THREE$1.FaceColors
                })
              )._material;
            } else if (!materials || params.material.useCustomMaterial) {
              material = loadMaterial(
                params.material
              )._material;
            } else material = new THREE$1.MultiMaterial(materials);

            data.computeFaceNormals();
            data.computeVertexNormals();

            _scope.setNative(new Mesh(
              data,
              material,
              params.mass
            ));

            resolve();
          }
        });
      });

      super.wait(promise);

      return promise;
    }

    clone() {
      return new Model(this.getParams(), this._type).copy(this);
    }
  }

  class Morph extends Shape$1 {
    constructor(params = {}) {
      super(params, 'morph');

      extend(params.geometry, {
        path: ''
      });

      this.build(params);
      super.wrap('wait');
    }

    build(params = {}) {
      const _scope = this;

      const promise = new Promise((resolve) => {
        loadJson(params.geometry.path, (data, materials) => {
          if (params.material.useVertexColors) {
            material = loadMaterial(
              extend(params.material, {
                morphTargets: true,
                vertexColors: THREE$1.FaceColors
              })
            )._material;
          } else if (!materials || params.material.useCustomMaterial) {
            material = loadMaterial(
              params.material
            )._material;
          } else material = new THREE$1.MultiMaterial(materials);

          data.computeFaceNormals();
          data.computeVertexNormals();

          // Visualization.
          const mesh = new THREE$1.Mesh(data, material);
          mesh.speed = params.morph.speed;
          mesh.mixer = new THREE$1.AnimationMixer(mesh);

          mesh.mixer
            .clipAction(data.animations[0])
            .setDuration(params.morph.duration)
            .play();

          _scope.setNative(mesh);

          resolve();
        });
      });

      super.wait(promise);

      return promise;
    }

    clone() {
      return new Morph(this.getParams(), this._type).copy(this);
    }
  }

  class Octahedron extends Shape$1 {
    constructor(params = {}) {
      super(params, 'octahedron');

      extend(params.geometry, {

        radius: 1,
        detail: 0

      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.OctahedronGeometry(
            params.geometry.radius,
            params.geometry.detail
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Octahedron(this.getParams(), this._type).copy(this);
    }
  }

  class Parametric extends Shape$1 {
    constructor(params = {}) {
      super(params, 'parametric');

      extend(params.geometry, {

        func() {},
        slices: 10,
        stacks: 10

      });

      this.build(params);

      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConcaveMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.ParametricGeometry(

            params.geometry.func,
            params.geometry.slices,
            params.geometry.stacks

          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    /**
     * Clone parametric.
     */
    clone() {
      return new Parametric(this.getParams(), this._type).copy(this);
    }
  }

  class Plane extends Shape$1 {
    constructor(params = {}) {
      super(params, 'plane');

      extend(params.geometry, {

        width: 10,
        height: 10,
        segments: 32

      });

      this.build(params);

      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.PlaneMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.PlaneGeometry(
            params.geometry.width,
            params.geometry.height,
            params.geometry.segments
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Plane(this.getParams(), this._type).copy(this);
    }
  }

  class Polyhedron extends Shape$1 {
    constructor(params = {}) {
      super(params, 'polyhedron');

      extend(params.geometry, {

        verticesOfCube: this.verticesOfCube,
        indicesOfFaces: this.indicesOfFaces,
        radius: 6,
        detail: 2

      });

      this.build(params);

      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.PolyhedronGeometry(

            params.geometry.verticesOfCube,
            params.geometry.indicesOfFaces,
            params.geometry.radius,
            params.geometry.detail

          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    get verticesOfCube() {
      return [
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
        -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1
      ];
    }

    get indicesOfFaces() {
      return [
        2, 1, 0, 0, 3, 2,
        0, 4, 7, 7, 3, 0,
        0, 1, 5, 5, 4, 0,
        1, 2, 6, 6, 5, 1,
        2, 3, 7, 7, 6, 2,
        4, 5, 6, 6, 7, 4
      ];
    }

    clone() {
      return new Polyhedron(this.getParams(), this._type).copy(this);
    }
  }

  class Ring extends Shape$1 {
    constructor(params = {}) {
      super(params, 'ring');

      extend(params.geometry, {

        innerRadius: 0,
        outerRadius: 50,
        thetaSegments: 8,
        phiSegments: 8,
        thetaStart: 0,
        thetaLength: Math.PI * 2

      });

      this.build(params);
      super.wrap('onlyvis');
    }

    build(params = {}) {
      const _scope = this,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new THREE$1.Mesh(
          new THREE$1.RingGeometry(

            params.geometry.innerRadius,
            params.geometry.outerRadius,
            params.geometry.thetaSegments,
            params.geometry.phiSegments,
            params.geometry.thetaStart,
            params.geometry.thetaLength

          ),

          material
        ));

        resolve();
      });
    }

    clone() {
      return new Ring(this.getParams(), this._type).copy(this);
    }
  }

  class Shape2D extends Shape$1 {
    constructor(params = {}) {
      super(params, 'shape2D');

      extend(params.geometry, {
        shapes: []
      });

      super.build(params);
      super.wrap('onlyvis');
    }

    build(params = {}) {
      const _scope = this,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new THREE$1.Mesh(
          new THREE$1.ShapeGeometry(
            params.geometry.shapes
          ),

          material
        ));

        resolve();
      });
    }

    clone() {
      return new Shape2D(this.getParams(), this._type).copy(this);
    }
  }

  class Sphere extends Shape$1 {
    constructor(params = {}) {
      super(params, 'sphere');

      extend(params.geometry, {

        radius: 1,
        segmentA: 32,
        segmentB: 32

      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.SphereMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.SphereGeometry(

            params.geometry.radius,
            params.geometry.segmentA,
            params.geometry.segmentB

          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Sphere(this.getParams(), this._type).copy(this);
    }
  }

  class Tetrahedron extends Shape$1 {
    constructor(params = {}) {
      super(params, 'tetrahedron');

      extend(params.geometry, {

        radius: 1,
        detail: 0

      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.TetrahedronGeometry(
            params.geometry.radius,
            params.geometry.detail
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }
    
    clone() {
      return new Tetrahedron(this.getParams(), this._type).copy(this);
    }
  }

  class Text extends Shape$1 {
    constructor(params = {}) {
      super(params, 'text');

      extend(params.geometry, {
        text: 'Hello World!',

        parameters: {
          size: 12,
          height: 50,
          curveSegments: 12,
          font: new THREE$1.Font(),
          bevelEnabled: false,
          bevelThickness: 10,
          bevelSize: 8
        }
      });

      this.build(params);
      super.wrap('wait');
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConcaveMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      const promise = new Promise((resolve) => {
        loadFont(params.geometry.parameters.font, font => {
          params.geometry.parameters.font = font;

          _scope.setNative(new Mesh(
            new THREE$1.TextGeometry(
              params.geometry.text,
              params.geometry.parameters
            ),

            material,
            params.mass
          ));

          resolve();
        });
      });

      super.wait(promise);

      return promise;
    }

    clone() {
      return new Text(this.getParams(), this._type).copy(this);
    }
  }

  class Torus extends Shape$1 {
    constructor(params = {}) {
      super(params, 'torus');

      extend(params.geometry, {

        radius: 100,
        tube: 40,
        radialSegments: 8,
        tubularSegments: 6,
        arc: Math.PI * 2

      });

      this.build(params);
      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.TorusGeometry(
            params.geometry.radius,
            params.geometry.tube,
            params.geometry.radialSegments,
            params.geometry.tubularSegments,
            params.geometry.arc
          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Torus(this.getParams(), this._type).copy(this);
    }
  }

  class Torusknot extends Shape$1 {
    constructor(params = {}) {
      super(params, 'Torusknot');

      extend(params.geometry, {

        radius: 100,
        tube: 40,
        radialSegments: 64,
        tubularSegments: 8,
        p: 2,
        q: 3,
        heightScale: 1

      });

      this.build(params);

      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.TorusKnotGeometry(

            params.geometry.radius,
            params.geometry.tube,
            params.geometry.radialSegments,
            params.geometry.tubularSegments,
            params.geometry.p,
            params.geometry.q,
            params.geometry.heightScale

          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    clone() {
      return new Torusknot(this.getParams(), this._type).copy(this);
    }
  }

  class Tube extends Shape$1 {
    constructor(params = {}) {
      super(params, 'tube');

      extend(params.geometry, {

        path: options.geometryOptions.path ? new this.CustomSinCurve(100) : false,
        segments: 20,
        radius: 2,
        radiusSegments: 8,
        closed: false

      });

      this.build(params);

      super.wrap();
    }

    build(params = {}) {
      const _scope = this,
        Mesh = this.physics ? Physijs.ConvexMesh : THREE$1.Mesh,
        material = super._initMaterial(params.material);

      return new Promise((resolve) => {
        _scope.setNative(new Mesh(
          new THREE$1.TubeGeometry(

            params.geometry.path,
            params.geometry.segments,
            params.geometry.radius,
            params.geometry.radiusSegments,
            params.geometry.closed

          ),

          material,
          params.mass
        ));

        resolve();
      });
    }

    get CustomSinCurve() {
      return THREE$1.Curve.create(

        (scale) => { // custom curve constructor
          this.scale = scale || 1;
        },

        (t) => { // getPoint: t is between 0-1
          const tx = t * 3 - 1.5,
            ty = Math.sin(2 * Math.PI * t),
            tz = 0;

          return new THREE$1.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }

      );
    }

    /**
     * Clone tube.
     */
    clone() {
      return new Tube(this.getParams(), this._type).copy(this);
    }
  }

  class Fog {
    constructor(params = {}) {
      WHS.API.extend(params, {
        hex: 0x000000,
        near: 1,
        far: 1000
      });

      this.fog = new THREE$1.Fog(params.hex, params.near, params.far);
      this.type = 'fog';
    }

    addTo(root) {
      root.getScene().fog = this.fog;
    }
  }

  class FogExp2 {
    constructor(params = {}) {
      WHS.API.extend(params, {
        hex: 0x000000,
        density: 0.00025
      });

      this.fog = new THREE$1.FogExp2(params.hex, params.density);
      this.type = 'fogexp2';
    }

    addTo(root) {
      root.getScene().fog = this.fog;
    }
  }

  class Group extends Shape$1 {
    constructor() {
      super({}, 'group');

      super.setNative(new Object3D());
      super.wrap();
    }
  }

  class Skybox extends Shape$1 {
    constructor(params = {}) {
      super(params, 'skybox');

      WHS.API.extend(params, {
        skyType: 'box',
        detail: '.png',
        radius: 10,
        fog: true,
        path: ''
      });

      let skyGeometry, skyMat;

      switch (params.skyType) {
        case 'box': {
          const directions = ['xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg'],
            matArray = [];

          skyGeometry = new THREE$1.CubeGeometry(params.radius, params.radius, params.radius);

          for (let i = 0; i < 6; i++) {
            matArray.push(new MeshBasicMaterial({
              map: THREE$1.ImageUtils.loadTexture(params.path + directions[i] + params.imgSuffix),
              side: THREE$1.BackSide,
              fog: params.fog
            }));
          }

          skyMat = new THREE$1.MeshFaceMaterial(matArray);

          break;
        }
        case 'sphere': {
          skyGeometry = new THREE$1.SphereGeometry(params.radius / 2, 60, 40);
          skyMat = new THREE$1.MeshBasicMaterial({
            map: ImageUtils.loadTexture(params.path + params.imgSuffix),
            side: BackSide,
            fog: params.fog
          });

          break;
        }
        default:
      }

      const mesh = new THREE$1.Mesh(skyGeometry, skyMat);
      mesh.renderDepth = 1000.0;

      super.setNative(mesh);
      super.wrap();
    }
  }
  window.Physijs = Physijs;

  exports.CubeCamera = CubeCamera;
  exports.OrtographicCamera = OrtographicCamera;
  exports.PerspectiveCamera = PerspectiveCamera;
  exports.Camera = Camera;
  exports.Curve = Curve;
  exports.Light = Light;
  exports.WHSObject = WHSObject;
  exports.Shape = Shape$1;
  exports.World = World;
  exports.Loop = Loop;
  exports.loadFont = loadFont$1;
  exports.loadJson = loadJson;
  exports.loadTexture = loadTexture;
  exports.texture = texture;
  exports.extend = extend;
  exports.loadMaterial = loadMaterial;
  exports.AmbientLight = AmbientLight;
  exports.DirectionalLight = DirectionalLight;
  exports.HemisphereLight = HemisphereLight;
  exports.NormalLight = NormalLight;
  exports.PointLight = PointLight;
  exports.SpotLight = SpotLight;
  exports.Box = Box;
  exports.ConvexModel = ConvexModel;
  exports.Cylinder = Cylinder;
  exports.Dodecahedron = Dodecahedron;
  exports.Extrude = Extrude;
  exports.Icosahedron = Icosahedron;
  exports.Lathe = Lathe;
  exports.Model = Model;
  exports.Morph = Morph;
  exports.Octahedron = Octahedron;
  exports.Parametric = Parametric;
  exports.Plane = Plane;
  exports.Polyhedron = Polyhedron;
  exports.Ring = Ring;
  exports.Shape2D = Shape2D;
  exports.Sphere = Sphere;
  exports.Tetrahedron = Tetrahedron;
  exports.Text = Text;
  exports.Torus = Torus;
  exports.Torusknot = Torusknot;
  exports.Tube = Tube;
  exports.Fog = Fog;
  exports.FogExp2 = FogExp2;
  exports.Group = Group;
  exports.Skybox = Skybox;

}((this.WHS = this.WHS || {}),THREE));