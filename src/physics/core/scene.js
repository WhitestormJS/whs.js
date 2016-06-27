import * as THREE from 'three';
import Eventable from '../eventable';

export default class Scene extends THREE.Scene {
  constructor() {
    super();
    Eventable.call(this);
    Eventable.make(this);

    this._worker = new Worker(require('./worker.js'));
    this._worker.transferableMessage = this._worker.webkitPostMessage || this._worker.postMessage;
    this._materials_ref_counts = {};
    this._objects = {};
    this._vehicles = {};
    this._constraints = {};
    this._is_simulating = false;

    const ab = new ArrayBuffer(1);
    this._worker.transferableMessage(ab, [ab]);
    this.SUPPORT_TRANSFERABLE = (ab.byteLength === 0);

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
  }

  _updateScene(data) {
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

    if (this.SUPPORT_TRANSFERABLE)
      this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker

    this._is_simulating = false;
    this.dispatchEvent('update');
  }

  _updateVehicles(data) {
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

    if (this.SUPPORT_TRANSFERABLE)
      this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
  }

  _updateConstraints(data) {
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

    if (this.SUPPORT_TRANSFERABLE)
      this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
  }

  _updateCollisions(data) {
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

    if (this.SUPPORT_TRANSFERABLE)
      this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
  }

  addConstraint(constraint, show_marker) {
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
  }

  onSimulationResume() {
    this.execute('onSimulationResume', {});
  }

  removeConstraint(constraint) {
    if (this._constraints[constraint.id] !== undefined) {
      this.execute('removeConstraint', {id: constraint.id});
      delete this._constraints[constraint.id];
    }
  }

  execute(cmd, params) {
    this._worker.postMessage({cmd, params});
  }
}
