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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzL2V4dGVuZC5qcyIsIi4uL3NyYy91dGlscy90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsIi4uL3NyYy9jb3JlL2Vycm9ycy5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZU1hbmFnZXIuanMiLCIuLi9zcmMvY29yZS9Db21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9wcm90b3R5cGUvYXR0cmlidXRlcy5qcyIsIi4uL3NyYy9jb3JlL01lc2hDb21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9MaWdodENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0NhbWVyYUNvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wcmVzZW50L2xpYi9wcmVzZW50LW5vZGUuanMiLCIuLi9zcmMvcG9seWZpbGwuanMiLCIuLi9zcmMvY29yZS9BcHAuanMiLCIuLi9zcmMvY29yZS9Mb29wLmpzIiwiLi4vc3JjL2NvcmUvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQW1iaWVudExpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL0RpcmVjdGlvbmFsTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvSGVtaXNwaGVyZUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL1BvaW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvU3BvdExpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL0FyZWFMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvQ3ViZUNhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvT3J0aG9ncmFwaGljQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9QZXJzcGVjdGl2ZUNhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQm94LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NpcmNsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Db25lLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0N5bGluZGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0RvZGVjYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9FeHRydWRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0ljb3NhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0xhdGhlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0xpbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSW1wb3J0ZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvT2N0YWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9QYXJhbWV0cmljLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BsYW5lLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BvbHloZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUmluZy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9TaGFwZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9TcGhlcmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVGV0cmFoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVGV4dC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Ub3J1cy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Ub3J1c2tub3QuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVHViZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Hcm91cC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9FbGVtZW50TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1JlbmRlcmluZ01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9TY2VuZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9SZXNpemVNb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9jb252b2x1dGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvcHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3Bhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9jbGVhci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2NsZWFyLW1hc2suanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9nbGl0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9yZW5kZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9tYXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hhZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hvY2std2F2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2VmZmVjdC1jb21wb3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvY29yZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUG9zdFByb2Nlc3Nvck1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9FdmVudHNQYXRjaE1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9WaXJ0dWFsTW91c2VNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvQ29udHJvbHNNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvRm9nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1N0YXRlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2xpYi9UaHJlZU9yYml0Q29udHJvbHMuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvT3JiaXRDb250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvRHluYW1pY0dlb21ldHJ5TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9UZXh0dXJlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9BbmltYXRpb25Nb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvRGVmaW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvaW5kZXguanMiLCIuLi9zcmMvZGVwcmVjYXRpb24uanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGV4dGVuZCA9IChvYmplY3QsIC4uLmV4dGVuc2lvbnMpID0+IHsgLy8gJC5leHRlbmQgYWx0ZXJuYXRpdmUsIC4uLiBpcyB0aGUgc3ByZWFkIG9wZXJhdG9yLlxuICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiBleHRlbnNpb25zKSB7XG4gICAgLy8gY29uc29sZS5sb2coZXh0ZW5zaW9uKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YgZXh0ZW5zaW9uKTtcblxuICAgIGlmICghZXh0ZW5zaW9uKVxuICAgICAgY29udGludWU7IC8vIElnbm9yZSBudWxsIGFuZCB1bmRlZmluZWQgb2JqZWN0cyBhbmQgcGFyYW1ldGVycy5cblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhleHRlbnNpb24pKSB7IC8vIERvIG5vdCB0cmF2ZXJzZSB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgICAgaWYgKG9iamVjdFtwcm9wXSAhPT0gdW5kZWZpbmVkICYmIGV4dGVuc2lvbltwcm9wXVxuICAgICAgICAmJiBvYmplY3RbcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbiAgICAgICAgJiYgZXh0ZW5zaW9uW3Byb3BdLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIC8vIEdvZXMgZGVlcCBvbmx5IGlmIG9iamVjdFtwcm9wXSBhbmQgZXh0ZW5zaW9uW3Byb3BdIGFyZSBib3RoIG9iamVjdHMgIVxuICAgICAgICBpZiAoZXh0ZW5zaW9uW3Byb3BdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIGV4dGVuZChvYmplY3RbcHJvcF0sIGV4dGVuc2lvbltwcm9wXSk7XG4gICAgICAgIGVsc2Ugb2JqZWN0W3Byb3BdID0gZXh0ZW5zaW9uW3Byb3BdO1xuICAgICAgfSBlbHNlXG4gICAgICAgIG9iamVjdFtwcm9wXSA9IHR5cGVvZiBvYmplY3RbcHJvcF0gPT09ICd1bmRlZmluZWQnID8gZXh0ZW5zaW9uW3Byb3BdIDogb2JqZWN0W3Byb3BdO1xuXG4gICAgICBpZiAodHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXkuaXNBcnJheShleHRlbnNpb25bcHJvcF0pKSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF0uc2xpY2UoKTsgLy8gQWRkIHZhbHVlcyB0aGF0IGRvIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXkuaXNBcnJheShleHRlbnNpb25bcHJvcF0pKSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJleHBvcnQgY29uc3QgaW5zdHJ1Y3QgPSAoYXJyYXksIGluc3RBcnJheSkgPT4ge1xuICBjb25zdCB0ZW1wT2JqZWN0ID0ge307XG5cbiAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGluc3RBcnJheS5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdEFycmF5W2ldO1xuXG4gICAgdGVtcE9iamVjdFtndWlkZV0gPSBhcnJheVtpXTtcbiAgfVxuXG4gIHJldHVybiB0ZW1wT2JqZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybURhdGEgPSAob2JqZWN0LCBpbnN0cnVjdGlvbnMpID0+IHtcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5zdHJ1Y3Rpb25zKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0W2tleV0pKVxuICAgICAgb2JqZWN0W2tleV0gPSBpbnN0cnVjdChvYmplY3Rba2V5XSwgaW5zdHJ1Y3Rpb25zW2tleV0pO1xuICAgIGVsc2UgaWYgKG9iamVjdFtrZXldIGluc3RhbmNlb2YgT2JqZWN0ICYmICEoQXJyYXkuaXNBcnJheShpbnN0cnVjdGlvbnNba2V5XSkpKVxuICAgICAgb2JqZWN0W2tleV0gPSB0cmFuc2Zvcm1EYXRhKG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IHRvQXJyYXkgPSAob2JqZWN0LCBpbnN0cnVjdGlvbikgPT4ge1xuICBjb25zdCB0ZW1wQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdHJ1Y3Rpb24ubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICBjb25zdCBndWlkZSA9IGluc3RydWN0aW9uW2ldO1xuXG4gICAgdGVtcEFycmF5W2ldID0gb2JqZWN0W2d1aWRlXTtcbiAgfVxuXG4gIHJldHVybiB0ZW1wQXJyYXk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFdmVudHModGFyZ2V0KXtcbiAgdmFyIGV2ZW50cyA9IHt9LCBlbXB0eSA9IFtdO1xuICB0YXJnZXQgPSB0YXJnZXQgfHwgdGhpc1xuICAvKipcbiAgICogIE9uOiBsaXN0ZW4gdG8gZXZlbnRzXG4gICAqL1xuICB0YXJnZXQub24gPSBmdW5jdGlvbih0eXBlLCBmdW5jLCBjdHgpe1xuICAgIChldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW10pLnB1c2goW2Z1bmMsIGN0eF0pXG4gIH1cbiAgLyoqXG4gICAqICBPZmY6IHN0b3AgbGlzdGVuaW5nIHRvIGV2ZW50IC8gc3BlY2lmaWMgY2FsbGJhY2tcbiAgICovXG4gIHRhcmdldC5vZmYgPSBmdW5jdGlvbih0eXBlLCBmdW5jKXtcbiAgICB0eXBlIHx8IChldmVudHMgPSB7fSlcbiAgICB2YXIgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSxcbiAgICAgICAgaSA9IGxpc3QubGVuZ3RoID0gZnVuYyA/IGxpc3QubGVuZ3RoIDogMDtcbiAgICB3aGlsZShpLS0pIGZ1bmMgPT0gbGlzdFtpXVswXSAmJiBsaXN0LnNwbGljZShpLDEpXG4gIH1cbiAgLyoqIFxuICAgKiBFbWl0OiBzZW5kIGV2ZW50LCBjYWxsYmFja3Mgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICovXG4gIHRhcmdldC5lbWl0ID0gZnVuY3Rpb24odHlwZSl7XG4gICAgdmFyIGUgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksIGxpc3QgPSBlLmxlbmd0aCA+IDAgPyBlLnNsaWNlKDAsIGUubGVuZ3RoKSA6IGUsIGk9MCwgajtcbiAgICB3aGlsZShqPWxpc3RbaSsrXSkgalswXS5hcHBseShqWzFdLCBlbXB0eS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpXG4gIH07XG59OyIsImV4cG9ydCBjbGFzcyBDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0NvbXBvbmVudDonLCBjb21wb25lbnQpO1xuXG4gICAgdGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmN5RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGFjdGl2ZU1vZHVsZSwgZGVwZW5kZW5jeU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdBY3RpdmUgbW9kdWxlOicsIGFjdGl2ZU1vZHVsZSk7XG4gICAgaWYgKGNvbnNvbGUgJiYgZGVwZW5kZW5jeU1vZHVsZSkgY29uc29sZS5lcnJvcignRGVwZW5kZW5jeSBwdWJsaXNoZWQgYnkgbW9kdWxlOicsIGRlcGVuZGVuY3lNb2R1bGUpO1xuXG4gICAgdGhpcy5uYW1lID0gJ0RlcGVuZGVuY3lFcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hbmFnZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgY29tcG9uZW50LCBhY3RpdmVNb2R1bGUgPSBmYWxzZSkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGRlcGVuZGVuY3lNb2R1bGUpO1xuICAgIGlmIChjb25zb2xlICYmIGFjdGl2ZU1vZHVsZSkgY29uc29sZS5lcnJvcignQWN0aXZlIG1vZHVsZTonLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgdGhpcy5uYW1lID0gJ01hbmFnZXJFcnJvcic7XG4gIH1cbn1cbiIsImltcG9ydCB7UkVWSVNJT059IGZyb20gJ3RocmVlJztcbmltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcbmltcG9ydCB7TWFuYWdlckVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8vIENoZWNrIGZvciBUaHJlZS5qc1xuY29uc3Qgd2FybkRlcHMgPSAoKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcignV2hpdGVzdG9ybUpTIEZyYW1ld29yayByZXF1aXJlcyBUaHJlZS5qcyByODQuIGh0dHBzOi8vdGhyZWVqcy5vcmcvJyk7XG59O1xuXG50cnkge1xuICBpZiAoIVJFVklTSU9OKSB3YXJuRGVwcygpO1xufSBjYXRjaCAoZXJyKSB7XG4gIHdhcm5EZXBzKCk7XG59XG5cbi8qKlxuICogQGNsYXNzIE1vZHVsZVN5c3RlbVxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBkZXNjcmlwdGlvbiAgUHJvdmlkZXMgQVBJIGZvciBjbGFzc2VzIHRoYXQgd2lsbCB1c2UgTW9kdWxlcy48YnIvPlxuICogVGhpcyBjbGFzcyBpbmNsdWRlcyBiYXNpYyBldmVudCBzeXN0ZW0gd2l0aCB0aG9zZSBzdXBwb3J0ZWQgbWV0aG9kczpcbiAqIDxwcmU+Lm9uKCk8L3ByZT48cHJlPi5vZmYoKTwvcHJlPjxwcmU+LmVtaXQoKTwvcHJlPlxuICogQGV4dGVuZHMgRXZlbnRzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZHVsZVN5c3RlbSBleHRlbmRzIEV2ZW50cyB7XG4gIC8vIElOVEVHUkFUSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaW50ZWdyYXRlTW9kdWxlc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIGFwcGxpZXMgYWxsIG1vZHVsZXMgZnJvbSAubW9kdWxlcyBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3NvdXJjZV0gSWYgc291cmNlIChzaG91bGQgYmUgYSBjb21wb25lbnQpIGlzIHByb3ZpZGVkLCB3aWxsIHJlcGxhY2UgLm1vZHVsZXMgd2l0aCBzb3VyY2UncyBvbmUgYmVmb3JlIGV4ZWN1dGluZyBtb2R1bGVzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBpbnRlZ3JhdGVNb2R1bGVzKHNvdXJjZSkge1xuICAgIGlmICghdGhpcy5tb2R1bGVzKSByZXR1cm47XG4gICAgaWYgKHNvdXJjZSkgdGhpcy5tb2R1bGVzID0gc291cmNlLm1vZHVsZXMuc2xpY2UoMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKVxuICAgICAgdGhpcy5hcHBseU1vZHVsZSh0aGlzLm1vZHVsZXNbaV0sIGZhbHNlKTtcblxuICAgIGlmIChzb3VyY2UpIHRoaXMuYXBwbHlCcmlkZ2Uoe29uQ29weTogc291cmNlfSk7XG4gIH1cblxuICAvLyBBUFBMWUlORyBNT0RVTEUgKC4uLmFuZCBhIFwiYnJpZGdlXCIgZm9yIG1vZHVsZSlcblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUJyaWRnZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2VzIGNvbXBvbmVudC1zcGVjaWZpYyBBUEkgdG8gd29yayB3aXRoIG1vZHVsZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBicmlkZ2VNYXBcbiAgICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIG9iamVjdCB3aXRoIG1vZGlmaWVkIHZhbHVlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlCcmlkZ2UoYnJpZGdlTWFwID0ge30pIHtcbiAgICBjb25zdCBtb2R1bGVzID0gdGhpcy5tb2R1bGVzO1xuICAgIGlmICghbW9kdWxlcykgcmV0dXJuIGJyaWRnZU1hcDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBicmlkZ2VNYXApIHtcbiAgICAgICAgaWYgKGJyaWRnZU1hcFtrZXldKSB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlc1tpXTtcblxuICAgICAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLmJyaWRnZSAmJiBtb2R1bGUuYnJpZGdlW2tleV0pXG4gICAgICAgICAgICBicmlkZ2VNYXBba2V5XSA9IG1vZHVsZS5icmlkZ2Vba2V5XS5hcHBseSh0aGlzLCBbYnJpZGdlTWFwW2tleV0sIG1vZHVsZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJyaWRnZU1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5TW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gLmFwcGx5TW9kdWxlIGlzIGFsc28gdXNlZCBpbiAuaW50ZWdyYXRlTW9kdWxlcygpIGZ1bmN0aW9uLlxuICAgKiBJdCBkb2VzIGV4YWN0bHkgd2hhdCBpdHMgbmFtZSBzYXlzIChhcHBsaWVzIG1vZHVsZSB0byBjb21wb25lbnQgb3IgYXBwKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGFwcGx5XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3B1c2g9dHJ1ZV1cbiAgICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIG1vZHVsZSB0aGF0IHdhcyBhcHBsaWVkLlxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGFwcGx5TW9kdWxlKG1vZHVsZSwgcHVzaCA9IHRydWUpIHtcbiAgICBpZiAoIW1vZHVsZSkgcmV0dXJuO1xuICAgIGlmIChwdXNoICYmIHRoaXMubW9kdWxlcykgdGhpcy5tb2R1bGVzLnB1c2gobW9kdWxlKTtcbiAgICBlbHNlIGlmIChwdXNoKSB0aGlzLm1vZHVsZXMgPSBbbW9kdWxlXTtcblxuICAgIGlmICh0aGlzLm1hbmFnZXIpIHRoaXMubWFuYWdlci5hY3RpdmUobW9kdWxlKTtcblxuICAgIGlmIChtb2R1bGUubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIpIG1vZHVsZS5tYW5hZ2VyKHRoaXMubWFuYWdlcik7XG4gICAgZWxzZSBpZiAobW9kdWxlLm1hbmFnZXIpIHtcbiAgICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAgICdDb21wb25lbnQnLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzIE1vZHVsZU1hbmFnZXIgdGhhdCBpcyB0dXJuZWQgb2ZmIGZvciB0aGlzIGNvbXBvbmVudGAsXG4gICAgICAgIHRoaXMsIG1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLmludGVncmF0ZSkgbW9kdWxlLmludGVncmF0ZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwb3NlcyBvZiBhbGwgbW9kdWxlc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlcygpIHtcbiAgICB3aGlsZSAodGhpcy5tb2R1bGVzLmxlbmd0aClcbiAgICAgIHRoaXMuZGlzcG9zZU1vZHVsZSh0aGlzLm1vZHVsZXNbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIHRoZSBnaXZlbiBtb2R1bGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGRpc3Bvc2VcbiAgICogQHJldHVybiB7TW9kdWxlfSBSZXR1cm5zIG1vZHVsZSB0aGF0IHdhcyByZW1vdmVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlKG1vZHVsZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG5cbiAgICB0aGlzLm1vZHVsZXMuc3BsaWNlKHRoaXMubW9kdWxlcy5pbmRleE9mKG1vZHVsZSksIDEpO1xuXG4gICAgaWYgKG1vZHVsZS5kaXNwb3NlKSBtb2R1bGUuZGlzcG9zZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLy8gUElQRUQgTUVUSE9EXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgbW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gcGlwZWQgdmVyc2lvbiBvZiAuYXBwbHlNb2R1bGUoKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGFwcGx5XG4gICAqIEByZXR1cm4ge3RoaXN9IHJldHVybnMgdGhpcyAtIGFwcC9jb21wb25lbnRcbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlBpcGVkIG1vZHVsZXM8L2NhcHRpb24+XG4gICAqIGNvbXBvbmVudFxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTEoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUyKCkpXG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMygpKVxuICAgKi9cbiAgbW9kdWxlKG1vZHVsZSkge1xuICAgIHRoaXMuYXBwbHlNb2R1bGUobW9kdWxlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRQcm90b3R5cGU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG5leHBvcnQgdmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAgICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gICAqXG4gICAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAgICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICAgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICAgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICAgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gICAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gICAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAgICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAgICpcbiAgICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAgICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICAgKi9cbn07ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59IiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn0iLCIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59IiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9OyIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7RGVwZW5kZW5jeUVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIE1vZHVsZU1hbmFnZXJcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IGhhbmRsZXJcbiAqIEBkZXNjcmlwdGlvbiAgU29sdmVzIG1vZHVsZXMgZGVwZW5kZW5jaWVzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZHVsZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBvYmplY3Q7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcblxuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZSgoc3RhdGUgPSBbe30sICcnXSwgYWN0aW9uKSA9PiB7XG4gICAgICBzdGF0ZVswXVthY3Rpb24ua2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgc3RhdGVbMV0gPSBhY3Rpb24ua2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vZHVsZXMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFjdGl2ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgLmN1cnJlbnRNb2R1bGUgdG8gcHJvdmlkZWQgbW9kdWxlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gbWFrZSBjdXJyZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhY3RpdmUobW9kdWxlKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXQncyAuY3VycmVudE1vZHVsZSB0byBudWxsLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmluZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZSB0aGUgbW9kdWxlIGluIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBkZWZpbmUobmFtZSkge1xuICAgIHRoaXMubW9kdWxlc1tuYW1lXSA9IHRoaXMuY3VycmVudE1vZHVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVzZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgZGVmaW5lZCBtb2R1bGUgZnJvbSBtYW5hZ2VyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBtb2R1bGUgbmFtZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgdXNlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVzW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQW4gYWxpYXMgZm9yIC5hZGQoKSA8YnIvPjxici8+XG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3Uga25vdyB0aGF0IHlvdSB3aWxsIG92ZXJ3cml0ZSBleGlzdGluZyBkZXBlbmRlbmN5Ljxici8+XG4gICAqIFVzZSBpdCBpbiB5b3VyIGFwcCwgYnV0IG5vdCBpbiBtb2R1bGUgdGhhdCB5b3UgcHJvdmlkZSB0byBvdGhlciBwZW9wbGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSB0aGUgdmFsdWUgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHNldChrZXksIGRhdGEpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdBREQnLFxuICAgICAga2V5LFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyBkZXBlbmRlbmN5IGluIHN0b3JlIG9iamVjdCwgYnkga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7T2JqZWN0fE1vZHVsZX1cbiAgICogQHRocm93cyB7RGVwZW5kZW5jeUVycm9yfSBpZiBkZXBlbmRlbmN5IGlzIG5vdCBpbiB0aGUgc3RvcmVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuZ2V0KCdoZWxsbycpOyAvLyAtPiB7d29ybGQ6IHRydWV9XG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgaWYgKCF0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XSkge1xuICAgICAgdGhyb3cgbmV3IERlcGVuZGVuY3lFcnJvcihcbiAgICAgICAgJ01vZHVsZU1hbmFnZXInLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzICcke2tleX0nIGRlcGVuZGVuY3lgLFxuICAgICAgICB0aGlzLmN1cnJlbnRNb2R1bGVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaGFzXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB3aGV0aGVyIG1hbmFnZXIgaGFzIGEgZGVwZW5kZW5jeSB3aXRoIHRoZSBnaXZlbiBrZXlcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNoZWNrIHdoZXRoZXIgdGhlIHN0b3JlIGhhcyB0aGUgJ2hlbGxvJyBkZXBlbmRlbmN5PC9jYXB0aW9uPlxuICAgKiBtYW5hZ2VyLmhhcygnaGVsbG8nKTsgLy8gLT4gdHJ1ZVxuICAgKi9cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgZGVwc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW2RlcHNNYXA9e31dXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1cGRhdGUoZGVwc01hcCA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBkZXBzTWFwW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkXG4gICAqIEBhbGlhcyBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyI3NldFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgYWRkKC4uLmRhdGEpIHtcbiAgICBjb25zb2xlLndhcm4oJy5hZGQoKSBtZXRob2QgaXMgZGVwcmVjYXRlZC4gVXNlIC5zZXQoKSBpbnN0ZWFkJyk7XG4gICAgcmV0dXJuIHRoaXMuc2V0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVxdWlyZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJlcXVpcmUgbW9kdWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIERlZmluZWQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2R1bGVFeGVjdXRvciBGdW5jdGlvbiB0aGF0IHJldHVybnMgYXBwbGllZCBtb2R1bGVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHJlcXVpcmUobmFtZSwgbW9kdWxlRXhlY3V0b3IpIHtcbiAgICBpZiAodGhpcy51c2UobmFtZSkgPT09IHVuZGVmaW5lZCkgdGhpcy5oYW5kbGVyLmFwcGx5TW9kdWxlKG1vZHVsZUV4ZWN1dG9yKCkpO1xuICB9XG59XG4iLCJpbXBvcnQge2V4dGVuZCwgdHJhbnNmb3JtRGF0YX0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbmltcG9ydCB7TWFuYWdlckVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge1xuICAgKiAgIG1vZHVsZXM6IFtdLFxuICAgKiAgIG1hbmFnZXI6IHRydWVcbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIG1vZHVsZXM6IG51bGwsXG4gICAgbWFuYWdlcjogdHJ1ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHt9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge307XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHByb21pc2VzIHRoYXQgc2hvdWxkIGJlIHJlc29sdmVkIGJlZm9yZSBDb21wb25lbnQgaXMgcmVhZHkuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjX3dhaXRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF93YWl0ID0gW107IC8vIENvbGxlY3Rpb24gb2YgcHJvbWlzZXM7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgYG1vZHVsZXNgLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I21vZHVsZXNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbW9kdWxlcyA9IFtdOyAvLyBDb2xsZWN0aW9uIG9mIG1vZHVsZXM7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgYGNoaWxkYCBDb21wb25lbnRzLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2NoaWxkcmVuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNoaWxkcmVuID0gW107IC8vIEZvciBrZWVwaW5nIGNoaWxkcmVuIGNvbXBvbmVudHM7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGRlZmF1bHRzID0gQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIEFwcGx5IHBvbHlmaWxsZWQgcGFyYW1ldGVycyB0byAucGFyYW1zO1xuICAgIHRoaXMucGFyYW1zID0gZXh0ZW5kKHRyYW5zZm9ybURhdGEocGFyYW1zLCBpbnN0cnVjdGlvbnMpLCBkZWZhdWx0cyk7XG4gICAgaWYgKHRoaXMucGFyYW1zLm1hbmFnZXIpIHRoaXMubWFuYWdlciA9IG5ldyBNb2R1bGVNYW5hZ2VyKCk7XG5cbiAgICB0aGlzLm1vZHVsZXMgPSB0aGlzLnBhcmFtcy5tb2R1bGVzO1xuXG4gICAgdGhpcy5pbnRlZ3JhdGVNb2R1bGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3YWl0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV2FpdCBmb3IgYSBwcm9taXNlLlxuICAgKiBAcGFyYW0ge1Byb21pc2V9IFtwcm9taXNlXSAtIFRoZSBwcm9taXNlIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHRvIGEgcXVldWUuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHdhaXQocHJvbWlzZSkge1xuICAgIGlmIChwcm9taXNlKSB0aGlzLl93YWl0LnB1c2gocHJvbWlzZSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX3dhaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmZXJcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlIGBmdW5jYCAoQ2FsbGJhY2spIHdoZW4gQ29tcG9uZW50IGlzIHJlYWR5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gQ2FsbGJhY2suXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGRlZmVyKGZ1bmMpIHtcbiAgICBpZiAodGhpcy5pc0RlZmZlcmVkKSB0aGlzLndhaXQoKS50aGVuKCgpID0+IGZ1bmModGhpcykpO1xuICAgIGVsc2UgZnVuYyh0aGlzKTtcbiAgfVxuXG4gIC8vIFBBUkFNRVRFUlNcblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVQYXJhbXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGVzIHBhcmFtZXRlcnMgb2YgdGhlIENvbXBvbmVudC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBQYXJhbXMgb2YgdGhpcyBDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgdXBkYXRlUGFyYW1zKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBleHRlbmQocGFyYW1zLCB0aGlzLnBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgLy8gQ09QWUlORyAmIENMT05JTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENsb25lIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm4ge29iamVjdH0gYSBjbG9uZWQgY29tcG9uZW50IHdpdGggYWxsIGl0cyBzb3VyY2UgY29tcG9uZW50JyBwYXJhbXMgY29waWVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5wYXJhbXMpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgbmF0aXZlIGFuZCBpbnRlZ3JhdGUgYG1vZHVsZXNgIHRvIGl0LlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gc291cmNlIC0gU291cmNlIGNvbXBvbmVudCB0aGF0IGlzIHVzZWQgZm9yIGBjb3B5KClgIGFjdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZV0gLSBDYWxsYmFjayBleGVjdXRlZCBiZWZvcmUgbW9kdWxlcyBpbnRlZ3JhdGlvbiBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHt0aGlzfSBDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UsIGN1c3RvbWl6ZSkge1xuICAgIHRoaXMucGFyYW1zID0gey4uLnNvdXJjZS5wYXJhbXN9O1xuXG4gICAgaWYgKHNvdXJjZS5uYXRpdmUpIHRoaXMubmF0aXZlID0gc291cmNlLm5hdGl2ZS5jbG9uZShzb3VyY2UucGFyYW1zKTtcbiAgICBpZiAoY3VzdG9taXplKSBjdXN0b21pemUoKTtcbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoc291cmNlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGEgY2hpbGQgYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgYWRkZWQgYXMgYSBgY2hpbGRgLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBkb25lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBhZGQob2JqZWN0KSB7XG4gICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtuYXRpdmV9ID0gb2JqZWN0O1xuICAgICAgICBpZiAoIW5hdGl2ZSkgcmVqZWN0KCk7XG5cbiAgICAgICAgY29uc3QgYWRkUHJvbWlzZSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe29uQWRkOiBvYmplY3R9KS5vbkFkZDtcblxuICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5hZGQobmF0aXZlKTtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWRkUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIGFkZFByb21pc2UudGhlbihyZXNvbHZlcik7XG4gICAgICAgIGVsc2UgcmVzb2x2ZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlIGEgY2hpbGQgYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgYSAqKmNoaWxkKiogb2YgdGhpcyBDb21wb25lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHJlbW92ZShvYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLm5hdGl2ZS5yZW1vdmUob2JqZWN0Lm5hdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRUb1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYHRoaXNgIENvbXBvbmVudCB0byBzcGVjaWZpZWQgYEFwcGAvYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCB3aWxsIGJlIGEgcGFyZW50IG9mIGB0aGlzYC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgYWRkVG8ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBvYmplY3QgaXMgYGFzeW5jYCAoYHdhaXRgIHByb21pc2VzIGFyZSBtb3JlIHRoYW4gYDBgKS5cbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2lzRGVmZmVyZWRcbiAgICovXG4gIGdldCBpc0RlZmZlcmVkKCkge1xuICAgIHJldHVybiB0aGlzLl93YWl0Lmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYE1vZHVsZU1hbmFnZXJgIHVzZWQgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKiBAbWVtYmVyIHtNb2R1bGVNYW5hZ2VyfSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbWFuYWdlclxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqL1xuICBnZXQgbWFuYWdlcigpIHtcbiAgICBpZiAodGhpcy5fbWFuYWdlcikgcmV0dXJuIHRoaXMuX21hbmFnZXI7XG5cbiAgICB0aHJvdyBuZXcgTWFuYWdlckVycm9yKFxuICAgICAgJ0NvbXBvbmVudCcsXG4gICAgICBgTW9kdWxlTWFuYWdlciBpcyBub3QgdXNlZCBpbiB0aGlzIGNvbXBvbmVudC4gJ21hbmFnZXInIHBhcmFtZXRlciBzaG91bGQgYmUgc2V0IGFzICd0cnVlJ2AsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIHNldCBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICB0aGlzLl9tYW5hZ2VyID0gbWFuYWdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgbmF0aXZlYCBvYmplY3QgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I25hdGl2ZVxuICAgKi9cbiAgZ2V0IG5hdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlO1xuICB9XG5cbiAgc2V0IG5hdGl2ZShtZXNoKSB7XG4gICAgdGhpcy5fbmF0aXZlID0gbWVzaDtcbiAgICB0aGlzLl9uYXRpdmUuY29tcG9uZW50ID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENvbXBvbmVudFxufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGVzKC4uLm1hcHBlcnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1hcHBlciA9IG1hcHBlcnNbaV07XG5cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWFwcGVyLm1hcC5sZW5ndGg7IGsrKykge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBtYXBwZXIubWFwW2tdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQucHJvdG90eXBlLCBhdHRyaWJ1dGUsIHtcbiAgICAgICAgICBnZXQ6IG1hcHBlci5nZXR0ZXIoYXR0cmlidXRlKSxcbiAgICAgICAgICBzZXQ6IG1hcHBlci5zZXR0ZXIoYXR0cmlidXRlKSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IG1hcHBlci5jb25maWd1cmFibGUsXG4gICAgICAgICAgZW51bWVyYWJsZTogbWFwcGVyLmVudW1lcmFibGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weSguLi5tYXApIHtcbiAgcmV0dXJuIHtcbiAgICBtYXAsXG4gICAgZ2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVtuYW1lXTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBzZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLm5hdGl2ZVtuYW1lXS5jb3B5KHZhbHVlKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWlycm9yKC4uLm1hcCkge1xuICByZXR1cm4ge1xuICAgIG1hcCxcbiAgICBnZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlW25hbWVdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlW25hbWVdID0gdmFsdWU7XG4gICAgICB9O1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfTtcbn1cbiIsImltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5LCBtaXJyb3J9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3NjYWxlJyksXG4gIG1pcnJvcignbWF0ZXJpYWwnLCAnZ2VvbWV0cnknKVxuKVxuLyoqXG4gKiBAY2xhc3MgTWVzaENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqICAgZ2VvbWV0cnk6IHt9LFxuICAgKiAgIG1hdGVyaWFsOiBmYWxzZSxcbiAgICpcbiAgICogICBzaGFkb3c6IHtcbiAgICogICAgIGNhc3Q6IHRydWUsXG4gICAqICAgICByZWNlaXZlOiB0cnVlXG4gICAqICAgfSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgc2NhbGU6IHt4OiAxLCB5OiAxLCB6OiAxfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG4gICAgZ2VvbWV0cnk6IHt9LFxuICAgIG1hdGVyaWFsOiBmYWxzZSxcblxuICAgIHNoYWRvdzoge1xuICAgICAgY2FzdDogdHJ1ZSxcbiAgICAgIHJlY2VpdmU6IHRydWVcbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHNjYWxlOiB7eDogMSwgeTogMSwgejogMX1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICAvLyBDVVNUT00gR0VPTUVUUlkgSEFORExJTkdcblxuICBzdGF0aWMgY3VzdG9tKGdlb20sIGNvbnN0cnVjdG9yID0gTWVzaCkge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAgICAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICAgICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogZ2VvbSxcbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgY29uc3RydWN0b3IoZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoZ2VvbSwgcGFyYW1zLCBjb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBuZXcgKE1lc2hDb21wb25lbnQuY3VzdG9tKGdlb20sIGNvbnN0cnVjdG9yKSkocGFyYW1zKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBNZXNoQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBNZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgICB0aGlzLndyYXAoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuICAgICAgICB0aGlzLndyYXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gVE9ETzogRml4IGRlZmVyIHdpdGggcGh5c2ljc1xuICAgICAgLy8gdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICBjb25zdCB7cG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZSwgc2hhZG93fSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnopO1xuICAgICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUueCwgc2NhbGUueSwgc2NhbGUueik7XG5cbiAgICAgIHRoaXMubmF0aXZlLmNhc3RTaGFkb3cgPSBzaGFkb3cuY2FzdDtcbiAgICAgIHRoaXMubmF0aXZlLnJlY2VpdmVTaGFkb3cgPSBzaGFkb3cucmVjZWl2ZTtcblxuICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAvLyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBNZXNoQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTWVzaENvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7TWVzaENvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGNsb25lKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgIGNvbnN0IGRlc3QgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcblxuICAgIGlmIChnZW9tZXRyeSkgZGVzdC5nZW9tZXRyeSA9IGRlc3QuZ2VvbWV0cnkuY2xvbmUoKTtcbiAgICBpZiAobWF0ZXJpYWwpIGRlc3QubWF0ZXJpYWwgPSBkZXN0Lm1hdGVyaWFsLmNsb25lKCk7XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBNZXNoQ29tcG9uZW50XG59O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5fSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICd0YXJnZXQnKVxuKVxuLyoqXG4gKiBAY2xhc3MgTGlnaHRDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExpZ2h0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqXG4gICAqICAgc2hhZG93OiB7XG4gICAqICAgICBjYXN0OiB0cnVlLFxuICAgKlxuICAgKiAgICAgYmlhczogMCxcbiAgICogICAgIHJhZGl1czogMSxcbiAgICpcbiAgICogICAgIG1hcFNpemU6IHtcbiAgICogICAgICAgd2lkdGg6IDEwMjQsXG4gICAqICAgICAgIGhlaWdodDogMTAyNFxuICAgKiAgICAgfSxcbiAgICpcbiAgICogICAgIGNhbWVyYToge1xuICAgKiAgICAgICBuZWFyOiB0cnVlLFxuICAgKiAgICAgICBmYXI6IDQwMCxcbiAgICogICAgICAgZm92OiA5MCxcbiAgICpcbiAgICogICAgICAgdG9wOiAyMDAsXG4gICAqICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICogICAgICAgbGVmdDogLTIwMCxcbiAgICogICAgICAgcmlnaHQ6IDIwMFxuICAgKiAgICAgfVxuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcblxuICAgIHNoYWRvdzoge1xuICAgICAgY2FzdDogdHJ1ZSxcblxuICAgICAgYmlhczogMCxcbiAgICAgIHJhZGl1czogMSxcblxuICAgICAgbWFwU2l6ZToge1xuICAgICAgICB3aWR0aDogMTAyNCxcbiAgICAgICAgaGVpZ2h0OiAxMDI0XG4gICAgICB9LFxuXG4gICAgICBjYW1lcmE6IHtcbiAgICAgICAgbmVhcjogdHJ1ZSxcbiAgICAgICAgZmFyOiA0MDAsXG4gICAgICAgIGZvdjogOTAsXG5cbiAgICAgICAgdG9wOiAyMDAsXG4gICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICAgICAgbGVmdDogLTIwMCxcbiAgICAgICAgcmlnaHQ6IDIwMFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IExpZ2h0Q29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ0xpZ2h0Q29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHRoaXMubmF0aXZlID0gYnVpbGQ7XG5cbiAgICAgIHRoaXMud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9uLCByb3RhdGlvbn0gPSB0aGlzLnBhcmFtcztcblxuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XG5cbiAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFNoYWRvd1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHNoYWRvdyBwcm9wZXJ0aWVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcFNoYWRvdygpIHtcbiAgICBjb25zdCB7bmF0aXZlLCBwYXJhbXM6IHtzaGFkb3d9fSA9IHRoaXM7XG5cbiAgICBuYXRpdmUuY2FzdFNoYWRvdyA9IHNoYWRvdy5jYXN0O1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IHNoYWRvdy5tYXBTaXplLndpZHRoO1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSBzaGFkb3cubWFwU2l6ZS5oZWlnaHQ7XG4gICAgbmF0aXZlLnNoYWRvdy5iaWFzID0gc2hhZG93LmJpYXM7XG4gICAgbmF0aXZlLnNoYWRvdy5yYWRpdXMgPSBzaGFkb3cucmFkaXVzO1xuXG4gICAgY29uc3Qgc2hhZG93Q2FtZXJhID0gbmF0aXZlLnNoYWRvdy5jYW1lcmE7XG4gICAgY29uc3QgY2FtZXJhID0gc2hhZG93LmNhbWVyYTtcblxuICAgIHNoYWRvd0NhbWVyYS5uZWFyID0gY2FtZXJhLm5lYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZhciA9IGNhbWVyYS5mYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZvdiA9IGNhbWVyYS5mb3Y7XG5cbiAgICBzaGFkb3dDYW1lcmEubGVmdCA9IGNhbWVyYS5sZWZ0O1xuICAgIHNoYWRvd0NhbWVyYS5yaWdodCA9IGNhbWVyYS5yaWdodDtcbiAgICBzaGFkb3dDYW1lcmEudG9wID0gY2FtZXJhLnRvcDtcbiAgICBzaGFkb3dDYW1lcmEuYm90dG9tID0gY2FtZXJhLmJvdHRvbTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBMaWdodENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTGlnaHRDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge0xpZ2h0Q29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMaWdodENvbXBvbmVudFxufTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weX0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAndGFyZ2V0Jylcbilcbi8qKlxuICogQGNsYXNzIENhbWVyYUNvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ2FtZXJhQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBDYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENhbWVyYUNvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgdGhpcy5uYXRpdmUgPSBidWlsZDtcblxuICAgICAgdGhpcy53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQodGhpcy5wYXJhbXMucG9zaXRpb24ueCwgdGhpcy5wYXJhbXMucG9zaXRpb24ueSwgdGhpcy5wYXJhbXMucG9zaXRpb24ueik7XG4gICAgICAgIHRoaXMucm90YXRpb24uc2V0KHRoaXMucGFyYW1zLnJvdGF0aW9uLngsIHRoaXMucGFyYW1zLnJvdGF0aW9uLnksIHRoaXMucGFyYW1zLnJvdGF0aW9uLnopO1xuXG4gICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gQ2FtZXJhQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgQ2FtZXJhQ29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtDYW1lcmFDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDYW1lcmFDb21wb25lbnRcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuICByZXR1cm4gdGltZVswXSAqIDFlMyArIHRpbWVbMV0gLyAxZTY7XG59O1xuIiwiaW1wb3J0IHByZXNlbnQgZnJvbSAncHJlc2VudCc7XG5cbmV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICBnbG9iYWwucGVyZm9ybWFuY2UgPSB7XG4gICAgbm93OiBwcmVzZW50XG4gIH07XG59XG4iLCJpbXBvcnQge3ZlcnNpb259IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vcG9seWZpbGwnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcblxuLyoqXG4gKiBAY2xhc3MgQXBwXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gcHJlcGFyZSBhIHdvcmxkIHNjZW5lLCBzZXR1cCBwaHlzaWNzLCBjYW1lcmEsIHJlbmRlcmVyIGFuZCBhbGwgb3RoZXIgdGhpbmdzIHRoYXQgeW91IHVzdWFsbHkgZG8gYmVmb3JlIG1ha2luZyBtZXNoZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbbW9kdWxlcz1bXV0gLSBBcnJheSBvZiBNb2R1bGVzXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogU2ltdWxhdGUgZmxhZ1xuICAgKiBAZGVzY3JpcHRpb24gU2FtZSBhcyAudXBkYXRlRW5hYmxlZCwgYnV0IGZvciBwaHlzaWNzLiBEZWZpbmVzIGlmIHBoeXNpY3MgaXMgc2ltdWxhdGVkIGVhY2ggZnJhbWUuXG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkFwcCNzaW11bGF0ZVxuICAgKiBAcHVibGljXG4gICAqL1xuICBzaW11bGF0ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lcyB3aGV0aGVyIHRoZSBzY2VuZSBzaG91bGQgcmVuZGVyIG9yIG5vdFxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjdXBkYXRlRW5hYmxlZFxuICAgKiBAcHVibGljXG4gICAqL1xuICB1cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcblxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIodGhpcyk7XG4gICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcztcblxuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcygpO1xuICB9XG5cbiAgLy8gQ09OVFJPTFMgJiBVUERBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0YXJ0XG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydCByZW5kZXJpbmcgbG9vcCBhbmQgcGh5c2ljcyBzaW11bGF0aW9uIChpZiB5b3UgdXNlIHZlcnNpb24gd2l0aCBwaHlzaWNzKS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgcmVxdWVzdEFuaW1GcmFtZSA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gc3lzdGVtLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3lzdGVtLndpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB7bG9vcHMsIHVwZGF0ZUVuYWJsZWR9ID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHByb2Nlc3MpO1xuICAgICAgaWYgKCF1cGRhdGVFbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IGxvb3BzLmxlbmd0aDsgaSA8IGxsOyBpKyspIHtcbiAgICAgICAgY29uc3QgZSA9IGxvb3BzW2ldO1xuICAgICAgICBpZiAoZS5lbmFibGVkKSBlLmV4ZWN1dGUoZS5jbG9jayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyByZW5kZXJpbmcgbG9vcHNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnVwZGF0ZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZExvb3BcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgbG9vcCB0byB0aGlzIGFwcC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGxvb3AgLSB0aGUgbG9vcCB0byBhZGRcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkFkZGluZyBhIGxvb3AgdG8gYW4gYXBwPC9jYXB0aW9uPlxuICAgKiBjb25zdCBsb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgKiAgLy8gLi4uXG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4gICAqXG4gICAqIGFwcC5hZGRMb29wKGxvb3ApO1xuICAgKiBsb29wLnN0YXJ0KCk7XG4gICAqL1xuICBhZGRMb29wKGxvb3ApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmxvb3BzLnB1c2gobG9vcCk7XG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlTG9vcFxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBsb29wIGZyb20gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgcmVtb3ZlTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvb3BzLmluZGV4T2YobG9vcCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLmxvb3BzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgIHJlc29sdmUobG9vcCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXQoa2V5KTtcbiAgfVxuXG4gIHVzZShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLnVzZShrZXkpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsImltcG9ydCB7Q2xvY2t9IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMsIHVzZUNsb2NrID0gdHJ1ZSkge1xuICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgdGhpcy5jbG9jayA9IHVzZUNsb2NrID8gbmV3IENsb2NrKCkgOiBudWxsO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQ09OVFJPTFNcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0cyB0aGlzIGxvb3AsIGNsb2NrIGlmIGl0IGhhcyBvbmUuIFdvbid0IGRvIGFueXRoaW5nIGlmIGxvb3AgZW5hYmxlZCBhbHJlYWR5LlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gYWRkIHRoaXMgbG9vcCB0bywgaWYgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Mb29wXG4gICAqL1xuICBzdGFydCh3b3JsZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh3b3JsZCkgd29ybGQuYWRkTG9vcCh0aGlzKTtcblxuICAgIGlmICh0aGlzLmNsb2NrKSB0aGlzLmNsb2NrLnN0YXJ0KCk7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0b3BcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyB0aGlzIGxvb3AgYW5kIGl0cyBjbG9jayBpZiBpdCBoYXMgb25lLCB3b24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGxvb3AgaXMgbm90IGVuYWJsZWQpXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBbd29ybGRdIGFwcCB0byByZW1vdmUgdGhpcyBsb29wIGZyb20sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RvcCh3b3JsZCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdG9wKCk7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLnJlbW92ZUxvb3AodGhpcyk7XG4gIH1cblxuICAvLyBFWEVDVVRJT05cblxuICAvKipcbiAgICogQG1ldGhvZCBleGVjdXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKiBAcmV0dXJucyB7Kn0gd2hhdGV2ZXIgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcCByZXR1cm5zXG4gICAqL1xuICBleGVjdXRlKCkge1xuICAgIHJldHVybiB0aGlzLmZ1bmModGhpcy5jbG9jayk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuIiwiaW1wb3J0IHtBbWJpZW50TGlnaHQgYXMgQW1iaWVudExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQW1iaWVudExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBBbWJpZW50TGlnaHQgaXMgYSBzaW1wbGUgY2xhc3MsIGl0IGV4dGVuZHMgTGlnaHQgYW5kIGluaGVyaXRzIGFsbCBpdHMgbWV0aG9kcy5cbiAqIEFtYmllbnRMaWdodCBjcmVhdGVzIGJhc2ljIGxpZ2h0IGFyb3VuZCBhbGwgc2NlbmUsIHNvIGl0IGRvZXNuJ3QgbmVlZCBwcm9wZXJ0aWVzIGxpa2UgcG9zIG9yIHRhcmdldC5cbiAqIEl0IHN1cHBvcnRzIG9ubHkgY29sb3IgYW5kIGludGVuc2l0eSBhcyBwYXJhbWV0ZXJzLCB3aGljaCBkZWZpbmVzIHRoZSBjb2xvciBvZiB0aGUgc3Vycm91bmRlZCBsaWdodCBhbmQgaW50ZW5zaXR5IG9mIGxpZ2h0LlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIEFtYmllbnRMaWdodCA8L2NhcHRpb24+XG4gKiBuZXcgQW1iaWVudExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8od29ybGQpO1xuICovXG5jbGFzcyBBbWJpZW50TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQW1iaWVudExpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgQW1iaWVudExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBbWJpZW50TGlnaHRcbn07XG4iLCJpbXBvcnQge0RpcmVjdGlvbmFsTGlnaHQgYXMgRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSwgRGlyZWN0aW9uYWxMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERpcmVjdGlvbmFsTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIERpcmVjdGluYWxMaWdodCBjcmVhdGVzIGEgbGlnaHQgdGhhdCBzaGluZXMgZnJvbSBhIHNwZWNpZmljIGRpcmVjdGlvbiBub3QgZnJvbSBhIHNwZWNpZmljIHBvc2l0aW9uLjxici8+PGJyLz5cbiAqIFRoaXMgbGlnaHQgd2lsbCBiZWhhdmUgYXMgdGhvdWdoIGl0IGlzIGluZmluaXRlbHkgZmFyIGF3YXkgYW5kIHRoZSByYXlzIHByb2R1Y2VkIGZyb20gaXQgYXJlIGFsbCBwYXJhbGxlbC4gPGJyLz48YnIvPlxuICogVGhlIGJlc3QgYW5hbG9neSB3b3VsZCBiZSBhIGxpZ2h0IHNvdXJjZSB0aGF0IGFjdHMgbGlrZSB0aGUgc3VuOiB0aGUgc3VuIGlzIHNvIGZhciBhd2F5IHRoYXQgYWxsIHN1bmxpZ2h0IGhpdHRpbmcgb2JqZWN0cyBjb21lcyBmcm9tIHRoZSBzYW1lIGFuZ2xlLjxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBvcHRpb25zIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCBwYXJhbWF0ZXIsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0IHBhcmFtYXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBEaXJlY3Rpb25hbExpZ2h0IHRvIGZhbGwgZG93biBmcm9tIHZlYzMoMTAsIDIwLCAxMCkgdG8gdmVjMygwLCAwLCAwKTwvY2FwdGlvbj5cbiAqIG5ldyBEaXJlY3Rpb25hbExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMixcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMTAsIDIwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERpcmVjdGlvbmFsTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRGlyZWN0aW9uYWxMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IERpcmVjdGlvbmFsTGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIERpcmVjdGlvbmFsTGlnaHRcbn07XG4iLCJpbXBvcnQge0hlbWlzcGhlcmVMaWdodCBhcyBIZW1pc3BoZXJlTGlnaHROYXRpdmUsIEhlbWlzcGhlcmVMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEhlbWlzcGhlcmVMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gSGVtaXNwaGVyZUxpZ2h0IGlzIGEgbGlnaHQgc291cmNlIHBvc2l0aW9uZWQgZGlyZWN0bHkgYWJvdmUgdGhlIHNjZW5lLjxici8+XG4gKiBJdCBhbHNvIGRvZXNuJ3QgbmVlZCBwb3NpdGlvbiBhbmQgdGFyZ2V0IHByb3BlcnRpZXMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfbGlnaHRzX2hlbWlzcGhlcmUuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7c2t5Q29sb3I6IDB4ZmZmZmZmLCBncm91bmRDb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBIZW1pc3BoZXJlTGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgSGVtaXNwaGVyZUxpZ2h0KHtcbiAqICAgc2t5Q29sb3I6IDB4ZmYwMDAwLFxuICogICBncm91bmRDb2xvcjogMHgwMDAwZmYsXG4gKiAgIGludGVuc2l0eTogMC4yXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBIZW1pc3BoZXJlTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHNreUNvbG9yOiAweGZmZmZmZixcbiAgICBncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSGVtaXNwaGVyZUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLnNreUNvbG9yLFxuICAgICAgcGFyYW1zLmdyb3VuZENvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBIZW1pc3BoZXJlTGlnaHRcbn07XG4iLCJpbXBvcnQge1BvaW50TGlnaHQgYXMgUG9pbnRMaWdodE5hdGl2ZSwgUG9pbnRMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBvaW50TGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIFBvaW50TGlnaHQgY3JlYXRlcyBhIGxpZ2h0IGF0IGEgc3BlY2lmaWMgcG9zaXRpb24gaW4gdGhlIHNjZW5lLiBUaGUgbGlnaHQgc2hpbmVzIGluIGFsbCBkaXJlY3Rpb25zIChyb3VnaGx5IHNpbWlsYXIgdG8gYSBsaWdodCBidWxiLik8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3NpdGlvbiwgZGlzdGFuY2UgYW5kIGRlY2F5Ljxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMSwgZGlzdGFuY2U6IDEwMCwgZGVjYXk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUG9pbnRMaWdodDwvY2FwdGlvbj5cbiAqIG5ldyBQb2ludExpZ2h0KCB7XG4gKiAgIGNvbG9yOiAweGZmMDAwMCxcbiAqICAgaW50ZW5zaXR5OiAyLFxuICogICBkaXN0YW5jZTogMzAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2ludExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHM9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBkZWNheTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBvaW50TGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBQb2ludExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQb2ludExpZ2h0XG59O1xuIiwiaW1wb3J0IHtTcG90TGlnaHQgYXMgU3BvdExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BvdExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBTcG90TGlnaHQgY3JlYXRlcyBzcG90IGxpZ2h0IHRoYXQgY2FuIGNhc3Qgc2hhZG93IGluIG9uZSBkaXJlY3Rpb24uIDxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBwYXJhbWV0ZXJzIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zIGFuZCB0YXJnZXQuIDxici8+PGJyLz5cbiAqIFNwb3RMaWdodCBhZmZlY3RzIG1lc2hlcyB3aXRoIGxhbWJlcnQgYW5kIHBob25nIG1hdGVyaWFsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19zcG90bGlnaHQuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGFuZ2xlOiBNYXRoLlBJIC8gMywgZXhwb25lbnQ6IDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwb3RMaWdodCB0aGF0IGZhbGxzIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgU3BvdExpZ2h0KHtcbiAqICAgY29sb3I6IDB4MDBmZjAwLFxuICogICBpbnRlbnNpdHk6IDMsXG4gKiAgIGRpc3RhbmNlOiAxMDAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTcG90TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBhbmdsZTogTWF0aC5QSSAvIDMsXG4gICAgZXhwb25lbnQ6IDAsXG4gICAgZGVjYXk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU3BvdExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgU3BvdExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5hbmdsZSxcbiAgICAgIHBhcmFtcy5leHBvbmVudCxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcG90TGlnaHRcbn07XG4iLCJpbXBvcnQge1JlY3RBcmVhTGlnaHQgYXMgUmVjdEFyZWFMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbmNsYXNzIEFyZWFMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMSxcbiAgICB3aWR0aDogMTAsXG4gICAgaGVpZ2h0OiAxMFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBBcmVhTGlnaHQuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBSZWN0QXJlYUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy53aWR0aCxcbiAgICAgIHBhcmFtcy5oZWlnaHRcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQXJlYUxpZ2h0XG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9saWdodHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQW1iaWVudExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vRGlyZWN0aW9uYWxMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0hlbWlzcGhlcmVMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL1BvaW50TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9TcG90TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9BcmVhTGlnaHQnO1xuIiwiaW1wb3J0IHtDdWJlQ2FtZXJhIGFzIEN1YmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN1YmVDYW1lcmFcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIDYgY2FtZXJhcyB0aGF0IHJlbmRlciB0byBhIFdlYkdMUmVuZGVyVGFyZ2V0Q3ViZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlcyBhIEN1YmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgQ3ViZUNhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGN1YmVSZXNvbHV0aW9uOiAyNTZcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KTtcbiAqXG4gKiBhcHAuY2FtZXJhID0gY2FtZXJhO1xuICovXG5jbGFzcyBDdWJlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLkN1YmVDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgY2FtZXJhOiB7XG4gICAqICAgICBuZWFyOiAxLFxuICAgKiAgICAgZmFyOiAxMDAwLFxuICAgKiAgICAgY3ViZVJlc29sdXRpb246IDEyOFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ3ViZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBDdWJlQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyLFxuICAgICAgcGFyYW1zLmN1YmVSZXNvbHV0aW9uXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDdWJlQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtPcnRob2dyYXBoaWNDYW1lcmEgYXMgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uLy4uL3BvbHlmaWxsJztcblxuLyoqXG4gKiBAY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggb3J0aG9ncmFwaGljIHByb2plY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gT3J0aG9ncmFwaGljQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogNTBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5PcnRob2dyYXBoaWNDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgbmVhcjogMSxcbiAgICogICBmYXI6IDEwMDAsXG4gICAqICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAqICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAqICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICogICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBPcnRob2dyYXBoaWNDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLmxlZnQsXG4gICAgICBwYXJhbXMucmlnaHQsXG4gICAgICBwYXJhbXMudG9wLFxuICAgICAgcGFyYW1zLmJvdHRvbSxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgT3J0aG9ncmFwaGljQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYSBhcyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggcGVyc3BlY3RpdmUgcHJvamVjdGlvbi5cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbiBQZXJzcGVjdGl2ZUNhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSh7XG4gKiAgIGZvdjogNzUsXG4gKiAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmEgZXh0ZW5kcyBDYW1lcmFDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLlBlcnNwZWN0aXZlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGZvdjogNzUsXG4gICAqICAgYXNwZWN0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBmb3Y6IDc1LFxuICAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQZXJzcGVjdGl2ZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5mb3YsXG4gICAgICBwYXJhbXMuYXNwZWN0LFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQZXJzcGVjdGl2ZUNhbWVyYVxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvY2FtZXJhcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9DdWJlQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vT3J0aG9ncmFwaGljQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vUGVyc3BlY3RpdmVDYW1lcmEnO1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQm94QnVmZmVyR2VvbWV0cnksXG4gIEJveEdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBCb3hcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEFzIHRvbGQgb24gQ29tcG9uZW50IGRlZmluaXRpb24sIHdoaWxlIHlvdSBjYW4gcGFzcyBhbnkgb2YgdGhlIGluaGVyaXRlZCBwYXJhbXMgZm9yIHRoaXMgY29tcG9uZW50IGNvbnN0cnVjdGlvbiwgeW91IHdpbGwgbmVlZCB0b1xuICogcGFzcyBzcGVjaWZpYyBwYXJhbWV0ZXJzIHRvIGJ1aWxkIHRoaXMgbWVzaCBhcyBhIGdlb21ldHJ5IG9iamVjdC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjQm94R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEJveCwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiAgbmV3IEJveCh7XG4gKiAgICBnZW9tZXRyeToge1xuICogICAgICB3aWR0aDogMixcbiAqICAgICAgaGVpZ2h0OiAyLFxuICogICAgICBkZXB0aDogMlxuICogICAgfSxcbiAqXG4gKiAgICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgICB9KSxcbiAqXG4gKiAgICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBCb3ggZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB3aWR0aDogMSxcbiAgICogICAgIGhlaWdodDogMSxcbiAgICogICAgIGRlcHRoOiAxLFxuICAgKiAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgZGVwdGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgZGVwdGg6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiAxLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBkZXB0aFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ2RlcHRoJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnLCAnZGVwdGhTZWdlbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBCb3guZGVmYXVsdHMsIEJveC5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Cb3hcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEJveEJ1ZmZlckdlb21ldHJ5IDogQm94R2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRlcHRoU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEJveFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENpcmNsZUJ1ZmZlckdlb21ldHJ5LFxuICBDaXJjbGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ2lyY2xlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NpcmNsZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDaXJjbGUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBDaXJjbGUoe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgcmFkaXVzOiA0LFxuICogICAgICBzZWdtZW50czogMTZcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQ2lyY2xlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiA1MCxcbiAgICogICAgIHNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiA1MCxcbiAgICAgIHNlZ21lbnRzOiA4LFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdzZWdtZW50cycsICd0aGV0YVN0YXJ0JywgJ3RoZXRhTGVuZ3RoJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ2lyY2xlLmRlZmF1bHRzLCBDaXJjbGUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ2lyY2xlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDaXJjbGVCdWZmZXJHZW9tZXRyeSA6IENpcmNsZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ2lyY2xlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ29uZUJ1ZmZlckdlb21ldHJ5LFxuICBDb25lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENvbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NvbmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ29uZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ29uZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENvbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICAgICdvcGVuRW5kZWQnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ29uZS5kZWZhdWx0cywgQ29uZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ29uZUJ1ZmZlckdlb21ldHJ5IDogQ29uZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm9wZW5FbmRlZCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDb25lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ3lsaW5kZXJCdWZmZXJHZW9tZXRyeSxcbiAgQ3lsaW5kZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ3lsaW5kZXJcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0N5bGluZGVyR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEN5bGluZGVyLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBDeWxpbmRlcih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEN5bGluZGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXNUb3A6IDIwLFxuICAgKiAgICAgcmFkaXVzQm90dG9tOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1c1RvcDogMCxcbiAgICAgIHJhZGl1c0JvdHRvbTogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeTogW1xuICAgKiAgICdyYWRpdXNUb3AnLFxuICAgKiAgICdyYWRpdXNCb3R0b20nLFxuICAgKiAgICdoZWlnaHQnLFxuICAgKiAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICogICAnb3BlbkVuZGVkJyxcbiAgICogICAndGhldGFTdGFydCcsXG4gICAqICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiBdXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1c1RvcCcsXG4gICAgICAncmFkaXVzQm90dG9tJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN5bGluZGVyLmRlZmF1bHRzLCBDeWxpbmRlci5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXJcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEN5bGluZGVyQnVmZmVyR2VvbWV0cnkgOiBDeWxpbmRlckdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNUb3AsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzQm90dG9tLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3lsaW5kZXJcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgRG9kZWNhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERvZGVjYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgZG9kZWNhaGVkcm9uIGlzIGFueSBwb2x5aGVkcm9uIHdpdGggdHdlbHZlIGZsYXQgZmFjZXMuIDxici8+PGJyLz5cbiAqIFRoZSBtb3N0IGZhbWlsaWFyIGRvZGVjYWhlZHJvbiBpcyB0aGUgcmVndWxhciBkb2RlY2FoZWRyb24sIHdoaWNoIGlzIGEgUGxhdG9uaWMgc29saWQuIDxici8+XG4gKiBUaGVyZSBhcmUgYWxzbyB0aHJlZSByZWd1bGFyIHN0YXIgZG9kZWNhaGVkcmEsIHdoaWNoIGFyZSBjb25zdHJ1Y3RlZCBhcyBzdGVsbGF0aW9ucyBvZiB0aGUgY29udmV4IGZvcm0uIDxici8+XG4gKiBBbGwgb2YgdGhlc2UgaGF2ZSBpY29zYWhlZHJhbCBzeW1tZXRyeSwgb3JkZXIgMTIwLlxuICogRG9kZWNhaGVkcm9uIGNyZWF0ZXMgRG9kZWNhaGVkcm9uIG9iamVjdCBieSBpdCdzIHJhZGl1cyBhbmQgZGV0YWlsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNEb2RlY2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRG9kZWNhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBEb2RlY2FoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAxMFxuICogICB9XG4gICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRG9kZWNhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeToge1xuICAgKiAgIHJhZGl1czogMSxcbiAgICogICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRG9kZWNhaGVkcm9uLmRlZmF1bHRzLCBEb2RlY2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkRvZGVjYWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IERvZGVjYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEb2RlY2FoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBCdWZmZXJHZW9tZXRyeSxcbiAgRXh0cnVkZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBFeHRydWRlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBFeHRydWRlIGdlb21ldHJ5IG1lYW5zIHRoYXQgeW91IGNhbiBjcmVhdGUgYSAzRCBtZXNoIGZyb20gYW55IDJEIHNoYXBlIHVzaW5nIHRocmVlLmpzIGdlb21ldHJ5IGJhc2VkIG9uIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL21hdGgvVmVjdG9yMic+VEhSRUUuVmVjdG9yMi48L2E+IDxici8+XG4gKiBTdWNoIGltcGxlbWVudGF0aW9uIHdpbGwgaGVscCB5b3UgdG8gbWFrZSB2b2x1bWVkIHNoYXBlcyB0aGF0IGhhdmUgdGhlaXIgb3duIGRlcHRoIGFuZCBjYW4gYmUgc2VlbiBmcm9tIGFsbCBhbmdlbHMuPGJyLz48YnIvPlxuICogWW91IGNhbiBhbHNvIGZpbmQgc29tZSBpbnRlcmVzdGluZyBleGFtcGxlcyBtYWRlIHVzaW5nIDxhIGhyZWY9J3RocmVlanMub3JnJz50aHJlZS5qczwvYT4gd2hpY2ggaXMgYSBjb3JlIG9mIHdocy5qcywgc3VjaCBhczpcbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc2hhcGVzLmh0bWwnPldlYmdsIGdlb21ldHJ5IGV4dHJ1ZGU8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlczIuaHRtbCc+RXh0cnVkZSBzaGFwZXMgZnJvbSBnZW9kYXRhPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zcGxpbmVzLmh0bWwnPkV4dHJ1ZGUgc3BsaW5lczwvYT5cbiAqXG4gKiBTdWNoIGV4YW1wbGVzIGNhbiBiZSBlYXNpbHkgaW1wbGVtZW50ZWQgdXNpbmcgd2hpdGVzdG9ybS5qcyBvciBpdCdzIHBsdWdpbnMuIFVzZSBgRXh0cnVkZWAgY2xhc3Mgd2l0aCA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9leHRyYXMvY29yZS9TaGFwZSc+VEhSRUUuU2hhcGU8L2E+IHRvIGdldCBleHRydWRlIGVmZmVjdCBvZiBzaGFwZSBkZWZpbmVkIGJ5IDJEIHZlY3RvcnMuXG4gKiBUaGlzIGNsYXNzIGlzIHNpbWlsYXIgdG8gPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZ2VvbWV0cmllcy9FeHRydWRlR2VvbWV0cnknPlRIUkVFLkV4dHJ1ZGVHZW9tZXRyeTwvYT4sXG4gKiBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgcHJvcGVydGllcywgYXBwbGllZCBieSBgU2hhcGVgLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNFeHRydWRlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIHNoYXBlLCB0aGVuIGFuIEV4dHJ1ZGUgZnJvbSBpdDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKFtcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigtMiwwKSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsMiksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLC0yKVxuICogXSk7XG4gKlxuICogY29uc3QgZXh0cnVkZSA9IG5ldyBFeHRydWRlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZXM6IHNoYXBlLFxuICogICAgIG9wdGlvbnM6IHtcbiAqICAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gKiAgICAgICBiZXZlbFNpemU6IDAsXG4gKiAgICAgICBhbW91bnQ6IDJcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pO1xuICpcbiAqIGV4dHJ1ZGUuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRXh0cnVkZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXSxcbiAgICogICAgIG9wdGlvbnM6IHt9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW10sXG4gICAgICBvcHRpb25zOiB7fVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJywgJ29wdGlvbnMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBFeHRydWRlLmRlZmF1bHRzLCBFeHRydWRlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRXh0cnVkZUdlb21ldHJ5KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNoYXBlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcHRpb25zXG4gICAgKTtcblxuICAgIHJldHVybiBwYXJhbXMuYnVmZmVyID8gbmV3IEJ1ZmZlckdlb21ldHJ5KCkuZnJvbUdlb21ldHJ5KGdlb21ldHJ5KSA6IGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEV4dHJ1ZGVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBJY29zYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBJY29zYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGFuIGljb3NhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiB3aXRoIDIwIGZhY2VzLjxici8+XG4gKiBUaGVyZSBhcmUgbWFueSBraW5kcyBvZiBpY29zYWhlZHJhLCB3aXRoIHNvbWUgYmVpbmcgbW9yZSBzeW1tZXRyaWNhbCB0aGFuIG90aGVycy4gVGhlIG1vc3Qgd2VsbCBrbm93biBpcyB0aGUgUGxhdG9uaWMsIGNvbnZleCByZWd1bGFyIGljb3NhaGVkcm9uLjxici8+XG4gKiBgSWNvc2FoZWRyb25gIGNyZWF0ZXMgYW4gSWNvc2FoZWRyb24gb2JqZWN0IGJ5IGl0cyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjSWNvc2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSWNvc2FoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IEljb3NhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEljb3NhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JY29zYWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge2dlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXX1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEljb3NhaGVkcm9uLmRlZmF1bHRzLCBJY29zYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IEljb3NhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEljb3NhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGF0aGVCdWZmZXJHZW9tZXRyeSxcbiAgTGF0aGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgTGF0aGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgYExhdGhlR2VvbWV0cnlgIGFsbG93cyB5b3UgdG8gY3JlYXRlIHNoYXBlcyBmcm9tIGEgc21vb3RoIGN1cnZlLlxuICogVGhpcyBjdXJ2ZSBpcyBkZWZpbmVkIGJ5IGEgbnVtYmVyIG9mIHBvaW50cyAoYWxzbyBjYWxsZWQga25vdHMpIGFuZCBpcyBtb3N0IG9mdGVuIGNhbGxlZCBhIHNwbGluZS4gVGhpcyBzcGxpbmUgaXMgcm90YXRlZCBhcm91bmQgYSBmaXhlZCBwb2ludCBhbmQgcmVzdWx0cyBpbiB2YXNlLSBhbmQgYmVsbC1saWtlIHNoYXBlcy48YnIvPjxici8+XG4gKiBJbiAzRCBjb21wdXRlciBncmFwaGljcywgYSBsYXRoZWQgb2JqZWN0IGlzIGEgM0QgbW9kZWwgd2hvc2UgdmVydGV4IGdlb21ldHJ5IGlzIHByb2R1Y2VkIGJ5IHJvdGF0aW5nIHRoZSBwb2ludHMgb2YgYSBzcGxpbmUgb3Igb3RoZXIgcG9pbnQgc2V0IGFyb3VuZCBhIGZpeGVkIGF4aXMuXG4gKiBUaGUgbGF0aGluZyBtYXkgYmUgcGFydGlhbDsgdGhlIGFtb3VudCBvZiByb3RhdGlvbiBpcyBub3QgbmVjZXNzYXJpbHkgYSBmdWxsIDM2MCBkZWdyZWVzLlxuICogVGhlIHBvaW50IHNldCBwcm92aWRpbmcgdGhlIGluaXRpYWwgc291cmNlIGRhdGEgY2FuIGJlIHRob3VnaHQgb2YgYXMgYSBjcm9zcyBzZWN0aW9uIHRocm91Z2ggdGhlIG9iamVjdCBhbG9uZyBhIHBsYW5lIGNvbnRhaW5pbmcgaXRzIGF4aXMgb2YgcmFkaWFsIHN5bW1ldHJ5LiA8YnIvPjxici8+XG4gKiBUaGUgPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5Jz5mb2xsb3dpbmcgZXhhbXBsZTwvYT4gc2hvd3MgYSBnZW9tZXRyeSB3aGljaCBjYW4gYmUgZ2VuZXJhdGVkIHVzaW5nIGBMYXRoZWAgY2xhc3MuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0xhdGhlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExhdGgsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcG9pbnRzID0gW107XG4gKlxuICogZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gKiAgIHBvaW50cy5wdXNoKFxuICogICAgIG5ldyBUSFJFRS5WZWN0b3IyKFxuICogICAgICAgKE1hdGguc2luKGkgKiAwLjcpICogMTUgKyA1MCkgLyAxMCxcbiAqICAgICAgIChpIC0gNSkgKiAwLjJcbiAqICAgICApXG4gKiAgICk7XG4gKiB9XG4gKlxuICogY29uc3QgbGF0aGUgPSBuZXcgTGF0aGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBvaW50czogcG9pbnRzXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDUwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIExhdGhlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcG9pbnRzOiBbXVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwb2ludHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT57XG4gICAqICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgTGF0aGUuZGVmYXVsdHMsIExhdGhlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBMYXRoZUJ1ZmZlckdlb21ldHJ5IDogTGF0aGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucG9pbnRzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMYXRoZVxufTtcbiIsImltcG9ydCB7XG4gIExpbmUgYXMgTGluZU5hdGl2ZSxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEdlb21ldHJ5LFxuICBCdWZmZXJBdHRyaWJ1dGUsXG4gIExpbmVDdXJ2ZTMsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExpbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIExpbmUgY29tcG9uZW50IGlzIGdlbmVyYXRlZCBmcm9tIGEgY3VydmUvbGluZSBhbmQgYW1vdW50IG9mIHZlY3RvcnMgdGhhdCBzaG91bGQgYmUgdXNlZCAocG9pbnRzKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExpbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IExpbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGN1cnZlOiBuZXcgVEhSRUUuTGluZUN1cnZlMyhuZXcgVEhSRUUuVmVjdG9yMygxMCwgMTAsIDApLCBuZXcgVEhSRUUuVmVjdG9yMygxMCwgMzAsIDApKVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMaW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBjdXJ2ZTogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDEwLCAwLCAwKSksXG4gICAqICAgICBwb2ludHM6IDUwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGN1cnZlOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMTAsIDAsIDApKSxcbiAgICAgIHBvaW50czogNTBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBMaW5lLmRlZmF1bHRzLCBMaW5lLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTGluZU5hdGl2ZShnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IHBhcmFtcy5idWZmZXIgPyBuZXcgQnVmZmVyR2VvbWV0cnkoKSA6IG5ldyBHZW9tZXRyeSgpO1xuXG4gICAgaWYgKHBhcmFtcy5idWZmZXIpIHtcbiAgICAgIGNvbnN0IHBwID0gcGFyYW1zLmdlb21ldHJ5LmN1cnZlLmdldFBvaW50cyhwYXJhbXMuZ2VvbWV0cnkucG9pbnRzKTtcbiAgICAgIGNvbnN0IHZlcnRzID0gbmV3IEZsb2F0MzJBcnJheShwcC5sZW5ndGggKiAzKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHBwLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGkzID0gaSAqIDM7XG5cbiAgICAgICAgdmVydHNbaTNdID0gcHBbaV0ueDtcbiAgICAgICAgdmVydHNbaTMgKyAxXSA9IHBwW2ldLnk7XG4gICAgICAgIHZlcnRzW2kzICsgMl0gPSBwcFtpXS56O1xuICAgICAgfVxuXG4gICAgICBnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IEJ1ZmZlckF0dHJpYnV0ZSh2ZXJ0cywgMykpO1xuICAgIH0gZWxzZSBnZW9tZXRyeS52ZXJ0aWNlcyA9IHBhcmFtcy5nZW9tZXRyeS5jdXJ2ZS5nZXRQb2ludHMocGFyYW1zLmdlb21ldHJ5LnBvaW50cyk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGluZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEpTT05Mb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEltcG9ydGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbXBvcnRlciBpcyBhIGxvYWRlciBmb3IgbWVzaGVzIGFuZCBhbnkgb3RoZXIgZGF0YSB0byB5b3VyIHNjZW5lXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBJbXBvcnRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgSW1wb3J0ZXIoe1xuICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAqXG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWwpIHsgLy8gZGF0YSBmcm9tIGxvYWRlclxuICogICAgIHJldHVybiBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpOyAvLyBzaG91bGQgcmV0dXJuIHlvdXIgLm5hdGl2ZSAobWVzaCBpbiB0aGlzIGNhc2UpXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEltcG9ydGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIHVybDogJycsXG4gICAqICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuICAgKlxuICAgKiAgIG9uTG9hZCgpIHt9LFxuICAgKiAgIG9uUHJvZ3Jlc3MoKSB7fSxcbiAgICogICBvbkVycm9yKCkge30sXG4gICAqXG4gICAqICAgdGV4dHVyZVBhdGg6IG51bGwsXG4gICAqICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAqICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHVybDogJycsXG4gICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuXG4gICAgb25Mb2FkKCkge30sXG4gICAgb25Qcm9ncmVzcygpIHt9LFxuICAgIG9uRXJyb3IoKSB7fSxcblxuICAgIHRleHR1cmVQYXRoOiBudWxsLFxuICAgIHVzZUN1c3RvbU1hdGVyaWFsOiBmYWxzZSxcblxuICAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAgfVxuICB9O1xuXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnNcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZCBmaWx0ZXJcbiAgICogQGRlc2NyaXB0aW9uIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtUSFJFRS5NZXNofSBvYmplY3QgSW5zdGFuY2UgZm9yIGl0ZXJhdGluZyB0aHJvdWdoIGl0J3MgY2hpbGRyZW4uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlciBGdW5jdGlvbiB3aXRoIGNoaWxkIGFzIGFyZ3VtZW50LCBzaG91bGQgcmV0dXJuIGEgYm9vbGVhbiB3aGV0aGVyIGluY2x1ZGUgdGhlIGNoaWxkIG9yIG5vdC5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gb2JqZWN0IHdpdGggY2hpbGRyZW5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZW1vdmluZyB1bm5lY2Vzc2FyeSBsaWdodHMgZnJvbSBjaGlsZHJlbjwvY2FwdGlvbj5cbiAgICogbmV3IEljb3NhaGVkcm9uKHtcbiAgICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAgICpcbiAgICogICBwYXJzZShncm91cCkgeyAvLyBkYXRhIGZyb20gbG9hZGVyXG4gICAqICAgICByZXR1cm4gSW1wb3J0ZXIuZmlsdGVyKGdyb3VwLCBjaGlsZCA9PiAhY2hpbGQuaXNMaWdodCk7IC8vIHJlbW92ZSBsaWdodHNcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICAgKiB9KS5hZGRUbyhhcHApO1xuICAgKi9cbiAgc3RhdGljIGZpbHRlcihvYmplY3QsIGZpbHRlcikge1xuICAgIGNvbnN0IHByb2Nlc3NGaWx0ZXIgPSBvYmplY3QgPT4ge1xuICAgICAgb2JqZWN0LmNoaWxkcmVuLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2hpbGRyZW4pIHByb2Nlc3NGaWx0ZXIoZWwpO1xuICAgICAgICBpZiAoIWZpbHRlcihlbCkpIG9iamVjdC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9jZXNzRmlsdGVyKG9iamVjdCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSW1wb3J0ZXIuZGVmYXVsdHMsIEltcG9ydGVyLmluc3RydWN0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAocGFyYW1zLnRleHR1cmVQYXRoKSBwYXJhbXMubGFvZGVyLnNldFRleHR1cmVQYXRoKHBhcmFtcy50ZXh0dXJlUGF0aCk7XG5cbiAgICAgIHBhcmFtcy5sb2FkZXIubG9hZChwYXJhbXMudXJsLCAoLi4uZGF0YSkgPT4geyAvLyBnZW9tZXRyeSwgbWF0ZXJpYWxzXG4gICAgICAgIHBhcmFtcy5vbkxvYWQoLi4uZGF0YSk7XG5cbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogcGFyYW1zLnBhcnNlciguLi5kYXRhKX0pLm1lc2g7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5OiBnZW9tLCBtYXRlcmlhbDogbWF0fSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBvYmplY3QuZ2VvbWV0cnksXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy51c2VDdXN0b21NYXRlcmlhbCA/IHBhcmFtcy5tYXRlcmlhbCA6IG9iamVjdC5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob2JqZWN0Lmdlb21ldHJ5KSBvYmplY3QuZ2VvbWV0cnkgPSBnZW9tO1xuICAgICAgICBpZiAob2JqZWN0Lm1hdGVyaWFsKSBvYmplY3QubWF0ZXJpYWwgPSBtYXQ7XG5cbiAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgfSwgcGFyYW1zLm9uUHJvZ3Jlc3MsIHBhcmFtcy5vbkVycm9yKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLndhaXQocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJbXBvcnRlclxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIE9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgT2N0YWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBPY3RhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYW4gb2N0YWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCBlaWdodCBmYWNlcy5cbiAqIEEgcmVndWxhciBvY3RhaGVkcm9uIGlzIGEgUGxhdG9uaWMgc29saWQgY29tcG9zZWQgb2YgZWlnaHQgZXF1aWxhdGVyYWwgdHJpYW5nbGVzLCBmb3VyIG9mIHdoaWNoIG1lZXQgYXQgZWFjaCB2ZXJ0ZXguXG4gKiA8YnIvPjxici8+XG4gKiBgT2N0YWhlZHJvbmAgY3JlYXRlcyBhbiBPY3RhaGVkcm9uIG9iamVjdCBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNPY3RhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBPY3RhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBPY3RhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIE9jdGFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLk9jdGFoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT2N0YWhlZHJvbi5kZWZhdWx0cywgT2N0YWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuT2N0YWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBPY3RhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9jdGFoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnksXG4gIFBhcmFtZXRyaWNHZW9tZXRyeSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUGFyYW1ldHJpY1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gYFBhcmFtZXRyaWNgIGdlbmVyYXRlcyBhIGdlb21ldHJ5IHJlcHJlc2VudGluZyBhIDxhIGhyZWY9J2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhcmFtZXRyaWNfc3VyZmFjZSc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogPGJyLz48YnIvPlxuICogSXQgaXMgdXN1YWxseSB1c2VkIHRvIGRldmVsb3AgZGlmZmVyZW50IGtpbmRzIG9mIGhpZ2hmaWVsZHMgb3IgdmlzdWFsaXplIGEgPGEgaHJlZj0naHR0cHM6Ly9zdGVta29za2kuZ2l0aHViLmlvL1RocmVlLmpzL0dyYXBodWx1cy1GdW5jdGlvbi5odG1sJz5tYXRoIGZ1bmN0aW9uPC9hPi5cbiAqIDxici8+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly9tYXRoLmh3cy5lZHUvZ3JhcGhpY3Nib29rL3NvdXJjZS90aHJlZWpzL2N1cnZlcy1hbmQtc3VyZmFjZXMuaHRtbCc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogLSA8YSBocmVmPSdodHRwczovL3N0ZW1rb3NraS5naXRodWIuaW8vVGhyZWUuanMvR3JhcGh1bHVzLVN1cmZhY2UuaHRtbCc+XCJHcmFwaHVsdXNcIjwvYT5cbiAqIDxici8+PGJyLz5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUGFyYW1ldHJpY0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+RXhhbXBsZSBjcmVhdGluZyBhbiBoZWlnaHRmaWVsZC1saWtlIGdlb21ldHJ5LiBgdWAgYW5kIGB2YCBhcmUgbGlrZSBgeGAgYW5kIGB5YCBpbiBzaGFwZSwgYnV0IHRoZWlyIHZhbHVlcyBhcmUgYWx3YXlzIGZyb20gYDBgIHRvIGAxYC5cbiAqIFdlIHVzZSB0aGVtIGluIGBUSFJFRS5WZWN0b3IzYCBsaWtlIGB4YCBhbmQgYHpgIGFuZCBgTWF0aC5yYW5kb20oKSAqIDVgIGZvciBgeWAuPC9jYXB0aW9uPlxuICogY29uc3QgY3JlYXRlUGFyYW1ldHJpYyA9ICh1LCB2KSA9PiB7XG4gKiAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyh1ICogMzAsIE1hdGgucmFuZG9tKCkgKiA1LCB2ICogMzApO1xuICogfVxuICpcbiAqIG5ldyBQYXJhbWV0cmljKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBmdW5jOiBjcmVhdGVQYXJhbWV0cmljXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIC0xMDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQYXJhbWV0cmljIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QYXJhbWV0cmljI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBmdW5jOiAodSwgdikgPT4gbmV3IFZlY3RvcjModSwgdiwgMCksXG4gICAqICAgICBzbGljZXM6IDEwLFxuICAgKiAgICAgdGFja3M6IDEwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGZ1bmM6ICh1LCB2KSA9PiBuZXcgVmVjdG9yMyh1LCB2LCAwKSxcbiAgICAgIHNsaWNlczogMTAsXG4gICAgICBzdGFja3M6IDEwXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBhcmFtZXRyaWMuZGVmYXVsdHMsIFBhcmFtZXRyaWMuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGFyYW1ldHJpY1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkgOiBQYXJhbWV0cmljR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmZ1bmMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2xpY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnN0YWNrc1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGFyYW1ldHJpY1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBsYW5lQnVmZmVyR2VvbWV0cnksXG4gIFBsYW5lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBsYW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBgUGxhbmVgIGlzIHVzZWQgZm9yIGNyZWF0aW5nIHBsYW5lcyBnaXZlbiBzb21lIGB3aWR0aGAgYW5kIGBoZWlnaHRgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNQbGFuZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBQbGFuZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUGxhbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHdpZHRoOiAyMCxcbiAqICAgICBoZWlnaHQ6IDMwXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBsYW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEwLFxuICAgKiAgICAgaGVpZ2h0OiAxMCxcbiAgICogICAgIHdTZWdtZW50czogMSxcbiAgICogICAgIGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMTAsXG4gICAgICBoZWlnaHQ6IDEwLFxuICAgICAgd1NlZ21lbnRzOiAxLFxuICAgICAgaFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICd3U2VnbWVudHMnLCAnaFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3dTZWdtZW50cycsICdoU2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQbGFuZS5kZWZhdWx0cywgUGxhbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBQbGFuZUJ1ZmZlckdlb21ldHJ5IDogUGxhbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBsYW5lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBQb2x5aGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbmNvbnN0IFt2ZXJ0aWNlc09mQ3ViZSwgaW5kaWNlc09mRmFjZXNdID0gW1xuICBbXG4gICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxXG4gIF0sXG4gIFtcbiAgICAyLCAxLCAwLCAwLCAzLCAyLFxuICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAgMCwgMSwgNSwgNSwgNCwgMCxcbiAgICAxLCAyLCA2LCA2LCA1LCAxLFxuICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAgNCwgNSwgNiwgNiwgNywgNFxuICBdXG5dO1xuXG4vKipcbiAqIEBjbGFzcyBQb2x5aGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBlbGVtZW50YXJ5IGdlb21ldHJ5LCBhIHBvbHloZWRyb24gaXMgYSBzb2xpZCBpbiB0aHJlZSBkaW1lbnNpb25zIHdpdGggZmxhdCBwb2x5Z29uYWwgZmFjZXMsIHN0cmFpZ2h0IGVkZ2VzIGFuZCBzaGFycCBjb3JuZXJzIG9yIHZlcnRpY2VzLlxuICogPGJyLz48YnIvPlxuICogYFBvbHloZWRyb25gIGNyZWF0ZXMgYSBQb2x5aGVkcm9uIGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGAuXG4gKiA8YnIvPjxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gUG9seWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUG9seWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2x5aGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIHN0YXRpYyB2ZXJ0aWNlc09mQ3ViZSA9IHZlcnRpY2VzT2ZDdWJlO1xuICBzdGF0aWMgaW5kaWNlc09mRmFjZXMgPSBpbmRpY2VzT2ZGYWNlcztcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgdmVydGljZXNPZkN1YmU6IFtcbiAgICogICAgICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgKiAgICAgICAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAxLCAxLCAtMSwgMSwgMVxuICAgKiAgICAgXSxcbiAgICpcbiAgICogICAgIGluZGljZXNPZkZhY2VzOiBbXG4gICAqICAgICAgIDIsIDEsIDAsIDAsIDMsIDIsXG4gICAqICAgICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAqICAgICAgIDAsIDEsIDUsIDUsIDQsIDAsXG4gICAqICAgICAgIDEsIDIsIDYsIDYsIDUsIDEsXG4gICAqICAgICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAqICAgICAgIDQsIDUsIDYsIDYsIDcsIDRcbiAgICogICAgIF0sXG4gICAqXG4gICAqICAgICByYWRpdXM6IDYsXG4gICAqICAgICBkZXRhaWw6IDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdmVydGljZXNPZkN1YmUsXG4gICAgICBpbmRpY2VzT2ZGYWNlcyxcbiAgICAgIHJhZGl1czogNixcbiAgICAgIGRldGFpbDogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3ZlcnRpY2VzT2ZDdWJlJywgJ2luZGljZXNPZkZhY2VzJywgJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd2ZXJ0aWNlc09mQ3ViZScsICdpbmRpY2VzT2ZGYWNlcycsICdyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUG9seWhlZHJvbi5kZWZhdWx0cywgUG9seWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBQb2x5aGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnZlcnRpY2VzT2ZDdWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmluZGljZXNPZkZhY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBvbHloZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBSaW5nR2VvbWV0cnksXG4gIFJpbmdCdWZmZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUmluZ1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gUmluZyBjbGFzcyBjcmVhdGVzIGEgY2lyY2xlIG9yIGp1c3QgMkQgVG9ydXMuIERvZXMgbm90IHN1cHBvcnQgcGh5c2ljcy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUmluZ0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBSaW5nLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBSaW5nKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBpbm5lclJhZGl1czogNSxcbiAqICAgICBvdXRlclJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICAgc2lkZSBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA4LCAwXSxcbiAqXG4gKiAgIHJvdGF0aW9uOiB7XG4gKiAgICAgeDogTWF0aC5QSS80XG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFJpbmcgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmcjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGlubmVyUmFkaXVzOiAwLFxuICAgKiAgICAgb3V0ZXJSYWRpdXM6IDUwLFxuICAgKiAgICAgdGhldGFTZWdtZW50czogOCxcbiAgICogICAgIHBoaVNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBpbm5lclJhZGl1czogMCxcbiAgICAgIG91dGVyUmFkaXVzOiA1MCxcbiAgICAgIHRoZXRhU2VnbWVudHM6IDgsXG4gICAgICBwaGlTZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICogICAgICdvdXRlclJhZGl1cycsXG4gICAqICAgICAndGhldGFTZWdtZW50cycsXG4gICAqICAgICAncGhpU2VnbWVudHMnLFxuICAgKiAgICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICAgICdvdXRlclJhZGl1cycsXG4gICAgICAndGhldGFTZWdtZW50cycsXG4gICAgICAncGhpU2VnbWVudHMnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUmluZy5kZWZhdWx0cywgUmluZy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZ1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBSaW5nQnVmZmVyR2VvbWV0cnkgOiBSaW5nR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmlubmVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm91dGVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucGhpU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUmluZ1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNoYXBlQnVmZmVyR2VvbWV0cnksXG4gIFNoYXBlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNoYXBlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTaGFwZSBpcyBhIHVuaXZlcnNhbCBjbGFzcy4gSXQgYWxsb3dzIHlvdSB0byBjcmVhdGUgZGlmZmVyZW50IDJEIHNoYXBlcyBpbiAzRCBzY2VuZS48YnIvPlxuICogVW5mb3J0dW5hdGVseSwgbm90IGFsbCBvZiB0aGVtIHN1cHBvcnQgcGh5c2ljcywgYW4gYWx0ZXJuYXRpdmUgaXMgdG8gbWFrZSBhIHNpbWlsYXIgM0Qgb2JqZWN0IGFuZCBzY2FsZSBpdHMgd2lkdGggZG93biB0byBuZWFyIHplcm8uXG4gKiA8YnIvPjxici8+XG4gKiBgU2hhcGVgIGNvbnNpc3RzIG9mIHNoYXBlcyB0aGF0IGFyZSBpbiBpdHMgc2hhcGVzIHBhcmFtZXRlci5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU2hhcGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgcGxhbmUgbG9va2luZyBTaGFwZSBmcm9tIGEgVEhSRUUuU2hhcGUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcmVjdFdpZHRoID0gMTAsXG4gKiByZWN0TGVuZ3RoID0gNTtcbiAqXG4gKiBjb25zdCByZWN0U2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAqIHJlY3RTaGFwZS5tb3ZlVG8oMCwwKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8oMCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgMCk7XG4gKiByZWN0U2hhcGUubGluZVRvKDAsIDApO1xuICpcbiAqIGNvbnN0IHBsYW5lID0gbmV3IFNoYXBlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZTogcmVjdFNoYXBlXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNoYXBlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW11cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU2hhcGUuZGVmYXVsdHMsIFNoYXBlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBTaGFwZUJ1ZmZlckdlb21ldHJ5IDogU2hhcGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2hhcGVzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTaGFwZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNwaGVyZUJ1ZmZlckdlb21ldHJ5LFxuICBTcGhlcmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BoZXJlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTcGhlcmUgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgc3BoZXJlIG9iamVjdHMgYnkgaXRzIHJhZGl1cyBwcm9wZXJ0eSBhbmQgb3RoZXIgdmFsdWVzIHRoYXQgZGV0ZXJtaW5lcyBpdHMgZGV0YWxpdHkuXG4gKiA8YnIvPjxici8+XG4gKiBJdCBpcyBzaW1pbGFyIHRvIFRIUkVFLlNwaGVyZUdlb21ldHJ5LCBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgYFNoYXBlYCBwcm9wZXJ0aWVzLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogPGJyLz48YnIvPlxuICogVGhlbiBpdCBjcmVhdGVzIGFuIGBUaHJlZS5qcyBtZXNoYCBvciBhIGBQaHlzaWpzIG1lc2hgLCB0aGF0IGlzIHNpbWlsYXIgdG8gYFRocmVlLmpzIG1lc2hgLCBidXQgaXQgYWxzbyB0YWtlIGludG8gY29uc2lkZXJhdGlvbiBjb2xsaXNpb24gY2FsY3VsYXRpb25zLlxuICogVGhpcyBtZXNoIGlzIGEgY29tYmluYXRpb24gb2YgYFRocmVlLmpzIGdlb21ldHJ5YCBhbmQgYFBoeXNpanMgbWF0ZXJpYWxgIChUaGUgc2FtZSBhcyBpbiB0aHJlZS5qcywgYnV0IHdpdGggZnJpY3Rpb24gYW5kIHJlc3RpdHV0aW9uKS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU3BoZXJlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwaGVyZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgU3BoZXJlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNwaGVyZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTcGhlcmUuZGVmYXVsdHMsIFNwaGVyZS5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFNwaGVyZUJ1ZmZlckdlb21ldHJ5IDogU3BoZXJlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcGhlcmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBUZXRyYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUZXRyYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgdGV0cmFoZWRyb24gaXMgYSBwb2x5aGVkcm9uIGNvbXBvc2VkIG9mIGZvdXIgdHJpYW5ndWxhciBmYWNlcywgc2l4IHN0cmFpZ2h0IGVkZ2VzLCBhbmQgZm91ciB2ZXJ0ZXggY29ybmVycy5cbiAqIFRoZSB0ZXRyYWhlZHJvbiBpcyB0aGUgc2ltcGxlc3Qgb2YgYWxsIHRoZSBvcmRpbmFyeSBjb252ZXggcG9seWhlZHJhIGFuZCB0aGUgb25seSBvbmUgdGhhdCBoYXMgZmV3ZXIgdGhhbiA1IGZhY2VzLlxuICogPGJyLz48YnIvPlxuICogYFRldHJhaGVkcm9uYCBjcmVhdGVzIGEgVGV0cmFoZWRyb24gb2JqZWN0IGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGBcbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVGV0cmFoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVGV0cmFoZWRyb24sIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRldHJhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVGV0cmFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXRyYWhlZHJvbi5kZWZhdWx0cywgVGV0cmFoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBUZXRyYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUZXRyYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIEZvbnQsXG4gIE1lc2gsXG4gIFRleHRHZW9tZXRyeSxcbiAgRm9udExvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVGV4dFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVGV4dCBjbGFzcyBpcyBtYWRlIGZvciBjcmVhdGluZyAzRCB0ZXh0IG9iamVjdHMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RleHRHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogPGJyLz48YnIvPlxuICogUGh5c2ljcyB0ZXh0IG9iamVjdCBjYW4gYmUgY29udmV4IG9yIGNvbmNhdmUuIEJ5IGRlZmF1bHQgaXQncyBjb252ZXggYnV0IHlvdSBjYW4gYWxzbyBzd2l0Y2ggdG8gY29uY2F2ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRleHQsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRleHQoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHRleHQ6ICdoZWxsbyB3b3JsZCcsXG4gKiAgICAgcGFyYW1ldGVyczoge1xuICogICAgICAgZm9udDogJ3BhdGgvdG8vZm9udC50eXBlZmFjZS5qcycsXG4gKiAgICAgICBzaXplOiAyMCxcbiAqICAgICAgIGhlaWdodDogNSxcbiAqICAgICAgIGN1cnZlU2VnbWVudHM6IDZcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IC00MCxcbiAqICAgICB5OiAyMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRleHQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHRleHQ6ICdIZWxsbyBXb3JsZCEnLFxuICAgKiAgICAgbG9hZGVyOiBuZXcgRm9udExvYWRlcigpLFxuICAgKlxuICAgKiAgICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgICBzaXplOiAxMixcbiAgICogICAgICAgaGVpZ2h0OiA1MCxcbiAgICogICAgICAgY3VydmVTZWdtZW50czogMTIsXG4gICAqICAgICAgIGZvbnQ6IG5ldyBGb250KCksXG4gICAqICAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gICAqICAgICAgIGJldmVsVGhpY2tuZXNzOiAxMCxcbiAgICogICAgICAgYmV2ZWxTaXplOiA4XG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHRleHQ6ICdIZWxsbyBXb3JsZCEnLFxuICAgICAgbG9hZGVyOiBuZXcgRm9udExvYWRlcigpLFxuXG4gICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgIHNpemU6IDEyLFxuICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICBjdXJ2ZVNlZ21lbnRzOiAxMixcbiAgICAgICAgZm9udDogbmV3IEZvbnQoKSxcbiAgICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgYmV2ZWxUaGlja25lc3M6IDEwLFxuICAgICAgICBiZXZlbFNpemU6IDhcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXh0I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWyd0ZXh0JywgJ2xvYWRlcicsICdwYXJhbWV0ZXJzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsndGV4dCcsICdsb2FkZXInLCAncGFyYW1ldGVycyddXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVGV4dC5kZWZhdWx0cywgVGV4dC5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV4dFxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBGb250TG9hZGVyLmxvYWQocGFyYW1zLmdlb21ldHJ5LnBhcmFtZXRlcnMuZm9udCwgZm9udCA9PiB7XG4gICAgICAgIHBhcmFtcy5nZW9tZXRyeS5wYXJhbWV0ZXJzLmZvbnQgPSBmb250O1xuXG4gICAgICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG5ldyBUZXh0R2VvbWV0cnkoXG4gICAgICAgICAgICBwYXJhbXMuZ2VvbWV0cnkudGV4dCxcbiAgICAgICAgICAgIHBhcmFtcy5nZW9tZXRyeS5wYXJhbWV0ZXJzXG4gICAgICAgICAgKSxcblxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICAgIG1lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICAgICAgICB9KS5tZXNoXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHN1cGVyLndhaXQocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUZXh0XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVG9ydXNHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVG9ydXNcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRvcnVzIGNsYXNzIG1ha2VzIGEgdG9ydXMgZmlndXJlLiBBIGRvbnV0IGlzIGEgdG9ydXMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9pbmRleC5odG1sI2FwaS9nZW9tZXRyaWVzL1RvcnVzR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRvcnVzLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUb3J1cyh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiA1LFxuICogICAgIHR1YmU6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMzVcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVG9ydXMgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEwMCxcbiAgICogICAgIHR1YmU6IDQwLFxuICAgKiAgICAgcmFkaWFsU2VnbWVudHM6IDgsXG4gICAqICAgICB0dWJ1bGFyU2VnbWVudHM6IDYsXG4gICAqICAgICBhcmM6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMTAwLFxuICAgICAgdHViZTogNDAsXG4gICAgICByYWRpYWxTZWdtZW50czogOCxcbiAgICAgIHR1YnVsYXJTZWdtZW50czogNixcbiAgICAgIGFyYzogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1cyNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3R1YmUnLFxuICAgKiAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICogICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgKiAgICAgJ2FyYydcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICd0dWJlJyxcbiAgICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICAgICdhcmMnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUb3J1cy5kZWZhdWx0cywgVG9ydXMuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBUb3J1c0dlb21ldHJ5KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGlhbFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YnVsYXJTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5hcmNcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRvcnVzXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVG9ydXNLbm90QnVmZmVyR2VvbWV0cnksXG4gIFRvcnVzS25vdEdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUb3J1c2tub3RcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRvcnVza25vdCBjbGFzcyBtYWtlcyBhIHRvcnVza25vdCBmaWd1cmUuIEl0J3MgbGlrZSBhIGNyb29rZWQgZG9udXQsIHZlcnkgY3Jvb2tlZC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVG9ydXNLbm90R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRvcnVza25vdCwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVG9ydXNrbm90KHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6NSxcbiAqICAgICB0dWJlOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IHtcbiAqICAgICB5OiAxMDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVG9ydXNrbm90IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3QjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMTAwLFxuICAgKiAgICAgdHViZTogNDAsXG4gICAqICAgICByYWRpYWxTZWdtZW50czogNjQsXG4gICAqICAgICB0dWJ1bGFyU2VnbWVudHM6IDgsXG4gICAqICAgICBwOiAyLFxuICAgKiAgICAgcTogM1xuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEwMCxcbiAgICAgIHR1YmU6IDQwLFxuICAgICAgcmFkaWFsU2VnbWVudHM6IDY0LFxuICAgICAgdHVidWxhclNlZ21lbnRzOiA4LFxuICAgICAgcDogMixcbiAgICAgIHE6IDNcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3QjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICd0dWJlJyxcbiAgICogICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAqICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICogICAgICdwJyxcbiAgICogICAgICdxJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3R1YmUnLFxuICAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgICAgJ3AnLFxuICAgICAgJ3EnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUb3J1c2tub3QuZGVmYXVsdHMsIFRvcnVza25vdC5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNrbm90XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgR0NvbnN0cnVjdCA9IHBhcmFtcy5idWZmZXIgPyBUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSA6IFRvcnVzS25vdEdlb21ldHJ5O1xuXG4gICAgcmV0dXJuIG5ldyBHQ29uc3RydWN0KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGlhbFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YnVsYXJTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnFcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRvcnVza25vdFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIExpbmVDdXJ2ZTMsXG4gIFZlY3RvcjMsXG4gIFR1YmVCdWZmZXJHZW9tZXRyeSxcbiAgVHViZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUdWJlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUdWJlIGNsYXNzIG1ha2VzIGEgdHViZSB0aGF0IGV4dHJ1ZGVzIGFsb25nIGEgM2QgY3VydmUuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9pbmRleC5odG1sI2FwaS9nZW9tZXRyaWVzL1R1YmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVHViZSBmcm9tIGEgdGhyZWUuanMgQ3VydmUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgQ3VzdG9tU2luQ3VydmUgPSBUSFJFRS5DdXJ2ZS5jcmVhdGUoXG4gKiAgIGZ1bmN0aW9uIChzY2FsZSkgeyAvLyBjdXN0b20gY3VydmUgY29uc3RydWN0b3JcbiAqICAgICB0aGlzLnNjYWxlID0gKHNjYWxlID09PSB1bmRlZmluZWQpID8gMSA6IHNjYWxlO1xuICogICB9LFxuICpcbiAqICAgZnVuY3Rpb24gKHQpIHsgLy8gZ2V0UG9pbnQ6IHQgaXMgYmV0d2VlbiAwLTFcbiAqICAgICBjb25zdCB0eCA9IHQgKiAzIC0gMS41LFxuICogICAgIHR5ID0gTWF0aC5zaW4oIDIgKiBNYXRoLlBJICogdCApLFxuICogICAgIHR6ID0gMDtcbiAqXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHR4LCB0eSwgdHopLm11bHRpcGx5U2NhbGFyKHRoaXMuc2NhbGUpO1xuICogICB9XG4gKiApO1xuICpcbiAqIGNvbnN0IHBhdGggPSBuZXcgQ3VzdG9tU2luQ3VydmUoMTApO1xuICpcbiAqIG5ldyBUdWJlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBwYXRoOiBwYXRoXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFR1YmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHBhdGg6IG5ldyBUSFJFRS5MaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAxKSksXG4gICAqICAgICBzZWdtZW50czogMjAsXG4gICAqICAgICByYWRpdXM6IDIsXG4gICAqICAgICByYWRpdXNTZWdtZW50czogOCxcbiAgICogICAgIGNsb3NlZDogZmFsc2VcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcGF0aDogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSxcbiAgICAgIHNlZ21lbnRzOiAyMCxcbiAgICAgIHJhZGl1czogMixcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiA4LFxuICAgICAgY2xvc2VkOiBmYWxzZVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncGF0aCcsXG4gICAqICAgICAnc2VnbWVudHMnLFxuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICAgJ2Nsb3NlZCdcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncGF0aCcsXG4gICAgICAnc2VnbWVudHMnLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2Nsb3NlZCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFR1YmUuZGVmYXVsdHMsIFR1YmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFR1YmVCdWZmZXJHZW9tZXRyeSA6IFR1YmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucGF0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuY2xvc2VkXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUdWJlXG59O1xuIiwiaW1wb3J0IHtPYmplY3QzRH0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgR3JvdXBcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNvbWV0aW1lcyB5b3UgbmVlZCB0byBtYWtlIGdyb3VwcyBvZiBvYmplY3RzIChpdCdzIG5vdCBjb252ZW5pZW50bHkgdG8gYXBwbHkgdHJhbnNmb3JtcyB0byBlYWNoIG9iamVjdCB3aGVuIGNhbiBtYWtlIGp1c3Qgb25lIHRvIGEgZ3JvdXApLjxici8+XG4gKiBJbiBUaHJlZS5qcyB5b3UgbWFrZSBpdCB1c2luZyBgVEhSRUUuT2JqZWN0M0RgIGFuZCBpdCdzIGNoaWxkcmVuLiA8YnIvPjxici8+XG4gKiBJbiB3aHMuanMgd2UgaGF2ZSBgR3JvdXBgXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BcHByb2FjaCAyIC0gQWRkaW5nIG9iamVjdHMgdG8gYW4gZW1wdHkgZ3JvdXA8L2NhcHRpb24+XG4gKiBjb25zdCBzcGhlcmUgPSBuZXcgU3BoZXJlKCk7XG4gKiBjb25zdCBib3ggPSBuZXcgQm94KCk7XG4gKiBjb25zdCBncm91cCA9IG5ldyBHcm91cCgpO1xuICpcbiAqIHNwaGVyZS5hZGRUbyhncm91cCk7XG4gKiBib3guYWRkVG8oZ3JvdXApO1xuKiBAZXhhbXBsZSA8Y2FwdGlvbj5BcHByb2FjaCAyIC0gTWFraW5nIGEgZ3JvdXAgZnJvbSBvYmplY3RzPC9jYXB0aW9uPlxuICogY29uc3Qgc3BoZXJlID0gbmV3IFNwaGVyZSgpO1xuICogY29uc3QgYm94ID0gbmV3IEJveCgpO1xuICogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoYm94LCBzcGhlcmUpO1xuICogLy8gT1I6IGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKFtib3gsIHNwaGVyZV0pO1xuICovXG5jbGFzcyBHcm91cCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciguLi5vYmplY3RzKSB7XG4gICAgc3VwZXIoe30pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvYmogPSBvYmplY3RzW2ldO1xuXG4gICAgICBpZiAob2JqIGluc3RhbmNlb2YgQ29tcG9uZW50KSBvYmouYWRkVG8odGhpcyk7XG4gICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QzRCkgdGhpcy5uYXRpdmUuYWRkKG9iaik7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3QzRCgpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEdyb3VwXG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9tZXNoZXMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQm94JztcbmV4cG9ydCAqIGZyb20gJy4vQ2lyY2xlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29uZSc7XG5leHBvcnQgKiBmcm9tICcuL0N5bGluZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vRG9kZWNhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0cnVkZSc7XG5leHBvcnQgKiBmcm9tICcuL0ljb3NhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vTGF0aGUnO1xuZXhwb3J0ICogZnJvbSAnLi9MaW5lJztcbmV4cG9ydCAqIGZyb20gJy4vSW1wb3J0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9PY3RhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vUGFyYW1ldHJpYyc7XG5leHBvcnQgKiBmcm9tICcuL1BsYW5lJztcbmV4cG9ydCAqIGZyb20gJy4vUG9seWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL1JpbmcnO1xuZXhwb3J0ICogZnJvbSAnLi9TaGFwZSc7XG5leHBvcnQgKiBmcm9tICcuL1NwaGVyZSc7XG5leHBvcnQgKiBmcm9tICcuL1RldHJhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vVGV4dCc7XG5leHBvcnQgKiBmcm9tICcuL1RvcnVzJztcbmV4cG9ydCAqIGZyb20gJy4vVG9ydXNrbm90JztcbmV4cG9ydCAqIGZyb20gJy4vVHViZSc7XG5leHBvcnQgKiBmcm9tICcuL0dyb3VwJztcbiIsIi8qKlxuICogQGNsYXNzIEVsZW1lbnRNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtjb250YWluZXI9ZG9jdW1lbnQuYm9keV0gY29udGFpbmVyIGlzIHRoZSBET00gb2JqZWN0IHRvIHdoaWNoIGFwcGxpY2F0aW9uJ3MgY2FudmFzIHdpbGwgYmUgYWRkZWQgdG8uXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBlbGVtZW50IG1vZHVsZSwgcGFzc2luZyBpdCB0byB0aGUgQXBwPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIG5ldyBFbGVtZW50TW9kdWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRWxlbWVudE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5lcikge1xuICAgICAgY29uc29sZS53YXJuKCdFbGVtZW50TW9kdWxlIG5vdyBhY2NlcHRzIG9ubHkgYXJndW1lbnQgd2hpY2ggaXMgYSBET00gb2JqZWN0LCBub3QgYSBwYXJhbXMgb2JqZWN0LicpO1xuICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXIuY29udGFpbmVyO1xuICAgIH0gZWxzZSB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgIHRoaXMuY3JlYXRlRWxlbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY3JlYXRlRWxlbWVudFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYSBjYW52YXMgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd3aHMtYXBwJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAnaW5oZXJpdCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICdpbmhlcml0JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2VsZW1lbnQnLCB0aGlzLmVsZW1lbnQpO1xuICAgIG1hbmFnZXIuc2V0KCdjb250YWluZXInLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWxlbWVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFdlYkdMUmVuZGVyZXIsXG4gIFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbi8qKlxuICogQGNsYXNzIFJlbmRlcmluZ01vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIHJlbmRlcmluZyBtb2R1bGUgYW5kIHBhc3NpbmcgaXQgdG8gQXBwJ3MgbW9kdWxlczwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICBuZXcgRWxlbWVudE1vZHVsZSgpLFxuICogICBuZXcgU2NlbmVNb2R1bGUoKSxcbiAqICAgbmV3IENhbWVyYU1vZHVsZSh7XG4gKiAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDYsIDE4KSxcbiAqICAgICBmYXI6IDEwMDAwXG4gKiAgIH0pLFxuICogICBuZXcgUmVuZGVyaW5nTW9kdWxlKHtcbiAqICAgICBiZ0NvbG9yOiAweDE2MjEyOSxcbiAqXG4gKiAgICAgcmVuZGVyZXI6IHtcbiAqICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAqICAgICAgIHNoYWRvd21hcDoge1xuICogICAgICAgICB0eXBlOiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gKiAgICAgICB9XG4gKiAgICAgfVxuICogICB9LCB7c2hhZG93OiB0cnVlfSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTW9kdWxlIHtcbiAgc3RhdGljIGFkZGl0aW9uYWwgPSB7XG4gICAgc2hhZG93KHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlZCA9IHRydWU7XG5cbiAgZGVmZXIgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwge3NoYWRvdzogaXNTaGFkb3d9ID0ge3NoYWRvdzogZmFsc2V9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXG4gICAgICByZXNvbHV0aW9uOiBuZXcgVmVjdG9yMigxLCAxKSxcbiAgICAgIHBpeGVsUmF0aW86IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxuXG4gICAgICBiZ0NvbG9yOiAweDAwMDAwMCxcbiAgICAgIGJnT3BhY2l0eTogMSxcblxuICAgICAgcmVuZGVyZXI6IHt9XG4gICAgfSwgcGFyYW1zKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGJnQ29sb3IsXG4gICAgICBiZ09wYWNpdHksXG4gICAgICByZW5kZXJlcixcbiAgICAgIHBpeGVsUmF0aW8sXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHJlc29sdXRpb25cbiAgICB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIocmVuZGVyZXIpO1xuICAgIHRoaXMuZWZmZWN0cyA9IFtdO1xuICAgIHRoaXMuYXBwbHlBZGRpdGlvbmFsKCdzaGFkb3cnLCBpc1NoYWRvdyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoXG4gICAgICBiZ0NvbG9yLFxuICAgICAgYmdPcGFjaXR5XG4gICAgKTtcblxuICAgIGlmIChwaXhlbFJhdGlvKSB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8ocGl4ZWxSYXRpbyk7XG5cbiAgICB0aGlzLnNldFNpemUoXG4gICAgICBOdW1iZXIod2lkdGggKiByZXNvbHV0aW9uLngpLnRvRml4ZWQoKSxcbiAgICAgIE51bWJlcihoZWlnaHQgKiByZXNvbHV0aW9uLnkpLnRvRml4ZWQoKVxuICAgICk7XG4gIH1cblxuICBhcHBseUFkZGl0aW9uYWwobmFtZSwgaXNBcHBsaWVkID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzQXBwbGllZCkgcmV0dXJuO1xuICAgIFJlbmRlcmluZ01vZHVsZS5hZGRpdGlvbmFsW25hbWVdLmFwcGx5KHRoaXMsIFt0aGlzLnJlbmRlcmVyXSk7XG4gIH1cblxuICBpbnRlZ3JhdGVSZW5kZXJlcihlbGVtZW50LCBzY2VuZSwgY2FtZXJhKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMucmVuZGVyTG9vcCA9IG5ldyBMb29wKCgpID0+IHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKSk7XG4gICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50KTtcblxuICAgIHJldHVybiB0aGlzLnJlbmRlckxvb3A7XG4gIH1cblxuICBlZmZlY3QoZWZmZWN0LCBjYikge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlckxvb3Auc3RvcCgpO1xuXG4gICAgICBjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XG4gICAgICBlZmZlY3Quc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChjYiA/IGNiIDogKCkgPT4ge1xuICAgICAgICBlZmZlY3QucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmVmZmVjdHMucHVzaChsb29wKTtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIGxvb3Auc3RhcnQodGhpcy5hcHApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0U2l6ZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIHJlbmRlciB0YXJnZXQgd2lkdGggYW5kIGhlaWdodC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZW5kZXJpbmdNb2R1bGVcbiAgICovXG4gIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGlmICh0aGlzLnJlbmRlcmVyKSB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBhdHRhY2hUb0NhbnZhcyhlbGVtZW50KSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuXG4gICAgLy8gYXR0YWNoIHRvIG5ldyBwYXJlbnQgd29ybGQgZG9tXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlbmRlckxvb3Auc3RvcCgpO1xuICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdG9wKCkpO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnJlbmRlckxvb3Auc3RhcnQoKTtcbiAgICB0aGlzLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RhcnQoKSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncmVuZGVyaW5nJyk7XG4gICAgbWFuYWdlci5zZXQoJ3JlbmRlcmVyJywgdGhpcy5yZW5kZXJlcik7XG5cbiAgICB0aGlzLmFwcCA9IG1hbmFnZXIuaGFuZGxlcjtcblxuICAgIHRoaXMucmVuZGVyTG9vcCA9IHRoaXMuaW50ZWdyYXRlUmVuZGVyZXIoXG4gICAgICBtYW5hZ2VyLmdldCgnZWxlbWVudCcpLFxuICAgICAgbWFuYWdlci5nZXQoJ3NjZW5lJyksXG4gICAgICBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlXG4gICAgKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQgPT4ge1xuICAgICAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpO1xuICAgICAgfSxcbiAgICAgIHNjZW5lOiBzY2VuZSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICAgIH0sXG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhLm5hdGl2ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVzb2x2ZSgpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLnJlbmRlckxvb3Auc3RhcnQodGhpcyk7XG4gICAgc2VsZi5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0YXJ0KHRoaXMpKTtcbiAgfVxuXG4gIGRpc3Bvc2Uoc2VsZikge1xuICAgIHNlbGYucmVuZGVyTG9vcC5zdG9wKHRoaXMpO1xuICAgIHNlbGYuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdG9wKHRoaXMpKTtcbiAgICBzZWxmLnJlbmRlcmVyLmZvcmNlQ29udGV4dExvc3MoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgU2NlbmVcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBTY2VuZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3aWxsU2NlbmVCZVJlcGxhY2VkPWZhbHNlXSB3aWxsU2NlbmVCZVJlcGxhY2VkIHNob3VsZCBiZSB0cnVlIG9ubHkgaWYgeW91IGFyZSBnb2luZyB0byBvdmVyd3JpdGUgc2NlbmUgZGVwZW5kZW5jeSBldmVuIHdpdGhvdXQgdGhlIHVzZSBvZiBkZWZhdWx0IG9uZS5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqL1xuZXhwb3J0IGNsYXNzIFNjZW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3Iod2lsbFNjZW5lQmVSZXBsYWNlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5zY2VuZSA9IHdpbGxTY2VuZUJlUmVwbGFjZWQgPyBudWxsIDogbmV3IFNjZW5lKCk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnc2NlbmUnLCB0aGlzLnNjZW5lKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuXG4gICAgdGhpcy5hZGQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBvYmplY3QucGFyZW50ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgb2JqZWN0LmRlZmVyKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB7bmF0aXZlfSA9IG9iamVjdDtcbiAgICAgICAgICBpZiAoIW5hdGl2ZSkgcmVqZWN0KCk7XG5cbiAgICAgICAgICBjb25zdCBhZGRQcm9taXNlID0gdGhpcy5hcHBseUJyaWRnZSh7b25BZGQ6IG9iamVjdH0pLm9uQWRkO1xuXG4gICAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLnNjZW5lLmFkZChuYXRpdmUpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGFkZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgYWRkUHJvbWlzZS50aGVuKHJlc29sdmVyKTtcbiAgICAgICAgICBlbHNlIHJlc29sdmVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgb2JqZWN0LnBhcmVudCA9IG51bGw7XG4gICAgICBzZWxmLnNjZW5lLnJlbW92ZShvYmplY3QubmF0aXZlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRTY2VuZSA9IGZ1bmN0aW9uIChzY2VuZSkge1xuICAgICAgc2VsZi5zY2VuZSA9IHNjZW5lO1xuICAgICAgdGhpcy5tYW5hZ2VyLnNldCgnc2NlbmUnLCBzY2VuZSk7XG4gICAgfTtcbiAgfVxufVxuIiwiLy8gaW1wb3J0IHthZGRSZXNpemVMaXN0ZW5lcn0gZnJvbSAnZGV0ZWN0LWVsZW1lbnQtcmVzaXplJztcblxuLyoqXG4gKiBAY2xhc3MgUmVzaXplTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXthdXRvOiB0cnVlfV0gLSBJZiBhdXRvIGlzIHNldCB0byB0cnVlIC0gcmVzaXplIHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gY29udGFpbmVyIHJlc2l6ZXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc2l6ZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGF1dG86IHRydWVcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbdGhpcy5zZXRTaXplLmJpbmQodGhpcyldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiBzZXRTaXplXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwcm92aWRlZCB3aWR0aCAmIGhlaWdodCB0byB0aGUgcmVuZGVyZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gW3dpZHRoPTFdIC0gVGhlIHByb21pc2UgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gYSBxdWV1ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHQ9MV0gLSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIHNldFNpemUod2lkdGggPSAxLCBoZWlnaHQgPSAxKSB7XG4gICAgdGhpcy5jYW1lcmEubmF0aXZlLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgIHRoaXMuY2FtZXJhLm5hdGl2ZS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHRoaXMucmVuZGVyaW5nLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB0cmlnZ2VyXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVHJpZ2dlcnMgcmVzaXplIHdoZW4gY2FsbGVkLiB3aWR0aCAmIGhlaWdodCBhcmUgZGV0ZXJtaW5lZCBhdXRvbWF0aWNhbGx5XG4gICAqIFRoaXMgaW52b2tlcyBlYWNoIGNhbGxiYWNrcyB3aXRoIHRoZSBuZXcgd2lkdGggYW5kIGhlaWdodCBhcyBwYXJhbXNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIHRyaWdnZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgIG9mZnNldFdpZHRoLFxuICAgICAgICBvZmZzZXRIZWlnaHRcbiAgICAgIH0sXG4gICAgICByZXNvbHV0aW9uXG4gICAgfSA9IHRoaXM7XG5cbiAgICBjb25zdCB3aWR0aCA9IE51bWJlcihvZmZzZXRXaWR0aCAqIHJlc29sdXRpb24ueCkudG9GaXhlZCgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcihvZmZzZXRIZWlnaHQgKiByZXNvbHV0aW9uLnkpLnRvRml4ZWQoKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzLmZvckVhY2goY2IgPT4ge1xuICAgICAgY2Iod2lkdGgsIGhlaWdodCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRBdXRvcmVzaXplXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyBtb2R1bGUgdG8gYXV0b3Jlc2l6ZSwgdGhpcyBhZGRzIGFuIGV2ZW50IGxpc3RlbmUgb24gd2luZG93IHJlc2l6ZSB0byB0cmlnZ2VyIHRoZSByZXNpemVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGFkZEF1dG9yZXNpemUoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbnRhaW5lcigpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRoaXMuZ2V0UmVzb2x1dGlvbigpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmF1dG8pIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnRyaWdnZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRDYWxsYmFja1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBjYWxsIGJhY2sgZnVuY3Rpb24gdG8gdGhlIGV4aXN0aW5nIGNhbGxiYWNrcyBsaXN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFkZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgYWRkQ2FsbGJhY2soZnVuYykge1xuICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goZnVuYyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncmVzaXplJyk7XG5cbiAgICB0aGlzLnJlbmRlcmluZyA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgdGhpcy5nZXRSZXNvbHV0aW9uID0gKCkgPT4gbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLnBhcmFtcy5yZXNvbHV0aW9uO1xuICAgIHRoaXMuZ2V0Q29udGFpbmVyID0gKCkgPT4gbWFuYWdlci5nZXQoJ2NvbnRhaW5lcicpO1xuXG4gICAgdGhpcy5hZGRBdXRvcmVzaXplKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjA7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjE7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjI7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjM7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdC8vIFNhbXBsZSB0b3AgbGVmdCB0ZXhlbC5cXHJcXG5cXHR2ZWM0IHN1bSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2MCk7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIHRvcCByaWdodCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYxKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgYm90dG9tIHJpZ2h0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjIpO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSBib3R0b20gbGVmdCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYzKTtcXHJcXG5cXHJcXG5cXHQvLyBDb21wdXRlIHRoZSBhdmVyYWdlLlxcclxcblxcdGdsX0ZyYWdDb2xvciA9IHN1bSAqIDAuMjU7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInVuaWZvcm0gdmVjMiB0ZXhlbFNpemU7XFxyXFxudW5pZm9ybSB2ZWMyIGhhbGZUZXhlbFNpemU7XFxyXFxudW5pZm9ybSBmbG9hdCBrZXJuZWw7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjA7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjE7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjI7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjM7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzIgZFV2ID0gKHRleGVsU2l6ZSAqIHZlYzIoa2VybmVsKSkgKyBoYWxmVGV4ZWxTaXplO1xcclxcblxcclxcblxcdHZVdjAgPSB2ZWMyKHV2LnggLSBkVXYueCwgdXYueSArIGRVdi55KTtcXHJcXG5cXHR2VXYxID0gdmVjMih1di54ICsgZFV2LngsIHV2LnkgKyBkVXYueSk7XFxyXFxuXFx0dlV2MiA9IHZlYzIodXYueCArIGRVdi54LCB1di55IC0gZFV2LnkpO1xcclxcblxcdHZVdjMgPSB2ZWMyKHV2LnggLSBkVXYueCwgdXYueSAtIGRVdi55KTtcXHJcXG5cXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBvcHRpbWlzZWQgY29udm9sdXRpb24gc2hhZGVyIG1hdGVyaWFsLlxyXG4gKlxyXG4gKiBCYXNlZCBvbiB0aGUgR0RDMjAwMyBQcmVzZW50YXRpb24gYnkgTWFzYWtpIEthd2FzZSwgQnVua2FzaGEgR2FtZXM6XHJcbiAqICBGcmFtZSBCdWZmZXIgUG9zdHByb2Nlc3NpbmcgRWZmZWN0cyBpbiBET1VCTEUtUy5ULkUuQS5MIChXcmVja2xlc3MpXHJcbiAqIGFuZCBhbiBhcnRpY2xlIGJ5IEZpbGlwIFN0cnVnYXIsIEludGVsOlxyXG4gKiAgQW4gaW52ZXN0aWdhdGlvbiBvZiBmYXN0IHJlYWwtdGltZSBHUFUtYmFzZWQgaW1hZ2UgYmx1ciBhbGdvcml0aG1zXHJcbiAqXHJcbiAqIEZ1cnRoZXIgbW9kaWZpZWQgYWNjb3JkaW5nIHRvIEFwcGxlJ3NcclxuICogW0Jlc3QgUHJhY3RpY2VzIGZvciBTaGFkZXJzXShodHRwczovL2dvby5nbC9sbVJvTTUpLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb252b2x1dGlvbk1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNvbnZvbHV0aW9uIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbdGV4ZWxTaXplXSAtIFRoZSBhYnNvbHV0ZSBzY3JlZW4gdGV4ZWwgc2l6ZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IodGV4ZWxTaXplID0gbmV3IFZlY3RvcjIoKSkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQ29udm9sdXRpb25NYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblx0XHRcdFx0aGFsZlRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblx0XHRcdFx0a2VybmVsOiBuZXcgVW5pZm9ybSgwLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5zZXRUZXhlbFNpemUodGV4ZWxTaXplLngsIHRleGVsU2l6ZS55KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjdXJyZW50IGtlcm5lbCBzaXplLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtLZXJuZWxTaXplfVxyXG5cdFx0ICogQGRlZmF1bHQgS2VybmVsU2l6ZS5MQVJHRVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5rZXJuZWxTaXplID0gS2VybmVsU2l6ZS5MQVJHRTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBrZXJuZWwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtGbG9hdDMyQXJyYXl9IFRoZSBrZXJuZWwuXHJcblx0ICovXHJcblxyXG5cdGdldEtlcm5lbCgpIHsgcmV0dXJuIGtlcm5lbFByZXNldHNbdGhpcy5rZXJuZWxTaXplXTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB0ZXhlbCBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHggLSBUaGUgdGV4ZWwgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgLSBUaGUgdGV4ZWwgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRUZXhlbFNpemUoeCwgeSkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXMudGV4ZWxTaXplLnZhbHVlLnNldCh4LCB5KTtcclxuXHRcdHRoaXMudW5pZm9ybXMuaGFsZlRleGVsU2l6ZS52YWx1ZS5zZXQoeCwgeSkubXVsdGlwbHlTY2FsYXIoMC41KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBLYXdhc2UgYmx1ciBrZXJuZWwgcHJlc2V0cy5cclxuICpcclxuICogQHR5cGUge0Zsb2F0MzJBcnJheVtdfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmNvbnN0IGtlcm5lbFByZXNldHMgPSBbXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMS4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDEuMCwgMi4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMi4wLCAzLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAzLjAsIDQuMCwgNC4wLCA1LjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAzLjAsIDQuMCwgNS4wLCA3LjAsIDguMCwgOS4wLCAxMC4wXSlcclxuXTtcclxuXHJcbi8qKlxyXG4gKiBBIGtlcm5lbCBzaXplIGVudW1lcmF0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gVkVSWV9TTUFMTCAtIEEgdmVyeSBzbWFsbCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgN3g3IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gU01BTEwgLSBBIHNtYWxsIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAxNXgxNSBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IE1FRElVTSAtIEEgbWVkaXVtIHNpemVkIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAyM3gyMyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IExBUkdFIC0gQSBsYXJnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMzV4MzUgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJZX0xBUkdFIC0gQSB2ZXJ5IGxhcmdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSA2M3g2MyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IEhVR0UgLSBBIGh1Z2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDEyN3gxMjcgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEtlcm5lbFNpemUgPSB7XHJcblxyXG5cdFZFUllfU01BTEw6IDAsXHJcblx0U01BTEw6IDEsXHJcblx0TUVESVVNOiAyLFxyXG5cdExBUkdFOiAzLFxyXG5cdFZFUllfTEFSR0U6IDQsXHJcblx0SFVHRTogNVxyXG5cclxufTtcclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIGZsb2F0IG9wYWNpdHk7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBvcGFjaXR5ICogdGV4ZWw7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2ltcGxlIGNvcHkgc2hhZGVyIG1hdGVyaWFsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3B5TWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY29weSBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJDb3B5TWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRvcGFjaXR5OiBuZXcgVW5pZm9ybSgxLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGFkZXIgbWF0ZXJpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHBvc3QgcHJvY2Vzc2luZyBwYXNzZXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvbWF0ZXJpYWxzXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgQWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwgfSBmcm9tIFwiLi9hZGFwdGl2ZS1sdW1pbm9zaXR5LmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoTWF0ZXJpYWwgfSBmcm9tIFwiLi9ib2tlaC5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaDJNYXRlcmlhbCB9IGZyb20gXCIuL2Jva2VoMi5qc1wiO1xyXG5leHBvcnQgeyBDb21iaW5lTWF0ZXJpYWwgfSBmcm9tIFwiLi9jb21iaW5lLmpzXCI7XHJcbmV4cG9ydCB7IENvbnZvbHV0aW9uTWF0ZXJpYWwsIEtlcm5lbFNpemUgfSBmcm9tIFwiLi9jb252b2x1dGlvbi5qc1wiO1xyXG5leHBvcnQgeyBDb3B5TWF0ZXJpYWwgfSBmcm9tIFwiLi9jb3B5LmpzXCI7XHJcbmV4cG9ydCB7IERlcHRoTWF0ZXJpYWwgfSBmcm9tIFwiLi9kZXB0aC5qc1wiO1xyXG5leHBvcnQgeyBEb3RTY3JlZW5NYXRlcmlhbCB9IGZyb20gXCIuL2RvdC1zY3JlZW4uanNcIjtcclxuZXhwb3J0IHsgRmlsbU1hdGVyaWFsIH0gZnJvbSBcIi4vZmlsbS5qc1wiO1xyXG5leHBvcnQgeyBHbGl0Y2hNYXRlcmlhbCB9IGZyb20gXCIuL2dsaXRjaC5qc1wiO1xyXG5leHBvcnQgeyBHb2RSYXlzTWF0ZXJpYWwgfSBmcm9tIFwiLi9nb2QtcmF5cy5qc1wiO1xyXG5leHBvcnQgeyBMdW1pbm9zaXR5TWF0ZXJpYWwgfSBmcm9tIFwiLi9sdW1pbm9zaXR5LmpzXCI7XHJcbmV4cG9ydCB7IFBpeGVsYXRpb25NYXRlcmlhbCB9IGZyb20gXCIuL3BpeGVsYXRpb24uanNcIjtcclxuZXhwb3J0IHsgU2hvY2tXYXZlTWF0ZXJpYWwgfSBmcm9tIFwiLi9zaG9jay13YXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFCbGVuZE1hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS1ibGVuZC5qc1wiO1xyXG5leHBvcnQgeyBTTUFBQ29sb3JFZGdlc01hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS1jb2xvci1lZGdlcy5qc1wiO1xyXG5leHBvcnQgeyBTTUFBV2VpZ2h0c01hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS13ZWlnaHRzLmpzXCI7XHJcbmV4cG9ydCB7IFRvbmVNYXBwaW5nTWF0ZXJpYWwgfSBmcm9tIFwiLi90b25lLW1hcHBpbmcuanNcIjtcclxuIiwiaW1wb3J0IHsgU2NlbmUsIE1lc2gsIE9ydGhvZ3JhcGhpY0NhbWVyYSwgUGxhbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IHBhc3MuXHJcbiAqXHJcbiAqIFBhc3NlcyB0aGF0IGRvIG5vdCByZWx5IG9uIHRoZSBkZXB0aCBidWZmZXIgc2hvdWxkIGV4cGxpY2l0bHkgZGlzYWJsZSB0aGVcclxuICogZGVwdGggdGVzdCBhbmQgZGVwdGggd3JpdGUgaW4gdGhlaXIgcmVzcGVjdGl2ZSBzaGFkZXIgbWF0ZXJpYWxzLlxyXG4gKlxyXG4gKiBUaGlzIGNsYXNzIGltcGxlbWVudHMgYSB7QGxpbmsgUGFzcyNkaXNwb3NlfSBtZXRob2QgdGhhdCBmcmVlcyBtZW1vcnkgb25cclxuICogZGVtYW5kLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gW3NjZW5lXSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IFtjYW1lcmFdIC0gVGhlIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge01lc2h9IFtxdWFkXSAtIEEgcXVhZCB0aGF0IGZpbGxzIHRoZSBzY3JlZW4gdG8gcmVuZGVyIDJEIGZpbHRlciBlZmZlY3RzLiBTZXQgdGhpcyB0byBudWxsLCBpZiB5b3UgZG9uJ3QgbmVlZCBpdCAoc2VlIHtAbGluayBSZW5kZXJQYXNzfSkuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0c2NlbmUgPSBuZXcgU2NlbmUoKSxcclxuXHRcdGNhbWVyYSA9IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIDEsIC0xLCAwLCAxKSxcclxuXHRcdHF1YWQgPSBuZXcgTWVzaChuZXcgUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgbnVsbClcclxuXHQpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTY2VuZX1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBTY2VuZSgpXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY2FtZXJhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDYW1lcmF9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAxLCAtMSwgMCwgMSlcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBxdWFkIG1lc2ggdGhhdCBmaWxscyB0aGUgc2NyZWVuLlxyXG5cdFx0ICpcclxuXHRcdCAqIEFzc2lnbiB5b3VyIHNoYWRlciBtYXRlcmlhbCB0byB0aGlzIG1lc2ghXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge01lc2h9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgTWVzaChuZXcgUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgbnVsbClcclxuXHRcdCAqIEBleGFtcGxlIHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubXlNYXRlcmlhbDtcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucXVhZCA9IHF1YWQ7XHJcblxyXG5cdFx0aWYodGhpcy5xdWFkICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHR0aGlzLnF1YWQuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYodGhpcy5zY2VuZSAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHR0aGlzLnNjZW5lLmFkZCh0aGlzLnF1YWQpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSByZWFkIGFuZCB3cml0ZSBidWZmZXJzIHNob3VsZCBiZSBzd2FwcGVkIGFmdGVyIHRoaXNcclxuXHRcdCAqIHBhc3MgaGFzIGZpbmlzaGVkIHJlbmRlcmluZy5cclxuXHRcdCAqXHJcblx0XHQgKiBTZXQgdGhpcyB0byB0cnVlIGlmIHRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIgc28gdGhhdCBhXHJcblx0XHQgKiBmb2xsb3dpbmcgcGFzcyBjYW4gZmluZCB0aGUgcmVzdWx0IGluIHRoZSByZWFkIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRW5hYmxlZCBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbmRlciB0byBzY3JlZW4gZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRvU2NyZWVuID0gZmFsc2U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogVGhpcyBpcyBhbiBhYnN0cmFjdCBtZXRob2QgdGhhdCBtdXN0IGJlIG92ZXJyaWRkZW4uXHJcblx0ICpcclxuXHQgKiBAYWJzdHJhY3RcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gQW4gZXJyb3IgaXMgdGhyb3duIGlmIHRoZSBtZXRob2QgaXMgbm90IG92ZXJyaWRkZW4uXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gQSByZWFkIGJ1ZmZlci4gQ29udGFpbnMgdGhlIHJlc3VsdCBvZiB0aGUgcHJldmlvdXMgcGFzcy5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIEEgd3JpdGUgYnVmZmVyLiBOb3JtYWxseSB1c2VkIGFzIHRoZSByZW5kZXIgdGFyZ2V0IHdoZW4gdGhlIHJlYWQgYnVmZmVyIGlzIHVzZWQgYXMgaW5wdXQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YV0gLSBUaGUgZGVsdGEgdGltZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrQWN0aXZlXSAtIEluZGljYXRlcyB3aGV0aGVyIGEgc3RlbmNpbCB0ZXN0IG1hc2sgaXMgYWN0aXZlIG9yIG5vdC5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEsIG1hc2tBY3RpdmUpIHtcclxuXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZW5kZXIgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCFcIik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogWW91IG1heSBvdmVycmlkZSB0aGlzIG1ldGhvZCBpbiBjYXNlIHlvdSB3YW50IHRvIGJlIGluZm9ybWVkIGFib3V0IHRoZSBtYWluXHJcblx0ICogcmVuZGVyIHNpemUuXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCBiZWZvcmUgdGhpcyBwYXNzIGlzXHJcblx0ICogaW5pdGlhbGlzZWQgYW5kIGV2ZXJ5IHRpbWUgaXRzIG93biBzaXplIGlzIHVwZGF0ZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgcmVuZGVyZXIncyB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIHJlbmRlcmVyJ3MgaGVpZ2h0LlxyXG5cdCAqIEBleGFtcGxlIHRoaXMubXlSZW5kZXJUYXJnZXQuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtcyBpbml0aWFsaXNhdGlvbiB0YXNrcy5cclxuXHQgKlxyXG5cdCAqIEJ5IG92ZXJyaWRpbmcgdGhpcyBtZXRob2QgeW91IGdhaW4gYWNjZXNzIHRvIHRoZSByZW5kZXJlci4gWW91J2xsIGFsc28gYmVcclxuXHQgKiBhYmxlIHRvIGNvbmZpZ3VyZSB5b3VyIGN1c3RvbSByZW5kZXIgdGFyZ2V0cyB0byB1c2UgdGhlIGFwcHJvcHJpYXRlIGZvcm1hdFxyXG5cdCAqIChSR0Igb3IgUkdCQSkuXHJcblx0ICpcclxuXHQgKiBUaGUgcHJvdmlkZWQgcmVuZGVyZXIgY2FuIGJlIHVzZWQgdG8gd2FybSB1cCBzcGVjaWFsIG9mZi1zY3JlZW4gcmVuZGVyXHJcblx0ICogdGFyZ2V0cyBieSBwZXJmb3JtaW5nIGEgcHJlbGltaW5hcnkgcmVuZGVyIG9wZXJhdGlvbi5cclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gdGhpcyBwYXNzIGlzIGFkZGVkIHRvIGl0c1xyXG5cdCAqIHF1ZXVlLlxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBpbml0aWFsaXNlXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFscGhhIC0gV2hldGhlciB0aGUgcmVuZGVyZXIgdXNlcyB0aGUgYWxwaGEgY2hhbm5lbCBvciBub3QuXHJcblx0ICogQGV4YW1wbGUgaWYoIWFscGhhKSB7IHRoaXMubXlSZW5kZXJUYXJnZXQudGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7IH1cclxuXHQgKi9cclxuXHJcblx0aW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIGEgc2hhbGxvdyBzZWFyY2ggZm9yIHByb3BlcnRpZXMgdGhhdCBkZWZpbmUgYSBkaXNwb3NlIG1ldGhvZCBhbmRcclxuXHQgKiBkZWxldGVzIHRoZW0uIFRoZSBwYXNzIHdpbGwgYmUgaW5vcGVyYXRpdmUgYWZ0ZXIgdGhpcyBtZXRob2Qgd2FzIGNhbGxlZCFcclxuXHQgKlxyXG5cdCAqIERpc3Bvc2FibGUgb2JqZWN0czpcclxuXHQgKiAgLSByZW5kZXIgdGFyZ2V0c1xyXG5cdCAqICAtIG1hdGVyaWFsc1xyXG5cdCAqICAtIHRleHR1cmVzXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIGl0IGlzIGJlaW5nIGRlc3Ryb3llZC5cclxuXHQgKiBZb3UgbWF5LCBob3dldmVyLCB1c2UgaXQgaW5kZXBlbmRlbnRseSB0byBmcmVlIG1lbW9yeSB3aGVuIHlvdSBhcmUgY2VydGFpblxyXG5cdCAqIHRoYXQgeW91IGRvbid0IG5lZWQgdGhpcyBwYXNzIGFueW1vcmUuXHJcblx0ICovXHJcblxyXG5cdGRpc3Bvc2UoKSB7XHJcblxyXG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cclxuXHRcdGxldCBrZXk7XHJcblxyXG5cdFx0Zm9yKGtleSBvZiBrZXlzKSB7XHJcblxyXG5cdFx0XHRpZih0aGlzW2tleV0gIT09IG51bGwgJiYgdHlwZW9mIHRoaXNba2V5XS5kaXNwb3NlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHJcblx0XHRcdFx0dGhpc1trZXldLmRpc3Bvc2UoKTtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBudWxsO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFVzZWQgZm9yIHNhdmluZyB0aGUgb3JpZ2luYWwgY2xlYXIgY29sb3Igb2YgdGhlIHJlbmRlcmVyLlxyXG4gKlxyXG4gKiBAdHlwZSBDb2xvclxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5cclxuY29uc3QgY29sb3IgPSBuZXcgQ29sb3IoKTtcclxuXHJcbi8qKlxyXG4gKiBBIGNsZWFyIHBhc3MuXHJcbiAqXHJcbiAqIFlvdSBjYW4gcHJldmVudCBzcGVjaWZpYyBidWZmZXJzIGZyb20gYmVpbmcgY2xlYXJlZCBieSBzZXR0aW5nIGVpdGhlciB0aGVcclxuICogYXV0b0NsZWFyQ29sb3IsIGF1dG9DbGVhclN0ZW5jaWwgb3IgYXV0b0NsZWFyRGVwdGggcHJvcGVydGllcyBvZiB0aGUgcmVuZGVyZXJcclxuICogdG8gZmFsc2UuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNsZWFyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7Q29sb3J9IFtvcHRpb25zLmNsZWFyQ29sb3I9bnVsbF0gLSBBbiBvdmVycmlkZSBjbGVhciBjb2xvci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2xlYXJBbHBoYT0wLjBdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgYWxwaGEuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKG51bGwsIG51bGwsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJDbGVhclBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFyIGNvbG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb2xvcn1cclxuXHRcdCAqIEBkZWZhdWx0IG51bGxcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJDb2xvciA9IChvcHRpb25zLmNsZWFyQ29sb3IgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyQ29sb3IgOiBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXIgYWxwaGEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBkZWZhdWx0IDAuMFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckFscGhhID0gKG9wdGlvbnMuY2xlYXJBbHBoYSAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJBbHBoYSA6IDAuMDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbGVhcnMgdGhlIHJlYWQgYnVmZmVyIG9yIHRoZSBzY3JlZW4uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IGNsZWFyQ29sb3IgPSB0aGlzLmNsZWFyQ29sb3I7XHJcblxyXG5cdFx0bGV0IGNsZWFyQWxwaGE7XHJcblxyXG5cdFx0aWYoY2xlYXJDb2xvciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0Y29sb3IuY29weShyZW5kZXJlci5nZXRDbGVhckNvbG9yKCkpO1xyXG5cdFx0XHRjbGVhckFscGhhID0gcmVuZGVyZXIuZ2V0Q2xlYXJBbHBoYSgpO1xyXG5cdFx0XHRyZW5kZXJlci5zZXRDbGVhckNvbG9yKGNsZWFyQ29sb3IsIHRoaXMuY2xlYXJBbHBoYSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHJlYWRCdWZmZXIpO1xyXG5cdFx0cmVuZGVyZXIuY2xlYXIoKTtcclxuXHJcblx0XHRpZihjbGVhckNvbG9yICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRDbGVhckNvbG9yKGNvbG9yLCBjbGVhckFscGhhKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHBhc3MgdGhhdCBkaXNhYmxlcyB0aGUgc3RlbmNpbCBtYXNrLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGVhck1hc2tQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY2xlYXIgbWFzayBwYXNzLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcihudWxsLCBudWxsLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQ2xlYXJNYXNrUGFzc1wiO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc2FibGVzIHRoZSBzdGVuY2lsIHRlc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIpIHtcclxuXHJcblx0XHRyZW5kZXJlci5zdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0VGVzdChmYWxzZSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGF0YVRleHR1cmUsIFJHQkZvcm1hdCwgRmxvYXRUeXBlIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IEdsaXRjaE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsb3cgLSBUaGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGlnaCAtIFRoZSBoaWdoZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByYW5kb20gdmFsdWUuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcmFuZG9tSW50KGxvdywgaGlnaCkge1xyXG5cclxuXHRyZXR1cm4gbG93ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGhpZ2ggLSBsb3cgKyAxKSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsb3cgLSBUaGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGlnaCAtIFRoZSBoaWdoZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByYW5kb20gdmFsdWUuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcmFuZG9tRmxvYXQobG93LCBoaWdoKSB7XHJcblxyXG5cdHJldHVybiBsb3cgKyBNYXRoLnJhbmRvbSgpICogKGhpZ2ggLSBsb3cpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZ2xpdGNoIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEdsaXRjaFBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBnbGl0Y2ggcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge1RleHR1cmV9IFtvcHRpb25zLnBlcnR1cmJNYXBdIC0gQSBwZXJ0dXJiYXRpb24gbWFwLiBJZiBub25lIGlzIHByb3ZpZGVkLCBhIG5vaXNlIHRleHR1cmUgd2lsbCBiZSBjcmVhdGVkLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdFNpemU9NjRdIC0gVGhlIHNpemUgb2YgdGhlIGdlbmVyYXRlZCBub2lzZSBtYXAuIFdpbGwgYmUgaWdub3JlZCBpZiBhIHBlcnR1cmJhdGlvbiBtYXAgaXMgcHJvdmlkZWQuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkdsaXRjaFBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHbGl0Y2ggc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtHbGl0Y2hNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbmV3IEdsaXRjaE1hdGVyaWFsKCk7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcGVydHVyYmF0aW9uIG1hcC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRleHR1cmUgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMucGVydHVyYk1hcCA9IChvcHRpb25zLnBlcnR1cmJNYXAgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnBlcnR1cmJNYXAgOiB0aGlzLmdlbmVyYXRlUGVydHVyYk1hcChvcHRpb25zLmR0U2l6ZSk7XHJcblx0XHR0aGlzLnBlcnR1cmJNYXAubmFtZSA9IFwiR2xpdGNoLlBlcnR1cmJhdGlvblwiO1xyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVmZmVjdCBtb2RlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtHbGl0Y2hNb2RlfVxyXG5cdFx0ICogQGRlZmF1bHQgR2xpdGNoTW9kZS5TUE9SQURJQ1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tb2RlID0gR2xpdGNoTW9kZS5TUE9SQURJQztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENvdW50ZXIgZm9yIGdsaXRjaCBhY3RpdmF0aW9uIGFuZCBkZWFjdGl2YXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvdW50ZXIgPSAwO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSByYW5kb20gYnJlYWsgcG9pbnQgZm9yIHRoZSBzcG9yYWRpYyBnbGl0Y2ggYWN0aXZhdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYnJlYWtQb2ludCA9IHJhbmRvbUludCgxMjAsIDI0MCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgcGVydHVyYmF0aW9uIG1hcC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdCAqL1xyXG5cclxuXHRnZXQgcGVydHVyYk1hcCgpIHsgcmV0dXJuIHRoaXMudGV4dHVyZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBc3NpZ25pbmcgYSBuZXcgcGVydHVyYmF0aW9uIG1hcCBkb2VzIG5vdCBkZXN0cm95IHRoZSBjdXJyZW50IG9uZSFcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgcGVydHVyYk1hcCh4KSB7XHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlID0geDtcclxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudFBlcnR1cmIudmFsdWUgPSB4O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IHBlcnR1cmJhdGlvbiBtYXAgYW5kIHJlcGxhY2VzIGl0IHdpdGggYSBuZXcgb25lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtzaXplPTY0XSAtIFRoZSB0ZXh0dXJlIHNpemUuXHJcblx0ICogQHJldHVybiB7RGF0YVRleHR1cmV9IFRoZSBwZXJ0dXJiYXRpb24gdGV4dHVyZS5cclxuXHQgKi9cclxuXHJcblx0Z2VuZXJhdGVQZXJ0dXJiTWFwKHNpemUgPSA2NCkge1xyXG5cclxuXHRcdGNvbnN0IHBpeGVscyA9IHNpemUgKiBzaXplO1xyXG5cdFx0Y29uc3QgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkocGl4ZWxzICogMyk7XHJcblxyXG5cdFx0bGV0IGR0ID0gdGhpcy5wZXJ0dXJiTWFwO1xyXG5cdFx0bGV0IGksIHg7XHJcblxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgcGl4ZWxzOyArK2kpIHtcclxuXHJcblx0XHRcdHggPSBNYXRoLnJhbmRvbSgpO1xyXG5cclxuXHRcdFx0ZGF0YVtpICogM10gPSB4O1xyXG5cdFx0XHRkYXRhW2kgKiAzICsgMV0gPSB4O1xyXG5cdFx0XHRkYXRhW2kgKiAzICsgMl0gPSB4O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZihkdCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0ZHQuZGlzcG9zZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRkdCA9IG5ldyBEYXRhVGV4dHVyZShkYXRhLCBzaXplLCBzaXplLCBSR0JGb3JtYXQsIEZsb2F0VHlwZSk7XHJcblx0XHRkdC5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwID0gZHQ7XHJcblxyXG5cdFx0cmV0dXJuIGR0O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBtb2RlID0gdGhpcy5tb2RlO1xyXG5cdFx0Y29uc3QgY291bnRlciA9IHRoaXMuY291bnRlcjtcclxuXHRcdGNvbnN0IGJyZWFrUG9pbnQgPSB0aGlzLmJyZWFrUG9pbnQ7XHJcblx0XHRjb25zdCB1bmlmb3JtcyA9IHRoaXMubWF0ZXJpYWwudW5pZm9ybXM7XHJcblxyXG5cdFx0dW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR1bmlmb3Jtcy5zZWVkLnZhbHVlID0gTWF0aC5yYW5kb20oKTtcclxuXHRcdHVuaWZvcm1zLmFjdGl2ZS52YWx1ZSA9IHRydWU7XHJcblxyXG5cdFx0aWYoY291bnRlciAlIGJyZWFrUG9pbnQgPT09IDAgfHwgbW9kZSA9PT0gR2xpdGNoTW9kZS5DT05TVEFOVF9XSUxEKSB7XHJcblxyXG5cdFx0XHR1bmlmb3Jtcy5hbW91bnQudmFsdWUgPSBNYXRoLnJhbmRvbSgpIC8gMzAuMDtcclxuXHRcdFx0dW5pZm9ybXMuYW5nbGUudmFsdWUgPSByYW5kb21GbG9hdCgtTWF0aC5QSSwgTWF0aC5QSSk7XHJcblx0XHRcdHVuaWZvcm1zLnNlZWRYLnZhbHVlID0gcmFuZG9tRmxvYXQoLTEuMCwgMS4wKTtcclxuXHRcdFx0dW5pZm9ybXMuc2VlZFkudmFsdWUgPSByYW5kb21GbG9hdCgtMS4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWC52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblkudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblxyXG5cdFx0XHR0aGlzLmJyZWFrUG9pbnQgPSByYW5kb21JbnQoMTIwLCAyNDApO1xyXG5cdFx0XHR0aGlzLmNvdW50ZXIgPSAwO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZihjb3VudGVyICUgYnJlYWtQb2ludCA8IGJyZWFrUG9pbnQgLyA1IHx8IG1vZGUgPT09IEdsaXRjaE1vZGUuQ09OU1RBTlRfTUlMRCkge1xyXG5cclxuXHRcdFx0XHR1bmlmb3Jtcy5hbW91bnQudmFsdWUgPSBNYXRoLnJhbmRvbSgpIC8gOTAuMDtcclxuXHRcdFx0XHR1bmlmb3Jtcy5hbmdsZS52YWx1ZSA9IHJhbmRvbUZsb2F0KC1NYXRoLlBJLCBNYXRoLlBJKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWC52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWS52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5zZWVkWC52YWx1ZSA9IHJhbmRvbUZsb2F0KC0wLjMsIDAuMyk7XHJcblx0XHRcdFx0dW5pZm9ybXMuc2VlZFkudmFsdWUgPSByYW5kb21GbG9hdCgtMC4zLCAwLjMpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gU3BvcmFkaWMuXHJcblx0XHRcdFx0dW5pZm9ybXMuYWN0aXZlLnZhbHVlID0gZmFsc2U7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdCsrdGhpcy5jb3VudGVyO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGdsaXRjaCBtb2RlIGVudW1lcmF0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gU1BPUkFESUMgLSBTcG9yYWRpYyBnbGl0Y2hlcy5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENPTlNUQU5UX01JTEQgLSBDb25zdGFudCBtaWxkIGdsaXRjaGVzLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ09OU1RBTlRfV0lMRCAtIENvbnN0YW50IHdpbGQgZ2xpdGNoZXMuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEdsaXRjaE1vZGUgPSB7XHJcblxyXG5cdFNQT1JBRElDOiAwLFxyXG5cdENPTlNUQU5UX01JTEQ6IDEsXHJcblx0Q09OU1RBTlRfV0lMRDogMlxyXG5cclxufTtcclxuIiwiaW1wb3J0IHsgQ2xlYXJQYXNzIH0gZnJvbSBcIi4vY2xlYXIuanNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHBhc3MgdGhhdCByZW5kZXJzIGEgZ2l2ZW4gc2NlbmUgZGlyZWN0bHkgb24gc2NyZWVuIG9yIGludG8gdGhlIHJlYWQgYnVmZmVyXHJcbiAqIGZvciBmdXJ0aGVyIHByb2Nlc3NpbmcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyByZW5kZXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lIC0gVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIC0gVGhlIGNhbWVyYSB0byB1c2UgdG8gcmVuZGVyIHRoZSBzY2VuZS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TWF0ZXJpYWx9IFtvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWw9bnVsbF0gLSBBbiBvdmVycmlkZSBtYXRlcmlhbCBmb3IgdGhlIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7Q29sb3J9IFtvcHRpb25zLmNsZWFyQ29sb3I9bnVsbF0gLSBBbiBvdmVycmlkZSBjbGVhciBjb2xvci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2xlYXJBbHBoYT0xLjBdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgYWxwaGEuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGVhckRlcHRoPWZhbHNlXSAtIFdoZXRoZXIgZGVwdGggc2hvdWxkIGJlIGNsZWFyZWQgZXhwbGljaXRseS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsZWFyPXRydWVdIC0gV2hldGhlciBhbGwgYnVmZmVycyBzaG91bGQgYmUgY2xlYXJlZC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIGNhbWVyYSwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoc2NlbmUsIGNhbWVyYSwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlJlbmRlclBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY2xlYXIgcGFzcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q2xlYXJQYXNzfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhclBhc3MgPSBuZXcgQ2xlYXJQYXNzKG9wdGlvbnMpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQW4gb3ZlcnJpZGUgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge01hdGVyaWFsfVxyXG5cdFx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5vdmVycmlkZU1hdGVyaWFsID0gKG9wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbCA6IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZGVwdGggYnVmZmVyIHNob3VsZCBiZSBjbGVhcmVkIGV4cGxpY2l0bHkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckRlcHRoID0gKG9wdGlvbnMuY2xlYXJEZXB0aCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJEZXB0aCA6IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvbG9yLCBkZXB0aCBhbmQgc3RlbmNpbCBidWZmZXJzIHNob3VsZCBiZSBjbGVhcmVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEV2ZW4gd2l0aCBjbGVhciBzZXQgdG8gdHJ1ZSB5b3UgY2FuIHByZXZlbnQgc3BlY2lmaWMgYnVmZmVycyBmcm9tIGJlaW5nXHJcblx0XHQgKiBjbGVhcmVkIGJ5IHNldHRpbmcgZWl0aGVyIHRoZSBhdXRvQ2xlYXJDb2xvciwgYXV0b0NsZWFyU3RlbmNpbCBvclxyXG5cdFx0ICogYXV0b0NsZWFyRGVwdGggcHJvcGVydGllcyBvZiB0aGUgcmVuZGVyZXIgdG8gZmFsc2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyID0gKG9wdGlvbnMuY2xlYXIgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyIDogdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBzY2VuZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiByZWFkQnVmZmVyO1xyXG5cclxuXHRcdGlmKHRoaXMuY2xlYXIpIHtcclxuXHJcblx0XHRcdHRoaXMuY2xlYXJQYXNzLnJlbmRlcihyZW5kZXJlciwgdGFyZ2V0KTtcclxuXHJcblx0XHR9IGVsc2UgaWYodGhpcy5jbGVhckRlcHRoKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQodGFyZ2V0KTtcclxuXHRcdFx0cmVuZGVyZXIuY2xlYXJEZXB0aCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gdGhpcy5vdmVycmlkZU1hdGVyaWFsO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSwgdGFyZ2V0KTtcclxuXHRcdHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBtYXNrIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hc2tQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgbWFzayBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgY2FtZXJhIHRvIHVzZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIGNhbWVyYSkge1xyXG5cclxuXHRcdHN1cGVyKHNjZW5lLCBjYW1lcmEsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJNYXNrUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW52ZXJzZSBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuaW52ZXJzZSA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU3RlbmNpbCBidWZmZXIgY2xlYXIgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJTdGVuY2lsID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgc3RlbmNpbCBiaXQgbWFzay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHRcdGNvbnN0IHN0YXRlID0gcmVuZGVyZXIuc3RhdGU7XHJcblxyXG5cdFx0Y29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG5cdFx0Y29uc3QgY2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcblxyXG5cdFx0Y29uc3Qgd3JpdGVWYWx1ZSA9IHRoaXMuaW52ZXJzZSA/IDAgOiAxO1xyXG5cdFx0Y29uc3QgY2xlYXJWYWx1ZSA9IDEgLSB3cml0ZVZhbHVlO1xyXG5cclxuXHRcdC8vIERvbid0IHVwZGF0ZSBjb2xvciBvciBkZXB0aC5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TWFzayhmYWxzZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldE1hc2soZmFsc2UpO1xyXG5cclxuXHRcdC8vIExvY2sgdGhlIGJ1ZmZlcnMuXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldExvY2tlZCh0cnVlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TG9ja2VkKHRydWUpO1xyXG5cclxuXHRcdC8vIENvbmZpZ3VyZSB0aGUgc3RlbmNpbC5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRUZXN0KHRydWUpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldE9wKGNvbnRleHQuUkVQTEFDRSwgY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldEZ1bmMoY29udGV4dC5BTFdBWVMsIHdyaXRlVmFsdWUsIDB4ZmZmZmZmZmYpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldENsZWFyKGNsZWFyVmFsdWUpO1xyXG5cclxuXHRcdC8vIENsZWFyIHRoZSBzdGVuY2lsLlxyXG5cdFx0aWYodGhpcy5jbGVhclN0ZW5jaWwpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldChyZWFkQnVmZmVyKTtcclxuXHRcdFx0cmVuZGVyZXIuY2xlYXJTdGVuY2lsKCk7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQod3JpdGVCdWZmZXIpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhclN0ZW5jaWwoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgbWFzayBpbnRvIGJvdGggYnVmZmVycy5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCByZWFkQnVmZmVyKTtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdFx0Ly8gVW5sb2NrIHRoZSBidWZmZXJzLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRMb2NrZWQoZmFsc2UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRMb2NrZWQoZmFsc2UpO1xyXG5cclxuXHRcdC8vIE9ubHkgcmVuZGVyIHdoZXJlIHRoZSBzdGVuY2lsIGlzIHNldCB0byAxLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldEZ1bmMoY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0T3AoY29udGV4dC5LRUVQLCBjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHNoYWRlciBwYXNzLlxyXG4gKlxyXG4gKiBVc2VkIHRvIHJlbmRlciBhbnkgc2hhZGVyIG1hdGVyaWFsIGFzIGEgMkQgZmlsdGVyLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgc2hhZGVyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NoYWRlck1hdGVyaWFsfSBtYXRlcmlhbCAtIFRoZSBzaGFkZXIgbWF0ZXJpYWwgdG8gdXNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbdGV4dHVyZUlEPVwidERpZmZ1c2VcIl0gLSBUaGUgdGV4dHVyZSB1bmlmb3JtIGlkZW50aWZpZXIuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsLCB0ZXh0dXJlSUQgPSBcInREaWZmdXNlXCIpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTaGFkZXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNoYWRlciBtYXRlcmlhbCB0byB1c2UgZm9yIHJlbmRlcmluZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hhZGVyTWF0ZXJpYWx9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoZSBjb2xvciBzYW1wbGVyIHVuaWZvcm0gb2YgdGhlIGdpdmVuIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKiBAZGVmYXVsdCBcInREaWZmdXNlXCJcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZUlEID0gdGV4dHVyZUlEO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRpZih0aGlzLm1hdGVyaWFsLnVuaWZvcm1zW3RoaXMudGV4dHVyZUlEXSAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zW3RoaXMudGV4dHVyZUlEXS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IENvcHlNYXRlcmlhbCwgU2hvY2tXYXZlTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogSGFsZiBQSS5cclxuICpcclxuICogQHR5cGUge051bWJlcn1cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCBIQUxGX1BJID0gTWF0aC5QSSAqIDAuNTtcclxuXHJcbi8qKlxyXG4gKiBBIHZlY3Rvci5cclxuICpcclxuICogQHR5cGUge1ZlY3RvcjN9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG4vKipcclxuICogQSB2ZWN0b3IuXHJcbiAqXHJcbiAqIEB0eXBlIHtWZWN0b3IzfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IGFiID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbi8qKlxyXG4gKiBBIHNob2NrIHdhdmUgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2hvY2tXYXZlUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHNob2NrIHdhdmUgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgbWFpbiBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtWZWN0b3IzfSBbZXBpY2VudGVyXSAtIFRoZSB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgc2hvY2sgd2F2ZSBlcGljZW50ZXIuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zcGVlZD0xLjBdIC0gVGhlIGFuaW1hdGlvbiBzcGVlZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UmFkaXVzPTEuMF0gLSBUaGUgZXh0ZW50IG9mIHRoZSBzaG9jayB3YXZlLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53YXZlU2l6ZT0wLjJdIC0gVGhlIHdhdmUgc2l6ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYW1wbGl0dWRlPTAuMDVdIC0gVGhlIGRpc3RvcnRpb24gYW1wbGl0dWRlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYW1lcmEsIGVwaWNlbnRlciA9IG5ldyBWZWN0b3IzKCksIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlNob2NrV2F2ZVBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbWFpbiBjYW1lcmEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdDNEfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYWluQ2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVwaWNlbnRlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VmVjdG9yM31cclxuXHRcdCAqIEBleGFtcGxlIHNob2NrV2F2ZVBhc3MuZXBpY2VudGVyID0gbXlNZXNoLnBvc2l0aW9uO1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5lcGljZW50ZXIgPSBlcGljZW50ZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgb2JqZWN0IHBvc2l0aW9uIGluIHNjcmVlbiBzcGFjZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VmVjdG9yM31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjcmVlblBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzcGVlZCBvZiB0aGUgc2hvY2sgd2F2ZSBhbmltYXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBkZWZhdWx0IDIuMFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zcGVlZCA9IChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5zcGVlZCA6IDIuMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgdGltZSBhY2N1bXVsYXRvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGltZSA9IDAuMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzaG9jayB3YXZlIGFuaW1hdGlvbiBpcyBhY3RpdmUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgc2hvY2sgd2F2ZSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1Nob2NrV2F2ZU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwgPSBuZXcgU2hvY2tXYXZlTWF0ZXJpYWwob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbC51bmlmb3Jtcy5jZW50ZXIudmFsdWUgPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb3B5IHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29weU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsID0gbmV3IENvcHlNYXRlcmlhbCgpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVtaXRzIHRoZSBzaG9jayB3YXZlLlxyXG5cdCAqL1xyXG5cclxuXHRleHBsb2RlKCkge1xyXG5cclxuXHRcdHRoaXMudGltZSA9IDAuMDtcclxuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YSAtIFRoZSByZW5kZXIgZGVsdGEgdGltZS5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEpIHtcclxuXHJcblx0XHRjb25zdCBlcGljZW50ZXIgPSB0aGlzLmVwaWNlbnRlcjtcclxuXHRcdGNvbnN0IG1haW5DYW1lcmEgPSB0aGlzLm1haW5DYW1lcmE7XHJcblx0XHRjb25zdCBzY3JlZW5Qb3NpdGlvbiA9IHRoaXMuc2NyZWVuUG9zaXRpb247XHJcblxyXG5cdFx0Y29uc3Qgc2hvY2tXYXZlTWF0ZXJpYWwgPSB0aGlzLnNob2NrV2F2ZU1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSBzaG9ja1dhdmVNYXRlcmlhbC51bmlmb3JtcztcclxuXHRcdGNvbnN0IGNlbnRlciA9IHVuaWZvcm1zLmNlbnRlcjtcclxuXHRcdGNvbnN0IHJhZGl1cyA9IHVuaWZvcm1zLnJhZGl1cztcclxuXHRcdGNvbnN0IG1heFJhZGl1cyA9IHVuaWZvcm1zLm1heFJhZGl1cztcclxuXHRcdGNvbnN0IHdhdmVTaXplID0gdW5pZm9ybXMud2F2ZVNpemU7XHJcblxyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLmNvcHlNYXRlcmlhbDtcclxuXHJcblx0XHRpZih0aGlzLmFjdGl2ZSkge1xyXG5cclxuXHRcdFx0Ly8gQ2FsY3VsYXRlIGRpcmVjdGlvbiB2ZWN0b3JzLlxyXG5cdFx0XHRtYWluQ2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKHYpO1xyXG5cdFx0XHRhYi5jb3B5KG1haW5DYW1lcmEucG9zaXRpb24pLnN1YihlcGljZW50ZXIpO1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgcmVuZGVyIHRoZSBlZmZlY3QgaWYgdGhlIG9iamVjdCBpcyBiZWhpbmQgdGhlIGNhbWVyYS5cclxuXHRcdFx0aWYodi5hbmdsZVRvKGFiKSA+IEhBTEZfUEkpIHtcclxuXHJcblx0XHRcdFx0Ly8gU2NhbGUgdGhlIGVmZmVjdCBiYXNlZCBvbiBkaXN0YW5jZSB0byB0aGUgb2JqZWN0LlxyXG5cdFx0XHRcdHVuaWZvcm1zLmNhbWVyYURpc3RhbmNlLnZhbHVlID0gbWFpbkNhbWVyYS5wb3NpdGlvbi5kaXN0YW5jZVRvKGVwaWNlbnRlcik7XHJcblxyXG5cdFx0XHRcdC8vIENhbGN1bGF0ZSB0aGUgc2NyZWVuIHBvc2l0aW9uIG9mIHRoZSBlcGljZW50ZXIuXHJcblx0XHRcdFx0c2NyZWVuUG9zaXRpb24uY29weShlcGljZW50ZXIpLnByb2plY3QobWFpbkNhbWVyYSk7XHJcblx0XHRcdFx0Y2VudGVyLnZhbHVlLnggPSAoc2NyZWVuUG9zaXRpb24ueCArIDEuMCkgKiAwLjU7XHJcblx0XHRcdFx0Y2VudGVyLnZhbHVlLnkgPSAoc2NyZWVuUG9zaXRpb24ueSArIDEuMCkgKiAwLjU7XHJcblxyXG5cdFx0XHRcdHVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0XHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHNob2NrV2F2ZU1hdGVyaWFsO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBzaG9jayB3YXZlIHJhZGl1cyBiYXNlZCBvbiB0aW1lLlxyXG5cdFx0XHR0aGlzLnRpbWUgKz0gZGVsdGE7XHJcblx0XHRcdHJhZGl1cy52YWx1ZSA9IHRoaXMudGltZSAqIHRoaXMuc3BlZWQgLSB3YXZlU2l6ZS52YWx1ZTtcclxuXHJcblx0XHRcdGlmKHJhZGl1cy52YWx1ZSA+PSAobWF4UmFkaXVzLnZhbHVlICsgd2F2ZVNpemUudmFsdWUpICogMikge1xyXG5cclxuXHRcdFx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbC51bmlmb3Jtcy5hc3BlY3QudmFsdWUgPSB3aWR0aCAvIGhlaWdodDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQSBjb21waWxhdGlvbiBvZiB0aGUgcG9zdCBwcm9jZXNzaW5nIHBhc3Nlcy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9wYXNzZXNcclxuICovXHJcblxyXG5leHBvcnQgeyBCbG9vbVBhc3MgfSBmcm9tIFwiLi9ibG9vbS5qc1wiO1xyXG5leHBvcnQgeyBCbHVyUGFzcyB9IGZyb20gXCIuL2JsdXIuanNcIjtcclxuZXhwb3J0IHsgQm9rZWhQYXNzIH0gZnJvbSBcIi4vYm9rZWguanNcIjtcclxuZXhwb3J0IHsgQm9rZWgyUGFzcyB9IGZyb20gXCIuL2Jva2VoMi5qc1wiO1xyXG5leHBvcnQgeyBDbGVhclBhc3MgfSBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5leHBvcnQgeyBDbGVhck1hc2tQYXNzIH0gZnJvbSBcIi4vY2xlYXItbWFzay5qc1wiO1xyXG5leHBvcnQgeyBEb3RTY3JlZW5QYXNzIH0gZnJvbSBcIi4vZG90LXNjcmVlbi5qc1wiO1xyXG5leHBvcnQgeyBEZXB0aFBhc3MgfSBmcm9tIFwiLi9kZXB0aC5qc1wiO1xyXG5leHBvcnQgeyBGaWxtUGFzcyB9IGZyb20gXCIuL2ZpbG0uanNcIjtcclxuZXhwb3J0IHsgR2xpdGNoTW9kZSwgR2xpdGNoUGFzcyB9IGZyb20gXCIuL2dsaXRjaC5qc1wiO1xyXG5leHBvcnQgeyBHb2RSYXlzUGFzcyB9IGZyb20gXCIuL2dvZC1yYXlzLmpzXCI7XHJcbmV4cG9ydCB7IE1hc2tQYXNzIH0gZnJvbSBcIi4vbWFzay5qc1wiO1xyXG5leHBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5leHBvcnQgeyBQaXhlbGF0aW9uUGFzcyB9IGZyb20gXCIuL3BpeGVsYXRpb24uanNcIjtcclxuZXhwb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gXCIuL3JlbmRlci5qc1wiO1xyXG5leHBvcnQgeyBTYXZlUGFzcyB9IGZyb20gXCIuL3NhdmUuanNcIjtcclxuZXhwb3J0IHsgU2hhZGVyUGFzcyB9IGZyb20gXCIuL3NoYWRlci5qc1wiO1xyXG5leHBvcnQgeyBTaG9ja1dhdmVQYXNzIH0gZnJvbSBcIi4vc2hvY2std2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTTUFBUGFzcyB9IGZyb20gXCIuL3NtYWEuanNcIjtcclxuZXhwb3J0IHsgVGV4dHVyZVBhc3MgfSBmcm9tIFwiLi90ZXh0dXJlLmpzXCI7XHJcbmV4cG9ydCB7IFRvbmVNYXBwaW5nUGFzcyB9IGZyb20gXCIuL3RvbmUtbWFwcGluZy5qc1wiO1xyXG4iLCJpbXBvcnQge1xyXG5cdERlcHRoU3RlbmNpbEZvcm1hdCxcclxuXHREZXB0aFRleHR1cmUsXHJcblx0TGluZWFyRmlsdGVyLFxyXG5cdFJHQkFGb3JtYXQsXHJcblx0UkdCRm9ybWF0LFxyXG5cdFVuc2lnbmVkSW50MjQ4VHlwZSxcclxuXHRXZWJHTFJlbmRlclRhcmdldFxyXG59IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IHsgQ2xlYXJNYXNrUGFzcywgTWFza1Bhc3MsIFNoYWRlclBhc3MgfSBmcm9tIFwiLi4vcGFzc2VzXCI7XHJcbmltcG9ydCB7IENvcHlNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRWZmZWN0Q29tcG9zZXIgbWF5IGJlIHVzZWQgaW4gcGxhY2Ugb2YgYSBub3JtYWwgV2ViR0xSZW5kZXJlci5cclxuICpcclxuICogVGhlIGF1dG8gY2xlYXIgYmVoYXZpb3VyIG9mIHRoZSBwcm92aWRlZCByZW5kZXJlciB3aWxsIGJlIGRpc2FibGVkIHRvIHByZXZlbnRcclxuICogdW5uZWNlc3NhcnkgY2xlYXIgb3BlcmF0aW9ucy5cclxuICpcclxuICogSXQgaXMgY29tbW9uIHByYWN0aWNlIHRvIHVzZSBhIHtAbGluayBSZW5kZXJQYXNzfSBhcyB0aGUgZmlyc3QgcGFzcyB0b1xyXG4gKiBhdXRvbWF0aWNhbGx5IGNsZWFyIHRoZSBzY3JlZW4gYW5kIHJlbmRlciB0aGUgc2NlbmUgdG8gYSB0ZXh0dXJlIGZvciBmdXJ0aGVyXHJcbiAqIHByb2Nlc3NpbmcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEVmZmVjdENvbXBvc2VyIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBlZmZlY3QgY29tcG9zZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IFtyZW5kZXJlcl0gLSBUaGUgcmVuZGVyZXIgdGhhdCBzaG91bGQgYmUgdXNlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kZXB0aEJ1ZmZlcj10cnVlXSAtIFdoZXRoZXIgdGhlIG1haW4gcmVuZGVyIHRhcmdldHMgc2hvdWxkIGhhdmUgYSBkZXB0aCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zdGVuY2lsQnVmZmVyPWZhbHNlXSAtIFdoZXRoZXIgdGhlIG1haW4gcmVuZGVyIHRhcmdldHMgc2hvdWxkIGhhdmUgYSBzdGVuY2lsIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRlcHRoVGV4dHVyZT1mYWxzZV0gLSBTZXQgdG8gdHJ1ZSBpZiBvbmUgb2YgeW91ciBwYXNzZXMgcmVsaWVzIG9uIGEgZGVwdGggdGV4dHVyZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IocmVuZGVyZXIgPSBudWxsLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZW5kZXJlci5cclxuXHRcdCAqXHJcblx0XHQgKiBZb3UgbWF5IHJlcGxhY2UgdGhlIHJlbmRlcmVyIGF0IGFueSB0aW1lIGJ5IHVzaW5nXHJcblx0XHQgKiB7QGxpbmsgRWZmZWN0Q29tcG9zZXIjcmVwbGFjZVJlbmRlcmVyfS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJlcn1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZWFkIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBSZWFkaW5nIGZyb20gYW5kIHdyaXRpbmcgdG8gdGhlIHNhbWUgcmVuZGVyIHRhcmdldCBzaG91bGQgYmUgYXZvaWRlZC5cclxuXHRcdCAqIFRoZXJlZm9yZSwgdHdvIHNlcGVyYXRlIHlldCBpZGVudGljYWwgYnVmZmVycyBhcmUgdXNlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMud3JpdGVCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdGlmKHRoaXMucmVuZGVyZXIgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcihcclxuXHRcdFx0XHQob3B0aW9ucy5kZXB0aEJ1ZmZlciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuZGVwdGhCdWZmZXIgOiB0cnVlLFxyXG5cdFx0XHRcdChvcHRpb25zLnN0ZW5jaWxCdWZmZXIgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnN0ZW5jaWxCdWZmZXIgOiBmYWxzZSxcclxuXHRcdFx0XHQob3B0aW9ucy5kZXB0aFRleHR1cmUgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmRlcHRoVGV4dHVyZSA6IGZhbHNlXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLmNsb25lKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb3B5IHBhc3MgdXNlZCBmb3IgY29weWluZyBtYXNrZWQgc2NlbmVzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaGFkZXJQYXNzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weVBhc3MgPSBuZXcgU2hhZGVyUGFzcyhuZXcgQ29weU1hdGVyaWFsKCkpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHBhc3Nlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UGFzc1tdfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucGFzc2VzID0gW107XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRlcHRoIHRleHR1cmUgb2YgdGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7RGVwdGhUZXh0dXJlfVxyXG5cdCAqIEBkZWZhdWx0IG51bGxcclxuXHQgKi9cclxuXHJcblx0Z2V0IGRlcHRoVGV4dHVyZSgpIHsgcmV0dXJuIHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMgc2hhcmUgYSBzaW5nbGUgZGVwdGggdGV4dHVyZS4gRGVwdGggd2lsbCBiZVxyXG5cdCAqIHdyaXR0ZW4gdG8gdGhpcyB0ZXh0dXJlIHdoZW4gc29tZXRoaW5nIGlzIHJlbmRlcmVkIGludG8gb25lIG9mIHRoZSBidWZmZXJzXHJcblx0ICogYW5kIHRoZSBpbnZvbHZlZCBtYXRlcmlhbHMgaGF2ZSBkZXB0aCB3cml0ZSBlbmFibGVkLlxyXG5cdCAqXHJcblx0ICogWW91IG1heSBlbmFibGUgdGhpcyBtZWNoYW5pc20gZHVyaW5nIHRoZSBpbnN0YW50aWF0aW9uIG9mIHRoZSBjb21wb3NlciBvclxyXG5cdCAqIGJ5IGFzc2lnbmluZyBhIERlcHRoVGV4dHVyZSBpbnN0YW5jZSBsYXRlciBvbi4gWW91IG1heSBhbHNvIGRpc2FibGUgaXQgYnlcclxuXHQgKiBhc3NpZ25pbmcgbnVsbC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEZXB0aFRleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCBkZXB0aFRleHR1cmUoeCkge1xyXG5cclxuXHRcdHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmUgPSB4O1xyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlci5kZXB0aFRleHR1cmUgPSB4O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBjdXJyZW50IHJlbmRlcmVyIHdpdGggdGhlIGdpdmVuIG9uZS4gVGhlIERPTSBlbGVtZW50IG9mIHRoZVxyXG5cdCAqIGN1cnJlbnQgcmVuZGVyZXIgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IG5vZGUgYW5kIHRoZVxyXG5cdCAqIERPTSBlbGVtZW50IG9mIHRoZSBuZXcgcmVuZGVyZXIgd2lsbCB0YWtlIGl0cyBwbGFjZS5cclxuXHQgKlxyXG5cdCAqIFRoZSBhdXRvIGNsZWFyIG1lY2hhbmlzbSBvZiB0aGUgcHJvdmlkZWQgcmVuZGVyZXIgd2lsbCBiZSBkaXNhYmxlZC5cclxuXHQgKlxyXG5cdCAqIFN3aXRjaGluZyBiZXR3ZWVuIHJlbmRlcmVycyBhbGxvd3MgeW91IHRvIGR5bmFtaWNhbGx5IGVuYWJsZSBvciBkaXNhYmxlXHJcblx0ICogYW50aWFsaWFzaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSBuZXcgcmVuZGVyZXIuXHJcblx0ICogQHJldHVybiB7V2ViR0xSZW5kZXJlcn0gVGhlIG9sZCByZW5kZXJlci5cclxuXHQgKi9cclxuXHJcblx0cmVwbGFjZVJlbmRlcmVyKHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0Y29uc3Qgb2xkUmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cclxuXHRcdGxldCBwYXJlbnQsIG9sZFNpemUsIG5ld1NpemU7XHJcblxyXG5cdFx0aWYob2xkUmVuZGVyZXIgIT09IG51bGwgJiYgb2xkUmVuZGVyZXIgIT09IHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHRwYXJlbnQgPSBvbGRSZW5kZXJlci5kb21FbGVtZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZFNpemUgPSBvbGRSZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRcdG5ld1NpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XHJcblxyXG5cdFx0XHRpZihwYXJlbnQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKG9sZFJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG9sZFNpemUud2lkdGggIT09IG5ld1NpemUud2lkdGggfHwgb2xkU2l6ZS5oZWlnaHQgIT09IG5ld1NpemUuaGVpZ2h0KSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2V0U2l6ZSgpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gb2xkUmVuZGVyZXI7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyByZW5kZXIgdGFyZ2V0IGJ5IHJlcGxpY2F0aW5nIHRoZSByZW5kZXJlcidzIGNhbnZhcy5cclxuXHQgKlxyXG5cdCAqIFRoZSBjcmVhdGVkIHJlbmRlciB0YXJnZXQgdXNlcyBhIGxpbmVhciBmaWx0ZXIgZm9yIHRleGVsIG1pbmlmaWNhdGlvbiBhbmRcclxuXHQgKiBtYWduaWZpY2F0aW9uLiBJdHMgcmVuZGVyIHRleHR1cmUgZm9ybWF0IGRlcGVuZHMgb24gd2hldGhlciB0aGUgcmVuZGVyZXJcclxuXHQgKiB1c2VzIHRoZSBhbHBoYSBjaGFubmVsLiBNaXBtYXBzIGFyZSBkaXNhYmxlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVwdGhCdWZmZXIgLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBoYXZlIGEgZGVwdGggYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RlbmNpbEJ1ZmZlciAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBzdGVuY2lsIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGRlcHRoVGV4dHVyZSAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBkZXB0aCB0ZXh0dXJlLlxyXG5cdCAqIEByZXR1cm4ge1dlYkdMUmVuZGVyVGFyZ2V0fSBBIG5ldyByZW5kZXIgdGFyZ2V0IHRoYXQgZXF1YWxzIHRoZSByZW5kZXJlcidzIGNhbnZhcy5cclxuXHQgKi9cclxuXHJcblx0Y3JlYXRlQnVmZmVyKGRlcHRoQnVmZmVyLCBzdGVuY2lsQnVmZmVyLCBkZXB0aFRleHR1cmUpIHtcclxuXHJcblx0XHRjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblx0XHRjb25zdCBhbHBoYSA9IHRoaXMucmVuZGVyZXIuY29udGV4dC5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFscGhhO1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldCA9IG5ldyBXZWJHTFJlbmRlclRhcmdldChzaXplLndpZHRoICogcGl4ZWxSYXRpbywgc2l6ZS5oZWlnaHQgKiBwaXhlbFJhdGlvLCB7XHJcblx0XHRcdG1pbkZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRtYWdGaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0Zm9ybWF0OiBhbHBoYSA/IFJHQkFGb3JtYXQgOiBSR0JGb3JtYXQsXHJcblx0XHRcdGRlcHRoQnVmZmVyOiBkZXB0aEJ1ZmZlcixcclxuXHRcdFx0c3RlbmNpbEJ1ZmZlcjogc3RlbmNpbEJ1ZmZlcixcclxuXHRcdFx0ZGVwdGhUZXh0dXJlOiBkZXB0aFRleHR1cmUgPyBuZXcgRGVwdGhUZXh0dXJlKCkgOiBudWxsXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihkZXB0aFRleHR1cmUgJiYgc3RlbmNpbEJ1ZmZlcikge1xyXG5cclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmRlcHRoVGV4dHVyZS5mb3JtYXQgPSBEZXB0aFN0ZW5jaWxGb3JtYXQ7XHJcblx0XHRcdHJlbmRlclRhcmdldC5kZXB0aFRleHR1cmUudHlwZSA9IFVuc2lnbmVkSW50MjQ4VHlwZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyVGFyZ2V0LnRleHR1cmUubmFtZSA9IFwiRWZmZWN0Q29tcG9zZXIuQnVmZmVyXCI7XHJcblx0XHRyZW5kZXJUYXJnZXQudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyVGFyZ2V0O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBwYXNzLCBvcHRpb25hbGx5IGF0IGEgc3BlY2lmaWMgaW5kZXguXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1Bhc3N9IHBhc3MgLSBBIG5ldyBwYXNzLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbaW5kZXhdIC0gQW4gaW5kZXggYXQgd2hpY2ggdGhlIHBhc3Mgc2hvdWxkIGJlIGluc2VydGVkLlxyXG5cdCAqL1xyXG5cclxuXHRhZGRQYXNzKHBhc3MsIGluZGV4KSB7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblxyXG5cdFx0cGFzcy5zZXRTaXplKHNpemUud2lkdGggKiBwaXhlbFJhdGlvLCBzaXplLmhlaWdodCAqIHBpeGVsUmF0aW8pO1xyXG5cdFx0cGFzcy5pbml0aWFsaXNlKHJlbmRlcmVyLCByZW5kZXJlci5jb250ZXh0LmdldENvbnRleHRBdHRyaWJ1dGVzKCkuYWxwaGEpO1xyXG5cclxuXHRcdGlmKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHRoaXMucGFzc2VzLnNwbGljZShpbmRleCwgMCwgcGFzcyk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHRoaXMucGFzc2VzLnB1c2gocGFzcyk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQYXNzfSBwYXNzIC0gVGhlIHBhc3MuXHJcblx0ICovXHJcblxyXG5cdHJlbW92ZVBhc3MocGFzcykge1xyXG5cclxuXHRcdHRoaXMucGFzc2VzLnNwbGljZSh0aGlzLnBhc3Nlcy5pbmRleE9mKHBhc3MpLCAxKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIGFsbCBlbmFibGVkIHBhc3NlcyBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIGFkZGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhIC0gVGhlIHRpbWUgYmV0d2VlbiB0aGUgbGFzdCBmcmFtZSBhbmQgdGhlIGN1cnJlbnQgb25lIGluIHNlY29uZHMuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihkZWx0YSkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cdFx0Y29uc3QgY29weVBhc3MgPSB0aGlzLmNvcHlQYXNzO1xyXG5cclxuXHRcdGxldCByZWFkQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyO1xyXG5cdFx0bGV0IHdyaXRlQnVmZmVyID0gdGhpcy53cml0ZUJ1ZmZlcjtcclxuXHJcblx0XHRsZXQgbWFza0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0bGV0IHBhc3MsIGNvbnRleHQsIGJ1ZmZlcjtcclxuXHRcdGxldCBpLCBsO1xyXG5cclxuXHRcdGZvcihpID0gMCwgbCA9IHBhc3Nlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuXHJcblx0XHRcdHBhc3MgPSBwYXNzZXNbaV07XHJcblxyXG5cdFx0XHRpZihwYXNzLmVuYWJsZWQpIHtcclxuXHJcblx0XHRcdFx0cGFzcy5yZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSwgbWFza0FjdGl2ZSk7XHJcblxyXG5cdFx0XHRcdGlmKHBhc3MubmVlZHNTd2FwKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYobWFza0FjdGl2ZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0Y29udGV4dCA9IHJlbmRlcmVyLmNvbnRleHQ7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc3RlbmNpbEZ1bmMoY29udGV4dC5OT1RFUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblx0XHRcdFx0XHRcdGNvcHlQYXNzLnJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpO1xyXG5cdFx0XHRcdFx0XHRjb250ZXh0LnN0ZW5jaWxGdW5jKGNvbnRleHQuRVFVQUwsIDEsIDB4ZmZmZmZmZmYpO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidWZmZXIgPSByZWFkQnVmZmVyO1xyXG5cdFx0XHRcdFx0cmVhZEJ1ZmZlciA9IHdyaXRlQnVmZmVyO1xyXG5cdFx0XHRcdFx0d3JpdGVCdWZmZXIgPSBidWZmZXI7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYocGFzcyBpbnN0YW5jZW9mIE1hc2tQYXNzKSB7XHJcblxyXG5cdFx0XHRcdFx0bWFza0FjdGl2ZSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSBpZihwYXNzIGluc3RhbmNlb2YgQ2xlYXJNYXNrUGFzcykge1xyXG5cclxuXHRcdFx0XHRcdG1hc2tBY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBidWZmZXJzIGFuZCB0aGUgcmVuZGVyZXIncyBvdXRwdXQgY2FudmFzLlxyXG5cdCAqXHJcblx0ICogRXZlcnkgcGFzcyB3aWxsIGJlIGluZm9ybWVkIG9mIHRoZSBuZXcgc2l6ZS4gSXQncyB1cCB0byBlYWNoIHBhc3MgaG93IHRoYXRcclxuXHQgKiBpbmZvcm1hdGlvbiBpcyB1c2VkLlxyXG5cdCAqXHJcblx0ICogSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGlzIHNwZWNpZmllZCwgdGhlIHJlbmRlciB0YXJnZXRzIGFuZCBwYXNzZXMgd2lsbCBiZVxyXG5cdCAqIHVwZGF0ZWQgd2l0aCB0aGUgY3VycmVudCBzaXplIG9mIHRoZSByZW5kZXJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGhdIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XSAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHRoaXMucmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xyXG5cclxuXHRcdGxldCBpLCBsO1xyXG5cclxuXHRcdGlmKHdpZHRoID09PSB1bmRlZmluZWQgfHwgaGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHdpZHRoID0gc2l6ZS53aWR0aDtcclxuXHRcdFx0aGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR3aWR0aCAqPSBwaXhlbFJhdGlvO1xyXG5cdFx0aGVpZ2h0ICo9IHBpeGVsUmF0aW87XHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLndyaXRlQnVmZmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0Zm9yKGkgPSAwLCBsID0gcGFzc2VzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0cGFzc2VzW2ldLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGlzIGNvbXBvc2VyIGJ5IGRlbGV0aW5nIGFsbCBwYXNzZXMgYW5kIGNyZWF0aW5nIG5ldyBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gW3JlbmRlclRhcmdldF0gLSBBIG5ldyByZW5kZXIgdGFyZ2V0LiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgc2V0dGluZ3Mgb2YgdGhlIHJlbmRlcmVyIHdpbGwgYmUgdXNlZC5cclxuXHQgKi9cclxuXHJcblx0cmVzZXQocmVuZGVyVGFyZ2V0KSB7XHJcblxyXG5cdFx0Y29uc3QgZGVwdGhCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuZGVwdGhCdWZmZXI7XHJcblx0XHRjb25zdCBzdGVuY2lsQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLnN0ZW5jaWxCdWZmZXI7XHJcblx0XHRjb25zdCBkZXB0aFRleHR1cmUgPSAodGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZSAhPT0gbnVsbCk7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlKChyZW5kZXJUYXJnZXQgPT09IHVuZGVmaW5lZCkgP1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUJ1ZmZlcihkZXB0aEJ1ZmZlciwgc3RlbmNpbEJ1ZmZlciwgZGVwdGhUZXh0dXJlKSA6XHJcblx0XHRcdHJlbmRlclRhcmdldFxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXN0cm95cyBhbGwgcGFzc2VzIGFuZCByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIFRoaXMgbWV0aG9kIGRlYWxsb2NhdGVzIGFsbCByZW5kZXIgdGFyZ2V0cywgdGV4dHVyZXMgYW5kIG1hdGVyaWFscyBjcmVhdGVkXHJcblx0ICogYnkgdGhlIHBhc3Nlcy4gSXQgYWxzbyBkZWxldGVzIHRoaXMgY29tcG9zZXIncyBmcmFtZSBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gW3JlbmRlclRhcmdldF0gLSBBIG5ldyByZW5kZXIgdGFyZ2V0LiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgY29tcG9zZXIgd2lsbCBiZWNvbWUgaW5vcGVyYXRpdmUuXHJcblx0ICovXHJcblxyXG5cdGRpc3Bvc2UocmVuZGVyVGFyZ2V0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblxyXG5cdFx0aWYodGhpcy5yZWFkQnVmZmVyICE9PSBudWxsICYmIHRoaXMud3JpdGVCdWZmZXIgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlci5kaXNwb3NlKCk7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyID0gbnVsbDtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlKHBhc3Nlcy5sZW5ndGggPiAwKSB7XHJcblxyXG5cdFx0XHRwYXNzZXMucG9wKCkuZGlzcG9zZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZihyZW5kZXJUYXJnZXQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0Ly8gUmVhbmltYXRlLlxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSByZW5kZXJUYXJnZXQ7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuY2xvbmUoKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dGhpcy5jb3B5UGFzcy5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3JlIGNvbXBvbmVudHMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvY29yZVxyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSBcIi4vZWZmZWN0LWNvbXBvc2VyLmpzXCI7XHJcbiIsIi8qKlxyXG4gKiBFeHBvc3VyZSBvZiB0aGUgbGlicmFyeSBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwiLi9jb3JlXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdEJsb29tUGFzcyxcclxuXHRCbHVyUGFzcyxcclxuXHRCb2tlaFBhc3MsXHJcblx0Qm9rZWgyUGFzcyxcclxuXHRDbGVhclBhc3MsXHJcblx0Q2xlYXJNYXNrUGFzcyxcclxuXHREZXB0aFBhc3MsXHJcblx0RG90U2NyZWVuUGFzcyxcclxuXHRGaWxtUGFzcyxcclxuXHRHbGl0Y2hNb2RlLFxyXG5cdEdsaXRjaFBhc3MsXHJcblx0R29kUmF5c1Bhc3MsXHJcblx0TWFza1Bhc3MsXHJcblx0UGFzcyxcclxuXHRQaXhlbGF0aW9uUGFzcyxcclxuXHRSZW5kZXJQYXNzLFxyXG5cdFNhdmVQYXNzLFxyXG5cdFNoYWRlclBhc3MsXHJcblx0U2hvY2tXYXZlUGFzcyxcclxuXHRTTUFBUGFzcyxcclxuXHRUZXh0dXJlUGFzcyxcclxuXHRUb25lTWFwcGluZ1Bhc3NcclxufSBmcm9tIFwiLi9wYXNzZXNcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0QWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0Qm9rZWhNYXRlcmlhbCxcclxuXHRCb2tlaDJNYXRlcmlhbCxcclxuXHRDb21iaW5lTWF0ZXJpYWwsXHJcblx0Q29udm9sdXRpb25NYXRlcmlhbCxcclxuXHRDb3B5TWF0ZXJpYWwsXHJcblx0RGVwdGhNYXRlcmlhbCxcclxuXHREb3RTY3JlZW5NYXRlcmlhbCxcclxuXHRGaWxtTWF0ZXJpYWwsXHJcblx0R2xpdGNoTWF0ZXJpYWwsXHJcblx0R29kUmF5c01hdGVyaWFsLFxyXG5cdEtlcm5lbFNpemUsXHJcblx0THVtaW5vc2l0eU1hdGVyaWFsLFxyXG5cdFBpeGVsYXRpb25NYXRlcmlhbCxcclxuXHRTaG9ja1dhdmVNYXRlcmlhbCxcclxuXHRTTUFBQmxlbmRNYXRlcmlhbCxcclxuXHRTTUFBQ29sb3JFZGdlc01hdGVyaWFsLFxyXG5cdFNNQUFXZWlnaHRzTWF0ZXJpYWwsXHJcblx0VG9uZU1hcHBpbmdNYXRlcmlhbFxyXG59IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG4iLCJpbXBvcnQge1xuICBFZmZlY3RDb21wb3NlcixcbiAgUmVuZGVyUGFzcyxcbiAgU2hhZGVyUGFzc1xufSBmcm9tICdwb3N0cHJvY2Vzc2luZyc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuY29uc3QgcG9seWZpbGwgPSAob2JqZWN0LCBtZXRob2QsIHNob3dXYXJuID0gdHJ1ZSkgPT4ge1xuICBpZiAob2JqZWN0W21ldGhvZF0pIHJldHVybjtcbiAgaWYgKHNob3dXYXJuKSBjb25zb2xlLndhcm4oYEBQb3N0UHJvY2Vzc29yTW9kdWxlOiBwYXNzLiR7bWV0aG9kfSgpIHdhcyBub3QgZm91bmQuYCwgb2JqZWN0KTtcbiAgb2JqZWN0W21ldGhvZF0gPSAoKSA9PiB7fTtcbn07XG5cbmV4cG9ydCBjbGFzcyBQb3N0UHJvY2Vzc29yTW9kdWxlIHtcbiAgY3VycmVudFBhc3MgPSBudWxsO1xuXG4gIGRlZmVyID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3Ioe2RlYnVnfSA9IHtkZWJ1ZzogdHJ1ZX0pIHtcbiAgICB0aGlzLmRlYnVnID0gZGVidWc7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncG9zdHByb2Nlc3NvcicpO1xuXG4gICAgdGhpcy5lZmZlY3RzID0gbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLmVmZmVjdHM7XG4gICAgdGhpcy5yZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHRoaXMuc2NlbmUgPSBtYW5hZ2VyLmdldCgnc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHRoaXMuY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIodGhpcy5yZW5kZXJlcik7XG5cbiAgICBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykuc3RvcCgpO1xuXG4gICAgY29uc3QgY29tcG9zZXIgPSB0aGlzLmNvbXBvc2VyO1xuICAgIHRoaXMucmVuZGVyTG9vcCA9IG5ldyBMb29wKGNsb2NrID0+IGNvbXBvc2VyLnJlbmRlcihjbG9jay5nZXREZWx0YSgpKSkuc3RhcnQobWFuYWdlci5oYW5kbGVyKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIHJlbmRlcmVyOiByZW5kZXJlciA9PiB7XG4gICAgICAgIHRoaXMuY29tcG9zZXIucmVwbGFjZVJlbmRlcmVyKHJlbmRlcmVyKTtcbiAgICAgIH0sXG5cbiAgICAgIHNjZW5lOiBzY2VuZSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICAgIH0sXG5cbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc29sdmUoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgcGFzcyA9IG5ldyBSZW5kZXJQYXNzKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLm5hdGl2ZSk7XG5cbiAgICAgIC8vIFRPRE86IFN1cHBvcnQgZm9yIGVmZmVjdHMuXG5cbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBBUElcblxuICBwYXNzKHBhc3MpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgcG9seWZpbGwocGFzcywgJ3NldFNpemUnLCB0aGlzLmRlYnVnKTtcbiAgICAgIHBvbHlmaWxsKHBhc3MsICdpbml0aWFsaXNlJywgdGhpcy5kZWJ1Zyk7XG5cbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzaGFkZXIobWF0ZXJpYWwsIHRleHR1cmVJRCA9ICdyZWFkQnVmZmVyJykge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBpZiAoIW1hdGVyaWFsLnVuaWZvcm1zW3RleHR1cmVJRF0pXG4gICAgICAgIG1hdGVyaWFsLnVuaWZvcm1zW3RleHR1cmVJRF0gPSB7dmFsdWU6IG51bGx9O1xuXG4gICAgICBjb25zdCBwYXNzID0gbmV3IFNoYWRlclBhc3MobWF0ZXJpYWwsIHRleHR1cmVJRCk7XG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gUGFzcyBBUElcblxuICBnZXQobmFtZSkge1xuICAgIHJldHVybiBuYW1lXG4gICAgICA/IHRoaXMuY29tcG9zZXIucGFzc2VzLmZpbHRlcihwYXNzID0+IHBhc3MubmFtZSA9PT0gbmFtZSlbMF1cbiAgICAgIDogdGhpcy5jdXJyZW50UGFzcztcbiAgfVxuXG4gIHRvKG5hbWUpIHtcbiAgICB0aGlzLmN1cnJlbnRQYXNzID0gbmFtZTtcbiAgfVxuXG4gIHJlbmRlclRvU2NyZWVuKGJvb2wgPSB0cnVlKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MucmVuZGVyVG9TY3JlZW4gPSBib29sO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuYW1lKG5hbWUpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFzcy5uYW1lID0gbmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRXZlbnRzUGF0Y2hNb2R1bGUge1xuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnZXZlbnRzJyk7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJykuZG9tRWxlbWVudDtcbiAgfVxuXG4gIHBhdGNoRXZlbnRzKG9yaWdpbk9iamVjdCwgZGVzdE9iamVjdCwgZXZlbnRzID0gW10pIHtcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxuICAgICAgb3JpZ2luT2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGUgPT4gZGVzdE9iamVjdC5lbWl0KGV2ZW50LCBlKSlcbiAgICApO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBjb25zdCB7ZWxlbWVudCwgcGF0Y2hFdmVudHN9ID0gc2VsZjtcblxuICAgIHBhdGNoRXZlbnRzKGVsZW1lbnQsIHRoaXMsIFtcbiAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgJ2NvbnRleHRtZW51JyxcbiAgICAgICdtb3VzZWRvd24nLFxuICAgICAgJ2NsaWNrJyxcbiAgICAgICd3aGVlbCcsXG4gICAgICAndG91Y2hzdGFydCcsXG4gICAgICAndG91Y2hlbmQnLFxuICAgICAgJ3RvdWNobW92ZScsXG4gICAgICAna2V5ZG93bidcbiAgICBdKTtcblxuICAgIHBhdGNoRXZlbnRzKGVsZW1lbnQsIHRoaXMsIFtcbiAgICAgICdrZXlkb3duJyxcbiAgICAgICdrZXl1cCcsXG4gICAgICAna2V5cHJlc3MnXG4gICAgXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFZlY3RvcjIsXG4gIFJheWNhc3RlcixcbiAgUGxhbmUsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge0V2ZW50c1BhdGNoTW9kdWxlfSBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcblxuLyoqXG4gKiBAY2xhc3MgVmlydHVhbE1vdXNlTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2dsb2JhbE1vdmVtZW50PWZhbHNlXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4dGVuZHMgRXZlbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsTW91c2VNb2R1bGUgZXh0ZW5kcyBFdmVudHMge1xuICBtb3VzZSA9IG5ldyBWZWN0b3IyKCk7XG4gIHJheWNhc3RlciA9IG5ldyBSYXljYXN0ZXIoKTtcbiAgd29ybGQgPSBudWxsO1xuICBjYW52YXMgPSBudWxsO1xuICBwcm9qZWN0aW9uUGxhbmUgPSBuZXcgUGxhbmUobmV3IFZlY3RvcjMoMCwgMCwgMSksIDApO1xuXG4gIGNvbnN0cnVjdG9yKGdsb2JhbE1vdmVtZW50ID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ2xvYmFsTW92ZW1lbnQgPSBnbG9iYWxNb3ZlbWVudDtcbiAgfVxuXG4gIHVwZGF0ZShlLCBjdXN0b21YLCBjdXN0b21ZKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgeCA9IGN1c3RvbVggfHwgZS5jbGllbnRYO1xuICAgIGNvbnN0IHkgPSBjdXN0b21ZIHx8IGUuY2xpZW50WTtcblxuICAgIHRoaXMubW91c2UueCA9ICgoeCAtIHJlY3QubGVmdCkgLyAocmVjdC5yaWdodCAtIHJlY3QubGVmdCkpICogMiAtIDE7XG4gICAgdGhpcy5tb3VzZS55ID0gLSgoeSAtIHJlY3QudG9wKSAvIChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSkgKiAyICsgMTtcblxuICAgIHRoaXMucHJvamVjdGlvblBsYW5lLm5vcm1hbC5jb3B5KHRoaXMuY2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKCkpO1xuXG4gICAgdGhpcy5yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSh0aGlzLm1vdXNlLCB0aGlzLmNhbWVyYSk7XG4gICAgdGhpcy5lbWl0KCdtb3ZlJyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnbW91c2UnKTtcbiAgICBtYW5hZ2VyLnJlcXVpcmUoJ2V2ZW50cycsICgpID0+IG5ldyBFdmVudHNQYXRjaE1vZHVsZSgpKTtcblxuICAgIHRoaXMuY2FudmFzID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJykuZG9tRWxlbWVudDtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmU7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIFtcbiAgICAgICdjbGljaycsXG4gICAgICAnbW91c2Vkb3duJyxcbiAgICAgICdtb3VzZXVwJyxcbiAgICAgICdtb3VzZW1vdmUnXG4gICAgXS5mb3JFYWNoKGV2ID0+IHRoaXMub24oZXYsIGUgPT4gc2VsZi5lbWl0KGV2LCBlKSkpO1xuXG4gICAgc2VsZi5nbG9iYWxYID0gMDtcbiAgICBzZWxmLmdsb2JhbFkgPSAwO1xuXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQucG9pbnRlckxvY2tFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNlbGYuZ2xvYmFsWCArPSBlLm1vdmVtZW50WDtcbiAgICAgICAgc2VsZi5nbG9iYWxZICs9IGUubW92ZW1lbnRZO1xuXG4gICAgICAgIHNlbGYudXBkYXRlKGUsIHNlbGYuZ2xvYmFsWCwgc2VsZi5nbG9iYWxZKTtcbiAgICAgIH0gZWxzZSBzZWxmLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRyYWNrKGNvbXBvbmVudCkge1xuICAgIGxldCBpc0hvdmVyZWQgPSBmYWxzZTtcblxuICAgIHRoaXMub24oJ21vdmUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ob3ZlcnMoY29tcG9uZW50KSkge1xuICAgICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2Vtb3ZlJyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbXBvbmVudC5lbWl0KCdtb3VzZW92ZXInKTtcbiAgICAgICAgICBpc0hvdmVyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzSG92ZXJlZCkge1xuICAgICAgICBjb21wb25lbnQuZW1pdCgnbW91c2VvdXQnKTtcbiAgICAgICAgaXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdjbGljaycpO1xuICAgICAgZWxzZSBjb21wb25lbnQuZW1pdCgnb2ZmQ2xpY2snKTtcbiAgICB9KTtcblxuICAgIHRoaXMub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZWRvd24nKTtcbiAgICB9KTtcblxuICAgIHRoaXMub24oJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2V1cCcpO1xuICAgIH0pO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKGNvbXBvbmVudCkge1xuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3QoY29tcG9uZW50Lm5hdGl2ZSk7XG4gIH1cblxuICBwcm9qZWN0KHBsYW5lID0gdGhpcy5wcm9qZWN0aW9uUGxhbmUpIHtcbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIucmF5LmludGVyc2VjdFBsYW5lKHBsYW5lKTtcbiAgfVxuXG4gIGhvdmVycyhjb21wb25lbnQpIHtcbiAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSB0aGlzLmludGVyc2VjdGlvbihjb21wb25lbnQpWzBdO1xuICAgIHJldHVybiBpbnRlcnNlY3Rpb24gPyBpbnRlcnNlY3Rpb24ub2JqZWN0ID09PSBjb21wb25lbnQubmF0aXZlIDogZmFsc2U7XG4gIH1cblxuICBnZXQgcmF5KCkge1xuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5yYXk7XG4gIH1cblxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpcy5tb3VzZS54O1xuICB9XG5cbiAgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2UueTtcbiAgfVxufVxuIiwiaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuaW1wb3J0IHtFdmVudHNQYXRjaE1vZHVsZX0gZnJvbSAnLi9FdmVudHNQYXRjaE1vZHVsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sc01vZHVsZSB7XG4gIHN0YXRpYyBmcm9tKGNvbnRyb2xzKSB7XG4gICAgcmV0dXJuIG5ldyBDb250cm9sc01vZHVsZSh7Y29udHJvbHN9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIGZpeDogY29udHJvbHMgPT4gY29udHJvbHMsXG5cbiAgICAgIHVwZGF0ZShjKSB7XG4gICAgICAgIHRoaXMuY29udHJvbHMudXBkYXRlKGMuZ2V0RGVsdGEoKSk7XG4gICAgICB9XG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLnBhcmFtcy5jb250cm9scztcbiAgICB0aGlzLnVwZGF0ZSA9IHRoaXMucGFyYW1zLnVwZGF0ZTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIucmVxdWlyZSgnZXZlbnRzJywgKCkgPT4gbmV3IEV2ZW50c1BhdGNoTW9kdWxlKCkpO1xuICB9XG5cbiAgc2V0Q29udHJvbHMoY29udHJvbHMpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRVcGRhdGUodXBkYXRlKSB7XG4gICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYudXBkYXRlTG9vcCA9IG5ldyBMb29wKHNlbGYudXBkYXRlLmJpbmQoc2VsZikpO1xuICAgIHNlbGYudXBkYXRlTG9vcC5zdGFydCh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRm9nRXhwMixcbiAgRm9nXG59IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgRm9nTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtjb2xvcjogMHhlZmQxYjUsIGRlbnNpdHk6IDAuMDIwLCBuZWFyOiAxMCwgZmFyOiAxMDAwfV0gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gW3R5cGU9ZXhwMl0gLSBUaGUgdHlwZSBvZiBmb2cgLSBleHAyIG9yIGxpbmVhclxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+SG93IHRvIGNyZWF0ZSBhbmQgYXBwbHkgYSBGb2dNb2R1bGU8L2NhcHRpb24+XG4gKiBjb25zdCBmb2dNb2R1bGUgPSBuZXcgRm9nTW9kdWxlKHtcbiAqICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgIGRlbnNpdHk6IDAuMDMsXG4gKiAgICBuZWFyOiAyMCxcbiAqICAgIGZhcjogMjAwXG4gKiAgfSwgJ2V4cDInKTtcbiAqXG4gKiBuZXcgQXBwKFtcbiAqICAuLi4sXG4gKiAgZm9nTW9kdWxlXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEZvZ01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCB0eXBlKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNvbG9yOiAweGVmZDFiNSxcbiAgICAgIGRlbnNpdHk6IDAuMDIwLFxuICAgICAgbmVhcjogMTAsXG4gICAgICBmYXI6IDEwMDBcbiAgICB9LCBwYXJhbXMpO1xuICAgIGlmICghdHlwZSB8fCB0eXBlID09PSAnZXhwMicpIHRoaXMuZm9nID0gbmV3IEZvZ0V4cDIodGhpcy5wYXJhbXMuY29sb3IsIHRoaXMucGFyYW1zLmRlbnNpdHkpO1xuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdsaW5lYXInKSB0aGlzLmZvZyA9IG5ldyBGb2codGhpcy5wYXJhbXMuY29sb3IsIHRoaXMucGFyYW1zLm5lYXIsIHRoaXMucGFyYW1zLmZhcik7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnZm9nJywgdGhpcy5mb2cpO1xuICAgIG1hbmFnZXIuZ2V0KCdzY2VuZScpLmZvZyA9IHRoaXMuZm9nO1xuICB9XG59XG4iLCJpbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tICdyZWR1eCc7XG5cbmNvbnN0IGlzRXF1YWxEZWZhdWx0ID0gKGEsIGIpID0+IHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuICBlbHNlIGlmIChhICYmIGEuZXF1YWxzICYmIGEuZXF1YWxzKGIpKSByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIEBjbGFzcyBTdGF0ZU1vZHVsZVxuICogQGRlc2NyaXB0aW9uIGBTdGF0ZU1vZHVsZWAgaXMgdXNlZnVsIGZvciBhcHBzLCB3aGVyZSB5b3UgbmVlZCBzdGF0ZSBtYW5pcHVsYXRpb24uXG4gKiBUaGlzIGNhbiBiZTogX3RyYW5zaXRpb25zIGJldHdlZW4gc2NyZWVucywgZ2FtZXMsIGRldmVsb3BtZW50IG1vbWVudHNfLlxuICogWW91IGNhbiBjaGVjayBbYmFzaWMvc3RhdGVdKGh0dHBzOi8vd2hzLWRldi5zdXJnZS5zaC9leGFtcGxlcy8/YmFzaWMvc3RhdGUpIGV4YW1wbGUuXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgc3RhdGUgbW9kdWxlPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIC8vIC4uLlxuICogICBuZXcgU3RhdGVNb2R1bGUoKS5kZWZhdWx0KHtcbiAqICAgICBzcGhlcmVDb2xvcjogMHhmZjAwMDBcbiAqICAgfSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgU3RhdGVNb2R1bGUge1xuICBzdGF0aWMgYWN0aW9uR2VuZXJhdGUoaXNFcXVhbCkge1xuICAgIHJldHVybiAoc3RhdGUgPSBbe30sICcnXSwge2tleSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChpc0VxdWFsKHN0YXRlWzBdW2tleV0sIGRhdGEpKSByZXR1cm4gc3RhdGU7XG5cbiAgICAgIHN0YXRlWzBdW2tleV0gPSBkYXRhO1xuICAgICAgc3RhdGVbMV0gPSBrZXk7XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoZXF1YWxDaGVjayA9IGlzRXF1YWxEZWZhdWx0KSB7XG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgICAgU3RhdGVNb2R1bGUuYWN0aW9uR2VuZXJhdGUoZXF1YWxDaGVjaylcbiAgICApO1xuXG4gICAgdGhpcy5jb25maWd1cmF0aW9uID0ge307XG4gICAgdGhpcy5jdXJyZW50Q29uZmlnID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMucHJldkNvbmZpZyA9ICdkZWZhdWx0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmF1bHRcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbmZpZ3VyYXRpb24gc2V0dXBcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZVxuICAgKiBuZXcgV0hTLlN0YXRlTW9kdWxlKCkuZGVmYXVsdCh7XG4gICAqICAgc3BoZXJlQ29sb3I6IFVUSUxTLiRjb2xvcnMubWVzaCxcbiAgICogICBwbGFuZUNvbG9yOiAweDQ0N0Y4QlxuICAgKiB9KVxuICAgKi9cbiAgZGVmYXVsdChkYXRhKSB7XG4gICAgdGhpcy5jb25maWcoe2RlZmF1bHQ6IGRhdGF9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldEVxdWFsQ2hlY2tcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgYW4gZXF1YWxDaGVjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHNldHVwXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIHNldEVxdWFsQ2hlY2soZnVuYykge1xuICAgIHRoaXMuc3RvcmUucmVwbGFjZVJlZHVjZXIoXG4gICAgICBTdGF0ZU1vZHVsZS5hY3Rpb25HZW5lcmF0ZShmdW5jKVxuICAgICk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnc3RhdGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvbmZpZ1xuICAgKiBAZGVzY3JpcHRpb24gTG9hZCBjb25maWd1cmF0aW9ucyBmcm9tIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ3MgQ29uZmlndXJhdGlvbiBkYXRhXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IEFkZGluZyBgZ3JlZW5gIGNvbmZpZ3VyYXRpb248L2NhcHRpb24+XG4gICAqIHN0YXRlLmNvbmZpZyh7XG4gICAqICAgZ3JlZW46IHtcbiAgICogICAgIHNwaGVyZUNvbG9yOiAweDAwZmYwMCxcbiAgICogICAgIHBsYW5lQ29sb3I6IDB4MDBmZjAwXG4gICAqICAgfVxuICAgKiB9KTtcbiAgICovXG4gIGNvbmZpZyhjb25maWdzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlncykge1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25ba2V5XSA9IGtleSA9PT0gJ2RlZmF1bHQnXG4gICAgICAgICAgPyBjb25maWdzW2tleV1cbiAgICAgICAgICA6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlndXJhdGlvbi5kZWZhdWx0LCBjb25maWdzW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gTG9hZCB1cGRhdGVzIGZyb20gb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gdXBkYXRlcyBVcGRhdGVzIGRhdGFcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj4gVXBkYXRlIGNhbGxiYWNrIGZvciBgc3BoZXJlQ29sb3JgPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS51cGRhdGUoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiBjb2xvciA9PiBzcGhlcmUubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KGNvbG9yKVxuICAgKiB9KTtcbiAgICovXG4gIHVwZGF0ZSh1cGRhdGVzID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBbZGF0YSwgY2hhbmdlZEtleV0gPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHVwZGF0ZXNbY2hhbmdlZEtleV07XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YVtjaGFuZ2VkS2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB0b1xuICAgKiBAZGVzY3JpcHRpb24gU3dpdGNoIHRvIGNvbmZpZ3VyYXRpb24uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWdOYW1lIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ2hhbmdlcyBjb25maWd1cmF0aW9uIHRvIGBncmVlbmA8L2NhcHRpb24+XG4gICAqIHN0YXRlLnRvKCdncmVlbicpO1xuICAgKi9cbiAgdG8oY29uZmlnTmFtZSkge1xuICAgIHRoaXMucHJldkNvbmZpZyA9IHRoaXMuY3VycmVudENvbmZpZztcbiAgICB0aGlzLmN1cnJlbnRDb25maWcgPSBjb25maWdOYW1lO1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdXG4gICAgICA/IHRoaXMuY29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgOiB0aGlzLmNvbmZpZ3VyYXRpb24uZGVmYXVsdDtcblxuICAgIHRoaXMuc2V0KGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQGRlc2NyaXB0aW9uIFNldCBjdXJyZW50IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbmZpZ3VyYXRpb24gcGFyYW1ldGVycy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZVxuICAgKiBzdGF0ZS5zZXQoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiAweDAwZmYwMFxuICAgKiB9KTtcbiAgICovXG4gIHNldChkYXRhKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSlcbiAgICAgIGlmIChrZXkpIHRoaXMuc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdBREQnLCBrZXksIGRhdGE6IGRhdGFba2V5XX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gZGF0YSBvZiBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogc3RhdGUuZ2V0KCdzcGhlcmVDb2xvcicpOyAvLyAweDAwZmYwMFxuICAgKi9cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHByZXZcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiBgdHJ1ZVZhbGAgaWYgYGNvbmZpZ2AgbWF0Y2ggcHJldmlvdXMgY29uZmlndXJhdGlvbiwgaW4gb3RoZXIgY2FzZSAtIHJldHVybiBgZmFsc2VWYWxgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQHBhcmFtIHtBbnl9IHRydWVWYWwgVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIHRydXRoeS5cbiAgICogQHBhcmFtIHtBbnl9IGZhbHNlVmFsIENWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgZmFsc3kuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIHByZXYoY29uZmlnLCB0cnVlVmFsLCBmYWxzZVZhbCkge1xuICAgIHJldHVybiB0aGlzLnByZXZDb25maWcgPT09IGNvbmZpZyA/IHRydWVWYWwgOiBmYWxzZVZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGN1cnJlbnRcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiBgdHJ1ZVZhbGAgaWYgYGNvbmZpZ2AgbWF0Y2ggY3VycmVudCBjb25maWd1cmF0aW9uLCBpbiBvdGhlciBjYXNlIC0gcmV0dXJuIGBmYWxzZVZhbGAuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge0FueX0gdHJ1ZVZhbCBWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgdHJ1dGh5LlxuICAgKiBAcGFyYW0ge0FueX0gZmFsc2VWYWwgQ1ZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyBmYWxzeS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgY3VycmVudChjb25maWcsIHRydWVWYWwsIGZhbHNlVmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENvbmZpZyA9PT0gY29uZmlnID8gdHJ1ZVZhbCA6IGZhbHNlVmFsO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBNT1VTRSxcbiAgUXVhdGVybmlvbixcbiAgU3BoZXJpY2FsLFxuICBWZWN0b3IyLFxuICBQZXJzcGVjdGl2ZUNhbWVyYSxcbiAgT3J0aG9ncmFwaGljQ2FtZXJhLFxuICBFdmVudERpc3BhdGNoZXIsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG4vLyBUaGlzIHNldCBvZiBjb250cm9scyBwZXJmb3JtcyBvcmJpdGluZywgZG9sbHlpbmcgKHpvb21pbmcpLCBhbmQgcGFubmluZy5cbi8vIFVubGlrZSBUcmFja2JhbGxDb250cm9scywgaXQgbWFpbnRhaW5zIHRoZSBcInVwXCIgZGlyZWN0aW9uIG9iamVjdC51cCAoK1kgYnkgZGVmYXVsdCkuXG4vL1xuLy8gICAgT3JiaXQgLSBsZWZ0IG1vdXNlIC8gdG91Y2g6IG9uZSBmaW5nZXIgbW92ZVxuLy8gICAgWm9vbSAtIG1pZGRsZSBtb3VzZSwgb3IgbW91c2V3aGVlbCAvIHRvdWNoOiB0d28gZmluZ2VyIHNwcmVhZCBvciBzcXVpc2hcbi8vICAgIFBhbiAtIHJpZ2h0IG1vdXNlLCBvciBhcnJvdyBrZXlzIC8gdG91Y2g6IHRocmVlIGZpbnRlciBzd2lwZVxuXG5leHBvcnQgY2xhc3MgVGhyZWVPcmJpdENvbnRyb2xzIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3Iob2JqZWN0LCBkb21FbGVtZW50LCBldmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSAoZG9tRWxlbWVudCA9PT0gdW5kZWZpbmVkKSA/IGRvY3VtZW50IDogZG9tRWxlbWVudDtcbiAgICB0aGlzLmV2ZW50SGFuZGxlciA9IGV2ZW50SGFuZGxlcjtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAvLyBcInRhcmdldFwiIHNldHMgdGhlIGxvY2F0aW9uIG9mIGZvY3VzLCB3aGVyZSB0aGUgb2JqZWN0IG9yYml0cyBhcm91bmRcbiAgICB0aGlzLnRhcmdldCA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gZG9sbHkgaW4gYW5kIG91dCAoIFBlcnNwZWN0aXZlQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMubWF4RGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiB6b29tIGluIGFuZCBvdXQgKCBPcnRob2dyYXBoaWNDYW1lcmEgb25seSApXG4gICAgdGhpcy5taW5ab29tID0gMDtcbiAgICB0aGlzLm1heFpvb20gPSBJbmZpbml0eTtcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBvcmJpdCB2ZXJ0aWNhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuICAgIC8vIFJhbmdlIGlzIDAgdG8gTWF0aC5QSSByYWRpYW5zLlxuICAgIHRoaXMubWluUG9sYXJBbmdsZSA9IDA7IC8vIHJhZGlhbnNcbiAgICB0aGlzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJOyAvLyByYWRpYW5zXG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgaG9yaXpvbnRhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuICAgIC8vIElmIHNldCwgbXVzdCBiZSBhIHN1Yi1pbnRlcnZhbCBvZiB0aGUgaW50ZXJ2YWwgWyAtIE1hdGguUEksIE1hdGguUEkgXS5cbiAgICB0aGlzLm1pbkF6aW11dGhBbmdsZSA9IC1JbmZpbml0eTsgLy8gcmFkaWFuc1xuICAgIHRoaXMubWF4QXppbXV0aEFuZ2xlID0gSW5maW5pdHk7IC8vIHJhZGlhbnNcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGVuYWJsZSBkYW1waW5nIChpbmVydGlhKVxuICAgIC8vIElmIGRhbXBpbmcgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG4gICAgdGhpcy5lbmFibGVEYW1waW5nID0gZmFsc2U7XG4gICAgdGhpcy5kYW1waW5nRmFjdG9yID0gMC4yNTtcblxuICAgIC8vIFRoaXMgb3B0aW9uIGFjdHVhbGx5IGVuYWJsZXMgZG9sbHlpbmcgaW4gYW5kIG91dDsgbGVmdCBhcyBcInpvb21cIiBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgem9vbWluZ1xuICAgIHRoaXMuZW5hYmxlWm9vbSA9IHRydWU7XG4gICAgdGhpcy56b29tU3BlZWQgPSAxLjA7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSByb3RhdGluZ1xuICAgIHRoaXMuZW5hYmxlUm90YXRlID0gdHJ1ZTtcbiAgICB0aGlzLnJvdGF0ZVNwZWVkID0gMS4wO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcGFubmluZ1xuICAgIHRoaXMuZW5hYmxlUGFuID0gdHJ1ZTtcbiAgICB0aGlzLmtleVBhblNwZWVkID0gNy4wOyAvLyBwaXhlbHMgbW92ZWQgcGVyIGFycm93IGtleSBwdXNoXG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBhdXRvbWF0aWNhbGx5IHJvdGF0ZSBhcm91bmQgdGhlIHRhcmdldFxuICAgIC8vIElmIGF1dG8tcm90YXRlIGlzIGVuYWJsZWQsIHlvdSBtdXN0IGNhbGwgY29udHJvbHMudXBkYXRlKCkgaW4geW91ciBhbmltYXRpb24gbG9vcFxuICAgIHRoaXMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuYXV0b1JvdGF0ZVNwZWVkID0gMi4wOyAvLyAzMCBzZWNvbmRzIHBlciByb3VuZCB3aGVuIGZwcyBpcyA2MFxuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdXNlIG9mIHRoZSBrZXlzXG4gICAgdGhpcy5lbmFibGVLZXlzID0gdHJ1ZTtcblxuICAgIC8vIFRoZSBmb3VyIGFycm93IGtleXNcbiAgICB0aGlzLmtleXMgPSB7TEVGVDogMzcsIFVQOiAzOCwgUklHSFQ6IDM5LCBCT1RUT006IDQwfTtcblxuICAgIC8vIE1vdXNlIGJ1dHRvbnNcbiAgICB0aGlzLm1vdXNlQnV0dG9ucyA9IHtPUkJJVDogTU9VU0UuTEVGVCwgWk9PTTogTU9VU0UuTUlERExFLCBQQU46IE1PVVNFLlJJR0hUfTtcblxuICAgIC8vIGZvciByZXNldFxuICAgIHRoaXMudGFyZ2V0MCA9IHRoaXMudGFyZ2V0LmNsb25lKCk7XG4gICAgdGhpcy5wb3NpdGlvbjAgPSB0aGlzLm9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuICAgIHRoaXMuem9vbTAgPSB0aGlzLm9iamVjdC56b29tO1xuXG4gICAgLy9cbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vXG5cbiAgICB0aGlzLmdldFBvbGFyQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gc3BoZXJpY2FsLnBoaTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBemltdXRoYWxBbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBzcGhlcmljYWwudGhldGE7XG4gICAgfTtcblxuICAgIHRoaXMucmVzZXQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRhcmdldC5jb3B5KHRoaXMudGFyZ2V0MCk7XG4gICAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5jb3B5KHRoaXMucG9zaXRpb24wKTtcbiAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSB0aGlzLnpvb20wO1xuXG4gICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIC8vIHRoaXMgbWV0aG9kIGlzIGV4cG9zZWQsIGJ1dCBwZXJoYXBzIGl0IHdvdWxkIGJlIGJldHRlciBpZiB3ZSBjYW4gbWFrZSBpdCBwcml2YXRlLi4uXG4gICAgdGhpcy51cGRhdGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICAvLyBzbyBjYW1lcmEudXAgaXMgdGhlIG9yYml0IGF4aXNcbiAgICAgIGNvbnN0IHF1YXQgPSBuZXcgUXVhdGVybmlvbigpLnNldEZyb21Vbml0VmVjdG9ycyhvYmplY3QudXAsIG5ldyBWZWN0b3IzKDAsIDEsIDApKTtcbiAgICAgIGNvbnN0IHF1YXRJbnZlcnNlID0gcXVhdC5jbG9uZSgpLmludmVyc2UoKTtcblxuICAgICAgY29uc3QgbGFzdFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcbiAgICAgIGNvbnN0IGxhc3RRdWF0ZXJuaW9uID0gbmV3IFF1YXRlcm5pb24oKTtcblxuICAgICAgcmV0dXJuICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XG5cbiAgICAgICAgb2Zmc2V0LmNvcHkocG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgLy8gcm90YXRlIG9mZnNldCB0byBcInktYXhpcy1pcy11cFwiIHNwYWNlXG4gICAgICAgIG9mZnNldC5hcHBseVF1YXRlcm5pb24ocXVhdCk7XG5cbiAgICAgICAgLy8gYW5nbGUgZnJvbSB6LWF4aXMgYXJvdW5kIHktYXhpc1xuICAgICAgICBzcGhlcmljYWwuc2V0RnJvbVZlY3RvcjMob2Zmc2V0KTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvUm90YXRlICYmIHN0YXRlID09PSBTVEFURS5OT05FKVxuICAgICAgICAgIHJvdGF0ZUxlZnQoZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSk7XG5cbiAgICAgICAgc3BoZXJpY2FsLnRoZXRhICs9IHNwaGVyaWNhbERlbHRhLnRoZXRhO1xuICAgICAgICBzcGhlcmljYWwucGhpICs9IHNwaGVyaWNhbERlbHRhLnBoaTtcblxuICAgICAgICAvLyByZXN0cmljdCB0aGV0YSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC50aGV0YSA9IE1hdGgubWF4KHRoaXMubWluQXppbXV0aEFuZ2xlLCBNYXRoLm1pbih0aGlzLm1heEF6aW11dGhBbmdsZSwgc3BoZXJpY2FsLnRoZXRhKSk7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgcGhpIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnBoaSA9IE1hdGgubWF4KHRoaXMubWluUG9sYXJBbmdsZSwgTWF0aC5taW4odGhpcy5tYXhQb2xhckFuZ2xlLCBzcGhlcmljYWwucGhpKSk7XG5cbiAgICAgICAgc3BoZXJpY2FsLm1ha2VTYWZlKCk7XG5cbiAgICAgICAgc3BoZXJpY2FsLnJhZGl1cyAqPSBzY2FsZTtcblxuICAgICAgICAvLyByZXN0cmljdCByYWRpdXMgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwucmFkaXVzID0gTWF0aC5tYXgodGhpcy5taW5EaXN0YW5jZSwgTWF0aC5taW4odGhpcy5tYXhEaXN0YW5jZSwgc3BoZXJpY2FsLnJhZGl1cykpO1xuXG4gICAgICAgIC8vIG1vdmUgdGFyZ2V0IHRvIHBhbm5lZCBsb2NhdGlvblxuICAgICAgICB0aGlzLnRhcmdldC5hZGQocGFuT2Zmc2V0KTtcblxuICAgICAgICBvZmZzZXQuc2V0RnJvbVNwaGVyaWNhbChzcGhlcmljYWwpO1xuXG4gICAgICAgIC8vIHJvdGF0ZSBvZmZzZXQgYmFjayB0byBcImNhbWVyYS11cC12ZWN0b3ItaXMtdXBcIiBzcGFjZVxuICAgICAgICBvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKHF1YXRJbnZlcnNlKTtcblxuICAgICAgICBwb3NpdGlvbi5jb3B5KHRoaXMudGFyZ2V0KS5hZGQob2Zmc2V0KTtcblxuICAgICAgICB0aGlzLm9iamVjdC5sb29rQXQodGhpcy50YXJnZXQpO1xuXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZURhbXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS50aGV0YSAqPSAoMSAtIHRoaXMuZGFtcGluZ0ZhY3Rvcik7XG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEucGhpICo9ICgxIC0gdGhpcy5kYW1waW5nRmFjdG9yKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEuc2V0KDAsIDAsIDApO1xuXG4gICAgICAgIHNjYWxlID0gMTtcbiAgICAgICAgcGFuT2Zmc2V0LnNldCgwLCAwLCAwKTtcblxuICAgICAgICAvLyB1cGRhdGUgY29uZGl0aW9uIGlzOlxuICAgICAgICAvLyBtaW4oY2FtZXJhIGRpc3BsYWNlbWVudCwgY2FtZXJhIHJvdGF0aW9uIGluIHJhZGlhbnMpXjIgPiBFUFNcbiAgICAgICAgLy8gdXNpbmcgc21hbGwtYW5nbGUgYXBwcm94aW1hdGlvbiBjb3MoeC8yKSA9IDEgLSB4XjIgLyA4XG5cbiAgICAgICAgaWYgKHpvb21DaGFuZ2VkXG4gICAgICAgICAgfHwgbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKHRoaXMub2JqZWN0LnBvc2l0aW9uKSA+IEVQU1xuICAgICAgICAgIHx8IDggKiAoMSAtIGxhc3RRdWF0ZXJuaW9uLmRvdCh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKSkgPiBFUFMpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG4gICAgICAgICAgbGFzdFBvc2l0aW9uLmNvcHkodGhpcy5vYmplY3QucG9zaXRpb24pO1xuICAgICAgICAgIGxhc3RRdWF0ZXJuaW9uLmNvcHkodGhpcy5vYmplY3QucXVhdGVybmlvbik7XG4gICAgICAgICAgem9vbUNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwb3NlID0gKCkgPT4ge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlKTtcblxuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuXG4gICAgICAvLyB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Rpc3Bvc2UnIH0gKTsgLy8gc2hvdWxkIHRoaXMgYmUgYWRkZWQgaGVyZT9cbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBpbnRlcm5hbHNcbiAgICAvL1xuXG4gICAgY29uc3QgY2hhbmdlRXZlbnQgPSB7dHlwZTogJ2NoYW5nZSd9O1xuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSB7dHlwZTogJ3N0YXJ0J307XG4gICAgY29uc3QgZW5kRXZlbnQgPSB7dHlwZTogJ2VuZCd9O1xuXG4gICAgY29uc3QgU1RBVEUgPSB7Tk9ORTogLTEsIFJPVEFURTogMCwgRE9MTFk6IDEsIFBBTjogMiwgVE9VQ0hfUk9UQVRFOiAzLCBUT1VDSF9ET0xMWTogNCwgVE9VQ0hfUEFOOiA1fTtcblxuICAgIGxldCBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICBjb25zdCBFUFMgPSAwLjAwMDAwMTtcblxuICAgIC8vIGN1cnJlbnQgcG9zaXRpb24gaW4gc3BoZXJpY2FsIGNvb3JkaW5hdGVzXG4gICAgY29uc3Qgc3BoZXJpY2FsID0gbmV3IFNwaGVyaWNhbCgpO1xuICAgIGNvbnN0IHNwaGVyaWNhbERlbHRhID0gbmV3IFNwaGVyaWNhbCgpO1xuXG4gICAgbGV0IHNjYWxlID0gMTtcbiAgICBjb25zdCBwYW5PZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuICAgIGxldCB6b29tQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgcm90YXRlU3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZUVuZCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3Qgcm90YXRlRGVsdGEgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgY29uc3QgcGFuU3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbkVuZCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgcGFuRGVsdGEgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgY29uc3QgZG9sbHlTdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RGVsdGEgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgY29uc3QgZ2V0QXV0b1JvdGF0aW9uQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gMiAqIE1hdGguUEkgLyA2MCAvIDYwICogdGhpcy5hdXRvUm90YXRlU3BlZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFpvb21TY2FsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBNYXRoLnBvdygwLjk1LCB0aGlzLnpvb21TcGVlZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJvdGF0ZUxlZnQgPSBhbmdsZSA9PiB7XG4gICAgICBzcGhlcmljYWxEZWx0YS50aGV0YSAtPSBhbmdsZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgcm90YXRlVXAgPSBhbmdsZSA9PiB7XG4gICAgICBzcGhlcmljYWxEZWx0YS5waGkgLT0gYW5nbGU7XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbkxlZnQgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGlzdGFuY2UsIG9iamVjdE1hdHJpeCkgPT4ge1xuICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAwKTsgLy8gZ2V0IFggY29sdW1uIG9mIG9iamVjdE1hdHJpeFxuICAgICAgICB2Lm11bHRpcGx5U2NhbGFyKC1kaXN0YW5jZSk7XG4gICAgICAgIHBhbk9mZnNldC5hZGQodik7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBwYW5VcCA9ICgoKSA9PiB7XG4gICAgICBjb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkaXN0YW5jZSwgb2JqZWN0TWF0cml4KSA9PiB7XG4gICAgICAgIHYuc2V0RnJvbU1hdHJpeENvbHVtbihvYmplY3RNYXRyaXgsIDEpOyAvLyBnZXQgWSBjb2x1bW4gb2Ygb2JqZWN0TWF0cml4XG4gICAgICAgIHYubXVsdGlwbHlTY2FsYXIoZGlzdGFuY2UpO1xuICAgICAgICBwYW5PZmZzZXQuYWRkKHYpO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgLy8gZGVsdGFYIGFuZCBkZWx0YVkgYXJlIGluIHBpeGVsczsgcmlnaHQgYW5kIGRvd24gYXJlIHBvc2l0aXZlXG4gICAgY29uc3QgcGFuID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGVsdGFYLCBkZWx0YVkpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSkge1xuICAgICAgICAgIC8vIHBlcnNwZWN0aXZlXG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm9iamVjdC5wb3NpdGlvbjtcbiAgICAgICAgICBvZmZzZXQuY29weShwb3NpdGlvbikuc3ViKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICBsZXQgdGFyZ2V0RGlzdGFuY2UgPSBvZmZzZXQubGVuZ3RoKCk7XG5cbiAgICAgICAgICAvLyBoYWxmIG9mIHRoZSBmb3YgaXMgY2VudGVyIHRvIHRvcCBvZiBzY3JlZW5cbiAgICAgICAgICB0YXJnZXREaXN0YW5jZSAqPSBNYXRoLnRhbigodGhpcy5vYmplY3QuZm92IC8gMikgKiBNYXRoLlBJIC8gMTgwLjApO1xuXG4gICAgICAgICAgLy8gd2UgYWN0dWFsbHkgZG9uJ3QgdXNlIHNjcmVlbldpZHRoLCBzaW5jZSBwZXJzcGVjdGl2ZSBjYW1lcmEgaXMgZml4ZWQgdG8gc2NyZWVuIGhlaWdodFxuICAgICAgICAgIHBhbkxlZnQoMiAqIGRlbHRhWCAqIHRhcmdldERpc3RhbmNlIC8gZWxlbWVudC5jbGllbnRIZWlnaHQsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgICAgcGFuVXAoMiAqIGRlbHRhWSAqIHRhcmdldERpc3RhbmNlIC8gZWxlbWVudC5jbGllbnRIZWlnaHQsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgICAvLyBvcnRob2dyYXBoaWNcbiAgICAgICAgICBwYW5MZWZ0KGRlbHRhWCAqICh0aGlzLm9iamVjdC5yaWdodCAtIHRoaXMub2JqZWN0LmxlZnQpIC8gdGhpcy5vYmplY3Quem9vbSAvIGVsZW1lbnQuY2xpZW50V2lkdGgsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgICAgcGFuVXAoZGVsdGFZICogKHRoaXMub2JqZWN0LnRvcCAtIHRoaXMub2JqZWN0LmJvdHRvbSkgLyB0aGlzLm9iamVjdC56b29tIC8gZWxlbWVudC5jbGllbnRIZWlnaHQsIHRoaXMub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2FtZXJhIG5laXRoZXIgb3J0aG9ncmFwaGljIG5vciBwZXJzcGVjdGl2ZVxuICAgICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gcGFuIGRpc2FibGVkLicpO1xuICAgICAgICAgIHRoaXMuZW5hYmxlUGFuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGRvbGx5SW4gPSBkb2xseVNjYWxlID0+IHtcbiAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKVxuICAgICAgICBzY2FsZSAvPSBkb2xseVNjYWxlO1xuXG4gICAgICBlbHNlIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0NhbWVyYSkge1xuICAgICAgICB0aGlzLm9iamVjdC56b29tID0gTWF0aC5tYXgodGhpcy5taW5ab29tLCBNYXRoLm1pbih0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gKiBkb2xseVNjYWxlKSk7XG4gICAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgem9vbUNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzTW9kdWxlLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicpO1xuICAgICAgICB0aGlzLmVuYWJsZVpvb20gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZG9sbHlPdXQgPSBkb2xseVNjYWxlID0+IHtcbiAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKVxuICAgICAgICBzY2FsZSAqPSBkb2xseVNjYWxlO1xuXG4gICAgICBlbHNlIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0NhbWVyYSkge1xuICAgICAgICB0aGlzLm9iamVjdC56b29tID0gTWF0aC5tYXgodGhpcy5taW5ab29tLCBNYXRoLm1pbih0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gLyBkb2xseVNjYWxlKSk7XG4gICAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgem9vbUNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzTW9kdWxlLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicpO1xuICAgICAgICB0aGlzLmVuYWJsZVpvb20gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBldmVudCBjYWxsYmFja3MgLSB1cGRhdGUgdGhlIG9iamVjdCBzdGF0ZVxuICAgIC8vXG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd25Sb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93blJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlU3RhcnQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd25Eb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duRG9sbHknICk7XG5cbiAgICAgIGRvbGx5U3RhcnQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd25QYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93blBhbicgKTtcblxuICAgICAgcGFuU3RhcnQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmVSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlTW92ZVJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlRW5kLnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMocm90YXRlRW5kLCByb3RhdGVTdGFydCk7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcbiAgICAgIHJvdGF0ZUxlZnQoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcbiAgICAgIHJvdGF0ZVVwKDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkocm90YXRlRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlTW92ZURvbGx5JyApO1xuXG4gICAgICBkb2xseUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XG5cbiAgICAgIGlmIChkb2xseURlbHRhLnkgPiAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZWxzZSBpZiAoZG9sbHlEZWx0YS55IDwgMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBkb2xseVN0YXJ0LmNvcHkoZG9sbHlFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmVQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlTW92ZVBhbicgKTtcblxuICAgICAgcGFuRW5kLnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyhwYW5FbmQsIHBhblN0YXJ0KTtcblxuICAgICAgcGFuKHBhbkRlbHRhLngsIHBhbkRlbHRhLnkpO1xuXG4gICAgICBwYW5TdGFydC5jb3B5KHBhbkVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlVXAnICk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlV2hlZWwgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlV2hlZWwnICk7XG5cbiAgICAgIGlmIChldmVudC5kZWx0YVkgPCAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGV2ZW50LmRlbHRhWSA+IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVLZXlEb3duJyApO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSB0aGlzLmtleXMuVVA6XG4gICAgICAgICAgcGFuKDAsIHRoaXMua2V5UGFuU3BlZWQpO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuQk9UVE9NOlxuICAgICAgICAgIHBhbigwLCAtdGhpcy5rZXlQYW5TcGVlZCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5MRUZUOlxuICAgICAgICAgIHBhbih0aGlzLmtleVBhblNwZWVkLCAwKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLlJJR0hUOlxuICAgICAgICAgIHBhbigtdGhpcy5rZXlQYW5TcGVlZCwgMCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0Um90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0Um90YXRlJyApO1xuXG4gICAgICByb3RhdGVTdGFydC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnREb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydERvbGx5JyApO1xuXG4gICAgICBjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICBkb2xseVN0YXJ0LnNldCgwLCBkaXN0YW5jZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnRQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnRQYW4nICk7XG5cbiAgICAgIHBhblN0YXJ0LnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaE1vdmVSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZUVuZC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQpO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXG4gICAgICByb3RhdGVMZWZ0KDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgLy8gcm90YXRpbmcgdXAgYW5kIGRvd24gYWxvbmcgd2hvbGUgc2NyZWVuIGF0dGVtcHRzIHRvIGdvIDM2MCwgYnV0IGxpbWl0ZWQgdG8gMTgwXG4gICAgICByb3RhdGVVcCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICByb3RhdGVTdGFydC5jb3B5KHJvdGF0ZUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZURvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaE1vdmVEb2xseScgKTtcblxuICAgICAgY29uc3QgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgZG9sbHlFbmQuc2V0KDAsIGRpc3RhbmNlKTtcblxuICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKGRvbGx5RW5kLCBkb2xseVN0YXJ0KTtcblxuICAgICAgaWYgKGRvbGx5RGVsdGEueSA+IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZWxzZSBpZiAoZG9sbHlEZWx0YS55IDwgMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZVBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlUGFuJyApO1xuXG4gICAgICBwYW5FbmQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuXG4gICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKHBhbkVuZCwgcGFuU3RhcnQpO1xuXG4gICAgICBwYW4ocGFuRGVsdGEueCwgcGFuRGVsdGEueSk7XG5cbiAgICAgIHBhblN0YXJ0LmNvcHkocGFuRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hFbmQgPSAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoRW5kJyApO1xuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGV2ZW50IGhhbmRsZXJzIC0gRlNNOiBsaXN0ZW4gZm9yIGV2ZW50cyBhbmQgcmVzZXQgc3RhdGVcbiAgICAvL1xuXG4gICAgY29uc3Qgb25Nb3VzZURvd24gPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSB0aGlzLm1vdXNlQnV0dG9ucy5PUkJJVCkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duUm90YXRlKGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlJPVEFURTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuYnV0dG9uID09PSB0aGlzLm1vdXNlQnV0dG9ucy5aT09NKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duRG9sbHkoZXZlbnQpO1xuXG4gICAgICAgIHN0YXRlID0gU1RBVEUuRE9MTFk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuUEFOKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25QYW4oZXZlbnQpO1xuXG4gICAgICAgIHN0YXRlID0gU1RBVEUuUEFOO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLk5PTkUpIHtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gU1RBVEUuUk9UQVRFKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVSb3RhdGUoZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gU1RBVEUuRE9MTFkpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVEb2xseShldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBTVEFURS5QQU4pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZVBhbihldmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VVcCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZU1vdXNlVXAoZXZlbnQpO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VXaGVlbCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlIHx8IHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UgfHwgKHN0YXRlICE9PSBTVEFURS5OT05FICYmIHN0YXRlICE9PSBTVEFURS5ST1RBVEUpKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaGFuZGxlTW91c2VXaGVlbChldmVudCk7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTsgLy8gbm90IHN1cmUgd2h5IHRoZXNlIGFyZSBoZXJlLi4uXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvbktleURvd24gPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZUtleXMgPT09IGZhbHNlIHx8IHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVLZXlEb3duKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaFN0YXJ0ID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgc3dpdGNoIChldmVudC50b3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDE6IC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0Um90YXRlKGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOiAvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydERvbGx5KGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfRE9MTFk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6IC8vIHRocmVlLWZpbmdlcmVkIHRvdWNoOiBwYW5cblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnRQYW4oZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9QQU47XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuTk9ORSlcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoTW92ZSA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgc3dpdGNoIChldmVudC50b3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDE6IC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9ST1RBVEUpIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVSb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOiAvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfRE9MTFkpIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVEb2xseShldmVudCk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6IC8vIHRocmVlLWZpbmdlcmVkIHRvdWNoOiBwYW5cblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX1BBTikgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZVBhbihldmVudCk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hFbmQgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVUb3VjaEVuZChldmVudCk7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Db250ZXh0TWVudSA9IGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIC8vXG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51LCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignd2hlZWwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcblxuICAgIC8vIGZvcmNlIGFuIHVwZGF0ZSBhdCBzdGFydFxuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGdldCBjZW50ZXIoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuY2VudGVyIGhhcyBiZWVuIHJlbmFtZWQgdG8gLnRhcmdldCcpO1xuICAgIHJldHVybiB0aGlzLnRhcmdldDtcbiAgfVxuXG4gIGdldCBub1pvb20oKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9ab29tIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlWm9vbSBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVab29tO1xuICB9XG5cbiAgc2V0IG5vWm9vbSh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vWm9vbSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVpvb20gaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVpvb20gPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9Sb3RhdGUoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9Sb3RhdGUgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVSb3RhdGUgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlUm90YXRlO1xuICB9XG5cbiAgc2V0IG5vUm90YXRlKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9Sb3RhdGUgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVSb3RhdGUgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVJvdGF0ZSA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub1BhbigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1BhbiBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVBhbiBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVQYW47XG4gIH1cblxuICBzZXQgbm9QYW4odmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1BhbiBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVBhbiBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlUGFuID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vS2V5cygpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub0tleXMgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVLZXlzIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZUtleXM7XG4gIH1cblxuICBzZXQgbm9LZXlzKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9LZXlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlS2V5cyBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlS2V5cyA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBzdGF0aWNNb3ZpbmcoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuc3RhdGljTW92aW5nIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlRGFtcGluZyBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVEYW1waW5nO1xuICB9XG5cbiAgc2V0IHN0YXRpY01vdmluZyh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZURhbXBpbmcgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgZHluYW1pY0RhbXBpbmdGYWN0b3IoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuZHluYW1pY0RhbXBpbmdGYWN0b3IgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIC5kYW1waW5nRmFjdG9yIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuIHRoaXMuZGFtcGluZ0ZhY3RvcjtcbiAgfVxuXG4gIHNldCBkeW5hbWljRGFtcGluZ0ZhY3Rvcih2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmR5bmFtaWNEYW1waW5nRmFjdG9yIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSAuZGFtcGluZ0ZhY3RvciBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZGFtcGluZ0ZhY3RvciA9IHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q29udHJvbHNNb2R1bGV9IGZyb20gJy4uL0NvbnRyb2xzTW9kdWxlJztcblxuaW1wb3J0IHtUaHJlZU9yYml0Q29udHJvbHN9IGZyb20gJy4vbGliL1RocmVlT3JiaXRDb250cm9scyc7XG5cbmV4cG9ydCBjbGFzcyBPcmJpdENvbnRyb2xzTW9kdWxlIGV4dGVuZHMgQ29udHJvbHNNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcyk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZm9sbG93OiBmYWxzZSxcbiAgICAgIG9iamVjdDogbnVsbCxcbiAgICAgIHRhcmdldDogbmV3IFZlY3RvcjMoMCwgMCwgMClcbiAgICB9LCBwYXJhbXMpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgc3VwZXIubWFuYWdlcihtYW5hZ2VyKTtcblxuICAgIGNvbnN0IHtvYmplY3Q6IG9iaiwgZm9sbG93LCB0YXJnZXR9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3Qgb2JqZWN0ID0gb2JqID8gb2JqLm5hdGl2ZSA6IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmU7XG5cbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBUaHJlZU9yYml0Q29udHJvbHMoXG4gICAgICBvYmplY3QsXG4gICAgICBtYW5hZ2VyLmdldCgnZWxlbWVudCcpLFxuICAgICAgbWFuYWdlci5oYW5kbGVyXG4gICAgKTtcblxuICAgIGNvbnN0IHVwZGF0ZVByb2Nlc3NvciA9IGZvbGxvdyA/IGMgPT4ge1xuICAgICAgY29udHJvbHMudXBkYXRlKGMuZ2V0RGVsdGEoKSk7XG4gICAgICBjb250cm9scy50YXJnZXQuY29weSh0YXJnZXQpO1xuICAgIH0gOiBjID0+IHtcbiAgICAgIGNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldENvbnRyb2xzKGNvbnRyb2xzKTtcbiAgICB0aGlzLnNldFVwZGF0ZSh1cGRhdGVQcm9jZXNzb3IpO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICBpZiAob2JqKSByZXR1cm47XG4gICAgICAgIGNvbnRyb2xzLm9iamVjdCA9IGNhbWVyYS5uYXRpdmU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250cm9scy50YXJnZXQuY29weSh0YXJnZXQpO1xuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL2FwcC9jb250cm9scyAqL1xuZXhwb3J0ICogZnJvbSAnLi9PcmJpdENvbnRyb2xzTW9kdWxlJztcbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvYXBwICovXG5leHBvcnQgKiBmcm9tICcuL0VsZW1lbnRNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9SZW5kZXJpbmdNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9TY2VuZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1Jlc2l6ZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1Bvc3RQcm9jZXNzb3JNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9WaXJ0dWFsTW91c2VNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9FdmVudHNQYXRjaE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbnRyb2xzTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vRm9nTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdGVNb2R1bGUnO1xuXG4vLyBjb250cm9sc1xuZXhwb3J0ICogZnJvbSAnLi9jb250cm9scy9pbmRleCc7XG4iLCIvKipcbiAqIEBjbGFzcyBEeW5hbWljR2VvbWV0cnlNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL21lc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXthdHRyaWJ1dGVzOiBmYWxzZX1dIC0gcGFyYW1zXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXRjaEV2ZW50cz10cnVlXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqL1xuZXhwb3J0IGNsYXNzIER5bmFtaWNHZW9tZXRyeU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlXG4gICAgfSwgcGFyYW1zKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc2VsZi5wYXJhbXM7XG5cbiAgICB0aGlzLmdfID0gZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XG4gICAgICBpZiAodGhpcy5idWlsZEdlb21ldHJ5KSB7XG4gICAgICAgIHRoaXMubmF0aXZlLmdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KFxuICAgICAgICAgIHRoaXMudXBkYXRlUGFyYW1zKHtnZW9tZXRyeTogcGFyYW1zfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBhcmFtcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnBhcmFtcy5nZW9tZXRyeSkge1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGBnXyR7a2V5fWAsIHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlLmdlb21ldHJ5LnBhcmFtZXRlcnNba2V5XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5uYXRpdmUuZ2VvbWV0cnkgPSB0aGlzLmJ1aWxkR2VvbWV0cnkodGhpcy51cGRhdGVQYXJhbXMoe2dlb21ldHJ5OiB7W2tleV06IHZhbHVlfX0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFJlcGVhdFdyYXBwaW5nLFxuICBVVk1hcHBpbmcsXG4gIE5lYXJlc3RGaWx0ZXIsXG4gIExpbmVhck1pcE1hcExpbmVhckZpbHRlcixcbiAgVGV4dHVyZUxvYWRlcixcbiAgVmVjdG9yMlxufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IGxvYWRlciA9IG5ldyBUZXh0dXJlTG9hZGVyKCk7XG5cbi8qKlxuICogQGNsYXNzIFRleHR1cmVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL21lc2hcbiAqIEBkZXNjcmlwdGlvbiBBIFRleHR1cmVNb2R1bGUgY2FuIGJlIGFwcGxpZWQgdG8gYW55IE1lc2ggb3IgTW9kZWwuXG4gKiBAcGFyYW0ge0FycmF5fSBbdGV4dHVyZXNdIC0gYXJyYXkgb2YgdGV4dHVyZSBvYmplY3RzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gaW5zdGFuY2UuIHVybCB0YWtlcyBhIHBhdGgsIG9yIGEgZGF0YSBvYmplY3QuPC9jYXB0aW9uPlxuICogdmFyIHdvb2RUZXh0dXJlID0gbmV3IFRleHR1cmVNb2R1bGUoe1xuICogICB1cmw6IGAke3Byb2Nlc3MuYXNzZXRzUGF0aH0vdGV4dHVyZXMvd29vZC5qcGdgXG4gKiB9KTtcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1vcmUgY29tcHJlaGVuc2l2ZSBleGFtcGxlLCB3b29kIHRleHR1cmUgYXBwbGllZCB0byBhIEJveC48L2NhcHRpb24+XG4gKiBuZXcgQm94KHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICB3aWR0aDogMixcbiAqICAgICBoZWlnaHQ6IDIsXG4gKiAgICAgZGVwdGg6IDJcbiAqICAgfSxcbiAqICAgbW9kdWxlczogW1xuICogICAgIG5ldyBUZXh0dXJlTW9kdWxlKHtcbiAqICAgICAgIHVybDogYHBhdGgvdG8vdGV4dHVyZS5qcGdgLFxuICogICAgICAgcmVwZWF0OiBuZXcgVEhSRUUuVmVjdG9yMigxLCAxKSAvLyBvcHRpb25hbFxuICogICAgIH0pXG4gKiAgIF0sXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFRleHR1cmVNb2R1bGUge1xuICBzdGF0aWMgbG9hZCh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFRleHR1cmVNb2R1bGUoe3VybH0pLnRleHR1cmVzWzBdWzFdO1xuICB9XG5cbiAgdGV4dHVyZXMgPSBbXTtcblxuICBjb25zdHJ1Y3RvciguLi50ZXh0dXJlcykge1xuICAgIHRleHR1cmVzLmZvckVhY2goKHtcbiAgICAgIHVybCxcbiAgICAgIHR5cGUgPSAnbWFwJyxcbiAgICAgIG9mZnNldCA9IG5ldyBWZWN0b3IyKDAsIDApLFxuICAgICAgcmVwZWF0ID0gbmV3IFZlY3RvcjIoMSwgMSksXG4gICAgICB3cmFwID0gUmVwZWF0V3JhcHBpbmcsXG4gICAgICBtYXBwaW5nID0gVVZNYXBwaW5nLFxuICAgICAgZml4ID0gdGV4ID0+IHRleFxuICAgIH0pID0+IHtcbiAgICAgIGNvbnN0IHRleHR1cmUgPSBsb2FkZXIubG9hZCh1cmwpO1xuXG4gICAgICBpZiAod3JhcC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRleHR1cmUud3JhcFMgPSB3cmFwWzBdO1xuICAgICAgICB0ZXh0dXJlLndyYXBUID0gd3JhcFsxXTtcbiAgICAgIH0gZWxzZVxuICAgICAgICB0ZXh0dXJlLndyYXBTID0gdGV4dHVyZS53cmFwVCA9IHdyYXA7XG5cbiAgICAgIHRleHR1cmUubWFwcGluZyA9IG1hcHBpbmc7XG5cbiAgICAgIHRleHR1cmUub2Zmc2V0LmNvcHkob2Zmc2V0KTtcbiAgICAgIHRleHR1cmUucmVwZWF0LmNvcHkocmVwZWF0KTtcblxuICAgICAgdGV4dHVyZS5tYWdGaWx0ZXIgPSBOZWFyZXN0RmlsdGVyO1xuICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSBMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXI7XG5cbiAgICAgIHRoaXMudGV4dHVyZXMucHVzaChbdHlwZSwgZml4KHRleHR1cmUpXSk7XG4gICAgfSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWF0ZXJpYWwobWF0ZXJpYWwsIHNlbGYpIHtcbiAgICAgIHNlbGYudGV4dHVyZXMuZm9yRWFjaCh0ZXh0dXJlID0+IHtcbiAgICAgICAgbWF0ZXJpYWxbdGV4dHVyZVswXV0gPSB0ZXh0dXJlWzFdO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFuaW1hdGlvbk1peGVyLFxuICBBbmltYXRpb25DbGlwLFxuICBDbG9ja1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuLyoqXG4gKiBAY2xhc3MgQW5pbWF0aW9uTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAZGVzY3JpcHRpb24gQ29udmVuaWVuY2UgbW9kdWxlIHRoYXQgd3JhcHMgdGhlIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jbWFudWFsL2ludHJvZHVjdGlvbi9BbmltYXRpb24tc3lzdGVtJz50aHJlZS5qcyBhbmltYXRpb24gc3lzdGVtPC9hPlxuICogQHBhcmFtIHtBcHB9IGFwcCAtIHRoZSBhcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzRGVmZXJyZWQ9ZmFsc2VdIC0gc2V0IHRvIHRydWUgaWYgYW5pbWF0aW9uIHNob3VsZCBub3Qgc3RhcnQgYXV0b21hdGljYWxseVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e3NwZWVkOiAxfV0gLSB0aGUgcGFyYW1zXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFuaW1hdGlvbiBtb2R1bGUgYW5kIHBsYXkgYSBnaXZlbiBjbGlwIG9mIGFuIGltcG9ydGVkIG1vZGVsPC9jYXB0aW9uPlxuICogY29uc3QgYW5pbWF0aW9uTW9kdWxlID0gbmV3IEFuaW1hdGlvbk1vZHVsZShhcHAsIGZhbHNlLCB7XG4gKiAgIHNwZWVkOiAxLjIgLy8gc3BlZWQgdXAgYW5pbWF0aW9uIGJ5IDIwJVxuICogfSk7XG4gKlxuICogbmV3IEltcG9ydGVyKHtcbiAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAqICAgICAvLyBPdmVycmlkZSBwYXJzZSB0byBnZW5lcmF0ZSBhIHNraW5uZWRNZXNoLCBuZWVkZWQgZm9yIHNraW5uZWQgbW9kZWxzXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5Ta2lubmVkTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAqICAgfSxcbiAqXG4gKiAgIHVybDogYHBhdGgvdG8vbW9kZWwuanNvbmAsXG4gKiAgIHVzZUN1c3RvbU1hdGVyaWFsOiB0cnVlLFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gKiAgICAgc2tpbm5pbmc6IHRydWVcbiAqICAgfSksXG4gKlxuICogICBtb2R1bGVzOiBbYW5pbWF0aW9uTW9kdWxlXVxuICogfSkuYWRkVG8oYXBwKS50aGVuKCgpID0+IHtcbiAqICAgLy8gYWRkaW5nIG1vZGVsIHRvIGFwcCByZXR1cm5zIGEgcHJvbWlzZSwgc28gcGlwZSB0aGUgZnVuY3Rpb24gdG8ga2ljayBvZmYgdGhlIGFuaW1hdGlvbiBjbGlwXG4gKiAgIGFuaW1hdGlvbk1vZHVsZS5wbGF5KCdjbGlwTmFtZScpO1xuICogfSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihhcHAsIGlzRGVmZXJyZWQsIHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHNwZWVkOiAxXG4gICAgfSwgcGFyYW1zKTtcbiAgICB0aGlzLmNsb2NrID0gbmV3IENsb2NrKCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLmlzRGVmZXJyZWQgPSBpc0RlZmVycmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcGxheVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFBsYXlzIHRoZSBnaXZlbiBjbGlwIG5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsaXBOYW1lIC0gdGhlIGNsaXAgdG8gcGxheVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaC5BbmltYXRpb25Nb2R1bGVcbiAgICovXG4gIHBsYXkoY2xpcE5hbWUpIHtcbiAgICBjb25zdCBjbGlwID0gQW5pbWF0aW9uQ2xpcC5maW5kQnlOYW1lKHRoaXMuY2xpcHMsIGNsaXBOYW1lKTtcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLm1peGVyLmNsaXBBY3Rpb24oY2xpcCk7XG5cbiAgICBhY3Rpb24ucGxheSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIHRoZSBtaXhlciAoYmVpbmcgY2FsbGVkIG9uIGZyYW1lIGFuaW1hdGlvbiBsb29wKVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaC5BbmltYXRpb25Nb2R1bGVcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5taXhlcikgdGhpcy5taXhlci51cGRhdGUodGhpcy5jbG9jay5nZXREZWx0YSgpICogdGhpcy5wYXJhbXMuc3BlZWQpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLmxvb3AgPSBuZXcgTG9vcCgoKSA9PiB7XG4gICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzZWxmLmlzRGVmZXJyZWQpIHNlbGYubG9vcC5zdGFydChzZWxmLmFwcCk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnYW5pbWF0aW9uJyk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWVzaChtZXNoLCBzZWxmKSB7XG4gICAgICBtZXNoLmdlb21ldHJ5LnNrZWxldG9uID0gbWVzaC5za2VsZXRvbjtcblxuICAgICAgc2VsZi5taXhlciA9IG5ldyBBbmltYXRpb25NaXhlcihtZXNoLmdlb21ldHJ5KTtcbiAgICAgIHNlbGYuY2xpcHMgPSBtZXNoLmdlb21ldHJ5LmFuaW1hdGlvbnM7XG5cbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9tZXNoICovXG5leHBvcnQgKiBmcm9tICcuL0R5bmFtaWNHZW9tZXRyeU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1RleHR1cmVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9BbmltYXRpb25Nb2R1bGUnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRGVmaW5lTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlc1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIERlZmluZU1vZHVsZSB3aXRoIFBlcnNwZWN0aXZlQ2FtZXJhIGFzIGNhbWVyYSBtb2R1bGUgYW5kIHBhc3NpbmcgaXQgdG8gQXBwJ3MgbW9kdWxlczwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICAvLyAuLi5cbiAqICAgbmV3IERlZmluZU1vZHVsZSgnY2FtZXJhJywgbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCkpXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmluZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCh0aGlzLm5hbWUsIHRoaXMuZGF0YSk7XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMgKi9cblxuZXhwb3J0ICogZnJvbSAnLi9hcHAvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9tZXNoL2luZGV4JztcblxuLy8gbW9kdWxlc1xuZXhwb3J0ICogZnJvbSAnLi9EZWZpbmVNb2R1bGUnO1xuIiwiaW1wb3J0IHtJbXBvcnRlcn0gZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlcic7XG5pbXBvcnQge1BlcnNwZWN0aXZlQ2FtZXJhfSBmcm9tICcuL2NvbXBvbmVudHMvY2FtZXJhcy9QZXJzcGVjdGl2ZUNhbWVyYSc7XG5cbmV4cG9ydCBjbGFzcyBNb2RlbCBleHRlbmRzIEltcG9ydGVyIHtcbiAgY29uc3RydWN0b3IocGFyYW1zLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgY29uc29sZS53YXJuKCdNb2RlbCBpcyBkZXByZWNhdGVkLiBVc2UgSW1wb3J0ZXIgaW5zdGVhZC4nKTtcblxuICAgIGlmIChwYXJhbXMuZ2VvbWV0cnkpIHtcbiAgICAgIHBhcmFtcy51cmwgPSBwYXJhbXMuZ2VvbWV0cnkucGF0aDtcbiAgICAgIHBhcmFtcy5sb2FkZXIgPSBwYXJhbXMuZ2VvbWV0cnkubG9hZGVyO1xuICAgIH1cblxuICAgIHN1cGVyKHBhcmFtcywgLi4uYWRkaXRpb25hbCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbWVyYU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc29sZS53YXJuKCdDYW1lcmFNb2R1bGUgaXMgZGVwcmVjYXRlZC4gVXNlIERlZmluZU1vZHVsZSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHRoaXMuYWRkKHNlbGYuY2FtZXJhKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdjYW1lcmEnLCB0aGlzLmNhbWVyYSk7XG4gIH1cbn1cbiIsIi8qKlxuICogTmFtZXNwYWNlIGNvbnRhaW5pbmcgYWxsIGNsYXNzZXMgZnJvbSBhbGwgbW9kdWxlcy4gVXNlZCBhcyBnbG9iYWwgaW4gVU1EIHBhdHRlcm4uXG4gKiBAbmFtZXNwYWNlIFdIU1xuICogQGV4YW1wbGUgPGNhcHRpb24+VGhlIHVzZSBvZiBXSFMgbmFtZXNwYWNlLjwvY2FwdGlvbj5cbiAqIG5ldyBXSFMuQXBwKCkgLy8gY29yZVxuICogbmV3IFdIUy5QZXJzcGVjdGl2ZUNhbWVyYSgpIC8vIGNvbXBvbmVudHNcbiAqIG5ldyBXSFMuUmVzaXplTW9kdWxlKCkgLy8gbW9kdWxlc1xuICogV0hTLmV4dGVuZCgpIC8vIHV0aWxzXG4gKi9cblxuXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2xpZ2h0cy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2luZGV4JztcblxuLy8gREVQUkVDQVRJT05cbmV4cG9ydCAqIGZyb20gJy4vZGVwcmVjYXRpb24nO1xuIl0sIm5hbWVzIjpbImV4dGVuZCIsIm9iamVjdCIsImV4dGVuc2lvbnMiLCJleHRlbnNpb24iLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwicHJvcCIsInVuZGVmaW5lZCIsInRvU3RyaW5nIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJzbGljZSIsImluc3RydWN0IiwiYXJyYXkiLCJpbnN0QXJyYXkiLCJ0ZW1wT2JqZWN0IiwiaSIsIm1heCIsImxlbmd0aCIsImd1aWRlIiwidHJhbnNmb3JtRGF0YSIsImluc3RydWN0aW9ucyIsImtleSIsInRvQXJyYXkiLCJpbnN0cnVjdGlvbiIsInRlbXBBcnJheSIsIkNvbXBvc2l0aW9uRXJyb3IiLCJjbGFzc0luc3RhbmNlIiwibWVzc2FnZSIsImNvbXBvbmVudCIsInN0YWNrQXJyYXkiLCJzdGFjayIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiIsImNvbnNvbGUiLCJlcnJvciIsIm5hbWUiLCJFcnJvciIsIkRlcGVuZGVuY3lFcnJvciIsImFjdGl2ZU1vZHVsZSIsImRlcGVuZGVuY3lNb2R1bGUiLCJNYW5hZ2VyRXJyb3IiLCJ3YXJuRGVwcyIsIlJFVklTSU9OIiwiZXJyIiwiTW9kdWxlU3lzdGVtIiwic291cmNlIiwibW9kdWxlcyIsImFwcGx5TW9kdWxlIiwiYXBwbHlCcmlkZ2UiLCJvbkNvcHkiLCJicmlkZ2VNYXAiLCJtb2R1bGUiLCJicmlkZ2UiLCJhcHBseSIsInB1c2giLCJtYW5hZ2VyIiwiYWN0aXZlIiwiaW50ZWdyYXRlIiwiYmluZCIsImRpc3Bvc2VNb2R1bGUiLCJpbmRleE9mIiwiZGlzcG9zZSIsIkV2ZW50cyIsIlN5bWJvbCIsIm9iamVjdFByb3RvIiwiaGFzT3duUHJvcGVydHkiLCJzeW1Ub1N0cmluZ1RhZyIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwicm9vdCIsInBvbnlmaWxsIiwiJCRvYnNlcnZhYmxlIiwiTW9kdWxlTWFuYWdlciIsImhhbmRsZXIiLCJjdXJyZW50TW9kdWxlIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsInN0YXRlIiwiYWN0aW9uIiwiZGF0YSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJCb29sZWFuIiwiZGVwc01hcCIsInN1YnNjcmliZSIsImNoYW5nZWRLZXkiLCJjYWxsYmFjayIsIndhcm4iLCJzZXQiLCJtb2R1bGVFeGVjdXRvciIsInVzZSIsIkNvbXBvbmVudCIsInBhcmFtcyIsImRlZmF1bHRzIiwiX3dhaXQiLCJjaGlsZHJlbiIsImludGVncmF0ZU1vZHVsZXMiLCJwcm9taXNlIiwiUHJvbWlzZSIsImFsbCIsImZ1bmMiLCJpc0RlZmZlcmVkIiwid2FpdCIsInRoZW4iLCJjb3B5IiwiY3VzdG9taXplIiwibmF0aXZlIiwiY2xvbmUiLCJwYXJlbnQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGVmZXIiLCJhZGRQcm9taXNlIiwib25BZGQiLCJyZXNvbHZlciIsImFkZCIsInJlbW92ZSIsIl9tYW5hZ2VyIiwiX25hdGl2ZSIsIm1lc2giLCJhdHRyaWJ1dGVzIiwibWFwcGVycyIsInRhcmdldCIsIm1hcHBlciIsImsiLCJtYXAiLCJhdHRyaWJ1dGUiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldHRlciIsInNldHRlciIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ2YWx1ZSIsIm1pcnJvciIsIk1lc2hDb21wb25lbnQiLCJnZW9tIiwiTWVzaCIsIm1hdGVyaWFsIiwiZ2VvbWV0cnkiLCJjdXN0b20iLCJidWlsZCIsIndyYXAiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJzaGFkb3ciLCJ4IiwieSIsInoiLCJjYXN0U2hhZG93IiwiY2FzdCIsInJlY2VpdmVTaGFkb3ciLCJyZWNlaXZlIiwib25XcmFwIiwicXVhdGVybmlvbiIsImRlc3QiLCJMaWdodENvbXBvbmVudCIsIm1hcFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJpYXMiLCJyYWRpdXMiLCJzaGFkb3dDYW1lcmEiLCJjYW1lcmEiLCJuZWFyIiwiZmFyIiwiZm92IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiQ2FtZXJhQ29tcG9uZW50Iiwic3lzdGVtIiwid2luZG93IiwiZ2xvYmFsIiwicGVyZm9ybWFuY2UiLCJwcmVzZW50IiwiQXBwIiwibG9nIiwidmVyc2lvbiIsInNpbXVsYXRlIiwidXBkYXRlRW5hYmxlZCIsImxvb3BzIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFRpbWVvdXQiLCJwcm9jZXNzIiwibGwiLCJlIiwiZW5hYmxlZCIsImV4ZWN1dGUiLCJjbG9jayIsImxvb3AiLCJpbmRleCIsImdldCIsIkxvb3AiLCJ1c2VDbG9jayIsIkNsb2NrIiwid29ybGQiLCJhZGRMb29wIiwic3RhcnQiLCJzdG9wIiwicmVtb3ZlTG9vcCIsIkFtYmllbnRMaWdodCIsImxpZ2h0IiwiQW1iaWVudExpZ2h0TmF0aXZlIiwiY29sb3IiLCJpbnRlbnNpdHkiLCJEaXJlY3Rpb25hbExpZ2h0Iiwid3JhcFNoYWRvdyIsIkRpcmVjdGlvbmFsTGlnaHROYXRpdmUiLCJIZW1pc3BoZXJlTGlnaHQiLCJIZW1pc3BoZXJlTGlnaHROYXRpdmUiLCJza3lDb2xvciIsImdyb3VuZENvbG9yIiwiUG9pbnRMaWdodCIsIlBvaW50TGlnaHROYXRpdmUiLCJkaXN0YW5jZSIsImRlY2F5IiwiU3BvdExpZ2h0IiwiU3BvdExpZ2h0TmF0aXZlIiwiYW5nbGUiLCJleHBvbmVudCIsIk1hdGgiLCJQSSIsIkFyZWFMaWdodCIsIlJlY3RBcmVhTGlnaHROYXRpdmUiLCJDdWJlQ2FtZXJhIiwiQ3ViZUNhbWVyYU5hdGl2ZSIsImN1YmVSZXNvbHV0aW9uIiwiT3J0aG9ncmFwaGljQ2FtZXJhIiwiT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZSIsImFzcGVjdCIsIkJveCIsImJ1aWxkR2VvbWV0cnkiLCJidWZmZXIiLCJCb3hCdWZmZXJHZW9tZXRyeSIsIkJveEdlb21ldHJ5IiwiZGVwdGgiLCJ3aWR0aFNlZ21lbnRzIiwiaGVpZ2h0U2VnbWVudHMiLCJkZXB0aFNlZ21lbnRzIiwiQ2lyY2xlIiwiQ2lyY2xlQnVmZmVyR2VvbWV0cnkiLCJDaXJjbGVHZW9tZXRyeSIsInNlZ21lbnRzIiwidGhldGFTdGFydCIsInRoZXRhTGVuZ3RoIiwiQ29uZSIsIkNvbmVCdWZmZXJHZW9tZXRyeSIsIkNvbmVHZW9tZXRyeSIsInJhZGl1c1NlZ21lbnRzIiwib3BlbkVuZGVkIiwiQ3lsaW5kZXIiLCJDeWxpbmRlckJ1ZmZlckdlb21ldHJ5IiwiQ3lsaW5kZXJHZW9tZXRyeSIsInJhZGl1c1RvcCIsInJhZGl1c0JvdHRvbSIsIkRvZGVjYWhlZHJvbiIsIkRvZGVjYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiRG9kZWNhaGVkcm9uR2VvbWV0cnkiLCJkZXRhaWwiLCJFeHRydWRlIiwiRXh0cnVkZUdlb21ldHJ5Iiwic2hhcGVzIiwib3B0aW9ucyIsIkJ1ZmZlckdlb21ldHJ5IiwiZnJvbUdlb21ldHJ5IiwiSWNvc2FoZWRyb24iLCJJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiSWNvc2FoZWRyb25HZW9tZXRyeSIsIkxhdGhlIiwiTGF0aGVCdWZmZXJHZW9tZXRyeSIsIkxhdGhlR2VvbWV0cnkiLCJwb2ludHMiLCJMaW5lIiwiTGluZU5hdGl2ZSIsIkdlb21ldHJ5IiwicHAiLCJjdXJ2ZSIsImdldFBvaW50cyIsInZlcnRzIiwiRmxvYXQzMkFycmF5IiwiaTMiLCJhZGRBdHRyaWJ1dGUiLCJCdWZmZXJBdHRyaWJ1dGUiLCJ2ZXJ0aWNlcyIsIkxpbmVDdXJ2ZTMiLCJWZWN0b3IzIiwiSW1wb3J0ZXIiLCJmaWx0ZXIiLCJwcm9jZXNzRmlsdGVyIiwiZm9yRWFjaCIsImVsIiwidGV4dHVyZVBhdGgiLCJsYW9kZXIiLCJzZXRUZXh0dXJlUGF0aCIsImxvYWRlciIsImxvYWQiLCJ1cmwiLCJvbkxvYWQiLCJwYXJzZXIiLCJ1c2VDdXN0b21NYXRlcmlhbCIsIm1hdCIsIm9uUHJvZ3Jlc3MiLCJvbkVycm9yIiwiSlNPTkxvYWRlciIsIm1hdGVyaWFscyIsIk9jdGFoZWRyb24iLCJPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJPY3RhaGVkcm9uR2VvbWV0cnkiLCJQYXJhbWV0cmljIiwiUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5IiwiUGFyYW1ldHJpY0dlb21ldHJ5Iiwic2xpY2VzIiwic3RhY2tzIiwidSIsInYiLCJQbGFuZSIsIlBsYW5lQnVmZmVyR2VvbWV0cnkiLCJQbGFuZUdlb21ldHJ5Iiwid1NlZ21lbnRzIiwiaFNlZ21lbnRzIiwidmVydGljZXNPZkN1YmUiLCJpbmRpY2VzT2ZGYWNlcyIsIlBvbHloZWRyb24iLCJQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJQb2x5aGVkcm9uR2VvbWV0cnkiLCJSaW5nIiwiUmluZ0J1ZmZlckdlb21ldHJ5IiwiUmluZ0dlb21ldHJ5IiwiaW5uZXJSYWRpdXMiLCJvdXRlclJhZGl1cyIsInRoZXRhU2VnbWVudHMiLCJwaGlTZWdtZW50cyIsIlNoYXBlIiwiU2hhcGVCdWZmZXJHZW9tZXRyeSIsIlNoYXBlR2VvbWV0cnkiLCJTcGhlcmUiLCJTcGhlcmVCdWZmZXJHZW9tZXRyeSIsIlNwaGVyZUdlb21ldHJ5IiwiVGV0cmFoZWRyb24iLCJUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiVGV0cmFoZWRyb25HZW9tZXRyeSIsIlRleHQiLCJwYXJhbWV0ZXJzIiwiZm9udCIsIlRleHRHZW9tZXRyeSIsInRleHQiLCJGb250TG9hZGVyIiwiRm9udCIsIlRvcnVzIiwiVG9ydXNHZW9tZXRyeSIsInR1YmUiLCJyYWRpYWxTZWdtZW50cyIsInR1YnVsYXJTZWdtZW50cyIsImFyYyIsIlRvcnVza25vdCIsIkdDb25zdHJ1Y3QiLCJUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSIsIlRvcnVzS25vdEdlb21ldHJ5IiwicCIsInEiLCJUdWJlIiwiVHViZUJ1ZmZlckdlb21ldHJ5IiwiVHViZUdlb21ldHJ5IiwicGF0aCIsImNsb3NlZCIsIkdyb3VwIiwib2JqZWN0cyIsIm9iaiIsImFkZFRvIiwiT2JqZWN0M0QiLCJFbGVtZW50TW9kdWxlIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJib2R5IiwiY3JlYXRlRWxlbWVudCIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInNlbGYiLCJhcHBlbmRDaGlsZCIsIlJlbmRlcmluZ01vZHVsZSIsImlzU2hhZG93IiwiYXNzaWduIiwiVmVjdG9yMiIsImRldmljZVBpeGVsUmF0aW8iLCJiZ0NvbG9yIiwiYmdPcGFjaXR5IiwicmVuZGVyZXIiLCJwaXhlbFJhdGlvIiwicmVzb2x1dGlvbiIsIldlYkdMUmVuZGVyZXIiLCJlZmZlY3RzIiwiYXBwbHlBZGRpdGlvbmFsIiwic2V0Q2xlYXJDb2xvciIsInNldFBpeGVsUmF0aW8iLCJzZXRTaXplIiwiTnVtYmVyIiwidG9GaXhlZCIsImlzQXBwbGllZCIsImFkZGl0aW9uYWwiLCJzY2VuZSIsInJlbmRlckxvb3AiLCJyZW5kZXIiLCJhdHRhY2hUb0NhbnZhcyIsImVmZmVjdCIsImNiIiwic2l6ZSIsImdldFNpemUiLCJhcHAiLCJjYW52YXMiLCJkb21FbGVtZW50IiwiZGVmaW5lIiwiaW50ZWdyYXRlUmVuZGVyZXIiLCJ1cGRhdGUiLCJmb3JjZUNvbnRleHRMb3NzIiwic2hhZG93TWFwIiwiU2NlbmVNb2R1bGUiLCJ3aWxsU2NlbmVCZVJlcGxhY2VkIiwiU2NlbmUiLCJzZXRTY2VuZSIsIlJlc2l6ZU1vZHVsZSIsImNhbGxiYWNrcyIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJyZW5kZXJpbmciLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImdldENvbnRhaW5lciIsImdldFJlc29sdXRpb24iLCJhdXRvIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRyaWdnZXIiLCJhZGRBdXRvcmVzaXplIiwiZnJhZ21lbnQiLCJ2ZXJ0ZXgiLCJwb2x5ZmlsbCIsIm1ldGhvZCIsInNob3dXYXJuIiwiUG9zdFByb2Nlc3Nvck1vZHVsZSIsImRlYnVnIiwiY3VycmVudFBhc3MiLCJjb21wb3NlciIsIkVmZmVjdENvbXBvc2VyIiwiZ2V0RGVsdGEiLCJyZXBsYWNlUmVuZGVyZXIiLCJwYXNzIiwiUmVuZGVyUGFzcyIsImFkZFBhc3MiLCJ0ZXh0dXJlSUQiLCJ1bmlmb3JtcyIsIlNoYWRlclBhc3MiLCJwYXNzZXMiLCJib29sIiwicmVuZGVyVG9TY3JlZW4iLCJFdmVudHNQYXRjaE1vZHVsZSIsIm9yaWdpbk9iamVjdCIsImRlc3RPYmplY3QiLCJldmVudHMiLCJldmVudCIsImVtaXQiLCJwYXRjaEV2ZW50cyIsIlZpcnR1YWxNb3VzZU1vZHVsZSIsImdsb2JhbE1vdmVtZW50IiwibW91c2UiLCJyYXljYXN0ZXIiLCJSYXljYXN0ZXIiLCJwcm9qZWN0aW9uUGxhbmUiLCJjdXN0b21YIiwiY3VzdG9tWSIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRYIiwiY2xpZW50WSIsIm5vcm1hbCIsImdldFdvcmxkRGlyZWN0aW9uIiwic2V0RnJvbUNhbWVyYSIsInJlcXVpcmUiLCJvbiIsImV2IiwiZ2xvYmFsWCIsImdsb2JhbFkiLCJwb2ludGVyTG9ja0VsZW1lbnQiLCJtb3ZlbWVudFgiLCJtb3ZlbWVudFkiLCJpc0hvdmVyZWQiLCJob3ZlcnMiLCJpbnRlcnNlY3RPYmplY3QiLCJwbGFuZSIsInJheSIsImludGVyc2VjdFBsYW5lIiwiaW50ZXJzZWN0aW9uIiwiQ29udHJvbHNNb2R1bGUiLCJjb250cm9scyIsImMiLCJ1cGRhdGVMb29wIiwiRm9nTW9kdWxlIiwidHlwZSIsImZvZyIsIkZvZ0V4cDIiLCJkZW5zaXR5IiwiRm9nIiwiaXNFcXVhbERlZmF1bHQiLCJhIiwiYiIsImVxdWFscyIsIlN0YXRlTW9kdWxlIiwiaXNFcXVhbCIsImVxdWFsQ2hlY2siLCJhY3Rpb25HZW5lcmF0ZSIsImNvbmZpZ3VyYXRpb24iLCJjdXJyZW50Q29uZmlnIiwicHJldkNvbmZpZyIsImNvbmZpZyIsImRlZmF1bHQiLCJyZXBsYWNlUmVkdWNlciIsImNvbmZpZ3MiLCJ1cGRhdGVzIiwiY29uZmlnTmFtZSIsInRydWVWYWwiLCJmYWxzZVZhbCIsIlRocmVlT3JiaXRDb250cm9scyIsImV2ZW50SGFuZGxlciIsIm1pbkRpc3RhbmNlIiwibWF4RGlzdGFuY2UiLCJJbmZpbml0eSIsIm1pblpvb20iLCJtYXhab29tIiwibWluUG9sYXJBbmdsZSIsIm1heFBvbGFyQW5nbGUiLCJtaW5BemltdXRoQW5nbGUiLCJtYXhBemltdXRoQW5nbGUiLCJlbmFibGVEYW1waW5nIiwiZGFtcGluZ0ZhY3RvciIsImVuYWJsZVpvb20iLCJ6b29tU3BlZWQiLCJlbmFibGVSb3RhdGUiLCJyb3RhdGVTcGVlZCIsImVuYWJsZVBhbiIsImtleVBhblNwZWVkIiwiYXV0b1JvdGF0ZSIsImF1dG9Sb3RhdGVTcGVlZCIsImVuYWJsZUtleXMiLCJrZXlzIiwiTEVGVCIsIlVQIiwiUklHSFQiLCJCT1RUT00iLCJtb3VzZUJ1dHRvbnMiLCJPUkJJVCIsIk1PVVNFIiwiWk9PTSIsIk1JRERMRSIsIlBBTiIsInRhcmdldDAiLCJwb3NpdGlvbjAiLCJ6b29tMCIsInpvb20iLCJnZXRQb2xhckFuZ2xlIiwic3BoZXJpY2FsIiwicGhpIiwiZ2V0QXppbXV0aGFsQW5nbGUiLCJ0aGV0YSIsInJlc2V0IiwiZGlzcGF0Y2hFdmVudCIsImNoYW5nZUV2ZW50IiwiU1RBVEUiLCJOT05FIiwib2Zmc2V0IiwicXVhdCIsIlF1YXRlcm5pb24iLCJzZXRGcm9tVW5pdFZlY3RvcnMiLCJ1cCIsInF1YXRJbnZlcnNlIiwiaW52ZXJzZSIsImxhc3RQb3NpdGlvbiIsImxhc3RRdWF0ZXJuaW9uIiwic3ViIiwiYXBwbHlRdWF0ZXJuaW9uIiwic2V0RnJvbVZlY3RvcjMiLCJyb3RhdGVMZWZ0IiwiZ2V0QXV0b1JvdGF0aW9uQW5nbGUiLCJzcGhlcmljYWxEZWx0YSIsIm1pbiIsIm1ha2VTYWZlIiwicGFuT2Zmc2V0Iiwic2V0RnJvbVNwaGVyaWNhbCIsImxvb2tBdCIsInpvb21DaGFuZ2VkIiwiZGlzdGFuY2VUb1NxdWFyZWQiLCJFUFMiLCJkb3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Db250ZXh0TWVudSIsIm9uTW91c2VEb3duIiwib25Nb3VzZVdoZWVsIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaEVuZCIsIm9uVG91Y2hNb3ZlIiwib25Nb3VzZU1vdmUiLCJvbk1vdXNlVXAiLCJvbktleURvd24iLCJzdGFydEV2ZW50IiwiZW5kRXZlbnQiLCJST1RBVEUiLCJET0xMWSIsIlRPVUNIX1JPVEFURSIsIlRPVUNIX0RPTExZIiwiVE9VQ0hfUEFOIiwiU3BoZXJpY2FsIiwicm90YXRlU3RhcnQiLCJyb3RhdGVFbmQiLCJyb3RhdGVEZWx0YSIsInBhblN0YXJ0IiwicGFuRW5kIiwicGFuRGVsdGEiLCJkb2xseVN0YXJ0IiwiZG9sbHlFbmQiLCJkb2xseURlbHRhIiwiZ2V0Wm9vbVNjYWxlIiwicG93Iiwicm90YXRlVXAiLCJwYW5MZWZ0Iiwib2JqZWN0TWF0cml4Iiwic2V0RnJvbU1hdHJpeENvbHVtbiIsIm11bHRpcGx5U2NhbGFyIiwicGFuVXAiLCJwYW4iLCJkZWx0YVgiLCJkZWx0YVkiLCJ0YXJnZXREaXN0YW5jZSIsInRhbiIsImNsaWVudEhlaWdodCIsIm1hdHJpeCIsImNsaWVudFdpZHRoIiwiZG9sbHlJbiIsImRvbGx5U2NhbGUiLCJkb2xseU91dCIsImhhbmRsZU1vdXNlRG93blJvdGF0ZSIsImhhbmRsZU1vdXNlRG93bkRvbGx5IiwiaGFuZGxlTW91c2VEb3duUGFuIiwiaGFuZGxlTW91c2VNb3ZlUm90YXRlIiwic3ViVmVjdG9ycyIsImhhbmRsZU1vdXNlTW92ZURvbGx5IiwiaGFuZGxlTW91c2VNb3ZlUGFuIiwiaGFuZGxlTW91c2VVcCIsImhhbmRsZU1vdXNlV2hlZWwiLCJoYW5kbGVLZXlEb3duIiwia2V5Q29kZSIsImhhbmRsZVRvdWNoU3RhcnRSb3RhdGUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImhhbmRsZVRvdWNoU3RhcnREb2xseSIsImR4IiwiZHkiLCJzcXJ0IiwiaGFuZGxlVG91Y2hTdGFydFBhbiIsImhhbmRsZVRvdWNoTW92ZVJvdGF0ZSIsImhhbmRsZVRvdWNoTW92ZURvbGx5IiwiaGFuZGxlVG91Y2hNb3ZlUGFuIiwiaGFuZGxlVG91Y2hFbmQiLCJwcmV2ZW50RGVmYXVsdCIsImJ1dHRvbiIsInN0b3BQcm9wYWdhdGlvbiIsIkV2ZW50RGlzcGF0Y2hlciIsIk9yYml0Q29udHJvbHNNb2R1bGUiLCJmb2xsb3ciLCJ1cGRhdGVQcm9jZXNzb3IiLCJzZXRDb250cm9scyIsInNldFVwZGF0ZSIsIkR5bmFtaWNHZW9tZXRyeU1vZHVsZSIsImdfIiwidXBkYXRlUGFyYW1zIiwiVGV4dHVyZUxvYWRlciIsIlRleHR1cmVNb2R1bGUiLCJ0ZXh0dXJlcyIsInRleHR1cmUiLCJyZXBlYXQiLCJSZXBlYXRXcmFwcGluZyIsIm1hcHBpbmciLCJVVk1hcHBpbmciLCJmaXgiLCJ0ZXgiLCJ3cmFwUyIsIndyYXBUIiwibWFnRmlsdGVyIiwiTmVhcmVzdEZpbHRlciIsIm1pbkZpbHRlciIsIkxpbmVhck1pcE1hcExpbmVhckZpbHRlciIsIkFuaW1hdGlvbk1vZHVsZSIsImlzRGVmZXJyZWQiLCJza2VsZXRvbiIsIm1peGVyIiwiQW5pbWF0aW9uTWl4ZXIiLCJjbGlwcyIsImFuaW1hdGlvbnMiLCJjbGlwTmFtZSIsImNsaXAiLCJBbmltYXRpb25DbGlwIiwiZmluZEJ5TmFtZSIsImNsaXBBY3Rpb24iLCJwbGF5Iiwic3BlZWQiLCJEZWZpbmVNb2R1bGUiLCJNb2RlbCIsIkNhbWVyYU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sSUFBTUEsU0FBUyxTQUFUQSxNQUFTLENBQUNDLE1BQUQsRUFBMkI7b0NBQWZDLFVBQWU7Y0FBQTs7Ozs7Ozs7O3lCQUN2QkEsVUFBeEIsOEhBQW9DO1VBQXpCQyxTQUF5Qjs7Ozs7VUFJOUIsQ0FBQ0EsU0FBTCxFQUNFLFNBTGdDOzs7Ozs7OzhCQU9mQyxPQUFPQyxtQkFBUCxDQUEyQkYsU0FBM0IsQ0FBbkIsbUlBQTBEO2NBQS9DRyxJQUErQzs7Y0FDcERMLE9BQU9LLElBQVAsTUFBaUJDLFNBQWpCLElBQThCSixVQUFVRyxJQUFWLENBQTlCLElBQ0NMLE9BQU9LLElBQVAsRUFBYUUsUUFBYixPQUE0QixpQkFEN0IsSUFFQ0wsVUFBVUcsSUFBVixFQUFnQkUsUUFBaEIsT0FBK0IsaUJBRnBDLEVBRXVEOztnQkFFakRMLFVBQVVHLElBQVYsRUFBZ0JHLFdBQWhCLEtBQWdDTCxNQUFwQyxFQUE0Q0osT0FBT0MsT0FBT0ssSUFBUCxDQUFQLEVBQXFCSCxVQUFVRyxJQUFWLENBQXJCLEVBQTVDLEtBQ0tMLE9BQU9LLElBQVAsSUFBZUgsVUFBVUcsSUFBVixDQUFmO1dBTFAsTUFPRUwsT0FBT0ssSUFBUCxJQUFlLE9BQU9MLE9BQU9LLElBQVAsQ0FBUCxLQUF3QixXQUF4QixHQUFzQ0gsVUFBVUcsSUFBVixDQUF0QyxHQUF3REwsT0FBT0ssSUFBUCxDQUF2RTs7Y0FFRSxPQUFPTCxPQUFPSyxJQUFQLENBQVAsS0FBd0IsV0FBeEIsSUFBdUNJLE1BQU1DLE9BQU4sQ0FBY1IsVUFBVUcsSUFBVixDQUFkLENBQTNDLEVBQTJFTCxPQUFPSyxJQUFQLElBQWVILFVBQVVHLElBQVYsRUFBZ0JNLEtBQWhCLEVBQWYsQ0FB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QUksQ0FBQyxDQUFDO0VBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQy9FLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztFQUN0RSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7OztFQUczQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7O0dBRXJCLFFBQVEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDckMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDOztHQUV4QixRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQ3RDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7R0FFeEI7OztFQUdELFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztFQUMzQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7OztFQUc1QyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7RUFHckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0VBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElB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
