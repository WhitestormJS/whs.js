/* WhitestormJS Framework v3.0.0-dev.6 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory((global.WHS = global.WHS || {}, global.WHS.core = {}), global.THREE));
}(this, function (exports, three) { 'use strict';

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

	const version = "3.0.0-dev.6";

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

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "clock", new three.Clock());

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
	      var mesh = this.bridge('mesh', new three.Mesh(this.bridge('geometry', geometry), this.bridge('material', material)));
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
	      manager.scene = new three.Scene();

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
	      var renderer = manager.renderer = new three.WebGLRenderer(this.prepareRendererOptions(rendererOptions));
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
	  if (!three.REVISION) warnDeps();
	} catch (err) {
	  warnDeps();
	}
	// export * from './components/meshes/index';
	// export * from './utils/index';
	// export * from './modules/index';
	// DEPRECATION
	// export * from './deprecation';

	exports.Component = Component;
	exports.App = App;
	exports.Loop = Loop;
	exports.ModuleSystem = ModuleSystem;
	exports.MeshComponent = MeshComponent;
	exports.CameraComponent = CameraComponent;
	exports.LightComponent = LightComponent;
	exports.DefineModule = DefineModule;
	exports.TreeModule = TreeModule;
	exports.RenderingModule = RenderingModule;
	exports.ControlsModule = ControlsModule;
	exports.ResizeModule = ResizeModule;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmNvcmUuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkLmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlU3lzdGVtLmpzIiwiLi4vc3JjL2NvcmUvQ29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY29uc3RydWN0LmpzIiwiLi4vc3JjL3BvbHlmaWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzLmpzIiwiLi4vc3JjL21vZHVsZXMvRGVmaW5lTW9kdWxlLmpzIiwiLi4vc3JjL2NvcmUvTG9vcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwiLi4vc3JjL2NvcmUvU3RvcmUuanMiLCIuLi9zcmMvY29yZS9BcHAuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy91dGlscy9hcHBseVRyYW5zZm9ybS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL01lc2guanMiLCIuLi9zcmMvY29tcG9uZW50cy9DYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9MaWdodC5qcyIsIi4uL3NyYy9tb2R1bGVzL1RyZWVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9SZW5kZXJpbmdNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgcnVudGltZS5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBJbiBzbG9wcHkgbW9kZSwgdW5ib3VuZCBgdGhpc2AgcmVmZXJzIHRvIHRoZSBnbG9iYWwgb2JqZWN0LCBmYWxsYmFjayB0b1xuICAvLyBGdW5jdGlvbiBjb25zdHJ1Y3RvciBpZiB3ZSdyZSBpbiBnbG9iYWwgc3RyaWN0IG1vZGUuIFRoYXQgaXMgc2FkbHkgYSBmb3JtXG4gIC8vIG9mIGluZGlyZWN0IGV2YWwgd2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kuXG4gIChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG4gIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpXG4pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbn0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkOyIsImV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5tb2R1bGVzID0gb3B0aW9ucy5tb2R1bGVzIHx8IFtdO1xuXG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGNvbnN0IHVucmVzb2x2ZWRXYXJucyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCB1cGRhdGVIYW5kbGVycyA9IHt9O1xuICAgIGxldCBhY3RpdmVNb2R1bGUgPSBudWxsO1xuXG4gICAgdGhpcy5tYW5hZ2VyID0gbmV3IFByb3h5KGRhdGEsIHtcbiAgICAgIHNldChvYmosIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIG9ialtwcm9wXSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3AsIHVwZGF0ZUhhbmRsZXJzW3Byb3BdKTtcbiAgICAgICAgaWYgKHVwZGF0ZUhhbmRsZXJzW3Byb3BdKSB7XG4gICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcF0uZm9yRWFjaChjYiA9PiBjYih2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuXG4gICAgICBnZXQob2JqLCBwcm9wKSB7XG4gICAgICAgIGlmIChwcm9wIGluIG9iaikge1xuICAgICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgd2FybnMgPSB1bnJlc29sdmVkV2FybnMuZ2V0KGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICBpZiAod2FybnMgJiYgd2FybnNbcHJvcF0pXG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2FybnNbcHJvcF0sIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICBpZiAoYWN0aXZlTW9kdWxlID09PSBudWxsKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gYWN0aXZlIG1vZHVsZScpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6ICcsIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1hbmFnZXIuJHtwcm9wfSBpcyByZXF1aXJlZCBieSB0aGUgYWN0aXZlIG1vZHVsZS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd2FybiA9IG1vZHVsZSA9PiAoZGVwZW5kZW5jeSwgbWVzc2FnZSkgPT4ge1xuICAgICAgdW5yZXNvbHZlZFdhcm5zLnNldChtb2R1bGUsIHtcbiAgICAgICAgLi4uKHVucmVzb2x2ZWRXYXJucy5nZXQobW9kdWxlKSB8fCB7fSksXG4gICAgICAgIFtkZXBlbmRlbmN5XTogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25VcGRhdGUgPSAocHJvcE5hbWUsIGhhbmRsZXIpID0+IHtcbiAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0pIHtcbiAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLnB1c2goaGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0gPSBbaGFuZGxlcl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0pIHtcbiAgICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0uc3BsaWNlKFxuICAgICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLmluZGV4T2YoaGFuZGxlciksXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnNldHVwTW9kdWxlcyA9ICgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIHRoaXMubW9kdWxlcykge1xuICAgICAgICBpZiAoJ3NldHVwJyBpbiBtb2R1bGUpIHtcbiAgICAgICAgICBhY3RpdmVNb2R1bGUgPSBtb2R1bGU7XG5cbiAgICAgICAgICBtb2R1bGUuc2V0dXAodGhpcywge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIG1hbmFnZXI6IHRoaXMubWFuYWdlcixcbiAgICAgICAgICAgIHdhcm46IHdhcm4obW9kdWxlKSxcbiAgICAgICAgICAgIG9uVXBkYXRlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWN0aXZlTW9kdWxlID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgYnJpZGdlKGJyaWRnZU5hbWUsIGlucHV0RGF0YSkge1xuICAgIGxldCBvdXRwdXREYXRhID0gaW5wdXREYXRhO1xuXG4gICAgZm9yIChjb25zdCBtb2R1bGUgb2YgdGhpcy5tb2R1bGVzKSB7XG4gICAgICBpZiAobW9kdWxlLmJyaWRnZXMgJiYgYnJpZGdlTmFtZSBpbiBtb2R1bGUuYnJpZGdlcykge1xuICAgICAgICBvdXRwdXREYXRhID0gbW9kdWxlLmJyaWRnZXNbYnJpZGdlTmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dERhdGE7XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICBpc0FzeW5jID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgYXN5bmNPcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgJiYgb3B0aW9ucygpO1xuXG4gICAgc3VwZXIoYXN5bmNPcHRpb25zID8ge21vZHVsZXM6IFtdfSA6IG9wdGlvbnMpO1xuXG4gICAgdGhpcy5pc0FzeW5jID0gYXN5bmNPcHRpb25zIGluc3RhbmNlb2YgUHJvbWlzZTtcblxuICAgIHRoaXMubmF0aXZlID0gdGhpcy5pc0FzeW5jID8gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBhc3luY09wdGlvbnMudGhlbihvcHRpb25zID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmJ1aWxkKG9wdGlvbnMpKTtcbiAgICAgIH0pO1xuICAgIH0pIDogdGhpcy5idWlsZCh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMoKSA6IG9wdGlvbnMpO1xuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMoKTtcbiAgfVxuXG4gIGJ1aWxkKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBzaG91bGQgdXNlIHlvdXIgb3duIC5idWlsZCgpJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhc3luYyBhZGQoY29tcG9uZW50KSB7XG4gICAgY29uc3Qgc2VsZk5hdGl2ZSA9IHRoaXMuaXNBc3luYyA/IGF3YWl0IHRoaXMubmF0aXZlIDogdGhpcy5uYXRpdmU7XG4gICAgY29uc3QgY2hpbGROYXRpdmUgPSBjb21wb25lbnQuaXNBc3luYyA/IGF3YWl0IGNvbXBvbmVudC5uYXRpdmUgOiBjb21wb25lbnQubmF0aXZlO1xuXG4gICAgc2VsZk5hdGl2ZS5hZGQoY2hpbGROYXRpdmUpO1xuICB9XG59XG4iLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7XG5cbiAgdHJ5IHtcbiAgICBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICBpZiAoaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgICAgIHZhciBhID0gW251bGxdO1xuICAgICAgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpO1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpO1xuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgICBpZiAoQ2xhc3MpIHNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3Q7IiwiZXhwb3J0IGNvbnN0IHN5c3RlbSA9IHtcbiAgd2luZG93OiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvd1xufTtcbiIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsInZhciBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlID0gcmVxdWlyZShcIi4vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICB2YXIga2V5LCBpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc291cmNlU3ltYm9sS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllczsiLCJleHBvcnQgY2xhc3MgRGVmaW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoLi4uZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyLCAuLi5vdGhlcn0pIHtcbiAgICB0aGlzLmRhdGEuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIE9iamVjdC5hc3NpZ24obWFuYWdlciwgdHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicgPyBkYXRhKG1hbmFnZXIsIG90aGVyKSA6IGRhdGEpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyBMb29wXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBmdW5jdGlvbiB0byBleGVjdXRlIG9uIGVhY2ggYW5pbWF0aW9uIGZyYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt1c2VDbG9jaz10cnVlXSBwYXNzZXMgYSBDbG9jayB0byB0aGUgZnVuY3Rpb24gd2hlbiBjYWxsZWQsIGlmIHRydWVcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBMb29wIHtcbiAgY29uc3RydWN0b3IoZnVuYykge1xuICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMb29wXG59O1xuIiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlczsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsImV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gIHN0YXRpYyBhc3luY0xvYWRlciA9IHtcbiAgICBsb2FkKGFzeW5jRGF0YSwgb25Db21wbGV0ZSwgb25Qcm9ncmVzcywgb25FcnJvcikge1xuICAgICAgYXN5bmNEYXRhKCkudGhlbihvbkNvbXBsZXRlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IobG9hZGVycykge1xuICAgIHRoaXMubG9hZGVycyA9IGxvYWRlcnM7XG4gICAgdGhpcy5yZWZzID0ge307XG4gICAgdGhpcy5wcm9jZXNzb3JzID0ge307XG4gIH1cblxuICBwcm9jZXNzKGFzc2V0VHlwZSwgcHJvY2Vzc29yKSB7XG4gICAgaWYgKHRoaXMucHJvY2Vzc29yc1thc3NldFR5cGVdKSB7XG4gICAgICB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXS5wdXNoKHByb2Nlc3Nvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvY2Vzc29yc1thc3NldFR5cGVdID0gW3Byb2Nlc3Nvcl07XG4gICAgfVxuICB9XG5cbiAgbG9hZChhc3NldE5hbWUsIHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgWywgYXNzZXRUeXBlXSA9IC8oLiopXFwuLy5leGVjKGFzc2V0TmFtZSk7XG4gICAgY29uc3QgbG9hZGVyID0gdGhpcy5sb2FkZXJzW2Fzc2V0VHlwZV07XG4gICAgY29uc3QgcHJvY2Vzc29ycyA9IHRoaXMucHJvY2Vzc29yc1thc3NldFR5cGVdIHx8IFtdO1xuXG4gICAgdGhpcy5yZWZzW2Fzc2V0TmFtZV0gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsb2FkZXIubG9hZChcbiAgICAgICAgdXJsLFxuICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICBwcm9jZXNzb3JzLnJlZHVjZShcbiAgICAgICAgICAgICAgKG5ld0RhdGEsIHByb2Nlc3NvcikgPT4gcHJvY2Vzc29yKG5ld0RhdGEsIG9wdGlvbnMsIGFzc2V0TmFtZSksXG4gICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLnJlZnNbYXNzZXROYW1lXTtcbiAgfVxuXG4gIHJlZihhc3NldE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5yZWZzW2Fzc2V0TmFtZV07XG4gIH1cbn1cbiIsImltcG9ydCB7Q2xvY2t9IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uL3BvbHlmaWxsJztcbmltcG9ydCB7RGVmaW5lTW9kdWxlfSBmcm9tICcuLi9tb2R1bGVzL0RlZmluZU1vZHVsZSc7XG5pbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuaW1wb3J0IHtMb29wfSBmcm9tICcuL0xvb3AnO1xuaW1wb3J0IHtTdG9yZX0gZnJvbSAnLi9TdG9yZSc7XG5cbi8qKlxuICogQGNsYXNzIEFwcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIHByZXBhcmUgYSB3b3JsZCBzY2VuZSwgc2V0dXAgcGh5c2ljcywgY2FtZXJhLCByZW5kZXJlciBhbmQgYWxsIG90aGVyIHRoaW5ncyB0aGF0IHlvdSB1c3VhbGx5IGRvIGJlZm9yZSBtYWtpbmcgbWVzaGVzLlxuICogQHBhcmFtIHtBcnJheX0gW21vZHVsZXM9W11dIC0gQXJyYXkgb2YgTW9kdWxlc1xuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgc3RhdGljIFN0b3JlID0gU3RvcmU7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lcyB3aGV0aGVyIHRoZSBzY2VuZSBzaG91bGQgcmVuZGVyIG9yIG5vdFxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjZW5hYmxlZFxuICAgKiBAcHVibGljXG4gICAqL1xuICBlbmFibGVkID0gdHJ1ZTtcbiAgY2xvY2sgPSBuZXcgQ2xvY2soKTtcblxuICAvKipcbiAgICogTG9vcHMgaW4gdGhpcyBhcHBcbiAgICogQGRlc2NyaXB0aW9uIEFycmF5IG9mIGxvb3BzIHRoYXQgYXJlIGV4ZWN1dGVkIGJ5IHRoaXMgYXBwLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQXBwI2xvb3BzXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGxvb3BzID0gW107XG5cbiAgc3RhdGljIGRlZmluZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBEZWZpbmVNb2R1bGUoLi4uYXJncyk7XG4gIH07XG5cbiAgY29uc3RydWN0b3IobW9kdWxlcyA9IFtdKSB7XG4gICAgY29uc29sZS5sb2coYFdIUy5BcHAgJHt2ZXJzaW9ufWApO1xuICAgIHN1cGVyKHttb2R1bGVzfSk7XG5cbiAgICB0aGlzLnNldHVwTW9kdWxlcygpO1xuICB9XG5cbiAgLy8gQ09OVFJPTFMgJiBVUERBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0YXJ0XG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydCByZW5kZXJpbmcgbG9vcCBhbmQgcGh5c2ljcyBzaW11bGF0aW9uIChpZiB5b3UgdXNlIHZlcnNpb24gd2l0aCBwaHlzaWNzKS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgcmVxdWVzdEFuaW1GcmFtZSA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gc3lzdGVtLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3lzdGVtLndpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBwcm9jZXNzID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdEFuaW1GcmFtZSgoKSA9PiBwcm9jZXNzKCkpO1xuICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxsID0gdGhpcy5sb29wcy5sZW5ndGg7IGkgPCBsbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLmxvb3BzW2ldO1xuICAgICAgICBpZiAoZS5lbmFibGVkKSBlLmZ1bmMoZS5jbG9jayk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMucmVxdWVzdClcbiAgICAgIHByb2Nlc3MoKTtcbiAgfVxuXG4gIGxvb3AobG9vcENhbGxiYWNrKSB7XG4gICAgY29uc3QgbG9vcCA9IG5ldyBMb29wKGxvb3BDYWxsYmFjayk7XG4gICAgdGhpcy5sb29wcy5wdXNoKGxvb3ApO1xuXG4gICAgcmV0dXJuIGxvb3A7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQXBwXG59O1xuIiwiLyoqIEBtb2R1bGUgY29yZSAqL1xuZXhwb3J0ICogZnJvbSAnLi9Db21wb25lbnQnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9NZXNoQ29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vTGlnaHRDb21wb25lbnQnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9DYW1lcmFDb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9BcHAnO1xuZXhwb3J0ICogZnJvbSAnLi9Mb29wJztcbmV4cG9ydCAqIGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbiIsImZ1bmN0aW9uIGFwcGx5TG9jYWxUcmFuc2Zvcm0obWF0aFR5cGUsIGRhdGEpIHtcbiAgaWYgKCFkYXRhKSByZXR1cm47XG5cbiAgbGV0IGFzc2lnbkRhdGEgPSB7fTtcblxuICBpZiAoZGF0YSBpbnN0YW5jZW9mIE9iamVjdC5nZXRQcm90b3R5cGVPZihtYXRoVHlwZSkuY29uc3RydWN0b3IpIHsgLy8gVEhSRUUuVmVjdG9yMyA9PT0gVEhSRUUuVmVjdG9yM1xuICAgIG1hdGhUeXBlLmNvcHkoZGF0YSk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICBhc3NpZ25EYXRhID0ge1xuICAgICAgeDogZGF0YVswXSxcbiAgICAgIHk6IGRhdGFbMV0sXG4gICAgICB6OiBkYXRhWzJdLFxuICAgICAgdzogZGF0YVszXVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgYXNzaWduRGF0YSA9IHtcbiAgICAgIHg6IGRhdGEueCxcbiAgICAgIHk6IGRhdGEueSxcbiAgICAgIHo6IGRhdGEueixcbiAgICAgIHc6IGRhdGEud1xuICAgIH07XG4gIH1cblxuICBpZiAobWF0aFR5cGUudyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZGVsZXRlIGFzc2lnbkRhdGEudztcbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24obWF0aFR5cGUsIGFzc2lnbkRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUcmFuc2Zvcm0obmF0aXZlLCBvcHRpb25zKSB7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnBvc2l0aW9uLCBvcHRpb25zLnBvc2l0aW9uKTtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUuc2NhbGUsIG9wdGlvbnMuc2NhbGUpO1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5yb3RhdGlvbiwgb3B0aW9ucy5yb3RhdGlvbik7XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vY29yZS9Db21wb25lbnQnO1xuaW1wb3J0IHthcHBseVRyYW5zZm9ybX0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtNZXNofSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBNZXNoQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgYnVpbGQob3B0aW9ucykge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gb3B0aW9ucy5nZW9tZXRyeTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG9wdGlvbnMubWF0ZXJpYWw7XG5cbiAgICBjb25zdCBtZXNoID0gdGhpcy5icmlkZ2UoJ21lc2gnLCBuZXcgTWVzaChcbiAgICAgIHRoaXMuYnJpZGdlKCdnZW9tZXRyeScsIGdlb21ldHJ5KSxcbiAgICAgIHRoaXMuYnJpZGdlKCdtYXRlcmlhbCcsIG1hdGVyaWFsKVxuICAgICkpO1xuXG4gICAgYXBwbHlUcmFuc2Zvcm0obWVzaCwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gbWVzaDtcbiAgfVxufVxuXG5Db21wb25lbnQuTWVzaCA9IE1lc2hDb21wb25lbnQ7XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vY29yZS9Db21wb25lbnQnO1xuaW1wb3J0IHthcHBseVRyYW5zZm9ybX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ2FtZXJhQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgYnVpbGQob3B0aW9ucykge1xuICAgIGNvbnN0IGNhbWVyYSA9IG9wdGlvbnMuY2FtZXJhO1xuXG4gICAgYXBwbHlUcmFuc2Zvcm0oY2FtZXJhLCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLmJyaWRnZSgnY2FtZXJhJywgY2FtZXJhKTtcbiAgfVxuXG4gIGF1dG9TaXplVXBkYXRlKG9uVXBkYXRlKSB7XG4gICAgb25VcGRhdGUoJ3NpemUnLCAoW3dpZHRoLCBoZWlnaHRdKSA9PiB7XG4gICAgICB0aGlzLm5hdGl2ZS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgIHRoaXMubmF0aXZlLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkNvbXBvbmVudC5DYW1lcmEgPSBDYW1lcmFDb21wb25lbnQ7XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vY29yZS9Db21wb25lbnQnO1xuaW1wb3J0IHthcHBseVRyYW5zZm9ybX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgTGlnaHRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgbGlnaHQgPSBvcHRpb25zLmxpZ2h0O1xuXG4gICAgYXBwbHlUcmFuc2Zvcm0obGlnaHQsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuYnJpZGdlKCdsaWdodCcsIGxpZ2h0KTtcbiAgfVxufVxuXG5Db21wb25lbnQuTGlnaHQgPSBMaWdodENvbXBvbmVudDtcbiIsImltcG9ydCB7U2NlbmV9IGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUge1xuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIG1hbmFnZXIuc2NlbmUgPSBuZXcgU2NlbmUoKTtcblxuICAgIGFwcC5hZGQgPSBhc3luYyAoY29tcG9uZW50KSA9PiB7XG4gICAgICBjb25zdCBzY2VuZSA9IG1hbmFnZXIuc2NlbmU7XG5cbiAgICAgIGlmIChjb21wb25lbnQuaXNBc3luYykge1xuICAgICAgICBzY2VuZS5hZGQoYXdhaXQgY29tcG9uZW50Lm5hdGl2ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5hZGQoY29tcG9uZW50Lm5hdGl2ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtXZWJHTFJlbmRlcmVyfSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJpbmdNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihtb2R1bGVPcHRpb25zID0ge30sIHJlbmRlcmVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5tb2R1bGVPcHRpb25zID0gbW9kdWxlT3B0aW9ucztcbiAgICB0aGlzLnJlbmRlcmVyT3B0aW9ucyA9IHJlbmRlcmVyT3B0aW9ucztcbiAgfVxuXG4gIHNldHVwKGFwcCwge21hbmFnZXIsIG9uVXBkYXRlLCB3YXJufSkge1xuICAgIHdhcm4oJ3NpemUnLCAnbWFuYWdlci5zaXplIHNob3VsZCBiZSBhbiBhcnJheTogW3dpZHRoLCBoZWlnaHRdJyk7XG4gICAgd2FybignY2FtZXJhJywgJ21hbmFnZXIuY2FtZXJhIHNob3VsZCBiZSBhIFdIUy5Db21wb25lbnQuQ2FtZXJhJyk7XG4gICAgd2Fybignc2NlbmUnLCAnbWFuYWdlci5zY2VuZSBzaG91bGQgYmUgYSBUSFJFRS5TY2VuZScpO1xuICAgIHdhcm4oJ2NvbnRhaW5lcicsICdtYW5hZ2VyLmNvbnRhaW5lciBzaG91bGQgYmUgYW4gSFRNTEVsZW1lbnQnKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGNhbWVyYSxcbiAgICAgIHNjZW5lLFxuICAgICAgc2l6ZSA9IFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XVxuICAgIH0gPSBtYW5hZ2VyO1xuXG4gICAgY29uc3QgcmVuZGVyZXJPcHRpb25zID0gdGhpcy5yZW5kZXJlck9wdGlvbnMgfHwge307XG5cbiAgICBjb25zdCByZW5kZXJlciA9IG1hbmFnZXIucmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcih0aGlzLnByZXBhcmVSZW5kZXJlck9wdGlvbnMocmVuZGVyZXJPcHRpb25zKSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZShzaXplWzBdLCBzaXplWzFdKTtcblxuICAgIG9uVXBkYXRlKCdzaXplJywgKHZhbHVlKSA9PiB7XG4gICAgICByZW5kZXJlci5zZXRTaXplKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICBtYW5hZ2VyLnJlbmRlckxvb3AgPSBhcHAubG9vcCgoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHNjZW5lLFxuICAgICAgICBjYW1lcmFcbiAgICAgIH0gPSBtYW5hZ2VyO1xuXG4gICAgICBtYW5hZ2VyLnJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLm5hdGl2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcmVwYXJlUmVuZGVyZXJPcHRpb25zKHJlbmRlcmVyT3B0aW9ucykge1xuICAgIGNvbnN0IHF1YWxpdHkgPSB0aGlzLm1vZHVsZU9wdGlvbnMucXVhbGl0eSB8fCAnbWVkaXVtJztcblxuICAgIHN3aXRjaCAocXVhbGl0eSkge1xuICAgICAgY2FzZSAnaGlnaCc6XG4gICAgICAgIHJlbmRlcmVyT3B0aW9ucy5hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG5cbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXJPcHRpb25zO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihjb250cm9sc1NldHVwKSB7XG4gICAgdGhpcy5jb250cm9sc1NldHVwID0gY29udHJvbHNTZXR1cDtcbiAgfVxuXG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgbWFuYWdlci5jb250cm9scyA9IHRoaXMuY29udHJvbHNTZXR1cChtYW5hZ2VyKTtcblxuICAgIG1hbmFnZXIuY29udHJvbHNMb29wID0gYXBwLmxvb3AoKCkgPT4ge1xuICAgICAgbWFuYWdlci5jb250cm9scy51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFJlc2l6ZU1vZHVsZSB7XG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIG1hbmFnZXIuc2l6ZSA9IFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBOYW1lc3BhY2UgY29udGFpbmluZyBhbGwgY2xhc3NlcyBmcm9tIGFsbCBtb2R1bGVzLiBVc2VkIGFzIGdsb2JhbCBpbiBVTUQgcGF0dGVybi5cbiAqIEBuYW1lc3BhY2UgV0hTXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgdXNlIG9mIFdIUyBuYW1lc3BhY2UuPC9jYXB0aW9uPlxuICogbmV3IFdIUy5BcHAoKSAvLyBjb3JlXG4gKiBuZXcgV0hTLlBlcnNwZWN0aXZlQ2FtZXJhKCkgLy8gY29tcG9uZW50c1xuICogbmV3IFdIUy5SZXNpemVNb2R1bGUoKSAvLyBtb2R1bGVzXG4gKiBXSFMuZXh0ZW5kKCkgLy8gdXRpbHNcbiAqL1xuXG5pbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5cbi8vIENoZWNrIGZvciBUaHJlZS5qc1xuY29uc3Qgd2FybkRlcHMgPSAoKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcignV2hpdGVzdG9ybUpTIEZyYW1ld29yayByZXF1aXJlcyBUaHJlZS5qcyBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vdXRpbHMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2luZGV4JztcblxuLy8gREVQUkVDQVRJT05cbi8vIGV4cG9ydCAqIGZyb20gJy4vZGVwcmVjYXRpb24nO1xuIl0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJfdHlwZW9mIiwiTW9kdWxlU3lzdGVtIiwib3B0aW9ucyIsIm1vZHVsZXMiLCJkYXRhIiwidW5yZXNvbHZlZFdhcm5zIiwiTWFwIiwidXBkYXRlSGFuZGxlcnMiLCJhY3RpdmVNb2R1bGUiLCJtYW5hZ2VyIiwiUHJveHkiLCJzZXQiLCJvYmoiLCJwcm9wIiwidmFsdWUiLCJmb3JFYWNoIiwiY2IiLCJnZXQiLCJ3YXJucyIsImNvbnNvbGUiLCJ3YXJuIiwiZXJyb3IiLCJFcnJvciIsIm1vZHVsZSIsImRlcGVuZGVuY3kiLCJtZXNzYWdlIiwib25VcGRhdGUiLCJwcm9wTmFtZSIsImhhbmRsZXIiLCJwdXNoIiwic3BsaWNlIiwiaW5kZXhPZiIsInNldHVwTW9kdWxlcyIsInNldHVwIiwiYnJpZGdlTmFtZSIsImlucHV0RGF0YSIsIm91dHB1dERhdGEiLCJicmlkZ2VzIiwiQ29tcG9uZW50IiwiYXN5bmNPcHRpb25zIiwiaXNBc3luYyIsIlByb21pc2UiLCJuYXRpdmUiLCJyZXNvbHZlIiwidGhlbiIsImJ1aWxkIiwiY29tcG9uZW50Iiwic2VsZk5hdGl2ZSIsImNoaWxkTmF0aXZlIiwiYWRkIiwic3lzdGVtIiwid2luZG93IiwiZ2xvYmFsIiwiRGVmaW5lTW9kdWxlIiwiYXBwIiwib3RoZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJMb29wIiwiZnVuYyIsImVuYWJsZWQiLCJTdG9yZSIsImxvYWRlcnMiLCJyZWZzIiwicHJvY2Vzc29ycyIsImFzc2V0VHlwZSIsInByb2Nlc3NvciIsImFzc2V0TmFtZSIsInVybCIsImV4ZWMiLCJsb2FkZXIiLCJyZWplY3QiLCJsb2FkIiwicmVkdWNlIiwibmV3RGF0YSIsInVuZGVmaW5lZCIsImFzeW5jRGF0YSIsIm9uQ29tcGxldGUiLCJvblByb2dyZXNzIiwib25FcnJvciIsIkFwcCIsImxvZyIsInZlcnNpb24iLCJDbG9jayIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJwcm9jZXNzIiwicmVxdWVzdCIsImkiLCJsbCIsImxvb3BzIiwibGVuZ3RoIiwiZSIsImNsb2NrIiwibG9vcENhbGxiYWNrIiwibG9vcCIsImFyZ3MiLCJhcHBseUxvY2FsVHJhbnNmb3JtIiwibWF0aFR5cGUiLCJhc3NpZ25EYXRhIiwiZ2V0UHJvdG90eXBlT2YiLCJjb25zdHJ1Y3RvciIsImNvcHkiLCJBcnJheSIsImlzQXJyYXkiLCJ4IiwieSIsInoiLCJ3IiwiYXBwbHlUcmFuc2Zvcm0iLCJwb3NpdGlvbiIsInNjYWxlIiwicm90YXRpb24iLCJNZXNoQ29tcG9uZW50IiwiZ2VvbWV0cnkiLCJtYXRlcmlhbCIsIm1lc2giLCJicmlkZ2UiLCJNZXNoIiwiQ2FtZXJhQ29tcG9uZW50IiwiY2FtZXJhIiwid2lkdGgiLCJoZWlnaHQiLCJhc3BlY3QiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwiQ2FtZXJhIiwiTGlnaHRDb21wb25lbnQiLCJsaWdodCIsIkxpZ2h0IiwiVHJlZU1vZHVsZSIsInNjZW5lIiwiU2NlbmUiLCJSZW5kZXJpbmdNb2R1bGUiLCJtb2R1bGVPcHRpb25zIiwicmVuZGVyZXJPcHRpb25zIiwiY29udGFpbmVyIiwic2l6ZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlbmRlcmVyIiwiV2ViR0xSZW5kZXJlciIsInByZXBhcmVSZW5kZXJlck9wdGlvbnMiLCJzZXRTaXplIiwiYXBwZW5kQ2hpbGQiLCJkb21FbGVtZW50IiwicmVuZGVyTG9vcCIsInJlbmRlciIsInF1YWxpdHkiLCJhbnRpYWxpYXMiLCJDb250cm9sc01vZHVsZSIsImNvbnRyb2xzU2V0dXAiLCJjb250cm9scyIsImNvbnRyb2xzTG9vcCIsInVwZGF0ZSIsIlJlc2l6ZU1vZHVsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3YXJuRGVwcyIsIlJFVklTSU9OIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Q0FBQTs7Ozs7OztDQU9BLENBQUMsQ0FBQyxTQUFTLE1BQU0sRUFBRTs7R0FHakIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztHQUMxQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO0dBQy9CLElBQUksU0FBUyxDQUFDO0dBQ2QsSUFBSSxPQUFPLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7R0FDekQsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUM7R0FDdEQsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLGlCQUFpQixDQUFDO0dBQ3JFLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxlQUFlLENBQUM7R0FHL0QsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0dBQ3hDLElBQUksT0FBTyxFQUFFO0tBQ1gsQUFBYzs7O09BR1osY0FBYyxHQUFHLE9BQU8sQ0FBQztNQUMxQjs7O0tBR0QsT0FBTztJQUNSOzs7O0dBSUQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxBQUFXLE1BQU0sQ0FBQyxPQUFPLEFBQUssQ0FBQzs7R0FFckUsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOztLQUVqRCxJQUFJLGNBQWMsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsWUFBWSxTQUFTLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztLQUM3RixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN4RCxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7Ozs7S0FJN0MsU0FBUyxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztLQUU3RCxPQUFPLFNBQVMsQ0FBQztJQUNsQjtHQUNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7R0FZcEIsU0FBUyxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7S0FDOUIsSUFBSTtPQUNGLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO01BQ25ELENBQUMsT0FBTyxHQUFHLEVBQUU7T0FDWixPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7TUFDcEM7SUFDRjs7R0FFRCxJQUFJLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDO0dBQzlDLElBQUksc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUM7R0FDOUMsSUFBSSxpQkFBaUIsR0FBRyxXQUFXLENBQUM7R0FDcEMsSUFBSSxpQkFBaUIsR0FBRyxXQUFXLENBQUM7Ozs7R0FJcEMsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Ozs7OztHQU0xQixTQUFTLFNBQVMsR0FBRyxFQUFFO0dBQ3ZCLFNBQVMsaUJBQWlCLEdBQUcsRUFBRTtHQUMvQixTQUFTLDBCQUEwQixHQUFHLEVBQUU7Ozs7R0FJeEMsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7R0FDM0IsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsWUFBWTtLQUM5QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7O0dBRUYsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztHQUNyQyxJQUFJLHVCQUF1QixHQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDekUsSUFBSSx1QkFBdUI7T0FDdkIsdUJBQXVCLEtBQUssRUFBRTtPQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLGNBQWMsQ0FBQyxFQUFFOzs7S0FHeEQsaUJBQWlCLEdBQUcsdUJBQXVCLENBQUM7SUFDN0M7O0dBRUQsSUFBSSxFQUFFLEdBQUcsMEJBQTBCLENBQUMsU0FBUztLQUMzQyxTQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztHQUN6RCxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQztHQUMxRSwwQkFBMEIsQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7R0FDM0QsMEJBQTBCLENBQUMsaUJBQWlCLENBQUM7S0FDM0MsaUJBQWlCLENBQUMsV0FBVyxHQUFHLG1CQUFtQixDQUFDOzs7O0dBSXRELFNBQVMscUJBQXFCLENBQUMsU0FBUyxFQUFFO0tBQ3hDLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxNQUFNLEVBQUU7T0FDbkQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsR0FBRyxFQUFFO1NBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQztNQUNILENBQUMsQ0FBQztJQUNKOztHQUVELE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLE1BQU0sRUFBRTtLQUM3QyxJQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQztLQUM5RCxPQUFPLElBQUk7U0FDUCxJQUFJLEtBQUssaUJBQWlCOzs7U0FHMUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sbUJBQW1CO1NBQ3ZELEtBQUssQ0FBQztJQUNYLENBQUM7O0dBRUYsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLE1BQU0sRUFBRTtLQUM5QixJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUU7T0FDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztNQUMzRCxNQUFNO09BQ0wsTUFBTSxDQUFDLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztPQUM5QyxJQUFJLEVBQUUsaUJBQWlCLElBQUksTUFBTSxDQUFDLEVBQUU7U0FDbEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsbUJBQW1CLENBQUM7UUFDakQ7TUFDRjtLQUNELE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNyQyxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7Ozs7OztHQU1GLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLEVBQUU7S0FDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDOztHQUVGLFNBQVMsYUFBYSxDQUFDLFNBQVMsRUFBRTtLQUNoQyxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7T0FDNUMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7T0FDekQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtTQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLE1BQU07U0FDTCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ3hCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDekIsSUFBSSxLQUFLO2FBQ0wsT0FBTyxLQUFLLEtBQUssUUFBUTthQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRTtXQUNqQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRTthQUN6RCxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEMsRUFBRSxTQUFTLEdBQUcsRUFBRTthQUNmLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUM7VUFDSjs7U0FFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsU0FBUyxFQUFFOzs7O1dBSXJELE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1dBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztVQUNqQixFQUFFLFNBQVMsS0FBSyxFQUFFOzs7V0FHakIsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7VUFDaEQsQ0FBQyxDQUFDO1FBQ0o7TUFDRjs7S0FFRCxJQUFJLGVBQWUsQ0FBQzs7S0FFcEIsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtPQUM1QixTQUFTLDBCQUEwQixHQUFHO1NBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxPQUFPLEVBQUUsTUFBTSxFQUFFO1dBQzNDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztVQUN0QyxDQUFDLENBQUM7UUFDSjs7T0FFRCxPQUFPLGVBQWU7Ozs7Ozs7Ozs7Ozs7U0FhcEIsZUFBZSxHQUFHLGVBQWUsQ0FBQyxJQUFJO1dBQ3BDLDBCQUEwQjs7O1dBRzFCLDBCQUEwQjtVQUMzQixHQUFHLDBCQUEwQixFQUFFLENBQUM7TUFDcEM7Ozs7S0FJRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN4Qjs7R0FFRCxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7R0FDL0MsYUFBYSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLFlBQVk7S0FDekQsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0dBQ0YsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7Ozs7O0dBS3RDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7S0FDNUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFhO09BQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUM7TUFDMUMsQ0FBQzs7S0FFRixPQUFPLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7U0FDdkMsSUFBSTtTQUNKLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxNQUFNLEVBQUU7V0FDaEMsT0FBTyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1VBQ2pELENBQUMsQ0FBQztJQUNSLENBQUM7O0dBRUYsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtLQUNoRCxJQUFJLEtBQUssR0FBRyxzQkFBc0IsQ0FBQzs7S0FFbkMsT0FBTyxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO09BQ2xDLElBQUksS0FBSyxLQUFLLGlCQUFpQixFQUFFO1NBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUNqRDs7T0FFRCxJQUFJLEtBQUssS0FBSyxpQkFBaUIsRUFBRTtTQUMvQixJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUU7V0FDdEIsTUFBTSxHQUFHLENBQUM7VUFDWDs7OztTQUlELE9BQU8sVUFBVSxFQUFFLENBQUM7UUFDckI7O09BRUQsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDeEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7O09BRWxCLE9BQU8sSUFBSSxFQUFFO1NBQ1gsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUNoQyxJQUFJLFFBQVEsRUFBRTtXQUNaLElBQUksY0FBYyxHQUFHLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztXQUM1RCxJQUFJLGNBQWMsRUFBRTthQUNsQixJQUFJLGNBQWMsS0FBSyxnQkFBZ0IsRUFBRSxTQUFTO2FBQ2xELE9BQU8sY0FBYyxDQUFDO1lBQ3ZCO1VBQ0Y7O1NBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTs7O1dBRzdCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztVQUU1QyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7V0FDckMsSUFBSSxLQUFLLEtBQUssc0JBQXNCLEVBQUU7YUFDcEMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO2FBQzFCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNuQjs7V0FFRCxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztVQUV4QyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7V0FDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQ3ZDOztTQUVELEtBQUssR0FBRyxpQkFBaUIsQ0FBQzs7U0FFMUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDOUMsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTs7O1dBRzVCLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSTtlQUNoQixpQkFBaUI7ZUFDakIsc0JBQXNCLENBQUM7O1dBRTNCLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxnQkFBZ0IsRUFBRTthQUNuQyxTQUFTO1lBQ1Y7O1dBRUQsT0FBTzthQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRzthQUNqQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbkIsQ0FBQzs7VUFFSCxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7V0FDbEMsS0FBSyxHQUFHLGlCQUFpQixDQUFDOzs7V0FHMUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7V0FDekIsT0FBTyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1VBQzFCO1FBQ0Y7TUFDRixDQUFDO0lBQ0g7Ozs7OztHQU1ELFNBQVMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRTtLQUM5QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7OztPQUd4QixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs7T0FFeEIsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtTQUM5QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOzs7V0FHNUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7V0FDMUIsT0FBTyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7V0FDeEIsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztXQUV2QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFOzs7YUFHOUIsT0FBTyxnQkFBZ0IsQ0FBQztZQUN6QjtVQUNGOztTQUVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1NBQ3pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTO1dBQ3pCLGdEQUFnRCxDQUFDLENBQUM7UUFDckQ7O09BRUQsT0FBTyxnQkFBZ0IsQ0FBQztNQUN6Qjs7S0FFRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztLQUU5RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO09BQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO09BQ3pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztPQUN6QixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztPQUN4QixPQUFPLGdCQUFnQixDQUFDO01BQ3pCOztLQUVELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7O0tBRXRCLElBQUksRUFBRSxJQUFJLEVBQUU7T0FDVixPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztPQUN6QixPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7T0FDaEUsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7T0FDeEIsT0FBTyxnQkFBZ0IsQ0FBQztNQUN6Qjs7S0FFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7OztPQUdiLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7O09BRzFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7T0FRaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtTQUMvQixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN4QixPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUN6Qjs7TUFFRixNQUFNOztPQUVMLE9BQU8sSUFBSSxDQUFDO01BQ2I7Ozs7S0FJRCxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4QixPQUFPLGdCQUFnQixDQUFDO0lBQ3pCOzs7O0dBSUQscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7O0dBRTFCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFdBQVcsQ0FBQzs7Ozs7OztHQU9wQyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsV0FBVztLQUM5QixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7O0dBRUYsRUFBRSxDQUFDLFFBQVEsR0FBRyxXQUFXO0tBQ3ZCLE9BQU8sb0JBQW9CLENBQUM7SUFDN0IsQ0FBQzs7R0FFRixTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUU7S0FDMUIsSUFBSSxLQUFLLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O0tBRWhDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtPQUNiLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzFCOztLQUVELElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtPQUNiLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzNCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzFCOztLQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCOztHQUVELFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRTtLQUM1QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztLQUNwQyxNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztLQUN2QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDbEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDM0I7O0dBRUQsU0FBUyxPQUFPLENBQUMsV0FBVyxFQUFFOzs7O0tBSTVCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEI7O0dBRUQsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLE1BQU0sRUFBRTtLQUM5QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7S0FDZCxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtPQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ2hCO0tBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7O0tBSWYsT0FBTyxTQUFTLElBQUksR0FBRztPQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUU7U0FDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3JCLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtXQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztXQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztXQUNsQixPQUFPLElBQUksQ0FBQztVQUNiO1FBQ0Y7Ozs7O09BS0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7T0FDakIsT0FBTyxJQUFJLENBQUM7TUFDYixDQUFDO0lBQ0gsQ0FBQzs7R0FFRixTQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUU7S0FDeEIsSUFBSSxRQUFRLEVBQUU7T0FDWixJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7T0FDOUMsSUFBSSxjQUFjLEVBQUU7U0FDbEIsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDOztPQUVELElBQUksT0FBTyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtTQUN2QyxPQUFPLFFBQVEsQ0FBQztRQUNqQjs7T0FFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtTQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsU0FBUyxJQUFJLEdBQUc7V0FDakMsT0FBTyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO2FBQzVCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUU7ZUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7ZUFDbEIsT0FBTyxJQUFJLENBQUM7Y0FDYjtZQUNGOztXQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1dBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztXQUVqQixPQUFPLElBQUksQ0FBQztVQUNiLENBQUM7O1NBRUYsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN6QjtNQUNGOzs7S0FHRCxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzdCO0dBQ0QsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0dBRXhCLFNBQVMsVUFBVSxHQUFHO0tBQ3BCLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN6Qzs7R0FFRCxPQUFPLENBQUMsU0FBUyxHQUFHO0tBQ2xCLFdBQVcsRUFBRSxPQUFPOztLQUVwQixLQUFLLEVBQUUsU0FBUyxhQUFhLEVBQUU7T0FDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7T0FDZCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQzs7O09BR2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztPQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztPQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs7T0FFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7O09BRXJCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztPQUV2QyxJQUFJLENBQUMsYUFBYSxFQUFFO1NBQ2xCLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFOztXQUVyQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztlQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7ZUFDdkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUN4QjtVQUNGO1FBQ0Y7TUFDRjs7S0FFRCxJQUFJLEVBQUUsV0FBVztPQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztPQUVqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ25DLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7T0FDdEMsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtTQUMvQixNQUFNLFVBQVUsQ0FBQyxHQUFHLENBQUM7UUFDdEI7O09BRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQ2xCOztLQUVELGlCQUFpQixFQUFFLFNBQVMsU0FBUyxFQUFFO09BQ3JDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtTQUNiLE1BQU0sU0FBUyxDQUFDO1FBQ2pCOztPQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztPQUNuQixTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO1NBQzNCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3RCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDOztTQUVuQixJQUFJLE1BQU0sRUFBRTs7O1dBR1YsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7V0FDeEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7VUFDekI7O1NBRUQsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDO1FBQ2xCOztPQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7U0FDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDOztTQUU5QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFOzs7O1dBSTNCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1VBQ3RCOztTQUVELElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1dBQzdCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1dBQzlDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDOztXQUVsRCxJQUFJLFFBQVEsSUFBSSxVQUFVLEVBQUU7YUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUU7ZUFDOUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztjQUNyQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFO2VBQ3ZDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztjQUNqQzs7WUFFRixNQUFNLElBQUksUUFBUSxFQUFFO2FBQ25CLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFO2VBQzlCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Y0FDckM7O1lBRUYsTUFBTSxJQUFJLFVBQVUsRUFBRTthQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRTtlQUNoQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Y0FDakM7O1lBRUYsTUFBTTthQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUMzRDtVQUNGO1FBQ0Y7TUFDRjs7S0FFRCxNQUFNLEVBQUUsU0FBUyxJQUFJLEVBQUUsR0FBRyxFQUFFO09BQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7U0FDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUk7YUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDO2FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRTtXQUNoQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7V0FDekIsTUFBTTtVQUNQO1FBQ0Y7O09BRUQsSUFBSSxZQUFZO1lBQ1gsSUFBSSxLQUFLLE9BQU87WUFDaEIsSUFBSSxLQUFLLFVBQVUsQ0FBQztXQUNyQixZQUFZLENBQUMsTUFBTSxJQUFJLEdBQUc7V0FDMUIsR0FBRyxJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUU7OztTQUdsQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3JCOztPQUVELElBQUksTUFBTSxHQUFHLFlBQVksR0FBRyxZQUFZLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztPQUN6RCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztPQUNuQixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7T0FFakIsSUFBSSxZQUFZLEVBQUU7U0FDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDckIsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO1NBQ3BDLE9BQU8sZ0JBQWdCLENBQUM7UUFDekI7O09BRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO01BQzlCOztLQUVELFFBQVEsRUFBRSxTQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUU7T0FDbkMsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtTQUMzQixNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDbEI7O09BRUQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU87V0FDdkIsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7U0FDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtTQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztTQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNuQixNQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksUUFBUSxFQUFFO1NBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3RCOztPQUVELE9BQU8sZ0JBQWdCLENBQUM7TUFDekI7O0tBRUQsTUFBTSxFQUFFLFNBQVMsVUFBVSxFQUFFO09BQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7U0FDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1dBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7V0FDaEQsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1dBQ3JCLE9BQU8sZ0JBQWdCLENBQUM7VUFDekI7UUFDRjtNQUNGOztLQUVELE9BQU8sRUFBRSxTQUFTLE1BQU0sRUFBRTtPQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1NBQ3BELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0IsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtXQUMzQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1dBQzlCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7YUFDM0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUN4QixhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEI7V0FDRCxPQUFPLE1BQU0sQ0FBQztVQUNmO1FBQ0Y7Ozs7T0FJRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7TUFDMUM7O0tBRUQsYUFBYSxFQUFFLFNBQVMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7T0FDckQsSUFBSSxDQUFDLFFBQVEsR0FBRztTQUNkLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQzFCLFVBQVUsRUFBRSxVQUFVO1NBQ3RCLE9BQU8sRUFBRSxPQUFPO1FBQ2pCLENBQUM7O09BRUYsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTs7O1NBRzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3RCOztPQUVELE9BQU8sZ0JBQWdCLENBQUM7TUFDekI7SUFDRixDQUFDO0VBQ0g7Ozs7R0FJQyxDQUFDLFdBQVc7S0FDVixPQUFPLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUM7SUFDbkQsR0FBRyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtFQUNsQyxDQUFDOzs7Q0NodEJGOzs7Ozs7Ozs7Q0FTQSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVc7R0FDbEIsT0FBTyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ25ELEdBQUcsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzs7OztDQUlsQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsa0JBQWtCO0dBQ25DLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7OztDQUduRSxJQUFJLFVBQVUsR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDOzs7Q0FHcEQsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQzs7Q0FFakMsaUJBQWMsR0FBR0EsT0FBb0IsQ0FBQzs7Q0FFdEMsSUFBSSxVQUFVLEVBQUU7O0dBRWQsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQztFQUNuQyxNQUFNOztHQUVMLElBQUk7S0FDRixPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztJQUM3QixDQUFDLE1BQU0sQ0FBQyxFQUFFO0tBQ1QsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztJQUNsQztFQUNGOztDQ3BDRCxlQUFjLEdBQUdBLGFBQThCLENBQUM7O0NDQWhELFNBQVMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0dBQ3pFLElBQUk7S0FDRixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN4QixDQUFDLE9BQU8sS0FBSyxFQUFFO0tBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2QsT0FBTztJQUNSOztHQUVELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtLQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQixNQUFNO0tBQ0wsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDO0VBQ0Y7O0NBRUQsU0FBUyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUU7R0FDN0IsT0FBTyxZQUFZO0tBQ2pCLElBQUksSUFBSSxHQUFHLElBQUk7U0FDWCxJQUFJLEdBQUcsU0FBUyxDQUFDO0tBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO09BQzVDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztPQUUvQixTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUU7U0FDcEIsa0JBQWtCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEU7O09BRUQsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFO1NBQ25CLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZFOztPQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUNsQixDQUFDLENBQUM7SUFDSixDQUFDO0VBQ0g7O0NBRUQsb0JBQWMsR0FBRyxpQkFBaUI7O0NDcENsQyxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0dBQzlDLElBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFDLEVBQUU7S0FDdEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzFEO0VBQ0Y7O0NBRUQsa0JBQWMsR0FBRyxlQUFlOztDQ05oQyxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7R0FDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7S0FDckMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7S0FDdkQsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7S0FDL0IsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0Q7RUFDRjs7Q0FFRCxTQUFTLFlBQVksQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtHQUMxRCxJQUFJLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0dBQ3JFLElBQUksV0FBVyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztHQUM3RCxPQUFPLFdBQVcsQ0FBQztFQUNwQjs7Q0FFRCxlQUFjLEdBQUcsWUFBWTs7O0NDaEI3QixTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLEVBQUUsUUFBUSxHQUFHLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsR0FBRyxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs7Q0FFclcsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFO0dBQ3BCLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxFQUFFO0tBQzFFLGNBQWMsR0FBRyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFO09BQy9DLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3RCLENBQUM7SUFDSCxNQUFNO0tBQ0wsY0FBYyxHQUFHLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7T0FDL0MsT0FBTyxHQUFHLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEtBQUssTUFBTSxJQUFJLEdBQUcsS0FBSyxNQUFNLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDakksQ0FBQztJQUNIOztHQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCOztDQUVELGNBQWMsR0FBRyxPQUFPOzs7Q0NoQnhCLFNBQVMsc0JBQXNCLENBQUMsSUFBSSxFQUFFO0dBQ3BDLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0tBQ25CLE1BQU0sSUFBSSxjQUFjLENBQUMsMkRBQTJELENBQUMsQ0FBQztJQUN2Rjs7R0FFRCxPQUFPLElBQUksQ0FBQztFQUNiOztDQUVELHlCQUFjLEdBQUcsc0JBQXNCOztDQ0p2QyxTQUFTLDBCQUEwQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7R0FDOUMsSUFBSSxJQUFJLEtBQUtDLFNBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxDQUFDLEVBQUU7S0FDdEUsT0FBTyxJQUFJLENBQUM7SUFDYjs7R0FFRCxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3BDOztDQUVELDZCQUFjLEdBQUcsMEJBQTBCOzs7Q0NaM0MsU0FBUyxlQUFlLENBQUMsQ0FBQyxFQUFFO0dBQzFCLGNBQWMsR0FBRyxlQUFlLEdBQUcsTUFBTSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxHQUFHLFNBQVMsZUFBZSxDQUFDLENBQUMsRUFBRTtLQUM3RyxPQUFPLENBQUMsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0dBQ0YsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0I7O0NBRUQsY0FBYyxHQUFHLGVBQWU7Ozs7Q0NQaEMsU0FBUyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtHQUM3QixjQUFjLEdBQUcsZUFBZSxHQUFHLE1BQU0sQ0FBQyxjQUFjLElBQUksU0FBUyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtLQUN6RixDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUNoQixPQUFPLENBQUMsQ0FBQztJQUNWLENBQUM7O0dBRUYsT0FBTyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlCOztDQUVELGNBQWMsR0FBRyxlQUFlOzs7Q0NQaEMsU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtHQUN2QyxJQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0tBQzNELE1BQU0sSUFBSSxTQUFTLENBQUMsb0RBQW9ELENBQUMsQ0FBQztJQUMzRTs7R0FFRCxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7S0FDckUsV0FBVyxFQUFFO09BQ1gsS0FBSyxFQUFFLFFBQVE7T0FDZixRQUFRLEVBQUUsSUFBSTtPQUNkLFlBQVksRUFBRSxJQUFJO01BQ25CO0lBQ0YsQ0FBQyxDQUFDO0dBQ0gsSUFBSSxVQUFVLEVBQUUsY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztFQUN0RDs7Q0FFRCxZQUFjLEdBQUcsU0FBUzs7Q0NqQjFCLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0dBQ3hDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtLQUNkLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtPQUM5QixLQUFLLEVBQUUsS0FBSztPQUNaLFVBQVUsRUFBRSxJQUFJO09BQ2hCLFlBQVksRUFBRSxJQUFJO09BQ2xCLFFBQVEsRUFBRSxJQUFJO01BQ2YsQ0FBQyxDQUFDO0lBQ0osTUFBTTtLQUNMLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbEI7O0dBRUQsT0FBTyxHQUFHLENBQUM7RUFDWjs7Q0FFRCxrQkFBYyxHQUFHLGVBQWU7O0NDYmhDLFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRTtHQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtLQUN6QyxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDdEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7S0FFbEMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsS0FBSyxVQUFVLEVBQUU7T0FDdEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtTQUNsRixPQUFPLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO01BQ0w7O0tBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtPQUM3QixjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUMxQyxDQUFDLENBQUM7SUFDSjs7R0FFRCxPQUFPLE1BQU0sQ0FBQztFQUNmOztDQUVELGdCQUFjLEdBQUcsYUFBYTs7S0NyQmpCQyxZQUFiO0NBQUE7Q0FBQTtDQUNFLHdCQUFZQyxPQUFaLEVBQXFCO0NBQUE7O0NBQUE7O0NBQ25CLFNBQUtDLE9BQUwsR0FBZUQsT0FBTyxDQUFDQyxPQUFSLElBQW1CLEVBQWxDO0NBRUEsUUFBTUMsSUFBSSxHQUFHLEVBQWI7Q0FDQSxRQUFNQyxlQUFlLEdBQUcsSUFBSUMsR0FBSixFQUF4QjtDQUNBLFFBQU1DLGNBQWMsR0FBRyxFQUF2QjtDQUNBLFFBQUlDLFlBQVksR0FBRyxJQUFuQjtDQUVBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxLQUFKLENBQVVOLElBQVYsRUFBZ0I7Q0FDN0JPLE1BQUFBLEdBRDZCLGVBQ3pCQyxHQUR5QixFQUNwQkMsSUFEb0IsRUFDZEMsS0FEYyxFQUNQO0NBQ3BCRixRQUFBQSxHQUFHLENBQUNDLElBQUQsQ0FBSCxHQUFZQyxLQUFaLENBRG9COztDQUlwQixZQUFJUCxjQUFjLENBQUNNLElBQUQsQ0FBbEIsRUFBMEI7Q0FDeEJOLFVBQUFBLGNBQWMsQ0FBQ00sSUFBRCxDQUFkLENBQXFCRSxPQUFyQixDQUE2QixVQUFBQyxFQUFFO0NBQUEsbUJBQUlBLEVBQUUsQ0FBQ0YsS0FBRCxDQUFOO0NBQUEsV0FBL0I7Q0FDRDs7Q0FFRCxlQUFPLElBQVA7Q0FDRCxPQVY0QjtDQVk3QkcsTUFBQUEsR0FaNkIsZUFZekJMLEdBWnlCLEVBWXBCQyxJQVpvQixFQVlkO0NBQ2IsWUFBSUEsSUFBSSxJQUFJRCxHQUFaLEVBQWlCO0NBQ2YsaUJBQU9BLEdBQUcsQ0FBQ0MsSUFBRCxDQUFWO0NBQ0QsU0FGRCxNQUVPO0NBQ0wsY0FBTUssS0FBSyxHQUFHYixlQUFlLENBQUNZLEdBQWhCLENBQW9CVCxZQUFwQixDQUFkO0NBRUEsY0FBSVUsS0FBSyxJQUFJQSxLQUFLLENBQUNMLElBQUQsQ0FBbEIsRUFDRU0sT0FBTyxDQUFDQyxJQUFSLENBQWFGLEtBQUssQ0FBQ0wsSUFBRCxDQUFsQixFQUEwQkwsWUFBMUI7Q0FFRixjQUFJQSxZQUFZLEtBQUssSUFBckIsRUFDRVcsT0FBTyxDQUFDRSxLQUFSLENBQWMsa0JBQWQsRUFERixLQUdFRixPQUFPLENBQUNFLEtBQVIsQ0FBYyxpQkFBZCxFQUFpQ2IsWUFBakM7Q0FFRixnQkFBTSxJQUFJYyxLQUFKLG1CQUFxQlQsSUFBckIsd0NBQU47Q0FDRDtDQUNGO0NBNUI0QixLQUFoQixDQUFmOztDQStCQSxRQUFNTyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFBRyxNQUFNO0NBQUEsYUFBSSxVQUFDQyxVQUFELEVBQWFDLE9BQWIsRUFBeUI7Q0FDOUNwQixRQUFBQSxlQUFlLENBQUNNLEdBQWhCLENBQW9CWSxNQUFwQixtQkFDTWxCLGVBQWUsQ0FBQ1ksR0FBaEIsQ0FBb0JNLE1BQXBCLEtBQStCLEVBRHJDLHFCQUVHQyxVQUZILEVBRWdCQyxPQUZoQjtDQUlELE9BTGtCO0NBQUEsS0FBbkI7O0NBT0EsUUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRCxFQUFXQyxPQUFYLEVBQXVCO0NBQ3RDLFVBQUlyQixjQUFjLENBQUNvQixRQUFELENBQWxCLEVBQThCO0NBQzVCcEIsUUFBQUEsY0FBYyxDQUFDb0IsUUFBRCxDQUFkLENBQXlCRSxJQUF6QixDQUE4QkQsT0FBOUI7Q0FDRCxPQUZELE1BRU87Q0FDTHJCLFFBQUFBLGNBQWMsQ0FBQ29CLFFBQUQsQ0FBZCxHQUEyQixDQUFDQyxPQUFELENBQTNCO0NBQ0Q7O0NBRUQsYUFBTyxZQUFNO0NBQ1gsWUFBSXJCLGNBQWMsQ0FBQ29CLFFBQUQsQ0FBbEIsRUFBOEI7Q0FDNUJwQixVQUFBQSxjQUFjLENBQUNvQixRQUFELENBQWQsQ0FBeUJHLE1BQXpCLENBQ0V2QixjQUFjLENBQUNvQixRQUFELENBQWQsQ0FBeUJJLE9BQXpCLENBQWlDSCxPQUFqQyxDQURGLEVBRUUsQ0FGRjtDQUlEO0NBQ0YsT0FQRDtDQVFELEtBZkQ7O0NBaUJBLFNBQUtJLFlBQUwsR0FBb0IsWUFBTTtDQUFBO0NBQUE7Q0FBQTs7Q0FBQTtDQUN4Qiw2QkFBcUIsS0FBSSxDQUFDN0IsT0FBMUIsOEhBQW1DO0NBQUEsY0FBeEJvQixNQUF3Qjs7Q0FDakMsY0FBSSxXQUFXQSxNQUFmLEVBQXVCO0NBQ3JCZixZQUFBQSxZQUFZLEdBQUdlLE1BQWY7Q0FFQUEsWUFBQUEsTUFBTSxDQUFDVSxLQUFQLENBQWEsS0FBYixFQUFtQjtDQUNqQjdCLGNBQUFBLElBQUksRUFBSkEsSUFEaUI7Q0FFakJLLGNBQUFBLE9BQU8sRUFBRSxLQUFJLENBQUNBLE9BRkc7Q0FHakJXLGNBQUFBLElBQUksRUFBRUEsSUFBSSxDQUFDRyxNQUFELENBSE87Q0FJakJHLGNBQUFBLFFBQVEsRUFBUkE7Q0FKaUIsYUFBbkI7Q0FNRDtDQUNGO0NBWnVCO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7O0NBY3hCbEIsTUFBQUEsWUFBWSxHQUFHLElBQWY7Q0FDRCxLQWZEO0NBZ0JEOztDQWhGSDtDQUFBO0NBQUEsMkJBa0ZTMEIsVUFsRlQsRUFrRnFCQyxTQWxGckIsRUFrRmdDO0NBQzVCLFVBQUlDLFVBQVUsR0FBR0QsU0FBakI7Q0FENEI7Q0FBQTtDQUFBOztDQUFBO0NBRzVCLDhCQUFxQixLQUFLaEMsT0FBMUIsbUlBQW1DO0NBQUEsY0FBeEJvQixNQUF3Qjs7Q0FDakMsY0FBSUEsTUFBTSxDQUFDYyxPQUFQLElBQWtCSCxVQUFVLElBQUlYLE1BQU0sQ0FBQ2MsT0FBM0MsRUFBb0Q7Q0FDbERELFlBQUFBLFVBQVUsR0FBR2IsTUFBTSxDQUFDYyxPQUFQLENBQWVILFVBQWYsQ0FBYjtDQUNEO0NBQ0Y7Q0FQMkI7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQTs7Q0FTNUIsYUFBT0UsVUFBUDtDQUNEO0NBNUZIOztDQUFBO0NBQUE7O0tDRWFFLFNBQWI7Q0FBQTtDQUFBO0NBQUE7O0NBR0UsdUJBQTBCO0NBQUE7O0NBQUEsUUFBZHBDLE9BQWMsdUVBQUosRUFBSTs7Q0FBQTs7Q0FDeEIsUUFBTXFDLFlBQVksR0FBRyxPQUFPckMsT0FBUCxLQUFtQixVQUFuQixJQUFpQ0EsT0FBTyxFQUE3RDtDQUVBLGlGQUFNcUMsWUFBWSxHQUFHO0NBQUNwQyxNQUFBQSxPQUFPLEVBQUU7Q0FBVixLQUFILEdBQW1CRCxPQUFyQzs7Q0FId0IsbUZBRmhCLEtBRWdCOztDQUt4QixVQUFLc0MsT0FBTCxHQUFlRCxZQUFZLFlBQVlFLE9BQXZDO0NBRUEsVUFBS0MsTUFBTCxHQUFjLE1BQUtGLE9BQUwsR0FBZSxJQUFJQyxPQUFKLENBQVksVUFBQUUsT0FBTyxFQUFJO0NBQ2xESixNQUFBQSxZQUFZLENBQUNLLElBQWIsQ0FBa0IsVUFBQTFDLE9BQU8sRUFBSTtDQUMzQnlDLFFBQUFBLE9BQU8sQ0FBQyxNQUFLRSxLQUFMLENBQVczQyxPQUFYLENBQUQsQ0FBUDtDQUNELE9BRkQ7Q0FHRCxLQUo0QixDQUFmLEdBSVQsTUFBSzJDLEtBQUwsQ0FBVyxPQUFPM0MsT0FBUCxLQUFtQixVQUFuQixHQUFnQ0EsT0FBTyxFQUF2QyxHQUE0Q0EsT0FBdkQsQ0FKTDs7Q0FNQSxVQUFLOEIsWUFBTDs7Q0Fid0I7Q0FjekI7O0NBakJIO0NBQUE7Q0FBQSw0QkFtQlU7Q0FDTmIsTUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWMsa0NBQWQ7Q0FDQSxhQUFPLElBQVA7Q0FDRDtDQXRCSDtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUEsd0NBd0JZeUIsU0F4Qlo7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUEscUJBeUJ1QixLQUFLTixPQXpCNUI7Q0FBQTtDQUFBO0NBQUE7O0NBQUE7Q0FBQSx1QkF5QjRDLEtBQUtFLE1BekJqRDs7Q0FBQTtDQUFBO0NBQUE7Q0FBQTs7Q0FBQTtDQUFBLDhCQXlCMEQsS0FBS0EsTUF6Qi9EOztDQUFBO0NBeUJVSyxnQkFBQUEsVUF6QlY7O0NBQUEscUJBMEJ3QkQsU0FBUyxDQUFDTixPQTFCbEM7Q0FBQTtDQUFBO0NBQUE7O0NBQUE7Q0FBQSx1QkEwQmtETSxTQUFTLENBQUNKLE1BMUI1RDs7Q0FBQTtDQUFBO0NBQUE7Q0FBQTs7Q0FBQTtDQUFBLDhCQTBCcUVJLFNBQVMsQ0FBQ0osTUExQi9FOztDQUFBO0NBMEJVTSxnQkFBQUEsV0ExQlY7Q0E0QklELGdCQUFBQSxVQUFVLENBQUNFLEdBQVgsQ0FBZUQsV0FBZjs7Q0E1Qko7Q0FBQTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7O0NBQUE7Q0FBQTtDQUFBOztDQUFBO0NBQUE7Q0FBQTs7Q0FBQTtDQUFBLEVBQStCL0MsWUFBL0I7OztDQ0FBLFNBQVMsd0JBQXdCLEdBQUc7R0FDbEMsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sS0FBSyxDQUFDO0dBQ3ZFLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUM7R0FDekMsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUUsT0FBTyxJQUFJLENBQUM7O0dBRTdDLElBQUk7S0FDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMxRSxPQUFPLElBQUksQ0FBQztJQUNiLENBQUMsT0FBTyxDQUFDLEVBQUU7S0FDVixPQUFPLEtBQUssQ0FBQztJQUNkO0VBQ0Y7O0NBRUQsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7R0FDdkMsSUFBSSx3QkFBd0IsRUFBRSxFQUFFO0tBQzlCLGNBQWMsR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNqRCxNQUFNO0tBQ0wsY0FBYyxHQUFHLFVBQVUsR0FBRyxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtPQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO09BQ3RCLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztPQUNqRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO09BQ2pDLElBQUksS0FBSyxFQUFFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQ3JELE9BQU8sUUFBUSxDQUFDO01BQ2pCLENBQUM7SUFDSDs7R0FFRCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0VBQzFDOztDQUVELGNBQWMsR0FBRyxVQUFVOzs7OztDQ2hDcEIsSUFBTWlELE1BQU0sR0FBRztDQUNwQkMsRUFBQUEsTUFBTSxFQUFFLE9BQU9BLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRDtDQUQ3QixDQUFmOztDQ0FQLFNBQVMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtHQUN2RCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7R0FDOUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0dBQ2hCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDckMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDOztHQUVYLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtLQUN0QyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BCLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUztLQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCOztHQUVELE9BQU8sTUFBTSxDQUFDO0VBQ2Y7O0NBRUQsZ0NBQWMsR0FBRyw2QkFBNkI7O0NDYjlDLFNBQVMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtHQUNsRCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7R0FDOUIsSUFBSSxNQUFNLEdBQUcsNEJBQTRCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0dBQzVELElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQzs7R0FFWCxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRTtLQUNoQyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7S0FFNUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7T0FDNUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzFCLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUztPQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLFNBQVM7T0FDdkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUMzQjtJQUNGOztHQUVELE9BQU8sTUFBTSxDQUFDO0VBQ2Y7O0NBRUQsMkJBQWMsR0FBRyx3QkFBd0I7O0tDckI1QkUsWUFBYjtDQUFBO0NBQUE7Q0FDRSwwQkFBcUI7Q0FBQTs7Q0FBQSxzQ0FBTmpELElBQU07Q0FBTkEsTUFBQUEsSUFBTTtDQUFBOztDQUNuQixTQUFLQSxJQUFMLEdBQVlBLElBQVo7Q0FDRDs7Q0FISDtDQUFBO0NBQUEsMEJBS1FrRCxHQUxSLFFBS2tDO0NBQUEsVUFBcEI3QyxPQUFvQixRQUFwQkEsT0FBb0I7Q0FBQSxVQUFSOEMsS0FBUTs7Q0FDOUIsV0FBS25ELElBQUwsQ0FBVVcsT0FBVixDQUFrQixVQUFBWCxJQUFJLEVBQUk7Q0FDeEJvRCxRQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY2hELE9BQWQsRUFBdUIsT0FBT0wsSUFBUCxLQUFnQixVQUFoQixHQUE2QkEsSUFBSSxDQUFDSyxPQUFELEVBQVU4QyxLQUFWLENBQWpDLEdBQW9EbkQsSUFBM0U7Q0FDRCxPQUZEO0NBR0Q7Q0FUSDs7Q0FBQTtDQUFBOztDQ0FBOzs7Ozs7O0tBT01zRCxPQUNKLGNBQVlDLElBQVosRUFBa0I7Q0FBQTs7Q0FDaEIsT0FBS0EsSUFBTCxHQUFZQSxJQUFaO0NBQ0EsT0FBS0MsT0FBTCxHQUFlLElBQWY7Q0FDRDs7Q0NYSCxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUU7R0FDNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDO0VBQ3BDOztDQUVELGtCQUFjLEdBQUcsZUFBZTs7Q0NKaEMsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO0dBQ3JDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztHQUNkLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztHQUNkLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztHQUNmLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQzs7R0FFbkIsSUFBSTtLQUNGLEtBQUssSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRTtPQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7T0FFcEIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsTUFBTTtNQUNuQztJQUNGLENBQUMsT0FBTyxHQUFHLEVBQUU7S0FDWixFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQ1YsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNWLFNBQVM7S0FDUixJQUFJO09BQ0YsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO01BQ2pELFNBQVM7T0FDUixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQztNQUNsQjtJQUNGOztHQUVELE9BQU8sSUFBSSxDQUFDO0VBQ2I7O0NBRUQsd0JBQWMsR0FBRyxxQkFBcUI7O0NDMUJ0QyxTQUFTLGdCQUFnQixHQUFHO0dBQzFCLE1BQU0sSUFBSSxTQUFTLENBQUMsc0RBQXNELENBQUMsQ0FBQztFQUM3RTs7Q0FFRCxtQkFBYyxHQUFHLGdCQUFnQjs7Q0NFakMsU0FBUyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTtHQUM5QixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksZUFBZSxFQUFFLENBQUM7RUFDakY7O0NBRUQsaUJBQWMsR0FBRyxjQUFjOztLQ1ZsQkMsS0FBYjtDQUFBO0NBQUE7Q0FPRSxpQkFBWUMsT0FBWixFQUFxQjtDQUFBOztDQUNuQixTQUFLQSxPQUFMLEdBQWVBLE9BQWY7Q0FDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtDQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7Q0FDRDs7Q0FYSDtDQUFBO0NBQUEsNEJBYVVDLFNBYlYsRUFhcUJDLFNBYnJCLEVBYWdDO0NBQzVCLFVBQUksS0FBS0YsVUFBTCxDQUFnQkMsU0FBaEIsQ0FBSixFQUFnQztDQUM5QixhQUFLRCxVQUFMLENBQWdCQyxTQUFoQixFQUEyQnBDLElBQTNCLENBQWdDcUMsU0FBaEM7Q0FDRCxPQUZELE1BRU87Q0FDTCxhQUFLRixVQUFMLENBQWdCQyxTQUFoQixJQUE2QixDQUFDQyxTQUFELENBQTdCO0NBQ0Q7Q0FDRjtDQW5CSDtDQUFBO0NBQUEseUJBcUJPQyxTQXJCUCxFQXFCa0JDLEdBckJsQixFQXFCcUM7Q0FBQSxVQUFkbEUsT0FBYyx1RUFBSixFQUFJOztDQUFBLG1CQUNYLFNBQVNtRSxJQUFULENBQWNGLFNBQWQsQ0FEVztDQUFBO0NBQUEsVUFDeEJGLFNBRHdCOztDQUVqQyxVQUFNSyxNQUFNLEdBQUcsS0FBS1IsT0FBTCxDQUFhRyxTQUFiLENBQWY7Q0FDQSxVQUFNRCxVQUFVLEdBQUcsS0FBS0EsVUFBTCxDQUFnQkMsU0FBaEIsS0FBOEIsRUFBakQ7Q0FFQSxXQUFLRixJQUFMLENBQVVJLFNBQVYsSUFBdUIsSUFBSTFCLE9BQUosQ0FBWSxVQUFDRSxPQUFELEVBQVU0QixNQUFWLEVBQXFCO0NBQ3RERCxRQUFBQSxNQUFNLENBQUNFLElBQVAsQ0FDRUosR0FERixFQUVFLFVBQUNoRSxJQUFELEVBQVU7Q0FDUnVDLFVBQUFBLE9BQU8sQ0FDTHFCLFVBQVUsQ0FBQ1MsTUFBWCxDQUNFLFVBQUNDLE9BQUQsRUFBVVIsU0FBVjtDQUFBLG1CQUF3QkEsU0FBUyxDQUFDUSxPQUFELEVBQVV4RSxPQUFWLEVBQW1CaUUsU0FBbkIsQ0FBakM7Q0FBQSxXQURGLEVBRUUvRCxJQUZGLENBREssQ0FBUDtDQU1ELFNBVEgsRUFVRXVFLFNBVkYsRUFXRUosTUFYRjtDQWFELE9BZHNCLENBQXZCO0NBZ0JBLGFBQU8sS0FBS1IsSUFBTCxDQUFVSSxTQUFWLENBQVA7Q0FDRDtDQTNDSDtDQUFBO0NBQUEsd0JBNkNNQSxTQTdDTixFQTZDaUI7Q0FDYixhQUFPLEtBQUtKLElBQUwsQ0FBVUksU0FBVixDQUFQO0NBQ0Q7Q0EvQ0g7O0NBQUE7Q0FBQTs7Z0JBQWFOLHNCQUNVO0NBQ25CVyxFQUFBQSxJQURtQixnQkFDZEksU0FEYyxFQUNIQyxVQURHLEVBQ1NDLFVBRFQsRUFDcUJDLE9BRHJCLEVBQzhCO0NBQy9DSCxJQUFBQSxTQUFTLEdBQUdoQyxJQUFaLENBQWlCaUMsVUFBakI7Q0FDRDtDQUhrQjs7Q0NRdkI7Ozs7Ozs7OztLQVFNRzs7Ozs7Q0FFSjs7Ozs7O0NBUUE7Ozs7OztDQVlBLGlCQUEwQjtDQUFBOztDQUFBLFFBQWQ3RSxPQUFjLHVFQUFKLEVBQUk7O0NBQUE7O0NBQ3hCZ0IsSUFBQUEsT0FBTyxDQUFDOEQsR0FBUixtQkFBdUJDLE9BQXZCO0NBQ0EsMkVBQU07Q0FBQy9FLE1BQUFBLE9BQU8sRUFBUEE7Q0FBRCxLQUFOOztDQUZ3QixtRkFmaEIsSUFlZ0I7O0NBQUEsaUZBZGxCLElBQUlnRixXQUFKLEVBY2tCOztDQUFBLGlGQU5sQixFQU1rQjs7Q0FJeEIsVUFBS25ELFlBQUw7O0NBSndCO0NBS3pCOztDQUlEOzs7Ozs7Ozs7NkJBS1E7Q0FBQTs7Q0FDTixVQUFNb0QsZ0JBQWdCLEdBQUksWUFBTTtDQUM5QixlQUFPbEMsTUFBTSxDQUFDQyxNQUFQLENBQWNrQyxxQkFBZCxJQUNGbkMsTUFBTSxDQUFDQyxNQUFQLENBQWNtQywyQkFEWixJQUVGcEMsTUFBTSxDQUFDQyxNQUFQLENBQWNvQyx3QkFGWixJQUdGLFVBQVVDLFFBQVYsRUFBb0I7Q0FDckJ0QyxVQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY3NDLFVBQWQsQ0FBeUJELFFBQXpCLEVBQW1DLE9BQU8sRUFBMUM7Q0FDRCxTQUxIO0NBTUQsT0FQd0IsRUFBekI7O0NBU0EsVUFBTUUsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBTTtDQUNwQixRQUFBLE1BQUksQ0FBQ0MsT0FBTCxHQUFlUCxnQkFBZ0IsQ0FBQztDQUFBLGlCQUFNTSxPQUFPLEVBQWI7Q0FBQSxTQUFELENBQS9CO0NBQ0EsWUFBSSxDQUFDLE1BQUksQ0FBQzlCLE9BQVYsRUFBbUI7O0NBRW5CLGFBQUssSUFBSWdDLENBQUMsR0FBRyxDQUFSLEVBQVdDLEVBQUUsR0FBRyxNQUFJLENBQUNDLEtBQUwsQ0FBV0MsTUFBaEMsRUFBd0NILENBQUMsR0FBR0MsRUFBNUMsRUFBZ0RELENBQUMsRUFBakQsRUFBcUQ7Q0FDbkQsY0FBTUksQ0FBQyxHQUFHLE1BQUksQ0FBQ0YsS0FBTCxDQUFXRixDQUFYLENBQVY7Q0FDQSxjQUFJSSxDQUFDLENBQUNwQyxPQUFOLEVBQWVvQyxDQUFDLENBQUNyQyxJQUFGLENBQU9xQyxDQUFDLENBQUNDLEtBQVQ7Q0FDaEI7Q0FDRixPQVJEOztDQVVBLFdBQUtyQyxPQUFMLEdBQWUsSUFBZjtDQUVBLFVBQUksQ0FBQyxLQUFLK0IsT0FBVixFQUNFRCxPQUFPO0NBQ1Y7OzswQkFFSVEsY0FBYztDQUNqQixVQUFNQyxJQUFJLEdBQUcsSUFBSXpDLElBQUosQ0FBU3dDLFlBQVQsQ0FBYjtDQUNBLFdBQUtKLEtBQUwsQ0FBV2pFLElBQVgsQ0FBZ0JzRSxJQUFoQjtDQUVBLGFBQU9BLElBQVA7Q0FDRDs7OztHQW5FZWxHOztnQkFBWitFLGNBQ1duQjs7Z0JBRFhtQixlQWtCWSxZQUFhO0NBQUEsb0NBQVRvQixJQUFTO0NBQVRBLElBQUFBLElBQVM7Q0FBQTs7Q0FDM0IsbUJBQVcvQyxZQUFYLEVBQTJCK0MsSUFBM0I7Q0FDRDs7Q0NyQ0g7O0NDQUEsU0FBU0MsbUJBQVQsQ0FBNkJDLFFBQTdCLEVBQXVDbEcsSUFBdkMsRUFBNkM7Q0FDM0MsTUFBSSxDQUFDQSxJQUFMLEVBQVc7Q0FFWCxNQUFJbUcsVUFBVSxHQUFHLEVBQWpCOztDQUVBLE1BQUluRyxJQUFJLFlBQVlvRCxNQUFNLENBQUNnRCxjQUFQLENBQXNCRixRQUF0QixFQUFnQ0csV0FBcEQsRUFBaUU7Q0FBRTtDQUNqRUgsSUFBQUEsUUFBUSxDQUFDSSxJQUFULENBQWN0RyxJQUFkO0NBQ0E7Q0FDRCxHQUhELE1BR08sSUFBSXVHLEtBQUssQ0FBQ0MsT0FBTixDQUFjeEcsSUFBZCxDQUFKLEVBQXlCO0NBQzlCbUcsSUFBQUEsVUFBVSxHQUFHO0NBQ1hNLE1BQUFBLENBQUMsRUFBRXpHLElBQUksQ0FBQyxDQUFELENBREk7Q0FFWDBHLE1BQUFBLENBQUMsRUFBRTFHLElBQUksQ0FBQyxDQUFELENBRkk7Q0FHWDJHLE1BQUFBLENBQUMsRUFBRTNHLElBQUksQ0FBQyxDQUFELENBSEk7Q0FJWDRHLE1BQUFBLENBQUMsRUFBRTVHLElBQUksQ0FBQyxDQUFEO0NBSkksS0FBYjtDQU1ELEdBUE0sTUFPQTtDQUNMbUcsSUFBQUEsVUFBVSxHQUFHO0NBQ1hNLE1BQUFBLENBQUMsRUFBRXpHLElBQUksQ0FBQ3lHLENBREc7Q0FFWEMsTUFBQUEsQ0FBQyxFQUFFMUcsSUFBSSxDQUFDMEcsQ0FGRztDQUdYQyxNQUFBQSxDQUFDLEVBQUUzRyxJQUFJLENBQUMyRyxDQUhHO0NBSVhDLE1BQUFBLENBQUMsRUFBRTVHLElBQUksQ0FBQzRHO0NBSkcsS0FBYjtDQU1EOztDQUVELE1BQUlWLFFBQVEsQ0FBQ1UsQ0FBVCxLQUFlckMsU0FBbkIsRUFBOEI7Q0FDNUIsV0FBTzRCLFVBQVUsQ0FBQ1MsQ0FBbEI7Q0FDRDs7Q0FFRHhELEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjNkMsUUFBZCxFQUF3QkMsVUFBeEI7Q0FDRDs7QUFFRCxDQUFPLFNBQVNVLGNBQVQsQ0FBd0J2RSxNQUF4QixFQUFnQ3hDLE9BQWhDLEVBQXlDO0NBQzlDbUcsRUFBQUEsbUJBQW1CLENBQUMzRCxNQUFNLENBQUN3RSxRQUFSLEVBQWtCaEgsT0FBTyxDQUFDZ0gsUUFBMUIsQ0FBbkI7Q0FDQWIsRUFBQUEsbUJBQW1CLENBQUMzRCxNQUFNLENBQUN5RSxLQUFSLEVBQWVqSCxPQUFPLENBQUNpSCxLQUF2QixDQUFuQjtDQUNBZCxFQUFBQSxtQkFBbUIsQ0FBQzNELE1BQU0sQ0FBQzBFLFFBQVIsRUFBa0JsSCxPQUFPLENBQUNrSCxRQUExQixDQUFuQjtDQUNEOztLQy9CWUMsYUFBYjtDQUFBO0NBQUE7Q0FBQTs7Q0FBQTtDQUFBOztDQUFBO0NBQUE7O0NBQUE7Q0FBQTtDQUFBLDBCQUNRbkgsT0FEUixFQUNpQjtDQUNiLFVBQU1vSCxRQUFRLEdBQUdwSCxPQUFPLENBQUNvSCxRQUF6QjtDQUNBLFVBQU1DLFFBQVEsR0FBR3JILE9BQU8sQ0FBQ3FILFFBQXpCO0NBRUEsVUFBTUMsSUFBSSxHQUFHLEtBQUtDLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLElBQUlDLFVBQUosQ0FDL0IsS0FBS0QsTUFBTCxDQUFZLFVBQVosRUFBd0JILFFBQXhCLENBRCtCLEVBRS9CLEtBQUtHLE1BQUwsQ0FBWSxVQUFaLEVBQXdCRixRQUF4QixDQUYrQixDQUFwQixDQUFiO0NBS0FOLE1BQUFBLGNBQWMsQ0FBQ08sSUFBRCxFQUFPdEgsT0FBUCxDQUFkO0NBRUEsYUFBT3NILElBQVA7Q0FDRDtDQWJIOztDQUFBO0NBQUEsRUFBbUNsRixTQUFuQztDQWdCQUEsU0FBUyxDQUFDb0YsSUFBVixHQUFpQkwsYUFBakI7O0tDakJhTSxlQUFiO0NBQUE7Q0FBQTtDQUFBOztDQUFBO0NBQUE7O0NBQUE7Q0FBQTs7Q0FBQTtDQUFBO0NBQUEsMEJBQ1F6SCxPQURSLEVBQ2lCO0NBQ2IsVUFBTTBILE1BQU0sR0FBRzFILE9BQU8sQ0FBQzBILE1BQXZCO0NBRUFYLE1BQUFBLGNBQWMsQ0FBQ1csTUFBRCxFQUFTMUgsT0FBVCxDQUFkO0NBRUEsYUFBTyxLQUFLdUgsTUFBTCxDQUFZLFFBQVosRUFBc0JHLE1BQXRCLENBQVA7Q0FDRDtDQVBIO0NBQUE7Q0FBQSxtQ0FTaUJsRyxRQVRqQixFQVMyQjtDQUFBOztDQUN2QkEsTUFBQUEsUUFBUSxDQUFDLE1BQUQsRUFBUyxnQkFBcUI7Q0FBQTtDQUFBLFlBQW5CbUcsS0FBbUI7Q0FBQSxZQUFaQyxNQUFZOztDQUNwQyxRQUFBLEtBQUksQ0FBQ3BGLE1BQUwsQ0FBWXFGLE1BQVosR0FBcUJGLEtBQUssR0FBR0MsTUFBN0I7O0NBQ0EsUUFBQSxLQUFJLENBQUNwRixNQUFMLENBQVlzRixzQkFBWjtDQUNELE9BSE8sQ0FBUjtDQUtBLGFBQU8sSUFBUDtDQUNEO0NBaEJIOztDQUFBO0NBQUEsRUFBcUMxRixTQUFyQztDQW1CQUEsU0FBUyxDQUFDMkYsTUFBVixHQUFtQk4sZUFBbkI7O0tDbkJhTyxjQUFiO0NBQUE7Q0FBQTtDQUFBOztDQUFBO0NBQUE7O0NBQUE7Q0FBQTs7Q0FBQTtDQUFBO0NBQUEsMEJBQ1FoSSxPQURSLEVBQ2lCO0NBQ2IsVUFBTWlJLEtBQUssR0FBR2pJLE9BQU8sQ0FBQ2lJLEtBQXRCO0NBRUFsQixNQUFBQSxjQUFjLENBQUNrQixLQUFELEVBQVFqSSxPQUFSLENBQWQ7Q0FFQSxhQUFPLEtBQUt1SCxNQUFMLENBQVksT0FBWixFQUFxQlUsS0FBckIsQ0FBUDtDQUNEO0NBUEg7O0NBQUE7Q0FBQSxFQUFvQzdGLFNBQXBDO0NBVUFBLFNBQVMsQ0FBQzhGLEtBQVYsR0FBa0JGLGNBQWxCOztLQ1hhRyxVQUFiO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQTs7Q0FBQTtDQUFBO0NBQUEsMEJBQ1EvRSxHQURSLFFBQ3dCO0NBQUEsVUFBVjdDLE9BQVUsUUFBVkEsT0FBVTtDQUNwQkEsTUFBQUEsT0FBTyxDQUFDNkgsS0FBUixHQUFnQixJQUFJQyxXQUFKLEVBQWhCOztDQUVBakYsTUFBQUEsR0FBRyxDQUFDTCxHQUFKO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQSx5QkFBVSxpQkFBT0gsU0FBUDtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FDRndGLGtCQUFBQSxLQURFLEdBQ003SCxPQUFPLENBQUM2SCxLQURkOztDQUFBLHVCQUdKeEYsU0FBUyxDQUFDTixPQUhOO0NBQUE7Q0FBQTtDQUFBOztDQUFBLGdDQUlOOEYsS0FKTTtDQUFBO0NBQUEseUJBSVV4RixTQUFTLENBQUNKLE1BSnBCOztDQUFBO0NBQUE7O0NBQUEsOEJBSUFPLEdBSkE7O0NBQUE7Q0FBQTs7Q0FBQTtDQU1OcUYsa0JBQUFBLEtBQUssQ0FBQ3JGLEdBQU4sQ0FBVUgsU0FBUyxDQUFDSixNQUFwQjs7Q0FOTTtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxTQUFWOztDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBU0Q7Q0FiSDs7Q0FBQTtDQUFBOztLQ0FhOEYsZUFBYjtDQUFBO0NBQUE7Q0FDRSw2QkFBc0Q7Q0FBQSxRQUExQ0MsYUFBMEMsdUVBQTFCLEVBQTBCO0NBQUEsUUFBdEJDLGVBQXNCLHVFQUFKLEVBQUk7O0NBQUE7O0NBQ3BELFNBQUtELGFBQUwsR0FBcUJBLGFBQXJCO0NBQ0EsU0FBS0MsZUFBTCxHQUF1QkEsZUFBdkI7Q0FDRDs7Q0FKSDtDQUFBO0NBQUEsMEJBTVFwRixHQU5SLFFBTXdDO0NBQUEsVUFBMUI3QyxPQUEwQixRQUExQkEsT0FBMEI7Q0FBQSxVQUFqQmlCLFFBQWlCLFFBQWpCQSxRQUFpQjtDQUFBLFVBQVBOLElBQU8sUUFBUEEsSUFBTztDQUNwQ0EsTUFBQUEsSUFBSSxDQUFDLE1BQUQsRUFBUyxrREFBVCxDQUFKO0NBQ0FBLE1BQUFBLElBQUksQ0FBQyxRQUFELEVBQVcsaURBQVgsQ0FBSjtDQUNBQSxNQUFBQSxJQUFJLENBQUMsT0FBRCxFQUFVLHVDQUFWLENBQUo7Q0FDQUEsTUFBQUEsSUFBSSxDQUFDLFdBQUQsRUFBYyw0Q0FBZCxDQUFKO0NBSm9DLFVBT2xDdUgsU0FQa0MsR0FXaENsSSxPQVhnQyxDQU9sQ2tJLFNBUGtDO0NBQUEsVUFRbENmLE1BUmtDLEdBV2hDbkgsT0FYZ0MsQ0FRbENtSCxNQVJrQztDQUFBLFVBU2xDVSxLQVRrQyxHQVdoQzdILE9BWGdDLENBU2xDNkgsS0FUa0M7Q0FBQSwwQkFXaEM3SCxPQVhnQyxDQVVsQ21JLElBVmtDO0NBQUEsVUFVbENBLElBVmtDLDhCQVUzQixDQUFDekYsTUFBTSxDQUFDMEYsVUFBUixFQUFvQjFGLE1BQU0sQ0FBQzJGLFdBQTNCLENBVjJCO0NBYXBDLFVBQU1KLGVBQWUsR0FBRyxLQUFLQSxlQUFMLElBQXdCLEVBQWhEO0NBRUEsVUFBTUssUUFBUSxHQUFHdEksT0FBTyxDQUFDc0ksUUFBUixHQUFtQixJQUFJQyxtQkFBSixDQUFrQixLQUFLQyxzQkFBTCxDQUE0QlAsZUFBNUIsQ0FBbEIsQ0FBcEM7Q0FDQUssTUFBQUEsUUFBUSxDQUFDRyxPQUFULENBQWlCTixJQUFJLENBQUMsQ0FBRCxDQUFyQixFQUEwQkEsSUFBSSxDQUFDLENBQUQsQ0FBOUI7Q0FFQWxILE1BQUFBLFFBQVEsQ0FBQyxNQUFELEVBQVMsVUFBQ1osS0FBRCxFQUFXO0NBQzFCaUksUUFBQUEsUUFBUSxDQUFDRyxPQUFULENBQWlCcEksS0FBSyxDQUFDLENBQUQsQ0FBdEIsRUFBMkJBLEtBQUssQ0FBQyxDQUFELENBQWhDO0NBQ0QsT0FGTyxDQUFSO0NBSUE2SCxNQUFBQSxTQUFTLENBQUNRLFdBQVYsQ0FBc0JKLFFBQVEsQ0FBQ0ssVUFBL0I7Q0FFQTNJLE1BQUFBLE9BQU8sQ0FBQzRJLFVBQVIsR0FBcUIvRixHQUFHLENBQUM2QyxJQUFKLENBQVMsWUFBTTtDQUFBLFlBRWhDbUMsS0FGZ0MsR0FJOUI3SCxPQUo4QixDQUVoQzZILEtBRmdDO0NBQUEsWUFHaENWLE1BSGdDLEdBSTlCbkgsT0FKOEIsQ0FHaENtSCxNQUhnQztDQU1sQ25ILFFBQUFBLE9BQU8sQ0FBQ3NJLFFBQVIsQ0FBaUJPLE1BQWpCLENBQXdCaEIsS0FBeEIsRUFBK0JWLE1BQU0sQ0FBQ2xGLE1BQXRDO0NBQ0QsT0FQb0IsQ0FBckI7Q0FRRDtDQXRDSDtDQUFBO0NBQUEsMkNBd0N5QmdHLGVBeEN6QixFQXdDMEM7Q0FDdEMsVUFBTWEsT0FBTyxHQUFHLEtBQUtkLGFBQUwsQ0FBbUJjLE9BQW5CLElBQThCLFFBQTlDOztDQUVBLGNBQVFBLE9BQVI7Q0FDRSxhQUFLLE1BQUw7Q0FDRWIsVUFBQUEsZUFBZSxDQUFDYyxTQUFoQixHQUE0QixJQUE1QjtDQUNBOztDQUNGO0NBSkY7O0NBUUEsYUFBT2QsZUFBUDtDQUNEO0NBcERIOztDQUFBO0NBQUE7O0tDRmFlLGNBQWI7Q0FBQTtDQUFBO0NBQ0UsMEJBQVlDLGFBQVosRUFBMkI7Q0FBQTs7Q0FDekIsU0FBS0EsYUFBTCxHQUFxQkEsYUFBckI7Q0FDRDs7Q0FISDtDQUFBO0NBQUEsMEJBS1FwRyxHQUxSLFFBS3dCO0NBQUEsVUFBVjdDLE9BQVUsUUFBVkEsT0FBVTtDQUNwQkEsTUFBQUEsT0FBTyxDQUFDa0osUUFBUixHQUFtQixLQUFLRCxhQUFMLENBQW1CakosT0FBbkIsQ0FBbkI7Q0FFQUEsTUFBQUEsT0FBTyxDQUFDbUosWUFBUixHQUF1QnRHLEdBQUcsQ0FBQzZDLElBQUosQ0FBUyxZQUFNO0NBQ3BDMUYsUUFBQUEsT0FBTyxDQUFDa0osUUFBUixDQUFpQkUsTUFBakI7Q0FDRCxPQUZzQixDQUF2QjtDQUdEO0NBWEg7O0NBQUE7Q0FBQTs7S0NBYUMsWUFBYjtDQUFBO0NBQUE7Q0FBQTtDQUFBO0NBQUE7O0NBQUE7Q0FBQTtDQUFBLDBCQUNReEcsR0FEUixRQUN3QjtDQUFBLFVBQVY3QyxPQUFVLFFBQVZBLE9BQVU7Q0FDcEIwQyxNQUFBQSxNQUFNLENBQUM0RyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFNO0NBQ3RDdEosUUFBQUEsT0FBTyxDQUFDbUksSUFBUixHQUFlLENBQUN6RixNQUFNLENBQUMwRixVQUFSLEVBQW9CMUYsTUFBTSxDQUFDMkYsV0FBM0IsQ0FBZjtDQUNELE9BRkQ7Q0FHRDtDQUxIOztDQUFBO0NBQUE7O0NDQUE7Ozs7Ozs7OztBQVVBO0NBR0EsSUFBTWtCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07Q0FDckIsUUFBTSxJQUFJMUksS0FBSixDQUFVLCtEQUFWLENBQU47Q0FDRCxDQUZEOztDQUlBLElBQUk7Q0FDRixNQUFJLENBQUMySSxjQUFMLEVBQWVELFFBQVE7Q0FDeEIsQ0FGRCxDQUVFLE9BQU9FLEdBQVAsRUFBWTtDQUNaRixFQUFBQSxRQUFRO0NBQ1Q7Q0FNRDtDQUNBO0NBQ0E7Q0FFQTtDQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
