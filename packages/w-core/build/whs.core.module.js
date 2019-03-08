/* WhitestormJS Framework v3.0.0-dev.6 */
import { Clock, Mesh, Scene, WebGLRenderer, REVISION } from 'three';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
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
    reset: function (skipTempReset) {
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
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
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
    abrupt: function (type, arg) {
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
    complete: function (record, afterLoc) {
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
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
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
    delegateYield: function (iterable, resultName, nextLoc) {
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
  return this || typeof self === "object" && self;
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
  return this || typeof self === "object" && self;
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

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

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

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

var ModuleSystem =
/*#__PURE__*/
function () {
  function ModuleSystem(options) {
    var _this = this;

    classCallCheck(this, ModuleSystem);

    this.modules = options.modules || [];
    var data = {};
    var unresolvedWarns = new Map();
    var updateHandlers = {};
    var activeModule = null;
    this.manager = new Proxy(data, {
      set: function set(obj, prop, value) {
        obj[prop] = value; // console.log(prop, updateHandlers[prop]);

        if (updateHandlers[prop]) {
          updateHandlers[prop].forEach(function (cb) {
            return cb(value);
          });
        }

        return true;
      },
      get: function get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        } else {
          var warns = unresolvedWarns.get(activeModule);
          if (warns && warns[prop]) console.warn(warns[prop], activeModule);
          if (activeModule === null) console.error('No active module');else console.error('Active module: ', activeModule);
          throw new Error("manager.".concat(prop, " is required by the active module."));
        }
      }
    });

    var warn = function warn(module) {
      return function (dependency, message) {
        unresolvedWarns.set(module, objectSpread({}, unresolvedWarns.get(module) || {}, defineProperty({}, dependency, message)));
      };
    };

    var onUpdate = function onUpdate(propName, handler) {
      if (updateHandlers[propName]) {
        updateHandlers[propName].push(handler);
      } else {
        updateHandlers[propName] = [handler];
      }

      return function () {
        if (updateHandlers[propName]) {
          updateHandlers[propName].splice(updateHandlers[propName].indexOf(handler), 1);
        }
      };
    };

    this.setupModules = function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var module = _step.value;

          if ('setup' in module) {
            activeModule = module;
            module.setup(_this, {
              data: data,
              manager: _this.manager,
              warn: warn(module),
              onUpdate: onUpdate
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      activeModule = null;
    };
  }

  createClass(ModuleSystem, [{
    key: "bridge",
    value: function bridge(bridgeName, inputData) {
      var outputData = inputData;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.modules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var module = _step2.value;

          if (module.bridges && bridgeName in module.bridges) {
            outputData = module.bridges[bridgeName](outputData);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return outputData;
    }
  }]);

  return ModuleSystem;
}();

var Component =
/*#__PURE__*/
function (_ModuleSystem) {
  inherits(Component, _ModuleSystem);

  function Component() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    classCallCheck(this, Component);

    var asyncOptions = typeof options === 'function' && options();
    _this = possibleConstructorReturn(this, getPrototypeOf(Component).call(this, asyncOptions ? {
      modules: []
    } : options));

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "isAsync", false);

    _this.isAsync = asyncOptions instanceof Promise;
    _this.native = _this.isAsync ? new Promise(function (resolve) {
      asyncOptions.then(function (options) {
        resolve(_this.build(options));
      });
    }) : _this.build(typeof options === 'function' ? options() : options);

    _this.setupModules();

    return _this;
  }

  createClass(Component, [{
    key: "build",
    value: function build() {
      console.error('You should use your own .build()');
      return null;
    }
  }, {
    key: "add",
    value: function () {
      var _add = asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee(component) {
        var selfNative, childNative;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isAsync) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return this.native;

              case 3:
                _context.t0 = _context.sent;
                _context.next = 7;
                break;

              case 6:
                _context.t0 = this.native;

              case 7:
                selfNative = _context.t0;

                if (!component.isAsync) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return component.native;

              case 11:
                _context.t1 = _context.sent;
                _context.next = 15;
                break;

              case 14:
                _context.t1 = component.native;

              case 15:
                childNative = _context.t1;
                selfNative.add(childNative);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }]);

  return Component;
}(ModuleSystem);

var construct = createCommonjsModule(function (module) {
function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
});

const version = "3.0.0-dev.7";

var system = {
  window: typeof window === 'undefined' ? global : window
};

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

var DefineModule =
/*#__PURE__*/
function () {
  function DefineModule() {
    classCallCheck(this, DefineModule);

    for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    this.data = data;
  }

  createClass(DefineModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager,
          other = objectWithoutProperties(_ref, ["manager"]);

      this.data.forEach(function (data) {
        Object.assign(manager, typeof data === 'function' ? data(manager, other) : data);
      });
    }
  }]);

  return DefineModule;
}();

/**
 * @class Loop
 * @category core
 * @param {Function} func function to execute on each animation frame
 * @param {Boolean} [useClock=true] passes a Clock to the function when called, if true
 * @memberof module:core
 */
var Loop = function Loop(func) {
  classCallCheck(this, Loop);

  this.func = func;
  this.enabled = true;
};

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var Store =
/*#__PURE__*/
function () {
  function Store(loaders) {
    classCallCheck(this, Store);

    this.loaders = loaders;
    this.refs = {};
    this.processors = {};
  }

  createClass(Store, [{
    key: "process",
    value: function process(assetType, processor) {
      if (this.processors[assetType]) {
        this.processors[assetType].push(processor);
      } else {
        this.processors[assetType] = [processor];
      }
    }
  }, {
    key: "load",
    value: function load(assetName, url) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _$exec = /(.*)\./.exec(assetName),
          _$exec2 = slicedToArray(_$exec, 2),
          assetType = _$exec2[1];

      var loader = this.loaders[assetType];
      var processors = this.processors[assetType] || [];
      this.refs[assetName] = new Promise(function (resolve, reject) {
        loader.load(url, function (data) {
          resolve(processors.reduce(function (newData, processor) {
            return processor(newData, options, assetName);
          }, data));
        }, undefined, reject);
      });
      return this.refs[assetName];
    }
  }, {
    key: "ref",
    value: function ref(assetName) {
      return this.refs[assetName];
    }
  }]);

  return Store;
}();

defineProperty(Store, "asyncLoader", {
  load: function load(asyncData, onComplete, onProgress, onError) {
    asyncData().then(onComplete);
  }
});

/**
 * @class App
 * @category core
 * @description This component is used to prepare a world scene, setup physics, camera, renderer and all other things that you usually do before making meshes.
 * @param {Array} [modules=[]] - Array of Modules
 * @extends ModuleSystem
 * @memberof module:core
 */

var App =
/*#__PURE__*/
function (_ModuleSystem) {
  inherits(App, _ModuleSystem);

  /**
   * @description Defines whether the scene should render or not
   * @member {Boolean} module:core.App#enabled
   * @public
   */

  /**
   * Loops in this app
   * @description Array of loops that are executed by this app.
   * @member {Array} module:core.App#loops
   * @public
   */
  function App() {
    var _this;

    var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    classCallCheck(this, App);

    console.log("WHS.App ".concat(version));
    _this = possibleConstructorReturn(this, getPrototypeOf(App).call(this, {
      modules: modules
    }));

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "enabled", true);

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "clock", new Clock());

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "loops", []);

    _this.setupModules();

    return _this;
  } // CONTROLS & UPDATING

  /**
   * @method start
   * @description Start rendering loop and physics simulation (if you use version with physics).
   * @memberof module:core.App
   */


  createClass(App, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var requestAnimFrame = function () {
        return system.window.requestAnimationFrame || system.window.webkitRequestAnimationFrame || system.window.mozRequestAnimationFrame || function (callback) {
          system.window.setTimeout(callback, 1000 / 60);
        };
      }();

      var process = function process() {
        _this2.request = requestAnimFrame(function () {
          return process();
        });
        if (!_this2.enabled) return;

        for (var i = 0, ll = _this2.loops.length; i < ll; i++) {
          var e = _this2.loops[i];
          if (e.enabled) e.func(_this2.clock);
        }
      };

      this.enabled = true;
      if (!this.request) process();
    }
  }, {
    key: "loop",
    value: function loop(loopCallback) {
      var loop = new Loop(loopCallback);
      this.loops.push(loop);
      return loop;
    }
  }]);

  return App;
}(ModuleSystem);

defineProperty(App, "Store", Store);

defineProperty(App, "define", function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return construct(DefineModule, args);
});

/** @module core */

function applyLocalTransform(mathType, data) {
  if (!data) return;
  var assignData = {};

  if (data instanceof Object.getPrototypeOf(mathType).constructor) {
    // THREE.Vector3 === THREE.Vector3
    mathType.copy(data);
    return;
  } else if (Array.isArray(data)) {
    assignData = {
      x: data[0],
      y: data[1],
      z: data[2],
      w: data[3]
    };
  } else {
    assignData = {
      x: data.x,
      y: data.y,
      z: data.z,
      w: data.w
    };
  }

  if (mathType.w === undefined) {
    delete assignData.w;
  }

  Object.assign(mathType, assignData);
}

function applyTransform(native, options) {
  applyLocalTransform(native.position, options.position);
  applyLocalTransform(native.scale, options.scale);
  applyLocalTransform(native.rotation, options.rotation);
}

var MeshComponent =
/*#__PURE__*/
function (_Component) {
  inherits(MeshComponent, _Component);

  function MeshComponent() {
    classCallCheck(this, MeshComponent);

    return possibleConstructorReturn(this, getPrototypeOf(MeshComponent).apply(this, arguments));
  }

  createClass(MeshComponent, [{
    key: "build",
    value: function build(options) {
      var geometry = options.geometry;
      var material = options.material;
      var mesh = this.bridge('mesh', new Mesh(this.bridge('geometry', geometry), this.bridge('material', material)));
      applyTransform(mesh, options);
      return mesh;
    }
  }]);

  return MeshComponent;
}(Component);
Component.Mesh = MeshComponent;

var CameraComponent =
/*#__PURE__*/
function (_Component) {
  inherits(CameraComponent, _Component);

  function CameraComponent() {
    classCallCheck(this, CameraComponent);

    return possibleConstructorReturn(this, getPrototypeOf(CameraComponent).apply(this, arguments));
  }

  createClass(CameraComponent, [{
    key: "build",
    value: function build(options) {
      var camera = options.camera;
      applyTransform(camera, options);
      return this.bridge('camera', camera);
    }
  }, {
    key: "autoSizeUpdate",
    value: function autoSizeUpdate(onUpdate) {
      var _this = this;

      onUpdate('size', function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            width = _ref2[0],
            height = _ref2[1];

        _this.native.aspect = width / height;

        _this.native.updateProjectionMatrix();
      });
      return this;
    }
  }]);

  return CameraComponent;
}(Component);
Component.Camera = CameraComponent;

var LightComponent =
/*#__PURE__*/
function (_Component) {
  inherits(LightComponent, _Component);

  function LightComponent() {
    classCallCheck(this, LightComponent);

    return possibleConstructorReturn(this, getPrototypeOf(LightComponent).apply(this, arguments));
  }

  createClass(LightComponent, [{
    key: "build",
    value: function build(options) {
      var light = options.light;
      applyTransform(light, options);
      return this.bridge('light', light);
    }
  }]);

  return LightComponent;
}(Component);
Component.Light = LightComponent;

var TreeModule =
/*#__PURE__*/
function () {
  function TreeModule() {
    classCallCheck(this, TreeModule);
  }

  createClass(TreeModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager;
      manager.scene = new Scene();

      app.add =
      /*#__PURE__*/
      function () {
        var _ref2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee(component) {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  component = app.bridge('child', component);
                  _context.t0 = manager.scene;

                  if (!component.isAsync) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 5;
                  return component.native;

                case 5:
                  _context.t1 = _context.sent;
                  _context.next = 9;
                  break;

                case 8:
                  _context.t1 = component.native;

                case 9:
                  _context.t2 = _context.t1;

                  _context.t0.add.call(_context.t0, _context.t2);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);

  return TreeModule;
}();

var RenderingModule =
/*#__PURE__*/
function () {
  function RenderingModule() {
    var moduleOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rendererOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    classCallCheck(this, RenderingModule);

    this.moduleOptions = moduleOptions;
    this.rendererOptions = rendererOptions;
  }

  createClass(RenderingModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager,
          onUpdate = _ref.onUpdate,
          warn = _ref.warn;
      warn('size', 'manager.size should be an array: [width, height]');
      warn('camera', 'manager.camera should be a WHS.Component.Camera');
      warn('scene', 'manager.scene should be a THREE.Scene');
      warn('container', 'manager.container should be an HTMLElement');
      var container = manager.container,
          camera = manager.camera,
          scene = manager.scene,
          _manager$size = manager.size,
          size = _manager$size === void 0 ? [window.innerWidth, window.innerHeight] : _manager$size;
      var rendererOptions = this.rendererOptions || {};
      var renderer = manager.renderer = new WebGLRenderer(this.prepareRendererOptions(rendererOptions));
      renderer.setSize(size[0], size[1]);
      onUpdate('size', function (value) {
        renderer.setSize(value[0], value[1]);
      });
      container.appendChild(renderer.domElement);

      manager.renderFunc = function () {
        manager.renderer.render(manager.scene, manager.camera.native);
      };

      manager.renderLoop = app.loop(function (clock) {
        manager.renderFunc(clock);
      });
    }
  }, {
    key: "prepareRendererOptions",
    value: function prepareRendererOptions(rendererOptions) {
      var quality = this.moduleOptions.quality || 'medium';

      switch (quality) {
        case 'high':
          rendererOptions.antialias = true;
          break;

        default:
      }

      return rendererOptions;
    }
  }]);

  return RenderingModule;
}();

var ControlsModule =
/*#__PURE__*/
function () {
  function ControlsModule(controlsSetup) {
    classCallCheck(this, ControlsModule);

    this.controlsSetup = controlsSetup;
  }

  createClass(ControlsModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager;
      manager.controls = this.controlsSetup(manager);
      manager.controlsLoop = app.loop(function () {
        manager.controls.update();
      });
    }
  }]);

  return ControlsModule;
}();

var ResizeModule =
/*#__PURE__*/
function () {
  function ResizeModule() {
    classCallCheck(this, ResizeModule);
  }

  createClass(ResizeModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager;
      window.addEventListener('resize', function () {
        manager.size = [window.innerWidth, window.innerHeight];
      });
    }
  }]);

  return ResizeModule;
}();

/**
 * Namespace containing all classes from all modules. Used as global in UMD pattern.
 * @namespace WHS
 * @example <caption>The use of WHS namespace.</caption>
 * new WHS.App() // core
 * new WHS.PerspectiveCamera() // components
 * new WHS.ResizeModule() // modules
 * WHS.extend() // utils
 */

var warnDeps = function warnDeps() {
  throw new Error('WhitestormJS Framework requires Three.js https://threejs.org/');
};

try {
  if (!REVISION) warnDeps();
} catch (err) {
  warnDeps();
}
// export * from './components/meshes/index';
// export * from './utils/index';
// export * from './modules/index';
// DEPRECATION
// export * from './deprecation';

