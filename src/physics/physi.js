import * as THREE from 'three';
import Worker from 'inline-worker';

let SUPPORT_TRANSFERABLE,
  _Physijs = Physijs, // used for noConflict method
  Physijs = {}, // object assigned to window.Physijs
  temp1, temp2;

const
  MESSAGE_TYPES = {
    WORLDREPORT: 0,
    COLLISIONREPORT: 1,
    VEHICLEREPORT: 2,
    CONSTRAINTREPORT: 3
  },

  REPORT_ITEMSIZE = 14,
  COLLISIONREPORT_ITEMSIZE = 5,
  VEHICLEREPORT_ITEMSIZE = 9,
  CONSTRAINTREPORT_ITEMSIZE = 6,

  temp1Vector3 = new THREE.Vector3(),
  temp2Vector3 = new THREE.Vector3(),
  temp1Matrix4 = new THREE.Matrix4(),
  temp1Quat = new THREE.Quaternion();

Physijs.scripts = {};

const Eventable = function () {
  this._eventListeners = {};
};

Eventable.prototype.addEventListener = function (event_name, callback) {
  if (!this._eventListeners.hasOwnProperty(event_name))
    this._eventListeners[event_name] = [];

  this._eventListeners[event_name].push(callback);
};

Eventable.prototype.removeEventListener = function (event_name, callback) {
  let index;

  if (!this._eventListeners.hasOwnProperty(event_name)) return false;

  if ((index = this._eventListeners[event_name].indexOf(callback)) >= 0) {
    this._eventListeners[event_name].splice(index, 1);
    return true;
  }

  return false;
};

Eventable.prototype.dispatchEvent = function (event_name) {
  let i;
  const parameters = Array.prototype.splice.call(arguments, 1);

  if (this._eventListeners.hasOwnProperty(event_name)) {
    for (i = 0; i < this._eventListeners[event_name].length; i++)
      this._eventListeners[event_name][i].apply(this, parameters);
  }
};

Eventable.make = (obj) => {
  obj.prototype.addEventListener = Eventable.prototype.addEventListener;
  obj.prototype.removeEventListener = Eventable.prototype.removeEventListener;
  obj.prototype.dispatchEvent = Eventable.prototype.dispatchEvent;
};

const getObjectId = (() => {
  let _id = 1;
  return () => {
    return _id++;
  };
})();

// const getEulerXYZFromQuaternion = function (x, y, z, w) {
//   return new THREE.Vector3(
//     Math.atan2(2 * (x * w - y * z), (w * w - x * x - y * y + z * z)),
//     Math.asin(2 * (x * z + y * w)),
//     Math.atan2(2 * (z * w - x * y), (w * w + x * x - y * y - z * z))
//   );
// };

// const getQuatertionFromEuler = function (x, y, z) {
//   let c1, s1, c2, s2, c3, s3, c1c2, s1s2;
//   c1 = Math.cos(y);
//   s1 = Math.sin(y);
//   c2 = Math.cos(-z);
//   s2 = Math.sin(-z);
//   c3 = Math.cos(x);
//   s3 = Math.sin(x);
//
//   c1c2 = c1 * c2;
//   s1s2 = s1 * s2;
//
//   return {
//     w: c1c2 * c3 - s1s2 * s3,
//     x: c1c2 * s3 + s1s2 * c3,
//     y: s1 * c2 * c3 + c1 * s2 * s3,
//     z: c1 * s2 * c3 - s1 * c2 * s3
//   };
// };

const convertWorldPositionToObject = (position, object) => {
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

// Physijs.noConflict
Physijs.noConflict = function () {
  window.Physijs = _Physijs;
  return Physijs;
};

// Physijs.createMaterial
Physijs.createMaterial = (material, friction, restitution) => {
  let physijs_material = function () {
  };

  physijs_material.prototype = material;
  physijs_material = new physijs_material();

  physijs_material._physijs = {
    id: material.id,
    friction: friction === undefined ? 0.8 : friction,
    restitution: restitution === undefined ? 0.2 : restitution
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
    low,
    high,
    bias_factor,
    relaxation_factor
  });
};

