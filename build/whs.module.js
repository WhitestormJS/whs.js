/* WhitestormJS Framework v2.0.0 */
import { AmbientLight, AnimationClip, AnimationMixer, BoxBufferGeometry, BoxGeometry, BufferAttribute, BufferGeometry, CircleBufferGeometry, CircleGeometry, Clock, Color, ConeBufferGeometry, ConeGeometry, CubeCamera, CylinderBufferGeometry, CylinderGeometry, DepthStencilFormat, DepthTexture, DirectionalLight, DodecahedronBufferGeometry, DodecahedronGeometry, EventDispatcher, ExtrudeGeometry, Fog, FogExp2, Font, FontLoader, Geometry, HemisphereLight, IcosahedronBufferGeometry, IcosahedronGeometry, JSONLoader, LatheBufferGeometry, LatheGeometry, Line, LineCurve3, LinearFilter, LinearMipMapLinearFilter, MOUSE, Mesh, NearestFilter, Object3D, OctahedronBufferGeometry, OctahedronGeometry, OrthographicCamera, ParametricBufferGeometry, ParametricGeometry, PerspectiveCamera, Plane, PlaneBufferGeometry, PlaneGeometry, PointLight, PolyhedronBufferGeometry, PolyhedronGeometry, Quaternion, REVISION, RGBAFormat, RGBFormat, Raycaster, RectAreaLight, RepeatWrapping, RingBufferGeometry, RingGeometry, Scene, ShaderMaterial, ShapeBufferGeometry, ShapeGeometry, SphereBufferGeometry, SphereGeometry, Spherical, SpotLight, TetrahedronBufferGeometry, TetrahedronGeometry, TextGeometry, TextureLoader, TorusGeometry, TorusKnotBufferGeometry, TorusKnotGeometry, TubeBufferGeometry, TubeGeometry, UVMapping, Uniform, UnsignedInt248Type, Vector2, Vector3, WebGLRenderTarget, WebGLRenderer } from 'three';

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
          if (object[prop] !== undefined && object[prop].toString() === '[object Object]' && extension[prop].toString() === '[object Object]') {
            // Goes deep only if object[prop] and extension[prop] are both objects !
            if (extension[prop].uuid) object[prop] = extension[prop];else extend(object[prop], extension[prop]);
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

    if (!process) console.error('Component:', component);

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

    if (!process) console.error('Active module:', activeModule);
    if (!process && dependencyModule) console.error('Dependency published by module:', dependencyModule);

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

    if (!process) console.error('Component:', dependencyModule);
    if (!process && activeModule) console.error('Active module:', activeModule);

    _this3.name = 'ManagerError';
    return _this3;
  }

  return ManagerError;
}(Error);

var warnDeps = function warnDeps() {
  throw new Error('WhitestormJS Framework requires Three.js r84. https://threejs.org/');
};

