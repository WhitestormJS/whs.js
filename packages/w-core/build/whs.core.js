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
	        _this.modules = options.modules || [];

	        var native = _this.build(options);

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
	      app.scene = manager.scene = new three.Scene();

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

	      if (this.moduleOptions.clearColor) {
	        renderer.setClearColor(this.moduleOptions.clearColor);
	      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmNvcmUuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkLmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlU3lzdGVtLmpzIiwiLi4vc3JjL2NvcmUvQ29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY29uc3RydWN0LmpzIiwiLi4vc3JjL3BvbHlmaWxsLmpzIiwiLi4vc3JjL21vZHVsZXMvRGVmaW5lTW9kdWxlLmpzIiwiLi4vc3JjL2NvcmUvTG9vcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwiLi4vc3JjL2NvcmUvU3RvcmUuanMiLCIuLi9zcmMvY29yZS9BcHAuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy91dGlscy9hcHBseVRyYW5zZm9ybS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL01lc2guanMiLCIuLi9zcmMvY29tcG9uZW50cy9DYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9MaWdodC5qcyIsIi4uL3NyYy9tb2R1bGVzL1RyZWVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9SZW5kZXJpbmdNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgcnVudGltZS5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBJbiBzbG9wcHkgbW9kZSwgdW5ib3VuZCBgdGhpc2AgcmVmZXJzIHRvIHRoZSBnbG9iYWwgb2JqZWN0LCBmYWxsYmFjayB0b1xuICAvLyBGdW5jdGlvbiBjb25zdHJ1Y3RvciBpZiB3ZSdyZSBpbiBnbG9iYWwgc3RyaWN0IG1vZGUuIFRoYXQgaXMgc2FkbHkgYSBmb3JtXG4gIC8vIG9mIGluZGlyZWN0IGV2YWwgd2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kuXG4gIChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG4gIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpXG4pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbn0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkOyIsImV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5tb2R1bGVzID0gb3B0aW9ucy5tb2R1bGVzIHx8IFtdO1xuXG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGNvbnN0IHVucmVzb2x2ZWRXYXJucyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCB1cGRhdGVIYW5kbGVycyA9IHt9O1xuICAgIGxldCBhY3RpdmVNb2R1bGUgPSBudWxsO1xuXG4gICAgdGhpcy5tYW5hZ2VyID0gbmV3IFByb3h5KGRhdGEsIHtcbiAgICAgIHNldChvYmosIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIG9ialtwcm9wXSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3AsIHVwZGF0ZUhhbmRsZXJzW3Byb3BdKTtcbiAgICAgICAgaWYgKHVwZGF0ZUhhbmRsZXJzW3Byb3BdKSB7XG4gICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcF0uZm9yRWFjaChjYiA9PiBjYih2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuXG4gICAgICBnZXQob2JqLCBwcm9wKSB7XG4gICAgICAgIGlmIChwcm9wIGluIG9iaikge1xuICAgICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgd2FybnMgPSB1bnJlc29sdmVkV2FybnMuZ2V0KGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICBpZiAod2FybnMgJiYgd2FybnNbcHJvcF0pXG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2FybnNbcHJvcF0sIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICBpZiAoYWN0aXZlTW9kdWxlID09PSBudWxsKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gYWN0aXZlIG1vZHVsZScpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6ICcsIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1hbmFnZXIuJHtwcm9wfSBpcyByZXF1aXJlZCBieSB0aGUgYWN0aXZlIG1vZHVsZS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd2FybiA9IG1vZHVsZSA9PiAoZGVwZW5kZW5jeSwgbWVzc2FnZSkgPT4ge1xuICAgICAgdW5yZXNvbHZlZFdhcm5zLnNldChtb2R1bGUsIHtcbiAgICAgICAgLi4uKHVucmVzb2x2ZWRXYXJucy5nZXQobW9kdWxlKSB8fCB7fSksXG4gICAgICAgIFtkZXBlbmRlbmN5XTogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25VcGRhdGUgPSAocHJvcE5hbWUsIGhhbmRsZXIpID0+IHtcbiAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0pIHtcbiAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLnB1c2goaGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0gPSBbaGFuZGxlcl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0pIHtcbiAgICAgICAgICB1cGRhdGVIYW5kbGVyc1twcm9wTmFtZV0uc3BsaWNlKFxuICAgICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLmluZGV4T2YoaGFuZGxlciksXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnNldHVwTW9kdWxlcyA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1vZHVsZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIHRoaXMubW9kdWxlcykge1xuICAgICAgICBpZiAoJ3NldHVwJyBpbiBtb2R1bGUpIHtcbiAgICAgICAgICBhY3RpdmVNb2R1bGUgPSBtb2R1bGU7XG5cbiAgICAgICAgICBtb2R1bGUuc2V0dXAodGhpcywge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIG1hbmFnZXI6IHRoaXMubWFuYWdlcixcbiAgICAgICAgICAgIHdhcm46IHdhcm4obW9kdWxlKSxcbiAgICAgICAgICAgIG9uVXBkYXRlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWN0aXZlTW9kdWxlID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgYnJpZGdlKGJyaWRnZU5hbWUsIGlucHV0RGF0YSkge1xuICAgIGxldCBvdXRwdXREYXRhID0gaW5wdXREYXRhO1xuXG4gICAgZm9yIChjb25zdCBtb2R1bGUgb2YgdGhpcy5tb2R1bGVzKSB7XG4gICAgICBpZiAobW9kdWxlLmJyaWRnZXMgJiYgYnJpZGdlTmFtZSBpbiBtb2R1bGUuYnJpZGdlcykge1xuICAgICAgICBvdXRwdXREYXRhID0gbW9kdWxlLmJyaWRnZXNbYnJpZGdlTmFtZV0ob3V0cHV0RGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dERhdGE7XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICBpc0FzeW5jID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgYXN5bmNPcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgJiYgb3B0aW9ucygpO1xuXG4gICAgc3VwZXIoYXN5bmNPcHRpb25zID8ge21vZHVsZXM6IFtdfSA6IG9wdGlvbnMpO1xuXG4gICAgdGhpcy5pc0FzeW5jID0gYXN5bmNPcHRpb25zIGluc3RhbmNlb2YgUHJvbWlzZTtcblxuICAgIHRoaXMubmF0aXZlID0gdGhpcy5pc0FzeW5jID8gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBhc3luY09wdGlvbnMudGhlbihvcHRpb25zID0+IHtcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gb3B0aW9ucy5tb2R1bGVzIHx8IFtdO1xuICAgICAgICBjb25zdCBuYXRpdmUgPSB0aGlzLmJ1aWxkKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldHVwTW9kdWxlcygpO1xuICAgICAgICByZXNvbHZlKG5hdGl2ZSk7XG4gICAgICB9KTtcbiAgICB9KSA6IHRoaXMuYnVpbGQodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zKCkgOiBvcHRpb25zKTtcblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzKCk7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICBjb25zb2xlLmVycm9yKCdZb3Ugc2hvdWxkIHVzZSB5b3VyIG93biAuYnVpbGQoKScpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXN5bmMgYWRkKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IHNlbGZOYXRpdmUgPSB0aGlzLmlzQXN5bmMgPyBhd2FpdCB0aGlzLm5hdGl2ZSA6IHRoaXMubmF0aXZlO1xuICAgIGNvbnN0IGNoaWxkTmF0aXZlID0gY29tcG9uZW50LmlzQXN5bmMgPyBhd2FpdCBjb21wb25lbnQubmF0aXZlIDogY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgIHNlbGZOYXRpdmUuYWRkKGNoaWxkTmF0aXZlKTtcbiAgfVxufVxuIiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuXG4gIHRyeSB7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgaWYgKGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgIGEucHVzaC5hcHBseShhLCBhcmdzKTtcbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgaWYgKENsYXNzKSBzZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0OyIsImV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG4iLCJleHBvcnQgY2xhc3MgRGVmaW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoLi4uZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzZXR1cChhcHAsIHV0aWxzKSB7XG4gICAgdGhpcy5kYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICBPYmplY3QuYXNzaWduKHV0aWxzLm1hbmFnZXIsIHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nID8gZGF0YSh1dGlscykgOiBkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJleHBvcnQgY2xhc3MgU3RvcmUge1xuICBzdGF0aWMgYXN5bmNMb2FkZXIgPSB7XG4gICAgbG9hZChhc3luY0RhdGEsIG9uQ29tcGxldGUsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IpIHtcbiAgICAgIGFzeW5jRGF0YSgpLnRoZW4ob25Db21wbGV0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGxvYWRlcnMpIHtcbiAgICB0aGlzLmxvYWRlcnMgPSBsb2FkZXJzO1xuICAgIHRoaXMucmVmcyA9IHt9O1xuICAgIHRoaXMucHJvY2Vzc29ycyA9IHt9O1xuICB9XG5cbiAgcHJvY2Vzcyhhc3NldFR5cGUsIHByb2Nlc3Nvcikge1xuICAgIGlmICh0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSkge1xuICAgICAgdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0ucHVzaChwcm9jZXNzb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSA9IFtwcm9jZXNzb3JdO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoYXNzZXROYW1lLCB1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IFssIGFzc2V0VHlwZV0gPSAvKC4qKVxcLi8uZXhlYyhhc3NldE5hbWUpO1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMubG9hZGVyc1thc3NldFR5cGVdO1xuICAgIGNvbnN0IHByb2Nlc3NvcnMgPSB0aGlzLnByb2Nlc3NvcnNbYXNzZXRUeXBlXSB8fCBbXTtcblxuICAgIHRoaXMucmVmc1thc3NldE5hbWVdID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbG9hZGVyLmxvYWQoXG4gICAgICAgIHVybCxcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgcHJvY2Vzc29ycy5yZWR1Y2UoXG4gICAgICAgICAgICAgIChuZXdEYXRhLCBwcm9jZXNzb3IpID0+IHByb2Nlc3NvcihuZXdEYXRhLCBvcHRpb25zLCBhc3NldE5hbWUpLFxuICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZWZzW2Fzc2V0TmFtZV07XG4gIH1cblxuICByZWYoYXNzZXROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucmVmc1thc3NldE5hbWVdO1xuICB9XG59XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi9wb2x5ZmlsbCc7XG5pbXBvcnQge0RlZmluZU1vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy9EZWZpbmVNb2R1bGUnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TG9vcH0gZnJvbSAnLi9Mb29wJztcbmltcG9ydCB7U3RvcmV9IGZyb20gJy4vU3RvcmUnO1xuXG4vKipcbiAqIEBjbGFzcyBBcHBcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBwcmVwYXJlIGEgd29ybGQgc2NlbmUsIHNldHVwIHBoeXNpY3MsIGNhbWVyYSwgcmVuZGVyZXIgYW5kIGFsbCBvdGhlciB0aGluZ3MgdGhhdCB5b3UgdXN1YWxseSBkbyBiZWZvcmUgbWFraW5nIG1lc2hlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFttb2R1bGVzPVtdXSAtIEFycmF5IG9mIE1vZHVsZXNcbiAqIEBleHRlbmRzIE1vZHVsZVN5c3RlbVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIHN0YXRpYyBTdG9yZSA9IFN0b3JlO1xuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI2VuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZW5hYmxlZCA9IHRydWU7XG4gIGNsb2NrID0gbmV3IENsb2NrKCk7XG5cbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIHN0YXRpYyBkZWZpbmUgPSAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiBuZXcgRGVmaW5lTW9kdWxlKC4uLmFyZ3MpO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcbiAgICBzdXBlcih7bW9kdWxlc30pO1xuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcHJvY2VzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RBbmltRnJhbWUoKCkgPT4gcHJvY2VzcygpKTtcbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IHRoaXMubG9vcHMubGVuZ3RoOyBpIDwgbGw7IGkrKykge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5sb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5mdW5jKHRoaXMuY2xvY2spO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLnJlcXVlc3QpXG4gICAgICBwcm9jZXNzKCk7XG4gIH1cblxuICBsb29wKGxvb3BDYWxsYmFjaykge1xuICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChsb29wQ2FsbGJhY2spO1xuICAgIHRoaXMubG9vcHMucHVzaChsb29wKTtcblxuICAgIHJldHVybiBsb29wO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG4iLCJmdW5jdGlvbiBhcHBseUxvY2FsVHJhbnNmb3JtKG1hdGhUeXBlLCBkYXRhKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuO1xuXG4gIGxldCBhc3NpZ25EYXRhID0ge307XG5cbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobWF0aFR5cGUpLmNvbnN0cnVjdG9yKSB7IC8vIFRIUkVFLlZlY3RvcjMgPT09IFRIUkVFLlZlY3RvcjNcbiAgICBtYXRoVHlwZS5jb3B5KGRhdGEpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgYXNzaWduRGF0YSA9IHtcbiAgICAgIHg6IGRhdGFbMF0sXG4gICAgICB5OiBkYXRhWzFdLFxuICAgICAgejogZGF0YVsyXSxcbiAgICAgIHc6IGRhdGFbM11cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGFzc2lnbkRhdGEgPSB7XG4gICAgICB4OiBkYXRhLngsXG4gICAgICB5OiBkYXRhLnksXG4gICAgICB6OiBkYXRhLnosXG4gICAgICB3OiBkYXRhLndcbiAgICB9O1xuICB9XG5cbiAgaWYgKG1hdGhUeXBlLncgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlbGV0ZSBhc3NpZ25EYXRhLnc7XG4gIH1cblxuICBPYmplY3QuYXNzaWduKG1hdGhUeXBlLCBhc3NpZ25EYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKG5hdGl2ZSwgb3B0aW9ucykge1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5wb3NpdGlvbiwgb3B0aW9ucy5wb3NpdGlvbik7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnNjYWxlLCBvcHRpb25zLnNjYWxlKTtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUucm90YXRpb24sIG9wdGlvbnMucm90YXRpb24pO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvQ29tcG9uZW50JztcbmltcG9ydCB7YXBwbHlUcmFuc2Zvcm19IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG9wdGlvbnMuZ2VvbWV0cnk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBvcHRpb25zLm1hdGVyaWFsO1xuXG4gICAgY29uc3QgbWVzaCA9IHRoaXMuYnJpZGdlKCdtZXNoJywgbmV3IE1lc2goXG4gICAgICBnZW9tZXRyeSA/IHRoaXMuYnJpZGdlKCdnZW9tZXRyeScsIGdlb21ldHJ5KSA6IHVuZGVmaW5lZCxcbiAgICAgIG1hdGVyaWFsID8gdGhpcy5icmlkZ2UoJ21hdGVyaWFsJywgbWF0ZXJpYWwpIDogdW5kZWZpbmVkXG4gICAgKSk7XG5cbiAgICBhcHBseVRyYW5zZm9ybShtZXNoLCBvcHRpb25zKTtcblxuICAgIHJldHVybiBtZXNoO1xuICB9XG59XG5cbkNvbXBvbmVudC5NZXNoID0gTWVzaENvbXBvbmVudDtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgY2FtZXJhID0gb3B0aW9ucy5jYW1lcmE7XG5cbiAgICBhcHBseVRyYW5zZm9ybShjYW1lcmEsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuYnJpZGdlKCdjYW1lcmEnLCBjYW1lcmEpO1xuICB9XG5cbiAgYXV0b1NpemVVcGRhdGUob25VcGRhdGUpIHtcbiAgICBvblVwZGF0ZSgnc2l6ZScsIChbd2lkdGgsIGhlaWdodF0pID0+IHtcbiAgICAgIHRoaXMubmF0aXZlLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgdGhpcy5uYXRpdmUudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQ29tcG9uZW50LkNhbWVyYSA9IENhbWVyYUNvbXBvbmVudDtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBMaWdodENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBsaWdodCA9IG9wdGlvbnMubGlnaHQ7XG5cbiAgICBhcHBseVRyYW5zZm9ybShsaWdodCwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5icmlkZ2UoJ2xpZ2h0JywgbGlnaHQpO1xuICB9XG59XG5cbkNvbXBvbmVudC5MaWdodCA9IExpZ2h0Q29tcG9uZW50O1xuIiwiaW1wb3J0IHtTY2VuZX0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7XG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgYXBwLnNjZW5lID0gbWFuYWdlci5zY2VuZSA9IG5ldyBTY2VuZSgpO1xuXG4gICAgYXBwLmFkZCA9IGFzeW5jIChjb21wb25lbnQpID0+IHtcbiAgICAgIGNvbXBvbmVudCA9IGFwcC5icmlkZ2UoJ2NoaWxkJywgY29tcG9uZW50KTtcbiAgICAgIG1hbmFnZXIuc2NlbmUuYWRkKGNvbXBvbmVudC5pc0FzeW5jID8gYXdhaXQgY29tcG9uZW50Lm5hdGl2ZSA6IGNvbXBvbmVudC5uYXRpdmUpO1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7V2ViR0xSZW5kZXJlcn0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlT3B0aW9ucyA9IHt9LCByZW5kZXJlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubW9kdWxlT3B0aW9ucyA9IG1vZHVsZU9wdGlvbnM7XG4gICAgdGhpcy5yZW5kZXJlck9wdGlvbnMgPSByZW5kZXJlck9wdGlvbnM7XG4gIH1cblxuICBzZXR1cChhcHAsIHttYW5hZ2VyLCBvblVwZGF0ZSwgd2Fybn0pIHtcbiAgICB3YXJuKCdzaXplJywgJ21hbmFnZXIuc2l6ZSBzaG91bGQgYmUgYW4gYXJyYXk6IFt3aWR0aCwgaGVpZ2h0XScpO1xuICAgIHdhcm4oJ2NhbWVyYScsICdtYW5hZ2VyLmNhbWVyYSBzaG91bGQgYmUgYSBXSFMuQ29tcG9uZW50LkNhbWVyYScpO1xuICAgIHdhcm4oJ3NjZW5lJywgJ21hbmFnZXIuc2NlbmUgc2hvdWxkIGJlIGEgVEhSRUUuU2NlbmUnKTtcbiAgICB3YXJuKCdjb250YWluZXInLCAnbWFuYWdlci5jb250YWluZXIgc2hvdWxkIGJlIGFuIEhUTUxFbGVtZW50Jyk7XG5cbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXIsXG4gICAgICBjYW1lcmEsXG4gICAgICBzY2VuZSxcbiAgICAgIHNpemUgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF1cbiAgICB9ID0gbWFuYWdlcjtcblxuICAgIGNvbnN0IHJlbmRlcmVyT3B0aW9ucyA9IHRoaXMucmVuZGVyZXJPcHRpb25zIHx8IHt9O1xuXG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLnJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIodGhpcy5wcmVwYXJlUmVuZGVyZXJPcHRpb25zKHJlbmRlcmVyT3B0aW9ucykpO1xuICAgIHJlbmRlcmVyLnNldFNpemUoc2l6ZVswXSwgc2l6ZVsxXSk7XG5cbiAgICBpZiAodGhpcy5tb2R1bGVPcHRpb25zLmNsZWFyQ29sb3IpIHtcbiAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IodGhpcy5tb2R1bGVPcHRpb25zLmNsZWFyQ29sb3IpO1xuICAgIH1cblxuICAgIG9uVXBkYXRlKCdzaXplJywgKHZhbHVlKSA9PiB7XG4gICAgICByZW5kZXJlci5zZXRTaXplKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICBtYW5hZ2VyLnJlbmRlckZ1bmMgPSAoKSA9PiB7XG4gICAgICBtYW5hZ2VyLnJlbmRlcmVyLnJlbmRlcihtYW5hZ2VyLnNjZW5lLCBtYW5hZ2VyLmNhbWVyYS5uYXRpdmUpO1xuICAgIH07XG5cbiAgICBtYW5hZ2VyLnJlbmRlckxvb3AgPSBhcHAubG9vcChjbG9jayA9PiB7XG4gICAgICBtYW5hZ2VyLnJlbmRlckZ1bmMoY2xvY2spXG4gICAgfSk7XG4gIH1cblxuICBwcmVwYXJlUmVuZGVyZXJPcHRpb25zKHJlbmRlcmVyT3B0aW9ucykge1xuICAgIGNvbnN0IHF1YWxpdHkgPSB0aGlzLm1vZHVsZU9wdGlvbnMucXVhbGl0eSB8fCAnbWVkaXVtJztcblxuICAgIHN3aXRjaCAocXVhbGl0eSkge1xuICAgICAgY2FzZSAnaGlnaCc6XG4gICAgICAgIHJlbmRlcmVyT3B0aW9ucy5hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG5cbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXJPcHRpb25zO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihjb250cm9sc1NldHVwKSB7XG4gICAgdGhpcy5jb250cm9sc1NldHVwID0gY29udHJvbHNTZXR1cDtcbiAgfVxuXG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgbWFuYWdlci5jb250cm9scyA9IHRoaXMuY29udHJvbHNTZXR1cChtYW5hZ2VyKTtcblxuICAgIG1hbmFnZXIuY29udHJvbHNMb29wID0gYXBwLmxvb3AoKCkgPT4ge1xuICAgICAgbWFuYWdlci5jb250cm9scy51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFJlc2l6ZU1vZHVsZSB7XG4gIHNldHVwKGFwcCwge21hbmFnZXJ9KSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIG1hbmFnZXIuc2l6ZSA9IFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBOYW1lc3BhY2UgY29udGFpbmluZyBhbGwgY2xhc3NlcyBmcm9tIGFsbCBtb2R1bGVzLiBVc2VkIGFzIGdsb2JhbCBpbiBVTUQgcGF0dGVybi5cbiAqIEBuYW1lc3BhY2UgV0hTXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgdXNlIG9mIFdIUyBuYW1lc3BhY2UuPC9jYXB0aW9uPlxuICogbmV3IFdIUy5BcHAoKSAvLyBjb3JlXG4gKiBuZXcgV0hTLlBlcnNwZWN0aXZlQ2FtZXJhKCkgLy8gY29tcG9uZW50c1xuICogbmV3IFdIUy5SZXNpemVNb2R1bGUoKSAvLyBtb2R1bGVzXG4gKiBXSFMuZXh0ZW5kKCkgLy8gdXRpbHNcbiAqL1xuXG5pbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5cbi8vIENoZWNrIGZvciBUaHJlZS5qc1xuY29uc3Qgd2FybkRlcHMgPSAoKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcignV2hpdGVzdG9ybUpTIEZyYW1ld29yayByZXF1aXJlcyBUaHJlZS5qcyBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vdXRpbHMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2luZGV4JztcblxuLy8gREVQUkVDQVRJT05cbi8vIGV4cG9ydCAqIGZyb20gJy4vZGVwcmVjYXRpb24nO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCIkU3ltYm9sIiwiU3ltYm9sIiwiaXRlcmF0b3JTeW1ib2wiLCJpdGVyYXRvciIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInJ1bnRpbWUiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJtb2R1bGUiLCJpbk1vZHVsZSIsImV4cG9ydHMiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwib2JqIiwiYXJnIiwidHlwZSIsImNhbGwiLCJlcnIiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiX19hd2FpdCIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwicmVzdWx0IiwidmFsdWUiLCJQcm9taXNlIiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiZW5xdWV1ZSIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiYXN5bmMiLCJpdGVyIiwibmV4dCIsImRvbmUiLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJyZXR1cm4iLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJ0b1N0cmluZyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0Iiwia2V5cyIsIm9iamVjdCIsImtleSIsInJldmVyc2UiLCJsZW5ndGgiLCJwb3AiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXNOYU4iLCJpIiwic2tpcFRlbXBSZXNldCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJyb290RW50cnkiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsIkZ1bmN0aW9uIiwiZyIsImhhZFJ1bnRpbWUiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiaW5kZXhPZiIsIm9sZFJ1bnRpbWUiLCJyZXF1aXJlIiwiZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsIl9uZXh0IiwiX3Rocm93IiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmdzIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl90eXBlb2YyIiwiX3R5cGVvZiIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJSZWZlcmVuY2VFcnJvciIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiX2dldFByb3RvdHlwZU9mIiwibyIsIl9zZXRQcm90b3R5cGVPZiIsInAiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJfZGVmaW5lUHJvcGVydHkiLCJfb2JqZWN0U3ByZWFkIiwic291cmNlIiwib3duS2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImNvbmNhdCIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIk1vZHVsZVN5c3RlbSIsIm9wdGlvbnMiLCJtb2R1bGVzIiwiZGF0YSIsInVucmVzb2x2ZWRXYXJucyIsIk1hcCIsInVwZGF0ZUhhbmRsZXJzIiwiYWN0aXZlTW9kdWxlIiwibWFuYWdlciIsIlByb3h5Iiwic2V0IiwicHJvcCIsImNiIiwiZ2V0Iiwid2FybnMiLCJjb25zb2xlIiwid2FybiIsImRlcGVuZGVuY3kiLCJtZXNzYWdlIiwib25VcGRhdGUiLCJwcm9wTmFtZSIsImhhbmRsZXIiLCJzcGxpY2UiLCJzZXR1cE1vZHVsZXMiLCJzZXR1cCIsImJyaWRnZU5hbWUiLCJpbnB1dERhdGEiLCJvdXRwdXREYXRhIiwiYnJpZGdlcyIsIkNvbXBvbmVudCIsImFzeW5jT3B0aW9ucyIsImlzQXN5bmMiLCJuYXRpdmUiLCJidWlsZCIsImNvbXBvbmVudCIsInNlbGZOYXRpdmUiLCJjaGlsZE5hdGl2ZSIsImFkZCIsImlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJzaGFtIiwiRGF0ZSIsIl9jb25zdHJ1Y3QiLCJQYXJlbnQiLCJDbGFzcyIsImEiLCJiaW5kIiwic3lzdGVtIiwid2luZG93IiwiRGVmaW5lTW9kdWxlIiwiYXBwIiwidXRpbHMiLCJhc3NpZ24iLCJMb29wIiwiZnVuYyIsImVuYWJsZWQiLCJfYXJyYXlXaXRoSG9sZXMiLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJfcyIsIl9ub25JdGVyYWJsZVJlc3QiLCJfc2xpY2VkVG9BcnJheSIsImFycmF5V2l0aEhvbGVzIiwiaXRlcmFibGVUb0FycmF5TGltaXQiLCJub25JdGVyYWJsZVJlc3QiLCJTdG9yZSIsImxvYWRlcnMiLCJyZWZzIiwicHJvY2Vzc29ycyIsImFzc2V0VHlwZSIsInByb2Nlc3NvciIsImFzc2V0TmFtZSIsInVybCIsImV4ZWMiLCJsb2FkZXIiLCJsb2FkIiwicmVkdWNlIiwibmV3RGF0YSIsImFzeW5jRGF0YSIsIm9uQ29tcGxldGUiLCJvblByb2dyZXNzIiwib25FcnJvciIsIkFwcCIsImxvZyIsInZlcnNpb24iLCJDbG9jayIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJwcm9jZXNzIiwicmVxdWVzdCIsImxsIiwibG9vcHMiLCJjbG9jayIsImxvb3BDYWxsYmFjayIsImxvb3AiLCJhcHBseUxvY2FsVHJhbnNmb3JtIiwibWF0aFR5cGUiLCJhc3NpZ25EYXRhIiwiY29weSIsIngiLCJ5IiwieiIsInciLCJhcHBseVRyYW5zZm9ybSIsInBvc2l0aW9uIiwic2NhbGUiLCJyb3RhdGlvbiIsIk1lc2hDb21wb25lbnQiLCJnZW9tZXRyeSIsIm1hdGVyaWFsIiwibWVzaCIsImJyaWRnZSIsIk1lc2giLCJDYW1lcmFDb21wb25lbnQiLCJjYW1lcmEiLCJ3aWR0aCIsImhlaWdodCIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJDYW1lcmEiLCJMaWdodENvbXBvbmVudCIsImxpZ2h0IiwiTGlnaHQiLCJUcmVlTW9kdWxlIiwic2NlbmUiLCJTY2VuZSIsIlJlbmRlcmluZ01vZHVsZSIsIm1vZHVsZU9wdGlvbnMiLCJyZW5kZXJlck9wdGlvbnMiLCJjb250YWluZXIiLCJzaXplIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwicmVuZGVyZXIiLCJXZWJHTFJlbmRlcmVyIiwicHJlcGFyZVJlbmRlcmVyT3B0aW9ucyIsInNldFNpemUiLCJjbGVhckNvbG9yIiwic2V0Q2xlYXJDb2xvciIsImFwcGVuZENoaWxkIiwiZG9tRWxlbWVudCIsInJlbmRlckZ1bmMiLCJyZW5kZXIiLCJyZW5kZXJMb29wIiwicXVhbGl0eSIsImFudGlhbGlhcyIsIkNvbnRyb2xzTW9kdWxlIiwiY29udHJvbHNTZXR1cCIsImNvbnRyb2xzIiwiY29udHJvbHNMb29wIiwidXBkYXRlIiwiUmVzaXplTW9kdWxlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndhcm5EZXBzIiwiUkVWSVNJT04iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztDQUFBOzs7Ozs7Q0FPQSxDQUFFLFVBQVNBLE1BQVQsRUFB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