Physijs.HingeConstraint.prototype.enableAngularMotor = function (velocity, acceleration) {
  this.scene.execute('hinge_enableAngularMotor', {
    constraint: this.id,
    velocity,
    acceleration
  });
};

Physijs.HingeConstraint.prototype.disableMotor = function () {
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
    lin_lower,
    lin_upper,
    ang_lower,
    ang_upper
  });
};

Physijs.SliderConstraint.prototype.setRestitution = function (linear, angular) {
  this.scene.execute(
    'slider_setRestitution',
    {
      constraint: this.id,
      linear,
      angular
    }
  );
};

Physijs.SliderConstraint.prototype.enableLinearMotor = function (velocity, acceleration) {
  this.scene.execute('slider_enableLinearMotor', {
    constraint: this.id,
    velocity,
    acceleration
  });
};

Physijs.SliderConstraint.prototype.disableLinearMotor = function () {
  this.scene.execute('slider_disableLinearMotor', {constraint: this.id});
};

Physijs.SliderConstraint.prototype.enableAngularMotor = function (velocity, acceleration) {
  this.scene.execute('slider_enableAngularMotor', {
    constraint: this.id,
    velocity,
    acceleration
  });
};

Physijs.SliderConstraint.prototype.disableAngularMotor = function () {
  this.scene.execute('slider_disableAngularMotor', {constraint: this.id});
};

Physijs.ConeTwistConstraint = function (objecta, objectb, position) {
  if (position === undefined) throw 'Both objects must be defined in a ConeTwistConstraint.';
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
  this.scene.execute('conetwist_setLimit', {constraint: this.id, x, y, z});
};

Physijs.ConeTwistConstraint.prototype.enableMotor = function () {
  this.scene.execute('conetwist_enableMotor', {constraint: this.id});
};

Physijs.ConeTwistConstraint.prototype.setMaxMotorImpulse = function (max_impulse) {
  this.scene.execute('conetwist_setMaxMotorImpulse', {constraint: this.id, max_impulse});
};

Physijs.ConeTwistConstraint.prototype.setMotorTarget = function (target) {
  if (target instanceof THREE.Vector3)
    target = new THREE.Quaternion().setFromEuler(new THREE.Euler(target.x, target.y, target.z));
  else if (target instanceof THREE.Euler)
    target = new THREE.Quaternion().setFromEuler(target);
  else if (target instanceof THREE.Matrix4)
    target = new THREE.Quaternion().setFromRotationMatrix(target);

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
  this.scene.execute('dof_enableAngularMotor', {constraint: this.id, which});
};

Physijs.DOFConstraint.prototype.configureAngularMotor = function (which, low_angle, high_angle, velocity, max_force) {
  this.scene.execute('dof_configureAngularMotor', {
    constraint: this.id,
    which,
    low_angle,
    high_angle,
    velocity,
    max_force
  });
};

Physijs.DOFConstraint.prototype.disableAngularMotor = function (which) {
  this.scene.execute('dof_disableAngularMotor', {constraint: this.id, which});
};

