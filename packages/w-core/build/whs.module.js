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

const version = "3.0.0-dev.1";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUtbW9kdWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCIuLi9zcmMvY29yZS9Nb2R1bGVTeXN0ZW0uanMiLCIuLi9zcmMvY29yZS9Db21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jb25zdHJ1Y3QuanMiLCIuLi9zcmMvcG9seWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXMuanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvY29yZS9Mb29wLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCIuLi9zcmMvY29yZS9TdG9yZS5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzL2FwcGx5VHJhbnNmb3JtLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvTWVzaC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0NhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0xpZ2h0LmpzIiwiLi4vc3JjL21vZHVsZXMvVHJlZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL1JlbmRlcmluZ01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL0NvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvUmVzaXplTW9kdWxlLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbiAgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKClcbik7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xufSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgdHJ5IHtcbiAgICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIH0gY2F0Y2goZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FzeW5jVG9HZW5lcmF0b3I7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwiZXhwb3J0IGNsYXNzIE1vZHVsZVN5c3RlbSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLm1vZHVsZXMgPSBvcHRpb25zLm1vZHVsZXMgfHwgW107XG5cbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgY29uc3QgdW5yZXNvbHZlZFdhcm5zID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHVwZGF0ZUhhbmRsZXJzID0ge307XG4gICAgbGV0IGFjdGl2ZU1vZHVsZSA9IG51bGw7XG5cbiAgICB0aGlzLm1hbmFnZXIgPSBuZXcgUHJveHkoZGF0YSwge1xuICAgICAgc2V0KG9iaiwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgb2JqW3Byb3BdID0gdmFsdWU7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcCwgdXBkYXRlSGFuZGxlcnNbcHJvcF0pO1xuICAgICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcF0pIHtcbiAgICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wXS5mb3JFYWNoKGNiID0+IGNiKHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG5cbiAgICAgIGdldChvYmosIHByb3ApIHtcbiAgICAgICAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialtwcm9wXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB3YXJucyA9IHVucmVzb2x2ZWRXYXJucy5nZXQoYWN0aXZlTW9kdWxlKTtcblxuICAgICAgICAgIGlmICh3YXJucyAmJiB3YXJuc1twcm9wXSlcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybih3YXJuc1twcm9wXSwgYWN0aXZlTW9kdWxlKTtcblxuICAgICAgICAgIGlmIChhY3RpdmVNb2R1bGUgPT09IG51bGwpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBhY3RpdmUgbW9kdWxlJyk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQWN0aXZlIG1vZHVsZTogJywgYWN0aXZlTW9kdWxlKTtcblxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgbWFuYWdlci4ke3Byb3B9IGlzIHJlcXVpcmVkIGJ5IHRoZSBhY3RpdmUgbW9kdWxlLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3YXJuID0gbW9kdWxlID0+IChkZXBlbmRlbmN5LCBtZXNzYWdlKSA9PiB7XG4gICAgICB1bnJlc29sdmVkV2FybnMuc2V0KG1vZHVsZSwge1xuICAgICAgICAuLi4odW5yZXNvbHZlZFdhcm5zLmdldChtb2R1bGUpIHx8IHt9KSxcbiAgICAgICAgW2RlcGVuZGVuY3ldOiBtZXNzYWdlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBvblVwZGF0ZSA9IChwcm9wTmFtZSwgaGFuZGxlcikgPT4ge1xuICAgICAgaWYgKHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXSkge1xuICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXSA9IFtoYW5kbGVyXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXSkge1xuICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5zcGxpY2UoXG4gICAgICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0uaW5kZXhPZihoYW5kbGVyKSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzID0gKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCBtb2R1bGUgb2YgdGhpcy5tb2R1bGVzKSB7XG4gICAgICAgIGlmICgnc2V0dXAnIGluIG1vZHVsZSkge1xuICAgICAgICAgIGFjdGl2ZU1vZHVsZSA9IG1vZHVsZTtcblxuICAgICAgICAgIG1vZHVsZS5zZXR1cCh0aGlzLCB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgbWFuYWdlcjogdGhpcy5tYW5hZ2VyLFxuICAgICAgICAgICAgd2Fybjogd2Fybihtb2R1bGUpLFxuICAgICAgICAgICAgb25VcGRhdGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhY3RpdmVNb2R1bGUgPSBudWxsO1xuICAgIH07XG4gIH1cblxuICBicmlkZ2UoYnJpZGdlTmFtZSwgaW5wdXREYXRhKSB7XG4gICAgbGV0IG91dHB1dERhdGEgPSBpbnB1dERhdGE7XG5cbiAgICBmb3IgKGNvbnN0IG1vZHVsZSBvZiB0aGlzLm1vZHVsZXMpIHtcbiAgICAgIGlmIChtb2R1bGUuYnJpZGdlcyAmJiBicmlkZ2VOYW1lIGluIG1vZHVsZS5icmlkZ2VzKSB7XG4gICAgICAgIG91dHB1dERhdGEgPSBtb2R1bGUuYnJpZGdlc1ticmlkZ2VOYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0RGF0YTtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIGlzQXN5bmMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBhc3luY09wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyAmJiBvcHRpb25zKCk7XG5cbiAgICBzdXBlcihhc3luY09wdGlvbnMgPyB7bW9kdWxlczogW119IDogb3B0aW9ucyk7XG5cbiAgICB0aGlzLmlzQXN5bmMgPSBhc3luY09wdGlvbnMgaW5zdGFuY2VvZiBQcm9taXNlO1xuXG4gICAgdGhpcy5uYXRpdmUgPSB0aGlzLmlzQXN5bmMgPyBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGFzeW5jT3B0aW9ucy50aGVuKG9wdGlvbnMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuYnVpbGQob3B0aW9ucykpO1xuICAgICAgfSk7XG4gICAgfSkgOiB0aGlzLmJ1aWxkKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucygpIDogb3B0aW9ucyk7XG5cbiAgICB0aGlzLnNldHVwTW9kdWxlcygpO1xuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgY29uc29sZS5lcnJvcignWW91IHNob3VsZCB1c2UgeW91ciBvd24gLmJ1aWxkKCknKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGFkZChjb21wb25lbnQpIHtcbiAgICBjb25zdCBzZWxmTmF0aXZlID0gdGhpcy5pc0FzeW5jID8gYXdhaXQgdGhpcy5uYXRpdmUgOiB0aGlzLm5hdGl2ZTtcbiAgICBjb25zdCBjaGlsZE5hdGl2ZSA9IGNvbXBvbmVudC5pc0FzeW5jID8gYXdhaXQgY29tcG9uZW50Lm5hdGl2ZSA6IGNvbXBvbmVudC5uYXRpdmU7XG5cbiAgICBzZWxmTmF0aXZlLmFkZChjaGlsZE5hdGl2ZSk7XG4gIH1cbn1cbiIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcblxuICB0cnkge1xuICAgIERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gIGlmIChpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IFJlZmxlY3QuY29uc3RydWN0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgdmFyIGEgPSBbbnVsbF07XG4gICAgICBhLnB1c2guYXBwbHkoYSwgYXJncyk7XG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICAgIGlmIChDbGFzcykgc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdDsiLCJleHBvcnQgY29uc3Qgc3lzdGVtID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG59O1xuIiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImV4cG9ydCBjbGFzcyBEZWZpbmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvciguLi5kYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIHNldHVwKGFwcCwge21hbmFnZXIsIC4uLm90aGVyfSkge1xuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihtYW5hZ2VyLCB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJyA/IGRhdGEobWFuYWdlciwgb3RoZXIpIDogZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzIExvb3BcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZWFjaCBhbmltYXRpb24gZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNsb2NrPXRydWVdIHBhc3NlcyBhIENsb2NrIHRvIHRoZSBmdW5jdGlvbiB3aGVuIGNhbGxlZCwgaWYgdHJ1ZVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3RvcihmdW5jKSB7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExvb3Bcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgc3RhdGljIGFzeW5jTG9hZGVyID0ge1xuICAgIGxvYWQoYXN5bmNEYXRhLCBvbkNvbXBsZXRlLCBvblByb2dyZXNzLCBvbkVycm9yKSB7XG4gICAgICBhc3luY0RhdGEoKS50aGVuKG9uQ29tcGxldGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihsb2FkZXJzKSB7XG4gICAgdGhpcy5sb2FkZXJzID0gbG9hZGVycztcbiAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICB0aGlzLnByb2Nlc3NvcnMgPSB7fTtcbiAgfVxuXG4gIHByb2Nlc3MoYXNzZXRUeXBlLCBwcm9jZXNzb3IpIHtcbiAgICBpZiAodGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0pIHtcbiAgICAgIHRoaXMucHJvY2Vzc29yc1thc3NldFR5cGVdLnB1c2gocHJvY2Vzc29yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0gPSBbcHJvY2Vzc29yXTtcbiAgICB9XG4gIH1cblxuICBsb2FkKGFzc2V0TmFtZSwgdXJsLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBbLCBhc3NldFR5cGVdID0gLyguKilcXC4vLmV4ZWMoYXNzZXROYW1lKTtcbiAgICBjb25zdCBsb2FkZXIgPSB0aGlzLmxvYWRlcnNbYXNzZXRUeXBlXTtcbiAgICBjb25zdCBwcm9jZXNzb3JzID0gdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0gfHwgW107XG5cbiAgICB0aGlzLnJlZnNbYXNzZXROYW1lXSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxvYWRlci5sb2FkKFxuICAgICAgICB1cmwsXG4gICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgIHByb2Nlc3NvcnMucmVkdWNlKFxuICAgICAgICAgICAgICAobmV3RGF0YSwgcHJvY2Vzc29yKSA9PiBwcm9jZXNzb3IobmV3RGF0YSwgb3B0aW9ucywgYXNzZXROYW1lKSxcbiAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMucmVmc1thc3NldE5hbWVdO1xuICB9XG5cbiAgcmVmKGFzc2V0TmFtZSkge1xuICAgIHJldHVybiB0aGlzLnJlZnNbYXNzZXROYW1lXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDbG9ja30gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vcG9seWZpbGwnO1xuaW1wb3J0IHtEZWZpbmVNb2R1bGV9IGZyb20gJy4uL21vZHVsZXMvRGVmaW5lTW9kdWxlJztcbmltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5pbXBvcnQge0xvb3B9IGZyb20gJy4vTG9vcCc7XG5pbXBvcnQge1N0b3JlfSBmcm9tICcuL1N0b3JlJztcblxuLyoqXG4gKiBAY2xhc3MgQXBwXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gcHJlcGFyZSBhIHdvcmxkIHNjZW5lLCBzZXR1cCBwaHlzaWNzLCBjYW1lcmEsIHJlbmRlcmVyIGFuZCBhbGwgb3RoZXIgdGhpbmdzIHRoYXQgeW91IHVzdWFsbHkgZG8gYmVmb3JlIG1ha2luZyBtZXNoZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbbW9kdWxlcz1bXV0gLSBBcnJheSBvZiBNb2R1bGVzXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICBzdGF0aWMgU3RvcmUgPSBTdG9yZTtcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBEZWZpbmVzIHdoZXRoZXIgdGhlIHNjZW5lIHNob3VsZCByZW5kZXIgb3Igbm90XG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkFwcCNlbmFibGVkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGVuYWJsZWQgPSB0cnVlO1xuICBjbG9jayA9IG5ldyBDbG9jaygpO1xuXG4gIC8qKlxuICAgKiBMb29wcyBpbiB0aGlzIGFwcFxuICAgKiBAZGVzY3JpcHRpb24gQXJyYXkgb2YgbG9vcHMgdGhhdCBhcmUgZXhlY3V0ZWQgYnkgdGhpcyBhcHAuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5BcHAjbG9vcHNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbG9vcHMgPSBbXTtcblxuICBzdGF0aWMgZGVmaW5lID0gKC4uLmFyZ3MpID0+IHtcbiAgICByZXR1cm4gbmV3IERlZmluZU1vZHVsZSguLi5hcmdzKTtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihtb2R1bGVzID0gW10pIHtcbiAgICBjb25zb2xlLmxvZyhgV0hTLkFwcCAke3ZlcnNpb259YCk7XG4gICAgc3VwZXIoe21vZHVsZXN9KTtcblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzKCk7XG4gIH1cblxuICAvLyBDT05UUk9MUyAmIFVQREFUSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IHJlbmRlcmluZyBsb29wIGFuZCBwaHlzaWNzIHNpbXVsYXRpb24gKGlmIHlvdSB1c2UgdmVyc2lvbiB3aXRoIHBoeXNpY3MpLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqL1xuICBzdGFydCgpIHtcbiAgICBjb25zdCByZXF1ZXN0QW5pbUZyYW1lID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBzeXN0ZW0ud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBzeXN0ZW0ud2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBzeXN0ZW0ud2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBzeXN0ZW0ud2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHByb2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0QW5pbUZyYW1lKCgpID0+IHByb2Nlc3MoKSk7XG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGwgPSB0aGlzLmxvb3BzLmxlbmd0aDsgaSA8IGxsOyBpKyspIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMubG9vcHNbaV07XG4gICAgICAgIGlmIChlLmVuYWJsZWQpIGUuZnVuYyhlLmNsb2NrKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5yZXF1ZXN0KVxuICAgICAgcHJvY2VzcygpO1xuICB9XG5cbiAgbG9vcChsb29wQ2FsbGJhY2spIHtcbiAgICBjb25zdCBsb29wID0gbmV3IExvb3AobG9vcENhbGxiYWNrKTtcbiAgICB0aGlzLmxvb3BzLnB1c2gobG9vcCk7XG5cbiAgICByZXR1cm4gbG9vcDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcHBcbn07XG4iLCIvKiogQG1vZHVsZSBjb3JlICovXG5leHBvcnQgKiBmcm9tICcuL0NvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL01lc2hDb21wb25lbnQnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9MaWdodENvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL0NhbWVyYUNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0FwcCc7XG5leHBvcnQgKiBmcm9tICcuL0xvb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuIiwiZnVuY3Rpb24gYXBwbHlMb2NhbFRyYW5zZm9ybShtYXRoVHlwZSwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHJldHVybjtcblxuICBsZXQgYXNzaWduRGF0YSA9IHt9O1xuXG4gIGlmIChkYXRhIGluc3RhbmNlb2YgT2JqZWN0LmdldFByb3RvdHlwZU9mKG1hdGhUeXBlKS5jb25zdHJ1Y3RvcikgeyAvLyBUSFJFRS5WZWN0b3IzID09PSBUSFJFRS5WZWN0b3IzXG4gICAgbWF0aFR5cGUuY29weShkYXRhKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIGFzc2lnbkRhdGEgPSB7XG4gICAgICB4OiBkYXRhWzBdLFxuICAgICAgeTogZGF0YVsxXSxcbiAgICAgIHo6IGRhdGFbMl0sXG4gICAgICB3OiBkYXRhWzNdXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBhc3NpZ25EYXRhID0ge1xuICAgICAgeDogZGF0YS54LFxuICAgICAgeTogZGF0YS55LFxuICAgICAgejogZGF0YS56LFxuICAgICAgdzogZGF0YS53XG4gICAgfTtcbiAgfVxuXG4gIGlmIChtYXRoVHlwZS53ID09PSB1bmRlZmluZWQpIHtcbiAgICBkZWxldGUgYXNzaWduRGF0YS53O1xuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihtYXRoVHlwZSwgYXNzaWduRGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVRyYW5zZm9ybShuYXRpdmUsIG9wdGlvbnMpIHtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUucG9zaXRpb24sIG9wdGlvbnMucG9zaXRpb24pO1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5zY2FsZSwgb3B0aW9ucy5zY2FsZSk7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnJvdGF0aW9uLCBvcHRpb25zLnJvdGF0aW9uKTtcbn1cbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge01lc2h9IGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIE1lc2hDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBvcHRpb25zLmdlb21ldHJ5O1xuICAgIGNvbnN0IG1hdGVyaWFsID0gb3B0aW9ucy5tYXRlcmlhbDtcblxuICAgIGNvbnN0IG1lc2ggPSB0aGlzLmJyaWRnZSgnbWVzaCcsIG5ldyBNZXNoKFxuICAgICAgdGhpcy5icmlkZ2UoJ2dlb21ldHJ5JywgZ2VvbWV0cnkpLFxuICAgICAgdGhpcy5icmlkZ2UoJ21hdGVyaWFsJywgbWF0ZXJpYWwpXG4gICAgKSk7XG5cbiAgICBhcHBseVRyYW5zZm9ybShtZXNoLCBvcHRpb25zKTtcblxuICAgIHJldHVybiBtZXNoO1xuICB9XG59XG5cbkNvbXBvbmVudC5NZXNoID0gTWVzaENvbXBvbmVudDtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgY2FtZXJhID0gb3B0aW9ucy5jYW1lcmE7XG5cbiAgICBhcHBseVRyYW5zZm9ybShjYW1lcmEsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuYnJpZGdlKCdjYW1lcmEnLCBjYW1lcmEpO1xuICB9XG5cbiAgYXV0b1NpemVVcGRhdGUob25VcGRhdGUpIHtcbiAgICBvblVwZGF0ZSgnc2l6ZScsIChbd2lkdGgsIGhlaWdodF0pID0+IHtcbiAgICAgIHRoaXMubmF0aXZlLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgdGhpcy5uYXRpdmUudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQ29tcG9uZW50LkNhbWVyYSA9IENhbWVyYUNvbXBvbmVudDtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBMaWdodENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBsaWdodCA9IG9wdGlvbnMubGlnaHQ7XG5cbiAgICBhcHBseVRyYW5zZm9ybShsaWdodCwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5icmlkZ2UoJ2xpZ2h0JywgbGlnaHQpO1xuICB9XG59XG5cbkNvbXBvbmVudC5MaWdodCA9IExpZ2h0Q29tcG9uZW50O1xuIiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7XG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgbWFuYWdlci5zY2VuZSA9IG5ldyBTY2VuZSgpO1xuXG4gICAgYXBwLmFkZCA9IGFzeW5jIChjb21wb25lbnQpID0+IHtcbiAgICAgIGNvbnN0IHNjZW5lID0gbWFuYWdlci5zY2VuZTtcblxuICAgICAgaWYgKGNvbXBvbmVudC5pc0FzeW5jKSB7XG4gICAgICAgIHNjZW5lLmFkZChhd2FpdCBjb21wb25lbnQubmF0aXZlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjZW5lLmFkZChjb21wb25lbnQubmF0aXZlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge1dlYkdMUmVuZGVyZXJ9IGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmluZ01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZU9wdGlvbnMgPSB7fSwgcmVuZGVyZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm1vZHVsZU9wdGlvbnMgPSBtb2R1bGVPcHRpb25zO1xuICAgIHRoaXMucmVuZGVyZXJPcHRpb25zID0gcmVuZGVyZXJPcHRpb25zO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlciwgb25VcGRhdGUsIHdhcm59KSB7XG4gICAgd2Fybignc2l6ZScsICdtYW5hZ2VyLnNpemUgc2hvdWxkIGJlIGFuIGFycmF5OiBbd2lkdGgsIGhlaWdodF0nKTtcbiAgICB3YXJuKCdjYW1lcmEnLCAnbWFuYWdlci5jYW1lcmEgc2hvdWxkIGJlIGEgV0hTLkNvbXBvbmVudC5DYW1lcmEnKTtcbiAgICB3YXJuKCdzY2VuZScsICdtYW5hZ2VyLnNjZW5lIHNob3VsZCBiZSBhIFRIUkVFLlNjZW5lJyk7XG4gICAgd2FybignY29udGFpbmVyJywgJ21hbmFnZXIuY29udGFpbmVyIHNob3VsZCBiZSBhbiBIVE1MRWxlbWVudCcpO1xuXG4gICAgY29uc3Qge1xuICAgICAgY29udGFpbmVyLFxuICAgICAgY2FtZXJhLFxuICAgICAgc2NlbmUsXG4gICAgICBzaXplID0gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdXG4gICAgfSA9IG1hbmFnZXI7XG5cbiAgICBjb25zdCByZW5kZXJlck9wdGlvbnMgPSB0aGlzLnJlbmRlcmVyT3B0aW9ucyB8fCB7fTtcblxuICAgIGNvbnN0IHJlbmRlcmVyID0gbWFuYWdlci5yZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHRoaXMucHJlcGFyZVJlbmRlcmVyT3B0aW9ucyhyZW5kZXJlck9wdGlvbnMpKTtcbiAgICByZW5kZXJlci5zZXRTaXplKHNpemVbMF0sIHNpemVbMV0pO1xuXG4gICAgb25VcGRhdGUoJ3NpemUnLCAodmFsdWUpID0+IHtcbiAgICAgIHJlbmRlcmVyLnNldFNpemUodmFsdWVbMF0sIHZhbHVlWzFdKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgIG1hbmFnZXIucmVuZGVyTG9vcCA9IGFwcC5sb29wKCgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2NlbmUsXG4gICAgICAgIGNhbWVyYVxuICAgICAgfSA9IG1hbmFnZXI7XG5cbiAgICAgIG1hbmFnZXIucmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEubmF0aXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByZXBhcmVSZW5kZXJlck9wdGlvbnMocmVuZGVyZXJPcHRpb25zKSB7XG4gICAgY29uc3QgcXVhbGl0eSA9IHRoaXMubW9kdWxlT3B0aW9ucy5xdWFsaXR5IHx8ICdtZWRpdW0nO1xuXG4gICAgc3dpdGNoIChxdWFsaXR5KSB7XG4gICAgICBjYXNlICdoaWdoJzpcbiAgICAgICAgcmVuZGVyZXJPcHRpb25zLmFudGlhbGlhcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcblxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlck9wdGlvbnM7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRyb2xzU2V0dXApIHtcbiAgICB0aGlzLmNvbnRyb2xzU2V0dXAgPSBjb250cm9sc1NldHVwO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLmNvbnRyb2xzID0gdGhpcy5jb250cm9sc1NldHVwKG1hbmFnZXIpO1xuXG4gICAgbWFuYWdlci5jb250cm9sc0xvb3AgPSBhcHAubG9vcCgoKSA9PiB7XG4gICAgICBtYW5hZ2VyLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUmVzaXplTW9kdWxlIHtcbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgbWFuYWdlci5zaXplID0gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuICAgIH0pO1xuICB9XG59XG4iLCIvKipcbiAqIE5hbWVzcGFjZSBjb250YWluaW5nIGFsbCBjbGFzc2VzIGZyb20gYWxsIG1vZHVsZXMuIFVzZWQgYXMgZ2xvYmFsIGluIFVNRCBwYXR0ZXJuLlxuICogQG5hbWVzcGFjZSBXSFNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRoZSB1c2Ugb2YgV0hTIG5hbWVzcGFjZS48L2NhcHRpb24+XG4gKiBuZXcgV0hTLkFwcCgpIC8vIGNvcmVcbiAqIG5ldyBXSFMuUGVyc3BlY3RpdmVDYW1lcmEoKSAvLyBjb21wb25lbnRzXG4gKiBuZXcgV0hTLlJlc2l6ZU1vZHVsZSgpIC8vIG1vZHVsZXNcbiAqIFdIUy5leHRlbmQoKSAvLyB1dGlsc1xuICovXG5cbmltcG9ydCB7UkVWSVNJT059IGZyb20gJ3RocmVlJztcblxuLy8gQ2hlY2sgZm9yIFRocmVlLmpzXG5jb25zdCB3YXJuRGVwcyA9ICgpID0+IHtcbiAgdGhyb3cgbmV3IEVycm9yKCdXaGl0ZXN0b3JtSlMgRnJhbWV3b3JrIHJlcXVpcmVzIFRocmVlLmpzIGh0dHBzOi8vdGhyZWVqcy5vcmcvJyk7XG59O1xuXG50cnkge1xuICBpZiAoIVJFVklTSU9OKSB3YXJuRGVwcygpO1xufSBjYXRjaCAoZXJyKSB7XG4gIHdhcm5EZXBzKCk7XG59XG5cbmV4cG9ydCAqIGZyb20gJy4vY29yZS9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzJztcbi8vIGV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi91dGlscy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL21vZHVsZXMvaW5kZXgnO1xuXG4vLyBERVBSRUNBVElPTlxuLy8gZXhwb3J0ICogZnJvbSAnLi9kZXByZWNhdGlvbic7XG4iXSwibmFtZXMiOlsicmVxdWlyZSQkMCIsIl90eXBlb2YiLCJNb2R1bGVTeXN0ZW0iLCJvcHRpb25zIiwibW9kdWxlcyIsImRhdGEiLCJ1bnJlc29sdmVkV2FybnMiLCJNYXAiLCJ1cGRhdGVIYW5kbGVycyIsImFjdGl2ZU1vZHVsZSIsIm1hbmFnZXIiLCJQcm94eSIsInNldCIsIm9iaiIsInByb3AiLCJ2YWx1ZSIsImZvckVhY2giLCJjYiIsImdldCIsIndhcm5zIiwiY29uc29sZSIsIndhcm4iLCJlcnJvciIsIkVycm9yIiwibW9kdWxlIiwiZGVwZW5kZW5jeSIsIm1lc3NhZ2UiLCJvblVwZGF0ZSIsInByb3BOYW1lIiwiaGFuZGxlciIsInB1c2giLCJzcGxpY2UiLCJpbmRleE9mIiwic2V0dXBNb2R1bGVzIiwic2V0dXAiLCJicmlkZ2VOYW1lIiwiaW5wdXREYXRhIiwib3V0cHV0RGF0YSIsImJyaWRnZXMiLCJDb21wb25lbnQiLCJhc3luY09wdGlvbnMiLCJpc0FzeW5jIiwiUHJvbWlzZSIsIm5hdGl2ZSIsInJlc29sdmUiLCJ0aGVuIiwiYnVpbGQiLCJjb21wb25lbnQiLCJzZWxmTmF0aXZlIiwiY2hpbGROYXRpdmUiLCJhZGQiLCJzeXN0ZW0iLCJ3aW5kb3ciLCJnbG9iYWwiLCJEZWZpbmVNb2R1bGUiLCJhcHAiLCJvdGhlciIsIk9iamVjdCIsImFzc2lnbiIsIkxvb3AiLCJmdW5jIiwiZW5hYmxlZCIsIlN0b3JlIiwibG9hZGVycyIsInJlZnMiLCJwcm9jZXNzb3JzIiwiYXNzZXRUeXBlIiwicHJvY2Vzc29yIiwiYXNzZXROYW1lIiwidXJsIiwiZXhlYyIsImxvYWRlciIsInJlamVjdCIsImxvYWQiLCJyZWR1Y2UiLCJuZXdEYXRhIiwidW5kZWZpbmVkIiwiYXN5bmNEYXRhIiwib25Db21wbGV0ZSIsIm9uUHJvZ3Jlc3MiLCJvbkVycm9yIiwiQXBwIiwibG9nIiwidmVyc2lvbiIsIkNsb2NrIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbGxiYWNrIiwic2V0VGltZW91dCIsInByb2Nlc3MiLCJyZXF1ZXN0IiwiaSIsImxsIiwibG9vcHMiLCJsZW5ndGgiLCJlIiwiY2xvY2siLCJsb29wQ2FsbGJhY2siLCJsb29wIiwiYXJncyIsImFwcGx5TG9jYWxUcmFuc2Zvcm0iLCJtYXRoVHlwZSIsImFzc2lnbkRhdGEiLCJnZXRQcm90b3R5cGVPZiIsImNvbnN0cnVjdG9yIiwiY29weSIsIkFycmF5IiwiaXNBcnJheSIsIngiLCJ5IiwieiIsInciLCJhcHBseVRyYW5zZm9ybSIsInBvc2l0aW9uIiwic2NhbGUiLCJyb3RhdGlvbiIsIk1lc2hDb21wb25lbnQiLCJnZW9tZXRyeSIsIm1hdGVyaWFsIiwibWVzaCIsImJyaWRnZSIsIk1lc2giLCJDYW1lcmFDb21wb25lbnQiLCJjYW1lcmEiLCJ3aWR0aCIsImhlaWdodCIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJDYW1lcmEiLCJMaWdodENvbXBvbmVudCIsImxpZ2h0IiwiTGlnaHQiLCJUcmVlTW9kdWxlIiwic2NlbmUiLCJTY2VuZSIsIlJlbmRlcmluZ01vZHVsZSIsIm1vZHVsZU9wdGlvbnMiLCJyZW5kZXJlck9wdGlvbnMiLCJjb250YWluZXIiLCJzaXplIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwicmVuZGVyZXIiLCJXZWJHTFJlbmRlcmVyIiwicHJlcGFyZVJlbmRlcmVyT3B0aW9ucyIsInNldFNpemUiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJyZW5kZXJMb29wIiwicmVuZGVyIiwicXVhbGl0eSIsImFudGlhbGlhcyIsIkNvbnRyb2xzTW9kdWxlIiwiY29udHJvbHNTZXR1cCIsImNvbnRyb2xzIiwiY29udHJvbHNMb29wIiwidXBkYXRlIiwiUmVzaXplTW9kdWxlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndhcm5EZXBzIiwiUkVWSVNJT04iLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQU9BLENBQUMsQ0FBQyxTQUFTLE1BQU0sRUFBRTs7RUFHakIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztFQUMxQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO0VBQy9CLElBQUksU0FBUyxDQUFDO0VBQ2QsSUFBSSxPQUFPLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7RUFDekQsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUM7RUFDdEQsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLGlCQUFpQixDQUFDO0VBQ3JFLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxlQUFlLENBQUM7RUFHL0QsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0VBQ3hDLElBQUksT0FBTyxFQUFFO0lBQ1gsQUFBYzs7O01BR1osY0FBYyxHQUFHLE9BQU8sQ0FBQztLQUMxQjs7O0lBR0QsT0FBTztHQUNSOzs7O0VBSUQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxBQUFXLE1BQU0sQ0FBQyxPQUFPLEFBQUssQ0FBQzs7RUFFckUsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOztJQUVqRCxJQUFJLGNBQWMsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsWUFBWSxT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
