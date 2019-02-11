/* WhitestormJS Framework v3.0.0-dev.6 */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var i = 0;
var CMD = {
  INITIALIZE: i++,
  FEEDBACK_INITIALIZE: i++,
  CREATE_RIGIDBODY: i++,
  FEEDBACK_RIGIDBODY: i++,
  REQUEST_UPDATE: i++,
  FEEDBACK_UPDATE: i++
};

var WorldModule =
/*#__PURE__*/
function () {
  function WorldModule(options) {
    var _this = this;

    classCallCheck(this, WorldModule);

    defineProperty(this, "bridges", {
      child: function child(component) {
        if (component.manager && 'createPhysics' in component.manager) {
          var index = _this.bodyIndex++;
          var physics = component.manager.createPhysics(_this, index);
          _this.bodies[index] = physics;

          _this.engine.send(CMD.CREATE_RIGIDBODY, physics.data);
        }

        return component;
      }
    });

    this.engine = options.engine;
    this.bodies = {};
    this.bodyIndex = 0;
    this.simulate = false;
  }

  createClass(WorldModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var _this2 = this;

      var manager = _ref.manager;
      manager.simulateLoop = app.loop(function () {
        if (!_this2.simulate) return;

        _this2.engine.requestUpdate();
      });
      this.engine.listen(function (_ref2) {
        var data = _ref2.data;

        switch (data[0] || data.cmd) {
          case CMD.FEEDBACK_INITIALIZE:
            _this2.simulate = true;
            break;

          case CMD.FEEDBACK_RIGIDBODY:
            var physics = _this2.bodies[data.data.index];
            physics.active = true;
            break;

          case CMD.FEEDBACK_UPDATE:
            _this2.processUpdateFeedback(data);

            break;

          default:
        }
      });
    }
  }, {
    key: "processUpdateFeedback",
    value: function processUpdateFeedback(array) {
      var bodies = this.bodies;
      var numbodies = this.bodyIndex;

      while (numbodies--) {
        var offset = 1 + numbodies * 7;
        var body = bodies[numbodies].component.native;
        body.position.x = array[offset];
        body.position.y = array[offset + 1];
        body.position.z = array[offset + 2];
        body.quaternion.x = array[offset + 3];
        body.quaternion.y = array[offset + 4];
        body.quaternion.z = array[offset + 5];
        body.quaternion.w = array[offset + 6];
      }
    }
  }]);

  return WorldModule;
}();

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

function computeSphereOptions(geometry, options) {
  geometry.computeBoundingSphere();
  return {
    radius: options.radius || geometry.boundingSphere.radius
  };
}

function computeBoxOptions(geometry, options) {
  geometry.computeBoundingBox();
  return {
    size: options.size || geometry.boundingBox.getSize().toArray()
  };
}
var RigidbodyModule =
/*#__PURE__*/
function () {
  function RigidbodyModule() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      type: 'sphere',
      compute: true
    },
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'sphere' : _ref$type,
        compute = _ref.compute,
        options = objectWithoutProperties(_ref, ["type", "compute"]);

    classCallCheck(this, RigidbodyModule);

    this.data = {};
    this.type = type;
    this.compute = Boolean(compute);
    this.options = options;
  }

  createClass(RigidbodyModule, [{
    key: "setup",
    value: function setup(component, _ref2) {
      var _this = this;

      var manager = _ref2.manager;

      manager.createPhysics = function (worldModule, index) {
        var _component$native = component.native,
            position = _component$native.position,
            quaternion = _component$native.quaternion;
        manager.physics = {
          engine: worldModule.engine,
          data: objectSpread({
            type: _this.type,
            position: position.toArray(),
            quaternion: quaternion.toArray(),
            index: index,
            mass: _this.options.mass,
            restitution: _this.options.restitution,
            friction: _this.options.friction,
            linearDamping: _this.options.linearDamping,
            angularDamping: _this.options.angularDamping
          }, _this.computeData(_this.type, component.native.geometry)),
          component: component,
          active: false
        };
        return manager.physics;
      };
    }
  }, {
    key: "computeData",
    value: function computeData(type, geometry) {
      switch (type) {
        case 'sphere':
          return computeSphereOptions(geometry, this.options);

        case 'box':
          return computeBoxOptions(geometry, this.options);

        default:
      }
    }
  }]);

  return RigidbodyModule;
}();

var TARGET = typeof Symbol === 'undefined' ? '__target' : Symbol(),
    SCRIPT_TYPE = 'application/javascript',
    BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
    URL = window.URL || window.webkitURL,
    Worker = window.Worker;
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
        postMessage: function (m) {
          if (o.onmessage) {
            setTimeout(function () {
              o.onmessage({
                data: m,
                target: selfShim
              });
            });
          }
        }
      };
      fn.call(selfShim);

      this.postMessage = function (m) {
        setTimeout(function () {
          selfShim.onmessage({
            data: m,
            target: o
          });
        });
      };

      this.isThisThread = true;
    }
  };
}

if (Worker) {
  var testWorker,
      objURL = createSourceObject('self.onmessage = function () {}'),
      testArray = new Uint8Array(1);

  try {
    // No workers via blobs in Edge 12 and IE 11 and lower :(
    if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) {
      throw new Error('Not available');
    }

    testWorker = new Worker(objURL); // Native browser on some Samsung devices throws for transferables, let's detect it

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
    return URL.createObjectURL(new Blob([str], {
      type: SCRIPT_TYPE
    }));
  } catch (e) {
    var blob = new BlobBuilder();
    blob.append(str);
    return URL.createObjectURL(blob.getBlob(type));
  }
}

var AmmoWorker = new shimWorker("./worker.js", function (window, document) {
  var self = this;

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var objectWithoutProperties = _objectWithoutProperties;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;
  var i = 0;
  var CMD = {
    INITIALIZE: i++,
    FEEDBACK_INITIALIZE: i++,
    CREATE_RIGIDBODY: i++,
    FEEDBACK_RIGIDBODY: i++,
    REQUEST_UPDATE: i++,
    FEEDBACK_UPDATE: i++
  };

  var _temp;

  var transferableMessage = self.webkitPostMessage || self.postMessage;
  var AMMO = null;
  var dt = 0;
  new (_temp =
  /*#__PURE__*/
  function () {
    function AmmoBackend() {
      var _this = this;

      classCallCheck(this, AmmoBackend);
      defineProperty(this, "bodies", []);

      self.onmessage = function (_ref) {
        var data = _ref.data; // console.log(data);

        switch (data[0] || data.cmd) {
          case CMD.INITIALIZE:
            _this.initialize(data.data.path);

            transferableMessage({
              cmd: CMD.FEEDBACK_INITIALIZE
            });
            break;

          case CMD.REQUEST_UPDATE:
            _this.update(); // transferableMessage(true);


            break;

          case CMD.CREATE_RIGIDBODY:
            _this.createRigidBody(data.data);

            break;

          default:
        }
      };
    }

    createClass(AmmoBackend, [{
      key: "initialize",
      value: function initialize(ammoPath) {
        importScripts(ammoPath);
        AMMO = Ammo();
        console.log('Ammo initialized!', AMMO);
        this.prepareSetup();
      }
    }, {
      key: "prepareSetup",
      value: function prepareSetup() {
        this.collisionConfiguration = new AMMO.btDefaultCollisionConfiguration();
        this.dispatcher = new AMMO.btCollisionDispatcher(this.collisionConfiguration);
        this.broadphase = new AMMO.btDbvtBroadphase();
        this.solver = new AMMO.btSequentialImpulseConstraintSolver();
        this.world = new AMMO.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration);
        this.world.setGravity(new AMMO.btVector3(0, -5, 0)); // TODO: Remove
      }
    }, {
      key: "createShape",
      value: function createShape(_ref2) {
        var _ref2$type = _ref2.type,
            type = _ref2$type === void 0 ? 'box' : _ref2$type,
            data = objectWithoutProperties(_ref2, ["type"]);
        var shape;

        switch (type) {
          case 'sphere':
            shape = new AMMO.btSphereShape(data.radius);
            break;

          case 'box':
            shape = new AMMO.btBoxShape(new AMMO.btVector3(data.size[0] / 2, data.size[1] / 2, data.size[2] / 2));
            break;

          default:
        }

        return shape;
      }
    }, {
      key: "createBody",
      value: function createBody(shape, _ref3) {
        var _ref3$mass = _ref3.mass,
            mass = _ref3$mass === void 0 ? 1 : _ref3$mass,
            _ref3$position = _ref3.position,
            position = _ref3$position === void 0 ? [0, 0, 0] : _ref3$position,
            _ref3$restitution = _ref3.restitution,
            restitution = _ref3$restitution === void 0 ? 0 : _ref3$restitution,
            _ref3$friction = _ref3.friction,
            friction = _ref3$friction === void 0 ? 1 : _ref3$friction,
            _ref3$linearDamping = _ref3.linearDamping,
            linearDamping = _ref3$linearDamping === void 0 ? 0 : _ref3$linearDamping,
            _ref3$angularDamping = _ref3.angularDamping,
            angularDamping = _ref3$angularDamping === void 0 ? 0 : _ref3$angularDamping;
        var transform = this.transform = new AMMO.btTransform();
        transform.setIdentity();
        transform.setOrigin(new AMMO.btVector3(position[0], position[1], position[2]));
        var localInertia = new AMMO.btVector3(0, 0, 0);
        shape.calculateLocalInertia(mass, localInertia);
        var motionState = new AMMO.btDefaultMotionState(transform);
        var rbInfo = new AMMO.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
        rbInfo.set_m_friction(friction);
        console.log('restitution', restitution);
        rbInfo.set_m_restitution(restitution);
        rbInfo.set_m_linearDamping(linearDamping);
        rbInfo.set_m_angularDamping(angularDamping);
        var body = new AMMO.btRigidBody(rbInfo);
        return body;
      }
    }, {
      key: "createRigidBody",
      value: function createRigidBody(bodyData) {
        var shape = this.createShape(bodyData);
        var body = this.createBody(shape, {
          mass: typeof bodyData.mass === 'number' ? bodyData.mass : 1,
          position: bodyData.position,
          restitution: bodyData.restitution,
          friction: bodyData.friction,
          linearDamping: bodyData.linearDamping,
          angularDamping: bodyData.angularDamping
        });
        this.world.addRigidBody(body);
        this.bodies.push(body);
        transferableMessage({
          cmd: CMD.FEEDBACK_RIGIDBODY,
          data: {
            index: bodyData.index
          }
        });
      }
    }, {
      key: "updateRigidBodies",
      value: function updateRigidBodies(array, initialOffset) {
        var numbodies = this.bodies.length;

        while (numbodies--) {
          var offset = numbodies * 7 + initialOffset;
          this.bodies[numbodies].getMotionState().getWorldTransform(this.transform);
          var origin = this.transform.getOrigin();
          var rotation = this.transform.getRotation();
          array[offset] = origin.x();
          array[offset + 1] = origin.y();
          array[offset + 2] = origin.z();
          array[offset + 3] = rotation.x();
          array[offset + 4] = rotation.y();
          array[offset + 5] = rotation.z();
          array[offset + 6] = rotation.w();
        }
      }
    }, {
      key: "simulate",
      value: function simulate() {
        this.world.stepSimulation(dt++, 2);
      }
    }, {
      key: "update",
      value: function update() {
        var array = new Float32Array(1 + this.bodies.length * 7);
        array[0] = CMD.FEEDBACK_UPDATE;
        this.simulate();
        this.updateRigidBodies(array, 1);
        transferableMessage(array);
      }
    }]);
    return AmmoBackend;
  }(), _temp)();
});

var AmmoEngine =
/*#__PURE__*/
function () {
  function AmmoEngine(options) {
    classCallCheck(this, AmmoEngine);

    defineProperty(this, "isShared", AmmoEngine.ArrayBuffer instanceof SharedArrayBuffer);

    this.worker = new AmmoWorker();
    this.worker.transferableMessage = this.worker.webkitPostMessage || this.worker.postMessage;
    this.send(CMD.INITIALIZE, options);
  }

  createClass(AmmoEngine, [{
    key: "send",
    value: function send(cmd, data) {
      this.worker.transferableMessage({
        cmd: cmd,
        data: data
      });
    }
  }, {
    key: "sendBuffer",
    value: function sendBuffer(command) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var buffer = this.buffer = new AmmoEngine.ArrayBuffer(Float32Array.BYTES_PER_ELEMENT * (data.length + 1));
      var array = this.array = new Float32Array(buffer);
      array[0] = command;
      array.set(data, 1);
      this.worker.transferableMessage(array, buffer);
    }
  }, {
    key: "requestUpdate",
    value: function requestUpdate() {
      this.worker.transferableMessage({
        cmd: CMD.REQUEST_UPDATE
      });
    }
  }, {
    key: "listen",
    value: function listen(callback) {
      this.worker.addEventListener('message', callback);
    }
  }]);

  return AmmoEngine;
}();

