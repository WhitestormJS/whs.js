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
   *   curve: new LineCurve3(new Vector3(0, 0, 0), new Vector3(10, 0, 0)),
   *   points: 50
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
        var pp = params.curve.getPoints(params.points);
        var verts = new Float32Array(pp.length * 3);

        for (var i = 0, max = pp.length; i < max; i++) {
          var i3 = i * 3;

          verts[i3] = pp[i].x;
          verts[i3 + 1] = pp[i].y;
          verts[i3 + 2] = pp[i].z;
        }

        geometry.addAttribute('position', new three.BufferAttribute(verts, 3));
      } else geometry.vertices = params.curve.getPoints(params.points);

      return geometry;
    }
  }]);
  return Line$$1;
}(MeshComponent), _class$21.defaults = _extends({}, MeshComponent.defaults, {

  curve: null,
  points: 50
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vc3JjL3V0aWxzL3RyYW5zZm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvbWluaXZlbnRzL2Rpc3QvbWluaXZlbnRzLmNvbW1vbmpzLmpzIiwiLi4vc3JjL2NvcmUvZXJyb3JzLmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlU3lzdGVtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyQXJnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21wb3NlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2luZGV4LmpzIiwiLi4vc3JjL2NvcmUvTW9kdWxlTWFuYWdlci5qcyIsIi4uL3NyYy9jb3JlL0NvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL3Byb3RvdHlwZS9hdHRyaWJ1dGVzLmpzIiwiLi4vc3JjL2NvcmUvTWVzaENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0xpZ2h0Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvcmUvQ2FtZXJhQ29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3ByZXNlbnQvbGliL3ByZXNlbnQtbm9kZS5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9BbWJpZW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9IZW1pc3BoZXJlTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvUG9pbnRMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9TcG90TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQXJlYUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9DdWJlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9PcnRob2dyYXBoaWNDYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Cb3guanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ2lyY2xlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NvbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ3lsaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvRG9kZWNhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0V4dHJ1ZGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSWNvc2FoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGF0aGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGluZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9PY3RhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BhcmFtZXRyaWMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUGxhbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUG9seWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9SaW5nLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NoYXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NwaGVyZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXRyYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXh0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVza25vdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UdWJlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0dyb3VwLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0VsZW1lbnRNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1NjZW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvbnZvbHV0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvY29weS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvcGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2NsZWFyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvY2xlYXItbWFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dsaXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3JlbmRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL21hc2suanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaGFkZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaG9jay13YXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL2NvcmUvZWZmZWN0LWNvbXBvc2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Qb3N0UHJvY2Vzc29yTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0V2ZW50c1BhdGNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1ZpcnR1YWxNb3VzZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Gb2dNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvU3RhdGVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvbGliL1RocmVlT3JiaXRDb250cm9scy5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9PcmJpdENvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9EeW5hbWljR2VvbWV0cnlNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL1RleHR1cmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL0FuaW1hdGlvbk1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIi4uL3NyYy9kZXByZWNhdGlvbi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZXh0ZW5kID0gKG9iamVjdCwgLi4uZXh0ZW5zaW9ucykgPT4geyAvLyAkLmV4dGVuZCBhbHRlcm5hdGl2ZSwgLi4uIGlzIHRoZSBzcHJlYWQgb3BlcmF0b3IuXG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhleHRlbnNpb24pO1xuICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBleHRlbnNpb24pO1xuXG4gICAgaWYgKCFleHRlbnNpb24pXG4gICAgICBjb250aW51ZTsgLy8gSWdub3JlIG51bGwgYW5kIHVuZGVmaW5lZCBvYmplY3RzIGFuZCBwYXJhbWV0ZXJzLlxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4dGVuc2lvbikpIHsgLy8gRG8gbm90IHRyYXZlcnNlIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICBpZiAob2JqZWN0W3Byb3BdICE9PSB1bmRlZmluZWQgJiYgZXh0ZW5zaW9uW3Byb3BdXG4gICAgICAgICYmIG9iamVjdFtwcm9wXS50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAmJiBleHRlbnNpb25bcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgLy8gR29lcyBkZWVwIG9ubHkgaWYgb2JqZWN0W3Byb3BdIGFuZCBleHRlbnNpb25bcHJvcF0gYXJlIGJvdGggb2JqZWN0cyAhXG4gICAgICAgIGlmIChleHRlbnNpb25bcHJvcF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkgZXh0ZW5kKG9iamVjdFtwcm9wXSwgZXh0ZW5zaW9uW3Byb3BdKTtcbiAgICAgICAgZWxzZSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF07XG4gICAgICB9IGVsc2VcbiAgICAgICAgb2JqZWN0W3Byb3BdID0gdHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgPyBleHRlbnNpb25bcHJvcF0gOiBvYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXS5zbGljZSgpOyAvLyBBZGQgdmFsdWVzIHRoYXQgZG8gbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsImV4cG9ydCBjb25zdCBpbnN0cnVjdCA9IChhcnJheSwgaW5zdEFycmF5KSA9PiB7XG4gIGNvbnN0IHRlbXBPYmplY3QgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdEFycmF5Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgY29uc3QgZ3VpZGUgPSBpbnN0QXJyYXlbaV07XG5cbiAgICB0ZW1wT2JqZWN0W2d1aWRlXSA9IGFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBPYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtRGF0YSA9IChvYmplY3QsIGluc3RydWN0aW9ucykgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0cnVjdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkpXG4gICAgICBvYmplY3Rba2V5XSA9IGluc3RydWN0KG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gICAgZWxzZSBpZiAob2JqZWN0W2tleV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgIShBcnJheS5pc0FycmF5KGluc3RydWN0aW9uc1trZXldKSkpXG4gICAgICBvYmplY3Rba2V5XSA9IHRyYW5zZm9ybURhdGEob2JqZWN0W2tleV0sIGluc3RydWN0aW9uc1trZXldKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdG9BcnJheSA9IChvYmplY3QsIGluc3RydWN0aW9uKSA9PiB7XG4gIGNvbnN0IHRlbXBBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnN0cnVjdGlvbi5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdHJ1Y3Rpb25baV07XG5cbiAgICB0ZW1wQXJyYXlbaV0gPSBvYmplY3RbZ3VpZGVdO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGNvbXBvbmVudCk7XG5cbiAgICB0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY3lFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgYWN0aXZlTW9kdWxlLCBkZXBlbmRlbmN5TW9kdWxlID0gZmFsc2UpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcbiAgICBpZiAoY29uc29sZSAmJiBkZXBlbmRlbmN5TW9kdWxlKSBjb25zb2xlLmVycm9yKCdEZXBlbmRlbmN5IHB1Ymxpc2hlZCBieSBtb2R1bGU6JywgZGVwZW5kZW5jeU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnRGVwZW5kZW5jeUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQsIGFjdGl2ZU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdDb21wb25lbnQ6JywgY29tcG9uZW50KTtcbiAgICBpZiAoY29uc29sZSAmJiBhY3RpdmVNb2R1bGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcblxuICAgIHRoaXMubmFtZSA9ICdNYW5hZ2VyRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge01hbmFnZXJFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgcjg0LiBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG4vKipcbiAqIEBjbGFzcyBNb2R1bGVTeXN0ZW1cbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gIFByb3ZpZGVzIEFQSSBmb3IgY2xhc3NlcyB0aGF0IHdpbGwgdXNlIE1vZHVsZXMuPGJyLz5cbiAqIFRoaXMgY2xhc3MgaW5jbHVkZXMgYmFzaWMgZXZlbnQgc3lzdGVtIHdpdGggdGhvc2Ugc3VwcG9ydGVkIG1ldGhvZHM6XG4gKiA8cHJlPi5vbigpPC9wcmU+PHByZT4ub2ZmKCk8L3ByZT48cHJlPi5lbWl0KCk8L3ByZT5cbiAqIEBleHRlbmRzIEV2ZW50c1xuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0gZXh0ZW5kcyBFdmVudHMge1xuICAvLyBJTlRFR1JBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGludGVncmF0ZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBhcHBsaWVzIGFsbCBtb2R1bGVzIGZyb20gLm1vZHVsZXMgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2VdIElmIHNvdXJjZSAoc2hvdWxkIGJlIGEgY29tcG9uZW50KSBpcyBwcm92aWRlZCwgd2lsbCByZXBsYWNlIC5tb2R1bGVzIHdpdGggc291cmNlJ3Mgb25lIGJlZm9yZSBleGVjdXRpbmcgbW9kdWxlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpIHtcbiAgICBpZiAoIXRoaXMubW9kdWxlcyAmJiAhc291cmNlKSByZXR1cm47XG4gICAgaWYgKHNvdXJjZSkgdGhpcy5tb2R1bGVzID0gc291cmNlLm1vZHVsZXMuc2xpY2UoMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKVxuICAgICAgdGhpcy5hcHBseU1vZHVsZSh0aGlzLm1vZHVsZXNbaV0sIGZhbHNlKTtcblxuICAgIGlmIChzb3VyY2UpIHRoaXMuYXBwbHlCcmlkZ2Uoe29uQ29weTogc291cmNlfSk7XG4gIH1cblxuICAvLyBBUFBMWUlORyBNT0RVTEUgKC4uLmFuZCBhIFwiYnJpZGdlXCIgZm9yIG1vZHVsZSlcblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUJyaWRnZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2VzIGNvbXBvbmVudC1zcGVjaWZpYyBBUEkgdG8gd29yayB3aXRoIG1vZHVsZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBicmlkZ2VNYXBcbiAgICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIG9iamVjdCB3aXRoIG1vZGlmaWVkIHZhbHVlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlCcmlkZ2UoYnJpZGdlTWFwID0ge30pIHtcbiAgICBjb25zdCBtb2R1bGVzID0gdGhpcy5tb2R1bGVzO1xuICAgIGlmICghbW9kdWxlcykgcmV0dXJuIGJyaWRnZU1hcDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBicmlkZ2VNYXApIHtcbiAgICAgICAgaWYgKGJyaWRnZU1hcFtrZXldKSB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlc1tpXTtcblxuICAgICAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLmJyaWRnZSAmJiBtb2R1bGUuYnJpZGdlW2tleV0pXG4gICAgICAgICAgICBicmlkZ2VNYXBba2V5XSA9IG1vZHVsZS5icmlkZ2Vba2V5XS5hcHBseSh0aGlzLCBbYnJpZGdlTWFwW2tleV0sIG1vZHVsZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJyaWRnZU1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5Q29tbWFuZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIC5hcHBseUNvbW1hbmQgcnVucyBhIG1ldGhvZCBjYWxsZWQgYG5hbWVgIG9uIGFsbCBtb2R1bGVzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgbWV0aG9kIG5hbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYj0oZnVuYywgbW9kdWxlU2NvcGUpID0+IGZ1bmMuYXBwbHkodGhpcywgW21vZHVsZVNjb3BlXSldIEhvdyB0aGUgZnVuY3Rpb24gaXMgd3JhcHBlZC9cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlDb21tYW5kKG5hbWUsIGNiID0gKGZ1bmMsIG1vZHVsZVNjb3BlKSA9PiBmdW5jLmFwcGx5KHRoaXMsIFttb2R1bGVTY29wZV0pKSB7XG4gICAgY29uc3QgbW9kdWxlcyA9IHRoaXMubW9kdWxlcztcbiAgICBpZiAoIW1vZHVsZXMpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBjb25zdCBtb2R1bGUgPSBtb2R1bGVzW2ldO1xuICAgICAgaWYgKG5hbWUgaW4gbW9kdWxlKSBjYihtb2R1bGVbbmFtZV0sIG1vZHVsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlNb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiAuYXBwbHlNb2R1bGUgaXMgYWxzbyB1c2VkIGluIC5pbnRlZ3JhdGVNb2R1bGVzKCkgZnVuY3Rpb24uXG4gICAqIEl0IGRvZXMgZXhhY3RseSB3aGF0IGl0cyBuYW1lIHNheXMgKGFwcGxpZXMgbW9kdWxlIHRvIGNvbXBvbmVudCBvciBhcHApLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHBhcmFtIHtCb29sZWFufSBbcHVzaD10cnVlXVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIGFwcGxpZWQuXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlNb2R1bGUobW9kdWxlLCBwdXNoID0gdHJ1ZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG4gICAgaWYgKHB1c2ggJiYgdGhpcy5tb2R1bGVzKSB0aGlzLm1vZHVsZXMucHVzaChtb2R1bGUpO1xuICAgIGVsc2UgaWYgKHB1c2gpIHRoaXMubW9kdWxlcyA9IFttb2R1bGVdO1xuXG4gICAgaWYgKHRoaXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyLmFjdGl2ZShtb2R1bGUpO1xuXG4gICAgaWYgKG1vZHVsZS5tYW5hZ2VyICYmIHRoaXMubWFuYWdlcikgbW9kdWxlLm1hbmFnZXIodGhpcy5tYW5hZ2VyKTtcbiAgICBlbHNlIGlmIChtb2R1bGUubWFuYWdlcikge1xuICAgICAgdGhyb3cgbmV3IE1hbmFnZXJFcnJvcihcbiAgICAgICAgJ0NvbXBvbmVudCcsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgTW9kdWxlTWFuYWdlciB0aGF0IGlzIHR1cm5lZCBvZmYgZm9yIHRoaXMgY29tcG9uZW50YCxcbiAgICAgICAgdGhpcywgbW9kdWxlXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUuaW50ZWdyYXRlKSBtb2R1bGUuaW50ZWdyYXRlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIGFsbCBtb2R1bGVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGVzKCkge1xuICAgIHdoaWxlICh0aGlzLm1vZHVsZXMubGVuZ3RoKVxuICAgICAgdGhpcy5kaXNwb3NlTW9kdWxlKHRoaXMubW9kdWxlc1swXSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGlzcG9zZXMgb2YgdGhlIGdpdmVuIG1vZHVsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gZGlzcG9zZVxuICAgKiBAcmV0dXJuIHtNb2R1bGV9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIHJlbW92ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGUobW9kdWxlKSB7XG4gICAgaWYgKCFtb2R1bGUpIHJldHVybjtcblxuICAgIHRoaXMubW9kdWxlcy5zcGxpY2UodGhpcy5tb2R1bGVzLmluZGV4T2YobW9kdWxlKSwgMSk7XG5cbiAgICBpZiAobW9kdWxlLmRpc3Bvc2UpIG1vZHVsZS5kaXNwb3NlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvLyBQSVBFRCBNRVRIT0RcblxuICAvKipcbiAgICogQG1ldGhvZCBtb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBwaXBlZCB2ZXJzaW9uIG9mIC5hcHBseU1vZHVsZSgpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHJldHVybiB7dGhpc30gcmV0dXJucyB0aGlzIC0gYXBwL2NvbXBvbmVudFxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UGlwZWQgbW9kdWxlczwvY2FwdGlvbj5cbiAgICogY29tcG9uZW50XG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMSgpKVxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTIoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUzKCkpXG4gICAqL1xuICBtb2R1bGUobW9kdWxlKSB7XG4gICAgdGhpcy5hcHBseU1vZHVsZShtb2R1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IGJhc2VHZXRUYWcodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJlxuICAgIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUGxhaW5PYmplY3Q7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFN5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG4iLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICAgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAgICpcbiAgICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICAgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gICAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gICAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gICAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAgICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICAgKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICAgKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gICAqL1xufTtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn0iLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufSIsIi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn0iLCJpbXBvcnQgY3JlYXRlU3RvcmUgZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgY29tYmluZVJlZHVjZXJzIGZyb20gJy4vY29tYmluZVJlZHVjZXJzJztcbmltcG9ydCBiaW5kQWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi9iaW5kQWN0aW9uQ3JlYXRvcnMnO1xuaW1wb3J0IGFwcGx5TWlkZGxld2FyZSBmcm9tICcuL2FwcGx5TWlkZGxld2FyZSc7XG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZygnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGJpbmRBY3Rpb25DcmVhdG9ycywgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH07IiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtEZXBlbmRlbmN5RXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgTW9kdWxlTWFuYWdlclxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgaGFuZGxlclxuICogQGRlc2NyaXB0aW9uICBTb2x2ZXMgbW9kdWxlcyBkZXBlbmRlbmNpZXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG9iamVjdDtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuXG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKChzdGF0ZSA9IFt7fSwgJyddLCBhY3Rpb24pID0+IHtcbiAgICAgIHN0YXRlWzBdW2FjdGlvbi5rZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICBzdGF0ZVsxXSA9IGFjdGlvbi5rZXk7XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWN0aXZlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyAuY3VycmVudE1vZHVsZSB0byBwcm92aWRlZCBtb2R1bGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBtYWtlIGN1cnJlbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGFjdGl2ZShtb2R1bGUpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldCdzIC5jdXJyZW50TW9kdWxlIHRvIG51bGwuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmaW5lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lIHRoZSBtb2R1bGUgaW4gbWFuYWdlclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbW9kdWxlIG5hbWVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGRlZmluZShuYW1lKSB7XG4gICAgdGhpcy5tb2R1bGVzW25hbWVdID0gdGhpcy5jdXJyZW50TW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXNlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBkZWZpbmVkIG1vZHVsZSBmcm9tIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1c2UobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1vZHVsZXNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBbiBhbGlhcyBmb3IgLmFkZCgpIDxici8+PGJyLz5cbiAgICogVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSBrbm93IHRoYXQgeW91IHdpbGwgb3ZlcndyaXRlIGV4aXN0aW5nIGRlcGVuZGVuY3kuPGJyLz5cbiAgICogVXNlIGl0IGluIHlvdXIgYXBwLCBidXQgbm90IGluIG1vZHVsZSB0aGF0IHlvdSBwcm92aWRlIHRvIG90aGVyIHBlb3BsZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHRoZSB2YWx1ZSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgc2V0KGtleSwgZGF0YSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ0FERCcsXG4gICAgICBrZXksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGRlcGVuZGVuY3kgaW4gc3RvcmUgb2JqZWN0LCBieSBrZXkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKiBAcmV0dXJuIHtPYmplY3R8TW9kdWxlfVxuICAgKiBAdGhyb3dzIHtEZXBlbmRlbmN5RXJyb3J9IGlmIGRlcGVuZGVuY3kgaXMgbm90IGluIHRoZSBzdG9yZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXQgdGhlICdoZWxsbycgZGVwZW5kZW5jeTwvY2FwdGlvbj5cbiAgICogbWFuYWdlci5nZXQoJ2hlbGxvJyk7IC8vIC0+IHt3b3JsZDogdHJ1ZX1cbiAgICovXG4gIGdldChrZXkpIHtcbiAgICBpZiAoIXRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKSB7XG4gICAgICB0aHJvdyBuZXcgRGVwZW5kZW5jeUVycm9yKFxuICAgICAgICAnTW9kdWxlTWFuYWdlcicsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgJyR7a2V5fScgZGVwZW5kZW5jeWAsXG4gICAgICAgIHRoaXMuY3VycmVudE1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBoYXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHdoZXRoZXIgbWFuYWdlciBoYXMgYSBkZXBlbmRlbmN5IHdpdGggdGhlIGdpdmVuIGtleVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q2hlY2sgd2hldGhlciB0aGUgc3RvcmUgaGFzIHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuaGFzKCdoZWxsbycpOyAvLyAtPiB0cnVlXG4gICAqL1xuICBoYXMoa2V5KSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyBkZXBzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbZGVwc01hcD17fV1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHVwZGF0ZShkZXBzTWFwID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBbZGF0YSwgY2hhbmdlZEtleV0gPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGRlcHNNYXBbY2hhbmdlZEtleV07XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YVtjaGFuZ2VkS2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGFsaWFzIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXIjc2V0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhZGQoLi4uZGF0YSkge1xuICAgIGNvbnNvbGUud2FybignLmFkZCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBVc2UgLnNldCgpIGluc3RlYWQnKTtcbiAgICByZXR1cm4gdGhpcy5zZXQoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXF1aXJlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmVxdWlyZSBtb2R1bGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgRGVmaW5lZCBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZHVsZUV4ZWN1dG9yIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhcHBsaWVkIG1vZHVsZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVxdWlyZShuYW1lLCBtb2R1bGVFeGVjdXRvcikge1xuICAgIGlmICh0aGlzLnVzZShuYW1lKSA9PT0gdW5kZWZpbmVkKSB0aGlzLmhhbmRsZXIuYXBwbHlNb2R1bGUobW9kdWxlRXhlY3V0b3IoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7ZXh0ZW5kLCB0cmFuc2Zvcm1EYXRhfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5pbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuaW1wb3J0IHtNb2R1bGVNYW5hZ2VyfSBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuaW1wb3J0IHtNYW5hZ2VyRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCB7XG4gICAqICAgbW9kdWxlczogW10sXG4gICAqICAgbWFuYWdlcjogdHJ1ZVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgbW9kdWxlczogbnVsbCxcbiAgICBtYW5hZ2VyOiB0cnVlXG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge31cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7fTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgcHJvbWlzZXMgdGhhdCBzaG91bGQgYmUgcmVzb2x2ZWQgYmVmb3JlIENvbXBvbmVudCBpcyByZWFkeS5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNfd2FpdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3dhaXQgPSBbXTsgLy8gQ29sbGVjdGlvbiBvZiBwcm9taXNlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgbW9kdWxlc2AuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbW9kdWxlc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBtb2R1bGVzID0gW107IC8vIENvbGxlY3Rpb24gb2YgbW9kdWxlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgY2hpbGRgIENvbXBvbmVudHMuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjY2hpbGRyZW5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2hpbGRyZW4gPSBbXTsgLy8gRm9yIGtlZXBpbmcgY2hpbGRyZW4gY29tcG9uZW50cztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZGVmYXVsdHMgPSBDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gQXBwbHkgcG9seWZpbGxlZCBwYXJhbWV0ZXJzIHRvIC5wYXJhbXM7XG4gICAgdGhpcy5wYXJhbXMgPSBleHRlbmQodHJhbnNmb3JtRGF0YShwYXJhbXMsIGluc3RydWN0aW9ucyksIGRlZmF1bHRzKTtcbiAgICBpZiAodGhpcy5wYXJhbXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIoKTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHRoaXMucGFyYW1zLm1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdhaXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXYWl0IGZvciBhIHByb21pc2UuXG4gICAqIEBwYXJhbSB7UHJvbWlzZX0gW3Byb21pc2VdIC0gVGhlIHByb21pc2UgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gYSBxdWV1ZS5cbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgd2FpdChwcm9taXNlKSB7XG4gICAgaWYgKHByb21pc2UpIHRoaXMuX3dhaXQucHVzaChwcm9taXNlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fd2FpdCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZlclxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGUgYGZ1bmNgIChDYWxsYmFjaykgd2hlbiBDb21wb25lbnQgaXMgcmVhZHkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBDYWxsYmFjay5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgZGVmZXIoZnVuYykge1xuICAgIGlmICh0aGlzLmlzRGVmZmVyZWQpIHRoaXMud2FpdCgpLnRoZW4oKCkgPT4gZnVuYyh0aGlzKSk7XG4gICAgZWxzZSBmdW5jKHRoaXMpO1xuICB9XG5cbiAgLy8gUEFSQU1FVEVSU1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVBhcmFtc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgcGFyYW1ldGVycyBvZiB0aGUgQ29tcG9uZW50LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFBhcmFtcyBvZiB0aGlzIENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICB1cGRhdGVQYXJhbXMocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IGV4dGVuZChwYXJhbXMsIHRoaXMucGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXM7XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ2xvbmUgdGhpcyBjb21wb25lbnRcbiAgICogQHJldHVybiB7b2JqZWN0fSBhIGNsb25lZCBjb21wb25lbnQgd2l0aCBhbGwgaXRzIHNvdXJjZSBjb21wb25lbnQnIHBhcmFtcyBjb3BpZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnBhcmFtcykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSBuYXRpdmUgYW5kIGludGVncmF0ZSBgbW9kdWxlc2AgdG8gaXQuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBzb3VyY2UgLSBTb3VyY2UgY29tcG9uZW50IHRoYXQgaXMgdXNlZCBmb3IgYGNvcHkoKWAgYWN0aW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplXSAtIENhbGxiYWNrIGV4ZWN1dGVkIGJlZm9yZSBtb2R1bGVzIGludGVncmF0aW9uIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge3RoaXN9IENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSwgY3VzdG9taXplKSB7XG4gICAgdGhpcy5wYXJhbXMgPSB7Li4uc291cmNlLnBhcmFtc307XG5cbiAgICBpZiAoc291cmNlLm5hdGl2ZSkgdGhpcy5uYXRpdmUgPSBzb3VyY2UubmF0aXZlLmNsb25lKHNvdXJjZS5wYXJhbXMpO1xuICAgIGlmIChjdXN0b21pemUpIGN1c3RvbWl6ZSgpO1xuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhZGRlZCBhcyBhIGBjaGlsZGAuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGRvbmUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGFkZChvYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge25hdGl2ZX0gPSBvYmplY3Q7XG4gICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9taXNlID0gdGhpcy5hcHBseUJyaWRnZSh7b25BZGQ6IG9iamVjdH0pLm9uQWRkO1xuXG4gICAgICAgIGNvbnN0IHJlc29sdmVyID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlLmFkZChuYXRpdmUpO1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhZGRQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgYWRkUHJvbWlzZS50aGVuKHJlc29sdmVyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhICoqY2hpbGQqKiBvZiB0aGlzIENvbXBvbmVudC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgcmVtb3ZlKG9iamVjdCkge1xuICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMubmF0aXZlLnJlbW92ZShvYmplY3QubmF0aXZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZFRvXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBgdGhpc2AgQ29tcG9uZW50IHRvIHNwZWNpZmllZCBgQXBwYC9gQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHdpbGwgYmUgYSBwYXJlbnQgb2YgYHRoaXNgLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBhZGRUbyhvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0LmFkZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBgYXN5bmNgIChgd2FpdGAgcHJvbWlzZXMgYXJlIG1vcmUgdGhhbiBgMGApLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaXNEZWZmZXJlZFxuICAgKi9cbiAgZ2V0IGlzRGVmZmVyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhaXQubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgTW9kdWxlTWFuYWdlcmAgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqIEBtZW1iZXIge01vZHVsZU1hbmFnZXJ9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNtYW5hZ2VyXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICovXG4gIGdldCBtYW5hZ2VyKCkge1xuICAgIGlmICh0aGlzLl9tYW5hZ2VyKSByZXR1cm4gdGhpcy5fbWFuYWdlcjtcblxuICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAnQ29tcG9uZW50JyxcbiAgICAgIGBNb2R1bGVNYW5hZ2VyIGlzIG5vdCB1c2VkIGluIHRoaXMgY29tcG9uZW50LiAnbWFuYWdlcicgcGFyYW1ldGVyIHNob3VsZCBiZSBzZXQgYXMgJ3RydWUnYCxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgc2V0IG1hbmFnZXIobWFuYWdlcikge1xuICAgIHRoaXMuX21hbmFnZXIgPSBtYW5hZ2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBuYXRpdmVgIG9iamVjdCB1c2VkIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbmF0aXZlXG4gICAqL1xuICBnZXQgbmF0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cblxuICBzZXQgbmF0aXZlKG1lc2gpIHtcbiAgICB0aGlzLl9uYXRpdmUgPSBtZXNoO1xuICAgIHRoaXMuX25hdGl2ZS5jb21wb25lbnQgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29tcG9uZW50XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGF0dHJpYnV0ZXMoLi4ubWFwcGVycykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWFwcGVyID0gbWFwcGVyc1tpXTtcblxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtYXBwZXIubWFwLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG1hcHBlci5tYXBba107XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldC5wcm90b3R5cGUsIGF0dHJpYnV0ZSwge1xuICAgICAgICAgIGdldDogbWFwcGVyLmdldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIHNldDogbWFwcGVyLnNldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogbWFwcGVyLmNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBtYXBwZXIuZW51bWVyYWJsZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KC4uLm1hcCkge1xuICByZXR1cm4ge1xuICAgIG1hcCxcbiAgICBnZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlW25hbWVdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlW25hbWVdLmNvcHkodmFsdWUpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXJyb3IoLi4ubWFwKSB7XG4gIHJldHVybiB7XG4gICAgbWFwLFxuICAgIGdldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVbbmFtZV07XG4gICAgICB9O1xuICAgIH0sXG4gICAgc2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufVxuIiwiaW1wb3J0IHtNZXNofSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHksIG1pcnJvcn0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAnc2NhbGUnKSxcbiAgbWlycm9yKCdtYXRlcmlhbCcsICdnZW9tZXRyeScpXG4pXG4vKipcbiAqIEBjbGFzcyBNZXNoQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBNZXNoQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICogICBnZW9tZXRyeToge30sXG4gICAqICAgbWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHNoYWRvdzoge1xuICAgKiAgICAgY2FzdDogdHJ1ZSxcbiAgICogICAgIHJlY2VpdmU6IHRydWVcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICBzY2FsZToge3g6IDEsIHk6IDEsIHo6IDF9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcbiAgICBnZW9tZXRyeToge30sXG4gICAgbWF0ZXJpYWw6IGZhbHNlLFxuXG4gICAgc2hhZG93OiB7XG4gICAgICBjYXN0OiB0cnVlLFxuICAgICAgcmVjZWl2ZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgc2NhbGU6IHt4OiAxLCB5OiAxLCB6OiAxfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIC8vIENVU1RPTSBHRU9NRVRSWSBIQU5ETElOR1xuXG4gIHN0YXRpYyBjdXN0b20oZ2VvbSwgY29uc3RydWN0b3IgPSBNZXNoKSB7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gICAgICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgICAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBnZW9tLFxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBjb25zdHJ1Y3RvcihnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShnZW9tLCBwYXJhbXMsIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoTWVzaENvbXBvbmVudC5jdXN0b20oZ2VvbSwgY29uc3RydWN0b3IpKShwYXJhbXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IE1lc2hDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IE1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdGhpcy53YWl0KGJ1aWxkKTtcblxuICAgICAgICB0aGlzLndhaXQobmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgICAgICB0aGlzLndyYXAoKS50aGVuKHJlc29sdmUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuICAgICAgICB0aGlzLndhaXQodGhpcy53cmFwKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXBwbHlDb21tYW5kKCdwb3N0SW50ZWdyYXRlJyk7XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gVE9ETzogRml4IGRlZmVyIHdpdGggcGh5c2ljc1xuICAgICAgLy8gdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICBjb25zdCB7cG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZSwgc2hhZG93fSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnopO1xuICAgICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUueCwgc2NhbGUueSwgc2NhbGUueik7XG5cbiAgICAgIHRoaXMubmF0aXZlLmNhc3RTaGFkb3cgPSBzaGFkb3cuY2FzdDtcbiAgICAgIHRoaXMubmF0aXZlLnJlY2VpdmVTaGFkb3cgPSBzaGFkb3cucmVjZWl2ZTtcblxuICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAvLyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBNZXNoQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTWVzaENvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7TWVzaENvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGNsb25lKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgIGNvbnN0IGRlc3QgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcblxuICAgIGlmIChnZW9tZXRyeSkgZGVzdC5nZW9tZXRyeSA9IGRlc3QuZ2VvbWV0cnkuY2xvbmUoKTtcbiAgICBpZiAobWF0ZXJpYWwpIGRlc3QubWF0ZXJpYWwgPSBkZXN0Lm1hdGVyaWFsLmNsb25lKCk7XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBNZXNoQ29tcG9uZW50XG59O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5fSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICd0YXJnZXQnKVxuKVxuLyoqXG4gKiBAY2xhc3MgTGlnaHRDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExpZ2h0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqXG4gICAqICAgc2hhZG93OiB7XG4gICAqICAgICBjYXN0OiB0cnVlLFxuICAgKlxuICAgKiAgICAgYmlhczogMCxcbiAgICogICAgIHJhZGl1czogMSxcbiAgICpcbiAgICogICAgIG1hcFNpemU6IHtcbiAgICogICAgICAgd2lkdGg6IDEwMjQsXG4gICAqICAgICAgIGhlaWdodDogMTAyNFxuICAgKiAgICAgfSxcbiAgICpcbiAgICogICAgIGNhbWVyYToge1xuICAgKiAgICAgICBuZWFyOiB0cnVlLFxuICAgKiAgICAgICBmYXI6IDQwMCxcbiAgICogICAgICAgZm92OiA5MCxcbiAgICpcbiAgICogICAgICAgdG9wOiAyMDAsXG4gICAqICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICogICAgICAgbGVmdDogLTIwMCxcbiAgICogICAgICAgcmlnaHQ6IDIwMFxuICAgKiAgICAgfVxuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcblxuICAgIHNoYWRvdzoge1xuICAgICAgY2FzdDogdHJ1ZSxcblxuICAgICAgYmlhczogMCxcbiAgICAgIHJhZGl1czogMSxcblxuICAgICAgbWFwU2l6ZToge1xuICAgICAgICB3aWR0aDogMTAyNCxcbiAgICAgICAgaGVpZ2h0OiAxMDI0XG4gICAgICB9LFxuXG4gICAgICBjYW1lcmE6IHtcbiAgICAgICAgbmVhcjogdHJ1ZSxcbiAgICAgICAgZmFyOiA0MDAsXG4gICAgICAgIGZvdjogOTAsXG5cbiAgICAgICAgdG9wOiAyMDAsXG4gICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICAgICAgbGVmdDogLTIwMCxcbiAgICAgICAgcmlnaHQ6IDIwMFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IExpZ2h0Q29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ0xpZ2h0Q29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHRoaXMubmF0aXZlID0gYnVpbGQ7XG5cbiAgICAgIHRoaXMud2FpdCh0aGlzLndyYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseUNvbW1hbmQoJ3Bvc3RJbnRlZ3JhdGUnKTtcbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9uLCByb3RhdGlvbn0gPSB0aGlzLnBhcmFtcztcblxuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XG5cbiAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFNoYWRvd1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHNoYWRvdyBwcm9wZXJ0aWVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcFNoYWRvdygpIHtcbiAgICBjb25zdCB7bmF0aXZlLCBwYXJhbXM6IHtzaGFkb3d9fSA9IHRoaXM7XG5cbiAgICBuYXRpdmUuY2FzdFNoYWRvdyA9IHNoYWRvdy5jYXN0O1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IHNoYWRvdy5tYXBTaXplLndpZHRoO1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSBzaGFkb3cubWFwU2l6ZS5oZWlnaHQ7XG4gICAgbmF0aXZlLnNoYWRvdy5iaWFzID0gc2hhZG93LmJpYXM7XG4gICAgbmF0aXZlLnNoYWRvdy5yYWRpdXMgPSBzaGFkb3cucmFkaXVzO1xuXG4gICAgY29uc3Qgc2hhZG93Q2FtZXJhID0gbmF0aXZlLnNoYWRvdy5jYW1lcmE7XG4gICAgY29uc3QgY2FtZXJhID0gc2hhZG93LmNhbWVyYTtcblxuICAgIHNoYWRvd0NhbWVyYS5uZWFyID0gY2FtZXJhLm5lYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZhciA9IGNhbWVyYS5mYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZvdiA9IGNhbWVyYS5mb3Y7XG5cbiAgICBzaGFkb3dDYW1lcmEubGVmdCA9IGNhbWVyYS5sZWZ0O1xuICAgIHNoYWRvd0NhbWVyYS5yaWdodCA9IGNhbWVyYS5yaWdodDtcbiAgICBzaGFkb3dDYW1lcmEudG9wID0gY2FtZXJhLnRvcDtcbiAgICBzaGFkb3dDYW1lcmEuYm90dG9tID0gY2FtZXJhLmJvdHRvbTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBMaWdodENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTGlnaHRDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge0xpZ2h0Q29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMaWdodENvbXBvbmVudFxufTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weX0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAndGFyZ2V0Jylcbilcbi8qKlxuICogQGNsYXNzIENhbWVyYUNvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ2FtZXJhQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBDYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENhbWVyYUNvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgdGhpcy5uYXRpdmUgPSBidWlsZDtcblxuICAgICAgdGhpcy53YWl0KHRoaXMud3JhcCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5Q29tbWFuZCgncG9zdEludGVncmF0ZScpO1xuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQodGhpcy5wYXJhbXMucG9zaXRpb24ueCwgdGhpcy5wYXJhbXMucG9zaXRpb24ueSwgdGhpcy5wYXJhbXMucG9zaXRpb24ueik7XG4gICAgICAgIHRoaXMucm90YXRpb24uc2V0KHRoaXMucGFyYW1zLnJvdGF0aW9uLngsIHRoaXMucGFyYW1zLnJvdGF0aW9uLnksIHRoaXMucGFyYW1zLnJvdGF0aW9uLnopO1xuXG4gICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gQ2FtZXJhQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgQ2FtZXJhQ29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtDYW1lcmFDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDYW1lcmFDb21wb25lbnRcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuICByZXR1cm4gdGltZVswXSAqIDFlMyArIHRpbWVbMV0gLyAxZTY7XG59O1xuIiwiaW1wb3J0IHByZXNlbnQgZnJvbSAncHJlc2VudCc7XG5cbmV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICBnbG9iYWwucGVyZm9ybWFuY2UgPSB7XG4gICAgbm93OiBwcmVzZW50XG4gIH07XG59XG4iLCJpbXBvcnQge3ZlcnNpb259IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vcG9seWZpbGwnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcblxuLyoqXG4gKiBAY2xhc3MgQXBwXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gcHJlcGFyZSBhIHdvcmxkIHNjZW5lLCBzZXR1cCBwaHlzaWNzLCBjYW1lcmEsIHJlbmRlcmVyIGFuZCBhbGwgb3RoZXIgdGhpbmdzIHRoYXQgeW91IHVzdWFsbHkgZG8gYmVmb3JlIG1ha2luZyBtZXNoZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbbW9kdWxlcz1bXV0gLSBBcnJheSBvZiBNb2R1bGVzXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogU2ltdWxhdGUgZmxhZ1xuICAgKiBAZGVzY3JpcHRpb24gU2FtZSBhcyAudXBkYXRlRW5hYmxlZCwgYnV0IGZvciBwaHlzaWNzLiBEZWZpbmVzIGlmIHBoeXNpY3MgaXMgc2ltdWxhdGVkIGVhY2ggZnJhbWUuXG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkFwcCNzaW11bGF0ZVxuICAgKiBAcHVibGljXG4gICAqL1xuICBzaW11bGF0ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lcyB3aGV0aGVyIHRoZSBzY2VuZSBzaG91bGQgcmVuZGVyIG9yIG5vdFxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjdXBkYXRlRW5hYmxlZFxuICAgKiBAcHVibGljXG4gICAqL1xuICB1cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcblxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIodGhpcyk7XG4gICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcztcblxuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcygpO1xuICB9XG5cbiAgLy8gQ09OVFJPTFMgJiBVUERBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0YXJ0XG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydCByZW5kZXJpbmcgbG9vcCBhbmQgcGh5c2ljcyBzaW11bGF0aW9uIChpZiB5b3UgdXNlIHZlcnNpb24gd2l0aCBwaHlzaWNzKS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgcmVxdWVzdEFuaW1GcmFtZSA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gc3lzdGVtLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3lzdGVtLndpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB7bG9vcHMsIHVwZGF0ZUVuYWJsZWR9ID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHByb2Nlc3MpO1xuICAgICAgaWYgKCF1cGRhdGVFbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IGxvb3BzLmxlbmd0aDsgaSA8IGxsOyBpKyspIHtcbiAgICAgICAgY29uc3QgZSA9IGxvb3BzW2ldO1xuICAgICAgICBpZiAoZS5lbmFibGVkKSBlLmV4ZWN1dGUoZS5jbG9jayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyByZW5kZXJpbmcgbG9vcHNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnVwZGF0ZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZExvb3BcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgbG9vcCB0byB0aGlzIGFwcC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGxvb3AgLSB0aGUgbG9vcCB0byBhZGRcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkFkZGluZyBhIGxvb3AgdG8gYW4gYXBwPC9jYXB0aW9uPlxuICAgKiBjb25zdCBsb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgKiAgLy8gLi4uXG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4gICAqXG4gICAqIGFwcC5hZGRMb29wKGxvb3ApO1xuICAgKiBsb29wLnN0YXJ0KCk7XG4gICAqL1xuICBhZGRMb29wKGxvb3ApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmxvb3BzLnB1c2gobG9vcCk7XG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlTG9vcFxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBsb29wIGZyb20gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgcmVtb3ZlTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvb3BzLmluZGV4T2YobG9vcCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLmxvb3BzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgIHJlc29sdmUobG9vcCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXQoa2V5KTtcbiAgfVxuXG4gIHVzZShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLnVzZShrZXkpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsImltcG9ydCB7Q2xvY2t9IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMsIHVzZUNsb2NrID0gdHJ1ZSkge1xuICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgdGhpcy5jbG9jayA9IHVzZUNsb2NrID8gbmV3IENsb2NrKCkgOiBudWxsO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQ09OVFJPTFNcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0cyB0aGlzIGxvb3AsIGNsb2NrIGlmIGl0IGhhcyBvbmUuIFdvbid0IGRvIGFueXRoaW5nIGlmIGxvb3AgZW5hYmxlZCBhbHJlYWR5LlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gYWRkIHRoaXMgbG9vcCB0bywgaWYgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Mb29wXG4gICAqL1xuICBzdGFydCh3b3JsZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh3b3JsZCkgd29ybGQuYWRkTG9vcCh0aGlzKTtcblxuICAgIGlmICh0aGlzLmNsb2NrKSB0aGlzLmNsb2NrLnN0YXJ0KCk7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0b3BcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyB0aGlzIGxvb3AgYW5kIGl0cyBjbG9jayBpZiBpdCBoYXMgb25lLCB3b24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGxvb3AgaXMgbm90IGVuYWJsZWQpXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBbd29ybGRdIGFwcCB0byByZW1vdmUgdGhpcyBsb29wIGZyb20sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RvcCh3b3JsZCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdG9wKCk7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLnJlbW92ZUxvb3AodGhpcyk7XG4gIH1cblxuICAvLyBFWEVDVVRJT05cblxuICAvKipcbiAgICogQG1ldGhvZCBleGVjdXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKiBAcmV0dXJucyB7Kn0gd2hhdGV2ZXIgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcCByZXR1cm5zXG4gICAqL1xuICBleGVjdXRlKCkge1xuICAgIHJldHVybiB0aGlzLmZ1bmModGhpcy5jbG9jayk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuIiwiaW1wb3J0IHtBbWJpZW50TGlnaHQgYXMgQW1iaWVudExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQW1iaWVudExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBBbWJpZW50TGlnaHQgaXMgYSBzaW1wbGUgY2xhc3MsIGl0IGV4dGVuZHMgTGlnaHQgYW5kIGluaGVyaXRzIGFsbCBpdHMgbWV0aG9kcy5cbiAqIEFtYmllbnRMaWdodCBjcmVhdGVzIGJhc2ljIGxpZ2h0IGFyb3VuZCBhbGwgc2NlbmUsIHNvIGl0IGRvZXNuJ3QgbmVlZCBwcm9wZXJ0aWVzIGxpa2UgcG9zIG9yIHRhcmdldC5cbiAqIEl0IHN1cHBvcnRzIG9ubHkgY29sb3IgYW5kIGludGVuc2l0eSBhcyBwYXJhbWV0ZXJzLCB3aGljaCBkZWZpbmVzIHRoZSBjb2xvciBvZiB0aGUgc3Vycm91bmRlZCBsaWdodCBhbmQgaW50ZW5zaXR5IG9mIGxpZ2h0LlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIEFtYmllbnRMaWdodCA8L2NhcHRpb24+XG4gKiBuZXcgQW1iaWVudExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8od29ybGQpO1xuICovXG5jbGFzcyBBbWJpZW50TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQW1iaWVudExpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgQW1iaWVudExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBbWJpZW50TGlnaHRcbn07XG4iLCJpbXBvcnQge0RpcmVjdGlvbmFsTGlnaHQgYXMgRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSwgRGlyZWN0aW9uYWxMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERpcmVjdGlvbmFsTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIERpcmVjdGluYWxMaWdodCBjcmVhdGVzIGEgbGlnaHQgdGhhdCBzaGluZXMgZnJvbSBhIHNwZWNpZmljIGRpcmVjdGlvbiBub3QgZnJvbSBhIHNwZWNpZmljIHBvc2l0aW9uLjxici8+PGJyLz5cbiAqIFRoaXMgbGlnaHQgd2lsbCBiZWhhdmUgYXMgdGhvdWdoIGl0IGlzIGluZmluaXRlbHkgZmFyIGF3YXkgYW5kIHRoZSByYXlzIHByb2R1Y2VkIGZyb20gaXQgYXJlIGFsbCBwYXJhbGxlbC4gPGJyLz48YnIvPlxuICogVGhlIGJlc3QgYW5hbG9neSB3b3VsZCBiZSBhIGxpZ2h0IHNvdXJjZSB0aGF0IGFjdHMgbGlrZSB0aGUgc3VuOiB0aGUgc3VuIGlzIHNvIGZhciBhd2F5IHRoYXQgYWxsIHN1bmxpZ2h0IGhpdHRpbmcgb2JqZWN0cyBjb21lcyBmcm9tIHRoZSBzYW1lIGFuZ2xlLjxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBvcHRpb25zIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCBwYXJhbWF0ZXIsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0IHBhcmFtYXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBEaXJlY3Rpb25hbExpZ2h0IHRvIGZhbGwgZG93biBmcm9tIHZlYzMoMTAsIDIwLCAxMCkgdG8gdmVjMygwLCAwLCAwKTwvY2FwdGlvbj5cbiAqIG5ldyBEaXJlY3Rpb25hbExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMixcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMTAsIDIwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERpcmVjdGlvbmFsTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRGlyZWN0aW9uYWxMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IERpcmVjdGlvbmFsTGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIERpcmVjdGlvbmFsTGlnaHRcbn07XG4iLCJpbXBvcnQge0hlbWlzcGhlcmVMaWdodCBhcyBIZW1pc3BoZXJlTGlnaHROYXRpdmUsIEhlbWlzcGhlcmVMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEhlbWlzcGhlcmVMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gSGVtaXNwaGVyZUxpZ2h0IGlzIGEgbGlnaHQgc291cmNlIHBvc2l0aW9uZWQgZGlyZWN0bHkgYWJvdmUgdGhlIHNjZW5lLjxici8+XG4gKiBJdCBhbHNvIGRvZXNuJ3QgbmVlZCBwb3NpdGlvbiBhbmQgdGFyZ2V0IHByb3BlcnRpZXMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfbGlnaHRzX2hlbWlzcGhlcmUuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7c2t5Q29sb3I6IDB4ZmZmZmZmLCBncm91bmRDb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBIZW1pc3BoZXJlTGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgSGVtaXNwaGVyZUxpZ2h0KHtcbiAqICAgc2t5Q29sb3I6IDB4ZmYwMDAwLFxuICogICBncm91bmRDb2xvcjogMHgwMDAwZmYsXG4gKiAgIGludGVuc2l0eTogMC4yXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBIZW1pc3BoZXJlTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHNreUNvbG9yOiAweGZmZmZmZixcbiAgICBncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSGVtaXNwaGVyZUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLnNreUNvbG9yLFxuICAgICAgcGFyYW1zLmdyb3VuZENvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBIZW1pc3BoZXJlTGlnaHRcbn07XG4iLCJpbXBvcnQge1BvaW50TGlnaHQgYXMgUG9pbnRMaWdodE5hdGl2ZSwgUG9pbnRMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBvaW50TGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIFBvaW50TGlnaHQgY3JlYXRlcyBhIGxpZ2h0IGF0IGEgc3BlY2lmaWMgcG9zaXRpb24gaW4gdGhlIHNjZW5lLiBUaGUgbGlnaHQgc2hpbmVzIGluIGFsbCBkaXJlY3Rpb25zIChyb3VnaGx5IHNpbWlsYXIgdG8gYSBsaWdodCBidWxiLik8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3NpdGlvbiwgZGlzdGFuY2UgYW5kIGRlY2F5Ljxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMSwgZGlzdGFuY2U6IDEwMCwgZGVjYXk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUG9pbnRMaWdodDwvY2FwdGlvbj5cbiAqIG5ldyBQb2ludExpZ2h0KCB7XG4gKiAgIGNvbG9yOiAweGZmMDAwMCxcbiAqICAgaW50ZW5zaXR5OiAyLFxuICogICBkaXN0YW5jZTogMzAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2ludExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHM9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBkZWNheTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBvaW50TGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBQb2ludExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQb2ludExpZ2h0XG59O1xuIiwiaW1wb3J0IHtTcG90TGlnaHQgYXMgU3BvdExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BvdExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBTcG90TGlnaHQgY3JlYXRlcyBzcG90IGxpZ2h0IHRoYXQgY2FuIGNhc3Qgc2hhZG93IGluIG9uZSBkaXJlY3Rpb24uIDxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBwYXJhbWV0ZXJzIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zIGFuZCB0YXJnZXQuIDxici8+PGJyLz5cbiAqIFNwb3RMaWdodCBhZmZlY3RzIG1lc2hlcyB3aXRoIGxhbWJlcnQgYW5kIHBob25nIG1hdGVyaWFsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19zcG90bGlnaHQuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGFuZ2xlOiBNYXRoLlBJIC8gMywgZXhwb25lbnQ6IDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwb3RMaWdodCB0aGF0IGZhbGxzIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgU3BvdExpZ2h0KHtcbiAqICAgY29sb3I6IDB4MDBmZjAwLFxuICogICBpbnRlbnNpdHk6IDMsXG4gKiAgIGRpc3RhbmNlOiAxMDAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTcG90TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBhbmdsZTogTWF0aC5QSSAvIDMsXG4gICAgZXhwb25lbnQ6IDAsXG4gICAgZGVjYXk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU3BvdExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgU3BvdExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5hbmdsZSxcbiAgICAgIHBhcmFtcy5leHBvbmVudCxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcG90TGlnaHRcbn07XG4iLCJpbXBvcnQge1JlY3RBcmVhTGlnaHQgYXMgUmVjdEFyZWFMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbmNsYXNzIEFyZWFMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMSxcbiAgICB3aWR0aDogMTAsXG4gICAgaGVpZ2h0OiAxMFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBBcmVhTGlnaHQuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBSZWN0QXJlYUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy53aWR0aCxcbiAgICAgIHBhcmFtcy5oZWlnaHRcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQXJlYUxpZ2h0XG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9saWdodHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQW1iaWVudExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vRGlyZWN0aW9uYWxMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0hlbWlzcGhlcmVMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL1BvaW50TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9TcG90TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9BcmVhTGlnaHQnO1xuIiwiaW1wb3J0IHtDdWJlQ2FtZXJhIGFzIEN1YmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN1YmVDYW1lcmFcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIDYgY2FtZXJhcyB0aGF0IHJlbmRlciB0byBhIFdlYkdMUmVuZGVyVGFyZ2V0Q3ViZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlcyBhIEN1YmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgQ3ViZUNhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGN1YmVSZXNvbHV0aW9uOiAyNTZcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KTtcbiAqXG4gKiBhcHAuY2FtZXJhID0gY2FtZXJhO1xuICovXG5jbGFzcyBDdWJlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLkN1YmVDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgY2FtZXJhOiB7XG4gICAqICAgICBuZWFyOiAxLFxuICAgKiAgICAgZmFyOiAxMDAwLFxuICAgKiAgICAgY3ViZVJlc29sdXRpb246IDEyOFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ3ViZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBDdWJlQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyLFxuICAgICAgcGFyYW1zLmN1YmVSZXNvbHV0aW9uXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDdWJlQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtPcnRob2dyYXBoaWNDYW1lcmEgYXMgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uLy4uL3BvbHlmaWxsJztcblxuLyoqXG4gKiBAY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggb3J0aG9ncmFwaGljIHByb2plY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gT3J0aG9ncmFwaGljQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogNTBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5PcnRob2dyYXBoaWNDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgbmVhcjogMSxcbiAgICogICBmYXI6IDEwMDAsXG4gICAqICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAqICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAqICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICogICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBPcnRob2dyYXBoaWNDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLmxlZnQsXG4gICAgICBwYXJhbXMucmlnaHQsXG4gICAgICBwYXJhbXMudG9wLFxuICAgICAgcGFyYW1zLmJvdHRvbSxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgT3J0aG9ncmFwaGljQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYSBhcyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggcGVyc3BlY3RpdmUgcHJvamVjdGlvbi5cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbiBQZXJzcGVjdGl2ZUNhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSh7XG4gKiAgIGZvdjogNzUsXG4gKiAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmEgZXh0ZW5kcyBDYW1lcmFDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLlBlcnNwZWN0aXZlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGZvdjogNzUsXG4gICAqICAgYXNwZWN0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBmb3Y6IDc1LFxuICAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQZXJzcGVjdGl2ZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5mb3YsXG4gICAgICBwYXJhbXMuYXNwZWN0LFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQZXJzcGVjdGl2ZUNhbWVyYVxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvY2FtZXJhcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9DdWJlQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vT3J0aG9ncmFwaGljQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vUGVyc3BlY3RpdmVDYW1lcmEnO1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQm94QnVmZmVyR2VvbWV0cnksXG4gIEJveEdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBCb3hcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEFzIHRvbGQgb24gQ29tcG9uZW50IGRlZmluaXRpb24sIHdoaWxlIHlvdSBjYW4gcGFzcyBhbnkgb2YgdGhlIGluaGVyaXRlZCBwYXJhbXMgZm9yIHRoaXMgY29tcG9uZW50IGNvbnN0cnVjdGlvbiwgeW91IHdpbGwgbmVlZCB0b1xuICogcGFzcyBzcGVjaWZpYyBwYXJhbWV0ZXJzIHRvIGJ1aWxkIHRoaXMgbWVzaCBhcyBhIGdlb21ldHJ5IG9iamVjdC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjQm94R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEJveCwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiAgbmV3IEJveCh7XG4gKiAgICBnZW9tZXRyeToge1xuICogICAgICB3aWR0aDogMixcbiAqICAgICAgaGVpZ2h0OiAyLFxuICogICAgICBkZXB0aDogMlxuICogICAgfSxcbiAqXG4gKiAgICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgICB9KSxcbiAqXG4gKiAgICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBCb3ggZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB3aWR0aDogMSxcbiAgICogICAgIGhlaWdodDogMSxcbiAgICogICAgIGRlcHRoOiAxLFxuICAgKiAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgZGVwdGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgZGVwdGg6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiAxLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBkZXB0aFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ2RlcHRoJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnLCAnZGVwdGhTZWdlbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBCb3guZGVmYXVsdHMsIEJveC5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Cb3hcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEJveEJ1ZmZlckdlb21ldHJ5IDogQm94R2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRlcHRoU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEJveFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENpcmNsZUJ1ZmZlckdlb21ldHJ5LFxuICBDaXJjbGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ2lyY2xlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NpcmNsZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDaXJjbGUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBDaXJjbGUoe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgcmFkaXVzOiA0LFxuICogICAgICBzZWdtZW50czogMTZcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQ2lyY2xlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiA1MCxcbiAgICogICAgIHNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiA1MCxcbiAgICAgIHNlZ21lbnRzOiA4LFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdzZWdtZW50cycsICd0aGV0YVN0YXJ0JywgJ3RoZXRhTGVuZ3RoJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ2lyY2xlLmRlZmF1bHRzLCBDaXJjbGUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ2lyY2xlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDaXJjbGVCdWZmZXJHZW9tZXRyeSA6IENpcmNsZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ2lyY2xlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ29uZUJ1ZmZlckdlb21ldHJ5LFxuICBDb25lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENvbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NvbmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ29uZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ29uZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENvbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICAgICdvcGVuRW5kZWQnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ29uZS5kZWZhdWx0cywgQ29uZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ29uZUJ1ZmZlckdlb21ldHJ5IDogQ29uZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm9wZW5FbmRlZCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDb25lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ3lsaW5kZXJCdWZmZXJHZW9tZXRyeSxcbiAgQ3lsaW5kZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ3lsaW5kZXJcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0N5bGluZGVyR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEN5bGluZGVyLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBDeWxpbmRlcih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEN5bGluZGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXNUb3A6IDIwLFxuICAgKiAgICAgcmFkaXVzQm90dG9tOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1c1RvcDogMCxcbiAgICAgIHJhZGl1c0JvdHRvbTogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeTogW1xuICAgKiAgICdyYWRpdXNUb3AnLFxuICAgKiAgICdyYWRpdXNCb3R0b20nLFxuICAgKiAgICdoZWlnaHQnLFxuICAgKiAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICogICAnb3BlbkVuZGVkJyxcbiAgICogICAndGhldGFTdGFydCcsXG4gICAqICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiBdXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1c1RvcCcsXG4gICAgICAncmFkaXVzQm90dG9tJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN5bGluZGVyLmRlZmF1bHRzLCBDeWxpbmRlci5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXJcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEN5bGluZGVyQnVmZmVyR2VvbWV0cnkgOiBDeWxpbmRlckdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNUb3AsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzQm90dG9tLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3lsaW5kZXJcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgRG9kZWNhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERvZGVjYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgZG9kZWNhaGVkcm9uIGlzIGFueSBwb2x5aGVkcm9uIHdpdGggdHdlbHZlIGZsYXQgZmFjZXMuIDxici8+PGJyLz5cbiAqIFRoZSBtb3N0IGZhbWlsaWFyIGRvZGVjYWhlZHJvbiBpcyB0aGUgcmVndWxhciBkb2RlY2FoZWRyb24sIHdoaWNoIGlzIGEgUGxhdG9uaWMgc29saWQuIDxici8+XG4gKiBUaGVyZSBhcmUgYWxzbyB0aHJlZSByZWd1bGFyIHN0YXIgZG9kZWNhaGVkcmEsIHdoaWNoIGFyZSBjb25zdHJ1Y3RlZCBhcyBzdGVsbGF0aW9ucyBvZiB0aGUgY29udmV4IGZvcm0uIDxici8+XG4gKiBBbGwgb2YgdGhlc2UgaGF2ZSBpY29zYWhlZHJhbCBzeW1tZXRyeSwgb3JkZXIgMTIwLlxuICogRG9kZWNhaGVkcm9uIGNyZWF0ZXMgRG9kZWNhaGVkcm9uIG9iamVjdCBieSBpdCdzIHJhZGl1cyBhbmQgZGV0YWlsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNEb2RlY2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRG9kZWNhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBEb2RlY2FoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAxMFxuICogICB9XG4gICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRG9kZWNhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeToge1xuICAgKiAgIHJhZGl1czogMSxcbiAgICogICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRG9kZWNhaGVkcm9uLmRlZmF1bHRzLCBEb2RlY2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkRvZGVjYWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IERvZGVjYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEb2RlY2FoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBCdWZmZXJHZW9tZXRyeSxcbiAgRXh0cnVkZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBFeHRydWRlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBFeHRydWRlIGdlb21ldHJ5IG1lYW5zIHRoYXQgeW91IGNhbiBjcmVhdGUgYSAzRCBtZXNoIGZyb20gYW55IDJEIHNoYXBlIHVzaW5nIHRocmVlLmpzIGdlb21ldHJ5IGJhc2VkIG9uIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL21hdGgvVmVjdG9yMic+VEhSRUUuVmVjdG9yMi48L2E+IDxici8+XG4gKiBTdWNoIGltcGxlbWVudGF0aW9uIHdpbGwgaGVscCB5b3UgdG8gbWFrZSB2b2x1bWVkIHNoYXBlcyB0aGF0IGhhdmUgdGhlaXIgb3duIGRlcHRoIGFuZCBjYW4gYmUgc2VlbiBmcm9tIGFsbCBhbmdlbHMuPGJyLz48YnIvPlxuICogWW91IGNhbiBhbHNvIGZpbmQgc29tZSBpbnRlcmVzdGluZyBleGFtcGxlcyBtYWRlIHVzaW5nIDxhIGhyZWY9J3RocmVlanMub3JnJz50aHJlZS5qczwvYT4gd2hpY2ggaXMgYSBjb3JlIG9mIHdocy5qcywgc3VjaCBhczpcbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc2hhcGVzLmh0bWwnPldlYmdsIGdlb21ldHJ5IGV4dHJ1ZGU8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlczIuaHRtbCc+RXh0cnVkZSBzaGFwZXMgZnJvbSBnZW9kYXRhPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zcGxpbmVzLmh0bWwnPkV4dHJ1ZGUgc3BsaW5lczwvYT5cbiAqXG4gKiBTdWNoIGV4YW1wbGVzIGNhbiBiZSBlYXNpbHkgaW1wbGVtZW50ZWQgdXNpbmcgd2hpdGVzdG9ybS5qcyBvciBpdCdzIHBsdWdpbnMuIFVzZSBgRXh0cnVkZWAgY2xhc3Mgd2l0aCA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9leHRyYXMvY29yZS9TaGFwZSc+VEhSRUUuU2hhcGU8L2E+IHRvIGdldCBleHRydWRlIGVmZmVjdCBvZiBzaGFwZSBkZWZpbmVkIGJ5IDJEIHZlY3RvcnMuXG4gKiBUaGlzIGNsYXNzIGlzIHNpbWlsYXIgdG8gPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZ2VvbWV0cmllcy9FeHRydWRlR2VvbWV0cnknPlRIUkVFLkV4dHJ1ZGVHZW9tZXRyeTwvYT4sXG4gKiBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgcHJvcGVydGllcywgYXBwbGllZCBieSBgU2hhcGVgLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNFeHRydWRlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIHNoYXBlLCB0aGVuIGFuIEV4dHJ1ZGUgZnJvbSBpdDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKFtcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigtMiwwKSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsMiksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLC0yKVxuICogXSk7XG4gKlxuICogY29uc3QgZXh0cnVkZSA9IG5ldyBFeHRydWRlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZXM6IHNoYXBlLFxuICogICAgIG9wdGlvbnM6IHtcbiAqICAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gKiAgICAgICBiZXZlbFNpemU6IDAsXG4gKiAgICAgICBhbW91bnQ6IDJcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pO1xuICpcbiAqIGV4dHJ1ZGUuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRXh0cnVkZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXSxcbiAgICogICAgIG9wdGlvbnM6IHt9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW10sXG4gICAgICBvcHRpb25zOiB7fVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJywgJ29wdGlvbnMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBFeHRydWRlLmRlZmF1bHRzLCBFeHRydWRlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRXh0cnVkZUdlb21ldHJ5KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNoYXBlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcHRpb25zXG4gICAgKTtcblxuICAgIHJldHVybiBwYXJhbXMuYnVmZmVyID8gbmV3IEJ1ZmZlckdlb21ldHJ5KCkuZnJvbUdlb21ldHJ5KGdlb21ldHJ5KSA6IGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEV4dHJ1ZGVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBJY29zYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBJY29zYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGFuIGljb3NhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiB3aXRoIDIwIGZhY2VzLjxici8+XG4gKiBUaGVyZSBhcmUgbWFueSBraW5kcyBvZiBpY29zYWhlZHJhLCB3aXRoIHNvbWUgYmVpbmcgbW9yZSBzeW1tZXRyaWNhbCB0aGFuIG90aGVycy4gVGhlIG1vc3Qgd2VsbCBrbm93biBpcyB0aGUgUGxhdG9uaWMsIGNvbnZleCByZWd1bGFyIGljb3NhaGVkcm9uLjxici8+XG4gKiBgSWNvc2FoZWRyb25gIGNyZWF0ZXMgYW4gSWNvc2FoZWRyb24gb2JqZWN0IGJ5IGl0cyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjSWNvc2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSWNvc2FoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IEljb3NhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEljb3NhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JY29zYWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge2dlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXX1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEljb3NhaGVkcm9uLmRlZmF1bHRzLCBJY29zYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IEljb3NhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEljb3NhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGF0aGVCdWZmZXJHZW9tZXRyeSxcbiAgTGF0aGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgTGF0aGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgYExhdGhlR2VvbWV0cnlgIGFsbG93cyB5b3UgdG8gY3JlYXRlIHNoYXBlcyBmcm9tIGEgc21vb3RoIGN1cnZlLlxuICogVGhpcyBjdXJ2ZSBpcyBkZWZpbmVkIGJ5IGEgbnVtYmVyIG9mIHBvaW50cyAoYWxzbyBjYWxsZWQga25vdHMpIGFuZCBpcyBtb3N0IG9mdGVuIGNhbGxlZCBhIHNwbGluZS4gVGhpcyBzcGxpbmUgaXMgcm90YXRlZCBhcm91bmQgYSBmaXhlZCBwb2ludCBhbmQgcmVzdWx0cyBpbiB2YXNlLSBhbmQgYmVsbC1saWtlIHNoYXBlcy48YnIvPjxici8+XG4gKiBJbiAzRCBjb21wdXRlciBncmFwaGljcywgYSBsYXRoZWQgb2JqZWN0IGlzIGEgM0QgbW9kZWwgd2hvc2UgdmVydGV4IGdlb21ldHJ5IGlzIHByb2R1Y2VkIGJ5IHJvdGF0aW5nIHRoZSBwb2ludHMgb2YgYSBzcGxpbmUgb3Igb3RoZXIgcG9pbnQgc2V0IGFyb3VuZCBhIGZpeGVkIGF4aXMuXG4gKiBUaGUgbGF0aGluZyBtYXkgYmUgcGFydGlhbDsgdGhlIGFtb3VudCBvZiByb3RhdGlvbiBpcyBub3QgbmVjZXNzYXJpbHkgYSBmdWxsIDM2MCBkZWdyZWVzLlxuICogVGhlIHBvaW50IHNldCBwcm92aWRpbmcgdGhlIGluaXRpYWwgc291cmNlIGRhdGEgY2FuIGJlIHRob3VnaHQgb2YgYXMgYSBjcm9zcyBzZWN0aW9uIHRocm91Z2ggdGhlIG9iamVjdCBhbG9uZyBhIHBsYW5lIGNvbnRhaW5pbmcgaXRzIGF4aXMgb2YgcmFkaWFsIHN5bW1ldHJ5LiA8YnIvPjxici8+XG4gKiBUaGUgPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5Jz5mb2xsb3dpbmcgZXhhbXBsZTwvYT4gc2hvd3MgYSBnZW9tZXRyeSB3aGljaCBjYW4gYmUgZ2VuZXJhdGVkIHVzaW5nIGBMYXRoZWAgY2xhc3MuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0xhdGhlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExhdGgsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcG9pbnRzID0gW107XG4gKlxuICogZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gKiAgIHBvaW50cy5wdXNoKFxuICogICAgIG5ldyBUSFJFRS5WZWN0b3IyKFxuICogICAgICAgKE1hdGguc2luKGkgKiAwLjcpICogMTUgKyA1MCkgLyAxMCxcbiAqICAgICAgIChpIC0gNSkgKiAwLjJcbiAqICAgICApXG4gKiAgICk7XG4gKiB9XG4gKlxuICogY29uc3QgbGF0aGUgPSBuZXcgTGF0aGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBvaW50czogcG9pbnRzXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDUwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIExhdGhlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcG9pbnRzOiBbXVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwb2ludHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT57XG4gICAqICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgTGF0aGUuZGVmYXVsdHMsIExhdGhlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBMYXRoZUJ1ZmZlckdlb21ldHJ5IDogTGF0aGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucG9pbnRzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMYXRoZVxufTtcbiIsImltcG9ydCB7XG4gIExpbmUgYXMgTGluZU5hdGl2ZSxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEdlb21ldHJ5LFxuICBCdWZmZXJBdHRyaWJ1dGUsXG4gIExpbmVDdXJ2ZTMsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExpbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIExpbmUgY29tcG9uZW50IGlzIGdlbmVyYXRlZCBmcm9tIGEgY3VydmUvbGluZSBhbmQgYW1vdW50IG9mIHZlY3RvcnMgdGhhdCBzaG91bGQgYmUgdXNlZCAocG9pbnRzKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExpbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IExpbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGN1cnZlOiBuZXcgVEhSRUUuTGluZUN1cnZlMyhuZXcgVEhSRUUuVmVjdG9yMygxMCwgMTAsIDApLCBuZXcgVEhSRUUuVmVjdG9yMygxMCwgMzAsIDApKVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMaW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGN1cnZlOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMTAsIDAsIDApKSxcbiAgICogICBwb2ludHM6IDUwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGN1cnZlOiBudWxsLFxuICAgIHBvaW50czogNTBcbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT57XG4gICAqICAgZ2VvbWV0cnk6IFsnY3VydmUnLCAncG9pbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnY3VydmUnLCAncG9pbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMsIExpbmUuZGVmYXVsdHMsIExpbmUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBMaW5lTmF0aXZlKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gcGFyYW1zLmJ1ZmZlciA/IG5ldyBCdWZmZXJHZW9tZXRyeSgpIDogbmV3IEdlb21ldHJ5KCk7XG5cbiAgICBpZiAocGFyYW1zLmJ1ZmZlcikge1xuICAgICAgY29uc3QgcHAgPSBwYXJhbXMuY3VydmUuZ2V0UG9pbnRzKHBhcmFtcy5wb2ludHMpO1xuICAgICAgY29uc3QgdmVydHMgPSBuZXcgRmxvYXQzMkFycmF5KHBwLmxlbmd0aCAqIDMpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gcHAubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgICAgY29uc3QgaTMgPSBpICogMztcblxuICAgICAgICB2ZXJ0c1tpM10gPSBwcFtpXS54O1xuICAgICAgICB2ZXJ0c1tpMyArIDFdID0gcHBbaV0ueTtcbiAgICAgICAgdmVydHNbaTMgKyAyXSA9IHBwW2ldLno7XG4gICAgICB9XG5cbiAgICAgIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgQnVmZmVyQXR0cmlidXRlKHZlcnRzLCAzKSk7XG4gICAgfSBlbHNlIGdlb21ldHJ5LnZlcnRpY2VzID0gcGFyYW1zLmN1cnZlLmdldFBvaW50cyhwYXJhbXMucG9pbnRzKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMaW5lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgSlNPTkxvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSW1wb3J0ZXJcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEltcG9ydGVyIGlzIGEgbG9hZGVyIGZvciBtZXNoZXMgYW5kIGFueSBvdGhlciBkYXRhIHRvIHlvdXIgc2NlbmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEltcG9ydGVyLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBJbXBvcnRlcih7XG4gKiAgIGxvYWRlcjogbmV3IFRIUkVFLk9CSkxvYWRlcigpLFxuICpcbiAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbCkgeyAvLyBkYXRhIGZyb20gbG9hZGVyXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7IC8vIHNob3VsZCByZXR1cm4geW91ciAubmF0aXZlIChtZXNoIGluIHRoaXMgY2FzZSlcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSW1wb3J0ZXIgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSW1wb3J0ZXIjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgdXJsOiAnJyxcbiAgICogICBsb2FkZXI6IG5ldyBKU09OTG9hZGVyKCksXG4gICAqXG4gICAqICAgb25Mb2FkKCkge30sXG4gICAqICAgb25Qcm9ncmVzcygpIHt9LFxuICAgKiAgIG9uRXJyb3IoKSB7fSxcbiAgICpcbiAgICogICB0ZXh0dXJlUGF0aDogbnVsbCxcbiAgICogICB1c2VDdXN0b21NYXRlcmlhbDogZmFsc2UsXG4gICAqXG4gICAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAgICogICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgdXJsOiAnJyxcbiAgICBsb2FkZXI6IG5ldyBKU09OTG9hZGVyKCksXG5cbiAgICBvbkxvYWQoKSB7fSxcbiAgICBvblByb2dyZXNzKCkge30sXG4gICAgb25FcnJvcigpIHt9LFxuXG4gICAgdGV4dHVyZVBhdGg6IG51bGwsXG4gICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IGZhbHNlLFxuXG4gICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAgICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICB9XG4gIH07XG5cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9uc1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpbHRlclxuICAgKiBAZGVzY3JpcHRpb24gRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge1RIUkVFLk1lc2h9IG9iamVjdCBJbnN0YW5jZSBmb3IgaXRlcmF0aW5nIHRocm91Z2ggaXQncyBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZmlsdGVyIEZ1bmN0aW9uIHdpdGggY2hpbGQgYXMgYXJndW1lbnQsIHNob3VsZCByZXR1cm4gYSBib29sZWFuIHdoZXRoZXIgaW5jbHVkZSB0aGUgY2hpbGQgb3Igbm90LlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBvYmplY3Qgd2l0aCBjaGlsZHJlblxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlJlbW92aW5nIHVubmVjZXNzYXJ5IGxpZ2h0cyBmcm9tIGNoaWxkcmVuPC9jYXB0aW9uPlxuICAgKiBuZXcgSWNvc2FoZWRyb24oe1xuICAgKiAgIGxvYWRlcjogbmV3IFRIUkVFLk9CSkxvYWRlcigpLFxuICAgKlxuICAgKiAgIHBhcnNlKGdyb3VwKSB7IC8vIGRhdGEgZnJvbSBsb2FkZXJcbiAgICogICAgIHJldHVybiBJbXBvcnRlci5maWx0ZXIoZ3JvdXAsIGNoaWxkID0+ICFjaGlsZC5pc0xpZ2h0KTsgLy8gcmVtb3ZlIGxpZ2h0c1xuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gICAqIH0pLmFkZFRvKGFwcCk7XG4gICAqL1xuICBzdGF0aWMgZmlsdGVyKG9iamVjdCwgZmlsdGVyKSB7XG4gICAgY29uc3QgcHJvY2Vzc0ZpbHRlciA9IG9iamVjdCA9PiB7XG4gICAgICBvYmplY3QuY2hpbGRyZW4uZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChlbC5jaGlsZHJlbikgcHJvY2Vzc0ZpbHRlcihlbCk7XG4gICAgICAgIGlmICghZmlsdGVyKGVsKSkgb2JqZWN0LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb2Nlc3NGaWx0ZXIob2JqZWN0KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBJbXBvcnRlci5kZWZhdWx0cywgSW1wb3J0ZXIuaW5zdHJ1Y3Rpb25zLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChwYXJhbXMudGV4dHVyZVBhdGgpIHBhcmFtcy5sYW9kZXIuc2V0VGV4dHVyZVBhdGgocGFyYW1zLnRleHR1cmVQYXRoKTtcblxuICAgICAgcGFyYW1zLmxvYWRlci5sb2FkKHBhcmFtcy51cmwsICguLi5kYXRhKSA9PiB7IC8vIGdlb21ldHJ5LCBtYXRlcmlhbHNcbiAgICAgICAgcGFyYW1zLm9uTG9hZCguLi5kYXRhKTtcblxuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBwYXJhbXMucGFyc2VyKC4uLmRhdGEpfSkubWVzaDtcblxuICAgICAgICBjb25zdCB7Z2VvbWV0cnk6IGdlb20sIG1hdGVyaWFsOiBtYXR9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG9iamVjdC5nZW9tZXRyeSxcbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLnVzZUN1c3RvbU1hdGVyaWFsID8gcGFyYW1zLm1hdGVyaWFsIDogb2JqZWN0Lm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChvYmplY3QuZ2VvbWV0cnkpIG9iamVjdC5nZW9tZXRyeSA9IGdlb207XG4gICAgICAgIGlmIChvYmplY3QubWF0ZXJpYWwpIG9iamVjdC5tYXRlcmlhbCA9IG1hdDtcblxuICAgICAgICByZXNvbHZlKG9iamVjdCk7XG4gICAgICB9LCBwYXJhbXMub25Qcm9ncmVzcywgcGFyYW1zLm9uRXJyb3IpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEltcG9ydGVyXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgT2N0YWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBPY3RhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIE9jdGFoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhbiBvY3RhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiB3aXRoIGVpZ2h0IGZhY2VzLlxuICogQSByZWd1bGFyIG9jdGFoZWRyb24gaXMgYSBQbGF0b25pYyBzb2xpZCBjb21wb3NlZCBvZiBlaWdodCBlcXVpbGF0ZXJhbCB0cmlhbmdsZXMsIGZvdXIgb2Ygd2hpY2ggbWVldCBhdCBlYWNoIHZlcnRleC5cbiAqIDxici8+PGJyLz5cbiAqIGBPY3RhaGVkcm9uYCBjcmVhdGVzIGFuIE9jdGFoZWRyb24gb2JqZWN0IGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGAuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI09jdGFoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIE9jdGFoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IE9jdGFoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgT2N0YWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuT2N0YWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBPY3RhaGVkcm9uLmRlZmF1bHRzLCBPY3RhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5PY3RhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IE9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSA6IE9jdGFoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgT2N0YWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBhcmFtZXRyaWNCdWZmZXJHZW9tZXRyeSxcbiAgUGFyYW1ldHJpY0dlb21ldHJ5LFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQYXJhbWV0cmljXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBgUGFyYW1ldHJpY2AgZ2VuZXJhdGVzIGEgZ2VvbWV0cnkgcmVwcmVzZW50aW5nIGEgPGEgaHJlZj0naHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUGFyYW1ldHJpY19zdXJmYWNlJz5QYXJhbWV0cmljIHN1cmZhY2U8L2E+XG4gKiA8YnIvPjxici8+XG4gKiBJdCBpcyB1c3VhbGx5IHVzZWQgdG8gZGV2ZWxvcCBkaWZmZXJlbnQga2luZHMgb2YgaGlnaGZpZWxkcyBvciB2aXN1YWxpemUgYSA8YSBocmVmPSdodHRwczovL3N0ZW1rb3NraS5naXRodWIuaW8vVGhyZWUuanMvR3JhcGh1bHVzLUZ1bmN0aW9uLmh0bWwnPm1hdGggZnVuY3Rpb248L2E+LlxuICogPGJyLz5cbiAqIC0gPGEgaHJlZj0naHR0cDovL21hdGguaHdzLmVkdS9ncmFwaGljc2Jvb2svc291cmNlL3RocmVlanMvY3VydmVzLWFuZC1zdXJmYWNlcy5odG1sJz5QYXJhbWV0cmljIHN1cmZhY2U8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHBzOi8vc3RlbWtvc2tpLmdpdGh1Yi5pby9UaHJlZS5qcy9HcmFwaHVsdXMtU3VyZmFjZS5odG1sJz5cIkdyYXBodWx1c1wiPC9hPlxuICogPGJyLz48YnIvPlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNQYXJhbWV0cmljR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FeGFtcGxlIGNyZWF0aW5nIGFuIGhlaWdodGZpZWxkLWxpa2UgZ2VvbWV0cnkuIGB1YCBhbmQgYHZgIGFyZSBsaWtlIGB4YCBhbmQgYHlgIGluIHNoYXBlLCBidXQgdGhlaXIgdmFsdWVzIGFyZSBhbHdheXMgZnJvbSBgMGAgdG8gYDFgLlxuICogV2UgdXNlIHRoZW0gaW4gYFRIUkVFLlZlY3RvcjNgIGxpa2UgYHhgIGFuZCBgemAgYW5kIGBNYXRoLnJhbmRvbSgpICogNWAgZm9yIGB5YC48L2NhcHRpb24+XG4gKiBjb25zdCBjcmVhdGVQYXJhbWV0cmljID0gKHUsIHYpID0+IHtcbiAqICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHUgKiAzMCwgTWF0aC5yYW5kb20oKSAqIDUsIHYgKiAzMCk7XG4gKiB9XG4gKlxuICogbmV3IFBhcmFtZXRyaWMoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGZ1bmM6IGNyZWF0ZVBhcmFtZXRyaWNcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGVcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgLTEwMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBhcmFtZXRyaWMgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBhcmFtZXRyaWMjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGZ1bmM6ICh1LCB2KSA9PiBuZXcgVmVjdG9yMyh1LCB2LCAwKSxcbiAgICogICAgIHNsaWNlczogMTAsXG4gICAqICAgICB0YWNrczogMTBcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgZnVuYzogKHUsIHYpID0+IG5ldyBWZWN0b3IzKHUsIHYsIDApLFxuICAgICAgc2xpY2VzOiAxMCxcbiAgICAgIHN0YWNrczogMTBcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGFyYW1ldHJpYy5kZWZhdWx0cywgUGFyYW1ldHJpYy5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QYXJhbWV0cmljXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBhcmFtZXRyaWNCdWZmZXJHZW9tZXRyeSA6IFBhcmFtZXRyaWNHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZnVuYyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zbGljZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc3RhY2tzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQYXJhbWV0cmljXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUGxhbmVCdWZmZXJHZW9tZXRyeSxcbiAgUGxhbmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUGxhbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIGBQbGFuZWAgaXMgdXNlZCBmb3IgY3JlYXRpbmcgcGxhbmVzIGdpdmVuIHNvbWUgYHdpZHRoYCBhbmQgYGhlaWdodGAuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1BsYW5lR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFBsYW5lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBQbGFuZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgd2lkdGg6IDIwLFxuICogICAgIGhlaWdodDogMzBcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUGxhbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB3aWR0aDogMTAsXG4gICAqICAgICBoZWlnaHQ6IDEwLFxuICAgKiAgICAgd1NlZ21lbnRzOiAxLFxuICAgKiAgICAgaFNlZ21lbnRzOiAxXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHdpZHRoOiAxMCxcbiAgICAgIGhlaWdodDogMTAsXG4gICAgICB3U2VnbWVudHM6IDEsXG4gICAgICBoU2VnbWVudHM6IDFcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3dTZWdtZW50cycsICdoU2VnbWVudHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnd1NlZ21lbnRzJywgJ2hTZWdtZW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBsYW5lLmRlZmF1bHRzLCBQbGFuZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBsYW5lQnVmZmVyR2VvbWV0cnkgOiBQbGFuZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhTZWdtZW50c1xuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGxhbmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIFBvbHloZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuY29uc3QgW3ZlcnRpY2VzT2ZDdWJlLCBpbmRpY2VzT2ZGYWNlc10gPSBbXG4gIFtcbiAgICAtMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAtMSwgMSwgLTEsXG4gICAgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMSwgMSwgMSwgLTEsIDEsIDFcbiAgXSxcbiAgW1xuICAgIDIsIDEsIDAsIDAsIDMsIDIsXG4gICAgMCwgNCwgNywgNywgMywgMCxcbiAgICAwLCAxLCA1LCA1LCA0LCAwLFxuICAgIDEsIDIsIDYsIDYsIDUsIDEsXG4gICAgMiwgMywgNywgNywgNiwgMixcbiAgICA0LCA1LCA2LCA2LCA3LCA0XG4gIF1cbl07XG5cbi8qKlxuICogQGNsYXNzIFBvbHloZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGVsZW1lbnRhcnkgZ2VvbWV0cnksIGEgcG9seWhlZHJvbiBpcyBhIHNvbGlkIGluIHRocmVlIGRpbWVuc2lvbnMgd2l0aCBmbGF0IHBvbHlnb25hbCBmYWNlcywgc3RyYWlnaHQgZWRnZXMgYW5kIHNoYXJwIGNvcm5lcnMgb3IgdmVydGljZXMuXG4gKiA8YnIvPjxici8+XG4gKiBgUG9seWhlZHJvbmAgY3JlYXRlcyBhIFBvbHloZWRyb24gYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYC5cbiAqIDxici8+PGJyLz5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBQb2x5aGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBQb2x5aGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBvbHloZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgc3RhdGljIHZlcnRpY2VzT2ZDdWJlID0gdmVydGljZXNPZkN1YmU7XG4gIHN0YXRpYyBpbmRpY2VzT2ZGYWNlcyA9IGluZGljZXNPZkZhY2VzO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB2ZXJ0aWNlc09mQ3ViZTogW1xuICAgKiAgICAgICAtMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAtMSwgMSwgLTEsXG4gICAqICAgICAgIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxXG4gICAqICAgICBdLFxuICAgKlxuICAgKiAgICAgaW5kaWNlc09mRmFjZXM6IFtcbiAgICogICAgICAgMiwgMSwgMCwgMCwgMywgMixcbiAgICogICAgICAgMCwgNCwgNywgNywgMywgMCxcbiAgICogICAgICAgMCwgMSwgNSwgNSwgNCwgMCxcbiAgICogICAgICAgMSwgMiwgNiwgNiwgNSwgMSxcbiAgICogICAgICAgMiwgMywgNywgNywgNiwgMixcbiAgICogICAgICAgNCwgNSwgNiwgNiwgNywgNFxuICAgKiAgICAgXSxcbiAgICpcbiAgICogICAgIHJhZGl1czogNixcbiAgICogICAgIGRldGFpbDogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB2ZXJ0aWNlc09mQ3ViZSxcbiAgICAgIGluZGljZXNPZkZhY2VzLFxuICAgICAgcmFkaXVzOiA2LFxuICAgICAgZGV0YWlsOiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsndmVydGljZXNPZkN1YmUnLCAnaW5kaWNlc09mRmFjZXMnLCAncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3ZlcnRpY2VzT2ZDdWJlJywgJ2luZGljZXNPZkZhY2VzJywgJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQb2x5aGVkcm9uLmRlZmF1bHRzLCBQb2x5aGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSA6IFBvbHloZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudmVydGljZXNPZkN1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaW5kaWNlc09mRmFjZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUG9seWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFJpbmdHZW9tZXRyeSxcbiAgUmluZ0J1ZmZlckdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBSaW5nXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBSaW5nIGNsYXNzIGNyZWF0ZXMgYSBjaXJjbGUgb3IganVzdCAyRCBUb3J1cy4gRG9lcyBub3Qgc3VwcG9ydCBwaHlzaWNzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNSaW5nR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFJpbmcsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFJpbmcoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGlubmVyUmFkaXVzOiA1LFxuICogICAgIG91dGVyUmFkaXVzOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgICBzaWRlIFRIUkVFLkRvdWJsZVNpZGVcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDgsIDBdLFxuICpcbiAqICAgcm90YXRpb246IHtcbiAqICAgICB4OiBNYXRoLlBJLzRcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUmluZyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZyNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgaW5uZXJSYWRpdXM6IDAsXG4gICAqICAgICBvdXRlclJhZGl1czogNTAsXG4gICAqICAgICB0aGV0YVNlZ21lbnRzOiA4LFxuICAgKiAgICAgcGhpU2VnbWVudHM6IDgsXG4gICAqICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgKiAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGlubmVyUmFkaXVzOiAwLFxuICAgICAgb3V0ZXJSYWRpdXM6IDUwLFxuICAgICAgdGhldGFTZWdtZW50czogOCxcbiAgICAgIHBoaVNlZ21lbnRzOiA4LFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmcjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAnaW5uZXJSYWRpdXMnLFxuICAgKiAgICAgJ291dGVyUmFkaXVzJyxcbiAgICogICAgICd0aGV0YVNlZ21lbnRzJyxcbiAgICogICAgICdwaGlTZWdtZW50cycsXG4gICAqICAgICAndGhldGFTdGFydCcsXG4gICAqICAgICAndGhldGFMZW5ndGgnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAnaW5uZXJSYWRpdXMnLFxuICAgICAgJ291dGVyUmFkaXVzJyxcbiAgICAgICd0aGV0YVNlZ21lbnRzJyxcbiAgICAgICdwaGlTZWdtZW50cycsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBSaW5nLmRlZmF1bHRzLCBSaW5nLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFJpbmdCdWZmZXJHZW9tZXRyeSA6IFJpbmdHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaW5uZXJSYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3V0ZXJSYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5waGlTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBSaW5nXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgU2hhcGVCdWZmZXJHZW9tZXRyeSxcbiAgU2hhcGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU2hhcGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNoYXBlIGlzIGEgdW5pdmVyc2FsIGNsYXNzLiBJdCBhbGxvd3MgeW91IHRvIGNyZWF0ZSBkaWZmZXJlbnQgMkQgc2hhcGVzIGluIDNEIHNjZW5lLjxici8+XG4gKiBVbmZvcnR1bmF0ZWx5LCBub3QgYWxsIG9mIHRoZW0gc3VwcG9ydCBwaHlzaWNzLCBhbiBhbHRlcm5hdGl2ZSBpcyB0byBtYWtlIGEgc2ltaWxhciAzRCBvYmplY3QgYW5kIHNjYWxlIGl0cyB3aWR0aCBkb3duIHRvIG5lYXIgemVyby5cbiAqIDxici8+PGJyLz5cbiAqIGBTaGFwZWAgY29uc2lzdHMgb2Ygc2hhcGVzIHRoYXQgYXJlIGluIGl0cyBzaGFwZXMgcGFyYW1ldGVyLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNTaGFwZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBwbGFuZSBsb29raW5nIFNoYXBlIGZyb20gYSBUSFJFRS5TaGFwZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCByZWN0V2lkdGggPSAxMCxcbiAqIHJlY3RMZW5ndGggPSA1O1xuICpcbiAqIGNvbnN0IHJlY3RTaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICogcmVjdFNoYXBlLm1vdmVUbygwLDApO1xuICogcmVjdFNoYXBlLmxpbmVUbygwLCByZWN0V2lkdGgpO1xuICogcmVjdFNoYXBlLmxpbmVUbyhyZWN0TGVuZ3RoLCByZWN0V2lkdGgpO1xuICogcmVjdFNoYXBlLmxpbmVUbyhyZWN0TGVuZ3RoLCAwKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8oMCwgMCk7XG4gKlxuICogY29uc3QgcGxhbmUgPSBuZXcgU2hhcGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHNoYXBlOiByZWN0U2hhcGVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU2hhcGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBzaGFwZXM6IFtdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgc2hhcGVzOiBbXVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydzaGFwZXMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydzaGFwZXMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTaGFwZS5kZWZhdWx0cywgU2hhcGUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFNoYXBlQnVmZmVyR2VvbWV0cnkgOiBTaGFwZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zaGFwZXNcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFNoYXBlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgU3BoZXJlQnVmZmVyR2VvbWV0cnksXG4gIFNwaGVyZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBTcGhlcmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNwaGVyZSBjbGFzcyBpcyB1c2VkIHRvIGNyZWF0ZSBzcGhlcmUgb2JqZWN0cyBieSBpdHMgcmFkaXVzIHByb3BlcnR5IGFuZCBvdGhlciB2YWx1ZXMgdGhhdCBkZXRlcm1pbmVzIGl0cyBkZXRhbGl0eS5cbiAqIDxici8+PGJyLz5cbiAqIEl0IGlzIHNpbWlsYXIgdG8gVEhSRUUuU3BoZXJlR2VvbWV0cnksIGJ1dCBpdCBhbHNvIGNvbnRhaW5zIGFsbCBgU2hhcGVgIHByb3BlcnRpZXMsIHN1Y2ggYXMgbWF0ZXJpYWwsIG1hc3MgYW5kIHZlY3RvcnMgbGlrZSBwb3NpdGlvbiAocG9zKSBhbmQgcm90YXRpb24gKHJvdCkuXG4gKiA8YnIvPjxici8+XG4gKiBUaGVuIGl0IGNyZWF0ZXMgYW4gYFRocmVlLmpzIG1lc2hgIG9yIGEgYFBoeXNpanMgbWVzaGAsIHRoYXQgaXMgc2ltaWxhciB0byBgVGhyZWUuanMgbWVzaGAsIGJ1dCBpdCBhbHNvIHRha2UgaW50byBjb25zaWRlcmF0aW9uIGNvbGxpc2lvbiBjYWxjdWxhdGlvbnMuXG4gKiBUaGlzIG1lc2ggaXMgYSBjb21iaW5hdGlvbiBvZiBgVGhyZWUuanMgZ2VvbWV0cnlgIGFuZCBgUGh5c2lqcyBtYXRlcmlhbGAgKFRoZSBzYW1lIGFzIGluIHRocmVlLmpzLCBidXQgd2l0aCBmcmljdGlvbiBhbmQgcmVzdGl0dXRpb24pLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNTcGhlcmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgU3BoZXJlLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBTcGhlcmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAxMDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU3BoZXJlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIHdpZHRoU2VnbWVudHM6IDgsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogNlxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIHdpZHRoU2VnbWVudHM6IDgsXG4gICAgICBoZWlnaHRTZWdtZW50czogNlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNwaGVyZS5kZWZhdWx0cywgU3BoZXJlLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gU3BoZXJlQnVmZmVyR2VvbWV0cnkgOiBTcGhlcmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFNwaGVyZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIFRldHJhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRldHJhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYSB0ZXRyYWhlZHJvbiBpcyBhIHBvbHloZWRyb24gY29tcG9zZWQgb2YgZm91ciB0cmlhbmd1bGFyIGZhY2VzLCBzaXggc3RyYWlnaHQgZWRnZXMsIGFuZCBmb3VyIHZlcnRleCBjb3JuZXJzLlxuICogVGhlIHRldHJhaGVkcm9uIGlzIHRoZSBzaW1wbGVzdCBvZiBhbGwgdGhlIG9yZGluYXJ5IGNvbnZleCBwb2x5aGVkcmEgYW5kIHRoZSBvbmx5IG9uZSB0aGF0IGhhcyBmZXdlciB0aGFuIDUgZmFjZXMuXG4gKiA8YnIvPjxici8+XG4gKiBgVGV0cmFoZWRyb25gIGNyZWF0ZXMgYSBUZXRyYWhlZHJvbiBvYmplY3QgYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYFxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUZXRyYWhlZHJvbkdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUZXRyYWhlZHJvbiwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVGV0cmFoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUZXRyYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRldHJhaGVkcm9uLmRlZmF1bHRzLCBUZXRyYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gVGV0cmFoZWRyb25CdWZmZXJHZW9tZXRyeSA6IFRldHJhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRldHJhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgRm9udCxcbiAgTWVzaCxcbiAgVGV4dEdlb21ldHJ5LFxuICBGb250TG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUZXh0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUZXh0IGNsYXNzIGlzIG1hZGUgZm9yIGNyZWF0aW5nIDNEIHRleHQgb2JqZWN0cy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVGV4dEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiA8YnIvPjxici8+XG4gKiBQaHlzaWNzIHRleHQgb2JqZWN0IGNhbiBiZSBjb252ZXggb3IgY29uY2F2ZS4gQnkgZGVmYXVsdCBpdCdzIGNvbnZleCBidXQgeW91IGNhbiBhbHNvIHN3aXRjaCB0byBjb25jYXZlLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVGV4dCwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVGV4dCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgdGV4dDogJ2hlbGxvIHdvcmxkJyxcbiAqICAgICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgICBmb250OiAncGF0aC90by9mb250LnR5cGVmYWNlLmpzJyxcbiAqICAgICAgIHNpemU6IDIwLFxuICogICAgICAgaGVpZ2h0OiA1LFxuICogICAgICAgY3VydmVTZWdtZW50czogNlxuICogICAgIH1cbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogLTQwLFxuICogICAgIHk6IDIwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVGV4dCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV4dCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICB0ZXh0OiAnSGVsbG8gV29ybGQhJyxcbiAgICogICBsb2FkZXI6IG5ldyBGb250TG9hZGVyKCksXG4gICAqXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgc2l6ZTogMTIsXG4gICAqICAgICBoZWlnaHQ6IDUwLFxuICAgKiAgICAgY3VydmVTZWdtZW50czogMTIsXG4gICAqICAgICBmb250OiBuZXcgRm9udCgpLFxuICAgKiAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICogICAgIGJldmVsVGhpY2tuZXNzOiAxMCxcbiAgICogICAgIGJldmVsU2l6ZTogOFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIHRleHQ6ICdIZWxsbyBXb3JsZCEnLFxuICAgIGxvYWRlcjogbmV3IEZvbnRMb2FkZXIoKSxcblxuICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgIHNpemU6IDEyLFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGN1cnZlU2VnbWVudHM6IDEyLFxuICAgICAgZm9udDogbmV3IEZvbnQoKSxcbiAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gICAgICBiZXZlbFRoaWNrbmVzczogMTAsXG4gICAgICBiZXZlbFNpemU6IDhcbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRleHQuZGVmYXVsdHMsIE1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRleHRcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgcGFyYW1zLmxvYWRlci5sb2FkKHBhcmFtcy5wYXJhbWV0ZXJzLmZvbnQsIGZvbnQgPT4ge1xuICAgICAgICBwYXJhbXMucGFyYW1ldGVycy5mb250ID0gZm9udDtcblxuICAgICAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBuZXcgVGV4dEdlb21ldHJ5KFxuICAgICAgICAgICAgcGFyYW1zLnRleHQsXG4gICAgICAgICAgICBwYXJhbXMucGFyYW1ldGVyc1xuICAgICAgICAgICksXG5cbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgICBtZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG4gICAgICAgICAgfSkubWVzaFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzdXBlci53YWl0KHByb21pc2UpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVGV4dFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFRvcnVzR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRvcnVzXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUb3J1cyBjbGFzcyBtYWtlcyBhIHRvcnVzIGZpZ3VyZS4gQSBkb251dCBpcyBhIHRvcnVzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3MvaW5kZXguaHRtbCNhcGkvZ2VvbWV0cmllcy9Ub3J1c0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUb3J1cywgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVG9ydXMoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogNSxcbiAqICAgICB0dWJlOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDM1XG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRvcnVzIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1cyNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxMDAsXG4gICAqICAgICB0dWJlOiA0MCxcbiAgICogICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgKiAgICAgdHVidWxhclNlZ21lbnRzOiA2LFxuICAgKiAgICAgYXJjOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEwMCxcbiAgICAgIHR1YmU6IDQwLFxuICAgICAgcmFkaWFsU2VnbWVudHM6IDgsXG4gICAgICB0dWJ1bGFyU2VnbWVudHM6IDYsXG4gICAgICBhcmM6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXMjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICd0dWJlJyxcbiAgICogICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAqICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICogICAgICdhcmMnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1cycsXG4gICAgICAndHViZScsXG4gICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAgICAnYXJjJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVG9ydXMuZGVmYXVsdHMsIFRvcnVzLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgVG9ydXNHZW9tZXRyeShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHViZSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpYWxTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJ1bGFyU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuYXJjXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUb3J1c1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5LFxuICBUb3J1c0tub3RHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVG9ydXNrbm90XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUb3J1c2tub3QgY2xhc3MgbWFrZXMgYSB0b3J1c2tub3QgZmlndXJlLiBJdCdzIGxpa2UgYSBjcm9va2VkIGRvbnV0LCB2ZXJ5IGNyb29rZWQuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RvcnVzS25vdEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUb3J1c2tub3QsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRvcnVza25vdCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOjUsXG4gKiAgICAgdHViZTogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zOiB7XG4gKiAgICAgeTogMTAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRvcnVza25vdCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNrbm90I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEwMCxcbiAgICogICAgIHR1YmU6IDQwLFxuICAgKiAgICAgcmFkaWFsU2VnbWVudHM6IDY0LFxuICAgKiAgICAgdHVidWxhclNlZ21lbnRzOiA4LFxuICAgKiAgICAgcDogMixcbiAgICogICAgIHE6IDNcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxMDAsXG4gICAgICB0dWJlOiA0MCxcbiAgICAgIHJhZGlhbFNlZ21lbnRzOiA2NCxcbiAgICAgIHR1YnVsYXJTZWdtZW50czogOCxcbiAgICAgIHA6IDIsXG4gICAgICBxOiAzXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNrbm90I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAndHViZScsXG4gICAqICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgKiAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAqICAgICAncCcsXG4gICAqICAgICAncSdcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICd0dWJlJyxcbiAgICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICAgICdwJyxcbiAgICAgICdxJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVG9ydXNrbm90LmRlZmF1bHRzLCBUb3J1c2tub3QuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdFxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IEdDb25zdHJ1Y3QgPSBwYXJhbXMuYnVmZmVyID8gVG9ydXNLbm90QnVmZmVyR2VvbWV0cnkgOiBUb3J1c0tub3RHZW9tZXRyeTtcblxuICAgIHJldHVybiBuZXcgR0NvbnN0cnVjdChcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHViZSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpYWxTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJ1bGFyU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5xXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUb3J1c2tub3Rcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBMaW5lQ3VydmUzLFxuICBWZWN0b3IzLFxuICBUdWJlQnVmZmVyR2VvbWV0cnksXG4gIFR1YmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVHViZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVHViZSBjbGFzcyBtYWtlcyBhIHR1YmUgdGhhdCBleHRydWRlcyBhbG9uZyBhIDNkIGN1cnZlLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3MvaW5kZXguaHRtbCNhcGkvZ2VvbWV0cmllcy9UdWJlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFR1YmUgZnJvbSBhIHRocmVlLmpzIEN1cnZlLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IEN1c3RvbVNpbkN1cnZlID0gVEhSRUUuQ3VydmUuY3JlYXRlKFxuICogICBmdW5jdGlvbiAoc2NhbGUpIHsgLy8gY3VzdG9tIGN1cnZlIGNvbnN0cnVjdG9yXG4gKiAgICAgdGhpcy5zY2FsZSA9IChzY2FsZSA9PT0gdW5kZWZpbmVkKSA/IDEgOiBzY2FsZTtcbiAqICAgfSxcbiAqXG4gKiAgIGZ1bmN0aW9uICh0KSB7IC8vIGdldFBvaW50OiB0IGlzIGJldHdlZW4gMC0xXG4gKiAgICAgY29uc3QgdHggPSB0ICogMyAtIDEuNSxcbiAqICAgICB0eSA9IE1hdGguc2luKCAyICogTWF0aC5QSSAqIHQgKSxcbiAqICAgICB0eiA9IDA7XG4gKlxuICogICAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyh0eCwgdHksIHR6KS5tdWx0aXBseVNjYWxhcih0aGlzLnNjYWxlKTtcbiAqICAgfVxuICogKTtcbiAqXG4gKiBjb25zdCBwYXRoID0gbmV3IEN1c3RvbVNpbkN1cnZlKDEwKTtcbiAqXG4gKiBuZXcgVHViZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcGF0aDogcGF0aFxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUdWJlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UdWJlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBwYXRoOiBuZXcgVEhSRUUuTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMSkpLFxuICAgKiAgICAgc2VnbWVudHM6IDIwLFxuICAgKiAgICAgcmFkaXVzOiAyLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDgsXG4gICAqICAgICBjbG9zZWQ6IGZhbHNlXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHBhdGg6IG5ldyBMaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAxKSksXG4gICAgICBzZWdtZW50czogMjAsXG4gICAgICByYWRpdXM6IDIsXG4gICAgICByYWRpdXNTZWdtZW50czogOCxcbiAgICAgIGNsb3NlZDogZmFsc2VcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UdWJlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3BhdGgnLFxuICAgKiAgICAgJ3NlZ21lbnRzJyxcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICogICAgICdjbG9zZWQnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3BhdGgnLFxuICAgICAgJ3NlZ21lbnRzJyxcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdjbG9zZWQnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUdWJlLmRlZmF1bHRzLCBUdWJlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UdWJlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBUdWJlQnVmZmVyR2VvbWV0cnkgOiBUdWJlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBhdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmNsb3NlZFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVHViZVxufTtcbiIsImltcG9ydCB7T2JqZWN0M0R9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEdyb3VwXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTb21ldGltZXMgeW91IG5lZWQgdG8gbWFrZSBncm91cHMgb2Ygb2JqZWN0cyAoaXQncyBub3QgY29udmVuaWVudGx5IHRvIGFwcGx5IHRyYW5zZm9ybXMgdG8gZWFjaCBvYmplY3Qgd2hlbiBjYW4gbWFrZSBqdXN0IG9uZSB0byBhIGdyb3VwKS48YnIvPlxuICogSW4gVGhyZWUuanMgeW91IG1ha2UgaXQgdXNpbmcgYFRIUkVFLk9iamVjdDNEYCBhbmQgaXQncyBjaGlsZHJlbi4gPGJyLz48YnIvPlxuICogSW4gd2hzLmpzIHdlIGhhdmUgYEdyb3VwYFxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+QXBwcm9hY2ggMiAtIEFkZGluZyBvYmplY3RzIHRvIGFuIGVtcHR5IGdyb3VwPC9jYXB0aW9uPlxuICogY29uc3Qgc3BoZXJlID0gbmV3IFNwaGVyZSgpO1xuICogY29uc3QgYm94ID0gbmV3IEJveCgpO1xuICogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAqXG4gKiBzcGhlcmUuYWRkVG8oZ3JvdXApO1xuICogYm94LmFkZFRvKGdyb3VwKTtcbiogQGV4YW1wbGUgPGNhcHRpb24+QXBwcm9hY2ggMiAtIE1ha2luZyBhIGdyb3VwIGZyb20gb2JqZWN0czwvY2FwdGlvbj5cbiAqIGNvbnN0IHNwaGVyZSA9IG5ldyBTcGhlcmUoKTtcbiAqIGNvbnN0IGJveCA9IG5ldyBCb3goKTtcbiAqIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKGJveCwgc3BoZXJlKTtcbiAqIC8vIE9SOiBjb25zdCBncm91cCA9IG5ldyBHcm91cChbYm94LCBzcGhlcmVdKTtcbiAqL1xuY2xhc3MgR3JvdXAgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoLi4ub2JqZWN0cykge1xuICAgIHN1cGVyKHt9KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgb2JqID0gb2JqZWN0c1tpXTtcblxuICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIENvbXBvbmVudCkgb2JqLmFkZFRvKHRoaXMpO1xuICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0M0QpIHRoaXMubmF0aXZlLmFkZChvYmopO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkKCkge1xuICAgIHJldHVybiBuZXcgT2JqZWN0M0QoKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBHcm91cFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvbWVzaGVzICovXG5leHBvcnQgKiBmcm9tICcuL0JveCc7XG5leHBvcnQgKiBmcm9tICcuL0NpcmNsZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9DeWxpbmRlcic7XG5leHBvcnQgKiBmcm9tICcuL0RvZGVjYWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL0V4dHJ1ZGUnO1xuZXhwb3J0ICogZnJvbSAnLi9JY29zYWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL0xhdGhlJztcbmV4cG9ydCAqIGZyb20gJy4vTGluZSc7XG5leHBvcnQgKiBmcm9tICcuL0ltcG9ydGVyJztcbmV4cG9ydCAqIGZyb20gJy4vT2N0YWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL1BhcmFtZXRyaWMnO1xuZXhwb3J0ICogZnJvbSAnLi9QbGFuZSc7XG5leHBvcnQgKiBmcm9tICcuL1BvbHloZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9SaW5nJztcbmV4cG9ydCAqIGZyb20gJy4vU2hhcGUnO1xuZXhwb3J0ICogZnJvbSAnLi9TcGhlcmUnO1xuZXhwb3J0ICogZnJvbSAnLi9UZXRyYWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL1RleHQnO1xuZXhwb3J0ICogZnJvbSAnLi9Ub3J1cyc7XG5leHBvcnQgKiBmcm9tICcuL1RvcnVza25vdCc7XG5leHBvcnQgKiBmcm9tICcuL1R1YmUnO1xuZXhwb3J0ICogZnJvbSAnLi9Hcm91cCc7XG4iLCIvKipcbiAqIEBjbGFzcyBFbGVtZW50TW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGFpbmVyPWRvY3VtZW50LmJvZHldIGNvbnRhaW5lciBpcyB0aGUgRE9NIG9iamVjdCB0byB3aGljaCBhcHBsaWNhdGlvbidzIGNhbnZhcyB3aWxsIGJlIGFkZGVkIHRvLlxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gZWxlbWVudCBtb2R1bGUsIHBhc3NpbmcgaXQgdG8gdGhlIEFwcDwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICBuZXcgRWxlbWVudE1vZHVsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEVsZW1lbnRNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXIgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWluZXIpIHtcbiAgICAgIGNvbnNvbGUud2FybignRWxlbWVudE1vZHVsZSBub3cgYWNjZXB0cyBvbmx5IGFyZ3VtZW50IHdoaWNoIGlzIGEgRE9NIG9iamVjdCwgbm90IGEgcGFyYW1zIG9iamVjdC4nKTtcbiAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyLmNvbnRhaW5lcjtcbiAgICB9IGVsc2UgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNyZWF0ZUVsZW1lbnRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgY2FudmFzIGVsZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBjcmVhdGVFbGVtZW50KCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAnd2hzLWFwcCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gJ2luaGVyaXQnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnaW5oZXJpdCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdlbGVtZW50JywgdGhpcy5lbGVtZW50KTtcbiAgICBtYW5hZ2VyLnNldCgnY29udGFpbmVyJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBXZWJHTFJlbmRlcmVyLFxuICBWZWN0b3IyXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG4vKipcbiAqIEBjbGFzcyBSZW5kZXJpbmdNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSByZW5kZXJpbmcgbW9kdWxlIGFuZCBwYXNzaW5nIGl0IHRvIEFwcCdzIG1vZHVsZXM8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgbmV3IEVsZW1lbnRNb2R1bGUoKSxcbiAqICAgbmV3IFNjZW5lTW9kdWxlKCksXG4gKiAgIG5ldyBDYW1lcmFNb2R1bGUoe1xuICogICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCA2LCAxOCksXG4gKiAgICAgZmFyOiAxMDAwMFxuICogICB9KSxcbiAqICAgbmV3IFJlbmRlcmluZ01vZHVsZSh7XG4gKiAgICAgYmdDb2xvcjogMHgxNjIxMjksXG4gKlxuICogICAgIHJlbmRlcmVyOiB7XG4gKiAgICAgICBhbnRpYWxpYXM6IHRydWUsXG4gKiAgICAgICBzaGFkb3dtYXA6IHtcbiAqICAgICAgICAgdHlwZTogVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICogICAgICAgfVxuICogICAgIH1cbiAqICAgfSwge3NoYWRvdzogdHJ1ZX0pXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlcmluZ01vZHVsZSB7XG4gIHN0YXRpYyBhZGRpdGlvbmFsID0ge1xuICAgIHNoYWRvdyhyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGVuYWJsZWQgPSB0cnVlO1xuXG4gIGRlZmVyID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIHtzaGFkb3c6IGlzU2hhZG93fSA9IHtzaGFkb3c6IGZhbHNlfSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcblxuICAgICAgcmVzb2x1dGlvbjogbmV3IFZlY3RvcjIoMSwgMSksXG4gICAgICBwaXhlbFJhdGlvOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyxcblxuICAgICAgYmdDb2xvcjogMHgwMDAwMDAsXG4gICAgICBiZ09wYWNpdHk6IDEsXG5cbiAgICAgIHJlbmRlcmVyOiB7fVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICBjb25zdCB7XG4gICAgICBiZ0NvbG9yLFxuICAgICAgYmdPcGFjaXR5LFxuICAgICAgcmVuZGVyZXIsXG4gICAgICBwaXhlbFJhdGlvLFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICByZXNvbHV0aW9uXG4gICAgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHJlbmRlcmVyKTtcbiAgICB0aGlzLmVmZmVjdHMgPSBbXTtcbiAgICB0aGlzLmFwcGx5QWRkaXRpb25hbCgnc2hhZG93JywgaXNTaGFkb3cpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKFxuICAgICAgYmdDb2xvcixcbiAgICAgIGJnT3BhY2l0eVxuICAgICk7XG5cbiAgICBpZiAocGl4ZWxSYXRpbykgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHBpeGVsUmF0aW8pO1xuXG4gICAgdGhpcy5zZXRTaXplKFxuICAgICAgTnVtYmVyKHdpZHRoICogcmVzb2x1dGlvbi54KS50b0ZpeGVkKCksXG4gICAgICBOdW1iZXIoaGVpZ2h0ICogcmVzb2x1dGlvbi55KS50b0ZpeGVkKClcbiAgICApO1xuICB9XG5cbiAgYXBwbHlBZGRpdGlvbmFsKG5hbWUsIGlzQXBwbGllZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFpc0FwcGxpZWQpIHJldHVybjtcbiAgICBSZW5kZXJpbmdNb2R1bGUuYWRkaXRpb25hbFtuYW1lXS5hcHBseSh0aGlzLCBbdGhpcy5yZW5kZXJlcl0pO1xuICB9XG5cbiAgaW50ZWdyYXRlUmVuZGVyZXIoZWxlbWVudCwgc2NlbmUsIGNhbWVyYSkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICB0aGlzLnJlbmRlckxvb3AgPSBuZXcgTG9vcCgoKSA9PiB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSkpO1xuICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gdGhpcy5yZW5kZXJMb29wO1xuICB9XG5cbiAgZWZmZWN0KGVmZmVjdCwgY2IpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJMb29wLnN0b3AoKTtcblxuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSgpO1xuICAgICAgZWZmZWN0LnNldFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBsb29wID0gbmV3IExvb3AoY2IgPyBjYiA6ICgpID0+IHtcbiAgICAgICAgZWZmZWN0LnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5lZmZlY3RzLnB1c2gobG9vcCk7XG4gICAgICBpZiAodGhpcy5lbmFibGVkKSBsb29wLnN0YXJ0KHRoaXMuYXBwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFNpemVcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSByZW5kZXIgdGFyZ2V0IHdpZHRoIGFuZCBoZWlnaHQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVuZGVyaW5nTW9kdWxlXG4gICAqL1xuICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBpZiAodGhpcy5yZW5kZXJlcikgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgYXR0YWNoVG9DYW52YXMoZWxlbWVudCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcblxuICAgIC8vIGF0dGFjaCB0byBuZXcgcGFyZW50IHdvcmxkIGRvbVxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZW5kZXJMb29wLnN0b3AoKTtcbiAgICB0aGlzLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RvcCgpKTtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5yZW5kZXJMb29wLnN0YXJ0KCk7XG4gICAgdGhpcy5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0YXJ0KCkpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3JlbmRlcmluZycpO1xuICAgIG1hbmFnZXIuc2V0KCdyZW5kZXJlcicsIHRoaXMucmVuZGVyZXIpO1xuXG4gICAgdGhpcy5hcHAgPSBtYW5hZ2VyLmhhbmRsZXI7XG5cbiAgICB0aGlzLnJlbmRlckxvb3AgPSB0aGlzLmludGVncmF0ZVJlbmRlcmVyKFxuICAgICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKSxcbiAgICAgIG1hbmFnZXIuZ2V0KCdzY2VuZScpLFxuICAgICAgbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZVxuICAgICk7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICBlbGVtZW50OiBlbGVtZW50ID0+IHtcbiAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50KTtcbiAgICAgIH0sXG4gICAgICBzY2VuZTogc2NlbmUgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICB9LFxuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYS5uYXRpdmU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc29sdmUoKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5yZW5kZXJMb29wLnN0YXJ0KHRoaXMpO1xuICAgIHNlbGYuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdGFydCh0aGlzKSk7XG4gIH1cblxuICBkaXNwb3NlKHNlbGYpIHtcbiAgICBzZWxmLnJlbmRlckxvb3Auc3RvcCh0aGlzKTtcbiAgICBzZWxmLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RvcCh0aGlzKSk7XG4gICAgc2VsZi5yZW5kZXJlci5mb3JjZUNvbnRleHRMb3NzKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFNjZW5lXG59IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgU2NlbmVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtCb29sZWFufSBbd2lsbFNjZW5lQmVSZXBsYWNlZD1mYWxzZV0gd2lsbFNjZW5lQmVSZXBsYWNlZCBzaG91bGQgYmUgdHJ1ZSBvbmx5IGlmIHlvdSBhcmUgZ29pbmcgdG8gb3ZlcndyaXRlIHNjZW5lIGRlcGVuZGVuY3kgZXZlbiB3aXRob3V0IHRoZSB1c2Ugb2YgZGVmYXVsdCBvbmUuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2VuZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHdpbGxTY2VuZUJlUmVwbGFjZWQgPSBmYWxzZSkge1xuICAgIHRoaXMuc2NlbmUgPSB3aWxsU2NlbmVCZVJlcGxhY2VkID8gbnVsbCA6IG5ldyBTY2VuZSgpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ3NjZW5lJywgdGhpcy5zY2VuZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcblxuICAgIHRoaXMuYWRkID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG9iamVjdC5kZWZlcigoKSA9PiB7XG4gICAgICAgICAgY29uc3Qge25hdGl2ZX0gPSBvYmplY3Q7XG4gICAgICAgICAgaWYgKCFuYXRpdmUpIHJlamVjdCgpO1xuXG4gICAgICAgICAgY29uc3QgYWRkUHJvbWlzZSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe29uQWRkOiBvYmplY3R9KS5vbkFkZDtcblxuICAgICAgICAgIGNvbnN0IHJlc29sdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5zY2VuZS5hZGQobmF0aXZlKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICByZXNvbHZlKG9iamVjdCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChhZGRQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgICAgIGFkZFByb21pc2UudGhlbihyZXNvbHZlcik7XG4gICAgICAgICAgZWxzZSByZXNvbHZlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xuICAgICAgc2VsZi5zY2VuZS5yZW1vdmUob2JqZWN0Lm5hdGl2ZSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0U2NlbmUgPSBmdW5jdGlvbiAoc2NlbmUpIHtcbiAgICAgIHNlbGYuc2NlbmUgPSBzY2VuZTtcbiAgICAgIHRoaXMubWFuYWdlci5zZXQoJ3NjZW5lJywgc2NlbmUpO1xuICAgIH07XG4gIH1cbn1cbiIsIi8vIGltcG9ydCB7YWRkUmVzaXplTGlzdGVuZXJ9IGZyb20gJ2RldGVjdC1lbGVtZW50LXJlc2l6ZSc7XG5cbi8qKlxuICogQGNsYXNzIFJlc2l6ZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17YXV0bzogdHJ1ZX1dIC0gSWYgYXV0byBpcyBzZXQgdG8gdHJ1ZSAtIHJlc2l6ZSB3aWxsIGJlIHRyaWdnZXJlZCB3aGVuIGNvbnRhaW5lciByZXNpemVzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNpemVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhdXRvOiB0cnVlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzID0gW3RoaXMuc2V0U2l6ZS5iaW5kKHRoaXMpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gc2V0U2l6ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcHJvdmlkZWQgd2lkdGggJiBoZWlnaHQgdG8gdGhlIHJlbmRlcmVyIG9iamVjdC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aD0xXSAtIFRoZSBwcm9taXNlIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHRvIGEgcXVldWUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0PTFdIC0gdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBzZXRTaXplKHdpZHRoID0gMSwgaGVpZ2h0ID0gMSkge1xuICAgIHRoaXMuY2FtZXJhLm5hdGl2ZS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICB0aGlzLmNhbWVyYS5uYXRpdmUudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyaW5nKSB0aGlzLnJlbmRlcmluZy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdHJpZ2dlclxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFRyaWdnZXJzIHJlc2l6ZSB3aGVuIGNhbGxlZC4gd2lkdGggJiBoZWlnaHQgYXJlIGRldGVybWluZWQgYXV0b21hdGljYWxseVxuICAgKiBUaGlzIGludm9rZXMgZWFjaCBjYWxsYmFja3Mgd2l0aCB0aGUgbmV3IHdpZHRoIGFuZCBoZWlnaHQgYXMgcGFyYW1zXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICB0cmlnZ2VyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBvZmZzZXRXaWR0aCxcbiAgICAgICAgb2Zmc2V0SGVpZ2h0XG4gICAgICB9LFxuICAgICAgcmVzb2x1dGlvblxuICAgIH0gPSB0aGlzO1xuXG4gICAgY29uc3Qgd2lkdGggPSBOdW1iZXIob2Zmc2V0V2lkdGggKiByZXNvbHV0aW9uLngpLnRvRml4ZWQoKTtcbiAgICBjb25zdCBoZWlnaHQgPSBOdW1iZXIob2Zmc2V0SGVpZ2h0ICogcmVzb2x1dGlvbi55KS50b0ZpeGVkKCk7XG5cbiAgICB0aGlzLmNhbGxiYWNrcy5mb3JFYWNoKGNiID0+IHtcbiAgICAgIGNiKHdpZHRoLCBoZWlnaHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkQXV0b3Jlc2l6ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgbW9kdWxlIHRvIGF1dG9yZXNpemUsIHRoaXMgYWRkcyBhbiBldmVudCBsaXN0ZW5lIG9uIHdpbmRvdyByZXNpemUgdG8gdHJpZ2dlciB0aGUgcmVzaXplXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBhZGRBdXRvcmVzaXplKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5nZXRDb250YWluZXIoKTtcbiAgICB0aGlzLnJlc29sdXRpb24gPSB0aGlzLmdldFJlc29sdXRpb24oKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5hdXRvKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy50cmlnZ2VyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkQ2FsbGJhY2tcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgY2FsbCBiYWNrIGZ1bmN0aW9uIHRvIHRoZSBleGlzdGluZyBjYWxsYmFja3MgbGlzdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBhZGRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGFkZENhbGxiYWNrKGZ1bmMpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGZ1bmMpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3Jlc2l6ZScpO1xuXG4gICAgdGhpcy5yZW5kZXJpbmcgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHRoaXMuZ2V0UmVzb2x1dGlvbiA9ICgpID0+IG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5wYXJhbXMucmVzb2x1dGlvbjtcbiAgICB0aGlzLmdldENvbnRhaW5lciA9ICgpID0+IG1hbmFnZXIuZ2V0KCdjb250YWluZXInKTtcblxuICAgIHRoaXMuYWRkQXV0b3Jlc2l6ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXYwO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYxO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYyO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYzO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgdG9wIGxlZnQgdGV4ZWwuXFxyXFxuXFx0dmVjNCBzdW0gPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjApO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSB0b3AgcmlnaHQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2MSk7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIGJvdHRvbSByaWdodCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYyKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgYm90dG9tIGxlZnQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2Myk7XFxyXFxuXFxyXFxuXFx0Ly8gQ29tcHV0ZSB0aGUgYXZlcmFnZS5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBzdW0gKiAwLjI1O1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ1bmlmb3JtIHZlYzIgdGV4ZWxTaXplO1xcclxcbnVuaWZvcm0gdmVjMiBoYWxmVGV4ZWxTaXplO1xcclxcbnVuaWZvcm0gZmxvYXQga2VybmVsO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXYwO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYxO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYyO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYzO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGRVdiA9ICh0ZXhlbFNpemUgKiB2ZWMyKGtlcm5lbCkpICsgaGFsZlRleGVsU2l6ZTtcXHJcXG5cXHJcXG5cXHR2VXYwID0gdmVjMih1di54IC0gZFV2LngsIHV2LnkgKyBkVXYueSk7XFxyXFxuXFx0dlV2MSA9IHZlYzIodXYueCArIGRVdi54LCB1di55ICsgZFV2LnkpO1xcclxcblxcdHZVdjIgPSB2ZWMyKHV2LnggKyBkVXYueCwgdXYueSAtIGRVdi55KTtcXHJcXG5cXHR2VXYzID0gdmVjMih1di54IC0gZFV2LngsIHV2LnkgLSBkVXYueSk7XFxyXFxuXFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQW4gb3B0aW1pc2VkIGNvbnZvbHV0aW9uIHNoYWRlciBtYXRlcmlhbC5cclxuICpcclxuICogQmFzZWQgb24gdGhlIEdEQzIwMDMgUHJlc2VudGF0aW9uIGJ5IE1hc2FraSBLYXdhc2UsIEJ1bmthc2hhIEdhbWVzOlxyXG4gKiAgRnJhbWUgQnVmZmVyIFBvc3Rwcm9jZXNzaW5nIEVmZmVjdHMgaW4gRE9VQkxFLVMuVC5FLkEuTCAoV3JlY2tsZXNzKVxyXG4gKiBhbmQgYW4gYXJ0aWNsZSBieSBGaWxpcCBTdHJ1Z2FyLCBJbnRlbDpcclxuICogIEFuIGludmVzdGlnYXRpb24gb2YgZmFzdCByZWFsLXRpbWUgR1BVLWJhc2VkIGltYWdlIGJsdXIgYWxnb3JpdGhtc1xyXG4gKlxyXG4gKiBGdXJ0aGVyIG1vZGlmaWVkIGFjY29yZGluZyB0byBBcHBsZSdzXHJcbiAqIFtCZXN0IFByYWN0aWNlcyBmb3IgU2hhZGVyc10oaHR0cHM6Ly9nb28uZ2wvbG1Sb001KS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29udm9sdXRpb25NYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjb252b2x1dGlvbiBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7VmVjdG9yMn0gW3RleGVsU2l6ZV0gLSBUaGUgYWJzb2x1dGUgc2NyZWVuIHRleGVsIHNpemUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHRleGVsU2l6ZSA9IG5ldyBWZWN0b3IyKCkpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkNvbnZvbHV0aW9uTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0ZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cdFx0XHRcdGhhbGZUZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cdFx0XHRcdGtlcm5lbDogbmV3IFVuaWZvcm0oMC4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuc2V0VGV4ZWxTaXplKHRleGVsU2l6ZS54LCB0ZXhlbFNpemUueSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY3VycmVudCBrZXJuZWwgc2l6ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7S2VybmVsU2l6ZX1cclxuXHRcdCAqIEBkZWZhdWx0IEtlcm5lbFNpemUuTEFSR0VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMua2VybmVsU2l6ZSA9IEtlcm5lbFNpemUuTEFSR0U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUga2VybmVsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7RmxvYXQzMkFycmF5fSBUaGUga2VybmVsLlxyXG5cdCAqL1xyXG5cclxuXHRnZXRLZXJuZWwoKSB7IHJldHVybiBrZXJuZWxQcmVzZXRzW3RoaXMua2VybmVsU2l6ZV07IH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgdGV4ZWwgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gVGhlIHRleGVsIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gVGhlIHRleGVsIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0VGV4ZWxTaXplKHgsIHkpIHtcclxuXHJcblx0XHR0aGlzLnVuaWZvcm1zLnRleGVsU2l6ZS52YWx1ZS5zZXQoeCwgeSk7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmhhbGZUZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpLm11bHRpcGx5U2NhbGFyKDAuNSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgS2F3YXNlIGJsdXIga2VybmVsIHByZXNldHMuXHJcbiAqXHJcbiAqIEB0eXBlIHtGbG9hdDMyQXJyYXlbXX1cclxuICogQHByaXZhdGVcclxuICovXHJcblxyXG5jb25zdCBrZXJuZWxQcmVzZXRzID0gW1xyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDEuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAxLjAsIDIuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDIuMCwgMy4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMy4wLCA0LjAsIDQuMCwgNS4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMy4wLCA0LjAsIDUuMCwgNy4wLCA4LjAsIDkuMCwgMTAuMF0pXHJcbl07XHJcblxyXG4vKipcclxuICogQSBrZXJuZWwgc2l6ZSBlbnVtZXJhdGlvbi5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFZFUllfU01BTEwgLSBBIHZlcnkgc21hbGwga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDd4NyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFNNQUxMIC0gQSBzbWFsbCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMTV4MTUgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBNRURJVU0gLSBBIG1lZGl1bSBzaXplZCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMjN4MjMgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMQVJHRSAtIEEgbGFyZ2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDM1eDM1IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gVkVSWV9MQVJHRSAtIEEgdmVyeSBsYXJnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgNjN4NjMgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBIVUdFIC0gQSBodWdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAxMjd4MTI3IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBLZXJuZWxTaXplID0ge1xyXG5cclxuXHRWRVJZX1NNQUxMOiAwLFxyXG5cdFNNQUxMOiAxLFxyXG5cdE1FRElVTTogMixcclxuXHRMQVJHRTogMyxcclxuXHRWRVJZX0xBUkdFOiA0LFxyXG5cdEhVR0U6IDVcclxuXHJcbn07XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBmbG9hdCBvcGFjaXR5O1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzQgdGV4ZWwgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gb3BhY2l0eSAqIHRleGVsO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIHNpbXBsZSBjb3B5IHNoYWRlciBtYXRlcmlhbC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29weU1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNvcHkgbWF0ZXJpYWwuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQ29weU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0b3BhY2l0eTogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hhZGVyIG1hdGVyaWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwb3N0IHByb2Nlc3NpbmcgcGFzc2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL21hdGVyaWFsc1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsIH0gZnJvbSBcIi4vYWRhcHRpdmUtbHVtaW5vc2l0eS5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaE1hdGVyaWFsIH0gZnJvbSBcIi4vYm9rZWguanNcIjtcclxuZXhwb3J0IHsgQm9rZWgyTWF0ZXJpYWwgfSBmcm9tIFwiLi9ib2tlaDIuanNcIjtcclxuZXhwb3J0IHsgQ29tYmluZU1hdGVyaWFsIH0gZnJvbSBcIi4vY29tYmluZS5qc1wiO1xyXG5leHBvcnQgeyBDb252b2x1dGlvbk1hdGVyaWFsLCBLZXJuZWxTaXplIH0gZnJvbSBcIi4vY29udm9sdXRpb24uanNcIjtcclxuZXhwb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4vY29weS5qc1wiO1xyXG5leHBvcnQgeyBEZXB0aE1hdGVyaWFsIH0gZnJvbSBcIi4vZGVwdGguanNcIjtcclxuZXhwb3J0IHsgRG90U2NyZWVuTWF0ZXJpYWwgfSBmcm9tIFwiLi9kb3Qtc2NyZWVuLmpzXCI7XHJcbmV4cG9ydCB7IEZpbG1NYXRlcmlhbCB9IGZyb20gXCIuL2ZpbG0uanNcIjtcclxuZXhwb3J0IHsgR2xpdGNoTWF0ZXJpYWwgfSBmcm9tIFwiLi9nbGl0Y2guanNcIjtcclxuZXhwb3J0IHsgR29kUmF5c01hdGVyaWFsIH0gZnJvbSBcIi4vZ29kLXJheXMuanNcIjtcclxuZXhwb3J0IHsgTHVtaW5vc2l0eU1hdGVyaWFsIH0gZnJvbSBcIi4vbHVtaW5vc2l0eS5qc1wiO1xyXG5leHBvcnQgeyBQaXhlbGF0aW9uTWF0ZXJpYWwgfSBmcm9tIFwiLi9waXhlbGF0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IFNob2NrV2F2ZU1hdGVyaWFsIH0gZnJvbSBcIi4vc2hvY2std2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTTUFBQmxlbmRNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtYmxlbmQuanNcIjtcclxuZXhwb3J0IHsgU01BQUNvbG9yRWRnZXNNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtY29sb3ItZWRnZXMuanNcIjtcclxuZXhwb3J0IHsgU01BQVdlaWdodHNNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtd2VpZ2h0cy5qc1wiO1xyXG5leHBvcnQgeyBUb25lTWFwcGluZ01hdGVyaWFsIH0gZnJvbSBcIi4vdG9uZS1tYXBwaW5nLmpzXCI7XHJcbiIsImltcG9ydCB7IFNjZW5lLCBNZXNoLCBPcnRob2dyYXBoaWNDYW1lcmEsIFBsYW5lQnVmZmVyR2VvbWV0cnkgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBhYnN0cmFjdCBwYXNzLlxyXG4gKlxyXG4gKiBQYXNzZXMgdGhhdCBkbyBub3QgcmVseSBvbiB0aGUgZGVwdGggYnVmZmVyIHNob3VsZCBleHBsaWNpdGx5IGRpc2FibGUgdGhlXHJcbiAqIGRlcHRoIHRlc3QgYW5kIGRlcHRoIHdyaXRlIGluIHRoZWlyIHJlc3BlY3RpdmUgc2hhZGVyIG1hdGVyaWFscy5cclxuICpcclxuICogVGhpcyBjbGFzcyBpbXBsZW1lbnRzIGEge0BsaW5rIFBhc3MjZGlzcG9zZX0gbWV0aG9kIHRoYXQgZnJlZXMgbWVtb3J5IG9uXHJcbiAqIGRlbWFuZC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IFtzY2VuZV0gLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBbY2FtZXJhXSAtIFRoZSBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtNZXNofSBbcXVhZF0gLSBBIHF1YWQgdGhhdCBmaWxscyB0aGUgc2NyZWVuIHRvIHJlbmRlciAyRCBmaWx0ZXIgZWZmZWN0cy4gU2V0IHRoaXMgdG8gbnVsbCwgaWYgeW91IGRvbid0IG5lZWQgaXQgKHNlZSB7QGxpbmsgUmVuZGVyUGFzc30pLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHNjZW5lID0gbmV3IFNjZW5lKCksXHJcblx0XHRjYW1lcmEgPSBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAxLCAtMSwgMCwgMSksXHJcblx0XHRxdWFkID0gbmV3IE1lc2gobmV3IFBsYW5lQnVmZmVyR2VvbWV0cnkoMiwgMiksIG51bGwpXHJcblx0KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2NlbmV9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgU2NlbmUoKVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGNhbWVyYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q2FtZXJhfVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgMSwgLTEsIDAsIDEpXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcXVhZCBtZXNoIHRoYXQgZmlsbHMgdGhlIHNjcmVlbi5cclxuXHRcdCAqXHJcblx0XHQgKiBBc3NpZ24geW91ciBzaGFkZXIgbWF0ZXJpYWwgdG8gdGhpcyBtZXNoIVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtNZXNofVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IE1lc2gobmV3IFBsYW5lQnVmZmVyR2VvbWV0cnkoMiwgMiksIG51bGwpXHJcblx0XHQgKiBAZXhhbXBsZSB0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm15TWF0ZXJpYWw7XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnF1YWQgPSBxdWFkO1xyXG5cclxuXHRcdGlmKHRoaXMucXVhZCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5xdWFkLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmKHRoaXMuc2NlbmUgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zY2VuZS5hZGQodGhpcy5xdWFkKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycyBzaG91bGQgYmUgc3dhcHBlZCBhZnRlciB0aGlzXHJcblx0XHQgKiBwYXNzIGhhcyBmaW5pc2hlZCByZW5kZXJpbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogU2V0IHRoaXMgdG8gdHJ1ZSBpZiB0aGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyIHNvIHRoYXQgYVxyXG5cdFx0ICogZm9sbG93aW5nIHBhc3MgY2FuIGZpbmQgdGhlIHJlc3VsdCBpbiB0aGUgcmVhZCBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVuYWJsZWQgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW5kZXIgdG8gc2NyZWVuIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUb1NjcmVlbiA9IGZhbHNlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIFRoaXMgaXMgYW4gYWJzdHJhY3QgbWV0aG9kIHRoYXQgbXVzdCBiZSBvdmVycmlkZGVuLlxyXG5cdCAqXHJcblx0ICogQGFic3RyYWN0XHJcblx0ICogQHRocm93cyB7RXJyb3J9IEFuIGVycm9yIGlzIHRocm93biBpZiB0aGUgbWV0aG9kIGlzIG5vdCBvdmVycmlkZGVuLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIEEgcmVhZCBidWZmZXIuIENvbnRhaW5zIHRoZSByZXN1bHQgb2YgdGhlIHByZXZpb3VzIHBhc3MuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBBIHdyaXRlIGJ1ZmZlci4gTm9ybWFsbHkgdXNlZCBhcyB0aGUgcmVuZGVyIHRhcmdldCB3aGVuIHRoZSByZWFkIGJ1ZmZlciBpcyB1c2VkIGFzIGlucHV0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsdGFdIC0gVGhlIGRlbHRhIHRpbWUuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbbWFza0FjdGl2ZV0gLSBJbmRpY2F0ZXMgd2hldGhlciBhIHN0ZW5jaWwgdGVzdCBtYXNrIGlzIGFjdGl2ZSBvciBub3QuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlKSB7XHJcblxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiUmVuZGVyIG1ldGhvZCBub3QgaW1wbGVtZW50ZWQhXCIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIFlvdSBtYXkgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4gY2FzZSB5b3Ugd2FudCB0byBiZSBpbmZvcm1lZCBhYm91dCB0aGUgbWFpblxyXG5cdCAqIHJlbmRlciBzaXplLlxyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2QgYmVmb3JlIHRoaXMgcGFzcyBpc1xyXG5cdCAqIGluaXRpYWxpc2VkIGFuZCBldmVyeSB0aW1lIGl0cyBvd24gc2l6ZSBpcyB1cGRhdGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHJlbmRlcmVyJ3Mgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSByZW5kZXJlcidzIGhlaWdodC5cclxuXHQgKiBAZXhhbXBsZSB0aGlzLm15UmVuZGVyVGFyZ2V0LnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge31cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgaW5pdGlhbGlzYXRpb24gdGFza3MuXHJcblx0ICpcclxuXHQgKiBCeSBvdmVycmlkaW5nIHRoaXMgbWV0aG9kIHlvdSBnYWluIGFjY2VzcyB0byB0aGUgcmVuZGVyZXIuIFlvdSdsbCBhbHNvIGJlXHJcblx0ICogYWJsZSB0byBjb25maWd1cmUgeW91ciBjdXN0b20gcmVuZGVyIHRhcmdldHMgdG8gdXNlIHRoZSBhcHByb3ByaWF0ZSBmb3JtYXRcclxuXHQgKiAoUkdCIG9yIFJHQkEpLlxyXG5cdCAqXHJcblx0ICogVGhlIHByb3ZpZGVkIHJlbmRlcmVyIGNhbiBiZSB1c2VkIHRvIHdhcm0gdXAgc3BlY2lhbCBvZmYtc2NyZWVuIHJlbmRlclxyXG5cdCAqIHRhcmdldHMgYnkgcGVyZm9ybWluZyBhIHByZWxpbWluYXJ5IHJlbmRlciBvcGVyYXRpb24uXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIHRoaXMgcGFzcyBpcyBhZGRlZCB0byBpdHNcclxuXHQgKiBxdWV1ZS5cclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgaW5pdGlhbGlzZVxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBhbHBoYSAtIFdoZXRoZXIgdGhlIHJlbmRlcmVyIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwgb3Igbm90LlxyXG5cdCAqIEBleGFtcGxlIGlmKCFhbHBoYSkgeyB0aGlzLm15UmVuZGVyVGFyZ2V0LnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0OyB9XHJcblx0ICovXHJcblxyXG5cdGluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtcyBhIHNoYWxsb3cgc2VhcmNoIGZvciBwcm9wZXJ0aWVzIHRoYXQgZGVmaW5lIGEgZGlzcG9zZSBtZXRob2QgYW5kXHJcblx0ICogZGVsZXRlcyB0aGVtLiBUaGUgcGFzcyB3aWxsIGJlIGlub3BlcmF0aXZlIGFmdGVyIHRoaXMgbWV0aG9kIHdhcyBjYWxsZWQhXHJcblx0ICpcclxuXHQgKiBEaXNwb3NhYmxlIG9iamVjdHM6XHJcblx0ICogIC0gcmVuZGVyIHRhcmdldHNcclxuXHQgKiAgLSBtYXRlcmlhbHNcclxuXHQgKiAgLSB0ZXh0dXJlc1xyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiBpdCBpcyBiZWluZyBkZXN0cm95ZWQuXHJcblx0ICogWW91IG1heSwgaG93ZXZlciwgdXNlIGl0IGluZGVwZW5kZW50bHkgdG8gZnJlZSBtZW1vcnkgd2hlbiB5b3UgYXJlIGNlcnRhaW5cclxuXHQgKiB0aGF0IHlvdSBkb24ndCBuZWVkIHRoaXMgcGFzcyBhbnltb3JlLlxyXG5cdCAqL1xyXG5cclxuXHRkaXNwb3NlKCkge1xyXG5cclxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcclxuXHJcblx0XHRsZXQga2V5O1xyXG5cclxuXHRcdGZvcihrZXkgb2Yga2V5cykge1xyXG5cclxuXHRcdFx0aWYodGhpc1trZXldICE9PSBudWxsICYmIHR5cGVvZiB0aGlzW2tleV0uZGlzcG9zZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblxyXG5cdFx0XHRcdHRoaXNba2V5XS5kaXNwb3NlKCk7XHJcblx0XHRcdFx0dGhpc1trZXldID0gbnVsbDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIGZvciBzYXZpbmcgdGhlIG9yaWdpbmFsIGNsZWFyIGNvbG9yIG9mIHRoZSByZW5kZXJlci5cclxuICpcclxuICogQHR5cGUgQ29sb3JcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKi9cclxuXHJcbmNvbnN0IGNvbG9yID0gbmV3IENvbG9yKCk7XHJcblxyXG4vKipcclxuICogQSBjbGVhciBwYXNzLlxyXG4gKlxyXG4gKiBZb3UgY2FuIHByZXZlbnQgc3BlY2lmaWMgYnVmZmVycyBmcm9tIGJlaW5nIGNsZWFyZWQgYnkgc2V0dGluZyBlaXRoZXIgdGhlXHJcbiAqIGF1dG9DbGVhckNvbG9yLCBhdXRvQ2xlYXJTdGVuY2lsIG9yIGF1dG9DbGVhckRlcHRoIHByb3BlcnRpZXMgb2YgdGhlIHJlbmRlcmVyXHJcbiAqIHRvIGZhbHNlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGVhclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjbGVhciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0NvbG9yfSBbb3B0aW9ucy5jbGVhckNvbG9yPW51bGxdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgY29sb3IuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmNsZWFyQWxwaGE9MC4wXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGFscGhhLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcihudWxsLCBudWxsLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQ2xlYXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhciBjb2xvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29sb3J9XHJcblx0XHQgKiBAZGVmYXVsdCBudWxsXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyQ29sb3IgPSAob3B0aW9ucy5jbGVhckNvbG9yICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckNvbG9yIDogbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFyIGFscGhhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAwLjBcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJBbHBoYSA9IChvcHRpb25zLmNsZWFyQWxwaGEgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyQWxwaGEgOiAwLjA7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYXJzIHRoZSByZWFkIGJ1ZmZlciBvciB0aGUgc2NyZWVuLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBjbGVhckNvbG9yID0gdGhpcy5jbGVhckNvbG9yO1xyXG5cclxuXHRcdGxldCBjbGVhckFscGhhO1xyXG5cclxuXHRcdGlmKGNsZWFyQ29sb3IgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdGNvbG9yLmNvcHkocmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcigpKTtcclxuXHRcdFx0Y2xlYXJBbHBoYSA9IHJlbmRlcmVyLmdldENsZWFyQWxwaGEoKTtcclxuXHRcdFx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihjbGVhckNvbG9yLCB0aGlzLmNsZWFyQWxwaGEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQodGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiByZWFkQnVmZmVyKTtcclxuXHRcdHJlbmRlcmVyLmNsZWFyKCk7XHJcblxyXG5cdFx0aWYoY2xlYXJDb2xvciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihjb2xvciwgY2xlYXJBbHBoYSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwYXNzIHRoYXQgZGlzYWJsZXMgdGhlIHN0ZW5jaWwgbWFzay5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJNYXNrUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNsZWFyIG1hc2sgcGFzcy5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkNsZWFyTWFza1Bhc3NcIjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNhYmxlcyB0aGUgc3RlbmNpbCB0ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0cmVuZGVyZXIuc3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldFRlc3QoZmFsc2UpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERhdGFUZXh0dXJlLCBSR0JGb3JtYXQsIEZsb2F0VHlwZSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBHbGl0Y2hNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbG93IC0gVGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZ2ggLSBUaGUgaGlnaGVzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmFuZG9tIHZhbHVlLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUludChsb3csIGhpZ2gpIHtcclxuXHJcblx0cmV0dXJuIGxvdyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChoaWdoIC0gbG93ICsgMSkpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSByYW5kb20gZmxvYXQgaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbG93IC0gVGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZ2ggLSBUaGUgaGlnaGVzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmFuZG9tIHZhbHVlLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUZsb2F0KGxvdywgaGlnaCkge1xyXG5cclxuXHRyZXR1cm4gbG93ICsgTWF0aC5yYW5kb20oKSAqIChoaWdoIC0gbG93KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGdsaXRjaCBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHbGl0Y2hQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZ2xpdGNoIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtUZXh0dXJlfSBbb3B0aW9ucy5wZXJ0dXJiTWFwXSAtIEEgcGVydHVyYmF0aW9uIG1hcC4gSWYgbm9uZSBpcyBwcm92aWRlZCwgYSBub2lzZSB0ZXh0dXJlIHdpbGwgYmUgY3JlYXRlZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHRTaXplPTY0XSAtIFRoZSBzaXplIG9mIHRoZSBnZW5lcmF0ZWQgbm9pc2UgbWFwLiBXaWxsIGJlIGlnbm9yZWQgaWYgYSBwZXJ0dXJiYXRpb24gbWFwIGlzIHByb3ZpZGVkLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJHbGl0Y2hQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2xpdGNoIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7R2xpdGNoTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG5ldyBHbGl0Y2hNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHBlcnR1cmJhdGlvbiBtYXAuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLnBlcnR1cmJNYXAgPSAob3B0aW9ucy5wZXJ0dXJiTWFwICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5wZXJ0dXJiTWFwIDogdGhpcy5nZW5lcmF0ZVBlcnR1cmJNYXAob3B0aW9ucy5kdFNpemUpO1xyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwLm5hbWUgPSBcIkdsaXRjaC5QZXJ0dXJiYXRpb25cIjtcclxuXHRcdHRoaXMucGVydHVyYk1hcC5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZmZlY3QgbW9kZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7R2xpdGNoTW9kZX1cclxuXHRcdCAqIEBkZWZhdWx0IEdsaXRjaE1vZGUuU1BPUkFESUNcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubW9kZSA9IEdsaXRjaE1vZGUuU1BPUkFESUM7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDb3VudGVyIGZvciBnbGl0Y2ggYWN0aXZhdGlvbiBhbmQgZGVhY3RpdmF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3VudGVyID0gMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcmFuZG9tIGJyZWFrIHBvaW50IGZvciB0aGUgc3BvcmFkaWMgZ2xpdGNoIGFjdGl2YXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmJyZWFrUG9pbnQgPSByYW5kb21JbnQoMTIwLCAyNDApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IHBlcnR1cmJhdGlvbiBtYXAuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0Z2V0IHBlcnR1cmJNYXAoKSB7IHJldHVybiB0aGlzLnRleHR1cmU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQXNzaWduaW5nIGEgbmV3IHBlcnR1cmJhdGlvbiBtYXAgZG9lcyBub3QgZGVzdHJveSB0aGUgY3VycmVudCBvbmUhXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IHBlcnR1cmJNYXAoeCkge1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IHg7XHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnRQZXJ0dXJiLnZhbHVlID0geDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXN0cm95cyB0aGUgY3VycmVudCBwZXJ0dXJiYXRpb24gbWFwIGFuZCByZXBsYWNlcyBpdCB3aXRoIGEgbmV3IG9uZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbc2l6ZT02NF0gLSBUaGUgdGV4dHVyZSBzaXplLlxyXG5cdCAqIEByZXR1cm4ge0RhdGFUZXh0dXJlfSBUaGUgcGVydHVyYmF0aW9uIHRleHR1cmUuXHJcblx0ICovXHJcblxyXG5cdGdlbmVyYXRlUGVydHVyYk1hcChzaXplID0gNjQpIHtcclxuXHJcblx0XHRjb25zdCBwaXhlbHMgPSBzaXplICogc2l6ZTtcclxuXHRcdGNvbnN0IGRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHBpeGVscyAqIDMpO1xyXG5cclxuXHRcdGxldCBkdCA9IHRoaXMucGVydHVyYk1hcDtcclxuXHRcdGxldCBpLCB4O1xyXG5cclxuXHRcdGZvcihpID0gMDsgaSA8IHBpeGVsczsgKytpKSB7XHJcblxyXG5cdFx0XHR4ID0gTWF0aC5yYW5kb20oKTtcclxuXHJcblx0XHRcdGRhdGFbaSAqIDNdID0geDtcclxuXHRcdFx0ZGF0YVtpICogMyArIDFdID0geDtcclxuXHRcdFx0ZGF0YVtpICogMyArIDJdID0geDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZHQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdGR0LmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0ZHQgPSBuZXcgRGF0YVRleHR1cmUoZGF0YSwgc2l6ZSwgc2l6ZSwgUkdCRm9ybWF0LCBGbG9hdFR5cGUpO1xyXG5cdFx0ZHQubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMucGVydHVyYk1hcCA9IGR0O1xyXG5cclxuXHRcdHJldHVybiBkdDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgbW9kZSA9IHRoaXMubW9kZTtcclxuXHRcdGNvbnN0IGNvdW50ZXIgPSB0aGlzLmNvdW50ZXI7XHJcblx0XHRjb25zdCBicmVha1BvaW50ID0gdGhpcy5icmVha1BvaW50O1xyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cclxuXHRcdHVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dW5pZm9ybXMuc2VlZC52YWx1ZSA9IE1hdGgucmFuZG9tKCk7XHJcblx0XHR1bmlmb3Jtcy5hY3RpdmUudmFsdWUgPSB0cnVlO1xyXG5cclxuXHRcdGlmKGNvdW50ZXIgJSBicmVha1BvaW50ID09PSAwIHx8IG1vZGUgPT09IEdsaXRjaE1vZGUuQ09OU1RBTlRfV0lMRCkge1xyXG5cclxuXHRcdFx0dW5pZm9ybXMuYW1vdW50LnZhbHVlID0gTWF0aC5yYW5kb20oKSAvIDMwLjA7XHJcblx0XHRcdHVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gcmFuZG9tRmxvYXQoLU1hdGguUEksIE1hdGguUEkpO1xyXG5cdFx0XHR1bmlmb3Jtcy5zZWVkWC52YWx1ZSA9IHJhbmRvbUZsb2F0KC0xLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLnNlZWRZLnZhbHVlID0gcmFuZG9tRmxvYXQoLTEuMCwgMS4wKTtcclxuXHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblgudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25ZLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cclxuXHRcdFx0dGhpcy5icmVha1BvaW50ID0gcmFuZG9tSW50KDEyMCwgMjQwKTtcclxuXHRcdFx0dGhpcy5jb3VudGVyID0gMDtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYoY291bnRlciAlIGJyZWFrUG9pbnQgPCBicmVha1BvaW50IC8gNSB8fCBtb2RlID09PSBHbGl0Y2hNb2RlLkNPTlNUQU5UX01JTEQpIHtcclxuXHJcblx0XHRcdFx0dW5pZm9ybXMuYW1vdW50LnZhbHVlID0gTWF0aC5yYW5kb20oKSAvIDkwLjA7XHJcblx0XHRcdFx0dW5pZm9ybXMuYW5nbGUudmFsdWUgPSByYW5kb21GbG9hdCgtTWF0aC5QSSwgTWF0aC5QSSk7XHJcblx0XHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblgudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblkudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdFx0dW5pZm9ybXMuc2VlZFgudmFsdWUgPSByYW5kb21GbG9hdCgtMC4zLCAwLjMpO1xyXG5cdFx0XHRcdHVuaWZvcm1zLnNlZWRZLnZhbHVlID0gcmFuZG9tRmxvYXQoLTAuMywgMC4zKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdC8vIFNwb3JhZGljLlxyXG5cdFx0XHRcdHVuaWZvcm1zLmFjdGl2ZS52YWx1ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQrK3RoaXMuY291bnRlcjtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggbW9kZSBlbnVtZXJhdGlvbi5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFNQT1JBRElDIC0gU3BvcmFkaWMgZ2xpdGNoZXMuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05TVEFOVF9NSUxEIC0gQ29uc3RhbnQgbWlsZCBnbGl0Y2hlcy5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENPTlNUQU5UX1dJTEQgLSBDb25zdGFudCB3aWxkIGdsaXRjaGVzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBHbGl0Y2hNb2RlID0ge1xyXG5cclxuXHRTUE9SQURJQzogMCxcclxuXHRDT05TVEFOVF9NSUxEOiAxLFxyXG5cdENPTlNUQU5UX1dJTEQ6IDJcclxuXHJcbn07XHJcbiIsImltcG9ydCB7IENsZWFyUGFzcyB9IGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwYXNzIHRoYXQgcmVuZGVycyBhIGdpdmVuIHNjZW5lIGRpcmVjdGx5IG9uIHNjcmVlbiBvciBpbnRvIHRoZSByZWFkIGJ1ZmZlclxyXG4gKiBmb3IgZnVydGhlciBwcm9jZXNzaW5nLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcmVuZGVyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBjYW1lcmEgdG8gdXNlIHRvIHJlbmRlciB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge01hdGVyaWFsfSBbb3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsPW51bGxdIC0gQW4gb3ZlcnJpZGUgbWF0ZXJpYWwgZm9yIHRoZSBzY2VuZS5cclxuXHQgKiBAcGFyYW0ge0NvbG9yfSBbb3B0aW9ucy5jbGVhckNvbG9yPW51bGxdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgY29sb3IuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmNsZWFyQWxwaGE9MS4wXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGFscGhhLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xlYXJEZXB0aD1mYWxzZV0gLSBXaGV0aGVyIGRlcHRoIHNob3VsZCBiZSBjbGVhcmVkIGV4cGxpY2l0bHkuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGVhcj10cnVlXSAtIFdoZXRoZXIgYWxsIGJ1ZmZlcnMgc2hvdWxkIGJlIGNsZWFyZWQuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjZW5lLCBjYW1lcmEsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKHNjZW5lLCBjYW1lcmEsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJSZW5kZXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNsZWFyIHBhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NsZWFyUGFzc31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJQYXNzID0gbmV3IENsZWFyUGFzcyhvcHRpb25zKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFuIG92ZXJyaWRlIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtNYXRlcmlhbH1cclxuXHRcdCAqIEBkZWZhdWx0IG51bGxcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMub3ZlcnJpZGVNYXRlcmlhbCA9IChvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWwgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWwgOiBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRlcHRoIGJ1ZmZlciBzaG91bGQgYmUgY2xlYXJlZCBleHBsaWNpdGx5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJEZXB0aCA9IChvcHRpb25zLmNsZWFyRGVwdGggIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyRGVwdGggOiBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2xvciwgZGVwdGggYW5kIHN0ZW5jaWwgYnVmZmVycyBzaG91bGQgYmUgY2xlYXJlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBFdmVuIHdpdGggY2xlYXIgc2V0IHRvIHRydWUgeW91IGNhbiBwcmV2ZW50IHNwZWNpZmljIGJ1ZmZlcnMgZnJvbSBiZWluZ1xyXG5cdFx0ICogY2xlYXJlZCBieSBzZXR0aW5nIGVpdGhlciB0aGUgYXV0b0NsZWFyQ29sb3IsIGF1dG9DbGVhclN0ZW5jaWwgb3JcclxuXHRcdCAqIGF1dG9DbGVhckRlcHRoIHByb3BlcnRpZXMgb2YgdGhlIHJlbmRlcmVyIHRvIGZhbHNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhciA9IChvcHRpb25zLmNsZWFyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhciA6IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgc2NlbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcjtcclxuXHJcblx0XHRpZih0aGlzLmNsZWFyKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNsZWFyUGFzcy5yZW5kZXIocmVuZGVyZXIsIHRhcmdldCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmKHRoaXMuY2xlYXJEZXB0aCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRhcmdldCk7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0c2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IHRoaXMub3ZlcnJpZGVNYXRlcmlhbDtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEsIHRhcmdldCk7XHJcblx0XHRzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWFzayBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXNrUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IG1hc2sgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lIC0gVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIC0gVGhlIGNhbWVyYSB0byB1c2UuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjZW5lLCBjYW1lcmEpIHtcclxuXHJcblx0XHRzdXBlcihzY2VuZSwgY2FtZXJhLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiTWFza1Bhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEludmVyc2UgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmludmVyc2UgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFN0ZW5jaWwgYnVmZmVyIGNsZWFyIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyU3RlbmNpbCA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIHN0ZW5jaWwgYml0IG1hc2suXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgY29udGV4dCA9IHJlbmRlcmVyLmNvbnRleHQ7XHJcblx0XHRjb25zdCBzdGF0ZSA9IHJlbmRlcmVyLnN0YXRlO1xyXG5cclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xyXG5cclxuXHRcdGNvbnN0IHdyaXRlVmFsdWUgPSB0aGlzLmludmVyc2UgPyAwIDogMTtcclxuXHRcdGNvbnN0IGNsZWFyVmFsdWUgPSAxIC0gd3JpdGVWYWx1ZTtcclxuXHJcblx0XHQvLyBEb24ndCB1cGRhdGUgY29sb3Igb3IgZGVwdGguXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldE1hc2soZmFsc2UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRNYXNrKGZhbHNlKTtcclxuXHJcblx0XHQvLyBMb2NrIHRoZSBidWZmZXJzLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRMb2NrZWQodHJ1ZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldExvY2tlZCh0cnVlKTtcclxuXHJcblx0XHQvLyBDb25maWd1cmUgdGhlIHN0ZW5jaWwuXHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0VGVzdCh0cnVlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRPcChjb250ZXh0LlJFUExBQ0UsIGNvbnRleHQuUkVQTEFDRSwgY29udGV4dC5SRVBMQUNFKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRGdW5jKGNvbnRleHQuQUxXQVlTLCB3cml0ZVZhbHVlLCAweGZmZmZmZmZmKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRDbGVhcihjbGVhclZhbHVlKTtcclxuXHJcblx0XHQvLyBDbGVhciB0aGUgc3RlbmNpbC5cclxuXHRcdGlmKHRoaXMuY2xlYXJTdGVuY2lsKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQocmVhZEJ1ZmZlcik7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyU3RlbmNpbCgpO1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHdyaXRlQnVmZmVyKTtcclxuXHRcdFx0cmVuZGVyZXIuY2xlYXJTdGVuY2lsKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERyYXcgdGhlIG1hc2sgaW50byBib3RoIGJ1ZmZlcnMuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgcmVhZEJ1ZmZlcik7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgd3JpdGVCdWZmZXIpO1xyXG5cclxuXHRcdC8vIFVubG9jayB0aGUgYnVmZmVycy5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TG9ja2VkKGZhbHNlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TG9ja2VkKGZhbHNlKTtcclxuXHJcblx0XHQvLyBPbmx5IHJlbmRlciB3aGVyZSB0aGUgc3RlbmNpbCBpcyBzZXQgdG8gMS5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRGdW5jKGNvbnRleHQuRVFVQUwsIDEsIDB4ZmZmZmZmZmYpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldE9wKGNvbnRleHQuS0VFUCwgY29udGV4dC5LRUVQLCBjb250ZXh0LktFRVApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBzaGFkZXIgcGFzcy5cclxuICpcclxuICogVXNlZCB0byByZW5kZXIgYW55IHNoYWRlciBtYXRlcmlhbCBhcyBhIDJEIGZpbHRlci5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHNoYWRlciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTaGFkZXJNYXRlcmlhbH0gbWF0ZXJpYWwgLSBUaGUgc2hhZGVyIG1hdGVyaWFsIHRvIHVzZS5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW3RleHR1cmVJRD1cInREaWZmdXNlXCJdIC0gVGhlIHRleHR1cmUgdW5pZm9ybSBpZGVudGlmaWVyLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbCwgdGV4dHVyZUlEID0gXCJ0RGlmZnVzZVwiKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiU2hhZGVyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzaGFkZXIgbWF0ZXJpYWwgdG8gdXNlIGZvciByZW5kZXJpbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NoYWRlck1hdGVyaWFsfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGUgY29sb3Igc2FtcGxlciB1bmlmb3JtIG9mIHRoZSBnaXZlbiBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U3RyaW5nfVxyXG5cdFx0ICogQGRlZmF1bHQgXCJ0RGlmZnVzZVwiXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRleHR1cmVJRCA9IHRleHR1cmVJRDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0aWYodGhpcy5tYXRlcmlhbC51bmlmb3Jtc1t0aGlzLnRleHR1cmVJRF0gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtc1t0aGlzLnRleHR1cmVJRF0udmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBDb3B5TWF0ZXJpYWwsIFNob2NrV2F2ZU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEhhbGYgUEkuXHJcbiAqXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgSEFMRl9QSSA9IE1hdGguUEkgKiAwLjU7XHJcblxyXG4vKipcclxuICogQSB2ZWN0b3IuXHJcbiAqXHJcbiAqIEB0eXBlIHtWZWN0b3IzfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuLyoqXHJcbiAqIEEgdmVjdG9yLlxyXG4gKlxyXG4gKiBAdHlwZSB7VmVjdG9yM31cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCBhYiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG4vKipcclxuICogQSBzaG9jayB3YXZlIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNob2NrV2F2ZVBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzaG9jayB3YXZlIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIC0gVGhlIG1haW4gY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7VmVjdG9yM30gW2VwaWNlbnRlcl0gLSBUaGUgd29ybGQgcG9zaXRpb24gb2YgdGhlIHNob2NrIHdhdmUgZXBpY2VudGVyLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc3BlZWQ9MS4wXSAtIFRoZSBhbmltYXRpb24gc3BlZWQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFJhZGl1cz0xLjBdIC0gVGhlIGV4dGVudCBvZiB0aGUgc2hvY2sgd2F2ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2F2ZVNpemU9MC4yXSAtIFRoZSB3YXZlIHNpemUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmFtcGxpdHVkZT0wLjA1XSAtIFRoZSBkaXN0b3J0aW9uIGFtcGxpdHVkZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhLCBlcGljZW50ZXIgPSBuZXcgVmVjdG9yMygpLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTaG9ja1dhdmVQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG1haW4gY2FtZXJhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3QzRH1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWFpbkNhbWVyYSA9IGNhbWVyYTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlcGljZW50ZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1ZlY3RvcjN9XHJcblx0XHQgKiBAZXhhbXBsZSBzaG9ja1dhdmVQYXNzLmVwaWNlbnRlciA9IG15TWVzaC5wb3NpdGlvbjtcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuZXBpY2VudGVyID0gZXBpY2VudGVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG9iamVjdCBwb3NpdGlvbiBpbiBzY3JlZW4gc3BhY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1ZlY3RvcjN9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zY3JlZW5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc3BlZWQgb2YgdGhlIHNob2NrIHdhdmUgYW5pbWF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAyLjBcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc3BlZWQgPSAob3B0aW9ucy5zcGVlZCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3BlZWQgOiAyLjA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHRpbWUgYWNjdW11bGF0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwLjA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc2hvY2sgd2F2ZSBhbmltYXRpb24gaXMgYWN0aXZlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHNob2NrIHdhdmUgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaG9ja1dhdmVNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsID0gbmV3IFNob2NrV2F2ZU1hdGVyaWFsKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXMuY2VudGVyLnZhbHVlID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY29weSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvcHlNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbCA9IG5ldyBDb3B5TWF0ZXJpYWwoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbWl0cyB0aGUgc2hvY2sgd2F2ZS5cclxuXHQgKi9cclxuXHJcblx0ZXhwbG9kZSgpIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwLjA7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgcmVuZGVyIGRlbHRhIHRpbWUuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgZXBpY2VudGVyID0gdGhpcy5lcGljZW50ZXI7XHJcblx0XHRjb25zdCBtYWluQ2FtZXJhID0gdGhpcy5tYWluQ2FtZXJhO1xyXG5cdFx0Y29uc3Qgc2NyZWVuUG9zaXRpb24gPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdGNvbnN0IHNob2NrV2F2ZU1hdGVyaWFsID0gdGhpcy5zaG9ja1dhdmVNYXRlcmlhbDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXM7XHJcblx0XHRjb25zdCBjZW50ZXIgPSB1bmlmb3Jtcy5jZW50ZXI7XHJcblx0XHRjb25zdCByYWRpdXMgPSB1bmlmb3Jtcy5yYWRpdXM7XHJcblx0XHRjb25zdCBtYXhSYWRpdXMgPSB1bmlmb3Jtcy5tYXhSYWRpdXM7XHJcblx0XHRjb25zdCB3YXZlU2l6ZSA9IHVuaWZvcm1zLndhdmVTaXplO1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5jb3B5TWF0ZXJpYWw7XHJcblxyXG5cdFx0aWYodGhpcy5hY3RpdmUpIHtcclxuXHJcblx0XHRcdC8vIENhbGN1bGF0ZSBkaXJlY3Rpb24gdmVjdG9ycy5cclxuXHRcdFx0bWFpbkNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbih2KTtcclxuXHRcdFx0YWIuY29weShtYWluQ2FtZXJhLnBvc2l0aW9uKS5zdWIoZXBpY2VudGVyKTtcclxuXHJcblx0XHRcdC8vIERvbid0IHJlbmRlciB0aGUgZWZmZWN0IGlmIHRoZSBvYmplY3QgaXMgYmVoaW5kIHRoZSBjYW1lcmEuXHJcblx0XHRcdGlmKHYuYW5nbGVUbyhhYikgPiBIQUxGX1BJKSB7XHJcblxyXG5cdFx0XHRcdC8vIFNjYWxlIHRoZSBlZmZlY3QgYmFzZWQgb24gZGlzdGFuY2UgdG8gdGhlIG9iamVjdC5cclxuXHRcdFx0XHR1bmlmb3Jtcy5jYW1lcmFEaXN0YW5jZS52YWx1ZSA9IG1haW5DYW1lcmEucG9zaXRpb24uZGlzdGFuY2VUbyhlcGljZW50ZXIpO1xyXG5cclxuXHRcdFx0XHQvLyBDYWxjdWxhdGUgdGhlIHNjcmVlbiBwb3NpdGlvbiBvZiB0aGUgZXBpY2VudGVyLlxyXG5cdFx0XHRcdHNjcmVlblBvc2l0aW9uLmNvcHkoZXBpY2VudGVyKS5wcm9qZWN0KG1haW5DYW1lcmEpO1xyXG5cdFx0XHRcdGNlbnRlci52YWx1ZS54ID0gKHNjcmVlblBvc2l0aW9uLnggKyAxLjApICogMC41O1xyXG5cdFx0XHRcdGNlbnRlci52YWx1ZS55ID0gKHNjcmVlblBvc2l0aW9uLnkgKyAxLjApICogMC41O1xyXG5cclxuXHRcdFx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdFx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSBzaG9ja1dhdmVNYXRlcmlhbDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFVwZGF0ZSB0aGUgc2hvY2sgd2F2ZSByYWRpdXMgYmFzZWQgb24gdGltZS5cclxuXHRcdFx0dGhpcy50aW1lICs9IGRlbHRhO1xyXG5cdFx0XHRyYWRpdXMudmFsdWUgPSB0aGlzLnRpbWUgKiB0aGlzLnNwZWVkIC0gd2F2ZVNpemUudmFsdWU7XHJcblxyXG5cdFx0XHRpZihyYWRpdXMudmFsdWUgPj0gKG1heFJhZGl1cy52YWx1ZSArIHdhdmVTaXplLnZhbHVlKSAqIDIpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXMuYXNwZWN0LnZhbHVlID0gd2lkdGggLyBoZWlnaHQ7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEEgY29tcGlsYXRpb24gb2YgdGhlIHBvc3QgcHJvY2Vzc2luZyBwYXNzZXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvcGFzc2VzXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgQmxvb21QYXNzIH0gZnJvbSBcIi4vYmxvb20uanNcIjtcclxuZXhwb3J0IHsgQmx1clBhc3MgfSBmcm9tIFwiLi9ibHVyLmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoUGFzcyB9IGZyb20gXCIuL2Jva2VoLmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoMlBhc3MgfSBmcm9tIFwiLi9ib2tlaDIuanNcIjtcclxuZXhwb3J0IHsgQ2xlYXJQYXNzIH0gZnJvbSBcIi4vY2xlYXIuanNcIjtcclxuZXhwb3J0IHsgQ2xlYXJNYXNrUGFzcyB9IGZyb20gXCIuL2NsZWFyLW1hc2suanNcIjtcclxuZXhwb3J0IHsgRG90U2NyZWVuUGFzcyB9IGZyb20gXCIuL2RvdC1zY3JlZW4uanNcIjtcclxuZXhwb3J0IHsgRGVwdGhQYXNzIH0gZnJvbSBcIi4vZGVwdGguanNcIjtcclxuZXhwb3J0IHsgRmlsbVBhc3MgfSBmcm9tIFwiLi9maWxtLmpzXCI7XHJcbmV4cG9ydCB7IEdsaXRjaE1vZGUsIEdsaXRjaFBhc3MgfSBmcm9tIFwiLi9nbGl0Y2guanNcIjtcclxuZXhwb3J0IHsgR29kUmF5c1Bhc3MgfSBmcm9tIFwiLi9nb2QtcmF5cy5qc1wiO1xyXG5leHBvcnQgeyBNYXNrUGFzcyB9IGZyb20gXCIuL21hc2suanNcIjtcclxuZXhwb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuZXhwb3J0IHsgUGl4ZWxhdGlvblBhc3MgfSBmcm9tIFwiLi9waXhlbGF0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcclxuZXhwb3J0IHsgU2F2ZVBhc3MgfSBmcm9tIFwiLi9zYXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNoYWRlclBhc3MgfSBmcm9tIFwiLi9zaGFkZXIuanNcIjtcclxuZXhwb3J0IHsgU2hvY2tXYXZlUGFzcyB9IGZyb20gXCIuL3Nob2NrLXdhdmUuanNcIjtcclxuZXhwb3J0IHsgU01BQVBhc3MgfSBmcm9tIFwiLi9zbWFhLmpzXCI7XHJcbmV4cG9ydCB7IFRleHR1cmVQYXNzIH0gZnJvbSBcIi4vdGV4dHVyZS5qc1wiO1xyXG5leHBvcnQgeyBUb25lTWFwcGluZ1Bhc3MgfSBmcm9tIFwiLi90b25lLW1hcHBpbmcuanNcIjtcclxuIiwiaW1wb3J0IHtcclxuXHREZXB0aFN0ZW5jaWxGb3JtYXQsXHJcblx0RGVwdGhUZXh0dXJlLFxyXG5cdExpbmVhckZpbHRlcixcclxuXHRSR0JBRm9ybWF0LFxyXG5cdFJHQkZvcm1hdCxcclxuXHRVbnNpZ25lZEludDI0OFR5cGUsXHJcblx0V2ViR0xSZW5kZXJUYXJnZXRcclxufSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmltcG9ydCB7IENsZWFyTWFza1Bhc3MsIE1hc2tQYXNzLCBTaGFkZXJQYXNzIH0gZnJvbSBcIi4uL3Bhc3Nlc1wiO1xyXG5pbXBvcnQgeyBDb3B5TWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcblxyXG4vKipcclxuICogVGhlIEVmZmVjdENvbXBvc2VyIG1heSBiZSB1c2VkIGluIHBsYWNlIG9mIGEgbm9ybWFsIFdlYkdMUmVuZGVyZXIuXHJcbiAqXHJcbiAqIFRoZSBhdXRvIGNsZWFyIGJlaGF2aW91ciBvZiB0aGUgcHJvdmlkZWQgcmVuZGVyZXIgd2lsbCBiZSBkaXNhYmxlZCB0byBwcmV2ZW50XHJcbiAqIHVubmVjZXNzYXJ5IGNsZWFyIG9wZXJhdGlvbnMuXHJcbiAqXHJcbiAqIEl0IGlzIGNvbW1vbiBwcmFjdGljZSB0byB1c2UgYSB7QGxpbmsgUmVuZGVyUGFzc30gYXMgdGhlIGZpcnN0IHBhc3MgdG9cclxuICogYXV0b21hdGljYWxseSBjbGVhciB0aGUgc2NyZWVuIGFuZCByZW5kZXIgdGhlIHNjZW5lIHRvIGEgdGV4dHVyZSBmb3IgZnVydGhlclxyXG4gKiBwcm9jZXNzaW5nLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBFZmZlY3RDb21wb3NlciB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZWZmZWN0IGNvbXBvc2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSBbcmVuZGVyZXJdIC0gVGhlIHJlbmRlcmVyIHRoYXQgc2hvdWxkIGJlIHVzZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGVwdGhCdWZmZXI9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBtYWluIHJlbmRlciB0YXJnZXRzIHNob3VsZCBoYXZlIGEgZGVwdGggYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc3RlbmNpbEJ1ZmZlcj1mYWxzZV0gLSBXaGV0aGVyIHRoZSBtYWluIHJlbmRlciB0YXJnZXRzIHNob3VsZCBoYXZlIGEgc3RlbmNpbCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kZXB0aFRleHR1cmU9ZmFsc2VdIC0gU2V0IHRvIHRydWUgaWYgb25lIG9mIHlvdXIgcGFzc2VzIHJlbGllcyBvbiBhIGRlcHRoIHRleHR1cmUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHJlbmRlcmVyID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVuZGVyZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogWW91IG1heSByZXBsYWNlIHRoZSByZW5kZXJlciBhdCBhbnkgdGltZSBieSB1c2luZ1xyXG5cdFx0ICoge0BsaW5rIEVmZmVjdENvbXBvc2VyI3JlcGxhY2VSZW5kZXJlcn0uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyZXJ9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVhZCBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogUmVhZGluZyBmcm9tIGFuZCB3cml0aW5nIHRvIHRoZSBzYW1lIHJlbmRlciB0YXJnZXQgc2hvdWxkIGJlIGF2b2lkZWQuXHJcblx0XHQgKiBUaGVyZWZvcmUsIHR3byBzZXBlcmF0ZSB5ZXQgaWRlbnRpY2FsIGJ1ZmZlcnMgYXJlIHVzZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVhZEJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLndyaXRlQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHRpZih0aGlzLnJlbmRlcmVyICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIoXHJcblx0XHRcdFx0KG9wdGlvbnMuZGVwdGhCdWZmZXIgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmRlcHRoQnVmZmVyIDogdHJ1ZSxcclxuXHRcdFx0XHQob3B0aW9ucy5zdGVuY2lsQnVmZmVyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5zdGVuY2lsQnVmZmVyIDogZmFsc2UsXHJcblx0XHRcdFx0KG9wdGlvbnMuZGVwdGhUZXh0dXJlICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5kZXB0aFRleHR1cmUgOiBmYWxzZVxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5jbG9uZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY29weSBwYXNzIHVzZWQgZm9yIGNvcHlpbmcgbWFza2VkIHNjZW5lcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hhZGVyUGFzc31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvcHlQYXNzID0gbmV3IFNoYWRlclBhc3MobmV3IENvcHlNYXRlcmlhbCgpKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBwYXNzZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1Bhc3NbXX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnBhc3NlcyA9IFtdO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkZXB0aCB0ZXh0dXJlIG9mIHRoZSByZWFkIGFuZCB3cml0ZSBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0RlcHRoVGV4dHVyZX1cclxuXHQgKiBAZGVmYXVsdCBudWxsXHJcblx0ICovXHJcblxyXG5cdGdldCBkZXB0aFRleHR1cmUoKSB7IHJldHVybiB0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByZWFkIGFuZCB3cml0ZSBidWZmZXJzIHNoYXJlIGEgc2luZ2xlIGRlcHRoIHRleHR1cmUuIERlcHRoIHdpbGwgYmVcclxuXHQgKiB3cml0dGVuIHRvIHRoaXMgdGV4dHVyZSB3aGVuIHNvbWV0aGluZyBpcyByZW5kZXJlZCBpbnRvIG9uZSBvZiB0aGUgYnVmZmVyc1xyXG5cdCAqIGFuZCB0aGUgaW52b2x2ZWQgbWF0ZXJpYWxzIGhhdmUgZGVwdGggd3JpdGUgZW5hYmxlZC5cclxuXHQgKlxyXG5cdCAqIFlvdSBtYXkgZW5hYmxlIHRoaXMgbWVjaGFuaXNtIGR1cmluZyB0aGUgaW5zdGFudGlhdGlvbiBvZiB0aGUgY29tcG9zZXIgb3JcclxuXHQgKiBieSBhc3NpZ25pbmcgYSBEZXB0aFRleHR1cmUgaW5zdGFuY2UgbGF0ZXIgb24uIFlvdSBtYXkgYWxzbyBkaXNhYmxlIGl0IGJ5XHJcblx0ICogYXNzaWduaW5nIG51bGwuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7RGVwdGhUZXh0dXJlfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgZGVwdGhUZXh0dXJlKHgpIHtcclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlID0geDtcclxuXHRcdHRoaXMud3JpdGVCdWZmZXIuZGVwdGhUZXh0dXJlID0geDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgY3VycmVudCByZW5kZXJlciB3aXRoIHRoZSBnaXZlbiBvbmUuIFRoZSBET00gZWxlbWVudCBvZiB0aGVcclxuXHQgKiBjdXJyZW50IHJlbmRlcmVyIHdpbGwgYXV0b21hdGljYWxseSBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBub2RlIGFuZCB0aGVcclxuXHQgKiBET00gZWxlbWVudCBvZiB0aGUgbmV3IHJlbmRlcmVyIHdpbGwgdGFrZSBpdHMgcGxhY2UuXHJcblx0ICpcclxuXHQgKiBUaGUgYXV0byBjbGVhciBtZWNoYW5pc20gb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyIHdpbGwgYmUgZGlzYWJsZWQuXHJcblx0ICpcclxuXHQgKiBTd2l0Y2hpbmcgYmV0d2VlbiByZW5kZXJlcnMgYWxsb3dzIHlvdSB0byBkeW5hbWljYWxseSBlbmFibGUgb3IgZGlzYWJsZVxyXG5cdCAqIGFudGlhbGlhc2luZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgbmV3IHJlbmRlcmVyLlxyXG5cdCAqIEByZXR1cm4ge1dlYkdMUmVuZGVyZXJ9IFRoZSBvbGQgcmVuZGVyZXIuXHJcblx0ICovXHJcblxyXG5cdHJlcGxhY2VSZW5kZXJlcihyZW5kZXJlcikge1xyXG5cclxuXHRcdGNvbnN0IG9sZFJlbmRlcmVyID0gdGhpcy5yZW5kZXJlcjtcclxuXHJcblx0XHRsZXQgcGFyZW50LCBvbGRTaXplLCBuZXdTaXplO1xyXG5cclxuXHRcdGlmKG9sZFJlbmRlcmVyICE9PSBudWxsICYmIG9sZFJlbmRlcmVyICE9PSByZW5kZXJlcikge1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0cGFyZW50ID0gb2xkUmVuZGVyZXIuZG9tRWxlbWVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGRTaXplID0gb2xkUmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0XHRuZXdTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cclxuXHRcdFx0aWYocGFyZW50ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZChvbGRSZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihvbGRTaXplLndpZHRoICE9PSBuZXdTaXplLndpZHRoIHx8IG9sZFNpemUuaGVpZ2h0ICE9PSBuZXdTaXplLmhlaWdodCkge1xyXG5cclxuXHRcdFx0XHR0aGlzLnNldFNpemUoKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9sZFJlbmRlcmVyO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgcmVuZGVyIHRhcmdldCBieSByZXBsaWNhdGluZyB0aGUgcmVuZGVyZXIncyBjYW52YXMuXHJcblx0ICpcclxuXHQgKiBUaGUgY3JlYXRlZCByZW5kZXIgdGFyZ2V0IHVzZXMgYSBsaW5lYXIgZmlsdGVyIGZvciB0ZXhlbCBtaW5pZmljYXRpb24gYW5kXHJcblx0ICogbWFnbmlmaWNhdGlvbi4gSXRzIHJlbmRlciB0ZXh0dXJlIGZvcm1hdCBkZXBlbmRzIG9uIHdoZXRoZXIgdGhlIHJlbmRlcmVyXHJcblx0ICogdXNlcyB0aGUgYWxwaGEgY2hhbm5lbC4gTWlwbWFwcyBhcmUgZGlzYWJsZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGRlcHRoQnVmZmVyIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIGRlcHRoIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHN0ZW5jaWxCdWZmZXIgLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBoYXZlIGEgc3RlbmNpbCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBkZXB0aFRleHR1cmUgLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBoYXZlIGEgZGVwdGggdGV4dHVyZS5cclxuXHQgKiBAcmV0dXJuIHtXZWJHTFJlbmRlclRhcmdldH0gQSBuZXcgcmVuZGVyIHRhcmdldCB0aGF0IGVxdWFscyB0aGUgcmVuZGVyZXIncyBjYW52YXMuXHJcblx0ICovXHJcblxyXG5cdGNyZWF0ZUJ1ZmZlcihkZXB0aEJ1ZmZlciwgc3RlbmNpbEJ1ZmZlciwgZGVwdGhUZXh0dXJlKSB7XHJcblxyXG5cdFx0Y29uc3Qgc2l6ZSA9IHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHRoaXMucmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xyXG5cdFx0Y29uc3QgYWxwaGEgPSB0aGlzLnJlbmRlcmVyLmNvbnRleHQuZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbHBoYTtcclxuXHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXQgPSBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoc2l6ZS53aWR0aCAqIHBpeGVsUmF0aW8sIHNpemUuaGVpZ2h0ICogcGl4ZWxSYXRpbywge1xyXG5cdFx0XHRtaW5GaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0bWFnRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdGZvcm1hdDogYWxwaGEgPyBSR0JBRm9ybWF0IDogUkdCRm9ybWF0LFxyXG5cdFx0XHRkZXB0aEJ1ZmZlcjogZGVwdGhCdWZmZXIsXHJcblx0XHRcdHN0ZW5jaWxCdWZmZXI6IHN0ZW5jaWxCdWZmZXIsXHJcblx0XHRcdGRlcHRoVGV4dHVyZTogZGVwdGhUZXh0dXJlID8gbmV3IERlcHRoVGV4dHVyZSgpIDogbnVsbFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYoZGVwdGhUZXh0dXJlICYmIHN0ZW5jaWxCdWZmZXIpIHtcclxuXHJcblx0XHRcdHJlbmRlclRhcmdldC5kZXB0aFRleHR1cmUuZm9ybWF0ID0gRGVwdGhTdGVuY2lsRm9ybWF0O1xyXG5cdFx0XHRyZW5kZXJUYXJnZXQuZGVwdGhUZXh0dXJlLnR5cGUgPSBVbnNpZ25lZEludDI0OFR5cGU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlclRhcmdldC50ZXh0dXJlLm5hbWUgPSBcIkVmZmVjdENvbXBvc2VyLkJ1ZmZlclwiO1xyXG5cdFx0cmVuZGVyVGFyZ2V0LnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlclRhcmdldDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgcGFzcywgb3B0aW9uYWxseSBhdCBhIHNwZWNpZmljIGluZGV4LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQYXNzfSBwYXNzIC0gQSBuZXcgcGFzcy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2luZGV4XSAtIEFuIGluZGV4IGF0IHdoaWNoIHRoZSBwYXNzIHNob3VsZCBiZSBpbnNlcnRlZC5cclxuXHQgKi9cclxuXHJcblx0YWRkUGFzcyhwYXNzLCBpbmRleCkge1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlcjtcclxuXHRcdGNvbnN0IHNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gcmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xyXG5cclxuXHRcdHBhc3Muc2V0U2l6ZShzaXplLndpZHRoICogcGl4ZWxSYXRpbywgc2l6ZS5oZWlnaHQgKiBwaXhlbFJhdGlvKTtcclxuXHRcdHBhc3MuaW5pdGlhbGlzZShyZW5kZXJlciwgcmVuZGVyZXIuY29udGV4dC5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFscGhhKTtcclxuXHJcblx0XHRpZihpbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHR0aGlzLnBhc3Nlcy5zcGxpY2UoaW5kZXgsIDAsIHBhc3MpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR0aGlzLnBhc3Nlcy5wdXNoKHBhc3MpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGFzc30gcGFzcyAtIFRoZSBwYXNzLlxyXG5cdCAqL1xyXG5cclxuXHRyZW1vdmVQYXNzKHBhc3MpIHtcclxuXHJcblx0XHR0aGlzLnBhc3Nlcy5zcGxpY2UodGhpcy5wYXNzZXMuaW5kZXhPZihwYXNzKSwgMSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyBhbGwgZW5hYmxlZCBwYXNzZXMgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSBhZGRlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YSAtIFRoZSB0aW1lIGJldHdlZW4gdGhlIGxhc3QgZnJhbWUgYW5kIHRoZSBjdXJyZW50IG9uZSBpbiBzZWNvbmRzLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIoZGVsdGEpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHRcdGNvbnN0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlcjtcclxuXHRcdGNvbnN0IGNvcHlQYXNzID0gdGhpcy5jb3B5UGFzcztcclxuXHJcblx0XHRsZXQgcmVhZEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlcjtcclxuXHRcdGxldCB3cml0ZUJ1ZmZlciA9IHRoaXMud3JpdGVCdWZmZXI7XHJcblxyXG5cdFx0bGV0IG1hc2tBY3RpdmUgPSBmYWxzZTtcclxuXHRcdGxldCBwYXNzLCBjb250ZXh0LCBidWZmZXI7XHJcblx0XHRsZXQgaSwgbDtcclxuXHJcblx0XHRmb3IoaSA9IDAsIGwgPSBwYXNzZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcblxyXG5cdFx0XHRwYXNzID0gcGFzc2VzW2ldO1xyXG5cclxuXHRcdFx0aWYocGFzcy5lbmFibGVkKSB7XHJcblxyXG5cdFx0XHRcdHBhc3MucmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEsIG1hc2tBY3RpdmUpO1xyXG5cclxuXHRcdFx0XHRpZihwYXNzLm5lZWRzU3dhcCkge1xyXG5cclxuXHRcdFx0XHRcdGlmKG1hc2tBY3RpdmUpIHtcclxuXHJcblx0XHRcdFx0XHRcdGNvbnRleHQgPSByZW5kZXJlci5jb250ZXh0O1xyXG5cdFx0XHRcdFx0XHRjb250ZXh0LnN0ZW5jaWxGdW5jKGNvbnRleHQuTk9URVFVQUwsIDEsIDB4ZmZmZmZmZmYpO1xyXG5cdFx0XHRcdFx0XHRjb3B5UGFzcy5yZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKTtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyhjb250ZXh0LkVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnVmZmVyID0gcmVhZEJ1ZmZlcjtcclxuXHRcdFx0XHRcdHJlYWRCdWZmZXIgPSB3cml0ZUJ1ZmZlcjtcclxuXHRcdFx0XHRcdHdyaXRlQnVmZmVyID0gYnVmZmVyO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHBhc3MgaW5zdGFuY2VvZiBNYXNrUGFzcykge1xyXG5cclxuXHRcdFx0XHRcdG1hc2tBY3RpdmUgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHR9IGVsc2UgaWYocGFzcyBpbnN0YW5jZW9mIENsZWFyTWFza1Bhc3MpIHtcclxuXHJcblx0XHRcdFx0XHRtYXNrQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVycyBhbmQgdGhlIHJlbmRlcmVyJ3Mgb3V0cHV0IGNhbnZhcy5cclxuXHQgKlxyXG5cdCAqIEV2ZXJ5IHBhc3Mgd2lsbCBiZSBpbmZvcm1lZCBvZiB0aGUgbmV3IHNpemUuIEl0J3MgdXAgdG8gZWFjaCBwYXNzIGhvdyB0aGF0XHJcblx0ICogaW5mb3JtYXRpb24gaXMgdXNlZC5cclxuXHQgKlxyXG5cdCAqIElmIG5vIHdpZHRoIG9yIGhlaWdodCBpcyBzcGVjaWZpZWQsIHRoZSByZW5kZXIgdGFyZ2V0cyBhbmQgcGFzc2VzIHdpbGwgYmVcclxuXHQgKiB1cGRhdGVkIHdpdGggdGhlIGN1cnJlbnQgc2l6ZSBvZiB0aGUgcmVuZGVyZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3dpZHRoXSAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodF0gLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHRsZXQgaSwgbDtcclxuXHJcblx0XHRpZih3aWR0aCA9PT0gdW5kZWZpbmVkIHx8IGhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHR3aWR0aCA9IHNpemUud2lkdGg7XHJcblx0XHRcdGhlaWdodCA9IHNpemUuaGVpZ2h0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0d2lkdGggKj0gcGl4ZWxSYXRpbztcclxuXHRcdGhlaWdodCAqPSBwaXhlbFJhdGlvO1xyXG5cclxuXHRcdHRoaXMucmVhZEJ1ZmZlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdGZvcihpID0gMCwgbCA9IHBhc3Nlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuXHJcblx0XHRcdHBhc3Nlc1tpXS5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhpcyBjb21wb3NlciBieSBkZWxldGluZyBhbGwgcGFzc2VzIGFuZCBjcmVhdGluZyBuZXcgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IFtyZW5kZXJUYXJnZXRdIC0gQSBuZXcgcmVuZGVyIHRhcmdldC4gSWYgbm9uZSBpcyBwcm92aWRlZCwgdGhlIHNldHRpbmdzIG9mIHRoZSByZW5kZXJlciB3aWxsIGJlIHVzZWQuXHJcblx0ICovXHJcblxyXG5cdHJlc2V0KHJlbmRlclRhcmdldCkge1xyXG5cclxuXHRcdGNvbnN0IGRlcHRoQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLmRlcHRoQnVmZmVyO1xyXG5cdFx0Y29uc3Qgc3RlbmNpbEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5zdGVuY2lsQnVmZmVyO1xyXG5cdFx0Y29uc3QgZGVwdGhUZXh0dXJlID0gKHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmUgIT09IG51bGwpO1xyXG5cclxuXHRcdHRoaXMuZGlzcG9zZSgocmVuZGVyVGFyZ2V0ID09PSB1bmRlZmluZWQpID9cclxuXHRcdFx0dGhpcy5jcmVhdGVCdWZmZXIoZGVwdGhCdWZmZXIsIHN0ZW5jaWxCdWZmZXIsIGRlcHRoVGV4dHVyZSkgOlxyXG5cdFx0XHRyZW5kZXJUYXJnZXRcclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgYWxsIHBhc3NlcyBhbmQgcmVuZGVyIHRhcmdldHMuXHJcblx0ICpcclxuXHQgKiBUaGlzIG1ldGhvZCBkZWFsbG9jYXRlcyBhbGwgcmVuZGVyIHRhcmdldHMsIHRleHR1cmVzIGFuZCBtYXRlcmlhbHMgY3JlYXRlZFxyXG5cdCAqIGJ5IHRoZSBwYXNzZXMuIEl0IGFsc28gZGVsZXRlcyB0aGlzIGNvbXBvc2VyJ3MgZnJhbWUgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IFtyZW5kZXJUYXJnZXRdIC0gQSBuZXcgcmVuZGVyIHRhcmdldC4gSWYgbm9uZSBpcyBwcm92aWRlZCwgdGhlIGNvbXBvc2VyIHdpbGwgYmVjb21lIGlub3BlcmF0aXZlLlxyXG5cdCAqL1xyXG5cclxuXHRkaXNwb3NlKHJlbmRlclRhcmdldCkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cclxuXHRcdGlmKHRoaXMucmVhZEJ1ZmZlciAhPT0gbnVsbCAmJiB0aGlzLndyaXRlQnVmZmVyICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIuZGlzcG9zZSgpO1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IG51bGw7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR3aGlsZShwYXNzZXMubGVuZ3RoID4gMCkge1xyXG5cclxuXHRcdFx0cGFzc2VzLnBvcCgpLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYocmVuZGVyVGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdC8vIFJlYW5pbWF0ZS5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyID0gcmVuZGVyVGFyZ2V0O1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLmNsb25lKCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHRoaXMuY29weVBhc3MuZGlzcG9zZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQ29yZSBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL2NvcmVcclxuICovXHJcblxyXG5leHBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCIuL2VmZmVjdC1jb21wb3Nlci5qc1wiO1xyXG4iLCIvKipcclxuICogRXhwb3N1cmUgb2YgdGhlIGxpYnJhcnkgY29tcG9uZW50cy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZ1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSBcIi4vY29yZVwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRCbG9vbVBhc3MsXHJcblx0Qmx1clBhc3MsXHJcblx0Qm9rZWhQYXNzLFxyXG5cdEJva2VoMlBhc3MsXHJcblx0Q2xlYXJQYXNzLFxyXG5cdENsZWFyTWFza1Bhc3MsXHJcblx0RGVwdGhQYXNzLFxyXG5cdERvdFNjcmVlblBhc3MsXHJcblx0RmlsbVBhc3MsXHJcblx0R2xpdGNoTW9kZSxcclxuXHRHbGl0Y2hQYXNzLFxyXG5cdEdvZFJheXNQYXNzLFxyXG5cdE1hc2tQYXNzLFxyXG5cdFBhc3MsXHJcblx0UGl4ZWxhdGlvblBhc3MsXHJcblx0UmVuZGVyUGFzcyxcclxuXHRTYXZlUGFzcyxcclxuXHRTaGFkZXJQYXNzLFxyXG5cdFNob2NrV2F2ZVBhc3MsXHJcblx0U01BQVBhc3MsXHJcblx0VGV4dHVyZVBhc3MsXHJcblx0VG9uZU1hcHBpbmdQYXNzXHJcbn0gZnJvbSBcIi4vcGFzc2VzXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdEFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsLFxyXG5cdEJva2VoTWF0ZXJpYWwsXHJcblx0Qm9rZWgyTWF0ZXJpYWwsXHJcblx0Q29tYmluZU1hdGVyaWFsLFxyXG5cdENvbnZvbHV0aW9uTWF0ZXJpYWwsXHJcblx0Q29weU1hdGVyaWFsLFxyXG5cdERlcHRoTWF0ZXJpYWwsXHJcblx0RG90U2NyZWVuTWF0ZXJpYWwsXHJcblx0RmlsbU1hdGVyaWFsLFxyXG5cdEdsaXRjaE1hdGVyaWFsLFxyXG5cdEdvZFJheXNNYXRlcmlhbCxcclxuXHRLZXJuZWxTaXplLFxyXG5cdEx1bWlub3NpdHlNYXRlcmlhbCxcclxuXHRQaXhlbGF0aW9uTWF0ZXJpYWwsXHJcblx0U2hvY2tXYXZlTWF0ZXJpYWwsXHJcblx0U01BQUJsZW5kTWF0ZXJpYWwsXHJcblx0U01BQUNvbG9yRWRnZXNNYXRlcmlhbCxcclxuXHRTTUFBV2VpZ2h0c01hdGVyaWFsLFxyXG5cdFRvbmVNYXBwaW5nTWF0ZXJpYWxcclxufSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuIiwiaW1wb3J0IHtcbiAgRWZmZWN0Q29tcG9zZXIsXG4gIFJlbmRlclBhc3MsXG4gIFNoYWRlclBhc3Ncbn0gZnJvbSAncG9zdHByb2Nlc3NpbmcnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbmNvbnN0IHBvbHlmaWxsID0gKG9iamVjdCwgbWV0aG9kLCBzaG93V2FybiA9IHRydWUpID0+IHtcbiAgaWYgKG9iamVjdFttZXRob2RdKSByZXR1cm47XG4gIGlmIChzaG93V2FybikgY29uc29sZS53YXJuKGBAUG9zdFByb2Nlc3Nvck1vZHVsZTogcGFzcy4ke21ldGhvZH0oKSB3YXMgbm90IGZvdW5kLmAsIG9iamVjdCk7XG4gIG9iamVjdFttZXRob2RdID0gKCkgPT4ge307XG59O1xuXG5leHBvcnQgY2xhc3MgUG9zdFByb2Nlc3Nvck1vZHVsZSB7XG4gIGN1cnJlbnRQYXNzID0gbnVsbDtcblxuICBkZWZlciA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHtkZWJ1Z30gPSB7ZGVidWc6IHRydWV9KSB7XG4gICAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3Bvc3Rwcm9jZXNzb3InKTtcblxuICAgIHRoaXMuZWZmZWN0cyA9IG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5lZmZlY3RzO1xuICAgIHRoaXMucmVuZGVyZXIgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcbiAgICB0aGlzLnNjZW5lID0gbWFuYWdlci5nZXQoJ3NjZW5lJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJyk7XG5cbiAgICB0aGlzLmNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHRoaXMucmVuZGVyZXIpO1xuXG4gICAgbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLnN0b3AoKTtcblxuICAgIGNvbnN0IGNvbXBvc2VyID0gdGhpcy5jb21wb3NlcjtcbiAgICB0aGlzLnJlbmRlckxvb3AgPSBuZXcgTG9vcChjbG9jayA9PiBjb21wb3Nlci5yZW5kZXIoY2xvY2suZ2V0RGVsdGEoKSkpLnN0YXJ0KG1hbmFnZXIuaGFuZGxlcik7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICByZW5kZXJlcjogcmVuZGVyZXIgPT4ge1xuICAgICAgICB0aGlzLmNvbXBvc2VyLnJlcGxhY2VSZW5kZXJlcihyZW5kZXJlcik7XG4gICAgICB9LFxuXG4gICAgICBzY2VuZTogc2NlbmUgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICB9LFxuXG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNvbHZlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHBhc3MgPSBuZXcgUmVuZGVyUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYS5uYXRpdmUpO1xuXG4gICAgICAvLyBUT0RPOiBTdXBwb3J0IGZvciBlZmZlY3RzLlxuXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gQVBJXG5cbiAgcGFzcyhwYXNzKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHBvbHlmaWxsKHBhc3MsICdzZXRTaXplJywgdGhpcy5kZWJ1Zyk7XG4gICAgICBwb2x5ZmlsbChwYXNzLCAnaW5pdGlhbGlzZScsIHRoaXMuZGVidWcpO1xuXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2hhZGVyKG1hdGVyaWFsLCB0ZXh0dXJlSUQgPSAncmVhZEJ1ZmZlcicpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKCFtYXRlcmlhbC51bmlmb3Jtc1t0ZXh0dXJlSURdKVxuICAgICAgICBtYXRlcmlhbC51bmlmb3Jtc1t0ZXh0dXJlSURdID0ge3ZhbHVlOiBudWxsfTtcblxuICAgICAgY29uc3QgcGFzcyA9IG5ldyBTaGFkZXJQYXNzKG1hdGVyaWFsLCB0ZXh0dXJlSUQpO1xuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFBhc3MgQVBJXG5cbiAgZ2V0KG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZVxuICAgICAgPyB0aGlzLmNvbXBvc2VyLnBhc3Nlcy5maWx0ZXIocGFzcyA9PiBwYXNzLm5hbWUgPT09IG5hbWUpWzBdXG4gICAgICA6IHRoaXMuY3VycmVudFBhc3M7XG4gIH1cblxuICB0byhuYW1lKSB7XG4gICAgdGhpcy5jdXJyZW50UGFzcyA9IG5hbWU7XG4gIH1cblxuICByZW5kZXJUb1NjcmVlbihib29sID0gdHJ1ZSkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzLnJlbmRlclRvU2NyZWVuID0gYm9vbDtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmFtZShuYW1lKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MubmFtZSA9IG5hbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50c1BhdGNoTW9kdWxlIHtcbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2V2ZW50cycpO1xuICAgIHRoaXMuZWxlbWVudCA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpLmRvbUVsZW1lbnQ7XG4gIH1cblxuICBwYXRjaEV2ZW50cyhvcmlnaW5PYmplY3QsIGRlc3RPYmplY3QsIGV2ZW50cyA9IFtdKSB7XG4gICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT5cbiAgICAgIG9yaWdpbk9iamVjdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBlID0+IGRlc3RPYmplY3QuZW1pdChldmVudCwgZSkpXG4gICAgKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgY29uc3Qge2VsZW1lbnQsIHBhdGNoRXZlbnRzfSA9IHNlbGY7XG5cbiAgICBwYXRjaEV2ZW50cyhlbGVtZW50LCB0aGlzLCBbXG4gICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICdtb3VzZXVwJyxcbiAgICAgICdjb250ZXh0bWVudScsXG4gICAgICAnbW91c2Vkb3duJyxcbiAgICAgICdjbGljaycsXG4gICAgICAnd2hlZWwnLFxuICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgJ3RvdWNoZW5kJyxcbiAgICAgICd0b3VjaG1vdmUnLFxuICAgICAgJ2tleWRvd24nXG4gICAgXSk7XG5cbiAgICBwYXRjaEV2ZW50cyhlbGVtZW50LCB0aGlzLCBbXG4gICAgICAna2V5ZG93bicsXG4gICAgICAna2V5dXAnLFxuICAgICAgJ2tleXByZXNzJ1xuICAgIF0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBWZWN0b3IyLFxuICBSYXljYXN0ZXIsXG4gIFBsYW5lLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IEV2ZW50cyBmcm9tICdtaW5pdmVudHMnO1xuaW1wb3J0IHtFdmVudHNQYXRjaE1vZHVsZX0gZnJvbSAnLi9FdmVudHNQYXRjaE1vZHVsZSc7XG5cbi8qKlxuICogQGNsYXNzIFZpcnR1YWxNb3VzZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtnbG9iYWxNb3ZlbWVudD1mYWxzZV1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleHRlbmRzIEV2ZW50c1xuICovXG5leHBvcnQgY2xhc3MgVmlydHVhbE1vdXNlTW9kdWxlIGV4dGVuZHMgRXZlbnRzIHtcbiAgbW91c2UgPSBuZXcgVmVjdG9yMigpO1xuICByYXljYXN0ZXIgPSBuZXcgUmF5Y2FzdGVyKCk7XG4gIHdvcmxkID0gbnVsbDtcbiAgY2FudmFzID0gbnVsbDtcbiAgcHJvamVjdGlvblBsYW5lID0gbmV3IFBsYW5lKG5ldyBWZWN0b3IzKDAsIDAsIDEpLCAwKTtcblxuICBjb25zdHJ1Y3RvcihnbG9iYWxNb3ZlbWVudCA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmdsb2JhbE1vdmVtZW50ID0gZ2xvYmFsTW92ZW1lbnQ7XG4gIH1cblxuICB1cGRhdGUoZSwgY3VzdG9tWCwgY3VzdG9tWSkge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHggPSBjdXN0b21YIHx8IGUuY2xpZW50WDtcbiAgICBjb25zdCB5ID0gY3VzdG9tWSB8fCBlLmNsaWVudFk7XG5cbiAgICB0aGlzLm1vdXNlLnggPSAoKHggLSByZWN0LmxlZnQpIC8gKHJlY3QucmlnaHQgLSByZWN0LmxlZnQpKSAqIDIgLSAxO1xuICAgIHRoaXMubW91c2UueSA9IC0oKHkgLSByZWN0LnRvcCkgLyAocmVjdC5ib3R0b20gLSByZWN0LnRvcCkpICogMiArIDE7XG5cbiAgICB0aGlzLnByb2plY3Rpb25QbGFuZS5ub3JtYWwuY29weSh0aGlzLmNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbigpKTtcblxuICAgIHRoaXMucmF5Y2FzdGVyLnNldEZyb21DYW1lcmEodGhpcy5tb3VzZSwgdGhpcy5jYW1lcmEpO1xuICAgIHRoaXMuZW1pdCgnbW92ZScpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ21vdXNlJyk7XG4gICAgbWFuYWdlci5yZXF1aXJlKCdldmVudHMnLCAoKSA9PiBuZXcgRXZlbnRzUGF0Y2hNb2R1bGUoKSk7XG5cbiAgICB0aGlzLmNhbnZhcyA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpLmRvbUVsZW1lbnQ7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBbXG4gICAgICAnY2xpY2snLFxuICAgICAgJ21vdXNlZG93bicsXG4gICAgICAnbW91c2V1cCcsXG4gICAgICAnbW91c2Vtb3ZlJ1xuICAgIF0uZm9yRWFjaChldiA9PiB0aGlzLm9uKGV2LCBlID0+IHNlbGYuZW1pdChldiwgZSkpKTtcblxuICAgIHNlbGYuZ2xvYmFsWCA9IDA7XG4gICAgc2VsZi5nbG9iYWxZID0gMDtcblxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnBvaW50ZXJMb2NrRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzZWxmLmdsb2JhbFggKz0gZS5tb3ZlbWVudFg7XG4gICAgICAgIHNlbGYuZ2xvYmFsWSArPSBlLm1vdmVtZW50WTtcblxuICAgICAgICBzZWxmLnVwZGF0ZShlLCBzZWxmLmdsb2JhbFgsIHNlbGYuZ2xvYmFsWSk7XG4gICAgICB9IGVsc2Ugc2VsZi51cGRhdGUoZSk7XG4gICAgfSk7XG4gIH1cblxuICB0cmFjayhjb21wb25lbnQsIG5lc3RlZCA9IHRydWUpIHtcbiAgICBsZXQgaXNIb3ZlcmVkID0gZmFsc2U7XG5cbiAgICB0aGlzLm9uKCdtb3ZlJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaG92ZXJzKGNvbXBvbmVudCwgbmVzdGVkKSkge1xuICAgICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2Vtb3ZlJyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbXBvbmVudC5lbWl0KCdtb3VzZW92ZXInKTtcbiAgICAgICAgICBpc0hvdmVyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzSG92ZXJlZCkge1xuICAgICAgICBjb21wb25lbnQuZW1pdCgnbW91c2VvdXQnKTtcbiAgICAgICAgaXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdjbGljaycpO1xuICAgICAgZWxzZSBjb21wb25lbnQuZW1pdCgnb2ZmQ2xpY2snKTtcbiAgICB9KTtcblxuICAgIHRoaXMub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZWRvd24nKTtcbiAgICB9KTtcblxuICAgIHRoaXMub24oJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2V1cCcpO1xuICAgIH0pO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKHtuYXRpdmV9LCBuZXN0ZWQgPSB0cnVlKSB7XG4gICAgaWYgKG5hdGl2ZS5jaGlsZHJlbi5sZW5ndGggPiAwICYmIG5lc3RlZCkge1xuICAgICAgY29uc3Qgb2JqZWN0cyA9IFtdO1xuICAgICAgbmF0aXZlLnRyYXZlcnNlKGNoaWxkID0+IG9iamVjdHMucHVzaChjaGlsZCkpO1xuXG4gICAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyhvYmplY3RzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0KG5hdGl2ZSk7XG4gIH1cblxuICBwcm9qZWN0KHBsYW5lID0gdGhpcy5wcm9qZWN0aW9uUGxhbmUpIHtcbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIucmF5LmludGVyc2VjdFBsYW5lKHBsYW5lKTtcbiAgfVxuXG4gIGhvdmVycyhjb21wb25lbnQsIG5lc3RlZCA9IHRydWUpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3Rpb24oY29tcG9uZW50LCBuZXN0ZWQpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgcmF5KCkge1xuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5yYXk7XG4gIH1cblxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpcy5tb3VzZS54O1xuICB9XG5cbiAgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2UueTtcbiAgfVxufVxuIiwiaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuaW1wb3J0IHtFdmVudHNQYXRjaE1vZHVsZX0gZnJvbSAnLi9FdmVudHNQYXRjaE1vZHVsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sc01vZHVsZSB7XG4gIHN0YXRpYyBmcm9tKGNvbnRyb2xzKSB7XG4gICAgcmV0dXJuIG5ldyBDb250cm9sc01vZHVsZSh7Y29udHJvbHN9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIGZpeDogY29udHJvbHMgPT4gY29udHJvbHMsXG5cbiAgICAgIHVwZGF0ZShjKSB7XG4gICAgICAgIHRoaXMuY29udHJvbHMudXBkYXRlKGMuZ2V0RGVsdGEoKSk7XG4gICAgICB9XG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLnBhcmFtcy5jb250cm9scztcbiAgICB0aGlzLnVwZGF0ZSA9IHRoaXMucGFyYW1zLnVwZGF0ZTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIucmVxdWlyZSgnZXZlbnRzJywgKCkgPT4gbmV3IEV2ZW50c1BhdGNoTW9kdWxlKCkpO1xuICB9XG5cbiAgc2V0Q29udHJvbHMoY29udHJvbHMpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRVcGRhdGUodXBkYXRlKSB7XG4gICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYudXBkYXRlTG9vcCA9IG5ldyBMb29wKHNlbGYudXBkYXRlLmJpbmQoc2VsZikpO1xuICAgIHNlbGYudXBkYXRlTG9vcC5zdGFydCh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRm9nRXhwMixcbiAgRm9nXG59IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgRm9nTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtjb2xvcjogMHhlZmQxYjUsIGRlbnNpdHk6IDAuMDIwLCBuZWFyOiAxMCwgZmFyOiAxMDAwfV0gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gW3R5cGU9ZXhwMl0gLSBUaGUgdHlwZSBvZiBmb2cgLSBleHAyIG9yIGxpbmVhclxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+SG93IHRvIGNyZWF0ZSBhbmQgYXBwbHkgYSBGb2dNb2R1bGU8L2NhcHRpb24+XG4gKiBjb25zdCBmb2dNb2R1bGUgPSBuZXcgRm9nTW9kdWxlKHtcbiAqICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgIGRlbnNpdHk6IDAuMDMsXG4gKiAgICBuZWFyOiAyMCxcbiAqICAgIGZhcjogMjAwXG4gKiAgfSwgJ2V4cDInKTtcbiAqXG4gKiBuZXcgQXBwKFtcbiAqICAuLi4sXG4gKiAgZm9nTW9kdWxlXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEZvZ01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCB0eXBlKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNvbG9yOiAweGVmZDFiNSxcbiAgICAgIGRlbnNpdHk6IDAuMDIwLFxuICAgICAgbmVhcjogMTAsXG4gICAgICBmYXI6IDEwMDBcbiAgICB9LCBwYXJhbXMpO1xuICAgIGlmICghdHlwZSB8fCB0eXBlID09PSAnZXhwMicpIHRoaXMuZm9nID0gbmV3IEZvZ0V4cDIodGhpcy5wYXJhbXMuY29sb3IsIHRoaXMucGFyYW1zLmRlbnNpdHkpO1xuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdsaW5lYXInKSB0aGlzLmZvZyA9IG5ldyBGb2codGhpcy5wYXJhbXMuY29sb3IsIHRoaXMucGFyYW1zLm5lYXIsIHRoaXMucGFyYW1zLmZhcik7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnZm9nJywgdGhpcy5mb2cpO1xuICAgIG1hbmFnZXIuZ2V0KCdzY2VuZScpLmZvZyA9IHRoaXMuZm9nO1xuICB9XG59XG4iLCJpbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tICdyZWR1eCc7XG5cbmNvbnN0IGlzRXF1YWxEZWZhdWx0ID0gKGEsIGIpID0+IHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuICBlbHNlIGlmIChhICYmIGEuZXF1YWxzICYmIGEuZXF1YWxzKGIpKSByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIEBjbGFzcyBTdGF0ZU1vZHVsZVxuICogQGRlc2NyaXB0aW9uIGBTdGF0ZU1vZHVsZWAgaXMgdXNlZnVsIGZvciBhcHBzLCB3aGVyZSB5b3UgbmVlZCBzdGF0ZSBtYW5pcHVsYXRpb24uXG4gKiBUaGlzIGNhbiBiZTogX3RyYW5zaXRpb25zIGJldHdlZW4gc2NyZWVucywgZ2FtZXMsIGRldmVsb3BtZW50IG1vbWVudHNfLlxuICogWW91IGNhbiBjaGVjayBbYmFzaWMvc3RhdGVdKGh0dHBzOi8vd2hzLWRldi5zdXJnZS5zaC9leGFtcGxlcy8/YmFzaWMvc3RhdGUpIGV4YW1wbGUuXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgc3RhdGUgbW9kdWxlPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIC8vIC4uLlxuICogICBuZXcgU3RhdGVNb2R1bGUoKS5kZWZhdWx0KHtcbiAqICAgICBzcGhlcmVDb2xvcjogMHhmZjAwMDBcbiAqICAgfSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgU3RhdGVNb2R1bGUge1xuICBzdGF0aWMgYWN0aW9uR2VuZXJhdGUoaXNFcXVhbCkge1xuICAgIHJldHVybiAoc3RhdGUgPSBbe30sICcnXSwge2tleSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChpc0VxdWFsKHN0YXRlWzBdW2tleV0sIGRhdGEpKSByZXR1cm4gc3RhdGU7XG5cbiAgICAgIHN0YXRlWzBdW2tleV0gPSBkYXRhO1xuICAgICAgc3RhdGVbMV0gPSBrZXk7XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoZXF1YWxDaGVjayA9IGlzRXF1YWxEZWZhdWx0KSB7XG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgICAgU3RhdGVNb2R1bGUuYWN0aW9uR2VuZXJhdGUoZXF1YWxDaGVjaylcbiAgICApO1xuXG4gICAgdGhpcy5jb25maWd1cmF0aW9uID0ge307XG4gICAgdGhpcy5jdXJyZW50Q29uZmlnID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMucHJldkNvbmZpZyA9ICdkZWZhdWx0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmF1bHRcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbmZpZ3VyYXRpb24gc2V0dXBcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZVxuICAgKiBuZXcgV0hTLlN0YXRlTW9kdWxlKCkuZGVmYXVsdCh7XG4gICAqICAgc3BoZXJlQ29sb3I6IFVUSUxTLiRjb2xvcnMubWVzaCxcbiAgICogICBwbGFuZUNvbG9yOiAweDQ0N0Y4QlxuICAgKiB9KVxuICAgKi9cbiAgZGVmYXVsdChkYXRhKSB7XG4gICAgdGhpcy5jb25maWcoe2RlZmF1bHQ6IGRhdGF9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldEVxdWFsQ2hlY2tcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgYW4gZXF1YWxDaGVjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHNldHVwXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIHNldEVxdWFsQ2hlY2soZnVuYykge1xuICAgIHRoaXMuc3RvcmUucmVwbGFjZVJlZHVjZXIoXG4gICAgICBTdGF0ZU1vZHVsZS5hY3Rpb25HZW5lcmF0ZShmdW5jKVxuICAgICk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnc3RhdGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvbmZpZ1xuICAgKiBAZGVzY3JpcHRpb24gTG9hZCBjb25maWd1cmF0aW9ucyBmcm9tIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ3MgQ29uZmlndXJhdGlvbiBkYXRhXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IEFkZGluZyBgZ3JlZW5gIGNvbmZpZ3VyYXRpb248L2NhcHRpb24+XG4gICAqIHN0YXRlLmNvbmZpZyh7XG4gICAqICAgZ3JlZW46IHtcbiAgICogICAgIHNwaGVyZUNvbG9yOiAweDAwZmYwMCxcbiAgICogICAgIHBsYW5lQ29sb3I6IDB4MDBmZjAwXG4gICAqICAgfVxuICAgKiB9KTtcbiAgICovXG4gIGNvbmZpZyhjb25maWdzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlncykge1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25ba2V5XSA9IGtleSA9PT0gJ2RlZmF1bHQnXG4gICAgICAgICAgPyBjb25maWdzW2tleV1cbiAgICAgICAgICA6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlndXJhdGlvbi5kZWZhdWx0LCBjb25maWdzW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gTG9hZCB1cGRhdGVzIGZyb20gb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gdXBkYXRlcyBVcGRhdGVzIGRhdGFcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj4gVXBkYXRlIGNhbGxiYWNrIGZvciBgc3BoZXJlQ29sb3JgPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS51cGRhdGUoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiBjb2xvciA9PiBzcGhlcmUubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KGNvbG9yKVxuICAgKiB9KTtcbiAgICovXG4gIHVwZGF0ZSh1cGRhdGVzID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBbZGF0YSwgY2hhbmdlZEtleV0gPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHVwZGF0ZXNbY2hhbmdlZEtleV07XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YVtjaGFuZ2VkS2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB0b1xuICAgKiBAZGVzY3JpcHRpb24gU3dpdGNoIHRvIGNvbmZpZ3VyYXRpb24uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWdOYW1lIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ2hhbmdlcyBjb25maWd1cmF0aW9uIHRvIGBncmVlbmA8L2NhcHRpb24+XG4gICAqIHN0YXRlLnRvKCdncmVlbicpO1xuICAgKi9cbiAgdG8oY29uZmlnTmFtZSkge1xuICAgIHRoaXMucHJldkNvbmZpZyA9IHRoaXMuY3VycmVudENvbmZpZztcbiAgICB0aGlzLmN1cnJlbnRDb25maWcgPSBjb25maWdOYW1lO1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdXG4gICAgICA/IHRoaXMuY29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgOiB0aGlzLmNvbmZpZ3VyYXRpb24uZGVmYXVsdDtcblxuICAgIHRoaXMuc2V0KGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQGRlc2NyaXB0aW9uIFNldCBjdXJyZW50IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbmZpZ3VyYXRpb24gcGFyYW1ldGVycy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZVxuICAgKiBzdGF0ZS5zZXQoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiAweDAwZmYwMFxuICAgKiB9KTtcbiAgICovXG4gIHNldChkYXRhKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSlcbiAgICAgIGlmIChrZXkpIHRoaXMuc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdBREQnLCBrZXksIGRhdGE6IGRhdGFba2V5XX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gZGF0YSBvZiBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogc3RhdGUuZ2V0KCdzcGhlcmVDb2xvcicpOyAvLyAweDAwZmYwMFxuICAgKi9cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHByZXZcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiBgdHJ1ZVZhbGAgaWYgYGNvbmZpZ2AgbWF0Y2ggcHJldmlvdXMgY29uZmlndXJhdGlvbiwgaW4gb3RoZXIgY2FzZSAtIHJldHVybiBgZmFsc2VWYWxgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQHBhcmFtIHtBbnl9IHRydWVWYWwgVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIHRydXRoeS5cbiAgICogQHBhcmFtIHtBbnl9IGZhbHNlVmFsIENWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgZmFsc3kuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIHByZXYoY29uZmlnLCB0cnVlVmFsLCBmYWxzZVZhbCkge1xuICAgIHJldHVybiB0aGlzLnByZXZDb25maWcgPT09IGNvbmZpZyA/IHRydWVWYWwgOiBmYWxzZVZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGN1cnJlbnRcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiBgdHJ1ZVZhbGAgaWYgYGNvbmZpZ2AgbWF0Y2ggY3VycmVudCBjb25maWd1cmF0aW9uLCBpbiBvdGhlciBjYXNlIC0gcmV0dXJuIGBmYWxzZVZhbGAuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge0FueX0gdHJ1ZVZhbCBWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgdHJ1dGh5LlxuICAgKiBAcGFyYW0ge0FueX0gZmFsc2VWYWwgQ1ZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyBmYWxzeS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgY3VycmVudChjb25maWcsIHRydWVWYWwsIGZhbHNlVmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENvbmZpZyA9PT0gY29uZmlnID8gdHJ1ZVZhbCA6IGZhbHNlVmFsO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBNT1VTRSxcbiAgUXVhdGVybmlvbixcbiAgU3BoZXJpY2FsLFxuICBWZWN0b3IyLFxuICBQZXJzcGVjdGl2ZUNhbWVyYSxcbiAgT3J0aG9ncmFwaGljQ2FtZXJhLFxuICBFdmVudERpc3BhdGNoZXIsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG4vLyBUaGlzIHNldCBvZiBjb250cm9scyBwZXJmb3JtcyBvcmJpdGluZywgZG9sbHlpbmcgKHpvb21pbmcpLCBhbmQgcGFubmluZy5cbi8vIFVubGlrZSBUcmFja2JhbGxDb250cm9scywgaXQgbWFpbnRhaW5zIHRoZSBcInVwXCIgZGlyZWN0aW9uIG9iamVjdC51cCAoK1kgYnkgZGVmYXVsdCkuXG4vL1xuLy8gICAgT3JiaXQgLSBsZWZ0IG1vdXNlIC8gdG91Y2g6IG9uZSBmaW5nZXIgbW92ZVxuLy8gICAgWm9vbSAtIG1pZGRsZSBtb3VzZSwgb3IgbW91c2V3aGVlbCAvIHRvdWNoOiB0d28gZmluZ2VyIHNwcmVhZCBvciBzcXVpc2hcbi8vICAgIFBhbiAtIHJpZ2h0IG1vdXNlLCBvciBhcnJvdyBrZXlzIC8gdG91Y2g6IHRocmVlIGZpbnRlciBzd2lwZVxuXG5leHBvcnQgY2xhc3MgVGhyZWVPcmJpdENvbnRyb2xzIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3Iob2JqZWN0LCBkb21FbGVtZW50LCBldmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSAoZG9tRWxlbWVudCA9PT0gdW5kZWZpbmVkKSA/IGRvY3VtZW50IDogZG9tRWxlbWVudDtcbiAgICB0aGlzLmV2ZW50SGFuZGxlciA9IGV2ZW50SGFuZGxlcjtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAvLyBcInRhcmdldFwiIHNldHMgdGhlIGxvY2F0aW9uIG9mIGZvY3VzLCB3aGVyZSB0aGUgb2JqZWN0IG9yYml0cyBhcm91bmRcbiAgICB0aGlzLnRhcmdldCA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gZG9sbHkgaW4gYW5kIG91dCAoIFBlcnNwZWN0aXZlQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMubWF4RGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiB6b29tIGluIGFuZCBvdXQgKCBPcnRob2dyYXBoaWNDYW1lcmEgb25seSApXG4gICAgdGhpcy5taW5ab29tID0gMDtcbiAgICB0aGlzLm1heFpvb20gPSBJbmZpbml0eTtcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBvcmJpdCB2ZXJ0aWNhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuICAgIC8vIFJhbmdlIGlzIDAgdG8gTWF0aC5QSSByYWRpYW5zLlxuICAgIHRoaXMubWluUG9sYXJBbmdsZSA9IDA7IC8vIHJhZGlhbnNcbiAgICB0aGlzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJOyAvLyByYWRpYW5zXG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgaG9yaXpvbnRhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuICAgIC8vIElmIHNldCwgbXVzdCBiZSBhIHN1Yi1pbnRlcnZhbCBvZiB0aGUgaW50ZXJ2YWwgWyAtIE1hdGguUEksIE1hdGguUEkgXS5cbiAgICB0aGlzLm1pbkF6aW11dGhBbmdsZSA9IC1JbmZpbml0eTsgLy8gcmFkaWFuc1xuICAgIHRoaXMubWF4QXppbXV0aEFuZ2xlID0gSW5maW5pdHk7IC8vIHJhZGlhbnNcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGVuYWJsZSBkYW1waW5nIChpbmVydGlhKVxuICAgIC8vIElmIGRhbXBpbmcgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG4gICAgdGhpcy5lbmFibGVEYW1waW5nID0gZmFsc2U7XG4gICAgdGhpcy5kYW1waW5nRmFjdG9yID0gMC4yNTtcblxuICAgIC8vIFRoaXMgb3B0aW9uIGFjdHVhbGx5IGVuYWJsZXMgZG9sbHlpbmcgaW4gYW5kIG91dDsgbGVmdCBhcyBcInpvb21cIiBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgem9vbWluZ1xuICAgIHRoaXMuZW5hYmxlWm9vbSA9IHRydWU7XG4gICAgdGhpcy56b29tU3BlZWQgPSAxLjA7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSByb3RhdGluZ1xuICAgIHRoaXMuZW5hYmxlUm90YXRlID0gdHJ1ZTtcbiAgICB0aGlzLnJvdGF0ZVNwZWVkID0gMS4wO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcGFubmluZ1xuICAgIHRoaXMuZW5hYmxlUGFuID0gdHJ1ZTtcbiAgICB0aGlzLmtleVBhblNwZWVkID0gNy4wOyAvLyBwaXhlbHMgbW92ZWQgcGVyIGFycm93IGtleSBwdXNoXG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBhdXRvbWF0aWNhbGx5IHJvdGF0ZSBhcm91bmQgdGhlIHRhcmdldFxuICAgIC8vIElmIGF1dG8tcm90YXRlIGlzIGVuYWJsZWQsIHlvdSBtdXN0IGNhbGwgY29udHJvbHMudXBkYXRlKCkgaW4geW91ciBhbmltYXRpb24gbG9vcFxuICAgIHRoaXMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuYXV0b1JvdGF0ZVNwZWVkID0gMi4wOyAvLyAzMCBzZWNvbmRzIHBlciByb3VuZCB3aGVuIGZwcyBpcyA2MFxuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdXNlIG9mIHRoZSBrZXlzXG4gICAgdGhpcy5lbmFibGVLZXlzID0gdHJ1ZTtcblxuICAgIC8vIFRoZSBmb3VyIGFycm93IGtleXNcbiAgICB0aGlzLmtleXMgPSB7TEVGVDogMzcsIFVQOiAzOCwgUklHSFQ6IDM5LCBCT1RUT006IDQwfTtcblxuICAgIC8vIE1vdXNlIGJ1dHRvbnNcbiAgICB0aGlzLm1vdXNlQnV0dG9ucyA9IHtPUkJJVDogTU9VU0UuTEVGVCwgWk9PTTogTU9VU0UuTUlERExFLCBQQU46IE1PVVNFLlJJR0hUfTtcblxuICAgIC8vIGZvciByZXNldFxuICAgIHRoaXMudGFyZ2V0MCA9IHRoaXMudGFyZ2V0LmNsb25lKCk7XG4gICAgdGhpcy5wb3NpdGlvbjAgPSB0aGlzLm9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuICAgIHRoaXMuem9vbTAgPSB0aGlzLm9iamVjdC56b29tO1xuXG4gICAgLy9cbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vXG5cbiAgICB0aGlzLmdldFBvbGFyQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gc3BoZXJpY2FsLnBoaTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBemltdXRoYWxBbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBzcGhlcmljYWwudGhldGE7XG4gICAgfTtcblxuICAgIHRoaXMucmVzZXQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRhcmdldC5jb3B5KHRoaXMudGFyZ2V0MCk7XG4gICAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5jb3B5KHRoaXMucG9zaXRpb24wKTtcbiAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSB0aGlzLnpvb20wO1xuXG4gICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIC8vIHRoaXMgbWV0aG9kIGlzIGV4cG9zZWQsIGJ1dCBwZXJoYXBzIGl0IHdvdWxkIGJlIGJldHRlciBpZiB3ZSBjYW4gbWFrZSBpdCBwcml2YXRlLi4uXG4gICAgdGhpcy51cGRhdGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICAvLyBzbyBjYW1lcmEudXAgaXMgdGhlIG9yYml0IGF4aXNcbiAgICAgIGNvbnN0IHF1YXQgPSBuZXcgUXVhdGVybmlvbigpLnNldEZyb21Vbml0VmVjdG9ycyhvYmplY3QudXAsIG5ldyBWZWN0b3IzKDAsIDEsIDApKTtcbiAgICAgIGNvbnN0IHF1YXRJbnZlcnNlID0gcXVhdC5jbG9uZSgpLmludmVyc2UoKTtcblxuICAgICAgY29uc3QgbGFzdFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcbiAgICAgIGNvbnN0IGxhc3RRdWF0ZXJuaW9uID0gbmV3IFF1YXRlcm5pb24oKTtcblxuICAgICAgcmV0dXJuICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XG5cbiAgICAgICAgb2Zmc2V0LmNvcHkocG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgLy8gcm90YXRlIG9mZnNldCB0byBcInktYXhpcy1pcy11cFwiIHNwYWNlXG4gICAgICAgIG9mZnNldC5hcHBseVF1YXRlcm5pb24ocXVhdCk7XG5cbiAgICAgICAgLy8gYW5nbGUgZnJvbSB6LWF4aXMgYXJvdW5kIHktYXhpc1xuICAgICAgICBzcGhlcmljYWwuc2V0RnJvbVZlY3RvcjMob2Zmc2V0KTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvUm90YXRlICYmIHN0YXRlID09PSBTVEFURS5OT05FKVxuICAgICAgICAgIHJvdGF0ZUxlZnQoZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSk7XG5cbiAgICAgICAgc3BoZXJpY2FsLnRoZXRhICs9IHNwaGVyaWNhbERlbHRhLnRoZXRhO1xuICAgICAgICBzcGhlcmljYWwucGhpICs9IHNwaGVyaWNhbERlbHRhLnBoaTtcblxuICAgICAgICAvLyByZXN0cmljdCB0aGV0YSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC50aGV0YSA9IE1hdGgubWF4KHRoaXMubWluQXppbXV0aEFuZ2xlLCBNYXRoLm1pbih0aGlzLm1heEF6aW11dGhBbmdsZSwgc3BoZXJpY2FsLnRoZXRhKSk7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgcGhpIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnBoaSA9IE1hdGgubWF4KHRoaXMubWluUG9sYXJBbmdsZSwgTWF0aC5taW4odGhpcy5tYXhQb2xhckFuZ2xlLCBzcGhlcmljYWwucGhpKSk7XG5cbiAgICAgICAgc3BoZXJpY2FsLm1ha2VTYWZlKCk7XG5cbiAgICAgICAgc3BoZXJpY2FsLnJhZGl1cyAqPSBzY2FsZTtcblxuICAgICAgICAvLyByZXN0cmljdCByYWRpdXMgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwucmFkaXVzID0gTWF0aC5tYXgodGhpcy5taW5EaXN0YW5jZSwgTWF0aC5taW4odGhpcy5tYXhEaXN0YW5jZSwgc3BoZXJpY2FsLnJhZGl1cykpO1xuXG4gICAgICAgIC8vIG1vdmUgdGFyZ2V0IHRvIHBhbm5lZCBsb2NhdGlvblxuICAgICAgICB0aGlzLnRhcmdldC5hZGQocGFuT2Zmc2V0KTtcblxuICAgICAgICBvZmZzZXQuc2V0RnJvbVNwaGVyaWNhbChzcGhlcmljYWwpO1xuXG4gICAgICAgIC8vIHJvdGF0ZSBvZmZzZXQgYmFjayB0byBcImNhbWVyYS11cC12ZWN0b3ItaXMtdXBcIiBzcGFjZVxuICAgICAgICBvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKHF1YXRJbnZlcnNlKTtcblxuICAgICAgICBwb3NpdGlvbi5jb3B5KHRoaXMudGFyZ2V0KS5hZGQob2Zmc2V0KTtcblxuICAgICAgICB0aGlzLm9iamVjdC5sb29rQXQodGhpcy50YXJnZXQpO1xuXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZURhbXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS50aGV0YSAqPSAoMSAtIHRoaXMuZGFtcGluZ0ZhY3Rvcik7XG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEucGhpICo9ICgxIC0gdGhpcy5kYW1waW5nRmFjdG9yKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEuc2V0KDAsIDAsIDApO1xuXG4gICAgICAgIHNjYWxlID0gMTtcbiAgICAgICAgcGFuT2Zmc2V0LnNldCgwLCAwLCAwKTtcblxuICAgICAgICAvLyB1cGRhdGUgY29uZGl0aW9uIGlzOlxuICAgICAgICAvLyBtaW4oY2FtZXJhIGRpc3BsYWNlbWVudCwgY2FtZXJhIHJvdGF0aW9uIGluIHJhZGlhbnMpXjIgPiBFUFNcbiAgICAgICAgLy8gdXNpbmcgc21hbGwtYW5nbGUgYXBwcm94aW1hdGlvbiBjb3MoeC8yKSA9IDEgLSB4XjIgLyA4XG5cbiAgICAgICAgaWYgKHpvb21DaGFuZ2VkXG4gICAgICAgICAgfHwgbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKHRoaXMub2JqZWN0LnBvc2l0aW9uKSA+IEVQU1xuICAgICAgICAgIHx8IDggKiAoMSAtIGxhc3RRdWF0ZXJuaW9uLmRvdCh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKSkgPiBFUFMpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG4gICAgICAgICAgbGFzdFBvc2l0aW9uLmNvcHkodGhpcy5vYmplY3QucG9zaXRpb24pO1xuICAgICAgICAgIGxhc3RRdWF0ZXJuaW9uLmNvcHkodGhpcy5vYmplY3QucXVhdGVybmlvbik7XG4gICAgICAgICAgem9vbUNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwb3NlID0gKCkgPT4ge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlKTtcblxuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuXG4gICAgICAvLyB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Rpc3Bvc2UnIH0gKTsgLy8gc2hvdWxkIHRoaXMgYmUgYWRkZWQgaGVyZT9cbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBpbnRlcm5hbHNcbiAgICAvL1xuXG4gICAgY29uc3QgY2hhbmdlRXZlbnQgPSB7dHlwZTogJ2NoYW5nZSd9O1xuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSB7dHlwZTogJ3N0YXJ0J307XG4gICAgY29uc3QgZW5kRXZlbnQgPSB7dHlwZTogJ2VuZCd9O1xuXG4gICAgY29uc3QgU1RBVEUgPSB7Tk9ORTogLTEsIFJPVEFURTogMCwgRE9MTFk6IDEsIFBBTjogMiwgVE9VQ0hfUk9UQVRFOiAzLCBUT1VDSF9ET0xMWTogNCwgVE9VQ0hfUEFOOiA1fTtcblxuICAgIGxldCBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICBjb25zdCBFUFMgPSAwLjAwMDAwMTtcblxuICAgIC8vIGN1cnJlbnQgcG9zaXRpb24gaW4gc3BoZXJpY2FsIGNvb3JkaW5hdGVzXG4gICAgY29uc3Qgc3BoZXJpY2FsID0gbmV3IFNwaGVyaWNhbCgpO1xuICAgIGNvbnN0IHNwaGVyaWNhbERlbHRhID0gbmV3IFNwaGVyaWNhbCgpO1xuXG4gICAgbGV0IHNjYWxlID0gMTtcbiAgICBjb25zdCBwYW5PZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuICAgIGxldCB6b29tQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgcm90YXRlU3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZUVuZCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3Qgcm90YXRlRGVsdGEgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgY29uc3QgcGFuU3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbkVuZCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgcGFuRGVsdGEgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgY29uc3QgZG9sbHlTdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RGVsdGEgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgY29uc3QgZ2V0QXV0b1JvdGF0aW9uQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gMiAqIE1hdGguUEkgLyA2MCAvIDYwICogdGhpcy5hdXRvUm90YXRlU3BlZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFpvb21TY2FsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBNYXRoLnBvdygwLjk1LCB0aGlzLnpvb21TcGVlZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJvdGF0ZUxlZnQgPSBhbmdsZSA9PiB7XG4gICAgICBzcGhlcmljYWxEZWx0YS50aGV0YSAtPSBhbmdsZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgcm90YXRlVXAgPSBhbmdsZSA9PiB7XG4gICAgICBzcGhlcmljYWxEZWx0YS5waGkgLT0gYW5nbGU7XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbkxlZnQgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGlzdGFuY2UsIG9iamVjdE1hdHJpeCkgPT4ge1xuICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAwKTsgLy8gZ2V0IFggY29sdW1uIG9mIG9iamVjdE1hdHJpeFxuICAgICAgICB2Lm11bHRpcGx5U2NhbGFyKC1kaXN0YW5jZSk7XG4gICAgICAgIHBhbk9mZnNldC5hZGQodik7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBwYW5VcCA9ICgoKSA9PiB7XG4gICAgICBjb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkaXN0YW5jZSwgb2JqZWN0TWF0cml4KSA9PiB7XG4gICAgICAgIHYuc2V0RnJvbU1hdHJpeENvbHVtbihvYmplY3RNYXRyaXgsIDEpOyAvLyBnZXQgWSBjb2x1bW4gb2Ygb2JqZWN0TWF0cml4XG4gICAgICAgIHYubXVsdGlwbHlTY2FsYXIoZGlzdGFuY2UpO1xuICAgICAgICBwYW5PZmZzZXQuYWRkKHYpO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgLy8gZGVsdGFYIGFuZCBkZWx0YVkgYXJlIGluIHBpeGVsczsgcmlnaHQgYW5kIGRvd24gYXJlIHBvc2l0aXZlXG4gICAgY29uc3QgcGFuID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGVsdGFYLCBkZWx0YVkpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSkge1xuICAgICAgICAgIC8vIHBlcnNwZWN0aXZlXG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm9iamVjdC5wb3NpdGlvbjtcbiAgICAgICAgICBvZmZzZXQuY29weShwb3NpdGlvbikuc3ViKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICBsZXQgdGFyZ2V0RGlzdGFuY2UgPSBvZmZzZXQubGVuZ3RoKCk7XG5cbiAgICAgICAgICAvLyBoYWxmIG9mIHRoZSBmb3YgaXMgY2VudGVyIHRvIHRvcCBvZiBzY3JlZW5cbiAgICAgICAgICB0YXJnZXREaXN0YW5jZSAqPSBNYXRoLnRhbigodGhpcy5vYmplY3QuZm92IC8gMikgKiBNYXRoLlBJIC8gMTgwLjApO1xuXG4gICAgICAgICAgLy8gd2UgYWN0dWFsbHkgZG9uJ3QgdXNlIHNjcmVlbldpZHRoLCBzaW5jZSBwZXJzcGVjdGl2ZSBjYW1lcmEgaXMgZml4ZWQgdG8gc2NyZWVuIGhlaWdodFxuICAgICAgICAgIHBhbkxlZnQoMiAqIGRlbHRhWCAqIHRhcmdldERpc3RhbmNlIC8gZWxlbWVudC5jbGllbnRIZWlnaHQsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgICAgcGFuVXAoMiAqIGRlbHRhWSAqIHRhcmdldERpc3RhbmNlIC8gZWxlbWVudC5jbGllbnRIZWlnaHQsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgICAvLyBvcnRob2dyYXBoaWNcbiAgICAgICAgICBwYW5MZWZ0KGRlbHRhWCAqICh0aGlzLm9iamVjdC5yaWdodCAtIHRoaXMub2JqZWN0LmxlZnQpIC8gdGhpcy5vYmplY3Quem9vbSAvIGVsZW1lbnQuY2xpZW50V2lkdGgsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgICAgcGFuVXAoZGVsdGFZICogKHRoaXMub2JqZWN0LnRvcCAtIHRoaXMub2JqZWN0LmJvdHRvbSkgLyB0aGlzLm9iamVjdC56b29tIC8gZWxlbWVudC5jbGllbnRIZWlnaHQsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2FtZXJhIG5laXRoZXIgb3J0aG9ncmFwaGljIG5vciBwZXJzcGVjdGl2ZVxuICAgICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gcGFuIGRpc2FibGVkLicpO1xuICAgICAgICAgIHRoaXMuZW5hYmxlUGFuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGRvbGx5SW4gPSBkb2xseVNjYWxlID0+IHtcbiAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKVxuICAgICAgICBzY2FsZSAvPSBkb2xseVNjYWxlO1xuXG4gICAgICBlbHNlIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0NhbWVyYSkge1xuICAgICAgICB0aGlzLm9iamVjdC56b29tID0gTWF0aC5tYXgodGhpcy5taW5ab29tLCBNYXRoLm1pbih0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gKiBkb2xseVNjYWxlKSk7XG4gICAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgem9vbUNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzTW9kdWxlLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicpO1xuICAgICAgICB0aGlzLmVuYWJsZVpvb20gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZG9sbHlPdXQgPSBkb2xseVNjYWxlID0+IHtcbiAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKVxuICAgICAgICBzY2FsZSAqPSBkb2xseVNjYWxlO1xuXG4gICAgICBlbHNlIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0NhbWVyYSkge1xuICAgICAgICB0aGlzLm9iamVjdC56b29tID0gTWF0aC5tYXgodGhpcy5taW5ab29tLCBNYXRoLm1pbih0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gLyBkb2xseVNjYWxlKSk7XG4gICAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgem9vbUNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzTW9kdWxlLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicpO1xuICAgICAgICB0aGlzLmVuYWJsZVpvb20gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBldmVudCBjYWxsYmFja3MgLSB1cGRhdGUgdGhlIG9iamVjdCBzdGF0ZVxuICAgIC8vXG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd25Sb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93blJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlU3RhcnQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd25Eb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duRG9sbHknICk7XG5cbiAgICAgIGRvbGx5U3RhcnQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd25QYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93blBhbicgKTtcblxuICAgICAgcGFuU3RhcnQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmVSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlTW92ZVJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlRW5kLnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMocm90YXRlRW5kLCByb3RhdGVTdGFydCk7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcbiAgICAgIHJvdGF0ZUxlZnQoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcbiAgICAgIHJvdGF0ZVVwKDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkocm90YXRlRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlTW92ZURvbGx5JyApO1xuXG4gICAgICBkb2xseUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XG5cbiAgICAgIGlmIChkb2xseURlbHRhLnkgPiAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZWxzZSBpZiAoZG9sbHlEZWx0YS55IDwgMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBkb2xseVN0YXJ0LmNvcHkoZG9sbHlFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmVQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlTW92ZVBhbicgKTtcblxuICAgICAgcGFuRW5kLnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyhwYW5FbmQsIHBhblN0YXJ0KTtcblxuICAgICAgcGFuKHBhbkRlbHRhLngsIHBhbkRlbHRhLnkpO1xuXG4gICAgICBwYW5TdGFydC5jb3B5KHBhbkVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlVXAnICk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlV2hlZWwgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlV2hlZWwnICk7XG5cbiAgICAgIGlmIChldmVudC5kZWx0YVkgPCAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGV2ZW50LmRlbHRhWSA+IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVLZXlEb3duJyApO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSB0aGlzLmtleXMuVVA6XG4gICAgICAgICAgcGFuKDAsIHRoaXMua2V5UGFuU3BlZWQpO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuQk9UVE9NOlxuICAgICAgICAgIHBhbigwLCAtdGhpcy5rZXlQYW5TcGVlZCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5MRUZUOlxuICAgICAgICAgIHBhbih0aGlzLmtleVBhblNwZWVkLCAwKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLlJJR0hUOlxuICAgICAgICAgIHBhbigtdGhpcy5rZXlQYW5TcGVlZCwgMCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0Um90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0Um90YXRlJyApO1xuXG4gICAgICByb3RhdGVTdGFydC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnREb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydERvbGx5JyApO1xuXG4gICAgICBjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICBkb2xseVN0YXJ0LnNldCgwLCBkaXN0YW5jZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnRQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnRQYW4nICk7XG5cbiAgICAgIHBhblN0YXJ0LnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaE1vdmVSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZUVuZC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQpO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXG4gICAgICByb3RhdGVMZWZ0KDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgLy8gcm90YXRpbmcgdXAgYW5kIGRvd24gYWxvbmcgd2hvbGUgc2NyZWVuIGF0dGVtcHRzIHRvIGdvIDM2MCwgYnV0IGxpbWl0ZWQgdG8gMTgwXG4gICAgICByb3RhdGVVcCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICByb3RhdGVTdGFydC5jb3B5KHJvdGF0ZUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZURvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaE1vdmVEb2xseScgKTtcblxuICAgICAgY29uc3QgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgZG9sbHlFbmQuc2V0KDAsIGRpc3RhbmNlKTtcblxuICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKGRvbGx5RW5kLCBkb2xseVN0YXJ0KTtcblxuICAgICAgaWYgKGRvbGx5RGVsdGEueSA+IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZWxzZSBpZiAoZG9sbHlEZWx0YS55IDwgMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZVBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlUGFuJyApO1xuXG4gICAgICBwYW5FbmQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuXG4gICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKHBhbkVuZCwgcGFuU3RhcnQpO1xuXG4gICAgICBwYW4ocGFuRGVsdGEueCwgcGFuRGVsdGEueSk7XG5cbiAgICAgIHBhblN0YXJ0LmNvcHkocGFuRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hFbmQgPSAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoRW5kJyApO1xuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGV2ZW50IGhhbmRsZXJzIC0gRlNNOiBsaXN0ZW4gZm9yIGV2ZW50cyBhbmQgcmVzZXQgc3RhdGVcbiAgICAvL1xuXG4gICAgY29uc3Qgb25Nb3VzZURvd24gPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSB0aGlzLm1vdXNlQnV0dG9ucy5PUkJJVCkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duUm90YXRlKGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlJPVEFURTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuYnV0dG9uID09PSB0aGlzLm1vdXNlQnV0dG9ucy5aT09NKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duRG9sbHkoZXZlbnQpO1xuXG4gICAgICAgIHN0YXRlID0gU1RBVEUuRE9MTFk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuUEFOKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25QYW4oZXZlbnQpO1xuXG4gICAgICAgIHN0YXRlID0gU1RBVEUuUEFOO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLk5PTkUpIHtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gU1RBVEUuUk9UQVRFKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVSb3RhdGUoZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gU1RBVEUuRE9MTFkpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVEb2xseShldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBTVEFURS5QQU4pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZVBhbihldmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VVcCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZU1vdXNlVXAoZXZlbnQpO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VXaGVlbCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlIHx8IHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UgfHwgKHN0YXRlICE9PSBTVEFURS5OT05FICYmIHN0YXRlICE9PSBTVEFURS5ST1RBVEUpKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaGFuZGxlTW91c2VXaGVlbChldmVudCk7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTsgLy8gbm90IHN1cmUgd2h5IHRoZXNlIGFyZSBoZXJlLi4uXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvbktleURvd24gPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZUtleXMgPT09IGZhbHNlIHx8IHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVLZXlEb3duKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaFN0YXJ0ID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgc3dpdGNoIChldmVudC50b3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDE6IC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0Um90YXRlKGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOiAvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydERvbGx5KGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfRE9MTFk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6IC8vIHRocmVlLWZpbmdlcmVkIHRvdWNoOiBwYW5cblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnRQYW4oZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9QQU47XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuTk9ORSlcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoTW92ZSA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgc3dpdGNoIChldmVudC50b3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDE6IC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9ST1RBVEUpIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVSb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOiAvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfRE9MTFkpIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVEb2xseShldmVudCk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6IC8vIHRocmVlLWZpbmdlcmVkIHRvdWNoOiBwYW5cblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX1BBTikgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZVBhbihldmVudCk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hFbmQgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVUb3VjaEVuZChldmVudCk7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Db250ZXh0TWVudSA9IGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIC8vXG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51LCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignd2hlZWwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcblxuICAgIC8vIGZvcmNlIGFuIHVwZGF0ZSBhdCBzdGFydFxuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGdldCBjZW50ZXIoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuY2VudGVyIGhhcyBiZWVuIHJlbmFtZWQgdG8gLnRhcmdldCcpO1xuICAgIHJldHVybiB0aGlzLnRhcmdldDtcbiAgfVxuXG4gIGdldCBub1pvb20oKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9ab29tIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlWm9vbSBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVab29tO1xuICB9XG5cbiAgc2V0IG5vWm9vbSh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vWm9vbSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVpvb20gaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVpvb20gPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9Sb3RhdGUoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9Sb3RhdGUgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVSb3RhdGUgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlUm90YXRlO1xuICB9XG5cbiAgc2V0IG5vUm90YXRlKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9Sb3RhdGUgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVSb3RhdGUgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVJvdGF0ZSA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub1BhbigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1BhbiBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVBhbiBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVQYW47XG4gIH1cblxuICBzZXQgbm9QYW4odmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1BhbiBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVBhbiBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlUGFuID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vS2V5cygpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub0tleXMgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVLZXlzIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZUtleXM7XG4gIH1cblxuICBzZXQgbm9LZXlzKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9LZXlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlS2V5cyBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlS2V5cyA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBzdGF0aWNNb3ZpbmcoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuc3RhdGljTW92aW5nIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlRGFtcGluZyBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVEYW1waW5nO1xuICB9XG5cbiAgc2V0IHN0YXRpY01vdmluZyh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZURhbXBpbmcgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgZHluYW1pY0RhbXBpbmdGYWN0b3IoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuZHluYW1pY0RhbXBpbmdGYWN0b3IgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIC5kYW1waW5nRmFjdG9yIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuIHRoaXMuZGFtcGluZ0ZhY3RvcjtcbiAgfVxuXG4gIHNldCBkeW5hbWljRGFtcGluZ0ZhY3Rvcih2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmR5bmFtaWNEYW1waW5nRmFjdG9yIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSAuZGFtcGluZ0ZhY3RvciBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZGFtcGluZ0ZhY3RvciA9IHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q29udHJvbHNNb2R1bGV9IGZyb20gJy4uL0NvbnRyb2xzTW9kdWxlJztcblxuaW1wb3J0IHtUaHJlZU9yYml0Q29udHJvbHN9IGZyb20gJy4vbGliL1RocmVlT3JiaXRDb250cm9scyc7XG5cbmV4cG9ydCBjbGFzcyBPcmJpdENvbnRyb2xzTW9kdWxlIGV4dGVuZHMgQ29udHJvbHNNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcyk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZm9sbG93OiBmYWxzZSxcbiAgICAgIG9iamVjdDogbnVsbCxcbiAgICAgIHRhcmdldDogbmV3IFZlY3RvcjMoMCwgMCwgMClcbiAgICB9LCBwYXJhbXMpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgc3VwZXIubWFuYWdlcihtYW5hZ2VyKTtcblxuICAgIGNvbnN0IHtvYmplY3Q6IG9iaiwgZm9sbG93LCB0YXJnZXR9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3Qgb2JqZWN0ID0gb2JqID8gb2JqLm5hdGl2ZSA6IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmU7XG5cbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBUaHJlZU9yYml0Q29udHJvbHMoXG4gICAgICBvYmplY3QsXG4gICAgICBtYW5hZ2VyLmdldCgnZWxlbWVudCcpLFxuICAgICAgbWFuYWdlci5oYW5kbGVyXG4gICAgKTtcblxuICAgIGNvbnN0IHVwZGF0ZVByb2Nlc3NvciA9IGZvbGxvdyA/IGMgPT4ge1xuICAgICAgY29udHJvbHMudXBkYXRlKGMuZ2V0RGVsdGEoKSk7XG4gICAgICBjb250cm9scy50YXJnZXQuY29weSh0YXJnZXQpO1xuICAgIH0gOiBjID0+IHtcbiAgICAgIGNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldENvbnRyb2xzKGNvbnRyb2xzKTtcbiAgICB0aGlzLnNldFVwZGF0ZSh1cGRhdGVQcm9jZXNzb3IpO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICBpZiAob2JqKSByZXR1cm47XG4gICAgICAgIGNvbnRyb2xzLm9iamVjdCA9IGNhbWVyYS5uYXRpdmU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250cm9scy50YXJnZXQuY29weSh0YXJnZXQpO1xuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL2FwcC9jb250cm9scyAqL1xuZXhwb3J0ICogZnJvbSAnLi9PcmJpdENvbnRyb2xzTW9kdWxlJztcbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvYXBwICovXG5leHBvcnQgKiBmcm9tICcuL0VsZW1lbnRNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9SZW5kZXJpbmdNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9TY2VuZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1Jlc2l6ZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1Bvc3RQcm9jZXNzb3JNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9WaXJ0dWFsTW91c2VNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9FdmVudHNQYXRjaE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbnRyb2xzTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vRm9nTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdGVNb2R1bGUnO1xuXG4vLyBjb250cm9sc1xuZXhwb3J0ICogZnJvbSAnLi9jb250cm9scy9pbmRleCc7XG4iLCIvKipcbiAqIEBjbGFzcyBEeW5hbWljR2VvbWV0cnlNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL21lc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXthdHRyaWJ1dGVzOiBmYWxzZX1dIC0gcGFyYW1zXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXRjaEV2ZW50cz10cnVlXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqL1xuZXhwb3J0IGNsYXNzIER5bmFtaWNHZW9tZXRyeU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlXG4gICAgfSwgcGFyYW1zKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc2VsZi5wYXJhbXM7XG5cbiAgICB0aGlzLmdfID0gZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XG4gICAgICBpZiAodGhpcy5idWlsZEdlb21ldHJ5KSB7XG4gICAgICAgIHRoaXMubmF0aXZlLmdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KFxuICAgICAgICAgIHRoaXMudXBkYXRlUGFyYW1zKHtnZW9tZXRyeTogcGFyYW1zfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBhcmFtcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnBhcmFtcy5nZW9tZXRyeSkge1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGBnXyR7a2V5fWAsIHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlLmdlb21ldHJ5LnBhcmFtZXRlcnNba2V5XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5uYXRpdmUuZ2VvbWV0cnkgPSB0aGlzLmJ1aWxkR2VvbWV0cnkodGhpcy51cGRhdGVQYXJhbXMoe2dlb21ldHJ5OiB7W2tleV06IHZhbHVlfX0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFJlcGVhdFdyYXBwaW5nLFxuICBVVk1hcHBpbmcsXG4gIE5lYXJlc3RGaWx0ZXIsXG4gIExpbmVhck1pcE1hcExpbmVhckZpbHRlcixcbiAgVGV4dHVyZUxvYWRlcixcbiAgVmVjdG9yMlxufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IGxvYWRlciA9IG5ldyBUZXh0dXJlTG9hZGVyKCk7XG5cbi8qKlxuICogQGNsYXNzIFRleHR1cmVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL21lc2hcbiAqIEBkZXNjcmlwdGlvbiBBIFRleHR1cmVNb2R1bGUgY2FuIGJlIGFwcGxpZWQgdG8gYW55IE1lc2ggb3IgTW9kZWwuXG4gKiBAcGFyYW0ge0FycmF5fSBbdGV4dHVyZXNdIC0gYXJyYXkgb2YgdGV4dHVyZSBvYmplY3RzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gaW5zdGFuY2UuIHVybCB0YWtlcyBhIHBhdGgsIG9yIGEgZGF0YSBvYmplY3QuPC9jYXB0aW9uPlxuICogdmFyIHdvb2RUZXh0dXJlID0gbmV3IFRleHR1cmVNb2R1bGUoe1xuICogICB1cmw6IGAke3Byb2Nlc3MuYXNzZXRzUGF0aH0vdGV4dHVyZXMvd29vZC5qcGdgXG4gKiB9KTtcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1vcmUgY29tcHJlaGVuc2l2ZSBleGFtcGxlLCB3b29kIHRleHR1cmUgYXBwbGllZCB0byBhIEJveC48L2NhcHRpb24+XG4gKiBuZXcgQm94KHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICB3aWR0aDogMixcbiAqICAgICBoZWlnaHQ6IDIsXG4gKiAgICAgZGVwdGg6IDJcbiAqICAgfSxcbiAqICAgbW9kdWxlczogW1xuICogICAgIG5ldyBUZXh0dXJlTW9kdWxlKHtcbiAqICAgICAgIHVybDogYHBhdGgvdG8vdGV4dHVyZS5qcGdgLFxuICogICAgICAgcmVwZWF0OiBuZXcgVEhSRUUuVmVjdG9yMigxLCAxKSAvLyBvcHRpb25hbFxuICogICAgIH0pXG4gKiAgIF0sXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFRleHR1cmVNb2R1bGUge1xuICBzdGF0aWMgbG9hZCh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFRleHR1cmVNb2R1bGUoe3VybH0pLnRleHR1cmVzWzBdWzFdO1xuICB9XG5cbiAgdGV4dHVyZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvciguLi50ZXh0dXJlcykge1xuICAgIHRleHR1cmVzLmZvckVhY2goKHtcbiAgICAgIHVybCxcbiAgICAgIHR5cGUgPSAnbWFwJyxcbiAgICAgIG9mZnNldCA9IG5ldyBWZWN0b3IyKDAsIDApLFxuICAgICAgcmVwZWF0ID0gbmV3IFZlY3RvcjIoMSwgMSksXG4gICAgICB3cmFwID0gUmVwZWF0V3JhcHBpbmcsXG4gICAgICBtYXBwaW5nID0gVVZNYXBwaW5nLFxuICAgICAgZml4ID0gdGV4ID0+IHRleFxuICAgIH0pID0+IHtcbiAgICAgIGNvbnN0IHRleHR1cmUgPSBsb2FkZXIubG9hZCh1cmwpO1xuXG4gICAgICBpZiAod3JhcC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRleHR1cmUud3JhcFMgPSB3cmFwWzBdO1xuICAgICAgICB0ZXh0dXJlLndyYXBUID0gd3JhcFsxXTtcbiAgICAgIH0gZWxzZVxuICAgICAgICB0ZXh0dXJlLndyYXBTID0gdGV4dHVyZS53cmFwVCA9IHdyYXA7XG5cbiAgICAgIHRleHR1cmUubWFwcGluZyA9IG1hcHBpbmc7XG5cbiAgICAgIHRleHR1cmUub2Zmc2V0LmNvcHkob2Zmc2V0KTtcbiAgICAgIHRleHR1cmUucmVwZWF0LmNvcHkocmVwZWF0KTtcblxuICAgICAgdGV4dHVyZS5tYWdGaWx0ZXIgPSBOZWFyZXN0RmlsdGVyO1xuICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSBMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXI7XG5cbiAgICAgIHRoaXMudGV4dHVyZXMucHVzaChbdHlwZSwgZml4KHRleHR1cmUpXSk7XG4gICAgfSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWF0ZXJpYWwobWF0ZXJpYWwsIHNlbGYpIHtcbiAgICAgIHNlbGYudGV4dHVyZXMuZm9yRWFjaCh0ZXh0dXJlID0+IHtcbiAgICAgICAgbWF0ZXJpYWxbdGV4dHVyZVswXV0gPSB0ZXh0dXJlWzFdO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFuaW1hdGlvbk1peGVyLFxuICBBbmltYXRpb25DbGlwLFxuICBDbG9ja1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuLyoqXG4gKiBAY2xhc3MgQW5pbWF0aW9uTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAZGVzY3JpcHRpb24gQ29udmVuaWVuY2UgbW9kdWxlIHRoYXQgd3JhcHMgdGhlIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jbWFudWFsL2ludHJvZHVjdGlvbi9BbmltYXRpb24tc3lzdGVtJz50aHJlZS5qcyBhbmltYXRpb24gc3lzdGVtPC9hPlxuICogQHBhcmFtIHtBcHB9IGFwcCAtIHRoZSBhcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzRGVmZXJyZWQ9ZmFsc2VdIC0gc2V0IHRvIHRydWUgaWYgYW5pbWF0aW9uIHNob3VsZCBub3Qgc3RhcnQgYXV0b21hdGljYWxseVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e3NwZWVkOiAxfV0gLSB0aGUgcGFyYW1zXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFuaW1hdGlvbiBtb2R1bGUgYW5kIHBsYXkgYSBnaXZlbiBjbGlwIG9mIGFuIGltcG9ydGVkIG1vZGVsPC9jYXB0aW9uPlxuICogY29uc3QgYW5pbWF0aW9uTW9kdWxlID0gbmV3IEFuaW1hdGlvbk1vZHVsZShhcHAsIGZhbHNlLCB7XG4gKiAgIHNwZWVkOiAxLjIgLy8gc3BlZWQgdXAgYW5pbWF0aW9uIGJ5IDIwJVxuICogfSk7XG4gKlxuICogbmV3IEltcG9ydGVyKHtcbiAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAqICAgICAvLyBPdmVycmlkZSBwYXJzZSB0byBnZW5lcmF0ZSBhIHNraW5uZWRNZXNoLCBuZWVkZWQgZm9yIHNraW5uZWQgbW9kZWxzXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5Ta2lubmVkTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAqICAgfSxcbiAqXG4gKiAgIHVybDogYHBhdGgvdG8vbW9kZWwuanNvbmAsXG4gKiAgIHVzZUN1c3RvbU1hdGVyaWFsOiB0cnVlLFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gKiAgICAgc2tpbm5pbmc6IHRydWVcbiAqICAgfSksXG4gKlxuICogICBtb2R1bGVzOiBbYW5pbWF0aW9uTW9kdWxlXVxuICogfSkuYWRkVG8oYXBwKS50aGVuKCgpID0+IHtcbiAqICAgLy8gYWRkaW5nIG1vZGVsIHRvIGFwcCByZXR1cm5zIGEgcHJvbWlzZSwgc28gcGlwZSB0aGUgZnVuY3Rpb24gdG8ga2ljayBvZmYgdGhlIGFuaW1hdGlvbiBjbGlwXG4gKiAgIGFuaW1hdGlvbk1vZHVsZS5wbGF5KCdjbGlwTmFtZScpO1xuICogfSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihhcHAsIGlzRGVmZXJyZWQsIHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHNwZWVkOiAxXG4gICAgfSwgcGFyYW1zKTtcbiAgICB0aGlzLmNsb2NrID0gbmV3IENsb2NrKCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLmlzRGVmZXJyZWQgPSBpc0RlZmVycmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcGxheVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFBsYXlzIHRoZSBnaXZlbiBjbGlwIG5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsaXBOYW1lIC0gdGhlIGNsaXAgdG8gcGxheVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaC5BbmltYXRpb25Nb2R1bGVcbiAgICovXG4gIHBsYXkoY2xpcE5hbWUpIHtcbiAgICBjb25zdCBjbGlwID0gQW5pbWF0aW9uQ2xpcC5maW5kQnlOYW1lKHRoaXMuY2xpcHMsIGNsaXBOYW1lKTtcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLm1peGVyLmNsaXBBY3Rpb24oY2xpcCk7XG5cbiAgICBhY3Rpb24ucGxheSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIHRoZSBtaXhlciAoYmVpbmcgY2FsbGVkIG9uIGZyYW1lIGFuaW1hdGlvbiBsb29wKVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaC5BbmltYXRpb25Nb2R1bGVcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5taXhlcikgdGhpcy5taXhlci51cGRhdGUodGhpcy5jbG9jay5nZXREZWx0YSgpICogdGhpcy5wYXJhbXMuc3BlZWQpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLmxvb3AgPSBuZXcgTG9vcCgoKSA9PiB7XG4gICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzZWxmLmlzRGVmZXJyZWQpIHNlbGYubG9vcC5zdGFydChzZWxmLmFwcCk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnYW5pbWF0aW9uJyk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWVzaChtZXNoLCBzZWxmKSB7XG4gICAgICBtZXNoLmdlb21ldHJ5LnNrZWxldG9uID0gbWVzaC5za2VsZXRvbjtcblxuICAgICAgc2VsZi5taXhlciA9IG5ldyBBbmltYXRpb25NaXhlcihtZXNoLmdlb21ldHJ5KTtcbiAgICAgIHNlbGYuY2xpcHMgPSBtZXNoLmdlb21ldHJ5LmFuaW1hdGlvbnM7XG5cbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9tZXNoICovXG5leHBvcnQgKiBmcm9tICcuL0R5bmFtaWNHZW9tZXRyeU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1RleHR1cmVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9BbmltYXRpb25Nb2R1bGUnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRGVmaW5lTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlc1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIERlZmluZU1vZHVsZSB3aXRoIFBlcnNwZWN0aXZlQ2FtZXJhIGFzIGNhbWVyYSBtb2R1bGUgYW5kIHBhc3NpbmcgaXQgdG8gQXBwJ3MgbW9kdWxlczwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICAvLyAuLi5cbiAqICAgbmV3IERlZmluZU1vZHVsZSgnY2FtZXJhJywgbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCkpXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmluZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCh0aGlzLm5hbWUsIHRoaXMuZGF0YSk7XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMgKi9cblxuZXhwb3J0ICogZnJvbSAnLi9hcHAvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9tZXNoL2luZGV4JztcblxuLy8gbW9kdWxlc1xuZXhwb3J0ICogZnJvbSAnLi9EZWZpbmVNb2R1bGUnO1xuIiwiaW1wb3J0IHtJbXBvcnRlcn0gZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlcic7XG5pbXBvcnQge1BlcnNwZWN0aXZlQ2FtZXJhfSBmcm9tICcuL2NvbXBvbmVudHMvY2FtZXJhcy9QZXJzcGVjdGl2ZUNhbWVyYSc7XG5cbmV4cG9ydCBjbGFzcyBNb2RlbCBleHRlbmRzIEltcG9ydGVyIHtcbiAgY29uc3RydWN0b3IocGFyYW1zLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgY29uc29sZS53YXJuKCdNb2RlbCBpcyBkZXByZWNhdGVkLiBVc2UgSW1wb3J0ZXIgaW5zdGVhZC4nKTtcblxuICAgIGlmIChwYXJhbXMuZ2VvbWV0cnkpIHtcbiAgICAgIHBhcmFtcy51cmwgPSBwYXJhbXMuZ2VvbWV0cnkucGF0aDtcbiAgICAgIHBhcmFtcy5sb2FkZXIgPSBwYXJhbXMuZ2VvbWV0cnkubG9hZGVyO1xuICAgIH1cblxuICAgIHN1cGVyKHBhcmFtcywgLi4uYWRkaXRpb25hbCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbWVyYU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc29sZS53YXJuKCdDYW1lcmFNb2R1bGUgaXMgZGVwcmVjYXRlZC4gVXNlIERlZmluZU1vZHVsZSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHRoaXMuYWRkKHNlbGYuY2FtZXJhKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdjYW1lcmEnLCB0aGlzLmNhbWVyYSk7XG4gIH1cbn1cbiIsIi8qKlxuICogTmFtZXNwYWNlIGNvbnRhaW5pbmcgYWxsIGNsYXNzZXMgZnJvbSBhbGwgbW9kdWxlcy4gVXNlZCBhcyBnbG9iYWwgaW4gVU1EIHBhdHRlcm4uXG4gKiBAbmFtZXNwYWNlIFdIU1xuICogQGV4YW1wbGUgPGNhcHRpb24+VGhlIHVzZSBvZiBXSFMgbmFtZXNwYWNlLjwvY2FwdGlvbj5cbiAqIG5ldyBXSFMuQXBwKCkgLy8gY29yZVxuICogbmV3IFdIUy5QZXJzcGVjdGl2ZUNhbWVyYSgpIC8vIGNvbXBvbmVudHNcbiAqIG5ldyBXSFMuUmVzaXplTW9kdWxlKCkgLy8gbW9kdWxlc1xuICogV0hTLmV4dGVuZCgpIC8vIHV0aWxzXG4gKi9cblxuXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2xpZ2h0cy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2luZGV4JztcblxuLy8gREVQUkVDQVRJT05cbmV4cG9ydCAqIGZyb20gJy4vZGVwcmVjYXRpb24nO1xuIl0sIm5hbWVzIjpbImV4dGVuZCIsIm9iamVjdCIsImV4dGVuc2lvbnMiLCJleHRlbnNpb24iLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwicHJvcCIsInVuZGVmaW5lZCIsInRvU3RyaW5nIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJzbGljZSIsImluc3RydWN0IiwiYXJyYXkiLCJpbnN0QXJyYXkiLCJ0ZW1wT2JqZWN0IiwiaSIsIm1heCIsImxlbmd0aCIsImd1aWRlIiwidHJhbnNmb3JtRGF0YSIsImluc3RydWN0aW9ucyIsImtleSIsInRvQXJyYXkiLCJpbnN0cnVjdGlvbiIsInRlbXBBcnJheSIsIkNvbXBvc2l0aW9uRXJyb3IiLCJjbGFzc0luc3RhbmNlIiwibWVzc2FnZSIsImNvbXBvbmVudCIsInN0YWNrQXJyYXkiLCJzdGFjayIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiIsImNvbnNvbGUiLCJlcnJvciIsIm5hbWUiLCJFcnJvciIsIkRlcGVuZGVuY3lFcnJvciIsImFjdGl2ZU1vZHVsZSIsImRlcGVuZGVuY3lNb2R1bGUiLCJNYW5hZ2VyRXJyb3IiLCJ3YXJuRGVwcyIsIlJFVklTSU9OIiwiZXJyIiwiTW9kdWxlU3lzdGVtIiwic291cmNlIiwibW9kdWxlcyIsImFwcGx5TW9kdWxlIiwiYXBwbHlCcmlkZ2UiLCJvbkNvcHkiLCJicmlkZ2VNYXAiLCJtb2R1bGUiLCJicmlkZ2UiLCJhcHBseSIsImNiIiwiZnVuYyIsIm1vZHVsZVNjb3BlIiwicHVzaCIsIm1hbmFnZXIiLCJhY3RpdmUiLCJpbnRlZ3JhdGUiLCJiaW5kIiwiZGlzcG9zZU1vZHVsZSIsImluZGV4T2YiLCJkaXNwb3NlIiwiRXZlbnRzIiwiU3ltYm9sIiwib2JqZWN0UHJvdG8iLCJoYXNPd25Qcm9wZXJ0eSIsInN5bVRvU3RyaW5nVGFnIiwibmF0aXZlT2JqZWN0VG9TdHJpbmciLCJyb290IiwicG9ueWZpbGwiLCIkJG9ic2VydmFibGUiLCJNb2R1bGVNYW5hZ2VyIiwiaGFuZGxlciIsImN1cnJlbnRNb2R1bGUiLCJzdG9yZSIsImNyZWF0ZVN0b3JlIiwic3RhdGUiLCJhY3Rpb24iLCJkYXRhIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsIkJvb2xlYW4iLCJkZXBzTWFwIiwic3Vic2NyaWJlIiwiY2hhbmdlZEtleSIsImNhbGxiYWNrIiwid2FybiIsInNldCIsIm1vZHVsZUV4ZWN1dG9yIiwidXNlIiwiQ29tcG9uZW50IiwicGFyYW1zIiwiZGVmYXVsdHMiLCJfd2FpdCIsImNoaWxkcmVuIiwiaW50ZWdyYXRlTW9kdWxlcyIsInByb21pc2UiLCJQcm9taXNlIiwiYWxsIiwiaXNEZWZmZXJlZCIsIndhaXQiLCJ0aGVuIiwiY29weSIsImN1c3RvbWl6ZSIsIm5hdGl2ZSIsImNsb25lIiwicGFyZW50IiwicmVzb2x2ZSIsInJlamVjdCIsImRlZmVyIiwiYWRkUHJvbWlzZSIsIm9uQWRkIiwicmVzb2x2ZXIiLCJhZGQiLCJyZW1vdmUiLCJfbWFuYWdlciIsIl9uYXRpdmUiLCJtZXNoIiwiYXR0cmlidXRlcyIsIm1hcHBlcnMiLCJ0YXJnZXQiLCJtYXBwZXIiLCJrIiwibWFwIiwiYXR0cmlidXRlIiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b3R5cGUiLCJnZXR0ZXIiLCJzZXR0ZXIiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwidmFsdWUiLCJtaXJyb3IiLCJNZXNoQ29tcG9uZW50IiwiZ2VvbSIsIk1lc2giLCJtYXRlcmlhbCIsImdlb21ldHJ5IiwiY3VzdG9tIiwiYnVpbGQiLCJ3cmFwIiwiYXBwbHlDb21tYW5kIiwicG9zaXRpb24iLCJyb3RhdGlvbiIsInNjYWxlIiwic2hhZG93IiwieCIsInkiLCJ6IiwiY2FzdFNoYWRvdyIsImNhc3QiLCJyZWNlaXZlU2hhZG93IiwicmVjZWl2ZSIsIm9uV3JhcCIsInF1YXRlcm5pb24iLCJkZXN0IiwiTGlnaHRDb21wb25lbnQiLCJtYXBTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJiaWFzIiwicmFkaXVzIiwic2hhZG93Q2FtZXJhIiwiY2FtZXJhIiwibmVhciIsImZhciIsImZvdiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIkNhbWVyYUNvbXBvbmVudCIsInN5c3RlbSIsIndpbmRvdyIsImdsb2JhbCIsInBlcmZvcm1hbmNlIiwicHJlc2VudCIsIkFwcCIsImxvZyIsInZlcnNpb24iLCJzaW11bGF0ZSIsInVwZGF0ZUVuYWJsZWQiLCJsb29wcyIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZXRUaW1lb3V0IiwicHJvY2VzcyIsImxsIiwiZSIsImVuYWJsZWQiLCJleGVjdXRlIiwiY2xvY2siLCJsb29wIiwiaW5kZXgiLCJnZXQiLCJMb29wIiwidXNlQ2xvY2siLCJDbG9jayIsIndvcmxkIiwiYWRkTG9vcCIsInN0YXJ0Iiwic3RvcCIsInJlbW92ZUxvb3AiLCJBbWJpZW50TGlnaHQiLCJsaWdodCIsIkFtYmllbnRMaWdodE5hdGl2ZSIsImNvbG9yIiwiaW50ZW5zaXR5IiwiRGlyZWN0aW9uYWxMaWdodCIsIndyYXBTaGFkb3ciLCJEaXJlY3Rpb25hbExpZ2h0TmF0aXZlIiwiSGVtaXNwaGVyZUxpZ2h0IiwiSGVtaXNwaGVyZUxpZ2h0TmF0aXZlIiwic2t5Q29sb3IiLCJncm91bmRDb2xvciIsIlBvaW50TGlnaHQiLCJQb2ludExpZ2h0TmF0aXZlIiwiZGlzdGFuY2UiLCJkZWNheSIsIlNwb3RMaWdodCIsIlNwb3RMaWdodE5hdGl2ZSIsImFuZ2xlIiwiZXhwb25lbnQiLCJNYXRoIiwiUEkiLCJBcmVhTGlnaHQiLCJSZWN0QXJlYUxpZ2h0TmF0aXZlIiwiQ3ViZUNhbWVyYSIsIkN1YmVDYW1lcmFOYXRpdmUiLCJjdWJlUmVzb2x1dGlvbiIsIk9ydGhvZ3JhcGhpY0NhbWVyYSIsIk9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwiUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmUiLCJhc3BlY3QiLCJCb3giLCJidWlsZEdlb21ldHJ5IiwiYnVmZmVyIiwiQm94QnVmZmVyR2VvbWV0cnkiLCJCb3hHZW9tZXRyeSIsImRlcHRoIiwid2lkdGhTZWdtZW50cyIsImhlaWdodFNlZ21lbnRzIiwiZGVwdGhTZWdtZW50cyIsIkNpcmNsZSIsIkNpcmNsZUJ1ZmZlckdlb21ldHJ5IiwiQ2lyY2xlR2VvbWV0cnkiLCJzZWdtZW50cyIsInRoZXRhU3RhcnQiLCJ0aGV0YUxlbmd0aCIsIkNvbmUiLCJDb25lQnVmZmVyR2VvbWV0cnkiLCJDb25lR2VvbWV0cnkiLCJyYWRpdXNTZWdtZW50cyIsIm9wZW5FbmRlZCIsIkN5bGluZGVyIiwiQ3lsaW5kZXJCdWZmZXJHZW9tZXRyeSIsIkN5bGluZGVyR2VvbWV0cnkiLCJyYWRpdXNUb3AiLCJyYWRpdXNCb3R0b20iLCJEb2RlY2FoZWRyb24iLCJEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSIsIkRvZGVjYWhlZHJvbkdlb21ldHJ5IiwiZGV0YWlsIiwiRXh0cnVkZSIsIkV4dHJ1ZGVHZW9tZXRyeSIsInNoYXBlcyIsIm9wdGlvbnMiLCJCdWZmZXJHZW9tZXRyeSIsImZyb21HZW9tZXRyeSIsIkljb3NhaGVkcm9uIiwiSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSIsIkljb3NhaGVkcm9uR2VvbWV0cnkiLCJMYXRoZSIsIkxhdGhlQnVmZmVyR2VvbWV0cnkiLCJMYXRoZUdlb21ldHJ5IiwicG9pbnRzIiwiTGluZSIsIkxpbmVOYXRpdmUiLCJHZW9tZXRyeSIsInBwIiwiY3VydmUiLCJnZXRQb2ludHMiLCJ2ZXJ0cyIsIkZsb2F0MzJBcnJheSIsImkzIiwiYWRkQXR0cmlidXRlIiwiQnVmZmVyQXR0cmlidXRlIiwidmVydGljZXMiLCJJbXBvcnRlciIsImZpbHRlciIsInByb2Nlc3NGaWx0ZXIiLCJmb3JFYWNoIiwiZWwiLCJ0ZXh0dXJlUGF0aCIsImxhb2RlciIsInNldFRleHR1cmVQYXRoIiwibG9hZGVyIiwibG9hZCIsInVybCIsIm9uTG9hZCIsInBhcnNlciIsInVzZUN1c3RvbU1hdGVyaWFsIiwibWF0Iiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJKU09OTG9hZGVyIiwibWF0ZXJpYWxzIiwiT2N0YWhlZHJvbiIsIk9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSIsIk9jdGFoZWRyb25HZW9tZXRyeSIsIlBhcmFtZXRyaWMiLCJQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkiLCJQYXJhbWV0cmljR2VvbWV0cnkiLCJzbGljZXMiLCJzdGFja3MiLCJ1IiwidiIsIlZlY3RvcjMiLCJQbGFuZSIsIlBsYW5lQnVmZmVyR2VvbWV0cnkiLCJQbGFuZUdlb21ldHJ5Iiwid1NlZ21lbnRzIiwiaFNlZ21lbnRzIiwidmVydGljZXNPZkN1YmUiLCJpbmRpY2VzT2ZGYWNlcyIsIlBvbHloZWRyb24iLCJQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJQb2x5aGVkcm9uR2VvbWV0cnkiLCJSaW5nIiwiUmluZ0J1ZmZlckdlb21ldHJ5IiwiUmluZ0dlb21ldHJ5IiwiaW5uZXJSYWRpdXMiLCJvdXRlclJhZGl1cyIsInRoZXRhU2VnbWVudHMiLCJwaGlTZWdtZW50cyIsIlNoYXBlIiwiU2hhcGVCdWZmZXJHZW9tZXRyeSIsIlNoYXBlR2VvbWV0cnkiLCJTcGhlcmUiLCJTcGhlcmVCdWZmZXJHZW9tZXRyeSIsIlNwaGVyZUdlb21ldHJ5IiwiVGV0cmFoZWRyb24iLCJUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiVGV0cmFoZWRyb25HZW9tZXRyeSIsIlRleHQiLCJwYXJhbWV0ZXJzIiwiZm9udCIsIlRleHRHZW9tZXRyeSIsInRleHQiLCJGb250TG9hZGVyIiwiRm9udCIsIlRvcnVzIiwiVG9ydXNHZW9tZXRyeSIsInR1YmUiLCJyYWRpYWxTZWdtZW50cyIsInR1YnVsYXJTZWdtZW50cyIsImFyYyIsIlRvcnVza25vdCIsIkdDb25zdHJ1Y3QiLCJUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSIsIlRvcnVzS25vdEdlb21ldHJ5IiwicCIsInEiLCJUdWJlIiwiVHViZUJ1ZmZlckdlb21ldHJ5IiwiVHViZUdlb21ldHJ5IiwicGF0aCIsImNsb3NlZCIsIkxpbmVDdXJ2ZTMiLCJHcm91cCIsIm9iamVjdHMiLCJvYmoiLCJhZGRUbyIsIk9iamVjdDNEIiwiRWxlbWVudE1vZHVsZSIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiYm9keSIsImNyZWF0ZUVsZW1lbnQiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJzZWxmIiwiYXBwZW5kQ2hpbGQiLCJSZW5kZXJpbmdNb2R1bGUiLCJpc1NoYWRvdyIsImFzc2lnbiIsIlZlY3RvcjIiLCJkZXZpY2VQaXhlbFJhdGlvIiwiYmdDb2xvciIsImJnT3BhY2l0eSIsInJlbmRlcmVyIiwicGl4ZWxSYXRpbyIsInJlc29sdXRpb24iLCJXZWJHTFJlbmRlcmVyIiwiZWZmZWN0cyIsImFwcGx5QWRkaXRpb25hbCIsInNldENsZWFyQ29sb3IiLCJzZXRQaXhlbFJhdGlvIiwic2V0U2l6ZSIsIk51bWJlciIsInRvRml4ZWQiLCJpc0FwcGxpZWQiLCJhZGRpdGlvbmFsIiwic2NlbmUiLCJyZW5kZXJMb29wIiwicmVuZGVyIiwiYXR0YWNoVG9DYW52YXMiLCJlZmZlY3QiLCJzaXplIiwiZ2V0U2l6ZSIsImFwcCIsImNhbnZhcyIsImRvbUVsZW1lbnQiLCJkZWZpbmUiLCJpbnRlZ3JhdGVSZW5kZXJlciIsInVwZGF0ZSIsImZvcmNlQ29udGV4dExvc3MiLCJzaGFkb3dNYXAiLCJTY2VuZU1vZHVsZSIsIndpbGxTY2VuZUJlUmVwbGFjZWQiLCJTY2VuZSIsInNldFNjZW5lIiwiUmVzaXplTW9kdWxlIiwiY2FsbGJhY2tzIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsInJlbmRlcmluZyIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZ2V0Q29udGFpbmVyIiwiZ2V0UmVzb2x1dGlvbiIsImF1dG8iLCJhZGRFdmVudExpc3RlbmVyIiwidHJpZ2dlciIsImFkZEF1dG9yZXNpemUiLCJmcmFnbWVudCIsInZlcnRleCIsIlNoYWRlck1hdGVyaWFsIiwiVW5pZm9ybSIsIkNvbG9yIiwiV2ViR0xSZW5kZXJUYXJnZXQiLCJMaW5lYXJGaWx0ZXIiLCJSR0JBRm9ybWF0IiwiUkdCRm9ybWF0IiwiRGVwdGhUZXh0dXJlIiwiRGVwdGhTdGVuY2lsRm9ybWF0IiwiVW5zaWduZWRJbnQyNDhUeXBlIiwicG9seWZpbGwiLCJtZXRob2QiLCJzaG93V2FybiIsIlBvc3RQcm9jZXNzb3JNb2R1bGUiLCJkZWJ1ZyIsImN1cnJlbnRQYXNzIiwiY29tcG9zZXIiLCJFZmZlY3RDb21wb3NlciIsImdldERlbHRhIiwicmVwbGFjZVJlbmRlcmVyIiwicGFzcyIsIlJlbmRlclBhc3MiLCJhZGRQYXNzIiwidGV4dHVyZUlEIiwidW5pZm9ybXMiLCJTaGFkZXJQYXNzIiwicGFzc2VzIiwiYm9vbCIsInJlbmRlclRvU2NyZWVuIiwiRXZlbnRzUGF0Y2hNb2R1bGUiLCJvcmlnaW5PYmplY3QiLCJkZXN0T2JqZWN0IiwiZXZlbnRzIiwiZXZlbnQiLCJlbWl0IiwicGF0Y2hFdmVudHMiLCJWaXJ0dWFsTW91c2VNb2R1bGUiLCJnbG9iYWxNb3ZlbWVudCIsIm1vdXNlIiwicmF5Y2FzdGVyIiwiUmF5Y2FzdGVyIiwicHJvamVjdGlvblBsYW5lIiwiY3VzdG9tWCIsImN1c3RvbVkiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WCIsImNsaWVudFkiLCJub3JtYWwiLCJnZXRXb3JsZERpcmVjdGlvbiIsInNldEZyb21DYW1lcmEiLCJyZXF1aXJlIiwib24iLCJldiIsImdsb2JhbFgiLCJnbG9iYWxZIiwicG9pbnRlckxvY2tFbGVtZW50IiwibW92ZW1lbnRYIiwibW92ZW1lbnRZIiwibmVzdGVkIiwiaXNIb3ZlcmVkIiwiaG92ZXJzIiwidHJhdmVyc2UiLCJjaGlsZCIsImludGVyc2VjdE9iamVjdHMiLCJpbnRlcnNlY3RPYmplY3QiLCJwbGFuZSIsInJheSIsImludGVyc2VjdFBsYW5lIiwiaW50ZXJzZWN0aW9uIiwiQ29udHJvbHNNb2R1bGUiLCJjb250cm9scyIsImMiLCJ1cGRhdGVMb29wIiwiRm9nTW9kdWxlIiwidHlwZSIsImZvZyIsIkZvZ0V4cDIiLCJkZW5zaXR5IiwiRm9nIiwiaXNFcXVhbERlZmF1bHQiLCJhIiwiYiIsImVxdWFscyIsIlN0YXRlTW9kdWxlIiwiaXNFcXVhbCIsImVxdWFsQ2hlY2siLCJhY3Rpb25HZW5lcmF0ZSIsImNvbmZpZ3VyYXRpb24iLCJjdXJyZW50Q29uZmlnIiwicHJldkNvbmZpZyIsImNvbmZpZyIsImRlZmF1bHQiLCJyZXBsYWNlUmVkdWNlciIsImNvbmZpZ3MiLCJ1cGRhdGVzIiwiY29uZmlnTmFtZSIsInRydWVWYWwiLCJmYWxzZVZhbCIsIlRocmVlT3JiaXRDb250cm9scyIsImV2ZW50SGFuZGxlciIsIm1pbkRpc3RhbmNlIiwibWF4RGlzdGFuY2UiLCJJbmZpbml0eSIsIm1pblpvb20iLCJtYXhab29tIiwibWluUG9sYXJBbmdsZSIsIm1heFBvbGFyQW5nbGUiLCJtaW5BemltdXRoQW5nbGUiLCJtYXhBemltdXRoQW5nbGUiLCJlbmFibGVEYW1waW5nIiwiZGFtcGluZ0ZhY3RvciIsImVuYWJsZVpvb20iLCJ6b29tU3BlZWQiLCJlbmFibGVSb3RhdGUiLCJyb3RhdGVTcGVlZCIsImVuYWJsZVBhbiIsImtleVBhblNwZWVkIiwiYXV0b1JvdGF0ZSIsImF1dG9Sb3RhdGVTcGVlZCIsImVuYWJsZUtleXMiLCJrZXlzIiwiTEVGVCIsIlVQIiwiUklHSFQiLCJCT1RUT00iLCJtb3VzZUJ1dHRvbnMiLCJPUkJJVCIsIk1PVVNFIiwiWk9PTSIsIk1JRERMRSIsIlBBTiIsInRhcmdldDAiLCJwb3NpdGlvbjAiLCJ6b29tMCIsInpvb20iLCJnZXRQb2xhckFuZ2xlIiwic3BoZXJpY2FsIiwicGhpIiwiZ2V0QXppbXV0aGFsQW5nbGUiLCJ0aGV0YSIsInJlc2V0IiwiZGlzcGF0Y2hFdmVudCIsImNoYW5nZUV2ZW50IiwiU1RBVEUiLCJOT05FIiwib2Zmc2V0IiwicXVhdCIsIlF1YXRlcm5pb24iLCJzZXRGcm9tVW5pdFZlY3RvcnMiLCJ1cCIsInF1YXRJbnZlcnNlIiwiaW52ZXJzZSIsImxhc3RQb3NpdGlvbiIsImxhc3RRdWF0ZXJuaW9uIiwic3ViIiwiYXBwbHlRdWF0ZXJuaW9uIiwic2V0RnJvbVZlY3RvcjMiLCJyb3RhdGVMZWZ0IiwiZ2V0QXV0b1JvdGF0aW9uQW5nbGUiLCJzcGhlcmljYWxEZWx0YSIsIm1pbiIsIm1ha2VTYWZlIiwicGFuT2Zmc2V0Iiwic2V0RnJvbVNwaGVyaWNhbCIsImxvb2tBdCIsInpvb21DaGFuZ2VkIiwiZGlzdGFuY2VUb1NxdWFyZWQiLCJFUFMiLCJkb3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Db250ZXh0TWVudSIsIm9uTW91c2VEb3duIiwib25Nb3VzZVdoZWVsIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaEVuZCIsIm9uVG91Y2hNb3ZlIiwib25Nb3VzZU1vdmUiLCJvbk1vdXNlVXAiLCJvbktleURvd24iLCJzdGFydEV2ZW50IiwiZW5kRXZlbnQiLCJST1RBVEUiLCJET0xMWSIsIlRPVUNIX1JPVEFURSIsIlRPVUNIX0RPTExZIiwiVE9VQ0hfUEFOIiwiU3BoZXJpY2FsIiwicm90YXRlU3RhcnQiLCJyb3RhdGVFbmQiLCJyb3RhdGVEZWx0YSIsInBhblN0YXJ0IiwicGFuRW5kIiwicGFuRGVsdGEiLCJkb2xseVN0YXJ0IiwiZG9sbHlFbmQiLCJkb2xseURlbHRhIiwiZ2V0Wm9vbVNjYWxlIiwicG93Iiwicm90YXRlVXAiLCJwYW5MZWZ0Iiwib2JqZWN0TWF0cml4Iiwic2V0RnJvbU1hdHJpeENvbHVtbiIsIm11bHRpcGx5U2NhbGFyIiwicGFuVXAiLCJwYW4iLCJkZWx0YVgiLCJkZWx0YVkiLCJ0YXJnZXREaXN0YW5jZSIsInRhbiIsImNsaWVudEhlaWdodCIsIm1hdHJpeCIsImNsaWVudFdpZHRoIiwiZG9sbHlJbiIsImRvbGx5U2NhbGUiLCJkb2xseU91dCIsImhhbmRsZU1vdXNlRG93blJvdGF0ZSIsImhhbmRsZU1vdXNlRG93bkRvbGx5IiwiaGFuZGxlTW91c2VEb3duUGFuIiwiaGFuZGxlTW91c2VNb3ZlUm90YXRlIiwic3ViVmVjdG9ycyIsImhhbmRsZU1vdXNlTW92ZURvbGx5IiwiaGFuZGxlTW91c2VNb3ZlUGFuIiwiaGFuZGxlTW91c2VVcCIsImhhbmRsZU1vdXNlV2hlZWwiLCJoYW5kbGVLZXlEb3duIiwia2V5Q29kZSIsImhhbmRsZVRvdWNoU3RhcnRSb3RhdGUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImhhbmRsZVRvdWNoU3RhcnREb2xseSIsImR4IiwiZHkiLCJzcXJ0IiwiaGFuZGxlVG91Y2hTdGFydFBhbiIsImhhbmRsZVRvdWNoTW92ZVJvdGF0ZSIsImhhbmRsZVRvdWNoTW92ZURvbGx5IiwiaGFuZGxlVG91Y2hNb3ZlUGFuIiwiaGFuZGxlVG91Y2hFbmQiLCJwcmV2ZW50RGVmYXVsdCIsImJ1dHRvbiIsInN0b3BQcm9wYWdhdGlvbiIsIkV2ZW50RGlzcGF0Y2hlciIsIk9yYml0Q29udHJvbHNNb2R1bGUiLCJmb2xsb3ciLCJ1cGRhdGVQcm9jZXNzb3IiLCJzZXRDb250cm9scyIsInNldFVwZGF0ZSIsIkR5bmFtaWNHZW9tZXRyeU1vZHVsZSIsImdfIiwidXBkYXRlUGFyYW1zIiwiVGV4dHVyZUxvYWRlciIsIlRleHR1cmVNb2R1bGUiLCJ0ZXh0dXJlcyIsInRleHR1cmUiLCJyZXBlYXQiLCJSZXBlYXRXcmFwcGluZyIsIm1hcHBpbmciLCJVVk1hcHBpbmciLCJmaXgiLCJ0ZXgiLCJ3cmFwUyIsIndyYXBUIiwibWFnRmlsdGVyIiwiTmVhcmVzdEZpbHRlciIsIm1pbkZpbHRlciIsIkxpbmVhck1pcE1hcExpbmVhckZpbHRlciIsIkFuaW1hdGlvbk1vZHVsZSIsImlzRGVmZXJyZWQiLCJza2VsZXRvbiIsIm1peGVyIiwiQW5pbWF0aW9uTWl4ZXIiLCJjbGlwcyIsImFuaW1hdGlvbnMiLCJjbGlwTmFtZSIsImNsaXAiLCJBbmltYXRpb25DbGlwIiwiZmluZEJ5TmFtZSIsImNsaXBBY3Rpb24iLCJwbGF5Iiwic3BlZWQiLCJEZWZpbmVNb2R1bGUiLCJNb2RlbCIsIkNhbWVyYU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxNQUFELEVBQTJCO29DQUFmQyxVQUFlO2NBQUE7Ozs7Ozs7Ozt5QkFDdkJBLFVBQXhCLDhIQUFvQztVQUF6QkMsU0FB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QUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztFQUM1QixNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUk7Ozs7RUFJdkIsTUFBTSxDQUFDLEVBQUUsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ25DLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFDO0lBQ3REOzs7O0VBSUQsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLENBQUM7SUFDL0IsSUFBSSxLQUFLLE1BQU0sR0FBRyxFQUFFLEVBQUM7SUFDckIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUs7UUFDNUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDbEQ7Ozs7RUFJRCxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDO0lBQzFCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEYsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENB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
