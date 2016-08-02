'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = undefined;

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

var _inlineWorker = require('inline-worker');

var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

var _stats = require('stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _eventable = require('../eventable');

var _api = require('../api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scene = exports.Scene = function (_THREE$Scene) {
  (0, _inherits3.default)(Scene, _THREE$Scene);

  function Scene() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var init = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, Scene);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Scene).call(this));

    Object.assign(_this, new _eventable.Eventable());
    _eventable.Eventable.make(Scene);

    _this._worker = new _inlineWorker2.default(require('../worker.js'));
    _this._worker.transferableMessage = _this._worker.webkitPostMessage || _this._worker.postMessage;
    _this._materials_ref_counts = {};
    _this._objects = {};
    _this._vehicles = {};
    _this._constraints = {};
    _this._is_simulating = false;

    var ab = new ArrayBuffer(1);
    _this._worker.transferableMessage(ab, [ab]);
    _this.SUPPORT_TRANSFERABLE = ab.byteLength === 0;

    _this._worker.onmessage = function (event) {
      var _temp = void 0,
          data = event.data;

      if (data instanceof ArrayBuffer && data.byteLength !== 1) // byteLength === 1 is the worker making a SUPPORT_TRANSFERABLE test
        data = new Float32Array(data);

      if (data instanceof Float32Array) {
        // transferable object
        switch (data[0]) {
          case _api.MESSAGE_TYPES.WORLDREPORT:
            _this._updateScene(data);
            break;

          case _api.MESSAGE_TYPES.SOFTREPORT:
            _this._updateSoftbodies(data);
            break;

          case _api.MESSAGE_TYPES.COLLISIONREPORT:
            _this._updateCollisions(data);
            break;

          case _api.MESSAGE_TYPES.VEHICLEREPORT:
            _this._updateVehicles(data);
            break;

          case _api.MESSAGE_TYPES.CONSTRAINTREPORT:
            _this._updateConstraints(data);
            break;
          default:
        }
      } else if (data.cmd) {
        // non-transferable object
        switch (data.cmd) {
          case 'objectReady':
            _temp = data.params;
            if (_this._objects[_temp]) _this._objects[_temp].dispatchEvent('ready');
            break;

          case 'worldReady':
            _this.dispatchEvent('ready');
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
          case _api.MESSAGE_TYPES.WORLDREPORT:
            _this._updateScene(data);
            break;

          case _api.MESSAGE_TYPES.COLLISIONREPORT:
            _this._updateCollisions(data);
            break;

          case _api.MESSAGE_TYPES.VEHICLEREPORT:
            _this._updateVehicles(data);
            break;

          case _api.MESSAGE_TYPES.CONSTRAINTREPORT:
            _this._updateConstraints(data);
            break;
          default:
        }
      }
    };

    params.fixedTimeStep = params.fixedTimeStep || 1 / 60;
    params.rateLimit = params.rateLimit || true;

    params.whs = {
      softbody: init.softbody
    };

    _this._stats = init.stats ? new _stats2.default() : false;
    _this._world = init.world || false;

    if (_this._stats) {
      _this._stats.setMode(0);
      _this._stats.domElement.style.position = 'absolute';
      _this._stats.domElement.style.left = '0px';
      _this._stats.domElement.style.top = '48px';

      _this._world._dom.appendChild(_this._stats.domElement);
    }

    _this.execute('init', params);
    return _this;
  }

  (0, _createClass3.default)(Scene, [{
    key: '_updateScene',
    value: function _updateScene(data) {
      var index = data[1];

      while (index--) {
        var offset = 2 + index * _api.REPORT_ITEMSIZE;
        var object = this._objects[data[offset]];

        if (object === null) continue;

        if (object.__dirtyPosition === false) {
          object.position.set(data[offset + 1], data[offset + 2], data[offset + 3]);
        }

        if (object.__dirtyRotation === false) {
          object.quaternion.set(data[offset + 4], data[offset + 5], data[offset + 6], data[offset + 7]);
        }

        object._physijs.linearVelocity.set(data[offset + 8], data[offset + 9], data[offset + 10]);

        object._physijs.angularVelocity.set(data[offset + 11], data[offset + 12], data[offset + 13]);
      }

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker

      this._is_simulating = false;
      this.dispatchEvent('update');
    }
  }, {
    key: '_updateSoftbodies',
    value: function _updateSoftbodies(data) {
      var index = data[1],
          offset = 2;

      while (index--) {
        var size = data[offset + 1];
        var object = this._objects[data[offset]];

        if (object === null) continue;

        var association = object._physijs.aIdxAssoc;
        var attributes = object.geometry.attributes;

        var volumePositions = attributes.position.array;
        var volumeNormals = attributes.normal.array;

        var offsetVert = offset + 2;

        if (object._physijs.type === "softTrimesh") {
          for (var i = 0; i < size; i++) {
            var offs = offsetVert + i * 6;

            var x = data[offs];
            var y = data[offs + 1];
            var z = data[offs + 2];

            var nx = data[offs + 3];
            var ny = data[offs + 4];
            var nz = data[offs + 5];

            var assocVertex = association[i];

            for (var k = 0, kl = assocVertex.length; k < kl; k++) {
              var indexVertex = assocVertex[k];

              volumePositions[indexVertex] = x;
              volumeNormals[indexVertex] = nx;
              indexVertex++;

              volumePositions[indexVertex] = y;
              volumeNormals[indexVertex] = ny;
              indexVertex++;

              volumePositions[indexVertex] = z;
              volumeNormals[indexVertex] = nz;
            }
          }
        } else {
          for (var _i = 0; _i < size; _i++) {
            var _offs = offsetVert + _i * 6;

            var _x3 = data[_offs];
            var _y = data[_offs + 1];
            var _z = data[_offs + 2];

            var _nx = data[_offs + 3];
            var _ny = data[_offs + 4];
            var _nz = data[_offs + 5];

            volumePositions[_i * 3] = _x3;
            volumePositions[_i * 3 + 1] = _y;
            volumePositions[_i * 3 + 2] = _z;

            volumeNormals[_i * 3] = _nx;
            volumeNormals[_i * 3 + 1] = _ny;
            volumeNormals[_i * 3 + 2] = _nz;
          }
        }

        attributes.position.needsUpdate = true;
        attributes.normal.needsUpdate = true;

        offset += 2 + size * 6;
      }

      // if (this.SUPPORT_TRANSFERABLE)
      //   this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker

      this._is_simulating = false;
    }
  }, {
    key: '_updateVehicles',
    value: function _updateVehicles(data) {
      var vehicle = void 0,
          wheel = void 0;

      for (var i = 0; i < (data.length - 1) / _api.VEHICLEREPORT_ITEMSIZE; i++) {
        var offset = 1 + i * _api.VEHICLEREPORT_ITEMSIZE;
        vehicle = this._vehicles[data[offset]];

        if (vehicle === null) continue;

        wheel = vehicle.wheels[data[offset + 1]];

        wheel.position.set(data[offset + 2], data[offset + 3], data[offset + 4]);

        wheel.quaternion.set(data[offset + 5], data[offset + 6], data[offset + 7], data[offset + 8]);
      }

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: '_updateConstraints',
    value: function _updateConstraints(data) {
      var constraint = void 0,
          object = void 0;

      for (var i = 0; i < (data.length - 1) / _api.CONSTRAINTREPORT_ITEMSIZE; i++) {
        var offset = 1 + i * _api.CONSTRAINTREPORT_ITEMSIZE;
        constraint = this._constraints[data[offset]];
        object = this._objects[data[offset + 1]];

        if (constraint === undefined || object === undefined) continue;

        _api.temp1Vector3.set(data[offset + 2], data[offset + 3], data[offset + 4]);

        _api.temp1Matrix4.extractRotation(object.matrix);
        _api.temp1Vector3.applyMatrix4(_api.temp1Matrix4);

        constraint.positiona.addVectors(object.position, _api.temp1Vector3);
        constraint.appliedImpulse = data[offset + 5];
      }

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: '_updateCollisions',
    value: function _updateCollisions(data) {
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
      for (var i = 0; i < data[1]; i++) {
        var offset = 2 + i * _api.COLLISIONREPORT_ITEMSIZE;
        var object = data[offset];
        var object2 = data[offset + 1];

        normal_offsets[object + '-' + object2] = offset + 2;
        normal_offsets[object2 + '-' + object] = -1 * (offset + 2);

        // Register collisions for both the object colliding and the object being collided with
        if (!collisions[object]) collisions[object] = [];
        collisions[object].push(object2);

        if (!collisions[object2]) collisions[object2] = [];
        collisions[object2].push(object);
      }

      // Deal with collisions
      for (var id1 in this._objects) {
        if (!this._objects.hasOwnProperty(id1)) continue;
        var _object = this._objects[id1];
        if (_object === null) continue;

        // If object touches anything, ...
        if (collisions[id1]) {
          // Clean up touches array
          for (var j = 0; j < _object._physijs.touches.length; j++) {
            if (collisions[id1].indexOf(_object._physijs.touches[j]) === -1) _object._physijs.touches.splice(j--, 1);
          }

          // Handle each colliding object
          for (var _j = 0; _j < collisions[id1].length; _j++) {
            var id2 = collisions[id1][_j];
            var _object2 = this._objects[id2];

            if (_object2) {
              // If object was not already touching object2, notify object
              if (_object._physijs.touches.indexOf(id2) === -1) {
                _object._physijs.touches.push(id2);

                _api.temp1Vector3.subVectors(_object.getLinearVelocity(), _object2.getLinearVelocity());
                var temp1 = _api.temp1Vector3.clone();

                _api.temp1Vector3.subVectors(_object.getAngularVelocity(), _object2.getAngularVelocity());
                var temp2 = _api.temp1Vector3.clone();

                var normal_offset = normal_offsets[_object._physijs.id + '-' + _object2._physijs.id];

                if (normal_offset > 0) {
                  _api.temp1Vector3.set(-data[normal_offset], -data[normal_offset + 1], -data[normal_offset + 2]);
                } else {
                  normal_offset *= -1;

                  _api.temp1Vector3.set(data[normal_offset], data[normal_offset + 1], data[normal_offset + 2]);
                }

                _object.dispatchEvent('collision', _object2, temp1, temp2, _api.temp1Vector3);
              }
            }
          }
        } else _object._physijs.touches.length = 0; // not touching other objects
      }

      this.collisions = collisions;

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: 'addConstraint',
    value: function addConstraint(constraint, show_marker) {
      this._constraints[constraint.id] = constraint;
      this.execute('addConstraint', constraint.getDefinition());

      if (show_marker) {
        var marker = void 0;

        switch (constraint.type) {
          case 'point':
            marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'hinge':
            marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'slider':
            marker = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 1), new THREE.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);

            // This rotation isn't right if all three axis are non-0 values
            // TODO: change marker's rotation order to ZYX
            marker.rotation.set(constraint.axis.y, // yes, y and
            constraint.axis.x, // x axis are swapped
            constraint.axis.z);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'conetwist':
            marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'dof':
            marker = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshNormalMaterial());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
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
      if (this._constraints[constraint.id] !== undefined) {
        this.execute('removeConstraint', { id: constraint.id });
        delete this._constraints[constraint.id];
      }
    }
  }, {
    key: 'execute',
    value: function execute(cmd, params) {
      this._worker.postMessage({ cmd: cmd, params: params });
    }
  }, {
    key: 'add',
    value: function add(object) {
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
            (0, _api.addObjectChildren)(object, object);
          }

          if (object.material._physijs) {
            if (this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) this._materials_ref_counts[object.material._physijs.id]++;else {
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
    }
  }, {
    key: 'remove',
    value: function remove(object) {
      if (object instanceof Physijs.Vehicle) {
        this.execute('removeVehicle', { id: object._physijs.id });
        while (object.wheels.length) {
          this.remove(object.wheels.pop());
        }this.remove(object.mesh);
        this._vehicles[object._physijs.id] = null;
      } else {
        THREE.Mesh.prototype.remove.call(this, object);

        if (object._physijs) {
          this._objects[object._physijs.id] = null;
          this.execute('removeObject', { id: object._physijs.id });
        }
      }
      if (object.material && object.material._physijs && this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) {
        this._materials_ref_counts[object.material._physijs.id]--;

        if (this._materials_ref_counts[object.material._physijs.id] === 0) {
          this.execute('unRegisterMaterial', object.material._physijs);
          this._materials_ref_counts[object.material._physijs.id] = null;
        }
      }
    }
  }, {
    key: 'setFixedTimeStep',
    value: function setFixedTimeStep(fixedTimeStep) {
      if (fixedTimeStep) this.execute('setFixedTimeStep', fixedTimeStep);
    }
  }, {
    key: 'setGravity',
    value: function setGravity(gravity) {
      if (gravity) this.execute('setGravity', gravity);
    }
  }, {
    key: 'simulate',
    value: function simulate(timeStep, maxSubSteps) {
      if (this._stats) this._stats.begin();

      if (this._is_simulating) return false;

      this._is_simulating = true;

      for (var object_id in this._objects) {
        if (!this._objects.hasOwnProperty(object_id)) continue;

        var object = this._objects[object_id];

        if (object !== null && (object.__dirtyPosition || object.__dirtyRotation)) {
          var update = { id: object._physijs.id };

          if (object.__dirtyPosition) {
            update.pos = {
              x: object.position.x,
              y: object.position.y,
              z: object.position.z
            };

            if (object._physijs.type === 'softbody') object.position.set(0, 0, 0);

            object.__dirtyPosition = false;
          }

          if (object.__dirtyRotation) {
            update.quat = {
              x: object.quaternion.x,
              y: object.quaternion.y,
              z: object.quaternion.z,
              w: object.quaternion.w
            };

            if (object._physijs.type === 'softbody') object.rotation.set(0, 0, 0);

            object.__dirtyRotation = false;
          }

          this.execute('updateTransform', update);
        }
      }

      this.execute('simulate', { timeStep: timeStep, maxSubSteps: maxSubSteps });

      if (this._stats) this._stats.end();
      return true;
    }
  }]);
  return Scene;
}(THREE.Scene);
//# sourceMappingURL=scene.js.map