defineProperty(AmmoEngine, "CMD", CMD);

defineProperty(AmmoEngine, "ArrayBuffer", SharedArrayBuffer || ArrayBuffer);

export { WorldModule, RigidbodyModule, AmmoEngine };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLnBoeXNpY3MuYW1tby5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uL3NyYy9lbmdpbmVzL2NvbW1hbmRzLmpzIiwiLi4vc3JjL21vZHVsZXMvV29ybGRNb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXMuanMiLCIuLi9zcmMvbW9kdWxlcy9SaWdpZGJvZHlNb2R1bGUuanMiLCIuLi90b29scy93b3JrZXItcGx1Z2luL3dvcmtlcmhlbHBlci5qcyIsIi4uL3NyYy9lbmdpbmVzL2FtbW9qcy93b3JrZXIuanMiLCIuLi9zcmMvZW5naW5lcy9hbW1vanMvQW1tb0VuZ2luZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJsZXQgaSA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSU5JVElBTElaRTogaSsrLFxuICBGRUVEQkFDS19JTklUSUFMSVpFOiBpKyssXG4gIENSRUFURV9SSUdJREJPRFk6IGkrKyxcbiAgRkVFREJBQ0tfUklHSURCT0RZOiBpKyssXG4gIFJFUVVFU1RfVVBEQVRFOiBpKyssXG4gIEZFRURCQUNLX1VQREFURTogaSsrXG59O1xuIiwiaW1wb3J0IENNRCBmcm9tICcuLi9lbmdpbmVzL2NvbW1hbmRzJztcblxuZXhwb3J0IGNsYXNzIFdvcmxkTW9kdWxlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZW5naW5lID0gb3B0aW9ucy5lbmdpbmU7XG4gICAgdGhpcy5ib2RpZXMgPSB7fTtcbiAgICB0aGlzLmJvZHlJbmRleCA9IDA7XG4gICAgdGhpcy5zaW11bGF0ZSA9IGZhbHNlO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLnNpbXVsYXRlTG9vcCA9IGFwcC5sb29wKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zaW11bGF0ZSkgcmV0dXJuO1xuICAgICAgdGhpcy5lbmdpbmUucmVxdWVzdFVwZGF0ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbmdpbmUubGlzdGVuKCh7ZGF0YX0pID0+IHtcbiAgICAgIHN3aXRjaCAoZGF0YVswXSB8fCBkYXRhLmNtZCkge1xuICAgICAgICBjYXNlIENNRC5GRUVEQkFDS19JTklUSUFMSVpFOlxuICAgICAgICAgIHRoaXMuc2ltdWxhdGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENNRC5GRUVEQkFDS19SSUdJREJPRFk6XG4gICAgICAgICAgY29uc3QgcGh5c2ljcyA9IHRoaXMuYm9kaWVzW2RhdGEuZGF0YS5pbmRleF07XG4gICAgICAgICAgcGh5c2ljcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENNRC5GRUVEQkFDS19VUERBVEU6XG4gICAgICAgICAgdGhpcy5wcm9jZXNzVXBkYXRlRmVlZGJhY2soZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJvY2Vzc1VwZGF0ZUZlZWRiYWNrKGFycmF5KSB7XG4gICAgY29uc3QgYm9kaWVzID0gdGhpcy5ib2RpZXM7XG4gICAgbGV0IG51bWJvZGllcyA9IHRoaXMuYm9keUluZGV4O1xuXG4gICAgd2hpbGUobnVtYm9kaWVzLS0pIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IDEgKyBudW1ib2RpZXMgKiA3O1xuICAgICAgY29uc3QgYm9keSA9IGJvZGllc1tudW1ib2RpZXNdLmNvbXBvbmVudC5uYXRpdmU7XG5cbiAgICAgIGJvZHkucG9zaXRpb24ueCA9IGFycmF5W29mZnNldF07XG4gICAgICBib2R5LnBvc2l0aW9uLnkgPSBhcnJheVtvZmZzZXQgKyAxXTtcbiAgICAgIGJvZHkucG9zaXRpb24ueiA9IGFycmF5W29mZnNldCArIDJdO1xuXG4gICAgICBib2R5LnF1YXRlcm5pb24ueCA9IGFycmF5W29mZnNldCArIDNdO1xuICAgICAgYm9keS5xdWF0ZXJuaW9uLnkgPSBhcnJheVtvZmZzZXQgKyA0XTtcbiAgICAgIGJvZHkucXVhdGVybmlvbi56ID0gYXJyYXlbb2Zmc2V0ICsgNV07XG4gICAgICBib2R5LnF1YXRlcm5pb24udyA9IGFycmF5W29mZnNldCArIDZdO1xuICAgIH1cbiAgfVxuXG4gIGJyaWRnZXMgPSB7XG4gICAgY2hpbGQ6IChjb21wb25lbnQpID0+IHtcbiAgICAgIGlmIChjb21wb25lbnQubWFuYWdlciAmJiAnY3JlYXRlUGh5c2ljcycgaW4gY29tcG9uZW50Lm1hbmFnZXIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJvZHlJbmRleCsrO1xuICAgICAgICBjb25zdCBwaHlzaWNzID0gY29tcG9uZW50Lm1hbmFnZXIuY3JlYXRlUGh5c2ljcyh0aGlzLCBpbmRleCk7XG4gICAgICAgIHRoaXMuYm9kaWVzW2luZGV4XSA9IHBoeXNpY3M7XG4gICAgICAgIHRoaXMuZW5naW5lLnNlbmQoQ01ELkNSRUFURV9SSUdJREJPRFksIHBoeXNpY3MuZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImZ1bmN0aW9uIGNvbXB1dGVTcGhlcmVPcHRpb25zKGdlb21ldHJ5LCBvcHRpb25zKSB7XG4gIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuXG4gIHJldHVybiB7XG4gICAgcmFkaXVzOiBvcHRpb25zLnJhZGl1cyB8fCBnZW9tZXRyeS5ib3VuZGluZ1NwaGVyZS5yYWRpdXNcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNvbXB1dGVCb3hPcHRpb25zKGdlb21ldHJ5LCBvcHRpb25zKSB7XG4gIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuXG4gIHJldHVybiB7XG4gICAgc2l6ZTogb3B0aW9ucy5zaXplIHx8IGdlb21ldHJ5LmJvdW5kaW5nQm94LmdldFNpemUoKS50b0FycmF5KClcbiAgfTtcbn07XG5cbmV4cG9ydCBjbGFzcyBSaWdpZGJvZHlNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih7dHlwZSA9ICdzcGhlcmUnLCBjb21wdXRlLCAuLi5vcHRpb25zfSA9IHt0eXBlOiAnc3BoZXJlJywgY29tcHV0ZTogdHJ1ZX0pIHtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuY29tcHV0ZSA9IEJvb2xlYW4oY29tcHV0ZSk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldHVwKGNvbXBvbmVudCwge21hbmFnZXJ9KSB7XG4gICAgbWFuYWdlci5jcmVhdGVQaHlzaWNzID0gKHdvcmxkTW9kdWxlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qge3Bvc2l0aW9uLCBxdWF0ZXJuaW9ufSA9IGNvbXBvbmVudC5uYXRpdmU7XG5cbiAgICAgIG1hbmFnZXIucGh5c2ljcyA9IHtcbiAgICAgICAgZW5naW5lOiB3b3JsZE1vZHVsZS5lbmdpbmUsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLnRvQXJyYXkoKSxcbiAgICAgICAgICBxdWF0ZXJuaW9uOiBxdWF0ZXJuaW9uLnRvQXJyYXkoKSxcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBtYXNzOiB0aGlzLm9wdGlvbnMubWFzcyxcbiAgICAgICAgICByZXN0aXR1dGlvbjogdGhpcy5vcHRpb25zLnJlc3RpdHV0aW9uLFxuICAgICAgICAgIGZyaWN0aW9uOiB0aGlzLm9wdGlvbnMuZnJpY3Rpb24sXG4gICAgICAgICAgbGluZWFyRGFtcGluZzogdGhpcy5vcHRpb25zLmxpbmVhckRhbXBpbmcsXG4gICAgICAgICAgYW5ndWxhckRhbXBpbmc6IHRoaXMub3B0aW9ucy5hbmd1bGFyRGFtcGluZyxcbiAgICAgICAgICAuLi50aGlzLmNvbXB1dGVEYXRhKHRoaXMudHlwZSwgY29tcG9uZW50Lm5hdGl2ZS5nZW9tZXRyeSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbWFuYWdlci5waHlzaWNzO1xuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVEYXRhKHR5cGUsIGdlb21ldHJ5KSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzcGhlcmUnOlxuICAgICAgICByZXR1cm4gY29tcHV0ZVNwaGVyZU9wdGlvbnMoZ2VvbWV0cnksIHRoaXMub3B0aW9ucyk7XG4gICAgICBjYXNlICdib3gnOlxuICAgICAgICByZXR1cm4gY29tcHV0ZUJveE9wdGlvbnMoZ2VvbWV0cnksIHRoaXMub3B0aW9ucyk7XG4gICAgICBkZWZhdWx0OlxuXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgVEFSR0VUID0gdHlwZW9mIFN5bWJvbCA9PT0gJ3VuZGVmaW5lZCcgPyAnX190YXJnZXQnIDogU3ltYm9sKCksXG4gICAgU0NSSVBUX1RZUEUgPSAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcsXG4gICAgQmxvYkJ1aWxkZXIgPSB3aW5kb3cuQmxvYkJ1aWxkZXIgfHwgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8IHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlcixcbiAgICBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwsXG4gICAgV29ya2VyID0gd2luZG93LldvcmtlcjtcblxuLyoqXG4gKiBSZXR1cm5zIGEgd3JhcHBlciBhcm91bmQgV2ViIFdvcmtlciBjb2RlIHRoYXQgaXMgY29uc3RydWN0aWJsZS5cbiAqXG4gKiBAZnVuY3Rpb24gc2hpbVdvcmtlclxuICpcbiAqIEBwYXJhbSB7IFN0cmluZyB9ICAgIGZpbGVuYW1lICAgIFRoZSBuYW1lIG9mIHRoZSBmaWxlXG4gKiBAcGFyYW0geyBGdW5jdGlvbiB9ICBmbiAgICAgICAgICBGdW5jdGlvbiB3cmFwcGluZyB0aGUgY29kZSBvZiB0aGUgd29ya2VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaW1Xb3JrZXIgKGZpbGVuYW1lLCBmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBTaGltV29ya2VyIChmb3JjZUZhbGxiYWNrKSB7XG4gICAgICAgIHZhciBvID0gdGhpcztcblxuICAgICAgICBpZiAoIWZuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdvcmtlcihmaWxlbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoV29ya2VyICYmICFmb3JjZUZhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBmdW5jdGlvbidzIGlubmVyIGNvZGUgdG8gYSBzdHJpbmcgdG8gY29uc3RydWN0IHRoZSB3b3JrZXJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBmbi50b1N0cmluZygpLnJlcGxhY2UoL15mdW5jdGlvbi4rP3svLCAnJykuc2xpY2UoMCwgLTEpLFxuICAgICAgICAgICAgICAgIG9ialVSTCA9IGNyZWF0ZVNvdXJjZU9iamVjdChzb3VyY2UpO1xuXG4gICAgICAgICAgICB0aGlzW1RBUkdFVF0gPSBuZXcgV29ya2VyKG9ialVSTCk7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9ialVSTCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tUQVJHRVRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHNlbGZTaGltID0ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZTogZnVuY3Rpb24obSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBvLm9ubWVzc2FnZSh7IGRhdGE6IG0sIHRhcmdldDogc2VsZlNoaW0gfSkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmbi5jYWxsKHNlbGZTaGltKTtcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UgPSBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBzZWxmU2hpbS5vbm1lc3NhZ2UoeyBkYXRhOiBtLCB0YXJnZXQ6IG8gfSkgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5pc1RoaXNUaHJlYWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8vIFRlc3QgV29ya2VyIGNhcGFiaWxpdGllc1xuaWYgKFdvcmtlcikge1xuICAgIHZhciB0ZXN0V29ya2VyLFxuICAgICAgICBvYmpVUkwgPSBjcmVhdGVTb3VyY2VPYmplY3QoJ3NlbGYub25tZXNzYWdlID0gZnVuY3Rpb24gKCkge30nKSxcbiAgICAgICAgdGVzdEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBObyB3b3JrZXJzIHZpYSBibG9icyBpbiBFZGdlIDEyIGFuZCBJRSAxMSBhbmQgbG93ZXIgOihcbiAgICAgICAgaWYgKC8oPzpUcmlkZW50fEVkZ2UpXFwvKD86WzU2N118MTIpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYXZhaWxhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGVzdFdvcmtlciA9IG5ldyBXb3JrZXIob2JqVVJMKTtcblxuICAgICAgICAvLyBOYXRpdmUgYnJvd3NlciBvbiBzb21lIFNhbXN1bmcgZGV2aWNlcyB0aHJvd3MgZm9yIHRyYW5zZmVyYWJsZXMsIGxldCdzIGRldGVjdCBpdFxuICAgICAgICB0ZXN0V29ya2VyLnBvc3RNZXNzYWdlKHRlc3RBcnJheSwgW3Rlc3RBcnJheS5idWZmZXJdKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgV29ya2VyID0gbnVsbDtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqVVJMKTtcbiAgICAgICAgaWYgKHRlc3RXb3JrZXIpIHtcbiAgICAgICAgICAgIHRlc3RXb3JrZXIudGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNvdXJjZU9iamVjdChzdHIpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbc3RyXSwgeyB0eXBlOiBTQ1JJUFRfVFlQRSB9KSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2JCdWlsZGVyKCk7XG4gICAgICAgIGJsb2IuYXBwZW5kKHN0cik7XG4gICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IuZ2V0QmxvYih0eXBlKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHNoaW1Xb3JrZXIgZnJvbSAnX190b29scy93b3JrZXItcGx1Z2luX18nO1xuZXhwb3J0IGRlZmF1bHQgbmV3IHNoaW1Xb3JrZXIoXCIuL3dvcmtlci5qc1wiLCBmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xudmFyIHNlbGYgPSB0aGlzO1xuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBfY2xhc3NDYWxsQ2hlY2s7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxudmFyIGNyZWF0ZUNsYXNzID0gX2NyZWF0ZUNsYXNzO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gX2RlZmluZVByb3BlcnR5O1xuXG52YXIgaSA9IDA7XG52YXIgQ01EID0ge1xuICBJTklUSUFMSVpFOiBpKyssXG4gIEZFRURCQUNLX0lOSVRJQUxJWkU6IGkrKyxcbiAgQ1JFQVRFX1JJR0lEQk9EWTogaSsrLFxuICBGRUVEQkFDS19SSUdJREJPRFk6IGkrKyxcbiAgUkVRVUVTVF9VUERBVEU6IGkrKyxcbiAgRkVFREJBQ0tfVVBEQVRFOiBpKytcbn07XG5cbnZhciBfdGVtcDtcbnZhciB0cmFuc2ZlcmFibGVNZXNzYWdlID0gc2VsZi53ZWJraXRQb3N0TWVzc2FnZSB8fCBzZWxmLnBvc3RNZXNzYWdlO1xudmFyIEFNTU8gPSBudWxsO1xudmFyIGR0ID0gMDtcbm5ldyAoX3RlbXAgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBbW1vQmFja2VuZCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQW1tb0JhY2tlbmQpO1xuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJib2RpZXNcIiwgW10pO1xuXG4gICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIGRhdGEgPSBfcmVmLmRhdGE7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgc3dpdGNoIChkYXRhWzBdIHx8IGRhdGEuY21kKSB7XG4gICAgICAgIGNhc2UgQ01ELklOSVRJQUxJWkU6XG4gICAgICAgICAgX3RoaXMuaW5pdGlhbGl6ZShkYXRhLmRhdGEucGF0aCk7XG5cbiAgICAgICAgICB0cmFuc2ZlcmFibGVNZXNzYWdlKHtcbiAgICAgICAgICAgIGNtZDogQ01ELkZFRURCQUNLX0lOSVRJQUxJWkVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIENNRC5SRVFVRVNUX1VQREFURTpcbiAgICAgICAgICBfdGhpcy51cGRhdGUoKTsgLy8gdHJhbnNmZXJhYmxlTWVzc2FnZSh0cnVlKTtcblxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDTUQuQ1JFQVRFX1JJR0lEQk9EWTpcbiAgICAgICAgICBfdGhpcy5jcmVhdGVSaWdpZEJvZHkoZGF0YS5kYXRhKTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKEFtbW9CYWNrZW5kLCBbe1xuICAgIGtleTogXCJpbml0aWFsaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRpYWxpemUoYW1tb1BhdGgpIHtcbiAgICAgIGltcG9ydFNjcmlwdHMoYW1tb1BhdGgpO1xuICAgICAgQU1NTyA9IEFtbW8oKTtcbiAgICAgIGNvbnNvbGUubG9nKCdBbW1vIGluaXRpYWxpemVkIScsIEFNTU8pO1xuICAgICAgdGhpcy5wcmVwYXJlU2V0dXAoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJlcGFyZVNldHVwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBhcmVTZXR1cCgpIHtcbiAgICAgIHRoaXMuY29sbGlzaW9uQ29uZmlndXJhdGlvbiA9IG5ldyBBTU1PLmJ0RGVmYXVsdENvbGxpc2lvbkNvbmZpZ3VyYXRpb24oKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBBTU1PLmJ0Q29sbGlzaW9uRGlzcGF0Y2hlcih0aGlzLmNvbGxpc2lvbkNvbmZpZ3VyYXRpb24pO1xuICAgICAgdGhpcy5icm9hZHBoYXNlID0gbmV3IEFNTU8uYnREYnZ0QnJvYWRwaGFzZSgpO1xuICAgICAgdGhpcy5zb2x2ZXIgPSBuZXcgQU1NTy5idFNlcXVlbnRpYWxJbXB1bHNlQ29uc3RyYWludFNvbHZlcigpO1xuICAgICAgdGhpcy53b3JsZCA9IG5ldyBBTU1PLmJ0RGlzY3JldGVEeW5hbWljc1dvcmxkKHRoaXMuZGlzcGF0Y2hlciwgdGhpcy5icm9hZHBoYXNlLCB0aGlzLnNvbHZlciwgdGhpcy5jb2xsaXNpb25Db25maWd1cmF0aW9uKTtcbiAgICAgIHRoaXMud29ybGQuc2V0R3Jhdml0eShuZXcgQU1NTy5idFZlY3RvcjMoMCwgLTUsIDApKTsgLy8gVE9ETzogUmVtb3ZlXG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZVNoYXBlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVNoYXBlKF9yZWYyKSB7XG4gICAgICB2YXIgX3JlZjIkdHlwZSA9IF9yZWYyLnR5cGUsXG4gICAgICAgICAgdHlwZSA9IF9yZWYyJHR5cGUgPT09IHZvaWQgMCA/ICdib3gnIDogX3JlZjIkdHlwZSxcbiAgICAgICAgICBkYXRhID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFtcInR5cGVcIl0pO1xuXG4gICAgICB2YXIgc2hhcGU7XG5cbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdzcGhlcmUnOlxuICAgICAgICAgIHNoYXBlID0gbmV3IEFNTU8uYnRTcGhlcmVTaGFwZShkYXRhLnJhZGl1cyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnYm94JzpcbiAgICAgICAgICBzaGFwZSA9IG5ldyBBTU1PLmJ0Qm94U2hhcGUobmV3IEFNTU8uYnRWZWN0b3IzKGRhdGEuc2l6ZVswXSAvIDIsIGRhdGEuc2l6ZVsxXSAvIDIsIGRhdGEuc2l6ZVsyXSAvIDIpKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2hhcGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUJvZHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQm9keShzaGFwZSwgX3JlZjMpIHtcbiAgICAgIHZhciBfcmVmMyRtYXNzID0gX3JlZjMubWFzcyxcbiAgICAgICAgICBtYXNzID0gX3JlZjMkbWFzcyA9PT0gdm9pZCAwID8gMSA6IF9yZWYzJG1hc3MsXG4gICAgICAgICAgX3JlZjMkcG9zaXRpb24gPSBfcmVmMy5wb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbiA9IF9yZWYzJHBvc2l0aW9uID09PSB2b2lkIDAgPyBbMCwgMCwgMF0gOiBfcmVmMyRwb3NpdGlvbixcbiAgICAgICAgICBfcmVmMyRyZXN0aXR1dGlvbiA9IF9yZWYzLnJlc3RpdHV0aW9uLFxuICAgICAgICAgIHJlc3RpdHV0aW9uID0gX3JlZjMkcmVzdGl0dXRpb24gPT09IHZvaWQgMCA/IDAgOiBfcmVmMyRyZXN0aXR1dGlvbixcbiAgICAgICAgICBfcmVmMyRmcmljdGlvbiA9IF9yZWYzLmZyaWN0aW9uLFxuICAgICAgICAgIGZyaWN0aW9uID0gX3JlZjMkZnJpY3Rpb24gPT09IHZvaWQgMCA/IDEgOiBfcmVmMyRmcmljdGlvbixcbiAgICAgICAgICBfcmVmMyRsaW5lYXJEYW1waW5nID0gX3JlZjMubGluZWFyRGFtcGluZyxcbiAgICAgICAgICBsaW5lYXJEYW1waW5nID0gX3JlZjMkbGluZWFyRGFtcGluZyA9PT0gdm9pZCAwID8gMCA6IF9yZWYzJGxpbmVhckRhbXBpbmcsXG4gICAgICAgICAgX3JlZjMkYW5ndWxhckRhbXBpbmcgPSBfcmVmMy5hbmd1bGFyRGFtcGluZyxcbiAgICAgICAgICBhbmd1bGFyRGFtcGluZyA9IF9yZWYzJGFuZ3VsYXJEYW1waW5nID09PSB2b2lkIDAgPyAwIDogX3JlZjMkYW5ndWxhckRhbXBpbmc7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm0gPSBuZXcgQU1NTy5idFRyYW5zZm9ybSgpO1xuICAgICAgdHJhbnNmb3JtLnNldElkZW50aXR5KCk7XG4gICAgICB0cmFuc2Zvcm0uc2V0T3JpZ2luKG5ldyBBTU1PLmJ0VmVjdG9yMyhwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIHBvc2l0aW9uWzJdKSk7XG4gICAgICB2YXIgbG9jYWxJbmVydGlhID0gbmV3IEFNTU8uYnRWZWN0b3IzKDAsIDAsIDApO1xuICAgICAgc2hhcGUuY2FsY3VsYXRlTG9jYWxJbmVydGlhKG1hc3MsIGxvY2FsSW5lcnRpYSk7XG4gICAgICB2YXIgbW90aW9uU3RhdGUgPSBuZXcgQU1NTy5idERlZmF1bHRNb3Rpb25TdGF0ZSh0cmFuc2Zvcm0pO1xuICAgICAgdmFyIHJiSW5mbyA9IG5ldyBBTU1PLmJ0UmlnaWRCb2R5Q29uc3RydWN0aW9uSW5mbyhtYXNzLCBtb3Rpb25TdGF0ZSwgc2hhcGUsIGxvY2FsSW5lcnRpYSk7XG4gICAgICByYkluZm8uc2V0X21fZnJpY3Rpb24oZnJpY3Rpb24pO1xuICAgICAgY29uc29sZS5sb2coJ3Jlc3RpdHV0aW9uJywgcmVzdGl0dXRpb24pO1xuICAgICAgcmJJbmZvLnNldF9tX3Jlc3RpdHV0aW9uKHJlc3RpdHV0aW9uKTtcbiAgICAgIHJiSW5mby5zZXRfbV9saW5lYXJEYW1waW5nKGxpbmVhckRhbXBpbmcpO1xuICAgICAgcmJJbmZvLnNldF9tX2FuZ3VsYXJEYW1waW5nKGFuZ3VsYXJEYW1waW5nKTtcbiAgICAgIHZhciBib2R5ID0gbmV3IEFNTU8uYnRSaWdpZEJvZHkocmJJbmZvKTtcbiAgICAgIHJldHVybiBib2R5O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVSaWdpZEJvZHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlUmlnaWRCb2R5KGJvZHlEYXRhKSB7XG4gICAgICB2YXIgc2hhcGUgPSB0aGlzLmNyZWF0ZVNoYXBlKGJvZHlEYXRhKTtcbiAgICAgIHZhciBib2R5ID0gdGhpcy5jcmVhdGVCb2R5KHNoYXBlLCB7XG4gICAgICAgIG1hc3M6IHR5cGVvZiBib2R5RGF0YS5tYXNzID09PSAnbnVtYmVyJyA/IGJvZHlEYXRhLm1hc3MgOiAxLFxuICAgICAgICBwb3NpdGlvbjogYm9keURhdGEucG9zaXRpb24sXG4gICAgICAgIHJlc3RpdHV0aW9uOiBib2R5RGF0YS5yZXN0aXR1dGlvbixcbiAgICAgICAgZnJpY3Rpb246IGJvZHlEYXRhLmZyaWN0aW9uLFxuICAgICAgICBsaW5lYXJEYW1waW5nOiBib2R5RGF0YS5saW5lYXJEYW1waW5nLFxuICAgICAgICBhbmd1bGFyRGFtcGluZzogYm9keURhdGEuYW5ndWxhckRhbXBpbmdcbiAgICAgIH0pO1xuICAgICAgdGhpcy53b3JsZC5hZGRSaWdpZEJvZHkoYm9keSk7XG4gICAgICB0aGlzLmJvZGllcy5wdXNoKGJvZHkpO1xuICAgICAgdHJhbnNmZXJhYmxlTWVzc2FnZSh7XG4gICAgICAgIGNtZDogQ01ELkZFRURCQUNLX1JJR0lEQk9EWSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGluZGV4OiBib2R5RGF0YS5pbmRleFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlUmlnaWRCb2RpZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlUmlnaWRCb2RpZXMoYXJyYXksIGluaXRpYWxPZmZzZXQpIHtcbiAgICAgIHZhciBudW1ib2RpZXMgPSB0aGlzLmJvZGllcy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChudW1ib2RpZXMtLSkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbnVtYm9kaWVzICogNyArIGluaXRpYWxPZmZzZXQ7XG4gICAgICAgIHRoaXMuYm9kaWVzW251bWJvZGllc10uZ2V0TW90aW9uU3RhdGUoKS5nZXRXb3JsZFRyYW5zZm9ybSh0aGlzLnRyYW5zZm9ybSk7XG4gICAgICAgIHZhciBvcmlnaW4gPSB0aGlzLnRyYW5zZm9ybS5nZXRPcmlnaW4oKTtcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gdGhpcy50cmFuc2Zvcm0uZ2V0Um90YXRpb24oKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0XSA9IG9yaWdpbi54KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDFdID0gb3JpZ2luLnkoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgMl0gPSBvcmlnaW4ueigpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyAzXSA9IHJvdGF0aW9uLngoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgNF0gPSByb3RhdGlvbi55KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDVdID0gcm90YXRpb24ueigpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyA2XSA9IHJvdGF0aW9uLncoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2ltdWxhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2ltdWxhdGUoKSB7XG4gICAgICB0aGlzLndvcmxkLnN0ZXBTaW11bGF0aW9uKGR0KyssIDIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgdmFyIGFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSgxICsgdGhpcy5ib2RpZXMubGVuZ3RoICogNyk7XG4gICAgICBhcnJheVswXSA9IENNRC5GRUVEQkFDS19VUERBVEU7XG4gICAgICB0aGlzLnNpbXVsYXRlKCk7XG4gICAgICB0aGlzLnVwZGF0ZVJpZ2lkQm9kaWVzKGFycmF5LCAxKTtcbiAgICAgIHRyYW5zZmVyYWJsZU1lc3NhZ2UoYXJyYXkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBbW1vQmFja2VuZDtcbn0oKSwgX3RlbXApKCk7XG5cblxufSk7IiwiaW1wb3J0IEFtbW9Xb3JrZXIgZnJvbSAnd29ya2VyIS4vd29ya2VyLmpzJztcbmltcG9ydCBDTUQgZnJvbSAnLi4vY29tbWFuZHMnO1xuXG5leHBvcnQgY2xhc3MgQW1tb0VuZ2luZSB7XG4gIHN0YXRpYyBDTUQgPSBDTUQ7XG4gIHN0YXRpYyBBcnJheUJ1ZmZlciA9IFNoYXJlZEFycmF5QnVmZmVyIHx8IEFycmF5QnVmZmVyO1xuICBpc1NoYXJlZCA9IEFtbW9FbmdpbmUuQXJyYXlCdWZmZXIgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy53b3JrZXIgPSBuZXcgQW1tb1dvcmtlcigpO1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UgPSB0aGlzLndvcmtlci53ZWJraXRQb3N0TWVzc2FnZSB8fCB0aGlzLndvcmtlci5wb3N0TWVzc2FnZTtcbiAgICB0aGlzLnNlbmQoQ01ELklOSVRJQUxJWkUsIG9wdGlvbnMpO1xuICB9XG5cbiAgc2VuZChjbWQsIGRhdGEpIHtcbiAgICB0aGlzLndvcmtlci50cmFuc2ZlcmFibGVNZXNzYWdlKHtjbWQsIGRhdGF9KTtcbiAgfVxuXG4gIHNlbmRCdWZmZXIoY29tbWFuZCwgZGF0YSA9IFtdKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXIgPSBuZXcgQW1tb0VuZ2luZS5BcnJheUJ1ZmZlcihGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiAoZGF0YS5sZW5ndGggKyAxKSk7XG4gICAgY29uc3QgYXJyYXkgPSB0aGlzLmFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXIpO1xuICAgIGFycmF5WzBdID0gY29tbWFuZDtcblxuICAgIGFycmF5LnNldChkYXRhLCAxKTtcbiAgICB0aGlzLndvcmtlci50cmFuc2ZlcmFibGVNZXNzYWdlKGFycmF5LCBidWZmZXIpO1xuICB9XG5cbiAgcmVxdWVzdFVwZGF0ZSgpIHtcbiAgICB0aGlzLndvcmtlci50cmFuc2ZlcmFibGVNZXNzYWdlKHtjbWQ6IENNRC5SRVFVRVNUX1VQREFURX0pO1xuICB9XG5cbiAgbGlzdGVuKGNhbGxiYWNrKSB7XG4gICAgdGhpcy53b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGNhbGxiYWNrKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImkiLCJJTklUSUFMSVpFIiwiRkVFREJBQ0tfSU5JVElBTElaRSIsIkNSRUFURV9SSUdJREJPRFkiLCJGRUVEQkFDS19SSUdJREJPRFkiLCJSRVFVRVNUX1VQREFURSIsIkZFRURCQUNLX1VQREFURSIsIldvcmxkTW9kdWxlIiwib3B0aW9ucyIsImNoaWxkIiwiY29tcG9uZW50IiwibWFuYWdlciIsImluZGV4IiwiYm9keUluZGV4IiwicGh5c2ljcyIsImNyZWF0ZVBoeXNpY3MiLCJib2RpZXMiLCJlbmdpbmUiLCJzZW5kIiwiQ01EIiwiZGF0YSIsInNpbXVsYXRlIiwiYXBwIiwic2ltdWxhdGVMb29wIiwibG9vcCIsInJlcXVlc3RVcGRhdGUiLCJsaXN0ZW4iLCJjbWQiLCJhY3RpdmUiLCJwcm9jZXNzVXBkYXRlRmVlZGJhY2siLCJhcnJheSIsIm51bWJvZGllcyIsIm9mZnNldCIsImJvZHkiLCJuYXRpdmUiLCJwb3NpdGlvbiIsIngiLCJ5IiwieiIsInF1YXRlcm5pb24iLCJ3IiwiY29tcHV0ZVNwaGVyZU9wdGlvbnMiLCJnZW9tZXRyeSIsImNvbXB1dGVCb3VuZGluZ1NwaGVyZSIsInJhZGl1cyIsImJvdW5kaW5nU3BoZXJlIiwiY29tcHV0ZUJveE9wdGlvbnMiLCJjb21wdXRlQm91bmRpbmdCb3giLCJzaXplIiwiYm91bmRpbmdCb3giLCJnZXRTaXplIiwidG9BcnJheSIsIlJpZ2lkYm9keU1vZHVsZSIsInR5cGUiLCJjb21wdXRlIiwiQm9vbGVhbiIsIndvcmxkTW9kdWxlIiwibWFzcyIsInJlc3RpdHV0aW9uIiwiZnJpY3Rpb24iLCJsaW5lYXJEYW1waW5nIiwiYW5ndWxhckRhbXBpbmciLCJjb21wdXRlRGF0YSIsIlRBUkdFVCIsIlN5bWJvbCIsIlNDUklQVF9UWVBFIiwiQmxvYkJ1aWxkZXIiLCJ3aW5kb3ciLCJXZWJLaXRCbG9iQnVpbGRlciIsIk1vekJsb2JCdWlsZGVyIiwiTVNCbG9iQnVpbGRlciIsIlVSTCIsIndlYmtpdFVSTCIsIldvcmtlciIsInNoaW1Xb3JrZXIiLCJmaWxlbmFtZSIsImZuIiwiU2hpbVdvcmtlciIsImZvcmNlRmFsbGJhY2siLCJvIiwic291cmNlIiwidG9TdHJpbmciLCJyZXBsYWNlIiwic2xpY2UiLCJvYmpVUkwiLCJjcmVhdGVTb3VyY2VPYmplY3QiLCJyZXZva2VPYmplY3RVUkwiLCJzZWxmU2hpbSIsInBvc3RNZXNzYWdlIiwibSIsIm9ubWVzc2FnZSIsInNldFRpbWVvdXQiLCJ0YXJnZXQiLCJjYWxsIiwiaXNUaGlzVGhyZWFkIiwidGVzdFdvcmtlciIsInRlc3RBcnJheSIsIlVpbnQ4QXJyYXkiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiRXJyb3IiLCJidWZmZXIiLCJlIiwidGVybWluYXRlIiwic3RyIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsImJsb2IiLCJhcHBlbmQiLCJnZXRCbG9iIiwiZG9jdW1lbnQiLCJzZWxmIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJleGNsdWRlZCIsInNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwibGVuZ3RoIiwiaW5kZXhPZiIsIm9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzb3VyY2VTeW1ib2xLZXlzIiwicHJvdG90eXBlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJvYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJjbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJjcmVhdGVDbGFzcyIsIl9kZWZpbmVQcm9wZXJ0eSIsIm9iaiIsInZhbHVlIiwiX3RlbXAiLCJ0cmFuc2ZlcmFibGVNZXNzYWdlIiwid2Via2l0UG9zdE1lc3NhZ2UiLCJBTU1PIiwiZHQiLCJBbW1vQmFja2VuZCIsIl90aGlzIiwiX3JlZiIsImluaXRpYWxpemUiLCJwYXRoIiwidXBkYXRlIiwiY3JlYXRlUmlnaWRCb2R5IiwiYW1tb1BhdGgiLCJpbXBvcnRTY3JpcHRzIiwiQW1tbyIsImNvbnNvbGUiLCJsb2ciLCJwcmVwYXJlU2V0dXAiLCJjb2xsaXNpb25Db25maWd1cmF0aW9uIiwiYnREZWZhdWx0Q29sbGlzaW9uQ29uZmlndXJhdGlvbiIsImRpc3BhdGNoZXIiLCJidENvbGxpc2lvbkRpc3BhdGNoZXIiLCJicm9hZHBoYXNlIiwiYnREYnZ0QnJvYWRwaGFzZSIsInNvbHZlciIsImJ0U2VxdWVudGlhbEltcHVsc2VDb25zdHJhaW50U29sdmVyIiwid29ybGQiLCJidERpc2NyZXRlRHluYW1pY3NXb3JsZCIsInNldEdyYXZpdHkiLCJidFZlY3RvcjMiLCJjcmVhdGVTaGFwZSIsIl9yZWYyIiwiX3JlZjIkdHlwZSIsInNoYXBlIiwiYnRTcGhlcmVTaGFwZSIsImJ0Qm94U2hhcGUiLCJjcmVhdGVCb2R5IiwiX3JlZjMiLCJfcmVmMyRtYXNzIiwiX3JlZjMkcG9zaXRpb24iLCJfcmVmMyRyZXN0aXR1dGlvbiIsIl9yZWYzJGZyaWN0aW9uIiwiX3JlZjMkbGluZWFyRGFtcGluZyIsIl9yZWYzJGFuZ3VsYXJEYW1waW5nIiwidHJhbnNmb3JtIiwiYnRUcmFuc2Zvcm0iLCJzZXRJZGVudGl0eSIsInNldE9yaWdpbiIsImxvY2FsSW5lcnRpYSIsImNhbGN1bGF0ZUxvY2FsSW5lcnRpYSIsIm1vdGlvblN0YXRlIiwiYnREZWZhdWx0TW90aW9uU3RhdGUiLCJyYkluZm8iLCJidFJpZ2lkQm9keUNvbnN0cnVjdGlvbkluZm8iLCJzZXRfbV9mcmljdGlvbiIsInNldF9tX3Jlc3RpdHV0aW9uIiwic2V0X21fbGluZWFyRGFtcGluZyIsInNldF9tX2FuZ3VsYXJEYW1waW5nIiwiYnRSaWdpZEJvZHkiLCJib2R5RGF0YSIsImFkZFJpZ2lkQm9keSIsInB1c2giLCJ1cGRhdGVSaWdpZEJvZGllcyIsImluaXRpYWxPZmZzZXQiLCJnZXRNb3Rpb25TdGF0ZSIsImdldFdvcmxkVHJhbnNmb3JtIiwib3JpZ2luIiwiZ2V0T3JpZ2luIiwicm90YXRpb24iLCJnZXRSb3RhdGlvbiIsInN0ZXBTaW11bGF0aW9uIiwiRmxvYXQzMkFycmF5IiwiQW1tb0VuZ2luZSIsIkFycmF5QnVmZmVyIiwiU2hhcmVkQXJyYXlCdWZmZXIiLCJ3b3JrZXIiLCJBbW1vV29ya2VyIiwiY29tbWFuZCIsIkJZVEVTX1BFUl9FTEVNRU5UIiwic2V0IiwiY2FsbGJhY2siLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtFQUM5QyxJQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQyxFQUFFO0lBQ3RDLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztHQUMxRDtDQUNGOztBQUVELGtCQUFjLEdBQUcsZUFBZTs7QUNOaEMsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0VBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO0lBQ3ZELFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQy9CLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN0RCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0dBQzNEO0NBQ0Y7O0FBRUQsU0FBUyxZQUFZLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7RUFDMUQsSUFBSSxVQUFVLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztFQUNyRSxJQUFJLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7RUFDN0QsT0FBTyxXQUFXLENBQUM7Q0FDcEI7O0FBRUQsZUFBYyxHQUFHLFlBQVk7O0FDaEI3QixTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtFQUN4QyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7SUFDZCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7TUFDOUIsS0FBSyxFQUFFLEtBQUs7TUFDWixVQUFVLEVBQUUsSUFBSTtNQUNoQixZQUFZLEVBQUUsSUFBSTtNQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQztHQUNKLE1BQU07SUFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0dBQ2xCOztFQUVELE9BQU8sR0FBRyxDQUFDO0NBQ1o7O0FBRUQsa0JBQWMsR0FBRyxlQUFlOztBQ2ZoQyxJQUFJQSxDQUFDLEdBQUcsQ0FBUjtBQUVBLFVBQWU7RUFDYkMsVUFBVSxFQUFFRCxDQUFDLEVBREE7RUFFYkUsbUJBQW1CLEVBQUVGLENBQUMsRUFGVDtFQUdiRyxnQkFBZ0IsRUFBRUgsQ0FBQyxFQUhOO0VBSWJJLGtCQUFrQixFQUFFSixDQUFDLEVBSlI7RUFLYkssY0FBYyxFQUFFTCxDQUFDLEVBTEo7RUFNYk0sZUFBZSxFQUFFTixDQUFDO0NBTnBCOztJQ0FhTyxXQUFiOztBQUFBO3VCQUNjQyxPQUFaLEVBQXFCOzs7OztvQ0FrRFg7TUFDUkMsS0FBSyxFQUFFLGVBQUNDLFNBQUQsRUFBZTtZQUNoQkEsU0FBUyxDQUFDQyxPQUFWLElBQXFCLG1CQUFtQkQsU0FBUyxDQUFDQyxPQUF0RCxFQUErRDtjQUN2REMsS0FBSyxHQUFHLEtBQUksQ0FBQ0MsU0FBTCxFQUFkO2NBQ01DLE9BQU8sR0FBR0osU0FBUyxDQUFDQyxPQUFWLENBQWtCSSxhQUFsQixDQUFnQyxLQUFoQyxFQUFzQ0gsS0FBdEMsQ0FBaEI7VUFDQSxLQUFJLENBQUNJLE1BQUwsQ0FBWUosS0FBWixJQUFxQkUsT0FBckI7O1VBQ0EsS0FBSSxDQUFDRyxNQUFMLENBQVlDLElBQVosQ0FBaUJDLEdBQUcsQ0FBQ2hCLGdCQUFyQixFQUF1Q1csT0FBTyxDQUFDTSxJQUEvQzs7O2VBR0tWLFNBQVA7O0tBM0RpQjs7U0FDZE8sTUFBTCxHQUFjVCxPQUFPLENBQUNTLE1BQXRCO1NBQ0tELE1BQUwsR0FBYyxFQUFkO1NBQ0tILFNBQUwsR0FBaUIsQ0FBakI7U0FDS1EsUUFBTCxHQUFnQixLQUFoQjs7Ozs7MEJBR0lDLEdBUlIsUUFRd0I7OztVQUFWWCxPQUFVLFFBQVZBLE9BQVU7TUFDcEJBLE9BQU8sQ0FBQ1ksWUFBUixHQUF1QkQsR0FBRyxDQUFDRSxJQUFKLENBQVMsWUFBTTtZQUNoQyxDQUFDLE1BQUksQ0FBQ0gsUUFBVixFQUFvQjs7UUFDcEIsTUFBSSxDQUFDSixNQUFMLENBQVlRLGFBQVo7T0FGcUIsQ0FBdkI7V0FLS1IsTUFBTCxDQUFZUyxNQUFaLENBQW1CLGlCQUFZO1lBQVZOLElBQVUsU0FBVkEsSUFBVTs7Z0JBQ3JCQSxJQUFJLENBQUMsQ0FBRCxDQUFKLElBQVdBLElBQUksQ0FBQ08sR0FBeEI7ZUFDT1IsR0FBRyxDQUFDakIsbUJBQVQ7WUFDRSxNQUFJLENBQUNtQixRQUFMLEdBQWdCLElBQWhCOzs7ZUFFR0YsR0FBRyxDQUFDZixrQkFBVDtnQkFDUVUsT0FBTyxHQUFHLE1BQUksQ0FBQ0UsTUFBTCxDQUFZSSxJQUFJLENBQUNBLElBQUwsQ0FBVVIsS0FBdEIsQ0FBaEI7WUFDQUUsT0FBTyxDQUFDYyxNQUFSLEdBQWlCLElBQWpCOzs7ZUFFR1QsR0FBRyxDQUFDYixlQUFUO1lBQ0UsTUFBSSxDQUFDdUIscUJBQUwsQ0FBMkJULElBQTNCOzs7Ozs7T0FWTjs7OzswQ0FrQm9CVSxLQWhDeEIsRUFnQytCO1VBQ3JCZCxNQUFNLEdBQUcsS0FBS0EsTUFBcEI7VUFDSWUsU0FBUyxHQUFHLEtBQUtsQixTQUFyQjs7YUFFTWtCLFNBQVMsRUFBZixFQUFtQjtZQUNYQyxNQUFNLEdBQUcsSUFBSUQsU0FBUyxHQUFHLENBQS9CO1lBQ01FLElBQUksR0FBR2pCLE1BQU0sQ0FBQ2UsU0FBRCxDQUFOLENBQWtCckIsU0FBbEIsQ0FBNEJ3QixNQUF6QztRQUVBRCxJQUFJLENBQUNFLFFBQUwsQ0FBY0MsQ0FBZCxHQUFrQk4sS0FBSyxDQUFDRSxNQUFELENBQXZCO1FBQ0FDLElBQUksQ0FBQ0UsUUFBTCxDQUFjRSxDQUFkLEdBQWtCUCxLQUFLLENBQUNFLE1BQU0sR0FBRyxDQUFWLENBQXZCO1FBQ0FDLElBQUksQ0FBQ0UsUUFBTCxDQUFjRyxDQUFkLEdBQWtCUixLQUFLLENBQUNFLE1BQU0sR0FBRyxDQUFWLENBQXZCO1FBRUFDLElBQUksQ0FBQ00sVUFBTCxDQUFnQkgsQ0FBaEIsR0FBb0JOLEtBQUssQ0FBQ0UsTUFBTSxHQUFHLENBQVYsQ0FBekI7UUFDQUMsSUFBSSxDQUFDTSxVQUFMLENBQWdCRixDQUFoQixHQUFvQlAsS0FBSyxDQUFDRSxNQUFNLEdBQUcsQ0FBVixDQUF6QjtRQUNBQyxJQUFJLENBQUNNLFVBQUwsQ0FBZ0JELENBQWhCLEdBQW9CUixLQUFLLENBQUNFLE1BQU0sR0FBRyxDQUFWLENBQXpCO1FBQ0FDLElBQUksQ0FBQ00sVUFBTCxDQUFnQkMsQ0FBaEIsR0FBb0JWLEtBQUssQ0FBQ0UsTUFBTSxHQUFHLENBQVYsQ0FBekI7Ozs7Ozs7O0FDL0NOLFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRTtFQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN6QyxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFFbEMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsS0FBSyxVQUFVLEVBQUU7TUFDdEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtRQUNsRixPQUFPLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO09BQ2hFLENBQUMsQ0FBQyxDQUFDO0tBQ0w7O0lBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtNQUM3QixjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMxQyxDQUFDLENBQUM7R0FDSjs7RUFFRCxPQUFPLE1BQU0sQ0FBQztDQUNmOztBQUVELGdCQUFjLEdBQUcsYUFBYTs7QUNyQjlCLFNBQVMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtFQUN2RCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7RUFDOUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0VBQ2hCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDckMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDOztFQUVYLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN0QyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUztJQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQzNCOztFQUVELE9BQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRUQsZ0NBQWMsR0FBRyw2QkFBNkI7O0FDYjlDLFNBQVMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtFQUNsRCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7RUFDOUIsSUFBSSxNQUFNLEdBQUcsNEJBQTRCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0VBQzVELElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQzs7RUFFWCxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRTtJQUNoQyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFFNUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7TUFDNUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzFCLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUztNQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLFNBQVM7TUFDdkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjtHQUNGOztFQUVELE9BQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRUQsMkJBQWMsR0FBRyx3QkFBd0I7O0FDckJ6QyxTQUFTUyxvQkFBVCxDQUE4QkMsUUFBOUIsRUFBd0NsQyxPQUF4QyxFQUFpRDtFQUMvQ2tDLFFBQVEsQ0FBQ0MscUJBQVQ7U0FFTztJQUNMQyxNQUFNLEVBQUVwQyxPQUFPLENBQUNvQyxNQUFSLElBQWtCRixRQUFRLENBQUNHLGNBQVQsQ0FBd0JEO0dBRHBEOzs7QUFLRixTQUFTRSxpQkFBVCxDQUEyQkosUUFBM0IsRUFBcUNsQyxPQUFyQyxFQUE4QztFQUM1Q2tDLFFBQVEsQ0FBQ0ssa0JBQVQ7U0FFTztJQUNMQyxJQUFJLEVBQUV4QyxPQUFPLENBQUN3QyxJQUFSLElBQWdCTixRQUFRLENBQUNPLFdBQVQsQ0FBcUJDLE9BQXJCLEdBQStCQyxPQUEvQjtHQUR4Qjs7SUFLV0MsZUFBYjs7QUFBQTs2QkFDd0Y7bUZBQWpDO01BQUNDLElBQUksRUFBRSxRQUFQO01BQWlCQyxPQUFPLEVBQUU7S0FBTzt5QkFBekVELElBQXlFO1FBQXpFQSxJQUF5RSwwQkFBbEUsUUFBa0U7UUFBeERDLE9BQXdELFFBQXhEQSxPQUF3RDtRQUE1QzlDLE9BQTRDOzs7O1NBQy9FWSxJQUFMLEdBQVksRUFBWjtTQUNLaUMsSUFBTCxHQUFZQSxJQUFaO1NBQ0tDLE9BQUwsR0FBZUMsT0FBTyxDQUFDRCxPQUFELENBQXRCO1NBQ0s5QyxPQUFMLEdBQWVBLE9BQWY7Ozs7OzBCQUdJRSxTQVJSLFNBUThCOzs7VUFBVkMsT0FBVSxTQUFWQSxPQUFVOztNQUMxQkEsT0FBTyxDQUFDSSxhQUFSLEdBQXdCLFVBQUN5QyxXQUFELEVBQWM1QyxLQUFkLEVBQXdCO2dDQUNmRixTQUFTLENBQUN3QixNQURLO1lBQ3ZDQyxRQUR1QyxxQkFDdkNBLFFBRHVDO1lBQzdCSSxVQUQ2QixxQkFDN0JBLFVBRDZCO1FBRzlDNUIsT0FBTyxDQUFDRyxPQUFSLEdBQWtCO1VBQ2hCRyxNQUFNLEVBQUV1QyxXQUFXLENBQUN2QyxNQURKO1VBRWhCRyxJQUFJO1lBQ0ZpQyxJQUFJLEVBQUUsS0FBSSxDQUFDQSxJQURUO1lBRUZsQixRQUFRLEVBQUVBLFFBQVEsQ0FBQ2dCLE9BQVQsRUFGUjtZQUdGWixVQUFVLEVBQUVBLFVBQVUsQ0FBQ1ksT0FBWCxFQUhWO1lBSUZ2QyxLQUFLLEVBQUxBLEtBSkU7WUFLRjZDLElBQUksRUFBRSxLQUFJLENBQUNqRCxPQUFMLENBQWFpRCxJQUxqQjtZQU1GQyxXQUFXLEVBQUUsS0FBSSxDQUFDbEQsT0FBTCxDQUFha0QsV0FOeEI7WUFPRkMsUUFBUSxFQUFFLEtBQUksQ0FBQ25ELE9BQUwsQ0FBYW1ELFFBUHJCO1lBUUZDLGFBQWEsRUFBRSxLQUFJLENBQUNwRCxPQUFMLENBQWFvRCxhQVIxQjtZQVNGQyxjQUFjLEVBQUUsS0FBSSxDQUFDckQsT0FBTCxDQUFhcUQ7YUFDMUIsS0FBSSxDQUFDQyxXQUFMLENBQWlCLEtBQUksQ0FBQ1QsSUFBdEIsRUFBNEIzQyxTQUFTLENBQUN3QixNQUFWLENBQWlCUSxRQUE3QyxDQVZELENBRlk7VUFjaEJoQyxTQUFTLEVBQVRBLFNBZGdCO1VBZWhCa0IsTUFBTSxFQUFFO1NBZlY7ZUFrQk9qQixPQUFPLENBQUNHLE9BQWY7T0FyQkY7Ozs7Z0NBeUJVdUMsSUFsQ2QsRUFrQ29CWCxRQWxDcEIsRUFrQzhCO2NBQ2xCVyxJQUFSO2FBQ08sUUFBTDtpQkFDU1osb0JBQW9CLENBQUNDLFFBQUQsRUFBVyxLQUFLbEMsT0FBaEIsQ0FBM0I7O2FBQ0csS0FBTDtpQkFDU3NDLGlCQUFpQixDQUFDSixRQUFELEVBQVcsS0FBS2xDLE9BQWhCLENBQXhCOzs7Ozs7Ozs7O0FDdkRSLElBQUl1RCxNQUFNLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQyxVQUFoQyxHQUE2Q0EsTUFBTSxFQUFoRTtJQUNJQyxXQUFXLEdBQUcsd0JBRGxCO0lBRUlDLFdBQVcsR0FBR0MsTUFBTSxDQUFDRCxXQUFQLElBQXNCQyxNQUFNLENBQUNDLGlCQUE3QixJQUFrREQsTUFBTSxDQUFDRSxjQUF6RCxJQUEyRUYsTUFBTSxDQUFDRyxhQUZwRztJQUdJQyxHQUFHLEdBQUdKLE1BQU0sQ0FBQ0ksR0FBUCxJQUFjSixNQUFNLENBQUNLLFNBSC9CO0lBSUlDLE1BQU0sR0FBR04sTUFBTSxDQUFDTSxNQUpwQjs7Ozs7Ozs7OztBQWNBLEFBQWUsU0FBU0MsVUFBVCxDQUFxQkMsUUFBckIsRUFBK0JDLEVBQS9CLEVBQW1DO1NBQ3ZDLFNBQVNDLFVBQVQsQ0FBcUJDLGFBQXJCLEVBQW9DO1FBQ25DQyxDQUFDLEdBQUcsSUFBUjs7UUFFSSxDQUFDSCxFQUFMLEVBQVM7YUFDRSxJQUFJSCxNQUFKLENBQVdFLFFBQVgsQ0FBUDtLQURKLE1BR0ssSUFBSUYsTUFBTSxJQUFJLENBQUNLLGFBQWYsRUFBOEI7O1VBRTNCRSxNQUFNLEdBQUdKLEVBQUUsQ0FBQ0ssUUFBSCxHQUFjQyxPQUFkLENBQXNCLGVBQXRCLEVBQXVDLEVBQXZDLEVBQTJDQyxLQUEzQyxDQUFpRCxDQUFqRCxFQUFvRCxDQUFDLENBQXJELENBQWI7VUFDSUMsTUFBTSxHQUFHQyxrQkFBa0IsQ0FBQ0wsTUFBRCxDQUQvQjtXQUdLakIsTUFBTCxJQUFlLElBQUlVLE1BQUosQ0FBV1csTUFBWCxDQUFmO01BQ0FiLEdBQUcsQ0FBQ2UsZUFBSixDQUFvQkYsTUFBcEI7YUFDTyxLQUFLckIsTUFBTCxDQUFQO0tBUEMsTUFTQTtVQUNHd0IsUUFBUSxHQUFHO1FBQ1BDLFdBQVcsRUFBRSxVQUFTQyxDQUFULEVBQVk7Y0FDakJWLENBQUMsQ0FBQ1csU0FBTixFQUFpQjtZQUNiQyxVQUFVLENBQUMsWUFBVTtjQUFFWixDQUFDLENBQUNXLFNBQUYsQ0FBWTtnQkFBRXRFLElBQUksRUFBRXFFLENBQVI7Z0JBQVdHLE1BQU0sRUFBRUw7ZUFBL0I7YUFBYixDQUFWOzs7T0FIaEI7TUFRQVgsRUFBRSxDQUFDaUIsSUFBSCxDQUFRTixRQUFSOztXQUNLQyxXQUFMLEdBQW1CLFVBQVNDLENBQVQsRUFBWTtRQUMzQkUsVUFBVSxDQUFDLFlBQVU7VUFBRUosUUFBUSxDQUFDRyxTQUFULENBQW1CO1lBQUV0RSxJQUFJLEVBQUVxRSxDQUFSO1lBQVdHLE1BQU0sRUFBRWI7V0FBdEM7U0FBYixDQUFWO09BREo7O1dBR0tlLFlBQUwsR0FBb0IsSUFBcEI7O0dBNUJSOztBQStCSDtBQUdELElBQUlyQixNQUFKLEVBQVk7TUFDSnNCLFVBQUo7TUFDSVgsTUFBTSxHQUFHQyxrQkFBa0IsQ0FBQyxpQ0FBRCxDQUQvQjtNQUVJVyxTQUFTLEdBQUcsSUFBSUMsVUFBSixDQUFlLENBQWYsQ0FGaEI7O01BSUk7O1FBRUksa0NBQWtDQyxJQUFsQyxDQUF1Q0MsU0FBUyxDQUFDQyxTQUFqRCxDQUFKLEVBQWlFO1lBQ3ZELElBQUlDLEtBQUosQ0FBVSxlQUFWLENBQU47OztJQUVKTixVQUFVLEdBQUcsSUFBSXRCLE1BQUosQ0FBV1csTUFBWCxDQUFiLENBTEE7O0lBUUFXLFVBQVUsQ0FBQ1AsV0FBWCxDQUF1QlEsU0FBdkIsRUFBa0MsQ0FBQ0EsU0FBUyxDQUFDTSxNQUFYLENBQWxDO0dBUkosQ0FVQSxPQUFPQyxDQUFQLEVBQVU7SUFDTjlCLE1BQU0sR0FBRyxJQUFUO0dBWEosU0FhUTtJQUNKRixHQUFHLENBQUNlLGVBQUosQ0FBb0JGLE1BQXBCOztRQUNJVyxVQUFKLEVBQWdCO01BQ1pBLFVBQVUsQ0FBQ1MsU0FBWDs7Ozs7QUFLWixTQUFTbkIsa0JBQVQsQ0FBNEJvQixHQUE1QixFQUFpQztNQUN6QjtXQUNPbEMsR0FBRyxDQUFDbUMsZUFBSixDQUFvQixJQUFJQyxJQUFKLENBQVMsQ0FBQ0YsR0FBRCxDQUFULEVBQWdCO01BQUVwRCxJQUFJLEVBQUVZO0tBQXhCLENBQXBCLENBQVA7R0FESixDQUdBLE9BQU9zQyxDQUFQLEVBQVU7UUFDRkssSUFBSSxHQUFHLElBQUkxQyxXQUFKLEVBQVg7SUFDQTBDLElBQUksQ0FBQ0MsTUFBTCxDQUFZSixHQUFaO1dBQ09sQyxHQUFHLENBQUNtQyxlQUFKLENBQW9CRSxJQUFJLENBQUNFLE9BQUwsQ0FBYXpELElBQWIsQ0FBcEIsQ0FBUDs7OztBQ2pGUixpQkFBZSxJQUFJcUIsVUFBSixDQUFlLGFBQWYsRUFBOEIsVUFBVVAsTUFBVixFQUFrQjRDLFFBQWxCLEVBQTRCO01BQ3JFQyxJQUFJLEdBQUcsSUFBWDs7V0FDU0MsNkJBQVQsQ0FBdUNqQyxNQUF2QyxFQUErQ2tDLFFBQS9DLEVBQXlEO1FBQ25EbEMsTUFBTSxJQUFJLElBQWQsRUFBb0IsT0FBTyxFQUFQO1FBQ2hCWSxNQUFNLEdBQUcsRUFBYjtRQUNJdUIsVUFBVSxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWXJDLE1BQVosQ0FBakI7UUFDSXNDLEdBQUosRUFBU3RILENBQVQ7O1NBRUtBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR21ILFVBQVUsQ0FBQ0ksTUFBM0IsRUFBbUN2SCxDQUFDLEVBQXBDLEVBQXdDO01BQ3RDc0gsR0FBRyxHQUFHSCxVQUFVLENBQUNuSCxDQUFELENBQWhCO1VBQ0lrSCxRQUFRLENBQUNNLE9BQVQsQ0FBaUJGLEdBQWpCLEtBQXlCLENBQTdCLEVBQWdDO01BQ2hDMUIsTUFBTSxDQUFDMEIsR0FBRCxDQUFOLEdBQWN0QyxNQUFNLENBQUNzQyxHQUFELENBQXBCOzs7V0FHSzFCLE1BQVA7OztNQUdFNkIsNEJBQTRCLEdBQUdSLDZCQUFuQzs7V0FFU1Msd0JBQVQsQ0FBa0MxQyxNQUFsQyxFQUEwQ2tDLFFBQTFDLEVBQW9EO1FBQzlDbEMsTUFBTSxJQUFJLElBQWQsRUFBb0IsT0FBTyxFQUFQO1FBQ2hCWSxNQUFNLEdBQUc2Qiw0QkFBNEIsQ0FBQ3pDLE1BQUQsRUFBU2tDLFFBQVQsQ0FBekM7UUFDSUksR0FBSixFQUFTdEgsQ0FBVDs7UUFFSW9ILE1BQU0sQ0FBQ08scUJBQVgsRUFBa0M7VUFDNUJDLGdCQUFnQixHQUFHUixNQUFNLENBQUNPLHFCQUFQLENBQTZCM0MsTUFBN0IsQ0FBdkI7O1dBRUtoRixDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUc0SCxnQkFBZ0IsQ0FBQ0wsTUFBakMsRUFBeUN2SCxDQUFDLEVBQTFDLEVBQThDO1FBQzVDc0gsR0FBRyxHQUFHTSxnQkFBZ0IsQ0FBQzVILENBQUQsQ0FBdEI7WUFDSWtILFFBQVEsQ0FBQ00sT0FBVCxDQUFpQkYsR0FBakIsS0FBeUIsQ0FBN0IsRUFBZ0M7WUFDNUIsQ0FBQ0YsTUFBTSxDQUFDUyxTQUFQLENBQWlCQyxvQkFBakIsQ0FBc0NqQyxJQUF0QyxDQUEyQ2IsTUFBM0MsRUFBbURzQyxHQUFuRCxDQUFMLEVBQThEO1FBQzlEMUIsTUFBTSxDQUFDMEIsR0FBRCxDQUFOLEdBQWN0QyxNQUFNLENBQUNzQyxHQUFELENBQXBCOzs7O1dBSUcxQixNQUFQOzs7TUFHRW1DLHVCQUF1QixHQUFHTCx3QkFBOUI7O1dBRVNNLGVBQVQsQ0FBeUJDLFFBQXpCLEVBQW1DQyxXQUFuQyxFQUFnRDtRQUMxQyxFQUFFRCxRQUFRLFlBQVlDLFdBQXRCLENBQUosRUFBd0M7WUFDaEMsSUFBSUMsU0FBSixDQUFjLG1DQUFkLENBQU47Ozs7TUFJQUMsY0FBYyxHQUFHSixlQUFyQjs7V0FFU0ssaUJBQVQsQ0FBMkJ6QyxNQUEzQixFQUFtQzBDLEtBQW5DLEVBQTBDO1NBQ25DLElBQUl0SSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHc0ksS0FBSyxDQUFDZixNQUExQixFQUFrQ3ZILENBQUMsRUFBbkMsRUFBdUM7VUFDakN1SSxVQUFVLEdBQUdELEtBQUssQ0FBQ3RJLENBQUQsQ0FBdEI7TUFDQXVJLFVBQVUsQ0FBQ0MsVUFBWCxHQUF3QkQsVUFBVSxDQUFDQyxVQUFYLElBQXlCLEtBQWpEO01BQ0FELFVBQVUsQ0FBQ0UsWUFBWCxHQUEwQixJQUExQjtVQUNJLFdBQVdGLFVBQWYsRUFBMkJBLFVBQVUsQ0FBQ0csUUFBWCxHQUFzQixJQUF0QjtNQUMzQnRCLE1BQU0sQ0FBQ3VCLGNBQVAsQ0FBc0IvQyxNQUF0QixFQUE4QjJDLFVBQVUsQ0FBQ2pCLEdBQXpDLEVBQThDaUIsVUFBOUM7Ozs7V0FJS0ssWUFBVCxDQUFzQlYsV0FBdEIsRUFBbUNXLFVBQW5DLEVBQStDQyxXQUEvQyxFQUE0RDtRQUN0REQsVUFBSixFQUFnQlIsaUJBQWlCLENBQUNILFdBQVcsQ0FBQ0wsU0FBYixFQUF3QmdCLFVBQXhCLENBQWpCO1FBQ1pDLFdBQUosRUFBaUJULGlCQUFpQixDQUFDSCxXQUFELEVBQWNZLFdBQWQsQ0FBakI7V0FDVlosV0FBUDs7O01BR0VhLFdBQVcsR0FBR0gsWUFBbEI7O1dBRVNJLGVBQVQsQ0FBeUJDLEdBQXpCLEVBQThCM0IsR0FBOUIsRUFBbUM0QixLQUFuQyxFQUEwQztRQUNwQzVCLEdBQUcsSUFBSTJCLEdBQVgsRUFBZ0I7TUFDZDdCLE1BQU0sQ0FBQ3VCLGNBQVAsQ0FBc0JNLEdBQXRCLEVBQTJCM0IsR0FBM0IsRUFBZ0M7UUFDOUI0QixLQUFLLEVBQUVBLEtBRHVCO1FBRTlCVixVQUFVLEVBQUUsSUFGa0I7UUFHOUJDLFlBQVksRUFBRSxJQUhnQjtRQUk5QkMsUUFBUSxFQUFFO09BSlo7S0FERixNQU9PO01BQ0xPLEdBQUcsQ0FBQzNCLEdBQUQsQ0FBSCxHQUFXNEIsS0FBWDs7O1dBR0tELEdBQVA7OztNQUdFTixjQUFjLEdBQUdLLGVBQXJCO01BRUloSixDQUFDLEdBQUcsQ0FBUjtNQUNJbUIsR0FBRyxHQUFHO0lBQ1JsQixVQUFVLEVBQUVELENBQUMsRUFETDtJQUVSRSxtQkFBbUIsRUFBRUYsQ0FBQyxFQUZkO0lBR1JHLGdCQUFnQixFQUFFSCxDQUFDLEVBSFg7SUFJUkksa0JBQWtCLEVBQUVKLENBQUMsRUFKYjtJQUtSSyxjQUFjLEVBQUVMLENBQUMsRUFMVDtJQU1STSxlQUFlLEVBQUVOLENBQUM7R0FOcEI7O01BU0ltSixLQUFKOztNQUNJQyxtQkFBbUIsR0FBR3BDLElBQUksQ0FBQ3FDLGlCQUFMLElBQTBCckMsSUFBSSxDQUFDeEIsV0FBekQ7TUFDSThELElBQUksR0FBRyxJQUFYO01BQ0lDLEVBQUUsR0FBRyxDQUFUO09BQ0tKLEtBQUs7O2NBRUU7YUFDREssV0FBVCxHQUF1QjtVQUNqQkMsS0FBSyxHQUFHLElBQVo7O01BRUFyQixjQUFjLENBQUMsSUFBRCxFQUFPb0IsV0FBUCxDQUFkO01BRUFiLGNBQWMsQ0FBQyxJQUFELEVBQU8sUUFBUCxFQUFpQixFQUFqQixDQUFkOztNQUVBM0IsSUFBSSxDQUFDdEIsU0FBTCxHQUFpQixVQUFVZ0UsSUFBVixFQUFnQjtZQUMzQnRJLElBQUksR0FBR3NJLElBQUksQ0FBQ3RJLElBQWhCLENBRCtCOztnQkFJdkJBLElBQUksQ0FBQyxDQUFELENBQUosSUFBV0EsSUFBSSxDQUFDTyxHQUF4QjtlQUNPUixHQUFHLENBQUNsQixVQUFUO1lBQ0V3SixLQUFLLENBQUNFLFVBQU4sQ0FBaUJ2SSxJQUFJLENBQUNBLElBQUwsQ0FBVXdJLElBQTNCOztZQUVBUixtQkFBbUIsQ0FBQztjQUNsQnpILEdBQUcsRUFBRVIsR0FBRyxDQUFDakI7YUFEUSxDQUFuQjs7O2VBS0dpQixHQUFHLENBQUNkLGNBQVQ7WUFDRW9KLEtBQUssQ0FBQ0ksTUFBTixHQURGOzs7OztlQU1LMUksR0FBRyxDQUFDaEIsZ0JBQVQ7WUFDRXNKLEtBQUssQ0FBQ0ssZUFBTixDQUFzQjFJLElBQUksQ0FBQ0EsSUFBM0I7Ozs7OztPQXBCTjs7O0lBNkJGMkgsV0FBVyxDQUFDUyxXQUFELEVBQWMsQ0FBQztNQUN4QmxDLEdBQUcsRUFBRSxZQURtQjtNQUV4QjRCLEtBQUssRUFBRSxTQUFTUyxVQUFULENBQW9CSSxRQUFwQixFQUE4QjtRQUNuQ0MsYUFBYSxDQUFDRCxRQUFELENBQWI7UUFDQVQsSUFBSSxHQUFHVyxJQUFJLEVBQVg7UUFDQUMsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUNiLElBQWpDO2FBQ0tjLFlBQUw7O0tBTnFCLEVBUXRCO01BQ0Q5QyxHQUFHLEVBQUUsY0FESjtNQUVENEIsS0FBSyxFQUFFLFNBQVNrQixZQUFULEdBQXdCO2FBQ3hCQyxzQkFBTCxHQUE4QixJQUFJZixJQUFJLENBQUNnQiwrQkFBVCxFQUE5QjthQUNLQyxVQUFMLEdBQWtCLElBQUlqQixJQUFJLENBQUNrQixxQkFBVCxDQUErQixLQUFLSCxzQkFBcEMsQ0FBbEI7YUFDS0ksVUFBTCxHQUFrQixJQUFJbkIsSUFBSSxDQUFDb0IsZ0JBQVQsRUFBbEI7YUFDS0MsTUFBTCxHQUFjLElBQUlyQixJQUFJLENBQUNzQixtQ0FBVCxFQUFkO2FBQ0tDLEtBQUwsR0FBYSxJQUFJdkIsSUFBSSxDQUFDd0IsdUJBQVQsQ0FBaUMsS0FBS1AsVUFBdEMsRUFBa0QsS0FBS0UsVUFBdkQsRUFBbUUsS0FBS0UsTUFBeEUsRUFBZ0YsS0FBS04sc0JBQXJGLENBQWI7YUFDS1EsS0FBTCxDQUFXRSxVQUFYLENBQXNCLElBQUl6QixJQUFJLENBQUMwQixTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQUMsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBdEIsRUFONkI7O0tBVlIsRUFrQnRCO01BQ0QxRCxHQUFHLEVBQUUsYUFESjtNQUVENEIsS0FBSyxFQUFFLFNBQVMrQixXQUFULENBQXFCQyxLQUFyQixFQUE0QjtZQUM3QkMsVUFBVSxHQUFHRCxLQUFLLENBQUM3SCxJQUF2QjtZQUNJQSxJQUFJLEdBQUc4SCxVQUFVLEtBQUssS0FBSyxDQUFwQixHQUF3QixLQUF4QixHQUFnQ0EsVUFEM0M7WUFFSS9KLElBQUksR0FBRzJHLHVCQUF1QixDQUFDbUQsS0FBRCxFQUFRLENBQUMsTUFBRCxDQUFSLENBRmxDO1lBSUlFLEtBQUo7O2dCQUVRL0gsSUFBUjtlQUNPLFFBQUw7WUFDRStILEtBQUssR0FBRyxJQUFJOUIsSUFBSSxDQUFDK0IsYUFBVCxDQUF1QmpLLElBQUksQ0FBQ3dCLE1BQTVCLENBQVI7OztlQUdHLEtBQUw7WUFDRXdJLEtBQUssR0FBRyxJQUFJOUIsSUFBSSxDQUFDZ0MsVUFBVCxDQUFvQixJQUFJaEMsSUFBSSxDQUFDMEIsU0FBVCxDQUFtQjVKLElBQUksQ0FBQzRCLElBQUwsQ0FBVSxDQUFWLElBQWUsQ0FBbEMsRUFBcUM1QixJQUFJLENBQUM0QixJQUFMLENBQVUsQ0FBVixJQUFlLENBQXBELEVBQXVENUIsSUFBSSxDQUFDNEIsSUFBTCxDQUFVLENBQVYsSUFBZSxDQUF0RSxDQUFwQixDQUFSOzs7Ozs7ZUFNR29JLEtBQVA7O0tBdkNxQixFQXlDdEI7TUFDRDlELEdBQUcsRUFBRSxZQURKO01BRUQ0QixLQUFLLEVBQUUsU0FBU3FDLFVBQVQsQ0FBb0JILEtBQXBCLEVBQTJCSSxLQUEzQixFQUFrQztZQUNuQ0MsVUFBVSxHQUFHRCxLQUFLLENBQUMvSCxJQUF2QjtZQUNJQSxJQUFJLEdBQUdnSSxVQUFVLEtBQUssS0FBSyxDQUFwQixHQUF3QixDQUF4QixHQUE0QkEsVUFEdkM7WUFFSUMsY0FBYyxHQUFHRixLQUFLLENBQUNySixRQUYzQjtZQUdJQSxRQUFRLEdBQUd1SixjQUFjLEtBQUssS0FBSyxDQUF4QixHQUE0QixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUE1QixHQUF3Q0EsY0FIdkQ7WUFJSUMsaUJBQWlCLEdBQUdILEtBQUssQ0FBQzlILFdBSjlCO1lBS0lBLFdBQVcsR0FBR2lJLGlCQUFpQixLQUFLLEtBQUssQ0FBM0IsR0FBK0IsQ0FBL0IsR0FBbUNBLGlCQUxyRDtZQU1JQyxjQUFjLEdBQUdKLEtBQUssQ0FBQzdILFFBTjNCO1lBT0lBLFFBQVEsR0FBR2lJLGNBQWMsS0FBSyxLQUFLLENBQXhCLEdBQTRCLENBQTVCLEdBQWdDQSxjQVAvQztZQVFJQyxtQkFBbUIsR0FBR0wsS0FBSyxDQUFDNUgsYUFSaEM7WUFTSUEsYUFBYSxHQUFHaUksbUJBQW1CLEtBQUssS0FBSyxDQUE3QixHQUFpQyxDQUFqQyxHQUFxQ0EsbUJBVHpEO1lBVUlDLG9CQUFvQixHQUFHTixLQUFLLENBQUMzSCxjQVZqQztZQVdJQSxjQUFjLEdBQUdpSSxvQkFBb0IsS0FBSyxLQUFLLENBQTlCLEdBQWtDLENBQWxDLEdBQXNDQSxvQkFYM0Q7WUFZSUMsU0FBUyxHQUFHLEtBQUtBLFNBQUwsR0FBaUIsSUFBSXpDLElBQUksQ0FBQzBDLFdBQVQsRUFBakM7UUFDQUQsU0FBUyxDQUFDRSxXQUFWO1FBQ0FGLFNBQVMsQ0FBQ0csU0FBVixDQUFvQixJQUFJNUMsSUFBSSxDQUFDMEIsU0FBVCxDQUFtQjdJLFFBQVEsQ0FBQyxDQUFELENBQTNCLEVBQWdDQSxRQUFRLENBQUMsQ0FBRCxDQUF4QyxFQUE2Q0EsUUFBUSxDQUFDLENBQUQsQ0FBckQsQ0FBcEI7WUFDSWdLLFlBQVksR0FBRyxJQUFJN0MsSUFBSSxDQUFDMEIsU0FBVCxDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixDQUFuQjtRQUNBSSxLQUFLLENBQUNnQixxQkFBTixDQUE0QjNJLElBQTVCLEVBQWtDMEksWUFBbEM7WUFDSUUsV0FBVyxHQUFHLElBQUkvQyxJQUFJLENBQUNnRCxvQkFBVCxDQUE4QlAsU0FBOUIsQ0FBbEI7WUFDSVEsTUFBTSxHQUFHLElBQUlqRCxJQUFJLENBQUNrRCwyQkFBVCxDQUFxQy9JLElBQXJDLEVBQTJDNEksV0FBM0MsRUFBd0RqQixLQUF4RCxFQUErRGUsWUFBL0QsQ0FBYjtRQUNBSSxNQUFNLENBQUNFLGNBQVAsQ0FBc0I5SSxRQUF0QjtRQUNBdUcsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWixFQUEyQnpHLFdBQTNCO1FBQ0E2SSxNQUFNLENBQUNHLGlCQUFQLENBQXlCaEosV0FBekI7UUFDQTZJLE1BQU0sQ0FBQ0ksbUJBQVAsQ0FBMkIvSSxhQUEzQjtRQUNBMkksTUFBTSxDQUFDSyxvQkFBUCxDQUE0Qi9JLGNBQTVCO1lBQ0k1QixJQUFJLEdBQUcsSUFBSXFILElBQUksQ0FBQ3VELFdBQVQsQ0FBcUJOLE1BQXJCLENBQVg7ZUFDT3RLLElBQVA7O0tBckVxQixFQXVFdEI7TUFDRHFGLEdBQUcsRUFBRSxpQkFESjtNQUVENEIsS0FBSyxFQUFFLFNBQVNZLGVBQVQsQ0FBeUJnRCxRQUF6QixFQUFtQztZQUNwQzFCLEtBQUssR0FBRyxLQUFLSCxXQUFMLENBQWlCNkIsUUFBakIsQ0FBWjtZQUNJN0ssSUFBSSxHQUFHLEtBQUtzSixVQUFMLENBQWdCSCxLQUFoQixFQUF1QjtVQUNoQzNILElBQUksRUFBRSxPQUFPcUosUUFBUSxDQUFDckosSUFBaEIsS0FBeUIsUUFBekIsR0FBb0NxSixRQUFRLENBQUNySixJQUE3QyxHQUFvRCxDQUQxQjtVQUVoQ3RCLFFBQVEsRUFBRTJLLFFBQVEsQ0FBQzNLLFFBRmE7VUFHaEN1QixXQUFXLEVBQUVvSixRQUFRLENBQUNwSixXQUhVO1VBSWhDQyxRQUFRLEVBQUVtSixRQUFRLENBQUNuSixRQUphO1VBS2hDQyxhQUFhLEVBQUVrSixRQUFRLENBQUNsSixhQUxRO1VBTWhDQyxjQUFjLEVBQUVpSixRQUFRLENBQUNqSjtTQU5oQixDQUFYO2FBUUtnSCxLQUFMLENBQVdrQyxZQUFYLENBQXdCOUssSUFBeEI7YUFDS2pCLE1BQUwsQ0FBWWdNLElBQVosQ0FBaUIvSyxJQUFqQjtRQUNBbUgsbUJBQW1CLENBQUM7VUFDbEJ6SCxHQUFHLEVBQUVSLEdBQUcsQ0FBQ2Ysa0JBRFM7VUFFbEJnQixJQUFJLEVBQUU7WUFDSlIsS0FBSyxFQUFFa00sUUFBUSxDQUFDbE07O1NBSEQsQ0FBbkI7O0tBckZxQixFQTRGdEI7TUFDRDBHLEdBQUcsRUFBRSxtQkFESjtNQUVENEIsS0FBSyxFQUFFLFNBQVMrRCxpQkFBVCxDQUEyQm5MLEtBQTNCLEVBQWtDb0wsYUFBbEMsRUFBaUQ7WUFDbERuTCxTQUFTLEdBQUcsS0FBS2YsTUFBTCxDQUFZdUcsTUFBNUI7O2VBRU94RixTQUFTLEVBQWhCLEVBQW9CO2NBQ2RDLE1BQU0sR0FBR0QsU0FBUyxHQUFHLENBQVosR0FBZ0JtTCxhQUE3QjtlQUNLbE0sTUFBTCxDQUFZZSxTQUFaLEVBQXVCb0wsY0FBdkIsR0FBd0NDLGlCQUF4QyxDQUEwRCxLQUFLckIsU0FBL0Q7Y0FDSXNCLE1BQU0sR0FBRyxLQUFLdEIsU0FBTCxDQUFldUIsU0FBZixFQUFiO2NBQ0lDLFFBQVEsR0FBRyxLQUFLeEIsU0FBTCxDQUFleUIsV0FBZixFQUFmO1VBQ0ExTCxLQUFLLENBQUNFLE1BQUQsQ0FBTCxHQUFnQnFMLE1BQU0sQ0FBQ2pMLENBQVAsRUFBaEI7VUFDQU4sS0FBSyxDQUFDRSxNQUFNLEdBQUcsQ0FBVixDQUFMLEdBQW9CcUwsTUFBTSxDQUFDaEwsQ0FBUCxFQUFwQjtVQUNBUCxLQUFLLENBQUNFLE1BQU0sR0FBRyxDQUFWLENBQUwsR0FBb0JxTCxNQUFNLENBQUMvSyxDQUFQLEVBQXBCO1VBQ0FSLEtBQUssQ0FBQ0UsTUFBTSxHQUFHLENBQVYsQ0FBTCxHQUFvQnVMLFFBQVEsQ0FBQ25MLENBQVQsRUFBcEI7VUFDQU4sS0FBSyxDQUFDRSxNQUFNLEdBQUcsQ0FBVixDQUFMLEdBQW9CdUwsUUFBUSxDQUFDbEwsQ0FBVCxFQUFwQjtVQUNBUCxLQUFLLENBQUNFLE1BQU0sR0FBRyxDQUFWLENBQUwsR0FBb0J1TCxRQUFRLENBQUNqTCxDQUFULEVBQXBCO1VBQ0FSLEtBQUssQ0FBQ0UsTUFBTSxHQUFHLENBQVYsQ0FBTCxHQUFvQnVMLFFBQVEsQ0FBQy9LLENBQVQsRUFBcEI7OztLQTVHbUIsRUErR3RCO01BQ0Q4RSxHQUFHLEVBQUUsVUFESjtNQUVENEIsS0FBSyxFQUFFLFNBQVM3SCxRQUFULEdBQW9CO2FBQ3BCd0osS0FBTCxDQUFXNEMsY0FBWCxDQUEwQmxFLEVBQUUsRUFBNUIsRUFBZ0MsQ0FBaEM7O0tBbEhxQixFQW9IdEI7TUFDRGpDLEdBQUcsRUFBRSxRQURKO01BRUQ0QixLQUFLLEVBQUUsU0FBU1csTUFBVCxHQUFrQjtZQUNuQi9ILEtBQUssR0FBRyxJQUFJNEwsWUFBSixDQUFpQixJQUFJLEtBQUsxTSxNQUFMLENBQVl1RyxNQUFaLEdBQXFCLENBQTFDLENBQVo7UUFDQXpGLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV1gsR0FBRyxDQUFDYixlQUFmO2FBQ0tlLFFBQUw7YUFDSzRMLGlCQUFMLENBQXVCbkwsS0FBdkIsRUFBOEIsQ0FBOUI7UUFDQXNILG1CQUFtQixDQUFDdEgsS0FBRCxDQUFuQjs7S0EzSHFCLENBQWQsQ0FBWDtXQStITzBILFdBQVA7R0FwS0YsRUFGSyxFQXVLQUwsS0F2S0w7Q0FqR2UsQ0FBZjs7SUNFYXdFLFVBQWI7O0FBQUE7c0JBS2NuTixPQUFaLEVBQXFCOzs7cUNBRlZtTixVQUFVLENBQUNDLFdBQVgsWUFBa0NDLGlCQUV4Qjs7U0FDZEMsTUFBTCxHQUFjLElBQUlDLFVBQUosRUFBZDtTQUNLRCxNQUFMLENBQVkxRSxtQkFBWixHQUFrQyxLQUFLMEUsTUFBTCxDQUFZekUsaUJBQVosSUFBaUMsS0FBS3lFLE1BQUwsQ0FBWXRJLFdBQS9FO1NBQ0t0RSxJQUFMLENBQVVDLEdBQUcsQ0FBQ2xCLFVBQWQsRUFBMEJPLE9BQTFCOzs7Ozt5QkFHR21CLEdBWFAsRUFXWVAsSUFYWixFQVdrQjtXQUNUME0sTUFBTCxDQUFZMUUsbUJBQVosQ0FBZ0M7UUFBQ3pILEdBQUcsRUFBSEEsR0FBRDtRQUFNUCxJQUFJLEVBQUpBO09BQXRDOzs7OytCQUdTNE0sT0FmYixFQWVpQztVQUFYNU0sSUFBVyx1RUFBSixFQUFJO1VBQ3ZCa0YsTUFBTSxHQUFHLEtBQUtBLE1BQUwsR0FBYyxJQUFJcUgsVUFBVSxDQUFDQyxXQUFmLENBQTJCRixZQUFZLENBQUNPLGlCQUFiLElBQWtDN00sSUFBSSxDQUFDbUcsTUFBTCxHQUFjLENBQWhELENBQTNCLENBQTdCO1VBQ016RixLQUFLLEdBQUcsS0FBS0EsS0FBTCxHQUFhLElBQUk0TCxZQUFKLENBQWlCcEgsTUFBakIsQ0FBM0I7TUFDQXhFLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV2tNLE9BQVg7TUFFQWxNLEtBQUssQ0FBQ29NLEdBQU4sQ0FBVTlNLElBQVYsRUFBZ0IsQ0FBaEI7V0FDSzBNLE1BQUwsQ0FBWTFFLG1CQUFaLENBQWdDdEgsS0FBaEMsRUFBdUN3RSxNQUF2Qzs7OztvQ0FHYztXQUNUd0gsTUFBTCxDQUFZMUUsbUJBQVosQ0FBZ0M7UUFBQ3pILEdBQUcsRUFBRVIsR0FBRyxDQUFDZDtPQUExQzs7OzsyQkFHSzhOLFFBNUJULEVBNEJtQjtXQUNWTCxNQUFMLENBQVlNLGdCQUFaLENBQTZCLFNBQTdCLEVBQXdDRCxRQUF4Qzs7Ozs7OztlQTdCU1IsbUJBQ0V4TTs7ZUFERndNLDJCQUVVRSxpQkFBaUIsSUFBSUQ7Ozs7In0=
