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

    if (console) console.error('Component:', component);
    if (console && activeModule) console.error('Active module:', activeModule);

    _this3.name = 'ManagerError';
    return _this3;
  }

  return ManagerError;
}(Error);

// Check for Three.js
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
     * @method applyCommand
     * @instance
     * @description .applyCommand runs a method called `name` on all modules.
     * @param {String} name the method name.
     * @param {Function} [cb=(func, moduleScope) => func.apply(this, [moduleScope])] How the function is wrapped/
     * @memberof module:core.ModuleSystem
     */

  }, {
    key: 'applyCommand',
    value: function applyCommand(name) {
      var _this2 = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (func, moduleScope) {
        return func.apply(_this2, [moduleScope]);
      };

      var modules = this.modules;
      if (!modules) return;

      for (var i = 0, max = modules.length; i < max; i++) {
        var module = modules[i];
        if (name in module) cb(module[name], module);
      }
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

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
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

/** `Object#toString` result references. */
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

/** Built-in value references. */
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

/** `Object#toString` result references. */
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

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
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

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (undefined !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

/**
 * @class ModuleManager
 * @category core
 * @param {Object} object handler
 * @description  Solves modules dependencies
 * @memberof module:core
 */
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

/**
 * @class Component
 * @category core
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends ModuleSystem
 * @memberof module:core
 */
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

/**
 * @class MeshComponent
 * @category core
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends module:core.Component
 * @memberof module:core
 */
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
        _this.wait(build);

        _this.wait(new Promise(function (resolve) {
          build.then(function (native) {
            _this.native = native;
            _this.wrap().then(resolve);
          });
        }));
      } else {
        _this.native = build;
        _this.wait(_this.wrap());
      }
    }

    _this.applyCommand('postIntegrate');
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

/**
 * @class LightComponent
 * @category core
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends module:core.Component
 * @memberof module:core
 */
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

      _this.wait(_this.wrap());
    }

    _this.applyCommand('postIntegrate');
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

/**
 * @class CameraComponent
 * @category core
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends module:core.Component
 * @memberof module:core
 */
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

      _this.wait(_this.wrap());
    }

    _this.applyCommand('postIntegrate');
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

/**
 * @class App
 * @category core
 * @description This component is used to prepare a world scene, setup physics, camera, renderer and all other things that you usually do before making meshes.
 * @param {Array} [modules=[]] - Array of Modules
 * @extends ModuleSystem
 * @memberof module:core
 */

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

/**
 * @class Loop
 * @category core
 * @param {Function} func function to execute on each animation frame
 * @param {Boolean} [useClock=true] passes a Clock to the function when called, if true
 * @memberof module:core
 */

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

/**
 * @class AmbientLight
 * @category components/lights
 * @description AmbientLight is a simple class, it extends Light and inherits all its methods.
 * AmbientLight creates basic light around all scene, so it doesn't need properties like pos or target.
 * It supports only color and intensity as parameters, which defines the color of the surrounded light and intensity of light.
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating an AmbientLight </caption>
 * new AmbientLight({
 *   color: 0xffffff,
 *   intensity: 0.2
 * }).addTo(world);
 */
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

/**
 * @class DirectionalLight
 * @category components/lights
 * @description DirectinalLight creates a light that shines from a specific direction not from a specific position.<br/><br/>
 * This light will behave as though it is infinitely far away and the rays produced from it are all parallel. <br/><br/>
 * The best analogy would be a light source that acts like the sun: the sun is so far away that all sunlight hitting objects comes from the same angle.<br/><br/>
 * It has the same options as AmbientLight in light paramater, but it also supports pos and target paramaters.
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a DirectionalLight to fall down from vec3(10, 20, 10) to vec3(0, 0, 0)</caption>
 * new DirectionalLight({
 *   color: 0xffffff,
 *   intensity: 0.2,
 *
 *   position: [10, 20, 10]
 * }).addTo(app);
 */
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

/**
 * @class HemisphereLight
 * @category components/lights
 * @description HemisphereLight is a light source positioned directly above the scene.<br/>
 * It also doesn't need position and target properties.
 * @classDesc
 * <iframe src="https://threejs.org/examples/webgl_lights_hemisphere.html"></iframe>
 * @param {Object} [params={light: {skyColor: 0xffffff, groundColor: 0xffffff, intensity: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a HemisphereLight</caption>
 * new HemisphereLight({
 *   skyColor: 0xff0000,
 *   groundColor: 0x0000ff,
 *   intensity: 0.2
 * }).addTo(app);
 */
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

/**
 * @class PointLight
 * @category components/lights
 * @description PointLight creates a light at a specific position in the scene. The light shines in all directions (roughly similar to a light bulb.)<br/><br/>
 * It has the same options as AmbientLight in light paramater, but it also supports position, distance and decay.<br/>
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1, distance: 100, decay: 1}}] - The params.
 * @extends LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a PointLight</caption>
 * new PointLight( {
 *   color: 0xff0000,
 *   intensity: 2,
 *   distance: 300
 *
 *   position: [10, 20, 10]
 * }).addTo(app);
 */
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

/**
 * @class SpotLight
 * @category components/lights
 * @description SpotLight creates spot light that can cast shadow in one direction. <br/><br/>
 * It has the same parameters as AmbientLight in light, but it also supports pos and target. <br/><br/>
 * SpotLight affects meshes with lambert and phong material.
 * @classDesc
 * <iframe src="https://threejs.org/examples/webgl_lights_spotlight.html"></iframe>
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1, distance: 100, angle: Math.PI / 3, exponent: 0, decay: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a SpotLight that falls down from vec3(10, 20, 10) to vec3(0, 0, 0)</caption>
 * new SpotLight({
 *   color: 0x00ff00,
 *   intensity: 3,
 *   distance: 1000
 *
 *   position: [10, 20, 10]
 * }).addTo(app);
 */
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

/**
 * @class CubeCamera
 * @category components/cameras
 * @description Creates 6 cameras that render to a WebGLRenderTargetCube
 * @param {Object} [params] - The parameters object.
 * @memberof module:components/cameras
 * @extends module:core.CameraComponent
 * @example <caption>Creates a CubeCamera and set it as app's camera</caption>
 * const camera = new CubeCamera({
 *   camera: {
 *     cubeResolution: 256
 *   },
 *
 *   position: {
 *     x: 0,
 *     y: 100,
 *     z: 0
 *   }
 * });
 *
 * app.camera = camera;
 */
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

/**
 * @class OrthographicCamera
 * @category components/cameras
 * @description Camera with orthographic projection.
 * @param {Object} [params] - The parameters object.
 * @memberof module:components/cameras
 * @extends module:core.CameraComponent
 * @example <caption>Create an OrthographicCamera and set it as app's camera</caption>
 * const camera = new OrthographicCamera({
 *   camera: {
 *     far: 10000
 *   },
 *
 *   position: {
 *     y: 50
 *   }
 * });
 *
 * app.camera = camera;
 */
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

/**
 * @class PerspectiveCamera
 * @description Camera with perspective projection.
 * @category components/cameras
 * @param {Object} [params] - The parameters object.
 * @memberof module:components/cameras
 * @extends module:core.CameraComponent
 * @example <caption>Create an PerspectiveCamera and set it as app's camera</caption>
 * const camera = new PerspectiveCamera({
 *   fov: 75,
 *   aspect: window.innerWidth / window.innerHeight,
 *
 *   position: {
 *     x: 0,
 *     y: 100,
 *     z: 0
 *   }
 * });
 *
 * app.camera = camera;
 */
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

/**
 * @class Box
 * @category components/meshes
 * @description As told on Component definition, while you can pass any of the inherited params for this component construction, you will need to
 * pass specific parameters to build this mesh as a geometry object.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#BoxGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Box, and adding to app</caption>
 *  new Box({
 *    geometry: {
 *      width: 2,
 *      height: 2,
 *      depth: 2
 *    },
 *
 *    material: new THREE.MeshBasicMaterial({
 *      color: 0xffffff
 *    }),
 *
 *    position: [50, 60, 70]
 * }).addTo(app);
 */
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

/**
 * @class Circle
 * @category components/meshes
 * @description As told on Component definition, while you can pass any of the inherited params for this component construction, you will need to
 * pass specific parameters to build this mesh as a geometry object.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#CircleGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Circle, and adding to app</caption>
 *  new Circle({
 *    geometry: {
 *      radius: 4,
 *      segments: 16
 *    },
 *
 *    material: new THREE.MeshBasicMaterial({
 *      color: 0xffffff
 *    }),
 *
 *    position: [50, 60, 70]
 * }).addTo(app);
 */
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

/**
 * @class Cone
 * @category components/meshes
 * @description A cylinder is one of the most basic curvilinear geometric shapes, the surface formed by the points at a fixed distance from a given straight line, the axis of the cylinder. <br/><br/>
 * The solid enclosed by this surface and by two planes perpendicular to the axis is also called a cylinder.<br/>
 * The surface area and the volume of a cylinder have been known since deep antiquity.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#ConeGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Cone, and adding to app</caption>
 * new Cone({
 *   geometry: {
 *     radiusTop: 2,
 *     radiusBottom: 4,
 *     height: 5
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   pos: [0, 100, 0]
 * }).addTo(app);
 */
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

/**
 * @class Cylinder
 * @category components/meshes
 * @description A cylinder is one of the most basic curvilinear geometric shapes, the surface formed by the points at a fixed distance from a given straight line, the axis of the cylinder. <br/><br/>
 * The solid enclosed by this surface and by two planes perpendicular to the axis is also called a cylinder.<br/>
 * The surface area and the volume of a cylinder have been known since deep antiquity.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#CylinderGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Cylinder, and adding to app</caption>
 * new Cylinder({
 *   geometry: {
 *     radiusTop: 2,
 *     radiusBottom: 4,
 *     height: 5
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   pos: [0, 100, 0]
 * }).addTo(app);
 */
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

/**
 * @class Dodecahedron
 * @category components/meshes
 * @description In geometry, a dodecahedron is any polyhedron with twelve flat faces. <br/><br/>
 * The most familiar dodecahedron is the regular dodecahedron, which is a Platonic solid. <br/>
 * There are also three regular star dodecahedra, which are constructed as stellations of the convex form. <br/>
 * All of these have icosahedral symmetry, order 120.
 * Dodecahedron creates Dodecahedron object by it's radius and detail.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#DodecahedronGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Dodecahedron, and adding to app</caption>
 * new Dodecahedron({
 *   geometry: {
 *     radius: 2
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: {
 *     y: 10
 *   }
  * }).addTo(app);
 */
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

/**
 * @class Extrude
 * @category components/meshes
 * @description Extrude geometry means that you can create a 3D mesh from any 2D shape using three.js geometry based on <a href='https://threejs.org/docs/#api/math/Vector2'>THREE.Vector2.</a> <br/>
 * Such implementation will help you to make volumed shapes that have their own depth and can be seen from all angels.<br/><br/>
 * You can also find some interesting examples made using <a href='threejs.org'>three.js</a> which is a core of whs.js, such as:
 * - <a href='http://threejs.org/examples/webgl_geometry_extrude_shapes.html'>Webgl geometry extrude</a>
 * - <a href='http://threejs.org/examples/webgl_geometry_extrude_shapes2.html'>Extrude shapes from geodata</a>
 * - <a href='http://threejs.org/examples/webgl_geometry_extrude_splines.html'>Extrude splines</a>
 *
 * Such examples can be easily implemented using whitestorm.js or it's plugins. Use `Extrude` class with <a href='https://threejs.org/docs/#api/extras/core/Shape'>THREE.Shape</a> to get extrude effect of shape defined by 2D vectors.
 * This class is similar to <a href='https://threejs.org/docs/#api/geometries/ExtrudeGeometry'>THREE.ExtrudeGeometry</a>,
 * but it also contains all properties, applied by `Shape`, such as material, mass and vectors like position (pos) and rotation (rot).
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#ExtrudeGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a shape, then an Extrude from it</caption>
 * const shape = new THREE.Shape([
 *   new THREE.Vector2(-4,-4),
 *   new THREE.Vector2(-2,0),
 *   new THREE.Vector2(-4,4),
 *   new THREE.Vector2(0,2),
 *   new THREE.Vector2(4,4),
 *   new THREE.Vector2(2,0),
 *   new THREE.Vector2(4,-4),
 *   new THREE.Vector2(0,-2)
 * ]);
 *
 * const extrude = new Extrude({
 *   geometry: {
 *     shapes: shape,
 *     options: {
 *       bevelEnabled: false,
 *       bevelSize: 0,
 *       amount: 2
 *     }
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: [0, 100, 0]
 * });
 *
 * extrude.addTo(app);
 */
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

/**
 * @class Icosahedron
 * @category components/meshes
 * @description In geometry, an icosahedron is a polyhedron with 20 faces.<br/>
 * There are many kinds of icosahedra, with some being more symmetrical than others. The most well known is the Platonic, convex regular icosahedron.<br/>
 * `Icosahedron` creates an Icosahedron object by its radius and detail.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Icosahedron, and adding to app</caption>
 * new Icosahedron({
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

/**
 * @class Lathe
 * @category components/meshes
 * @description A `LatheGeometry` allows you to create shapes from a smooth curve.
 * This curve is defined by a number of points (also called knots) and is most often called a spline. This spline is rotated around a fixed point and results in vase- and bell-like shapes.<br/><br/>
 * In 3D computer graphics, a lathed object is a 3D model whose vertex geometry is produced by rotating the points of a spline or other point set around a fixed axis.
 * The lathing may be partial; the amount of rotation is not necessarily a full 360 degrees.
 * The point set providing the initial source data can be thought of as a cross section through the object along a plane containing its axis of radial symmetry. <br/><br/>
 * The <a href='http://threejs.org/docs/scenes/geometry-browser.html#LatheGeometry'>following example</a> shows a geometry which can be generated using `Lathe` class.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#LatheGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Lath, and adding to app</caption>
 * const points = [];
 *
 * for (let i = 0; i < 10; i++) {
 *   points.push(
 *     new THREE.Vector2(
 *       (Math.sin(i * 0.7) * 15 + 50) / 10,
 *       (i - 5) * 0.2
 *     )
 *   );
 * }
 *
 * const lathe = new Lathe({
 *   geometry: {
 *     points: points
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: [0, 50, 10]
 * }).addTo(app);
 */
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

/**
 * @class Line
 * @category components/meshes
 * @description Line component is generated from a curve/line and amount of vectors that should be used (points).
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Line, and adding to app</caption>
 * new Line({
 *   geometry: {
 *     curve: new THREE.LineCurve3(new THREE.Vector3(10, 10, 0), new THREE.Vector3(10, 30, 0))
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   })
 * }).addTo(app);
 */
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

/**
 * @class Importer
 * @category components/meshes
 * @description Importer is a loader for meshes and any other data to your scene
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Importer, and adding to app</caption>
 * new Importer({
 *   loader: new THREE.OBJLoader(),
 *
 *   parser(geometry, material) { // data from loader
 *     return new THREE.Mesh(geometry, material); // should return your .native (mesh in this case)
 *   },
 *
 *   position: [0, 100, 0]
 * }).addTo(app);
 */
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

      return new Promise(function (resolve) {
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

/**
 * @class Octahedron
 * @category components/meshes
 * @description In geometry, an octahedron is a polyhedron with eight faces.
 * A regular octahedron is a Platonic solid composed of eight equilateral triangles, four of which meet at each vertex.
 * <br/><br/>
 * `Octahedron` creates an Octahedron object by its `radius` and `detail`.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#OctahedronGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating an Octahedron, and adding to app</caption>
 * new Octahedron({
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

/**
 * @class Parametric
 * @category components/meshes
 * @description `Parametric` generates a geometry representing a <a href='https://en.wikipedia.org/wiki/Parametric_surface'>Parametric surface</a>
 * <br/><br/>
 * It is usually used to develop different kinds of highfields or visualize a <a href='https://stemkoski.github.io/Three.js/Graphulus-Function.html'>math function</a>.
 * <br/>
 * - <a href='http://math.hws.edu/graphicsbook/source/threejs/curves-and-surfaces.html'>Parametric surface</a>
 * - <a href='https://stemkoski.github.io/Three.js/Graphulus-Surface.html'>"Graphulus"</a>
 * <br/><br/>
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#ParametricGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Example creating an heightfield-like geometry. `u` and `v` are like `x` and `y` in shape, but their values are always from `0` to `1`.
 * We use them in `THREE.Vector3` like `x` and `z` and `Math.random() * 5` for `y`.</caption>
 * const createParametric = (u, v) => {
 *   return new THREE.Vector3(u * 30, Math.random() * 5, v * 30);
 * }
 *
 * new Parametric({
 *   geometry: {
 *     func: createParametric
 *   },
 *
 *   material: new THREE.MeshLambertMaterial({
 *     color: 0xffffff,
 *     side: THREE.DoubleSide
 *   }),
 *
 *   position: [0, 100, -100]
 * }).addTo(app);
 */
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

/**
 * @class Plane
 * @category components/meshes
 * @description `Plane` is used for creating planes given some `width` and `height`.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#PlaneGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Plane, and adding to app</caption>
 * new Plane({
 *   geometry: {
 *     width: 20,
 *     height: 30
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   })
 * }).addTo(app);
 */
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

/**
 * @class Ring
 * @category components/meshes
 * @description Ring class creates a circle or just 2D Torus. Does not support physics.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#RingGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Ring, and adding to app</caption>
 * new Ring({
 *   geometry: {
 *     innerRadius: 5,
 *     outerRadius: 2
 *   },
 *
 *   material: new THREE.MeshLambertMaterial({
 *     color: 0xffffff,
 *     side THREE.DoubleSide
 *   }),
 *
 *   position: [0, 8, 0],
 *
 *   rotation: {
 *     x: Math.PI/4
 *   }
 * }).addTo(app);
 */
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

/**
 * @class Shape
 * @category components/meshes
 * @description Shape is a universal class. It allows you to create different 2D shapes in 3D scene.<br/>
 * Unfortunately, not all of them support physics, an alternative is to make a similar 3D object and scale its width down to near zero.
 * <br/><br/>
 * `Shape` consists of shapes that are in its shapes parameter.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#ShapeGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a plane looking Shape from a THREE.Shape, and adding it to app</caption>
 * const rectWidth = 10,
 * rectLength = 5;
 *
 * const rectShape = new THREE.Shape();
 * rectShape.moveTo(0,0);
 * rectShape.lineTo(0, rectWidth);
 * rectShape.lineTo(rectLength, rectWidth);
 * rectShape.lineTo(rectLength, 0);
 * rectShape.lineTo(0, 0);
 *
 * const plane = new Shape({
 *   geometry: {
 *     shape: rectShape
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   })
 * }).addTo(app);
 */
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

/**
 * @class Sphere
 * @category components/meshes
 * @description Sphere class is used to create sphere objects by its radius property and other values that determines its detality.
 * <br/><br/>
 * It is similar to THREE.SphereGeometry, but it also contains all `Shape` properties, such as material, mass and vectors like position (pos) and rotation (rot).
 * <br/><br/>
 * Then it creates an `Three.js mesh` or a `Physijs mesh`, that is similar to `Three.js mesh`, but it also take into consideration collision calculations.
 * This mesh is a combination of `Three.js geometry` and `Physijs material` (The same as in three.js, but with friction and restitution).
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#SphereGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Sphere, and adding it to app</caption>
 * new Sphere({
 *   geometry: {
 *     radius: 2
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: {
 *     y: 100
 *   }
 * }).addTo(app);
 */
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

/**
 * @class Tetrahedron
 * @category components/meshes
 * @description In geometry, a tetrahedron is a polyhedron composed of four triangular faces, six straight edges, and four vertex corners.
 * The tetrahedron is the simplest of all the ordinary convex polyhedra and the only one that has fewer than 5 faces.
 * <br/><br/>
 * `Tetrahedron` creates a Tetrahedron object by its `radius` and `detail`
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#TetrahedronGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Tetrahedron, and adding it to app</caption>
 * new Tetrahedron({
 *   geometry: {
 *     radius: 2,
 *     detail: 1
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: {
 *     x: 0,
 *     y: 100,
 *     z: 0
 *   }
 * }).addTo(app);
 */
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

/**
 * @class Text
 * @category components/meshes
 * @description Text class is made for creating 3D text objects.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#TextGeometry"></iframe>
 * <br/><br/>
 * Physics text object can be convex or concave. By default it's convex but you can also switch to concave.
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Text, and adding it to app</caption>
 * new Text({
 *   geometry: {
 *     text: 'hello world',
 *     parameters: {
 *       font: 'path/to/font.typeface.js',
 *       size: 20,
 *       height: 5,
 *       curveSegments: 6
 *     }
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: {
 *     x: -40,
 *     y: 20,
 *     z: 0
 *   }
 * }).addTo(app);
 */
var Text = (_temp$31 = _class$31 = function (_MeshComponent) {
  inherits(Text, _MeshComponent);

  function Text() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Text);

    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, params, Text.defaults, MeshComponent.instructions));

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
   * Default values for parameters
   * @member {Object} module:components/meshes.Text#defaults
   * @static
   * @default <pre>
   * {
   *   text: 'Hello World!',
   *   loader: new FontLoader(),
   *
   *   parameters: {
   *     size: 12,
   *     height: 50,
   *     curveSegments: 12,
   *     font: new Font(),
   *     bevelEnabled: false,
   *     bevelThickness: 10,
   *     bevelSize: 8
   *   }
   * }
   * </pre>
   */


  createClass(Text, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var promise = new Promise(function (resolve) {
        params.loader.load(params.parameters.font, function (font) {
          params.parameters.font = font;

          var _applyBridge = _this2.applyBridge({
            geometry: new three.TextGeometry(params.text, params.parameters),

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
}), _temp$31);

var _class$32;
var _temp$32;

/**
 * @class Torus
 * @category components/meshes
 * @description Torus class makes a torus figure. A donut is a torus.
 * @classDesc
 * <iframe src="https://threejs.org/docs/index.html#api/geometries/TorusGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Torus, and adding it to app</caption>
 * new Torus({
 *   geometry: {
 *     radius: 5,
 *     tube: 2
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: {
 *     y: 35
 *   }
 * }).addTo(app);
 */
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

/**
 * @class Torusknot
 * @category components/meshes
 * @description Torusknot class makes a torusknot figure. It's like a crooked donut, very crooked.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#TorusKnotGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Torusknot, and adding it to app</caption>
 * new Torusknot({
 *   geometry: {
 *     radius:5,
 *     tube: 2
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   pos: {
 *     y: 100
 *   }
 * }).addTo(app);
 */
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

/**
 * @class Tube
 * @category components/meshes
 * @description Tube class makes a tube that extrudes along a 3d curve.
 * @classDesc
 * <iframe src="https://threejs.org/docs/index.html#api/geometries/TubeGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Tube from a three.js Curve, and adding it to app</caption>
 * const CustomSinCurve = THREE.Curve.create(
 *   function (scale) { // custom curve constructor
 *     this.scale = (scale === undefined) ? 1 : scale;
 *   },
 *
 *   function (t) { // getPoint: t is between 0-1
 *     const tx = t * 3 - 1.5,
 *     ty = Math.sin( 2 * Math.PI * t ),
 *     tz = 0;
 *
 *     return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
 *   }
 * );
 *
 * const path = new CustomSinCurve(10);
 *
 * new Tube({
 *   geometry: {
 *     path: path
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   })
 * }).addTo(app);
 */
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

/**
 * @class Group
 * @category components/meshes
 * @description Sometimes you need to make groups of objects (it's not conveniently to apply transforms to each object when can make just one to a group).<br/>
 * In Three.js you make it using `THREE.Object3D` and it's children. <br/><br/>
 * In whs.js we have `Group`
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Approach 2 - Adding objects to an empty group</caption>
 * const sphere = new Sphere();
 * const box = new Box();
 * const group = new Group();
 *
 * sphere.addTo(group);
 * box.addTo(group);
* @example <caption>Approach 2 - Making a group from objects</caption>
 * const sphere = new Sphere();
 * const box = new Box();
 * const group = new Group(box, sphere);
 * // OR: const group = new Group([box, sphere]);
 */

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

/**
 * @class RenderingModule
 * @category modules/app
 * @param {Object} [params]
 * @memberof module:modules/app
 * @example <caption> Creating a rendering module and passing it to App's modules</caption>
 * new App([
 *   new ElementModule(),
 *   new SceneModule(),
 *   new CameraModule({
 *     position: new THREE.Vector3(0, 6, 18),
 *     far: 10000
 *   }),
 *   new RenderingModule({
 *     bgColor: 0x162129,
 *
 *     renderer: {
 *       antialias: true,
 *       shadowmap: {
 *         type: THREE.PCFSoftShadowMap
 *       }
 *     }
 *   }, {shadow: true})
 * ]);
 */
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

/**
 * @class SceneModule
 * @category modules/app
 * @param {Boolean} [willSceneBeReplaced=false] willSceneBeReplaced should be true only if you are going to overwrite scene dependency even without the use of default one.
 * @memberof module:modules/app
 */

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
 * An adaptive luminosity shader material.
 */

/**
 * Depth of Field shader (Bokeh).
 *
 * Original shader code by Martins Upitis:
 *  http://artmartinsh.blogspot.com/2010/02/glsl-lens-blur-filter-with-bokeh.html
 */

/**
 * Depth of Field shader version 2.4.
 *
 * Original shader code by Martins Upitis:
 *  http://blenderartists.org/forum/showthread.php?237488-GLSL-depth-of-field-with-bokeh-v2-4-(update)
 */

/**
 * A material for combining two textures.
 *
 * This material supports the two blend modes Add and Screen.
 *
 * In Screen mode, the two textures are effectively projected on a white screen
 * simultaneously. In Add mode, the textures are simply added together which
 * often produces undesired, washed out results.
 */

/**
 * An optimised convolution shader material.
 *
 * Based on the GDC2003 Presentation by Masaki Kawase, Bunkasha Games:
 *  Frame Buffer Postprocessing Effects in DOUBLE-S.T.E.A.L (Wreckless)
 * and an article by Filip Strugar, Intel:
 *  An investigation of fast real-time GPU-based image blur algorithms
 *
 * Further modified according to Apple's
 * [Best Practices for Shaders](https://goo.gl/lmRoM5).
 */



/**
 * A kernel size enumeration.
 *
 * @type {Object}
 * @property {Number} VERY_SMALL - A very small kernel that matches a 7x7 Gauss blur kernel.
 * @property {Number} SMALL - A small kernel that matches a 15x15 Gauss blur kernel.
 * @property {Number} MEDIUM - A medium sized kernel that matches a 23x23 Gauss blur kernel.
 * @property {Number} LARGE - A large kernel that matches a 35x35 Gauss blur kernel.
 * @property {Number} VERY_LARGE - A very large kernel that matches a 63x63 Gauss blur kernel.
 * @property {Number} HUGE - A huge kernel that matches a 127x127 Gauss blur kernel.
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
 * A depth shader material.
 */

/**
 * A dot screen shader material.
 */

/**
 * A cinematic shader that provides the following effects:
 *  - Film Grain
 *  - Scanlines
 *  - Vignette
 *  - Greyscale
 *  - Sepia
 *
 * Original scanlines algorithm by Pat "Hawthorne" Shearon.
 *  http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Optimised scanlines and noise with intensity scaling by Georg "Leviathan"
 * Steinrohder. This version was provided under a Creative Commons Attribution
 * 3.0 License: http://creativecommons.org/licenses/by/3.0.
 *
 * The sepia effect is based on:
 *  https://github.com/evanw/glfx.js
 *
 * The vignette code is based on PaintEffect postprocess from ro.me:
 *  http://code.google.com/p/3-dreams-of-black/source/browse/deploy/js/effects/PaintEffect.js
 */

/**
 * A glitch shader material.
 *
 * Reference:
 *  https://github.com/staffantan/unityglitch
 */

/**
 * A crepuscular rays shader material.
 *
 * References:
 *
 * Thibaut Despoulain, 2012:
 *  [(WebGL) Volumetric Light Approximation in Three.js](
 *  http://bkcore.com/blog/3d/webgl-three-js-volumetric-light-godrays.html)
 *
 * Nvidia, GPU Gems 3, 2008:
 *  [Chapter 13. Volumetric Light Scattering as a Post-Process](
 *  https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch13.html)
 */

/**
 * A luminosity shader material.
 *
 * This shader produces a greyscale luminance map. It can also be configured to
 * output colours that are scaled with their respective luminance value.
 * Additionally, a range may be provided to mask out undesired texels.
 *
 * The alpha channel will remain unaffected in all cases.
 *
 * Luminance range reference:
 *  https://cycling74.com/2007/05/23/your-first-shader/#.Vty9FfkrL4Z
 */

/**
 * A pixelation shader material.
 *
 * Original shader code by Robert Casanova:
 *  https://github.com/robertcasanova/pixelate-shader
 */

/**
 * A shock wave shader material.
 *
 * Based on a Gist by Jean-Philippe Sarda:
 *  https://gist.github.com/jpsarda/33cea67a9f2ecb0a0eda
 */

/**
 * Subpixel Morphological Antialiasing.
 *
 * This material is used to render the final antialiasing.
 */

/**
 * Subpixel Morphological Antialiasing.
 *
 * This material detects edges in a color texture.
 */

/**
 * Subpixel Morphological Antialiasing.
 *
 * This material computes weights for detected edges.
 */

/**
 * Full-screen tone-mapping shader material.
 *
 * Reference:
 *  http://www.cis.rit.edu/people/faculty/ferwerda/publications/sig02_paper.pdf
 */

/**
 * A collection of shader materials that are used in the post processing passes.
 *
 * @module postprocessing/materials
 */

/**
 * An abstract pass.
 *
 * Passes that do not rely on the depth buffer should explicitly disable the
 * depth test and depth write in their respective shader materials.
 *
 * This class implements a {@link Pass#dispose} method that frees memory on
 * demand.
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

/**
 * A blur pass.
 */

/**
 * A bloom pass.
 *
 * This pass renders a scene with superimposed blur by utilising the fast Kawase
 * convolution approach.
 */

/**
 * A Depth of Field (DoF) pass using a bokeh shader.
 *
 * This pass requires a {@link EffectComposer#depthTexture}.
 */

/**
 * An advanced Depth of Field (DoF) pass.
 *
 * Yields more realistic results but is also more demanding.
 *
 * This pass requires a {@link EffectComposer#depthTexture}.
 */

/**
 * Used for saving the original clear color of the renderer.
 *
 * @type Color
 * @private
 * @static
 */

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

/**
 * A pass that disables the stencil mask.
 */

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

/**
 * A dot screen pass.
 */

/**
 * A depth pass.
 *
 * Reads the depth from a depth texture and renders it.
 *
 * This pass requires a {@link EffectComposer#depthTexture}.
 */

/**
 * A film pass.
 *
 * Provides various cinematic effects.
 */

/**
 * Returns a random integer in the specified range.
 *
 * @private
 * @static
 * @param {Number} low - The lowest possible value.
 * @param {Number} high - The highest possible value.
 * @return {Number} The random value.
 */

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

/**
 * A pass that renders a given scene directly on screen or into the read buffer
 * for further processing.
 */

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

/**
 * A crepuscular rays pass.
 */

/**
 * A mask pass.
 */

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

/**
 * A pixelation pass.
 */

/**
 * A pass that renders the result from a previous pass to another render target.
 */

/**
 * A shader pass.
 *
 * Used to render any shader material as a 2D filter.
 */

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

/**
 * A vector.
 *
 * @type {Vector3}
 * @private
 * @static
 * @final
 */

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
 * Subpixel Morphological Antialiasing (SMAA) v2.8.
 *
 * Preset: SMAA 1x Medium (with color edge detection).
 *  https://github.com/iryoku/smaa/releases/tag/v2.8
 */

/**
 * A pass that renders a given texture.
 */

/**
 * A tone mapping pass that supports adaptive luminosity.
 *
 * If adaptivity is enabled, this pass generates a texture that represents the
 * luminosity of the current scene and adjusts it over time to simulate the
 * optic nerve responding to the amount of light it is receiving.
 *
 * Reference:
 *  GDC2007 - Wolfgang Engel, Post-Processing Pipeline
 *  http://perso.univ-lyon1.fr/jean-claude.iehl/Public/educ/GAMA/2007/gdc07/Post-Processing_Pipeline.pdf
 */

/**
 * A compilation of the post processing passes.
 *
 * @module postprocessing/passes
 */

/**
 * The EffectComposer may be used in place of a normal WebGLRenderer.
 *
 * The auto clear behaviour of the provided renderer will be disabled to prevent
 * unnecessary clear operations.
 *
 * It is common practice to use a {@link RenderPass} as the first pass to
 * automatically clear the screen and render the scene to a texture for further
 * processing.
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

/**
 * @class VirtualMouseModule
 * @category modules/app
 * @param {Boolean} [globalMovement=false]
 * @memberof module:modules/app
 * @extends Events
 */

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

      var nested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var isHovered = false;

      this.on('move', function () {
        if (_this3.hovers(component, nested)) {
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
    value: function intersection(_ref) {
      var native = _ref.native;
      var nested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (native.children.length > 0 && nested) {
        var objects = [];
        native.traverse(function (child) {
          return objects.push(child);
        });

        return this.raycaster.intersectObjects(objects);
      }

      return this.raycaster.intersectObject(native);
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
      var nested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return this.intersection(component, nested).length > 0;
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

/**
 * @class FogModule
 * @category modules/app
 * @param {Object} [params={color: 0xefd1b5, density: 0.020, near: 10, far: 1000}] - The parameters object.
 * @param {String} [type=exp2] - The type of fog - exp2 or linear
 * @memberof module:modules/app
 * @example <caption>How to create and apply a FogModule</caption>
 * const fogModule = new FogModule({
 *    color: 0xffffff,
 *    density: 0.03,
 *    near: 20,
 *    far: 200
 *  }, 'exp2');
 *
 * new App([
 *  ...,
 *  fogModule
 * ]);
 */

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

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

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

/**
 * @class AnimationModule
 * @category modules/mesh
 * @description Convenience module that wraps the <a href='https://threejs.org/docs/#manual/introduction/Animation-system'>three.js animation system</a>
 * @param {App} app - the app
 * @param {Boolean} [isDeferred=false] - set to true if animation should not start automatically
 * @param {Object} [params={speed: 1}] - the params
 * @memberof module:modules/mesh
 * @example <caption>Create animation module and play a given clip of an imported model</caption>
 * const animationModule = new AnimationModule(app, false, {
 *   speed: 1.2 // speed up animation by 20%
 * });
 *
 * new Importer({
 *   parser(geometry, materials) {
 *     // Override parse to generate a skinnedMesh, needed for skinned models
 *     return new THREE.SkinnedMesh(geometry, materials);
 *   },
 *
 *   url: `path/to/model.json`,
 *   useCustomMaterial: true,
 *
 *   material: new THREE.MeshStandardMaterial({
 *     skinning: true
 *   }),
 *
 *   modules: [animationModule]
 * }).addTo(app).then(() => {
 *   // adding model to app returns a promise, so pipe the function to kick off the animation clip
 *   animationModule.play('clipName');
 * });
 */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vc3JjL3V0aWxzL3RyYW5zZm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvbWluaXZlbnRzL2Rpc3QvbWluaXZlbnRzLmNvbW1vbmpzLmpzIiwiLi4vc3JjL2NvcmUvZXJyb3JzLmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlU3lzdGVtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyQXJnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21wb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2luZGV4LmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlTWFuYWdlci5qcyIsIi4uL3NyYy9jb3JlL0NvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL3Byb3RvdHlwZS9hdHRyaWJ1dGVzLmpzIiwiLi4vc3JjL2NvcmUvTWVzaENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0xpZ2h0Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvcmUvQ2FtZXJhQ29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3ByZXNlbnQvbGliL3ByZXNlbnQtbm9kZS5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9BbWJpZW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9IZW1pc3BoZXJlTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvUG9pbnRMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9TcG90TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQXJlYUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9DdWJlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9PcnRob2dyYXBoaWNDYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Cb3guanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ2lyY2xlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NvbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ3lsaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvRG9kZWNhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0V4dHJ1ZGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSWNvc2FoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGF0aGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGluZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9PY3RhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BhcmFtZXRyaWMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUGxhbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUG9seWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9SaW5nLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NoYXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NwaGVyZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXRyYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXh0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVza25vdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UdWJlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0dyb3VwLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0VsZW1lbnRNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1NjZW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2FkYXB0aXZlLWx1bWlub3NpdHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9ib2tlaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2Jva2VoMi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvbWJpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9jb252b2x1dGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvcHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9kZXB0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2RvdC1zY3JlZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9maWxtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvZ2xpdGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvZ29kLXJheXMuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9sdW1pbm9zaXR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvcGl4ZWxhdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL3Nob2NrLXdhdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9zbWFhLWJsZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvc21hYS1jb2xvci1lZGdlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL3NtYWEtd2VpZ2h0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL3RvbmUtbWFwcGluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvcGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2JsdXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9ibG9vbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2Jva2VoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvYm9rZWgyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvY2xlYXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9jbGVhci1tYXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvZG90LXNjcmVlbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2RlcHRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvZmlsbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dsaXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3JlbmRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dvZC1yYXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvbWFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3BpeGVsYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zYXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hhZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hvY2std2F2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3NtYWEuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy90ZXh0dXJlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvdG9uZS1tYXBwaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL2NvcmUvZWZmZWN0LWNvbXBvc2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Qb3N0UHJvY2Vzc29yTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0V2ZW50c1BhdGNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1ZpcnR1YWxNb3VzZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Gb2dNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvU3RhdGVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvbGliL1RocmVlT3JiaXRDb250cm9scy5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9PcmJpdENvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9EeW5hbWljR2VvbWV0cnlNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL1RleHR1cmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL0FuaW1hdGlvbk1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIi4uL3NyYy9kZXByZWNhdGlvbi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZXh0ZW5kID0gKG9iamVjdCwgLi4uZXh0ZW5zaW9ucykgPT4geyAvLyAkLmV4dGVuZCBhbHRlcm5hdGl2ZSwgLi4uIGlzIHRoZSBzcHJlYWQgb3BlcmF0b3IuXG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhleHRlbnNpb24pO1xuICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBleHRlbnNpb24pO1xuXG4gICAgaWYgKCFleHRlbnNpb24pXG4gICAgICBjb250aW51ZTsgLy8gSWdub3JlIG51bGwgYW5kIHVuZGVmaW5lZCBvYmplY3RzIGFuZCBwYXJhbWV0ZXJzLlxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4dGVuc2lvbikpIHsgLy8gRG8gbm90IHRyYXZlcnNlIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICBpZiAob2JqZWN0W3Byb3BdICE9PSB1bmRlZmluZWQgJiYgZXh0ZW5zaW9uW3Byb3BdXG4gICAgICAgICYmIG9iamVjdFtwcm9wXS50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAmJiBleHRlbnNpb25bcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgLy8gR29lcyBkZWVwIG9ubHkgaWYgb2JqZWN0W3Byb3BdIGFuZCBleHRlbnNpb25bcHJvcF0gYXJlIGJvdGggb2JqZWN0cyAhXG4gICAgICAgIGlmIChleHRlbnNpb25bcHJvcF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkgZXh0ZW5kKG9iamVjdFtwcm9wXSwgZXh0ZW5zaW9uW3Byb3BdKTtcbiAgICAgICAgZWxzZSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF07XG4gICAgICB9IGVsc2VcbiAgICAgICAgb2JqZWN0W3Byb3BdID0gdHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgPyBleHRlbnNpb25bcHJvcF0gOiBvYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXS5zbGljZSgpOyAvLyBBZGQgdmFsdWVzIHRoYXQgZG8gbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsImV4cG9ydCBjb25zdCBpbnN0cnVjdCA9IChhcnJheSwgaW5zdEFycmF5KSA9PiB7XG4gIGNvbnN0IHRlbXBPYmplY3QgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdEFycmF5Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgY29uc3QgZ3VpZGUgPSBpbnN0QXJyYXlbaV07XG5cbiAgICB0ZW1wT2JqZWN0W2d1aWRlXSA9IGFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBPYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtRGF0YSA9IChvYmplY3QsIGluc3RydWN0aW9ucykgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0cnVjdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkpXG4gICAgICBvYmplY3Rba2V5XSA9IGluc3RydWN0KG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gICAgZWxzZSBpZiAob2JqZWN0W2tleV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgIShBcnJheS5pc0FycmF5KGluc3RydWN0aW9uc1trZXldKSkpXG4gICAgICBvYmplY3Rba2V5XSA9IHRyYW5zZm9ybURhdGEob2JqZWN0W2tleV0sIGluc3RydWN0aW9uc1trZXldKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdG9BcnJheSA9IChvYmplY3QsIGluc3RydWN0aW9uKSA9PiB7XG4gIGNvbnN0IHRlbXBBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnN0cnVjdGlvbi5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdHJ1Y3Rpb25baV07XG5cbiAgICB0ZW1wQXJyYXlbaV0gPSBvYmplY3RbZ3VpZGVdO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGNvbXBvbmVudCk7XG5cbiAgICB0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY3lFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgYWN0aXZlTW9kdWxlLCBkZXBlbmRlbmN5TW9kdWxlID0gZmFsc2UpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcbiAgICBpZiAoY29uc29sZSAmJiBkZXBlbmRlbmN5TW9kdWxlKSBjb25zb2xlLmVycm9yKCdEZXBlbmRlbmN5IHB1Ymxpc2hlZCBieSBtb2R1bGU6JywgZGVwZW5kZW5jeU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnRGVwZW5kZW5jeUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQsIGFjdGl2ZU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdDb21wb25lbnQ6JywgY29tcG9uZW50KTtcbiAgICBpZiAoY29uc29sZSAmJiBhY3RpdmVNb2R1bGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcblxuICAgIHRoaXMubmFtZSA9ICdNYW5hZ2VyRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge01hbmFnZXJFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgcjg0LiBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG4vKipcbiAqIEBjbGFzcyBNb2R1bGVTeXN0ZW1cbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gIFByb3ZpZGVzIEFQSSBmb3IgY2xhc3NlcyB0aGF0IHdpbGwgdXNlIE1vZHVsZXMuPGJyLz5cbiAqIFRoaXMgY2xhc3MgaW5jbHVkZXMgYmFzaWMgZXZlbnQgc3lzdGVtIHdpdGggdGhvc2Ugc3VwcG9ydGVkIG1ldGhvZHM6XG4gKiA8cHJlPi5vbigpPC9wcmU+PHByZT4ub2ZmKCk8L3ByZT48cHJlPi5lbWl0KCk8L3ByZT5cbiAqIEBleHRlbmRzIEV2ZW50c1xuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0gZXh0ZW5kcyBFdmVudHMge1xuICAvLyBJTlRFR1JBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGludGVncmF0ZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBhcHBsaWVzIGFsbCBtb2R1bGVzIGZyb20gLm1vZHVsZXMgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2VdIElmIHNvdXJjZSAoc2hvdWxkIGJlIGEgY29tcG9uZW50KSBpcyBwcm92aWRlZCwgd2lsbCByZXBsYWNlIC5tb2R1bGVzIHdpdGggc291cmNlJ3Mgb25lIGJlZm9yZSBleGVjdXRpbmcgbW9kdWxlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpIHtcbiAgICBpZiAoIXRoaXMubW9kdWxlcykgcmV0dXJuO1xuICAgIGlmIChzb3VyY2UpIHRoaXMubW9kdWxlcyA9IHNvdXJjZS5tb2R1bGVzLnNsaWNlKDApO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKylcbiAgICAgIHRoaXMuYXBwbHlNb2R1bGUodGhpcy5tb2R1bGVzW2ldLCBmYWxzZSk7XG5cbiAgICBpZiAoc291cmNlKSB0aGlzLmFwcGx5QnJpZGdlKHtvbkNvcHk6IHNvdXJjZX0pO1xuICB9XG5cbiAgLy8gQVBQTFlJTkcgTU9EVUxFICguLi5hbmQgYSBcImJyaWRnZVwiIGZvciBtb2R1bGUpXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlCcmlkZ2VcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlcyBjb21wb25lbnQtc3BlY2lmaWMgQVBJIHRvIHdvcmsgd2l0aCBtb2R1bGVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYnJpZGdlTWFwXG4gICAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBvYmplY3Qgd2l0aCBtb2RpZmllZCB2YWx1ZXMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGFwcGx5QnJpZGdlKGJyaWRnZU1hcCA9IHt9KSB7XG4gICAgY29uc3QgbW9kdWxlcyA9IHRoaXMubW9kdWxlcztcbiAgICBpZiAoIW1vZHVsZXMpIHJldHVybiBicmlkZ2VNYXA7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gbW9kdWxlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gYnJpZGdlTWFwKSB7XG4gICAgICAgIGlmIChicmlkZ2VNYXBba2V5XSkge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXNbaV07XG5cbiAgICAgICAgICBpZiAobW9kdWxlICYmIG1vZHVsZS5icmlkZ2UgJiYgbW9kdWxlLmJyaWRnZVtrZXldKVxuICAgICAgICAgICAgYnJpZGdlTWFwW2tleV0gPSBtb2R1bGUuYnJpZGdlW2tleV0uYXBwbHkodGhpcywgW2JyaWRnZU1hcFtrZXldLCBtb2R1bGVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBicmlkZ2VNYXA7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUNvbW1hbmRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiAuYXBwbHlDb21tYW5kIHJ1bnMgYSBtZXRob2QgY2FsbGVkIGBuYW1lYCBvbiBhbGwgbW9kdWxlcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgdGhlIG1ldGhvZCBuYW1lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2I9KGZ1bmMsIG1vZHVsZVNjb3BlKSA9PiBmdW5jLmFwcGx5KHRoaXMsIFttb2R1bGVTY29wZV0pXSBIb3cgdGhlIGZ1bmN0aW9uIGlzIHdyYXBwZWQvXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGFwcGx5Q29tbWFuZChuYW1lLCBjYiA9IChmdW5jLCBtb2R1bGVTY29wZSkgPT4gZnVuYy5hcHBseSh0aGlzLCBbbW9kdWxlU2NvcGVdKSkge1xuICAgIGNvbnN0IG1vZHVsZXMgPSB0aGlzLm1vZHVsZXM7XG4gICAgaWYgKCFtb2R1bGVzKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gbW9kdWxlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlc1tpXTtcbiAgICAgIGlmIChuYW1lIGluIG1vZHVsZSkgY2IobW9kdWxlW25hbWVdLCBtb2R1bGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5TW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gLmFwcGx5TW9kdWxlIGlzIGFsc28gdXNlZCBpbiAuaW50ZWdyYXRlTW9kdWxlcygpIGZ1bmN0aW9uLlxuICAgKiBJdCBkb2VzIGV4YWN0bHkgd2hhdCBpdHMgbmFtZSBzYXlzIChhcHBsaWVzIG1vZHVsZSB0byBjb21wb25lbnQgb3IgYXBwKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGFwcGx5XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3B1c2g9dHJ1ZV1cbiAgICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIG1vZHVsZSB0aGF0IHdhcyBhcHBsaWVkLlxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGFwcGx5TW9kdWxlKG1vZHVsZSwgcHVzaCA9IHRydWUpIHtcbiAgICBpZiAoIW1vZHVsZSkgcmV0dXJuO1xuICAgIGlmIChwdXNoICYmIHRoaXMubW9kdWxlcykgdGhpcy5tb2R1bGVzLnB1c2gobW9kdWxlKTtcbiAgICBlbHNlIGlmIChwdXNoKSB0aGlzLm1vZHVsZXMgPSBbbW9kdWxlXTtcblxuICAgIGlmICh0aGlzLm1hbmFnZXIpIHRoaXMubWFuYWdlci5hY3RpdmUobW9kdWxlKTtcblxuICAgIGlmIChtb2R1bGUubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIpIG1vZHVsZS5tYW5hZ2VyKHRoaXMubWFuYWdlcik7XG4gICAgZWxzZSBpZiAobW9kdWxlLm1hbmFnZXIpIHtcbiAgICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAgICdDb21wb25lbnQnLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzIE1vZHVsZU1hbmFnZXIgdGhhdCBpcyB0dXJuZWQgb2ZmIGZvciB0aGlzIGNvbXBvbmVudGAsXG4gICAgICAgIHRoaXMsIG1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLmludGVncmF0ZSkgbW9kdWxlLmludGVncmF0ZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwb3NlcyBvZiBhbGwgbW9kdWxlc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlcygpIHtcbiAgICB3aGlsZSAodGhpcy5tb2R1bGVzLmxlbmd0aClcbiAgICAgIHRoaXMuZGlzcG9zZU1vZHVsZSh0aGlzLm1vZHVsZXNbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIHRoZSBnaXZlbiBtb2R1bGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGRpc3Bvc2VcbiAgICogQHJldHVybiB7TW9kdWxlfSBSZXR1cm5zIG1vZHVsZSB0aGF0IHdhcyByZW1vdmVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlKG1vZHVsZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG5cbiAgICB0aGlzLm1vZHVsZXMuc3BsaWNlKHRoaXMubW9kdWxlcy5pbmRleE9mKG1vZHVsZSksIDEpO1xuXG4gICAgaWYgKG1vZHVsZS5kaXNwb3NlKSBtb2R1bGUuZGlzcG9zZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLy8gUElQRUQgTUVUSE9EXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgbW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gcGlwZWQgdmVyc2lvbiBvZiAuYXBwbHlNb2R1bGUoKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGFwcGx5XG4gICAqIEByZXR1cm4ge3RoaXN9IHJldHVybnMgdGhpcyAtIGFwcC9jb21wb25lbnRcbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlBpcGVkIG1vZHVsZXM8L2NhcHRpb24+XG4gICAqIGNvbXBvbmVudFxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTEoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUyKCkpXG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMygpKVxuICAgKi9cbiAgbW9kdWxlKG1vZHVsZSkge1xuICAgIHRoaXMuYXBwbHlNb2R1bGUobW9kdWxlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRQcm90b3R5cGU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG5leHBvcnQgdmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAgICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gICAqXG4gICAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAgICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICAgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICAgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICAgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gICAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gICAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAgICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAgICpcbiAgICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAgICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICAgKi9cbn07ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59IiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn0iLCIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59IiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9OyIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7RGVwZW5kZW5jeUVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIE1vZHVsZU1hbmFnZXJcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IGhhbmRsZXJcbiAqIEBkZXNjcmlwdGlvbiAgU29sdmVzIG1vZHVsZXMgZGVwZW5kZW5jaWVzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZHVsZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBvYmplY3Q7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcblxuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZSgoc3RhdGUgPSBbe30sICcnXSwgYWN0aW9uKSA9PiB7XG4gICAgICBzdGF0ZVswXVthY3Rpb24ua2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgc3RhdGVbMV0gPSBhY3Rpb24ua2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vZHVsZXMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFjdGl2ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgLmN1cnJlbnRNb2R1bGUgdG8gcHJvdmlkZWQgbW9kdWxlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gbWFrZSBjdXJyZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhY3RpdmUobW9kdWxlKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXQncyAuY3VycmVudE1vZHVsZSB0byBudWxsLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmluZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZSB0aGUgbW9kdWxlIGluIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBkZWZpbmUobmFtZSkge1xuICAgIHRoaXMubW9kdWxlc1tuYW1lXSA9IHRoaXMuY3VycmVudE1vZHVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVzZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgZGVmaW5lZCBtb2R1bGUgZnJvbSBtYW5hZ2VyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBtb2R1bGUgbmFtZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgdXNlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVzW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQW4gYWxpYXMgZm9yIC5hZGQoKSA8YnIvPjxici8+XG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3Uga25vdyB0aGF0IHlvdSB3aWxsIG92ZXJ3cml0ZSBleGlzdGluZyBkZXBlbmRlbmN5Ljxici8+XG4gICAqIFVzZSBpdCBpbiB5b3VyIGFwcCwgYnV0IG5vdCBpbiBtb2R1bGUgdGhhdCB5b3UgcHJvdmlkZSB0byBvdGhlciBwZW9wbGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSB0aGUgdmFsdWUgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHNldChrZXksIGRhdGEpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdBREQnLFxuICAgICAga2V5LFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyBkZXBlbmRlbmN5IGluIHN0b3JlIG9iamVjdCwgYnkga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7T2JqZWN0fE1vZHVsZX1cbiAgICogQHRocm93cyB7RGVwZW5kZW5jeUVycm9yfSBpZiBkZXBlbmRlbmN5IGlzIG5vdCBpbiB0aGUgc3RvcmVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuZ2V0KCdoZWxsbycpOyAvLyAtPiB7d29ybGQ6IHRydWV9XG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgaWYgKCF0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XSkge1xuICAgICAgdGhyb3cgbmV3IERlcGVuZGVuY3lFcnJvcihcbiAgICAgICAgJ01vZHVsZU1hbmFnZXInLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzICcke2tleX0nIGRlcGVuZGVuY3lgLFxuICAgICAgICB0aGlzLmN1cnJlbnRNb2R1bGVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaGFzXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB3aGV0aGVyIG1hbmFnZXIgaGFzIGEgZGVwZW5kZW5jeSB3aXRoIHRoZSBnaXZlbiBrZXlcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNoZWNrIHdoZXRoZXIgdGhlIHN0b3JlIGhhcyB0aGUgJ2hlbGxvJyBkZXBlbmRlbmN5PC9jYXB0aW9uPlxuICAgKiBtYW5hZ2VyLmhhcygnaGVsbG8nKTsgLy8gLT4gdHJ1ZVxuICAgKi9cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgZGVwc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW2RlcHNNYXA9e31dXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1cGRhdGUoZGVwc01hcCA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBkZXBzTWFwW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkXG4gICAqIEBhbGlhcyBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyI3NldFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgYWRkKC4uLmRhdGEpIHtcbiAgICBjb25zb2xlLndhcm4oJy5hZGQoKSBtZXRob2QgaXMgZGVwcmVjYXRlZC4gVXNlIC5zZXQoKSBpbnN0ZWFkJyk7XG4gICAgcmV0dXJuIHRoaXMuc2V0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVxdWlyZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJlcXVpcmUgbW9kdWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIERlZmluZWQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2R1bGVFeGVjdXRvciBGdW5jdGlvbiB0aGF0IHJldHVybnMgYXBwbGllZCBtb2R1bGVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHJlcXVpcmUobmFtZSwgbW9kdWxlRXhlY3V0b3IpIHtcbiAgICBpZiAodGhpcy51c2UobmFtZSkgPT09IHVuZGVmaW5lZCkgdGhpcy5oYW5kbGVyLmFwcGx5TW9kdWxlKG1vZHVsZUV4ZWN1dG9yKCkpO1xuICB9XG59XG4iLCJpbXBvcnQge2V4dGVuZCwgdHJhbnNmb3JtRGF0YX0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbmltcG9ydCB7TWFuYWdlckVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge1xuICAgKiAgIG1vZHVsZXM6IFtdLFxuICAgKiAgIG1hbmFnZXI6IHRydWVcbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIG1vZHVsZXM6IG51bGwsXG4gICAgbWFuYWdlcjogdHJ1ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHt9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge307XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHByb21pc2VzIHRoYXQgc2hvdWxkIGJlIHJlc29sdmVkIGJlZm9yZSBDb21wb25lbnQgaXMgcmVhZHkuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjX3dhaXRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF93YWl0ID0gW107IC8vIENvbGxlY3Rpb24gb2YgcHJvbWlzZXM7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgYG1vZHVsZXNgLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I21vZHVsZXNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbW9kdWxlcyA9IFtdOyAvLyBDb2xsZWN0aW9uIG9mIG1vZHVsZXM7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgYGNoaWxkYCBDb21wb25lbnRzLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2NoaWxkcmVuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNoaWxkcmVuID0gW107IC8vIEZvciBrZWVwaW5nIGNoaWxkcmVuIGNvbXBvbmVudHM7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGRlZmF1bHRzID0gQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIEFwcGx5IHBvbHlmaWxsZWQgcGFyYW1ldGVycyB0byAucGFyYW1zO1xuICAgIHRoaXMucGFyYW1zID0gZXh0ZW5kKHRyYW5zZm9ybURhdGEocGFyYW1zLCBpbnN0cnVjdGlvbnMpLCBkZWZhdWx0cyk7XG4gICAgaWYgKHRoaXMucGFyYW1zLm1hbmFnZXIpIHRoaXMubWFuYWdlciA9IG5ldyBNb2R1bGVNYW5hZ2VyKCk7XG5cbiAgICB0aGlzLm1vZHVsZXMgPSB0aGlzLnBhcmFtcy5tb2R1bGVzO1xuXG4gICAgdGhpcy5pbnRlZ3JhdGVNb2R1bGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3YWl0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV2FpdCBmb3IgYSBwcm9taXNlLlxuICAgKiBAcGFyYW0ge1Byb21pc2V9IFtwcm9taXNlXSAtIFRoZSBwcm9taXNlIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHRvIGEgcXVldWUuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHdhaXQocHJvbWlzZSkge1xuICAgIGlmIChwcm9taXNlKSB0aGlzLl93YWl0LnB1c2gocHJvbWlzZSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX3dhaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmZXJcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlIGBmdW5jYCAoQ2FsbGJhY2spIHdoZW4gQ29tcG9uZW50IGlzIHJlYWR5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gQ2FsbGJhY2suXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGRlZmVyKGZ1bmMpIHtcbiAgICBpZiAodGhpcy5pc0RlZmZlcmVkKSB0aGlzLndhaXQoKS50aGVuKCgpID0+IGZ1bmModGhpcykpO1xuICAgIGVsc2UgZnVuYyh0aGlzKTtcbiAgfVxuXG4gIC8vIFBBUkFNRVRFUlNcblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVQYXJhbXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGVzIHBhcmFtZXRlcnMgb2YgdGhlIENvbXBvbmVudC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBQYXJhbXMgb2YgdGhpcyBDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgdXBkYXRlUGFyYW1zKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBleHRlbmQocGFyYW1zLCB0aGlzLnBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgLy8gQ09QWUlORyAmIENMT05JTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENsb25lIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm4ge29iamVjdH0gYSBjbG9uZWQgY29tcG9uZW50IHdpdGggYWxsIGl0cyBzb3VyY2UgY29tcG9uZW50JyBwYXJhbXMgY29waWVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5wYXJhbXMpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgbmF0aXZlIGFuZCBpbnRlZ3JhdGUgYG1vZHVsZXNgIHRvIGl0LlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gc291cmNlIC0gU291cmNlIGNvbXBvbmVudCB0aGF0IGlzIHVzZWQgZm9yIGBjb3B5KClgIGFjdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZV0gLSBDYWxsYmFjayBleGVjdXRlZCBiZWZvcmUgbW9kdWxlcyBpbnRlZ3JhdGlvbiBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHt0aGlzfSBDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UsIGN1c3RvbWl6ZSkge1xuICAgIHRoaXMucGFyYW1zID0gey4uLnNvdXJjZS5wYXJhbXN9O1xuXG4gICAgaWYgKHNvdXJjZS5uYXRpdmUpIHRoaXMubmF0aXZlID0gc291cmNlLm5hdGl2ZS5jbG9uZShzb3VyY2UucGFyYW1zKTtcbiAgICBpZiAoY3VzdG9taXplKSBjdXN0b21pemUoKTtcbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoc291cmNlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGEgY2hpbGQgYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgYWRkZWQgYXMgYSBgY2hpbGRgLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBkb25lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBhZGQob2JqZWN0KSB7XG4gICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtuYXRpdmV9ID0gb2JqZWN0O1xuICAgICAgICBpZiAoIW5hdGl2ZSkgcmVqZWN0KCk7XG5cbiAgICAgICAgY29uc3QgYWRkUHJvbWlzZSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe29uQWRkOiBvYmplY3R9KS5vbkFkZDtcblxuICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5hZGQobmF0aXZlKTtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWRkUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIGFkZFByb21pc2UudGhlbihyZXNvbHZlcik7XG4gICAgICAgIGVsc2UgcmVzb2x2ZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlIGEgY2hpbGQgYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgYSAqKmNoaWxkKiogb2YgdGhpcyBDb21wb25lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHJlbW92ZShvYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLm5hdGl2ZS5yZW1vdmUob2JqZWN0Lm5hdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRUb1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYHRoaXNgIENvbXBvbmVudCB0byBzcGVjaWZpZWQgYEFwcGAvYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCB3aWxsIGJlIGEgcGFyZW50IG9mIGB0aGlzYC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgYWRkVG8ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBvYmplY3QgaXMgYGFzeW5jYCAoYHdhaXRgIHByb21pc2VzIGFyZSBtb3JlIHRoYW4gYDBgKS5cbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2lzRGVmZmVyZWRcbiAgICovXG4gIGdldCBpc0RlZmZlcmVkKCkge1xuICAgIHJldHVybiB0aGlzLl93YWl0Lmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYE1vZHVsZU1hbmFnZXJgIHVzZWQgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKiBAbWVtYmVyIHtNb2R1bGVNYW5hZ2VyfSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbWFuYWdlclxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqL1xuICBnZXQgbWFuYWdlcigpIHtcbiAgICBpZiAodGhpcy5fbWFuYWdlcikgcmV0dXJuIHRoaXMuX21hbmFnZXI7XG5cbiAgICB0aHJvdyBuZXcgTWFuYWdlckVycm9yKFxuICAgICAgJ0NvbXBvbmVudCcsXG4gICAgICBgTW9kdWxlTWFuYWdlciBpcyBub3QgdXNlZCBpbiB0aGlzIGNvbXBvbmVudC4gJ21hbmFnZXInIHBhcmFtZXRlciBzaG91bGQgYmUgc2V0IGFzICd0cnVlJ2AsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIHNldCBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICB0aGlzLl9tYW5hZ2VyID0gbWFuYWdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgbmF0aXZlYCBvYmplY3QgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I25hdGl2ZVxuICAgKi9cbiAgZ2V0IG5hdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlO1xuICB9XG5cbiAgc2V0IG5hdGl2ZShtZXNoKSB7XG4gICAgdGhpcy5fbmF0aXZlID0gbWVzaDtcbiAgICB0aGlzLl9uYXRpdmUuY29tcG9uZW50ID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENvbXBvbmVudFxufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGVzKC4uLm1hcHBlcnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1hcHBlciA9IG1hcHBlcnNbaV07XG5cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWFwcGVyLm1hcC5sZW5ndGg7IGsrKykge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBtYXBwZXIubWFwW2tdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQucHJvdG90eXBlLCBhdHRyaWJ1dGUsIHtcbiAgICAgICAgICBnZXQ6IG1hcHBlci5nZXR0ZXIoYXR0cmlidXRlKSxcbiAgICAgICAgICBzZXQ6IG1hcHBlci5zZXR0ZXIoYXR0cmlidXRlKSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IG1hcHBlci5jb25maWd1cmFibGUsXG4gICAgICAgICAgZW51bWVyYWJsZTogbWFwcGVyLmVudW1lcmFibGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weSguLi5tYXApIHtcbiAgcmV0dXJuIHtcbiAgICBtYXAsXG4gICAgZ2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVtuYW1lXTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBzZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLm5hdGl2ZVtuYW1lXS5jb3B5KHZhbHVlKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWlycm9yKC4uLm1hcCkge1xuICByZXR1cm4ge1xuICAgIG1hcCxcbiAgICBnZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlW25hbWVdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlW25hbWVdID0gdmFsdWU7XG4gICAgICB9O1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfTtcbn1cbiIsImltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5LCBtaXJyb3J9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3NjYWxlJyksXG4gIG1pcnJvcignbWF0ZXJpYWwnLCAnZ2VvbWV0cnknKVxuKVxuLyoqXG4gKiBAY2xhc3MgTWVzaENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqICAgZ2VvbWV0cnk6IHt9LFxuICAgKiAgIG1hdGVyaWFsOiBmYWxzZSxcbiAgICpcbiAgICogICBzaGFkb3c6IHtcbiAgICogICAgIGNhc3Q6IHRydWUsXG4gICAqICAgICByZWNlaXZlOiB0cnVlXG4gICAqICAgfSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgc2NhbGU6IHt4OiAxLCB5OiAxLCB6OiAxfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG4gICAgZ2VvbWV0cnk6IHt9LFxuICAgIG1hdGVyaWFsOiBmYWxzZSxcblxuICAgIHNoYWRvdzoge1xuICAgICAgY2FzdDogdHJ1ZSxcbiAgICAgIHJlY2VpdmU6IHRydWVcbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHNjYWxlOiB7eDogMSwgeTogMSwgejogMX1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICAvLyBDVVNUT00gR0VPTUVUUlkgSEFORExJTkdcblxuICBzdGF0aWMgY3VzdG9tKGdlb20sIGNvbnN0cnVjdG9yID0gTWVzaCkge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAgICAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICAgICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogZ2VvbSxcbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgY29uc3RydWN0b3IoZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoZ2VvbSwgcGFyYW1zLCBjb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBuZXcgKE1lc2hDb21wb25lbnQuY3VzdG9tKGdlb20sIGNvbnN0cnVjdG9yKSkocGFyYW1zKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBNZXNoQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBNZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHRoaXMud2FpdChidWlsZCk7XG5cbiAgICAgICAgdGhpcy53YWl0KG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICAgICAgdGhpcy53cmFwKCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uYXRpdmUgPSBidWlsZDtcbiAgICAgICAgdGhpcy53YWl0KHRoaXMud3JhcCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5Q29tbWFuZCgncG9zdEludGVncmF0ZScpO1xuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICB3cmFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIFRPRE86IEZpeCBkZWZlciB3aXRoIHBoeXNpY3NcbiAgICAgIC8vIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgY29uc3Qge3Bvc2l0aW9uLCByb3RhdGlvbiwgc2NhbGUsIHNoYWRvd30gPSB0aGlzLnBhcmFtcztcblxuICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XG4gICAgICB0aGlzLnJvdGF0aW9uLnNldChyb3RhdGlvbi54LCByb3RhdGlvbi55LCByb3RhdGlvbi56KTtcbiAgICAgIHRoaXMuc2NhbGUuc2V0KHNjYWxlLngsIHNjYWxlLnksIHNjYWxlLnopO1xuXG4gICAgICB0aGlzLm5hdGl2ZS5jYXN0U2hhZG93ID0gc2hhZG93LmNhc3Q7XG4gICAgICB0aGlzLm5hdGl2ZS5yZWNlaXZlU2hhZG93ID0gc2hhZG93LnJlY2VpdmU7XG5cbiAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgLy8gfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gTWVzaENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UpIHtcbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UsICgpID0+IHtcbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIE1lc2hDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge01lc2hDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZShnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICBjb25zdCBkZXN0ID0gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG5cbiAgICBpZiAoZ2VvbWV0cnkpIGRlc3QuZ2VvbWV0cnkgPSBkZXN0Lmdlb21ldHJ5LmNsb25lKCk7XG4gICAgaWYgKG1hdGVyaWFsKSBkZXN0Lm1hdGVyaWFsID0gZGVzdC5tYXRlcmlhbC5jbG9uZSgpO1xuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTWVzaENvbXBvbmVudFxufTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weX0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAndGFyZ2V0Jylcbilcbi8qKlxuICogQGNsYXNzIExpZ2h0Q29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBMaWdodENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKlxuICAgKiAgIHNoYWRvdzoge1xuICAgKiAgICAgY2FzdDogdHJ1ZSxcbiAgICpcbiAgICogICAgIGJpYXM6IDAsXG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqXG4gICAqICAgICBtYXBTaXplOiB7XG4gICAqICAgICAgIHdpZHRoOiAxMDI0LFxuICAgKiAgICAgICBoZWlnaHQ6IDEwMjRcbiAgICogICAgIH0sXG4gICAqXG4gICAqICAgICBjYW1lcmE6IHtcbiAgICogICAgICAgbmVhcjogdHJ1ZSxcbiAgICogICAgICAgZmFyOiA0MDAsXG4gICAqICAgICAgIGZvdjogOTAsXG4gICAqXG4gICAqICAgICAgIHRvcDogMjAwLFxuICAgKiAgICAgICBib3R0b206IC0yMDAsXG4gICAqICAgICAgIGxlZnQ6IC0yMDAsXG4gICAqICAgICAgIHJpZ2h0OiAyMDBcbiAgICogICAgIH1cbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG5cbiAgICBzaGFkb3c6IHtcbiAgICAgIGNhc3Q6IHRydWUsXG5cbiAgICAgIGJpYXM6IDAsXG4gICAgICByYWRpdXM6IDEsXG5cbiAgICAgIG1hcFNpemU6IHtcbiAgICAgICAgd2lkdGg6IDEwMjQsXG4gICAgICAgIGhlaWdodDogMTAyNFxuICAgICAgfSxcblxuICAgICAgY2FtZXJhOiB7XG4gICAgICAgIG5lYXI6IHRydWUsXG4gICAgICAgIGZhcjogNDAwLFxuICAgICAgICBmb3Y6IDkwLFxuXG4gICAgICAgIHRvcDogMjAwLFxuICAgICAgICBib3R0b206IC0yMDAsXG4gICAgICAgIGxlZnQ6IC0yMDAsXG4gICAgICAgIHJpZ2h0OiAyMDBcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IExpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBMaWdodENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdMaWdodENvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuXG4gICAgICB0aGlzLndhaXQodGhpcy53cmFwKCkpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwbHlDb21tYW5kKCdwb3N0SW50ZWdyYXRlJyk7XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAnSW5zdGFuY2Ugc2hvdWxkIGhhdmUgaXRcXCdzIG93biAuYnVpbGQoKS4nLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgdHJhbnNmb3JtcyAoYHBvc2l0aW9uYCAmIGByb3RhdGlvbmApXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGNvbXBsZXRlZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbiwgcm90YXRpb259ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XG4gICAgICAgIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnopO1xuXG4gICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBTaGFkb3dcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyBzaGFkb3cgcHJvcGVydGllc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIHdyYXBTaGFkb3coKSB7XG4gICAgY29uc3Qge25hdGl2ZSwgcGFyYW1zOiB7c2hhZG93fX0gPSB0aGlzO1xuXG4gICAgbmF0aXZlLmNhc3RTaGFkb3cgPSBzaGFkb3cuY2FzdDtcbiAgICBuYXRpdmUuc2hhZG93Lm1hcFNpemUud2lkdGggPSBzaGFkb3cubWFwU2l6ZS53aWR0aDtcbiAgICBuYXRpdmUuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gc2hhZG93Lm1hcFNpemUuaGVpZ2h0O1xuICAgIG5hdGl2ZS5zaGFkb3cuYmlhcyA9IHNoYWRvdy5iaWFzO1xuICAgIG5hdGl2ZS5zaGFkb3cucmFkaXVzID0gc2hhZG93LnJhZGl1cztcblxuICAgIGNvbnN0IHNoYWRvd0NhbWVyYSA9IG5hdGl2ZS5zaGFkb3cuY2FtZXJhO1xuICAgIGNvbnN0IGNhbWVyYSA9IHNoYWRvdy5jYW1lcmE7XG5cbiAgICBzaGFkb3dDYW1lcmEubmVhciA9IGNhbWVyYS5uZWFyO1xuICAgIHNoYWRvd0NhbWVyYS5mYXIgPSBjYW1lcmEuZmFyO1xuICAgIHNoYWRvd0NhbWVyYS5mb3YgPSBjYW1lcmEuZm92O1xuXG4gICAgc2hhZG93Q2FtZXJhLmxlZnQgPSBjYW1lcmEubGVmdDtcbiAgICBzaGFkb3dDYW1lcmEucmlnaHQgPSBjYW1lcmEucmlnaHQ7XG4gICAgc2hhZG93Q2FtZXJhLnRvcCA9IGNhbWVyYS50b3A7XG4gICAgc2hhZG93Q2FtZXJhLmJvdHRvbSA9IGNhbWVyYS5ib3R0b207XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gTGlnaHRDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGFyZ2V0KSB0aGlzLnRhcmdldC5jb3B5KHNvdXJjZS50YXJnZXQoKSk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIExpZ2h0Q29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtMaWdodENvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGlnaHRDb21wb25lbnRcbn07XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHl9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3RhcmdldCcpXG4pXG4vKipcbiAqIEBjbGFzcyBDYW1lcmFDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIENhbWVyYUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGJ1aWxkOiB0cnVlLFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBDYW1lcmFDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnQ2FtZXJhQ29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHRoaXMubmF0aXZlID0gYnVpbGQ7XG5cbiAgICAgIHRoaXMud2FpdCh0aGlzLndyYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseUNvbW1hbmQoJ3Bvc3RJbnRlZ3JhdGUnKTtcbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnQ2FtZXJhQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHRoaXMucGFyYW1zLnBvc2l0aW9uLngsIHRoaXMucGFyYW1zLnBvc2l0aW9uLnksIHRoaXMucGFyYW1zLnBvc2l0aW9uLnopO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldCh0aGlzLnBhcmFtcy5yb3RhdGlvbi54LCB0aGlzLnBhcmFtcy5yb3RhdGlvbi55LCB0aGlzLnBhcmFtcy5yb3RhdGlvbi56KTtcblxuICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtvbldyYXA6IDF9KTtcblxuICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgdHJhbnNmb3JtcyAmIGV4ZWN1dGUgYENvbXBvbmVudC5jb3B5KClgXG4gICAqIEByZXR1cm4ge3RoaXN9IENhbWVyYUNvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGFyZ2V0KSB0aGlzLnRhcmdldC5jb3B5KHNvdXJjZS50YXJnZXQoKSk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIENhbWVyYUNvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7Q2FtZXJhQ29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ2FtZXJhQ29tcG9uZW50XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgcmV0dXJuIHRpbWVbMF0gKiAxZTMgKyB0aW1lWzFdIC8gMWU2O1xufTtcbiIsImltcG9ydCBwcmVzZW50IGZyb20gJ3ByZXNlbnQnO1xuXG5leHBvcnQgY29uc3Qgc3lzdGVtID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG59O1xuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZ2xvYmFsLnBlcmZvcm1hbmNlID0ge1xuICAgIG5vdzogcHJlc2VudFxuICB9O1xufVxuIiwiaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uL3BvbHlmaWxsJztcbmltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJ9IGZyb20gJy4vTW9kdWxlTWFuYWdlcic7XG5cbi8qKlxuICogQGNsYXNzIEFwcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIHByZXBhcmUgYSB3b3JsZCBzY2VuZSwgc2V0dXAgcGh5c2ljcywgY2FtZXJhLCByZW5kZXJlciBhbmQgYWxsIG90aGVyIHRoaW5ncyB0aGF0IHlvdSB1c3VhbGx5IGRvIGJlZm9yZSBtYWtpbmcgbWVzaGVzLlxuICogQHBhcmFtIHtBcnJheX0gW21vZHVsZXM9W11dIC0gQXJyYXkgb2YgTW9kdWxlc1xuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIFNpbXVsYXRlIGZsYWdcbiAgICogQGRlc2NyaXB0aW9uIFNhbWUgYXMgLnVwZGF0ZUVuYWJsZWQsIGJ1dCBmb3IgcGh5c2ljcy4gRGVmaW5lcyBpZiBwaHlzaWNzIGlzIHNpbXVsYXRlZCBlYWNoIGZyYW1lLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjc2ltdWxhdGVcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2ltdWxhdGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI3VwZGF0ZUVuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gIC8qKlxuICAgKiBMb29wcyBpbiB0aGlzIGFwcFxuICAgKiBAZGVzY3JpcHRpb24gQXJyYXkgb2YgbG9vcHMgdGhhdCBhcmUgZXhlY3V0ZWQgYnkgdGhpcyBhcHAuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5BcHAjbG9vcHNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbG9vcHMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihtb2R1bGVzID0gW10pIHtcbiAgICBjb25zb2xlLmxvZyhgV0hTLkFwcCAke3ZlcnNpb259YCk7XG5cbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFuYWdlciA9IG5ldyBNb2R1bGVNYW5hZ2VyKHRoaXMpO1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3Qge2xvb3BzLCB1cGRhdGVFbmFibGVkfSA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzKCkge1xuICAgICAgcmVxdWVzdEFuaW1GcmFtZShwcm9jZXNzKTtcbiAgICAgIGlmICghdXBkYXRlRW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGwgPSBsb29wcy5sZW5ndGg7IGkgPCBsbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGUgPSBsb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5leGVjdXRlKGUuY2xvY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gICAgcHJvY2VzcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgcmVuZGVyaW5nIGxvb3BzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRMb29wXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGxvb3AgdG8gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gYWRkXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5BZGRpbmcgYSBsb29wIHRvIGFuIGFwcDwvY2FwdGlvbj5cbiAgICogY29uc3QgbG9vcCA9IG5ldyBMb29wKCgpID0+IHtcbiAgICogIC8vIC4uLlxuICAgKiB9KTtcbiAgICpcbiAgICogY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICAgKlxuICAgKiBhcHAuYWRkTG9vcChsb29wKTtcbiAgICogbG9vcC5zdGFydCgpO1xuICAgKi9cbiAgYWRkTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5sb29wcy5wdXNoKGxvb3ApO1xuICAgICAgcmVzb2x2ZShsb29wKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZUxvb3BcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgbG9vcCBmcm9tIHRoaXMgYXBwLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbG9vcCAtIHRoZSBsb29wIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHJlbW92ZUxvb3AobG9vcCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb29wcy5pbmRleE9mKGxvb3ApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkgdGhpcy5sb29wcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0KGtleSk7XG4gIH1cblxuICB1c2Uoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci51c2Uoa2V5KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcHBcbn07XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIExvb3BcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZWFjaCBhbmltYXRpb24gZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNsb2NrPXRydWVdIHBhc3NlcyBhIENsb2NrIHRvIHRoZSBmdW5jdGlvbiB3aGVuIGNhbGxlZCwgaWYgdHJ1ZVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3RvcihmdW5jLCB1c2VDbG9jayA9IHRydWUpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuY2xvY2sgPSB1c2VDbG9jayA/IG5ldyBDbG9jaygpIDogbnVsbDtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIENPTlRST0xTXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydHMgdGhpcyBsb29wLCBjbG9jayBpZiBpdCBoYXMgb25lLiBXb24ndCBkbyBhbnl0aGluZyBpZiBsb29wIGVuYWJsZWQgYWxyZWFkeS5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IFt3b3JsZF0gYXBwIHRvIGFkZCB0aGlzIGxvb3AgdG8sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RhcnQod29ybGQpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLmFkZExvb3AodGhpcyk7XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgdGhpcyBsb29wIGFuZCBpdHMgY2xvY2sgaWYgaXQgaGFzIG9uZSwgd29uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBsb29wIGlzIG5vdCBlbmFibGVkKVxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gcmVtb3ZlIHRoaXMgbG9vcCBmcm9tLCBpZiBwcm92aWRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICovXG4gIHN0b3Aod29ybGQpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuY2xvY2spIHRoaXMuY2xvY2suc3RvcCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHdvcmxkKSB3b3JsZC5yZW1vdmVMb29wKHRoaXMpO1xuICB9XG5cbiAgLy8gRVhFQ1VUSU9OXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZXhlY3V0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3BcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICogQHJldHVybnMgeyp9IHdoYXRldmVyIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3AgcmV0dXJuc1xuICAgKi9cbiAgZXhlY3V0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mdW5jKHRoaXMuY2xvY2spO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExvb3Bcbn07XG4iLCIvKiogQG1vZHVsZSBjb3JlICovXG5leHBvcnQgKiBmcm9tICcuL0NvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL01lc2hDb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9MaWdodENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0NhbWVyYUNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0FwcCc7XG5leHBvcnQgKiBmcm9tICcuL0xvb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbiIsImltcG9ydCB7QW1iaWVudExpZ2h0IGFzIEFtYmllbnRMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEFtYmllbnRMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gQW1iaWVudExpZ2h0IGlzIGEgc2ltcGxlIGNsYXNzLCBpdCBleHRlbmRzIExpZ2h0IGFuZCBpbmhlcml0cyBhbGwgaXRzIG1ldGhvZHMuXG4gKiBBbWJpZW50TGlnaHQgY3JlYXRlcyBiYXNpYyBsaWdodCBhcm91bmQgYWxsIHNjZW5lLCBzbyBpdCBkb2Vzbid0IG5lZWQgcHJvcGVydGllcyBsaWtlIHBvcyBvciB0YXJnZXQuXG4gKiBJdCBzdXBwb3J0cyBvbmx5IGNvbG9yIGFuZCBpbnRlbnNpdHkgYXMgcGFyYW1ldGVycywgd2hpY2ggZGVmaW5lcyB0aGUgY29sb3Igb2YgdGhlIHN1cnJvdW5kZWQgbGlnaHQgYW5kIGludGVuc2l0eSBvZiBsaWdodC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBBbWJpZW50TGlnaHQgPC9jYXB0aW9uPlxuICogbmV3IEFtYmllbnRMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjJcbiAqIH0pLmFkZFRvKHdvcmxkKTtcbiAqL1xuY2xhc3MgQW1iaWVudExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEFtYmllbnRMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEFtYmllbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQW1iaWVudExpZ2h0XG59O1xuIiwiaW1wb3J0IHtEaXJlY3Rpb25hbExpZ2h0IGFzIERpcmVjdGlvbmFsTGlnaHROYXRpdmUsIERpcmVjdGlvbmFsTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEaXJlY3Rpb25hbExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBEaXJlY3RpbmFsTGlnaHQgY3JlYXRlcyBhIGxpZ2h0IHRoYXQgc2hpbmVzIGZyb20gYSBzcGVjaWZpYyBkaXJlY3Rpb24gbm90IGZyb20gYSBzcGVjaWZpYyBwb3NpdGlvbi48YnIvPjxici8+XG4gKiBUaGlzIGxpZ2h0IHdpbGwgYmVoYXZlIGFzIHRob3VnaCBpdCBpcyBpbmZpbml0ZWx5IGZhciBhd2F5IGFuZCB0aGUgcmF5cyBwcm9kdWNlZCBmcm9tIGl0IGFyZSBhbGwgcGFyYWxsZWwuIDxici8+PGJyLz5cbiAqIFRoZSBiZXN0IGFuYWxvZ3kgd291bGQgYmUgYSBsaWdodCBzb3VyY2UgdGhhdCBhY3RzIGxpa2UgdGhlIHN1bjogdGhlIHN1biBpcyBzbyBmYXIgYXdheSB0aGF0IGFsbCBzdW5saWdodCBoaXR0aW5nIG9iamVjdHMgY29tZXMgZnJvbSB0aGUgc2FtZSBhbmdsZS48YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3MgYW5kIHRhcmdldCBwYXJhbWF0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRGlyZWN0aW9uYWxMaWdodCB0byBmYWxsIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgRGlyZWN0aW9uYWxMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjIsXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBEaXJlY3Rpb25hbExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERpcmVjdGlvbmFsTGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBEaXJlY3Rpb25hbExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEaXJlY3Rpb25hbExpZ2h0XG59O1xuIiwiaW1wb3J0IHtIZW1pc3BoZXJlTGlnaHQgYXMgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlLCBIZW1pc3BoZXJlTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBIZW1pc3BoZXJlTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIEhlbWlzcGhlcmVMaWdodCBpcyBhIGxpZ2h0IHNvdXJjZSBwb3NpdGlvbmVkIGRpcmVjdGx5IGFib3ZlIHRoZSBzY2VuZS48YnIvPlxuICogSXQgYWxzbyBkb2Vzbid0IG5lZWQgcG9zaXRpb24gYW5kIHRhcmdldCBwcm9wZXJ0aWVzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19oZW1pc3BoZXJlLmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge3NreUNvbG9yOiAweGZmZmZmZiwgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSGVtaXNwaGVyZUxpZ2h0PC9jYXB0aW9uPlxuICogbmV3IEhlbWlzcGhlcmVMaWdodCh7XG4gKiAgIHNreUNvbG9yOiAweGZmMDAwMCxcbiAqICAgZ3JvdW5kQ29sb3I6IDB4MDAwMGZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSGVtaXNwaGVyZUxpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBza3lDb2xvcjogMHhmZmZmZmYsXG4gICAgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEhlbWlzcGhlcmVMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEhlbWlzcGhlcmVMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5za3lDb2xvcixcbiAgICAgIHBhcmFtcy5ncm91bmRDb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgSGVtaXNwaGVyZUxpZ2h0XG59O1xuIiwiaW1wb3J0IHtQb2ludExpZ2h0IGFzIFBvaW50TGlnaHROYXRpdmUsIFBvaW50TGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQb2ludExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBQb2ludExpZ2h0IGNyZWF0ZXMgYSBsaWdodCBhdCBhIHNwZWNpZmljIHBvc2l0aW9uIGluIHRoZSBzY2VuZS4gVGhlIGxpZ2h0IHNoaW5lcyBpbiBhbGwgZGlyZWN0aW9ucyAocm91Z2hseSBzaW1pbGFyIHRvIGEgbGlnaHQgYnVsYi4pPGJyLz48YnIvPlxuICogSXQgaGFzIHRoZSBzYW1lIG9wdGlvbnMgYXMgQW1iaWVudExpZ2h0IGluIGxpZ2h0IHBhcmFtYXRlciwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zaXRpb24sIGRpc3RhbmNlIGFuZCBkZWNheS48YnIvPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIExpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFBvaW50TGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgUG9pbnRMaWdodCgge1xuICogICBjb2xvcjogMHhmZjAwMDAsXG4gKiAgIGludGVuc2l0eTogMixcbiAqICAgZGlzdGFuY2U6IDMwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUG9pbnRMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgZGVjYXk6IDFcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQb2ludExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUG9pbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUG9pbnRMaWdodFxufTtcbiIsImltcG9ydCB7U3BvdExpZ2h0IGFzIFNwb3RMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNwb3RMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gU3BvdExpZ2h0IGNyZWF0ZXMgc3BvdCBsaWdodCB0aGF0IGNhbiBjYXN0IHNoYWRvdyBpbiBvbmUgZGlyZWN0aW9uLiA8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgcGFyYW1ldGVycyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0LiA8YnIvPjxici8+XG4gKiBTcG90TGlnaHQgYWZmZWN0cyBtZXNoZXMgd2l0aCBsYW1iZXJ0IGFuZCBwaG9uZyBtYXRlcmlhbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9saWdodHNfc3BvdGxpZ2h0Lmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxLCBkaXN0YW5jZTogMTAwLCBhbmdsZTogTWF0aC5QSSAvIDMsIGV4cG9uZW50OiAwLCBkZWNheTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBTcG90TGlnaHQgdGhhdCBmYWxscyBkb3duIGZyb20gdmVjMygxMCwgMjAsIDEwKSB0byB2ZWMzKDAsIDAsIDApPC9jYXB0aW9uPlxuICogbmV3IFNwb3RMaWdodCh7XG4gKiAgIGNvbG9yOiAweDAwZmYwMCxcbiAqICAgaW50ZW5zaXR5OiAzLFxuICogICBkaXN0YW5jZTogMTAwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU3BvdExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgYW5nbGU6IE1hdGguUEkgLyAzLFxuICAgIGV4cG9uZW50OiAwLFxuICAgIGRlY2F5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNwb3RMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IFNwb3RMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuYW5nbGUsXG4gICAgICBwYXJhbXMuZXhwb25lbnQsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU3BvdExpZ2h0XG59O1xuIiwiaW1wb3J0IHtSZWN0QXJlYUxpZ2h0IGFzIFJlY3RBcmVhTGlnaHROYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG5jbGFzcyBBcmVhTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgd2lkdGg6IDEwLFxuICAgIGhlaWdodDogMTBcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQXJlYUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUmVjdEFyZWFMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMud2lkdGgsXG4gICAgICBwYXJhbXMuaGVpZ2h0XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFyZWFMaWdodFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvbGlnaHRzICovXG5leHBvcnQgKiBmcm9tICcuL0FtYmllbnRMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0RpcmVjdGlvbmFsTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9IZW1pc3BoZXJlTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2ludExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vU3BvdExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vQXJlYUxpZ2h0JztcbiIsImltcG9ydCB7Q3ViZUNhbWVyYSBhcyBDdWJlQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDdWJlQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyA2IGNhbWVyYXMgdGhhdCByZW5kZXIgdG8gYSBXZWJHTFJlbmRlclRhcmdldEN1YmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZXMgYSBDdWJlQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IEN1YmVDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBjdWJlUmVzb2x1dGlvbjogMjU2XG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgQ3ViZUNhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5DdWJlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGNhbWVyYToge1xuICAgKiAgICAgbmVhcjogMSxcbiAgICogICAgIGZhcjogMTAwMCxcbiAgICogICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBjdWJlUmVzb2x1dGlvbjogMTI4XG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN1YmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgQ3ViZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhcixcbiAgICAgIHBhcmFtcy5jdWJlUmVzb2x1dGlvblxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3ViZUNhbWVyYVxufTtcbiIsImltcG9ydCB7T3J0aG9ncmFwaGljQ2FtZXJhIGFzIE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvY2FtZXJhc1xuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIG9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFuIE9ydGhvZ3JhcGhpY0NhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBmYXI6IDEwMDAwXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDUwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXMuT3J0aG9ncmFwaGljQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgKiAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgKiAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAqICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT3J0aG9ncmFwaGljQ2FtZXJhLmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2NhbWVyYTogbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5sZWZ0LFxuICAgICAgcGFyYW1zLnJpZ2h0LFxuICAgICAgcGFyYW1zLnRvcCxcbiAgICAgIHBhcmFtcy5ib3R0b20sXG4gICAgICBwYXJhbXMubmVhcixcbiAgICAgIHBhcmFtcy5mYXJcbiAgICApfSkuY2FtZXJhO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9ydGhvZ3JhcGhpY0NhbWVyYVxufTtcbiIsImltcG9ydCB7UGVyc3BlY3RpdmVDYW1lcmEgYXMgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vLi4vcG9seWZpbGwnO1xuXG4vKipcbiAqIEBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYVxuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIHBlcnNwZWN0aXZlIHByb2plY3Rpb24uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gUGVyc3BlY3RpdmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoe1xuICogICBmb3Y6IDc1LFxuICogICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAwLFxuICogICAgIHk6IDEwMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5QZXJzcGVjdGl2ZUNhbWVyYSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBuZWFyOiAxLFxuICAgKiAgIGZhcjogMTAwMCxcbiAgICogICBmb3Y6IDc1LFxuICAgKiAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgZm92OiA3NSxcbiAgICBhc3BlY3Q6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHRcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGVyc3BlY3RpdmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmUoXG4gICAgICBwYXJhbXMuZm92LFxuICAgICAgcGFyYW1zLmFzcGVjdCxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGVyc3BlY3RpdmVDYW1lcmFcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL2NhbWVyYXMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ3ViZUNhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL09ydGhvZ3JhcGhpY0NhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL1BlcnNwZWN0aXZlQ2FtZXJhJztcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEJveEJ1ZmZlckdlb21ldHJ5LFxuICBCb3hHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQm94XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0JveEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBCb3gsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBCb3goe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgd2lkdGg6IDIsXG4gKiAgICAgIGhlaWdodDogMixcbiAqICAgICAgZGVwdGg6IDJcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQm94IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEsXG4gICAqICAgICBoZWlnaHQ6IDEsXG4gICAqICAgICBkZXB0aDogMSxcbiAgICogICAgIHdpZHRoU2VnbWVudHM6IDEsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICogICAgIGRlcHRoU2VnbWVudHM6IDFcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIGRlcHRoOiAxLFxuICAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgZGVwdGhTZWdtZW50czogMVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnZGVwdGgnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cycsICdkZXB0aFNlZ2VtZW50cyddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQm94LmRlZmF1bHRzLCBCb3guaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBCb3hCdWZmZXJHZW9tZXRyeSA6IEJveEdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGVwdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGhTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBCb3hcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBDaXJjbGVCdWZmZXJHZW9tZXRyeSxcbiAgQ2lyY2xlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENpcmNsZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQXMgdG9sZCBvbiBDb21wb25lbnQgZGVmaW5pdGlvbiwgd2hpbGUgeW91IGNhbiBwYXNzIGFueSBvZiB0aGUgaW5oZXJpdGVkIHBhcmFtcyBmb3IgdGhpcyBjb21wb25lbnQgY29uc3RydWN0aW9uLCB5b3Ugd2lsbCBuZWVkIHRvXG4gKiBwYXNzIHNwZWNpZmljIHBhcmFtZXRlcnMgdG8gYnVpbGQgdGhpcyBtZXNoIGFzIGEgZ2VvbWV0cnkgb2JqZWN0LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDaXJjbGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ2lyY2xlLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqICBuZXcgQ2lyY2xlKHtcbiAqICAgIGdlb21ldHJ5OiB7XG4gKiAgICAgIHJhZGl1czogNCxcbiAqICAgICAgc2VnbWVudHM6IDE2XG4gKiAgICB9LFxuICpcbiAqICAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgIH0pLFxuICpcbiAqICAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENpcmNsZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogNTAsXG4gICAqICAgICBzZWdtZW50czogOCxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogNTAsXG4gICAgICBzZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3NlZ21lbnRzJywgJ3RoZXRhU3RhcnQnLCAndGhldGFMZW5ndGgnXVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENpcmNsZS5kZWZhdWx0cywgQ2lyY2xlLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ2lyY2xlQnVmZmVyR2VvbWV0cnkgOiBDaXJjbGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENpcmNsZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENvbmVCdWZmZXJHZW9tZXRyeSxcbiAgQ29uZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDb25lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDb25lR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIENvbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IENvbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDb25lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Db25lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbXG4gICAqICAgJ3JhZGl1cycsXG4gICAqICAgJ2hlaWdodCcsXG4gICAqICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICogICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgKiAgICdvcGVuRW5kZWQnLFxuICAgKiAgICd0aGV0YVN0YXJ0JyxcbiAgICogICAndGhldGFMZW5ndGgnXG4gICAqIF1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENvbmUuZGVmYXVsdHMsIENvbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IENvbmVCdWZmZXJHZW9tZXRyeSA6IENvbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29uZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEN5bGluZGVyQnVmZmVyR2VvbWV0cnksXG4gIEN5bGluZGVyR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN5bGluZGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDeWxpbmRlckdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDeWxpbmRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ3lsaW5kZXIoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDeWxpbmRlciBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzVG9wOiAyMCxcbiAgICogICAgIHJhZGl1c0JvdHRvbTogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXNUb3A6IDAsXG4gICAgICByYWRpdXNCb3R0b206IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICByYWRpdXNTZWdtZW50czogMzIsXG4gICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICAgIG9wZW5FbmRlZDogZmFsc2UsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXIjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzVG9wJyxcbiAgICogICAncmFkaXVzQm90dG9tJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXNUb3AnLFxuICAgICAgJ3JhZGl1c0JvdHRvbScsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgICAgJ29wZW5FbmRlZCcsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBDeWxpbmRlci5kZWZhdWx0cywgQ3lsaW5kZXIuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDeWxpbmRlckJ1ZmZlckdlb21ldHJ5IDogQ3lsaW5kZXJHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzVG9wLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c0JvdHRvbSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3BlbkVuZGVkLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEN5bGluZGVyXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIERvZGVjYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2RlY2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhIGRvZGVjYWhlZHJvbiBpcyBhbnkgcG9seWhlZHJvbiB3aXRoIHR3ZWx2ZSBmbGF0IGZhY2VzLiA8YnIvPjxici8+XG4gKiBUaGUgbW9zdCBmYW1pbGlhciBkb2RlY2FoZWRyb24gaXMgdGhlIHJlZ3VsYXIgZG9kZWNhaGVkcm9uLCB3aGljaCBpcyBhIFBsYXRvbmljIHNvbGlkLiA8YnIvPlxuICogVGhlcmUgYXJlIGFsc28gdGhyZWUgcmVndWxhciBzdGFyIGRvZGVjYWhlZHJhLCB3aGljaCBhcmUgY29uc3RydWN0ZWQgYXMgc3RlbGxhdGlvbnMgb2YgdGhlIGNvbnZleCBmb3JtLiA8YnIvPlxuICogQWxsIG9mIHRoZXNlIGhhdmUgaWNvc2FoZWRyYWwgc3ltbWV0cnksIG9yZGVyIDEyMC5cbiAqIERvZGVjYWhlZHJvbiBjcmVhdGVzIERvZGVjYWhlZHJvbiBvYmplY3QgYnkgaXQncyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRG9kZWNhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIERvZGVjYWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgRG9kZWNhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTBcbiAqICAgfVxuICAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERvZGVjYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IHtcbiAgICogICByYWRpdXM6IDEsXG4gICAqICAgZGV0YWlsOiAwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERvZGVjYWhlZHJvbi5kZWZhdWx0cywgRG9kZWNhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBEb2RlY2FoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgRG9kZWNhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEV4dHJ1ZGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgRXh0cnVkZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gRXh0cnVkZSBnZW9tZXRyeSBtZWFucyB0aGF0IHlvdSBjYW4gY3JlYXRlIGEgM0QgbWVzaCBmcm9tIGFueSAyRCBzaGFwZSB1c2luZyB0aHJlZS5qcyBnZW9tZXRyeSBiYXNlZCBvbiA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9tYXRoL1ZlY3RvcjInPlRIUkVFLlZlY3RvcjIuPC9hPiA8YnIvPlxuICogU3VjaCBpbXBsZW1lbnRhdGlvbiB3aWxsIGhlbHAgeW91IHRvIG1ha2Ugdm9sdW1lZCBzaGFwZXMgdGhhdCBoYXZlIHRoZWlyIG93biBkZXB0aCBhbmQgY2FuIGJlIHNlZW4gZnJvbSBhbGwgYW5nZWxzLjxici8+PGJyLz5cbiAqIFlvdSBjYW4gYWxzbyBmaW5kIHNvbWUgaW50ZXJlc3RpbmcgZXhhbXBsZXMgbWFkZSB1c2luZyA8YSBocmVmPSd0aHJlZWpzLm9yZyc+dGhyZWUuanM8L2E+IHdoaWNoIGlzIGEgY29yZSBvZiB3aHMuanMsIHN1Y2ggYXM6XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlcy5odG1sJz5XZWJnbCBnZW9tZXRyeSBleHRydWRlPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zaGFwZXMyLmh0bWwnPkV4dHJ1ZGUgc2hhcGVzIGZyb20gZ2VvZGF0YTwvYT5cbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc3BsaW5lcy5odG1sJz5FeHRydWRlIHNwbGluZXM8L2E+XG4gKlxuICogU3VjaCBleGFtcGxlcyBjYW4gYmUgZWFzaWx5IGltcGxlbWVudGVkIHVzaW5nIHdoaXRlc3Rvcm0uanMgb3IgaXQncyBwbHVnaW5zLiBVc2UgYEV4dHJ1ZGVgIGNsYXNzIHdpdGggPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZXh0cmFzL2NvcmUvU2hhcGUnPlRIUkVFLlNoYXBlPC9hPiB0byBnZXQgZXh0cnVkZSBlZmZlY3Qgb2Ygc2hhcGUgZGVmaW5lZCBieSAyRCB2ZWN0b3JzLlxuICogVGhpcyBjbGFzcyBpcyBzaW1pbGFyIHRvIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2dlb21ldHJpZXMvRXh0cnVkZUdlb21ldHJ5Jz5USFJFRS5FeHRydWRlR2VvbWV0cnk8L2E+LFxuICogYnV0IGl0IGFsc28gY29udGFpbnMgYWxsIHByb3BlcnRpZXMsIGFwcGxpZWQgYnkgYFNoYXBlYCwgc3VjaCBhcyBtYXRlcmlhbCwgbWFzcyBhbmQgdmVjdG9ycyBsaWtlIHBvc2l0aW9uIChwb3MpIGFuZCByb3RhdGlvbiAocm90KS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRXh0cnVkZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBzaGFwZSwgdGhlbiBhbiBFeHRydWRlIGZyb20gaXQ8L2NhcHRpb24+XG4gKiBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZShbXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLDIpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigyLDApLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwtMilcbiAqIF0pO1xuICpcbiAqIGNvbnN0IGV4dHJ1ZGUgPSBuZXcgRXh0cnVkZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgc2hhcGVzOiBzaGFwZSxcbiAqICAgICBvcHRpb25zOiB7XG4gKiAgICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICogICAgICAgYmV2ZWxTaXplOiAwLFxuICogICAgICAgYW1vdW50OiAyXG4gKiAgICAgfVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KTtcbiAqXG4gKiBleHRydWRlLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEV4dHJ1ZGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHNoYXBlczogW10sXG4gICAqICAgICBvcHRpb25zOiB7fVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBzaGFwZXM6IFtdLFxuICAgICAgb3B0aW9uczoge31cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydzaGFwZXMnLCAnb3B0aW9ucyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRXh0cnVkZS5kZWZhdWx0cywgRXh0cnVkZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEV4dHJ1ZGVHZW9tZXRyeShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zaGFwZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3B0aW9uc1xuICAgICk7XG5cbiAgICByZXR1cm4gcGFyYW1zLmJ1ZmZlciA/IG5ldyBCdWZmZXJHZW9tZXRyeSgpLmZyb21HZW9tZXRyeShnZW9tZXRyeSkgOiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBFeHRydWRlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgSWNvc2FoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSWNvc2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhbiBpY29zYWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCAyMCBmYWNlcy48YnIvPlxuICogVGhlcmUgYXJlIG1hbnkga2luZHMgb2YgaWNvc2FoZWRyYSwgd2l0aCBzb21lIGJlaW5nIG1vcmUgc3ltbWV0cmljYWwgdGhhbiBvdGhlcnMuIFRoZSBtb3N0IHdlbGwga25vd24gaXMgdGhlIFBsYXRvbmljLCBjb252ZXggcmVndWxhciBpY29zYWhlZHJvbi48YnIvPlxuICogYEljb3NhaGVkcm9uYCBjcmVhdGVzIGFuIEljb3NhaGVkcm9uIG9iamVjdCBieSBpdHMgcmFkaXVzIGFuZCBkZXRhaWwuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0ljb3NhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEljb3NhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBJY29zYWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBJY29zYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHtnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ119XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBJY29zYWhlZHJvbi5kZWZhdWx0cywgSWNvc2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IEljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBJY29zYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJY29zYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIExhdGhlQnVmZmVyR2VvbWV0cnksXG4gIExhdGhlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExhdGhlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGBMYXRoZUdlb21ldHJ5YCBhbGxvd3MgeW91IHRvIGNyZWF0ZSBzaGFwZXMgZnJvbSBhIHNtb290aCBjdXJ2ZS5cbiAqIFRoaXMgY3VydmUgaXMgZGVmaW5lZCBieSBhIG51bWJlciBvZiBwb2ludHMgKGFsc28gY2FsbGVkIGtub3RzKSBhbmQgaXMgbW9zdCBvZnRlbiBjYWxsZWQgYSBzcGxpbmUuIFRoaXMgc3BsaW5lIGlzIHJvdGF0ZWQgYXJvdW5kIGEgZml4ZWQgcG9pbnQgYW5kIHJlc3VsdHMgaW4gdmFzZS0gYW5kIGJlbGwtbGlrZSBzaGFwZXMuPGJyLz48YnIvPlxuICogSW4gM0QgY29tcHV0ZXIgZ3JhcGhpY3MsIGEgbGF0aGVkIG9iamVjdCBpcyBhIDNEIG1vZGVsIHdob3NlIHZlcnRleCBnZW9tZXRyeSBpcyBwcm9kdWNlZCBieSByb3RhdGluZyB0aGUgcG9pbnRzIG9mIGEgc3BsaW5lIG9yIG90aGVyIHBvaW50IHNldCBhcm91bmQgYSBmaXhlZCBheGlzLlxuICogVGhlIGxhdGhpbmcgbWF5IGJlIHBhcnRpYWw7IHRoZSBhbW91bnQgb2Ygcm90YXRpb24gaXMgbm90IG5lY2Vzc2FyaWx5IGEgZnVsbCAzNjAgZGVncmVlcy5cbiAqIFRoZSBwb2ludCBzZXQgcHJvdmlkaW5nIHRoZSBpbml0aWFsIHNvdXJjZSBkYXRhIGNhbiBiZSB0aG91Z2h0IG9mIGFzIGEgY3Jvc3Mgc2VjdGlvbiB0aHJvdWdoIHRoZSBvYmplY3QgYWxvbmcgYSBwbGFuZSBjb250YWluaW5nIGl0cyBheGlzIG9mIHJhZGlhbCBzeW1tZXRyeS4gPGJyLz48YnIvPlxuICogVGhlIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjTGF0aGVHZW9tZXRyeSc+Zm9sbG93aW5nIGV4YW1wbGU8L2E+IHNob3dzIGEgZ2VvbWV0cnkgd2hpY2ggY2FuIGJlIGdlbmVyYXRlZCB1c2luZyBgTGF0aGVgIGNsYXNzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMYXRoLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IHBvaW50cyA9IFtdO1xuICpcbiAqIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICogICBwb2ludHMucHVzaChcbiAqICAgICBuZXcgVEhSRUUuVmVjdG9yMihcbiAqICAgICAgIChNYXRoLnNpbihpICogMC43KSAqIDE1ICsgNTApIC8gMTAsXG4gKiAgICAgICAoaSAtIDUpICogMC4yXG4gKiAgICAgKVxuICogICApO1xuICogfVxuICpcbiAqIGNvbnN0IGxhdGhlID0gbmV3IExhdGhlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBwb2ludHM6IHBvaW50c1xuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA1MCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMYXRoZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHBvaW50czogW11cbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcG9pbnRzOiBbXVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxhdGhlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIExhdGhlLmRlZmF1bHRzLCBMYXRoZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gTGF0aGVCdWZmZXJHZW9tZXRyeSA6IExhdGhlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBvaW50c1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGF0aGVcbn07XG4iLCJpbXBvcnQge1xuICBMaW5lIGFzIExpbmVOYXRpdmUsXG4gIEJ1ZmZlckdlb21ldHJ5LFxuICBHZW9tZXRyeSxcbiAgQnVmZmVyQXR0cmlidXRlLFxuICBMaW5lQ3VydmUzLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBMaW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBMaW5lIGNvbXBvbmVudCBpcyBnZW5lcmF0ZWQgZnJvbSBhIGN1cnZlL2xpbmUgYW5kIGFtb3VudCBvZiB2ZWN0b3JzIHRoYXQgc2hvdWxkIGJlIHVzZWQgKHBvaW50cykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMaW5lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBMaW5lKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBjdXJ2ZTogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFRIUkVFLlZlY3RvcjMoMTAsIDEwLCAwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMTAsIDMwLCAwKSlcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgTGluZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgY3VydmU6IG5ldyBMaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygxMCwgMCwgMCkpLFxuICAgKiAgICAgcG9pbnRzOiA1MFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBjdXJ2ZTogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDEwLCAwLCAwKSksXG4gICAgICBwb2ludHM6IDUwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPntcbiAgICogICBnZW9tZXRyeTogWydjdXJ2ZScsICdwb2ludHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydjdXJ2ZScsICdwb2ludHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHN1cGVyKHBhcmFtcywgTGluZS5kZWZhdWx0cywgTGluZS5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IExpbmVOYXRpdmUoZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBwYXJhbXMuYnVmZmVyID8gbmV3IEJ1ZmZlckdlb21ldHJ5KCkgOiBuZXcgR2VvbWV0cnkoKTtcblxuICAgIGlmIChwYXJhbXMuYnVmZmVyKSB7XG4gICAgICBjb25zdCBwcCA9IHBhcmFtcy5nZW9tZXRyeS5jdXJ2ZS5nZXRQb2ludHMocGFyYW1zLmdlb21ldHJ5LnBvaW50cyk7XG4gICAgICBjb25zdCB2ZXJ0cyA9IG5ldyBGbG9hdDMyQXJyYXkocHAubGVuZ3RoICogMyk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBwcC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICBjb25zdCBpMyA9IGkgKiAzO1xuXG4gICAgICAgIHZlcnRzW2kzXSA9IHBwW2ldLng7XG4gICAgICAgIHZlcnRzW2kzICsgMV0gPSBwcFtpXS55O1xuICAgICAgICB2ZXJ0c1tpMyArIDJdID0gcHBbaV0uejtcbiAgICAgIH1cblxuICAgICAgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBCdWZmZXJBdHRyaWJ1dGUodmVydHMsIDMpKTtcbiAgICB9IGVsc2UgZ2VvbWV0cnkudmVydGljZXMgPSBwYXJhbXMuZ2VvbWV0cnkuY3VydmUuZ2V0UG9pbnRzKHBhcmFtcy5nZW9tZXRyeS5wb2ludHMpO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExpbmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBKU09OTG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBJbXBvcnRlclxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW1wb3J0ZXIgaXMgYSBsb2FkZXIgZm9yIG1lc2hlcyBhbmQgYW55IG90aGVyIGRhdGEgdG8geW91ciBzY2VuZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSW1wb3J0ZXIsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IEltcG9ydGVyKHtcbiAqICAgbG9hZGVyOiBuZXcgVEhSRUUuT0JKTG9hZGVyKCksXG4gKlxuICogICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFsKSB7IC8vIGRhdGEgZnJvbSBsb2FkZXJcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTsgLy8gc2hvdWxkIHJldHVybiB5b3VyIC5uYXRpdmUgKG1lc2ggaW4gdGhpcyBjYXNlKVxuICogICB9LFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBJbXBvcnRlciBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlciNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICB1cmw6ICcnLFxuICAgKiAgIGxvYWRlcjogbmV3IEpTT05Mb2FkZXIoKSxcbiAgICpcbiAgICogICBvbkxvYWQoKSB7fSxcbiAgICogICBvblByb2dyZXNzKCkge30sXG4gICAqICAgb25FcnJvcigpIHt9LFxuICAgKlxuICAgKiAgIHRleHR1cmVQYXRoOiBudWxsLFxuICAgKiAgIHVzZUN1c3RvbU1hdGVyaWFsOiBmYWxzZSxcbiAgICpcbiAgICogICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFscykge1xuICAgKiAgICAgcmV0dXJuIG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICB1cmw6ICcnLFxuICAgIGxvYWRlcjogbmV3IEpTT05Mb2FkZXIoKSxcblxuICAgIG9uTG9hZCgpIHt9LFxuICAgIG9uUHJvZ3Jlc3MoKSB7fSxcbiAgICBvbkVycm9yKCkge30sXG5cbiAgICB0ZXh0dXJlUGF0aDogbnVsbCxcbiAgICB1c2VDdXN0b21NYXRlcmlhbDogZmFsc2UsXG5cbiAgICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFscykge1xuICAgICAgcmV0dXJuIG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICAgIH1cbiAgfTtcblxuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zXG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZmlsdGVyXG4gICAqIEBkZXNjcmlwdGlvbiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7VEhSRUUuTWVzaH0gb2JqZWN0IEluc3RhbmNlIGZvciBpdGVyYXRpbmcgdGhyb3VnaCBpdCdzIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaWx0ZXIgRnVuY3Rpb24gd2l0aCBjaGlsZCBhcyBhcmd1bWVudCwgc2hvdWxkIHJldHVybiBhIGJvb2xlYW4gd2hldGhlciBpbmNsdWRlIHRoZSBjaGlsZCBvciBub3QuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IG9iamVjdCB3aXRoIGNoaWxkcmVuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSW1wb3J0ZXJcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UmVtb3ZpbmcgdW5uZWNlc3NhcnkgbGlnaHRzIGZyb20gY2hpbGRyZW48L2NhcHRpb24+XG4gICAqIG5ldyBJY29zYWhlZHJvbih7XG4gICAqICAgbG9hZGVyOiBuZXcgVEhSRUUuT0JKTG9hZGVyKCksXG4gICAqXG4gICAqICAgcGFyc2UoZ3JvdXApIHsgLy8gZGF0YSBmcm9tIGxvYWRlclxuICAgKiAgICAgcmV0dXJuIEltcG9ydGVyLmZpbHRlcihncm91cCwgY2hpbGQgPT4gIWNoaWxkLmlzTGlnaHQpOyAvLyByZW1vdmUgbGlnaHRzXG4gICAqICAgfSxcbiAgICpcbiAgICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAgICogfSkuYWRkVG8oYXBwKTtcbiAgICovXG4gIHN0YXRpYyBmaWx0ZXIob2JqZWN0LCBmaWx0ZXIpIHtcbiAgICBjb25zdCBwcm9jZXNzRmlsdGVyID0gb2JqZWN0ID0+IHtcbiAgICAgIG9iamVjdC5jaGlsZHJlbi5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGVsLmNoaWxkcmVuKSBwcm9jZXNzRmlsdGVyKGVsKTtcbiAgICAgICAgaWYgKCFmaWx0ZXIoZWwpKSBvYmplY3QuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJvY2Vzc0ZpbHRlcihvYmplY3QpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEltcG9ydGVyLmRlZmF1bHRzLCBJbXBvcnRlci5pbnN0cnVjdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSW1wb3J0ZXJcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKHBhcmFtcy50ZXh0dXJlUGF0aCkgcGFyYW1zLmxhb2Rlci5zZXRUZXh0dXJlUGF0aChwYXJhbXMudGV4dHVyZVBhdGgpO1xuXG4gICAgICBwYXJhbXMubG9hZGVyLmxvYWQocGFyYW1zLnVybCwgKC4uLmRhdGEpID0+IHsgLy8gZ2VvbWV0cnksIG1hdGVyaWFsc1xuICAgICAgICBwYXJhbXMub25Mb2FkKC4uLmRhdGEpO1xuXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IHBhcmFtcy5wYXJzZXIoLi4uZGF0YSl9KS5tZXNoO1xuXG4gICAgICAgIGNvbnN0IHtnZW9tZXRyeTogZ2VvbSwgbWF0ZXJpYWw6IG1hdH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogb2JqZWN0Lmdlb21ldHJ5LFxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMudXNlQ3VzdG9tTWF0ZXJpYWwgPyBwYXJhbXMubWF0ZXJpYWwgOiBvYmplY3QubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG9iamVjdC5nZW9tZXRyeSkgb2JqZWN0Lmdlb21ldHJ5ID0gZ2VvbTtcbiAgICAgICAgaWYgKG9iamVjdC5tYXRlcmlhbCkgb2JqZWN0Lm1hdGVyaWFsID0gbWF0O1xuXG4gICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgIH0sIHBhcmFtcy5vblByb2dyZXNzLCBwYXJhbXMub25FcnJvcik7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgSW1wb3J0ZXJcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIE9jdGFoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgT2N0YWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGFuIG9jdGFoZWRyb24gaXMgYSBwb2x5aGVkcm9uIHdpdGggZWlnaHQgZmFjZXMuXG4gKiBBIHJlZ3VsYXIgb2N0YWhlZHJvbiBpcyBhIFBsYXRvbmljIHNvbGlkIGNvbXBvc2VkIG9mIGVpZ2h0IGVxdWlsYXRlcmFsIHRyaWFuZ2xlcywgZm91ciBvZiB3aGljaCBtZWV0IGF0IGVhY2ggdmVydGV4LlxuICogPGJyLz48YnIvPlxuICogYE9jdGFoZWRyb25gIGNyZWF0ZXMgYW4gT2N0YWhlZHJvbiBvYmplY3QgYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjT2N0YWhlZHJvbkdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gT2N0YWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgT2N0YWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBPY3RhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5PY3RhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICBkZXRhaWw6IDBcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIE9jdGFoZWRyb24uZGVmYXVsdHMsIE9jdGFoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLk9jdGFoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gT2N0YWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogT2N0YWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBPY3RhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5LFxuICBQYXJhbWV0cmljR2VvbWV0cnksXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBhcmFtZXRyaWNcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIGBQYXJhbWV0cmljYCBnZW5lcmF0ZXMgYSBnZW9tZXRyeSByZXByZXNlbnRpbmcgYSA8YSBocmVmPSdodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QYXJhbWV0cmljX3N1cmZhY2UnPlBhcmFtZXRyaWMgc3VyZmFjZTwvYT5cbiAqIDxici8+PGJyLz5cbiAqIEl0IGlzIHVzdWFsbHkgdXNlZCB0byBkZXZlbG9wIGRpZmZlcmVudCBraW5kcyBvZiBoaWdoZmllbGRzIG9yIHZpc3VhbGl6ZSBhIDxhIGhyZWY9J2h0dHBzOi8vc3RlbWtvc2tpLmdpdGh1Yi5pby9UaHJlZS5qcy9HcmFwaHVsdXMtRnVuY3Rpb24uaHRtbCc+bWF0aCBmdW5jdGlvbjwvYT4uXG4gKiA8YnIvPlxuICogLSA8YSBocmVmPSdodHRwOi8vbWF0aC5od3MuZWR1L2dyYXBoaWNzYm9vay9zb3VyY2UvdGhyZWVqcy9jdXJ2ZXMtYW5kLXN1cmZhY2VzLmh0bWwnPlBhcmFtZXRyaWMgc3VyZmFjZTwvYT5cbiAqIC0gPGEgaHJlZj0naHR0cHM6Ly9zdGVta29za2kuZ2l0aHViLmlvL1RocmVlLmpzL0dyYXBodWx1cy1TdXJmYWNlLmh0bWwnPlwiR3JhcGh1bHVzXCI8L2E+XG4gKiA8YnIvPjxici8+XG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1BhcmFtZXRyaWNHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV4YW1wbGUgY3JlYXRpbmcgYW4gaGVpZ2h0ZmllbGQtbGlrZSBnZW9tZXRyeS4gYHVgIGFuZCBgdmAgYXJlIGxpa2UgYHhgIGFuZCBgeWAgaW4gc2hhcGUsIGJ1dCB0aGVpciB2YWx1ZXMgYXJlIGFsd2F5cyBmcm9tIGAwYCB0byBgMWAuXG4gKiBXZSB1c2UgdGhlbSBpbiBgVEhSRUUuVmVjdG9yM2AgbGlrZSBgeGAgYW5kIGB6YCBhbmQgYE1hdGgucmFuZG9tKCkgKiA1YCBmb3IgYHlgLjwvY2FwdGlvbj5cbiAqIGNvbnN0IGNyZWF0ZVBhcmFtZXRyaWMgPSAodSwgdikgPT4ge1xuICogICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjModSAqIDMwLCBNYXRoLnJhbmRvbSgpICogNSwgdiAqIDMwKTtcbiAqIH1cbiAqXG4gKiBuZXcgUGFyYW1ldHJpYyh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgZnVuYzogY3JlYXRlUGFyYW1ldHJpY1xuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZVxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAtMTAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUGFyYW1ldHJpYyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGFyYW1ldHJpYyNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgZnVuYzogKHUsIHYpID0+IG5ldyBWZWN0b3IzKHUsIHYsIDApLFxuICAgKiAgICAgc2xpY2VzOiAxMCxcbiAgICogICAgIHRhY2tzOiAxMFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBmdW5jOiAodSwgdikgPT4gbmV3IFZlY3RvcjModSwgdiwgMCksXG4gICAgICBzbGljZXM6IDEwLFxuICAgICAgc3RhY2tzOiAxMFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQYXJhbWV0cmljLmRlZmF1bHRzLCBQYXJhbWV0cmljLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBhcmFtZXRyaWNcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5IDogUGFyYW1ldHJpY0dlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5mdW5jLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNsaWNlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zdGFja3NcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBhcmFtZXRyaWNcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQbGFuZUJ1ZmZlckdlb21ldHJ5LFxuICBQbGFuZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQbGFuZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gYFBsYW5lYCBpcyB1c2VkIGZvciBjcmVhdGluZyBwbGFuZXMgZ2l2ZW4gc29tZSBgd2lkdGhgIGFuZCBgaGVpZ2h0YC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUGxhbmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUGxhbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFBsYW5lKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICB3aWR0aDogMjAsXG4gKiAgICAgaGVpZ2h0OiAzMFxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQbGFuZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHdpZHRoOiAxMCxcbiAgICogICAgIGhlaWdodDogMTAsXG4gICAqICAgICB3U2VnbWVudHM6IDEsXG4gICAqICAgICBoU2VnbWVudHM6IDFcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgd2lkdGg6IDEwLFxuICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgIHdTZWdtZW50czogMSxcbiAgICAgIGhTZWdtZW50czogMVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnd1NlZ21lbnRzJywgJ2hTZWdtZW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICd3U2VnbWVudHMnLCAnaFNlZ21lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGxhbmUuZGVmYXVsdHMsIFBsYW5lLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gUGxhbmVCdWZmZXJHZW9tZXRyeSA6IFBsYW5lR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQbGFuZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgUG9seWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG5jb25zdCBbdmVydGljZXNPZkN1YmUsIGluZGljZXNPZkZhY2VzXSA9IFtcbiAgW1xuICAgIC0xLCAtMSwgLTEsIDEsIC0xLCAtMSwgMSwgMSwgLTEsIC0xLCAxLCAtMSxcbiAgICAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAxLCAxLCAtMSwgMSwgMVxuICBdLFxuICBbXG4gICAgMiwgMSwgMCwgMCwgMywgMixcbiAgICAwLCA0LCA3LCA3LCAzLCAwLFxuICAgIDAsIDEsIDUsIDUsIDQsIDAsXG4gICAgMSwgMiwgNiwgNiwgNSwgMSxcbiAgICAyLCAzLCA3LCA3LCA2LCAyLFxuICAgIDQsIDUsIDYsIDYsIDcsIDRcbiAgXVxuXTtcblxuLyoqXG4gKiBAY2xhc3MgUG9seWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZWxlbWVudGFyeSBnZW9tZXRyeSwgYSBwb2x5aGVkcm9uIGlzIGEgc29saWQgaW4gdGhyZWUgZGltZW5zaW9ucyB3aXRoIGZsYXQgcG9seWdvbmFsIGZhY2VzLCBzdHJhaWdodCBlZGdlcyBhbmQgc2hhcnAgY29ybmVycyBvciB2ZXJ0aWNlcy5cbiAqIDxici8+PGJyLz5cbiAqIGBQb2x5aGVkcm9uYCBjcmVhdGVzIGEgUG9seWhlZHJvbiBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgLlxuICogPGJyLz48YnIvPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIFBvbHloZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFBvbHloZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUG9seWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICBzdGF0aWMgdmVydGljZXNPZkN1YmUgPSB2ZXJ0aWNlc09mQ3ViZTtcbiAgc3RhdGljIGluZGljZXNPZkZhY2VzID0gaW5kaWNlc09mRmFjZXM7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHZlcnRpY2VzT2ZDdWJlOiBbXG4gICAqICAgICAgIC0xLCAtMSwgLTEsIDEsIC0xLCAtMSwgMSwgMSwgLTEsIC0xLCAxLCAtMSxcbiAgICogICAgICAgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMSwgMSwgMSwgLTEsIDEsIDFcbiAgICogICAgIF0sXG4gICAqXG4gICAqICAgICBpbmRpY2VzT2ZGYWNlczogW1xuICAgKiAgICAgICAyLCAxLCAwLCAwLCAzLCAyLFxuICAgKiAgICAgICAwLCA0LCA3LCA3LCAzLCAwLFxuICAgKiAgICAgICAwLCAxLCA1LCA1LCA0LCAwLFxuICAgKiAgICAgICAxLCAyLCA2LCA2LCA1LCAxLFxuICAgKiAgICAgICAyLCAzLCA3LCA3LCA2LCAyLFxuICAgKiAgICAgICA0LCA1LCA2LCA2LCA3LCA0XG4gICAqICAgICBdLFxuICAgKlxuICAgKiAgICAgcmFkaXVzOiA2LFxuICAgKiAgICAgZGV0YWlsOiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHZlcnRpY2VzT2ZDdWJlLFxuICAgICAgaW5kaWNlc09mRmFjZXMsXG4gICAgICByYWRpdXM6IDYsXG4gICAgICBkZXRhaWw6IDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWyd2ZXJ0aWNlc09mQ3ViZScsICdpbmRpY2VzT2ZGYWNlcycsICdyYWRpdXMnLCAnZGV0YWlsJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsndmVydGljZXNPZkN1YmUnLCAnaW5kaWNlc09mRmFjZXMnLCAncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBvbHloZWRyb24uZGVmYXVsdHMsIFBvbHloZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogUG9seWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS52ZXJ0aWNlc09mQ3ViZSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5pbmRpY2VzT2ZGYWNlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQb2x5aGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUmluZ0dlb21ldHJ5LFxuICBSaW5nQnVmZmVyR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFJpbmdcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFJpbmcgY2xhc3MgY3JlYXRlcyBhIGNpcmNsZSBvciBqdXN0IDJEIFRvcnVzLiBEb2VzIG5vdCBzdXBwb3J0IHBoeXNpY3MuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1JpbmdHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUmluZywgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUmluZyh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgaW5uZXJSYWRpdXM6IDUsXG4gKiAgICAgb3V0ZXJSYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgIHNpZGUgVEhSRUUuRG91YmxlU2lkZVxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgOCwgMF0sXG4gKlxuICogICByb3RhdGlvbjoge1xuICogICAgIHg6IE1hdGguUEkvNFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBSaW5nIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBpbm5lclJhZGl1czogMCxcbiAgICogICAgIG91dGVyUmFkaXVzOiA1MCxcbiAgICogICAgIHRoZXRhU2VnbWVudHM6IDgsXG4gICAqICAgICBwaGlTZWdtZW50czogOCxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgaW5uZXJSYWRpdXM6IDAsXG4gICAgICBvdXRlclJhZGl1czogNTAsXG4gICAgICB0aGV0YVNlZ21lbnRzOiA4LFxuICAgICAgcGhpU2VnbWVudHM6IDgsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZyNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdpbm5lclJhZGl1cycsXG4gICAqICAgICAnb3V0ZXJSYWRpdXMnLFxuICAgKiAgICAgJ3RoZXRhU2VnbWVudHMnLFxuICAgKiAgICAgJ3BoaVNlZ21lbnRzJyxcbiAgICogICAgICd0aGV0YVN0YXJ0JyxcbiAgICogICAgICd0aGV0YUxlbmd0aCdcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdpbm5lclJhZGl1cycsXG4gICAgICAnb3V0ZXJSYWRpdXMnLFxuICAgICAgJ3RoZXRhU2VnbWVudHMnLFxuICAgICAgJ3BoaVNlZ21lbnRzJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFJpbmcuZGVmYXVsdHMsIFJpbmcuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmdcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gUmluZ0J1ZmZlckdlb21ldHJ5IDogUmluZ0dlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5pbm5lclJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vdXRlclJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBoaVNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFJpbmdcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBTaGFwZUJ1ZmZlckdlb21ldHJ5LFxuICBTaGFwZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBTaGFwZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU2hhcGUgaXMgYSB1bml2ZXJzYWwgY2xhc3MuIEl0IGFsbG93cyB5b3UgdG8gY3JlYXRlIGRpZmZlcmVudCAyRCBzaGFwZXMgaW4gM0Qgc2NlbmUuPGJyLz5cbiAqIFVuZm9ydHVuYXRlbHksIG5vdCBhbGwgb2YgdGhlbSBzdXBwb3J0IHBoeXNpY3MsIGFuIGFsdGVybmF0aXZlIGlzIHRvIG1ha2UgYSBzaW1pbGFyIDNEIG9iamVjdCBhbmQgc2NhbGUgaXRzIHdpZHRoIGRvd24gdG8gbmVhciB6ZXJvLlxuICogPGJyLz48YnIvPlxuICogYFNoYXBlYCBjb25zaXN0cyBvZiBzaGFwZXMgdGhhdCBhcmUgaW4gaXRzIHNoYXBlcyBwYXJhbWV0ZXIuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1NoYXBlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIHBsYW5lIGxvb2tpbmcgU2hhcGUgZnJvbSBhIFRIUkVFLlNoYXBlLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IHJlY3RXaWR0aCA9IDEwLFxuICogcmVjdExlbmd0aCA9IDU7XG4gKlxuICogY29uc3QgcmVjdFNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gKiByZWN0U2hhcGUubW92ZVRvKDAsMCk7XG4gKiByZWN0U2hhcGUubGluZVRvKDAsIHJlY3RXaWR0aCk7XG4gKiByZWN0U2hhcGUubGluZVRvKHJlY3RMZW5ndGgsIHJlY3RXaWR0aCk7XG4gKiByZWN0U2hhcGUubGluZVRvKHJlY3RMZW5ndGgsIDApO1xuICogcmVjdFNoYXBlLmxpbmVUbygwLCAwKTtcbiAqXG4gKiBjb25zdCBwbGFuZSA9IG5ldyBTaGFwZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgc2hhcGU6IHJlY3RTaGFwZVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTaGFwZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU2hhcGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHNoYXBlczogW11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBzaGFwZXM6IFtdXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU2hhcGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3NoYXBlcyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3NoYXBlcyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNoYXBlLmRlZmF1bHRzLCBTaGFwZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU2hhcGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gU2hhcGVCdWZmZXJHZW9tZXRyeSA6IFNoYXBlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNoYXBlc1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU2hhcGVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBTcGhlcmVCdWZmZXJHZW9tZXRyeSxcbiAgU3BoZXJlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNwaGVyZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU3BoZXJlIGNsYXNzIGlzIHVzZWQgdG8gY3JlYXRlIHNwaGVyZSBvYmplY3RzIGJ5IGl0cyByYWRpdXMgcHJvcGVydHkgYW5kIG90aGVyIHZhbHVlcyB0aGF0IGRldGVybWluZXMgaXRzIGRldGFsaXR5LlxuICogPGJyLz48YnIvPlxuICogSXQgaXMgc2ltaWxhciB0byBUSFJFRS5TcGhlcmVHZW9tZXRyeSwgYnV0IGl0IGFsc28gY29udGFpbnMgYWxsIGBTaGFwZWAgcHJvcGVydGllcywgc3VjaCBhcyBtYXRlcmlhbCwgbWFzcyBhbmQgdmVjdG9ycyBsaWtlIHBvc2l0aW9uIChwb3MpIGFuZCByb3RhdGlvbiAocm90KS5cbiAqIDxici8+PGJyLz5cbiAqIFRoZW4gaXQgY3JlYXRlcyBhbiBgVGhyZWUuanMgbWVzaGAgb3IgYSBgUGh5c2lqcyBtZXNoYCwgdGhhdCBpcyBzaW1pbGFyIHRvIGBUaHJlZS5qcyBtZXNoYCwgYnV0IGl0IGFsc28gdGFrZSBpbnRvIGNvbnNpZGVyYXRpb24gY29sbGlzaW9uIGNhbGN1bGF0aW9ucy5cbiAqIFRoaXMgbWVzaCBpcyBhIGNvbWJpbmF0aW9uIG9mIGBUaHJlZS5qcyBnZW9tZXRyeWAgYW5kIGBQaHlzaWpzIG1hdGVyaWFsYCAoVGhlIHNhbWUgYXMgaW4gdGhyZWUuanMsIGJ1dCB3aXRoIGZyaWN0aW9uIGFuZCByZXN0aXR1dGlvbikuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1NwaGVyZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBTcGhlcmUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFNwaGVyZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDEwMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTcGhlcmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgd2lkdGhTZWdtZW50czogOCxcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiA2XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgd2lkdGhTZWdtZW50czogOCxcbiAgICAgIGhlaWdodFNlZ21lbnRzOiA2XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydyYWRpdXMnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU3BoZXJlLmRlZmF1bHRzLCBTcGhlcmUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBTcGhlcmVCdWZmZXJHZW9tZXRyeSA6IFNwaGVyZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGhTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50c1xuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU3BoZXJlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVGV0cmFoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgVGV0cmFoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVGV0cmFoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhIHRldHJhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiBjb21wb3NlZCBvZiBmb3VyIHRyaWFuZ3VsYXIgZmFjZXMsIHNpeCBzdHJhaWdodCBlZGdlcywgYW5kIGZvdXIgdmVydGV4IGNvcm5lcnMuXG4gKiBUaGUgdGV0cmFoZWRyb24gaXMgdGhlIHNpbXBsZXN0IG9mIGFsbCB0aGUgb3JkaW5hcnkgY29udmV4IHBvbHloZWRyYSBhbmQgdGhlIG9ubHkgb25lIHRoYXQgaGFzIGZld2VyIHRoYW4gNSBmYWNlcy5cbiAqIDxici8+PGJyLz5cbiAqIGBUZXRyYWhlZHJvbmAgY3JlYXRlcyBhIFRldHJhaGVkcm9uIG9iamVjdCBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RldHJhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRldHJhaGVkcm9uLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUZXRyYWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAwLFxuICogICAgIHk6IDEwMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRldHJhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVGV0cmFoZWRyb24uZGVmYXVsdHMsIFRldHJhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogVGV0cmFoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVGV0cmFoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBGb250LFxuICBNZXNoLFxuICBUZXh0R2VvbWV0cnksXG4gIEZvbnRMb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRleHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRleHQgY2xhc3MgaXMgbWFkZSBmb3IgY3JlYXRpbmcgM0QgdGV4dCBvYmplY3RzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUZXh0R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIDxici8+PGJyLz5cbiAqIFBoeXNpY3MgdGV4dCBvYmplY3QgY2FuIGJlIGNvbnZleCBvciBjb25jYXZlLiBCeSBkZWZhdWx0IGl0J3MgY29udmV4IGJ1dCB5b3UgY2FuIGFsc28gc3dpdGNoIHRvIGNvbmNhdmUuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUZXh0LCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUZXh0KHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICB0ZXh0OiAnaGVsbG8gd29ybGQnLFxuICogICAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICAgIGZvbnQ6ICdwYXRoL3RvL2ZvbnQudHlwZWZhY2UuanMnLFxuICogICAgICAgc2l6ZTogMjAsXG4gKiAgICAgICBoZWlnaHQ6IDUsXG4gKiAgICAgICBjdXJ2ZVNlZ21lbnRzOiA2XG4gKiAgICAgfVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAtNDAsXG4gKiAgICAgeTogMjAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUZXh0IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXh0I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIHRleHQ6ICdIZWxsbyBXb3JsZCEnLFxuICAgKiAgIGxvYWRlcjogbmV3IEZvbnRMb2FkZXIoKSxcbiAgICpcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICBzaXplOiAxMixcbiAgICogICAgIGhlaWdodDogNTAsXG4gICAqICAgICBjdXJ2ZVNlZ21lbnRzOiAxMixcbiAgICogICAgIGZvbnQ6IG5ldyBGb250KCksXG4gICAqICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICAgKiAgICAgYmV2ZWxUaGlja25lc3M6IDEwLFxuICAgKiAgICAgYmV2ZWxTaXplOiA4XG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgdGV4dDogJ0hlbGxvIFdvcmxkIScsXG4gICAgbG9hZGVyOiBuZXcgRm9udExvYWRlcigpLFxuXG4gICAgcGFyYW1ldGVyczoge1xuICAgICAgc2l6ZTogMTIsXG4gICAgICBoZWlnaHQ6IDUwLFxuICAgICAgY3VydmVTZWdtZW50czogMTIsXG4gICAgICBmb250OiBuZXcgRm9udCgpLFxuICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICAgIGJldmVsVGhpY2tuZXNzOiAxMCxcbiAgICAgIGJldmVsU2l6ZTogOFxuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVGV4dC5kZWZhdWx0cywgTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV4dFxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBwYXJhbXMubG9hZGVyLmxvYWQocGFyYW1zLnBhcmFtZXRlcnMuZm9udCwgZm9udCA9PiB7XG4gICAgICAgIHBhcmFtcy5wYXJhbWV0ZXJzLmZvbnQgPSBmb250O1xuXG4gICAgICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG5ldyBUZXh0R2VvbWV0cnkoXG4gICAgICAgICAgICBwYXJhbXMudGV4dCxcbiAgICAgICAgICAgIHBhcmFtcy5wYXJhbWV0ZXJzXG4gICAgICAgICAgKSxcblxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICAgIG1lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICAgICAgICB9KS5tZXNoXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHN1cGVyLndhaXQocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUZXh0XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVG9ydXNHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVG9ydXNcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRvcnVzIGNsYXNzIG1ha2VzIGEgdG9ydXMgZmlndXJlLiBBIGRvbnV0IGlzIGEgdG9ydXMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9pbmRleC5odG1sI2FwaS9nZW9tZXRyaWVzL1RvcnVzR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRvcnVzLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUb3J1cyh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiA1LFxuICogICAgIHR1YmU6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMzVcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVG9ydXMgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEwMCxcbiAgICogICAgIHR1YmU6IDQwLFxuICAgKiAgICAgcmFkaWFsU2VnbWVudHM6IDgsXG4gICAqICAgICB0dWJ1bGFyU2VnbWVudHM6IDYsXG4gICAqICAgICBhcmM6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMTAwLFxuICAgICAgdHViZTogNDAsXG4gICAgICByYWRpYWxTZWdtZW50czogOCxcbiAgICAgIHR1YnVsYXJTZWdtZW50czogNixcbiAgICAgIGFyYzogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1cyNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3R1YmUnLFxuICAgKiAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICogICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgKiAgICAgJ2FyYydcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICd0dWJlJyxcbiAgICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICAgICdhcmMnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUb3J1cy5kZWZhdWx0cywgVG9ydXMuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBUb3J1c0dlb21ldHJ5KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGlhbFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YnVsYXJTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5hcmNcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRvcnVzXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVG9ydXNLbm90QnVmZmVyR2VvbWV0cnksXG4gIFRvcnVzS25vdEdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUb3J1c2tub3RcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRvcnVza25vdCBjbGFzcyBtYWtlcyBhIHRvcnVza25vdCBmaWd1cmUuIEl0J3MgbGlrZSBhIGNyb29rZWQgZG9udXQsIHZlcnkgY3Jvb2tlZC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVG9ydXNLbm90R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRvcnVza25vdCwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVG9ydXNrbm90KHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6NSxcbiAqICAgICB0dWJlOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IHtcbiAqICAgICB5OiAxMDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVG9ydXNrbm90IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3QjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMTAwLFxuICAgKiAgICAgdHViZTogNDAsXG4gICAqICAgICByYWRpYWxTZWdtZW50czogNjQsXG4gICAqICAgICB0dWJ1bGFyU2VnbWVudHM6IDgsXG4gICAqICAgICBwOiAyLFxuICAgKiAgICAgcTogM1xuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEwMCxcbiAgICAgIHR1YmU6IDQwLFxuICAgICAgcmFkaWFsU2VnbWVudHM6IDY0LFxuICAgICAgdHVidWxhclNlZ21lbnRzOiA4LFxuICAgICAgcDogMixcbiAgICAgIHE6IDNcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3QjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICd0dWJlJyxcbiAgICogICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAqICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICogICAgICdwJyxcbiAgICogICAgICdxJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3R1YmUnLFxuICAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgICAgJ3AnLFxuICAgICAgJ3EnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUb3J1c2tub3QuZGVmYXVsdHMsIFRvcnVza25vdC5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNrbm90XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgR0NvbnN0cnVjdCA9IHBhcmFtcy5idWZmZXIgPyBUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSA6IFRvcnVzS25vdEdlb21ldHJ5O1xuXG4gICAgcmV0dXJuIG5ldyBHQ29uc3RydWN0KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGlhbFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YnVsYXJTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnFcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRvcnVza25vdFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIExpbmVDdXJ2ZTMsXG4gIFZlY3RvcjMsXG4gIFR1YmVCdWZmZXJHZW9tZXRyeSxcbiAgVHViZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUdWJlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUdWJlIGNsYXNzIG1ha2VzIGEgdHViZSB0aGF0IGV4dHJ1ZGVzIGFsb25nIGEgM2QgY3VydmUuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9pbmRleC5odG1sI2FwaS9nZW9tZXRyaWVzL1R1YmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVHViZSBmcm9tIGEgdGhyZWUuanMgQ3VydmUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgQ3VzdG9tU2luQ3VydmUgPSBUSFJFRS5DdXJ2ZS5jcmVhdGUoXG4gKiAgIGZ1bmN0aW9uIChzY2FsZSkgeyAvLyBjdXN0b20gY3VydmUgY29uc3RydWN0b3JcbiAqICAgICB0aGlzLnNjYWxlID0gKHNjYWxlID09PSB1bmRlZmluZWQpID8gMSA6IHNjYWxlO1xuICogICB9LFxuICpcbiAqICAgZnVuY3Rpb24gKHQpIHsgLy8gZ2V0UG9pbnQ6IHQgaXMgYmV0d2VlbiAwLTFcbiAqICAgICBjb25zdCB0eCA9IHQgKiAzIC0gMS41LFxuICogICAgIHR5ID0gTWF0aC5zaW4oIDIgKiBNYXRoLlBJICogdCApLFxuICogICAgIHR6ID0gMDtcbiAqXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHR4LCB0eSwgdHopLm11bHRpcGx5U2NhbGFyKHRoaXMuc2NhbGUpO1xuICogICB9XG4gKiApO1xuICpcbiAqIGNvbnN0IHBhdGggPSBuZXcgQ3VzdG9tU2luQ3VydmUoMTApO1xuICpcbiAqIG5ldyBUdWJlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBwYXRoOiBwYXRoXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFR1YmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHBhdGg6IG5ldyBUSFJFRS5MaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAxKSksXG4gICAqICAgICBzZWdtZW50czogMjAsXG4gICAqICAgICByYWRpdXM6IDIsXG4gICAqICAgICByYWRpdXNTZWdtZW50czogOCxcbiAgICogICAgIGNsb3NlZDogZmFsc2VcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcGF0aDogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSxcbiAgICAgIHNlZ21lbnRzOiAyMCxcbiAgICAgIHJhZGl1czogMixcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiA4LFxuICAgICAgY2xvc2VkOiBmYWxzZVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncGF0aCcsXG4gICAqICAgICAnc2VnbWVudHMnLFxuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICAgJ2Nsb3NlZCdcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncGF0aCcsXG4gICAgICAnc2VnbWVudHMnLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2Nsb3NlZCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFR1YmUuZGVmYXVsdHMsIFR1YmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFR1YmVCdWZmZXJHZW9tZXRyeSA6IFR1YmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucGF0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuY2xvc2VkXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUdWJlXG59O1xuIiwiaW1wb3J0IHtPYmplY3QzRH0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgR3JvdXBcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNvbWV0aW1lcyB5b3UgbmVlZCB0byBtYWtlIGdyb3VwcyBvZiBvYmplY3RzIChpdCdzIG5vdCBjb252ZW5pZW50bHkgdG8gYXBwbHkgdHJhbnNmb3JtcyB0byBlYWNoIG9iamVjdCB3aGVuIGNhbiBtYWtlIGp1c3Qgb25lIHRvIGEgZ3JvdXApLjxici8+XG4gKiBJbiBUaHJlZS5qcyB5b3UgbWFrZSBpdCB1c2luZyBgVEhSRUUuT2JqZWN0M0RgIGFuZCBpdCdzIGNoaWxkcmVuLiA8YnIvPjxici8+XG4gKiBJbiB3aHMuanMgd2UgaGF2ZSBgR3JvdXBgXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BcHByb2FjaCAyIC0gQWRkaW5nIG9iamVjdHMgdG8gYW4gZW1wdHkgZ3JvdXA8L2NhcHRpb24+XG4gKiBjb25zdCBzcGhlcmUgPSBuZXcgU3BoZXJlKCk7XG4gKiBjb25zdCBib3ggPSBuZXcgQm94KCk7XG4gKiBjb25zdCBncm91cCA9IG5ldyBHcm91cCgpO1xuICpcbiAqIHNwaGVyZS5hZGRUbyhncm91cCk7XG4gKiBib3guYWRkVG8oZ3JvdXApO1xuKiBAZXhhbXBsZSA8Y2FwdGlvbj5BcHByb2FjaCAyIC0gTWFraW5nIGEgZ3JvdXAgZnJvbSBvYmplY3RzPC9jYXB0aW9uPlxuICogY29uc3Qgc3BoZXJlID0gbmV3IFNwaGVyZSgpO1xuICogY29uc3QgYm94ID0gbmV3IEJveCgpO1xuICogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoYm94LCBzcGhlcmUpO1xuICogLy8gT1I6IGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKFtib3gsIHNwaGVyZV0pO1xuICovXG5jbGFzcyBHcm91cCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciguLi5vYmplY3RzKSB7XG4gICAgc3VwZXIoe30pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvYmogPSBvYmplY3RzW2ldO1xuXG4gICAgICBpZiAob2JqIGluc3RhbmNlb2YgQ29tcG9uZW50KSBvYmouYWRkVG8odGhpcyk7XG4gICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QzRCkgdGhpcy5uYXRpdmUuYWRkKG9iaik7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3QzRCgpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEdyb3VwXG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9tZXNoZXMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQm94JztcbmV4cG9ydCAqIGZyb20gJy4vQ2lyY2xlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29uZSc7XG5leHBvcnQgKiBmcm9tICcuL0N5bGluZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vRG9kZWNhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0cnVkZSc7XG5leHBvcnQgKiBmcm9tICcuL0ljb3NhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vTGF0aGUnO1xuZXhwb3J0ICogZnJvbSAnLi9MaW5lJztcbmV4cG9ydCAqIGZyb20gJy4vSW1wb3J0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9PY3RhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vUGFyYW1ldHJpYyc7XG5leHBvcnQgKiBmcm9tICcuL1BsYW5lJztcbmV4cG9ydCAqIGZyb20gJy4vUG9seWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL1JpbmcnO1xuZXhwb3J0ICogZnJvbSAnLi9TaGFwZSc7XG5leHBvcnQgKiBmcm9tICcuL1NwaGVyZSc7XG5leHBvcnQgKiBmcm9tICcuL1RldHJhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vVGV4dCc7XG5leHBvcnQgKiBmcm9tICcuL1RvcnVzJztcbmV4cG9ydCAqIGZyb20gJy4vVG9ydXNrbm90JztcbmV4cG9ydCAqIGZyb20gJy4vVHViZSc7XG5leHBvcnQgKiBmcm9tICcuL0dyb3VwJztcbiIsIi8qKlxuICogQGNsYXNzIEVsZW1lbnRNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtjb250YWluZXI9ZG9jdW1lbnQuYm9keV0gY29udGFpbmVyIGlzIHRoZSBET00gb2JqZWN0IHRvIHdoaWNoIGFwcGxpY2F0aW9uJ3MgY2FudmFzIHdpbGwgYmUgYWRkZWQgdG8uXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBlbGVtZW50IG1vZHVsZSwgcGFzc2luZyBpdCB0byB0aGUgQXBwPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIG5ldyBFbGVtZW50TW9kdWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRWxlbWVudE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5lcikge1xuICAgICAgY29uc29sZS53YXJuKCdFbGVtZW50TW9kdWxlIG5vdyBhY2NlcHRzIG9ubHkgYXJndW1lbnQgd2hpY2ggaXMgYSBET00gb2JqZWN0LCBub3QgYSBwYXJhbXMgb2JqZWN0LicpO1xuICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXIuY29udGFpbmVyO1xuICAgIH0gZWxzZSB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgIHRoaXMuY3JlYXRlRWxlbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY3JlYXRlRWxlbWVudFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYSBjYW52YXMgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd3aHMtYXBwJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAnaW5oZXJpdCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICdpbmhlcml0JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2VsZW1lbnQnLCB0aGlzLmVsZW1lbnQpO1xuICAgIG1hbmFnZXIuc2V0KCdjb250YWluZXInLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWxlbWVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFdlYkdMUmVuZGVyZXIsXG4gIFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbi8qKlxuICogQGNsYXNzIFJlbmRlcmluZ01vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIHJlbmRlcmluZyBtb2R1bGUgYW5kIHBhc3NpbmcgaXQgdG8gQXBwJ3MgbW9kdWxlczwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICBuZXcgRWxlbWVudE1vZHVsZSgpLFxuICogICBuZXcgU2NlbmVNb2R1bGUoKSxcbiAqICAgbmV3IENhbWVyYU1vZHVsZSh7XG4gKiAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDYsIDE4KSxcbiAqICAgICBmYXI6IDEwMDAwXG4gKiAgIH0pLFxuICogICBuZXcgUmVuZGVyaW5nTW9kdWxlKHtcbiAqICAgICBiZ0NvbG9yOiAweDE2MjEyOSxcbiAqXG4gKiAgICAgcmVuZGVyZXI6IHtcbiAqICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAqICAgICAgIHNoYWRvd21hcDoge1xuICogICAgICAgICB0eXBlOiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gKiAgICAgICB9XG4gKiAgICAgfVxuICogICB9LCB7c2hhZG93OiB0cnVlfSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTW9kdWxlIHtcbiAgc3RhdGljIGFkZGl0aW9uYWwgPSB7XG4gICAgc2hhZG93KHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlZCA9IHRydWU7XG5cbiAgZGVmZXIgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwge3NoYWRvdzogaXNTaGFkb3d9ID0ge3NoYWRvdzogZmFsc2V9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXG4gICAgICByZXNvbHV0aW9uOiBuZXcgVmVjdG9yMigxLCAxKSxcbiAgICAgIHBpeGVsUmF0aW86IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxuXG4gICAgICBiZ0NvbG9yOiAweDAwMDAwMCxcbiAgICAgIGJnT3BhY2l0eTogMSxcblxuICAgICAgcmVuZGVyZXI6IHt9XG4gICAgfSwgcGFyYW1zKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGJnQ29sb3IsXG4gICAgICBiZ09wYWNpdHksXG4gICAgICByZW5kZXJlcixcbiAgICAgIHBpeGVsUmF0aW8sXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHJlc29sdXRpb25cbiAgICB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIocmVuZGVyZXIpO1xuICAgIHRoaXMuZWZmZWN0cyA9IFtdO1xuICAgIHRoaXMuYXBwbHlBZGRpdGlvbmFsKCdzaGFkb3cnLCBpc1NoYWRvdyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoXG4gICAgICBiZ0NvbG9yLFxuICAgICAgYmdPcGFjaXR5XG4gICAgKTtcblxuICAgIGlmIChwaXhlbFJhdGlvKSB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8ocGl4ZWxSYXRpbyk7XG5cbiAgICB0aGlzLnNldFNpemUoXG4gICAgICBOdW1iZXIod2lkdGggKiByZXNvbHV0aW9uLngpLnRvRml4ZWQoKSxcbiAgICAgIE51bWJlcihoZWlnaHQgKiByZXNvbHV0aW9uLnkpLnRvRml4ZWQoKVxuICAgICk7XG4gIH1cblxuICBhcHBseUFkZGl0aW9uYWwobmFtZSwgaXNBcHBsaWVkID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzQXBwbGllZCkgcmV0dXJuO1xuICAgIFJlbmRlcmluZ01vZHVsZS5hZGRpdGlvbmFsW25hbWVdLmFwcGx5KHRoaXMsIFt0aGlzLnJlbmRlcmVyXSk7XG4gIH1cblxuICBpbnRlZ3JhdGVSZW5kZXJlcihlbGVtZW50LCBzY2VuZSwgY2FtZXJhKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMucmVuZGVyTG9vcCA9IG5ldyBMb29wKCgpID0+IHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKSk7XG4gICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50KTtcblxuICAgIHJldHVybiB0aGlzLnJlbmRlckxvb3A7XG4gIH1cblxuICBlZmZlY3QoZWZmZWN0LCBjYikge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlckxvb3Auc3RvcCgpO1xuXG4gICAgICBjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XG4gICAgICBlZmZlY3Quc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChjYiA/IGNiIDogKCkgPT4ge1xuICAgICAgICBlZmZlY3QucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmVmZmVjdHMucHVzaChsb29wKTtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIGxvb3Auc3RhcnQodGhpcy5hcHApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0U2l6ZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIHJlbmRlciB0YXJnZXQgd2lkdGggYW5kIGhlaWdodC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZW5kZXJpbmdNb2R1bGVcbiAgICovXG4gIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGlmICh0aGlzLnJlbmRlcmVyKSB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBhdHRhY2hUb0NhbnZhcyhlbGVtZW50KSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuXG4gICAgLy8gYXR0YWNoIHRvIG5ldyBwYXJlbnQgd29ybGQgZG9tXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlbmRlckxvb3Auc3RvcCgpO1xuICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdG9wKCkpO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnJlbmRlckxvb3Auc3RhcnQoKTtcbiAgICB0aGlzLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RhcnQoKSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncmVuZGVyaW5nJyk7XG4gICAgbWFuYWdlci5zZXQoJ3JlbmRlcmVyJywgdGhpcy5yZW5kZXJlcik7XG5cbiAgICB0aGlzLmFwcCA9IG1hbmFnZXIuaGFuZGxlcjtcblxuICAgIHRoaXMucmVuZGVyTG9vcCA9IHRoaXMuaW50ZWdyYXRlUmVuZGVyZXIoXG4gICAgICBtYW5hZ2VyLmdldCgnZWxlbWVudCcpLFxuICAgICAgbWFuYWdlci5nZXQoJ3NjZW5lJyksXG4gICAgICBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlXG4gICAgKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQgPT4ge1xuICAgICAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpO1xuICAgICAgfSxcbiAgICAgIHNjZW5lOiBzY2VuZSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICAgIH0sXG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhLm5hdGl2ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVzb2x2ZSgpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLnJlbmRlckxvb3Auc3RhcnQodGhpcyk7XG4gICAgc2VsZi5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0YXJ0KHRoaXMpKTtcbiAgfVxuXG4gIGRpc3Bvc2Uoc2VsZikge1xuICAgIHNlbGYucmVuZGVyTG9vcC5zdG9wKHRoaXMpO1xuICAgIHNlbGYuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdG9wKHRoaXMpKTtcbiAgICBzZWxmLnJlbmRlcmVyLmZvcmNlQ29udGV4dExvc3MoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgU2NlbmVcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBTY2VuZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3aWxsU2NlbmVCZVJlcGxhY2VkPWZhbHNlXSB3aWxsU2NlbmVCZVJlcGxhY2VkIHNob3VsZCBiZSB0cnVlIG9ubHkgaWYgeW91IGFyZSBnb2luZyB0byBvdmVyd3JpdGUgc2NlbmUgZGVwZW5kZW5jeSBldmVuIHdpdGhvdXQgdGhlIHVzZSBvZiBkZWZhdWx0IG9uZS5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqL1xuZXhwb3J0IGNsYXNzIFNjZW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3Iod2lsbFNjZW5lQmVSZXBsYWNlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5zY2VuZSA9IHdpbGxTY2VuZUJlUmVwbGFjZWQgPyBudWxsIDogbmV3IFNjZW5lKCk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnc2NlbmUnLCB0aGlzLnNjZW5lKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuXG4gICAgdGhpcy5hZGQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBvYmplY3QucGFyZW50ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgb2JqZWN0LmRlZmVyKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB7bmF0aXZlfSA9IG9iamVjdDtcbiAgICAgICAgICBpZiAoIW5hdGl2ZSkgcmVqZWN0KCk7XG5cbiAgICAgICAgICBjb25zdCBhZGRQcm9taXNlID0gdGhpcy5hcHBseUJyaWRnZSh7b25BZGQ6IG9iamVjdH0pLm9uQWRkO1xuXG4gICAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLnNjZW5lLmFkZChuYXRpdmUpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGFkZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgYWRkUHJvbWlzZS50aGVuKHJlc29sdmVyKTtcbiAgICAgICAgICBlbHNlIHJlc29sdmVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgb2JqZWN0LnBhcmVudCA9IG51bGw7XG4gICAgICBzZWxmLnNjZW5lLnJlbW92ZShvYmplY3QubmF0aXZlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRTY2VuZSA9IGZ1bmN0aW9uIChzY2VuZSkge1xuICAgICAgc2VsZi5zY2VuZSA9IHNjZW5lO1xuICAgICAgdGhpcy5tYW5hZ2VyLnNldCgnc2NlbmUnLCBzY2VuZSk7XG4gICAgfTtcbiAgfVxufVxuIiwiLy8gaW1wb3J0IHthZGRSZXNpemVMaXN0ZW5lcn0gZnJvbSAnZGV0ZWN0LWVsZW1lbnQtcmVzaXplJztcblxuLyoqXG4gKiBAY2xhc3MgUmVzaXplTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXthdXRvOiB0cnVlfV0gLSBJZiBhdXRvIGlzIHNldCB0byB0cnVlIC0gcmVzaXplIHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gY29udGFpbmVyIHJlc2l6ZXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc2l6ZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGF1dG86IHRydWVcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbdGhpcy5zZXRTaXplLmJpbmQodGhpcyldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiBzZXRTaXplXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwcm92aWRlZCB3aWR0aCAmIGhlaWdodCB0byB0aGUgcmVuZGVyZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gW3dpZHRoPTFdIC0gVGhlIHByb21pc2UgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gYSBxdWV1ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHQ9MV0gLSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIHNldFNpemUod2lkdGggPSAxLCBoZWlnaHQgPSAxKSB7XG4gICAgdGhpcy5jYW1lcmEubmF0aXZlLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgIHRoaXMuY2FtZXJhLm5hdGl2ZS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHRoaXMucmVuZGVyaW5nLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB0cmlnZ2VyXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVHJpZ2dlcnMgcmVzaXplIHdoZW4gY2FsbGVkLiB3aWR0aCAmIGhlaWdodCBhcmUgZGV0ZXJtaW5lZCBhdXRvbWF0aWNhbGx5XG4gICAqIFRoaXMgaW52b2tlcyBlYWNoIGNhbGxiYWNrcyB3aXRoIHRoZSBuZXcgd2lkdGggYW5kIGhlaWdodCBhcyBwYXJhbXNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIHRyaWdnZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgIG9mZnNldFdpZHRoLFxuICAgICAgICBvZmZzZXRIZWlnaHRcbiAgICAgIH0sXG4gICAgICByZXNvbHV0aW9uXG4gICAgfSA9IHRoaXM7XG5cbiAgICBjb25zdCB3aWR0aCA9IE51bWJlcihvZmZzZXRXaWR0aCAqIHJlc29sdXRpb24ueCkudG9GaXhlZCgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcihvZmZzZXRIZWlnaHQgKiByZXNvbHV0aW9uLnkpLnRvRml4ZWQoKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzLmZvckVhY2goY2IgPT4ge1xuICAgICAgY2Iod2lkdGgsIGhlaWdodCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRBdXRvcmVzaXplXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyBtb2R1bGUgdG8gYXV0b3Jlc2l6ZSwgdGhpcyBhZGRzIGFuIGV2ZW50IGxpc3RlbmUgb24gd2luZG93IHJlc2l6ZSB0byB0cmlnZ2VyIHRoZSByZXNpemVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGFkZEF1dG9yZXNpemUoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbnRhaW5lcigpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRoaXMuZ2V0UmVzb2x1dGlvbigpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmF1dG8pIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnRyaWdnZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRDYWxsYmFja1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBjYWxsIGJhY2sgZnVuY3Rpb24gdG8gdGhlIGV4aXN0aW5nIGNhbGxiYWNrcyBsaXN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFkZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgYWRkQ2FsbGJhY2soZnVuYykge1xuICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goZnVuYyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncmVzaXplJyk7XG5cbiAgICB0aGlzLnJlbmRlcmluZyA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgdGhpcy5nZXRSZXNvbHV0aW9uID0gKCkgPT4gbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLnBhcmFtcy5yZXNvbHV0aW9uO1xuICAgIHRoaXMuZ2V0Q29udGFpbmVyID0gKCkgPT4gbWFuYWdlci5nZXQoJ2NvbnRhaW5lcicpO1xuXG4gICAgdGhpcy5hZGRBdXRvcmVzaXplKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdFByZXZpb3VzTHVtO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHRDdXJyZW50THVtO1xcclxcbnVuaWZvcm0gZmxvYXQgbWluTHVtaW5hbmNlO1xcclxcbnVuaWZvcm0gZmxvYXQgZGVsdGE7XFxyXFxudW5pZm9ybSBmbG9hdCB0YXU7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgcHJldmlvdXNMdW0gPSB0ZXh0dXJlMkQodFByZXZpb3VzTHVtLCB2VXYsIE1JUF9MRVZFTF8xWDEpLnI7XFxyXFxuXFx0ZmxvYXQgY3VycmVudEx1bSA9IHRleHR1cmUyRCh0Q3VycmVudEx1bSwgdlV2LCBNSVBfTEVWRUxfMVgxKS5yO1xcclxcblxcclxcblxcdHByZXZpb3VzTHVtID0gbWF4KG1pbkx1bWluYW5jZSwgcHJldmlvdXNMdW0pO1xcclxcblxcdGN1cnJlbnRMdW0gPSBtYXgobWluTHVtaW5hbmNlLCBjdXJyZW50THVtKTtcXHJcXG5cXHJcXG5cXHQvLyBBZGFwdCB0aGUgbHVtaW5hbmNlIHVzaW5nIFBhdHRhbmFpaydzIHRlY2huaXF1ZS5cXHJcXG5cXHRmbG9hdCBhZGFwdGVkTHVtID0gcHJldmlvdXNMdW0gKyAoY3VycmVudEx1bSAtIHByZXZpb3VzTHVtKSAqICgxLjAgLSBleHAoLWRlbHRhICogdGF1KSk7XFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yLnIgPSBhZGFwdGVkTHVtO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBhZGFwdGl2ZSBsdW1pbm9zaXR5IHNoYWRlciBtYXRlcmlhbC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgYWRhcHRpdmUgbHVtaW5vc2l0eSBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0ZGVmaW5lczoge1xyXG5cclxuXHRcdFx0XHRNSVBfTEVWRUxfMVgxOiBcIjAuMFwiXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dFByZXZpb3VzTHVtOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0Q3VycmVudEx1bTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0bWluTHVtaW5hbmNlOiBuZXcgVW5pZm9ybSgwLjAxKSxcclxuXHRcdFx0XHRkZWx0YTogbmV3IFVuaWZvcm0oMC4wKSxcclxuXHRcdFx0XHR0YXU6IG5ldyBVbmlmb3JtKDEuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHREZXB0aDtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IGZvY3VzO1xcclxcbnVuaWZvcm0gZmxvYXQgYXNwZWN0O1xcclxcbnVuaWZvcm0gZmxvYXQgYXBlcnR1cmU7XFxyXFxudW5pZm9ybSBmbG9hdCBtYXhCbHVyO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxuI2lmbmRlZiBVU0VfTE9HREVQVEhCVUZcXHJcXG5cXHJcXG5cXHQjaW5jbHVkZSA8cGFja2luZz5cXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IGNhbWVyYU5lYXI7XFxyXFxuXFx0dW5pZm9ybSBmbG9hdCBjYW1lcmFGYXI7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgcmVhZERlcHRoKHNhbXBsZXIyRCBkZXB0aFNhbXBsZXIsIHZlYzIgY29vcmQpIHtcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBmcmFnQ29vcmRaID0gdGV4dHVyZTJEKGRlcHRoU2FtcGxlciwgY29vcmQpLng7XFxyXFxuXFx0XFx0ZmxvYXQgdmlld1ogPSBwZXJzcGVjdGl2ZURlcHRoVG9WaWV3WihmcmFnQ29vcmRaLCBjYW1lcmFOZWFyLCBjYW1lcmFGYXIpO1xcclxcblxcclxcblxcdFxcdHJldHVybiB2aWV3WlRvT3J0aG9ncmFwaGljRGVwdGgodmlld1osIGNhbWVyYU5lYXIsIGNhbWVyYUZhcik7XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGFzcGVjdENvcnJlY3Rpb24gPSB2ZWMyKDEuMCwgYXNwZWN0KTtcXHJcXG5cXHJcXG5cXHQjaWZkZWYgVVNFX0xPR0RFUFRIQlVGXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZGVwdGggPSB0ZXh0dXJlMkQodERlcHRoLCB2VXYpLng7XFxyXFxuXFxyXFxuXFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBkZXB0aCA9IHJlYWREZXB0aCh0RGVwdGgsIHZVdik7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0ZmxvYXQgZmFjdG9yID0gZGVwdGggLSBmb2N1cztcXHJcXG5cXHJcXG5cXHR2ZWMyIGRvZkJsdXIgPSB2ZWMyKGNsYW1wKGZhY3RvciAqIGFwZXJ0dXJlLCAtbWF4Qmx1ciwgbWF4Qmx1cikpO1xcclxcblxcclxcblxcdHZlYzIgZG9mYmx1cjkgPSBkb2ZCbHVyICogMC45O1xcclxcblxcdHZlYzIgZG9mYmx1cjcgPSBkb2ZCbHVyICogMC43O1xcclxcblxcdHZlYzIgZG9mYmx1cjQgPSBkb2ZCbHVyICogMC40O1xcclxcblxcclxcblxcdHZlYzQgY29sb3IgPSB2ZWM0KDAuMCk7XFxyXFxuXFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoIDAuMCwgICAwLjQgKSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4xNSwgIDAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjI5LCAgMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoLTAuMzcsICAwLjE1KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC40MCwgIDAuMCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjM3LCAtMC4xNSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoIDAuMjksIC0wLjI5KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4xNSwgLTAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjAsICAtMC40ICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoLTAuMTUsICAwLjM3KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4yOSwgIDAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjM3LCAgMC4xNSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoLTAuNCwgICAwLjAgKSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4zNywgLTAuMTUpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjI5LCAtMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoIDAuMTUsIC0wLjM3KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4xNSwgIDAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4zNywgIDAuMTUpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4zNywgLTAuMTUpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4xNSwgLTAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4xNSwgIDAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4zNywgIDAuMTUpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4zNywgLTAuMTUpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4xNSwgLTAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyOSk7XFxyXFxuXFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4yOSwgIDAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC40MCwgIDAuMCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4yOSwgLTAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4wLCAgLTAuNCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4yOSwgIDAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC40LCAgIDAuMCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4yOSwgLTAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4wLCAgIDAuNCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNyk7XFxyXFxuXFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4yOSwgIDAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC40LCAgIDAuMCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4yOSwgLTAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4wLCAgLTAuNCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4yOSwgIDAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC40LCAgIDAuMCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4yOSwgLTAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4wLCAgIDAuNCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZibHVyNCk7XFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gY29sb3IgLyA0MS4wO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBEZXB0aCBvZiBGaWVsZCBzaGFkZXIgKEJva2VoKS5cclxuICpcclxuICogT3JpZ2luYWwgc2hhZGVyIGNvZGUgYnkgTWFydGlucyBVcGl0aXM6XHJcbiAqICBodHRwOi8vYXJ0bWFydGluc2guYmxvZ3Nwb3QuY29tLzIwMTAvMDIvZ2xzbC1sZW5zLWJsdXItZmlsdGVyLXdpdGgtYm9rZWguaHRtbFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2tlaE1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGJva2VoIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQZXJzcGVjdGl2ZUNhbWVyYX0gW2NhbWVyYV0gLSBBIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZvY3VzPTEuMF0gLSBGb2N1cyBkaXN0YW5jZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYXBlcnR1cmU9MC4wMjVdIC0gQ2FtZXJhIGFwZXJ0dXJlIHNjYWxlLiBCaWdnZXIgdmFsdWVzIGZvciBzaGFsbG93ZXIgZGVwdGggb2YgZmllbGQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heEJsdXI9MS4wXSAtIE1heGltdW0gYmx1ciBzdHJlbmd0aC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5mb2N1cyA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuZm9jdXMgPSAxLjA7IH1cclxuXHRcdGlmKG9wdGlvbnMuYXBlcnR1cmUgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLmFwZXJ0dXJlID0gMC4wMjU7IH1cclxuXHRcdGlmKG9wdGlvbnMubWF4Qmx1ciA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMubWF4Qmx1ciA9IDEuMDsgfVxyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQm9rZWhNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0Y2FtZXJhTmVhcjogbmV3IFVuaWZvcm0oMC4xKSxcclxuXHRcdFx0XHRjYW1lcmFGYXI6IG5ldyBVbmlmb3JtKDIwMDApLFxyXG5cdFx0XHRcdGFzcGVjdDogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHREZXB0aDogbmV3IFVuaWZvcm0obnVsbCksXHJcblxyXG5cdFx0XHRcdGZvY3VzOiBuZXcgVW5pZm9ybShvcHRpb25zLmZvY3VzKSxcclxuXHRcdFx0XHRhcGVydHVyZTogbmV3IFVuaWZvcm0ob3B0aW9ucy5hcGVydHVyZSksXHJcblx0XHRcdFx0bWF4Qmx1cjogbmV3IFVuaWZvcm0ob3B0aW9ucy5tYXhCbHVyKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGNhbWVyYSAhPT0gbnVsbCkgeyB0aGlzLmFkb3B0Q2FtZXJhU2V0dGluZ3MoY2FtZXJhKTsgfVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkb3B0cyB0aGUgc2V0dGluZ3Mgb2YgdGhlIGdpdmVuIGNhbWVyYS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGVyc3BlY3RpdmVDYW1lcmF9IGNhbWVyYSAtIEEgY2FtZXJhLlxyXG5cdCAqL1xyXG5cclxuXHRhZG9wdENhbWVyYVNldHRpbmdzKGNhbWVyYSkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXMuY2FtZXJhTmVhci52YWx1ZSA9IGNhbWVyYS5uZWFyO1xyXG5cdFx0dGhpcy51bmlmb3Jtcy5jYW1lcmFGYXIudmFsdWUgPSBjYW1lcmEuZmFyO1xyXG5cdFx0dGhpcy51bmlmb3Jtcy5hc3BlY3QudmFsdWUgPSBjYW1lcmEuYXNwZWN0O1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdERlcHRoO1xcclxcblxcclxcbnVuaWZvcm0gdmVjMiB0ZXhlbFNpemU7XFxyXFxudW5pZm9ybSB2ZWMyIGhhbGZUZXhlbFNpemU7XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBjYW1lcmFOZWFyO1xcclxcbnVuaWZvcm0gZmxvYXQgY2FtZXJhRmFyO1xcclxcblxcclxcbnVuaWZvcm0gZmxvYXQgZm9jYWxMZW5ndGg7XFxyXFxudW5pZm9ybSBmbG9hdCBmb2NhbFN0b3A7XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBtYXhCbHVyO1xcclxcbnVuaWZvcm0gZmxvYXQgbHVtaW5hbmNlVGhyZXNob2xkO1xcclxcbnVuaWZvcm0gZmxvYXQgbHVtaW5hbmNlR2FpbjtcXHJcXG51bmlmb3JtIGZsb2F0IGJpYXM7XFxyXFxudW5pZm9ybSBmbG9hdCBmcmluZ2U7XFxyXFxudW5pZm9ybSBmbG9hdCBkaXRoZXJTdHJlbmd0aDtcXHJcXG5cXHJcXG4jaWZkZWYgU0hBREVSX0ZPQ1VTXFxyXFxuXFxyXFxuXFx0dW5pZm9ybSB2ZWMyIGZvY3VzQ29vcmRzO1xcclxcblxcclxcbiNlbHNlXFxyXFxuXFxyXFxuXFx0dW5pZm9ybSBmbG9hdCBmb2NhbERlcHRoO1xcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxuI2lmbmRlZiBVU0VfTE9HREVQVEhCVUZcXHJcXG5cXHJcXG5cXHQjaW5jbHVkZSA8cGFja2luZz5cXHJcXG5cXHJcXG5cXHRmbG9hdCByZWFkRGVwdGgoc2FtcGxlcjJEIGRlcHRoU2FtcGxlciwgdmVjMiBjb29yZCkge1xcclxcblxcclxcblxcdFxcdGZsb2F0IGZyYWdDb29yZFogPSB0ZXh0dXJlMkQoZGVwdGhTYW1wbGVyLCBjb29yZCkueDtcXHJcXG5cXHRcXHRmbG9hdCB2aWV3WiA9IHBlcnNwZWN0aXZlRGVwdGhUb1ZpZXdaKGZyYWdDb29yZFosIGNhbWVyYU5lYXIsIGNhbWVyYUZhcik7XFxyXFxuXFxyXFxuXFx0XFx0cmV0dXJuIHZpZXdaVG9PcnRob2dyYXBoaWNEZXB0aCh2aWV3WiwgY2FtZXJhTmVhciwgY2FtZXJhRmFyKTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxuI2lmZGVmIFBFTlRBR09OXFxyXFxuXFxyXFxuXFx0ZmxvYXQgcGVudGEodmVjMiBjb29yZHMpIHtcXHJcXG5cXHJcXG5cXHRcXHRjb25zdCB2ZWM0IEhTMCA9IHZlYzQoIDEuMCwgICAgICAgICAgMC4wLCAgICAgICAgIDAuMCwgMS4wKTtcXHJcXG5cXHRcXHRjb25zdCB2ZWM0IEhTMSA9IHZlYzQoIDAuMzA5MDE2OTk0LCAgMC45NTEwNTY1MTYsIDAuMCwgMS4wKTtcXHJcXG5cXHRcXHRjb25zdCB2ZWM0IEhTMiA9IHZlYzQoLTAuODA5MDE2OTk0LCAgMC41ODc3ODUyNTIsIDAuMCwgMS4wKTtcXHJcXG5cXHRcXHRjb25zdCB2ZWM0IEhTMyA9IHZlYzQoLTAuODA5MDE2OTk0LCAtMC41ODc3ODUyNTIsIDAuMCwgMS4wKTtcXHJcXG5cXHRcXHRjb25zdCB2ZWM0IEhTNCA9IHZlYzQoIDAuMzA5MDE2OTk0LCAtMC45NTEwNTY1MTYsIDAuMCwgMS4wKTtcXHJcXG5cXHRcXHRjb25zdCB2ZWM0IEhTNSA9IHZlYzQoIDAuMCwgICAgICAgICAgMC4wLCAgICAgICAgIDEuMCwgMS4wKTtcXHJcXG5cXHJcXG5cXHRcXHRjb25zdCB2ZWM0IE9ORSA9IHZlYzQoMS4wKTtcXHJcXG5cXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBQX0ZFQVRIRVIgPSAwLjQ7XFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgTl9GRUFUSEVSID0gLVBfRkVBVEhFUjtcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBpbk9yT3V0ID0gLTQuMDtcXHJcXG5cXHJcXG5cXHRcXHR2ZWM0IFAgPSB2ZWM0KGNvb3JkcywgdmVjMihSSU5HU19GTE9BVCAtIDEuMykpO1xcclxcblxcclxcblxcdFxcdHZlYzQgZGlzdCA9IHZlYzQoXFxyXFxuXFx0XFx0XFx0ZG90KFAsIEhTMCksXFxyXFxuXFx0XFx0XFx0ZG90KFAsIEhTMSksXFxyXFxuXFx0XFx0XFx0ZG90KFAsIEhTMiksXFxyXFxuXFx0XFx0XFx0ZG90KFAsIEhTMylcXHJcXG5cXHRcXHQpO1xcclxcblxcclxcblxcdFxcdGRpc3QgPSBzbW9vdGhzdGVwKE5fRkVBVEhFUiwgUF9GRUFUSEVSLCBkaXN0KTtcXHJcXG5cXHJcXG5cXHRcXHRpbk9yT3V0ICs9IGRvdChkaXN0LCBPTkUpO1xcclxcblxcclxcblxcdFxcdGRpc3QueCA9IGRvdChQLCBIUzQpO1xcclxcblxcdFxcdGRpc3QueSA9IEhTNS53IC0gYWJzKFAueik7XFxyXFxuXFxyXFxuXFx0XFx0ZGlzdCA9IHNtb290aHN0ZXAoTl9GRUFUSEVSLCBQX0ZFQVRIRVIsIGRpc3QpO1xcclxcblxcdFxcdGluT3JPdXQgKz0gZGlzdC54O1xcclxcblxcclxcblxcdFxcdHJldHVybiBjbGFtcChpbk9yT3V0LCAwLjAsIDEuMCk7XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbiNpZmRlZiBTSE9XX0ZPQ1VTXFxyXFxuXFxyXFxuXFx0dmVjMyBkZWJ1Z0ZvY3VzKHZlYzMgYywgZmxvYXQgYmx1ciwgZmxvYXQgZGVwdGgpIHtcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBlZGdlID0gMC4wMDIgKiBkZXB0aDtcXHJcXG5cXHRcXHRmbG9hdCBtID0gY2xhbXAoc21vb3Roc3RlcCgwLjAsIGVkZ2UsIGJsdXIpLCAwLjAsIDEuMCk7XFxyXFxuXFx0XFx0ZmxvYXQgZSA9IGNsYW1wKHNtb290aHN0ZXAoMS4wIC0gZWRnZSwgMS4wLCBibHVyKSwgMC4wLCAxLjApO1xcclxcblxcclxcblxcdFxcdGMgPSBtaXgoYywgdmVjMygxLjAsIDAuNSwgMC4wKSwgKDEuMCAtIG0pICogMC42KTtcXHJcXG5cXHRcXHRjID0gbWl4KGMsIHZlYzMoMC4wLCAwLjUsIDEuMCksICgoMS4wIC0gZSkgLSAoMS4wIC0gbSkpICogMC4yKTtcXHJcXG5cXHJcXG5cXHRcXHRyZXR1cm4gYztcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxuI2lmZGVmIFZJR05FVFRFXFxyXFxuXFxyXFxuXFx0ZmxvYXQgdmlnbmV0dGUoKSB7XFxyXFxuXFxyXFxuXFx0XFx0Y29uc3QgdmVjMiBDRU5URVIgPSB2ZWMyKDAuNSk7XFxyXFxuXFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgVklHTkVUVEVfT1VUID0gMS4zO1xcclxcblxcdFxcdGNvbnN0IGZsb2F0IFZJR05FVFRFX0lOID0gMC4wO1xcclxcblxcdFxcdGNvbnN0IGZsb2F0IFZJR05FVFRFX0ZBREUgPSAyMi4wOyBcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBkID0gZGlzdGFuY2UodlV2LCBDRU5URVIpO1xcclxcblxcdFxcdGQgPSBzbW9vdGhzdGVwKFZJR05FVFRFX09VVCArIChmb2NhbFN0b3AgLyBWSUdORVRURV9GQURFKSwgVklHTkVUVEVfSU4gKyAoZm9jYWxTdG9wIC8gVklHTkVUVEVfRkFERSksIGQpO1xcclxcblxcclxcblxcdFxcdHJldHVybiBjbGFtcChkLCAwLjAsIDEuMCk7XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbnZlYzIgcmFuZCh2ZWMyIGNvb3JkKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBub2lzZTtcXHJcXG5cXHJcXG5cXHQjaWZkZWYgTk9JU0VcXHJcXG5cXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBhID0gMTIuOTg5ODtcXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBiID0gNzguMjMzO1xcclxcblxcdFxcdGNvbnN0IGZsb2F0IGMgPSA0Mzc1OC41NDUzO1xcclxcblxcclxcblxcdFxcdG5vaXNlLnggPSBjbGFtcChmcmFjdChzaW4obW9kKGRvdChjb29yZCwgdmVjMihhLCBiKSksIDMuMTQpKSAqIGMpLCAwLjAsIDEuMCkgKiAyLjAgLSAxLjA7XFxyXFxuXFx0XFx0bm9pc2UueSA9IGNsYW1wKGZyYWN0KHNpbihtb2QoZG90KGNvb3JkLCB2ZWMyKGEsIGIpICogMi4wKSwgMy4xNCkpICogYyksIDAuMCwgMS4wKSAqIDIuMCAtIDEuMDtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdG5vaXNlLnggPSAoKGZyYWN0KDEuMCAtIGNvb3JkLnMgKiBoYWxmVGV4ZWxTaXplLngpICogMC4yNSkgKyAoZnJhY3QoY29vcmQudCAqIGhhbGZUZXhlbFNpemUueSkgKiAwLjc1KSkgKiAyLjAgLSAxLjA7XFxyXFxuXFx0XFx0bm9pc2UueSA9ICgoZnJhY3QoMS4wIC0gY29vcmQucyAqIGhhbGZUZXhlbFNpemUueCkgKiAwLjc1KSArIChmcmFjdChjb29yZC50ICogaGFsZlRleGVsU2l6ZS55KSAqIDAuMjUpKSAqIDIuMCAtIDEuMDtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRyZXR1cm4gbm9pc2U7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnZlYzMgcHJvY2Vzc1RleGVsKHZlYzIgY29vcmRzLCBmbG9hdCBibHVyKSB7XFxyXFxuXFxyXFxuXFx0Y29uc3QgdmVjMyBMVU1fQ09FRkYgPSB2ZWMzKDAuMjk5LCAwLjU4NywgMC4xMTQpO1xcclxcblxcclxcblxcdHZlYzMgYztcXHJcXG5cXHRjLnIgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkcyArIHZlYzIoMC4wLCAxLjApICogdGV4ZWxTaXplICogZnJpbmdlICogYmx1cikucjtcXHJcXG5cXHRjLmcgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkcyArIHZlYzIoLTAuODY2LCAtMC41KSAqIHRleGVsU2l6ZSAqIGZyaW5nZSAqIGJsdXIpLmc7XFxyXFxuXFx0Yy5iID0gdGV4dHVyZTJEKHREaWZmdXNlLCBjb29yZHMgKyB2ZWMyKDAuODY2LCAtMC41KSAqIHRleGVsU2l6ZSAqIGZyaW5nZSAqIGJsdXIpLmI7XFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRlIHRoZSBsdW1pbmFuY2Ugb2YgdGhlIGNvbnN0cnVjdGVkIGNvbG91ci5cXHJcXG5cXHRmbG9hdCBsdW1pbmFuY2UgPSBkb3QoYy5yZ2IsIExVTV9DT0VGRik7XFxyXFxuXFx0ZmxvYXQgdGhyZXNob2xkID0gbWF4KChsdW1pbmFuY2UgLSBsdW1pbmFuY2VUaHJlc2hvbGQpICogbHVtaW5hbmNlR2FpbiwgMC4wKTtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gYyArIG1peCh2ZWMzKDAuMCksIGMsIHRocmVzaG9sZCAqIGJsdXIpO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCBsaW5lYXJpemUoZmxvYXQgZGVwdGgpIHtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gLWNhbWVyYUZhciAqIGNhbWVyYU5lYXIgLyAoZGVwdGggKiAoY2FtZXJhRmFyIC0gY2FtZXJhTmVhcikgLSBjYW1lcmFGYXIpO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCBnYXRoZXIoZmxvYXQgaSwgZmxvYXQgaiwgZmxvYXQgcmluZ1NhbXBsZXMsIGlub3V0IHZlYzMgY29sb3IsIGZsb2F0IHcsIGZsb2F0IGgsIGZsb2F0IGJsdXIpIHtcXHJcXG5cXHJcXG5cXHRjb25zdCBmbG9hdCBUV09fUEkgPSA2LjI4MzE4NTMxO1xcclxcblxcclxcblxcdGZsb2F0IHN0ZXAgPSBUV09fUEkgLyByaW5nU2FtcGxlcztcXHJcXG5cXHRmbG9hdCBwdyA9IGNvcyhqICogc3RlcCkgKiBpO1xcclxcblxcdGZsb2F0IHBoID0gc2luKGogKiBzdGVwKSAqIGk7XFxyXFxuXFxyXFxuXFx0I2lmZGVmIFBFTlRBR09OXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgcCA9IHBlbnRhKHZlYzIocHcsIHBoKSk7XFxyXFxuXFxyXFxuXFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBwID0gMS4wO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdGNvbG9yICs9IHByb2Nlc3NUZXhlbCh2VXYgKyB2ZWMyKHB3ICogdywgcGggKiBoKSwgYmx1cikgKiBtaXgoMS4wLCBpIC8gUklOR1NfRkxPQVQsIGJpYXMpICogcDtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gbWl4KDEuMCwgaSAvIFJJTkdTX0ZMT0FULCBiaWFzKSAqIHA7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHQjaWZkZWYgVVNFX0xPR0RFUFRIQlVGXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZGVwdGggPSBsaW5lYXJpemUodGV4dHVyZTJEKHREZXB0aCwgdlV2KS54KTtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdGZsb2F0IGRlcHRoID0gbGluZWFyaXplKHJlYWREZXB0aCh0RGVwdGgsIHZVdikpO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdCNpZmRlZiBTSEFERVJfRk9DVVNcXHJcXG5cXHJcXG5cXHRcXHQjaWZkZWYgVVNFX0xPR0RFUFRIQlVGXFxyXFxuXFxyXFxuXFx0XFx0XFx0ZmxvYXQgZkRlcHRoID0gbGluZWFyaXplKHRleHR1cmUyRCh0RGVwdGgsIGZvY3VzQ29vcmRzKS54KTtcXHJcXG5cXHJcXG5cXHRcXHQjZWxzZVxcclxcblxcclxcblxcdFxcdFxcdGZsb2F0IGZEZXB0aCA9IGxpbmVhcml6ZShyZWFkRGVwdGgodERlcHRoLCBmb2N1c0Nvb3JkcykpO1xcclxcblxcclxcblxcdFxcdCNlbmRpZlxcclxcblxcclxcblxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZkRlcHRoID0gZm9jYWxEZXB0aDtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHQjaWZkZWYgTUFOVUFMX0RPRlxcclxcblxcclxcblxcdFxcdGNvbnN0IGZsb2F0IG5Eb0ZTdGFydCA9IDEuMDsgXFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgbkRvRkRpc3QgPSAyLjA7XFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgZkRvRlN0YXJ0ID0gMS4wO1xcclxcblxcdFxcdGNvbnN0IGZsb2F0IGZEb0ZEaXN0ID0gMy4wO1xcclxcblxcclxcblxcdFxcdGZsb2F0IGZvY2FsUGxhbmUgPSBkZXB0aCAtIGZEZXB0aDtcXHJcXG5cXHRcXHRmbG9hdCBmYXJEb0YgPSAoZm9jYWxQbGFuZSAtIGZEb0ZTdGFydCkgLyBmRG9GRGlzdDtcXHJcXG5cXHRcXHRmbG9hdCBuZWFyRG9GID0gKC1mb2NhbFBsYW5lIC0gbkRvRlN0YXJ0KSAvIG5Eb0ZEaXN0O1xcclxcblxcclxcblxcdFxcdGZsb2F0IGJsdXIgPSAoZm9jYWxQbGFuZSA+IDAuMCkgPyBmYXJEb0YgOiBuZWFyRG9GO1xcclxcblxcclxcblxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgQ0lSQ0xFX09GX0NPTkZVU0lPTiA9IDAuMDM7IC8vIDM1bW0gZmlsbSA9IDAuMDNtbSBDb0MuXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZm9jYWxQbGFuZU1NID0gZkRlcHRoICogMTAwMC4wO1xcclxcblxcdFxcdGZsb2F0IGRlcHRoTU0gPSBkZXB0aCAqIDEwMDAuMDtcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBmb2NhbFBsYW5lID0gKGRlcHRoTU0gKiBmb2NhbExlbmd0aCkgLyAoZGVwdGhNTSAtIGZvY2FsTGVuZ3RoKTtcXHJcXG5cXHRcXHRmbG9hdCBmYXJEb0YgPSAoZm9jYWxQbGFuZU1NICogZm9jYWxMZW5ndGgpIC8gKGZvY2FsUGxhbmVNTSAtIGZvY2FsTGVuZ3RoKTtcXHJcXG5cXHRcXHRmbG9hdCBuZWFyRG9GID0gKGZvY2FsUGxhbmVNTSAtIGZvY2FsTGVuZ3RoKSAvIChmb2NhbFBsYW5lTU0gKiBmb2NhbFN0b3AgKiBDSVJDTEVfT0ZfQ09ORlVTSU9OKTtcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBibHVyID0gYWJzKGZvY2FsUGxhbmUgLSBmYXJEb0YpICogbmVhckRvRjtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRibHVyID0gY2xhbXAoYmx1ciwgMC4wLCAxLjApO1xcclxcblxcclxcblxcdC8vIERpdGhlcmluZy5cXHJcXG5cXHR2ZWMyIG5vaXNlID0gcmFuZCh2VXYpICogZGl0aGVyU3RyZW5ndGggKiBibHVyO1xcclxcblxcclxcblxcdGZsb2F0IGJsdXJGYWN0b3JYID0gdGV4ZWxTaXplLnggKiBibHVyICogbWF4Qmx1ciArIG5vaXNlLng7XFxyXFxuXFx0ZmxvYXQgYmx1ckZhY3RvclkgPSB0ZXhlbFNpemUueSAqIGJsdXIgKiBtYXhCbHVyICsgbm9pc2UueTtcXHJcXG5cXHJcXG5cXHRjb25zdCBpbnQgTUFYX1JJTkdfU0FNUExFUyA9IFJJTkdTX0lOVCAqIFNBTVBMRVNfSU5UO1xcclxcblxcclxcblxcdC8vIENhbGN1bGF0aW9uIG9mIGZpbmFsIGNvbG9yLlxcclxcblxcdHZlYzQgY29sb3I7XFxyXFxuXFxyXFxuXFx0aWYoYmx1ciA8IDAuMDUpIHtcXHJcXG5cXHJcXG5cXHRcXHRjb2xvciA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHJcXG5cXHR9IGVsc2Uge1xcclxcblxcclxcblxcdFxcdGNvbG9yID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcclxcblxcdFxcdGZsb2F0IHMgPSAxLjA7XFxyXFxuXFx0XFx0aW50IHJpbmdTYW1wbGVzO1xcclxcblxcclxcblxcdFxcdGZvcihpbnQgaSA9IDE7IGkgPD0gUklOR1NfSU5UOyArK2kpIHtcXHJcXG5cXHJcXG5cXHRcXHRcXHRyaW5nU2FtcGxlcyA9IGkgKiBTQU1QTEVTX0lOVDtcXHJcXG5cXHJcXG5cXHRcXHRcXHQvLyBDb25zdGFudCBsb29wLlxcclxcblxcdFxcdFxcdGZvcihpbnQgaiA9IDA7IGogPCBNQVhfUklOR19TQU1QTEVTOyArK2opIHtcXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHQvLyBCcmVhayBlYXJsaWVyLlxcclxcblxcdFxcdFxcdFxcdGlmKGogPj0gcmluZ1NhbXBsZXMpIHsgYnJlYWs7IH1cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRzICs9IGdhdGhlcihmbG9hdChpKSwgZmxvYXQoaiksIGZsb2F0KHJpbmdTYW1wbGVzKSwgY29sb3IucmdiLCBibHVyRmFjdG9yWCwgYmx1ckZhY3RvclksIGJsdXIpO1xcclxcblxcclxcblxcdFxcdFxcdH1cXHJcXG5cXHJcXG5cXHRcXHR9XFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IucmdiIC89IHM7IC8vIERpdmlkZSBieSBzYW1wbGUgY291bnQuXFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcblxcdCNpZmRlZiBTSE9XX0ZPQ1VTXFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IucmdiID0gZGVidWdGb2N1cyhjb2xvci5yZ2IsIGJsdXIsIGRlcHRoKTtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHQjaWZkZWYgVklHTkVUVEVcXHJcXG5cXHJcXG5cXHRcXHRjb2xvci5yZ2IgKj0gdmlnbmV0dGUoKTtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogRGVwdGggb2YgRmllbGQgc2hhZGVyIHZlcnNpb24gMi40LlxyXG4gKlxyXG4gKiBPcmlnaW5hbCBzaGFkZXIgY29kZSBieSBNYXJ0aW5zIFVwaXRpczpcclxuICogIGh0dHA6Ly9ibGVuZGVyYXJ0aXN0cy5vcmcvZm9ydW0vc2hvd3RocmVhZC5waHA/MjM3NDg4LUdMU0wtZGVwdGgtb2YtZmllbGQtd2l0aC1ib2tlaC12Mi00LSh1cGRhdGUpXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEJva2VoMk1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGJva2VoMiBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGVyc3BlY3RpdmVDYW1lcmF9IFtjYW1lcmFdIC0gVGhlIG1haW4gY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbb3B0aW9ucy50ZXhlbFNpemVdIC0gVGhlIGFic29sdXRlIHNjcmVlbiB0ZXhlbCBzaXplLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2hvd0ZvY3VzPWZhbHNlXSAtIFdoZXRoZXIgdGhlIGZvY3VzIHBvaW50IHNob3VsZCBiZSBoaWdobGlnaHRlZC5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hbnVhbERvRj1mYWxzZV0gLSBFbmFibGVzIG1hbnVhbCBkZXB0aCBvZiBmaWVsZCBibHVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudmlnbmV0dGU9ZmFsc2VdIC0gRW5hYmxlcyBhIHZpZ25ldHRlIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnBlbnRhZ29uPWZhbHNlXSAtIEVuYWJsZSB0byB1c2UgYSBwZW50YWdvbmFsIHNoYXBlIHRvIHNjYWxlIGdhdGhlcmVkIHRleGVscy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNoYWRlckZvY3VzPXRydWVdIC0gRGlzYWJsZSBpZiB5b3UgY29tcHV0ZSB5b3VyIG93biBmb2NhbERlcHRoIChpbiBtZXRyZXMhKS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm5vaXNlPXRydWVdIC0gRGlzYWJsZSBpZiB5b3UgZG9uJ3Qgd2FudCBub2lzZSBwYXR0ZXJucyBmb3IgZGl0aGVyaW5nLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYW1lcmEgPSBudWxsLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRpZihvcHRpb25zLnJpbmdzID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5yaW5ncyA9IDM7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2FtcGxlcyA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuc2FtcGxlcyA9IDI7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2hvd0ZvY3VzID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5zaG93Rm9jdXMgPSBmYWxzZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5zaG93Rm9jdXMgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnNob3dGb2N1cyA9IGZhbHNlOyB9XHJcblx0XHRpZihvcHRpb25zLm1hbnVhbERvRiA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMubWFudWFsRG9GID0gZmFsc2U7IH1cclxuXHRcdGlmKG9wdGlvbnMudmlnbmV0dGUgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnZpZ25ldHRlID0gZmFsc2U7IH1cclxuXHRcdGlmKG9wdGlvbnMucGVudGFnb24gPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnBlbnRhZ29uID0gZmFsc2U7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2hhZGVyRm9jdXMgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnNoYWRlckZvY3VzID0gdHJ1ZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5ub2lzZSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMubm9pc2UgPSB0cnVlOyB9XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJCb2tlaDJNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0ZGVmaW5lczoge1xyXG5cclxuXHRcdFx0XHRSSU5HU19JTlQ6IG9wdGlvbnMucmluZ3MudG9GaXhlZCgwKSxcclxuXHRcdFx0XHRSSU5HU19GTE9BVDogb3B0aW9ucy5yaW5ncy50b0ZpeGVkKDEpLFxyXG5cdFx0XHRcdFNBTVBMRVNfSU5UOiBvcHRpb25zLnNhbXBsZXMudG9GaXhlZCgwKSxcclxuXHRcdFx0XHRTQU1QTEVTX0ZMT0FUOiBvcHRpb25zLnNhbXBsZXMudG9GaXhlZCgxKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0RGVwdGg6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cclxuXHRcdFx0XHR0ZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cdFx0XHRcdGhhbGZUZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cclxuXHRcdFx0XHRjYW1lcmFOZWFyOiBuZXcgVW5pZm9ybSgwLjEpLFxyXG5cdFx0XHRcdGNhbWVyYUZhcjogbmV3IFVuaWZvcm0oMjAwMCksXHJcblxyXG5cdFx0XHRcdGZvY2FsTGVuZ3RoOiBuZXcgVW5pZm9ybSgyNC4wKSxcclxuXHRcdFx0XHRmb2NhbFN0b3A6IG5ldyBVbmlmb3JtKDAuOSksXHJcblxyXG5cdFx0XHRcdG1heEJsdXI6IG5ldyBVbmlmb3JtKDEuMCksXHJcblx0XHRcdFx0bHVtaW5hbmNlVGhyZXNob2xkOiBuZXcgVW5pZm9ybSgwLjUpLFxyXG5cdFx0XHRcdGx1bWluYW5jZUdhaW46IG5ldyBVbmlmb3JtKDIuMCksXHJcblx0XHRcdFx0YmlhczogbmV3IFVuaWZvcm0oMC41KSxcclxuXHRcdFx0XHRmcmluZ2U6IG5ldyBVbmlmb3JtKDAuNyksXHJcblx0XHRcdFx0ZGl0aGVyU3RyZW5ndGg6IG5ldyBVbmlmb3JtKDAuMDAwMSksXHJcblxyXG5cdFx0XHRcdGZvY3VzQ29vcmRzOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigwLjUsIDAuNSkpLFxyXG5cdFx0XHRcdGZvY2FsRGVwdGg6IG5ldyBVbmlmb3JtKDEuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihvcHRpb25zLnNob3dGb2N1cykgeyB0aGlzLmRlZmluZXMuU0hPV19GT0NVUyA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLm1hbnVhbERvRikgeyB0aGlzLmRlZmluZXMuTUFOVUFMX0RPRiA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLnZpZ25ldHRlKSB7IHRoaXMuZGVmaW5lcy5WSUdORVRURSA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLnBlbnRhZ29uKSB7IHRoaXMuZGVmaW5lcy5QRU5UQUdPTiA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLnNoYWRlckZvY3VzKSB7IHRoaXMuZGVmaW5lcy5TSEFERVJfRk9DVVMgPSBcIjFcIjsgfVxyXG5cdFx0aWYob3B0aW9ucy5ub2lzZSkgeyB0aGlzLmRlZmluZXMuTk9JU0UgPSBcIjFcIjsgfVxyXG5cclxuXHRcdGlmKG9wdGlvbnMudGV4ZWxTaXplICE9PSB1bmRlZmluZWQpIHsgdGhpcy5zZXRUZXhlbFNpemUob3B0aW9ucy50ZXhlbFNpemUueCwgb3B0aW9ucy50ZXhlbFNpemUueSk7IH1cclxuXHRcdGlmKGNhbWVyYSAhPT0gbnVsbCkgeyB0aGlzLmFkb3B0Q2FtZXJhU2V0dGluZ3MoY2FtZXJhKTsgfVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHRleGVsIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0geCAtIFRoZSB0ZXhlbCB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0geSAtIFRoZSB0ZXhlbCBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFRleGVsU2l6ZSh4LCB5KSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy50ZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpO1xyXG5cdFx0dGhpcy51bmlmb3Jtcy5oYWxmVGV4ZWxTaXplLnZhbHVlLnNldCh4LCB5KS5tdWx0aXBseVNjYWxhcigwLjUpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkb3B0cyB0aGUgbmVhciBhbmQgZmFyIHBsYW5lIGFuZCB0aGUgZm9jYWwgbGVuZ3RoIG9mIHRoZSBnaXZlbiBjYW1lcmEuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1BlcnNwZWN0aXZlQ2FtZXJhfSBjYW1lcmEgLSBUaGUgbWFpbiBjYW1lcmEuXHJcblx0ICovXHJcblxyXG5cdGFkb3B0Q2FtZXJhU2V0dGluZ3MoY2FtZXJhKSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy5jYW1lcmFOZWFyLnZhbHVlID0gY2FtZXJhLm5lYXI7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmNhbWVyYUZhci52YWx1ZSA9IGNhbWVyYS5mYXI7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmZvY2FsTGVuZ3RoLnZhbHVlID0gY2FtZXJhLmdldEZvY2FsTGVuZ3RoKCk7IC8vIHVuaXQ6IG1tLlxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTE7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTI7XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBvcGFjaXR5MTtcXHJcXG51bmlmb3JtIGZsb2F0IG9wYWNpdHkyO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzQgdGV4ZWwxID0gb3BhY2l0eTEgKiB0ZXh0dXJlMkQodGV4dHVyZTEsIHZVdik7XFxyXFxuXFx0dmVjNCB0ZXhlbDIgPSBvcGFjaXR5MiAqIHRleHR1cmUyRCh0ZXh0dXJlMiwgdlV2KTtcXHJcXG5cXHJcXG5cXHQjaWZkZWYgU0NSRUVOX01PREVcXHJcXG5cXHJcXG5cXHRcXHR2ZWMzIGludlRleGVsMSA9IHZlYzMoMS4wKSAtIHRleGVsMS5yZ2I7XFxyXFxuXFx0XFx0dmVjMyBpbnZUZXhlbDIgPSB2ZWMzKDEuMCkgLSB0ZXhlbDIucmdiO1xcclxcblxcclxcblxcdFxcdHZlYzQgY29sb3IgPSB2ZWM0KFxcclxcblxcdFxcdFxcdHZlYzMoMS4wKSAtIGludlRleGVsMSAqIGludlRleGVsMixcXHJcXG5cXHRcXHRcXHR0ZXhlbDEuYSArIHRleGVsMi5hXFxyXFxuXFx0XFx0KTtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdHZlYzQgY29sb3IgPSB0ZXhlbDEgKyB0ZXhlbDI7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gY29sb3I7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWF0ZXJpYWwgZm9yIGNvbWJpbmluZyB0d28gdGV4dHVyZXMuXHJcbiAqXHJcbiAqIFRoaXMgbWF0ZXJpYWwgc3VwcG9ydHMgdGhlIHR3byBibGVuZCBtb2RlcyBBZGQgYW5kIFNjcmVlbi5cclxuICpcclxuICogSW4gU2NyZWVuIG1vZGUsIHRoZSB0d28gdGV4dHVyZXMgYXJlIGVmZmVjdGl2ZWx5IHByb2plY3RlZCBvbiBhIHdoaXRlIHNjcmVlblxyXG4gKiBzaW11bHRhbmVvdXNseS4gSW4gQWRkIG1vZGUsIHRoZSB0ZXh0dXJlcyBhcmUgc2ltcGx5IGFkZGVkIHRvZ2V0aGVyIHdoaWNoXHJcbiAqIG9mdGVuIHByb2R1Y2VzIHVuZGVzaXJlZCwgd2FzaGVkIG91dCByZXN1bHRzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21iaW5lTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY29tYmluZSBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NjcmVlbk1vZGU9ZmFsc2VdIC0gV2hldGhlciB0aGUgc2NyZWVuIGJsZW5kIG1vZGUgc2hvdWxkIGJlIHVzZWQuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjcmVlbk1vZGUgPSBmYWxzZSkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQ29tYmluZU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0ZXh0dXJlMTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dGV4dHVyZTI6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cclxuXHRcdFx0XHRvcGFjaXR5MTogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRvcGFjaXR5MjogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKHNjcmVlbk1vZGUpIHsgdGhpcy5kZWZpbmVzLlNDUkVFTl9NT0RFID0gXCIxXCI7IH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXYwO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYxO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYyO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYzO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgdG9wIGxlZnQgdGV4ZWwuXFxyXFxuXFx0dmVjNCBzdW0gPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjApO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSB0b3AgcmlnaHQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2MSk7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIGJvdHRvbSByaWdodCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYyKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgYm90dG9tIGxlZnQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2Myk7XFxyXFxuXFxyXFxuXFx0Ly8gQ29tcHV0ZSB0aGUgYXZlcmFnZS5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBzdW0gKiAwLjI1O1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ1bmlmb3JtIHZlYzIgdGV4ZWxTaXplO1xcclxcbnVuaWZvcm0gdmVjMiBoYWxmVGV4ZWxTaXplO1xcclxcbnVuaWZvcm0gZmxvYXQga2VybmVsO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXYwO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYxO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYyO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYzO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGRVdiA9ICh0ZXhlbFNpemUgKiB2ZWMyKGtlcm5lbCkpICsgaGFsZlRleGVsU2l6ZTtcXHJcXG5cXHJcXG5cXHR2VXYwID0gdmVjMih1di54IC0gZFV2LngsIHV2LnkgKyBkVXYueSk7XFxyXFxuXFx0dlV2MSA9IHZlYzIodXYueCArIGRVdi54LCB1di55ICsgZFV2LnkpO1xcclxcblxcdHZVdjIgPSB2ZWMyKHV2LnggKyBkVXYueCwgdXYueSAtIGRVdi55KTtcXHJcXG5cXHR2VXYzID0gdmVjMih1di54IC0gZFV2LngsIHV2LnkgLSBkVXYueSk7XFxyXFxuXFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQW4gb3B0aW1pc2VkIGNvbnZvbHV0aW9uIHNoYWRlciBtYXRlcmlhbC5cclxuICpcclxuICogQmFzZWQgb24gdGhlIEdEQzIwMDMgUHJlc2VudGF0aW9uIGJ5IE1hc2FraSBLYXdhc2UsIEJ1bmthc2hhIEdhbWVzOlxyXG4gKiAgRnJhbWUgQnVmZmVyIFBvc3Rwcm9jZXNzaW5nIEVmZmVjdHMgaW4gRE9VQkxFLVMuVC5FLkEuTCAoV3JlY2tsZXNzKVxyXG4gKiBhbmQgYW4gYXJ0aWNsZSBieSBGaWxpcCBTdHJ1Z2FyLCBJbnRlbDpcclxuICogIEFuIGludmVzdGlnYXRpb24gb2YgZmFzdCByZWFsLXRpbWUgR1BVLWJhc2VkIGltYWdlIGJsdXIgYWxnb3JpdGhtc1xyXG4gKlxyXG4gKiBGdXJ0aGVyIG1vZGlmaWVkIGFjY29yZGluZyB0byBBcHBsZSdzXHJcbiAqIFtCZXN0IFByYWN0aWNlcyBmb3IgU2hhZGVyc10oaHR0cHM6Ly9nb28uZ2wvbG1Sb001KS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29udm9sdXRpb25NYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjb252b2x1dGlvbiBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7VmVjdG9yMn0gW3RleGVsU2l6ZV0gLSBUaGUgYWJzb2x1dGUgc2NyZWVuIHRleGVsIHNpemUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHRleGVsU2l6ZSA9IG5ldyBWZWN0b3IyKCkpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkNvbnZvbHV0aW9uTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0ZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cdFx0XHRcdGhhbGZUZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cdFx0XHRcdGtlcm5lbDogbmV3IFVuaWZvcm0oMC4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuc2V0VGV4ZWxTaXplKHRleGVsU2l6ZS54LCB0ZXhlbFNpemUueSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY3VycmVudCBrZXJuZWwgc2l6ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7S2VybmVsU2l6ZX1cclxuXHRcdCAqIEBkZWZhdWx0IEtlcm5lbFNpemUuTEFSR0VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMua2VybmVsU2l6ZSA9IEtlcm5lbFNpemUuTEFSR0U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUga2VybmVsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7RmxvYXQzMkFycmF5fSBUaGUga2VybmVsLlxyXG5cdCAqL1xyXG5cclxuXHRnZXRLZXJuZWwoKSB7IHJldHVybiBrZXJuZWxQcmVzZXRzW3RoaXMua2VybmVsU2l6ZV07IH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgdGV4ZWwgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gVGhlIHRleGVsIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gVGhlIHRleGVsIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0VGV4ZWxTaXplKHgsIHkpIHtcclxuXHJcblx0XHR0aGlzLnVuaWZvcm1zLnRleGVsU2l6ZS52YWx1ZS5zZXQoeCwgeSk7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmhhbGZUZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpLm11bHRpcGx5U2NhbGFyKDAuNSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgS2F3YXNlIGJsdXIga2VybmVsIHByZXNldHMuXHJcbiAqXHJcbiAqIEB0eXBlIHtGbG9hdDMyQXJyYXlbXX1cclxuICogQHByaXZhdGVcclxuICovXHJcblxyXG5jb25zdCBrZXJuZWxQcmVzZXRzID0gW1xyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDEuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAxLjAsIDIuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDIuMCwgMy4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMy4wLCA0LjAsIDQuMCwgNS4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMy4wLCA0LjAsIDUuMCwgNy4wLCA4LjAsIDkuMCwgMTAuMF0pXHJcbl07XHJcblxyXG4vKipcclxuICogQSBrZXJuZWwgc2l6ZSBlbnVtZXJhdGlvbi5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFZFUllfU01BTEwgLSBBIHZlcnkgc21hbGwga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDd4NyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFNNQUxMIC0gQSBzbWFsbCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMTV4MTUgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBNRURJVU0gLSBBIG1lZGl1bSBzaXplZCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMjN4MjMgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMQVJHRSAtIEEgbGFyZ2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDM1eDM1IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gVkVSWV9MQVJHRSAtIEEgdmVyeSBsYXJnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgNjN4NjMgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBIVUdFIC0gQSBodWdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAxMjd4MTI3IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBLZXJuZWxTaXplID0ge1xyXG5cclxuXHRWRVJZX1NNQUxMOiAwLFxyXG5cdFNNQUxMOiAxLFxyXG5cdE1FRElVTTogMixcclxuXHRMQVJHRTogMyxcclxuXHRWRVJZX0xBUkdFOiA0LFxyXG5cdEhVR0U6IDVcclxuXHJcbn07XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBmbG9hdCBvcGFjaXR5O1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzQgdGV4ZWwgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gb3BhY2l0eSAqIHRleGVsO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIHNpbXBsZSBjb3B5IHNoYWRlciBtYXRlcmlhbC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29weU1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNvcHkgbWF0ZXJpYWwuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQ29weU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0b3BhY2l0eTogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERlcHRoO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxuI2lmbmRlZiBVU0VfTE9HREVQVEhCVUZcXHJcXG5cXHJcXG5cXHQjaW5jbHVkZSA8cGFja2luZz5cXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IGNhbWVyYU5lYXI7XFxyXFxuXFx0dW5pZm9ybSBmbG9hdCBjYW1lcmFGYXI7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgcmVhZERlcHRoKHNhbXBsZXIyRCBkZXB0aFNhbXBsZXIsIHZlYzIgY29vcmQpIHtcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBmcmFnQ29vcmRaID0gdGV4dHVyZTJEKGRlcHRoU2FtcGxlciwgY29vcmQpLng7XFxyXFxuXFx0XFx0ZmxvYXQgdmlld1ogPSBwZXJzcGVjdGl2ZURlcHRoVG9WaWV3WihmcmFnQ29vcmRaLCBjYW1lcmFOZWFyLCBjYW1lcmFGYXIpO1xcclxcblxcclxcblxcdFxcdHJldHVybiB2aWV3WlRvT3J0aG9ncmFwaGljRGVwdGgodmlld1osIGNhbWVyYU5lYXIsIGNhbWVyYUZhcik7XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHQjaWZkZWYgVVNFX0xPR0RFUFRIQlVGXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZGVwdGggPSB0ZXh0dXJlMkQodERlcHRoLCB2VXYpLng7XFxyXFxuXFxyXFxuXFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBkZXB0aCA9IHJlYWREZXB0aCh0RGVwdGgsIHZVdik7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gdmVjNChkZXB0aCwgZGVwdGgsIGRlcHRoLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIGRlcHRoIHNoYWRlciBtYXRlcmlhbC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRGVwdGhNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBkZXB0aCBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGVyc3BlY3RpdmVDYW1lcmF9IFtjYW1lcmFdIC0gQSBjYW1lcmEuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhbWVyYSA9IG51bGwpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkRlcHRoTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdGNhbWVyYU5lYXI6IG5ldyBVbmlmb3JtKDAuMSksXHJcblx0XHRcdFx0Y2FtZXJhRmFyOiBuZXcgVW5pZm9ybSgyMDAwKSxcclxuXHJcblx0XHRcdFx0dERlcHRoOiBuZXcgVW5pZm9ybShudWxsKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGNhbWVyYSAhPT0gbnVsbCkgeyB0aGlzLmFkb3B0Q2FtZXJhU2V0dGluZ3MoY2FtZXJhKTsgfVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkb3B0cyB0aGUgc2V0dGluZ3Mgb2YgdGhlIGdpdmVuIGNhbWVyYS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGVyc3BlY3RpdmVDYW1lcmF9IGNhbWVyYSAtIEEgY2FtZXJhLlxyXG5cdCAqL1xyXG5cclxuXHRhZG9wdENhbWVyYVNldHRpbmdzKGNhbWVyYSkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXMuY2FtZXJhTmVhci52YWx1ZSA9IGNhbWVyYS5uZWFyO1xyXG5cdFx0dGhpcy51bmlmb3Jtcy5jYW1lcmFGYXIudmFsdWUgPSBjYW1lcmEuZmFyO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3I0IH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBhbmdsZTtcXHJcXG51bmlmb3JtIGZsb2F0IHNjYWxlO1xcclxcbnVuaWZvcm0gZmxvYXQgaW50ZW5zaXR5O1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxudmFyeWluZyB2ZWMyIHZVdlBhdHRlcm47XFxyXFxuXFxyXFxuZmxvYXQgcGF0dGVybigpIHtcXHJcXG5cXHJcXG5cXHRmbG9hdCBzID0gc2luKGFuZ2xlKTtcXHJcXG5cXHRmbG9hdCBjID0gY29zKGFuZ2xlKTtcXHJcXG5cXHJcXG5cXHR2ZWMyIHBvaW50ID0gdmVjMihjICogdlV2UGF0dGVybi54IC0gcyAqIHZVdlBhdHRlcm4ueSwgcyAqIHZVdlBhdHRlcm4ueCArIGMgKiB2VXZQYXR0ZXJuLnkpICogc2NhbGU7XFxyXFxuXFxyXFxuXFx0cmV0dXJuIChzaW4ocG9pbnQueCkgKiBzaW4ocG9pbnQueSkpICogNC4wO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHR2ZWMzIGNvbG9yID0gdGV4ZWwucmdiO1xcclxcblxcclxcblxcdCNpZmRlZiBBVkVSQUdFXFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IgPSB2ZWMzKChjb2xvci5yICsgY29sb3IuZyArIGNvbG9yLmIpIC8gMy4wKTtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRjb2xvciA9IHZlYzMoY29sb3IgKiAxMC4wIC0gNS4wICsgcGF0dGVybigpKTtcXHJcXG5cXHRjb2xvciA9IHRleGVsLnJnYiArIChjb2xvciAtIHRleGVsLnJnYikgKiBpbnRlbnNpdHk7XFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgdGV4ZWwuYSk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInVuaWZvcm0gdmVjNCBvZmZzZXRSZXBlYXQ7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2UGF0dGVybjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0dlV2UGF0dGVybiA9IHV2ICogb2Zmc2V0UmVwZWF0Lnp3ICsgb2Zmc2V0UmVwZWF0Lnh5O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgZG90IHNjcmVlbiBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIERvdFNjcmVlbk1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGRvdCBzY3JlZW4gbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFthdmVyYWdlPWZhbHNlXSAtIFdoZXRoZXIgdGhlIHNoYWRlciBzaG91bGQgb3V0cHV0IHRoZSBjb2xvdXIgYXZlcmFnZSAoYmxhY2sgYW5kIHdoaXRlKS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoYXZlcmFnZSA9IGZhbHNlKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJEb3RTY3JlZW5NYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cclxuXHRcdFx0XHRhbmdsZTogbmV3IFVuaWZvcm0oMS41NyksXHJcblx0XHRcdFx0c2NhbGU6IG5ldyBVbmlmb3JtKDEuMCksXHJcblx0XHRcdFx0aW50ZW5zaXR5OiBuZXcgVW5pZm9ybSgxLjApLFxyXG5cclxuXHRcdFx0XHRvZmZzZXRSZXBlYXQ6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3I0KDAuNSwgMC41LCAxLjAsIDEuMCkpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYoYXZlcmFnZSkgeyB0aGlzLmRlZmluZXMuQVZFUkFHRSA9IFwiMVwiOyB9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIGZsb2F0IHRpbWU7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG4jaWZkZWYgTk9JU0VcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IG5vaXNlSW50ZW5zaXR5O1xcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbiNpZmRlZiBTQ0FOTElORVNcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IHNjYW5saW5lSW50ZW5zaXR5O1xcclxcblxcdHVuaWZvcm0gZmxvYXQgc2NhbmxpbmVDb3VudDtcXHJcXG5cXHJcXG4jZW5kaWZcXHJcXG5cXHJcXG4jaWZkZWYgR1JFWVNDQUxFXFxyXFxuXFxyXFxuXFx0dW5pZm9ybSBmbG9hdCBncmV5c2NhbGVJbnRlbnNpdHk7XFxyXFxuXFxyXFxuXFx0Y29uc3QgdmVjMyBMVU1fQ09FRkYgPSB2ZWMzKDAuMjk5LCAwLjU4NywgMC4xMTQpO1xcclxcblxcclxcbiNlbGlmIGRlZmluZWQoU0VQSUEpXFxyXFxuXFxyXFxuXFx0dW5pZm9ybSBmbG9hdCBzZXBpYUludGVuc2l0eTtcXHJcXG5cXHJcXG4jZW5kaWZcXHJcXG5cXHJcXG4jaWZkZWYgVklHTkVUVEVcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IHZpZ25ldHRlT2Zmc2V0O1xcclxcblxcdHVuaWZvcm0gZmxvYXQgdmlnbmV0dGVEYXJrbmVzcztcXHJcXG5cXHJcXG4jZW5kaWZcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHR2ZWMzIGNvbG9yID0gdGV4ZWwucmdiO1xcclxcblxcclxcblxcdCNpZmRlZiBTQ1JFRU5fTU9ERVxcclxcblxcclxcblxcdFxcdHZlYzMgaW52Q29sb3I7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2lmZGVmIE5PSVNFXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgeCA9IHZVdi54ICogdlV2LnkgKiB0aW1lICogMTAwMC4wO1xcclxcblxcdFxcdHggPSBtb2QoeCwgMTMuMCkgKiBtb2QoeCwgMTIzLjApO1xcclxcblxcdFxcdHggPSBtb2QoeCwgMC4wMSk7XFxyXFxuXFxyXFxuXFx0XFx0dmVjMyBub2lzZSA9IHRleGVsLnJnYiAqIGNsYW1wKDAuMSArIHggKiAxMDAuMCwgMC4wLCAxLjApICogbm9pc2VJbnRlbnNpdHk7XFxyXFxuXFxyXFxuXFx0XFx0I2lmZGVmIFNDUkVFTl9NT0RFXFxyXFxuXFxyXFxuXFx0XFx0XFx0aW52Q29sb3IgPSB2ZWMzKDEuMCkgLSBjb2xvcjtcXHJcXG5cXHRcXHRcXHR2ZWMzIGludk5vaXNlID0gdmVjMygxLjApIC0gbm9pc2U7XFxyXFxuXFxyXFxuXFx0XFx0XFx0Y29sb3IgPSB2ZWMzKDEuMCkgLSBpbnZDb2xvciAqIGludk5vaXNlO1xcclxcblxcclxcblxcdFxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0XFx0Y29sb3IgKz0gbm9pc2U7XFxyXFxuXFxyXFxuXFx0XFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2lmZGVmIFNDQU5MSU5FU1xcclxcblxcclxcblxcdFxcdHZlYzIgc2wgPSB2ZWMyKHNpbih2VXYueSAqIHNjYW5saW5lQ291bnQpLCBjb3ModlV2LnkgKiBzY2FubGluZUNvdW50KSk7XFxyXFxuXFx0XFx0dmVjMyBzY2FubGluZXMgPSB0ZXhlbC5yZ2IgKiB2ZWMzKHNsLngsIHNsLnksIHNsLngpICogc2NhbmxpbmVJbnRlbnNpdHk7XFxyXFxuXFxyXFxuXFx0XFx0I2lmZGVmIFNDUkVFTl9NT0RFXFxyXFxuXFxyXFxuXFx0XFx0XFx0aW52Q29sb3IgPSB2ZWMzKDEuMCkgLSBjb2xvcjtcXHJcXG5cXHRcXHRcXHR2ZWMzIGludlNjYW5saW5lcyA9IHZlYzMoMS4wKSAtIHNjYW5saW5lcztcXHJcXG5cXHJcXG5cXHRcXHRcXHRjb2xvciA9IHZlYzMoMS4wKSAtIGludkNvbG9yICogaW52U2NhbmxpbmVzO1xcclxcblxcclxcblxcdFxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0XFx0Y29sb3IgKz0gc2NhbmxpbmVzO1xcclxcblxcclxcblxcdFxcdCNlbmRpZlxcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdCNpZmRlZiBHUkVZU0NBTEVcXHJcXG5cXHJcXG5cXHRcXHRjb2xvciA9IG1peChjb2xvciwgdmVjMyhkb3QoY29sb3IsIExVTV9DT0VGRikpLCBncmV5c2NhbGVJbnRlbnNpdHkpO1xcclxcblxcclxcblxcdCNlbGlmIGRlZmluZWQoU0VQSUEpXFxyXFxuXFxyXFxuXFx0XFx0dmVjMyBjID0gY29sb3IucmdiO1xcclxcblxcclxcblxcdFxcdGNvbG9yLnIgPSBkb3QoYywgdmVjMygxLjAgLSAwLjYwNyAqIHNlcGlhSW50ZW5zaXR5LCAwLjc2OSAqIHNlcGlhSW50ZW5zaXR5LCAwLjE4OSAqIHNlcGlhSW50ZW5zaXR5KSk7XFxyXFxuXFx0XFx0Y29sb3IuZyA9IGRvdChjLCB2ZWMzKDAuMzQ5ICogc2VwaWFJbnRlbnNpdHksIDEuMCAtIDAuMzE0ICogc2VwaWFJbnRlbnNpdHksIDAuMTY4ICogc2VwaWFJbnRlbnNpdHkpKTtcXHJcXG5cXHRcXHRjb2xvci5iID0gZG90KGMsIHZlYzMoMC4yNzIgKiBzZXBpYUludGVuc2l0eSwgMC41MzQgKiBzZXBpYUludGVuc2l0eSwgMS4wIC0gMC44NjkgKiBzZXBpYUludGVuc2l0eSkpO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdCNpZmRlZiBWSUdORVRURVxcclxcblxcclxcblxcdFxcdGNvbnN0IHZlYzIgQ0VOVEVSID0gdmVjMigwLjUpO1xcclxcblxcclxcblxcdFxcdCNpZmRlZiBFU0tJTFxcclxcblxcclxcblxcdFxcdFxcdHZlYzIgdXYgPSAodlV2IC0gQ0VOVEVSKSAqIHZlYzIodmlnbmV0dGVPZmZzZXQpO1xcclxcblxcdFxcdFxcdGNvbG9yID0gbWl4KGNvbG9yLnJnYiwgdmVjMygxLjAgLSB2aWduZXR0ZURhcmtuZXNzKSwgZG90KHV2LCB1dikpO1xcclxcblxcclxcblxcdFxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0XFx0ZmxvYXQgZGlzdCA9IGRpc3RhbmNlKHZVdiwgQ0VOVEVSKTtcXHJcXG5cXHRcXHRcXHRjb2xvciAqPSBzbW9vdGhzdGVwKDAuOCwgdmlnbmV0dGVPZmZzZXQgKiAwLjc5OSwgZGlzdCAqICh2aWduZXR0ZURhcmtuZXNzICsgdmlnbmV0dGVPZmZzZXQpKTtcXHJcXG5cXHJcXG5cXHRcXHQjZW5kaWZcXHRcXHRcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KGNsYW1wKGNvbG9yLCAwLjAsIDEuMCksIHRleGVsLmEpO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIGNpbmVtYXRpYyBzaGFkZXIgdGhhdCBwcm92aWRlcyB0aGUgZm9sbG93aW5nIGVmZmVjdHM6XHJcbiAqICAtIEZpbG0gR3JhaW5cclxuICogIC0gU2NhbmxpbmVzXHJcbiAqICAtIFZpZ25ldHRlXHJcbiAqICAtIEdyZXlzY2FsZVxyXG4gKiAgLSBTZXBpYVxyXG4gKlxyXG4gKiBPcmlnaW5hbCBzY2FubGluZXMgYWxnb3JpdGhtIGJ5IFBhdCBcIkhhd3Rob3JuZVwiIFNoZWFyb24uXHJcbiAqICBodHRwOi8vd3d3LnRydWV2aXNpb24zZC5jb20vZm9ydW1zL3Nob3djYXNlL3N0YXRpY25vaXNlX2NvbG9yYmxhY2t3aGl0ZV9zY2FubGluZV9zaGFkZXJzLXQxODY5OC4wLmh0bWxcclxuICpcclxuICogT3B0aW1pc2VkIHNjYW5saW5lcyBhbmQgbm9pc2Ugd2l0aCBpbnRlbnNpdHkgc2NhbGluZyBieSBHZW9yZyBcIkxldmlhdGhhblwiXHJcbiAqIFN0ZWlucm9oZGVyLiBUaGlzIHZlcnNpb24gd2FzIHByb3ZpZGVkIHVuZGVyIGEgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvblxyXG4gKiAzLjAgTGljZW5zZTogaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wLlxyXG4gKlxyXG4gKiBUaGUgc2VwaWEgZWZmZWN0IGlzIGJhc2VkIG9uOlxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2V2YW53L2dsZnguanNcclxuICpcclxuICogVGhlIHZpZ25ldHRlIGNvZGUgaXMgYmFzZWQgb24gUGFpbnRFZmZlY3QgcG9zdHByb2Nlc3MgZnJvbSByby5tZTpcclxuICogIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC8zLWRyZWFtcy1vZi1ibGFjay9zb3VyY2UvYnJvd3NlL2RlcGxveS9qcy9lZmZlY3RzL1BhaW50RWZmZWN0LmpzXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbG1NYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBmaWxtIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLiBEaXNhYmxlZCBlZmZlY3RzIHdpbGwgbm90IGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCBzaGFkZXIgYW5kIGhhdmUgbm8gbmVnYXRpdmUgaW1wYWN0IG9uIHBlcmZvcm1hbmNlLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZ3JleXNjYWxlPWZhbHNlXSAtIEVuYWJsZSBncmV5c2NhbGUgZWZmZWN0LiBHcmV5c2NhbGUgYW5kIHNlcGlhIGFyZSBtdXR1YWxseSBleGNsdXNpdmUuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zZXBpYT1mYWxzZV0gLSBFbmFibGUgc2VwaWEgZWZmZWN0LiBHcmV5c2NhbGUgYW5kIHNlcGlhIGFyZSBtdXR1YWxseSBleGNsdXNpdmUuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy52aWduZXR0ZT1mYWxzZV0gLSBBcHBseSB2aWduZXR0ZSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5lc2tpbD1mYWxzZV0gLSBVc2UgRXNraWwncyB2aWduZXR0ZSBhcHByb2FjaC4gVGhlIGRlZmF1bHQgbG9va3MgZHVzdHkgd2hpbGUgRXNraWwgbG9va3MgYnVybmVkIG91dC5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNjcmVlbk1vZGU9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JlZW4gYmxlbmQgbW9kZSBzaG91bGQgYmUgdXNlZCBmb3Igbm9pc2UgYW5kIHNjYW5saW5lcy4gQm90aCBvZiB0aGVzZSBlZmZlY3RzIGFyZSBjb21wdXRlZCBpbmRlcGVuZGVudGx5LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubm9pc2U9dHJ1ZV0gLSBTaG93IG5vaXNlLWJhc2VkIGZpbG0gZ3JhaW4uXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zY2FubGluZXM9dHJ1ZV0gLSBTaG93IHNjYW5saW5lcy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubm9pc2VJbnRlbnNpdHk9MC41XSAtIFRoZSBub2lzZSBpbnRlbnNpdHkuIDAuMCB0byAxLjAuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYW5saW5lSW50ZW5zaXR5PTAuMDVdIC0gVGhlIHNjYW5saW5lIGludGVuc2l0eS4gMC4wIHRvIDEuMC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZ3JleXNjYWxlSW50ZW5zaXR5PTEuMF0gLSBUaGUgaW50ZW5zaXR5IG9mIHRoZSBncmV5c2NhbGUgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zZXBpYUludGVuc2l0eT0xLjBdIC0gVGhlIGludGVuc2l0eSBvZiB0aGUgc2VwaWEgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy52aWduZXR0ZU9mZnNldD0xLjBdIC0gVGhlIG9mZnNldCBvZiB0aGUgdmlnbmV0dGUgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy52aWduZXR0ZURhcmtuZXNzPTEuMF0gLSBUaGUgZGFya25lc3Mgb2YgdGhlIHZpZ25ldHRlIGVmZmVjdC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5zY3JlZW5Nb2RlID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5zY3JlZW5Nb2RlID0gdHJ1ZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5ub2lzZSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMubm9pc2UgPSB0cnVlOyB9XHJcblx0XHRpZihvcHRpb25zLnNjYW5saW5lcyA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuc2NhbmxpbmVzID0gdHJ1ZTsgfVxyXG5cclxuXHRcdGlmKG9wdGlvbnMuZ3JleXNjYWxlID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5ncmV5c2NhbGUgPSBmYWxzZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5zZXBpYSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuc2VwaWEgPSBmYWxzZTsgfVxyXG5cdFx0aWYob3B0aW9ucy52aWduZXR0ZSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMudmlnbmV0dGUgPSBmYWxzZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5lc2tpbCA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuZXNraWwgPSBmYWxzZTsgfVxyXG5cclxuXHRcdGlmKG9wdGlvbnMubm9pc2VJbnRlbnNpdHkgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLm5vaXNlSW50ZW5zaXR5ID0gMC41OyB9XHJcblx0XHRpZihvcHRpb25zLnNjYW5saW5lSW50ZW5zaXR5ID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5zY2FubGluZUludGVuc2l0eSA9IDAuMDU7IH1cclxuXHRcdGlmKG9wdGlvbnMuZ3JleXNjYWxlSW50ZW5zaXR5ID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5ncmV5c2NhbGVJbnRlbnNpdHkgPSAxLjA7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2VwaWFJbnRlbnNpdHkgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnNlcGlhSW50ZW5zaXR5ID0gMS4wOyB9XHJcblxyXG5cdFx0aWYob3B0aW9ucy52aWduZXR0ZU9mZnNldCA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMudmlnbmV0dGVPZmZzZXQgPSAxLjA7IH1cclxuXHRcdGlmKG9wdGlvbnMudmlnbmV0dGVEYXJrbmVzcyA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMudmlnbmV0dGVEYXJrbmVzcyA9IDEuMDsgfVxyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiRmlsbU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dGltZTogbmV3IFVuaWZvcm0oMC4wKSxcclxuXHJcblx0XHRcdFx0bm9pc2VJbnRlbnNpdHk6IG5ldyBVbmlmb3JtKG9wdGlvbnMubm9pc2VJbnRlbnNpdHkpLFxyXG5cdFx0XHRcdHNjYW5saW5lSW50ZW5zaXR5OiBuZXcgVW5pZm9ybShvcHRpb25zLnNjYW5saW5lSW50ZW5zaXR5KSxcclxuXHRcdFx0XHRzY2FubGluZUNvdW50OiBuZXcgVW5pZm9ybSgwLjApLFxyXG5cclxuXHRcdFx0XHRncmV5c2NhbGVJbnRlbnNpdHk6IG5ldyBVbmlmb3JtKG9wdGlvbnMuZ3JleXNjYWxlSW50ZW5zaXR5KSxcclxuXHRcdFx0XHRzZXBpYUludGVuc2l0eTogbmV3IFVuaWZvcm0ob3B0aW9ucy5zZXBpYUludGVuc2l0eSksXHJcblxyXG5cdFx0XHRcdHZpZ25ldHRlT2Zmc2V0OiBuZXcgVW5pZm9ybShvcHRpb25zLnZpZ25ldHRlT2Zmc2V0KSxcclxuXHRcdFx0XHR2aWduZXR0ZURhcmtuZXNzOiBuZXcgVW5pZm9ybShvcHRpb25zLnZpZ25ldHRlRGFya25lc3MpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5ncmV5c2NhbGUpIHsgdGhpcy5kZWZpbmVzLkdSRVlTQ0FMRSA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLnNlcGlhKSB7IHRoaXMuZGVmaW5lcy5TRVBJQSA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLnZpZ25ldHRlKSB7IHRoaXMuZGVmaW5lcy5WSUdORVRURSA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLmVza2lsKSB7IHRoaXMuZGVmaW5lcy5FU0tJTCA9IFwiMVwiOyB9XHJcblxyXG5cdFx0aWYob3B0aW9ucy5zY3JlZW5Nb2RlKSB7IHRoaXMuZGVmaW5lcy5TQ1JFRU5fTU9ERSA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLm5vaXNlKSB7IHRoaXMuZGVmaW5lcy5OT0lTRSA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLnNjYW5saW5lcykgeyB0aGlzLmRlZmluZXMuU0NBTkxJTkVTID0gXCIxXCI7IH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHRQZXJ0dXJiO1xcclxcblxcclxcbnVuaWZvcm0gYm9vbCBhY3RpdmU7XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBhbW91bnQ7XFxyXFxudW5pZm9ybSBmbG9hdCBhbmdsZTtcXHJcXG51bmlmb3JtIGZsb2F0IHNlZWQ7XFxyXFxudW5pZm9ybSBmbG9hdCBzZWVkWDtcXHJcXG51bmlmb3JtIGZsb2F0IHNlZWRZO1xcclxcbnVuaWZvcm0gZmxvYXQgZGlzdG9ydGlvblg7XFxyXFxudW5pZm9ybSBmbG9hdCBkaXN0b3J0aW9uWTtcXHJcXG51bmlmb3JtIGZsb2F0IGNvbFM7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG5mbG9hdCByYW5kKHZlYzIgdGMpIHtcXHJcXG5cXHJcXG5cXHRjb25zdCBmbG9hdCBhID0gMTIuOTg5ODtcXHJcXG5cXHRjb25zdCBmbG9hdCBiID0gNzguMjMzO1xcclxcblxcdGNvbnN0IGZsb2F0IGMgPSA0Mzc1OC41NDUzO1xcclxcblxcclxcblxcdGZsb2F0IGR0ID0gZG90KHRjLCB2ZWMyKGEsIGIpKTtcXHJcXG5cXHRmbG9hdCBzbiA9IG1vZChkdCwgMy4xNCk7XFxyXFxuXFxyXFxuXFx0cmV0dXJuIGZyYWN0KHNpbihzbikgKiBjKTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzIgY29vcmQgPSB2VXY7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgeHMsIHlzO1xcclxcblxcdHZlYzQgbm9ybWFsO1xcclxcblxcclxcblxcdHZlYzIgb2Zmc2V0O1xcclxcblxcdHZlYzQgY3IsIGNnYSwgY2I7XFxyXFxuXFx0dmVjNCBzbm93LCBjb2xvcjtcXHJcXG5cXHJcXG5cXHRmbG9hdCBzeCwgc3k7XFxyXFxuXFxyXFxuXFx0aWYoYWN0aXZlKSB7XFxyXFxuXFxyXFxuXFx0XFx0eHMgPSBmbG9vcihnbF9GcmFnQ29vcmQueCAvIDAuNSk7XFxyXFxuXFx0XFx0eXMgPSBmbG9vcihnbF9GcmFnQ29vcmQueSAvIDAuNSk7XFxyXFxuXFxyXFxuXFx0XFx0bm9ybWFsID0gdGV4dHVyZTJEKHRQZXJ0dXJiLCBjb29yZCAqIHNlZWQgKiBzZWVkKTtcXHJcXG5cXHJcXG5cXHRcXHRpZihjb29yZC55IDwgZGlzdG9ydGlvblggKyBjb2xTICYmIGNvb3JkLnkgPiBkaXN0b3J0aW9uWCAtIGNvbFMgKiBzZWVkKSB7XFxyXFxuXFxyXFxuXFx0XFx0XFx0c3ggPSBjbGFtcChjZWlsKHNlZWRYKSwgMC4wLCAxLjApO1xcclxcblxcdFxcdFxcdGNvb3JkLnkgPSBzeCAqICgxLjAgLSAoY29vcmQueSArIGRpc3RvcnRpb25ZKSkgKyAoMS4wIC0gc3gpICogZGlzdG9ydGlvblk7XFxyXFxuXFxyXFxuXFx0XFx0fVxcclxcblxcclxcblxcdFxcdGlmKGNvb3JkLnggPCBkaXN0b3J0aW9uWSArIGNvbFMgJiYgY29vcmQueCA+IGRpc3RvcnRpb25ZIC0gY29sUyAqIHNlZWQpIHtcXHJcXG5cXHJcXG5cXHRcXHRcXHRzeSA9IGNsYW1wKGNlaWwoc2VlZFkpLCAwLjAsIDEuMCk7XFxyXFxuXFx0XFx0XFx0Y29vcmQueCA9IHN5ICogZGlzdG9ydGlvblggKyAoMS4wIC0gc3kpICogKDEuMCAtIChjb29yZC54ICsgZGlzdG9ydGlvblgpKTtcXHJcXG5cXHJcXG5cXHRcXHR9XFxyXFxuXFxyXFxuXFx0XFx0Y29vcmQueCArPSBub3JtYWwueCAqIHNlZWRYICogKHNlZWQgLyA1LjApO1xcclxcblxcdFxcdGNvb3JkLnkgKz0gbm9ybWFsLnkgKiBzZWVkWSAqIChzZWVkIC8gNS4wKTtcXHJcXG5cXHJcXG5cXHRcXHRvZmZzZXQgPSBhbW91bnQgKiB2ZWMyKGNvcyhhbmdsZSksIHNpbihhbmdsZSkpO1xcclxcblxcclxcblxcdFxcdGNyID0gdGV4dHVyZTJEKHREaWZmdXNlLCBjb29yZCArIG9mZnNldCk7XFxyXFxuXFx0XFx0Y2dhID0gdGV4dHVyZTJEKHREaWZmdXNlLCBjb29yZCk7XFxyXFxuXFx0XFx0Y2IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkIC0gb2Zmc2V0KTtcXHJcXG5cXHJcXG5cXHRcXHRjb2xvciA9IHZlYzQoY3IuciwgY2dhLmcsIGNiLmIsIGNnYS5hKTtcXHJcXG5cXHRcXHRzbm93ID0gMjAwLjAgKiBhbW91bnQgKiB2ZWM0KHJhbmQodmVjMih4cyAqIHNlZWQsIHlzICogc2VlZCAqIDUwLjApKSAqIDAuMik7XFxyXFxuXFx0XFx0Y29sb3IgKz0gc25vdztcXHJcXG5cXHJcXG5cXHR9IGVsc2Uge1xcclxcblxcclxcblxcdFxcdGNvbG9yID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggc2hhZGVyIG1hdGVyaWFsLlxyXG4gKlxyXG4gKiBSZWZlcmVuY2U6XHJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vc3RhZmZhbnRhbi91bml0eWdsaXRjaFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHbGl0Y2hNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBnbGl0Y2ggbWF0ZXJpYWwuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiR2xpdGNoTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0UGVydHVyYjogbmV3IFVuaWZvcm0obnVsbCksXHJcblxyXG5cdFx0XHRcdGFjdGl2ZTogbmV3IFVuaWZvcm0oMSksXHJcblxyXG5cdFx0XHRcdGFtb3VudDogbmV3IFVuaWZvcm0oMC44KSxcclxuXHRcdFx0XHRhbmdsZTogbmV3IFVuaWZvcm0oMC4wMiksXHJcblx0XHRcdFx0c2VlZDogbmV3IFVuaWZvcm0oMC4wMiksXHJcblx0XHRcdFx0c2VlZFg6IG5ldyBVbmlmb3JtKDAuMDIpLFxyXG5cdFx0XHRcdHNlZWRZOiBuZXcgVW5pZm9ybSgwLjAyKSxcclxuXHRcdFx0XHRkaXN0b3J0aW9uWDogbmV3IFVuaWZvcm0oMC41KSxcclxuXHRcdFx0XHRkaXN0b3J0aW9uWTogbmV3IFVuaWZvcm0oMC42KSxcclxuXHRcdFx0XHRjb2xTOiBuZXcgVW5pZm9ybSgwLjA1KVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSB2ZWMzIGxpZ2h0UG9zaXRpb247XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBleHBvc3VyZTtcXHJcXG51bmlmb3JtIGZsb2F0IGRlY2F5O1xcclxcbnVuaWZvcm0gZmxvYXQgZGVuc2l0eTtcXHJcXG51bmlmb3JtIGZsb2F0IHdlaWdodDtcXHJcXG51bmlmb3JtIGZsb2F0IGNsYW1wTWF4O1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzIgdGV4Q29vcmQgPSB2VXY7XFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRlIHZlY3RvciBmcm9tIHBpeGVsIHRvIGxpZ2h0IHNvdXJjZSBpbiBzY3JlZW4gc3BhY2UuXFxyXFxuXFx0dmVjMiBkZWx0YVRleENvb3JkID0gdGV4Q29vcmQgLSBsaWdodFBvc2l0aW9uLnN0O1xcclxcblxcdGRlbHRhVGV4Q29vcmQgKj0gMS4wIC8gTlVNX1NBTVBMRVNfRkxPQVQgKiBkZW5zaXR5O1xcclxcblxcclxcblxcdC8vIEEgZGVjcmVhc2luZyBpbGx1bWluYXRpb24gZmFjdG9yLlxcclxcblxcdGZsb2F0IGlsbHVtaW5hdGlvbkRlY2F5ID0gMS4wO1xcclxcblxcclxcblxcdHZlYzQgc2FtcGxlO1xcclxcblxcdHZlYzQgY29sb3IgPSB2ZWM0KDAuMCk7XFxyXFxuXFxyXFxuXFx0Ly8gRXN0aW1hdGUgdGhlIHByb2JhYmlsaXR5IG9mIG9jY2x1c2lvbiBhdCBlYWNoIHBpeGVsIGJ5IHN1bW1pbmcgc2FtcGxlcyBhbG9uZyBhIHJheSB0byB0aGUgbGlnaHQgc291cmNlLlxcclxcblxcdGZvcihpbnQgaSA9IDA7IGkgPCBOVU1fU0FNUExFU19JTlQ7ICsraSkge1xcclxcblxcclxcblxcdFxcdHRleENvb3JkIC09IGRlbHRhVGV4Q29vcmQ7XFxyXFxuXFx0XFx0c2FtcGxlID0gdGV4dHVyZTJEKHREaWZmdXNlLCB0ZXhDb29yZCk7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gQXBwbHkgc2FtcGxlIGF0dGVudWF0aW9uIHNjYWxlL2RlY2F5IGZhY3RvcnMuXFxyXFxuXFx0XFx0c2FtcGxlICo9IGlsbHVtaW5hdGlvbkRlY2F5ICogd2VpZ2h0O1xcclxcblxcclxcblxcdFxcdGNvbG9yICs9IHNhbXBsZTtcXHJcXG5cXHJcXG5cXHRcXHQvLyBVcGRhdGUgZXhwb25lbnRpYWwgZGVjYXkgZmFjdG9yLlxcclxcblxcdFxcdGlsbHVtaW5hdGlvbkRlY2F5ICo9IGRlY2F5O1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBjbGFtcChjb2xvciAqIGV4cG9zdXJlLCAwLjAsIGNsYW1wTWF4KTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBjcmVwdXNjdWxhciByYXlzIHNoYWRlciBtYXRlcmlhbC5cclxuICpcclxuICogUmVmZXJlbmNlczpcclxuICpcclxuICogVGhpYmF1dCBEZXNwb3VsYWluLCAyMDEyOlxyXG4gKiAgWyhXZWJHTCkgVm9sdW1ldHJpYyBMaWdodCBBcHByb3hpbWF0aW9uIGluIFRocmVlLmpzXShcclxuICogIGh0dHA6Ly9ia2NvcmUuY29tL2Jsb2cvM2Qvd2ViZ2wtdGhyZWUtanMtdm9sdW1ldHJpYy1saWdodC1nb2RyYXlzLmh0bWwpXHJcbiAqXHJcbiAqIE52aWRpYSwgR1BVIEdlbXMgMywgMjAwODpcclxuICogIFtDaGFwdGVyIDEzLiBWb2x1bWV0cmljIExpZ2h0IFNjYXR0ZXJpbmcgYXMgYSBQb3N0LVByb2Nlc3NdKFxyXG4gKiAgaHR0cHM6Ly9kZXZlbG9wZXIubnZpZGlhLmNvbS9ncHVnZW1zL0dQVUdlbXMzL2dwdWdlbXMzX2NoMTMuaHRtbClcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgR29kUmF5c01hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGdvZCByYXlzIG1hdGVyaWFsLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkdvZFJheXNNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0ZGVmaW5lczoge1xyXG5cclxuXHRcdFx0XHROVU1fU0FNUExFU19GTE9BVDogXCI2MC4wXCIsXHJcblx0XHRcdFx0TlVNX1NBTVBMRVNfSU5UOiBcIjYwXCJcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0bGlnaHRQb3NpdGlvbjogbmV3IFVuaWZvcm0obnVsbCksXHJcblxyXG5cdFx0XHRcdGV4cG9zdXJlOiBuZXcgVW5pZm9ybSgwLjYpLFxyXG5cdFx0XHRcdGRlY2F5OiBuZXcgVW5pZm9ybSgwLjkzKSxcclxuXHRcdFx0XHRkZW5zaXR5OiBuZXcgVW5pZm9ybSgwLjk2KSxcclxuXHRcdFx0XHR3ZWlnaHQ6IG5ldyBVbmlmb3JtKDAuNCksXHJcblx0XHRcdFx0Y2xhbXBNYXg6IG5ldyBVbmlmb3JtKDEuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gZmxvYXQgZGlzdGluY3Rpb247XFxyXFxudW5pZm9ybSB2ZWMyIHJhbmdlO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdGNvbnN0IHZlYzQgTFVNX0NPRUZGID0gdmVjNCgwLjI5OSwgMC41ODcsIDAuMTE0LCAwLjApO1xcclxcblxcclxcblxcdHZlYzQgdGV4ZWwgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XFxyXFxuXFx0ZmxvYXQgdiA9IGRvdCh0ZXhlbCwgTFVNX0NPRUZGKTtcXHJcXG5cXHJcXG5cXHQjaWZkZWYgUkFOR0VcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBsb3cgPSBzdGVwKHJhbmdlLngsIHYpO1xcclxcblxcdFxcdGZsb2F0IGhpZ2ggPSBzdGVwKHYsIHJhbmdlLnkpO1xcclxcblxcclxcblxcdFxcdC8vIEFwcGx5IHRoZSBtYXNrLlxcclxcblxcdFxcdHYgKj0gbG93ICogaGlnaDtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHR2ID0gcG93KGFicyh2KSwgZGlzdGluY3Rpb24pO1xcclxcblxcclxcblxcdCNpZmRlZiBDT0xPUlxcclxcblxcclxcblxcdFxcdGdsX0ZyYWdDb2xvciA9IHZlYzQodGV4ZWwucmdiICogdiwgdGV4ZWwuYSk7XFxyXFxuXFxyXFxuXFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KHYsIHYsIHYsIHRleGVsLmEpO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIGx1bWlub3NpdHkgc2hhZGVyIG1hdGVyaWFsLlxyXG4gKlxyXG4gKiBUaGlzIHNoYWRlciBwcm9kdWNlcyBhIGdyZXlzY2FsZSBsdW1pbmFuY2UgbWFwLiBJdCBjYW4gYWxzbyBiZSBjb25maWd1cmVkIHRvXHJcbiAqIG91dHB1dCBjb2xvdXJzIHRoYXQgYXJlIHNjYWxlZCB3aXRoIHRoZWlyIHJlc3BlY3RpdmUgbHVtaW5hbmNlIHZhbHVlLlxyXG4gKiBBZGRpdGlvbmFsbHksIGEgcmFuZ2UgbWF5IGJlIHByb3ZpZGVkIHRvIG1hc2sgb3V0IHVuZGVzaXJlZCB0ZXhlbHMuXHJcbiAqXHJcbiAqIFRoZSBhbHBoYSBjaGFubmVsIHdpbGwgcmVtYWluIHVuYWZmZWN0ZWQgaW4gYWxsIGNhc2VzLlxyXG4gKlxyXG4gKiBMdW1pbmFuY2UgcmFuZ2UgcmVmZXJlbmNlOlxyXG4gKiAgaHR0cHM6Ly9jeWNsaW5nNzQuY29tLzIwMDcvMDUvMjMveW91ci1maXJzdC1zaGFkZXIvIy5WdHk5RmZrckw0WlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBMdW1pbm9zaXR5TWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgbHVtaW5vc2l0eSBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvbG9yPWZhbHNlXSAtIERlZmluZXMgd2hldGhlciB0aGUgc2hhZGVyIHNob3VsZCBvdXRwdXQgY29sb3VycyBzY2FsZWQgd2l0aCB0aGVpciBsdW1pbmFuY2UgdmFsdWUuXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbcmFuZ2VdIC0gSWYgcHJvdmlkZWQsIHRoZSBzaGFkZXIgd2lsbCBtYXNrIG91dCB0ZXhlbHMgdGhhdCBhcmVuJ3QgaW4gdGhlIHNwZWNpZmllZCBsdW1pbmFuY2UgcmFuZ2UuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvbG9yID0gZmFsc2UsIHJhbmdlID0gbnVsbCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiTHVtaW5vc2l0eU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0ZGlzdGluY3Rpb246IG5ldyBVbmlmb3JtKDEuMCksXHJcblx0XHRcdFx0cmFuZ2U6IG5ldyBVbmlmb3JtKChyYW5nZSAhPT0gbnVsbCkgPyByYW5nZSA6IG5ldyBWZWN0b3IyKCkpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleFxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGNvbG9yKSB7IHRoaXMuZGVmaW5lcy5DT0xPUiA9IFwiMVwiOyB9XHJcblx0XHRpZihyYW5nZSAhPT0gbnVsbCkgeyB0aGlzLmRlZmluZXMuUkFOR0UgPSBcIjFcIjsgfVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBmbG9hdCBncmFudWxhcml0eTtcXHJcXG51bmlmb3JtIGZsb2F0IGR4O1xcclxcbnVuaWZvcm0gZmxvYXQgZHk7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbDtcXHJcXG5cXHJcXG5cXHRpZihncmFudWxhcml0eSA+IDAuMCkge1xcclxcblxcclxcblxcdFxcdHZlYzIgY29vcmQgPSB2ZWMyKFxcclxcblxcdFxcdFxcdGR4ICogKGZsb29yKHZVdi54IC8gZHgpICsgMC41KSxcXHJcXG5cXHRcXHRcXHRkeSAqIChmbG9vcih2VXYueSAvIGR5KSArIDAuNSlcXHJcXG5cXHRcXHQpO1xcclxcblxcclxcblxcdFxcdHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCBjb29yZCk7XFxyXFxuXFxyXFxuXFx0fSBlbHNlIHtcXHJcXG5cXHJcXG5cXHRcXHR0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gdGV4ZWw7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGl4ZWxhdGlvbiBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIE9yaWdpbmFsIHNoYWRlciBjb2RlIGJ5IFJvYmVydCBDYXNhbm92YTpcclxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2JlcnRjYXNhbm92YS9waXhlbGF0ZS1zaGFkZXJcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUGl4ZWxhdGlvbk1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHBpeGVsYXRpb24gbWF0ZXJpYWwuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiUGl4ZWxhdGlvbk1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0Z3JhbnVsYXJpdHk6IG5ldyBVbmlmb3JtKDEuMCksXHJcblx0XHRcdFx0cmVzb2x1dGlvbjogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoMS4wLCAxLjApKSxcclxuXHRcdFx0XHRkeDogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRkeTogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBwaXhlbCBncmFudWxhcml0eS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdGdldCBncmFudWxhcml0eSgpIHsgcmV0dXJuIHRoaXMudW5pZm9ybXMuZ3JhbnVsYXJpdHkudmFsdWU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBoaWdoZXIgdmFsdWUgeWllbGRzIGNvYXJzZXIgdmlzdWFscy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdHNldCBncmFudWxhcml0eSh4KSB7XHJcblxyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSB0aGlzLnVuaWZvcm1zO1xyXG5cdFx0Y29uc3QgcmVzb2x1dGlvbiA9IHVuaWZvcm1zLnJlc29sdXRpb24udmFsdWU7XHJcblxyXG5cdFx0dW5pZm9ybXMuZ3JhbnVsYXJpdHkudmFsdWUgPSB4O1xyXG5cdFx0dW5pZm9ybXMuZHgudmFsdWUgPSB4IC8gcmVzb2x1dGlvbi54O1xyXG5cdFx0dW5pZm9ybXMuZHkudmFsdWUgPSB4IC8gcmVzb2x1dGlvbi55O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHJlc29sdXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFJlc29sdXRpb24od2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZS5zZXQod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLmdyYW51bGFyaXR5ID0gdGhpcy5ncmFudWxhcml0eTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcIiNpbmNsdWRlIDxjb21tb24+XFxyXFxuXFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSB2ZWMyIGNlbnRlcjtcXHJcXG51bmlmb3JtIGZsb2F0IGFzcGVjdDtcXHJcXG51bmlmb3JtIGZsb2F0IHdhdmVTaXplO1xcclxcbnVuaWZvcm0gZmxvYXQgcmFkaXVzO1xcclxcbnVuaWZvcm0gZmxvYXQgbWF4UmFkaXVzO1xcclxcbnVuaWZvcm0gZmxvYXQgYW1wbGl0dWRlO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxudmFyeWluZyBmbG9hdCB2U2l6ZTtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBhc3BlY3RDb3JyZWN0aW9uID0gdmVjMihhc3BlY3QsIDEuMCk7XFxyXFxuXFxyXFxuXFx0dmVjMiBkaWZmZXJlbmNlID0gdlV2ICogYXNwZWN0Q29ycmVjdGlvbiAtIGNlbnRlciAqIGFzcGVjdENvcnJlY3Rpb247XFxyXFxuXFx0ZmxvYXQgZGlzdGFuY2UgPSBzcXJ0KGRvdChkaWZmZXJlbmNlLCBkaWZmZXJlbmNlKSkgKiB2U2l6ZTtcXHJcXG5cXHJcXG5cXHR2ZWMyIGRpc3BsYWNlbWVudCA9IHZlYzIoMC4wKTtcXHJcXG5cXHJcXG5cXHRpZihkaXN0YW5jZSA+IHJhZGl1cykge1xcclxcblxcclxcblxcdFxcdGlmKGRpc3RhbmNlIDwgcmFkaXVzICsgd2F2ZVNpemUpIHtcXHJcXG5cXHJcXG5cXHRcXHRcXHRmbG9hdCBhbmdsZSA9IChkaXN0YW5jZSAtIHJhZGl1cykgKiBQSTIgLyB3YXZlU2l6ZTtcXHJcXG5cXHRcXHRcXHRmbG9hdCBjb3NTaW4gPSAoMS4wIC0gY29zKGFuZ2xlKSkgKiAwLjU7XFxyXFxuXFxyXFxuXFx0XFx0XFx0ZmxvYXQgZXh0ZW50ID0gbWF4UmFkaXVzICsgd2F2ZVNpemU7XFxyXFxuXFx0XFx0XFx0ZmxvYXQgZGVjYXkgPSBtYXgoZXh0ZW50IC0gZGlzdGFuY2UgKiBkaXN0YW5jZSwgMC4wKSAvIGV4dGVudDtcXHJcXG5cXHJcXG5cXHRcXHRcXHRkaXNwbGFjZW1lbnQgPSAoKGNvc1NpbiAqIGFtcGxpdHVkZSAqIGRpZmZlcmVuY2UpIC8gZGlzdGFuY2UpICogZGVjYXk7XFxyXFxuXFxyXFxuXFx0XFx0fVxcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiAtIGRpc3BsYWNlbWVudCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInVuaWZvcm0gZmxvYXQgc2l6ZTtcXHJcXG51bmlmb3JtIGZsb2F0IHNjYWxlO1xcclxcbnVuaWZvcm0gZmxvYXQgY2FtZXJhRGlzdGFuY2U7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG52YXJ5aW5nIGZsb2F0IHZTaXplO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHR2U2l6ZSA9ICgwLjEgKiBjYW1lcmFEaXN0YW5jZSkgLyBzaXplO1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2hvY2sgd2F2ZSBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIGEgR2lzdCBieSBKZWFuLVBoaWxpcHBlIFNhcmRhOlxyXG4gKiAgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vanBzYXJkYS8zM2NlYTY3YTlmMmVjYjBhMGVkYVxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTaG9ja1dhdmVNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzaG9jayB3YXZlIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53YXZlU2l6ZT0wLjJdIC0gVGhlIHdhdmUgc2l6ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYW1wbGl0dWRlPTAuMDVdIC0gVGhlIGRpc3RvcnRpb24gYW1wbGl0dWRlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRpZihvcHRpb25zLm1heFJhZGl1cyA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMubWF4UmFkaXVzID0gMS4wOyB9XHJcblx0XHRpZihvcHRpb25zLndhdmVTaXplID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy53YXZlU2l6ZSA9IDAuMjsgfVxyXG5cdFx0aWYob3B0aW9ucy5hbXBsaXR1ZGUgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLmFtcGxpdHVkZSA9IDAuMDU7IH1cclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIlNob2NrV2F2ZU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblxyXG5cdFx0XHRcdGNlbnRlcjogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoMC41LCAwLjUpKSxcclxuXHRcdFx0XHRhc3BlY3Q6IG5ldyBVbmlmb3JtKDEuMCksXHJcblx0XHRcdFx0Y2FtZXJhRGlzdGFuY2U6IG5ldyBVbmlmb3JtKDEuMCksXHJcblxyXG5cdFx0XHRcdHNpemU6IG5ldyBVbmlmb3JtKDEuMCksXHJcblx0XHRcdFx0cmFkaXVzOiBuZXcgVW5pZm9ybSgtb3B0aW9ucy53YXZlU2l6ZSksXHJcblx0XHRcdFx0bWF4UmFkaXVzOiBuZXcgVW5pZm9ybShvcHRpb25zLm1heFJhZGl1cyksXHJcblx0XHRcdFx0d2F2ZVNpemU6IG5ldyBVbmlmb3JtKG9wdGlvbnMud2F2ZVNpemUpLFxyXG5cdFx0XHRcdGFtcGxpdHVkZTogbmV3IFVuaWZvcm0ob3B0aW9ucy5hbXBsaXR1ZGUpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIHNhbXBsZXIyRCB0V2VpZ2h0cztcXHJcXG5cXHJcXG51bmlmb3JtIHZlYzIgdGV4ZWxTaXplO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxudmFyeWluZyB2ZWM0IHZPZmZzZXQ7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdC8vIEZldGNoIHRoZSBibGVuZGluZyB3ZWlnaHRzIGZvciBjdXJyZW50IHBpeGVsLlxcclxcblxcdHZlYzQgYTtcXHJcXG5cXHRhLnh6ID0gdGV4dHVyZTJEKHRXZWlnaHRzLCB2VXYpLnh6O1xcclxcblxcdGEueSA9IHRleHR1cmUyRCh0V2VpZ2h0cywgdk9mZnNldC56dykuZztcXHJcXG5cXHRhLncgPSB0ZXh0dXJlMkQodFdlaWdodHMsIHZPZmZzZXQueHkpLmE7XFxyXFxuXFxyXFxuXFx0dmVjNCBjb2xvcjtcXHJcXG5cXHJcXG5cXHQvLyBDaGVjayBpZiB0aGVyZSBpcyBhbnkgYmxlbmRpbmcgd2VpZ2h0IHdpdGggYSB2YWx1ZSBncmVhdGVyIHRoYW4gMC4wLlxcclxcblxcdGlmKGRvdChhLCB2ZWM0KDEuMCkpIDwgMWUtNSkge1xcclxcblxcclxcblxcdFxcdGNvbG9yID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYsIDAuMCk7XFxyXFxuXFxyXFxuXFx0fSBlbHNlIHtcXHJcXG5cXHJcXG5cXHRcXHQvKiBVcCB0byBmb3VyIGxpbmVzIGNhbiBiZSBjcm9zc2luZyBhIHBpeGVsIChvbmUgdGhyb3VnaCBlYWNoIGVkZ2UpLiBXZSBmYXZvclxcclxcblxcdFxcdCAqIGJsZW5kaW5nIGJ5IGNob29zaW5nIHRoZSBsaW5lIHdpdGggdGhlIG1heGltdW0gd2VpZ2h0IGZvciBlYWNoIGRpcmVjdGlvbi5cXHJcXG5cXHRcXHQgKi9cXHJcXG5cXHJcXG5cXHRcXHR2ZWMyIG9mZnNldDtcXHJcXG5cXHRcXHRvZmZzZXQueCA9IGEuYSA+IGEuYiA/IGEuYSA6IC1hLmI7IC8vIExlZnQgdnMuIHJpZ2h0LlxcclxcblxcdFxcdG9mZnNldC55ID0gYS5nID4gYS5yID8gLWEuZyA6IGEucjsgLy8gVG9wIHZzLiBib3R0b20gKGNoYW5nZWQgc2lnbnMpLlxcclxcblxcclxcblxcdFxcdC8vIFRoZW4gd2UgZ28gaW4gdGhlIGRpcmVjdGlvbiB0aGF0IGhhcyB0aGUgbWF4aW11bSB3ZWlnaHQgKGhvcml6b250YWwgdnMuIHZlcnRpY2FsKS5cXHJcXG5cXHRcXHRpZihhYnMob2Zmc2V0LngpID4gYWJzKG9mZnNldC55KSkge1xcclxcblxcclxcblxcdFxcdFxcdG9mZnNldC55ID0gMC4wO1xcclxcblxcclxcblxcdFxcdH0gZWxzZSB7XFxyXFxuXFxyXFxuXFx0XFx0XFx0b2Zmc2V0LnggPSAwLjA7XFxyXFxuXFxyXFxuXFx0XFx0fVxcclxcblxcclxcblxcdFxcdC8vIEZldGNoIHRoZSBvcHBvc2l0ZSBjb2xvciBhbmQgbGVycCBieSBoYW5kLlxcclxcblxcdFxcdGNvbG9yID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYsIDAuMCk7XFxyXFxuXFx0XFx0dmVjMiBjb29yZCA9IHZVdiArIHNpZ24ob2Zmc2V0KSAqIHRleGVsU2l6ZTtcXHJcXG5cXHRcXHR2ZWM0IG9wcG9zaXRlQ29sb3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkLCAwLjApO1xcclxcblxcdFxcdGZsb2F0IHMgPSBhYnMob2Zmc2V0LngpID4gYWJzKG9mZnNldC55KSA/IGFicyhvZmZzZXQueCkgOiBhYnMob2Zmc2V0LnkpO1xcclxcblxcclxcblxcdFxcdC8vIEdhbW1hIGNvcnJlY3Rpb24uXFxyXFxuXFx0XFx0Y29sb3IucmdiID0gcG93KGFicyhjb2xvci5yZ2IpLCB2ZWMzKDIuMikpO1xcclxcblxcdFxcdG9wcG9zaXRlQ29sb3IucmdiID0gcG93KGFicyhvcHBvc2l0ZUNvbG9yLnJnYiksIHZlYzMoMi4yKSk7XFxyXFxuXFx0XFx0Y29sb3IgPSBtaXgoY29sb3IsIG9wcG9zaXRlQ29sb3IsIHMpO1xcclxcblxcdFxcdGNvbG9yLnJnYiA9IHBvdyhhYnMoY29sb3IucmdiKSwgdmVjMygxLjAgLyAyLjIpKTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gY29sb3I7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInVuaWZvcm0gdmVjMiB0ZXhlbFNpemU7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG52YXJ5aW5nIHZlYzQgdk9mZnNldDtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFxyXFxuXFx0dk9mZnNldCA9IHV2Lnh5eHkgKyB0ZXhlbFNpemUueHl4eSAqIHZlYzQoMS4wLCAwLjAsIDAuMCwgLTEuMCk7IC8vIENoYW5nZWQgc2lnbiBpbiBXIGNvbXBvbmVudC5cXHJcXG5cXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBTdWJwaXhlbCBNb3JwaG9sb2dpY2FsIEFudGlhbGlhc2luZy5cclxuICpcclxuICogVGhpcyBtYXRlcmlhbCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgZmluYWwgYW50aWFsaWFzaW5nLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTTUFBQmxlbmRNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBTTUFBIGJsZW5kIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbdGV4ZWxTaXplXSAtIFRoZSBhYnNvbHV0ZSBzY3JlZW4gdGV4ZWwgc2l6ZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IodGV4ZWxTaXplID0gbmV3IFZlY3RvcjIoKSkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiU01BQUJsZW5kTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0V2VpZ2h0czogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dGV4ZWxTaXplOiBuZXcgVW5pZm9ybSh0ZXhlbFNpemUpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcbnZhcnlpbmcgdmVjNCB2T2Zmc2V0WzNdO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHRjb25zdCB2ZWMyIFRIUkVTSE9MRCA9IHZlYzIoRURHRV9USFJFU0hPTEQpO1xcclxcblxcclxcblxcdC8vIENhbGN1bGF0ZSBjb2xvciBkZWx0YXMuXFxyXFxuXFx0dmVjNCBkZWx0YTtcXHJcXG5cXHR2ZWMzIGMgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdikucmdiO1xcclxcblxcclxcblxcdHZlYzMgY0xlZnQgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZPZmZzZXRbMF0ueHkpLnJnYjtcXHJcXG5cXHR2ZWMzIHQgPSBhYnMoYyAtIGNMZWZ0KTtcXHJcXG5cXHRkZWx0YS54ID0gbWF4KG1heCh0LnIsIHQuZyksIHQuYik7XFxyXFxuXFxyXFxuXFx0dmVjMyBjVG9wID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2T2Zmc2V0WzBdLnp3KS5yZ2I7XFxyXFxuXFx0dCA9IGFicyhjIC0gY1RvcCk7XFxyXFxuXFx0ZGVsdGEueSA9IG1heChtYXgodC5yLCB0LmcpLCB0LmIpO1xcclxcblxcclxcblxcdC8vIFdlIGRvIHRoZSB1c3VhbCB0aHJlc2hvbGQuXFxyXFxuXFx0dmVjMiBlZGdlcyA9IHN0ZXAoVEhSRVNIT0xELCBkZWx0YS54eSk7XFxyXFxuXFxyXFxuXFx0Ly8gVGhlbiBkaXNjYXJkIGlmIHRoZXJlIGlzIG5vIGVkZ2UuXFxyXFxuXFx0aWYoZG90KGVkZ2VzLCB2ZWMyKDEuMCkpID09IDAuMCkge1xcclxcblxcclxcblxcdFxcdGRpc2NhcmQ7XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcblxcdC8vIENhbGN1bGF0ZSByaWdodCBhbmQgYm90dG9tIGRlbHRhcy5cXHJcXG5cXHR2ZWMzIGNSaWdodCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdk9mZnNldFsxXS54eSkucmdiO1xcclxcblxcdHQgPSBhYnMoYyAtIGNSaWdodCk7XFxyXFxuXFx0ZGVsdGEueiA9IG1heChtYXgodC5yLCB0LmcpLCB0LmIpO1xcclxcblxcclxcblxcdHZlYzMgY0JvdHRvbSAgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZPZmZzZXRbMV0uencpLnJnYjtcXHJcXG5cXHR0ID0gYWJzKGMgLSBjQm90dG9tKTtcXHJcXG5cXHRkZWx0YS53ID0gbWF4KG1heCh0LnIsIHQuZyksIHQuYik7XFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRlIHRoZSBtYXhpbXVtIGRlbHRhIGluIHRoZSBkaXJlY3QgbmVpZ2hib3Job29kLlxcclxcblxcdGZsb2F0IG1heERlbHRhID0gbWF4KG1heChtYXgoZGVsdGEueCwgZGVsdGEueSksIGRlbHRhLnopLCBkZWx0YS53KTtcXHJcXG5cXHJcXG5cXHQvLyBDYWxjdWxhdGUgbGVmdC1sZWZ0IGFuZCB0b3AtdG9wIGRlbHRhcy5cXHJcXG5cXHR2ZWMzIGNMZWZ0TGVmdCAgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZPZmZzZXRbMl0ueHkpLnJnYjtcXHJcXG5cXHR0ID0gYWJzKGMgLSBjTGVmdExlZnQpO1xcclxcblxcdGRlbHRhLnogPSBtYXgobWF4KHQuciwgdC5nKSwgdC5iKTtcXHJcXG5cXHJcXG5cXHR2ZWMzIGNUb3BUb3AgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZPZmZzZXRbMl0uencpLnJnYjtcXHJcXG5cXHR0ID0gYWJzKGMgLSBjVG9wVG9wKTtcXHJcXG5cXHRkZWx0YS53ID0gbWF4KG1heCh0LnIsIHQuZyksIHQuYik7XFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBtYXhpbXVtIGRlbHRhLlxcclxcblxcdG1heERlbHRhID0gbWF4KG1heChtYXhEZWx0YSwgZGVsdGEueiksIGRlbHRhLncpO1xcclxcblxcclxcblxcdC8vIExvY2FsIGNvbnRyYXN0IGFkYXB0YXRpb24gaW4gYWN0aW9uLlxcclxcblxcdGVkZ2VzLnh5ICo9IHN0ZXAoMC41ICogbWF4RGVsdGEsIGRlbHRhLnh5KTtcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KGVkZ2VzLCAwLjAsIDAuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInVuaWZvcm0gdmVjMiB0ZXhlbFNpemU7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG52YXJ5aW5nIHZlYzQgdk9mZnNldFszXTtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFxyXFxuXFx0dk9mZnNldFswXSA9IHV2Lnh5eHkgKyB0ZXhlbFNpemUueHl4eSAqIHZlYzQoLTEuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIENoYW5nZWQgc2lnbiBpbiBXIGNvbXBvbmVudC5cXHJcXG5cXHR2T2Zmc2V0WzFdID0gdXYueHl4eSArIHRleGVsU2l6ZS54eXh5ICogdmVjNCgxLjAsIDAuMCwgMC4wLCAtMS4wKTsgLy8gQ2hhbmdlZCBzaWduIGluIFcgY29tcG9uZW50LlxcclxcblxcdHZPZmZzZXRbMl0gPSB1di54eXh5ICsgdGV4ZWxTaXplLnh5eHkgKiB2ZWM0KC0yLjAsIDAuMCwgMC4wLCAyLjApOyAvLyBDaGFuZ2VkIHNpZ24gaW4gVyBjb21wb25lbnQuXFxyXFxuXFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogU3VicGl4ZWwgTW9ycGhvbG9naWNhbCBBbnRpYWxpYXNpbmcuXHJcbiAqXHJcbiAqIFRoaXMgbWF0ZXJpYWwgZGV0ZWN0cyBlZGdlcyBpbiBhIGNvbG9yIHRleHR1cmUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgU01BQSBjb2xvciBlZGdlcyBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7VmVjdG9yMn0gW3RleGVsU2l6ZV0gLSBUaGUgYWJzb2x1dGUgc2NyZWVuIHRleGVsIHNpemUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHRleGVsU2l6ZSA9IG5ldyBWZWN0b3IyKCkpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIlNNQUFDb2xvckVkZ2VzTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdGRlZmluZXM6IHtcclxuXHJcblx0XHRcdFx0RURHRV9USFJFU0hPTEQ6IFwiMC4xXCJcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dGV4ZWxTaXplOiBuZXcgVW5pZm9ybSh0ZXhlbFNpemUpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmltcG9ydCBhcmVhSW1hZ2UgZnJvbSBcIi4vaW1hZ2VzL3NtYWEvYXJlYS1pbWFnZS5qc1wiO1xyXG5pbXBvcnQgc2VhcmNoSW1hZ2UgZnJvbSBcIi4vaW1hZ2VzL3NtYWEvc2VhcmNoLWltYWdlLmpzXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwiI2RlZmluZSBzYW1wbGVMZXZlbFplcm9PZmZzZXQodCwgY29vcmQsIG9mZnNldCkgdGV4dHVyZTJEKHQsIGNvb3JkICsgZmxvYXQob2Zmc2V0KSAqIHRleGVsU2l6ZSwgMC4wKVxcclxcblxcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHRBcmVhO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHRTZWFyY2g7XFxyXFxuXFxyXFxudW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcbnZhcnlpbmcgdmVjNCB2T2Zmc2V0WzNdO1xcclxcbnZhcnlpbmcgdmVjMiB2UGl4Q29vcmQ7XFxyXFxuXFxyXFxudmVjMiByb3VuZCh2ZWMyIHgpIHtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gc2lnbih4KSAqIGZsb29yKGFicyh4KSArIDAuNSk7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbmZsb2F0IHNlYXJjaExlbmd0aCh2ZWMyIGUsIGZsb2F0IGJpYXMsIGZsb2F0IHNjYWxlKSB7XFxyXFxuXFxyXFxuXFx0Ly8gTm90IHJlcXVpcmVkIGlmIHRTZWFyY2ggYWNjZXNzZXMgYXJlIHNldCB0byBwb2ludC5cXHJcXG5cXHQvLyBjb25zdCB2ZWMyIFNFQVJDSF9URVhfUElYRUxfU0laRSA9IDEuMCAvIHZlYzIoNjYuMCwgMzMuMCk7XFxyXFxuXFx0Ly8gZSA9IHZlYzIoYmlhcywgMC4wKSArIDAuNSAqIFNFQVJDSF9URVhfUElYRUxfU0laRSArIGUgKiB2ZWMyKHNjYWxlLCAxLjApICogdmVjMig2NC4wLCAzMi4wKSAqIFNFQVJDSF9URVhfUElYRUxfU0laRTtcXHJcXG5cXHJcXG5cXHRlLnIgPSBiaWFzICsgZS5yICogc2NhbGU7XFxyXFxuXFxyXFxuXFx0cmV0dXJuIDI1NS4wICogdGV4dHVyZTJEKHRTZWFyY2gsIGUsIDAuMCkucjtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuZmxvYXQgc2VhcmNoWExlZnQodmVjMiB0ZXhDb29yZCwgZmxvYXQgZW5kKSB7XFxyXFxuXFxyXFxuXFx0LyogQFBTRVVET19HQVRIRVI0XFxyXFxuXFx0ICogVGhpcyB0ZXhDb29yZCBoYXMgYmVlbiBvZmZzZXQgYnkgKC0wLjI1LCAtMC4xMjUpIGluIHRoZSB2ZXJ0ZXggc2hhZGVyIHRvXFxyXFxuXFx0ICogc2FtcGxlIGJldHdlZW4gZWRnZSwgdGh1cyBmZXRjaGluZyBmb3VyIGVkZ2VzIGluIGEgcm93LlxcclxcblxcdCAqIFNhbXBsaW5nIHdpdGggZGlmZmVyZW50IG9mZnNldHMgaW4gZWFjaCBkaXJlY3Rpb24gYWxsb3dzIHRvIGRpc2FtYmlndWF0ZVxcclxcblxcdCAqIHdoaWNoIGVkZ2VzIGFyZSBhY3RpdmUgZnJvbSB0aGUgZm91ciBmZXRjaGVkIG9uZXMuXFxyXFxuXFx0ICovXFxyXFxuXFxyXFxuXFx0dmVjMiBlID0gdmVjMigwLjAsIDEuMCk7XFxyXFxuXFxyXFxuXFx0Zm9yKGludCBpID0gMDsgaSA8IFNNQUFfTUFYX1NFQVJDSF9TVEVQU19JTlQ7ICsraSkge1xcclxcblxcclxcblxcdFxcdGUgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHRleENvb3JkLCAwLjApLnJnO1xcclxcblxcdFxcdHRleENvb3JkIC09IHZlYzIoMi4wLCAwLjApICogdGV4ZWxTaXplO1xcclxcblxcclxcblxcdFxcdGlmKCEodGV4Q29vcmQueCA+IGVuZCAmJiBlLmcgPiAwLjgyODEgJiYgZS5yID09IDAuMCkpIHsgYnJlYWs7IH1cXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0Ly8gQ29ycmVjdCB0aGUgcHJldmlvdXNseSBhcHBsaWVkIG9mZnNldCAoLTAuMjUsIC0wLjEyNSkuXFxyXFxuXFx0dGV4Q29vcmQueCArPSAwLjI1ICogdGV4ZWxTaXplLng7XFxyXFxuXFxyXFxuXFx0Ly8gVGhlIHNlYXJjaGVzIGFyZSBiaWFzZWQgYnkgMSwgc28gYWRqdXN0IHRoZSBjb29yZHMgYWNjb3JkaW5nbHkuXFxyXFxuXFx0dGV4Q29vcmQueCArPSB0ZXhlbFNpemUueDtcXHJcXG5cXHJcXG5cXHQvLyBEaXNhbWJpZ3VhdGUgdGhlIGxlbmd0aCBhZGRlZCBieSB0aGUgbGFzdCBzdGVwLlxcclxcblxcdHRleENvb3JkLnggKz0gMi4wICogdGV4ZWxTaXplLng7IC8vIFVuZG8gbGFzdCBzdGVwLlxcclxcblxcdHRleENvb3JkLnggLT0gdGV4ZWxTaXplLnggKiBzZWFyY2hMZW5ndGgoZSwgMC4wLCAwLjUpO1xcclxcblxcclxcblxcdHJldHVybiB0ZXhDb29yZC54O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCBzZWFyY2hYUmlnaHQodmVjMiB0ZXhDb29yZCwgZmxvYXQgZW5kKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBlID0gdmVjMigwLjAsIDEuMCk7XFxyXFxuXFxyXFxuXFx0Zm9yKGludCBpID0gMDsgaSA8IFNNQUFfTUFYX1NFQVJDSF9TVEVQU19JTlQ7ICsraSkge1xcclxcblxcclxcblxcdFxcdGUgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHRleENvb3JkLCAwLjApLnJnO1xcclxcblxcdFxcdHRleENvb3JkICs9IHZlYzIoMi4wLCAwLjApICogdGV4ZWxTaXplO1xcclxcblxcclxcblxcdFxcdGlmKCEodGV4Q29vcmQueCA8IGVuZCAmJiBlLmcgPiAwLjgyODEgJiYgZS5yID09IDAuMCkpIHsgYnJlYWs7IH1cXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0dGV4Q29vcmQueCAtPSAwLjI1ICogdGV4ZWxTaXplLng7XFxyXFxuXFx0dGV4Q29vcmQueCAtPSB0ZXhlbFNpemUueDtcXHJcXG5cXHR0ZXhDb29yZC54IC09IDIuMCAqIHRleGVsU2l6ZS54O1xcclxcblxcdHRleENvb3JkLnggKz0gdGV4ZWxTaXplLnggKiBzZWFyY2hMZW5ndGgoZSwgMC41LCAwLjUpO1xcclxcblxcclxcblxcdHJldHVybiB0ZXhDb29yZC54O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCBzZWFyY2hZVXAodmVjMiB0ZXhDb29yZCwgZmxvYXQgZW5kKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBlID0gdmVjMigxLjAsIDAuMCk7XFxyXFxuXFxyXFxuXFx0Zm9yKGludCBpID0gMDsgaSA8IFNNQUFfTUFYX1NFQVJDSF9TVEVQU19JTlQ7ICsraSkge1xcclxcblxcclxcblxcdFxcdGUgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHRleENvb3JkLCAwLjApLnJnO1xcclxcblxcdFxcdHRleENvb3JkICs9IHZlYzIoMC4wLCAyLjApICogdGV4ZWxTaXplOyAvLyBDaGFuZ2VkIHNpZ24uXFxyXFxuXFxyXFxuXFx0XFx0aWYoISh0ZXhDb29yZC55ID4gZW5kICYmIGUuciA+IDAuODI4MSAmJiBlLmcgPT0gMC4wKSkgeyBicmVhazsgfVxcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHR0ZXhDb29yZC55IC09IDAuMjUgKiB0ZXhlbFNpemUueTsgLy8gQ2hhbmdlZCBzaWduLlxcclxcblxcdHRleENvb3JkLnkgLT0gdGV4ZWxTaXplLnk7IC8vIENoYW5nZWQgc2lnbi5cXHJcXG5cXHR0ZXhDb29yZC55IC09IDIuMCAqIHRleGVsU2l6ZS55OyAvLyBDaGFuZ2VkIHNpZ24uXFxyXFxuXFx0dGV4Q29vcmQueSArPSB0ZXhlbFNpemUueSAqIHNlYXJjaExlbmd0aChlLmdyLCAwLjAsIDAuNSk7IC8vIENoYW5nZWQgc2lnbi5cXHJcXG5cXHJcXG5cXHRyZXR1cm4gdGV4Q29vcmQueTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuZmxvYXQgc2VhcmNoWURvd24odmVjMiB0ZXhDb29yZCwgZmxvYXQgZW5kKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBlID0gdmVjMigxLjAsIDAuMCk7XFxyXFxuXFxyXFxuXFx0Zm9yKGludCBpID0gMDsgaSA8IFNNQUFfTUFYX1NFQVJDSF9TVEVQU19JTlQ7ICsraSApIHtcXHJcXG5cXHJcXG5cXHRcXHRlID0gdGV4dHVyZTJEKHREaWZmdXNlLCB0ZXhDb29yZCwgMC4wKS5yZztcXHJcXG5cXHRcXHR0ZXhDb29yZCAtPSB2ZWMyKDAuMCwgMi4wKSAqIHRleGVsU2l6ZTsgLy8gQ2hhbmdlZCBzaWduLlxcclxcblxcclxcblxcdFxcdGlmKCEodGV4Q29vcmQueSA8IGVuZCAmJiBlLnIgPiAwLjgyODEgJiYgZS5nID09IDAuMCkpIHsgYnJlYWs7IH1cXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0dGV4Q29vcmQueSArPSAwLjI1ICogdGV4ZWxTaXplLnk7IC8vIENoYW5nZWQgc2lnbi5cXHJcXG5cXHR0ZXhDb29yZC55ICs9IHRleGVsU2l6ZS55OyAvLyBDaGFuZ2VkIHNpZ24uXFxyXFxuXFx0dGV4Q29vcmQueSArPSAyLjAgKiB0ZXhlbFNpemUueTsgLy8gQ2hhbmdlZCBzaWduLlxcclxcblxcdHRleENvb3JkLnkgLT0gdGV4ZWxTaXplLnkgKiBzZWFyY2hMZW5ndGgoZS5nciwgMC41LCAwLjUpOyAvLyBDaGFuZ2VkIHNpZ24uXFxyXFxuXFxyXFxuXFx0cmV0dXJuIHRleENvb3JkLnk7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnZlYzIgYXJlYSh2ZWMyIGRpc3QsIGZsb2F0IGUxLCBmbG9hdCBlMiwgZmxvYXQgb2Zmc2V0KSB7XFxyXFxuXFxyXFxuXFx0Ly8gUm91bmRpbmcgcHJldmVudHMgcHJlY2lzaW9uIGVycm9ycyBvZiBiaWxpbmVhciBmaWx0ZXJpbmcuXFxyXFxuXFx0dmVjMiB0ZXhDb29yZCA9IFNNQUFfQVJFQVRFWF9NQVhfRElTVEFOQ0UgKiByb3VuZCg0LjAgKiB2ZWMyKGUxLCBlMikpICsgZGlzdDtcXHJcXG5cXHJcXG5cXHQvLyBTY2FsZSBhbmQgYmlhcyBmb3IgdGV4ZWwgc3BhY2UgdHJhbnNsYXRpb24uXFxyXFxuXFx0dGV4Q29vcmQgPSBTTUFBX0FSRUFURVhfUElYRUxfU0laRSAqIHRleENvb3JkICsgKDAuNSAqIFNNQUFfQVJFQVRFWF9QSVhFTF9TSVpFKTtcXHJcXG5cXHJcXG5cXHQvLyBNb3ZlIHRvIHByb3BlciBwbGFjZSwgYWNjb3JkaW5nIHRvIHRoZSBzdWJwaXhlbCBvZmZzZXQuXFxyXFxuXFx0dGV4Q29vcmQueSArPSBTTUFBX0FSRUFURVhfU1VCVEVYX1NJWkUgKiBvZmZzZXQ7XFxyXFxuXFxyXFxuXFx0cmV0dXJuIHRleHR1cmUyRCh0QXJlYSwgdGV4Q29vcmQsIDAuMCkucmc7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHdlaWdodHMgPSB2ZWM0KDAuMCk7XFxyXFxuXFx0dmVjNCBzdWJzYW1wbGVJbmRpY2VzID0gdmVjNCgwLjApO1xcclxcblxcdHZlYzIgZSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KS5yZztcXHJcXG5cXHJcXG5cXHRpZihlLmcgPiAwLjApIHtcXHJcXG5cXHJcXG5cXHRcXHQvLyBFZGdlIGF0IG5vcnRoLlxcclxcblxcdFxcdHZlYzIgZDtcXHJcXG5cXHJcXG5cXHRcXHQvLyBGaW5kIHRoZSBkaXN0YW5jZSB0byB0aGUgbGVmdC5cXHJcXG5cXHRcXHR2ZWMyIGNvb3JkcztcXHJcXG5cXHRcXHRjb29yZHMueCA9IHNlYXJjaFhMZWZ0KHZPZmZzZXRbMF0ueHksIHZPZmZzZXRbMl0ueCk7XFxyXFxuXFx0XFx0Y29vcmRzLnkgPSB2T2Zmc2V0WzFdLnk7IC8vIHZPZmZzZXRbMV0ueSA9IHZVdi55IC0gMC4yNSAqIHRleGVsU2l6ZS55IChAQ1JPU1NJTkdfT0ZGU0VUKVxcclxcblxcdFxcdGQueCA9IGNvb3Jkcy54O1xcclxcblxcclxcblxcdFxcdC8qIE5vdyBmZXRjaCB0aGUgbGVmdCBjcm9zc2luZyBlZGdlcywgdHdvIGF0IGEgdGltZSB1c2luZyBiaWxpbmVhciBmaWx0ZXJpbmcuXFxyXFxuXFx0XFx0ICogU2FtcGxpbmcgYXQgLTAuMjUgKHNlZSBAQ1JPU1NJTkdfT0ZGU0VUKSBlbmFibGVzIHRvIGRpc2Nlcm4gd2hhdCB2YWx1ZSBlYWNoIGVkZ2UgaGFzLlxcclxcblxcdFxcdCAqL1xcclxcblxcclxcblxcdFxcdGZsb2F0IGUxID0gdGV4dHVyZTJEKHREaWZmdXNlLCBjb29yZHMsIDAuMCkucjtcXHJcXG5cXHJcXG5cXHRcXHQvLyBGaW5kIHRoZSBkaXN0YW5jZSB0byB0aGUgcmlnaHQuXFxyXFxuXFx0XFx0Y29vcmRzLnggPSBzZWFyY2hYUmlnaHQodk9mZnNldFswXS56dywgdk9mZnNldFsyXS55KTtcXHJcXG5cXHRcXHRkLnkgPSBjb29yZHMueDtcXHJcXG5cXHJcXG5cXHRcXHQvLyBUcmFuc2xhdGUgZGlzdGFuY2VzIHRvIHBpeGVsIHVuaXRzIGZvciBiZXR0ZXIgaW50ZXJsZWF2ZSBhcml0aG1ldGljIGFuZCBtZW1vcnkgYWNjZXNzZXMuXFxyXFxuXFx0XFx0ZCA9IGQgLyB0ZXhlbFNpemUueCAtIHZQaXhDb29yZC54O1xcclxcblxcclxcblxcdFxcdC8vIFRoZSBhcmVhIGJlbG93IG5lZWRzIGEgc3FydCwgYXMgdGhlIGFyZWFzIHRleHR1cmUgaXMgY29tcHJlc3NlZCBxdWFkcmF0aWNhbGx5LlxcclxcblxcdFxcdHZlYzIgc3FydEQgPSBzcXJ0KGFicyhkKSk7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gRmV0Y2ggdGhlIHJpZ2h0IGNyb3NzaW5nIGVkZ2VzLlxcclxcblxcdFxcdGNvb3Jkcy55IC09IHRleGVsU2l6ZS55OyAvLyBXZWJHTCBwb3J0IG5vdGU6IEFkZGVkLlxcclxcblxcdFxcdGZsb2F0IGUyID0gc2FtcGxlTGV2ZWxaZXJvT2Zmc2V0KHREaWZmdXNlLCBjb29yZHMsIGl2ZWMyKDEsIDApKS5yO1xcclxcblxcclxcblxcdFxcdC8vIFBhdHRlcm4gcmVjb2duaXNlZCwgbm93IGdldCB0aGUgYWN0dWFsIGFyZWEuXFxyXFxuXFx0XFx0d2VpZ2h0cy5yZyA9IGFyZWEoc3FydEQsIGUxLCBlMiwgc3Vic2FtcGxlSW5kaWNlcy55KTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0aWYoZS5yID4gMC4wKSB7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gRWRnZSBhdCB3ZXN0LlxcclxcblxcdFxcdHZlYzIgZDtcXHJcXG5cXHJcXG5cXHRcXHQvLyBGaW5kIHRoZSBkaXN0YW5jZSB0byB0aGUgdG9wLlxcclxcblxcdFxcdHZlYzIgY29vcmRzO1xcclxcblxcclxcblxcdFxcdGNvb3Jkcy55ID0gc2VhcmNoWVVwKHZPZmZzZXRbMV0ueHksIHZPZmZzZXRbMl0ueik7XFxyXFxuXFx0XFx0Y29vcmRzLnggPSB2T2Zmc2V0WzBdLng7IC8vIHZPZmZzZXRbMV0ueCA9IHZVdi54IC0gMC4yNSAqIHRleGVsU2l6ZS54O1xcclxcblxcdFxcdGQueCA9IGNvb3Jkcy55O1xcclxcblxcclxcblxcdFxcdC8vIEZldGNoIHRoZSB0b3AgY3Jvc3NpbmcgZWRnZXMuXFxyXFxuXFx0XFx0ZmxvYXQgZTEgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkcywgMC4wKS5nO1xcclxcblxcclxcblxcdFxcdC8vIEZpbmQgdGhlIGRpc3RhbmNlIHRvIHRoZSBib3R0b20uXFxyXFxuXFx0XFx0Y29vcmRzLnkgPSBzZWFyY2hZRG93bih2T2Zmc2V0WzFdLnp3LCB2T2Zmc2V0WzJdLncpO1xcclxcblxcdFxcdGQueSA9IGNvb3Jkcy55O1xcclxcblxcclxcblxcdFxcdC8vIERpc3RhbmNlcyBpbiBwaXhlbCB1bml0cy5cXHJcXG5cXHRcXHRkID0gZCAvIHRleGVsU2l6ZS55IC0gdlBpeENvb3JkLnk7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gVGhlIGFyZWEgYmVsb3cgbmVlZHMgYSBzcXJ0LCBhcyB0aGUgYXJlYXMgdGV4dHVyZSBpcyBjb21wcmVzc2VkIHF1YWRyYXRpY2FsbHkuXFxyXFxuXFx0XFx0dmVjMiBzcXJ0RCA9IHNxcnQoYWJzKGQpKTtcXHJcXG5cXHJcXG5cXHRcXHQvLyBGZXRjaCB0aGUgYm90dG9tIGNyb3NzaW5nIGVkZ2VzLlxcclxcblxcdFxcdGNvb3Jkcy55IC09IHRleGVsU2l6ZS55OyAvLyBXZWJHTCBwb3J0IG5vdGU6IEFkZGVkLlxcclxcblxcdFxcdGZsb2F0IGUyID0gc2FtcGxlTGV2ZWxaZXJvT2Zmc2V0KHREaWZmdXNlLCBjb29yZHMsIGl2ZWMyKDAsIDEpKS5nO1xcclxcblxcclxcblxcdFxcdC8vIEdldCB0aGUgYXJlYSBmb3IgdGhpcyBkaXJlY3Rpb24uXFxyXFxuXFx0XFx0d2VpZ2h0cy5iYSA9IGFyZWEoc3FydEQsIGUxLCBlMiwgc3Vic2FtcGxlSW5kaWNlcy54KTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gd2VpZ2h0cztcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcbnZhcnlpbmcgdmVjNCB2T2Zmc2V0WzNdO1xcclxcbnZhcnlpbmcgdmVjMiB2UGl4Q29vcmQ7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcclxcblxcdHZQaXhDb29yZCA9IHV2IC8gdGV4ZWxTaXplO1xcclxcblxcclxcblxcdC8vIE9mZnNldHMgZm9yIHRoZSBzZWFyY2hlcyAoc2VlIEBQU0VVRE9fR0FUSEVSNCkuXFxyXFxuXFx0dk9mZnNldFswXSA9IHV2Lnh5eHkgKyB0ZXhlbFNpemUueHl4eSAqIHZlYzQoLTAuMjUsIDAuMTI1LCAxLjI1LCAwLjEyNSk7IC8vIENoYW5nZWQgc2lnbiBpbiBZIGFuZCBXIGNvbXBvbmVudHMuXFxyXFxuXFx0dk9mZnNldFsxXSA9IHV2Lnh5eHkgKyB0ZXhlbFNpemUueHl4eSAqIHZlYzQoLTAuMTI1LCAwLjI1LCAtMC4xMjUsIC0xLjI1KTsgLy9DaGFuZ2VkIHNpZ24gaW4gWSBhbmQgVyBjb21wb25lbnRzLlxcclxcblxcclxcblxcdC8vIFRoaXMgaW5kaWNhdGVzIHRoZSBlbmRzIG9mIHRoZSBsb29wcy5cXHJcXG5cXHR2T2Zmc2V0WzJdID0gdmVjNCh2T2Zmc2V0WzBdLnh6LCB2T2Zmc2V0WzFdLnl3KSArIHZlYzQoLTIuMCwgMi4wLCAtMi4wLCAyLjApICogdGV4ZWxTaXplLnh4eXkgKiBTTUFBX01BWF9TRUFSQ0hfU1RFUFNfRkxPQVQ7XFxyXFxuXFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogU3VicGl4ZWwgTW9ycGhvbG9naWNhbCBBbnRpYWxpYXNpbmcuXHJcbiAqXHJcbiAqIFRoaXMgbWF0ZXJpYWwgY29tcHV0ZXMgd2VpZ2h0cyBmb3IgZGV0ZWN0ZWQgZWRnZXMuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNNQUFXZWlnaHRzTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgU01BQSB3ZWlnaHRzIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbdGV4ZWxTaXplXSAtIFRoZSBhYnNvbHV0ZSBzY3JlZW4gdGV4ZWwgc2l6ZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IodGV4ZWxTaXplID0gbmV3IFZlY3RvcjIoKSkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiU01BQVdlaWdodHNNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0ZGVmaW5lczoge1xyXG5cclxuXHRcdFx0XHRTTUFBX01BWF9TRUFSQ0hfU1RFUFNfSU5UOiBcIjhcIixcclxuXHRcdFx0XHRTTUFBX01BWF9TRUFSQ0hfU1RFUFNfRkxPQVQ6IFwiOC4wXCIsXHJcblxyXG5cdFx0XHRcdFNNQUFfQVJFQVRFWF9NQVhfRElTVEFOQ0U6IFwiMTYuMFwiLFxyXG5cclxuXHRcdFx0XHRTTUFBX0FSRUFURVhfUElYRUxfU0laRTogXCIoMS4wIC8gdmVjMigxNjAuMCwgNTYwLjApKVwiLFxyXG5cdFx0XHRcdFNNQUFfQVJFQVRFWF9TVUJURVhfU0laRTogXCIoMS4wIC8gNy4wKVwiXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRBcmVhOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0U2VhcmNoOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0ZXhlbFNpemU6IG5ldyBVbmlmb3JtKHRleGVsU2l6ZSlcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBhcmVhIHBhdHRlcm4gcmVjb2duaXRpb24gaW1hZ2UuIEVuY29kZWQgYXMgYmFzZTY0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmFyZWFJbWFnZSA9IGFyZWFJbWFnZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzZWFyY2ggaW1hZ2UuIEVuY29kZWQgYXMgYmFzZTY0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNlYXJjaEltYWdlID0gc2VhcmNoSW1hZ2U7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIGZsb2F0IG1pZGRsZUdyZXk7XFxyXFxudW5pZm9ybSBmbG9hdCBtYXhMdW1pbmFuY2U7XFxyXFxuXFxyXFxuI2lmZGVmIEFEQVBURURfTFVNSU5BTkNFXFxyXFxuXFxyXFxuXFx0dW5pZm9ybSBzYW1wbGVyMkQgbHVtaW5hbmNlTWFwO1xcclxcblxcclxcbiNlbHNlXFxyXFxuXFxyXFxuXFx0dW5pZm9ybSBmbG9hdCBhdmVyYWdlTHVtaW5hbmNlO1xcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxuY29uc3QgdmVjMyBMVU1fQ09FRkYgPSB2ZWMzKDAuMjk5LCAwLjU4NywgMC4xMTQpO1xcclxcbmNvbnN0IHZlYzIgQ0VOVEVSID0gdmVjMigwLjUsIDAuNSk7XFxyXFxuXFxyXFxudmVjMyB0b25lTWFwKHZlYzMgYykge1xcclxcblxcclxcblxcdCNpZmRlZiBBREFQVEVEX0xVTUlOQU5DRVxcclxcblxcclxcblxcdFxcdC8vIEdldCB0aGUgY2FsY3VsYXRlZCBhdmVyYWdlIGx1bWluYW5jZS5cXHJcXG5cXHRcXHRmbG9hdCBsdW1BdmcgPSB0ZXh0dXJlMkQobHVtaW5hbmNlTWFwLCBDRU5URVIpLnI7XFxyXFxuXFxyXFxuXFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBsdW1BdmcgPSBhdmVyYWdlTHVtaW5hbmNlO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdC8vIENhbGN1bGF0ZSB0aGUgbHVtaW5hbmNlIG9mIHRoZSBjdXJyZW50IHBpeGVsLlxcclxcblxcdGZsb2F0IGx1bVBpeGVsID0gZG90KGMsIExVTV9DT0VGRik7XFxyXFxuXFxyXFxuXFx0Ly8gQXBwbHkgdGhlIG1vZGlmaWVkIG9wZXJhdG9yIChSZWluaGFyZCBFcS4gNCkuXFxyXFxuXFx0ZmxvYXQgbHVtU2NhbGVkID0gKGx1bVBpeGVsICogbWlkZGxlR3JleSkgLyBsdW1Bdmc7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgbHVtQ29tcHJlc3NlZCA9IChsdW1TY2FsZWQgKiAoMS4wICsgKGx1bVNjYWxlZCAvIChtYXhMdW1pbmFuY2UgKiBtYXhMdW1pbmFuY2UpKSkpIC8gKDEuMCArIGx1bVNjYWxlZCk7XFxyXFxuXFxyXFxuXFx0cmV0dXJuIGx1bUNvbXByZXNzZWQgKiBjO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KHRvbmVNYXAodGV4ZWwucmdiKSwgdGV4ZWwuYSk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEZ1bGwtc2NyZWVuIHRvbmUtbWFwcGluZyBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIFJlZmVyZW5jZTpcclxuICogIGh0dHA6Ly93d3cuY2lzLnJpdC5lZHUvcGVvcGxlL2ZhY3VsdHkvZmVyd2VyZGEvcHVibGljYXRpb25zL3NpZzAyX3BhcGVyLnBkZlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBUb25lTWFwcGluZ01hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHRvbmUgbWFwcGluZyBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJUb25lTWFwcGluZ01hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0bHVtaW5hbmNlTWFwOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRhdmVyYWdlTHVtaW5hbmNlOiBuZXcgVW5pZm9ybSgxLjApLFxyXG5cdFx0XHRcdG1heEx1bWluYW5jZTogbmV3IFVuaWZvcm0oMTYuMCksXHJcblx0XHRcdFx0bWlkZGxlR3JleTogbmV3IFVuaWZvcm0oMC42KVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hhZGVyIG1hdGVyaWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwb3N0IHByb2Nlc3NpbmcgcGFzc2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL21hdGVyaWFsc1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsIH0gZnJvbSBcIi4vYWRhcHRpdmUtbHVtaW5vc2l0eS5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaE1hdGVyaWFsIH0gZnJvbSBcIi4vYm9rZWguanNcIjtcclxuZXhwb3J0IHsgQm9rZWgyTWF0ZXJpYWwgfSBmcm9tIFwiLi9ib2tlaDIuanNcIjtcclxuZXhwb3J0IHsgQ29tYmluZU1hdGVyaWFsIH0gZnJvbSBcIi4vY29tYmluZS5qc1wiO1xyXG5leHBvcnQgeyBDb252b2x1dGlvbk1hdGVyaWFsLCBLZXJuZWxTaXplIH0gZnJvbSBcIi4vY29udm9sdXRpb24uanNcIjtcclxuZXhwb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4vY29weS5qc1wiO1xyXG5leHBvcnQgeyBEZXB0aE1hdGVyaWFsIH0gZnJvbSBcIi4vZGVwdGguanNcIjtcclxuZXhwb3J0IHsgRG90U2NyZWVuTWF0ZXJpYWwgfSBmcm9tIFwiLi9kb3Qtc2NyZWVuLmpzXCI7XHJcbmV4cG9ydCB7IEZpbG1NYXRlcmlhbCB9IGZyb20gXCIuL2ZpbG0uanNcIjtcclxuZXhwb3J0IHsgR2xpdGNoTWF0ZXJpYWwgfSBmcm9tIFwiLi9nbGl0Y2guanNcIjtcclxuZXhwb3J0IHsgR29kUmF5c01hdGVyaWFsIH0gZnJvbSBcIi4vZ29kLXJheXMuanNcIjtcclxuZXhwb3J0IHsgTHVtaW5vc2l0eU1hdGVyaWFsIH0gZnJvbSBcIi4vbHVtaW5vc2l0eS5qc1wiO1xyXG5leHBvcnQgeyBQaXhlbGF0aW9uTWF0ZXJpYWwgfSBmcm9tIFwiLi9waXhlbGF0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IFNob2NrV2F2ZU1hdGVyaWFsIH0gZnJvbSBcIi4vc2hvY2std2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTTUFBQmxlbmRNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtYmxlbmQuanNcIjtcclxuZXhwb3J0IHsgU01BQUNvbG9yRWRnZXNNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtY29sb3ItZWRnZXMuanNcIjtcclxuZXhwb3J0IHsgU01BQVdlaWdodHNNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtd2VpZ2h0cy5qc1wiO1xyXG5leHBvcnQgeyBUb25lTWFwcGluZ01hdGVyaWFsIH0gZnJvbSBcIi4vdG9uZS1tYXBwaW5nLmpzXCI7XHJcbiIsImltcG9ydCB7IFNjZW5lLCBNZXNoLCBPcnRob2dyYXBoaWNDYW1lcmEsIFBsYW5lQnVmZmVyR2VvbWV0cnkgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBhYnN0cmFjdCBwYXNzLlxyXG4gKlxyXG4gKiBQYXNzZXMgdGhhdCBkbyBub3QgcmVseSBvbiB0aGUgZGVwdGggYnVmZmVyIHNob3VsZCBleHBsaWNpdGx5IGRpc2FibGUgdGhlXHJcbiAqIGRlcHRoIHRlc3QgYW5kIGRlcHRoIHdyaXRlIGluIHRoZWlyIHJlc3BlY3RpdmUgc2hhZGVyIG1hdGVyaWFscy5cclxuICpcclxuICogVGhpcyBjbGFzcyBpbXBsZW1lbnRzIGEge0BsaW5rIFBhc3MjZGlzcG9zZX0gbWV0aG9kIHRoYXQgZnJlZXMgbWVtb3J5IG9uXHJcbiAqIGRlbWFuZC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IFtzY2VuZV0gLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBbY2FtZXJhXSAtIFRoZSBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtNZXNofSBbcXVhZF0gLSBBIHF1YWQgdGhhdCBmaWxscyB0aGUgc2NyZWVuIHRvIHJlbmRlciAyRCBmaWx0ZXIgZWZmZWN0cy4gU2V0IHRoaXMgdG8gbnVsbCwgaWYgeW91IGRvbid0IG5lZWQgaXQgKHNlZSB7QGxpbmsgUmVuZGVyUGFzc30pLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHNjZW5lID0gbmV3IFNjZW5lKCksXHJcblx0XHRjYW1lcmEgPSBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAxLCAtMSwgMCwgMSksXHJcblx0XHRxdWFkID0gbmV3IE1lc2gobmV3IFBsYW5lQnVmZmVyR2VvbWV0cnkoMiwgMiksIG51bGwpXHJcblx0KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2NlbmV9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgU2NlbmUoKVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGNhbWVyYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q2FtZXJhfVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgMSwgLTEsIDAsIDEpXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcXVhZCBtZXNoIHRoYXQgZmlsbHMgdGhlIHNjcmVlbi5cclxuXHRcdCAqXHJcblx0XHQgKiBBc3NpZ24geW91ciBzaGFkZXIgbWF0ZXJpYWwgdG8gdGhpcyBtZXNoIVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtNZXNofVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IE1lc2gobmV3IFBsYW5lQnVmZmVyR2VvbWV0cnkoMiwgMiksIG51bGwpXHJcblx0XHQgKiBAZXhhbXBsZSB0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm15TWF0ZXJpYWw7XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnF1YWQgPSBxdWFkO1xyXG5cclxuXHRcdGlmKHRoaXMucXVhZCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5xdWFkLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmKHRoaXMuc2NlbmUgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zY2VuZS5hZGQodGhpcy5xdWFkKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycyBzaG91bGQgYmUgc3dhcHBlZCBhZnRlciB0aGlzXHJcblx0XHQgKiBwYXNzIGhhcyBmaW5pc2hlZCByZW5kZXJpbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogU2V0IHRoaXMgdG8gdHJ1ZSBpZiB0aGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyIHNvIHRoYXQgYVxyXG5cdFx0ICogZm9sbG93aW5nIHBhc3MgY2FuIGZpbmQgdGhlIHJlc3VsdCBpbiB0aGUgcmVhZCBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVuYWJsZWQgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW5kZXIgdG8gc2NyZWVuIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUb1NjcmVlbiA9IGZhbHNlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIFRoaXMgaXMgYW4gYWJzdHJhY3QgbWV0aG9kIHRoYXQgbXVzdCBiZSBvdmVycmlkZGVuLlxyXG5cdCAqXHJcblx0ICogQGFic3RyYWN0XHJcblx0ICogQHRocm93cyB7RXJyb3J9IEFuIGVycm9yIGlzIHRocm93biBpZiB0aGUgbWV0aG9kIGlzIG5vdCBvdmVycmlkZGVuLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIEEgcmVhZCBidWZmZXIuIENvbnRhaW5zIHRoZSByZXN1bHQgb2YgdGhlIHByZXZpb3VzIHBhc3MuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBBIHdyaXRlIGJ1ZmZlci4gTm9ybWFsbHkgdXNlZCBhcyB0aGUgcmVuZGVyIHRhcmdldCB3aGVuIHRoZSByZWFkIGJ1ZmZlciBpcyB1c2VkIGFzIGlucHV0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsdGFdIC0gVGhlIGRlbHRhIHRpbWUuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbbWFza0FjdGl2ZV0gLSBJbmRpY2F0ZXMgd2hldGhlciBhIHN0ZW5jaWwgdGVzdCBtYXNrIGlzIGFjdGl2ZSBvciBub3QuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlKSB7XHJcblxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiUmVuZGVyIG1ldGhvZCBub3QgaW1wbGVtZW50ZWQhXCIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIFlvdSBtYXkgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4gY2FzZSB5b3Ugd2FudCB0byBiZSBpbmZvcm1lZCBhYm91dCB0aGUgbWFpblxyXG5cdCAqIHJlbmRlciBzaXplLlxyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2QgYmVmb3JlIHRoaXMgcGFzcyBpc1xyXG5cdCAqIGluaXRpYWxpc2VkIGFuZCBldmVyeSB0aW1lIGl0cyBvd24gc2l6ZSBpcyB1cGRhdGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHJlbmRlcmVyJ3Mgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSByZW5kZXJlcidzIGhlaWdodC5cclxuXHQgKiBAZXhhbXBsZSB0aGlzLm15UmVuZGVyVGFyZ2V0LnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge31cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgaW5pdGlhbGlzYXRpb24gdGFza3MuXHJcblx0ICpcclxuXHQgKiBCeSBvdmVycmlkaW5nIHRoaXMgbWV0aG9kIHlvdSBnYWluIGFjY2VzcyB0byB0aGUgcmVuZGVyZXIuIFlvdSdsbCBhbHNvIGJlXHJcblx0ICogYWJsZSB0byBjb25maWd1cmUgeW91ciBjdXN0b20gcmVuZGVyIHRhcmdldHMgdG8gdXNlIHRoZSBhcHByb3ByaWF0ZSBmb3JtYXRcclxuXHQgKiAoUkdCIG9yIFJHQkEpLlxyXG5cdCAqXHJcblx0ICogVGhlIHByb3ZpZGVkIHJlbmRlcmVyIGNhbiBiZSB1c2VkIHRvIHdhcm0gdXAgc3BlY2lhbCBvZmYtc2NyZWVuIHJlbmRlclxyXG5cdCAqIHRhcmdldHMgYnkgcGVyZm9ybWluZyBhIHByZWxpbWluYXJ5IHJlbmRlciBvcGVyYXRpb24uXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIHRoaXMgcGFzcyBpcyBhZGRlZCB0byBpdHNcclxuXHQgKiBxdWV1ZS5cclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgaW5pdGlhbGlzZVxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBhbHBoYSAtIFdoZXRoZXIgdGhlIHJlbmRlcmVyIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwgb3Igbm90LlxyXG5cdCAqIEBleGFtcGxlIGlmKCFhbHBoYSkgeyB0aGlzLm15UmVuZGVyVGFyZ2V0LnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0OyB9XHJcblx0ICovXHJcblxyXG5cdGluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtcyBhIHNoYWxsb3cgc2VhcmNoIGZvciBwcm9wZXJ0aWVzIHRoYXQgZGVmaW5lIGEgZGlzcG9zZSBtZXRob2QgYW5kXHJcblx0ICogZGVsZXRlcyB0aGVtLiBUaGUgcGFzcyB3aWxsIGJlIGlub3BlcmF0aXZlIGFmdGVyIHRoaXMgbWV0aG9kIHdhcyBjYWxsZWQhXHJcblx0ICpcclxuXHQgKiBEaXNwb3NhYmxlIG9iamVjdHM6XHJcblx0ICogIC0gcmVuZGVyIHRhcmdldHNcclxuXHQgKiAgLSBtYXRlcmlhbHNcclxuXHQgKiAgLSB0ZXh0dXJlc1xyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiBpdCBpcyBiZWluZyBkZXN0cm95ZWQuXHJcblx0ICogWW91IG1heSwgaG93ZXZlciwgdXNlIGl0IGluZGVwZW5kZW50bHkgdG8gZnJlZSBtZW1vcnkgd2hlbiB5b3UgYXJlIGNlcnRhaW5cclxuXHQgKiB0aGF0IHlvdSBkb24ndCBuZWVkIHRoaXMgcGFzcyBhbnltb3JlLlxyXG5cdCAqL1xyXG5cclxuXHRkaXNwb3NlKCkge1xyXG5cclxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcclxuXHJcblx0XHRsZXQga2V5O1xyXG5cclxuXHRcdGZvcihrZXkgb2Yga2V5cykge1xyXG5cclxuXHRcdFx0aWYodGhpc1trZXldICE9PSBudWxsICYmIHR5cGVvZiB0aGlzW2tleV0uZGlzcG9zZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblxyXG5cdFx0XHRcdHRoaXNba2V5XS5kaXNwb3NlKCk7XHJcblx0XHRcdFx0dGhpc1trZXldID0gbnVsbDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTGluZWFyRmlsdGVyLCBSR0JGb3JtYXQsIFdlYkdMUmVuZGVyVGFyZ2V0IH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IENvbnZvbHV0aW9uTWF0ZXJpYWwsIEtlcm5lbFNpemUgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBibHVyIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEJsdXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgYmx1ciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZXNvbHV0aW9uU2NhbGU9MC41XSAtIFRoZSByZW5kZXIgdGV4dHVyZSByZXNvbHV0aW9uIHNjYWxlLCByZWxhdGl2ZSB0byB0aGUgc2NyZWVuIHJlbmRlciBzaXplLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5rZXJuZWxTaXplPUtlcm5lbFNpemUuTEFSR0VdIC0gVGhlIGJsdXIga2VybmVsIHNpemUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkJsdXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSByZW5kZXIgdGFyZ2V0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFggPSBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoMSwgMSwge1xyXG5cdFx0XHRtaW5GaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0bWFnRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WC50ZXh0dXJlLm5hbWUgPSBcIkJsdXIuVGFyZ2V0WFwiO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRYLnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHNlY29uZCByZW5kZXIgdGFyZ2V0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFkgPSB0aGlzLnJlbmRlclRhcmdldFguY2xvbmUoKTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFkudGV4dHVyZS5uYW1lID0gXCJCbHVyLlRhcmdldFlcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZXNvbHV0aW9uIHNjYWxlLlxyXG5cdFx0ICpcclxuXHRcdCAqIFlvdSBuZWVkIHRvIGNhbGwge0BsaW5rIEVmZmVjdENvbXBvc2VyI3NldFNpemV9IGFmdGVyIGNoYW5naW5nIHRoaXNcclxuXHRcdCAqIHZhbHVlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAwLjVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVzb2x1dGlvblNjYWxlID0gKG9wdGlvbnMucmVzb2x1dGlvblNjYWxlICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5yZXNvbHV0aW9uU2NhbGUgOiAwLjU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvbnZvbHV0aW9uIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29udm9sdXRpb25NYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvbnZvbHV0aW9uTWF0ZXJpYWwgPSBuZXcgQ29udm9sdXRpb25NYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMua2VybmVsU2l6ZSA9IG9wdGlvbnMua2VybmVsU2l6ZTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLmNvbnZvbHV0aW9uTWF0ZXJpYWw7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBpbnRlcm5hbCByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMucmVuZGVyVGFyZ2V0WC53aWR0aDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYWJzb2x1dGUgaGVpZ2h0IG9mIHRoZSBpbnRlcm5hbCByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdGdldCBoZWlnaHQoKSB7IHJldHVybiB0aGlzLnJlbmRlclRhcmdldFguaGVpZ2h0OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBrZXJuZWwgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtLZXJuZWxTaXplfVxyXG5cdCAqIEBkZWZhdWx0IEtlcm5lbFNpemUuTEFSR0VcclxuXHQgKi9cclxuXHJcblx0Z2V0IGtlcm5lbFNpemUoKSB7IHJldHVybiB0aGlzLmNvbnZvbHV0aW9uTWF0ZXJpYWwua2VybmVsU2l6ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBAdHlwZSB7S2VybmVsU2l6ZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IGtlcm5lbFNpemUoeCA9IEtlcm5lbFNpemUuTEFSR0UpIHsgdGhpcy5jb252b2x1dGlvbk1hdGVyaWFsLmtlcm5lbFNpemUgPSB4OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJsdXJzIHRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuXHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXRYID0gdGhpcy5yZW5kZXJUYXJnZXRYO1xyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0WSA9IHRoaXMucmVuZGVyVGFyZ2V0WTtcclxuXHJcblx0XHRjb25zdCBtYXRlcmlhbCA9IHRoaXMuY29udm9sdXRpb25NYXRlcmlhbDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gbWF0ZXJpYWwudW5pZm9ybXM7XHJcblx0XHRjb25zdCBrZXJuZWwgPSBtYXRlcmlhbC5nZXRLZXJuZWwoKTtcclxuXHJcblx0XHRsZXQgbGFzdFJUID0gcmVhZEJ1ZmZlcjtcclxuXHRcdGxldCBkZXN0UlQ7XHJcblx0XHRsZXQgaSwgbDtcclxuXHJcblx0XHQvLyBBcHBseSB0aGUgbXVsdGktcGFzcyBibHVyLlxyXG5cdFx0Zm9yKGkgPSAwLCBsID0ga2VybmVsLmxlbmd0aCAtIDE7IGkgPCBsOyArK2kpIHtcclxuXHJcblx0XHRcdC8vIEFsdGVybmF0ZSBiZXR3ZWVuIHRhcmdldHMuXHJcblx0XHRcdGRlc3RSVCA9ICgoaSAlIDIpID09PSAwKSA/IHJlbmRlclRhcmdldFggOiByZW5kZXJUYXJnZXRZO1xyXG5cclxuXHRcdFx0dW5pZm9ybXMua2VybmVsLnZhbHVlID0ga2VybmVsW2ldO1xyXG5cdFx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IGxhc3RSVC50ZXh0dXJlO1xyXG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgZGVzdFJUKTtcclxuXHJcblx0XHRcdGxhc3RSVCA9IGRlc3RSVDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dW5pZm9ybXMua2VybmVsLnZhbHVlID0ga2VybmVsW2ldO1xyXG5cdFx0dW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSBsYXN0UlQudGV4dHVyZTtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBmb3JtYXQgb2YgdGhlIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFscGhhIC0gV2hldGhlciB0aGUgcmVuZGVyZXIgdXNlcyB0aGUgYWxwaGEgY2hhbm5lbCBvciBub3QuXHJcblx0ICovXHJcblxyXG5cdGluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKSB7XHJcblxyXG5cdFx0aWYoIWFscGhhKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlclRhcmdldFgudGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7XHJcblx0XHRcdHRoaXMucmVuZGVyVGFyZ2V0WS50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR3aWR0aCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3Iod2lkdGggKiB0aGlzLnJlc29sdXRpb25TY2FsZSkpO1xyXG5cdFx0aGVpZ2h0ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihoZWlnaHQgKiB0aGlzLnJlc29sdXRpb25TY2FsZSkpO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WC5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRZLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0dGhpcy5jb252b2x1dGlvbk1hdGVyaWFsLnNldFRleGVsU2l6ZSgxLjAgLyB3aWR0aCwgMS4wIC8gaGVpZ2h0KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBMaW5lYXJGaWx0ZXIsIFJHQkZvcm1hdCwgV2ViR0xSZW5kZXJUYXJnZXQgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgQ29tYmluZU1hdGVyaWFsLCBLZXJuZWxTaXplLCBMdW1pbm9zaXR5TWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IEJsdXJQYXNzIH0gZnJvbSBcIi4vYmx1ci5qc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgYmxvb20gcGFzcy5cclxuICpcclxuICogVGhpcyBwYXNzIHJlbmRlcnMgYSBzY2VuZSB3aXRoIHN1cGVyaW1wb3NlZCBibHVyIGJ5IHV0aWxpc2luZyB0aGUgZmFzdCBLYXdhc2VcclxuICogY29udm9sdXRpb24gYXBwcm9hY2guXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEJsb29tUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGJsb29tIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlc29sdXRpb25TY2FsZT0wLjVdIC0gVGhlIHJlbmRlciB0ZXh0dXJlIHJlc29sdXRpb24gc2NhbGUsIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW4gcmVuZGVyIHNpemUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmtlcm5lbFNpemU9S2VybmVsU2l6ZS5MQVJHRV0gLSBUaGUgYmx1ciBrZXJuZWwgc2l6ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaW50ZW5zaXR5PTEuMF0gLSBUaGUgc3RyZW5ndGggb2YgdGhlIGJsb29tIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGlzdGluY3Rpb249MS4wXSAtIFRoZSBsdW1pbmFuY2UgZGlzdGluY3Rpb24gZmFjdG9yLiBSYWlzZSB0aGlzIHZhbHVlIHRvIGJyaW5nIG91dCB0aGUgYnJpZ2h0ZXIgZWxlbWVudHMgaW4gdGhlIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY3JlZW5Nb2RlPXRydWVdIC0gV2hldGhlciB0aGUgc2NyZWVuIGJsZW5kIG1vZGUgc2hvdWxkIGJlIHVzZWQgZm9yIGNvbWJpbmluZyB0aGUgYmxvb20gdGV4dHVyZSB3aXRoIHRoZSBzY2VuZSBjb2xvcnMuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkJsb29tUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgYmx1ciBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCbHVyUGFzc31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmJsdXJQYXNzID0gbmV3IEJsdXJQYXNzKG9wdGlvbnMpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSByZW5kZXIgdGFyZ2V0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldCA9IG5ldyBXZWJHTFJlbmRlclRhcmdldCgxLCAxLCB7XHJcblx0XHRcdG1pbkZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRtYWdGaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0c3RlbmNpbEJ1ZmZlcjogZmFsc2UsXHJcblx0XHRcdGRlcHRoQnVmZmVyOiBmYWxzZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXQudGV4dHVyZS5uYW1lID0gXCJCbG9vbS5UYXJnZXRcIjtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0LnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvbWJpbmUgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb21iaW5lTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb21iaW5lTWF0ZXJpYWwgPSBuZXcgQ29tYmluZU1hdGVyaWFsKChvcHRpb25zLnNjcmVlbk1vZGUgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnNjcmVlbk1vZGUgOiB0cnVlKTtcclxuXHJcblx0XHR0aGlzLmludGVuc2l0eSA9IG9wdGlvbnMuaW50ZW5zaXR5O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBsdW1pbm9zaXR5IHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7THVtaW5vc2l0eU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubHVtaW5vc2l0eU1hdGVyaWFsID0gbmV3IEx1bWlub3NpdHlNYXRlcmlhbCh0cnVlKTtcclxuXHJcblx0XHR0aGlzLmRpc3RpbmN0aW9uID0gb3B0aW9ucy5kaXN0aW5jdGlvbjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVzb2x1dGlvbiBzY2FsZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICogQGRlZmF1bHQgMC41XHJcblx0ICovXHJcblxyXG5cdGdldCByZXNvbHV0aW9uU2NhbGUoKSB7IHJldHVybiB0aGlzLmJsdXJQYXNzLnJlc29sdXRpb25TY2FsZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBZb3UgbmVlZCB0byBjYWxsIHtAbGluayBFZmZlY3RDb21wb3NlciNzZXRTaXplfSBhZnRlciBjaGFuZ2luZyB0aGlzIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IHJlc29sdXRpb25TY2FsZSh4ID0gMC41KSB7IHRoaXMuYmx1clBhc3MucmVzb2x1dGlvblNjYWxlID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmx1ciBrZXJuZWwgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtLZXJuZWxTaXplfVxyXG5cdCAqIEBkZWZhdWx0IEtlcm5lbFNpemUuTEFSR0VcclxuXHQgKi9cclxuXHJcblx0Z2V0IGtlcm5lbFNpemUoKSB7IHJldHVybiB0aGlzLmJsdXJQYXNzLmtlcm5lbFNpemU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0ICovXHJcblxyXG5cdHNldCBrZXJuZWxTaXplKHggPSBLZXJuZWxTaXplLkxBUkdFKSB7IHRoaXMuYmx1clBhc3Mua2VybmVsU2l6ZSA9IHg7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG92ZXJhbGwgaW50ZW5zaXR5IG9mIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqIEBkZWZhdWx0IDEuMFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgaW50ZW5zaXR5KCkgeyByZXR1cm4gdGhpcy5jb21iaW5lTWF0ZXJpYWwudW5pZm9ybXMub3BhY2l0eTIudmFsdWU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IGludGVuc2l0eSh4ID0gMS4wKSB7IHRoaXMuY29tYmluZU1hdGVyaWFsLnVuaWZvcm1zLm9wYWNpdHkyLnZhbHVlID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbHVtaW5hbmNlIGRpc3RpbmN0aW9uIGZhY3Rvci5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICogQGRlZmF1bHQgMS4wXHJcblx0ICovXHJcblxyXG5cdGdldCBkaXN0aW5jdGlvbigpIHsgcmV0dXJuIHRoaXMubHVtaW5vc2l0eU1hdGVyaWFsLnVuaWZvcm1zLmRpc3RpbmN0aW9uLnZhbHVlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdHNldCBkaXN0aW5jdGlvbih4ID0gMS4wKSB7IHRoaXMubHVtaW5vc2l0eU1hdGVyaWFsLnVuaWZvcm1zLmRpc3RpbmN0aW9uLnZhbHVlID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBFeHRyYWN0cyBhIGx1bWluYW5jZSBtYXAgZnJvbSB0aGUgcmVhZCBidWZmZXIsIGJsdXJzIGl0IGFuZCBjb21iaW5lcyBpdFxyXG5cdCAqIHdpdGggdGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IHF1YWQgPSB0aGlzLnF1YWQ7XHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuXHRcdGNvbnN0IGJsdXJQYXNzID0gdGhpcy5ibHVyUGFzcztcclxuXHJcblx0XHRjb25zdCBsdW1pbm9zaXR5TWF0ZXJpYWwgPSB0aGlzLmx1bWlub3NpdHlNYXRlcmlhbDtcclxuXHRcdGNvbnN0IGNvbWJpbmVNYXRlcmlhbCA9IHRoaXMuY29tYmluZU1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0ID0gdGhpcy5yZW5kZXJUYXJnZXQ7XHJcblxyXG5cdFx0Ly8gTHVtaW5hbmNlIGZpbHRlci5cclxuXHRcdHF1YWQubWF0ZXJpYWwgPSBsdW1pbm9zaXR5TWF0ZXJpYWw7XHJcblx0XHRsdW1pbm9zaXR5TWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0KTtcclxuXHJcblx0XHQvLyBDb252b2x1dGlvbiBwaGFzZS5cclxuXHRcdGJsdXJQYXNzLnJlbmRlcihyZW5kZXJlciwgcmVuZGVyVGFyZ2V0LCByZW5kZXJUYXJnZXQpO1xyXG5cclxuXHRcdC8vIFJlbmRlciB0aGUgb3JpZ2luYWwgc2NlbmUgd2l0aCBzdXBlcmltcG9zZWQgYmx1ci5cclxuXHRcdHF1YWQubWF0ZXJpYWwgPSBjb21iaW5lTWF0ZXJpYWw7XHJcblx0XHRjb21iaW5lTWF0ZXJpYWwudW5pZm9ybXMudGV4dHVyZTEudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHRjb21iaW5lTWF0ZXJpYWwudW5pZm9ybXMudGV4dHVyZTIudmFsdWUgPSByZW5kZXJUYXJnZXQudGV4dHVyZTtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRqdXN0cyB0aGUgZm9ybWF0IG9mIHRoZSByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBhbHBoYSAtIFdoZXRoZXIgdGhlIHJlbmRlcmVyIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwgb3Igbm90LlxyXG5cdCAqL1xyXG5cclxuXHRpbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSkge1xyXG5cclxuXHRcdHRoaXMuYmx1clBhc3MuaW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpO1xyXG5cclxuXHRcdGlmKCFhbHBoYSkgeyB0aGlzLnJlbmRlclRhcmdldC50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDsgfVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0dGhpcy5ibHVyUGFzcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdHdpZHRoID0gdGhpcy5ibHVyUGFzcy53aWR0aDtcclxuXHRcdGhlaWdodCA9IHRoaXMuYmx1clBhc3MuaGVpZ2h0O1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0LnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQm9rZWhNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIERlcHRoIG9mIEZpZWxkIChEb0YpIHBhc3MgdXNpbmcgYSBib2tlaCBzaGFkZXIuXHJcbiAqXHJcbiAqIFRoaXMgcGFzcyByZXF1aXJlcyBhIHtAbGluayBFZmZlY3RDb21wb3NlciNkZXB0aFRleHR1cmV9LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2tlaFBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBib2tlaCBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQZXJzcGVjdGl2ZUNhbWVyYX0gY2FtZXJhIC0gVGhlIG1haW4gY2FtZXJhLiBVc2VkIHRvIG9idGFpbiB0aGUgYXNwZWN0IHJhdGlvIGFuZCB0aGUgbmVhciBhbmQgZmFyIHBsYW5lIHNldHRpbmdzLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZvY3VzPTEuMF0gLSBGb2N1cyBkaXN0YW5jZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYXBlcnR1cmU9MC4wMjVdIC0gQ2FtZXJhIGFwZXJ0dXJlIHNjYWxlLiBCaWdnZXIgdmFsdWVzIGZvciBzaGFsbG93ZXIgZGVwdGggb2YgZmllbGQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heEJsdXI9MS4wXSAtIE1heGltdW0gYmx1ciBzdHJlbmd0aC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJCb2tlaFBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGJva2VoIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9rZWhNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmJva2VoTWF0ZXJpYWwgPSBuZXcgQm9rZWhNYXRlcmlhbChjYW1lcmEsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuYm9rZWhNYXRlcmlhbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0dGhpcy5ib2tlaE1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dGhpcy5ib2tlaE1hdGVyaWFsLnVuaWZvcm1zLnREZXB0aC52YWx1ZSA9IHJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLmJva2VoTWF0ZXJpYWwudW5pZm9ybXMuYXNwZWN0LnZhbHVlID0gd2lkdGggLyBoZWlnaHQ7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQm9rZWgyTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQW4gYWR2YW5jZWQgRGVwdGggb2YgRmllbGQgKERvRikgcGFzcy5cclxuICpcclxuICogWWllbGRzIG1vcmUgcmVhbGlzdGljIHJlc3VsdHMgYnV0IGlzIGFsc28gbW9yZSBkZW1hbmRpbmcuXHJcbiAqXHJcbiAqIFRoaXMgcGFzcyByZXF1aXJlcyBhIHtAbGluayBFZmZlY3RDb21wb3NlciNkZXB0aFRleHR1cmV9LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2tlaDJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgYm9rZWgyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1BlcnNwZWN0aXZlQ2FtZXJhfSBjYW1lcmEgLSBUaGUgbWFpbiBjYW1lcmEuIFVzZWQgdG8gb2J0YWluIHRoZSBmb2NhbCBsZW5ndGggYW5kIHRoZSBuZWFyIGFuZCBmYXIgcGxhbmUgc2V0dGluZ3MuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmluZ3M9M10gLSBUaGUgYW1vdW50IG9mIGJsdXIgcmluZ3MuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNhbXBsZXM9NF0gLSBUaGUgYW1vdW50IG9mIHNhbXBsZXMgcGVyIHJpbmcuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zaG93Rm9jdXM9ZmFsc2VdIC0gV2hldGhlciB0aGUgZm9jdXMgcG9pbnQgc2hvdWxkIGJlIGhpZ2hsaWdodGVkLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFudWFsRG9GPWZhbHNlXSAtIEVuYWJsZXMgbWFudWFsIGRlcHRoIG9mIGZpZWxkIGJsdXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy52aWduZXR0ZT1mYWxzZV0gLSBFbmFibGVzIGEgdmlnbmV0dGUgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucGVudGFnb249ZmFsc2VdIC0gRW5hYmxlIHRvIHVzZSBhIHBlbnRhZ29uYWwgc2hhcGUgdG8gc2NhbGUgZ2F0aGVyZWQgdGV4ZWxzLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2hhZGVyRm9jdXM9dHJ1ZV0gLSBEaXNhYmxlIGlmIHlvdSBjb21wdXRlIHlvdXIgb3duIGZvY2FsRGVwdGggKGluIG1ldHJlcyEpLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubm9pc2U9dHJ1ZV0gLSBEaXNhYmxlIGlmIHlvdSBkb24ndCB3YW50IG5vaXNlIHBhdHRlcm5zIGZvciBkaXRoZXJpbmcuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhbWVyYSwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQm9rZWgyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgYm9rZWggc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb2tlaE1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYm9rZWhNYXRlcmlhbCA9IG5ldyBCb2tlaDJNYXRlcmlhbChjYW1lcmEsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuYm9rZWhNYXRlcmlhbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0dGhpcy5ib2tlaE1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dGhpcy5ib2tlaE1hdGVyaWFsLnVuaWZvcm1zLnREZXB0aC52YWx1ZSA9IHJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLmJva2VoTWF0ZXJpYWwuc2V0VGV4ZWxTaXplKDEuMCAvIHdpZHRoLCAxLjAgLyBoZWlnaHQpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogVXNlZCBmb3Igc2F2aW5nIHRoZSBvcmlnaW5hbCBjbGVhciBjb2xvciBvZiB0aGUgcmVuZGVyZXIuXHJcbiAqXHJcbiAqIEB0eXBlIENvbG9yXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICovXHJcblxyXG5jb25zdCBjb2xvciA9IG5ldyBDb2xvcigpO1xyXG5cclxuLyoqXHJcbiAqIEEgY2xlYXIgcGFzcy5cclxuICpcclxuICogWW91IGNhbiBwcmV2ZW50IHNwZWNpZmljIGJ1ZmZlcnMgZnJvbSBiZWluZyBjbGVhcmVkIGJ5IHNldHRpbmcgZWl0aGVyIHRoZVxyXG4gKiBhdXRvQ2xlYXJDb2xvciwgYXV0b0NsZWFyU3RlbmNpbCBvciBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlclxyXG4gKiB0byBmYWxzZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY2xlYXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTAuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkNsZWFyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXIgY29sb3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvbG9yfVxyXG5cdFx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckNvbG9yID0gKG9wdGlvbnMuY2xlYXJDb2xvciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJDb2xvciA6IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhciBhbHBoYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQGRlZmF1bHQgMC4wXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyQWxwaGEgPSAob3B0aW9ucy5jbGVhckFscGhhICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckFscGhhIDogMC4wO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgcmVhZCBidWZmZXIgb3IgdGhlIHNjcmVlbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgY2xlYXJDb2xvciA9IHRoaXMuY2xlYXJDb2xvcjtcclxuXHJcblx0XHRsZXQgY2xlYXJBbHBoYTtcclxuXHJcblx0XHRpZihjbGVhckNvbG9yICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRjb2xvci5jb3B5KHJlbmRlcmVyLmdldENsZWFyQ29sb3IoKSk7XHJcblx0XHRcdGNsZWFyQWxwaGEgPSByZW5kZXJlci5nZXRDbGVhckFscGhhKCk7XHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY2xlYXJDb2xvciwgdGhpcy5jbGVhckFscGhhKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcik7XHJcblx0XHRyZW5kZXJlci5jbGVhcigpO1xyXG5cclxuXHRcdGlmKGNsZWFyQ29sb3IgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY29sb3IsIGNsZWFyQWxwaGEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IGRpc2FibGVzIHRoZSBzdGVuY2lsIG1hc2suXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjbGVhciBtYXNrIHBhc3MuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKG51bGwsIG51bGwsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJDbGVhck1hc2tQYXNzXCI7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzYWJsZXMgdGhlIHN0ZW5jaWwgdGVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlcikge1xyXG5cclxuXHRcdHJlbmRlcmVyLnN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRUZXN0KGZhbHNlKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEb3RTY3JlZW5NYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGRvdCBzY3JlZW4gcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRG90U2NyZWVuUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGRvdCBzY3JlZW4gcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYW5nbGU9MS41N10gLSBUaGUgYW5nbGUgb2YgdGhlIHBhdHRlcm4uXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYWxlPTEuMF0gLSBUaGUgc2NhbGUgb2YgdGhlIG92ZXJhbGwgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5pbnRlbnNpdHk9MS4wXSAtIFRoZSBpbnRlbnNpdHkgb2YgdGhlIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmF2ZXJhZ2U9ZmFsc2VdIC0gV2hldGhlciB0aGUgc2hhZGVyIHNob3VsZCBvdXRwdXQgYSBjb2xvdXIgYXZlcmFnZSAoYmxhY2sgYW5kIHdoaXRlKS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiRG90U2NyZWVuUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgZG90IHNjcmVlbiBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0RvdFNjcmVlbk1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBuZXcgRG90U2NyZWVuTWF0ZXJpYWwob3B0aW9ucy5hdmVyYWdlKTtcclxuXHJcblx0XHRpZihvcHRpb25zLmFuZ2xlICE9PSB1bmRlZmluZWQpIHsgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5hbmdsZS52YWx1ZSA9IG9wdGlvbnMuYW5nbGU7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2NhbGUgIT09IHVuZGVmaW5lZCkgeyB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnNjYWxlLnZhbHVlID0gb3B0aW9ucy5zY2FsZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5pbnRlbnNpdHkgIT09IHVuZGVmaW5lZCkgeyB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLmludGVuc2l0eS52YWx1ZSA9IG9wdGlvbnMuaW50ZW5zaXR5OyB9XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR3aWR0aCA9IE1hdGgubWF4KDEsIHdpZHRoKTtcclxuXHRcdGhlaWdodCA9IE1hdGgubWF4KDEsIGhlaWdodCk7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5vZmZzZXRSZXBlYXQudmFsdWUueiA9IHdpZHRoO1xyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5vZmZzZXRSZXBlYXQudmFsdWUudyA9IGhlaWdodDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEZXB0aE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgZGVwdGggcGFzcy5cclxuICpcclxuICogUmVhZHMgdGhlIGRlcHRoIGZyb20gYSBkZXB0aCB0ZXh0dXJlIGFuZCByZW5kZXJzIGl0LlxyXG4gKlxyXG4gKiBUaGlzIHBhc3MgcmVxdWlyZXMgYSB7QGxpbmsgRWZmZWN0Q29tcG9zZXIjZGVwdGhUZXh0dXJlfS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRGVwdGhQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZGVwdGggcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGVyc3BlY3RpdmVDYW1lcmF9IGNhbWVyYSAtIFRoZSBtYWluIGNhbWVyYS4gVXNlZCB0byBvYnRhaW4gdGhlIG5lYXIgYW5kIGZhciBwbGFuZSBzZXR0aW5ncy5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiRGVwdGhQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBkZXB0aCBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0RlcHRoTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5kZXB0aE1hdGVyaWFsID0gbmV3IERlcHRoTWF0ZXJpYWwoY2FtZXJhKTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLmRlcHRoTWF0ZXJpYWw7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdHRoaXMuZGVwdGhNYXRlcmlhbC51bmlmb3Jtcy50RGVwdGgudmFsdWUgPSByZWFkQnVmZmVyLmRlcHRoVGV4dHVyZTtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEZpbG1NYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGZpbG0gcGFzcy5cclxuICpcclxuICogUHJvdmlkZXMgdmFyaW91cyBjaW5lbWF0aWMgZWZmZWN0cy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRmlsbVBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBmaWxtIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuIERpc2FibGVkIGVmZmVjdHMgaGF2ZSBubyBuZWdhdGl2ZSBpbXBhY3Qgb24gcGVyZm9ybWFuY2UuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ncmV5c2NhbGU9ZmFsc2VdIC0gRW5hYmxlIGdyZXlzY2FsZSBlZmZlY3QuIEdyZXlzY2FsZSBhbmQgc2VwaWEgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNlcGlhPWZhbHNlXSAtIEVuYWJsZSBzZXBpYSBlZmZlY3QuIEdyZXlzY2FsZSBhbmQgc2VwaWEgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnZpZ25ldHRlPWZhbHNlXSAtIEFwcGx5IHZpZ25ldHRlIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmVza2lsPWZhbHNlXSAtIFVzZSBFc2tpbCdzIHZpZ25ldHRlIGFwcHJvYWNoLiBUaGUgZGVmYXVsdCBsb29rcyBkdXN0eSB3aGlsZSBFc2tpbCBsb29rcyBtb3JlIGJ1cm5lZCBvdXQuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zY3JlZW5Nb2RlPXRydWVdIC0gV2hldGhlciB0aGUgc2NyZWVuIGJsZW5kIG1vZGUgc2hvdWxkIGJlIHVzZWQgZm9yIG5vaXNlIGFuZCBzY2FubGluZXMuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zY2FubGluZXM9dHJ1ZV0gLSBTaG93IHNjYW5saW5lcy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm5vaXNlPXRydWVdIC0gU2hvdyBub2lzZS1iYXNlZCBmaWxtIGdyYWluLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ub2lzZUludGVuc2l0eT0wLjVdIC0gVGhlIG5vaXNlIGludGVuc2l0eS4gMC4wIHRvIDEuMC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2NhbmxpbmVJbnRlbnNpdHk9MC4wNV0gLSBUaGUgc2NhbmxpbmUgaW50ZW5zaXR5LiAwLjAgdG8gMS4wLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FubGluZURlbnNpdHk9MS4wXSAtIFRoZSBudW1iZXIgb2Ygc2NhbmxpbmVzIGluIHBlcmNlbnQsIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW4gaGVpZ2h0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ncmV5c2NhbGVJbnRlbnNpdHk9MS4wXSAtIFRoZSBpbnRlbnNpdHkgb2YgdGhlIGdyZXlzY2FsZSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNlcGlhSW50ZW5zaXR5PTEuMF0gLSBUaGUgaW50ZW5zaXR5IG9mIHRoZSBzZXBpYSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnZpZ25ldHRlT2Zmc2V0PTEuMF0gLSBUaGUgb2Zmc2V0IG9mIHRoZSB2aWduZXR0ZSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnZpZ25ldHRlRGFya25lc3M9MS4wXSAtIFRoZSBkYXJrbmVzcyBvZiB0aGUgdmlnbmV0dGUgZWZmZWN0LlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJGaWxtUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEZpbG0gc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtGaWxtTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG5ldyBGaWxtTWF0ZXJpYWwob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBhbW91bnQgb2Ygc2NhbmxpbmVzIGluIHBlcmNlbnQsIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW4gaGVpZ2h0LlxyXG5cdFx0ICpcclxuXHRcdCAqIFlvdSBuZWVkIHRvIGNhbGwge0BsaW5rIEVmZmVjdENvbXBvc2VyI3NldFNpemV9IGFmdGVyIGNoYW5naW5nIHRoaXNcclxuXHRcdCAqIHZhbHVlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAxLjI1XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjYW5saW5lRGVuc2l0eSA9IChvcHRpb25zLnNjYW5saW5lRGVuc2l0eSA9PT0gdW5kZWZpbmVkKSA/IDEuMjUgOiBvcHRpb25zLnNjYW5saW5lRGVuc2l0eTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YSAtIFRoZSByZW5kZXIgZGVsdGEgdGltZS5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEpIHtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50aW1lLnZhbHVlICs9IGRlbHRhO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRqdXN0cyB0aGUgc2NhbmxpbmUgY291bnQgdXNpbmcgdGhlIHJlbmRlcmVyJ3MgaGVpZ2h0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnNjYW5saW5lQ291bnQudmFsdWUgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHRoaXMuc2NhbmxpbmVEZW5zaXR5KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEYXRhVGV4dHVyZSwgUkdCRm9ybWF0LCBGbG9hdFR5cGUgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgR2xpdGNoTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21JbnQobG93LCBoaWdoKSB7XHJcblxyXG5cdHJldHVybiBsb3cgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyArIDEpKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21GbG9hdChsb3csIGhpZ2gpIHtcclxuXHJcblx0cmV0dXJuIGxvdyArIE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgR2xpdGNoUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGdsaXRjaCBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7VGV4dHVyZX0gW29wdGlvbnMucGVydHVyYk1hcF0gLSBBIHBlcnR1cmJhdGlvbiBtYXAuIElmIG5vbmUgaXMgcHJvdmlkZWQsIGEgbm9pc2UgdGV4dHVyZSB3aWxsIGJlIGNyZWF0ZWQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR0U2l6ZT02NF0gLSBUaGUgc2l6ZSBvZiB0aGUgZ2VuZXJhdGVkIG5vaXNlIG1hcC4gV2lsbCBiZSBpZ25vcmVkIGlmIGEgcGVydHVyYmF0aW9uIG1hcCBpcyBwcm92aWRlZC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiR2xpdGNoUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdsaXRjaCBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBuZXcgR2xpdGNoTWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwID0gKG9wdGlvbnMucGVydHVyYk1hcCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMucGVydHVyYk1hcCA6IHRoaXMuZ2VuZXJhdGVQZXJ0dXJiTWFwKG9wdGlvbnMuZHRTaXplKTtcclxuXHRcdHRoaXMucGVydHVyYk1hcC5uYW1lID0gXCJHbGl0Y2guUGVydHVyYmF0aW9uXCI7XHJcblx0XHR0aGlzLnBlcnR1cmJNYXAuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWZmZWN0IG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1vZGV9XHJcblx0XHQgKiBAZGVmYXVsdCBHbGl0Y2hNb2RlLlNQT1JBRElDXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1vZGUgPSBHbGl0Y2hNb2RlLlNQT1JBRElDO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ291bnRlciBmb3IgZ2xpdGNoIGFjdGl2YXRpb24gYW5kIGRlYWN0aXZhdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJhbmRvbSBicmVhayBwb2ludCBmb3IgdGhlIHNwb3JhZGljIGdsaXRjaCBhY3RpdmF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5icmVha1BvaW50ID0gcmFuZG9tSW50KDEyMCwgMjQwKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdGdldCBwZXJ0dXJiTWFwKCkgeyByZXR1cm4gdGhpcy50ZXh0dXJlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFzc2lnbmluZyBhIG5ldyBwZXJ0dXJiYXRpb24gbWFwIGRvZXMgbm90IGRlc3Ryb3kgdGhlIGN1cnJlbnQgb25lIVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCBwZXJ0dXJiTWFwKHgpIHtcclxuXHJcblx0XHR0aGlzLnRleHR1cmUgPSB4O1xyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50UGVydHVyYi52YWx1ZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhlIGN1cnJlbnQgcGVydHVyYmF0aW9uIG1hcCBhbmQgcmVwbGFjZXMgaXQgd2l0aCBhIG5ldyBvbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3NpemU9NjRdIC0gVGhlIHRleHR1cmUgc2l6ZS5cclxuXHQgKiBAcmV0dXJuIHtEYXRhVGV4dHVyZX0gVGhlIHBlcnR1cmJhdGlvbiB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRnZW5lcmF0ZVBlcnR1cmJNYXAoc2l6ZSA9IDY0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGl4ZWxzID0gc2l6ZSAqIHNpemU7XHJcblx0XHRjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShwaXhlbHMgKiAzKTtcclxuXHJcblx0XHRsZXQgZHQgPSB0aGlzLnBlcnR1cmJNYXA7XHJcblx0XHRsZXQgaSwgeDtcclxuXHJcblx0XHRmb3IoaSA9IDA7IGkgPCBwaXhlbHM7ICsraSkge1xyXG5cclxuXHRcdFx0eCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG5cdFx0XHRkYXRhW2kgKiAzXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAxXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAyXSA9IHg7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGR0ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRkdC5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGR0ID0gbmV3IERhdGFUZXh0dXJlKGRhdGEsIHNpemUsIHNpemUsIFJHQkZvcm1hdCwgRmxvYXRUeXBlKTtcclxuXHRcdGR0Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLnBlcnR1cmJNYXAgPSBkdDtcclxuXHJcblx0XHRyZXR1cm4gZHQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IG1vZGUgPSB0aGlzLm1vZGU7XHJcblx0XHRjb25zdCBjb3VudGVyID0gdGhpcy5jb3VudGVyO1xyXG5cdFx0Y29uc3QgYnJlYWtQb2ludCA9IHRoaXMuYnJlYWtQb2ludDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gdGhpcy5tYXRlcmlhbC51bmlmb3JtcztcclxuXHJcblx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHVuaWZvcm1zLnNlZWQudmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xyXG5cdFx0dW5pZm9ybXMuYWN0aXZlLnZhbHVlID0gdHJ1ZTtcclxuXHJcblx0XHRpZihjb3VudGVyICUgYnJlYWtQb2ludCA9PT0gMCB8fCBtb2RlID09PSBHbGl0Y2hNb2RlLkNPTlNUQU5UX1dJTEQpIHtcclxuXHJcblx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyAzMC4wO1xyXG5cdFx0XHR1bmlmb3Jtcy5hbmdsZS52YWx1ZSA9IHJhbmRvbUZsb2F0KC1NYXRoLlBJLCBNYXRoLlBJKTtcclxuXHRcdFx0dW5pZm9ybXMuc2VlZFgudmFsdWUgPSByYW5kb21GbG9hdCgtMS4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0xLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWS52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHJcblx0XHRcdHRoaXMuYnJlYWtQb2ludCA9IHJhbmRvbUludCgxMjAsIDI0MCk7XHJcblx0XHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmKGNvdW50ZXIgJSBicmVha1BvaW50IDwgYnJlYWtQb2ludCAvIDUgfHwgbW9kZSA9PT0gR2xpdGNoTW9kZS5DT05TVEFOVF9NSUxEKSB7XHJcblxyXG5cdFx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyA5MC4wO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gcmFuZG9tRmxvYXQoLU1hdGguUEksIE1hdGguUEkpO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25ZLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLnNlZWRYLnZhbHVlID0gcmFuZG9tRmxvYXQoLTAuMywgMC4zKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0wLjMsIDAuMyk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHQvLyBTcG9yYWRpYy5cclxuXHRcdFx0XHR1bmlmb3Jtcy5hY3RpdmUudmFsdWUgPSBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Kyt0aGlzLmNvdW50ZXI7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZ2xpdGNoIG1vZGUgZW51bWVyYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTUE9SQURJQyAtIFNwb3JhZGljIGdsaXRjaGVzLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ09OU1RBTlRfTUlMRCAtIENvbnN0YW50IG1pbGQgZ2xpdGNoZXMuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05TVEFOVF9XSUxEIC0gQ29uc3RhbnQgd2lsZCBnbGl0Y2hlcy5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgR2xpdGNoTW9kZSA9IHtcclxuXHJcblx0U1BPUkFESUM6IDAsXHJcblx0Q09OU1RBTlRfTUlMRDogMSxcclxuXHRDT05TVEFOVF9XSUxEOiAyXHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBDbGVhclBhc3MgfSBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IHJlbmRlcnMgYSBnaXZlbiBzY2VuZSBkaXJlY3RseSBvbiBzY3JlZW4gb3IgaW50byB0aGUgcmVhZCBidWZmZXJcclxuICogZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHJlbmRlciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgY2FtZXJhIHRvIHVzZSB0byByZW5kZXIgdGhlIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtNYXRlcmlhbH0gW29wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbD1udWxsXSAtIEFuIG92ZXJyaWRlIG1hdGVyaWFsIGZvciB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTEuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsZWFyRGVwdGg9ZmFsc2VdIC0gV2hldGhlciBkZXB0aCBzaG91bGQgYmUgY2xlYXJlZCBleHBsaWNpdGx5LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xlYXI9dHJ1ZV0gLSBXaGV0aGVyIGFsbCBidWZmZXJzIHNob3VsZCBiZSBjbGVhcmVkLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcihzY2VuZSwgY2FtZXJhLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUmVuZGVyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjbGVhciBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDbGVhclBhc3N9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyUGFzcyA9IG5ldyBDbGVhclBhc3Mob3B0aW9ucyk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbiBvdmVycmlkZSBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TWF0ZXJpYWx9XHJcblx0XHQgKiBAZGVmYXVsdCBudWxsXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm92ZXJyaWRlTWF0ZXJpYWwgPSAob3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsIDogbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBkZXB0aCBidWZmZXIgc2hvdWxkIGJlIGNsZWFyZWQgZXhwbGljaXRseS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyRGVwdGggPSAob3B0aW9ucy5jbGVhckRlcHRoICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckRlcHRoIDogZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29sb3IsIGRlcHRoIGFuZCBzdGVuY2lsIGJ1ZmZlcnMgc2hvdWxkIGJlIGNsZWFyZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogRXZlbiB3aXRoIGNsZWFyIHNldCB0byB0cnVlIHlvdSBjYW4gcHJldmVudCBzcGVjaWZpYyBidWZmZXJzIGZyb20gYmVpbmdcclxuXHRcdCAqIGNsZWFyZWQgYnkgc2V0dGluZyBlaXRoZXIgdGhlIGF1dG9DbGVhckNvbG9yLCBhdXRvQ2xlYXJTdGVuY2lsIG9yXHJcblx0XHQgKiBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlciB0byBmYWxzZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXIgPSAob3B0aW9ucy5jbGVhciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXIgOiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIHNjZW5lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHJlYWRCdWZmZXI7XHJcblxyXG5cdFx0aWYodGhpcy5jbGVhcikge1xyXG5cclxuXHRcdFx0dGhpcy5jbGVhclBhc3MucmVuZGVyKHJlbmRlcmVyLCB0YXJnZXQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZih0aGlzLmNsZWFyRGVwdGgpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh0YXJnZXQpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhckRlcHRoKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSB0aGlzLm92ZXJyaWRlTWF0ZXJpYWw7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhLCB0YXJnZXQpO1xyXG5cdFx0c2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGw7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRDb2xvcixcclxuXHRMaW5lYXJGaWx0ZXIsXHJcblx0TWVzaEJhc2ljTWF0ZXJpYWwsXHJcblx0UkdCRm9ybWF0LFxyXG5cdFNjZW5lLFxyXG5cdFZlY3RvcjMsXHJcblx0V2ViR0xSZW5kZXJUYXJnZXRcclxufSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmltcG9ydCB7IENvbWJpbmVNYXRlcmlhbCwgR29kUmF5c01hdGVyaWFsLCBLZXJuZWxTaXplIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBSZW5kZXJQYXNzIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XHJcbmltcG9ydCB7IEJsdXJQYXNzIH0gZnJvbSBcIi4vYmx1ci5qc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIENsYW1wcyBhIGdpdmVuIHZhbHVlLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjbGFtcC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbiAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggLSBUaGUgaGlnaGVzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgY2xhbXBlZCB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcclxuXHJcblx0cmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2YWx1ZSkpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgY3JlcHVzY3VsYXIgcmF5cyBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHb2RSYXlzUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGdvZCByYXlzIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBtYWluIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgbWFpbiBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtPYmplY3QzRH0gbGlnaHRTb3VyY2UgLSBUaGUgbWFpbiBsaWdodCBzb3VyY2UuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kZW5zaXR5PTAuOTZdIC0gVGhlIGRlbnNpdHkgb2YgdGhlIGxpZ2h0IHJheXMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlY2F5PTAuOTNdIC0gQW4gaWxsdW1pbmF0aW9uIGRlY2F5IGZhY3Rvci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2VpZ2h0PTAuNF0gLSBBIGxpZ2h0IHJheSB3ZWlnaHQgZmFjdG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5leHBvc3VyZT0wLjZdIC0gQSBjb25zdGFudCBhdHRlbnVhdGlvbiBjb2VmZmljaWVudC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2xhbXBNYXg9MS4wXSAtIEFuIHVwcGVyIGJvdW5kIGZvciB0aGUgc2F0dXJhdGlvbiBvZiB0aGUgb3ZlcmFsbCBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmludGVuc2l0eT0xLjBdIC0gQSBjb25zdGFudCBmYWN0b3IgZm9yIGFkZGl0aXZlIGJsZW5kaW5nLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZXNvbHV0aW9uU2NhbGU9MC41XSAtIFRoZSByZW5kZXIgdGV4dHVyZSByZXNvbHV0aW9uIHNjYWxlLCByZWxhdGl2ZSB0byB0aGUgc2NyZWVuIHJlbmRlciBzaXplLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5rZXJuZWxTaXplPUtlcm5lbFNpemUuTEFSR0VdIC0gVGhlIGJsdXIga2VybmVsIHNpemUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNhbXBsZXM9NjBdIC0gVGhlIG51bWJlciBvZiBzYW1wbGVzIHBlciBwaXhlbC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2NyZWVuTW9kZT10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcmVlbiBibGVuZCBtb2RlIHNob3VsZCBiZSB1c2VkIGZvciBjb21iaW5pbmcgdGhlIGdvZCByYXlzIHRleHR1cmUgd2l0aCB0aGUgc2NlbmUgY29sb3JzLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhLCBsaWdodFNvdXJjZSwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiR29kUmF5c1Bhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHNjZW5lIHRoYXQgb25seSBjb250YWlucyB0aGUgbGlnaHQgc291cmNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTY2VuZX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmxpZ2h0U2NlbmUgPSBuZXcgU2NlbmUoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBtYWluIHNjZW5lLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTY2VuZX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1haW5TY2VuZSA9IHNjZW5lO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG1haW4gY2FtZXJhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDYW1lcmF9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYWluQ2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBwYXNzIHRoYXQgb25seSByZW5kZXJzIHRoZSBsaWdodCBzb3VyY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1JlbmRlclBhc3N9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJQYXNzTGlnaHQgPSBuZXcgUmVuZGVyUGFzcyh0aGlzLmxpZ2h0U2NlbmUsIHRoaXMubWFpbkNhbWVyYSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHBhc3MgdGhhdCByZW5kZXJzIHRoZSBtYXNrZWQgc2NlbmUgb3ZlciB0aGUgbGlnaHQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1JlbmRlclBhc3N9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJQYXNzTWFzayA9IG5ldyBSZW5kZXJQYXNzKHRoaXMubWFpblNjZW5lLCB0aGlzLm1haW5DYW1lcmEsIHtcclxuXHRcdFx0b3ZlcnJpZGVNYXRlcmlhbDogbmV3IE1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMDAwIH0pLFxyXG5cdFx0XHRjbGVhckNvbG9yOiBuZXcgQ29sb3IoMHgwMDAwMDApXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclBhc3NNYXNrLmNsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGJsdXIgcGFzcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qmx1clBhc3N9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5ibHVyUGFzcyA9IG5ldyBCbHVyUGFzcyhvcHRpb25zKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcmVuZGVyIHRhcmdldC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRYID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KDEsIDEsIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGZhbHNlXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFgudGV4dHVyZS5uYW1lID0gXCJHb2RSYXlzLlRhcmdldFhcIjtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBzZWNvbmQgcmVuZGVyIHRhcmdldC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRZID0gdGhpcy5yZW5kZXJUYXJnZXRYLmNsb25lKCk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRZLnRleHR1cmUubmFtZSA9IFwiR29kUmF5cy5UYXJnZXRZXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJlbmRlciB0YXJnZXQgZm9yIHRoZSBtYXNrZWQgbGlnaHQgc2NlbmUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0TWFzayA9IG5ldyBXZWJHTFJlbmRlclRhcmdldCgxLCAxLCB7XHJcblx0XHRcdG1pbkZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRtYWdGaWx0ZXI6IExpbmVhckZpbHRlclxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRNYXNrLnRleHR1cmUubmFtZSA9IFwiR29kUmF5cy5NYXNrXCI7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldE1hc2sudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBsaWdodCBzb3VyY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdDNEfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5saWdodFNvdXJjZSA9IGxpZ2h0U291cmNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGxpZ2h0IHBvc2l0aW9uIGluIHNjcmVlbiBzcGFjZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VmVjdG9yM31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjcmVlblBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgZ29kIHJheXMgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtHb2RSYXlzTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5nb2RSYXlzTWF0ZXJpYWwgPSBuZXcgR29kUmF5c01hdGVyaWFsKCk7XHJcblx0XHR0aGlzLmdvZFJheXNNYXRlcmlhbC51bmlmb3Jtcy5saWdodFBvc2l0aW9uLnZhbHVlID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHRpZihvcHRpb25zLmV4cG9zdXJlICE9PSB1bmRlZmluZWQpIHsgdGhpcy5nb2RSYXlzTWF0ZXJpYWwudW5pZm9ybXMuZXhwb3N1cmUudmFsdWUgPSBvcHRpb25zLmV4cG9zdXJlOyB9XHJcblx0XHRpZihvcHRpb25zLmRlbnNpdHkgIT09IHVuZGVmaW5lZCkgeyB0aGlzLmdvZFJheXNNYXRlcmlhbC51bmlmb3Jtcy5kZW5zaXR5LnZhbHVlID0gb3B0aW9ucy5kZW5zaXR5OyB9XHJcblx0XHRpZihvcHRpb25zLmRlY2F5ICE9PSB1bmRlZmluZWQpIHsgdGhpcy5nb2RSYXlzTWF0ZXJpYWwudW5pZm9ybXMuZGVjYXkudmFsdWUgPSBvcHRpb25zLmRlY2F5OyB9XHJcblx0XHRpZihvcHRpb25zLndlaWdodCAhPT0gdW5kZWZpbmVkKSB7IHRoaXMuZ29kUmF5c01hdGVyaWFsLnVuaWZvcm1zLndlaWdodC52YWx1ZSA9IG9wdGlvbnMud2VpZ2h0OyB9XHJcblx0XHRpZihvcHRpb25zLmNsYW1wTWF4ICE9PSB1bmRlZmluZWQpIHsgdGhpcy5nb2RSYXlzTWF0ZXJpYWwudW5pZm9ybXMuY2xhbXBNYXgudmFsdWUgPSBvcHRpb25zLmNsYW1wTWF4OyB9XHJcblxyXG5cdFx0dGhpcy5zYW1wbGVzID0gb3B0aW9ucy5zYW1wbGVzO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb21iaW5lIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29tYmluZU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29tYmluZU1hdGVyaWFsID0gbmV3IENvbWJpbmVNYXRlcmlhbCgob3B0aW9ucy5zY3JlZW5Nb2RlICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5zY3JlZW5Nb2RlIDogdHJ1ZSk7XHJcblxyXG5cdFx0dGhpcy5pbnRlbnNpdHkgPSBvcHRpb25zLmludGVuc2l0eTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVzb2x1dGlvbiBzY2FsZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICogQGRlZmF1bHQgMC41XHJcblx0ICovXHJcblxyXG5cdGdldCByZXNvbHV0aW9uU2NhbGUoKSB7IHJldHVybiB0aGlzLmJsdXJQYXNzLnJlc29sdXRpb25TY2FsZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBZb3UgbmVlZCB0byBjYWxsIHtAbGluayBFZmZlY3RDb21wb3NlciNzZXRTaXplfSBhZnRlciBjaGFuZ2luZyB0aGlzIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IHJlc29sdXRpb25TY2FsZSh4ID0gMC41KSB7IHRoaXMuYmx1clBhc3MucmVzb2x1dGlvblNjYWxlID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmx1ciBrZXJuZWwgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtLZXJuZWxTaXplfVxyXG5cdCAqIEBkZWZhdWx0IEtlcm5lbFNpemUuTEFSR0VcclxuXHQgKi9cclxuXHJcblx0Z2V0IGtlcm5lbFNpemUoKSB7IHJldHVybiB0aGlzLmJsdXJQYXNzLmtlcm5lbFNpemU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0ICovXHJcblxyXG5cdHNldCBrZXJuZWxTaXplKHggPSBLZXJuZWxTaXplLkxBUkdFKSB7IHRoaXMuYmx1clBhc3Mua2VybmVsU2l6ZSA9IHg7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG92ZXJhbGwgaW50ZW5zaXR5IG9mIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqIEBkZWZhdWx0IDEuMFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgaW50ZW5zaXR5KCkgeyByZXR1cm4gdGhpcy5jb21iaW5lTWF0ZXJpYWwudW5pZm9ybXMub3BhY2l0eTIudmFsdWU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IGludGVuc2l0eSh4ID0gMS4wKSB7IHRoaXMuY29tYmluZU1hdGVyaWFsLnVuaWZvcm1zLm9wYWNpdHkyLnZhbHVlID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbnVtYmVyIG9mIHNhbXBsZXMgcGVyIHBpeGVsLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKiBAZGVmYXVsdCA2MFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgc2FtcGxlcygpIHsgcmV0dXJuIE51bWJlci5wYXJzZUludCh0aGlzLmdvZFJheXNNYXRlcmlhbC5kZWZpbmVzLk5VTV9TQU1QTEVTX0lOVCk7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhpcyB2YWx1ZSBtdXN0IGJlIGNhcmVmdWxseSBjaG9zZW4uIEEgaGlnaGVyIHZhbHVlIGRpcmVjdGx5IGluY3JlYXNlcyB0aGVcclxuXHQgKiBHUFUgbG9hZC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdHNldCBzYW1wbGVzKHggPSA2MCkge1xyXG5cclxuXHRcdHggPSBNYXRoLmZsb29yKHgpO1xyXG5cclxuXHRcdHRoaXMuZ29kUmF5c01hdGVyaWFsLmRlZmluZXMuTlVNX1NBTVBMRVNfRkxPQVQgPSB4LnRvRml4ZWQoMSk7XHJcblx0XHR0aGlzLmdvZFJheXNNYXRlcmlhbC5kZWZpbmVzLk5VTV9TQU1QTEVTX0lOVCA9IHgudG9GaXhlZCgwKTtcclxuXHRcdHRoaXMuZ29kUmF5c01hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBzY2VuZS5cclxuXHQgKlxyXG5cdCAqIFRoZSBnb2QgcmF5cyBwYXNzIGhhcyBmb3VyIHBoYXNlczpcclxuXHQgKlxyXG5cdCAqIE1hc2sgUGhhc2U6XHJcblx0ICogIEZpcnN0LCB0aGUgbGlnaHQgc291cmNlIGlzIHJlbmRlcmVkLiBUaGVuIHRoZSBzY2VuZSBpcyByZW5kZXJlZCBpbnRvIHRoZVxyXG5cdCAqICBzYW1lIGJ1ZmZlciB1c2luZyBhIG1hc2sgb3ZlcnJpZGUgbWF0ZXJpYWwgd2l0aCBkZXB0aCB0ZXN0IGVuYWJsZWQuXHJcblx0ICpcclxuXHQgKiBQcmVsaW1pbmFyeSBCbHVyIFBoYXNlOlxyXG5cdCAqICBUaGUgbWFza2VkIHNjZW5lIGlzIGJsdXJyZWQuXHJcblx0ICpcclxuXHQgKiBHb2QgUmF5cyBQaGFzZTpcclxuXHQgKiAgVGhlIGJsdXJyZWQgc2NlbmUgaXMgYmx1cnJlZCBhZ2FpbiwgYnV0IHRoaXMgdGltZSBhbG9uZyByYWRpYWwgbGluZXNcclxuXHQgKiAgdG93YXJkcyB0aGUgbGlnaHQgc291cmNlLlxyXG5cdCAqXHJcblx0ICogQ29tcG9zaXRlIFBoYXNlOlxyXG5cdCAqICBUaGUgZmluYWwgcmVzdWx0IGlzIGNvbWJpbmVkIHdpdGggdGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IHF1YWQgPSB0aGlzLnF1YWQ7XHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuXHRcdGNvbnN0IG1haW5TY2VuZSA9IHRoaXMubWFpblNjZW5lO1xyXG5cclxuXHRcdGNvbnN0IGxpZ2h0U291cmNlID0gdGhpcy5saWdodFNvdXJjZTtcclxuXHRcdGNvbnN0IHNjcmVlblBvc2l0aW9uID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHRjb25zdCBnb2RSYXlzTWF0ZXJpYWwgPSB0aGlzLmdvZFJheXNNYXRlcmlhbDtcclxuXHRcdGNvbnN0IGNvbWJpbmVNYXRlcmlhbCA9IHRoaXMuY29tYmluZU1hdGVyaWFsO1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldE1hc2sgPSB0aGlzLnJlbmRlclRhcmdldE1hc2s7XHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXRYID0gdGhpcy5yZW5kZXJUYXJnZXRYO1xyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0WSA9IHRoaXMucmVuZGVyVGFyZ2V0WTtcclxuXHJcblx0XHRsZXQgYmFja2dyb3VuZCwgcGFyZW50O1xyXG5cclxuXHRcdC8vIENvbXB1dGUgdGhlIHNjcmVlbiBsaWdodCBwb3NpdGlvbiBhbmQgdHJhbnNsYXRlIGl0IHRvIFswLCAxXS5cclxuXHRcdHNjcmVlblBvc2l0aW9uLmNvcHkobGlnaHRTb3VyY2UucG9zaXRpb24pLnByb2plY3QodGhpcy5tYWluQ2FtZXJhKTtcclxuXHRcdHNjcmVlblBvc2l0aW9uLnggPSBjbGFtcCgoc2NyZWVuUG9zaXRpb24ueCArIDEuMCkgKiAwLjUsIDAuMCwgMS4wKTtcclxuXHRcdHNjcmVlblBvc2l0aW9uLnkgPSBjbGFtcCgoc2NyZWVuUG9zaXRpb24ueSArIDEuMCkgKiAwLjUsIDAuMCwgMS4wKTtcclxuXHJcblx0XHQvLyBSZW5kZXIgdGhlIG1hc2tlZCBzY2VuZS5cclxuXHRcdHBhcmVudCA9IGxpZ2h0U291cmNlLnBhcmVudDtcclxuXHRcdGJhY2tncm91bmQgPSBtYWluU2NlbmUuYmFja2dyb3VuZDtcclxuXHRcdG1haW5TY2VuZS5iYWNrZ3JvdW5kID0gbnVsbDtcclxuXHRcdHRoaXMubGlnaHRTY2VuZS5hZGQobGlnaHRTb3VyY2UpO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyUGFzc0xpZ2h0LnJlbmRlcihyZW5kZXJlciwgcmVuZGVyVGFyZ2V0TWFzayk7XHJcblx0XHR0aGlzLnJlbmRlclBhc3NNYXNrLnJlbmRlcihyZW5kZXJlciwgcmVuZGVyVGFyZ2V0TWFzayk7XHJcblxyXG5cdFx0aWYocGFyZW50ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRwYXJlbnQuYWRkKGxpZ2h0U291cmNlKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0bWFpblNjZW5lLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xyXG5cclxuXHRcdC8vIENvbnZvbHV0aW9uIHBoYXNlLlxyXG5cdFx0dGhpcy5ibHVyUGFzcy5yZW5kZXIocmVuZGVyZXIsIHJlbmRlclRhcmdldE1hc2ssIHJlbmRlclRhcmdldFgpO1xyXG5cclxuXHRcdC8vIEdvZCByYXlzIHBhc3MuXHJcblx0XHRxdWFkLm1hdGVyaWFsID0gZ29kUmF5c01hdGVyaWFsO1xyXG5cdFx0Z29kUmF5c01hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVuZGVyVGFyZ2V0WC50ZXh0dXJlO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldFkpO1xyXG5cclxuXHRcdC8vIEZpbmFsIHBhc3MgLSBjb21wb3NpdGUgZ29kIHJheXMgb250byBjb2xvdXJzLlxyXG5cdFx0cXVhZC5tYXRlcmlhbCA9IGNvbWJpbmVNYXRlcmlhbDtcclxuXHRcdGNvbWJpbmVNYXRlcmlhbC51bmlmb3Jtcy50ZXh0dXJlMS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdGNvbWJpbmVNYXRlcmlhbC51bmlmb3Jtcy50ZXh0dXJlMi52YWx1ZSA9IHJlbmRlclRhcmdldFkudGV4dHVyZTtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRqdXN0cyB0aGUgZm9ybWF0IG9mIHRoZSByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBhbHBoYSAtIFdoZXRoZXIgdGhlIHJlbmRlcmVyIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwgb3Igbm90LlxyXG5cdCAqL1xyXG5cclxuXHRpbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSkge1xyXG5cclxuXHRcdHRoaXMucmVuZGVyUGFzc0xpZ2h0LmluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKTtcclxuXHRcdHRoaXMucmVuZGVyUGFzc01hc2suaW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpO1xyXG5cdFx0dGhpcy5ibHVyUGFzcy5pbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSk7XHJcblxyXG5cdFx0aWYoIWFscGhhKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlclRhcmdldE1hc2sudGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7XHJcblx0XHRcdHRoaXMucmVuZGVyVGFyZ2V0WC50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDtcclxuXHRcdFx0dGhpcy5yZW5kZXJUYXJnZXRZLnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMucmVuZGVyUGFzc0xpZ2h0LnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLnJlbmRlclBhc3NNYXNrLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLmJsdXJQYXNzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0d2lkdGggPSB0aGlzLmJsdXJQYXNzLndpZHRoO1xyXG5cdFx0aGVpZ2h0ID0gdGhpcy5ibHVyUGFzcy5oZWlnaHQ7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRNYXNrLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFguc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WS5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBtYXNrIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hc2tQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgbWFzayBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgY2FtZXJhIHRvIHVzZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIGNhbWVyYSkge1xyXG5cclxuXHRcdHN1cGVyKHNjZW5lLCBjYW1lcmEsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJNYXNrUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW52ZXJzZSBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuaW52ZXJzZSA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU3RlbmNpbCBidWZmZXIgY2xlYXIgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJTdGVuY2lsID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgc3RlbmNpbCBiaXQgbWFzay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHRcdGNvbnN0IHN0YXRlID0gcmVuZGVyZXIuc3RhdGU7XHJcblxyXG5cdFx0Y29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG5cdFx0Y29uc3QgY2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcblxyXG5cdFx0Y29uc3Qgd3JpdGVWYWx1ZSA9IHRoaXMuaW52ZXJzZSA/IDAgOiAxO1xyXG5cdFx0Y29uc3QgY2xlYXJWYWx1ZSA9IDEgLSB3cml0ZVZhbHVlO1xyXG5cclxuXHRcdC8vIERvbid0IHVwZGF0ZSBjb2xvciBvciBkZXB0aC5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TWFzayhmYWxzZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldE1hc2soZmFsc2UpO1xyXG5cclxuXHRcdC8vIExvY2sgdGhlIGJ1ZmZlcnMuXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldExvY2tlZCh0cnVlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TG9ja2VkKHRydWUpO1xyXG5cclxuXHRcdC8vIENvbmZpZ3VyZSB0aGUgc3RlbmNpbC5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRUZXN0KHRydWUpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldE9wKGNvbnRleHQuUkVQTEFDRSwgY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldEZ1bmMoY29udGV4dC5BTFdBWVMsIHdyaXRlVmFsdWUsIDB4ZmZmZmZmZmYpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldENsZWFyKGNsZWFyVmFsdWUpO1xyXG5cclxuXHRcdC8vIENsZWFyIHRoZSBzdGVuY2lsLlxyXG5cdFx0aWYodGhpcy5jbGVhclN0ZW5jaWwpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldChyZWFkQnVmZmVyKTtcclxuXHRcdFx0cmVuZGVyZXIuY2xlYXJTdGVuY2lsKCk7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQod3JpdGVCdWZmZXIpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhclN0ZW5jaWwoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgbWFzayBpbnRvIGJvdGggYnVmZmVycy5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCByZWFkQnVmZmVyKTtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdFx0Ly8gVW5sb2NrIHRoZSBidWZmZXJzLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRMb2NrZWQoZmFsc2UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRMb2NrZWQoZmFsc2UpO1xyXG5cclxuXHRcdC8vIE9ubHkgcmVuZGVyIHdoZXJlIHRoZSBzdGVuY2lsIGlzIHNldCB0byAxLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldEZ1bmMoY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0T3AoY29udGV4dC5LRUVQLCBjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGl4ZWxhdGlvbk1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGl4ZWxhdGlvbiBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQaXhlbGF0aW9uUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHBpeGVsYXRpb24gcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZ3JhbnVsYXJpdHk9MzAuMF0gLSBUaGUgaW50ZW5zaXR5IG9mIHRoZSBlZmZlY3QuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGdyYW51bGFyaXR5ID0gMzAuMCkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlBpeGVsYXRpb25QYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBwaXhlbGF0aW9uIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UGl4ZWxhdGlvbk1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucGl4ZWxhdGlvbk1hdGVyaWFsID0gbmV3IFBpeGVsYXRpb25NYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMuZ3JhbnVsYXJpdHkgPSBncmFudWxhcml0eTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLnBpeGVsYXRpb25NYXRlcmlhbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcGl4ZWwgZ3JhbnVsYXJpdHkuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqIEBkZWZhdWx0IDMwLjBcclxuXHQgKi9cclxuXHJcblx0Z2V0IGdyYW51bGFyaXR5KCkgeyByZXR1cm4gdGhpcy5waXhlbGF0aW9uTWF0ZXJpYWwuZ3JhbnVsYXJpdHk7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBoaWdoZXIgdmFsdWUgeWllbGRzIGNvYXJzZXIgdmlzdWFscy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdHNldCBncmFudWxhcml0eSh4ID0gMzApIHtcclxuXHJcblx0XHR4ID0gTWF0aC5mbG9vcih4KTtcclxuXHJcblx0XHRpZih4ICUgMiA+IDApIHtcclxuXHJcblx0XHRcdHggKz0gMTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5waXhlbGF0aW9uTWF0ZXJpYWwuZ3JhbnVsYXJpdHkgPSB4O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHR0aGlzLnBpeGVsYXRpb25NYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0dGhpcy5waXhlbGF0aW9uTWF0ZXJpYWwuc2V0UmVzb2x1dGlvbih3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBMaW5lYXJGaWx0ZXIsIFJHQkZvcm1hdCwgV2ViR0xSZW5kZXJUYXJnZXQgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IHJlbmRlcnMgdGhlIHJlc3VsdCBmcm9tIGEgcHJldmlvdXMgcGFzcyB0byBhbm90aGVyIHJlbmRlciB0YXJnZXQuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNhdmVQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgc2F2ZSBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gW3JlbmRlclRhcmdldF0gLSBUaGUgcmVuZGVyIHRhcmdldCB0byB1c2UgZm9yIHNhdmluZyB0aGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbcmVzaXplPXRydWVdIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgYWRqdXN0IHRvIHRoZSBzaXplIG9mIHRoZSByZWFkL3dyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IocmVuZGVyVGFyZ2V0LCByZXNpemUgPSB0cnVlKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiU2F2ZVBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENvcHkgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb3B5TWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG5ldyBDb3B5TWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlbmRlciB0YXJnZXQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXQgPSAocmVuZGVyVGFyZ2V0ICE9PSB1bmRlZmluZWQpID8gcmVuZGVyVGFyZ2V0IDogbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KDEsIDEsIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGZhbHNlXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldC50ZXh0dXJlLm5hbWUgPSBcIlNhdmUuVGFyZ2V0XCI7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGJlIHJlc2l6ZWQgd2hlbiB0aGUgc2l6ZSBvZlxyXG5cdFx0ICogdGhlIGNvbXBvc2VyJ3MgcmVhZC93cml0ZSBidWZmZXIgY2hhbmdlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVzaXplID0gcmVzaXplO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNhdmVzIHRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyKSB7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVGFyZ2V0KTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBmb3JtYXQgb2YgdGhlIHJlbmRlciB0YXJnZXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxwaGEgLSBXaGV0aGVyIHRoZSByZW5kZXJlciB1c2VzIHRoZSBhbHBoYSBjaGFubmVsIG9yIG5vdC5cclxuXHQgKi9cclxuXHJcblx0aW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpIHtcclxuXHJcblx0XHRpZighYWxwaGEpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyVGFyZ2V0LnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdGlmKHRoaXMucmVzaXplKSB7XHJcblxyXG5cdFx0XHR3aWR0aCA9IE1hdGgubWF4KDEsIHdpZHRoKTtcclxuXHRcdFx0aGVpZ2h0ID0gTWF0aC5tYXgoMSwgaGVpZ2h0KTtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyVGFyZ2V0LnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBzaGFkZXIgcGFzcy5cclxuICpcclxuICogVXNlZCB0byByZW5kZXIgYW55IHNoYWRlciBtYXRlcmlhbCBhcyBhIDJEIGZpbHRlci5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHNoYWRlciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTaGFkZXJNYXRlcmlhbH0gbWF0ZXJpYWwgLSBUaGUgc2hhZGVyIG1hdGVyaWFsIHRvIHVzZS5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW3RleHR1cmVJRD1cInREaWZmdXNlXCJdIC0gVGhlIHRleHR1cmUgdW5pZm9ybSBpZGVudGlmaWVyLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbCwgdGV4dHVyZUlEID0gXCJ0RGlmZnVzZVwiKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiU2hhZGVyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzaGFkZXIgbWF0ZXJpYWwgdG8gdXNlIGZvciByZW5kZXJpbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NoYWRlck1hdGVyaWFsfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGUgY29sb3Igc2FtcGxlciB1bmlmb3JtIG9mIHRoZSBnaXZlbiBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U3RyaW5nfVxyXG5cdFx0ICogQGRlZmF1bHQgXCJ0RGlmZnVzZVwiXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRleHR1cmVJRCA9IHRleHR1cmVJRDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0aWYodGhpcy5tYXRlcmlhbC51bmlmb3Jtc1t0aGlzLnRleHR1cmVJRF0gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtc1t0aGlzLnRleHR1cmVJRF0udmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBDb3B5TWF0ZXJpYWwsIFNob2NrV2F2ZU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEhhbGYgUEkuXHJcbiAqXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgSEFMRl9QSSA9IE1hdGguUEkgKiAwLjU7XHJcblxyXG4vKipcclxuICogQSB2ZWN0b3IuXHJcbiAqXHJcbiAqIEB0eXBlIHtWZWN0b3IzfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuLyoqXHJcbiAqIEEgdmVjdG9yLlxyXG4gKlxyXG4gKiBAdHlwZSB7VmVjdG9yM31cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCBhYiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG4vKipcclxuICogQSBzaG9jayB3YXZlIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNob2NrV2F2ZVBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzaG9jayB3YXZlIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIC0gVGhlIG1haW4gY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7VmVjdG9yM30gW2VwaWNlbnRlcl0gLSBUaGUgd29ybGQgcG9zaXRpb24gb2YgdGhlIHNob2NrIHdhdmUgZXBpY2VudGVyLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc3BlZWQ9MS4wXSAtIFRoZSBhbmltYXRpb24gc3BlZWQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFJhZGl1cz0xLjBdIC0gVGhlIGV4dGVudCBvZiB0aGUgc2hvY2sgd2F2ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2F2ZVNpemU9MC4yXSAtIFRoZSB3YXZlIHNpemUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmFtcGxpdHVkZT0wLjA1XSAtIFRoZSBkaXN0b3J0aW9uIGFtcGxpdHVkZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhLCBlcGljZW50ZXIgPSBuZXcgVmVjdG9yMygpLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTaG9ja1dhdmVQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG1haW4gY2FtZXJhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3QzRH1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWFpbkNhbWVyYSA9IGNhbWVyYTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlcGljZW50ZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1ZlY3RvcjN9XHJcblx0XHQgKiBAZXhhbXBsZSBzaG9ja1dhdmVQYXNzLmVwaWNlbnRlciA9IG15TWVzaC5wb3NpdGlvbjtcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuZXBpY2VudGVyID0gZXBpY2VudGVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG9iamVjdCBwb3NpdGlvbiBpbiBzY3JlZW4gc3BhY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1ZlY3RvcjN9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zY3JlZW5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc3BlZWQgb2YgdGhlIHNob2NrIHdhdmUgYW5pbWF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAyLjBcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc3BlZWQgPSAob3B0aW9ucy5zcGVlZCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3BlZWQgOiAyLjA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHRpbWUgYWNjdW11bGF0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwLjA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc2hvY2sgd2F2ZSBhbmltYXRpb24gaXMgYWN0aXZlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHNob2NrIHdhdmUgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaG9ja1dhdmVNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsID0gbmV3IFNob2NrV2F2ZU1hdGVyaWFsKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXMuY2VudGVyLnZhbHVlID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY29weSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvcHlNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbCA9IG5ldyBDb3B5TWF0ZXJpYWwoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbWl0cyB0aGUgc2hvY2sgd2F2ZS5cclxuXHQgKi9cclxuXHJcblx0ZXhwbG9kZSgpIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwLjA7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgcmVuZGVyIGRlbHRhIHRpbWUuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgZXBpY2VudGVyID0gdGhpcy5lcGljZW50ZXI7XHJcblx0XHRjb25zdCBtYWluQ2FtZXJhID0gdGhpcy5tYWluQ2FtZXJhO1xyXG5cdFx0Y29uc3Qgc2NyZWVuUG9zaXRpb24gPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdGNvbnN0IHNob2NrV2F2ZU1hdGVyaWFsID0gdGhpcy5zaG9ja1dhdmVNYXRlcmlhbDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXM7XHJcblx0XHRjb25zdCBjZW50ZXIgPSB1bmlmb3Jtcy5jZW50ZXI7XHJcblx0XHRjb25zdCByYWRpdXMgPSB1bmlmb3Jtcy5yYWRpdXM7XHJcblx0XHRjb25zdCBtYXhSYWRpdXMgPSB1bmlmb3Jtcy5tYXhSYWRpdXM7XHJcblx0XHRjb25zdCB3YXZlU2l6ZSA9IHVuaWZvcm1zLndhdmVTaXplO1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5jb3B5TWF0ZXJpYWw7XHJcblxyXG5cdFx0aWYodGhpcy5hY3RpdmUpIHtcclxuXHJcblx0XHRcdC8vIENhbGN1bGF0ZSBkaXJlY3Rpb24gdmVjdG9ycy5cclxuXHRcdFx0bWFpbkNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbih2KTtcclxuXHRcdFx0YWIuY29weShtYWluQ2FtZXJhLnBvc2l0aW9uKS5zdWIoZXBpY2VudGVyKTtcclxuXHJcblx0XHRcdC8vIERvbid0IHJlbmRlciB0aGUgZWZmZWN0IGlmIHRoZSBvYmplY3QgaXMgYmVoaW5kIHRoZSBjYW1lcmEuXHJcblx0XHRcdGlmKHYuYW5nbGVUbyhhYikgPiBIQUxGX1BJKSB7XHJcblxyXG5cdFx0XHRcdC8vIFNjYWxlIHRoZSBlZmZlY3QgYmFzZWQgb24gZGlzdGFuY2UgdG8gdGhlIG9iamVjdC5cclxuXHRcdFx0XHR1bmlmb3Jtcy5jYW1lcmFEaXN0YW5jZS52YWx1ZSA9IG1haW5DYW1lcmEucG9zaXRpb24uZGlzdGFuY2VUbyhlcGljZW50ZXIpO1xyXG5cclxuXHRcdFx0XHQvLyBDYWxjdWxhdGUgdGhlIHNjcmVlbiBwb3NpdGlvbiBvZiB0aGUgZXBpY2VudGVyLlxyXG5cdFx0XHRcdHNjcmVlblBvc2l0aW9uLmNvcHkoZXBpY2VudGVyKS5wcm9qZWN0KG1haW5DYW1lcmEpO1xyXG5cdFx0XHRcdGNlbnRlci52YWx1ZS54ID0gKHNjcmVlblBvc2l0aW9uLnggKyAxLjApICogMC41O1xyXG5cdFx0XHRcdGNlbnRlci52YWx1ZS55ID0gKHNjcmVlblBvc2l0aW9uLnkgKyAxLjApICogMC41O1xyXG5cclxuXHRcdFx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdFx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSBzaG9ja1dhdmVNYXRlcmlhbDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFVwZGF0ZSB0aGUgc2hvY2sgd2F2ZSByYWRpdXMgYmFzZWQgb24gdGltZS5cclxuXHRcdFx0dGhpcy50aW1lICs9IGRlbHRhO1xyXG5cdFx0XHRyYWRpdXMudmFsdWUgPSB0aGlzLnRpbWUgKiB0aGlzLnNwZWVkIC0gd2F2ZVNpemUudmFsdWU7XHJcblxyXG5cdFx0XHRpZihyYWRpdXMudmFsdWUgPj0gKG1heFJhZGl1cy52YWx1ZSArIHdhdmVTaXplLnZhbHVlKSAqIDIpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXMuYXNwZWN0LnZhbHVlID0gd2lkdGggLyBoZWlnaHQ7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRMaW5lYXJGaWx0ZXIsXHJcblx0TmVhcmVzdEZpbHRlcixcclxuXHRSR0JBRm9ybWF0LFxyXG5cdFJHQkZvcm1hdCxcclxuXHRUZXh0dXJlLFxyXG5cdFdlYkdMUmVuZGVyVGFyZ2V0XHJcbn0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQgeyBTTUFBQmxlbmRNYXRlcmlhbCwgU01BQUNvbG9yRWRnZXNNYXRlcmlhbCwgU01BQVdlaWdodHNNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBTdWJwaXhlbCBNb3JwaG9sb2dpY2FsIEFudGlhbGlhc2luZyAoU01BQSkgdjIuOC5cclxuICpcclxuICogUHJlc2V0OiBTTUFBIDF4IE1lZGl1bSAod2l0aCBjb2xvciBlZGdlIGRldGVjdGlvbikuXHJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vaXJ5b2t1L3NtYWEvcmVsZWFzZXMvdGFnL3YyLjhcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU01BQVBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBTTUFBIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0ltYWdlfSBJbWFnZSAtIFRoaXMgcGFzcyByZXF1aXJlcyBhbiBJbWFnZSBjbGFzcyB0byBjcmVhdGUgaW50ZXJuYWwgdGV4dHVyZXMuIFByb3ZpZGUgd2luZG93LkltYWdlIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoSW1hZ2UpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTTUFBUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcmVuZGVyIHRhcmdldCBmb3IgdGhlIGNvbG9yIGVkZ2UgZGV0ZWN0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldENvbG9yRWRnZXMgPSBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoMSwgMSwge1xyXG5cdFx0XHRtaW5GaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0Zm9ybWF0OiBSR0JGb3JtYXQsXHJcblx0XHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0Q29sb3JFZGdlcy50ZXh0dXJlLm5hbWUgPSBcIlNNQUEuQ29sb3JFZGdlc1wiO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRDb2xvckVkZ2VzLnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJlbmRlciB0YXJnZXQgZm9yIHRoZSBTTUFBIHdlaWdodHMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0V2VpZ2h0cyA9IHRoaXMucmVuZGVyVGFyZ2V0Q29sb3JFZGdlcy5jbG9uZSgpO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0V2VpZ2h0cy50ZXh0dXJlLm5hbWUgPSBcIlNNQUEuV2VpZ2h0c1wiO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRXZWlnaHRzLnRleHR1cmUuZm9ybWF0ID0gUkdCQUZvcm1hdDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNNQUEgY29sb3IgZWRnZSBkZXRlY3Rpb24gc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTTUFBQ29sb3JFZGdlc01hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29sb3JFZGdlc01hdGVyaWFsID0gbmV3IFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNNQUEgd2VpZ2h0cyBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NNQUFXZWlnaHRzTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy53ZWlnaHRzTWF0ZXJpYWwgPSBuZXcgU01BQVdlaWdodHNNYXRlcmlhbCgpO1xyXG5cclxuXHRcdGNvbnN0IGFyZWFJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0YXJlYUltYWdlLnNyYyA9IHRoaXMud2VpZ2h0c01hdGVyaWFsLmFyZWFJbWFnZTtcclxuXHJcblx0XHRjb25zdCBhcmVhVGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XHJcblx0XHRhcmVhVGV4dHVyZS5pbWFnZSA9IGFyZWFJbWFnZTtcclxuXHRcdGFyZWFUZXh0dXJlLm5hbWUgPSBcIlNNQUEuQXJlYVwiO1xyXG5cdFx0YXJlYVRleHR1cmUubWluRmlsdGVyID0gTGluZWFyRmlsdGVyO1xyXG5cdFx0YXJlYVRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0O1xyXG5cdFx0YXJlYVRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblx0XHRhcmVhVGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0XHRhcmVhVGV4dHVyZS5mbGlwWSA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0IHNlYXJjaEltYWdlID0gbmV3IEltYWdlKCk7XHJcblx0XHRzZWFyY2hJbWFnZS5zcmMgPSB0aGlzLndlaWdodHNNYXRlcmlhbC5zZWFyY2hJbWFnZTtcclxuXHJcblx0XHRjb25zdCBzZWFyY2hUZXh0dXJlID0gbmV3IFRleHR1cmUoKTtcclxuXHRcdHNlYXJjaFRleHR1cmUuaW1hZ2UgPSBzZWFyY2hJbWFnZTtcclxuXHRcdHNlYXJjaFRleHR1cmUubmFtZSA9IFwiU01BQS5TZWFyY2hcIjtcclxuXHRcdHNlYXJjaFRleHR1cmUubWFnRmlsdGVyID0gTmVhcmVzdEZpbHRlcjtcclxuXHRcdHNlYXJjaFRleHR1cmUubWluRmlsdGVyID0gTmVhcmVzdEZpbHRlcjtcclxuXHRcdHNlYXJjaFRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblx0XHRzZWFyY2hUZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHRcdHNlYXJjaFRleHR1cmUuZmxpcFkgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLndlaWdodHNNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHRoaXMucmVuZGVyVGFyZ2V0Q29sb3JFZGdlcy50ZXh0dXJlO1xyXG5cdFx0dGhpcy53ZWlnaHRzTWF0ZXJpYWwudW5pZm9ybXMudEFyZWEudmFsdWUgPSBhcmVhVGV4dHVyZTtcclxuXHRcdHRoaXMud2VpZ2h0c01hdGVyaWFsLnVuaWZvcm1zLnRTZWFyY2gudmFsdWUgPSBzZWFyY2hUZXh0dXJlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU01BQSBibGVuZCBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NNQUFCbGVuZE1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYmxlbmRNYXRlcmlhbCA9IG5ldyBTTUFBQmxlbmRNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMuYmxlbmRNYXRlcmlhbC51bmlmb3Jtcy50V2VpZ2h0cy52YWx1ZSA9IHRoaXMucmVuZGVyVGFyZ2V0V2VpZ2h0cy50ZXh0dXJlO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuYmxlbmRNYXRlcmlhbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbnRpYWxpYXNlcyB0aGUgc2NlbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZWN0IGNvbG9yIGVkZ2VzLlxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5jb2xvckVkZ2VzTWF0ZXJpYWw7XHJcblx0XHR0aGlzLmNvbG9yRWRnZXNNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUYXJnZXRDb2xvckVkZ2VzLCB0cnVlKTtcclxuXHJcblx0XHQvLyBDb21wdXRlIGVkZ2Ugd2VpZ2h0cy5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMud2VpZ2h0c01hdGVyaWFsO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRhcmdldFdlaWdodHMsIGZhbHNlKTtcclxuXHJcblx0XHQvLyBBcHBseSB0aGUgYW50aWFsaWFzaW5nIGZpbHRlciB0byB0aGUgY29sb3JzLlxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5ibGVuZE1hdGVyaWFsO1xyXG5cdFx0dGhpcy5ibGVuZE1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldENvbG9yRWRnZXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0V2VpZ2h0cy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdHRoaXMuY29sb3JFZGdlc01hdGVyaWFsLnVuaWZvcm1zLnRleGVsU2l6ZS52YWx1ZS5jb3B5KFxyXG5cdFx0XHR0aGlzLndlaWdodHNNYXRlcmlhbC51bmlmb3Jtcy50ZXhlbFNpemUudmFsdWUuY29weShcclxuXHRcdFx0XHR0aGlzLmJsZW5kTWF0ZXJpYWwudW5pZm9ybXMudGV4ZWxTaXplLnZhbHVlLnNldChcclxuXHRcdFx0XHRcdDEuMCAvIHdpZHRoLCAxLjAgLyBoZWlnaHRcclxuXHRcdCkpKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBBZGRpdGl2ZUJsZW5kaW5nIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IENvcHlNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHBhc3MgdGhhdCByZW5kZXJzIGEgZ2l2ZW4gdGV4dHVyZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dHVyZVBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyB0ZXh0dXJlIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1RleHR1cmV9IHRleHR1cmUgLSBUaGUgdGV4dHVyZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wYWNpdHk9MS4wXSAtIFRoZSB0ZXh0dXJlIG9wYWNpdHkuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHRleHR1cmUsIG9wYWNpdHkgPSAxLjApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJUZXh0dXJlUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb3B5IHNoYWRlciBtYXRlcmlhbCB1c2VkIGZvciByZW5kZXJpbmcgdG8gdGV4dHVyZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29weU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsID0gbmV3IENvcHlNYXRlcmlhbCgpO1xyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwuYmxlbmRpbmcgPSBBZGRpdGl2ZUJsZW5kaW5nO1xyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcblx0XHR0aGlzLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuY29weU1hdGVyaWFsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0ZXh0dXJlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdGdldCB0ZXh0dXJlKCkgeyByZXR1cm4gdGhpcy5jb3B5TWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCB0ZXh0dXJlKHgpIHsgdGhpcy5jb3B5TWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSB4OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBvcGFjaXR5LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKiBAZGVmYXVsdCAxLjBcclxuXHQgKi9cclxuXHJcblx0Z2V0IG9wYWNpdHkoKSB7IHJldHVybiB0aGlzLmNvcHlNYXRlcmlhbC51bmlmb3Jtcy5vcGFjaXR5LnZhbHVlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdHNldCBvcGFjaXR5KHggPSAxLjApIHsgdGhpcy5jb3B5TWF0ZXJpYWwudW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IHg7IH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRMaW5lYXJGaWx0ZXIsXHJcblx0TGluZWFyTWlwTWFwTGluZWFyRmlsdGVyLFxyXG5cdE1lc2hCYXNpY01hdGVyaWFsLFxyXG5cdFJHQkZvcm1hdCxcclxuXHRXZWJHTFJlbmRlclRhcmdldFxyXG59IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuXHRBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCxcclxuXHRDb3B5TWF0ZXJpYWwsXHJcblx0THVtaW5vc2l0eU1hdGVyaWFsLFxyXG5cdFRvbmVNYXBwaW5nTWF0ZXJpYWxcclxufSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcblxyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFJvdW5kcyB0aGUgZ2l2ZW4gbnVtYmVyIHVwIHRvIHRoZSBuZXh0IHBvd2VyIG9mIHR3by5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbiAtIEEgbnVtYmVyLlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBuZXh0IHBvd2VyIG9mIHR3by5cclxuICovXHJcblxyXG5mdW5jdGlvbiBjZWlsMihuKSB7IHJldHVybiBNYXRoLnBvdygyLCBNYXRoLm1heCgwLCBNYXRoLmNlaWwoTWF0aC5sb2cyKG4pKSkpOyB9XHJcblxyXG4vKipcclxuICogQSB0b25lIG1hcHBpbmcgcGFzcyB0aGF0IHN1cHBvcnRzIGFkYXB0aXZlIGx1bWlub3NpdHkuXHJcbiAqXHJcbiAqIElmIGFkYXB0aXZpdHkgaXMgZW5hYmxlZCwgdGhpcyBwYXNzIGdlbmVyYXRlcyBhIHRleHR1cmUgdGhhdCByZXByZXNlbnRzIHRoZVxyXG4gKiBsdW1pbm9zaXR5IG9mIHRoZSBjdXJyZW50IHNjZW5lIGFuZCBhZGp1c3RzIGl0IG92ZXIgdGltZSB0byBzaW11bGF0ZSB0aGVcclxuICogb3B0aWMgbmVydmUgcmVzcG9uZGluZyB0byB0aGUgYW1vdW50IG9mIGxpZ2h0IGl0IGlzIHJlY2VpdmluZy5cclxuICpcclxuICogUmVmZXJlbmNlOlxyXG4gKiAgR0RDMjAwNyAtIFdvbGZnYW5nIEVuZ2VsLCBQb3N0LVByb2Nlc3NpbmcgUGlwZWxpbmVcclxuICogIGh0dHA6Ly9wZXJzby51bml2LWx5b24xLmZyL2plYW4tY2xhdWRlLmllaGwvUHVibGljL2VkdWMvR0FNQS8yMDA3L2dkYzA3L1Bvc3QtUHJvY2Vzc2luZ19QaXBlbGluZS5wZGZcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgVG9uZU1hcHBpbmdQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgdG9uZSBtYXBwaW5nIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGFwdGl2ZT10cnVlXSAtIFdoZXRoZXIgdGhlIHRvbmUgbWFwcGluZyBzaG91bGQgdXNlIGFuIGFkYXB0aXZlIGx1bWluYW5jZSBtYXAuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlc29sdXRpb249MjU2XSAtIFRoZSByZW5kZXIgdGV4dHVyZSByZXNvbHV0aW9uLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kaXN0aW5jdGlvbj0xLjBdIC0gQSBsdW1pbmFuY2UgZGlzdGluY3Rpb24gZmFjdG9yLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJUb25lTWFwcGluZ1Bhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVuZGVyIHRhcmdldCBmb3IgdGhlIGN1cnJlbnQgbHVtaW5vc2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHRvZG8gVXNlIFJFRCBmb3JtYXQgaW4gV2ViR0wgMi4wLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRMdW1pbm9zaXR5ID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KDEsIDEsIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRmb3JtYXQ6IFJHQkZvcm1hdCxcclxuXHRcdFx0c3RlbmNpbEJ1ZmZlcjogZmFsc2UsXHJcblx0XHRcdGRlcHRoQnVmZmVyOiBmYWxzZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRMdW1pbm9zaXR5LnRleHR1cmUubmFtZSA9IFwiVG9uZU1hcHBpbmcuTHVtaW5vc2l0eVwiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlbmRlciB0YXJnZXQgZm9yIGFkYXB0ZWQgbHVtaW5vc2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRBZGFwdGVkID0gdGhpcy5yZW5kZXJUYXJnZXRMdW1pbm9zaXR5LmNsb25lKCk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRBZGFwdGVkLnRleHR1cmUubmFtZSA9IFwiVG9uZU1hcHBpbmcuQWRhcHRlZEx1bWlub3NpdHlcIjtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0QWRhcHRlZC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRBZGFwdGVkLnRleHR1cmUubWluRmlsdGVyID0gTGluZWFyRmlsdGVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSByZW5kZXIgdGFyZ2V0IHRoYXQgaG9sZHMgYSBjb3B5IG9mIHRoZSBhZGFwdGVkIGxpbW9ub3NpdHkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0UHJldmlvdXMgPSB0aGlzLnJlbmRlclRhcmdldEFkYXB0ZWQuY2xvbmUoKTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFByZXZpb3VzLnRleHR1cmUubmFtZSA9IFwiVG9uZU1hcHBpbmcuUHJldmlvdXNMdW1pbm9zaXR5XCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDb3B5IHNoYWRlciBtYXRlcmlhbCB1c2VkIGZvciBzYXZpbmcgdGhlIGx1bWluYW5jZSBtYXAuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvcHlNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbCA9IG5ldyBDb3B5TWF0ZXJpYWwoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgbHVtaW5vc2l0eSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0x1bWlub3NpdHlNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmx1bWlub3NpdHlNYXRlcmlhbCA9IG5ldyBMdW1pbm9zaXR5TWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLmx1bWlub3NpdHlNYXRlcmlhbC51bmlmb3Jtcy5kaXN0aW5jdGlvbi52YWx1ZSA9IChvcHRpb25zLmRpc3RpbmN0aW9uICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5kaXN0aW5jdGlvbiA6IDEuMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFuIGFkYXB0aXZlIGx1bWluYW5jZSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0FkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwgPSBuZXcgQWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLnJlc29sdXRpb24gPSBvcHRpb25zLnJlc29sdXRpb247XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHRvbmUgbWFwcGluZyBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1RvbmVNYXBwaW5nTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50b25lTWFwcGluZ01hdGVyaWFsID0gbmV3IFRvbmVNYXBwaW5nTWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLmFkYXB0aXZlID0gb3B0aW9ucy5hZGFwdGl2ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVzb2x1dGlvbiBvZiB0aGUgcmVuZGVyIHRhcmdldHMuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqIEBkZWZhdWx0IDI1NlxyXG5cdCAqL1xyXG5cclxuXHRnZXQgcmVzb2x1dGlvbigpIHsgcmV0dXJuIHRoaXMucmVuZGVyVGFyZ2V0THVtaW5vc2l0eS53aWR0aDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVzb2x1dGlvbiBvZiB0aGUgcmVuZGVyIHRhcmdldHMuIE11c3QgYmUgYSBwb3dlciBvZiB0d28gZm9yIG1pcG1hcHMuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgcmVzb2x1dGlvbih4ID0gMjU2KSB7XHJcblxyXG5cdFx0eCA9IGNlaWwyKHgpO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0THVtaW5vc2l0eS5zZXRTaXplKHgsIHgpO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRQcmV2aW91cy5zZXRTaXplKHgsIHgpO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRBZGFwdGVkLnNldFNpemUoeCwgeCk7XHJcblxyXG5cdFx0dGhpcy5hZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbC5kZWZpbmVzLk1JUF9MRVZFTF8xWDEgPSAoTWF0aC5yb3VuZChNYXRoLmxvZyh4KSkgLyBNYXRoLmxvZygyKSkudG9GaXhlZCgxKTtcclxuXHRcdHRoaXMuYWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZXRoZXIgdGhpcyBwYXNzIHVzZXMgYWRhcHRpdmUgbHVtaW5vc2l0eS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdCAqIEBkZWZhdWx0IHRydWVcclxuXHQgKi9cclxuXHJcblx0Z2V0IGFkYXB0aXZlKCkgeyByZXR1cm4gKHRoaXMudG9uZU1hcHBpbmdNYXRlcmlhbC5kZWZpbmVzLkFEQVBURURfTFVNSU5BTkNFICE9PSB1bmRlZmluZWQpOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZXRoZXIgdGhpcyBwYXNzIHNob3VsZCB1c2UgYWRhcHRpdmUgbHVtaW5vc2l0eS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgYWRhcHRpdmUoeCA9IHRydWUpIHtcclxuXHJcblx0XHRpZih4KSB7XHJcblxyXG5cdFx0XHR0aGlzLnRvbmVNYXBwaW5nTWF0ZXJpYWwuZGVmaW5lcy5BREFQVEVEX0xVTUlOQU5DRSA9IFwiMVwiO1xyXG5cdFx0XHR0aGlzLnRvbmVNYXBwaW5nTWF0ZXJpYWwudW5pZm9ybXMubHVtaW5hbmNlTWFwLnZhbHVlID0gdGhpcy5yZW5kZXJUYXJnZXRBZGFwdGVkLnRleHR1cmU7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGRlbGV0ZSB0aGlzLnRvbmVNYXBwaW5nTWF0ZXJpYWwuZGVmaW5lcy5BREFQVEVEX0xVTUlOQU5DRTtcclxuXHRcdFx0dGhpcy50b25lTWFwcGluZ01hdGVyaWFsLnVuaWZvcm1zLmx1bWluYW5jZU1hcC52YWx1ZSA9IG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudG9uZU1hcHBpbmdNYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgcmVuZGVyIGRlbHRhIHRpbWUuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgcXVhZCA9IHRoaXMucXVhZDtcclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xyXG5cclxuXHRcdGNvbnN0IGFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsID0gdGhpcy5hZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbDtcclxuXHRcdGNvbnN0IGx1bWlub3NpdHlNYXRlcmlhbCA9IHRoaXMubHVtaW5vc2l0eU1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgdG9uZU1hcHBpbmdNYXRlcmlhbCA9IHRoaXMudG9uZU1hcHBpbmdNYXRlcmlhbDtcclxuXHRcdGNvbnN0IGNvcHlNYXRlcmlhbCA9IHRoaXMuY29weU1hdGVyaWFsO1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldFByZXZpb3VzID0gdGhpcy5yZW5kZXJUYXJnZXRQcmV2aW91cztcclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldEx1bWlub3NpdHkgPSB0aGlzLnJlbmRlclRhcmdldEx1bWlub3NpdHk7XHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXRBZGFwdGVkID0gdGhpcy5yZW5kZXJUYXJnZXRBZGFwdGVkO1xyXG5cclxuXHRcdGlmKHRoaXMuYWRhcHRpdmUpIHtcclxuXHJcblx0XHRcdC8vIFJlbmRlciB0aGUgbHVtaW5hbmNlIG9mIHRoZSBjdXJyZW50IHNjZW5lIGludG8gYSByZW5kZXIgdGFyZ2V0IHdpdGggbWlwbWFwcGluZyBlbmFibGVkLlxyXG5cdFx0XHRxdWFkLm1hdGVyaWFsID0gbHVtaW5vc2l0eU1hdGVyaWFsO1xyXG5cdFx0XHRsdW1pbm9zaXR5TWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCByZW5kZXJUYXJnZXRMdW1pbm9zaXR5KTtcclxuXHJcblx0XHRcdC8vIFVzZSB0aGUgbmV3IGx1bWluYW5jZSB2YWx1ZXMsIHRoZSBwcmV2aW91cyBsdW1pbmFuY2UgYW5kIHRoZSBmcmFtZSBkZWx0YSB0byBhZGFwdCB0aGUgbHVtaW5hbmNlIG92ZXIgdGltZS5cclxuXHRcdFx0cXVhZC5tYXRlcmlhbCA9IGFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsO1xyXG5cdFx0XHRhZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbC51bmlmb3Jtcy5kZWx0YS52YWx1ZSA9IGRlbHRhO1xyXG5cdFx0XHRhZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbC51bmlmb3Jtcy50UHJldmlvdXNMdW0udmFsdWUgPSByZW5kZXJUYXJnZXRQcmV2aW91cy50ZXh0dXJlO1xyXG5cdFx0XHRhZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbC51bmlmb3Jtcy50Q3VycmVudEx1bS52YWx1ZSA9IHJlbmRlclRhcmdldEx1bWlub3NpdHkudGV4dHVyZTtcclxuXHRcdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldEFkYXB0ZWQpO1xyXG5cclxuXHRcdFx0Ly8gQ29weSB0aGUgbmV3IGFkYXB0ZWQgbHVtaW5hbmNlIHZhbHVlIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgYnkgdGhlIG5leHQgZnJhbWUuXHJcblx0XHRcdHF1YWQubWF0ZXJpYWwgPSBjb3B5TWF0ZXJpYWw7XHJcblx0XHRcdGNvcHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlbmRlclRhcmdldEFkYXB0ZWQudGV4dHVyZTtcclxuXHRcdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldFByZXZpb3VzKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXBwbHkgdGhlIHRvbmUgbWFwcGluZyB0byB0aGUgY29sb3Vycy5cclxuXHRcdHF1YWQubWF0ZXJpYWwgPSB0b25lTWFwcGluZ01hdGVyaWFsO1xyXG5cdFx0dG9uZU1hcHBpbmdNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgc29tZXRoaW5nIGludG8gdGhlIHByZXZpb3VzIGx1bWlub3NpdHkgdGV4dHVyZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICovXHJcblxyXG5cdGluaXRpYWxpc2UocmVuZGVyZXIpIHtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSBuZXcgTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHg3ZmZmZmYgfSk7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVGFyZ2V0UHJldmlvdXMpO1xyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsLmRpc3Bvc2UoKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQSBjb21waWxhdGlvbiBvZiB0aGUgcG9zdCBwcm9jZXNzaW5nIHBhc3Nlcy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9wYXNzZXNcclxuICovXHJcblxyXG5leHBvcnQgeyBCbG9vbVBhc3MgfSBmcm9tIFwiLi9ibG9vbS5qc1wiO1xyXG5leHBvcnQgeyBCbHVyUGFzcyB9IGZyb20gXCIuL2JsdXIuanNcIjtcclxuZXhwb3J0IHsgQm9rZWhQYXNzIH0gZnJvbSBcIi4vYm9rZWguanNcIjtcclxuZXhwb3J0IHsgQm9rZWgyUGFzcyB9IGZyb20gXCIuL2Jva2VoMi5qc1wiO1xyXG5leHBvcnQgeyBDbGVhclBhc3MgfSBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5leHBvcnQgeyBDbGVhck1hc2tQYXNzIH0gZnJvbSBcIi4vY2xlYXItbWFzay5qc1wiO1xyXG5leHBvcnQgeyBEb3RTY3JlZW5QYXNzIH0gZnJvbSBcIi4vZG90LXNjcmVlbi5qc1wiO1xyXG5leHBvcnQgeyBEZXB0aFBhc3MgfSBmcm9tIFwiLi9kZXB0aC5qc1wiO1xyXG5leHBvcnQgeyBGaWxtUGFzcyB9IGZyb20gXCIuL2ZpbG0uanNcIjtcclxuZXhwb3J0IHsgR2xpdGNoTW9kZSwgR2xpdGNoUGFzcyB9IGZyb20gXCIuL2dsaXRjaC5qc1wiO1xyXG5leHBvcnQgeyBHb2RSYXlzUGFzcyB9IGZyb20gXCIuL2dvZC1yYXlzLmpzXCI7XHJcbmV4cG9ydCB7IE1hc2tQYXNzIH0gZnJvbSBcIi4vbWFzay5qc1wiO1xyXG5leHBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5leHBvcnQgeyBQaXhlbGF0aW9uUGFzcyB9IGZyb20gXCIuL3BpeGVsYXRpb24uanNcIjtcclxuZXhwb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gXCIuL3JlbmRlci5qc1wiO1xyXG5leHBvcnQgeyBTYXZlUGFzcyB9IGZyb20gXCIuL3NhdmUuanNcIjtcclxuZXhwb3J0IHsgU2hhZGVyUGFzcyB9IGZyb20gXCIuL3NoYWRlci5qc1wiO1xyXG5leHBvcnQgeyBTaG9ja1dhdmVQYXNzIH0gZnJvbSBcIi4vc2hvY2std2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTTUFBUGFzcyB9IGZyb20gXCIuL3NtYWEuanNcIjtcclxuZXhwb3J0IHsgVGV4dHVyZVBhc3MgfSBmcm9tIFwiLi90ZXh0dXJlLmpzXCI7XHJcbmV4cG9ydCB7IFRvbmVNYXBwaW5nUGFzcyB9IGZyb20gXCIuL3RvbmUtbWFwcGluZy5qc1wiO1xyXG4iLCJpbXBvcnQge1xyXG5cdERlcHRoU3RlbmNpbEZvcm1hdCxcclxuXHREZXB0aFRleHR1cmUsXHJcblx0TGluZWFyRmlsdGVyLFxyXG5cdFJHQkFGb3JtYXQsXHJcblx0UkdCRm9ybWF0LFxyXG5cdFVuc2lnbmVkSW50MjQ4VHlwZSxcclxuXHRXZWJHTFJlbmRlclRhcmdldFxyXG59IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IHsgQ2xlYXJNYXNrUGFzcywgTWFza1Bhc3MsIFNoYWRlclBhc3MgfSBmcm9tIFwiLi4vcGFzc2VzXCI7XHJcbmltcG9ydCB7IENvcHlNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRWZmZWN0Q29tcG9zZXIgbWF5IGJlIHVzZWQgaW4gcGxhY2Ugb2YgYSBub3JtYWwgV2ViR0xSZW5kZXJlci5cclxuICpcclxuICogVGhlIGF1dG8gY2xlYXIgYmVoYXZpb3VyIG9mIHRoZSBwcm92aWRlZCByZW5kZXJlciB3aWxsIGJlIGRpc2FibGVkIHRvIHByZXZlbnRcclxuICogdW5uZWNlc3NhcnkgY2xlYXIgb3BlcmF0aW9ucy5cclxuICpcclxuICogSXQgaXMgY29tbW9uIHByYWN0aWNlIHRvIHVzZSBhIHtAbGluayBSZW5kZXJQYXNzfSBhcyB0aGUgZmlyc3QgcGFzcyB0b1xyXG4gKiBhdXRvbWF0aWNhbGx5IGNsZWFyIHRoZSBzY3JlZW4gYW5kIHJlbmRlciB0aGUgc2NlbmUgdG8gYSB0ZXh0dXJlIGZvciBmdXJ0aGVyXHJcbiAqIHByb2Nlc3NpbmcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEVmZmVjdENvbXBvc2VyIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBlZmZlY3QgY29tcG9zZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IFtyZW5kZXJlcl0gLSBUaGUgcmVuZGVyZXIgdGhhdCBzaG91bGQgYmUgdXNlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kZXB0aEJ1ZmZlcj10cnVlXSAtIFdoZXRoZXIgdGhlIG1haW4gcmVuZGVyIHRhcmdldHMgc2hvdWxkIGhhdmUgYSBkZXB0aCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zdGVuY2lsQnVmZmVyPWZhbHNlXSAtIFdoZXRoZXIgdGhlIG1haW4gcmVuZGVyIHRhcmdldHMgc2hvdWxkIGhhdmUgYSBzdGVuY2lsIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRlcHRoVGV4dHVyZT1mYWxzZV0gLSBTZXQgdG8gdHJ1ZSBpZiBvbmUgb2YgeW91ciBwYXNzZXMgcmVsaWVzIG9uIGEgZGVwdGggdGV4dHVyZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IocmVuZGVyZXIgPSBudWxsLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZW5kZXJlci5cclxuXHRcdCAqXHJcblx0XHQgKiBZb3UgbWF5IHJlcGxhY2UgdGhlIHJlbmRlcmVyIGF0IGFueSB0aW1lIGJ5IHVzaW5nXHJcblx0XHQgKiB7QGxpbmsgRWZmZWN0Q29tcG9zZXIjcmVwbGFjZVJlbmRlcmVyfS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJlcn1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZWFkIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBSZWFkaW5nIGZyb20gYW5kIHdyaXRpbmcgdG8gdGhlIHNhbWUgcmVuZGVyIHRhcmdldCBzaG91bGQgYmUgYXZvaWRlZC5cclxuXHRcdCAqIFRoZXJlZm9yZSwgdHdvIHNlcGVyYXRlIHlldCBpZGVudGljYWwgYnVmZmVycyBhcmUgdXNlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMud3JpdGVCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdGlmKHRoaXMucmVuZGVyZXIgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcihcclxuXHRcdFx0XHQob3B0aW9ucy5kZXB0aEJ1ZmZlciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuZGVwdGhCdWZmZXIgOiB0cnVlLFxyXG5cdFx0XHRcdChvcHRpb25zLnN0ZW5jaWxCdWZmZXIgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnN0ZW5jaWxCdWZmZXIgOiBmYWxzZSxcclxuXHRcdFx0XHQob3B0aW9ucy5kZXB0aFRleHR1cmUgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmRlcHRoVGV4dHVyZSA6IGZhbHNlXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLmNsb25lKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb3B5IHBhc3MgdXNlZCBmb3IgY29weWluZyBtYXNrZWQgc2NlbmVzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaGFkZXJQYXNzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weVBhc3MgPSBuZXcgU2hhZGVyUGFzcyhuZXcgQ29weU1hdGVyaWFsKCkpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHBhc3Nlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UGFzc1tdfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucGFzc2VzID0gW107XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRlcHRoIHRleHR1cmUgb2YgdGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7RGVwdGhUZXh0dXJlfVxyXG5cdCAqIEBkZWZhdWx0IG51bGxcclxuXHQgKi9cclxuXHJcblx0Z2V0IGRlcHRoVGV4dHVyZSgpIHsgcmV0dXJuIHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMgc2hhcmUgYSBzaW5nbGUgZGVwdGggdGV4dHVyZS4gRGVwdGggd2lsbCBiZVxyXG5cdCAqIHdyaXR0ZW4gdG8gdGhpcyB0ZXh0dXJlIHdoZW4gc29tZXRoaW5nIGlzIHJlbmRlcmVkIGludG8gb25lIG9mIHRoZSBidWZmZXJzXHJcblx0ICogYW5kIHRoZSBpbnZvbHZlZCBtYXRlcmlhbHMgaGF2ZSBkZXB0aCB3cml0ZSBlbmFibGVkLlxyXG5cdCAqXHJcblx0ICogWW91IG1heSBlbmFibGUgdGhpcyBtZWNoYW5pc20gZHVyaW5nIHRoZSBpbnN0YW50aWF0aW9uIG9mIHRoZSBjb21wb3NlciBvclxyXG5cdCAqIGJ5IGFzc2lnbmluZyBhIERlcHRoVGV4dHVyZSBpbnN0YW5jZSBsYXRlciBvbi4gWW91IG1heSBhbHNvIGRpc2FibGUgaXQgYnlcclxuXHQgKiBhc3NpZ25pbmcgbnVsbC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEZXB0aFRleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCBkZXB0aFRleHR1cmUoeCkge1xyXG5cclxuXHRcdHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmUgPSB4O1xyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlci5kZXB0aFRleHR1cmUgPSB4O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBjdXJyZW50IHJlbmRlcmVyIHdpdGggdGhlIGdpdmVuIG9uZS4gVGhlIERPTSBlbGVtZW50IG9mIHRoZVxyXG5cdCAqIGN1cnJlbnQgcmVuZGVyZXIgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IG5vZGUgYW5kIHRoZVxyXG5cdCAqIERPTSBlbGVtZW50IG9mIHRoZSBuZXcgcmVuZGVyZXIgd2lsbCB0YWtlIGl0cyBwbGFjZS5cclxuXHQgKlxyXG5cdCAqIFRoZSBhdXRvIGNsZWFyIG1lY2hhbmlzbSBvZiB0aGUgcHJvdmlkZWQgcmVuZGVyZXIgd2lsbCBiZSBkaXNhYmxlZC5cclxuXHQgKlxyXG5cdCAqIFN3aXRjaGluZyBiZXR3ZWVuIHJlbmRlcmVycyBhbGxvd3MgeW91IHRvIGR5bmFtaWNhbGx5IGVuYWJsZSBvciBkaXNhYmxlXHJcblx0ICogYW50aWFsaWFzaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSBuZXcgcmVuZGVyZXIuXHJcblx0ICogQHJldHVybiB7V2ViR0xSZW5kZXJlcn0gVGhlIG9sZCByZW5kZXJlci5cclxuXHQgKi9cclxuXHJcblx0cmVwbGFjZVJlbmRlcmVyKHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0Y29uc3Qgb2xkUmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cclxuXHRcdGxldCBwYXJlbnQsIG9sZFNpemUsIG5ld1NpemU7XHJcblxyXG5cdFx0aWYob2xkUmVuZGVyZXIgIT09IG51bGwgJiYgb2xkUmVuZGVyZXIgIT09IHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHRwYXJlbnQgPSBvbGRSZW5kZXJlci5kb21FbGVtZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZFNpemUgPSBvbGRSZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRcdG5ld1NpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XHJcblxyXG5cdFx0XHRpZihwYXJlbnQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKG9sZFJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG9sZFNpemUud2lkdGggIT09IG5ld1NpemUud2lkdGggfHwgb2xkU2l6ZS5oZWlnaHQgIT09IG5ld1NpemUuaGVpZ2h0KSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2V0U2l6ZSgpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gb2xkUmVuZGVyZXI7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyByZW5kZXIgdGFyZ2V0IGJ5IHJlcGxpY2F0aW5nIHRoZSByZW5kZXJlcidzIGNhbnZhcy5cclxuXHQgKlxyXG5cdCAqIFRoZSBjcmVhdGVkIHJlbmRlciB0YXJnZXQgdXNlcyBhIGxpbmVhciBmaWx0ZXIgZm9yIHRleGVsIG1pbmlmaWNhdGlvbiBhbmRcclxuXHQgKiBtYWduaWZpY2F0aW9uLiBJdHMgcmVuZGVyIHRleHR1cmUgZm9ybWF0IGRlcGVuZHMgb24gd2hldGhlciB0aGUgcmVuZGVyZXJcclxuXHQgKiB1c2VzIHRoZSBhbHBoYSBjaGFubmVsLiBNaXBtYXBzIGFyZSBkaXNhYmxlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVwdGhCdWZmZXIgLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBoYXZlIGEgZGVwdGggYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RlbmNpbEJ1ZmZlciAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBzdGVuY2lsIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGRlcHRoVGV4dHVyZSAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBkZXB0aCB0ZXh0dXJlLlxyXG5cdCAqIEByZXR1cm4ge1dlYkdMUmVuZGVyVGFyZ2V0fSBBIG5ldyByZW5kZXIgdGFyZ2V0IHRoYXQgZXF1YWxzIHRoZSByZW5kZXJlcidzIGNhbnZhcy5cclxuXHQgKi9cclxuXHJcblx0Y3JlYXRlQnVmZmVyKGRlcHRoQnVmZmVyLCBzdGVuY2lsQnVmZmVyLCBkZXB0aFRleHR1cmUpIHtcclxuXHJcblx0XHRjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblx0XHRjb25zdCBhbHBoYSA9IHRoaXMucmVuZGVyZXIuY29udGV4dC5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFscGhhO1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldCA9IG5ldyBXZWJHTFJlbmRlclRhcmdldChzaXplLndpZHRoICogcGl4ZWxSYXRpbywgc2l6ZS5oZWlnaHQgKiBwaXhlbFJhdGlvLCB7XHJcblx0XHRcdG1pbkZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRtYWdGaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0Zm9ybWF0OiBhbHBoYSA/IFJHQkFGb3JtYXQgOiBSR0JGb3JtYXQsXHJcblx0XHRcdGRlcHRoQnVmZmVyOiBkZXB0aEJ1ZmZlcixcclxuXHRcdFx0c3RlbmNpbEJ1ZmZlcjogc3RlbmNpbEJ1ZmZlcixcclxuXHRcdFx0ZGVwdGhUZXh0dXJlOiBkZXB0aFRleHR1cmUgPyBuZXcgRGVwdGhUZXh0dXJlKCkgOiBudWxsXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihkZXB0aFRleHR1cmUgJiYgc3RlbmNpbEJ1ZmZlcikge1xyXG5cclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmRlcHRoVGV4dHVyZS5mb3JtYXQgPSBEZXB0aFN0ZW5jaWxGb3JtYXQ7XHJcblx0XHRcdHJlbmRlclRhcmdldC5kZXB0aFRleHR1cmUudHlwZSA9IFVuc2lnbmVkSW50MjQ4VHlwZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyVGFyZ2V0LnRleHR1cmUubmFtZSA9IFwiRWZmZWN0Q29tcG9zZXIuQnVmZmVyXCI7XHJcblx0XHRyZW5kZXJUYXJnZXQudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyVGFyZ2V0O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBwYXNzLCBvcHRpb25hbGx5IGF0IGEgc3BlY2lmaWMgaW5kZXguXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1Bhc3N9IHBhc3MgLSBBIG5ldyBwYXNzLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbaW5kZXhdIC0gQW4gaW5kZXggYXQgd2hpY2ggdGhlIHBhc3Mgc2hvdWxkIGJlIGluc2VydGVkLlxyXG5cdCAqL1xyXG5cclxuXHRhZGRQYXNzKHBhc3MsIGluZGV4KSB7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblxyXG5cdFx0cGFzcy5zZXRTaXplKHNpemUud2lkdGggKiBwaXhlbFJhdGlvLCBzaXplLmhlaWdodCAqIHBpeGVsUmF0aW8pO1xyXG5cdFx0cGFzcy5pbml0aWFsaXNlKHJlbmRlcmVyLCByZW5kZXJlci5jb250ZXh0LmdldENvbnRleHRBdHRyaWJ1dGVzKCkuYWxwaGEpO1xyXG5cclxuXHRcdGlmKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHRoaXMucGFzc2VzLnNwbGljZShpbmRleCwgMCwgcGFzcyk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHRoaXMucGFzc2VzLnB1c2gocGFzcyk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQYXNzfSBwYXNzIC0gVGhlIHBhc3MuXHJcblx0ICovXHJcblxyXG5cdHJlbW92ZVBhc3MocGFzcykge1xyXG5cclxuXHRcdHRoaXMucGFzc2VzLnNwbGljZSh0aGlzLnBhc3Nlcy5pbmRleE9mKHBhc3MpLCAxKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIGFsbCBlbmFibGVkIHBhc3NlcyBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIGFkZGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhIC0gVGhlIHRpbWUgYmV0d2VlbiB0aGUgbGFzdCBmcmFtZSBhbmQgdGhlIGN1cnJlbnQgb25lIGluIHNlY29uZHMuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihkZWx0YSkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cdFx0Y29uc3QgY29weVBhc3MgPSB0aGlzLmNvcHlQYXNzO1xyXG5cclxuXHRcdGxldCByZWFkQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyO1xyXG5cdFx0bGV0IHdyaXRlQnVmZmVyID0gdGhpcy53cml0ZUJ1ZmZlcjtcclxuXHJcblx0XHRsZXQgbWFza0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0bGV0IHBhc3MsIGNvbnRleHQsIGJ1ZmZlcjtcclxuXHRcdGxldCBpLCBsO1xyXG5cclxuXHRcdGZvcihpID0gMCwgbCA9IHBhc3Nlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuXHJcblx0XHRcdHBhc3MgPSBwYXNzZXNbaV07XHJcblxyXG5cdFx0XHRpZihwYXNzLmVuYWJsZWQpIHtcclxuXHJcblx0XHRcdFx0cGFzcy5yZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSwgbWFza0FjdGl2ZSk7XHJcblxyXG5cdFx0XHRcdGlmKHBhc3MubmVlZHNTd2FwKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYobWFza0FjdGl2ZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0Y29udGV4dCA9IHJlbmRlcmVyLmNvbnRleHQ7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc3RlbmNpbEZ1bmMoY29udGV4dC5OT1RFUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblx0XHRcdFx0XHRcdGNvcHlQYXNzLnJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpO1xyXG5cdFx0XHRcdFx0XHRjb250ZXh0LnN0ZW5jaWxGdW5jKGNvbnRleHQuRVFVQUwsIDEsIDB4ZmZmZmZmZmYpO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidWZmZXIgPSByZWFkQnVmZmVyO1xyXG5cdFx0XHRcdFx0cmVhZEJ1ZmZlciA9IHdyaXRlQnVmZmVyO1xyXG5cdFx0XHRcdFx0d3JpdGVCdWZmZXIgPSBidWZmZXI7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYocGFzcyBpbnN0YW5jZW9mIE1hc2tQYXNzKSB7XHJcblxyXG5cdFx0XHRcdFx0bWFza0FjdGl2ZSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSBpZihwYXNzIGluc3RhbmNlb2YgQ2xlYXJNYXNrUGFzcykge1xyXG5cclxuXHRcdFx0XHRcdG1hc2tBY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBidWZmZXJzIGFuZCB0aGUgcmVuZGVyZXIncyBvdXRwdXQgY2FudmFzLlxyXG5cdCAqXHJcblx0ICogRXZlcnkgcGFzcyB3aWxsIGJlIGluZm9ybWVkIG9mIHRoZSBuZXcgc2l6ZS4gSXQncyB1cCB0byBlYWNoIHBhc3MgaG93IHRoYXRcclxuXHQgKiBpbmZvcm1hdGlvbiBpcyB1c2VkLlxyXG5cdCAqXHJcblx0ICogSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGlzIHNwZWNpZmllZCwgdGhlIHJlbmRlciB0YXJnZXRzIGFuZCBwYXNzZXMgd2lsbCBiZVxyXG5cdCAqIHVwZGF0ZWQgd2l0aCB0aGUgY3VycmVudCBzaXplIG9mIHRoZSByZW5kZXJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGhdIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XSAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHRoaXMucmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xyXG5cclxuXHRcdGxldCBpLCBsO1xyXG5cclxuXHRcdGlmKHdpZHRoID09PSB1bmRlZmluZWQgfHwgaGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHdpZHRoID0gc2l6ZS53aWR0aDtcclxuXHRcdFx0aGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR3aWR0aCAqPSBwaXhlbFJhdGlvO1xyXG5cdFx0aGVpZ2h0ICo9IHBpeGVsUmF0aW87XHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLndyaXRlQnVmZmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0Zm9yKGkgPSAwLCBsID0gcGFzc2VzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0cGFzc2VzW2ldLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGlzIGNvbXBvc2VyIGJ5IGRlbGV0aW5nIGFsbCBwYXNzZXMgYW5kIGNyZWF0aW5nIG5ldyBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gW3JlbmRlclRhcmdldF0gLSBBIG5ldyByZW5kZXIgdGFyZ2V0LiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgc2V0dGluZ3Mgb2YgdGhlIHJlbmRlcmVyIHdpbGwgYmUgdXNlZC5cclxuXHQgKi9cclxuXHJcblx0cmVzZXQocmVuZGVyVGFyZ2V0KSB7XHJcblxyXG5cdFx0Y29uc3QgZGVwdGhCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuZGVwdGhCdWZmZXI7XHJcblx0XHRjb25zdCBzdGVuY2lsQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLnN0ZW5jaWxCdWZmZXI7XHJcblx0XHRjb25zdCBkZXB0aFRleHR1cmUgPSAodGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZSAhPT0gbnVsbCk7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlKChyZW5kZXJUYXJnZXQgPT09IHVuZGVmaW5lZCkgP1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUJ1ZmZlcihkZXB0aEJ1ZmZlciwgc3RlbmNpbEJ1ZmZlciwgZGVwdGhUZXh0dXJlKSA6XHJcblx0XHRcdHJlbmRlclRhcmdldFxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXN0cm95cyBhbGwgcGFzc2VzIGFuZCByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIFRoaXMgbWV0aG9kIGRlYWxsb2NhdGVzIGFsbCByZW5kZXIgdGFyZ2V0cywgdGV4dHVyZXMgYW5kIG1hdGVyaWFscyBjcmVhdGVkXHJcblx0ICogYnkgdGhlIHBhc3Nlcy4gSXQgYWxzbyBkZWxldGVzIHRoaXMgY29tcG9zZXIncyBmcmFtZSBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gW3JlbmRlclRhcmdldF0gLSBBIG5ldyByZW5kZXIgdGFyZ2V0LiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgY29tcG9zZXIgd2lsbCBiZWNvbWUgaW5vcGVyYXRpdmUuXHJcblx0ICovXHJcblxyXG5cdGRpc3Bvc2UocmVuZGVyVGFyZ2V0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblxyXG5cdFx0aWYodGhpcy5yZWFkQnVmZmVyICE9PSBudWxsICYmIHRoaXMud3JpdGVCdWZmZXIgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlci5kaXNwb3NlKCk7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyID0gbnVsbDtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlKHBhc3Nlcy5sZW5ndGggPiAwKSB7XHJcblxyXG5cdFx0XHRwYXNzZXMucG9wKCkuZGlzcG9zZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZihyZW5kZXJUYXJnZXQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0Ly8gUmVhbmltYXRlLlxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSByZW5kZXJUYXJnZXQ7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuY2xvbmUoKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dGhpcy5jb3B5UGFzcy5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3JlIGNvbXBvbmVudHMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvY29yZVxyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSBcIi4vZWZmZWN0LWNvbXBvc2VyLmpzXCI7XHJcbiIsIi8qKlxyXG4gKiBFeHBvc3VyZSBvZiB0aGUgbGlicmFyeSBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwiLi9jb3JlXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdEJsb29tUGFzcyxcclxuXHRCbHVyUGFzcyxcclxuXHRCb2tlaFBhc3MsXHJcblx0Qm9rZWgyUGFzcyxcclxuXHRDbGVhclBhc3MsXHJcblx0Q2xlYXJNYXNrUGFzcyxcclxuXHREZXB0aFBhc3MsXHJcblx0RG90U2NyZWVuUGFzcyxcclxuXHRGaWxtUGFzcyxcclxuXHRHbGl0Y2hNb2RlLFxyXG5cdEdsaXRjaFBhc3MsXHJcblx0R29kUmF5c1Bhc3MsXHJcblx0TWFza1Bhc3MsXHJcblx0UGFzcyxcclxuXHRQaXhlbGF0aW9uUGFzcyxcclxuXHRSZW5kZXJQYXNzLFxyXG5cdFNhdmVQYXNzLFxyXG5cdFNoYWRlclBhc3MsXHJcblx0U2hvY2tXYXZlUGFzcyxcclxuXHRTTUFBUGFzcyxcclxuXHRUZXh0dXJlUGFzcyxcclxuXHRUb25lTWFwcGluZ1Bhc3NcclxufSBmcm9tIFwiLi9wYXNzZXNcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0QWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0Qm9rZWhNYXRlcmlhbCxcclxuXHRCb2tlaDJNYXRlcmlhbCxcclxuXHRDb21iaW5lTWF0ZXJpYWwsXHJcblx0Q29udm9sdXRpb25NYXRlcmlhbCxcclxuXHRDb3B5TWF0ZXJpYWwsXHJcblx0RGVwdGhNYXRlcmlhbCxcclxuXHREb3RTY3JlZW5NYXRlcmlhbCxcclxuXHRGaWxtTWF0ZXJpYWwsXHJcblx0R2xpdGNoTWF0ZXJpYWwsXHJcblx0R29kUmF5c01hdGVyaWFsLFxyXG5cdEtlcm5lbFNpemUsXHJcblx0THVtaW5vc2l0eU1hdGVyaWFsLFxyXG5cdFBpeGVsYXRpb25NYXRlcmlhbCxcclxuXHRTaG9ja1dhdmVNYXRlcmlhbCxcclxuXHRTTUFBQmxlbmRNYXRlcmlhbCxcclxuXHRTTUFBQ29sb3JFZGdlc01hdGVyaWFsLFxyXG5cdFNNQUFXZWlnaHRzTWF0ZXJpYWwsXHJcblx0VG9uZU1hcHBpbmdNYXRlcmlhbFxyXG59IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG4iLCJpbXBvcnQge1xuICBFZmZlY3RDb21wb3NlcixcbiAgUmVuZGVyUGFzcyxcbiAgU2hhZGVyUGFzc1xufSBmcm9tICdwb3N0cHJvY2Vzc2luZyc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuY29uc3QgcG9seWZpbGwgPSAob2JqZWN0LCBtZXRob2QsIHNob3dXYXJuID0gdHJ1ZSkgPT4ge1xuICBpZiAob2JqZWN0W21ldGhvZF0pIHJldHVybjtcbiAgaWYgKHNob3dXYXJuKSBjb25zb2xlLndhcm4oYEBQb3N0UHJvY2Vzc29yTW9kdWxlOiBwYXNzLiR7bWV0aG9kfSgpIHdhcyBub3QgZm91bmQuYCwgb2JqZWN0KTtcbiAgb2JqZWN0W21ldGhvZF0gPSAoKSA9PiB7fTtcbn07XG5cbmV4cG9ydCBjbGFzcyBQb3N0UHJvY2Vzc29yTW9kdWxlIHtcbiAgY3VycmVudFBhc3MgPSBudWxsO1xuXG4gIGRlZmVyID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3Ioe2RlYnVnfSA9IHtkZWJ1ZzogdHJ1ZX0pIHtcbiAgICB0aGlzLmRlYnVnID0gZGVidWc7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncG9zdHByb2Nlc3NvcicpO1xuXG4gICAgdGhpcy5lZmZlY3RzID0gbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLmVmZmVjdHM7XG4gICAgdGhpcy5yZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHRoaXMuc2NlbmUgPSBtYW5hZ2VyLmdldCgnc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHRoaXMuY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIodGhpcy5yZW5kZXJlcik7XG5cbiAgICBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykuc3RvcCgpO1xuXG4gICAgY29uc3QgY29tcG9zZXIgPSB0aGlzLmNvbXBvc2VyO1xuICAgIHRoaXMucmVuZGVyTG9vcCA9IG5ldyBMb29wKGNsb2NrID0+IGNvbXBvc2VyLnJlbmRlcihjbG9jay5nZXREZWx0YSgpKSkuc3RhcnQobWFuYWdlci5oYW5kbGVyKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIHJlbmRlcmVyOiByZW5kZXJlciA9PiB7XG4gICAgICAgIHRoaXMuY29tcG9zZXIucmVwbGFjZVJlbmRlcmVyKHJlbmRlcmVyKTtcbiAgICAgIH0sXG5cbiAgICAgIHNjZW5lOiBzY2VuZSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICAgIH0sXG5cbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc29sdmUoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgcGFzcyA9IG5ldyBSZW5kZXJQYXNzKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLm5hdGl2ZSk7XG5cbiAgICAgIC8vIFRPRE86IFN1cHBvcnQgZm9yIGVmZmVjdHMuXG5cbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBBUElcblxuICBwYXNzKHBhc3MpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgcG9seWZpbGwocGFzcywgJ3NldFNpemUnLCB0aGlzLmRlYnVnKTtcbiAgICAgIHBvbHlmaWxsKHBhc3MsICdpbml0aWFsaXNlJywgdGhpcy5kZWJ1Zyk7XG5cbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzaGFkZXIobWF0ZXJpYWwsIHRleHR1cmVJRCA9ICdyZWFkQnVmZmVyJykge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBpZiAoIW1hdGVyaWFsLnVuaWZvcm1zW3RleHR1cmVJRF0pXG4gICAgICAgIG1hdGVyaWFsLnVuaWZvcm1zW3RleHR1cmVJRF0gPSB7dmFsdWU6IG51bGx9O1xuXG4gICAgICBjb25zdCBwYXNzID0gbmV3IFNoYWRlclBhc3MobWF0ZXJpYWwsIHRleHR1cmVJRCk7XG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gUGFzcyBBUElcblxuICBnZXQobmFtZSkge1xuICAgIHJldHVybiBuYW1lXG4gICAgICA/IHRoaXMuY29tcG9zZXIucGFzc2VzLmZpbHRlcihwYXNzID0+IHBhc3MubmFtZSA9PT0gbmFtZSlbMF1cbiAgICAgIDogdGhpcy5jdXJyZW50UGFzcztcbiAgfVxuXG4gIHRvKG5hbWUpIHtcbiAgICB0aGlzLmN1cnJlbnRQYXNzID0gbmFtZTtcbiAgfVxuXG4gIHJlbmRlclRvU2NyZWVuKGJvb2wgPSB0cnVlKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MucmVuZGVyVG9TY3JlZW4gPSBib29sO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuYW1lKG5hbWUpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFzcy5uYW1lID0gbmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRXZlbnRzUGF0Y2hNb2R1bGUge1xuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnZXZlbnRzJyk7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJykuZG9tRWxlbWVudDtcbiAgfVxuXG4gIHBhdGNoRXZlbnRzKG9yaWdpbk9iamVjdCwgZGVzdE9iamVjdCwgZXZlbnRzID0gW10pIHtcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxuICAgICAgb3JpZ2luT2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGUgPT4gZGVzdE9iamVjdC5lbWl0KGV2ZW50LCBlKSlcbiAgICApO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBjb25zdCB7ZWxlbWVudCwgcGF0Y2hFdmVudHN9ID0gc2VsZjtcblxuICAgIHBhdGNoRXZlbnRzKGVsZW1lbnQsIHRoaXMsIFtcbiAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgJ2NvbnRleHRtZW51JyxcbiAgICAgICdtb3VzZWRvd24nLFxuICAgICAgJ2NsaWNrJyxcbiAgICAgICd3aGVlbCcsXG4gICAgICAndG91Y2hzdGFydCcsXG4gICAgICAndG91Y2hlbmQnLFxuICAgICAgJ3RvdWNobW92ZScsXG4gICAgICAna2V5ZG93bidcbiAgICBdKTtcblxuICAgIHBhdGNoRXZlbnRzKGVsZW1lbnQsIHRoaXMsIFtcbiAgICAgICdrZXlkb3duJyxcbiAgICAgICdrZXl1cCcsXG4gICAgICAna2V5cHJlc3MnXG4gICAgXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFZlY3RvcjIsXG4gIFJheWNhc3RlcixcbiAgUGxhbmUsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge0V2ZW50c1BhdGNoTW9kdWxlfSBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcblxuLyoqXG4gKiBAY2xhc3MgVmlydHVhbE1vdXNlTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2dsb2JhbE1vdmVtZW50PWZhbHNlXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4dGVuZHMgRXZlbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsTW91c2VNb2R1bGUgZXh0ZW5kcyBFdmVudHMge1xuICBtb3VzZSA9IG5ldyBWZWN0b3IyKCk7XG4gIHJheWNhc3RlciA9IG5ldyBSYXljYXN0ZXIoKTtcbiAgd29ybGQgPSBudWxsO1xuICBjYW52YXMgPSBudWxsO1xuICBwcm9qZWN0aW9uUGxhbmUgPSBuZXcgUGxhbmUobmV3IFZlY3RvcjMoMCwgMCwgMSksIDApO1xuXG4gIGNvbnN0cnVjdG9yKGdsb2JhbE1vdmVtZW50ID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ2xvYmFsTW92ZW1lbnQgPSBnbG9iYWxNb3ZlbWVudDtcbiAgfVxuXG4gIHVwZGF0ZShlLCBjdXN0b21YLCBjdXN0b21ZKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgeCA9IGN1c3RvbVggfHwgZS5jbGllbnRYO1xuICAgIGNvbnN0IHkgPSBjdXN0b21ZIHx8IGUuY2xpZW50WTtcblxuICAgIHRoaXMubW91c2UueCA9ICgoeCAtIHJlY3QubGVmdCkgLyAocmVjdC5yaWdodCAtIHJlY3QubGVmdCkpICogMiAtIDE7XG4gICAgdGhpcy5tb3VzZS55ID0gLSgoeSAtIHJlY3QudG9wKSAvIChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSkgKiAyICsgMTtcblxuICAgIHRoaXMucHJvamVjdGlvblBsYW5lLm5vcm1hbC5jb3B5KHRoaXMuY2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKCkpO1xuXG4gICAgdGhpcy5yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSh0aGlzLm1vdXNlLCB0aGlzLmNhbWVyYSk7XG4gICAgdGhpcy5lbWl0KCdtb3ZlJyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnbW91c2UnKTtcbiAgICBtYW5hZ2VyLnJlcXVpcmUoJ2V2ZW50cycsICgpID0+IG5ldyBFdmVudHNQYXRjaE1vZHVsZSgpKTtcblxuICAgIHRoaXMuY2FudmFzID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJykuZG9tRWxlbWVudDtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmU7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIFtcbiAgICAgICdjbGljaycsXG4gICAgICAnbW91c2Vkb3duJyxcbiAgICAgICdtb3VzZXVwJyxcbiAgICAgICdtb3VzZW1vdmUnXG4gICAgXS5mb3JFYWNoKGV2ID0+IHRoaXMub24oZXYsIGUgPT4gc2VsZi5lbWl0KGV2LCBlKSkpO1xuXG4gICAgc2VsZi5nbG9iYWxYID0gMDtcbiAgICBzZWxmLmdsb2JhbFkgPSAwO1xuXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQucG9pbnRlckxvY2tFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNlbGYuZ2xvYmFsWCArPSBlLm1vdmVtZW50WDtcbiAgICAgICAgc2VsZi5nbG9iYWxZICs9IGUubW92ZW1lbnRZO1xuXG4gICAgICAgIHNlbGYudXBkYXRlKGUsIHNlbGYuZ2xvYmFsWCwgc2VsZi5nbG9iYWxZKTtcbiAgICAgIH0gZWxzZSBzZWxmLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRyYWNrKGNvbXBvbmVudCwgbmVzdGVkID0gdHJ1ZSkge1xuICAgIGxldCBpc0hvdmVyZWQgPSBmYWxzZTtcblxuICAgIHRoaXMub24oJ21vdmUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ob3ZlcnMoY29tcG9uZW50LCBuZXN0ZWQpKSB7XG4gICAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZW1vdmUnKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29tcG9uZW50LmVtaXQoJ21vdXNlb3ZlcicpO1xuICAgICAgICAgIGlzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNIb3ZlcmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC5lbWl0KCdtb3VzZW91dCcpO1xuICAgICAgICBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ2NsaWNrJyk7XG4gICAgICBlbHNlIGNvbXBvbmVudC5lbWl0KCdvZmZDbGljaycpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNlZG93bicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZXVwJyk7XG4gICAgfSk7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oe25hdGl2ZX0sIG5lc3RlZCA9IHRydWUpIHtcbiAgICBpZiAobmF0aXZlLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgbmVzdGVkKSB7XG4gICAgICBjb25zdCBvYmplY3RzID0gW107XG4gICAgICBuYXRpdmUudHJhdmVyc2UoY2hpbGQgPT4gb2JqZWN0cy5wdXNoKGNoaWxkKSk7XG5cbiAgICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKG9iamVjdHMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3QobmF0aXZlKTtcbiAgfVxuXG4gIHByb2plY3QocGxhbmUgPSB0aGlzLnByb2plY3Rpb25QbGFuZSkge1xuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5yYXkuaW50ZXJzZWN0UGxhbmUocGxhbmUpO1xuICB9XG5cbiAgaG92ZXJzKGNvbXBvbmVudCwgbmVzdGVkID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLmludGVyc2VjdGlvbihjb21wb25lbnQsIG5lc3RlZCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCByYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLnJheTtcbiAgfVxuXG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlLng7XG4gIH1cblxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5tb3VzZS55O1xuICB9XG59XG4iLCJpbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5pbXBvcnQge0V2ZW50c1BhdGNoTW9kdWxlfSBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xzTW9kdWxlIHtcbiAgc3RhdGljIGZyb20oY29udHJvbHMpIHtcbiAgICByZXR1cm4gbmV3IENvbnRyb2xzTW9kdWxlKHtjb250cm9sc30pO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY29udHJvbHM6IGZhbHNlLFxuICAgICAgZml4OiBjb250cm9scyA9PiBjb250cm9scyxcblxuICAgICAgdXBkYXRlKGMpIHtcbiAgICAgICAgdGhpcy5jb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICAgIH1cbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5jb250cm9scyA9IHRoaXMucGFyYW1zLmNvbnRyb2xzO1xuICAgIHRoaXMudXBkYXRlID0gdGhpcy5wYXJhbXMudXBkYXRlO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5yZXF1aXJlKCdldmVudHMnLCAoKSA9PiBuZXcgRXZlbnRzUGF0Y2hNb2R1bGUoKSk7XG4gIH1cblxuICBzZXRDb250cm9scyhjb250cm9scykge1xuICAgIHRoaXMuY29udHJvbHMgPSBjb250cm9scztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFVwZGF0ZSh1cGRhdGUpIHtcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi51cGRhdGVMb29wID0gbmV3IExvb3Aoc2VsZi51cGRhdGUuYmluZChzZWxmKSk7XG4gICAgc2VsZi51cGRhdGVMb29wLnN0YXJ0KHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBGb2dFeHAyLFxuICBGb2dcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBGb2dNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2NvbG9yOiAweGVmZDFiNSwgZGVuc2l0eTogMC4wMjAsIG5lYXI6IDEwLCBmYXI6IDEwMDB9XSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbdHlwZT1leHAyXSAtIFRoZSB0eXBlIG9mIGZvZyAtIGV4cDIgb3IgbGluZWFyXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Ib3cgdG8gY3JlYXRlIGFuZCBhcHBseSBhIEZvZ01vZHVsZTwvY2FwdGlvbj5cbiAqIGNvbnN0IGZvZ01vZHVsZSA9IG5ldyBGb2dNb2R1bGUoe1xuICogICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgZGVuc2l0eTogMC4wMyxcbiAqICAgIG5lYXI6IDIwLFxuICogICAgZmFyOiAyMDBcbiAqICB9LCAnZXhwMicpO1xuICpcbiAqIG5ldyBBcHAoW1xuICogIC4uLixcbiAqICBmb2dNb2R1bGVcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRm9nTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIHR5cGUpIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY29sb3I6IDB4ZWZkMWI1LFxuICAgICAgZGVuc2l0eTogMC4wMjAsXG4gICAgICBuZWFyOiAxMCxcbiAgICAgIGZhcjogMTAwMFxuICAgIH0sIHBhcmFtcyk7XG4gICAgaWYgKCF0eXBlIHx8IHR5cGUgPT09ICdleHAyJykgdGhpcy5mb2cgPSBuZXcgRm9nRXhwMih0aGlzLnBhcmFtcy5jb2xvciwgdGhpcy5wYXJhbXMuZGVuc2l0eSk7XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ2xpbmVhcicpIHRoaXMuZm9nID0gbmV3IEZvZyh0aGlzLnBhcmFtcy5jb2xvciwgdGhpcy5wYXJhbXMubmVhciwgdGhpcy5wYXJhbXMuZmFyKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdmb2cnLCB0aGlzLmZvZyk7XG4gICAgbWFuYWdlci5nZXQoJ3NjZW5lJykuZm9nID0gdGhpcy5mb2c7XG4gIH1cbn1cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4JztcblxuY29uc3QgaXNFcXVhbERlZmF1bHQgPSAoYSwgYikgPT4ge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYgKGEgJiYgYS5lcXVhbHMgJiYgYS5lcXVhbHMoYikpIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQGNsYXNzIFN0YXRlTW9kdWxlXG4gKiBAZGVzY3JpcHRpb24gYFN0YXRlTW9kdWxlYCBpcyB1c2VmdWwgZm9yIGFwcHMsIHdoZXJlIHlvdSBuZWVkIHN0YXRlIG1hbmlwdWxhdGlvbi5cbiAqIFRoaXMgY2FuIGJlOiBfdHJhbnNpdGlvbnMgYmV0d2VlbiBzY3JlZW5zLCBnYW1lcywgZGV2ZWxvcG1lbnQgbW9tZW50c18uXG4gKiBZb3UgY2FuIGNoZWNrIFtiYXNpYy9zdGF0ZV0oaHR0cHM6Ly93aHMtZGV2LnN1cmdlLnNoL2V4YW1wbGVzLz9iYXNpYy9zdGF0ZSkgZXhhbXBsZS5cbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSBzdGF0ZSBtb2R1bGU8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgLy8gLi4uXG4gKiAgIG5ldyBTdGF0ZU1vZHVsZSgpLmRlZmF1bHQoe1xuICogICAgIHNwaGVyZUNvbG9yOiAweGZmMDAwMFxuICogICB9KVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0ZU1vZHVsZSB7XG4gIHN0YXRpYyBhY3Rpb25HZW5lcmF0ZShpc0VxdWFsKSB7XG4gICAgcmV0dXJuIChzdGF0ZSA9IFt7fSwgJyddLCB7a2V5LCBkYXRhfSkgPT4ge1xuICAgICAgaWYgKGlzRXF1YWwoc3RhdGVbMF1ba2V5XSwgZGF0YSkpIHJldHVybiBzdGF0ZTtcblxuICAgICAgc3RhdGVbMF1ba2V5XSA9IGRhdGE7XG4gICAgICBzdGF0ZVsxXSA9IGtleTtcblxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlcXVhbENoZWNrID0gaXNFcXVhbERlZmF1bHQpIHtcbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgICBTdGF0ZU1vZHVsZS5hY3Rpb25HZW5lcmF0ZShlcXVhbENoZWNrKVxuICAgICk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICB0aGlzLmN1cnJlbnRDb25maWcgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5wcmV2Q29uZmlnID0gJ2RlZmF1bHQnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmYXVsdFxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBzZXR1cFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIG5ldyBXSFMuU3RhdGVNb2R1bGUoKS5kZWZhdWx0KHtcbiAgICogICBzcGhlcmVDb2xvcjogVVRJTFMuJGNvbG9ycy5tZXNoLFxuICAgKiAgIHBsYW5lQ29sb3I6IDB4NDQ3RjhCXG4gICAqIH0pXG4gICAqL1xuICBkZWZhdWx0KGRhdGEpIHtcbiAgICB0aGlzLmNvbmZpZyh7ZGVmYXVsdDogZGF0YX0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0RXF1YWxDaGVja1xuICAgKiBAZGVzY3JpcHRpb24gU2V0cyBhbiBlcXVhbENoZWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbmZpZ3VyYXRpb24gc2V0dXBcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgc2V0RXF1YWxDaGVjayhmdW5jKSB7XG4gICAgdGhpcy5zdG9yZS5yZXBsYWNlUmVkdWNlcihcbiAgICAgIFN0YXRlTW9kdWxlLmFjdGlvbkdlbmVyYXRlKGZ1bmMpXG4gICAgKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdzdGF0ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29uZmlnXG4gICAqIEBkZXNjcmlwdGlvbiBMb2FkIGNvbmZpZ3VyYXRpb25zIGZyb20gb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlncyBDb25maWd1cmF0aW9uIGRhdGFcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQWRkaW5nIGBncmVlbmAgY29uZmlndXJhdGlvbjwvY2FwdGlvbj5cbiAgICogc3RhdGUuY29uZmlnKHtcbiAgICogICBncmVlbjoge1xuICAgKiAgICAgc3BoZXJlQ29sb3I6IDB4MDBmZjAwLFxuICAgKiAgICAgcGxhbmVDb2xvcjogMHgwMGZmMDBcbiAgICogICB9XG4gICAqIH0pO1xuICAgKi9cbiAgY29uZmlnKGNvbmZpZ3MpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWdzKSB7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbltrZXldID0ga2V5ID09PSAnZGVmYXVsdCdcbiAgICAgICAgICA/IGNvbmZpZ3Nba2V5XVxuICAgICAgICAgIDogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHQsIGNvbmZpZ3Nba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBMb2FkIHVwZGF0ZXMgZnJvbSBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB1cGRhdGVzIFVwZGF0ZXMgZGF0YVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBVcGRhdGUgY2FsbGJhY2sgZm9yIGBzcGhlcmVDb2xvcmA8L2NhcHRpb24+XG4gICAqIHN0YXRlLnVwZGF0ZSh7XG4gICAqICAgc3BoZXJlQ29sb3I6IGNvbG9yID0+IHNwaGVyZS5tYXRlcmlhbC5jb2xvci5zZXRIZXgoY29sb3IpXG4gICAqIH0pO1xuICAgKi9cbiAgdXBkYXRlKHVwZGF0ZXMgPSB7fSkge1xuICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IFtkYXRhLCBjaGFuZ2VkS2V5XSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdXBkYXRlc1tjaGFuZ2VkS2V5XTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhW2NoYW5nZWRLZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHRvXG4gICAqIEBkZXNjcmlwdGlvbiBTd2l0Y2ggdG8gY29uZmlndXJhdGlvbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZ05hbWUgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBDaGFuZ2VzIGNvbmZpZ3VyYXRpb24gdG8gYGdyZWVuYDwvY2FwdGlvbj5cbiAgICogc3RhdGUudG8oJ2dyZWVuJyk7XG4gICAqL1xuICB0byhjb25maWdOYW1lKSB7XG4gICAgdGhpcy5wcmV2Q29uZmlnID0gdGhpcy5jdXJyZW50Q29uZmlnO1xuICAgIHRoaXMuY3VycmVudENvbmZpZyA9IGNvbmZpZ05hbWU7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgID8gdGhpcy5jb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdXG4gICAgICA6IHRoaXMuY29uZmlndXJhdGlvbi5kZWZhdWx0O1xuXG4gICAgdGhpcy5zZXQoY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IGN1cnJlbnQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIHN0YXRlLnNldCh7XG4gICAqICAgc3BoZXJlQ29sb3I6IDB4MDBmZjAwXG4gICAqIH0pO1xuICAgKi9cbiAgc2V0KGRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKVxuICAgICAgaWYgKGtleSkgdGhpcy5zdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0FERCcsIGtleSwgZGF0YTogZGF0YVtrZXldfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiBkYXRhIG9mIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBQYXJhbWV0ZXIgbmFtZS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZVxuICAgKiBzdGF0ZS5nZXQoJ3NwaGVyZUNvbG9yJyk7IC8vIDB4MDBmZjAwXG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcHJldlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGB0cnVlVmFsYCBpZiBgY29uZmlnYCBtYXRjaCBwcmV2aW91cyBjb25maWd1cmF0aW9uLCBpbiBvdGhlciBjYXNlIC0gcmV0dXJuIGBmYWxzZVZhbGAuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge0FueX0gdHJ1ZVZhbCBWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgdHJ1dGh5LlxuICAgKiBAcGFyYW0ge0FueX0gZmFsc2VWYWwgQ1ZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyBmYWxzeS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgcHJldihjb25maWcsIHRydWVWYWwsIGZhbHNlVmFsKSB7XG4gICAgcmV0dXJuIHRoaXMucHJldkNvbmZpZyA9PT0gY29uZmlnID8gdHJ1ZVZhbCA6IGZhbHNlVmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY3VycmVudFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGB0cnVlVmFsYCBpZiBgY29uZmlnYCBtYXRjaCBjdXJyZW50IGNvbmZpZ3VyYXRpb24sIGluIG90aGVyIGNhc2UgLSByZXR1cm4gYGZhbHNlVmFsYC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZyBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7QW55fSB0cnVlVmFsIFZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyB0cnV0aHkuXG4gICAqIEBwYXJhbSB7QW55fSBmYWxzZVZhbCBDVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIGZhbHN5LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBjdXJyZW50KGNvbmZpZywgdHJ1ZVZhbCwgZmFsc2VWYWwpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q29uZmlnID09PSBjb25maWcgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIE1PVVNFLFxuICBRdWF0ZXJuaW9uLFxuICBTcGhlcmljYWwsXG4gIFZlY3RvcjIsXG4gIFBlcnNwZWN0aXZlQ2FtZXJhLFxuICBPcnRob2dyYXBoaWNDYW1lcmEsXG4gIEV2ZW50RGlzcGF0Y2hlcixcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbi8vIFRoaXMgc2V0IG9mIGNvbnRyb2xzIHBlcmZvcm1zIG9yYml0aW5nLCBkb2xseWluZyAoem9vbWluZyksIGFuZCBwYW5uaW5nLlxuLy8gVW5saWtlIFRyYWNrYmFsbENvbnRyb2xzLCBpdCBtYWludGFpbnMgdGhlIFwidXBcIiBkaXJlY3Rpb24gb2JqZWN0LnVwICgrWSBieSBkZWZhdWx0KS5cbi8vXG4vLyAgICBPcmJpdCAtIGxlZnQgbW91c2UgLyB0b3VjaDogb25lIGZpbmdlciBtb3ZlXG4vLyAgICBab29tIC0gbWlkZGxlIG1vdXNlLCBvciBtb3VzZXdoZWVsIC8gdG91Y2g6IHR3byBmaW5nZXIgc3ByZWFkIG9yIHNxdWlzaFxuLy8gICAgUGFuIC0gcmlnaHQgbW91c2UsIG9yIGFycm93IGtleXMgLyB0b3VjaDogdGhyZWUgZmludGVyIHN3aXBlXG5cbmV4cG9ydCBjbGFzcyBUaHJlZU9yYml0Q29udHJvbHMgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcihvYmplY3QsIGRvbUVsZW1lbnQsIGV2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IChkb21FbGVtZW50ID09PSB1bmRlZmluZWQpID8gZG9jdW1lbnQgOiBkb21FbGVtZW50O1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gZXZlbnRIYW5kbGVyO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIC8vIFwidGFyZ2V0XCIgc2V0cyB0aGUgbG9jYXRpb24gb2YgZm9jdXMsIHdoZXJlIHRoZSBvYmplY3Qgb3JiaXRzIGFyb3VuZFxuICAgIHRoaXMudGFyZ2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBkb2xseSBpbiBhbmQgb3V0ICggUGVyc3BlY3RpdmVDYW1lcmEgb25seSApXG4gICAgdGhpcy5taW5EaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIHpvb20gaW4gYW5kIG91dCAoIE9ydGhvZ3JhcGhpY0NhbWVyYSBvbmx5IClcbiAgICB0aGlzLm1pblpvb20gPSAwO1xuICAgIHRoaXMubWF4Wm9vbSA9IEluZmluaXR5O1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IHZlcnRpY2FsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgLy8gUmFuZ2UgaXMgMCB0byBNYXRoLlBJIHJhZGlhbnMuXG4gICAgdGhpcy5taW5Qb2xhckFuZ2xlID0gMDsgLy8gcmFkaWFuc1xuICAgIHRoaXMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEk7IC8vIHJhZGlhbnNcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBvcmJpdCBob3Jpem9udGFsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgLy8gSWYgc2V0LCBtdXN0IGJlIGEgc3ViLWludGVydmFsIG9mIHRoZSBpbnRlcnZhbCBbIC0gTWF0aC5QSSwgTWF0aC5QSSBdLlxuICAgIHRoaXMubWluQXppbXV0aEFuZ2xlID0gLUluZmluaXR5OyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhBemltdXRoQW5nbGUgPSBJbmZpbml0eTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gZW5hYmxlIGRhbXBpbmcgKGluZXJ0aWEpXG4gICAgLy8gSWYgZGFtcGluZyBpcyBlbmFibGVkLCB5b3UgbXVzdCBjYWxsIGNvbnRyb2xzLnVwZGF0ZSgpIGluIHlvdXIgYW5pbWF0aW9uIGxvb3BcbiAgICB0aGlzLmVuYWJsZURhbXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSAwLjI1O1xuXG4gICAgLy8gVGhpcyBvcHRpb24gYWN0dWFsbHkgZW5hYmxlcyBkb2xseWluZyBpbiBhbmQgb3V0OyBsZWZ0IGFzIFwiem9vbVwiIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB6b29taW5nXG4gICAgdGhpcy5lbmFibGVab29tID0gdHJ1ZTtcbiAgICB0aGlzLnpvb21TcGVlZCA9IDEuMDtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHJvdGF0aW5nXG4gICAgdGhpcy5lbmFibGVSb3RhdGUgPSB0cnVlO1xuICAgIHRoaXMucm90YXRlU3BlZWQgPSAxLjA7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSBwYW5uaW5nXG4gICAgdGhpcy5lbmFibGVQYW4gPSB0cnVlO1xuICAgIHRoaXMua2V5UGFuU3BlZWQgPSA3LjA7IC8vIHBpeGVscyBtb3ZlZCBwZXIgYXJyb3cga2V5IHB1c2hcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgcm90YXRlIGFyb3VuZCB0aGUgdGFyZ2V0XG4gICAgLy8gSWYgYXV0by1yb3RhdGUgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG4gICAgdGhpcy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgdGhpcy5hdXRvUm90YXRlU3BlZWQgPSAyLjA7IC8vIDMwIHNlY29uZHMgcGVyIHJvdW5kIHdoZW4gZnBzIGlzIDYwXG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB1c2Ugb2YgdGhlIGtleXNcbiAgICB0aGlzLmVuYWJsZUtleXMgPSB0cnVlO1xuXG4gICAgLy8gVGhlIGZvdXIgYXJyb3cga2V5c1xuICAgIHRoaXMua2V5cyA9IHtMRUZUOiAzNywgVVA6IDM4LCBSSUdIVDogMzksIEJPVFRPTTogNDB9O1xuXG4gICAgLy8gTW91c2UgYnV0dG9uc1xuICAgIHRoaXMubW91c2VCdXR0b25zID0ge09SQklUOiBNT1VTRS5MRUZULCBaT09NOiBNT1VTRS5NSURETEUsIFBBTjogTU9VU0UuUklHSFR9O1xuXG4gICAgLy8gZm9yIHJlc2V0XG4gICAgdGhpcy50YXJnZXQwID0gdGhpcy50YXJnZXQuY2xvbmUoKTtcbiAgICB0aGlzLnBvc2l0aW9uMCA9IHRoaXMub2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG4gICAgdGhpcy56b29tMCA9IHRoaXMub2JqZWN0Lnpvb207XG5cbiAgICAvL1xuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy9cblxuICAgIHRoaXMuZ2V0UG9sYXJBbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBzcGhlcmljYWwucGhpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEF6aW11dGhhbEFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC50aGV0YTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNldCA9ICgpID0+IHtcbiAgICAgIHRoaXMudGFyZ2V0LmNvcHkodGhpcy50YXJnZXQwKTtcbiAgICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLmNvcHkodGhpcy5wb3NpdGlvbjApO1xuICAgICAgdGhpcy5vYmplY3Quem9vbSA9IHRoaXMuem9vbTA7XG5cbiAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgLy8gdGhpcyBtZXRob2QgaXMgZXhwb3NlZCwgYnV0IHBlcmhhcHMgaXQgd291bGQgYmUgYmV0dGVyIGlmIHdlIGNhbiBtYWtlIGl0IHByaXZhdGUuLi5cbiAgICB0aGlzLnVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIC8vIHNvIGNhbWVyYS51cCBpcyB0aGUgb3JiaXQgYXhpc1xuICAgICAgY29uc3QgcXVhdCA9IG5ldyBRdWF0ZXJuaW9uKCkuc2V0RnJvbVVuaXRWZWN0b3JzKG9iamVjdC51cCwgbmV3IFZlY3RvcjMoMCwgMSwgMCkpO1xuICAgICAgY29uc3QgcXVhdEludmVyc2UgPSBxdWF0LmNsb25lKCkuaW52ZXJzZSgpO1xuXG4gICAgICBjb25zdCBsYXN0UG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xuICAgICAgY29uc3QgbGFzdFF1YXRlcm5pb24gPSBuZXcgUXVhdGVybmlvbigpO1xuXG4gICAgICByZXR1cm4gKCgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm9iamVjdC5wb3NpdGlvbjtcblxuICAgICAgICBvZmZzZXQuY29weShwb3NpdGlvbikuc3ViKHRoaXMudGFyZ2V0KTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IHRvIFwieS1heGlzLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0KTtcblxuICAgICAgICAvLyBhbmdsZSBmcm9tIHotYXhpcyBhcm91bmQgeS1heGlzXG4gICAgICAgIHNwaGVyaWNhbC5zZXRGcm9tVmVjdG9yMyhvZmZzZXQpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9Sb3RhdGUgJiYgc3RhdGUgPT09IFNUQVRFLk5PTkUpXG4gICAgICAgICAgcm90YXRlTGVmdChnZXRBdXRvUm90YXRpb25BbmdsZSgpKTtcblxuICAgICAgICBzcGhlcmljYWwudGhldGEgKz0gc3BoZXJpY2FsRGVsdGEudGhldGE7XG4gICAgICAgIHNwaGVyaWNhbC5waGkgKz0gc3BoZXJpY2FsRGVsdGEucGhpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHRoZXRhIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnRoZXRhID0gTWF0aC5tYXgodGhpcy5taW5BemltdXRoQW5nbGUsIE1hdGgubWluKHRoaXMubWF4QXppbXV0aEFuZ2xlLCBzcGhlcmljYWwudGhldGEpKTtcblxuICAgICAgICAvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwucGhpID0gTWF0aC5tYXgodGhpcy5taW5Qb2xhckFuZ2xlLCBNYXRoLm1pbih0aGlzLm1heFBvbGFyQW5nbGUsIHNwaGVyaWNhbC5waGkpKTtcblxuICAgICAgICBzcGhlcmljYWwubWFrZVNhZmUoKTtcblxuICAgICAgICBzcGhlcmljYWwucmFkaXVzICo9IHNjYWxlO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHJhZGl1cyB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC5yYWRpdXMgPSBNYXRoLm1heCh0aGlzLm1pbkRpc3RhbmNlLCBNYXRoLm1pbih0aGlzLm1heERpc3RhbmNlLCBzcGhlcmljYWwucmFkaXVzKSk7XG5cbiAgICAgICAgLy8gbW92ZSB0YXJnZXQgdG8gcGFubmVkIGxvY2F0aW9uXG4gICAgICAgIHRoaXMudGFyZ2V0LmFkZChwYW5PZmZzZXQpO1xuXG4gICAgICAgIG9mZnNldC5zZXRGcm9tU3BoZXJpY2FsKHNwaGVyaWNhbCk7XG5cbiAgICAgICAgLy8gcm90YXRlIG9mZnNldCBiYWNrIHRvIFwiY2FtZXJhLXVwLXZlY3Rvci1pcy11cFwiIHNwYWNlXG4gICAgICAgIG9mZnNldC5hcHBseVF1YXRlcm5pb24ocXVhdEludmVyc2UpO1xuXG4gICAgICAgIHBvc2l0aW9uLmNvcHkodGhpcy50YXJnZXQpLmFkZChvZmZzZXQpO1xuXG4gICAgICAgIHRoaXMub2JqZWN0Lmxvb2tBdCh0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlRGFtcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhICo9ICgxIC0gdGhpcy5kYW1waW5nRmFjdG9yKTtcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS5waGkgKj0gKDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS5zZXQoMCwgMCwgMCk7XG5cbiAgICAgICAgc2NhbGUgPSAxO1xuICAgICAgICBwYW5PZmZzZXQuc2V0KDAsIDAsIDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBjb25kaXRpb24gaXM6XG4gICAgICAgIC8vIG1pbihjYW1lcmEgZGlzcGxhY2VtZW50LCBjYW1lcmEgcm90YXRpb24gaW4gcmFkaWFucyleMiA+IEVQU1xuICAgICAgICAvLyB1c2luZyBzbWFsbC1hbmdsZSBhcHByb3hpbWF0aW9uIGNvcyh4LzIpID0gMSAtIHheMiAvIDhcblxuICAgICAgICBpZiAoem9vbUNoYW5nZWRcbiAgICAgICAgICB8fCBsYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQodGhpcy5vYmplY3QucG9zaXRpb24pID4gRVBTXG4gICAgICAgICAgfHwgOCAqICgxIC0gbGFzdFF1YXRlcm5pb24uZG90KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pKSA+IEVQUykge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cbiAgICAgICAgICBsYXN0UG9zaXRpb24uY29weSh0aGlzLm9iamVjdC5wb3NpdGlvbik7XG4gICAgICAgICAgbGFzdFF1YXRlcm5pb24uY29weSh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKTtcbiAgICAgICAgICB6b29tQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KSgpO1xuICAgIH07XG5cbiAgICB0aGlzLmRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51LCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIG9uTW91c2VXaGVlbCwgZmFsc2UpO1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAgIC8vIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZGlzcG9zZScgfSApOyAvLyBzaG91bGQgdGhpcyBiZSBhZGRlZCBoZXJlP1xuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGludGVybmFsc1xuICAgIC8vXG5cbiAgICBjb25zdCBjaGFuZ2VFdmVudCA9IHt0eXBlOiAnY2hhbmdlJ307XG4gICAgY29uc3Qgc3RhcnRFdmVudCA9IHt0eXBlOiAnc3RhcnQnfTtcbiAgICBjb25zdCBlbmRFdmVudCA9IHt0eXBlOiAnZW5kJ307XG5cbiAgICBjb25zdCBTVEFURSA9IHtOT05FOiAtMSwgUk9UQVRFOiAwLCBET0xMWTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX0RPTExZOiA0LCBUT1VDSF9QQU46IDV9O1xuXG4gICAgbGV0IHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgIGNvbnN0IEVQUyA9IDAuMDAwMDAxO1xuXG4gICAgLy8gY3VycmVudCBwb3NpdGlvbiBpbiBzcGhlcmljYWwgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBzcGhlcmljYWwgPSBuZXcgU3BoZXJpY2FsKCk7XG4gICAgY29uc3Qgc3BoZXJpY2FsRGVsdGEgPSBuZXcgU3BoZXJpY2FsKCk7XG5cbiAgICBsZXQgc2NhbGUgPSAxO1xuICAgIGNvbnN0IHBhbk9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG4gICAgbGV0IHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBjb25zdCByb3RhdGVTdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3Qgcm90YXRlRW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVEZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBwYW5TdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgcGFuRW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5EZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBkb2xseVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBkb2xseUVuZCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlEZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBnZXRBdXRvUm90YXRpb25BbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiAyICogTWF0aC5QSSAvIDYwIC8gNjAgKiB0aGlzLmF1dG9Sb3RhdGVTcGVlZDtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Wm9vbVNjYWxlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGgucG93KDAuOTUsIHRoaXMuem9vbVNwZWVkKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgcm90YXRlTGVmdCA9IGFuZ2xlID0+IHtcbiAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhIC09IGFuZ2xlO1xuICAgIH07XG5cbiAgICBjb25zdCByb3RhdGVVcCA9IGFuZ2xlID0+IHtcbiAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAtPSBhbmdsZTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFuTGVmdCA9ICgoKSA9PiB7XG4gICAgICBjb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkaXN0YW5jZSwgb2JqZWN0TWF0cml4KSA9PiB7XG4gICAgICAgIHYuc2V0RnJvbU1hdHJpeENvbHVtbihvYmplY3RNYXRyaXgsIDApOyAvLyBnZXQgWCBjb2x1bW4gb2Ygb2JqZWN0TWF0cml4XG4gICAgICAgIHYubXVsdGlwbHlTY2FsYXIoLWRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHBhblVwID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRpc3RhbmNlLCBvYmplY3RNYXRyaXgpID0+IHtcbiAgICAgICAgdi5zZXRGcm9tTWF0cml4Q29sdW1uKG9iamVjdE1hdHJpeCwgMSk7IC8vIGdldCBZIGNvbHVtbiBvZiBvYmplY3RNYXRyaXhcbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XG4gICAgICAgIHBhbk9mZnNldC5hZGQodik7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICAvLyBkZWx0YVggYW5kIGRlbHRhWSBhcmUgaW4gcGl4ZWxzOyByaWdodCBhbmQgZG93biBhcmUgcG9zaXRpdmVcbiAgICBjb25zdCBwYW4gPSAoKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkZWx0YVgsIGRlbHRhWSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gcGVyc3BlY3RpdmVcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuICAgICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO1xuICAgICAgICAgIGxldCB0YXJnZXREaXN0YW5jZSA9IG9mZnNldC5sZW5ndGgoKTtcblxuICAgICAgICAgIC8vIGhhbGYgb2YgdGhlIGZvdiBpcyBjZW50ZXIgdG8gdG9wIG9mIHNjcmVlblxuICAgICAgICAgIHRhcmdldERpc3RhbmNlICo9IE1hdGgudGFuKCh0aGlzLm9iamVjdC5mb3YgLyAyKSAqIE1hdGguUEkgLyAxODAuMCk7XG5cbiAgICAgICAgICAvLyB3ZSBhY3R1YWxseSBkb24ndCB1c2Ugc2NyZWVuV2lkdGgsIHNpbmNlIHBlcnNwZWN0aXZlIGNhbWVyYSBpcyBmaXhlZCB0byBzY3JlZW4gaGVpZ2h0XG4gICAgICAgICAgcGFuTGVmdCgyICogZGVsdGFYICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcCgyICogZGVsdGFZICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0NhbWVyYSkge1xuICAgICAgICAgIC8vIG9ydGhvZ3JhcGhpY1xuICAgICAgICAgIHBhbkxlZnQoZGVsdGFYICogKHRoaXMub2JqZWN0LnJpZ2h0IC0gdGhpcy5vYmplY3QubGVmdCkgLyB0aGlzLm9iamVjdC56b29tIC8gZWxlbWVudC5jbGllbnRXaWR0aCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcChkZWx0YVkgKiAodGhpcy5vYmplY3QudG9wIC0gdGhpcy5vYmplY3QuYm90dG9tKSAvIHRoaXMub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjYW1lcmEgbmVpdGhlciBvcnRob2dyYXBoaWMgbm9yIHBlcnNwZWN0aXZlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzTW9kdWxlLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBwYW4gZGlzYWJsZWQuJyk7XG4gICAgICAgICAgdGhpcy5lbmFibGVQYW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgZG9sbHlJbiA9IGRvbGx5U2NhbGUgPT4ge1xuICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpXG4gICAgICAgIHNjYWxlIC89IGRvbGx5U2NhbGU7XG5cbiAgICAgIGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSBNYXRoLm1heCh0aGlzLm1pblpvb20sIE1hdGgubWluKHRoaXMubWF4Wm9vbSwgdGhpcy5vYmplY3Quem9vbSAqIGRvbGx5U2NhbGUpKTtcbiAgICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICB6b29tQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyk7XG4gICAgICAgIHRoaXMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBkb2xseU91dCA9IGRvbGx5U2NhbGUgPT4ge1xuICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpXG4gICAgICAgIHNjYWxlICo9IGRvbGx5U2NhbGU7XG5cbiAgICAgIGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSBNYXRoLm1heCh0aGlzLm1pblpvb20sIE1hdGgubWluKHRoaXMubWF4Wm9vbSwgdGhpcy5vYmplY3Quem9vbSAvIGRvbGx5U2NhbGUpKTtcbiAgICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICB6b29tQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyk7XG4gICAgICAgIHRoaXMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGV2ZW50IGNhbGxiYWNrcyAtIHVwZGF0ZSB0aGUgb2JqZWN0IHN0YXRlXG4gICAgLy9cblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93blJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVTdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93bkRvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25Eb2xseScgKTtcblxuICAgICAgZG9sbHlTdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93blBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duUGFuJyApO1xuXG4gICAgICBwYW5TdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZVJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgcm90YXRlVXAoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgcm90YXRlU3RhcnQuY29weShyb3RhdGVFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmVEb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlRG9sbHknICk7XG5cbiAgICAgIGRvbGx5RW5kLnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKGRvbGx5RW5kLCBkb2xseVN0YXJ0KTtcblxuICAgICAgaWYgKGRvbGx5RGVsdGEueSA+IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZVBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlUGFuJyApO1xuXG4gICAgICBwYW5FbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKHBhbkVuZCwgcGFuU3RhcnQpO1xuXG4gICAgICBwYW4ocGFuRGVsdGEueCwgcGFuRGVsdGEueSk7XG5cbiAgICAgIHBhblN0YXJ0LmNvcHkocGFuRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VVcCcgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VXaGVlbCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VXaGVlbCcgKTtcblxuICAgICAgaWYgKGV2ZW50LmRlbHRhWSA8IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZWxzZSBpZiAoZXZlbnQuZGVsdGFZID4gMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZUtleURvd24nICk7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIHRoaXMua2V5cy5VUDpcbiAgICAgICAgICBwYW4oMCwgdGhpcy5rZXlQYW5TcGVlZCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5CT1RUT006XG4gICAgICAgICAgcGFuKDAsIC10aGlzLmtleVBhblNwZWVkKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLkxFRlQ6XG4gICAgICAgICAgcGFuKHRoaXMua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuUklHSFQ6XG4gICAgICAgICAgcGFuKC10aGlzLmtleVBhblNwZWVkLCAwKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnRSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnRSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydERvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0RG9sbHknICk7XG5cbiAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuc2V0KDAsIGRpc3RhbmNlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydFBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydFBhbicgKTtcblxuICAgICAgcGFuU3RhcnQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZVJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlRW5kLnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICAgIHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMocm90YXRlRW5kLCByb3RhdGVTdGFydCk7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcbiAgICAgIHJvdGF0ZUxlZnQoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcbiAgICAgIHJvdGF0ZVVwKDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkocm90YXRlRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZURvbGx5JyApO1xuXG4gICAgICBjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICBkb2xseUVuZC5zZXQoMCwgZGlzdGFuY2UpO1xuXG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZG9sbHlTdGFydC5jb3B5KGRvbGx5RW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaE1vdmVQYW4nICk7XG5cbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCk7XG5cbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcblxuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaEVuZCA9ICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hFbmQnICk7XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gZXZlbnQgaGFuZGxlcnMgLSBGU006IGxpc3RlbiBmb3IgZXZlbnRzIGFuZCByZXNldCBzdGF0ZVxuICAgIC8vXG5cbiAgICBjb25zdCBvbk1vdXNlRG93biA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLk9SQklUKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25Sb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIHN0YXRlID0gU1RBVEUuUk9UQVRFO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLlpPT00pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25Eb2xseShldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5ET0xMWTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuYnV0dG9uID09PSB0aGlzLm1vdXNlQnV0dG9ucy5QQU4pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93blBhbihldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5QQU47XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuTk9ORSkge1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKHN0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZVJvdGF0ZShldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBTVEFURS5ET0xMWSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZURvbGx5KGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFNUQVRFLlBBTikge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlUGFuKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlTW91c2VVcChldmVudCk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVdoZWVsID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVab29tID09PSBmYWxzZSB8fCAoc3RhdGUgIT09IFNUQVRFLk5PTkUgJiYgc3RhdGUgIT09IFNUQVRFLlJPVEFURSkpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBoYW5kbGVNb3VzZVdoZWVsKGV2ZW50KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpOyAvLyBub3Qgc3VyZSB3aHkgdGhlc2UgYXJlIGhlcmUuLi5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlIHx8IHRoaXMuZW5hYmxlS2V5cyA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZUtleURvd24oZXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnRSb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkoZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ET0xMWTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydFBhbihldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1BBTjtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5OT05FKVxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX1JPVEFURSkgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZVJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9ET0xMWSkgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZURvbGx5KGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUEFOKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUGFuKGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaEVuZCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZVRvdWNoRW5kKGV2ZW50KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNvbnRleHRNZW51ID0gZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAgLy9cblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd3aGVlbCcsIG9uTW91c2VXaGVlbCwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuXG4gICAgLy8gZm9yY2UgYW4gdXBkYXRlIGF0IHN0YXJ0XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0IGNlbnRlcigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5jZW50ZXIgaGFzIGJlZW4gcmVuYW1lZCB0byAudGFyZ2V0Jyk7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0O1xuICB9XG5cbiAgZ2V0IG5vWm9vbSgpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVpvb207XG4gIH1cblxuICBzZXQgbm9ab29tKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9ab29tIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlWm9vbSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlWm9vbSA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub1JvdGF0ZSgpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1JvdGF0ZSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVJvdGF0ZSBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVSb3RhdGU7XG4gIH1cblxuICBzZXQgbm9Sb3RhdGUodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1JvdGF0ZSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVJvdGF0ZSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlUm90YXRlID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vUGFuKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUGFuIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUGFuIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVBhbjtcbiAgfVxuXG4gIHNldCBub1Bhbih2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUGFuIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUGFuIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVQYW4gPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9LZXlzKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vS2V5cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZUtleXMgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlS2V5cztcbiAgfVxuXG4gIHNldCBub0tleXModmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub0tleXMgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVLZXlzIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVLZXlzID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0YXRpY01vdmluZygpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5zdGF0aWNNb3ZpbmcgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVEYW1waW5nIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZURhbXBpbmc7XG4gIH1cblxuICBzZXQgc3RhdGljTW92aW5nKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuc3RhdGljTW92aW5nIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlRGFtcGluZyBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlRGFtcGluZyA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBkeW5hbWljRGFtcGluZ0ZhY3RvcigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5keW5hbWljRGFtcGluZ0ZhY3RvciBoYXMgYmVlbiByZW5hbWVkLiBVc2UgLmRhbXBpbmdGYWN0b3IgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gdGhpcy5kYW1waW5nRmFjdG9yO1xuICB9XG5cbiAgc2V0IGR5bmFtaWNEYW1waW5nRmFjdG9yKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuZHluYW1pY0RhbXBpbmdGYWN0b3IgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIC5kYW1waW5nRmFjdG9yIGluc3RlYWQuJyk7XG4gICAgdGhpcy5kYW1waW5nRmFjdG9yID0gdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7VmVjdG9yM30gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDb250cm9sc01vZHVsZX0gZnJvbSAnLi4vQ29udHJvbHNNb2R1bGUnO1xuXG5pbXBvcnQge1RocmVlT3JiaXRDb250cm9sc30gZnJvbSAnLi9saWIvVGhyZWVPcmJpdENvbnRyb2xzJztcblxuZXhwb3J0IGNsYXNzIE9yYml0Q29udHJvbHNNb2R1bGUgZXh0ZW5kcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBmb2xsb3c6IGZhbHNlLFxuICAgICAgb2JqZWN0OiBudWxsLFxuICAgICAgdGFyZ2V0OiBuZXcgVmVjdG9yMygwLCAwLCAwKVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBzdXBlci5tYW5hZ2VyKG1hbmFnZXIpO1xuXG4gICAgY29uc3Qge29iamVjdDogb2JqLCBmb2xsb3csIHRhcmdldH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBvYmplY3QgPSBvYmogPyBvYmoubmF0aXZlIDogbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZTtcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IFRocmVlT3JiaXRDb250cm9scyhcbiAgICAgIG9iamVjdCxcbiAgICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JyksXG4gICAgICBtYW5hZ2VyLmhhbmRsZXJcbiAgICApO1xuXG4gICAgY29uc3QgdXBkYXRlUHJvY2Vzc29yID0gZm9sbG93ID8gYyA9PiB7XG4gICAgICBjb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICAgIGNvbnRyb2xzLnRhcmdldC5jb3B5KHRhcmdldCk7XG4gICAgfSA6IGMgPT4ge1xuICAgICAgY29udHJvbHMudXBkYXRlKGMuZ2V0RGVsdGEoKSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0Q29udHJvbHMoY29udHJvbHMpO1xuICAgIHRoaXMuc2V0VXBkYXRlKHVwZGF0ZVByb2Nlc3Nvcik7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIGlmIChvYmopIHJldHVybjtcbiAgICAgICAgY29udHJvbHMub2JqZWN0ID0gY2FtZXJhLm5hdGl2ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRyb2xzLnRhcmdldC5jb3B5KHRhcmdldCk7XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvYXBwL2NvbnRyb2xzICovXG5leHBvcnQgKiBmcm9tICcuL09yYml0Q29udHJvbHNNb2R1bGUnO1xuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9hcHAgKi9cbmV4cG9ydCAqIGZyb20gJy4vRWxlbWVudE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1JlbmRlcmluZ01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1NjZW5lTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUmVzaXplTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUG9zdFByb2Nlc3Nvck1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1ZpcnR1YWxNb3VzZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29udHJvbHNNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Gb2dNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0ZU1vZHVsZSc7XG5cbi8vIGNvbnRyb2xzXG5leHBvcnQgKiBmcm9tICcuL2NvbnRyb2xzL2luZGV4JztcbiIsIi8qKlxuICogQGNsYXNzIER5bmFtaWNHZW9tZXRyeU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2F0dHJpYnV0ZXM6IGZhbHNlfV0gLSBwYXJhbXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhdGNoRXZlbnRzPXRydWVdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaFxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0dlb21ldHJ5TW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYXR0cmlidXRlczogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzZWxmLnBhcmFtcztcblxuICAgIHRoaXMuZ18gPSBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcbiAgICAgIGlmICh0aGlzLmJ1aWxkR2VvbWV0cnkpIHtcbiAgICAgICAgdGhpcy5uYXRpdmUuZ2VvbWV0cnkgPSB0aGlzLmJ1aWxkR2VvbWV0cnkoXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbXMoe2dlb21ldHJ5OiBwYXJhbXN9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAocGFyYW1zLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucGFyYW1zLmdlb21ldHJ5KSB7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgYGdfJHtrZXl9YCwge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmUuZ2VvbWV0cnkucGFyYW1ldGVyc1trZXldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLm5hdGl2ZS5nZW9tZXRyeSA9IHRoaXMuYnVpbGRHZW9tZXRyeSh0aGlzLnVwZGF0ZVBhcmFtcyh7Z2VvbWV0cnk6IHtba2V5XTogdmFsdWV9fSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUmVwZWF0V3JhcHBpbmcsXG4gIFVWTWFwcGluZyxcbiAgTmVhcmVzdEZpbHRlcixcbiAgTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyLFxuICBUZXh0dXJlTG9hZGVyLFxuICBWZWN0b3IyXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgbG9hZGVyID0gbmV3IFRleHR1cmVMb2FkZXIoKTtcblxuLyoqXG4gKiBAY2xhc3MgVGV4dHVyZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQGRlc2NyaXB0aW9uIEEgVGV4dHVyZU1vZHVsZSBjYW4gYmUgYXBwbGllZCB0byBhbnkgTWVzaCBvciBNb2RlbC5cbiAqIEBwYXJhbSB7QXJyYXl9IFt0ZXh0dXJlc10gLSBhcnJheSBvZiB0ZXh0dXJlIG9iamVjdHNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBpbnN0YW5jZS4gdXJsIHRha2VzIGEgcGF0aCwgb3IgYSBkYXRhIG9iamVjdC48L2NhcHRpb24+XG4gKiB2YXIgd29vZFRleHR1cmUgPSBuZXcgVGV4dHVyZU1vZHVsZSh7XG4gKiAgIHVybDogYCR7cHJvY2Vzcy5hc3NldHNQYXRofS90ZXh0dXJlcy93b29kLmpwZ2BcbiAqIH0pO1xuICogQGV4YW1wbGUgPGNhcHRpb24+TW9yZSBjb21wcmVoZW5zaXZlIGV4YW1wbGUsIHdvb2QgdGV4dHVyZSBhcHBsaWVkIHRvIGEgQm94LjwvY2FwdGlvbj5cbiAqIG5ldyBCb3goe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHdpZHRoOiAyLFxuICogICAgIGhlaWdodDogMixcbiAqICAgICBkZXB0aDogMlxuICogICB9LFxuICogICBtb2R1bGVzOiBbXG4gKiAgICAgbmV3IFRleHR1cmVNb2R1bGUoe1xuICogICAgICAgdXJsOiBgcGF0aC90by90ZXh0dXJlLmpwZ2AsXG4gKiAgICAgICByZXBlYXQ6IG5ldyBUSFJFRS5WZWN0b3IyKDEsIDEpIC8vIG9wdGlvbmFsXG4gKiAgICAgfSlcbiAqICAgXSxcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICogICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5leHBvcnQgY2xhc3MgVGV4dHVyZU1vZHVsZSB7XG4gIHN0YXRpYyBsb2FkKHVybCkge1xuICAgIHJldHVybiBuZXcgVGV4dHVyZU1vZHVsZSh7dXJsfSkudGV4dHVyZXNbMF1bMV07XG4gIH1cblxuICB0ZXh0dXJlcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKC4uLnRleHR1cmVzKSB7XG4gICAgdGV4dHVyZXMuZm9yRWFjaCgoe1xuICAgICAgdXJsLFxuICAgICAgdHlwZSA9ICdtYXAnLFxuICAgICAgb2Zmc2V0ID0gbmV3IFZlY3RvcjIoMCwgMCksXG4gICAgICByZXBlYXQgPSBuZXcgVmVjdG9yMigxLCAxKSxcbiAgICAgIHdyYXAgPSBSZXBlYXRXcmFwcGluZyxcbiAgICAgIG1hcHBpbmcgPSBVVk1hcHBpbmcsXG4gICAgICBmaXggPSB0ZXggPT4gdGV4XG4gICAgfSkgPT4ge1xuICAgICAgY29uc3QgdGV4dHVyZSA9IGxvYWRlci5sb2FkKHVybCk7XG5cbiAgICAgIGlmICh3cmFwLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IHdyYXBbMF07XG4gICAgICAgIHRleHR1cmUud3JhcFQgPSB3cmFwWzFdO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHRleHR1cmUud3JhcFMgPSB0ZXh0dXJlLndyYXBUID0gd3JhcDtcblxuICAgICAgdGV4dHVyZS5tYXBwaW5nID0gbWFwcGluZztcblxuICAgICAgdGV4dHVyZS5vZmZzZXQuY29weShvZmZzZXQpO1xuICAgICAgdGV4dHVyZS5yZXBlYXQuY29weShyZXBlYXQpO1xuXG4gICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IE5lYXJlc3RGaWx0ZXI7XG4gICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IExpbmVhck1pcE1hcExpbmVhckZpbHRlcjtcblxuICAgICAgdGhpcy50ZXh0dXJlcy5wdXNoKFt0eXBlLCBmaXgodGV4dHVyZSldKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtYXRlcmlhbChtYXRlcmlhbCwgc2VsZikge1xuICAgICAgc2VsZi50ZXh0dXJlcy5mb3JFYWNoKHRleHR1cmUgPT4ge1xuICAgICAgICBtYXRlcmlhbFt0ZXh0dXJlWzBdXSA9IHRleHR1cmVbMV07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQW5pbWF0aW9uTWl4ZXIsXG4gIEFuaW1hdGlvbkNsaXAsXG4gIENsb2NrXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG4vKipcbiAqIEBjbGFzcyBBbmltYXRpb25Nb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL21lc2hcbiAqIEBkZXNjcmlwdGlvbiBDb252ZW5pZW5jZSBtb2R1bGUgdGhhdCB3cmFwcyB0aGUgPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNtYW51YWwvaW50cm9kdWN0aW9uL0FuaW1hdGlvbi1zeXN0ZW0nPnRocmVlLmpzIGFuaW1hdGlvbiBzeXN0ZW08L2E+XG4gKiBAcGFyYW0ge0FwcH0gYXBwIC0gdGhlIGFwcFxuICogQHBhcmFtIHtCb29sZWFufSBbaXNEZWZlcnJlZD1mYWxzZV0gLSBzZXQgdG8gdHJ1ZSBpZiBhbmltYXRpb24gc2hvdWxkIG5vdCBzdGFydCBhdXRvbWF0aWNhbGx5XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17c3BlZWQ6IDF9XSAtIHRoZSBwYXJhbXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW5pbWF0aW9uIG1vZHVsZSBhbmQgcGxheSBhIGdpdmVuIGNsaXAgb2YgYW4gaW1wb3J0ZWQgbW9kZWw8L2NhcHRpb24+XG4gKiBjb25zdCBhbmltYXRpb25Nb2R1bGUgPSBuZXcgQW5pbWF0aW9uTW9kdWxlKGFwcCwgZmFsc2UsIHtcbiAqICAgc3BlZWQ6IDEuMiAvLyBzcGVlZCB1cCBhbmltYXRpb24gYnkgMjAlXG4gKiB9KTtcbiAqXG4gKiBuZXcgSW1wb3J0ZXIoe1xuICogICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFscykge1xuICogICAgIC8vIE92ZXJyaWRlIHBhcnNlIHRvIGdlbmVyYXRlIGEgc2tpbm5lZE1lc2gsIG5lZWRlZCBmb3Igc2tpbm5lZCBtb2RlbHNcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLlNraW5uZWRNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICogICB9LFxuICpcbiAqICAgdXJsOiBgcGF0aC90by9tb2RlbC5qc29uYCxcbiAqICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IHRydWUsXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAqICAgICBza2lubmluZzogdHJ1ZVxuICogICB9KSxcbiAqXG4gKiAgIG1vZHVsZXM6IFthbmltYXRpb25Nb2R1bGVdXG4gKiB9KS5hZGRUbyhhcHApLnRoZW4oKCkgPT4ge1xuICogICAvLyBhZGRpbmcgbW9kZWwgdG8gYXBwIHJldHVybnMgYSBwcm9taXNlLCBzbyBwaXBlIHRoZSBmdW5jdGlvbiB0byBraWNrIG9mZiB0aGUgYW5pbWF0aW9uIGNsaXBcbiAqICAgYW5pbWF0aW9uTW9kdWxlLnBsYXkoJ2NsaXBOYW1lJyk7XG4gKiB9KTtcbiAqL1xuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGFwcCwgaXNEZWZlcnJlZCwgcGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgc3BlZWQ6IDFcbiAgICB9LCBwYXJhbXMpO1xuICAgIHRoaXMuY2xvY2sgPSBuZXcgQ2xvY2soKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuaXNEZWZlcnJlZCA9IGlzRGVmZXJyZWQ7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwbGF5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUGxheXMgdGhlIGdpdmVuIGNsaXAgbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xpcE5hbWUgLSB0aGUgY2xpcCB0byBwbGF5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoLkFuaW1hdGlvbk1vZHVsZVxuICAgKi9cbiAgcGxheShjbGlwTmFtZSkge1xuICAgIGNvbnN0IGNsaXAgPSBBbmltYXRpb25DbGlwLmZpbmRCeU5hbWUodGhpcy5jbGlwcywgY2xpcE5hbWUpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMubWl4ZXIuY2xpcEFjdGlvbihjbGlwKTtcblxuICAgIGFjdGlvbi5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgdGhlIG1peGVyIChiZWluZyBjYWxsZWQgb24gZnJhbWUgYW5pbWF0aW9uIGxvb3ApXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoLkFuaW1hdGlvbk1vZHVsZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLm1peGVyKSB0aGlzLm1peGVyLnVwZGF0ZSh0aGlzLmNsb2NrLmdldERlbHRhKCkgKiB0aGlzLnBhcmFtcy5zcGVlZCk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYubG9vcCA9IG5ldyBMb29wKCgpID0+IHtcbiAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXNlbGYuaXNEZWZlcnJlZCkgc2VsZi5sb29wLnN0YXJ0KHNlbGYuYXBwKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdhbmltYXRpb24nKTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtZXNoKG1lc2gsIHNlbGYpIHtcbiAgICAgIG1lc2guZ2VvbWV0cnkuc2tlbGV0b24gPSBtZXNoLnNrZWxldG9uO1xuXG4gICAgICBzZWxmLm1peGVyID0gbmV3IEFuaW1hdGlvbk1peGVyKG1lc2guZ2VvbWV0cnkpO1xuICAgICAgc2VsZi5jbGlwcyA9IG1lc2guZ2VvbWV0cnkuYW5pbWF0aW9ucztcblxuICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL21lc2ggKi9cbmV4cG9ydCAqIGZyb20gJy4vRHluYW1pY0dlb21ldHJ5TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVGV4dHVyZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0FuaW1hdGlvbk1vZHVsZSc7XG4iLCIvKipcbiAqIEBjbGFzcyBEZWZpbmVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgRGVmaW5lTW9kdWxlIHdpdGggUGVyc3BlY3RpdmVDYW1lcmEgYXMgY2FtZXJhIG1vZHVsZSBhbmQgcGFzc2luZyBpdCB0byBBcHAncyBtb2R1bGVzPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIC8vIC4uLlxuICogICBuZXcgRGVmaW5lTW9kdWxlKCdjYW1lcmEnLCBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoKSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRGVmaW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KHRoaXMubmFtZSwgdGhpcy5kYXRhKTtcbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcyAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2FwcC9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL21lc2gvaW5kZXgnO1xuXG4vLyBtb2R1bGVzXG5leHBvcnQgKiBmcm9tICcuL0RlZmluZU1vZHVsZSc7XG4iLCJpbXBvcnQge0ltcG9ydGVyfSBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL0ltcG9ydGVyJztcbmltcG9ydCB7UGVyc3BlY3RpdmVDYW1lcmF9IGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhJztcblxuZXhwb3J0IGNsYXNzIE1vZGVsIGV4dGVuZHMgSW1wb3J0ZXIge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMsIC4uLmFkZGl0aW9uYWwpIHtcbiAgICBjb25zb2xlLndhcm4oJ01vZGVsIGlzIGRlcHJlY2F0ZWQuIFVzZSBJbXBvcnRlciBpbnN0ZWFkLicpO1xuXG4gICAgaWYgKHBhcmFtcy5nZW9tZXRyeSkge1xuICAgICAgcGFyYW1zLnVybCA9IHBhcmFtcy5nZW9tZXRyeS5wYXRoO1xuICAgICAgcGFyYW1zLmxvYWRlciA9IHBhcmFtcy5nZW9tZXRyeS5sb2FkZXI7XG4gICAgfVxuXG4gICAgc3VwZXIocGFyYW1zLCAuLi5hZGRpdGlvbmFsKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FtZXJhTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBjb25zb2xlLndhcm4oJ0NhbWVyYU1vZHVsZSBpcyBkZXByZWNhdGVkLiBVc2UgRGVmaW5lTW9kdWxlIGluc3RlYWQuJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEocGFyYW1zKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgdGhpcy5hZGQoc2VsZi5jYW1lcmEpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2NhbWVyYScsIHRoaXMuY2FtZXJhKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBOYW1lc3BhY2UgY29udGFpbmluZyBhbGwgY2xhc3NlcyBmcm9tIGFsbCBtb2R1bGVzLiBVc2VkIGFzIGdsb2JhbCBpbiBVTUQgcGF0dGVybi5cbiAqIEBuYW1lc3BhY2UgV0hTXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgdXNlIG9mIFdIUyBuYW1lc3BhY2UuPC9jYXB0aW9uPlxuICogbmV3IFdIUy5BcHAoKSAvLyBjb3JlXG4gKiBuZXcgV0hTLlBlcnNwZWN0aXZlQ2FtZXJhKCkgLy8gY29tcG9uZW50c1xuICogbmV3IFdIUy5SZXNpemVNb2R1bGUoKSAvLyBtb2R1bGVzXG4gKiBXSFMuZXh0ZW5kKCkgLy8gdXRpbHNcbiAqL1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vY29yZS9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMvaW5kZXgnO1xuXG4vLyBERVBSRUNBVElPTlxuZXhwb3J0ICogZnJvbSAnLi9kZXByZWNhdGlvbic7XG4iXSwibmFtZXMiOlsiZXh0ZW5kIiwib2JqZWN0IiwiZXh0ZW5zaW9ucyIsImV4dGVuc2lvbiIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJwcm9wIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwiaW5zdHJ1Y3QiLCJhcnJheSIsImluc3RBcnJheSIsInRlbXBPYmplY3QiLCJpIiwibWF4IiwibGVuZ3RoIiwiZ3VpZGUiLCJ0cmFuc2Zvcm1EYXRhIiwiaW5zdHJ1Y3Rpb25zIiwia2V5IiwidG9BcnJheSIsImluc3RydWN0aW9uIiwidGVtcEFycmF5IiwiQ29tcG9zaXRpb25FcnJvciIsImNsYXNzSW5zdGFuY2UiLCJtZXNzYWdlIiwiY29tcG9uZW50Iiwic3RhY2tBcnJheSIsInN0YWNrIiwic3BsaXQiLCJzcGxpY2UiLCJqb2luIiwiY29uc29sZSIsImVycm9yIiwibmFtZSIsIkVycm9yIiwiRGVwZW5kZW5jeUVycm9yIiwiYWN0aXZlTW9kdWxlIiwiZGVwZW5kZW5jeU1vZHVsZSIsIk1hbmFnZXJFcnJvciIsIndhcm5EZXBzIiwiUkVWSVNJT04iLCJlcnIiLCJNb2R1bGVTeXN0ZW0iLCJzb3VyY2UiLCJtb2R1bGVzIiwiYXBwbHlNb2R1bGUiLCJhcHBseUJyaWRnZSIsIm9uQ29weSIsImJyaWRnZU1hcCIsIm1vZHVsZSIsImJyaWRnZSIsImFwcGx5IiwiY2IiLCJmdW5jIiwibW9kdWxlU2NvcGUiLCJwdXNoIiwibWFuYWdlciIsImFjdGl2ZSIsImludGVncmF0ZSIsImJpbmQiLCJkaXNwb3NlTW9kdWxlIiwiaW5kZXhPZiIsImRpc3Bvc2UiLCJFdmVudHMiLCJTeW1ib2wiLCJvYmplY3RQcm90byIsImhhc093blByb3BlcnR5Iiwic3ltVG9TdHJpbmdUYWciLCJuYXRpdmVPYmplY3RUb1N0cmluZyIsInJvb3QiLCJwb255ZmlsbCIsIiQkb2JzZXJ2YWJsZSIsIk1vZHVsZU1hbmFnZXIiLCJoYW5kbGVyIiwiY3VycmVudE1vZHVsZSIsInN0b3JlIiwiY3JlYXRlU3RvcmUiLCJzdGF0ZSIsImFjdGlvbiIsImRhdGEiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiQm9vbGVhbiIsImRlcHNNYXAiLCJzdWJzY3JpYmUiLCJjaGFuZ2VkS2V5IiwiY2FsbGJhY2siLCJ3YXJuIiwic2V0IiwibW9kdWxlRXhlY3V0b3IiLCJ1c2UiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJkZWZhdWx0cyIsIl93YWl0IiwiY2hpbGRyZW4iLCJpbnRlZ3JhdGVNb2R1bGVzIiwicHJvbWlzZSIsIlByb21pc2UiLCJhbGwiLCJpc0RlZmZlcmVkIiwid2FpdCIsInRoZW4iLCJjb3B5IiwiY3VzdG9taXplIiwibmF0aXZlIiwiY2xvbmUiLCJwYXJlbnQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGVmZXIiLCJhZGRQcm9taXNlIiwib25BZGQiLCJyZXNvbHZlciIsImFkZCIsInJlbW92ZSIsIl9tYW5hZ2VyIiwiX25hdGl2ZSIsIm1lc2giLCJhdHRyaWJ1dGVzIiwibWFwcGVycyIsInRhcmdldCIsIm1hcHBlciIsImsiLCJtYXAiLCJhdHRyaWJ1dGUiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldHRlciIsInNldHRlciIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ2YWx1ZSIsIm1pcnJvciIsIk1lc2hDb21wb25lbnQiLCJnZW9tIiwiTWVzaCIsIm1hdGVyaWFsIiwiZ2VvbWV0cnkiLCJjdXN0b20iLCJidWlsZCIsIndyYXAiLCJhcHBseUNvbW1hbmQiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJzaGFkb3ciLCJ4IiwieSIsInoiLCJjYXN0U2hhZG93IiwiY2FzdCIsInJlY2VpdmVTaGFkb3ciLCJyZWNlaXZlIiwib25XcmFwIiwicXVhdGVybmlvbiIsImRlc3QiLCJMaWdodENvbXBvbmVudCIsIm1hcFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJpYXMiLCJyYWRpdXMiLCJzaGFkb3dDYW1lcmEiLCJjYW1lcmEiLCJuZWFyIiwiZmFyIiwiZm92IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiQ2FtZXJhQ29tcG9uZW50Iiwic3lzdGVtIiwid2luZG93IiwiZ2xvYmFsIiwicGVyZm9ybWFuY2UiLCJwcmVzZW50IiwiQXBwIiwibG9nIiwidmVyc2lvbiIsInNpbXVsYXRlIiwidXBkYXRlRW5hYmxlZCIsImxvb3BzIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFRpbWVvdXQiLCJwcm9jZXNzIiwibGwiLCJlIiwiZW5hYmxlZCIsImV4ZWN1dGUiLCJjbG9jayIsImxvb3AiLCJpbmRleCIsImdldCIsIkxvb3AiLCJ1c2VDbG9jayIsIkNsb2NrIiwid29ybGQiLCJhZGRMb29wIiwic3RhcnQiLCJzdG9wIiwicmVtb3ZlTG9vcCIsIkFtYmllbnRMaWdodCIsImxpZ2h0IiwiQW1iaWVudExpZ2h0TmF0aXZlIiwiY29sb3IiLCJpbnRlbnNpdHkiLCJEaXJlY3Rpb25hbExpZ2h0Iiwid3JhcFNoYWRvdyIsIkRpcmVjdGlvbmFsTGlnaHROYXRpdmUiLCJIZW1pc3BoZXJlTGlnaHQiLCJIZW1pc3BoZXJlTGlnaHROYXRpdmUiLCJza3lDb2xvciIsImdyb3VuZENvbG9yIiwiUG9pbnRMaWdodCIsIlBvaW50TGlnaHROYXRpdmUiLCJkaXN0YW5jZSIsImRlY2F5IiwiU3BvdExpZ2h0IiwiU3BvdExpZ2h0TmF0aXZlIiwiYW5nbGUiLCJleHBvbmVudCIsIk1hdGgiLCJQSSIsIkFyZWFMaWdodCIsIlJlY3RBcmVhTGlnaHROYXRpdmUiLCJDdWJlQ2FtZXJhIiwiQ3ViZUNhbWVyYU5hdGl2ZSIsImN1YmVSZXNvbHV0aW9uIiwiT3J0aG9ncmFwaGljQ2FtZXJhIiwiT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZSIsImFzcGVjdCIsIkJveCIsImJ1aWxkR2VvbWV0cnkiLCJidWZmZXIiLCJCb3hCdWZmZXJHZW9tZXRyeSIsIkJveEdlb21ldHJ5IiwiZGVwdGgiLCJ3aWR0aFNlZ21lbnRzIiwiaGVpZ2h0U2VnbWVudHMiLCJkZXB0aFNlZ21lbnRzIiwiQ2lyY2xlIiwiQ2lyY2xlQnVmZmVyR2VvbWV0cnkiLCJDaXJjbGVHZW9tZXRyeSIsInNlZ21lbnRzIiwidGhldGFTdGFydCIsInRoZXRhTGVuZ3RoIiwiQ29uZSIsIkNvbmVCdWZmZXJHZW9tZXRyeSIsIkNvbmVHZW9tZXRyeSIsInJhZGl1c1NlZ21lbnRzIiwib3BlbkVuZGVkIiwiQ3lsaW5kZXIiLCJDeWxpbmRlckJ1ZmZlckdlb21ldHJ5IiwiQ3lsaW5kZXJHZW9tZXRyeSIsInJhZGl1c1RvcCIsInJhZGl1c0JvdHRvbSIsIkRvZGVjYWhlZHJvbiIsIkRvZGVjYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiRG9kZWNhaGVkcm9uR2VvbWV0cnkiLCJkZXRhaWwiLCJFeHRydWRlIiwiRXh0cnVkZUdlb21ldHJ5Iiwic2hhcGVzIiwib3B0aW9ucyIsIkJ1ZmZlckdlb21ldHJ5IiwiZnJvbUdlb21ldHJ5IiwiSWNvc2FoZWRyb24iLCJJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiSWNvc2FoZWRyb25HZW9tZXRyeSIsIkxhdGhlIiwiTGF0aGVCdWZmZXJHZW9tZXRyeSIsIkxhdGhlR2VvbWV0cnkiLCJwb2ludHMiLCJMaW5lIiwiTGluZU5hdGl2ZSIsIkdlb21ldHJ5IiwicHAiLCJjdXJ2ZSIsImdldFBvaW50cyIsInZlcnRzIiwiRmxvYXQzMkFycmF5IiwiaTMiLCJhZGRBdHRyaWJ1dGUiLCJCdWZmZXJBdHRyaWJ1dGUiLCJ2ZXJ0aWNlcyIsIkxpbmVDdXJ2ZTMiLCJWZWN0b3IzIiwiSW1wb3J0ZXIiLCJmaWx0ZXIiLCJwcm9jZXNzRmlsdGVyIiwiZm9yRWFjaCIsImVsIiwidGV4dHVyZVBhdGgiLCJsYW9kZXIiLCJzZXRUZXh0dXJlUGF0aCIsImxvYWRlciIsImxvYWQiLCJ1cmwiLCJvbkxvYWQiLCJwYXJzZXIiLCJ1c2VDdXN0b21NYXRlcmlhbCIsIm1hdCIsIm9uUHJvZ3Jlc3MiLCJvbkVycm9yIiwiSlNPTkxvYWRlciIsIm1hdGVyaWFscyIsIk9jdGFoZWRyb24iLCJPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJPY3RhaGVkcm9uR2VvbWV0cnkiLCJQYXJhbWV0cmljIiwiUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5IiwiUGFyYW1ldHJpY0dlb21ldHJ5Iiwic2xpY2VzIiwic3RhY2tzIiwidSIsInYiLCJQbGFuZSIsIlBsYW5lQnVmZmVyR2VvbWV0cnkiLCJQbGFuZUdlb21ldHJ5Iiwid1NlZ21lbnRzIiwiaFNlZ21lbnRzIiwidmVydGljZXNPZkN1YmUiLCJpbmRpY2VzT2ZGYWNlcyIsIlBvbHloZWRyb24iLCJQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJQb2x5aGVkcm9uR2VvbWV0cnkiLCJSaW5nIiwiUmluZ0J1ZmZlckdlb21ldHJ5IiwiUmluZ0dlb21ldHJ5IiwiaW5uZXJSYWRpdXMiLCJvdXRlclJhZGl1cyIsInRoZXRhU2VnbWVudHMiLCJwaGlTZWdtZW50cyIsIlNoYXBlIiwiU2hhcGVCdWZmZXJHZW9tZXRyeSIsIlNoYXBlR2VvbWV0cnkiLCJTcGhlcmUiLCJTcGhlcmVCdWZmZXJHZW9tZXRyeSIsIlNwaGVyZUdlb21ldHJ5IiwiVGV0cmFoZWRyb24iLCJUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiVGV0cmFoZWRyb25HZW9tZXRyeSIsIlRleHQiLCJwYXJhbWV0ZXJzIiwiZm9udCIsIlRleHRHZW9tZXRyeSIsInRleHQiLCJGb250TG9hZGVyIiwiRm9udCIsIlRvcnVzIiwiVG9ydXNHZW9tZXRyeSIsInR1YmUiLCJyYWRpYWxTZWdtZW50cyIsInR1YnVsYXJTZWdtZW50cyIsImFyYyIsIlRvcnVza25vdCIsIkdDb25zdHJ1Y3QiLCJUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSIsIlRvcnVzS25vdEdlb21ldHJ5IiwicCIsInEiLCJUdWJlIiwiVHViZUJ1ZmZlckdlb21ldHJ5IiwiVHViZUdlb21ldHJ5IiwicGF0aCIsImNsb3NlZCIsIkdyb3VwIiwib2JqZWN0cyIsIm9iaiIsImFkZFRvIiwiT2JqZWN0M0QiLCJFbGVtZW50TW9kdWxlIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJib2R5IiwiY3JlYXRlRWxlbWVudCIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInNlbGYiLCJhcHBlbmRDaGlsZCIsIlJlbmRlcmluZ01vZHVsZSIsImlzU2hhZG93IiwiYXNzaWduIiwiVmVjdG9yMiIsImRldmljZVBpeGVsUmF0aW8iLCJiZ0NvbG9yIiwiYmdPcGFjaXR5IiwicmVuZGVyZXIiLCJwaXhlbFJhdGlvIiwicmVzb2x1dGlvbiIsIldlYkdMUmVuZGVyZXIiLCJlZmZlY3RzIiwiYXBwbHlBZGRpdGlvbmFsIiwic2V0Q2xlYXJDb2xvciIsInNldFBpeGVsUmF0aW8iLCJzZXRTaXplIiwiTnVtYmVyIiwidG9GaXhlZCIsImlzQXBwbGllZCIsImFkZGl0aW9uYWwiLCJzY2VuZSIsInJlbmRlckxvb3AiLCJyZW5kZXIiLCJhdHRhY2hUb0NhbnZhcyIsImVmZmVjdCIsInNpemUiLCJnZXRTaXplIiwiYXBwIiwiY2FudmFzIiwiZG9tRWxlbWVudCIsImRlZmluZSIsImludGVncmF0ZVJlbmRlcmVyIiwidXBkYXRlIiwiZm9yY2VDb250ZXh0TG9zcyIsInNoYWRvd01hcCIsIlNjZW5lTW9kdWxlIiwid2lsbFNjZW5lQmVSZXBsYWNlZCIsIlNjZW5lIiwic2V0U2NlbmUiLCJSZXNpemVNb2R1bGUiLCJjYWxsYmFja3MiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwicmVuZGVyaW5nIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJnZXRDb250YWluZXIiLCJnZXRSZXNvbHV0aW9uIiwiYXV0byIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyIiwiYWRkQXV0b3Jlc2l6ZSIsImZyYWdtZW50IiwidmVydGV4IiwiU2hhZGVyTWF0ZXJpYWwiLCJVbmlmb3JtIiwiQ29sb3IiLCJXZWJHTFJlbmRlclRhcmdldCIsIkxpbmVhckZpbHRlciIsIlJHQkFGb3JtYXQiLCJSR0JGb3JtYXQiLCJEZXB0aFRleHR1cmUiLCJEZXB0aFN0ZW5jaWxGb3JtYXQiLCJVbnNpZ25lZEludDI0OFR5cGUiLCJwb2x5ZmlsbCIsIm1ldGhvZCIsInNob3dXYXJuIiwiUG9zdFByb2Nlc3Nvck1vZHVsZSIsImRlYnVnIiwiY3VycmVudFBhc3MiLCJjb21wb3NlciIsIkVmZmVjdENvbXBvc2VyIiwiZ2V0RGVsdGEiLCJyZXBsYWNlUmVuZGVyZXIiLCJwYXNzIiwiUmVuZGVyUGFzcyIsImFkZFBhc3MiLCJ0ZXh0dXJlSUQiLCJ1bmlmb3JtcyIsIlNoYWRlclBhc3MiLCJwYXNzZXMiLCJib29sIiwicmVuZGVyVG9TY3JlZW4iLCJFdmVudHNQYXRjaE1vZHVsZSIsIm9yaWdpbk9iamVjdCIsImRlc3RPYmplY3QiLCJldmVudHMiLCJldmVudCIsImVtaXQiLCJwYXRjaEV2ZW50cyIsIlZpcnR1YWxNb3VzZU1vZHVsZSIsImdsb2JhbE1vdmVtZW50IiwibW91c2UiLCJyYXljYXN0ZXIiLCJSYXljYXN0ZXIiLCJwcm9qZWN0aW9uUGxhbmUiLCJjdXN0b21YIiwiY3VzdG9tWSIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRYIiwiY2xpZW50WSIsIm5vcm1hbCIsImdldFdvcmxkRGlyZWN0aW9uIiwic2V0RnJvbUNhbWVyYSIsInJlcXVpcmUiLCJvbiIsImV2IiwiZ2xvYmFsWCIsImdsb2JhbFkiLCJwb2ludGVyTG9ja0VsZW1lbnQiLCJtb3ZlbWVudFgiLCJtb3ZlbWVudFkiLCJuZXN0ZWQiLCJpc0hvdmVyZWQiLCJob3ZlcnMiLCJ0cmF2ZXJzZSIsImNoaWxkIiwiaW50ZXJzZWN0T2JqZWN0cyIsImludGVyc2VjdE9iamVjdCIsInBsYW5lIiwicmF5IiwiaW50ZXJzZWN0UGxhbmUiLCJpbnRlcnNlY3Rpb24iLCJDb250cm9sc01vZHVsZSIsImNvbnRyb2xzIiwiYyIsInVwZGF0ZUxvb3AiLCJGb2dNb2R1bGUiLCJ0eXBlIiwiZm9nIiwiRm9nRXhwMiIsImRlbnNpdHkiLCJGb2ciLCJpc0VxdWFsRGVmYXVsdCIsImEiLCJiIiwiZXF1YWxzIiwiU3RhdGVNb2R1bGUiLCJpc0VxdWFsIiwiZXF1YWxDaGVjayIsImFjdGlvbkdlbmVyYXRlIiwiY29uZmlndXJhdGlvbiIsImN1cnJlbnRDb25maWciLCJwcmV2Q29uZmlnIiwiY29uZmlnIiwiZGVmYXVsdCIsInJlcGxhY2VSZWR1Y2VyIiwiY29uZmlncyIsInVwZGF0ZXMiLCJjb25maWdOYW1lIiwidHJ1ZVZhbCIsImZhbHNlVmFsIiwiVGhyZWVPcmJpdENvbnRyb2xzIiwiZXZlbnRIYW5kbGVyIiwibWluRGlzdGFuY2UiLCJtYXhEaXN0YW5jZSIsIkluZmluaXR5IiwibWluWm9vbSIsIm1heFpvb20iLCJtaW5Qb2xhckFuZ2xlIiwibWF4UG9sYXJBbmdsZSIsIm1pbkF6aW11dGhBbmdsZSIsIm1heEF6aW11dGhBbmdsZSIsImVuYWJsZURhbXBpbmciLCJkYW1waW5nRmFjdG9yIiwiZW5hYmxlWm9vbSIsInpvb21TcGVlZCIsImVuYWJsZVJvdGF0ZSIsInJvdGF0ZVNwZWVkIiwiZW5hYmxlUGFuIiwia2V5UGFuU3BlZWQiLCJhdXRvUm90YXRlIiwiYXV0b1JvdGF0ZVNwZWVkIiwiZW5hYmxlS2V5cyIsImtleXMiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkJPVFRPTSIsIm1vdXNlQnV0dG9ucyIsIk9SQklUIiwiTU9VU0UiLCJaT09NIiwiTUlERExFIiwiUEFOIiwidGFyZ2V0MCIsInBvc2l0aW9uMCIsInpvb20wIiwiem9vbSIsImdldFBvbGFyQW5nbGUiLCJzcGhlcmljYWwiLCJwaGkiLCJnZXRBemltdXRoYWxBbmdsZSIsInRoZXRhIiwicmVzZXQiLCJkaXNwYXRjaEV2ZW50IiwiY2hhbmdlRXZlbnQiLCJTVEFURSIsIk5PTkUiLCJvZmZzZXQiLCJxdWF0IiwiUXVhdGVybmlvbiIsInNldEZyb21Vbml0VmVjdG9ycyIsInVwIiwicXVhdEludmVyc2UiLCJpbnZlcnNlIiwibGFzdFBvc2l0aW9uIiwibGFzdFF1YXRlcm5pb24iLCJzdWIiLCJhcHBseVF1YXRlcm5pb24iLCJzZXRGcm9tVmVjdG9yMyIsInJvdGF0ZUxlZnQiLCJnZXRBdXRvUm90YXRpb25BbmdsZSIsInNwaGVyaWNhbERlbHRhIiwibWluIiwibWFrZVNhZmUiLCJwYW5PZmZzZXQiLCJzZXRGcm9tU3BoZXJpY2FsIiwibG9va0F0Iiwiem9vbUNoYW5nZWQiLCJkaXN0YW5jZVRvU3F1YXJlZCIsIkVQUyIsImRvdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkNvbnRleHRNZW51Iiwib25Nb3VzZURvd24iLCJvbk1vdXNlV2hlZWwiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25Ub3VjaE1vdmUiLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VVcCIsIm9uS2V5RG93biIsInN0YXJ0RXZlbnQiLCJlbmRFdmVudCIsIlJPVEFURSIsIkRPTExZIiwiVE9VQ0hfUk9UQVRFIiwiVE9VQ0hfRE9MTFkiLCJUT1VDSF9QQU4iLCJTcGhlcmljYWwiLCJyb3RhdGVTdGFydCIsInJvdGF0ZUVuZCIsInJvdGF0ZURlbHRhIiwicGFuU3RhcnQiLCJwYW5FbmQiLCJwYW5EZWx0YSIsImRvbGx5U3RhcnQiLCJkb2xseUVuZCIsImRvbGx5RGVsdGEiLCJnZXRab29tU2NhbGUiLCJwb3ciLCJyb3RhdGVVcCIsInBhbkxlZnQiLCJvYmplY3RNYXRyaXgiLCJzZXRGcm9tTWF0cml4Q29sdW1uIiwibXVsdGlwbHlTY2FsYXIiLCJwYW5VcCIsInBhbiIsImRlbHRhWCIsImRlbHRhWSIsInRhcmdldERpc3RhbmNlIiwidGFuIiwiY2xpZW50SGVpZ2h0IiwibWF0cml4IiwiY2xpZW50V2lkdGgiLCJkb2xseUluIiwiZG9sbHlTY2FsZSIsImRvbGx5T3V0IiwiaGFuZGxlTW91c2VEb3duUm90YXRlIiwiaGFuZGxlTW91c2VEb3duRG9sbHkiLCJoYW5kbGVNb3VzZURvd25QYW4iLCJoYW5kbGVNb3VzZU1vdmVSb3RhdGUiLCJzdWJWZWN0b3JzIiwiaGFuZGxlTW91c2VNb3ZlRG9sbHkiLCJoYW5kbGVNb3VzZU1vdmVQYW4iLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VXaGVlbCIsImhhbmRsZUtleURvd24iLCJrZXlDb2RlIiwiaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiaGFuZGxlVG91Y2hTdGFydERvbGx5IiwiZHgiLCJkeSIsInNxcnQiLCJoYW5kbGVUb3VjaFN0YXJ0UGFuIiwiaGFuZGxlVG91Y2hNb3ZlUm90YXRlIiwiaGFuZGxlVG91Y2hNb3ZlRG9sbHkiLCJoYW5kbGVUb3VjaE1vdmVQYW4iLCJoYW5kbGVUb3VjaEVuZCIsInByZXZlbnREZWZhdWx0IiwiYnV0dG9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRXZlbnREaXNwYXRjaGVyIiwiT3JiaXRDb250cm9sc01vZHVsZSIsImZvbGxvdyIsInVwZGF0ZVByb2Nlc3NvciIsInNldENvbnRyb2xzIiwic2V0VXBkYXRlIiwiRHluYW1pY0dlb21ldHJ5TW9kdWxlIiwiZ18iLCJ1cGRhdGVQYXJhbXMiLCJUZXh0dXJlTG9hZGVyIiwiVGV4dHVyZU1vZHVsZSIsInRleHR1cmVzIiwidGV4dHVyZSIsInJlcGVhdCIsIlJlcGVhdFdyYXBwaW5nIiwibWFwcGluZyIsIlVWTWFwcGluZyIsImZpeCIsInRleCIsIndyYXBTIiwid3JhcFQiLCJtYWdGaWx0ZXIiLCJOZWFyZXN0RmlsdGVyIiwibWluRmlsdGVyIiwiTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyIiwiQW5pbWF0aW9uTW9kdWxlIiwiaXNEZWZlcnJlZCIsInNrZWxldG9uIiwibWl4ZXIiLCJBbmltYXRpb25NaXhlciIsImNsaXBzIiwiYW5pbWF0aW9ucyIsImNsaXBOYW1lIiwiY2xpcCIsIkFuaW1hdGlvbkNsaXAiLCJmaW5kQnlOYW1lIiwiY2xpcEFjdGlvbiIsInBsYXkiLCJzcGVlZCIsIkRlZmluZU1vZHVsZSIsIk1vZGVsIiwiQ2FtZXJhTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sSUFBTUEsU0FBUyxTQUFUQSxNQUFTLENBQUNDLE1BQUQsRUFBMkI7b0NBQWZDLFVBQWU7Y0FBQTs7Ozs7Ozs7O3lCQUN2QkEsVUFBeEIsOEhBQW9DO1VBQXpCQyxTQUF5Qjs7Ozs7VUFJOUIsQ0FBQ0EsU0FBTCxFQUNFLFNBTGdDOzs7Ozs7OzhCQU9mQyxPQUFPQyxtQkFBUCxDQUEyQkYsU0FBM0IsQ0FBbkIsbUlBQTBEO2NBQS9DRyxJQUErQzs7Y0FDcERMLE9BQU9LLElBQVAsTUFBaUJDLFNBQWpCLElBQThCSixVQUFVRyxJQUFWLENBQTlCLElBQ0NMLE9BQU9LLElBQVAs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QyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUM7SUFDdEQ7Ozs7RUFJRCxNQUFNLENBQUMsR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUMvQixJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsRUFBQztJQUNyQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSztRQUM1QixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNsRDs7OztFQUlELE1BQU0sQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUM7SUFDMUIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7R0FDcEUsQ0FBQztDQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
