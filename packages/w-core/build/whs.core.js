/* WhitestormJS Framework v3.0.0-dev.10 */
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
	      if (_this.modules.length === 0) return;
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
	        var native = _this.build(options);

	        _this.modules = options.modules || [];

	        _this.setupModules();

	        resolve(native);
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

	const version = "3.0.0-dev.10";

	var system = {
	  window: typeof window === 'undefined' ? global : window
	};

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
	    value: function setup(app, utils) {
	      this.data.forEach(function (data) {
	        Object.assign(utils.manager, typeof data === 'function' ? data(utils) : data);
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
	      var mesh = this.bridge('mesh', new three.Mesh(geometry ? this.bridge('geometry', geometry) : undefined, material ? this.bridge('material', material) : undefined));
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
	      var renderer = manager.renderer = new three.WebGLRenderer(this.prepareRendererOptions(rendererOptions));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmNvcmUuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkLmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlU3lzdGVtLmpzIiwiLi4vc3JjL2NvcmUvQ29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY29uc3RydWN0LmpzIiwiLi4vc3JjL3BvbHlmaWxsLmpzIiwiLi4vc3JjL21vZHVsZXMvRGVmaW5lTW9kdWxlLmpzIiwiLi4vc3JjL2NvcmUvTG9vcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwiLi4vc3JjL2NvcmUvU3RvcmUuanMiLCIuLi9zcmMvY29yZS9BcHAuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy91dGlscy9hcHBseVRyYW5zZm9ybS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL01lc2guanMiLCIuLi9zcmMvY29tcG9uZW50cy9DYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9MaWdodC5qcyIsIi4uL3NyYy9tb2R1bGVzL1RyZWVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9SZW5kZXJpbmdNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgcnVudGltZS5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBJbiBzbG9wcHkgbW9kZSwgdW5ib3VuZCBgdGhpc2AgcmVmZXJzIHRvIHRoZSBnbG9iYWwgb2JqZWN0LCBmYWxsYmFjayB0b1xuICAvLyBGdW5jdGlvbiBjb25zdHJ1Y3RvciBpZiB3ZSdyZSBpbiBnbG9iYWwgc3RyaWN0IG1vZGUuIFRoYXQgaXMgc2FkbHkgYSBmb3JtXG4gIC8vIG9mIGluZGlyZWN0IGV2YWwgd2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kuXG4gIChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG4gIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpXG4pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbn0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkOyIsImV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5tb2R1bGVzID0gb3B0aW9ucy5tb2R1bGVzIHx8IFtdO1xuXG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGNvbnN0IHVucmVzb2x2ZWRXYXJucyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCB1cGRhdGVIYW5kbGVycyA9IHt9O1xuICAgIGxldCBhY3RpdmVNb2R1bGUgPSBudWxsO1xuXG4gICAgdGhpcy5tYW5hZ2VyID0gbmV3IFByb3h5KGRhdGEsIHtcbiAgICAgIHNldChvYmosIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIG9ialtwcm9wXSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3AsIHVwZGF0ZUhhbmRsZXJzW3Byb3BdKTtcbiAgICAgICAgaWYgKHVwZGF0ZUhhbmRsZXJzW3Byb3BdKSB7XG4gICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcF0uZm9yRWFjaChjYiA9PiBjYih2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuXG4gICAgICBnZXQob2JqLCBwcm9wKSB7XG4gICAgICAgIGlmIChwcm9wIGluIG9iaikge1xuICAgICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgd2FybnMgPSB1bnJlc29sdmVkV2FybnMuZ2V0KGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICBpZiAod2FybnMgJiYgd2FybnNbcHJvcF0pXG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2FybnNbcHJvcF0sIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICBpZiAoYWN0aXZlTW9kdWxlID09PSBudWxsKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gYWN0aXZlIG1vZHVsZScpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6ICcsIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1hbmFnZXIuJHtwcm9wfSBpcyByZXF1aXJlZCBieSB0aGUgYWN0aXZlIG1vZHVsZS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd2FybiA9IG1vZHVsZSA9PiAoZGVwZW5kZW5jeSwgbWVzc2FnZSkgPT4ge1xuICAgICAgdW5yZXNvbHZlZFdhcm5zLnNldChtb2R1bGUsIHtcbiAgICAgICAgLi4uKHVucmVzb2x2ZWRXYXJucy5nZXQobW9kdWxlKSB8fCB7fSksXG4gICAgICAgIFtkZXBlbmRlbmN5XTogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25VcGRhdGUgPSAocHJvcE5hbWUsIGhhbmRsZXIpID0+IHtcbiAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0pIHtcbiAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLnB1c2goaGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0gPSBbaGFuZGxlcl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0pIHtcbiAgICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0uc3BsaWNlKFxuICAgICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLmluZGV4T2YoaGFuZGxlciksXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnNldHVwTW9kdWxlcyA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1vZHVsZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIHRoaXMubW9kdWxlcykge1xuICAgICAgICBpZiAoJ3NldHVwJyBpbiBtb2R1bGUpIHtcbiAgICAgICAgICBhY3RpdmVNb2R1bGUgPSBtb2R1bGU7XG5cbiAgICAgICAgICBtb2R1bGUuc2V0dXAodGhpcywge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIG1hbmFnZXI6IHRoaXMubWFuYWdlcixcbiAgICAgICAgICAgIHdhcm46IHdhcm4obW9kdWxlKSxcbiAgICAgICAgICAgIG9uVXBkYXRlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWN0aXZlTW9kdWxlID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgYnJpZGdlKGJyaWRnZU5hbWUsIGlucHV0RGF0YSkge1xuICAgIGxldCBvdXRwdXREYXRhID0gaW5wdXREYXRhO1xuXG4gICAgZm9yIChjb25zdCBtb2R1bGUgb2YgdGhpcy5tb2R1bGVzKSB7XG4gICAgICBpZiAobW9kdWxlLmJyaWRnZXMgJiYgYnJpZGdlTmFtZSBpbiBtb2R1bGUuYnJpZGdlcykge1xuICAgICAgICBvdXRwdXREYXRhID0gbW9kdWxlLmJyaWRnZXNbYnJpZGdlTmFtZV0ob3V0cHV0RGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dERhdGE7XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICBpc0FzeW5jID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgYXN5bmNPcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgJiYgb3B0aW9ucygpO1xuXG4gICAgc3VwZXIoYXN5bmNPcHRpb25zID8ge21vZHVsZXM6IFtdfSA6IG9wdGlvbnMpO1xuXG4gICAgdGhpcy5pc0FzeW5jID0gYXN5bmNPcHRpb25zIGluc3RhbmNlb2YgUHJvbWlzZTtcblxuICAgIHRoaXMubmF0aXZlID0gdGhpcy5pc0FzeW5jID8gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBhc3luY09wdGlvbnMudGhlbihvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3QgbmF0aXZlID0gdGhpcy5idWlsZChvcHRpb25zKTtcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gb3B0aW9ucy5tb2R1bGVzIHx8IFtdO1xuICAgICAgICB0aGlzLnNldHVwTW9kdWxlcygpO1xuICAgICAgICByZXNvbHZlKG5hdGl2ZSk7XG4gICAgICB9KTtcbiAgICB9KSA6IHRoaXMuYnVpbGQodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zKCkgOiBvcHRpb25zKTtcblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzKCk7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICBjb25zb2xlLmVycm9yKCdZb3Ugc2hvdWxkIHVzZSB5b3VyIG93biAuYnVpbGQoKScpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXN5bmMgYWRkKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IHNlbGZOYXRpdmUgPSB0aGlzLmlzQXN5bmMgPyBhd2FpdCB0aGlzLm5hdGl2ZSA6IHRoaXMubmF0aXZlO1xuICAgIGNvbnN0IGNoaWxkTmF0aXZlID0gY29tcG9uZW50LmlzQXN5bmMgPyBhd2FpdCBjb21wb25lbnQubmF0aXZlIDogY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgIHNlbGZOYXRpdmUuYWRkKGNoaWxkTmF0aXZlKTtcbiAgfVxufVxuIiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuXG4gIHRyeSB7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgaWYgKGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgIGEucHVzaC5hcHBseShhLCBhcmdzKTtcbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgaWYgKENsYXNzKSBzZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0OyIsImV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG4iLCJleHBvcnQgY2xhc3MgRGVmaW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoLi4uZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzZXR1cChhcHAsIHV0aWxzKSB7XG4gICAgdGhpcy5kYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICBPYmplY3QuYXNzaWduKHV0aWxzLm1hbmFnZXIsIHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nID8gZGF0YSh1dGlscykgOiBkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJleHBvcnQgY2xhc3MgU3RvcmUge1xuICBzdGF0aWMgYXN5bmNMb2FkZXIgPSB7XG4gICAgbG9hZChhc3luY0RhdGEsIG9uQ29tcGxldGUsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IpIHtcbiAgICAgIGFzeW5jRGF0YSgpLnRoZW4ob25Db21wbGV0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGxvYWRlcnMpIHtcbiAgICB0aGlzLmxvYWRlcnMgPSBsb2FkZXJzO1xuICAgIHRoaXMucmVmcyA9IHt9O1xuICAgIHRoaXMucHJvY2Vzc29ycyA9IHt9O1xuICB9XG5cbiAgcHJvY2Vzcyhhc3NldFR5cGUsIHByb2Nlc3Nvcikge1xuICAgIGlmICh0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSkge1xuICAgICAgdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0ucHVzaChwcm9jZXNzb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSA9IFtwcm9jZXNzb3JdO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoYXNzZXROYW1lLCB1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IFssIGFzc2V0VHlwZV0gPSAvKC4qKVxcLi8uZXhlYyhhc3NldE5hbWUpO1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMubG9hZGVyc1thc3NldFR5cGVdO1xuICAgIGNvbnN0IHByb2Nlc3NvcnMgPSB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSB8fCBbXTtcblxuICAgIHRoaXMucmVmc1thc3NldE5hbWVdID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9hZGVyLmxvYWQoXG4gICAgICAgIHVybCxcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgcHJvY2Vzc29ycy5yZWR1Y2UoXG4gICAgICAgICAgICAgIChuZXdEYXRhLCBwcm9jZXNzb3IpID0+IHByb2Nlc3NvcihuZXdEYXRhLCBvcHRpb25zLCBhc3NldE5hbWUpLFxuICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZWZzW2Fzc2V0TmFtZV07XG4gIH1cblxuICByZWYoYXNzZXROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucmVmc1thc3NldE5hbWVdO1xuICB9XG59XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi9wb2x5ZmlsbCc7XG5pbXBvcnQge0RlZmluZU1vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy9EZWZpbmVNb2R1bGUnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TG9vcH0gZnJvbSAnLi9Mb29wJztcbmltcG9ydCB7U3RvcmV9IGZyb20gJy4vU3RvcmUnO1xuXG4vKipcbiAqIEBjbGFzcyBBcHBcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBwcmVwYXJlIGEgd29ybGQgc2NlbmUsIHNldHVwIHBoeXNpY3MsIGNhbWVyYSwgcmVuZGVyZXIgYW5kIGFsbCBvdGhlciB0aGluZ3MgdGhhdCB5b3UgdXN1YWxseSBkbyBiZWZvcmUgbWFraW5nIG1lc2hlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFttb2R1bGVzPVtdXSAtIEFycmF5IG9mIE1vZHVsZXNcbiAqIEBleHRlbmRzIE1vZHVsZVN5c3RlbVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIHN0YXRpYyBTdG9yZSA9IFN0b3JlO1xuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI2VuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZW5hYmxlZCA9IHRydWU7XG4gIGNsb2NrID0gbmV3IENsb2NrKCk7XG5cbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIHN0YXRpYyBkZWZpbmUgPSAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiBuZXcgRGVmaW5lTW9kdWxlKC4uLmFyZ3MpO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcbiAgICBzdXBlcih7bW9kdWxlc30pO1xuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcHJvY2VzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RBbmltRnJhbWUoKCkgPT4gcHJvY2VzcygpKTtcbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IHRoaXMubG9vcHMubGVuZ3RoOyBpIDwgbGw7IGkrKykge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5sb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5mdW5jKHRoaXMuY2xvY2spO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLnJlcXVlc3QpXG4gICAgICBwcm9jZXNzKCk7XG4gIH1cblxuICBsb29wKGxvb3BDYWxsYmFjaykge1xuICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChsb29wQ2FsbGJhY2spO1xuICAgIHRoaXMubG9vcHMucHVzaChsb29wKTtcblxuICAgIHJldHVybiBsb29wO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG4iLCJmdW5jdGlvbiBhcHBseUxvY2FsVHJhbnNmb3JtKG1hdGhUeXBlLCBkYXRhKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuO1xuXG4gIGxldCBhc3NpZ25EYXRhID0ge307XG5cbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWF0aFR5cGUpLmNvbnN0cnVjdG9yKSB7IC8vIFRIUkVFLlZlY3RvcjMgPT09IFRIUkVFLlZlY3RvcjNcbiAgICBtYXRoVHlwZS5jb3B5KGRhdGEpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgYXNzaWduRGF0YSA9IHtcbiAgICAgIHg6IGRhdGFbMF0sXG4gICAgICB5OiBkYXRhWzFdLFxuICAgICAgejogZGF0YVsyXSxcbiAgICAgIHc6IGRhdGFbM11cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGFzc2lnbkRhdGEgPSB7XG4gICAgICB4OiBkYXRhLngsXG4gICAgICB5OiBkYXRhLnksXG4gICAgICB6OiBkYXRhLnosXG4gICAgICB3OiBkYXRhLndcbiAgICB9O1xuICB9XG5cbiAgaWYgKG1hdGhUeXBlLncgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlbGV0ZSBhc3NpZ25EYXRhLnc7XG4gIH1cblxuICBPYmplY3QuYXNzaWduKG1hdGhUeXBlLCBhc3NpZ25EYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKG5hdGl2ZSwgb3B0aW9ucykge1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5wb3NpdGlvbiwgb3B0aW9ucy5wb3NpdGlvbik7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnNjYWxlLCBvcHRpb25zLnNjYWxlKTtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUucm90YXRpb24sIG9wdGlvbnMucm90YXRpb24pO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG9wdGlvbnMuZ2VvbWV0cnk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBvcHRpb25zLm1hdGVyaWFsO1xuXG4gICAgY29uc3QgbWVzaCA9IHRoaXMuYnJpZGdlKCdtZXNoJywgbmV3IE1lc2goXG4gICAgICBnZW9tZXRyeSA/IHRoaXMuYnJpZGdlKCdnZW9tZXRyeScsIGdlb21ldHJ5KSA6IHVuZGVmaW5lZCxcbiAgICAgIG1hdGVyaWFsID8gdGhpcy5icmlkZ2UoJ21hdGVyaWFsJywgbWF0ZXJpYWwpIDogdW5kZWZpbmVkXG4gICAgKSk7XG5cbiAgICBhcHBseVRyYW5zZm9ybShtZXNoLCBvcHRpb25zKTtcblxuICAgIHJldHVybiBtZXNoO1xuICB9XG59XG5cbkNvbXBvbmVudC5NZXNoID0gTWVzaENvbXBvbmVudDtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgY2FtZXJhID0gb3B0aW9ucy5jYW1lcmE7XG5cbiAgICBhcHBseVRyYW5zZm9ybShjYW1lcmEsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuYnJpZGdlKCdjYW1lcmEnLCBjYW1lcmEpO1xuICB9XG5cbiAgYXV0b1NpemVVcGRhdGUob25VcGRhdGUpIHtcbiAgICBvblVwZGF0ZSgnc2l6ZScsIChbd2lkdGgsIGhlaWdodF0pID0+IHtcbiAgICAgIHRoaXMubmF0aXZlLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgdGhpcy5uYXRpdmUudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQ29tcG9uZW50LkNhbWVyYSA9IENhbWVyYUNvbXBvbmVudDtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBMaWdodENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBsaWdodCA9IG9wdGlvbnMubGlnaHQ7XG5cbiAgICBhcHBseVRyYW5zZm9ybShsaWdodCwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5icmlkZ2UoJ2xpZ2h0JywgbGlnaHQpO1xuICB9XG59XG5cbkNvbXBvbmVudC5MaWdodCA9IExpZ2h0Q29tcG9uZW50O1xuIiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7XG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgbWFuYWdlci5zY2VuZSA9IG5ldyBTY2VuZSgpO1xuXG4gICAgYXBwLmFkZCA9IGFzeW5jIChjb21wb25lbnQpID0+IHtcbiAgICAgIGNvbXBvbmVudCA9IGFwcC5icmlkZ2UoJ2NoaWxkJywgY29tcG9uZW50KTtcbiAgICAgIG1hbmFnZXIuc2NlbmUuYWRkKGNvbXBvbmVudC5pc0FzeW5jID8gYXdhaXQgY29tcG9uZW50Lm5hdGl2ZSA6IGNvbXBvbmVudC5uYXRpdmUpO1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7V2ViR0xSZW5kZXJlcn0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlT3B0aW9ucyA9IHt9LCByZW5kZXJlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubW9kdWxlT3B0aW9ucyA9IG1vZHVsZU9wdGlvbnM7XG4gICAgdGhpcy5yZW5kZXJlck9wdGlvbnMgPSByZW5kZXJlck9wdGlvbnM7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyLCBvblVwZGF0ZSwgd2Fybn0pIHtcbiAgICB3YXJuKCdzaXplJywgJ21hbmFnZXIuc2l6ZSBzaG91bGQgYmUgYW4gYXJyYXk6IFt3aWR0aCwgaGVpZ2h0XScpO1xuICAgIHdhcm4oJ2NhbWVyYScsICdtYW5hZ2VyLmNhbWVyYSBzaG91bGQgYmUgYSBXSFMuQ29tcG9uZW50LkNhbWVyYScpO1xuICAgIHdhcm4oJ3NjZW5lJywgJ21hbmFnZXIuc2NlbmUgc2hvdWxkIGJlIGEgVEhSRUUuU2NlbmUnKTtcbiAgICB3YXJuKCdjb250YWluZXInLCAnbWFuYWdlci5jb250YWluZXIgc2hvdWxkIGJlIGFuIEhUTUxFbGVtZW50Jyk7XG5cbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXIsXG4gICAgICBjYW1lcmEsXG4gICAgICBzY2VuZSxcbiAgICAgIHNpemUgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF1cbiAgICB9ID0gbWFuYWdlcjtcblxuICAgIGNvbnN0IHJlbmRlcmVyT3B0aW9ucyA9IHRoaXMucmVuZGVyZXJPcHRpb25zIHx8IHt9O1xuXG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLnJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIodGhpcy5wcmVwYXJlUmVuZGVyZXJPcHRpb25zKHJlbmRlcmVyT3B0aW9ucykpO1xuICAgIHJlbmRlcmVyLnNldFNpemUoc2l6ZVswXSwgc2l6ZVsxXSk7XG5cbiAgICBvblVwZGF0ZSgnc2l6ZScsICh2YWx1ZSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgbWFuYWdlci5yZW5kZXJGdW5jID0gKCkgPT4ge1xuICAgICAgbWFuYWdlci5yZW5kZXJlci5yZW5kZXIobWFuYWdlci5zY2VuZSwgbWFuYWdlci5jYW1lcmEubmF0aXZlKTtcbiAgICB9O1xuXG4gICAgbWFuYWdlci5yZW5kZXJMb29wID0gYXBwLmxvb3AoY2xvY2sgPT4ge1xuICAgICAgbWFuYWdlci5yZW5kZXJGdW5jKGNsb2NrKVxuICAgIH0pO1xuICB9XG5cbiAgcHJlcGFyZVJlbmRlcmVyT3B0aW9ucyhyZW5kZXJlck9wdGlvbnMpIHtcbiAgICBjb25zdCBxdWFsaXR5ID0gdGhpcy5tb2R1bGVPcHRpb25zLnF1YWxpdHkgfHwgJ21lZGl1bSc7XG5cbiAgICBzd2l0Y2ggKHF1YWxpdHkpIHtcbiAgICAgIGNhc2UgJ2hpZ2gnOlxuICAgICAgICByZW5kZXJlck9wdGlvbnMuYW50aWFsaWFzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyT3B0aW9ucztcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY29udHJvbHNTZXR1cCkge1xuICAgIHRoaXMuY29udHJvbHNTZXR1cCA9IGNvbnRyb2xzU2V0dXA7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIG1hbmFnZXIuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xzU2V0dXAobWFuYWdlcik7XG5cbiAgICBtYW5hZ2VyLmNvbnRyb2xzTG9vcCA9IGFwcC5sb29wKCgpID0+IHtcbiAgICAgIG1hbmFnZXIuY29udHJvbHMudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZXNpemVNb2R1bGUge1xuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBtYW5hZ2VyLnNpemUgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF07XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogTmFtZXNwYWNlIGNvbnRhaW5pbmcgYWxsIGNsYXNzZXMgZnJvbSBhbGwgbW9kdWxlcy4gVXNlZCBhcyBnbG9iYWwgaW4gVU1EIHBhdHRlcm4uXG4gKiBAbmFtZXNwYWNlIFdIU1xuICogQGV4YW1wbGUgPGNhcHRpb24+VGhlIHVzZSBvZiBXSFMgbmFtZXNwYWNlLjwvY2FwdGlvbj5cbiAqIG5ldyBXSFMuQXBwKCkgLy8gY29yZVxuICogbmV3IFdIUy5QZXJzcGVjdGl2ZUNhbWVyYSgpIC8vIGNvbXBvbmVudHNcbiAqIG5ldyBXSFMuUmVzaXplTW9kdWxlKCkgLy8gbW9kdWxlc1xuICogV0hTLmV4dGVuZCgpIC8vIHV0aWxzXG4gKi9cblxuaW1wb3J0IHtSRVZJU0lPTn0gZnJvbSAndGhyZWUnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgaHR0cHM6Ly90aHJlZWpzLm9yZy8nKTtcbn07XG5cbnRyeSB7XG4gIGlmICghUkVWSVNJT04pIHdhcm5EZXBzKCk7XG59IGNhdGNoIChlcnIpIHtcbiAgd2FybkRlcHMoKTtcbn1cblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL3V0aWxzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9pbmRleCc7XG5cbi8vIERFUFJFQ0FUSU9OXG4vLyBleHBvcnQgKiBmcm9tICcuL2RlcHJlY2F0aW9uJztcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJPcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093biIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiJFN5bWJvbCIsIlN5bWJvbCIsIml0ZXJhdG9yU3ltYm9sIiwiaXRlcmF0b3IiLCJhc3luY0l0ZXJhdG9yU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsInRvU3RyaW5nVGFnU3ltYm9sIiwidG9TdHJpbmdUYWciLCJydW50aW1lIiwicmVnZW5lcmF0b3JSdW50aW1lIiwibW9kdWxlIiwiaW5Nb2R1bGUiLCJleHBvcnRzIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIl9pbnZva2UiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJmbiIsIm9iaiIsImFyZyIsInR5cGUiLCJjYWxsIiwiZXJyIiwiR2VuU3RhdGVTdXNwZW5kZWRTdGFydCIsIkdlblN0YXRlU3VzcGVuZGVkWWllbGQiLCJHZW5TdGF0ZUV4ZWN1dGluZyIsIkdlblN0YXRlQ29tcGxldGVkIiwiQ29udGludWVTZW50aW5lbCIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJJdGVyYXRvclByb3RvdHlwZSIsImdldFByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJOYXRpdmVJdGVyYXRvclByb3RvdHlwZSIsInZhbHVlcyIsIkdwIiwiY29uc3RydWN0b3IiLCJkaXNwbGF5TmFtZSIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJtZXRob2QiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiZ2VuRnVuIiwiY3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsIl9fYXdhaXQiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlY29yZCIsInJlc3VsdCIsInZhbHVlIiwiUHJvbWlzZSIsInRoZW4iLCJ1bndyYXBwZWQiLCJlcnJvciIsInByZXZpb3VzUHJvbWlzZSIsImVucXVldWUiLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsImFzeW5jIiwiaXRlciIsIm5leHQiLCJkb25lIiwic3RhdGUiLCJFcnJvciIsImRvbmVSZXN1bHQiLCJkZWxlZ2F0ZSIsImRlbGVnYXRlUmVzdWx0IiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwicmV0dXJuIiwiVHlwZUVycm9yIiwiaW5mbyIsInJlc3VsdE5hbWUiLCJuZXh0TG9jIiwidG9TdHJpbmciLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImtleXMiLCJvYmplY3QiLCJrZXkiLCJyZXZlcnNlIiwibGVuZ3RoIiwicG9wIiwiaXRlcmFibGUiLCJpdGVyYXRvck1ldGhvZCIsImlzTmFOIiwiaSIsInNraXBUZW1wUmVzZXQiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicm9vdEVudHJ5Iiwicm9vdFJlY29yZCIsInJ2YWwiLCJleGNlcHRpb24iLCJoYW5kbGUiLCJsb2MiLCJjYXVnaHQiLCJoYXNDYXRjaCIsImhhc0ZpbmFsbHkiLCJmaW5hbGx5RW50cnkiLCJjb21wbGV0ZSIsImZpbmlzaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJGdW5jdGlvbiIsImciLCJoYWRSdW50aW1lIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImluZGV4T2YiLCJvbGRSdW50aW1lIiwicmVxdWlyZSIsImUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfdHlwZW9mMiIsIl90eXBlb2YiLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiUmVmZXJlbmNlRXJyb3IiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsImFzc2VydFRoaXNJbml0aWFsaXplZCIsIl9nZXRQcm90b3R5cGVPZiIsIm8iLCJfc2V0UHJvdG90eXBlT2YiLCJwIiwiX2luaGVyaXRzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiX2RlZmluZVByb3BlcnR5IiwiX29iamVjdFNwcmVhZCIsInNvdXJjZSIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJjb25jYXQiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJNb2R1bGVTeXN0ZW0iLCJvcHRpb25zIiwibW9kdWxlcyIsImRhdGEiLCJ1bnJlc29sdmVkV2FybnMiLCJNYXAiLCJ1cGRhdGVIYW5kbGVycyIsImFjdGl2ZU1vZHVsZSIsIm1hbmFnZXIiLCJQcm94eSIsInNldCIsInByb3AiLCJjYiIsImdldCIsIndhcm5zIiwiY29uc29sZSIsIndhcm4iLCJkZXBlbmRlbmN5IiwibWVzc2FnZSIsIm9uVXBkYXRlIiwicHJvcE5hbWUiLCJoYW5kbGVyIiwic3BsaWNlIiwic2V0dXBNb2R1bGVzIiwic2V0dXAiLCJicmlkZ2VOYW1lIiwiaW5wdXREYXRhIiwib3V0cHV0RGF0YSIsImJyaWRnZXMiLCJDb21wb25lbnQiLCJhc3luY09wdGlvbnMiLCJpc0FzeW5jIiwibmF0aXZlIiwiYnVpbGQiLCJjb21wb25lbnQiLCJzZWxmTmF0aXZlIiwiY2hpbGROYXRpdmUiLCJhZGQiLCJpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJSZWZsZWN0IiwiY29uc3RydWN0Iiwic2hhbSIsIkRhdGUiLCJfY29uc3RydWN0IiwiUGFyZW50IiwiQ2xhc3MiLCJhIiwiYmluZCIsInN5c3RlbSIsIndpbmRvdyIsIkRlZmluZU1vZHVsZSIsImFwcCIsInV0aWxzIiwiYXNzaWduIiwiTG9vcCIsImZ1bmMiLCJlbmFibGVkIiwiX2FycmF5V2l0aEhvbGVzIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiX3MiLCJfbm9uSXRlcmFibGVSZXN0IiwiX3NsaWNlZFRvQXJyYXkiLCJhcnJheVdpdGhIb2xlcyIsIml0ZXJhYmxlVG9BcnJheUxpbWl0Iiwibm9uSXRlcmFibGVSZXN0IiwiU3RvcmUiLCJsb2FkZXJzIiwicmVmcyIsInByb2Nlc3NvcnMiLCJhc3NldFR5cGUiLCJwcm9jZXNzb3IiLCJhc3NldE5hbWUiLCJ1cmwiLCJleGVjIiwibG9hZGVyIiwibG9hZCIsInJlZHVjZSIsIm5ld0RhdGEiLCJhc3luY0RhdGEiLCJvbkNvbXBsZXRlIiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJBcHAiLCJsb2ciLCJ2ZXJzaW9uIiwiQ2xvY2siLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FsbGJhY2siLCJzZXRUaW1lb3V0IiwicHJvY2VzcyIsInJlcXVlc3QiLCJsbCIsImxvb3BzIiwiY2xvY2siLCJsb29wQ2FsbGJhY2siLCJsb29wIiwiYXBwbHlMb2NhbFRyYW5zZm9ybSIsIm1hdGhUeXBlIiwiYXNzaWduRGF0YSIsImNvcHkiLCJ4IiwieSIsInoiLCJ3IiwiYXBwbHlUcmFuc2Zvcm0iLCJwb3NpdGlvbiIsInNjYWxlIiwicm90YXRpb24iLCJNZXNoQ29tcG9uZW50IiwiZ2VvbWV0cnkiLCJtYXRlcmlhbCIsIm1lc2giLCJicmlkZ2UiLCJNZXNoIiwiQ2FtZXJhQ29tcG9uZW50IiwiY2FtZXJhIiwid2lkdGgiLCJoZWlnaHQiLCJhc3BlY3QiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwiQ2FtZXJhIiwiTGlnaHRDb21wb25lbnQiLCJsaWdodCIsIkxpZ2h0IiwiVHJlZU1vZHVsZSIsInNjZW5lIiwiU2NlbmUiLCJSZW5kZXJpbmdNb2R1bGUiLCJtb2R1bGVPcHRpb25zIiwicmVuZGVyZXJPcHRpb25zIiwiY29udGFpbmVyIiwic2l6ZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlbmRlcmVyIiwiV2ViR0xSZW5kZXJlciIsInByZXBhcmVSZW5kZXJlck9wdGlvbnMiLCJzZXRTaXplIiwiYXBwZW5kQ2hpbGQiLCJkb21FbGVtZW50IiwicmVuZGVyRnVuYyIsInJlbmRlciIsInJlbmRlckxvb3AiLCJxdWFsaXR5IiwiYW50aWFsaWFzIiwiQ29udHJvbHNNb2R1bGUiLCJjb250cm9sc1NldHVwIiwiY29udHJvbHMiLCJjb250cm9sc0xvb3AiLCJ1cGRhdGUiLCJSZXNpemVNb2R1bGUiLCJhZGRFdmVudExpc3RlbmVyIiwid2FybkRlcHMiLCJSRVZJU0lPTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0NBQUE7Ozs7OztDQU9BLENBQUUsVUFBU0EsTUFBVCxFQUFpQjs7T0FHYkMsRUFBRSxHQUFHQyxNQUFNLENBQUNDLFNBQWhCO09BQ0lDLE1BQU0sR0FBR0gsRUFBRSxDQUFDSSxjQUFoQjtPQUNJQyxTQUFKLENBTGlCOztPQU1iQyxPQUFPLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixHQUErQkEsTUFBL0IsR0FBd0MsRUFBdEQ7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