// Physijs.Scene
Physijs.Scene = function (params) {
  const self = this;

  Eventable.call(this);
  THREE.Scene.call(this);

  this._worker = new Worker(require('./worker.js'));
  this._worker.transferableMessage = this._worker.webkitPostMessage || this._worker.postMessage;
  this._materials_ref_counts = {};
  this._objects = {};
  this._vehicles = {};
  this._constraints = {};
  this._is_simulating = false;

  const ab = new ArrayBuffer(1);
  this._worker.transferableMessage(ab, [ab]);
  SUPPORT_TRANSFERABLE = (ab.byteLength === 0);

  this._worker.onmessage = function (event) {
    let _temp,
      data = event.data;

    if (data instanceof ArrayBuffer && data.byteLength !== 1)// byteLength === 1 is the worker making a SUPPORT_TRANSFERABLE test
      data = new Float32Array(data);

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
        default:
      }
    } else if (data.cmd) {
      // non-transferable object
      switch (data.cmd) {
        case 'objectReady':
          _temp = data.params;
          if (self._objects[_temp]) self._objects[_temp].dispatchEvent('ready');
          break;

        case 'worldReady':
          self.dispatchEvent('ready');
          break;

        case 'vehicle':
          window.test = data;
          break;

        default:
          // Do nothing, just show the message
          console.debug(`Received: ${data.cmd}`);
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
        default:
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

Physijs.Scene.prototype = new THREE.Scene();
Physijs.Scene.prototype.constructor = Physijs.Scene;
Eventable.make(Physijs.Scene);

Physijs.Scene.prototype._updateScene = function (data) {
  const num_objects = data[1];
  let object, offset;

  for (let i = 0; i < num_objects; i++) {
    offset = 2 + i * REPORT_ITEMSIZE;
    object = this._objects[data[offset]];

    if (object === undefined) continue;

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

  if (SUPPORT_TRANSFERABLE)
    this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker

  this._is_simulating = false;
  this.dispatchEvent('update');
};

Physijs.Scene.prototype._updateVehicles = function (data) {
  let vehicle, wheel, offset;

  for (let i = 0; i < (data.length - 1) / VEHICLEREPORT_ITEMSIZE; i++) {
    offset = 1 + i * VEHICLEREPORT_ITEMSIZE;
    vehicle = this._vehicles[data[offset]];

    if (vehicle === undefined) continue;

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

  if (SUPPORT_TRANSFERABLE)
    this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
};

Physijs.Scene.prototype._updateConstraints = function (data) {
  let constraint, object, offset;

  for (let i = 0; i < (data.length - 1) / CONSTRAINTREPORT_ITEMSIZE; i++) {
    offset = 1 + i * CONSTRAINTREPORT_ITEMSIZE;
    constraint = this._constraints[data[offset]];
    object = this._objects[data[offset + 1]];

    if (constraint === undefined || object === undefined) continue;

    temp1Vector3.set(
      data[offset + 2],
      data[offset + 3],
      data[offset + 4]
    );

    temp1Matrix4.extractRotation(object.matrix);
    temp1Vector3.applyMatrix4(temp1Matrix4);

    constraint.positiona.addVectors(object.position, temp1Vector3);
    constraint.appliedImpulse = data[offset + 5];
  }

  if (SUPPORT_TRANSFERABLE)
    this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
};

Physijs.Scene.prototype._updateCollisions = function (data) {
  /**
   * #TODO
   * This is probably the worst way ever to handle collisions. The inherent evilness is a residual
   * effect from the previous version's evilness which mutated when switching to transferable objects.
   *
   * If you feel inclined to make this better, please do so.
   */

  const collisions = {},
    normal_offsets = {};

  // Build collision manifest
  for (let i = 0; i < data[1]; i++) {
    const offset = 2 + i * COLLISIONREPORT_ITEMSIZE;
    const object = data[offset];
    const object2 = data[offset + 1];

    normal_offsets[`${object}-${object2}`] = offset + 2;
    normal_offsets[`${object2}-${object}`] = -1 * (offset + 2);

    // Register collisions for both the object colliding and the object being collided with
    if (!collisions[object]) collisions[object] = [];
    collisions[object].push(object2);

    if (!collisions[object2]) collisions[object2] = [];
    collisions[object2].push(object);
  }

  // Deal with collisions
  for (const id1 in this._objects) {
    if (!this._objects.hasOwnProperty(id1)) continue;
    const object = this._objects[id1];

    // If object touches anything, ...
    if (collisions[id1]) {
      // Clean up touches array
      for (let j = 0; j < object._physijs.touches.length; j++) {
        if (collisions[id1].indexOf(object._physijs.touches[j]) === -1)
          object._physijs.touches.splice(j--, 1);
      }

      // Handle each colliding object
      for (let j = 0; j < collisions[id1].length; j++) {
        const id2 = collisions[id1][j];
        const object2 = this._objects[id2];

        if (object2) {
          // If object was not already touching object2, notify object
          if (object._physijs.touches.indexOf(id2) === -1) {
            object._physijs.touches.push(id2);

            temp1Vector3.subVectors(object.getLinearVelocity(), object2.getLinearVelocity());
            temp1 = temp1Vector3.clone();

            temp1Vector3.subVectors(object.getAngularVelocity(), object2.getAngularVelocity());
            temp2 = temp1Vector3.clone();

            let normal_offset = normal_offsets[`${object._physijs.id}-${object2._physijs.id}`];

            if (normal_offset > 0) {
              temp1Vector3.set(
                -data[normal_offset],
                -data[normal_offset + 1],
                -data[normal_offset + 2]
              );
            } else {
              normal_offset *= -1;

              temp1Vector3.set(
                data[normal_offset],
                data[normal_offset + 1],
                data[normal_offset + 2]
              );
            }

            object.dispatchEvent('collision', object2, temp1, temp2, temp1Vector3);
          }
        }
      }
    } else object._physijs.touches.length = 0; // not touching other objects
  }

  this.collisions = collisions;

  if (SUPPORT_TRANSFERABLE)
    this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
};

Physijs.Scene.prototype.addConstraint = function (constraint, show_marker) {
  this._constraints[constraint.id] = constraint;
  this.execute('addConstraint', constraint.getDefinition());

  if (show_marker) {
    let marker;

    switch (constraint.type) {
      case 'point':
        marker = new THREE.Mesh(
          new THREE.SphereGeometry(1.5),
          new THREE.MeshNormalMaterial()
        );

        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;

      case 'hinge':
        marker = new THREE.Mesh(
          new THREE.SphereGeometry(1.5),
          new THREE.MeshNormalMaterial()
        );

        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;

      case 'slider':
        marker = new THREE.Mesh(
          new THREE.BoxGeometry(10, 1, 1),
          new THREE.MeshNormalMaterial()
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
        marker = new THREE.Mesh(
          new THREE.SphereGeometry(1.5),
          new THREE.MeshNormalMaterial()
        );

        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;

      case 'dof':
        marker = new THREE.Mesh(
          new THREE.SphereGeometry(1.5),
          new THREE.MeshNormalMaterial()
        );

        marker.position.copy(constraint.positiona);
        this._objects[constraint.objecta].add(marker);
        break;
      default:
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

const addObjectChildren = function (parent, object) {
  for (let i = 0; i < object.children.length; i++) {
    if (object.children[i]._physijs) {
      object.children[i].updateMatrix();
      object.children[i].updateMatrixWorld();

      temp1Vector3.setFromMatrixPosition(object.children[i].matrixWorld);
      temp1Quat.setFromRotationMatrix(object.children[i].matrixWorld);

      object.children[i]._physijs.position_offset = {
        x: temp1Vector3.x,
        y: temp1Vector3.y,
        z: temp1Vector3.z
      };

      object.children[i]._physijs.rotation = {
        x: temp1Quat.x,
        y: temp1Quat.y,
        z: temp1Quat.z,
        w: temp1Quat.w
      };

      parent._physijs.children.push(object.children[i]._physijs);
    }

    addObjectChildren(parent, object.children[i]);
  }
};

Physijs.Scene.prototype.add = function (object) {
  THREE.Mesh.prototype.add.call(this, object);

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
        if (this._materials_ref_counts.hasOwnProperty(object.material._physijs.id))
          this._materials_ref_counts[object.material._physijs.id]++;
        else {
          this.execute('registerMaterial', object.material._physijs);
          object._physijs.materialId = object.material._physijs.id;
          this._materials_ref_counts[object.material._physijs.id] = 1;
        }
      }

      // Object starting position + rotation
      object._physijs.position = {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z
      };

      object._physijs.rotation = {
        x: object.quaternion.x,
        y: object.quaternion.y,
        z: object.quaternion.z,
        w: object.quaternion.w
      };

      // Check for scaling
      // var mass_scaling = new THREE.Vector3(1, 1, 1);

      if (object._physijs.width) object._physijs.width *= object.scale.x;
      if (object._physijs.height) object._physijs.height *= object.scale.y;
      if (object._physijs.depth) object._physijs.depth *= object.scale.z;

      this.execute('addObject', object._physijs);
    }
  }
};

Physijs.Scene.prototype.remove = function (object) {
  if (object instanceof Physijs.Vehicle) {
    this.execute('removeVehicle', {id: object._physijs.id});
    while (object.wheels.length) this.remove(object.wheels.pop());

    this.remove(object.mesh);
    this._vehicles[object._physijs.id] = null;
  } else {
    THREE.Mesh.prototype.remove.call(this, object);

    if (object._physijs) {
      this._objects[object._physijs.id] = null;
      this.execute('removeObject', {id: object._physijs.id});
    }
  }
  if (object.material && object.material._physijs && this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) {
    this._materials_ref_counts[object.material._physijs.id]--;

    if (this._materials_ref_counts[object.material._physijs.id] === 0) {
      this.execute('unRegisterMaterial', object.material._physijs);
      this._materials_ref_counts[object.material._physijs.id] = null;
    }
  }
};

Physijs.Scene.prototype.setFixedTimeStep = function (fixedTimeStep) {
  if (fixedTimeStep) this.execute('setFixedTimeStep', fixedTimeStep);
};

Physijs.Scene.prototype.setGravity = function (gravity) {
  if (gravity) this.execute('setGravity', gravity);
};

Physijs.Scene.prototype.simulate = function (timeStep, maxSubSteps) {
  if (this._is_simulating) return false;

  this._is_simulating = true;

  for (const object_id in this._objects) {
    if (!this._objects.hasOwnProperty(object_id)) continue;

    const object = this._objects[object_id];

    if (object.__dirtyPosition || object.__dirtyRotation) {
      const update = {id: object._physijs.id};

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

  this.execute('simulate', {timeStep, maxSubSteps});

  return true;
};

// Physijs.Mesh
Physijs.Mesh = function (geometry, material, mass) {
  if (!geometry) return;

  Eventable.call(this);
  THREE.Mesh.call(this, geometry, material);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  this._physijs = {
    type: null,
    id: getObjectId(),
    mass: mass || 0,
    touches: [],
    linearVelocity: new THREE.Vector3(),
    angularVelocity: new THREE.Vector3()
  };
};

Physijs.Mesh.prototype = new THREE.Mesh();
Physijs.Mesh.prototype.constructor = Physijs.Mesh;

Eventable.make(Physijs.Mesh);

// Physijs.Mesh.mass
Physijs.Mesh.prototype.__defineGetter__('mass', function () {
  return this._physijs.mass;
});

Physijs.Mesh.prototype.__defineSetter__('mass', function (mass) {
  this._physijs.mass = mass;

  if (this.world) this.world.execute('updateMass', {id: this._physijs.id, mass});
});

// Physijs.Mesh.applyCentralImpulse
Physijs.Mesh.prototype.applyCentralImpulse = function (force) {
  if (this.world) this.world.execute('applyCentralImpulse', {id: this._physijs.id, x: force.x, y: force.y, z: force.z});
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
  if (this.world) this.world.execute('applyCentralForce', {id: this._physijs.id, x: force.x, y: force.y, z: force.z});
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
  if (this.world) this.world.execute('setAngularVelocity', {id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z});
};

// Physijs.Mesh.getLinearVelocity
Physijs.Mesh.prototype.getLinearVelocity = function () {
  return this._physijs.linearVelocity;
};

// Physijs.Mesh.setLinearVelocity
Physijs.Mesh.prototype.setLinearVelocity = function (velocity) {
  if (this.world) this.world.execute('setLinearVelocity', {id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z});
};

// Physijs.Mesh.setAngularFactor
Physijs.Mesh.prototype.setAngularFactor = function (factor) {
  if (this.world) this.world.execute('setAngularFactor', {id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z});
};

// Physijs.Mesh.setLinearFactor
Physijs.Mesh.prototype.setLinearFactor = function (factor) {
  if (this.world) this.world.execute('setLinearFactor', {id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z});
};

// Physijs.Mesh.setDamping
Physijs.Mesh.prototype.setDamping = function (linear, angular) {
  if (this.world) this.world.execute('setDamping', {id: this._physijs.id, linear, angular});
};

// Physijs.Mesh.setCcdMotionThreshold
Physijs.Mesh.prototype.setCcdMotionThreshold = function (threshold) {
  if (this.world) this.world.execute('setCcdMotionThreshold', {id: this._physijs.id, threshold});
};

// Physijs.Mesh.setCcdSweptSphereRadius
Physijs.Mesh.prototype.setCcdSweptSphereRadius = function (radius) {
  if (this.world) this.world.execute('setCcdSweptSphereRadius', {id: this._physijs.id, radius});
};

// Physijs.PlaneMesh
Physijs.PlaneMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

  this._physijs.type = 'plane';
  this._physijs.normal = geometry.faces[0].normal.clone();
  this._physijs.mass = (typeof mass === 'undefined') ? width * height : mass;
};

Physijs.PlaneMesh.prototype = new Physijs.Mesh();
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

  const points = [];

  for (let i = 0; i < geometry.vertices.length; i++) {
    const a = i % this._physijs.xpts;
    const b = Math.round((i / this._physijs.xpts) - ((i % this._physijs.xpts) / this._physijs.xpts));
    points[i] = geometry.vertices[a +  ((this._physijs.ypts - b - 1) * this._physijs.ypts)].z;
  }

  this._physijs.points = points;
};

Physijs.HeightfieldMesh.prototype = new Physijs.Mesh();
Physijs.HeightfieldMesh.prototype.constructor = Physijs.HeightfieldMesh;

// Physijs.BoxMesh
Physijs.BoxMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'box';
  this._physijs.width = width;
  this._physijs.height = height;
  this._physijs.depth = depth;
  this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};

Physijs.BoxMesh.prototype = new Physijs.Mesh();
Physijs.BoxMesh.prototype.constructor = Physijs.BoxMesh;

// Physijs.SphereMesh
Physijs.SphereMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingSphere) geometry.computeBoundingSphere();

  this._physijs.type = 'sphere';
  this._physijs.radius = geometry.boundingSphere.radius;
  this._physijs.mass = (typeof mass === 'undefined') ? (4 / 3) * Math.PI * Math.pow(this._physijs.radius, 3) : mass;
};

Physijs.SphereMesh.prototype = new Physijs.Mesh();
Physijs.SphereMesh.prototype.constructor = Physijs.SphereMesh;

// Physijs.CylinderMesh
Physijs.CylinderMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'cylinder';
  this._physijs.width = width;
  this._physijs.height = height;
  this._physijs.depth = depth;
  this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};
Physijs.CylinderMesh.prototype = new Physijs.Mesh();
Physijs.CylinderMesh.prototype.constructor = Physijs.CylinderMesh;

// Physijs.CapsuleMesh
Physijs.CapsuleMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'capsule';
  this._physijs.radius = Math.max(width / 2, depth / 2);
  this._physijs.height = height;
  this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};
