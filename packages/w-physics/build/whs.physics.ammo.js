/* WhitestormJS Framework v3.0.0-dev.6 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.WHS = global.WHS || {}, global.WHS.physics = global.WHS.physics || {}, global.WHS.physics.ammo = {})));
}(this, function (exports) { 'use strict';

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

  exports.WorldModule = WorldModule;
  exports.RigidbodyModule = RigidbodyModule;
  exports.AmmoEngine = AmmoEngine;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLnBoeXNpY3MuYW1tby5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwiLi4vc3JjL2VuZ2luZXMvY29tbWFuZHMuanMiLCIuLi9zcmMvbW9kdWxlcy9Xb3JsZE1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIi4uL3NyYy9tb2R1bGVzL1JpZ2lkYm9keU1vZHVsZS5qcyIsIi4uL3Rvb2xzL3dvcmtlci1wbHVnaW4vd29ya2VyaGVscGVyLmpzIiwiLi4vc3JjL2VuZ2luZXMvYW1tb2pzL3dvcmtlci5qcyIsIi4uL3NyYy9lbmdpbmVzL2FtbW9qcy9BbW1vRW5naW5lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImxldCBpID0gMDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBJTklUSUFMSVpFOiBpKyssXG4gIEZFRURCQUNLX0lOSVRJQUxJWkU6IGkrKyxcbiAgQ1JFQVRFX1JJR0lEQk9EWTogaSsrLFxuICBGRUVEQkFDS19SSUdJREJPRFk6IGkrKyxcbiAgUkVRVUVTVF9VUERBVEU6IGkrKyxcbiAgRkVFREJBQ0tfVVBEQVRFOiBpKytcbn07XG4iLCJpbXBvcnQgQ01EIGZyb20gJy4uL2VuZ2luZXMvY29tbWFuZHMnO1xuXG5leHBvcnQgY2xhc3MgV29ybGRNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5lbmdpbmUgPSBvcHRpb25zLmVuZ2luZTtcbiAgICB0aGlzLmJvZGllcyA9IHt9O1xuICAgIHRoaXMuYm9keUluZGV4ID0gMDtcbiAgICB0aGlzLnNpbXVsYXRlID0gZmFsc2U7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIG1hbmFnZXIuc2ltdWxhdGVMb29wID0gYXBwLmxvb3AoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNpbXVsYXRlKSByZXR1cm47XG4gICAgICB0aGlzLmVuZ2luZS5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVuZ2luZS5saXN0ZW4oKHtkYXRhfSkgPT4ge1xuICAgICAgc3dpdGNoIChkYXRhWzBdIHx8IGRhdGEuY21kKSB7XG4gICAgICAgIGNhc2UgQ01ELkZFRURCQUNLX0lOSVRJQUxJWkU6XG4gICAgICAgICAgdGhpcy5zaW11bGF0ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ01ELkZFRURCQUNLX1JJR0lEQk9EWTpcbiAgICAgICAgICBjb25zdCBwaHlzaWNzID0gdGhpcy5ib2RpZXNbZGF0YS5kYXRhLmluZGV4XTtcbiAgICAgICAgICBwaHlzaWNzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ01ELkZFRURCQUNLX1VQREFURTpcbiAgICAgICAgICB0aGlzLnByb2Nlc3NVcGRhdGVGZWVkYmFjayhkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcm9jZXNzVXBkYXRlRmVlZGJhY2soYXJyYXkpIHtcbiAgICBjb25zdCBib2RpZXMgPSB0aGlzLmJvZGllcztcbiAgICBsZXQgbnVtYm9kaWVzID0gdGhpcy5ib2R5SW5kZXg7XG5cbiAgICB3aGlsZShudW1ib2RpZXMtLSkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gMSArIG51bWJvZGllcyAqIDc7XG4gICAgICBjb25zdCBib2R5ID0gYm9kaWVzW251bWJvZGllc10uY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgICAgYm9keS5wb3NpdGlvbi54ID0gYXJyYXlbb2Zmc2V0XTtcbiAgICAgIGJvZHkucG9zaXRpb24ueSA9IGFycmF5W29mZnNldCArIDFdO1xuICAgICAgYm9keS5wb3NpdGlvbi56ID0gYXJyYXlbb2Zmc2V0ICsgMl07XG5cbiAgICAgIGJvZHkucXVhdGVybmlvbi54ID0gYXJyYXlbb2Zmc2V0ICsgM107XG4gICAgICBib2R5LnF1YXRlcm5pb24ueSA9IGFycmF5W29mZnNldCArIDRdO1xuICAgICAgYm9keS5xdWF0ZXJuaW9uLnogPSBhcnJheVtvZmZzZXQgKyA1XTtcbiAgICAgIGJvZHkucXVhdGVybmlvbi53ID0gYXJyYXlbb2Zmc2V0ICsgNl07XG4gICAgfVxuICB9XG5cbiAgYnJpZGdlcyA9IHtcbiAgICBjaGlsZDogKGNvbXBvbmVudCkgPT4ge1xuICAgICAgaWYgKGNvbXBvbmVudC5tYW5hZ2VyICYmICdjcmVhdGVQaHlzaWNzJyBpbiBjb21wb25lbnQubWFuYWdlcikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYm9keUluZGV4Kys7XG4gICAgICAgIGNvbnN0IHBoeXNpY3MgPSBjb21wb25lbnQubWFuYWdlci5jcmVhdGVQaHlzaWNzKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5ib2RpZXNbaW5kZXhdID0gcGh5c2ljcztcbiAgICAgICAgdGhpcy5lbmdpbmUuc2VuZChDTUQuQ1JFQVRFX1JJR0lEQk9EWSwgcGh5c2ljcy5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gIH1cbn1cbiIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCJ2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IHJlcXVpcmUoXCIuL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7IiwiZnVuY3Rpb24gY29tcHV0ZVNwaGVyZU9wdGlvbnMoZ2VvbWV0cnksIG9wdGlvbnMpIHtcbiAgZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IG9wdGlvbnMucmFkaXVzIHx8IGdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlLnJhZGl1c1xuICB9O1xufTtcblxuZnVuY3Rpb24gY29tcHV0ZUJveE9wdGlvbnMoZ2VvbWV0cnksIG9wdGlvbnMpIHtcbiAgZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplOiBvcHRpb25zLnNpemUgfHwgZ2VvbWV0cnkuYm91bmRpbmdCb3guZ2V0U2l6ZSgpLnRvQXJyYXkoKVxuICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIFJpZ2lkYm9keU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHt0eXBlID0gJ3NwaGVyZScsIGNvbXB1dGUsIC4uLm9wdGlvbnN9ID0ge3R5cGU6ICdzcGhlcmUnLCBjb21wdXRlOiB0cnVlfSkge1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wdXRlID0gQm9vbGVhbihjb21wdXRlKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0dXAoY29tcG9uZW50LCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLmNyZWF0ZVBoeXNpY3MgPSAod29ybGRNb2R1bGUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB7cG9zaXRpb24sIHF1YXRlcm5pb259ID0gY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgICAgbWFuYWdlci5waHlzaWNzID0ge1xuICAgICAgICBlbmdpbmU6IHdvcmxkTW9kdWxlLmVuZ2luZSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24udG9BcnJheSgpLFxuICAgICAgICAgIHF1YXRlcm5pb246IHF1YXRlcm5pb24udG9BcnJheSgpLFxuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIG1hc3M6IHRoaXMub3B0aW9ucy5tYXNzLFxuICAgICAgICAgIHJlc3RpdHV0aW9uOiB0aGlzLm9wdGlvbnMucmVzdGl0dXRpb24sXG4gICAgICAgICAgZnJpY3Rpb246IHRoaXMub3B0aW9ucy5mcmljdGlvbixcbiAgICAgICAgICBsaW5lYXJEYW1waW5nOiB0aGlzLm9wdGlvbnMubGluZWFyRGFtcGluZyxcbiAgICAgICAgICBhbmd1bGFyRGFtcGluZzogdGhpcy5vcHRpb25zLmFuZ3VsYXJEYW1waW5nLFxuICAgICAgICAgIC4uLnRoaXMuY29tcHV0ZURhdGEodGhpcy50eXBlLCBjb21wb25lbnQubmF0aXZlLmdlb21ldHJ5KVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnQsXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBtYW5hZ2VyLnBoeXNpY3M7XG4gICAgfVxuICB9XG5cbiAgY29tcHV0ZURhdGEodHlwZSwgZ2VvbWV0cnkpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3NwaGVyZSc6XG4gICAgICAgIHJldHVybiBjb21wdXRlU3BoZXJlT3B0aW9ucyhnZW9tZXRyeSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIGNhc2UgJ2JveCc6XG4gICAgICAgIHJldHVybiBjb21wdXRlQm94T3B0aW9ucyhnZW9tZXRyeSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIGRlZmF1bHQ6XG5cbiAgICB9XG4gIH1cbn1cbiIsInZhciBUQVJHRVQgPSB0eXBlb2YgU3ltYm9sID09PSAndW5kZWZpbmVkJyA/ICdfX3RhcmdldCcgOiBTeW1ib2woKSxcbiAgICBTQ1JJUFRfVFlQRSA9ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyxcbiAgICBCbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyLFxuICAgIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCxcbiAgICBXb3JrZXIgPSB3aW5kb3cuV29ya2VyO1xuXG4vKipcbiAqIFJldHVybnMgYSB3cmFwcGVyIGFyb3VuZCBXZWIgV29ya2VyIGNvZGUgdGhhdCBpcyBjb25zdHJ1Y3RpYmxlLlxuICpcbiAqIEBmdW5jdGlvbiBzaGltV29ya2VyXG4gKlxuICogQHBhcmFtIHsgU3RyaW5nIH0gICAgZmlsZW5hbWUgICAgVGhlIG5hbWUgb2YgdGhlIGZpbGVcbiAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gIGZuICAgICAgICAgIEZ1bmN0aW9uIHdyYXBwaW5nIHRoZSBjb2RlIG9mIHRoZSB3b3JrZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hpbVdvcmtlciAoZmlsZW5hbWUsIGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFNoaW1Xb3JrZXIgKGZvcmNlRmFsbGJhY2spIHtcbiAgICAgICAgdmFyIG8gPSB0aGlzO1xuXG4gICAgICAgIGlmICghZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgV29ya2VyKGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChXb3JrZXIgJiYgIWZvcmNlRmFsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIGZ1bmN0aW9uJ3MgaW5uZXIgY29kZSB0byBhIHN0cmluZyB0byBjb25zdHJ1Y3QgdGhlIHdvcmtlclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGZuLnRvU3RyaW5nKCkucmVwbGFjZSgvXmZ1bmN0aW9uLis/ey8sICcnKS5zbGljZSgwLCAtMSksXG4gICAgICAgICAgICAgICAgb2JqVVJMID0gY3JlYXRlU291cmNlT2JqZWN0KHNvdXJjZSk7XG5cbiAgICAgICAgICAgIHRoaXNbVEFSR0VUXSA9IG5ldyBXb3JrZXIob2JqVVJMKTtcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqVVJMKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW1RBUkdFVF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc2VsZlNoaW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlOiBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5vbm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IG8ub25tZXNzYWdlKHsgZGF0YTogbSwgdGFyZ2V0OiBzZWxmU2hpbSB9KSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZuLmNhbGwoc2VsZlNoaW0pO1xuICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZSA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IHNlbGZTaGltLm9ubWVzc2FnZSh7IGRhdGE6IG0sIHRhcmdldDogbyB9KSB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmlzVGhpc1RocmVhZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuLy8gVGVzdCBXb3JrZXIgY2FwYWJpbGl0aWVzXG5pZiAoV29ya2VyKSB7XG4gICAgdmFyIHRlc3RXb3JrZXIsXG4gICAgICAgIG9ialVSTCA9IGNyZWF0ZVNvdXJjZU9iamVjdCgnc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7fScpLFxuICAgICAgICB0ZXN0QXJyYXkgPSBuZXcgVWludDhBcnJheSgxKTtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIE5vIHdvcmtlcnMgdmlhIGJsb2JzIGluIEVkZ2UgMTIgYW5kIElFIDExIGFuZCBsb3dlciA6KFxuICAgICAgICBpZiAoLyg/OlRyaWRlbnR8RWRnZSlcXC8oPzpbNTY3XXwxMikvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXN0V29ya2VyID0gbmV3IFdvcmtlcihvYmpVUkwpO1xuXG4gICAgICAgIC8vIE5hdGl2ZSBicm93c2VyIG9uIHNvbWUgU2Ftc3VuZyBkZXZpY2VzIHRocm93cyBmb3IgdHJhbnNmZXJhYmxlcywgbGV0J3MgZGV0ZWN0IGl0XG4gICAgICAgIHRlc3RXb3JrZXIucG9zdE1lc3NhZ2UodGVzdEFycmF5LCBbdGVzdEFycmF5LmJ1ZmZlcl0pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBXb3JrZXIgPSBudWxsO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmpVUkwpO1xuICAgICAgICBpZiAodGVzdFdvcmtlcikge1xuICAgICAgICAgICAgdGVzdFdvcmtlci50ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU291cmNlT2JqZWN0KHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtzdHJdLCB7IHR5cGU6IFNDUklQVF9UWVBFIH0pKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgICAgICAgYmxvYi5hcHBlbmQoc3RyKTtcbiAgICAgICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYi5nZXRCbG9iKHR5cGUpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc2hpbVdvcmtlciBmcm9tICdfX3Rvb2xzL3dvcmtlci1wbHVnaW5fXyc7XG5leHBvcnQgZGVmYXVsdCBuZXcgc2hpbVdvcmtlcihcIi4vd29ya2VyLmpzXCIsIGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XG52YXIgc2VsZiA9IHRoaXM7XG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICB2YXIga2V5LCBpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc291cmNlU3ltYm9sS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG52YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IF9jbGFzc0NhbGxDaGVjaztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG52YXIgY3JlYXRlQ2xhc3MgPSBfY3JlYXRlQ2xhc3M7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBfZGVmaW5lUHJvcGVydHk7XG5cbnZhciBpID0gMDtcbnZhciBDTUQgPSB7XG4gIElOSVRJQUxJWkU6IGkrKyxcbiAgRkVFREJBQ0tfSU5JVElBTElaRTogaSsrLFxuICBDUkVBVEVfUklHSURCT0RZOiBpKyssXG4gIEZFRURCQUNLX1JJR0lEQk9EWTogaSsrLFxuICBSRVFVRVNUX1VQREFURTogaSsrLFxuICBGRUVEQkFDS19VUERBVEU6IGkrK1xufTtcblxudmFyIF90ZW1wO1xudmFyIHRyYW5zZmVyYWJsZU1lc3NhZ2UgPSBzZWxmLndlYmtpdFBvc3RNZXNzYWdlIHx8IHNlbGYucG9zdE1lc3NhZ2U7XG52YXIgQU1NTyA9IG51bGw7XG52YXIgZHQgPSAwO1xubmV3IChfdGVtcCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFtbW9CYWNrZW5kKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBBbW1vQmFja2VuZCk7XG5cbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImJvZGllc1wiLCBbXSk7XG5cbiAgICBzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIgZGF0YSA9IF9yZWYuZGF0YTtcblxuICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBzd2l0Y2ggKGRhdGFbMF0gfHwgZGF0YS5jbWQpIHtcbiAgICAgICAgY2FzZSBDTUQuSU5JVElBTElaRTpcbiAgICAgICAgICBfdGhpcy5pbml0aWFsaXplKGRhdGEuZGF0YS5wYXRoKTtcblxuICAgICAgICAgIHRyYW5zZmVyYWJsZU1lc3NhZ2Uoe1xuICAgICAgICAgICAgY21kOiBDTUQuRkVFREJBQ0tfSU5JVElBTElaRVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQ01ELlJFUVVFU1RfVVBEQVRFOlxuICAgICAgICAgIF90aGlzLnVwZGF0ZSgpOyAvLyB0cmFuc2ZlcmFibGVNZXNzYWdlKHRydWUpO1xuXG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIENNRC5DUkVBVEVfUklHSURCT0RZOlxuICAgICAgICAgIF90aGlzLmNyZWF0ZVJpZ2lkQm9keShkYXRhLmRhdGEpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoQW1tb0JhY2tlbmQsIFt7XG4gICAga2V5OiBcImluaXRpYWxpemVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShhbW1vUGF0aCkge1xuICAgICAgaW1wb3J0U2NyaXB0cyhhbW1vUGF0aCk7XG4gICAgICBBTU1PID0gQW1tbygpO1xuICAgICAgY29uc29sZS5sb2coJ0FtbW8gaW5pdGlhbGl6ZWQhJywgQU1NTyk7XG4gICAgICB0aGlzLnByZXBhcmVTZXR1cCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcmVwYXJlU2V0dXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJlcGFyZVNldHVwKCkge1xuICAgICAgdGhpcy5jb2xsaXNpb25Db25maWd1cmF0aW9uID0gbmV3IEFNTU8uYnREZWZhdWx0Q29sbGlzaW9uQ29uZmlndXJhdGlvbigpO1xuICAgICAgdGhpcy5kaXNwYXRjaGVyID0gbmV3IEFNTU8uYnRDb2xsaXNpb25EaXNwYXRjaGVyKHRoaXMuY29sbGlzaW9uQ29uZmlndXJhdGlvbik7XG4gICAgICB0aGlzLmJyb2FkcGhhc2UgPSBuZXcgQU1NTy5idERidnRCcm9hZHBoYXNlKCk7XG4gICAgICB0aGlzLnNvbHZlciA9IG5ldyBBTU1PLmJ0U2VxdWVudGlhbEltcHVsc2VDb25zdHJhaW50U29sdmVyKCk7XG4gICAgICB0aGlzLndvcmxkID0gbmV3IEFNTU8uYnREaXNjcmV0ZUR5bmFtaWNzV29ybGQodGhpcy5kaXNwYXRjaGVyLCB0aGlzLmJyb2FkcGhhc2UsIHRoaXMuc29sdmVyLCB0aGlzLmNvbGxpc2lvbkNvbmZpZ3VyYXRpb24pO1xuICAgICAgdGhpcy53b3JsZC5zZXRHcmF2aXR5KG5ldyBBTU1PLmJ0VmVjdG9yMygwLCAtNSwgMCkpOyAvLyBUT0RPOiBSZW1vdmVcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlU2hhcGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlU2hhcGUoX3JlZjIpIHtcbiAgICAgIHZhciBfcmVmMiR0eXBlID0gX3JlZjIudHlwZSxcbiAgICAgICAgICB0eXBlID0gX3JlZjIkdHlwZSA9PT0gdm9pZCAwID8gJ2JveCcgOiBfcmVmMiR0eXBlLFxuICAgICAgICAgIGRhdGEgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgW1widHlwZVwiXSk7XG5cbiAgICAgIHZhciBzaGFwZTtcblxuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ3NwaGVyZSc6XG4gICAgICAgICAgc2hhcGUgPSBuZXcgQU1NTy5idFNwaGVyZVNoYXBlKGRhdGEucmFkaXVzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdib3gnOlxuICAgICAgICAgIHNoYXBlID0gbmV3IEFNTU8uYnRCb3hTaGFwZShuZXcgQU1NTy5idFZlY3RvcjMoZGF0YS5zaXplWzBdIC8gMiwgZGF0YS5zaXplWzFdIC8gMiwgZGF0YS5zaXplWzJdIC8gMikpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaGFwZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlQm9keVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVCb2R5KHNoYXBlLCBfcmVmMykge1xuICAgICAgdmFyIF9yZWYzJG1hc3MgPSBfcmVmMy5tYXNzLFxuICAgICAgICAgIG1hc3MgPSBfcmVmMyRtYXNzID09PSB2b2lkIDAgPyAxIDogX3JlZjMkbWFzcyxcbiAgICAgICAgICBfcmVmMyRwb3NpdGlvbiA9IF9yZWYzLnBvc2l0aW9uLFxuICAgICAgICAgIHBvc2l0aW9uID0gX3JlZjMkcG9zaXRpb24gPT09IHZvaWQgMCA/IFswLCAwLCAwXSA6IF9yZWYzJHBvc2l0aW9uLFxuICAgICAgICAgIF9yZWYzJHJlc3RpdHV0aW9uID0gX3JlZjMucmVzdGl0dXRpb24sXG4gICAgICAgICAgcmVzdGl0dXRpb24gPSBfcmVmMyRyZXN0aXR1dGlvbiA9PT0gdm9pZCAwID8gMCA6IF9yZWYzJHJlc3RpdHV0aW9uLFxuICAgICAgICAgIF9yZWYzJGZyaWN0aW9uID0gX3JlZjMuZnJpY3Rpb24sXG4gICAgICAgICAgZnJpY3Rpb24gPSBfcmVmMyRmcmljdGlvbiA9PT0gdm9pZCAwID8gMSA6IF9yZWYzJGZyaWN0aW9uLFxuICAgICAgICAgIF9yZWYzJGxpbmVhckRhbXBpbmcgPSBfcmVmMy5saW5lYXJEYW1waW5nLFxuICAgICAgICAgIGxpbmVhckRhbXBpbmcgPSBfcmVmMyRsaW5lYXJEYW1waW5nID09PSB2b2lkIDAgPyAwIDogX3JlZjMkbGluZWFyRGFtcGluZyxcbiAgICAgICAgICBfcmVmMyRhbmd1bGFyRGFtcGluZyA9IF9yZWYzLmFuZ3VsYXJEYW1waW5nLFxuICAgICAgICAgIGFuZ3VsYXJEYW1waW5nID0gX3JlZjMkYW5ndWxhckRhbXBpbmcgPT09IHZvaWQgMCA/IDAgOiBfcmVmMyRhbmd1bGFyRGFtcGluZztcbiAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybSA9IG5ldyBBTU1PLmJ0VHJhbnNmb3JtKCk7XG4gICAgICB0cmFuc2Zvcm0uc2V0SWRlbnRpdHkoKTtcbiAgICAgIHRyYW5zZm9ybS5zZXRPcmlnaW4obmV3IEFNTU8uYnRWZWN0b3IzKHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgcG9zaXRpb25bMl0pKTtcbiAgICAgIHZhciBsb2NhbEluZXJ0aWEgPSBuZXcgQU1NTy5idFZlY3RvcjMoMCwgMCwgMCk7XG4gICAgICBzaGFwZS5jYWxjdWxhdGVMb2NhbEluZXJ0aWEobWFzcywgbG9jYWxJbmVydGlhKTtcbiAgICAgIHZhciBtb3Rpb25TdGF0ZSA9IG5ldyBBTU1PLmJ0RGVmYXVsdE1vdGlvblN0YXRlKHRyYW5zZm9ybSk7XG4gICAgICB2YXIgcmJJbmZvID0gbmV3IEFNTU8uYnRSaWdpZEJvZHlDb25zdHJ1Y3Rpb25JbmZvKG1hc3MsIG1vdGlvblN0YXRlLCBzaGFwZSwgbG9jYWxJbmVydGlhKTtcbiAgICAgIHJiSW5mby5zZXRfbV9mcmljdGlvbihmcmljdGlvbik7XG4gICAgICBjb25zb2xlLmxvZygncmVzdGl0dXRpb24nLCByZXN0aXR1dGlvbik7XG4gICAgICByYkluZm8uc2V0X21fcmVzdGl0dXRpb24ocmVzdGl0dXRpb24pO1xuICAgICAgcmJJbmZvLnNldF9tX2xpbmVhckRhbXBpbmcobGluZWFyRGFtcGluZyk7XG4gICAgICByYkluZm8uc2V0X21fYW5ndWxhckRhbXBpbmcoYW5ndWxhckRhbXBpbmcpO1xuICAgICAgdmFyIGJvZHkgPSBuZXcgQU1NTy5idFJpZ2lkQm9keShyYkluZm8pO1xuICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZVJpZ2lkQm9keVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVSaWdpZEJvZHkoYm9keURhdGEpIHtcbiAgICAgIHZhciBzaGFwZSA9IHRoaXMuY3JlYXRlU2hhcGUoYm9keURhdGEpO1xuICAgICAgdmFyIGJvZHkgPSB0aGlzLmNyZWF0ZUJvZHkoc2hhcGUsIHtcbiAgICAgICAgbWFzczogdHlwZW9mIGJvZHlEYXRhLm1hc3MgPT09ICdudW1iZXInID8gYm9keURhdGEubWFzcyA6IDEsXG4gICAgICAgIHBvc2l0aW9uOiBib2R5RGF0YS5wb3NpdGlvbixcbiAgICAgICAgcmVzdGl0dXRpb246IGJvZHlEYXRhLnJlc3RpdHV0aW9uLFxuICAgICAgICBmcmljdGlvbjogYm9keURhdGEuZnJpY3Rpb24sXG4gICAgICAgIGxpbmVhckRhbXBpbmc6IGJvZHlEYXRhLmxpbmVhckRhbXBpbmcsXG4gICAgICAgIGFuZ3VsYXJEYW1waW5nOiBib2R5RGF0YS5hbmd1bGFyRGFtcGluZ1xuICAgICAgfSk7XG4gICAgICB0aGlzLndvcmxkLmFkZFJpZ2lkQm9keShib2R5KTtcbiAgICAgIHRoaXMuYm9kaWVzLnB1c2goYm9keSk7XG4gICAgICB0cmFuc2ZlcmFibGVNZXNzYWdlKHtcbiAgICAgICAgY21kOiBDTUQuRkVFREJBQ0tfUklHSURCT0RZLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgaW5kZXg6IGJvZHlEYXRhLmluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVSaWdpZEJvZGllc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVSaWdpZEJvZGllcyhhcnJheSwgaW5pdGlhbE9mZnNldCkge1xuICAgICAgdmFyIG51bWJvZGllcyA9IHRoaXMuYm9kaWVzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKG51bWJvZGllcy0tKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSBudW1ib2RpZXMgKiA3ICsgaW5pdGlhbE9mZnNldDtcbiAgICAgICAgdGhpcy5ib2RpZXNbbnVtYm9kaWVzXS5nZXRNb3Rpb25TdGF0ZSgpLmdldFdvcmxkVHJhbnNmb3JtKHRoaXMudHJhbnNmb3JtKTtcbiAgICAgICAgdmFyIG9yaWdpbiA9IHRoaXMudHJhbnNmb3JtLmdldE9yaWdpbigpO1xuICAgICAgICB2YXIgcm90YXRpb24gPSB0aGlzLnRyYW5zZm9ybS5nZXRSb3RhdGlvbigpO1xuICAgICAgICBhcnJheVtvZmZzZXRdID0gb3JpZ2luLngoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgMV0gPSBvcmlnaW4ueSgpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyAyXSA9IG9yaWdpbi56KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDNdID0gcm90YXRpb24ueCgpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyA0XSA9IHJvdGF0aW9uLnkoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgNV0gPSByb3RhdGlvbi56KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDZdID0gcm90YXRpb24udygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaW11bGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaW11bGF0ZSgpIHtcbiAgICAgIHRoaXMud29ybGQuc3RlcFNpbXVsYXRpb24oZHQrKywgMik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDEgKyB0aGlzLmJvZGllcy5sZW5ndGggKiA3KTtcbiAgICAgIGFycmF5WzBdID0gQ01ELkZFRURCQUNLX1VQREFURTtcbiAgICAgIHRoaXMuc2ltdWxhdGUoKTtcbiAgICAgIHRoaXMudXBkYXRlUmlnaWRCb2RpZXMoYXJyYXksIDEpO1xuICAgICAgdHJhbnNmZXJhYmxlTWVzc2FnZShhcnJheSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFtbW9CYWNrZW5kO1xufSgpLCBfdGVtcCkoKTtcblxuXG59KTsiLCJpbXBvcnQgQW1tb1dvcmtlciBmcm9tICd3b3JrZXIhLi93b3JrZXIuanMnO1xuaW1wb3J0IENNRCBmcm9tICcuLi9jb21tYW5kcyc7XG5cbmV4cG9ydCBjbGFzcyBBbW1vRW5naW5lIHtcbiAgc3RhdGljIENNRCA9IENNRDtcbiAgc3RhdGljIEFycmF5QnVmZmVyID0gU2hhcmVkQXJyYXlCdWZmZXIgfHwgQXJyYXlCdWZmZXI7XG4gIGlzU2hhcmVkID0gQW1tb0VuZ2luZS5BcnJheUJ1ZmZlciBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLndvcmtlciA9IG5ldyBBbW1vV29ya2VyKCk7XG4gICAgdGhpcy53b3JrZXIudHJhbnNmZXJhYmxlTWVzc2FnZSA9IHRoaXMud29ya2VyLndlYmtpdFBvc3RNZXNzYWdlIHx8IHRoaXMud29ya2VyLnBvc3RNZXNzYWdlO1xuICAgIHRoaXMuc2VuZChDTUQuSU5JVElBTElaRSwgb3B0aW9ucyk7XG4gIH1cblxuICBzZW5kKGNtZCwgZGF0YSkge1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2Uoe2NtZCwgZGF0YX0pO1xuICB9XG5cbiAgc2VuZEJ1ZmZlcihjb21tYW5kLCBkYXRhID0gW10pIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlciA9IG5ldyBBbW1vRW5naW5lLkFycmF5QnVmZmVyKEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIChkYXRhLmxlbmd0aCArIDEpKTtcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlcik7XG4gICAgYXJyYXlbMF0gPSBjb21tYW5kO1xuXG4gICAgYXJyYXkuc2V0KGRhdGEsIDEpO1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UoYXJyYXksIGJ1ZmZlcik7XG4gIH1cblxuICByZXF1ZXN0VXBkYXRlKCkge1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2Uoe2NtZDogQ01ELlJFUVVFU1RfVVBEQVRFfSk7XG4gIH1cblxuICBsaXN0ZW4oY2FsbGJhY2spIHtcbiAgICB0aGlzLndvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgY2FsbGJhY2spO1xuICB9XG59XG4iXSwibmFtZXMiOlsiaSIsIklOSVRJQUxJWkUiLCJGRUVEQkFDS19JTklUSUFMSVpFIiwiQ1JFQVRFX1JJR0lEQk9EWSIsIkZFRURCQUNLX1JJR0lEQk9EWSIsIlJFUVVFU1RfVVBEQVRFIiwiRkVFREJBQ0tfVVBEQVRFIiwiV29ybGRNb2R1bGUiLCJvcHRpb25zIiwiY2hpbGQiLCJjb21wb25lbnQiLCJtYW5hZ2VyIiwiaW5kZXgiLCJib2R5SW5kZXgiLCJwaHlzaWNzIiwiY3JlYXRlUGh5c2ljcyIsImJvZGllcyIsImVuZ2luZSIsInNlbmQiLCJDTUQiLCJkYXRhIiwic2ltdWxhdGUiLCJhcHAiLCJzaW11bGF0ZUxvb3AiLCJsb29wIiwicmVxdWVzdFVwZGF0ZSIsImxpc3RlbiIsImNtZCIsImFjdGl2ZSIsInByb2Nlc3NVcGRhdGVGZWVkYmFjayIsImFycmF5IiwibnVtYm9kaWVzIiwib2Zmc2V0IiwiYm9keSIsIm5hdGl2ZSIsInBvc2l0aW9uIiwieCIsInkiLCJ6IiwicXVhdGVybmlvbiIsInciLCJjb21wdXRlU3BoZXJlT3B0aW9ucyIsImdlb21ldHJ5IiwiY29tcHV0ZUJvdW5kaW5nU3BoZXJlIiwicmFkaXVzIiwiYm91bmRpbmdTcGhlcmUiLCJjb21wdXRlQm94T3B0aW9ucyIsImNvbXB1dGVCb3VuZGluZ0JveCIsInNpemUiLCJib3VuZGluZ0JveCIsImdldFNpemUiLCJ0b0FycmF5IiwiUmlnaWRib2R5TW9kdWxlIiwidHlwZSIsImNvbXB1dGUiLCJCb29sZWFuIiwid29ybGRNb2R1bGUiLCJtYXNzIiwicmVzdGl0dXRpb24iLCJmcmljdGlvbiIsImxpbmVhckRhbXBpbmciLCJhbmd1bGFyRGFtcGluZyIsImNvbXB1dGVEYXRhIiwiVEFSR0VUIiwiU3ltYm9sIiwiU0NSSVBUX1RZUEUiLCJCbG9iQnVpbGRlciIsIndpbmRvdyIsIldlYktpdEJsb2JCdWlsZGVyIiwiTW96QmxvYkJ1aWxkZXIiLCJNU0Jsb2JCdWlsZGVyIiwiVVJMIiwid2Via2l0VVJMIiwiV29ya2VyIiwic2hpbVdvcmtlciIsImZpbGVuYW1lIiwiZm4iLCJTaGltV29ya2VyIiwiZm9yY2VGYWxsYmFjayIsIm8iLCJzb3VyY2UiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJzbGljZSIsIm9ialVSTCIsImNyZWF0ZVNvdXJjZU9iamVjdCIsInJldm9rZU9iamVjdFVSTCIsInNlbGZTaGltIiwicG9zdE1lc3NhZ2UiLCJtIiwib25tZXNzYWdlIiwic2V0VGltZW91dCIsInRhcmdldCIsImNhbGwiLCJpc1RoaXNUaHJlYWQiLCJ0ZXN0V29ya2VyIiwidGVzdEFycmF5IiwiVWludDhBcnJheSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJFcnJvciIsImJ1ZmZlciIsImUiLCJ0ZXJtaW5hdGUiLCJzdHIiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiYmxvYiIsImFwcGVuZCIsImdldEJsb2IiLCJkb2N1bWVudCIsInNlbGYiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsImV4Y2x1ZGVkIiwic291cmNlS2V5cyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJsZW5ndGgiLCJpbmRleE9mIiwib2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsInNvdXJjZVN5bWJvbEtleXMiLCJwcm90b3R5cGUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIm9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsImNsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsImNyZWF0ZUNsYXNzIiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwidmFsdWUiLCJfdGVtcCIsInRyYW5zZmVyYWJsZU1lc3NhZ2UiLCJ3ZWJraXRQb3N0TWVzc2FnZSIsIkFNTU8iLCJkdCIsIkFtbW9CYWNrZW5kIiwiX3RoaXMiLCJfcmVmIiwiaW5pdGlhbGl6ZSIsInBhdGgiLCJ1cGRhdGUiLCJjcmVhdGVSaWdpZEJvZHkiLCJhbW1vUGF0aCIsImltcG9ydFNjcmlwdHMiLCJBbW1vIiwiY29uc29sZSIsImxvZyIsInByZXBhcmVTZXR1cCIsImNvbGxpc2lvbkNvbmZpZ3VyYXRpb24iLCJidERlZmF1bHRDb2xsaXNpb25Db25maWd1cmF0aW9uIiwiZGlzcGF0Y2hlciIsImJ0Q29sbGlzaW9uRGlzcGF0Y2hlciIsImJyb2FkcGhhc2UiLCJidERidnRCcm9hZHBoYXNlIiwic29sdmVyIiwiYnRTZXF1ZW50aWFsSW1wdWxzZUNvbnN0cmFpbnRTb2x2ZXIiLCJ3b3JsZCIsImJ0RGlzY3JldGVEeW5hbWljc1dvcmxkIiwic2V0R3Jhdml0eSIsImJ0VmVjdG9yMyIsImNyZWF0ZVNoYXBlIiwiX3JlZjIiLCJfcmVmMiR0eXBlIiwic2hhcGUiLCJidFNwaGVyZVNoYXBlIiwiYnRCb3hTaGFwZSIsImNyZWF0ZUJvZHkiLCJfcmVmMyIsIl9yZWYzJG1hc3MiLCJfcmVmMyRwb3NpdGlvbiIsIl9yZWYzJHJlc3RpdHV0aW9uIiwiX3JlZjMkZnJpY3Rpb24iLCJfcmVmMyRsaW5lYXJEYW1waW5nIiwiX3JlZjMkYW5ndWxhckRhbXBpbmciLCJ0cmFuc2Zvcm0iLCJidFRyYW5zZm9ybSIsInNldElkZW50aXR5Iiwic2V0T3JpZ2luIiwibG9jYWxJbmVydGlhIiwiY2FsY3VsYXRlTG9jYWxJbmVydGlhIiwibW90aW9uU3RhdGUiLCJidERlZmF1bHRNb3Rpb25TdGF0ZSIsInJiSW5mbyIsImJ0UmlnaWRCb2R5Q29uc3RydWN0aW9uSW5mbyIsInNldF9tX2ZyaWN0aW9uIiwic2V0X21fcmVzdGl0dXRpb24iLCJzZXRfbV9saW5lYXJEYW1waW5nIiwic2V0X21fYW5ndWxhckRhbXBpbmciLCJidFJpZ2lkQm9keSIsImJvZHlEYXRhIiwiYWRkUmlnaWRCb2R5IiwicHVzaCIsInVwZGF0ZVJpZ2lkQm9kaWVzIiwiaW5pdGlhbE9mZnNldCIsImdldE1vdGlvblN0YXRlIiwiZ2V0V29ybGRUcmFuc2Zvcm0iLCJvcmlnaW4iLCJnZXRPcmlnaW4iLCJyb3RhdGlvbiIsImdldFJvdGF0aW9uIiwic3RlcFNpbXVsYXRpb24iLCJGbG9hdDMyQXJyYXkiLCJBbW1vRW5naW5lIiwiQXJyYXlCdWZmZXIiLCJTaGFyZWRBcnJheUJ1ZmZlciIsIndvcmtlciIsIkFtbW9Xb3JrZXIiLCJjb21tYW5kIiwiQllURVNfUEVSX0VMRU1FTlQiLCJzZXQiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQSxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBQzlDLElBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFDLEVBQUU7TUFDdEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQzFEO0dBQ0Y7O0VBRUQsa0JBQWMsR0FBRyxlQUFlOztFQ05oQyxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7SUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUs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
