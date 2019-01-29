/* WhitestormJS Framework v3.0.0-alpha.1 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.WHS = {}, global.THREE));
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

	const version = "3.0.0-dev.5";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL3NyYy9jb3JlL0NvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NvbnN0cnVjdC5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIi4uL3NyYy9tb2R1bGVzL0RlZmluZU1vZHVsZS5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIi4uL3NyYy9jb3JlL1N0b3JlLmpzIiwiLi4vc3JjL2NvcmUvQXBwLmpzIiwiLi4vc3JjL2NvcmUvaW5kZXguanMiLCIuLi9zcmMvdXRpbHMvYXBwbHlUcmFuc2Zvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9NZXNoLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvTGlnaHQuanMiLCIuLi9zcmMvbW9kdWxlcy9UcmVlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvQ29udHJvbHNNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9SZXNpemVNb2R1bGUuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xuICB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG59KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJleHBvcnQgY2xhc3MgTW9kdWxlU3lzdGVtIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMubW9kdWxlcyA9IG9wdGlvbnMubW9kdWxlcyB8fCBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCB1bnJlc29sdmVkV2FybnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgdXBkYXRlSGFuZGxlcnMgPSB7fTtcbiAgICBsZXQgYWN0aXZlTW9kdWxlID0gbnVsbDtcblxuICAgIHRoaXMubWFuYWdlciA9IG5ldyBQcm94eShkYXRhLCB7XG4gICAgICBzZXQob2JqLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICBvYmpbcHJvcF0gPSB2YWx1ZTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wLCB1cGRhdGVIYW5kbGVyc1twcm9wXSk7XG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wXSkge1xuICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BdLmZvckVhY2goY2IgPT4gY2IodmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcblxuICAgICAgZ2V0KG9iaiwgcHJvcCkge1xuICAgICAgICBpZiAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHdhcm5zID0gdW5yZXNvbHZlZFdhcm5zLmdldChhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgaWYgKHdhcm5zICYmIHdhcm5zW3Byb3BdKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5zW3Byb3BdLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgaWYgKGFjdGl2ZU1vZHVsZSA9PT0gbnVsbClcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGFjdGl2ZSBtb2R1bGUnKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBY3RpdmUgbW9kdWxlOiAnLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYW5hZ2VyLiR7cHJvcH0gaXMgcmVxdWlyZWQgYnkgdGhlIGFjdGl2ZSBtb2R1bGUuYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdhcm4gPSBtb2R1bGUgPT4gKGRlcGVuZGVuY3ksIG1lc3NhZ2UpID0+IHtcbiAgICAgIHVucmVzb2x2ZWRXYXJucy5zZXQobW9kdWxlLCB7XG4gICAgICAgIC4uLih1bnJlc29sdmVkV2FybnMuZ2V0KG1vZHVsZSkgfHwge30pLFxuICAgICAgICBbZGVwZW5kZW5jeV06IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG9uVXBkYXRlID0gKHByb3BOYW1lLCBoYW5kbGVyKSA9PiB7XG4gICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdKSB7XG4gICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5wdXNoKGhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdID0gW2hhbmRsZXJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdKSB7XG4gICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLnNwbGljZShcbiAgICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5pbmRleE9mKGhhbmRsZXIpLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMgPSAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IG1vZHVsZSBvZiB0aGlzLm1vZHVsZXMpIHtcbiAgICAgICAgaWYgKCdzZXR1cCcgaW4gbW9kdWxlKSB7XG4gICAgICAgICAgYWN0aXZlTW9kdWxlID0gbW9kdWxlO1xuXG4gICAgICAgICAgbW9kdWxlLnNldHVwKHRoaXMsIHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBtYW5hZ2VyOiB0aGlzLm1hbmFnZXIsXG4gICAgICAgICAgICB3YXJuOiB3YXJuKG1vZHVsZSksXG4gICAgICAgICAgICBvblVwZGF0ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFjdGl2ZU1vZHVsZSA9IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGJyaWRnZShicmlkZ2VOYW1lLCBpbnB1dERhdGEpIHtcbiAgICBsZXQgb3V0cHV0RGF0YSA9IGlucHV0RGF0YTtcblxuICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIHRoaXMubW9kdWxlcykge1xuICAgICAgaWYgKG1vZHVsZS5icmlkZ2VzICYmIGJyaWRnZU5hbWUgaW4gbW9kdWxlLmJyaWRnZXMpIHtcbiAgICAgICAgb3V0cHV0RGF0YSA9IG1vZHVsZS5icmlkZ2VzW2JyaWRnZU5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXREYXRhO1xuICB9XG59XG4iLCJpbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgaXNBc3luYyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGFzeW5jT3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMoKTtcblxuICAgIHN1cGVyKGFzeW5jT3B0aW9ucyA/IHttb2R1bGVzOiBbXX0gOiBvcHRpb25zKTtcblxuICAgIHRoaXMuaXNBc3luYyA9IGFzeW5jT3B0aW9ucyBpbnN0YW5jZW9mIFByb21pc2U7XG5cbiAgICB0aGlzLm5hdGl2ZSA9IHRoaXMuaXNBc3luYyA/IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgYXN5bmNPcHRpb25zLnRoZW4ob3B0aW9ucyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5idWlsZChvcHRpb25zKSk7XG4gICAgICB9KTtcbiAgICB9KSA6IHRoaXMuYnVpbGQodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zKCkgOiBvcHRpb25zKTtcblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzKCk7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICBjb25zb2xlLmVycm9yKCdZb3Ugc2hvdWxkIHVzZSB5b3VyIG93biAuYnVpbGQoKScpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXN5bmMgYWRkKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IHNlbGZOYXRpdmUgPSB0aGlzLmlzQXN5bmMgPyBhd2FpdCB0aGlzLm5hdGl2ZSA6IHRoaXMubmF0aXZlO1xuICAgIGNvbnN0IGNoaWxkTmF0aXZlID0gY29tcG9uZW50LmlzQXN5bmMgPyBhd2FpdCBjb21wb25lbnQubmF0aXZlIDogY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgIHNlbGZOYXRpdmUuYWRkKGNoaWxkTmF0aXZlKTtcbiAgfVxufVxuIiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuXG4gIHRyeSB7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgaWYgKGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgIGEucHVzaC5hcHBseShhLCBhcmdzKTtcbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgaWYgKENsYXNzKSBzZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0OyIsImV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG4iLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCJ2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IHJlcXVpcmUoXCIuL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7IiwiZXhwb3J0IGNsYXNzIERlZmluZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKC4uLmRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlciwgLi4ub3RoZXJ9KSB7XG4gICAgdGhpcy5kYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICBPYmplY3QuYXNzaWduKG1hbmFnZXIsIHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nID8gZGF0YShtYW5hZ2VyLCBvdGhlcikgOiBkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJleHBvcnQgY2xhc3MgU3RvcmUge1xuICBzdGF0aWMgYXN5bmNMb2FkZXIgPSB7XG4gICAgbG9hZChhc3luY0RhdGEsIG9uQ29tcGxldGUsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IpIHtcbiAgICAgIGFzeW5jRGF0YSgpLnRoZW4ob25Db21wbGV0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGxvYWRlcnMpIHtcbiAgICB0aGlzLmxvYWRlcnMgPSBsb2FkZXJzO1xuICAgIHRoaXMucmVmcyA9IHt9O1xuICAgIHRoaXMucHJvY2Vzc29ycyA9IHt9O1xuICB9XG5cbiAgcHJvY2Vzcyhhc3NldFR5cGUsIHByb2Nlc3Nvcikge1xuICAgIGlmICh0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSkge1xuICAgICAgdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0ucHVzaChwcm9jZXNzb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSA9IFtwcm9jZXNzb3JdO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoYXNzZXROYW1lLCB1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IFssIGFzc2V0VHlwZV0gPSAvKC4qKVxcLi8uZXhlYyhhc3NldE5hbWUpO1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMubG9hZGVyc1thc3NldFR5cGVdO1xuICAgIGNvbnN0IHByb2Nlc3NvcnMgPSB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSB8fCBbXTtcblxuICAgIHRoaXMucmVmc1thc3NldE5hbWVdID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9hZGVyLmxvYWQoXG4gICAgICAgIHVybCxcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgcHJvY2Vzc29ycy5yZWR1Y2UoXG4gICAgICAgICAgICAgIChuZXdEYXRhLCBwcm9jZXNzb3IpID0+IHByb2Nlc3NvcihuZXdEYXRhLCBvcHRpb25zLCBhc3NldE5hbWUpLFxuICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZWZzW2Fzc2V0TmFtZV07XG4gIH1cblxuICByZWYoYXNzZXROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucmVmc1thc3NldE5hbWVdO1xuICB9XG59XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi9wb2x5ZmlsbCc7XG5pbXBvcnQge0RlZmluZU1vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy9EZWZpbmVNb2R1bGUnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TG9vcH0gZnJvbSAnLi9Mb29wJztcbmltcG9ydCB7U3RvcmV9IGZyb20gJy4vU3RvcmUnO1xuXG4vKipcbiAqIEBjbGFzcyBBcHBcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBwcmVwYXJlIGEgd29ybGQgc2NlbmUsIHNldHVwIHBoeXNpY3MsIGNhbWVyYSwgcmVuZGVyZXIgYW5kIGFsbCBvdGhlciB0aGluZ3MgdGhhdCB5b3UgdXN1YWxseSBkbyBiZWZvcmUgbWFraW5nIG1lc2hlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFttb2R1bGVzPVtdXSAtIEFycmF5IG9mIE1vZHVsZXNcbiAqIEBleHRlbmRzIE1vZHVsZVN5c3RlbVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIHN0YXRpYyBTdG9yZSA9IFN0b3JlO1xuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI2VuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZW5hYmxlZCA9IHRydWU7XG4gIGNsb2NrID0gbmV3IENsb2NrKCk7XG5cbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIHN0YXRpYyBkZWZpbmUgPSAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiBuZXcgRGVmaW5lTW9kdWxlKC4uLmFyZ3MpO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcbiAgICBzdXBlcih7bW9kdWxlc30pO1xuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcHJvY2VzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RBbmltRnJhbWUoKCkgPT4gcHJvY2VzcygpKTtcbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IHRoaXMubG9vcHMubGVuZ3RoOyBpIDwgbGw7IGkrKykge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5sb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5mdW5jKGUuY2xvY2spO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLnJlcXVlc3QpXG4gICAgICBwcm9jZXNzKCk7XG4gIH1cblxuICBsb29wKGxvb3BDYWxsYmFjaykge1xuICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChsb29wQ2FsbGJhY2spO1xuICAgIHRoaXMubG9vcHMucHVzaChsb29wKTtcblxuICAgIHJldHVybiBsb29wO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG4iLCJmdW5jdGlvbiBhcHBseUxvY2FsVHJhbnNmb3JtKG1hdGhUeXBlLCBkYXRhKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuO1xuXG4gIGxldCBhc3NpZ25EYXRhID0ge307XG5cbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWF0aFR5cGUpLmNvbnN0cnVjdG9yKSB7IC8vIFRIUkVFLlZlY3RvcjMgPT09IFRIUkVFLlZlY3RvcjNcbiAgICBtYXRoVHlwZS5jb3B5KGRhdGEpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgYXNzaWduRGF0YSA9IHtcbiAgICAgIHg6IGRhdGFbMF0sXG4gICAgICB5OiBkYXRhWzFdLFxuICAgICAgejogZGF0YVsyXSxcbiAgICAgIHc6IGRhdGFbM11cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGFzc2lnbkRhdGEgPSB7XG4gICAgICB4OiBkYXRhLngsXG4gICAgICB5OiBkYXRhLnksXG4gICAgICB6OiBkYXRhLnosXG4gICAgICB3OiBkYXRhLndcbiAgICB9O1xuICB9XG5cbiAgaWYgKG1hdGhUeXBlLncgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlbGV0ZSBhc3NpZ25EYXRhLnc7XG4gIH1cblxuICBPYmplY3QuYXNzaWduKG1hdGhUeXBlLCBhc3NpZ25EYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKG5hdGl2ZSwgb3B0aW9ucykge1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5wb3NpdGlvbiwgb3B0aW9ucy5wb3NpdGlvbik7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnNjYWxlLCBvcHRpb25zLnNjYWxlKTtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUucm90YXRpb24sIG9wdGlvbnMucm90YXRpb24pO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG9wdGlvbnMuZ2VvbWV0cnk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBvcHRpb25zLm1hdGVyaWFsO1xuXG4gICAgY29uc3QgbWVzaCA9IHRoaXMuYnJpZGdlKCdtZXNoJywgbmV3IE1lc2goXG4gICAgICB0aGlzLmJyaWRnZSgnZ2VvbWV0cnknLCBnZW9tZXRyeSksXG4gICAgICB0aGlzLmJyaWRnZSgnbWF0ZXJpYWwnLCBtYXRlcmlhbClcbiAgICApKTtcblxuICAgIGFwcGx5VHJhbnNmb3JtKG1lc2gsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIG1lc2g7XG4gIH1cbn1cblxuQ29tcG9uZW50Lk1lc2ggPSBNZXNoQ29tcG9uZW50O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIENhbWVyYUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBjYW1lcmEgPSBvcHRpb25zLmNhbWVyYTtcblxuICAgIGFwcGx5VHJhbnNmb3JtKGNhbWVyYSwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5icmlkZ2UoJ2NhbWVyYScsIGNhbWVyYSk7XG4gIH1cblxuICBhdXRvU2l6ZVVwZGF0ZShvblVwZGF0ZSkge1xuICAgIG9uVXBkYXRlKCdzaXplJywgKFt3aWR0aCwgaGVpZ2h0XSkgPT4ge1xuICAgICAgdGhpcy5uYXRpdmUuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICB0aGlzLm5hdGl2ZS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5Db21wb25lbnQuQ2FtZXJhID0gQ2FtZXJhQ29tcG9uZW50O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIExpZ2h0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgYnVpbGQob3B0aW9ucykge1xuICAgIGNvbnN0IGxpZ2h0ID0gb3B0aW9ucy5saWdodDtcblxuICAgIGFwcGx5VHJhbnNmb3JtKGxpZ2h0LCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLmJyaWRnZSgnbGlnaHQnLCBsaWdodCk7XG4gIH1cbn1cblxuQ29tcG9uZW50LkxpZ2h0ID0gTGlnaHRDb21wb25lbnQ7XG4iLCJpbXBvcnQge1NjZW5lfSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlTW9kdWxlIHtcbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLnNjZW5lID0gbmV3IFNjZW5lKCk7XG5cbiAgICBhcHAuYWRkID0gYXN5bmMgKGNvbXBvbmVudCkgPT4ge1xuICAgICAgY29uc3Qgc2NlbmUgPSBtYW5hZ2VyLnNjZW5lO1xuXG4gICAgICBpZiAoY29tcG9uZW50LmlzQXN5bmMpIHtcbiAgICAgICAgc2NlbmUuYWRkKGF3YWl0IGNvbXBvbmVudC5uYXRpdmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUuYWRkKGNvbXBvbmVudC5uYXRpdmUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7V2ViR0xSZW5kZXJlcn0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlT3B0aW9ucyA9IHt9LCByZW5kZXJlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubW9kdWxlT3B0aW9ucyA9IG1vZHVsZU9wdGlvbnM7XG4gICAgdGhpcy5yZW5kZXJlck9wdGlvbnMgPSByZW5kZXJlck9wdGlvbnM7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyLCBvblVwZGF0ZSwgd2Fybn0pIHtcbiAgICB3YXJuKCdzaXplJywgJ21hbmFnZXIuc2l6ZSBzaG91bGQgYmUgYW4gYXJyYXk6IFt3aWR0aCwgaGVpZ2h0XScpO1xuICAgIHdhcm4oJ2NhbWVyYScsICdtYW5hZ2VyLmNhbWVyYSBzaG91bGQgYmUgYSBXSFMuQ29tcG9uZW50LkNhbWVyYScpO1xuICAgIHdhcm4oJ3NjZW5lJywgJ21hbmFnZXIuc2NlbmUgc2hvdWxkIGJlIGEgVEhSRUUuU2NlbmUnKTtcbiAgICB3YXJuKCdjb250YWluZXInLCAnbWFuYWdlci5jb250YWluZXIgc2hvdWxkIGJlIGFuIEhUTUxFbGVtZW50Jyk7XG5cbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXIsXG4gICAgICBjYW1lcmEsXG4gICAgICBzY2VuZSxcbiAgICAgIHNpemUgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF1cbiAgICB9ID0gbWFuYWdlcjtcblxuICAgIGNvbnN0IHJlbmRlcmVyT3B0aW9ucyA9IHRoaXMucmVuZGVyZXJPcHRpb25zIHx8IHt9O1xuXG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLnJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIodGhpcy5wcmVwYXJlUmVuZGVyZXJPcHRpb25zKHJlbmRlcmVyT3B0aW9ucykpO1xuICAgIHJlbmRlcmVyLnNldFNpemUoc2l6ZVswXSwgc2l6ZVsxXSk7XG5cbiAgICBvblVwZGF0ZSgnc2l6ZScsICh2YWx1ZSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgbWFuYWdlci5yZW5kZXJMb29wID0gYXBwLmxvb3AoKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzY2VuZSxcbiAgICAgICAgY2FtZXJhXG4gICAgICB9ID0gbWFuYWdlcjtcblxuICAgICAgbWFuYWdlci5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYS5uYXRpdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJlcGFyZVJlbmRlcmVyT3B0aW9ucyhyZW5kZXJlck9wdGlvbnMpIHtcbiAgICBjb25zdCBxdWFsaXR5ID0gdGhpcy5tb2R1bGVPcHRpb25zLnF1YWxpdHkgfHwgJ21lZGl1bSc7XG5cbiAgICBzd2l0Y2ggKHF1YWxpdHkpIHtcbiAgICAgIGNhc2UgJ2hpZ2gnOlxuICAgICAgICByZW5kZXJlck9wdGlvbnMuYW50aWFsaWFzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyT3B0aW9ucztcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY29udHJvbHNTZXR1cCkge1xuICAgIHRoaXMuY29udHJvbHNTZXR1cCA9IGNvbnRyb2xzU2V0dXA7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIG1hbmFnZXIuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xzU2V0dXAobWFuYWdlcik7XG5cbiAgICBtYW5hZ2VyLmNvbnRyb2xzTG9vcCA9IGFwcC5sb29wKCgpID0+IHtcbiAgICAgIG1hbmFnZXIuY29udHJvbHMudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZXNpemVNb2R1bGUge1xuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBtYW5hZ2VyLnNpemUgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF07XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogTmFtZXNwYWNlIGNvbnRhaW5pbmcgYWxsIGNsYXNzZXMgZnJvbSBhbGwgbW9kdWxlcy4gVXNlZCBhcyBnbG9iYWwgaW4gVU1EIHBhdHRlcm4uXG4gKiBAbmFtZXNwYWNlIFdIU1xuICogQGV4YW1wbGUgPGNhcHRpb24+VGhlIHVzZSBvZiBXSFMgbmFtZXNwYWNlLjwvY2FwdGlvbj5cbiAqIG5ldyBXSFMuQXBwKCkgLy8gY29yZVxuICogbmV3IFdIUy5QZXJzcGVjdGl2ZUNhbWVyYSgpIC8vIGNvbXBvbmVudHNcbiAqIG5ldyBXSFMuUmVzaXplTW9kdWxlKCkgLy8gbW9kdWxlc1xuICogV0hTLmV4dGVuZCgpIC8vIHV0aWxzXG4gKi9cblxuaW1wb3J0IHtSRVZJU0lPTn0gZnJvbSAndGhyZWUnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgaHR0cHM6Ly90aHJlZWpzLm9yZy8nKTtcbn07XG5cbnRyeSB7XG4gIGlmICghUkVWSVNJT04pIHdhcm5EZXBzKCk7XG59IGNhdGNoIChlcnIpIHtcbiAgd2FybkRlcHMoKTtcbn1cblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL3V0aWxzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9pbmRleCc7XG5cbi8vIERFUFJFQ0FUSU9OXG4vLyBleHBvcnQgKiBmcm9tICcuL2RlcHJlY2F0aW9uJztcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwiX3R5cGVvZiIsIk1vZHVsZVN5c3RlbSIsIm9wdGlvbnMiLCJtb2R1bGVzIiwiZGF0YSIsInVucmVzb2x2ZWRXYXJucyIsIk1hcCIsInVwZGF0ZUhhbmRsZXJzIiwiYWN0aXZlTW9kdWxlIiwibWFuYWdlciIsIlByb3h5Iiwic2V0Iiwib2JqIiwicHJvcCIsInZhbHVlIiwiZm9yRWFjaCIsImNiIiwiZ2V0Iiwid2FybnMiLCJjb25zb2xlIiwid2FybiIsImVycm9yIiwiRXJyb3IiLCJtb2R1bGUiLCJkZXBlbmRlbmN5IiwibWVzc2FnZSIsIm9uVXBkYXRlIiwicHJvcE5hbWUiLCJoYW5kbGVyIiwicHVzaCIsInNwbGljZSIsImluZGV4T2YiLCJzZXR1cE1vZHVsZXMiLCJzZXR1cCIsImJyaWRnZU5hbWUiLCJpbnB1dERhdGEiLCJvdXRwdXREYXRhIiwiYnJpZGdlcyIsIkNvbXBvbmVudCIsImFzeW5jT3B0aW9ucyIsImlzQXN5bmMiLCJQcm9taXNlIiwibmF0aXZlIiwicmVzb2x2ZSIsInRoZW4iLCJidWlsZCIsImNvbXBvbmVudCIsInNlbGZOYXRpdmUiLCJjaGlsZE5hdGl2ZSIsImFkZCIsInN5c3RlbSIsIndpbmRvdyIsImdsb2JhbCIsIkRlZmluZU1vZHVsZSIsImFwcCIsIm90aGVyIiwiT2JqZWN0IiwiYXNzaWduIiwiTG9vcCIsImZ1bmMiLCJlbmFibGVkIiwiU3RvcmUiLCJsb2FkZXJzIiwicmVmcyIsInByb2Nlc3NvcnMiLCJhc3NldFR5cGUiLCJwcm9jZXNzb3IiLCJhc3NldE5hbWUiLCJ1cmwiLCJleGVjIiwibG9hZGVyIiwicmVqZWN0IiwibG9hZCIsInJlZHVjZSIsIm5ld0RhdGEiLCJ1bmRlZmluZWQiLCJhc3luY0RhdGEiLCJvbkNvbXBsZXRlIiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJBcHAiLCJsb2ciLCJ2ZXJzaW9uIiwiQ2xvY2siLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FsbGJhY2siLCJzZXRUaW1lb3V0IiwicHJvY2VzcyIsInJlcXVlc3QiLCJpIiwibGwiLCJsb29wcyIsImxlbmd0aCIsImUiLCJjbG9jayIsImxvb3BDYWxsYmFjayIsImxvb3AiLCJhcmdzIiwiYXBwbHlMb2NhbFRyYW5zZm9ybSIsIm1hdGhUeXBlIiwiYXNzaWduRGF0YSIsImdldFByb3RvdHlwZU9mIiwiY29uc3RydWN0b3IiLCJjb3B5IiwiQXJyYXkiLCJpc0FycmF5IiwieCIsInkiLCJ6IiwidyIsImFwcGx5VHJhbnNmb3JtIiwicG9zaXRpb24iLCJzY2FsZSIsInJvdGF0aW9uIiwiTWVzaENvbXBvbmVudCIsImdlb21ldHJ5IiwibWF0ZXJpYWwiLCJtZXNoIiwiYnJpZGdlIiwiTWVzaCIsIkNhbWVyYUNvbXBvbmVudCIsImNhbWVyYSIsIndpZHRoIiwiaGVpZ2h0IiwiYXNwZWN0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkNhbWVyYSIsIkxpZ2h0Q29tcG9uZW50IiwibGlnaHQiLCJMaWdodCIsIlRyZWVNb2R1bGUiLCJzY2VuZSIsIlNjZW5lIiwiUmVuZGVyaW5nTW9kdWxlIiwibW9kdWxlT3B0aW9ucyIsInJlbmRlcmVyT3B0aW9ucyIsImNvbnRhaW5lciIsInNpemUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZW5kZXJlciIsIldlYkdMUmVuZGVyZXIiLCJwcmVwYXJlUmVuZGVyZXJPcHRpb25zIiwic2V0U2l6ZSIsImFwcGVuZENoaWxkIiwiZG9tRWxlbWVudCIsInJlbmRlckxvb3AiLCJyZW5kZXIiLCJxdWFsaXR5IiwiYW50aWFsaWFzIiwiQ29udHJvbHNNb2R1bGUiLCJjb250cm9sc1NldHVwIiwiY29udHJvbHMiLCJjb250cm9sc0xvb3AiLCJ1cGRhdGUiLCJSZXNpemVNb2R1bGUiLCJhZGRFdmVudExpc3RlbmVyIiwid2FybkRlcHMiLCJSRVZJU0lPTiIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0NBQUE7Ozs7Ozs7Q0FPQSxDQUFDLENBQUMsU0FBUyxNQUFNLEVBQUU7O0dBR2pCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7R0FDMUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztHQUMvQixJQUFJLFNBQVMsQ0FBQztHQUNkLElBQUksT0FBTyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO0dBQ3pELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDO0dBQ3RELElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLGFBQWEsSUFBSSxpQkFBaUIsQ0FBQztHQUNyRSxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksZUFBZSxDQUFDO0dBRy9ELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztHQUN4QyxJQUFJLE9BQU8sRUFBRTtLQUNYLEFBQWM7OztPQUdaLGNBQWMsR0FBRyxPQUFPLENBQUM7TUFDMUI7OztLQUdELE9BQU87SUFDUjs7OztHQUlELE9BQU8sR0FBRyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsQUFBVyxNQUFNLENBQUMsT0FBTyxBQUFLLENBQUM7O0dBRXJFLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7S0FFakQsSUFBSSxjQUFjLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLFlBQVks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
