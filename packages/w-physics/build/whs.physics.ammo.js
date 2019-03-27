/* WhitestormJS Physics v3.0.0-dev.10 */
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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

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

    function createCommonjsModule(fn, module) {
      return module = {
        exports: {}
      }, fn(module, module.exports), module.exports;
    }

    var runtime = createCommonjsModule(function (module) {
      /**
       * Copyright (c) 2014-present, Facebook, Inc.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
      !function (global) {
        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined; // More compressible than void 0.

        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        var runtime = global.regeneratorRuntime;

        if (runtime) {
          {
            // If regeneratorRuntime is defined globally and we're in a module,
            // make the exports object identical to regeneratorRuntime.
            module.exports = runtime;
          } // Don't bother evaluating the rest of this file if the runtime was
          // already defined globally.

          return;
        } // Define the runtime globally (as expected by generated code) as either
        // module.exports (if we're in a module) or a new, empty object.


        runtime = global.regeneratorRuntime = module.exports;

        function wrap(innerFn, outerFn, self, tryLocsList) {
          // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
          // .throw, and .return methods.

          generator._invoke = makeInvokeMethod(innerFn, self, context);
          return generator;
        }

        runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
        // record like context.tryEntries[i].completion. This interface could
        // have been (and was previously) designed to take a closure to be
        // invoked without arguments, but in all the cases we care about we
        // already have an existing method we want to call, so there's no need
        // to create a new function object. We can even get away with assuming
        // the method takes exactly one argument, since that happens to be true
        // in every case, so we don't have to touch the arguments object. The
        // only additional allocation required is the completion record, which
        // has a stable shape and so hopefully should be cheap to allocate.

        function tryCatch(fn, obj, arg) {
          try {
            return {
              type: "normal",
              arg: fn.call(obj, arg)
            };
          } catch (err) {
            return {
              type: "throw",
              arg: err
            };
          }
        }

        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
        // breaking out of the dispatch switch statement.

        var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
        // .constructor.prototype properties for functions that return Generator
        // objects. For full spec compliance, you may wish to configure your
        // minifier not to mangle the names of these two functions.

        function Generator() {}

        function GeneratorFunction() {}

        function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
        // don't natively support it.


        var IteratorPrototype = {};

        IteratorPrototype[iteratorSymbol] = function () {
          return this;
        };

        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          // This environment has a native %IteratorPrototype%; use it instead
          // of the polyfill.
          IteratorPrototype = NativeIteratorPrototype;
        }

        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
        // Iterator interface in terms of a single ._invoke method.

        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function (method) {
            prototype[method] = function (arg) {
              return this._invoke(method, arg);
            };
          });
        }

        runtime.isGeneratorFunction = function (genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };

        runtime.mark = function (genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;

            if (!(toStringTagSymbol in genFun)) {
              genFun[toStringTagSymbol] = "GeneratorFunction";
            }
          }

          genFun.prototype = Object.create(Gp);
          return genFun;
        }; // Within the body of any async function, `await x` is transformed to
        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
        // `hasOwn.call(value, "__await")` to determine if the yielded value is
        // meant to be awaited.


        runtime.awrap = function (arg) {
          return {
            __await: arg
          };
        };

        function AsyncIterator(generator) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);

            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;

              if (value && _typeof_1(value) === "object" && hasOwn.call(value, "__await")) {
                return Promise.resolve(value.__await).then(function (value) {
                  invoke("next", value, resolve, reject);
                }, function (err) {
                  invoke("throw", err, resolve, reject);
                });
              }

              return Promise.resolve(value).then(function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              }, function (error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke("throw", error, resolve, reject);
              });
            }
          }

          var previousPromise;

          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new Promise(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }

            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          } // Define the unified helper method that is used to implement .next,
          // .throw, and .return (see defineIteratorMethods).


          this._invoke = enqueue;
        }

        defineIteratorMethods(AsyncIterator.prototype);

        AsyncIterator.prototype[asyncIteratorSymbol] = function () {
          return this;
        };

        runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
        // AsyncIterator objects; they just return a Promise for the value of
        // the final result produced by the iterator.

        runtime.async = function (innerFn, outerFn, self, tryLocsList) {
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
          return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
        };

        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;
          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }

            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              } // Be forgiving, per 25.3.3.3.3 of the spec:
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


              return doneResult();
            }

            context.method = method;
            context.arg = arg;

            while (true) {
              var delegate = context.delegate;

              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);

                if (delegateResult) {
                  if (delegateResult === ContinueSentinel) continue;
                  return delegateResult;
                }
              }

              if (context.method === "next") {
                // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
              } else if (context.method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw context.arg;
                }

                context.dispatchException(context.arg);
              } else if (context.method === "return") {
                context.abrupt("return", context.arg);
              }

              state = GenStateExecuting;
              var record = tryCatch(innerFn, self, context);

              if (record.type === "normal") {
                // If an exception is thrown from innerFn, we leave state ===
                // GenStateExecuting and loop back for another invocation.
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                if (record.arg === ContinueSentinel) {
                  continue;
                }

                return {
                  value: record.arg,
                  done: context.done
                };
              } else if (record.type === "throw") {
                state = GenStateCompleted; // Dispatch the exception by looping back around to the
                // context.dispatchException(context.arg) call above.

                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        } // Call delegate.iterator[context.method](context.arg) and handle the
        // result, either by returning a { value, done } result from the
        // delegate iterator, or by modifying context.method and context.arg,
        // setting context.delegate to null, and returning the ContinueSentinel.


        function maybeInvokeDelegate(delegate, context) {
          var method = delegate.iterator[context.method];

          if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;

            if (context.method === "throw") {
              if (delegate.iterator.return) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);

                if (context.method === "throw") {
                  // If maybeInvokeDelegate(context) changed context.method from
                  // "return" to "throw", let that override the TypeError below.
                  return ContinueSentinel;
                }
              }

              context.method = "throw";
              context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }

            return ContinueSentinel;
          }

          var record = tryCatch(method, delegate.iterator, context.arg);

          if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
          }

          var info = record.arg;

          if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }

          if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

            context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.

            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined;
            }
          } else {
            // Re-yield the result returned by the delegate method.
            return info;
          } // The delegate iterator is finished, so forget it and continue with
          // the outer generator.


          context.delegate = null;
          return ContinueSentinel;
        } // Define Generator.prototype.{next,throw,return} in terms of the
        // unified ._invoke helper method.


        defineIteratorMethods(Gp);
        Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
        // @@iterator function is called on it. Some browsers' implementations of the
        // iterator prototype chain incorrectly implement this, causing the Generator
        // object to not be returned from this call. This ensures that doesn't happen.
        // See https://github.com/facebook/regenerator/issues/274 for more details.

        Gp[iteratorSymbol] = function () {
          return this;
        };

        Gp.toString = function () {
          return "[object Generator]";
        };

        function pushTryEntry(locs) {
          var entry = {
            tryLoc: locs[0]
          };

          if (1 in locs) {
            entry.catchLoc = locs[1];
          }

          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }

          this.tryEntries.push(entry);
        }

        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }

        function Context(tryLocsList) {
          // The root entry object (effectively a try statement without a catch
          // or a finally block) gives us a place to store values thrown from
          // locations where there is no enclosing try statement.
          this.tryEntries = [{
            tryLoc: "root"
          }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }

        runtime.keys = function (object) {
          var keys = [];

          for (var key in object) {
            keys.push(key);
          }

          keys.reverse(); // Rather than returning an object with a next method, we keep
          // things simple and return the next function itself.

          return function next() {
            while (keys.length) {
              var key = keys.pop();

              if (key in object) {
                next.value = key;
                next.done = false;
                return next;
              }
            } // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.


            next.done = true;
            return next;
          };
        };

        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];

            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }

            if (typeof iterable.next === "function") {
              return iterable;
            }

            if (!isNaN(iterable.length)) {
              var i = -1,
                  next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;
                return next;
              };

              return next.next = next;
            }
          } // Return an iterator with no values.


          return {
            next: doneResult
          };
        }

        runtime.values = values;

        function doneResult() {
          return {
            value: undefined,
            done: true
          };
        }

        Context.prototype = {
          constructor: Context,
          reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0; // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.

            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);

            if (!skipTempReset) {
              for (var name in this) {
                // Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined;
                }
              }
            }
          },
          stop: function stop() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;

            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }

            return this.rval;
          },
          dispatchException: function dispatchException(exception) {
            if (this.done) {
              throw exception;
            }

            var context = this;

            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;

              if (caught) {
                // If the dispatched exception was caught by a catch block,
                // then let that catch block handle the exception normally.
                context.method = "next";
                context.arg = undefined;
              }

              return !!caught;
            }

            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;

              if (entry.tryLoc === "root") {
                // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
              }

              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");

                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }
                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },
          abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];

              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }

            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
              // Ignore the finally entry if control is not jumping to a
              // location outside the try/catch block.
              finallyEntry = null;
            }

            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;

            if (finallyEntry) {
              this.method = "next";
              this.next = finallyEntry.finallyLoc;
              return ContinueSentinel;
            }

            return this.complete(record);
          },
          complete: function complete(record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }

            if (record.type === "break" || record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = this.arg = record.arg;
              this.method = "return";
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }

            return ContinueSentinel;
          },
          finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];

              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },
          "catch": function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];

              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;

                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }

                return thrown;
              }
            } // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.


            throw new Error("illegal catch attempt");
          },
          delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
            };

            if (this.method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              this.arg = undefined;
            }

            return ContinueSentinel;
          }
        };
      }( // In sloppy mode, unbound `this` refers to the global object, fallback to
      // Function constructor if we're in global strict mode. That is sadly a form
      // of indirect eval which violates Content Security Policy.
      function () {
        return this || _typeof_1(self) === "object" && self;
      }() || Function("return this")());
    });
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    // This method of obtaining a reference to the global object needs to be
    // kept identical to the way it is obtained in runtime.js

    var g = function () {
      return this || _typeof_1(self) === "object" && self;
    }() || Function("return this")(); // Use `getOwnPropertyNames` because not all browsers support calling
    // `hasOwnProperty` on the global `self` object in a worker. See #183.


    var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.

    var oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.

    g.regeneratorRuntime = undefined;
    var runtimeModule = runtime;

    if (hadRuntime) {
      // Restore the original runtime.
      g.regeneratorRuntime = oldRuntime;
    } else {
      // Remove the global property added by runtime.js.
      try {
        delete g.regeneratorRuntime;
      } catch (e) {
        g.regeneratorRuntime = undefined;
      }
    }

    var regenerator = runtimeModule;

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
        defineProperty(this, "cache", {
          geometries: {}
        });

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
          // temp variables
          this.tmpVec3 = new AMMO.btVector3();
          this.collisionConfiguration = new AMMO.btDefaultCollisionConfiguration();
          this.dispatcher = new AMMO.btCollisionDispatcher(this.collisionConfiguration);
          this.broadphase = new AMMO.btDbvtBroadphase();
          this.solver = new AMMO.btSequentialImpulseConstraintSolver();
          this.world = new AMMO.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration);
          this.world.setGravity(new AMMO.btVector3(0, -5, 0)); // TODO: Remove
        } // key example: `plane.normal{24.543,23.53,53.4}`

      }, {
        key: "shapeGenerator",
        value:
        /*#__PURE__*/
        regenerator.mark(function shapeGenerator(_ref2) {
          var _ref2$type, type, data, vec3;

          return regenerator.wrap(function shapeGenerator$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _ref2$type = _ref2.type, type = _ref2$type === void 0 ? 'box' : _ref2$type, data = objectWithoutProperties(_ref2, ["type"]);
                  vec3 = this.tmpVec3;
                  _context.t0 = type;
                  _context.next = _context.t0 === 'plane' ? 5 : _context.t0 === 'sphere' ? 12 : _context.t0 === 'box' ? 16 : 23;
                  break;

                case 5:
                  _context.next = 7;
                  return Symbol.for("plane.normal{".concat(data.normal.join(','), "}"));

                case 7:
                  vec3.setX(data.normal[0]);
                  vec3.setY(data.normal[1]);
                  vec3.setY(data.normal[2]);
                  _context.next = 12;
                  return new AMMO.btStaticPlaneShape(vec3);

                case 12:
                  _context.next = 14;
                  return Symbol.for("sphere.radius{".concat(data.radius, "}"));

                case 14:
                  _context.next = 16;
                  return new AMMO.btSphereShape(data.radius);

                case 16:
                  _context.next = 18;
                  return Symbol.for("box.size{".concat(data.size.join(','), "}"));

                case 18:
                  vec3.setX(data.size[0] / 2);
                  vec3.setY(data.size[1] / 2);
                  vec3.setY(data.size[2] / 2);
                  _context.next = 23;
                  return new AMMO.btBoxShape(vec3);

                case 23:
                case "end":
                  return _context.stop();
              }
            }
          }, shapeGenerator, this);
        })
      }, {
        key: "createShape",
        value: function createShape(bodyData) {
          var shapeGenerator = this.shapeGenerator(bodyData);
          var shapeKey = shapeGenerator.next().value;

          if (shapeKey in this.cache.geometries) {
            return this.cache.geometries[shapeKey];
          }

          return shapeGenerator.next().value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLnBoeXNpY3MuYW1tby5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwiLi4vc3JjL2VuZ2luZXMvY29tbWFuZHMuanMiLCIuLi9zcmMvbW9kdWxlcy9Xb3JsZE1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIi4uL3NyYy9tb2R1bGVzL1JpZ2lkYm9keU1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uL3Rvb2xzL3dvcmtlci1wbHVnaW4vd29ya2VyaGVscGVyLmpzIiwiLi4vc3JjL2VuZ2luZXMvYW1tb2pzL3dvcmtlci5qcyIsIi4uL3NyYy9lbmdpbmVzL2FtbW9qcy9BbW1vRW5naW5lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImxldCBpID0gMDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBJTklUSUFMSVpFOiBpKyssXG4gIEZFRURCQUNLX0lOSVRJQUxJWkU6IGkrKyxcbiAgQ1JFQVRFX1JJR0lEQk9EWTogaSsrLFxuICBGRUVEQkFDS19SSUdJREJPRFk6IGkrKyxcbiAgUkVRVUVTVF9VUERBVEU6IGkrKyxcbiAgRkVFREJBQ0tfVVBEQVRFOiBpKytcbn07XG4iLCJpbXBvcnQgQ01EIGZyb20gJy4uL2VuZ2luZXMvY29tbWFuZHMnO1xuXG5leHBvcnQgY2xhc3MgV29ybGRNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5lbmdpbmUgPSBvcHRpb25zLmVuZ2luZTtcbiAgICB0aGlzLmJvZGllcyA9IHt9O1xuICAgIHRoaXMuYm9keUluZGV4ID0gMDtcbiAgICB0aGlzLnNpbXVsYXRlID0gZmFsc2U7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIG1hbmFnZXIuc2ltdWxhdGVMb29wID0gYXBwLmxvb3AoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNpbXVsYXRlKSByZXR1cm47XG4gICAgICB0aGlzLmVuZ2luZS5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVuZ2luZS5saXN0ZW4oKHtkYXRhfSkgPT4ge1xuICAgICAgc3dpdGNoIChkYXRhWzBdIHx8IGRhdGEuY21kKSB7XG4gICAgICAgIGNhc2UgQ01ELkZFRURCQUNLX0lOSVRJQUxJWkU6XG4gICAgICAgICAgdGhpcy5zaW11bGF0ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ01ELkZFRURCQUNLX1JJR0lEQk9EWTpcbiAgICAgICAgICBjb25zdCBwaHlzaWNzID0gdGhpcy5ib2RpZXNbZGF0YS5kYXRhLmluZGV4XTtcbiAgICAgICAgICBwaHlzaWNzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ01ELkZFRURCQUNLX1VQREFURTpcbiAgICAgICAgICB0aGlzLnByb2Nlc3NVcGRhdGVGZWVkYmFjayhkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcm9jZXNzVXBkYXRlRmVlZGJhY2soYXJyYXkpIHtcbiAgICBjb25zdCBib2RpZXMgPSB0aGlzLmJvZGllcztcbiAgICBsZXQgbnVtYm9kaWVzID0gdGhpcy5ib2R5SW5kZXg7XG5cbiAgICB3aGlsZShudW1ib2RpZXMtLSkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gMSArIG51bWJvZGllcyAqIDc7XG4gICAgICBjb25zdCBib2R5ID0gYm9kaWVzW251bWJvZGllc10uY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgICAgYm9keS5wb3NpdGlvbi54ID0gYXJyYXlbb2Zmc2V0XTtcbiAgICAgIGJvZHkucG9zaXRpb24ueSA9IGFycmF5W29mZnNldCArIDFdO1xuICAgICAgYm9keS5wb3NpdGlvbi56ID0gYXJyYXlbb2Zmc2V0ICsgMl07XG5cbiAgICAgIGJvZHkucXVhdGVybmlvbi54ID0gYXJyYXlbb2Zmc2V0ICsgM107XG4gICAgICBib2R5LnF1YXRlcm5pb24ueSA9IGFycmF5W29mZnNldCArIDRdO1xuICAgICAgYm9keS5xdWF0ZXJuaW9uLnogPSBhcnJheVtvZmZzZXQgKyA1XTtcbiAgICAgIGJvZHkucXVhdGVybmlvbi53ID0gYXJyYXlbb2Zmc2V0ICsgNl07XG4gICAgfVxuICB9XG5cbiAgYnJpZGdlcyA9IHtcbiAgICBjaGlsZDogKGNvbXBvbmVudCkgPT4ge1xuICAgICAgaWYgKGNvbXBvbmVudC5tYW5hZ2VyICYmICdjcmVhdGVQaHlzaWNzJyBpbiBjb21wb25lbnQubWFuYWdlcikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYm9keUluZGV4Kys7XG4gICAgICAgIGNvbnN0IHBoeXNpY3MgPSBjb21wb25lbnQubWFuYWdlci5jcmVhdGVQaHlzaWNzKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5ib2RpZXNbaW5kZXhdID0gcGh5c2ljcztcbiAgICAgICAgdGhpcy5lbmdpbmUuc2VuZChDTUQuQ1JFQVRFX1JJR0lEQk9EWSwgcGh5c2ljcy5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gIH1cbn1cbiIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCJ2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IHJlcXVpcmUoXCIuL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7IiwiZnVuY3Rpb24gY29tcHV0ZVNwaGVyZU9wdGlvbnMoZ2VvbWV0cnksIG9wdGlvbnMpIHtcbiAgZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IG9wdGlvbnMucmFkaXVzIHx8IGdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlLnJhZGl1c1xuICB9O1xufTtcblxuZnVuY3Rpb24gY29tcHV0ZUJveE9wdGlvbnMoZ2VvbWV0cnksIG9wdGlvbnMpIHtcbiAgZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplOiBvcHRpb25zLnNpemUgfHwgZ2VvbWV0cnkuYm91bmRpbmdCb3guZ2V0U2l6ZSgpLnRvQXJyYXkoKVxuICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIFJpZ2lkYm9keU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHt0eXBlID0gJ3NwaGVyZScsIGNvbXB1dGUsIC4uLm9wdGlvbnN9ID0ge3R5cGU6ICdzcGhlcmUnLCBjb21wdXRlOiB0cnVlfSkge1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wdXRlID0gQm9vbGVhbihjb21wdXRlKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0dXAoY29tcG9uZW50LCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLmNyZWF0ZVBoeXNpY3MgPSAod29ybGRNb2R1bGUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB7cG9zaXRpb24sIHF1YXRlcm5pb259ID0gY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgICAgbWFuYWdlci5waHlzaWNzID0ge1xuICAgICAgICBlbmdpbmU6IHdvcmxkTW9kdWxlLmVuZ2luZSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24udG9BcnJheSgpLFxuICAgICAgICAgIHF1YXRlcm5pb246IHF1YXRlcm5pb24udG9BcnJheSgpLFxuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIG1hc3M6IHRoaXMub3B0aW9ucy5tYXNzLFxuICAgICAgICAgIHJlc3RpdHV0aW9uOiB0aGlzLm9wdGlvbnMucmVzdGl0dXRpb24sXG4gICAgICAgICAgZnJpY3Rpb246IHRoaXMub3B0aW9ucy5mcmljdGlvbixcbiAgICAgICAgICBsaW5lYXJEYW1waW5nOiB0aGlzLm9wdGlvbnMubGluZWFyRGFtcGluZyxcbiAgICAgICAgICBhbmd1bGFyRGFtcGluZzogdGhpcy5vcHRpb25zLmFuZ3VsYXJEYW1waW5nLFxuICAgICAgICAgIC4uLnRoaXMuY29tcHV0ZURhdGEodGhpcy50eXBlLCBjb21wb25lbnQubmF0aXZlLmdlb21ldHJ5KVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnQsXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBtYW5hZ2VyLnBoeXNpY3M7XG4gICAgfVxuICB9XG5cbiAgY29tcHV0ZURhdGEodHlwZSwgZ2VvbWV0cnkpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3NwaGVyZSc6XG4gICAgICAgIHJldHVybiBjb21wdXRlU3BoZXJlT3B0aW9ucyhnZW9tZXRyeSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIGNhc2UgJ2JveCc6XG4gICAgICAgIHJldHVybiBjb21wdXRlQm94T3B0aW9ucyhnZW9tZXRyeSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIGRlZmF1bHQ6XG5cbiAgICB9XG4gIH1cbn1cbiIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsInZhciBUQVJHRVQgPSB0eXBlb2YgU3ltYm9sID09PSAndW5kZWZpbmVkJyA/ICdfX3RhcmdldCcgOiBTeW1ib2woKSxcbiAgICBTQ1JJUFRfVFlQRSA9ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyxcbiAgICBCbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyLFxuICAgIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCxcbiAgICBXb3JrZXIgPSB3aW5kb3cuV29ya2VyO1xuXG4vKipcbiAqIFJldHVybnMgYSB3cmFwcGVyIGFyb3VuZCBXZWIgV29ya2VyIGNvZGUgdGhhdCBpcyBjb25zdHJ1Y3RpYmxlLlxuICpcbiAqIEBmdW5jdGlvbiBzaGltV29ya2VyXG4gKlxuICogQHBhcmFtIHsgU3RyaW5nIH0gICAgZmlsZW5hbWUgICAgVGhlIG5hbWUgb2YgdGhlIGZpbGVcbiAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gIGZuICAgICAgICAgIEZ1bmN0aW9uIHdyYXBwaW5nIHRoZSBjb2RlIG9mIHRoZSB3b3JrZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hpbVdvcmtlciAoZmlsZW5hbWUsIGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFNoaW1Xb3JrZXIgKGZvcmNlRmFsbGJhY2spIHtcbiAgICAgICAgdmFyIG8gPSB0aGlzO1xuXG4gICAgICAgIGlmICghZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgV29ya2VyKGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChXb3JrZXIgJiYgIWZvcmNlRmFsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIGZ1bmN0aW9uJ3MgaW5uZXIgY29kZSB0byBhIHN0cmluZyB0byBjb25zdHJ1Y3QgdGhlIHdvcmtlclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGZuLnRvU3RyaW5nKCkucmVwbGFjZSgvXmZ1bmN0aW9uLis/ey8sICcnKS5zbGljZSgwLCAtMSksXG4gICAgICAgICAgICAgICAgb2JqVVJMID0gY3JlYXRlU291cmNlT2JqZWN0KHNvdXJjZSk7XG5cbiAgICAgICAgICAgIHRoaXNbVEFSR0VUXSA9IG5ldyBXb3JrZXIob2JqVVJMKTtcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqVVJMKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW1RBUkdFVF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc2VsZlNoaW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlOiBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5vbm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IG8ub25tZXNzYWdlKHsgZGF0YTogbSwgdGFyZ2V0OiBzZWxmU2hpbSB9KSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZuLmNhbGwoc2VsZlNoaW0pO1xuICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZSA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IHNlbGZTaGltLm9ubWVzc2FnZSh7IGRhdGE6IG0sIHRhcmdldDogbyB9KSB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmlzVGhpc1RocmVhZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuLy8gVGVzdCBXb3JrZXIgY2FwYWJpbGl0aWVzXG5pZiAoV29ya2VyKSB7XG4gICAgdmFyIHRlc3RXb3JrZXIsXG4gICAgICAgIG9ialVSTCA9IGNyZWF0ZVNvdXJjZU9iamVjdCgnc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7fScpLFxuICAgICAgICB0ZXN0QXJyYXkgPSBuZXcgVWludDhBcnJheSgxKTtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIE5vIHdvcmtlcnMgdmlhIGJsb2JzIGluIEVkZ2UgMTIgYW5kIElFIDExIGFuZCBsb3dlciA6KFxuICAgICAgICBpZiAoLyg/OlRyaWRlbnR8RWRnZSlcXC8oPzpbNTY3XXwxMikvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXN0V29ya2VyID0gbmV3IFdvcmtlcihvYmpVUkwpO1xuXG4gICAgICAgIC8vIE5hdGl2ZSBicm93c2VyIG9uIHNvbWUgU2Ftc3VuZyBkZXZpY2VzIHRocm93cyBmb3IgdHJhbnNmZXJhYmxlcywgbGV0J3MgZGV0ZWN0IGl0XG4gICAgICAgIHRlc3RXb3JrZXIucG9zdE1lc3NhZ2UodGVzdEFycmF5LCBbdGVzdEFycmF5LmJ1ZmZlcl0pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBXb3JrZXIgPSBudWxsO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmpVUkwpO1xuICAgICAgICBpZiAodGVzdFdvcmtlcikge1xuICAgICAgICAgICAgdGVzdFdvcmtlci50ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU291cmNlT2JqZWN0KHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtzdHJdLCB7IHR5cGU6IFNDUklQVF9UWVBFIH0pKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgICAgICAgYmxvYi5hcHBlbmQoc3RyKTtcbiAgICAgICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYi5nZXRCbG9iKHR5cGUpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc2hpbVdvcmtlciBmcm9tICdfX3Rvb2xzL3dvcmtlci1wbHVnaW5fXyc7XG5leHBvcnQgZGVmYXVsdCBuZXcgc2hpbVdvcmtlcihcIi4vd29ya2VyLmpzXCIsIGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XG52YXIgc2VsZiA9IHRoaXM7XG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgbW9kdWxlKSB7XG5cdHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcbn1cblxudmFyIHJ1bnRpbWUgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG4hZnVuY3Rpb24gKGdsb2JhbCkge1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4gIGlmIChydW50aW1lKSB7XG4gICAge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9IC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG5cblxuICAgIHJldHVybjtcbiAgfSAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuXG5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBtb2R1bGUuZXhwb3J0cztcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTsgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cblxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG5cbiAgcnVudGltZS53cmFwID0gd3JhcDsgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7IC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307IC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cblxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9IC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cblxuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcblxuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjsgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cblxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcblxuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9OyAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuXG5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfSAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuXG5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yOyAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cblxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSk7XG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH0gLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuXG5cbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcblxuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDsgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9IC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cblxuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuXG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7IC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cblxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYzsgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH0gLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuXG5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfSAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG5cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiOyAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBrZXlzLnJldmVyc2UoKTsgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG5cbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9IC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuXG5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuXG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfSAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG5cblxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7IC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uICh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiYgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9IC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuXG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSggLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbi8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbi8vIG9mIGluZGlyZWN0IGV2YWwgd2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kuXG5mdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzIHx8IHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGY7XG59KCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpKTtcbn0pO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzIHx8IHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGY7XG59KCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpOyAvLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cblxuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDsgLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7IC8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cblxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG52YXIgcnVudGltZU1vZHVsZSA9IHJ1bnRpbWU7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cblxudmFyIHJlZ2VuZXJhdG9yID0gcnVudGltZU1vZHVsZTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBfY2xhc3NDYWxsQ2hlY2s7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxudmFyIGNyZWF0ZUNsYXNzID0gX2NyZWF0ZUNsYXNzO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gX2RlZmluZVByb3BlcnR5O1xuXG52YXIgaSA9IDA7XG52YXIgQ01EID0ge1xuICBJTklUSUFMSVpFOiBpKyssXG4gIEZFRURCQUNLX0lOSVRJQUxJWkU6IGkrKyxcbiAgQ1JFQVRFX1JJR0lEQk9EWTogaSsrLFxuICBGRUVEQkFDS19SSUdJREJPRFk6IGkrKyxcbiAgUkVRVUVTVF9VUERBVEU6IGkrKyxcbiAgRkVFREJBQ0tfVVBEQVRFOiBpKytcbn07XG5cbnZhciBfdGVtcDtcbnZhciB0cmFuc2ZlcmFibGVNZXNzYWdlID0gc2VsZi53ZWJraXRQb3N0TWVzc2FnZSB8fCBzZWxmLnBvc3RNZXNzYWdlO1xudmFyIEFNTU8gPSBudWxsO1xudmFyIGR0ID0gMDtcbm5ldyAoX3RlbXAgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBbW1vQmFja2VuZCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQW1tb0JhY2tlbmQpO1xuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJib2RpZXNcIiwgW10pO1xuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJjYWNoZVwiLCB7XG4gICAgICBnZW9tZXRyaWVzOiB7fVxuICAgIH0pO1xuXG4gICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIGRhdGEgPSBfcmVmLmRhdGE7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgc3dpdGNoIChkYXRhWzBdIHx8IGRhdGEuY21kKSB7XG4gICAgICAgIGNhc2UgQ01ELklOSVRJQUxJWkU6XG4gICAgICAgICAgX3RoaXMuaW5pdGlhbGl6ZShkYXRhLmRhdGEucGF0aCk7XG5cbiAgICAgICAgICB0cmFuc2ZlcmFibGVNZXNzYWdlKHtcbiAgICAgICAgICAgIGNtZDogQ01ELkZFRURCQUNLX0lOSVRJQUxJWkVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIENNRC5SRVFVRVNUX1VQREFURTpcbiAgICAgICAgICBfdGhpcy51cGRhdGUoKTsgLy8gdHJhbnNmZXJhYmxlTWVzc2FnZSh0cnVlKTtcblxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDTUQuQ1JFQVRFX1JJR0lEQk9EWTpcbiAgICAgICAgICBfdGhpcy5jcmVhdGVSaWdpZEJvZHkoZGF0YS5kYXRhKTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKEFtbW9CYWNrZW5kLCBbe1xuICAgIGtleTogXCJpbml0aWFsaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRpYWxpemUoYW1tb1BhdGgpIHtcbiAgICAgIGltcG9ydFNjcmlwdHMoYW1tb1BhdGgpO1xuICAgICAgQU1NTyA9IEFtbW8oKTtcbiAgICAgIGNvbnNvbGUubG9nKCdBbW1vIGluaXRpYWxpemVkIScsIEFNTU8pO1xuICAgICAgdGhpcy5wcmVwYXJlU2V0dXAoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJlcGFyZVNldHVwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBhcmVTZXR1cCgpIHtcbiAgICAgIC8vIHRlbXAgdmFyaWFibGVzXG4gICAgICB0aGlzLnRtcFZlYzMgPSBuZXcgQU1NTy5idFZlY3RvcjMoKTtcbiAgICAgIHRoaXMuY29sbGlzaW9uQ29uZmlndXJhdGlvbiA9IG5ldyBBTU1PLmJ0RGVmYXVsdENvbGxpc2lvbkNvbmZpZ3VyYXRpb24oKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBBTU1PLmJ0Q29sbGlzaW9uRGlzcGF0Y2hlcih0aGlzLmNvbGxpc2lvbkNvbmZpZ3VyYXRpb24pO1xuICAgICAgdGhpcy5icm9hZHBoYXNlID0gbmV3IEFNTU8uYnREYnZ0QnJvYWRwaGFzZSgpO1xuICAgICAgdGhpcy5zb2x2ZXIgPSBuZXcgQU1NTy5idFNlcXVlbnRpYWxJbXB1bHNlQ29uc3RyYWludFNvbHZlcigpO1xuICAgICAgdGhpcy53b3JsZCA9IG5ldyBBTU1PLmJ0RGlzY3JldGVEeW5hbWljc1dvcmxkKHRoaXMuZGlzcGF0Y2hlciwgdGhpcy5icm9hZHBoYXNlLCB0aGlzLnNvbHZlciwgdGhpcy5jb2xsaXNpb25Db25maWd1cmF0aW9uKTtcbiAgICAgIHRoaXMud29ybGQuc2V0R3Jhdml0eShuZXcgQU1NTy5idFZlY3RvcjMoMCwgLTUsIDApKTsgLy8gVE9ETzogUmVtb3ZlXG4gICAgfSAvLyBrZXkgZXhhbXBsZTogYHBsYW5lLm5vcm1hbHsyNC41NDMsMjMuNTMsNTMuNH1gXG5cbiAgfSwge1xuICAgIGtleTogXCJzaGFwZUdlbmVyYXRvclwiLFxuICAgIHZhbHVlOlxuICAgIC8qI19fUFVSRV9fKi9cbiAgICByZWdlbmVyYXRvci5tYXJrKGZ1bmN0aW9uIHNoYXBlR2VuZXJhdG9yKF9yZWYyKSB7XG4gICAgICB2YXIgX3JlZjIkdHlwZSwgdHlwZSwgZGF0YSwgdmVjMztcblxuICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yLndyYXAoZnVuY3Rpb24gc2hhcGVHZW5lcmF0b3IkKF9jb250ZXh0KSB7XG4gICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBfcmVmMiR0eXBlID0gX3JlZjIudHlwZSwgdHlwZSA9IF9yZWYyJHR5cGUgPT09IHZvaWQgMCA/ICdib3gnIDogX3JlZjIkdHlwZSwgZGF0YSA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbXCJ0eXBlXCJdKTtcbiAgICAgICAgICAgICAgdmVjMyA9IHRoaXMudG1wVmVjMztcbiAgICAgICAgICAgICAgX2NvbnRleHQudDAgPSB0eXBlO1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gX2NvbnRleHQudDAgPT09ICdwbGFuZScgPyA1IDogX2NvbnRleHQudDAgPT09ICdzcGhlcmUnID8gMTIgOiBfY29udGV4dC50MCA9PT0gJ2JveCcgPyAxNiA6IDIzO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNztcbiAgICAgICAgICAgICAgcmV0dXJuIFN5bWJvbC5mb3IoXCJwbGFuZS5ub3JtYWx7XCIuY29uY2F0KGRhdGEubm9ybWFsLmpvaW4oJywnKSwgXCJ9XCIpKTtcblxuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICB2ZWMzLnNldFgoZGF0YS5ub3JtYWxbMF0pO1xuICAgICAgICAgICAgICB2ZWMzLnNldFkoZGF0YS5ub3JtYWxbMV0pO1xuICAgICAgICAgICAgICB2ZWMzLnNldFkoZGF0YS5ub3JtYWxbMl0pO1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgQU1NTy5idFN0YXRpY1BsYW5lU2hhcGUodmVjMyk7XG5cbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxNDtcbiAgICAgICAgICAgICAgcmV0dXJuIFN5bWJvbC5mb3IoXCJzcGhlcmUucmFkaXVze1wiLmNvbmNhdChkYXRhLnJhZGl1cywgXCJ9XCIpKTtcblxuICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE2O1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IEFNTU8uYnRTcGhlcmVTaGFwZShkYXRhLnJhZGl1cyk7XG5cbiAgICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxODtcbiAgICAgICAgICAgICAgcmV0dXJuIFN5bWJvbC5mb3IoXCJib3guc2l6ZXtcIi5jb25jYXQoZGF0YS5zaXplLmpvaW4oJywnKSwgXCJ9XCIpKTtcblxuICAgICAgICAgICAgY2FzZSAxODpcbiAgICAgICAgICAgICAgdmVjMy5zZXRYKGRhdGEuc2l6ZVswXSAvIDIpO1xuICAgICAgICAgICAgICB2ZWMzLnNldFkoZGF0YS5zaXplWzFdIC8gMik7XG4gICAgICAgICAgICAgIHZlYzMuc2V0WShkYXRhLnNpemVbMl0gLyAyKTtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDIzO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IEFNTU8uYnRCb3hTaGFwZSh2ZWMzKTtcblxuICAgICAgICAgICAgY2FzZSAyMzpcbiAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHNoYXBlR2VuZXJhdG9yLCB0aGlzKTtcbiAgICB9KVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZVNoYXBlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVNoYXBlKGJvZHlEYXRhKSB7XG4gICAgICB2YXIgc2hhcGVHZW5lcmF0b3IgPSB0aGlzLnNoYXBlR2VuZXJhdG9yKGJvZHlEYXRhKTtcbiAgICAgIHZhciBzaGFwZUtleSA9IHNoYXBlR2VuZXJhdG9yLm5leHQoKS52YWx1ZTtcblxuICAgICAgaWYgKHNoYXBlS2V5IGluIHRoaXMuY2FjaGUuZ2VvbWV0cmllcykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZW9tZXRyaWVzW3NoYXBlS2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNoYXBlR2VuZXJhdG9yLm5leHQoKS52YWx1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlQm9keVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVCb2R5KHNoYXBlLCBfcmVmMykge1xuICAgICAgdmFyIF9yZWYzJG1hc3MgPSBfcmVmMy5tYXNzLFxuICAgICAgICAgIG1hc3MgPSBfcmVmMyRtYXNzID09PSB2b2lkIDAgPyAxIDogX3JlZjMkbWFzcyxcbiAgICAgICAgICBfcmVmMyRwb3NpdGlvbiA9IF9yZWYzLnBvc2l0aW9uLFxuICAgICAgICAgIHBvc2l0aW9uID0gX3JlZjMkcG9zaXRpb24gPT09IHZvaWQgMCA/IFswLCAwLCAwXSA6IF9yZWYzJHBvc2l0aW9uLFxuICAgICAgICAgIF9yZWYzJHJlc3RpdHV0aW9uID0gX3JlZjMucmVzdGl0dXRpb24sXG4gICAgICAgICAgcmVzdGl0dXRpb24gPSBfcmVmMyRyZXN0aXR1dGlvbiA9PT0gdm9pZCAwID8gMCA6IF9yZWYzJHJlc3RpdHV0aW9uLFxuICAgICAgICAgIF9yZWYzJGZyaWN0aW9uID0gX3JlZjMuZnJpY3Rpb24sXG4gICAgICAgICAgZnJpY3Rpb24gPSBfcmVmMyRmcmljdGlvbiA9PT0gdm9pZCAwID8gMSA6IF9yZWYzJGZyaWN0aW9uLFxuICAgICAgICAgIF9yZWYzJGxpbmVhckRhbXBpbmcgPSBfcmVmMy5saW5lYXJEYW1waW5nLFxuICAgICAgICAgIGxpbmVhckRhbXBpbmcgPSBfcmVmMyRsaW5lYXJEYW1waW5nID09PSB2b2lkIDAgPyAwIDogX3JlZjMkbGluZWFyRGFtcGluZyxcbiAgICAgICAgICBfcmVmMyRhbmd1bGFyRGFtcGluZyA9IF9yZWYzLmFuZ3VsYXJEYW1waW5nLFxuICAgICAgICAgIGFuZ3VsYXJEYW1waW5nID0gX3JlZjMkYW5ndWxhckRhbXBpbmcgPT09IHZvaWQgMCA/IDAgOiBfcmVmMyRhbmd1bGFyRGFtcGluZztcbiAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybSA9IG5ldyBBTU1PLmJ0VHJhbnNmb3JtKCk7XG4gICAgICB0cmFuc2Zvcm0uc2V0SWRlbnRpdHkoKTtcbiAgICAgIHRyYW5zZm9ybS5zZXRPcmlnaW4obmV3IEFNTU8uYnRWZWN0b3IzKHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgcG9zaXRpb25bMl0pKTtcbiAgICAgIHZhciBsb2NhbEluZXJ0aWEgPSBuZXcgQU1NTy5idFZlY3RvcjMoMCwgMCwgMCk7XG4gICAgICBzaGFwZS5jYWxjdWxhdGVMb2NhbEluZXJ0aWEobWFzcywgbG9jYWxJbmVydGlhKTtcbiAgICAgIHZhciBtb3Rpb25TdGF0ZSA9IG5ldyBBTU1PLmJ0RGVmYXVsdE1vdGlvblN0YXRlKHRyYW5zZm9ybSk7XG4gICAgICB2YXIgcmJJbmZvID0gbmV3IEFNTU8uYnRSaWdpZEJvZHlDb25zdHJ1Y3Rpb25JbmZvKG1hc3MsIG1vdGlvblN0YXRlLCBzaGFwZSwgbG9jYWxJbmVydGlhKTtcbiAgICAgIHJiSW5mby5zZXRfbV9mcmljdGlvbihmcmljdGlvbik7XG4gICAgICBjb25zb2xlLmxvZygncmVzdGl0dXRpb24nLCByZXN0aXR1dGlvbik7XG4gICAgICByYkluZm8uc2V0X21fcmVzdGl0dXRpb24ocmVzdGl0dXRpb24pO1xuICAgICAgcmJJbmZvLnNldF9tX2xpbmVhckRhbXBpbmcobGluZWFyRGFtcGluZyk7XG4gICAgICByYkluZm8uc2V0X21fYW5ndWxhckRhbXBpbmcoYW5ndWxhckRhbXBpbmcpO1xuICAgICAgdmFyIGJvZHkgPSBuZXcgQU1NTy5idFJpZ2lkQm9keShyYkluZm8pO1xuICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZVJpZ2lkQm9keVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVSaWdpZEJvZHkoYm9keURhdGEpIHtcbiAgICAgIHZhciBzaGFwZSA9IHRoaXMuY3JlYXRlU2hhcGUoYm9keURhdGEpO1xuICAgICAgdmFyIGJvZHkgPSB0aGlzLmNyZWF0ZUJvZHkoc2hhcGUsIHtcbiAgICAgICAgbWFzczogdHlwZW9mIGJvZHlEYXRhLm1hc3MgPT09ICdudW1iZXInID8gYm9keURhdGEubWFzcyA6IDEsXG4gICAgICAgIHBvc2l0aW9uOiBib2R5RGF0YS5wb3NpdGlvbixcbiAgICAgICAgcmVzdGl0dXRpb246IGJvZHlEYXRhLnJlc3RpdHV0aW9uLFxuICAgICAgICBmcmljdGlvbjogYm9keURhdGEuZnJpY3Rpb24sXG4gICAgICAgIGxpbmVhckRhbXBpbmc6IGJvZHlEYXRhLmxpbmVhckRhbXBpbmcsXG4gICAgICAgIGFuZ3VsYXJEYW1waW5nOiBib2R5RGF0YS5hbmd1bGFyRGFtcGluZ1xuICAgICAgfSk7XG4gICAgICB0aGlzLndvcmxkLmFkZFJpZ2lkQm9keShib2R5KTtcbiAgICAgIHRoaXMuYm9kaWVzLnB1c2goYm9keSk7XG4gICAgICB0cmFuc2ZlcmFibGVNZXNzYWdlKHtcbiAgICAgICAgY21kOiBDTUQuRkVFREJBQ0tfUklHSURCT0RZLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgaW5kZXg6IGJvZHlEYXRhLmluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVSaWdpZEJvZGllc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVSaWdpZEJvZGllcyhhcnJheSwgaW5pdGlhbE9mZnNldCkge1xuICAgICAgdmFyIG51bWJvZGllcyA9IHRoaXMuYm9kaWVzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKG51bWJvZGllcy0tKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSBudW1ib2RpZXMgKiA3ICsgaW5pdGlhbE9mZnNldDtcbiAgICAgICAgdGhpcy5ib2RpZXNbbnVtYm9kaWVzXS5nZXRNb3Rpb25TdGF0ZSgpLmdldFdvcmxkVHJhbnNmb3JtKHRoaXMudHJhbnNmb3JtKTtcbiAgICAgICAgdmFyIG9yaWdpbiA9IHRoaXMudHJhbnNmb3JtLmdldE9yaWdpbigpO1xuICAgICAgICB2YXIgcm90YXRpb24gPSB0aGlzLnRyYW5zZm9ybS5nZXRSb3RhdGlvbigpO1xuICAgICAgICBhcnJheVtvZmZzZXRdID0gb3JpZ2luLngoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgMV0gPSBvcmlnaW4ueSgpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyAyXSA9IG9yaWdpbi56KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDNdID0gcm90YXRpb24ueCgpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyA0XSA9IHJvdGF0aW9uLnkoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgNV0gPSByb3RhdGlvbi56KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDZdID0gcm90YXRpb24udygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaW11bGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaW11bGF0ZSgpIHtcbiAgICAgIHRoaXMud29ybGQuc3RlcFNpbXVsYXRpb24oZHQrKywgMik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDEgKyB0aGlzLmJvZGllcy5sZW5ndGggKiA3KTtcbiAgICAgIGFycmF5WzBdID0gQ01ELkZFRURCQUNLX1VQREFURTtcbiAgICAgIHRoaXMuc2ltdWxhdGUoKTtcbiAgICAgIHRoaXMudXBkYXRlUmlnaWRCb2RpZXMoYXJyYXksIDEpO1xuICAgICAgdHJhbnNmZXJhYmxlTWVzc2FnZShhcnJheSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFtbW9CYWNrZW5kO1xufSgpLCBfdGVtcCkoKTtcblxuXG59KTsiLCJpbXBvcnQgQW1tb1dvcmtlciBmcm9tICd3b3JrZXIhLi93b3JrZXIuanMnO1xuaW1wb3J0IENNRCBmcm9tICcuLi9jb21tYW5kcyc7XG5cbmV4cG9ydCBjbGFzcyBBbW1vRW5naW5lIHtcbiAgc3RhdGljIENNRCA9IENNRDtcbiAgc3RhdGljIEFycmF5QnVmZmVyID0gU2hhcmVkQXJyYXlCdWZmZXIgfHwgQXJyYXlCdWZmZXI7XG4gIGlzU2hhcmVkID0gQW1tb0VuZ2luZS5BcnJheUJ1ZmZlciBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLndvcmtlciA9IG5ldyBBbW1vV29ya2VyKCk7XG4gICAgdGhpcy53b3JrZXIudHJhbnNmZXJhYmxlTWVzc2FnZSA9IHRoaXMud29ya2VyLndlYmtpdFBvc3RNZXNzYWdlIHx8IHRoaXMud29ya2VyLnBvc3RNZXNzYWdlO1xuICAgIHRoaXMuc2VuZChDTUQuSU5JVElBTElaRSwgb3B0aW9ucyk7XG4gIH1cblxuICBzZW5kKGNtZCwgZGF0YSkge1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2Uoe2NtZCwgZGF0YX0pO1xuICB9XG5cbiAgc2VuZEJ1ZmZlcihjb21tYW5kLCBkYXRhID0gW10pIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlciA9IG5ldyBBbW1vRW5naW5lLkFycmF5QnVmZmVyKEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIChkYXRhLmxlbmd0aCArIDEpKTtcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlcik7XG4gICAgYXJyYXlbMF0gPSBjb21tYW5kO1xuXG4gICAgYXJyYXkuc2V0KGRhdGEsIDEpO1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UoYXJyYXksIGJ1ZmZlcik7XG4gIH1cblxuICByZXF1ZXN0VXBkYXRlKCkge1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2Uoe2NtZDogQ01ELlJFUVVFU1RfVVBEQVRFfSk7XG4gIH1cblxuICBsaXN0ZW4oY2FsbGJhY2spIHtcbiAgICB0aGlzLndvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgY2FsbGJhY2spO1xuICB9XG59XG4iXSwibmFtZXMiOlsiaSIsIklOSVRJQUxJWkUiLCJGRUVEQkFDS19JTklUSUFMSVpFIiwiQ1JFQVRFX1JJR0lEQk9EWSIsIkZFRURCQUNLX1JJR0lEQk9EWSIsIlJFUVVFU1RfVVBEQVRFIiwiRkVFREJBQ0tfVVBEQVRFIiwiV29ybGRNb2R1bGUiLCJvcHRpb25zIiwiY2hpbGQiLCJjb21wb25lbnQiLCJtYW5hZ2VyIiwiaW5kZXgiLCJib2R5SW5kZXgiLCJwaHlzaWNzIiwiY3JlYXRlUGh5c2ljcyIsImJvZGllcyIsImVuZ2luZSIsInNlbmQiLCJDTUQiLCJkYXRhIiwic2ltdWxhdGUiLCJhcHAiLCJzaW11bGF0ZUxvb3AiLCJsb29wIiwicmVxdWVzdFVwZGF0ZSIsImxpc3RlbiIsImNtZCIsImFjdGl2ZSIsInByb2Nlc3NVcGRhdGVGZWVkYmFjayIsImFycmF5IiwibnVtYm9kaWVzIiwib2Zmc2V0IiwiYm9keSIsIm5hdGl2ZSIsInBvc2l0aW9uIiwieCIsInkiLCJ6IiwicXVhdGVybmlvbiIsInciLCJjb21wdXRlU3BoZXJlT3B0aW9ucyIsImdlb21ldHJ5IiwiY29tcHV0ZUJvdW5kaW5nU3BoZXJlIiwicmFkaXVzIiwiYm91bmRpbmdTcGhlcmUiLCJjb21wdXRlQm94T3B0aW9ucyIsImNvbXB1dGVCb3VuZGluZ0JveCIsInNpemUiLCJib3VuZGluZ0JveCIsImdldFNpemUiLCJ0b0FycmF5IiwiUmlnaWRib2R5TW9kdWxlIiwidHlwZSIsImNvbXB1dGUiLCJCb29sZWFuIiwid29ybGRNb2R1bGUiLCJtYXNzIiwicmVzdGl0dXRpb24iLCJmcmljdGlvbiIsImxpbmVhckRhbXBpbmciLCJhbmd1bGFyRGFtcGluZyIsImNvbXB1dGVEYXRhIiwiVEFSR0VUIiwiU3ltYm9sIiwiU0NSSVBUX1RZUEUiLCJCbG9iQnVpbGRlciIsIndpbmRvdyIsIldlYktpdEJsb2JCdWlsZGVyIiwiTW96QmxvYkJ1aWxkZXIiLCJNU0Jsb2JCdWlsZGVyIiwiVVJMIiwid2Via2l0VVJMIiwiV29ya2VyIiwic2hpbVdvcmtlciIsImZpbGVuYW1lIiwiZm4iLCJTaGltV29ya2VyIiwiZm9yY2VGYWxsYmFjayIsIm8iLCJzb3VyY2UiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJzbGljZSIsIm9ialVSTCIsImNyZWF0ZVNvdXJjZU9iamVjdCIsInJldm9rZU9iamVjdFVSTCIsInNlbGZTaGltIiwicG9zdE1lc3NhZ2UiLCJtIiwib25tZXNzYWdlIiwic2V0VGltZW91dCIsInRhcmdldCIsImNhbGwiLCJpc1RoaXNUaHJlYWQiLCJ0ZXN0V29ya2VyIiwidGVzdEFycmF5IiwiVWludDhBcnJheSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJFcnJvciIsImJ1ZmZlciIsImUiLCJ0ZXJtaW5hdGUiLCJzdHIiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiYmxvYiIsImFwcGVuZCIsImdldEJsb2IiLCJkb2N1bWVudCIsInNlbGYiLCJjcmVhdGVDb21tb25qc01vZHVsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJydW50aW1lIiwiZ2xvYmFsIiwiT3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsInVuZGVmaW5lZCIsIiRTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwicmVnZW5lcmF0b3JSdW50aW1lIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsIm9iaiIsImFyZyIsImVyciIsIkdlblN0YXRlU3VzcGVuZGVkU3RhcnQiLCJHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkIiwiR2VuU3RhdGVFeGVjdXRpbmciLCJHZW5TdGF0ZUNvbXBsZXRlZCIsIkNvbnRpbnVlU2VudGluZWwiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJnZXRQcm90byIsImdldFByb3RvdHlwZU9mIiwiTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUiLCJ2YWx1ZXMiLCJHcCIsImNvbnN0cnVjdG9yIiwiZGlzcGxheU5hbWUiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImdlbkZ1biIsImN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJfX2F3YWl0IiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJ2YWx1ZSIsIl90eXBlb2YiLCJQcm9taXNlIiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiZW5xdWV1ZSIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiYXN5bmMiLCJpdGVyIiwibmV4dCIsImRvbmUiLCJzdGF0ZSIsImRvbmVSZXN1bHQiLCJkZWxlZ2F0ZSIsImRlbGVnYXRlUmVzdWx0IiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwicmV0dXJuIiwiVHlwZUVycm9yIiwiaW5mbyIsInJlc3VsdE5hbWUiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwibG9jcyIsImVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJrZXlzIiwib2JqZWN0Iiwia2V5IiwicmV2ZXJzZSIsImxlbmd0aCIsInBvcCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsInNraXBUZW1wUmVzZXQiLCJwcmV2IiwiY2hhckF0Iiwic3RvcCIsInJvb3RFbnRyeSIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJ0aHJvd24iLCJkZWxlZ2F0ZVlpZWxkIiwiRnVuY3Rpb24iLCJnIiwiaGFkUnVudGltZSIsImdldE93blByb3BlcnR5TmFtZXMiLCJpbmRleE9mIiwib2xkUnVudGltZSIsInJ1bnRpbWVNb2R1bGUiLCJyZWdlbmVyYXRvciIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwiZXhjbHVkZWQiLCJzb3VyY2VLZXlzIiwib2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsInNvdXJjZVN5bWJvbEtleXMiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIm9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsImNsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsImNyZWF0ZUNsYXNzIiwiX2RlZmluZVByb3BlcnR5IiwiX3RlbXAiLCJ0cmFuc2ZlcmFibGVNZXNzYWdlIiwid2Via2l0UG9zdE1lc3NhZ2UiLCJBTU1PIiwiZHQiLCJBbW1vQmFja2VuZCIsIl90aGlzIiwiZ2VvbWV0cmllcyIsIl9yZWYiLCJpbml0aWFsaXplIiwicGF0aCIsInVwZGF0ZSIsImNyZWF0ZVJpZ2lkQm9keSIsImFtbW9QYXRoIiwiaW1wb3J0U2NyaXB0cyIsIkFtbW8iLCJjb25zb2xlIiwibG9nIiwicHJlcGFyZVNldHVwIiwidG1wVmVjMyIsImJ0VmVjdG9yMyIsImNvbGxpc2lvbkNvbmZpZ3VyYXRpb24iLCJidERlZmF1bHRDb2xsaXNpb25Db25maWd1cmF0aW9uIiwiZGlzcGF0Y2hlciIsImJ0Q29sbGlzaW9uRGlzcGF0Y2hlciIsImJyb2FkcGhhc2UiLCJidERidnRCcm9hZHBoYXNlIiwic29sdmVyIiwiYnRTZXF1ZW50aWFsSW1wdWxzZUNvbnN0cmFpbnRTb2x2ZXIiLCJ3b3JsZCIsImJ0RGlzY3JldGVEeW5hbWljc1dvcmxkIiwic2V0R3Jhdml0eSIsInNoYXBlR2VuZXJhdG9yIiwiX3JlZjIiLCJfcmVmMiR0eXBlIiwidmVjMyIsInNoYXBlR2VuZXJhdG9yJCIsIl9jb250ZXh0IiwidDAiLCJmb3IiLCJjb25jYXQiLCJub3JtYWwiLCJqb2luIiwic2V0WCIsInNldFkiLCJidFN0YXRpY1BsYW5lU2hhcGUiLCJidFNwaGVyZVNoYXBlIiwiYnRCb3hTaGFwZSIsImNyZWF0ZVNoYXBlIiwiYm9keURhdGEiLCJzaGFwZUtleSIsImNhY2hlIiwiY3JlYXRlQm9keSIsInNoYXBlIiwiX3JlZjMiLCJfcmVmMyRtYXNzIiwiX3JlZjMkcG9zaXRpb24iLCJfcmVmMyRyZXN0aXR1dGlvbiIsIl9yZWYzJGZyaWN0aW9uIiwiX3JlZjMkbGluZWFyRGFtcGluZyIsIl9yZWYzJGFuZ3VsYXJEYW1waW5nIiwidHJhbnNmb3JtIiwiYnRUcmFuc2Zvcm0iLCJzZXRJZGVudGl0eSIsInNldE9yaWdpbiIsImxvY2FsSW5lcnRpYSIsImNhbGN1bGF0ZUxvY2FsSW5lcnRpYSIsIm1vdGlvblN0YXRlIiwiYnREZWZhdWx0TW90aW9uU3RhdGUiLCJyYkluZm8iLCJidFJpZ2lkQm9keUNvbnN0cnVjdGlvbkluZm8iLCJzZXRfbV9mcmljdGlvbiIsInNldF9tX3Jlc3RpdHV0aW9uIiwic2V0X21fbGluZWFyRGFtcGluZyIsInNldF9tX2FuZ3VsYXJEYW1waW5nIiwiYnRSaWdpZEJvZHkiLCJhZGRSaWdpZEJvZHkiLCJ1cGRhdGVSaWdpZEJvZGllcyIsImluaXRpYWxPZmZzZXQiLCJnZXRNb3Rpb25TdGF0ZSIsImdldFdvcmxkVHJhbnNmb3JtIiwib3JpZ2luIiwiZ2V0T3JpZ2luIiwicm90YXRpb24iLCJnZXRSb3RhdGlvbiIsInN0ZXBTaW11bGF0aW9uIiwiRmxvYXQzMkFycmF5IiwiQW1tb0VuZ2luZSIsIkFycmF5QnVmZmVyIiwiU2hhcmVkQXJyYXlCdWZmZXIiLCJ3b3JrZXIiLCJBbW1vV29ya2VyIiwiY29tbWFuZCIsIkJZVEVTX1BFUl9FTEVNRU5UIiwic2V0IiwiY2FsbGJhY2siLCJh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