Physijs.CapsuleMesh.prototype = new Physijs.Mesh();
Physijs.CapsuleMesh.prototype.constructor = Physijs.CapsuleMesh;

// Physijs.ConeMesh
Physijs.ConeMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

  this._physijs.type = 'cone';
  this._physijs.radius = width / 2;
  this._physijs.height = height;
  this._physijs.mass = (typeof mass === 'undefined') ? width * height : mass;
};
Physijs.ConeMesh.prototype = new Physijs.Mesh();
Physijs.ConeMesh.prototype.constructor = Physijs.ConeMesh;

// Physijs.ConcaveMesh
Physijs.ConcaveMesh = function (geom, material, mass, cGeometry, cScale) {
  const geometry = cGeometry ? cGeometry : geom,
    triangles = new Array(geometry.faces.length);

  Physijs.Mesh.call(this, geom, material, mass);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  cScale = cScale || {x: 1, y: 1, z: 1};
  cScale.x = cScale.x || 1;
  cScale.y = cScale.y || 1;
  cScale.z = cScale.z || 1;

  const vertices = geometry.vertices;

  for (let i = 0; i < geometry.faces.length; i++) {
    const face = geometry.faces[i];

    triangles[i] = [
      {x: vertices[face.a].x * cScale.x, y: vertices[face.a].y * cScale.y, z: vertices[face.a].z * cScale.z},
      {x: vertices[face.b].x * cScale.x, y: vertices[face.b].y * cScale.y, z: vertices[face.b].z * cScale.z},
      {x: vertices[face.c].x * cScale.x, y: vertices[face.c].y * cScale.y, z: vertices[face.c].z * cScale.z}
    ];
  }

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'concave';
  this._physijs.triangles = triangles;
  this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};

