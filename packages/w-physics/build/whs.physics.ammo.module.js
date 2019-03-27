/* WhitestormJS Physics v3.0.0-dev.10 */
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

export { WorldModule, RigidbodyModule, AmmoEngine };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLnBoeXNpY3MuYW1tby5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uL3NyYy9lbmdpbmVzL2NvbW1hbmRzLmpzIiwiLi4vc3JjL21vZHVsZXMvV29ybGRNb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXMuanMiLCIuLi9zcmMvbW9kdWxlcy9SaWdpZGJvZHlNb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCIuLi90b29scy93b3JrZXItcGx1Z2luL3dvcmtlcmhlbHBlci5qcyIsIi4uL3NyYy9lbmdpbmVzL2FtbW9qcy93b3JrZXIuanMiLCIuLi9zcmMvZW5naW5lcy9hbW1vanMvQW1tb0VuZ2luZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJsZXQgaSA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSU5JVElBTElaRTogaSsrLFxuICBGRUVEQkFDS19JTklUSUFMSVpFOiBpKyssXG4gIENSRUFURV9SSUdJREJPRFk6IGkrKyxcbiAgRkVFREJBQ0tfUklHSURCT0RZOiBpKyssXG4gIFJFUVVFU1RfVVBEQVRFOiBpKyssXG4gIEZFRURCQUNLX1VQREFURTogaSsrXG59O1xuIiwiaW1wb3J0IENNRCBmcm9tICcuLi9lbmdpbmVzL2NvbW1hbmRzJztcblxuZXhwb3J0IGNsYXNzIFdvcmxkTW9kdWxlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZW5naW5lID0gb3B0aW9ucy5lbmdpbmU7XG4gICAgdGhpcy5ib2RpZXMgPSB7fTtcbiAgICB0aGlzLmJvZHlJbmRleCA9IDA7XG4gICAgdGhpcy5zaW11bGF0ZSA9IGZhbHNlO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLnNpbXVsYXRlTG9vcCA9IGFwcC5sb29wKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zaW11bGF0ZSkgcmV0dXJuO1xuICAgICAgdGhpcy5lbmdpbmUucmVxdWVzdFVwZGF0ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbmdpbmUubGlzdGVuKCh7ZGF0YX0pID0+IHtcbiAgICAgIHN3aXRjaCAoZGF0YVswXSB8fCBkYXRhLmNtZCkge1xuICAgICAgICBjYXNlIENNRC5GRUVEQkFDS19JTklUSUFMSVpFOlxuICAgICAgICAgIHRoaXMuc2ltdWxhdGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENNRC5GRUVEQkFDS19SSUdJREJPRFk6XG4gICAgICAgICAgY29uc3QgcGh5c2ljcyA9IHRoaXMuYm9kaWVzW2RhdGEuZGF0YS5pbmRleF07XG4gICAgICAgICAgcGh5c2ljcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENNRC5GRUVEQkFDS19VUERBVEU6XG4gICAgICAgICAgdGhpcy5wcm9jZXNzVXBkYXRlRmVlZGJhY2soZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJvY2Vzc1VwZGF0ZUZlZWRiYWNrKGFycmF5KSB7XG4gICAgY29uc3QgYm9kaWVzID0gdGhpcy5ib2RpZXM7XG4gICAgbGV0IG51bWJvZGllcyA9IHRoaXMuYm9keUluZGV4O1xuXG4gICAgd2hpbGUobnVtYm9kaWVzLS0pIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IDEgKyBudW1ib2RpZXMgKiA3O1xuICAgICAgY29uc3QgYm9keSA9IGJvZGllc1tudW1ib2RpZXNdLmNvbXBvbmVudC5uYXRpdmU7XG5cbiAgICAgIGJvZHkucG9zaXRpb24ueCA9IGFycmF5W29mZnNldF07XG4gICAgICBib2R5LnBvc2l0aW9uLnkgPSBhcnJheVtvZmZzZXQgKyAxXTtcbiAgICAgIGJvZHkucG9zaXRpb24ueiA9IGFycmF5W29mZnNldCArIDJdO1xuXG4gICAgICBib2R5LnF1YXRlcm5pb24ueCA9IGFycmF5W29mZnNldCArIDNdO1xuICAgICAgYm9keS5xdWF0ZXJuaW9uLnkgPSBhcnJheVtvZmZzZXQgKyA0XTtcbiAgICAgIGJvZHkucXVhdGVybmlvbi56ID0gYXJyYXlbb2Zmc2V0ICsgNV07XG4gICAgICBib2R5LnF1YXRlcm5pb24udyA9IGFycmF5W29mZnNldCArIDZdO1xuICAgIH1cbiAgfVxuXG4gIGJyaWRnZXMgPSB7XG4gICAgY2hpbGQ6IChjb21wb25lbnQpID0+IHtcbiAgICAgIGlmIChjb21wb25lbnQubWFuYWdlciAmJiAnY3JlYXRlUGh5c2ljcycgaW4gY29tcG9uZW50Lm1hbmFnZXIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJvZHlJbmRleCsrO1xuICAgICAgICBjb25zdCBwaHlzaWNzID0gY29tcG9uZW50Lm1hbmFnZXIuY3JlYXRlUGh5c2ljcyh0aGlzLCBpbmRleCk7XG4gICAgICAgIHRoaXMuYm9kaWVzW2luZGV4XSA9IHBoeXNpY3M7XG4gICAgICAgIHRoaXMuZW5naW5lLnNlbmQoQ01ELkNSRUFURV9SSUdJREJPRFksIHBoeXNpY3MuZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImZ1bmN0aW9uIGNvbXB1dGVTcGhlcmVPcHRpb25zKGdlb21ldHJ5LCBvcHRpb25zKSB7XG4gIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuXG4gIHJldHVybiB7XG4gICAgcmFkaXVzOiBvcHRpb25zLnJhZGl1cyB8fCBnZW9tZXRyeS5ib3VuZGluZ1NwaGVyZS5yYWRpdXNcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNvbXB1dGVCb3hPcHRpb25zKGdlb21ldHJ5LCBvcHRpb25zKSB7XG4gIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuXG4gIHJldHVybiB7XG4gICAgc2l6ZTogb3B0aW9ucy5zaXplIHx8IGdlb21ldHJ5LmJvdW5kaW5nQm94LmdldFNpemUoKS50b0FycmF5KClcbiAgfTtcbn07XG5cbmV4cG9ydCBjbGFzcyBSaWdpZGJvZHlNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih7dHlwZSA9ICdzcGhlcmUnLCBjb21wdXRlLCAuLi5vcHRpb25zfSA9IHt0eXBlOiAnc3BoZXJlJywgY29tcHV0ZTogdHJ1ZX0pIHtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuY29tcHV0ZSA9IEJvb2xlYW4oY29tcHV0ZSk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldHVwKGNvbXBvbmVudCwge21hbmFnZXJ9KSB7XG4gICAgbWFuYWdlci5jcmVhdGVQaHlzaWNzID0gKHdvcmxkTW9kdWxlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qge3Bvc2l0aW9uLCBxdWF0ZXJuaW9ufSA9IGNvbXBvbmVudC5uYXRpdmU7XG5cbiAgICAgIG1hbmFnZXIucGh5c2ljcyA9IHtcbiAgICAgICAgZW5naW5lOiB3b3JsZE1vZHVsZS5lbmdpbmUsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLnRvQXJyYXkoKSxcbiAgICAgICAgICBxdWF0ZXJuaW9uOiBxdWF0ZXJuaW9uLnRvQXJyYXkoKSxcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBtYXNzOiB0aGlzLm9wdGlvbnMubWFzcyxcbiAgICAgICAgICByZXN0aXR1dGlvbjogdGhpcy5vcHRpb25zLnJlc3RpdHV0aW9uLFxuICAgICAgICAgIGZyaWN0aW9uOiB0aGlzLm9wdGlvbnMuZnJpY3Rpb24sXG4gICAgICAgICAgbGluZWFyRGFtcGluZzogdGhpcy5vcHRpb25zLmxpbmVhckRhbXBpbmcsXG4gICAgICAgICAgYW5ndWxhckRhbXBpbmc6IHRoaXMub3B0aW9ucy5hbmd1bGFyRGFtcGluZyxcbiAgICAgICAgICAuLi50aGlzLmNvbXB1dGVEYXRhKHRoaXMudHlwZSwgY29tcG9uZW50Lm5hdGl2ZS5nZW9tZXRyeSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbWFuYWdlci5waHlzaWNzO1xuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVEYXRhKHR5cGUsIGdlb21ldHJ5KSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzcGhlcmUnOlxuICAgICAgICByZXR1cm4gY29tcHV0ZVNwaGVyZU9wdGlvbnMoZ2VvbWV0cnksIHRoaXMub3B0aW9ucyk7XG4gICAgICBjYXNlICdib3gnOlxuICAgICAgICByZXR1cm4gY29tcHV0ZUJveE9wdGlvbnMoZ2VvbWV0cnksIHRoaXMub3B0aW9ucyk7XG4gICAgICBkZWZhdWx0OlxuXG4gICAgfVxuICB9XG59XG4iLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJ2YXIgVEFSR0VUID0gdHlwZW9mIFN5bWJvbCA9PT0gJ3VuZGVmaW5lZCcgPyAnX190YXJnZXQnIDogU3ltYm9sKCksXG4gICAgU0NSSVBUX1RZUEUgPSAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcsXG4gICAgQmxvYkJ1aWxkZXIgPSB3aW5kb3cuQmxvYkJ1aWxkZXIgfHwgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8IHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlcixcbiAgICBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwsXG4gICAgV29ya2VyID0gd2luZG93LldvcmtlcjtcblxuLyoqXG4gKiBSZXR1cm5zIGEgd3JhcHBlciBhcm91bmQgV2ViIFdvcmtlciBjb2RlIHRoYXQgaXMgY29uc3RydWN0aWJsZS5cbiAqXG4gKiBAZnVuY3Rpb24gc2hpbVdvcmtlclxuICpcbiAqIEBwYXJhbSB7IFN0cmluZyB9ICAgIGZpbGVuYW1lICAgIFRoZSBuYW1lIG9mIHRoZSBmaWxlXG4gKiBAcGFyYW0geyBGdW5jdGlvbiB9ICBmbiAgICAgICAgICBGdW5jdGlvbiB3cmFwcGluZyB0aGUgY29kZSBvZiB0aGUgd29ya2VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaW1Xb3JrZXIgKGZpbGVuYW1lLCBmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBTaGltV29ya2VyIChmb3JjZUZhbGxiYWNrKSB7XG4gICAgICAgIHZhciBvID0gdGhpcztcblxuICAgICAgICBpZiAoIWZuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdvcmtlcihmaWxlbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoV29ya2VyICYmICFmb3JjZUZhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBmdW5jdGlvbidzIGlubmVyIGNvZGUgdG8gYSBzdHJpbmcgdG8gY29uc3RydWN0IHRoZSB3b3JrZXJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBmbi50b1N0cmluZygpLnJlcGxhY2UoL15mdW5jdGlvbi4rP3svLCAnJykuc2xpY2UoMCwgLTEpLFxuICAgICAgICAgICAgICAgIG9ialVSTCA9IGNyZWF0ZVNvdXJjZU9iamVjdChzb3VyY2UpO1xuXG4gICAgICAgICAgICB0aGlzW1RBUkdFVF0gPSBuZXcgV29ya2VyKG9ialVSTCk7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9ialVSTCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tUQVJHRVRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHNlbGZTaGltID0ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZTogZnVuY3Rpb24obSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ub25tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBvLm9ubWVzc2FnZSh7IGRhdGE6IG0sIHRhcmdldDogc2VsZlNoaW0gfSkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmbi5jYWxsKHNlbGZTaGltKTtcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UgPSBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBzZWxmU2hpbS5vbm1lc3NhZ2UoeyBkYXRhOiBtLCB0YXJnZXQ6IG8gfSkgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5pc1RoaXNUaHJlYWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8vIFRlc3QgV29ya2VyIGNhcGFiaWxpdGllc1xuaWYgKFdvcmtlcikge1xuICAgIHZhciB0ZXN0V29ya2VyLFxuICAgICAgICBvYmpVUkwgPSBjcmVhdGVTb3VyY2VPYmplY3QoJ3NlbGYub25tZXNzYWdlID0gZnVuY3Rpb24gKCkge30nKSxcbiAgICAgICAgdGVzdEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBObyB3b3JrZXJzIHZpYSBibG9icyBpbiBFZGdlIDEyIGFuZCBJRSAxMSBhbmQgbG93ZXIgOihcbiAgICAgICAgaWYgKC8oPzpUcmlkZW50fEVkZ2UpXFwvKD86WzU2N118MTIpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYXZhaWxhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGVzdFdvcmtlciA9IG5ldyBXb3JrZXIob2JqVVJMKTtcblxuICAgICAgICAvLyBOYXRpdmUgYnJvd3NlciBvbiBzb21lIFNhbXN1bmcgZGV2aWNlcyB0aHJvd3MgZm9yIHRyYW5zZmVyYWJsZXMsIGxldCdzIGRldGVjdCBpdFxuICAgICAgICB0ZXN0V29ya2VyLnBvc3RNZXNzYWdlKHRlc3RBcnJheSwgW3Rlc3RBcnJheS5idWZmZXJdKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgV29ya2VyID0gbnVsbDtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqVVJMKTtcbiAgICAgICAgaWYgKHRlc3RXb3JrZXIpIHtcbiAgICAgICAgICAgIHRlc3RXb3JrZXIudGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNvdXJjZU9iamVjdChzdHIpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbc3RyXSwgeyB0eXBlOiBTQ1JJUFRfVFlQRSB9KSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2JCdWlsZGVyKCk7XG4gICAgICAgIGJsb2IuYXBwZW5kKHN0cik7XG4gICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IuZ2V0QmxvYih0eXBlKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHNoaW1Xb3JrZXIgZnJvbSAnX190b29scy93b3JrZXItcGx1Z2luX18nO1xuZXhwb3J0IGRlZmF1bHQgbmV3IHNoaW1Xb3JrZXIoXCIuL3dvcmtlci5qc1wiLCBmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xudmFyIHNlbGYgPSB0aGlzO1xuZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRyZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7XG59XG5cbnZhciBydW50aW1lID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSkge1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuIWZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuICBpZiAocnVudGltZSkge1xuICAgIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfSAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuXG5cbiAgICByZXR1cm47XG4gIH0gLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cblxuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7IC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuXG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7IC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cblxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiOyAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cblxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9OyAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fSAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG5cblxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG5cbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID0gR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7IC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG5cbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTsgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cblxuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fYXdhaXQ6IGFyZ1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH0gLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cblxuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcnVudGltZS5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjsgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkpO1xuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9IC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcblxuXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7IC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG5cblxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcblxuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlOyAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7IC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9IC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cblxuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH0gLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuXG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjsgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAga2V5cy5yZXZlcnNlKCk7IC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuXG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cblxuXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH0gLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cblxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwOyAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cblxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJiAodHlwZSA9PT0gXCJicmVha1wiIHx8IHR5cGUgPT09IFwiY29udGludWVcIikgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cblxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiAoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0oIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4vLyBGdW5jdGlvbiBjb25zdHJ1Y3RvciBpZiB3ZSdyZSBpbiBnbG9iYWwgc3RyaWN0IG1vZGUuIFRoYXQgaXMgc2FkbHkgYSBmb3JtXG4vLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcyB8fCB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmO1xufSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSk7XG59KTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcyB8fCB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmO1xufSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTsgLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG5cblxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7IC8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cblxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lOyAvLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xudmFyIHJ1bnRpbWVNb2R1bGUgPSBydW50aW1lO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG5cbnZhciByZWdlbmVyYXRvciA9IHJ1bnRpbWVNb2R1bGU7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG52YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gX2NsYXNzQ2FsbENoZWNrO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbnZhciBjcmVhdGVDbGFzcyA9IF9jcmVhdGVDbGFzcztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IF9kZWZpbmVQcm9wZXJ0eTtcblxudmFyIGkgPSAwO1xudmFyIENNRCA9IHtcbiAgSU5JVElBTElaRTogaSsrLFxuICBGRUVEQkFDS19JTklUSUFMSVpFOiBpKyssXG4gIENSRUFURV9SSUdJREJPRFk6IGkrKyxcbiAgRkVFREJBQ0tfUklHSURCT0RZOiBpKyssXG4gIFJFUVVFU1RfVVBEQVRFOiBpKyssXG4gIEZFRURCQUNLX1VQREFURTogaSsrXG59O1xuXG52YXIgX3RlbXA7XG52YXIgdHJhbnNmZXJhYmxlTWVzc2FnZSA9IHNlbGYud2Via2l0UG9zdE1lc3NhZ2UgfHwgc2VsZi5wb3N0TWVzc2FnZTtcbnZhciBBTU1PID0gbnVsbDtcbnZhciBkdCA9IDA7XG5uZXcgKF90ZW1wID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQW1tb0JhY2tlbmQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEFtbW9CYWNrZW5kKTtcblxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiYm9kaWVzXCIsIFtdKTtcblxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiY2FjaGVcIiwge1xuICAgICAgZ2VvbWV0cmllczoge31cbiAgICB9KTtcblxuICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgIHZhciBkYXRhID0gX3JlZi5kYXRhO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHN3aXRjaCAoZGF0YVswXSB8fCBkYXRhLmNtZCkge1xuICAgICAgICBjYXNlIENNRC5JTklUSUFMSVpFOlxuICAgICAgICAgIF90aGlzLmluaXRpYWxpemUoZGF0YS5kYXRhLnBhdGgpO1xuXG4gICAgICAgICAgdHJhbnNmZXJhYmxlTWVzc2FnZSh7XG4gICAgICAgICAgICBjbWQ6IENNRC5GRUVEQkFDS19JTklUSUFMSVpFXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDTUQuUkVRVUVTVF9VUERBVEU6XG4gICAgICAgICAgX3RoaXMudXBkYXRlKCk7IC8vIHRyYW5zZmVyYWJsZU1lc3NhZ2UodHJ1ZSk7XG5cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQ01ELkNSRUFURV9SSUdJREJPRFk6XG4gICAgICAgICAgX3RoaXMuY3JlYXRlUmlnaWRCb2R5KGRhdGEuZGF0YSk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjcmVhdGVDbGFzcyhBbW1vQmFja2VuZCwgW3tcbiAgICBrZXk6IFwiaW5pdGlhbGl6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0aWFsaXplKGFtbW9QYXRoKSB7XG4gICAgICBpbXBvcnRTY3JpcHRzKGFtbW9QYXRoKTtcbiAgICAgIEFNTU8gPSBBbW1vKCk7XG4gICAgICBjb25zb2xlLmxvZygnQW1tbyBpbml0aWFsaXplZCEnLCBBTU1PKTtcbiAgICAgIHRoaXMucHJlcGFyZVNldHVwKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByZXBhcmVTZXR1cFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlU2V0dXAoKSB7XG4gICAgICAvLyB0ZW1wIHZhcmlhYmxlc1xuICAgICAgdGhpcy50bXBWZWMzID0gbmV3IEFNTU8uYnRWZWN0b3IzKCk7XG4gICAgICB0aGlzLmNvbGxpc2lvbkNvbmZpZ3VyYXRpb24gPSBuZXcgQU1NTy5idERlZmF1bHRDb2xsaXNpb25Db25maWd1cmF0aW9uKCk7XG4gICAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgQU1NTy5idENvbGxpc2lvbkRpc3BhdGNoZXIodGhpcy5jb2xsaXNpb25Db25maWd1cmF0aW9uKTtcbiAgICAgIHRoaXMuYnJvYWRwaGFzZSA9IG5ldyBBTU1PLmJ0RGJ2dEJyb2FkcGhhc2UoKTtcbiAgICAgIHRoaXMuc29sdmVyID0gbmV3IEFNTU8uYnRTZXF1ZW50aWFsSW1wdWxzZUNvbnN0cmFpbnRTb2x2ZXIoKTtcbiAgICAgIHRoaXMud29ybGQgPSBuZXcgQU1NTy5idERpc2NyZXRlRHluYW1pY3NXb3JsZCh0aGlzLmRpc3BhdGNoZXIsIHRoaXMuYnJvYWRwaGFzZSwgdGhpcy5zb2x2ZXIsIHRoaXMuY29sbGlzaW9uQ29uZmlndXJhdGlvbik7XG4gICAgICB0aGlzLndvcmxkLnNldEdyYXZpdHkobmV3IEFNTU8uYnRWZWN0b3IzKDAsIC01LCAwKSk7IC8vIFRPRE86IFJlbW92ZVxuICAgIH0gLy8ga2V5IGV4YW1wbGU6IGBwbGFuZS5ub3JtYWx7MjQuNTQzLDIzLjUzLDUzLjR9YFxuXG4gIH0sIHtcbiAgICBrZXk6IFwic2hhcGVHZW5lcmF0b3JcIixcbiAgICB2YWx1ZTpcbiAgICAvKiNfX1BVUkVfXyovXG4gICAgcmVnZW5lcmF0b3IubWFyayhmdW5jdGlvbiBzaGFwZUdlbmVyYXRvcihfcmVmMikge1xuICAgICAgdmFyIF9yZWYyJHR5cGUsIHR5cGUsIGRhdGEsIHZlYzM7XG5cbiAgICAgIHJldHVybiByZWdlbmVyYXRvci53cmFwKGZ1bmN0aW9uIHNoYXBlR2VuZXJhdG9yJChfY29udGV4dCkge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgX3JlZjIkdHlwZSA9IF9yZWYyLnR5cGUsIHR5cGUgPSBfcmVmMiR0eXBlID09PSB2b2lkIDAgPyAnYm94JyA6IF9yZWYyJHR5cGUsIGRhdGEgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgW1widHlwZVwiXSk7XG4gICAgICAgICAgICAgIHZlYzMgPSB0aGlzLnRtcFZlYzM7XG4gICAgICAgICAgICAgIF9jb250ZXh0LnQwID0gdHlwZTtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IF9jb250ZXh0LnQwID09PSAncGxhbmUnID8gNSA6IF9jb250ZXh0LnQwID09PSAnc3BoZXJlJyA/IDEyIDogX2NvbnRleHQudDAgPT09ICdib3gnID8gMTYgOiAyMztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDc7XG4gICAgICAgICAgICAgIHJldHVybiBTeW1ib2wuZm9yKFwicGxhbmUubm9ybWFse1wiLmNvbmNhdChkYXRhLm5vcm1hbC5qb2luKCcsJyksIFwifVwiKSk7XG5cbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgdmVjMy5zZXRYKGRhdGEubm9ybWFsWzBdKTtcbiAgICAgICAgICAgICAgdmVjMy5zZXRZKGRhdGEubm9ybWFsWzFdKTtcbiAgICAgICAgICAgICAgdmVjMy5zZXRZKGRhdGEubm9ybWFsWzJdKTtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDEyO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IEFNTU8uYnRTdGF0aWNQbGFuZVNoYXBlKHZlYzMpO1xuXG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgIHJldHVybiBTeW1ib2wuZm9yKFwic3BoZXJlLnJhZGl1c3tcIi5jb25jYXQoZGF0YS5yYWRpdXMsIFwifVwiKSk7XG5cbiAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxNjtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBTU1PLmJ0U3BoZXJlU2hhcGUoZGF0YS5yYWRpdXMpO1xuXG4gICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTg7XG4gICAgICAgICAgICAgIHJldHVybiBTeW1ib2wuZm9yKFwiYm94LnNpemV7XCIuY29uY2F0KGRhdGEuc2l6ZS5qb2luKCcsJyksIFwifVwiKSk7XG5cbiAgICAgICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgICAgIHZlYzMuc2V0WChkYXRhLnNpemVbMF0gLyAyKTtcbiAgICAgICAgICAgICAgdmVjMy5zZXRZKGRhdGEuc2l6ZVsxXSAvIDIpO1xuICAgICAgICAgICAgICB2ZWMzLnNldFkoZGF0YS5zaXplWzJdIC8gMik7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyMztcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBTU1PLmJ0Qm94U2hhcGUodmVjMyk7XG5cbiAgICAgICAgICAgIGNhc2UgMjM6XG4gICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBzaGFwZUdlbmVyYXRvciwgdGhpcyk7XG4gICAgfSlcbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVTaGFwZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVTaGFwZShib2R5RGF0YSkge1xuICAgICAgdmFyIHNoYXBlR2VuZXJhdG9yID0gdGhpcy5zaGFwZUdlbmVyYXRvcihib2R5RGF0YSk7XG4gICAgICB2YXIgc2hhcGVLZXkgPSBzaGFwZUdlbmVyYXRvci5uZXh0KCkudmFsdWU7XG5cbiAgICAgIGlmIChzaGFwZUtleSBpbiB0aGlzLmNhY2hlLmdlb21ldHJpZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2VvbWV0cmllc1tzaGFwZUtleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaGFwZUdlbmVyYXRvci5uZXh0KCkudmFsdWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUJvZHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQm9keShzaGFwZSwgX3JlZjMpIHtcbiAgICAgIHZhciBfcmVmMyRtYXNzID0gX3JlZjMubWFzcyxcbiAgICAgICAgICBtYXNzID0gX3JlZjMkbWFzcyA9PT0gdm9pZCAwID8gMSA6IF9yZWYzJG1hc3MsXG4gICAgICAgICAgX3JlZjMkcG9zaXRpb24gPSBfcmVmMy5wb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbiA9IF9yZWYzJHBvc2l0aW9uID09PSB2b2lkIDAgPyBbMCwgMCwgMF0gOiBfcmVmMyRwb3NpdGlvbixcbiAgICAgICAgICBfcmVmMyRyZXN0aXR1dGlvbiA9IF9yZWYzLnJlc3RpdHV0aW9uLFxuICAgICAgICAgIHJlc3RpdHV0aW9uID0gX3JlZjMkcmVzdGl0dXRpb24gPT09IHZvaWQgMCA/IDAgOiBfcmVmMyRyZXN0aXR1dGlvbixcbiAgICAgICAgICBfcmVmMyRmcmljdGlvbiA9IF9yZWYzLmZyaWN0aW9uLFxuICAgICAgICAgIGZyaWN0aW9uID0gX3JlZjMkZnJpY3Rpb24gPT09IHZvaWQgMCA/IDEgOiBfcmVmMyRmcmljdGlvbixcbiAgICAgICAgICBfcmVmMyRsaW5lYXJEYW1waW5nID0gX3JlZjMubGluZWFyRGFtcGluZyxcbiAgICAgICAgICBsaW5lYXJEYW1waW5nID0gX3JlZjMkbGluZWFyRGFtcGluZyA9PT0gdm9pZCAwID8gMCA6IF9yZWYzJGxpbmVhckRhbXBpbmcsXG4gICAgICAgICAgX3JlZjMkYW5ndWxhckRhbXBpbmcgPSBfcmVmMy5hbmd1bGFyRGFtcGluZyxcbiAgICAgICAgICBhbmd1bGFyRGFtcGluZyA9IF9yZWYzJGFuZ3VsYXJEYW1waW5nID09PSB2b2lkIDAgPyAwIDogX3JlZjMkYW5ndWxhckRhbXBpbmc7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm0gPSBuZXcgQU1NTy5idFRyYW5zZm9ybSgpO1xuICAgICAgdHJhbnNmb3JtLnNldElkZW50aXR5KCk7XG4gICAgICB0cmFuc2Zvcm0uc2V0T3JpZ2luKG5ldyBBTU1PLmJ0VmVjdG9yMyhwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIHBvc2l0aW9uWzJdKSk7XG4gICAgICB2YXIgbG9jYWxJbmVydGlhID0gbmV3IEFNTU8uYnRWZWN0b3IzKDAsIDAsIDApO1xuICAgICAgc2hhcGUuY2FsY3VsYXRlTG9jYWxJbmVydGlhKG1hc3MsIGxvY2FsSW5lcnRpYSk7XG4gICAgICB2YXIgbW90aW9uU3RhdGUgPSBuZXcgQU1NTy5idERlZmF1bHRNb3Rpb25TdGF0ZSh0cmFuc2Zvcm0pO1xuICAgICAgdmFyIHJiSW5mbyA9IG5ldyBBTU1PLmJ0UmlnaWRCb2R5Q29uc3RydWN0aW9uSW5mbyhtYXNzLCBtb3Rpb25TdGF0ZSwgc2hhcGUsIGxvY2FsSW5lcnRpYSk7XG4gICAgICByYkluZm8uc2V0X21fZnJpY3Rpb24oZnJpY3Rpb24pO1xuICAgICAgY29uc29sZS5sb2coJ3Jlc3RpdHV0aW9uJywgcmVzdGl0dXRpb24pO1xuICAgICAgcmJJbmZvLnNldF9tX3Jlc3RpdHV0aW9uKHJlc3RpdHV0aW9uKTtcbiAgICAgIHJiSW5mby5zZXRfbV9saW5lYXJEYW1waW5nKGxpbmVhckRhbXBpbmcpO1xuICAgICAgcmJJbmZvLnNldF9tX2FuZ3VsYXJEYW1waW5nKGFuZ3VsYXJEYW1waW5nKTtcbiAgICAgIHZhciBib2R5ID0gbmV3IEFNTU8uYnRSaWdpZEJvZHkocmJJbmZvKTtcbiAgICAgIHJldHVybiBib2R5O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVSaWdpZEJvZHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlUmlnaWRCb2R5KGJvZHlEYXRhKSB7XG4gICAgICB2YXIgc2hhcGUgPSB0aGlzLmNyZWF0ZVNoYXBlKGJvZHlEYXRhKTtcbiAgICAgIHZhciBib2R5ID0gdGhpcy5jcmVhdGVCb2R5KHNoYXBlLCB7XG4gICAgICAgIG1hc3M6IHR5cGVvZiBib2R5RGF0YS5tYXNzID09PSAnbnVtYmVyJyA/IGJvZHlEYXRhLm1hc3MgOiAxLFxuICAgICAgICBwb3NpdGlvbjogYm9keURhdGEucG9zaXRpb24sXG4gICAgICAgIHJlc3RpdHV0aW9uOiBib2R5RGF0YS5yZXN0aXR1dGlvbixcbiAgICAgICAgZnJpY3Rpb246IGJvZHlEYXRhLmZyaWN0aW9uLFxuICAgICAgICBsaW5lYXJEYW1waW5nOiBib2R5RGF0YS5saW5lYXJEYW1waW5nLFxuICAgICAgICBhbmd1bGFyRGFtcGluZzogYm9keURhdGEuYW5ndWxhckRhbXBpbmdcbiAgICAgIH0pO1xuICAgICAgdGhpcy53b3JsZC5hZGRSaWdpZEJvZHkoYm9keSk7XG4gICAgICB0aGlzLmJvZGllcy5wdXNoKGJvZHkpO1xuICAgICAgdHJhbnNmZXJhYmxlTWVzc2FnZSh7XG4gICAgICAgIGNtZDogQ01ELkZFRURCQUNLX1JJR0lEQk9EWSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGluZGV4OiBib2R5RGF0YS5pbmRleFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlUmlnaWRCb2RpZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlUmlnaWRCb2RpZXMoYXJyYXksIGluaXRpYWxPZmZzZXQpIHtcbiAgICAgIHZhciBudW1ib2RpZXMgPSB0aGlzLmJvZGllcy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChudW1ib2RpZXMtLSkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbnVtYm9kaWVzICogNyArIGluaXRpYWxPZmZzZXQ7XG4gICAgICAgIHRoaXMuYm9kaWVzW251bWJvZGllc10uZ2V0TW90aW9uU3RhdGUoKS5nZXRXb3JsZFRyYW5zZm9ybSh0aGlzLnRyYW5zZm9ybSk7XG4gICAgICAgIHZhciBvcmlnaW4gPSB0aGlzLnRyYW5zZm9ybS5nZXRPcmlnaW4oKTtcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gdGhpcy50cmFuc2Zvcm0uZ2V0Um90YXRpb24oKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0XSA9IG9yaWdpbi54KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDFdID0gb3JpZ2luLnkoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgMl0gPSBvcmlnaW4ueigpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyAzXSA9IHJvdGF0aW9uLngoKTtcbiAgICAgICAgYXJyYXlbb2Zmc2V0ICsgNF0gPSByb3RhdGlvbi55KCk7XG4gICAgICAgIGFycmF5W29mZnNldCArIDVdID0gcm90YXRpb24ueigpO1xuICAgICAgICBhcnJheVtvZmZzZXQgKyA2XSA9IHJvdGF0aW9uLncoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2ltdWxhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2ltdWxhdGUoKSB7XG4gICAgICB0aGlzLndvcmxkLnN0ZXBTaW11bGF0aW9uKGR0KyssIDIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgdmFyIGFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSgxICsgdGhpcy5ib2RpZXMubGVuZ3RoICogNyk7XG4gICAgICBhcnJheVswXSA9IENNRC5GRUVEQkFDS19VUERBVEU7XG4gICAgICB0aGlzLnNpbXVsYXRlKCk7XG4gICAgICB0aGlzLnVwZGF0ZVJpZ2lkQm9kaWVzKGFycmF5LCAxKTtcbiAgICAgIHRyYW5zZmVyYWJsZU1lc3NhZ2UoYXJyYXkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBbW1vQmFja2VuZDtcbn0oKSwgX3RlbXApKCk7XG5cblxufSk7IiwiaW1wb3J0IEFtbW9Xb3JrZXIgZnJvbSAnd29ya2VyIS4vd29ya2VyLmpzJztcbmltcG9ydCBDTUQgZnJvbSAnLi4vY29tbWFuZHMnO1xuXG5leHBvcnQgY2xhc3MgQW1tb0VuZ2luZSB7XG4gIHN0YXRpYyBDTUQgPSBDTUQ7XG4gIHN0YXRpYyBBcnJheUJ1ZmZlciA9IFNoYXJlZEFycmF5QnVmZmVyIHx8IEFycmF5QnVmZmVyO1xuICBpc1NoYXJlZCA9IEFtbW9FbmdpbmUuQXJyYXlCdWZmZXIgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy53b3JrZXIgPSBuZXcgQW1tb1dvcmtlcigpO1xuICAgIHRoaXMud29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UgPSB0aGlzLndvcmtlci53ZWJraXRQb3N0TWVzc2FnZSB8fCB0aGlzLndvcmtlci5wb3N0TWVzc2FnZTtcbiAgICB0aGlzLnNlbmQoQ01ELklOSVRJQUxJWkUsIG9wdGlvbnMpO1xuICB9XG5cbiAgc2VuZChjbWQsIGRhdGEpIHtcbiAgICB0aGlzLndvcmtlci50cmFuc2ZlcmFibGVNZXNzYWdlKHtjbWQsIGRhdGF9KTtcbiAgfVxuXG4gIHNlbmRCdWZmZXIoY29tbWFuZCwgZGF0YSA9IFtdKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXIgPSBuZXcgQW1tb0VuZ2luZS5BcnJheUJ1ZmZlcihGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiAoZGF0YS5sZW5ndGggKyAxKSk7XG4gICAgY29uc3QgYXJyYXkgPSB0aGlzLmFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXIpO1xuICAgIGFycmF5WzBdID0gY29tbWFuZDtcblxuICAgIGFycmF5LnNldChkYXRhLCAxKTtcbiAgICB0aGlzLndvcmtlci50cmFuc2ZlcmFibGVNZXNzYWdlKGFycmF5LCBidWZmZXIpO1xuICB9XG5cbiAgcmVxdWVzdFVwZGF0ZSgpIHtcbiAgICB0aGlzLndvcmtlci50cmFuc2ZlcmFibGVNZXNzYWdlKHtjbWQ6IENNRC5SRVFVRVNUX1VQREFURX0pO1xuICB9XG5cbiAgbGlzdGVuKGNhbGxiYWNrKSB7XG4gICAgdGhpcy53b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGNhbGxiYWNrKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImkiLCJJTklUSUFMSVpFIiwiRkVFREJBQ0tfSU5JVElBTElaRSIsIkNSRUFURV9SSUdJREJPRFkiLCJGRUVEQkFDS19SSUdJREJPRFkiLCJSRVFVRVNUX1VQREFURSIsIkZFRURCQUNLX1VQREFURSIsIldvcmxkTW9kdWxlIiwib3B0aW9ucyIsImNoaWxkIiwiY29tcG9uZW50IiwibWFuYWdlciIsImluZGV4IiwiYm9keUluZGV4IiwicGh5c2ljcyIsImNyZWF0ZVBoeXNpY3MiLCJib2RpZXMiLCJlbmdpbmUiLCJzZW5kIiwiQ01EIiwiZGF0YSIsInNpbXVsYXRlIiwiYXBwIiwic2ltdWxhdGVMb29wIiwibG9vcCIsInJlcXVlc3RVcGRhdGUiLCJsaXN0ZW4iLCJjbWQiLCJhY3RpdmUiLCJwcm9jZXNzVXBkYXRlRmVlZGJhY2siLCJhcnJheSIsIm51bWJvZGllcyIsIm9mZnNldCIsImJvZHkiLCJuYXRpdmUiLCJwb3NpdGlvbiIsIngiLCJ5IiwieiIsInF1YXRlcm5pb24iLCJ3IiwiY29tcHV0ZVNwaGVyZU9wdGlvbnMiLCJnZW9tZXRyeSIsImNvbXB1dGVCb3VuZGluZ1NwaGVyZSIsInJhZGl1cyIsImJvdW5kaW5nU3BoZXJlIiwiY29tcHV0ZUJveE9wdGlvbnMiLCJjb21wdXRlQm91bmRpbmdCb3giLCJzaXplIiwiYm91bmRpbmdCb3giLCJnZXRTaXplIiwidG9BcnJheSIsIlJpZ2lkYm9keU1vZHVsZSIsInR5cGUiLCJjb21wdXRlIiwiQm9vbGVhbiIsIndvcmxkTW9kdWxlIiwibWFzcyIsInJlc3RpdHV0aW9uIiwiZnJpY3Rpb24iLCJsaW5lYXJEYW1waW5nIiwiYW5ndWxhckRhbXBpbmciLCJjb21wdXRlRGF0YSIsIlRBUkdFVCIsIlN5bWJvbCIsIlNDUklQVF9UWVBFIiwiQmxvYkJ1aWxkZXIiLCJ3aW5kb3ciLCJXZWJLaXRCbG9iQnVpbGRlciIsIk1vekJsb2JCdWlsZGVyIiwiTVNCbG9iQnVpbGRlciIsIlVSTCIsIndlYmtpdFVSTCIsIldvcmtlciIsInNoaW1Xb3JrZXIiLCJmaWxlbmFtZSIsImZuIiwiU2hpbVdvcmtlciIsImZvcmNlRmFsbGJhY2siLCJvIiwic291cmNlIiwidG9TdHJpbmciLCJyZXBsYWNlIiwic2xpY2UiLCJvYmpVUkwiLCJjcmVhdGVTb3VyY2VPYmplY3QiLCJyZXZva2VPYmplY3RVUkwiLCJzZWxmU2hpbSIsInBvc3RNZXNzYWdlIiwibSIsIm9ubWVzc2FnZSIsInNldFRpbWVvdXQiLCJ0YXJnZXQiLCJjYWxsIiwiaXNUaGlzVGhyZWFkIiwidGVzdFdvcmtlciIsInRlc3RBcnJheSIsIlVpbnQ4QXJyYXkiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiRXJyb3IiLCJidWZmZXIiLCJlIiwidGVybWluYXRlIiwic3RyIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsImJsb2IiLCJhcHBlbmQiLCJnZXRCbG9iIiwiZG9jdW1lbnQiLCJzZWxmIiwiY3JlYXRlQ29tbW9uanNNb2R1bGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicnVudGltZSIsImdsb2JhbCIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCIkU3ltYm9sIiwiaXRlcmF0b3JTeW1ib2wiLCJpdGVyYXRvciIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInJlZ2VuZXJhdG9yUnVudGltZSIsIndyYXAiLCJpbm5lckZuIiwib3V0ZXJGbiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIl9pbnZva2UiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJvYmoiLCJhcmciLCJlcnIiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiX19hd2FpdCIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwicmVzdWx0IiwidmFsdWUiLCJfdHlwZW9mIiwiUHJvbWlzZSIsInRoZW4iLCJ1bndyYXBwZWQiLCJlcnJvciIsInByZXZpb3VzUHJvbWlzZSIsImVucXVldWUiLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsImFzeW5jIiwiaXRlciIsIm5leHQiLCJkb25lIiwic3RhdGUiLCJkb25lUmVzdWx0IiwiZGVsZWdhdGUiLCJkZWxlZ2F0ZVJlc3VsdCIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsInJldHVybiIsIlR5cGVFcnJvciIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0Iiwia2V5cyIsIm9iamVjdCIsImtleSIsInJldmVyc2UiLCJsZW5ndGgiLCJwb3AiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXNOYU4iLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInN0b3AiLCJyb290RW50cnkiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsIkZ1bmN0aW9uIiwiZyIsImhhZFJ1bnRpbWUiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiaW5kZXhPZiIsIm9sZFJ1bnRpbWUiLCJydW50aW1lTW9kdWxlIiwicmVnZW5lcmF0b3IiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsImV4Y2x1ZGVkIiwic291cmNlS2V5cyIsIm9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzb3VyY2VTeW1ib2xLZXlzIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJvYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJjbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJjcmVhdGVDbGFzcyIsIl9kZWZpbmVQcm9wZXJ0eSIsIl90ZW1wIiwidHJhbnNmZXJhYmxlTWVzc2FnZSIsIndlYmtpdFBvc3RNZXNzYWdlIiwiQU1NTyIsImR0IiwiQW1tb0JhY2tlbmQiLCJfdGhpcyIsImdlb21ldHJpZXMiLCJfcmVmIiwiaW5pdGlhbGl6ZSIsInBhdGgiLCJ1cGRhdGUiLCJjcmVhdGVSaWdpZEJvZHkiLCJhbW1vUGF0aCIsImltcG9ydFNjcmlwdHMiLCJBbW1vIiwiY29uc29sZSIsImxvZyIsInByZXBhcmVTZXR1cCIsInRtcFZlYzMiLCJidFZlY3RvcjMiLCJjb2xsaXNpb25Db25maWd1cmF0aW9uIiwiYnREZWZhdWx0Q29sbGlzaW9uQ29uZmlndXJhdGlvbiIsImRpc3BhdGNoZXIiLCJidENvbGxpc2lvbkRpc3BhdGNoZXIiLCJicm9hZHBoYXNlIiwiYnREYnZ0QnJvYWRwaGFzZSIsInNvbHZlciIsImJ0U2VxdWVudGlhbEltcHVsc2VDb25zdHJhaW50U29sdmVyIiwid29ybGQiLCJidERpc2NyZXRlRHluYW1pY3NXb3JsZCIsInNldEdyYXZpdHkiLCJzaGFwZUdlbmVyYXRvciIsIl9yZWYyIiwiX3JlZjIkdHlwZSIsInZlYzMiLCJzaGFwZUdlbmVyYXRvciQiLCJfY29udGV4dCIsInQwIiwiZm9yIiwiY29uY2F0Iiwibm9ybWFsIiwiam9pbiIsInNldFgiLCJzZXRZIiwiYnRTdGF0aWNQbGFuZVNoYXBlIiwiYnRTcGhlcmVTaGFwZSIsImJ0Qm94U2hhcGUiLCJjcmVhdGVTaGFwZSIsImJvZHlEYXRhIiwic2hhcGVLZXkiLCJjYWNoZSIsImNyZWF0ZUJvZHkiLCJzaGFwZSIsIl9yZWYzIiwiX3JlZjMkbWFzcyIsIl9yZWYzJHBvc2l0aW9uIiwiX3JlZjMkcmVzdGl0dXRpb24iLCJfcmVmMyRmcmljdGlvbiIsIl9yZWYzJGxpbmVhckRhbXBpbmciLCJfcmVmMyRhbmd1bGFyRGFtcGluZyIsInRyYW5zZm9ybSIsImJ0VHJhbnNmb3JtIiwic2V0SWRlbnRpdHkiLCJzZXRPcmlnaW4iLCJsb2NhbEluZXJ0aWEiLCJjYWxjdWxhdGVMb2NhbEluZXJ0aWEiLCJtb3Rpb25TdGF0ZSIsImJ0RGVmYXVsdE1vdGlvblN0YXRlIiwicmJJbmZvIiwiYnRSaWdpZEJvZHlDb25zdHJ1Y3Rpb25JbmZvIiwic2V0X21fZnJpY3Rpb24iLCJzZXRfbV9yZXN0aXR1dGlvbiIsInNldF9tX2xpbmVhckRhbXBpbmciLCJzZXRfbV9hbmd1bGFyRGFtcGluZyIsImJ0UmlnaWRCb2R5IiwiYWRkUmlnaWRCb2R5IiwidXBkYXRlUmlnaWRCb2RpZXMiLCJpbml0aWFsT2Zmc2V0IiwiZ2V0TW90aW9uU3RhdGUiLCJnZXRXb3JsZFRyYW5zZm9ybSIsIm9yaWdpbiIsImdldE9yaWdpbiIsInJvdGF0aW9uIiwiZ2V0Um90YXRpb24iLCJzdGVwU2ltdWxhdGlvbiIsIkZsb2F0MzJBcnJheSIsIkFtbW9FbmdpbmUiLCJBcnJheUJ1ZmZlciIsIlNoYXJlZEFycmF5QnVmZmVyIiwid29ya2VyIiwiQW1tb1dvcmtlciIsImNvbW1hbmQiLCJCWVRFU19QRVJfRUxFTUVOVCIsInNldCIsImNhbGxi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