try {
  if (!REVISION) warnDeps();
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
      if (push) this.modules.push(module);

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
  modules: [],
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
      var constructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Mesh;

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

var Loop = function () {
  function Loop(func) {
    var useClock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    classCallCheck(this, Loop);

    this.func = func;
    this.clock = useClock ? new Clock() : null;
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

      return this.applyBridge({ light: new AmbientLight(params.color, params.intensity) }).light;
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

      return this.applyBridge({ light: new DirectionalLight(params.color, params.intensity) }).light;
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

      return this.applyBridge({ light: new HemisphereLight(params.skyColor, params.groundColor, params.intensity) }).light;
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

      return this.applyBridge({ light: new PointLight(params.color, params.intensity, params.distance, params.decay) }).light;
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

      return this.applyBridge({ light: new SpotLight(params.color, params.intensity, params.distance, params.angle, params.exponent, params.decay) }).light;
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

      return this.applyBridge({ light: new RectAreaLight(params.color, params.intensity, params.width, params.height) }).light;
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

      return this.applyBridge({ camera: new CubeCamera(params.near, params.far, params.cubeResolution) }).camera;
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

      return this.applyBridge({ camera: new OrthographicCamera(params.left, params.right, params.top, params.bottom, params.near, params.far) }).camera;
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

      return this.applyBridge({ camera: new PerspectiveCamera(params.fov, params.aspect, params.near, params.far) }).camera;
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? BoxBufferGeometry : BoxGeometry)(params.geometry.width, params.geometry.height, params.geometry.depth, params.geometry.widthSegments, params.geometry.heightSegments, params.geometry.depthSegments);

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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? CircleBufferGeometry : CircleGeometry)(params.geometry.radius, params.geometry.segments, params.geometry.thetaStart, params.geometry.thetaLength);

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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? ConeBufferGeometry : ConeGeometry)(params.geometry.radius, params.geometry.height, params.geometry.radiusSegments, params.geometry.heightSegments, params.geometry.openEnded, params.geometry.thetaStart, params.geometry.thetaLength);

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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? CylinderBufferGeometry : CylinderGeometry)(params.geometry.radiusTop, params.geometry.radiusBottom, params.geometry.height, params.geometry.radiusSegments, params.geometry.heightSegments, params.geometry.openEnded, params.geometry.thetaStart, params.geometry.thetaLength);

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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? DodecahedronBufferGeometry : DodecahedronGeometry)(params.geometry.radius, params.geometry.detail);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new ExtrudeGeometry(params.geometry.shapes, params.geometry.options);

      return params.buffer ? new BufferGeometry().fromGeometry(geometry) : geometry;
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? IcosahedronBufferGeometry : IcosahedronGeometry)(params.geometry.radius, params.geometry.detail);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? LatheBufferGeometry : LatheGeometry)(params.geometry.points);
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

      return this.applyBridge({ mesh: new Line(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = params.buffer ? new BufferGeometry() : new Geometry();

      if (params.buffer) {
        var pp = params.geometry.curve.getPoints(params.geometry.points);
        var verts = new Float32Array(pp.length * 3);

        for (var i = 0, max = pp.length; i < max; i++) {
          var i3 = i * 3;

          verts[i3] = pp[i].x;
          verts[i3 + 1] = pp[i].y;
          verts[i3 + 2] = pp[i].z;
        }

        geometry.addAttribute('position', new BufferAttribute(verts, 3));
      } else geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

      return geometry;
    }
  }]);
  return Line$$1;
}(MeshComponent), _class$21.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    curve: new LineCurve3(new Vector3(0, 0, 0), new Vector3(10, 0, 0)),
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
  loader: new JSONLoader(),

  onLoad: function onLoad() {},
  onProgress: function onProgress() {},
  onError: function onError() {},


  texturePath: null,
  useCustomMaterial: false,

  parser: function parser(geometry, materials) {
    return new Mesh(geometry, materials);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? OctahedronBufferGeometry : OctahedronGeometry)(params.geometry.radius, params.geometry.detail);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? ParametricBufferGeometry : ParametricGeometry)(params.geometry.func, params.geometry.slices, params.geometry.stacks);
    }
  }]);
  return Parametric;
}(MeshComponent), _class$24.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    func: function func(u, v) {
      return new Vector3(u, v, 0);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? PlaneBufferGeometry : PlaneGeometry)(params.geometry.width, params.geometry.height, params.geometry.wSegments, params.geometry.hSegments);

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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? PolyhedronBufferGeometry : PolyhedronGeometry)(params.geometry.verticesOfCube, params.geometry.indicesOfFaces, params.geometry.radius, params.geometry.detail);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? RingBufferGeometry : RingGeometry)(params.geometry.innerRadius, params.geometry.outerRadius, params.geometry.thetaSegments, params.geometry.phiSegments, params.geometry.thetaStart, params.geometry.thetaLength);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? ShapeBufferGeometry : ShapeGeometry)(params.geometry.shapes);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? SphereBufferGeometry : SphereGeometry)(params.geometry.radius, params.geometry.widthSegments, params.geometry.heightSegments);

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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (params.buffer ? TetrahedronBufferGeometry : TetrahedronGeometry)(params.geometry.radius, params.geometry.detail);
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
        FontLoader.load(params.geometry.parameters.font, function (font) {
          params.geometry.parameters.font = font;

          var _applyBridge = _this2.applyBridge({
            geometry: new TextGeometry(params.geometry.text, params.geometry.parameters),

            material: params.material
          }),
              geometry = _applyBridge.geometry,
              material = _applyBridge.material;

          resolve(_this2.applyBridge({
            mesh: new Mesh(geometry, material)
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
    loader: new FontLoader(),

    parameters: {
      size: 12,
      height: 50,
      curveSegments: 12,
      font: new Font(),
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new TorusGeometry(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.arc);
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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer ? TorusKnotBufferGeometry : TorusKnotGeometry;

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

      return this.applyBridge({ mesh: new Mesh(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = new (params.buffer ? TubeBufferGeometry : TubeGeometry)(params.geometry.path, params.geometry.segments, params.geometry.radius, params.geometry.radiusSegments, params.geometry.closed);

      return geometry;
    }
  }]);
  return Tube;
}(MeshComponent), _class$34.defaults = _extends({}, MeshComponent.defaults, {
  geometry: {
    path: new LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, 1)),
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

      if (obj instanceof Component) obj.addTo(_this);else if (obj instanceof Object3D) _this.native.add(obj);
    }
    return _this;
  }

  createClass(Group, [{
    key: 'build',
    value: function build() {
      return new Object3D();
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

      resolution: new Vector2(1, 1),
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


    this.renderer = new WebGLRenderer(renderer);
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

    this.scene = willSceneBeReplaced ? null : new Scene();
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

class CopyMaterial extends ShaderMaterial {

	/**
	 * Constructs a new copy material.
	 */

	constructor() {

		super({

			type: "CopyMaterial",

			uniforms: {

				tDiffuse: new Uniform(null),
				opacity: new Uniform(1.0)

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
		scene = new Scene(),
		camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1),
		quad = new Mesh(new PlaneBufferGeometry(2, 2), null)
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

const color = new Color();

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

const v = new Vector3();

/**
 * A vector.
 *
 * @type {Vector3}
 * @private
 * @static
 * @final
 */

const ab = new Vector3();

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

		const renderTarget = new WebGLRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			format: alpha ? RGBAFormat : RGBFormat,
			depthBuffer: depthBuffer,
			stencilBuffer: stencilBuffer,
			depthTexture: depthTexture ? new DepthTexture() : null
		});

		if(depthTexture && stencilBuffer) {

			renderTarget.depthTexture.format = DepthStencilFormat;
			renderTarget.depthTexture.type = UnsignedInt248Type;

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

    _this.mouse = new Vector2();
    _this.raycaster = new Raycaster();
    _this.world = null;
    _this.canvas = null;
    _this.projectionPlane = new Plane(new Vector3(0, 0, 1), 0);

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
    if (!type || type === 'exp2') this.fog = new FogExp2(this.params.color, this.params.density);else if (type === 'linear') this.fog = new Fog(this.params.color, this.params.near, this.params.far);
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
    _this.target = new Vector3();

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
    _this.mouseButtons = { ORBIT: MOUSE.LEFT, ZOOM: MOUSE.MIDDLE, PAN: MOUSE.RIGHT };

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
      var offset = new Vector3();

      // so camera.up is the orbit axis
      var quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
      var quatInverse = quat.clone().inverse();

      var lastPosition = new Vector3();
      var lastQuaternion = new Quaternion();

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
    var spherical = new Spherical();
    var sphericalDelta = new Spherical();

    var scale = 1;
    var panOffset = new Vector3();
    var zoomChanged = false;

    var rotateStart = new Vector2();
    var rotateEnd = new Vector2();
    var rotateDelta = new Vector2();

    var panStart = new Vector2();
    var panEnd = new Vector2();
    var panDelta = new Vector2();

    var dollyStart = new Vector2();
    var dollyEnd = new Vector2();
    var dollyDelta = new Vector2();

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
      var v = new Vector3();

      return function (distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }();

    var panUp = function () {
      var v = new Vector3();

      return function (distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    }();

    // deltaX and deltaY are in pixels; right and down are positive
    var pan = function () {
      var offset = new Vector3();

      return function (deltaX, deltaY) {
        var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

        if (_this.object instanceof PerspectiveCamera) {
          // perspective
          var position = _this.object.position;
          offset.copy(position).sub(_this.target);
          var targetDistance = offset.length();

          // half of the fov is center to top of screen
          targetDistance *= Math.tan(_this.object.fov / 2 * Math.PI / 180.0);

          // we actually don't use screenWidth, since perspective camera is fixed to screen height
          panLeft(2 * deltaX * targetDistance / element.clientHeight, _this.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, _this.object.matrix);
        } else if (_this.object instanceof OrthographicCamera) {
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
      if (_this.object instanceof PerspectiveCamera) scale /= dollyScale;else if (_this.object instanceof OrthographicCamera) {
        _this.object.zoom = Math.max(_this.minZoom, Math.min(_this.maxZoom, _this.object.zoom * dollyScale));
        _this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControlsModule.js encountered an unknown camera type - dolly/zoom disabled.');
        _this.enableZoom = false;
      }
    };

    var dollyOut = function dollyOut(dollyScale) {
      if (_this.object instanceof PerspectiveCamera) scale *= dollyScale;else if (_this.object instanceof OrthographicCamera) {
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
}(EventDispatcher);

var OrbitControlsModule = function (_ControlsModule) {
  inherits(OrbitControlsModule, _ControlsModule);

  function OrbitControlsModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, OrbitControlsModule);

    var _this = possibleConstructorReturn(this, (OrbitControlsModule.__proto__ || Object.getPrototypeOf(OrbitControlsModule)).call(this, params));

    _this.params = Object.assign({
      follow: false,
      object: null,
      target: new Vector3(0, 0, 0)
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

var loader = new TextureLoader();

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
          offset = _ref$offset === undefined ? new Vector2(0, 0) : _ref$offset,
          _ref$repeat = _ref.repeat,
          repeat = _ref$repeat === undefined ? new Vector2(1, 1) : _ref$repeat,
          _ref$wrap = _ref.wrap,
          wrap = _ref$wrap === undefined ? RepeatWrapping : _ref$wrap,
          _ref$mapping = _ref.mapping,
          mapping = _ref$mapping === undefined ? UVMapping : _ref$mapping,
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

      texture.magFilter = NearestFilter;
      texture.minFilter = LinearMipMapLinearFilter;

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

        self.mixer = new AnimationMixer(_mesh.geometry);
        self.clips = _mesh.geometry.animations;

        return _mesh;
      }
    };

    this.params = Object.assign({
      speed: 1
    }, params);
    this.clock = new Clock();

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
      var clip = AnimationClip.findByName(this.clips, clipName);
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

export { Component, MeshComponent, LightComponent, CameraComponent, App, Loop, ModuleManager, AmbientLight$1 as AmbientLight, DirectionalLight$1 as DirectionalLight, HemisphereLight$1 as HemisphereLight, PointLight$1 as PointLight, SpotLight$1 as SpotLight, AreaLight, CubeCamera$1 as CubeCamera, OrthographicCamera$1 as OrthographicCamera, PerspectiveCamera$1 as PerspectiveCamera, Box, Circle, Cone, Cylinder, Dodecahedron, Extrude, Icosahedron, Lathe, Line$1 as Line, Importer, Octahedron, Parametric, Plane$1 as Plane, Polyhedron, Ring, Shape, Sphere, Tetrahedron, Text, Torus, Torusknot, Tube, Group, extend, instruct, transformData, toArray, ElementModule, RenderingModule, SceneModule, ResizeModule, PostProcessorModule, VirtualMouseModule, EventsPatchModule, ControlsModule, FogModule, StateModule, OrbitControlsModule, DynamicGeometryModule, TextureModule, AnimationModule, DefineModule, Model, CameraModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzL2V4dGVuZC5qcyIsIi4uL3NyYy91dGlscy90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsIi4uL3NyYy9jb3JlL2Vycm9ycy5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZU1hbmFnZXIuanMiLCIuLi9zcmMvY29yZS9Db21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9wcm90b3R5cGUvYXR0cmlidXRlcy5qcyIsIi4uL3NyYy9jb3JlL01lc2hDb21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9MaWdodENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0NhbWVyYUNvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wcmVzZW50L2xpYi9wcmVzZW50LW5vZGUuanMiLCIuLi9zcmMvcG9seWZpbGwuanMiLCIuLi9zcmMvY29yZS9BcHAuanMiLCIuLi9zcmMvY29yZS9Mb29wLmpzIiwiLi4vc3JjL2NvcmUvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQW1iaWVudExpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL0RpcmVjdGlvbmFsTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvSGVtaXNwaGVyZUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL1BvaW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvU3BvdExpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL0FyZWFMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvQ3ViZUNhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvT3J0aG9ncmFwaGljQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9QZXJzcGVjdGl2ZUNhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQm94LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NpcmNsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Db25lLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0N5bGluZGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0RvZGVjYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9FeHRydWRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0ljb3NhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0xhdGhlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0xpbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSW1wb3J0ZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvT2N0YWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9QYXJhbWV0cmljLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BsYW5lLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BvbHloZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUmluZy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9TaGFwZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9TcGhlcmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVGV0cmFoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVGV4dC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Ub3J1cy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Ub3J1c2tub3QuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVHViZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Hcm91cC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9FbGVtZW50TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1JlbmRlcmluZ01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9TY2VuZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9SZXNpemVNb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9jb252b2x1dGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvcHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3Bhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9jbGVhci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2NsZWFyLW1hc2suanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9nbGl0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9yZW5kZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9tYXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hhZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hvY2std2F2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2VmZmVjdC1jb21wb3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvY29yZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUG9zdFByb2Nlc3Nvck1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9FdmVudHNQYXRjaE1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9WaXJ0dWFsTW91c2VNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvQ29udHJvbHNNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvRm9nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1N0YXRlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2xpYi9UaHJlZU9yYml0Q29udHJvbHMuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvT3JiaXRDb250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvRHluYW1pY0dlb21ldHJ5TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9UZXh0dXJlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9BbmltYXRpb25Nb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvRGVmaW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvaW5kZXguanMiLCIuLi9zcmMvZGVwcmVjYXRpb24uanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGV4dGVuZCA9IChvYmplY3QsIC4uLmV4dGVuc2lvbnMpID0+IHsgLy8gJC5leHRlbmQgYWx0ZXJuYXRpdmUsIC4uLiBpcyB0aGUgc3ByZWFkIG9wZXJhdG9yLlxuICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiBleHRlbnNpb25zKSB7XG4gICAgLy8gY29uc29sZS5sb2coZXh0ZW5zaW9uKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YgZXh0ZW5zaW9uKTtcblxuICAgIGlmICghZXh0ZW5zaW9uKVxuICAgICAgY29udGludWU7IC8vIElnbm9yZSBudWxsIGFuZCB1bmRlZmluZWQgb2JqZWN0cyBhbmQgcGFyYW1ldGVycy5cblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhleHRlbnNpb24pKSB7IC8vIERvIG5vdCB0cmF2ZXJzZSB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgICAgaWYgKG9iamVjdFtwcm9wXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICYmIG9iamVjdFtwcm9wXS50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAmJiBleHRlbnNpb25bcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgLy8gR29lcyBkZWVwIG9ubHkgaWYgb2JqZWN0W3Byb3BdIGFuZCBleHRlbnNpb25bcHJvcF0gYXJlIGJvdGggb2JqZWN0cyAhXG4gICAgICAgIGlmIChleHRlbnNpb25bcHJvcF0udXVpZCkgb2JqZWN0W3Byb3BdID0gZXh0ZW5zaW9uW3Byb3BdO1xuICAgICAgICBlbHNlIGV4dGVuZChvYmplY3RbcHJvcF0sIGV4dGVuc2lvbltwcm9wXSk7XG4gICAgICB9IGVsc2VcbiAgICAgICAgb2JqZWN0W3Byb3BdID0gdHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgPyBleHRlbnNpb25bcHJvcF0gOiBvYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXS5zbGljZSgpOyAvLyBBZGQgdmFsdWVzIHRoYXQgZG8gbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsImV4cG9ydCBjb25zdCBpbnN0cnVjdCA9IChhcnJheSwgaW5zdEFycmF5KSA9PiB7XG4gIGNvbnN0IHRlbXBPYmplY3QgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdEFycmF5Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgY29uc3QgZ3VpZGUgPSBpbnN0QXJyYXlbaV07XG5cbiAgICB0ZW1wT2JqZWN0W2d1aWRlXSA9IGFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBPYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtRGF0YSA9IChvYmplY3QsIGluc3RydWN0aW9ucykgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0cnVjdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkpXG4gICAgICBvYmplY3Rba2V5XSA9IGluc3RydWN0KG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gICAgZWxzZSBpZiAob2JqZWN0W2tleV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgIShBcnJheS5pc0FycmF5KGluc3RydWN0aW9uc1trZXldKSkpXG4gICAgICBvYmplY3Rba2V5XSA9IHRyYW5zZm9ybURhdGEob2JqZWN0W2tleV0sIGluc3RydWN0aW9uc1trZXldKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdG9BcnJheSA9IChvYmplY3QsIGluc3RydWN0aW9uKSA9PiB7XG4gIGNvbnN0IHRlbXBBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnN0cnVjdGlvbi5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdHJ1Y3Rpb25baV07XG5cbiAgICB0ZW1wQXJyYXlbaV0gPSBvYmplY3RbZ3VpZGVdO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoIXByb2Nlc3MpIGNvbnNvbGUuZXJyb3IoJ0NvbXBvbmVudDonLCBjb21wb25lbnQpO1xuXG4gICAgdGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmN5RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGFjdGl2ZU1vZHVsZSwgZGVwZW5kZW5jeU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmICghcHJvY2VzcykgY29uc29sZS5lcnJvcignQWN0aXZlIG1vZHVsZTonLCBhY3RpdmVNb2R1bGUpO1xuICAgIGlmICghcHJvY2VzcyAmJiBkZXBlbmRlbmN5TW9kdWxlKSBjb25zb2xlLmVycm9yKCdEZXBlbmRlbmN5IHB1Ymxpc2hlZCBieSBtb2R1bGU6JywgZGVwZW5kZW5jeU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnRGVwZW5kZW5jeUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQsIGFjdGl2ZU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmICghcHJvY2VzcykgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGRlcGVuZGVuY3lNb2R1bGUpO1xuICAgIGlmICghcHJvY2VzcyAmJiBhY3RpdmVNb2R1bGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcblxuICAgIHRoaXMubmFtZSA9ICdNYW5hZ2VyRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge01hbmFnZXJFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgcjg0LiBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG4vKipcbiAqIEBjbGFzcyBNb2R1bGVTeXN0ZW1cbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gIFByb3ZpZGVzIEFQSSBmb3IgY2xhc3NlcyB0aGF0IHdpbGwgdXNlIE1vZHVsZXMuPGJyLz5cbiAqIFRoaXMgY2xhc3MgaW5jbHVkZXMgYmFzaWMgZXZlbnQgc3lzdGVtIHdpdGggdGhvc2Ugc3VwcG9ydGVkIG1ldGhvZHM6XG4gKiA8cHJlPi5vbigpPC9wcmU+PHByZT4ub2ZmKCk8L3ByZT48cHJlPi5lbWl0KCk8L3ByZT5cbiAqIEBleHRlbmRzIEV2ZW50c1xuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0gZXh0ZW5kcyBFdmVudHMge1xuICAvLyBJTlRFR1JBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGludGVncmF0ZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBhcHBsaWVzIGFsbCBtb2R1bGVzIGZyb20gLm1vZHVsZXMgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2VdIElmIHNvdXJjZSAoc2hvdWxkIGJlIGEgY29tcG9uZW50KSBpcyBwcm92aWRlZCwgd2lsbCByZXBsYWNlIC5tb2R1bGVzIHdpdGggc291cmNlJ3Mgb25lIGJlZm9yZSBleGVjdXRpbmcgbW9kdWxlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpIHtcbiAgICBpZiAoc291cmNlKSB0aGlzLm1vZHVsZXMgPSBzb3VyY2UubW9kdWxlcy5zbGljZSgwKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspXG4gICAgICB0aGlzLmFwcGx5TW9kdWxlKHRoaXMubW9kdWxlc1tpXSwgZmFsc2UpO1xuXG4gICAgaWYgKHNvdXJjZSkgdGhpcy5hcHBseUJyaWRnZSh7b25Db3B5OiBzb3VyY2V9KTtcbiAgfVxuXG4gIC8vIEFQUExZSU5HIE1PRFVMRSAoLi4uYW5kIGEgXCJicmlkZ2VcIiBmb3IgbW9kdWxlKVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5QnJpZGdlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZXMgY29tcG9uZW50LXNwZWNpZmljIEFQSSB0byB3b3JrIHdpdGggbW9kdWxlcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJyaWRnZU1hcFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgb2JqZWN0IHdpdGggbW9kaWZpZWQgdmFsdWVzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBhcHBseUJyaWRnZShicmlkZ2VNYXAgPSB7fSkge1xuICAgIGNvbnN0IG1vZHVsZXMgPSB0aGlzLm1vZHVsZXM7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gbW9kdWxlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gYnJpZGdlTWFwKSB7XG4gICAgICAgIGlmIChicmlkZ2VNYXBba2V5XSkge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXNbaV07XG5cbiAgICAgICAgICBpZiAobW9kdWxlICYmIG1vZHVsZS5icmlkZ2UgJiYgbW9kdWxlLmJyaWRnZVtrZXldKVxuICAgICAgICAgICAgYnJpZGdlTWFwW2tleV0gPSBtb2R1bGUuYnJpZGdlW2tleV0uYXBwbHkodGhpcywgW2JyaWRnZU1hcFtrZXldLCBtb2R1bGVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBicmlkZ2VNYXA7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseU1vZHVsZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIC5hcHBseU1vZHVsZSBpcyBhbHNvIHVzZWQgaW4gLmludGVncmF0ZU1vZHVsZXMoKSBmdW5jdGlvbi5cbiAgICogSXQgZG9lcyBleGFjdGx5IHdoYXQgaXRzIG5hbWUgc2F5cyAoYXBwbGllcyBtb2R1bGUgdG8gY29tcG9uZW50IG9yIGFwcCkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBhcHBseVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwdXNoPXRydWVdXG4gICAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBtb2R1bGUgdGhhdCB3YXMgYXBwbGllZC5cbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBhcHBseU1vZHVsZShtb2R1bGUsIHB1c2ggPSB0cnVlKSB7XG4gICAgaWYgKCFtb2R1bGUpIHJldHVybjtcbiAgICBpZiAocHVzaCkgdGhpcy5tb2R1bGVzLnB1c2gobW9kdWxlKTtcblxuICAgIGlmICh0aGlzLm1hbmFnZXIpIHRoaXMubWFuYWdlci5hY3RpdmUobW9kdWxlKTtcblxuICAgIGlmIChtb2R1bGUubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIpIG1vZHVsZS5tYW5hZ2VyKHRoaXMubWFuYWdlcik7XG4gICAgZWxzZSBpZiAobW9kdWxlLm1hbmFnZXIpIHtcbiAgICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAgICdDb21wb25lbnQnLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzIE1vZHVsZU1hbmFnZXIgdGhhdCBpcyB0dXJuZWQgb2ZmIGZvciB0aGlzIGNvbXBvbmVudGAsXG4gICAgICAgIHRoaXMsIG1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLmludGVncmF0ZSkgbW9kdWxlLmludGVncmF0ZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwb3NlcyBvZiBhbGwgbW9kdWxlc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlcygpIHtcbiAgICB3aGlsZSAodGhpcy5tb2R1bGVzLmxlbmd0aClcbiAgICAgIHRoaXMuZGlzcG9zZU1vZHVsZSh0aGlzLm1vZHVsZXNbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIHRoZSBnaXZlbiBtb2R1bGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGRpc3Bvc2VcbiAgICogQHJldHVybiB7TW9kdWxlfSBSZXR1cm5zIG1vZHVsZSB0aGF0IHdhcyByZW1vdmVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlKG1vZHVsZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG5cbiAgICB0aGlzLm1vZHVsZXMuc3BsaWNlKHRoaXMubW9kdWxlcy5pbmRleE9mKG1vZHVsZSksIDEpO1xuXG4gICAgaWYgKG1vZHVsZS5kaXNwb3NlKSBtb2R1bGUuZGlzcG9zZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLy8gUElQRUQgTUVUSE9EXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgbW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gcGlwZWQgdmVyc2lvbiBvZiAuYXBwbHlNb2R1bGUoKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGFwcGx5XG4gICAqIEByZXR1cm4ge3RoaXN9IHJldHVybnMgdGhpcyAtIGFwcC9jb21wb25lbnRcbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlBpcGVkIG1vZHVsZXM8L2NhcHRpb24+XG4gICAqIGNvbXBvbmVudFxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTEoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUyKCkpXG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMygpKVxuICAgKi9cbiAgbW9kdWxlKG1vZHVsZSkge1xuICAgIHRoaXMuYXBwbHlNb2R1bGUobW9kdWxlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRQcm90b3R5cGU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG5leHBvcnQgdmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAgICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gICAqXG4gICAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAgICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICAgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICAgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICAgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gICAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gICAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAgICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAgICpcbiAgICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAgICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICAgKi9cbn07ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59IiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn0iLCIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59IiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9OyIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7RGVwZW5kZW5jeUVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIE1vZHVsZU1hbmFnZXJcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IGhhbmRsZXJcbiAqIEBkZXNjcmlwdGlvbiAgU29sdmVzIG1vZHVsZXMgZGVwZW5kZW5jaWVzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZHVsZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBvYmplY3Q7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcblxuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZSgoc3RhdGUgPSBbe30sICcnXSwgYWN0aW9uKSA9PiB7XG4gICAgICBzdGF0ZVswXVthY3Rpb24ua2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgc3RhdGVbMV0gPSBhY3Rpb24ua2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vZHVsZXMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFjdGl2ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgLmN1cnJlbnRNb2R1bGUgdG8gcHJvdmlkZWQgbW9kdWxlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gbWFrZSBjdXJyZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhY3RpdmUobW9kdWxlKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXQncyAuY3VycmVudE1vZHVsZSB0byBudWxsLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmluZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZSB0aGUgbW9kdWxlIGluIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBkZWZpbmUobmFtZSkge1xuICAgIHRoaXMubW9kdWxlc1tuYW1lXSA9IHRoaXMuY3VycmVudE1vZHVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVzZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgZGVmaW5lZCBtb2R1bGUgZnJvbSBtYW5hZ2VyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBtb2R1bGUgbmFtZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgdXNlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVzW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQW4gYWxpYXMgZm9yIC5hZGQoKSA8YnIvPjxici8+XG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3Uga25vdyB0aGF0IHlvdSB3aWxsIG92ZXJ3cml0ZSBleGlzdGluZyBkZXBlbmRlbmN5Ljxici8+XG4gICAqIFVzZSBpdCBpbiB5b3VyIGFwcCwgYnV0IG5vdCBpbiBtb2R1bGUgdGhhdCB5b3UgcHJvdmlkZSB0byBvdGhlciBwZW9wbGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSB0aGUgdmFsdWUgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHNldChrZXksIGRhdGEpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdBREQnLFxuICAgICAga2V5LFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyBkZXBlbmRlbmN5IGluIHN0b3JlIG9iamVjdCwgYnkga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7T2JqZWN0fE1vZHVsZX1cbiAgICogQHRocm93cyB7RGVwZW5kZW5jeUVycm9yfSBpZiBkZXBlbmRlbmN5IGlzIG5vdCBpbiB0aGUgc3RvcmVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuZ2V0KCdoZWxsbycpOyAvLyAtPiB7d29ybGQ6IHRydWV9XG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgaWYgKCF0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XSkge1xuICAgICAgdGhyb3cgbmV3IERlcGVuZGVuY3lFcnJvcihcbiAgICAgICAgJ01vZHVsZU1hbmFnZXInLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzICcke2tleX0nIGRlcGVuZGVuY3lgLFxuICAgICAgICB0aGlzLmN1cnJlbnRNb2R1bGVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaGFzXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB3aGV0aGVyIG1hbmFnZXIgaGFzIGEgZGVwZW5kZW5jeSB3aXRoIHRoZSBnaXZlbiBrZXlcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNoZWNrIHdoZXRoZXIgdGhlIHN0b3JlIGhhcyB0aGUgJ2hlbGxvJyBkZXBlbmRlbmN5PC9jYXB0aW9uPlxuICAgKiBtYW5hZ2VyLmhhcygnaGVsbG8nKTsgLy8gLT4gdHJ1ZVxuICAgKi9cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgZGVwc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW2RlcHNNYXA9e31dXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1cGRhdGUoZGVwc01hcCA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBkZXBzTWFwW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkXG4gICAqIEBhbGlhcyBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyI3NldFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgYWRkKC4uLmRhdGEpIHtcbiAgICBjb25zb2xlLndhcm4oJy5hZGQoKSBtZXRob2QgaXMgZGVwcmVjYXRlZC4gVXNlIC5zZXQoKSBpbnN0ZWFkJyk7XG4gICAgcmV0dXJuIHRoaXMuc2V0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVxdWlyZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJlcXVpcmUgbW9kdWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIERlZmluZWQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2R1bGVFeGVjdXRvciBGdW5jdGlvbiB0aGF0IHJldHVybnMgYXBwbGllZCBtb2R1bGVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHJlcXVpcmUobmFtZSwgbW9kdWxlRXhlY3V0b3IpIHtcbiAgICBpZiAodGhpcy51c2UobmFtZSkgPT09IHVuZGVmaW5lZCkgdGhpcy5oYW5kbGVyLmFwcGx5TW9kdWxlKG1vZHVsZUV4ZWN1dG9yKCkpO1xuICB9XG59XG4iLCJpbXBvcnQge2V4dGVuZCwgdHJhbnNmb3JtRGF0YX0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbmltcG9ydCB7TWFuYWdlckVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge1xuICAgKiAgIG1vZHVsZXM6IFtdLFxuICAgKiAgIG1hbmFnZXI6IHRydWVcbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIG1vZHVsZXM6IFtdLFxuICAgIG1hbmFnZXI6IHRydWVcbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCB7fVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHt9O1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBwcm9taXNlcyB0aGF0IHNob3VsZCBiZSByZXNvbHZlZCBiZWZvcmUgQ29tcG9uZW50IGlzIHJlYWR5LlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I193YWl0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd2FpdCA9IFtdOyAvLyBDb2xsZWN0aW9uIG9mIHByb21pc2VzO1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGBtb2R1bGVzYC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNtb2R1bGVzXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIG1vZHVsZXMgPSBbXTsgLy8gQ29sbGVjdGlvbiBvZiBtb2R1bGVzO1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGBjaGlsZGAgQ29tcG9uZW50cy5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNjaGlsZHJlblxuICAgKiBAcHVibGljXG4gICAqL1xuICBjaGlsZHJlbiA9IFtdOyAvLyBGb3Iga2VlcGluZyBjaGlsZHJlbiBjb21wb25lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBkZWZhdWx0cyA9IENvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gQ29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBBcHBseSBwb2x5ZmlsbGVkIHBhcmFtZXRlcnMgdG8gLnBhcmFtcztcbiAgICB0aGlzLnBhcmFtcyA9IGV4dGVuZCh0cmFuc2Zvcm1EYXRhKHBhcmFtcywgaW5zdHJ1Y3Rpb25zKSwgZGVmYXVsdHMpO1xuICAgIGlmICh0aGlzLnBhcmFtcy5tYW5hZ2VyKSB0aGlzLm1hbmFnZXIgPSBuZXcgTW9kdWxlTWFuYWdlcigpO1xuXG4gICAgdGhpcy5tb2R1bGVzID0gdGhpcy5wYXJhbXMubW9kdWxlcztcblxuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd2FpdFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdhaXQgZm9yIGEgcHJvbWlzZS5cbiAgICogQHBhcmFtIHtQcm9taXNlfSBbcHJvbWlzZV0gLSBUaGUgcHJvbWlzZSB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byBhIHF1ZXVlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICB3YWl0KHByb21pc2UpIHtcbiAgICBpZiAocHJvbWlzZSkgdGhpcy5fd2FpdC5wdXNoKHByb21pc2UpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl93YWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmVyXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRXhlY3V0ZSBgZnVuY2AgKENhbGxiYWNrKSB3aGVuIENvbXBvbmVudCBpcyByZWFkeS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIENhbGxiYWNrLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBkZWZlcihmdW5jKSB7XG4gICAgaWYgKHRoaXMuaXNEZWZmZXJlZCkgdGhpcy53YWl0KCkudGhlbigoKSA9PiBmdW5jKHRoaXMpKTtcbiAgICBlbHNlIGZ1bmModGhpcyk7XG4gIH1cblxuICAvLyBQQVJBTUVURVJTXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlUGFyYW1zXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyBwYXJhbWV0ZXJzIG9mIHRoZSBDb21wb25lbnQuXG4gICAqIEByZXR1cm4ge09iamVjdH0gUGFyYW1zIG9mIHRoaXMgQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHVwZGF0ZVBhcmFtcyhwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gZXh0ZW5kKHBhcmFtcywgdGhpcy5wYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLnBhcmFtcztcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDbG9uZSB0aGlzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHtvYmplY3R9IGEgY2xvbmVkIGNvbXBvbmVudCB3aXRoIGFsbCBpdHMgc291cmNlIGNvbXBvbmVudCcgcGFyYW1zIGNvcGllZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMucGFyYW1zKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIG5hdGl2ZSBhbmQgaW50ZWdyYXRlIGBtb2R1bGVzYCB0byBpdC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IHNvdXJjZSAtIFNvdXJjZSBjb21wb25lbnQgdGhhdCBpcyB1c2VkIGZvciBgY29weSgpYCBhY3Rpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVdIC0gQ2FsbGJhY2sgZXhlY3V0ZWQgYmVmb3JlIG1vZHVsZXMgaW50ZWdyYXRpb24gcHJvY2Vzcy5cbiAgICogQHJldHVybiB7dGhpc30gQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlLCBjdXN0b21pemUpIHtcbiAgICB0aGlzLnBhcmFtcyA9IHsuLi5zb3VyY2UucGFyYW1zfTtcblxuICAgIGlmIChzb3VyY2UubmF0aXZlKSB0aGlzLm5hdGl2ZSA9IHNvdXJjZS5uYXRpdmUuY2xvbmUoc291cmNlLnBhcmFtcyk7XG4gICAgaWYgKGN1c3RvbWl6ZSkgY3VzdG9taXplKCk7XG4gICAgdGhpcy5pbnRlZ3JhdGVNb2R1bGVzKHNvdXJjZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBhIGNoaWxkIGBDb21wb25lbnRgLlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gb2JqZWN0IC0gQ29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIGFkZGVkIGFzIGEgYGNoaWxkYC5cbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgZG9uZS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgYWRkKG9iamVjdCkge1xuICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgICBjb25zdCB7bmF0aXZlfSA9IG9iamVjdDtcbiAgICAgICAgaWYgKCFuYXRpdmUpIHJlamVjdCgpO1xuXG4gICAgICAgIGNvbnN0IGFkZFByb21pc2UgPSB0aGlzLmFwcGx5QnJpZGdlKHtvbkFkZDogb2JqZWN0fSkub25BZGQ7XG5cbiAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUuYWRkKG5hdGl2ZSk7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICByZXNvbHZlKG9iamVjdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGFkZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSBhZGRQcm9taXNlLnRoZW4ocmVzb2x2ZXIpO1xuICAgICAgICBlbHNlIHJlc29sdmVyKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZSBhIGNoaWxkIGBDb21wb25lbnRgLlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gb2JqZWN0IC0gQ29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIGEgKipjaGlsZCoqIG9mIHRoaXMgQ29tcG9uZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICByZW1vdmUob2JqZWN0KSB7XG4gICAgb2JqZWN0LnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5uYXRpdmUucmVtb3ZlKG9iamVjdC5uYXRpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkVG9cbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGB0aGlzYCBDb21wb25lbnQgdG8gc3BlY2lmaWVkIGBBcHBgL2BDb21wb25lbnRgLlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gb2JqZWN0IC0gQ29tcG9uZW50IHRoYXQgd2lsbCBiZSBhIHBhcmVudCBvZiBgdGhpc2AuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGFkZFRvKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QuYWRkKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgb2JqZWN0IGlzIGBhc3luY2AgKGB3YWl0YCBwcm9taXNlcyBhcmUgbW9yZSB0aGFuIGAwYCkuXG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNpc0RlZmZlcmVkXG4gICAqL1xuICBnZXQgaXNEZWZmZXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2FpdC5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBNb2R1bGVNYW5hZ2VyYCB1c2VkIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICogQG1lbWJlciB7TW9kdWxlTWFuYWdlcn0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I21hbmFnZXJcbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKi9cbiAgZ2V0IG1hbmFnZXIoKSB7XG4gICAgaWYgKHRoaXMuX21hbmFnZXIpIHJldHVybiB0aGlzLl9tYW5hZ2VyO1xuXG4gICAgdGhyb3cgbmV3IE1hbmFnZXJFcnJvcihcbiAgICAgICdDb21wb25lbnQnLFxuICAgICAgYE1vZHVsZU1hbmFnZXIgaXMgbm90IHVzZWQgaW4gdGhpcyBjb21wb25lbnQuICdtYW5hZ2VyJyBwYXJhbWV0ZXIgc2hvdWxkIGJlIHNldCBhcyAndHJ1ZSdgLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICBzZXQgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgdGhpcy5fbWFuYWdlciA9IG1hbmFnZXI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYG5hdGl2ZWAgb2JqZWN0IHVzZWQgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNuYXRpdmVcbiAgICovXG4gIGdldCBuYXRpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZTtcbiAgfVxuXG4gIHNldCBuYXRpdmUobWVzaCkge1xuICAgIHRoaXMuX25hdGl2ZSA9IG1lc2g7XG4gICAgdGhpcy5fbmF0aXZlLmNvbXBvbmVudCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDb21wb25lbnRcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlcyguLi5tYXBwZXJzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtYXBwZXIgPSBtYXBwZXJzW2ldO1xuXG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1hcHBlci5tYXAubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbWFwcGVyLm1hcFtrXTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LnByb3RvdHlwZSwgYXR0cmlidXRlLCB7XG4gICAgICAgICAgZ2V0OiBtYXBwZXIuZ2V0dGVyKGF0dHJpYnV0ZSksXG4gICAgICAgICAgc2V0OiBtYXBwZXIuc2V0dGVyKGF0dHJpYnV0ZSksXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBtYXBwZXIuY29uZmlndXJhYmxlLFxuICAgICAgICAgIGVudW1lcmFibGU6IG1hcHBlci5lbnVtZXJhYmxlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoLi4ubWFwKSB7XG4gIHJldHVybiB7XG4gICAgbWFwLFxuICAgIGdldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVbbmFtZV07XG4gICAgICB9O1xuICAgIH0sXG4gICAgc2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVbbmFtZV0uY29weSh2YWx1ZSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pcnJvciguLi5tYXApIHtcbiAgcmV0dXJuIHtcbiAgICBtYXAsXG4gICAgZ2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVtuYW1lXTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBzZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLm5hdGl2ZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH07XG59XG4iLCJpbXBvcnQge01lc2h9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weSwgbWlycm9yfSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICdzY2FsZScpLFxuICBtaXJyb3IoJ21hdGVyaWFsJywgJ2dlb21ldHJ5Jylcbilcbi8qKlxuICogQGNsYXNzIE1lc2hDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIE1lc2hDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKiAgIGdlb21ldHJ5OiB7fSxcbiAgICogICBtYXRlcmlhbDogZmFsc2UsXG4gICAqXG4gICAqICAgc2hhZG93OiB7XG4gICAqICAgICBjYXN0OiB0cnVlLFxuICAgKiAgICAgcmVjZWl2ZTogdHJ1ZVxuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHNjYWxlOiB7eDogMSwgeTogMSwgejogMX1cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGJ1aWxkOiB0cnVlLFxuICAgIGdlb21ldHJ5OiB7fSxcbiAgICBtYXRlcmlhbDogZmFsc2UsXG5cbiAgICBzaGFkb3c6IHtcbiAgICAgIGNhc3Q6IHRydWUsXG4gICAgICByZWNlaXZlOiB0cnVlXG4gICAgfSxcblxuICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICBzY2FsZToge3g6IDEsIHk6IDEsIHo6IDF9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gIH07XG5cbiAgLy8gQ1VTVE9NIEdFT01FVFJZIEhBTkRMSU5HXG5cbiAgc3RhdGljIGN1c3RvbShnZW9tLCBjb25zdHJ1Y3RvciA9IE1lc2gpIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgICAgIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IGdlb20sXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IGNvbnN0cnVjdG9yKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKGdlb20sIHBhcmFtcywgY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IChNZXNoQ29tcG9uZW50LmN1c3RvbShnZW9tLCBjb25zdHJ1Y3RvcikpKHBhcmFtcyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gTWVzaENvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgICAgdGhpcy53cmFwKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uYXRpdmUgPSBidWlsZDtcbiAgICAgICAgdGhpcy53cmFwKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICB3cmFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIFRPRE86IEZpeCBkZWZlciB3aXRoIHBoeXNpY3NcbiAgICAgIC8vIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgY29uc3Qge3Bvc2l0aW9uLCByb3RhdGlvbiwgc2NhbGUsIHNoYWRvd30gPSB0aGlzLnBhcmFtcztcblxuICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XG4gICAgICB0aGlzLnJvdGF0aW9uLnNldChyb3RhdGlvbi54LCByb3RhdGlvbi55LCByb3RhdGlvbi56KTtcbiAgICAgIHRoaXMuc2NhbGUuc2V0KHNjYWxlLngsIHNjYWxlLnksIHNjYWxlLnopO1xuXG4gICAgICB0aGlzLm5hdGl2ZS5jYXN0U2hhZG93ID0gc2hhZG93LmNhc3Q7XG4gICAgICB0aGlzLm5hdGl2ZS5yZWNlaXZlU2hhZG93ID0gc2hhZG93LnJlY2VpdmU7XG5cbiAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgLy8gfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gTWVzaENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UpIHtcbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UsICgpID0+IHtcbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIE1lc2hDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge01lc2hDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZShnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICBjb25zdCBkZXN0ID0gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG5cbiAgICBpZiAoZ2VvbWV0cnkpIGRlc3QuZ2VvbWV0cnkgPSBkZXN0Lmdlb21ldHJ5LmNsb25lKCk7XG4gICAgaWYgKG1hdGVyaWFsKSBkZXN0Lm1hdGVyaWFsID0gZGVzdC5tYXRlcmlhbC5jbG9uZSgpO1xuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTWVzaENvbXBvbmVudFxufTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weX0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAndGFyZ2V0Jylcbilcbi8qKlxuICogQGNsYXNzIExpZ2h0Q29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBMaWdodENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKlxuICAgKiAgIHNoYWRvdzoge1xuICAgKiAgICAgY2FzdDogdHJ1ZSxcbiAgICpcbiAgICogICAgIGJpYXM6IDAsXG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqXG4gICAqICAgICBtYXBTaXplOiB7XG4gICAqICAgICAgIHdpZHRoOiAxMDI0LFxuICAgKiAgICAgICBoZWlnaHQ6IDEwMjRcbiAgICogICAgIH0sXG4gICAqXG4gICAqICAgICBjYW1lcmE6IHtcbiAgICogICAgICAgbmVhcjogdHJ1ZSxcbiAgICogICAgICAgZmFyOiA0MDAsXG4gICAqICAgICAgIGZvdjogOTAsXG4gICAqXG4gICAqICAgICAgIHRvcDogMjAwLFxuICAgKiAgICAgICBib3R0b206IC0yMDAsXG4gICAqICAgICAgIGxlZnQ6IC0yMDAsXG4gICAqICAgICAgIHJpZ2h0OiAyMDBcbiAgICogICAgIH1cbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG5cbiAgICBzaGFkb3c6IHtcbiAgICAgIGNhc3Q6IHRydWUsXG5cbiAgICAgIGJpYXM6IDAsXG4gICAgICByYWRpdXM6IDEsXG5cbiAgICAgIG1hcFNpemU6IHtcbiAgICAgICAgd2lkdGg6IDEwMjQsXG4gICAgICAgIGhlaWdodDogMTAyNFxuICAgICAgfSxcblxuICAgICAgY2FtZXJhOiB7XG4gICAgICAgIG5lYXI6IHRydWUsXG4gICAgICAgIGZhcjogNDAwLFxuICAgICAgICBmb3Y6IDkwLFxuXG4gICAgICAgIHRvcDogMjAwLFxuICAgICAgICBib3R0b206IC0yMDAsXG4gICAgICAgIGxlZnQ6IC0yMDAsXG4gICAgICAgIHJpZ2h0OiAyMDBcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IExpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBMaWdodENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdMaWdodENvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuXG4gICAgICB0aGlzLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAnSW5zdGFuY2Ugc2hvdWxkIGhhdmUgaXRcXCdzIG93biAuYnVpbGQoKS4nLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgdHJhbnNmb3JtcyAoYHBvc2l0aW9uYCAmIGByb3RhdGlvbmApXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGNvbXBsZXRlZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbiwgcm90YXRpb259ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XG4gICAgICAgIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnopO1xuXG4gICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBTaGFkb3dcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyBzaGFkb3cgcHJvcGVydGllc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIHdyYXBTaGFkb3coKSB7XG4gICAgY29uc3Qge25hdGl2ZSwgcGFyYW1zOiB7c2hhZG93fX0gPSB0aGlzO1xuXG4gICAgbmF0aXZlLmNhc3RTaGFkb3cgPSBzaGFkb3cuY2FzdDtcbiAgICBuYXRpdmUuc2hhZG93Lm1hcFNpemUud2lkdGggPSBzaGFkb3cubWFwU2l6ZS53aWR0aDtcbiAgICBuYXRpdmUuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gc2hhZG93Lm1hcFNpemUuaGVpZ2h0O1xuICAgIG5hdGl2ZS5zaGFkb3cuYmlhcyA9IHNoYWRvdy5iaWFzO1xuICAgIG5hdGl2ZS5zaGFkb3cucmFkaXVzID0gc2hhZG93LnJhZGl1cztcblxuICAgIGNvbnN0IHNoYWRvd0NhbWVyYSA9IG5hdGl2ZS5zaGFkb3cuY2FtZXJhO1xuICAgIGNvbnN0IGNhbWVyYSA9IHNoYWRvdy5jYW1lcmE7XG5cbiAgICBzaGFkb3dDYW1lcmEubmVhciA9IGNhbWVyYS5uZWFyO1xuICAgIHNoYWRvd0NhbWVyYS5mYXIgPSBjYW1lcmEuZmFyO1xuICAgIHNoYWRvd0NhbWVyYS5mb3YgPSBjYW1lcmEuZm92O1xuXG4gICAgc2hhZG93Q2FtZXJhLmxlZnQgPSBjYW1lcmEubGVmdDtcbiAgICBzaGFkb3dDYW1lcmEucmlnaHQgPSBjYW1lcmEucmlnaHQ7XG4gICAgc2hhZG93Q2FtZXJhLnRvcCA9IGNhbWVyYS50b3A7XG4gICAgc2hhZG93Q2FtZXJhLmJvdHRvbSA9IGNhbWVyYS5ib3R0b207XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gTGlnaHRDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGFyZ2V0KSB0aGlzLnRhcmdldC5jb3B5KHNvdXJjZS50YXJnZXQoKSk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIExpZ2h0Q29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtMaWdodENvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGlnaHRDb21wb25lbnRcbn07XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHl9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3RhcmdldCcpXG4pXG4vKipcbiAqIEBjbGFzcyBDYW1lcmFDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIENhbWVyYUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGJ1aWxkOiB0cnVlLFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBDYW1lcmFDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnQ2FtZXJhQ29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHRoaXMubmF0aXZlID0gYnVpbGQ7XG5cbiAgICAgIHRoaXMud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnQ2FtZXJhQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHRoaXMucGFyYW1zLnBvc2l0aW9uLngsIHRoaXMucGFyYW1zLnBvc2l0aW9uLnksIHRoaXMucGFyYW1zLnBvc2l0aW9uLnopO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldCh0aGlzLnBhcmFtcy5yb3RhdGlvbi54LCB0aGlzLnBhcmFtcy5yb3RhdGlvbi55LCB0aGlzLnBhcmFtcy5yb3RhdGlvbi56KTtcblxuICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtvbldyYXA6IDF9KTtcblxuICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgdHJhbnNmb3JtcyAmIGV4ZWN1dGUgYENvbXBvbmVudC5jb3B5KClgXG4gICAqIEByZXR1cm4ge3RoaXN9IENhbWVyYUNvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGFyZ2V0KSB0aGlzLnRhcmdldC5jb3B5KHNvdXJjZS50YXJnZXQoKSk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIENhbWVyYUNvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7Q2FtZXJhQ29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ2FtZXJhQ29tcG9uZW50XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgcmV0dXJuIHRpbWVbMF0gKiAxZTMgKyB0aW1lWzFdIC8gMWU2O1xufTtcbiIsImltcG9ydCBwcmVzZW50IGZyb20gJ3ByZXNlbnQnO1xuXG5leHBvcnQgY29uc3Qgc3lzdGVtID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG59O1xuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZ2xvYmFsLnBlcmZvcm1hbmNlID0ge1xuICAgIG5vdzogcHJlc2VudFxuICB9O1xufVxuIiwiaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uL3BvbHlmaWxsJztcbmltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJ9IGZyb20gJy4vTW9kdWxlTWFuYWdlcic7XG5cbi8qKlxuICogQGNsYXNzIEFwcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIHByZXBhcmUgYSB3b3JsZCBzY2VuZSwgc2V0dXAgcGh5c2ljcywgY2FtZXJhLCByZW5kZXJlciBhbmQgYWxsIG90aGVyIHRoaW5ncyB0aGF0IHlvdSB1c3VhbGx5IGRvIGJlZm9yZSBtYWtpbmcgbWVzaGVzLlxuICogQHBhcmFtIHtBcnJheX0gW21vZHVsZXM9W11dIC0gQXJyYXkgb2YgTW9kdWxlc1xuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIFNpbXVsYXRlIGZsYWdcbiAgICogQGRlc2NyaXB0aW9uIFNhbWUgYXMgLnVwZGF0ZUVuYWJsZWQsIGJ1dCBmb3IgcGh5c2ljcy4gRGVmaW5lcyBpZiBwaHlzaWNzIGlzIHNpbXVsYXRlZCBlYWNoIGZyYW1lLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjc2ltdWxhdGVcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2ltdWxhdGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI3VwZGF0ZUVuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gIC8qKlxuICAgKiBMb29wcyBpbiB0aGlzIGFwcFxuICAgKiBAZGVzY3JpcHRpb24gQXJyYXkgb2YgbG9vcHMgdGhhdCBhcmUgZXhlY3V0ZWQgYnkgdGhpcyBhcHAuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5BcHAjbG9vcHNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbG9vcHMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihtb2R1bGVzID0gW10pIHtcbiAgICBjb25zb2xlLmxvZyhgV0hTLkFwcCAke3ZlcnNpb259YCk7XG5cbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFuYWdlciA9IG5ldyBNb2R1bGVNYW5hZ2VyKHRoaXMpO1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3Qge2xvb3BzLCB1cGRhdGVFbmFibGVkfSA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzKCkge1xuICAgICAgcmVxdWVzdEFuaW1GcmFtZShwcm9jZXNzKTtcbiAgICAgIGlmICghdXBkYXRlRW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGwgPSBsb29wcy5sZW5ndGg7IGkgPCBsbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGUgPSBsb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5leGVjdXRlKGUuY2xvY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gICAgcHJvY2VzcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgcmVuZGVyaW5nIGxvb3BzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRMb29wXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGxvb3AgdG8gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gYWRkXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5BZGRpbmcgYSBsb29wIHRvIGFuIGFwcDwvY2FwdGlvbj5cbiAgICogY29uc3QgbG9vcCA9IG5ldyBMb29wKCgpID0+IHtcbiAgICogIC8vIC4uLlxuICAgKiB9KTtcbiAgICpcbiAgICogY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICAgKlxuICAgKiBhcHAuYWRkTG9vcChsb29wKTtcbiAgICogbG9vcC5zdGFydCgpO1xuICAgKi9cbiAgYWRkTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5sb29wcy5wdXNoKGxvb3ApO1xuICAgICAgcmVzb2x2ZShsb29wKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZUxvb3BcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgbG9vcCBmcm9tIHRoaXMgYXBwLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbG9vcCAtIHRoZSBsb29wIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHJlbW92ZUxvb3AobG9vcCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb29wcy5pbmRleE9mKGxvb3ApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkgdGhpcy5sb29wcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0KGtleSk7XG4gIH1cblxuICB1c2Uoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci51c2Uoa2V5KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcHBcbn07XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIExvb3BcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZWFjaCBhbmltYXRpb24gZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNsb2NrPXRydWVdIHBhc3NlcyBhIENsb2NrIHRvIHRoZSBmdW5jdGlvbiB3aGVuIGNhbGxlZCwgaWYgdHJ1ZVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3RvcihmdW5jLCB1c2VDbG9jayA9IHRydWUpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuY2xvY2sgPSB1c2VDbG9jayA/IG5ldyBDbG9jaygpIDogbnVsbDtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIENPTlRST0xTXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydHMgdGhpcyBsb29wLCBjbG9jayBpZiBpdCBoYXMgb25lLiBXb24ndCBkbyBhbnl0aGluZyBpZiBsb29wIGVuYWJsZWQgYWxyZWFkeS5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IFt3b3JsZF0gYXBwIHRvIGFkZCB0aGlzIGxvb3AgdG8sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RhcnQod29ybGQpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLmFkZExvb3AodGhpcyk7XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgdGhpcyBsb29wIGFuZCBpdHMgY2xvY2sgaWYgaXQgaGFzIG9uZSwgd29uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBsb29wIGlzIG5vdCBlbmFibGVkKVxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gcmVtb3ZlIHRoaXMgbG9vcCBmcm9tLCBpZiBwcm92aWRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICovXG4gIHN0b3Aod29ybGQpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuY2xvY2spIHRoaXMuY2xvY2suc3RvcCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHdvcmxkKSB3b3JsZC5yZW1vdmVMb29wKHRoaXMpO1xuICB9XG5cbiAgLy8gRVhFQ1VUSU9OXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZXhlY3V0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3BcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICogQHJldHVybnMgeyp9IHdoYXRldmVyIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3AgcmV0dXJuc1xuICAgKi9cbiAgZXhlY3V0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mdW5jKHRoaXMuY2xvY2spO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExvb3Bcbn07XG4iLCIvKiogQG1vZHVsZSBjb3JlICovXG5leHBvcnQgKiBmcm9tICcuL0NvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL01lc2hDb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9MaWdodENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0NhbWVyYUNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0FwcCc7XG5leHBvcnQgKiBmcm9tICcuL0xvb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbiIsImltcG9ydCB7QW1iaWVudExpZ2h0IGFzIEFtYmllbnRMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEFtYmllbnRMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gQW1iaWVudExpZ2h0IGlzIGEgc2ltcGxlIGNsYXNzLCBpdCBleHRlbmRzIExpZ2h0IGFuZCBpbmhlcml0cyBhbGwgaXRzIG1ldGhvZHMuXG4gKiBBbWJpZW50TGlnaHQgY3JlYXRlcyBiYXNpYyBsaWdodCBhcm91bmQgYWxsIHNjZW5lLCBzbyBpdCBkb2Vzbid0IG5lZWQgcHJvcGVydGllcyBsaWtlIHBvcyBvciB0YXJnZXQuXG4gKiBJdCBzdXBwb3J0cyBvbmx5IGNvbG9yIGFuZCBpbnRlbnNpdHkgYXMgcGFyYW1ldGVycywgd2hpY2ggZGVmaW5lcyB0aGUgY29sb3Igb2YgdGhlIHN1cnJvdW5kZWQgbGlnaHQgYW5kIGludGVuc2l0eSBvZiBsaWdodC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBBbWJpZW50TGlnaHQgPC9jYXB0aW9uPlxuICogbmV3IEFtYmllbnRMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjJcbiAqIH0pLmFkZFRvKHdvcmxkKTtcbiAqL1xuY2xhc3MgQW1iaWVudExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEFtYmllbnRMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEFtYmllbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQW1iaWVudExpZ2h0XG59O1xuIiwiaW1wb3J0IHtEaXJlY3Rpb25hbExpZ2h0IGFzIERpcmVjdGlvbmFsTGlnaHROYXRpdmUsIERpcmVjdGlvbmFsTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEaXJlY3Rpb25hbExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBEaXJlY3RpbmFsTGlnaHQgY3JlYXRlcyBhIGxpZ2h0IHRoYXQgc2hpbmVzIGZyb20gYSBzcGVjaWZpYyBkaXJlY3Rpb24gbm90IGZyb20gYSBzcGVjaWZpYyBwb3NpdGlvbi48YnIvPjxici8+XG4gKiBUaGlzIGxpZ2h0IHdpbGwgYmVoYXZlIGFzIHRob3VnaCBpdCBpcyBpbmZpbml0ZWx5IGZhciBhd2F5IGFuZCB0aGUgcmF5cyBwcm9kdWNlZCBmcm9tIGl0IGFyZSBhbGwgcGFyYWxsZWwuIDxici8+PGJyLz5cbiAqIFRoZSBiZXN0IGFuYWxvZ3kgd291bGQgYmUgYSBsaWdodCBzb3VyY2UgdGhhdCBhY3RzIGxpa2UgdGhlIHN1bjogdGhlIHN1biBpcyBzbyBmYXIgYXdheSB0aGF0IGFsbCBzdW5saWdodCBoaXR0aW5nIG9iamVjdHMgY29tZXMgZnJvbSB0aGUgc2FtZSBhbmdsZS48YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3MgYW5kIHRhcmdldCBwYXJhbWF0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRGlyZWN0aW9uYWxMaWdodCB0byBmYWxsIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgRGlyZWN0aW9uYWxMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjIsXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBEaXJlY3Rpb25hbExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERpcmVjdGlvbmFsTGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBEaXJlY3Rpb25hbExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEaXJlY3Rpb25hbExpZ2h0XG59O1xuIiwiaW1wb3J0IHtIZW1pc3BoZXJlTGlnaHQgYXMgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlLCBIZW1pc3BoZXJlTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBIZW1pc3BoZXJlTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIEhlbWlzcGhlcmVMaWdodCBpcyBhIGxpZ2h0IHNvdXJjZSBwb3NpdGlvbmVkIGRpcmVjdGx5IGFib3ZlIHRoZSBzY2VuZS48YnIvPlxuICogSXQgYWxzbyBkb2Vzbid0IG5lZWQgcG9zaXRpb24gYW5kIHRhcmdldCBwcm9wZXJ0aWVzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19oZW1pc3BoZXJlLmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge3NreUNvbG9yOiAweGZmZmZmZiwgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSGVtaXNwaGVyZUxpZ2h0PC9jYXB0aW9uPlxuICogbmV3IEhlbWlzcGhlcmVMaWdodCh7XG4gKiAgIHNreUNvbG9yOiAweGZmMDAwMCxcbiAqICAgZ3JvdW5kQ29sb3I6IDB4MDAwMGZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSGVtaXNwaGVyZUxpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBza3lDb2xvcjogMHhmZmZmZmYsXG4gICAgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEhlbWlzcGhlcmVMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEhlbWlzcGhlcmVMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5za3lDb2xvcixcbiAgICAgIHBhcmFtcy5ncm91bmRDb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgSGVtaXNwaGVyZUxpZ2h0XG59O1xuIiwiaW1wb3J0IHtQb2ludExpZ2h0IGFzIFBvaW50TGlnaHROYXRpdmUsIFBvaW50TGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQb2ludExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBQb2ludExpZ2h0IGNyZWF0ZXMgYSBsaWdodCBhdCBhIHNwZWNpZmljIHBvc2l0aW9uIGluIHRoZSBzY2VuZS4gVGhlIGxpZ2h0IHNoaW5lcyBpbiBhbGwgZGlyZWN0aW9ucyAocm91Z2hseSBzaW1pbGFyIHRvIGEgbGlnaHQgYnVsYi4pPGJyLz48YnIvPlxuICogSXQgaGFzIHRoZSBzYW1lIG9wdGlvbnMgYXMgQW1iaWVudExpZ2h0IGluIGxpZ2h0IHBhcmFtYXRlciwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zaXRpb24sIGRpc3RhbmNlIGFuZCBkZWNheS48YnIvPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIExpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFBvaW50TGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgUG9pbnRMaWdodCgge1xuICogICBjb2xvcjogMHhmZjAwMDAsXG4gKiAgIGludGVuc2l0eTogMixcbiAqICAgZGlzdGFuY2U6IDMwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUG9pbnRMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgZGVjYXk6IDFcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQb2ludExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUG9pbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUG9pbnRMaWdodFxufTtcbiIsImltcG9ydCB7U3BvdExpZ2h0IGFzIFNwb3RMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNwb3RMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gU3BvdExpZ2h0IGNyZWF0ZXMgc3BvdCBsaWdodCB0aGF0IGNhbiBjYXN0IHNoYWRvdyBpbiBvbmUgZGlyZWN0aW9uLiA8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgcGFyYW1ldGVycyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0LiA8YnIvPjxici8+XG4gKiBTcG90TGlnaHQgYWZmZWN0cyBtZXNoZXMgd2l0aCBsYW1iZXJ0IGFuZCBwaG9uZyBtYXRlcmlhbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9saWdodHNfc3BvdGxpZ2h0Lmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxLCBkaXN0YW5jZTogMTAwLCBhbmdsZTogTWF0aC5QSSAvIDMsIGV4cG9uZW50OiAwLCBkZWNheTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBTcG90TGlnaHQgdGhhdCBmYWxscyBkb3duIGZyb20gdmVjMygxMCwgMjAsIDEwKSB0byB2ZWMzKDAsIDAsIDApPC9jYXB0aW9uPlxuICogbmV3IFNwb3RMaWdodCh7XG4gKiAgIGNvbG9yOiAweDAwZmYwMCxcbiAqICAgaW50ZW5zaXR5OiAzLFxuICogICBkaXN0YW5jZTogMTAwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU3BvdExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgYW5nbGU6IE1hdGguUEkgLyAzLFxuICAgIGV4cG9uZW50OiAwLFxuICAgIGRlY2F5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNwb3RMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IFNwb3RMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuYW5nbGUsXG4gICAgICBwYXJhbXMuZXhwb25lbnQsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU3BvdExpZ2h0XG59O1xuIiwiaW1wb3J0IHtSZWN0QXJlYUxpZ2h0IGFzIFJlY3RBcmVhTGlnaHROYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG5jbGFzcyBBcmVhTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgd2lkdGg6IDEwLFxuICAgIGhlaWdodDogMTBcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQXJlYUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUmVjdEFyZWFMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMud2lkdGgsXG4gICAgICBwYXJhbXMuaGVpZ2h0XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFyZWFMaWdodFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvbGlnaHRzICovXG5leHBvcnQgKiBmcm9tICcuL0FtYmllbnRMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0RpcmVjdGlvbmFsTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9IZW1pc3BoZXJlTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2ludExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vU3BvdExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vQXJlYUxpZ2h0JztcbiIsImltcG9ydCB7Q3ViZUNhbWVyYSBhcyBDdWJlQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDdWJlQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyA2IGNhbWVyYXMgdGhhdCByZW5kZXIgdG8gYSBXZWJHTFJlbmRlclRhcmdldEN1YmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZXMgYSBDdWJlQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IEN1YmVDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBjdWJlUmVzb2x1dGlvbjogMjU2XG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgQ3ViZUNhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5DdWJlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGNhbWVyYToge1xuICAgKiAgICAgbmVhcjogMSxcbiAgICogICAgIGZhcjogMTAwMCxcbiAgICogICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBjdWJlUmVzb2x1dGlvbjogMTI4XG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN1YmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgQ3ViZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhcixcbiAgICAgIHBhcmFtcy5jdWJlUmVzb2x1dGlvblxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3ViZUNhbWVyYVxufTtcbiIsImltcG9ydCB7T3J0aG9ncmFwaGljQ2FtZXJhIGFzIE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvY2FtZXJhc1xuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIG9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFuIE9ydGhvZ3JhcGhpY0NhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBmYXI6IDEwMDAwXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDUwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXMuT3J0aG9ncmFwaGljQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgKiAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgKiAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAqICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT3J0aG9ncmFwaGljQ2FtZXJhLmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2NhbWVyYTogbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5sZWZ0LFxuICAgICAgcGFyYW1zLnJpZ2h0LFxuICAgICAgcGFyYW1zLnRvcCxcbiAgICAgIHBhcmFtcy5ib3R0b20sXG4gICAgICBwYXJhbXMubmVhcixcbiAgICAgIHBhcmFtcy5mYXJcbiAgICApfSkuY2FtZXJhO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9ydGhvZ3JhcGhpY0NhbWVyYVxufTtcbiIsImltcG9ydCB7UGVyc3BlY3RpdmVDYW1lcmEgYXMgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vLi4vcG9seWZpbGwnO1xuXG4vKipcbiAqIEBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYVxuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIHBlcnNwZWN0aXZlIHByb2plY3Rpb24uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gUGVyc3BlY3RpdmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoe1xuICogICBmb3Y6IDc1LFxuICogICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAwLFxuICogICAgIHk6IDEwMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5QZXJzcGVjdGl2ZUNhbWVyYSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBuZWFyOiAxLFxuICAgKiAgIGZhcjogMTAwMCxcbiAgICogICBmb3Y6IDc1LFxuICAgKiAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgZm92OiA3NSxcbiAgICBhc3BlY3Q6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHRcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGVyc3BlY3RpdmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmUoXG4gICAgICBwYXJhbXMuZm92LFxuICAgICAgcGFyYW1zLmFzcGVjdCxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGVyc3BlY3RpdmVDYW1lcmFcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL2NhbWVyYXMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ3ViZUNhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL09ydGhvZ3JhcGhpY0NhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL1BlcnNwZWN0aXZlQ2FtZXJhJztcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEJveEJ1ZmZlckdlb21ldHJ5LFxuICBCb3hHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQm94XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0JveEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBCb3gsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBCb3goe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgd2lkdGg6IDIsXG4gKiAgICAgIGhlaWdodDogMixcbiAqICAgICAgZGVwdGg6IDJcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQm94IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEsXG4gICAqICAgICBoZWlnaHQ6IDEsXG4gICAqICAgICBkZXB0aDogMSxcbiAgICogICAgIHdpZHRoU2VnbWVudHM6IDEsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICogICAgIGRlcHRoU2VnbWVudHM6IDFcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIGRlcHRoOiAxLFxuICAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgZGVwdGhTZWdtZW50czogMVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnZGVwdGgnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cycsICdkZXB0aFNlZ2VtZW50cyddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQm94LmRlZmF1bHRzLCBCb3guaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBCb3hCdWZmZXJHZW9tZXRyeSA6IEJveEdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGVwdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGhTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBCb3hcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBDaXJjbGVCdWZmZXJHZW9tZXRyeSxcbiAgQ2lyY2xlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENpcmNsZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQXMgdG9sZCBvbiBDb21wb25lbnQgZGVmaW5pdGlvbiwgd2hpbGUgeW91IGNhbiBwYXNzIGFueSBvZiB0aGUgaW5oZXJpdGVkIHBhcmFtcyBmb3IgdGhpcyBjb21wb25lbnQgY29uc3RydWN0aW9uLCB5b3Ugd2lsbCBuZWVkIHRvXG4gKiBwYXNzIHNwZWNpZmljIHBhcmFtZXRlcnMgdG8gYnVpbGQgdGhpcyBtZXNoIGFzIGEgZ2VvbWV0cnkgb2JqZWN0LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDaXJjbGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ2lyY2xlLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqICBuZXcgQ2lyY2xlKHtcbiAqICAgIGdlb21ldHJ5OiB7XG4gKiAgICAgIHJhZGl1czogNCxcbiAqICAgICAgc2VnbWVudHM6IDE2XG4gKiAgICB9LFxuICpcbiAqICAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgIH0pLFxuICpcbiAqICAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENpcmNsZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogNTAsXG4gICAqICAgICBzZWdtZW50czogOCxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogNTAsXG4gICAgICBzZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3NlZ21lbnRzJywgJ3RoZXRhU3RhcnQnLCAndGhldGFMZW5ndGgnXVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENpcmNsZS5kZWZhdWx0cywgQ2lyY2xlLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ2lyY2xlQnVmZmVyR2VvbWV0cnkgOiBDaXJjbGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENpcmNsZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENvbmVCdWZmZXJHZW9tZXRyeSxcbiAgQ29uZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDb25lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDb25lR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIENvbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IENvbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDb25lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Db25lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbXG4gICAqICAgJ3JhZGl1cycsXG4gICAqICAgJ2hlaWdodCcsXG4gICAqICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICogICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgKiAgICdvcGVuRW5kZWQnLFxuICAgKiAgICd0aGV0YVN0YXJ0JyxcbiAgICogICAndGhldGFMZW5ndGgnXG4gICAqIF1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENvbmUuZGVmYXVsdHMsIENvbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IENvbmVCdWZmZXJHZW9tZXRyeSA6IENvbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29uZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEN5bGluZGVyQnVmZmVyR2VvbWV0cnksXG4gIEN5bGluZGVyR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN5bGluZGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDeWxpbmRlckdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDeWxpbmRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ3lsaW5kZXIoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDeWxpbmRlciBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzVG9wOiAyMCxcbiAgICogICAgIHJhZGl1c0JvdHRvbTogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXNUb3A6IDAsXG4gICAgICByYWRpdXNCb3R0b206IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICByYWRpdXNTZWdtZW50czogMzIsXG4gICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICAgIG9wZW5FbmRlZDogZmFsc2UsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXIjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzVG9wJyxcbiAgICogICAncmFkaXVzQm90dG9tJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXNUb3AnLFxuICAgICAgJ3JhZGl1c0JvdHRvbScsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgICAgJ29wZW5FbmRlZCcsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBDeWxpbmRlci5kZWZhdWx0cywgQ3lsaW5kZXIuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDeWxpbmRlckJ1ZmZlckdlb21ldHJ5IDogQ3lsaW5kZXJHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzVG9wLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c0JvdHRvbSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3BlbkVuZGVkLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEN5bGluZGVyXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIERvZGVjYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2RlY2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhIGRvZGVjYWhlZHJvbiBpcyBhbnkgcG9seWhlZHJvbiB3aXRoIHR3ZWx2ZSBmbGF0IGZhY2VzLiA8YnIvPjxici8+XG4gKiBUaGUgbW9zdCBmYW1pbGlhciBkb2RlY2FoZWRyb24gaXMgdGhlIHJlZ3VsYXIgZG9kZWNhaGVkcm9uLCB3aGljaCBpcyBhIFBsYXRvbmljIHNvbGlkLiA8YnIvPlxuICogVGhlcmUgYXJlIGFsc28gdGhyZWUgcmVndWxhciBzdGFyIGRvZGVjYWhlZHJhLCB3aGljaCBhcmUgY29uc3RydWN0ZWQgYXMgc3RlbGxhdGlvbnMgb2YgdGhlIGNvbnZleCBmb3JtLiA8YnIvPlxuICogQWxsIG9mIHRoZXNlIGhhdmUgaWNvc2FoZWRyYWwgc3ltbWV0cnksIG9yZGVyIDEyMC5cbiAqIERvZGVjYWhlZHJvbiBjcmVhdGVzIERvZGVjYWhlZHJvbiBvYmplY3QgYnkgaXQncyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRG9kZWNhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIERvZGVjYWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgRG9kZWNhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTBcbiAqICAgfVxuICAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERvZGVjYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IHtcbiAgICogICByYWRpdXM6IDEsXG4gICAqICAgZGV0YWlsOiAwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERvZGVjYWhlZHJvbi5kZWZhdWx0cywgRG9kZWNhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBEb2RlY2FoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgRG9kZWNhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEV4dHJ1ZGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgRXh0cnVkZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gRXh0cnVkZSBnZW9tZXRyeSBtZWFucyB0aGF0IHlvdSBjYW4gY3JlYXRlIGEgM0QgbWVzaCBmcm9tIGFueSAyRCBzaGFwZSB1c2luZyB0aHJlZS5qcyBnZW9tZXRyeSBiYXNlZCBvbiA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9tYXRoL1ZlY3RvcjInPlRIUkVFLlZlY3RvcjIuPC9hPiA8YnIvPlxuICogU3VjaCBpbXBsZW1lbnRhdGlvbiB3aWxsIGhlbHAgeW91IHRvIG1ha2Ugdm9sdW1lZCBzaGFwZXMgdGhhdCBoYXZlIHRoZWlyIG93biBkZXB0aCBhbmQgY2FuIGJlIHNlZW4gZnJvbSBhbGwgYW5nZWxzLjxici8+PGJyLz5cbiAqIFlvdSBjYW4gYWxzbyBmaW5kIHNvbWUgaW50ZXJlc3RpbmcgZXhhbXBsZXMgbWFkZSB1c2luZyA8YSBocmVmPSd0aHJlZWpzLm9yZyc+dGhyZWUuanM8L2E+IHdoaWNoIGlzIGEgY29yZSBvZiB3aHMuanMsIHN1Y2ggYXM6XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlcy5odG1sJz5XZWJnbCBnZW9tZXRyeSBleHRydWRlPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zaGFwZXMyLmh0bWwnPkV4dHJ1ZGUgc2hhcGVzIGZyb20gZ2VvZGF0YTwvYT5cbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc3BsaW5lcy5odG1sJz5FeHRydWRlIHNwbGluZXM8L2E+XG4gKlxuICogU3VjaCBleGFtcGxlcyBjYW4gYmUgZWFzaWx5IGltcGxlbWVudGVkIHVzaW5nIHdoaXRlc3Rvcm0uanMgb3IgaXQncyBwbHVnaW5zLiBVc2UgYEV4dHJ1ZGVgIGNsYXNzIHdpdGggPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZXh0cmFzL2NvcmUvU2hhcGUnPlRIUkVFLlNoYXBlPC9hPiB0byBnZXQgZXh0cnVkZSBlZmZlY3Qgb2Ygc2hhcGUgZGVmaW5lZCBieSAyRCB2ZWN0b3JzLlxuICogVGhpcyBjbGFzcyBpcyBzaW1pbGFyIHRvIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2dlb21ldHJpZXMvRXh0cnVkZUdlb21ldHJ5Jz5USFJFRS5FeHRydWRlR2VvbWV0cnk8L2E+LFxuICogYnV0IGl0IGFsc28gY29udGFpbnMgYWxsIHByb3BlcnRpZXMsIGFwcGxpZWQgYnkgYFNoYXBlYCwgc3VjaCBhcyBtYXRlcmlhbCwgbWFzcyBhbmQgdmVjdG9ycyBsaWtlIHBvc2l0aW9uIChwb3MpIGFuZCByb3RhdGlvbiAocm90KS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRXh0cnVkZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBzaGFwZSwgdGhlbiBhbiBFeHRydWRlIGZyb20gaXQ8L2NhcHRpb24+XG4gKiBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZShbXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLDIpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigyLDApLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwtMilcbiAqIF0pO1xuICpcbiAqIGNvbnN0IGV4dHJ1ZGUgPSBuZXcgRXh0cnVkZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgc2hhcGVzOiBzaGFwZSxcbiAqICAgICBvcHRpb25zOiB7XG4gKiAgICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICogICAgICAgYmV2ZWxTaXplOiAwLFxuICogICAgICAgYW1vdW50OiAyXG4gKiAgICAgfVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KTtcbiAqXG4gKiBleHRydWRlLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEV4dHJ1ZGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHNoYXBlczogW10sXG4gICAqICAgICBvcHRpb25zOiB7fVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBzaGFwZXM6IFtdLFxuICAgICAgb3B0aW9uczoge31cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydzaGFwZXMnLCAnb3B0aW9ucyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRXh0cnVkZS5kZWZhdWx0cywgRXh0cnVkZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEV4dHJ1ZGVHZW9tZXRyeShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zaGFwZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3B0aW9uc1xuICAgICk7XG5cbiAgICByZXR1cm4gcGFyYW1zLmJ1ZmZlciA/IG5ldyBCdWZmZXJHZW9tZXRyeSgpLmZyb21HZW9tZXRyeShnZW9tZXRyeSkgOiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBFeHRydWRlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgSWNvc2FoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSWNvc2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhbiBpY29zYWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCAyMCBmYWNlcy48YnIvPlxuICogVGhlcmUgYXJlIG1hbnkga2luZHMgb2YgaWNvc2FoZWRyYSwgd2l0aCBzb21lIGJlaW5nIG1vcmUgc3ltbWV0cmljYWwgdGhhbiBvdGhlcnMuIFRoZSBtb3N0IHdlbGwga25vd24gaXMgdGhlIFBsYXRvbmljLCBjb252ZXggcmVndWxhciBpY29zYWhlZHJvbi48YnIvPlxuICogYEljb3NhaGVkcm9uYCBjcmVhdGVzIGFuIEljb3NhaGVkcm9uIG9iamVjdCBieSBpdHMgcmFkaXVzIGFuZCBkZXRhaWwuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0ljb3NhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEljb3NhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBJY29zYWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBJY29zYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHtnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ119XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBJY29zYWhlZHJvbi5kZWZhdWx0cywgSWNvc2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IEljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBJY29zYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJY29zYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIExhdGhlQnVmZmVyR2VvbWV0cnksXG4gIExhdGhlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExhdGhlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGBMYXRoZUdlb21ldHJ5YCBhbGxvd3MgeW91IHRvIGNyZWF0ZSBzaGFwZXMgZnJvbSBhIHNtb290aCBjdXJ2ZS5cbiAqIFRoaXMgY3VydmUgaXMgZGVmaW5lZCBieSBhIG51bWJlciBvZiBwb2ludHMgKGFsc28gY2FsbGVkIGtub3RzKSBhbmQgaXMgbW9zdCBvZnRlbiBjYWxsZWQgYSBzcGxpbmUuIFRoaXMgc3BsaW5lIGlzIHJvdGF0ZWQgYXJvdW5kIGEgZml4ZWQgcG9pbnQgYW5kIHJlc3VsdHMgaW4gdmFzZS0gYW5kIGJlbGwtbGlrZSBzaGFwZXMuPGJyLz48YnIvPlxuICogSW4gM0QgY29tcHV0ZXIgZ3JhcGhpY3MsIGEgbGF0aGVkIG9iamVjdCBpcyBhIDNEIG1vZGVsIHdob3NlIHZlcnRleCBnZW9tZXRyeSBpcyBwcm9kdWNlZCBieSByb3RhdGluZyB0aGUgcG9pbnRzIG9mIGEgc3BsaW5lIG9yIG90aGVyIHBvaW50IHNldCBhcm91bmQgYSBmaXhlZCBheGlzLlxuICogVGhlIGxhdGhpbmcgbWF5IGJlIHBhcnRpYWw7IHRoZSBhbW91bnQgb2Ygcm90YXRpb24gaXMgbm90IG5lY2Vzc2FyaWx5IGEgZnVsbCAzNjAgZGVncmVlcy5cbiAqIFRoZSBwb2ludCBzZXQgcHJvdmlkaW5nIHRoZSBpbml0aWFsIHNvdXJjZSBkYXRhIGNhbiBiZSB0aG91Z2h0IG9mIGFzIGEgY3Jvc3Mgc2VjdGlvbiB0aHJvdWdoIHRoZSBvYmplY3QgYWxvbmcgYSBwbGFuZSBjb250YWluaW5nIGl0cyBheGlzIG9mIHJhZGlhbCBzeW1tZXRyeS4gPGJyLz48YnIvPlxuICogVGhlIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjTGF0aGVHZW9tZXRyeSc+Zm9sbG93aW5nIGV4YW1wbGU8L2E+IHNob3dzIGEgZ2VvbWV0cnkgd2hpY2ggY2FuIGJlIGdlbmVyYXRlZCB1c2luZyBgTGF0aGVgIGNsYXNzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMYXRoLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IHBvaW50cyA9IFtdO1xuICpcbiAqIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICogICBwb2ludHMucHVzaChcbiAqICAgICBuZXcgVEhSRUUuVmVjdG9yMihcbiAqICAgICAgIChNYXRoLnNpbihpICogMC43KSAqIDE1ICsgNTApIC8gMTAsXG4gKiAgICAgICAoaSAtIDUpICogMC4yXG4gKiAgICAgKVxuICogICApO1xuICogfVxuICpcbiAqIGNvbnN0IGxhdGhlID0gbmV3IExhdGhlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBwb2ludHM6IHBvaW50c1xuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA1MCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMYXRoZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHBvaW50czogW11cbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcG9pbnRzOiBbXVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxhdGhlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIExhdGhlLmRlZmF1bHRzLCBMYXRoZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gTGF0aGVCdWZmZXJHZW9tZXRyeSA6IExhdGhlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBvaW50c1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGF0aGVcbn07XG4iLCJpbXBvcnQge1xuICBMaW5lIGFzIExpbmVOYXRpdmUsXG4gIEJ1ZmZlckdlb21ldHJ5LFxuICBHZW9tZXRyeSxcbiAgQnVmZmVyQXR0cmlidXRlLFxuICBMaW5lQ3VydmUzLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBMaW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBMaW5lIGNvbXBvbmVudCBpcyBnZW5lcmF0ZWQgZnJvbSBhIGN1cnZlL2xpbmUgYW5kIGFtb3VudCBvZiB2ZWN0b3JzIHRoYXQgc2hvdWxkIGJlIHVzZWQgKHBvaW50cykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMaW5lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBMaW5lKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBjdXJ2ZTogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFRIUkVFLlZlY3RvcjMoMTAsIDEwLCAwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMTAsIDMwLCAwKSlcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgTGluZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgY3VydmU6IG5ldyBMaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygxMCwgMCwgMCkpLFxuICAgKiAgICAgcG9pbnRzOiA1MFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBjdXJ2ZTogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDEwLCAwLCAwKSksXG4gICAgICBwb2ludHM6IDUwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPntcbiAgICogICBnZW9tZXRyeTogWydjdXJ2ZScsICdwb2ludHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydjdXJ2ZScsICdwb2ludHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHN1cGVyKHBhcmFtcywgTGluZS5kZWZhdWx0cywgTGluZS5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IExpbmVOYXRpdmUoZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBwYXJhbXMuYnVmZmVyID8gbmV3IEJ1ZmZlckdlb21ldHJ5KCkgOiBuZXcgR2VvbWV0cnkoKTtcblxuICAgIGlmIChwYXJhbXMuYnVmZmVyKSB7XG4gICAgICBjb25zdCBwcCA9IHBhcmFtcy5nZW9tZXRyeS5jdXJ2ZS5nZXRQb2ludHMocGFyYW1zLmdlb21ldHJ5LnBvaW50cyk7XG4gICAgICBjb25zdCB2ZXJ0cyA9IG5ldyBGbG9hdDMyQXJyYXkocHAubGVuZ3RoICogMyk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBwcC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICBjb25zdCBpMyA9IGkgKiAzO1xuXG4gICAgICAgIHZlcnRzW2kzXSA9IHBwW2ldLng7XG4gICAgICAgIHZlcnRzW2kzICsgMV0gPSBwcFtpXS55O1xuICAgICAgICB2ZXJ0c1tpMyArIDJdID0gcHBbaV0uejtcbiAgICAgIH1cblxuICAgICAgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBCdWZmZXJBdHRyaWJ1dGUodmVydHMsIDMpKTtcbiAgICB9IGVsc2UgZ2VvbWV0cnkudmVydGljZXMgPSBwYXJhbXMuZ2VvbWV0cnkuY3VydmUuZ2V0UG9pbnRzKHBhcmFtcy5nZW9tZXRyeS5wb2ludHMpO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExpbmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBKU09OTG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBJbXBvcnRlclxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW1wb3J0ZXIgaXMgYSBsb2FkZXIgZm9yIG1lc2hlcyBhbmQgYW55IG90aGVyIGRhdGEgdG8geW91ciBzY2VuZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSW1wb3J0ZXIsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IEltcG9ydGVyKHtcbiAqICAgbG9hZGVyOiBuZXcgVEhSRUUuT0JKTG9hZGVyKCksXG4gKlxuICogICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFsKSB7IC8vIGRhdGEgZnJvbSBsb2FkZXJcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTsgLy8gc2hvdWxkIHJldHVybiB5b3VyIC5uYXRpdmUgKG1lc2ggaW4gdGhpcyBjYXNlKVxuICogICB9LFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBJbXBvcnRlciBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlciNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICB1cmw6ICcnLFxuICAgKiAgIGxvYWRlcjogbmV3IEpTT05Mb2FkZXIoKSxcbiAgICpcbiAgICogICBvbkxvYWQoKSB7fSxcbiAgICogICBvblByb2dyZXNzKCkge30sXG4gICAqICAgb25FcnJvcigpIHt9LFxuICAgKlxuICAgKiAgIHRleHR1cmVQYXRoOiBudWxsLFxuICAgKiAgIHVzZUN1c3RvbU1hdGVyaWFsOiBmYWxzZSxcbiAgICpcbiAgICogICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFscykge1xuICAgKiAgICAgcmV0dXJuIG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICB1cmw6ICcnLFxuICAgIGxvYWRlcjogbmV3IEpTT05Mb2FkZXIoKSxcblxuICAgIG9uTG9hZCgpIHt9LFxuICAgIG9uUHJvZ3Jlc3MoKSB7fSxcbiAgICBvbkVycm9yKCkge30sXG5cbiAgICB0ZXh0dXJlUGF0aDogbnVsbCxcbiAgICB1c2VDdXN0b21NYXRlcmlhbDogZmFsc2UsXG5cbiAgICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFscykge1xuICAgICAgcmV0dXJuIG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICAgIH1cbiAgfTtcblxuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zXG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZmlsdGVyXG4gICAqIEBkZXNjcmlwdGlvbiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7VEhSRUUuTWVzaH0gb2JqZWN0IEluc3RhbmNlIGZvciBpdGVyYXRpbmcgdGhyb3VnaCBpdCdzIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaWx0ZXIgRnVuY3Rpb24gd2l0aCBjaGlsZCBhcyBhcmd1bWVudCwgc2hvdWxkIHJldHVybiBhIGJvb2xlYW4gd2hldGhlciBpbmNsdWRlIHRoZSBjaGlsZCBvciBub3QuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IG9iamVjdCB3aXRoIGNoaWxkcmVuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSW1wb3J0ZXJcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UmVtb3ZpbmcgdW5uZWNlc3NhcnkgbGlnaHRzIGZyb20gY2hpbGRyZW48L2NhcHRpb24+XG4gICAqIG5ldyBJY29zYWhlZHJvbih7XG4gICAqICAgbG9hZGVyOiBuZXcgVEhSRUUuT0JKTG9hZGVyKCksXG4gICAqXG4gICAqICAgcGFyc2UoZ3JvdXApIHsgLy8gZGF0YSBmcm9tIGxvYWRlclxuICAgKiAgICAgcmV0dXJuIEltcG9ydGVyLmZpbHRlcihncm91cCwgY2hpbGQgPT4gIWNoaWxkLmlzTGlnaHQpOyAvLyByZW1vdmUgbGlnaHRzXG4gICAqICAgfSxcbiAgICpcbiAgICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAgICogfSkuYWRkVG8oYXBwKTtcbiAgICovXG4gIHN0YXRpYyBmaWx0ZXIob2JqZWN0LCBmaWx0ZXIpIHtcbiAgICBjb25zdCBwcm9jZXNzRmlsdGVyID0gb2JqZWN0ID0+IHtcbiAgICAgIG9iamVjdC5jaGlsZHJlbi5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGVsLmNoaWxkcmVuKSBwcm9jZXNzRmlsdGVyKGVsKTtcbiAgICAgICAgaWYgKCFmaWx0ZXIoZWwpKSBvYmplY3QuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJvY2Vzc0ZpbHRlcihvYmplY3QpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEltcG9ydGVyLmRlZmF1bHRzLCBJbXBvcnRlci5pbnN0cnVjdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSW1wb3J0ZXJcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKHBhcmFtcy50ZXh0dXJlUGF0aCkgcGFyYW1zLmxhb2Rlci5zZXRUZXh0dXJlUGF0aChwYXJhbXMudGV4dHVyZVBhdGgpO1xuXG4gICAgICBwYXJhbXMubG9hZGVyLmxvYWQocGFyYW1zLnVybCwgKC4uLmRhdGEpID0+IHsgLy8gZ2VvbWV0cnksIG1hdGVyaWFsc1xuICAgICAgICBwYXJhbXMub25Mb2FkKC4uLmRhdGEpO1xuXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IHBhcmFtcy5wYXJzZXIoLi4uZGF0YSl9KS5tZXNoO1xuXG4gICAgICAgIGNvbnN0IHtnZW9tZXRyeTogZ2VvbSwgbWF0ZXJpYWw6IG1hdH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogb2JqZWN0Lmdlb21ldHJ5LFxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMudXNlQ3VzdG9tTWF0ZXJpYWwgPyBwYXJhbXMubWF0ZXJpYWwgOiBvYmplY3QubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG9iamVjdC5nZW9tZXRyeSkgb2JqZWN0Lmdlb21ldHJ5ID0gZ2VvbTtcbiAgICAgICAgaWYgKG9iamVjdC5tYXRlcmlhbCkgb2JqZWN0Lm1hdGVyaWFsID0gbWF0O1xuXG4gICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgIH0sIHBhcmFtcy5vblByb2dyZXNzLCBwYXJhbXMub25FcnJvcik7XG4gICAgfSk7XG5cbiAgICBzdXBlci53YWl0KHByb21pc2UpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgSW1wb3J0ZXJcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIE9jdGFoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgT2N0YWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGFuIG9jdGFoZWRyb24gaXMgYSBwb2x5aGVkcm9uIHdpdGggZWlnaHQgZmFjZXMuXG4gKiBBIHJlZ3VsYXIgb2N0YWhlZHJvbiBpcyBhIFBsYXRvbmljIHNvbGlkIGNvbXBvc2VkIG9mIGVpZ2h0IGVxdWlsYXRlcmFsIHRyaWFuZ2xlcywgZm91ciBvZiB3aGljaCBtZWV0IGF0IGVhY2ggdmVydGV4LlxuICogPGJyLz48YnIvPlxuICogYE9jdGFoZWRyb25gIGNyZWF0ZXMgYW4gT2N0YWhlZHJvbiBvYmplY3QgYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjT2N0YWhlZHJvbkdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gT2N0YWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgT2N0YWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBPY3RhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5PY3RhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICBkZXRhaWw6IDBcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIE9jdGFoZWRyb24uZGVmYXVsdHMsIE9jdGFoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLk9jdGFoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gT2N0YWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogT2N0YWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBPY3RhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5LFxuICBQYXJhbWV0cmljR2VvbWV0cnksXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBhcmFtZXRyaWNcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIGBQYXJhbWV0cmljYCBnZW5lcmF0ZXMgYSBnZW9tZXRyeSByZXByZXNlbnRpbmcgYSA8YSBocmVmPSdodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QYXJhbWV0cmljX3N1cmZhY2UnPlBhcmFtZXRyaWMgc3VyZmFjZTwvYT5cbiAqIDxici8+PGJyLz5cbiAqIEl0IGlzIHVzdWFsbHkgdXNlZCB0byBkZXZlbG9wIGRpZmZlcmVudCBraW5kcyBvZiBoaWdoZmllbGRzIG9yIHZpc3VhbGl6ZSBhIDxhIGhyZWY9J2h0dHBzOi8vc3RlbWtvc2tpLmdpdGh1Yi5pby9UaHJlZS5qcy9HcmFwaHVsdXMtRnVuY3Rpb24uaHRtbCc+bWF0aCBmdW5jdGlvbjwvYT4uXG4gKiA8YnIvPlxuICogLSA8YSBocmVmPSdodHRwOi8vbWF0aC5od3MuZWR1L2dyYXBoaWNzYm9vay9zb3VyY2UvdGhyZWVqcy9jdXJ2ZXMtYW5kLXN1cmZhY2VzLmh0bWwnPlBhcmFtZXRyaWMgc3VyZmFjZTwvYT5cbiAqIC0gPGEgaHJlZj0naHR0cHM6Ly9zdGVta29za2kuZ2l0aHViLmlvL1RocmVlLmpzL0dyYXBodWx1cy1TdXJmYWNlLmh0bWwnPlwiR3JhcGh1bHVzXCI8L2E+XG4gKiA8YnIvPjxici8+XG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1BhcmFtZXRyaWNHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV4YW1wbGUgY3JlYXRpbmcgYW4gaGVpZ2h0ZmllbGQtbGlrZSBnZW9tZXRyeS4gYHVgIGFuZCBgdmAgYXJlIGxpa2UgYHhgIGFuZCBgeWAgaW4gc2hhcGUsIGJ1dCB0aGVpciB2YWx1ZXMgYXJlIGFsd2F5cyBmcm9tIGAwYCB0byBgMWAuXG4gKiBXZSB1c2UgdGhlbSBpbiBgVEhSRUUuVmVjdG9yM2AgbGlrZSBgeGAgYW5kIGB6YCBhbmQgYE1hdGgucmFuZG9tKCkgKiA1YCBmb3IgYHlgLjwvY2FwdGlvbj5cbiAqIGNvbnN0IGNyZWF0ZVBhcmFtZXRyaWMgPSAodSwgdikgPT4ge1xuICogICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjModSAqIDMwLCBNYXRoLnJhbmRvbSgpICogNSwgdiAqIDMwKTtcbiAqIH1cbiAqXG4gKiBuZXcgUGFyYW1ldHJpYyh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgZnVuYzogY3JlYXRlUGFyYW1ldHJpY1xuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZVxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAtMTAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUGFyYW1ldHJpYyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGFyYW1ldHJpYyNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgZnVuYzogKHUsIHYpID0+IG5ldyBWZWN0b3IzKHUsIHYsIDApLFxuICAgKiAgICAgc2xpY2VzOiAxMCxcbiAgICogICAgIHRhY2tzOiAxMFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBmdW5jOiAodSwgdikgPT4gbmV3IFZlY3RvcjModSwgdiwgMCksXG4gICAgICBzbGljZXM6IDEwLFxuICAgICAgc3RhY2tzOiAxMFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQYXJhbWV0cmljLmRlZmF1bHRzLCBQYXJhbWV0cmljLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBhcmFtZXRyaWNcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5IDogUGFyYW1ldHJpY0dlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5mdW5jLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNsaWNlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zdGFja3NcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBhcmFtZXRyaWNcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQbGFuZUJ1ZmZlckdlb21ldHJ5LFxuICBQbGFuZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQbGFuZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gYFBsYW5lYCBpcyB1c2VkIGZvciBjcmVhdGluZyBwbGFuZXMgZ2l2ZW4gc29tZSBgd2lkdGhgIGFuZCBgaGVpZ2h0YC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUGxhbmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUGxhbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFBsYW5lKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICB3aWR0aDogMjAsXG4gKiAgICAgaGVpZ2h0OiAzMFxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQbGFuZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHdpZHRoOiAxMCxcbiAgICogICAgIGhlaWdodDogMTAsXG4gICAqICAgICB3U2VnbWVudHM6IDEsXG4gICAqICAgICBoU2VnbWVudHM6IDFcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgd2lkdGg6IDEwLFxuICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgIHdTZWdtZW50czogMSxcbiAgICAgIGhTZWdtZW50czogMVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnd1NlZ21lbnRzJywgJ2hTZWdtZW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICd3U2VnbWVudHMnLCAnaFNlZ21lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGxhbmUuZGVmYXVsdHMsIFBsYW5lLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gUGxhbmVCdWZmZXJHZW9tZXRyeSA6IFBsYW5lR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQbGFuZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgUG9seWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG5jb25zdCBbdmVydGljZXNPZkN1YmUsIGluZGljZXNPZkZhY2VzXSA9IFtcbiAgW1xuICAgIC0xLCAtMSwgLTEsIDEsIC0xLCAtMSwgMSwgMSwgLTEsIC0xLCAxLCAtMSxcbiAgICAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAxLCAxLCAtMSwgMSwgMVxuICBdLFxuICBbXG4gICAgMiwgMSwgMCwgMCwgMywgMixcbiAgICAwLCA0LCA3LCA3LCAzLCAwLFxuICAgIDAsIDEsIDUsIDUsIDQsIDAsXG4gICAgMSwgMiwgNiwgNiwgNSwgMSxcbiAgICAyLCAzLCA3LCA3LCA2LCAyLFxuICAgIDQsIDUsIDYsIDYsIDcsIDRcbiAgXVxuXTtcblxuLyoqXG4gKiBAY2xhc3MgUG9seWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZWxlbWVudGFyeSBnZW9tZXRyeSwgYSBwb2x5aGVkcm9uIGlzIGEgc29saWQgaW4gdGhyZWUgZGltZW5zaW9ucyB3aXRoIGZsYXQgcG9seWdvbmFsIGZhY2VzLCBzdHJhaWdodCBlZGdlcyBhbmQgc2hhcnAgY29ybmVycyBvciB2ZXJ0aWNlcy5cbiAqIDxici8+PGJyLz5cbiAqIGBQb2x5aGVkcm9uYCBjcmVhdGVzIGEgUG9seWhlZHJvbiBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgLlxuICogPGJyLz48YnIvPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIFBvbHloZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFBvbHloZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUG9seWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICBzdGF0aWMgdmVydGljZXNPZkN1YmUgPSB2ZXJ0aWNlc09mQ3ViZTtcbiAgc3RhdGljIGluZGljZXNPZkZhY2VzID0gaW5kaWNlc09mRmFjZXM7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHZlcnRpY2VzT2ZDdWJlOiBbXG4gICAqICAgICAgIC0xLCAtMSwgLTEsIDEsIC0xLCAtMSwgMSwgMSwgLTEsIC0xLCAxLCAtMSxcbiAgICogICAgICAgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMSwgMSwgMSwgLTEsIDEsIDFcbiAgICogICAgIF0sXG4gICAqXG4gICAqICAgICBpbmRpY2VzT2ZGYWNlczogW1xuICAgKiAgICAgICAyLCAxLCAwLCAwLCAzLCAyLFxuICAgKiAgICAgICAwLCA0LCA3LCA3LCAzLCAwLFxuICAgKiAgICAgICAwLCAxLCA1LCA1LCA0LCAwLFxuICAgKiAgICAgICAxLCAyLCA2LCA2LCA1LCAxLFxuICAgKiAgICAgICAyLCAzLCA3LCA3LCA2LCAyLFxuICAgKiAgICAgICA0LCA1LCA2LCA2LCA3LCA0XG4gICAqICAgICBdLFxuICAgKlxuICAgKiAgICAgcmFkaXVzOiA2LFxuICAgKiAgICAgZGV0YWlsOiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHZlcnRpY2VzT2ZDdWJlLFxuICAgICAgaW5kaWNlc09mRmFjZXMsXG4gICAgICByYWRpdXM6IDYsXG4gICAgICBkZXRhaWw6IDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWyd2ZXJ0aWNlc09mQ3ViZScsICdpbmRpY2VzT2ZGYWNlcycsICdyYWRpdXMnLCAnZGV0YWlsJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsndmVydGljZXNPZkN1YmUnLCAnaW5kaWNlc09mRmFjZXMnLCAncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBvbHloZWRyb24uZGVmYXVsdHMsIFBvbHloZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogUG9seWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS52ZXJ0aWNlc09mQ3ViZSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5pbmRpY2VzT2ZGYWNlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQb2x5aGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUmluZ0dlb21ldHJ5LFxuICBSaW5nQnVmZmVyR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFJpbmdcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFJpbmcgY2xhc3MgY3JlYXRlcyBhIGNpcmNsZSBvciBqdXN0IDJEIFRvcnVzLiBEb2VzIG5vdCBzdXBwb3J0IHBoeXNpY3MuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1JpbmdHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUmluZywgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUmluZyh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgaW5uZXJSYWRpdXM6IDUsXG4gKiAgICAgb3V0ZXJSYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgIHNpZGUgVEhSRUUuRG91YmxlU2lkZVxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgOCwgMF0sXG4gKlxuICogICByb3RhdGlvbjoge1xuICogICAgIHg6IE1hdGguUEkvNFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBSaW5nIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBpbm5lclJhZGl1czogMCxcbiAgICogICAgIG91dGVyUmFkaXVzOiA1MCxcbiAgICogICAgIHRoZXRhU2VnbWVudHM6IDgsXG4gICAqICAgICBwaGlTZWdtZW50czogOCxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgaW5uZXJSYWRpdXM6IDAsXG4gICAgICBvdXRlclJhZGl1czogNTAsXG4gICAgICB0aGV0YVNlZ21lbnRzOiA4LFxuICAgICAgcGhpU2VnbWVudHM6IDgsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZyNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdpbm5lclJhZGl1cycsXG4gICAqICAgICAnb3V0ZXJSYWRpdXMnLFxuICAgKiAgICAgJ3RoZXRhU2VnbWVudHMnLFxuICAgKiAgICAgJ3BoaVNlZ21lbnRzJyxcbiAgICogICAgICd0aGV0YVN0YXJ0JyxcbiAgICogICAgICd0aGV0YUxlbmd0aCdcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdpbm5lclJhZGl1cycsXG4gICAgICAnb3V0ZXJSYWRpdXMnLFxuICAgICAgJ3RoZXRhU2VnbWVudHMnLFxuICAgICAgJ3BoaVNlZ21lbnRzJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFJpbmcuZGVmYXVsdHMsIFJpbmcuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmdcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gUmluZ0J1ZmZlckdlb21ldHJ5IDogUmluZ0dlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5pbm5lclJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vdXRlclJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBoaVNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFJpbmdcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBTaGFwZUJ1ZmZlckdlb21ldHJ5LFxuICBTaGFwZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBTaGFwZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU2hhcGUgaXMgYSB1bml2ZXJzYWwgY2xhc3MuIEl0IGFsbG93cyB5b3UgdG8gY3JlYXRlIGRpZmZlcmVudCAyRCBzaGFwZXMgaW4gM0Qgc2NlbmUuPGJyLz5cbiAqIFVuZm9ydHVuYXRlbHksIG5vdCBhbGwgb2YgdGhlbSBzdXBwb3J0IHBoeXNpY3MsIGFuIGFsdGVybmF0aXZlIGlzIHRvIG1ha2UgYSBzaW1pbGFyIDNEIG9iamVjdCBhbmQgc2NhbGUgaXRzIHdpZHRoIGRvd24gdG8gbmVhciB6ZXJvLlxuICogPGJyLz48YnIvPlxuICogYFNoYXBlYCBjb25zaXN0cyBvZiBzaGFwZXMgdGhhdCBhcmUgaW4gaXRzIHNoYXBlcyBwYXJhbWV0ZXIuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1NoYXBlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIHBsYW5lIGxvb2tpbmcgU2hhcGUgZnJvbSBhIFRIUkVFLlNoYXBlLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IHJlY3RXaWR0aCA9IDEwLFxuICogcmVjdExlbmd0aCA9IDU7XG4gKlxuICogY29uc3QgcmVjdFNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gKiByZWN0U2hhcGUubW92ZVRvKDAsMCk7XG4gKiByZWN0U2hhcGUubGluZVRvKDAsIHJlY3RXaWR0aCk7XG4gKiByZWN0U2hhcGUubGluZVRvKHJlY3RMZW5ndGgsIHJlY3RXaWR0aCk7XG4gKiByZWN0U2hhcGUubGluZVRvKHJlY3RMZW5ndGgsIDApO1xuICogcmVjdFNoYXBlLmxpbmVUbygwLCAwKTtcbiAqXG4gKiBjb25zdCBwbGFuZSA9IG5ldyBTaGFwZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgc2hhcGU6IHJlY3RTaGFwZVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTaGFwZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU2hhcGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHNoYXBlczogW11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBzaGFwZXM6IFtdXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU2hhcGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3NoYXBlcyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3NoYXBlcyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNoYXBlLmRlZmF1bHRzLCBTaGFwZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU2hhcGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gU2hhcGVCdWZmZXJHZW9tZXRyeSA6IFNoYXBlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNoYXBlc1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU2hhcGVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBTcGhlcmVCdWZmZXJHZW9tZXRyeSxcbiAgU3BoZXJlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNwaGVyZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU3BoZXJlIGNsYXNzIGlzIHVzZWQgdG8gY3JlYXRlIHNwaGVyZSBvYmplY3RzIGJ5IGl0cyByYWRpdXMgcHJvcGVydHkgYW5kIG90aGVyIHZhbHVlcyB0aGF0IGRldGVybWluZXMgaXRzIGRldGFsaXR5LlxuICogPGJyLz48YnIvPlxuICogSXQgaXMgc2ltaWxhciB0byBUSFJFRS5TcGhlcmVHZW9tZXRyeSwgYnV0IGl0IGFsc28gY29udGFpbnMgYWxsIGBTaGFwZWAgcHJvcGVydGllcywgc3VjaCBhcyBtYXRlcmlhbCwgbWFzcyBhbmQgdmVjdG9ycyBsaWtlIHBvc2l0aW9uIChwb3MpIGFuZCByb3RhdGlvbiAocm90KS5cbiAqIDxici8+PGJyLz5cbiAqIFRoZW4gaXQgY3JlYXRlcyBhbiBgVGhyZWUuanMgbWVzaGAgb3IgYSBgUGh5c2lqcyBtZXNoYCwgdGhhdCBpcyBzaW1pbGFyIHRvIGBUaHJlZS5qcyBtZXNoYCwgYnV0IGl0IGFsc28gdGFrZSBpbnRvIGNvbnNpZGVyYXRpb24gY29sbGlzaW9uIGNhbGN1bGF0aW9ucy5cbiAqIFRoaXMgbWVzaCBpcyBhIGNvbWJpbmF0aW9uIG9mIGBUaHJlZS5qcyBnZW9tZXRyeWAgYW5kIGBQaHlzaWpzIG1hdGVyaWFsYCAoVGhlIHNhbWUgYXMgaW4gdGhyZWUuanMsIGJ1dCB3aXRoIGZyaWN0aW9uIGFuZCByZXN0aXR1dGlvbikuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1NwaGVyZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBTcGhlcmUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFNwaGVyZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDEwMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTcGhlcmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgd2lkdGhTZWdtZW50czogOCxcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiA2XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgd2lkdGhTZWdtZW50czogOCxcbiAgICAgIGhlaWdodFNlZ21lbnRzOiA2XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydyYWRpdXMnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU3BoZXJlLmRlZmF1bHRzLCBTcGhlcmUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBTcGhlcmVCdWZmZXJHZW9tZXRyeSA6IFNwaGVyZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGhTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50c1xuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU3BoZXJlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVGV0cmFoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgVGV0cmFoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVGV0cmFoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhIHRldHJhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiBjb21wb3NlZCBvZiBmb3VyIHRyaWFuZ3VsYXIgZmFjZXMsIHNpeCBzdHJhaWdodCBlZGdlcywgYW5kIGZvdXIgdmVydGV4IGNvcm5lcnMuXG4gKiBUaGUgdGV0cmFoZWRyb24gaXMgdGhlIHNpbXBsZXN0IG9mIGFsbCB0aGUgb3JkaW5hcnkgY29udmV4IHBvbHloZWRyYSBhbmQgdGhlIG9ubHkgb25lIHRoYXQgaGFzIGZld2VyIHRoYW4gNSBmYWNlcy5cbiAqIDxici8+PGJyLz5cbiAqIGBUZXRyYWhlZHJvbmAgY3JlYXRlcyBhIFRldHJhaGVkcm9uIG9iamVjdCBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RldHJhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRldHJhaGVkcm9uLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUZXRyYWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAwLFxuICogICAgIHk6IDEwMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRldHJhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVGV0cmFoZWRyb24uZGVmYXVsdHMsIFRldHJhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IDogVGV0cmFoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVGV0cmFoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBGb250LFxuICBNZXNoLFxuICBUZXh0R2VvbWV0cnksXG4gIEZvbnRMb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRleHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRleHQgY2xhc3MgaXMgbWFkZSBmb3IgY3JlYXRpbmcgM0QgdGV4dCBvYmplY3RzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUZXh0R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIDxici8+PGJyLz5cbiAqIFBoeXNpY3MgdGV4dCBvYmplY3QgY2FuIGJlIGNvbnZleCBvciBjb25jYXZlLiBCeSBkZWZhdWx0IGl0J3MgY29udmV4IGJ1dCB5b3UgY2FuIGFsc28gc3dpdGNoIHRvIGNvbmNhdmUuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUZXh0LCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUZXh0KHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICB0ZXh0OiAnaGVsbG8gd29ybGQnLFxuICogICAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICAgIGZvbnQ6ICdwYXRoL3RvL2ZvbnQudHlwZWZhY2UuanMnLFxuICogICAgICAgc2l6ZTogMjAsXG4gKiAgICAgICBoZWlnaHQ6IDUsXG4gKiAgICAgICBjdXJ2ZVNlZ21lbnRzOiA2XG4gKiAgICAgfVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAtNDAsXG4gKiAgICAgeTogMjAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUZXh0IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXh0I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB0ZXh0OiAnSGVsbG8gV29ybGQhJyxcbiAgICogICAgIGxvYWRlcjogbmV3IEZvbnRMb2FkZXIoKSxcbiAgICpcbiAgICogICAgIHBhcmFtZXRlcnM6IHtcbiAgICogICAgICAgc2l6ZTogMTIsXG4gICAqICAgICAgIGhlaWdodDogNTAsXG4gICAqICAgICAgIGN1cnZlU2VnbWVudHM6IDEyLFxuICAgKiAgICAgICBmb250OiBuZXcgRm9udCgpLFxuICAgKiAgICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICAgKiAgICAgICBiZXZlbFRoaWNrbmVzczogMTAsXG4gICAqICAgICAgIGJldmVsU2l6ZTogOFxuICAgKiAgICAgfVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0ZXh0OiAnSGVsbG8gV29ybGQhJyxcbiAgICAgIGxvYWRlcjogbmV3IEZvbnRMb2FkZXIoKSxcblxuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBzaXplOiAxMixcbiAgICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgICAgY3VydmVTZWdtZW50czogMTIsXG4gICAgICAgIGZvbnQ6IG5ldyBGb250KCksXG4gICAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGJldmVsVGhpY2tuZXNzOiAxMCxcbiAgICAgICAgYmV2ZWxTaXplOiA4XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV4dCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsndGV4dCcsICdsb2FkZXInLCAncGFyYW1ldGVycyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3RleHQnLCAnbG9hZGVyJywgJ3BhcmFtZXRlcnMnXVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRleHQuZGVmYXVsdHMsIFRleHQuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRleHRcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgRm9udExvYWRlci5sb2FkKHBhcmFtcy5nZW9tZXRyeS5wYXJhbWV0ZXJzLmZvbnQsIGZvbnQgPT4ge1xuICAgICAgICBwYXJhbXMuZ2VvbWV0cnkucGFyYW1ldGVycy5mb250ID0gZm9udDtcblxuICAgICAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBuZXcgVGV4dEdlb21ldHJ5KFxuICAgICAgICAgICAgcGFyYW1zLmdlb21ldHJ5LnRleHQsXG4gICAgICAgICAgICBwYXJhbXMuZ2VvbWV0cnkucGFyYW1ldGVyc1xuICAgICAgICAgICksXG5cbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgICBtZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG4gICAgICAgICAgfSkubWVzaFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzdXBlci53YWl0KHByb21pc2UpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVGV4dFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFRvcnVzR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRvcnVzXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUb3J1cyBjbGFzcyBtYWtlcyBhIHRvcnVzIGZpZ3VyZS4gQSBkb251dCBpcyBhIHRvcnVzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3MvaW5kZXguaHRtbCNhcGkvZ2VvbWV0cmllcy9Ub3J1c0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUb3J1cywgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVG9ydXMoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogNSxcbiAqICAgICB0dWJlOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDM1XG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRvcnVzIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1cyNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxMDAsXG4gICAqICAgICB0dWJlOiA0MCxcbiAgICogICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgKiAgICAgdHVidWxhclNlZ21lbnRzOiA2LFxuICAgKiAgICAgYXJjOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEwMCxcbiAgICAgIHR1YmU6IDQwLFxuICAgICAgcmFkaWFsU2VnbWVudHM6IDgsXG4gICAgICB0dWJ1bGFyU2VnbWVudHM6IDYsXG4gICAgICBhcmM6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXMjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICd0dWJlJyxcbiAgICogICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAqICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICogICAgICdhcmMnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1cycsXG4gICAgICAndHViZScsXG4gICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAgICAnYXJjJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVG9ydXMuZGVmYXVsdHMsIFRvcnVzLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgVG9ydXNHZW9tZXRyeShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHViZSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpYWxTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJ1bGFyU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuYXJjXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUb3J1c1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5LFxuICBUb3J1c0tub3RHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVG9ydXNrbm90XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUb3J1c2tub3QgY2xhc3MgbWFrZXMgYSB0b3J1c2tub3QgZmlndXJlLiBJdCdzIGxpa2UgYSBjcm9va2VkIGRvbnV0LCB2ZXJ5IGNyb29rZWQuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RvcnVzS25vdEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUb3J1c2tub3QsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRvcnVza25vdCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOjUsXG4gKiAgICAgdHViZTogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zOiB7XG4gKiAgICAgeTogMTAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRvcnVza25vdCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNrbm90I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEwMCxcbiAgICogICAgIHR1YmU6IDQwLFxuICAgKiAgICAgcmFkaWFsU2VnbWVudHM6IDY0LFxuICAgKiAgICAgdHVidWxhclNlZ21lbnRzOiA4LFxuICAgKiAgICAgcDogMixcbiAgICogICAgIHE6IDNcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxMDAsXG4gICAgICB0dWJlOiA0MCxcbiAgICAgIHJhZGlhbFNlZ21lbnRzOiA2NCxcbiAgICAgIHR1YnVsYXJTZWdtZW50czogOCxcbiAgICAgIHA6IDIsXG4gICAgICBxOiAzXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNrbm90I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAndHViZScsXG4gICAqICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgKiAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAqICAgICAncCcsXG4gICAqICAgICAncSdcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICd0dWJlJyxcbiAgICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICAgICdwJyxcbiAgICAgICdxJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVG9ydXNrbm90LmRlZmF1bHRzLCBUb3J1c2tub3QuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdFxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IEdDb25zdHJ1Y3QgPSBwYXJhbXMuYnVmZmVyID8gVG9ydXNLbm90QnVmZmVyR2VvbWV0cnkgOiBUb3J1c0tub3RHZW9tZXRyeTtcblxuICAgIHJldHVybiBuZXcgR0NvbnN0cnVjdChcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHViZSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpYWxTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJ1bGFyU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5xXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUb3J1c2tub3Rcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBMaW5lQ3VydmUzLFxuICBWZWN0b3IzLFxuICBUdWJlQnVmZmVyR2VvbWV0cnksXG4gIFR1YmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVHViZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVHViZSBjbGFzcyBtYWtlcyBhIHR1YmUgdGhhdCBleHRydWRlcyBhbG9uZyBhIDNkIGN1cnZlLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3MvaW5kZXguaHRtbCNhcGkvZ2VvbWV0cmllcy9UdWJlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFR1YmUgZnJvbSBhIHRocmVlLmpzIEN1cnZlLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IEN1c3RvbVNpbkN1cnZlID0gVEhSRUUuQ3VydmUuY3JlYXRlKFxuICogICBmdW5jdGlvbiAoc2NhbGUpIHsgLy8gY3VzdG9tIGN1cnZlIGNvbnN0cnVjdG9yXG4gKiAgICAgdGhpcy5zY2FsZSA9IChzY2FsZSA9PT0gdW5kZWZpbmVkKSA/IDEgOiBzY2FsZTtcbiAqICAgfSxcbiAqXG4gKiAgIGZ1bmN0aW9uICh0KSB7IC8vIGdldFBvaW50OiB0IGlzIGJldHdlZW4gMC0xXG4gKiAgICAgY29uc3QgdHggPSB0ICogMyAtIDEuNSxcbiAqICAgICB0eSA9IE1hdGguc2luKCAyICogTWF0aC5QSSAqIHQgKSxcbiAqICAgICB0eiA9IDA7XG4gKlxuICogICAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyh0eCwgdHksIHR6KS5tdWx0aXBseVNjYWxhcih0aGlzLnNjYWxlKTtcbiAqICAgfVxuICogKTtcbiAqXG4gKiBjb25zdCBwYXRoID0gbmV3IEN1c3RvbVNpbkN1cnZlKDEwKTtcbiAqXG4gKiBuZXcgVHViZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcGF0aDogcGF0aFxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUdWJlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UdWJlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBwYXRoOiBuZXcgVEhSRUUuTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMSkpLFxuICAgKiAgICAgc2VnbWVudHM6IDIwLFxuICAgKiAgICAgcmFkaXVzOiAyLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDgsXG4gICAqICAgICBjbG9zZWQ6IGZhbHNlXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHBhdGg6IG5ldyBMaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAxKSksXG4gICAgICBzZWdtZW50czogMjAsXG4gICAgICByYWRpdXM6IDIsXG4gICAgICByYWRpdXNTZWdtZW50czogOCxcbiAgICAgIGNsb3NlZDogZmFsc2VcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UdWJlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3BhdGgnLFxuICAgKiAgICAgJ3NlZ21lbnRzJyxcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICogICAgICdjbG9zZWQnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3BhdGgnLFxuICAgICAgJ3NlZ21lbnRzJyxcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdjbG9zZWQnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUdWJlLmRlZmF1bHRzLCBUdWJlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UdWJlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBUdWJlQnVmZmVyR2VvbWV0cnkgOiBUdWJlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBhdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmNsb3NlZFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVHViZVxufTtcbiIsImltcG9ydCB7T2JqZWN0M0R9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEdyb3VwXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTb21ldGltZXMgeW91IG5lZWQgdG8gbWFrZSBncm91cHMgb2Ygb2JqZWN0cyAoaXQncyBub3QgY29udmVuaWVudGx5IHRvIGFwcGx5IHRyYW5zZm9ybXMgdG8gZWFjaCBvYmplY3Qgd2hlbiBjYW4gbWFrZSBqdXN0IG9uZSB0byBhIGdyb3VwKS48YnIvPlxuICogSW4gVGhyZWUuanMgeW91IG1ha2UgaXQgdXNpbmcgYFRIUkVFLk9iamVjdDNEYCBhbmQgaXQncyBjaGlsZHJlbi4gPGJyLz48YnIvPlxuICogSW4gd2hzLmpzIHdlIGhhdmUgYEdyb3VwYFxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+QXBwcm9hY2ggMiAtIEFkZGluZyBvYmplY3RzIHRvIGFuIGVtcHR5IGdyb3VwPC9jYXB0aW9uPlxuICogY29uc3Qgc3BoZXJlID0gbmV3IFNwaGVyZSgpO1xuICogY29uc3QgYm94ID0gbmV3IEJveCgpO1xuICogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAqXG4gKiBzcGhlcmUuYWRkVG8oZ3JvdXApO1xuICogYm94LmFkZFRvKGdyb3VwKTtcbiogQGV4YW1wbGUgPGNhcHRpb24+QXBwcm9hY2ggMiAtIE1ha2luZyBhIGdyb3VwIGZyb20gb2JqZWN0czwvY2FwdGlvbj5cbiAqIGNvbnN0IHNwaGVyZSA9IG5ldyBTcGhlcmUoKTtcbiAqIGNvbnN0IGJveCA9IG5ldyBCb3goKTtcbiAqIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKGJveCwgc3BoZXJlKTtcbiAqIC8vIE9SOiBjb25zdCBncm91cCA9IG5ldyBHcm91cChbYm94LCBzcGhlcmVdKTtcbiAqL1xuY2xhc3MgR3JvdXAgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoLi4ub2JqZWN0cykge1xuICAgIHN1cGVyKHt9KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgb2JqID0gb2JqZWN0c1tpXTtcblxuICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIENvbXBvbmVudCkgb2JqLmFkZFRvKHRoaXMpO1xuICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0M0QpIHRoaXMubmF0aXZlLmFkZChvYmopO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkKCkge1xuICAgIHJldHVybiBuZXcgT2JqZWN0M0QoKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBHcm91cFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvbWVzaGVzICovXG5leHBvcnQgKiBmcm9tICcuL0JveCc7XG5leHBvcnQgKiBmcm9tICcuL0NpcmNsZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9DeWxpbmRlcic7XG5leHBvcnQgKiBmcm9tICcuL0RvZGVjYWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL0V4dHJ1ZGUnO1xuZXhwb3J0ICogZnJvbSAnLi9JY29zYWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL0xhdGhlJztcbmV4cG9ydCAqIGZyb20gJy4vTGluZSc7XG5leHBvcnQgKiBmcm9tICcuL0ltcG9ydGVyJztcbmV4cG9ydCAqIGZyb20gJy4vT2N0YWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL1BhcmFtZXRyaWMnO1xuZXhwb3J0ICogZnJvbSAnLi9QbGFuZSc7XG5leHBvcnQgKiBmcm9tICcuL1BvbHloZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9SaW5nJztcbmV4cG9ydCAqIGZyb20gJy4vU2hhcGUnO1xuZXhwb3J0ICogZnJvbSAnLi9TcGhlcmUnO1xuZXhwb3J0ICogZnJvbSAnLi9UZXRyYWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL1RleHQnO1xuZXhwb3J0ICogZnJvbSAnLi9Ub3J1cyc7XG5leHBvcnQgKiBmcm9tICcuL1RvcnVza25vdCc7XG5leHBvcnQgKiBmcm9tICcuL1R1YmUnO1xuZXhwb3J0ICogZnJvbSAnLi9Hcm91cCc7XG4iLCIvKipcbiAqIEBjbGFzcyBFbGVtZW50TW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGFpbmVyPWRvY3VtZW50LmJvZHldIGNvbnRhaW5lciBpcyB0aGUgRE9NIG9iamVjdCB0byB3aGljaCBhcHBsaWNhdGlvbidzIGNhbnZhcyB3aWxsIGJlIGFkZGVkIHRvLlxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gZWxlbWVudCBtb2R1bGUsIHBhc3NpbmcgaXQgdG8gdGhlIEFwcDwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICBuZXcgRWxlbWVudE1vZHVsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEVsZW1lbnRNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXIgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgaWYgKGNvbnRhaW5lci5jb250YWluZXIpIHtcbiAgICAgIGNvbnNvbGUud2FybignRWxlbWVudE1vZHVsZSBub3cgYWNjZXB0cyBvbmx5IGFyZ3VtZW50IHdoaWNoIGlzIGEgRE9NIG9iamVjdCwgbm90IGEgcGFyYW1zIG9iamVjdC4nKTtcbiAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyLmNvbnRhaW5lcjtcbiAgICB9IGVsc2UgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNyZWF0ZUVsZW1lbnRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgY2FudmFzIGVsZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBjcmVhdGVFbGVtZW50KCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAnd2hzLWFwcCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gJ2luaGVyaXQnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnaW5oZXJpdCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdlbGVtZW50JywgdGhpcy5lbGVtZW50KTtcbiAgICBtYW5hZ2VyLnNldCgnY29udGFpbmVyJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBXZWJHTFJlbmRlcmVyLFxuICBWZWN0b3IyXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG4vKipcbiAqIEBjbGFzcyBSZW5kZXJpbmdNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSByZW5kZXJpbmcgbW9kdWxlIGFuZCBwYXNzaW5nIGl0IHRvIEFwcCdzIG1vZHVsZXM8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgbmV3IEVsZW1lbnRNb2R1bGUoKSxcbiAqICAgbmV3IFNjZW5lTW9kdWxlKCksXG4gKiAgIG5ldyBDYW1lcmFNb2R1bGUoe1xuICogICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCA2LCAxOCksXG4gKiAgICAgZmFyOiAxMDAwMFxuICogICB9KSxcbiAqICAgbmV3IFJlbmRlcmluZ01vZHVsZSh7XG4gKiAgICAgYmdDb2xvcjogMHgxNjIxMjksXG4gKlxuICogICAgIHJlbmRlcmVyOiB7XG4gKiAgICAgICBhbnRpYWxpYXM6IHRydWUsXG4gKiAgICAgICBzaGFkb3dtYXA6IHtcbiAqICAgICAgICAgdHlwZTogVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICogICAgICAgfVxuICogICAgIH1cbiAqICAgfSwge3NoYWRvdzogdHJ1ZX0pXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlcmluZ01vZHVsZSB7XG4gIHN0YXRpYyBhZGRpdGlvbmFsID0ge1xuICAgIHNoYWRvdyhyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGVuYWJsZWQgPSB0cnVlO1xuXG4gIGRlZmVyID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIHtzaGFkb3c6IGlzU2hhZG93fSA9IHtzaGFkb3c6IGZhbHNlfSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcblxuICAgICAgcmVzb2x1dGlvbjogbmV3IFZlY3RvcjIoMSwgMSksXG4gICAgICBwaXhlbFJhdGlvOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyxcblxuICAgICAgYmdDb2xvcjogMHgwMDAwMDAsXG4gICAgICBiZ09wYWNpdHk6IDEsXG5cbiAgICAgIHJlbmRlcmVyOiB7fVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICBjb25zdCB7XG4gICAgICBiZ0NvbG9yLFxuICAgICAgYmdPcGFjaXR5LFxuICAgICAgcmVuZGVyZXIsXG4gICAgICBwaXhlbFJhdGlvLFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICByZXNvbHV0aW9uXG4gICAgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHJlbmRlcmVyKTtcbiAgICB0aGlzLmVmZmVjdHMgPSBbXTtcbiAgICB0aGlzLmFwcGx5QWRkaXRpb25hbCgnc2hhZG93JywgaXNTaGFkb3cpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKFxuICAgICAgYmdDb2xvcixcbiAgICAgIGJnT3BhY2l0eVxuICAgICk7XG5cbiAgICBpZiAocGl4ZWxSYXRpbykgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHBpeGVsUmF0aW8pO1xuXG4gICAgdGhpcy5zZXRTaXplKFxuICAgICAgTnVtYmVyKHdpZHRoICogcmVzb2x1dGlvbi54KS50b0ZpeGVkKCksXG4gICAgICBOdW1iZXIoaGVpZ2h0ICogcmVzb2x1dGlvbi55KS50b0ZpeGVkKClcbiAgICApO1xuICB9XG5cbiAgYXBwbHlBZGRpdGlvbmFsKG5hbWUsIGlzQXBwbGllZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFpc0FwcGxpZWQpIHJldHVybjtcbiAgICBSZW5kZXJpbmdNb2R1bGUuYWRkaXRpb25hbFtuYW1lXS5hcHBseSh0aGlzLCBbdGhpcy5yZW5kZXJlcl0pO1xuICB9XG5cbiAgaW50ZWdyYXRlUmVuZGVyZXIoZWxlbWVudCwgc2NlbmUsIGNhbWVyYSkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICB0aGlzLnJlbmRlckxvb3AgPSBuZXcgTG9vcCgoKSA9PiB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSkpO1xuICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gdGhpcy5yZW5kZXJMb29wO1xuICB9XG5cbiAgZWZmZWN0KGVmZmVjdCwgY2IpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJMb29wLnN0b3AoKTtcblxuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSgpO1xuICAgICAgZWZmZWN0LnNldFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBsb29wID0gbmV3IExvb3AoY2IgPyBjYiA6ICgpID0+IHtcbiAgICAgICAgZWZmZWN0LnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5lZmZlY3RzLnB1c2gobG9vcCk7XG4gICAgICBpZiAodGhpcy5lbmFibGVkKSBsb29wLnN0YXJ0KHRoaXMuYXBwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFNpemVcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSByZW5kZXIgdGFyZ2V0IHdpZHRoIGFuZCBoZWlnaHQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVuZGVyaW5nTW9kdWxlXG4gICAqL1xuICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBpZiAodGhpcy5yZW5kZXJlcikgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgYXR0YWNoVG9DYW52YXMoZWxlbWVudCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcblxuICAgIC8vIGF0dGFjaCB0byBuZXcgcGFyZW50IHdvcmxkIGRvbVxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZW5kZXJMb29wLnN0b3AoKTtcbiAgICB0aGlzLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RvcCgpKTtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5yZW5kZXJMb29wLnN0YXJ0KCk7XG4gICAgdGhpcy5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0YXJ0KCkpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3JlbmRlcmluZycpO1xuICAgIG1hbmFnZXIuc2V0KCdyZW5kZXJlcicsIHRoaXMucmVuZGVyZXIpO1xuXG4gICAgdGhpcy5hcHAgPSBtYW5hZ2VyLmhhbmRsZXI7XG5cbiAgICB0aGlzLnJlbmRlckxvb3AgPSB0aGlzLmludGVncmF0ZVJlbmRlcmVyKFxuICAgICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKSxcbiAgICAgIG1hbmFnZXIuZ2V0KCdzY2VuZScpLFxuICAgICAgbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZVxuICAgICk7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICBlbGVtZW50OiBlbGVtZW50ID0+IHtcbiAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50KTtcbiAgICAgIH0sXG4gICAgICBzY2VuZTogc2NlbmUgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICB9LFxuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYS5uYXRpdmU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc29sdmUoKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5yZW5kZXJMb29wLnN0YXJ0KHRoaXMpO1xuICAgIHNlbGYuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdGFydCh0aGlzKSk7XG4gIH1cblxuICBkaXNwb3NlKHNlbGYpIHtcbiAgICBzZWxmLnJlbmRlckxvb3Auc3RvcCh0aGlzKTtcbiAgICBzZWxmLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RvcCh0aGlzKSk7XG4gICAgc2VsZi5yZW5kZXJlci5mb3JjZUNvbnRleHRMb3NzKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFNjZW5lXG59IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgU2NlbmVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtCb29sZWFufSBbd2lsbFNjZW5lQmVSZXBsYWNlZD1mYWxzZV0gd2lsbFNjZW5lQmVSZXBsYWNlZCBzaG91bGQgYmUgdHJ1ZSBvbmx5IGlmIHlvdSBhcmUgZ29pbmcgdG8gb3ZlcndyaXRlIHNjZW5lIGRlcGVuZGVuY3kgZXZlbiB3aXRob3V0IHRoZSB1c2Ugb2YgZGVmYXVsdCBvbmUuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2VuZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHdpbGxTY2VuZUJlUmVwbGFjZWQgPSBmYWxzZSkge1xuICAgIHRoaXMuc2NlbmUgPSB3aWxsU2NlbmVCZVJlcGxhY2VkID8gbnVsbCA6IG5ldyBTY2VuZSgpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ3NjZW5lJywgdGhpcy5zY2VuZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcblxuICAgIHRoaXMuYWRkID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG9iamVjdC5kZWZlcigoKSA9PiB7XG4gICAgICAgICAgY29uc3Qge25hdGl2ZX0gPSBvYmplY3Q7XG4gICAgICAgICAgaWYgKCFuYXRpdmUpIHJlamVjdCgpO1xuXG4gICAgICAgICAgY29uc3QgYWRkUHJvbWlzZSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe29uQWRkOiBvYmplY3R9KS5vbkFkZDtcblxuICAgICAgICAgIGNvbnN0IHJlc29sdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5zY2VuZS5hZGQobmF0aXZlKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICByZXNvbHZlKG9iamVjdCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChhZGRQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSlcbiAgICAgICAgICAgIGFkZFByb21pc2UudGhlbihyZXNvbHZlcik7XG4gICAgICAgICAgZWxzZSByZXNvbHZlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xuICAgICAgc2VsZi5zY2VuZS5yZW1vdmUob2JqZWN0Lm5hdGl2ZSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0U2NlbmUgPSBmdW5jdGlvbiAoc2NlbmUpIHtcbiAgICAgIHNlbGYuc2NlbmUgPSBzY2VuZTtcbiAgICAgIHRoaXMubWFuYWdlci5zZXQoJ3NjZW5lJywgc2NlbmUpO1xuICAgIH07XG4gIH1cbn1cbiIsIi8vIGltcG9ydCB7YWRkUmVzaXplTGlzdGVuZXJ9IGZyb20gJ2RldGVjdC1lbGVtZW50LXJlc2l6ZSc7XG5cbi8qKlxuICogQGNsYXNzIFJlc2l6ZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17YXV0bzogdHJ1ZX1dIC0gSWYgYXV0byBpcyBzZXQgdG8gdHJ1ZSAtIHJlc2l6ZSB3aWxsIGJlIHRyaWdnZXJlZCB3aGVuIGNvbnRhaW5lciByZXNpemVzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNpemVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhdXRvOiB0cnVlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzID0gW3RoaXMuc2V0U2l6ZS5iaW5kKHRoaXMpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gc2V0U2l6ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcHJvdmlkZWQgd2lkdGggJiBoZWlnaHQgdG8gdGhlIHJlbmRlcmVyIG9iamVjdC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aD0xXSAtIFRoZSBwcm9taXNlIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHRvIGEgcXVldWUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0PTFdIC0gdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBzZXRTaXplKHdpZHRoID0gMSwgaGVpZ2h0ID0gMSkge1xuICAgIHRoaXMuY2FtZXJhLm5hdGl2ZS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICB0aGlzLmNhbWVyYS5uYXRpdmUudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyaW5nKSB0aGlzLnJlbmRlcmluZy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdHJpZ2dlclxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFRyaWdnZXJzIHJlc2l6ZSB3aGVuIGNhbGxlZC4gd2lkdGggJiBoZWlnaHQgYXJlIGRldGVybWluZWQgYXV0b21hdGljYWxseVxuICAgKiBUaGlzIGludm9rZXMgZWFjaCBjYWxsYmFja3Mgd2l0aCB0aGUgbmV3IHdpZHRoIGFuZCBoZWlnaHQgYXMgcGFyYW1zXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICB0cmlnZ2VyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBvZmZzZXRXaWR0aCxcbiAgICAgICAgb2Zmc2V0SGVpZ2h0XG4gICAgICB9LFxuICAgICAgcmVzb2x1dGlvblxuICAgIH0gPSB0aGlzO1xuXG4gICAgY29uc3Qgd2lkdGggPSBOdW1iZXIob2Zmc2V0V2lkdGggKiByZXNvbHV0aW9uLngpLnRvRml4ZWQoKTtcbiAgICBjb25zdCBoZWlnaHQgPSBOdW1iZXIob2Zmc2V0SGVpZ2h0ICogcmVzb2x1dGlvbi55KS50b0ZpeGVkKCk7XG5cbiAgICB0aGlzLmNhbGxiYWNrcy5mb3JFYWNoKGNiID0+IHtcbiAgICAgIGNiKHdpZHRoLCBoZWlnaHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkQXV0b3Jlc2l6ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgbW9kdWxlIHRvIGF1dG9yZXNpemUsIHRoaXMgYWRkcyBhbiBldmVudCBsaXN0ZW5lIG9uIHdpbmRvdyByZXNpemUgdG8gdHJpZ2dlciB0aGUgcmVzaXplXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBhZGRBdXRvcmVzaXplKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5nZXRDb250YWluZXIoKTtcbiAgICB0aGlzLnJlc29sdXRpb24gPSB0aGlzLmdldFJlc29sdXRpb24oKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5hdXRvKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy50cmlnZ2VyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkQ2FsbGJhY2tcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgY2FsbCBiYWNrIGZ1bmN0aW9uIHRvIHRoZSBleGlzdGluZyBjYWxsYmFja3MgbGlzdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBhZGRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGFkZENhbGxiYWNrKGZ1bmMpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGZ1bmMpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3Jlc2l6ZScpO1xuXG4gICAgdGhpcy5yZW5kZXJpbmcgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHRoaXMuZ2V0UmVzb2x1dGlvbiA9ICgpID0+IG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5wYXJhbXMucmVzb2x1dGlvbjtcbiAgICB0aGlzLmdldENvbnRhaW5lciA9ICgpID0+IG1hbmFnZXIuZ2V0KCdjb250YWluZXInKTtcblxuICAgIHRoaXMuYWRkQXV0b3Jlc2l6ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXYwO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYxO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYyO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYzO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgdG9wIGxlZnQgdGV4ZWwuXFxyXFxuXFx0dmVjNCBzdW0gPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjApO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSB0b3AgcmlnaHQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2MSk7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIGJvdHRvbSByaWdodCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYyKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgYm90dG9tIGxlZnQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2Myk7XFxyXFxuXFxyXFxuXFx0Ly8gQ29tcHV0ZSB0aGUgYXZlcmFnZS5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBzdW0gKiAwLjI1O1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ1bmlmb3JtIHZlYzIgdGV4ZWxTaXplO1xcclxcbnVuaWZvcm0gdmVjMiBoYWxmVGV4ZWxTaXplO1xcclxcbnVuaWZvcm0gZmxvYXQga2VybmVsO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXYwO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYxO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYyO1xcclxcbnZhcnlpbmcgdmVjMiB2VXYzO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGRVdiA9ICh0ZXhlbFNpemUgKiB2ZWMyKGtlcm5lbCkpICsgaGFsZlRleGVsU2l6ZTtcXHJcXG5cXHJcXG5cXHR2VXYwID0gdmVjMih1di54IC0gZFV2LngsIHV2LnkgKyBkVXYueSk7XFxyXFxuXFx0dlV2MSA9IHZlYzIodXYueCArIGRVdi54LCB1di55ICsgZFV2LnkpO1xcclxcblxcdHZVdjIgPSB2ZWMyKHV2LnggKyBkVXYueCwgdXYueSAtIGRVdi55KTtcXHJcXG5cXHR2VXYzID0gdmVjMih1di54IC0gZFV2LngsIHV2LnkgLSBkVXYueSk7XFxyXFxuXFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQW4gb3B0aW1pc2VkIGNvbnZvbHV0aW9uIHNoYWRlciBtYXRlcmlhbC5cclxuICpcclxuICogQmFzZWQgb24gdGhlIEdEQzIwMDMgUHJlc2VudGF0aW9uIGJ5IE1hc2FraSBLYXdhc2UsIEJ1bmthc2hhIEdhbWVzOlxyXG4gKiAgRnJhbWUgQnVmZmVyIFBvc3Rwcm9jZXNzaW5nIEVmZmVjdHMgaW4gRE9VQkxFLVMuVC5FLkEuTCAoV3JlY2tsZXNzKVxyXG4gKiBhbmQgYW4gYXJ0aWNsZSBieSBGaWxpcCBTdHJ1Z2FyLCBJbnRlbDpcclxuICogIEFuIGludmVzdGlnYXRpb24gb2YgZmFzdCByZWFsLXRpbWUgR1BVLWJhc2VkIGltYWdlIGJsdXIgYWxnb3JpdGhtc1xyXG4gKlxyXG4gKiBGdXJ0aGVyIG1vZGlmaWVkIGFjY29yZGluZyB0byBBcHBsZSdzXHJcbiAqIFtCZXN0IFByYWN0aWNlcyBmb3IgU2hhZGVyc10oaHR0cHM6Ly9nb28uZ2wvbG1Sb001KS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29udm9sdXRpb25NYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjb252b2x1dGlvbiBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7VmVjdG9yMn0gW3RleGVsU2l6ZV0gLSBUaGUgYWJzb2x1dGUgc2NyZWVuIHRleGVsIHNpemUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHRleGVsU2l6ZSA9IG5ldyBWZWN0b3IyKCkpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkNvbnZvbHV0aW9uTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0ZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cdFx0XHRcdGhhbGZUZXhlbFNpemU6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKCkpLFxyXG5cdFx0XHRcdGtlcm5lbDogbmV3IFVuaWZvcm0oMC4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuc2V0VGV4ZWxTaXplKHRleGVsU2l6ZS54LCB0ZXhlbFNpemUueSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY3VycmVudCBrZXJuZWwgc2l6ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7S2VybmVsU2l6ZX1cclxuXHRcdCAqIEBkZWZhdWx0IEtlcm5lbFNpemUuTEFSR0VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMua2VybmVsU2l6ZSA9IEtlcm5lbFNpemUuTEFSR0U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUga2VybmVsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7RmxvYXQzMkFycmF5fSBUaGUga2VybmVsLlxyXG5cdCAqL1xyXG5cclxuXHRnZXRLZXJuZWwoKSB7IHJldHVybiBrZXJuZWxQcmVzZXRzW3RoaXMua2VybmVsU2l6ZV07IH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgdGV4ZWwgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gVGhlIHRleGVsIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gVGhlIHRleGVsIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0VGV4ZWxTaXplKHgsIHkpIHtcclxuXHJcblx0XHR0aGlzLnVuaWZvcm1zLnRleGVsU2l6ZS52YWx1ZS5zZXQoeCwgeSk7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmhhbGZUZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpLm11bHRpcGx5U2NhbGFyKDAuNSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgS2F3YXNlIGJsdXIga2VybmVsIHByZXNldHMuXHJcbiAqXHJcbiAqIEB0eXBlIHtGbG9hdDMyQXJyYXlbXX1cclxuICogQHByaXZhdGVcclxuICovXHJcblxyXG5jb25zdCBrZXJuZWxQcmVzZXRzID0gW1xyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDEuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAxLjAsIDIuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDIuMCwgMy4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMy4wLCA0LjAsIDQuMCwgNS4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMy4wLCA0LjAsIDUuMCwgNy4wLCA4LjAsIDkuMCwgMTAuMF0pXHJcbl07XHJcblxyXG4vKipcclxuICogQSBrZXJuZWwgc2l6ZSBlbnVtZXJhdGlvbi5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFZFUllfU01BTEwgLSBBIHZlcnkgc21hbGwga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDd4NyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFNNQUxMIC0gQSBzbWFsbCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMTV4MTUgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBNRURJVU0gLSBBIG1lZGl1bSBzaXplZCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMjN4MjMgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMQVJHRSAtIEEgbGFyZ2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDM1eDM1IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gVkVSWV9MQVJHRSAtIEEgdmVyeSBsYXJnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgNjN4NjMgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBIVUdFIC0gQSBodWdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAxMjd4MTI3IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBLZXJuZWxTaXplID0ge1xyXG5cclxuXHRWRVJZX1NNQUxMOiAwLFxyXG5cdFNNQUxMOiAxLFxyXG5cdE1FRElVTTogMixcclxuXHRMQVJHRTogMyxcclxuXHRWRVJZX0xBUkdFOiA0LFxyXG5cdEhVR0U6IDVcclxuXHJcbn07XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBmbG9hdCBvcGFjaXR5O1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzQgdGV4ZWwgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gb3BhY2l0eSAqIHRleGVsO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIHNpbXBsZSBjb3B5IHNoYWRlciBtYXRlcmlhbC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29weU1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNvcHkgbWF0ZXJpYWwuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQ29weU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0b3BhY2l0eTogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hhZGVyIG1hdGVyaWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwb3N0IHByb2Nlc3NpbmcgcGFzc2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL21hdGVyaWFsc1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsIH0gZnJvbSBcIi4vYWRhcHRpdmUtbHVtaW5vc2l0eS5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaE1hdGVyaWFsIH0gZnJvbSBcIi4vYm9rZWguanNcIjtcclxuZXhwb3J0IHsgQm9rZWgyTWF0ZXJpYWwgfSBmcm9tIFwiLi9ib2tlaDIuanNcIjtcclxuZXhwb3J0IHsgQ29tYmluZU1hdGVyaWFsIH0gZnJvbSBcIi4vY29tYmluZS5qc1wiO1xyXG5leHBvcnQgeyBDb252b2x1dGlvbk1hdGVyaWFsLCBLZXJuZWxTaXplIH0gZnJvbSBcIi4vY29udm9sdXRpb24uanNcIjtcclxuZXhwb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4vY29weS5qc1wiO1xyXG5leHBvcnQgeyBEZXB0aE1hdGVyaWFsIH0gZnJvbSBcIi4vZGVwdGguanNcIjtcclxuZXhwb3J0IHsgRG90U2NyZWVuTWF0ZXJpYWwgfSBmcm9tIFwiLi9kb3Qtc2NyZWVuLmpzXCI7XHJcbmV4cG9ydCB7IEZpbG1NYXRlcmlhbCB9IGZyb20gXCIuL2ZpbG0uanNcIjtcclxuZXhwb3J0IHsgR2xpdGNoTWF0ZXJpYWwgfSBmcm9tIFwiLi9nbGl0Y2guanNcIjtcclxuZXhwb3J0IHsgR29kUmF5c01hdGVyaWFsIH0gZnJvbSBcIi4vZ29kLXJheXMuanNcIjtcclxuZXhwb3J0IHsgTHVtaW5vc2l0eU1hdGVyaWFsIH0gZnJvbSBcIi4vbHVtaW5vc2l0eS5qc1wiO1xyXG5leHBvcnQgeyBQaXhlbGF0aW9uTWF0ZXJpYWwgfSBmcm9tIFwiLi9waXhlbGF0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IFNob2NrV2F2ZU1hdGVyaWFsIH0gZnJvbSBcIi4vc2hvY2std2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTTUFBQmxlbmRNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtYmxlbmQuanNcIjtcclxuZXhwb3J0IHsgU01BQUNvbG9yRWRnZXNNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtY29sb3ItZWRnZXMuanNcIjtcclxuZXhwb3J0IHsgU01BQVdlaWdodHNNYXRlcmlhbCB9IGZyb20gXCIuL3NtYWEtd2VpZ2h0cy5qc1wiO1xyXG5leHBvcnQgeyBUb25lTWFwcGluZ01hdGVyaWFsIH0gZnJvbSBcIi4vdG9uZS1tYXBwaW5nLmpzXCI7XHJcbiIsImltcG9ydCB7IFNjZW5lLCBNZXNoLCBPcnRob2dyYXBoaWNDYW1lcmEsIFBsYW5lQnVmZmVyR2VvbWV0cnkgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBhYnN0cmFjdCBwYXNzLlxyXG4gKlxyXG4gKiBQYXNzZXMgdGhhdCBkbyBub3QgcmVseSBvbiB0aGUgZGVwdGggYnVmZmVyIHNob3VsZCBleHBsaWNpdGx5IGRpc2FibGUgdGhlXHJcbiAqIGRlcHRoIHRlc3QgYW5kIGRlcHRoIHdyaXRlIGluIHRoZWlyIHJlc3BlY3RpdmUgc2hhZGVyIG1hdGVyaWFscy5cclxuICpcclxuICogVGhpcyBjbGFzcyBpbXBsZW1lbnRzIGEge0BsaW5rIFBhc3MjZGlzcG9zZX0gbWV0aG9kIHRoYXQgZnJlZXMgbWVtb3J5IG9uXHJcbiAqIGRlbWFuZC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IFtzY2VuZV0gLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBbY2FtZXJhXSAtIFRoZSBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtNZXNofSBbcXVhZF0gLSBBIHF1YWQgdGhhdCBmaWxscyB0aGUgc2NyZWVuIHRvIHJlbmRlciAyRCBmaWx0ZXIgZWZmZWN0cy4gU2V0IHRoaXMgdG8gbnVsbCwgaWYgeW91IGRvbid0IG5lZWQgaXQgKHNlZSB7QGxpbmsgUmVuZGVyUGFzc30pLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHNjZW5lID0gbmV3IFNjZW5lKCksXHJcblx0XHRjYW1lcmEgPSBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAxLCAtMSwgMCwgMSksXHJcblx0XHRxdWFkID0gbmV3IE1lc2gobmV3IFBsYW5lQnVmZmVyR2VvbWV0cnkoMiwgMiksIG51bGwpXHJcblx0KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2NlbmV9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgU2NlbmUoKVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGNhbWVyYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q2FtZXJhfVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgMSwgLTEsIDAsIDEpXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcXVhZCBtZXNoIHRoYXQgZmlsbHMgdGhlIHNjcmVlbi5cclxuXHRcdCAqXHJcblx0XHQgKiBBc3NpZ24geW91ciBzaGFkZXIgbWF0ZXJpYWwgdG8gdGhpcyBtZXNoIVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtNZXNofVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IE1lc2gobmV3IFBsYW5lQnVmZmVyR2VvbWV0cnkoMiwgMiksIG51bGwpXHJcblx0XHQgKiBAZXhhbXBsZSB0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm15TWF0ZXJpYWw7XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnF1YWQgPSBxdWFkO1xyXG5cclxuXHRcdGlmKHRoaXMucXVhZCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5xdWFkLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmKHRoaXMuc2NlbmUgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zY2VuZS5hZGQodGhpcy5xdWFkKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycyBzaG91bGQgYmUgc3dhcHBlZCBhZnRlciB0aGlzXHJcblx0XHQgKiBwYXNzIGhhcyBmaW5pc2hlZCByZW5kZXJpbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogU2V0IHRoaXMgdG8gdHJ1ZSBpZiB0aGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyIHNvIHRoYXQgYVxyXG5cdFx0ICogZm9sbG93aW5nIHBhc3MgY2FuIGZpbmQgdGhlIHJlc3VsdCBpbiB0aGUgcmVhZCBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVuYWJsZWQgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW5kZXIgdG8gc2NyZWVuIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUb1NjcmVlbiA9IGZhbHNlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIFRoaXMgaXMgYW4gYWJzdHJhY3QgbWV0aG9kIHRoYXQgbXVzdCBiZSBvdmVycmlkZGVuLlxyXG5cdCAqXHJcblx0ICogQGFic3RyYWN0XHJcblx0ICogQHRocm93cyB7RXJyb3J9IEFuIGVycm9yIGlzIHRocm93biBpZiB0aGUgbWV0aG9kIGlzIG5vdCBvdmVycmlkZGVuLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIEEgcmVhZCBidWZmZXIuIENvbnRhaW5zIHRoZSByZXN1bHQgb2YgdGhlIHByZXZpb3VzIHBhc3MuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBBIHdyaXRlIGJ1ZmZlci4gTm9ybWFsbHkgdXNlZCBhcyB0aGUgcmVuZGVyIHRhcmdldCB3aGVuIHRoZSByZWFkIGJ1ZmZlciBpcyB1c2VkIGFzIGlucHV0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsdGFdIC0gVGhlIGRlbHRhIHRpbWUuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbbWFza0FjdGl2ZV0gLSBJbmRpY2F0ZXMgd2hldGhlciBhIHN0ZW5jaWwgdGVzdCBtYXNrIGlzIGFjdGl2ZSBvciBub3QuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlKSB7XHJcblxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiUmVuZGVyIG1ldGhvZCBub3QgaW1wbGVtZW50ZWQhXCIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIFlvdSBtYXkgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4gY2FzZSB5b3Ugd2FudCB0byBiZSBpbmZvcm1lZCBhYm91dCB0aGUgbWFpblxyXG5cdCAqIHJlbmRlciBzaXplLlxyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2QgYmVmb3JlIHRoaXMgcGFzcyBpc1xyXG5cdCAqIGluaXRpYWxpc2VkIGFuZCBldmVyeSB0aW1lIGl0cyBvd24gc2l6ZSBpcyB1cGRhdGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHJlbmRlcmVyJ3Mgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSByZW5kZXJlcidzIGhlaWdodC5cclxuXHQgKiBAZXhhbXBsZSB0aGlzLm15UmVuZGVyVGFyZ2V0LnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge31cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgaW5pdGlhbGlzYXRpb24gdGFza3MuXHJcblx0ICpcclxuXHQgKiBCeSBvdmVycmlkaW5nIHRoaXMgbWV0aG9kIHlvdSBnYWluIGFjY2VzcyB0byB0aGUgcmVuZGVyZXIuIFlvdSdsbCBhbHNvIGJlXHJcblx0ICogYWJsZSB0byBjb25maWd1cmUgeW91ciBjdXN0b20gcmVuZGVyIHRhcmdldHMgdG8gdXNlIHRoZSBhcHByb3ByaWF0ZSBmb3JtYXRcclxuXHQgKiAoUkdCIG9yIFJHQkEpLlxyXG5cdCAqXHJcblx0ICogVGhlIHByb3ZpZGVkIHJlbmRlcmVyIGNhbiBiZSB1c2VkIHRvIHdhcm0gdXAgc3BlY2lhbCBvZmYtc2NyZWVuIHJlbmRlclxyXG5cdCAqIHRhcmdldHMgYnkgcGVyZm9ybWluZyBhIHByZWxpbWluYXJ5IHJlbmRlciBvcGVyYXRpb24uXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIHRoaXMgcGFzcyBpcyBhZGRlZCB0byBpdHNcclxuXHQgKiBxdWV1ZS5cclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgaW5pdGlhbGlzZVxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBhbHBoYSAtIFdoZXRoZXIgdGhlIHJlbmRlcmVyIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwgb3Igbm90LlxyXG5cdCAqIEBleGFtcGxlIGlmKCFhbHBoYSkgeyB0aGlzLm15UmVuZGVyVGFyZ2V0LnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0OyB9XHJcblx0ICovXHJcblxyXG5cdGluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtcyBhIHNoYWxsb3cgc2VhcmNoIGZvciBwcm9wZXJ0aWVzIHRoYXQgZGVmaW5lIGEgZGlzcG9zZSBtZXRob2QgYW5kXHJcblx0ICogZGVsZXRlcyB0aGVtLiBUaGUgcGFzcyB3aWxsIGJlIGlub3BlcmF0aXZlIGFmdGVyIHRoaXMgbWV0aG9kIHdhcyBjYWxsZWQhXHJcblx0ICpcclxuXHQgKiBEaXNwb3NhYmxlIG9iamVjdHM6XHJcblx0ICogIC0gcmVuZGVyIHRhcmdldHNcclxuXHQgKiAgLSBtYXRlcmlhbHNcclxuXHQgKiAgLSB0ZXh0dXJlc1xyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiBpdCBpcyBiZWluZyBkZXN0cm95ZWQuXHJcblx0ICogWW91IG1heSwgaG93ZXZlciwgdXNlIGl0IGluZGVwZW5kZW50bHkgdG8gZnJlZSBtZW1vcnkgd2hlbiB5b3UgYXJlIGNlcnRhaW5cclxuXHQgKiB0aGF0IHlvdSBkb24ndCBuZWVkIHRoaXMgcGFzcyBhbnltb3JlLlxyXG5cdCAqL1xyXG5cclxuXHRkaXNwb3NlKCkge1xyXG5cclxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcclxuXHJcblx0XHRsZXQga2V5O1xyXG5cclxuXHRcdGZvcihrZXkgb2Yga2V5cykge1xyXG5cclxuXHRcdFx0aWYodGhpc1trZXldICE9PSBudWxsICYmIHR5cGVvZiB0aGlzW2tleV0uZGlzcG9zZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblxyXG5cdFx0XHRcdHRoaXNba2V5XS5kaXNwb3NlKCk7XHJcblx0XHRcdFx0dGhpc1trZXldID0gbnVsbDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIGZvciBzYXZpbmcgdGhlIG9yaWdpbmFsIGNsZWFyIGNvbG9yIG9mIHRoZSByZW5kZXJlci5cclxuICpcclxuICogQHR5cGUgQ29sb3JcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKi9cclxuXHJcbmNvbnN0IGNvbG9yID0gbmV3IENvbG9yKCk7XHJcblxyXG4vKipcclxuICogQSBjbGVhciBwYXNzLlxyXG4gKlxyXG4gKiBZb3UgY2FuIHByZXZlbnQgc3BlY2lmaWMgYnVmZmVycyBmcm9tIGJlaW5nIGNsZWFyZWQgYnkgc2V0dGluZyBlaXRoZXIgdGhlXHJcbiAqIGF1dG9DbGVhckNvbG9yLCBhdXRvQ2xlYXJTdGVuY2lsIG9yIGF1dG9DbGVhckRlcHRoIHByb3BlcnRpZXMgb2YgdGhlIHJlbmRlcmVyXHJcbiAqIHRvIGZhbHNlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGVhclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjbGVhciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0NvbG9yfSBbb3B0aW9ucy5jbGVhckNvbG9yPW51bGxdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgY29sb3IuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmNsZWFyQWxwaGE9MC4wXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGFscGhhLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcihudWxsLCBudWxsLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQ2xlYXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhciBjb2xvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29sb3J9XHJcblx0XHQgKiBAZGVmYXVsdCBudWxsXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyQ29sb3IgPSAob3B0aW9ucy5jbGVhckNvbG9yICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckNvbG9yIDogbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFyIGFscGhhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAwLjBcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJBbHBoYSA9IChvcHRpb25zLmNsZWFyQWxwaGEgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyQWxwaGEgOiAwLjA7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYXJzIHRoZSByZWFkIGJ1ZmZlciBvciB0aGUgc2NyZWVuLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBjbGVhckNvbG9yID0gdGhpcy5jbGVhckNvbG9yO1xyXG5cclxuXHRcdGxldCBjbGVhckFscGhhO1xyXG5cclxuXHRcdGlmKGNsZWFyQ29sb3IgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdGNvbG9yLmNvcHkocmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcigpKTtcclxuXHRcdFx0Y2xlYXJBbHBoYSA9IHJlbmRlcmVyLmdldENsZWFyQWxwaGEoKTtcclxuXHRcdFx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihjbGVhckNvbG9yLCB0aGlzLmNsZWFyQWxwaGEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQodGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiByZWFkQnVmZmVyKTtcclxuXHRcdHJlbmRlcmVyLmNsZWFyKCk7XHJcblxyXG5cdFx0aWYoY2xlYXJDb2xvciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihjb2xvciwgY2xlYXJBbHBoYSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwYXNzIHRoYXQgZGlzYWJsZXMgdGhlIHN0ZW5jaWwgbWFzay5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJNYXNrUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNsZWFyIG1hc2sgcGFzcy5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkNsZWFyTWFza1Bhc3NcIjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNhYmxlcyB0aGUgc3RlbmNpbCB0ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0cmVuZGVyZXIuc3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldFRlc3QoZmFsc2UpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERhdGFUZXh0dXJlLCBSR0JGb3JtYXQsIEZsb2F0VHlwZSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBHbGl0Y2hNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbG93IC0gVGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZ2ggLSBUaGUgaGlnaGVzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmFuZG9tIHZhbHVlLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUludChsb3csIGhpZ2gpIHtcclxuXHJcblx0cmV0dXJuIGxvdyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChoaWdoIC0gbG93ICsgMSkpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSByYW5kb20gZmxvYXQgaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbG93IC0gVGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZ2ggLSBUaGUgaGlnaGVzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmFuZG9tIHZhbHVlLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUZsb2F0KGxvdywgaGlnaCkge1xyXG5cclxuXHRyZXR1cm4gbG93ICsgTWF0aC5yYW5kb20oKSAqIChoaWdoIC0gbG93KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGdsaXRjaCBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHbGl0Y2hQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZ2xpdGNoIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtUZXh0dXJlfSBbb3B0aW9ucy5wZXJ0dXJiTWFwXSAtIEEgcGVydHVyYmF0aW9uIG1hcC4gSWYgbm9uZSBpcyBwcm92aWRlZCwgYSBub2lzZSB0ZXh0dXJlIHdpbGwgYmUgY3JlYXRlZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHRTaXplPTY0XSAtIFRoZSBzaXplIG9mIHRoZSBnZW5lcmF0ZWQgbm9pc2UgbWFwLiBXaWxsIGJlIGlnbm9yZWQgaWYgYSBwZXJ0dXJiYXRpb24gbWFwIGlzIHByb3ZpZGVkLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJHbGl0Y2hQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2xpdGNoIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7R2xpdGNoTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG5ldyBHbGl0Y2hNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHBlcnR1cmJhdGlvbiBtYXAuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLnBlcnR1cmJNYXAgPSAob3B0aW9ucy5wZXJ0dXJiTWFwICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5wZXJ0dXJiTWFwIDogdGhpcy5nZW5lcmF0ZVBlcnR1cmJNYXAob3B0aW9ucy5kdFNpemUpO1xyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwLm5hbWUgPSBcIkdsaXRjaC5QZXJ0dXJiYXRpb25cIjtcclxuXHRcdHRoaXMucGVydHVyYk1hcC5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZmZlY3QgbW9kZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7R2xpdGNoTW9kZX1cclxuXHRcdCAqIEBkZWZhdWx0IEdsaXRjaE1vZGUuU1BPUkFESUNcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubW9kZSA9IEdsaXRjaE1vZGUuU1BPUkFESUM7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDb3VudGVyIGZvciBnbGl0Y2ggYWN0aXZhdGlvbiBhbmQgZGVhY3RpdmF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3VudGVyID0gMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcmFuZG9tIGJyZWFrIHBvaW50IGZvciB0aGUgc3BvcmFkaWMgZ2xpdGNoIGFjdGl2YXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmJyZWFrUG9pbnQgPSByYW5kb21JbnQoMTIwLCAyNDApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IHBlcnR1cmJhdGlvbiBtYXAuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0Z2V0IHBlcnR1cmJNYXAoKSB7IHJldHVybiB0aGlzLnRleHR1cmU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQXNzaWduaW5nIGEgbmV3IHBlcnR1cmJhdGlvbiBtYXAgZG9lcyBub3QgZGVzdHJveSB0aGUgY3VycmVudCBvbmUhXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IHBlcnR1cmJNYXAoeCkge1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IHg7XHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnRQZXJ0dXJiLnZhbHVlID0geDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXN0cm95cyB0aGUgY3VycmVudCBwZXJ0dXJiYXRpb24gbWFwIGFuZCByZXBsYWNlcyBpdCB3aXRoIGEgbmV3IG9uZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbc2l6ZT02NF0gLSBUaGUgdGV4dHVyZSBzaXplLlxyXG5cdCAqIEByZXR1cm4ge0RhdGFUZXh0dXJlfSBUaGUgcGVydHVyYmF0aW9uIHRleHR1cmUuXHJcblx0ICovXHJcblxyXG5cdGdlbmVyYXRlUGVydHVyYk1hcChzaXplID0gNjQpIHtcclxuXHJcblx0XHRjb25zdCBwaXhlbHMgPSBzaXplICogc2l6ZTtcclxuXHRcdGNvbnN0IGRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHBpeGVscyAqIDMpO1xyXG5cclxuXHRcdGxldCBkdCA9IHRoaXMucGVydHVyYk1hcDtcclxuXHRcdGxldCBpLCB4O1xyXG5cclxuXHRcdGZvcihpID0gMDsgaSA8IHBpeGVsczsgKytpKSB7XHJcblxyXG5cdFx0XHR4ID0gTWF0aC5yYW5kb20oKTtcclxuXHJcblx0XHRcdGRhdGFbaSAqIDNdID0geDtcclxuXHRcdFx0ZGF0YVtpICogMyArIDFdID0geDtcclxuXHRcdFx0ZGF0YVtpICogMyArIDJdID0geDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZHQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdGR0LmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0ZHQgPSBuZXcgRGF0YVRleHR1cmUoZGF0YSwgc2l6ZSwgc2l6ZSwgUkdCRm9ybWF0LCBGbG9hdFR5cGUpO1xyXG5cdFx0ZHQubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMucGVydHVyYk1hcCA9IGR0O1xyXG5cclxuXHRcdHJldHVybiBkdDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgbW9kZSA9IHRoaXMubW9kZTtcclxuXHRcdGNvbnN0IGNvdW50ZXIgPSB0aGlzLmNvdW50ZXI7XHJcblx0XHRjb25zdCBicmVha1BvaW50ID0gdGhpcy5icmVha1BvaW50O1xyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cclxuXHRcdHVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dW5pZm9ybXMuc2VlZC52YWx1ZSA9IE1hdGgucmFuZG9tKCk7XHJcblx0XHR1bmlmb3Jtcy5hY3RpdmUudmFsdWUgPSB0cnVlO1xyXG5cclxuXHRcdGlmKGNvdW50ZXIgJSBicmVha1BvaW50ID09PSAwIHx8IG1vZGUgPT09IEdsaXRjaE1vZGUuQ09OU1RBTlRfV0lMRCkge1xyXG5cclxuXHRcdFx0dW5pZm9ybXMuYW1vdW50LnZhbHVlID0gTWF0aC5yYW5kb20oKSAvIDMwLjA7XHJcblx0XHRcdHVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gcmFuZG9tRmxvYXQoLU1hdGguUEksIE1hdGguUEkpO1xyXG5cdFx0XHR1bmlmb3Jtcy5zZWVkWC52YWx1ZSA9IHJhbmRvbUZsb2F0KC0xLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLnNlZWRZLnZhbHVlID0gcmFuZG9tRmxvYXQoLTEuMCwgMS4wKTtcclxuXHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblgudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25ZLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cclxuXHRcdFx0dGhpcy5icmVha1BvaW50ID0gcmFuZG9tSW50KDEyMCwgMjQwKTtcclxuXHRcdFx0dGhpcy5jb3VudGVyID0gMDtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYoY291bnRlciAlIGJyZWFrUG9pbnQgPCBicmVha1BvaW50IC8gNSB8fCBtb2RlID09PSBHbGl0Y2hNb2RlLkNPTlNUQU5UX01JTEQpIHtcclxuXHJcblx0XHRcdFx0dW5pZm9ybXMuYW1vdW50LnZhbHVlID0gTWF0aC5yYW5kb20oKSAvIDkwLjA7XHJcblx0XHRcdFx0dW5pZm9ybXMuYW5nbGUudmFsdWUgPSByYW5kb21GbG9hdCgtTWF0aC5QSSwgTWF0aC5QSSk7XHJcblx0XHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblgudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblkudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdFx0dW5pZm9ybXMuc2VlZFgudmFsdWUgPSByYW5kb21GbG9hdCgtMC4zLCAwLjMpO1xyXG5cdFx0XHRcdHVuaWZvcm1zLnNlZWRZLnZhbHVlID0gcmFuZG9tRmxvYXQoLTAuMywgMC4zKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdC8vIFNwb3JhZGljLlxyXG5cdFx0XHRcdHVuaWZvcm1zLmFjdGl2ZS52YWx1ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQrK3RoaXMuY291bnRlcjtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggbW9kZSBlbnVtZXJhdGlvbi5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFNQT1JBRElDIC0gU3BvcmFkaWMgZ2xpdGNoZXMuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05TVEFOVF9NSUxEIC0gQ29uc3RhbnQgbWlsZCBnbGl0Y2hlcy5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENPTlNUQU5UX1dJTEQgLSBDb25zdGFudCB3aWxkIGdsaXRjaGVzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBHbGl0Y2hNb2RlID0ge1xyXG5cclxuXHRTUE9SQURJQzogMCxcclxuXHRDT05TVEFOVF9NSUxEOiAxLFxyXG5cdENPTlNUQU5UX1dJTEQ6IDJcclxuXHJcbn07XHJcbiIsImltcG9ydCB7IENsZWFyUGFzcyB9IGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwYXNzIHRoYXQgcmVuZGVycyBhIGdpdmVuIHNjZW5lIGRpcmVjdGx5IG9uIHNjcmVlbiBvciBpbnRvIHRoZSByZWFkIGJ1ZmZlclxyXG4gKiBmb3IgZnVydGhlciBwcm9jZXNzaW5nLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcmVuZGVyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBjYW1lcmEgdG8gdXNlIHRvIHJlbmRlciB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge01hdGVyaWFsfSBbb3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsPW51bGxdIC0gQW4gb3ZlcnJpZGUgbWF0ZXJpYWwgZm9yIHRoZSBzY2VuZS5cclxuXHQgKiBAcGFyYW0ge0NvbG9yfSBbb3B0aW9ucy5jbGVhckNvbG9yPW51bGxdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgY29sb3IuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmNsZWFyQWxwaGE9MS4wXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGFscGhhLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xlYXJEZXB0aD1mYWxzZV0gLSBXaGV0aGVyIGRlcHRoIHNob3VsZCBiZSBjbGVhcmVkIGV4cGxpY2l0bHkuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGVhcj10cnVlXSAtIFdoZXRoZXIgYWxsIGJ1ZmZlcnMgc2hvdWxkIGJlIGNsZWFyZWQuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjZW5lLCBjYW1lcmEsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKHNjZW5lLCBjYW1lcmEsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJSZW5kZXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNsZWFyIHBhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NsZWFyUGFzc31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJQYXNzID0gbmV3IENsZWFyUGFzcyhvcHRpb25zKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFuIG92ZXJyaWRlIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtNYXRlcmlhbH1cclxuXHRcdCAqIEBkZWZhdWx0IG51bGxcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMub3ZlcnJpZGVNYXRlcmlhbCA9IChvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWwgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWwgOiBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRlcHRoIGJ1ZmZlciBzaG91bGQgYmUgY2xlYXJlZCBleHBsaWNpdGx5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJEZXB0aCA9IChvcHRpb25zLmNsZWFyRGVwdGggIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyRGVwdGggOiBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2xvciwgZGVwdGggYW5kIHN0ZW5jaWwgYnVmZmVycyBzaG91bGQgYmUgY2xlYXJlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBFdmVuIHdpdGggY2xlYXIgc2V0IHRvIHRydWUgeW91IGNhbiBwcmV2ZW50IHNwZWNpZmljIGJ1ZmZlcnMgZnJvbSBiZWluZ1xyXG5cdFx0ICogY2xlYXJlZCBieSBzZXR0aW5nIGVpdGhlciB0aGUgYXV0b0NsZWFyQ29sb3IsIGF1dG9DbGVhclN0ZW5jaWwgb3JcclxuXHRcdCAqIGF1dG9DbGVhckRlcHRoIHByb3BlcnRpZXMgb2YgdGhlIHJlbmRlcmVyIHRvIGZhbHNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhciA9IChvcHRpb25zLmNsZWFyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhciA6IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgc2NlbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcjtcclxuXHJcblx0XHRpZih0aGlzLmNsZWFyKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNsZWFyUGFzcy5yZW5kZXIocmVuZGVyZXIsIHRhcmdldCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmKHRoaXMuY2xlYXJEZXB0aCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRhcmdldCk7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0c2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IHRoaXMub3ZlcnJpZGVNYXRlcmlhbDtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEsIHRhcmdldCk7XHJcblx0XHRzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWFzayBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXNrUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IG1hc2sgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lIC0gVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIC0gVGhlIGNhbWVyYSB0byB1c2UuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjZW5lLCBjYW1lcmEpIHtcclxuXHJcblx0XHRzdXBlcihzY2VuZSwgY2FtZXJhLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiTWFza1Bhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEludmVyc2UgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmludmVyc2UgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFN0ZW5jaWwgYnVmZmVyIGNsZWFyIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyU3RlbmNpbCA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIHN0ZW5jaWwgYml0IG1hc2suXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgY29udGV4dCA9IHJlbmRlcmVyLmNvbnRleHQ7XHJcblx0XHRjb25zdCBzdGF0ZSA9IHJlbmRlcmVyLnN0YXRlO1xyXG5cclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xyXG5cclxuXHRcdGNvbnN0IHdyaXRlVmFsdWUgPSB0aGlzLmludmVyc2UgPyAwIDogMTtcclxuXHRcdGNvbnN0IGNsZWFyVmFsdWUgPSAxIC0gd3JpdGVWYWx1ZTtcclxuXHJcblx0XHQvLyBEb24ndCB1cGRhdGUgY29sb3Igb3IgZGVwdGguXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldE1hc2soZmFsc2UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRNYXNrKGZhbHNlKTtcclxuXHJcblx0XHQvLyBMb2NrIHRoZSBidWZmZXJzLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRMb2NrZWQodHJ1ZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldExvY2tlZCh0cnVlKTtcclxuXHJcblx0XHQvLyBDb25maWd1cmUgdGhlIHN0ZW5jaWwuXHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0VGVzdCh0cnVlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRPcChjb250ZXh0LlJFUExBQ0UsIGNvbnRleHQuUkVQTEFDRSwgY29udGV4dC5SRVBMQUNFKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRGdW5jKGNvbnRleHQuQUxXQVlTLCB3cml0ZVZhbHVlLCAweGZmZmZmZmZmKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRDbGVhcihjbGVhclZhbHVlKTtcclxuXHJcblx0XHQvLyBDbGVhciB0aGUgc3RlbmNpbC5cclxuXHRcdGlmKHRoaXMuY2xlYXJTdGVuY2lsKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQocmVhZEJ1ZmZlcik7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyU3RlbmNpbCgpO1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHdyaXRlQnVmZmVyKTtcclxuXHRcdFx0cmVuZGVyZXIuY2xlYXJTdGVuY2lsKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERyYXcgdGhlIG1hc2sgaW50byBib3RoIGJ1ZmZlcnMuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgcmVhZEJ1ZmZlcik7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgd3JpdGVCdWZmZXIpO1xyXG5cclxuXHRcdC8vIFVubG9jayB0aGUgYnVmZmVycy5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TG9ja2VkKGZhbHNlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TG9ja2VkKGZhbHNlKTtcclxuXHJcblx0XHQvLyBPbmx5IHJlbmRlciB3aGVyZSB0aGUgc3RlbmNpbCBpcyBzZXQgdG8gMS5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRGdW5jKGNvbnRleHQuRVFVQUwsIDEsIDB4ZmZmZmZmZmYpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldE9wKGNvbnRleHQuS0VFUCwgY29udGV4dC5LRUVQLCBjb250ZXh0LktFRVApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBzaGFkZXIgcGFzcy5cclxuICpcclxuICogVXNlZCB0byByZW5kZXIgYW55IHNoYWRlciBtYXRlcmlhbCBhcyBhIDJEIGZpbHRlci5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHNoYWRlciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTaGFkZXJNYXRlcmlhbH0gbWF0ZXJpYWwgLSBUaGUgc2hhZGVyIG1hdGVyaWFsIHRvIHVzZS5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW3RleHR1cmVJRD1cInREaWZmdXNlXCJdIC0gVGhlIHRleHR1cmUgdW5pZm9ybSBpZGVudGlmaWVyLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbCwgdGV4dHVyZUlEID0gXCJ0RGlmZnVzZVwiKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiU2hhZGVyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzaGFkZXIgbWF0ZXJpYWwgdG8gdXNlIGZvciByZW5kZXJpbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NoYWRlck1hdGVyaWFsfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGUgY29sb3Igc2FtcGxlciB1bmlmb3JtIG9mIHRoZSBnaXZlbiBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U3RyaW5nfVxyXG5cdFx0ICogQGRlZmF1bHQgXCJ0RGlmZnVzZVwiXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRleHR1cmVJRCA9IHRleHR1cmVJRDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0aWYodGhpcy5tYXRlcmlhbC51bmlmb3Jtc1t0aGlzLnRleHR1cmVJRF0gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtc1t0aGlzLnRleHR1cmVJRF0udmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBDb3B5TWF0ZXJpYWwsIFNob2NrV2F2ZU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEhhbGYgUEkuXHJcbiAqXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgSEFMRl9QSSA9IE1hdGguUEkgKiAwLjU7XHJcblxyXG4vKipcclxuICogQSB2ZWN0b3IuXHJcbiAqXHJcbiAqIEB0eXBlIHtWZWN0b3IzfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuLyoqXHJcbiAqIEEgdmVjdG9yLlxyXG4gKlxyXG4gKiBAdHlwZSB7VmVjdG9yM31cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCBhYiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG4vKipcclxuICogQSBzaG9jayB3YXZlIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNob2NrV2F2ZVBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzaG9jayB3YXZlIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIC0gVGhlIG1haW4gY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7VmVjdG9yM30gW2VwaWNlbnRlcl0gLSBUaGUgd29ybGQgcG9zaXRpb24gb2YgdGhlIHNob2NrIHdhdmUgZXBpY2VudGVyLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc3BlZWQ9MS4wXSAtIFRoZSBhbmltYXRpb24gc3BlZWQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFJhZGl1cz0xLjBdIC0gVGhlIGV4dGVudCBvZiB0aGUgc2hvY2sgd2F2ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2F2ZVNpemU9MC4yXSAtIFRoZSB3YXZlIHNpemUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmFtcGxpdHVkZT0wLjA1XSAtIFRoZSBkaXN0b3J0aW9uIGFtcGxpdHVkZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhLCBlcGljZW50ZXIgPSBuZXcgVmVjdG9yMygpLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTaG9ja1dhdmVQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG1haW4gY2FtZXJhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3QzRH1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWFpbkNhbWVyYSA9IGNhbWVyYTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlcGljZW50ZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1ZlY3RvcjN9XHJcblx0XHQgKiBAZXhhbXBsZSBzaG9ja1dhdmVQYXNzLmVwaWNlbnRlciA9IG15TWVzaC5wb3NpdGlvbjtcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuZXBpY2VudGVyID0gZXBpY2VudGVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG9iamVjdCBwb3NpdGlvbiBpbiBzY3JlZW4gc3BhY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1ZlY3RvcjN9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zY3JlZW5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc3BlZWQgb2YgdGhlIHNob2NrIHdhdmUgYW5pbWF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAyLjBcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc3BlZWQgPSAob3B0aW9ucy5zcGVlZCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3BlZWQgOiAyLjA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHRpbWUgYWNjdW11bGF0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwLjA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc2hvY2sgd2F2ZSBhbmltYXRpb24gaXMgYWN0aXZlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHNob2NrIHdhdmUgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaG9ja1dhdmVNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsID0gbmV3IFNob2NrV2F2ZU1hdGVyaWFsKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXMuY2VudGVyLnZhbHVlID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY29weSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvcHlNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbCA9IG5ldyBDb3B5TWF0ZXJpYWwoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbWl0cyB0aGUgc2hvY2sgd2F2ZS5cclxuXHQgKi9cclxuXHJcblx0ZXhwbG9kZSgpIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwLjA7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgcmVuZGVyIGRlbHRhIHRpbWUuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgZXBpY2VudGVyID0gdGhpcy5lcGljZW50ZXI7XHJcblx0XHRjb25zdCBtYWluQ2FtZXJhID0gdGhpcy5tYWluQ2FtZXJhO1xyXG5cdFx0Y29uc3Qgc2NyZWVuUG9zaXRpb24gPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdGNvbnN0IHNob2NrV2F2ZU1hdGVyaWFsID0gdGhpcy5zaG9ja1dhdmVNYXRlcmlhbDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXM7XHJcblx0XHRjb25zdCBjZW50ZXIgPSB1bmlmb3Jtcy5jZW50ZXI7XHJcblx0XHRjb25zdCByYWRpdXMgPSB1bmlmb3Jtcy5yYWRpdXM7XHJcblx0XHRjb25zdCBtYXhSYWRpdXMgPSB1bmlmb3Jtcy5tYXhSYWRpdXM7XHJcblx0XHRjb25zdCB3YXZlU2l6ZSA9IHVuaWZvcm1zLndhdmVTaXplO1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5jb3B5TWF0ZXJpYWw7XHJcblxyXG5cdFx0aWYodGhpcy5hY3RpdmUpIHtcclxuXHJcblx0XHRcdC8vIENhbGN1bGF0ZSBkaXJlY3Rpb24gdmVjdG9ycy5cclxuXHRcdFx0bWFpbkNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbih2KTtcclxuXHRcdFx0YWIuY29weShtYWluQ2FtZXJhLnBvc2l0aW9uKS5zdWIoZXBpY2VudGVyKTtcclxuXHJcblx0XHRcdC8vIERvbid0IHJlbmRlciB0aGUgZWZmZWN0IGlmIHRoZSBvYmplY3QgaXMgYmVoaW5kIHRoZSBjYW1lcmEuXHJcblx0XHRcdGlmKHYuYW5nbGVUbyhhYikgPiBIQUxGX1BJKSB7XHJcblxyXG5cdFx0XHRcdC8vIFNjYWxlIHRoZSBlZmZlY3QgYmFzZWQgb24gZGlzdGFuY2UgdG8gdGhlIG9iamVjdC5cclxuXHRcdFx0XHR1bmlmb3Jtcy5jYW1lcmFEaXN0YW5jZS52YWx1ZSA9IG1haW5DYW1lcmEucG9zaXRpb24uZGlzdGFuY2VUbyhlcGljZW50ZXIpO1xyXG5cclxuXHRcdFx0XHQvLyBDYWxjdWxhdGUgdGhlIHNjcmVlbiBwb3NpdGlvbiBvZiB0aGUgZXBpY2VudGVyLlxyXG5cdFx0XHRcdHNjcmVlblBvc2l0aW9uLmNvcHkoZXBpY2VudGVyKS5wcm9qZWN0KG1haW5DYW1lcmEpO1xyXG5cdFx0XHRcdGNlbnRlci52YWx1ZS54ID0gKHNjcmVlblBvc2l0aW9uLnggKyAxLjApICogMC41O1xyXG5cdFx0XHRcdGNlbnRlci52YWx1ZS55ID0gKHNjcmVlblBvc2l0aW9uLnkgKyAxLjApICogMC41O1xyXG5cclxuXHRcdFx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdFx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSBzaG9ja1dhdmVNYXRlcmlhbDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFVwZGF0ZSB0aGUgc2hvY2sgd2F2ZSByYWRpdXMgYmFzZWQgb24gdGltZS5cclxuXHRcdFx0dGhpcy50aW1lICs9IGRlbHRhO1xyXG5cdFx0XHRyYWRpdXMudmFsdWUgPSB0aGlzLnRpbWUgKiB0aGlzLnNwZWVkIC0gd2F2ZVNpemUudmFsdWU7XHJcblxyXG5cdFx0XHRpZihyYWRpdXMudmFsdWUgPj0gKG1heFJhZGl1cy52YWx1ZSArIHdhdmVTaXplLnZhbHVlKSAqIDIpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwudW5pZm9ybXMuYXNwZWN0LnZhbHVlID0gd2lkdGggLyBoZWlnaHQ7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEEgY29tcGlsYXRpb24gb2YgdGhlIHBvc3QgcHJvY2Vzc2luZyBwYXNzZXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvcGFzc2VzXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgQmxvb21QYXNzIH0gZnJvbSBcIi4vYmxvb20uanNcIjtcclxuZXhwb3J0IHsgQmx1clBhc3MgfSBmcm9tIFwiLi9ibHVyLmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoUGFzcyB9IGZyb20gXCIuL2Jva2VoLmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoMlBhc3MgfSBmcm9tIFwiLi9ib2tlaDIuanNcIjtcclxuZXhwb3J0IHsgQ2xlYXJQYXNzIH0gZnJvbSBcIi4vY2xlYXIuanNcIjtcclxuZXhwb3J0IHsgQ2xlYXJNYXNrUGFzcyB9IGZyb20gXCIuL2NsZWFyLW1hc2suanNcIjtcclxuZXhwb3J0IHsgRG90U2NyZWVuUGFzcyB9IGZyb20gXCIuL2RvdC1zY3JlZW4uanNcIjtcclxuZXhwb3J0IHsgRGVwdGhQYXNzIH0gZnJvbSBcIi4vZGVwdGguanNcIjtcclxuZXhwb3J0IHsgRmlsbVBhc3MgfSBmcm9tIFwiLi9maWxtLmpzXCI7XHJcbmV4cG9ydCB7IEdsaXRjaE1vZGUsIEdsaXRjaFBhc3MgfSBmcm9tIFwiLi9nbGl0Y2guanNcIjtcclxuZXhwb3J0IHsgR29kUmF5c1Bhc3MgfSBmcm9tIFwiLi9nb2QtcmF5cy5qc1wiO1xyXG5leHBvcnQgeyBNYXNrUGFzcyB9IGZyb20gXCIuL21hc2suanNcIjtcclxuZXhwb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuZXhwb3J0IHsgUGl4ZWxhdGlvblBhc3MgfSBmcm9tIFwiLi9waXhlbGF0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcclxuZXhwb3J0IHsgU2F2ZVBhc3MgfSBmcm9tIFwiLi9zYXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNoYWRlclBhc3MgfSBmcm9tIFwiLi9zaGFkZXIuanNcIjtcclxuZXhwb3J0IHsgU2hvY2tXYXZlUGFzcyB9IGZyb20gXCIuL3Nob2NrLXdhdmUuanNcIjtcclxuZXhwb3J0IHsgU01BQVBhc3MgfSBmcm9tIFwiLi9zbWFhLmpzXCI7XHJcbmV4cG9ydCB7IFRleHR1cmVQYXNzIH0gZnJvbSBcIi4vdGV4dHVyZS5qc1wiO1xyXG5leHBvcnQgeyBUb25lTWFwcGluZ1Bhc3MgfSBmcm9tIFwiLi90b25lLW1hcHBpbmcuanNcIjtcclxuIiwiaW1wb3J0IHtcclxuXHREZXB0aFN0ZW5jaWxGb3JtYXQsXHJcblx0RGVwdGhUZXh0dXJlLFxyXG5cdExpbmVhckZpbHRlcixcclxuXHRSR0JBRm9ybWF0LFxyXG5cdFJHQkZvcm1hdCxcclxuXHRVbnNpZ25lZEludDI0OFR5cGUsXHJcblx0V2ViR0xSZW5kZXJUYXJnZXRcclxufSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmltcG9ydCB7IENsZWFyTWFza1Bhc3MsIE1hc2tQYXNzLCBTaGFkZXJQYXNzIH0gZnJvbSBcIi4uL3Bhc3Nlc1wiO1xyXG5pbXBvcnQgeyBDb3B5TWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcblxyXG4vKipcclxuICogVGhlIEVmZmVjdENvbXBvc2VyIG1heSBiZSB1c2VkIGluIHBsYWNlIG9mIGEgbm9ybWFsIFdlYkdMUmVuZGVyZXIuXHJcbiAqXHJcbiAqIFRoZSBhdXRvIGNsZWFyIGJlaGF2aW91ciBvZiB0aGUgcHJvdmlkZWQgcmVuZGVyZXIgd2lsbCBiZSBkaXNhYmxlZCB0byBwcmV2ZW50XHJcbiAqIHVubmVjZXNzYXJ5IGNsZWFyIG9wZXJhdGlvbnMuXHJcbiAqXHJcbiAqIEl0IGlzIGNvbW1vbiBwcmFjdGljZSB0byB1c2UgYSB7QGxpbmsgUmVuZGVyUGFzc30gYXMgdGhlIGZpcnN0IHBhc3MgdG9cclxuICogYXV0b21hdGljYWxseSBjbGVhciB0aGUgc2NyZWVuIGFuZCByZW5kZXIgdGhlIHNjZW5lIHRvIGEgdGV4dHVyZSBmb3IgZnVydGhlclxyXG4gKiBwcm9jZXNzaW5nLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBFZmZlY3RDb21wb3NlciB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZWZmZWN0IGNvbXBvc2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSBbcmVuZGVyZXJdIC0gVGhlIHJlbmRlcmVyIHRoYXQgc2hvdWxkIGJlIHVzZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGVwdGhCdWZmZXI9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBtYWluIHJlbmRlciB0YXJnZXRzIHNob3VsZCBoYXZlIGEgZGVwdGggYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc3RlbmNpbEJ1ZmZlcj1mYWxzZV0gLSBXaGV0aGVyIHRoZSBtYWluIHJlbmRlciB0YXJnZXRzIHNob3VsZCBoYXZlIGEgc3RlbmNpbCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kZXB0aFRleHR1cmU9ZmFsc2VdIC0gU2V0IHRvIHRydWUgaWYgb25lIG9mIHlvdXIgcGFzc2VzIHJlbGllcyBvbiBhIGRlcHRoIHRleHR1cmUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHJlbmRlcmVyID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVuZGVyZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogWW91IG1heSByZXBsYWNlIHRoZSByZW5kZXJlciBhdCBhbnkgdGltZSBieSB1c2luZ1xyXG5cdFx0ICoge0BsaW5rIEVmZmVjdENvbXBvc2VyI3JlcGxhY2VSZW5kZXJlcn0uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyZXJ9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVhZCBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogUmVhZGluZyBmcm9tIGFuZCB3cml0aW5nIHRvIHRoZSBzYW1lIHJlbmRlciB0YXJnZXQgc2hvdWxkIGJlIGF2b2lkZWQuXHJcblx0XHQgKiBUaGVyZWZvcmUsIHR3byBzZXBlcmF0ZSB5ZXQgaWRlbnRpY2FsIGJ1ZmZlcnMgYXJlIHVzZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVhZEJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLndyaXRlQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHRpZih0aGlzLnJlbmRlcmVyICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIoXHJcblx0XHRcdFx0KG9wdGlvbnMuZGVwdGhCdWZmZXIgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmRlcHRoQnVmZmVyIDogdHJ1ZSxcclxuXHRcdFx0XHQob3B0aW9ucy5zdGVuY2lsQnVmZmVyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5zdGVuY2lsQnVmZmVyIDogZmFsc2UsXHJcblx0XHRcdFx0KG9wdGlvbnMuZGVwdGhUZXh0dXJlICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5kZXB0aFRleHR1cmUgOiBmYWxzZVxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5jbG9uZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY29weSBwYXNzIHVzZWQgZm9yIGNvcHlpbmcgbWFza2VkIHNjZW5lcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hhZGVyUGFzc31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvcHlQYXNzID0gbmV3IFNoYWRlclBhc3MobmV3IENvcHlNYXRlcmlhbCgpKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBwYXNzZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1Bhc3NbXX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnBhc3NlcyA9IFtdO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkZXB0aCB0ZXh0dXJlIG9mIHRoZSByZWFkIGFuZCB3cml0ZSBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0RlcHRoVGV4dHVyZX1cclxuXHQgKiBAZGVmYXVsdCBudWxsXHJcblx0ICovXHJcblxyXG5cdGdldCBkZXB0aFRleHR1cmUoKSB7IHJldHVybiB0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByZWFkIGFuZCB3cml0ZSBidWZmZXJzIHNoYXJlIGEgc2luZ2xlIGRlcHRoIHRleHR1cmUuIERlcHRoIHdpbGwgYmVcclxuXHQgKiB3cml0dGVuIHRvIHRoaXMgdGV4dHVyZSB3aGVuIHNvbWV0aGluZyBpcyByZW5kZXJlZCBpbnRvIG9uZSBvZiB0aGUgYnVmZmVyc1xyXG5cdCAqIGFuZCB0aGUgaW52b2x2ZWQgbWF0ZXJpYWxzIGhhdmUgZGVwdGggd3JpdGUgZW5hYmxlZC5cclxuXHQgKlxyXG5cdCAqIFlvdSBtYXkgZW5hYmxlIHRoaXMgbWVjaGFuaXNtIGR1cmluZyB0aGUgaW5zdGFudGlhdGlvbiBvZiB0aGUgY29tcG9zZXIgb3JcclxuXHQgKiBieSBhc3NpZ25pbmcgYSBEZXB0aFRleHR1cmUgaW5zdGFuY2UgbGF0ZXIgb24uIFlvdSBtYXkgYWxzbyBkaXNhYmxlIGl0IGJ5XHJcblx0ICogYXNzaWduaW5nIG51bGwuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7RGVwdGhUZXh0dXJlfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgZGVwdGhUZXh0dXJlKHgpIHtcclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlID0geDtcclxuXHRcdHRoaXMud3JpdGVCdWZmZXIuZGVwdGhUZXh0dXJlID0geDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgY3VycmVudCByZW5kZXJlciB3aXRoIHRoZSBnaXZlbiBvbmUuIFRoZSBET00gZWxlbWVudCBvZiB0aGVcclxuXHQgKiBjdXJyZW50IHJlbmRlcmVyIHdpbGwgYXV0b21hdGljYWxseSBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBub2RlIGFuZCB0aGVcclxuXHQgKiBET00gZWxlbWVudCBvZiB0aGUgbmV3IHJlbmRlcmVyIHdpbGwgdGFrZSBpdHMgcGxhY2UuXHJcblx0ICpcclxuXHQgKiBUaGUgYXV0byBjbGVhciBtZWNoYW5pc20gb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyIHdpbGwgYmUgZGlzYWJsZWQuXHJcblx0ICpcclxuXHQgKiBTd2l0Y2hpbmcgYmV0d2VlbiByZW5kZXJlcnMgYWxsb3dzIHlvdSB0byBkeW5hbWljYWxseSBlbmFibGUgb3IgZGlzYWJsZVxyXG5cdCAqIGFudGlhbGlhc2luZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgbmV3IHJlbmRlcmVyLlxyXG5cdCAqIEByZXR1cm4ge1dlYkdMUmVuZGVyZXJ9IFRoZSBvbGQgcmVuZGVyZXIuXHJcblx0ICovXHJcblxyXG5cdHJlcGxhY2VSZW5kZXJlcihyZW5kZXJlcikge1xyXG5cclxuXHRcdGNvbnN0IG9sZFJlbmRlcmVyID0gdGhpcy5yZW5kZXJlcjtcclxuXHJcblx0XHRsZXQgcGFyZW50LCBvbGRTaXplLCBuZXdTaXplO1xyXG5cclxuXHRcdGlmKG9sZFJlbmRlcmVyICE9PSBudWxsICYmIG9sZFJlbmRlcmVyICE9PSByZW5kZXJlcikge1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0cGFyZW50ID0gb2xkUmVuZGVyZXIuZG9tRWxlbWVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRvbGRTaXplID0gb2xkUmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0XHRuZXdTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cclxuXHRcdFx0aWYocGFyZW50ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZChvbGRSZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihvbGRTaXplLndpZHRoICE9PSBuZXdTaXplLndpZHRoIHx8IG9sZFNpemUuaGVpZ2h0ICE9PSBuZXdTaXplLmhlaWdodCkge1xyXG5cclxuXHRcdFx0XHR0aGlzLnNldFNpemUoKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9sZFJlbmRlcmVyO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgcmVuZGVyIHRhcmdldCBieSByZXBsaWNhdGluZyB0aGUgcmVuZGVyZXIncyBjYW52YXMuXHJcblx0ICpcclxuXHQgKiBUaGUgY3JlYXRlZCByZW5kZXIgdGFyZ2V0IHVzZXMgYSBsaW5lYXIgZmlsdGVyIGZvciB0ZXhlbCBtaW5pZmljYXRpb24gYW5kXHJcblx0ICogbWFnbmlmaWNhdGlvbi4gSXRzIHJlbmRlciB0ZXh0dXJlIGZvcm1hdCBkZXBlbmRzIG9uIHdoZXRoZXIgdGhlIHJlbmRlcmVyXHJcblx0ICogdXNlcyB0aGUgYWxwaGEgY2hhbm5lbC4gTWlwbWFwcyBhcmUgZGlzYWJsZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGRlcHRoQnVmZmVyIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIGRlcHRoIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHN0ZW5jaWxCdWZmZXIgLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBoYXZlIGEgc3RlbmNpbCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBkZXB0aFRleHR1cmUgLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBoYXZlIGEgZGVwdGggdGV4dHVyZS5cclxuXHQgKiBAcmV0dXJuIHtXZWJHTFJlbmRlclRhcmdldH0gQSBuZXcgcmVuZGVyIHRhcmdldCB0aGF0IGVxdWFscyB0aGUgcmVuZGVyZXIncyBjYW52YXMuXHJcblx0ICovXHJcblxyXG5cdGNyZWF0ZUJ1ZmZlcihkZXB0aEJ1ZmZlciwgc3RlbmNpbEJ1ZmZlciwgZGVwdGhUZXh0dXJlKSB7XHJcblxyXG5cdFx0Y29uc3Qgc2l6ZSA9IHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHRoaXMucmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xyXG5cdFx0Y29uc3QgYWxwaGEgPSB0aGlzLnJlbmRlcmVyLmNvbnRleHQuZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbHBoYTtcclxuXHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXQgPSBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoc2l6ZS53aWR0aCAqIHBpeGVsUmF0aW8sIHNpemUuaGVpZ2h0ICogcGl4ZWxSYXRpbywge1xyXG5cdFx0XHRtaW5GaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0bWFnRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdGZvcm1hdDogYWxwaGEgPyBSR0JBRm9ybWF0IDogUkdCRm9ybWF0LFxyXG5cdFx0XHRkZXB0aEJ1ZmZlcjogZGVwdGhCdWZmZXIsXHJcblx0XHRcdHN0ZW5jaWxCdWZmZXI6IHN0ZW5jaWxCdWZmZXIsXHJcblx0XHRcdGRlcHRoVGV4dHVyZTogZGVwdGhUZXh0dXJlID8gbmV3IERlcHRoVGV4dHVyZSgpIDogbnVsbFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYoZGVwdGhUZXh0dXJlICYmIHN0ZW5jaWxCdWZmZXIpIHtcclxuXHJcblx0XHRcdHJlbmRlclRhcmdldC5kZXB0aFRleHR1cmUuZm9ybWF0ID0gRGVwdGhTdGVuY2lsRm9ybWF0O1xyXG5cdFx0XHRyZW5kZXJUYXJnZXQuZGVwdGhUZXh0dXJlLnR5cGUgPSBVbnNpZ25lZEludDI0OFR5cGU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlclRhcmdldC50ZXh0dXJlLm5hbWUgPSBcIkVmZmVjdENvbXBvc2VyLkJ1ZmZlclwiO1xyXG5cdFx0cmVuZGVyVGFyZ2V0LnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlclRhcmdldDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgcGFzcywgb3B0aW9uYWxseSBhdCBhIHNwZWNpZmljIGluZGV4LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQYXNzfSBwYXNzIC0gQSBuZXcgcGFzcy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2luZGV4XSAtIEFuIGluZGV4IGF0IHdoaWNoIHRoZSBwYXNzIHNob3VsZCBiZSBpbnNlcnRlZC5cclxuXHQgKi9cclxuXHJcblx0YWRkUGFzcyhwYXNzLCBpbmRleCkge1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlcjtcclxuXHRcdGNvbnN0IHNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gcmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xyXG5cclxuXHRcdHBhc3Muc2V0U2l6ZShzaXplLndpZHRoICogcGl4ZWxSYXRpbywgc2l6ZS5oZWlnaHQgKiBwaXhlbFJhdGlvKTtcclxuXHRcdHBhc3MuaW5pdGlhbGlzZShyZW5kZXJlciwgcmVuZGVyZXIuY29udGV4dC5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFscGhhKTtcclxuXHJcblx0XHRpZihpbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHR0aGlzLnBhc3Nlcy5zcGxpY2UoaW5kZXgsIDAsIHBhc3MpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR0aGlzLnBhc3Nlcy5wdXNoKHBhc3MpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGFzc30gcGFzcyAtIFRoZSBwYXNzLlxyXG5cdCAqL1xyXG5cclxuXHRyZW1vdmVQYXNzKHBhc3MpIHtcclxuXHJcblx0XHR0aGlzLnBhc3Nlcy5zcGxpY2UodGhpcy5wYXNzZXMuaW5kZXhPZihwYXNzKSwgMSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyBhbGwgZW5hYmxlZCBwYXNzZXMgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSBhZGRlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YSAtIFRoZSB0aW1lIGJldHdlZW4gdGhlIGxhc3QgZnJhbWUgYW5kIHRoZSBjdXJyZW50IG9uZSBpbiBzZWNvbmRzLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIoZGVsdGEpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHRcdGNvbnN0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlcjtcclxuXHRcdGNvbnN0IGNvcHlQYXNzID0gdGhpcy5jb3B5UGFzcztcclxuXHJcblx0XHRsZXQgcmVhZEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlcjtcclxuXHRcdGxldCB3cml0ZUJ1ZmZlciA9IHRoaXMud3JpdGVCdWZmZXI7XHJcblxyXG5cdFx0bGV0IG1hc2tBY3RpdmUgPSBmYWxzZTtcclxuXHRcdGxldCBwYXNzLCBjb250ZXh0LCBidWZmZXI7XHJcblx0XHRsZXQgaSwgbDtcclxuXHJcblx0XHRmb3IoaSA9IDAsIGwgPSBwYXNzZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcblxyXG5cdFx0XHRwYXNzID0gcGFzc2VzW2ldO1xyXG5cclxuXHRcdFx0aWYocGFzcy5lbmFibGVkKSB7XHJcblxyXG5cdFx0XHRcdHBhc3MucmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEsIG1hc2tBY3RpdmUpO1xyXG5cclxuXHRcdFx0XHRpZihwYXNzLm5lZWRzU3dhcCkge1xyXG5cclxuXHRcdFx0XHRcdGlmKG1hc2tBY3RpdmUpIHtcclxuXHJcblx0XHRcdFx0XHRcdGNvbnRleHQgPSByZW5kZXJlci5jb250ZXh0O1xyXG5cdFx0XHRcdFx0XHRjb250ZXh0LnN0ZW5jaWxGdW5jKGNvbnRleHQuTk9URVFVQUwsIDEsIDB4ZmZmZmZmZmYpO1xyXG5cdFx0XHRcdFx0XHRjb3B5UGFzcy5yZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKTtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyhjb250ZXh0LkVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnVmZmVyID0gcmVhZEJ1ZmZlcjtcclxuXHRcdFx0XHRcdHJlYWRCdWZmZXIgPSB3cml0ZUJ1ZmZlcjtcclxuXHRcdFx0XHRcdHdyaXRlQnVmZmVyID0gYnVmZmVyO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHBhc3MgaW5zdGFuY2VvZiBNYXNrUGFzcykge1xyXG5cclxuXHRcdFx0XHRcdG1hc2tBY3RpdmUgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHR9IGVsc2UgaWYocGFzcyBpbnN0YW5jZW9mIENsZWFyTWFza1Bhc3MpIHtcclxuXHJcblx0XHRcdFx0XHRtYXNrQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVycyBhbmQgdGhlIHJlbmRlcmVyJ3Mgb3V0cHV0IGNhbnZhcy5cclxuXHQgKlxyXG5cdCAqIEV2ZXJ5IHBhc3Mgd2lsbCBiZSBpbmZvcm1lZCBvZiB0aGUgbmV3IHNpemUuIEl0J3MgdXAgdG8gZWFjaCBwYXNzIGhvdyB0aGF0XHJcblx0ICogaW5mb3JtYXRpb24gaXMgdXNlZC5cclxuXHQgKlxyXG5cdCAqIElmIG5vIHdpZHRoIG9yIGhlaWdodCBpcyBzcGVjaWZpZWQsIHRoZSByZW5kZXIgdGFyZ2V0cyBhbmQgcGFzc2VzIHdpbGwgYmVcclxuXHQgKiB1cGRhdGVkIHdpdGggdGhlIGN1cnJlbnQgc2l6ZSBvZiB0aGUgcmVuZGVyZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3dpZHRoXSAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodF0gLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHRsZXQgaSwgbDtcclxuXHJcblx0XHRpZih3aWR0aCA9PT0gdW5kZWZpbmVkIHx8IGhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHR3aWR0aCA9IHNpemUud2lkdGg7XHJcblx0XHRcdGhlaWdodCA9IHNpemUuaGVpZ2h0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0d2lkdGggKj0gcGl4ZWxSYXRpbztcclxuXHRcdGhlaWdodCAqPSBwaXhlbFJhdGlvO1xyXG5cclxuXHRcdHRoaXMucmVhZEJ1ZmZlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdGZvcihpID0gMCwgbCA9IHBhc3Nlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuXHJcblx0XHRcdHBhc3Nlc1tpXS5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhpcyBjb21wb3NlciBieSBkZWxldGluZyBhbGwgcGFzc2VzIGFuZCBjcmVhdGluZyBuZXcgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IFtyZW5kZXJUYXJnZXRdIC0gQSBuZXcgcmVuZGVyIHRhcmdldC4gSWYgbm9uZSBpcyBwcm92aWRlZCwgdGhlIHNldHRpbmdzIG9mIHRoZSByZW5kZXJlciB3aWxsIGJlIHVzZWQuXHJcblx0ICovXHJcblxyXG5cdHJlc2V0KHJlbmRlclRhcmdldCkge1xyXG5cclxuXHRcdGNvbnN0IGRlcHRoQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLmRlcHRoQnVmZmVyO1xyXG5cdFx0Y29uc3Qgc3RlbmNpbEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5zdGVuY2lsQnVmZmVyO1xyXG5cdFx0Y29uc3QgZGVwdGhUZXh0dXJlID0gKHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmUgIT09IG51bGwpO1xyXG5cclxuXHRcdHRoaXMuZGlzcG9zZSgocmVuZGVyVGFyZ2V0ID09PSB1bmRlZmluZWQpID9cclxuXHRcdFx0dGhpcy5jcmVhdGVCdWZmZXIoZGVwdGhCdWZmZXIsIHN0ZW5jaWxCdWZmZXIsIGRlcHRoVGV4dHVyZSkgOlxyXG5cdFx0XHRyZW5kZXJUYXJnZXRcclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgYWxsIHBhc3NlcyBhbmQgcmVuZGVyIHRhcmdldHMuXHJcblx0ICpcclxuXHQgKiBUaGlzIG1ldGhvZCBkZWFsbG9jYXRlcyBhbGwgcmVuZGVyIHRhcmdldHMsIHRleHR1cmVzIGFuZCBtYXRlcmlhbHMgY3JlYXRlZFxyXG5cdCAqIGJ5IHRoZSBwYXNzZXMuIEl0IGFsc28gZGVsZXRlcyB0aGlzIGNvbXBvc2VyJ3MgZnJhbWUgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IFtyZW5kZXJUYXJnZXRdIC0gQSBuZXcgcmVuZGVyIHRhcmdldC4gSWYgbm9uZSBpcyBwcm92aWRlZCwgdGhlIGNvbXBvc2VyIHdpbGwgYmVjb21lIGlub3BlcmF0aXZlLlxyXG5cdCAqL1xyXG5cclxuXHRkaXNwb3NlKHJlbmRlclRhcmdldCkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cclxuXHRcdGlmKHRoaXMucmVhZEJ1ZmZlciAhPT0gbnVsbCAmJiB0aGlzLndyaXRlQnVmZmVyICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIuZGlzcG9zZSgpO1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IG51bGw7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR3aGlsZShwYXNzZXMubGVuZ3RoID4gMCkge1xyXG5cclxuXHRcdFx0cGFzc2VzLnBvcCgpLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYocmVuZGVyVGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdC8vIFJlYW5pbWF0ZS5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyID0gcmVuZGVyVGFyZ2V0O1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLmNsb25lKCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHRoaXMuY29weVBhc3MuZGlzcG9zZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQ29yZSBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL2NvcmVcclxuICovXHJcblxyXG5leHBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCIuL2VmZmVjdC1jb21wb3Nlci5qc1wiO1xyXG4iLCIvKipcclxuICogRXhwb3N1cmUgb2YgdGhlIGxpYnJhcnkgY29tcG9uZW50cy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZ1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSBcIi4vY29yZVwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRCbG9vbVBhc3MsXHJcblx0Qmx1clBhc3MsXHJcblx0Qm9rZWhQYXNzLFxyXG5cdEJva2VoMlBhc3MsXHJcblx0Q2xlYXJQYXNzLFxyXG5cdENsZWFyTWFza1Bhc3MsXHJcblx0RGVwdGhQYXNzLFxyXG5cdERvdFNjcmVlblBhc3MsXHJcblx0RmlsbVBhc3MsXHJcblx0R2xpdGNoTW9kZSxcclxuXHRHbGl0Y2hQYXNzLFxyXG5cdEdvZFJheXNQYXNzLFxyXG5cdE1hc2tQYXNzLFxyXG5cdFBhc3MsXHJcblx0UGl4ZWxhdGlvblBhc3MsXHJcblx0UmVuZGVyUGFzcyxcclxuXHRTYXZlUGFzcyxcclxuXHRTaGFkZXJQYXNzLFxyXG5cdFNob2NrV2F2ZVBhc3MsXHJcblx0U01BQVBhc3MsXHJcblx0VGV4dHVyZVBhc3MsXHJcblx0VG9uZU1hcHBpbmdQYXNzXHJcbn0gZnJvbSBcIi4vcGFzc2VzXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdEFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsLFxyXG5cdEJva2VoTWF0ZXJpYWwsXHJcblx0Qm9rZWgyTWF0ZXJpYWwsXHJcblx0Q29tYmluZU1hdGVyaWFsLFxyXG5cdENvbnZvbHV0aW9uTWF0ZXJpYWwsXHJcblx0Q29weU1hdGVyaWFsLFxyXG5cdERlcHRoTWF0ZXJpYWwsXHJcblx0RG90U2NyZWVuTWF0ZXJpYWwsXHJcblx0RmlsbU1hdGVyaWFsLFxyXG5cdEdsaXRjaE1hdGVyaWFsLFxyXG5cdEdvZFJheXNNYXRlcmlhbCxcclxuXHRLZXJuZWxTaXplLFxyXG5cdEx1bWlub3NpdHlNYXRlcmlhbCxcclxuXHRQaXhlbGF0aW9uTWF0ZXJpYWwsXHJcblx0U2hvY2tXYXZlTWF0ZXJpYWwsXHJcblx0U01BQUJsZW5kTWF0ZXJpYWwsXHJcblx0U01BQUNvbG9yRWRnZXNNYXRlcmlhbCxcclxuXHRTTUFBV2VpZ2h0c01hdGVyaWFsLFxyXG5cdFRvbmVNYXBwaW5nTWF0ZXJpYWxcclxufSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuIiwiaW1wb3J0IHtcbiAgRWZmZWN0Q29tcG9zZXIsXG4gIFJlbmRlclBhc3MsXG4gIFNoYWRlclBhc3Ncbn0gZnJvbSAncG9zdHByb2Nlc3NpbmcnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbmNvbnN0IHBvbHlmaWxsID0gKG9iamVjdCwgbWV0aG9kLCBzaG93V2FybiA9IHRydWUpID0+IHtcbiAgaWYgKG9iamVjdFttZXRob2RdKSByZXR1cm47XG4gIGlmIChzaG93V2FybikgY29uc29sZS53YXJuKGBAUG9zdFByb2Nlc3Nvck1vZHVsZTogcGFzcy4ke21ldGhvZH0oKSB3YXMgbm90IGZvdW5kLmAsIG9iamVjdCk7XG4gIG9iamVjdFttZXRob2RdID0gKCkgPT4ge307XG59O1xuXG5leHBvcnQgY2xhc3MgUG9zdFByb2Nlc3Nvck1vZHVsZSB7XG4gIGN1cnJlbnRQYXNzID0gbnVsbDtcblxuICBkZWZlciA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHtkZWJ1Z30gPSB7ZGVidWc6IHRydWV9KSB7XG4gICAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3Bvc3Rwcm9jZXNzb3InKTtcblxuICAgIHRoaXMuZWZmZWN0cyA9IG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5lZmZlY3RzO1xuICAgIHRoaXMucmVuZGVyZXIgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcbiAgICB0aGlzLnNjZW5lID0gbWFuYWdlci5nZXQoJ3NjZW5lJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJyk7XG5cbiAgICB0aGlzLmNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHRoaXMucmVuZGVyZXIpO1xuXG4gICAgbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLnN0b3AoKTtcblxuICAgIGNvbnN0IGNvbXBvc2VyID0gdGhpcy5jb21wb3NlcjtcbiAgICB0aGlzLnJlbmRlckxvb3AgPSBuZXcgTG9vcChjbG9jayA9PiBjb21wb3Nlci5yZW5kZXIoY2xvY2suZ2V0RGVsdGEoKSkpLnN0YXJ0KG1hbmFnZXIuaGFuZGxlcik7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICByZW5kZXJlcjogcmVuZGVyZXIgPT4ge1xuICAgICAgICB0aGlzLmNvbXBvc2VyLnJlcGxhY2VSZW5kZXJlcihyZW5kZXJlcik7XG4gICAgICB9LFxuXG4gICAgICBzY2VuZTogc2NlbmUgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICB9LFxuXG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNvbHZlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHBhc3MgPSBuZXcgUmVuZGVyUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYS5uYXRpdmUpO1xuXG4gICAgICAvLyBUT0RPOiBTdXBwb3J0IGZvciBlZmZlY3RzLlxuXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gQVBJXG5cbiAgcGFzcyhwYXNzKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHBvbHlmaWxsKHBhc3MsICdzZXRTaXplJywgdGhpcy5kZWJ1Zyk7XG4gICAgICBwb2x5ZmlsbChwYXNzLCAnaW5pdGlhbGlzZScsIHRoaXMuZGVidWcpO1xuXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2hhZGVyKG1hdGVyaWFsLCB0ZXh0dXJlSUQgPSAncmVhZEJ1ZmZlcicpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKCFtYXRlcmlhbC51bmlmb3Jtc1t0ZXh0dXJlSURdKVxuICAgICAgICBtYXRlcmlhbC51bmlmb3Jtc1t0ZXh0dXJlSURdID0ge3ZhbHVlOiBudWxsfTtcblxuICAgICAgY29uc3QgcGFzcyA9IG5ldyBTaGFkZXJQYXNzKG1hdGVyaWFsLCB0ZXh0dXJlSUQpO1xuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFBhc3MgQVBJXG5cbiAgZ2V0KG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZVxuICAgICAgPyB0aGlzLmNvbXBvc2VyLnBhc3Nlcy5maWx0ZXIocGFzcyA9PiBwYXNzLm5hbWUgPT09IG5hbWUpWzBdXG4gICAgICA6IHRoaXMuY3VycmVudFBhc3M7XG4gIH1cblxuICB0byhuYW1lKSB7XG4gICAgdGhpcy5jdXJyZW50UGFzcyA9IG5hbWU7XG4gIH1cblxuICByZW5kZXJUb1NjcmVlbihib29sID0gdHJ1ZSkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzLnJlbmRlclRvU2NyZWVuID0gYm9vbDtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmFtZShuYW1lKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MubmFtZSA9IG5hbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50c1BhdGNoTW9kdWxlIHtcbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2V2ZW50cycpO1xuICAgIHRoaXMuZWxlbWVudCA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpLmRvbUVsZW1lbnQ7XG4gIH1cblxuICBwYXRjaEV2ZW50cyhvcmlnaW5PYmplY3QsIGRlc3RPYmplY3QsIGV2ZW50cyA9IFtdKSB7XG4gICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT5cbiAgICAgIG9yaWdpbk9iamVjdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBlID0+IGRlc3RPYmplY3QuZW1pdChldmVudCwgZSkpXG4gICAgKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgY29uc3Qge2VsZW1lbnQsIHBhdGNoRXZlbnRzfSA9IHNlbGY7XG5cbiAgICBwYXRjaEV2ZW50cyhlbGVtZW50LCB0aGlzLCBbXG4gICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICdtb3VzZXVwJyxcbiAgICAgICdjb250ZXh0bWVudScsXG4gICAgICAnbW91c2Vkb3duJyxcbiAgICAgICdjbGljaycsXG4gICAgICAnd2hlZWwnLFxuICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgJ3RvdWNoZW5kJyxcbiAgICAgICd0b3VjaG1vdmUnLFxuICAgICAgJ2tleWRvd24nXG4gICAgXSk7XG5cbiAgICBwYXRjaEV2ZW50cyhlbGVtZW50LCB0aGlzLCBbXG4gICAgICAna2V5ZG93bicsXG4gICAgICAna2V5dXAnLFxuICAgICAgJ2tleXByZXNzJ1xuICAgIF0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBWZWN0b3IyLFxuICBSYXljYXN0ZXIsXG4gIFBsYW5lLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IEV2ZW50cyBmcm9tICdtaW5pdmVudHMnO1xuaW1wb3J0IHtFdmVudHNQYXRjaE1vZHVsZX0gZnJvbSAnLi9FdmVudHNQYXRjaE1vZHVsZSc7XG5cbi8qKlxuICogQGNsYXNzIFZpcnR1YWxNb3VzZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtnbG9iYWxNb3ZlbWVudD1mYWxzZV1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleHRlbmRzIEV2ZW50c1xuICovXG5leHBvcnQgY2xhc3MgVmlydHVhbE1vdXNlTW9kdWxlIGV4dGVuZHMgRXZlbnRzIHtcbiAgbW91c2UgPSBuZXcgVmVjdG9yMigpO1xuICByYXljYXN0ZXIgPSBuZXcgUmF5Y2FzdGVyKCk7XG4gIHdvcmxkID0gbnVsbDtcbiAgY2FudmFzID0gbnVsbDtcbiAgcHJvamVjdGlvblBsYW5lID0gbmV3IFBsYW5lKG5ldyBWZWN0b3IzKDAsIDAsIDEpLCAwKTtcblxuICBjb25zdHJ1Y3RvcihnbG9iYWxNb3ZlbWVudCA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmdsb2JhbE1vdmVtZW50ID0gZ2xvYmFsTW92ZW1lbnQ7XG4gIH1cblxuICB1cGRhdGUoZSwgY3VzdG9tWCwgY3VzdG9tWSkge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHggPSBjdXN0b21YIHx8IGUuY2xpZW50WDtcbiAgICBjb25zdCB5ID0gY3VzdG9tWSB8fCBlLmNsaWVudFk7XG5cbiAgICB0aGlzLm1vdXNlLnggPSAoKHggLSByZWN0LmxlZnQpIC8gKHJlY3QucmlnaHQgLSByZWN0LmxlZnQpKSAqIDIgLSAxO1xuICAgIHRoaXMubW91c2UueSA9IC0oKHkgLSByZWN0LnRvcCkgLyAocmVjdC5ib3R0b20gLSByZWN0LnRvcCkpICogMiArIDE7XG5cbiAgICB0aGlzLnByb2plY3Rpb25QbGFuZS5ub3JtYWwuY29weSh0aGlzLmNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbigpKTtcblxuICAgIHRoaXMucmF5Y2FzdGVyLnNldEZyb21DYW1lcmEodGhpcy5tb3VzZSwgdGhpcy5jYW1lcmEpO1xuICAgIHRoaXMuZW1pdCgnbW92ZScpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ21vdXNlJyk7XG4gICAgbWFuYWdlci5yZXF1aXJlKCdldmVudHMnLCAoKSA9PiBuZXcgRXZlbnRzUGF0Y2hNb2R1bGUoKSk7XG5cbiAgICB0aGlzLmNhbnZhcyA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpLmRvbUVsZW1lbnQ7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBbXG4gICAgICAnY2xpY2snLFxuICAgICAgJ21vdXNlZG93bicsXG4gICAgICAnbW91c2V1cCcsXG4gICAgICAnbW91c2Vtb3ZlJ1xuICAgIF0uZm9yRWFjaChldiA9PiB0aGlzLm9uKGV2LCBlID0+IHNlbGYuZW1pdChldiwgZSkpKTtcblxuICAgIHNlbGYuZ2xvYmFsWCA9IDA7XG4gICAgc2VsZi5nbG9iYWxZID0gMDtcblxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnBvaW50ZXJMb2NrRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzZWxmLmdsb2JhbFggKz0gZS5tb3ZlbWVudFg7XG4gICAgICAgIHNlbGYuZ2xvYmFsWSArPSBlLm1vdmVtZW50WTtcblxuICAgICAgICBzZWxmLnVwZGF0ZShlLCBzZWxmLmdsb2JhbFgsIHNlbGYuZ2xvYmFsWSk7XG4gICAgICB9IGVsc2Ugc2VsZi51cGRhdGUoZSk7XG4gICAgfSk7XG4gIH1cblxuICB0cmFjayhjb21wb25lbnQpIHtcbiAgICBsZXQgaXNIb3ZlcmVkID0gZmFsc2U7XG5cbiAgICB0aGlzLm9uKCdtb3ZlJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaG92ZXJzKGNvbXBvbmVudCkpIHtcbiAgICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNlbW92ZScpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb21wb25lbnQuZW1pdCgnbW91c2VvdmVyJyk7XG4gICAgICAgICAgaXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0hvdmVyZWQpIHtcbiAgICAgICAgY29tcG9uZW50LmVtaXQoJ21vdXNlb3V0Jyk7XG4gICAgICAgIGlzSG92ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnY2xpY2snKTtcbiAgICAgIGVsc2UgY29tcG9uZW50LmVtaXQoJ29mZkNsaWNrJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2Vkb3duJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNldXAnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbihjb21wb25lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0KGNvbXBvbmVudC5uYXRpdmUpO1xuICB9XG5cbiAgcHJvamVjdChwbGFuZSA9IHRoaXMucHJvamVjdGlvblBsYW5lKSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RQbGFuZShwbGFuZSk7XG4gIH1cblxuICBob3ZlcnMoY29tcG9uZW50KSB7XG4gICAgY29uc3QgaW50ZXJzZWN0aW9uID0gdGhpcy5pbnRlcnNlY3Rpb24oY29tcG9uZW50KVswXTtcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uID8gaW50ZXJzZWN0aW9uLm9iamVjdCA9PT0gY29tcG9uZW50Lm5hdGl2ZSA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0IHJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIucmF5O1xuICB9XG5cbiAgZ2V0IHgoKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2UueDtcbiAgfVxuXG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlLnk7XG4gIH1cbn1cbiIsImltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xuICBzdGF0aWMgZnJvbShjb250cm9scykge1xuICAgIHJldHVybiBuZXcgQ29udHJvbHNNb2R1bGUoe2NvbnRyb2xzfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICBmaXg6IGNvbnRyb2xzID0+IGNvbnRyb2xzLFxuXG4gICAgICB1cGRhdGUoYykge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgfVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5wYXJhbXMuY29udHJvbHM7XG4gICAgdGhpcy51cGRhdGUgPSB0aGlzLnBhcmFtcy51cGRhdGU7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnJlcXVpcmUoJ2V2ZW50cycsICgpID0+IG5ldyBFdmVudHNQYXRjaE1vZHVsZSgpKTtcbiAgfVxuXG4gIHNldENvbnRyb2xzKGNvbnRyb2xzKSB7XG4gICAgdGhpcy5jb250cm9scyA9IGNvbnRyb2xzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VXBkYXRlKHVwZGF0ZSkge1xuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLnVwZGF0ZUxvb3AgPSBuZXcgTG9vcChzZWxmLnVwZGF0ZS5iaW5kKHNlbGYpKTtcbiAgICBzZWxmLnVwZGF0ZUxvb3Auc3RhcnQodGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEZvZ0V4cDIsXG4gIEZvZ1xufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIEZvZ01vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17Y29sb3I6IDB4ZWZkMWI1LCBkZW5zaXR5OiAwLjAyMCwgbmVhcjogMTAsIGZhcjogMTAwMH1dIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlPWV4cDJdIC0gVGhlIHR5cGUgb2YgZm9nIC0gZXhwMiBvciBsaW5lYXJcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkhvdyB0byBjcmVhdGUgYW5kIGFwcGx5IGEgRm9nTW9kdWxlPC9jYXB0aW9uPlxuICogY29uc3QgZm9nTW9kdWxlID0gbmV3IEZvZ01vZHVsZSh7XG4gKiAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICBkZW5zaXR5OiAwLjAzLFxuICogICAgbmVhcjogMjAsXG4gKiAgICBmYXI6IDIwMFxuICogIH0sICdleHAyJyk7XG4gKlxuICogbmV3IEFwcChbXG4gKiAgLi4uLFxuICogIGZvZ01vZHVsZVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBGb2dNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgdHlwZSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb2xvcjogMHhlZmQxYjUsXG4gICAgICBkZW5zaXR5OiAwLjAyMCxcbiAgICAgIG5lYXI6IDEwLFxuICAgICAgZmFyOiAxMDAwXG4gICAgfSwgcGFyYW1zKTtcbiAgICBpZiAoIXR5cGUgfHwgdHlwZSA9PT0gJ2V4cDInKSB0aGlzLmZvZyA9IG5ldyBGb2dFeHAyKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5kZW5zaXR5KTtcbiAgICBlbHNlIGlmICh0eXBlID09PSAnbGluZWFyJykgdGhpcy5mb2cgPSBuZXcgRm9nKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5uZWFyLCB0aGlzLnBhcmFtcy5mYXIpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2ZvZycsIHRoaXMuZm9nKTtcbiAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKS5mb2cgPSB0aGlzLmZvZztcbiAgfVxufVxuIiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuXG5jb25zdCBpc0VxdWFsRGVmYXVsdCA9IChhLCBiKSA9PiB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgZWxzZSBpZiAoYSAmJiBhLmVxdWFscyAmJiBhLmVxdWFscyhiKSkgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBAY2xhc3MgU3RhdGVNb2R1bGVcbiAqIEBkZXNjcmlwdGlvbiBgU3RhdGVNb2R1bGVgIGlzIHVzZWZ1bCBmb3IgYXBwcywgd2hlcmUgeW91IG5lZWQgc3RhdGUgbWFuaXB1bGF0aW9uLlxuICogVGhpcyBjYW4gYmU6IF90cmFuc2l0aW9ucyBiZXR3ZWVuIHNjcmVlbnMsIGdhbWVzLCBkZXZlbG9wbWVudCBtb21lbnRzXy5cbiAqIFlvdSBjYW4gY2hlY2sgW2Jhc2ljL3N0YXRlXShodHRwczovL3docy1kZXYuc3VyZ2Uuc2gvZXhhbXBsZXMvP2Jhc2ljL3N0YXRlKSBleGFtcGxlLlxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIHN0YXRlIG1vZHVsZTwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICAvLyAuLi5cbiAqICAgbmV3IFN0YXRlTW9kdWxlKCkuZGVmYXVsdCh7XG4gKiAgICAgc3BoZXJlQ29sb3I6IDB4ZmYwMDAwXG4gKiAgIH0pXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlTW9kdWxlIHtcbiAgc3RhdGljIGFjdGlvbkdlbmVyYXRlKGlzRXF1YWwpIHtcbiAgICByZXR1cm4gKHN0YXRlID0gW3t9LCAnJ10sIHtrZXksIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoaXNFcXVhbChzdGF0ZVswXVtrZXldLCBkYXRhKSkgcmV0dXJuIHN0YXRlO1xuXG4gICAgICBzdGF0ZVswXVtrZXldID0gZGF0YTtcbiAgICAgIHN0YXRlWzFdID0ga2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVxdWFsQ2hlY2sgPSBpc0VxdWFsRGVmYXVsdCkge1xuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAgIFN0YXRlTW9kdWxlLmFjdGlvbkdlbmVyYXRlKGVxdWFsQ2hlY2spXG4gICAgKTtcblxuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHt9O1xuICAgIHRoaXMuY3VycmVudENvbmZpZyA9ICdkZWZhdWx0JztcbiAgICB0aGlzLnByZXZDb25maWcgPSAnZGVmYXVsdCc7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZhdWx0XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHNldHVwXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogbmV3IFdIUy5TdGF0ZU1vZHVsZSgpLmRlZmF1bHQoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiBVVElMUy4kY29sb3JzLm1lc2gsXG4gICAqICAgcGxhbmVDb2xvcjogMHg0NDdGOEJcbiAgICogfSlcbiAgICovXG4gIGRlZmF1bHQoZGF0YSkge1xuICAgIHRoaXMuY29uZmlnKHtkZWZhdWx0OiBkYXRhfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRFcXVhbENoZWNrXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIGFuIGVxdWFsQ2hlY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBzZXR1cFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBzZXRFcXVhbENoZWNrKGZ1bmMpIHtcbiAgICB0aGlzLnN0b3JlLnJlcGxhY2VSZWR1Y2VyKFxuICAgICAgU3RhdGVNb2R1bGUuYWN0aW9uR2VuZXJhdGUoZnVuYylcbiAgICApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3N0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb25maWdcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgY29uZmlndXJhdGlvbnMgZnJvbSBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdzIENvbmZpZ3VyYXRpb24gZGF0YVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBBZGRpbmcgYGdyZWVuYCBjb25maWd1cmF0aW9uPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS5jb25maWcoe1xuICAgKiAgIGdyZWVuOiB7XG4gICAqICAgICBzcGhlcmVDb2xvcjogMHgwMGZmMDAsXG4gICAqICAgICBwbGFuZUNvbG9yOiAweDAwZmYwMFxuICAgKiAgIH1cbiAgICogfSk7XG4gICAqL1xuICBjb25maWcoY29uZmlncykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ3MpIHtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uW2tleV0gPSBrZXkgPT09ICdkZWZhdWx0J1xuICAgICAgICAgID8gY29uZmlnc1trZXldXG4gICAgICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3VyYXRpb24uZGVmYXVsdCwgY29uZmlnc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgdXBkYXRlcyBmcm9tIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZXMgVXBkYXRlcyBkYXRhXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IFVwZGF0ZSBjYWxsYmFjayBmb3IgYHNwaGVyZUNvbG9yYDwvY2FwdGlvbj5cbiAgICogc3RhdGUudXBkYXRlKHtcbiAgICogICBzcGhlcmVDb2xvcjogY29sb3IgPT4gc3BoZXJlLm1hdGVyaWFsLmNvbG9yLnNldEhleChjb2xvcilcbiAgICogfSk7XG4gICAqL1xuICB1cGRhdGUodXBkYXRlcyA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB1cGRhdGVzW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdG9cbiAgICogQGRlc2NyaXB0aW9uIFN3aXRjaCB0byBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnTmFtZSBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IENoYW5nZXMgY29uZmlndXJhdGlvbiB0byBgZ3JlZW5gPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS50bygnZ3JlZW4nKTtcbiAgICovXG4gIHRvKGNvbmZpZ05hbWUpIHtcbiAgICB0aGlzLnByZXZDb25maWcgPSB0aGlzLmN1cnJlbnRDb25maWc7XG4gICAgdGhpcy5jdXJyZW50Q29uZmlnID0gY29uZmlnTmFtZTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgPyB0aGlzLmNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgIDogdGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHQ7XG5cbiAgICB0aGlzLnNldChjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgY3VycmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogc3RhdGUuc2V0KHtcbiAgICogICBzcGhlcmVDb2xvcjogMHgwMGZmMDBcbiAgICogfSk7XG4gICAqL1xuICBzZXQoZGF0YSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpXG4gICAgICBpZiAoa2V5KSB0aGlzLnN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnQUREJywga2V5LCBkYXRhOiBkYXRhW2tleV19KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGRhdGEgb2YgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFBhcmFtZXRlciBuYW1lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIHN0YXRlLmdldCgnc3BoZXJlQ29sb3InKTsgLy8gMHgwMGZmMDBcbiAgICovXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwcmV2XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIHByZXZpb3VzIGNvbmZpZ3VyYXRpb24sIGluIG90aGVyIGNhc2UgLSByZXR1cm4gYGZhbHNlVmFsYC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZyBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7QW55fSB0cnVlVmFsIFZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyB0cnV0aHkuXG4gICAqIEBwYXJhbSB7QW55fSBmYWxzZVZhbCBDVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIGZhbHN5LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBwcmV2KGNvbmZpZywgdHJ1ZVZhbCwgZmFsc2VWYWwpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2Q29uZmlnID09PSBjb25maWcgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjdXJyZW50XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIGN1cnJlbnQgY29uZmlndXJhdGlvbiwgaW4gb3RoZXIgY2FzZSAtIHJldHVybiBgZmFsc2VWYWxgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQHBhcmFtIHtBbnl9IHRydWVWYWwgVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIHRydXRoeS5cbiAgICogQHBhcmFtIHtBbnl9IGZhbHNlVmFsIENWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgZmFsc3kuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIGN1cnJlbnQoY29uZmlnLCB0cnVlVmFsLCBmYWxzZVZhbCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDb25maWcgPT09IGNvbmZpZyA/IHRydWVWYWwgOiBmYWxzZVZhbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTU9VU0UsXG4gIFF1YXRlcm5pb24sXG4gIFNwaGVyaWNhbCxcbiAgVmVjdG9yMixcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIE9ydGhvZ3JhcGhpY0NhbWVyYSxcbiAgRXZlbnREaXNwYXRjaGVyLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuLy8gVGhpcyBzZXQgb2YgY29udHJvbHMgcGVyZm9ybXMgb3JiaXRpbmcsIGRvbGx5aW5nICh6b29taW5nKSwgYW5kIHBhbm5pbmcuXG4vLyBVbmxpa2UgVHJhY2tiYWxsQ29udHJvbHMsIGl0IG1haW50YWlucyB0aGUgXCJ1cFwiIGRpcmVjdGlvbiBvYmplY3QudXAgKCtZIGJ5IGRlZmF1bHQpLlxuLy9cbi8vICAgIE9yYml0IC0gbGVmdCBtb3VzZSAvIHRvdWNoOiBvbmUgZmluZ2VyIG1vdmVcbi8vICAgIFpvb20gLSBtaWRkbGUgbW91c2UsIG9yIG1vdXNld2hlZWwgLyB0b3VjaDogdHdvIGZpbmdlciBzcHJlYWQgb3Igc3F1aXNoXG4vLyAgICBQYW4gLSByaWdodCBtb3VzZSwgb3IgYXJyb3cga2V5cyAvIHRvdWNoOiB0aHJlZSBmaW50ZXIgc3dpcGVcblxuZXhwb3J0IGNsYXNzIFRocmVlT3JiaXRDb250cm9scyBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCwgZG9tRWxlbWVudCwgZXZlbnRIYW5kbGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gKGRvbUVsZW1lbnQgPT09IHVuZGVmaW5lZCkgPyBkb2N1bWVudCA6IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBldmVudEhhbmRsZXI7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGNvbnRyb2xcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLy8gXCJ0YXJnZXRcIiBzZXRzIHRoZSBsb2NhdGlvbiBvZiBmb2N1cywgd2hlcmUgdGhlIG9iamVjdCBvcmJpdHMgYXJvdW5kXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIGRvbGx5IGluIGFuZCBvdXQgKCBQZXJzcGVjdGl2ZUNhbWVyYSBvbmx5IClcbiAgICB0aGlzLm1pbkRpc3RhbmNlID0gMDtcbiAgICB0aGlzLm1heERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gem9vbSBpbiBhbmQgb3V0ICggT3J0aG9ncmFwaGljQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluWm9vbSA9IDA7XG4gICAgdGhpcy5tYXhab29tID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgdmVydGljYWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBSYW5nZSBpcyAwIHRvIE1hdGguUEkgcmFkaWFucy5cbiAgICB0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IGhvcml6b250YWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBJZiBzZXQsIG11c3QgYmUgYSBzdWItaW50ZXJ2YWwgb2YgdGhlIGludGVydmFsIFsgLSBNYXRoLlBJLCBNYXRoLlBJIF0uXG4gICAgdGhpcy5taW5BemltdXRoQW5nbGUgPSAtSW5maW5pdHk7IC8vIHJhZGlhbnNcbiAgICB0aGlzLm1heEF6aW11dGhBbmdsZSA9IEluZmluaXR5OyAvLyByYWRpYW5zXG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBlbmFibGUgZGFtcGluZyAoaW5lcnRpYSlcbiAgICAvLyBJZiBkYW1waW5nIGlzIGVuYWJsZWQsIHlvdSBtdXN0IGNhbGwgY29udHJvbHMudXBkYXRlKCkgaW4geW91ciBhbmltYXRpb24gbG9vcFxuICAgIHRoaXMuZW5hYmxlRGFtcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZGFtcGluZ0ZhY3RvciA9IDAuMjU7XG5cbiAgICAvLyBUaGlzIG9wdGlvbiBhY3R1YWxseSBlbmFibGVzIGRvbGx5aW5nIGluIGFuZCBvdXQ7IGxlZnQgYXMgXCJ6b29tXCIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHpvb21pbmdcbiAgICB0aGlzLmVuYWJsZVpvb20gPSB0cnVlO1xuICAgIHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcm90YXRpbmdcbiAgICB0aGlzLmVuYWJsZVJvdGF0ZSA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHBhbm5pbmdcbiAgICB0aGlzLmVuYWJsZVBhbiA9IHRydWU7XG4gICAgdGhpcy5rZXlQYW5TcGVlZCA9IDcuMDsgLy8gcGl4ZWxzIG1vdmVkIHBlciBhcnJvdyBrZXkgcHVzaFxuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gYXV0b21hdGljYWxseSByb3RhdGUgYXJvdW5kIHRoZSB0YXJnZXRcbiAgICAvLyBJZiBhdXRvLXJvdGF0ZSBpcyBlbmFibGVkLCB5b3UgbXVzdCBjYWxsIGNvbnRyb2xzLnVwZGF0ZSgpIGluIHlvdXIgYW5pbWF0aW9uIGxvb3BcbiAgICB0aGlzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9Sb3RhdGVTcGVlZCA9IDIuMDsgLy8gMzAgc2Vjb25kcyBwZXIgcm91bmQgd2hlbiBmcHMgaXMgNjBcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHVzZSBvZiB0aGUga2V5c1xuICAgIHRoaXMuZW5hYmxlS2V5cyA9IHRydWU7XG5cbiAgICAvLyBUaGUgZm91ciBhcnJvdyBrZXlzXG4gICAgdGhpcy5rZXlzID0ge0xFRlQ6IDM3LCBVUDogMzgsIFJJR0hUOiAzOSwgQk9UVE9NOiA0MH07XG5cbiAgICAvLyBNb3VzZSBidXR0b25zXG4gICAgdGhpcy5tb3VzZUJ1dHRvbnMgPSB7T1JCSVQ6IE1PVVNFLkxFRlQsIFpPT006IE1PVVNFLk1JRERMRSwgUEFOOiBNT1VTRS5SSUdIVH07XG5cbiAgICAvLyBmb3IgcmVzZXRcbiAgICB0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLnpvb20wID0gdGhpcy5vYmplY3Quem9vbTtcblxuICAgIC8vXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvL1xuXG4gICAgdGhpcy5nZXRQb2xhckFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC5waGk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QXppbXV0aGFsQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gc3BoZXJpY2FsLnRoZXRhO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy50YXJnZXQuY29weSh0aGlzLnRhcmdldDApO1xuICAgICAgdGhpcy5vYmplY3QucG9zaXRpb24uY29weSh0aGlzLnBvc2l0aW9uMCk7XG4gICAgICB0aGlzLm9iamVjdC56b29tID0gdGhpcy56b29tMDtcblxuICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICAvLyB0aGlzIG1ldGhvZCBpcyBleHBvc2VkLCBidXQgcGVyaGFwcyBpdCB3b3VsZCBiZSBiZXR0ZXIgaWYgd2UgY2FuIG1ha2UgaXQgcHJpdmF0ZS4uLlxuICAgIHRoaXMudXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgLy8gc28gY2FtZXJhLnVwIGlzIHRoZSBvcmJpdCBheGlzXG4gICAgICBjb25zdCBxdWF0ID0gbmV3IFF1YXRlcm5pb24oKS5zZXRGcm9tVW5pdFZlY3RvcnMob2JqZWN0LnVwLCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XG4gICAgICBjb25zdCBxdWF0SW52ZXJzZSA9IHF1YXQuY2xvbmUoKS5pbnZlcnNlKCk7XG5cbiAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XG4gICAgICBjb25zdCBsYXN0UXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG5cbiAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG4gICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO1xuXG4gICAgICAgIC8vIHJvdGF0ZSBvZmZzZXQgdG8gXCJ5LWF4aXMtaXMtdXBcIiBzcGFjZVxuICAgICAgICBvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKHF1YXQpO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20gei1heGlzIGFyb3VuZCB5LWF4aXNcbiAgICAgICAgc3BoZXJpY2FsLnNldEZyb21WZWN0b3IzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1JvdGF0ZSAmJiBzdGF0ZSA9PT0gU1RBVEUuTk9ORSlcbiAgICAgICAgICByb3RhdGVMZWZ0KGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC50aGV0YSArPSBzcGhlcmljYWxEZWx0YS50aGV0YTtcbiAgICAgICAgc3BoZXJpY2FsLnBoaSArPSBzcGhlcmljYWxEZWx0YS5waGk7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgdGhldGEgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwudGhldGEgPSBNYXRoLm1heCh0aGlzLm1pbkF6aW11dGhBbmdsZSwgTWF0aC5taW4odGhpcy5tYXhBemltdXRoQW5nbGUsIHNwaGVyaWNhbC50aGV0YSkpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC5waGkgPSBNYXRoLm1heCh0aGlzLm1pblBvbGFyQW5nbGUsIE1hdGgubWluKHRoaXMubWF4UG9sYXJBbmdsZSwgc3BoZXJpY2FsLnBoaSkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5tYWtlU2FmZSgpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5yYWRpdXMgKj0gc2NhbGU7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgcmFkaXVzIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnJhZGl1cyA9IE1hdGgubWF4KHRoaXMubWluRGlzdGFuY2UsIE1hdGgubWluKHRoaXMubWF4RGlzdGFuY2UsIHNwaGVyaWNhbC5yYWRpdXMpKTtcblxuICAgICAgICAvLyBtb3ZlIHRhcmdldCB0byBwYW5uZWQgbG9jYXRpb25cbiAgICAgICAgdGhpcy50YXJnZXQuYWRkKHBhbk9mZnNldCk7XG5cbiAgICAgICAgb2Zmc2V0LnNldEZyb21TcGhlcmljYWwoc3BoZXJpY2FsKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0SW52ZXJzZSk7XG5cbiAgICAgICAgcG9zaXRpb24uY29weSh0aGlzLnRhcmdldCkuYWRkKG9mZnNldCk7XG5cbiAgICAgICAgdGhpcy5vYmplY3QubG9va0F0KHRoaXMudGFyZ2V0KTtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVEYW1waW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgKj0gKDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAqPSAoMSAtIHRoaXMuZGFtcGluZ0ZhY3Rvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnNldCgwLCAwLCAwKTtcblxuICAgICAgICBzY2FsZSA9IDE7XG4gICAgICAgIHBhbk9mZnNldC5zZXQoMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGNvbmRpdGlvbiBpczpcbiAgICAgICAgLy8gbWluKGNhbWVyYSBkaXNwbGFjZW1lbnQsIGNhbWVyYSByb3RhdGlvbiBpbiByYWRpYW5zKV4yID4gRVBTXG4gICAgICAgIC8vIHVzaW5nIHNtYWxsLWFuZ2xlIGFwcHJveGltYXRpb24gY29zKHgvMikgPSAxIC0geF4yIC8gOFxuXG4gICAgICAgIGlmICh6b29tQ2hhbmdlZFxuICAgICAgICAgIHx8IGxhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZCh0aGlzLm9iamVjdC5wb3NpdGlvbikgPiBFUFNcbiAgICAgICAgICB8fCA4ICogKDEgLSBsYXN0UXVhdGVybmlvbi5kb3QodGhpcy5vYmplY3QucXVhdGVybmlvbikpID4gRVBTKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgICAgIGxhc3RQb3NpdGlvbi5jb3B5KHRoaXMub2JqZWN0LnBvc2l0aW9uKTtcbiAgICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pO1xuICAgICAgICAgIHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcblxuICAgICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNwb3NlJyB9ICk7IC8vIHNob3VsZCB0aGlzIGJlIGFkZGVkIGhlcmU/XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gaW50ZXJuYWxzXG4gICAgLy9cblxuICAgIGNvbnN0IGNoYW5nZUV2ZW50ID0ge3R5cGU6ICdjaGFuZ2UnfTtcbiAgICBjb25zdCBzdGFydEV2ZW50ID0ge3R5cGU6ICdzdGFydCd9O1xuICAgIGNvbnN0IGVuZEV2ZW50ID0ge3R5cGU6ICdlbmQnfTtcblxuICAgIGNvbnN0IFNUQVRFID0ge05PTkU6IC0xLCBST1RBVEU6IDAsIERPTExZOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfRE9MTFk6IDQsIFRPVUNIX1BBTjogNX07XG5cbiAgICBsZXQgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgY29uc3QgRVBTID0gMC4wMDAwMDE7XG5cbiAgICAvLyBjdXJyZW50IHBvc2l0aW9uIGluIHNwaGVyaWNhbCBjb29yZGluYXRlc1xuICAgIGNvbnN0IHNwaGVyaWNhbCA9IG5ldyBTcGhlcmljYWwoKTtcbiAgICBjb25zdCBzcGhlcmljYWxEZWx0YSA9IG5ldyBTcGhlcmljYWwoKTtcblxuICAgIGxldCBzY2FsZSA9IDE7XG4gICAgY29uc3QgcGFuT2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcbiAgICBsZXQgem9vbUNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJvdGF0ZVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IHBhblN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5FbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbkRlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGRvbGx5U3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBkb2xseURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGdldEF1dG9Sb3RhdGlvbkFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC8gNjAgLyA2MCAqIHRoaXMuYXV0b1JvdGF0ZVNwZWVkO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRab29tU2NhbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coMC45NSwgdGhpcy56b29tU3BlZWQpO1xuICAgIH07XG5cbiAgICBjb25zdCByb3RhdGVMZWZ0ID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgLT0gYW5nbGU7XG4gICAgfTtcblxuICAgIGNvbnN0IHJvdGF0ZVVwID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEucGhpIC09IGFuZ2xlO1xuICAgIH07XG5cbiAgICBjb25zdCBwYW5MZWZ0ID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRpc3RhbmNlLCBvYmplY3RNYXRyaXgpID0+IHtcbiAgICAgICAgdi5zZXRGcm9tTWF0cml4Q29sdW1uKG9iamVjdE1hdHJpeCwgMCk7IC8vIGdldCBYIGNvbHVtbiBvZiBvYmplY3RNYXRyaXhcbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcigtZGlzdGFuY2UpO1xuICAgICAgICBwYW5PZmZzZXQuYWRkKHYpO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcGFuVXAgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGlzdGFuY2UsIG9iamVjdE1hdHJpeCkgPT4ge1xuICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAxKTsgLy8gZ2V0IFkgY29sdW1uIG9mIG9iamVjdE1hdHJpeFxuICAgICAgICB2Lm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8vIGRlbHRhWCBhbmQgZGVsdGFZIGFyZSBpbiBwaXhlbHM7IHJpZ2h0IGFuZCBkb3duIGFyZSBwb3NpdGl2ZVxuICAgIGNvbnN0IHBhbiA9ICgoKSA9PiB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRlbHRhWCwgZGVsdGFZKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICAgICAgICAvLyBwZXJzcGVjdGl2ZVxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XG4gICAgICAgICAgb2Zmc2V0LmNvcHkocG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCk7XG4gICAgICAgICAgbGV0IHRhcmdldERpc3RhbmNlID0gb2Zmc2V0Lmxlbmd0aCgpO1xuXG4gICAgICAgICAgLy8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXG4gICAgICAgICAgdGFyZ2V0RGlzdGFuY2UgKj0gTWF0aC50YW4oKHRoaXMub2JqZWN0LmZvdiAvIDIpICogTWF0aC5QSSAvIDE4MC4wKTtcblxuICAgICAgICAgIC8vIHdlIGFjdHVhbGx5IGRvbid0IHVzZSBzY3JlZW5XaWR0aCwgc2luY2UgcGVyc3BlY3RpdmUgY2FtZXJhIGlzIGZpeGVkIHRvIHNjcmVlbiBoZWlnaHRcbiAgICAgICAgICBwYW5MZWZ0KDIgKiBkZWx0YVggKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKDIgKiBkZWx0YVkgKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gb3J0aG9ncmFwaGljXG4gICAgICAgICAgcGFuTGVmdChkZWx0YVggKiAodGhpcy5vYmplY3QucmlnaHQgLSB0aGlzLm9iamVjdC5sZWZ0KSAvIHRoaXMub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudFdpZHRoLCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKGRlbHRhWSAqICh0aGlzLm9iamVjdC50b3AgLSB0aGlzLm9iamVjdC5ib3R0b20pIC8gdGhpcy5vYmplY3Quem9vbSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNhbWVyYSBuZWl0aGVyIG9ydGhvZ3JhcGhpYyBub3IgcGVyc3BlY3RpdmVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIHBhbiBkaXNhYmxlZC4nKTtcbiAgICAgICAgICB0aGlzLmVuYWJsZVBhbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBkb2xseUluID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgLz0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tICogZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGRvbGx5T3V0ID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgKj0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tIC8gZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gZXZlbnQgY2FsbGJhY2tzIC0gdXBkYXRlIHRoZSBvYmplY3Qgc3RhdGVcbiAgICAvL1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25Sb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93bkRvbGx5JyApO1xuXG4gICAgICBkb2xseVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25QYW4nICk7XG5cbiAgICAgIHBhblN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQpO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXG4gICAgICByb3RhdGVMZWZ0KDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgLy8gcm90YXRpbmcgdXAgYW5kIGRvd24gYWxvbmcgd2hvbGUgc2NyZWVuIGF0dGVtcHRzIHRvIGdvIDM2MCwgYnV0IGxpbWl0ZWQgdG8gMTgwXG4gICAgICByb3RhdGVVcCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICByb3RhdGVTdGFydC5jb3B5KHJvdGF0ZUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZURvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVEb2xseScgKTtcblxuICAgICAgZG9sbHlFbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZG9sbHlTdGFydC5jb3B5KGRvbGx5RW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVQYW4nICk7XG5cbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCk7XG5cbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcblxuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVVwJyApO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVdoZWVsID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVdoZWVsJyApO1xuXG4gICAgICBpZiAoZXZlbnQuZGVsdGFZIDwgMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChldmVudC5kZWx0YVkgPiAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlS2V5RG93bicgKTtcblxuICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLlVQOlxuICAgICAgICAgIHBhbigwLCB0aGlzLmtleVBhblNwZWVkKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLkJPVFRPTTpcbiAgICAgICAgICBwYW4oMCwgLXRoaXMua2V5UGFuU3BlZWQpO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuTEVGVDpcbiAgICAgICAgICBwYW4odGhpcy5rZXlQYW5TcGVlZCwgMCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5SSUdIVDpcbiAgICAgICAgICBwYW4oLXRoaXMua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydFJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlU3RhcnQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnREb2xseScgKTtcblxuICAgICAgY29uc3QgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgZG9sbHlTdGFydC5zZXQoMCwgZGlzdGFuY2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0UGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0UGFuJyApO1xuXG4gICAgICBwYW5TdGFydC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZVJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgcm90YXRlVXAoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgcm90YXRlU3RhcnQuY29weShyb3RhdGVFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVEb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlRG9sbHknICk7XG5cbiAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGRvbGx5RW5kLnNldCgwLCBkaXN0YW5jZSk7XG5cbiAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XG5cbiAgICAgIGlmIChkb2xseURlbHRhLnkgPiAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBkb2xseVN0YXJ0LmNvcHkoZG9sbHlFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZVBhbicgKTtcblxuICAgICAgcGFuRW5kLnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcblxuICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyhwYW5FbmQsIHBhblN0YXJ0KTtcblxuICAgICAgcGFuKHBhbkRlbHRhLngsIHBhbkRlbHRhLnkpO1xuXG4gICAgICBwYW5TdGFydC5jb3B5KHBhbkVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoRW5kID0gKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaEVuZCcgKTtcbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBldmVudCBoYW5kbGVycyAtIEZTTTogbGlzdGVuIGZvciBldmVudHMgYW5kIHJlc2V0IHN0YXRlXG4gICAgLy9cblxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuT1JCSVQpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93blJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5ST1RBVEU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuWk9PTSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93bkRvbGx5KGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLkRPTExZO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLlBBTikge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duUGFuKGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlBBTjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5OT05FKSB7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlUm90YXRlKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFNUQVRFLkRPTExZKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlRG9sbHkoZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVQYW4oZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlVXAgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVNb3VzZVVwKGV2ZW50KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlV2hlZWwgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlIHx8IChzdGF0ZSAhPT0gU1RBVEUuTk9ORSAmJiBzdGF0ZSAhPT0gU1RBVEUuUk9UQVRFKSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGhhbmRsZU1vdXNlV2hlZWwoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7IC8vIG5vdCBzdXJlIHdoeSB0aGVzZSBhcmUgaGVyZS4uLlxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVLZXlzID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlS2V5RG93bihldmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hTdGFydCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnREb2xseShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX0RPTExZO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0UGFuKGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUEFOO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLk5PTkUpXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaE1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUk9UQVRFKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUm90YXRlKGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX0RPTExZKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlRG9sbHkoZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9QQU4pIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVQYW4oZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoRW5kID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlVG91Y2hFbmQoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ29udGV4dE1lbnUgPSBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICAvL1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBnZXQgY2VudGVyKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmNlbnRlciBoYXMgYmVlbiByZW5hbWVkIHRvIC50YXJnZXQnKTtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQ7XG4gIH1cblxuICBnZXQgbm9ab29tKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vWm9vbSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVpvb20gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlWm9vbTtcbiAgfVxuXG4gIHNldCBub1pvb20odmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVab29tID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vUm90YXRlKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVJvdGF0ZTtcbiAgfVxuXG4gIHNldCBub1JvdGF0ZSh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVSb3RhdGUgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9QYW4oKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlUGFuO1xuICB9XG5cbiAgc2V0IG5vUGFuKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVBhbiA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub0tleXMoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9LZXlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlS2V5cyBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVLZXlzO1xuICB9XG5cbiAgc2V0IG5vS2V5cyh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vS2V5cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZUtleXMgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZUtleXMgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgc3RhdGljTW92aW5nKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlRGFtcGluZztcbiAgfVxuXG4gIHNldCBzdGF0aWNNb3ZpbmcodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5zdGF0aWNNb3ZpbmcgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVEYW1waW5nIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVEYW1waW5nID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IGR5bmFtaWNEYW1waW5nRmFjdG9yKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmR5bmFtaWNEYW1waW5nRmFjdG9yIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSAuZGFtcGluZ0ZhY3RvciBpbnN0ZWFkLicpO1xuICAgIHJldHVybiB0aGlzLmRhbXBpbmdGYWN0b3I7XG4gIH1cblxuICBzZXQgZHluYW1pY0RhbXBpbmdGYWN0b3IodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5keW5hbWljRGFtcGluZ0ZhY3RvciBoYXMgYmVlbiByZW5hbWVkLiBVc2UgLmRhbXBpbmdGYWN0b3IgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSB2YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbnRyb2xzTW9kdWxlfSBmcm9tICcuLi9Db250cm9sc01vZHVsZSc7XG5cbmltcG9ydCB7VGhyZWVPcmJpdENvbnRyb2xzfSBmcm9tICcuL2xpYi9UaHJlZU9yYml0Q29udHJvbHMnO1xuXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc01vZHVsZSBleHRlbmRzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGZvbGxvdzogZmFsc2UsXG4gICAgICBvYmplY3Q6IG51bGwsXG4gICAgICB0YXJnZXQ6IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gICAgfSwgcGFyYW1zKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIHN1cGVyLm1hbmFnZXIobWFuYWdlcik7XG5cbiAgICBjb25zdCB7b2JqZWN0OiBvYmosIGZvbGxvdywgdGFyZ2V0fSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IG9iamVjdCA9IG9iaiA/IG9iai5uYXRpdmUgOiBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlO1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgVGhyZWVPcmJpdENvbnRyb2xzKFxuICAgICAgb2JqZWN0LFxuICAgICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKSxcbiAgICAgIG1hbmFnZXIuaGFuZGxlclxuICAgICk7XG5cbiAgICBjb25zdCB1cGRhdGVQcm9jZXNzb3IgPSBmb2xsb3cgPyBjID0+IHtcbiAgICAgIGNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgICB9IDogYyA9PiB7XG4gICAgICBjb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDb250cm9scyhjb250cm9scyk7XG4gICAgdGhpcy5zZXRVcGRhdGUodXBkYXRlUHJvY2Vzc29yKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgaWYgKG9iaikgcmV0dXJuO1xuICAgICAgICBjb250cm9scy5vYmplY3QgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9hcHAvY29udHJvbHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vT3JiaXRDb250cm9sc01vZHVsZSc7XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL2FwcCAqL1xuZXhwb3J0ICogZnJvbSAnLi9FbGVtZW50TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUmVuZGVyaW5nTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vU2NlbmVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXNpemVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb3N0UHJvY2Vzc29yTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVmlydHVhbE1vdXNlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db250cm9sc01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0ZvZ01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRlTW9kdWxlJztcblxuLy8gY29udHJvbHNcbmV4cG9ydCAqIGZyb20gJy4vY29udHJvbHMvaW5kZXgnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRHluYW1pY0dlb21ldHJ5TW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17YXR0cmlidXRlczogZmFsc2V9XSAtIHBhcmFtc1xuICogQHBhcmFtIHtCb29sZWFufSBbcGF0Y2hFdmVudHM9dHJ1ZV1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljR2VvbWV0cnlNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhdHRyaWJ1dGVzOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHBhcmFtcyA9IHNlbGYucGFyYW1zO1xuXG4gICAgdGhpcy5nXyA9IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xuICAgICAgaWYgKHRoaXMuYnVpbGRHZW9tZXRyeSkge1xuICAgICAgICB0aGlzLm5hdGl2ZS5nZW9tZXRyeSA9IHRoaXMuYnVpbGRHZW9tZXRyeShcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtcyh7Z2VvbWV0cnk6IHBhcmFtc30pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChwYXJhbXMuYXR0cmlidXRlcykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wYXJhbXMuZ2VvbWV0cnkpIHtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBgZ18ke2tleX1gLCB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZS5nZW9tZXRyeS5wYXJhbWV0ZXJzW2tleV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMubmF0aXZlLmdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KHRoaXMudXBkYXRlUGFyYW1zKHtnZW9tZXRyeToge1trZXldOiB2YWx1ZX19KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBSZXBlYXRXcmFwcGluZyxcbiAgVVZNYXBwaW5nLFxuICBOZWFyZXN0RmlsdGVyLFxuICBMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIsXG4gIFRleHR1cmVMb2FkZXIsXG4gIFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBsb2FkZXIgPSBuZXcgVGV4dHVyZUxvYWRlcigpO1xuXG4vKipcbiAqIEBjbGFzcyBUZXh0dXJlTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAZGVzY3JpcHRpb24gQSBUZXh0dXJlTW9kdWxlIGNhbiBiZSBhcHBsaWVkIHRvIGFueSBNZXNoIG9yIE1vZGVsLlxuICogQHBhcmFtIHtBcnJheX0gW3RleHR1cmVzXSAtIGFycmF5IG9mIHRleHR1cmUgb2JqZWN0c1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGluc3RhbmNlLiB1cmwgdGFrZXMgYSBwYXRoLCBvciBhIGRhdGEgb2JqZWN0LjwvY2FwdGlvbj5cbiAqIHZhciB3b29kVGV4dHVyZSA9IG5ldyBUZXh0dXJlTW9kdWxlKHtcbiAqICAgdXJsOiBgJHtwcm9jZXNzLmFzc2V0c1BhdGh9L3RleHR1cmVzL3dvb2QuanBnYFxuICogfSk7XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Nb3JlIGNvbXByZWhlbnNpdmUgZXhhbXBsZSwgd29vZCB0ZXh0dXJlIGFwcGxpZWQgdG8gYSBCb3guPC9jYXB0aW9uPlxuICogbmV3IEJveCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgd2lkdGg6IDIsXG4gKiAgICAgaGVpZ2h0OiAyLFxuICogICAgIGRlcHRoOiAyXG4gKiAgIH0sXG4gKiAgIG1vZHVsZXM6IFtcbiAqICAgICBuZXcgVGV4dHVyZU1vZHVsZSh7XG4gKiAgICAgICB1cmw6IGBwYXRoL3RvL3RleHR1cmUuanBnYCxcbiAqICAgICAgIHJlcGVhdDogbmV3IFRIUkVFLlZlY3RvcjIoMSwgMSkgLy8gb3B0aW9uYWxcbiAqICAgICB9KVxuICogICBdLFxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKiAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0dXJlTW9kdWxlIHtcbiAgc3RhdGljIGxvYWQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0dXJlTW9kdWxlKHt1cmx9KS50ZXh0dXJlc1swXVsxXTtcbiAgfVxuXG4gIHRleHR1cmVzID0gW107XG5cbiAgY29uc3RydWN0b3IoLi4udGV4dHVyZXMpIHtcbiAgICB0ZXh0dXJlcy5mb3JFYWNoKCh7XG4gICAgICB1cmwsXG4gICAgICB0eXBlID0gJ21hcCcsXG4gICAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMigwLCAwKSxcbiAgICAgIHJlcGVhdCA9IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgd3JhcCA9IFJlcGVhdFdyYXBwaW5nLFxuICAgICAgbWFwcGluZyA9IFVWTWFwcGluZyxcbiAgICAgIGZpeCA9IHRleCA9PiB0ZXhcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gbG9hZGVyLmxvYWQodXJsKTtcblxuICAgICAgaWYgKHdyYXAubGVuZ3RoID4gMCkge1xuICAgICAgICB0ZXh0dXJlLndyYXBTID0gd3JhcFswXTtcbiAgICAgICAgdGV4dHVyZS53cmFwVCA9IHdyYXBbMV07XG4gICAgICB9IGVsc2VcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IHRleHR1cmUud3JhcFQgPSB3cmFwO1xuXG4gICAgICB0ZXh0dXJlLm1hcHBpbmcgPSBtYXBwaW5nO1xuXG4gICAgICB0ZXh0dXJlLm9mZnNldC5jb3B5KG9mZnNldCk7XG4gICAgICB0ZXh0dXJlLnJlcGVhdC5jb3B5KHJlcGVhdCk7XG5cbiAgICAgIHRleHR1cmUubWFnRmlsdGVyID0gTmVhcmVzdEZpbHRlcjtcbiAgICAgIHRleHR1cmUubWluRmlsdGVyID0gTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyO1xuXG4gICAgICB0aGlzLnRleHR1cmVzLnB1c2goW3R5cGUsIGZpeCh0ZXh0dXJlKV0pO1xuICAgIH0pO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1hdGVyaWFsKG1hdGVyaWFsLCBzZWxmKSB7XG4gICAgICBzZWxmLnRleHR1cmVzLmZvckVhY2godGV4dHVyZSA9PiB7XG4gICAgICAgIG1hdGVyaWFsW3RleHR1cmVbMF1dID0gdGV4dHVyZVsxXTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBbmltYXRpb25NaXhlcixcbiAgQW5pbWF0aW9uQ2xpcCxcbiAgQ2xvY2tcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbi8qKlxuICogQGNsYXNzIEFuaW1hdGlvbk1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQGRlc2NyaXB0aW9uIENvbnZlbmllbmNlIG1vZHVsZSB0aGF0IHdyYXBzIHRoZSA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI21hbnVhbC9pbnRyb2R1Y3Rpb24vQW5pbWF0aW9uLXN5c3RlbSc+dGhyZWUuanMgYW5pbWF0aW9uIHN5c3RlbTwvYT5cbiAqIEBwYXJhbSB7QXBwfSBhcHAgLSB0aGUgYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtpc0RlZmVycmVkPWZhbHNlXSAtIHNldCB0byB0cnVlIGlmIGFuaW1hdGlvbiBzaG91bGQgbm90IHN0YXJ0IGF1dG9tYXRpY2FsbHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtzcGVlZDogMX1dIC0gdGhlIHBhcmFtc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbmltYXRpb24gbW9kdWxlIGFuZCBwbGF5IGEgZ2l2ZW4gY2xpcCBvZiBhbiBpbXBvcnRlZCBtb2RlbDwvY2FwdGlvbj5cbiAqIGNvbnN0IGFuaW1hdGlvbk1vZHVsZSA9IG5ldyBBbmltYXRpb25Nb2R1bGUoYXBwLCBmYWxzZSwge1xuICogICBzcGVlZDogMS4yIC8vIHNwZWVkIHVwIGFuaW1hdGlvbiBieSAyMCVcbiAqIH0pO1xuICpcbiAqIG5ldyBJbXBvcnRlcih7XG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gKiAgICAgLy8gT3ZlcnJpZGUgcGFyc2UgdG8gZ2VuZXJhdGUgYSBza2lubmVkTWVzaCwgbmVlZGVkIGZvciBza2lubmVkIG1vZGVsc1xuICogICAgIHJldHVybiBuZXcgVEhSRUUuU2tpbm5lZE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gKiAgIH0sXG4gKlxuICogICB1cmw6IGBwYXRoL3RvL21vZGVsLmpzb25gLFxuICogICB1c2VDdXN0b21NYXRlcmlhbDogdHJ1ZSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICogICAgIHNraW5uaW5nOiB0cnVlXG4gKiAgIH0pLFxuICpcbiAqICAgbW9kdWxlczogW2FuaW1hdGlvbk1vZHVsZV1cbiAqIH0pLmFkZFRvKGFwcCkudGhlbigoKSA9PiB7XG4gKiAgIC8vIGFkZGluZyBtb2RlbCB0byBhcHAgcmV0dXJucyBhIHByb21pc2UsIHNvIHBpcGUgdGhlIGZ1bmN0aW9uIHRvIGtpY2sgb2ZmIHRoZSBhbmltYXRpb24gY2xpcFxuICogICBhbmltYXRpb25Nb2R1bGUucGxheSgnY2xpcE5hbWUnKTtcbiAqIH0pO1xuICovXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoYXBwLCBpc0RlZmVycmVkLCBwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBzcGVlZDogMVxuICAgIH0sIHBhcmFtcyk7XG4gICAgdGhpcy5jbG9jayA9IG5ldyBDbG9jaygpO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5pc0RlZmVycmVkID0gaXNEZWZlcnJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHBsYXlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBQbGF5cyB0aGUgZ2l2ZW4gY2xpcCBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGlwTmFtZSAtIHRoZSBjbGlwIHRvIHBsYXlcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICBwbGF5KGNsaXBOYW1lKSB7XG4gICAgY29uc3QgY2xpcCA9IEFuaW1hdGlvbkNsaXAuZmluZEJ5TmFtZSh0aGlzLmNsaXBzLCBjbGlwTmFtZSk7XG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5taXhlci5jbGlwQWN0aW9uKGNsaXApO1xuXG4gICAgYWN0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSB0aGUgbWl4ZXIgKGJlaW5nIGNhbGxlZCBvbiBmcmFtZSBhbmltYXRpb24gbG9vcClcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMubWl4ZXIpIHRoaXMubWl4ZXIudXBkYXRlKHRoaXMuY2xvY2suZ2V0RGVsdGEoKSAqIHRoaXMucGFyYW1zLnNwZWVkKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5sb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9KTtcblxuICAgIGlmICghc2VsZi5pc0RlZmVycmVkKSBzZWxmLmxvb3Auc3RhcnQoc2VsZi5hcHApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2FuaW1hdGlvbicpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgbWVzaC5nZW9tZXRyeS5za2VsZXRvbiA9IG1lc2guc2tlbGV0b247XG5cbiAgICAgIHNlbGYubWl4ZXIgPSBuZXcgQW5pbWF0aW9uTWl4ZXIobWVzaC5nZW9tZXRyeSk7XG4gICAgICBzZWxmLmNsaXBzID0gbWVzaC5nZW9tZXRyeS5hbmltYXRpb25zO1xuXG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvbWVzaCAqL1xuZXhwb3J0ICogZnJvbSAnLi9EeW5hbWljR2VvbWV0cnlNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0dXJlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQW5pbWF0aW9uTW9kdWxlJztcbiIsIi8qKlxuICogQGNsYXNzIERlZmluZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSBEZWZpbmVNb2R1bGUgd2l0aCBQZXJzcGVjdGl2ZUNhbWVyYSBhcyBjYW1lcmEgbW9kdWxlIGFuZCBwYXNzaW5nIGl0IHRvIEFwcCdzIG1vZHVsZXM8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgLy8gLi4uXG4gKiAgIG5ldyBEZWZpbmVNb2R1bGUoJ2NhbWVyYScsIG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZpbmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQodGhpcy5uYW1lLCB0aGlzLmRhdGEpO1xuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzICovXG5cbmV4cG9ydCAqIGZyb20gJy4vYXBwL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbWVzaC9pbmRleCc7XG5cbi8vIG1vZHVsZXNcbmV4cG9ydCAqIGZyb20gJy4vRGVmaW5lTW9kdWxlJztcbiIsImltcG9ydCB7SW1wb3J0ZXJ9IGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvSW1wb3J0ZXInO1xuaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYX0gZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvUGVyc3BlY3RpdmVDYW1lcmEnO1xuXG5leHBvcnQgY2xhc3MgTW9kZWwgZXh0ZW5kcyBJbXBvcnRlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgLi4uYWRkaXRpb25hbCkge1xuICAgIGNvbnNvbGUud2FybignTW9kZWwgaXMgZGVwcmVjYXRlZC4gVXNlIEltcG9ydGVyIGluc3RlYWQuJyk7XG5cbiAgICBpZiAocGFyYW1zLmdlb21ldHJ5KSB7XG4gICAgICBwYXJhbXMudXJsID0gcGFyYW1zLmdlb21ldHJ5LnBhdGg7XG4gICAgICBwYXJhbXMubG9hZGVyID0gcGFyYW1zLmdlb21ldHJ5LmxvYWRlcjtcbiAgICB9XG5cbiAgICBzdXBlcihwYXJhbXMsIC4uLmFkZGl0aW9uYWwpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIGNvbnNvbGUud2FybignQ2FtZXJhTW9kdWxlIGlzIGRlcHJlY2F0ZWQuIFVzZSBEZWZpbmVNb2R1bGUgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYShwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmFkZChzZWxmLmNhbWVyYSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnY2FtZXJhJywgdGhpcy5jYW1lcmEpO1xuICB9XG59XG4iLCIvKipcbiAqIE5hbWVzcGFjZSBjb250YWluaW5nIGFsbCBjbGFzc2VzIGZyb20gYWxsIG1vZHVsZXMuIFVzZWQgYXMgZ2xvYmFsIGluIFVNRCBwYXR0ZXJuLlxuICogQG5hbWVzcGFjZSBXSFNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRoZSB1c2Ugb2YgV0hTIG5hbWVzcGFjZS48L2NhcHRpb24+XG4gKiBuZXcgV0hTLkFwcCgpIC8vIGNvcmVcbiAqIG5ldyBXSFMuUGVyc3BlY3RpdmVDYW1lcmEoKSAvLyBjb21wb25lbnRzXG4gKiBuZXcgV0hTLlJlc2l6ZU1vZHVsZSgpIC8vIG1vZHVsZXNcbiAqIFdIUy5leHRlbmQoKSAvLyB1dGlsc1xuICovXG5cblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9saWdodHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9pbmRleCc7XG5cbi8vIERFUFJFQ0FUSU9OXG5leHBvcnQgKiBmcm9tICcuL2RlcHJlY2F0aW9uJztcbiJdLCJuYW1lcyI6WyJleHRlbmQiLCJvYmplY3QiLCJleHRlbnNpb25zIiwiZXh0ZW5zaW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInByb3AiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsInV1aWQiLCJBcnJheSIsImlzQXJyYXkiLCJzbGljZSIsImluc3RydWN0IiwiYXJyYXkiLCJpbnN0QXJyYXkiLCJ0ZW1wT2JqZWN0IiwiaSIsIm1heCIsImxlbmd0aCIsImd1aWRlIiwidHJhbnNmb3JtRGF0YSIsImluc3RydWN0aW9ucyIsImtleSIsInRvQXJyYXkiLCJpbnN0cnVjdGlvbiIsInRlbXBBcnJheSIsIkNvbXBvc2l0aW9uRXJyb3IiLCJjbGFzc0luc3RhbmNlIiwibWVzc2FnZSIsImNvbXBvbmVudCIsInN0YWNrQXJyYXkiLCJzdGFjayIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiIsInByb2Nlc3MiLCJjb25zb2xlIiwiZXJyb3IiLCJuYW1lIiwiRXJyb3IiLCJEZXBlbmRlbmN5RXJyb3IiLCJhY3RpdmVNb2R1bGUiLCJkZXBlbmRlbmN5TW9kdWxlIiwiTWFuYWdlckVycm9yIiwid2FybkRlcHMiLCJSRVZJU0lPTiIsImVyciIsIk1vZHVsZVN5c3RlbSIsInNvdXJjZSIsIm1vZHVsZXMiLCJhcHBseU1vZHVsZSIsImFwcGx5QnJpZGdlIiwib25Db3B5IiwiYnJpZGdlTWFwIiwibW9kdWxlIiwiYnJpZGdlIiwiYXBwbHkiLCJwdXNoIiwibWFuYWdlciIsImFjdGl2ZSIsImludGVncmF0ZSIsImJpbmQiLCJkaXNwb3NlTW9kdWxlIiwiaW5kZXhPZiIsImRpc3Bvc2UiLCJFdmVudHMiLCJTeW1ib2wiLCJvYmplY3RQcm90byIsImhhc093blByb3BlcnR5Iiwic3ltVG9TdHJpbmdUYWciLCJuYXRpdmVPYmplY3RUb1N0cmluZyIsInJvb3QiLCJwb255ZmlsbCIsIiQkb2JzZXJ2YWJsZSIsIk1vZHVsZU1hbmFnZXIiLCJoYW5kbGVyIiwiY3VycmVudE1vZHVsZSIsInN0b3JlIiwiY3JlYXRlU3RvcmUiLCJzdGF0ZSIsImFjdGlvbiIsImRhdGEiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiQm9vbGVhbiIsImRlcHNNYXAiLCJzdWJzY3JpYmUiLCJjaGFuZ2VkS2V5IiwiY2FsbGJhY2siLCJ3YXJuIiwic2V0IiwibW9kdWxlRXhlY3V0b3IiLCJ1c2UiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJkZWZhdWx0cyIsIl93YWl0IiwiY2hpbGRyZW4iLCJpbnRlZ3JhdGVNb2R1bGVzIiwicHJvbWlzZSIsIlByb21pc2UiLCJhbGwiLCJmdW5jIiwiaXNEZWZmZXJlZCIsIndhaXQiLCJ0aGVuIiwiY29uc3RydWN0b3IiLCJjb3B5IiwiY3VzdG9taXplIiwibmF0aXZlIiwiY2xvbmUiLCJwYXJlbnQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGVmZXIiLCJhZGRQcm9taXNlIiwib25BZGQiLCJyZXNvbHZlciIsImFkZCIsInJlbW92ZSIsIl9tYW5hZ2VyIiwiX25hdGl2ZSIsIm1lc2giLCJhdHRyaWJ1dGVzIiwibWFwcGVycyIsInRhcmdldCIsIm1hcHBlciIsImsiLCJtYXAiLCJhdHRyaWJ1dGUiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldHRlciIsInNldHRlciIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ2YWx1ZSIsIm1pcnJvciIsIk1lc2hDb21wb25lbnQiLCJnZW9tIiwiTWVzaCIsIm1hdGVyaWFsIiwiZ2VvbWV0cnkiLCJjdXN0b20iLCJidWlsZCIsIndyYXAiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJzaGFkb3ciLCJ4IiwieSIsInoiLCJjYXN0U2hhZG93IiwiY2FzdCIsInJlY2VpdmVTaGFkb3ciLCJyZWNlaXZlIiwib25XcmFwIiwicXVhdGVybmlvbiIsImRlc3QiLCJMaWdodENvbXBvbmVudCIsIm1hcFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJpYXMiLCJyYWRpdXMiLCJzaGFkb3dDYW1lcmEiLCJjYW1lcmEiLCJuZWFyIiwiZmFyIiwiZm92IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiQ2FtZXJhQ29tcG9uZW50Iiwic3lzdGVtIiwid2luZG93IiwiZ2xvYmFsIiwicGVyZm9ybWFuY2UiLCJwcmVzZW50IiwiQXBwIiwibG9nIiwidmVyc2lvbiIsInNpbXVsYXRlIiwidXBkYXRlRW5hYmxlZCIsImxvb3BzIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFRpbWVvdXQiLCJsbCIsImUiLCJlbmFibGVkIiwiZXhlY3V0ZSIsImNsb2NrIiwibG9vcCIsImluZGV4IiwiZ2V0IiwiTG9vcCIsInVzZUNsb2NrIiwiQ2xvY2siLCJ3b3JsZCIsImFkZExvb3AiLCJzdGFydCIsInN0b3AiLCJyZW1vdmVMb29wIiwiQW1iaWVudExpZ2h0IiwibGlnaHQiLCJBbWJpZW50TGlnaHROYXRpdmUiLCJjb2xvciIsImludGVuc2l0eSIsIkRpcmVjdGlvbmFsTGlnaHQiLCJ3cmFwU2hhZG93IiwiRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSIsIkhlbWlzcGhlcmVMaWdodCIsIkhlbWlzcGhlcmVMaWdodE5hdGl2ZSIsInNreUNvbG9yIiwiZ3JvdW5kQ29sb3IiLCJQb2ludExpZ2h0IiwiUG9pbnRMaWdodE5hdGl2ZSIsImRpc3RhbmNlIiwiZGVjYXkiLCJTcG90TGlnaHQiLCJTcG90TGlnaHROYXRpdmUiLCJhbmdsZSIsImV4cG9uZW50IiwiTWF0aCIsIlBJIiwiQXJlYUxpZ2h0IiwiUmVjdEFyZWFMaWdodE5hdGl2ZSIsIkN1YmVDYW1lcmEiLCJDdWJlQ2FtZXJhTmF0aXZlIiwiY3ViZVJlc29sdXRpb24iLCJPcnRob2dyYXBoaWNDYW1lcmEiLCJPcnRob2dyYXBoaWNDYW1lcmFOYXRpdmUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIlBlcnNwZWN0aXZlQ2FtZXJhTmF0aXZlIiwiYXNwZWN0IiwiQm94IiwiYnVpbGRHZW9tZXRyeSIsImJ1ZmZlciIsIkJveEJ1ZmZlckdlb21ldHJ5IiwiQm94R2VvbWV0cnkiLCJkZXB0aCIsIndpZHRoU2VnbWVudHMiLCJoZWlnaHRTZWdtZW50cyIsImRlcHRoU2VnbWVudHMiLCJDaXJjbGUiLCJDaXJjbGVCdWZmZXJHZW9tZXRyeSIsIkNpcmNsZUdlb21ldHJ5Iiwic2VnbWVudHMiLCJ0aGV0YVN0YXJ0IiwidGhldGFMZW5ndGgiLCJDb25lIiwiQ29uZUJ1ZmZlckdlb21ldHJ5IiwiQ29uZUdlb21ldHJ5IiwicmFkaXVzU2VnbWVudHMiLCJvcGVuRW5kZWQiLCJDeWxpbmRlciIsIkN5bGluZGVyQnVmZmVyR2VvbWV0cnkiLCJDeWxpbmRlckdlb21ldHJ5IiwicmFkaXVzVG9wIiwicmFkaXVzQm90dG9tIiwiRG9kZWNhaGVkcm9uIiwiRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJEb2RlY2FoZWRyb25HZW9tZXRyeSIsImRldGFpbCIsIkV4dHJ1ZGUiLCJFeHRydWRlR2VvbWV0cnkiLCJzaGFwZXMiLCJvcHRpb25zIiwiQnVmZmVyR2VvbWV0cnkiLCJmcm9tR2VvbWV0cnkiLCJJY29zYWhlZHJvbiIsIkljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJJY29zYWhlZHJvbkdlb21ldHJ5IiwiTGF0aGUiLCJMYXRoZUJ1ZmZlckdlb21ldHJ5IiwiTGF0aGVHZW9tZXRyeSIsInBvaW50cyIsIkxpbmUiLCJMaW5lTmF0aXZlIiwiR2VvbWV0cnkiLCJwcCIsImN1cnZlIiwiZ2V0UG9pbnRzIiwidmVydHMiLCJGbG9hdDMyQXJyYXkiLCJpMyIsImFkZEF0dHJpYnV0ZSIsIkJ1ZmZlckF0dHJpYnV0ZSIsInZlcnRpY2VzIiwiTGluZUN1cnZlMyIsIlZlY3RvcjMiLCJJbXBvcnRlciIsImZpbHRlciIsInByb2Nlc3NGaWx0ZXIiLCJmb3JFYWNoIiwiZWwiLCJ0ZXh0dXJlUGF0aCIsImxhb2RlciIsInNldFRleHR1cmVQYXRoIiwibG9hZGVyIiwibG9hZCIsInVybCIsIm9uTG9hZCIsInBhcnNlciIsInVzZUN1c3RvbU1hdGVyaWFsIiwibWF0Iiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJKU09OTG9hZGVyIiwibWF0ZXJpYWxzIiwiT2N0YWhlZHJvbiIsIk9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSIsIk9jdGFoZWRyb25HZW9tZXRyeSIsIlBhcmFtZXRyaWMiLCJQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkiLCJQYXJhbWV0cmljR2VvbWV0cnkiLCJzbGljZXMiLCJzdGFja3MiLCJ1IiwidiIsIlBsYW5lIiwiUGxhbmVCdWZmZXJHZW9tZXRyeSIsIlBsYW5lR2VvbWV0cnkiLCJ3U2VnbWVudHMiLCJoU2VnbWVudHMiLCJ2ZXJ0aWNlc09mQ3ViZSIsImluZGljZXNPZkZhY2VzIiwiUG9seWhlZHJvbiIsIlBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSIsIlBvbHloZWRyb25HZW9tZXRyeSIsIlJpbmciLCJSaW5nQnVmZmVyR2VvbWV0cnkiLCJSaW5nR2VvbWV0cnkiLCJpbm5lclJhZGl1cyIsIm91dGVyUmFkaXVzIiwidGhldGFTZWdtZW50cyIsInBoaVNlZ21lbnRzIiwiU2hhcGUiLCJTaGFwZUJ1ZmZlckdlb21ldHJ5IiwiU2hhcGVHZW9tZXRyeSIsIlNwaGVyZSIsIlNwaGVyZUJ1ZmZlckdlb21ldHJ5IiwiU3BoZXJlR2VvbWV0cnkiLCJUZXRyYWhlZHJvbiIsIlRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJUZXRyYWhlZHJvbkdlb21ldHJ5IiwiVGV4dCIsInBhcmFtZXRlcnMiLCJmb250IiwiVGV4dEdlb21ldHJ5IiwidGV4dCIsIkZvbnRMb2FkZXIiLCJGb250IiwiVG9ydXMiLCJUb3J1c0dlb21ldHJ5IiwidHViZSIsInJhZGlhbFNlZ21lbnRzIiwidHVidWxhclNlZ21lbnRzIiwiYXJjIiwiVG9ydXNrbm90IiwiR0NvbnN0cnVjdCIsIlRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IiwiVG9ydXNLbm90R2VvbWV0cnkiLCJwIiwicSIsIlR1YmUiLCJUdWJlQnVmZmVyR2VvbWV0cnkiLCJUdWJlR2VvbWV0cnkiLCJwYXRoIiwiY2xvc2VkIiwiR3JvdXAiLCJvYmplY3RzIiwib2JqIiwiYWRkVG8iLCJPYmplY3QzRCIsIkVsZW1lbnRNb2R1bGUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImJvZHkiLCJjcmVhdGVFbGVtZW50IiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwic2VsZiIsImFwcGVuZENoaWxkIiwiUmVuZGVyaW5nTW9kdWxlIiwiaXNTaGFkb3ciLCJhc3NpZ24iLCJWZWN0b3IyIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImJnQ29sb3IiLCJiZ09wYWNpdHkiLCJyZW5kZXJlciIsInBpeGVsUmF0aW8iLCJyZXNvbHV0aW9uIiwiV2ViR0xSZW5kZXJlciIsImVmZmVjdHMiLCJhcHBseUFkZGl0aW9uYWwiLCJzZXRDbGVhckNvbG9yIiwic2V0UGl4ZWxSYXRpbyIsInNldFNpemUiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwiaXNBcHBsaWVkIiwiYWRkaXRpb25hbCIsInNjZW5lIiwicmVuZGVyTG9vcCIsInJlbmRlciIsImF0dGFjaFRvQ2FudmFzIiwiZWZmZWN0IiwiY2IiLCJzaXplIiwiZ2V0U2l6ZSIsImFwcCIsImNhbnZhcyIsImRvbUVsZW1lbnQiLCJkZWZpbmUiLCJpbnRlZ3JhdGVSZW5kZXJlciIsInVwZGF0ZSIsImZvcmNlQ29udGV4dExvc3MiLCJzaGFkb3dNYXAiLCJTY2VuZU1vZHVsZSIsIndpbGxTY2VuZUJlUmVwbGFjZWQiLCJTY2VuZSIsInNldFNjZW5lIiwiUmVzaXplTW9kdWxlIiwiY2FsbGJhY2tzIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsInJlbmRlcmluZyIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZ2V0Q29udGFpbmVyIiwiZ2V0UmVzb2x1dGlvbiIsImF1dG8iLCJhZGRFdmVudExpc3RlbmVyIiwidHJpZ2dlciIsImFkZEF1dG9yZXNpemUiLCJmcmFnbWVudCIsInZlcnRleCIsInBvbHlmaWxsIiwibWV0aG9kIiwic2hvd1dhcm4iLCJQb3N0UHJvY2Vzc29yTW9kdWxlIiwiZGVidWciLCJjdXJyZW50UGFzcyIsImNvbXBvc2VyIiwiRWZmZWN0Q29tcG9zZXIiLCJnZXREZWx0YSIsInJlcGxhY2VSZW5kZXJlciIsInBhc3MiLCJSZW5kZXJQYXNzIiwiYWRkUGFzcyIsInRleHR1cmVJRCIsInVuaWZvcm1zIiwiU2hhZGVyUGFzcyIsInBhc3NlcyIsImJvb2wiLCJyZW5kZXJUb1NjcmVlbiIsIkV2ZW50c1BhdGNoTW9kdWxlIiwib3JpZ2luT2JqZWN0IiwiZGVzdE9iamVjdCIsImV2ZW50cyIsImV2ZW50IiwiZW1pdCIsInBhdGNoRXZlbnRzIiwiVmlydHVhbE1vdXNlTW9kdWxlIiwiZ2xvYmFsTW92ZW1lbnQiLCJtb3VzZSIsInJheWNhc3RlciIsIlJheWNhc3RlciIsInByb2plY3Rpb25QbGFuZSIsImN1c3RvbVgiLCJjdXN0b21ZIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJjbGllbnRZIiwibm9ybWFsIiwiZ2V0V29ybGREaXJlY3Rpb24iLCJzZXRGcm9tQ2FtZXJhIiwicmVxdWlyZSIsIm9uIiwiZXYiLCJnbG9iYWxYIiwiZ2xvYmFsWSIsInBvaW50ZXJMb2NrRWxlbWVudCIsIm1vdmVtZW50WCIsIm1vdmVtZW50WSIsImlzSG92ZXJlZCIsImhvdmVycyIsImludGVyc2VjdE9iamVjdCIsInBsYW5lIiwicmF5IiwiaW50ZXJzZWN0UGxhbmUiLCJpbnRlcnNlY3Rpb24iLCJDb250cm9sc01vZHVsZSIsImNvbnRyb2xzIiwiYyIsInVwZGF0ZUxvb3AiLCJGb2dNb2R1bGUiLCJ0eXBlIiwiZm9nIiwiRm9nRXhwMiIsImRlbnNpdHkiLCJGb2ciLCJpc0VxdWFsRGVmYXVsdCIsImEiLCJiIiwiZXF1YWxzIiwiU3RhdGVNb2R1bGUiLCJpc0VxdWFsIiwiZXF1YWxDaGVjayIsImFjdGlvbkdlbmVyYXRlIiwiY29uZmlndXJhdGlvbiIsImN1cnJlbnRDb25maWciLCJwcmV2Q29uZmlnIiwiY29uZmlnIiwiZGVmYXVsdCIsInJlcGxhY2VSZWR1Y2VyIiwiY29uZmlncyIsInVwZGF0ZXMiLCJjb25maWdOYW1lIiwidHJ1ZVZhbCIsImZhbHNlVmFsIiwiVGhyZWVPcmJpdENvbnRyb2xzIiwiZXZlbnRIYW5kbGVyIiwibWluRGlzdGFuY2UiLCJtYXhEaXN0YW5jZSIsIkluZmluaXR5IiwibWluWm9vbSIsIm1heFpvb20iLCJtaW5Qb2xhckFuZ2xlIiwibWF4UG9sYXJBbmdsZSIsIm1pbkF6aW11dGhBbmdsZSIsIm1heEF6aW11dGhBbmdsZSIsImVuYWJsZURhbXBpbmciLCJkYW1waW5nRmFjdG9yIiwiZW5hYmxlWm9vbSIsInpvb21TcGVlZCIsImVuYWJsZVJvdGF0ZSIsInJvdGF0ZVNwZWVkIiwiZW5hYmxlUGFuIiwia2V5UGFuU3BlZWQiLCJhdXRvUm90YXRlIiwiYXV0b1JvdGF0ZVNwZWVkIiwiZW5hYmxlS2V5cyIsImtleXMiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkJPVFRPTSIsIm1vdXNlQnV0dG9ucyIsIk9SQklUIiwiTU9VU0UiLCJaT09NIiwiTUlERExFIiwiUEFOIiwidGFyZ2V0MCIsInBvc2l0aW9uMCIsInpvb20wIiwiem9vbSIsImdldFBvbGFyQW5nbGUiLCJzcGhlcmljYWwiLCJwaGkiLCJnZXRBemltdXRoYWxBbmdsZSIsInRoZXRhIiwicmVzZXQiLCJkaXNwYXRjaEV2ZW50IiwiY2hhbmdlRXZlbnQiLCJTVEFURSIsIk5PTkUiLCJvZmZzZXQiLCJxdWF0IiwiUXVhdGVybmlvbiIsInNldEZyb21Vbml0VmVjdG9ycyIsInVwIiwicXVhdEludmVyc2UiLCJpbnZlcnNlIiwibGFzdFBvc2l0aW9uIiwibGFzdFF1YXRlcm5pb24iLCJzdWIiLCJhcHBseVF1YXRlcm5pb24iLCJzZXRGcm9tVmVjdG9yMyIsInJvdGF0ZUxlZnQiLCJnZXRBdXRvUm90YXRpb25BbmdsZSIsInNwaGVyaWNhbERlbHRhIiwibWluIiwibWFrZVNhZmUiLCJwYW5PZmZzZXQiLCJzZXRGcm9tU3BoZXJpY2FsIiwibG9va0F0Iiwiem9vbUNoYW5nZWQiLCJkaXN0YW5jZVRvU3F1YXJlZCIsIkVQUyIsImRvdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkNvbnRleHRNZW51Iiwib25Nb3VzZURvd24iLCJvbk1vdXNlV2hlZWwiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25Ub3VjaE1vdmUiLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VVcCIsIm9uS2V5RG93biIsInN0YXJ0RXZlbnQiLCJlbmRFdmVudCIsIlJPVEFURSIsIkRPTExZIiwiVE9VQ0hfUk9UQVRFIiwiVE9VQ0hfRE9MTFkiLCJUT1VDSF9QQU4iLCJTcGhlcmljYWwiLCJyb3RhdGVTdGFydCIsInJvdGF0ZUVuZCIsInJvdGF0ZURlbHRhIiwicGFuU3RhcnQiLCJwYW5FbmQiLCJwYW5EZWx0YSIsImRvbGx5U3RhcnQiLCJkb2xseUVuZCIsImRvbGx5RGVsdGEiLCJnZXRab29tU2NhbGUiLCJwb3ciLCJyb3RhdGVVcCIsInBhbkxlZnQiLCJvYmplY3RNYXRyaXgiLCJzZXRGcm9tTWF0cml4Q29sdW1uIiwibXVsdGlwbHlTY2FsYXIiLCJwYW5VcCIsInBhbiIsImRlbHRhWCIsImRlbHRhWSIsInRhcmdldERpc3RhbmNlIiwidGFuIiwiY2xpZW50SGVpZ2h0IiwibWF0cml4IiwiY2xpZW50V2lkdGgiLCJkb2xseUluIiwiZG9sbHlTY2FsZSIsImRvbGx5T3V0IiwiaGFuZGxlTW91c2VEb3duUm90YXRlIiwiaGFuZGxlTW91c2VEb3duRG9sbHkiLCJoYW5kbGVNb3VzZURvd25QYW4iLCJoYW5kbGVNb3VzZU1vdmVSb3RhdGUiLCJzdWJWZWN0b3JzIiwiaGFuZGxlTW91c2VNb3ZlRG9sbHkiLCJoYW5kbGVNb3VzZU1vdmVQYW4iLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VXaGVlbCIsImhhbmRsZUtleURvd24iLCJrZXlDb2RlIiwiaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiaGFuZGxlVG91Y2hTdGFydERvbGx5IiwiZHgiLCJkeSIsInNxcnQiLCJoYW5kbGVUb3VjaFN0YXJ0UGFuIiwiaGFuZGxlVG91Y2hNb3ZlUm90YXRlIiwiaGFuZGxlVG91Y2hNb3ZlRG9sbHkiLCJoYW5kbGVUb3VjaE1vdmVQYW4iLCJoYW5kbGVUb3VjaEVuZCIsInByZXZlbnREZWZhdWx0IiwiYnV0dG9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRXZlbnREaXNwYXRjaGVyIiwiT3JiaXRDb250cm9sc01vZHVsZSIsImZvbGxvdyIsInVwZGF0ZVByb2Nlc3NvciIsInNldENvbnRyb2xzIiwic2V0VXBkYXRlIiwiRHluYW1pY0dlb21ldHJ5TW9kdWxlIiwiZ18iLCJ1cGRhdGVQYXJhbXMiLCJUZXh0dXJlTG9hZGVyIiwiVGV4dHVyZU1vZHVsZSIsInRleHR1cmVzIiwidGV4dHVyZSIsInJlcGVhdCIsIlJlcGVhdFdyYXBwaW5nIiwibWFwcGluZyIsIlVWTWFwcGluZyIsImZpeCIsInRleCIsIndyYXBTIiwid3JhcFQiLCJtYWdGaWx0ZXIiLCJOZWFyZXN0RmlsdGVyIiwibWluRmlsdGVyIiwiTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyIiwiQW5pbWF0aW9uTW9kdWxlIiwiaXNEZWZlcnJlZCIsInNrZWxldG9uIiwibWl4ZXIiLCJBbmltYXRpb25NaXhlciIsImNsaXBzIiwiYW5pbWF0aW9ucyIsImNsaXBOYW1lIiwiY2xpcCIsIkFuaW1hdGlvbkNsaXAiLCJmaW5kQnlOYW1lIiwiY2xpcEFjdGlvbiIsInBsYXkiLCJzcGVlZCIsIkRlZmluZU1vZHVsZSIsIk1vZGVsIiwiQ2FtZXJhTW9kdWxlIl0sIm1hcHBpbmdzIjoi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UCxzQkFBYyxHQUFHLFNBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUN0QyxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztFQUM1QixNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUk7Ozs7RUFJdkIsTUFBTSxDQUFDLEVBQUUsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ25DLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFDO0lBQ3REOzs7O0VBSUQsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLENBQUM7SUFDL0IsSUFBSSxLQUFLLE1BQU0sR0FBRyxFQUFFLEVBQUM7SUFDckIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUs7UUFDNUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDbEQ7Ozs7RUFJRCxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDO0lBQzFCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEYsTUFBTSxDQUFDLENBQUMsSUFBSSxD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
