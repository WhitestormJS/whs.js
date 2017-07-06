/* WhitestormJS Framework v2.1.0 */
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
      if (!this.modules && !source) return;
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

if (undefined !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
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

const version = "2.1.0";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vc3JjL3V0aWxzL3RyYW5zZm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvbWluaXZlbnRzL2Rpc3QvbWluaXZlbnRzLmNvbW1vbmpzLmpzIiwiLi4vc3JjL2NvcmUvZXJyb3JzLmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlU3lzdGVtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyQXJnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21wb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2luZGV4LmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlTWFuYWdlci5qcyIsIi4uL3NyYy9jb3JlL0NvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL3Byb3RvdHlwZS9hdHRyaWJ1dGVzLmpzIiwiLi4vc3JjL2NvcmUvTWVzaENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0xpZ2h0Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvcmUvQ2FtZXJhQ29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3ByZXNlbnQvbGliL3ByZXNlbnQtbm9kZS5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9BbWJpZW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9IZW1pc3BoZXJlTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvUG9pbnRMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9TcG90TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQXJlYUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9DdWJlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9PcnRob2dyYXBoaWNDYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Cb3guanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ2lyY2xlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NvbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ3lsaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvRG9kZWNhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0V4dHJ1ZGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSWNvc2FoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGF0aGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGluZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9PY3RhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BhcmFtZXRyaWMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUGxhbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUG9seWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9SaW5nLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NoYXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NwaGVyZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXRyYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXh0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVza25vdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UdWJlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0dyb3VwLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0VsZW1lbnRNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1NjZW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvbnZvbHV0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvY29weS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvcGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2NsZWFyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvY2xlYXItbWFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dsaXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3JlbmRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL21hc2suanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaGFkZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaG9jay13YXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL2NvcmUvZWZmZWN0LWNvbXBvc2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Qb3N0UHJvY2Vzc29yTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0V2ZW50c1BhdGNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1ZpcnR1YWxNb3VzZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Gb2dNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvU3RhdGVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvbGliL1RocmVlT3JiaXRDb250cm9scy5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9PcmJpdENvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9EeW5hbWljR2VvbWV0cnlNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL1RleHR1cmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL0FuaW1hdGlvbk1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIi4uL3NyYy9kZXByZWNhdGlvbi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZXh0ZW5kID0gKG9iamVjdCwgLi4uZXh0ZW5zaW9ucykgPT4geyAvLyAkLmV4dGVuZCBhbHRlcm5hdGl2ZSwgLi4uIGlzIHRoZSBzcHJlYWQgb3BlcmF0b3IuXG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhleHRlbnNpb24pO1xuICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBleHRlbnNpb24pO1xuXG4gICAgaWYgKCFleHRlbnNpb24pXG4gICAgICBjb250aW51ZTsgLy8gSWdub3JlIG51bGwgYW5kIHVuZGVmaW5lZCBvYmplY3RzIGFuZCBwYXJhbWV0ZXJzLlxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4dGVuc2lvbikpIHsgLy8gRG8gbm90IHRyYXZlcnNlIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICBpZiAob2JqZWN0W3Byb3BdICE9PSB1bmRlZmluZWQgJiYgZXh0ZW5zaW9uW3Byb3BdXG4gICAgICAgICYmIG9iamVjdFtwcm9wXS50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAmJiBleHRlbnNpb25bcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgLy8gR29lcyBkZWVwIG9ubHkgaWYgb2JqZWN0W3Byb3BdIGFuZCBleHRlbnNpb25bcHJvcF0gYXJlIGJvdGggb2JqZWN0cyAhXG4gICAgICAgIGlmIChleHRlbnNpb25bcHJvcF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkgZXh0ZW5kKG9iamVjdFtwcm9wXSwgZXh0ZW5zaW9uW3Byb3BdKTtcbiAgICAgICAgZWxzZSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF07XG4gICAgICB9IGVsc2VcbiAgICAgICAgb2JqZWN0W3Byb3BdID0gdHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgPyBleHRlbnNpb25bcHJvcF0gOiBvYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXS5zbGljZSgpOyAvLyBBZGQgdmFsdWVzIHRoYXQgZG8gbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsImV4cG9ydCBjb25zdCBpbnN0cnVjdCA9IChhcnJheSwgaW5zdEFycmF5KSA9PiB7XG4gIGNvbnN0IHRlbXBPYmplY3QgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdEFycmF5Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgY29uc3QgZ3VpZGUgPSBpbnN0QXJyYXlbaV07XG5cbiAgICB0ZW1wT2JqZWN0W2d1aWRlXSA9IGFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBPYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtRGF0YSA9IChvYmplY3QsIGluc3RydWN0aW9ucykgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0cnVjdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkpXG4gICAgICBvYmplY3Rba2V5XSA9IGluc3RydWN0KG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gICAgZWxzZSBpZiAob2JqZWN0W2tleV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgIShBcnJheS5pc0FycmF5KGluc3RydWN0aW9uc1trZXldKSkpXG4gICAgICBvYmplY3Rba2V5XSA9IHRyYW5zZm9ybURhdGEob2JqZWN0W2tleV0sIGluc3RydWN0aW9uc1trZXldKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdG9BcnJheSA9IChvYmplY3QsIGluc3RydWN0aW9uKSA9PiB7XG4gIGNvbnN0IHRlbXBBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnN0cnVjdGlvbi5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdHJ1Y3Rpb25baV07XG5cbiAgICB0ZW1wQXJyYXlbaV0gPSBvYmplY3RbZ3VpZGVdO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGNvbXBvbmVudCk7XG5cbiAgICB0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY3lFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgYWN0aXZlTW9kdWxlLCBkZXBlbmRlbmN5TW9kdWxlID0gZmFsc2UpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcbiAgICBpZiAoY29uc29sZSAmJiBkZXBlbmRlbmN5TW9kdWxlKSBjb25zb2xlLmVycm9yKCdEZXBlbmRlbmN5IHB1Ymxpc2hlZCBieSBtb2R1bGU6JywgZGVwZW5kZW5jeU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnRGVwZW5kZW5jeUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQsIGFjdGl2ZU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdDb21wb25lbnQ6JywgY29tcG9uZW50KTtcbiAgICBpZiAoY29uc29sZSAmJiBhY3RpdmVNb2R1bGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcblxuICAgIHRoaXMubmFtZSA9ICdNYW5hZ2VyRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge01hbmFnZXJFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgcjg0LiBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG4vKipcbiAqIEBjbGFzcyBNb2R1bGVTeXN0ZW1cbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gIFByb3ZpZGVzIEFQSSBmb3IgY2xhc3NlcyB0aGF0IHdpbGwgdXNlIE1vZHVsZXMuPGJyLz5cbiAqIFRoaXMgY2xhc3MgaW5jbHVkZXMgYmFzaWMgZXZlbnQgc3lzdGVtIHdpdGggdGhvc2Ugc3VwcG9ydGVkIG1ldGhvZHM6XG4gKiA8cHJlPi5vbigpPC9wcmU+PHByZT4ub2ZmKCk8L3ByZT48cHJlPi5lbWl0KCk8L3ByZT5cbiAqIEBleHRlbmRzIEV2ZW50c1xuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0gZXh0ZW5kcyBFdmVudHMge1xuICAvLyBJTlRFR1JBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGludGVncmF0ZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBhcHBsaWVzIGFsbCBtb2R1bGVzIGZyb20gLm1vZHVsZXMgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2VdIElmIHNvdXJjZSAoc2hvdWxkIGJlIGEgY29tcG9uZW50KSBpcyBwcm92aWRlZCwgd2lsbCByZXBsYWNlIC5tb2R1bGVzIHdpdGggc291cmNlJ3Mgb25lIGJlZm9yZSBleGVjdXRpbmcgbW9kdWxlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpIHtcbiAgICBpZiAoIXRoaXMubW9kdWxlcyAmJiAhc291cmNlKSByZXR1cm47XG4gICAgaWYgKHNvdXJjZSkgdGhpcy5tb2R1bGVzID0gc291cmNlLm1vZHVsZXMuc2xpY2UoMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKVxuICAgICAgdGhpcy5hcHBseU1vZHVsZSh0aGlzLm1vZHVsZXNbaV0sIGZhbHNlKTtcblxuICAgIGlmIChzb3VyY2UpIHRoaXMuYXBwbHlCcmlkZ2Uoe29uQ29weTogc291cmNlfSk7XG4gIH1cblxuICAvLyBBUFBMWUlORyBNT0RVTEUgKC4uLmFuZCBhIFwiYnJpZGdlXCIgZm9yIG1vZHVsZSlcblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUJyaWRnZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2VzIGNvbXBvbmVudC1zcGVjaWZpYyBBUEkgdG8gd29yayB3aXRoIG1vZHVsZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBicmlkZ2VNYXBcbiAgICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIG9iamVjdCB3aXRoIG1vZGlmaWVkIHZhbHVlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlCcmlkZ2UoYnJpZGdlTWFwID0ge30pIHtcbiAgICBjb25zdCBtb2R1bGVzID0gdGhpcy5tb2R1bGVzO1xuICAgIGlmICghbW9kdWxlcykgcmV0dXJuIGJyaWRnZU1hcDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBicmlkZ2VNYXApIHtcbiAgICAgICAgaWYgKGJyaWRnZU1hcFtrZXldKSB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlc1tpXTtcblxuICAgICAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLmJyaWRnZSAmJiBtb2R1bGUuYnJpZGdlW2tleV0pXG4gICAgICAgICAgICBicmlkZ2VNYXBba2V5XSA9IG1vZHVsZS5icmlkZ2Vba2V5XS5hcHBseSh0aGlzLCBbYnJpZGdlTWFwW2tleV0sIG1vZHVsZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJyaWRnZU1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5Q29tbWFuZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIC5hcHBseUNvbW1hbmQgcnVucyBhIG1ldGhvZCBjYWxsZWQgYG5hbWVgIG9uIGFsbCBtb2R1bGVzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgbWV0aG9kIG5hbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYj0oZnVuYywgbW9kdWxlU2NvcGUpID0+IGZ1bmMuYXBwbHkodGhpcywgW21vZHVsZVNjb3BlXSldIEhvdyB0aGUgZnVuY3Rpb24gaXMgd3JhcHBlZC9cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlDb21tYW5kKG5hbWUsIGNiID0gKGZ1bmMsIG1vZHVsZVNjb3BlKSA9PiBmdW5jLmFwcGx5KHRoaXMsIFttb2R1bGVTY29wZV0pKSB7XG4gICAgY29uc3QgbW9kdWxlcyA9IHRoaXMubW9kdWxlcztcbiAgICBpZiAoIW1vZHVsZXMpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBjb25zdCBtb2R1bGUgPSBtb2R1bGVzW2ldO1xuICAgICAgaWYgKG5hbWUgaW4gbW9kdWxlKSBjYihtb2R1bGVbbmFtZV0sIG1vZHVsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlNb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiAuYXBwbHlNb2R1bGUgaXMgYWxzbyB1c2VkIGluIC5pbnRlZ3JhdGVNb2R1bGVzKCkgZnVuY3Rpb24uXG4gICAqIEl0IGRvZXMgZXhhY3RseSB3aGF0IGl0cyBuYW1lIHNheXMgKGFwcGxpZXMgbW9kdWxlIHRvIGNvbXBvbmVudCBvciBhcHApLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHBhcmFtIHtCb29sZWFufSBbcHVzaD10cnVlXVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIGFwcGxpZWQuXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlNb2R1bGUobW9kdWxlLCBwdXNoID0gdHJ1ZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG4gICAgaWYgKHB1c2ggJiYgdGhpcy5tb2R1bGVzKSB0aGlzLm1vZHVsZXMucHVzaChtb2R1bGUpO1xuICAgIGVsc2UgaWYgKHB1c2gpIHRoaXMubW9kdWxlcyA9IFttb2R1bGVdO1xuXG4gICAgaWYgKHRoaXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyLmFjdGl2ZShtb2R1bGUpO1xuXG4gICAgaWYgKG1vZHVsZS5tYW5hZ2VyICYmIHRoaXMubWFuYWdlcikgbW9kdWxlLm1hbmFnZXIodGhpcy5tYW5hZ2VyKTtcbiAgICBlbHNlIGlmIChtb2R1bGUubWFuYWdlcikge1xuICAgICAgdGhyb3cgbmV3IE1hbmFnZXJFcnJvcihcbiAgICAgICAgJ0NvbXBvbmVudCcsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgTW9kdWxlTWFuYWdlciB0aGF0IGlzIHR1cm5lZCBvZmYgZm9yIHRoaXMgY29tcG9uZW50YCxcbiAgICAgICAgdGhpcywgbW9kdWxlXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUuaW50ZWdyYXRlKSBtb2R1bGUuaW50ZWdyYXRlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIGFsbCBtb2R1bGVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGVzKCkge1xuICAgIHdoaWxlICh0aGlzLm1vZHVsZXMubGVuZ3RoKVxuICAgICAgdGhpcy5kaXNwb3NlTW9kdWxlKHRoaXMubW9kdWxlc1swXSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGlzcG9zZXMgb2YgdGhlIGdpdmVuIG1vZHVsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gZGlzcG9zZVxuICAgKiBAcmV0dXJuIHtNb2R1bGV9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIHJlbW92ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGUobW9kdWxlKSB7XG4gICAgaWYgKCFtb2R1bGUpIHJldHVybjtcblxuICAgIHRoaXMubW9kdWxlcy5zcGxpY2UodGhpcy5tb2R1bGVzLmluZGV4T2YobW9kdWxlKSwgMSk7XG5cbiAgICBpZiAobW9kdWxlLmRpc3Bvc2UpIG1vZHVsZS5kaXNwb3NlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvLyBQSVBFRCBNRVRIT0RcblxuICAvKipcbiAgICogQG1ldGhvZCBtb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBwaXBlZCB2ZXJzaW9uIG9mIC5hcHBseU1vZHVsZSgpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHJldHVybiB7dGhpc30gcmV0dXJucyB0aGlzIC0gYXBwL2NvbXBvbmVudFxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UGlwZWQgbW9kdWxlczwvY2FwdGlvbj5cbiAgICogY29tcG9uZW50XG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMSgpKVxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTIoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUzKCkpXG4gICAqL1xuICBtb2R1bGUobW9kdWxlKSB7XG4gICAgdGhpcy5hcHBseU1vZHVsZShtb2R1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IGJhc2VHZXRUYWcodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJlxuICAgIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUGxhaW5PYmplY3Q7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFN5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG4iLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICAgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAgICpcbiAgICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICAgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gICAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gICAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gICAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAgICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICAgKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICAgKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gICAqL1xufTtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn0iLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufSIsIi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn0iLCJpbXBvcnQgY3JlYXRlU3RvcmUgZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgY29tYmluZVJlZHVjZXJzIGZyb20gJy4vY29tYmluZVJlZHVjZXJzJztcbmltcG9ydCBiaW5kQWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi9iaW5kQWN0aW9uQ3JlYXRvcnMnO1xuaW1wb3J0IGFwcGx5TWlkZGxld2FyZSBmcm9tICcuL2FwcGx5TWlkZGxld2FyZSc7XG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZygnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGJpbmRBY3Rpb25DcmVhdG9ycywgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH07IiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtEZXBlbmRlbmN5RXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgTW9kdWxlTWFuYWdlclxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgaGFuZGxlclxuICogQGRlc2NyaXB0aW9uICBTb2x2ZXMgbW9kdWxlcyBkZXBlbmRlbmNpZXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG9iamVjdDtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuXG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKChzdGF0ZSA9IFt7fSwgJyddLCBhY3Rpb24pID0+IHtcbiAgICAgIHN0YXRlWzBdW2FjdGlvbi5rZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICBzdGF0ZVsxXSA9IGFjdGlvbi5rZXk7XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWN0aXZlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyAuY3VycmVudE1vZHVsZSB0byBwcm92aWRlZCBtb2R1bGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBtYWtlIGN1cnJlbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGFjdGl2ZShtb2R1bGUpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldCdzIC5jdXJyZW50TW9kdWxlIHRvIG51bGwuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmaW5lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lIHRoZSBtb2R1bGUgaW4gbWFuYWdlclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbW9kdWxlIG5hbWVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGRlZmluZShuYW1lKSB7XG4gICAgdGhpcy5tb2R1bGVzW25hbWVdID0gdGhpcy5jdXJyZW50TW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXNlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBkZWZpbmVkIG1vZHVsZSBmcm9tIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1c2UobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1vZHVsZXNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBbiBhbGlhcyBmb3IgLmFkZCgpIDxici8+PGJyLz5cbiAgICogVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSBrbm93IHRoYXQgeW91IHdpbGwgb3ZlcndyaXRlIGV4aXN0aW5nIGRlcGVuZGVuY3kuPGJyLz5cbiAgICogVXNlIGl0IGluIHlvdXIgYXBwLCBidXQgbm90IGluIG1vZHVsZSB0aGF0IHlvdSBwcm92aWRlIHRvIG90aGVyIHBlb3BsZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHRoZSB2YWx1ZSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgc2V0KGtleSwgZGF0YSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ0FERCcsXG4gICAgICBrZXksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGRlcGVuZGVuY3kgaW4gc3RvcmUgb2JqZWN0LCBieSBrZXkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKiBAcmV0dXJuIHtPYmplY3R8TW9kdWxlfVxuICAgKiBAdGhyb3dzIHtEZXBlbmRlbmN5RXJyb3J9IGlmIGRlcGVuZGVuY3kgaXMgbm90IGluIHRoZSBzdG9yZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXQgdGhlICdoZWxsbycgZGVwZW5kZW5jeTwvY2FwdGlvbj5cbiAgICogbWFuYWdlci5nZXQoJ2hlbGxvJyk7IC8vIC0+IHt3b3JsZDogdHJ1ZX1cbiAgICovXG4gIGdldChrZXkpIHtcbiAgICBpZiAoIXRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKSB7XG4gICAgICB0aHJvdyBuZXcgRGVwZW5kZW5jeUVycm9yKFxuICAgICAgICAnTW9kdWxlTWFuYWdlcicsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgJyR7a2V5fScgZGVwZW5kZW5jeWAsXG4gICAgICAgIHRoaXMuY3VycmVudE1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBoYXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHdoZXRoZXIgbWFuYWdlciBoYXMgYSBkZXBlbmRlbmN5IHdpdGggdGhlIGdpdmVuIGtleVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q2hlY2sgd2hldGhlciB0aGUgc3RvcmUgaGFzIHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuaGFzKCdoZWxsbycpOyAvLyAtPiB0cnVlXG4gICAqL1xuICBoYXMoa2V5KSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyBkZXBzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbZGVwc01hcD17fV1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHVwZGF0ZShkZXBzTWFwID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBbZGF0YSwgY2hhbmdlZEtleV0gPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGRlcHNNYXBbY2hhbmdlZEtleV07XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YVtjaGFuZ2VkS2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGFsaWFzIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXIjc2V0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhZGQoLi4uZGF0YSkge1xuICAgIGNvbnNvbGUud2FybignLmFkZCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBVc2UgLnNldCgpIGluc3RlYWQnKTtcbiAgICByZXR1cm4gdGhpcy5zZXQoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXF1aXJlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmVxdWlyZSBtb2R1bGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgRGVmaW5lZCBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZHVsZUV4ZWN1dG9yIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhcHBsaWVkIG1vZHVsZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVxdWlyZShuYW1lLCBtb2R1bGVFeGVjdXRvcikge1xuICAgIGlmICh0aGlzLnVzZShuYW1lKSA9PT0gdW5kZWZpbmVkKSB0aGlzLmhhbmRsZXIuYXBwbHlNb2R1bGUobW9kdWxlRXhlY3V0b3IoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7ZXh0ZW5kLCB0cmFuc2Zvcm1EYXRhfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5pbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuaW1wb3J0IHtNb2R1bGVNYW5hZ2VyfSBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuaW1wb3J0IHtNYW5hZ2VyRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCB7XG4gICAqICAgbW9kdWxlczogW10sXG4gICAqICAgbWFuYWdlcjogdHJ1ZVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgbW9kdWxlczogbnVsbCxcbiAgICBtYW5hZ2VyOiB0cnVlXG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge31cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7fTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgcHJvbWlzZXMgdGhhdCBzaG91bGQgYmUgcmVzb2x2ZWQgYmVmb3JlIENvbXBvbmVudCBpcyByZWFkeS5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNfd2FpdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3dhaXQgPSBbXTsgLy8gQ29sbGVjdGlvbiBvZiBwcm9taXNlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgbW9kdWxlc2AuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbW9kdWxlc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBtb2R1bGVzID0gW107IC8vIENvbGxlY3Rpb24gb2YgbW9kdWxlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgY2hpbGRgIENvbXBvbmVudHMuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjY2hpbGRyZW5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2hpbGRyZW4gPSBbXTsgLy8gRm9yIGtlZXBpbmcgY2hpbGRyZW4gY29tcG9uZW50cztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZGVmYXVsdHMgPSBDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gQXBwbHkgcG9seWZpbGxlZCBwYXJhbWV0ZXJzIHRvIC5wYXJhbXM7XG4gICAgdGhpcy5wYXJhbXMgPSBleHRlbmQodHJhbnNmb3JtRGF0YShwYXJhbXMsIGluc3RydWN0aW9ucyksIGRlZmF1bHRzKTtcbiAgICBpZiAodGhpcy5wYXJhbXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIoKTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHRoaXMucGFyYW1zLm1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdhaXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXYWl0IGZvciBhIHByb21pc2UuXG4gICAqIEBwYXJhbSB7UHJvbWlzZX0gW3Byb21pc2VdIC0gVGhlIHByb21pc2UgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gYSBxdWV1ZS5cbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgd2FpdChwcm9taXNlKSB7XG4gICAgaWYgKHByb21pc2UpIHRoaXMuX3dhaXQucHVzaChwcm9taXNlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fd2FpdCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZlclxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGUgYGZ1bmNgIChDYWxsYmFjaykgd2hlbiBDb21wb25lbnQgaXMgcmVhZHkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBDYWxsYmFjay5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgZGVmZXIoZnVuYykge1xuICAgIGlmICh0aGlzLmlzRGVmZmVyZWQpIHRoaXMud2FpdCgpLnRoZW4oKCkgPT4gZnVuYyh0aGlzKSk7XG4gICAgZWxzZSBmdW5jKHRoaXMpO1xuICB9XG5cbiAgLy8gUEFSQU1FVEVSU1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVBhcmFtc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgcGFyYW1ldGVycyBvZiB0aGUgQ29tcG9uZW50LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFBhcmFtcyBvZiB0aGlzIENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICB1cGRhdGVQYXJhbXMocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IGV4dGVuZChwYXJhbXMsIHRoaXMucGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXM7XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ2xvbmUgdGhpcyBjb21wb25lbnRcbiAgICogQHJldHVybiB7b2JqZWN0fSBhIGNsb25lZCBjb21wb25lbnQgd2l0aCBhbGwgaXRzIHNvdXJjZSBjb21wb25lbnQnIHBhcmFtcyBjb3BpZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnBhcmFtcykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSBuYXRpdmUgYW5kIGludGVncmF0ZSBgbW9kdWxlc2AgdG8gaXQuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBzb3VyY2UgLSBTb3VyY2UgY29tcG9uZW50IHRoYXQgaXMgdXNlZCBmb3IgYGNvcHkoKWAgYWN0aW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplXSAtIENhbGxiYWNrIGV4ZWN1dGVkIGJlZm9yZSBtb2R1bGVzIGludGVncmF0aW9uIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge3RoaXN9IENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSwgY3VzdG9taXplKSB7XG4gICAgdGhpcy5wYXJhbXMgPSB7Li4uc291cmNlLnBhcmFtc307XG5cbiAgICBpZiAoc291cmNlLm5hdGl2ZSkgdGhpcy5uYXRpdmUgPSBzb3VyY2UubmF0aXZlLmNsb25lKHNvdXJjZS5wYXJhbXMpO1xuICAgIGlmIChjdXN0b21pemUpIGN1c3RvbWl6ZSgpO1xuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhZGRlZCBhcyBhIGBjaGlsZGAuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGRvbmUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGFkZChvYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge25hdGl2ZX0gPSBvYmplY3Q7XG4gICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9taXNlID0gdGhpcy5hcHBseUJyaWRnZSh7b25BZGQ6IG9iamVjdH0pLm9uQWRkO1xuXG4gICAgICAgIGNvbnN0IHJlc29sdmVyID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlLmFkZChuYXRpdmUpO1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhZGRQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgYWRkUHJvbWlzZS50aGVuKHJlc29sdmVyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhICoqY2hpbGQqKiBvZiB0aGlzIENvbXBvbmVudC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgcmVtb3ZlKG9iamVjdCkge1xuICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMubmF0aXZlLnJlbW92ZShvYmplY3QubmF0aXZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZFRvXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBgdGhpc2AgQ29tcG9uZW50IHRvIHNwZWNpZmllZCBgQXBwYC9gQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHdpbGwgYmUgYSBwYXJlbnQgb2YgYHRoaXNgLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBhZGRUbyhvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0LmFkZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBgYXN5bmNgIChgd2FpdGAgcHJvbWlzZXMgYXJlIG1vcmUgdGhhbiBgMGApLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaXNEZWZmZXJlZFxuICAgKi9cbiAgZ2V0IGlzRGVmZmVyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhaXQubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgTW9kdWxlTWFuYWdlcmAgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqIEBtZW1iZXIge01vZHVsZU1hbmFnZXJ9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNtYW5hZ2VyXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICovXG4gIGdldCBtYW5hZ2VyKCkge1xuICAgIGlmICh0aGlzLl9tYW5hZ2VyKSByZXR1cm4gdGhpcy5fbWFuYWdlcjtcblxuICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAnQ29tcG9uZW50JyxcbiAgICAgIGBNb2R1bGVNYW5hZ2VyIGlzIG5vdCB1c2VkIGluIHRoaXMgY29tcG9uZW50LiAnbWFuYWdlcicgcGFyYW1ldGVyIHNob3VsZCBiZSBzZXQgYXMgJ3RydWUnYCxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgc2V0IG1hbmFnZXIobWFuYWdlcikge1xuICAgIHRoaXMuX21hbmFnZXIgPSBtYW5hZ2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBuYXRpdmVgIG9iamVjdCB1c2VkIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbmF0aXZlXG4gICAqL1xuICBnZXQgbmF0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cblxuICBzZXQgbmF0aXZlKG1lc2gpIHtcbiAgICB0aGlzLl9uYXRpdmUgPSBtZXNoO1xuICAgIHRoaXMuX25hdGl2ZS5jb21wb25lbnQgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29tcG9uZW50XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGF0dHJpYnV0ZXMoLi4ubWFwcGVycykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWFwcGVyID0gbWFwcGVyc1tpXTtcblxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtYXBwZXIubWFwLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG1hcHBlci5tYXBba107XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldC5wcm90b3R5cGUsIGF0dHJpYnV0ZSwge1xuICAgICAgICAgIGdldDogbWFwcGVyLmdldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIHNldDogbWFwcGVyLnNldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogbWFwcGVyLmNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBtYXBwZXIuZW51bWVyYWJsZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KC4uLm1hcCkge1xuICByZXR1cm4ge1xuICAgIG1hcCxcbiAgICBnZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlW25hbWVdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlW25hbWVdLmNvcHkodmFsdWUpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXJyb3IoLi4ubWFwKSB7XG4gIHJldHVybiB7XG4gICAgbWFwLFxuICAgIGdldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVbbmFtZV07XG4gICAgICB9O1xuICAgIH0sXG4gICAgc2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufVxuIiwiaW1wb3J0IHtNZXNofSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHksIG1pcnJvcn0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAnc2NhbGUnKSxcbiAgbWlycm9yKCdtYXRlcmlhbCcsICdnZW9tZXRyeScpXG4pXG4vKipcbiAqIEBjbGFzcyBNZXNoQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBNZXNoQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICogICBnZW9tZXRyeToge30sXG4gICAqICAgbWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHNoYWRvdzoge1xuICAgKiAgICAgY2FzdDogdHJ1ZSxcbiAgICogICAgIHJlY2VpdmU6IHRydWVcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICBzY2FsZToge3g6IDEsIHk6IDEsIHo6IDF9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcbiAgICBnZW9tZXRyeToge30sXG4gICAgbWF0ZXJpYWw6IGZhbHNlLFxuXG4gICAgc2hhZG93OiB7XG4gICAgICBjYXN0OiB0cnVlLFxuICAgICAgcmVjZWl2ZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgc2NhbGU6IHt4OiAxLCB5OiAxLCB6OiAxfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIC8vIENVU1RPTSBHRU9NRVRSWSBIQU5ETElOR1xuXG4gIHN0YXRpYyBjdXN0b20oZ2VvbSwgY29uc3RydWN0b3IgPSBNZXNoKSB7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gICAgICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgICAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBnZW9tLFxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBjb25zdHJ1Y3RvcihnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShnZW9tLCBwYXJhbXMsIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoTWVzaENvbXBvbmVudC5jdXN0b20oZ2VvbSwgY29uc3RydWN0b3IpKShwYXJhbXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IE1lc2hDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IE1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdGhpcy53YWl0KGJ1aWxkKTtcblxuICAgICAgICB0aGlzLndhaXQobmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgICAgICB0aGlzLndyYXAoKS50aGVuKHJlc29sdmUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuICAgICAgICB0aGlzLndhaXQodGhpcy53cmFwKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXBwbHlDb21tYW5kKCdwb3N0SW50ZWdyYXRlJyk7XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gVE9ETzogRml4IGRlZmVyIHdpdGggcGh5c2ljc1xuICAgICAgLy8gdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICBjb25zdCB7cG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZSwgc2hhZG93fSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnopO1xuICAgICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUueCwgc2NhbGUueSwgc2NhbGUueik7XG5cbiAgICAgIHRoaXMubmF0aXZlLmNhc3RTaGFkb3cgPSBzaGFkb3cuY2FzdDtcbiAgICAgIHRoaXMubmF0aXZlLnJlY2VpdmVTaGFkb3cgPSBzaGFkb3cucmVjZWl2ZTtcblxuICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAvLyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBNZXNoQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTWVzaENvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7TWVzaENvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGNsb25lKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgIGNvbnN0IGRlc3QgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcblxuICAgIGlmIChnZW9tZXRyeSkgZGVzdC5nZW9tZXRyeSA9IGRlc3QuZ2VvbWV0cnkuY2xvbmUoKTtcbiAgICBpZiAobWF0ZXJpYWwpIGRlc3QubWF0ZXJpYWwgPSBkZXN0Lm1hdGVyaWFsLmNsb25lKCk7XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBNZXNoQ29tcG9uZW50XG59O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5fSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICd0YXJnZXQnKVxuKVxuLyoqXG4gKiBAY2xhc3MgTGlnaHRDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExpZ2h0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqXG4gICAqICAgc2hhZG93OiB7XG4gICAqICAgICBjYXN0OiB0cnVlLFxuICAgKlxuICAgKiAgICAgYmlhczogMCxcbiAgICogICAgIHJhZGl1czogMSxcbiAgICpcbiAgICogICAgIG1hcFNpemU6IHtcbiAgICogICAgICAgd2lkdGg6IDEwMjQsXG4gICAqICAgICAgIGhlaWdodDogMTAyNFxuICAgKiAgICAgfSxcbiAgICpcbiAgICogICAgIGNhbWVyYToge1xuICAgKiAgICAgICBuZWFyOiB0cnVlLFxuICAgKiAgICAgICBmYXI6IDQwMCxcbiAgICogICAgICAgZm92OiA5MCxcbiAgICpcbiAgICogICAgICAgdG9wOiAyMDAsXG4gICAqICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICogICAgICAgbGVmdDogLTIwMCxcbiAgICogICAgICAgcmlnaHQ6IDIwMFxuICAgKiAgICAgfVxuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcblxuICAgIHNoYWRvdzoge1xuICAgICAgY2FzdDogdHJ1ZSxcblxuICAgICAgYmlhczogMCxcbiAgICAgIHJhZGl1czogMSxcblxuICAgICAgbWFwU2l6ZToge1xuICAgICAgICB3aWR0aDogMTAyNCxcbiAgICAgICAgaGVpZ2h0OiAxMDI0XG4gICAgICB9LFxuXG4gICAgICBjYW1lcmE6IHtcbiAgICAgICAgbmVhcjogdHJ1ZSxcbiAgICAgICAgZmFyOiA0MDAsXG4gICAgICAgIGZvdjogOTAsXG5cbiAgICAgICAgdG9wOiAyMDAsXG4gICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICAgICAgbGVmdDogLTIwMCxcbiAgICAgICAgcmlnaHQ6IDIwMFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IExpZ2h0Q29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ0xpZ2h0Q29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHRoaXMubmF0aXZlID0gYnVpbGQ7XG5cbiAgICAgIHRoaXMud2FpdCh0aGlzLndyYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseUNvbW1hbmQoJ3Bvc3RJbnRlZ3JhdGUnKTtcbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9uLCByb3RhdGlvbn0gPSB0aGlzLnBhcmFtcztcblxuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XG5cbiAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFNoYWRvd1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHNoYWRvdyBwcm9wZXJ0aWVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcFNoYWRvdygpIHtcbiAgICBjb25zdCB7bmF0aXZlLCBwYXJhbXM6IHtzaGFkb3d9fSA9IHRoaXM7XG5cbiAgICBuYXRpdmUuY2FzdFNoYWRvdyA9IHNoYWRvdy5jYXN0O1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IHNoYWRvdy5tYXBTaXplLndpZHRoO1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSBzaGFkb3cubWFwU2l6ZS5oZWlnaHQ7XG4gICAgbmF0aXZlLnNoYWRvdy5iaWFzID0gc2hhZG93LmJpYXM7XG4gICAgbmF0aXZlLnNoYWRvdy5yYWRpdXMgPSBzaGFkb3cucmFkaXVzO1xuXG4gICAgY29uc3Qgc2hhZG93Q2FtZXJhID0gbmF0aXZlLnNoYWRvdy5jYW1lcmE7XG4gICAgY29uc3QgY2FtZXJhID0gc2hhZG93LmNhbWVyYTtcblxuICAgIHNoYWRvd0NhbWVyYS5uZWFyID0gY2FtZXJhLm5lYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZhciA9IGNhbWVyYS5mYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZvdiA9IGNhbWVyYS5mb3Y7XG5cbiAgICBzaGFkb3dDYW1lcmEubGVmdCA9IGNhbWVyYS5sZWZ0O1xuICAgIHNoYWRvd0NhbWVyYS5yaWdodCA9IGNhbWVyYS5yaWdodDtcbiAgICBzaGFkb3dDYW1lcmEudG9wID0gY2FtZXJhLnRvcDtcbiAgICBzaGFkb3dDYW1lcmEuYm90dG9tID0gY2FtZXJhLmJvdHRvbTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBMaWdodENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTGlnaHRDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge0xpZ2h0Q29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMaWdodENvbXBvbmVudFxufTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weX0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAndGFyZ2V0Jylcbilcbi8qKlxuICogQGNsYXNzIENhbWVyYUNvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ2FtZXJhQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBDYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENhbWVyYUNvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgdGhpcy5uYXRpdmUgPSBidWlsZDtcblxuICAgICAgdGhpcy53YWl0KHRoaXMud3JhcCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5Q29tbWFuZCgncG9zdEludGVncmF0ZScpO1xuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQodGhpcy5wYXJhbXMucG9zaXRpb24ueCwgdGhpcy5wYXJhbXMucG9zaXRpb24ueSwgdGhpcy5wYXJhbXMucG9zaXRpb24ueik7XG4gICAgICAgIHRoaXMucm90YXRpb24uc2V0KHRoaXMucGFyYW1zLnJvdGF0aW9uLngsIHRoaXMucGFyYW1zLnJvdGF0aW9uLnksIHRoaXMucGFyYW1zLnJvdGF0aW9uLnopO1xuXG4gICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gQ2FtZXJhQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgQ2FtZXJhQ29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtDYW1lcmFDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDYW1lcmFDb21wb25lbnRcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuICByZXR1cm4gdGltZVswXSAqIDFlMyArIHRpbWVbMV0gLyAxZTY7XG59O1xuIiwiaW1wb3J0IHByZXNlbnQgZnJvbSAncHJlc2VudCc7XG5cbmV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICBnbG9iYWwucGVyZm9ybWFuY2UgPSB7XG4gICAgbm93OiBwcmVzZW50XG4gIH07XG59XG4iLCJpbXBvcnQge3ZlcnNpb259IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vcG9seWZpbGwnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcblxuLyoqXG4gKiBAY2xhc3MgQXBwXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gcHJlcGFyZSBhIHdvcmxkIHNjZW5lLCBzZXR1cCBwaHlzaWNzLCBjYW1lcmEsIHJlbmRlcmVyIGFuZCBhbGwgb3RoZXIgdGhpbmdzIHRoYXQgeW91IHVzdWFsbHkgZG8gYmVmb3JlIG1ha2luZyBtZXNoZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbbW9kdWxlcz1bXV0gLSBBcnJheSBvZiBNb2R1bGVzXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogU2ltdWxhdGUgZmxhZ1xuICAgKiBAZGVzY3JpcHRpb24gU2FtZSBhcyAudXBkYXRlRW5hYmxlZCwgYnV0IGZvciBwaHlzaWNzLiBEZWZpbmVzIGlmIHBoeXNpY3MgaXMgc2ltdWxhdGVkIGVhY2ggZnJhbWUuXG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkFwcCNzaW11bGF0ZVxuICAgKiBAcHVibGljXG4gICAqL1xuICBzaW11bGF0ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lcyB3aGV0aGVyIHRoZSBzY2VuZSBzaG91bGQgcmVuZGVyIG9yIG5vdFxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjdXBkYXRlRW5hYmxlZFxuICAgKiBAcHVibGljXG4gICAqL1xuICB1cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcblxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIodGhpcyk7XG4gICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcztcblxuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcygpO1xuICB9XG5cbiAgLy8gQ09OVFJPTFMgJiBVUERBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0YXJ0XG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydCByZW5kZXJpbmcgbG9vcCBhbmQgcGh5c2ljcyBzaW11bGF0aW9uIChpZiB5b3UgdXNlIHZlcnNpb24gd2l0aCBwaHlzaWNzKS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgcmVxdWVzdEFuaW1GcmFtZSA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gc3lzdGVtLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3lzdGVtLndpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB7bG9vcHMsIHVwZGF0ZUVuYWJsZWR9ID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHByb2Nlc3MpO1xuICAgICAgaWYgKCF1cGRhdGVFbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IGxvb3BzLmxlbmd0aDsgaSA8IGxsOyBpKyspIHtcbiAgICAgICAgY29uc3QgZSA9IGxvb3BzW2ldO1xuICAgICAgICBpZiAoZS5lbmFibGVkKSBlLmV4ZWN1dGUoZS5jbG9jayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyByZW5kZXJpbmcgbG9vcHNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnVwZGF0ZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZExvb3BcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgbG9vcCB0byB0aGlzIGFwcC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGxvb3AgLSB0aGUgbG9vcCB0byBhZGRcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkFkZGluZyBhIGxvb3AgdG8gYW4gYXBwPC9jYXB0aW9uPlxuICAgKiBjb25zdCBsb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgKiAgLy8gLi4uXG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4gICAqXG4gICAqIGFwcC5hZGRMb29wKGxvb3ApO1xuICAgKiBsb29wLnN0YXJ0KCk7XG4gICAqL1xuICBhZGRMb29wKGxvb3ApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmxvb3BzLnB1c2gobG9vcCk7XG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlTG9vcFxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBsb29wIGZyb20gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgcmVtb3ZlTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvb3BzLmluZGV4T2YobG9vcCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLmxvb3BzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgIHJlc29sdmUobG9vcCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXQoa2V5KTtcbiAgfVxuXG4gIHVzZShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLnVzZShrZXkpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsImltcG9ydCB7Q2xvY2t9IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMsIHVzZUNsb2NrID0gdHJ1ZSkge1xuICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgdGhpcy5jbG9jayA9IHVzZUNsb2NrID8gbmV3IENsb2NrKCkgOiBudWxsO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQ09OVFJPTFNcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0cyB0aGlzIGxvb3AsIGNsb2NrIGlmIGl0IGhhcyBvbmUuIFdvbid0IGRvIGFueXRoaW5nIGlmIGxvb3AgZW5hYmxlZCBhbHJlYWR5LlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gYWRkIHRoaXMgbG9vcCB0bywgaWYgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Mb29wXG4gICAqL1xuICBzdGFydCh3b3JsZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh3b3JsZCkgd29ybGQuYWRkTG9vcCh0aGlzKTtcblxuICAgIGlmICh0aGlzLmNsb2NrKSB0aGlzLmNsb2NrLnN0YXJ0KCk7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0b3BcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyB0aGlzIGxvb3AgYW5kIGl0cyBjbG9jayBpZiBpdCBoYXMgb25lLCB3b24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGxvb3AgaXMgbm90IGVuYWJsZWQpXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBbd29ybGRdIGFwcCB0byByZW1vdmUgdGhpcyBsb29wIGZyb20sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RvcCh3b3JsZCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdG9wKCk7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLnJlbW92ZUxvb3AodGhpcyk7XG4gIH1cblxuICAvLyBFWEVDVVRJT05cblxuICAvKipcbiAgICogQG1ldGhvZCBleGVjdXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKiBAcmV0dXJucyB7Kn0gd2hhdGV2ZXIgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcCByZXR1cm5zXG4gICAqL1xuICBleGVjdXRlKCkge1xuICAgIHJldHVybiB0aGlzLmZ1bmModGhpcy5jbG9jayk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuIiwiaW1wb3J0IHtBbWJpZW50TGlnaHQgYXMgQW1iaWVudExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQW1iaWVudExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBBbWJpZW50TGlnaHQgaXMgYSBzaW1wbGUgY2xhc3MsIGl0IGV4dGVuZHMgTGlnaHQgYW5kIGluaGVyaXRzIGFsbCBpdHMgbWV0aG9kcy5cbiAqIEFtYmllbnRMaWdodCBjcmVhdGVzIGJhc2ljIGxpZ2h0IGFyb3VuZCBhbGwgc2NlbmUsIHNvIGl0IGRvZXNuJ3QgbmVlZCBwcm9wZXJ0aWVzIGxpa2UgcG9zIG9yIHRhcmdldC5cbiAqIEl0IHN1cHBvcnRzIG9ubHkgY29sb3IgYW5kIGludGVuc2l0eSBhcyBwYXJhbWV0ZXJzLCB3aGljaCBkZWZpbmVzIHRoZSBjb2xvciBvZiB0aGUgc3Vycm91bmRlZCBsaWdodCBhbmQgaW50ZW5zaXR5IG9mIGxpZ2h0LlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIEFtYmllbnRMaWdodCA8L2NhcHRpb24+XG4gKiBuZXcgQW1iaWVudExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8od29ybGQpO1xuICovXG5jbGFzcyBBbWJpZW50TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQW1iaWVudExpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgQW1iaWVudExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBbWJpZW50TGlnaHRcbn07XG4iLCJpbXBvcnQge0RpcmVjdGlvbmFsTGlnaHQgYXMgRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSwgRGlyZWN0aW9uYWxMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERpcmVjdGlvbmFsTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIERpcmVjdGluYWxMaWdodCBjcmVhdGVzIGEgbGlnaHQgdGhhdCBzaGluZXMgZnJvbSBhIHNwZWNpZmljIGRpcmVjdGlvbiBub3QgZnJvbSBhIHNwZWNpZmljIHBvc2l0aW9uLjxici8+PGJyLz5cbiAqIFRoaXMgbGlnaHQgd2lsbCBiZWhhdmUgYXMgdGhvdWdoIGl0IGlzIGluZmluaXRlbHkgZmFyIGF3YXkgYW5kIHRoZSByYXlzIHByb2R1Y2VkIGZyb20gaXQgYXJlIGFsbCBwYXJhbGxlbC4gPGJyLz48YnIvPlxuICogVGhlIGJlc3QgYW5hbG9neSB3b3VsZCBiZSBhIGxpZ2h0IHNvdXJjZSB0aGF0IGFjdHMgbGlrZSB0aGUgc3VuOiB0aGUgc3VuIGlzIHNvIGZhciBhd2F5IHRoYXQgYWxsIHN1bmxpZ2h0IGhpdHRpbmcgb2JqZWN0cyBjb21lcyBmcm9tIHRoZSBzYW1lIGFuZ2xlLjxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBvcHRpb25zIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCBwYXJhbWF0ZXIsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0IHBhcmFtYXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBEaXJlY3Rpb25hbExpZ2h0IHRvIGZhbGwgZG93biBmcm9tIHZlYzMoMTAsIDIwLCAxMCkgdG8gdmVjMygwLCAwLCAwKTwvY2FwdGlvbj5cbiAqIG5ldyBEaXJlY3Rpb25hbExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMixcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMTAsIDIwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERpcmVjdGlvbmFsTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRGlyZWN0aW9uYWxMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IERpcmVjdGlvbmFsTGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIERpcmVjdGlvbmFsTGlnaHRcbn07XG4iLCJpbXBvcnQge0hlbWlzcGhlcmVMaWdodCBhcyBIZW1pc3BoZXJlTGlnaHROYXRpdmUsIEhlbWlzcGhlcmVMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEhlbWlzcGhlcmVMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gSGVtaXNwaGVyZUxpZ2h0IGlzIGEgbGlnaHQgc291cmNlIHBvc2l0aW9uZWQgZGlyZWN0bHkgYWJvdmUgdGhlIHNjZW5lLjxici8+XG4gKiBJdCBhbHNvIGRvZXNuJ3QgbmVlZCBwb3NpdGlvbiBhbmQgdGFyZ2V0IHByb3BlcnRpZXMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfbGlnaHRzX2hlbWlzcGhlcmUuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7c2t5Q29sb3I6IDB4ZmZmZmZmLCBncm91bmRDb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBIZW1pc3BoZXJlTGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgSGVtaXNwaGVyZUxpZ2h0KHtcbiAqICAgc2t5Q29sb3I6IDB4ZmYwMDAwLFxuICogICBncm91bmRDb2xvcjogMHgwMDAwZmYsXG4gKiAgIGludGVuc2l0eTogMC4yXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBIZW1pc3BoZXJlTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHNreUNvbG9yOiAweGZmZmZmZixcbiAgICBncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSGVtaXNwaGVyZUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLnNreUNvbG9yLFxuICAgICAgcGFyYW1zLmdyb3VuZENvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBIZW1pc3BoZXJlTGlnaHRcbn07XG4iLCJpbXBvcnQge1BvaW50TGlnaHQgYXMgUG9pbnRMaWdodE5hdGl2ZSwgUG9pbnRMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBvaW50TGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIFBvaW50TGlnaHQgY3JlYXRlcyBhIGxpZ2h0IGF0IGEgc3BlY2lmaWMgcG9zaXRpb24gaW4gdGhlIHNjZW5lLiBUaGUgbGlnaHQgc2hpbmVzIGluIGFsbCBkaXJlY3Rpb25zIChyb3VnaGx5IHNpbWlsYXIgdG8gYSBsaWdodCBidWxiLik8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3NpdGlvbiwgZGlzdGFuY2UgYW5kIGRlY2F5Ljxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMSwgZGlzdGFuY2U6IDEwMCwgZGVjYXk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUG9pbnRMaWdodDwvY2FwdGlvbj5cbiAqIG5ldyBQb2ludExpZ2h0KCB7XG4gKiAgIGNvbG9yOiAweGZmMDAwMCxcbiAqICAgaW50ZW5zaXR5OiAyLFxuICogICBkaXN0YW5jZTogMzAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2ludExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHM9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBkZWNheTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBvaW50TGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBQb2ludExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQb2ludExpZ2h0XG59O1xuIiwiaW1wb3J0IHtTcG90TGlnaHQgYXMgU3BvdExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BvdExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBTcG90TGlnaHQgY3JlYXRlcyBzcG90IGxpZ2h0IHRoYXQgY2FuIGNhc3Qgc2hhZG93IGluIG9uZSBkaXJlY3Rpb24uIDxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBwYXJhbWV0ZXJzIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zIGFuZCB0YXJnZXQuIDxici8+PGJyLz5cbiAqIFNwb3RMaWdodCBhZmZlY3RzIG1lc2hlcyB3aXRoIGxhbWJlcnQgYW5kIHBob25nIG1hdGVyaWFsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19zcG90bGlnaHQuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGFuZ2xlOiBNYXRoLlBJIC8gMywgZXhwb25lbnQ6IDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwb3RMaWdodCB0aGF0IGZhbGxzIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgU3BvdExpZ2h0KHtcbiAqICAgY29sb3I6IDB4MDBmZjAwLFxuICogICBpbnRlbnNpdHk6IDMsXG4gKiAgIGRpc3RhbmNlOiAxMDAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTcG90TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBhbmdsZTogTWF0aC5QSSAvIDMsXG4gICAgZXhwb25lbnQ6IDAsXG4gICAgZGVjYXk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU3BvdExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgU3BvdExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5hbmdsZSxcbiAgICAgIHBhcmFtcy5leHBvbmVudCxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcG90TGlnaHRcbn07XG4iLCJpbXBvcnQge1JlY3RBcmVhTGlnaHQgYXMgUmVjdEFyZWFMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbmNsYXNzIEFyZWFMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMSxcbiAgICB3aWR0aDogMTAsXG4gICAgaGVpZ2h0OiAxMFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBBcmVhTGlnaHQuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBSZWN0QXJlYUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy53aWR0aCxcbiAgICAgIHBhcmFtcy5oZWlnaHRcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQXJlYUxpZ2h0XG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9saWdodHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQW1iaWVudExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vRGlyZWN0aW9uYWxMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0hlbWlzcGhlcmVMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL1BvaW50TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9TcG90TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9BcmVhTGlnaHQnO1xuIiwiaW1wb3J0IHtDdWJlQ2FtZXJhIGFzIEN1YmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN1YmVDYW1lcmFcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIDYgY2FtZXJhcyB0aGF0IHJlbmRlciB0byBhIFdlYkdMUmVuZGVyVGFyZ2V0Q3ViZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlcyBhIEN1YmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgQ3ViZUNhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGN1YmVSZXNvbHV0aW9uOiAyNTZcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KTtcbiAqXG4gKiBhcHAuY2FtZXJhID0gY2FtZXJhO1xuICovXG5jbGFzcyBDdWJlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLkN1YmVDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgY2FtZXJhOiB7XG4gICAqICAgICBuZWFyOiAxLFxuICAgKiAgICAgZmFyOiAxMDAwLFxuICAgKiAgICAgY3ViZVJlc29sdXRpb246IDEyOFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ3ViZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBDdWJlQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyLFxuICAgICAgcGFyYW1zLmN1YmVSZXNvbHV0aW9uXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDdWJlQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtPcnRob2dyYXBoaWNDYW1lcmEgYXMgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uLy4uL3BvbHlmaWxsJztcblxuLyoqXG4gKiBAY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggb3J0aG9ncmFwaGljIHByb2plY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gT3J0aG9ncmFwaGljQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogNTBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5PcnRob2dyYXBoaWNDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgbmVhcjogMSxcbiAgICogICBmYXI6IDEwMDAsXG4gICAqICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAqICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAqICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICogICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBPcnRob2dyYXBoaWNDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLmxlZnQsXG4gICAgICBwYXJhbXMucmlnaHQsXG4gICAgICBwYXJhbXMudG9wLFxuICAgICAgcGFyYW1zLmJvdHRvbSxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgT3J0aG9ncmFwaGljQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYSBhcyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggcGVyc3BlY3RpdmUgcHJvamVjdGlvbi5cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbiBQZXJzcGVjdGl2ZUNhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSh7XG4gKiAgIGZvdjogNzUsXG4gKiAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmEgZXh0ZW5kcyBDYW1lcmFDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLlBlcnNwZWN0aXZlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGZvdjogNzUsXG4gICAqICAgYXNwZWN0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBmb3Y6IDc1LFxuICAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQZXJzcGVjdGl2ZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5mb3YsXG4gICAgICBwYXJhbXMuYXNwZWN0LFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQZXJzcGVjdGl2ZUNhbWVyYVxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvY2FtZXJhcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9DdWJlQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vT3J0aG9ncmFwaGljQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vUGVyc3BlY3RpdmVDYW1lcmEnO1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQm94QnVmZmVyR2VvbWV0cnksXG4gIEJveEdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBCb3hcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEFzIHRvbGQgb24gQ29tcG9uZW50IGRlZmluaXRpb24sIHdoaWxlIHlvdSBjYW4gcGFzcyBhbnkgb2YgdGhlIGluaGVyaXRlZCBwYXJhbXMgZm9yIHRoaXMgY29tcG9uZW50IGNvbnN0cnVjdGlvbiwgeW91IHdpbGwgbmVlZCB0b1xuICogcGFzcyBzcGVjaWZpYyBwYXJhbWV0ZXJzIHRvIGJ1aWxkIHRoaXMgbWVzaCBhcyBhIGdlb21ldHJ5IG9iamVjdC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjQm94R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEJveCwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiAgbmV3IEJveCh7XG4gKiAgICBnZW9tZXRyeToge1xuICogICAgICB3aWR0aDogMixcbiAqICAgICAgaGVpZ2h0OiAyLFxuICogICAgICBkZXB0aDogMlxuICogICAgfSxcbiAqXG4gKiAgICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgICB9KSxcbiAqXG4gKiAgICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBCb3ggZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB3aWR0aDogMSxcbiAgICogICAgIGhlaWdodDogMSxcbiAgICogICAgIGRlcHRoOiAxLFxuICAgKiAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgZGVwdGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgZGVwdGg6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiAxLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBkZXB0aFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ2RlcHRoJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnLCAnZGVwdGhTZWdlbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBCb3guZGVmYXVsdHMsIEJveC5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Cb3hcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEJveEJ1ZmZlckdlb21ldHJ5IDogQm94R2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRlcHRoU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEJveFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENpcmNsZUJ1ZmZlckdlb21ldHJ5LFxuICBDaXJjbGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ2lyY2xlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NpcmNsZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDaXJjbGUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBDaXJjbGUoe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgcmFkaXVzOiA0LFxuICogICAgICBzZWdtZW50czogMTZcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQ2lyY2xlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiA1MCxcbiAgICogICAgIHNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiA1MCxcbiAgICAgIHNlZ21lbnRzOiA4LFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdzZWdtZW50cycsICd0aGV0YVN0YXJ0JywgJ3RoZXRhTGVuZ3RoJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ2lyY2xlLmRlZmF1bHRzLCBDaXJjbGUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ2lyY2xlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDaXJjbGVCdWZmZXJHZW9tZXRyeSA6IENpcmNsZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ2lyY2xlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ29uZUJ1ZmZlckdlb21ldHJ5LFxuICBDb25lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENvbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NvbmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ29uZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ29uZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENvbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICAgICdvcGVuRW5kZWQnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ29uZS5kZWZhdWx0cywgQ29uZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ29uZUJ1ZmZlckdlb21ldHJ5IDogQ29uZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm9wZW5FbmRlZCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDb25lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ3lsaW5kZXJCdWZmZXJHZW9tZXRyeSxcbiAgQ3lsaW5kZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ3lsaW5kZXJcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0N5bGluZGVyR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEN5bGluZGVyLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBDeWxpbmRlcih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEN5bGluZGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXNUb3A6IDIwLFxuICAgKiAgICAgcmFkaXVzQm90dG9tOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1c1RvcDogMCxcbiAgICAgIHJhZGl1c0JvdHRvbTogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeTogW1xuICAgKiAgICdyYWRpdXNUb3AnLFxuICAgKiAgICdyYWRpdXNCb3R0b20nLFxuICAgKiAgICdoZWlnaHQnLFxuICAgKiAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICogICAnb3BlbkVuZGVkJyxcbiAgICogICAndGhldGFTdGFydCcsXG4gICAqICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiBdXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1c1RvcCcsXG4gICAgICAncmFkaXVzQm90dG9tJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN5bGluZGVyLmRlZmF1bHRzLCBDeWxpbmRlci5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXJcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEN5bGluZGVyQnVmZmVyR2VvbWV0cnkgOiBDeWxpbmRlckdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNUb3AsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzQm90dG9tLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3lsaW5kZXJcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgRG9kZWNhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERvZGVjYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgZG9kZWNhaGVkcm9uIGlzIGFueSBwb2x5aGVkcm9uIHdpdGggdHdlbHZlIGZsYXQgZmFjZXMuIDxici8+PGJyLz5cbiAqIFRoZSBtb3N0IGZhbWlsaWFyIGRvZGVjYWhlZHJvbiBpcyB0aGUgcmVndWxhciBkb2RlY2FoZWRyb24sIHdoaWNoIGlzIGEgUGxhdG9uaWMgc29saWQuIDxici8+XG4gKiBUaGVyZSBhcmUgYWxzbyB0aHJlZSByZWd1bGFyIHN0YXIgZG9kZWNhaGVkcmEsIHdoaWNoIGFyZSBjb25zdHJ1Y3RlZCBhcyBzdGVsbGF0aW9ucyBvZiB0aGUgY29udmV4IGZvcm0uIDxici8+XG4gKiBBbGwgb2YgdGhlc2UgaGF2ZSBpY29zYWhlZHJhbCBzeW1tZXRyeSwgb3JkZXIgMTIwLlxuICogRG9kZWNhaGVkcm9uIGNyZWF0ZXMgRG9kZWNhaGVkcm9uIG9iamVjdCBieSBpdCdzIHJhZGl1cyBhbmQgZGV0YWlsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNEb2RlY2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRG9kZWNhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBEb2RlY2FoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAxMFxuICogICB9XG4gICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRG9kZWNhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeToge1xuICAgKiAgIHJhZGl1czogMSxcbiAgICogICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRG9kZWNhaGVkcm9uLmRlZmF1bHRzLCBEb2RlY2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkRvZGVjYWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IERvZGVjYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEb2RlY2FoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBCdWZmZXJHZW9tZXRyeSxcbiAgRXh0cnVkZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBFeHRydWRlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBFeHRydWRlIGdlb21ldHJ5IG1lYW5zIHRoYXQgeW91IGNhbiBjcmVhdGUgYSAzRCBtZXNoIGZyb20gYW55IDJEIHNoYXBlIHVzaW5nIHRocmVlLmpzIGdlb21ldHJ5IGJhc2VkIG9uIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL21hdGgvVmVjdG9yMic+VEhSRUUuVmVjdG9yMi48L2E+IDxici8+XG4gKiBTdWNoIGltcGxlbWVudGF0aW9uIHdpbGwgaGVscCB5b3UgdG8gbWFrZSB2b2x1bWVkIHNoYXBlcyB0aGF0IGhhdmUgdGhlaXIgb3duIGRlcHRoIGFuZCBjYW4gYmUgc2VlbiBmcm9tIGFsbCBhbmdlbHMuPGJyLz48YnIvPlxuICogWW91IGNhbiBhbHNvIGZpbmQgc29tZSBpbnRlcmVzdGluZyBleGFtcGxlcyBtYWRlIHVzaW5nIDxhIGhyZWY9J3RocmVlanMub3JnJz50aHJlZS5qczwvYT4gd2hpY2ggaXMgYSBjb3JlIG9mIHdocy5qcywgc3VjaCBhczpcbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc2hhcGVzLmh0bWwnPldlYmdsIGdlb21ldHJ5IGV4dHJ1ZGU8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlczIuaHRtbCc+RXh0cnVkZSBzaGFwZXMgZnJvbSBnZW9kYXRhPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zcGxpbmVzLmh0bWwnPkV4dHJ1ZGUgc3BsaW5lczwvYT5cbiAqXG4gKiBTdWNoIGV4YW1wbGVzIGNhbiBiZSBlYXNpbHkgaW1wbGVtZW50ZWQgdXNpbmcgd2hpdGVzdG9ybS5qcyBvciBpdCdzIHBsdWdpbnMuIFVzZSBgRXh0cnVkZWAgY2xhc3Mgd2l0aCA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9leHRyYXMvY29yZS9TaGFwZSc+VEhSRUUuU2hhcGU8L2E+IHRvIGdldCBleHRydWRlIGVmZmVjdCBvZiBzaGFwZSBkZWZpbmVkIGJ5IDJEIHZlY3RvcnMuXG4gKiBUaGlzIGNsYXNzIGlzIHNpbWlsYXIgdG8gPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZ2VvbWV0cmllcy9FeHRydWRlR2VvbWV0cnknPlRIUkVFLkV4dHJ1ZGVHZW9tZXRyeTwvYT4sXG4gKiBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgcHJvcGVydGllcywgYXBwbGllZCBieSBgU2hhcGVgLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNFeHRydWRlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIHNoYXBlLCB0aGVuIGFuIEV4dHJ1ZGUgZnJvbSBpdDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKFtcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigtMiwwKSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsMiksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLC0yKVxuICogXSk7XG4gKlxuICogY29uc3QgZXh0cnVkZSA9IG5ldyBFeHRydWRlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZXM6IHNoYXBlLFxuICogICAgIG9wdGlvbnM6IHtcbiAqICAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gKiAgICAgICBiZXZlbFNpemU6IDAsXG4gKiAgICAgICBhbW91bnQ6IDJcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pO1xuICpcbiAqIGV4dHJ1ZGUuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRXh0cnVkZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXSxcbiAgICogICAgIG9wdGlvbnM6IHt9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW10sXG4gICAgICBvcHRpb25zOiB7fVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJywgJ29wdGlvbnMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBFeHRydWRlLmRlZmF1bHRzLCBFeHRydWRlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRXh0cnVkZUdlb21ldHJ5KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNoYXBlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcHRpb25zXG4gICAgKTtcblxuICAgIHJldHVybiBwYXJhbXMuYnVmZmVyID8gbmV3IEJ1ZmZlckdlb21ldHJ5KCkuZnJvbUdlb21ldHJ5KGdlb21ldHJ5KSA6IGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEV4dHJ1ZGVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBJY29zYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBJY29zYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGFuIGljb3NhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiB3aXRoIDIwIGZhY2VzLjxici8+XG4gKiBUaGVyZSBhcmUgbWFueSBraW5kcyBvZiBpY29zYWhlZHJhLCB3aXRoIHNvbWUgYmVpbmcgbW9yZSBzeW1tZXRyaWNhbCB0aGFuIG90aGVycy4gVGhlIG1vc3Qgd2VsbCBrbm93biBpcyB0aGUgUGxhdG9uaWMsIGNvbnZleCByZWd1bGFyIGljb3NhaGVkcm9uLjxici8+XG4gKiBgSWNvc2FoZWRyb25gIGNyZWF0ZXMgYW4gSWNvc2FoZWRyb24gb2JqZWN0IGJ5IGl0cyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjSWNvc2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSWNvc2FoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IEljb3NhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEljb3NhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JY29zYWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge2dlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXX1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEljb3NhaGVkcm9uLmRlZmF1bHRzLCBJY29zYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IEljb3NhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEljb3NhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGF0aGVCdWZmZXJHZW9tZXRyeSxcbiAgTGF0aGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgTGF0aGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgYExhdGhlR2VvbWV0cnlgIGFsbG93cyB5b3UgdG8gY3JlYXRlIHNoYXBlcyBmcm9tIGEgc21vb3RoIGN1cnZlLlxuICogVGhpcyBjdXJ2ZSBpcyBkZWZpbmVkIGJ5IGEgbnVtYmVyIG9mIHBvaW50cyAoYWxzbyBjYWxsZWQga25vdHMpIGFuZCBpcyBtb3N0IG9mdGVuIGNhbGxlZCBhIHNwbGluZS4gVGhpcyBzcGxpbmUgaXMgcm90YXRlZCBhcm91bmQgYSBmaXhlZCBwb2ludCBhbmQgcmVzdWx0cyBpbiB2YXNlLSBhbmQgYmVsbC1saWtlIHNoYXBlcy48YnIvPjxici8+XG4gKiBJbiAzRCBjb21wdXRlciBncmFwaGljcywgYSBsYXRoZWQgb2JqZWN0IGlzIGEgM0QgbW9kZWwgd2hvc2UgdmVydGV4IGdlb21ldHJ5IGlzIHByb2R1Y2VkIGJ5IHJvdGF0aW5nIHRoZSBwb2ludHMgb2YgYSBzcGxpbmUgb3Igb3RoZXIgcG9pbnQgc2V0IGFyb3VuZCBhIGZpeGVkIGF4aXMuXG4gKiBUaGUgbGF0aGluZyBtYXkgYmUgcGFydGlhbDsgdGhlIGFtb3VudCBvZiByb3RhdGlvbiBpcyBub3QgbmVjZXNzYXJpbHkgYSBmdWxsIDM2MCBkZWdyZWVzLlxuICogVGhlIHBvaW50IHNldCBwcm92aWRpbmcgdGhlIGluaXRpYWwgc291cmNlIGRhdGEgY2FuIGJlIHRob3VnaHQgb2YgYXMgYSBjcm9zcyBzZWN0aW9uIHRocm91Z2ggdGhlIG9iamVjdCBhbG9uZyBhIHBsYW5lIGNvbnRhaW5pbmcgaXRzIGF4aXMgb2YgcmFkaWFsIHN5bW1ldHJ5LiA8YnIvPjxici8+XG4gKiBUaGUgPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5Jz5mb2xsb3dpbmcgZXhhbXBsZTwvYT4gc2hvd3MgYSBnZW9tZXRyeSB3aGljaCBjYW4gYmUgZ2VuZXJhdGVkIHVzaW5nIGBMYXRoZWAgY2xhc3MuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0xhdGhlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExhdGgsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcG9pbnRzID0gW107XG4gKlxuICogZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gKiAgIHBvaW50cy5wdXNoKFxuICogICAgIG5ldyBUSFJFRS5WZWN0b3IyKFxuICogICAgICAgKE1hdGguc2luKGkgKiAwLjcpICogMTUgKyA1MCkgLyAxMCxcbiAqICAgICAgIChpIC0gNSkgKiAwLjJcbiAqICAgICApXG4gKiAgICk7XG4gKiB9XG4gKlxuICogY29uc3QgbGF0aGUgPSBuZXcgTGF0aGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBvaW50czogcG9pbnRzXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDUwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIExhdGhlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcG9pbnRzOiBbXVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwb2ludHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT57XG4gICAqICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgTGF0aGUuZGVmYXVsdHMsIExhdGhlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBMYXRoZUJ1ZmZlckdlb21ldHJ5IDogTGF0aGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucG9pbnRzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMYXRoZVxufTtcbiIsImltcG9ydCB7XG4gIExpbmUgYXMgTGluZU5hdGl2ZSxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEdlb21ldHJ5LFxuICBCdWZmZXJBdHRyaWJ1dGUsXG4gIExpbmVDdXJ2ZTMsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExpbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIExpbmUgY29tcG9uZW50IGlzIGdlbmVyYXRlZCBmcm9tIGEgY3VydmUvbGluZSBhbmQgYW1vdW50IG9mIHZlY3RvcnMgdGhhdCBzaG91bGQgYmUgdXNlZCAocG9pbnRzKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExpbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IExpbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGN1cnZlOiBuZXcgVEhSRUUuTGluZUN1cnZlMyhuZXcgVEhSRUUuVmVjdG9yMygxMCwgMTAsIDApLCBuZXcgVEhSRUUuVmVjdG9yMygxMCwgMzAsIDApKVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMaW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBjdXJ2ZTogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDEwLCAwLCAwKSksXG4gICAqICAgICBwb2ludHM6IDUwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGN1cnZlOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMTAsIDAsIDApKSxcbiAgICAgIHBvaW50czogNTBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBMaW5lLmRlZmF1bHRzLCBMaW5lLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTGluZU5hdGl2ZShnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IHBhcmFtcy5idWZmZXIgPyBuZXcgQnVmZmVyR2VvbWV0cnkoKSA6IG5ldyBHZW9tZXRyeSgpO1xuXG4gICAgaWYgKHBhcmFtcy5idWZmZXIpIHtcbiAgICAgIGNvbnN0IHBwID0gcGFyYW1zLmdlb21ldHJ5LmN1cnZlLmdldFBvaW50cyhwYXJhbXMuZ2VvbWV0cnkucG9pbnRzKTtcbiAgICAgIGNvbnN0IHZlcnRzID0gbmV3IEZsb2F0MzJBcnJheShwcC5sZW5ndGggKiAzKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHBwLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGkzID0gaSAqIDM7XG5cbiAgICAgICAgdmVydHNbaTNdID0gcHBbaV0ueDtcbiAgICAgICAgdmVydHNbaTMgKyAxXSA9IHBwW2ldLnk7XG4gICAgICAgIHZlcnRzW2kzICsgMl0gPSBwcFtpXS56O1xuICAgICAgfVxuXG4gICAgICBnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IEJ1ZmZlckF0dHJpYnV0ZSh2ZXJ0cywgMykpO1xuICAgIH0gZWxzZSBnZW9tZXRyeS52ZXJ0aWNlcyA9IHBhcmFtcy5nZW9tZXRyeS5jdXJ2ZS5nZXRQb2ludHMocGFyYW1zLmdlb21ldHJ5LnBvaW50cyk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGluZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEpTT05Mb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEltcG9ydGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbXBvcnRlciBpcyBhIGxvYWRlciBmb3IgbWVzaGVzIGFuZCBhbnkgb3RoZXIgZGF0YSB0byB5b3VyIHNjZW5lXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBJbXBvcnRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgSW1wb3J0ZXIoe1xuICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAqXG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWwpIHsgLy8gZGF0YSBmcm9tIGxvYWRlclxuICogICAgIHJldHVybiBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpOyAvLyBzaG91bGQgcmV0dXJuIHlvdXIgLm5hdGl2ZSAobWVzaCBpbiB0aGlzIGNhc2UpXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEltcG9ydGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIHVybDogJycsXG4gICAqICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuICAgKlxuICAgKiAgIG9uTG9hZCgpIHt9LFxuICAgKiAgIG9uUHJvZ3Jlc3MoKSB7fSxcbiAgICogICBvbkVycm9yKCkge30sXG4gICAqXG4gICAqICAgdGV4dHVyZVBhdGg6IG51bGwsXG4gICAqICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAqICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHVybDogJycsXG4gICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuXG4gICAgb25Mb2FkKCkge30sXG4gICAgb25Qcm9ncmVzcygpIHt9LFxuICAgIG9uRXJyb3IoKSB7fSxcblxuICAgIHRleHR1cmVQYXRoOiBudWxsLFxuICAgIHVzZUN1c3RvbU1hdGVyaWFsOiBmYWxzZSxcblxuICAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAgfVxuICB9O1xuXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnNcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZCBmaWx0ZXJcbiAgICogQGRlc2NyaXB0aW9uIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtUSFJFRS5NZXNofSBvYmplY3QgSW5zdGFuY2UgZm9yIGl0ZXJhdGluZyB0aHJvdWdoIGl0J3MgY2hpbGRyZW4uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlciBGdW5jdGlvbiB3aXRoIGNoaWxkIGFzIGFyZ3VtZW50LCBzaG91bGQgcmV0dXJuIGEgYm9vbGVhbiB3aGV0aGVyIGluY2x1ZGUgdGhlIGNoaWxkIG9yIG5vdC5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gb2JqZWN0IHdpdGggY2hpbGRyZW5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZW1vdmluZyB1bm5lY2Vzc2FyeSBsaWdodHMgZnJvbSBjaGlsZHJlbjwvY2FwdGlvbj5cbiAgICogbmV3IEljb3NhaGVkcm9uKHtcbiAgICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAgICpcbiAgICogICBwYXJzZShncm91cCkgeyAvLyBkYXRhIGZyb20gbG9hZGVyXG4gICAqICAgICByZXR1cm4gSW1wb3J0ZXIuZmlsdGVyKGdyb3VwLCBjaGlsZCA9PiAhY2hpbGQuaXNMaWdodCk7IC8vIHJlbW92ZSBsaWdodHNcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICAgKiB9KS5hZGRUbyhhcHApO1xuICAgKi9cbiAgc3RhdGljIGZpbHRlcihvYmplY3QsIGZpbHRlcikge1xuICAgIGNvbnN0IHByb2Nlc3NGaWx0ZXIgPSBvYmplY3QgPT4ge1xuICAgICAgb2JqZWN0LmNoaWxkcmVuLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2hpbGRyZW4pIHByb2Nlc3NGaWx0ZXIoZWwpO1xuICAgICAgICBpZiAoIWZpbHRlcihlbCkpIG9iamVjdC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9jZXNzRmlsdGVyKG9iamVjdCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSW1wb3J0ZXIuZGVmYXVsdHMsIEltcG9ydGVyLmluc3RydWN0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAocGFyYW1zLnRleHR1cmVQYXRoKSBwYXJhbXMubGFvZGVyLnNldFRleHR1cmVQYXRoKHBhcmFtcy50ZXh0dXJlUGF0aCk7XG5cbiAgICAgIHBhcmFtcy5sb2FkZXIubG9hZChwYXJhbXMudXJsLCAoLi4uZGF0YSkgPT4geyAvLyBnZW9tZXRyeSwgbWF0ZXJpYWxzXG4gICAgICAgIHBhcmFtcy5vbkxvYWQoLi4uZGF0YSk7XG5cbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogcGFyYW1zLnBhcnNlciguLi5kYXRhKX0pLm1lc2g7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5OiBnZW9tLCBtYXRlcmlhbDogbWF0fSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBvYmplY3QuZ2VvbWV0cnksXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy51c2VDdXN0b21NYXRlcmlhbCA/IHBhcmFtcy5tYXRlcmlhbCA6IG9iamVjdC5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob2JqZWN0Lmdlb21ldHJ5KSBvYmplY3QuZ2VvbWV0cnkgPSBnZW9tO1xuICAgICAgICBpZiAob2JqZWN0Lm1hdGVyaWFsKSBvYmplY3QubWF0ZXJpYWwgPSBtYXQ7XG5cbiAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgfSwgcGFyYW1zLm9uUHJvZ3Jlc3MsIHBhcmFtcy5vbkVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJbXBvcnRlclxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIE9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgT2N0YWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBPY3RhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYW4gb2N0YWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCBlaWdodCBmYWNlcy5cbiAqIEEgcmVndWxhciBvY3RhaGVkcm9uIGlzIGEgUGxhdG9uaWMgc29saWQgY29tcG9zZWQgb2YgZWlnaHQgZXF1aWxhdGVyYWwgdHJpYW5nbGVzLCBmb3VyIG9mIHdoaWNoIG1lZXQgYXQgZWFjaCB2ZXJ0ZXguXG4gKiA8YnIvPjxici8+XG4gKiBgT2N0YWhlZHJvbmAgY3JlYXRlcyBhbiBPY3RhaGVkcm9uIG9iamVjdCBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNPY3RhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBPY3RhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBPY3RhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIE9jdGFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLk9jdGFoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT2N0YWhlZHJvbi5kZWZhdWx0cywgT2N0YWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuT2N0YWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBPY3RhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9jdGFoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnksXG4gIFBhcmFtZXRyaWNHZW9tZXRyeSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUGFyYW1ldHJpY1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gYFBhcmFtZXRyaWNgIGdlbmVyYXRlcyBhIGdlb21ldHJ5IHJlcHJlc2VudGluZyBhIDxhIGhyZWY9J2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhcmFtZXRyaWNfc3VyZmFjZSc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogPGJyLz48YnIvPlxuICogSXQgaXMgdXN1YWxseSB1c2VkIHRvIGRldmVsb3AgZGlmZmVyZW50IGtpbmRzIG9mIGhpZ2hmaWVsZHMgb3IgdmlzdWFsaXplIGEgPGEgaHJlZj0naHR0cHM6Ly9zdGVta29za2kuZ2l0aHViLmlvL1RocmVlLmpzL0dyYXBodWx1cy1GdW5jdGlvbi5odG1sJz5tYXRoIGZ1bmN0aW9uPC9hPi5cbiAqIDxici8+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly9tYXRoLmh3cy5lZHUvZ3JhcGhpY3Nib29rL3NvdXJjZS90aHJlZWpzL2N1cnZlcy1hbmQtc3VyZmFjZXMuaHRtbCc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogLSA8YSBocmVmPSdodHRwczovL3N0ZW1rb3NraS5naXRodWIuaW8vVGhyZWUuanMvR3JhcGh1bHVzLVN1cmZhY2UuaHRtbCc+XCJHcmFwaHVsdXNcIjwvYT5cbiAqIDxici8+PGJyLz5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUGFyYW1ldHJpY0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+RXhhbXBsZSBjcmVhdGluZyBhbiBoZWlnaHRmaWVsZC1saWtlIGdlb21ldHJ5LiBgdWAgYW5kIGB2YCBhcmUgbGlrZSBgeGAgYW5kIGB5YCBpbiBzaGFwZSwgYnV0IHRoZWlyIHZhbHVlcyBhcmUgYWx3YXlzIGZyb20gYDBgIHRvIGAxYC5cbiAqIFdlIHVzZSB0aGVtIGluIGBUSFJFRS5WZWN0b3IzYCBsaWtlIGB4YCBhbmQgYHpgIGFuZCBgTWF0aC5yYW5kb20oKSAqIDVgIGZvciBgeWAuPC9jYXB0aW9uPlxuICogY29uc3QgY3JlYXRlUGFyYW1ldHJpYyA9ICh1LCB2KSA9PiB7XG4gKiAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyh1ICogMzAsIE1hdGgucmFuZG9tKCkgKiA1LCB2ICogMzApO1xuICogfVxuICpcbiAqIG5ldyBQYXJhbWV0cmljKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBmdW5jOiBjcmVhdGVQYXJhbWV0cmljXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIC0xMDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQYXJhbWV0cmljIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QYXJhbWV0cmljI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBmdW5jOiAodSwgdikgPT4gbmV3IFZlY3RvcjModSwgdiwgMCksXG4gICAqICAgICBzbGljZXM6IDEwLFxuICAgKiAgICAgdGFja3M6IDEwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGZ1bmM6ICh1LCB2KSA9PiBuZXcgVmVjdG9yMyh1LCB2LCAwKSxcbiAgICAgIHNsaWNlczogMTAsXG4gICAgICBzdGFja3M6IDEwXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBhcmFtZXRyaWMuZGVmYXVsdHMsIFBhcmFtZXRyaWMuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGFyYW1ldHJpY1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkgOiBQYXJhbWV0cmljR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmZ1bmMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2xpY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnN0YWNrc1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGFyYW1ldHJpY1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBsYW5lQnVmZmVyR2VvbWV0cnksXG4gIFBsYW5lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBsYW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBgUGxhbmVgIGlzIHVzZWQgZm9yIGNyZWF0aW5nIHBsYW5lcyBnaXZlbiBzb21lIGB3aWR0aGAgYW5kIGBoZWlnaHRgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNQbGFuZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBQbGFuZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUGxhbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHdpZHRoOiAyMCxcbiAqICAgICBoZWlnaHQ6IDMwXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBsYW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEwLFxuICAgKiAgICAgaGVpZ2h0OiAxMCxcbiAgICogICAgIHdTZWdtZW50czogMSxcbiAgICogICAgIGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMTAsXG4gICAgICBoZWlnaHQ6IDEwLFxuICAgICAgd1NlZ21lbnRzOiAxLFxuICAgICAgaFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICd3U2VnbWVudHMnLCAnaFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3dTZWdtZW50cycsICdoU2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQbGFuZS5kZWZhdWx0cywgUGxhbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBQbGFuZUJ1ZmZlckdlb21ldHJ5IDogUGxhbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBsYW5lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBQb2x5aGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbmNvbnN0IFt2ZXJ0aWNlc09mQ3ViZSwgaW5kaWNlc09mRmFjZXNdID0gW1xuICBbXG4gICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxXG4gIF0sXG4gIFtcbiAgICAyLCAxLCAwLCAwLCAzLCAyLFxuICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAgMCwgMSwgNSwgNSwgNCwgMCxcbiAgICAxLCAyLCA2LCA2LCA1LCAxLFxuICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAgNCwgNSwgNiwgNiwgNywgNFxuICBdXG5dO1xuXG4vKipcbiAqIEBjbGFzcyBQb2x5aGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBlbGVtZW50YXJ5IGdlb21ldHJ5LCBhIHBvbHloZWRyb24gaXMgYSBzb2xpZCBpbiB0aHJlZSBkaW1lbnNpb25zIHdpdGggZmxhdCBwb2x5Z29uYWwgZmFjZXMsIHN0cmFpZ2h0IGVkZ2VzIGFuZCBzaGFycCBjb3JuZXJzIG9yIHZlcnRpY2VzLlxuICogPGJyLz48YnIvPlxuICogYFBvbHloZWRyb25gIGNyZWF0ZXMgYSBQb2x5aGVkcm9uIGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGAuXG4gKiA8YnIvPjxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gUG9seWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUG9seWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2x5aGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIHN0YXRpYyB2ZXJ0aWNlc09mQ3ViZSA9IHZlcnRpY2VzT2ZDdWJlO1xuICBzdGF0aWMgaW5kaWNlc09mRmFjZXMgPSBpbmRpY2VzT2ZGYWNlcztcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgdmVydGljZXNPZkN1YmU6IFtcbiAgICogICAgICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgKiAgICAgICAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAxLCAxLCAtMSwgMSwgMVxuICAgKiAgICAgXSxcbiAgICpcbiAgICogICAgIGluZGljZXNPZkZhY2VzOiBbXG4gICAqICAgICAgIDIsIDEsIDAsIDAsIDMsIDIsXG4gICAqICAgICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAqICAgICAgIDAsIDEsIDUsIDUsIDQsIDAsXG4gICAqICAgICAgIDEsIDIsIDYsIDYsIDUsIDEsXG4gICAqICAgICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAqICAgICAgIDQsIDUsIDYsIDYsIDcsIDRcbiAgICogICAgIF0sXG4gICAqXG4gICAqICAgICByYWRpdXM6IDYsXG4gICAqICAgICBkZXRhaWw6IDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdmVydGljZXNPZkN1YmUsXG4gICAgICBpbmRpY2VzT2ZGYWNlcyxcbiAgICAgIHJhZGl1czogNixcbiAgICAgIGRldGFpbDogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3ZlcnRpY2VzT2ZDdWJlJywgJ2luZGljZXNPZkZhY2VzJywgJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd2ZXJ0aWNlc09mQ3ViZScsICdpbmRpY2VzT2ZGYWNlcycsICdyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUG9seWhlZHJvbi5kZWZhdWx0cywgUG9seWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBQb2x5aGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnZlcnRpY2VzT2ZDdWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmluZGljZXNPZkZhY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBvbHloZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBSaW5nR2VvbWV0cnksXG4gIFJpbmdCdWZmZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUmluZ1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gUmluZyBjbGFzcyBjcmVhdGVzIGEgY2lyY2xlIG9yIGp1c3QgMkQgVG9ydXMuIERvZXMgbm90IHN1cHBvcnQgcGh5c2ljcy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUmluZ0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBSaW5nLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBSaW5nKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBpbm5lclJhZGl1czogNSxcbiAqICAgICBvdXRlclJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICAgc2lkZSBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA4LCAwXSxcbiAqXG4gKiAgIHJvdGF0aW9uOiB7XG4gKiAgICAgeDogTWF0aC5QSS80XG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFJpbmcgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmcjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGlubmVyUmFkaXVzOiAwLFxuICAgKiAgICAgb3V0ZXJSYWRpdXM6IDUwLFxuICAgKiAgICAgdGhldGFTZWdtZW50czogOCxcbiAgICogICAgIHBoaVNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBpbm5lclJhZGl1czogMCxcbiAgICAgIG91dGVyUmFkaXVzOiA1MCxcbiAgICAgIHRoZXRhU2VnbWVudHM6IDgsXG4gICAgICBwaGlTZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICogICAgICdvdXRlclJhZGl1cycsXG4gICAqICAgICAndGhldGFTZWdtZW50cycsXG4gICAqICAgICAncGhpU2VnbWVudHMnLFxuICAgKiAgICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICAgICdvdXRlclJhZGl1cycsXG4gICAgICAndGhldGFTZWdtZW50cycsXG4gICAgICAncGhpU2VnbWVudHMnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUmluZy5kZWZhdWx0cywgUmluZy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZ1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBSaW5nQnVmZmVyR2VvbWV0cnkgOiBSaW5nR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmlubmVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm91dGVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucGhpU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUmluZ1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNoYXBlQnVmZmVyR2VvbWV0cnksXG4gIFNoYXBlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNoYXBlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTaGFwZSBpcyBhIHVuaXZlcnNhbCBjbGFzcy4gSXQgYWxsb3dzIHlvdSB0byBjcmVhdGUgZGlmZmVyZW50IDJEIHNoYXBlcyBpbiAzRCBzY2VuZS48YnIvPlxuICogVW5mb3J0dW5hdGVseSwgbm90IGFsbCBvZiB0aGVtIHN1cHBvcnQgcGh5c2ljcywgYW4gYWx0ZXJuYXRpdmUgaXMgdG8gbWFrZSBhIHNpbWlsYXIgM0Qgb2JqZWN0IGFuZCBzY2FsZSBpdHMgd2lkdGggZG93biB0byBuZWFyIHplcm8uXG4gKiA8YnIvPjxici8+XG4gKiBgU2hhcGVgIGNvbnNpc3RzIG9mIHNoYXBlcyB0aGF0IGFyZSBpbiBpdHMgc2hhcGVzIHBhcmFtZXRlci5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU2hhcGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgcGxhbmUgbG9va2luZyBTaGFwZSBmcm9tIGEgVEhSRUUuU2hhcGUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcmVjdFdpZHRoID0gMTAsXG4gKiByZWN0TGVuZ3RoID0gNTtcbiAqXG4gKiBjb25zdCByZWN0U2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAqIHJlY3RTaGFwZS5tb3ZlVG8oMCwwKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8oMCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgMCk7XG4gKiByZWN0U2hhcGUubGluZVRvKDAsIDApO1xuICpcbiAqIGNvbnN0IHBsYW5lID0gbmV3IFNoYXBlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZTogcmVjdFNoYXBlXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNoYXBlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW11cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU2hhcGUuZGVmYXVsdHMsIFNoYXBlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBTaGFwZUJ1ZmZlckdlb21ldHJ5IDogU2hhcGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2hhcGVzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTaGFwZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNwaGVyZUJ1ZmZlckdlb21ldHJ5LFxuICBTcGhlcmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BoZXJlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTcGhlcmUgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgc3BoZXJlIG9iamVjdHMgYnkgaXRzIHJhZGl1cyBwcm9wZXJ0eSBhbmQgb3RoZXIgdmFsdWVzIHRoYXQgZGV0ZXJtaW5lcyBpdHMgZGV0YWxpdHkuXG4gKiA8YnIvPjxici8+XG4gKiBJdCBpcyBzaW1pbGFyIHRvIFRIUkVFLlNwaGVyZUdlb21ldHJ5LCBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgYFNoYXBlYCBwcm9wZXJ0aWVzLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogPGJyLz48YnIvPlxuICogVGhlbiBpdCBjcmVhdGVzIGFuIGBUaHJlZS5qcyBtZXNoYCBvciBhIGBQaHlzaWpzIG1lc2hgLCB0aGF0IGlzIHNpbWlsYXIgdG8gYFRocmVlLmpzIG1lc2hgLCBidXQgaXQgYWxzbyB0YWtlIGludG8gY29uc2lkZXJhdGlvbiBjb2xsaXNpb24gY2FsY3VsYXRpb25zLlxuICogVGhpcyBtZXNoIGlzIGEgY29tYmluYXRpb24gb2YgYFRocmVlLmpzIGdlb21ldHJ5YCBhbmQgYFBoeXNpanMgbWF0ZXJpYWxgIChUaGUgc2FtZSBhcyBpbiB0aHJlZS5qcywgYnV0IHdpdGggZnJpY3Rpb24gYW5kIHJlc3RpdHV0aW9uKS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU3BoZXJlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwaGVyZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgU3BoZXJlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNwaGVyZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTcGhlcmUuZGVmYXVsdHMsIFNwaGVyZS5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFNwaGVyZUJ1ZmZlckdlb21ldHJ5IDogU3BoZXJlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcGhlcmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBUZXRyYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUZXRyYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgdGV0cmFoZWRyb24gaXMgYSBwb2x5aGVkcm9uIGNvbXBvc2VkIG9mIGZvdXIgdHJpYW5ndWxhciBmYWNlcywgc2l4IHN0cmFpZ2h0IGVkZ2VzLCBhbmQgZm91ciB2ZXJ0ZXggY29ybmVycy5cbiAqIFRoZSB0ZXRyYWhlZHJvbiBpcyB0aGUgc2ltcGxlc3Qgb2YgYWxsIHRoZSBvcmRpbmFyeSBjb252ZXggcG9seWhlZHJhIGFuZCB0aGUgb25seSBvbmUgdGhhdCBoYXMgZmV3ZXIgdGhhbiA1IGZhY2VzLlxuICogPGJyLz48YnIvPlxuICogYFRldHJhaGVkcm9uYCBjcmVhdGVzIGEgVGV0cmFoZWRyb24gb2JqZWN0IGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGBcbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVGV0cmFoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVGV0cmFoZWRyb24sIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRldHJhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVGV0cmFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXRyYWhlZHJvbi5kZWZhdWx0cywgVGV0cmFoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBUZXRyYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUZXRyYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIEZvbnQsXG4gIE1lc2gsXG4gIFRleHRHZW9tZXRyeSxcbiAgRm9udExvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVGV4dFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVGV4dCBjbGFzcyBpcyBtYWRlIGZvciBjcmVhdGluZyAzRCB0ZXh0IG9iamVjdHMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RleHRHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogPGJyLz48YnIvPlxuICogUGh5c2ljcyB0ZXh0IG9iamVjdCBjYW4gYmUgY29udmV4IG9yIGNvbmNhdmUuIEJ5IGRlZmF1bHQgaXQncyBjb252ZXggYnV0IHlvdSBjYW4gYWxzbyBzd2l0Y2ggdG8gY29uY2F2ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRleHQsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRleHQoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHRleHQ6ICdoZWxsbyB3b3JsZCcsXG4gKiAgICAgcGFyYW1ldGVyczoge1xuICogICAgICAgZm9udDogJ3BhdGgvdG8vZm9udC50eXBlZmFjZS5qcycsXG4gKiAgICAgICBzaXplOiAyMCxcbiAqICAgICAgIGhlaWdodDogNSxcbiAqICAgICAgIGN1cnZlU2VnbWVudHM6IDZcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IC00MCxcbiAqICAgICB5OiAyMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRleHQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgdGV4dDogJ0hlbGxvIFdvcmxkIScsXG4gICAqICAgbG9hZGVyOiBuZXcgRm9udExvYWRlcigpLFxuICAgKlxuICAgKiAgIHBhcmFtZXRlcnM6IHtcbiAgICogICAgIHNpemU6IDEyLFxuICAgKiAgICAgaGVpZ2h0OiA1MCxcbiAgICogICAgIGN1cnZlU2VnbWVudHM6IDEyLFxuICAgKiAgICAgZm9udDogbmV3IEZvbnQoKSxcbiAgICogICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gICAqICAgICBiZXZlbFRoaWNrbmVzczogMTAsXG4gICAqICAgICBiZXZlbFNpemU6IDhcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICB0ZXh0OiAnSGVsbG8gV29ybGQhJyxcbiAgICBsb2FkZXI6IG5ldyBGb250TG9hZGVyKCksXG5cbiAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICBzaXplOiAxMixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjdXJ2ZVNlZ21lbnRzOiAxMixcbiAgICAgIGZvbnQ6IG5ldyBGb250KCksXG4gICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgYmV2ZWxUaGlja25lc3M6IDEwLFxuICAgICAgYmV2ZWxTaXplOiA4XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXh0LmRlZmF1bHRzLCBNZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXh0XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHBhcmFtcy5sb2FkZXIubG9hZChwYXJhbXMucGFyYW1ldGVycy5mb250LCBmb250ID0+IHtcbiAgICAgICAgcGFyYW1zLnBhcmFtZXRlcnMuZm9udCA9IGZvbnQ7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogbmV3IFRleHRHZW9tZXRyeShcbiAgICAgICAgICAgIHBhcmFtcy50ZXh0LFxuICAgICAgICAgICAgcGFyYW1zLnBhcmFtZXRlcnNcbiAgICAgICAgICApLFxuXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlKFxuICAgICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgICAgbWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgICAgICAgIH0pLm1lc2hcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc3VwZXIud2FpdChwcm9taXNlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRleHRcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0dlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUb3J1c1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXMgY2xhc3MgbWFrZXMgYSB0b3J1cyBmaWd1cmUuIEEgZG9udXQgaXMgYSB0b3J1cy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVG9ydXNHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXMsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRvcnVzKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDUsXG4gKiAgICAgdHViZTogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAzNVxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1cyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXMjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMTAwLFxuICAgKiAgICAgdHViZTogNDAsXG4gICAqICAgICByYWRpYWxTZWdtZW50czogOCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogNixcbiAgICogICAgIGFyYzogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxMDAsXG4gICAgICB0dWJlOiA0MCxcbiAgICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgICAgdHVidWxhclNlZ21lbnRzOiA2LFxuICAgICAgYXJjOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAndHViZScsXG4gICAqICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgKiAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAqICAgICAnYXJjJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3R1YmUnLFxuICAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgICAgJ2FyYydcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVzLmRlZmF1bHRzLCBUb3J1cy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFRvcnVzR2VvbWV0cnkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmFyY1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSxcbiAgVG9ydXNLbm90R2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRvcnVza25vdFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXNrbm90IGNsYXNzIG1ha2VzIGEgdG9ydXNrbm90IGZpZ3VyZS4gSXQncyBsaWtlIGEgY3Jvb2tlZCBkb251dCwgdmVyeSBjcm9va2VkLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUb3J1c0tub3RHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXNrbm90LCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUb3J1c2tub3Qoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czo1LFxuICogICAgIHR1YmU6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczoge1xuICogICAgIHk6IDEwMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1c2tub3QgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxMDAsXG4gICAqICAgICB0dWJlOiA0MCxcbiAgICogICAgIHJhZGlhbFNlZ21lbnRzOiA2NCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogOCxcbiAgICogICAgIHA6IDIsXG4gICAqICAgICBxOiAzXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMTAwLFxuICAgICAgdHViZTogNDAsXG4gICAgICByYWRpYWxTZWdtZW50czogNjQsXG4gICAgICB0dWJ1bGFyU2VnbWVudHM6IDgsXG4gICAgICBwOiAyLFxuICAgICAgcTogM1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3R1YmUnLFxuICAgKiAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICogICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgKiAgICAgJ3AnLFxuICAgKiAgICAgJ3EnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1cycsXG4gICAgICAndHViZScsXG4gICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAgICAncCcsXG4gICAgICAncSdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVza25vdC5kZWZhdWx0cywgVG9ydXNrbm90Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3RcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBHQ29uc3RydWN0ID0gcGFyYW1zLmJ1ZmZlciA/IFRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IDogVG9ydXNLbm90R2VvbWV0cnk7XG5cbiAgICByZXR1cm4gbmV3IEdDb25zdHJ1Y3QoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnAsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNrbm90XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGluZUN1cnZlMyxcbiAgVmVjdG9yMyxcbiAgVHViZUJ1ZmZlckdlb21ldHJ5LFxuICBUdWJlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFR1YmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFR1YmUgY2xhc3MgbWFrZXMgYSB0dWJlIHRoYXQgZXh0cnVkZXMgYWxvbmcgYSAzZCBjdXJ2ZS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVHViZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUdWJlIGZyb20gYSB0aHJlZS5qcyBDdXJ2ZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCBDdXN0b21TaW5DdXJ2ZSA9IFRIUkVFLkN1cnZlLmNyZWF0ZShcbiAqICAgZnVuY3Rpb24gKHNjYWxlKSB7IC8vIGN1c3RvbSBjdXJ2ZSBjb25zdHJ1Y3RvclxuICogICAgIHRoaXMuc2NhbGUgPSAoc2NhbGUgPT09IHVuZGVmaW5lZCkgPyAxIDogc2NhbGU7XG4gKiAgIH0sXG4gKlxuICogICBmdW5jdGlvbiAodCkgeyAvLyBnZXRQb2ludDogdCBpcyBiZXR3ZWVuIDAtMVxuICogICAgIGNvbnN0IHR4ID0gdCAqIDMgLSAxLjUsXG4gKiAgICAgdHkgPSBNYXRoLnNpbiggMiAqIE1hdGguUEkgKiB0ICksXG4gKiAgICAgdHogPSAwO1xuICpcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjModHgsIHR5LCB0eikubXVsdGlwbHlTY2FsYXIodGhpcy5zY2FsZSk7XG4gKiAgIH1cbiAqICk7XG4gKlxuICogY29uc3QgcGF0aCA9IG5ldyBDdXN0b21TaW5DdXJ2ZSgxMCk7XG4gKlxuICogbmV3IFR1YmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBhdGg6IHBhdGhcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVHViZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcGF0aDogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSxcbiAgICogICAgIHNlZ21lbnRzOiAyMCxcbiAgICogICAgIHJhZGl1czogMixcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiA4LFxuICAgKiAgICAgY2xvc2VkOiBmYWxzZVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwYXRoOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMSkpLFxuICAgICAgc2VnbWVudHM6IDIwLFxuICAgICAgcmFkaXVzOiAyLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDgsXG4gICAgICBjbG9zZWQ6IGZhbHNlXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdwYXRoJyxcbiAgICogICAgICdzZWdtZW50cycsXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgICAnY2xvc2VkJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdwYXRoJyxcbiAgICAgICdzZWdtZW50cycsXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnY2xvc2VkJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVHViZS5kZWZhdWx0cywgVHViZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gVHViZUJ1ZmZlckdlb21ldHJ5IDogVHViZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wYXRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5jbG9zZWRcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFR1YmVcbn07XG4iLCJpbXBvcnQge09iamVjdDNEfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9Db21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBHcm91cFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU29tZXRpbWVzIHlvdSBuZWVkIHRvIG1ha2UgZ3JvdXBzIG9mIG9iamVjdHMgKGl0J3Mgbm90IGNvbnZlbmllbnRseSB0byBhcHBseSB0cmFuc2Zvcm1zIHRvIGVhY2ggb2JqZWN0IHdoZW4gY2FuIG1ha2UganVzdCBvbmUgdG8gYSBncm91cCkuPGJyLz5cbiAqIEluIFRocmVlLmpzIHlvdSBtYWtlIGl0IHVzaW5nIGBUSFJFRS5PYmplY3QzRGAgYW5kIGl0J3MgY2hpbGRyZW4uIDxici8+PGJyLz5cbiAqIEluIHdocy5qcyB3ZSBoYXZlIGBHcm91cGBcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBBZGRpbmcgb2JqZWN0cyB0byBhbiBlbXB0eSBncm91cDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNwaGVyZSA9IG5ldyBTcGhlcmUoKTtcbiAqIGNvbnN0IGJveCA9IG5ldyBCb3goKTtcbiAqIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gKlxuICogc3BoZXJlLmFkZFRvKGdyb3VwKTtcbiAqIGJveC5hZGRUbyhncm91cCk7XG4qIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBNYWtpbmcgYSBncm91cCBmcm9tIG9iamVjdHM8L2NhcHRpb24+XG4gKiBjb25zdCBzcGhlcmUgPSBuZXcgU3BoZXJlKCk7XG4gKiBjb25zdCBib3ggPSBuZXcgQm94KCk7XG4gKiBjb25zdCBncm91cCA9IG5ldyBHcm91cChib3gsIHNwaGVyZSk7XG4gKiAvLyBPUjogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoW2JveCwgc3BoZXJlXSk7XG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKC4uLm9iamVjdHMpIHtcbiAgICBzdXBlcih7fSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG9iaiA9IG9iamVjdHNbaV07XG5cbiAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBDb21wb25lbnQpIG9iai5hZGRUbyh0aGlzKTtcbiAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdDNEKSB0aGlzLm5hdGl2ZS5hZGQob2JqKTtcbiAgICB9XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdDNEKCk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgR3JvdXBcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL21lc2hlcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9Cb3gnO1xuZXhwb3J0ICogZnJvbSAnLi9DaXJjbGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db25lJztcbmV4cG9ydCAqIGZyb20gJy4vQ3lsaW5kZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Eb2RlY2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9FeHRydWRlJztcbmV4cG9ydCAqIGZyb20gJy4vSWNvc2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9MYXRoZSc7XG5leHBvcnQgKiBmcm9tICcuL0xpbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9JbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL09jdGFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9QYXJhbWV0cmljJztcbmV4cG9ydCAqIGZyb20gJy4vUGxhbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2x5aGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vUmluZyc7XG5leHBvcnQgKiBmcm9tICcuL1NoYXBlJztcbmV4cG9ydCAqIGZyb20gJy4vU3BoZXJlJztcbmV4cG9ydCAqIGZyb20gJy4vVGV0cmFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0JztcbmV4cG9ydCAqIGZyb20gJy4vVG9ydXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Ub3J1c2tub3QnO1xuZXhwb3J0ICogZnJvbSAnLi9UdWJlJztcbmV4cG9ydCAqIGZyb20gJy4vR3JvdXAnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRWxlbWVudE1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRhaW5lcj1kb2N1bWVudC5ib2R5XSBjb250YWluZXIgaXMgdGhlIERPTSBvYmplY3QgdG8gd2hpY2ggYXBwbGljYXRpb24ncyBjYW52YXMgd2lsbCBiZSBhZGRlZCB0by5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGVsZW1lbnQgbW9kdWxlLCBwYXNzaW5nIGl0IHRvIHRoZSBBcHA8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgbmV3IEVsZW1lbnRNb2R1bGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVtZW50TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSkge1xuICAgIGlmIChjb250YWluZXIuY29udGFpbmVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0VsZW1lbnRNb2R1bGUgbm93IGFjY2VwdHMgb25seSBhcmd1bWVudCB3aGljaCBpcyBhIERPTSBvYmplY3QsIG5vdCBhIHBhcmFtcyBvYmplY3QuJyk7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lci5jb250YWluZXI7XG4gICAgfSBlbHNlIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjcmVhdGVFbGVtZW50XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIGNhbnZhcyBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3docy1hcHAnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICdpbmhlcml0JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJ2luaGVyaXQnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnZWxlbWVudCcsIHRoaXMuZWxlbWVudCk7XG4gICAgbWFuYWdlci5zZXQoJ2NvbnRhaW5lcicsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgV2ViR0xSZW5kZXJlcixcbiAgVmVjdG9yMlxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuLyoqXG4gKiBAY2xhc3MgUmVuZGVyaW5nTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgcmVuZGVyaW5nIG1vZHVsZSBhbmQgcGFzc2luZyBpdCB0byBBcHAncyBtb2R1bGVzPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIG5ldyBFbGVtZW50TW9kdWxlKCksXG4gKiAgIG5ldyBTY2VuZU1vZHVsZSgpLFxuICogICBuZXcgQ2FtZXJhTW9kdWxlKHtcbiAqICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgNiwgMTgpLFxuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSksXG4gKiAgIG5ldyBSZW5kZXJpbmdNb2R1bGUoe1xuICogICAgIGJnQ29sb3I6IDB4MTYyMTI5LFxuICpcbiAqICAgICByZW5kZXJlcjoge1xuICogICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICogICAgICAgc2hhZG93bWFwOiB7XG4gKiAgICAgICAgIHR5cGU6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiAgIH0sIHtzaGFkb3c6IHRydWV9KVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJpbmdNb2R1bGUge1xuICBzdGF0aWMgYWRkaXRpb25hbCA9IHtcbiAgICBzaGFkb3cocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBlbmFibGVkID0gdHJ1ZTtcblxuICBkZWZlciA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCB7c2hhZG93OiBpc1NoYWRvd30gPSB7c2hhZG93OiBmYWxzZX0pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cbiAgICAgIHJlc29sdXRpb246IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgcGl4ZWxSYXRpbzogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG5cbiAgICAgIGJnQ29sb3I6IDB4MDAwMDAwLFxuICAgICAgYmdPcGFjaXR5OiAxLFxuXG4gICAgICByZW5kZXJlcjoge31cbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgY29uc3Qge1xuICAgICAgYmdDb2xvcixcbiAgICAgIGJnT3BhY2l0eSxcbiAgICAgIHJlbmRlcmVyLFxuICAgICAgcGl4ZWxSYXRpbyxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcmVzb2x1dGlvblxuICAgIH0gPSB0aGlzLnBhcmFtcztcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcihyZW5kZXJlcik7XG4gICAgdGhpcy5lZmZlY3RzID0gW107XG4gICAgdGhpcy5hcHBseUFkZGl0aW9uYWwoJ3NoYWRvdycsIGlzU2hhZG93KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihcbiAgICAgIGJnQ29sb3IsXG4gICAgICBiZ09wYWNpdHlcbiAgICApO1xuXG4gICAgaWYgKHBpeGVsUmF0aW8pIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhwaXhlbFJhdGlvKTtcblxuICAgIHRoaXMuc2V0U2l6ZShcbiAgICAgIE51bWJlcih3aWR0aCAqIHJlc29sdXRpb24ueCkudG9GaXhlZCgpLFxuICAgICAgTnVtYmVyKGhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpXG4gICAgKTtcbiAgfVxuXG4gIGFwcGx5QWRkaXRpb25hbChuYW1lLCBpc0FwcGxpZWQgPSBmYWxzZSkge1xuICAgIGlmICghaXNBcHBsaWVkKSByZXR1cm47XG4gICAgUmVuZGVyaW5nTW9kdWxlLmFkZGl0aW9uYWxbbmFtZV0uYXBwbHkodGhpcywgW3RoaXMucmVuZGVyZXJdKTtcbiAgfVxuXG4gIGludGVncmF0ZVJlbmRlcmVyKGVsZW1lbnQsIHNjZW5lLCBjYW1lcmEpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoKCkgPT4gdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpKTtcbiAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTG9vcDtcbiAgfVxuXG4gIGVmZmVjdChlZmZlY3QsIGNiKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG5cbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcbiAgICAgIGVmZmVjdC5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblxuICAgICAgY29uc3QgbG9vcCA9IG5ldyBMb29wKGNiID8gY2IgOiAoKSA9PiB7XG4gICAgICAgIGVmZmVjdC5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKGxvb3ApO1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkgbG9vcC5zdGFydCh0aGlzLmFwcCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRTaXplXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgcmVuZGVyIHRhcmdldCB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlbmRlcmluZ01vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cbiAgICAvLyBhdHRhY2ggdG8gbmV3IHBhcmVudCB3b3JsZCBkb21cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG4gICAgdGhpcy5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AoKSk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdGFydCgpO1xuICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdGFydCgpKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZW5kZXJpbmcnKTtcbiAgICBtYW5hZ2VyLnNldCgncmVuZGVyZXInLCB0aGlzLnJlbmRlcmVyKTtcblxuICAgIHRoaXMuYXBwID0gbWFuYWdlci5oYW5kbGVyO1xuXG4gICAgdGhpcy5yZW5kZXJMb29wID0gdGhpcy5pbnRlZ3JhdGVSZW5kZXJlcihcbiAgICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JyksXG4gICAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKSxcbiAgICAgIG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmVcbiAgICApO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgZWxlbWVudDogZWxlbWVudCA9PiB7XG4gICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCk7XG4gICAgICB9LFxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNvbHZlKCk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYucmVuZGVyTG9vcC5zdGFydCh0aGlzKTtcbiAgICBzZWxmLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RhcnQodGhpcykpO1xuICB9XG5cbiAgZGlzcG9zZShzZWxmKSB7XG4gICAgc2VsZi5yZW5kZXJMb29wLnN0b3AodGhpcyk7XG4gICAgc2VsZi5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AodGhpcykpO1xuICAgIHNlbGYucmVuZGVyZXIuZm9yY2VDb250ZXh0TG9zcygpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBTY2VuZVxufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIFNjZW5lTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpbGxTY2VuZUJlUmVwbGFjZWQ9ZmFsc2VdIHdpbGxTY2VuZUJlUmVwbGFjZWQgc2hvdWxkIGJlIHRydWUgb25seSBpZiB5b3UgYXJlIGdvaW5nIHRvIG92ZXJ3cml0ZSBzY2VuZSBkZXBlbmRlbmN5IGV2ZW4gd2l0aG91dCB0aGUgdXNlIG9mIGRlZmF1bHQgb25lLlxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgU2NlbmVNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih3aWxsU2NlbmVCZVJlcGxhY2VkID0gZmFsc2UpIHtcbiAgICB0aGlzLnNjZW5lID0gd2lsbFNjZW5lQmVSZXBsYWNlZCA/IG51bGwgOiBuZXcgU2NlbmUoKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdzY2VuZScsIHRoaXMuc2NlbmUpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG5cbiAgICB0aGlzLmFkZCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBvYmplY3QuZGVmZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtuYXRpdmV9ID0gb2JqZWN0O1xuICAgICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICAgIGNvbnN0IGFkZFByb21pc2UgPSB0aGlzLmFwcGx5QnJpZGdlKHtvbkFkZDogb2JqZWN0fSkub25BZGQ7XG5cbiAgICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuc2NlbmUuYWRkKG5hdGl2ZSk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoYWRkUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICBhZGRQcm9taXNlLnRoZW4ocmVzb2x2ZXIpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICAgIHNlbGYuc2NlbmUucmVtb3ZlKG9iamVjdC5uYXRpdmUpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldFNjZW5lID0gZnVuY3Rpb24gKHNjZW5lKSB7XG4gICAgICBzZWxmLnNjZW5lID0gc2NlbmU7XG4gICAgICB0aGlzLm1hbmFnZXIuc2V0KCdzY2VuZScsIHNjZW5lKTtcbiAgICB9O1xuICB9XG59XG4iLCIvLyBpbXBvcnQge2FkZFJlc2l6ZUxpc3RlbmVyfSBmcm9tICdkZXRlY3QtZWxlbWVudC1yZXNpemUnO1xuXG4vKipcbiAqIEBjbGFzcyBSZXNpemVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2F1dG86IHRydWV9XSAtIElmIGF1dG8gaXMgc2V0IHRvIHRydWUgLSByZXNpemUgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBjb250YWluZXIgcmVzaXplc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgUmVzaXplTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYXV0bzogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IFt0aGlzLnNldFNpemUuYmluZCh0aGlzKV07XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIHNldFNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHByb3ZpZGVkIHdpZHRoICYgaGVpZ2h0IHRvIHRoZSByZW5kZXJlciBvYmplY3QuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGg9MV0gLSBUaGUgcHJvbWlzZSB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byBhIHF1ZXVlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodD0xXSAtIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCA9IDEsIGhlaWdodCA9IDEpIHtcbiAgICB0aGlzLmNhbWVyYS5uYXRpdmUuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgdGhpcy5jYW1lcmEubmF0aXZlLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmluZykgdGhpcy5yZW5kZXJpbmcuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHRyaWdnZXJcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUcmlnZ2VycyByZXNpemUgd2hlbiBjYWxsZWQuIHdpZHRoICYgaGVpZ2h0IGFyZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHlcbiAgICogVGhpcyBpbnZva2VzIGVhY2ggY2FsbGJhY2tzIHdpdGggdGhlIG5ldyB3aWR0aCBhbmQgaGVpZ2h0IGFzIHBhcmFtc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgdHJpZ2dlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXI6IHtcbiAgICAgICAgb2Zmc2V0V2lkdGgsXG4gICAgICAgIG9mZnNldEhlaWdodFxuICAgICAgfSxcbiAgICAgIHJlc29sdXRpb25cbiAgICB9ID0gdGhpcztcblxuICAgIGNvbnN0IHdpZHRoID0gTnVtYmVyKG9mZnNldFdpZHRoICogcmVzb2x1dGlvbi54KS50b0ZpeGVkKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKG9mZnNldEhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpO1xuXG4gICAgdGhpcy5jYWxsYmFja3MuZm9yRWFjaChjYiA9PiB7XG4gICAgICBjYih3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZEF1dG9yZXNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIG1vZHVsZSB0byBhdXRvcmVzaXplLCB0aGlzIGFkZHMgYW4gZXZlbnQgbGlzdGVuZSBvbiB3aW5kb3cgcmVzaXplIHRvIHRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgYWRkQXV0b3Jlc2l6ZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29udGFpbmVyKCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGhpcy5nZXRSZXNvbHV0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYXV0bykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudHJpZ2dlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZENhbGxiYWNrXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIGNhbGwgYmFjayBmdW5jdGlvbiB0byB0aGUgZXhpc3RpbmcgY2FsbGJhY2tzIGxpc3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYWRkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBhZGRDYWxsYmFjayhmdW5jKSB7XG4gICAgdGhpcy5jYWxsYmFja3MucHVzaChmdW5jKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZXNpemUnKTtcblxuICAgIHRoaXMucmVuZGVyaW5nID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJyk7XG5cbiAgICB0aGlzLmdldFJlc29sdXRpb24gPSAoKSA9PiBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykucGFyYW1zLnJlc29sdXRpb247XG4gICAgdGhpcy5nZXRDb250YWluZXIgPSAoKSA9PiBtYW5hZ2VyLmdldCgnY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmFkZEF1dG9yZXNpemUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2MDtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MTtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MztcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIHRvcCBsZWZ0IHRleGVsLlxcclxcblxcdHZlYzQgc3VtID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYwKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgdG9wIHJpZ2h0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjEpO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSBib3R0b20gcmlnaHQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2Mik7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIGJvdHRvbSBsZWZ0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjMpO1xcclxcblxcclxcblxcdC8vIENvbXB1dGUgdGhlIGF2ZXJhZ2UuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gc3VtICogMC4yNTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG51bmlmb3JtIHZlYzIgaGFsZlRleGVsU2l6ZTtcXHJcXG51bmlmb3JtIGZsb2F0IGtlcm5lbDtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2MDtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MTtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MztcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBkVXYgPSAodGV4ZWxTaXplICogdmVjMihrZXJuZWwpKSArIGhhbGZUZXhlbFNpemU7XFxyXFxuXFxyXFxuXFx0dlV2MCA9IHZlYzIodXYueCAtIGRVdi54LCB1di55ICsgZFV2LnkpO1xcclxcblxcdHZVdjEgPSB2ZWMyKHV2LnggKyBkVXYueCwgdXYueSArIGRVdi55KTtcXHJcXG5cXHR2VXYyID0gdmVjMih1di54ICsgZFV2LngsIHV2LnkgLSBkVXYueSk7XFxyXFxuXFx0dlV2MyA9IHZlYzIodXYueCAtIGRVdi54LCB1di55IC0gZFV2LnkpO1xcclxcblxcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEFuIG9wdGltaXNlZCBjb252b2x1dGlvbiBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIHRoZSBHREMyMDAzIFByZXNlbnRhdGlvbiBieSBNYXNha2kgS2F3YXNlLCBCdW5rYXNoYSBHYW1lczpcclxuICogIEZyYW1lIEJ1ZmZlciBQb3N0cHJvY2Vzc2luZyBFZmZlY3RzIGluIERPVUJMRS1TLlQuRS5BLkwgKFdyZWNrbGVzcylcclxuICogYW5kIGFuIGFydGljbGUgYnkgRmlsaXAgU3RydWdhciwgSW50ZWw6XHJcbiAqICBBbiBpbnZlc3RpZ2F0aW9uIG9mIGZhc3QgcmVhbC10aW1lIEdQVS1iYXNlZCBpbWFnZSBibHVyIGFsZ29yaXRobXNcclxuICpcclxuICogRnVydGhlciBtb2RpZmllZCBhY2NvcmRpbmcgdG8gQXBwbGUnc1xyXG4gKiBbQmVzdCBQcmFjdGljZXMgZm9yIFNoYWRlcnNdKGh0dHBzOi8vZ29vLmdsL2xtUm9NNSkuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnZvbHV0aW9uTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY29udm9sdXRpb24gbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjJ9IFt0ZXhlbFNpemVdIC0gVGhlIGFic29sdXRlIHNjcmVlbiB0ZXhlbCBzaXplLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0ZXhlbFNpemUgPSBuZXcgVmVjdG9yMigpKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJDb252b2x1dGlvbk1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dGV4ZWxTaXplOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigpKSxcclxuXHRcdFx0XHRoYWxmVGV4ZWxTaXplOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigpKSxcclxuXHRcdFx0XHRrZXJuZWw6IG5ldyBVbmlmb3JtKDAuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnNldFRleGVsU2l6ZSh0ZXhlbFNpemUueCwgdGV4ZWxTaXplLnkpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGN1cnJlbnQga2VybmVsIHNpemUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0XHQgKiBAZGVmYXVsdCBLZXJuZWxTaXplLkxBUkdFXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmtlcm5lbFNpemUgPSBLZXJuZWxTaXplLkxBUkdFO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGtlcm5lbC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gVGhlIGtlcm5lbC5cclxuXHQgKi9cclxuXHJcblx0Z2V0S2VybmVsKCkgeyByZXR1cm4ga2VybmVsUHJlc2V0c1t0aGlzLmtlcm5lbFNpemVdOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHRleGVsIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0geCAtIFRoZSB0ZXhlbCB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0geSAtIFRoZSB0ZXhlbCBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFRleGVsU2l6ZSh4LCB5KSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy50ZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpO1xyXG5cdFx0dGhpcy51bmlmb3Jtcy5oYWxmVGV4ZWxTaXplLnZhbHVlLnNldCh4LCB5KS5tdWx0aXBseVNjYWxhcigwLjUpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEthd2FzZSBibHVyIGtlcm5lbCBwcmVzZXRzLlxyXG4gKlxyXG4gKiBAdHlwZSB7RmxvYXQzMkFycmF5W119XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxuY29uc3Qga2VybmVsUHJlc2V0cyA9IFtcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAxLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMS4wLCAyLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAyLjAsIDMuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDMuMCwgNC4wLCA0LjAsIDUuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDMuMCwgNC4wLCA1LjAsIDcuMCwgOC4wLCA5LjAsIDEwLjBdKVxyXG5dO1xyXG5cclxuLyoqXHJcbiAqIEEga2VybmVsIHNpemUgZW51bWVyYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJZX1NNQUxMIC0gQSB2ZXJ5IHNtYWxsIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSA3eDcgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTTUFMTCAtIEEgc21hbGwga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDE1eDE1IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTUVESVVNIC0gQSBtZWRpdW0gc2l6ZWQga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDIzeDIzIEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTEFSR0UgLSBBIGxhcmdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAzNXgzNSBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFZFUllfTEFSR0UgLSBBIHZlcnkgbGFyZ2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDYzeDYzIEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gSFVHRSAtIEEgaHVnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMTI3eDEyNyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgS2VybmVsU2l6ZSA9IHtcclxuXHJcblx0VkVSWV9TTUFMTDogMCxcclxuXHRTTUFMTDogMSxcclxuXHRNRURJVU06IDIsXHJcblx0TEFSR0U6IDMsXHJcblx0VkVSWV9MQVJHRTogNCxcclxuXHRIVUdFOiA1XHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcdGdsX0ZyYWdDb2xvciA9IG9wYWNpdHkgKiB0ZXhlbDtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBzaW1wbGUgY29weSBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvcHlNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjb3B5IG1hdGVyaWFsLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkNvcHlNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdG9wYWNpdHk6IG5ldyBVbmlmb3JtKDEuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoYWRlciBtYXRlcmlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcG9zdCBwcm9jZXNzaW5nIHBhc3Nlcy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9tYXRlcmlhbHNcclxuICovXHJcblxyXG5leHBvcnQgeyBBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCB9IGZyb20gXCIuL2FkYXB0aXZlLWx1bWlub3NpdHkuanNcIjtcclxuZXhwb3J0IHsgQm9rZWhNYXRlcmlhbCB9IGZyb20gXCIuL2Jva2VoLmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoMk1hdGVyaWFsIH0gZnJvbSBcIi4vYm9rZWgyLmpzXCI7XHJcbmV4cG9ydCB7IENvbWJpbmVNYXRlcmlhbCB9IGZyb20gXCIuL2NvbWJpbmUuanNcIjtcclxuZXhwb3J0IHsgQ29udm9sdXRpb25NYXRlcmlhbCwgS2VybmVsU2l6ZSB9IGZyb20gXCIuL2NvbnZvbHV0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IENvcHlNYXRlcmlhbCB9IGZyb20gXCIuL2NvcHkuanNcIjtcclxuZXhwb3J0IHsgRGVwdGhNYXRlcmlhbCB9IGZyb20gXCIuL2RlcHRoLmpzXCI7XHJcbmV4cG9ydCB7IERvdFNjcmVlbk1hdGVyaWFsIH0gZnJvbSBcIi4vZG90LXNjcmVlbi5qc1wiO1xyXG5leHBvcnQgeyBGaWxtTWF0ZXJpYWwgfSBmcm9tIFwiLi9maWxtLmpzXCI7XHJcbmV4cG9ydCB7IEdsaXRjaE1hdGVyaWFsIH0gZnJvbSBcIi4vZ2xpdGNoLmpzXCI7XHJcbmV4cG9ydCB7IEdvZFJheXNNYXRlcmlhbCB9IGZyb20gXCIuL2dvZC1yYXlzLmpzXCI7XHJcbmV4cG9ydCB7IEx1bWlub3NpdHlNYXRlcmlhbCB9IGZyb20gXCIuL2x1bWlub3NpdHkuanNcIjtcclxuZXhwb3J0IHsgUGl4ZWxhdGlvbk1hdGVyaWFsIH0gZnJvbSBcIi4vcGl4ZWxhdGlvbi5qc1wiO1xyXG5leHBvcnQgeyBTaG9ja1dhdmVNYXRlcmlhbCB9IGZyb20gXCIuL3Nob2NrLXdhdmUuanNcIjtcclxuZXhwb3J0IHsgU01BQUJsZW5kTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLWJsZW5kLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLWNvbG9yLWVkZ2VzLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFXZWlnaHRzTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLXdlaWdodHMuanNcIjtcclxuZXhwb3J0IHsgVG9uZU1hcHBpbmdNYXRlcmlhbCB9IGZyb20gXCIuL3RvbmUtbWFwcGluZy5qc1wiO1xyXG4iLCJpbXBvcnQgeyBTY2VuZSwgTWVzaCwgT3J0aG9ncmFwaGljQ2FtZXJhLCBQbGFuZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG4vKipcclxuICogQW4gYWJzdHJhY3QgcGFzcy5cclxuICpcclxuICogUGFzc2VzIHRoYXQgZG8gbm90IHJlbHkgb24gdGhlIGRlcHRoIGJ1ZmZlciBzaG91bGQgZXhwbGljaXRseSBkaXNhYmxlIHRoZVxyXG4gKiBkZXB0aCB0ZXN0IGFuZCBkZXB0aCB3cml0ZSBpbiB0aGVpciByZXNwZWN0aXZlIHNoYWRlciBtYXRlcmlhbHMuXHJcbiAqXHJcbiAqIFRoaXMgY2xhc3MgaW1wbGVtZW50cyBhIHtAbGluayBQYXNzI2Rpc3Bvc2V9IG1ldGhvZCB0aGF0IGZyZWVzIG1lbW9yeSBvblxyXG4gKiBkZW1hbmQuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBbc2NlbmVdIC0gVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gW2NhbWVyYV0gLSBUaGUgY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7TWVzaH0gW3F1YWRdIC0gQSBxdWFkIHRoYXQgZmlsbHMgdGhlIHNjcmVlbiB0byByZW5kZXIgMkQgZmlsdGVyIGVmZmVjdHMuIFNldCB0aGlzIHRvIG51bGwsIGlmIHlvdSBkb24ndCBuZWVkIGl0IChzZWUge0BsaW5rIFJlbmRlclBhc3N9KS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRzY2VuZSA9IG5ldyBTY2VuZSgpLFxyXG5cdFx0Y2FtZXJhID0gbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgMSwgLTEsIDAsIDEpLFxyXG5cdFx0cXVhZCA9IG5ldyBNZXNoKG5ldyBQbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLCBudWxsKVxyXG5cdCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NjZW5lfVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IFNjZW5lKClcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjYW1lcmEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NhbWVyYX1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIDEsIC0xLCAwLCAxKVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jYW1lcmEgPSBjYW1lcmE7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHF1YWQgbWVzaCB0aGF0IGZpbGxzIHRoZSBzY3JlZW4uXHJcblx0XHQgKlxyXG5cdFx0ICogQXNzaWduIHlvdXIgc2hhZGVyIG1hdGVyaWFsIHRvIHRoaXMgbWVzaCFcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TWVzaH1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBNZXNoKG5ldyBQbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLCBudWxsKVxyXG5cdFx0ICogQGV4YW1wbGUgdGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5teU1hdGVyaWFsO1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5xdWFkID0gcXVhZDtcclxuXHJcblx0XHRpZih0aGlzLnF1YWQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucXVhZC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZih0aGlzLnNjZW5lICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2NlbmUuYWRkKHRoaXMucXVhZCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMgc2hvdWxkIGJlIHN3YXBwZWQgYWZ0ZXIgdGhpc1xyXG5cdFx0ICogcGFzcyBoYXMgZmluaXNoZWQgcmVuZGVyaW5nLlxyXG5cdFx0ICpcclxuXHRcdCAqIFNldCB0aGlzIHRvIHRydWUgaWYgdGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlciBzbyB0aGF0IGFcclxuXHRcdCAqIGZvbGxvd2luZyBwYXNzIGNhbiBmaW5kIHRoZSByZXN1bHQgaW4gdGhlIHJlYWQgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFbmFibGVkIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVuZGVyIHRvIHNjcmVlbiBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVG9TY3JlZW4gPSBmYWxzZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBUaGlzIGlzIGFuIGFic3RyYWN0IG1ldGhvZCB0aGF0IG11c3QgYmUgb3ZlcnJpZGRlbi5cclxuXHQgKlxyXG5cdCAqIEBhYnN0cmFjdFxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBBbiBlcnJvciBpcyB0aHJvd24gaWYgdGhlIG1ldGhvZCBpcyBub3Qgb3ZlcnJpZGRlbi5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBBIHJlYWQgYnVmZmVyLiBDb250YWlucyB0aGUgcmVzdWx0IG9mIHRoZSBwcmV2aW91cyBwYXNzLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gQSB3cml0ZSBidWZmZXIuIE5vcm1hbGx5IHVzZWQgYXMgdGhlIHJlbmRlciB0YXJnZXQgd2hlbiB0aGUgcmVhZCBidWZmZXIgaXMgdXNlZCBhcyBpbnB1dC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhXSAtIFRoZSBkZWx0YSB0aW1lLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2tBY3RpdmVdIC0gSW5kaWNhdGVzIHdoZXRoZXIgYSBzdGVuY2lsIHRlc3QgbWFzayBpcyBhY3RpdmUgb3Igbm90LlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSwgbWFza0FjdGl2ZSkge1xyXG5cclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlJlbmRlciBtZXRob2Qgbm90IGltcGxlbWVudGVkIVwiKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBZb3UgbWF5IG92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIGNhc2UgeW91IHdhbnQgdG8gYmUgaW5mb3JtZWQgYWJvdXQgdGhlIG1haW5cclxuXHQgKiByZW5kZXIgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIGJlZm9yZSB0aGlzIHBhc3MgaXNcclxuXHQgKiBpbml0aWFsaXNlZCBhbmQgZXZlcnkgdGltZSBpdHMgb3duIHNpemUgaXMgdXBkYXRlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSByZW5kZXJlcidzIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgcmVuZGVyZXIncyBoZWlnaHQuXHJcblx0ICogQGV4YW1wbGUgdGhpcy5teVJlbmRlclRhcmdldC5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIGluaXRpYWxpc2F0aW9uIHRhc2tzLlxyXG5cdCAqXHJcblx0ICogQnkgb3ZlcnJpZGluZyB0aGlzIG1ldGhvZCB5b3UgZ2FpbiBhY2Nlc3MgdG8gdGhlIHJlbmRlcmVyLiBZb3UnbGwgYWxzbyBiZVxyXG5cdCAqIGFibGUgdG8gY29uZmlndXJlIHlvdXIgY3VzdG9tIHJlbmRlciB0YXJnZXRzIHRvIHVzZSB0aGUgYXBwcm9wcmlhdGUgZm9ybWF0XHJcblx0ICogKFJHQiBvciBSR0JBKS5cclxuXHQgKlxyXG5cdCAqIFRoZSBwcm92aWRlZCByZW5kZXJlciBjYW4gYmUgdXNlZCB0byB3YXJtIHVwIHNwZWNpYWwgb2ZmLXNjcmVlbiByZW5kZXJcclxuXHQgKiB0YXJnZXRzIGJ5IHBlcmZvcm1pbmcgYSBwcmVsaW1pbmFyeSByZW5kZXIgb3BlcmF0aW9uLlxyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiB0aGlzIHBhc3MgaXMgYWRkZWQgdG8gaXRzXHJcblx0ICogcXVldWUuXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIGluaXRpYWxpc2VcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxwaGEgLSBXaGV0aGVyIHRoZSByZW5kZXJlciB1c2VzIHRoZSBhbHBoYSBjaGFubmVsIG9yIG5vdC5cclxuXHQgKiBAZXhhbXBsZSBpZighYWxwaGEpIHsgdGhpcy5teVJlbmRlclRhcmdldC50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDsgfVxyXG5cdCAqL1xyXG5cclxuXHRpbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSkge31cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgYSBzaGFsbG93IHNlYXJjaCBmb3IgcHJvcGVydGllcyB0aGF0IGRlZmluZSBhIGRpc3Bvc2UgbWV0aG9kIGFuZFxyXG5cdCAqIGRlbGV0ZXMgdGhlbS4gVGhlIHBhc3Mgd2lsbCBiZSBpbm9wZXJhdGl2ZSBhZnRlciB0aGlzIG1ldGhvZCB3YXMgY2FsbGVkIVxyXG5cdCAqXHJcblx0ICogRGlzcG9zYWJsZSBvYmplY3RzOlxyXG5cdCAqICAtIHJlbmRlciB0YXJnZXRzXHJcblx0ICogIC0gbWF0ZXJpYWxzXHJcblx0ICogIC0gdGV4dHVyZXNcclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gaXQgaXMgYmVpbmcgZGVzdHJveWVkLlxyXG5cdCAqIFlvdSBtYXksIGhvd2V2ZXIsIHVzZSBpdCBpbmRlcGVuZGVudGx5IHRvIGZyZWUgbWVtb3J5IHdoZW4geW91IGFyZSBjZXJ0YWluXHJcblx0ICogdGhhdCB5b3UgZG9uJ3QgbmVlZCB0aGlzIHBhc3MgYW55bW9yZS5cclxuXHQgKi9cclxuXHJcblx0ZGlzcG9zZSgpIHtcclxuXHJcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblxyXG5cdFx0bGV0IGtleTtcclxuXHJcblx0XHRmb3Ioa2V5IG9mIGtleXMpIHtcclxuXHJcblx0XHRcdGlmKHRoaXNba2V5XSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpc1trZXldLmRpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cclxuXHRcdFx0XHR0aGlzW2tleV0uZGlzcG9zZSgpO1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IG51bGw7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogVXNlZCBmb3Igc2F2aW5nIHRoZSBvcmlnaW5hbCBjbGVhciBjb2xvciBvZiB0aGUgcmVuZGVyZXIuXHJcbiAqXHJcbiAqIEB0eXBlIENvbG9yXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICovXHJcblxyXG5jb25zdCBjb2xvciA9IG5ldyBDb2xvcigpO1xyXG5cclxuLyoqXHJcbiAqIEEgY2xlYXIgcGFzcy5cclxuICpcclxuICogWW91IGNhbiBwcmV2ZW50IHNwZWNpZmljIGJ1ZmZlcnMgZnJvbSBiZWluZyBjbGVhcmVkIGJ5IHNldHRpbmcgZWl0aGVyIHRoZVxyXG4gKiBhdXRvQ2xlYXJDb2xvciwgYXV0b0NsZWFyU3RlbmNpbCBvciBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlclxyXG4gKiB0byBmYWxzZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY2xlYXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTAuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkNsZWFyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXIgY29sb3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvbG9yfVxyXG5cdFx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckNvbG9yID0gKG9wdGlvbnMuY2xlYXJDb2xvciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJDb2xvciA6IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhciBhbHBoYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQGRlZmF1bHQgMC4wXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyQWxwaGEgPSAob3B0aW9ucy5jbGVhckFscGhhICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckFscGhhIDogMC4wO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgcmVhZCBidWZmZXIgb3IgdGhlIHNjcmVlbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgY2xlYXJDb2xvciA9IHRoaXMuY2xlYXJDb2xvcjtcclxuXHJcblx0XHRsZXQgY2xlYXJBbHBoYTtcclxuXHJcblx0XHRpZihjbGVhckNvbG9yICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRjb2xvci5jb3B5KHJlbmRlcmVyLmdldENsZWFyQ29sb3IoKSk7XHJcblx0XHRcdGNsZWFyQWxwaGEgPSByZW5kZXJlci5nZXRDbGVhckFscGhhKCk7XHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY2xlYXJDb2xvciwgdGhpcy5jbGVhckFscGhhKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcik7XHJcblx0XHRyZW5kZXJlci5jbGVhcigpO1xyXG5cclxuXHRcdGlmKGNsZWFyQ29sb3IgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY29sb3IsIGNsZWFyQWxwaGEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IGRpc2FibGVzIHRoZSBzdGVuY2lsIG1hc2suXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjbGVhciBtYXNrIHBhc3MuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKG51bGwsIG51bGwsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJDbGVhck1hc2tQYXNzXCI7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzYWJsZXMgdGhlIHN0ZW5jaWwgdGVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlcikge1xyXG5cclxuXHRcdHJlbmRlcmVyLnN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRUZXN0KGZhbHNlKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEYXRhVGV4dHVyZSwgUkdCRm9ybWF0LCBGbG9hdFR5cGUgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgR2xpdGNoTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21JbnQobG93LCBoaWdoKSB7XHJcblxyXG5cdHJldHVybiBsb3cgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyArIDEpKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21GbG9hdChsb3csIGhpZ2gpIHtcclxuXHJcblx0cmV0dXJuIGxvdyArIE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgR2xpdGNoUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGdsaXRjaCBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7VGV4dHVyZX0gW29wdGlvbnMucGVydHVyYk1hcF0gLSBBIHBlcnR1cmJhdGlvbiBtYXAuIElmIG5vbmUgaXMgcHJvdmlkZWQsIGEgbm9pc2UgdGV4dHVyZSB3aWxsIGJlIGNyZWF0ZWQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR0U2l6ZT02NF0gLSBUaGUgc2l6ZSBvZiB0aGUgZ2VuZXJhdGVkIG5vaXNlIG1hcC4gV2lsbCBiZSBpZ25vcmVkIGlmIGEgcGVydHVyYmF0aW9uIG1hcCBpcyBwcm92aWRlZC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiR2xpdGNoUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdsaXRjaCBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBuZXcgR2xpdGNoTWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwID0gKG9wdGlvbnMucGVydHVyYk1hcCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMucGVydHVyYk1hcCA6IHRoaXMuZ2VuZXJhdGVQZXJ0dXJiTWFwKG9wdGlvbnMuZHRTaXplKTtcclxuXHRcdHRoaXMucGVydHVyYk1hcC5uYW1lID0gXCJHbGl0Y2guUGVydHVyYmF0aW9uXCI7XHJcblx0XHR0aGlzLnBlcnR1cmJNYXAuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWZmZWN0IG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1vZGV9XHJcblx0XHQgKiBAZGVmYXVsdCBHbGl0Y2hNb2RlLlNQT1JBRElDXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1vZGUgPSBHbGl0Y2hNb2RlLlNQT1JBRElDO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ291bnRlciBmb3IgZ2xpdGNoIGFjdGl2YXRpb24gYW5kIGRlYWN0aXZhdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJhbmRvbSBicmVhayBwb2ludCBmb3IgdGhlIHNwb3JhZGljIGdsaXRjaCBhY3RpdmF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5icmVha1BvaW50ID0gcmFuZG9tSW50KDEyMCwgMjQwKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdGdldCBwZXJ0dXJiTWFwKCkgeyByZXR1cm4gdGhpcy50ZXh0dXJlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFzc2lnbmluZyBhIG5ldyBwZXJ0dXJiYXRpb24gbWFwIGRvZXMgbm90IGRlc3Ryb3kgdGhlIGN1cnJlbnQgb25lIVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCBwZXJ0dXJiTWFwKHgpIHtcclxuXHJcblx0XHR0aGlzLnRleHR1cmUgPSB4O1xyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50UGVydHVyYi52YWx1ZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhlIGN1cnJlbnQgcGVydHVyYmF0aW9uIG1hcCBhbmQgcmVwbGFjZXMgaXQgd2l0aCBhIG5ldyBvbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3NpemU9NjRdIC0gVGhlIHRleHR1cmUgc2l6ZS5cclxuXHQgKiBAcmV0dXJuIHtEYXRhVGV4dHVyZX0gVGhlIHBlcnR1cmJhdGlvbiB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRnZW5lcmF0ZVBlcnR1cmJNYXAoc2l6ZSA9IDY0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGl4ZWxzID0gc2l6ZSAqIHNpemU7XHJcblx0XHRjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShwaXhlbHMgKiAzKTtcclxuXHJcblx0XHRsZXQgZHQgPSB0aGlzLnBlcnR1cmJNYXA7XHJcblx0XHRsZXQgaSwgeDtcclxuXHJcblx0XHRmb3IoaSA9IDA7IGkgPCBwaXhlbHM7ICsraSkge1xyXG5cclxuXHRcdFx0eCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG5cdFx0XHRkYXRhW2kgKiAzXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAxXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAyXSA9IHg7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGR0ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRkdC5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGR0ID0gbmV3IERhdGFUZXh0dXJlKGRhdGEsIHNpemUsIHNpemUsIFJHQkZvcm1hdCwgRmxvYXRUeXBlKTtcclxuXHRcdGR0Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLnBlcnR1cmJNYXAgPSBkdDtcclxuXHJcblx0XHRyZXR1cm4gZHQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IG1vZGUgPSB0aGlzLm1vZGU7XHJcblx0XHRjb25zdCBjb3VudGVyID0gdGhpcy5jb3VudGVyO1xyXG5cdFx0Y29uc3QgYnJlYWtQb2ludCA9IHRoaXMuYnJlYWtQb2ludDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gdGhpcy5tYXRlcmlhbC51bmlmb3JtcztcclxuXHJcblx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHVuaWZvcm1zLnNlZWQudmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xyXG5cdFx0dW5pZm9ybXMuYWN0aXZlLnZhbHVlID0gdHJ1ZTtcclxuXHJcblx0XHRpZihjb3VudGVyICUgYnJlYWtQb2ludCA9PT0gMCB8fCBtb2RlID09PSBHbGl0Y2hNb2RlLkNPTlNUQU5UX1dJTEQpIHtcclxuXHJcblx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyAzMC4wO1xyXG5cdFx0XHR1bmlmb3Jtcy5hbmdsZS52YWx1ZSA9IHJhbmRvbUZsb2F0KC1NYXRoLlBJLCBNYXRoLlBJKTtcclxuXHRcdFx0dW5pZm9ybXMuc2VlZFgudmFsdWUgPSByYW5kb21GbG9hdCgtMS4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0xLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWS52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHJcblx0XHRcdHRoaXMuYnJlYWtQb2ludCA9IHJhbmRvbUludCgxMjAsIDI0MCk7XHJcblx0XHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmKGNvdW50ZXIgJSBicmVha1BvaW50IDwgYnJlYWtQb2ludCAvIDUgfHwgbW9kZSA9PT0gR2xpdGNoTW9kZS5DT05TVEFOVF9NSUxEKSB7XHJcblxyXG5cdFx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyA5MC4wO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gcmFuZG9tRmxvYXQoLU1hdGguUEksIE1hdGguUEkpO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25ZLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLnNlZWRYLnZhbHVlID0gcmFuZG9tRmxvYXQoLTAuMywgMC4zKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0wLjMsIDAuMyk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHQvLyBTcG9yYWRpYy5cclxuXHRcdFx0XHR1bmlmb3Jtcy5hY3RpdmUudmFsdWUgPSBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Kyt0aGlzLmNvdW50ZXI7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZ2xpdGNoIG1vZGUgZW51bWVyYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTUE9SQURJQyAtIFNwb3JhZGljIGdsaXRjaGVzLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ09OU1RBTlRfTUlMRCAtIENvbnN0YW50IG1pbGQgZ2xpdGNoZXMuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05TVEFOVF9XSUxEIC0gQ29uc3RhbnQgd2lsZCBnbGl0Y2hlcy5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgR2xpdGNoTW9kZSA9IHtcclxuXHJcblx0U1BPUkFESUM6IDAsXHJcblx0Q09OU1RBTlRfTUlMRDogMSxcclxuXHRDT05TVEFOVF9XSUxEOiAyXHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBDbGVhclBhc3MgfSBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IHJlbmRlcnMgYSBnaXZlbiBzY2VuZSBkaXJlY3RseSBvbiBzY3JlZW4gb3IgaW50byB0aGUgcmVhZCBidWZmZXJcclxuICogZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHJlbmRlciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgY2FtZXJhIHRvIHVzZSB0byByZW5kZXIgdGhlIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtNYXRlcmlhbH0gW29wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbD1udWxsXSAtIEFuIG92ZXJyaWRlIG1hdGVyaWFsIGZvciB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTEuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsZWFyRGVwdGg9ZmFsc2VdIC0gV2hldGhlciBkZXB0aCBzaG91bGQgYmUgY2xlYXJlZCBleHBsaWNpdGx5LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xlYXI9dHJ1ZV0gLSBXaGV0aGVyIGFsbCBidWZmZXJzIHNob3VsZCBiZSBjbGVhcmVkLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcihzY2VuZSwgY2FtZXJhLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUmVuZGVyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjbGVhciBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDbGVhclBhc3N9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyUGFzcyA9IG5ldyBDbGVhclBhc3Mob3B0aW9ucyk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbiBvdmVycmlkZSBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TWF0ZXJpYWx9XHJcblx0XHQgKiBAZGVmYXVsdCBudWxsXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm92ZXJyaWRlTWF0ZXJpYWwgPSAob3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsIDogbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBkZXB0aCBidWZmZXIgc2hvdWxkIGJlIGNsZWFyZWQgZXhwbGljaXRseS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyRGVwdGggPSAob3B0aW9ucy5jbGVhckRlcHRoICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckRlcHRoIDogZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29sb3IsIGRlcHRoIGFuZCBzdGVuY2lsIGJ1ZmZlcnMgc2hvdWxkIGJlIGNsZWFyZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogRXZlbiB3aXRoIGNsZWFyIHNldCB0byB0cnVlIHlvdSBjYW4gcHJldmVudCBzcGVjaWZpYyBidWZmZXJzIGZyb20gYmVpbmdcclxuXHRcdCAqIGNsZWFyZWQgYnkgc2V0dGluZyBlaXRoZXIgdGhlIGF1dG9DbGVhckNvbG9yLCBhdXRvQ2xlYXJTdGVuY2lsIG9yXHJcblx0XHQgKiBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlciB0byBmYWxzZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXIgPSAob3B0aW9ucy5jbGVhciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXIgOiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIHNjZW5lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHJlYWRCdWZmZXI7XHJcblxyXG5cdFx0aWYodGhpcy5jbGVhcikge1xyXG5cclxuXHRcdFx0dGhpcy5jbGVhclBhc3MucmVuZGVyKHJlbmRlcmVyLCB0YXJnZXQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZih0aGlzLmNsZWFyRGVwdGgpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh0YXJnZXQpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhckRlcHRoKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSB0aGlzLm92ZXJyaWRlTWF0ZXJpYWw7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhLCB0YXJnZXQpO1xyXG5cdFx0c2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGw7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1hc2sgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBtYXNrIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBjYW1lcmEgdG8gdXNlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhKSB7XHJcblxyXG5cdFx0c3VwZXIoc2NlbmUsIGNhbWVyYSwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIk1hc2tQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnZlcnNlIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5pbnZlcnNlID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdGVuY2lsIGJ1ZmZlciBjbGVhciBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhclN0ZW5jaWwgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBzdGVuY2lsIGJpdCBtYXNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IGNvbnRleHQgPSByZW5kZXJlci5jb250ZXh0O1xyXG5cdFx0Y29uc3Qgc3RhdGUgPSByZW5kZXJlci5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuXHJcblx0XHRjb25zdCB3cml0ZVZhbHVlID0gdGhpcy5pbnZlcnNlID8gMCA6IDE7XHJcblx0XHRjb25zdCBjbGVhclZhbHVlID0gMSAtIHdyaXRlVmFsdWU7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgdXBkYXRlIGNvbG9yIG9yIGRlcHRoLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRNYXNrKGZhbHNlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TWFzayhmYWxzZSk7XHJcblxyXG5cdFx0Ly8gTG9jayB0aGUgYnVmZmVycy5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TG9ja2VkKHRydWUpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRMb2NrZWQodHJ1ZSk7XHJcblxyXG5cdFx0Ly8gQ29uZmlndXJlIHRoZSBzdGVuY2lsLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldFRlc3QodHJ1ZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0T3AoY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UsIGNvbnRleHQuUkVQTEFDRSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkFMV0FZUywgd3JpdGVWYWx1ZSwgMHhmZmZmZmZmZik7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0Q2xlYXIoY2xlYXJWYWx1ZSk7XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHN0ZW5jaWwuXHJcblx0XHRpZih0aGlzLmNsZWFyU3RlbmNpbCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHJlYWRCdWZmZXIpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhclN0ZW5jaWwoKTtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyU3RlbmNpbCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBEcmF3IHRoZSBtYXNrIGludG8gYm90aCBidWZmZXJzLlxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlYWRCdWZmZXIpO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHdyaXRlQnVmZmVyKTtcclxuXHJcblx0XHQvLyBVbmxvY2sgdGhlIGJ1ZmZlcnMuXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldExvY2tlZChmYWxzZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldExvY2tlZChmYWxzZSk7XHJcblxyXG5cdFx0Ly8gT25seSByZW5kZXIgd2hlcmUgdGhlIHN0ZW5jaWwgaXMgc2V0IHRvIDEuXHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRPcChjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCwgY29udGV4dC5LRUVQKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2hhZGVyIHBhc3MuXHJcbiAqXHJcbiAqIFVzZWQgdG8gcmVuZGVyIGFueSBzaGFkZXIgbWF0ZXJpYWwgYXMgYSAyRCBmaWx0ZXIuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNoYWRlclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzaGFkZXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2hhZGVyTWF0ZXJpYWx9IG1hdGVyaWFsIC0gVGhlIHNoYWRlciBtYXRlcmlhbCB0byB1c2UuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IFt0ZXh0dXJlSUQ9XCJ0RGlmZnVzZVwiXSAtIFRoZSB0ZXh0dXJlIHVuaWZvcm0gaWRlbnRpZmllci5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IobWF0ZXJpYWwsIHRleHR1cmVJRCA9IFwidERpZmZ1c2VcIikge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlNoYWRlclBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc2hhZGVyIG1hdGVyaWFsIHRvIHVzZSBmb3IgcmVuZGVyaW5nLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaGFkZXJNYXRlcmlhbH1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhlIGNvbG9yIHNhbXBsZXIgdW5pZm9ybSBvZiB0aGUgZ2l2ZW4gbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqIEBkZWZhdWx0IFwidERpZmZ1c2VcIlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlSUQgPSB0ZXh0dXJlSUQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGlmKHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbdGhpcy50ZXh0dXJlSURdICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbdGhpcy50ZXh0dXJlSURdLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsLCBTaG9ja1dhdmVNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBIYWxmIFBJLlxyXG4gKlxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IEhBTEZfUEkgPSBNYXRoLlBJICogMC41O1xyXG5cclxuLyoqXHJcbiAqIEEgdmVjdG9yLlxyXG4gKlxyXG4gKiBAdHlwZSB7VmVjdG9yM31cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbi8qKlxyXG4gKiBBIHZlY3Rvci5cclxuICpcclxuICogQHR5cGUge1ZlY3RvcjN9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgYWIgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuLyoqXHJcbiAqIEEgc2hvY2sgd2F2ZSBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTaG9ja1dhdmVQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgc2hvY2sgd2F2ZSBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBtYWluIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjN9IFtlcGljZW50ZXJdIC0gVGhlIHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBzaG9jayB3YXZlIGVwaWNlbnRlci5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNwZWVkPTEuMF0gLSBUaGUgYW5pbWF0aW9uIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhSYWRpdXM9MS4wXSAtIFRoZSBleHRlbnQgb2YgdGhlIHNob2NrIHdhdmUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndhdmVTaXplPTAuMl0gLSBUaGUgd2F2ZSBzaXplLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5hbXBsaXR1ZGU9MC4wNV0gLSBUaGUgZGlzdG9ydGlvbiBhbXBsaXR1ZGUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhbWVyYSwgZXBpY2VudGVyID0gbmV3IFZlY3RvcjMoKSwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiU2hvY2tXYXZlUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBtYWluIGNhbWVyYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0M0R9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1haW5DYW1lcmEgPSBjYW1lcmE7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZXBpY2VudGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtWZWN0b3IzfVxyXG5cdFx0ICogQGV4YW1wbGUgc2hvY2tXYXZlUGFzcy5lcGljZW50ZXIgPSBteU1lc2gucG9zaXRpb247XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmVwaWNlbnRlciA9IGVwaWNlbnRlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBvYmplY3QgcG9zaXRpb24gaW4gc2NyZWVuIHNwYWNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtWZWN0b3IzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NyZWVuUG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNwZWVkIG9mIHRoZSBzaG9jayB3YXZlIGFuaW1hdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQGRlZmF1bHQgMi4wXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNwZWVkID0gKG9wdGlvbnMuc3BlZWQgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnNwZWVkIDogMi4wO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSB0aW1lIGFjY3VtdWxhdG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50aW1lID0gMC4wO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNob2NrIHdhdmUgYW5pbWF0aW9uIGlzIGFjdGl2ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBzaG9jayB3YXZlIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hvY2tXYXZlTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbCA9IG5ldyBTaG9ja1dhdmVNYXRlcmlhbChvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zLmNlbnRlci52YWx1ZSA9IHRoaXMuc2NyZWVuUG9zaXRpb247XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb3B5TWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwgPSBuZXcgQ29weU1hdGVyaWFsKCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW1pdHMgdGhlIHNob2NrIHdhdmUuXHJcblx0ICovXHJcblxyXG5cdGV4cGxvZGUoKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gMC4wO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhIC0gVGhlIHJlbmRlciBkZWx0YSB0aW1lLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSkge1xyXG5cclxuXHRcdGNvbnN0IGVwaWNlbnRlciA9IHRoaXMuZXBpY2VudGVyO1xyXG5cdFx0Y29uc3QgbWFpbkNhbWVyYSA9IHRoaXMubWFpbkNhbWVyYTtcclxuXHRcdGNvbnN0IHNjcmVlblBvc2l0aW9uID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHRjb25zdCBzaG9ja1dhdmVNYXRlcmlhbCA9IHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWw7XHJcblx0XHRjb25zdCB1bmlmb3JtcyA9IHNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cdFx0Y29uc3QgY2VudGVyID0gdW5pZm9ybXMuY2VudGVyO1xyXG5cdFx0Y29uc3QgcmFkaXVzID0gdW5pZm9ybXMucmFkaXVzO1xyXG5cdFx0Y29uc3QgbWF4UmFkaXVzID0gdW5pZm9ybXMubWF4UmFkaXVzO1xyXG5cdFx0Y29uc3Qgd2F2ZVNpemUgPSB1bmlmb3Jtcy53YXZlU2l6ZTtcclxuXHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuY29weU1hdGVyaWFsO1xyXG5cclxuXHRcdGlmKHRoaXMuYWN0aXZlKSB7XHJcblxyXG5cdFx0XHQvLyBDYWxjdWxhdGUgZGlyZWN0aW9uIHZlY3RvcnMuXHJcblx0XHRcdG1haW5DYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24odik7XHJcblx0XHRcdGFiLmNvcHkobWFpbkNhbWVyYS5wb3NpdGlvbikuc3ViKGVwaWNlbnRlcik7XHJcblxyXG5cdFx0XHQvLyBEb24ndCByZW5kZXIgdGhlIGVmZmVjdCBpZiB0aGUgb2JqZWN0IGlzIGJlaGluZCB0aGUgY2FtZXJhLlxyXG5cdFx0XHRpZih2LmFuZ2xlVG8oYWIpID4gSEFMRl9QSSkge1xyXG5cclxuXHRcdFx0XHQvLyBTY2FsZSB0aGUgZWZmZWN0IGJhc2VkIG9uIGRpc3RhbmNlIHRvIHRoZSBvYmplY3QuXHJcblx0XHRcdFx0dW5pZm9ybXMuY2FtZXJhRGlzdGFuY2UudmFsdWUgPSBtYWluQ2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oZXBpY2VudGVyKTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FsY3VsYXRlIHRoZSBzY3JlZW4gcG9zaXRpb24gb2YgdGhlIGVwaWNlbnRlci5cclxuXHRcdFx0XHRzY3JlZW5Qb3NpdGlvbi5jb3B5KGVwaWNlbnRlcikucHJvamVjdChtYWluQ2FtZXJhKTtcclxuXHRcdFx0XHRjZW50ZXIudmFsdWUueCA9IChzY3JlZW5Qb3NpdGlvbi54ICsgMS4wKSAqIDAuNTtcclxuXHRcdFx0XHRjZW50ZXIudmFsdWUueSA9IChzY3JlZW5Qb3NpdGlvbi55ICsgMS4wKSAqIDAuNTtcclxuXHJcblx0XHRcdFx0dW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHRcdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gc2hvY2tXYXZlTWF0ZXJpYWw7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBVcGRhdGUgdGhlIHNob2NrIHdhdmUgcmFkaXVzIGJhc2VkIG9uIHRpbWUuXHJcblx0XHRcdHRoaXMudGltZSArPSBkZWx0YTtcclxuXHRcdFx0cmFkaXVzLnZhbHVlID0gdGhpcy50aW1lICogdGhpcy5zcGVlZCAtIHdhdmVTaXplLnZhbHVlO1xyXG5cclxuXHRcdFx0aWYocmFkaXVzLnZhbHVlID49IChtYXhSYWRpdXMudmFsdWUgKyB3YXZlU2l6ZS52YWx1ZSkgKiAyKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zLmFzcGVjdC52YWx1ZSA9IHdpZHRoIC8gaGVpZ2h0O1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbXBpbGF0aW9uIG9mIHRoZSBwb3N0IHByb2Nlc3NpbmcgcGFzc2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL3Bhc3Nlc1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEJsb29tUGFzcyB9IGZyb20gXCIuL2Jsb29tLmpzXCI7XHJcbmV4cG9ydCB7IEJsdXJQYXNzIH0gZnJvbSBcIi4vYmx1ci5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaFBhc3MgfSBmcm9tIFwiLi9ib2tlaC5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaDJQYXNzIH0gZnJvbSBcIi4vYm9rZWgyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyUGFzcyB9IGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyTWFza1Bhc3MgfSBmcm9tIFwiLi9jbGVhci1tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IERvdFNjcmVlblBhc3MgfSBmcm9tIFwiLi9kb3Qtc2NyZWVuLmpzXCI7XHJcbmV4cG9ydCB7IERlcHRoUGFzcyB9IGZyb20gXCIuL2RlcHRoLmpzXCI7XHJcbmV4cG9ydCB7IEZpbG1QYXNzIH0gZnJvbSBcIi4vZmlsbS5qc1wiO1xyXG5leHBvcnQgeyBHbGl0Y2hNb2RlLCBHbGl0Y2hQYXNzIH0gZnJvbSBcIi4vZ2xpdGNoLmpzXCI7XHJcbmV4cG9ydCB7IEdvZFJheXNQYXNzIH0gZnJvbSBcIi4vZ29kLXJheXMuanNcIjtcclxuZXhwb3J0IHsgTWFza1Bhc3MgfSBmcm9tIFwiLi9tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcbmV4cG9ydCB7IFBpeGVsYXRpb25QYXNzIH0gZnJvbSBcIi4vcGl4ZWxhdGlvbi5qc1wiO1xyXG5leHBvcnQgeyBSZW5kZXJQYXNzIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNhdmVQYXNzIH0gZnJvbSBcIi4vc2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTaGFkZXJQYXNzIH0gZnJvbSBcIi4vc2hhZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNob2NrV2F2ZVBhc3MgfSBmcm9tIFwiLi9zaG9jay13YXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFQYXNzIH0gZnJvbSBcIi4vc21hYS5qc1wiO1xyXG5leHBvcnQgeyBUZXh0dXJlUGFzcyB9IGZyb20gXCIuL3RleHR1cmUuanNcIjtcclxuZXhwb3J0IHsgVG9uZU1hcHBpbmdQYXNzIH0gZnJvbSBcIi4vdG9uZS1tYXBwaW5nLmpzXCI7XHJcbiIsImltcG9ydCB7XHJcblx0RGVwdGhTdGVuY2lsRm9ybWF0LFxyXG5cdERlcHRoVGV4dHVyZSxcclxuXHRMaW5lYXJGaWx0ZXIsXHJcblx0UkdCQUZvcm1hdCxcclxuXHRSR0JGb3JtYXQsXHJcblx0VW5zaWduZWRJbnQyNDhUeXBlLFxyXG5cdFdlYkdMUmVuZGVyVGFyZ2V0XHJcbn0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQgeyBDbGVhck1hc2tQYXNzLCBNYXNrUGFzcywgU2hhZGVyUGFzcyB9IGZyb20gXCIuLi9wYXNzZXNcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFZmZlY3RDb21wb3NlciBtYXkgYmUgdXNlZCBpbiBwbGFjZSBvZiBhIG5vcm1hbCBXZWJHTFJlbmRlcmVyLlxyXG4gKlxyXG4gKiBUaGUgYXV0byBjbGVhciBiZWhhdmlvdXIgb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyIHdpbGwgYmUgZGlzYWJsZWQgdG8gcHJldmVudFxyXG4gKiB1bm5lY2Vzc2FyeSBjbGVhciBvcGVyYXRpb25zLlxyXG4gKlxyXG4gKiBJdCBpcyBjb21tb24gcHJhY3RpY2UgdG8gdXNlIGEge0BsaW5rIFJlbmRlclBhc3N9IGFzIHRoZSBmaXJzdCBwYXNzIHRvXHJcbiAqIGF1dG9tYXRpY2FsbHkgY2xlYXIgdGhlIHNjcmVlbiBhbmQgcmVuZGVyIHRoZSBzY2VuZSB0byBhIHRleHR1cmUgZm9yIGZ1cnRoZXJcclxuICogcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRWZmZWN0Q29tcG9zZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGVmZmVjdCBjb21wb3Nlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gW3JlbmRlcmVyXSAtIFRoZSByZW5kZXJlciB0aGF0IHNob3VsZCBiZSB1c2VkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRlcHRoQnVmZmVyPXRydWVdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIGRlcHRoIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0ZW5jaWxCdWZmZXI9ZmFsc2VdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGVwdGhUZXh0dXJlPWZhbHNlXSAtIFNldCB0byB0cnVlIGlmIG9uZSBvZiB5b3VyIHBhc3NlcyByZWxpZXMgb24gYSBkZXB0aCB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZW5kZXJlciA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlbmRlcmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFlvdSBtYXkgcmVwbGFjZSB0aGUgcmVuZGVyZXIgYXQgYW55IHRpbWUgYnkgdXNpbmdcclxuXHRcdCAqIHtAbGluayBFZmZlY3RDb21wb3NlciNyZXBsYWNlUmVuZGVyZXJ9LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlcmVyfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlYWQgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFJlYWRpbmcgZnJvbSBhbmQgd3JpdGluZyB0byB0aGUgc2FtZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBiZSBhdm9pZGVkLlxyXG5cdFx0ICogVGhlcmVmb3JlLCB0d28gc2VwZXJhdGUgeWV0IGlkZW50aWNhbCBidWZmZXJzIGFyZSB1c2VkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0aWYodGhpcy5yZW5kZXJlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoQnVmZmVyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5kZXB0aEJ1ZmZlciA6IHRydWUsXHJcblx0XHRcdFx0KG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciA6IGZhbHNlLFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoVGV4dHVyZSAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuZGVwdGhUZXh0dXJlIDogZmFsc2VcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuY2xvbmUoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgcGFzcyB1c2VkIGZvciBjb3B5aW5nIG1hc2tlZCBzY2VuZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NoYWRlclBhc3N9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5UGFzcyA9IG5ldyBTaGFkZXJQYXNzKG5ldyBDb3B5TWF0ZXJpYWwoKSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcGFzc2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtQYXNzW119XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5wYXNzZXMgPSBbXTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZGVwdGggdGV4dHVyZSBvZiB0aGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEZXB0aFRleHR1cmV9XHJcblx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgZGVwdGhUZXh0dXJlKCkgeyByZXR1cm4gdGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycyBzaGFyZSBhIHNpbmdsZSBkZXB0aCB0ZXh0dXJlLiBEZXB0aCB3aWxsIGJlXHJcblx0ICogd3JpdHRlbiB0byB0aGlzIHRleHR1cmUgd2hlbiBzb21ldGhpbmcgaXMgcmVuZGVyZWQgaW50byBvbmUgb2YgdGhlIGJ1ZmZlcnNcclxuXHQgKiBhbmQgdGhlIGludm9sdmVkIG1hdGVyaWFscyBoYXZlIGRlcHRoIHdyaXRlIGVuYWJsZWQuXHJcblx0ICpcclxuXHQgKiBZb3UgbWF5IGVuYWJsZSB0aGlzIG1lY2hhbmlzbSBkdXJpbmcgdGhlIGluc3RhbnRpYXRpb24gb2YgdGhlIGNvbXBvc2VyIG9yXHJcblx0ICogYnkgYXNzaWduaW5nIGEgRGVwdGhUZXh0dXJlIGluc3RhbmNlIGxhdGVyIG9uLiBZb3UgbWF5IGFsc28gZGlzYWJsZSBpdCBieVxyXG5cdCAqIGFzc2lnbmluZyBudWxsLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0RlcHRoVGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IGRlcHRoVGV4dHVyZSh4KSB7XHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblx0XHR0aGlzLndyaXRlQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGN1cnJlbnQgcmVuZGVyZXIgd2l0aCB0aGUgZ2l2ZW4gb25lLiBUaGUgRE9NIGVsZW1lbnQgb2YgdGhlXHJcblx0ICogY3VycmVudCByZW5kZXJlciB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgbm9kZSBhbmQgdGhlXHJcblx0ICogRE9NIGVsZW1lbnQgb2YgdGhlIG5ldyByZW5kZXJlciB3aWxsIHRha2UgaXRzIHBsYWNlLlxyXG5cdCAqXHJcblx0ICogVGhlIGF1dG8gY2xlYXIgbWVjaGFuaXNtIG9mIHRoZSBwcm92aWRlZCByZW5kZXJlciB3aWxsIGJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogU3dpdGNoaW5nIGJldHdlZW4gcmVuZGVyZXJzIGFsbG93cyB5b3UgdG8gZHluYW1pY2FsbHkgZW5hYmxlIG9yIGRpc2FibGVcclxuXHQgKiBhbnRpYWxpYXNpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIG5ldyByZW5kZXJlci5cclxuXHQgKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmVyfSBUaGUgb2xkIHJlbmRlcmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpIHtcclxuXHJcblx0XHRjb25zdCBvbGRSZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblxyXG5cdFx0bGV0IHBhcmVudCwgb2xkU2l6ZSwgbmV3U2l6ZTtcclxuXHJcblx0XHRpZihvbGRSZW5kZXJlciAhPT0gbnVsbCAmJiBvbGRSZW5kZXJlciAhPT0gcmVuZGVyZXIpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHBhcmVudCA9IG9sZFJlbmRlcmVyLmRvbUVsZW1lbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkU2l6ZSA9IG9sZFJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdFx0bmV3U2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcclxuXHJcblx0XHRcdGlmKHBhcmVudCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQob2xkUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYob2xkU2l6ZS53aWR0aCAhPT0gbmV3U2l6ZS53aWR0aCB8fCBvbGRTaXplLmhlaWdodCAhPT0gbmV3U2l6ZS5oZWlnaHQpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zZXRTaXplKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvbGRSZW5kZXJlcjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IHJlbmRlciB0YXJnZXQgYnkgcmVwbGljYXRpbmcgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqXHJcblx0ICogVGhlIGNyZWF0ZWQgcmVuZGVyIHRhcmdldCB1c2VzIGEgbGluZWFyIGZpbHRlciBmb3IgdGV4ZWwgbWluaWZpY2F0aW9uIGFuZFxyXG5cdCAqIG1hZ25pZmljYXRpb24uIEl0cyByZW5kZXIgdGV4dHVyZSBmb3JtYXQgZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSByZW5kZXJlclxyXG5cdCAqIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwuIE1pcG1hcHMgYXJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBkZXB0aEJ1ZmZlciAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBkZXB0aCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBzdGVuY2lsQnVmZmVyIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVwdGhUZXh0dXJlIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIGRlcHRoIHRleHR1cmUuXHJcblx0ICogQHJldHVybiB7V2ViR0xSZW5kZXJUYXJnZXR9IEEgbmV3IHJlbmRlciB0YXJnZXQgdGhhdCBlcXVhbHMgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqL1xyXG5cclxuXHRjcmVhdGVCdWZmZXIoZGVwdGhCdWZmZXIsIHN0ZW5jaWxCdWZmZXIsIGRlcHRoVGV4dHVyZSkge1xyXG5cclxuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHRcdGNvbnN0IGFscGhhID0gdGhpcy5yZW5kZXJlci5jb250ZXh0LmdldENvbnRleHRBdHRyaWJ1dGVzKCkuYWxwaGE7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0ID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KHNpemUud2lkdGggKiBwaXhlbFJhdGlvLCBzaXplLmhlaWdodCAqIHBpeGVsUmF0aW8sIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRmb3JtYXQ6IGFscGhhID8gUkdCQUZvcm1hdCA6IFJHQkZvcm1hdCxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGRlcHRoQnVmZmVyLFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBzdGVuY2lsQnVmZmVyLFxyXG5cdFx0XHRkZXB0aFRleHR1cmU6IGRlcHRoVGV4dHVyZSA/IG5ldyBEZXB0aFRleHR1cmUoKSA6IG51bGxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGRlcHRoVGV4dHVyZSAmJiBzdGVuY2lsQnVmZmVyKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJUYXJnZXQuZGVwdGhUZXh0dXJlLmZvcm1hdCA9IERlcHRoU3RlbmNpbEZvcm1hdDtcclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmRlcHRoVGV4dHVyZS50eXBlID0gVW5zaWduZWRJbnQyNDhUeXBlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJUYXJnZXQudGV4dHVyZS5uYW1lID0gXCJFZmZlY3RDb21wb3Nlci5CdWZmZXJcIjtcclxuXHRcdHJlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJUYXJnZXQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIHBhc3MsIG9wdGlvbmFsbHkgYXQgYSBzcGVjaWZpYyBpbmRleC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGFzc30gcGFzcyAtIEEgbmV3IHBhc3MuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtpbmRleF0gLSBBbiBpbmRleCBhdCB3aGljaCB0aGUgcGFzcyBzaG91bGQgYmUgaW5zZXJ0ZWQuXHJcblx0ICovXHJcblxyXG5cdGFkZFBhc3MocGFzcywgaW5kZXgpIHtcclxuXHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBzaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHRwYXNzLnNldFNpemUoc2l6ZS53aWR0aCAqIHBpeGVsUmF0aW8sIHNpemUuaGVpZ2h0ICogcGl4ZWxSYXRpbyk7XHJcblx0XHRwYXNzLmluaXRpYWxpc2UocmVuZGVyZXIsIHJlbmRlcmVyLmNvbnRleHQuZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbHBoYSk7XHJcblxyXG5cdFx0aWYoaW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMuc3BsaWNlKGluZGV4LCAwLCBwYXNzKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMucHVzaChwYXNzKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1Bhc3N9IHBhc3MgLSBUaGUgcGFzcy5cclxuXHQgKi9cclxuXHJcblx0cmVtb3ZlUGFzcyhwYXNzKSB7XHJcblxyXG5cdFx0dGhpcy5wYXNzZXMuc3BsaWNlKHRoaXMucGFzc2VzLmluZGV4T2YocGFzcyksIDEpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgYWxsIGVuYWJsZWQgcGFzc2VzIGluIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgYWRkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgdGltZSBiZXR3ZWVuIHRoZSBsYXN0IGZyYW1lIGFuZCB0aGUgY3VycmVudCBvbmUgaW4gc2Vjb25kcy5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBjb3B5UGFzcyA9IHRoaXMuY29weVBhc3M7XHJcblxyXG5cdFx0bGV0IHJlYWRCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXI7XHJcblx0XHRsZXQgd3JpdGVCdWZmZXIgPSB0aGlzLndyaXRlQnVmZmVyO1xyXG5cclxuXHRcdGxldCBtYXNrQWN0aXZlID0gZmFsc2U7XHJcblx0XHRsZXQgcGFzcywgY29udGV4dCwgYnVmZmVyO1xyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0Zm9yKGkgPSAwLCBsID0gcGFzc2VzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0cGFzcyA9IHBhc3Nlc1tpXTtcclxuXHJcblx0XHRcdGlmKHBhc3MuZW5hYmxlZCkge1xyXG5cclxuXHRcdFx0XHRwYXNzLnJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlKTtcclxuXHJcblx0XHRcdFx0aWYocGFzcy5uZWVkc1N3YXApIHtcclxuXHJcblx0XHRcdFx0XHRpZihtYXNrQWN0aXZlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyhjb250ZXh0Lk5PVEVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdFx0XHRcdFx0Y29weVBhc3MucmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc3RlbmNpbEZ1bmMoY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJ1ZmZlciA9IHJlYWRCdWZmZXI7XHJcblx0XHRcdFx0XHRyZWFkQnVmZmVyID0gd3JpdGVCdWZmZXI7XHJcblx0XHRcdFx0XHR3cml0ZUJ1ZmZlciA9IGJ1ZmZlcjtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihwYXNzIGluc3RhbmNlb2YgTWFza1Bhc3MpIHtcclxuXHJcblx0XHRcdFx0XHRtYXNrQWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmKHBhc3MgaW5zdGFuY2VvZiBDbGVhck1hc2tQYXNzKSB7XHJcblxyXG5cdFx0XHRcdFx0bWFza0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGJ1ZmZlcnMgYW5kIHRoZSByZW5kZXJlcidzIG91dHB1dCBjYW52YXMuXHJcblx0ICpcclxuXHQgKiBFdmVyeSBwYXNzIHdpbGwgYmUgaW5mb3JtZWQgb2YgdGhlIG5ldyBzaXplLiBJdCdzIHVwIHRvIGVhY2ggcGFzcyBob3cgdGhhdFxyXG5cdCAqIGluZm9ybWF0aW9uIGlzIHVzZWQuXHJcblx0ICpcclxuXHQgKiBJZiBubyB3aWR0aCBvciBoZWlnaHQgaXMgc3BlY2lmaWVkLCB0aGUgcmVuZGVyIHRhcmdldHMgYW5kIHBhc3NlcyB3aWxsIGJlXHJcblx0ICogdXBkYXRlZCB3aXRoIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIHJlbmRlcmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aF0gLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdIC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblxyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0aWYod2lkdGggPT09IHVuZGVmaW5lZCB8fCBoZWlnaHQgPT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0d2lkdGggPSBzaXplLndpZHRoO1xyXG5cdFx0XHRoZWlnaHQgPSBzaXplLmhlaWdodDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdHdpZHRoICo9IHBpeGVsUmF0aW87XHJcblx0XHRoZWlnaHQgKj0gcGl4ZWxSYXRpbztcclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMud3JpdGVCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHRmb3IoaSA9IDAsIGwgPSBwYXNzZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcblxyXG5cdFx0XHRwYXNzZXNbaV0uc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoaXMgY29tcG9zZXIgYnkgZGVsZXRpbmcgYWxsIHBhc3NlcyBhbmQgY3JlYXRpbmcgbmV3IGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBzZXR0aW5ncyBvZiB0aGUgcmVuZGVyZXIgd2lsbCBiZSB1c2VkLlxyXG5cdCAqL1xyXG5cclxuXHRyZXNldChyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBkZXB0aEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5kZXB0aEJ1ZmZlcjtcclxuXHRcdGNvbnN0IHN0ZW5jaWxCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuc3RlbmNpbEJ1ZmZlcjtcclxuXHRcdGNvbnN0IGRlcHRoVGV4dHVyZSA9ICh0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlICE9PSBudWxsKTtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2UoKHJlbmRlclRhcmdldCA9PT0gdW5kZWZpbmVkKSA/XHJcblx0XHRcdHRoaXMuY3JlYXRlQnVmZmVyKGRlcHRoQnVmZmVyLCBzdGVuY2lsQnVmZmVyLCBkZXB0aFRleHR1cmUpIDpcclxuXHRcdFx0cmVuZGVyVGFyZ2V0XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIGFsbCBwYXNzZXMgYW5kIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogVGhpcyBtZXRob2QgZGVhbGxvY2F0ZXMgYWxsIHJlbmRlciB0YXJnZXRzLCB0ZXh0dXJlcyBhbmQgbWF0ZXJpYWxzIGNyZWF0ZWRcclxuXHQgKiBieSB0aGUgcGFzc2VzLiBJdCBhbHNvIGRlbGV0ZXMgdGhpcyBjb21wb3NlcidzIGZyYW1lIGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBjb21wb3NlciB3aWxsIGJlY29tZSBpbm9wZXJhdGl2ZS5cclxuXHQgKi9cclxuXHJcblx0ZGlzcG9zZShyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHJcblx0XHRpZih0aGlzLnJlYWRCdWZmZXIgIT09IG51bGwgJiYgdGhpcy53cml0ZUJ1ZmZlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyLmRpc3Bvc2UoKTtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlci5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUocGFzc2VzLmxlbmd0aCA+IDApIHtcclxuXHJcblx0XHRcdHBhc3Nlcy5wb3AoKS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHJlbmRlclRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHQvLyBSZWFuaW1hdGUuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHJlbmRlclRhcmdldDtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5jbG9uZSgpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR0aGlzLmNvcHlQYXNzLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcmUgY29tcG9uZW50cy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9jb3JlXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwiLi9lZmZlY3QtY29tcG9zZXIuanNcIjtcclxuIiwiLyoqXHJcbiAqIEV4cG9zdXJlIG9mIHRoZSBsaWJyYXJ5IGNvbXBvbmVudHMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmdcclxuICovXHJcblxyXG5leHBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCIuL2NvcmVcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0Qmxvb21QYXNzLFxyXG5cdEJsdXJQYXNzLFxyXG5cdEJva2VoUGFzcyxcclxuXHRCb2tlaDJQYXNzLFxyXG5cdENsZWFyUGFzcyxcclxuXHRDbGVhck1hc2tQYXNzLFxyXG5cdERlcHRoUGFzcyxcclxuXHREb3RTY3JlZW5QYXNzLFxyXG5cdEZpbG1QYXNzLFxyXG5cdEdsaXRjaE1vZGUsXHJcblx0R2xpdGNoUGFzcyxcclxuXHRHb2RSYXlzUGFzcyxcclxuXHRNYXNrUGFzcyxcclxuXHRQYXNzLFxyXG5cdFBpeGVsYXRpb25QYXNzLFxyXG5cdFJlbmRlclBhc3MsXHJcblx0U2F2ZVBhc3MsXHJcblx0U2hhZGVyUGFzcyxcclxuXHRTaG9ja1dhdmVQYXNzLFxyXG5cdFNNQUFQYXNzLFxyXG5cdFRleHR1cmVQYXNzLFxyXG5cdFRvbmVNYXBwaW5nUGFzc1xyXG59IGZyb20gXCIuL3Bhc3Nlc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCxcclxuXHRCb2tlaE1hdGVyaWFsLFxyXG5cdEJva2VoMk1hdGVyaWFsLFxyXG5cdENvbWJpbmVNYXRlcmlhbCxcclxuXHRDb252b2x1dGlvbk1hdGVyaWFsLFxyXG5cdENvcHlNYXRlcmlhbCxcclxuXHREZXB0aE1hdGVyaWFsLFxyXG5cdERvdFNjcmVlbk1hdGVyaWFsLFxyXG5cdEZpbG1NYXRlcmlhbCxcclxuXHRHbGl0Y2hNYXRlcmlhbCxcclxuXHRHb2RSYXlzTWF0ZXJpYWwsXHJcblx0S2VybmVsU2l6ZSxcclxuXHRMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0UGl4ZWxhdGlvbk1hdGVyaWFsLFxyXG5cdFNob2NrV2F2ZU1hdGVyaWFsLFxyXG5cdFNNQUFCbGVuZE1hdGVyaWFsLFxyXG5cdFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwsXHJcblx0U01BQVdlaWdodHNNYXRlcmlhbCxcclxuXHRUb25lTWFwcGluZ01hdGVyaWFsXHJcbn0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbiIsImltcG9ydCB7XG4gIEVmZmVjdENvbXBvc2VyLFxuICBSZW5kZXJQYXNzLFxuICBTaGFkZXJQYXNzXG59IGZyb20gJ3Bvc3Rwcm9jZXNzaW5nJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG5jb25zdCBwb2x5ZmlsbCA9IChvYmplY3QsIG1ldGhvZCwgc2hvd1dhcm4gPSB0cnVlKSA9PiB7XG4gIGlmIChvYmplY3RbbWV0aG9kXSkgcmV0dXJuO1xuICBpZiAoc2hvd1dhcm4pIGNvbnNvbGUud2FybihgQFBvc3RQcm9jZXNzb3JNb2R1bGU6IHBhc3MuJHttZXRob2R9KCkgd2FzIG5vdCBmb3VuZC5gLCBvYmplY3QpO1xuICBvYmplY3RbbWV0aG9kXSA9ICgpID0+IHt9O1xufTtcblxuZXhwb3J0IGNsYXNzIFBvc3RQcm9jZXNzb3JNb2R1bGUge1xuICBjdXJyZW50UGFzcyA9IG51bGw7XG5cbiAgZGVmZXIgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBjb25zdHJ1Y3Rvcih7ZGVidWd9ID0ge2RlYnVnOiB0cnVlfSkge1xuICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdwb3N0cHJvY2Vzc29yJyk7XG5cbiAgICB0aGlzLmVmZmVjdHMgPSBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykuZWZmZWN0cztcbiAgICB0aGlzLnJlbmRlcmVyID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5zY2VuZSA9IG1hbmFnZXIuZ2V0KCdzY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgdGhpcy5jb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3Nlcih0aGlzLnJlbmRlcmVyKTtcblxuICAgIG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5zdG9wKCk7XG5cbiAgICBjb25zdCBjb21wb3NlciA9IHRoaXMuY29tcG9zZXI7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoY2xvY2sgPT4gY29tcG9zZXIucmVuZGVyKGNsb2NrLmdldERlbHRhKCkpKS5zdGFydChtYW5hZ2VyLmhhbmRsZXIpO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgcmVuZGVyZXI6IHJlbmRlcmVyID0+IHtcbiAgICAgICAgdGhpcy5jb21wb3Nlci5yZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpO1xuICAgICAgfSxcblxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcblxuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVzb2x2ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBwYXNzID0gbmV3IFJlbmRlclBhc3ModGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEubmF0aXZlKTtcblxuICAgICAgLy8gVE9ETzogU3VwcG9ydCBmb3IgZWZmZWN0cy5cblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIHBhc3MocGFzcykge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBwb2x5ZmlsbChwYXNzLCAnc2V0U2l6ZScsIHRoaXMuZGVidWcpO1xuICAgICAgcG9seWZpbGwocGFzcywgJ2luaXRpYWxpc2UnLCB0aGlzLmRlYnVnKTtcblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNoYWRlcihtYXRlcmlhbCwgdGV4dHVyZUlEID0gJ3JlYWRCdWZmZXInKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIGlmICghbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSlcbiAgICAgICAgbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSA9IHt2YWx1ZTogbnVsbH07XG5cbiAgICAgIGNvbnN0IHBhc3MgPSBuZXcgU2hhZGVyUGFzcyhtYXRlcmlhbCwgdGV4dHVyZUlEKTtcbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBQYXNzIEFQSVxuXG4gIGdldChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWVcbiAgICAgID8gdGhpcy5jb21wb3Nlci5wYXNzZXMuZmlsdGVyKHBhc3MgPT4gcGFzcy5uYW1lID09PSBuYW1lKVswXVxuICAgICAgOiB0aGlzLmN1cnJlbnRQYXNzO1xuICB9XG5cbiAgdG8obmFtZSkge1xuICAgIHRoaXMuY3VycmVudFBhc3MgPSBuYW1lO1xuICB9XG5cbiAgcmVuZGVyVG9TY3JlZW4oYm9vbCA9IHRydWUpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFzcy5yZW5kZXJUb1NjcmVlbiA9IGJvb2w7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5hbWUobmFtZSkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzLm5hbWUgPSBuYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFdmVudHNQYXRjaE1vZHVsZSB7XG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdldmVudHMnKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICB9XG5cbiAgcGF0Y2hFdmVudHMob3JpZ2luT2JqZWN0LCBkZXN0T2JqZWN0LCBldmVudHMgPSBbXSkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICBvcmlnaW5PYmplY3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZSA9PiBkZXN0T2JqZWN0LmVtaXQoZXZlbnQsIGUpKVxuICAgICk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHtlbGVtZW50LCBwYXRjaEV2ZW50c30gPSBzZWxmO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ21vdXNlbW92ZScsXG4gICAgICAnbW91c2V1cCcsXG4gICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgJ21vdXNlZG93bicsXG4gICAgICAnY2xpY2snLFxuICAgICAgJ3doZWVsJyxcbiAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICd0b3VjaGVuZCcsXG4gICAgICAndG91Y2htb3ZlJyxcbiAgICAgICdrZXlkb3duJ1xuICAgIF0pO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ2tleWRvd24nLFxuICAgICAgJ2tleXVwJyxcbiAgICAgICdrZXlwcmVzcydcbiAgICBdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgVmVjdG9yMixcbiAgUmF5Y2FzdGVyLFxuICBQbGFuZSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG4vKipcbiAqIEBjbGFzcyBWaXJ0dWFsTW91c2VNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtCb29sZWFufSBbZ2xvYmFsTW92ZW1lbnQ9ZmFsc2VdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXh0ZW5kcyBFdmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFZpcnR1YWxNb3VzZU1vZHVsZSBleHRlbmRzIEV2ZW50cyB7XG4gIG1vdXNlID0gbmV3IFZlY3RvcjIoKTtcbiAgcmF5Y2FzdGVyID0gbmV3IFJheWNhc3RlcigpO1xuICB3b3JsZCA9IG51bGw7XG4gIGNhbnZhcyA9IG51bGw7XG4gIHByb2plY3Rpb25QbGFuZSA9IG5ldyBQbGFuZShuZXcgVmVjdG9yMygwLCAwLCAxKSwgMCk7XG5cbiAgY29uc3RydWN0b3IoZ2xvYmFsTW92ZW1lbnQgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5nbG9iYWxNb3ZlbWVudCA9IGdsb2JhbE1vdmVtZW50O1xuICB9XG5cbiAgdXBkYXRlKGUsIGN1c3RvbVgsIGN1c3RvbVkpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCB4ID0gY3VzdG9tWCB8fCBlLmNsaWVudFg7XG4gICAgY29uc3QgeSA9IGN1c3RvbVkgfHwgZS5jbGllbnRZO1xuXG4gICAgdGhpcy5tb3VzZS54ID0gKCh4IC0gcmVjdC5sZWZ0KSAvIChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSkgKiAyIC0gMTtcbiAgICB0aGlzLm1vdXNlLnkgPSAtKCh5IC0gcmVjdC50b3ApIC8gKHJlY3QuYm90dG9tIC0gcmVjdC50b3ApKSAqIDIgKyAxO1xuXG4gICAgdGhpcy5wcm9qZWN0aW9uUGxhbmUubm9ybWFsLmNvcHkodGhpcy5jYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24oKSk7XG5cbiAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKHRoaXMubW91c2UsIHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLmVtaXQoJ21vdmUnKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdtb3VzZScpO1xuICAgIG1hbmFnZXIucmVxdWlyZSgnZXZlbnRzJywgKCkgPT4gbmV3IEV2ZW50c1BhdGNoTW9kdWxlKCkpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgW1xuICAgICAgJ2NsaWNrJyxcbiAgICAgICdtb3VzZWRvd24nLFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgJ21vdXNlbW92ZSdcbiAgICBdLmZvckVhY2goZXYgPT4gdGhpcy5vbihldiwgZSA9PiBzZWxmLmVtaXQoZXYsIGUpKSk7XG5cbiAgICBzZWxmLmdsb2JhbFggPSAwO1xuICAgIHNlbGYuZ2xvYmFsWSA9IDA7XG5cbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2VsZi5nbG9iYWxYICs9IGUubW92ZW1lbnRYO1xuICAgICAgICBzZWxmLmdsb2JhbFkgKz0gZS5tb3ZlbWVudFk7XG5cbiAgICAgICAgc2VsZi51cGRhdGUoZSwgc2VsZi5nbG9iYWxYLCBzZWxmLmdsb2JhbFkpO1xuICAgICAgfSBlbHNlIHNlbGYudXBkYXRlKGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdHJhY2soY29tcG9uZW50LCBuZXN0ZWQgPSB0cnVlKSB7XG4gICAgbGV0IGlzSG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5vbignbW92ZScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhvdmVycyhjb21wb25lbnQsIG5lc3RlZCkpIHtcbiAgICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNlbW92ZScpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb21wb25lbnQuZW1pdCgnbW91c2VvdmVyJyk7XG4gICAgICAgICAgaXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0hvdmVyZWQpIHtcbiAgICAgICAgY29tcG9uZW50LmVtaXQoJ21vdXNlb3V0Jyk7XG4gICAgICAgIGlzSG92ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnY2xpY2snKTtcbiAgICAgIGVsc2UgY29tcG9uZW50LmVtaXQoJ29mZkNsaWNrJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2Vkb3duJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNldXAnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbih7bmF0aXZlfSwgbmVzdGVkID0gdHJ1ZSkge1xuICAgIGlmIChuYXRpdmUuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiBuZXN0ZWQpIHtcbiAgICAgIGNvbnN0IG9iamVjdHMgPSBbXTtcbiAgICAgIG5hdGl2ZS50cmF2ZXJzZShjaGlsZCA9PiBvYmplY3RzLnB1c2goY2hpbGQpKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMob2JqZWN0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdChuYXRpdmUpO1xuICB9XG5cbiAgcHJvamVjdChwbGFuZSA9IHRoaXMucHJvamVjdGlvblBsYW5lKSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RQbGFuZShwbGFuZSk7XG4gIH1cblxuICBob3ZlcnMoY29tcG9uZW50LCBuZXN0ZWQgPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9uKGNvbXBvbmVudCwgbmVzdGVkKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIucmF5O1xuICB9XG5cbiAgZ2V0IHgoKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2UueDtcbiAgfVxuXG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlLnk7XG4gIH1cbn1cbiIsImltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xuICBzdGF0aWMgZnJvbShjb250cm9scykge1xuICAgIHJldHVybiBuZXcgQ29udHJvbHNNb2R1bGUoe2NvbnRyb2xzfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICBmaXg6IGNvbnRyb2xzID0+IGNvbnRyb2xzLFxuXG4gICAgICB1cGRhdGUoYykge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgfVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5wYXJhbXMuY29udHJvbHM7XG4gICAgdGhpcy51cGRhdGUgPSB0aGlzLnBhcmFtcy51cGRhdGU7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnJlcXVpcmUoJ2V2ZW50cycsICgpID0+IG5ldyBFdmVudHNQYXRjaE1vZHVsZSgpKTtcbiAgfVxuXG4gIHNldENvbnRyb2xzKGNvbnRyb2xzKSB7XG4gICAgdGhpcy5jb250cm9scyA9IGNvbnRyb2xzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VXBkYXRlKHVwZGF0ZSkge1xuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLnVwZGF0ZUxvb3AgPSBuZXcgTG9vcChzZWxmLnVwZGF0ZS5iaW5kKHNlbGYpKTtcbiAgICBzZWxmLnVwZGF0ZUxvb3Auc3RhcnQodGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEZvZ0V4cDIsXG4gIEZvZ1xufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIEZvZ01vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17Y29sb3I6IDB4ZWZkMWI1LCBkZW5zaXR5OiAwLjAyMCwgbmVhcjogMTAsIGZhcjogMTAwMH1dIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlPWV4cDJdIC0gVGhlIHR5cGUgb2YgZm9nIC0gZXhwMiBvciBsaW5lYXJcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkhvdyB0byBjcmVhdGUgYW5kIGFwcGx5IGEgRm9nTW9kdWxlPC9jYXB0aW9uPlxuICogY29uc3QgZm9nTW9kdWxlID0gbmV3IEZvZ01vZHVsZSh7XG4gKiAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICBkZW5zaXR5OiAwLjAzLFxuICogICAgbmVhcjogMjAsXG4gKiAgICBmYXI6IDIwMFxuICogIH0sICdleHAyJyk7XG4gKlxuICogbmV3IEFwcChbXG4gKiAgLi4uLFxuICogIGZvZ01vZHVsZVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBGb2dNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgdHlwZSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb2xvcjogMHhlZmQxYjUsXG4gICAgICBkZW5zaXR5OiAwLjAyMCxcbiAgICAgIG5lYXI6IDEwLFxuICAgICAgZmFyOiAxMDAwXG4gICAgfSwgcGFyYW1zKTtcbiAgICBpZiAoIXR5cGUgfHwgdHlwZSA9PT0gJ2V4cDInKSB0aGlzLmZvZyA9IG5ldyBGb2dFeHAyKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5kZW5zaXR5KTtcbiAgICBlbHNlIGlmICh0eXBlID09PSAnbGluZWFyJykgdGhpcy5mb2cgPSBuZXcgRm9nKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5uZWFyLCB0aGlzLnBhcmFtcy5mYXIpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2ZvZycsIHRoaXMuZm9nKTtcbiAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKS5mb2cgPSB0aGlzLmZvZztcbiAgfVxufVxuIiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuXG5jb25zdCBpc0VxdWFsRGVmYXVsdCA9IChhLCBiKSA9PiB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgZWxzZSBpZiAoYSAmJiBhLmVxdWFscyAmJiBhLmVxdWFscyhiKSkgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBAY2xhc3MgU3RhdGVNb2R1bGVcbiAqIEBkZXNjcmlwdGlvbiBgU3RhdGVNb2R1bGVgIGlzIHVzZWZ1bCBmb3IgYXBwcywgd2hlcmUgeW91IG5lZWQgc3RhdGUgbWFuaXB1bGF0aW9uLlxuICogVGhpcyBjYW4gYmU6IF90cmFuc2l0aW9ucyBiZXR3ZWVuIHNjcmVlbnMsIGdhbWVzLCBkZXZlbG9wbWVudCBtb21lbnRzXy5cbiAqIFlvdSBjYW4gY2hlY2sgW2Jhc2ljL3N0YXRlXShodHRwczovL3docy1kZXYuc3VyZ2Uuc2gvZXhhbXBsZXMvP2Jhc2ljL3N0YXRlKSBleGFtcGxlLlxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIHN0YXRlIG1vZHVsZTwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICAvLyAuLi5cbiAqICAgbmV3IFN0YXRlTW9kdWxlKCkuZGVmYXVsdCh7XG4gKiAgICAgc3BoZXJlQ29sb3I6IDB4ZmYwMDAwXG4gKiAgIH0pXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlTW9kdWxlIHtcbiAgc3RhdGljIGFjdGlvbkdlbmVyYXRlKGlzRXF1YWwpIHtcbiAgICByZXR1cm4gKHN0YXRlID0gW3t9LCAnJ10sIHtrZXksIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoaXNFcXVhbChzdGF0ZVswXVtrZXldLCBkYXRhKSkgcmV0dXJuIHN0YXRlO1xuXG4gICAgICBzdGF0ZVswXVtrZXldID0gZGF0YTtcbiAgICAgIHN0YXRlWzFdID0ga2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVxdWFsQ2hlY2sgPSBpc0VxdWFsRGVmYXVsdCkge1xuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAgIFN0YXRlTW9kdWxlLmFjdGlvbkdlbmVyYXRlKGVxdWFsQ2hlY2spXG4gICAgKTtcblxuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHt9O1xuICAgIHRoaXMuY3VycmVudENvbmZpZyA9ICdkZWZhdWx0JztcbiAgICB0aGlzLnByZXZDb25maWcgPSAnZGVmYXVsdCc7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZhdWx0XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHNldHVwXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogbmV3IFdIUy5TdGF0ZU1vZHVsZSgpLmRlZmF1bHQoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiBVVElMUy4kY29sb3JzLm1lc2gsXG4gICAqICAgcGxhbmVDb2xvcjogMHg0NDdGOEJcbiAgICogfSlcbiAgICovXG4gIGRlZmF1bHQoZGF0YSkge1xuICAgIHRoaXMuY29uZmlnKHtkZWZhdWx0OiBkYXRhfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRFcXVhbENoZWNrXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIGFuIGVxdWFsQ2hlY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBzZXR1cFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBzZXRFcXVhbENoZWNrKGZ1bmMpIHtcbiAgICB0aGlzLnN0b3JlLnJlcGxhY2VSZWR1Y2VyKFxuICAgICAgU3RhdGVNb2R1bGUuYWN0aW9uR2VuZXJhdGUoZnVuYylcbiAgICApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3N0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb25maWdcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgY29uZmlndXJhdGlvbnMgZnJvbSBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdzIENvbmZpZ3VyYXRpb24gZGF0YVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBBZGRpbmcgYGdyZWVuYCBjb25maWd1cmF0aW9uPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS5jb25maWcoe1xuICAgKiAgIGdyZWVuOiB7XG4gICAqICAgICBzcGhlcmVDb2xvcjogMHgwMGZmMDAsXG4gICAqICAgICBwbGFuZUNvbG9yOiAweDAwZmYwMFxuICAgKiAgIH1cbiAgICogfSk7XG4gICAqL1xuICBjb25maWcoY29uZmlncykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ3MpIHtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uW2tleV0gPSBrZXkgPT09ICdkZWZhdWx0J1xuICAgICAgICAgID8gY29uZmlnc1trZXldXG4gICAgICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3VyYXRpb24uZGVmYXVsdCwgY29uZmlnc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgdXBkYXRlcyBmcm9tIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZXMgVXBkYXRlcyBkYXRhXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IFVwZGF0ZSBjYWxsYmFjayBmb3IgYHNwaGVyZUNvbG9yYDwvY2FwdGlvbj5cbiAgICogc3RhdGUudXBkYXRlKHtcbiAgICogICBzcGhlcmVDb2xvcjogY29sb3IgPT4gc3BoZXJlLm1hdGVyaWFsLmNvbG9yLnNldEhleChjb2xvcilcbiAgICogfSk7XG4gICAqL1xuICB1cGRhdGUodXBkYXRlcyA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB1cGRhdGVzW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdG9cbiAgICogQGRlc2NyaXB0aW9uIFN3aXRjaCB0byBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnTmFtZSBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IENoYW5nZXMgY29uZmlndXJhdGlvbiB0byBgZ3JlZW5gPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS50bygnZ3JlZW4nKTtcbiAgICovXG4gIHRvKGNvbmZpZ05hbWUpIHtcbiAgICB0aGlzLnByZXZDb25maWcgPSB0aGlzLmN1cnJlbnRDb25maWc7XG4gICAgdGhpcy5jdXJyZW50Q29uZmlnID0gY29uZmlnTmFtZTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgPyB0aGlzLmNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgIDogdGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHQ7XG5cbiAgICB0aGlzLnNldChjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgY3VycmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogc3RhdGUuc2V0KHtcbiAgICogICBzcGhlcmVDb2xvcjogMHgwMGZmMDBcbiAgICogfSk7XG4gICAqL1xuICBzZXQoZGF0YSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpXG4gICAgICBpZiAoa2V5KSB0aGlzLnN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnQUREJywga2V5LCBkYXRhOiBkYXRhW2tleV19KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGRhdGEgb2YgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFBhcmFtZXRlciBuYW1lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIHN0YXRlLmdldCgnc3BoZXJlQ29sb3InKTsgLy8gMHgwMGZmMDBcbiAgICovXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwcmV2XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIHByZXZpb3VzIGNvbmZpZ3VyYXRpb24sIGluIG90aGVyIGNhc2UgLSByZXR1cm4gYGZhbHNlVmFsYC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZyBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7QW55fSB0cnVlVmFsIFZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyB0cnV0aHkuXG4gICAqIEBwYXJhbSB7QW55fSBmYWxzZVZhbCBDVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIGZhbHN5LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBwcmV2KGNvbmZpZywgdHJ1ZVZhbCwgZmFsc2VWYWwpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2Q29uZmlnID09PSBjb25maWcgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjdXJyZW50XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIGN1cnJlbnQgY29uZmlndXJhdGlvbiwgaW4gb3RoZXIgY2FzZSAtIHJldHVybiBgZmFsc2VWYWxgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQHBhcmFtIHtBbnl9IHRydWVWYWwgVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIHRydXRoeS5cbiAgICogQHBhcmFtIHtBbnl9IGZhbHNlVmFsIENWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgZmFsc3kuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIGN1cnJlbnQoY29uZmlnLCB0cnVlVmFsLCBmYWxzZVZhbCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDb25maWcgPT09IGNvbmZpZyA/IHRydWVWYWwgOiBmYWxzZVZhbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTU9VU0UsXG4gIFF1YXRlcm5pb24sXG4gIFNwaGVyaWNhbCxcbiAgVmVjdG9yMixcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIE9ydGhvZ3JhcGhpY0NhbWVyYSxcbiAgRXZlbnREaXNwYXRjaGVyLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuLy8gVGhpcyBzZXQgb2YgY29udHJvbHMgcGVyZm9ybXMgb3JiaXRpbmcsIGRvbGx5aW5nICh6b29taW5nKSwgYW5kIHBhbm5pbmcuXG4vLyBVbmxpa2UgVHJhY2tiYWxsQ29udHJvbHMsIGl0IG1haW50YWlucyB0aGUgXCJ1cFwiIGRpcmVjdGlvbiBvYmplY3QudXAgKCtZIGJ5IGRlZmF1bHQpLlxuLy9cbi8vICAgIE9yYml0IC0gbGVmdCBtb3VzZSAvIHRvdWNoOiBvbmUgZmluZ2VyIG1vdmVcbi8vICAgIFpvb20gLSBtaWRkbGUgbW91c2UsIG9yIG1vdXNld2hlZWwgLyB0b3VjaDogdHdvIGZpbmdlciBzcHJlYWQgb3Igc3F1aXNoXG4vLyAgICBQYW4gLSByaWdodCBtb3VzZSwgb3IgYXJyb3cga2V5cyAvIHRvdWNoOiB0aHJlZSBmaW50ZXIgc3dpcGVcblxuZXhwb3J0IGNsYXNzIFRocmVlT3JiaXRDb250cm9scyBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCwgZG9tRWxlbWVudCwgZXZlbnRIYW5kbGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gKGRvbUVsZW1lbnQgPT09IHVuZGVmaW5lZCkgPyBkb2N1bWVudCA6IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBldmVudEhhbmRsZXI7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGNvbnRyb2xcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLy8gXCJ0YXJnZXRcIiBzZXRzIHRoZSBsb2NhdGlvbiBvZiBmb2N1cywgd2hlcmUgdGhlIG9iamVjdCBvcmJpdHMgYXJvdW5kXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIGRvbGx5IGluIGFuZCBvdXQgKCBQZXJzcGVjdGl2ZUNhbWVyYSBvbmx5IClcbiAgICB0aGlzLm1pbkRpc3RhbmNlID0gMDtcbiAgICB0aGlzLm1heERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gem9vbSBpbiBhbmQgb3V0ICggT3J0aG9ncmFwaGljQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluWm9vbSA9IDA7XG4gICAgdGhpcy5tYXhab29tID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgdmVydGljYWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBSYW5nZSBpcyAwIHRvIE1hdGguUEkgcmFkaWFucy5cbiAgICB0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IGhvcml6b250YWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBJZiBzZXQsIG11c3QgYmUgYSBzdWItaW50ZXJ2YWwgb2YgdGhlIGludGVydmFsIFsgLSBNYXRoLlBJLCBNYXRoLlBJIF0uXG4gICAgdGhpcy5taW5BemltdXRoQW5nbGUgPSAtSW5maW5pdHk7IC8vIHJhZGlhbnNcbiAgICB0aGlzLm1heEF6aW11dGhBbmdsZSA9IEluZmluaXR5OyAvLyByYWRpYW5zXG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBlbmFibGUgZGFtcGluZyAoaW5lcnRpYSlcbiAgICAvLyBJZiBkYW1waW5nIGlzIGVuYWJsZWQsIHlvdSBtdXN0IGNhbGwgY29udHJvbHMudXBkYXRlKCkgaW4geW91ciBhbmltYXRpb24gbG9vcFxuICAgIHRoaXMuZW5hYmxlRGFtcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZGFtcGluZ0ZhY3RvciA9IDAuMjU7XG5cbiAgICAvLyBUaGlzIG9wdGlvbiBhY3R1YWxseSBlbmFibGVzIGRvbGx5aW5nIGluIGFuZCBvdXQ7IGxlZnQgYXMgXCJ6b29tXCIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHpvb21pbmdcbiAgICB0aGlzLmVuYWJsZVpvb20gPSB0cnVlO1xuICAgIHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcm90YXRpbmdcbiAgICB0aGlzLmVuYWJsZVJvdGF0ZSA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHBhbm5pbmdcbiAgICB0aGlzLmVuYWJsZVBhbiA9IHRydWU7XG4gICAgdGhpcy5rZXlQYW5TcGVlZCA9IDcuMDsgLy8gcGl4ZWxzIG1vdmVkIHBlciBhcnJvdyBrZXkgcHVzaFxuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gYXV0b21hdGljYWxseSByb3RhdGUgYXJvdW5kIHRoZSB0YXJnZXRcbiAgICAvLyBJZiBhdXRvLXJvdGF0ZSBpcyBlbmFibGVkLCB5b3UgbXVzdCBjYWxsIGNvbnRyb2xzLnVwZGF0ZSgpIGluIHlvdXIgYW5pbWF0aW9uIGxvb3BcbiAgICB0aGlzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9Sb3RhdGVTcGVlZCA9IDIuMDsgLy8gMzAgc2Vjb25kcyBwZXIgcm91bmQgd2hlbiBmcHMgaXMgNjBcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHVzZSBvZiB0aGUga2V5c1xuICAgIHRoaXMuZW5hYmxlS2V5cyA9IHRydWU7XG5cbiAgICAvLyBUaGUgZm91ciBhcnJvdyBrZXlzXG4gICAgdGhpcy5rZXlzID0ge0xFRlQ6IDM3LCBVUDogMzgsIFJJR0hUOiAzOSwgQk9UVE9NOiA0MH07XG5cbiAgICAvLyBNb3VzZSBidXR0b25zXG4gICAgdGhpcy5tb3VzZUJ1dHRvbnMgPSB7T1JCSVQ6IE1PVVNFLkxFRlQsIFpPT006IE1PVVNFLk1JRERMRSwgUEFOOiBNT1VTRS5SSUdIVH07XG5cbiAgICAvLyBmb3IgcmVzZXRcbiAgICB0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLnpvb20wID0gdGhpcy5vYmplY3Quem9vbTtcblxuICAgIC8vXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvL1xuXG4gICAgdGhpcy5nZXRQb2xhckFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC5waGk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QXppbXV0aGFsQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gc3BoZXJpY2FsLnRoZXRhO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy50YXJnZXQuY29weSh0aGlzLnRhcmdldDApO1xuICAgICAgdGhpcy5vYmplY3QucG9zaXRpb24uY29weSh0aGlzLnBvc2l0aW9uMCk7XG4gICAgICB0aGlzLm9iamVjdC56b29tID0gdGhpcy56b29tMDtcblxuICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICAvLyB0aGlzIG1ldGhvZCBpcyBleHBvc2VkLCBidXQgcGVyaGFwcyBpdCB3b3VsZCBiZSBiZXR0ZXIgaWYgd2UgY2FuIG1ha2UgaXQgcHJpdmF0ZS4uLlxuICAgIHRoaXMudXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgLy8gc28gY2FtZXJhLnVwIGlzIHRoZSBvcmJpdCBheGlzXG4gICAgICBjb25zdCBxdWF0ID0gbmV3IFF1YXRlcm5pb24oKS5zZXRGcm9tVW5pdFZlY3RvcnMob2JqZWN0LnVwLCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XG4gICAgICBjb25zdCBxdWF0SW52ZXJzZSA9IHF1YXQuY2xvbmUoKS5pbnZlcnNlKCk7XG5cbiAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XG4gICAgICBjb25zdCBsYXN0UXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG5cbiAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG4gICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO1xuXG4gICAgICAgIC8vIHJvdGF0ZSBvZmZzZXQgdG8gXCJ5LWF4aXMtaXMtdXBcIiBzcGFjZVxuICAgICAgICBvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKHF1YXQpO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20gei1heGlzIGFyb3VuZCB5LWF4aXNcbiAgICAgICAgc3BoZXJpY2FsLnNldEZyb21WZWN0b3IzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1JvdGF0ZSAmJiBzdGF0ZSA9PT0gU1RBVEUuTk9ORSlcbiAgICAgICAgICByb3RhdGVMZWZ0KGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC50aGV0YSArPSBzcGhlcmljYWxEZWx0YS50aGV0YTtcbiAgICAgICAgc3BoZXJpY2FsLnBoaSArPSBzcGhlcmljYWxEZWx0YS5waGk7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgdGhldGEgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwudGhldGEgPSBNYXRoLm1heCh0aGlzLm1pbkF6aW11dGhBbmdsZSwgTWF0aC5taW4odGhpcy5tYXhBemltdXRoQW5nbGUsIHNwaGVyaWNhbC50aGV0YSkpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC5waGkgPSBNYXRoLm1heCh0aGlzLm1pblBvbGFyQW5nbGUsIE1hdGgubWluKHRoaXMubWF4UG9sYXJBbmdsZSwgc3BoZXJpY2FsLnBoaSkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5tYWtlU2FmZSgpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5yYWRpdXMgKj0gc2NhbGU7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgcmFkaXVzIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnJhZGl1cyA9IE1hdGgubWF4KHRoaXMubWluRGlzdGFuY2UsIE1hdGgubWluKHRoaXMubWF4RGlzdGFuY2UsIHNwaGVyaWNhbC5yYWRpdXMpKTtcblxuICAgICAgICAvLyBtb3ZlIHRhcmdldCB0byBwYW5uZWQgbG9jYXRpb25cbiAgICAgICAgdGhpcy50YXJnZXQuYWRkKHBhbk9mZnNldCk7XG5cbiAgICAgICAgb2Zmc2V0LnNldEZyb21TcGhlcmljYWwoc3BoZXJpY2FsKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0SW52ZXJzZSk7XG5cbiAgICAgICAgcG9zaXRpb24uY29weSh0aGlzLnRhcmdldCkuYWRkKG9mZnNldCk7XG5cbiAgICAgICAgdGhpcy5vYmplY3QubG9va0F0KHRoaXMudGFyZ2V0KTtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVEYW1waW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgKj0gKDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAqPSAoMSAtIHRoaXMuZGFtcGluZ0ZhY3Rvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnNldCgwLCAwLCAwKTtcblxuICAgICAgICBzY2FsZSA9IDE7XG4gICAgICAgIHBhbk9mZnNldC5zZXQoMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGNvbmRpdGlvbiBpczpcbiAgICAgICAgLy8gbWluKGNhbWVyYSBkaXNwbGFjZW1lbnQsIGNhbWVyYSByb3RhdGlvbiBpbiByYWRpYW5zKV4yID4gRVBTXG4gICAgICAgIC8vIHVzaW5nIHNtYWxsLWFuZ2xlIGFwcHJveGltYXRpb24gY29zKHgvMikgPSAxIC0geF4yIC8gOFxuXG4gICAgICAgIGlmICh6b29tQ2hhbmdlZFxuICAgICAgICAgIHx8IGxhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZCh0aGlzLm9iamVjdC5wb3NpdGlvbikgPiBFUFNcbiAgICAgICAgICB8fCA4ICogKDEgLSBsYXN0UXVhdGVybmlvbi5kb3QodGhpcy5vYmplY3QucXVhdGVybmlvbikpID4gRVBTKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgICAgIGxhc3RQb3NpdGlvbi5jb3B5KHRoaXMub2JqZWN0LnBvc2l0aW9uKTtcbiAgICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pO1xuICAgICAgICAgIHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcblxuICAgICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNwb3NlJyB9ICk7IC8vIHNob3VsZCB0aGlzIGJlIGFkZGVkIGhlcmU/XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gaW50ZXJuYWxzXG4gICAgLy9cblxuICAgIGNvbnN0IGNoYW5nZUV2ZW50ID0ge3R5cGU6ICdjaGFuZ2UnfTtcbiAgICBjb25zdCBzdGFydEV2ZW50ID0ge3R5cGU6ICdzdGFydCd9O1xuICAgIGNvbnN0IGVuZEV2ZW50ID0ge3R5cGU6ICdlbmQnfTtcblxuICAgIGNvbnN0IFNUQVRFID0ge05PTkU6IC0xLCBST1RBVEU6IDAsIERPTExZOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfRE9MTFk6IDQsIFRPVUNIX1BBTjogNX07XG5cbiAgICBsZXQgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgY29uc3QgRVBTID0gMC4wMDAwMDE7XG5cbiAgICAvLyBjdXJyZW50IHBvc2l0aW9uIGluIHNwaGVyaWNhbCBjb29yZGluYXRlc1xuICAgIGNvbnN0IHNwaGVyaWNhbCA9IG5ldyBTcGhlcmljYWwoKTtcbiAgICBjb25zdCBzcGhlcmljYWxEZWx0YSA9IG5ldyBTcGhlcmljYWwoKTtcblxuICAgIGxldCBzY2FsZSA9IDE7XG4gICAgY29uc3QgcGFuT2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcbiAgICBsZXQgem9vbUNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJvdGF0ZVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IHBhblN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5FbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbkRlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGRvbGx5U3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBkb2xseURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGdldEF1dG9Sb3RhdGlvbkFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC8gNjAgLyA2MCAqIHRoaXMuYXV0b1JvdGF0ZVNwZWVkO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRab29tU2NhbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coMC45NSwgdGhpcy56b29tU3BlZWQpO1xuICAgIH07XG5cbiAgICBjb25zdCByb3RhdGVMZWZ0ID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgLT0gYW5nbGU7XG4gICAgfTtcblxuICAgIGNvbnN0IHJvdGF0ZVVwID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEucGhpIC09IGFuZ2xlO1xuICAgIH07XG5cbiAgICBjb25zdCBwYW5MZWZ0ID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRpc3RhbmNlLCBvYmplY3RNYXRyaXgpID0+IHtcbiAgICAgICAgdi5zZXRGcm9tTWF0cml4Q29sdW1uKG9iamVjdE1hdHJpeCwgMCk7IC8vIGdldCBYIGNvbHVtbiBvZiBvYmplY3RNYXRyaXhcbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcigtZGlzdGFuY2UpO1xuICAgICAgICBwYW5PZmZzZXQuYWRkKHYpO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcGFuVXAgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGlzdGFuY2UsIG9iamVjdE1hdHJpeCkgPT4ge1xuICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAxKTsgLy8gZ2V0IFkgY29sdW1uIG9mIG9iamVjdE1hdHJpeFxuICAgICAgICB2Lm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8vIGRlbHRhWCBhbmQgZGVsdGFZIGFyZSBpbiBwaXhlbHM7IHJpZ2h0IGFuZCBkb3duIGFyZSBwb3NpdGl2ZVxuICAgIGNvbnN0IHBhbiA9ICgoKSA9PiB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRlbHRhWCwgZGVsdGFZKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICAgICAgICAvLyBwZXJzcGVjdGl2ZVxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XG4gICAgICAgICAgb2Zmc2V0LmNvcHkocG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCk7XG4gICAgICAgICAgbGV0IHRhcmdldERpc3RhbmNlID0gb2Zmc2V0Lmxlbmd0aCgpO1xuXG4gICAgICAgICAgLy8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXG4gICAgICAgICAgdGFyZ2V0RGlzdGFuY2UgKj0gTWF0aC50YW4oKHRoaXMub2JqZWN0LmZvdiAvIDIpICogTWF0aC5QSSAvIDE4MC4wKTtcblxuICAgICAgICAgIC8vIHdlIGFjdHVhbGx5IGRvbid0IHVzZSBzY3JlZW5XaWR0aCwgc2luY2UgcGVyc3BlY3RpdmUgY2FtZXJhIGlzIGZpeGVkIHRvIHNjcmVlbiBoZWlnaHRcbiAgICAgICAgICBwYW5MZWZ0KDIgKiBkZWx0YVggKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKDIgKiBkZWx0YVkgKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gb3J0aG9ncmFwaGljXG4gICAgICAgICAgcGFuTGVmdChkZWx0YVggKiAodGhpcy5vYmplY3QucmlnaHQgLSB0aGlzLm9iamVjdC5sZWZ0KSAvIHRoaXMub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudFdpZHRoLCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKGRlbHRhWSAqICh0aGlzLm9iamVjdC50b3AgLSB0aGlzLm9iamVjdC5ib3R0b20pIC8gdGhpcy5vYmplY3Quem9vbSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNhbWVyYSBuZWl0aGVyIG9ydGhvZ3JhcGhpYyBub3IgcGVyc3BlY3RpdmVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIHBhbiBkaXNhYmxlZC4nKTtcbiAgICAgICAgICB0aGlzLmVuYWJsZVBhbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBkb2xseUluID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgLz0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tICogZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGRvbGx5T3V0ID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgKj0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tIC8gZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gZXZlbnQgY2FsbGJhY2tzIC0gdXBkYXRlIHRoZSBvYmplY3Qgc3RhdGVcbiAgICAvL1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25Sb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93bkRvbGx5JyApO1xuXG4gICAgICBkb2xseVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25QYW4nICk7XG5cbiAgICAgIHBhblN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQpO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXG4gICAgICByb3RhdGVMZWZ0KDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgLy8gcm90YXRpbmcgdXAgYW5kIGRvd24gYWxvbmcgd2hvbGUgc2NyZWVuIGF0dGVtcHRzIHRvIGdvIDM2MCwgYnV0IGxpbWl0ZWQgdG8gMTgwXG4gICAgICByb3RhdGVVcCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICByb3RhdGVTdGFydC5jb3B5KHJvdGF0ZUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZURvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVEb2xseScgKTtcblxuICAgICAgZG9sbHlFbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZG9sbHlTdGFydC5jb3B5KGRvbGx5RW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVQYW4nICk7XG5cbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCk7XG5cbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcblxuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVVwJyApO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVdoZWVsID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVdoZWVsJyApO1xuXG4gICAgICBpZiAoZXZlbnQuZGVsdGFZIDwgMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChldmVudC5kZWx0YVkgPiAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlS2V5RG93bicgKTtcblxuICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLlVQOlxuICAgICAgICAgIHBhbigwLCB0aGlzLmtleVBhblNwZWVkKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLkJPVFRPTTpcbiAgICAgICAgICBwYW4oMCwgLXRoaXMua2V5UGFuU3BlZWQpO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuTEVGVDpcbiAgICAgICAgICBwYW4odGhpcy5rZXlQYW5TcGVlZCwgMCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5SSUdIVDpcbiAgICAgICAgICBwYW4oLXRoaXMua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydFJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlU3RhcnQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnREb2xseScgKTtcblxuICAgICAgY29uc3QgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgZG9sbHlTdGFydC5zZXQoMCwgZGlzdGFuY2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0UGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0UGFuJyApO1xuXG4gICAgICBwYW5TdGFydC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZVJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgcm90YXRlVXAoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgcm90YXRlU3RhcnQuY29weShyb3RhdGVFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVEb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlRG9sbHknICk7XG5cbiAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGRvbGx5RW5kLnNldCgwLCBkaXN0YW5jZSk7XG5cbiAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XG5cbiAgICAgIGlmIChkb2xseURlbHRhLnkgPiAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBkb2xseVN0YXJ0LmNvcHkoZG9sbHlFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZVBhbicgKTtcblxuICAgICAgcGFuRW5kLnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcblxuICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyhwYW5FbmQsIHBhblN0YXJ0KTtcblxuICAgICAgcGFuKHBhbkRlbHRhLngsIHBhbkRlbHRhLnkpO1xuXG4gICAgICBwYW5TdGFydC5jb3B5KHBhbkVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoRW5kID0gKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaEVuZCcgKTtcbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBldmVudCBoYW5kbGVycyAtIEZTTTogbGlzdGVuIGZvciBldmVudHMgYW5kIHJlc2V0IHN0YXRlXG4gICAgLy9cblxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuT1JCSVQpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93blJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5ST1RBVEU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuWk9PTSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93bkRvbGx5KGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLkRPTExZO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLlBBTikge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duUGFuKGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlBBTjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5OT05FKSB7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlUm90YXRlKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFNUQVRFLkRPTExZKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlRG9sbHkoZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVQYW4oZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlVXAgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVNb3VzZVVwKGV2ZW50KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlV2hlZWwgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlIHx8IChzdGF0ZSAhPT0gU1RBVEUuTk9ORSAmJiBzdGF0ZSAhPT0gU1RBVEUuUk9UQVRFKSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGhhbmRsZU1vdXNlV2hlZWwoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7IC8vIG5vdCBzdXJlIHdoeSB0aGVzZSBhcmUgaGVyZS4uLlxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVLZXlzID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlS2V5RG93bihldmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hTdGFydCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnREb2xseShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX0RPTExZO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0UGFuKGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUEFOO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLk5PTkUpXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaE1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUk9UQVRFKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUm90YXRlKGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX0RPTExZKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlRG9sbHkoZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9QQU4pIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVQYW4oZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoRW5kID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlVG91Y2hFbmQoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ29udGV4dE1lbnUgPSBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICAvL1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBnZXQgY2VudGVyKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmNlbnRlciBoYXMgYmVlbiByZW5hbWVkIHRvIC50YXJnZXQnKTtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQ7XG4gIH1cblxuICBnZXQgbm9ab29tKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vWm9vbSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVpvb20gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlWm9vbTtcbiAgfVxuXG4gIHNldCBub1pvb20odmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVab29tID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vUm90YXRlKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVJvdGF0ZTtcbiAgfVxuXG4gIHNldCBub1JvdGF0ZSh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVSb3RhdGUgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9QYW4oKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlUGFuO1xuICB9XG5cbiAgc2V0IG5vUGFuKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVBhbiA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub0tleXMoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9LZXlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlS2V5cyBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVLZXlzO1xuICB9XG5cbiAgc2V0IG5vS2V5cyh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vS2V5cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZUtleXMgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZUtleXMgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgc3RhdGljTW92aW5nKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlRGFtcGluZztcbiAgfVxuXG4gIHNldCBzdGF0aWNNb3ZpbmcodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5zdGF0aWNNb3ZpbmcgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVEYW1waW5nIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVEYW1waW5nID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IGR5bmFtaWNEYW1waW5nRmFjdG9yKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmR5bmFtaWNEYW1waW5nRmFjdG9yIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSAuZGFtcGluZ0ZhY3RvciBpbnN0ZWFkLicpO1xuICAgIHJldHVybiB0aGlzLmRhbXBpbmdGYWN0b3I7XG4gIH1cblxuICBzZXQgZHluYW1pY0RhbXBpbmdGYWN0b3IodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5keW5hbWljRGFtcGluZ0ZhY3RvciBoYXMgYmVlbiByZW5hbWVkLiBVc2UgLmRhbXBpbmdGYWN0b3IgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSB2YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbnRyb2xzTW9kdWxlfSBmcm9tICcuLi9Db250cm9sc01vZHVsZSc7XG5cbmltcG9ydCB7VGhyZWVPcmJpdENvbnRyb2xzfSBmcm9tICcuL2xpYi9UaHJlZU9yYml0Q29udHJvbHMnO1xuXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc01vZHVsZSBleHRlbmRzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGZvbGxvdzogZmFsc2UsXG4gICAgICBvYmplY3Q6IG51bGwsXG4gICAgICB0YXJnZXQ6IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gICAgfSwgcGFyYW1zKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIHN1cGVyLm1hbmFnZXIobWFuYWdlcik7XG5cbiAgICBjb25zdCB7b2JqZWN0OiBvYmosIGZvbGxvdywgdGFyZ2V0fSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IG9iamVjdCA9IG9iaiA/IG9iai5uYXRpdmUgOiBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlO1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgVGhyZWVPcmJpdENvbnRyb2xzKFxuICAgICAgb2JqZWN0LFxuICAgICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKSxcbiAgICAgIG1hbmFnZXIuaGFuZGxlclxuICAgICk7XG5cbiAgICBjb25zdCB1cGRhdGVQcm9jZXNzb3IgPSBmb2xsb3cgPyBjID0+IHtcbiAgICAgIGNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgICB9IDogYyA9PiB7XG4gICAgICBjb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDb250cm9scyhjb250cm9scyk7XG4gICAgdGhpcy5zZXRVcGRhdGUodXBkYXRlUHJvY2Vzc29yKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgaWYgKG9iaikgcmV0dXJuO1xuICAgICAgICBjb250cm9scy5vYmplY3QgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9hcHAvY29udHJvbHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vT3JiaXRDb250cm9sc01vZHVsZSc7XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL2FwcCAqL1xuZXhwb3J0ICogZnJvbSAnLi9FbGVtZW50TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUmVuZGVyaW5nTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vU2NlbmVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXNpemVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb3N0UHJvY2Vzc29yTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVmlydHVhbE1vdXNlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db250cm9sc01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0ZvZ01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRlTW9kdWxlJztcblxuLy8gY29udHJvbHNcbmV4cG9ydCAqIGZyb20gJy4vY29udHJvbHMvaW5kZXgnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRHluYW1pY0dlb21ldHJ5TW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17YXR0cmlidXRlczogZmFsc2V9XSAtIHBhcmFtc1xuICogQHBhcmFtIHtCb29sZWFufSBbcGF0Y2hFdmVudHM9dHJ1ZV1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljR2VvbWV0cnlNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhdHRyaWJ1dGVzOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHBhcmFtcyA9IHNlbGYucGFyYW1zO1xuXG4gICAgdGhpcy5nXyA9IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xuICAgICAgaWYgKHRoaXMuYnVpbGRHZW9tZXRyeSkge1xuICAgICAgICB0aGlzLm5hdGl2ZS5nZW9tZXRyeSA9IHRoaXMuYnVpbGRHZW9tZXRyeShcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtcyh7Z2VvbWV0cnk6IHBhcmFtc30pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChwYXJhbXMuYXR0cmlidXRlcykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wYXJhbXMuZ2VvbWV0cnkpIHtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBgZ18ke2tleX1gLCB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZS5nZW9tZXRyeS5wYXJhbWV0ZXJzW2tleV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMubmF0aXZlLmdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KHRoaXMudXBkYXRlUGFyYW1zKHtnZW9tZXRyeToge1trZXldOiB2YWx1ZX19KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBSZXBlYXRXcmFwcGluZyxcbiAgVVZNYXBwaW5nLFxuICBOZWFyZXN0RmlsdGVyLFxuICBMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIsXG4gIFRleHR1cmVMb2FkZXIsXG4gIFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBsb2FkZXIgPSBuZXcgVGV4dHVyZUxvYWRlcigpO1xuXG4vKipcbiAqIEBjbGFzcyBUZXh0dXJlTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAZGVzY3JpcHRpb24gQSBUZXh0dXJlTW9kdWxlIGNhbiBiZSBhcHBsaWVkIHRvIGFueSBNZXNoIG9yIE1vZGVsLlxuICogQHBhcmFtIHtBcnJheX0gW3RleHR1cmVzXSAtIGFycmF5IG9mIHRleHR1cmUgb2JqZWN0c1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGluc3RhbmNlLiB1cmwgdGFrZXMgYSBwYXRoLCBvciBhIGRhdGEgb2JqZWN0LjwvY2FwdGlvbj5cbiAqIHZhciB3b29kVGV4dHVyZSA9IG5ldyBUZXh0dXJlTW9kdWxlKHtcbiAqICAgdXJsOiBgJHtwcm9jZXNzLmFzc2V0c1BhdGh9L3RleHR1cmVzL3dvb2QuanBnYFxuICogfSk7XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Nb3JlIGNvbXByZWhlbnNpdmUgZXhhbXBsZSwgd29vZCB0ZXh0dXJlIGFwcGxpZWQgdG8gYSBCb3guPC9jYXB0aW9uPlxuICogbmV3IEJveCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgd2lkdGg6IDIsXG4gKiAgICAgaGVpZ2h0OiAyLFxuICogICAgIGRlcHRoOiAyXG4gKiAgIH0sXG4gKiAgIG1vZHVsZXM6IFtcbiAqICAgICBuZXcgVGV4dHVyZU1vZHVsZSh7XG4gKiAgICAgICB1cmw6IGBwYXRoL3RvL3RleHR1cmUuanBnYCxcbiAqICAgICAgIHJlcGVhdDogbmV3IFRIUkVFLlZlY3RvcjIoMSwgMSkgLy8gb3B0aW9uYWxcbiAqICAgICB9KVxuICogICBdLFxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKiAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0dXJlTW9kdWxlIHtcbiAgc3RhdGljIGxvYWQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0dXJlTW9kdWxlKHt1cmx9KS50ZXh0dXJlc1swXVsxXTtcbiAgfVxuXG4gIHRleHR1cmVzID0gW107XG5cbiAgY29uc3RydWN0b3IoLi4udGV4dHVyZXMpIHtcbiAgICB0ZXh0dXJlcy5mb3JFYWNoKCh7XG4gICAgICB1cmwsXG4gICAgICB0eXBlID0gJ21hcCcsXG4gICAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMigwLCAwKSxcbiAgICAgIHJlcGVhdCA9IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgd3JhcCA9IFJlcGVhdFdyYXBwaW5nLFxuICAgICAgbWFwcGluZyA9IFVWTWFwcGluZyxcbiAgICAgIGZpeCA9IHRleCA9PiB0ZXhcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gbG9hZGVyLmxvYWQodXJsKTtcblxuICAgICAgaWYgKHdyYXAubGVuZ3RoID4gMCkge1xuICAgICAgICB0ZXh0dXJlLndyYXBTID0gd3JhcFswXTtcbiAgICAgICAgdGV4dHVyZS53cmFwVCA9IHdyYXBbMV07XG4gICAgICB9IGVsc2VcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IHRleHR1cmUud3JhcFQgPSB3cmFwO1xuXG4gICAgICB0ZXh0dXJlLm1hcHBpbmcgPSBtYXBwaW5nO1xuXG4gICAgICB0ZXh0dXJlLm9mZnNldC5jb3B5KG9mZnNldCk7XG4gICAgICB0ZXh0dXJlLnJlcGVhdC5jb3B5KHJlcGVhdCk7XG5cbiAgICAgIHRleHR1cmUubWFnRmlsdGVyID0gTmVhcmVzdEZpbHRlcjtcbiAgICAgIHRleHR1cmUubWluRmlsdGVyID0gTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyO1xuXG4gICAgICB0aGlzLnRleHR1cmVzLnB1c2goW3R5cGUsIGZpeCh0ZXh0dXJlKV0pO1xuICAgIH0pO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1hdGVyaWFsKG1hdGVyaWFsLCBzZWxmKSB7XG4gICAgICBzZWxmLnRleHR1cmVzLmZvckVhY2godGV4dHVyZSA9PiB7XG4gICAgICAgIG1hdGVyaWFsW3RleHR1cmVbMF1dID0gdGV4dHVyZVsxXTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBbmltYXRpb25NaXhlcixcbiAgQW5pbWF0aW9uQ2xpcCxcbiAgQ2xvY2tcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbi8qKlxuICogQGNsYXNzIEFuaW1hdGlvbk1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQGRlc2NyaXB0aW9uIENvbnZlbmllbmNlIG1vZHVsZSB0aGF0IHdyYXBzIHRoZSA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI21hbnVhbC9pbnRyb2R1Y3Rpb24vQW5pbWF0aW9uLXN5c3RlbSc+dGhyZWUuanMgYW5pbWF0aW9uIHN5c3RlbTwvYT5cbiAqIEBwYXJhbSB7QXBwfSBhcHAgLSB0aGUgYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtpc0RlZmVycmVkPWZhbHNlXSAtIHNldCB0byB0cnVlIGlmIGFuaW1hdGlvbiBzaG91bGQgbm90IHN0YXJ0IGF1dG9tYXRpY2FsbHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtzcGVlZDogMX1dIC0gdGhlIHBhcmFtc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbmltYXRpb24gbW9kdWxlIGFuZCBwbGF5IGEgZ2l2ZW4gY2xpcCBvZiBhbiBpbXBvcnRlZCBtb2RlbDwvY2FwdGlvbj5cbiAqIGNvbnN0IGFuaW1hdGlvbk1vZHVsZSA9IG5ldyBBbmltYXRpb25Nb2R1bGUoYXBwLCBmYWxzZSwge1xuICogICBzcGVlZDogMS4yIC8vIHNwZWVkIHVwIGFuaW1hdGlvbiBieSAyMCVcbiAqIH0pO1xuICpcbiAqIG5ldyBJbXBvcnRlcih7XG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gKiAgICAgLy8gT3ZlcnJpZGUgcGFyc2UgdG8gZ2VuZXJhdGUgYSBza2lubmVkTWVzaCwgbmVlZGVkIGZvciBza2lubmVkIG1vZGVsc1xuICogICAgIHJldHVybiBuZXcgVEhSRUUuU2tpbm5lZE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gKiAgIH0sXG4gKlxuICogICB1cmw6IGBwYXRoL3RvL21vZGVsLmpzb25gLFxuICogICB1c2VDdXN0b21NYXRlcmlhbDogdHJ1ZSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICogICAgIHNraW5uaW5nOiB0cnVlXG4gKiAgIH0pLFxuICpcbiAqICAgbW9kdWxlczogW2FuaW1hdGlvbk1vZHVsZV1cbiAqIH0pLmFkZFRvKGFwcCkudGhlbigoKSA9PiB7XG4gKiAgIC8vIGFkZGluZyBtb2RlbCB0byBhcHAgcmV0dXJucyBhIHByb21pc2UsIHNvIHBpcGUgdGhlIGZ1bmN0aW9uIHRvIGtpY2sgb2ZmIHRoZSBhbmltYXRpb24gY2xpcFxuICogICBhbmltYXRpb25Nb2R1bGUucGxheSgnY2xpcE5hbWUnKTtcbiAqIH0pO1xuICovXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoYXBwLCBpc0RlZmVycmVkLCBwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBzcGVlZDogMVxuICAgIH0sIHBhcmFtcyk7XG4gICAgdGhpcy5jbG9jayA9IG5ldyBDbG9jaygpO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5pc0RlZmVycmVkID0gaXNEZWZlcnJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHBsYXlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBQbGF5cyB0aGUgZ2l2ZW4gY2xpcCBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGlwTmFtZSAtIHRoZSBjbGlwIHRvIHBsYXlcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICBwbGF5KGNsaXBOYW1lKSB7XG4gICAgY29uc3QgY2xpcCA9IEFuaW1hdGlvbkNsaXAuZmluZEJ5TmFtZSh0aGlzLmNsaXBzLCBjbGlwTmFtZSk7XG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5taXhlci5jbGlwQWN0aW9uKGNsaXApO1xuXG4gICAgYWN0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSB0aGUgbWl4ZXIgKGJlaW5nIGNhbGxlZCBvbiBmcmFtZSBhbmltYXRpb24gbG9vcClcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMubWl4ZXIpIHRoaXMubWl4ZXIudXBkYXRlKHRoaXMuY2xvY2suZ2V0RGVsdGEoKSAqIHRoaXMucGFyYW1zLnNwZWVkKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5sb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9KTtcblxuICAgIGlmICghc2VsZi5pc0RlZmVycmVkKSBzZWxmLmxvb3Auc3RhcnQoc2VsZi5hcHApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2FuaW1hdGlvbicpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgbWVzaC5nZW9tZXRyeS5za2VsZXRvbiA9IG1lc2guc2tlbGV0b247XG5cbiAgICAgIHNlbGYubWl4ZXIgPSBuZXcgQW5pbWF0aW9uTWl4ZXIobWVzaC5nZW9tZXRyeSk7XG4gICAgICBzZWxmLmNsaXBzID0gbWVzaC5nZW9tZXRyeS5hbmltYXRpb25zO1xuXG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvbWVzaCAqL1xuZXhwb3J0ICogZnJvbSAnLi9EeW5hbWljR2VvbWV0cnlNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0dXJlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQW5pbWF0aW9uTW9kdWxlJztcbiIsIi8qKlxuICogQGNsYXNzIERlZmluZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSBEZWZpbmVNb2R1bGUgd2l0aCBQZXJzcGVjdGl2ZUNhbWVyYSBhcyBjYW1lcmEgbW9kdWxlIGFuZCBwYXNzaW5nIGl0IHRvIEFwcCdzIG1vZHVsZXM8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgLy8gLi4uXG4gKiAgIG5ldyBEZWZpbmVNb2R1bGUoJ2NhbWVyYScsIG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZpbmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQodGhpcy5uYW1lLCB0aGlzLmRhdGEpO1xuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzICovXG5cbmV4cG9ydCAqIGZyb20gJy4vYXBwL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbWVzaC9pbmRleCc7XG5cbi8vIG1vZHVsZXNcbmV4cG9ydCAqIGZyb20gJy4vRGVmaW5lTW9kdWxlJztcbiIsImltcG9ydCB7SW1wb3J0ZXJ9IGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvSW1wb3J0ZXInO1xuaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYX0gZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvUGVyc3BlY3RpdmVDYW1lcmEnO1xuXG5leHBvcnQgY2xhc3MgTW9kZWwgZXh0ZW5kcyBJbXBvcnRlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgLi4uYWRkaXRpb25hbCkge1xuICAgIGNvbnNvbGUud2FybignTW9kZWwgaXMgZGVwcmVjYXRlZC4gVXNlIEltcG9ydGVyIGluc3RlYWQuJyk7XG5cbiAgICBpZiAocGFyYW1zLmdlb21ldHJ5KSB7XG4gICAgICBwYXJhbXMudXJsID0gcGFyYW1zLmdlb21ldHJ5LnBhdGg7XG4gICAgICBwYXJhbXMubG9hZGVyID0gcGFyYW1zLmdlb21ldHJ5LmxvYWRlcjtcbiAgICB9XG5cbiAgICBzdXBlcihwYXJhbXMsIC4uLmFkZGl0aW9uYWwpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIGNvbnNvbGUud2FybignQ2FtZXJhTW9kdWxlIGlzIGRlcHJlY2F0ZWQuIFVzZSBEZWZpbmVNb2R1bGUgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYShwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmFkZChzZWxmLmNhbWVyYSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnY2FtZXJhJywgdGhpcy5jYW1lcmEpO1xuICB9XG59XG4iLCIvKipcbiAqIE5hbWVzcGFjZSBjb250YWluaW5nIGFsbCBjbGFzc2VzIGZyb20gYWxsIG1vZHVsZXMuIFVzZWQgYXMgZ2xvYmFsIGluIFVNRCBwYXR0ZXJuLlxuICogQG5hbWVzcGFjZSBXSFNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRoZSB1c2Ugb2YgV0hTIG5hbWVzcGFjZS48L2NhcHRpb24+XG4gKiBuZXcgV0hTLkFwcCgpIC8vIGNvcmVcbiAqIG5ldyBXSFMuUGVyc3BlY3RpdmVDYW1lcmEoKSAvLyBjb21wb25lbnRzXG4gKiBuZXcgV0hTLlJlc2l6ZU1vZHVsZSgpIC8vIG1vZHVsZXNcbiAqIFdIUy5leHRlbmQoKSAvLyB1dGlsc1xuICovXG5cblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9saWdodHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9pbmRleCc7XG5cbi8vIERFUFJFQ0FUSU9OXG5leHBvcnQgKiBmcm9tICcuL2RlcHJlY2F0aW9uJztcbiJdLCJuYW1lcyI6WyJleHRlbmQiLCJvYmplY3QiLCJleHRlbnNpb25zIiwiZXh0ZW5zaW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInByb3AiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpc0FycmF5Iiwic2xpY2UiLCJpbnN0cnVjdCIsImFycmF5IiwiaW5zdEFycmF5IiwidGVtcE9iamVjdCIsImkiLCJtYXgiLCJsZW5ndGgiLCJndWlkZSIsInRyYW5zZm9ybURhdGEiLCJpbnN0cnVjdGlvbnMiLCJrZXkiLCJ0b0FycmF5IiwiaW5zdHJ1Y3Rpb24iLCJ0ZW1wQXJyYXkiLCJDb21wb3NpdGlvbkVycm9yIiwiY2xhc3NJbnN0YW5jZSIsIm1lc3NhZ2UiLCJjb21wb25lbnQiLCJzdGFja0FycmF5Iiwic3RhY2siLCJzcGxpdCIsInNwbGljZSIsImpvaW4iLCJjb25zb2xlIiwiZXJyb3IiLCJuYW1lIiwiRXJyb3IiLCJEZXBlbmRlbmN5RXJyb3IiLCJhY3RpdmVNb2R1bGUiLCJkZXBlbmRlbmN5TW9kdWxlIiwiTWFuYWdlckVycm9yIiwid2FybkRlcHMiLCJSRVZJU0lPTiIsImVyciIsIk1vZHVsZVN5c3RlbSIsInNvdXJjZSIsIm1vZHVsZXMiLCJhcHBseU1vZHVsZSIsImFwcGx5QnJpZGdlIiwib25Db3B5IiwiYnJpZGdlTWFwIiwibW9kdWxlIiwiYnJpZGdlIiwiYXBwbHkiLCJjYiIsImZ1bmMiLCJtb2R1bGVTY29wZSIsInB1c2giLCJtYW5hZ2VyIiwiYWN0aXZlIiwiaW50ZWdyYXRlIiwiYmluZCIsImRpc3Bvc2VNb2R1bGUiLCJpbmRleE9mIiwiZGlzcG9zZSIsIkV2ZW50cyIsIlN5bWJvbCIsIm9iamVjdFByb3RvIiwiaGFzT3duUHJvcGVydHkiLCJzeW1Ub1N0cmluZ1RhZyIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwicm9vdCIsInBvbnlmaWxsIiwiJCRvYnNlcnZhYmxlIiwiTW9kdWxlTWFuYWdlciIsImhhbmRsZXIiLCJjdXJyZW50TW9kdWxlIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsInN0YXRlIiwiYWN0aW9uIiwiZGF0YSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJCb29sZWFuIiwiZGVwc01hcCIsInN1YnNjcmliZSIsImNoYW5nZWRLZXkiLCJjYWxsYmFjayIsIndhcm4iLCJzZXQiLCJtb2R1bGVFeGVjdXRvciIsInVzZSIsIkNvbXBvbmVudCIsInBhcmFtcyIsImRlZmF1bHRzIiwiX3dhaXQiLCJjaGlsZHJlbiIsImludGVncmF0ZU1vZHVsZXMiLCJwcm9taXNlIiwiUHJvbWlzZSIsImFsbCIsImlzRGVmZmVyZWQiLCJ3YWl0IiwidGhlbiIsImNvcHkiLCJjdXN0b21pemUiLCJuYXRpdmUiLCJjbG9uZSIsInBhcmVudCIsInJlc29sdmUiLCJyZWplY3QiLCJkZWZlciIsImFkZFByb21pc2UiLCJvbkFkZCIsInJlc29sdmVyIiwiYWRkIiwicmVtb3ZlIiwiX21hbmFnZXIiLCJfbmF0aXZlIiwibWVzaCIsImF0dHJpYnV0ZXMiLCJtYXBwZXJzIiwidGFyZ2V0IiwibWFwcGVyIiwiayIsIm1hcCIsImF0dHJpYnV0ZSIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0dGVyIiwic2V0dGVyIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsInZhbHVlIiwibWlycm9yIiwiTWVzaENvbXBvbmVudCIsImdlb20iLCJNZXNoIiwibWF0ZXJpYWwiLCJnZW9tZXRyeSIsImN1c3RvbSIsImJ1aWxkIiwid3JhcCIsImFwcGx5Q29tbWFuZCIsInBvc2l0aW9uIiwicm90YXRpb24iLCJzY2FsZSIsInNoYWRvdyIsIngiLCJ5IiwieiIsImNhc3RTaGFkb3ciLCJjYXN0IiwicmVjZWl2ZVNoYWRvdyIsInJlY2VpdmUiLCJvbldyYXAiLCJxdWF0ZXJuaW9uIiwiZGVzdCIsIkxpZ2h0Q29tcG9uZW50IiwibWFwU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiYmlhcyIsInJhZGl1cyIsInNoYWRvd0NhbWVyYSIsImNhbWVyYSIsIm5lYXIiLCJmYXIiLCJmb3YiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJDYW1lcmFDb21wb25lbnQiLCJzeXN0ZW0iLCJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJmb3JtYW5jZSIsInByZXNlbnQiLCJBcHAiLCJsb2ciLCJ2ZXJzaW9uIiwic2ltdWxhdGUiLCJ1cGRhdGVFbmFibGVkIiwibG9vcHMiLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsInByb2Nlc3MiLCJsbCIsImUiLCJlbmFibGVkIiwiZXhlY3V0ZSIsImNsb2NrIiwibG9vcCIsImluZGV4IiwiZ2V0IiwiTG9vcCIsInVzZUNsb2NrIiwiQ2xvY2siLCJ3b3JsZCIsImFkZExvb3AiLCJzdGFydCIsInN0b3AiLCJyZW1vdmVMb29wIiwiQW1iaWVudExpZ2h0IiwibGlnaHQiLCJBbWJpZW50TGlnaHROYXRpdmUiLCJjb2xvciIsImludGVuc2l0eSIsIkRpcmVjdGlvbmFsTGlnaHQiLCJ3cmFwU2hhZG93IiwiRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSIsIkhlbWlzcGhlcmVMaWdodCIsIkhlbWlzcGhlcmVMaWdodE5hdGl2ZSIsInNreUNvbG9yIiwiZ3JvdW5kQ29sb3IiLCJQb2ludExpZ2h0IiwiUG9pbnRMaWdodE5hdGl2ZSIsImRpc3RhbmNlIiwiZGVjYXkiLCJTcG90TGlnaHQiLCJTcG90TGlnaHROYXRpdmUiLCJhbmdsZSIsImV4cG9uZW50IiwiTWF0aCIsIlBJIiwiQXJlYUxpZ2h0IiwiUmVjdEFyZWFMaWdodE5hdGl2ZSIsIkN1YmVDYW1lcmEiLCJDdWJlQ2FtZXJhTmF0aXZlIiwiY3ViZVJlc29sdXRpb24iLCJPcnRob2dyYXBoaWNDYW1lcmEiLCJPcnRob2dyYXBoaWNDYW1lcmFOYXRpdmUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIlBlcnNwZWN0aXZlQ2FtZXJhTmF0aXZlIiwiYXNwZWN0IiwiQm94IiwiYnVpbGRHZW9tZXRyeSIsImJ1ZmZlciIsIkJveEJ1ZmZlckdlb21ldHJ5IiwiQm94R2VvbWV0cnkiLCJkZXB0aCIsIndpZHRoU2VnbWVudHMiLCJoZWlnaHRTZWdtZW50cyIsImRlcHRoU2VnbWVudHMiLCJDaXJjbGUiLCJDaXJjbGVCdWZmZXJHZW9tZXRyeSIsIkNpcmNsZUdlb21ldHJ5Iiwic2VnbWVudHMiLCJ0aGV0YVN0YXJ0IiwidGhldGFMZW5ndGgiLCJDb25lIiwiQ29uZUJ1ZmZlckdlb21ldHJ5IiwiQ29uZUdlb21ldHJ5IiwicmFkaXVzU2VnbWVudHMiLCJvcGVuRW5kZWQiLCJDeWxpbmRlciIsIkN5bGluZGVyQnVmZmVyR2VvbWV0cnkiLCJDeWxpbmRlckdlb21ldHJ5IiwicmFkaXVzVG9wIiwicmFkaXVzQm90dG9tIiwiRG9kZWNhaGVkcm9uIiwiRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJEb2RlY2FoZWRyb25HZW9tZXRyeSIsImRldGFpbCIsIkV4dHJ1ZGUiLCJFeHRydWRlR2VvbWV0cnkiLCJzaGFwZXMiLCJvcHRpb25zIiwiQnVmZmVyR2VvbWV0cnkiLCJmcm9tR2VvbWV0cnkiLCJJY29zYWhlZHJvbiIsIkljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJJY29zYWhlZHJvbkdlb21ldHJ5IiwiTGF0aGUiLCJMYXRoZUJ1ZmZlckdlb21ldHJ5IiwiTGF0aGVHZW9tZXRyeSIsInBvaW50cyIsIkxpbmUiLCJMaW5lTmF0aXZlIiwiR2VvbWV0cnkiLCJwcCIsImN1cnZlIiwiZ2V0UG9pbnRzIiwidmVydHMiLCJGbG9hdDMyQXJyYXkiLCJpMyIsImFkZEF0dHJpYnV0ZSIsIkJ1ZmZlckF0dHJpYnV0ZSIsInZlcnRpY2VzIiwiTGluZUN1cnZlMyIsIlZlY3RvcjMiLCJJbXBvcnRlciIsImZpbHRlciIsInByb2Nlc3NGaWx0ZXIiLCJmb3JFYWNoIiwiZWwiLCJ0ZXh0dXJlUGF0aCIsImxhb2RlciIsInNldFRleHR1cmVQYXRoIiwibG9hZGVyIiwibG9hZCIsInVybCIsIm9uTG9hZCIsInBhcnNlciIsInVzZUN1c3RvbU1hdGVyaWFsIiwibWF0Iiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJKU09OTG9hZGVyIiwibWF0ZXJpYWxzIiwiT2N0YWhlZHJvbiIsIk9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSIsIk9jdGFoZWRyb25HZW9tZXRyeSIsIlBhcmFtZXRyaWMiLCJQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkiLCJQYXJhbWV0cmljR2VvbWV0cnkiLCJzbGljZXMiLCJzdGFja3MiLCJ1IiwidiIsIlBsYW5lIiwiUGxhbmVCdWZmZXJHZW9tZXRyeSIsIlBsYW5lR2VvbWV0cnkiLCJ3U2VnbWVudHMiLCJoU2VnbWVudHMiLCJ2ZXJ0aWNlc09mQ3ViZSIsImluZGljZXNPZkZhY2VzIiwiUG9seWhlZHJvbiIsIlBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSIsIlBvbHloZWRyb25HZW9tZXRyeSIsIlJpbmciLCJSaW5nQnVmZmVyR2VvbWV0cnkiLCJSaW5nR2VvbWV0cnkiLCJpbm5lclJhZGl1cyIsIm91dGVyUmFkaXVzIiwidGhldGFTZWdtZW50cyIsInBoaVNlZ21lbnRzIiwiU2hhcGUiLCJTaGFwZUJ1ZmZlckdlb21ldHJ5IiwiU2hhcGVHZW9tZXRyeSIsIlNwaGVyZSIsIlNwaGVyZUJ1ZmZlckdlb21ldHJ5IiwiU3BoZXJlR2VvbWV0cnkiLCJUZXRyYWhlZHJvbiIsIlRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJUZXRyYWhlZHJvbkdlb21ldHJ5IiwiVGV4dCIsInBhcmFtZXRlcnMiLCJmb250IiwiVGV4dEdlb21ldHJ5IiwidGV4dCIsIkZvbnRMb2FkZXIiLCJGb250IiwiVG9ydXMiLCJUb3J1c0dlb21ldHJ5IiwidHViZSIsInJhZGlhbFNlZ21lbnRzIiwidHVidWxhclNlZ21lbnRzIiwiYXJjIiwiVG9ydXNrbm90IiwiR0NvbnN0cnVjdCIsIlRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IiwiVG9ydXNLbm90R2VvbWV0cnkiLCJwIiwicSIsIlR1YmUiLCJUdWJlQnVmZmVyR2VvbWV0cnkiLCJUdWJlR2VvbWV0cnkiLCJwYXRoIiwiY2xvc2VkIiwiR3JvdXAiLCJvYmplY3RzIiwib2JqIiwiYWRkVG8iLCJPYmplY3QzRCIsIkVsZW1lbnRNb2R1bGUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImJvZHkiLCJjcmVhdGVFbGVtZW50IiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwic2VsZiIsImFwcGVuZENoaWxkIiwiUmVuZGVyaW5nTW9kdWxlIiwiaXNTaGFkb3ciLCJhc3NpZ24iLCJWZWN0b3IyIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImJnQ29sb3IiLCJiZ09wYWNpdHkiLCJyZW5kZXJlciIsInBpeGVsUmF0aW8iLCJyZXNvbHV0aW9uIiwiV2ViR0xSZW5kZXJlciIsImVmZmVjdHMiLCJhcHBseUFkZGl0aW9uYWwiLCJzZXRDbGVhckNvbG9yIiwic2V0UGl4ZWxSYXRpbyIsInNldFNpemUiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwiaXNBcHBsaWVkIiwiYWRkaXRpb25hbCIsInNjZW5lIiwicmVuZGVyTG9vcCIsInJlbmRlciIsImF0dGFjaFRvQ2FudmFzIiwiZWZmZWN0Iiwic2l6ZSIsImdldFNpemUiLCJhcHAiLCJjYW52YXMiLCJkb21FbGVtZW50IiwiZGVmaW5lIiwiaW50ZWdyYXRlUmVuZGVyZXIiLCJ1cGRhdGUiLCJmb3JjZUNvbnRleHRMb3NzIiwic2hhZG93TWFwIiwiU2NlbmVNb2R1bGUiLCJ3aWxsU2NlbmVCZVJlcGxhY2VkIiwiU2NlbmUiLCJzZXRTY2VuZSIsIlJlc2l6ZU1vZHVsZSIsImNhbGxiYWNrcyIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJyZW5kZXJpbmciLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImdldENvbnRhaW5lciIsImdldFJlc29sdXRpb24iLCJhdXRvIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRyaWdnZXIiLCJhZGRBdXRvcmVzaXplIiwiZnJhZ21lbnQiLCJ2ZXJ0ZXgiLCJTaGFkZXJNYXRlcmlhbCIsIlVuaWZvcm0iLCJDb2xvciIsIldlYkdMUmVuZGVyVGFyZ2V0IiwiTGluZWFyRmlsdGVyIiwiUkdCQUZvcm1hdCIsIlJHQkZvcm1hdCIsIkRlcHRoVGV4dHVyZSIsIkRlcHRoU3RlbmNpbEZvcm1hdCIsIlVuc2lnbmVkSW50MjQ4VHlwZSIsInBvbHlmaWxsIiwibWV0aG9kIiwic2hvd1dhcm4iLCJQb3N0UHJvY2Vzc29yTW9kdWxlIiwiZGVidWciLCJjdXJyZW50UGFzcyIsImNvbXBvc2VyIiwiRWZmZWN0Q29tcG9zZXIiLCJnZXREZWx0YSIsInJlcGxhY2VSZW5kZXJlciIsInBhc3MiLCJSZW5kZXJQYXNzIiwiYWRkUGFzcyIsInRleHR1cmVJRCIsInVuaWZvcm1zIiwiU2hhZGVyUGFzcyIsInBhc3NlcyIsImJvb2wiLCJyZW5kZXJUb1NjcmVlbiIsIkV2ZW50c1BhdGNoTW9kdWxlIiwib3JpZ2luT2JqZWN0IiwiZGVzdE9iamVjdCIsImV2ZW50cyIsImV2ZW50IiwiZW1pdCIsInBhdGNoRXZlbnRzIiwiVmlydHVhbE1vdXNlTW9kdWxlIiwiZ2xvYmFsTW92ZW1lbnQiLCJtb3VzZSIsInJheWNhc3RlciIsIlJheWNhc3RlciIsInByb2plY3Rpb25QbGFuZSIsImN1c3RvbVgiLCJjdXN0b21ZIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJjbGllbnRZIiwibm9ybWFsIiwiZ2V0V29ybGREaXJlY3Rpb24iLCJzZXRGcm9tQ2FtZXJhIiwicmVxdWlyZSIsIm9uIiwiZXYiLCJnbG9iYWxYIiwiZ2xvYmFsWSIsInBvaW50ZXJMb2NrRWxlbWVudCIsIm1vdmVtZW50WCIsIm1vdmVtZW50WSIsIm5lc3RlZCIsImlzSG92ZXJlZCIsImhvdmVycyIsInRyYXZlcnNlIiwiY2hpbGQiLCJpbnRlcnNlY3RPYmplY3RzIiwiaW50ZXJzZWN0T2JqZWN0IiwicGxhbmUiLCJyYXkiLCJpbnRlcnNlY3RQbGFuZSIsImludGVyc2VjdGlvbiIsIkNvbnRyb2xzTW9kdWxlIiwiY29udHJvbHMiLCJjIiwidXBkYXRlTG9vcCIsIkZvZ01vZHVsZSIsInR5cGUiLCJmb2ciLCJGb2dFeHAyIiwiZGVuc2l0eSIsIkZvZyIsImlzRXF1YWxEZWZhdWx0IiwiYSIsImIiLCJlcXVhbHMiLCJTdGF0ZU1vZHVsZSIsImlzRXF1YWwiLCJlcXVhbENoZWNrIiwiYWN0aW9uR2VuZXJhdGUiLCJjb25maWd1cmF0aW9uIiwiY3VycmVudENvbmZpZyIsInByZXZDb25maWciLCJjb25maWciLCJkZWZhdWx0IiwicmVwbGFjZVJlZHVjZXIiLCJjb25maWdzIiwidXBkYXRlcyIsImNvbmZpZ05hbWUiLCJ0cnVlVmFsIiwiZmFsc2VWYWwiLCJUaHJlZU9yYml0Q29udHJvbHMiLCJldmVudEhhbmRsZXIiLCJtaW5EaXN0YW5jZSIsIm1heERpc3RhbmNlIiwiSW5maW5pdHkiLCJtaW5ab29tIiwibWF4Wm9vbSIsIm1pblBvbGFyQW5nbGUiLCJtYXhQb2xhckFuZ2xlIiwibWluQXppbXV0aEFuZ2xlIiwibWF4QXppbXV0aEFuZ2xlIiwiZW5hYmxlRGFtcGluZyIsImRhbXBpbmdGYWN0b3IiLCJlbmFibGVab29tIiwiem9vbVNwZWVkIiwiZW5hYmxlUm90YXRlIiwicm90YXRlU3BlZWQiLCJlbmFibGVQYW4iLCJrZXlQYW5TcGVlZCIsImF1dG9Sb3RhdGUiLCJhdXRvUm90YXRlU3BlZWQiLCJlbmFibGVLZXlzIiwia2V5cyIsIkxFRlQiLCJVUCIsIlJJR0hUIiwiQk9UVE9NIiwibW91c2VCdXR0b25zIiwiT1JCSVQiLCJNT1VTRSIsIlpPT00iLCJNSURETEUiLCJQQU4iLCJ0YXJnZXQwIiwicG9zaXRpb24wIiwiem9vbTAiLCJ6b29tIiwiZ2V0UG9sYXJBbmdsZSIsInNwaGVyaWNhbCIsInBoaSIsImdldEF6aW11dGhhbEFuZ2xlIiwidGhldGEiLCJyZXNldCIsImRpc3BhdGNoRXZlbnQiLCJjaGFuZ2VFdmVudCIsIlNUQVRFIiwiTk9ORSIsIm9mZnNldCIsInF1YXQiLCJRdWF0ZXJuaW9uIiwic2V0RnJvbVVuaXRWZWN0b3JzIiwidXAiLCJxdWF0SW52ZXJzZSIsImludmVyc2UiLCJsYXN0UG9zaXRpb24iLCJsYXN0UXVhdGVybmlvbiIsInN1YiIsImFwcGx5UXVhdGVybmlvbiIsInNldEZyb21WZWN0b3IzIiwicm90YXRlTGVmdCIsImdldEF1dG9Sb3RhdGlvbkFuZ2xlIiwic3BoZXJpY2FsRGVsdGEiLCJtaW4iLCJtYWtlU2FmZSIsInBhbk9mZnNldCIsInNldEZyb21TcGhlcmljYWwiLCJsb29rQXQiLCJ6b29tQ2hhbmdlZCIsImRpc3RhbmNlVG9TcXVhcmVkIiwiRVBTIiwiZG90IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uQ29udGV4dE1lbnUiLCJvbk1vdXNlRG93biIsIm9uTW91c2VXaGVlbCIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hFbmQiLCJvblRvdWNoTW92ZSIsIm9uTW91c2VNb3ZlIiwib25Nb3VzZVVwIiwib25LZXlEb3duIiwic3RhcnRFdmVudCIsImVuZEV2ZW50IiwiUk9UQVRFIiwiRE9MTFkiLCJUT1VDSF9ST1RBVEUiLCJUT1VDSF9ET0xMWSIsIlRPVUNIX1BBTiIsIlNwaGVyaWNhbCIsInJvdGF0ZVN0YXJ0Iiwicm90YXRlRW5kIiwicm90YXRlRGVsdGEiLCJwYW5TdGFydCIsInBhbkVuZCIsInBhbkRlbHRhIiwiZG9sbHlTdGFydCIsImRvbGx5RW5kIiwiZG9sbHlEZWx0YSIsImdldFpvb21TY2FsZSIsInBvdyIsInJvdGF0ZVVwIiwicGFuTGVmdCIsIm9iamVjdE1hdHJpeCIsInNldEZyb21NYXRyaXhDb2x1bW4iLCJtdWx0aXBseVNjYWxhciIsInBhblVwIiwicGFuIiwiZGVsdGFYIiwiZGVsdGFZIiwidGFyZ2V0RGlzdGFuY2UiLCJ0YW4iLCJjbGllbnRIZWlnaHQiLCJtYXRyaXgiLCJjbGllbnRXaWR0aCIsImRvbGx5SW4iLCJkb2xseVNjYWxlIiwiZG9sbHlPdXQiLCJoYW5kbGVNb3VzZURvd25Sb3RhdGUiLCJoYW5kbGVNb3VzZURvd25Eb2xseSIsImhhbmRsZU1vdXNlRG93blBhbiIsImhhbmRsZU1vdXNlTW92ZVJvdGF0ZSIsInN1YlZlY3RvcnMiLCJoYW5kbGVNb3VzZU1vdmVEb2xseSIsImhhbmRsZU1vdXNlTW92ZVBhbiIsImhhbmRsZU1vdXNlVXAiLCJoYW5kbGVNb3VzZVdoZWVsIiwiaGFuZGxlS2V5RG93biIsImtleUNvZGUiLCJoYW5kbGVUb3VjaFN0YXJ0Um90YXRlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJoYW5kbGVUb3VjaFN0YXJ0RG9sbHkiLCJkeCIsImR5Iiwic3FydCIsImhhbmRsZVRvdWNoU3RhcnRQYW4iLCJoYW5kbGVUb3VjaE1vdmVSb3RhdGUiLCJoYW5kbGVUb3VjaE1vdmVEb2xseSIsImhhbmRsZVRvdWNoTW92ZVBhbiIsImhhbmRsZVRvdWNoRW5kIiwicHJldmVudERlZmF1bHQiLCJidXR0b24iLCJzdG9wUHJvcGFnYXRpb24iLCJFdmVudERpc3BhdGNoZXIiLCJPcmJpdENvbnRyb2xzTW9kdWxlIiwiZm9sbG93IiwidXBkYXRlUHJvY2Vzc29yIiwic2V0Q29udHJvbHMiLCJzZXRVcGRhdGUiLCJEeW5hbWljR2VvbWV0cnlNb2R1bGUiLCJnXyIsInVwZGF0ZVBhcmFtcyIsIlRleHR1cmVMb2FkZXIiLCJUZXh0dXJlTW9kdWxlIiwidGV4dHVyZXMiLCJ0ZXh0dXJlIiwicmVwZWF0IiwiUmVwZWF0V3JhcHBpbmciLCJtYXBwaW5nIiwiVVZNYXBwaW5nIiwiZml4IiwidGV4Iiwid3JhcFMiLCJ3cmFwVCIsIm1hZ0ZpbHRlciIsIk5lYXJlc3RGaWx0ZXIiLCJtaW5GaWx0ZXIiLCJMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIiLCJBbmltYXRpb25Nb2R1bGUiLCJpc0RlZmVycmVkIiwic2tlbGV0b24iLCJtaXhlciIsIkFuaW1hdGlvbk1peGVyIiwiY2xpcHMiLCJhbmltYXRpb25zIiwiY2xpcE5hbWUiLCJjbGlwIiwiQW5pbWF0aW9uQ2xpcCIsImZpbmRCeU5hbWUiLCJjbGlwQWN0aW9uIiwicGxheSIsInNwZWVkIiwiRGVmaW5l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
