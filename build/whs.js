/* WhitestormJS Framework v2.0.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(factory((global.WHS = global.WHS || {}),global.THREE));
}(this, (function (exports,three) { 'use strict';

var extend = function extend(object) {
  for (var _len = arguments.length, extensions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extensions[_key - 1] = arguments[_key];
  }

  // $.extend alternative, ... is the spread operator.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var extension = _step.value;

      // console.log(extension);
      // console.log(typeof extension);

      if (!extension) continue; // Ignore null and undefined objects and parameters.

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.getOwnPropertyNames(extension)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;
          // Do not traverse the prototype chain.
          if (object[prop] !== undefined && extension[prop] && object[prop].toString() === '[object Object]' && extension[prop].toString() === '[object Object]') {
            // Goes deep only if object[prop] and extension[prop] are both objects !
            if (extension[prop].constructor === Object) extend(object[prop], extension[prop]);else object[prop] = extension[prop];
          } else object[prop] = typeof object[prop] === 'undefined' ? extension[prop] : object[prop];

          if (typeof object[prop] === 'undefined' && Array.isArray(extension[prop])) object[prop] = extension[prop].slice(); // Add values that do not already exist.
          else if (typeof object[prop] === 'undefined' && Array.isArray(extension[prop])) object[prop] = extension[prop];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return object;
};

var instruct = function instruct(array, instArray) {
  var tempObject = {};

  for (var i = 0, max = instArray.length; i < max; i++) {
    var guide = instArray[i];

    tempObject[guide] = array[i];
  }

  return tempObject;
};

var transformData = function transformData(object, instructions) {
  for (var key in instructions) {
    if (Array.isArray(object[key])) object[key] = instruct(object[key], instructions[key]);else if (object[key] instanceof Object && !Array.isArray(instructions[key])) object[key] = transformData(object[key], instructions[key]);
  }

  return object;
};

var toArray = function toArray(object, instruction) {
  var tempArray = [];

  for (var i = 0, max = instruction.length; i < max; i++) {
    var guide = instruction[i];

    tempArray[i] = object[guide];
  }

  return tempArray;
};

var minivents_commonjs = function Events(target){
  var events = {}, empty = [];
  target = target || this;
  /**
   *  On: listen to events
   */
  target.on = function(type, func, ctx){
    (events[type] = events[type] || []).push([func, ctx]);
  };
  /**
   *  Off: stop listening to event / specific callback
   */
  target.off = function(type, func){
    type || (events = {});
    var list = events[type] || empty,
        i = list.length = func ? list.length : 0;
    while(i--) func == list[i][0] && list.splice(i,1);
  };
  /** 
   * Emit: send event, callbacks will be triggered
   */
  target.emit = function(type){
    var e = events[type] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i=0, j;
    while(j=list[i++]) j[0].apply(j[1], empty.slice.call(arguments, 1));
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
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
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var CompositionError = function (_Error) {
  inherits(CompositionError, _Error);

  function CompositionError(classInstance, message, component) {
    classCallCheck(this, CompositionError);

    var _this = possibleConstructorReturn(this, (CompositionError.__proto__ || Object.getPrototypeOf(CompositionError)).call(this, '@' + classInstance + ': ' + message));

    var stackArray = _this.stack.split('\n');
    stackArray.splice(1, 2);

    _this.stack = stackArray.join('\n');

    if (console) console.error('Component:', component);

    _this.name = 'CompositionError';
    return _this;
  }

  return CompositionError;
}(Error);

var DependencyError = function (_Error2) {
  inherits(DependencyError, _Error2);

  function DependencyError(classInstance, message, activeModule) {
    var dependencyModule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    classCallCheck(this, DependencyError);

    var _this2 = possibleConstructorReturn(this, (DependencyError.__proto__ || Object.getPrototypeOf(DependencyError)).call(this, '@' + classInstance + ': ' + message));

    var stackArray = _this2.stack.split('\n');
    stackArray.splice(1, 2);

    _this2.stack = stackArray.join('\n');

    if (console) console.error('Active module:', activeModule);
    if (console && dependencyModule) console.error('Dependency published by module:', dependencyModule);

    _this2.name = 'DependencyError';
    return _this2;
  }

  return DependencyError;
}(Error);

var ManagerError = function (_Error3) {
  inherits(ManagerError, _Error3);

  function ManagerError(classInstance, message, component) {
    var activeModule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    classCallCheck(this, ManagerError);

    var _this3 = possibleConstructorReturn(this, (ManagerError.__proto__ || Object.getPrototypeOf(ManagerError)).call(this, '@' + classInstance + ': ' + message));

    var stackArray = _this3.stack.split('\n');
    stackArray.splice(1, 2);

    _this3.stack = stackArray.join('\n');

    if (console) console.error('Component:', dependencyModule);
    if (console && activeModule) console.error('Active module:', activeModule);

    _this3.name = 'ManagerError';
    return _this3;
  }

  return ManagerError;
}(Error);

var warnDeps = function warnDeps() {
  throw new Error('WhitestormJS Framework requires Three.js r84. https://threejs.org/');
};

try {
  if (!three.REVISION) warnDeps();
} catch (err) {
  warnDeps();
}

/**
 * @class ModuleSystem
 * @category core
 * @description  Provides API for classes that will use Modules.<br/>
 * This class includes basic event system with those supported methods:
 * <pre>.on()</pre><pre>.off()</pre><pre>.emit()</pre>
 * @extends Events
 * @memberof module:core
 */

var ModuleSystem = function (_Events) {
  inherits(ModuleSystem, _Events);

  function ModuleSystem() {
    classCallCheck(this, ModuleSystem);
    return possibleConstructorReturn(this, (ModuleSystem.__proto__ || Object.getPrototypeOf(ModuleSystem)).apply(this, arguments));
  }

  createClass(ModuleSystem, [{
    key: 'integrateModules',

    // INTEGRATING

    /**
     * @method integrateModules
     * @instance
     * @description This method applies all modules from .modules collection.
     * @param {Object} [source] If source (should be a component) is provided, will replace .modules with source's one before executing modules.
     * @memberof module:core.ModuleSystem
     */
    value: function integrateModules(source) {
      if (!this.modules) return;
      if (source) this.modules = source.modules.slice(0);

      for (var i = 0, max = this.modules.length; i < max; i++) {
        this.applyModule(this.modules[i], false);
      }if (source) this.applyBridge({ onCopy: source });
    }

    // APPLYING MODULE (...and a "bridge" for module)

    /**
     * @method applyBridge
     * @instance
     * @description Makes component-specific API to work with modules.
     * @param {Object} bridgeMap
     * @return {Object} Returns object with modified values.
     * @memberof module:core.ModuleSystem
     */

  }, {
    key: 'applyBridge',
    value: function applyBridge() {
      var bridgeMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var modules = this.modules;
      if (!modules) return bridgeMap;

      for (var i = 0, max = modules.length; i < max; i++) {
        for (var key in bridgeMap) {
          if (bridgeMap[key]) {
            var module = modules[i];

            if (module && module.bridge && module.bridge[key]) bridgeMap[key] = module.bridge[key].apply(this, [bridgeMap[key], module]);
          }
        }
      }

      return bridgeMap;
    }

    /**
     * @method applyModule
     * @instance
     * @description .applyModule is also used in .integrateModules() function.
     * It does exactly what its name says (applies module to component or app).
     * @param {Object} module the module to apply
     * @param {Boolean} [push=true]
     * @return {Object} Returns module that was applied.
     * @throws {ManagerError}
     * @memberof module:core.ModuleSystem
     */

  }, {
    key: 'applyModule',
    value: function applyModule(module) {
      var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!module) return;
      if (push && this.modules) this.modules.push(module);else if (push) this.modules = [module];

      if (this.manager) this.manager.active(module);

      if (module.manager && this.manager) module.manager(this.manager);else if (module.manager) {
        throw new ManagerError('Component', 'Module requires ModuleManager that is turned off for this component', this, module);
      }

      if (module.integrate) module.integrate.bind(this)(module);

      return module;
    }

    /**
     * @method disposeModules
     * @instance
     * @description Disposes of all modules
     * @memberof module:core.ModuleSystem
     */

  }, {
    key: 'disposeModules',
    value: function disposeModules() {
      while (this.modules.length) {
        this.disposeModule(this.modules[0]);
      }
    }

    /**
     * @method disposeModule
     * @instance
     * @description Disposes of the given module
     * @param {Object} module the module to dispose
     * @return {Module} Returns module that was removed.
     * @memberof module:core.ModuleSystem
     */

  }, {
    key: 'disposeModule',
    value: function disposeModule(module) {
      if (!module) return;

      this.modules.splice(this.modules.indexOf(module), 1);

      if (module.dispose) module.dispose.bind(this)(module);

      return module;
    }

    // PIPED METHOD

    /**
     * @method module
     * @instance
     * @description piped version of .applyModule().
     * @param {Object} module the module to apply
     * @return {this} returns this - app/component
     * @throws {ManagerError}
     * @memberof module:core.ModuleSystem
     * @example <caption>Piped modules</caption>
     * component
     *   .module(new Module1())
     *   .module(new Module2())
     *   .module(new Module3())
     */

  }, {
    key: 'module',
    value: function module(_module) {
      this.applyModule(_module);
      return this;
    }
  }]);
  return ModuleSystem;
}(minivents_commonjs);

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

var Symbol$1 = root.Symbol;

var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */
var root$2;

if (typeof self !== 'undefined') {
  root$2 = self;
} else if (typeof window !== 'undefined') {
  root$2 = window;
} else if (typeof global !== 'undefined') {
  root$2 = global;
} else if (typeof module !== 'undefined') {
  root$2 = module;
} else {
  root$2 = Function('return this')();
}

var result = symbolObservablePonyfill(root$2);

var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

var ModuleManager = function () {
  function ModuleManager(object) {
    classCallCheck(this, ModuleManager);

    this.handler = object;
    this.currentModule = null;

    this.store = createStore(function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}, ''];
      var action = arguments[1];

      state[0][action.key] = action.data;
      state[1] = action.key;

      return state;
    });

    this.modules = {};
  }

  /**
   * @method active
   * @instance
   * @description Sets .currentModule to provided module.
   * @param {Object} module the module to make current
   * @memberof module:core.ModuleManager
   */


  createClass(ModuleManager, [{
    key: 'active',
    value: function active(module) {
      this.currentModule = module;
    }

    /**
     * @method reset
     * @instance
     * @description Set's .currentModule to null.
     * @memberof module:core.ModuleManager
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.currentModule = null;
    }

    /**
     * @method define
     * @instance
     * @description Define the module in manager
     * @param name The module name
     * @memberof module:core.ModuleManager
     */

  }, {
    key: 'define',
    value: function define(name) {
      this.modules[name] = this.currentModule;
    }

    /**
     * @method use
     * @instance
     * @description Get the defined module from manager
     * @param name The module name
     * @memberof module:core.ModuleManager
     */

  }, {
    key: 'use',
    value: function use(name) {
      return this.modules[name];
    }

    /**
     * @method set
     * @instance
     * @description An alias for .add() <br/><br/>
     * Use this method if you know that you will overwrite existing dependency.<br/>
     * Use it in your app, but not in module that you provide to other people.
     * @param {String} key the key of the dependency
     * @param {Object} data the value of the dependency
     * @memberof module:core.ModuleManager
     */

  }, {
    key: 'set',
    value: function set$$1(key, data) {
      this.store.dispatch({
        type: 'ADD',
        key: key,
        data: data
      });
    }

    /**
     * @method get
     * @instance
     * @description Returns dependency in store object, by key.
     * @param {String} key the key of the dependency
     * @memberof module:core.ModuleManager
     * @return {Object|Module}
     * @throws {DependencyError} if dependency is not in the store
     * @example <caption>Get the 'hello' dependency</caption>
     * manager.get('hello'); // -> {world: true}
     */

  }, {
    key: 'get',
    value: function get$$1(key) {
      if (!this.store.getState()[0][key]) {
        throw new DependencyError('ModuleManager', 'Module requires \'' + key + '\' dependency', this.currentModule);
      }

      return this.store.getState()[0][key];
    }

    /**
     * @method has
     * @instance
     * @description Returns whether manager has a dependency with the given key
     * @param {String} key the key of the dependency
     * @memberof module:core.ModuleManager
     * @return {Boolean} Promise that is resolved when all promises completed.
     * @example <caption>Check whether the store has the 'hello' dependency</caption>
     * manager.has('hello'); // -> true
     */

  }, {
    key: 'has',
    value: function has(key) {
      return Boolean(this.store.getState()[0][key]);
    }

    /**
     * @method update
     * @instance
     * @description Updates deps
     * @param {Object} [depsMap={}]
     * @memberof module:core.ModuleManager
     */

  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      var depsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.store.subscribe(function () {
        var _store$getState = _this.store.getState(),
            _store$getState2 = slicedToArray(_store$getState, 2),
            data = _store$getState2[0],
            changedKey = _store$getState2[1];

        var callback = depsMap[changedKey];

        if (callback) callback(data[changedKey]);
      });
    }

    /**
     * @method add
     * @alias module:core.ModuleManager#set
     * @memberof module:core.ModuleManager
     */

  }, {
    key: 'add',
    value: function add() {
      console.warn('.add() method is deprecated. Use .set() instead');
      return this.set.apply(this, arguments);
    }

    /**
     * @method require
     * @instance
     * @description Require module
     * @param {String} name Defined name
     * @param {Function} moduleExecutor Function that returns applied module
     * @memberof module:core.ModuleManager
     */

  }, {
    key: 'require',
    value: function require(name, moduleExecutor) {
      if (this.use(name) === undefined) this.handler.applyModule(moduleExecutor());
    }
  }]);
  return ModuleManager;
}();

var _class;
var _temp;

var Component = (_temp = _class = function (_ModuleSystem) {
  inherits(Component, _ModuleSystem);

  // For keeping children components;

  // Collection of promises;

  /**
   * Collection of `modules`.
   * @member {Array} module:core.Component#modules
   * @public
   */


  /**
   * Static instructions
   * @member {Object} module:core.Component#instructions
   * @static
   * @default {}
   */
  function Component() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Component.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Component.instructions;
    classCallCheck(this, Component);

    // Apply polyfilled parameters to .params;
    var _this = possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    _this._wait = [];
    _this.modules = [];
    _this.children = [];
    _this.params = extend(transformData(params, instructions), defaults$$1);
    if (_this.params.manager) _this.manager = new ModuleManager();

    _this.modules = _this.params.modules;

    _this.integrateModules();
    return _this;
  }

  /**
   * @method wait
   * @instance
   * @description Wait for a promise.
   * @param {Promise} [promise] - The promise that should be added to a queue.
   * @return {Promise} Promise that is resolved when all promises completed.
   * @memberof module:core.Component
   */
  // Collection of modules;

  /**
   * Collection of `child` Components.
   * @member {Array} module:core.Component#children
   * @public
   */


  /**
   * Array of promises that should be resolved before Component is ready.
   * @member {Array} module:core.Component#_wait
   * @private
   */

  /**
   * Default values for parameters
   * @member {Object} module:core.Component#defaults
   * @static
   * @default {
   *   modules: [],
   *   manager: true
   * }
   */


  createClass(Component, [{
    key: 'wait',
    value: function wait(promise) {
      if (promise) this._wait.push(promise);
      return Promise.all(this._wait);
    }

    /**
     * @method defer
     * @instance
     * @description Execute `func` (Callback) when Component is ready.
     * @param {Function} func - Callback.
     * @memberof module:core.Component
     */

  }, {
    key: 'defer',
    value: function defer(func) {
      var _this2 = this;

      if (this.isDeffered) this.wait().then(function () {
        return func(_this2);
      });else func(this);
    }

    // PARAMETERS

    /**
     * @method updateParams
     * @instance
     * @description Updates parameters of the Component.
     * @return {Object} Params of this Component
     * @memberof module:core.Component
     */

  }, {
    key: 'updateParams',
    value: function updateParams() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.params = extend(params, this.params);
      return this.params;
    }

    // COPYING & CLONING

    /**
     * @method clone
     * @instance
     * @description Clone this component
     * @return {object} a cloned component with all its source component' params copied.
     * @memberof module:core.Component
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor(this.params).copy(this);
    }

    /**
     * @method copy
     * @instance
     * @description Copy source native and integrate `modules` to it.
     * @param {Component} source - Source component that is used for `copy()` action.
     * @param {Function} [customize] - Callback executed before modules integration process.
     * @return {this} Component
     * @memberof module:core.Component
     */

  }, {
    key: 'copy',
    value: function copy(source, customize) {
      this.params = _extends({}, source.params);

      if (source.native) this.native = source.native.clone(source.params);
      if (customize) customize();
      this.integrateModules(source);

      return this;
    }

    /**
     * @method add
     * @instance
     * @description Add a child `Component`.
     * @param {Component} object - Component that should be added as a `child`.
     * @return {Promise} Resolved when action is done.
     * @memberof module:core.Component
     */

  }, {
    key: 'add',
    value: function add(object) {
      var _this3 = this;

      object.parent = this;

      return new Promise(function (resolve, reject) {
        _this3.defer(function () {
          var native = object.native;

          if (!native) reject();

          var addPromise = _this3.applyBridge({ onAdd: object }).onAdd;

          var resolver = function resolver() {
            _this3.native.add(native);
            _this3.children.push(object);

            resolve(object);
          };

          if (addPromise instanceof Promise) addPromise.then(resolver);else resolver();
        });
      });
    }

    /**
     * @method remove
     * @instance
     * @description Remove a child `Component`.
     * @param {Component} object - Component that should be a **child** of this Component.
     * @memberof module:core.Component
     */

  }, {
    key: 'remove',
    value: function remove(object) {
      object.parent = null;
      this.native.remove(object.native);
    }

    /**
     * @method addTo
     * @instance
     * @description Adds `this` Component to specified `App`/`Component`.
     * @param {Component} object - Component that will be a parent of `this`.
     * @memberof module:core.Component
     */

  }, {
    key: 'addTo',
    value: function addTo(object) {
      return object.add(this);
    }

    /**
     * Returns whether the object is `async` (`wait` promises are more than `0`).
     * @member {Boolean} module:core.Component#isDeffered
     */

  }, {
    key: 'isDeffered',
    get: function get$$1() {
      return this._wait.length > 0;
    }

    /**
     * Returns the `ModuleManager` used for this component.
     * @member {ModuleManager} module:core.Component#manager
     * @throws {ManagerError}
     */

  }, {
    key: 'manager',
    get: function get$$1() {
      if (this._manager) return this._manager;

      throw new ManagerError('Component', 'ModuleManager is not used in this component. \'manager\' parameter should be set as \'true\'', this);
    },
    set: function set$$1(manager) {
      this._manager = manager;
    }

    /**
     * Returns the `native` object used for this component.
     * @member {Object} module:core.Component#native
     */

  }, {
    key: 'native',
    get: function get$$1() {
      return this._native;
    },
    set: function set$$1(mesh) {
      this._native = mesh;
      this._native.component = this;
      return this._native;
    }
  }]);
  return Component;
}(ModuleSystem), _class.defaults = {
  modules: null,
  manager: true
}, _class.instructions = {}, _temp);

function attributes() {
  for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
    mappers[_key] = arguments[_key];
  }

  return function (target) {
    for (var i = 0; i < mappers.length; i++) {
      var mapper = mappers[i];

      for (var k = 0; k < mapper.map.length; k++) {
        var attribute = mapper.map[k];

        Object.defineProperty(target.prototype, attribute, {
          get: mapper.getter(attribute),
          set: mapper.setter(attribute),
          configurable: mapper.configurable,
          enumerable: mapper.enumerable
        });
      }
    }
  };
}

function copy() {
  for (var _len2 = arguments.length, map = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    map[_key2] = arguments[_key2];
  }

  return {
    map: map,
    getter: function getter(name) {
      return function () {
        return this.native[name];
      };
    },
    setter: function setter(name) {
      return function (value) {
        this.native[name].copy(value);
      };
    },

    configurable: true,
    enumerable: true
  };
}

function mirror() {
  for (var _len3 = arguments.length, map = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    map[_key3] = arguments[_key3];
  }

  return {
    map: map,
    getter: function getter(name) {
      return function () {
        return this.native[name];
      };
    },
    setter: function setter(name) {
      return function (value) {
        this.native[name] = value;
      };
    },

    configurable: true,
    enumerable: true
  };
}

var _dec;
var _class$1;
var _class2;
var _temp$1;

var MeshComponent = (_dec = attributes(copy('position', 'rotation', 'quaternion', 'scale'), mirror('material', 'geometry')), _dec(_class$1 = (_temp$1 = _class2 = function (_Component) {
  inherits(MeshComponent, _Component);
  createClass(MeshComponent, null, [{
    key: 'custom',


    // CUSTOM GEOMETRY HANDLING

    /**
     * Default values for parameters
     * @member {Object} module:core.MeshComponent#defaults
     * @static
     * @default
     * {
     *   build: true,
     *   geometry: {},
     *   material: false,
     *
     *   shadow: {
     *     cast: true,
     *     receive: true
     *   },
     *
     *   position: {x: 0, y: 0, z: 0},
     *   rotation: {x: 0, y: 0, z: 0},
     *   scale: {x: 1, y: 1, z: 1}
     * }
     */
    value: function custom(geom) {
      var constructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : three.Mesh;

      return function (_MeshComponent) {
        inherits(_class3, _MeshComponent);

        function _class3() {
          classCallCheck(this, _class3);
          return possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
        }

        createClass(_class3, [{
          key: 'build',
          value: function build() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

            var _applyBridge = this.applyBridge({
              geometry: geom,
              material: params.material
            }),
                geometry = _applyBridge.geometry,
                material = _applyBridge.material;

            return this.applyBridge({ mesh: new constructor(geometry, material) }).mesh;
          }
        }]);
        return _class3;
      }(MeshComponent);
    }

    /**
     * Static instructions
     * @member {Object} module:core.MeshComponent#instructions
     * @static
     * @default
     * {
     *   position: ['x', 'y', 'z'],
     *   rotation: ['x', 'y', 'z'],
     *   scale: ['x', 'y', 'z']
     * }
     */

  }, {
    key: 'create',
    value: function create(geom, params, constructor) {
      return new (MeshComponent.custom(geom, constructor))(params);
    }
  }]);

  function MeshComponent(params) {
    var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MeshComponent.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MeshComponent.instructions;
    classCallCheck(this, MeshComponent);

    var _this = possibleConstructorReturn(this, (MeshComponent.__proto__ || Object.getPrototypeOf(MeshComponent)).call(this, params, defaults$$1, instructions));

    if (_this.params.build) {
      var build = _this.build(_this.params);

      if (!build) {
        throw new CompositionError('MeshComponent', '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.', _this);
      }

      if (build instanceof Promise) {
        build.then(function (native) {
          _this.native = native;
          _this.wrap();
        });
      } else {
        _this.native = build;
        _this.wrap();
      }
    }
    return _this;
  }

  // BUILDING & WRAPPING

  /**
   * @method build
   * @description Build livecycle should return a native object.
   * @throws {CompositionError}
   * @memberof module:core.MeshComponent
   */


  createClass(MeshComponent, [{
    key: 'build',
    value: function build() {
      throw new CompositionError('MeshComponent', 'Instance should have it\'s own .build().', this);
    }

    /**
     * @method wrap
     * @instance
     * @description Wraps transforms (`position` & `rotation`)
     * @return {Promise} Resolved when action is completed
     * @memberof module:core.MeshComponent
     */

  }, {
    key: 'wrap',
    value: function wrap() {
      var _this3 = this;

      return new Promise(function (resolve) {
        // TODO: Fix defer with physics
        // this.defer(() => {
        var _params = _this3.params,
            position = _params.position,
            rotation = _params.rotation,
            scale = _params.scale,
            shadow = _params.shadow;


        _this3.position.set(position.x, position.y, position.z);
        _this3.rotation.set(rotation.x, rotation.y, rotation.z);
        _this3.scale.set(scale.x, scale.y, scale.z);

        _this3.native.castShadow = shadow.cast;
        _this3.native.receiveShadow = shadow.receive;

        _this3.applyBridge({ onWrap: 1 });

        resolve(_this3);
        // });
      });
    }

    // COPYING & CLONING

    /**
     * @method copy
     * @instance
     * @description Copy source transforms & execute `Component.copy()`
     * @return {this} MeshComponent
     * @memberof module:core.MeshComponent
     */

  }, {
    key: 'copy',
    value: function copy$$1(source) {
      var _this4 = this;

      return get(MeshComponent.prototype.__proto__ || Object.getPrototypeOf(MeshComponent.prototype), 'copy', this).call(this, source, function () {
        _this4.position.copy(source.position);
        _this4.rotation.copy(source.rotation);
        _this4.quaternion.copy(source.quaternion);
      });
    }

    /**
     * @method clone
     * @instance
     * @description Make a clone of this MeshComponent using `.copy()`
     * @return {MeshComponent} clone of this object
     * @memberof module:core.MeshComponent
     */

  }, {
    key: 'clone',
    value: function clone(geometry, material) {
      var dest = new this.constructor({ build: false }).copy(this);

      if (geometry) dest.geometry = dest.geometry.clone();
      if (material) dest.material = dest.material.clone();

      return dest;
    }
  }]);
  return MeshComponent;
}(Component), _class2.defaults = _extends({}, Component.defaults, {

  build: true,
  geometry: {},
  material: false,

  shadow: {
    cast: true,
    receive: true
  },

  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 }
}), _class2.instructions = {
  position: ['x', 'y', 'z'],
  rotation: ['x', 'y', 'z'],
  scale: ['x', 'y', 'z']
}, _temp$1)) || _class$1);

var _dec$1;
var _class$2;
var _class2$1;
var _temp$2;

var LightComponent = (_dec$1 = attributes(copy('position', 'rotation', 'quaternion', 'target')), _dec$1(_class$2 = (_temp$2 = _class2$1 = function (_Component) {
  inherits(LightComponent, _Component);

  /**
   * Default values for parameters
   * @member {Object} module:core.LightComponent#defaults
   * @static
   * @default
   * {
   *   build: true,
   *
   *   shadow: {
   *     cast: true,
   *
   *     bias: 0,
   *     radius: 1,
   *
   *     mapSize: {
   *       width: 1024,
   *       height: 1024
   *     },
   *
   *     camera: {
   *       near: true,
   *       far: 400,
   *       fov: 90,
   *
   *       top: 200,
   *       bottom: -200,
   *       left: -200,
   *       right: 200
   *     }
   *   },
   *
   *   position: {x: 0, y: 0, z: 0},
   *   rotation: {x: 0, y: 0, z: 0}
   * }
   */
  function LightComponent(params) {
    var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LightComponent.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LightComponent.instructions;
    classCallCheck(this, LightComponent);

    var _this = possibleConstructorReturn(this, (LightComponent.__proto__ || Object.getPrototypeOf(LightComponent)).call(this, params, defaults$$1, instructions));

    if (_this.params.build) {
      var build = _this.build(_this.params);

      if (!build) {
        throw new CompositionError('LightComponent', '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.', _this);
      }

      if (build instanceof Promise) {
        build.then(function (native) {
          _this.native = native;
        });
      } else _this.native = build;

      _this.wrap();
    }
    return _this;
  }

  // BUILDING & WRAPPING

  /**
   * @method build
   * @instance
   * @description Build livecycle should return a native object.
   * @throws {CompositionError}
   * @memberof module:core.LightComponent
   */


  /**
   * Static instructions
   * @member {Object} module:core.LightComponent#instructions
   * @static
   * @default
   * {
   *   position: ['x', 'y', 'z'],
   *   rotation: ['x', 'y', 'z']
   * }
   */


  createClass(LightComponent, [{
    key: 'build',
    value: function build() {
      throw new CompositionError('MeshComponent', 'Instance should have it\'s own .build().', this);
    }

    /**
     * @method wrap
     * @instance
     * @description Wraps transforms (`position` & `rotation`)
     * @return {Promise} Resolved when action is completed
     * @memberof module:core.LightComponent
     */

  }, {
    key: 'wrap',
    value: function wrap() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.defer(function () {
          var _params = _this2.params,
              position = _params.position,
              rotation = _params.rotation;


          _this2.position.set(position.x, position.y, position.z);
          _this2.rotation.set(rotation.x, rotation.y, rotation.z);

          _this2.applyBridge({ onWrap: 1 });

          resolve(_this2);
        });
      });
    }

    /**
     * @method wrapShadow
     * @instance
     * @description Wraps shadow properties
     * @memberof module:core.LightComponent
     */

  }, {
    key: 'wrapShadow',
    value: function wrapShadow() {
      var native = this.native,
          shadow = this.params.shadow;


      native.castShadow = shadow.cast;
      native.shadow.mapSize.width = shadow.mapSize.width;
      native.shadow.mapSize.height = shadow.mapSize.height;
      native.shadow.bias = shadow.bias;
      native.shadow.radius = shadow.radius;

      var shadowCamera = native.shadow.camera;
      var camera = shadow.camera;

      shadowCamera.near = camera.near;
      shadowCamera.far = camera.far;
      shadowCamera.fov = camera.fov;

      shadowCamera.left = camera.left;
      shadowCamera.right = camera.right;
      shadowCamera.top = camera.top;
      shadowCamera.bottom = camera.bottom;
    }

    // COPYING & CLONING

    /**
     * @method copy
     * @instance
     * @description Copy source transforms & execute `Component.copy()`
     * @return {this} LightComponent
     * @memberof module:core.LightComponent
     */

  }, {
    key: 'copy',
    value: function copy$$1(source) {
      var _this3 = this;

      return get(LightComponent.prototype.__proto__ || Object.getPrototypeOf(LightComponent.prototype), 'copy', this).call(this, source, function () {
        if (_this3.target) _this3.target.copy(source.target());

        _this3.position.copy(source.position);
        _this3.rotation.copy(source.rotation);
        _this3.quaternion.copy(source.quaternion);
      });
    }

    /**
     * @method clone
     * @instance
     * @description Make a clone of this LightComponent using `.copy()`
     * @return {LightComponent} clone of this object
     * @memberof module:core.LightComponent
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor({ build: false }).copy(this);
    }
  }]);
  return LightComponent;
}(Component), _class2$1.defaults = _extends({}, Component.defaults, {

  build: true,

  shadow: {
    cast: true,

    bias: 0,
    radius: 1,

    mapSize: {
      width: 1024,
      height: 1024
    },

    camera: {
      near: true,
      far: 400,
      fov: 90,

      top: 200,
      bottom: -200,
      left: -200,
      right: 200
    }
  },

  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
}), _class2$1.instructions = {
  position: ['x', 'y', 'z'],
  rotation: ['x', 'y', 'z']
}, _temp$2)) || _class$2);

var _dec$2;
var _class$3;
var _class2$2;
var _temp$3;

var CameraComponent = (_dec$2 = attributes(copy('position', 'rotation', 'quaternion', 'target')), _dec$2(_class$3 = (_temp$3 = _class2$2 = function (_Component) {
  inherits(CameraComponent, _Component);

  /**
   * Default values for parameters
   * @member {Object} module:core.CameraComponent#defaults
   * @static
   * @default
   * {
   *   build: true,
   *
   *   position: {x: 0, y: 0, z: 0},
   *   rotation: {x: 0, y: 0, z: 0}
   * }
   */
  function CameraComponent(params) {
    var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CameraComponent.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CameraComponent.instructions;
    classCallCheck(this, CameraComponent);

    var _this = possibleConstructorReturn(this, (CameraComponent.__proto__ || Object.getPrototypeOf(CameraComponent)).call(this, params, defaults$$1, instructions));

    if (_this.params.build) {
      var build = _this.build(_this.params);

      if (!build) {
        throw new CompositionError('CameraComponent', '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.', _this);
      }

      if (build instanceof Promise) {
        build.then(function (native) {
          _this.native = native;
        });
      } else _this.native = build;

      _this.wrap();
    }
    return _this;
  }

  // BUILDING & WRAPPING

  /**
   * @method build
   * @instance
   * @description Build livecycle should return a native object.
   * @throws {CompositionError}
   * @memberof module:core.CameraComponent
   */


  /**
   * Static instructions
   * @member {Object} module:core.CameraComponent#instructions
   * @static
   * @default
   * {
   *   position: ['x', 'y', 'z'],
   *   rotation: ['x', 'y', 'z'],
   *   scale: ['x', 'y', 'z']
   * }
   */


  createClass(CameraComponent, [{
    key: 'build',
    value: function build() {
      throw new CompositionError('CameraComponent', 'Instance should have it\'s own .build().', this);
    }

    /**
     * @method wrap
     * @instance
     * @description Wraps transforms (`position` & `rotation`)
     * @return {Promise} Resolved when action is completed
     * @memberof module:core.CameraComponent
     */

  }, {
    key: 'wrap',
    value: function wrap() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.defer(function () {
          _this2.position.set(_this2.params.position.x, _this2.params.position.y, _this2.params.position.z);
          _this2.rotation.set(_this2.params.rotation.x, _this2.params.rotation.y, _this2.params.rotation.z);

          _this2.applyBridge({ onWrap: 1 });

          resolve(_this2);
        });
      });
    }

    /**
     * @method copy
     * @instance
     * @description Copy source transforms & execute `Component.copy()`
     * @return {this} CameraComponent
     * @memberof module:core.CameraComponent
     */

  }, {
    key: 'copy',
    value: function copy$$1(source) {
      var _this3 = this;

      return get(CameraComponent.prototype.__proto__ || Object.getPrototypeOf(CameraComponent.prototype), 'copy', this).call(this, source, function () {
        if (_this3.target) _this3.target.copy(source.target());

        _this3.position.copy(source.position);
        _this3.rotation.copy(source.rotation);
        _this3.quaternion.copy(source.quaternion);
      });
    }

    /**
     * @method clone
     * @instance
     * @description Make a clone of this CameraComponent using `.copy()`
     * @return {CameraComponent} clone of this object
     * @memberof module:core.CameraComponent
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor({ build: false }).copy(this);
    }
  }]);
  return CameraComponent;
}(Component), _class2$2.defaults = _extends({}, Component.defaults, {

  build: true,

  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
}), _class2$2.instructions = {
  position: ['x', 'y', 'z'],
  rotation: ['x', 'y', 'z'],
  scale: ['x', 'y', 'z']
}, _temp$3)) || _class$3);

const version = "2.0.0";

var presentNode = function () {
  var time = process.hrtime();
  return time[0] * 1e3 + time[1] / 1e6;
};

var system = {
  window: typeof window === 'undefined' ? global : window
};

if (typeof global !== 'undefined') {
  global.performance = {
    now: presentNode
  };
}

var App = function (_ModuleSystem) {
  inherits(App, _ModuleSystem);

  /**
   * @description Defines whether the scene should render or not
   * @member {Boolean} module:core.App#updateEnabled
   * @public
   */
  function App() {
    var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, App);

    console.log('WHS.App ' + version);

    var _this = possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.simulate = false;
    _this.updateEnabled = true;
    _this.loops = [];

    _this.manager = new ModuleManager(_this);
    _this.modules = modules;

    _this.integrateModules();
    return _this;
  }

  // CONTROLS & UPDATING

  /**
   * @method start
   * @description Start rendering loop and physics simulation (if you use version with physics).
   * @memberof module:core.App
   */

  /**
   * Loops in this app
   * @description Array of loops that are executed by this app.
   * @member {Array} module:core.App#loops
   * @public
   */

  /**
   * Simulate flag
   * @description Same as .updateEnabled, but for physics. Defines if physics is simulated each frame.
   * @member {Boolean} module:core.App#simulate
   * @public
   */


  createClass(App, [{
    key: 'start',
    value: function start() {
      var requestAnimFrame = function () {
        return system.window.requestAnimationFrame || system.window.webkitRequestAnimationFrame || system.window.mozRequestAnimationFrame || function (callback) {
          system.window.setTimeout(callback, 1000 / 60);
        };
      }();

      var loops = this.loops,
          updateEnabled = this.updateEnabled;


      function process() {
        requestAnimFrame(process);
        if (!updateEnabled) return;

        for (var i = 0, ll = loops.length; i < ll; i++) {
          var e = loops[i];
          if (e.enabled) e.execute(e.clock);
        }
      }

      this.updateEnabled = true;
      process();
    }

    /**
     * @method stop
     * @description Stops rendering loops
     * @memberof module:core.App
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.updateEnabled = false;
    }

    /**
     * @method addLoop
     * @description Adds loop to this app.
     * @param {Object} loop - the loop to add
     * @return {Promise} Promise that is resolved when promises completed.
     * @memberof module:core.App
     * @example <caption>Adding a loop to an app</caption>
     * const loop = new Loop(() => {
     *  // ...
     * });
     *
     * const app = new App();
     *
     * app.addLoop(loop);
     * loop.start();
     */

  }, {
    key: 'addLoop',
    value: function addLoop(loop) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.loops.push(loop);
        resolve(loop);
      });
    }

    /**
     * @method removeLoop
     * @description Removes loop from this app.
     * @param {Object} loop - the loop to remove
     * @return {Promise} Promise that is resolved when promises completed.
     * @memberof module:core.App
     */

  }, {
    key: 'removeLoop',
    value: function removeLoop(loop) {
      var _this3 = this;

      return new Promise(function (resolve) {
        var index = _this3.loops.indexOf(loop);
        if (index !== -1) _this3.loops.splice(index, 1);

        resolve(loop);
      });
    }
  }, {
    key: 'get',
    value: function get$$1(key) {
      return this.manager.get(key);
    }
  }, {
    key: 'use',
    value: function use(key) {
      return this.manager.use(key);
    }
  }]);
  return App;
}(ModuleSystem);

var Loop = function () {
  function Loop(func) {
    var useClock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    classCallCheck(this, Loop);

    this.func = func;
    this.clock = useClock ? new three.Clock() : null;
    this.enabled = false;
  }

  // CONTROLS

  /**
   * @method start
   * @instance
   * @description Starts this loop, clock if it has one. Won't do anything if loop enabled already.
   * @param {Component} [world] app to add this loop to, if provided.
   * @memberof module:core.Loop
   */


  createClass(Loop, [{
    key: 'start',
    value: function start(world) {
      if (this.enabled) return;

      if (world) world.addLoop(this);

      if (this.clock) this.clock.start();
      this.enabled = true;
    }

    /**
     * @method stop
     * @instance
     * @description Stops this loop and its clock if it has one, won't do anything if this loop is not enabled)
     * @param {Component} [world] app to remove this loop from, if provided.
     * @memberof module:core.Loop
     */

  }, {
    key: 'stop',
    value: function stop(world) {
      if (!this.enabled) return;

      if (this.clock) this.clock.stop();
      this.enabled = false;

      if (world) world.removeLoop(this);
    }

    // EXECUTION

    /**
     * @method execute
     * @instance
     * @description Executes the function of this loop
     * @memberof module:core.Loop
     * @returns {*} whatever the function of this loop returns
     */

  }, {
    key: 'execute',
    value: function execute() {
      return this.func(this.clock);
    }
  }]);
  return Loop;
}();

/** @module core */

var _class$4;
var _temp$4;

var AmbientLight$1 = (_temp$4 = _class$4 = function (_LightComponent) {
  inherits(AmbientLight$$1, _LightComponent);

  function AmbientLight$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, AmbientLight$$1);
    return possibleConstructorReturn(this, (AmbientLight$$1.__proto__ || Object.getPrototypeOf(AmbientLight$$1)).call(this, params, AmbientLight$$1.defaults));
  }

  createClass(AmbientLight$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new three.AmbientLight(params.color, params.intensity) }).light;
    }
  }]);
  return AmbientLight$$1;
}(LightComponent), _class$4.defaults = _extends({}, LightComponent.defaults, {

  color: 0xffffff,
  intensity: 1
}), _temp$4);

var _class$5;
var _temp$5;

var DirectionalLight$1 = (_temp$5 = _class$5 = function (_LightComponent) {
  inherits(DirectionalLight$$1, _LightComponent);

  function DirectionalLight$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, DirectionalLight$$1);

    var _this = possibleConstructorReturn(this, (DirectionalLight$$1.__proto__ || Object.getPrototypeOf(DirectionalLight$$1)).call(this, params, DirectionalLight$$1.defaults));

    _this.wrapShadow();
    return _this;
  }

  createClass(DirectionalLight$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new three.DirectionalLight(params.color, params.intensity) }).light;
    }
  }]);
  return DirectionalLight$$1;
}(LightComponent), _class$5.defaults = _extends({}, LightComponent.defaults, {

  color: 0xffffff,
  intensity: 1
}), _temp$5);

var _class$6;
var _temp$6;

var HemisphereLight$1 = (_temp$6 = _class$6 = function (_LightComponent) {
  inherits(HemisphereLight$$1, _LightComponent);

  function HemisphereLight$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, HemisphereLight$$1);
    return possibleConstructorReturn(this, (HemisphereLight$$1.__proto__ || Object.getPrototypeOf(HemisphereLight$$1)).call(this, params, HemisphereLight$$1.defaults));
  }

  createClass(HemisphereLight$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new three.HemisphereLight(params.skyColor, params.groundColor, params.intensity) }).light;
    }
  }]);
  return HemisphereLight$$1;
}(LightComponent), _class$6.defaults = _extends({}, LightComponent.defaults, {

  skyColor: 0xffffff,
  groundColor: 0xffffff,
  intensity: 1
}), _temp$6);

var _class$7;
var _temp$7;

var PointLight$1 = (_temp$7 = _class$7 = function (_LightComponent) {
  inherits(PointLight$$1, _LightComponent);

  function PointLight$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, PointLight$$1);

    var _this = possibleConstructorReturn(this, (PointLight$$1.__proto__ || Object.getPrototypeOf(PointLight$$1)).call(this, params, PointLight$$1.defaults));

    _this.wrapShadow();
    return _this;
  }

  createClass(PointLight$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new three.PointLight(params.color, params.intensity, params.distance, params.decay) }).light;
    }
  }]);
  return PointLight$$1;
}(LightComponent), _class$7.defaults = _extends({}, LightComponent.defaults, {

  color: 0xffffff,
  intensity: 1,
  distance: 100,
  decay: 1
}), _temp$7);

var _class$8;
var _temp$8;

var SpotLight$1 = (_temp$8 = _class$8 = function (_LightComponent) {
  inherits(SpotLight$$1, _LightComponent);

  function SpotLight$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, SpotLight$$1);

    var _this = possibleConstructorReturn(this, (SpotLight$$1.__proto__ || Object.getPrototypeOf(SpotLight$$1)).call(this, params, SpotLight$$1.defaults));

    _this.wrapShadow();
    return _this;
  }

  createClass(SpotLight$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new three.SpotLight(params.color, params.intensity, params.distance, params.angle, params.exponent, params.decay) }).light;
    }
  }]);
  return SpotLight$$1;
}(LightComponent), _class$8.defaults = _extends({}, LightComponent.defaults, {

  color: 0xffffff,
  intensity: 1,
  distance: 100,
  angle: Math.PI / 3,
  exponent: 0,
  decay: 1
}), _temp$8);

var _class$9;
var _temp$9;

var AreaLight = (_temp$9 = _class$9 = function (_LightComponent) {
  inherits(AreaLight, _LightComponent);

  function AreaLight() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, AreaLight);
    return possibleConstructorReturn(this, (AreaLight.__proto__ || Object.getPrototypeOf(AreaLight)).call(this, params, AreaLight.defaults));
  }

  createClass(AreaLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new three.RectAreaLight(params.color, params.intensity, params.width, params.height) }).light;
    }
  }]);
  return AreaLight;
}(LightComponent), _class$9.defaults = _extends({}, LightComponent.defaults, {

  color: 0xffffff,
  intensity: 1,
  width: 10,
  height: 10
}), _temp$9);

/** @module components/lights */

var _class$10;
var _temp$10;

var CubeCamera$1 = (_temp$10 = _class$10 = function (_CameraComponent) {
  inherits(CubeCamera$$1, _CameraComponent);

  function CubeCamera$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, CubeCamera$$1);
    return possibleConstructorReturn(this, (CubeCamera$$1.__proto__ || Object.getPrototypeOf(CubeCamera$$1)).call(this, params, CubeCamera$$1.defaults));
  }

  /**
   * Default values for parameters
   * @member {Object} module:components/cameras.CubeCamera#defaults
   * @static
   * @default <pre>
   * {
   *   camera: {
   *     near: 1,
   *     far: 1000,
   *     cubeResolution: 128
   *   }
   * }</pre>
   */


  createClass(CubeCamera$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ camera: new three.CubeCamera(params.near, params.far, params.cubeResolution) }).camera;
    }
  }]);
  return CubeCamera$$1;
}(CameraComponent), _class$10.defaults = _extends({}, CameraComponent.defaults, {

  near: 1,
  far: 1000,
  cubeResolution: 128
}), _temp$10);

var _class$11;
var _temp$11;

var OrthographicCamera$1 = (_temp$11 = _class$11 = function (_CameraComponent) {
  inherits(OrthographicCamera$$1, _CameraComponent);

  function OrthographicCamera$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, OrthographicCamera$$1);
    return possibleConstructorReturn(this, (OrthographicCamera$$1.__proto__ || Object.getPrototypeOf(OrthographicCamera$$1)).call(this, params, OrthographicCamera$$1.defaults));
  }
  /**
   * Default values for parameters
   * @member {Object} module:components/cameras.OrthographicCamera#defaults
   * @static
   * @default <pre>
   * {
   *   near: 1,
   *   far: 1000,
   *   left: system.window.innerWidth / -2,
   *   right: system.window.innerWidth / 2,
   *   top: system.window.innerHeight / 2,
   *   bottom: system.window.innerHeight / -2
   * }</pre>
   */


  createClass(OrthographicCamera$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ camera: new three.OrthographicCamera(params.left, params.right, params.top, params.bottom, params.near, params.far) }).camera;
    }
  }]);
  return OrthographicCamera$$1;
}(CameraComponent), _class$11.defaults = _extends({}, CameraComponent.defaults, {

  near: 1,
  far: 1000,
  left: system.window.innerWidth / -2,
  right: system.window.innerWidth / 2,
  top: system.window.innerHeight / 2,
  bottom: system.window.innerHeight / -2
}), _temp$11);

var _class$12;
var _temp$12;

var PerspectiveCamera$1 = (_temp$12 = _class$12 = function (_CameraComponent) {
  inherits(PerspectiveCamera$$1, _CameraComponent);

  function PerspectiveCamera$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, PerspectiveCamera$$1);
    return possibleConstructorReturn(this, (PerspectiveCamera$$1.__proto__ || Object.getPrototypeOf(PerspectiveCamera$$1)).call(this, params, PerspectiveCamera$$1.defaults));
  }
  /**
   * Default values for parameters
   * @member {Object} module:components/cameras.PerspectiveCamera#defaults
   * @static
   * @default <pre>
   * {
   *   near: 1,
   *   far: 1000,
   *   fov: 75,
   *   aspect: system.window.innerWidth / system.window.innerHeight
   * }</pre>
   */


  createClass(PerspectiveCamera$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ camera: new three.PerspectiveCamera(params.fov, params.aspect, params.near, params.far) }).camera;
    }
  }]);
  return PerspectiveCamera$$1;
}(CameraComponent), _class$12.defaults = _extends({}, CameraComponent.defaults, {

  near: 1,
  far: 1000,
  fov: 75,
  aspect: system.window.innerWidth / system.window.innerHeight
}), _temp$12);

/** @module components/cameras */

var _class$13;
var _temp$13;

var Box = (_temp$13 = _class$13 = function (_MeshComponent) {
  inherits(Box, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Box#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     width: 1,
   *     height: 1,
   *     depth: 1,
   *     widthSegments: 1,
   *     heightSegments: 1,
   *     depthSegments: 1
   *   }
   * }</pre>
   */
  function Box() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Box);
    return possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, params, Box.defaults, Box.instructions));
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Box
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Box#instructions
   * @static
   * @default geometry: ['width', 'height', 'depth', 'widthSegments', 'heightSegments', 'depthSegements']
   */


  createClass(Box, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? three.BoxBufferGeometry : three.BoxGeometry)(params.geometry.width, params.geometry.height, params.geometry.depth, params.geometry.widthSegments, params.geometry.heightSegments, params.geometry.depthSegments);

      return geometry;
    }
  }]);
  return Box;
}(MeshComponent), _class$13.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  }
}), _class$13.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['width', 'height', 'depth', 'widthSegments', 'heightSegments', 'depthSegements']
}), _temp$13);

var _class$14;
var _temp$14;

var Circle = (_temp$14 = _class$14 = function (_MeshComponent) {
  inherits(Circle, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Circle#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 50,
   *     segments: 8,
   *     thetaStart: 0,
   *     thetaLength: Math.PI * 2
   *   }
   * }</pre>
   */
  function Circle() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Circle);
    return possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, params, Circle.defaults, Circle.instructions));
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Circle
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Circle#instructions
   * @static
   * @default geometry: ['radius', 'segments', 'thetaStart', 'thetaLength']
   */


  createClass(Circle, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? three.CircleBufferGeometry : three.CircleGeometry)(params.geometry.radius, params.geometry.segments, params.geometry.thetaStart, params.geometry.thetaLength);

      return geometry;
    }
  }]);
  return Circle;
}(MeshComponent), _class$14.defaults = _extends({}, MeshComponent.defaults, {

  geometry: {
    radius: 50,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  }
}), _class$14.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'segments', 'thetaStart', 'thetaLength']
}), _temp$14);

var _class$15;
var _temp$15;

var Cone = (_temp$15 = _class$15 = function (_MeshComponent) {
  inherits(Cone, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Cone#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 20,
   *     height: 100,
   *     radiusSegments: 32,
   *     heightSegments: 1,
   *     openEnded: false,
   *     thetaStart: 0,
   *     thetaLength: Math.PI * 2
   *   }
   * }</pre>
   */
  function Cone() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Cone);

    var _this = possibleConstructorReturn(this, (Cone.__proto__ || Object.getPrototypeOf(Cone)).call(this, params, Cone.defaults, Cone.instructions));

    if (params.build) {
      _this.build(params);
      get(Cone.prototype.__proto__ || Object.getPrototypeOf(Cone.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Cone
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Cone#instructions
   * @static
   * @default <pre>
   * geometry: [
   *   'radius',
   *   'height',
   *   'radiusSegments',
   *   'heightSegments',
   *   'openEnded',
   *   'thetaStart',
   *   'thetaLength'
   * ]
   * </pre>
   */


  createClass(Cone, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? three.ConeBufferGeometry : three.ConeGeometry)(params.geometry.radius, params.geometry.height, params.geometry.radiusSegments, params.geometry.heightSegments, params.geometry.openEnded, params.geometry.thetaStart, params.geometry.thetaLength);

      return geometry;
    }
  }]);
  return Cone;
}(MeshComponent), _class$15.defaults = _extends({}, MeshComponent.defaults, {

  geometry: {
    radius: 20,
    height: 100,
    radiusSegments: 32,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  }
}), _class$15.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'height', 'radiusSegments', 'heightSegments', 'openEnded', 'thetaStart', 'thetaLength']
}), _temp$15);

var _class$16;
var _temp$16;

var Cylinder = (_temp$16 = _class$16 = function (_MeshComponent) {
  inherits(Cylinder, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Cylinder#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radiusTop: 20,
   *     radiusBottom: 20,
   *     height: 100,
   *     radiusSegments: 32,
   *     heightSegments: 1,
   *     openEnded: false,
   *     thetaStart: 0,
   *     thetaLength: Math.PI * 2
   *   }
   * }</pre>
   */
  function Cylinder() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Cylinder);

    var _this = possibleConstructorReturn(this, (Cylinder.__proto__ || Object.getPrototypeOf(Cylinder)).call(this, params, Cylinder.defaults, Cylinder.instructions));

    if (params.build) {
      _this.build(params);
      get(Cylinder.prototype.__proto__ || Object.getPrototypeOf(Cylinder.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Cylinder
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Cylinder#instructions
   * @static
   * @default <pre>
   * geometry: [
   *   'radiusTop',
   *   'radiusBottom',
   *   'height',
   *   'radiusSegments',
   *   'heightSegments',
   *   'openEnded',
   *   'thetaStart',
   *   'thetaLength'
   * ]
   * </pre>
   */


  createClass(Cylinder, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? three.CylinderBufferGeometry : three.CylinderGeometry)(params.geometry.radiusTop, params.geometry.radiusBottom, params.geometry.height, params.geometry.radiusSegments, params.geometry.heightSegments, params.geometry.openEnded, params.geometry.thetaStart, params.geometry.thetaLength);

      return geometry;
    }
  }]);
  return Cylinder;
}(MeshComponent), _class$16.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radiusTop: 0,
    radiusBottom: 1,
    height: 1,
    radiusSegments: 32,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  }
}), _class$16.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radiusTop', 'radiusBottom', 'height', 'radiusSegments', 'heightSegments', 'openEnded', 'thetaStart', 'thetaLength']
}), _temp$16);

var _class$17;
var _temp$17;

var Dodecahedron = (_temp$17 = _class$17 = function (_MeshComponent) {
  inherits(Dodecahedron, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Dodecahedron#defaults
   * @static
   * @default <pre>
   * geometry: {
   *   radius: 1,
   *   detail: 0
   * }
   * </pre>
   */
  function Dodecahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Dodecahedron);

    var _this = possibleConstructorReturn(this, (Dodecahedron.__proto__ || Object.getPrototypeOf(Dodecahedron)).call(this, params, Dodecahedron.defaults, Dodecahedron.instructions));

    if (params.build) {
      _this.build(params);
      get(Dodecahedron.prototype.__proto__ || Object.getPrototypeOf(Dodecahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Dodecahedron
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Dodecahedron#instructions
   * @static
   * @default <pre>
   * geometry: ['radius', 'detail']
   * </pre>
   */


  createClass(Dodecahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.DodecahedronBufferGeometry : three.DodecahedronGeometry)(params.geometry.radius, params.geometry.detail);
    }
  }]);
  return Dodecahedron;
}(MeshComponent), _class$17.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radius: 1,
    detail: 0
  }
}), _class$17.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'detail']
}), _temp$17);

var _class$18;
var _temp$18;

var Extrude = (_temp$18 = _class$18 = function (_MeshComponent) {
  inherits(Extrude, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Extrude#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     shapes: [],
   *     options: {}
   *   }
   * }
   * </pre>
   */
  function Extrude() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Extrude);

    var _this = possibleConstructorReturn(this, (Extrude.__proto__ || Object.getPrototypeOf(Extrude)).call(this, params, Extrude.defaults, Extrude.instructions));

    if (params.build) {
      _this.build(params);
      get(Extrude.prototype.__proto__ || Object.getPrototypeOf(Extrude.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Extrude
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Extrude#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['shapes', 'options']
   * }
   * </pre>
   */


  createClass(Extrude, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new three.ExtrudeGeometry(params.geometry.shapes, params.geometry.options);

      return params.buffer ? new three.BufferGeometry().fromGeometry(geometry) : geometry;
    }
  }]);
  return Extrude;
}(MeshComponent), _class$18.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    shapes: [],
    options: {}
  }
}), _class$18.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['shapes', 'options']
}), _temp$18);

var _class$19;
var _temp$19;

var Icosahedron = (_temp$19 = _class$19 = function (_MeshComponent) {
  inherits(Icosahedron, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Icosahedron#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 1,
   *     detail: 0
   *   }
   * }</pre>
   */
  function Icosahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Icosahedron);

    var _this = possibleConstructorReturn(this, (Icosahedron.__proto__ || Object.getPrototypeOf(Icosahedron)).call(this, params, Icosahedron.defaults, Icosahedron.instructions));

    if (params.build) {
      _this.build(params);
      get(Icosahedron.prototype.__proto__ || Object.getPrototypeOf(Icosahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Icosahedron
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Icosahedron#instructions
   * @static
   * @default {geometry: ['radius', 'detail']}
   */


  createClass(Icosahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.IcosahedronBufferGeometry : three.IcosahedronGeometry)(params.geometry.radius, params.geometry.detail);
    }
  }]);
  return Icosahedron;
}(MeshComponent), _class$19.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radius: 1,
    detail: 0
  }
}), _class$19.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'detail']
}), _temp$19);

var _class$20;
var _temp$20;

var Lathe = (_temp$20 = _class$20 = function (_MeshComponent) {
  inherits(Lathe, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Lathe#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     points: []
   *   }
   * }
   * </pre>
   */
  function Lathe() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Lathe);

    var _this = possibleConstructorReturn(this, (Lathe.__proto__ || Object.getPrototypeOf(Lathe)).call(this, params, Lathe.defaults, Lathe.instructions));

    if (params.build) {
      _this.build(params);
      get(Lathe.prototype.__proto__ || Object.getPrototypeOf(Lathe.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Lathe
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Lathe#instructions
   * @static
   * @default <pre>{
   *   geometry: ['points']
   * }
   * </pre>
   */


  createClass(Lathe, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.LatheBufferGeometry : three.LatheGeometry)(params.geometry.points);
    }
  }]);
  return Lathe;
}(MeshComponent), _class$20.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    points: []
  }
}), _class$20.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['points']
}), _temp$20);

var _class$21;
var _temp$21;

var Line$1 = (_temp$21 = _class$21 = function (_MeshComponent) {
  inherits(Line$$1, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Line#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     curve: new LineCurve3(new Vector3(0, 0, 0), new Vector3(10, 0, 0)),
   *     points: 50
   *   }
   * }
   * </pre>
   */
  function Line$$1(params) {
    classCallCheck(this, Line$$1);
    return possibleConstructorReturn(this, (Line$$1.__proto__ || Object.getPrototypeOf(Line$$1)).call(this, params, Line$$1.defaults, Line$$1.instructions));
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Line
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Line#instructions
   * @static
   * @default <pre>{
   *   geometry: ['curve', 'points']
   * }
   * </pre>
   */


  createClass(Line$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Line(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = params.buffer ? new three.BufferGeometry() : new three.Geometry();

      if (params.buffer) {
        var pp = params.geometry.curve.getPoints(params.geometry.points);
        var verts = new Float32Array(pp.length * 3);

        for (var i = 0, max = pp.length; i < max; i++) {
          var i3 = i * 3;

          verts[i3] = pp[i].x;
          verts[i3 + 1] = pp[i].y;
          verts[i3 + 2] = pp[i].z;
        }

        geometry.addAttribute('position', new three.BufferAttribute(verts, 3));
      } else geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

      return geometry;
    }
  }]);
  return Line$$1;
}(MeshComponent), _class$21.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    curve: new three.LineCurve3(new three.Vector3(0, 0, 0), new three.Vector3(10, 0, 0)),
    points: 50
  }
}), _class$21.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['curve', 'points']
}), _temp$21);

var _class$22;
var _temp$22;

var Importer = (_temp$22 = _class$22 = function (_MeshComponent) {
  inherits(Importer, _MeshComponent);
  createClass(Importer, null, [{
    key: 'filter',


    /**
     * @method filter
     * @description Default values for parameters
     * @static
     * @param {THREE.Mesh} object Instance for iterating through it's children.
     * @param {Function} filter Function with child as argument, should return a boolean whether include the child or not.
     * @return {THREE.Mesh} object with children
     * @memberof module:components/meshes.Importer
     * @example <caption>Removing unnecessary lights from children</caption>
     * new Icosahedron({
     *   loader: new THREE.OBJLoader(),
     *
     *   parse(group) { // data from loader
     *     return Importer.filter(group, child => !child.isLight); // remove lights
     *   },
     *
     *   position: [0, 100, 0]
     * }).addTo(app);
     */


    /**
     * Default values for parameters
     * @member {Object} module:components/meshes.Importer#defaults
     * @static
     * @default <pre>
     * {
     *   url: '',
     *   loader: new JSONLoader(),
     *
     *   onLoad() {},
     *   onProgress() {},
     *   onError() {},
     *
     *   texturePath: null,
     *   useCustomMaterial: false,
     *
     *   parser(geometry, materials) {
     *     return new Mesh(geometry, materials);
     *   }
     * }</pre>
     */
    value: function filter(object, _filter) {
      var processFilter = function processFilter(object) {
        object.children.forEach(function (el, index) {
          if (el.children) processFilter(el);
          if (!_filter(el)) object.children.splice(index, 1);
        });

        return object;
      };

      return processFilter(object);
    }
  }]);

  function Importer() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Importer);
    return possibleConstructorReturn(this, (Importer.__proto__ || Object.getPrototypeOf(Importer)).call(this, params, Importer.defaults, Importer.instructions, false));
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Importer
   */


  createClass(Importer, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var promise = new Promise(function (resolve) {
        if (params.texturePath) params.laoder.setTexturePath(params.texturePath);

        params.loader.load(params.url, function () {
          // geometry, materials
          params.onLoad.apply(params, arguments);

          var object = _this2.applyBridge({ mesh: params.parser.apply(params, arguments) }).mesh;

          var _applyBridge = _this2.applyBridge({
            geometry: object.geometry,
            material: params.useCustomMaterial ? params.material : object.material
          }),
              geom = _applyBridge.geometry,
              mat = _applyBridge.material;

          if (object.geometry) object.geometry = geom;
          if (object.material) object.material = mat;

          resolve(object);
        }, params.onProgress, params.onError);
      });

      get(Importer.prototype.__proto__ || Object.getPrototypeOf(Importer.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }]);
  return Importer;
}(MeshComponent), _class$22.defaults = _extends({}, MeshComponent.defaults, {

  url: '',
  loader: new three.JSONLoader(),

  onLoad: function onLoad() {},
  onProgress: function onProgress() {},
  onError: function onError() {},


  texturePath: null,
  useCustomMaterial: false,

  parser: function parser(geometry, materials) {
    return new three.Mesh(geometry, materials);
  }
}), _class$22.instructions = _extends({}, MeshComponent.instructions), _temp$22);

var _class$23;
var _temp$23;

var Octahedron = (_temp$23 = _class$23 = function (_MeshComponent) {
  inherits(Octahedron, _MeshComponent);

  function Octahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Octahedron);

    var _this = possibleConstructorReturn(this, (Octahedron.__proto__ || Object.getPrototypeOf(Octahedron)).call(this, params, Octahedron.defaults, Octahedron.instructions));

    if (params.build) {
      _this.build(params);
      get(Octahedron.prototype.__proto__ || Object.getPrototypeOf(Octahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Octahedron
   */

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Octahedron#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 1,
   *     detail: 0
   *   }
   * }
   * </pre>
   */


  createClass(Octahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.OctahedronBufferGeometry : three.OctahedronGeometry)(params.geometry.radius, params.geometry.detail);
    }
  }]);
  return Octahedron;
}(MeshComponent), _class$23.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radius: 1,
    detail: 0
  }
}), _temp$23);

var _class$24;
var _temp$24;

var Parametric = (_temp$24 = _class$24 = function (_MeshComponent) {
  inherits(Parametric, _MeshComponent);

  function Parametric() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Parametric);
    return possibleConstructorReturn(this, (Parametric.__proto__ || Object.getPrototypeOf(Parametric)).call(this, params, Parametric.defaults, Parametric.instructions));
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Parametric
   */

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Parametric#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     func: (u, v) => new Vector3(u, v, 0),
   *     slices: 10,
   *     tacks: 10
   *   }
   * }
   * </pre>
   */


  createClass(Parametric, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.ParametricBufferGeometry : three.ParametricGeometry)(params.geometry.func, params.geometry.slices, params.geometry.stacks);
    }
  }]);
  return Parametric;
}(MeshComponent), _class$24.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    func: function func(u, v) {
      return new three.Vector3(u, v, 0);
    },
    slices: 10,
    stacks: 10
  }
}), _temp$24);

var _class$25;
var _temp$25;

var Plane$1 = (_temp$25 = _class$25 = function (_MeshComponent) {
  inherits(Plane$$1, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Plane#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     width: 10,
   *     height: 10,
   *     wSegments: 1,
   *     hSegments: 1
   *   }
   * }
   * </pre>
   */
  function Plane$$1() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Plane$$1);

    var _this = possibleConstructorReturn(this, (Plane$$1.__proto__ || Object.getPrototypeOf(Plane$$1)).call(this, params, Plane$$1.defaults, Plane$$1.instructions));

    if (params.build) {
      _this.build(params);
      get(Plane$$1.prototype.__proto__ || Object.getPrototypeOf(Plane$$1.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Plane
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Plane#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['width', 'height', 'wSegments', 'hSegments']
   * }
   * </pre>
   */


  createClass(Plane$$1, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? three.PlaneBufferGeometry : three.PlaneGeometry)(params.geometry.width, params.geometry.height, params.geometry.wSegments, params.geometry.hSegments);

      return geometry;
    }
  }]);
  return Plane$$1;
}(MeshComponent), _class$25.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    width: 10,
    height: 10,
    wSegments: 1,
    hSegments: 1
  }
}), _class$25.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['width', 'height', 'wSegments', 'hSegments']
}), _temp$25);

var _class$26;
var _temp$26;

var verticesOfCube = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
var indicesOfFaces = [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4];

/**
 * @class Polyhedron
 * @category components/meshes
 * @description In elementary geometry, a polyhedron is a solid in three dimensions with flat polygonal faces, straight edges and sharp corners or vertices.
 * <br/><br/>
 * `Polyhedron` creates a Polyhedron by its `radius` and `detail`.
 * <br/><br/>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating an Polyhedron, and adding to app</caption>
 * new Polyhedron({
 *   geometry: {
 *     radius: 2,
 *     detail: 1
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: [0, 100, 0]
 * }).addTo(app);
 */

var Polyhedron = (_temp$26 = _class$26 = function (_MeshComponent) {
  inherits(Polyhedron, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Polyhedron#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     verticesOfCube: [
   *       -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
   *       -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1
   *     ],
   *
   *     indicesOfFaces: [
   *       2, 1, 0, 0, 3, 2,
   *       0, 4, 7, 7, 3, 0,
   *       0, 1, 5, 5, 4, 0,
   *       1, 2, 6, 6, 5, 1,
   *       2, 3, 7, 7, 6, 2,
   *       4, 5, 6, 6, 7, 4
   *     ],
   *
   *     radius: 6,
   *     detail: 2
   *   }
   * }
   * </pre>
   */
  function Polyhedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Polyhedron);

    var _this = possibleConstructorReturn(this, (Polyhedron.__proto__ || Object.getPrototypeOf(Polyhedron)).call(this, params, Polyhedron.defaults, Polyhedron.instructions));

    if (params.build) {
      _this.build(params);
      get(Polyhedron.prototype.__proto__ || Object.getPrototypeOf(Polyhedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Polyhedron
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Polyhedron#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['verticesOfCube', 'indicesOfFaces', 'radius', 'detail']
   * }
   * </pre>
   */


  createClass(Polyhedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.PolyhedronBufferGeometry : three.PolyhedronGeometry)(params.geometry.verticesOfCube, params.geometry.indicesOfFaces, params.geometry.radius, params.geometry.detail);
    }
  }]);
  return Polyhedron;
}(MeshComponent), _class$26.verticesOfCube = verticesOfCube, _class$26.indicesOfFaces = indicesOfFaces, _class$26.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    verticesOfCube: verticesOfCube,
    indicesOfFaces: indicesOfFaces,
    radius: 6,
    detail: 2
  }
}), _class$26.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['verticesOfCube', 'indicesOfFaces', 'radius', 'detail']
}), _temp$26);

var _class$27;
var _temp$27;

var Ring = (_temp$27 = _class$27 = function (_MeshComponent) {
  inherits(Ring, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Ring#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     innerRadius: 0,
   *     outerRadius: 50,
   *     thetaSegments: 8,
   *     phiSegments: 8,
   *     thetaStart: 0,
   *     thetaLength: Math.PI * 2
   *   }
   * }
   * </pre>
   */
  function Ring() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Ring);

    var _this = possibleConstructorReturn(this, (Ring.__proto__ || Object.getPrototypeOf(Ring)).call(this, params, Ring.defaults, Ring.instructions));

    if (params.build) {
      _this.build(params);
      get(Ring.prototype.__proto__ || Object.getPrototypeOf(Ring.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Ring
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Ring#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: [
   *     'innerRadius',
   *     'outerRadius',
   *     'thetaSegments',
   *     'phiSegments',
   *     'thetaStart',
   *     'thetaLength'
   *   ]
   * }
   * </pre>
   */


  createClass(Ring, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.RingBufferGeometry : three.RingGeometry)(params.geometry.innerRadius, params.geometry.outerRadius, params.geometry.thetaSegments, params.geometry.phiSegments, params.geometry.thetaStart, params.geometry.thetaLength);
    }
  }]);
  return Ring;
}(MeshComponent), _class$27.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    innerRadius: 0,
    outerRadius: 50,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  }
}), _class$27.instructions = _extends({}, MeshComponent.defaults, {
  geometry: ['innerRadius', 'outerRadius', 'thetaSegments', 'phiSegments', 'thetaStart', 'thetaLength']
}), _temp$27);

var _class$28;
var _temp$28;

var Shape = (_temp$28 = _class$28 = function (_MeshComponent) {
  inherits(Shape, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Shape#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     shapes: []
   * }
   * </pre>
   */
  function Shape() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Shape);

    var _this = possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, params, Shape.defaults, Shape.instructions));

    if (params.build) {
      _this.build(params);
      get(Shape.prototype.__proto__ || Object.getPrototypeOf(Shape.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Shape
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Shape#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['shapes']
   * }
   * </pre>
   */


  createClass(Shape, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.ShapeBufferGeometry : three.ShapeGeometry)(params.geometry.shapes);
    }
  }]);
  return Shape;
}(MeshComponent), _class$28.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    shapes: []
  }
}), _class$28.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['shapes']
}), _temp$28);

var _class$29;
var _temp$29;

var Sphere = (_temp$29 = _class$29 = function (_MeshComponent) {
  inherits(Sphere, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Sphere#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 1,
   *     widthSegments: 8,
   *     heightSegments: 6
   * }
   * </pre>
   */
  function Sphere() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Sphere);
    return possibleConstructorReturn(this, (Sphere.__proto__ || Object.getPrototypeOf(Sphere)).call(this, params, Sphere.defaults, Sphere.instructions));
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Sphere
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Sphere#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['radius', 'widthSegments', 'heightSegments']
   * }
   * </pre>
   */


  createClass(Sphere, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? three.SphereBufferGeometry : three.SphereGeometry)(params.geometry.radius, params.geometry.widthSegments, params.geometry.heightSegments);

      return geometry;
    }
  }]);
  return Sphere;
}(MeshComponent), _class$29.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radius: 1,
    widthSegments: 8,
    heightSegments: 6
  }
}), _class$29.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'widthSegments', 'heightSegments']
}), _temp$29);

var _class$30;
var _temp$30;

var Tetrahedron = (_temp$30 = _class$30 = function (_MeshComponent) {
  inherits(Tetrahedron, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Tetrahedron#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 1,
   *     detail: 0
   * }
   * </pre>
   */
  function Tetrahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Tetrahedron);

    var _this = possibleConstructorReturn(this, (Tetrahedron.__proto__ || Object.getPrototypeOf(Tetrahedron)).call(this, params, Tetrahedron.defaults, Tetrahedron.instructions));

    if (params.build) {
      _this.build(params);
      get(Tetrahedron.prototype.__proto__ || Object.getPrototypeOf(Tetrahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Tetrahedron
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Tetrahedron#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['radius', 'detail']
   * }
   * </pre>
   */


  createClass(Tetrahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? three.TetrahedronBufferGeometry : three.TetrahedronGeometry)(params.geometry.radius, params.geometry.detail);
    }
  }]);
  return Tetrahedron;
}(MeshComponent), _class$30.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radius: 1,
    detail: 0
  }
}), _class$30.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'detail']
}), _temp$30);

var _class$31;
var _temp$31;

var Text = (_temp$31 = _class$31 = function (_MeshComponent) {
  inherits(Text, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Text#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     text: 'Hello World!',
   *     loader: new FontLoader(),
   *
   *     parameters: {
   *       size: 12,
   *       height: 50,
   *       curveSegments: 12,
   *       font: new Font(),
   *       bevelEnabled: false,
   *       bevelThickness: 10,
   *       bevelSize: 8
   *     }
   *   }
   * }
   * </pre>
   */
  function Text() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Text);

    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, params, Text.defaults, Text.instructions));

    if (params.build) {
      _this.build(params);
      get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Text
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Text#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['text', 'loader', 'parameters']
   * }
   * </pre>
   */


  createClass(Text, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var promise = new Promise(function (resolve) {
        three.FontLoader.load(params.geometry.parameters.font, function (font) {
          params.geometry.parameters.font = font;

          var _applyBridge = _this2.applyBridge({
            geometry: new three.TextGeometry(params.geometry.text, params.geometry.parameters),

            material: params.material
          }),
              geometry = _applyBridge.geometry,
              material = _applyBridge.material;

          resolve(_this2.applyBridge({
            mesh: new three.Mesh(geometry, material)
          }).mesh);
        });
      });

      get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }]);
  return Text;
}(MeshComponent), _class$31.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    text: 'Hello World!',
    loader: new three.FontLoader(),

    parameters: {
      size: 12,
      height: 50,
      curveSegments: 12,
      font: new three.Font(),
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8
    }
  }
}), _class$31.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['text', 'loader', 'parameters']
}), _temp$31);

var _class$32;
var _temp$32;

var Torus = (_temp$32 = _class$32 = function (_MeshComponent) {
  inherits(Torus, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Torus#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 100,
   *     tube: 40,
   *     radialSegments: 8,
   *     tubularSegments: 6,
   *     arc: Math.PI * 2
   *   }
   * }
   * </pre>
   */
  function Torus() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Torus);

    var _this = possibleConstructorReturn(this, (Torus.__proto__ || Object.getPrototypeOf(Torus)).call(this, params, Torus.defaults, Torus.instructions));

    if (params.build) {
      _this.build(params);
      get(Torus.prototype.__proto__ || Object.getPrototypeOf(Torus.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Torus
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Torus#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: [
   *     'radius',
   *     'tube',
   *     'radialSegments',
   *     'tubularSegments',
   *     'arc'
   *   ]
   * }
   * </pre>
   */


  createClass(Torus, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new three.TorusGeometry(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.arc);
    }
  }]);
  return Torus;
}(MeshComponent), _class$32.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radius: 100,
    tube: 40,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2
  }
}), _class$32.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'tube', 'radialSegments', 'tubularSegments', 'arc']
}), _temp$32);

var _class$33;
var _temp$33;

var Torusknot = (_temp$33 = _class$33 = function (_MeshComponent) {
  inherits(Torusknot, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Torusknot#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 100,
   *     tube: 40,
   *     radialSegments: 64,
   *     tubularSegments: 8,
   *     p: 2,
   *     q: 3
   *   }
   * }
   * </pre>
   */
  function Torusknot() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Torusknot);

    var _this = possibleConstructorReturn(this, (Torusknot.__proto__ || Object.getPrototypeOf(Torusknot)).call(this, params, Torusknot.defaults, Torusknot.instructions));

    if (params.build) {
      _this.build(params);
      get(Torusknot.prototype.__proto__ || Object.getPrototypeOf(Torusknot.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Torusknot
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Torusknot#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: [
   *     'radius',
   *     'tube',
   *     'radialSegments',
   *     'tubularSegments',
   *     'p',
   *     'q'
   *   ]
   * }
   * </pre>
   */


  createClass(Torusknot, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer ? three.TorusKnotBufferGeometry : three.TorusKnotGeometry;

      return new GConstruct(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.p, params.geometry.q);
    }
  }]);
  return Torusknot;
}(MeshComponent), _class$33.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    radius: 100,
    tube: 40,
    radialSegments: 64,
    tubularSegments: 8,
    p: 2,
    q: 3
  }
}), _class$33.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['radius', 'tube', 'radialSegments', 'tubularSegments', 'p', 'q']
}), _temp$33);

var _class$34;
var _temp$34;

var Tube = (_temp$34 = _class$34 = function (_MeshComponent) {
  inherits(Tube, _MeshComponent);

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Tube#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     path: new THREE.LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, 1)),
   *     segments: 20,
   *     radius: 2,
   *     radiusSegments: 8,
   *     closed: false
   *   }
   * }
   * </pre>
   */
  function Tube() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Tube);

    var _this = possibleConstructorReturn(this, (Tube.__proto__ || Object.getPrototypeOf(Tube)).call(this, params, Tube.defaults, Tube.instructions));

    if (params.build) {
      _this.build(params);
      get(Tube.prototype.__proto__ || Object.getPrototypeOf(Tube.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Tube
   */


  /**
   * Instructions
   * @member {Object} module:components/meshes.Tube#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: [
   *     'path',
   *     'segments',
   *     'radius',
   *     'radiusSegments',
   *     'closed'
   *   ]
   * }
   * </pre>
   */


  createClass(Tube, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new three.Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? three.TubeBufferGeometry : three.TubeGeometry)(params.geometry.path, params.geometry.segments, params.geometry.radius, params.geometry.radiusSegments, params.geometry.closed);

      return geometry;
    }
  }]);
  return Tube;
}(MeshComponent), _class$34.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    path: new three.LineCurve3(new three.Vector3(0, 0, 0), new three.Vector3(0, 0, 1)),
    segments: 20,
    radius: 2,
    radiusSegments: 8,
    closed: false
  }
}), _class$34.instructions = _extends({}, MeshComponent.instructions, {
  geometry: ['path', 'segments', 'radius', 'radiusSegments', 'closed']
}), _temp$34);

var Group = function (_MeshComponent) {
  inherits(Group, _MeshComponent);

  function Group() {
    classCallCheck(this, Group);

    var _this = possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, {}));

    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }

    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];

      if (obj instanceof Component) obj.addTo(_this);else if (obj instanceof three.Object3D) _this.native.add(obj);
    }
    return _this;
  }

  createClass(Group, [{
    key: 'build',
    value: function build() {
      return new three.Object3D();
    }
  }]);
  return Group;
}(MeshComponent);

/** @module components/meshes */

/**
 * @class ElementModule
 * @category modules/app
 * @param {Object} [container=document.body] container is the DOM object to which application's canvas will be added to.
 * @memberof module:modules/app
 * @example <caption>Creating an element module, passing it to the App</caption>
 * new App([
 *   new ElementModule(document.getElementById('app'))
 * ]);
 */
var ElementModule = function () {
  function ElementModule() {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    classCallCheck(this, ElementModule);

    if (container.container) {
      console.warn('ElementModule now accepts only argument which is a DOM object, not a params object.');
      this.container = container.container;
    } else this.container = container;

    this.createElement();
  }

  /**
   * @method createElement
   * @instance
   * @description Creates a canvas element.
   * @memberof module:modules/app.ResizeModule
   */


  createClass(ElementModule, [{
    key: 'createElement',
    value: function createElement() {
      this.element = window.document.createElement('div');

      this.element.className = 'whs-app';
      this.element.style.width = 'inherit';
      this.element.style.height = 'inherit';
      this.element.style.position = 'relative';
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.set('element', this.element);
      _manager.set('container', this.container);
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      self.container.appendChild(self.element);
    }
  }]);
  return ElementModule;
}();

var _class$35;
var _temp$35;
var _initialiseProps;

var RenderingModule = (_temp$35 = _class$35 = function () {
  function RenderingModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { shadow: false },
        isShadow = _ref.shadow;

    classCallCheck(this, RenderingModule);

    _initialiseProps.call(this);

    this.params = Object.assign({
      width: window.innerWidth,
      height: window.innerHeight,

      resolution: new three.Vector2(1, 1),
      pixelRatio: window.devicePixelRatio,

      bgColor: 0x000000,
      bgOpacity: 1,

      renderer: {}
    }, params);

    var _params = this.params,
        bgColor = _params.bgColor,
        bgOpacity = _params.bgOpacity,
        renderer = _params.renderer,
        pixelRatio = _params.pixelRatio,
        width = _params.width,
        height = _params.height,
        resolution = _params.resolution;


    this.renderer = new three.WebGLRenderer(renderer);
    this.effects = [];
    this.applyAdditional('shadow', isShadow);

    this.renderer.setClearColor(bgColor, bgOpacity);

    if (pixelRatio) this.renderer.setPixelRatio(pixelRatio);

    this.setSize(Number(width * resolution.x).toFixed(), Number(height * resolution.y).toFixed());
  }

  createClass(RenderingModule, [{
    key: 'applyAdditional',
    value: function applyAdditional(name) {
      var isApplied = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!isApplied) return;
      RenderingModule.additional[name].apply(this, [this.renderer]);
    }
  }, {
    key: 'integrateRenderer',
    value: function integrateRenderer(element, scene, camera) {
      var _this = this;

      this.scene = scene;
      this.camera = camera;
      this.renderLoop = new Loop(function () {
        return _this.renderer.render(_this.scene, _this.camera);
      });
      this.attachToCanvas(element);

      return this.renderLoop;
    }
  }, {
    key: 'effect',
    value: function effect(_effect, cb) {
      var _this2 = this;

      this.defer.then(function () {
        _this2.renderLoop.stop();

        var size = _this2.renderer.getSize();
        _effect.setSize(size.width, size.height);

        var loop = new Loop(cb ? cb : function () {
          _effect.render(_this2.scene, _this2.camera);
        });

        _this2.effects.push(loop);
        if (_this2.enabled) loop.start(_this2.app);
      });
    }

    /**
     * @method setSize
     * @description Update render target width and height.
     * @param {Number} width
     * @param {Number} height
     * @memberof module:modules/app.RenderingModule
     */

  }, {
    key: 'setSize',
    value: function setSize(width, height) {
      if (this.renderer) this.renderer.setSize(width, height);
    }
  }, {
    key: 'attachToCanvas',
    value: function attachToCanvas(element) {
      var canvas = this.renderer.domElement;

      // attach to new parent world dom
      element.appendChild(canvas);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.enabled = false;
      this.renderLoop.stop();
      this.effects.forEach(function (loop) {
        return loop.stop();
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.renderLoop.start();
      this.effects.forEach(function (loop) {
        return loop.start();
      });
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      var _this3 = this;

      _manager.define('rendering');
      _manager.set('renderer', this.renderer);

      this.app = _manager.handler;

      this.renderLoop = this.integrateRenderer(_manager.get('element'), _manager.get('scene'), _manager.get('camera').native);

      _manager.update({
        element: function element(_element) {
          _this3.attachToCanvas(_element);
        },
        scene: function scene(_scene) {
          _this3.scene = _scene;
        },
        camera: function camera(_camera) {
          _this3.camera = _camera.native;
        }
      });

      this.resolve();
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      var _this4 = this;

      self.renderLoop.start(this);
      self.effects.forEach(function (loop) {
        return loop.start(_this4);
      });
    }
  }, {
    key: 'dispose',
    value: function dispose(self) {
      var _this5 = this;

      self.renderLoop.stop(this);
      self.effects.forEach(function (loop) {
        return loop.stop(_this5);
      });
      self.renderer.forceContextLoss();
    }
  }]);
  return RenderingModule;
}(), _class$35.additional = {
  shadow: function shadow(renderer) {
    renderer.shadowMap.enabled = true;
  }
}, _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this.enabled = true;
  this.defer = new Promise(function (resolve) {
    _this6.resolve = resolve;
  });
}, _temp$35);

var SceneModule = function () {
  function SceneModule() {
    var willSceneBeReplaced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    classCallCheck(this, SceneModule);

    this.scene = willSceneBeReplaced ? null : new three.Scene();
  }

  createClass(SceneModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.set('scene', this.scene);
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      this.children = [];

      this.add = function (object) {
        var _this = this;

        object.parent = this;

        return new Promise(function (resolve, reject) {
          object.defer(function () {
            var native = object.native;

            if (!native) reject();

            var addPromise = _this.applyBridge({ onAdd: object }).onAdd;

            var resolver = function resolver() {
              self.scene.add(native);
              _this.children.push(object);

              resolve(object);
            };

            if (addPromise instanceof Promise) addPromise.then(resolver);else resolver();
          });
        });
      };

      this.remove = function (object) {
        object.parent = null;
        self.scene.remove(object.native);
      };

      this.setScene = function (scene) {
        self.scene = scene;
        this.manager.set('scene', scene);
      };
    }
  }]);
  return SceneModule;
}();

// import {addResizeListener} from 'detect-element-resize';

/**
 * @class ResizeModule
 * @category modules/app
 * @param {Object} [params={auto: true}] - If auto is set to true - resize will be triggered when container resizes
 * @memberof module:modules/app
 */
var ResizeModule = function () {
  function ResizeModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, ResizeModule);

    this.params = Object.assign({
      auto: true
    }, params);

    this.callbacks = [this.setSize.bind(this)];
  }

  /**
   * @function setSize
   * @instance
   * @description This function sets the provided width & height to the renderer object.
   * @param {Number} [width=1] - The promise that should be added to a queue.
   * @param {Number} [height=1] - that is resolved when all promises completed.
   * @memberof module:modules/app.ResizeModule
   */


  createClass(ResizeModule, [{
    key: 'setSize',
    value: function setSize() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      this.camera.native.aspect = width / height;
      this.camera.native.updateProjectionMatrix();

      if (this.rendering) this.rendering.setSize(width, height);
    }

    /**
     * @method trigger
     * @instance
     * @description Triggers resize when called. width & height are determined automatically
     * This invokes each callbacks with the new width and height as params
     * @memberof module:modules/app.ResizeModule
     */

  }, {
    key: 'trigger',
    value: function trigger() {
      var _container = this.container,
          offsetWidth = _container.offsetWidth,
          offsetHeight = _container.offsetHeight,
          resolution = this.resolution;


      var width = Number(offsetWidth * resolution.x).toFixed();
      var height = Number(offsetHeight * resolution.y).toFixed();

      this.callbacks.forEach(function (cb) {
        cb(width, height);
      });
    }

    /**
     * @method addAutoresize
     * @instance
     * @description Sets module to autoresize, this adds an event listene on window resize to trigger the resize
     * @memberof module:modules/app.ResizeModule
     */

  }, {
    key: 'addAutoresize',
    value: function addAutoresize() {
      this.container = this.getContainer();
      this.resolution = this.getResolution();

      if (this.params.auto) window.addEventListener('resize', this.trigger.bind(this));
    }

    /**
     * @method addCallback
     * @instance
     * @description Adds a call back function to the existing callbacks list.
     * @param {Function} func - The callback function to add
     * @memberof module:modules/app.ResizeModule
     */

  }, {
    key: 'addCallback',
    value: function addCallback(func) {
      this.callbacks.push(func);
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('resize');

      this.rendering = _manager.get('renderer');
      this.camera = _manager.get('camera');

      this.getResolution = function () {
        return _manager.use('rendering').params.resolution;
      };
      this.getContainer = function () {
        return _manager.get('container');
      };

      this.addAutoresize();
    }
  }]);
  return ResizeModule;
}();

/**
 * The Kawase blur kernel presets.
 *
 * @type {Float32Array[]}
 * @private
 */

const fragment$5 = "uniform sampler2D tDiffuse;\r\nuniform float opacity;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tgl_FragColor = opacity * texel;\r\n\r\n}\r\n";
const vertex$5 = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A simple copy shader material.
 */

class CopyMaterial extends three.ShaderMaterial {

	/**
	 * Constructs a new copy material.
	 */

	constructor() {

		super({

			type: "CopyMaterial",

			uniforms: {

				tDiffuse: new three.Uniform(null),
				opacity: new three.Uniform(1.0)

			},

			fragmentShader: fragment$5,
			vertexShader: vertex$5,

			depthWrite: false,
			depthTest: false

		});

	}

}

/**
 * A collection of shader materials that are used in the post processing passes.
 *
 * @module postprocessing/materials
 */

class Pass {

	/**
	 * Constructs a new pass.
	 *
	 * @param {Scene} [scene] - The scene to render.
	 * @param {Camera} [camera] - The camera.
	 * @param {Mesh} [quad] - A quad that fills the screen to render 2D filter effects. Set this to null, if you don't need it (see {@link RenderPass}).
	 */

	constructor(
		scene = new three.Scene(),
		camera = new three.OrthographicCamera(-1, 1, 1, -1, 0, 1),
		quad = new three.Mesh(new three.PlaneBufferGeometry(2, 2), null)
	) {

		/**
		 * The name of this pass.
		 *
		 * @type {String}
		 */

		this.name = "Pass";

		/**
		 * The scene to render.
		 *
		 * @type {Scene}
		 * @protected
		 * @default new Scene()
		 */

		this.scene = scene;

		/**
		 * The camera.
		 *
		 * @type {Camera}
		 * @protected
		 * @default new OrthographicCamera(-1, 1, 1, -1, 0, 1)
		 */

		this.camera = camera;

		/**
		 * A quad mesh that fills the screen.
		 *
		 * Assign your shader material to this mesh!
		 *
		 * @type {Mesh}
		 * @protected
		 * @default new Mesh(new PlaneBufferGeometry(2, 2), null)
		 * @example this.quad.material = this.myMaterial;
		 */

		this.quad = quad;

		if(this.quad !== null) {

			this.quad.frustumCulled = false;

			if(this.scene !== null) {

				this.scene.add(this.quad);

			}

		}

		/**
		 * Indicates whether the read and write buffers should be swapped after this
		 * pass has finished rendering.
		 *
		 * Set this to true if this pass renders to the write buffer so that a
		 * following pass can find the result in the read buffer.
		 *
		 * @type {Boolean}
		 * @default false
		 */

		this.needsSwap = false;

		/**
		 * Enabled flag.
		 *
		 * @type {Boolean}
		 * @default true
		 */

		this.enabled = true;

		/**
		 * Render to screen flag.
		 *
		 * @type {Boolean}
		 * @default false
		 */

		this.renderToScreen = false;

	}

	/**
	 * Renders the effect.
	 *
	 * This is an abstract method that must be overridden.
	 *
	 * @abstract
	 * @throws {Error} An error is thrown if the method is not overridden.
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - A read buffer. Contains the result of the previous pass.
	 * @param {WebGLRenderTarget} writeBuffer - A write buffer. Normally used as the render target when the read buffer is used as input.
	 * @param {Number} [delta] - The delta time.
	 * @param {Boolean} [maskActive] - Indicates whether a stencil test mask is active or not.
	 */

	render(renderer, readBuffer, writeBuffer, delta, maskActive) {

		throw new Error("Render method not implemented!");

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * You may override this method in case you want to be informed about the main
	 * render size.
	 *
	 * The {@link EffectComposer} calls this method before this pass is
	 * initialised and every time its own size is updated.
	 *
	 * @param {Number} width - The renderer's width.
	 * @param {Number} height - The renderer's height.
	 * @example this.myRenderTarget.setSize(width, height);
	 */

	setSize(width, height) {}

	/**
	 * Performs initialisation tasks.
	 *
	 * By overriding this method you gain access to the renderer. You'll also be
	 * able to configure your custom render targets to use the appropriate format
	 * (RGB or RGBA).
	 *
	 * The provided renderer can be used to warm up special off-screen render
	 * targets by performing a preliminary render operation.
	 *
	 * The {@link EffectComposer} calls this method when this pass is added to its
	 * queue.
	 *
	 * @method initialise
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
	 * @example if(!alpha) { this.myRenderTarget.texture.format = RGBFormat; }
	 */

	initialise(renderer, alpha) {}

	/**
	 * Performs a shallow search for properties that define a dispose method and
	 * deletes them. The pass will be inoperative after this method was called!
	 *
	 * Disposable objects:
	 *  - render targets
	 *  - materials
	 *  - textures
	 *
	 * The {@link EffectComposer} calls this method when it is being destroyed.
	 * You may, however, use it independently to free memory when you are certain
	 * that you don't need this pass anymore.
	 */

	dispose() {

		const keys = Object.keys(this);

		let key;

		for(key of keys) {

			if(this[key] !== null && typeof this[key].dispose === "function") {

				this[key].dispose();
				this[key] = null;

			}

		}

	}

}

const color = new three.Color();

/**
 * A clear pass.
 *
 * You can prevent specific buffers from being cleared by setting either the
 * autoClearColor, autoClearStencil or autoClearDepth properties of the renderer
 * to false.
 */

class ClearPass extends Pass {

	/**
	 * Constructs a new clear pass.
	 *
	 * @param {Object} [options] - Additional options.
	 * @param {Color} [options.clearColor=null] - An override clear color.
	 * @param {Number} [options.clearAlpha=0.0] - An override clear alpha.
	 */

	constructor(options = {}) {

		super(null, null, null);

		/**
		 * The name of this pass.
		 */

		this.name = "ClearPass";

		/**
		 * Clear color.
		 *
		 * @type {Color}
		 * @default null
		 */

		this.clearColor = (options.clearColor !== undefined) ? options.clearColor : null;

		/**
		 * Clear alpha.
		 *
		 * @type {Number}
		 * @default 0.0
		 */

		this.clearAlpha = (options.clearAlpha !== undefined) ? options.clearAlpha : 0.0;

	}

	/**
	 * Clears the read buffer or the screen.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 */

	render(renderer, readBuffer) {

		const clearColor = this.clearColor;

		let clearAlpha;

		if(clearColor !== null) {

			color.copy(renderer.getClearColor());
			clearAlpha = renderer.getClearAlpha();
			renderer.setClearColor(clearColor, this.clearAlpha);

		}

		renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
		renderer.clear();

		if(clearColor !== null) {

			renderer.setClearColor(color, clearAlpha);

		}

	}

}

class ClearMaskPass extends Pass {

	/**
	 * Constructs a new clear mask pass.
	 */

	constructor() {

		super(null, null, null);

		/**
		 * The name of this pass.
		 */

		this.name = "ClearMaskPass";

	}

	/**
	 * Disables the stencil test.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 */

	render(renderer) {

		renderer.state.buffers.stencil.setTest(false);

	}

}

function randomInt(low, high) {

	return low + Math.floor(Math.random() * (high - low + 1));

}

/**
 * Returns a random float in the specified range.
 *
 * @private
 * @static
 * @param {Number} low - The lowest possible value.
 * @param {Number} high - The highest possible value.
 * @return {Number} The random value.
 */

function randomFloat(low, high) {

	return low + Math.random() * (high - low);

}

/**
 * A glitch pass.
 */



/**
 * A glitch mode enumeration.
 *
 * @type {Object}
 * @property {Number} SPORADIC - Sporadic glitches.
 * @property {Number} CONSTANT_MILD - Constant mild glitches.
 * @property {Number} CONSTANT_WILD - Constant wild glitches.
 */

const GlitchMode = {

	SPORADIC: 0,
	CONSTANT_MILD: 1,
	CONSTANT_WILD: 2

};

class RenderPass extends Pass {

	/**
	 * Constructs a new render pass.
	 *
	 * @param {Scene} scene - The scene to render.
	 * @param {Camera} camera - The camera to use to render the scene.
	 * @param {Object} [options] - Additional options.
	 * @param {Material} [options.overrideMaterial=null] - An override material for the scene.
	 * @param {Color} [options.clearColor=null] - An override clear color.
	 * @param {Number} [options.clearAlpha=1.0] - An override clear alpha.
	 * @param {Boolean} [options.clearDepth=false] - Whether depth should be cleared explicitly.
	 * @param {Boolean} [options.clear=true] - Whether all buffers should be cleared.
	 */

	constructor(scene, camera, options = {}) {

		super(scene, camera, null);

		/**
		 * The name of this pass.
		 */

		this.name = "RenderPass";

		/**
		 * A clear pass.
		 *
		 * @type {ClearPass}
		 */

		this.clearPass = new ClearPass(options);

		/**
		 * An override material.
		 *
		 * @type {Material}
		 * @default null
		 */

		this.overrideMaterial = (options.overrideMaterial !== undefined) ? options.overrideMaterial : null;

		/**
		 * Indicates whether the depth buffer should be cleared explicitly.
		 *
		 * @type {Boolean}
		 * @default false
		 */

		this.clearDepth = (options.clearDepth !== undefined) ? options.clearDepth : false;

		/**
		 * Indicates whether the color, depth and stencil buffers should be cleared.
		 *
		 * Even with clear set to true you can prevent specific buffers from being
		 * cleared by setting either the autoClearColor, autoClearStencil or
		 * autoClearDepth properties of the renderer to false.
		 *
		 * @type {Boolean}
		 * @default true
		 */

		this.clear = (options.clear !== undefined) ? options.clear : true;

	}

	/**
	 * Renders the scene.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 */

	render(renderer, readBuffer) {

		const scene = this.scene;
		const target = this.renderToScreen ? null : readBuffer;

		if(this.clear) {

			this.clearPass.render(renderer, target);

		} else if(this.clearDepth) {

			renderer.setRenderTarget(target);
			renderer.clearDepth();

		}

		scene.overrideMaterial = this.overrideMaterial;
		renderer.render(scene, this.camera, target);
		scene.overrideMaterial = null;

	}

}

class MaskPass extends Pass {

	/**
	 * Constructs a new mask pass.
	 *
	 * @param {Scene} scene - The scene to render.
	 * @param {Camera} camera - The camera to use.
	 */

	constructor(scene, camera) {

		super(scene, camera, null);

		/**
		 * The name of this pass.
		 */

		this.name = "MaskPass";

		/**
		 * Inverse flag.
		 *
		 * @type {Boolean}
		 * @default false
		 */

		this.inverse = false;

		/**
		 * Stencil buffer clear flag.
		 *
		 * @type {Boolean}
		 * @default true
		 */

		this.clearStencil = true;

	}

	/**
	 * Creates a stencil bit mask.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		const context = renderer.context;
		const state = renderer.state;

		const scene = this.scene;
		const camera = this.camera;

		const writeValue = this.inverse ? 0 : 1;
		const clearValue = 1 - writeValue;

		// Don't update color or depth.
		state.buffers.color.setMask(false);
		state.buffers.depth.setMask(false);

		// Lock the buffers.
		state.buffers.color.setLocked(true);
		state.buffers.depth.setLocked(true);

		// Configure the stencil.
		state.buffers.stencil.setTest(true);
		state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
		state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
		state.buffers.stencil.setClear(clearValue);

		// Clear the stencil.
		if(this.clearStencil) {

			renderer.setRenderTarget(readBuffer);
			renderer.clearStencil();

			renderer.setRenderTarget(writeBuffer);
			renderer.clearStencil();

		}

		// Draw the mask into both buffers.
		renderer.render(scene, camera, readBuffer);
		renderer.render(scene, camera, writeBuffer);

		// Unlock the buffers.
		state.buffers.color.setLocked(false);
		state.buffers.depth.setLocked(false);

		// Only render where the stencil is set to 1.
		state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff);
		state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);

	}

}

class ShaderPass extends Pass {

	/**
	 * Constructs a new shader pass.
	 *
	 * @param {ShaderMaterial} material - The shader material to use.
	 * @param {String} [textureID="tDiffuse"] - The texture uniform identifier.
	 */

	constructor(material, textureID = "tDiffuse") {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "ShaderPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * The shader material to use for rendering.
		 *
		 * @type {ShaderMaterial}
		 */

		this.material = material;

		this.quad.material = this.material;

		/**
		 * The name of the color sampler uniform of the given material.
		 *
		 * @type {String}
		 * @default "tDiffuse"
		 */

		this.textureID = textureID;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		if(this.material.uniforms[this.textureID] !== undefined) {

			this.material.uniforms[this.textureID].value = readBuffer.texture;

		}

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

}

const v = new three.Vector3();

/**
 * A vector.
 *
 * @type {Vector3}
 * @private
 * @static
 * @final
 */

const ab = new three.Vector3();

/**
 * A shock wave pass.
 */

/**
 * A compilation of the post processing passes.
 *
 * @module postprocessing/passes
 */

class EffectComposer {

	/**
	 * Constructs a new effect composer.
	 *
	 * @param {WebGLRenderer} [renderer] - The renderer that should be used.
	 * @param {Object} [options] - The options.
	 * @param {Boolean} [options.depthBuffer=true] - Whether the main render targets should have a depth buffer.
	 * @param {Boolean} [options.stencilBuffer=false] - Whether the main render targets should have a stencil buffer.
	 * @param {Boolean} [options.depthTexture=false] - Set to true if one of your passes relies on a depth texture.
	 */

	constructor(renderer = null, options = {}) {

		/**
		 * The renderer.
		 *
		 * You may replace the renderer at any time by using
		 * {@link EffectComposer#replaceRenderer}.
		 *
		 * @type {WebGLRenderer}
		 */

		this.renderer = renderer;

		/**
		 * The read buffer.
		 *
		 * Reading from and writing to the same render target should be avoided.
		 * Therefore, two seperate yet identical buffers are used.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.readBuffer = null;

		/**
		 * The write buffer.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.writeBuffer = null;

		if(this.renderer !== null) {

			this.renderer.autoClear = false;

			this.readBuffer = this.createBuffer(
				(options.depthBuffer !== undefined) ? options.depthBuffer : true,
				(options.stencilBuffer !== undefined) ? options.stencilBuffer : false,
				(options.depthTexture !== undefined) ? options.depthTexture : false
			);

			this.writeBuffer = this.readBuffer.clone();

		}

		/**
		 * A copy pass used for copying masked scenes.
		 *
		 * @type {ShaderPass}
		 * @private
		 */

		this.copyPass = new ShaderPass(new CopyMaterial());

		/**
		 * The passes.
		 *
		 * @type {Pass[]}
		 * @private
		 */

		this.passes = [];

	}

	/**
	 * The depth texture of the read and write buffers.
	 *
	 * @type {DepthTexture}
	 * @default null
	 */

	get depthTexture() { return this.readBuffer.depthTexture; }

	/**
	 * The read and write buffers share a single depth texture. Depth will be
	 * written to this texture when something is rendered into one of the buffers
	 * and the involved materials have depth write enabled.
	 *
	 * You may enable this mechanism during the instantiation of the composer or
	 * by assigning a DepthTexture instance later on. You may also disable it by
	 * assigning null.
	 *
	 * @type {DepthTexture}
	 */

	set depthTexture(x) {

		this.readBuffer.depthTexture = x;
		this.writeBuffer.depthTexture = x;

	}

	/**
	 * Replaces the current renderer with the given one. The DOM element of the
	 * current renderer will automatically be removed from its parent node and the
	 * DOM element of the new renderer will take its place.
	 *
	 * The auto clear mechanism of the provided renderer will be disabled.
	 *
	 * Switching between renderers allows you to dynamically enable or disable
	 * antialiasing.
	 *
	 * @param {WebGLRenderer} renderer - The new renderer.
	 * @return {WebGLRenderer} The old renderer.
	 */

	replaceRenderer(renderer) {

		const oldRenderer = this.renderer;

		let parent, oldSize, newSize;

		if(oldRenderer !== null && oldRenderer !== renderer) {

			this.renderer = renderer;
			this.renderer.autoClear = false;

			parent = oldRenderer.domElement.parentNode;
			oldSize = oldRenderer.getSize();
			newSize = renderer.getSize();

			if(parent !== null) {

				parent.removeChild(oldRenderer.domElement);
				parent.appendChild(renderer.domElement);

			}

			if(oldSize.width !== newSize.width || oldSize.height !== newSize.height) {

				this.setSize();

			}

		}

		return oldRenderer;

	}

	/**
	 * Creates a new render target by replicating the renderer's canvas.
	 *
	 * The created render target uses a linear filter for texel minification and
	 * magnification. Its render texture format depends on whether the renderer
	 * uses the alpha channel. Mipmaps are disabled.
	 *
	 * @param {Boolean} depthBuffer - Whether the render target should have a depth buffer.
	 * @param {Boolean} stencilBuffer - Whether the render target should have a stencil buffer.
	 * @param {Boolean} depthTexture - Whether the render target should have a depth texture.
	 * @return {WebGLRenderTarget} A new render target that equals the renderer's canvas.
	 */

	createBuffer(depthBuffer, stencilBuffer, depthTexture) {

		const size = this.renderer.getSize();
		const pixelRatio = this.renderer.getPixelRatio();
		const alpha = this.renderer.context.getContextAttributes().alpha;

		const renderTarget = new three.WebGLRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
			minFilter: three.LinearFilter,
			magFilter: three.LinearFilter,
			format: alpha ? three.RGBAFormat : three.RGBFormat,
			depthBuffer: depthBuffer,
			stencilBuffer: stencilBuffer,
			depthTexture: depthTexture ? new three.DepthTexture() : null
		});

		if(depthTexture && stencilBuffer) {

			renderTarget.depthTexture.format = three.DepthStencilFormat;
			renderTarget.depthTexture.type = three.UnsignedInt248Type;

		}

		renderTarget.texture.name = "EffectComposer.Buffer";
		renderTarget.texture.generateMipmaps = false;

		return renderTarget;

	}

	/**
	 * Adds a pass, optionally at a specific index.
	 *
	 * @param {Pass} pass - A new pass.
	 * @param {Number} [index] - An index at which the pass should be inserted.
	 */

	addPass(pass, index) {

		const renderer = this.renderer;
		const size = renderer.getSize();
		const pixelRatio = renderer.getPixelRatio();

		pass.setSize(size.width * pixelRatio, size.height * pixelRatio);
		pass.initialise(renderer, renderer.context.getContextAttributes().alpha);

		if(index !== undefined) {

			this.passes.splice(index, 0, pass);

		} else {

			this.passes.push(pass);

		}

	}

	/**
	 * Removes a pass.
	 *
	 * @param {Pass} pass - The pass.
	 */

	removePass(pass) {

		this.passes.splice(this.passes.indexOf(pass), 1);

	}

	/**
	 * Renders all enabled passes in the order in which they were added.
	 *
	 * @param {Number} delta - The time between the last frame and the current one in seconds.
	 */

	render(delta) {

		const passes = this.passes;
		const renderer = this.renderer;
		const copyPass = this.copyPass;

		let readBuffer = this.readBuffer;
		let writeBuffer = this.writeBuffer;

		let maskActive = false;
		let pass, context, buffer;
		let i, l;

		for(i = 0, l = passes.length; i < l; ++i) {

			pass = passes[i];

			if(pass.enabled) {

				pass.render(renderer, readBuffer, writeBuffer, delta, maskActive);

				if(pass.needsSwap) {

					if(maskActive) {

						context = renderer.context;
						context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);
						copyPass.render(renderer, readBuffer, writeBuffer);
						context.stencilFunc(context.EQUAL, 1, 0xffffffff);

					}

					buffer = readBuffer;
					readBuffer = writeBuffer;
					writeBuffer = buffer;

				}

				if(pass instanceof MaskPass) {

					maskActive = true;

				} else if(pass instanceof ClearMaskPass) {

					maskActive = false;

				}

			}

		}

	}

	/**
	 * Sets the size of the buffers and the renderer's output canvas.
	 *
	 * Every pass will be informed of the new size. It's up to each pass how that
	 * information is used.
	 *
	 * If no width or height is specified, the render targets and passes will be
	 * updated with the current size of the renderer.
	 *
	 * @param {Number} [width] - The width.
	 * @param {Number} [height] - The height.
	 */

	setSize(width, height) {

		const passes = this.passes;
		const size = this.renderer.getSize();
		const pixelRatio = this.renderer.getPixelRatio();

		let i, l;

		if(width === undefined || height === undefined) {

			width = size.width;
			height = size.height;

		}

		this.renderer.setSize(width, height);

		width *= pixelRatio;
		height *= pixelRatio;

		this.readBuffer.setSize(width, height);
		this.writeBuffer.setSize(width, height);

		for(i = 0, l = passes.length; i < l; ++i) {

			passes[i].setSize(width, height);

		}

	}

	/**
	 * Resets this composer by deleting all passes and creating new buffers.
	 *
	 * @param {WebGLRenderTarget} [renderTarget] - A new render target. If none is provided, the settings of the renderer will be used.
	 */

	reset(renderTarget) {

		const depthBuffer = this.readBuffer.depthBuffer;
		const stencilBuffer = this.readBuffer.stencilBuffer;
		const depthTexture = (this.readBuffer.depthTexture !== null);

		this.dispose((renderTarget === undefined) ?
			this.createBuffer(depthBuffer, stencilBuffer, depthTexture) :
			renderTarget
		);

	}

	/**
	 * Destroys all passes and render targets.
	 *
	 * This method deallocates all render targets, textures and materials created
	 * by the passes. It also deletes this composer's frame buffers.
	 *
	 * @param {WebGLRenderTarget} [renderTarget] - A new render target. If none is provided, the composer will become inoperative.
	 */

	dispose(renderTarget) {

		const passes = this.passes;

		if(this.readBuffer !== null && this.writeBuffer !== null) {

			this.readBuffer.dispose();
			this.writeBuffer.dispose();

			this.readBuffer = null;
			this.writeBuffer = null;

		}

		while(passes.length > 0) {

			passes.pop().dispose();

		}

		if(renderTarget !== undefined) {

			// Reanimate.
			this.readBuffer = renderTarget;
			this.writeBuffer = this.readBuffer.clone();

		} else {

			this.copyPass.dispose();

		}

	}

}

/**
 * Core components.
 *
 * @module postprocessing/core
 */

/**
 * Exposure of the library components.
 *
 * @module postprocessing
 */

var polyfill = function polyfill(object, method) {
  var showWarn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (object[method]) return;
  if (showWarn) console.warn('@PostProcessorModule: pass.' + method + '() was not found.', object);
  object[method] = function () {};
};

var PostProcessorModule = function () {
  function PostProcessorModule() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { debug: true },
        debug = _ref.debug;

    classCallCheck(this, PostProcessorModule);
    this.currentPass = null;
    this.defer = new Promise(function (resolve) {
      _this.resolve = resolve;
    });

    this.debug = debug;
  }

  createClass(PostProcessorModule, [{
    key: 'manager',
    value: function manager(_manager) {
      var _this2 = this;

      _manager.define('postprocessor');

      this.effects = _manager.use('rendering').effects;
      this.renderer = _manager.get('renderer');
      this.scene = _manager.get('scene');
      this.camera = _manager.get('camera');

      this.composer = new EffectComposer(this.renderer);

      _manager.use('rendering').stop();

      var composer = this.composer;
      this.renderLoop = new Loop(function (clock) {
        return composer.render(clock.getDelta());
      }).start(_manager.handler);

      _manager.update({
        renderer: function renderer(_renderer) {
          _this2.composer.replaceRenderer(_renderer);
        },

        scene: function scene(_scene) {
          _this2.scene = _scene;
        },

        camera: function camera(_camera) {
          _this2.camera = _camera;
        }
      });

      this.resolve();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      this.defer.then(function () {
        var pass = new RenderPass(_this3.scene, _this3.camera.native);

        // TODO: Support for effects.

        _this3.composer.addPass(pass);
        _this3.currentPass = pass;
      });

      return this;
    }

    // API

  }, {
    key: 'pass',
    value: function pass(_pass) {
      var _this4 = this;

      this.defer.then(function () {
        polyfill(_pass, 'setSize', _this4.debug);
        polyfill(_pass, 'initialise', _this4.debug);

        _this4.composer.addPass(_pass);
        _this4.currentPass = _pass;
      });

      return this;
    }
  }, {
    key: 'shader',
    value: function shader(material) {
      var _this5 = this;

      var textureID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'readBuffer';

      this.defer.then(function () {
        if (!material.uniforms[textureID]) material.uniforms[textureID] = { value: null };

        var pass = new ShaderPass(material, textureID);
        _this5.composer.addPass(pass);
        _this5.currentPass = pass;
      });

      return this;
    }

    // Pass API

  }, {
    key: 'get',
    value: function get$$1(name) {
      return name ? this.composer.passes.filter(function (pass) {
        return pass.name === name;
      })[0] : this.currentPass;
    }
  }, {
    key: 'to',
    value: function to(name) {
      this.currentPass = name;
    }
  }, {
    key: 'renderToScreen',
    value: function renderToScreen() {
      var _this6 = this;

      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.defer.then(function () {
        _this6.currentPass.renderToScreen = bool;
      });

      return this;
    }
  }, {
    key: 'name',
    value: function name(_name) {
      var _this7 = this;

      this.defer.then(function () {
        _this7.currentPass.name = _name;
      });

      return this;
    }
  }]);
  return PostProcessorModule;
}();

var EventsPatchModule = function () {
  function EventsPatchModule() {
    classCallCheck(this, EventsPatchModule);
  }

  createClass(EventsPatchModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('events');
      this.element = _manager.get('renderer').domElement;
    }
  }, {
    key: 'patchEvents',
    value: function patchEvents(originObject, destObject) {
      var events = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      events.forEach(function (event) {
        return originObject.addEventListener(event, function (e) {
          return destObject.emit(event, e);
        });
      });
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      var element = self.element,
          patchEvents = self.patchEvents;


      patchEvents(element, this, ['mousemove', 'mouseup', 'contextmenu', 'mousedown', 'click', 'wheel', 'touchstart', 'touchend', 'touchmove', 'keydown']);

      patchEvents(element, this, ['keydown', 'keyup', 'keypress']);
    }
  }]);
  return EventsPatchModule;
}();

var VirtualMouseModule = function (_Events) {
  inherits(VirtualMouseModule, _Events);

  function VirtualMouseModule() {
    var globalMovement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    classCallCheck(this, VirtualMouseModule);

    var _this = possibleConstructorReturn(this, (VirtualMouseModule.__proto__ || Object.getPrototypeOf(VirtualMouseModule)).call(this));

    _this.mouse = new three.Vector2();
    _this.raycaster = new three.Raycaster();
    _this.world = null;
    _this.canvas = null;
    _this.projectionPlane = new three.Plane(new three.Vector3(0, 0, 1), 0);

    _this.globalMovement = globalMovement;
    return _this;
  }

  createClass(VirtualMouseModule, [{
    key: 'update',
    value: function update(e, customX, customY) {
      var rect = this.canvas.getBoundingClientRect();

      var x = customX || e.clientX;
      var y = customY || e.clientY;

      this.mouse.x = (x - rect.left) / (rect.right - rect.left) * 2 - 1;
      this.mouse.y = -((y - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

      this.projectionPlane.normal.copy(this.camera.getWorldDirection());

      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.emit('move');
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('mouse');
      _manager.require('events', function () {
        return new EventsPatchModule();
      });

      this.canvas = _manager.get('renderer').domElement;
      this.camera = _manager.get('camera').native;
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      var _this2 = this;

      ['click', 'mousedown', 'mouseup', 'mousemove'].forEach(function (ev) {
        return _this2.on(ev, function (e) {
          return self.emit(ev, e);
        });
      });

      self.globalX = 0;
      self.globalY = 0;

      this.on('mousemove', function (e) {
        if (document.pointerLockElement !== null) {
          self.globalX += e.movementX;
          self.globalY += e.movementY;

          self.update(e, self.globalX, self.globalY);
        } else self.update(e);
      });
    }
  }, {
    key: 'track',
    value: function track(component) {
      var _this3 = this;

      var isHovered = false;

      this.on('move', function () {
        if (_this3.hovers(component)) {
          if (isHovered) component.emit('mousemove');else {
            component.emit('mouseover');
            isHovered = true;
          }
        } else if (isHovered) {
          component.emit('mouseout');
          isHovered = false;
        }
      });

      this.on('click', function () {
        if (isHovered) component.emit('click');else component.emit('offClick');
      });

      this.on('mousedown', function () {
        if (isHovered) component.emit('mousedown');
      });

      this.on('mouseup', function () {
        if (isHovered) component.emit('mouseup');
      });
    }
  }, {
    key: 'intersection',
    value: function intersection(component) {
      return this.raycaster.intersectObject(component.native);
    }
  }, {
    key: 'project',
    value: function project() {
      var plane = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.projectionPlane;

      return this.raycaster.ray.intersectPlane(plane);
    }
  }, {
    key: 'hovers',
    value: function hovers(component) {
      var intersection = this.intersection(component)[0];
      return intersection ? intersection.object === component.native : false;
    }
  }, {
    key: 'ray',
    get: function get$$1() {
      return this.raycaster.ray;
    }
  }, {
    key: 'x',
    get: function get$$1() {
      return this.mouse.x;
    }
  }, {
    key: 'y',
    get: function get$$1() {
      return this.mouse.y;
    }
  }]);
  return VirtualMouseModule;
}(minivents_commonjs);

var ControlsModule = function () {
  createClass(ControlsModule, null, [{
    key: 'from',
    value: function from(controls) {
      return new ControlsModule({ controls: controls });
    }
  }]);

  function ControlsModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, ControlsModule);

    this.params = Object.assign({
      controls: false,
      fix: function fix(controls) {
        return controls;
      },

      update: function update(c) {
        this.controls.update(c.getDelta());
      }
    }, params);

    this.controls = this.params.controls;
    this.update = this.params.update;
  }

  createClass(ControlsModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.require('events', function () {
        return new EventsPatchModule();
      });
    }
  }, {
    key: 'setControls',
    value: function setControls(controls) {
      this.controls = controls;
      return this;
    }
  }, {
    key: 'setUpdate',
    value: function setUpdate(update) {
      this.update = update;
      return this;
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      self.updateLoop = new Loop(self.update.bind(self));
      self.updateLoop.start(this);
    }
  }]);
  return ControlsModule;
}();

var FogModule = function () {
  function FogModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var type = arguments[1];
    classCallCheck(this, FogModule);

    this.params = Object.assign({
      color: 0xefd1b5,
      density: 0.020,
      near: 10,
      far: 1000
    }, params);
    if (!type || type === 'exp2') this.fog = new three.FogExp2(this.params.color, this.params.density);else if (type === 'linear') this.fog = new three.Fog(this.params.color, this.params.near, this.params.far);
  }

  createClass(FogModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.set('fog', this.fog);
      _manager.get('scene').fog = this.fog;
    }
  }]);
  return FogModule;
}();

var isEqualDefault = function isEqualDefault(a, b) {
  if (a === b) return true;else if (a && a.equals && a.equals(b)) return true;

  return false;
};

/**
 * @class StateModule
 * @description `StateModule` is useful for apps, where you need state manipulation.
 * This can be: _transitions between screens, games, development moments_.
 * You can check [basic/state](https://whs-dev.surge.sh/examples/?basic/state) example.
 * @category modules/app
 * @param {Object} [params]
 * @memberof module:modules/app
 * @example <caption> Creating a state module</caption>
 * new App([
 *   // ...
 *   new StateModule().default({
 *     sphereColor: 0xff0000
 *   })
 * ]);
 */

var StateModule = function () {
  createClass(StateModule, null, [{
    key: 'actionGenerate',
    value: function actionGenerate(isEqual) {
      return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}, ''];
        var _ref = arguments[1];
        var key = _ref.key,
            data = _ref.data;

        if (isEqual(state[0][key], data)) return state;

        state[0][key] = data;
        state[1] = key;

        return state;
      };
    }
  }]);

  function StateModule() {
    var equalCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isEqualDefault;
    classCallCheck(this, StateModule);

    this.store = createStore(StateModule.actionGenerate(equalCheck));

    this.configuration = {};
    this.currentConfig = 'default';
    this.prevConfig = 'default';
  }

  /**
   * @method default
   * @description Add default configuration.
   * @param {Object} data Configuration setup
   * @memberof module:modules/app.StateModule
   * @example
   * new WHS.StateModule().default({
   *   sphereColor: UTILS.$colors.mesh,
   *   planeColor: 0x447F8B
   * })
   */


  createClass(StateModule, [{
    key: 'default',
    value: function _default(data) {
      this.config({ default: data });
      return this;
    }

    /**
     * @method setEqualCheck
     * @description Sets an equalCheck function
     * @param {Object} data Configuration setup
     * @memberof module:modules/app.StateModule
     */

  }, {
    key: 'setEqualCheck',
    value: function setEqualCheck(func) {
      this.store.replaceReducer(StateModule.actionGenerate(func));
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('state');
    }

    /**
     * @method config
     * @description Load configurations from object.
     * @param {Object} configs Configuration data
     * @memberof module:modules/app.StateModule
     * @example <caption> Adding `green` configuration</caption>
     * state.config({
     *   green: {
     *     sphereColor: 0x00ff00,
     *     planeColor: 0x00ff00
     *   }
     * });
     */

  }, {
    key: 'config',
    value: function config(configs) {
      for (var key in configs) {
        if (key) {
          this.configuration[key] = key === 'default' ? configs[key] : Object.assign({}, this.configuration.default, configs[key]);
        }
      }
    }

    /**
     * @method update
     * @description Load updates from object.
     * @param {Object} updates Updates data
     * @memberof module:modules/app.StateModule
     * @example <caption> Update callback for `sphereColor`</caption>
     * state.update({
     *   sphereColor: color => sphere.material.color.setHex(color)
     * });
     */

  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      var updates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.store.subscribe(function () {
        var _store$getState = _this.store.getState(),
            _store$getState2 = slicedToArray(_store$getState, 2),
            data = _store$getState2[0],
            changedKey = _store$getState2[1];

        var callback = updates[changedKey];

        if (callback) callback(data[changedKey]);
      });
    }

    /**
     * @method to
     * @description Switch to configuration.
     * @param {String} configName Configuration name.
     * @memberof module:modules/app.StateModule
     * @example <caption> Changes configuration to `green`</caption>
     * state.to('green');
     */

  }, {
    key: 'to',
    value: function to(configName) {
      this.prevConfig = this.currentConfig;
      this.currentConfig = configName;

      var config = this.configuration[configName] ? this.configuration[configName] : this.configuration.default;

      this.set(config);
    }

    /**
     * @method set
     * @description Set current parameters.
     * @param {Object} data Configuration parameters.
     * @memberof module:modules/app.StateModule
     * @example
     * state.set({
     *   sphereColor: 0x00ff00
     * });
     */

  }, {
    key: 'set',
    value: function set$$1(data) {
      for (var key in data) {
        if (key) this.store.dispatch({ type: 'ADD', key: key, data: data[key] });
      }
    }

    /**
     * @method get
     * @description Return data of parameter.
     * @param {String} key Parameter name.
     * @memberof module:modules/app.StateModule
     * @example
     * state.get('sphereColor'); // 0x00ff00
     */

  }, {
    key: 'get',
    value: function get$$1(key) {
      return this.store.getState()[0][key];
    }

    /**
     * @method prev
     * @description Return `trueVal` if `config` match previous configuration, in other case - return `falseVal`.
     * @param {String} config Configuration name.
     * @param {Any} trueVal Value returned if condition is truthy.
     * @param {Any} falseVal CValue returned if condition is falsy.
     * @memberof module:modules/app.StateModule
     */

  }, {
    key: 'prev',
    value: function prev(config, trueVal, falseVal) {
      return this.prevConfig === config ? trueVal : falseVal;
    }

    /**
     * @method current
     * @description Return `trueVal` if `config` match current configuration, in other case - return `falseVal`.
     * @param {String} config Configuration name.
     * @param {Any} trueVal Value returned if condition is truthy.
     * @param {Any} falseVal CValue returned if condition is falsy.
     * @memberof module:modules/app.StateModule
     */

  }, {
    key: 'current',
    value: function current(config, trueVal, falseVal) {
      return this.currentConfig === config ? trueVal : falseVal;
    }
  }]);
  return StateModule;
}();

var ThreeOrbitControls = function (_EventDispatcher) {
  inherits(ThreeOrbitControls, _EventDispatcher);

  function ThreeOrbitControls(object, domElement, eventHandler) {
    classCallCheck(this, ThreeOrbitControls);

    var _this = possibleConstructorReturn(this, (ThreeOrbitControls.__proto__ || Object.getPrototypeOf(ThreeOrbitControls)).call(this));

    _this.object = object;

    _this.domElement = domElement === undefined ? document : domElement;
    _this.eventHandler = eventHandler;

    // Set to false to disable this control
    _this.enabled = true;

    // "target" sets the location of focus, where the object orbits around
    _this.target = new three.Vector3();

    // How far you can dolly in and out ( PerspectiveCamera only )
    _this.minDistance = 0;
    _this.maxDistance = Infinity;

    // How far you can zoom in and out ( OrthographicCamera only )
    _this.minZoom = 0;
    _this.maxZoom = Infinity;

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    _this.minPolarAngle = 0; // radians
    _this.maxPolarAngle = Math.PI; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    _this.minAzimuthAngle = -Infinity; // radians
    _this.maxAzimuthAngle = Infinity; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    _this.enableDamping = false;
    _this.dampingFactor = 0.25;

    // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
    // Set to false to disable zooming
    _this.enableZoom = true;
    _this.zoomSpeed = 1.0;

    // Set to false to disable rotating
    _this.enableRotate = true;
    _this.rotateSpeed = 1.0;

    // Set to false to disable panning
    _this.enablePan = true;
    _this.keyPanSpeed = 7.0; // pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    // If auto-rotate is enabled, you must call controls.update() in your animation loop
    _this.autoRotate = false;
    _this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    // Set to false to disable use of the keys
    _this.enableKeys = true;

    // The four arrow keys
    _this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

    // Mouse buttons
    _this.mouseButtons = { ORBIT: three.MOUSE.LEFT, ZOOM: three.MOUSE.MIDDLE, PAN: three.MOUSE.RIGHT };

    // for reset
    _this.target0 = _this.target.clone();
    _this.position0 = _this.object.position.clone();
    _this.zoom0 = _this.object.zoom;

    //
    // public methods
    //

    _this.getPolarAngle = function () {
      return spherical.phi;
    };

    _this.getAzimuthalAngle = function () {
      return spherical.theta;
    };

    _this.reset = function () {
      _this.target.copy(_this.target0);
      _this.object.position.copy(_this.position0);
      _this.object.zoom = _this.zoom0;

      _this.object.updateProjectionMatrix();
      _this.dispatchEvent(changeEvent);

      _this.update();

      state = STATE.NONE;
    };

    // this method is exposed, but perhaps it would be better if we can make it private...
    _this.update = function () {
      var offset = new three.Vector3();

      // so camera.up is the orbit axis
      var quat = new three.Quaternion().setFromUnitVectors(object.up, new three.Vector3(0, 1, 0));
      var quatInverse = quat.clone().inverse();

      var lastPosition = new three.Vector3();
      var lastQuaternion = new three.Quaternion();

      return function () {
        var position = _this.object.position;

        offset.copy(position).sub(_this.target);

        // rotate offset to "y-axis-is-up" space
        offset.applyQuaternion(quat);

        // angle from z-axis around y-axis
        spherical.setFromVector3(offset);

        if (_this.autoRotate && state === STATE.NONE) rotateLeft(getAutoRotationAngle());

        spherical.theta += sphericalDelta.theta;
        spherical.phi += sphericalDelta.phi;

        // restrict theta to be between desired limits
        spherical.theta = Math.max(_this.minAzimuthAngle, Math.min(_this.maxAzimuthAngle, spherical.theta));

        // restrict phi to be between desired limits
        spherical.phi = Math.max(_this.minPolarAngle, Math.min(_this.maxPolarAngle, spherical.phi));

        spherical.makeSafe();

        spherical.radius *= scale;

        // restrict radius to be between desired limits
        spherical.radius = Math.max(_this.minDistance, Math.min(_this.maxDistance, spherical.radius));

        // move target to panned location
        _this.target.add(panOffset);

        offset.setFromSpherical(spherical);

        // rotate offset back to "camera-up-vector-is-up" space
        offset.applyQuaternion(quatInverse);

        position.copy(_this.target).add(offset);

        _this.object.lookAt(_this.target);

        if (_this.enableDamping === true) {
          sphericalDelta.theta *= 1 - _this.dampingFactor;
          sphericalDelta.phi *= 1 - _this.dampingFactor;
        } else sphericalDelta.set(0, 0, 0);

        scale = 1;
        panOffset.set(0, 0, 0);

        // update condition is:
        // min(camera displacement, camera rotation in radians)^2 > EPS
        // using small-angle approximation cos(x/2) = 1 - x^2 / 8

        if (zoomChanged || lastPosition.distanceToSquared(_this.object.position) > EPS || 8 * (1 - lastQuaternion.dot(_this.object.quaternion)) > EPS) {
          _this.dispatchEvent(changeEvent);

          lastPosition.copy(_this.object.position);
          lastQuaternion.copy(_this.object.quaternion);
          zoomChanged = false;

          return true;
        }

        return false;
      }();
    };

    _this.dispose = function () {
      _this.domElement.removeEventListener('contextmenu', onContextMenu, false);
      _this.domElement.removeEventListener('mousedown', onMouseDown, false);
      _this.domElement.removeEventListener('wheel', onMouseWheel, false);

      _this.domElement.removeEventListener('touchstart', onTouchStart, false);
      _this.domElement.removeEventListener('touchend', onTouchEnd, false);
      _this.domElement.removeEventListener('touchmove', onTouchMove, false);

      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);

      window.removeEventListener('keydown', onKeyDown, false);

      // this.dispatchEvent( { type: 'dispose' } ); // should this be added here?
    };

    //
    // internals
    //

    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };

    var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

    var state = STATE.NONE;

    var EPS = 0.000001;

    // current position in spherical coordinates
    var spherical = new three.Spherical();
    var sphericalDelta = new three.Spherical();

    var scale = 1;
    var panOffset = new three.Vector3();
    var zoomChanged = false;

    var rotateStart = new three.Vector2();
    var rotateEnd = new three.Vector2();
    var rotateDelta = new three.Vector2();

    var panStart = new three.Vector2();
    var panEnd = new three.Vector2();
    var panDelta = new three.Vector2();

    var dollyStart = new three.Vector2();
    var dollyEnd = new three.Vector2();
    var dollyDelta = new three.Vector2();

    var getAutoRotationAngle = function getAutoRotationAngle() {
      return 2 * Math.PI / 60 / 60 * _this.autoRotateSpeed;
    };

    var getZoomScale = function getZoomScale() {
      return Math.pow(0.95, _this.zoomSpeed);
    };

    var rotateLeft = function rotateLeft(angle) {
      sphericalDelta.theta -= angle;
    };

    var rotateUp = function rotateUp(angle) {
      sphericalDelta.phi -= angle;
    };

    var panLeft = function () {
      var v = new three.Vector3();

      return function (distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }();

    var panUp = function () {
      var v = new three.Vector3();

      return function (distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    }();

    // deltaX and deltaY are in pixels; right and down are positive
    var pan = function () {
      var offset = new three.Vector3();

      return function (deltaX, deltaY) {
        var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

        if (_this.object instanceof three.PerspectiveCamera) {
          // perspective
          var position = _this.object.position;
          offset.copy(position).sub(_this.target);
          var targetDistance = offset.length();

          // half of the fov is center to top of screen
          targetDistance *= Math.tan(_this.object.fov / 2 * Math.PI / 180.0);

          // we actually don't use screenWidth, since perspective camera is fixed to screen height
          panLeft(2 * deltaX * targetDistance / element.clientHeight, _this.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, _this.object.matrix);
        } else if (_this.object instanceof three.OrthographicCamera) {
          // orthographic
          panLeft(deltaX * (_this.object.right - _this.object.left) / _this.object.zoom / element.clientWidth, _this.object.matrix);
          panUp(deltaY * (_this.object.top - _this.object.bottom) / _this.object.zoom / element.clientHeight, _this.object.matrix);
        } else {
          // camera neither orthographic nor perspective
          console.warn('WARNING: OrbitControlsModule.js encountered an unknown camera type - pan disabled.');
          _this.enablePan = false;
        }
      };
    }();

    var dollyIn = function dollyIn(dollyScale) {
      if (_this.object instanceof three.PerspectiveCamera) scale /= dollyScale;else if (_this.object instanceof three.OrthographicCamera) {
        _this.object.zoom = Math.max(_this.minZoom, Math.min(_this.maxZoom, _this.object.zoom * dollyScale));
        _this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControlsModule.js encountered an unknown camera type - dolly/zoom disabled.');
        _this.enableZoom = false;
      }
    };

    var dollyOut = function dollyOut(dollyScale) {
      if (_this.object instanceof three.PerspectiveCamera) scale *= dollyScale;else if (_this.object instanceof three.OrthographicCamera) {
        _this.object.zoom = Math.max(_this.minZoom, Math.min(_this.maxZoom, _this.object.zoom / dollyScale));
        _this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControlsModule.js encountered an unknown camera type - dolly/zoom disabled.');
        _this.enableZoom = false;
      }
    };

    //
    // event callbacks - update the object state
    //

    var handleMouseDownRotate = function handleMouseDownRotate(event) {
      // console.log( 'handleMouseDownRotate' );

      rotateStart.set(event.clientX, event.clientY);
    };

    var handleMouseDownDolly = function handleMouseDownDolly(event) {
      // console.log( 'handleMouseDownDolly' );

      dollyStart.set(event.clientX, event.clientY);
    };

    var handleMouseDownPan = function handleMouseDownPan(event) {
      // console.log( 'handleMouseDownPan' );

      panStart.set(event.clientX, event.clientY);
    };

    var handleMouseMoveRotate = function handleMouseMoveRotate(event) {
      // console.log( 'handleMouseMoveRotate' );

      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart);

      var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

      // rotating across whole screen goes 360 degrees around
      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * _this.rotateSpeed);

      // rotating up and down along whole screen attempts to go 360, but limited to 180
      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * _this.rotateSpeed);

      rotateStart.copy(rotateEnd);

      _this.update();
    };

    var handleMouseMoveDolly = function handleMouseMoveDolly(event) {
      // console.log( 'handleMouseMoveDolly' );

      dollyEnd.set(event.clientX, event.clientY);

      dollyDelta.subVectors(dollyEnd, dollyStart);

      if (dollyDelta.y > 0) dollyIn(getZoomScale());else if (dollyDelta.y < 0) dollyOut(getZoomScale());

      dollyStart.copy(dollyEnd);

      _this.update();
    };

    var handleMouseMovePan = function handleMouseMovePan(event) {
      // console.log( 'handleMouseMovePan' );

      panEnd.set(event.clientX, event.clientY);

      panDelta.subVectors(panEnd, panStart);

      pan(panDelta.x, panDelta.y);

      panStart.copy(panEnd);

      _this.update();
    };

    var handleMouseUp = function handleMouseUp(event) {
      // console.log( 'handleMouseUp' );
    };

    var handleMouseWheel = function handleMouseWheel(event) {
      // console.log( 'handleMouseWheel' );

      if (event.deltaY < 0) dollyOut(getZoomScale());else if (event.deltaY > 0) dollyIn(getZoomScale());

      _this.update();
    };

    var handleKeyDown = function handleKeyDown(event) {
      // console.log( 'handleKeyDown' );

      switch (event.keyCode) {
        case _this.keys.UP:
          pan(0, _this.keyPanSpeed);
          _this.update();
          break;

        case _this.keys.BOTTOM:
          pan(0, -_this.keyPanSpeed);
          _this.update();
          break;

        case _this.keys.LEFT:
          pan(_this.keyPanSpeed, 0);
          _this.update();
          break;

        case _this.keys.RIGHT:
          pan(-_this.keyPanSpeed, 0);
          _this.update();
          break;

      }
    };

    var handleTouchStartRotate = function handleTouchStartRotate(event) {
      // console.log( 'handleTouchStartRotate' );

      rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
    };

    var handleTouchStartDolly = function handleTouchStartDolly(event) {
      // console.log( 'handleTouchStartDolly' );

      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;

      var distance = Math.sqrt(dx * dx + dy * dy);

      dollyStart.set(0, distance);
    };

    var handleTouchStartPan = function handleTouchStartPan(event) {
      // console.log( 'handleTouchStartPan' );

      panStart.set(event.touches[0].pageX, event.touches[0].pageY);
    };

    var handleTouchMoveRotate = function handleTouchMoveRotate(event) {
      // console.log( 'handleTouchMoveRotate' );

      rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
      rotateDelta.subVectors(rotateEnd, rotateStart);

      var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

      // rotating across whole screen goes 360 degrees around
      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * _this.rotateSpeed);

      // rotating up and down along whole screen attempts to go 360, but limited to 180
      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * _this.rotateSpeed);

      rotateStart.copy(rotateEnd);

      _this.update();
    };

    var handleTouchMoveDolly = function handleTouchMoveDolly(event) {
      // console.log( 'handleTouchMoveDolly' );

      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;

      var distance = Math.sqrt(dx * dx + dy * dy);

      dollyEnd.set(0, distance);

      dollyDelta.subVectors(dollyEnd, dollyStart);

      if (dollyDelta.y > 0) dollyOut(getZoomScale());else if (dollyDelta.y < 0) dollyIn(getZoomScale());

      dollyStart.copy(dollyEnd);

      _this.update();
    };

    var handleTouchMovePan = function handleTouchMovePan(event) {
      // console.log( 'handleTouchMovePan' );

      panEnd.set(event.touches[0].pageX, event.touches[0].pageY);

      panDelta.subVectors(panEnd, panStart);

      pan(panDelta.x, panDelta.y);

      panStart.copy(panEnd);

      _this.update();
    };

    var handleTouchEnd = function handleTouchEnd() {
      // console.log( 'handleTouchEnd' );
    };

    //
    // event handlers - FSM: listen for events and reset state
    //

    var onMouseDown = function onMouseDown(event) {
      if (_this.enabled === false) return;

      event.preventDefault();

      if (event.button === _this.mouseButtons.ORBIT) {
        if (_this.enableRotate === false) return;

        handleMouseDownRotate(event);

        state = STATE.ROTATE;
      } else if (event.button === _this.mouseButtons.ZOOM) {
        if (_this.enableZoom === false) return;

        handleMouseDownDolly(event);

        state = STATE.DOLLY;
      } else if (event.button === _this.mouseButtons.PAN) {
        if (_this.enablePan === false) return;

        handleMouseDownPan(event);

        state = STATE.PAN;
      }

      if (state !== STATE.NONE) {
        _this.eventHandler.on('mousemove', onMouseMove, false);
        _this.eventHandler.on('mouseup', onMouseUp, false);

        _this.dispatchEvent(startEvent);
      }
    };

    var onMouseMove = function onMouseMove(event) {
      if (_this.enabled === false) return;

      event.preventDefault();

      if (state === STATE.ROTATE) {
        if (_this.enableRotate === false) return;

        handleMouseMoveRotate(event);
      } else if (state === STATE.DOLLY) {
        if (_this.enableZoom === false) return;

        handleMouseMoveDolly(event);
      } else if (state === STATE.PAN) {
        if (_this.enablePan === false) return;

        handleMouseMovePan(event);
      }
    };

    var onMouseUp = function onMouseUp(event) {
      if (_this.enabled === false) return;

      handleMouseUp(event);

      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);

      _this.dispatchEvent(endEvent);

      state = STATE.NONE;
    };

    var onMouseWheel = function onMouseWheel(event) {
      if (_this.enabled === false || _this.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;

      event.preventDefault();
      event.stopPropagation();

      handleMouseWheel(event);

      _this.dispatchEvent(startEvent); // not sure why these are here...
      _this.dispatchEvent(endEvent);
    };

    var onKeyDown = function onKeyDown(event) {
      if (_this.enabled === false || _this.enableKeys === false || _this.enablePan === false) return;

      handleKeyDown(event);
    };

    var onTouchStart = function onTouchStart(event) {
      if (_this.enabled === false) return;

      switch (event.touches.length) {
        case 1:
          // one-fingered touch: rotate

          if (_this.enableRotate === false) return;

          handleTouchStartRotate(event);

          state = STATE.TOUCH_ROTATE;

          break;

        case 2:
          // two-fingered touch: dolly

          if (_this.enableZoom === false) return;

          handleTouchStartDolly(event);

          state = STATE.TOUCH_DOLLY;

          break;

        case 3:
          // three-fingered touch: pan

          if (_this.enablePan === false) return;

          handleTouchStartPan(event);

          state = STATE.TOUCH_PAN;

          break;

        default:

          state = STATE.NONE;

      }

      if (state !== STATE.NONE) _this.dispatchEvent(startEvent);
    };

    var onTouchMove = function onTouchMove(event) {
      if (_this.enabled === false) return;

      event.preventDefault();
      event.stopPropagation();

      switch (event.touches.length) {
        case 1:
          // one-fingered touch: rotate

          if (_this.enableRotate === false) return;
          if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...

          handleTouchMoveRotate(event);

          break;

        case 2:
          // two-fingered touch: dolly

          if (_this.enableZoom === false) return;
          if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...

          handleTouchMoveDolly(event);

          break;

        case 3:
          // three-fingered touch: pan

          if (_this.enablePan === false) return;
          if (state !== STATE.TOUCH_PAN) return; // is this needed?...

          handleTouchMovePan(event);

          break;

        default:

          state = STATE.NONE;

      }
    };

    var onTouchEnd = function onTouchEnd(event) {
      if (_this.enabled === false) return;

      handleTouchEnd(event);

      _this.dispatchEvent(endEvent);

      state = STATE.NONE;
    };

    var onContextMenu = function onContextMenu(event) {
      event.preventDefault();
    };

    //

    _this.eventHandler.on('contextmenu', onContextMenu, false);

    _this.eventHandler.on('mousedown', onMouseDown, false);
    _this.eventHandler.on('wheel', onMouseWheel, false);

    _this.eventHandler.on('touchstart', onTouchStart, false);
    _this.eventHandler.on('touchend', onTouchEnd, false);
    _this.eventHandler.on('touchmove', onTouchMove, false);

    _this.eventHandler.on('keydown', onKeyDown, false);

    // force an update at start

    _this.update();
    return _this;
  }

  createClass(ThreeOrbitControls, [{
    key: 'center',
    get: function get$$1() {
      console.warn('OrbitControls: .center has been renamed to .target');
      return this.target;
    }
  }, {
    key: 'noZoom',
    get: function get$$1() {
      console.warn('OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
      return !this.enableZoom;
    },
    set: function set$$1(value) {
      console.warn('OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
      this.enableZoom = !value;
    }
  }, {
    key: 'noRotate',
    get: function get$$1() {
      console.warn('OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
      return !this.enableRotate;
    },
    set: function set$$1(value) {
      console.warn('OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
      this.enableRotate = !value;
    }
  }, {
    key: 'noPan',
    get: function get$$1() {
      console.warn('OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
      return !this.enablePan;
    },
    set: function set$$1(value) {
      console.warn('OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
      this.enablePan = !value;
    }
  }, {
    key: 'noKeys',
    get: function get$$1() {
      console.warn('OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
      return !this.enableKeys;
    },
    set: function set$$1(value) {
      console.warn('OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
      this.enableKeys = !value;
    }
  }, {
    key: 'staticMoving',
    get: function get$$1() {
      console.warn('OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      return !this.enableDamping;
    },
    set: function set$$1(value) {
      console.warn('OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      this.enableDamping = !value;
    }
  }, {
    key: 'dynamicDampingFactor',
    get: function get$$1() {
      console.warn('OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      return this.dampingFactor;
    },
    set: function set$$1(value) {
      console.warn('OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      this.dampingFactor = value;
    }
  }]);
  return ThreeOrbitControls;
}(three.EventDispatcher);

var OrbitControlsModule = function (_ControlsModule) {
  inherits(OrbitControlsModule, _ControlsModule);

  function OrbitControlsModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, OrbitControlsModule);

    var _this = possibleConstructorReturn(this, (OrbitControlsModule.__proto__ || Object.getPrototypeOf(OrbitControlsModule)).call(this, params));

    _this.params = Object.assign({
      follow: false,
      object: null,
      target: new three.Vector3(0, 0, 0)
    }, params);
    return _this;
  }

  createClass(OrbitControlsModule, [{
    key: 'manager',
    value: function manager(_manager) {
      get(OrbitControlsModule.prototype.__proto__ || Object.getPrototypeOf(OrbitControlsModule.prototype), 'manager', this).call(this, _manager);

      var _params = this.params,
          obj = _params.object,
          follow = _params.follow,
          target = _params.target;

      var object = obj ? obj.native : _manager.get('camera').native;

      var controls = new ThreeOrbitControls(object, _manager.get('element'), _manager.handler);

      var updateProcessor = follow ? function (c) {
        controls.update(c.getDelta());
        controls.target.copy(target);
      } : function (c) {
        controls.update(c.getDelta());
      };

      this.setControls(controls);
      this.setUpdate(updateProcessor);

      _manager.update({
        camera: function camera(_camera) {
          if (obj) return;
          controls.object = _camera.native;
        }
      });

      controls.target.copy(target);
    }
  }]);
  return OrbitControlsModule;
}(ControlsModule);

/** @module modules/app/controls */

/** @module modules/app */

/**
 * @class DynamicGeometryModule
 * @category modules/mesh
 * @param {Object} [params={attributes: false}] - params
 * @param {Boolean} [patchEvents=true]
 * @memberof module:modules/mesh
 */
var DynamicGeometryModule = function () {
  function DynamicGeometryModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, DynamicGeometryModule);

    this.params = Object.assign({
      attributes: false
    }, params);
  }

  createClass(DynamicGeometryModule, [{
    key: "integrate",
    value: function integrate(self) {
      var _this = this;

      var params = self.params;

      this.g_ = function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (this.buildGeometry) {
          this.native.geometry = this.buildGeometry(this.updateParams({ geometry: params }));
        }
      };

      if (params.attributes) {
        var _loop = function _loop(key) {
          if (key) {
            Object.defineProperty(_this, "g_" + key, {
              get: function get$$1() {
                return this.native.geometry.parameters[key];
              },
              set: function set$$1(value) {
                this.native.geometry = this.buildGeometry(this.updateParams({ geometry: defineProperty({}, key, value) }));
              },

              configurable: true,
              enumerable: true
            });
          }
        };

        for (var key in this.params.geometry) {
          _loop(key);
        }
      }
    }
  }]);
  return DynamicGeometryModule;
}();

var loader = new three.TextureLoader();

/**
 * @class TextureModule
 * @category modules/mesh
 * @description A TextureModule can be applied to any Mesh or Model.
 * @param {Array} [textures] - array of texture objects
 * @memberof module:modules/mesh
 * @example <caption>Creating an instance. url takes a path, or a data object.</caption>
 * var woodTexture = new TextureModule({
 *   url: `${process.assetsPath}/textures/wood.jpg`
 * });
 * @example <caption>More comprehensive example, wood texture applied to a Box.</caption>
 * new Box({
 *   geometry: {
 *     width: 2,
 *     height: 2,
 *     depth: 2
 *   },
 *   modules: [
 *     new TextureModule({
 *       url: `path/to/texture.jpg`,
 *       repeat: new THREE.Vector2(1, 1) // optional
 *     })
 *   ],
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *   position: [50, 60, 70]
 * }).addTo(app);
 */
var TextureModule = function () {
  createClass(TextureModule, null, [{
    key: 'load',
    value: function load(url) {
      return new TextureModule({ url: url }).textures[0][1];
    }
  }]);

  function TextureModule() {
    var _this = this;

    classCallCheck(this, TextureModule);
    this.textures = [];
    this.bridge = {
      material: function material(_material, self) {
        self.textures.forEach(function (texture) {
          _material[texture[0]] = texture[1];
        });

        return _material;
      }
    };

    for (var _len = arguments.length, textures = Array(_len), _key = 0; _key < _len; _key++) {
      textures[_key] = arguments[_key];
    }

    textures.forEach(function (_ref) {
      var url = _ref.url,
          _ref$type = _ref.type,
          type = _ref$type === undefined ? 'map' : _ref$type,
          _ref$offset = _ref.offset,
          offset = _ref$offset === undefined ? new three.Vector2(0, 0) : _ref$offset,
          _ref$repeat = _ref.repeat,
          repeat = _ref$repeat === undefined ? new three.Vector2(1, 1) : _ref$repeat,
          _ref$wrap = _ref.wrap,
          wrap = _ref$wrap === undefined ? three.RepeatWrapping : _ref$wrap,
          _ref$mapping = _ref.mapping,
          mapping = _ref$mapping === undefined ? three.UVMapping : _ref$mapping,
          _ref$fix = _ref.fix,
          fix = _ref$fix === undefined ? function (tex) {
        return tex;
      } : _ref$fix;

      var texture = loader.load(url);

      if (wrap.length > 0) {
        texture.wrapS = wrap[0];
        texture.wrapT = wrap[1];
      } else texture.wrapS = texture.wrapT = wrap;

      texture.mapping = mapping;

      texture.offset.copy(offset);
      texture.repeat.copy(repeat);

      texture.magFilter = three.NearestFilter;
      texture.minFilter = three.LinearMipMapLinearFilter;

      _this.textures.push([type, fix(texture)]);
    });
  }

  return TextureModule;
}();

var AnimationModule = function () {
  function AnimationModule(app, isDeferred) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, AnimationModule);
    this.bridge = {
      mesh: function mesh(_mesh, self) {
        _mesh.geometry.skeleton = _mesh.skeleton;

        self.mixer = new three.AnimationMixer(_mesh.geometry);
        self.clips = _mesh.geometry.animations;

        return _mesh;
      }
    };

    this.params = Object.assign({
      speed: 1
    }, params);
    this.clock = new three.Clock();

    this.app = app;
    this.isDeferred = isDeferred;
  }

  /**
   * @method play
   * @instance
   * @description Plays the given clip name
   * @param {String} clipName - the clip to play
   * @memberof module:modules/mesh.AnimationModule
   */


  createClass(AnimationModule, [{
    key: 'play',
    value: function play(clipName) {
      var clip = three.AnimationClip.findByName(this.clips, clipName);
      var action = this.mixer.clipAction(clip);

      action.play();
    }

    /**
     * @method update
     * @instance
     * @description Update the mixer (being called on frame animation loop)
     * @memberof module:modules/mesh.AnimationModule
     */

  }, {
    key: 'update',
    value: function update() {
      if (this.mixer) this.mixer.update(this.clock.getDelta() * this.params.speed);
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      self.loop = new Loop(function () {
        self.update();
      });

      if (!self.isDeferred) self.loop.start(self.app);
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('animation');
    }
  }]);
  return AnimationModule;
}();

/** @module modules/mesh */

/**
 * @class DefineModule
 * @category modules
 * @param {String} name
 * @param {Object} data
 * @memberof module:modules
 * @example <caption> Creating a DefineModule with PerspectiveCamera as camera module and passing it to App's modules</caption>
 * new App([
 *   // ...
 *   new DefineModule('camera', new PerspectiveCamera())
 * ]);
 */
var DefineModule = function () {
  function DefineModule(name, data) {
    classCallCheck(this, DefineModule);

    this.name = name;
    this.data = data;
  }

  createClass(DefineModule, [{
    key: "manager",
    value: function manager(_manager) {
      _manager.set(this.name, this.data);
    }
  }]);
  return DefineModule;
}();

/** @module modules */

var Model = function (_Importer) {
  inherits(Model, _Importer);

  function Model(params) {
    var _ref;

    classCallCheck(this, Model);

    console.warn('Model is deprecated. Use Importer instead.');

    if (params.geometry) {
      params.url = params.geometry.path;
      params.loader = params.geometry.loader;
    }

    for (var _len = arguments.length, additional = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      additional[_key - 1] = arguments[_key];
    }

    return possibleConstructorReturn(this, (_ref = Model.__proto__ || Object.getPrototypeOf(Model)).call.apply(_ref, [this, params].concat(additional)));
  }

  return Model;
}(Importer);

var CameraModule = function () {
  function CameraModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, CameraModule);

    console.warn('CameraModule is deprecated. Use DefineModule instead.');
    this.camera = new PerspectiveCamera$1(params);
  }

  createClass(CameraModule, [{
    key: 'integrate',
    value: function integrate(self) {
      this.add(self.camera);
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.set('camera', this.camera);
    }
  }]);
  return CameraModule;
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

exports.Component = Component;
exports.MeshComponent = MeshComponent;
exports.LightComponent = LightComponent;
exports.CameraComponent = CameraComponent;
exports.App = App;
exports.Loop = Loop;
exports.ModuleManager = ModuleManager;
exports.AmbientLight = AmbientLight$1;
exports.DirectionalLight = DirectionalLight$1;
exports.HemisphereLight = HemisphereLight$1;
exports.PointLight = PointLight$1;
exports.SpotLight = SpotLight$1;
exports.AreaLight = AreaLight;
exports.CubeCamera = CubeCamera$1;
exports.OrthographicCamera = OrthographicCamera$1;
exports.PerspectiveCamera = PerspectiveCamera$1;
exports.Box = Box;
exports.Circle = Circle;
exports.Cone = Cone;
exports.Cylinder = Cylinder;
exports.Dodecahedron = Dodecahedron;
exports.Extrude = Extrude;
exports.Icosahedron = Icosahedron;
exports.Lathe = Lathe;
exports.Line = Line$1;
exports.Importer = Importer;
exports.Octahedron = Octahedron;
exports.Parametric = Parametric;
exports.Plane = Plane$1;
exports.Polyhedron = Polyhedron;
exports.Ring = Ring;
exports.Shape = Shape;
exports.Sphere = Sphere;
exports.Tetrahedron = Tetrahedron;
exports.Text = Text;
exports.Torus = Torus;
exports.Torusknot = Torusknot;
exports.Tube = Tube;
exports.Group = Group;
exports.extend = extend;
exports.instruct = instruct;
exports.transformData = transformData;
exports.toArray = toArray;
exports.ElementModule = ElementModule;
exports.RenderingModule = RenderingModule;
exports.SceneModule = SceneModule;
exports.ResizeModule = ResizeModule;
exports.PostProcessorModule = PostProcessorModule;
exports.VirtualMouseModule = VirtualMouseModule;
exports.EventsPatchModule = EventsPatchModule;
exports.ControlsModule = ControlsModule;
exports.FogModule = FogModule;
exports.StateModule = StateModule;
exports.OrbitControlsModule = OrbitControlsModule;
exports.DynamicGeometryModule = DynamicGeometryModule;
exports.TextureModule = TextureModule;
exports.AnimationModule = AnimationModule;
exports.DefineModule = DefineModule;
exports.Model = Model;
exports.CameraModule = CameraModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vc3JjL3V0aWxzL3RyYW5zZm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvbWluaXZlbnRzL2Rpc3QvbWluaXZlbnRzLmNvbW1vbmpzLmpzIiwiLi4vc3JjL2NvcmUvZXJyb3JzLmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlU3lzdGVtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyQXJnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21wb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2luZGV4LmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlTWFuYWdlci5qcyIsIi4uL3NyYy9jb3JlL0NvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL3Byb3RvdHlwZS9hdHRyaWJ1dGVzLmpzIiwiLi4vc3JjL2NvcmUvTWVzaENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0xpZ2h0Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvcmUvQ2FtZXJhQ29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3ByZXNlbnQvbGliL3ByZXNlbnQtbm9kZS5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9BbWJpZW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9IZW1pc3BoZXJlTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvUG9pbnRMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9TcG90TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQXJlYUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9DdWJlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9PcnRob2dyYXBoaWNDYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Cb3guanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ2lyY2xlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NvbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ3lsaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvRG9kZWNhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0V4dHJ1ZGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSWNvc2FoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGF0aGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGluZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9PY3RhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BhcmFtZXRyaWMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUGxhbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUG9seWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9SaW5nLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NoYXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NwaGVyZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXRyYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXh0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVza25vdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UdWJlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0dyb3VwLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0VsZW1lbnRNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1NjZW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvbnZvbHV0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvY29weS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvcGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2NsZWFyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvY2xlYXItbWFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dsaXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3JlbmRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL21hc2suanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaGFkZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaG9jay13YXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL2NvcmUvZWZmZWN0LWNvbXBvc2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Qb3N0UHJvY2Vzc29yTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0V2ZW50c1BhdGNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1ZpcnR1YWxNb3VzZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Gb2dNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvU3RhdGVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvbGliL1RocmVlT3JiaXRDb250cm9scy5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9PcmJpdENvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9EeW5hbWljR2VvbWV0cnlNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL1RleHR1cmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL0FuaW1hdGlvbk1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIi4uL3NyYy9kZXByZWNhdGlvbi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZXh0ZW5kID0gKG9iamVjdCwgLi4uZXh0ZW5zaW9ucykgPT4geyAvLyAkLmV4dGVuZCBhbHRlcm5hdGl2ZSwgLi4uIGlzIHRoZSBzcHJlYWQgb3BlcmF0b3IuXG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhleHRlbnNpb24pO1xuICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBleHRlbnNpb24pO1xuXG4gICAgaWYgKCFleHRlbnNpb24pXG4gICAgICBjb250aW51ZTsgLy8gSWdub3JlIG51bGwgYW5kIHVuZGVmaW5lZCBvYmplY3RzIGFuZCBwYXJhbWV0ZXJzLlxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4dGVuc2lvbikpIHsgLy8gRG8gbm90IHRyYXZlcnNlIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICBpZiAob2JqZWN0W3Byb3BdICE9PSB1bmRlZmluZWQgJiYgZXh0ZW5zaW9uW3Byb3BdXG4gICAgICAgICYmIG9iamVjdFtwcm9wXS50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAmJiBleHRlbnNpb25bcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgLy8gR29lcyBkZWVwIG9ubHkgaWYgb2JqZWN0W3Byb3BdIGFuZCBleHRlbnNpb25bcHJvcF0gYXJlIGJvdGggb2JqZWN0cyAhXG4gICAgICAgIGlmIChleHRlbnNpb25bcHJvcF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkgZXh0ZW5kKG9iamVjdFtwcm9wXSwgZXh0ZW5zaW9uW3Byb3BdKTtcbiAgICAgICAgZWxzZSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF07XG4gICAgICB9IGVsc2VcbiAgICAgICAgb2JqZWN0W3Byb3BdID0gdHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgPyBleHRlbnNpb25bcHJvcF0gOiBvYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXS5zbGljZSgpOyAvLyBBZGQgdmFsdWVzIHRoYXQgZG8gbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsImV4cG9ydCBjb25zdCBpbnN0cnVjdCA9IChhcnJheSwgaW5zdEFycmF5KSA9PiB7XG4gIGNvbnN0IHRlbXBPYmplY3QgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdEFycmF5Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgY29uc3QgZ3VpZGUgPSBpbnN0QXJyYXlbaV07XG5cbiAgICB0ZW1wT2JqZWN0W2d1aWRlXSA9IGFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBPYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtRGF0YSA9IChvYmplY3QsIGluc3RydWN0aW9ucykgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0cnVjdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkpXG4gICAgICBvYmplY3Rba2V5XSA9IGluc3RydWN0KG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gICAgZWxzZSBpZiAob2JqZWN0W2tleV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgIShBcnJheS5pc0FycmF5KGluc3RydWN0aW9uc1trZXldKSkpXG4gICAgICBvYmplY3Rba2V5XSA9IHRyYW5zZm9ybURhdGEob2JqZWN0W2tleV0sIGluc3RydWN0aW9uc1trZXldKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdG9BcnJheSA9IChvYmplY3QsIGluc3RydWN0aW9uKSA9PiB7XG4gIGNvbnN0IHRlbXBBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnN0cnVjdGlvbi5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdHJ1Y3Rpb25baV07XG5cbiAgICB0ZW1wQXJyYXlbaV0gPSBvYmplY3RbZ3VpZGVdO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGNvbXBvbmVudCk7XG5cbiAgICB0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY3lFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgYWN0aXZlTW9kdWxlLCBkZXBlbmRlbmN5TW9kdWxlID0gZmFsc2UpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcbiAgICBpZiAoY29uc29sZSAmJiBkZXBlbmRlbmN5TW9kdWxlKSBjb25zb2xlLmVycm9yKCdEZXBlbmRlbmN5IHB1Ymxpc2hlZCBieSBtb2R1bGU6JywgZGVwZW5kZW5jeU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnRGVwZW5kZW5jeUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQsIGFjdGl2ZU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdDb21wb25lbnQ6JywgZGVwZW5kZW5jeU1vZHVsZSk7XG4gICAgaWYgKGNvbnNvbGUgJiYgYWN0aXZlTW9kdWxlKSBjb25zb2xlLmVycm9yKCdBY3RpdmUgbW9kdWxlOicsIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnTWFuYWdlckVycm9yJztcbiAgfVxufVxuIiwiaW1wb3J0IHtSRVZJU0lPTn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IEV2ZW50cyBmcm9tICdtaW5pdmVudHMnO1xuaW1wb3J0IHtNYW5hZ2VyRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLy8gQ2hlY2sgZm9yIFRocmVlLmpzXG5jb25zdCB3YXJuRGVwcyA9ICgpID0+IHtcbiAgdGhyb3cgbmV3IEVycm9yKCdXaGl0ZXN0b3JtSlMgRnJhbWV3b3JrIHJlcXVpcmVzIFRocmVlLmpzIHI4NC4gaHR0cHM6Ly90aHJlZWpzLm9yZy8nKTtcbn07XG5cbnRyeSB7XG4gIGlmICghUkVWSVNJT04pIHdhcm5EZXBzKCk7XG59IGNhdGNoIChlcnIpIHtcbiAgd2FybkRlcHMoKTtcbn1cblxuLyoqXG4gKiBAY2xhc3MgTW9kdWxlU3lzdGVtXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uICBQcm92aWRlcyBBUEkgZm9yIGNsYXNzZXMgdGhhdCB3aWxsIHVzZSBNb2R1bGVzLjxici8+XG4gKiBUaGlzIGNsYXNzIGluY2x1ZGVzIGJhc2ljIGV2ZW50IHN5c3RlbSB3aXRoIHRob3NlIHN1cHBvcnRlZCBtZXRob2RzOlxuICogPHByZT4ub24oKTwvcHJlPjxwcmU+Lm9mZigpPC9wcmU+PHByZT4uZW1pdCgpPC9wcmU+XG4gKiBAZXh0ZW5kcyBFdmVudHNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlU3lzdGVtIGV4dGVuZHMgRXZlbnRzIHtcbiAgLy8gSU5URUdSQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBpbnRlZ3JhdGVNb2R1bGVzXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgYXBwbGllcyBhbGwgbW9kdWxlcyBmcm9tIC5tb2R1bGVzIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc291cmNlXSBJZiBzb3VyY2UgKHNob3VsZCBiZSBhIGNvbXBvbmVudCkgaXMgcHJvdmlkZWQsIHdpbGwgcmVwbGFjZSAubW9kdWxlcyB3aXRoIHNvdXJjZSdzIG9uZSBiZWZvcmUgZXhlY3V0aW5nIG1vZHVsZXMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGludGVncmF0ZU1vZHVsZXMoc291cmNlKSB7XG4gICAgaWYgKCF0aGlzLm1vZHVsZXMpIHJldHVybjtcbiAgICBpZiAoc291cmNlKSB0aGlzLm1vZHVsZXMgPSBzb3VyY2UubW9kdWxlcy5zbGljZSgwKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspXG4gICAgICB0aGlzLmFwcGx5TW9kdWxlKHRoaXMubW9kdWxlc1tpXSwgZmFsc2UpO1xuXG4gICAgaWYgKHNvdXJjZSkgdGhpcy5hcHBseUJyaWRnZSh7b25Db3B5OiBzb3VyY2V9KTtcbiAgfVxuXG4gIC8vIEFQUExZSU5HIE1PRFVMRSAoLi4uYW5kIGEgXCJicmlkZ2VcIiBmb3IgbW9kdWxlKVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5QnJpZGdlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZXMgY29tcG9uZW50LXNwZWNpZmljIEFQSSB0byB3b3JrIHdpdGggbW9kdWxlcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJyaWRnZU1hcFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgb2JqZWN0IHdpdGggbW9kaWZpZWQgdmFsdWVzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBhcHBseUJyaWRnZShicmlkZ2VNYXAgPSB7fSkge1xuICAgIGNvbnN0IG1vZHVsZXMgPSB0aGlzLm1vZHVsZXM7XG4gICAgaWYgKCFtb2R1bGVzKSByZXR1cm4gYnJpZGdlTWFwO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IG1vZHVsZXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGJyaWRnZU1hcCkge1xuICAgICAgICBpZiAoYnJpZGdlTWFwW2tleV0pIHtcbiAgICAgICAgICBjb25zdCBtb2R1bGUgPSBtb2R1bGVzW2ldO1xuXG4gICAgICAgICAgaWYgKG1vZHVsZSAmJiBtb2R1bGUuYnJpZGdlICYmIG1vZHVsZS5icmlkZ2Vba2V5XSlcbiAgICAgICAgICAgIGJyaWRnZU1hcFtrZXldID0gbW9kdWxlLmJyaWRnZVtrZXldLmFwcGx5KHRoaXMsIFticmlkZ2VNYXBba2V5XSwgbW9kdWxlXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnJpZGdlTWFwO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlNb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiAuYXBwbHlNb2R1bGUgaXMgYWxzbyB1c2VkIGluIC5pbnRlZ3JhdGVNb2R1bGVzKCkgZnVuY3Rpb24uXG4gICAqIEl0IGRvZXMgZXhhY3RseSB3aGF0IGl0cyBuYW1lIHNheXMgKGFwcGxpZXMgbW9kdWxlIHRvIGNvbXBvbmVudCBvciBhcHApLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHBhcmFtIHtCb29sZWFufSBbcHVzaD10cnVlXVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIGFwcGxpZWQuXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlNb2R1bGUobW9kdWxlLCBwdXNoID0gdHJ1ZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG4gICAgaWYgKHB1c2ggJiYgdGhpcy5tb2R1bGVzKSB0aGlzLm1vZHVsZXMucHVzaChtb2R1bGUpO1xuICAgIGVsc2UgaWYgKHB1c2gpIHRoaXMubW9kdWxlcyA9IFttb2R1bGVdO1xuXG4gICAgaWYgKHRoaXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyLmFjdGl2ZShtb2R1bGUpO1xuXG4gICAgaWYgKG1vZHVsZS5tYW5hZ2VyICYmIHRoaXMubWFuYWdlcikgbW9kdWxlLm1hbmFnZXIodGhpcy5tYW5hZ2VyKTtcbiAgICBlbHNlIGlmIChtb2R1bGUubWFuYWdlcikge1xuICAgICAgdGhyb3cgbmV3IE1hbmFnZXJFcnJvcihcbiAgICAgICAgJ0NvbXBvbmVudCcsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgTW9kdWxlTWFuYWdlciB0aGF0IGlzIHR1cm5lZCBvZmYgZm9yIHRoaXMgY29tcG9uZW50YCxcbiAgICAgICAgdGhpcywgbW9kdWxlXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUuaW50ZWdyYXRlKSBtb2R1bGUuaW50ZWdyYXRlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIGFsbCBtb2R1bGVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGVzKCkge1xuICAgIHdoaWxlICh0aGlzLm1vZHVsZXMubGVuZ3RoKVxuICAgICAgdGhpcy5kaXNwb3NlTW9kdWxlKHRoaXMubW9kdWxlc1swXSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGlzcG9zZXMgb2YgdGhlIGdpdmVuIG1vZHVsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gZGlzcG9zZVxuICAgKiBAcmV0dXJuIHtNb2R1bGV9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIHJlbW92ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGUobW9kdWxlKSB7XG4gICAgaWYgKCFtb2R1bGUpIHJldHVybjtcblxuICAgIHRoaXMubW9kdWxlcy5zcGxpY2UodGhpcy5tb2R1bGVzLmluZGV4T2YobW9kdWxlKSwgMSk7XG5cbiAgICBpZiAobW9kdWxlLmRpc3Bvc2UpIG1vZHVsZS5kaXNwb3NlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvLyBQSVBFRCBNRVRIT0RcblxuICAvKipcbiAgICogQG1ldGhvZCBtb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBwaXBlZCB2ZXJzaW9uIG9mIC5hcHBseU1vZHVsZSgpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHJldHVybiB7dGhpc30gcmV0dXJucyB0aGlzIC0gYXBwL2NvbXBvbmVudFxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UGlwZWQgbW9kdWxlczwvY2FwdGlvbj5cbiAgICogY29tcG9uZW50XG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMSgpKVxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTIoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUzKCkpXG4gICAqL1xuICBtb2R1bGUobW9kdWxlKSB7XG4gICAgdGhpcy5hcHBseU1vZHVsZShtb2R1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IGJhc2VHZXRUYWcodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJlxuICAgIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUGxhaW5PYmplY3Q7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFN5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG4iLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICAgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAgICpcbiAgICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICAgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gICAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gICAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gICAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAgICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICAgKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICAgKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gICAqL1xufTtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn0iLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufSIsIi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn0iLCJpbXBvcnQgY3JlYXRlU3RvcmUgZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgY29tYmluZVJlZHVjZXJzIGZyb20gJy4vY29tYmluZVJlZHVjZXJzJztcbmltcG9ydCBiaW5kQWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi9iaW5kQWN0aW9uQ3JlYXRvcnMnO1xuaW1wb3J0IGFwcGx5TWlkZGxld2FyZSBmcm9tICcuL2FwcGx5TWlkZGxld2FyZSc7XG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZygnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGJpbmRBY3Rpb25DcmVhdG9ycywgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH07IiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtEZXBlbmRlbmN5RXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgTW9kdWxlTWFuYWdlclxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgaGFuZGxlclxuICogQGRlc2NyaXB0aW9uICBTb2x2ZXMgbW9kdWxlcyBkZXBlbmRlbmNpZXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG9iamVjdDtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuXG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKChzdGF0ZSA9IFt7fSwgJyddLCBhY3Rpb24pID0+IHtcbiAgICAgIHN0YXRlWzBdW2FjdGlvbi5rZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICBzdGF0ZVsxXSA9IGFjdGlvbi5rZXk7XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWN0aXZlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyAuY3VycmVudE1vZHVsZSB0byBwcm92aWRlZCBtb2R1bGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBtYWtlIGN1cnJlbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGFjdGl2ZShtb2R1bGUpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldCdzIC5jdXJyZW50TW9kdWxlIHRvIG51bGwuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmaW5lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lIHRoZSBtb2R1bGUgaW4gbWFuYWdlclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbW9kdWxlIG5hbWVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGRlZmluZShuYW1lKSB7XG4gICAgdGhpcy5tb2R1bGVzW25hbWVdID0gdGhpcy5jdXJyZW50TW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXNlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBkZWZpbmVkIG1vZHVsZSBmcm9tIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1c2UobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1vZHVsZXNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBbiBhbGlhcyBmb3IgLmFkZCgpIDxici8+PGJyLz5cbiAgICogVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSBrbm93IHRoYXQgeW91IHdpbGwgb3ZlcndyaXRlIGV4aXN0aW5nIGRlcGVuZGVuY3kuPGJyLz5cbiAgICogVXNlIGl0IGluIHlvdXIgYXBwLCBidXQgbm90IGluIG1vZHVsZSB0aGF0IHlvdSBwcm92aWRlIHRvIG90aGVyIHBlb3BsZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHRoZSB2YWx1ZSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgc2V0KGtleSwgZGF0YSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ0FERCcsXG4gICAgICBrZXksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGRlcGVuZGVuY3kgaW4gc3RvcmUgb2JqZWN0LCBieSBrZXkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKiBAcmV0dXJuIHtPYmplY3R8TW9kdWxlfVxuICAgKiBAdGhyb3dzIHtEZXBlbmRlbmN5RXJyb3J9IGlmIGRlcGVuZGVuY3kgaXMgbm90IGluIHRoZSBzdG9yZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXQgdGhlICdoZWxsbycgZGVwZW5kZW5jeTwvY2FwdGlvbj5cbiAgICogbWFuYWdlci5nZXQoJ2hlbGxvJyk7IC8vIC0+IHt3b3JsZDogdHJ1ZX1cbiAgICovXG4gIGdldChrZXkpIHtcbiAgICBpZiAoIXRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKSB7XG4gICAgICB0aHJvdyBuZXcgRGVwZW5kZW5jeUVycm9yKFxuICAgICAgICAnTW9kdWxlTWFuYWdlcicsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgJyR7a2V5fScgZGVwZW5kZW5jeWAsXG4gICAgICAgIHRoaXMuY3VycmVudE1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBoYXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHdoZXRoZXIgbWFuYWdlciBoYXMgYSBkZXBlbmRlbmN5IHdpdGggdGhlIGdpdmVuIGtleVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q2hlY2sgd2hldGhlciB0aGUgc3RvcmUgaGFzIHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuaGFzKCdoZWxsbycpOyAvLyAtPiB0cnVlXG4gICAqL1xuICBoYXMoa2V5KSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyBkZXBzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbZGVwc01hcD17fV1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHVwZGF0ZShkZXBzTWFwID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBbZGF0YSwgY2hhbmdlZEtleV0gPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGRlcHNNYXBbY2hhbmdlZEtleV07XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YVtjaGFuZ2VkS2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGFsaWFzIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXIjc2V0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhZGQoLi4uZGF0YSkge1xuICAgIGNvbnNvbGUud2FybignLmFkZCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBVc2UgLnNldCgpIGluc3RlYWQnKTtcbiAgICByZXR1cm4gdGhpcy5zZXQoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXF1aXJlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmVxdWlyZSBtb2R1bGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgRGVmaW5lZCBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZHVsZUV4ZWN1dG9yIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhcHBsaWVkIG1vZHVsZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVxdWlyZShuYW1lLCBtb2R1bGVFeGVjdXRvcikge1xuICAgIGlmICh0aGlzLnVzZShuYW1lKSA9PT0gdW5kZWZpbmVkKSB0aGlzLmhhbmRsZXIuYXBwbHlNb2R1bGUobW9kdWxlRXhlY3V0b3IoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7ZXh0ZW5kLCB0cmFuc2Zvcm1EYXRhfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5pbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuaW1wb3J0IHtNb2R1bGVNYW5hZ2VyfSBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuaW1wb3J0IHtNYW5hZ2VyRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCB7XG4gICAqICAgbW9kdWxlczogW10sXG4gICAqICAgbWFuYWdlcjogdHJ1ZVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgbW9kdWxlczogbnVsbCxcbiAgICBtYW5hZ2VyOiB0cnVlXG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge31cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7fTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgcHJvbWlzZXMgdGhhdCBzaG91bGQgYmUgcmVzb2x2ZWQgYmVmb3JlIENvbXBvbmVudCBpcyByZWFkeS5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNfd2FpdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3dhaXQgPSBbXTsgLy8gQ29sbGVjdGlvbiBvZiBwcm9taXNlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgbW9kdWxlc2AuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbW9kdWxlc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBtb2R1bGVzID0gW107IC8vIENvbGxlY3Rpb24gb2YgbW9kdWxlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgY2hpbGRgIENvbXBvbmVudHMuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjY2hpbGRyZW5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2hpbGRyZW4gPSBbXTsgLy8gRm9yIGtlZXBpbmcgY2hpbGRyZW4gY29tcG9uZW50cztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZGVmYXVsdHMgPSBDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gQXBwbHkgcG9seWZpbGxlZCBwYXJhbWV0ZXJzIHRvIC5wYXJhbXM7XG4gICAgdGhpcy5wYXJhbXMgPSBleHRlbmQodHJhbnNmb3JtRGF0YShwYXJhbXMsIGluc3RydWN0aW9ucyksIGRlZmF1bHRzKTtcbiAgICBpZiAodGhpcy5wYXJhbXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIoKTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHRoaXMucGFyYW1zLm1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdhaXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXYWl0IGZvciBhIHByb21pc2UuXG4gICAqIEBwYXJhbSB7UHJvbWlzZX0gW3Byb21pc2VdIC0gVGhlIHByb21pc2UgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gYSBxdWV1ZS5cbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgd2FpdChwcm9taXNlKSB7XG4gICAgaWYgKHByb21pc2UpIHRoaXMuX3dhaXQucHVzaChwcm9taXNlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fd2FpdCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZlclxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGUgYGZ1bmNgIChDYWxsYmFjaykgd2hlbiBDb21wb25lbnQgaXMgcmVhZHkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBDYWxsYmFjay5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgZGVmZXIoZnVuYykge1xuICAgIGlmICh0aGlzLmlzRGVmZmVyZWQpIHRoaXMud2FpdCgpLnRoZW4oKCkgPT4gZnVuYyh0aGlzKSk7XG4gICAgZWxzZSBmdW5jKHRoaXMpO1xuICB9XG5cbiAgLy8gUEFSQU1FVEVSU1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVBhcmFtc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgcGFyYW1ldGVycyBvZiB0aGUgQ29tcG9uZW50LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFBhcmFtcyBvZiB0aGlzIENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICB1cGRhdGVQYXJhbXMocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IGV4dGVuZChwYXJhbXMsIHRoaXMucGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXM7XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ2xvbmUgdGhpcyBjb21wb25lbnRcbiAgICogQHJldHVybiB7b2JqZWN0fSBhIGNsb25lZCBjb21wb25lbnQgd2l0aCBhbGwgaXRzIHNvdXJjZSBjb21wb25lbnQnIHBhcmFtcyBjb3BpZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnBhcmFtcykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSBuYXRpdmUgYW5kIGludGVncmF0ZSBgbW9kdWxlc2AgdG8gaXQuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBzb3VyY2UgLSBTb3VyY2UgY29tcG9uZW50IHRoYXQgaXMgdXNlZCBmb3IgYGNvcHkoKWAgYWN0aW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplXSAtIENhbGxiYWNrIGV4ZWN1dGVkIGJlZm9yZSBtb2R1bGVzIGludGVncmF0aW9uIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge3RoaXN9IENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSwgY3VzdG9taXplKSB7XG4gICAgdGhpcy5wYXJhbXMgPSB7Li4uc291cmNlLnBhcmFtc307XG5cbiAgICBpZiAoc291cmNlLm5hdGl2ZSkgdGhpcy5uYXRpdmUgPSBzb3VyY2UubmF0aXZlLmNsb25lKHNvdXJjZS5wYXJhbXMpO1xuICAgIGlmIChjdXN0b21pemUpIGN1c3RvbWl6ZSgpO1xuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhZGRlZCBhcyBhIGBjaGlsZGAuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGRvbmUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGFkZChvYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge25hdGl2ZX0gPSBvYmplY3Q7XG4gICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9taXNlID0gdGhpcy5hcHBseUJyaWRnZSh7b25BZGQ6IG9iamVjdH0pLm9uQWRkO1xuXG4gICAgICAgIGNvbnN0IHJlc29sdmVyID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlLmFkZChuYXRpdmUpO1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhZGRQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgYWRkUHJvbWlzZS50aGVuKHJlc29sdmVyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhICoqY2hpbGQqKiBvZiB0aGlzIENvbXBvbmVudC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgcmVtb3ZlKG9iamVjdCkge1xuICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMubmF0aXZlLnJlbW92ZShvYmplY3QubmF0aXZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZFRvXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBgdGhpc2AgQ29tcG9uZW50IHRvIHNwZWNpZmllZCBgQXBwYC9gQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHdpbGwgYmUgYSBwYXJlbnQgb2YgYHRoaXNgLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBhZGRUbyhvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0LmFkZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBgYXN5bmNgIChgd2FpdGAgcHJvbWlzZXMgYXJlIG1vcmUgdGhhbiBgMGApLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaXNEZWZmZXJlZFxuICAgKi9cbiAgZ2V0IGlzRGVmZmVyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhaXQubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgTW9kdWxlTWFuYWdlcmAgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqIEBtZW1iZXIge01vZHVsZU1hbmFnZXJ9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNtYW5hZ2VyXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICovXG4gIGdldCBtYW5hZ2VyKCkge1xuICAgIGlmICh0aGlzLl9tYW5hZ2VyKSByZXR1cm4gdGhpcy5fbWFuYWdlcjtcblxuICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAnQ29tcG9uZW50JyxcbiAgICAgIGBNb2R1bGVNYW5hZ2VyIGlzIG5vdCB1c2VkIGluIHRoaXMgY29tcG9uZW50LiAnbWFuYWdlcicgcGFyYW1ldGVyIHNob3VsZCBiZSBzZXQgYXMgJ3RydWUnYCxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgc2V0IG1hbmFnZXIobWFuYWdlcikge1xuICAgIHRoaXMuX21hbmFnZXIgPSBtYW5hZ2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBuYXRpdmVgIG9iamVjdCB1c2VkIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbmF0aXZlXG4gICAqL1xuICBnZXQgbmF0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cblxuICBzZXQgbmF0aXZlKG1lc2gpIHtcbiAgICB0aGlzLl9uYXRpdmUgPSBtZXNoO1xuICAgIHRoaXMuX25hdGl2ZS5jb21wb25lbnQgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29tcG9uZW50XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGF0dHJpYnV0ZXMoLi4ubWFwcGVycykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWFwcGVyID0gbWFwcGVyc1tpXTtcblxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtYXBwZXIubWFwLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG1hcHBlci5tYXBba107XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldC5wcm90b3R5cGUsIGF0dHJpYnV0ZSwge1xuICAgICAgICAgIGdldDogbWFwcGVyLmdldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIHNldDogbWFwcGVyLnNldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogbWFwcGVyLmNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBtYXBwZXIuZW51bWVyYWJsZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KC4uLm1hcCkge1xuICByZXR1cm4ge1xuICAgIG1hcCxcbiAgICBnZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlW25hbWVdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlW25hbWVdLmNvcHkodmFsdWUpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXJyb3IoLi4ubWFwKSB7XG4gIHJldHVybiB7XG4gICAgbWFwLFxuICAgIGdldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVbbmFtZV07XG4gICAgICB9O1xuICAgIH0sXG4gICAgc2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufVxuIiwiaW1wb3J0IHtNZXNofSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHksIG1pcnJvcn0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAnc2NhbGUnKSxcbiAgbWlycm9yKCdtYXRlcmlhbCcsICdnZW9tZXRyeScpXG4pXG4vKipcbiAqIEBjbGFzcyBNZXNoQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBNZXNoQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICogICBnZW9tZXRyeToge30sXG4gICAqICAgbWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHNoYWRvdzoge1xuICAgKiAgICAgY2FzdDogdHJ1ZSxcbiAgICogICAgIHJlY2VpdmU6IHRydWVcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICBzY2FsZToge3g6IDEsIHk6IDEsIHo6IDF9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcbiAgICBnZW9tZXRyeToge30sXG4gICAgbWF0ZXJpYWw6IGZhbHNlLFxuXG4gICAgc2hhZG93OiB7XG4gICAgICBjYXN0OiB0cnVlLFxuICAgICAgcmVjZWl2ZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgc2NhbGU6IHt4OiAxLCB5OiAxLCB6OiAxfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIC8vIENVU1RPTSBHRU9NRVRSWSBIQU5ETElOR1xuXG4gIHN0YXRpYyBjdXN0b20oZ2VvbSwgY29uc3RydWN0b3IgPSBNZXNoKSB7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gICAgICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgICAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBnZW9tLFxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBjb25zdHJ1Y3RvcihnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShnZW9tLCBwYXJhbXMsIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoTWVzaENvbXBvbmVudC5jdXN0b20oZ2VvbSwgY29uc3RydWN0b3IpKShwYXJhbXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IE1lc2hDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IE1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICAgIHRoaXMud3JhcCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubmF0aXZlID0gYnVpbGQ7XG4gICAgICAgIHRoaXMud3JhcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAnSW5zdGFuY2Ugc2hvdWxkIGhhdmUgaXRcXCdzIG93biAuYnVpbGQoKS4nLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgdHJhbnNmb3JtcyAoYHBvc2l0aW9uYCAmIGByb3RhdGlvbmApXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGNvbXBsZXRlZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvLyBUT0RPOiBGaXggZGVmZXIgd2l0aCBwaHlzaWNzXG4gICAgICAvLyB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHtwb3NpdGlvbiwgcm90YXRpb24sIHNjYWxlLCBzaGFkb3d9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLnopO1xuICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XG4gICAgICB0aGlzLnNjYWxlLnNldChzY2FsZS54LCBzY2FsZS55LCBzY2FsZS56KTtcblxuICAgICAgdGhpcy5uYXRpdmUuY2FzdFNoYWRvdyA9IHNoYWRvdy5jYXN0O1xuICAgICAgdGhpcy5uYXRpdmUucmVjZWl2ZVNoYWRvdyA9IHNoYWRvdy5yZWNlaXZlO1xuXG4gICAgICB0aGlzLmFwcGx5QnJpZGdlKHtvbldyYXA6IDF9KTtcblxuICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIC8vIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gQ09QWUlORyAmIENMT05JTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgdHJhbnNmb3JtcyAmIGV4ZWN1dGUgYENvbXBvbmVudC5jb3B5KClgXG4gICAqIEByZXR1cm4ge3RoaXN9IE1lc2hDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICB0aGlzLnBvc2l0aW9uLmNvcHkoc291cmNlLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucm90YXRpb24uY29weShzb3VyY2Uucm90YXRpb24pO1xuICAgICAgdGhpcy5xdWF0ZXJuaW9uLmNvcHkoc291cmNlLnF1YXRlcm5pb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlIGEgY2xvbmUgb2YgdGhpcyBNZXNoQ29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtNZXNoQ29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoZ2VvbWV0cnksIG1hdGVyaWFsKSB7XG4gICAgY29uc3QgZGVzdCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtidWlsZDogZmFsc2V9KS5jb3B5KHRoaXMpO1xuXG4gICAgaWYgKGdlb21ldHJ5KSBkZXN0Lmdlb21ldHJ5ID0gZGVzdC5nZW9tZXRyeS5jbG9uZSgpO1xuICAgIGlmIChtYXRlcmlhbCkgZGVzdC5tYXRlcmlhbCA9IGRlc3QubWF0ZXJpYWwuY2xvbmUoKTtcblxuICAgIHJldHVybiBkZXN0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE1lc2hDb21wb25lbnRcbn07XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHl9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3RhcmdldCcpXG4pXG4vKipcbiAqIEBjbGFzcyBMaWdodENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTGlnaHRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICpcbiAgICogICBzaGFkb3c6IHtcbiAgICogICAgIGNhc3Q6IHRydWUsXG4gICAqXG4gICAqICAgICBiaWFzOiAwLFxuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKlxuICAgKiAgICAgbWFwU2l6ZToge1xuICAgKiAgICAgICB3aWR0aDogMTAyNCxcbiAgICogICAgICAgaGVpZ2h0OiAxMDI0XG4gICAqICAgICB9LFxuICAgKlxuICAgKiAgICAgY2FtZXJhOiB7XG4gICAqICAgICAgIG5lYXI6IHRydWUsXG4gICAqICAgICAgIGZhcjogNDAwLFxuICAgKiAgICAgICBmb3Y6IDkwLFxuICAgKlxuICAgKiAgICAgICB0b3A6IDIwMCxcbiAgICogICAgICAgYm90dG9tOiAtMjAwLFxuICAgKiAgICAgICBsZWZ0OiAtMjAwLFxuICAgKiAgICAgICByaWdodDogMjAwXG4gICAqICAgICB9XG4gICAqICAgfSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGJ1aWxkOiB0cnVlLFxuXG4gICAgc2hhZG93OiB7XG4gICAgICBjYXN0OiB0cnVlLFxuXG4gICAgICBiaWFzOiAwLFxuICAgICAgcmFkaXVzOiAxLFxuXG4gICAgICBtYXBTaXplOiB7XG4gICAgICAgIHdpZHRoOiAxMDI0LFxuICAgICAgICBoZWlnaHQ6IDEwMjRcbiAgICAgIH0sXG5cbiAgICAgIGNhbWVyYToge1xuICAgICAgICBuZWFyOiB0cnVlLFxuICAgICAgICBmYXI6IDQwMCxcbiAgICAgICAgZm92OiA5MCxcblxuICAgICAgICB0b3A6IDIwMCxcbiAgICAgICAgYm90dG9tOiAtMjAwLFxuICAgICAgICBsZWZ0OiAtMjAwLFxuICAgICAgICByaWdodDogMjAwXG4gICAgICB9XG4gICAgfSxcblxuICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBMaWdodENvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gTGlnaHRDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnTGlnaHRDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgdGhpcy5uYXRpdmUgPSBidWlsZDtcblxuICAgICAgdGhpcy53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICB3cmFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgICBjb25zdCB7cG9zaXRpb24sIHJvdGF0aW9ufSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLnopO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldChyb3RhdGlvbi54LCByb3RhdGlvbi55LCByb3RhdGlvbi56KTtcblxuICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtvbldyYXA6IDF9KTtcblxuICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwU2hhZG93XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgc2hhZG93IHByb3BlcnRpZXNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICB3cmFwU2hhZG93KCkge1xuICAgIGNvbnN0IHtuYXRpdmUsIHBhcmFtczoge3NoYWRvd319ID0gdGhpcztcblxuICAgIG5hdGl2ZS5jYXN0U2hhZG93ID0gc2hhZG93LmNhc3Q7XG4gICAgbmF0aXZlLnNoYWRvdy5tYXBTaXplLndpZHRoID0gc2hhZG93Lm1hcFNpemUud2lkdGg7XG4gICAgbmF0aXZlLnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IHNoYWRvdy5tYXBTaXplLmhlaWdodDtcbiAgICBuYXRpdmUuc2hhZG93LmJpYXMgPSBzaGFkb3cuYmlhcztcbiAgICBuYXRpdmUuc2hhZG93LnJhZGl1cyA9IHNoYWRvdy5yYWRpdXM7XG5cbiAgICBjb25zdCBzaGFkb3dDYW1lcmEgPSBuYXRpdmUuc2hhZG93LmNhbWVyYTtcbiAgICBjb25zdCBjYW1lcmEgPSBzaGFkb3cuY2FtZXJhO1xuXG4gICAgc2hhZG93Q2FtZXJhLm5lYXIgPSBjYW1lcmEubmVhcjtcbiAgICBzaGFkb3dDYW1lcmEuZmFyID0gY2FtZXJhLmZhcjtcbiAgICBzaGFkb3dDYW1lcmEuZm92ID0gY2FtZXJhLmZvdjtcblxuICAgIHNoYWRvd0NhbWVyYS5sZWZ0ID0gY2FtZXJhLmxlZnQ7XG4gICAgc2hhZG93Q2FtZXJhLnJpZ2h0ID0gY2FtZXJhLnJpZ2h0O1xuICAgIHNoYWRvd0NhbWVyYS50b3AgPSBjYW1lcmEudG9wO1xuICAgIHNoYWRvd0NhbWVyYS5ib3R0b20gPSBjYW1lcmEuYm90dG9tO1xuICB9XG5cbiAgLy8gQ09QWUlORyAmIENMT05JTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgdHJhbnNmb3JtcyAmIGV4ZWN1dGUgYENvbXBvbmVudC5jb3B5KClgXG4gICAqIEByZXR1cm4ge3RoaXN9IExpZ2h0Q29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UpIHtcbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRhcmdldCkgdGhpcy50YXJnZXQuY29weShzb3VyY2UudGFyZ2V0KCkpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLmNvcHkoc291cmNlLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucm90YXRpb24uY29weShzb3VyY2Uucm90YXRpb24pO1xuICAgICAgdGhpcy5xdWF0ZXJuaW9uLmNvcHkoc291cmNlLnF1YXRlcm5pb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlIGEgY2xvbmUgb2YgdGhpcyBMaWdodENvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7TGlnaHRDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtidWlsZDogZmFsc2V9KS5jb3B5KHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExpZ2h0Q29tcG9uZW50XG59O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5fSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICd0YXJnZXQnKVxuKVxuLyoqXG4gKiBAY2xhc3MgQ2FtZXJhQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBDYW1lcmFDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcblxuICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IENhbWVyYUNvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gQ2FtZXJhQ29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ0NhbWVyYUNvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuXG4gICAgICB0aGlzLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ0NhbWVyYUNvbXBvbmVudCcsXG4gICAgICAnSW5zdGFuY2Ugc2hvdWxkIGhhdmUgaXRcXCdzIG93biAuYnVpbGQoKS4nLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgdHJhbnNmb3JtcyAoYHBvc2l0aW9uYCAmIGByb3RhdGlvbmApXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGNvbXBsZXRlZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICB3cmFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldCh0aGlzLnBhcmFtcy5wb3NpdGlvbi54LCB0aGlzLnBhcmFtcy5wb3NpdGlvbi55LCB0aGlzLnBhcmFtcy5wb3NpdGlvbi56KTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQodGhpcy5wYXJhbXMucm90YXRpb24ueCwgdGhpcy5wYXJhbXMucm90YXRpb24ueSwgdGhpcy5wYXJhbXMucm90YXRpb24ueik7XG5cbiAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBDYW1lcmFDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UpIHtcbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRhcmdldCkgdGhpcy50YXJnZXQuY29weShzb3VyY2UudGFyZ2V0KCkpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLmNvcHkoc291cmNlLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucm90YXRpb24uY29weShzb3VyY2Uucm90YXRpb24pO1xuICAgICAgdGhpcy5xdWF0ZXJuaW9uLmNvcHkoc291cmNlLnF1YXRlcm5pb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlIGEgY2xvbmUgb2YgdGhpcyBDYW1lcmFDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge0NhbWVyYUNvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtidWlsZDogZmFsc2V9KS5jb3B5KHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENhbWVyYUNvbXBvbmVudFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG4gIHJldHVybiB0aW1lWzBdICogMWUzICsgdGltZVsxXSAvIDFlNjtcbn07XG4iLCJpbXBvcnQgcHJlc2VudCBmcm9tICdwcmVzZW50JztcblxuZXhwb3J0IGNvbnN0IHN5c3RlbSA9IHtcbiAgd2luZG93OiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvd1xufTtcblxuaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIGdsb2JhbC5wZXJmb3JtYW5jZSA9IHtcbiAgICBub3c6IHByZXNlbnRcbiAgfTtcbn1cbiIsImltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi9wb2x5ZmlsbCc7XG5pbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuaW1wb3J0IHtNb2R1bGVNYW5hZ2VyfSBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuXG4vKipcbiAqIEBjbGFzcyBBcHBcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBwcmVwYXJlIGEgd29ybGQgc2NlbmUsIHNldHVwIHBoeXNpY3MsIGNhbWVyYSwgcmVuZGVyZXIgYW5kIGFsbCBvdGhlciB0aGluZ3MgdGhhdCB5b3UgdXN1YWxseSBkbyBiZWZvcmUgbWFraW5nIG1lc2hlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFttb2R1bGVzPVtdXSAtIEFycmF5IG9mIE1vZHVsZXNcbiAqIEBleHRlbmRzIE1vZHVsZVN5c3RlbVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIC8qKlxuICAgKiBTaW11bGF0ZSBmbGFnXG4gICAqIEBkZXNjcmlwdGlvbiBTYW1lIGFzIC51cGRhdGVFbmFibGVkLCBidXQgZm9yIHBoeXNpY3MuIERlZmluZXMgaWYgcGh5c2ljcyBpcyBzaW11bGF0ZWQgZWFjaCBmcmFtZS5cbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI3NpbXVsYXRlXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNpbXVsYXRlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBEZWZpbmVzIHdoZXRoZXIgdGhlIHNjZW5lIHNob3VsZCByZW5kZXIgb3Igbm90XG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkFwcCN1cGRhdGVFbmFibGVkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHVwZGF0ZUVuYWJsZWQgPSB0cnVlO1xuICAvKipcbiAgICogTG9vcHMgaW4gdGhpcyBhcHBcbiAgICogQGRlc2NyaXB0aW9uIEFycmF5IG9mIGxvb3BzIHRoYXQgYXJlIGV4ZWN1dGVkIGJ5IHRoaXMgYXBwLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQXBwI2xvb3BzXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGxvb3BzID0gW107XG5cbiAgY29uc3RydWN0b3IobW9kdWxlcyA9IFtdKSB7XG4gICAgY29uc29sZS5sb2coYFdIUy5BcHAgJHt2ZXJzaW9ufWApO1xuXG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hbmFnZXIgPSBuZXcgTW9kdWxlTWFuYWdlcih0aGlzKTtcbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuXG4gICAgdGhpcy5pbnRlZ3JhdGVNb2R1bGVzKCk7XG4gIH1cblxuICAvLyBDT05UUk9MUyAmIFVQREFUSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IHJlbmRlcmluZyBsb29wIGFuZCBwaHlzaWNzIHNpbXVsYXRpb24gKGlmIHlvdSB1c2UgdmVyc2lvbiB3aXRoIHBoeXNpY3MpLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqL1xuICBzdGFydCgpIHtcbiAgICBjb25zdCByZXF1ZXN0QW5pbUZyYW1lID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBzeXN0ZW0ud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBzeXN0ZW0ud2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBzeXN0ZW0ud2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBzeXN0ZW0ud2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHtsb29wcywgdXBkYXRlRW5hYmxlZH0gPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gcHJvY2VzcygpIHtcbiAgICAgIHJlcXVlc3RBbmltRnJhbWUocHJvY2Vzcyk7XG4gICAgICBpZiAoIXVwZGF0ZUVuYWJsZWQpIHJldHVybjtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxsID0gbG9vcHMubGVuZ3RoOyBpIDwgbGw7IGkrKykge1xuICAgICAgICBjb25zdCBlID0gbG9vcHNbaV07XG4gICAgICAgIGlmIChlLmVuYWJsZWQpIGUuZXhlY3V0ZShlLmNsb2NrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUVuYWJsZWQgPSB0cnVlO1xuICAgIHByb2Nlc3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0b3BcbiAgICogQGRlc2NyaXB0aW9uIFN0b3BzIHJlbmRlcmluZyBsb29wc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMudXBkYXRlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkTG9vcFxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBsb29wIHRvIHRoaXMgYXBwLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbG9vcCAtIHRoZSBsb29wIHRvIGFkZFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+QWRkaW5nIGEgbG9vcCB0byBhbiBhcHA8L2NhcHRpb24+XG4gICAqIGNvbnN0IGxvb3AgPSBuZXcgTG9vcCgoKSA9PiB7XG4gICAqICAvLyAuLi5cbiAgICogfSk7XG4gICAqXG4gICAqIGNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbiAgICpcbiAgICogYXBwLmFkZExvb3AobG9vcCk7XG4gICAqIGxvb3Auc3RhcnQoKTtcbiAgICovXG4gIGFkZExvb3AobG9vcCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMubG9vcHMucHVzaChsb29wKTtcbiAgICAgIHJlc29sdmUobG9vcCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVMb29wXG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGxvb3AgZnJvbSB0aGlzIGFwcC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGxvb3AgLSB0aGUgbG9vcCB0byByZW1vdmVcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqL1xuICByZW1vdmVMb29wKGxvb3ApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMubG9vcHMuaW5kZXhPZihsb29wKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHRoaXMubG9vcHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgcmVzb2x2ZShsb29wKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLmdldChrZXkpO1xuICB9XG5cbiAgdXNlKGtleSkge1xuICAgIHJldHVybiB0aGlzLm1hbmFnZXIudXNlKGtleSk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQXBwXG59O1xuIiwiaW1wb3J0IHtDbG9ja30gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBMb29wXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBmdW5jdGlvbiB0byBleGVjdXRlIG9uIGVhY2ggYW5pbWF0aW9uIGZyYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt1c2VDbG9jaz10cnVlXSBwYXNzZXMgYSBDbG9jayB0byB0aGUgZnVuY3Rpb24gd2hlbiBjYWxsZWQsIGlmIHRydWVcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBMb29wIHtcbiAgY29uc3RydWN0b3IoZnVuYywgdXNlQ2xvY2sgPSB0cnVlKSB7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICB0aGlzLmNsb2NrID0gdXNlQ2xvY2sgPyBuZXcgQ2xvY2soKSA6IG51bGw7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvLyBDT05UUk9MU1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0YXJ0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnRzIHRoaXMgbG9vcCwgY2xvY2sgaWYgaXQgaGFzIG9uZS4gV29uJ3QgZG8gYW55dGhpbmcgaWYgbG9vcCBlbmFibGVkIGFscmVhZHkuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBbd29ybGRdIGFwcCB0byBhZGQgdGhpcyBsb29wIHRvLCBpZiBwcm92aWRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICovXG4gIHN0YXJ0KHdvcmxkKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHdvcmxkKSB3b3JsZC5hZGRMb29wKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuY2xvY2spIHRoaXMuY2xvY2suc3RhcnQoKTtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFN0b3BzIHRoaXMgbG9vcCBhbmQgaXRzIGNsb2NrIGlmIGl0IGhhcyBvbmUsIHdvbid0IGRvIGFueXRoaW5nIGlmIHRoaXMgbG9vcCBpcyBub3QgZW5hYmxlZClcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IFt3b3JsZF0gYXBwIHRvIHJlbW92ZSB0aGlzIGxvb3AgZnJvbSwgaWYgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Mb29wXG4gICAqL1xuICBzdG9wKHdvcmxkKSB7XG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmNsb2NrKSB0aGlzLmNsb2NrLnN0b3AoKTtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgIGlmICh3b3JsZCkgd29ybGQucmVtb3ZlTG9vcCh0aGlzKTtcbiAgfVxuXG4gIC8vIEVYRUNVVElPTlxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGV4ZWN1dGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlcyB0aGUgZnVuY3Rpb24gb2YgdGhpcyBsb29wXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Mb29wXG4gICAqIEByZXR1cm5zIHsqfSB3aGF0ZXZlciB0aGUgZnVuY3Rpb24gb2YgdGhpcyBsb29wIHJldHVybnNcbiAgICovXG4gIGV4ZWN1dGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnVuYyh0aGlzLmNsb2NrKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMb29wXG59O1xuIiwiLyoqIEBtb2R1bGUgY29yZSAqL1xuZXhwb3J0ICogZnJvbSAnLi9Db21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNoQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTGlnaHRDb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9DYW1lcmFDb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9BcHAnO1xuZXhwb3J0ICogZnJvbSAnLi9Mb29wJztcbmV4cG9ydCAqIGZyb20gJy4vTW9kdWxlTWFuYWdlcic7XG4iLCJpbXBvcnQge0FtYmllbnRMaWdodCBhcyBBbWJpZW50TGlnaHROYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBBbWJpZW50TGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIEFtYmllbnRMaWdodCBpcyBhIHNpbXBsZSBjbGFzcywgaXQgZXh0ZW5kcyBMaWdodCBhbmQgaW5oZXJpdHMgYWxsIGl0cyBtZXRob2RzLlxuICogQW1iaWVudExpZ2h0IGNyZWF0ZXMgYmFzaWMgbGlnaHQgYXJvdW5kIGFsbCBzY2VuZSwgc28gaXQgZG9lc24ndCBuZWVkIHByb3BlcnRpZXMgbGlrZSBwb3Mgb3IgdGFyZ2V0LlxuICogSXQgc3VwcG9ydHMgb25seSBjb2xvciBhbmQgaW50ZW5zaXR5IGFzIHBhcmFtZXRlcnMsIHdoaWNoIGRlZmluZXMgdGhlIGNvbG9yIG9mIHRoZSBzdXJyb3VuZGVkIGxpZ2h0IGFuZCBpbnRlbnNpdHkgb2YgbGlnaHQuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gQW1iaWVudExpZ2h0IDwvY2FwdGlvbj5cbiAqIG5ldyBBbWJpZW50TGlnaHQoe1xuICogICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgIGludGVuc2l0eTogMC4yXG4gKiB9KS5hZGRUbyh3b3JsZCk7XG4gKi9cbmNsYXNzIEFtYmllbnRMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBBbWJpZW50TGlnaHQuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBBbWJpZW50TGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFtYmllbnRMaWdodFxufTtcbiIsImltcG9ydCB7RGlyZWN0aW9uYWxMaWdodCBhcyBEaXJlY3Rpb25hbExpZ2h0TmF0aXZlLCBEaXJlY3Rpb25hbExpZ2h0SGVscGVyfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgRGlyZWN0aW9uYWxMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gRGlyZWN0aW5hbExpZ2h0IGNyZWF0ZXMgYSBsaWdodCB0aGF0IHNoaW5lcyBmcm9tIGEgc3BlY2lmaWMgZGlyZWN0aW9uIG5vdCBmcm9tIGEgc3BlY2lmaWMgcG9zaXRpb24uPGJyLz48YnIvPlxuICogVGhpcyBsaWdodCB3aWxsIGJlaGF2ZSBhcyB0aG91Z2ggaXQgaXMgaW5maW5pdGVseSBmYXIgYXdheSBhbmQgdGhlIHJheXMgcHJvZHVjZWQgZnJvbSBpdCBhcmUgYWxsIHBhcmFsbGVsLiA8YnIvPjxici8+XG4gKiBUaGUgYmVzdCBhbmFsb2d5IHdvdWxkIGJlIGEgbGlnaHQgc291cmNlIHRoYXQgYWN0cyBsaWtlIHRoZSBzdW46IHRoZSBzdW4gaXMgc28gZmFyIGF3YXkgdGhhdCBhbGwgc3VubGlnaHQgaGl0dGluZyBvYmplY3RzIGNvbWVzIGZyb20gdGhlIHNhbWUgYW5nbGUuPGJyLz48YnIvPlxuICogSXQgaGFzIHRoZSBzYW1lIG9wdGlvbnMgYXMgQW1iaWVudExpZ2h0IGluIGxpZ2h0IHBhcmFtYXRlciwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zIGFuZCB0YXJnZXQgcGFyYW1hdGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIERpcmVjdGlvbmFsTGlnaHQgdG8gZmFsbCBkb3duIGZyb20gdmVjMygxMCwgMjAsIDEwKSB0byB2ZWMzKDAsIDAsIDApPC9jYXB0aW9uPlxuICogbmV3IERpcmVjdGlvbmFsTGlnaHQoe1xuICogICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgIGludGVuc2l0eTogMC4yLFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRGlyZWN0aW9uYWxMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBEaXJlY3Rpb25hbExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgRGlyZWN0aW9uYWxMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgRGlyZWN0aW9uYWxMaWdodFxufTtcbiIsImltcG9ydCB7SGVtaXNwaGVyZUxpZ2h0IGFzIEhlbWlzcGhlcmVMaWdodE5hdGl2ZSwgSGVtaXNwaGVyZUxpZ2h0SGVscGVyfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSGVtaXNwaGVyZUxpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBIZW1pc3BoZXJlTGlnaHQgaXMgYSBsaWdodCBzb3VyY2UgcG9zaXRpb25lZCBkaXJlY3RseSBhYm92ZSB0aGUgc2NlbmUuPGJyLz5cbiAqIEl0IGFsc28gZG9lc24ndCBuZWVkIHBvc2l0aW9uIGFuZCB0YXJnZXQgcHJvcGVydGllcy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9saWdodHNfaGVtaXNwaGVyZS5odG1sXCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtza3lDb2xvcjogMHhmZmZmZmYsIGdyb3VuZENvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEhlbWlzcGhlcmVMaWdodDwvY2FwdGlvbj5cbiAqIG5ldyBIZW1pc3BoZXJlTGlnaHQoe1xuICogICBza3lDb2xvcjogMHhmZjAwMDAsXG4gKiAgIGdyb3VuZENvbG9yOiAweDAwMDBmZixcbiAqICAgaW50ZW5zaXR5OiAwLjJcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEhlbWlzcGhlcmVMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgc2t5Q29sb3I6IDB4ZmZmZmZmLFxuICAgIGdyb3VuZENvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBIZW1pc3BoZXJlTGlnaHQuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBIZW1pc3BoZXJlTGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuc2t5Q29sb3IsXG4gICAgICBwYXJhbXMuZ3JvdW5kQ29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEhlbWlzcGhlcmVMaWdodFxufTtcbiIsImltcG9ydCB7UG9pbnRMaWdodCBhcyBQb2ludExpZ2h0TmF0aXZlLCBQb2ludExpZ2h0SGVscGVyfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUG9pbnRMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gUG9pbnRMaWdodCBjcmVhdGVzIGEgbGlnaHQgYXQgYSBzcGVjaWZpYyBwb3NpdGlvbiBpbiB0aGUgc2NlbmUuIFRoZSBsaWdodCBzaGluZXMgaW4gYWxsIGRpcmVjdGlvbnMgKHJvdWdobHkgc2ltaWxhciB0byBhIGxpZ2h0IGJ1bGIuKTxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBvcHRpb25zIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCBwYXJhbWF0ZXIsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvc2l0aW9uLCBkaXN0YW5jZSBhbmQgZGVjYXkuPGJyLz5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxLCBkaXN0YW5jZTogMTAwLCBkZWNheTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBMaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBQb2ludExpZ2h0PC9jYXB0aW9uPlxuICogbmV3IFBvaW50TGlnaHQoIHtcbiAqICAgY29sb3I6IDB4ZmYwMDAwLFxuICogICBpbnRlbnNpdHk6IDIsXG4gKiAgIGRpc3RhbmNlOiAzMDBcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMTAsIDIwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBvaW50TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cz0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMSxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIGRlY2F5OiAxXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUG9pbnRMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IFBvaW50TGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5LFxuICAgICAgcGFyYW1zLmRpc3RhbmNlLFxuICAgICAgcGFyYW1zLmRlY2F5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBvaW50TGlnaHRcbn07XG4iLCJpbXBvcnQge1Nwb3RMaWdodCBhcyBTcG90TGlnaHROYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBTcG90TGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIFNwb3RMaWdodCBjcmVhdGVzIHNwb3QgbGlnaHQgdGhhdCBjYW4gY2FzdCBzaGFkb3cgaW4gb25lIGRpcmVjdGlvbi4gPGJyLz48YnIvPlxuICogSXQgaGFzIHRoZSBzYW1lIHBhcmFtZXRlcnMgYXMgQW1iaWVudExpZ2h0IGluIGxpZ2h0LCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3MgYW5kIHRhcmdldC4gPGJyLz48YnIvPlxuICogU3BvdExpZ2h0IGFmZmVjdHMgbWVzaGVzIHdpdGggbGFtYmVydCBhbmQgcGhvbmcgbWF0ZXJpYWwuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfbGlnaHRzX3Nwb3RsaWdodC5odG1sXCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMSwgZGlzdGFuY2U6IDEwMCwgYW5nbGU6IE1hdGguUEkgLyAzLCBleHBvbmVudDogMCwgZGVjYXk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgU3BvdExpZ2h0IHRoYXQgZmFsbHMgZG93biBmcm9tIHZlYzMoMTAsIDIwLCAxMCkgdG8gdmVjMygwLCAwLCAwKTwvY2FwdGlvbj5cbiAqIG5ldyBTcG90TGlnaHQoe1xuICogICBjb2xvcjogMHgwMGZmMDAsXG4gKiAgIGludGVuc2l0eTogMyxcbiAqICAgZGlzdGFuY2U6IDEwMDBcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMTAsIDIwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNwb3RMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMSxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIGFuZ2xlOiBNYXRoLlBJIC8gMyxcbiAgICBleHBvbmVudDogMCxcbiAgICBkZWNheTogMVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTcG90TGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBTcG90TGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5LFxuICAgICAgcGFyYW1zLmRpc3RhbmNlLFxuICAgICAgcGFyYW1zLmFuZ2xlLFxuICAgICAgcGFyYW1zLmV4cG9uZW50LFxuICAgICAgcGFyYW1zLmRlY2F5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFNwb3RMaWdodFxufTtcbiIsImltcG9ydCB7UmVjdEFyZWFMaWdodCBhcyBSZWN0QXJlYUxpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuY2xhc3MgQXJlYUxpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIHdpZHRoOiAxMCxcbiAgICBoZWlnaHQ6IDEwXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEFyZWFMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IFJlY3RBcmVhTGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5LFxuICAgICAgcGFyYW1zLndpZHRoLFxuICAgICAgcGFyYW1zLmhlaWdodFxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcmVhTGlnaHRcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL2xpZ2h0cyAqL1xuZXhwb3J0ICogZnJvbSAnLi9BbWJpZW50TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9EaXJlY3Rpb25hbExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vSGVtaXNwaGVyZUxpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vUG9pbnRMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL1Nwb3RMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0FyZWFMaWdodCc7XG4iLCJpbXBvcnQge0N1YmVDYW1lcmEgYXMgQ3ViZUNhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ3ViZUNhbWVyYVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvY2FtZXJhc1xuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgNiBjYW1lcmFzIHRoYXQgcmVuZGVyIHRvIGEgV2ViR0xSZW5kZXJUYXJnZXRDdWJlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGVzIGEgQ3ViZUNhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBDdWJlQ2FtZXJhKHtcbiAqICAgY2FtZXJhOiB7XG4gKiAgICAgY3ViZVJlc29sdXRpb246IDI1NlxuICogICB9LFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAwLFxuICogICAgIHk6IDEwMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIEN1YmVDYW1lcmEgZXh0ZW5kcyBDYW1lcmFDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXMuQ3ViZUNhbWVyYSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBjYW1lcmE6IHtcbiAgICogICAgIG5lYXI6IDEsXG4gICAqICAgICBmYXI6IDEwMDAsXG4gICAqICAgICBjdWJlUmVzb2x1dGlvbjogMTI4XG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgY3ViZVJlc29sdXRpb246IDEyOFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBDdWJlQ2FtZXJhLmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2NhbWVyYTogbmV3IEN1YmVDYW1lcmFOYXRpdmUoXG4gICAgICBwYXJhbXMubmVhcixcbiAgICAgIHBhcmFtcy5mYXIsXG4gICAgICBwYXJhbXMuY3ViZVJlc29sdXRpb25cbiAgICApfSkuY2FtZXJhO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEN1YmVDYW1lcmFcbn07XG4iLCJpbXBvcnQge09ydGhvZ3JhcGhpY0NhbWVyYSBhcyBPcnRob2dyYXBoaWNDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vLi4vcG9seWZpbGwnO1xuXG4vKipcbiAqIEBjbGFzcyBPcnRob2dyYXBoaWNDYW1lcmFcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBkZXNjcmlwdGlvbiBDYW1lcmEgd2l0aCBvcnRob2dyYXBoaWMgcHJvamVjdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbiBPcnRob2dyYXBoaWNDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhKHtcbiAqICAgY2FtZXJhOiB7XG4gKiAgICAgZmFyOiAxMDAwMFxuICogICB9LFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiA1MFxuICogICB9XG4gKiB9KTtcbiAqXG4gKiBhcHAuY2FtZXJhID0gY2FtZXJhO1xuICovXG5jbGFzcyBPcnRob2dyYXBoaWNDYW1lcmEgZXh0ZW5kcyBDYW1lcmFDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLk9ydGhvZ3JhcGhpY0NhbWVyYSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBuZWFyOiAxLFxuICAgKiAgIGZhcjogMTAwMCxcbiAgICogICBsZWZ0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAtMixcbiAgICogICByaWdodDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gMixcbiAgICogICB0b3A6IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAyLFxuICAgKiAgIGJvdHRvbTogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIC0yXG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBsZWZ0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAtMixcbiAgICByaWdodDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gMixcbiAgICB0b3A6IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAyLFxuICAgIGJvdHRvbTogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIC0yXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIE9ydGhvZ3JhcGhpY0NhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBPcnRob2dyYXBoaWNDYW1lcmFOYXRpdmUoXG4gICAgICBwYXJhbXMubGVmdCxcbiAgICAgIHBhcmFtcy5yaWdodCxcbiAgICAgIHBhcmFtcy50b3AsXG4gICAgICBwYXJhbXMuYm90dG9tLFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBPcnRob2dyYXBoaWNDYW1lcmFcbn07XG4iLCJpbXBvcnQge1BlcnNwZWN0aXZlQ2FtZXJhIGFzIFBlcnNwZWN0aXZlQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uLy4uL3BvbHlmaWxsJztcblxuLyoqXG4gKiBAY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmFcbiAqIEBkZXNjcmlwdGlvbiBDYW1lcmEgd2l0aCBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uLlxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvY2FtZXJhc1xuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFuIFBlcnNwZWN0aXZlQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKHtcbiAqICAgZm92OiA3NSxcbiAqICAgYXNwZWN0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KTtcbiAqXG4gKiBhcHAuY2FtZXJhID0gY2FtZXJhO1xuICovXG5jbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXMuUGVyc3BlY3RpdmVDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgbmVhcjogMSxcbiAgICogICBmYXI6IDEwMDAsXG4gICAqICAgZm92OiA3NSxcbiAgICogICBhc3BlY3Q6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHRcbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGZvdjogNzUsXG4gICAgYXNwZWN0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0XG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBlcnNwZWN0aXZlQ2FtZXJhLmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2NhbWVyYTogbmV3IFBlcnNwZWN0aXZlQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLmZvdixcbiAgICAgIHBhcmFtcy5hc3BlY3QsXG4gICAgICBwYXJhbXMubmVhcixcbiAgICAgIHBhcmFtcy5mYXJcbiAgICApfSkuY2FtZXJhO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBlcnNwZWN0aXZlQ2FtZXJhXG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9jYW1lcmFzICovXG5leHBvcnQgKiBmcm9tICcuL0N1YmVDYW1lcmEnO1xuZXhwb3J0ICogZnJvbSAnLi9PcnRob2dyYXBoaWNDYW1lcmEnO1xuZXhwb3J0ICogZnJvbSAnLi9QZXJzcGVjdGl2ZUNhbWVyYSc7XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBCb3hCdWZmZXJHZW9tZXRyeSxcbiAgQm94R2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEJveFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQXMgdG9sZCBvbiBDb21wb25lbnQgZGVmaW5pdGlvbiwgd2hpbGUgeW91IGNhbiBwYXNzIGFueSBvZiB0aGUgaW5oZXJpdGVkIHBhcmFtcyBmb3IgdGhpcyBjb21wb25lbnQgY29uc3RydWN0aW9uLCB5b3Ugd2lsbCBuZWVkIHRvXG4gKiBwYXNzIHNwZWNpZmljIHBhcmFtZXRlcnMgdG8gYnVpbGQgdGhpcyBtZXNoIGFzIGEgZ2VvbWV0cnkgb2JqZWN0LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNCb3hHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQm94LCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqICBuZXcgQm94KHtcbiAqICAgIGdlb21ldHJ5OiB7XG4gKiAgICAgIHdpZHRoOiAyLFxuICogICAgICBoZWlnaHQ6IDIsXG4gKiAgICAgIGRlcHRoOiAyXG4gKiAgICB9LFxuICpcbiAqICAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgIH0pLFxuICpcbiAqICAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEJveCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Cb3gjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHdpZHRoOiAxLFxuICAgKiAgICAgaGVpZ2h0OiAxLFxuICAgKiAgICAgZGVwdGg6IDEsXG4gICAqICAgICB3aWR0aFNlZ21lbnRzOiAxLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBkZXB0aFNlZ21lbnRzOiAxXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBkZXB0aDogMSxcbiAgICAgIHdpZHRoU2VnbWVudHM6IDEsXG4gICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICAgIGRlcHRoU2VnbWVudHM6IDFcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Cb3gjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ2RlcHRoJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnLCAnZGVwdGhTZWdlbWVudHMnXVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnZGVwdGgnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cycsICdkZXB0aFNlZ2VtZW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEJveC5kZWZhdWx0cywgQm94Lmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveFxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQm94QnVmZmVyR2VvbWV0cnkgOiBCb3hHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRlcHRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGVwdGhTZWdtZW50c1xuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQm94XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ2lyY2xlQnVmZmVyR2VvbWV0cnksXG4gIENpcmNsZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDaXJjbGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEFzIHRvbGQgb24gQ29tcG9uZW50IGRlZmluaXRpb24sIHdoaWxlIHlvdSBjYW4gcGFzcyBhbnkgb2YgdGhlIGluaGVyaXRlZCBwYXJhbXMgZm9yIHRoaXMgY29tcG9uZW50IGNvbnN0cnVjdGlvbiwgeW91IHdpbGwgbmVlZCB0b1xuICogcGFzcyBzcGVjaWZpYyBwYXJhbWV0ZXJzIHRvIGJ1aWxkIHRoaXMgbWVzaCBhcyBhIGdlb21ldHJ5IG9iamVjdC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjQ2lyY2xlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIENpcmNsZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiAgbmV3IENpcmNsZSh7XG4gKiAgICBnZW9tZXRyeToge1xuICogICAgICByYWRpdXM6IDQsXG4gKiAgICAgIHNlZ21lbnRzOiAxNlxuICogICAgfSxcbiAqXG4gKiAgICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgICB9KSxcbiAqXG4gKiAgICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDaXJjbGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ2lyY2xlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDUwLFxuICAgKiAgICAgc2VnbWVudHM6IDgsXG4gICAqICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgKiAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDUwLFxuICAgICAgc2VnbWVudHM6IDgsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ2lyY2xlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IGdlb21ldHJ5OiBbJ3JhZGl1cycsICdzZWdtZW50cycsICd0aGV0YVN0YXJ0JywgJ3RoZXRhTGVuZ3RoJ11cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3NlZ21lbnRzJywgJ3RoZXRhU3RhcnQnLCAndGhldGFMZW5ndGgnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBDaXJjbGUuZGVmYXVsdHMsIENpcmNsZS5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IENpcmNsZUJ1ZmZlckdlb21ldHJ5IDogQ2lyY2xlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDaXJjbGVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBDb25lQnVmZmVyR2VvbWV0cnksXG4gIENvbmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ29uZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQSBjeWxpbmRlciBpcyBvbmUgb2YgdGhlIG1vc3QgYmFzaWMgY3VydmlsaW5lYXIgZ2VvbWV0cmljIHNoYXBlcywgdGhlIHN1cmZhY2UgZm9ybWVkIGJ5IHRoZSBwb2ludHMgYXQgYSBmaXhlZCBkaXN0YW5jZSBmcm9tIGEgZ2l2ZW4gc3RyYWlnaHQgbGluZSwgdGhlIGF4aXMgb2YgdGhlIGN5bGluZGVyLiA8YnIvPjxici8+XG4gKiBUaGUgc29saWQgZW5jbG9zZWQgYnkgdGhpcyBzdXJmYWNlIGFuZCBieSB0d28gcGxhbmVzIHBlcnBlbmRpY3VsYXIgdG8gdGhlIGF4aXMgaXMgYWxzbyBjYWxsZWQgYSBjeWxpbmRlci48YnIvPlxuICogVGhlIHN1cmZhY2UgYXJlYSBhbmQgdGhlIHZvbHVtZSBvZiBhIGN5bGluZGVyIGhhdmUgYmVlbiBrbm93biBzaW5jZSBkZWVwIGFudGlxdWl0eS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjQ29uZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDb25lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBDb25lKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXNUb3A6IDIsXG4gKiAgICAgcmFkaXVzQm90dG9tOiA0LFxuICogICAgIGhlaWdodDogNVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQ29uZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Db25lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDIwLFxuICAgKiAgICAgaGVpZ2h0OiAxMDAsXG4gICAqICAgICByYWRpdXNTZWdtZW50czogMzIsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICogICAgIG9wZW5FbmRlZDogZmFsc2UsXG4gICAqICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgKiAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICByYWRpdXNTZWdtZW50czogMzIsXG4gICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICAgIG9wZW5FbmRlZDogZmFsc2UsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeTogW1xuICAgKiAgICdyYWRpdXMnLFxuICAgKiAgICdoZWlnaHQnLFxuICAgKiAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICogICAnb3BlbkVuZGVkJyxcbiAgICogICAndGhldGFTdGFydCcsXG4gICAqICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiBdXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1cycsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgICAgJ29wZW5FbmRlZCcsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBDb25lLmRlZmF1bHRzLCBDb25lLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Db25lXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDb25lQnVmZmVyR2VvbWV0cnkgOiBDb25lR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3BlbkVuZGVkLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENvbmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBDeWxpbmRlckJ1ZmZlckdlb21ldHJ5LFxuICBDeWxpbmRlckdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDeWxpbmRlclxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQSBjeWxpbmRlciBpcyBvbmUgb2YgdGhlIG1vc3QgYmFzaWMgY3VydmlsaW5lYXIgZ2VvbWV0cmljIHNoYXBlcywgdGhlIHN1cmZhY2UgZm9ybWVkIGJ5IHRoZSBwb2ludHMgYXQgYSBmaXhlZCBkaXN0YW5jZSBmcm9tIGEgZ2l2ZW4gc3RyYWlnaHQgbGluZSwgdGhlIGF4aXMgb2YgdGhlIGN5bGluZGVyLiA8YnIvPjxici8+XG4gKiBUaGUgc29saWQgZW5jbG9zZWQgYnkgdGhpcyBzdXJmYWNlIGFuZCBieSB0d28gcGxhbmVzIHBlcnBlbmRpY3VsYXIgdG8gdGhlIGF4aXMgaXMgYWxzbyBjYWxsZWQgYSBjeWxpbmRlci48YnIvPlxuICogVGhlIHN1cmZhY2UgYXJlYSBhbmQgdGhlIHZvbHVtZSBvZiBhIGN5bGluZGVyIGhhdmUgYmVlbiBrbm93biBzaW5jZSBkZWVwIGFudGlxdWl0eS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjQ3lsaW5kZXJHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ3lsaW5kZXIsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IEN5bGluZGVyKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXNUb3A6IDIsXG4gKiAgICAgcmFkaXVzQm90dG9tOiA0LFxuICogICAgIGhlaWdodDogNVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQ3lsaW5kZXIgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXIjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1c1RvcDogMjAsXG4gICAqICAgICByYWRpdXNCb3R0b206IDIwLFxuICAgKiAgICAgaGVpZ2h0OiAxMDAsXG4gICAqICAgICByYWRpdXNTZWdtZW50czogMzIsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICogICAgIG9wZW5FbmRlZDogZmFsc2UsXG4gICAqICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgKiAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzVG9wOiAwLFxuICAgICAgcmFkaXVzQm90dG9tOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbXG4gICAqICAgJ3JhZGl1c1RvcCcsXG4gICAqICAgJ3JhZGl1c0JvdHRvbScsXG4gICAqICAgJ2hlaWdodCcsXG4gICAqICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICogICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgKiAgICdvcGVuRW5kZWQnLFxuICAgKiAgICd0aGV0YVN0YXJ0JyxcbiAgICogICAndGhldGFMZW5ndGgnXG4gICAqIF1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzVG9wJyxcbiAgICAgICdyYWRpdXNCb3R0b20nLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICAgICdvcGVuRW5kZWQnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ3lsaW5kZXIuZGVmYXVsdHMsIEN5bGluZGVyLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlclxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ3lsaW5kZXJCdWZmZXJHZW9tZXRyeSA6IEN5bGluZGVyR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1RvcCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNCb3R0b20sXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm9wZW5FbmRlZCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDeWxpbmRlclxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIERvZGVjYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBEb2RlY2FoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgRG9kZWNhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYSBkb2RlY2FoZWRyb24gaXMgYW55IHBvbHloZWRyb24gd2l0aCB0d2VsdmUgZmxhdCBmYWNlcy4gPGJyLz48YnIvPlxuICogVGhlIG1vc3QgZmFtaWxpYXIgZG9kZWNhaGVkcm9uIGlzIHRoZSByZWd1bGFyIGRvZGVjYWhlZHJvbiwgd2hpY2ggaXMgYSBQbGF0b25pYyBzb2xpZC4gPGJyLz5cbiAqIFRoZXJlIGFyZSBhbHNvIHRocmVlIHJlZ3VsYXIgc3RhciBkb2RlY2FoZWRyYSwgd2hpY2ggYXJlIGNvbnN0cnVjdGVkIGFzIHN0ZWxsYXRpb25zIG9mIHRoZSBjb252ZXggZm9ybS4gPGJyLz5cbiAqIEFsbCBvZiB0aGVzZSBoYXZlIGljb3NhaGVkcmFsIHN5bW1ldHJ5LCBvcmRlciAxMjAuXG4gKiBEb2RlY2FoZWRyb24gY3JlYXRlcyBEb2RlY2FoZWRyb24gb2JqZWN0IGJ5IGl0J3MgcmFkaXVzIGFuZCBkZXRhaWwuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0RvZGVjYWhlZHJvbkdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBEb2RlY2FoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IERvZGVjYWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDEwXG4gKiAgIH1cbiAgKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBEb2RlY2FoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkRvZGVjYWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiB7XG4gICAqICAgcmFkaXVzOiAxLFxuICAgKiAgIGRldGFpbDogMFxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkRvZGVjYWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBEb2RlY2FoZWRyb24uZGVmYXVsdHMsIERvZGVjYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IERvZGVjYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogRG9kZWNhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIERvZGVjYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEJ1ZmZlckdlb21ldHJ5LFxuICBFeHRydWRlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEV4dHJ1ZGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEV4dHJ1ZGUgZ2VvbWV0cnkgbWVhbnMgdGhhdCB5b3UgY2FuIGNyZWF0ZSBhIDNEIG1lc2ggZnJvbSBhbnkgMkQgc2hhcGUgdXNpbmcgdGhyZWUuanMgZ2VvbWV0cnkgYmFzZWQgb24gPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvbWF0aC9WZWN0b3IyJz5USFJFRS5WZWN0b3IyLjwvYT4gPGJyLz5cbiAqIFN1Y2ggaW1wbGVtZW50YXRpb24gd2lsbCBoZWxwIHlvdSB0byBtYWtlIHZvbHVtZWQgc2hhcGVzIHRoYXQgaGF2ZSB0aGVpciBvd24gZGVwdGggYW5kIGNhbiBiZSBzZWVuIGZyb20gYWxsIGFuZ2Vscy48YnIvPjxici8+XG4gKiBZb3UgY2FuIGFsc28gZmluZCBzb21lIGludGVyZXN0aW5nIGV4YW1wbGVzIG1hZGUgdXNpbmcgPGEgaHJlZj0ndGhyZWVqcy5vcmcnPnRocmVlLmpzPC9hPiB3aGljaCBpcyBhIGNvcmUgb2Ygd2hzLmpzLCBzdWNoIGFzOlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zaGFwZXMuaHRtbCc+V2ViZ2wgZ2VvbWV0cnkgZXh0cnVkZTwvYT5cbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc2hhcGVzMi5odG1sJz5FeHRydWRlIHNoYXBlcyBmcm9tIGdlb2RhdGE8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NwbGluZXMuaHRtbCc+RXh0cnVkZSBzcGxpbmVzPC9hPlxuICpcbiAqIFN1Y2ggZXhhbXBsZXMgY2FuIGJlIGVhc2lseSBpbXBsZW1lbnRlZCB1c2luZyB3aGl0ZXN0b3JtLmpzIG9yIGl0J3MgcGx1Z2lucy4gVXNlIGBFeHRydWRlYCBjbGFzcyB3aXRoIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2V4dHJhcy9jb3JlL1NoYXBlJz5USFJFRS5TaGFwZTwvYT4gdG8gZ2V0IGV4dHJ1ZGUgZWZmZWN0IG9mIHNoYXBlIGRlZmluZWQgYnkgMkQgdmVjdG9ycy5cbiAqIFRoaXMgY2xhc3MgaXMgc2ltaWxhciB0byA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9nZW9tZXRyaWVzL0V4dHJ1ZGVHZW9tZXRyeSc+VEhSRUUuRXh0cnVkZUdlb21ldHJ5PC9hPixcbiAqIGJ1dCBpdCBhbHNvIGNvbnRhaW5zIGFsbCBwcm9wZXJ0aWVzLCBhcHBsaWVkIGJ5IGBTaGFwZWAsIHN1Y2ggYXMgbWF0ZXJpYWwsIG1hc3MgYW5kIHZlY3RvcnMgbGlrZSBwb3NpdGlvbiAocG9zKSBhbmQgcm90YXRpb24gKHJvdCkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0V4dHJ1ZGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgc2hhcGUsIHRoZW4gYW4gRXh0cnVkZSBmcm9tIGl0PC9jYXB0aW9uPlxuICogY29uc3Qgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoW1xuICogICBuZXcgVEhSRUUuVmVjdG9yMigtNCwtNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC0yLDApLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigtNCw0KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwyKSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoNCw0KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoMiwwKSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoNCwtNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsLTIpXG4gKiBdKTtcbiAqXG4gKiBjb25zdCBleHRydWRlID0gbmV3IEV4dHJ1ZGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHNoYXBlczogc2hhcGUsXG4gKiAgICAgb3B0aW9uczoge1xuICogICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAqICAgICAgIGJldmVsU2l6ZTogMCxcbiAqICAgICAgIGFtb3VudDogMlxuICogICAgIH1cbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSk7XG4gKlxuICogZXh0cnVkZS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBFeHRydWRlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBzaGFwZXM6IFtdLFxuICAgKiAgICAgb3B0aW9uczoge31cbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgc2hhcGVzOiBbXSxcbiAgICAgIG9wdGlvbnM6IHt9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnc2hhcGVzJywgJ29wdGlvbnMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydzaGFwZXMnLCAnb3B0aW9ucyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEV4dHJ1ZGUuZGVmYXVsdHMsIEV4dHJ1ZGUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBFeHRydWRlR2VvbWV0cnkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2hhcGVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm9wdGlvbnNcbiAgICApO1xuXG4gICAgcmV0dXJuIHBhcmFtcy5idWZmZXIgPyBuZXcgQnVmZmVyR2VvbWV0cnkoKS5mcm9tR2VvbWV0cnkoZ2VvbWV0cnkpIDogZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgRXh0cnVkZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIEljb3NhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEljb3NhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYW4gaWNvc2FoZWRyb24gaXMgYSBwb2x5aGVkcm9uIHdpdGggMjAgZmFjZXMuPGJyLz5cbiAqIFRoZXJlIGFyZSBtYW55IGtpbmRzIG9mIGljb3NhaGVkcmEsIHdpdGggc29tZSBiZWluZyBtb3JlIHN5bW1ldHJpY2FsIHRoYW4gb3RoZXJzLiBUaGUgbW9zdCB3ZWxsIGtub3duIGlzIHRoZSBQbGF0b25pYywgY29udmV4IHJlZ3VsYXIgaWNvc2FoZWRyb24uPGJyLz5cbiAqIGBJY29zYWhlZHJvbmAgY3JlYXRlcyBhbiBJY29zYWhlZHJvbiBvYmplY3QgYnkgaXRzIHJhZGl1cyBhbmQgZGV0YWlsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNJY29zYWhlZHJvbkdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBJY29zYWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgSWNvc2FoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSWNvc2FoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICBkZXRhaWw6IDBcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JY29zYWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCB7Z2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSWNvc2FoZWRyb24uZGVmYXVsdHMsIEljb3NhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JY29zYWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogSWNvc2FoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgSWNvc2FoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBMYXRoZUJ1ZmZlckdlb21ldHJ5LFxuICBMYXRoZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBMYXRoZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQSBgTGF0aGVHZW9tZXRyeWAgYWxsb3dzIHlvdSB0byBjcmVhdGUgc2hhcGVzIGZyb20gYSBzbW9vdGggY3VydmUuXG4gKiBUaGlzIGN1cnZlIGlzIGRlZmluZWQgYnkgYSBudW1iZXIgb2YgcG9pbnRzIChhbHNvIGNhbGxlZCBrbm90cykgYW5kIGlzIG1vc3Qgb2Z0ZW4gY2FsbGVkIGEgc3BsaW5lLiBUaGlzIHNwbGluZSBpcyByb3RhdGVkIGFyb3VuZCBhIGZpeGVkIHBvaW50IGFuZCByZXN1bHRzIGluIHZhc2UtIGFuZCBiZWxsLWxpa2Ugc2hhcGVzLjxici8+PGJyLz5cbiAqIEluIDNEIGNvbXB1dGVyIGdyYXBoaWNzLCBhIGxhdGhlZCBvYmplY3QgaXMgYSAzRCBtb2RlbCB3aG9zZSB2ZXJ0ZXggZ2VvbWV0cnkgaXMgcHJvZHVjZWQgYnkgcm90YXRpbmcgdGhlIHBvaW50cyBvZiBhIHNwbGluZSBvciBvdGhlciBwb2ludCBzZXQgYXJvdW5kIGEgZml4ZWQgYXhpcy5cbiAqIFRoZSBsYXRoaW5nIG1heSBiZSBwYXJ0aWFsOyB0aGUgYW1vdW50IG9mIHJvdGF0aW9uIGlzIG5vdCBuZWNlc3NhcmlseSBhIGZ1bGwgMzYwIGRlZ3JlZXMuXG4gKiBUaGUgcG9pbnQgc2V0IHByb3ZpZGluZyB0aGUgaW5pdGlhbCBzb3VyY2UgZGF0YSBjYW4gYmUgdGhvdWdodCBvZiBhcyBhIGNyb3NzIHNlY3Rpb24gdGhyb3VnaCB0aGUgb2JqZWN0IGFsb25nIGEgcGxhbmUgY29udGFpbmluZyBpdHMgYXhpcyBvZiByYWRpYWwgc3ltbWV0cnkuIDxici8+PGJyLz5cbiAqIFRoZSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0xhdGhlR2VvbWV0cnknPmZvbGxvd2luZyBleGFtcGxlPC9hPiBzaG93cyBhIGdlb21ldHJ5IHdoaWNoIGNhbiBiZSBnZW5lcmF0ZWQgdXNpbmcgYExhdGhlYCBjbGFzcy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjTGF0aGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgTGF0aCwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCBwb2ludHMgPSBbXTtcbiAqXG4gKiBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAqICAgcG9pbnRzLnB1c2goXG4gKiAgICAgbmV3IFRIUkVFLlZlY3RvcjIoXG4gKiAgICAgICAoTWF0aC5zaW4oaSAqIDAuNykgKiAxNSArIDUwKSAvIDEwLFxuICogICAgICAgKGkgLSA1KSAqIDAuMlxuICogICAgIClcbiAqICAgKTtcbiAqIH1cbiAqXG4gKiBjb25zdCBsYXRoZSA9IG5ldyBMYXRoZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcG9pbnRzOiBwb2ludHNcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgNTAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgTGF0aGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxhdGhlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBwb2ludHM6IFtdXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHBvaW50czogW11cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPntcbiAgICogICBnZW9tZXRyeTogWydwb2ludHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydwb2ludHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBMYXRoZS5kZWZhdWx0cywgTGF0aGUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxhdGhlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IExhdGhlQnVmZmVyR2VvbWV0cnkgOiBMYXRoZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wb2ludHNcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExhdGhlXG59O1xuIiwiaW1wb3J0IHtcbiAgTGluZSBhcyBMaW5lTmF0aXZlLFxuICBCdWZmZXJHZW9tZXRyeSxcbiAgR2VvbWV0cnksXG4gIEJ1ZmZlckF0dHJpYnV0ZSxcbiAgTGluZUN1cnZlMyxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgTGluZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gTGluZSBjb21wb25lbnQgaXMgZ2VuZXJhdGVkIGZyb20gYSBjdXJ2ZS9saW5lIGFuZCBhbW91bnQgb2YgdmVjdG9ycyB0aGF0IHNob3VsZCBiZSB1c2VkIChwb2ludHMpLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgTGluZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgTGluZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgY3VydmU6IG5ldyBUSFJFRS5MaW5lQ3VydmUzKG5ldyBUSFJFRS5WZWN0b3IzKDEwLCAxMCwgMCksIG5ldyBUSFJFRS5WZWN0b3IzKDEwLCAzMCwgMCkpXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIExpbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGN1cnZlOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMTAsIDAsIDApKSxcbiAgICogICAgIHBvaW50czogNTBcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgY3VydmU6IG5ldyBMaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygxMCwgMCwgMCkpLFxuICAgICAgcG9pbnRzOiA1MFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT57XG4gICAqICAgZ2VvbWV0cnk6IFsnY3VydmUnLCAncG9pbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnY3VydmUnLCAncG9pbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMsIExpbmUuZGVmYXVsdHMsIExpbmUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBMaW5lTmF0aXZlKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gcGFyYW1zLmJ1ZmZlciA/IG5ldyBCdWZmZXJHZW9tZXRyeSgpIDogbmV3IEdlb21ldHJ5KCk7XG5cbiAgICBpZiAocGFyYW1zLmJ1ZmZlcikge1xuICAgICAgY29uc3QgcHAgPSBwYXJhbXMuZ2VvbWV0cnkuY3VydmUuZ2V0UG9pbnRzKHBhcmFtcy5nZW9tZXRyeS5wb2ludHMpO1xuICAgICAgY29uc3QgdmVydHMgPSBuZXcgRmxvYXQzMkFycmF5KHBwLmxlbmd0aCAqIDMpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gcHAubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgICAgY29uc3QgaTMgPSBpICogMztcblxuICAgICAgICB2ZXJ0c1tpM10gPSBwcFtpXS54O1xuICAgICAgICB2ZXJ0c1tpMyArIDFdID0gcHBbaV0ueTtcbiAgICAgICAgdmVydHNbaTMgKyAyXSA9IHBwW2ldLno7XG4gICAgICB9XG5cbiAgICAgIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgQnVmZmVyQXR0cmlidXRlKHZlcnRzLCAzKSk7XG4gICAgfSBlbHNlIGdlb21ldHJ5LnZlcnRpY2VzID0gcGFyYW1zLmdlb21ldHJ5LmN1cnZlLmdldFBvaW50cyhwYXJhbXMuZ2VvbWV0cnkucG9pbnRzKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMaW5lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgSlNPTkxvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSW1wb3J0ZXJcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEltcG9ydGVyIGlzIGEgbG9hZGVyIGZvciBtZXNoZXMgYW5kIGFueSBvdGhlciBkYXRhIHRvIHlvdXIgc2NlbmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEltcG9ydGVyLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBJbXBvcnRlcih7XG4gKiAgIGxvYWRlcjogbmV3IFRIUkVFLk9CSkxvYWRlcigpLFxuICpcbiAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbCkgeyAvLyBkYXRhIGZyb20gbG9hZGVyXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7IC8vIHNob3VsZCByZXR1cm4geW91ciAubmF0aXZlIChtZXNoIGluIHRoaXMgY2FzZSlcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSW1wb3J0ZXIgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSW1wb3J0ZXIjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgdXJsOiAnJyxcbiAgICogICBsb2FkZXI6IG5ldyBKU09OTG9hZGVyKCksXG4gICAqXG4gICAqICAgb25Mb2FkKCkge30sXG4gICAqICAgb25Qcm9ncmVzcygpIHt9LFxuICAgKiAgIG9uRXJyb3IoKSB7fSxcbiAgICpcbiAgICogICB0ZXh0dXJlUGF0aDogbnVsbCxcbiAgICogICB1c2VDdXN0b21NYXRlcmlhbDogZmFsc2UsXG4gICAqXG4gICAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAgICogICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgdXJsOiAnJyxcbiAgICBsb2FkZXI6IG5ldyBKU09OTG9hZGVyKCksXG5cbiAgICBvbkxvYWQoKSB7fSxcbiAgICBvblByb2dyZXNzKCkge30sXG4gICAgb25FcnJvcigpIHt9LFxuXG4gICAgdGV4dHVyZVBhdGg6IG51bGwsXG4gICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IGZhbHNlLFxuXG4gICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAgICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICB9XG4gIH07XG5cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9uc1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpbHRlclxuICAgKiBAZGVzY3JpcHRpb24gRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge1RIUkVFLk1lc2h9IG9iamVjdCBJbnN0YW5jZSBmb3IgaXRlcmF0aW5nIHRocm91Z2ggaXQncyBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZmlsdGVyIEZ1bmN0aW9uIHdpdGggY2hpbGQgYXMgYXJndW1lbnQsIHNob3VsZCByZXR1cm4gYSBib29sZWFuIHdoZXRoZXIgaW5jbHVkZSB0aGUgY2hpbGQgb3Igbm90LlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBvYmplY3Qgd2l0aCBjaGlsZHJlblxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlJlbW92aW5nIHVubmVjZXNzYXJ5IGxpZ2h0cyBmcm9tIGNoaWxkcmVuPC9jYXB0aW9uPlxuICAgKiBuZXcgSWNvc2FoZWRyb24oe1xuICAgKiAgIGxvYWRlcjogbmV3IFRIUkVFLk9CSkxvYWRlcigpLFxuICAgKlxuICAgKiAgIHBhcnNlKGdyb3VwKSB7IC8vIGRhdGEgZnJvbSBsb2FkZXJcbiAgICogICAgIHJldHVybiBJbXBvcnRlci5maWx0ZXIoZ3JvdXAsIGNoaWxkID0+ICFjaGlsZC5pc0xpZ2h0KTsgLy8gcmVtb3ZlIGxpZ2h0c1xuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gICAqIH0pLmFkZFRvKGFwcCk7XG4gICAqL1xuICBzdGF0aWMgZmlsdGVyKG9iamVjdCwgZmlsdGVyKSB7XG4gICAgY29uc3QgcHJvY2Vzc0ZpbHRlciA9IG9iamVjdCA9PiB7XG4gICAgICBvYmplY3QuY2hpbGRyZW4uZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChlbC5jaGlsZHJlbikgcHJvY2Vzc0ZpbHRlcihlbCk7XG4gICAgICAgIGlmICghZmlsdGVyKGVsKSkgb2JqZWN0LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb2Nlc3NGaWx0ZXIob2JqZWN0KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBJbXBvcnRlci5kZWZhdWx0cywgSW1wb3J0ZXIuaW5zdHJ1Y3Rpb25zLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChwYXJhbXMudGV4dHVyZVBhdGgpIHBhcmFtcy5sYW9kZXIuc2V0VGV4dHVyZVBhdGgocGFyYW1zLnRleHR1cmVQYXRoKTtcblxuICAgICAgcGFyYW1zLmxvYWRlci5sb2FkKHBhcmFtcy51cmwsICguLi5kYXRhKSA9PiB7IC8vIGdlb21ldHJ5LCBtYXRlcmlhbHNcbiAgICAgICAgcGFyYW1zLm9uTG9hZCguLi5kYXRhKTtcblxuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBwYXJhbXMucGFyc2VyKC4uLmRhdGEpfSkubWVzaDtcblxuICAgICAgICBjb25zdCB7Z2VvbWV0cnk6IGdlb20sIG1hdGVyaWFsOiBtYXR9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG9iamVjdC5nZW9tZXRyeSxcbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLnVzZUN1c3RvbU1hdGVyaWFsID8gcGFyYW1zLm1hdGVyaWFsIDogb2JqZWN0Lm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChvYmplY3QuZ2VvbWV0cnkpIG9iamVjdC5nZW9tZXRyeSA9IGdlb207XG4gICAgICAgIGlmIChvYmplY3QubWF0ZXJpYWwpIG9iamVjdC5tYXRlcmlhbCA9IG1hdDtcblxuICAgICAgICByZXNvbHZlKG9iamVjdCk7XG4gICAgICB9LCBwYXJhbXMub25Qcm9ncmVzcywgcGFyYW1zLm9uRXJyb3IpO1xuICAgIH0pO1xuXG4gICAgc3VwZXIud2FpdChwcm9taXNlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEltcG9ydGVyXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgT2N0YWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBPY3RhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIE9jdGFoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhbiBvY3RhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiB3aXRoIGVpZ2h0IGZhY2VzLlxuICogQSByZWd1bGFyIG9jdGFoZWRyb24gaXMgYSBQbGF0b25pYyBzb2xpZCBjb21wb3NlZCBvZiBlaWdodCBlcXVpbGF0ZXJhbCB0cmlhbmdsZXMsIGZvdXIgb2Ygd2hpY2ggbWVldCBhdCBlYWNoIHZlcnRleC5cbiAqIDxici8+PGJyLz5cbiAqIGBPY3RhaGVkcm9uYCBjcmVhdGVzIGFuIE9jdGFoZWRyb24gb2JqZWN0IGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGAuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI09jdGFoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIE9jdGFoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IE9jdGFoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgT2N0YWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuT2N0YWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBPY3RhaGVkcm9uLmRlZmF1bHRzLCBPY3RhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5PY3RhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IE9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSA6IE9jdGFoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgT2N0YWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBhcmFtZXRyaWNCdWZmZXJHZW9tZXRyeSxcbiAgUGFyYW1ldHJpY0dlb21ldHJ5LFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQYXJhbWV0cmljXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBgUGFyYW1ldHJpY2AgZ2VuZXJhdGVzIGEgZ2VvbWV0cnkgcmVwcmVzZW50aW5nIGEgPGEgaHJlZj0naHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUGFyYW1ldHJpY19zdXJmYWNlJz5QYXJhbWV0cmljIHN1cmZhY2U8L2E+XG4gKiA8YnIvPjxici8+XG4gKiBJdCBpcyB1c3VhbGx5IHVzZWQgdG8gZGV2ZWxvcCBkaWZmZXJlbnQga2luZHMgb2YgaGlnaGZpZWxkcyBvciB2aXN1YWxpemUgYSA8YSBocmVmPSdodHRwczovL3N0ZW1rb3NraS5naXRodWIuaW8vVGhyZWUuanMvR3JhcGh1bHVzLUZ1bmN0aW9uLmh0bWwnPm1hdGggZnVuY3Rpb248L2E+LlxuICogPGJyLz5cbiAqIC0gPGEgaHJlZj0naHR0cDovL21hdGguaHdzLmVkdS9ncmFwaGljc2Jvb2svc291cmNlL3RocmVlanMvY3VydmVzLWFuZC1zdXJmYWNlcy5odG1sJz5QYXJhbWV0cmljIHN1cmZhY2U8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHBzOi8vc3RlbWtvc2tpLmdpdGh1Yi5pby9UaHJlZS5qcy9HcmFwaHVsdXMtU3VyZmFjZS5odG1sJz5cIkdyYXBodWx1c1wiPC9hPlxuICogPGJyLz48YnIvPlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNQYXJhbWV0cmljR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FeGFtcGxlIGNyZWF0aW5nIGFuIGhlaWdodGZpZWxkLWxpa2UgZ2VvbWV0cnkuIGB1YCBhbmQgYHZgIGFyZSBsaWtlIGB4YCBhbmQgYHlgIGluIHNoYXBlLCBidXQgdGhlaXIgdmFsdWVzIGFyZSBhbHdheXMgZnJvbSBgMGAgdG8gYDFgLlxuICogV2UgdXNlIHRoZW0gaW4gYFRIUkVFLlZlY3RvcjNgIGxpa2UgYHhgIGFuZCBgemAgYW5kIGBNYXRoLnJhbmRvbSgpICogNWAgZm9yIGB5YC48L2NhcHRpb24+XG4gKiBjb25zdCBjcmVhdGVQYXJhbWV0cmljID0gKHUsIHYpID0+IHtcbiAqICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHUgKiAzMCwgTWF0aC5yYW5kb20oKSAqIDUsIHYgKiAzMCk7XG4gKiB9XG4gKlxuICogbmV3IFBhcmFtZXRyaWMoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGZ1bmM6IGNyZWF0ZVBhcmFtZXRyaWNcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGVcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgLTEwMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBhcmFtZXRyaWMgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBhcmFtZXRyaWMjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGZ1bmM6ICh1LCB2KSA9PiBuZXcgVmVjdG9yMyh1LCB2LCAwKSxcbiAgICogICAgIHNsaWNlczogMTAsXG4gICAqICAgICB0YWNrczogMTBcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgZnVuYzogKHUsIHYpID0+IG5ldyBWZWN0b3IzKHUsIHYsIDApLFxuICAgICAgc2xpY2VzOiAxMCxcbiAgICAgIHN0YWNrczogMTBcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGFyYW1ldHJpYy5kZWZhdWx0cywgUGFyYW1ldHJpYy5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QYXJhbWV0cmljXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBhcmFtZXRyaWNCdWZmZXJHZW9tZXRyeSA6IFBhcmFtZXRyaWNHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZnVuYyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zbGljZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc3RhY2tzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQYXJhbWV0cmljXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUGxhbmVCdWZmZXJHZW9tZXRyeSxcbiAgUGxhbmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUGxhbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIGBQbGFuZWAgaXMgdXNlZCBmb3IgY3JlYXRpbmcgcGxhbmVzIGdpdmVuIHNvbWUgYHdpZHRoYCBhbmQgYGhlaWdodGAuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1BsYW5lR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFBsYW5lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBQbGFuZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgd2lkdGg6IDIwLFxuICogICAgIGhlaWdodDogMzBcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUGxhbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB3aWR0aDogMTAsXG4gICAqICAgICBoZWlnaHQ6IDEwLFxuICAgKiAgICAgd1NlZ21lbnRzOiAxLFxuICAgKiAgICAgaFNlZ21lbnRzOiAxXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHdpZHRoOiAxMCxcbiAgICAgIGhlaWdodDogMTAsXG4gICAgICB3U2VnbWVudHM6IDEsXG4gICAgICBoU2VnbWVudHM6IDFcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3dTZWdtZW50cycsICdoU2VnbWVudHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnd1NlZ21lbnRzJywgJ2hTZWdtZW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBsYW5lLmRlZmF1bHRzLCBQbGFuZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBsYW5lQnVmZmVyR2VvbWV0cnkgOiBQbGFuZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhTZWdtZW50c1xuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGxhbmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIFBvbHloZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuY29uc3QgW3ZlcnRpY2VzT2ZDdWJlLCBpbmRpY2VzT2ZGYWNlc10gPSBbXG4gIFtcbiAgICAtMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAtMSwgMSwgLTEsXG4gICAgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMSwgMSwgMSwgLTEsIDEsIDFcbiAgXSxcbiAgW1xuICAgIDIsIDEsIDAsIDAsIDMsIDIsXG4gICAgMCwgNCwgNywgNywgMywgMCxcbiAgICAwLCAxLCA1LCA1LCA0LCAwLFxuICAgIDEsIDIsIDYsIDYsIDUsIDEsXG4gICAgMiwgMywgNywgNywgNiwgMixcbiAgICA0LCA1LCA2LCA2LCA3LCA0XG4gIF1cbl07XG5cbi8qKlxuICogQGNsYXNzIFBvbHloZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGVsZW1lbnRhcnkgZ2VvbWV0cnksIGEgcG9seWhlZHJvbiBpcyBhIHNvbGlkIGluIHRocmVlIGRpbWVuc2lvbnMgd2l0aCBmbGF0IHBvbHlnb25hbCBmYWNlcywgc3RyYWlnaHQgZWRnZXMgYW5kIHNoYXJwIGNvcm5lcnMgb3IgdmVydGljZXMuXG4gKiA8YnIvPjxici8+XG4gKiBgUG9seWhlZHJvbmAgY3JlYXRlcyBhIFBvbHloZWRyb24gYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYC5cbiAqIDxici8+PGJyLz5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBQb2x5aGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBQb2x5aGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBvbHloZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgc3RhdGljIHZlcnRpY2VzT2ZDdWJlID0gdmVydGljZXNPZkN1YmU7XG4gIHN0YXRpYyBpbmRpY2VzT2ZGYWNlcyA9IGluZGljZXNPZkZhY2VzO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB2ZXJ0aWNlc09mQ3ViZTogW1xuICAgKiAgICAgICAtMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAtMSwgMSwgLTEsXG4gICAqICAgICAgIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxXG4gICAqICAgICBdLFxuICAgKlxuICAgKiAgICAgaW5kaWNlc09mRmFjZXM6IFtcbiAgICogICAgICAgMiwgMSwgMCwgMCwgMywgMixcbiAgICogICAgICAgMCwgNCwgNywgNywgMywgMCxcbiAgICogICAgICAgMCwgMSwgNSwgNSwgNCwgMCxcbiAgICogICAgICAgMSwgMiwgNiwgNiwgNSwgMSxcbiAgICogICAgICAgMiwgMywgNywgNywgNiwgMixcbiAgICogICAgICAgNCwgNSwgNiwgNiwgNywgNFxuICAgKiAgICAgXSxcbiAgICpcbiAgICogICAgIHJhZGl1czogNixcbiAgICogICAgIGRldGFpbDogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB2ZXJ0aWNlc09mQ3ViZSxcbiAgICAgIGluZGljZXNPZkZhY2VzLFxuICAgICAgcmFkaXVzOiA2LFxuICAgICAgZGV0YWlsOiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsndmVydGljZXNPZkN1YmUnLCAnaW5kaWNlc09mRmFjZXMnLCAncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3ZlcnRpY2VzT2ZDdWJlJywgJ2luZGljZXNPZkZhY2VzJywgJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQb2x5aGVkcm9uLmRlZmF1bHRzLCBQb2x5aGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSA6IFBvbHloZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudmVydGljZXNPZkN1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaW5kaWNlc09mRmFjZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUG9seWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFJpbmdHZW9tZXRyeSxcbiAgUmluZ0J1ZmZlckdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBSaW5nXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBSaW5nIGNsYXNzIGNyZWF0ZXMgYSBjaXJjbGUgb3IganVzdCAyRCBUb3J1cy4gRG9lcyBub3Qgc3VwcG9ydCBwaHlzaWNzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNSaW5nR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFJpbmcsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFJpbmcoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGlubmVyUmFkaXVzOiA1LFxuICogICAgIG91dGVyUmFkaXVzOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgICBzaWRlIFRIUkVFLkRvdWJsZVNpZGVcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDgsIDBdLFxuICpcbiAqICAgcm90YXRpb246IHtcbiAqICAgICB4OiBNYXRoLlBJLzRcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUmluZyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZyNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgaW5uZXJSYWRpdXM6IDAsXG4gICAqICAgICBvdXRlclJhZGl1czogNTAsXG4gICAqICAgICB0aGV0YVNlZ21lbnRzOiA4LFxuICAgKiAgICAgcGhpU2VnbWVudHM6IDgsXG4gICAqICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgKiAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGlubmVyUmFkaXVzOiAwLFxuICAgICAgb3V0ZXJSYWRpdXM6IDUwLFxuICAgICAgdGhldGFTZWdtZW50czogOCxcbiAgICAgIHBoaVNlZ21lbnRzOiA4LFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmcjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAnaW5uZXJSYWRpdXMnLFxuICAgKiAgICAgJ291dGVyUmFkaXVzJyxcbiAgICogICAgICd0aGV0YVNlZ21lbnRzJyxcbiAgICogICAgICdwaGlTZWdtZW50cycsXG4gICAqICAgICAndGhldGFTdGFydCcsXG4gICAqICAgICAndGhldGFMZW5ndGgnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAnaW5uZXJSYWRpdXMnLFxuICAgICAgJ291dGVyUmFkaXVzJyxcbiAgICAgICd0aGV0YVNlZ21lbnRzJyxcbiAgICAgICdwaGlTZWdtZW50cycsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBSaW5nLmRlZmF1bHRzLCBSaW5nLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFJpbmdCdWZmZXJHZW9tZXRyeSA6IFJpbmdHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaW5uZXJSYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3V0ZXJSYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5waGlTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBSaW5nXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgU2hhcGVCdWZmZXJHZW9tZXRyeSxcbiAgU2hhcGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU2hhcGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNoYXBlIGlzIGEgdW5pdmVyc2FsIGNsYXNzLiBJdCBhbGxvd3MgeW91IHRvIGNyZWF0ZSBkaWZmZXJlbnQgMkQgc2hhcGVzIGluIDNEIHNjZW5lLjxici8+XG4gKiBVbmZvcnR1bmF0ZWx5LCBub3QgYWxsIG9mIHRoZW0gc3VwcG9ydCBwaHlzaWNzLCBhbiBhbHRlcm5hdGl2ZSBpcyB0byBtYWtlIGEgc2ltaWxhciAzRCBvYmplY3QgYW5kIHNjYWxlIGl0cyB3aWR0aCBkb3duIHRvIG5lYXIgemVyby5cbiAqIDxici8+PGJyLz5cbiAqIGBTaGFwZWAgY29uc2lzdHMgb2Ygc2hhcGVzIHRoYXQgYXJlIGluIGl0cyBzaGFwZXMgcGFyYW1ldGVyLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNTaGFwZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBwbGFuZSBsb29raW5nIFNoYXBlIGZyb20gYSBUSFJFRS5TaGFwZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCByZWN0V2lkdGggPSAxMCxcbiAqIHJlY3RMZW5ndGggPSA1O1xuICpcbiAqIGNvbnN0IHJlY3RTaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICogcmVjdFNoYXBlLm1vdmVUbygwLDApO1xuICogcmVjdFNoYXBlLmxpbmVUbygwLCByZWN0V2lkdGgpO1xuICogcmVjdFNoYXBlLmxpbmVUbyhyZWN0TGVuZ3RoLCByZWN0V2lkdGgpO1xuICogcmVjdFNoYXBlLmxpbmVUbyhyZWN0TGVuZ3RoLCAwKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8oMCwgMCk7XG4gKlxuICogY29uc3QgcGxhbmUgPSBuZXcgU2hhcGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHNoYXBlOiByZWN0U2hhcGVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU2hhcGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBzaGFwZXM6IFtdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgc2hhcGVzOiBbXVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydzaGFwZXMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydzaGFwZXMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTaGFwZS5kZWZhdWx0cywgU2hhcGUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFNoYXBlQnVmZmVyR2VvbWV0cnkgOiBTaGFwZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zaGFwZXNcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFNoYXBlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgU3BoZXJlQnVmZmVyR2VvbWV0cnksXG4gIFNwaGVyZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBTcGhlcmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNwaGVyZSBjbGFzcyBpcyB1c2VkIHRvIGNyZWF0ZSBzcGhlcmUgb2JqZWN0cyBieSBpdHMgcmFkaXVzIHByb3BlcnR5IGFuZCBvdGhlciB2YWx1ZXMgdGhhdCBkZXRlcm1pbmVzIGl0cyBkZXRhbGl0eS5cbiAqIDxici8+PGJyLz5cbiAqIEl0IGlzIHNpbWlsYXIgdG8gVEhSRUUuU3BoZXJlR2VvbWV0cnksIGJ1dCBpdCBhbHNvIGNvbnRhaW5zIGFsbCBgU2hhcGVgIHByb3BlcnRpZXMsIHN1Y2ggYXMgbWF0ZXJpYWwsIG1hc3MgYW5kIHZlY3RvcnMgbGlrZSBwb3NpdGlvbiAocG9zKSBhbmQgcm90YXRpb24gKHJvdCkuXG4gKiA8YnIvPjxici8+XG4gKiBUaGVuIGl0IGNyZWF0ZXMgYW4gYFRocmVlLmpzIG1lc2hgIG9yIGEgYFBoeXNpanMgbWVzaGAsIHRoYXQgaXMgc2ltaWxhciB0byBgVGhyZWUuanMgbWVzaGAsIGJ1dCBpdCBhbHNvIHRha2UgaW50byBjb25zaWRlcmF0aW9uIGNvbGxpc2lvbiBjYWxjdWxhdGlvbnMuXG4gKiBUaGlzIG1lc2ggaXMgYSBjb21iaW5hdGlvbiBvZiBgVGhyZWUuanMgZ2VvbWV0cnlgIGFuZCBgUGh5c2lqcyBtYXRlcmlhbGAgKFRoZSBzYW1lIGFzIGluIHRocmVlLmpzLCBidXQgd2l0aCBmcmljdGlvbiBhbmQgcmVzdGl0dXRpb24pLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNTcGhlcmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgU3BoZXJlLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBTcGhlcmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAxMDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU3BoZXJlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIHdpZHRoU2VnbWVudHM6IDgsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogNlxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIHdpZHRoU2VnbWVudHM6IDgsXG4gICAgICBoZWlnaHRTZWdtZW50czogNlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNwaGVyZS5kZWZhdWx0cywgU3BoZXJlLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gU3BoZXJlQnVmZmVyR2VvbWV0cnkgOiBTcGhlcmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFNwaGVyZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIFRldHJhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRldHJhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYSB0ZXRyYWhlZHJvbiBpcyBhIHBvbHloZWRyb24gY29tcG9zZWQgb2YgZm91ciB0cmlhbmd1bGFyIGZhY2VzLCBzaXggc3RyYWlnaHQgZWRnZXMsIGFuZCBmb3VyIHZlcnRleCBjb3JuZXJzLlxuICogVGhlIHRldHJhaGVkcm9uIGlzIHRoZSBzaW1wbGVzdCBvZiBhbGwgdGhlIG9yZGluYXJ5IGNvbnZleCBwb2x5aGVkcmEgYW5kIHRoZSBvbmx5IG9uZSB0aGF0IGhhcyBmZXdlciB0aGFuIDUgZmFjZXMuXG4gKiA8YnIvPjxici8+XG4gKiBgVGV0cmFoZWRyb25gIGNyZWF0ZXMgYSBUZXRyYWhlZHJvbiBvYmplY3QgYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYFxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUZXRyYWhlZHJvbkdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUZXRyYWhlZHJvbiwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVGV0cmFoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUZXRyYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRldHJhaGVkcm9uLmRlZmF1bHRzLCBUZXRyYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gVGV0cmFoZWRyb25CdWZmZXJHZW9tZXRyeSA6IFRldHJhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRldHJhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgRm9udCxcbiAgTWVzaCxcbiAgVGV4dEdlb21ldHJ5LFxuICBGb250TG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUZXh0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUZXh0IGNsYXNzIGlzIG1hZGUgZm9yIGNyZWF0aW5nIDNEIHRleHQgb2JqZWN0cy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVGV4dEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiA8YnIvPjxici8+XG4gKiBQaHlzaWNzIHRleHQgb2JqZWN0IGNhbiBiZSBjb252ZXggb3IgY29uY2F2ZS4gQnkgZGVmYXVsdCBpdCdzIGNvbnZleCBidXQgeW91IGNhbiBhbHNvIHN3aXRjaCB0byBjb25jYXZlLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVGV4dCwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVGV4dCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgdGV4dDogJ2hlbGxvIHdvcmxkJyxcbiAqICAgICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgICBmb250OiAncGF0aC90by9mb250LnR5cGVmYWNlLmpzJyxcbiAqICAgICAgIHNpemU6IDIwLFxuICogICAgICAgaGVpZ2h0OiA1LFxuICogICAgICAgY3VydmVTZWdtZW50czogNlxuICogICAgIH1cbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogLTQwLFxuICogICAgIHk6IDIwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVGV4dCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV4dCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgdGV4dDogJ0hlbGxvIFdvcmxkIScsXG4gICAqICAgICBsb2FkZXI6IG5ldyBGb250TG9hZGVyKCksXG4gICAqXG4gICAqICAgICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICAgIHNpemU6IDEyLFxuICAgKiAgICAgICBoZWlnaHQ6IDUwLFxuICAgKiAgICAgICBjdXJ2ZVNlZ21lbnRzOiAxMixcbiAgICogICAgICAgZm9udDogbmV3IEZvbnQoKSxcbiAgICogICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICogICAgICAgYmV2ZWxUaGlja25lc3M6IDEwLFxuICAgKiAgICAgICBiZXZlbFNpemU6IDhcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdGV4dDogJ0hlbGxvIFdvcmxkIScsXG4gICAgICBsb2FkZXI6IG5ldyBGb250TG9hZGVyKCksXG5cbiAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgc2l6ZTogMTIsXG4gICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgIGN1cnZlU2VnbWVudHM6IDEyLFxuICAgICAgICBmb250OiBuZXcgRm9udCgpLFxuICAgICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBiZXZlbFRoaWNrbmVzczogMTAsXG4gICAgICAgIGJldmVsU2l6ZTogOFxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRleHQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3RleHQnLCAnbG9hZGVyJywgJ3BhcmFtZXRlcnMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd0ZXh0JywgJ2xvYWRlcicsICdwYXJhbWV0ZXJzJ11cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXh0LmRlZmF1bHRzLCBUZXh0Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXh0XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIEZvbnRMb2FkZXIubG9hZChwYXJhbXMuZ2VvbWV0cnkucGFyYW1ldGVycy5mb250LCBmb250ID0+IHtcbiAgICAgICAgcGFyYW1zLmdlb21ldHJ5LnBhcmFtZXRlcnMuZm9udCA9IGZvbnQ7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogbmV3IFRleHRHZW9tZXRyeShcbiAgICAgICAgICAgIHBhcmFtcy5nZW9tZXRyeS50ZXh0LFxuICAgICAgICAgICAgcGFyYW1zLmdlb21ldHJ5LnBhcmFtZXRlcnNcbiAgICAgICAgICApLFxuXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlKFxuICAgICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgICAgbWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgICAgICAgIH0pLm1lc2hcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc3VwZXIud2FpdChwcm9taXNlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRleHRcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0dlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUb3J1c1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXMgY2xhc3MgbWFrZXMgYSB0b3J1cyBmaWd1cmUuIEEgZG9udXQgaXMgYSB0b3J1cy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVG9ydXNHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXMsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRvcnVzKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDUsXG4gKiAgICAgdHViZTogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAzNVxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1cyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXMjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMTAwLFxuICAgKiAgICAgdHViZTogNDAsXG4gICAqICAgICByYWRpYWxTZWdtZW50czogOCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogNixcbiAgICogICAgIGFyYzogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxMDAsXG4gICAgICB0dWJlOiA0MCxcbiAgICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgICAgdHVidWxhclNlZ21lbnRzOiA2LFxuICAgICAgYXJjOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAndHViZScsXG4gICAqICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgKiAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAqICAgICAnYXJjJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3R1YmUnLFxuICAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgICAgJ2FyYydcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVzLmRlZmF1bHRzLCBUb3J1cy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFRvcnVzR2VvbWV0cnkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmFyY1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSxcbiAgVG9ydXNLbm90R2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRvcnVza25vdFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXNrbm90IGNsYXNzIG1ha2VzIGEgdG9ydXNrbm90IGZpZ3VyZS4gSXQncyBsaWtlIGEgY3Jvb2tlZCBkb251dCwgdmVyeSBjcm9va2VkLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUb3J1c0tub3RHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXNrbm90LCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUb3J1c2tub3Qoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czo1LFxuICogICAgIHR1YmU6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczoge1xuICogICAgIHk6IDEwMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1c2tub3QgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxMDAsXG4gICAqICAgICB0dWJlOiA0MCxcbiAgICogICAgIHJhZGlhbFNlZ21lbnRzOiA2NCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogOCxcbiAgICogICAgIHA6IDIsXG4gICAqICAgICBxOiAzXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMTAwLFxuICAgICAgdHViZTogNDAsXG4gICAgICByYWRpYWxTZWdtZW50czogNjQsXG4gICAgICB0dWJ1bGFyU2VnbWVudHM6IDgsXG4gICAgICBwOiAyLFxuICAgICAgcTogM1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3R1YmUnLFxuICAgKiAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICogICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgKiAgICAgJ3AnLFxuICAgKiAgICAgJ3EnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1cycsXG4gICAgICAndHViZScsXG4gICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAgICAncCcsXG4gICAgICAncSdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVza25vdC5kZWZhdWx0cywgVG9ydXNrbm90Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3RcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBHQ29uc3RydWN0ID0gcGFyYW1zLmJ1ZmZlciA/IFRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IDogVG9ydXNLbm90R2VvbWV0cnk7XG5cbiAgICByZXR1cm4gbmV3IEdDb25zdHJ1Y3QoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnAsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNrbm90XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGluZUN1cnZlMyxcbiAgVmVjdG9yMyxcbiAgVHViZUJ1ZmZlckdlb21ldHJ5LFxuICBUdWJlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFR1YmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFR1YmUgY2xhc3MgbWFrZXMgYSB0dWJlIHRoYXQgZXh0cnVkZXMgYWxvbmcgYSAzZCBjdXJ2ZS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVHViZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUdWJlIGZyb20gYSB0aHJlZS5qcyBDdXJ2ZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCBDdXN0b21TaW5DdXJ2ZSA9IFRIUkVFLkN1cnZlLmNyZWF0ZShcbiAqICAgZnVuY3Rpb24gKHNjYWxlKSB7IC8vIGN1c3RvbSBjdXJ2ZSBjb25zdHJ1Y3RvclxuICogICAgIHRoaXMuc2NhbGUgPSAoc2NhbGUgPT09IHVuZGVmaW5lZCkgPyAxIDogc2NhbGU7XG4gKiAgIH0sXG4gKlxuICogICBmdW5jdGlvbiAodCkgeyAvLyBnZXRQb2ludDogdCBpcyBiZXR3ZWVuIDAtMVxuICogICAgIGNvbnN0IHR4ID0gdCAqIDMgLSAxLjUsXG4gKiAgICAgdHkgPSBNYXRoLnNpbiggMiAqIE1hdGguUEkgKiB0ICksXG4gKiAgICAgdHogPSAwO1xuICpcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjModHgsIHR5LCB0eikubXVsdGlwbHlTY2FsYXIodGhpcy5zY2FsZSk7XG4gKiAgIH1cbiAqICk7XG4gKlxuICogY29uc3QgcGF0aCA9IG5ldyBDdXN0b21TaW5DdXJ2ZSgxMCk7XG4gKlxuICogbmV3IFR1YmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBhdGg6IHBhdGhcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVHViZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcGF0aDogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSxcbiAgICogICAgIHNlZ21lbnRzOiAyMCxcbiAgICogICAgIHJhZGl1czogMixcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiA4LFxuICAgKiAgICAgY2xvc2VkOiBmYWxzZVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwYXRoOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMSkpLFxuICAgICAgc2VnbWVudHM6IDIwLFxuICAgICAgcmFkaXVzOiAyLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDgsXG4gICAgICBjbG9zZWQ6IGZhbHNlXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdwYXRoJyxcbiAgICogICAgICdzZWdtZW50cycsXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgICAnY2xvc2VkJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdwYXRoJyxcbiAgICAgICdzZWdtZW50cycsXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnY2xvc2VkJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVHViZS5kZWZhdWx0cywgVHViZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gVHViZUJ1ZmZlckdlb21ldHJ5IDogVHViZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wYXRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5jbG9zZWRcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFR1YmVcbn07XG4iLCJpbXBvcnQge09iamVjdDNEfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9Db21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBHcm91cFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU29tZXRpbWVzIHlvdSBuZWVkIHRvIG1ha2UgZ3JvdXBzIG9mIG9iamVjdHMgKGl0J3Mgbm90IGNvbnZlbmllbnRseSB0byBhcHBseSB0cmFuc2Zvcm1zIHRvIGVhY2ggb2JqZWN0IHdoZW4gY2FuIG1ha2UganVzdCBvbmUgdG8gYSBncm91cCkuPGJyLz5cbiAqIEluIFRocmVlLmpzIHlvdSBtYWtlIGl0IHVzaW5nIGBUSFJFRS5PYmplY3QzRGAgYW5kIGl0J3MgY2hpbGRyZW4uIDxici8+PGJyLz5cbiAqIEluIHdocy5qcyB3ZSBoYXZlIGBHcm91cGBcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBBZGRpbmcgb2JqZWN0cyB0byBhbiBlbXB0eSBncm91cDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNwaGVyZSA9IG5ldyBTcGhlcmUoKTtcbiAqIGNvbnN0IGJveCA9IG5ldyBCb3goKTtcbiAqIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gKlxuICogc3BoZXJlLmFkZFRvKGdyb3VwKTtcbiAqIGJveC5hZGRUbyhncm91cCk7XG4qIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBNYWtpbmcgYSBncm91cCBmcm9tIG9iamVjdHM8L2NhcHRpb24+XG4gKiBjb25zdCBzcGhlcmUgPSBuZXcgU3BoZXJlKCk7XG4gKiBjb25zdCBib3ggPSBuZXcgQm94KCk7XG4gKiBjb25zdCBncm91cCA9IG5ldyBHcm91cChib3gsIHNwaGVyZSk7XG4gKiAvLyBPUjogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoW2JveCwgc3BoZXJlXSk7XG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKC4uLm9iamVjdHMpIHtcbiAgICBzdXBlcih7fSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG9iaiA9IG9iamVjdHNbaV07XG5cbiAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBDb21wb25lbnQpIG9iai5hZGRUbyh0aGlzKTtcbiAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdDNEKSB0aGlzLm5hdGl2ZS5hZGQob2JqKTtcbiAgICB9XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdDNEKCk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgR3JvdXBcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL21lc2hlcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9Cb3gnO1xuZXhwb3J0ICogZnJvbSAnLi9DaXJjbGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db25lJztcbmV4cG9ydCAqIGZyb20gJy4vQ3lsaW5kZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Eb2RlY2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9FeHRydWRlJztcbmV4cG9ydCAqIGZyb20gJy4vSWNvc2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9MYXRoZSc7XG5leHBvcnQgKiBmcm9tICcuL0xpbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9JbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL09jdGFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9QYXJhbWV0cmljJztcbmV4cG9ydCAqIGZyb20gJy4vUGxhbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2x5aGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vUmluZyc7XG5leHBvcnQgKiBmcm9tICcuL1NoYXBlJztcbmV4cG9ydCAqIGZyb20gJy4vU3BoZXJlJztcbmV4cG9ydCAqIGZyb20gJy4vVGV0cmFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0JztcbmV4cG9ydCAqIGZyb20gJy4vVG9ydXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Ub3J1c2tub3QnO1xuZXhwb3J0ICogZnJvbSAnLi9UdWJlJztcbmV4cG9ydCAqIGZyb20gJy4vR3JvdXAnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRWxlbWVudE1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRhaW5lcj1kb2N1bWVudC5ib2R5XSBjb250YWluZXIgaXMgdGhlIERPTSBvYmplY3QgdG8gd2hpY2ggYXBwbGljYXRpb24ncyBjYW52YXMgd2lsbCBiZSBhZGRlZCB0by5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGVsZW1lbnQgbW9kdWxlLCBwYXNzaW5nIGl0IHRvIHRoZSBBcHA8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgbmV3IEVsZW1lbnRNb2R1bGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVtZW50TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSkge1xuICAgIGlmIChjb250YWluZXIuY29udGFpbmVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0VsZW1lbnRNb2R1bGUgbm93IGFjY2VwdHMgb25seSBhcmd1bWVudCB3aGljaCBpcyBhIERPTSBvYmplY3QsIG5vdCBhIHBhcmFtcyBvYmplY3QuJyk7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lci5jb250YWluZXI7XG4gICAgfSBlbHNlIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjcmVhdGVFbGVtZW50XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIGNhbnZhcyBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3docy1hcHAnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICdpbmhlcml0JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJ2luaGVyaXQnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnZWxlbWVudCcsIHRoaXMuZWxlbWVudCk7XG4gICAgbWFuYWdlci5zZXQoJ2NvbnRhaW5lcicsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgV2ViR0xSZW5kZXJlcixcbiAgVmVjdG9yMlxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuLyoqXG4gKiBAY2xhc3MgUmVuZGVyaW5nTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgcmVuZGVyaW5nIG1vZHVsZSBhbmQgcGFzc2luZyBpdCB0byBBcHAncyBtb2R1bGVzPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIG5ldyBFbGVtZW50TW9kdWxlKCksXG4gKiAgIG5ldyBTY2VuZU1vZHVsZSgpLFxuICogICBuZXcgQ2FtZXJhTW9kdWxlKHtcbiAqICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgNiwgMTgpLFxuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSksXG4gKiAgIG5ldyBSZW5kZXJpbmdNb2R1bGUoe1xuICogICAgIGJnQ29sb3I6IDB4MTYyMTI5LFxuICpcbiAqICAgICByZW5kZXJlcjoge1xuICogICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICogICAgICAgc2hhZG93bWFwOiB7XG4gKiAgICAgICAgIHR5cGU6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiAgIH0sIHtzaGFkb3c6IHRydWV9KVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJpbmdNb2R1bGUge1xuICBzdGF0aWMgYWRkaXRpb25hbCA9IHtcbiAgICBzaGFkb3cocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBlbmFibGVkID0gdHJ1ZTtcblxuICBkZWZlciA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCB7c2hhZG93OiBpc1NoYWRvd30gPSB7c2hhZG93OiBmYWxzZX0pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cbiAgICAgIHJlc29sdXRpb246IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgcGl4ZWxSYXRpbzogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG5cbiAgICAgIGJnQ29sb3I6IDB4MDAwMDAwLFxuICAgICAgYmdPcGFjaXR5OiAxLFxuXG4gICAgICByZW5kZXJlcjoge31cbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgY29uc3Qge1xuICAgICAgYmdDb2xvcixcbiAgICAgIGJnT3BhY2l0eSxcbiAgICAgIHJlbmRlcmVyLFxuICAgICAgcGl4ZWxSYXRpbyxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcmVzb2x1dGlvblxuICAgIH0gPSB0aGlzLnBhcmFtcztcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcihyZW5kZXJlcik7XG4gICAgdGhpcy5lZmZlY3RzID0gW107XG4gICAgdGhpcy5hcHBseUFkZGl0aW9uYWwoJ3NoYWRvdycsIGlzU2hhZG93KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihcbiAgICAgIGJnQ29sb3IsXG4gICAgICBiZ09wYWNpdHlcbiAgICApO1xuXG4gICAgaWYgKHBpeGVsUmF0aW8pIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhwaXhlbFJhdGlvKTtcblxuICAgIHRoaXMuc2V0U2l6ZShcbiAgICAgIE51bWJlcih3aWR0aCAqIHJlc29sdXRpb24ueCkudG9GaXhlZCgpLFxuICAgICAgTnVtYmVyKGhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpXG4gICAgKTtcbiAgfVxuXG4gIGFwcGx5QWRkaXRpb25hbChuYW1lLCBpc0FwcGxpZWQgPSBmYWxzZSkge1xuICAgIGlmICghaXNBcHBsaWVkKSByZXR1cm47XG4gICAgUmVuZGVyaW5nTW9kdWxlLmFkZGl0aW9uYWxbbmFtZV0uYXBwbHkodGhpcywgW3RoaXMucmVuZGVyZXJdKTtcbiAgfVxuXG4gIGludGVncmF0ZVJlbmRlcmVyKGVsZW1lbnQsIHNjZW5lLCBjYW1lcmEpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoKCkgPT4gdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpKTtcbiAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTG9vcDtcbiAgfVxuXG4gIGVmZmVjdChlZmZlY3QsIGNiKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG5cbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcbiAgICAgIGVmZmVjdC5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblxuICAgICAgY29uc3QgbG9vcCA9IG5ldyBMb29wKGNiID8gY2IgOiAoKSA9PiB7XG4gICAgICAgIGVmZmVjdC5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKGxvb3ApO1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkgbG9vcC5zdGFydCh0aGlzLmFwcCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRTaXplXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgcmVuZGVyIHRhcmdldCB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlbmRlcmluZ01vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cbiAgICAvLyBhdHRhY2ggdG8gbmV3IHBhcmVudCB3b3JsZCBkb21cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG4gICAgdGhpcy5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AoKSk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdGFydCgpO1xuICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdGFydCgpKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZW5kZXJpbmcnKTtcbiAgICBtYW5hZ2VyLnNldCgncmVuZGVyZXInLCB0aGlzLnJlbmRlcmVyKTtcblxuICAgIHRoaXMuYXBwID0gbWFuYWdlci5oYW5kbGVyO1xuXG4gICAgdGhpcy5yZW5kZXJMb29wID0gdGhpcy5pbnRlZ3JhdGVSZW5kZXJlcihcbiAgICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JyksXG4gICAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKSxcbiAgICAgIG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmVcbiAgICApO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgZWxlbWVudDogZWxlbWVudCA9PiB7XG4gICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCk7XG4gICAgICB9LFxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNvbHZlKCk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYucmVuZGVyTG9vcC5zdGFydCh0aGlzKTtcbiAgICBzZWxmLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RhcnQodGhpcykpO1xuICB9XG5cbiAgZGlzcG9zZShzZWxmKSB7XG4gICAgc2VsZi5yZW5kZXJMb29wLnN0b3AodGhpcyk7XG4gICAgc2VsZi5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AodGhpcykpO1xuICAgIHNlbGYucmVuZGVyZXIuZm9yY2VDb250ZXh0TG9zcygpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBTY2VuZVxufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIFNjZW5lTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpbGxTY2VuZUJlUmVwbGFjZWQ9ZmFsc2VdIHdpbGxTY2VuZUJlUmVwbGFjZWQgc2hvdWxkIGJlIHRydWUgb25seSBpZiB5b3UgYXJlIGdvaW5nIHRvIG92ZXJ3cml0ZSBzY2VuZSBkZXBlbmRlbmN5IGV2ZW4gd2l0aG91dCB0aGUgdXNlIG9mIGRlZmF1bHQgb25lLlxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgU2NlbmVNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih3aWxsU2NlbmVCZVJlcGxhY2VkID0gZmFsc2UpIHtcbiAgICB0aGlzLnNjZW5lID0gd2lsbFNjZW5lQmVSZXBsYWNlZCA/IG51bGwgOiBuZXcgU2NlbmUoKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdzY2VuZScsIHRoaXMuc2NlbmUpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG5cbiAgICB0aGlzLmFkZCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBvYmplY3QuZGVmZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtuYXRpdmV9ID0gb2JqZWN0O1xuICAgICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICAgIGNvbnN0IGFkZFByb21pc2UgPSB0aGlzLmFwcGx5QnJpZGdlKHtvbkFkZDogb2JqZWN0fSkub25BZGQ7XG5cbiAgICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuc2NlbmUuYWRkKG5hdGl2ZSk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoYWRkUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICBhZGRQcm9taXNlLnRoZW4ocmVzb2x2ZXIpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICAgIHNlbGYuc2NlbmUucmVtb3ZlKG9iamVjdC5uYXRpdmUpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldFNjZW5lID0gZnVuY3Rpb24gKHNjZW5lKSB7XG4gICAgICBzZWxmLnNjZW5lID0gc2NlbmU7XG4gICAgICB0aGlzLm1hbmFnZXIuc2V0KCdzY2VuZScsIHNjZW5lKTtcbiAgICB9O1xuICB9XG59XG4iLCIvLyBpbXBvcnQge2FkZFJlc2l6ZUxpc3RlbmVyfSBmcm9tICdkZXRlY3QtZWxlbWVudC1yZXNpemUnO1xuXG4vKipcbiAqIEBjbGFzcyBSZXNpemVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2F1dG86IHRydWV9XSAtIElmIGF1dG8gaXMgc2V0IHRvIHRydWUgLSByZXNpemUgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBjb250YWluZXIgcmVzaXplc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgUmVzaXplTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYXV0bzogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IFt0aGlzLnNldFNpemUuYmluZCh0aGlzKV07XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIHNldFNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHByb3ZpZGVkIHdpZHRoICYgaGVpZ2h0IHRvIHRoZSByZW5kZXJlciBvYmplY3QuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGg9MV0gLSBUaGUgcHJvbWlzZSB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byBhIHF1ZXVlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodD0xXSAtIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCA9IDEsIGhlaWdodCA9IDEpIHtcbiAgICB0aGlzLmNhbWVyYS5uYXRpdmUuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgdGhpcy5jYW1lcmEubmF0aXZlLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmluZykgdGhpcy5yZW5kZXJpbmcuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHRyaWdnZXJcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUcmlnZ2VycyByZXNpemUgd2hlbiBjYWxsZWQuIHdpZHRoICYgaGVpZ2h0IGFyZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHlcbiAgICogVGhpcyBpbnZva2VzIGVhY2ggY2FsbGJhY2tzIHdpdGggdGhlIG5ldyB3aWR0aCBhbmQgaGVpZ2h0IGFzIHBhcmFtc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgdHJpZ2dlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXI6IHtcbiAgICAgICAgb2Zmc2V0V2lkdGgsXG4gICAgICAgIG9mZnNldEhlaWdodFxuICAgICAgfSxcbiAgICAgIHJlc29sdXRpb25cbiAgICB9ID0gdGhpcztcblxuICAgIGNvbnN0IHdpZHRoID0gTnVtYmVyKG9mZnNldFdpZHRoICogcmVzb2x1dGlvbi54KS50b0ZpeGVkKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKG9mZnNldEhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpO1xuXG4gICAgdGhpcy5jYWxsYmFja3MuZm9yRWFjaChjYiA9PiB7XG4gICAgICBjYih3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZEF1dG9yZXNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIG1vZHVsZSB0byBhdXRvcmVzaXplLCB0aGlzIGFkZHMgYW4gZXZlbnQgbGlzdGVuZSBvbiB3aW5kb3cgcmVzaXplIHRvIHRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgYWRkQXV0b3Jlc2l6ZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29udGFpbmVyKCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGhpcy5nZXRSZXNvbHV0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYXV0bykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudHJpZ2dlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZENhbGxiYWNrXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIGNhbGwgYmFjayBmdW5jdGlvbiB0byB0aGUgZXhpc3RpbmcgY2FsbGJhY2tzIGxpc3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYWRkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBhZGRDYWxsYmFjayhmdW5jKSB7XG4gICAgdGhpcy5jYWxsYmFja3MucHVzaChmdW5jKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZXNpemUnKTtcblxuICAgIHRoaXMucmVuZGVyaW5nID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJyk7XG5cbiAgICB0aGlzLmdldFJlc29sdXRpb24gPSAoKSA9PiBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykucGFyYW1zLnJlc29sdXRpb247XG4gICAgdGhpcy5nZXRDb250YWluZXIgPSAoKSA9PiBtYW5hZ2VyLmdldCgnY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmFkZEF1dG9yZXNpemUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2MDtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MTtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MztcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIHRvcCBsZWZ0IHRleGVsLlxcclxcblxcdHZlYzQgc3VtID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYwKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgdG9wIHJpZ2h0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjEpO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSBib3R0b20gcmlnaHQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2Mik7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIGJvdHRvbSBsZWZ0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjMpO1xcclxcblxcclxcblxcdC8vIENvbXB1dGUgdGhlIGF2ZXJhZ2UuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gc3VtICogMC4yNTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG51bmlmb3JtIHZlYzIgaGFsZlRleGVsU2l6ZTtcXHJcXG51bmlmb3JtIGZsb2F0IGtlcm5lbDtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2MDtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MTtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MztcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBkVXYgPSAodGV4ZWxTaXplICogdmVjMihrZXJuZWwpKSArIGhhbGZUZXhlbFNpemU7XFxyXFxuXFxyXFxuXFx0dlV2MCA9IHZlYzIodXYueCAtIGRVdi54LCB1di55ICsgZFV2LnkpO1xcclxcblxcdHZVdjEgPSB2ZWMyKHV2LnggKyBkVXYueCwgdXYueSArIGRVdi55KTtcXHJcXG5cXHR2VXYyID0gdmVjMih1di54ICsgZFV2LngsIHV2LnkgLSBkVXYueSk7XFxyXFxuXFx0dlV2MyA9IHZlYzIodXYueCAtIGRVdi54LCB1di55IC0gZFV2LnkpO1xcclxcblxcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEFuIG9wdGltaXNlZCBjb252b2x1dGlvbiBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIHRoZSBHREMyMDAzIFByZXNlbnRhdGlvbiBieSBNYXNha2kgS2F3YXNlLCBCdW5rYXNoYSBHYW1lczpcclxuICogIEZyYW1lIEJ1ZmZlciBQb3N0cHJvY2Vzc2luZyBFZmZlY3RzIGluIERPVUJMRS1TLlQuRS5BLkwgKFdyZWNrbGVzcylcclxuICogYW5kIGFuIGFydGljbGUgYnkgRmlsaXAgU3RydWdhciwgSW50ZWw6XHJcbiAqICBBbiBpbnZlc3RpZ2F0aW9uIG9mIGZhc3QgcmVhbC10aW1lIEdQVS1iYXNlZCBpbWFnZSBibHVyIGFsZ29yaXRobXNcclxuICpcclxuICogRnVydGhlciBtb2RpZmllZCBhY2NvcmRpbmcgdG8gQXBwbGUnc1xyXG4gKiBbQmVzdCBQcmFjdGljZXMgZm9yIFNoYWRlcnNdKGh0dHBzOi8vZ29vLmdsL2xtUm9NNSkuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnZvbHV0aW9uTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY29udm9sdXRpb24gbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjJ9IFt0ZXhlbFNpemVdIC0gVGhlIGFic29sdXRlIHNjcmVlbiB0ZXhlbCBzaXplLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0ZXhlbFNpemUgPSBuZXcgVmVjdG9yMigpKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJDb252b2x1dGlvbk1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dGV4ZWxTaXplOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigpKSxcclxuXHRcdFx0XHRoYWxmVGV4ZWxTaXplOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigpKSxcclxuXHRcdFx0XHRrZXJuZWw6IG5ldyBVbmlmb3JtKDAuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnNldFRleGVsU2l6ZSh0ZXhlbFNpemUueCwgdGV4ZWxTaXplLnkpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGN1cnJlbnQga2VybmVsIHNpemUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0XHQgKiBAZGVmYXVsdCBLZXJuZWxTaXplLkxBUkdFXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmtlcm5lbFNpemUgPSBLZXJuZWxTaXplLkxBUkdFO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGtlcm5lbC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gVGhlIGtlcm5lbC5cclxuXHQgKi9cclxuXHJcblx0Z2V0S2VybmVsKCkgeyByZXR1cm4ga2VybmVsUHJlc2V0c1t0aGlzLmtlcm5lbFNpemVdOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHRleGVsIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0geCAtIFRoZSB0ZXhlbCB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0geSAtIFRoZSB0ZXhlbCBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFRleGVsU2l6ZSh4LCB5KSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy50ZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpO1xyXG5cdFx0dGhpcy51bmlmb3Jtcy5oYWxmVGV4ZWxTaXplLnZhbHVlLnNldCh4LCB5KS5tdWx0aXBseVNjYWxhcigwLjUpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEthd2FzZSBibHVyIGtlcm5lbCBwcmVzZXRzLlxyXG4gKlxyXG4gKiBAdHlwZSB7RmxvYXQzMkFycmF5W119XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxuY29uc3Qga2VybmVsUHJlc2V0cyA9IFtcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAxLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMS4wLCAyLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAyLjAsIDMuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDMuMCwgNC4wLCA0LjAsIDUuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDMuMCwgNC4wLCA1LjAsIDcuMCwgOC4wLCA5LjAsIDEwLjBdKVxyXG5dO1xyXG5cclxuLyoqXHJcbiAqIEEga2VybmVsIHNpemUgZW51bWVyYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJZX1NNQUxMIC0gQSB2ZXJ5IHNtYWxsIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSA3eDcgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTTUFMTCAtIEEgc21hbGwga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDE1eDE1IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTUVESVVNIC0gQSBtZWRpdW0gc2l6ZWQga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDIzeDIzIEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTEFSR0UgLSBBIGxhcmdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAzNXgzNSBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFZFUllfTEFSR0UgLSBBIHZlcnkgbGFyZ2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDYzeDYzIEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gSFVHRSAtIEEgaHVnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMTI3eDEyNyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgS2VybmVsU2l6ZSA9IHtcclxuXHJcblx0VkVSWV9TTUFMTDogMCxcclxuXHRTTUFMTDogMSxcclxuXHRNRURJVU06IDIsXHJcblx0TEFSR0U6IDMsXHJcblx0VkVSWV9MQVJHRTogNCxcclxuXHRIVUdFOiA1XHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcdGdsX0ZyYWdDb2xvciA9IG9wYWNpdHkgKiB0ZXhlbDtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBzaW1wbGUgY29weSBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvcHlNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjb3B5IG1hdGVyaWFsLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkNvcHlNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdG9wYWNpdHk6IG5ldyBVbmlmb3JtKDEuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoYWRlciBtYXRlcmlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcG9zdCBwcm9jZXNzaW5nIHBhc3Nlcy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9tYXRlcmlhbHNcclxuICovXHJcblxyXG5leHBvcnQgeyBBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCB9IGZyb20gXCIuL2FkYXB0aXZlLWx1bWlub3NpdHkuanNcIjtcclxuZXhwb3J0IHsgQm9rZWhNYXRlcmlhbCB9IGZyb20gXCIuL2Jva2VoLmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoMk1hdGVyaWFsIH0gZnJvbSBcIi4vYm9rZWgyLmpzXCI7XHJcbmV4cG9ydCB7IENvbWJpbmVNYXRlcmlhbCB9IGZyb20gXCIuL2NvbWJpbmUuanNcIjtcclxuZXhwb3J0IHsgQ29udm9sdXRpb25NYXRlcmlhbCwgS2VybmVsU2l6ZSB9IGZyb20gXCIuL2NvbnZvbHV0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IENvcHlNYXRlcmlhbCB9IGZyb20gXCIuL2NvcHkuanNcIjtcclxuZXhwb3J0IHsgRGVwdGhNYXRlcmlhbCB9IGZyb20gXCIuL2RlcHRoLmpzXCI7XHJcbmV4cG9ydCB7IERvdFNjcmVlbk1hdGVyaWFsIH0gZnJvbSBcIi4vZG90LXNjcmVlbi5qc1wiO1xyXG5leHBvcnQgeyBGaWxtTWF0ZXJpYWwgfSBmcm9tIFwiLi9maWxtLmpzXCI7XHJcbmV4cG9ydCB7IEdsaXRjaE1hdGVyaWFsIH0gZnJvbSBcIi4vZ2xpdGNoLmpzXCI7XHJcbmV4cG9ydCB7IEdvZFJheXNNYXRlcmlhbCB9IGZyb20gXCIuL2dvZC1yYXlzLmpzXCI7XHJcbmV4cG9ydCB7IEx1bWlub3NpdHlNYXRlcmlhbCB9IGZyb20gXCIuL2x1bWlub3NpdHkuanNcIjtcclxuZXhwb3J0IHsgUGl4ZWxhdGlvbk1hdGVyaWFsIH0gZnJvbSBcIi4vcGl4ZWxhdGlvbi5qc1wiO1xyXG5leHBvcnQgeyBTaG9ja1dhdmVNYXRlcmlhbCB9IGZyb20gXCIuL3Nob2NrLXdhdmUuanNcIjtcclxuZXhwb3J0IHsgU01BQUJsZW5kTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLWJsZW5kLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLWNvbG9yLWVkZ2VzLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFXZWlnaHRzTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLXdlaWdodHMuanNcIjtcclxuZXhwb3J0IHsgVG9uZU1hcHBpbmdNYXRlcmlhbCB9IGZyb20gXCIuL3RvbmUtbWFwcGluZy5qc1wiO1xyXG4iLCJpbXBvcnQgeyBTY2VuZSwgTWVzaCwgT3J0aG9ncmFwaGljQ2FtZXJhLCBQbGFuZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG4vKipcclxuICogQW4gYWJzdHJhY3QgcGFzcy5cclxuICpcclxuICogUGFzc2VzIHRoYXQgZG8gbm90IHJlbHkgb24gdGhlIGRlcHRoIGJ1ZmZlciBzaG91bGQgZXhwbGljaXRseSBkaXNhYmxlIHRoZVxyXG4gKiBkZXB0aCB0ZXN0IGFuZCBkZXB0aCB3cml0ZSBpbiB0aGVpciByZXNwZWN0aXZlIHNoYWRlciBtYXRlcmlhbHMuXHJcbiAqXHJcbiAqIFRoaXMgY2xhc3MgaW1wbGVtZW50cyBhIHtAbGluayBQYXNzI2Rpc3Bvc2V9IG1ldGhvZCB0aGF0IGZyZWVzIG1lbW9yeSBvblxyXG4gKiBkZW1hbmQuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBbc2NlbmVdIC0gVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gW2NhbWVyYV0gLSBUaGUgY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7TWVzaH0gW3F1YWRdIC0gQSBxdWFkIHRoYXQgZmlsbHMgdGhlIHNjcmVlbiB0byByZW5kZXIgMkQgZmlsdGVyIGVmZmVjdHMuIFNldCB0aGlzIHRvIG51bGwsIGlmIHlvdSBkb24ndCBuZWVkIGl0IChzZWUge0BsaW5rIFJlbmRlclBhc3N9KS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRzY2VuZSA9IG5ldyBTY2VuZSgpLFxyXG5cdFx0Y2FtZXJhID0gbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgMSwgLTEsIDAsIDEpLFxyXG5cdFx0cXVhZCA9IG5ldyBNZXNoKG5ldyBQbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLCBudWxsKVxyXG5cdCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NjZW5lfVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IFNjZW5lKClcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjYW1lcmEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NhbWVyYX1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIDEsIC0xLCAwLCAxKVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jYW1lcmEgPSBjYW1lcmE7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHF1YWQgbWVzaCB0aGF0IGZpbGxzIHRoZSBzY3JlZW4uXHJcblx0XHQgKlxyXG5cdFx0ICogQXNzaWduIHlvdXIgc2hhZGVyIG1hdGVyaWFsIHRvIHRoaXMgbWVzaCFcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TWVzaH1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBNZXNoKG5ldyBQbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLCBudWxsKVxyXG5cdFx0ICogQGV4YW1wbGUgdGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5teU1hdGVyaWFsO1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5xdWFkID0gcXVhZDtcclxuXHJcblx0XHRpZih0aGlzLnF1YWQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucXVhZC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZih0aGlzLnNjZW5lICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2NlbmUuYWRkKHRoaXMucXVhZCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMgc2hvdWxkIGJlIHN3YXBwZWQgYWZ0ZXIgdGhpc1xyXG5cdFx0ICogcGFzcyBoYXMgZmluaXNoZWQgcmVuZGVyaW5nLlxyXG5cdFx0ICpcclxuXHRcdCAqIFNldCB0aGlzIHRvIHRydWUgaWYgdGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlciBzbyB0aGF0IGFcclxuXHRcdCAqIGZvbGxvd2luZyBwYXNzIGNhbiBmaW5kIHRoZSByZXN1bHQgaW4gdGhlIHJlYWQgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFbmFibGVkIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVuZGVyIHRvIHNjcmVlbiBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVG9TY3JlZW4gPSBmYWxzZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBUaGlzIGlzIGFuIGFic3RyYWN0IG1ldGhvZCB0aGF0IG11c3QgYmUgb3ZlcnJpZGRlbi5cclxuXHQgKlxyXG5cdCAqIEBhYnN0cmFjdFxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBBbiBlcnJvciBpcyB0aHJvd24gaWYgdGhlIG1ldGhvZCBpcyBub3Qgb3ZlcnJpZGRlbi5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBBIHJlYWQgYnVmZmVyLiBDb250YWlucyB0aGUgcmVzdWx0IG9mIHRoZSBwcmV2aW91cyBwYXNzLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gQSB3cml0ZSBidWZmZXIuIE5vcm1hbGx5IHVzZWQgYXMgdGhlIHJlbmRlciB0YXJnZXQgd2hlbiB0aGUgcmVhZCBidWZmZXIgaXMgdXNlZCBhcyBpbnB1dC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhXSAtIFRoZSBkZWx0YSB0aW1lLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2tBY3RpdmVdIC0gSW5kaWNhdGVzIHdoZXRoZXIgYSBzdGVuY2lsIHRlc3QgbWFzayBpcyBhY3RpdmUgb3Igbm90LlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSwgbWFza0FjdGl2ZSkge1xyXG5cclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlJlbmRlciBtZXRob2Qgbm90IGltcGxlbWVudGVkIVwiKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBZb3UgbWF5IG92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIGNhc2UgeW91IHdhbnQgdG8gYmUgaW5mb3JtZWQgYWJvdXQgdGhlIG1haW5cclxuXHQgKiByZW5kZXIgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIGJlZm9yZSB0aGlzIHBhc3MgaXNcclxuXHQgKiBpbml0aWFsaXNlZCBhbmQgZXZlcnkgdGltZSBpdHMgb3duIHNpemUgaXMgdXBkYXRlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSByZW5kZXJlcidzIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgcmVuZGVyZXIncyBoZWlnaHQuXHJcblx0ICogQGV4YW1wbGUgdGhpcy5teVJlbmRlclRhcmdldC5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIGluaXRpYWxpc2F0aW9uIHRhc2tzLlxyXG5cdCAqXHJcblx0ICogQnkgb3ZlcnJpZGluZyB0aGlzIG1ldGhvZCB5b3UgZ2FpbiBhY2Nlc3MgdG8gdGhlIHJlbmRlcmVyLiBZb3UnbGwgYWxzbyBiZVxyXG5cdCAqIGFibGUgdG8gY29uZmlndXJlIHlvdXIgY3VzdG9tIHJlbmRlciB0YXJnZXRzIHRvIHVzZSB0aGUgYXBwcm9wcmlhdGUgZm9ybWF0XHJcblx0ICogKFJHQiBvciBSR0JBKS5cclxuXHQgKlxyXG5cdCAqIFRoZSBwcm92aWRlZCByZW5kZXJlciBjYW4gYmUgdXNlZCB0byB3YXJtIHVwIHNwZWNpYWwgb2ZmLXNjcmVlbiByZW5kZXJcclxuXHQgKiB0YXJnZXRzIGJ5IHBlcmZvcm1pbmcgYSBwcmVsaW1pbmFyeSByZW5kZXIgb3BlcmF0aW9uLlxyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiB0aGlzIHBhc3MgaXMgYWRkZWQgdG8gaXRzXHJcblx0ICogcXVldWUuXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIGluaXRpYWxpc2VcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxwaGEgLSBXaGV0aGVyIHRoZSByZW5kZXJlciB1c2VzIHRoZSBhbHBoYSBjaGFubmVsIG9yIG5vdC5cclxuXHQgKiBAZXhhbXBsZSBpZighYWxwaGEpIHsgdGhpcy5teVJlbmRlclRhcmdldC50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDsgfVxyXG5cdCAqL1xyXG5cclxuXHRpbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSkge31cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgYSBzaGFsbG93IHNlYXJjaCBmb3IgcHJvcGVydGllcyB0aGF0IGRlZmluZSBhIGRpc3Bvc2UgbWV0aG9kIGFuZFxyXG5cdCAqIGRlbGV0ZXMgdGhlbS4gVGhlIHBhc3Mgd2lsbCBiZSBpbm9wZXJhdGl2ZSBhZnRlciB0aGlzIG1ldGhvZCB3YXMgY2FsbGVkIVxyXG5cdCAqXHJcblx0ICogRGlzcG9zYWJsZSBvYmplY3RzOlxyXG5cdCAqICAtIHJlbmRlciB0YXJnZXRzXHJcblx0ICogIC0gbWF0ZXJpYWxzXHJcblx0ICogIC0gdGV4dHVyZXNcclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gaXQgaXMgYmVpbmcgZGVzdHJveWVkLlxyXG5cdCAqIFlvdSBtYXksIGhvd2V2ZXIsIHVzZSBpdCBpbmRlcGVuZGVudGx5IHRvIGZyZWUgbWVtb3J5IHdoZW4geW91IGFyZSBjZXJ0YWluXHJcblx0ICogdGhhdCB5b3UgZG9uJ3QgbmVlZCB0aGlzIHBhc3MgYW55bW9yZS5cclxuXHQgKi9cclxuXHJcblx0ZGlzcG9zZSgpIHtcclxuXHJcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblxyXG5cdFx0bGV0IGtleTtcclxuXHJcblx0XHRmb3Ioa2V5IG9mIGtleXMpIHtcclxuXHJcblx0XHRcdGlmKHRoaXNba2V5XSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpc1trZXldLmRpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cclxuXHRcdFx0XHR0aGlzW2tleV0uZGlzcG9zZSgpO1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IG51bGw7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogVXNlZCBmb3Igc2F2aW5nIHRoZSBvcmlnaW5hbCBjbGVhciBjb2xvciBvZiB0aGUgcmVuZGVyZXIuXHJcbiAqXHJcbiAqIEB0eXBlIENvbG9yXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICovXHJcblxyXG5jb25zdCBjb2xvciA9IG5ldyBDb2xvcigpO1xyXG5cclxuLyoqXHJcbiAqIEEgY2xlYXIgcGFzcy5cclxuICpcclxuICogWW91IGNhbiBwcmV2ZW50IHNwZWNpZmljIGJ1ZmZlcnMgZnJvbSBiZWluZyBjbGVhcmVkIGJ5IHNldHRpbmcgZWl0aGVyIHRoZVxyXG4gKiBhdXRvQ2xlYXJDb2xvciwgYXV0b0NsZWFyU3RlbmNpbCBvciBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlclxyXG4gKiB0byBmYWxzZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY2xlYXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTAuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkNsZWFyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXIgY29sb3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvbG9yfVxyXG5cdFx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckNvbG9yID0gKG9wdGlvbnMuY2xlYXJDb2xvciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJDb2xvciA6IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhciBhbHBoYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQGRlZmF1bHQgMC4wXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyQWxwaGEgPSAob3B0aW9ucy5jbGVhckFscGhhICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckFscGhhIDogMC4wO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgcmVhZCBidWZmZXIgb3IgdGhlIHNjcmVlbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgY2xlYXJDb2xvciA9IHRoaXMuY2xlYXJDb2xvcjtcclxuXHJcblx0XHRsZXQgY2xlYXJBbHBoYTtcclxuXHJcblx0XHRpZihjbGVhckNvbG9yICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRjb2xvci5jb3B5KHJlbmRlcmVyLmdldENsZWFyQ29sb3IoKSk7XHJcblx0XHRcdGNsZWFyQWxwaGEgPSByZW5kZXJlci5nZXRDbGVhckFscGhhKCk7XHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY2xlYXJDb2xvciwgdGhpcy5jbGVhckFscGhhKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcik7XHJcblx0XHRyZW5kZXJlci5jbGVhcigpO1xyXG5cclxuXHRcdGlmKGNsZWFyQ29sb3IgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY29sb3IsIGNsZWFyQWxwaGEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IGRpc2FibGVzIHRoZSBzdGVuY2lsIG1hc2suXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjbGVhciBtYXNrIHBhc3MuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKG51bGwsIG51bGwsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJDbGVhck1hc2tQYXNzXCI7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzYWJsZXMgdGhlIHN0ZW5jaWwgdGVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlcikge1xyXG5cclxuXHRcdHJlbmRlcmVyLnN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRUZXN0KGZhbHNlKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEYXRhVGV4dHVyZSwgUkdCRm9ybWF0LCBGbG9hdFR5cGUgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgR2xpdGNoTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21JbnQobG93LCBoaWdoKSB7XHJcblxyXG5cdHJldHVybiBsb3cgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyArIDEpKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21GbG9hdChsb3csIGhpZ2gpIHtcclxuXHJcblx0cmV0dXJuIGxvdyArIE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgR2xpdGNoUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGdsaXRjaCBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7VGV4dHVyZX0gW29wdGlvbnMucGVydHVyYk1hcF0gLSBBIHBlcnR1cmJhdGlvbiBtYXAuIElmIG5vbmUgaXMgcHJvdmlkZWQsIGEgbm9pc2UgdGV4dHVyZSB3aWxsIGJlIGNyZWF0ZWQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR0U2l6ZT02NF0gLSBUaGUgc2l6ZSBvZiB0aGUgZ2VuZXJhdGVkIG5vaXNlIG1hcC4gV2lsbCBiZSBpZ25vcmVkIGlmIGEgcGVydHVyYmF0aW9uIG1hcCBpcyBwcm92aWRlZC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiR2xpdGNoUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdsaXRjaCBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBuZXcgR2xpdGNoTWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwID0gKG9wdGlvbnMucGVydHVyYk1hcCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMucGVydHVyYk1hcCA6IHRoaXMuZ2VuZXJhdGVQZXJ0dXJiTWFwKG9wdGlvbnMuZHRTaXplKTtcclxuXHRcdHRoaXMucGVydHVyYk1hcC5uYW1lID0gXCJHbGl0Y2guUGVydHVyYmF0aW9uXCI7XHJcblx0XHR0aGlzLnBlcnR1cmJNYXAuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWZmZWN0IG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1vZGV9XHJcblx0XHQgKiBAZGVmYXVsdCBHbGl0Y2hNb2RlLlNQT1JBRElDXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1vZGUgPSBHbGl0Y2hNb2RlLlNQT1JBRElDO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ291bnRlciBmb3IgZ2xpdGNoIGFjdGl2YXRpb24gYW5kIGRlYWN0aXZhdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJhbmRvbSBicmVhayBwb2ludCBmb3IgdGhlIHNwb3JhZGljIGdsaXRjaCBhY3RpdmF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5icmVha1BvaW50ID0gcmFuZG9tSW50KDEyMCwgMjQwKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdGdldCBwZXJ0dXJiTWFwKCkgeyByZXR1cm4gdGhpcy50ZXh0dXJlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFzc2lnbmluZyBhIG5ldyBwZXJ0dXJiYXRpb24gbWFwIGRvZXMgbm90IGRlc3Ryb3kgdGhlIGN1cnJlbnQgb25lIVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCBwZXJ0dXJiTWFwKHgpIHtcclxuXHJcblx0XHR0aGlzLnRleHR1cmUgPSB4O1xyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50UGVydHVyYi52YWx1ZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhlIGN1cnJlbnQgcGVydHVyYmF0aW9uIG1hcCBhbmQgcmVwbGFjZXMgaXQgd2l0aCBhIG5ldyBvbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3NpemU9NjRdIC0gVGhlIHRleHR1cmUgc2l6ZS5cclxuXHQgKiBAcmV0dXJuIHtEYXRhVGV4dHVyZX0gVGhlIHBlcnR1cmJhdGlvbiB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRnZW5lcmF0ZVBlcnR1cmJNYXAoc2l6ZSA9IDY0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGl4ZWxzID0gc2l6ZSAqIHNpemU7XHJcblx0XHRjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShwaXhlbHMgKiAzKTtcclxuXHJcblx0XHRsZXQgZHQgPSB0aGlzLnBlcnR1cmJNYXA7XHJcblx0XHRsZXQgaSwgeDtcclxuXHJcblx0XHRmb3IoaSA9IDA7IGkgPCBwaXhlbHM7ICsraSkge1xyXG5cclxuXHRcdFx0eCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG5cdFx0XHRkYXRhW2kgKiAzXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAxXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAyXSA9IHg7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGR0ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRkdC5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGR0ID0gbmV3IERhdGFUZXh0dXJlKGRhdGEsIHNpemUsIHNpemUsIFJHQkZvcm1hdCwgRmxvYXRUeXBlKTtcclxuXHRcdGR0Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLnBlcnR1cmJNYXAgPSBkdDtcclxuXHJcblx0XHRyZXR1cm4gZHQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IG1vZGUgPSB0aGlzLm1vZGU7XHJcblx0XHRjb25zdCBjb3VudGVyID0gdGhpcy5jb3VudGVyO1xyXG5cdFx0Y29uc3QgYnJlYWtQb2ludCA9IHRoaXMuYnJlYWtQb2ludDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gdGhpcy5tYXRlcmlhbC51bmlmb3JtcztcclxuXHJcblx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHVuaWZvcm1zLnNlZWQudmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xyXG5cdFx0dW5pZm9ybXMuYWN0aXZlLnZhbHVlID0gdHJ1ZTtcclxuXHJcblx0XHRpZihjb3VudGVyICUgYnJlYWtQb2ludCA9PT0gMCB8fCBtb2RlID09PSBHbGl0Y2hNb2RlLkNPTlNUQU5UX1dJTEQpIHtcclxuXHJcblx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyAzMC4wO1xyXG5cdFx0XHR1bmlmb3Jtcy5hbmdsZS52YWx1ZSA9IHJhbmRvbUZsb2F0KC1NYXRoLlBJLCBNYXRoLlBJKTtcclxuXHRcdFx0dW5pZm9ybXMuc2VlZFgudmFsdWUgPSByYW5kb21GbG9hdCgtMS4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0xLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWS52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHJcblx0XHRcdHRoaXMuYnJlYWtQb2ludCA9IHJhbmRvbUludCgxMjAsIDI0MCk7XHJcblx0XHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmKGNvdW50ZXIgJSBicmVha1BvaW50IDwgYnJlYWtQb2ludCAvIDUgfHwgbW9kZSA9PT0gR2xpdGNoTW9kZS5DT05TVEFOVF9NSUxEKSB7XHJcblxyXG5cdFx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyA5MC4wO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gcmFuZG9tRmxvYXQoLU1hdGguUEksIE1hdGguUEkpO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25ZLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLnNlZWRYLnZhbHVlID0gcmFuZG9tRmxvYXQoLTAuMywgMC4zKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0wLjMsIDAuMyk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHQvLyBTcG9yYWRpYy5cclxuXHRcdFx0XHR1bmlmb3Jtcy5hY3RpdmUudmFsdWUgPSBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Kyt0aGlzLmNvdW50ZXI7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZ2xpdGNoIG1vZGUgZW51bWVyYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTUE9SQURJQyAtIFNwb3JhZGljIGdsaXRjaGVzLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ09OU1RBTlRfTUlMRCAtIENvbnN0YW50IG1pbGQgZ2xpdGNoZXMuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05TVEFOVF9XSUxEIC0gQ29uc3RhbnQgd2lsZCBnbGl0Y2hlcy5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgR2xpdGNoTW9kZSA9IHtcclxuXHJcblx0U1BPUkFESUM6IDAsXHJcblx0Q09OU1RBTlRfTUlMRDogMSxcclxuXHRDT05TVEFOVF9XSUxEOiAyXHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBDbGVhclBhc3MgfSBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IHJlbmRlcnMgYSBnaXZlbiBzY2VuZSBkaXJlY3RseSBvbiBzY3JlZW4gb3IgaW50byB0aGUgcmVhZCBidWZmZXJcclxuICogZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHJlbmRlciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgY2FtZXJhIHRvIHVzZSB0byByZW5kZXIgdGhlIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtNYXRlcmlhbH0gW29wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbD1udWxsXSAtIEFuIG92ZXJyaWRlIG1hdGVyaWFsIGZvciB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTEuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsZWFyRGVwdGg9ZmFsc2VdIC0gV2hldGhlciBkZXB0aCBzaG91bGQgYmUgY2xlYXJlZCBleHBsaWNpdGx5LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xlYXI9dHJ1ZV0gLSBXaGV0aGVyIGFsbCBidWZmZXJzIHNob3VsZCBiZSBjbGVhcmVkLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcihzY2VuZSwgY2FtZXJhLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUmVuZGVyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjbGVhciBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDbGVhclBhc3N9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyUGFzcyA9IG5ldyBDbGVhclBhc3Mob3B0aW9ucyk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbiBvdmVycmlkZSBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TWF0ZXJpYWx9XHJcblx0XHQgKiBAZGVmYXVsdCBudWxsXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm92ZXJyaWRlTWF0ZXJpYWwgPSAob3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsIDogbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBkZXB0aCBidWZmZXIgc2hvdWxkIGJlIGNsZWFyZWQgZXhwbGljaXRseS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyRGVwdGggPSAob3B0aW9ucy5jbGVhckRlcHRoICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckRlcHRoIDogZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29sb3IsIGRlcHRoIGFuZCBzdGVuY2lsIGJ1ZmZlcnMgc2hvdWxkIGJlIGNsZWFyZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogRXZlbiB3aXRoIGNsZWFyIHNldCB0byB0cnVlIHlvdSBjYW4gcHJldmVudCBzcGVjaWZpYyBidWZmZXJzIGZyb20gYmVpbmdcclxuXHRcdCAqIGNsZWFyZWQgYnkgc2V0dGluZyBlaXRoZXIgdGhlIGF1dG9DbGVhckNvbG9yLCBhdXRvQ2xlYXJTdGVuY2lsIG9yXHJcblx0XHQgKiBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlciB0byBmYWxzZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXIgPSAob3B0aW9ucy5jbGVhciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXIgOiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIHNjZW5lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHJlYWRCdWZmZXI7XHJcblxyXG5cdFx0aWYodGhpcy5jbGVhcikge1xyXG5cclxuXHRcdFx0dGhpcy5jbGVhclBhc3MucmVuZGVyKHJlbmRlcmVyLCB0YXJnZXQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZih0aGlzLmNsZWFyRGVwdGgpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh0YXJnZXQpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhckRlcHRoKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSB0aGlzLm92ZXJyaWRlTWF0ZXJpYWw7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhLCB0YXJnZXQpO1xyXG5cdFx0c2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGw7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1hc2sgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBtYXNrIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBjYW1lcmEgdG8gdXNlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhKSB7XHJcblxyXG5cdFx0c3VwZXIoc2NlbmUsIGNhbWVyYSwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIk1hc2tQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnZlcnNlIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5pbnZlcnNlID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdGVuY2lsIGJ1ZmZlciBjbGVhciBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhclN0ZW5jaWwgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBzdGVuY2lsIGJpdCBtYXNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IGNvbnRleHQgPSByZW5kZXJlci5jb250ZXh0O1xyXG5cdFx0Y29uc3Qgc3RhdGUgPSByZW5kZXJlci5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuXHJcblx0XHRjb25zdCB3cml0ZVZhbHVlID0gdGhpcy5pbnZlcnNlID8gMCA6IDE7XHJcblx0XHRjb25zdCBjbGVhclZhbHVlID0gMSAtIHdyaXRlVmFsdWU7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgdXBkYXRlIGNvbG9yIG9yIGRlcHRoLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRNYXNrKGZhbHNlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TWFzayhmYWxzZSk7XHJcblxyXG5cdFx0Ly8gTG9jayB0aGUgYnVmZmVycy5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TG9ja2VkKHRydWUpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRMb2NrZWQodHJ1ZSk7XHJcblxyXG5cdFx0Ly8gQ29uZmlndXJlIHRoZSBzdGVuY2lsLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldFRlc3QodHJ1ZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0T3AoY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UsIGNvbnRleHQuUkVQTEFDRSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkFMV0FZUywgd3JpdGVWYWx1ZSwgMHhmZmZmZmZmZik7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0Q2xlYXIoY2xlYXJWYWx1ZSk7XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHN0ZW5jaWwuXHJcblx0XHRpZih0aGlzLmNsZWFyU3RlbmNpbCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHJlYWRCdWZmZXIpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhclN0ZW5jaWwoKTtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyU3RlbmNpbCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBEcmF3IHRoZSBtYXNrIGludG8gYm90aCBidWZmZXJzLlxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlYWRCdWZmZXIpO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHdyaXRlQnVmZmVyKTtcclxuXHJcblx0XHQvLyBVbmxvY2sgdGhlIGJ1ZmZlcnMuXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldExvY2tlZChmYWxzZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldExvY2tlZChmYWxzZSk7XHJcblxyXG5cdFx0Ly8gT25seSByZW5kZXIgd2hlcmUgdGhlIHN0ZW5jaWwgaXMgc2V0IHRvIDEuXHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRPcChjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCwgY29udGV4dC5LRUVQKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2hhZGVyIHBhc3MuXHJcbiAqXHJcbiAqIFVzZWQgdG8gcmVuZGVyIGFueSBzaGFkZXIgbWF0ZXJpYWwgYXMgYSAyRCBmaWx0ZXIuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNoYWRlclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzaGFkZXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2hhZGVyTWF0ZXJpYWx9IG1hdGVyaWFsIC0gVGhlIHNoYWRlciBtYXRlcmlhbCB0byB1c2UuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IFt0ZXh0dXJlSUQ9XCJ0RGlmZnVzZVwiXSAtIFRoZSB0ZXh0dXJlIHVuaWZvcm0gaWRlbnRpZmllci5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IobWF0ZXJpYWwsIHRleHR1cmVJRCA9IFwidERpZmZ1c2VcIikge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlNoYWRlclBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc2hhZGVyIG1hdGVyaWFsIHRvIHVzZSBmb3IgcmVuZGVyaW5nLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaGFkZXJNYXRlcmlhbH1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhlIGNvbG9yIHNhbXBsZXIgdW5pZm9ybSBvZiB0aGUgZ2l2ZW4gbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqIEBkZWZhdWx0IFwidERpZmZ1c2VcIlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlSUQgPSB0ZXh0dXJlSUQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGlmKHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbdGhpcy50ZXh0dXJlSURdICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbdGhpcy50ZXh0dXJlSURdLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsLCBTaG9ja1dhdmVNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBIYWxmIFBJLlxyXG4gKlxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IEhBTEZfUEkgPSBNYXRoLlBJICogMC41O1xyXG5cclxuLyoqXHJcbiAqIEEgdmVjdG9yLlxyXG4gKlxyXG4gKiBAdHlwZSB7VmVjdG9yM31cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbi8qKlxyXG4gKiBBIHZlY3Rvci5cclxuICpcclxuICogQHR5cGUge1ZlY3RvcjN9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgYWIgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuLyoqXHJcbiAqIEEgc2hvY2sgd2F2ZSBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTaG9ja1dhdmVQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgc2hvY2sgd2F2ZSBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBtYWluIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjN9IFtlcGljZW50ZXJdIC0gVGhlIHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBzaG9jayB3YXZlIGVwaWNlbnRlci5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNwZWVkPTEuMF0gLSBUaGUgYW5pbWF0aW9uIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhSYWRpdXM9MS4wXSAtIFRoZSBleHRlbnQgb2YgdGhlIHNob2NrIHdhdmUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndhdmVTaXplPTAuMl0gLSBUaGUgd2F2ZSBzaXplLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5hbXBsaXR1ZGU9MC4wNV0gLSBUaGUgZGlzdG9ydGlvbiBhbXBsaXR1ZGUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhbWVyYSwgZXBpY2VudGVyID0gbmV3IFZlY3RvcjMoKSwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiU2hvY2tXYXZlUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBtYWluIGNhbWVyYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0M0R9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1haW5DYW1lcmEgPSBjYW1lcmE7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZXBpY2VudGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtWZWN0b3IzfVxyXG5cdFx0ICogQGV4YW1wbGUgc2hvY2tXYXZlUGFzcy5lcGljZW50ZXIgPSBteU1lc2gucG9zaXRpb247XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmVwaWNlbnRlciA9IGVwaWNlbnRlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBvYmplY3QgcG9zaXRpb24gaW4gc2NyZWVuIHNwYWNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtWZWN0b3IzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NyZWVuUG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNwZWVkIG9mIHRoZSBzaG9jayB3YXZlIGFuaW1hdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQGRlZmF1bHQgMi4wXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNwZWVkID0gKG9wdGlvbnMuc3BlZWQgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnNwZWVkIDogMi4wO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSB0aW1lIGFjY3VtdWxhdG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50aW1lID0gMC4wO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNob2NrIHdhdmUgYW5pbWF0aW9uIGlzIGFjdGl2ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBzaG9jayB3YXZlIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hvY2tXYXZlTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbCA9IG5ldyBTaG9ja1dhdmVNYXRlcmlhbChvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zLmNlbnRlci52YWx1ZSA9IHRoaXMuc2NyZWVuUG9zaXRpb247XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb3B5TWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwgPSBuZXcgQ29weU1hdGVyaWFsKCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW1pdHMgdGhlIHNob2NrIHdhdmUuXHJcblx0ICovXHJcblxyXG5cdGV4cGxvZGUoKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gMC4wO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhIC0gVGhlIHJlbmRlciBkZWx0YSB0aW1lLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSkge1xyXG5cclxuXHRcdGNvbnN0IGVwaWNlbnRlciA9IHRoaXMuZXBpY2VudGVyO1xyXG5cdFx0Y29uc3QgbWFpbkNhbWVyYSA9IHRoaXMubWFpbkNhbWVyYTtcclxuXHRcdGNvbnN0IHNjcmVlblBvc2l0aW9uID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHRjb25zdCBzaG9ja1dhdmVNYXRlcmlhbCA9IHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWw7XHJcblx0XHRjb25zdCB1bmlmb3JtcyA9IHNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cdFx0Y29uc3QgY2VudGVyID0gdW5pZm9ybXMuY2VudGVyO1xyXG5cdFx0Y29uc3QgcmFkaXVzID0gdW5pZm9ybXMucmFkaXVzO1xyXG5cdFx0Y29uc3QgbWF4UmFkaXVzID0gdW5pZm9ybXMubWF4UmFkaXVzO1xyXG5cdFx0Y29uc3Qgd2F2ZVNpemUgPSB1bmlmb3Jtcy53YXZlU2l6ZTtcclxuXHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuY29weU1hdGVyaWFsO1xyXG5cclxuXHRcdGlmKHRoaXMuYWN0aXZlKSB7XHJcblxyXG5cdFx0XHQvLyBDYWxjdWxhdGUgZGlyZWN0aW9uIHZlY3RvcnMuXHJcblx0XHRcdG1haW5DYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24odik7XHJcblx0XHRcdGFiLmNvcHkobWFpbkNhbWVyYS5wb3NpdGlvbikuc3ViKGVwaWNlbnRlcik7XHJcblxyXG5cdFx0XHQvLyBEb24ndCByZW5kZXIgdGhlIGVmZmVjdCBpZiB0aGUgb2JqZWN0IGlzIGJlaGluZCB0aGUgY2FtZXJhLlxyXG5cdFx0XHRpZih2LmFuZ2xlVG8oYWIpID4gSEFMRl9QSSkge1xyXG5cclxuXHRcdFx0XHQvLyBTY2FsZSB0aGUgZWZmZWN0IGJhc2VkIG9uIGRpc3RhbmNlIHRvIHRoZSBvYmplY3QuXHJcblx0XHRcdFx0dW5pZm9ybXMuY2FtZXJhRGlzdGFuY2UudmFsdWUgPSBtYWluQ2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oZXBpY2VudGVyKTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FsY3VsYXRlIHRoZSBzY3JlZW4gcG9zaXRpb24gb2YgdGhlIGVwaWNlbnRlci5cclxuXHRcdFx0XHRzY3JlZW5Qb3NpdGlvbi5jb3B5KGVwaWNlbnRlcikucHJvamVjdChtYWluQ2FtZXJhKTtcclxuXHRcdFx0XHRjZW50ZXIudmFsdWUueCA9IChzY3JlZW5Qb3NpdGlvbi54ICsgMS4wKSAqIDAuNTtcclxuXHRcdFx0XHRjZW50ZXIudmFsdWUueSA9IChzY3JlZW5Qb3NpdGlvbi55ICsgMS4wKSAqIDAuNTtcclxuXHJcblx0XHRcdFx0dW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHRcdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gc2hvY2tXYXZlTWF0ZXJpYWw7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBVcGRhdGUgdGhlIHNob2NrIHdhdmUgcmFkaXVzIGJhc2VkIG9uIHRpbWUuXHJcblx0XHRcdHRoaXMudGltZSArPSBkZWx0YTtcclxuXHRcdFx0cmFkaXVzLnZhbHVlID0gdGhpcy50aW1lICogdGhpcy5zcGVlZCAtIHdhdmVTaXplLnZhbHVlO1xyXG5cclxuXHRcdFx0aWYocmFkaXVzLnZhbHVlID49IChtYXhSYWRpdXMudmFsdWUgKyB3YXZlU2l6ZS52YWx1ZSkgKiAyKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zLmFzcGVjdC52YWx1ZSA9IHdpZHRoIC8gaGVpZ2h0O1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbXBpbGF0aW9uIG9mIHRoZSBwb3N0IHByb2Nlc3NpbmcgcGFzc2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL3Bhc3Nlc1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEJsb29tUGFzcyB9IGZyb20gXCIuL2Jsb29tLmpzXCI7XHJcbmV4cG9ydCB7IEJsdXJQYXNzIH0gZnJvbSBcIi4vYmx1ci5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaFBhc3MgfSBmcm9tIFwiLi9ib2tlaC5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaDJQYXNzIH0gZnJvbSBcIi4vYm9rZWgyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyUGFzcyB9IGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyTWFza1Bhc3MgfSBmcm9tIFwiLi9jbGVhci1tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IERvdFNjcmVlblBhc3MgfSBmcm9tIFwiLi9kb3Qtc2NyZWVuLmpzXCI7XHJcbmV4cG9ydCB7IERlcHRoUGFzcyB9IGZyb20gXCIuL2RlcHRoLmpzXCI7XHJcbmV4cG9ydCB7IEZpbG1QYXNzIH0gZnJvbSBcIi4vZmlsbS5qc1wiO1xyXG5leHBvcnQgeyBHbGl0Y2hNb2RlLCBHbGl0Y2hQYXNzIH0gZnJvbSBcIi4vZ2xpdGNoLmpzXCI7XHJcbmV4cG9ydCB7IEdvZFJheXNQYXNzIH0gZnJvbSBcIi4vZ29kLXJheXMuanNcIjtcclxuZXhwb3J0IHsgTWFza1Bhc3MgfSBmcm9tIFwiLi9tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcbmV4cG9ydCB7IFBpeGVsYXRpb25QYXNzIH0gZnJvbSBcIi4vcGl4ZWxhdGlvbi5qc1wiO1xyXG5leHBvcnQgeyBSZW5kZXJQYXNzIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNhdmVQYXNzIH0gZnJvbSBcIi4vc2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTaGFkZXJQYXNzIH0gZnJvbSBcIi4vc2hhZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNob2NrV2F2ZVBhc3MgfSBmcm9tIFwiLi9zaG9jay13YXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFQYXNzIH0gZnJvbSBcIi4vc21hYS5qc1wiO1xyXG5leHBvcnQgeyBUZXh0dXJlUGFzcyB9IGZyb20gXCIuL3RleHR1cmUuanNcIjtcclxuZXhwb3J0IHsgVG9uZU1hcHBpbmdQYXNzIH0gZnJvbSBcIi4vdG9uZS1tYXBwaW5nLmpzXCI7XHJcbiIsImltcG9ydCB7XHJcblx0RGVwdGhTdGVuY2lsRm9ybWF0LFxyXG5cdERlcHRoVGV4dHVyZSxcclxuXHRMaW5lYXJGaWx0ZXIsXHJcblx0UkdCQUZvcm1hdCxcclxuXHRSR0JGb3JtYXQsXHJcblx0VW5zaWduZWRJbnQyNDhUeXBlLFxyXG5cdFdlYkdMUmVuZGVyVGFyZ2V0XHJcbn0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQgeyBDbGVhck1hc2tQYXNzLCBNYXNrUGFzcywgU2hhZGVyUGFzcyB9IGZyb20gXCIuLi9wYXNzZXNcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFZmZlY3RDb21wb3NlciBtYXkgYmUgdXNlZCBpbiBwbGFjZSBvZiBhIG5vcm1hbCBXZWJHTFJlbmRlcmVyLlxyXG4gKlxyXG4gKiBUaGUgYXV0byBjbGVhciBiZWhhdmlvdXIgb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyIHdpbGwgYmUgZGlzYWJsZWQgdG8gcHJldmVudFxyXG4gKiB1bm5lY2Vzc2FyeSBjbGVhciBvcGVyYXRpb25zLlxyXG4gKlxyXG4gKiBJdCBpcyBjb21tb24gcHJhY3RpY2UgdG8gdXNlIGEge0BsaW5rIFJlbmRlclBhc3N9IGFzIHRoZSBmaXJzdCBwYXNzIHRvXHJcbiAqIGF1dG9tYXRpY2FsbHkgY2xlYXIgdGhlIHNjcmVlbiBhbmQgcmVuZGVyIHRoZSBzY2VuZSB0byBhIHRleHR1cmUgZm9yIGZ1cnRoZXJcclxuICogcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRWZmZWN0Q29tcG9zZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGVmZmVjdCBjb21wb3Nlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gW3JlbmRlcmVyXSAtIFRoZSByZW5kZXJlciB0aGF0IHNob3VsZCBiZSB1c2VkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRlcHRoQnVmZmVyPXRydWVdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIGRlcHRoIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0ZW5jaWxCdWZmZXI9ZmFsc2VdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGVwdGhUZXh0dXJlPWZhbHNlXSAtIFNldCB0byB0cnVlIGlmIG9uZSBvZiB5b3VyIHBhc3NlcyByZWxpZXMgb24gYSBkZXB0aCB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZW5kZXJlciA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlbmRlcmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFlvdSBtYXkgcmVwbGFjZSB0aGUgcmVuZGVyZXIgYXQgYW55IHRpbWUgYnkgdXNpbmdcclxuXHRcdCAqIHtAbGluayBFZmZlY3RDb21wb3NlciNyZXBsYWNlUmVuZGVyZXJ9LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlcmVyfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlYWQgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFJlYWRpbmcgZnJvbSBhbmQgd3JpdGluZyB0byB0aGUgc2FtZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBiZSBhdm9pZGVkLlxyXG5cdFx0ICogVGhlcmVmb3JlLCB0d28gc2VwZXJhdGUgeWV0IGlkZW50aWNhbCBidWZmZXJzIGFyZSB1c2VkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0aWYodGhpcy5yZW5kZXJlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoQnVmZmVyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5kZXB0aEJ1ZmZlciA6IHRydWUsXHJcblx0XHRcdFx0KG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciA6IGZhbHNlLFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoVGV4dHVyZSAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuZGVwdGhUZXh0dXJlIDogZmFsc2VcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuY2xvbmUoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgcGFzcyB1c2VkIGZvciBjb3B5aW5nIG1hc2tlZCBzY2VuZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NoYWRlclBhc3N9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5UGFzcyA9IG5ldyBTaGFkZXJQYXNzKG5ldyBDb3B5TWF0ZXJpYWwoKSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcGFzc2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtQYXNzW119XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5wYXNzZXMgPSBbXTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZGVwdGggdGV4dHVyZSBvZiB0aGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEZXB0aFRleHR1cmV9XHJcblx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgZGVwdGhUZXh0dXJlKCkgeyByZXR1cm4gdGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycyBzaGFyZSBhIHNpbmdsZSBkZXB0aCB0ZXh0dXJlLiBEZXB0aCB3aWxsIGJlXHJcblx0ICogd3JpdHRlbiB0byB0aGlzIHRleHR1cmUgd2hlbiBzb21ldGhpbmcgaXMgcmVuZGVyZWQgaW50byBvbmUgb2YgdGhlIGJ1ZmZlcnNcclxuXHQgKiBhbmQgdGhlIGludm9sdmVkIG1hdGVyaWFscyBoYXZlIGRlcHRoIHdyaXRlIGVuYWJsZWQuXHJcblx0ICpcclxuXHQgKiBZb3UgbWF5IGVuYWJsZSB0aGlzIG1lY2hhbmlzbSBkdXJpbmcgdGhlIGluc3RhbnRpYXRpb24gb2YgdGhlIGNvbXBvc2VyIG9yXHJcblx0ICogYnkgYXNzaWduaW5nIGEgRGVwdGhUZXh0dXJlIGluc3RhbmNlIGxhdGVyIG9uLiBZb3UgbWF5IGFsc28gZGlzYWJsZSBpdCBieVxyXG5cdCAqIGFzc2lnbmluZyBudWxsLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0RlcHRoVGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IGRlcHRoVGV4dHVyZSh4KSB7XHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblx0XHR0aGlzLndyaXRlQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGN1cnJlbnQgcmVuZGVyZXIgd2l0aCB0aGUgZ2l2ZW4gb25lLiBUaGUgRE9NIGVsZW1lbnQgb2YgdGhlXHJcblx0ICogY3VycmVudCByZW5kZXJlciB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgbm9kZSBhbmQgdGhlXHJcblx0ICogRE9NIGVsZW1lbnQgb2YgdGhlIG5ldyByZW5kZXJlciB3aWxsIHRha2UgaXRzIHBsYWNlLlxyXG5cdCAqXHJcblx0ICogVGhlIGF1dG8gY2xlYXIgbWVjaGFuaXNtIG9mIHRoZSBwcm92aWRlZCByZW5kZXJlciB3aWxsIGJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogU3dpdGNoaW5nIGJldHdlZW4gcmVuZGVyZXJzIGFsbG93cyB5b3UgdG8gZHluYW1pY2FsbHkgZW5hYmxlIG9yIGRpc2FibGVcclxuXHQgKiBhbnRpYWxpYXNpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIG5ldyByZW5kZXJlci5cclxuXHQgKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmVyfSBUaGUgb2xkIHJlbmRlcmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpIHtcclxuXHJcblx0XHRjb25zdCBvbGRSZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblxyXG5cdFx0bGV0IHBhcmVudCwgb2xkU2l6ZSwgbmV3U2l6ZTtcclxuXHJcblx0XHRpZihvbGRSZW5kZXJlciAhPT0gbnVsbCAmJiBvbGRSZW5kZXJlciAhPT0gcmVuZGVyZXIpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHBhcmVudCA9IG9sZFJlbmRlcmVyLmRvbUVsZW1lbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkU2l6ZSA9IG9sZFJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdFx0bmV3U2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcclxuXHJcblx0XHRcdGlmKHBhcmVudCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQob2xkUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYob2xkU2l6ZS53aWR0aCAhPT0gbmV3U2l6ZS53aWR0aCB8fCBvbGRTaXplLmhlaWdodCAhPT0gbmV3U2l6ZS5oZWlnaHQpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zZXRTaXplKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvbGRSZW5kZXJlcjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IHJlbmRlciB0YXJnZXQgYnkgcmVwbGljYXRpbmcgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqXHJcblx0ICogVGhlIGNyZWF0ZWQgcmVuZGVyIHRhcmdldCB1c2VzIGEgbGluZWFyIGZpbHRlciBmb3IgdGV4ZWwgbWluaWZpY2F0aW9uIGFuZFxyXG5cdCAqIG1hZ25pZmljYXRpb24uIEl0cyByZW5kZXIgdGV4dHVyZSBmb3JtYXQgZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSByZW5kZXJlclxyXG5cdCAqIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwuIE1pcG1hcHMgYXJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBkZXB0aEJ1ZmZlciAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBkZXB0aCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBzdGVuY2lsQnVmZmVyIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVwdGhUZXh0dXJlIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIGRlcHRoIHRleHR1cmUuXHJcblx0ICogQHJldHVybiB7V2ViR0xSZW5kZXJUYXJnZXR9IEEgbmV3IHJlbmRlciB0YXJnZXQgdGhhdCBlcXVhbHMgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqL1xyXG5cclxuXHRjcmVhdGVCdWZmZXIoZGVwdGhCdWZmZXIsIHN0ZW5jaWxCdWZmZXIsIGRlcHRoVGV4dHVyZSkge1xyXG5cclxuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHRcdGNvbnN0IGFscGhhID0gdGhpcy5yZW5kZXJlci5jb250ZXh0LmdldENvbnRleHRBdHRyaWJ1dGVzKCkuYWxwaGE7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0ID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KHNpemUud2lkdGggKiBwaXhlbFJhdGlvLCBzaXplLmhlaWdodCAqIHBpeGVsUmF0aW8sIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRmb3JtYXQ6IGFscGhhID8gUkdCQUZvcm1hdCA6IFJHQkZvcm1hdCxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGRlcHRoQnVmZmVyLFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBzdGVuY2lsQnVmZmVyLFxyXG5cdFx0XHRkZXB0aFRleHR1cmU6IGRlcHRoVGV4dHVyZSA/IG5ldyBEZXB0aFRleHR1cmUoKSA6IG51bGxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGRlcHRoVGV4dHVyZSAmJiBzdGVuY2lsQnVmZmVyKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJUYXJnZXQuZGVwdGhUZXh0dXJlLmZvcm1hdCA9IERlcHRoU3RlbmNpbEZvcm1hdDtcclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmRlcHRoVGV4dHVyZS50eXBlID0gVW5zaWduZWRJbnQyNDhUeXBlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJUYXJnZXQudGV4dHVyZS5uYW1lID0gXCJFZmZlY3RDb21wb3Nlci5CdWZmZXJcIjtcclxuXHRcdHJlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJUYXJnZXQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIHBhc3MsIG9wdGlvbmFsbHkgYXQgYSBzcGVjaWZpYyBpbmRleC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGFzc30gcGFzcyAtIEEgbmV3IHBhc3MuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtpbmRleF0gLSBBbiBpbmRleCBhdCB3aGljaCB0aGUgcGFzcyBzaG91bGQgYmUgaW5zZXJ0ZWQuXHJcblx0ICovXHJcblxyXG5cdGFkZFBhc3MocGFzcywgaW5kZXgpIHtcclxuXHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBzaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHRwYXNzLnNldFNpemUoc2l6ZS53aWR0aCAqIHBpeGVsUmF0aW8sIHNpemUuaGVpZ2h0ICogcGl4ZWxSYXRpbyk7XHJcblx0XHRwYXNzLmluaXRpYWxpc2UocmVuZGVyZXIsIHJlbmRlcmVyLmNvbnRleHQuZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbHBoYSk7XHJcblxyXG5cdFx0aWYoaW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMuc3BsaWNlKGluZGV4LCAwLCBwYXNzKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMucHVzaChwYXNzKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1Bhc3N9IHBhc3MgLSBUaGUgcGFzcy5cclxuXHQgKi9cclxuXHJcblx0cmVtb3ZlUGFzcyhwYXNzKSB7XHJcblxyXG5cdFx0dGhpcy5wYXNzZXMuc3BsaWNlKHRoaXMucGFzc2VzLmluZGV4T2YocGFzcyksIDEpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgYWxsIGVuYWJsZWQgcGFzc2VzIGluIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgYWRkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgdGltZSBiZXR3ZWVuIHRoZSBsYXN0IGZyYW1lIGFuZCB0aGUgY3VycmVudCBvbmUgaW4gc2Vjb25kcy5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBjb3B5UGFzcyA9IHRoaXMuY29weVBhc3M7XHJcblxyXG5cdFx0bGV0IHJlYWRCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXI7XHJcblx0XHRsZXQgd3JpdGVCdWZmZXIgPSB0aGlzLndyaXRlQnVmZmVyO1xyXG5cclxuXHRcdGxldCBtYXNrQWN0aXZlID0gZmFsc2U7XHJcblx0XHRsZXQgcGFzcywgY29udGV4dCwgYnVmZmVyO1xyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0Zm9yKGkgPSAwLCBsID0gcGFzc2VzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0cGFzcyA9IHBhc3Nlc1tpXTtcclxuXHJcblx0XHRcdGlmKHBhc3MuZW5hYmxlZCkge1xyXG5cclxuXHRcdFx0XHRwYXNzLnJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlKTtcclxuXHJcblx0XHRcdFx0aWYocGFzcy5uZWVkc1N3YXApIHtcclxuXHJcblx0XHRcdFx0XHRpZihtYXNrQWN0aXZlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyhjb250ZXh0Lk5PVEVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdFx0XHRcdFx0Y29weVBhc3MucmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc3RlbmNpbEZ1bmMoY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJ1ZmZlciA9IHJlYWRCdWZmZXI7XHJcblx0XHRcdFx0XHRyZWFkQnVmZmVyID0gd3JpdGVCdWZmZXI7XHJcblx0XHRcdFx0XHR3cml0ZUJ1ZmZlciA9IGJ1ZmZlcjtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihwYXNzIGluc3RhbmNlb2YgTWFza1Bhc3MpIHtcclxuXHJcblx0XHRcdFx0XHRtYXNrQWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmKHBhc3MgaW5zdGFuY2VvZiBDbGVhck1hc2tQYXNzKSB7XHJcblxyXG5cdFx0XHRcdFx0bWFza0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGJ1ZmZlcnMgYW5kIHRoZSByZW5kZXJlcidzIG91dHB1dCBjYW52YXMuXHJcblx0ICpcclxuXHQgKiBFdmVyeSBwYXNzIHdpbGwgYmUgaW5mb3JtZWQgb2YgdGhlIG5ldyBzaXplLiBJdCdzIHVwIHRvIGVhY2ggcGFzcyBob3cgdGhhdFxyXG5cdCAqIGluZm9ybWF0aW9uIGlzIHVzZWQuXHJcblx0ICpcclxuXHQgKiBJZiBubyB3aWR0aCBvciBoZWlnaHQgaXMgc3BlY2lmaWVkLCB0aGUgcmVuZGVyIHRhcmdldHMgYW5kIHBhc3NlcyB3aWxsIGJlXHJcblx0ICogdXBkYXRlZCB3aXRoIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIHJlbmRlcmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aF0gLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdIC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblxyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0aWYod2lkdGggPT09IHVuZGVmaW5lZCB8fCBoZWlnaHQgPT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0d2lkdGggPSBzaXplLndpZHRoO1xyXG5cdFx0XHRoZWlnaHQgPSBzaXplLmhlaWdodDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdHdpZHRoICo9IHBpeGVsUmF0aW87XHJcblx0XHRoZWlnaHQgKj0gcGl4ZWxSYXRpbztcclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMud3JpdGVCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHRmb3IoaSA9IDAsIGwgPSBwYXNzZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcblxyXG5cdFx0XHRwYXNzZXNbaV0uc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoaXMgY29tcG9zZXIgYnkgZGVsZXRpbmcgYWxsIHBhc3NlcyBhbmQgY3JlYXRpbmcgbmV3IGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBzZXR0aW5ncyBvZiB0aGUgcmVuZGVyZXIgd2lsbCBiZSB1c2VkLlxyXG5cdCAqL1xyXG5cclxuXHRyZXNldChyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBkZXB0aEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5kZXB0aEJ1ZmZlcjtcclxuXHRcdGNvbnN0IHN0ZW5jaWxCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuc3RlbmNpbEJ1ZmZlcjtcclxuXHRcdGNvbnN0IGRlcHRoVGV4dHVyZSA9ICh0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlICE9PSBudWxsKTtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2UoKHJlbmRlclRhcmdldCA9PT0gdW5kZWZpbmVkKSA/XHJcblx0XHRcdHRoaXMuY3JlYXRlQnVmZmVyKGRlcHRoQnVmZmVyLCBzdGVuY2lsQnVmZmVyLCBkZXB0aFRleHR1cmUpIDpcclxuXHRcdFx0cmVuZGVyVGFyZ2V0XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIGFsbCBwYXNzZXMgYW5kIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogVGhpcyBtZXRob2QgZGVhbGxvY2F0ZXMgYWxsIHJlbmRlciB0YXJnZXRzLCB0ZXh0dXJlcyBhbmQgbWF0ZXJpYWxzIGNyZWF0ZWRcclxuXHQgKiBieSB0aGUgcGFzc2VzLiBJdCBhbHNvIGRlbGV0ZXMgdGhpcyBjb21wb3NlcidzIGZyYW1lIGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBjb21wb3NlciB3aWxsIGJlY29tZSBpbm9wZXJhdGl2ZS5cclxuXHQgKi9cclxuXHJcblx0ZGlzcG9zZShyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHJcblx0XHRpZih0aGlzLnJlYWRCdWZmZXIgIT09IG51bGwgJiYgdGhpcy53cml0ZUJ1ZmZlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyLmRpc3Bvc2UoKTtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlci5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUocGFzc2VzLmxlbmd0aCA+IDApIHtcclxuXHJcblx0XHRcdHBhc3Nlcy5wb3AoKS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHJlbmRlclRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHQvLyBSZWFuaW1hdGUuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHJlbmRlclRhcmdldDtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5jbG9uZSgpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR0aGlzLmNvcHlQYXNzLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcmUgY29tcG9uZW50cy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9jb3JlXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwiLi9lZmZlY3QtY29tcG9zZXIuanNcIjtcclxuIiwiLyoqXHJcbiAqIEV4cG9zdXJlIG9mIHRoZSBsaWJyYXJ5IGNvbXBvbmVudHMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmdcclxuICovXHJcblxyXG5leHBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCIuL2NvcmVcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0Qmxvb21QYXNzLFxyXG5cdEJsdXJQYXNzLFxyXG5cdEJva2VoUGFzcyxcclxuXHRCb2tlaDJQYXNzLFxyXG5cdENsZWFyUGFzcyxcclxuXHRDbGVhck1hc2tQYXNzLFxyXG5cdERlcHRoUGFzcyxcclxuXHREb3RTY3JlZW5QYXNzLFxyXG5cdEZpbG1QYXNzLFxyXG5cdEdsaXRjaE1vZGUsXHJcblx0R2xpdGNoUGFzcyxcclxuXHRHb2RSYXlzUGFzcyxcclxuXHRNYXNrUGFzcyxcclxuXHRQYXNzLFxyXG5cdFBpeGVsYXRpb25QYXNzLFxyXG5cdFJlbmRlclBhc3MsXHJcblx0U2F2ZVBhc3MsXHJcblx0U2hhZGVyUGFzcyxcclxuXHRTaG9ja1dhdmVQYXNzLFxyXG5cdFNNQUFQYXNzLFxyXG5cdFRleHR1cmVQYXNzLFxyXG5cdFRvbmVNYXBwaW5nUGFzc1xyXG59IGZyb20gXCIuL3Bhc3Nlc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCxcclxuXHRCb2tlaE1hdGVyaWFsLFxyXG5cdEJva2VoMk1hdGVyaWFsLFxyXG5cdENvbWJpbmVNYXRlcmlhbCxcclxuXHRDb252b2x1dGlvbk1hdGVyaWFsLFxyXG5cdENvcHlNYXRlcmlhbCxcclxuXHREZXB0aE1hdGVyaWFsLFxyXG5cdERvdFNjcmVlbk1hdGVyaWFsLFxyXG5cdEZpbG1NYXRlcmlhbCxcclxuXHRHbGl0Y2hNYXRlcmlhbCxcclxuXHRHb2RSYXlzTWF0ZXJpYWwsXHJcblx0S2VybmVsU2l6ZSxcclxuXHRMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0UGl4ZWxhdGlvbk1hdGVyaWFsLFxyXG5cdFNob2NrV2F2ZU1hdGVyaWFsLFxyXG5cdFNNQUFCbGVuZE1hdGVyaWFsLFxyXG5cdFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwsXHJcblx0U01BQVdlaWdodHNNYXRlcmlhbCxcclxuXHRUb25lTWFwcGluZ01hdGVyaWFsXHJcbn0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbiIsImltcG9ydCB7XG4gIEVmZmVjdENvbXBvc2VyLFxuICBSZW5kZXJQYXNzLFxuICBTaGFkZXJQYXNzXG59IGZyb20gJ3Bvc3Rwcm9jZXNzaW5nJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG5jb25zdCBwb2x5ZmlsbCA9IChvYmplY3QsIG1ldGhvZCwgc2hvd1dhcm4gPSB0cnVlKSA9PiB7XG4gIGlmIChvYmplY3RbbWV0aG9kXSkgcmV0dXJuO1xuICBpZiAoc2hvd1dhcm4pIGNvbnNvbGUud2FybihgQFBvc3RQcm9jZXNzb3JNb2R1bGU6IHBhc3MuJHttZXRob2R9KCkgd2FzIG5vdCBmb3VuZC5gLCBvYmplY3QpO1xuICBvYmplY3RbbWV0aG9kXSA9ICgpID0+IHt9O1xufTtcblxuZXhwb3J0IGNsYXNzIFBvc3RQcm9jZXNzb3JNb2R1bGUge1xuICBjdXJyZW50UGFzcyA9IG51bGw7XG5cbiAgZGVmZXIgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBjb25zdHJ1Y3Rvcih7ZGVidWd9ID0ge2RlYnVnOiB0cnVlfSkge1xuICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdwb3N0cHJvY2Vzc29yJyk7XG5cbiAgICB0aGlzLmVmZmVjdHMgPSBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykuZWZmZWN0cztcbiAgICB0aGlzLnJlbmRlcmVyID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5zY2VuZSA9IG1hbmFnZXIuZ2V0KCdzY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgdGhpcy5jb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3Nlcih0aGlzLnJlbmRlcmVyKTtcblxuICAgIG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5zdG9wKCk7XG5cbiAgICBjb25zdCBjb21wb3NlciA9IHRoaXMuY29tcG9zZXI7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoY2xvY2sgPT4gY29tcG9zZXIucmVuZGVyKGNsb2NrLmdldERlbHRhKCkpKS5zdGFydChtYW5hZ2VyLmhhbmRsZXIpO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgcmVuZGVyZXI6IHJlbmRlcmVyID0+IHtcbiAgICAgICAgdGhpcy5jb21wb3Nlci5yZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpO1xuICAgICAgfSxcblxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcblxuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVzb2x2ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBwYXNzID0gbmV3IFJlbmRlclBhc3ModGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEubmF0aXZlKTtcblxuICAgICAgLy8gVE9ETzogU3VwcG9ydCBmb3IgZWZmZWN0cy5cblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIHBhc3MocGFzcykge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBwb2x5ZmlsbChwYXNzLCAnc2V0U2l6ZScsIHRoaXMuZGVidWcpO1xuICAgICAgcG9seWZpbGwocGFzcywgJ2luaXRpYWxpc2UnLCB0aGlzLmRlYnVnKTtcblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNoYWRlcihtYXRlcmlhbCwgdGV4dHVyZUlEID0gJ3JlYWRCdWZmZXInKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIGlmICghbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSlcbiAgICAgICAgbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSA9IHt2YWx1ZTogbnVsbH07XG5cbiAgICAgIGNvbnN0IHBhc3MgPSBuZXcgU2hhZGVyUGFzcyhtYXRlcmlhbCwgdGV4dHVyZUlEKTtcbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBQYXNzIEFQSVxuXG4gIGdldChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWVcbiAgICAgID8gdGhpcy5jb21wb3Nlci5wYXNzZXMuZmlsdGVyKHBhc3MgPT4gcGFzcy5uYW1lID09PSBuYW1lKVswXVxuICAgICAgOiB0aGlzLmN1cnJlbnRQYXNzO1xuICB9XG5cbiAgdG8obmFtZSkge1xuICAgIHRoaXMuY3VycmVudFBhc3MgPSBuYW1lO1xuICB9XG5cbiAgcmVuZGVyVG9TY3JlZW4oYm9vbCA9IHRydWUpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFzcy5yZW5kZXJUb1NjcmVlbiA9IGJvb2w7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5hbWUobmFtZSkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzLm5hbWUgPSBuYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFdmVudHNQYXRjaE1vZHVsZSB7XG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdldmVudHMnKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICB9XG5cbiAgcGF0Y2hFdmVudHMob3JpZ2luT2JqZWN0LCBkZXN0T2JqZWN0LCBldmVudHMgPSBbXSkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICBvcmlnaW5PYmplY3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZSA9PiBkZXN0T2JqZWN0LmVtaXQoZXZlbnQsIGUpKVxuICAgICk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHtlbGVtZW50LCBwYXRjaEV2ZW50c30gPSBzZWxmO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ21vdXNlbW92ZScsXG4gICAgICAnbW91c2V1cCcsXG4gICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgJ21vdXNlZG93bicsXG4gICAgICAnY2xpY2snLFxuICAgICAgJ3doZWVsJyxcbiAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICd0b3VjaGVuZCcsXG4gICAgICAndG91Y2htb3ZlJyxcbiAgICAgICdrZXlkb3duJ1xuICAgIF0pO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ2tleWRvd24nLFxuICAgICAgJ2tleXVwJyxcbiAgICAgICdrZXlwcmVzcydcbiAgICBdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgVmVjdG9yMixcbiAgUmF5Y2FzdGVyLFxuICBQbGFuZSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG4vKipcbiAqIEBjbGFzcyBWaXJ0dWFsTW91c2VNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtCb29sZWFufSBbZ2xvYmFsTW92ZW1lbnQ9ZmFsc2VdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXh0ZW5kcyBFdmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFZpcnR1YWxNb3VzZU1vZHVsZSBleHRlbmRzIEV2ZW50cyB7XG4gIG1vdXNlID0gbmV3IFZlY3RvcjIoKTtcbiAgcmF5Y2FzdGVyID0gbmV3IFJheWNhc3RlcigpO1xuICB3b3JsZCA9IG51bGw7XG4gIGNhbnZhcyA9IG51bGw7XG4gIHByb2plY3Rpb25QbGFuZSA9IG5ldyBQbGFuZShuZXcgVmVjdG9yMygwLCAwLCAxKSwgMCk7XG5cbiAgY29uc3RydWN0b3IoZ2xvYmFsTW92ZW1lbnQgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5nbG9iYWxNb3ZlbWVudCA9IGdsb2JhbE1vdmVtZW50O1xuICB9XG5cbiAgdXBkYXRlKGUsIGN1c3RvbVgsIGN1c3RvbVkpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCB4ID0gY3VzdG9tWCB8fCBlLmNsaWVudFg7XG4gICAgY29uc3QgeSA9IGN1c3RvbVkgfHwgZS5jbGllbnRZO1xuXG4gICAgdGhpcy5tb3VzZS54ID0gKCh4IC0gcmVjdC5sZWZ0KSAvIChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSkgKiAyIC0gMTtcbiAgICB0aGlzLm1vdXNlLnkgPSAtKCh5IC0gcmVjdC50b3ApIC8gKHJlY3QuYm90dG9tIC0gcmVjdC50b3ApKSAqIDIgKyAxO1xuXG4gICAgdGhpcy5wcm9qZWN0aW9uUGxhbmUubm9ybWFsLmNvcHkodGhpcy5jYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24oKSk7XG5cbiAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKHRoaXMubW91c2UsIHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLmVtaXQoJ21vdmUnKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdtb3VzZScpO1xuICAgIG1hbmFnZXIucmVxdWlyZSgnZXZlbnRzJywgKCkgPT4gbmV3IEV2ZW50c1BhdGNoTW9kdWxlKCkpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgW1xuICAgICAgJ2NsaWNrJyxcbiAgICAgICdtb3VzZWRvd24nLFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgJ21vdXNlbW92ZSdcbiAgICBdLmZvckVhY2goZXYgPT4gdGhpcy5vbihldiwgZSA9PiBzZWxmLmVtaXQoZXYsIGUpKSk7XG5cbiAgICBzZWxmLmdsb2JhbFggPSAwO1xuICAgIHNlbGYuZ2xvYmFsWSA9IDA7XG5cbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2VsZi5nbG9iYWxYICs9IGUubW92ZW1lbnRYO1xuICAgICAgICBzZWxmLmdsb2JhbFkgKz0gZS5tb3ZlbWVudFk7XG5cbiAgICAgICAgc2VsZi51cGRhdGUoZSwgc2VsZi5nbG9iYWxYLCBzZWxmLmdsb2JhbFkpO1xuICAgICAgfSBlbHNlIHNlbGYudXBkYXRlKGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdHJhY2soY29tcG9uZW50KSB7XG4gICAgbGV0IGlzSG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5vbignbW92ZScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhvdmVycyhjb21wb25lbnQpKSB7XG4gICAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZW1vdmUnKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29tcG9uZW50LmVtaXQoJ21vdXNlb3ZlcicpO1xuICAgICAgICAgIGlzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNIb3ZlcmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC5lbWl0KCdtb3VzZW91dCcpO1xuICAgICAgICBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ2NsaWNrJyk7XG4gICAgICBlbHNlIGNvbXBvbmVudC5lbWl0KCdvZmZDbGljaycpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNlZG93bicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZXVwJyk7XG4gICAgfSk7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oY29tcG9uZW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdChjb21wb25lbnQubmF0aXZlKTtcbiAgfVxuXG4gIHByb2plY3QocGxhbmUgPSB0aGlzLnByb2plY3Rpb25QbGFuZSkge1xuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5yYXkuaW50ZXJzZWN0UGxhbmUocGxhbmUpO1xuICB9XG5cbiAgaG92ZXJzKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IHRoaXMuaW50ZXJzZWN0aW9uKGNvbXBvbmVudClbMF07XG4gICAgcmV0dXJuIGludGVyc2VjdGlvbiA/IGludGVyc2VjdGlvbi5vYmplY3QgPT09IGNvbXBvbmVudC5uYXRpdmUgOiBmYWxzZTtcbiAgfVxuXG4gIGdldCByYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLnJheTtcbiAgfVxuXG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlLng7XG4gIH1cblxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5tb3VzZS55O1xuICB9XG59XG4iLCJpbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5pbXBvcnQge0V2ZW50c1BhdGNoTW9kdWxlfSBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xzTW9kdWxlIHtcbiAgc3RhdGljIGZyb20oY29udHJvbHMpIHtcbiAgICByZXR1cm4gbmV3IENvbnRyb2xzTW9kdWxlKHtjb250cm9sc30pO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY29udHJvbHM6IGZhbHNlLFxuICAgICAgZml4OiBjb250cm9scyA9PiBjb250cm9scyxcblxuICAgICAgdXBkYXRlKGMpIHtcbiAgICAgICAgdGhpcy5jb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICAgIH1cbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5jb250cm9scyA9IHRoaXMucGFyYW1zLmNvbnRyb2xzO1xuICAgIHRoaXMudXBkYXRlID0gdGhpcy5wYXJhbXMudXBkYXRlO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5yZXF1aXJlKCdldmVudHMnLCAoKSA9PiBuZXcgRXZlbnRzUGF0Y2hNb2R1bGUoKSk7XG4gIH1cblxuICBzZXRDb250cm9scyhjb250cm9scykge1xuICAgIHRoaXMuY29udHJvbHMgPSBjb250cm9scztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFVwZGF0ZSh1cGRhdGUpIHtcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi51cGRhdGVMb29wID0gbmV3IExvb3Aoc2VsZi51cGRhdGUuYmluZChzZWxmKSk7XG4gICAgc2VsZi51cGRhdGVMb29wLnN0YXJ0KHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBGb2dFeHAyLFxuICBGb2dcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBGb2dNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2NvbG9yOiAweGVmZDFiNSwgZGVuc2l0eTogMC4wMjAsIG5lYXI6IDEwLCBmYXI6IDEwMDB9XSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbdHlwZT1leHAyXSAtIFRoZSB0eXBlIG9mIGZvZyAtIGV4cDIgb3IgbGluZWFyXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Ib3cgdG8gY3JlYXRlIGFuZCBhcHBseSBhIEZvZ01vZHVsZTwvY2FwdGlvbj5cbiAqIGNvbnN0IGZvZ01vZHVsZSA9IG5ldyBGb2dNb2R1bGUoe1xuICogICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgZGVuc2l0eTogMC4wMyxcbiAqICAgIG5lYXI6IDIwLFxuICogICAgZmFyOiAyMDBcbiAqICB9LCAnZXhwMicpO1xuICpcbiAqIG5ldyBBcHAoW1xuICogIC4uLixcbiAqICBmb2dNb2R1bGVcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRm9nTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIHR5cGUpIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY29sb3I6IDB4ZWZkMWI1LFxuICAgICAgZGVuc2l0eTogMC4wMjAsXG4gICAgICBuZWFyOiAxMCxcbiAgICAgIGZhcjogMTAwMFxuICAgIH0sIHBhcmFtcyk7XG4gICAgaWYgKCF0eXBlIHx8IHR5cGUgPT09ICdleHAyJykgdGhpcy5mb2cgPSBuZXcgRm9nRXhwMih0aGlzLnBhcmFtcy5jb2xvciwgdGhpcy5wYXJhbXMuZGVuc2l0eSk7XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ2xpbmVhcicpIHRoaXMuZm9nID0gbmV3IEZvZyh0aGlzLnBhcmFtcy5jb2xvciwgdGhpcy5wYXJhbXMubmVhciwgdGhpcy5wYXJhbXMuZmFyKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdmb2cnLCB0aGlzLmZvZyk7XG4gICAgbWFuYWdlci5nZXQoJ3NjZW5lJykuZm9nID0gdGhpcy5mb2c7XG4gIH1cbn1cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4JztcblxuY29uc3QgaXNFcXVhbERlZmF1bHQgPSAoYSwgYikgPT4ge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYgKGEgJiYgYS5lcXVhbHMgJiYgYS5lcXVhbHMoYikpIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQGNsYXNzIFN0YXRlTW9kdWxlXG4gKiBAZGVzY3JpcHRpb24gYFN0YXRlTW9kdWxlYCBpcyB1c2VmdWwgZm9yIGFwcHMsIHdoZXJlIHlvdSBuZWVkIHN0YXRlIG1hbmlwdWxhdGlvbi5cbiAqIFRoaXMgY2FuIGJlOiBfdHJhbnNpdGlvbnMgYmV0d2VlbiBzY3JlZW5zLCBnYW1lcywgZGV2ZWxvcG1lbnQgbW9tZW50c18uXG4gKiBZb3UgY2FuIGNoZWNrIFtiYXNpYy9zdGF0ZV0oaHR0cHM6Ly93aHMtZGV2LnN1cmdlLnNoL2V4YW1wbGVzLz9iYXNpYy9zdGF0ZSkgZXhhbXBsZS5cbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSBzdGF0ZSBtb2R1bGU8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgLy8gLi4uXG4gKiAgIG5ldyBTdGF0ZU1vZHVsZSgpLmRlZmF1bHQoe1xuICogICAgIHNwaGVyZUNvbG9yOiAweGZmMDAwMFxuICogICB9KVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0ZU1vZHVsZSB7XG4gIHN0YXRpYyBhY3Rpb25HZW5lcmF0ZShpc0VxdWFsKSB7XG4gICAgcmV0dXJuIChzdGF0ZSA9IFt7fSwgJyddLCB7a2V5LCBkYXRhfSkgPT4ge1xuICAgICAgaWYgKGlzRXF1YWwoc3RhdGVbMF1ba2V5XSwgZGF0YSkpIHJldHVybiBzdGF0ZTtcblxuICAgICAgc3RhdGVbMF1ba2V5XSA9IGRhdGE7XG4gICAgICBzdGF0ZVsxXSA9IGtleTtcblxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlcXVhbENoZWNrID0gaXNFcXVhbERlZmF1bHQpIHtcbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgICBTdGF0ZU1vZHVsZS5hY3Rpb25HZW5lcmF0ZShlcXVhbENoZWNrKVxuICAgICk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICB0aGlzLmN1cnJlbnRDb25maWcgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5wcmV2Q29uZmlnID0gJ2RlZmF1bHQnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmYXVsdFxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBzZXR1cFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIG5ldyBXSFMuU3RhdGVNb2R1bGUoKS5kZWZhdWx0KHtcbiAgICogICBzcGhlcmVDb2xvcjogVVRJTFMuJGNvbG9ycy5tZXNoLFxuICAgKiAgIHBsYW5lQ29sb3I6IDB4NDQ3RjhCXG4gICAqIH0pXG4gICAqL1xuICBkZWZhdWx0KGRhdGEpIHtcbiAgICB0aGlzLmNvbmZpZyh7ZGVmYXVsdDogZGF0YX0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0RXF1YWxDaGVja1xuICAgKiBAZGVzY3JpcHRpb24gU2V0cyBhbiBlcXVhbENoZWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbmZpZ3VyYXRpb24gc2V0dXBcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgc2V0RXF1YWxDaGVjayhmdW5jKSB7XG4gICAgdGhpcy5zdG9yZS5yZXBsYWNlUmVkdWNlcihcbiAgICAgIFN0YXRlTW9kdWxlLmFjdGlvbkdlbmVyYXRlKGZ1bmMpXG4gICAgKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdzdGF0ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29uZmlnXG4gICAqIEBkZXNjcmlwdGlvbiBMb2FkIGNvbmZpZ3VyYXRpb25zIGZyb20gb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlncyBDb25maWd1cmF0aW9uIGRhdGFcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQWRkaW5nIGBncmVlbmAgY29uZmlndXJhdGlvbjwvY2FwdGlvbj5cbiAgICogc3RhdGUuY29uZmlnKHtcbiAgICogICBncmVlbjoge1xuICAgKiAgICAgc3BoZXJlQ29sb3I6IDB4MDBmZjAwLFxuICAgKiAgICAgcGxhbmVDb2xvcjogMHgwMGZmMDBcbiAgICogICB9XG4gICAqIH0pO1xuICAgKi9cbiAgY29uZmlnKGNvbmZpZ3MpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWdzKSB7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbltrZXldID0ga2V5ID09PSAnZGVmYXVsdCdcbiAgICAgICAgICA/IGNvbmZpZ3Nba2V5XVxuICAgICAgICAgIDogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHQsIGNvbmZpZ3Nba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBMb2FkIHVwZGF0ZXMgZnJvbSBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB1cGRhdGVzIFVwZGF0ZXMgZGF0YVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBVcGRhdGUgY2FsbGJhY2sgZm9yIGBzcGhlcmVDb2xvcmA8L2NhcHRpb24+XG4gICAqIHN0YXRlLnVwZGF0ZSh7XG4gICAqICAgc3BoZXJlQ29sb3I6IGNvbG9yID0+IHNwaGVyZS5tYXRlcmlhbC5jb2xvci5zZXRIZXgoY29sb3IpXG4gICAqIH0pO1xuICAgKi9cbiAgdXBkYXRlKHVwZGF0ZXMgPSB7fSkge1xuICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IFtkYXRhLCBjaGFuZ2VkS2V5XSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdXBkYXRlc1tjaGFuZ2VkS2V5XTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhW2NoYW5nZWRLZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHRvXG4gICAqIEBkZXNjcmlwdGlvbiBTd2l0Y2ggdG8gY29uZmlndXJhdGlvbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZ05hbWUgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBDaGFuZ2VzIGNvbmZpZ3VyYXRpb24gdG8gYGdyZWVuYDwvY2FwdGlvbj5cbiAgICogc3RhdGUudG8oJ2dyZWVuJyk7XG4gICAqL1xuICB0byhjb25maWdOYW1lKSB7XG4gICAgdGhpcy5wcmV2Q29uZmlnID0gdGhpcy5jdXJyZW50Q29uZmlnO1xuICAgIHRoaXMuY3VycmVudENvbmZpZyA9IGNvbmZpZ05hbWU7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgID8gdGhpcy5jb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdXG4gICAgICA6IHRoaXMuY29uZmlndXJhdGlvbi5kZWZhdWx0O1xuXG4gICAgdGhpcy5zZXQoY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IGN1cnJlbnQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIHN0YXRlLnNldCh7XG4gICAqICAgc3BoZXJlQ29sb3I6IDB4MDBmZjAwXG4gICAqIH0pO1xuICAgKi9cbiAgc2V0KGRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKVxuICAgICAgaWYgKGtleSkgdGhpcy5zdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0FERCcsIGtleSwgZGF0YTogZGF0YVtrZXldfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiBkYXRhIG9mIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBQYXJhbWV0ZXIgbmFtZS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZVxuICAgKiBzdGF0ZS5nZXQoJ3NwaGVyZUNvbG9yJyk7IC8vIDB4MDBmZjAwXG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcHJldlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGB0cnVlVmFsYCBpZiBgY29uZmlnYCBtYXRjaCBwcmV2aW91cyBjb25maWd1cmF0aW9uLCBpbiBvdGhlciBjYXNlIC0gcmV0dXJuIGBmYWxzZVZhbGAuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge0FueX0gdHJ1ZVZhbCBWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgdHJ1dGh5LlxuICAgKiBAcGFyYW0ge0FueX0gZmFsc2VWYWwgQ1ZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyBmYWxzeS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgcHJldihjb25maWcsIHRydWVWYWwsIGZhbHNlVmFsKSB7XG4gICAgcmV0dXJuIHRoaXMucHJldkNvbmZpZyA9PT0gY29uZmlnID8gdHJ1ZVZhbCA6IGZhbHNlVmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY3VycmVudFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGB0cnVlVmFsYCBpZiBgY29uZmlnYCBtYXRjaCBjdXJyZW50IGNvbmZpZ3VyYXRpb24sIGluIG90aGVyIGNhc2UgLSByZXR1cm4gYGZhbHNlVmFsYC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZyBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7QW55fSB0cnVlVmFsIFZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyB0cnV0aHkuXG4gICAqIEBwYXJhbSB7QW55fSBmYWxzZVZhbCBDVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIGZhbHN5LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBjdXJyZW50KGNvbmZpZywgdHJ1ZVZhbCwgZmFsc2VWYWwpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q29uZmlnID09PSBjb25maWcgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIE1PVVNFLFxuICBRdWF0ZXJuaW9uLFxuICBTcGhlcmljYWwsXG4gIFZlY3RvcjIsXG4gIFBlcnNwZWN0aXZlQ2FtZXJhLFxuICBPcnRob2dyYXBoaWNDYW1lcmEsXG4gIEV2ZW50RGlzcGF0Y2hlcixcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbi8vIFRoaXMgc2V0IG9mIGNvbnRyb2xzIHBlcmZvcm1zIG9yYml0aW5nLCBkb2xseWluZyAoem9vbWluZyksIGFuZCBwYW5uaW5nLlxuLy8gVW5saWtlIFRyYWNrYmFsbENvbnRyb2xzLCBpdCBtYWludGFpbnMgdGhlIFwidXBcIiBkaXJlY3Rpb24gb2JqZWN0LnVwICgrWSBieSBkZWZhdWx0KS5cbi8vXG4vLyAgICBPcmJpdCAtIGxlZnQgbW91c2UgLyB0b3VjaDogb25lIGZpbmdlciBtb3ZlXG4vLyAgICBab29tIC0gbWlkZGxlIG1vdXNlLCBvciBtb3VzZXdoZWVsIC8gdG91Y2g6IHR3byBmaW5nZXIgc3ByZWFkIG9yIHNxdWlzaFxuLy8gICAgUGFuIC0gcmlnaHQgbW91c2UsIG9yIGFycm93IGtleXMgLyB0b3VjaDogdGhyZWUgZmludGVyIHN3aXBlXG5cbmV4cG9ydCBjbGFzcyBUaHJlZU9yYml0Q29udHJvbHMgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcihvYmplY3QsIGRvbUVsZW1lbnQsIGV2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IChkb21FbGVtZW50ID09PSB1bmRlZmluZWQpID8gZG9jdW1lbnQgOiBkb21FbGVtZW50O1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gZXZlbnRIYW5kbGVyO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIC8vIFwidGFyZ2V0XCIgc2V0cyB0aGUgbG9jYXRpb24gb2YgZm9jdXMsIHdoZXJlIHRoZSBvYmplY3Qgb3JiaXRzIGFyb3VuZFxuICAgIHRoaXMudGFyZ2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBkb2xseSBpbiBhbmQgb3V0ICggUGVyc3BlY3RpdmVDYW1lcmEgb25seSApXG4gICAgdGhpcy5taW5EaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIHpvb20gaW4gYW5kIG91dCAoIE9ydGhvZ3JhcGhpY0NhbWVyYSBvbmx5IClcbiAgICB0aGlzLm1pblpvb20gPSAwO1xuICAgIHRoaXMubWF4Wm9vbSA9IEluZmluaXR5O1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IHZlcnRpY2FsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgLy8gUmFuZ2UgaXMgMCB0byBNYXRoLlBJIHJhZGlhbnMuXG4gICAgdGhpcy5taW5Qb2xhckFuZ2xlID0gMDsgLy8gcmFkaWFuc1xuICAgIHRoaXMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEk7IC8vIHJhZGlhbnNcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBvcmJpdCBob3Jpem9udGFsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgLy8gSWYgc2V0LCBtdXN0IGJlIGEgc3ViLWludGVydmFsIG9mIHRoZSBpbnRlcnZhbCBbIC0gTWF0aC5QSSwgTWF0aC5QSSBdLlxuICAgIHRoaXMubWluQXppbXV0aEFuZ2xlID0gLUluZmluaXR5OyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhBemltdXRoQW5nbGUgPSBJbmZpbml0eTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gZW5hYmxlIGRhbXBpbmcgKGluZXJ0aWEpXG4gICAgLy8gSWYgZGFtcGluZyBpcyBlbmFibGVkLCB5b3UgbXVzdCBjYWxsIGNvbnRyb2xzLnVwZGF0ZSgpIGluIHlvdXIgYW5pbWF0aW9uIGxvb3BcbiAgICB0aGlzLmVuYWJsZURhbXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSAwLjI1O1xuXG4gICAgLy8gVGhpcyBvcHRpb24gYWN0dWFsbHkgZW5hYmxlcyBkb2xseWluZyBpbiBhbmQgb3V0OyBsZWZ0IGFzIFwiem9vbVwiIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB6b29taW5nXG4gICAgdGhpcy5lbmFibGVab29tID0gdHJ1ZTtcbiAgICB0aGlzLnpvb21TcGVlZCA9IDEuMDtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHJvdGF0aW5nXG4gICAgdGhpcy5lbmFibGVSb3RhdGUgPSB0cnVlO1xuICAgIHRoaXMucm90YXRlU3BlZWQgPSAxLjA7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSBwYW5uaW5nXG4gICAgdGhpcy5lbmFibGVQYW4gPSB0cnVlO1xuICAgIHRoaXMua2V5UGFuU3BlZWQgPSA3LjA7IC8vIHBpeGVscyBtb3ZlZCBwZXIgYXJyb3cga2V5IHB1c2hcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgcm90YXRlIGFyb3VuZCB0aGUgdGFyZ2V0XG4gICAgLy8gSWYgYXV0by1yb3RhdGUgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG4gICAgdGhpcy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgdGhpcy5hdXRvUm90YXRlU3BlZWQgPSAyLjA7IC8vIDMwIHNlY29uZHMgcGVyIHJvdW5kIHdoZW4gZnBzIGlzIDYwXG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB1c2Ugb2YgdGhlIGtleXNcbiAgICB0aGlzLmVuYWJsZUtleXMgPSB0cnVlO1xuXG4gICAgLy8gVGhlIGZvdXIgYXJyb3cga2V5c1xuICAgIHRoaXMua2V5cyA9IHtMRUZUOiAzNywgVVA6IDM4LCBSSUdIVDogMzksIEJPVFRPTTogNDB9O1xuXG4gICAgLy8gTW91c2UgYnV0dG9uc1xuICAgIHRoaXMubW91c2VCdXR0b25zID0ge09SQklUOiBNT1VTRS5MRUZULCBaT09NOiBNT1VTRS5NSURETEUsIFBBTjogTU9VU0UuUklHSFR9O1xuXG4gICAgLy8gZm9yIHJlc2V0XG4gICAgdGhpcy50YXJnZXQwID0gdGhpcy50YXJnZXQuY2xvbmUoKTtcbiAgICB0aGlzLnBvc2l0aW9uMCA9IHRoaXMub2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG4gICAgdGhpcy56b29tMCA9IHRoaXMub2JqZWN0Lnpvb207XG5cbiAgICAvL1xuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy9cblxuICAgIHRoaXMuZ2V0UG9sYXJBbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBzcGhlcmljYWwucGhpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEF6aW11dGhhbEFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC50aGV0YTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNldCA9ICgpID0+IHtcbiAgICAgIHRoaXMudGFyZ2V0LmNvcHkodGhpcy50YXJnZXQwKTtcbiAgICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLmNvcHkodGhpcy5wb3NpdGlvbjApO1xuICAgICAgdGhpcy5vYmplY3Quem9vbSA9IHRoaXMuem9vbTA7XG5cbiAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgLy8gdGhpcyBtZXRob2QgaXMgZXhwb3NlZCwgYnV0IHBlcmhhcHMgaXQgd291bGQgYmUgYmV0dGVyIGlmIHdlIGNhbiBtYWtlIGl0IHByaXZhdGUuLi5cbiAgICB0aGlzLnVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIC8vIHNvIGNhbWVyYS51cCBpcyB0aGUgb3JiaXQgYXhpc1xuICAgICAgY29uc3QgcXVhdCA9IG5ldyBRdWF0ZXJuaW9uKCkuc2V0RnJvbVVuaXRWZWN0b3JzKG9iamVjdC51cCwgbmV3IFZlY3RvcjMoMCwgMSwgMCkpO1xuICAgICAgY29uc3QgcXVhdEludmVyc2UgPSBxdWF0LmNsb25lKCkuaW52ZXJzZSgpO1xuXG4gICAgICBjb25zdCBsYXN0UG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xuICAgICAgY29uc3QgbGFzdFF1YXRlcm5pb24gPSBuZXcgUXVhdGVybmlvbigpO1xuXG4gICAgICByZXR1cm4gKCgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm9iamVjdC5wb3NpdGlvbjtcblxuICAgICAgICBvZmZzZXQuY29weShwb3NpdGlvbikuc3ViKHRoaXMudGFyZ2V0KTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IHRvIFwieS1heGlzLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0KTtcblxuICAgICAgICAvLyBhbmdsZSBmcm9tIHotYXhpcyBhcm91bmQgeS1heGlzXG4gICAgICAgIHNwaGVyaWNhbC5zZXRGcm9tVmVjdG9yMyhvZmZzZXQpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9Sb3RhdGUgJiYgc3RhdGUgPT09IFNUQVRFLk5PTkUpXG4gICAgICAgICAgcm90YXRlTGVmdChnZXRBdXRvUm90YXRpb25BbmdsZSgpKTtcblxuICAgICAgICBzcGhlcmljYWwudGhldGEgKz0gc3BoZXJpY2FsRGVsdGEudGhldGE7XG4gICAgICAgIHNwaGVyaWNhbC5waGkgKz0gc3BoZXJpY2FsRGVsdGEucGhpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHRoZXRhIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnRoZXRhID0gTWF0aC5tYXgodGhpcy5taW5BemltdXRoQW5nbGUsIE1hdGgubWluKHRoaXMubWF4QXppbXV0aEFuZ2xlLCBzcGhlcmljYWwudGhldGEpKTtcblxuICAgICAgICAvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwucGhpID0gTWF0aC5tYXgodGhpcy5taW5Qb2xhckFuZ2xlLCBNYXRoLm1pbih0aGlzLm1heFBvbGFyQW5nbGUsIHNwaGVyaWNhbC5waGkpKTtcblxuICAgICAgICBzcGhlcmljYWwubWFrZVNhZmUoKTtcblxuICAgICAgICBzcGhlcmljYWwucmFkaXVzICo9IHNjYWxlO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHJhZGl1cyB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC5yYWRpdXMgPSBNYXRoLm1heCh0aGlzLm1pbkRpc3RhbmNlLCBNYXRoLm1pbih0aGlzLm1heERpc3RhbmNlLCBzcGhlcmljYWwucmFkaXVzKSk7XG5cbiAgICAgICAgLy8gbW92ZSB0YXJnZXQgdG8gcGFubmVkIGxvY2F0aW9uXG4gICAgICAgIHRoaXMudGFyZ2V0LmFkZChwYW5PZmZzZXQpO1xuXG4gICAgICAgIG9mZnNldC5zZXRGcm9tU3BoZXJpY2FsKHNwaGVyaWNhbCk7XG5cbiAgICAgICAgLy8gcm90YXRlIG9mZnNldCBiYWNrIHRvIFwiY2FtZXJhLXVwLXZlY3Rvci1pcy11cFwiIHNwYWNlXG4gICAgICAgIG9mZnNldC5hcHBseVF1YXRlcm5pb24ocXVhdEludmVyc2UpO1xuXG4gICAgICAgIHBvc2l0aW9uLmNvcHkodGhpcy50YXJnZXQpLmFkZChvZmZzZXQpO1xuXG4gICAgICAgIHRoaXMub2JqZWN0Lmxvb2tBdCh0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlRGFtcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhICo9ICgxIC0gdGhpcy5kYW1waW5nRmFjdG9yKTtcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS5waGkgKj0gKDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS5zZXQoMCwgMCwgMCk7XG5cbiAgICAgICAgc2NhbGUgPSAxO1xuICAgICAgICBwYW5PZmZzZXQuc2V0KDAsIDAsIDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBjb25kaXRpb24gaXM6XG4gICAgICAgIC8vIG1pbihjYW1lcmEgZGlzcGxhY2VtZW50LCBjYW1lcmEgcm90YXRpb24gaW4gcmFkaWFucyleMiA+IEVQU1xuICAgICAgICAvLyB1c2luZyBzbWFsbC1hbmdsZSBhcHByb3hpbWF0aW9uIGNvcyh4LzIpID0gMSAtIHheMiAvIDhcblxuICAgICAgICBpZiAoem9vbUNoYW5nZWRcbiAgICAgICAgICB8fCBsYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQodGhpcy5vYmplY3QucG9zaXRpb24pID4gRVBTXG4gICAgICAgICAgfHwgOCAqICgxIC0gbGFzdFF1YXRlcm5pb24uZG90KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pKSA+IEVQUykge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cbiAgICAgICAgICBsYXN0UG9zaXRpb24uY29weSh0aGlzLm9iamVjdC5wb3NpdGlvbik7XG4gICAgICAgICAgbGFzdFF1YXRlcm5pb24uY29weSh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKTtcbiAgICAgICAgICB6b29tQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KSgpO1xuICAgIH07XG5cbiAgICB0aGlzLmRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51LCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIG9uTW91c2VXaGVlbCwgZmFsc2UpO1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAgIC8vIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZGlzcG9zZScgfSApOyAvLyBzaG91bGQgdGhpcyBiZSBhZGRlZCBoZXJlP1xuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGludGVybmFsc1xuICAgIC8vXG5cbiAgICBjb25zdCBjaGFuZ2VFdmVudCA9IHt0eXBlOiAnY2hhbmdlJ307XG4gICAgY29uc3Qgc3RhcnRFdmVudCA9IHt0eXBlOiAnc3RhcnQnfTtcbiAgICBjb25zdCBlbmRFdmVudCA9IHt0eXBlOiAnZW5kJ307XG5cbiAgICBjb25zdCBTVEFURSA9IHtOT05FOiAtMSwgUk9UQVRFOiAwLCBET0xMWTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX0RPTExZOiA0LCBUT1VDSF9QQU46IDV9O1xuXG4gICAgbGV0IHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgIGNvbnN0IEVQUyA9IDAuMDAwMDAxO1xuXG4gICAgLy8gY3VycmVudCBwb3NpdGlvbiBpbiBzcGhlcmljYWwgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBzcGhlcmljYWwgPSBuZXcgU3BoZXJpY2FsKCk7XG4gICAgY29uc3Qgc3BoZXJpY2FsRGVsdGEgPSBuZXcgU3BoZXJpY2FsKCk7XG5cbiAgICBsZXQgc2NhbGUgPSAxO1xuICAgIGNvbnN0IHBhbk9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG4gICAgbGV0IHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBjb25zdCByb3RhdGVTdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3Qgcm90YXRlRW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVEZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBwYW5TdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgcGFuRW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5EZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBkb2xseVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBkb2xseUVuZCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlEZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBnZXRBdXRvUm90YXRpb25BbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiAyICogTWF0aC5QSSAvIDYwIC8gNjAgKiB0aGlzLmF1dG9Sb3RhdGVTcGVlZDtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Wm9vbVNjYWxlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGgucG93KDAuOTUsIHRoaXMuem9vbVNwZWVkKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgcm90YXRlTGVmdCA9IGFuZ2xlID0+IHtcbiAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhIC09IGFuZ2xlO1xuICAgIH07XG5cbiAgICBjb25zdCByb3RhdGVVcCA9IGFuZ2xlID0+IHtcbiAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAtPSBhbmdsZTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFuTGVmdCA9ICgoKSA9PiB7XG4gICAgICBjb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkaXN0YW5jZSwgb2JqZWN0TWF0cml4KSA9PiB7XG4gICAgICAgIHYuc2V0RnJvbU1hdHJpeENvbHVtbihvYmplY3RNYXRyaXgsIDApOyAvLyBnZXQgWCBjb2x1bW4gb2Ygb2JqZWN0TWF0cml4XG4gICAgICAgIHYubXVsdGlwbHlTY2FsYXIoLWRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHBhblVwID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRpc3RhbmNlLCBvYmplY3RNYXRyaXgpID0+IHtcbiAgICAgICAgdi5zZXRGcm9tTWF0cml4Q29sdW1uKG9iamVjdE1hdHJpeCwgMSk7IC8vIGdldCBZIGNvbHVtbiBvZiBvYmplY3RNYXRyaXhcbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XG4gICAgICAgIHBhbk9mZnNldC5hZGQodik7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICAvLyBkZWx0YVggYW5kIGRlbHRhWSBhcmUgaW4gcGl4ZWxzOyByaWdodCBhbmQgZG93biBhcmUgcG9zaXRpdmVcbiAgICBjb25zdCBwYW4gPSAoKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkZWx0YVgsIGRlbHRhWSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gcGVyc3BlY3RpdmVcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuICAgICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO1xuICAgICAgICAgIGxldCB0YXJnZXREaXN0YW5jZSA9IG9mZnNldC5sZW5ndGgoKTtcblxuICAgICAgICAgIC8vIGhhbGYgb2YgdGhlIGZvdiBpcyBjZW50ZXIgdG8gdG9wIG9mIHNjcmVlblxuICAgICAgICAgIHRhcmdldERpc3RhbmNlICo9IE1hdGgudGFuKCh0aGlzLm9iamVjdC5mb3YgLyAyKSAqIE1hdGguUEkgLyAxODAuMCk7XG5cbiAgICAgICAgICAvLyB3ZSBhY3R1YWxseSBkb24ndCB1c2Ugc2NyZWVuV2lkdGgsIHNpbmNlIHBlcnNwZWN0aXZlIGNhbWVyYSBpcyBmaXhlZCB0byBzY3JlZW4gaGVpZ2h0XG4gICAgICAgICAgcGFuTGVmdCgyICogZGVsdGFYICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcCgyICogZGVsdGFZICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0NhbWVyYSkge1xuICAgICAgICAgIC8vIG9ydGhvZ3JhcGhpY1xuICAgICAgICAgIHBhbkxlZnQoZGVsdGFYICogKHRoaXMub2JqZWN0LnJpZ2h0IC0gdGhpcy5vYmplY3QubGVmdCkgLyB0aGlzLm9iamVjdC56b29tIC8gZWxlbWVudC5jbGllbnRXaWR0aCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcChkZWx0YVkgKiAodGhpcy5vYmplY3QudG9wIC0gdGhpcy5vYmplY3QuYm90dG9tKSAvIHRoaXMub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjYW1lcmEgbmVpdGhlciBvcnRob2dyYXBoaWMgbm9yIHBlcnNwZWN0aXZlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzTW9kdWxlLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBwYW4gZGlzYWJsZWQuJyk7XG4gICAgICAgICAgdGhpcy5lbmFibGVQYW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgZG9sbHlJbiA9IGRvbGx5U2NhbGUgPT4ge1xuICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpXG4gICAgICAgIHNjYWxlIC89IGRvbGx5U2NhbGU7XG5cbiAgICAgIGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSBNYXRoLm1heCh0aGlzLm1pblpvb20sIE1hdGgubWluKHRoaXMubWF4Wm9vbSwgdGhpcy5vYmplY3Quem9vbSAqIGRvbGx5U2NhbGUpKTtcbiAgICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICB6b29tQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyk7XG4gICAgICAgIHRoaXMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBkb2xseU91dCA9IGRvbGx5U2NhbGUgPT4ge1xuICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpXG4gICAgICAgIHNjYWxlICo9IGRvbGx5U2NhbGU7XG5cbiAgICAgIGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSBNYXRoLm1heCh0aGlzLm1pblpvb20sIE1hdGgubWluKHRoaXMubWF4Wm9vbSwgdGhpcy5vYmplY3Quem9vbSAvIGRvbGx5U2NhbGUpKTtcbiAgICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICB6b29tQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyk7XG4gICAgICAgIHRoaXMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGV2ZW50IGNhbGxiYWNrcyAtIHVwZGF0ZSB0aGUgb2JqZWN0IHN0YXRlXG4gICAgLy9cblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93blJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVTdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93bkRvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25Eb2xseScgKTtcblxuICAgICAgZG9sbHlTdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93blBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duUGFuJyApO1xuXG4gICAgICBwYW5TdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZVJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgcm90YXRlVXAoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgcm90YXRlU3RhcnQuY29weShyb3RhdGVFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmVEb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlRG9sbHknICk7XG5cbiAgICAgIGRvbGx5RW5kLnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKGRvbGx5RW5kLCBkb2xseVN0YXJ0KTtcblxuICAgICAgaWYgKGRvbGx5RGVsdGEueSA+IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZVBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlUGFuJyApO1xuXG4gICAgICBwYW5FbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKHBhbkVuZCwgcGFuU3RhcnQpO1xuXG4gICAgICBwYW4ocGFuRGVsdGEueCwgcGFuRGVsdGEueSk7XG5cbiAgICAgIHBhblN0YXJ0LmNvcHkocGFuRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VVcCcgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VXaGVlbCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VXaGVlbCcgKTtcblxuICAgICAgaWYgKGV2ZW50LmRlbHRhWSA8IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZWxzZSBpZiAoZXZlbnQuZGVsdGFZID4gMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZUtleURvd24nICk7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIHRoaXMua2V5cy5VUDpcbiAgICAgICAgICBwYW4oMCwgdGhpcy5rZXlQYW5TcGVlZCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5CT1RUT006XG4gICAgICAgICAgcGFuKDAsIC10aGlzLmtleVBhblNwZWVkKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLkxFRlQ6XG4gICAgICAgICAgcGFuKHRoaXMua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuUklHSFQ6XG4gICAgICAgICAgcGFuKC10aGlzLmtleVBhblNwZWVkLCAwKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnRSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnRSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydERvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0RG9sbHknICk7XG5cbiAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuc2V0KDAsIGRpc3RhbmNlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydFBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydFBhbicgKTtcblxuICAgICAgcGFuU3RhcnQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZVJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlRW5kLnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICAgIHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMocm90YXRlRW5kLCByb3RhdGVTdGFydCk7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcbiAgICAgIHJvdGF0ZUxlZnQoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcbiAgICAgIHJvdGF0ZVVwKDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkocm90YXRlRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZURvbGx5JyApO1xuXG4gICAgICBjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICBkb2xseUVuZC5zZXQoMCwgZGlzdGFuY2UpO1xuXG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZG9sbHlTdGFydC5jb3B5KGRvbGx5RW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaE1vdmVQYW4nICk7XG5cbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCk7XG5cbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcblxuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaEVuZCA9ICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hFbmQnICk7XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gZXZlbnQgaGFuZGxlcnMgLSBGU006IGxpc3RlbiBmb3IgZXZlbnRzIGFuZCByZXNldCBzdGF0ZVxuICAgIC8vXG5cbiAgICBjb25zdCBvbk1vdXNlRG93biA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLk9SQklUKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25Sb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIHN0YXRlID0gU1RBVEUuUk9UQVRFO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLlpPT00pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25Eb2xseShldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5ET0xMWTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuYnV0dG9uID09PSB0aGlzLm1vdXNlQnV0dG9ucy5QQU4pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93blBhbihldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5QQU47XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuTk9ORSkge1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKHN0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZVJvdGF0ZShldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBTVEFURS5ET0xMWSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZURvbGx5KGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFNUQVRFLlBBTikge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlUGFuKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlTW91c2VVcChldmVudCk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVdoZWVsID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVab29tID09PSBmYWxzZSB8fCAoc3RhdGUgIT09IFNUQVRFLk5PTkUgJiYgc3RhdGUgIT09IFNUQVRFLlJPVEFURSkpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBoYW5kbGVNb3VzZVdoZWVsKGV2ZW50KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpOyAvLyBub3Qgc3VyZSB3aHkgdGhlc2UgYXJlIGhlcmUuLi5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlIHx8IHRoaXMuZW5hYmxlS2V5cyA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZUtleURvd24oZXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnRSb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkoZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ET0xMWTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydFBhbihldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1BBTjtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5OT05FKVxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX1JPVEFURSkgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZVJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9ET0xMWSkgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZURvbGx5KGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUEFOKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUGFuKGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaEVuZCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZVRvdWNoRW5kKGV2ZW50KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNvbnRleHRNZW51ID0gZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAgLy9cblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd3aGVlbCcsIG9uTW91c2VXaGVlbCwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuXG4gICAgLy8gZm9yY2UgYW4gdXBkYXRlIGF0IHN0YXJ0XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0IGNlbnRlcigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5jZW50ZXIgaGFzIGJlZW4gcmVuYW1lZCB0byAudGFyZ2V0Jyk7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0O1xuICB9XG5cbiAgZ2V0IG5vWm9vbSgpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVpvb207XG4gIH1cblxuICBzZXQgbm9ab29tKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9ab29tIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlWm9vbSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlWm9vbSA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub1JvdGF0ZSgpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1JvdGF0ZSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVJvdGF0ZSBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVSb3RhdGU7XG4gIH1cblxuICBzZXQgbm9Sb3RhdGUodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1JvdGF0ZSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVJvdGF0ZSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlUm90YXRlID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vUGFuKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUGFuIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUGFuIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVBhbjtcbiAgfVxuXG4gIHNldCBub1Bhbih2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUGFuIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUGFuIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVQYW4gPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9LZXlzKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vS2V5cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZUtleXMgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlS2V5cztcbiAgfVxuXG4gIHNldCBub0tleXModmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub0tleXMgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVLZXlzIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVLZXlzID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0YXRpY01vdmluZygpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5zdGF0aWNNb3ZpbmcgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVEYW1waW5nIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZURhbXBpbmc7XG4gIH1cblxuICBzZXQgc3RhdGljTW92aW5nKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuc3RhdGljTW92aW5nIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlRGFtcGluZyBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlRGFtcGluZyA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBkeW5hbWljRGFtcGluZ0ZhY3RvcigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5keW5hbWljRGFtcGluZ0ZhY3RvciBoYXMgYmVlbiByZW5hbWVkLiBVc2UgLmRhbXBpbmdGYWN0b3IgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gdGhpcy5kYW1waW5nRmFjdG9yO1xuICB9XG5cbiAgc2V0IGR5bmFtaWNEYW1waW5nRmFjdG9yKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuZHluYW1pY0RhbXBpbmdGYWN0b3IgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIC5kYW1waW5nRmFjdG9yIGluc3RlYWQuJyk7XG4gICAgdGhpcy5kYW1waW5nRmFjdG9yID0gdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7VmVjdG9yM30gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDb250cm9sc01vZHVsZX0gZnJvbSAnLi4vQ29udHJvbHNNb2R1bGUnO1xuXG5pbXBvcnQge1RocmVlT3JiaXRDb250cm9sc30gZnJvbSAnLi9saWIvVGhyZWVPcmJpdENvbnRyb2xzJztcblxuZXhwb3J0IGNsYXNzIE9yYml0Q29udHJvbHNNb2R1bGUgZXh0ZW5kcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBmb2xsb3c6IGZhbHNlLFxuICAgICAgb2JqZWN0OiBudWxsLFxuICAgICAgdGFyZ2V0OiBuZXcgVmVjdG9yMygwLCAwLCAwKVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBzdXBlci5tYW5hZ2VyKG1hbmFnZXIpO1xuXG4gICAgY29uc3Qge29iamVjdDogb2JqLCBmb2xsb3csIHRhcmdldH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBvYmplY3QgPSBvYmogPyBvYmoubmF0aXZlIDogbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZTtcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IFRocmVlT3JiaXRDb250cm9scyhcbiAgICAgIG9iamVjdCxcbiAgICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JyksXG4gICAgICBtYW5hZ2VyLmhhbmRsZXJcbiAgICApO1xuXG4gICAgY29uc3QgdXBkYXRlUHJvY2Vzc29yID0gZm9sbG93ID8gYyA9PiB7XG4gICAgICBjb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICAgIGNvbnRyb2xzLnRhcmdldC5jb3B5KHRhcmdldCk7XG4gICAgfSA6IGMgPT4ge1xuICAgICAgY29udHJvbHMudXBkYXRlKGMuZ2V0RGVsdGEoKSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0Q29udHJvbHMoY29udHJvbHMpO1xuICAgIHRoaXMuc2V0VXBkYXRlKHVwZGF0ZVByb2Nlc3Nvcik7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIGlmIChvYmopIHJldHVybjtcbiAgICAgICAgY29udHJvbHMub2JqZWN0ID0gY2FtZXJhLm5hdGl2ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRyb2xzLnRhcmdldC5jb3B5KHRhcmdldCk7XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvYXBwL2NvbnRyb2xzICovXG5leHBvcnQgKiBmcm9tICcuL09yYml0Q29udHJvbHNNb2R1bGUnO1xuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9hcHAgKi9cbmV4cG9ydCAqIGZyb20gJy4vRWxlbWVudE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1JlbmRlcmluZ01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1NjZW5lTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUmVzaXplTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUG9zdFByb2Nlc3Nvck1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1ZpcnR1YWxNb3VzZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29udHJvbHNNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Gb2dNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0ZU1vZHVsZSc7XG5cbi8vIGNvbnRyb2xzXG5leHBvcnQgKiBmcm9tICcuL2NvbnRyb2xzL2luZGV4JztcbiIsIi8qKlxuICogQGNsYXNzIER5bmFtaWNHZW9tZXRyeU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2F0dHJpYnV0ZXM6IGZhbHNlfV0gLSBwYXJhbXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhdGNoRXZlbnRzPXRydWVdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaFxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0dlb21ldHJ5TW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYXR0cmlidXRlczogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzZWxmLnBhcmFtcztcblxuICAgIHRoaXMuZ18gPSBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcbiAgICAgIGlmICh0aGlzLmJ1aWxkR2VvbWV0cnkpIHtcbiAgICAgICAgdGhpcy5uYXRpdmUuZ2VvbWV0cnkgPSB0aGlzLmJ1aWxkR2VvbWV0cnkoXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbXMoe2dlb21ldHJ5OiBwYXJhbXN9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAocGFyYW1zLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucGFyYW1zLmdlb21ldHJ5KSB7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgYGdfJHtrZXl9YCwge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmUuZ2VvbWV0cnkucGFyYW1ldGVyc1trZXldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLm5hdGl2ZS5nZW9tZXRyeSA9IHRoaXMuYnVpbGRHZW9tZXRyeSh0aGlzLnVwZGF0ZVBhcmFtcyh7Z2VvbWV0cnk6IHtba2V5XTogdmFsdWV9fSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUmVwZWF0V3JhcHBpbmcsXG4gIFVWTWFwcGluZyxcbiAgTmVhcmVzdEZpbHRlcixcbiAgTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyLFxuICBUZXh0dXJlTG9hZGVyLFxuICBWZWN0b3IyXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgbG9hZGVyID0gbmV3IFRleHR1cmVMb2FkZXIoKTtcblxuLyoqXG4gKiBAY2xhc3MgVGV4dHVyZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQGRlc2NyaXB0aW9uIEEgVGV4dHVyZU1vZHVsZSBjYW4gYmUgYXBwbGllZCB0byBhbnkgTWVzaCBvciBNb2RlbC5cbiAqIEBwYXJhbSB7QXJyYXl9IFt0ZXh0dXJlc10gLSBhcnJheSBvZiB0ZXh0dXJlIG9iamVjdHNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBpbnN0YW5jZS4gdXJsIHRha2VzIGEgcGF0aCwgb3IgYSBkYXRhIG9iamVjdC48L2NhcHRpb24+XG4gKiB2YXIgd29vZFRleHR1cmUgPSBuZXcgVGV4dHVyZU1vZHVsZSh7XG4gKiAgIHVybDogYCR7cHJvY2Vzcy5hc3NldHNQYXRofS90ZXh0dXJlcy93b29kLmpwZ2BcbiAqIH0pO1xuICogQGV4YW1wbGUgPGNhcHRpb24+TW9yZSBjb21wcmVoZW5zaXZlIGV4YW1wbGUsIHdvb2QgdGV4dHVyZSBhcHBsaWVkIHRvIGEgQm94LjwvY2FwdGlvbj5cbiAqIG5ldyBCb3goe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHdpZHRoOiAyLFxuICogICAgIGhlaWdodDogMixcbiAqICAgICBkZXB0aDogMlxuICogICB9LFxuICogICBtb2R1bGVzOiBbXG4gKiAgICAgbmV3IFRleHR1cmVNb2R1bGUoe1xuICogICAgICAgdXJsOiBgcGF0aC90by90ZXh0dXJlLmpwZ2AsXG4gKiAgICAgICByZXBlYXQ6IG5ldyBUSFJFRS5WZWN0b3IyKDEsIDEpIC8vIG9wdGlvbmFsXG4gKiAgICAgfSlcbiAqICAgXSxcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICogICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5leHBvcnQgY2xhc3MgVGV4dHVyZU1vZHVsZSB7XG4gIHN0YXRpYyBsb2FkKHVybCkge1xuICAgIHJldHVybiBuZXcgVGV4dHVyZU1vZHVsZSh7dXJsfSkudGV4dHVyZXNbMF1bMV07XG4gIH1cblxuICB0ZXh0dXJlcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKC4uLnRleHR1cmVzKSB7XG4gICAgdGV4dHVyZXMuZm9yRWFjaCgoe1xuICAgICAgdXJsLFxuICAgICAgdHlwZSA9ICdtYXAnLFxuICAgICAgb2Zmc2V0ID0gbmV3IFZlY3RvcjIoMCwgMCksXG4gICAgICByZXBlYXQgPSBuZXcgVmVjdG9yMigxLCAxKSxcbiAgICAgIHdyYXAgPSBSZXBlYXRXcmFwcGluZyxcbiAgICAgIG1hcHBpbmcgPSBVVk1hcHBpbmcsXG4gICAgICBmaXggPSB0ZXggPT4gdGV4XG4gICAgfSkgPT4ge1xuICAgICAgY29uc3QgdGV4dHVyZSA9IGxvYWRlci5sb2FkKHVybCk7XG5cbiAgICAgIGlmICh3cmFwLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IHdyYXBbMF07XG4gICAgICAgIHRleHR1cmUud3JhcFQgPSB3cmFwWzFdO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHRleHR1cmUud3JhcFMgPSB0ZXh0dXJlLndyYXBUID0gd3JhcDtcblxuICAgICAgdGV4dHVyZS5tYXBwaW5nID0gbWFwcGluZztcblxuICAgICAgdGV4dHVyZS5vZmZzZXQuY29weShvZmZzZXQpO1xuICAgICAgdGV4dHVyZS5yZXBlYXQuY29weShyZXBlYXQpO1xuXG4gICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IE5lYXJlc3RGaWx0ZXI7XG4gICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IExpbmVhck1pcE1hcExpbmVhckZpbHRlcjtcblxuICAgICAgdGhpcy50ZXh0dXJlcy5wdXNoKFt0eXBlLCBmaXgodGV4dHVyZSldKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtYXRlcmlhbChtYXRlcmlhbCwgc2VsZikge1xuICAgICAgc2VsZi50ZXh0dXJlcy5mb3JFYWNoKHRleHR1cmUgPT4ge1xuICAgICAgICBtYXRlcmlhbFt0ZXh0dXJlWzBdXSA9IHRleHR1cmVbMV07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQW5pbWF0aW9uTWl4ZXIsXG4gIEFuaW1hdGlvbkNsaXAsXG4gIENsb2NrXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG4vKipcbiAqIEBjbGFzcyBBbmltYXRpb25Nb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL21lc2hcbiAqIEBkZXNjcmlwdGlvbiBDb252ZW5pZW5jZSBtb2R1bGUgdGhhdCB3cmFwcyB0aGUgPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNtYW51YWwvaW50cm9kdWN0aW9uL0FuaW1hdGlvbi1zeXN0ZW0nPnRocmVlLmpzIGFuaW1hdGlvbiBzeXN0ZW08L2E+XG4gKiBAcGFyYW0ge0FwcH0gYXBwIC0gdGhlIGFwcFxuICogQHBhcmFtIHtCb29sZWFufSBbaXNEZWZlcnJlZD1mYWxzZV0gLSBzZXQgdG8gdHJ1ZSBpZiBhbmltYXRpb24gc2hvdWxkIG5vdCBzdGFydCBhdXRvbWF0aWNhbGx5XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17c3BlZWQ6IDF9XSAtIHRoZSBwYXJhbXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW5pbWF0aW9uIG1vZHVsZSBhbmQgcGxheSBhIGdpdmVuIGNsaXAgb2YgYW4gaW1wb3J0ZWQgbW9kZWw8L2NhcHRpb24+XG4gKiBjb25zdCBhbmltYXRpb25Nb2R1bGUgPSBuZXcgQW5pbWF0aW9uTW9kdWxlKGFwcCwgZmFsc2UsIHtcbiAqICAgc3BlZWQ6IDEuMiAvLyBzcGVlZCB1cCBhbmltYXRpb24gYnkgMjAlXG4gKiB9KTtcbiAqXG4gKiBuZXcgSW1wb3J0ZXIoe1xuICogICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFscykge1xuICogICAgIC8vIE92ZXJyaWRlIHBhcnNlIHRvIGdlbmVyYXRlIGEgc2tpbm5lZE1lc2gsIG5lZWRlZCBmb3Igc2tpbm5lZCBtb2RlbHNcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLlNraW5uZWRNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICogICB9LFxuICpcbiAqICAgdXJsOiBgcGF0aC90by9tb2RlbC5qc29uYCxcbiAqICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IHRydWUsXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAqICAgICBza2lubmluZzogdHJ1ZVxuICogICB9KSxcbiAqXG4gKiAgIG1vZHVsZXM6IFthbmltYXRpb25Nb2R1bGVdXG4gKiB9KS5hZGRUbyhhcHApLnRoZW4oKCkgPT4ge1xuICogICAvLyBhZGRpbmcgbW9kZWwgdG8gYXBwIHJldHVybnMgYSBwcm9taXNlLCBzbyBwaXBlIHRoZSBmdW5jdGlvbiB0byBraWNrIG9mZiB0aGUgYW5pbWF0aW9uIGNsaXBcbiAqICAgYW5pbWF0aW9uTW9kdWxlLnBsYXkoJ2NsaXBOYW1lJyk7XG4gKiB9KTtcbiAqL1xuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGFwcCwgaXNEZWZlcnJlZCwgcGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgc3BlZWQ6IDFcbiAgICB9LCBwYXJhbXMpO1xuICAgIHRoaXMuY2xvY2sgPSBuZXcgQ2xvY2soKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuaXNEZWZlcnJlZCA9IGlzRGVmZXJyZWQ7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwbGF5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUGxheXMgdGhlIGdpdmVuIGNsaXAgbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xpcE5hbWUgLSB0aGUgY2xpcCB0byBwbGF5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoLkFuaW1hdGlvbk1vZHVsZVxuICAgKi9cbiAgcGxheShjbGlwTmFtZSkge1xuICAgIGNvbnN0IGNsaXAgPSBBbmltYXRpb25DbGlwLmZpbmRCeU5hbWUodGhpcy5jbGlwcywgY2xpcE5hbWUpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMubWl4ZXIuY2xpcEFjdGlvbihjbGlwKTtcblxuICAgIGFjdGlvbi5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgdGhlIG1peGVyIChiZWluZyBjYWxsZWQgb24gZnJhbWUgYW5pbWF0aW9uIGxvb3ApXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoLkFuaW1hdGlvbk1vZHVsZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLm1peGVyKSB0aGlzLm1peGVyLnVwZGF0ZSh0aGlzLmNsb2NrLmdldERlbHRhKCkgKiB0aGlzLnBhcmFtcy5zcGVlZCk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYubG9vcCA9IG5ldyBMb29wKCgpID0+IHtcbiAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXNlbGYuaXNEZWZlcnJlZCkgc2VsZi5sb29wLnN0YXJ0KHNlbGYuYXBwKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdhbmltYXRpb24nKTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtZXNoKG1lc2gsIHNlbGYpIHtcbiAgICAgIG1lc2guZ2VvbWV0cnkuc2tlbGV0b24gPSBtZXNoLnNrZWxldG9uO1xuXG4gICAgICBzZWxmLm1peGVyID0gbmV3IEFuaW1hdGlvbk1peGVyKG1lc2guZ2VvbWV0cnkpO1xuICAgICAgc2VsZi5jbGlwcyA9IG1lc2guZ2VvbWV0cnkuYW5pbWF0aW9ucztcblxuICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL21lc2ggKi9cbmV4cG9ydCAqIGZyb20gJy4vRHluYW1pY0dlb21ldHJ5TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVGV4dHVyZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0FuaW1hdGlvbk1vZHVsZSc7XG4iLCIvKipcbiAqIEBjbGFzcyBEZWZpbmVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgRGVmaW5lTW9kdWxlIHdpdGggUGVyc3BlY3RpdmVDYW1lcmEgYXMgY2FtZXJhIG1vZHVsZSBhbmQgcGFzc2luZyBpdCB0byBBcHAncyBtb2R1bGVzPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIC8vIC4uLlxuICogICBuZXcgRGVmaW5lTW9kdWxlKCdjYW1lcmEnLCBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoKSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRGVmaW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KHRoaXMubmFtZSwgdGhpcy5kYXRhKTtcbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcyAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2FwcC9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL21lc2gvaW5kZXgnO1xuXG4vLyBtb2R1bGVzXG5leHBvcnQgKiBmcm9tICcuL0RlZmluZU1vZHVsZSc7XG4iLCJpbXBvcnQge0ltcG9ydGVyfSBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL0ltcG9ydGVyJztcbmltcG9ydCB7UGVyc3BlY3RpdmVDYW1lcmF9IGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhJztcblxuZXhwb3J0IGNsYXNzIE1vZGVsIGV4dGVuZHMgSW1wb3J0ZXIge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMsIC4uLmFkZGl0aW9uYWwpIHtcbiAgICBjb25zb2xlLndhcm4oJ01vZGVsIGlzIGRlcHJlY2F0ZWQuIFVzZSBJbXBvcnRlciBpbnN0ZWFkLicpO1xuXG4gICAgaWYgKHBhcmFtcy5nZW9tZXRyeSkge1xuICAgICAgcGFyYW1zLnVybCA9IHBhcmFtcy5nZW9tZXRyeS5wYXRoO1xuICAgICAgcGFyYW1zLmxvYWRlciA9IHBhcmFtcy5nZW9tZXRyeS5sb2FkZXI7XG4gICAgfVxuXG4gICAgc3VwZXIocGFyYW1zLCAuLi5hZGRpdGlvbmFsKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FtZXJhTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBjb25zb2xlLndhcm4oJ0NhbWVyYU1vZHVsZSBpcyBkZXByZWNhdGVkLiBVc2UgRGVmaW5lTW9kdWxlIGluc3RlYWQuJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEocGFyYW1zKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgdGhpcy5hZGQoc2VsZi5jYW1lcmEpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2NhbWVyYScsIHRoaXMuY2FtZXJhKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBOYW1lc3BhY2UgY29udGFpbmluZyBhbGwgY2xhc3NlcyBmcm9tIGFsbCBtb2R1bGVzLiBVc2VkIGFzIGdsb2JhbCBpbiBVTUQgcGF0dGVybi5cbiAqIEBuYW1lc3BhY2UgV0hTXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgdXNlIG9mIFdIUyBuYW1lc3BhY2UuPC9jYXB0aW9uPlxuICogbmV3IFdIUy5BcHAoKSAvLyBjb3JlXG4gKiBuZXcgV0hTLlBlcnNwZWN0aXZlQ2FtZXJhKCkgLy8gY29tcG9uZW50c1xuICogbmV3IFdIUy5SZXNpemVNb2R1bGUoKSAvLyBtb2R1bGVzXG4gKiBXSFMuZXh0ZW5kKCkgLy8gdXRpbHNcbiAqL1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vY29yZS9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMvaW5kZXgnO1xuXG4vLyBERVBSRUNBVElPTlxuZXhwb3J0ICogZnJvbSAnLi9kZXByZWNhdGlvbic7XG4iXSwibmFtZXMiOlsiZXh0ZW5kIiwib2JqZWN0IiwiZXh0ZW5zaW9ucyIsImV4dGVuc2lvbiIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJwcm9wIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwiaW5zdHJ1Y3QiLCJhcnJheSIsImluc3RBcnJheSIsInRlbXBPYmplY3QiLCJpIiwibWF4IiwibGVuZ3RoIiwiZ3VpZGUiLCJ0cmFuc2Zvcm1EYXRhIiwiaW5zdHJ1Y3Rpb25zIiwia2V5IiwidG9BcnJheSIsImluc3RydWN0aW9uIiwidGVtcEFycmF5IiwiQ29tcG9zaXRpb25FcnJvciIsImNsYXNzSW5zdGFuY2UiLCJtZXNzYWdlIiwiY29tcG9uZW50Iiwic3RhY2tBcnJheSIsInN0YWNrIiwic3BsaXQiLCJzcGxpY2UiLCJqb2luIiwiY29uc29sZSIsImVycm9yIiwibmFtZSIsIkVycm9yIiwiRGVwZW5kZW5jeUVycm9yIiwiYWN0aXZlTW9kdWxlIiwiZGVwZW5kZW5jeU1vZHVsZSIsIk1hbmFnZXJFcnJvciIsIndhcm5EZXBzIiwiUkVWSVNJT04iLCJlcnIiLCJNb2R1bGVTeXN0ZW0iLCJzb3VyY2UiLCJtb2R1bGVzIiwiYXBwbHlNb2R1bGUiLCJhcHBseUJyaWRnZSIsIm9uQ29weSIsImJyaWRnZU1hcCIsIm1vZHVsZSIsImJyaWRnZSIsImFwcGx5IiwicHVzaCIsIm1hbmFnZXIiLCJhY3RpdmUiLCJpbnRlZ3JhdGUiLCJiaW5kIiwiZGlzcG9zZU1vZHVsZSIsImluZGV4T2YiLCJkaXNwb3NlIiwiRXZlbnRzIiwiU3ltYm9sIiwib2JqZWN0UHJvdG8iLCJoYXNPd25Qcm9wZXJ0eSIsInN5bVRvU3RyaW5nVGFnIiwibmF0aXZlT2JqZWN0VG9TdHJpbmciLCJyb290IiwicG9ueWZpbGwiLCIkJG9ic2VydmFibGUiLCJNb2R1bGVNYW5hZ2VyIiwiaGFuZGxlciIsImN1cnJlbnRNb2R1bGUiLCJzdG9yZSIsImNyZWF0ZVN0b3JlIiwic3RhdGUiLCJhY3Rpb24iLCJkYXRhIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsIkJvb2xlYW4iLCJkZXBzTWFwIiwic3Vic2NyaWJlIiwiY2hhbmdlZEtleSIsImNhbGxiYWNrIiwid2FybiIsInNldCIsIm1vZHVsZUV4ZWN1dG9yIiwidXNlIiwiQ29tcG9uZW50IiwicGFyYW1zIiwiZGVmYXVsdHMiLCJfd2FpdCIsImNoaWxkcmVuIiwiaW50ZWdyYXRlTW9kdWxlcyIsInByb21pc2UiLCJQcm9taXNlIiwiYWxsIiwiZnVuYyIsImlzRGVmZmVyZWQiLCJ3YWl0IiwidGhlbiIsImNvcHkiLCJjdXN0b21pemUiLCJuYXRpdmUiLCJjbG9uZSIsInBhcmVudCIsInJlc29sdmUiLCJyZWplY3QiLCJkZWZlciIsImFkZFByb21pc2UiLCJvbkFkZCIsInJlc29sdmVyIiwiYWRkIiwicmVtb3ZlIiwiX21hbmFnZXIiLCJfbmF0aXZlIiwibWVzaCIsImF0dHJpYnV0ZXMiLCJtYXBwZXJzIiwidGFyZ2V0IiwibWFwcGVyIiwiayIsIm1hcCIsImF0dHJpYnV0ZSIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0dGVyIiwic2V0dGVyIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsInZhbHVlIiwibWlycm9yIiwiTWVzaENvbXBvbmVudCIsImdlb20iLCJNZXNoIiwibWF0ZXJpYWwiLCJnZW9tZXRyeSIsImN1c3RvbSIsImJ1aWxkIiwid3JhcCIsInBvc2l0aW9uIiwicm90YXRpb24iLCJzY2FsZSIsInNoYWRvdyIsIngiLCJ5IiwieiIsImNhc3RTaGFkb3ciLCJjYXN0IiwicmVjZWl2ZVNoYWRvdyIsInJlY2VpdmUiLCJvbldyYXAiLCJxdWF0ZXJuaW9uIiwiZGVzdCIsIkxpZ2h0Q29tcG9uZW50IiwibWFwU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiYmlhcyIsInJhZGl1cyIsInNoYWRvd0NhbWVyYSIsImNhbWVyYSIsIm5lYXIiLCJmYXIiLCJmb3YiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJDYW1lcmFDb21wb25lbnQiLCJzeXN0ZW0iLCJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJmb3JtYW5jZSIsInByZXNlbnQiLCJBcHAiLCJsb2ciLCJ2ZXJzaW9uIiwic2ltdWxhdGUiLCJ1cGRhdGVFbmFibGVkIiwibG9vcHMiLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsInByb2Nlc3MiLCJsbCIsImUiLCJlbmFibGVkIiwiZXhlY3V0ZSIsImNsb2NrIiwibG9vcCIsImluZGV4IiwiZ2V0IiwiTG9vcCIsInVzZUNsb2NrIiwiQ2xvY2siLCJ3b3JsZCIsImFkZExvb3AiLCJzdGFydCIsInN0b3AiLCJyZW1vdmVMb29wIiwiQW1iaWVudExpZ2h0IiwibGlnaHQiLCJBbWJpZW50TGlnaHROYXRpdmUiLCJjb2xvciIsImludGVuc2l0eSIsIkRpcmVjdGlvbmFsTGlnaHQiLCJ3cmFwU2hhZG93IiwiRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSIsIkhlbWlzcGhlcmVMaWdodCIsIkhlbWlzcGhlcmVMaWdodE5hdGl2ZSIsInNreUNvbG9yIiwiZ3JvdW5kQ29sb3IiLCJQb2ludExpZ2h0IiwiUG9pbnRMaWdodE5hdGl2ZSIsImRpc3RhbmNlIiwiZGVjYXkiLCJTcG90TGlnaHQiLCJTcG90TGlnaHROYXRpdmUiLCJhbmdsZSIsImV4cG9uZW50IiwiTWF0aCIsIlBJIiwiQXJlYUxpZ2h0IiwiUmVjdEFyZWFMaWdodE5hdGl2ZSIsIkN1YmVDYW1lcmEiLCJDdWJlQ2FtZXJhTmF0aXZlIiwiY3ViZVJlc29sdXRpb24iLCJPcnRob2dyYXBoaWNDYW1lcmEiLCJPcnRob2dyYXBoaWNDYW1lcmFOYXRpdmUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIlBlcnNwZWN0aXZlQ2FtZXJhTmF0aXZlIiwiYXNwZWN0IiwiQm94IiwiYnVpbGRHZW9tZXRyeSIsImJ1ZmZlciIsIkJveEJ1ZmZlckdlb21ldHJ5IiwiQm94R2VvbWV0cnkiLCJkZXB0aCIsIndpZHRoU2VnbWVudHMiLCJoZWlnaHRTZWdtZW50cyIsImRlcHRoU2VnbWVudHMiLCJDaXJjbGUiLCJDaXJjbGVCdWZmZXJHZW9tZXRyeSIsIkNpcmNsZUdlb21ldHJ5Iiwic2VnbWVudHMiLCJ0aGV0YVN0YXJ0IiwidGhldGFMZW5ndGgiLCJDb25lIiwiQ29uZUJ1ZmZlckdlb21ldHJ5IiwiQ29uZUdlb21ldHJ5IiwicmFkaXVzU2VnbWVudHMiLCJvcGVuRW5kZWQiLCJDeWxpbmRlciIsIkN5bGluZGVyQnVmZmVyR2VvbWV0cnkiLCJDeWxpbmRlckdlb21ldHJ5IiwicmFkaXVzVG9wIiwicmFkaXVzQm90dG9tIiwiRG9kZWNhaGVkcm9uIiwiRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJEb2RlY2FoZWRyb25HZW9tZXRyeSIsImRldGFpbCIsIkV4dHJ1ZGUiLCJFeHRydWRlR2VvbWV0cnkiLCJzaGFwZXMiLCJvcHRpb25zIiwiQnVmZmVyR2VvbWV0cnkiLCJmcm9tR2VvbWV0cnkiLCJJY29zYWhlZHJvbiIsIkljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJJY29zYWhlZHJvbkdlb21ldHJ5IiwiTGF0aGUiLCJMYXRoZUJ1ZmZlckdlb21ldHJ5IiwiTGF0aGVHZW9tZXRyeSIsInBvaW50cyIsIkxpbmUiLCJMaW5lTmF0aXZlIiwiR2VvbWV0cnkiLCJwcCIsImN1cnZlIiwiZ2V0UG9pbnRzIiwidmVydHMiLCJGbG9hdDMyQXJyYXkiLCJpMyIsImFkZEF0dHJpYnV0ZSIsIkJ1ZmZlckF0dHJpYnV0ZSIsInZlcnRpY2VzIiwiTGluZUN1cnZlMyIsIlZlY3RvcjMiLCJJbXBvcnRlciIsImZpbHRlciIsInByb2Nlc3NGaWx0ZXIiLCJmb3JFYWNoIiwiZWwiLCJ0ZXh0dXJlUGF0aCIsImxhb2RlciIsInNldFRleHR1cmVQYXRoIiwibG9hZGVyIiwibG9hZCIsInVybCIsIm9uTG9hZCIsInBhcnNlciIsInVzZUN1c3RvbU1hdGVyaWFsIiwibWF0Iiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJKU09OTG9hZGVyIiwibWF0ZXJpYWxzIiwiT2N0YWhlZHJvbiIsIk9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSIsIk9jdGFoZWRyb25HZW9tZXRyeSIsIlBhcmFtZXRyaWMiLCJQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkiLCJQYXJhbWV0cmljR2VvbWV0cnkiLCJzbGljZXMiLCJzdGFja3MiLCJ1IiwidiIsIlBsYW5lIiwiUGxhbmVCdWZmZXJHZW9tZXRyeSIsIlBsYW5lR2VvbWV0cnkiLCJ3U2VnbWVudHMiLCJoU2VnbWVudHMiLCJ2ZXJ0aWNlc09mQ3ViZSIsImluZGljZXNPZkZhY2VzIiwiUG9seWhlZHJvbiIsIlBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSIsIlBvbHloZWRyb25HZW9tZXRyeSIsIlJpbmciLCJSaW5nQnVmZmVyR2VvbWV0cnkiLCJSaW5nR2VvbWV0cnkiLCJpbm5lclJhZGl1cyIsIm91dGVyUmFkaXVzIiwidGhldGFTZWdtZW50cyIsInBoaVNlZ21lbnRzIiwiU2hhcGUiLCJTaGFwZUJ1ZmZlckdlb21ldHJ5IiwiU2hhcGVHZW9tZXRyeSIsIlNwaGVyZSIsIlNwaGVyZUJ1ZmZlckdlb21ldHJ5IiwiU3BoZXJlR2VvbWV0cnkiLCJUZXRyYWhlZHJvbiIsIlRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJUZXRyYWhlZHJvbkdlb21ldHJ5IiwiVGV4dCIsInBhcmFtZXRlcnMiLCJmb250IiwiVGV4dEdlb21ldHJ5IiwidGV4dCIsIkZvbnRMb2FkZXIiLCJGb250IiwiVG9ydXMiLCJUb3J1c0dlb21ldHJ5IiwidHViZSIsInJhZGlhbFNlZ21lbnRzIiwidHVidWxhclNlZ21lbnRzIiwiYXJjIiwiVG9ydXNrbm90IiwiR0NvbnN0cnVjdCIsIlRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IiwiVG9ydXNLbm90R2VvbWV0cnkiLCJwIiwicSIsIlR1YmUiLCJUdWJlQnVmZmVyR2VvbWV0cnkiLCJUdWJlR2VvbWV0cnkiLCJwYXRoIiwiY2xvc2VkIiwiR3JvdXAiLCJvYmplY3RzIiwib2JqIiwiYWRkVG8iLCJPYmplY3QzRCIsIkVsZW1lbnRNb2R1bGUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImJvZHkiLCJjcmVhdGVFbGVtZW50IiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwic2VsZiIsImFwcGVuZENoaWxkIiwiUmVuZGVyaW5nTW9kdWxlIiwiaXNTaGFkb3ciLCJhc3NpZ24iLCJWZWN0b3IyIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImJnQ29sb3IiLCJiZ09wYWNpdHkiLCJyZW5kZXJlciIsInBpeGVsUmF0aW8iLCJyZXNvbHV0aW9uIiwiV2ViR0xSZW5kZXJlciIsImVmZmVjdHMiLCJhcHBseUFkZGl0aW9uYWwiLCJzZXRDbGVhckNvbG9yIiwic2V0UGl4ZWxSYXRpbyIsInNldFNpemUiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwiaXNBcHBsaWVkIiwiYWRkaXRpb25hbCIsInNjZW5lIiwicmVuZGVyTG9vcCIsInJlbmRlciIsImF0dGFjaFRvQ2FudmFzIiwiZWZmZWN0IiwiY2IiLCJzaXplIiwiZ2V0U2l6ZSIsImFwcCIsImNhbnZhcyIsImRvbUVsZW1lbnQiLCJkZWZpbmUiLCJpbnRlZ3JhdGVSZW5kZXJlciIsInVwZGF0ZSIsImZvcmNlQ29udGV4dExvc3MiLCJzaGFkb3dNYXAiLCJTY2VuZU1vZHVsZSIsIndpbGxTY2VuZUJlUmVwbGFjZWQiLCJTY2VuZSIsInNldFNjZW5lIiwiUmVzaXplTW9kdWxlIiwiY2FsbGJhY2tzIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsInJlbmRlcmluZyIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZ2V0Q29udGFpbmVyIiwiZ2V0UmVzb2x1dGlvbiIsImF1dG8iLCJhZGRFdmVudExpc3RlbmVyIiwidHJpZ2dlciIsImFkZEF1dG9yZXNpemUiLCJmcmFnbWVudCIsInZlcnRleCIsIlNoYWRlck1hdGVyaWFsIiwiVW5pZm9ybSIsIkNvbG9yIiwiV2ViR0xSZW5kZXJUYXJnZXQiLCJMaW5lYXJGaWx0ZXIiLCJSR0JBRm9ybWF0IiwiUkdCRm9ybWF0IiwiRGVwdGhUZXh0dXJlIiwiRGVwdGhTdGVuY2lsRm9ybWF0IiwiVW5zaWduZWRJbnQyNDhUeXBlIiwicG9seWZpbGwiLCJtZXRob2QiLCJzaG93V2FybiIsIlBvc3RQcm9jZXNzb3JNb2R1bGUiLCJkZWJ1ZyIsImN1cnJlbnRQYXNzIiwiY29tcG9zZXIiLCJFZmZlY3RDb21wb3NlciIsImdldERlbHRhIiwicmVwbGFjZVJlbmRlcmVyIiwicGFzcyIsIlJlbmRlclBhc3MiLCJhZGRQYXNzIiwidGV4dHVyZUlEIiwidW5pZm9ybXMiLCJTaGFkZXJQYXNzIiwicGFzc2VzIiwiYm9vbCIsInJlbmRlclRvU2NyZWVuIiwiRXZlbnRzUGF0Y2hNb2R1bGUiLCJvcmlnaW5PYmplY3QiLCJkZXN0T2JqZWN0IiwiZXZlbnRzIiwiZXZlbnQiLCJlbWl0IiwicGF0Y2hFdmVudHMiLCJWaXJ0dWFsTW91c2VNb2R1bGUiLCJnbG9iYWxNb3ZlbWVudCIsIm1vdXNlIiwicmF5Y2FzdGVyIiwiUmF5Y2FzdGVyIiwicHJvamVjdGlvblBsYW5lIiwiY3VzdG9tWCIsImN1c3RvbVkiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WCIsImNsaWVudFkiLCJub3JtYWwiLCJnZXRXb3JsZERpcmVjdGlvbiIsInNldEZyb21DYW1lcmEiLCJyZXF1aXJlIiwib24iLCJldiIsImdsb2JhbFgiLCJnbG9iYWxZIiwicG9pbnRlckxvY2tFbGVtZW50IiwibW92ZW1lbnRYIiwibW92ZW1lbnRZIiwiaXNIb3ZlcmVkIiwiaG92ZXJzIiwiaW50ZXJzZWN0T2JqZWN0IiwicGxhbmUiLCJyYXkiLCJpbnRlcnNlY3RQbGFuZSIsImludGVyc2VjdGlvbiIsIkNvbnRyb2xzTW9kdWxlIiwiY29udHJvbHMiLCJjIiwidXBkYXRlTG9vcCIsIkZvZ01vZHVsZSIsInR5cGUiLCJmb2ciLCJGb2dFeHAyIiwiZGVuc2l0eSIsIkZvZyIsImlzRXF1YWxEZWZhdWx0IiwiYSIsImIiLCJlcXVhbHMiLCJTdGF0ZU1vZHVsZSIsImlzRXF1YWwiLCJlcXVhbENoZWNrIiwiYWN0aW9uR2VuZXJhdGUiLCJjb25maWd1cmF0aW9uIiwiY3VycmVudENvbmZpZyIsInByZXZDb25maWciLCJjb25maWciLCJkZWZhdWx0IiwicmVwbGFjZVJlZHVjZXIiLCJjb25maWdzIiwidXBkYXRlcyIsImNvbmZpZ05hbWUiLCJ0cnVlVmFsIiwiZmFsc2VWYWwiLCJUaHJlZU9yYml0Q29udHJvbHMiLCJldmVudEhhbmRsZXIiLCJtaW5EaXN0YW5jZSIsIm1heERpc3RhbmNlIiwiSW5maW5pdHkiLCJtaW5ab29tIiwibWF4Wm9vbSIsIm1pblBvbGFyQW5nbGUiLCJtYXhQb2xhckFuZ2xlIiwibWluQXppbXV0aEFuZ2xlIiwibWF4QXppbXV0aEFuZ2xlIiwiZW5hYmxlRGFtcGluZyIsImRhbXBpbmdGYWN0b3IiLCJlbmFibGVab29tIiwiem9vbVNwZWVkIiwiZW5hYmxlUm90YXRlIiwicm90YXRlU3BlZWQiLCJlbmFibGVQYW4iLCJrZXlQYW5TcGVlZCIsImF1dG9Sb3RhdGUiLCJhdXRvUm90YXRlU3BlZWQiLCJlbmFibGVLZXlzIiwia2V5cyIsIkxFRlQiLCJVUCIsIlJJR0hUIiwiQk9UVE9NIiwibW91c2VCdXR0b25zIiwiT1JCSVQiLCJNT1VTRSIsIlpPT00iLCJNSURETEUiLCJQQU4iLCJ0YXJnZXQwIiwicG9zaXRpb24wIiwiem9vbTAiLCJ6b29tIiwiZ2V0UG9sYXJBbmdsZSIsInNwaGVyaWNhbCIsInBoaSIsImdldEF6aW11dGhhbEFuZ2xlIiwidGhldGEiLCJyZXNldCIsImRpc3BhdGNoRXZlbnQiLCJjaGFuZ2VFdmVudCIsIlNUQVRFIiwiTk9ORSIsIm9mZnNldCIsInF1YXQiLCJRdWF0ZXJuaW9uIiwic2V0RnJvbVVuaXRWZWN0b3JzIiwidXAiLCJxdWF0SW52ZXJzZSIsImludmVyc2UiLCJsYXN0UG9zaXRpb24iLCJsYXN0UXVhdGVybmlvbiIsInN1YiIsImFwcGx5UXVhdGVybmlvbiIsInNldEZyb21WZWN0b3IzIiwicm90YXRlTGVmdCIsImdldEF1dG9Sb3RhdGlvbkFuZ2xlIiwic3BoZXJpY2FsRGVsdGEiLCJtaW4iLCJtYWtlU2FmZSIsInBhbk9mZnNldCIsInNldEZyb21TcGhlcmljYWwiLCJsb29rQXQiLCJ6b29tQ2hhbmdlZCIsImRpc3RhbmNlVG9TcXVhcmVkIiwiRVBTIiwiZG90IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uQ29udGV4dE1lbnUiLCJvbk1vdXNlRG93biIsIm9uTW91c2VXaGVlbCIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hFbmQiLCJvblRvdWNoTW92ZSIsIm9uTW91c2VNb3ZlIiwib25Nb3VzZVVwIiwib25LZXlEb3duIiwic3RhcnRFdmVudCIsImVuZEV2ZW50IiwiUk9UQVRFIiwiRE9MTFkiLCJUT1VDSF9ST1RBVEUiLCJUT1VDSF9ET0xMWSIsIlRPVUNIX1BBTiIsIlNwaGVyaWNhbCIsInJvdGF0ZVN0YXJ0Iiwicm90YXRlRW5kIiwicm90YXRlRGVsdGEiLCJwYW5TdGFydCIsInBhbkVuZCIsInBhbkRlbHRhIiwiZG9sbHlTdGFydCIsImRvbGx5RW5kIiwiZG9sbHlEZWx0YSIsImdldFpvb21TY2FsZSIsInBvdyIsInJvdGF0ZVVwIiwicGFuTGVmdCIsIm9iamVjdE1hdHJpeCIsInNldEZyb21NYXRyaXhDb2x1bW4iLCJtdWx0aXBseVNjYWxhciIsInBhblVwIiwicGFuIiwiZGVsdGFYIiwiZGVsdGFZIiwidGFyZ2V0RGlzdGFuY2UiLCJ0YW4iLCJjbGllbnRIZWlnaHQiLCJtYXRyaXgiLCJjbGllbnRXaWR0aCIsImRvbGx5SW4iLCJkb2xseVNjYWxlIiwiZG9sbHlPdXQiLCJoYW5kbGVNb3VzZURvd25Sb3RhdGUiLCJoYW5kbGVNb3VzZURvd25Eb2xseSIsImhhbmRsZU1vdXNlRG93blBhbiIsImhhbmRsZU1vdXNlTW92ZVJvdGF0ZSIsInN1YlZlY3RvcnMiLCJoYW5kbGVNb3VzZU1vdmVEb2xseSIsImhhbmRsZU1vdXNlTW92ZVBhbiIsImhhbmRsZU1vdXNlVXAiLCJoYW5kbGVNb3VzZVdoZWVsIiwiaGFuZGxlS2V5RG93biIsImtleUNvZGUiLCJoYW5kbGVUb3VjaFN0YXJ0Um90YXRlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJoYW5kbGVUb3VjaFN0YXJ0RG9sbHkiLCJkeCIsImR5Iiwic3FydCIsImhhbmRsZVRvdWNoU3RhcnRQYW4iLCJoYW5kbGVUb3VjaE1vdmVSb3RhdGUiLCJoYW5kbGVUb3VjaE1vdmVEb2xseSIsImhhbmRsZVRvdWNoTW92ZVBhbiIsImhhbmRsZVRvdWNoRW5kIiwicHJldmVudERlZmF1bHQiLCJidXR0b24iLCJzdG9wUHJvcGFnYXRpb24iLCJFdmVudERpc3BhdGNoZXIiLCJPcmJpdENvbnRyb2xzTW9kdWxlIiwiZm9sbG93IiwidXBkYXRlUHJvY2Vzc29yIiwic2V0Q29udHJvbHMiLCJzZXRVcGRhdGUiLCJEeW5hbWljR2VvbWV0cnlNb2R1bGUiLCJnXyIsInVwZGF0ZVBhcmFtcyIsIlRleHR1cmVMb2FkZXIiLCJUZXh0dXJlTW9kdWxlIiwidGV4dHVyZXMiLCJ0ZXh0dXJlIiwicmVwZWF0IiwiUmVwZWF0V3JhcHBpbmciLCJtYXBwaW5nIiwiVVZNYXBwaW5nIiwiZml4IiwidGV4Iiwid3JhcFMiLCJ3cmFwVCIsIm1hZ0ZpbHRlciIsIk5lYXJlc3RGaWx0ZXIiLCJtaW5GaWx0ZXIiLCJMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIiLCJBbmltYXRpb25Nb2R1bGUiLCJpc0RlZmVycmVkIiwic2tlbGV0b24iLCJtaXhlciIsIkFuaW1hdGlvbk1peGVyIiwiY2xpcHMiLCJhbmltYXRpb25zIiwiY2xpcE5hbWUiLCJjbGlwIiwiQW5pbWF0aW9uQ2xpcCIsImZpbmRCeU5hbWUiLCJjbGlwQWN0aW9uIiwicGxheSIsInNwZWVkIiwiRGVmaW5lTW9kdWxlIiwiTW9kZWwiLCJDYW1lcmFNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsTUFBRCxFQUEyQjtvQ0FBZkMsVUFBZTtjQUFBOzs7Ozs7Ozs7eUJBQ3ZCQSxVQUF4Qiw4SEFBb0M7VUFBekJDLFNBQXlCOzs7OztVQUk5QixDQUFDQSxTQUFMLEVBQ0UsU0FMZ0M7Ozs7Ozs7OEJBT2ZDLE9BQU9DLG1CQUFQLENBQTJCRixTQUEzQixDQUFuQixtSUFBMEQ7Y0FBL0NHLElBQStDOztjQUNwREwsT0FBT0ssSUFBUCxNQUFpQkMsU0FBakIsSUFBOEJKLFVBQVVHLElBQVYsQ0FBOUIsSUFDQ0wsT0FBT0ssSUFBUCxFQUFhRSxRQUFiLE9BQTRCLGlCQUQ3QixJQUVDTCxVQUFVRyxJQUFWLEVBQWdCRSxRQUFoQixPQUErQixpQkFGcEMsRUFFdUQ7O2dCQUVqREwsVUFBVUcsSUFBVixFQUFnQkcsV0FBaEIsS0FBZ0NMLE1BQXBDLEVBQTRDSixPQUFPQyxPQUFPSyxJQUFQLENBQVAsRUFBcUJILFVBQVVHLElBQVYsQ0FBckIsRUFBNUMsS0FDS0wsT0FBT0ssSUFBUCxJQUFlSCxVQUFVRyxJQUFWLENBQWY7V0FMUCxNQU9FTCxPQUFPSyxJQUFQLElBQWUsT0FBT0wsT0FBT0ssSUFBUCxDQUFQLEtBQXdCLFdBQXhCLEdBQXNDSCxVQUFVRyxJQUFWLENBQXRDLEdBQXdETCxPQUFPSyxJQUFQ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
