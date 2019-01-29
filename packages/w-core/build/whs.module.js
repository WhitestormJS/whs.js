/* WhitestormJS Framework v3.0.0-alpha.1 */
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

!(function(global) {

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
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = module.exports;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
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
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
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
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
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
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
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
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
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
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
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

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
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
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

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
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
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
        var i = -1, next = function next() {
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
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
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
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
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

        return !! caught;
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

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
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

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
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

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
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
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
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
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
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
            outputData = module.bridges[bridgeName];
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

const version = "3.0.0-alpha.1";

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
      console.log(processors);
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
          if (e.enabled) e.func(e.clock);
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
          var scene;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  scene = manager.scene;

                  if (!component.isAsync) {
                    _context.next = 9;
                    break;
                  }

                  _context.t0 = scene;
                  _context.next = 5;
                  return component.native;

                case 5:
                  _context.t1 = _context.sent;

                  _context.t0.add.call(_context.t0, _context.t1);

                  _context.next = 10;
                  break;

                case 9:
                  scene.add(component.native);

                case 10:
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
      manager.renderLoop = app.loop(function () {
        var scene = manager.scene,
            camera = manager.camera;
        manager.renderer.render(scene, camera.native);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUtbW9kdWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCIuLi9zcmMvY29yZS9Nb2R1bGVTeXN0ZW0uanMiLCIuLi9zcmMvY29yZS9Db21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jb25zdHJ1Y3QuanMiLCIuLi9zcmMvcG9seWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXMuanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvY29yZS9Mb29wLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCIuLi9zcmMvY29yZS9TdG9yZS5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzL2FwcGx5VHJhbnNmb3JtLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvTWVzaC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0NhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0xpZ2h0LmpzIiwiLi4vc3JjL21vZHVsZXMvVHJlZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL1JlbmRlcmluZ01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL0NvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvUmVzaXplTW9kdWxlLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbiAgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKClcbik7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xufSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgdHJ5IHtcbiAgICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIH0gY2F0Y2goZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FzeW5jVG9HZW5lcmF0b3I7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwiZXhwb3J0IGNsYXNzIE1vZHVsZVN5c3RlbSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLm1vZHVsZXMgPSBvcHRpb25zLm1vZHVsZXMgfHwgW107XG5cbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgY29uc3QgdW5yZXNvbHZlZFdhcm5zID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHVwZGF0ZUhhbmRsZXJzID0ge307XG4gICAgbGV0IGFjdGl2ZU1vZHVsZSA9IG51bGw7XG5cbiAgICB0aGlzLm1hbmFnZXIgPSBuZXcgUHJveHkoZGF0YSwge1xuICAgICAgc2V0KG9iaiwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgb2JqW3Byb3BdID0gdmFsdWU7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcCwgdXBkYXRlSGFuZGxlcnNbcHJvcF0pO1xuICAgICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcF0pIHtcbiAgICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wXS5mb3JFYWNoKGNiID0+IGNiKHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG5cbiAgICAgIGdldChvYmosIHByb3ApIHtcbiAgICAgICAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialtwcm9wXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB3YXJucyA9IHVucmVzb2x2ZWRXYXJucy5nZXQoYWN0aXZlTW9kdWxlKTtcblxuICAgICAgICAgIGlmICh3YXJucyAmJiB3YXJuc1twcm9wXSlcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybih3YXJuc1twcm9wXSwgYWN0aXZlTW9kdWxlKTtcblxuICAgICAgICAgIGlmIChhY3RpdmVNb2R1bGUgPT09IG51bGwpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBhY3RpdmUgbW9kdWxlJyk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQWN0aXZlIG1vZHVsZTogJywgYWN0aXZlTW9kdWxlKTtcblxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgbWFuYWdlci4ke3Byb3B9IGlzIHJlcXVpcmVkIGJ5IHRoZSBhY3RpdmUgbW9kdWxlLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3YXJuID0gbW9kdWxlID0+IChkZXBlbmRlbmN5LCBtZXNzYWdlKSA9PiB7XG4gICAgICB1bnJlc29sdmVkV2FybnMuc2V0KG1vZHVsZSwge1xuICAgICAgICAuLi4odW5yZXNvbHZlZFdhcm5zLmdldChtb2R1bGUpIHx8IHt9KSxcbiAgICAgICAgW2RlcGVuZGVuY3ldOiBtZXNzYWdlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBvblVwZGF0ZSA9IChwcm9wTmFtZSwgaGFuZGxlcikgPT4ge1xuICAgICAgaWYgKHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXSkge1xuICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXSA9IFtoYW5kbGVyXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXSkge1xuICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5zcGxpY2UoXG4gICAgICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0uaW5kZXhPZihoYW5kbGVyKSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzID0gKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCBtb2R1bGUgb2YgdGhpcy5tb2R1bGVzKSB7XG4gICAgICAgIGlmICgnc2V0dXAnIGluIG1vZHVsZSkge1xuICAgICAgICAgIGFjdGl2ZU1vZHVsZSA9IG1vZHVsZTtcblxuICAgICAgICAgIG1vZHVsZS5zZXR1cCh0aGlzLCB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgbWFuYWdlcjogdGhpcy5tYW5hZ2VyLFxuICAgICAgICAgICAgd2Fybjogd2Fybihtb2R1bGUpLFxuICAgICAgICAgICAgb25VcGRhdGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhY3RpdmVNb2R1bGUgPSBudWxsO1xuICAgIH07XG4gIH1cblxuICBicmlkZ2UoYnJpZGdlTmFtZSwgaW5wdXREYXRhKSB7XG4gICAgbGV0IG91dHB1dERhdGEgPSBpbnB1dERhdGE7XG5cbiAgICBmb3IgKGNvbnN0IG1vZHVsZSBvZiB0aGlzLm1vZHVsZXMpIHtcbiAgICAgIGlmIChtb2R1bGUuYnJpZGdlcyAmJiBicmlkZ2VOYW1lIGluIG1vZHVsZS5icmlkZ2VzKSB7XG4gICAgICAgIG91dHB1dERhdGEgPSBtb2R1bGUuYnJpZGdlc1ticmlkZ2VOYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0RGF0YTtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIGlzQXN5bmMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBhc3luY09wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyAmJiBvcHRpb25zKCk7XG5cbiAgICBzdXBlcihhc3luY09wdGlvbnMgPyB7bW9kdWxlczogW119IDogb3B0aW9ucyk7XG5cbiAgICB0aGlzLmlzQXN5bmMgPSBhc3luY09wdGlvbnMgaW5zdGFuY2VvZiBQcm9taXNlO1xuXG4gICAgdGhpcy5uYXRpdmUgPSB0aGlzLmlzQXN5bmMgPyBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGFzeW5jT3B0aW9ucy50aGVuKG9wdGlvbnMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuYnVpbGQob3B0aW9ucykpO1xuICAgICAgfSk7XG4gICAgfSkgOiB0aGlzLmJ1aWxkKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucygpIDogb3B0aW9ucyk7XG5cbiAgICB0aGlzLnNldHVwTW9kdWxlcygpO1xuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgY29uc29sZS5lcnJvcignWW91IHNob3VsZCB1c2UgeW91ciBvd24gLmJ1aWxkKCknKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGFkZChjb21wb25lbnQpIHtcbiAgICBjb25zdCBzZWxmTmF0aXZlID0gdGhpcy5pc0FzeW5jID8gYXdhaXQgdGhpcy5uYXRpdmUgOiB0aGlzLm5hdGl2ZTtcbiAgICBjb25zdCBjaGlsZE5hdGl2ZSA9IGNvbXBvbmVudC5pc0FzeW5jID8gYXdhaXQgY29tcG9uZW50Lm5hdGl2ZSA6IGNvbXBvbmVudC5uYXRpdmU7XG5cbiAgICBzZWxmTmF0aXZlLmFkZChjaGlsZE5hdGl2ZSk7XG4gIH1cbn1cbiIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcblxuICB0cnkge1xuICAgIERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gIGlmIChpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IFJlZmxlY3QuY29uc3RydWN0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgdmFyIGEgPSBbbnVsbF07XG4gICAgICBhLnB1c2guYXBwbHkoYSwgYXJncyk7XG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICAgIGlmIChDbGFzcykgc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdDsiLCJleHBvcnQgY29uc3Qgc3lzdGVtID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG59O1xuIiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImV4cG9ydCBjbGFzcyBEZWZpbmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvciguLi5kYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIHNldHVwKGFwcCwge21hbmFnZXIsIC4uLm90aGVyfSkge1xuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihtYW5hZ2VyLCB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJyA/IGRhdGEobWFuYWdlciwgb3RoZXIpIDogZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzIExvb3BcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZWFjaCBhbmltYXRpb24gZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNsb2NrPXRydWVdIHBhc3NlcyBhIENsb2NrIHRvIHRoZSBmdW5jdGlvbiB3aGVuIGNhbGxlZCwgaWYgdHJ1ZVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3RvcihmdW5jKSB7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExvb3Bcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgc3RhdGljIGFzeW5jTG9hZGVyID0ge1xuICAgIGxvYWQoYXN5bmNEYXRhLCBvbkNvbXBsZXRlLCBvblByb2dyZXNzLCBvbkVycm9yKSB7XG4gICAgICBhc3luY0RhdGEoKS50aGVuKG9uQ29tcGxldGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihsb2FkZXJzKSB7XG4gICAgdGhpcy5sb2FkZXJzID0gbG9hZGVycztcbiAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICB0aGlzLnByb2Nlc3NvcnMgPSB7fTtcbiAgfVxuXG4gIHByb2Nlc3MoYXNzZXRUeXBlLCBwcm9jZXNzb3IpIHtcbiAgICBpZiAodGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0pIHtcbiAgICAgIHRoaXMucHJvY2Vzc29yc1thc3NldFR5cGVdLnB1c2gocHJvY2Vzc29yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0gPSBbcHJvY2Vzc29yXTtcbiAgICB9XG4gIH1cblxuICBsb2FkKGFzc2V0TmFtZSwgdXJsLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBbLCBhc3NldFR5cGVdID0gLyguKilcXC4vLmV4ZWMoYXNzZXROYW1lKTtcbiAgICBjb25zdCBsb2FkZXIgPSB0aGlzLmxvYWRlcnNbYXNzZXRUeXBlXTtcbiAgICBjb25zdCBwcm9jZXNzb3JzID0gdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0gfHwgW107XG5cbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzb3JzKTtcblxuICAgIHRoaXMucmVmc1thc3NldE5hbWVdID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9hZGVyLmxvYWQoXG4gICAgICAgIHVybCxcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgcHJvY2Vzc29ycy5yZWR1Y2UoXG4gICAgICAgICAgICAgIChuZXdEYXRhLCBwcm9jZXNzb3IpID0+IHByb2Nlc3NvcihuZXdEYXRhLCBvcHRpb25zLCBhc3NldE5hbWUpLFxuICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZWZzW2Fzc2V0TmFtZV07XG4gIH1cblxuICByZWYoYXNzZXROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucmVmc1thc3NldE5hbWVdO1xuICB9XG59XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi9wb2x5ZmlsbCc7XG5pbXBvcnQge0RlZmluZU1vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy9EZWZpbmVNb2R1bGUnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TG9vcH0gZnJvbSAnLi9Mb29wJztcbmltcG9ydCB7U3RvcmV9IGZyb20gJy4vU3RvcmUnO1xuXG4vKipcbiAqIEBjbGFzcyBBcHBcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBwcmVwYXJlIGEgd29ybGQgc2NlbmUsIHNldHVwIHBoeXNpY3MsIGNhbWVyYSwgcmVuZGVyZXIgYW5kIGFsbCBvdGhlciB0aGluZ3MgdGhhdCB5b3UgdXN1YWxseSBkbyBiZWZvcmUgbWFraW5nIG1lc2hlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFttb2R1bGVzPVtdXSAtIEFycmF5IG9mIE1vZHVsZXNcbiAqIEBleHRlbmRzIE1vZHVsZVN5c3RlbVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIHN0YXRpYyBTdG9yZSA9IFN0b3JlO1xuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI2VuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZW5hYmxlZCA9IHRydWU7XG4gIGNsb2NrID0gbmV3IENsb2NrKCk7XG5cbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIHN0YXRpYyBkZWZpbmUgPSAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiBuZXcgRGVmaW5lTW9kdWxlKC4uLmFyZ3MpO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcbiAgICBzdXBlcih7bW9kdWxlc30pO1xuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcHJvY2VzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RBbmltRnJhbWUoKCkgPT4gcHJvY2VzcygpKTtcbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IHRoaXMubG9vcHMubGVuZ3RoOyBpIDwgbGw7IGkrKykge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5sb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5mdW5jKGUuY2xvY2spO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLnJlcXVlc3QpXG4gICAgICBwcm9jZXNzKCk7XG4gIH1cblxuICBsb29wKGxvb3BDYWxsYmFjaykge1xuICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChsb29wQ2FsbGJhY2spO1xuICAgIHRoaXMubG9vcHMucHVzaChsb29wKTtcblxuICAgIHJldHVybiBsb29wO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG4iLCJmdW5jdGlvbiBhcHBseUxvY2FsVHJhbnNmb3JtKG1hdGhUeXBlLCBkYXRhKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuO1xuXG4gIGxldCBhc3NpZ25EYXRhID0ge307XG5cbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWF0aFR5cGUpLmNvbnN0cnVjdG9yKSB7IC8vIFRIUkVFLlZlY3RvcjMgPT09IFRIUkVFLlZlY3RvcjNcbiAgICBtYXRoVHlwZS5jb3B5KGRhdGEpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgYXNzaWduRGF0YSA9IHtcbiAgICAgIHg6IGRhdGFbMF0sXG4gICAgICB5OiBkYXRhWzFdLFxuICAgICAgejogZGF0YVsyXSxcbiAgICAgIHc6IGRhdGFbM11cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGFzc2lnbkRhdGEgPSB7XG4gICAgICB4OiBkYXRhLngsXG4gICAgICB5OiBkYXRhLnksXG4gICAgICB6OiBkYXRhLnosXG4gICAgICB3OiBkYXRhLndcbiAgICB9O1xuICB9XG5cbiAgaWYgKG1hdGhUeXBlLncgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlbGV0ZSBhc3NpZ25EYXRhLnc7XG4gIH1cblxuICBPYmplY3QuYXNzaWduKG1hdGhUeXBlLCBhc3NpZ25EYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKG5hdGl2ZSwgb3B0aW9ucykge1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5wb3NpdGlvbiwgb3B0aW9ucy5wb3NpdGlvbik7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnNjYWxlLCBvcHRpb25zLnNjYWxlKTtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUucm90YXRpb24sIG9wdGlvbnMucm90YXRpb24pO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG9wdGlvbnMuZ2VvbWV0cnk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBvcHRpb25zLm1hdGVyaWFsO1xuXG4gICAgY29uc3QgbWVzaCA9IHRoaXMuYnJpZGdlKCdtZXNoJywgbmV3IE1lc2goXG4gICAgICB0aGlzLmJyaWRnZSgnZ2VvbWV0cnknLCBnZW9tZXRyeSksXG4gICAgICB0aGlzLmJyaWRnZSgnbWF0ZXJpYWwnLCBtYXRlcmlhbClcbiAgICApKTtcblxuICAgIGFwcGx5VHJhbnNmb3JtKG1lc2gsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIG1lc2g7XG4gIH1cbn1cblxuQ29tcG9uZW50Lk1lc2ggPSBNZXNoQ29tcG9uZW50O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIENhbWVyYUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBjYW1lcmEgPSBvcHRpb25zLmNhbWVyYTtcblxuICAgIGFwcGx5VHJhbnNmb3JtKGNhbWVyYSwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5icmlkZ2UoJ2NhbWVyYScsIGNhbWVyYSk7XG4gIH1cblxuICBhdXRvU2l6ZVVwZGF0ZShvblVwZGF0ZSkge1xuICAgIG9uVXBkYXRlKCdzaXplJywgKFt3aWR0aCwgaGVpZ2h0XSkgPT4ge1xuICAgICAgdGhpcy5uYXRpdmUuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICB0aGlzLm5hdGl2ZS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5Db21wb25lbnQuQ2FtZXJhID0gQ2FtZXJhQ29tcG9uZW50O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIExpZ2h0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgYnVpbGQob3B0aW9ucykge1xuICAgIGNvbnN0IGxpZ2h0ID0gb3B0aW9ucy5saWdodDtcblxuICAgIGFwcGx5VHJhbnNmb3JtKGxpZ2h0LCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLmJyaWRnZSgnbGlnaHQnLCBsaWdodCk7XG4gIH1cbn1cblxuQ29tcG9uZW50LkxpZ2h0ID0gTGlnaHRDb21wb25lbnQ7XG4iLCJpbXBvcnQge1NjZW5lfSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlTW9kdWxlIHtcbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLnNjZW5lID0gbmV3IFNjZW5lKCk7XG5cbiAgICBhcHAuYWRkID0gYXN5bmMgKGNvbXBvbmVudCkgPT4ge1xuICAgICAgY29uc3Qgc2NlbmUgPSBtYW5hZ2VyLnNjZW5lO1xuXG4gICAgICBpZiAoY29tcG9uZW50LmlzQXN5bmMpIHtcbiAgICAgICAgc2NlbmUuYWRkKGF3YWl0IGNvbXBvbmVudC5uYXRpdmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUuYWRkKGNvbXBvbmVudC5uYXRpdmUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7V2ViR0xSZW5kZXJlcn0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlT3B0aW9ucyA9IHt9LCByZW5kZXJlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubW9kdWxlT3B0aW9ucyA9IG1vZHVsZU9wdGlvbnM7XG4gICAgdGhpcy5yZW5kZXJlck9wdGlvbnMgPSByZW5kZXJlck9wdGlvbnM7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyLCBvblVwZGF0ZSwgd2Fybn0pIHtcbiAgICB3YXJuKCdzaXplJywgJ21hbmFnZXIuc2l6ZSBzaG91bGQgYmUgYW4gYXJyYXk6IFt3aWR0aCwgaGVpZ2h0XScpO1xuICAgIHdhcm4oJ2NhbWVyYScsICdtYW5hZ2VyLmNhbWVyYSBzaG91bGQgYmUgYSBXSFMuQ29tcG9uZW50LkNhbWVyYScpO1xuICAgIHdhcm4oJ3NjZW5lJywgJ21hbmFnZXIuc2NlbmUgc2hvdWxkIGJlIGEgVEhSRUUuU2NlbmUnKTtcbiAgICB3YXJuKCdjb250YWluZXInLCAnbWFuYWdlci5jb250YWluZXIgc2hvdWxkIGJlIGFuIEhUTUxFbGVtZW50Jyk7XG5cbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXIsXG4gICAgICBjYW1lcmEsXG4gICAgICBzY2VuZSxcbiAgICAgIHNpemUgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF1cbiAgICB9ID0gbWFuYWdlcjtcblxuICAgIGNvbnN0IHJlbmRlcmVyT3B0aW9ucyA9IHRoaXMucmVuZGVyZXJPcHRpb25zIHx8IHt9O1xuXG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLnJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIodGhpcy5wcmVwYXJlUmVuZGVyZXJPcHRpb25zKHJlbmRlcmVyT3B0aW9ucykpO1xuICAgIHJlbmRlcmVyLnNldFNpemUoc2l6ZVswXSwgc2l6ZVsxXSk7XG5cbiAgICBvblVwZGF0ZSgnc2l6ZScsICh2YWx1ZSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgbWFuYWdlci5yZW5kZXJMb29wID0gYXBwLmxvb3AoKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzY2VuZSxcbiAgICAgICAgY2FtZXJhXG4gICAgICB9ID0gbWFuYWdlcjtcblxuICAgICAgbWFuYWdlci5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYS5uYXRpdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJlcGFyZVJlbmRlcmVyT3B0aW9ucyhyZW5kZXJlck9wdGlvbnMpIHtcbiAgICBjb25zdCBxdWFsaXR5ID0gdGhpcy5tb2R1bGVPcHRpb25zLnF1YWxpdHkgfHwgJ21lZGl1bSc7XG5cbiAgICBzd2l0Y2ggKHF1YWxpdHkpIHtcbiAgICAgIGNhc2UgJ2hpZ2gnOlxuICAgICAgICByZW5kZXJlck9wdGlvbnMuYW50aWFsaWFzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyT3B0aW9ucztcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY29udHJvbHNTZXR1cCkge1xuICAgIHRoaXMuY29udHJvbHNTZXR1cCA9IGNvbnRyb2xzU2V0dXA7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIG1hbmFnZXIuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xzU2V0dXAobWFuYWdlcik7XG5cbiAgICBtYW5hZ2VyLmNvbnRyb2xzTG9vcCA9IGFwcC5sb29wKCgpID0+IHtcbiAgICAgIG1hbmFnZXIuY29udHJvbHMudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZXNpemVNb2R1bGUge1xuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBtYW5hZ2VyLnNpemUgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF07XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogTmFtZXNwYWNlIGNvbnRhaW5pbmcgYWxsIGNsYXNzZXMgZnJvbSBhbGwgbW9kdWxlcy4gVXNlZCBhcyBnbG9iYWwgaW4gVU1EIHBhdHRlcm4uXG4gKiBAbmFtZXNwYWNlIFdIU1xuICogQGV4YW1wbGUgPGNhcHRpb24+VGhlIHVzZSBvZiBXSFMgbmFtZXNwYWNlLjwvY2FwdGlvbj5cbiAqIG5ldyBXSFMuQXBwKCkgLy8gY29yZVxuICogbmV3IFdIUy5QZXJzcGVjdGl2ZUNhbWVyYSgpIC8vIGNvbXBvbmVudHNcbiAqIG5ldyBXSFMuUmVzaXplTW9kdWxlKCkgLy8gbW9kdWxlc1xuICogV0hTLmV4dGVuZCgpIC8vIHV0aWxzXG4gKi9cblxuaW1wb3J0IHtSRVZJU0lPTn0gZnJvbSAndGhyZWUnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgaHR0cHM6Ly90aHJlZWpzLm9yZy8nKTtcbn07XG5cbnRyeSB7XG4gIGlmICghUkVWSVNJT04pIHdhcm5EZXBzKCk7XG59IGNhdGNoIChlcnIpIHtcbiAgd2FybkRlcHMoKTtcbn1cblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL3V0aWxzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9pbmRleCc7XG5cbi8vIERFUFJFQ0FUSU9OXG4vLyBleHBvcnQgKiBmcm9tICcuL2RlcHJlY2F0aW9uJztcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwiX3R5cGVvZiIsIk1vZHVsZVN5c3RlbSIsIm9wdGlvbnMiLCJtb2R1bGVzIiwiZGF0YSIsInVucmVzb2x2ZWRXYXJucyIsIk1hcCIsInVwZGF0ZUhhbmRsZXJzIiwiYWN0aXZlTW9kdWxlIiwibWFuYWdlciIsIlByb3h5Iiwic2V0Iiwib2JqIiwicHJvcCIsInZhbHVlIiwiZm9yRWFjaCIsImNiIiwiZ2V0Iiwid2FybnMiLCJjb25zb2xlIiwid2FybiIsImVycm9yIiwiRXJyb3IiLCJtb2R1bGUiLCJkZXBlbmRlbmN5IiwibWVzc2FnZSIsIm9uVXBkYXRlIiwicHJvcE5hbWUiLCJoYW5kbGVyIiwicHVzaCIsInNwbGljZSIsImluZGV4T2YiLCJzZXR1cE1vZHVsZXMiLCJzZXR1cCIsImJyaWRnZU5hbWUiLCJpbnB1dERhdGEiLCJvdXRwdXREYXRhIiwiYnJpZGdlcyIsIkNvbXBvbmVudCIsImFzeW5jT3B0aW9ucyIsImlzQXN5bmMiLCJQcm9taXNlIiwibmF0aXZlIiwicmVzb2x2ZSIsInRoZW4iLCJidWlsZCIsImNvbXBvbmVudCIsInNlbGZOYXRpdmUiLCJjaGlsZE5hdGl2ZSIsImFkZCIsInN5c3RlbSIsIndpbmRvdyIsImdsb2JhbCIsIkRlZmluZU1vZHVsZSIsImFwcCIsIm90aGVyIiwiT2JqZWN0IiwiYXNzaWduIiwiTG9vcCIsImZ1bmMiLCJlbmFibGVkIiwiU3RvcmUiLCJsb2FkZXJzIiwicmVmcyIsInByb2Nlc3NvcnMiLCJhc3NldFR5cGUiLCJwcm9jZXNzb3IiLCJhc3NldE5hbWUiLCJ1cmwiLCJleGVjIiwibG9hZGVyIiwibG9nIiwicmVqZWN0IiwibG9hZCIsInJlZHVjZSIsIm5ld0RhdGEiLCJ1bmRlZmluZWQiLCJhc3luY0RhdGEiLCJvbkNvbXBsZXRlIiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJBcHAiLCJ2ZXJzaW9uIiwiQ2xvY2siLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FsbGJhY2siLCJzZXRUaW1lb3V0IiwicHJvY2VzcyIsInJlcXVlc3QiLCJpIiwibGwiLCJsb29wcyIsImxlbmd0aCIsImUiLCJjbG9jayIsImxvb3BDYWxsYmFjayIsImxvb3AiLCJhcmdzIiwiYXBwbHlMb2NhbFRyYW5zZm9ybSIsIm1hdGhUeXBlIiwiYXNzaWduRGF0YSIsImdldFByb3RvdHlwZU9mIiwiY29uc3RydWN0b3IiLCJjb3B5IiwiQXJyYXkiLCJpc0FycmF5IiwieCIsInkiLCJ6IiwidyIsImFwcGx5VHJhbnNmb3JtIiwicG9zaXRpb24iLCJzY2FsZSIsInJvdGF0aW9uIiwiTWVzaENvbXBvbmVudCIsImdlb21ldHJ5IiwibWF0ZXJpYWwiLCJtZXNoIiwiYnJpZGdlIiwiTWVzaCIsIkNhbWVyYUNvbXBvbmVudCIsImNhbWVyYSIsIndpZHRoIiwiaGVpZ2h0IiwiYXNwZWN0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkNhbWVyYSIsIkxpZ2h0Q29tcG9uZW50IiwibGlnaHQiLCJMaWdodCIsIlRyZWVNb2R1bGUiLCJzY2VuZSIsIlNjZW5lIiwiUmVuZGVyaW5nTW9kdWxlIiwibW9kdWxlT3B0aW9ucyIsInJlbmRlcmVyT3B0aW9ucyIsImNvbnRhaW5lciIsInNpemUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZW5kZXJlciIsIldlYkdMUmVuZGVyZXIiLCJwcmVwYXJlUmVuZGVyZXJPcHRpb25zIiwic2V0U2l6ZSIsImFwcGVuZENoaWxkIiwiZG9tRWxlbWVudCIsInJlbmRlckxvb3AiLCJyZW5kZXIiLCJxdWFsaXR5IiwiYW50aWFsaWFzIiwiQ29udHJvbHNNb2R1bGUiLCJjb250cm9sc1NldHVwIiwiY29udHJvbHMiLCJjb250cm9sc0xvb3AiLCJ1cGRhdGUiLCJSZXNpemVNb2R1bGUiLCJhZGRFdmVudExpc3RlbmVyIiwid2FybkRlcHMiLCJSRVZJU0lPTiIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsQ0FBQyxDQUFDLFNBQVMsTUFBTSxFQUFFOztFQUdqQixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0VBQzFCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7RUFDL0IsSUFBSSxTQUFTLENBQUM7RUFDZCxJQUFJLE9BQU8sR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztFQUN6RCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQztFQUN0RCxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksaUJBQWlCLENBQUM7RUFDckUsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLGVBQWUsQ0FBQztFQUcvRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUM7RUFDeEMsSUFBSSxPQUFPLEVBQUU7SUFDWCxBQUFjOzs7TUFHWixjQUFjLEdBQUcsT0FBTyxDQUFDO0tBQzFCOzs7SUFHRCxPQUFPO0dBQ1I7Ozs7RUFJRCxPQUFPLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEFBQVcsTUFBTSxDQUFDLE9BQU8sQUFBSyxDQUFDOztFQUVyRSxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7O0lBRWpELElBQUksY0FBYyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxZQUFZLFNBQVMsR0FBRyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQzdGLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQzs7OztJQUk3QyxTQUFTLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O0lBRTdELE9BQU8sU0FBUyxDQUFDO0dBQ2xCO0VBQ0QsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztFQVlwQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJO01BQ0YsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7S0FDbkQsQ0FBQyxPQUFPLEdBQUcsRUFBRTtNQUNaLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztLQUNwQztHQUNGOztFQUVELElBQUksc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUM7RUFDOUMsSUFBSSxzQkFBc0IsR0FBRyxnQkFBZ0IsQ0FBQztFQUM5QyxJQUFJLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztFQUNwQyxJQUFJLGlCQUFpQixHQUFHLFdBQVcsQ0FBQzs7OztFQUlwQyxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzs7Ozs7O0VBTTFCLFNBQVMsU0FBUyxHQUFHLEVBQUU7RUFDdkIsU0FBUyxpQkFBaUIsR0FBRyxFQUFFO0VBQy9CLFNBQVMsMEJBQTBCLEdBQUcsRUFBRTs7OztFQUl4QyxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztFQUMzQixpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxZQUFZO0lBQzlDLE9BQU8sSUFBSSxDQUFDO0dBQ2IsQ0FBQzs7RUFFRixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0VBQ3JDLElBQUksdUJBQXVCLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6RSxJQUFJLHVCQUF1QjtNQUN2Qix1QkFBdUIsS0FBSyxFQUFFO01BQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsY0FBYyxDQUFDLEVBQUU7OztJQUd4RCxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQztHQUM3Qzs7RUFFRCxJQUFJLEVBQUUsR0FBRywwQkFBMEIsQ0FBQyxTQUFTO0lBQzNDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0VBQ3pELGlCQUFpQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsV0FBVyxHQUFHLDBCQUEwQixDQUFDO0VBQzFFLDBCQUEwQixDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztFQUMzRCwwQkFBMEIsQ0FBQyxpQkFBaUIsQ0FBQztJQUMzQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUM7Ozs7RUFJdEQsU0FBUyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUU7SUFDeEMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLE1BQU0sRUFBRTtNQUNuRCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxHQUFHLEVBQUU7UUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztPQUNsQyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0dBQ0o7O0VBRUQsT0FBTyxDQUFDLG1CQUFtQixHQUFHLFNBQVMsTUFBTSxFQUFFO0lBQzdDLElBQUksSUFBSSxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQzlELE9BQU8sSUFBSTtRQUNQLElBQUksS0FBSyxpQkFBaUI7OztRQUcxQixDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksTUFBTSxtQkFBbUI7UUFDdkQsS0FBSyxDQUFDO0dBQ1gsQ0FBQzs7RUFFRixPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsTUFBTSxFQUFFO0lBQzlCLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTtNQUN6QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0tBQzNELE1BQU07TUFDTCxNQUFNLENBQUMsU0FBUyxHQUFHLDBCQUEwQixDQUFDO01BQzlDLElBQUksRUFBRSxpQkFBaUIsSUFBSSxNQUFNLENBQUMsRUFBRTtRQUNsQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxtQkFBbUIsQ0FBQztPQUNqRDtLQUNGO0lBQ0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sTUFBTSxDQUFDO0dBQ2YsQ0FBQzs7Ozs7O0VBTUYsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsRUFBRTtJQUM1QixPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0dBQ3pCLENBQUM7O0VBRUYsU0FBUyxhQUFhLENBQUMsU0FBUyxFQUFFO0lBQ2hDLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtNQUM1QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztNQUN6RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDcEIsTUFBTTtRQUNMLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLEtBQUs7WUFDTCxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1VBQ2pDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFFO1lBQ3pELE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztXQUN4QyxFQUFFLFNBQVMsR0FBRyxFQUFFO1lBQ2YsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1dBQ3ZDLENBQUMsQ0FBQztTQUNKOztRQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxTQUFTLEVBQUU7Ozs7VUFJckQsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7VUFDekIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pCLEVBQUUsU0FBUyxLQUFLLEVBQUU7OztVQUdqQixPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNoRCxDQUFDLENBQUM7T0FDSjtLQUNGOztJQUVELElBQUksZUFBZSxDQUFDOztJQUVwQixTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO01BQzVCLFNBQVMsMEJBQTBCLEdBQUc7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLE9BQU8sRUFBRSxNQUFNLEVBQUU7VUFDM0MsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDLENBQUMsQ0FBQztPQUNKOztNQUVELE9BQU8sZUFBZTs7Ozs7Ozs7Ozs7OztRQWFwQixlQUFlLEdBQUcsZUFBZSxDQUFDLElBQUk7VUFDcEMsMEJBQTBCOzs7VUFHMUIsMEJBQTBCO1NBQzNCLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQztLQUNwQzs7OztJQUlELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0dBQ3hCOztFQUVELHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUMvQyxhQUFhLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsWUFBWTtJQUN6RCxPQUFPLElBQUksQ0FBQztHQUNiLENBQUM7RUFDRixPQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQzs7Ozs7RUFLdEMsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtJQUM1RCxJQUFJLElBQUksR0FBRyxJQUFJLGFBQWE7TUFDMUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQztLQUMxQyxDQUFDOztJQUVGLE9BQU8sT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztRQUN2QyxJQUFJO1FBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLE1BQU0sRUFBRTtVQUNoQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakQsQ0FBQyxDQUFDO0dBQ1IsQ0FBQzs7RUFFRixTQUFTLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0lBQ2hELElBQUksS0FBSyxHQUFHLHNCQUFzQixDQUFDOztJQUVuQyxPQUFPLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7TUFDbEMsSUFBSSxLQUFLLEtBQUssaUJBQWlCLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO09BQ2pEOztNQUVELElBQUksS0FBSyxLQUFLLGlCQUFpQixFQUFFO1FBQy9CLElBQUksTUFBTSxLQUFLLE9BQU8sRUFBRTtVQUN0QixNQUFNLEdBQUcsQ0FBQztTQUNYOzs7O1FBSUQsT0FBTyxVQUFVLEVBQUUsQ0FBQztPQUNyQjs7TUFFRCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztNQUN4QixPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7TUFFbEIsT0FBTyxJQUFJLEVBQUU7UUFDWCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksUUFBUSxFQUFFO1VBQ1osSUFBSSxjQUFjLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1VBQzVELElBQUksY0FBYyxFQUFFO1lBQ2xCLElBQUksY0FBYyxLQUFLLGdCQUFnQixFQUFFLFNBQVM7WUFDbEQsT0FBTyxjQUFjLENBQUM7V0FDdkI7U0FDRjs7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFOzs7VUFHN0IsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O1NBRTVDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtVQUNyQyxJQUFJLEtBQUssS0FBSyxzQkFBc0IsRUFBRTtZQUNwQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7WUFDMUIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1dBQ25COztVQUVELE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O1NBRXhDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtVQUN0QyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkM7O1FBRUQsS0FBSyxHQUFHLGlCQUFpQixDQUFDOztRQUUxQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFOzs7VUFHNUIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJO2NBQ2hCLGlCQUFpQjtjQUNqQixzQkFBc0IsQ0FBQzs7VUFFM0IsSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLGdCQUFnQixFQUFFO1lBQ25DLFNBQVM7V0FDVjs7VUFFRCxPQUFPO1lBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHO1lBQ2pCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtXQUNuQixDQUFDOztTQUVILE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtVQUNsQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7OztVQUcxQixPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztVQUN6QixPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDMUI7T0FDRjtLQUNGLENBQUM7R0FDSDs7Ozs7O0VBTUQsU0FBUyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFO0lBQzlDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTs7O01BR3hCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztNQUV4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO1FBQzlCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7OztVQUc1QixPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztVQUMxQixPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztVQUN4QixtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7O1VBRXZDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7OztZQUc5QixPQUFPLGdCQUFnQixDQUFDO1dBQ3pCO1NBQ0Y7O1FBRUQsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLFNBQVM7VUFDekIsZ0RBQWdELENBQUMsQ0FBQztPQUNyRDs7TUFFRCxPQUFPLGdCQUFnQixDQUFDO0tBQ3pCOztJQUVELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O0lBRTlELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7TUFDM0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7TUFDekIsT0FBTyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO01BQ3pCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO01BQ3hCLE9BQU8sZ0JBQWdCLENBQUM7S0FDekI7O0lBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7SUFFdEIsSUFBSSxFQUFFLElBQUksRUFBRTtNQUNWLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO01BQ3pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQztNQUNoRSxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztNQUN4QixPQUFPLGdCQUFnQixDQUFDO0tBQ3pCOztJQUVELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTs7O01BR2IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7TUFHMUMsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDOzs7Ozs7OztNQVFoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO09BQ3pCOztLQUVGLE1BQU07O01BRUwsT0FBTyxJQUFJLENBQUM7S0FDYjs7OztJQUlELE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLE9BQU8sZ0JBQWdCLENBQUM7R0FDekI7Ozs7RUFJRCxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7RUFFMUIsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsV0FBVyxDQUFDOzs7Ozs7O0VBT3BDLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxXQUFXO0lBQzlCLE9BQU8sSUFBSSxDQUFDO0dBQ2IsQ0FBQzs7RUFFRixFQUFFLENBQUMsUUFBUSxHQUFHLFdBQVc7SUFDdkIsT0FBTyxvQkFBb0IsQ0FBQztHQUM3QixDQUFDOztFQUVGLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRTtJQUMxQixJQUFJLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7SUFFaEMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO01BQ2IsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUI7O0lBRUQsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO01BQ2IsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDM0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUI7O0lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDN0I7O0VBRUQsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFO0lBQzVCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQ3ZCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNsQixLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztHQUMzQjs7RUFFRCxTQUFTLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Ozs7SUFJNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdkMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNsQjs7RUFFRCxPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsTUFBTSxFQUFFO0lBQzlCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO01BQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDaEI7SUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7SUFJZixPQUFPLFNBQVMsSUFBSSxHQUFHO01BQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1VBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1VBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1VBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7T0FDRjs7Ozs7TUFLRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztNQUNqQixPQUFPLElBQUksQ0FBQztLQUNiLENBQUM7R0FDSCxDQUFDOztFQUVGLFNBQVMsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUN4QixJQUFJLFFBQVEsRUFBRTtNQUNaLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztNQUM5QyxJQUFJLGNBQWMsRUFBRTtRQUNsQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDdEM7O01BRUQsSUFBSSxPQUFPLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQ3ZDLE9BQU8sUUFBUSxDQUFDO09BQ2pCOztNQUVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxTQUFTLElBQUksR0FBRztVQUNqQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRTtjQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztjQUNsQixPQUFPLElBQUksQ0FBQzthQUNiO1dBQ0Y7O1VBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7VUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O1VBRWpCLE9BQU8sSUFBSSxDQUFDO1NBQ2IsQ0FBQzs7UUFFRixPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO09BQ3pCO0tBQ0Y7OztJQUdELE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7R0FDN0I7RUFDRCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7RUFFeEIsU0FBUyxVQUFVLEdBQUc7SUFDcEIsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0dBQ3pDOztFQUVELE9BQU8sQ0FBQyxTQUFTLEdBQUc7SUFDbEIsV0FBVyxFQUFFLE9BQU87O0lBRXBCLEtBQUssRUFBRSxTQUFTLGFBQWEsRUFBRTtNQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztNQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDOzs7TUFHZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO01BQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO01BQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztNQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztNQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQzs7TUFFckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7O01BRXZDLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7O1VBRXJCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO2NBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztjQUN2QixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1dBQ3hCO1NBQ0Y7T0FDRjtLQUNGOztJQUVELElBQUksRUFBRSxXQUFXO01BQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O01BRWpCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDbkMsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztNQUN0QyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQy9CLE1BQU0sVUFBVSxDQUFDLEdBQUcsQ0FBQztPQUN0Qjs7TUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDbEI7O0lBRUQsaUJBQWlCLEVBQUUsU0FBUyxTQUFTLEVBQUU7TUFDckMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2IsTUFBTSxTQUFTLENBQUM7T0FDakI7O01BRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO01BQ25CLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7UUFDM0IsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDdEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDdkIsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7O1FBRW5CLElBQUksTUFBTSxFQUFFOzs7VUFHVixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztVQUN4QixPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztTQUN6Qjs7UUFFRCxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUM7T0FDbEI7O01BRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNwRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7O1FBRTlCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7Ozs7VUFJM0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7O1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7VUFDN0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7VUFDOUMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7O1VBRWxELElBQUksUUFBUSxJQUFJLFVBQVUsRUFBRTtZQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRTtjQUM5QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUU7Y0FDdkMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pDOztXQUVGLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUU7Y0FDOUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyQzs7V0FFRixNQUFNLElBQUksVUFBVSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFO2NBQ2hDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNqQzs7V0FFRixNQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1dBQzNEO1NBQ0Y7T0FDRjtLQUNGOztJQUVELE1BQU0sRUFBRSxTQUFTLElBQUksRUFBRSxHQUFHLEVBQUU7TUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNwRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFO1VBQ2hDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztVQUN6QixNQUFNO1NBQ1A7T0FDRjs7TUFFRCxJQUFJLFlBQVk7V0FDWCxJQUFJLEtBQUssT0FBTztXQUNoQixJQUFJLEtBQUssVUFBVSxDQUFDO1VBQ3JCLFlBQVksQ0FBQyxNQUFNLElBQUksR0FBRztVQUMxQixHQUFHLElBQUksWUFBWSxDQUFDLFVBQVUsRUFBRTs7O1FBR2xDLFlBQVksR0FBRyxJQUFJLENBQUM7T0FDckI7O01BRUQsSUFBSSxNQUFNLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO01BQ3pELE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO01BQ25CLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztNQUVqQixJQUFJLFlBQVksRUFBRTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDcEMsT0FBTyxnQkFBZ0IsQ0FBQztPQUN6Qjs7TUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUI7O0lBRUQsUUFBUSxFQUFFLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTtNQUNuQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQzNCLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQztPQUNsQjs7TUFFRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTztVQUN2QixNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7T0FDeEIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO09BQ25CLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxRQUFRLEVBQUU7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7T0FDdEI7O01BRUQsT0FBTyxnQkFBZ0IsQ0FBQztLQUN6Qjs7SUFFRCxNQUFNLEVBQUUsU0FBUyxVQUFVLEVBQUU7TUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNwRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7VUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztVQUNoRCxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7VUFDckIsT0FBTyxnQkFBZ0IsQ0FBQztTQUN6QjtPQUNGO0tBQ0Y7O0lBRUQsT0FBTyxFQUFFLFNBQVMsTUFBTSxFQUFFO01BQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO1VBQzNCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7VUFDOUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUMzQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ3hCLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUN0QjtVQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7T0FDRjs7OztNQUlELE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztLQUMxQzs7SUFFRCxhQUFhLEVBQUUsU0FBUyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtNQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHO1FBQ2QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDMUIsVUFBVSxFQUFFLFVBQVU7UUFDdEIsT0FBTyxFQUFFLE9BQU87T0FDakIsQ0FBQzs7TUFFRixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFOzs7UUFHMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7T0FDdEI7O01BRUQsT0FBTyxnQkFBZ0IsQ0FBQztLQUN6QjtHQUNGLENBQUM7Q0FDSDs7OztFQUlDLENBQUMsV0FBVztJQUNWLE9BQU8sSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQztHQUNuRCxHQUFHLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO0NBQ2xDLENBQUM7OztBQ2h0QkY7Ozs7Ozs7OztBQVNBLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVztFQUNsQixPQUFPLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUM7Q0FDbkQsR0FBRyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDOzs7O0FBSWxDLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxrQkFBa0I7RUFDbkMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBR25FLElBQUksVUFBVSxHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQUM7OztBQUdwRCxDQUFDLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDOztBQUVqQyxpQkFBYyxHQUFHQSxPQUFvQixDQUFDOztBQUV0QyxJQUFJLFVBQVUsRUFBRTs7RUFFZCxDQUFDLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0NBQ25DLE1BQU07O0VBRUwsSUFBSTtJQUNGLE9BQU8sQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0dBQzdCLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDVCxDQUFDLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0dBQ2xDO0NBQ0Y7O0FDcENELGVBQWMsR0FBR0EsYUFBOEIsQ0FBQzs7QUNBaEQsU0FBUyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7RUFDekUsSUFBSTtJQUNGLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQ3hCLENBQUMsT0FBTyxLQUFLLEVBQUU7SUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxPQUFPO0dBQ1I7O0VBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ2hCLE1BQU07SUFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7R0FDNUM7Q0FDRjs7QUFFRCxTQUFTLGlCQUFpQixDQUFDLEVBQUUsRUFBRTtFQUM3QixPQUFPLFlBQVk7SUFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSTtRQUNYLElBQUksR0FBRyxTQUFTLENBQUM7SUFDckIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7TUFDNUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O01BRS9CLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNwQixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztPQUN4RTs7TUFFRCxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDbkIsa0JBQWtCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7T0FDdkU7O01BRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xCLENBQUMsQ0FBQztHQUNKLENBQUM7Q0FDSDs7QUFFRCxvQkFBYyxHQUFHLGlCQUFpQjs7QUNwQ2xDLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7RUFDOUMsSUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUMsRUFBRTtJQUN0QyxNQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FDMUQ7Q0FDRjs7QUFFRCxrQkFBYyxHQUFHLGVBQWU7O0FDTmhDLFNBQVMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtFQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztJQUN2RCxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMvQixJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztHQUMzRDtDQUNGOztBQUVELFNBQVMsWUFBWSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0VBQzFELElBQUksVUFBVSxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7RUFDckUsSUFBSSxXQUFXLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0VBQzdELE9BQU8sV0FBVyxDQUFDO0NBQ3BCOztBQUVELGVBQWMsR0FBRyxZQUFZOzs7QUNoQjdCLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUUsRUFBRSxRQUFRLEdBQUcsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxHQUFHLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsV0FBVyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFOztBQUVyVyxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7RUFDcEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxRQUFRLEVBQUU7SUFDMUUsY0FBYyxHQUFHLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7TUFDL0MsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEIsQ0FBQztHQUNILE1BQU07SUFDTCxjQUFjLEdBQUcsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtNQUMvQyxPQUFPLEdBQUcsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqSSxDQUFDO0dBQ0g7O0VBRUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDckI7O0FBRUQsY0FBYyxHQUFHLE9BQU87OztBQ2hCeEIsU0FBUyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUU7RUFDcEMsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7SUFDbkIsTUFBTSxJQUFJLGNBQWMsQ0FBQywyREFBMkQsQ0FBQyxDQUFDO0dBQ3ZGOztFQUVELE9BQU8sSUFBSSxDQUFDO0NBQ2I7O0FBRUQseUJBQWMsR0FBRyxzQkFBc0I7O0FDSnZDLFNBQVMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtFQUM5QyxJQUFJLElBQUksS0FBS0MsU0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLENBQUMsRUFBRTtJQUN0RSxPQUFPLElBQUksQ0FBQztHQUNiOztFQUVELE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDcEM7O0FBRUQsNkJBQWMsR0FBRywwQkFBMEI7OztBQ1ozQyxTQUFTLGVBQWUsQ0FBQyxDQUFDLEVBQUU7RUFDMUIsY0FBYyxHQUFHLGVBQWUsR0FBRyxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEdBQUcsU0FBUyxlQUFlLENBQUMsQ0FBQyxFQUFFO0lBQzdHLE9BQU8sQ0FBQyxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ2hELENBQUM7RUFDRixPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMzQjs7QUFFRCxjQUFjLEdBQUcsZUFBZTs7OztBQ1BoQyxTQUFTLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzdCLGNBQWMsR0FBRyxlQUFlLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxTQUFTLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pGLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLE9BQU8sQ0FBQyxDQUFDO0dBQ1YsQ0FBQzs7RUFFRixPQUFPLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDOUI7O0FBRUQsY0FBYyxHQUFHLGVBQWU7OztBQ1BoQyxTQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFO0VBQ3ZDLElBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7SUFDM0QsTUFBTSxJQUFJLFNBQVMsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO0dBQzNFOztFQUVELFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRTtJQUNyRSxXQUFXLEVBQUU7TUFDWCxLQUFLLEVBQUUsUUFBUTtNQUNmLFFBQVEsRUFBRSxJQUFJO01BQ2QsWUFBWSxFQUFFLElBQUk7S0FDbkI7R0FDRixDQUFDLENBQUM7RUFDSCxJQUFJLFVBQVUsRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3REOztBQUVELFlBQWMsR0FBRyxTQUFTOztBQ2pCMUIsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7RUFDeEMsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0lBQ2QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO01BQzlCLEtBQUssRUFBRSxLQUFLO01BQ1osVUFBVSxFQUFFLElBQUk7TUFDaEIsWUFBWSxFQUFFLElBQUk7TUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7R0FDSixNQUFNO0lBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztHQUNsQjs7RUFFRCxPQUFPLEdBQUcsQ0FBQztDQUNaOztBQUVELGtCQUFjLEdBQUcsZUFBZTs7QUNiaEMsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFO0VBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3pDLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUVsQyxJQUFJLE9BQU8sTUFBTSxDQUFDLHFCQUFxQixLQUFLLFVBQVUsRUFBRTtNQUN0RCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO1FBQ2xGLE9BQU8sTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7T0FDaEUsQ0FBQyxDQUFDLENBQUM7S0FDTDs7SUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFO01BQzdCLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzFDLENBQUMsQ0FBQztHQUNKOztFQUVELE9BQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRUQsZ0JBQWMsR0FBRyxhQUFhOztJQ3JCakJDLFlBQWI7O0FBQUE7d0JBQ2NDLE9BQVosRUFBcUI7Ozs7O1NBQ2RDLE9BQUwsR0FBZUQsT0FBTyxDQUFDQyxPQUFSLElBQW1CLEVBQWxDO1FBRU1DLElBQUksR0FBRyxFQUFiO1FBQ01DLGVBQWUsR0FBRyxJQUFJQyxHQUFKLEVBQXhCO1FBQ01DLGNBQWMsR0FBRyxFQUF2QjtRQUNJQyxZQUFZLEdBQUcsSUFBbkI7U0FFS0MsT0FBTCxHQUFlLElBQUlDLEtBQUosQ0FBVU4sSUFBVixFQUFnQjtNQUM3Qk8sR0FENkIsZUFDekJDLEdBRHlCLEVBQ3BCQyxJQURvQixFQUNkQyxLQURjLEVBQ1A7UUFDcEJGLEdBQUcsQ0FBQ0MsSUFBRCxDQUFILEdBQVlDLEtBQVosQ0FEb0I7O1lBSWhCUCxjQUFjLENBQUNNLElBQUQsQ0FBbEIsRUFBMEI7VUFDeEJOLGNBQWMsQ0FBQ00sSUFBRCxDQUFkLENBQXFCRSxPQUFyQixDQUE2QixVQUFBQyxFQUFFO21CQUFJQSxFQUFFLENBQUNGLEtBQUQsQ0FBTjtXQUEvQjs7O2VBR0ssSUFBUDtPQVQyQjtNQVk3QkcsR0FaNkIsZUFZekJMLEdBWnlCLEVBWXBCQyxJQVpvQixFQVlkO1lBQ1RBLElBQUksSUFBSUQsR0FBWixFQUFpQjtpQkFDUkEsR0FBRyxDQUFDQyxJQUFELENBQVY7U0FERixNQUVPO2NBQ0NLLEtBQUssR0FBR2IsZUFBZSxDQUFDWSxHQUFoQixDQUFvQlQsWUFBcEIsQ0FBZDtjQUVJVSxLQUFLLElBQUlBLEtBQUssQ0FBQ0wsSUFBRCxDQUFsQixFQUNFTSxPQUFPLENBQUNDLElBQVIsQ0FBYUYsS0FBSyxDQUFDTCxJQUFELENBQWxCLEVBQTBCTCxZQUExQjtjQUVFQSxZQUFZLEtBQUssSUFBckIsRUFDRVcsT0FBTyxDQUFDRSxLQUFSLENBQWMsa0JBQWQsRUFERixLQUdFRixPQUFPLENBQUNFLEtBQVIsQ0FBYyxpQkFBZCxFQUFpQ2IsWUFBakM7Z0JBRUksSUFBSWMsS0FBSixtQkFBcUJULElBQXJCLHdDQUFOOzs7S0ExQlMsQ0FBZjs7UUErQk1PLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUFHLE1BQU07YUFBSSxVQUFDQyxVQUFELEVBQWFDLE9BQWIsRUFBeUI7UUFDOUNwQixlQUFlLENBQUNNLEdBQWhCLENBQW9CWSxNQUFwQixtQkFDTWxCLGVBQWUsQ0FBQ1ksR0FBaEIsQ0FBb0JNLE1BQXBCLEtBQStCLEVBRHJDLHFCQUVHQyxVQUZILEVBRWdCQyxPQUZoQjtPQURpQjtLQUFuQjs7UUFPTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRCxFQUFXQyxPQUFYLEVBQXVCO1VBQ2xDckIsY0FBYyxDQUFDb0IsUUFBRCxDQUFsQixFQUE4QjtRQUM1QnBCLGNBQWMsQ0FBQ29CLFFBQUQsQ0FBZCxDQUF5QkUsSUFBekIsQ0FBOEJELE9BQTlCO09BREYsTUFFTztRQUNMckIsY0FBYyxDQUFDb0IsUUFBRCxDQUFkLEdBQTJCLENBQUNDLE9BQUQsQ0FBM0I7OzthQUdLLFlBQU07WUFDUHJCLGNBQWMsQ0FBQ29CLFFBQUQsQ0FBbEIsRUFBOEI7VUFDNUJwQixjQUFjLENBQUNvQixRQUFELENBQWQsQ0FBeUJHLE1BQXpCLENBQ0V2QixjQUFjLENBQUNvQixRQUFELENBQWQsQ0FBeUJJLE9BQXpCLENBQWlDSCxPQUFqQyxDQURGLEVBRUUsQ0FGRjs7T0FGSjtLQVBGOztTQWlCS0ksWUFBTCxHQUFvQixZQUFNOzs7Ozs7NkJBQ0gsS0FBSSxDQUFDN0IsT0FBMUIsOEhBQW1DO2NBQXhCb0IsTUFBd0I7O2NBQzdCLFdBQVdBLE1BQWYsRUFBdUI7WUFDckJmLFlBQVksR0FBR2UsTUFBZjtZQUVBQSxNQUFNLENBQUNVLEtBQVAsQ0FBYSxLQUFiLEVBQW1CO2NBQ2pCN0IsSUFBSSxFQUFKQSxJQURpQjtjQUVqQkssT0FBTyxFQUFFLEtBQUksQ0FBQ0EsT0FGRztjQUdqQlcsSUFBSSxFQUFFQSxJQUFJLENBQUNHLE1BQUQsQ0FITztjQUlqQkcsUUFBUSxFQUFSQTthQUpGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFTSmxCLFlBQVksR0FBRyxJQUFmO0tBZEY7Ozs7OzJCQWtCSzBCLFVBbEZULEVBa0ZxQkMsU0FsRnJCLEVBa0ZnQztVQUN4QkMsVUFBVSxHQUFHRCxTQUFqQjs7Ozs7OzhCQUVxQixLQUFLaEMsT0FBMUIsbUlBQW1DO2NBQXhCb0IsTUFBd0I7O2NBQzdCQSxNQUFNLENBQUNjLE9BQVAsSUFBa0JILFVBQVUsSUFBSVgsTUFBTSxDQUFDYyxPQUEzQyxFQUFvRDtZQUNsREQsVUFBVSxHQUFHYixNQUFNLENBQUNjLE9BQVAsQ0FBZUgsVUFBZixDQUFiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFJR0UsVUFBUDs7Ozs7OztJQ3pGU0UsU0FBYjs7QUFBQTs7O3VCQUc0Qjs7O1FBQWRwQyxPQUFjLHVFQUFKLEVBQUk7Ozs7UUFDbEJxQyxZQUFZLEdBQUcsT0FBT3JDLE9BQVAsS0FBbUIsVUFBbkIsSUFBaUNBLE9BQU8sRUFBN0Q7aUZBRU1xQyxZQUFZLEdBQUc7TUFBQ3BDLE9BQU8sRUFBRTtLQUFiLEdBQW1CRCxPQUFyQzs7bUZBTFEsS0FFZ0I7O1VBS25Cc0MsT0FBTCxHQUFlRCxZQUFZLFlBQVlFLE9BQXZDO1VBRUtDLE1BQUwsR0FBYyxNQUFLRixPQUFMLEdBQWUsSUFBSUMsT0FBSixDQUFZLFVBQUFFLE9BQU8sRUFBSTtNQUNsREosWUFBWSxDQUFDSyxJQUFiLENBQWtCLFVBQUExQyxPQUFPLEVBQUk7UUFDM0J5QyxPQUFPLENBQUMsTUFBS0UsS0FBTCxDQUFXM0MsT0FBWCxDQUFELENBQVA7T0FERjtLQUQyQixDQUFmLEdBSVQsTUFBSzJDLEtBQUwsQ0FBVyxPQUFPM0MsT0FBUCxLQUFtQixVQUFuQixHQUFnQ0EsT0FBTyxFQUF2QyxHQUE0Q0EsT0FBdkQsQ0FKTDs7VUFNSzhCLFlBQUw7Ozs7Ozs7NEJBR007TUFDTmIsT0FBTyxDQUFDRSxLQUFSLENBQWMsa0NBQWQ7YUFDTyxJQUFQOzs7Ozs7O3dDQUdReUIsU0F4Qlo7Ozs7OztxQkF5QnVCLEtBQUtOLE9BekI1Qjs7Ozs7O3VCQXlCNEMsS0FBS0UsTUF6QmpEOzs7Ozs7Ozs4QkF5QjBELEtBQUtBLE1BekIvRDs7O2dCQXlCVUssVUF6QlY7O3FCQTBCd0JELFNBQVMsQ0FBQ04sT0ExQmxDOzs7Ozs7dUJBMEJrRE0sU0FBUyxDQUFDSixNQTFCNUQ7Ozs7Ozs7OzhCQTBCcUVJLFNBQVMsQ0FBQ0osTUExQi9FOzs7Z0JBMEJVTSxXQTFCVjtnQkE0QklELFVBQVUsQ0FBQ0UsR0FBWCxDQUFlRCxXQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNUIyQi9DLFlBQS9COzs7QUNBQSxTQUFTLHdCQUF3QixHQUFHO0VBQ2xDLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEtBQUssQ0FBQztFQUN2RSxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sS0FBSyxDQUFDO0VBQ3pDLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDOztFQUU3QyxJQUFJO0lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUUsT0FBTyxJQUFJLENBQUM7R0FDYixDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ1YsT0FBTyxLQUFLLENBQUM7R0FDZDtDQUNGOztBQUVELFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO0VBQ3ZDLElBQUksd0JBQXdCLEVBQUUsRUFBRTtJQUM5QixjQUFjLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7R0FDakQsTUFBTTtJQUNMLGNBQWMsR0FBRyxVQUFVLEdBQUcsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7TUFDckUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN0QixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7TUFDakQsSUFBSSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztNQUNqQyxJQUFJLEtBQUssRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUNyRCxPQUFPLFFBQVEsQ0FBQztLQUNqQixDQUFDO0dBQ0g7O0VBRUQsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztDQUMxQzs7QUFFRCxjQUFjLEdBQUcsVUFBVTs7Ozs7QUNoQ3BCLElBQU1pRCxNQUFNLEdBQUc7RUFDcEJDLE1BQU0sRUFBRSxPQUFPQSxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0Q7Q0FENUM7O0FDQVAsU0FBUyw2QkFBNkIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO0VBQ3ZELElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztFQUM5QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7RUFDaEIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNyQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7O0VBRVgsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3RDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTO0lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDM0I7O0VBRUQsT0FBTyxNQUFNLENBQUM7Q0FDZjs7QUFFRCxnQ0FBYyxHQUFHLDZCQUE2Qjs7QUNiOUMsU0FBUyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO0VBQ2xELElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztFQUM5QixJQUFJLE1BQU0sR0FBRyw0QkFBNEIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7RUFDNUQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDOztFQUVYLElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO0lBQ2hDLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUU1RCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtNQUM1QyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDMUIsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTO01BQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsU0FBUztNQUN2RSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0dBQ0Y7O0VBRUQsT0FBTyxNQUFNLENBQUM7Q0FDZjs7QUFFRCwyQkFBYyxHQUFHLHdCQUF3Qjs7SUNyQjVCRSxZQUFiOztBQUFBOzBCQUN1Qjs7O3NDQUFOakQsSUFBTTtNQUFOQSxJQUFNOzs7U0FDZEEsSUFBTCxHQUFZQSxJQUFaOzs7OzswQkFHSWtELEdBTFIsUUFLa0M7VUFBcEI3QyxPQUFvQixRQUFwQkEsT0FBb0I7VUFBUjhDLEtBQVE7O1dBQ3pCbkQsSUFBTCxDQUFVVyxPQUFWLENBQWtCLFVBQUFYLElBQUksRUFBSTtRQUN4Qm9ELE1BQU0sQ0FBQ0MsTUFBUCxDQUFjaEQsT0FBZCxFQUF1QixPQUFPTCxJQUFQLEtBQWdCLFVBQWhCLEdBQTZCQSxJQUFJLENBQUNLLE9BQUQsRUFBVThDLEtBQVYsQ0FBakMsR0FBb0RuRCxJQUEzRTtPQURGOzs7Ozs7O0FDTko7Ozs7Ozs7SUFPTXNELE9BQ0osY0FBWUMsSUFBWixFQUFrQjs7O09BQ1hBLElBQUwsR0FBWUEsSUFBWjtPQUNLQyxPQUFMLEdBQWUsSUFBZjs7O0FDVkosU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFO0VBQzVCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQztDQUNwQzs7QUFFRCxrQkFBYyxHQUFHLGVBQWU7O0FDSmhDLFNBQVMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTtFQUNyQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7RUFDZCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7RUFDZCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7RUFDZixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7O0VBRW5CLElBQUk7SUFDRixLQUFLLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUU7TUFDbEYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7O01BRXBCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLE1BQU07S0FDbkM7R0FDRixDQUFDLE9BQU8sR0FBRyxFQUFFO0lBQ1osRUFBRSxHQUFHLElBQUksQ0FBQztJQUNWLEVBQUUsR0FBRyxHQUFHLENBQUM7R0FDVixTQUFTO0lBQ1IsSUFBSTtNQUNGLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztLQUNqRCxTQUFTO01BQ1IsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUM7S0FDbEI7R0FDRjs7RUFFRCxPQUFPLElBQUksQ0FBQztDQUNiOztBQUVELHdCQUFjLEdBQUcscUJBQXFCOztBQzFCdEMsU0FBUyxnQkFBZ0IsR0FBRztFQUMxQixNQUFNLElBQUksU0FBUyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7Q0FDN0U7O0FBRUQsbUJBQWMsR0FBRyxnQkFBZ0I7O0FDRWpDLFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7RUFDOUIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDO0NBQ2pGOztBQUVELGlCQUFjLEdBQUcsY0FBYzs7SUNWbEJDLEtBQWI7O0FBQUE7aUJBT2NDLE9BQVosRUFBcUI7OztTQUNkQSxPQUFMLEdBQWVBLE9BQWY7U0FDS0MsSUFBTCxHQUFZLEVBQVo7U0FDS0MsVUFBTCxHQUFrQixFQUFsQjs7Ozs7NEJBR01DLFNBYlYsRUFhcUJDLFNBYnJCLEVBYWdDO1VBQ3hCLEtBQUtGLFVBQUwsQ0FBZ0JDLFNBQWhCLENBQUosRUFBZ0M7YUFDekJELFVBQUwsQ0FBZ0JDLFNBQWhCLEVBQTJCcEMsSUFBM0IsQ0FBZ0NxQyxTQUFoQztPQURGLE1BRU87YUFDQUYsVUFBTCxDQUFnQkMsU0FBaEIsSUFBNkIsQ0FBQ0MsU0FBRCxDQUE3Qjs7Ozs7eUJBSUNDLFNBckJQLEVBcUJrQkMsR0FyQmxCLEVBcUJxQztVQUFkbEUsT0FBYyx1RUFBSixFQUFJOzttQkFDWCxTQUFTbUUsSUFBVCxDQUFjRixTQUFkLENBRFc7O1VBQ3hCRixTQUR3Qjs7VUFFM0JLLE1BQU0sR0FBRyxLQUFLUixPQUFMLENBQWFHLFNBQWIsQ0FBZjtVQUNNRCxVQUFVLEdBQUcsS0FBS0EsVUFBTCxDQUFnQkMsU0FBaEIsS0FBOEIsRUFBakQ7TUFFQTlDLE9BQU8sQ0FBQ29ELEdBQVIsQ0FBWVAsVUFBWjtXQUVLRCxJQUFMLENBQVVJLFNBQVYsSUFBdUIsSUFBSTFCLE9BQUosQ0FBWSxVQUFDRSxPQUFELEVBQVU2QixNQUFWLEVBQXFCO1FBQ3RERixNQUFNLENBQUNHLElBQVAsQ0FDRUwsR0FERixFQUVFLFVBQUNoRSxJQUFELEVBQVU7VUFDUnVDLE9BQU8sQ0FDTHFCLFVBQVUsQ0FBQ1UsTUFBWCxDQUNFLFVBQUNDLE9BQUQsRUFBVVQsU0FBVjttQkFBd0JBLFNBQVMsQ0FBQ1MsT0FBRCxFQUFVekUsT0FBVixFQUFtQmlFLFNBQW5CLENBQWpDO1dBREYsRUFFRS9ELElBRkYsQ0FESyxDQUFQO1NBSEosRUFVRXdFLFNBVkYsRUFXRUosTUFYRjtPQURxQixDQUF2QjthQWdCTyxLQUFLVCxJQUFMLENBQVVJLFNBQVYsQ0FBUDs7Ozt3QkFHRUEsU0EvQ04sRUErQ2lCO2FBQ04sS0FBS0osSUFBTCxDQUFVSSxTQUFWLENBQVA7Ozs7Ozs7ZUFoRFNOLHNCQUNVO0VBQ25CWSxJQURtQixnQkFDZEksU0FEYyxFQUNIQyxVQURHLEVBQ1NDLFVBRFQsRUFDcUJDLE9BRHJCLEVBQzhCO0lBQy9DSCxTQUFTLEdBQUdqQyxJQUFaLENBQWlCa0MsVUFBakI7Ozs7QUNNTjs7Ozs7Ozs7O0lBUU1HOzs7Ozs7Ozs7Ozs7Ozs7OztpQkFzQnNCOzs7UUFBZDlFLE9BQWMsdUVBQUosRUFBSTs7OztJQUN4QmdCLE9BQU8sQ0FBQ29ELEdBQVIsbUJBQXVCVyxPQUF2QjsyRUFDTTtNQUFDL0UsT0FBTyxFQUFQQTtLQUFQOzttRkFqQlEsSUFlZ0I7O2lGQWRsQixJQUFJZ0YsS0FBSixFQWNrQjs7aUZBTmxCLEVBTWtCOztVQUluQm5ELFlBQUw7Ozs7Ozs7Ozs7Ozs7OzRCQVVNOzs7VUFDQW9ELGdCQUFnQixHQUFJLFlBQU07ZUFDdkJsQyxNQUFNLENBQUNDLE1BQVAsQ0FBY2tDLHFCQUFkLElBQ0ZuQyxNQUFNLENBQUNDLE1BQVAsQ0FBY21DLDJCQURaLElBRUZwQyxNQUFNLENBQUNDLE1BQVAsQ0FBY29DLHdCQUZaLElBR0YsVUFBVUMsUUFBVixFQUFvQjtVQUNyQnRDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjc0MsVUFBZCxDQUF5QkQsUUFBekIsRUFBbUMsT0FBTyxFQUExQztTQUpKO09BRHVCLEVBQXpCOztVQVNNRSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO1FBQ3BCLE1BQUksQ0FBQ0MsT0FBTCxHQUFlUCxnQkFBZ0IsQ0FBQztpQkFBTU0sT0FBTyxFQUFiO1NBQUQsQ0FBL0I7WUFDSSxDQUFDLE1BQUksQ0FBQzlCLE9BQVYsRUFBbUI7O2FBRWQsSUFBSWdDLENBQUMsR0FBRyxDQUFSLEVBQVdDLEVBQUUsR0FBRyxNQUFJLENBQUNDLEtBQUwsQ0FBV0MsTUFBaEMsRUFBd0NILENBQUMsR0FBR0MsRUFBNUMsRUFBZ0RELENBQUMsRUFBakQsRUFBcUQ7Y0FDN0NJLENBQUMsR0FBRyxNQUFJLENBQUNGLEtBQUwsQ0FBV0YsQ0FBWCxDQUFWO2NBQ0lJLENBQUMsQ0FBQ3BDLE9BQU4sRUFBZW9DLENBQUMsQ0FBQ3JDLElBQUYsQ0FBT3FDLENBQUMsQ0FBQ0MsS0FBVDs7T0FObkI7O1dBVUtyQyxPQUFMLEdBQWUsSUFBZjtVQUVJLENBQUMsS0FBSytCLE9BQVYsRUFDRUQsT0FBTzs7Ozt5QkFHTlEsY0FBYztVQUNYQyxJQUFJLEdBQUcsSUFBSXpDLElBQUosQ0FBU3dDLFlBQVQsQ0FBYjtXQUNLSixLQUFMLENBQVdqRSxJQUFYLENBQWdCc0UsSUFBaEI7YUFFT0EsSUFBUDs7Ozs7RUFsRWNsRzs7ZUFBWmdGLGNBQ1dwQjs7ZUFEWG9CLGVBa0JZLFlBQWE7b0NBQVRtQixJQUFTO0lBQVRBLElBQVM7OzttQkFDaEIvQyxZQUFYLEVBQTJCK0MsSUFBM0I7OztBQ3BDSjs7QUNBQSxTQUFTQyxtQkFBVCxDQUE2QkMsUUFBN0IsRUFBdUNsRyxJQUF2QyxFQUE2QztNQUN2QyxDQUFDQSxJQUFMLEVBQVc7TUFFUG1HLFVBQVUsR0FBRyxFQUFqQjs7TUFFSW5HLElBQUksWUFBWW9ELE1BQU0sQ0FBQ2dELGNBQVAsQ0FBc0JGLFFBQXRCLEVBQWdDRyxXQUFwRCxFQUFpRTs7SUFDL0RILFFBQVEsQ0FBQ0ksSUFBVCxDQUFjdEcsSUFBZDs7R0FERixNQUdPLElBQUl1RyxLQUFLLENBQUNDLE9BQU4sQ0FBY3hHLElBQWQsQ0FBSixFQUF5QjtJQUM5Qm1HLFVBQVUsR0FBRztNQUNYTSxDQUFDLEVBQUV6RyxJQUFJLENBQUMsQ0FBRCxDQURJO01BRVgwRyxDQUFDLEVBQUUxRyxJQUFJLENBQUMsQ0FBRCxDQUZJO01BR1gyRyxDQUFDLEVBQUUzRyxJQUFJLENBQUMsQ0FBRCxDQUhJO01BSVg0RyxDQUFDLEVBQUU1RyxJQUFJLENBQUMsQ0FBRDtLQUpUO0dBREssTUFPQTtJQUNMbUcsVUFBVSxHQUFHO01BQ1hNLENBQUMsRUFBRXpHLElBQUksQ0FBQ3lHLENBREc7TUFFWEMsQ0FBQyxFQUFFMUcsSUFBSSxDQUFDMEcsQ0FGRztNQUdYQyxDQUFDLEVBQUUzRyxJQUFJLENBQUMyRyxDQUhHO01BSVhDLENBQUMsRUFBRTVHLElBQUksQ0FBQzRHO0tBSlY7OztNQVFFVixRQUFRLENBQUNVLENBQVQsS0FBZXBDLFNBQW5CLEVBQThCO1dBQ3JCMkIsVUFBVSxDQUFDUyxDQUFsQjs7O0VBR0Z4RCxNQUFNLENBQUNDLE1BQVAsQ0FBYzZDLFFBQWQsRUFBd0JDLFVBQXhCOzs7QUFHRixBQUFPLFNBQVNVLGNBQVQsQ0FBd0J2RSxNQUF4QixFQUFnQ3hDLE9BQWhDLEVBQXlDO0VBQzlDbUcsbUJBQW1CLENBQUMzRCxNQUFNLENBQUN3RSxRQUFSLEVBQWtCaEgsT0FBTyxDQUFDZ0gsUUFBMUIsQ0FBbkI7RUFDQWIsbUJBQW1CLENBQUMzRCxNQUFNLENBQUN5RSxLQUFSLEVBQWVqSCxPQUFPLENBQUNpSCxLQUF2QixDQUFuQjtFQUNBZCxtQkFBbUIsQ0FBQzNELE1BQU0sQ0FBQzBFLFFBQVIsRUFBa0JsSCxPQUFPLENBQUNrSCxRQUExQixDQUFuQjs7O0lDOUJXQyxhQUFiOztBQUFBOzs7Ozs7Ozs7OzswQkFDUW5ILE9BRFIsRUFDaUI7VUFDUG9ILFFBQVEsR0FBR3BILE9BQU8sQ0FBQ29ILFFBQXpCO1VBQ01DLFFBQVEsR0FBR3JILE9BQU8sQ0FBQ3FILFFBQXpCO1VBRU1DLElBQUksR0FBRyxLQUFLQyxNQUFMLENBQVksTUFBWixFQUFvQixJQUFJQyxJQUFKLENBQy9CLEtBQUtELE1BQUwsQ0FBWSxVQUFaLEVBQXdCSCxRQUF4QixDQUQrQixFQUUvQixLQUFLRyxNQUFMLENBQVksVUFBWixFQUF3QkYsUUFBeEIsQ0FGK0IsQ0FBcEIsQ0FBYjtNQUtBTixjQUFjLENBQUNPLElBQUQsRUFBT3RILE9BQVAsQ0FBZDthQUVPc0gsSUFBUDs7Ozs7RUFaK0JsRixTQUFuQztBQWdCQUEsU0FBUyxDQUFDb0YsSUFBVixHQUFpQkwsYUFBakI7O0lDakJhTSxlQUFiOztBQUFBOzs7Ozs7Ozs7OzswQkFDUXpILE9BRFIsRUFDaUI7VUFDUDBILE1BQU0sR0FBRzFILE9BQU8sQ0FBQzBILE1BQXZCO01BRUFYLGNBQWMsQ0FBQ1csTUFBRCxFQUFTMUgsT0FBVCxDQUFkO2FBRU8sS0FBS3VILE1BQUwsQ0FBWSxRQUFaLEVBQXNCRyxNQUF0QixDQUFQOzs7O21DQUdhbEcsUUFUakIsRUFTMkI7OztNQUN2QkEsUUFBUSxDQUFDLE1BQUQsRUFBUyxnQkFBcUI7O1lBQW5CbUcsS0FBbUI7WUFBWkMsTUFBWTs7UUFDcEMsS0FBSSxDQUFDcEYsTUFBTCxDQUFZcUYsTUFBWixHQUFxQkYsS0FBSyxHQUFHQyxNQUE3Qjs7UUFDQSxLQUFJLENBQUNwRixNQUFMLENBQVlzRixzQkFBWjtPQUZNLENBQVI7YUFLTyxJQUFQOzs7OztFQWZpQzFGLFNBQXJDO0FBbUJBQSxTQUFTLENBQUMyRixNQUFWLEdBQW1CTixlQUFuQjs7SUNuQmFPLGNBQWI7O0FBQUE7Ozs7Ozs7Ozs7OzBCQUNRaEksT0FEUixFQUNpQjtVQUNQaUksS0FBSyxHQUFHakksT0FBTyxDQUFDaUksS0FBdEI7TUFFQWxCLGNBQWMsQ0FBQ2tCLEtBQUQsRUFBUWpJLE9BQVIsQ0FBZDthQUVPLEtBQUt1SCxNQUFMLENBQVksT0FBWixFQUFxQlUsS0FBckIsQ0FBUDs7Ozs7RUFOZ0M3RixTQUFwQztBQVVBQSxTQUFTLENBQUM4RixLQUFWLEdBQWtCRixjQUFsQjs7SUNYYUcsVUFBYjs7QUFBQTs7Ozs7OzswQkFDUS9FLEdBRFIsUUFDd0I7VUFBVjdDLE9BQVUsUUFBVkEsT0FBVTtNQUNwQkEsT0FBTyxDQUFDNkgsS0FBUixHQUFnQixJQUFJQyxLQUFKLEVBQWhCOztNQUVBakYsR0FBRyxDQUFDTCxHQUFKOzs7Ozt5QkFBVSxpQkFBT0gsU0FBUDs7Ozs7O2tCQUNGd0YsS0FERSxHQUNNN0gsT0FBTyxDQUFDNkgsS0FEZDs7dUJBR0p4RixTQUFTLENBQUNOLE9BSE47Ozs7O2dDQUlOOEYsS0FKTTs7eUJBSVV4RixTQUFTLENBQUNKLE1BSnBCOzs7Ozs4QkFJQU8sR0FKQTs7Ozs7O2tCQU1OcUYsS0FBSyxDQUFDckYsR0FBTixDQUFVSCxTQUFTLENBQUNKLE1BQXBCOzs7Ozs7OztTQU5KOzs7Ozs7Ozs7Ozs7SUNKUzhGLGVBQWI7O0FBQUE7NkJBQ3dEO1FBQTFDQyxhQUEwQyx1RUFBMUIsRUFBMEI7UUFBdEJDLGVBQXNCLHVFQUFKLEVBQUk7Ozs7U0FDL0NELGFBQUwsR0FBcUJBLGFBQXJCO1NBQ0tDLGVBQUwsR0FBdUJBLGVBQXZCOzs7OzswQkFHSXBGLEdBTlIsUUFNd0M7VUFBMUI3QyxPQUEwQixRQUExQkEsT0FBMEI7VUFBakJpQixRQUFpQixRQUFqQkEsUUFBaUI7VUFBUE4sSUFBTyxRQUFQQSxJQUFPO01BQ3BDQSxJQUFJLENBQUMsTUFBRCxFQUFTLGtEQUFULENBQUo7TUFDQUEsSUFBSSxDQUFDLFFBQUQsRUFBVyxpREFBWCxDQUFKO01BQ0FBLElBQUksQ0FBQyxPQUFELEVBQVUsdUNBQVYsQ0FBSjtNQUNBQSxJQUFJLENBQUMsV0FBRCxFQUFjLDRDQUFkLENBQUo7VUFHRXVILFNBUGtDLEdBV2hDbEksT0FYZ0MsQ0FPbENrSSxTQVBrQztVQVFsQ2YsTUFSa0MsR0FXaENuSCxPQVhnQyxDQVFsQ21ILE1BUmtDO1VBU2xDVSxLQVRrQyxHQVdoQzdILE9BWGdDLENBU2xDNkgsS0FUa0M7MEJBV2hDN0gsT0FYZ0MsQ0FVbENtSSxJQVZrQztVQVVsQ0EsSUFWa0MsOEJBVTNCLENBQUN6RixNQUFNLENBQUMwRixVQUFSLEVBQW9CMUYsTUFBTSxDQUFDMkYsV0FBM0IsQ0FWMkI7VUFhOUJKLGVBQWUsR0FBRyxLQUFLQSxlQUFMLElBQXdCLEVBQWhEO1VBRU1LLFFBQVEsR0FBR3RJLE9BQU8sQ0FBQ3NJLFFBQVIsR0FBbUIsSUFBSUMsYUFBSixDQUFrQixLQUFLQyxzQkFBTCxDQUE0QlAsZUFBNUIsQ0FBbEIsQ0FBcEM7TUFDQUssUUFBUSxDQUFDRyxPQUFULENBQWlCTixJQUFJLENBQUMsQ0FBRCxDQUFyQixFQUEwQkEsSUFBSSxDQUFDLENBQUQsQ0FBOUI7TUFFQWxILFFBQVEsQ0FBQyxNQUFELEVBQVMsVUFBQ1osS0FBRCxFQUFXO1FBQzFCaUksUUFBUSxDQUFDRyxPQUFULENBQWlCcEksS0FBSyxDQUFDLENBQUQsQ0FBdEIsRUFBMkJBLEtBQUssQ0FBQyxDQUFELENBQWhDO09BRE0sQ0FBUjtNQUlBNkgsU0FBUyxDQUFDUSxXQUFWLENBQXNCSixRQUFRLENBQUNLLFVBQS9CO01BRUEzSSxPQUFPLENBQUM0SSxVQUFSLEdBQXFCL0YsR0FBRyxDQUFDNkMsSUFBSixDQUFTLFlBQU07WUFFaENtQyxLQUZnQyxHQUk5QjdILE9BSjhCLENBRWhDNkgsS0FGZ0M7WUFHaENWLE1BSGdDLEdBSTlCbkgsT0FKOEIsQ0FHaENtSCxNQUhnQztRQU1sQ25ILE9BQU8sQ0FBQ3NJLFFBQVIsQ0FBaUJPLE1BQWpCLENBQXdCaEIsS0FBeEIsRUFBK0JWLE1BQU0sQ0FBQ2xGLE1BQXRDO09BTm1CLENBQXJCOzs7OzJDQVVxQmdHLGVBeEN6QixFQXdDMEM7VUFDaENhLE9BQU8sR0FBRyxLQUFLZCxhQUFMLENBQW1CYyxPQUFuQixJQUE4QixRQUE5Qzs7Y0FFUUEsT0FBUjthQUNPLE1BQUw7VUFDRWIsZUFBZSxDQUFDYyxTQUFoQixHQUE0QixJQUE1Qjs7Ozs7O2FBTUdkLGVBQVA7Ozs7Ozs7SUNyRFNlLGNBQWI7O0FBQUE7MEJBQ2NDLGFBQVosRUFBMkI7OztTQUNwQkEsYUFBTCxHQUFxQkEsYUFBckI7Ozs7OzBCQUdJcEcsR0FMUixRQUt3QjtVQUFWN0MsT0FBVSxRQUFWQSxPQUFVO01BQ3BCQSxPQUFPLENBQUNrSixRQUFSLEdBQW1CLEtBQUtELGFBQUwsQ0FBbUJqSixPQUFuQixDQUFuQjtNQUVBQSxPQUFPLENBQUNtSixZQUFSLEdBQXVCdEcsR0FBRyxDQUFDNkMsSUFBSixDQUFTLFlBQU07UUFDcEMxRixPQUFPLENBQUNrSixRQUFSLENBQWlCRSxNQUFqQjtPQURxQixDQUF2Qjs7Ozs7OztJQ1JTQyxZQUFiOztBQUFBOzs7Ozs7OzBCQUNReEcsR0FEUixRQUN3QjtVQUFWN0MsT0FBVSxRQUFWQSxPQUFVO01BQ3BCMEMsTUFBTSxDQUFDNEcsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtRQUN0Q3RKLE9BQU8sQ0FBQ21JLElBQVIsR0FBZSxDQUFDekYsTUFBTSxDQUFDMEYsVUFBUixFQUFvQjFGLE1BQU0sQ0FBQzJGLFdBQTNCLENBQWY7T0FERjs7Ozs7OztBQ0ZKOzs7Ozs7Ozs7QUFVQTtBQUdBLElBQU1rQixRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO1FBQ2YsSUFBSTFJLEtBQUosQ0FBVSwrREFBVixDQUFOO0NBREY7O0FBSUEsSUFBSTtNQUNFLENBQUMySSxRQUFMLEVBQWVELFFBQVE7Q0FEekIsQ0FFRSxPQUFPRSxHQUFQLEVBQVk7RUFDWkYsUUFBUTs7QUFPVjs7Ozs7Ozs7In0=