Physijs.ConcaveMesh.prototype = new Physijs.Mesh();
Physijs.ConcaveMesh.prototype.constructor = Physijs.ConcaveMesh;

// Physijs.ConvexMesh
Physijs.ConvexMesh = function (geometry, material, mass) {
  Physijs.Mesh.call(this, geometry, material, mass);

  if (!geometry.boundingBox) geometry.computeBoundingBox();

  const points = [];

  for (let i = 0; i < geometry.vertices.length; i++) {
    points.push({
      x: geometry.vertices[i].x,
      y: geometry.vertices[i].y,
      z: geometry.vertices[i].z
    });
  }

  const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

  this._physijs.type = 'convex';
  this._physijs.points = points;
  this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};

Physijs.ConvexMesh.prototype = new Physijs.Mesh();
Physijs.ConvexMesh.prototype.constructor = Physijs.ConvexMesh;

// Physijs.Vehicle
Physijs.Vehicle = function (mesh, tuning = new Physijs.VehicleTuning()) {
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
  const wheel = new THREE.Mesh(wheel_geometry, wheel_material);

  wheel.castShadow = wheel.receiveShadow = true;
  wheel.position.copy(wheel_direction).multiplyScalar(suspension_rest_length / 100).add(connection_point);

  this.world.add(wheel);
  this.wheels.push(wheel);

  this.world.execute('addWheel', {
    id: this._physijs.id,
    connection_point: {x: connection_point.x, y: connection_point.y, z: connection_point.z},
    wheel_direction: {x: wheel_direction.x, y: wheel_direction.y, z: wheel_direction.z},
    wheel_axle: {x: wheel_axle.x, y: wheel_axle.y, z: wheel_axle.z},
    suspension_rest_length,
    wheel_radius,
    is_front_wheel,
    tuning
  });
};