export { Component, App, Loop, ModuleSystem, MeshComponent, CameraComponent, LightComponent, DefineModule, TreeModule, RenderingModule, ControlsModule, ResizeModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmNvcmUubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL3NyYy9jb3JlL0NvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NvbnN0cnVjdC5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIi4uL3NyYy9tb2R1bGVzL0RlZmluZU1vZHVsZS5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIi4uL3NyYy9jb3JlL1N0b3JlLmpzIiwiLi4vc3JjL2NvcmUvQXBwLmpzIiwiLi4vc3JjL2NvcmUvaW5kZXguanMiLCIuLi9zcmMvdXRpbHMvYXBwbHlUcmFuc2Zvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9NZXNoLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvTGlnaHQuanMiLCIuLi9zcmMvbW9kdWxlcy9UcmVlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvQ29udHJvbHNNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9SZXNpemVNb2R1bGUuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xuICB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG59KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJleHBvcnQgY2xhc3MgTW9kdWxlU3lzdGVtIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMubW9kdWxlcyA9IG9wdGlvbnMubW9kdWxlcyB8fCBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCB1bnJlc29sdmVkV2FybnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgdXBkYXRlSGFuZGxlcnMgPSB7fTtcbiAgICBsZXQgYWN0aXZlTW9kdWxlID0gbnVsbDtcblxuICAgIHRoaXMubWFuYWdlciA9IG5ldyBQcm94eShkYXRhLCB7XG4gICAgICBzZXQob2JqLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICBvYmpbcHJvcF0gPSB2YWx1ZTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wLCB1cGRhdGVIYW5kbGVyc1twcm9wXSk7XG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wXSkge1xuICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BdLmZvckVhY2goY2IgPT4gY2IodmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcblxuICAgICAgZ2V0KG9iaiwgcHJvcCkge1xuICAgICAgICBpZiAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHdhcm5zID0gdW5yZXNvbHZlZFdhcm5zLmdldChhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgaWYgKHdhcm5zICYmIHdhcm5zW3Byb3BdKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5zW3Byb3BdLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgaWYgKGFjdGl2ZU1vZHVsZSA9PT0gbnVsbClcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGFjdGl2ZSBtb2R1bGUnKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBY3RpdmUgbW9kdWxlOiAnLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYW5hZ2VyLiR7cHJvcH0gaXMgcmVxdWlyZWQgYnkgdGhlIGFjdGl2ZSBtb2R1bGUuYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdhcm4gPSBtb2R1bGUgPT4gKGRlcGVuZGVuY3ksIG1lc3NhZ2UpID0+IHtcbiAgICAgIHVucmVzb2x2ZWRXYXJucy5zZXQobW9kdWxlLCB7XG4gICAgICAgIC4uLih1bnJlc29sdmVkV2FybnMuZ2V0KG1vZHVsZSkgfHwge30pLFxuICAgICAgICBbZGVwZW5kZW5jeV06IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG9uVXBkYXRlID0gKHByb3BOYW1lLCBoYW5kbGVyKSA9PiB7XG4gICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdKSB7XG4gICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5wdXNoKGhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdID0gW2hhbmRsZXJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdKSB7XG4gICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLnNwbGljZShcbiAgICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5pbmRleE9mKGhhbmRsZXIpLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMgPSAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IG1vZHVsZSBvZiB0aGlzLm1vZHVsZXMpIHtcbiAgICAgICAgaWYgKCdzZXR1cCcgaW4gbW9kdWxlKSB7XG4gICAgICAgICAgYWN0aXZlTW9kdWxlID0gbW9kdWxlO1xuXG4gICAgICAgICAgbW9kdWxlLnNldHVwKHRoaXMsIHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBtYW5hZ2VyOiB0aGlzLm1hbmFnZXIsXG4gICAgICAgICAgICB3YXJuOiB3YXJuKG1vZHVsZSksXG4gICAgICAgICAgICBvblVwZGF0ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFjdGl2ZU1vZHVsZSA9IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGJyaWRnZShicmlkZ2VOYW1lLCBpbnB1dERhdGEpIHtcbiAgICBsZXQgb3V0cHV0RGF0YSA9IGlucHV0RGF0YTtcblxuICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIHRoaXMubW9kdWxlcykge1xuICAgICAgaWYgKG1vZHVsZS5icmlkZ2VzICYmIGJyaWRnZU5hbWUgaW4gbW9kdWxlLmJyaWRnZXMpIHtcbiAgICAgICAgb3V0cHV0RGF0YSA9IG1vZHVsZS5icmlkZ2VzW2JyaWRnZU5hbWVdKG91dHB1dERhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXREYXRhO1xuICB9XG59XG4iLCJpbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgaXNBc3luYyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGFzeW5jT3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMoKTtcblxuICAgIHN1cGVyKGFzeW5jT3B0aW9ucyA/IHttb2R1bGVzOiBbXX0gOiBvcHRpb25zKTtcblxuICAgIHRoaXMuaXNBc3luYyA9IGFzeW5jT3B0aW9ucyBpbnN0YW5jZW9mIFByb21pc2U7XG5cbiAgICB0aGlzLm5hdGl2ZSA9IHRoaXMuaXNBc3luYyA/IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgYXN5bmNPcHRpb25zLnRoZW4ob3B0aW9ucyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5idWlsZChvcHRpb25zKSk7XG4gICAgICB9KTtcbiAgICB9KSA6IHRoaXMuYnVpbGQodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zKCkgOiBvcHRpb25zKTtcblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzKCk7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICBjb25zb2xlLmVycm9yKCdZb3Ugc2hvdWxkIHVzZSB5b3VyIG93biAuYnVpbGQoKScpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXN5bmMgYWRkKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IHNlbGZOYXRpdmUgPSB0aGlzLmlzQXN5bmMgPyBhd2FpdCB0aGlzLm5hdGl2ZSA6IHRoaXMubmF0aXZlO1xuICAgIGNvbnN0IGNoaWxkTmF0aXZlID0gY29tcG9uZW50LmlzQXN5bmMgPyBhd2FpdCBjb21wb25lbnQubmF0aXZlIDogY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgIHNlbGZOYXRpdmUuYWRkKGNoaWxkTmF0aXZlKTtcbiAgfVxufVxuIiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuXG4gIHRyeSB7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgaWYgKGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgIGEucHVzaC5hcHBseShhLCBhcmdzKTtcbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgaWYgKENsYXNzKSBzZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0OyIsImV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG4iLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCJ2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IHJlcXVpcmUoXCIuL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7IiwiZXhwb3J0IGNsYXNzIERlZmluZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKC4uLmRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlciwgLi4ub3RoZXJ9KSB7XG4gICAgdGhpcy5kYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICBPYmplY3QuYXNzaWduKG1hbmFnZXIsIHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nID8gZGF0YShtYW5hZ2VyLCBvdGhlcikgOiBkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJleHBvcnQgY2xhc3MgU3RvcmUge1xuICBzdGF0aWMgYXN5bmNMb2FkZXIgPSB7XG4gICAgbG9hZChhc3luY0RhdGEsIG9uQ29tcGxldGUsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IpIHtcbiAgICAgIGFzeW5jRGF0YSgpLnRoZW4ob25Db21wbGV0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGxvYWRlcnMpIHtcbiAgICB0aGlzLmxvYWRlcnMgPSBsb2FkZXJzO1xuICAgIHRoaXMucmVmcyA9IHt9O1xuICAgIHRoaXMucHJvY2Vzc29ycyA9IHt9O1xuICB9XG5cbiAgcHJvY2Vzcyhhc3NldFR5cGUsIHByb2Nlc3Nvcikge1xuICAgIGlmICh0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSkge1xuICAgICAgdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0ucHVzaChwcm9jZXNzb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSA9IFtwcm9jZXNzb3JdO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoYXNzZXROYW1lLCB1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IFssIGFzc2V0VHlwZV0gPSAvKC4qKVxcLi8uZXhlYyhhc3NldE5hbWUpO1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMubG9hZGVyc1thc3NldFR5cGVdO1xuICAgIGNvbnN0IHByb2Nlc3NvcnMgPSB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSB8fCBbXTtcblxuICAgIHRoaXMucmVmc1thc3NldE5hbWVdID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9hZGVyLmxvYWQoXG4gICAgICAgIHVybCxcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgcHJvY2Vzc29ycy5yZWR1Y2UoXG4gICAgICAgICAgICAgIChuZXdEYXRhLCBwcm9jZXNzb3IpID0+IHByb2Nlc3NvcihuZXdEYXRhLCBvcHRpb25zLCBhc3NldE5hbWUpLFxuICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZWZzW2Fzc2V0TmFtZV07XG4gIH1cblxuICByZWYoYXNzZXROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucmVmc1thc3NldE5hbWVdO1xuICB9XG59XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi9wb2x5ZmlsbCc7XG5pbXBvcnQge0RlZmluZU1vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy9EZWZpbmVNb2R1bGUnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TG9vcH0gZnJvbSAnLi9Mb29wJztcbmltcG9ydCB7U3RvcmV9IGZyb20gJy4vU3RvcmUnO1xuXG4vKipcbiAqIEBjbGFzcyBBcHBcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBwcmVwYXJlIGEgd29ybGQgc2NlbmUsIHNldHVwIHBoeXNpY3MsIGNhbWVyYSwgcmVuZGVyZXIgYW5kIGFsbCBvdGhlciB0aGluZ3MgdGhhdCB5b3UgdXN1YWxseSBkbyBiZWZvcmUgbWFraW5nIG1lc2hlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFttb2R1bGVzPVtdXSAtIEFycmF5IG9mIE1vZHVsZXNcbiAqIEBleHRlbmRzIE1vZHVsZVN5c3RlbVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIHN0YXRpYyBTdG9yZSA9IFN0b3JlO1xuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI2VuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZW5hYmxlZCA9IHRydWU7XG4gIGNsb2NrID0gbmV3IENsb2NrKCk7XG5cbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIHN0YXRpYyBkZWZpbmUgPSAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiBuZXcgRGVmaW5lTW9kdWxlKC4uLmFyZ3MpO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcbiAgICBzdXBlcih7bW9kdWxlc30pO1xuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcHJvY2VzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RBbmltRnJhbWUoKCkgPT4gcHJvY2VzcygpKTtcbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IHRoaXMubG9vcHMubGVuZ3RoOyBpIDwgbGw7IGkrKykge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5sb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5mdW5jKHRoaXMuY2xvY2spO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLnJlcXVlc3QpXG4gICAgICBwcm9jZXNzKCk7XG4gIH1cblxuICBsb29wKGxvb3BDYWxsYmFjaykge1xuICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChsb29wQ2FsbGJhY2spO1xuICAgIHRoaXMubG9vcHMucHVzaChsb29wKTtcblxuICAgIHJldHVybiBsb29wO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG4iLCJmdW5jdGlvbiBhcHBseUxvY2FsVHJhbnNmb3JtKG1hdGhUeXBlLCBkYXRhKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuO1xuXG4gIGxldCBhc3NpZ25EYXRhID0ge307XG5cbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWF0aFR5cGUpLmNvbnN0cnVjdG9yKSB7IC8vIFRIUkVFLlZlY3RvcjMgPT09IFRIUkVFLlZlY3RvcjNcbiAgICBtYXRoVHlwZS5jb3B5KGRhdGEpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgYXNzaWduRGF0YSA9IHtcbiAgICAgIHg6IGRhdGFbMF0sXG4gICAgICB5OiBkYXRhWzFdLFxuICAgICAgejogZGF0YVsyXSxcbiAgICAgIHc6IGRhdGFbM11cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGFzc2lnbkRhdGEgPSB7XG4gICAgICB4OiBkYXRhLngsXG4gICAgICB5OiBkYXRhLnksXG4gICAgICB6OiBkYXRhLnosXG4gICAgICB3OiBkYXRhLndcbiAgICB9O1xuICB9XG5cbiAgaWYgKG1hdGhUeXBlLncgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlbGV0ZSBhc3NpZ25EYXRhLnc7XG4gIH1cblxuICBPYmplY3QuYXNzaWduKG1hdGhUeXBlLCBhc3NpZ25EYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKG5hdGl2ZSwgb3B0aW9ucykge1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5wb3NpdGlvbiwgb3B0aW9ucy5wb3NpdGlvbik7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnNjYWxlLCBvcHRpb25zLnNjYWxlKTtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUucm90YXRpb24sIG9wdGlvbnMucm90YXRpb24pO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG9wdGlvbnMuZ2VvbWV0cnk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBvcHRpb25zLm1hdGVyaWFsO1xuXG4gICAgY29uc3QgbWVzaCA9IHRoaXMuYnJpZGdlKCdtZXNoJywgbmV3IE1lc2goXG4gICAgICB0aGlzLmJyaWRnZSgnZ2VvbWV0cnknLCBnZW9tZXRyeSksXG4gICAgICB0aGlzLmJyaWRnZSgnbWF0ZXJpYWwnLCBtYXRlcmlhbClcbiAgICApKTtcblxuICAgIGFwcGx5VHJhbnNmb3JtKG1lc2gsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIG1lc2g7XG4gIH1cbn1cblxuQ29tcG9uZW50Lk1lc2ggPSBNZXNoQ29tcG9uZW50O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIENhbWVyYUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBjYW1lcmEgPSBvcHRpb25zLmNhbWVyYTtcblxuICAgIGFwcGx5VHJhbnNmb3JtKGNhbWVyYSwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5icmlkZ2UoJ2NhbWVyYScsIGNhbWVyYSk7XG4gIH1cblxuICBhdXRvU2l6ZVVwZGF0ZShvblVwZGF0ZSkge1xuICAgIG9uVXBkYXRlKCdzaXplJywgKFt3aWR0aCwgaGVpZ2h0XSkgPT4ge1xuICAgICAgdGhpcy5uYXRpdmUuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICB0aGlzLm5hdGl2ZS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5Db21wb25lbnQuQ2FtZXJhID0gQ2FtZXJhQ29tcG9uZW50O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIExpZ2h0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgYnVpbGQob3B0aW9ucykge1xuICAgIGNvbnN0IGxpZ2h0ID0gb3B0aW9ucy5saWdodDtcblxuICAgIGFwcGx5VHJhbnNmb3JtKGxpZ2h0LCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLmJyaWRnZSgnbGlnaHQnLCBsaWdodCk7XG4gIH1cbn1cblxuQ29tcG9uZW50LkxpZ2h0ID0gTGlnaHRDb21wb25lbnQ7XG4iLCJpbXBvcnQge1NjZW5lfSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlTW9kdWxlIHtcbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLnNjZW5lID0gbmV3IFNjZW5lKCk7XG5cbiAgICBhcHAuYWRkID0gYXN5bmMgKGNvbXBvbmVudCkgPT4ge1xuICAgICAgY29tcG9uZW50ID0gYXBwLmJyaWRnZSgnY2hpbGQnLCBjb21wb25lbnQpO1xuICAgICAgbWFuYWdlci5zY2VuZS5hZGQoY29tcG9uZW50LmlzQXN5bmMgPyBhd2FpdCBjb21wb25lbnQubmF0aXZlIDogY29tcG9uZW50Lm5hdGl2ZSk7XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtXZWJHTFJlbmRlcmVyfSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJpbmdNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihtb2R1bGVPcHRpb25zID0ge30sIHJlbmRlcmVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5tb2R1bGVPcHRpb25zID0gbW9kdWxlT3B0aW9ucztcbiAgICB0aGlzLnJlbmRlcmVyT3B0aW9ucyA9IHJlbmRlcmVyT3B0aW9ucztcbiAgfVxuXG4gIHNldHVwKGFwcCwge21hbmFnZXIsIG9uVXBkYXRlLCB3YXJufSkge1xuICAgIHdhcm4oJ3NpemUnLCAnbWFuYWdlci5zaXplIHNob3VsZCBiZSBhbiBhcnJheTogW3dpZHRoLCBoZWlnaHRdJyk7XG4gICAgd2FybignY2FtZXJhJywgJ21hbmFnZXIuY2FtZXJhIHNob3VsZCBiZSBhIFdIUy5Db21wb25lbnQuQ2FtZXJhJyk7XG4gICAgd2Fybignc2NlbmUnLCAnbWFuYWdlci5zY2VuZSBzaG91bGQgYmUgYSBUSFJFRS5TY2VuZScpO1xuICAgIHdhcm4oJ2NvbnRhaW5lcicsICdtYW5hZ2VyLmNvbnRhaW5lciBzaG91bGQgYmUgYW4gSFRNTEVsZW1lbnQnKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGNhbWVyYSxcbiAgICAgIHNjZW5lLFxuICAgICAgc2l6ZSA9IFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XVxuICAgIH0gPSBtYW5hZ2VyO1xuXG4gICAgY29uc3QgcmVuZGVyZXJPcHRpb25zID0gdGhpcy5yZW5kZXJlck9wdGlvbnMgfHwge307XG5cbiAgICBjb25zdCByZW5kZXJlciA9IG1hbmFnZXIucmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcih0aGlzLnByZXBhcmVSZW5kZXJlck9wdGlvbnMocmVuZGVyZXJPcHRpb25zKSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZShzaXplWzBdLCBzaXplWzFdKTtcblxuICAgIG9uVXBkYXRlKCdzaXplJywgKHZhbHVlKSA9PiB7XG4gICAgICByZW5kZXJlci5zZXRTaXplKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICBtYW5hZ2VyLnJlbmRlckZ1bmMgPSAoKSA9PiB7XG4gICAgICBtYW5hZ2VyLnJlbmRlcmVyLnJlbmRlcihtYW5hZ2VyLnNjZW5lLCBtYW5hZ2VyLmNhbWVyYS5uYXRpdmUpO1xuICAgIH07XG5cbiAgICBtYW5hZ2VyLnJlbmRlckxvb3AgPSBhcHAubG9vcChjbG9jayA9PiB7XG4gICAgICBtYW5hZ2VyLnJlbmRlckZ1bmMoY2xvY2spXG4gICAgfSk7XG4gIH1cblxuICBwcmVwYXJlUmVuZGVyZXJPcHRpb25zKHJlbmRlcmVyT3B0aW9ucykge1xuICAgIGNvbnN0IHF1YWxpdHkgPSB0aGlzLm1vZHVsZU9wdGlvbnMucXVhbGl0eSB8fCAnbWVkaXVtJztcblxuICAgIHN3aXRjaCAocXVhbGl0eSkge1xuICAgICAgY2FzZSAnaGlnaCc6XG4gICAgICAgIHJlbmRlcmVyT3B0aW9ucy5hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG5cbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXJPcHRpb25zO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihjb250cm9sc1NldHVwKSB7XG4gICAgdGhpcy5jb250cm9sc1NldHVwID0gY29udHJvbHNTZXR1cDtcbiAgfVxuXG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgbWFuYWdlci5jb250cm9scyA9IHRoaXMuY29udHJvbHNTZXR1cChtYW5hZ2VyKTtcblxuICAgIG1hbmFnZXIuY29udHJvbHNMb29wID0gYXBwLmxvb3AoKCkgPT4ge1xuICAgICAgbWFuYWdlci5jb250cm9scy51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFJlc2l6ZU1vZHVsZSB7XG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIG1hbmFnZXIuc2l6ZSA9IFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBOYW1lc3BhY2UgY29udGFpbmluZyBhbGwgY2xhc3NlcyBmcm9tIGFsbCBtb2R1bGVzLiBVc2VkIGFzIGdsb2JhbCBpbiBVTUQgcGF0dGVybi5cbiAqIEBuYW1lc3BhY2UgV0hTXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgdXNlIG9mIFdIUyBuYW1lc3BhY2UuPC9jYXB0aW9uPlxuICogbmV3IFdIUy5BcHAoKSAvLyBjb3JlXG4gKiBuZXcgV0hTLlBlcnNwZWN0aXZlQ2FtZXJhKCkgLy8gY29tcG9uZW50c1xuICogbmV3IFdIUy5SZXNpemVNb2R1bGUoKSAvLyBtb2R1bGVzXG4gKiBXSFMuZXh0ZW5kKCkgLy8gdXRpbHNcbiAqL1xuXG5pbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5cbi8vIENoZWNrIGZvciBUaHJlZS5qc1xuY29uc3Qgd2FybkRlcHMgPSAoKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcignV2hpdGVzdG9ybUpTIEZyYW1ld29yayByZXF1aXJlcyBUaHJlZS5qcyBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vdXRpbHMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2luZGV4JztcblxuLy8gREVQUkVDQVRJT05cbi8vIGV4cG9ydCAqIGZyb20gJy4vZGVwcmVjYXRpb24nO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCIkU3ltYm9sIiwiU3ltYm9sIiwiaXRlcmF0b3JTeW1ib2wiLCJpdGVyYXRvciIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInJ1bnRpbWUiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJtb2R1bGUiLCJpbk1vZHVsZSIsImV4cG9ydHMiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwib2JqIiwiYXJnIiwidHlwZSIsImNhbGwiLCJlcnIiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiX19hd2FpdCIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwicmVzdWx0IiwidmFsdWUiLCJQcm9taXNlIiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiZW5xdWV1ZSIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiYXN5bmMiLCJpdGVyIiwibmV4dCIsImRvbmUiLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJyZXR1cm4iLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJ0b1N0cmluZyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0Iiwia2V5cyIsIm9iamVjdCIsImtleSIsInJldmVyc2UiLCJsZW5ndGgiLCJwb3AiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXNOYU4iLCJpIiwic2tpcFRlbXBSZXNldCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJyb290RW50cnkiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsIkZ1bmN0aW9uIiwiZyIsImhhZFJ1bnRpbWUiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiaW5kZXhPZiIsIm9sZFJ1bnRpbWUiLCJyZXF1aXJlIiwiZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsIl9uZXh0IiwiX3Rocm93IiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmdzIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl90eXBlb2YyIiwiX3R5cGVvZiIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJSZWZlcmVuY2VFcnJvciIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiX2dldFByb3RvdHlwZU9mIiwibyIsIl9zZXRQcm90b3R5cGVPZiIsInAiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJfZGVmaW5lUHJvcGVydHkiLCJfb2JqZWN0U3ByZWFkIiwic291cmNlIiwib3duS2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImNvbmNhdCIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIk1vZHVsZVN5c3RlbSIsIm9wdGlvbnMiLCJtb2R1bGVzIiwiZGF0YSIsInVucmVzb2x2ZWRXYXJucyIsIk1hcCIsInVwZGF0ZUhhbmRsZXJzIiwiYWN0aXZlTW9kdWxlIiwibWFuYWdlciIsIlByb3h5Iiwic2V0IiwicHJvcCIsImNiIiwiZ2V0Iiwid2FybnMiLCJjb25zb2xlIiwid2FybiIsImRlcGVuZGVuY3kiLCJtZXNzYWdlIiwib25VcGRhdGUiLCJwcm9wTmFtZSIsImhhbmRsZXIiLCJzcGxpY2UiLCJzZXR1cE1vZHVsZXMiLCJzZXR1cCIsImJyaWRnZU5hbWUiLCJpbnB1dERhdGEiLCJvdXRwdXREYXRhIiwiYnJpZGdlcyIsIkNvbXBvbmVudCIsImFzeW5jT3B0aW9ucyIsImlzQXN5bmMiLCJuYXRpdmUiLCJidWlsZCIsImNvbXBvbmVudCIsInNlbGZOYXRpdmUiLCJjaGlsZE5hdGl2ZSIsImFkZCIsImlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJzaGFtIiwiRGF0ZSIsIl9jb25zdHJ1Y3QiLCJQYXJlbnQiLCJDbGFzcyIsImEiLCJiaW5kIiwic3lzdGVtIiwid2luZG93IiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJleGNsdWRlZCIsInNvdXJjZUtleXMiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwic291cmNlU3ltYm9sS2V5cyIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiRGVmaW5lTW9kdWxlIiwiYXBwIiwib3RoZXIiLCJhc3NpZ24iLCJMb29wIiwiZnVuYyIsImVuYWJsZWQiLCJfYXJyYXlXaXRoSG9sZXMiLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJfcyIsIl9ub25JdGVyYWJsZVJlc3QiLCJfc2xpY2VkVG9BcnJheSIsImFycmF5V2l0aEhvbGVzIiwiaXRlcmFibGVUb0FycmF5TGltaXQiLCJub25JdGVyYWJsZVJlc3QiLCJTdG9yZSIsImxvYWRlcnMiLCJyZWZzIiwicHJvY2Vzc29ycyIsImFzc2V0VHlwZSIsInByb2Nlc3NvciIsImFzc2V0TmFtZSIsInVybCIsImV4ZWMiLCJsb2FkZXIiLCJsb2FkIiwicmVkdWNlIiwibmV3RGF0YSIsImFzeW5jRGF0YSIsIm9uQ29tcGxldGUiLCJvblByb2dyZXNzIiwib25FcnJvciIsIkFwcCIsImxvZyIsInZlcnNpb24iLCJDbG9jayIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJwcm9jZXNzIiwicmVxdWVzdCIsImxsIiwibG9vcHMiLCJjbG9jayIsImxvb3BDYWxsYmFjayIsImxvb3AiLCJhcHBseUxvY2FsVHJhbnNmb3JtIiwibWF0aFR5cGUiLCJhc3NpZ25EYXRhIiwiY29weSIsIngiLCJ5IiwieiIsInciLCJhcHBseVRyYW5zZm9ybSIsInBvc2l0aW9uIiwic2NhbGUiLCJyb3RhdGlvbiIsIk1lc2hDb21wb25lbnQiLCJnZW9tZXRyeSIsIm1hdGVyaWFsIiwibWVzaCIsImJyaWRnZSIsIk1lc2giLCJDYW1lcmFDb21wb25lbnQiLCJjYW1lcmEiLCJ3aWR0aCIsImhlaWdodCIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJDYW1lcmEiLCJMaWdodENvbXBvbmVudCIsImxpZ2h0IiwiTGlnaHQiLCJUcmVlTW9kdWxlIiwic2NlbmUiLCJTY2VuZSIsIlJlbmRlcmluZ01vZHVsZSIsIm1vZHVsZU9wdGlvbnMiLCJyZW5kZXJlck9wdGlvbnMiLCJjb250YWluZXIiLCJzaXplIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwicmVuZGVyZXIiLCJXZWJHTFJlbmRlcmVyIiwicHJlcGFyZVJlbmRlcmVyT3B0aW9ucyIsInNldFNpemUiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJyZW5kZXJGdW5jIiwicmVuZGVyIiwicmVuZGVyTG9vcCIsInF1YWxpdHkiLCJhbnRpYWxpYXMiLCJDb250cm9sc01vZHVsZSIsImNvbnRyb2xzU2V0dXAiLCJjb250cm9scyIsImNvbnRyb2xzTG9vcCIsInVwZGF0ZSIsIlJlc2l6ZU1vZHVsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3YXJuRGVwcyIsIlJFVklTSU9OIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU9BLENBQUUsVUFBU0EsTUFBVCxFQUFpQjs7TUFHYkMsRUFBRSxHQUFHQyxNQUFNLENBQUNDLFNBQWhCO01BQ0lDLE1BQU0sR0FBR0gsRUFBRSxDQUFDSSxjQUFoQjtNQUNJQyxTQUFKLENBTGlCOztNQU1iQyxPQUFPLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixHQUErQkEsTUFBL0IsR0FBd0MsRUFBdEQ7TUFDSUMsY0FBYyxHQUFHRixPQUFPLENBQUNHLFFBQVIsSUFBb0IsWUFBekM7TUFDSUMsbUJBQW1CLEdBQUdKLE9BQU8sQ0FBQ0ssYUFBUixJQUF5QixpQkFBbkQ7TUFDSUMsaUJBQWlCLEdBQUdOLE9BQU8sQ0FBQ08sV0FBUixJQUF1QixlQUEvQztNQUdJQyxPQUFPLEdBQUdmLE1BQU0sQ0FBQ2dCLGtCQUFyQjs7TUFDSUQsT0FBSixFQUFhO0lBQ0c7OztNQUdaRSxjQUFBLEdBQWlCRixPQUFqQjtLQUpTOzs7OztHQWJJOzs7O0VBMEJqQkEsT0FBTyxHQUFHZixNQUFNLENBQUNnQixrQkFBUCxHQUE0QkUsQUFBV0QsTUFBTSxDQUFDRSxPQUFWLEFBQTlDOztXQUVTQyxJQUFULENBQWNDLE9BQWQsRUFBdUJDLE9BQXZCLEVBQWdDQyxJQUFoQyxFQUFzQ0MsV0FBdEMsRUFBbUQ7O1FBRTdDQyxjQUFjLEdBQUdILE9BQU8sSUFBSUEsT0FBTyxDQUFDbkIsU0FBUixZQUE2QnVCLFNBQXhDLEdBQW9ESixPQUFwRCxHQUE4REksU0FBbkY7UUFDSUMsU0FBUyxHQUFHekIsTUFBTSxDQUFDMEIsTUFBUCxDQUFjSCxjQUFjLENBQUN0QixTQUE3QixDQUFoQjtRQUNJMEIsT0FBTyxHQUFHLElBQUlDLE9BQUosQ0FBWU4sV0FBVyxJQUFJLEVBQTNCLENBQWQsQ0FKaUQ7OztJQVFqREcsU0FBUyxDQUFDSSxPQUFWLEdBQW9CQyxnQkFBZ0IsQ0FBQ1gsT0FBRCxFQUFVRSxJQUFWLEVBQWdCTSxPQUFoQixDQUFwQztXQUVPRixTQUFQOzs7RUFFRlosT0FBTyxDQUFDSyxJQUFSLEdBQWVBLElBQWYsQ0F4Q2lCOzs7Ozs7Ozs7OztXQW9EUmEsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0JDLEdBQXRCLEVBQTJCQyxHQUEzQixFQUFnQztRQUMxQjthQUNLO1FBQUVDLElBQUksRUFBRSxRQUFSO1FBQWtCRCxHQUFHLEVBQUVGLEVBQUUsQ0FBQ0ksSUFBSCxDQUFRSCxHQUFSLEVBQWFDLEdBQWI7T0FBOUI7S0FERixDQUVFLE9BQU9HLEdBQVAsRUFBWTthQUNMO1FBQUVGLElBQUksRUFBRSxPQUFSO1FBQWlCRCxHQUFHLEVBQUVHO09BQTdCOzs7O01BSUFDLHNCQUFzQixHQUFHLGdCQUE3QjtNQUNJQyxzQkFBc0IsR0FBRyxnQkFBN0I7TUFDSUMsaUJBQWlCLEdBQUcsV0FBeEI7TUFDSUMsaUJBQWlCLEdBQUcsV0FBeEIsQ0EvRGlCOzs7TUFtRWJDLGdCQUFnQixHQUFHLEVBQXZCLENBbkVpQjs7Ozs7V0F5RVJsQixTQUFULEdBQXFCOztXQUNabUIsaUJBQVQsR0FBNkI7O1dBQ3BCQywwQkFBVCxHQUFzQyxFQTNFckI7Ozs7TUErRWJDLGlCQUFpQixHQUFHLEVBQXhCOztFQUNBQSxpQkFBaUIsQ0FBQ3RDLGNBQUQsQ0FBakIsR0FBb0MsWUFBWTtXQUN2QyxJQUFQO0dBREY7O01BSUl1QyxRQUFRLEdBQUc5QyxNQUFNLENBQUMrQyxjQUF0QjtNQUNJQyx1QkFBdUIsR0FBR0YsUUFBUSxJQUFJQSxRQUFRLENBQUNBLFFBQVEsQ0FBQ0csTUFBTSxDQUFDLEVBQUQsQ0FBUCxDQUFULENBQWxEOztNQUNJRCx1QkFBdUIsSUFDdkJBLHVCQUF1QixLQUFLakQsRUFENUIsSUFFQUcsTUFBTSxDQUFDa0MsSUFBUCxDQUFZWSx1QkFBWixFQUFxQ3pDLGNBQXJDLENBRkosRUFFMEQ7OztJQUd4RHNDLGlCQUFpQixHQUFHRyx1QkFBcEI7OztNQUdFRSxFQUFFLEdBQUdOLDBCQUEwQixDQUFDM0MsU0FBM0IsR0FDUHVCLFNBQVMsQ0FBQ3ZCLFNBQVYsR0FBc0JELE1BQU0sQ0FBQzBCLE1BQVAsQ0FBY21CLGlCQUFkLENBRHhCO0VBRUFGLGlCQUFpQixDQUFDMUMsU0FBbEIsR0FBOEJpRCxFQUFFLENBQUNDLFdBQUgsR0FBaUJQLDBCQUEvQztFQUNBQSwwQkFBMEIsQ0FBQ08sV0FBM0IsR0FBeUNSLGlCQUF6QztFQUNBQywwQkFBMEIsQ0FBQ2pDLGlCQUFELENBQTFCLEdBQ0VnQyxpQkFBaUIsQ0FBQ1MsV0FBbEIsR0FBZ0MsbUJBRGxDLENBbEdpQjs7O1dBdUdSQyxxQkFBVCxDQUErQnBELFNBQS9CLEVBQTBDO0tBQ3ZDLE1BQUQsRUFBUyxPQUFULEVBQWtCLFFBQWxCLEVBQTRCcUQsT0FBNUIsQ0FBb0MsVUFBU0MsTUFBVCxFQUFpQjtNQUNuRHRELFNBQVMsQ0FBQ3NELE1BQUQsQ0FBVCxHQUFvQixVQUFTckIsR0FBVCxFQUFjO2VBQ3pCLEtBQUtMLE9BQUwsQ0FBYTBCLE1BQWIsRUFBcUJyQixHQUFyQixDQUFQO09BREY7S0FERjs7O0VBT0ZyQixPQUFPLENBQUMyQyxtQkFBUixHQUE4QixVQUFTQyxNQUFULEVBQWlCO1FBQ3pDQyxJQUFJLEdBQUcsT0FBT0QsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsTUFBTSxDQUFDTixXQUFsRDtXQUNPTyxJQUFJLEdBQ1BBLElBQUksS0FBS2YsaUJBQVQ7O0tBR0NlLElBQUksQ0FBQ04sV0FBTCxJQUFvQk0sSUFBSSxDQUFDQyxJQUExQixNQUFvQyxtQkFKN0IsR0FLUCxLQUxKO0dBRkY7O0VBVUE5QyxPQUFPLENBQUMrQyxJQUFSLEdBQWUsVUFBU0gsTUFBVCxFQUFpQjtRQUMxQnpELE1BQU0sQ0FBQzZELGNBQVgsRUFBMkI7TUFDekI3RCxNQUFNLENBQUM2RCxjQUFQLENBQXNCSixNQUF0QixFQUE4QmIsMEJBQTlCO0tBREYsTUFFTztNQUNMYSxNQUFNLENBQUNLLFNBQVAsR0FBbUJsQiwwQkFBbkI7O1VBQ0ksRUFBRWpDLGlCQUFpQixJQUFJOEMsTUFBdkIsQ0FBSixFQUFvQztRQUNsQ0EsTUFBTSxDQUFDOUMsaUJBQUQsQ0FBTixHQUE0QixtQkFBNUI7Ozs7SUFHSjhDLE1BQU0sQ0FBQ3hELFNBQVAsR0FBbUJELE1BQU0sQ0FBQzBCLE1BQVAsQ0FBY3dCLEVBQWQsQ0FBbkI7V0FDT08sTUFBUDtHQVZGLENBekhpQjs7Ozs7O0VBMElqQjVDLE9BQU8sQ0FBQ2tELEtBQVIsR0FBZ0IsVUFBUzdCLEdBQVQsRUFBYztXQUNyQjtNQUFFOEIsT0FBTyxFQUFFOUI7S0FBbEI7R0FERjs7V0FJUytCLGFBQVQsQ0FBdUJ4QyxTQUF2QixFQUFrQzthQUN2QnlDLE1BQVQsQ0FBZ0JYLE1BQWhCLEVBQXdCckIsR0FBeEIsRUFBNkJpQyxPQUE3QixFQUFzQ0MsTUFBdEMsRUFBOEM7VUFDeENDLE1BQU0sR0FBR3RDLFFBQVEsQ0FBQ04sU0FBUyxDQUFDOEIsTUFBRCxDQUFWLEVBQW9COUIsU0FBcEIsRUFBK0JTLEdBQS9CLENBQXJCOztVQUNJbUMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtRQUMzQmlDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDbkMsR0FBUixDQUFOO09BREYsTUFFTztZQUNEb0MsTUFBTSxHQUFHRCxNQUFNLENBQUNuQyxHQUFwQjtZQUNJcUMsS0FBSyxHQUFHRCxNQUFNLENBQUNDLEtBQW5COztZQUNJQSxLQUFLLElBQ0wsT0FBT0EsS0FBUCxLQUFpQixRQURqQixJQUVBckUsTUFBTSxDQUFDa0MsSUFBUCxDQUFZbUMsS0FBWixFQUFtQixTQUFuQixDQUZKLEVBRW1DO2lCQUMxQkMsT0FBTyxDQUFDTCxPQUFSLENBQWdCSSxLQUFLLENBQUNQLE9BQXRCLEVBQStCUyxJQUEvQixDQUFvQyxVQUFTRixLQUFULEVBQWdCO1lBQ3pETCxNQUFNLENBQUMsTUFBRCxFQUFTSyxLQUFULEVBQWdCSixPQUFoQixFQUF5QkMsTUFBekIsQ0FBTjtXQURLLEVBRUosVUFBUy9CLEdBQVQsRUFBYztZQUNmNkIsTUFBTSxDQUFDLE9BQUQsRUFBVTdCLEdBQVYsRUFBZThCLE9BQWYsRUFBd0JDLE1BQXhCLENBQU47V0FISyxDQUFQOzs7ZUFPS0ksT0FBTyxDQUFDTCxPQUFSLENBQWdCSSxLQUFoQixFQUF1QkUsSUFBdkIsQ0FBNEIsVUFBU0MsU0FBVCxFQUFvQjs7OztVQUlyREosTUFBTSxDQUFDQyxLQUFQLEdBQWVHLFNBQWY7VUFDQVAsT0FBTyxDQUFDRyxNQUFELENBQVA7U0FMSyxFQU1KLFVBQVNLLEtBQVQsRUFBZ0I7OztpQkFHVlQsTUFBTSxDQUFDLE9BQUQsRUFBVVMsS0FBVixFQUFpQlIsT0FBakIsRUFBMEJDLE1BQTFCLENBQWI7U0FUSyxDQUFQOzs7O1FBY0FRLGVBQUo7O2FBRVNDLE9BQVQsQ0FBaUJ0QixNQUFqQixFQUF5QnJCLEdBQXpCLEVBQThCO2VBQ25CNEMsMEJBQVQsR0FBc0M7ZUFDN0IsSUFBSU4sT0FBSixDQUFZLFVBQVNMLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO1VBQzNDRixNQUFNLENBQUNYLE1BQUQsRUFBU3JCLEdBQVQsRUFBY2lDLE9BQWQsRUFBdUJDLE1BQXZCLENBQU47U0FESyxDQUFQOzs7YUFLS1EsZUFBZTs7Ozs7Ozs7Ozs7O01BYXBCQSxlQUFlLEdBQUdBLGVBQWUsQ0FBQ0gsSUFBaEIsQ0FDaEJLLDBCQURnQjs7TUFJaEJBLDBCQUpnQixDQUFILEdBS1hBLDBCQUEwQixFQWxCaEM7S0F6QzhCOzs7O1NBZ0UzQmpELE9BQUwsR0FBZWdELE9BQWY7OztFQUdGeEIscUJBQXFCLENBQUNZLGFBQWEsQ0FBQ2hFLFNBQWYsQ0FBckI7O0VBQ0FnRSxhQUFhLENBQUNoRSxTQUFkLENBQXdCUSxtQkFBeEIsSUFBK0MsWUFBWTtXQUNsRCxJQUFQO0dBREY7O0VBR0FJLE9BQU8sQ0FBQ29ELGFBQVIsR0FBd0JBLGFBQXhCLENBck5pQjs7OztFQTBOakJwRCxPQUFPLENBQUNrRSxLQUFSLEdBQWdCLFVBQVM1RCxPQUFULEVBQWtCQyxPQUFsQixFQUEyQkMsSUFBM0IsRUFBaUNDLFdBQWpDLEVBQThDO1FBQ3hEMEQsSUFBSSxHQUFHLElBQUlmLGFBQUosQ0FDVC9DLElBQUksQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQW1CQyxJQUFuQixFQUF5QkMsV0FBekIsQ0FESyxDQUFYO1dBSU9ULE9BQU8sQ0FBQzJDLG1CQUFSLENBQTRCcEMsT0FBNUIsSUFDSDRELElBREc7TUFFSEEsSUFBSSxDQUFDQyxJQUFMLEdBQVlSLElBQVosQ0FBaUIsVUFBU0gsTUFBVCxFQUFpQjthQUN6QkEsTUFBTSxDQUFDWSxJQUFQLEdBQWNaLE1BQU0sQ0FBQ0MsS0FBckIsR0FBNkJTLElBQUksQ0FBQ0MsSUFBTCxFQUFwQztLQURGLENBRko7R0FMRjs7V0FZU25ELGdCQUFULENBQTBCWCxPQUExQixFQUFtQ0UsSUFBbkMsRUFBeUNNLE9BQXpDLEVBQWtEO1FBQzVDd0QsS0FBSyxHQUFHN0Msc0JBQVo7V0FFTyxTQUFTNEIsTUFBVCxDQUFnQlgsTUFBaEIsRUFBd0JyQixHQUF4QixFQUE2QjtVQUM5QmlELEtBQUssS0FBSzNDLGlCQUFkLEVBQWlDO2NBQ3pCLElBQUk0QyxLQUFKLENBQVUsOEJBQVYsQ0FBTjs7O1VBR0VELEtBQUssS0FBSzFDLGlCQUFkLEVBQWlDO1lBQzNCYyxNQUFNLEtBQUssT0FBZixFQUF3QjtnQkFDaEJyQixHQUFOO1NBRjZCOzs7O2VBT3hCbUQsVUFBVSxFQUFqQjs7O01BR0YxRCxPQUFPLENBQUM0QixNQUFSLEdBQWlCQSxNQUFqQjtNQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWNBLEdBQWQ7O2FBRU8sSUFBUCxFQUFhO1lBQ1BvRCxRQUFRLEdBQUczRCxPQUFPLENBQUMyRCxRQUF2Qjs7WUFDSUEsUUFBSixFQUFjO2NBQ1JDLGNBQWMsR0FBR0MsbUJBQW1CLENBQUNGLFFBQUQsRUFBVzNELE9BQVgsQ0FBeEM7O2NBQ0k0RCxjQUFKLEVBQW9CO2dCQUNkQSxjQUFjLEtBQUs3QyxnQkFBdkIsRUFBeUM7bUJBQ2xDNkMsY0FBUDs7OztZQUlBNUQsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixNQUF2QixFQUErQjs7O1VBRzdCNUIsT0FBTyxDQUFDOEQsSUFBUixHQUFlOUQsT0FBTyxDQUFDK0QsS0FBUixHQUFnQi9ELE9BQU8sQ0FBQ08sR0FBdkM7U0FIRixNQUtPLElBQUlQLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7Y0FDakM0QixLQUFLLEtBQUs3QyxzQkFBZCxFQUFzQztZQUNwQzZDLEtBQUssR0FBRzFDLGlCQUFSO2tCQUNNZCxPQUFPLENBQUNPLEdBQWQ7OztVQUdGUCxPQUFPLENBQUNnRSxpQkFBUixDQUEwQmhFLE9BQU8sQ0FBQ08sR0FBbEM7U0FOSyxNQVFBLElBQUlQLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsUUFBdkIsRUFBaUM7VUFDdEM1QixPQUFPLENBQUNpRSxNQUFSLENBQWUsUUFBZixFQUF5QmpFLE9BQU8sQ0FBQ08sR0FBakM7OztRQUdGaUQsS0FBSyxHQUFHM0MsaUJBQVI7WUFFSTZCLE1BQU0sR0FBR3RDLFFBQVEsQ0FBQ1osT0FBRCxFQUFVRSxJQUFWLEVBQWdCTSxPQUFoQixDQUFyQjs7WUFDSTBDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7OztVQUc1QmdELEtBQUssR0FBR3hELE9BQU8sQ0FBQ3VELElBQVIsR0FDSnpDLGlCQURJLEdBRUpGLHNCQUZKOztjQUlJOEIsTUFBTSxDQUFDbkMsR0FBUCxLQUFlUSxnQkFBbkIsRUFBcUM7Ozs7aUJBSTlCO1lBQ0w2QixLQUFLLEVBQUVGLE1BQU0sQ0FBQ25DLEdBRFQ7WUFFTGdELElBQUksRUFBRXZELE9BQU8sQ0FBQ3VEO1dBRmhCO1NBWEYsTUFnQk8sSUFBSWIsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtVQUNsQ2dELEtBQUssR0FBRzFDLGlCQUFSLENBRGtDOzs7VUFJbENkLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7VUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjbUMsTUFBTSxDQUFDbkMsR0FBckI7OztLQXJFTjtHQXpPZTs7Ozs7O1dBd1RSc0QsbUJBQVQsQ0FBNkJGLFFBQTdCLEVBQXVDM0QsT0FBdkMsRUFBZ0Q7UUFDMUM0QixNQUFNLEdBQUcrQixRQUFRLENBQUM5RSxRQUFULENBQWtCbUIsT0FBTyxDQUFDNEIsTUFBMUIsQ0FBYjs7UUFDSUEsTUFBTSxLQUFLbkQsU0FBZixFQUEwQjs7O01BR3hCdUIsT0FBTyxDQUFDMkQsUUFBUixHQUFtQixJQUFuQjs7VUFFSTNELE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7WUFDMUIrQixRQUFRLENBQUM5RSxRQUFULENBQWtCcUYsTUFBdEIsRUFBOEI7OztVQUc1QmxFLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsUUFBakI7VUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjOUIsU0FBZDtVQUNBb0YsbUJBQW1CLENBQUNGLFFBQUQsRUFBVzNELE9BQVgsQ0FBbkI7O2NBRUlBLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7OzttQkFHdkJiLGdCQUFQOzs7O1FBSUpmLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7UUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjLElBQUk0RCxTQUFKLENBQ1osZ0RBRFksQ0FBZDs7O2FBSUtwRCxnQkFBUDs7O1FBR0UyQixNQUFNLEdBQUd0QyxRQUFRLENBQUN3QixNQUFELEVBQVMrQixRQUFRLENBQUM5RSxRQUFsQixFQUE0Qm1CLE9BQU8sQ0FBQ08sR0FBcEMsQ0FBckI7O1FBRUltQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQXBCLEVBQTZCO01BQzNCUixPQUFPLENBQUM0QixNQUFSLEdBQWlCLE9BQWpCO01BQ0E1QixPQUFPLENBQUNPLEdBQVIsR0FBY21DLE1BQU0sQ0FBQ25DLEdBQXJCO01BQ0FQLE9BQU8sQ0FBQzJELFFBQVIsR0FBbUIsSUFBbkI7YUFDTzVDLGdCQUFQOzs7UUFHRXFELElBQUksR0FBRzFCLE1BQU0sQ0FBQ25DLEdBQWxCOztRQUVJLENBQUU2RCxJQUFOLEVBQVk7TUFDVnBFLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7TUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjLElBQUk0RCxTQUFKLENBQWMsa0NBQWQsQ0FBZDtNQUNBbkUsT0FBTyxDQUFDMkQsUUFBUixHQUFtQixJQUFuQjthQUNPNUMsZ0JBQVA7OztRQUdFcUQsSUFBSSxDQUFDYixJQUFULEVBQWU7OztNQUdidkQsT0FBTyxDQUFDMkQsUUFBUSxDQUFDVSxVQUFWLENBQVAsR0FBK0JELElBQUksQ0FBQ3hCLEtBQXBDLENBSGE7O01BTWI1QyxPQUFPLENBQUNzRCxJQUFSLEdBQWVLLFFBQVEsQ0FBQ1csT0FBeEIsQ0FOYTs7Ozs7OztVQWNUdEUsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixRQUF2QixFQUFpQztRQUMvQjVCLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsTUFBakI7UUFDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjOUIsU0FBZDs7S0FoQkosTUFtQk87O2FBRUUyRixJQUFQO0tBckU0Qzs7OztJQTBFOUNwRSxPQUFPLENBQUMyRCxRQUFSLEdBQW1CLElBQW5CO1dBQ081QyxnQkFBUDtHQW5ZZTs7OztFQXdZakJXLHFCQUFxQixDQUFDSCxFQUFELENBQXJCO0VBRUFBLEVBQUUsQ0FBQ3ZDLGlCQUFELENBQUYsR0FBd0IsV0FBeEIsQ0ExWWlCOzs7Ozs7RUFpWmpCdUMsRUFBRSxDQUFDM0MsY0FBRCxDQUFGLEdBQXFCLFlBQVc7V0FDdkIsSUFBUDtHQURGOztFQUlBMkMsRUFBRSxDQUFDZ0QsUUFBSCxHQUFjLFlBQVc7V0FDaEIsb0JBQVA7R0FERjs7V0FJU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEI7UUFDdEJDLEtBQUssR0FBRztNQUFFQyxNQUFNLEVBQUVGLElBQUksQ0FBQyxDQUFEO0tBQTFCOztRQUVJLEtBQUtBLElBQVQsRUFBZTtNQUNiQyxLQUFLLENBQUNFLFFBQU4sR0FBaUJILElBQUksQ0FBQyxDQUFELENBQXJCOzs7UUFHRSxLQUFLQSxJQUFULEVBQWU7TUFDYkMsS0FBSyxDQUFDRyxVQUFOLEdBQW1CSixJQUFJLENBQUMsQ0FBRCxDQUF2QjtNQUNBQyxLQUFLLENBQUNJLFFBQU4sR0FBaUJMLElBQUksQ0FBQyxDQUFELENBQXJCOzs7U0FHR00sVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUJOLEtBQXJCOzs7V0FHT08sYUFBVCxDQUF1QlAsS0FBdkIsRUFBOEI7UUFDeEJoQyxNQUFNLEdBQUdnQyxLQUFLLENBQUNRLFVBQU4sSUFBb0IsRUFBakM7SUFDQXhDLE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxRQUFkO1dBQ09rQyxNQUFNLENBQUNuQyxHQUFkO0lBQ0FtRSxLQUFLLENBQUNRLFVBQU4sR0FBbUJ4QyxNQUFuQjs7O1dBR096QyxPQUFULENBQWlCTixXQUFqQixFQUE4Qjs7OztTQUl2Qm9GLFVBQUwsR0FBa0IsQ0FBQztNQUFFSixNQUFNLEVBQUU7S0FBWCxDQUFsQjtJQUNBaEYsV0FBVyxDQUFDZ0MsT0FBWixDQUFvQjZDLFlBQXBCLEVBQWtDLElBQWxDO1NBQ0tXLEtBQUwsQ0FBVyxJQUFYOzs7RUFHRmpHLE9BQU8sQ0FBQ2tHLElBQVIsR0FBZSxVQUFTQyxNQUFULEVBQWlCO1FBQzFCRCxJQUFJLEdBQUcsRUFBWDs7U0FDSyxJQUFJRSxHQUFULElBQWdCRCxNQUFoQixFQUF3QjtNQUN0QkQsSUFBSSxDQUFDSixJQUFMLENBQVVNLEdBQVY7OztJQUVGRixJQUFJLENBQUNHLE9BQUwsR0FMOEI7OztXQVN2QixTQUFTakMsSUFBVCxHQUFnQjthQUNkOEIsSUFBSSxDQUFDSSxNQUFaLEVBQW9CO1lBQ2RGLEdBQUcsR0FBR0YsSUFBSSxDQUFDSyxHQUFMLEVBQVY7O1lBQ0lILEdBQUcsSUFBSUQsTUFBWCxFQUFtQjtVQUNqQi9CLElBQUksQ0FBQ1YsS0FBTCxHQUFhMEMsR0FBYjtVQUNBaEMsSUFBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjtpQkFDT0QsSUFBUDs7T0FOaUI7Ozs7O01BYXJCQSxJQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO2FBQ09ELElBQVA7S0FkRjtHQVRGOztXQTJCU2hDLE1BQVQsQ0FBZ0JvRSxRQUFoQixFQUEwQjtRQUNwQkEsUUFBSixFQUFjO1VBQ1JDLGNBQWMsR0FBR0QsUUFBUSxDQUFDOUcsY0FBRCxDQUE3Qjs7VUFDSStHLGNBQUosRUFBb0I7ZUFDWEEsY0FBYyxDQUFDbEYsSUFBZixDQUFvQmlGLFFBQXBCLENBQVA7OztVQUdFLE9BQU9BLFFBQVEsQ0FBQ3BDLElBQWhCLEtBQXlCLFVBQTdCLEVBQXlDO2VBQ2hDb0MsUUFBUDs7O1VBR0UsQ0FBQ0UsS0FBSyxDQUFDRixRQUFRLENBQUNGLE1BQVYsQ0FBVixFQUE2QjtZQUN2QkssQ0FBQyxHQUFHLENBQUMsQ0FBVDtZQUFZdkMsSUFBSSxHQUFHLFNBQVNBLElBQVQsR0FBZ0I7aUJBQzFCLEVBQUV1QyxDQUFGLEdBQU1ILFFBQVEsQ0FBQ0YsTUFBdEIsRUFBOEI7Z0JBQ3hCakgsTUFBTSxDQUFDa0MsSUFBUCxDQUFZaUYsUUFBWixFQUFzQkcsQ0FBdEIsQ0FBSixFQUE4QjtjQUM1QnZDLElBQUksQ0FBQ1YsS0FBTCxHQUFhOEMsUUFBUSxDQUFDRyxDQUFELENBQXJCO2NBQ0F2QyxJQUFJLENBQUNDLElBQUwsR0FBWSxLQUFaO3FCQUNPRCxJQUFQOzs7O1VBSUpBLElBQUksQ0FBQ1YsS0FBTCxHQUFhbkUsU0FBYjtVQUNBNkUsSUFBSSxDQUFDQyxJQUFMLEdBQVksSUFBWjtpQkFFT0QsSUFBUDtTQVpGOztlQWVPQSxJQUFJLENBQUNBLElBQUwsR0FBWUEsSUFBbkI7O0tBM0JvQjs7O1dBZ0NqQjtNQUFFQSxJQUFJLEVBQUVJO0tBQWY7OztFQUVGeEUsT0FBTyxDQUFDb0MsTUFBUixHQUFpQkEsTUFBakI7O1dBRVNvQyxVQUFULEdBQXNCO1dBQ2I7TUFBRWQsS0FBSyxFQUFFbkUsU0FBVDtNQUFvQjhFLElBQUksRUFBRTtLQUFqQzs7O0VBR0Z0RCxPQUFPLENBQUMzQixTQUFSLEdBQW9CO0lBQ2xCa0QsV0FBVyxFQUFFdkIsT0FESztJQUdsQmtGLEtBQUssRUFBRSxVQUFTVyxhQUFULEVBQXdCO1dBQ3hCQyxJQUFMLEdBQVksQ0FBWjtXQUNLekMsSUFBTCxHQUFZLENBQVosQ0FGNkI7OztXQUt4QlEsSUFBTCxHQUFZLEtBQUtDLEtBQUwsR0FBYXRGLFNBQXpCO1dBQ0s4RSxJQUFMLEdBQVksS0FBWjtXQUNLSSxRQUFMLEdBQWdCLElBQWhCO1dBRUsvQixNQUFMLEdBQWMsTUFBZDtXQUNLckIsR0FBTCxHQUFXOUIsU0FBWDtXQUVLc0csVUFBTCxDQUFnQnBELE9BQWhCLENBQXdCc0QsYUFBeEI7O1VBRUksQ0FBQ2EsYUFBTCxFQUFvQjthQUNiLElBQUk5RCxJQUFULElBQWlCLElBQWpCLEVBQXVCOztjQUVqQkEsSUFBSSxDQUFDZ0UsTUFBTCxDQUFZLENBQVosTUFBbUIsR0FBbkIsSUFDQXpILE1BQU0sQ0FBQ2tDLElBQVAsQ0FBWSxJQUFaLEVBQWtCdUIsSUFBbEIsQ0FEQSxJQUVBLENBQUM0RCxLQUFLLENBQUMsQ0FBQzVELElBQUksQ0FBQ2lFLEtBQUwsQ0FBVyxDQUFYLENBQUYsQ0FGVixFQUU0QjtpQkFDckJqRSxJQUFMLElBQWF2RCxTQUFiOzs7O0tBdkJVO0lBNkJsQnlILElBQUksRUFBRSxZQUFXO1dBQ1YzQyxJQUFMLEdBQVksSUFBWjtVQUVJNEMsU0FBUyxHQUFHLEtBQUtwQixVQUFMLENBQWdCLENBQWhCLENBQWhCO1VBQ0lxQixVQUFVLEdBQUdELFNBQVMsQ0FBQ2pCLFVBQTNCOztVQUNJa0IsVUFBVSxDQUFDNUYsSUFBWCxLQUFvQixPQUF4QixFQUFpQztjQUN6QjRGLFVBQVUsQ0FBQzdGLEdBQWpCOzs7YUFHSyxLQUFLOEYsSUFBWjtLQXRDZ0I7SUF5Q2xCckMsaUJBQWlCLEVBQUUsVUFBU3NDLFNBQVQsRUFBb0I7VUFDakMsS0FBSy9DLElBQVQsRUFBZTtjQUNQK0MsU0FBTjs7O1VBR0V0RyxPQUFPLEdBQUcsSUFBZDs7ZUFDU3VHLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCQyxNQUFyQixFQUE2QjtRQUMzQi9ELE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxPQUFkO1FBQ0FrQyxNQUFNLENBQUNuQyxHQUFQLEdBQWErRixTQUFiO1FBQ0F0RyxPQUFPLENBQUNzRCxJQUFSLEdBQWVrRCxHQUFmOztZQUVJQyxNQUFKLEVBQVk7OztVQUdWekcsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixNQUFqQjtVQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWM5QixTQUFkOzs7ZUFHSyxDQUFDLENBQUVnSSxNQUFWOzs7V0FHRyxJQUFJWixDQUFDLEdBQUcsS0FBS2QsVUFBTCxDQUFnQlMsTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUNLLENBQUMsSUFBSSxDQUE5QyxFQUFpRCxFQUFFQSxDQUFuRCxFQUFzRDtZQUNoRG5CLEtBQUssR0FBRyxLQUFLSyxVQUFMLENBQWdCYyxDQUFoQixDQUFaO1lBQ0luRCxNQUFNLEdBQUdnQyxLQUFLLENBQUNRLFVBQW5COztZQUVJUixLQUFLLENBQUNDLE1BQU4sS0FBaUIsTUFBckIsRUFBNkI7Ozs7aUJBSXBCNEIsTUFBTSxDQUFDLEtBQUQsQ0FBYjs7O1lBR0U3QixLQUFLLENBQUNDLE1BQU4sSUFBZ0IsS0FBS29CLElBQXpCLEVBQStCO2NBQ3pCVyxRQUFRLEdBQUduSSxNQUFNLENBQUNrQyxJQUFQLENBQVlpRSxLQUFaLEVBQW1CLFVBQW5CLENBQWY7Y0FDSWlDLFVBQVUsR0FBR3BJLE1BQU0sQ0FBQ2tDLElBQVAsQ0FBWWlFLEtBQVosRUFBbUIsWUFBbkIsQ0FBakI7O2NBRUlnQyxRQUFRLElBQUlDLFVBQWhCLEVBQTRCO2dCQUN0QixLQUFLWixJQUFMLEdBQVlyQixLQUFLLENBQUNFLFFBQXRCLEVBQWdDO3FCQUN2QjJCLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQ0UsUUFBUCxFQUFpQixJQUFqQixDQUFiO2FBREYsTUFFTyxJQUFJLEtBQUttQixJQUFMLEdBQVlyQixLQUFLLENBQUNHLFVBQXRCLEVBQWtDO3FCQUNoQzBCLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQ0csVUFBUCxDQUFiOztXQUpKLE1BT08sSUFBSTZCLFFBQUosRUFBYztnQkFDZixLQUFLWCxJQUFMLEdBQVlyQixLQUFLLENBQUNFLFFBQXRCLEVBQWdDO3FCQUN2QjJCLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQ0UsUUFBUCxFQUFpQixJQUFqQixDQUFiOztXQUZHLE1BS0EsSUFBSStCLFVBQUosRUFBZ0I7Z0JBQ2pCLEtBQUtaLElBQUwsR0FBWXJCLEtBQUssQ0FBQ0csVUFBdEIsRUFBa0M7cUJBQ3pCMEIsTUFBTSxDQUFDN0IsS0FBSyxDQUFDRyxVQUFQLENBQWI7O1dBRkcsTUFLQTtrQkFDQyxJQUFJcEIsS0FBSixDQUFVLHdDQUFWLENBQU47Ozs7S0EvRlU7SUFxR2xCUSxNQUFNLEVBQUUsVUFBU3pELElBQVQsRUFBZUQsR0FBZixFQUFvQjtXQUNyQixJQUFJc0YsQ0FBQyxHQUFHLEtBQUtkLFVBQUwsQ0FBZ0JTLE1BQWhCLEdBQXlCLENBQXRDLEVBQXlDSyxDQUFDLElBQUksQ0FBOUMsRUFBaUQsRUFBRUEsQ0FBbkQsRUFBc0Q7WUFDaERuQixLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQmMsQ0FBaEIsQ0FBWjs7WUFDSW5CLEtBQUssQ0FBQ0MsTUFBTixJQUFnQixLQUFLb0IsSUFBckIsSUFDQXhILE1BQU0sQ0FBQ2tDLElBQVAsQ0FBWWlFLEtBQVosRUFBbUIsWUFBbkIsQ0FEQSxJQUVBLEtBQUtxQixJQUFMLEdBQVlyQixLQUFLLENBQUNHLFVBRnRCLEVBRWtDO2NBQzVCK0IsWUFBWSxHQUFHbEMsS0FBbkI7Ozs7O1VBS0FrQyxZQUFZLEtBQ1hwRyxJQUFJLEtBQUssT0FBVCxJQUNBQSxJQUFJLEtBQUssVUFGRSxDQUFaLElBR0FvRyxZQUFZLENBQUNqQyxNQUFiLElBQXVCcEUsR0FIdkIsSUFJQUEsR0FBRyxJQUFJcUcsWUFBWSxDQUFDL0IsVUFKeEIsRUFJb0M7OztRQUdsQytCLFlBQVksR0FBRyxJQUFmOzs7VUFHRWxFLE1BQU0sR0FBR2tFLFlBQVksR0FBR0EsWUFBWSxDQUFDMUIsVUFBaEIsR0FBNkIsRUFBdEQ7TUFDQXhDLE1BQU0sQ0FBQ2xDLElBQVAsR0FBY0EsSUFBZDtNQUNBa0MsTUFBTSxDQUFDbkMsR0FBUCxHQUFhQSxHQUFiOztVQUVJcUcsWUFBSixFQUFrQjthQUNYaEYsTUFBTCxHQUFjLE1BQWQ7YUFDSzBCLElBQUwsR0FBWXNELFlBQVksQ0FBQy9CLFVBQXpCO2VBQ085RCxnQkFBUDs7O2FBR0ssS0FBSzhGLFFBQUwsQ0FBY25FLE1BQWQsQ0FBUDtLQXBJZ0I7SUF1SWxCbUUsUUFBUSxFQUFFLFVBQVNuRSxNQUFULEVBQWlCb0MsUUFBakIsRUFBMkI7VUFDL0JwQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQXBCLEVBQTZCO2NBQ3JCa0MsTUFBTSxDQUFDbkMsR0FBYjs7O1VBR0VtQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQWhCLElBQ0FrQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLFVBRHBCLEVBQ2dDO2FBQ3pCOEMsSUFBTCxHQUFZWixNQUFNLENBQUNuQyxHQUFuQjtPQUZGLE1BR08sSUFBSW1DLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7YUFDOUI2RixJQUFMLEdBQVksS0FBSzlGLEdBQUwsR0FBV21DLE1BQU0sQ0FBQ25DLEdBQTlCO2FBQ0txQixNQUFMLEdBQWMsUUFBZDthQUNLMEIsSUFBTCxHQUFZLEtBQVo7T0FISyxNQUlBLElBQUlaLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJzRSxRQUFoQyxFQUEwQzthQUMxQ3hCLElBQUwsR0FBWXdCLFFBQVo7OzthQUdLL0QsZ0JBQVA7S0F2SmdCO0lBMEpsQitGLE1BQU0sRUFBRSxVQUFTakMsVUFBVCxFQUFxQjtXQUN0QixJQUFJZ0IsQ0FBQyxHQUFHLEtBQUtkLFVBQUwsQ0FBZ0JTLE1BQWhCLEdBQXlCLENBQXRDLEVBQXlDSyxDQUFDLElBQUksQ0FBOUMsRUFBaUQsRUFBRUEsQ0FBbkQsRUFBc0Q7WUFDaERuQixLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQmMsQ0FBaEIsQ0FBWjs7WUFDSW5CLEtBQUssQ0FBQ0csVUFBTixLQUFxQkEsVUFBekIsRUFBcUM7ZUFDOUJnQyxRQUFMLENBQWNuQyxLQUFLLENBQUNRLFVBQXBCLEVBQWdDUixLQUFLLENBQUNJLFFBQXRDO1VBQ0FHLGFBQWEsQ0FBQ1AsS0FBRCxDQUFiO2lCQUNPM0QsZ0JBQVA7OztLQWhLWTthQXFLVCxVQUFTNEQsTUFBVCxFQUFpQjtXQUNuQixJQUFJa0IsQ0FBQyxHQUFHLEtBQUtkLFVBQUwsQ0FBZ0JTLE1BQWhCLEdBQXlCLENBQXRDLEVBQXlDSyxDQUFDLElBQUksQ0FBOUMsRUFBaUQsRUFBRUEsQ0FBbkQsRUFBc0Q7WUFDaERuQixLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQmMsQ0FBaEIsQ0FBWjs7WUFDSW5CLEtBQUssQ0FBQ0MsTUFBTixLQUFpQkEsTUFBckIsRUFBNkI7Y0FDdkJqQyxNQUFNLEdBQUdnQyxLQUFLLENBQUNRLFVBQW5COztjQUNJeEMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtnQkFDdkJ1RyxNQUFNLEdBQUdyRSxNQUFNLENBQUNuQyxHQUFwQjtZQUNBMEUsYUFBYSxDQUFDUCxLQUFELENBQWI7OztpQkFFS3FDLE1BQVA7O09BVG9COzs7O1lBZWxCLElBQUl0RCxLQUFKLENBQVUsdUJBQVYsQ0FBTjtLQXBMZ0I7SUF1TGxCdUQsYUFBYSxFQUFFLFVBQVN0QixRQUFULEVBQW1CckIsVUFBbkIsRUFBK0JDLE9BQS9CLEVBQXdDO1dBQ2hEWCxRQUFMLEdBQWdCO1FBQ2Q5RSxRQUFRLEVBQUV5QyxNQUFNLENBQUNvRSxRQUFELENBREY7UUFFZHJCLFVBQVUsRUFBRUEsVUFGRTtRQUdkQyxPQUFPLEVBQUVBO09BSFg7O1VBTUksS0FBSzFDLE1BQUwsS0FBZ0IsTUFBcEIsRUFBNEI7OzthQUdyQnJCLEdBQUwsR0FBVzlCLFNBQVg7OzthQUdLc0MsZ0JBQVA7O0dBcE1KO0NBM2ZEOzs7QUFzc0JFLFlBQVc7U0FDSCxRQUFTLE9BQU9yQixJQUFQLEtBQWdCLFFBQWhCLElBQTRCQSxJQUE1QztDQURGLE1BRVF1SCxRQUFRLENBQUMsYUFBRCxDQUFSLEVBeHNCVCxDQUFEOzs7QUNQQTs7Ozs7Ozs7QUFTQSxJQUFJQyxDQUFDLEdBQUksWUFBVztTQUNYLFFBQVMsT0FBT3hILElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLElBQTVDO0NBRE0sTUFFQXVILFFBQVEsQ0FBQyxhQUFELENBQVIsRUFGUjs7OztBQU1BLElBQUlFLFVBQVUsR0FBR0QsQ0FBQyxDQUFDL0gsa0JBQUYsSUFDZmQsTUFBTSxDQUFDK0ksbUJBQVAsQ0FBMkJGLENBQTNCLEVBQThCRyxPQUE5QixDQUFzQyxvQkFBdEMsS0FBK0QsQ0FEakU7O0FBSUEsSUFBSUMsVUFBVSxHQUFHSCxVQUFVLElBQUlELENBQUMsQ0FBQy9ILGtCQUFqQzs7QUFHQStILENBQUMsQ0FBQy9ILGtCQUFGLEdBQXVCVixTQUF2QjtBQUVBVyxpQkFBQSxHQUFpQm1JLE9BQWpCOztBQUVBLElBQUlKLFVBQUosRUFBZ0I7O0VBRWRELENBQUMsQ0FBQy9ILGtCQUFGLEdBQXVCbUksVUFBdkI7Q0FGRixNQUdPOztNQUVEO1dBQ0tKLENBQUMsQ0FBQy9ILGtCQUFUO0dBREYsQ0FFRSxPQUFNcUksQ0FBTixFQUFTO0lBQ1ROLENBQUMsQ0FBQy9ILGtCQUFGLEdBQXVCVixTQUF2Qjs7OztBQ2xDSlcsZUFBQSxHQUFpQm1JLGFBQWpCOztBQ0FBLFNBQVNFLGtCQUFULENBQTRCQyxHQUE1QixFQUFpQ2xGLE9BQWpDLEVBQTBDQyxNQUExQyxFQUFrRGtGLEtBQWxELEVBQXlEQyxNQUF6RCxFQUFpRXRDLEdBQWpFLEVBQXNFL0UsR0FBdEUsRUFBMkU7TUFDckU7UUFDRTZELElBQUksR0FBR3NELEdBQUcsQ0FBQ3BDLEdBQUQsQ0FBSCxDQUFTL0UsR0FBVCxDQUFYO1FBQ0lxQyxLQUFLLEdBQUd3QixJQUFJLENBQUN4QixLQUFqQjtHQUZGLENBR0UsT0FBT0ksS0FBUCxFQUFjO0lBQ2RQLE1BQU0sQ0FBQ08sS0FBRCxDQUFOOzs7O01BSUVvQixJQUFJLENBQUNiLElBQVQsRUFBZTtJQUNiZixPQUFPLENBQUNJLEtBQUQsQ0FBUDtHQURGLE1BRU87SUFDTEMsT0FBTyxDQUFDTCxPQUFSLENBQWdCSSxLQUFoQixFQUF1QkUsSUFBdkIsQ0FBNEI2RSxLQUE1QixFQUFtQ0MsTUFBbkM7Ozs7QUFJSixTQUFTQyxpQkFBVCxDQUEyQnhILEVBQTNCLEVBQStCO1NBQ3RCLFlBQVk7UUFDYlgsSUFBSSxHQUFHLElBQVg7UUFDSW9JLElBQUksR0FBR0MsU0FEWDtXQUVPLElBQUlsRixPQUFKLENBQVksVUFBVUwsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7VUFDeENpRixHQUFHLEdBQUdySCxFQUFFLENBQUMySCxLQUFILENBQVN0SSxJQUFULEVBQWVvSSxJQUFmLENBQVY7O2VBRVNILEtBQVQsQ0FBZS9FLEtBQWYsRUFBc0I7UUFDcEI2RSxrQkFBa0IsQ0FBQ0MsR0FBRCxFQUFNbEYsT0FBTixFQUFlQyxNQUFmLEVBQXVCa0YsS0FBdkIsRUFBOEJDLE1BQTlCLEVBQXNDLE1BQXRDLEVBQThDaEYsS0FBOUMsQ0FBbEI7OztlQUdPZ0YsTUFBVCxDQUFnQmxILEdBQWhCLEVBQXFCO1FBQ25CK0csa0JBQWtCLENBQUNDLEdBQUQsRUFBTWxGLE9BQU4sRUFBZUMsTUFBZixFQUF1QmtGLEtBQXZCLEVBQThCQyxNQUE5QixFQUFzQyxPQUF0QyxFQUErQ2xILEdBQS9DLENBQWxCOzs7TUFHRmlILEtBQUssQ0FBQ2xKLFNBQUQsQ0FBTDtLQVhLLENBQVA7R0FIRjs7O0FBbUJGVyxvQkFBQSxHQUFpQnlJLGlCQUFqQjs7QUNwQ0EsU0FBU0ksZUFBVCxDQUF5QkMsUUFBekIsRUFBbUNDLFdBQW5DLEVBQWdEO01BQzFDLEVBQUVELFFBQVEsWUFBWUMsV0FBdEIsQ0FBSixFQUF3QztVQUNoQyxJQUFJaEUsU0FBSixDQUFjLG1DQUFkLENBQU47Ozs7QUFJSi9FLGtCQUFBLEdBQWlCNkksZUFBakI7O0FDTkEsU0FBU0csaUJBQVQsQ0FBMkJDLE1BQTNCLEVBQW1DQyxLQUFuQyxFQUEwQztPQUNuQyxJQUFJekMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3lDLEtBQUssQ0FBQzlDLE1BQTFCLEVBQWtDSyxDQUFDLEVBQW5DLEVBQXVDO1FBQ2pDMEMsVUFBVSxHQUFHRCxLQUFLLENBQUN6QyxDQUFELENBQXRCO0lBQ0EwQyxVQUFVLENBQUNDLFVBQVgsR0FBd0JELFVBQVUsQ0FBQ0MsVUFBWCxJQUF5QixLQUFqRDtJQUNBRCxVQUFVLENBQUNFLFlBQVgsR0FBMEIsSUFBMUI7UUFDSSxXQUFXRixVQUFmLEVBQTJCQSxVQUFVLENBQUNHLFFBQVgsR0FBc0IsSUFBdEI7SUFDM0JySyxNQUFNLENBQUNzSyxjQUFQLENBQXNCTixNQUF0QixFQUE4QkUsVUFBVSxDQUFDakQsR0FBekMsRUFBOENpRCxVQUE5Qzs7OztBQUlKLFNBQVNLLFlBQVQsQ0FBc0JULFdBQXRCLEVBQW1DVSxVQUFuQyxFQUErQ0MsV0FBL0MsRUFBNEQ7TUFDdERELFVBQUosRUFBZ0JULGlCQUFpQixDQUFDRCxXQUFXLENBQUM3SixTQUFiLEVBQXdCdUssVUFBeEIsQ0FBakI7TUFDWkMsV0FBSixFQUFpQlYsaUJBQWlCLENBQUNELFdBQUQsRUFBY1csV0FBZCxDQUFqQjtTQUNWWCxXQUFQOzs7QUFHRi9JLGVBQUEsR0FBaUJ3SixZQUFqQjs7O0FDaEJBLFNBQVNHLFFBQVQsQ0FBa0J6SSxHQUFsQixFQUF1QjtNQUFNLE9BQU8zQixNQUFQLEtBQWtCLFVBQWxCLElBQWdDLE9BQU9BLE1BQU0sQ0FBQ0UsUUFBZCxLQUEyQixRQUEvRCxFQUF5RTtJQUFFa0ssUUFBUSxHQUFHLFNBQVNBLFFBQVQsQ0FBa0J6SSxHQUFsQixFQUF1QjthQUFTLE9BQU9BLEdBQWQ7S0FBcEM7R0FBM0UsTUFBNEk7SUFBRXlJLFFBQVEsR0FBRyxTQUFTQSxRQUFULENBQWtCekksR0FBbEIsRUFBdUI7YUFBU0EsR0FBRyxJQUFJLE9BQU8zQixNQUFQLEtBQWtCLFVBQXpCLElBQXVDMkIsR0FBRyxDQUFDa0IsV0FBSixLQUFvQjdDLE1BQTNELElBQXFFMkIsR0FBRyxLQUFLM0IsTUFBTSxDQUFDTCxTQUFwRixHQUFnRyxRQUFoRyxHQUEyRyxPQUFPZ0MsR0FBekg7S0FBcEM7OztTQUE4S3lJLFFBQVEsQ0FBQ3pJLEdBQUQsQ0FBZjs7O0FBRTlVLFNBQVMwSSxPQUFULENBQWlCMUksR0FBakIsRUFBc0I7TUFDaEIsT0FBTzNCLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NvSyxRQUFRLENBQUNwSyxNQUFNLENBQUNFLFFBQVIsQ0FBUixLQUE4QixRQUFsRSxFQUE0RTtJQUMxRU8sY0FBQSxHQUFpQjRKLE9BQU8sR0FBRyxTQUFTQSxPQUFULENBQWlCMUksR0FBakIsRUFBc0I7YUFDeEN5SSxRQUFRLENBQUN6SSxHQUFELENBQWY7S0FERjtHQURGLE1BSU87SUFDTGxCLGNBQUEsR0FBaUI0SixPQUFPLEdBQUcsU0FBU0EsT0FBVCxDQUFpQjFJLEdBQWpCLEVBQXNCO2FBQ3hDQSxHQUFHLElBQUksT0FBTzNCLE1BQVAsS0FBa0IsVUFBekIsSUFBdUMyQixHQUFHLENBQUNrQixXQUFKLEtBQW9CN0MsTUFBM0QsSUFBcUUyQixHQUFHLEtBQUszQixNQUFNLENBQUNMLFNBQXBGLEdBQWdHLFFBQWhHLEdBQTJHeUssUUFBUSxDQUFDekksR0FBRCxDQUExSDtLQURGOzs7U0FLSzBJLE9BQU8sQ0FBQzFJLEdBQUQsQ0FBZDs7O0FBR0ZsQixjQUFBLEdBQWlCNEosT0FBakI7OztBQ2hCQSxTQUFTQyxzQkFBVCxDQUFnQ3ZKLElBQWhDLEVBQXNDO01BQ2hDQSxJQUFJLEtBQUssS0FBSyxDQUFsQixFQUFxQjtVQUNiLElBQUl3SixjQUFKLENBQW1CLDJEQUFuQixDQUFOOzs7U0FHS3hKLElBQVA7OztBQUdGTix5QkFBQSxHQUFpQjZKLHNCQUFqQjs7QUNKQSxTQUFTRSwwQkFBVCxDQUFvQ3pKLElBQXBDLEVBQTBDZSxJQUExQyxFQUFnRDtNQUMxQ0EsSUFBSSxLQUFLdUksU0FBTyxDQUFDdkksSUFBRCxDQUFQLEtBQWtCLFFBQWxCLElBQThCLE9BQU9BLElBQVAsS0FBZ0IsVUFBbkQsQ0FBUixFQUF3RTtXQUMvREEsSUFBUDs7O1NBR0sySSxxQkFBcUIsQ0FBQzFKLElBQUQsQ0FBNUI7OztBQUdGTiw2QkFBQSxHQUFpQitKLDBCQUFqQjs7O0FDWkEsU0FBU0UsZUFBVCxDQUF5QkMsQ0FBekIsRUFBNEI7RUFDMUJsSyxjQUFBLEdBQWlCaUssZUFBZSxHQUFHaEwsTUFBTSxDQUFDNkQsY0FBUCxHQUF3QjdELE1BQU0sQ0FBQytDLGNBQS9CLEdBQWdELFNBQVNpSSxlQUFULENBQXlCQyxDQUF6QixFQUE0QjtXQUN0R0EsQ0FBQyxDQUFDbkgsU0FBRixJQUFlOUQsTUFBTSxDQUFDK0MsY0FBUCxDQUFzQmtJLENBQXRCLENBQXRCO0dBREY7U0FHT0QsZUFBZSxDQUFDQyxDQUFELENBQXRCOzs7QUFHRmxLLGNBQUEsR0FBaUJpSyxlQUFqQjs7OztBQ1BBLFNBQVNFLGVBQVQsQ0FBeUJELENBQXpCLEVBQTRCRSxDQUE1QixFQUErQjtFQUM3QnBLLGNBQUEsR0FBaUJtSyxlQUFlLEdBQUdsTCxNQUFNLENBQUM2RCxjQUFQLElBQXlCLFNBQVNxSCxlQUFULENBQXlCRCxDQUF6QixFQUE0QkUsQ0FBNUIsRUFBK0I7SUFDekZGLENBQUMsQ0FBQ25ILFNBQUYsR0FBY3FILENBQWQ7V0FDT0YsQ0FBUDtHQUZGOztTQUtPQyxlQUFlLENBQUNELENBQUQsRUFBSUUsQ0FBSixDQUF0Qjs7O0FBR0ZwSyxjQUFBLEdBQWlCbUssZUFBakI7OztBQ1BBLFNBQVNFLFNBQVQsQ0FBbUJDLFFBQW5CLEVBQTZCQyxVQUE3QixFQUF5QztNQUNuQyxPQUFPQSxVQUFQLEtBQXNCLFVBQXRCLElBQW9DQSxVQUFVLEtBQUssSUFBdkQsRUFBNkQ7VUFDckQsSUFBSXhGLFNBQUosQ0FBYyxvREFBZCxDQUFOOzs7RUFHRnVGLFFBQVEsQ0FBQ3BMLFNBQVQsR0FBcUJELE1BQU0sQ0FBQzBCLE1BQVAsQ0FBYzRKLFVBQVUsSUFBSUEsVUFBVSxDQUFDckwsU0FBdkMsRUFBa0Q7SUFDckVrRCxXQUFXLEVBQUU7TUFDWG9CLEtBQUssRUFBRThHLFFBREk7TUFFWGhCLFFBQVEsRUFBRSxJQUZDO01BR1hELFlBQVksRUFBRTs7R0FKRyxDQUFyQjtNQU9Ja0IsVUFBSixFQUFnQnpILGNBQWMsQ0FBQ3dILFFBQUQsRUFBV0MsVUFBWCxDQUFkOzs7QUFHbEJ2SyxZQUFBLEdBQWlCcUssU0FBakI7O0FDakJBLFNBQVNHLGVBQVQsQ0FBeUJ0SixHQUF6QixFQUE4QmdGLEdBQTlCLEVBQW1DMUMsS0FBbkMsRUFBMEM7TUFDcEMwQyxHQUFHLElBQUloRixHQUFYLEVBQWdCO0lBQ2RqQyxNQUFNLENBQUNzSyxjQUFQLENBQXNCckksR0FBdEIsRUFBMkJnRixHQUEzQixFQUFnQztNQUM5QjFDLEtBQUssRUFBRUEsS0FEdUI7TUFFOUI0RixVQUFVLEVBQUUsSUFGa0I7TUFHOUJDLFlBQVksRUFBRSxJQUhnQjtNQUk5QkMsUUFBUSxFQUFFO0tBSlo7R0FERixNQU9PO0lBQ0xwSSxHQUFHLENBQUNnRixHQUFELENBQUgsR0FBVzFDLEtBQVg7OztTQUdLdEMsR0FBUDs7O0FBR0ZsQixrQkFBQSxHQUFpQndLLGVBQWpCOztBQ2JBLFNBQVNDLGFBQVQsQ0FBdUJ4QixNQUF2QixFQUErQjtPQUN4QixJQUFJeEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2tDLFNBQVMsQ0FBQ3ZDLE1BQTlCLEVBQXNDSyxDQUFDLEVBQXZDLEVBQTJDO1FBQ3JDaUUsTUFBTSxHQUFHL0IsU0FBUyxDQUFDbEMsQ0FBRCxDQUFULElBQWdCLElBQWhCLEdBQXVCa0MsU0FBUyxDQUFDbEMsQ0FBRCxDQUFoQyxHQUFzQyxFQUFuRDtRQUNJa0UsT0FBTyxHQUFHMUwsTUFBTSxDQUFDK0csSUFBUCxDQUFZMEUsTUFBWixDQUFkOztRQUVJLE9BQU96TCxNQUFNLENBQUMyTCxxQkFBZCxLQUF3QyxVQUE1QyxFQUF3RDtNQUN0REQsT0FBTyxHQUFHQSxPQUFPLENBQUNFLE1BQVIsQ0FBZTVMLE1BQU0sQ0FBQzJMLHFCQUFQLENBQTZCRixNQUE3QixFQUFxQ0ksTUFBckMsQ0FBNEMsVUFBVUMsR0FBVixFQUFlO2VBQzNFOUwsTUFBTSxDQUFDK0wsd0JBQVAsQ0FBZ0NOLE1BQWhDLEVBQXdDSyxHQUF4QyxFQUE2QzNCLFVBQXBEO09BRHVCLENBQWYsQ0FBVjs7O0lBS0Z1QixPQUFPLENBQUNwSSxPQUFSLENBQWdCLFVBQVUyRCxHQUFWLEVBQWU7TUFDN0JxRCxjQUFjLENBQUNOLE1BQUQsRUFBUy9DLEdBQVQsRUFBY3dFLE1BQU0sQ0FBQ3hFLEdBQUQsQ0FBcEIsQ0FBZDtLQURGOzs7U0FLSytDLE1BQVA7OztBQUdGakosZ0JBQUEsR0FBaUJ5SyxhQUFqQjs7SUNyQmFRLFlBQWI7O0FBQUE7d0JBQ2NDLE9BQVosRUFBcUI7Ozs7O1NBQ2RDLE9BQUwsR0FBZUQsT0FBTyxDQUFDQyxPQUFSLElBQW1CLEVBQWxDO1FBRU1DLElBQUksR0FBRyxFQUFiO1FBQ01DLGVBQWUsR0FBRyxJQUFJQyxHQUFKLEVBQXhCO1FBQ01DLGNBQWMsR0FBRyxFQUF2QjtRQUNJQyxZQUFZLEdBQUcsSUFBbkI7U0FFS0MsT0FBTCxHQUFlLElBQUlDLEtBQUosQ0FBVU4sSUFBVixFQUFnQjtNQUM3Qk8sR0FENkIsZUFDekJ6SyxHQUR5QixFQUNwQjBLLElBRG9CLEVBQ2RwSSxLQURjLEVBQ1A7UUFDcEJ0QyxHQUFHLENBQUMwSyxJQUFELENBQUgsR0FBWXBJLEtBQVosQ0FEb0I7O1lBSWhCK0gsY0FBYyxDQUFDSyxJQUFELENBQWxCLEVBQTBCO1VBQ3hCTCxjQUFjLENBQUNLLElBQUQsQ0FBZCxDQUFxQnJKLE9BQXJCLENBQTZCLFVBQUFzSixFQUFFO21CQUFJQSxFQUFFLENBQUNySSxLQUFELENBQU47V0FBL0I7OztlQUdLLElBQVA7T0FUMkI7TUFZN0JzSSxHQVo2QixlQVl6QjVLLEdBWnlCLEVBWXBCMEssSUFab0IsRUFZZDtZQUNUQSxJQUFJLElBQUkxSyxHQUFaLEVBQWlCO2lCQUNSQSxHQUFHLENBQUMwSyxJQUFELENBQVY7U0FERixNQUVPO2NBQ0NHLEtBQUssR0FBR1YsZUFBZSxDQUFDUyxHQUFoQixDQUFvQk4sWUFBcEIsQ0FBZDtjQUVJTyxLQUFLLElBQUlBLEtBQUssQ0FBQ0gsSUFBRCxDQUFsQixFQUNFSSxPQUFPLENBQUNDLElBQVIsQ0FBYUYsS0FBSyxDQUFDSCxJQUFELENBQWxCLEVBQTBCSixZQUExQjtjQUVFQSxZQUFZLEtBQUssSUFBckIsRUFDRVEsT0FBTyxDQUFDcEksS0FBUixDQUFjLGtCQUFkLEVBREYsS0FHRW9JLE9BQU8sQ0FBQ3BJLEtBQVIsQ0FBYyxpQkFBZCxFQUFpQzRILFlBQWpDO2dCQUVJLElBQUluSCxLQUFKLG1CQUFxQnVILElBQXJCLHdDQUFOOzs7S0ExQlMsQ0FBZjs7UUErQk1LLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUFqTSxNQUFNO2FBQUksVUFBQ2tNLFVBQUQsRUFBYUMsT0FBYixFQUF5QjtRQUM5Q2QsZUFBZSxDQUFDTSxHQUFoQixDQUFvQjNMLE1BQXBCLG1CQUNNcUwsZUFBZSxDQUFDUyxHQUFoQixDQUFvQjlMLE1BQXBCLEtBQStCLEVBRHJDLHFCQUVHa00sVUFGSCxFQUVnQkMsT0FGaEI7T0FEaUI7S0FBbkI7O1FBT01DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLFFBQUQsRUFBV0MsT0FBWCxFQUF1QjtVQUNsQ2YsY0FBYyxDQUFDYyxRQUFELENBQWxCLEVBQThCO1FBQzVCZCxjQUFjLENBQUNjLFFBQUQsQ0FBZCxDQUF5QnpHLElBQXpCLENBQThCMEcsT0FBOUI7T0FERixNQUVPO1FBQ0xmLGNBQWMsQ0FBQ2MsUUFBRCxDQUFkLEdBQTJCLENBQUNDLE9BQUQsQ0FBM0I7OzthQUdLLFlBQU07WUFDUGYsY0FBYyxDQUFDYyxRQUFELENBQWxCLEVBQThCO1VBQzVCZCxjQUFjLENBQUNjLFFBQUQsQ0FBZCxDQUF5QkUsTUFBekIsQ0FDRWhCLGNBQWMsQ0FBQ2MsUUFBRCxDQUFkLENBQXlCcEUsT0FBekIsQ0FBaUNxRSxPQUFqQyxDQURGLEVBRUUsQ0FGRjs7T0FGSjtLQVBGOztTQWlCS0UsWUFBTCxHQUFvQixZQUFNOzs7Ozs7NkJBQ0gsS0FBSSxDQUFDckIsT0FBMUIsOEhBQW1DO2NBQXhCbkwsTUFBd0I7O2NBQzdCLFdBQVdBLE1BQWYsRUFBdUI7WUFDckJ3TCxZQUFZLEdBQUd4TCxNQUFmO1lBRUFBLE1BQU0sQ0FBQ3lNLEtBQVAsQ0FBYSxLQUFiLEVBQW1CO2NBQ2pCckIsSUFBSSxFQUFKQSxJQURpQjtjQUVqQkssT0FBTyxFQUFFLEtBQUksQ0FBQ0EsT0FGRztjQUdqQlEsSUFBSSxFQUFFQSxJQUFJLENBQUNqTSxNQUFELENBSE87Y0FJakJvTSxRQUFRLEVBQVJBO2FBSkY7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQVNKWixZQUFZLEdBQUcsSUFBZjtLQWRGOzs7OzsyQkFrQktrQixVQWxGVCxFQWtGcUJDLFNBbEZyQixFQWtGZ0M7VUFDeEJDLFVBQVUsR0FBR0QsU0FBakI7Ozs7Ozs4QkFFcUIsS0FBS3hCLE9BQTFCLG1JQUFtQztjQUF4Qm5MLE1BQXdCOztjQUM3QkEsTUFBTSxDQUFDNk0sT0FBUCxJQUFrQkgsVUFBVSxJQUFJMU0sTUFBTSxDQUFDNk0sT0FBM0MsRUFBb0Q7WUFDbERELFVBQVUsR0FBRzVNLE1BQU0sQ0FBQzZNLE9BQVAsQ0FBZUgsVUFBZixFQUEyQkUsVUFBM0IsQ0FBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBSUdBLFVBQVA7Ozs7Ozs7SUN6RlNFLFNBQWI7O0FBQUE7Ozt1QkFHNEI7OztRQUFkNUIsT0FBYyx1RUFBSixFQUFJOzs7O1FBQ2xCNkIsWUFBWSxHQUFHLE9BQU83QixPQUFQLEtBQW1CLFVBQW5CLElBQWlDQSxPQUFPLEVBQTdEO2lGQUVNNkIsWUFBWSxHQUFHO01BQUM1QixPQUFPLEVBQUU7S0FBYixHQUFtQkQsT0FBckM7O21GQUxRLEtBRWdCOztVQUtuQjhCLE9BQUwsR0FBZUQsWUFBWSxZQUFZdEosT0FBdkM7VUFFS3dKLE1BQUwsR0FBYyxNQUFLRCxPQUFMLEdBQWUsSUFBSXZKLE9BQUosQ0FBWSxVQUFBTCxPQUFPLEVBQUk7TUFDbEQySixZQUFZLENBQUNySixJQUFiLENBQWtCLFVBQUF3SCxPQUFPLEVBQUk7UUFDM0I5SCxPQUFPLENBQUMsTUFBSzhKLEtBQUwsQ0FBV2hDLE9BQVgsQ0FBRCxDQUFQO09BREY7S0FEMkIsQ0FBZixHQUlULE1BQUtnQyxLQUFMLENBQVcsT0FBT2hDLE9BQVAsS0FBbUIsVUFBbkIsR0FBZ0NBLE9BQU8sRUFBdkMsR0FBNENBLE9BQXZELENBSkw7O1VBTUtzQixZQUFMOzs7Ozs7OzRCQUdNO01BQ05SLE9BQU8sQ0FBQ3BJLEtBQVIsQ0FBYyxrQ0FBZDthQUNPLElBQVA7Ozs7Ozs7d0NBR1F1SixTQXhCWjs7Ozs7O3FCQXlCdUIsS0FBS0gsT0F6QjVCOzs7Ozs7dUJBeUI0QyxLQUFLQyxNQXpCakQ7Ozs7Ozs7OzhCQXlCMEQsS0FBS0EsTUF6Qi9EOzs7Z0JBeUJVRyxVQXpCVjs7cUJBMEJ3QkQsU0FBUyxDQUFDSCxPQTFCbEM7Ozs7Ozt1QkEwQmtERyxTQUFTLENBQUNGLE1BMUI1RDs7Ozs7Ozs7OEJBMEJxRUUsU0FBUyxDQUFDRixNQTFCL0U7OztnQkEwQlVJLFdBMUJWO2dCQTRCSUQsVUFBVSxDQUFDRSxHQUFYLENBQWVELFdBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1QjJCcEMsWUFBL0I7OztBQ0FBLFNBQVNzQyx3QkFBVCxHQUFvQztNQUM5QixPQUFPQyxPQUFQLEtBQW1CLFdBQW5CLElBQWtDLENBQUNBLE9BQU8sQ0FBQ0MsU0FBL0MsRUFBMEQsT0FBTyxLQUFQO01BQ3RERCxPQUFPLENBQUNDLFNBQVIsQ0FBa0JDLElBQXRCLEVBQTRCLE9BQU8sS0FBUDtNQUN4QixPQUFPaEMsS0FBUCxLQUFpQixVQUFyQixFQUFpQyxPQUFPLElBQVA7O01BRTdCO0lBQ0ZpQyxJQUFJLENBQUN6TyxTQUFMLENBQWVpRyxRQUFmLENBQXdCOUQsSUFBeEIsQ0FBNkJtTSxPQUFPLENBQUNDLFNBQVIsQ0FBa0JFLElBQWxCLEVBQXdCLEVBQXhCLEVBQTRCLFlBQVksRUFBeEMsQ0FBN0I7V0FDTyxJQUFQO0dBRkYsQ0FHRSxPQUFPdkYsQ0FBUCxFQUFVO1dBQ0gsS0FBUDs7OztBQUlKLFNBQVN3RixVQUFULENBQW9CQyxNQUFwQixFQUE0Qm5GLElBQTVCLEVBQWtDb0YsS0FBbEMsRUFBeUM7TUFDbkNQLHdCQUF3QixFQUE1QixFQUFnQztJQUM5QnZOLGNBQUEsR0FBaUI0TixVQUFVLEdBQUdKLE9BQU8sQ0FBQ0MsU0FBdEM7R0FERixNQUVPO0lBQ0x6TixjQUFBLEdBQWlCNE4sVUFBVSxHQUFHLFNBQVNBLFVBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCbkYsSUFBNUIsRUFBa0NvRixLQUFsQyxFQUF5QztVQUNqRUMsQ0FBQyxHQUFHLENBQUMsSUFBRCxDQUFSO01BQ0FBLENBQUMsQ0FBQ25JLElBQUYsQ0FBT2dELEtBQVAsQ0FBYW1GLENBQWIsRUFBZ0JyRixJQUFoQjtVQUNJSyxXQUFXLEdBQUdsQixRQUFRLENBQUNtRyxJQUFULENBQWNwRixLQUFkLENBQW9CaUYsTUFBcEIsRUFBNEJFLENBQTVCLENBQWxCO1VBQ0lqRixRQUFRLEdBQUcsSUFBSUMsV0FBSixFQUFmO1VBQ0krRSxLQUFKLEVBQVdoTCxjQUFjLENBQUNnRyxRQUFELEVBQVdnRixLQUFLLENBQUM1TyxTQUFqQixDQUFkO2FBQ0o0SixRQUFQO0tBTkY7OztTQVVLOEUsVUFBVSxDQUFDaEYsS0FBWCxDQUFpQixJQUFqQixFQUF1QkQsU0FBdkIsQ0FBUDs7O0FBR0YzSSxjQUFBLEdBQWlCNE4sVUFBakI7Ozs7O0FDaENPLElBQU1LLE1BQU0sR0FBRztFQUNwQkMsTUFBTSxFQUFFLE9BQU9BLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NuUCxNQUFoQyxHQUF5Q21QO0NBRDVDOztBQ0FQLFNBQVNDLDZCQUFULENBQXVDekQsTUFBdkMsRUFBK0MwRCxRQUEvQyxFQUF5RDtNQUNuRDFELE1BQU0sSUFBSSxJQUFkLEVBQW9CLE9BQU8sRUFBUDtNQUNoQnpCLE1BQU0sR0FBRyxFQUFiO01BQ0lvRixVQUFVLEdBQUdwUCxNQUFNLENBQUMrRyxJQUFQLENBQVkwRSxNQUFaLENBQWpCO01BQ0l4RSxHQUFKLEVBQVNPLENBQVQ7O09BRUtBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRzRILFVBQVUsQ0FBQ2pJLE1BQTNCLEVBQW1DSyxDQUFDLEVBQXBDLEVBQXdDO0lBQ3RDUCxHQUFHLEdBQUdtSSxVQUFVLENBQUM1SCxDQUFELENBQWhCO1FBQ0kySCxRQUFRLENBQUNuRyxPQUFULENBQWlCL0IsR0FBakIsS0FBeUIsQ0FBN0IsRUFBZ0M7SUFDaEMrQyxNQUFNLENBQUMvQyxHQUFELENBQU4sR0FBY3dFLE1BQU0sQ0FBQ3hFLEdBQUQsQ0FBcEI7OztTQUdLK0MsTUFBUDs7O0FBR0ZqSixnQ0FBQSxHQUFpQm1PLDZCQUFqQjs7QUNiQSxTQUFTRyx3QkFBVCxDQUFrQzVELE1BQWxDLEVBQTBDMEQsUUFBMUMsRUFBb0Q7TUFDOUMxRCxNQUFNLElBQUksSUFBZCxFQUFvQixPQUFPLEVBQVA7TUFDaEJ6QixNQUFNLEdBQUdzRiw0QkFBNEIsQ0FBQzdELE1BQUQsRUFBUzBELFFBQVQsQ0FBekM7TUFDSWxJLEdBQUosRUFBU08sQ0FBVDs7TUFFSXhILE1BQU0sQ0FBQzJMLHFCQUFYLEVBQWtDO1FBQzVCNEQsZ0JBQWdCLEdBQUd2UCxNQUFNLENBQUMyTCxxQkFBUCxDQUE2QkYsTUFBN0IsQ0FBdkI7O1NBRUtqRSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUcrSCxnQkFBZ0IsQ0FBQ3BJLE1BQWpDLEVBQXlDSyxDQUFDLEVBQTFDLEVBQThDO01BQzVDUCxHQUFHLEdBQUdzSSxnQkFBZ0IsQ0FBQy9ILENBQUQsQ0FBdEI7VUFDSTJILFFBQVEsQ0FBQ25HLE9BQVQsQ0FBaUIvQixHQUFqQixLQUF5QixDQUE3QixFQUFnQztVQUM1QixDQUFDakgsTUFBTSxDQUFDQyxTQUFQLENBQWlCdVAsb0JBQWpCLENBQXNDcE4sSUFBdEMsQ0FBMkNxSixNQUEzQyxFQUFtRHhFLEdBQW5ELENBQUwsRUFBOEQ7TUFDOUQrQyxNQUFNLENBQUMvQyxHQUFELENBQU4sR0FBY3dFLE1BQU0sQ0FBQ3hFLEdBQUQsQ0FBcEI7Ozs7U0FJRytDLE1BQVA7OztBQUdGakosMkJBQUEsR0FBaUJzTyx3QkFBakI7O0lDckJhSSxZQUFiOztBQUFBOzBCQUN1Qjs7O3NDQUFOdEQsSUFBTTtNQUFOQSxJQUFNOzs7U0FDZEEsSUFBTCxHQUFZQSxJQUFaOzs7OzswQkFHSXVELEdBTFIsUUFLa0M7VUFBcEJsRCxPQUFvQixRQUFwQkEsT0FBb0I7VUFBUm1ELEtBQVE7O1dBQ3pCeEQsSUFBTCxDQUFVN0ksT0FBVixDQUFrQixVQUFBNkksSUFBSSxFQUFJO1FBQ3hCbk0sTUFBTSxDQUFDNFAsTUFBUCxDQUFjcEQsT0FBZCxFQUF1QixPQUFPTCxJQUFQLEtBQWdCLFVBQWhCLEdBQTZCQSxJQUFJLENBQUNLLE9BQUQsRUFBVW1ELEtBQVYsQ0FBakMsR0FBb0R4RCxJQUEzRTtPQURGOzs7Ozs7O0FDTko7Ozs7Ozs7SUFPTTBELE9BQ0osY0FBWUMsSUFBWixFQUFrQjs7O09BQ1hBLElBQUwsR0FBWUEsSUFBWjtPQUNLQyxPQUFMLEdBQWUsSUFBZjs7O0FDVkosU0FBU0MsZUFBVCxDQUF5QkMsR0FBekIsRUFBOEI7TUFDeEJDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQUosRUFBd0IsT0FBT0EsR0FBUDs7O0FBRzFCbFAsa0JBQUEsR0FBaUJpUCxlQUFqQjs7QUNKQSxTQUFTSSxxQkFBVCxDQUErQkgsR0FBL0IsRUFBb0N6SSxDQUFwQyxFQUF1QztNQUNqQzZJLElBQUksR0FBRyxFQUFYO01BQ0lDLEVBQUUsR0FBRyxJQUFUO01BQ0lDLEVBQUUsR0FBRyxLQUFUO01BQ0lDLEVBQUUsR0FBR3BRLFNBQVQ7O01BRUk7U0FDRyxJQUFJcVEsRUFBRSxHQUFHUixHQUFHLENBQUMzUCxNQUFNLENBQUNFLFFBQVIsQ0FBSCxFQUFULEVBQWlDa1EsRUFBdEMsRUFBMEMsRUFBRUosRUFBRSxHQUFHLENBQUNJLEVBQUUsR0FBR0QsRUFBRSxDQUFDeEwsSUFBSCxFQUFOLEVBQWlCQyxJQUF4QixDQUExQyxFQUF5RW9MLEVBQUUsR0FBRyxJQUE5RSxFQUFvRjtNQUNsRkQsSUFBSSxDQUFDMUosSUFBTCxDQUFVK0osRUFBRSxDQUFDbk0sS0FBYjs7VUFFSWlELENBQUMsSUFBSTZJLElBQUksQ0FBQ2xKLE1BQUwsS0FBZ0JLLENBQXpCLEVBQTRCOztHQUpoQyxDQU1FLE9BQU9uRixHQUFQLEVBQVk7SUFDWmtPLEVBQUUsR0FBRyxJQUFMO0lBQ0FDLEVBQUUsR0FBR25PLEdBQUw7R0FSRixTQVNVO1FBQ0o7VUFDRSxDQUFDaU8sRUFBRCxJQUFPRyxFQUFFLENBQUMsUUFBRCxDQUFGLElBQWdCLElBQTNCLEVBQWlDQSxFQUFFLENBQUMsUUFBRCxDQUFGO0tBRG5DLFNBRVU7VUFDSkYsRUFBSixFQUFRLE1BQU1DLEVBQU47Ozs7U0FJTEgsSUFBUDs7O0FBR0Z0UCx3QkFBQSxHQUFpQnFQLHFCQUFqQjs7QUMxQkEsU0FBU08sZ0JBQVQsR0FBNEI7UUFDcEIsSUFBSTdLLFNBQUosQ0FBYyxzREFBZCxDQUFOOzs7QUFHRi9FLG1CQUFBLEdBQWlCNFAsZ0JBQWpCOztBQ0VBLFNBQVNDLGNBQVQsQ0FBd0JYLEdBQXhCLEVBQTZCekksQ0FBN0IsRUFBZ0M7U0FDdkJxSixjQUFjLENBQUNaLEdBQUQsQ0FBZCxJQUF1QmEsb0JBQW9CLENBQUNiLEdBQUQsRUFBTXpJLENBQU4sQ0FBM0MsSUFBdUR1SixlQUFlLEVBQTdFOzs7QUFHRmhRLGlCQUFBLEdBQWlCNlAsY0FBakI7O0lDVmFJLEtBQWI7O0FBQUE7aUJBT2NDLE9BQVosRUFBcUI7OztTQUNkQSxPQUFMLEdBQWVBLE9BQWY7U0FDS0MsSUFBTCxHQUFZLEVBQVo7U0FDS0MsVUFBTCxHQUFrQixFQUFsQjs7Ozs7NEJBR01DLFNBYlYsRUFhcUJDLFNBYnJCLEVBYWdDO1VBQ3hCLEtBQUtGLFVBQUwsQ0FBZ0JDLFNBQWhCLENBQUosRUFBZ0M7YUFDekJELFVBQUwsQ0FBZ0JDLFNBQWhCLEVBQTJCekssSUFBM0IsQ0FBZ0MwSyxTQUFoQztPQURGLE1BRU87YUFDQUYsVUFBTCxDQUFnQkMsU0FBaEIsSUFBNkIsQ0FBQ0MsU0FBRCxDQUE3Qjs7Ozs7eUJBSUNDLFNBckJQLEVBcUJrQkMsR0FyQmxCLEVBcUJxQztVQUFkdEYsT0FBYyx1RUFBSixFQUFJOzttQkFDWCxTQUFTdUYsSUFBVCxDQUFjRixTQUFkLENBRFc7O1VBQ3hCRixTQUR3Qjs7VUFFM0JLLE1BQU0sR0FBRyxLQUFLUixPQUFMLENBQWFHLFNBQWIsQ0FBZjtVQUNNRCxVQUFVLEdBQUcsS0FBS0EsVUFBTCxDQUFnQkMsU0FBaEIsS0FBOEIsRUFBakQ7V0FFS0YsSUFBTCxDQUFVSSxTQUFWLElBQXVCLElBQUk5TSxPQUFKLENBQVksVUFBQ0wsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO1FBQ3REcU4sTUFBTSxDQUFDQyxJQUFQLENBQ0VILEdBREYsRUFFRSxVQUFDcEYsSUFBRCxFQUFVO1VBQ1JoSSxPQUFPLENBQ0xnTixVQUFVLENBQUNRLE1BQVgsQ0FDRSxVQUFDQyxPQUFELEVBQVVQLFNBQVY7bUJBQXdCQSxTQUFTLENBQUNPLE9BQUQsRUFBVTNGLE9BQVYsRUFBbUJxRixTQUFuQixDQUFqQztXQURGLEVBRUVuRixJQUZGLENBREssQ0FBUDtTQUhKLEVBVUUvTCxTQVZGLEVBV0VnRSxNQVhGO09BRHFCLENBQXZCO2FBZ0JPLEtBQUs4TSxJQUFMLENBQVVJLFNBQVYsQ0FBUDs7Ozt3QkFHRUEsU0E3Q04sRUE2Q2lCO2FBQ04sS0FBS0osSUFBTCxDQUFVSSxTQUFWLENBQVA7Ozs7Ozs7ZUE5Q1NOLHNCQUNVO0VBQ25CVSxJQURtQixnQkFDZEcsU0FEYyxFQUNIQyxVQURHLEVBQ1NDLFVBRFQsRUFDcUJDLE9BRHJCLEVBQzhCO0lBQy9DSCxTQUFTLEdBQUdwTixJQUFaLENBQWlCcU4sVUFBakI7Ozs7QUNNTjs7Ozs7Ozs7O0lBUU1HOzs7Ozs7Ozs7Ozs7Ozs7OztpQkFzQnNCOzs7UUFBZC9GLE9BQWMsdUVBQUosRUFBSTs7OztJQUN4QmEsT0FBTyxDQUFDbUYsR0FBUixtQkFBdUJDLE9BQXZCOzJFQUNNO01BQUNqRyxPQUFPLEVBQVBBO0tBQVA7O21GQWpCUSxJQWVnQjs7aUZBZGxCLElBQUlrRyxLQUFKLEVBY2tCOztpRkFObEIsRUFNa0I7O1VBSW5CN0UsWUFBTDs7Ozs7Ozs7Ozs7Ozs7NEJBVU07OztVQUNBOEUsZ0JBQWdCLEdBQUksWUFBTTtlQUN2QnJELE1BQU0sQ0FBQ0MsTUFBUCxDQUFjcUQscUJBQWQsSUFDRnRELE1BQU0sQ0FBQ0MsTUFBUCxDQUFjc0QsMkJBRFosSUFFRnZELE1BQU0sQ0FBQ0MsTUFBUCxDQUFjdUQsd0JBRlosSUFHRixVQUFVQyxRQUFWLEVBQW9CO1VBQ3JCekQsTUFBTSxDQUFDQyxNQUFQLENBQWN5RCxVQUFkLENBQXlCRCxRQUF6QixFQUFtQyxPQUFPLEVBQTFDO1NBSko7T0FEdUIsRUFBekI7O1VBU01FLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07UUFDcEIsTUFBSSxDQUFDQyxPQUFMLEdBQWVQLGdCQUFnQixDQUFDO2lCQUFNTSxPQUFPLEVBQWI7U0FBRCxDQUEvQjtZQUNJLENBQUMsTUFBSSxDQUFDNUMsT0FBVixFQUFtQjs7YUFFZCxJQUFJdkksQ0FBQyxHQUFHLENBQVIsRUFBV3FMLEVBQUUsR0FBRyxNQUFJLENBQUNDLEtBQUwsQ0FBVzNMLE1BQWhDLEVBQXdDSyxDQUFDLEdBQUdxTCxFQUE1QyxFQUFnRHJMLENBQUMsRUFBakQsRUFBcUQ7Y0FDN0MyQixDQUFDLEdBQUcsTUFBSSxDQUFDMkosS0FBTCxDQUFXdEwsQ0FBWCxDQUFWO2NBQ0kyQixDQUFDLENBQUM0RyxPQUFOLEVBQWU1RyxDQUFDLENBQUMyRyxJQUFGLENBQU8sTUFBSSxDQUFDaUQsS0FBWjs7T0FObkI7O1dBVUtoRCxPQUFMLEdBQWUsSUFBZjtVQUVJLENBQUMsS0FBSzZDLE9BQVYsRUFDRUQsT0FBTzs7Ozt5QkFHTkssY0FBYztVQUNYQyxJQUFJLEdBQUcsSUFBSXBELElBQUosQ0FBU21ELFlBQVQsQ0FBYjtXQUNLRixLQUFMLENBQVduTSxJQUFYLENBQWdCc00sSUFBaEI7YUFFT0EsSUFBUDs7Ozs7RUFsRWNqSDs7ZUFBWmlHLGNBQ1dqQjs7ZUFEWGlCLGVBa0JZLFlBQWE7b0NBQVR4SSxJQUFTO0lBQVRBLElBQVM7OzttQkFDaEJnRyxZQUFYLEVBQTJCaEcsSUFBM0I7OztBQ3BDSjs7QUNBQSxTQUFTeUosbUJBQVQsQ0FBNkJDLFFBQTdCLEVBQXVDaEgsSUFBdkMsRUFBNkM7TUFDdkMsQ0FBQ0EsSUFBTCxFQUFXO01BRVBpSCxVQUFVLEdBQUcsRUFBakI7O01BRUlqSCxJQUFJLFlBQVluTSxNQUFNLENBQUMrQyxjQUFQLENBQXNCb1EsUUFBdEIsRUFBZ0NoUSxXQUFwRCxFQUFpRTs7SUFDL0RnUSxRQUFRLENBQUNFLElBQVQsQ0FBY2xILElBQWQ7O0dBREYsTUFHTyxJQUFJK0QsS0FBSyxDQUFDQyxPQUFOLENBQWNoRSxJQUFkLENBQUosRUFBeUI7SUFDOUJpSCxVQUFVLEdBQUc7TUFDWEUsQ0FBQyxFQUFFbkgsSUFBSSxDQUFDLENBQUQsQ0FESTtNQUVYb0gsQ0FBQyxFQUFFcEgsSUFBSSxDQUFDLENBQUQsQ0FGSTtNQUdYcUgsQ0FBQyxFQUFFckgsSUFBSSxDQUFDLENBQUQsQ0FISTtNQUlYc0gsQ0FBQyxFQUFFdEgsSUFBSSxDQUFDLENBQUQ7S0FKVDtHQURLLE1BT0E7SUFDTGlILFVBQVUsR0FBRztNQUNYRSxDQUFDLEVBQUVuSCxJQUFJLENBQUNtSCxDQURHO01BRVhDLENBQUMsRUFBRXBILElBQUksQ0FBQ29ILENBRkc7TUFHWEMsQ0FBQyxFQUFFckgsSUFBSSxDQUFDcUgsQ0FIRztNQUlYQyxDQUFDLEVBQUV0SCxJQUFJLENBQUNzSDtLQUpWOzs7TUFRRU4sUUFBUSxDQUFDTSxDQUFULEtBQWVyVCxTQUFuQixFQUE4QjtXQUNyQmdULFVBQVUsQ0FBQ0ssQ0FBbEI7OztFQUdGelQsTUFBTSxDQUFDNFAsTUFBUCxDQUFjdUQsUUFBZCxFQUF3QkMsVUFBeEI7OztBQUdGLEFBQU8sU0FBU00sY0FBVCxDQUF3QjFGLE1BQXhCLEVBQWdDL0IsT0FBaEMsRUFBeUM7RUFDOUNpSCxtQkFBbUIsQ0FBQ2xGLE1BQU0sQ0FBQzJGLFFBQVIsRUFBa0IxSCxPQUFPLENBQUMwSCxRQUExQixDQUFuQjtFQUNBVCxtQkFBbUIsQ0FBQ2xGLE1BQU0sQ0FBQzRGLEtBQVIsRUFBZTNILE9BQU8sQ0FBQzJILEtBQXZCLENBQW5CO0VBQ0FWLG1CQUFtQixDQUFDbEYsTUFBTSxDQUFDNkYsUUFBUixFQUFrQjVILE9BQU8sQ0FBQzRILFFBQTFCLENBQW5COzs7SUM5QldDLGFBQWI7O0FBQUE7Ozs7Ozs7Ozs7OzBCQUNRN0gsT0FEUixFQUNpQjtVQUNQOEgsUUFBUSxHQUFHOUgsT0FBTyxDQUFDOEgsUUFBekI7VUFDTUMsUUFBUSxHQUFHL0gsT0FBTyxDQUFDK0gsUUFBekI7VUFFTUMsSUFBSSxHQUFHLEtBQUtDLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLElBQUlDLElBQUosQ0FDL0IsS0FBS0QsTUFBTCxDQUFZLFVBQVosRUFBd0JILFFBQXhCLENBRCtCLEVBRS9CLEtBQUtHLE1BQUwsQ0FBWSxVQUFaLEVBQXdCRixRQUF4QixDQUYrQixDQUFwQixDQUFiO01BS0FOLGNBQWMsQ0FBQ08sSUFBRCxFQUFPaEksT0FBUCxDQUFkO2FBRU9nSSxJQUFQOzs7OztFQVorQnBHLFNBQW5DO0FBZ0JBQSxTQUFTLENBQUNzRyxJQUFWLEdBQWlCTCxhQUFqQjs7SUNqQmFNLGVBQWI7O0FBQUE7Ozs7Ozs7Ozs7OzBCQUNRbkksT0FEUixFQUNpQjtVQUNQb0ksTUFBTSxHQUFHcEksT0FBTyxDQUFDb0ksTUFBdkI7TUFFQVgsY0FBYyxDQUFDVyxNQUFELEVBQVNwSSxPQUFULENBQWQ7YUFFTyxLQUFLaUksTUFBTCxDQUFZLFFBQVosRUFBc0JHLE1BQXRCLENBQVA7Ozs7bUNBR2FsSCxRQVRqQixFQVMyQjs7O01BQ3ZCQSxRQUFRLENBQUMsTUFBRCxFQUFTLGdCQUFxQjs7WUFBbkJtSCxLQUFtQjtZQUFaQyxNQUFZOztRQUNwQyxLQUFJLENBQUN2RyxNQUFMLENBQVl3RyxNQUFaLEdBQXFCRixLQUFLLEdBQUdDLE1BQTdCOztRQUNBLEtBQUksQ0FBQ3ZHLE1BQUwsQ0FBWXlHLHNCQUFaO09BRk0sQ0FBUjthQUtPLElBQVA7Ozs7O0VBZmlDNUcsU0FBckM7QUFtQkFBLFNBQVMsQ0FBQzZHLE1BQVYsR0FBbUJOLGVBQW5COztJQ25CYU8sY0FBYjs7QUFBQTs7Ozs7Ozs7Ozs7MEJBQ1ExSSxPQURSLEVBQ2lCO1VBQ1AySSxLQUFLLEdBQUczSSxPQUFPLENBQUMySSxLQUF0QjtNQUVBbEIsY0FBYyxDQUFDa0IsS0FBRCxFQUFRM0ksT0FBUixDQUFkO2FBRU8sS0FBS2lJLE1BQUwsQ0FBWSxPQUFaLEVBQXFCVSxLQUFyQixDQUFQOzs7OztFQU5nQy9HLFNBQXBDO0FBVUFBLFNBQVMsQ0FBQ2dILEtBQVYsR0FBa0JGLGNBQWxCOztJQ1hhRyxVQUFiOztBQUFBOzs7Ozs7OzBCQUNRcEYsR0FEUixRQUN3QjtVQUFWbEQsT0FBVSxRQUFWQSxPQUFVO01BQ3BCQSxPQUFPLENBQUN1SSxLQUFSLEdBQWdCLElBQUlDLEtBQUosRUFBaEI7O01BRUF0RixHQUFHLENBQUNyQixHQUFKOzs7Ozt5QkFBVSxpQkFBT0gsU0FBUDs7Ozs7a0JBQ1JBLFNBQVMsR0FBR3dCLEdBQUcsQ0FBQ3dFLE1BQUosQ0FBVyxPQUFYLEVBQW9CaEcsU0FBcEIsQ0FBWjtnQ0FDQTFCLE9BQU8sQ0FBQ3VJLEtBRkE7O3VCQUVVN0csU0FBUyxDQUFDSCxPQUZwQjs7Ozs7O3lCQUVvQ0csU0FBUyxDQUFDRixNQUY5Qzs7Ozs7Ozs7Z0NBRXVERSxTQUFTLENBQUNGLE1BRmpFOzs7Ozs4QkFFTUssR0FGTjs7Ozs7Ozs7U0FBVjs7Ozs7Ozs7Ozs7O0lDSlM0RyxlQUFiOztBQUFBOzZCQUN3RDtRQUExQ0MsYUFBMEMsdUVBQTFCLEVBQTBCO1FBQXRCQyxlQUFzQix1RUFBSixFQUFJOzs7O1NBQy9DRCxhQUFMLEdBQXFCQSxhQUFyQjtTQUNLQyxlQUFMLEdBQXVCQSxlQUF2Qjs7Ozs7MEJBR0l6RixHQU5SLFFBTXdDO1VBQTFCbEQsT0FBMEIsUUFBMUJBLE9BQTBCO1VBQWpCVyxRQUFpQixRQUFqQkEsUUFBaUI7VUFBUEgsSUFBTyxRQUFQQSxJQUFPO01BQ3BDQSxJQUFJLENBQUMsTUFBRCxFQUFTLGtEQUFULENBQUo7TUFDQUEsSUFBSSxDQUFDLFFBQUQsRUFBVyxpREFBWCxDQUFKO01BQ0FBLElBQUksQ0FBQyxPQUFELEVBQVUsdUNBQVYsQ0FBSjtNQUNBQSxJQUFJLENBQUMsV0FBRCxFQUFjLDRDQUFkLENBQUo7VUFHRW9JLFNBUGtDLEdBV2hDNUksT0FYZ0MsQ0FPbEM0SSxTQVBrQztVQVFsQ2YsTUFSa0MsR0FXaEM3SCxPQVhnQyxDQVFsQzZILE1BUmtDO1VBU2xDVSxLQVRrQyxHQVdoQ3ZJLE9BWGdDLENBU2xDdUksS0FUa0M7MEJBV2hDdkksT0FYZ0MsQ0FVbEM2SSxJQVZrQztVQVVsQ0EsSUFWa0MsOEJBVTNCLENBQUNwRyxNQUFNLENBQUNxRyxVQUFSLEVBQW9CckcsTUFBTSxDQUFDc0csV0FBM0IsQ0FWMkI7VUFhOUJKLGVBQWUsR0FBRyxLQUFLQSxlQUFMLElBQXdCLEVBQWhEO1VBRU1LLFFBQVEsR0FBR2hKLE9BQU8sQ0FBQ2dKLFFBQVIsR0FBbUIsSUFBSUMsYUFBSixDQUFrQixLQUFLQyxzQkFBTCxDQUE0QlAsZUFBNUIsQ0FBbEIsQ0FBcEM7TUFDQUssUUFBUSxDQUFDRyxPQUFULENBQWlCTixJQUFJLENBQUMsQ0FBRCxDQUFyQixFQUEwQkEsSUFBSSxDQUFDLENBQUQsQ0FBOUI7TUFFQWxJLFFBQVEsQ0FBQyxNQUFELEVBQVMsVUFBQzVJLEtBQUQsRUFBVztRQUMxQmlSLFFBQVEsQ0FBQ0csT0FBVCxDQUFpQnBSLEtBQUssQ0FBQyxDQUFELENBQXRCLEVBQTJCQSxLQUFLLENBQUMsQ0FBRCxDQUFoQztPQURNLENBQVI7TUFJQTZRLFNBQVMsQ0FBQ1EsV0FBVixDQUFzQkosUUFBUSxDQUFDSyxVQUEvQjs7TUFFQXJKLE9BQU8sQ0FBQ3NKLFVBQVIsR0FBcUIsWUFBTTtRQUN6QnRKLE9BQU8sQ0FBQ2dKLFFBQVIsQ0FBaUJPLE1BQWpCLENBQXdCdkosT0FBTyxDQUFDdUksS0FBaEMsRUFBdUN2SSxPQUFPLENBQUM2SCxNQUFSLENBQWVyRyxNQUF0RDtPQURGOztNQUlBeEIsT0FBTyxDQUFDd0osVUFBUixHQUFxQnRHLEdBQUcsQ0FBQ3VELElBQUosQ0FBUyxVQUFBRixLQUFLLEVBQUk7UUFDckN2RyxPQUFPLENBQUNzSixVQUFSLENBQW1CL0MsS0FBbkI7T0FEbUIsQ0FBckI7Ozs7MkNBS3FCb0MsZUF2Q3pCLEVBdUMwQztVQUNoQ2MsT0FBTyxHQUFHLEtBQUtmLGFBQUwsQ0FBbUJlLE9BQW5CLElBQThCLFFBQTlDOztjQUVRQSxPQUFSO2FBQ08sTUFBTDtVQUNFZCxlQUFlLENBQUNlLFNBQWhCLEdBQTRCLElBQTVCOzs7Ozs7YUFNR2YsZUFBUDs7Ozs7OztJQ3BEU2dCLGNBQWI7O0FBQUE7MEJBQ2NDLGFBQVosRUFBMkI7OztTQUNwQkEsYUFBTCxHQUFxQkEsYUFBckI7Ozs7OzBCQUdJMUcsR0FMUixRQUt3QjtVQUFWbEQsT0FBVSxRQUFWQSxPQUFVO01BQ3BCQSxPQUFPLENBQUM2SixRQUFSLEdBQW1CLEtBQUtELGFBQUwsQ0FBbUI1SixPQUFuQixDQUFuQjtNQUVBQSxPQUFPLENBQUM4SixZQUFSLEdBQXVCNUcsR0FBRyxDQUFDdUQsSUFBSixDQUFTLFlBQU07UUFDcEN6RyxPQUFPLENBQUM2SixRQUFSLENBQWlCRSxNQUFqQjtPQURxQixDQUF2Qjs7Ozs7OztJQ1JTQyxZQUFiOztBQUFBOzs7Ozs7OzBCQUNROUcsR0FEUixRQUN3QjtVQUFWbEQsT0FBVSxRQUFWQSxPQUFVO01BQ3BCeUMsTUFBTSxDQUFDd0gsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtRQUN0Q2pLLE9BQU8sQ0FBQzZJLElBQVIsR0FBZSxDQUFDcEcsTUFBTSxDQUFDcUcsVUFBUixFQUFvQnJHLE1BQU0sQ0FBQ3NHLFdBQTNCLENBQWY7T0FERjs7Ozs7OztBQ0ZKOzs7Ozs7Ozs7QUFVQTtBQUdBLElBQU1tQixRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO1FBQ2YsSUFBSXRSLEtBQUosQ0FBVSwrREFBVixDQUFOO0NBREY7O0FBSUEsSUFBSTtNQUNFLENBQUN1UixRQUFMLEVBQWVELFFBQVE7Q0FEekIsQ0FFRSxPQUFPclUsR0FBUCxFQUFZO0VBQ1pxVSxRQUFROztBQU9WOzs7Ozs7OzsifQ==