Physijs.Vehicle.prototype.setSteering = function (amount, wheel) {
  if (wheel !== undefined && this.wheels[wheel] !== undefined)
    this.world.execute('setSteering', {id: this._physijs.id, wheel, steering: amount});
  else if (this.wheels.length > 0) {
    for (let i = 0; i < this.wheels.length; i++)
      this.world.execute('setSteering', {id: this._physijs.id, wheel: i, steering: amount});
  }
};

Physijs.Vehicle.prototype.setBrake = function (amount, wheel) {
  if (wheel !== undefined && this.wheels[wheel] !== undefined)
    this.world.execute('setBrake', {id: this._physijs.id, wheel, brake: amount});
  else if (this.wheels.length > 0) {
    for (let i = 0; i < this.wheels.length; i++)
      this.world.execute('setBrake', {id: this._physijs.id, wheel: i, brake: amount});
  }
};

Physijs.Vehicle.prototype.applyEngineForce = function (amount, wheel) {
  if (wheel !== undefined && this.wheels[wheel] !== undefined)
    this.world.execute('applyEngineForce', {id: this._physijs.id, wheel, force: amount});
  else if (this.wheels.length > 0) {
    for (let i = 0; i < this.wheels.length; i++)
      this.world.execute('applyEngineForce', {id: this._physijs.id, wheel: i, force: amount});
  }
};

// Physijs.VehicleTuning
Physijs.VehicleTuning = function (suspension_stiffness = 5.88, suspension_compression = 0.83, suspension_damping = 0.88, max_suspension_travel = 500, friction_slip = 10.5, max_suspension_force = 6000) {
  this.suspension_stiffness = suspension_stiffness;
  this.suspension_compression = suspension_compression;
  this.suspension_damping = suspension_damping;
  this.max_suspension_travel = max_suspension_travel;
  this.friction_slip = friction_slip;
  this.max_suspension_force = max_suspension_force;
};

export {
  Physijs as default
};
