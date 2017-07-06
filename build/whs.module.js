/* WhitestormJS Framework v2.1.0 */
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

      return this.applyBridge({ mesh: new Line(geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = params.buffer ? new BufferGeometry() : new Geometry();

      if (params.buffer) {
        var pp = params.curve.getPoints(params.points);
        var verts = new Float32Array(pp.length * 3);

        for (var i = 0, max = pp.length; i < max; i++) {
          var i3 = i * 3;

          verts[i3] = pp[i].x;
          verts[i3 + 1] = pp[i].y;
          verts[i3 + 2] = pp[i].z;
        }

        geometry.addAttribute('position', new BufferAttribute(verts, 3));
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
            geometry: new TextGeometry(params.text, params.parameters),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzL2V4dGVuZC5qcyIsIi4uL3NyYy91dGlscy90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsIi4uL3NyYy9jb3JlL2Vycm9ycy5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZU1hbmFnZXIuanMiLCIuLi9zcmMvY29yZS9Db21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9wcm90b3R5cGUvYXR0cmlidXRlcy5qcyIsIi4uL3NyYy9jb3JlL01lc2hDb21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9MaWdodENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0NhbWVyYUNvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wcmVzZW50L2xpYi9wcmVzZW50LW5vZGUuanMiLCIuLi9zcmMvcG9seWZpbGwuanMiLCIuLi9zcmMvY29yZS9BcHAuanMiLCIuLi9zcmMvY29yZS9Mb29wLmpzIiwiLi4vc3JjL2NvcmUvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQW1iaWVudExpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL0RpcmVjdGlvbmFsTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvSGVtaXNwaGVyZUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL1BvaW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvU3BvdExpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL0FyZWFMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvQ3ViZUNhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvT3J0aG9ncmFwaGljQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9QZXJzcGVjdGl2ZUNhbWVyYS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQm94LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NpcmNsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Db25lLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0N5bGluZGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0RvZGVjYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9FeHRydWRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0ljb3NhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0xhdGhlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0xpbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSW1wb3J0ZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvT2N0YWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9QYXJhbWV0cmljLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BsYW5lLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BvbHloZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUmluZy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9TaGFwZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9TcGhlcmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVGV0cmFoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVGV4dC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Ub3J1cy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Ub3J1c2tub3QuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvVHViZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Hcm91cC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9FbGVtZW50TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1JlbmRlcmluZ01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9TY2VuZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9SZXNpemVNb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9jb252b2x1dGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvcHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3Bhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9jbGVhci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2NsZWFyLW1hc2suanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9nbGl0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9yZW5kZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9tYXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hhZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hvY2std2F2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2VmZmVjdC1jb21wb3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvY29yZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUG9zdFByb2Nlc3Nvck1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9FdmVudHNQYXRjaE1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9WaXJ0dWFsTW91c2VNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvQ29udHJvbHNNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvRm9nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1N0YXRlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2xpYi9UaHJlZU9yYml0Q29udHJvbHMuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvT3JiaXRDb250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvRHluYW1pY0dlb21ldHJ5TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9UZXh0dXJlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9BbmltYXRpb25Nb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvRGVmaW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvaW5kZXguanMiLCIuLi9zcmMvZGVwcmVjYXRpb24uanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGV4dGVuZCA9IChvYmplY3QsIC4uLmV4dGVuc2lvbnMpID0+IHsgLy8gJC5leHRlbmQgYWx0ZXJuYXRpdmUsIC4uLiBpcyB0aGUgc3ByZWFkIG9wZXJhdG9yLlxuICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiBleHRlbnNpb25zKSB7XG4gICAgLy8gY29uc29sZS5sb2coZXh0ZW5zaW9uKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YgZXh0ZW5zaW9uKTtcblxuICAgIGlmICghZXh0ZW5zaW9uKVxuICAgICAgY29udGludWU7IC8vIElnbm9yZSBudWxsIGFuZCB1bmRlZmluZWQgb2JqZWN0cyBhbmQgcGFyYW1ldGVycy5cblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhleHRlbnNpb24pKSB7IC8vIERvIG5vdCB0cmF2ZXJzZSB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgICAgaWYgKG9iamVjdFtwcm9wXSAhPT0gdW5kZWZpbmVkICYmIGV4dGVuc2lvbltwcm9wXVxuICAgICAgICAmJiBvYmplY3RbcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbiAgICAgICAgJiYgZXh0ZW5zaW9uW3Byb3BdLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIC8vIEdvZXMgZGVlcCBvbmx5IGlmIG9iamVjdFtwcm9wXSBhbmQgZXh0ZW5zaW9uW3Byb3BdIGFyZSBib3RoIG9iamVjdHMgIVxuICAgICAgICBpZiAoZXh0ZW5zaW9uW3Byb3BdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIGV4dGVuZChvYmplY3RbcHJvcF0sIGV4dGVuc2lvbltwcm9wXSk7XG4gICAgICAgIGVsc2Ugb2JqZWN0W3Byb3BdID0gZXh0ZW5zaW9uW3Byb3BdO1xuICAgICAgfSBlbHNlXG4gICAgICAgIG9iamVjdFtwcm9wXSA9IHR5cGVvZiBvYmplY3RbcHJvcF0gPT09ICd1bmRlZmluZWQnID8gZXh0ZW5zaW9uW3Byb3BdIDogb2JqZWN0W3Byb3BdO1xuXG4gICAgICBpZiAodHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXkuaXNBcnJheShleHRlbnNpb25bcHJvcF0pKSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF0uc2xpY2UoKTsgLy8gQWRkIHZhbHVlcyB0aGF0IGRvIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgICAgZWxzZSBpZiAodHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXkuaXNBcnJheShleHRlbnNpb25bcHJvcF0pKSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJleHBvcnQgY29uc3QgaW5zdHJ1Y3QgPSAoYXJyYXksIGluc3RBcnJheSkgPT4ge1xuICBjb25zdCB0ZW1wT2JqZWN0ID0ge307XG5cbiAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGluc3RBcnJheS5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdEFycmF5W2ldO1xuXG4gICAgdGVtcE9iamVjdFtndWlkZV0gPSBhcnJheVtpXTtcbiAgfVxuXG4gIHJldHVybiB0ZW1wT2JqZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybURhdGEgPSAob2JqZWN0LCBpbnN0cnVjdGlvbnMpID0+IHtcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5zdHJ1Y3Rpb25zKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0W2tleV0pKVxuICAgICAgb2JqZWN0W2tleV0gPSBpbnN0cnVjdChvYmplY3Rba2V5XSwgaW5zdHJ1Y3Rpb25zW2tleV0pO1xuICAgIGVsc2UgaWYgKG9iamVjdFtrZXldIGluc3RhbmNlb2YgT2JqZWN0ICYmICEoQXJyYXkuaXNBcnJheShpbnN0cnVjdGlvbnNba2V5XSkpKVxuICAgICAgb2JqZWN0W2tleV0gPSB0cmFuc2Zvcm1EYXRhKG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IHRvQXJyYXkgPSAob2JqZWN0LCBpbnN0cnVjdGlvbikgPT4ge1xuICBjb25zdCB0ZW1wQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdHJ1Y3Rpb24ubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICBjb25zdCBndWlkZSA9IGluc3RydWN0aW9uW2ldO1xuXG4gICAgdGVtcEFycmF5W2ldID0gb2JqZWN0W2d1aWRlXTtcbiAgfVxuXG4gIHJldHVybiB0ZW1wQXJyYXk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFdmVudHModGFyZ2V0KXtcbiAgdmFyIGV2ZW50cyA9IHt9LCBlbXB0eSA9IFtdO1xuICB0YXJnZXQgPSB0YXJnZXQgfHwgdGhpc1xuICAvKipcbiAgICogIE9uOiBsaXN0ZW4gdG8gZXZlbnRzXG4gICAqL1xuICB0YXJnZXQub24gPSBmdW5jdGlvbih0eXBlLCBmdW5jLCBjdHgpe1xuICAgIChldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW10pLnB1c2goW2Z1bmMsIGN0eF0pXG4gIH1cbiAgLyoqXG4gICAqICBPZmY6IHN0b3AgbGlzdGVuaW5nIHRvIGV2ZW50IC8gc3BlY2lmaWMgY2FsbGJhY2tcbiAgICovXG4gIHRhcmdldC5vZmYgPSBmdW5jdGlvbih0eXBlLCBmdW5jKXtcbiAgICB0eXBlIHx8IChldmVudHMgPSB7fSlcbiAgICB2YXIgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSxcbiAgICAgICAgaSA9IGxpc3QubGVuZ3RoID0gZnVuYyA/IGxpc3QubGVuZ3RoIDogMDtcbiAgICB3aGlsZShpLS0pIGZ1bmMgPT0gbGlzdFtpXVswXSAmJiBsaXN0LnNwbGljZShpLDEpXG4gIH1cbiAgLyoqIFxuICAgKiBFbWl0OiBzZW5kIGV2ZW50LCBjYWxsYmFja3Mgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICovXG4gIHRhcmdldC5lbWl0ID0gZnVuY3Rpb24odHlwZSl7XG4gICAgdmFyIGUgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksIGxpc3QgPSBlLmxlbmd0aCA+IDAgPyBlLnNsaWNlKDAsIGUubGVuZ3RoKSA6IGUsIGk9MCwgajtcbiAgICB3aGlsZShqPWxpc3RbaSsrXSkgalswXS5hcHBseShqWzFdLCBlbXB0eS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpXG4gIH07XG59OyIsImV4cG9ydCBjbGFzcyBDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0NvbXBvbmVudDonLCBjb21wb25lbnQpO1xuXG4gICAgdGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmN5RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGFjdGl2ZU1vZHVsZSwgZGVwZW5kZW5jeU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdBY3RpdmUgbW9kdWxlOicsIGFjdGl2ZU1vZHVsZSk7XG4gICAgaWYgKGNvbnNvbGUgJiYgZGVwZW5kZW5jeU1vZHVsZSkgY29uc29sZS5lcnJvcignRGVwZW5kZW5jeSBwdWJsaXNoZWQgYnkgbW9kdWxlOicsIGRlcGVuZGVuY3lNb2R1bGUpO1xuXG4gICAgdGhpcy5uYW1lID0gJ0RlcGVuZGVuY3lFcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hbmFnZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgY29tcG9uZW50LCBhY3RpdmVNb2R1bGUgPSBmYWxzZSkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGNvbXBvbmVudCk7XG4gICAgaWYgKGNvbnNvbGUgJiYgYWN0aXZlTW9kdWxlKSBjb25zb2xlLmVycm9yKCdBY3RpdmUgbW9kdWxlOicsIGFjdGl2ZU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnTWFuYWdlckVycm9yJztcbiAgfVxufVxuIiwiaW1wb3J0IHtSRVZJU0lPTn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IEV2ZW50cyBmcm9tICdtaW5pdmVudHMnO1xuaW1wb3J0IHtNYW5hZ2VyRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLy8gQ2hlY2sgZm9yIFRocmVlLmpzXG5jb25zdCB3YXJuRGVwcyA9ICgpID0+IHtcbiAgdGhyb3cgbmV3IEVycm9yKCdXaGl0ZXN0b3JtSlMgRnJhbWV3b3JrIHJlcXVpcmVzIFRocmVlLmpzIHI4NC4gaHR0cHM6Ly90aHJlZWpzLm9yZy8nKTtcbn07XG5cbnRyeSB7XG4gIGlmICghUkVWSVNJT04pIHdhcm5EZXBzKCk7XG59IGNhdGNoIChlcnIpIHtcbiAgd2FybkRlcHMoKTtcbn1cblxuLyoqXG4gKiBAY2xhc3MgTW9kdWxlU3lzdGVtXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uICBQcm92aWRlcyBBUEkgZm9yIGNsYXNzZXMgdGhhdCB3aWxsIHVzZSBNb2R1bGVzLjxici8+XG4gKiBUaGlzIGNsYXNzIGluY2x1ZGVzIGJhc2ljIGV2ZW50IHN5c3RlbSB3aXRoIHRob3NlIHN1cHBvcnRlZCBtZXRob2RzOlxuICogPHByZT4ub24oKTwvcHJlPjxwcmU+Lm9mZigpPC9wcmU+PHByZT4uZW1pdCgpPC9wcmU+XG4gKiBAZXh0ZW5kcyBFdmVudHNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlU3lzdGVtIGV4dGVuZHMgRXZlbnRzIHtcbiAgLy8gSU5URUdSQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBpbnRlZ3JhdGVNb2R1bGVzXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgYXBwbGllcyBhbGwgbW9kdWxlcyBmcm9tIC5tb2R1bGVzIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc291cmNlXSBJZiBzb3VyY2UgKHNob3VsZCBiZSBhIGNvbXBvbmVudCkgaXMgcHJvdmlkZWQsIHdpbGwgcmVwbGFjZSAubW9kdWxlcyB3aXRoIHNvdXJjZSdzIG9uZSBiZWZvcmUgZXhlY3V0aW5nIG1vZHVsZXMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGludGVncmF0ZU1vZHVsZXMoc291cmNlKSB7XG4gICAgaWYgKCF0aGlzLm1vZHVsZXMgJiYgIXNvdXJjZSkgcmV0dXJuO1xuICAgIGlmIChzb3VyY2UpIHRoaXMubW9kdWxlcyA9IHNvdXJjZS5tb2R1bGVzLnNsaWNlKDApO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKylcbiAgICAgIHRoaXMuYXBwbHlNb2R1bGUodGhpcy5tb2R1bGVzW2ldLCBmYWxzZSk7XG5cbiAgICBpZiAoc291cmNlKSB0aGlzLmFwcGx5QnJpZGdlKHtvbkNvcHk6IHNvdXJjZX0pO1xuICB9XG5cbiAgLy8gQVBQTFlJTkcgTU9EVUxFICguLi5hbmQgYSBcImJyaWRnZVwiIGZvciBtb2R1bGUpXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlCcmlkZ2VcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlcyBjb21wb25lbnQtc3BlY2lmaWMgQVBJIHRvIHdvcmsgd2l0aCBtb2R1bGVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYnJpZGdlTWFwXG4gICAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBvYmplY3Qgd2l0aCBtb2RpZmllZCB2YWx1ZXMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGFwcGx5QnJpZGdlKGJyaWRnZU1hcCA9IHt9KSB7XG4gICAgY29uc3QgbW9kdWxlcyA9IHRoaXMubW9kdWxlcztcbiAgICBpZiAoIW1vZHVsZXMpIHJldHVybiBicmlkZ2VNYXA7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gbW9kdWxlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gYnJpZGdlTWFwKSB7XG4gICAgICAgIGlmIChicmlkZ2VNYXBba2V5XSkge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXNbaV07XG5cbiAgICAgICAgICBpZiAobW9kdWxlICYmIG1vZHVsZS5icmlkZ2UgJiYgbW9kdWxlLmJyaWRnZVtrZXldKVxuICAgICAgICAgICAgYnJpZGdlTWFwW2tleV0gPSBtb2R1bGUuYnJpZGdlW2tleV0uYXBwbHkodGhpcywgW2JyaWRnZU1hcFtrZXldLCBtb2R1bGVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBicmlkZ2VNYXA7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUNvbW1hbmRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiAuYXBwbHlDb21tYW5kIHJ1bnMgYSBtZXRob2QgY2FsbGVkIGBuYW1lYCBvbiBhbGwgbW9kdWxlcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgdGhlIG1ldGhvZCBuYW1lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2I9KGZ1bmMsIG1vZHVsZVNjb3BlKSA9PiBmdW5jLmFwcGx5KHRoaXMsIFttb2R1bGVTY29wZV0pXSBIb3cgdGhlIGZ1bmN0aW9uIGlzIHdyYXBwZWQvXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGFwcGx5Q29tbWFuZChuYW1lLCBjYiA9IChmdW5jLCBtb2R1bGVTY29wZSkgPT4gZnVuYy5hcHBseSh0aGlzLCBbbW9kdWxlU2NvcGVdKSkge1xuICAgIGNvbnN0IG1vZHVsZXMgPSB0aGlzLm1vZHVsZXM7XG4gICAgaWYgKCFtb2R1bGVzKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gbW9kdWxlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlc1tpXTtcbiAgICAgIGlmIChuYW1lIGluIG1vZHVsZSkgY2IobW9kdWxlW25hbWVdLCBtb2R1bGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5TW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gLmFwcGx5TW9kdWxlIGlzIGFsc28gdXNlZCBpbiAuaW50ZWdyYXRlTW9kdWxlcygpIGZ1bmN0aW9uLlxuICAgKiBJdCBkb2VzIGV4YWN0bHkgd2hhdCBpdHMgbmFtZSBzYXlzIChhcHBsaWVzIG1vZHVsZSB0byBjb21wb25lbnQgb3IgYXBwKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGFwcGx5XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3B1c2g9dHJ1ZV1cbiAgICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIG1vZHVsZSB0aGF0IHdhcyBhcHBsaWVkLlxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGFwcGx5TW9kdWxlKG1vZHVsZSwgcHVzaCA9IHRydWUpIHtcbiAgICBpZiAoIW1vZHVsZSkgcmV0dXJuO1xuICAgIGlmIChwdXNoICYmIHRoaXMubW9kdWxlcykgdGhpcy5tb2R1bGVzLnB1c2gobW9kdWxlKTtcbiAgICBlbHNlIGlmIChwdXNoKSB0aGlzLm1vZHVsZXMgPSBbbW9kdWxlXTtcblxuICAgIGlmICh0aGlzLm1hbmFnZXIpIHRoaXMubWFuYWdlci5hY3RpdmUobW9kdWxlKTtcblxuICAgIGlmIChtb2R1bGUubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIpIG1vZHVsZS5tYW5hZ2VyKHRoaXMubWFuYWdlcik7XG4gICAgZWxzZSBpZiAobW9kdWxlLm1hbmFnZXIpIHtcbiAgICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAgICdDb21wb25lbnQnLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzIE1vZHVsZU1hbmFnZXIgdGhhdCBpcyB0dXJuZWQgb2ZmIGZvciB0aGlzIGNvbXBvbmVudGAsXG4gICAgICAgIHRoaXMsIG1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLmludGVncmF0ZSkgbW9kdWxlLmludGVncmF0ZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwb3NlcyBvZiBhbGwgbW9kdWxlc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlcygpIHtcbiAgICB3aGlsZSAodGhpcy5tb2R1bGVzLmxlbmd0aClcbiAgICAgIHRoaXMuZGlzcG9zZU1vZHVsZSh0aGlzLm1vZHVsZXNbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzcG9zZU1vZHVsZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIHRoZSBnaXZlbiBtb2R1bGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGRpc3Bvc2VcbiAgICogQHJldHVybiB7TW9kdWxlfSBSZXR1cm5zIG1vZHVsZSB0aGF0IHdhcyByZW1vdmVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBkaXNwb3NlTW9kdWxlKG1vZHVsZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG5cbiAgICB0aGlzLm1vZHVsZXMuc3BsaWNlKHRoaXMubW9kdWxlcy5pbmRleE9mKG1vZHVsZSksIDEpO1xuXG4gICAgaWYgKG1vZHVsZS5kaXNwb3NlKSBtb2R1bGUuZGlzcG9zZS5iaW5kKHRoaXMpKG1vZHVsZSk7XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuICB9XG5cbiAgLy8gUElQRUQgTUVUSE9EXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgbW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gcGlwZWQgdmVyc2lvbiBvZiAuYXBwbHlNb2R1bGUoKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIGFwcGx5XG4gICAqIEByZXR1cm4ge3RoaXN9IHJldHVybnMgdGhpcyAtIGFwcC9jb21wb25lbnRcbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlBpcGVkIG1vZHVsZXM8L2NhcHRpb24+XG4gICAqIGNvbXBvbmVudFxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTEoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUyKCkpXG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMygpKVxuICAgKi9cbiAgbW9kdWxlKG1vZHVsZSkge1xuICAgIHRoaXMuYXBwbHlNb2R1bGUobW9kdWxlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRQcm90b3R5cGU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG5leHBvcnQgdmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAgICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gICAqXG4gICAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAgICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICAgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICAgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICAgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gICAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gICAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAgICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAgICpcbiAgICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAgICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICAgKi9cbn07ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59IiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn0iLCIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59IiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9OyIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7RGVwZW5kZW5jeUVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIE1vZHVsZU1hbmFnZXJcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IGhhbmRsZXJcbiAqIEBkZXNjcmlwdGlvbiAgU29sdmVzIG1vZHVsZXMgZGVwZW5kZW5jaWVzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZHVsZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBvYmplY3Q7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcblxuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZSgoc3RhdGUgPSBbe30sICcnXSwgYWN0aW9uKSA9PiB7XG4gICAgICBzdGF0ZVswXVthY3Rpb24ua2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgc3RhdGVbMV0gPSBhY3Rpb24ua2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vZHVsZXMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFjdGl2ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgLmN1cnJlbnRNb2R1bGUgdG8gcHJvdmlkZWQgbW9kdWxlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gbWFrZSBjdXJyZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhY3RpdmUobW9kdWxlKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXQncyAuY3VycmVudE1vZHVsZSB0byBudWxsLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jdXJyZW50TW9kdWxlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmluZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZSB0aGUgbW9kdWxlIGluIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBkZWZpbmUobmFtZSkge1xuICAgIHRoaXMubW9kdWxlc1tuYW1lXSA9IHRoaXMuY3VycmVudE1vZHVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVzZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgZGVmaW5lZCBtb2R1bGUgZnJvbSBtYW5hZ2VyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBtb2R1bGUgbmFtZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgdXNlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVzW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQW4gYWxpYXMgZm9yIC5hZGQoKSA8YnIvPjxici8+XG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3Uga25vdyB0aGF0IHlvdSB3aWxsIG92ZXJ3cml0ZSBleGlzdGluZyBkZXBlbmRlbmN5Ljxici8+XG4gICAqIFVzZSBpdCBpbiB5b3VyIGFwcCwgYnV0IG5vdCBpbiBtb2R1bGUgdGhhdCB5b3UgcHJvdmlkZSB0byBvdGhlciBwZW9wbGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSB0aGUgdmFsdWUgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHNldChrZXksIGRhdGEpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdBREQnLFxuICAgICAga2V5LFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyBkZXBlbmRlbmN5IGluIHN0b3JlIG9iamVjdCwgYnkga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7T2JqZWN0fE1vZHVsZX1cbiAgICogQHRocm93cyB7RGVwZW5kZW5jeUVycm9yfSBpZiBkZXBlbmRlbmN5IGlzIG5vdCBpbiB0aGUgc3RvcmVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuZ2V0KCdoZWxsbycpOyAvLyAtPiB7d29ybGQ6IHRydWV9XG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgaWYgKCF0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XSkge1xuICAgICAgdGhyb3cgbmV3IERlcGVuZGVuY3lFcnJvcihcbiAgICAgICAgJ01vZHVsZU1hbmFnZXInLFxuICAgICAgICBgTW9kdWxlIHJlcXVpcmVzICcke2tleX0nIGRlcGVuZGVuY3lgLFxuICAgICAgICB0aGlzLmN1cnJlbnRNb2R1bGVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaGFzXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB3aGV0aGVyIG1hbmFnZXIgaGFzIGEgZGVwZW5kZW5jeSB3aXRoIHRoZSBnaXZlbiBrZXlcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNoZWNrIHdoZXRoZXIgdGhlIHN0b3JlIGhhcyB0aGUgJ2hlbGxvJyBkZXBlbmRlbmN5PC9jYXB0aW9uPlxuICAgKiBtYW5hZ2VyLmhhcygnaGVsbG8nKTsgLy8gLT4gdHJ1ZVxuICAgKi9cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgZGVwc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW2RlcHNNYXA9e31dXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1cGRhdGUoZGVwc01hcCA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBkZXBzTWFwW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkXG4gICAqIEBhbGlhcyBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyI3NldFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgYWRkKC4uLmRhdGEpIHtcbiAgICBjb25zb2xlLndhcm4oJy5hZGQoKSBtZXRob2QgaXMgZGVwcmVjYXRlZC4gVXNlIC5zZXQoKSBpbnN0ZWFkJyk7XG4gICAgcmV0dXJuIHRoaXMuc2V0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVxdWlyZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJlcXVpcmUgbW9kdWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIERlZmluZWQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2R1bGVFeGVjdXRvciBGdW5jdGlvbiB0aGF0IHJldHVybnMgYXBwbGllZCBtb2R1bGVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHJlcXVpcmUobmFtZSwgbW9kdWxlRXhlY3V0b3IpIHtcbiAgICBpZiAodGhpcy51c2UobmFtZSkgPT09IHVuZGVmaW5lZCkgdGhpcy5oYW5kbGVyLmFwcGx5TW9kdWxlKG1vZHVsZUV4ZWN1dG9yKCkpO1xuICB9XG59XG4iLCJpbXBvcnQge2V4dGVuZCwgdHJhbnNmb3JtRGF0YX0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbmltcG9ydCB7TWFuYWdlckVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge1xuICAgKiAgIG1vZHVsZXM6IFtdLFxuICAgKiAgIG1hbmFnZXI6IHRydWVcbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIG1vZHVsZXM6IG51bGwsXG4gICAgbWFuYWdlcjogdHJ1ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHt9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge307XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHByb21pc2VzIHRoYXQgc2hvdWxkIGJlIHJlc29sdmVkIGJlZm9yZSBDb21wb25lbnQgaXMgcmVhZHkuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjX3dhaXRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF93YWl0ID0gW107IC8vIENvbGxlY3Rpb24gb2YgcHJvbWlzZXM7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgYG1vZHVsZXNgLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I21vZHVsZXNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbW9kdWxlcyA9IFtdOyAvLyBDb2xsZWN0aW9uIG9mIG1vZHVsZXM7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgYGNoaWxkYCBDb21wb25lbnRzLlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2NoaWxkcmVuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNoaWxkcmVuID0gW107IC8vIEZvciBrZWVwaW5nIGNoaWxkcmVuIGNvbXBvbmVudHM7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGRlZmF1bHRzID0gQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIEFwcGx5IHBvbHlmaWxsZWQgcGFyYW1ldGVycyB0byAucGFyYW1zO1xuICAgIHRoaXMucGFyYW1zID0gZXh0ZW5kKHRyYW5zZm9ybURhdGEocGFyYW1zLCBpbnN0cnVjdGlvbnMpLCBkZWZhdWx0cyk7XG4gICAgaWYgKHRoaXMucGFyYW1zLm1hbmFnZXIpIHRoaXMubWFuYWdlciA9IG5ldyBNb2R1bGVNYW5hZ2VyKCk7XG5cbiAgICB0aGlzLm1vZHVsZXMgPSB0aGlzLnBhcmFtcy5tb2R1bGVzO1xuXG4gICAgdGhpcy5pbnRlZ3JhdGVNb2R1bGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3YWl0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV2FpdCBmb3IgYSBwcm9taXNlLlxuICAgKiBAcGFyYW0ge1Byb21pc2V9IFtwcm9taXNlXSAtIFRoZSBwcm9taXNlIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHRvIGEgcXVldWUuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGFsbCBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHdhaXQocHJvbWlzZSkge1xuICAgIGlmIChwcm9taXNlKSB0aGlzLl93YWl0LnB1c2gocHJvbWlzZSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX3dhaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmZXJcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlIGBmdW5jYCAoQ2FsbGJhY2spIHdoZW4gQ29tcG9uZW50IGlzIHJlYWR5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gQ2FsbGJhY2suXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGRlZmVyKGZ1bmMpIHtcbiAgICBpZiAodGhpcy5pc0RlZmZlcmVkKSB0aGlzLndhaXQoKS50aGVuKCgpID0+IGZ1bmModGhpcykpO1xuICAgIGVsc2UgZnVuYyh0aGlzKTtcbiAgfVxuXG4gIC8vIFBBUkFNRVRFUlNcblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVQYXJhbXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGVzIHBhcmFtZXRlcnMgb2YgdGhlIENvbXBvbmVudC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBQYXJhbXMgb2YgdGhpcyBDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgdXBkYXRlUGFyYW1zKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBleHRlbmQocGFyYW1zLCB0aGlzLnBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgLy8gQ09QWUlORyAmIENMT05JTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENsb25lIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm4ge29iamVjdH0gYSBjbG9uZWQgY29tcG9uZW50IHdpdGggYWxsIGl0cyBzb3VyY2UgY29tcG9uZW50JyBwYXJhbXMgY29waWVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5wYXJhbXMpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgbmF0aXZlIGFuZCBpbnRlZ3JhdGUgYG1vZHVsZXNgIHRvIGl0LlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gc291cmNlIC0gU291cmNlIGNvbXBvbmVudCB0aGF0IGlzIHVzZWQgZm9yIGBjb3B5KClgIGFjdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZV0gLSBDYWxsYmFjayBleGVjdXRlZCBiZWZvcmUgbW9kdWxlcyBpbnRlZ3JhdGlvbiBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHt0aGlzfSBDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UsIGN1c3RvbWl6ZSkge1xuICAgIHRoaXMucGFyYW1zID0gey4uLnNvdXJjZS5wYXJhbXN9O1xuXG4gICAgaWYgKHNvdXJjZS5uYXRpdmUpIHRoaXMubmF0aXZlID0gc291cmNlLm5hdGl2ZS5jbG9uZShzb3VyY2UucGFyYW1zKTtcbiAgICBpZiAoY3VzdG9taXplKSBjdXN0b21pemUoKTtcbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoc291cmNlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGEgY2hpbGQgYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgYWRkZWQgYXMgYSBgY2hpbGRgLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBkb25lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBhZGQob2JqZWN0KSB7XG4gICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtuYXRpdmV9ID0gb2JqZWN0O1xuICAgICAgICBpZiAoIW5hdGl2ZSkgcmVqZWN0KCk7XG5cbiAgICAgICAgY29uc3QgYWRkUHJvbWlzZSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe29uQWRkOiBvYmplY3R9KS5vbkFkZDtcblxuICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5hZGQobmF0aXZlKTtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWRkUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIGFkZFByb21pc2UudGhlbihyZXNvbHZlcik7XG4gICAgICAgIGVsc2UgcmVzb2x2ZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlIGEgY2hpbGQgYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgYSAqKmNoaWxkKiogb2YgdGhpcyBDb21wb25lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHJlbW92ZShvYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLm5hdGl2ZS5yZW1vdmUob2JqZWN0Lm5hdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRUb1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYHRoaXNgIENvbXBvbmVudCB0byBzcGVjaWZpZWQgYEFwcGAvYENvbXBvbmVudGAuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBvYmplY3QgLSBDb21wb25lbnQgdGhhdCB3aWxsIGJlIGEgcGFyZW50IG9mIGB0aGlzYC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgYWRkVG8ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBvYmplY3QgaXMgYGFzeW5jYCAoYHdhaXRgIHByb21pc2VzIGFyZSBtb3JlIHRoYW4gYDBgKS5cbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I2lzRGVmZmVyZWRcbiAgICovXG4gIGdldCBpc0RlZmZlcmVkKCkge1xuICAgIHJldHVybiB0aGlzLl93YWl0Lmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYE1vZHVsZU1hbmFnZXJgIHVzZWQgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKiBAbWVtYmVyIHtNb2R1bGVNYW5hZ2VyfSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbWFuYWdlclxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqL1xuICBnZXQgbWFuYWdlcigpIHtcbiAgICBpZiAodGhpcy5fbWFuYWdlcikgcmV0dXJuIHRoaXMuX21hbmFnZXI7XG5cbiAgICB0aHJvdyBuZXcgTWFuYWdlckVycm9yKFxuICAgICAgJ0NvbXBvbmVudCcsXG4gICAgICBgTW9kdWxlTWFuYWdlciBpcyBub3QgdXNlZCBpbiB0aGlzIGNvbXBvbmVudC4gJ21hbmFnZXInIHBhcmFtZXRlciBzaG91bGQgYmUgc2V0IGFzICd0cnVlJ2AsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIHNldCBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICB0aGlzLl9tYW5hZ2VyID0gbWFuYWdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgbmF0aXZlYCBvYmplY3QgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I25hdGl2ZVxuICAgKi9cbiAgZ2V0IG5hdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlO1xuICB9XG5cbiAgc2V0IG5hdGl2ZShtZXNoKSB7XG4gICAgdGhpcy5fbmF0aXZlID0gbWVzaDtcbiAgICB0aGlzLl9uYXRpdmUuY29tcG9uZW50ID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENvbXBvbmVudFxufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGVzKC4uLm1hcHBlcnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1hcHBlciA9IG1hcHBlcnNbaV07XG5cbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWFwcGVyLm1hcC5sZW5ndGg7IGsrKykge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBtYXBwZXIubWFwW2tdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQucHJvdG90eXBlLCBhdHRyaWJ1dGUsIHtcbiAgICAgICAgICBnZXQ6IG1hcHBlci5nZXR0ZXIoYXR0cmlidXRlKSxcbiAgICAgICAgICBzZXQ6IG1hcHBlci5zZXR0ZXIoYXR0cmlidXRlKSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IG1hcHBlci5jb25maWd1cmFibGUsXG4gICAgICAgICAgZW51bWVyYWJsZTogbWFwcGVyLmVudW1lcmFibGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weSguLi5tYXApIHtcbiAgcmV0dXJuIHtcbiAgICBtYXAsXG4gICAgZ2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVtuYW1lXTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBzZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLm5hdGl2ZVtuYW1lXS5jb3B5KHZhbHVlKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWlycm9yKC4uLm1hcCkge1xuICByZXR1cm4ge1xuICAgIG1hcCxcbiAgICBnZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlW25hbWVdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlW25hbWVdID0gdmFsdWU7XG4gICAgICB9O1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfTtcbn1cbiIsImltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5LCBtaXJyb3J9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3NjYWxlJyksXG4gIG1pcnJvcignbWF0ZXJpYWwnLCAnZ2VvbWV0cnknKVxuKVxuLyoqXG4gKiBAY2xhc3MgTWVzaENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTWVzaENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqICAgZ2VvbWV0cnk6IHt9LFxuICAgKiAgIG1hdGVyaWFsOiBmYWxzZSxcbiAgICpcbiAgICogICBzaGFkb3c6IHtcbiAgICogICAgIGNhc3Q6IHRydWUsXG4gICAqICAgICByZWNlaXZlOiB0cnVlXG4gICAqICAgfSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgc2NhbGU6IHt4OiAxLCB5OiAxLCB6OiAxfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG4gICAgZ2VvbWV0cnk6IHt9LFxuICAgIG1hdGVyaWFsOiBmYWxzZSxcblxuICAgIHNoYWRvdzoge1xuICAgICAgY2FzdDogdHJ1ZSxcbiAgICAgIHJlY2VpdmU6IHRydWVcbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHNjYWxlOiB7eDogMSwgeTogMSwgejogMX1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICAvLyBDVVNUT00gR0VPTUVUUlkgSEFORExJTkdcblxuICBzdGF0aWMgY3VzdG9tKGdlb20sIGNvbnN0cnVjdG9yID0gTWVzaCkge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAgICAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICAgICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogZ2VvbSxcbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgY29uc3RydWN0b3IoZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoZ2VvbSwgcGFyYW1zLCBjb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBuZXcgKE1lc2hDb21wb25lbnQuY3VzdG9tKGdlb20sIGNvbnN0cnVjdG9yKSkocGFyYW1zKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBNZXNoQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBNZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHRoaXMud2FpdChidWlsZCk7XG5cbiAgICAgICAgdGhpcy53YWl0KG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICAgICAgdGhpcy53cmFwKCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uYXRpdmUgPSBidWlsZDtcbiAgICAgICAgdGhpcy53YWl0KHRoaXMud3JhcCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5Q29tbWFuZCgncG9zdEludGVncmF0ZScpO1xuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICB3cmFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIFRPRE86IEZpeCBkZWZlciB3aXRoIHBoeXNpY3NcbiAgICAgIC8vIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgY29uc3Qge3Bvc2l0aW9uLCByb3RhdGlvbiwgc2NhbGUsIHNoYWRvd30gPSB0aGlzLnBhcmFtcztcblxuICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XG4gICAgICB0aGlzLnJvdGF0aW9uLnNldChyb3RhdGlvbi54LCByb3RhdGlvbi55LCByb3RhdGlvbi56KTtcbiAgICAgIHRoaXMuc2NhbGUuc2V0KHNjYWxlLngsIHNjYWxlLnksIHNjYWxlLnopO1xuXG4gICAgICB0aGlzLm5hdGl2ZS5jYXN0U2hhZG93ID0gc2hhZG93LmNhc3Q7XG4gICAgICB0aGlzLm5hdGl2ZS5yZWNlaXZlU2hhZG93ID0gc2hhZG93LnJlY2VpdmU7XG5cbiAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgLy8gfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gTWVzaENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UpIHtcbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UsICgpID0+IHtcbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIE1lc2hDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge01lc2hDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZShnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICBjb25zdCBkZXN0ID0gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG5cbiAgICBpZiAoZ2VvbWV0cnkpIGRlc3QuZ2VvbWV0cnkgPSBkZXN0Lmdlb21ldHJ5LmNsb25lKCk7XG4gICAgaWYgKG1hdGVyaWFsKSBkZXN0Lm1hdGVyaWFsID0gZGVzdC5tYXRlcmlhbC5jbG9uZSgpO1xuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTWVzaENvbXBvbmVudFxufTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weX0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAndGFyZ2V0Jylcbilcbi8qKlxuICogQGNsYXNzIExpZ2h0Q29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBMaWdodENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKlxuICAgKiAgIHNoYWRvdzoge1xuICAgKiAgICAgY2FzdDogdHJ1ZSxcbiAgICpcbiAgICogICAgIGJpYXM6IDAsXG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqXG4gICAqICAgICBtYXBTaXplOiB7XG4gICAqICAgICAgIHdpZHRoOiAxMDI0LFxuICAgKiAgICAgICBoZWlnaHQ6IDEwMjRcbiAgICogICAgIH0sXG4gICAqXG4gICAqICAgICBjYW1lcmE6IHtcbiAgICogICAgICAgbmVhcjogdHJ1ZSxcbiAgICogICAgICAgZmFyOiA0MDAsXG4gICAqICAgICAgIGZvdjogOTAsXG4gICAqXG4gICAqICAgICAgIHRvcDogMjAwLFxuICAgKiAgICAgICBib3R0b206IC0yMDAsXG4gICAqICAgICAgIGxlZnQ6IC0yMDAsXG4gICAqICAgICAgIHJpZ2h0OiAyMDBcbiAgICogICAgIH1cbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG5cbiAgICBzaGFkb3c6IHtcbiAgICAgIGNhc3Q6IHRydWUsXG5cbiAgICAgIGJpYXM6IDAsXG4gICAgICByYWRpdXM6IDEsXG5cbiAgICAgIG1hcFNpemU6IHtcbiAgICAgICAgd2lkdGg6IDEwMjQsXG4gICAgICAgIGhlaWdodDogMTAyNFxuICAgICAgfSxcblxuICAgICAgY2FtZXJhOiB7XG4gICAgICAgIG5lYXI6IHRydWUsXG4gICAgICAgIGZhcjogNDAwLFxuICAgICAgICBmb3Y6IDkwLFxuXG4gICAgICAgIHRvcDogMjAwLFxuICAgICAgICBib3R0b206IC0yMDAsXG4gICAgICAgIGxlZnQ6IC0yMDAsXG4gICAgICAgIHJpZ2h0OiAyMDBcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IExpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBMaWdodENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdMaWdodENvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuXG4gICAgICB0aGlzLndhaXQodGhpcy53cmFwKCkpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwbHlDb21tYW5kKCdwb3N0SW50ZWdyYXRlJyk7XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAnSW5zdGFuY2Ugc2hvdWxkIGhhdmUgaXRcXCdzIG93biAuYnVpbGQoKS4nLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgdHJhbnNmb3JtcyAoYHBvc2l0aW9uYCAmIGByb3RhdGlvbmApXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGNvbXBsZXRlZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbiwgcm90YXRpb259ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XG4gICAgICAgIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnopO1xuXG4gICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBTaGFkb3dcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyBzaGFkb3cgcHJvcGVydGllc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIHdyYXBTaGFkb3coKSB7XG4gICAgY29uc3Qge25hdGl2ZSwgcGFyYW1zOiB7c2hhZG93fX0gPSB0aGlzO1xuXG4gICAgbmF0aXZlLmNhc3RTaGFkb3cgPSBzaGFkb3cuY2FzdDtcbiAgICBuYXRpdmUuc2hhZG93Lm1hcFNpemUud2lkdGggPSBzaGFkb3cubWFwU2l6ZS53aWR0aDtcbiAgICBuYXRpdmUuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gc2hhZG93Lm1hcFNpemUuaGVpZ2h0O1xuICAgIG5hdGl2ZS5zaGFkb3cuYmlhcyA9IHNoYWRvdy5iaWFzO1xuICAgIG5hdGl2ZS5zaGFkb3cucmFkaXVzID0gc2hhZG93LnJhZGl1cztcblxuICAgIGNvbnN0IHNoYWRvd0NhbWVyYSA9IG5hdGl2ZS5zaGFkb3cuY2FtZXJhO1xuICAgIGNvbnN0IGNhbWVyYSA9IHNoYWRvdy5jYW1lcmE7XG5cbiAgICBzaGFkb3dDYW1lcmEubmVhciA9IGNhbWVyYS5uZWFyO1xuICAgIHNoYWRvd0NhbWVyYS5mYXIgPSBjYW1lcmEuZmFyO1xuICAgIHNoYWRvd0NhbWVyYS5mb3YgPSBjYW1lcmEuZm92O1xuXG4gICAgc2hhZG93Q2FtZXJhLmxlZnQgPSBjYW1lcmEubGVmdDtcbiAgICBzaGFkb3dDYW1lcmEucmlnaHQgPSBjYW1lcmEucmlnaHQ7XG4gICAgc2hhZG93Q2FtZXJhLnRvcCA9IGNhbWVyYS50b3A7XG4gICAgc2hhZG93Q2FtZXJhLmJvdHRvbSA9IGNhbWVyYS5ib3R0b207XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gTGlnaHRDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGFyZ2V0KSB0aGlzLnRhcmdldC5jb3B5KHNvdXJjZS50YXJnZXQoKSk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIExpZ2h0Q29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtMaWdodENvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGlnaHRDb21wb25lbnRcbn07XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHl9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3RhcmdldCcpXG4pXG4vKipcbiAqIEBjbGFzcyBDYW1lcmFDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIENhbWVyYUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGJ1aWxkOiB0cnVlLFxuXG4gICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLCBpbnN0cnVjdGlvbnMgPSBDYW1lcmFDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnQ2FtZXJhQ29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHRoaXMubmF0aXZlID0gYnVpbGQ7XG5cbiAgICAgIHRoaXMud2FpdCh0aGlzLndyYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseUNvbW1hbmQoJ3Bvc3RJbnRlZ3JhdGUnKTtcbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnQ2FtZXJhQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHRoaXMucGFyYW1zLnBvc2l0aW9uLngsIHRoaXMucGFyYW1zLnBvc2l0aW9uLnksIHRoaXMucGFyYW1zLnBvc2l0aW9uLnopO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldCh0aGlzLnBhcmFtcy5yb3RhdGlvbi54LCB0aGlzLnBhcmFtcy5yb3RhdGlvbi55LCB0aGlzLnBhcmFtcy5yb3RhdGlvbi56KTtcblxuICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtvbldyYXA6IDF9KTtcblxuICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgdHJhbnNmb3JtcyAmIGV4ZWN1dGUgYENvbXBvbmVudC5jb3B5KClgXG4gICAqIEByZXR1cm4ge3RoaXN9IENhbWVyYUNvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGFyZ2V0KSB0aGlzLnRhcmdldC5jb3B5KHNvdXJjZS50YXJnZXQoKSk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uY29weShzb3VyY2UucG9zaXRpb24pO1xuICAgICAgdGhpcy5yb3RhdGlvbi5jb3B5KHNvdXJjZS5yb3RhdGlvbik7XG4gICAgICB0aGlzLnF1YXRlcm5pb24uY29weShzb3VyY2UucXVhdGVybmlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2UgYSBjbG9uZSBvZiB0aGlzIENhbWVyYUNvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7Q2FtZXJhQ29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3Ioe2J1aWxkOiBmYWxzZX0pLmNvcHkodGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ2FtZXJhQ29tcG9uZW50XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgcmV0dXJuIHRpbWVbMF0gKiAxZTMgKyB0aW1lWzFdIC8gMWU2O1xufTtcbiIsImltcG9ydCBwcmVzZW50IGZyb20gJ3ByZXNlbnQnO1xuXG5leHBvcnQgY29uc3Qgc3lzdGVtID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG59O1xuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZ2xvYmFsLnBlcmZvcm1hbmNlID0ge1xuICAgIG5vdzogcHJlc2VudFxuICB9O1xufVxuIiwiaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uL3BvbHlmaWxsJztcbmltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJ9IGZyb20gJy4vTW9kdWxlTWFuYWdlcic7XG5cbi8qKlxuICogQGNsYXNzIEFwcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIHByZXBhcmUgYSB3b3JsZCBzY2VuZSwgc2V0dXAgcGh5c2ljcywgY2FtZXJhLCByZW5kZXJlciBhbmQgYWxsIG90aGVyIHRoaW5ncyB0aGF0IHlvdSB1c3VhbGx5IGRvIGJlZm9yZSBtYWtpbmcgbWVzaGVzLlxuICogQHBhcmFtIHtBcnJheX0gW21vZHVsZXM9W11dIC0gQXJyYXkgb2YgTW9kdWxlc1xuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIFNpbXVsYXRlIGZsYWdcbiAgICogQGRlc2NyaXB0aW9uIFNhbWUgYXMgLnVwZGF0ZUVuYWJsZWQsIGJ1dCBmb3IgcGh5c2ljcy4gRGVmaW5lcyBpZiBwaHlzaWNzIGlzIHNpbXVsYXRlZCBlYWNoIGZyYW1lLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjc2ltdWxhdGVcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2ltdWxhdGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI3VwZGF0ZUVuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gIC8qKlxuICAgKiBMb29wcyBpbiB0aGlzIGFwcFxuICAgKiBAZGVzY3JpcHRpb24gQXJyYXkgb2YgbG9vcHMgdGhhdCBhcmUgZXhlY3V0ZWQgYnkgdGhpcyBhcHAuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5BcHAjbG9vcHNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbG9vcHMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihtb2R1bGVzID0gW10pIHtcbiAgICBjb25zb2xlLmxvZyhgV0hTLkFwcCAke3ZlcnNpb259YCk7XG5cbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFuYWdlciA9IG5ldyBNb2R1bGVNYW5hZ2VyKHRoaXMpO1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3Qge2xvb3BzLCB1cGRhdGVFbmFibGVkfSA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzKCkge1xuICAgICAgcmVxdWVzdEFuaW1GcmFtZShwcm9jZXNzKTtcbiAgICAgIGlmICghdXBkYXRlRW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGwgPSBsb29wcy5sZW5ndGg7IGkgPCBsbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGUgPSBsb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5leGVjdXRlKGUuY2xvY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gICAgcHJvY2VzcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgcmVuZGVyaW5nIGxvb3BzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRMb29wXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGxvb3AgdG8gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gYWRkXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5BZGRpbmcgYSBsb29wIHRvIGFuIGFwcDwvY2FwdGlvbj5cbiAgICogY29uc3QgbG9vcCA9IG5ldyBMb29wKCgpID0+IHtcbiAgICogIC8vIC4uLlxuICAgKiB9KTtcbiAgICpcbiAgICogY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICAgKlxuICAgKiBhcHAuYWRkTG9vcChsb29wKTtcbiAgICogbG9vcC5zdGFydCgpO1xuICAgKi9cbiAgYWRkTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5sb29wcy5wdXNoKGxvb3ApO1xuICAgICAgcmVzb2x2ZShsb29wKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZUxvb3BcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgbG9vcCBmcm9tIHRoaXMgYXBwLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbG9vcCAtIHRoZSBsb29wIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHJlbW92ZUxvb3AobG9vcCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb29wcy5pbmRleE9mKGxvb3ApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkgdGhpcy5sb29wcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0KGtleSk7XG4gIH1cblxuICB1c2Uoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci51c2Uoa2V5KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcHBcbn07XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIExvb3BcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZWFjaCBhbmltYXRpb24gZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNsb2NrPXRydWVdIHBhc3NlcyBhIENsb2NrIHRvIHRoZSBmdW5jdGlvbiB3aGVuIGNhbGxlZCwgaWYgdHJ1ZVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3RvcihmdW5jLCB1c2VDbG9jayA9IHRydWUpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuY2xvY2sgPSB1c2VDbG9jayA/IG5ldyBDbG9jaygpIDogbnVsbDtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIENPTlRST0xTXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydHMgdGhpcyBsb29wLCBjbG9jayBpZiBpdCBoYXMgb25lLiBXb24ndCBkbyBhbnl0aGluZyBpZiBsb29wIGVuYWJsZWQgYWxyZWFkeS5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IFt3b3JsZF0gYXBwIHRvIGFkZCB0aGlzIGxvb3AgdG8sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RhcnQod29ybGQpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLmFkZExvb3AodGhpcyk7XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgdGhpcyBsb29wIGFuZCBpdHMgY2xvY2sgaWYgaXQgaGFzIG9uZSwgd29uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBsb29wIGlzIG5vdCBlbmFibGVkKVxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gcmVtb3ZlIHRoaXMgbG9vcCBmcm9tLCBpZiBwcm92aWRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICovXG4gIHN0b3Aod29ybGQpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuY2xvY2spIHRoaXMuY2xvY2suc3RvcCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHdvcmxkKSB3b3JsZC5yZW1vdmVMb29wKHRoaXMpO1xuICB9XG5cbiAgLy8gRVhFQ1VUSU9OXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZXhlY3V0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3BcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICogQHJldHVybnMgeyp9IHdoYXRldmVyIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3AgcmV0dXJuc1xuICAgKi9cbiAgZXhlY3V0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mdW5jKHRoaXMuY2xvY2spO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExvb3Bcbn07XG4iLCIvKiogQG1vZHVsZSBjb3JlICovXG5leHBvcnQgKiBmcm9tICcuL0NvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL01lc2hDb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9MaWdodENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0NhbWVyYUNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0FwcCc7XG5leHBvcnQgKiBmcm9tICcuL0xvb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbiIsImltcG9ydCB7QW1iaWVudExpZ2h0IGFzIEFtYmllbnRMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEFtYmllbnRMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gQW1iaWVudExpZ2h0IGlzIGEgc2ltcGxlIGNsYXNzLCBpdCBleHRlbmRzIExpZ2h0IGFuZCBpbmhlcml0cyBhbGwgaXRzIG1ldGhvZHMuXG4gKiBBbWJpZW50TGlnaHQgY3JlYXRlcyBiYXNpYyBsaWdodCBhcm91bmQgYWxsIHNjZW5lLCBzbyBpdCBkb2Vzbid0IG5lZWQgcHJvcGVydGllcyBsaWtlIHBvcyBvciB0YXJnZXQuXG4gKiBJdCBzdXBwb3J0cyBvbmx5IGNvbG9yIGFuZCBpbnRlbnNpdHkgYXMgcGFyYW1ldGVycywgd2hpY2ggZGVmaW5lcyB0aGUgY29sb3Igb2YgdGhlIHN1cnJvdW5kZWQgbGlnaHQgYW5kIGludGVuc2l0eSBvZiBsaWdodC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBBbWJpZW50TGlnaHQgPC9jYXB0aW9uPlxuICogbmV3IEFtYmllbnRMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjJcbiAqIH0pLmFkZFRvKHdvcmxkKTtcbiAqL1xuY2xhc3MgQW1iaWVudExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEFtYmllbnRMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEFtYmllbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQW1iaWVudExpZ2h0XG59O1xuIiwiaW1wb3J0IHtEaXJlY3Rpb25hbExpZ2h0IGFzIERpcmVjdGlvbmFsTGlnaHROYXRpdmUsIERpcmVjdGlvbmFsTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEaXJlY3Rpb25hbExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBEaXJlY3RpbmFsTGlnaHQgY3JlYXRlcyBhIGxpZ2h0IHRoYXQgc2hpbmVzIGZyb20gYSBzcGVjaWZpYyBkaXJlY3Rpb24gbm90IGZyb20gYSBzcGVjaWZpYyBwb3NpdGlvbi48YnIvPjxici8+XG4gKiBUaGlzIGxpZ2h0IHdpbGwgYmVoYXZlIGFzIHRob3VnaCBpdCBpcyBpbmZpbml0ZWx5IGZhciBhd2F5IGFuZCB0aGUgcmF5cyBwcm9kdWNlZCBmcm9tIGl0IGFyZSBhbGwgcGFyYWxsZWwuIDxici8+PGJyLz5cbiAqIFRoZSBiZXN0IGFuYWxvZ3kgd291bGQgYmUgYSBsaWdodCBzb3VyY2UgdGhhdCBhY3RzIGxpa2UgdGhlIHN1bjogdGhlIHN1biBpcyBzbyBmYXIgYXdheSB0aGF0IGFsbCBzdW5saWdodCBoaXR0aW5nIG9iamVjdHMgY29tZXMgZnJvbSB0aGUgc2FtZSBhbmdsZS48YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3MgYW5kIHRhcmdldCBwYXJhbWF0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRGlyZWN0aW9uYWxMaWdodCB0byBmYWxsIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgRGlyZWN0aW9uYWxMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjIsXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBEaXJlY3Rpb25hbExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERpcmVjdGlvbmFsTGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBEaXJlY3Rpb25hbExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEaXJlY3Rpb25hbExpZ2h0XG59O1xuIiwiaW1wb3J0IHtIZW1pc3BoZXJlTGlnaHQgYXMgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlLCBIZW1pc3BoZXJlTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBIZW1pc3BoZXJlTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIEhlbWlzcGhlcmVMaWdodCBpcyBhIGxpZ2h0IHNvdXJjZSBwb3NpdGlvbmVkIGRpcmVjdGx5IGFib3ZlIHRoZSBzY2VuZS48YnIvPlxuICogSXQgYWxzbyBkb2Vzbid0IG5lZWQgcG9zaXRpb24gYW5kIHRhcmdldCBwcm9wZXJ0aWVzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19oZW1pc3BoZXJlLmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge3NreUNvbG9yOiAweGZmZmZmZiwgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSGVtaXNwaGVyZUxpZ2h0PC9jYXB0aW9uPlxuICogbmV3IEhlbWlzcGhlcmVMaWdodCh7XG4gKiAgIHNreUNvbG9yOiAweGZmMDAwMCxcbiAqICAgZ3JvdW5kQ29sb3I6IDB4MDAwMGZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSGVtaXNwaGVyZUxpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBza3lDb2xvcjogMHhmZmZmZmYsXG4gICAgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEhlbWlzcGhlcmVMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEhlbWlzcGhlcmVMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5za3lDb2xvcixcbiAgICAgIHBhcmFtcy5ncm91bmRDb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgSGVtaXNwaGVyZUxpZ2h0XG59O1xuIiwiaW1wb3J0IHtQb2ludExpZ2h0IGFzIFBvaW50TGlnaHROYXRpdmUsIFBvaW50TGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQb2ludExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBQb2ludExpZ2h0IGNyZWF0ZXMgYSBsaWdodCBhdCBhIHNwZWNpZmljIHBvc2l0aW9uIGluIHRoZSBzY2VuZS4gVGhlIGxpZ2h0IHNoaW5lcyBpbiBhbGwgZGlyZWN0aW9ucyAocm91Z2hseSBzaW1pbGFyIHRvIGEgbGlnaHQgYnVsYi4pPGJyLz48YnIvPlxuICogSXQgaGFzIHRoZSBzYW1lIG9wdGlvbnMgYXMgQW1iaWVudExpZ2h0IGluIGxpZ2h0IHBhcmFtYXRlciwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zaXRpb24sIGRpc3RhbmNlIGFuZCBkZWNheS48YnIvPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIExpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFBvaW50TGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgUG9pbnRMaWdodCgge1xuICogICBjb2xvcjogMHhmZjAwMDAsXG4gKiAgIGludGVuc2l0eTogMixcbiAqICAgZGlzdGFuY2U6IDMwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUG9pbnRMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgZGVjYXk6IDFcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQb2ludExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUG9pbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUG9pbnRMaWdodFxufTtcbiIsImltcG9ydCB7U3BvdExpZ2h0IGFzIFNwb3RMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNwb3RMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gU3BvdExpZ2h0IGNyZWF0ZXMgc3BvdCBsaWdodCB0aGF0IGNhbiBjYXN0IHNoYWRvdyBpbiBvbmUgZGlyZWN0aW9uLiA8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgcGFyYW1ldGVycyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0LiA8YnIvPjxici8+XG4gKiBTcG90TGlnaHQgYWZmZWN0cyBtZXNoZXMgd2l0aCBsYW1iZXJ0IGFuZCBwaG9uZyBtYXRlcmlhbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9saWdodHNfc3BvdGxpZ2h0Lmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxLCBkaXN0YW5jZTogMTAwLCBhbmdsZTogTWF0aC5QSSAvIDMsIGV4cG9uZW50OiAwLCBkZWNheTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBTcG90TGlnaHQgdGhhdCBmYWxscyBkb3duIGZyb20gdmVjMygxMCwgMjAsIDEwKSB0byB2ZWMzKDAsIDAsIDApPC9jYXB0aW9uPlxuICogbmV3IFNwb3RMaWdodCh7XG4gKiAgIGNvbG9yOiAweDAwZmYwMCxcbiAqICAgaW50ZW5zaXR5OiAzLFxuICogICBkaXN0YW5jZTogMTAwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU3BvdExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgYW5nbGU6IE1hdGguUEkgLyAzLFxuICAgIGV4cG9uZW50OiAwLFxuICAgIGRlY2F5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNwb3RMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IFNwb3RMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuYW5nbGUsXG4gICAgICBwYXJhbXMuZXhwb25lbnQsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU3BvdExpZ2h0XG59O1xuIiwiaW1wb3J0IHtSZWN0QXJlYUxpZ2h0IGFzIFJlY3RBcmVhTGlnaHROYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG5jbGFzcyBBcmVhTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgd2lkdGg6IDEwLFxuICAgIGhlaWdodDogMTBcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQXJlYUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUmVjdEFyZWFMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMud2lkdGgsXG4gICAgICBwYXJhbXMuaGVpZ2h0XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFyZWFMaWdodFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvbGlnaHRzICovXG5leHBvcnQgKiBmcm9tICcuL0FtYmllbnRMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0RpcmVjdGlvbmFsTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9IZW1pc3BoZXJlTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2ludExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vU3BvdExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vQXJlYUxpZ2h0JztcbiIsImltcG9ydCB7Q3ViZUNhbWVyYSBhcyBDdWJlQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDdWJlQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyA2IGNhbWVyYXMgdGhhdCByZW5kZXIgdG8gYSBXZWJHTFJlbmRlclRhcmdldEN1YmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZXMgYSBDdWJlQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IEN1YmVDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBjdWJlUmVzb2x1dGlvbjogMjU2XG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgQ3ViZUNhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5DdWJlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGNhbWVyYToge1xuICAgKiAgICAgbmVhcjogMSxcbiAgICogICAgIGZhcjogMTAwMCxcbiAgICogICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBjdWJlUmVzb2x1dGlvbjogMTI4XG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN1YmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgQ3ViZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhcixcbiAgICAgIHBhcmFtcy5jdWJlUmVzb2x1dGlvblxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3ViZUNhbWVyYVxufTtcbiIsImltcG9ydCB7T3J0aG9ncmFwaGljQ2FtZXJhIGFzIE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvY2FtZXJhc1xuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIG9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFuIE9ydGhvZ3JhcGhpY0NhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBmYXI6IDEwMDAwXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDUwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXMuT3J0aG9ncmFwaGljQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgKiAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgKiAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAqICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT3J0aG9ncmFwaGljQ2FtZXJhLmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2NhbWVyYTogbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5sZWZ0LFxuICAgICAgcGFyYW1zLnJpZ2h0LFxuICAgICAgcGFyYW1zLnRvcCxcbiAgICAgIHBhcmFtcy5ib3R0b20sXG4gICAgICBwYXJhbXMubmVhcixcbiAgICAgIHBhcmFtcy5mYXJcbiAgICApfSkuY2FtZXJhO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9ydGhvZ3JhcGhpY0NhbWVyYVxufTtcbiIsImltcG9ydCB7UGVyc3BlY3RpdmVDYW1lcmEgYXMgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vLi4vcG9seWZpbGwnO1xuXG4vKipcbiAqIEBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYVxuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIHBlcnNwZWN0aXZlIHByb2plY3Rpb24uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gUGVyc3BlY3RpdmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoe1xuICogICBmb3Y6IDc1LFxuICogICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAwLFxuICogICAgIHk6IDEwMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5QZXJzcGVjdGl2ZUNhbWVyYSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBuZWFyOiAxLFxuICAgKiAgIGZhcjogMTAwMCxcbiAgICogICBmb3Y6IDc1LFxuICAgKiAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgZm92OiA3NSxcbiAgICBhc3BlY3Q6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHRcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGVyc3BlY3RpdmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmUoXG4gICAgICBwYXJhbXMuZm92LFxuICAgICAgcGFyYW1zLmFzcGVjdCxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGVyc3BlY3RpdmVDYW1lcmFcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL2NhbWVyYXMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ3ViZUNhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL09ydGhvZ3JhcGhpY0NhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL1BlcnNwZWN0aXZlQ2FtZXJhJztcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEJveEJ1ZmZlckdlb21ldHJ5LFxuICBCb3hHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQm94XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0JveEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBCb3gsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBCb3goe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgd2lkdGg6IDIsXG4gKiAgICAgIGhlaWdodDogMixcbiAqICAgICAgZGVwdGg6IDJcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQm94IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEsXG4gICAqICAgICBoZWlnaHQ6IDEsXG4gICAqICAgICBkZXB0aDogMSxcbiAgICogICAgIHdpZHRoU2VnbWVudHM6IDEsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICogICAgIGRlcHRoU2VnbWVudHM6IDFcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIGRlcHRoOiAxLFxuICAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgZGVwdGhTZWdtZW50czogMVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnZGVwdGgnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cycsICdkZXB0aFNlZ2VtZW50cyddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQm94LmRlZmF1bHRzLCBCb3guaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBCb3hCdWZmZXJHZW9tZXRyeSA6IEJveEdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGVwdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGhTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBCb3hcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBDaXJjbGVCdWZmZXJHZW9tZXRyeSxcbiAgQ2lyY2xlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENpcmNsZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQXMgdG9sZCBvbiBDb21wb25lbnQgZGVmaW5pdGlvbiwgd2hpbGUgeW91IGNhbiBwYXNzIGFueSBvZiB0aGUgaW5oZXJpdGVkIHBhcmFtcyBmb3IgdGhpcyBjb21wb25lbnQgY29uc3RydWN0aW9uLCB5b3Ugd2lsbCBuZWVkIHRvXG4gKiBwYXNzIHNwZWNpZmljIHBhcmFtZXRlcnMgdG8gYnVpbGQgdGhpcyBtZXNoIGFzIGEgZ2VvbWV0cnkgb2JqZWN0LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDaXJjbGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ2lyY2xlLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqICBuZXcgQ2lyY2xlKHtcbiAqICAgIGdlb21ldHJ5OiB7XG4gKiAgICAgIHJhZGl1czogNCxcbiAqICAgICAgc2VnbWVudHM6IDE2XG4gKiAgICB9LFxuICpcbiAqICAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgIH0pLFxuICpcbiAqICAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENpcmNsZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogNTAsXG4gICAqICAgICBzZWdtZW50czogOCxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogNTAsXG4gICAgICBzZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3NlZ21lbnRzJywgJ3RoZXRhU3RhcnQnLCAndGhldGFMZW5ndGgnXVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENpcmNsZS5kZWZhdWx0cywgQ2lyY2xlLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ2lyY2xlQnVmZmVyR2VvbWV0cnkgOiBDaXJjbGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENpcmNsZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENvbmVCdWZmZXJHZW9tZXRyeSxcbiAgQ29uZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDb25lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDb25lR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIENvbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IENvbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDb25lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Db25lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbXG4gICAqICAgJ3JhZGl1cycsXG4gICAqICAgJ2hlaWdodCcsXG4gICAqICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICogICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgKiAgICdvcGVuRW5kZWQnLFxuICAgKiAgICd0aGV0YVN0YXJ0JyxcbiAgICogICAndGhldGFMZW5ndGgnXG4gICAqIF1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENvbmUuZGVmYXVsdHMsIENvbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IENvbmVCdWZmZXJHZW9tZXRyeSA6IENvbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29uZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEN5bGluZGVyQnVmZmVyR2VvbWV0cnksXG4gIEN5bGluZGVyR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN5bGluZGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDeWxpbmRlckdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDeWxpbmRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ3lsaW5kZXIoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDeWxpbmRlciBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzVG9wOiAyMCxcbiAgICogICAgIHJhZGl1c0JvdHRvbTogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXNUb3A6IDAsXG4gICAgICByYWRpdXNCb3R0b206IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICByYWRpdXNTZWdtZW50czogMzIsXG4gICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICAgIG9wZW5FbmRlZDogZmFsc2UsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXIjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzVG9wJyxcbiAgICogICAncmFkaXVzQm90dG9tJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXNUb3AnLFxuICAgICAgJ3JhZGl1c0JvdHRvbScsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgICAgJ29wZW5FbmRlZCcsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBDeWxpbmRlci5kZWZhdWx0cywgQ3lsaW5kZXIuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDeWxpbmRlckJ1ZmZlckdlb21ldHJ5IDogQ3lsaW5kZXJHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzVG9wLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c0JvdHRvbSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3BlbkVuZGVkLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEN5bGluZGVyXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIERvZGVjYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2RlY2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhIGRvZGVjYWhlZHJvbiBpcyBhbnkgcG9seWhlZHJvbiB3aXRoIHR3ZWx2ZSBmbGF0IGZhY2VzLiA8YnIvPjxici8+XG4gKiBUaGUgbW9zdCBmYW1pbGlhciBkb2RlY2FoZWRyb24gaXMgdGhlIHJlZ3VsYXIgZG9kZWNhaGVkcm9uLCB3aGljaCBpcyBhIFBsYXRvbmljIHNvbGlkLiA8YnIvPlxuICogVGhlcmUgYXJlIGFsc28gdGhyZWUgcmVndWxhciBzdGFyIGRvZGVjYWhlZHJhLCB3aGljaCBhcmUgY29uc3RydWN0ZWQgYXMgc3RlbGxhdGlvbnMgb2YgdGhlIGNvbnZleCBmb3JtLiA8YnIvPlxuICogQWxsIG9mIHRoZXNlIGhhdmUgaWNvc2FoZWRyYWwgc3ltbWV0cnksIG9yZGVyIDEyMC5cbiAqIERvZGVjYWhlZHJvbiBjcmVhdGVzIERvZGVjYWhlZHJvbiBvYmplY3QgYnkgaXQncyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRG9kZWNhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIERvZGVjYWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgRG9kZWNhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTBcbiAqICAgfVxuICAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERvZGVjYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IHtcbiAgICogICByYWRpdXM6IDEsXG4gICAqICAgZGV0YWlsOiAwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERvZGVjYWhlZHJvbi5kZWZhdWx0cywgRG9kZWNhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBEb2RlY2FoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgRG9kZWNhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEV4dHJ1ZGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgRXh0cnVkZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gRXh0cnVkZSBnZW9tZXRyeSBtZWFucyB0aGF0IHlvdSBjYW4gY3JlYXRlIGEgM0QgbWVzaCBmcm9tIGFueSAyRCBzaGFwZSB1c2luZyB0aHJlZS5qcyBnZW9tZXRyeSBiYXNlZCBvbiA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9tYXRoL1ZlY3RvcjInPlRIUkVFLlZlY3RvcjIuPC9hPiA8YnIvPlxuICogU3VjaCBpbXBsZW1lbnRhdGlvbiB3aWxsIGhlbHAgeW91IHRvIG1ha2Ugdm9sdW1lZCBzaGFwZXMgdGhhdCBoYXZlIHRoZWlyIG93biBkZXB0aCBhbmQgY2FuIGJlIHNlZW4gZnJvbSBhbGwgYW5nZWxzLjxici8+PGJyLz5cbiAqIFlvdSBjYW4gYWxzbyBmaW5kIHNvbWUgaW50ZXJlc3RpbmcgZXhhbXBsZXMgbWFkZSB1c2luZyA8YSBocmVmPSd0aHJlZWpzLm9yZyc+dGhyZWUuanM8L2E+IHdoaWNoIGlzIGEgY29yZSBvZiB3aHMuanMsIHN1Y2ggYXM6XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlcy5odG1sJz5XZWJnbCBnZW9tZXRyeSBleHRydWRlPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zaGFwZXMyLmh0bWwnPkV4dHJ1ZGUgc2hhcGVzIGZyb20gZ2VvZGF0YTwvYT5cbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc3BsaW5lcy5odG1sJz5FeHRydWRlIHNwbGluZXM8L2E+XG4gKlxuICogU3VjaCBleGFtcGxlcyBjYW4gYmUgZWFzaWx5IGltcGxlbWVudGVkIHVzaW5nIHdoaXRlc3Rvcm0uanMgb3IgaXQncyBwbHVnaW5zLiBVc2UgYEV4dHJ1ZGVgIGNsYXNzIHdpdGggPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZXh0cmFzL2NvcmUvU2hhcGUnPlRIUkVFLlNoYXBlPC9hPiB0byBnZXQgZXh0cnVkZSBlZmZlY3Qgb2Ygc2hhcGUgZGVmaW5lZCBieSAyRCB2ZWN0b3JzLlxuICogVGhpcyBjbGFzcyBpcyBzaW1pbGFyIHRvIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2dlb21ldHJpZXMvRXh0cnVkZUdlb21ldHJ5Jz5USFJFRS5FeHRydWRlR2VvbWV0cnk8L2E+LFxuICogYnV0IGl0IGFsc28gY29udGFpbnMgYWxsIHByb3BlcnRpZXMsIGFwcGxpZWQgYnkgYFNoYXBlYCwgc3VjaCBhcyBtYXRlcmlhbCwgbWFzcyBhbmQgdmVjdG9ycyBsaWtlIHBvc2l0aW9uIChwb3MpIGFuZCByb3RhdGlvbiAocm90KS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRXh0cnVkZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBzaGFwZSwgdGhlbiBhbiBFeHRydWRlIGZyb20gaXQ8L2NhcHRpb24+XG4gKiBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZShbXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLDIpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigyLDApLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwtMilcbiAqIF0pO1xuICpcbiAqIGNvbnN0IGV4dHJ1ZGUgPSBuZXcgRXh0cnVkZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgc2hhcGVzOiBzaGFwZSxcbiAqICAgICBvcHRpb25zOiB7XG4gKiAgICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICogICAgICAgYmV2ZWxTaXplOiAwLFxuICogICAgICAgYW1vdW50OiAyXG4gKiAgICAgfVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KTtcbiAqXG4gKiBleHRydWRlLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEV4dHJ1ZGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHNoYXBlczogW10sXG4gICAqICAgICBvcHRpb25zOiB7fVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBzaGFwZXM6IFtdLFxuICAgICAgb3B0aW9uczoge31cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydzaGFwZXMnLCAnb3B0aW9ucyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRXh0cnVkZS5kZWZhdWx0cywgRXh0cnVkZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEV4dHJ1ZGVHZW9tZXRyeShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zaGFwZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3B0aW9uc1xuICAgICk7XG5cbiAgICByZXR1cm4gcGFyYW1zLmJ1ZmZlciA/IG5ldyBCdWZmZXJHZW9tZXRyeSgpLmZyb21HZW9tZXRyeShnZW9tZXRyeSkgOiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBFeHRydWRlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgSWNvc2FoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSWNvc2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhbiBpY29zYWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCAyMCBmYWNlcy48YnIvPlxuICogVGhlcmUgYXJlIG1hbnkga2luZHMgb2YgaWNvc2FoZWRyYSwgd2l0aCBzb21lIGJlaW5nIG1vcmUgc3ltbWV0cmljYWwgdGhhbiBvdGhlcnMuIFRoZSBtb3N0IHdlbGwga25vd24gaXMgdGhlIFBsYXRvbmljLCBjb252ZXggcmVndWxhciBpY29zYWhlZHJvbi48YnIvPlxuICogYEljb3NhaGVkcm9uYCBjcmVhdGVzIGFuIEljb3NhaGVkcm9uIG9iamVjdCBieSBpdHMgcmFkaXVzIGFuZCBkZXRhaWwuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0ljb3NhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEljb3NhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBJY29zYWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBJY29zYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHtnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ119XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBJY29zYWhlZHJvbi5kZWZhdWx0cywgSWNvc2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IEljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBJY29zYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJY29zYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIExhdGhlQnVmZmVyR2VvbWV0cnksXG4gIExhdGhlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExhdGhlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGBMYXRoZUdlb21ldHJ5YCBhbGxvd3MgeW91IHRvIGNyZWF0ZSBzaGFwZXMgZnJvbSBhIHNtb290aCBjdXJ2ZS5cbiAqIFRoaXMgY3VydmUgaXMgZGVmaW5lZCBieSBhIG51bWJlciBvZiBwb2ludHMgKGFsc28gY2FsbGVkIGtub3RzKSBhbmQgaXMgbW9zdCBvZnRlbiBjYWxsZWQgYSBzcGxpbmUuIFRoaXMgc3BsaW5lIGlzIHJvdGF0ZWQgYXJvdW5kIGEgZml4ZWQgcG9pbnQgYW5kIHJlc3VsdHMgaW4gdmFzZS0gYW5kIGJlbGwtbGlrZSBzaGFwZXMuPGJyLz48YnIvPlxuICogSW4gM0QgY29tcHV0ZXIgZ3JhcGhpY3MsIGEgbGF0aGVkIG9iamVjdCBpcyBhIDNEIG1vZGVsIHdob3NlIHZlcnRleCBnZW9tZXRyeSBpcyBwcm9kdWNlZCBieSByb3RhdGluZyB0aGUgcG9pbnRzIG9mIGEgc3BsaW5lIG9yIG90aGVyIHBvaW50IHNldCBhcm91bmQgYSBmaXhlZCBheGlzLlxuICogVGhlIGxhdGhpbmcgbWF5IGJlIHBhcnRpYWw7IHRoZSBhbW91bnQgb2Ygcm90YXRpb24gaXMgbm90IG5lY2Vzc2FyaWx5IGEgZnVsbCAzNjAgZGVncmVlcy5cbiAqIFRoZSBwb2ludCBzZXQgcHJvdmlkaW5nIHRoZSBpbml0aWFsIHNvdXJjZSBkYXRhIGNhbiBiZSB0aG91Z2h0IG9mIGFzIGEgY3Jvc3Mgc2VjdGlvbiB0aHJvdWdoIHRoZSBvYmplY3QgYWxvbmcgYSBwbGFuZSBjb250YWluaW5nIGl0cyBheGlzIG9mIHJhZGlhbCBzeW1tZXRyeS4gPGJyLz48YnIvPlxuICogVGhlIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjTGF0aGVHZW9tZXRyeSc+Zm9sbG93aW5nIGV4YW1wbGU8L2E+IHNob3dzIGEgZ2VvbWV0cnkgd2hpY2ggY2FuIGJlIGdlbmVyYXRlZCB1c2luZyBgTGF0aGVgIGNsYXNzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMYXRoLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IHBvaW50cyA9IFtdO1xuICpcbiAqIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICogICBwb2ludHMucHVzaChcbiAqICAgICBuZXcgVEhSRUUuVmVjdG9yMihcbiAqICAgICAgIChNYXRoLnNpbihpICogMC43KSAqIDE1ICsgNTApIC8gMTAsXG4gKiAgICAgICAoaSAtIDUpICogMC4yXG4gKiAgICAgKVxuICogICApO1xuICogfVxuICpcbiAqIGNvbnN0IGxhdGhlID0gbmV3IExhdGhlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBwb2ludHM6IHBvaW50c1xuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA1MCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMYXRoZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHBvaW50czogW11cbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcG9pbnRzOiBbXVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxhdGhlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIExhdGhlLmRlZmF1bHRzLCBMYXRoZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gTGF0aGVCdWZmZXJHZW9tZXRyeSA6IExhdGhlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBvaW50c1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGF0aGVcbn07XG4iLCJpbXBvcnQge1xuICBMaW5lIGFzIExpbmVOYXRpdmUsXG4gIEJ1ZmZlckdlb21ldHJ5LFxuICBHZW9tZXRyeSxcbiAgQnVmZmVyQXR0cmlidXRlLFxuICBMaW5lQ3VydmUzLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBMaW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBMaW5lIGNvbXBvbmVudCBpcyBnZW5lcmF0ZWQgZnJvbSBhIGN1cnZlL2xpbmUgYW5kIGFtb3VudCBvZiB2ZWN0b3JzIHRoYXQgc2hvdWxkIGJlIHVzZWQgKHBvaW50cykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMaW5lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBMaW5lKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBjdXJ2ZTogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFRIUkVFLlZlY3RvcjMoMTAsIDEwLCAwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMTAsIDMwLCAwKSlcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgTGluZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBjdXJ2ZTogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDEwLCAwLCAwKSksXG4gICAqICAgcG9pbnRzOiA1MFxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjdXJ2ZTogbnVsbCxcbiAgICBwb2ludHM6IDUwXG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBMaW5lLmRlZmF1bHRzLCBMaW5lLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTGluZU5hdGl2ZShnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IHBhcmFtcy5idWZmZXIgPyBuZXcgQnVmZmVyR2VvbWV0cnkoKSA6IG5ldyBHZW9tZXRyeSgpO1xuXG4gICAgaWYgKHBhcmFtcy5idWZmZXIpIHtcbiAgICAgIGNvbnN0IHBwID0gcGFyYW1zLmN1cnZlLmdldFBvaW50cyhwYXJhbXMucG9pbnRzKTtcbiAgICAgIGNvbnN0IHZlcnRzID0gbmV3IEZsb2F0MzJBcnJheShwcC5sZW5ndGggKiAzKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHBwLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGkzID0gaSAqIDM7XG5cbiAgICAgICAgdmVydHNbaTNdID0gcHBbaV0ueDtcbiAgICAgICAgdmVydHNbaTMgKyAxXSA9IHBwW2ldLnk7XG4gICAgICAgIHZlcnRzW2kzICsgMl0gPSBwcFtpXS56O1xuICAgICAgfVxuXG4gICAgICBnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IEJ1ZmZlckF0dHJpYnV0ZSh2ZXJ0cywgMykpO1xuICAgIH0gZWxzZSBnZW9tZXRyeS52ZXJ0aWNlcyA9IHBhcmFtcy5jdXJ2ZS5nZXRQb2ludHMocGFyYW1zLnBvaW50cyk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGluZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEpTT05Mb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEltcG9ydGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbXBvcnRlciBpcyBhIGxvYWRlciBmb3IgbWVzaGVzIGFuZCBhbnkgb3RoZXIgZGF0YSB0byB5b3VyIHNjZW5lXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBJbXBvcnRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgSW1wb3J0ZXIoe1xuICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAqXG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWwpIHsgLy8gZGF0YSBmcm9tIGxvYWRlclxuICogICAgIHJldHVybiBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpOyAvLyBzaG91bGQgcmV0dXJuIHlvdXIgLm5hdGl2ZSAobWVzaCBpbiB0aGlzIGNhc2UpXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEltcG9ydGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIHVybDogJycsXG4gICAqICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuICAgKlxuICAgKiAgIG9uTG9hZCgpIHt9LFxuICAgKiAgIG9uUHJvZ3Jlc3MoKSB7fSxcbiAgICogICBvbkVycm9yKCkge30sXG4gICAqXG4gICAqICAgdGV4dHVyZVBhdGg6IG51bGwsXG4gICAqICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAqICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHVybDogJycsXG4gICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuXG4gICAgb25Mb2FkKCkge30sXG4gICAgb25Qcm9ncmVzcygpIHt9LFxuICAgIG9uRXJyb3IoKSB7fSxcblxuICAgIHRleHR1cmVQYXRoOiBudWxsLFxuICAgIHVzZUN1c3RvbU1hdGVyaWFsOiBmYWxzZSxcblxuICAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAgfVxuICB9O1xuXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnNcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZCBmaWx0ZXJcbiAgICogQGRlc2NyaXB0aW9uIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtUSFJFRS5NZXNofSBvYmplY3QgSW5zdGFuY2UgZm9yIGl0ZXJhdGluZyB0aHJvdWdoIGl0J3MgY2hpbGRyZW4uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlciBGdW5jdGlvbiB3aXRoIGNoaWxkIGFzIGFyZ3VtZW50LCBzaG91bGQgcmV0dXJuIGEgYm9vbGVhbiB3aGV0aGVyIGluY2x1ZGUgdGhlIGNoaWxkIG9yIG5vdC5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gb2JqZWN0IHdpdGggY2hpbGRyZW5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZW1vdmluZyB1bm5lY2Vzc2FyeSBsaWdodHMgZnJvbSBjaGlsZHJlbjwvY2FwdGlvbj5cbiAgICogbmV3IEljb3NhaGVkcm9uKHtcbiAgICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAgICpcbiAgICogICBwYXJzZShncm91cCkgeyAvLyBkYXRhIGZyb20gbG9hZGVyXG4gICAqICAgICByZXR1cm4gSW1wb3J0ZXIuZmlsdGVyKGdyb3VwLCBjaGlsZCA9PiAhY2hpbGQuaXNMaWdodCk7IC8vIHJlbW92ZSBsaWdodHNcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICAgKiB9KS5hZGRUbyhhcHApO1xuICAgKi9cbiAgc3RhdGljIGZpbHRlcihvYmplY3QsIGZpbHRlcikge1xuICAgIGNvbnN0IHByb2Nlc3NGaWx0ZXIgPSBvYmplY3QgPT4ge1xuICAgICAgb2JqZWN0LmNoaWxkcmVuLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2hpbGRyZW4pIHByb2Nlc3NGaWx0ZXIoZWwpO1xuICAgICAgICBpZiAoIWZpbHRlcihlbCkpIG9iamVjdC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9jZXNzRmlsdGVyKG9iamVjdCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSW1wb3J0ZXIuZGVmYXVsdHMsIEltcG9ydGVyLmluc3RydWN0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAocGFyYW1zLnRleHR1cmVQYXRoKSBwYXJhbXMubGFvZGVyLnNldFRleHR1cmVQYXRoKHBhcmFtcy50ZXh0dXJlUGF0aCk7XG5cbiAgICAgIHBhcmFtcy5sb2FkZXIubG9hZChwYXJhbXMudXJsLCAoLi4uZGF0YSkgPT4geyAvLyBnZW9tZXRyeSwgbWF0ZXJpYWxzXG4gICAgICAgIHBhcmFtcy5vbkxvYWQoLi4uZGF0YSk7XG5cbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogcGFyYW1zLnBhcnNlciguLi5kYXRhKX0pLm1lc2g7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5OiBnZW9tLCBtYXRlcmlhbDogbWF0fSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBvYmplY3QuZ2VvbWV0cnksXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy51c2VDdXN0b21NYXRlcmlhbCA/IHBhcmFtcy5tYXRlcmlhbCA6IG9iamVjdC5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob2JqZWN0Lmdlb21ldHJ5KSBvYmplY3QuZ2VvbWV0cnkgPSBnZW9tO1xuICAgICAgICBpZiAob2JqZWN0Lm1hdGVyaWFsKSBvYmplY3QubWF0ZXJpYWwgPSBtYXQ7XG5cbiAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgfSwgcGFyYW1zLm9uUHJvZ3Jlc3MsIHBhcmFtcy5vbkVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJbXBvcnRlclxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIE9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgT2N0YWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBPY3RhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYW4gb2N0YWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCBlaWdodCBmYWNlcy5cbiAqIEEgcmVndWxhciBvY3RhaGVkcm9uIGlzIGEgUGxhdG9uaWMgc29saWQgY29tcG9zZWQgb2YgZWlnaHQgZXF1aWxhdGVyYWwgdHJpYW5nbGVzLCBmb3VyIG9mIHdoaWNoIG1lZXQgYXQgZWFjaCB2ZXJ0ZXguXG4gKiA8YnIvPjxici8+XG4gKiBgT2N0YWhlZHJvbmAgY3JlYXRlcyBhbiBPY3RhaGVkcm9uIG9iamVjdCBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNPY3RhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBPY3RhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBPY3RhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIE9jdGFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLk9jdGFoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT2N0YWhlZHJvbi5kZWZhdWx0cywgT2N0YWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuT2N0YWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBPY3RhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9jdGFoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnksXG4gIFBhcmFtZXRyaWNHZW9tZXRyeSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUGFyYW1ldHJpY1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gYFBhcmFtZXRyaWNgIGdlbmVyYXRlcyBhIGdlb21ldHJ5IHJlcHJlc2VudGluZyBhIDxhIGhyZWY9J2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhcmFtZXRyaWNfc3VyZmFjZSc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogPGJyLz48YnIvPlxuICogSXQgaXMgdXN1YWxseSB1c2VkIHRvIGRldmVsb3AgZGlmZmVyZW50IGtpbmRzIG9mIGhpZ2hmaWVsZHMgb3IgdmlzdWFsaXplIGEgPGEgaHJlZj0naHR0cHM6Ly9zdGVta29za2kuZ2l0aHViLmlvL1RocmVlLmpzL0dyYXBodWx1cy1GdW5jdGlvbi5odG1sJz5tYXRoIGZ1bmN0aW9uPC9hPi5cbiAqIDxici8+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly9tYXRoLmh3cy5lZHUvZ3JhcGhpY3Nib29rL3NvdXJjZS90aHJlZWpzL2N1cnZlcy1hbmQtc3VyZmFjZXMuaHRtbCc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogLSA8YSBocmVmPSdodHRwczovL3N0ZW1rb3NraS5naXRodWIuaW8vVGhyZWUuanMvR3JhcGh1bHVzLVN1cmZhY2UuaHRtbCc+XCJHcmFwaHVsdXNcIjwvYT5cbiAqIDxici8+PGJyLz5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUGFyYW1ldHJpY0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+RXhhbXBsZSBjcmVhdGluZyBhbiBoZWlnaHRmaWVsZC1saWtlIGdlb21ldHJ5LiBgdWAgYW5kIGB2YCBhcmUgbGlrZSBgeGAgYW5kIGB5YCBpbiBzaGFwZSwgYnV0IHRoZWlyIHZhbHVlcyBhcmUgYWx3YXlzIGZyb20gYDBgIHRvIGAxYC5cbiAqIFdlIHVzZSB0aGVtIGluIGBUSFJFRS5WZWN0b3IzYCBsaWtlIGB4YCBhbmQgYHpgIGFuZCBgTWF0aC5yYW5kb20oKSAqIDVgIGZvciBgeWAuPC9jYXB0aW9uPlxuICogY29uc3QgY3JlYXRlUGFyYW1ldHJpYyA9ICh1LCB2KSA9PiB7XG4gKiAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyh1ICogMzAsIE1hdGgucmFuZG9tKCkgKiA1LCB2ICogMzApO1xuICogfVxuICpcbiAqIG5ldyBQYXJhbWV0cmljKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBmdW5jOiBjcmVhdGVQYXJhbWV0cmljXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIC0xMDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQYXJhbWV0cmljIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QYXJhbWV0cmljI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBmdW5jOiAodSwgdikgPT4gbmV3IFZlY3RvcjModSwgdiwgMCksXG4gICAqICAgICBzbGljZXM6IDEwLFxuICAgKiAgICAgdGFja3M6IDEwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGZ1bmM6ICh1LCB2KSA9PiBuZXcgVmVjdG9yMyh1LCB2LCAwKSxcbiAgICAgIHNsaWNlczogMTAsXG4gICAgICBzdGFja3M6IDEwXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBhcmFtZXRyaWMuZGVmYXVsdHMsIFBhcmFtZXRyaWMuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGFyYW1ldHJpY1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkgOiBQYXJhbWV0cmljR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmZ1bmMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2xpY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnN0YWNrc1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGFyYW1ldHJpY1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBsYW5lQnVmZmVyR2VvbWV0cnksXG4gIFBsYW5lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBsYW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBgUGxhbmVgIGlzIHVzZWQgZm9yIGNyZWF0aW5nIHBsYW5lcyBnaXZlbiBzb21lIGB3aWR0aGAgYW5kIGBoZWlnaHRgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNQbGFuZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBQbGFuZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUGxhbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHdpZHRoOiAyMCxcbiAqICAgICBoZWlnaHQ6IDMwXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBsYW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEwLFxuICAgKiAgICAgaGVpZ2h0OiAxMCxcbiAgICogICAgIHdTZWdtZW50czogMSxcbiAgICogICAgIGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMTAsXG4gICAgICBoZWlnaHQ6IDEwLFxuICAgICAgd1NlZ21lbnRzOiAxLFxuICAgICAgaFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICd3U2VnbWVudHMnLCAnaFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3dTZWdtZW50cycsICdoU2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQbGFuZS5kZWZhdWx0cywgUGxhbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBQbGFuZUJ1ZmZlckdlb21ldHJ5IDogUGxhbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBsYW5lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBQb2x5aGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbmNvbnN0IFt2ZXJ0aWNlc09mQ3ViZSwgaW5kaWNlc09mRmFjZXNdID0gW1xuICBbXG4gICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxXG4gIF0sXG4gIFtcbiAgICAyLCAxLCAwLCAwLCAzLCAyLFxuICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAgMCwgMSwgNSwgNSwgNCwgMCxcbiAgICAxLCAyLCA2LCA2LCA1LCAxLFxuICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAgNCwgNSwgNiwgNiwgNywgNFxuICBdXG5dO1xuXG4vKipcbiAqIEBjbGFzcyBQb2x5aGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBlbGVtZW50YXJ5IGdlb21ldHJ5LCBhIHBvbHloZWRyb24gaXMgYSBzb2xpZCBpbiB0aHJlZSBkaW1lbnNpb25zIHdpdGggZmxhdCBwb2x5Z29uYWwgZmFjZXMsIHN0cmFpZ2h0IGVkZ2VzIGFuZCBzaGFycCBjb3JuZXJzIG9yIHZlcnRpY2VzLlxuICogPGJyLz48YnIvPlxuICogYFBvbHloZWRyb25gIGNyZWF0ZXMgYSBQb2x5aGVkcm9uIGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGAuXG4gKiA8YnIvPjxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gUG9seWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUG9seWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2x5aGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIHN0YXRpYyB2ZXJ0aWNlc09mQ3ViZSA9IHZlcnRpY2VzT2ZDdWJlO1xuICBzdGF0aWMgaW5kaWNlc09mRmFjZXMgPSBpbmRpY2VzT2ZGYWNlcztcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgdmVydGljZXNPZkN1YmU6IFtcbiAgICogICAgICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgKiAgICAgICAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAxLCAxLCAtMSwgMSwgMVxuICAgKiAgICAgXSxcbiAgICpcbiAgICogICAgIGluZGljZXNPZkZhY2VzOiBbXG4gICAqICAgICAgIDIsIDEsIDAsIDAsIDMsIDIsXG4gICAqICAgICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAqICAgICAgIDAsIDEsIDUsIDUsIDQsIDAsXG4gICAqICAgICAgIDEsIDIsIDYsIDYsIDUsIDEsXG4gICAqICAgICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAqICAgICAgIDQsIDUsIDYsIDYsIDcsIDRcbiAgICogICAgIF0sXG4gICAqXG4gICAqICAgICByYWRpdXM6IDYsXG4gICAqICAgICBkZXRhaWw6IDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdmVydGljZXNPZkN1YmUsXG4gICAgICBpbmRpY2VzT2ZGYWNlcyxcbiAgICAgIHJhZGl1czogNixcbiAgICAgIGRldGFpbDogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3ZlcnRpY2VzT2ZDdWJlJywgJ2luZGljZXNPZkZhY2VzJywgJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd2ZXJ0aWNlc09mQ3ViZScsICdpbmRpY2VzT2ZGYWNlcycsICdyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUG9seWhlZHJvbi5kZWZhdWx0cywgUG9seWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBQb2x5aGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnZlcnRpY2VzT2ZDdWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmluZGljZXNPZkZhY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBvbHloZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBSaW5nR2VvbWV0cnksXG4gIFJpbmdCdWZmZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUmluZ1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gUmluZyBjbGFzcyBjcmVhdGVzIGEgY2lyY2xlIG9yIGp1c3QgMkQgVG9ydXMuIERvZXMgbm90IHN1cHBvcnQgcGh5c2ljcy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUmluZ0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBSaW5nLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBSaW5nKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBpbm5lclJhZGl1czogNSxcbiAqICAgICBvdXRlclJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICAgc2lkZSBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA4LCAwXSxcbiAqXG4gKiAgIHJvdGF0aW9uOiB7XG4gKiAgICAgeDogTWF0aC5QSS80XG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFJpbmcgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmcjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGlubmVyUmFkaXVzOiAwLFxuICAgKiAgICAgb3V0ZXJSYWRpdXM6IDUwLFxuICAgKiAgICAgdGhldGFTZWdtZW50czogOCxcbiAgICogICAgIHBoaVNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBpbm5lclJhZGl1czogMCxcbiAgICAgIG91dGVyUmFkaXVzOiA1MCxcbiAgICAgIHRoZXRhU2VnbWVudHM6IDgsXG4gICAgICBwaGlTZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICogICAgICdvdXRlclJhZGl1cycsXG4gICAqICAgICAndGhldGFTZWdtZW50cycsXG4gICAqICAgICAncGhpU2VnbWVudHMnLFxuICAgKiAgICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICAgICdvdXRlclJhZGl1cycsXG4gICAgICAndGhldGFTZWdtZW50cycsXG4gICAgICAncGhpU2VnbWVudHMnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUmluZy5kZWZhdWx0cywgUmluZy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZ1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBSaW5nQnVmZmVyR2VvbWV0cnkgOiBSaW5nR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmlubmVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm91dGVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucGhpU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUmluZ1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNoYXBlQnVmZmVyR2VvbWV0cnksXG4gIFNoYXBlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNoYXBlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTaGFwZSBpcyBhIHVuaXZlcnNhbCBjbGFzcy4gSXQgYWxsb3dzIHlvdSB0byBjcmVhdGUgZGlmZmVyZW50IDJEIHNoYXBlcyBpbiAzRCBzY2VuZS48YnIvPlxuICogVW5mb3J0dW5hdGVseSwgbm90IGFsbCBvZiB0aGVtIHN1cHBvcnQgcGh5c2ljcywgYW4gYWx0ZXJuYXRpdmUgaXMgdG8gbWFrZSBhIHNpbWlsYXIgM0Qgb2JqZWN0IGFuZCBzY2FsZSBpdHMgd2lkdGggZG93biB0byBuZWFyIHplcm8uXG4gKiA8YnIvPjxici8+XG4gKiBgU2hhcGVgIGNvbnNpc3RzIG9mIHNoYXBlcyB0aGF0IGFyZSBpbiBpdHMgc2hhcGVzIHBhcmFtZXRlci5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU2hhcGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgcGxhbmUgbG9va2luZyBTaGFwZSBmcm9tIGEgVEhSRUUuU2hhcGUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcmVjdFdpZHRoID0gMTAsXG4gKiByZWN0TGVuZ3RoID0gNTtcbiAqXG4gKiBjb25zdCByZWN0U2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAqIHJlY3RTaGFwZS5tb3ZlVG8oMCwwKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8oMCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgMCk7XG4gKiByZWN0U2hhcGUubGluZVRvKDAsIDApO1xuICpcbiAqIGNvbnN0IHBsYW5lID0gbmV3IFNoYXBlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZTogcmVjdFNoYXBlXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNoYXBlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW11cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU2hhcGUuZGVmYXVsdHMsIFNoYXBlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBTaGFwZUJ1ZmZlckdlb21ldHJ5IDogU2hhcGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2hhcGVzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTaGFwZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNwaGVyZUJ1ZmZlckdlb21ldHJ5LFxuICBTcGhlcmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BoZXJlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTcGhlcmUgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgc3BoZXJlIG9iamVjdHMgYnkgaXRzIHJhZGl1cyBwcm9wZXJ0eSBhbmQgb3RoZXIgdmFsdWVzIHRoYXQgZGV0ZXJtaW5lcyBpdHMgZGV0YWxpdHkuXG4gKiA8YnIvPjxici8+XG4gKiBJdCBpcyBzaW1pbGFyIHRvIFRIUkVFLlNwaGVyZUdlb21ldHJ5LCBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgYFNoYXBlYCBwcm9wZXJ0aWVzLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogPGJyLz48YnIvPlxuICogVGhlbiBpdCBjcmVhdGVzIGFuIGBUaHJlZS5qcyBtZXNoYCBvciBhIGBQaHlzaWpzIG1lc2hgLCB0aGF0IGlzIHNpbWlsYXIgdG8gYFRocmVlLmpzIG1lc2hgLCBidXQgaXQgYWxzbyB0YWtlIGludG8gY29uc2lkZXJhdGlvbiBjb2xsaXNpb24gY2FsY3VsYXRpb25zLlxuICogVGhpcyBtZXNoIGlzIGEgY29tYmluYXRpb24gb2YgYFRocmVlLmpzIGdlb21ldHJ5YCBhbmQgYFBoeXNpanMgbWF0ZXJpYWxgIChUaGUgc2FtZSBhcyBpbiB0aHJlZS5qcywgYnV0IHdpdGggZnJpY3Rpb24gYW5kIHJlc3RpdHV0aW9uKS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU3BoZXJlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwaGVyZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgU3BoZXJlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNwaGVyZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTcGhlcmUuZGVmYXVsdHMsIFNwaGVyZS5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFNwaGVyZUJ1ZmZlckdlb21ldHJ5IDogU3BoZXJlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcGhlcmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBUZXRyYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUZXRyYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgdGV0cmFoZWRyb24gaXMgYSBwb2x5aGVkcm9uIGNvbXBvc2VkIG9mIGZvdXIgdHJpYW5ndWxhciBmYWNlcywgc2l4IHN0cmFpZ2h0IGVkZ2VzLCBhbmQgZm91ciB2ZXJ0ZXggY29ybmVycy5cbiAqIFRoZSB0ZXRyYWhlZHJvbiBpcyB0aGUgc2ltcGxlc3Qgb2YgYWxsIHRoZSBvcmRpbmFyeSBjb252ZXggcG9seWhlZHJhIGFuZCB0aGUgb25seSBvbmUgdGhhdCBoYXMgZmV3ZXIgdGhhbiA1IGZhY2VzLlxuICogPGJyLz48YnIvPlxuICogYFRldHJhaGVkcm9uYCBjcmVhdGVzIGEgVGV0cmFoZWRyb24gb2JqZWN0IGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGBcbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVGV0cmFoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVGV0cmFoZWRyb24sIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRldHJhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVGV0cmFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXRyYWhlZHJvbi5kZWZhdWx0cywgVGV0cmFoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBUZXRyYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUZXRyYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIEZvbnQsXG4gIE1lc2gsXG4gIFRleHRHZW9tZXRyeSxcbiAgRm9udExvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVGV4dFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVGV4dCBjbGFzcyBpcyBtYWRlIGZvciBjcmVhdGluZyAzRCB0ZXh0IG9iamVjdHMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RleHRHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogPGJyLz48YnIvPlxuICogUGh5c2ljcyB0ZXh0IG9iamVjdCBjYW4gYmUgY29udmV4IG9yIGNvbmNhdmUuIEJ5IGRlZmF1bHQgaXQncyBjb252ZXggYnV0IHlvdSBjYW4gYWxzbyBzd2l0Y2ggdG8gY29uY2F2ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRleHQsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRleHQoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHRleHQ6ICdoZWxsbyB3b3JsZCcsXG4gKiAgICAgcGFyYW1ldGVyczoge1xuICogICAgICAgZm9udDogJ3BhdGgvdG8vZm9udC50eXBlZmFjZS5qcycsXG4gKiAgICAgICBzaXplOiAyMCxcbiAqICAgICAgIGhlaWdodDogNSxcbiAqICAgICAgIGN1cnZlU2VnbWVudHM6IDZcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IC00MCxcbiAqICAgICB5OiAyMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRleHQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgdGV4dDogJ0hlbGxvIFdvcmxkIScsXG4gICAqICAgbG9hZGVyOiBuZXcgRm9udExvYWRlcigpLFxuICAgKlxuICAgKiAgIHBhcmFtZXRlcnM6IHtcbiAgICogICAgIHNpemU6IDEyLFxuICAgKiAgICAgaGVpZ2h0OiA1MCxcbiAgICogICAgIGN1cnZlU2VnbWVudHM6IDEyLFxuICAgKiAgICAgZm9udDogbmV3IEZvbnQoKSxcbiAgICogICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gICAqICAgICBiZXZlbFRoaWNrbmVzczogMTAsXG4gICAqICAgICBiZXZlbFNpemU6IDhcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICB0ZXh0OiAnSGVsbG8gV29ybGQhJyxcbiAgICBsb2FkZXI6IG5ldyBGb250TG9hZGVyKCksXG5cbiAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICBzaXplOiAxMixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjdXJ2ZVNlZ21lbnRzOiAxMixcbiAgICAgIGZvbnQ6IG5ldyBGb250KCksXG4gICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgYmV2ZWxUaGlja25lc3M6IDEwLFxuICAgICAgYmV2ZWxTaXplOiA4XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXh0LmRlZmF1bHRzLCBNZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXh0XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHBhcmFtcy5sb2FkZXIubG9hZChwYXJhbXMucGFyYW1ldGVycy5mb250LCBmb250ID0+IHtcbiAgICAgICAgcGFyYW1zLnBhcmFtZXRlcnMuZm9udCA9IGZvbnQ7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogbmV3IFRleHRHZW9tZXRyeShcbiAgICAgICAgICAgIHBhcmFtcy50ZXh0LFxuICAgICAgICAgICAgcGFyYW1zLnBhcmFtZXRlcnNcbiAgICAgICAgICApLFxuXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlKFxuICAgICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgICAgbWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgICAgICAgIH0pLm1lc2hcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc3VwZXIud2FpdChwcm9taXNlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRleHRcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0dlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUb3J1c1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXMgY2xhc3MgbWFrZXMgYSB0b3J1cyBmaWd1cmUuIEEgZG9udXQgaXMgYSB0b3J1cy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVG9ydXNHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXMsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRvcnVzKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDUsXG4gKiAgICAgdHViZTogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAzNVxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1cyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXMjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMTAwLFxuICAgKiAgICAgdHViZTogNDAsXG4gICAqICAgICByYWRpYWxTZWdtZW50czogOCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogNixcbiAgICogICAgIGFyYzogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxMDAsXG4gICAgICB0dWJlOiA0MCxcbiAgICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgICAgdHVidWxhclNlZ21lbnRzOiA2LFxuICAgICAgYXJjOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAndHViZScsXG4gICAqICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgKiAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAqICAgICAnYXJjJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3R1YmUnLFxuICAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgICAgJ2FyYydcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVzLmRlZmF1bHRzLCBUb3J1cy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFRvcnVzR2VvbWV0cnkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmFyY1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSxcbiAgVG9ydXNLbm90R2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRvcnVza25vdFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXNrbm90IGNsYXNzIG1ha2VzIGEgdG9ydXNrbm90IGZpZ3VyZS4gSXQncyBsaWtlIGEgY3Jvb2tlZCBkb251dCwgdmVyeSBjcm9va2VkLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUb3J1c0tub3RHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXNrbm90LCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUb3J1c2tub3Qoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czo1LFxuICogICAgIHR1YmU6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczoge1xuICogICAgIHk6IDEwMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1c2tub3QgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxMDAsXG4gICAqICAgICB0dWJlOiA0MCxcbiAgICogICAgIHJhZGlhbFNlZ21lbnRzOiA2NCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogOCxcbiAgICogICAgIHA6IDIsXG4gICAqICAgICBxOiAzXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMTAwLFxuICAgICAgdHViZTogNDAsXG4gICAgICByYWRpYWxTZWdtZW50czogNjQsXG4gICAgICB0dWJ1bGFyU2VnbWVudHM6IDgsXG4gICAgICBwOiAyLFxuICAgICAgcTogM1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3R1YmUnLFxuICAgKiAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICogICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgKiAgICAgJ3AnLFxuICAgKiAgICAgJ3EnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1cycsXG4gICAgICAndHViZScsXG4gICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAgICAncCcsXG4gICAgICAncSdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVza25vdC5kZWZhdWx0cywgVG9ydXNrbm90Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3RcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBHQ29uc3RydWN0ID0gcGFyYW1zLmJ1ZmZlciA/IFRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IDogVG9ydXNLbm90R2VvbWV0cnk7XG5cbiAgICByZXR1cm4gbmV3IEdDb25zdHJ1Y3QoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnAsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNrbm90XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGluZUN1cnZlMyxcbiAgVmVjdG9yMyxcbiAgVHViZUJ1ZmZlckdlb21ldHJ5LFxuICBUdWJlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFR1YmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFR1YmUgY2xhc3MgbWFrZXMgYSB0dWJlIHRoYXQgZXh0cnVkZXMgYWxvbmcgYSAzZCBjdXJ2ZS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVHViZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUdWJlIGZyb20gYSB0aHJlZS5qcyBDdXJ2ZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCBDdXN0b21TaW5DdXJ2ZSA9IFRIUkVFLkN1cnZlLmNyZWF0ZShcbiAqICAgZnVuY3Rpb24gKHNjYWxlKSB7IC8vIGN1c3RvbSBjdXJ2ZSBjb25zdHJ1Y3RvclxuICogICAgIHRoaXMuc2NhbGUgPSAoc2NhbGUgPT09IHVuZGVmaW5lZCkgPyAxIDogc2NhbGU7XG4gKiAgIH0sXG4gKlxuICogICBmdW5jdGlvbiAodCkgeyAvLyBnZXRQb2ludDogdCBpcyBiZXR3ZWVuIDAtMVxuICogICAgIGNvbnN0IHR4ID0gdCAqIDMgLSAxLjUsXG4gKiAgICAgdHkgPSBNYXRoLnNpbiggMiAqIE1hdGguUEkgKiB0ICksXG4gKiAgICAgdHogPSAwO1xuICpcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjModHgsIHR5LCB0eikubXVsdGlwbHlTY2FsYXIodGhpcy5zY2FsZSk7XG4gKiAgIH1cbiAqICk7XG4gKlxuICogY29uc3QgcGF0aCA9IG5ldyBDdXN0b21TaW5DdXJ2ZSgxMCk7XG4gKlxuICogbmV3IFR1YmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBhdGg6IHBhdGhcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVHViZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcGF0aDogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSxcbiAgICogICAgIHNlZ21lbnRzOiAyMCxcbiAgICogICAgIHJhZGl1czogMixcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiA4LFxuICAgKiAgICAgY2xvc2VkOiBmYWxzZVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwYXRoOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMSkpLFxuICAgICAgc2VnbWVudHM6IDIwLFxuICAgICAgcmFkaXVzOiAyLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDgsXG4gICAgICBjbG9zZWQ6IGZhbHNlXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdwYXRoJyxcbiAgICogICAgICdzZWdtZW50cycsXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgICAnY2xvc2VkJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdwYXRoJyxcbiAgICAgICdzZWdtZW50cycsXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnY2xvc2VkJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVHViZS5kZWZhdWx0cywgVHViZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gVHViZUJ1ZmZlckdlb21ldHJ5IDogVHViZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wYXRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5jbG9zZWRcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFR1YmVcbn07XG4iLCJpbXBvcnQge09iamVjdDNEfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9Db21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBHcm91cFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU29tZXRpbWVzIHlvdSBuZWVkIHRvIG1ha2UgZ3JvdXBzIG9mIG9iamVjdHMgKGl0J3Mgbm90IGNvbnZlbmllbnRseSB0byBhcHBseSB0cmFuc2Zvcm1zIHRvIGVhY2ggb2JqZWN0IHdoZW4gY2FuIG1ha2UganVzdCBvbmUgdG8gYSBncm91cCkuPGJyLz5cbiAqIEluIFRocmVlLmpzIHlvdSBtYWtlIGl0IHVzaW5nIGBUSFJFRS5PYmplY3QzRGAgYW5kIGl0J3MgY2hpbGRyZW4uIDxici8+PGJyLz5cbiAqIEluIHdocy5qcyB3ZSBoYXZlIGBHcm91cGBcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBBZGRpbmcgb2JqZWN0cyB0byBhbiBlbXB0eSBncm91cDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNwaGVyZSA9IG5ldyBTcGhlcmUoKTtcbiAqIGNvbnN0IGJveCA9IG5ldyBCb3goKTtcbiAqIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gKlxuICogc3BoZXJlLmFkZFRvKGdyb3VwKTtcbiAqIGJveC5hZGRUbyhncm91cCk7XG4qIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBNYWtpbmcgYSBncm91cCBmcm9tIG9iamVjdHM8L2NhcHRpb24+XG4gKiBjb25zdCBzcGhlcmUgPSBuZXcgU3BoZXJlKCk7XG4gKiBjb25zdCBib3ggPSBuZXcgQm94KCk7XG4gKiBjb25zdCBncm91cCA9IG5ldyBHcm91cChib3gsIHNwaGVyZSk7XG4gKiAvLyBPUjogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoW2JveCwgc3BoZXJlXSk7XG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKC4uLm9iamVjdHMpIHtcbiAgICBzdXBlcih7fSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG9iaiA9IG9iamVjdHNbaV07XG5cbiAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBDb21wb25lbnQpIG9iai5hZGRUbyh0aGlzKTtcbiAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdDNEKSB0aGlzLm5hdGl2ZS5hZGQob2JqKTtcbiAgICB9XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdDNEKCk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgR3JvdXBcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL21lc2hlcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9Cb3gnO1xuZXhwb3J0ICogZnJvbSAnLi9DaXJjbGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db25lJztcbmV4cG9ydCAqIGZyb20gJy4vQ3lsaW5kZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Eb2RlY2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9FeHRydWRlJztcbmV4cG9ydCAqIGZyb20gJy4vSWNvc2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9MYXRoZSc7XG5leHBvcnQgKiBmcm9tICcuL0xpbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9JbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL09jdGFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9QYXJhbWV0cmljJztcbmV4cG9ydCAqIGZyb20gJy4vUGxhbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2x5aGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vUmluZyc7XG5leHBvcnQgKiBmcm9tICcuL1NoYXBlJztcbmV4cG9ydCAqIGZyb20gJy4vU3BoZXJlJztcbmV4cG9ydCAqIGZyb20gJy4vVGV0cmFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0JztcbmV4cG9ydCAqIGZyb20gJy4vVG9ydXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Ub3J1c2tub3QnO1xuZXhwb3J0ICogZnJvbSAnLi9UdWJlJztcbmV4cG9ydCAqIGZyb20gJy4vR3JvdXAnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRWxlbWVudE1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRhaW5lcj1kb2N1bWVudC5ib2R5XSBjb250YWluZXIgaXMgdGhlIERPTSBvYmplY3QgdG8gd2hpY2ggYXBwbGljYXRpb24ncyBjYW52YXMgd2lsbCBiZSBhZGRlZCB0by5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGVsZW1lbnQgbW9kdWxlLCBwYXNzaW5nIGl0IHRvIHRoZSBBcHA8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgbmV3IEVsZW1lbnRNb2R1bGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVtZW50TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSkge1xuICAgIGlmIChjb250YWluZXIuY29udGFpbmVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0VsZW1lbnRNb2R1bGUgbm93IGFjY2VwdHMgb25seSBhcmd1bWVudCB3aGljaCBpcyBhIERPTSBvYmplY3QsIG5vdCBhIHBhcmFtcyBvYmplY3QuJyk7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lci5jb250YWluZXI7XG4gICAgfSBlbHNlIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjcmVhdGVFbGVtZW50XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIGNhbnZhcyBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3docy1hcHAnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICdpbmhlcml0JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJ2luaGVyaXQnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnZWxlbWVudCcsIHRoaXMuZWxlbWVudCk7XG4gICAgbWFuYWdlci5zZXQoJ2NvbnRhaW5lcicsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgV2ViR0xSZW5kZXJlcixcbiAgVmVjdG9yMlxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuLyoqXG4gKiBAY2xhc3MgUmVuZGVyaW5nTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgcmVuZGVyaW5nIG1vZHVsZSBhbmQgcGFzc2luZyBpdCB0byBBcHAncyBtb2R1bGVzPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIG5ldyBFbGVtZW50TW9kdWxlKCksXG4gKiAgIG5ldyBTY2VuZU1vZHVsZSgpLFxuICogICBuZXcgQ2FtZXJhTW9kdWxlKHtcbiAqICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgNiwgMTgpLFxuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSksXG4gKiAgIG5ldyBSZW5kZXJpbmdNb2R1bGUoe1xuICogICAgIGJnQ29sb3I6IDB4MTYyMTI5LFxuICpcbiAqICAgICByZW5kZXJlcjoge1xuICogICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICogICAgICAgc2hhZG93bWFwOiB7XG4gKiAgICAgICAgIHR5cGU6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiAgIH0sIHtzaGFkb3c6IHRydWV9KVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJpbmdNb2R1bGUge1xuICBzdGF0aWMgYWRkaXRpb25hbCA9IHtcbiAgICBzaGFkb3cocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBlbmFibGVkID0gdHJ1ZTtcblxuICBkZWZlciA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCB7c2hhZG93OiBpc1NoYWRvd30gPSB7c2hhZG93OiBmYWxzZX0pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cbiAgICAgIHJlc29sdXRpb246IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgcGl4ZWxSYXRpbzogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG5cbiAgICAgIGJnQ29sb3I6IDB4MDAwMDAwLFxuICAgICAgYmdPcGFjaXR5OiAxLFxuXG4gICAgICByZW5kZXJlcjoge31cbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgY29uc3Qge1xuICAgICAgYmdDb2xvcixcbiAgICAgIGJnT3BhY2l0eSxcbiAgICAgIHJlbmRlcmVyLFxuICAgICAgcGl4ZWxSYXRpbyxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcmVzb2x1dGlvblxuICAgIH0gPSB0aGlzLnBhcmFtcztcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcihyZW5kZXJlcik7XG4gICAgdGhpcy5lZmZlY3RzID0gW107XG4gICAgdGhpcy5hcHBseUFkZGl0aW9uYWwoJ3NoYWRvdycsIGlzU2hhZG93KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihcbiAgICAgIGJnQ29sb3IsXG4gICAgICBiZ09wYWNpdHlcbiAgICApO1xuXG4gICAgaWYgKHBpeGVsUmF0aW8pIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhwaXhlbFJhdGlvKTtcblxuICAgIHRoaXMuc2V0U2l6ZShcbiAgICAgIE51bWJlcih3aWR0aCAqIHJlc29sdXRpb24ueCkudG9GaXhlZCgpLFxuICAgICAgTnVtYmVyKGhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpXG4gICAgKTtcbiAgfVxuXG4gIGFwcGx5QWRkaXRpb25hbChuYW1lLCBpc0FwcGxpZWQgPSBmYWxzZSkge1xuICAgIGlmICghaXNBcHBsaWVkKSByZXR1cm47XG4gICAgUmVuZGVyaW5nTW9kdWxlLmFkZGl0aW9uYWxbbmFtZV0uYXBwbHkodGhpcywgW3RoaXMucmVuZGVyZXJdKTtcbiAgfVxuXG4gIGludGVncmF0ZVJlbmRlcmVyKGVsZW1lbnQsIHNjZW5lLCBjYW1lcmEpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoKCkgPT4gdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpKTtcbiAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTG9vcDtcbiAgfVxuXG4gIGVmZmVjdChlZmZlY3QsIGNiKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG5cbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcbiAgICAgIGVmZmVjdC5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblxuICAgICAgY29uc3QgbG9vcCA9IG5ldyBMb29wKGNiID8gY2IgOiAoKSA9PiB7XG4gICAgICAgIGVmZmVjdC5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKGxvb3ApO1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkgbG9vcC5zdGFydCh0aGlzLmFwcCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRTaXplXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgcmVuZGVyIHRhcmdldCB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlbmRlcmluZ01vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cbiAgICAvLyBhdHRhY2ggdG8gbmV3IHBhcmVudCB3b3JsZCBkb21cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG4gICAgdGhpcy5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AoKSk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdGFydCgpO1xuICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdGFydCgpKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZW5kZXJpbmcnKTtcbiAgICBtYW5hZ2VyLnNldCgncmVuZGVyZXInLCB0aGlzLnJlbmRlcmVyKTtcblxuICAgIHRoaXMuYXBwID0gbWFuYWdlci5oYW5kbGVyO1xuXG4gICAgdGhpcy5yZW5kZXJMb29wID0gdGhpcy5pbnRlZ3JhdGVSZW5kZXJlcihcbiAgICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JyksXG4gICAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKSxcbiAgICAgIG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmVcbiAgICApO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgZWxlbWVudDogZWxlbWVudCA9PiB7XG4gICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCk7XG4gICAgICB9LFxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNvbHZlKCk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYucmVuZGVyTG9vcC5zdGFydCh0aGlzKTtcbiAgICBzZWxmLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RhcnQodGhpcykpO1xuICB9XG5cbiAgZGlzcG9zZShzZWxmKSB7XG4gICAgc2VsZi5yZW5kZXJMb29wLnN0b3AodGhpcyk7XG4gICAgc2VsZi5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AodGhpcykpO1xuICAgIHNlbGYucmVuZGVyZXIuZm9yY2VDb250ZXh0TG9zcygpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBTY2VuZVxufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIFNjZW5lTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpbGxTY2VuZUJlUmVwbGFjZWQ9ZmFsc2VdIHdpbGxTY2VuZUJlUmVwbGFjZWQgc2hvdWxkIGJlIHRydWUgb25seSBpZiB5b3UgYXJlIGdvaW5nIHRvIG92ZXJ3cml0ZSBzY2VuZSBkZXBlbmRlbmN5IGV2ZW4gd2l0aG91dCB0aGUgdXNlIG9mIGRlZmF1bHQgb25lLlxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgU2NlbmVNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih3aWxsU2NlbmVCZVJlcGxhY2VkID0gZmFsc2UpIHtcbiAgICB0aGlzLnNjZW5lID0gd2lsbFNjZW5lQmVSZXBsYWNlZCA/IG51bGwgOiBuZXcgU2NlbmUoKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdzY2VuZScsIHRoaXMuc2NlbmUpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG5cbiAgICB0aGlzLmFkZCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBvYmplY3QuZGVmZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtuYXRpdmV9ID0gb2JqZWN0O1xuICAgICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICAgIGNvbnN0IGFkZFByb21pc2UgPSB0aGlzLmFwcGx5QnJpZGdlKHtvbkFkZDogb2JqZWN0fSkub25BZGQ7XG5cbiAgICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuc2NlbmUuYWRkKG5hdGl2ZSk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoYWRkUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICBhZGRQcm9taXNlLnRoZW4ocmVzb2x2ZXIpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICAgIHNlbGYuc2NlbmUucmVtb3ZlKG9iamVjdC5uYXRpdmUpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldFNjZW5lID0gZnVuY3Rpb24gKHNjZW5lKSB7XG4gICAgICBzZWxmLnNjZW5lID0gc2NlbmU7XG4gICAgICB0aGlzLm1hbmFnZXIuc2V0KCdzY2VuZScsIHNjZW5lKTtcbiAgICB9O1xuICB9XG59XG4iLCIvLyBpbXBvcnQge2FkZFJlc2l6ZUxpc3RlbmVyfSBmcm9tICdkZXRlY3QtZWxlbWVudC1yZXNpemUnO1xuXG4vKipcbiAqIEBjbGFzcyBSZXNpemVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2F1dG86IHRydWV9XSAtIElmIGF1dG8gaXMgc2V0IHRvIHRydWUgLSByZXNpemUgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBjb250YWluZXIgcmVzaXplc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgUmVzaXplTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYXV0bzogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IFt0aGlzLnNldFNpemUuYmluZCh0aGlzKV07XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIHNldFNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHByb3ZpZGVkIHdpZHRoICYgaGVpZ2h0IHRvIHRoZSByZW5kZXJlciBvYmplY3QuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGg9MV0gLSBUaGUgcHJvbWlzZSB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byBhIHF1ZXVlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodD0xXSAtIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCA9IDEsIGhlaWdodCA9IDEpIHtcbiAgICB0aGlzLmNhbWVyYS5uYXRpdmUuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgdGhpcy5jYW1lcmEubmF0aXZlLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmluZykgdGhpcy5yZW5kZXJpbmcuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHRyaWdnZXJcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUcmlnZ2VycyByZXNpemUgd2hlbiBjYWxsZWQuIHdpZHRoICYgaGVpZ2h0IGFyZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHlcbiAgICogVGhpcyBpbnZva2VzIGVhY2ggY2FsbGJhY2tzIHdpdGggdGhlIG5ldyB3aWR0aCBhbmQgaGVpZ2h0IGFzIHBhcmFtc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgdHJpZ2dlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXI6IHtcbiAgICAgICAgb2Zmc2V0V2lkdGgsXG4gICAgICAgIG9mZnNldEhlaWdodFxuICAgICAgfSxcbiAgICAgIHJlc29sdXRpb25cbiAgICB9ID0gdGhpcztcblxuICAgIGNvbnN0IHdpZHRoID0gTnVtYmVyKG9mZnNldFdpZHRoICogcmVzb2x1dGlvbi54KS50b0ZpeGVkKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKG9mZnNldEhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpO1xuXG4gICAgdGhpcy5jYWxsYmFja3MuZm9yRWFjaChjYiA9PiB7XG4gICAgICBjYih3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZEF1dG9yZXNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIG1vZHVsZSB0byBhdXRvcmVzaXplLCB0aGlzIGFkZHMgYW4gZXZlbnQgbGlzdGVuZSBvbiB3aW5kb3cgcmVzaXplIHRvIHRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgYWRkQXV0b3Jlc2l6ZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29udGFpbmVyKCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGhpcy5nZXRSZXNvbHV0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYXV0bykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudHJpZ2dlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZENhbGxiYWNrXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIGNhbGwgYmFjayBmdW5jdGlvbiB0byB0aGUgZXhpc3RpbmcgY2FsbGJhY2tzIGxpc3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYWRkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBhZGRDYWxsYmFjayhmdW5jKSB7XG4gICAgdGhpcy5jYWxsYmFja3MucHVzaChmdW5jKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZXNpemUnKTtcblxuICAgIHRoaXMucmVuZGVyaW5nID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJyk7XG5cbiAgICB0aGlzLmdldFJlc29sdXRpb24gPSAoKSA9PiBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykucGFyYW1zLnJlc29sdXRpb247XG4gICAgdGhpcy5nZXRDb250YWluZXIgPSAoKSA9PiBtYW5hZ2VyLmdldCgnY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmFkZEF1dG9yZXNpemUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2MDtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MTtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MztcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIHRvcCBsZWZ0IHRleGVsLlxcclxcblxcdHZlYzQgc3VtID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYwKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgdG9wIHJpZ2h0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjEpO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSBib3R0b20gcmlnaHQgdGV4ZWwuXFxyXFxuXFx0c3VtICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2Mik7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIGJvdHRvbSBsZWZ0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjMpO1xcclxcblxcclxcblxcdC8vIENvbXB1dGUgdGhlIGF2ZXJhZ2UuXFxyXFxuXFx0Z2xfRnJhZ0NvbG9yID0gc3VtICogMC4yNTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG51bmlmb3JtIHZlYzIgaGFsZlRleGVsU2l6ZTtcXHJcXG51bmlmb3JtIGZsb2F0IGtlcm5lbDtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2MDtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MTtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2MztcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBkVXYgPSAodGV4ZWxTaXplICogdmVjMihrZXJuZWwpKSArIGhhbGZUZXhlbFNpemU7XFxyXFxuXFxyXFxuXFx0dlV2MCA9IHZlYzIodXYueCAtIGRVdi54LCB1di55ICsgZFV2LnkpO1xcclxcblxcdHZVdjEgPSB2ZWMyKHV2LnggKyBkVXYueCwgdXYueSArIGRVdi55KTtcXHJcXG5cXHR2VXYyID0gdmVjMih1di54ICsgZFV2LngsIHV2LnkgLSBkVXYueSk7XFxyXFxuXFx0dlV2MyA9IHZlYzIodXYueCAtIGRVdi54LCB1di55IC0gZFV2LnkpO1xcclxcblxcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEFuIG9wdGltaXNlZCBjb252b2x1dGlvbiBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIHRoZSBHREMyMDAzIFByZXNlbnRhdGlvbiBieSBNYXNha2kgS2F3YXNlLCBCdW5rYXNoYSBHYW1lczpcclxuICogIEZyYW1lIEJ1ZmZlciBQb3N0cHJvY2Vzc2luZyBFZmZlY3RzIGluIERPVUJMRS1TLlQuRS5BLkwgKFdyZWNrbGVzcylcclxuICogYW5kIGFuIGFydGljbGUgYnkgRmlsaXAgU3RydWdhciwgSW50ZWw6XHJcbiAqICBBbiBpbnZlc3RpZ2F0aW9uIG9mIGZhc3QgcmVhbC10aW1lIEdQVS1iYXNlZCBpbWFnZSBibHVyIGFsZ29yaXRobXNcclxuICpcclxuICogRnVydGhlciBtb2RpZmllZCBhY2NvcmRpbmcgdG8gQXBwbGUnc1xyXG4gKiBbQmVzdCBQcmFjdGljZXMgZm9yIFNoYWRlcnNdKGh0dHBzOi8vZ29vLmdsL2xtUm9NNSkuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnZvbHV0aW9uTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY29udm9sdXRpb24gbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjJ9IFt0ZXhlbFNpemVdIC0gVGhlIGFic29sdXRlIHNjcmVlbiB0ZXhlbCBzaXplLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0ZXhlbFNpemUgPSBuZXcgVmVjdG9yMigpKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJDb252b2x1dGlvbk1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dGV4ZWxTaXplOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigpKSxcclxuXHRcdFx0XHRoYWxmVGV4ZWxTaXplOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigpKSxcclxuXHRcdFx0XHRrZXJuZWw6IG5ldyBVbmlmb3JtKDAuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnNldFRleGVsU2l6ZSh0ZXhlbFNpemUueCwgdGV4ZWxTaXplLnkpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGN1cnJlbnQga2VybmVsIHNpemUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0XHQgKiBAZGVmYXVsdCBLZXJuZWxTaXplLkxBUkdFXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmtlcm5lbFNpemUgPSBLZXJuZWxTaXplLkxBUkdFO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGtlcm5lbC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gVGhlIGtlcm5lbC5cclxuXHQgKi9cclxuXHJcblx0Z2V0S2VybmVsKCkgeyByZXR1cm4ga2VybmVsUHJlc2V0c1t0aGlzLmtlcm5lbFNpemVdOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHRleGVsIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0geCAtIFRoZSB0ZXhlbCB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0geSAtIFRoZSB0ZXhlbCBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFRleGVsU2l6ZSh4LCB5KSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy50ZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpO1xyXG5cdFx0dGhpcy51bmlmb3Jtcy5oYWxmVGV4ZWxTaXplLnZhbHVlLnNldCh4LCB5KS5tdWx0aXBseVNjYWxhcigwLjUpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEthd2FzZSBibHVyIGtlcm5lbCBwcmVzZXRzLlxyXG4gKlxyXG4gKiBAdHlwZSB7RmxvYXQzMkFycmF5W119XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxuY29uc3Qga2VybmVsUHJlc2V0cyA9IFtcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAxLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMS4wLCAyLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAyLjAsIDMuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDMuMCwgNC4wLCA0LjAsIDUuMF0pLFxyXG5cdG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMS4wLCAyLjAsIDMuMCwgNC4wLCA1LjAsIDcuMCwgOC4wLCA5LjAsIDEwLjBdKVxyXG5dO1xyXG5cclxuLyoqXHJcbiAqIEEga2VybmVsIHNpemUgZW51bWVyYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJZX1NNQUxMIC0gQSB2ZXJ5IHNtYWxsIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSA3eDcgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTTUFMTCAtIEEgc21hbGwga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDE1eDE1IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTUVESVVNIC0gQSBtZWRpdW0gc2l6ZWQga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDIzeDIzIEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTEFSR0UgLSBBIGxhcmdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAzNXgzNSBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFZFUllfTEFSR0UgLSBBIHZlcnkgbGFyZ2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDYzeDYzIEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gSFVHRSAtIEEgaHVnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMTI3eDEyNyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgS2VybmVsU2l6ZSA9IHtcclxuXHJcblx0VkVSWV9TTUFMTDogMCxcclxuXHRTTUFMTDogMSxcclxuXHRNRURJVU06IDIsXHJcblx0TEFSR0U6IDMsXHJcblx0VkVSWV9MQVJHRTogNCxcclxuXHRIVUdFOiA1XHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcdGdsX0ZyYWdDb2xvciA9IG9wYWNpdHkgKiB0ZXhlbDtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBzaW1wbGUgY29weSBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvcHlNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjb3B5IG1hdGVyaWFsLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkNvcHlNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdG9wYWNpdHk6IG5ldyBVbmlmb3JtKDEuMClcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoYWRlciBtYXRlcmlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcG9zdCBwcm9jZXNzaW5nIHBhc3Nlcy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9tYXRlcmlhbHNcclxuICovXHJcblxyXG5leHBvcnQgeyBBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCB9IGZyb20gXCIuL2FkYXB0aXZlLWx1bWlub3NpdHkuanNcIjtcclxuZXhwb3J0IHsgQm9rZWhNYXRlcmlhbCB9IGZyb20gXCIuL2Jva2VoLmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoMk1hdGVyaWFsIH0gZnJvbSBcIi4vYm9rZWgyLmpzXCI7XHJcbmV4cG9ydCB7IENvbWJpbmVNYXRlcmlhbCB9IGZyb20gXCIuL2NvbWJpbmUuanNcIjtcclxuZXhwb3J0IHsgQ29udm9sdXRpb25NYXRlcmlhbCwgS2VybmVsU2l6ZSB9IGZyb20gXCIuL2NvbnZvbHV0aW9uLmpzXCI7XHJcbmV4cG9ydCB7IENvcHlNYXRlcmlhbCB9IGZyb20gXCIuL2NvcHkuanNcIjtcclxuZXhwb3J0IHsgRGVwdGhNYXRlcmlhbCB9IGZyb20gXCIuL2RlcHRoLmpzXCI7XHJcbmV4cG9ydCB7IERvdFNjcmVlbk1hdGVyaWFsIH0gZnJvbSBcIi4vZG90LXNjcmVlbi5qc1wiO1xyXG5leHBvcnQgeyBGaWxtTWF0ZXJpYWwgfSBmcm9tIFwiLi9maWxtLmpzXCI7XHJcbmV4cG9ydCB7IEdsaXRjaE1hdGVyaWFsIH0gZnJvbSBcIi4vZ2xpdGNoLmpzXCI7XHJcbmV4cG9ydCB7IEdvZFJheXNNYXRlcmlhbCB9IGZyb20gXCIuL2dvZC1yYXlzLmpzXCI7XHJcbmV4cG9ydCB7IEx1bWlub3NpdHlNYXRlcmlhbCB9IGZyb20gXCIuL2x1bWlub3NpdHkuanNcIjtcclxuZXhwb3J0IHsgUGl4ZWxhdGlvbk1hdGVyaWFsIH0gZnJvbSBcIi4vcGl4ZWxhdGlvbi5qc1wiO1xyXG5leHBvcnQgeyBTaG9ja1dhdmVNYXRlcmlhbCB9IGZyb20gXCIuL3Nob2NrLXdhdmUuanNcIjtcclxuZXhwb3J0IHsgU01BQUJsZW5kTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLWJsZW5kLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLWNvbG9yLWVkZ2VzLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFXZWlnaHRzTWF0ZXJpYWwgfSBmcm9tIFwiLi9zbWFhLXdlaWdodHMuanNcIjtcclxuZXhwb3J0IHsgVG9uZU1hcHBpbmdNYXRlcmlhbCB9IGZyb20gXCIuL3RvbmUtbWFwcGluZy5qc1wiO1xyXG4iLCJpbXBvcnQgeyBTY2VuZSwgTWVzaCwgT3J0aG9ncmFwaGljQ2FtZXJhLCBQbGFuZUJ1ZmZlckdlb21ldHJ5IH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG4vKipcclxuICogQW4gYWJzdHJhY3QgcGFzcy5cclxuICpcclxuICogUGFzc2VzIHRoYXQgZG8gbm90IHJlbHkgb24gdGhlIGRlcHRoIGJ1ZmZlciBzaG91bGQgZXhwbGljaXRseSBkaXNhYmxlIHRoZVxyXG4gKiBkZXB0aCB0ZXN0IGFuZCBkZXB0aCB3cml0ZSBpbiB0aGVpciByZXNwZWN0aXZlIHNoYWRlciBtYXRlcmlhbHMuXHJcbiAqXHJcbiAqIFRoaXMgY2xhc3MgaW1wbGVtZW50cyBhIHtAbGluayBQYXNzI2Rpc3Bvc2V9IG1ldGhvZCB0aGF0IGZyZWVzIG1lbW9yeSBvblxyXG4gKiBkZW1hbmQuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBbc2NlbmVdIC0gVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gW2NhbWVyYV0gLSBUaGUgY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7TWVzaH0gW3F1YWRdIC0gQSBxdWFkIHRoYXQgZmlsbHMgdGhlIHNjcmVlbiB0byByZW5kZXIgMkQgZmlsdGVyIGVmZmVjdHMuIFNldCB0aGlzIHRvIG51bGwsIGlmIHlvdSBkb24ndCBuZWVkIGl0IChzZWUge0BsaW5rIFJlbmRlclBhc3N9KS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRzY2VuZSA9IG5ldyBTY2VuZSgpLFxyXG5cdFx0Y2FtZXJhID0gbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgMSwgLTEsIDAsIDEpLFxyXG5cdFx0cXVhZCA9IG5ldyBNZXNoKG5ldyBQbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLCBudWxsKVxyXG5cdCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NjZW5lfVxyXG5cdFx0ICogQHByb3RlY3RlZFxyXG5cdFx0ICogQGRlZmF1bHQgbmV3IFNjZW5lKClcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjYW1lcmEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NhbWVyYX1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIDEsIC0xLCAwLCAxKVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jYW1lcmEgPSBjYW1lcmE7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHF1YWQgbWVzaCB0aGF0IGZpbGxzIHRoZSBzY3JlZW4uXHJcblx0XHQgKlxyXG5cdFx0ICogQXNzaWduIHlvdXIgc2hhZGVyIG1hdGVyaWFsIHRvIHRoaXMgbWVzaCFcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TWVzaH1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBNZXNoKG5ldyBQbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLCBudWxsKVxyXG5cdFx0ICogQGV4YW1wbGUgdGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5teU1hdGVyaWFsO1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5xdWFkID0gcXVhZDtcclxuXHJcblx0XHRpZih0aGlzLnF1YWQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucXVhZC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZih0aGlzLnNjZW5lICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2NlbmUuYWRkKHRoaXMucXVhZCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMgc2hvdWxkIGJlIHN3YXBwZWQgYWZ0ZXIgdGhpc1xyXG5cdFx0ICogcGFzcyBoYXMgZmluaXNoZWQgcmVuZGVyaW5nLlxyXG5cdFx0ICpcclxuXHRcdCAqIFNldCB0aGlzIHRvIHRydWUgaWYgdGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlciBzbyB0aGF0IGFcclxuXHRcdCAqIGZvbGxvd2luZyBwYXNzIGNhbiBmaW5kIHRoZSByZXN1bHQgaW4gdGhlIHJlYWQgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFbmFibGVkIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVuZGVyIHRvIHNjcmVlbiBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVG9TY3JlZW4gPSBmYWxzZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBUaGlzIGlzIGFuIGFic3RyYWN0IG1ldGhvZCB0aGF0IG11c3QgYmUgb3ZlcnJpZGRlbi5cclxuXHQgKlxyXG5cdCAqIEBhYnN0cmFjdFxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBBbiBlcnJvciBpcyB0aHJvd24gaWYgdGhlIG1ldGhvZCBpcyBub3Qgb3ZlcnJpZGRlbi5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBBIHJlYWQgYnVmZmVyLiBDb250YWlucyB0aGUgcmVzdWx0IG9mIHRoZSBwcmV2aW91cyBwYXNzLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gQSB3cml0ZSBidWZmZXIuIE5vcm1hbGx5IHVzZWQgYXMgdGhlIHJlbmRlciB0YXJnZXQgd2hlbiB0aGUgcmVhZCBidWZmZXIgaXMgdXNlZCBhcyBpbnB1dC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhXSAtIFRoZSBkZWx0YSB0aW1lLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2tBY3RpdmVdIC0gSW5kaWNhdGVzIHdoZXRoZXIgYSBzdGVuY2lsIHRlc3QgbWFzayBpcyBhY3RpdmUgb3Igbm90LlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSwgbWFza0FjdGl2ZSkge1xyXG5cclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlJlbmRlciBtZXRob2Qgbm90IGltcGxlbWVudGVkIVwiKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBZb3UgbWF5IG92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIGNhc2UgeW91IHdhbnQgdG8gYmUgaW5mb3JtZWQgYWJvdXQgdGhlIG1haW5cclxuXHQgKiByZW5kZXIgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIGJlZm9yZSB0aGlzIHBhc3MgaXNcclxuXHQgKiBpbml0aWFsaXNlZCBhbmQgZXZlcnkgdGltZSBpdHMgb3duIHNpemUgaXMgdXBkYXRlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSByZW5kZXJlcidzIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgcmVuZGVyZXIncyBoZWlnaHQuXHJcblx0ICogQGV4YW1wbGUgdGhpcy5teVJlbmRlclRhcmdldC5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIGluaXRpYWxpc2F0aW9uIHRhc2tzLlxyXG5cdCAqXHJcblx0ICogQnkgb3ZlcnJpZGluZyB0aGlzIG1ldGhvZCB5b3UgZ2FpbiBhY2Nlc3MgdG8gdGhlIHJlbmRlcmVyLiBZb3UnbGwgYWxzbyBiZVxyXG5cdCAqIGFibGUgdG8gY29uZmlndXJlIHlvdXIgY3VzdG9tIHJlbmRlciB0YXJnZXRzIHRvIHVzZSB0aGUgYXBwcm9wcmlhdGUgZm9ybWF0XHJcblx0ICogKFJHQiBvciBSR0JBKS5cclxuXHQgKlxyXG5cdCAqIFRoZSBwcm92aWRlZCByZW5kZXJlciBjYW4gYmUgdXNlZCB0byB3YXJtIHVwIHNwZWNpYWwgb2ZmLXNjcmVlbiByZW5kZXJcclxuXHQgKiB0YXJnZXRzIGJ5IHBlcmZvcm1pbmcgYSBwcmVsaW1pbmFyeSByZW5kZXIgb3BlcmF0aW9uLlxyXG5cdCAqXHJcblx0ICogVGhlIHtAbGluayBFZmZlY3RDb21wb3Nlcn0gY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiB0aGlzIHBhc3MgaXMgYWRkZWQgdG8gaXRzXHJcblx0ICogcXVldWUuXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIGluaXRpYWxpc2VcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxwaGEgLSBXaGV0aGVyIHRoZSByZW5kZXJlciB1c2VzIHRoZSBhbHBoYSBjaGFubmVsIG9yIG5vdC5cclxuXHQgKiBAZXhhbXBsZSBpZighYWxwaGEpIHsgdGhpcy5teVJlbmRlclRhcmdldC50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDsgfVxyXG5cdCAqL1xyXG5cclxuXHRpbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSkge31cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgYSBzaGFsbG93IHNlYXJjaCBmb3IgcHJvcGVydGllcyB0aGF0IGRlZmluZSBhIGRpc3Bvc2UgbWV0aG9kIGFuZFxyXG5cdCAqIGRlbGV0ZXMgdGhlbS4gVGhlIHBhc3Mgd2lsbCBiZSBpbm9wZXJhdGl2ZSBhZnRlciB0aGlzIG1ldGhvZCB3YXMgY2FsbGVkIVxyXG5cdCAqXHJcblx0ICogRGlzcG9zYWJsZSBvYmplY3RzOlxyXG5cdCAqICAtIHJlbmRlciB0YXJnZXRzXHJcblx0ICogIC0gbWF0ZXJpYWxzXHJcblx0ICogIC0gdGV4dHVyZXNcclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gaXQgaXMgYmVpbmcgZGVzdHJveWVkLlxyXG5cdCAqIFlvdSBtYXksIGhvd2V2ZXIsIHVzZSBpdCBpbmRlcGVuZGVudGx5IHRvIGZyZWUgbWVtb3J5IHdoZW4geW91IGFyZSBjZXJ0YWluXHJcblx0ICogdGhhdCB5b3UgZG9uJ3QgbmVlZCB0aGlzIHBhc3MgYW55bW9yZS5cclxuXHQgKi9cclxuXHJcblx0ZGlzcG9zZSgpIHtcclxuXHJcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblxyXG5cdFx0bGV0IGtleTtcclxuXHJcblx0XHRmb3Ioa2V5IG9mIGtleXMpIHtcclxuXHJcblx0XHRcdGlmKHRoaXNba2V5XSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpc1trZXldLmRpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cclxuXHRcdFx0XHR0aGlzW2tleV0uZGlzcG9zZSgpO1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IG51bGw7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogVXNlZCBmb3Igc2F2aW5nIHRoZSBvcmlnaW5hbCBjbGVhciBjb2xvciBvZiB0aGUgcmVuZGVyZXIuXHJcbiAqXHJcbiAqIEB0eXBlIENvbG9yXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICovXHJcblxyXG5jb25zdCBjb2xvciA9IG5ldyBDb2xvcigpO1xyXG5cclxuLyoqXHJcbiAqIEEgY2xlYXIgcGFzcy5cclxuICpcclxuICogWW91IGNhbiBwcmV2ZW50IHNwZWNpZmljIGJ1ZmZlcnMgZnJvbSBiZWluZyBjbGVhcmVkIGJ5IHNldHRpbmcgZWl0aGVyIHRoZVxyXG4gKiBhdXRvQ2xlYXJDb2xvciwgYXV0b0NsZWFyU3RlbmNpbCBvciBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlclxyXG4gKiB0byBmYWxzZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY2xlYXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTAuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkNsZWFyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXIgY29sb3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvbG9yfVxyXG5cdFx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckNvbG9yID0gKG9wdGlvbnMuY2xlYXJDb2xvciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJDb2xvciA6IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhciBhbHBoYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQGRlZmF1bHQgMC4wXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyQWxwaGEgPSAob3B0aW9ucy5jbGVhckFscGhhICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckFscGhhIDogMC4wO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgcmVhZCBidWZmZXIgb3IgdGhlIHNjcmVlbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgY2xlYXJDb2xvciA9IHRoaXMuY2xlYXJDb2xvcjtcclxuXHJcblx0XHRsZXQgY2xlYXJBbHBoYTtcclxuXHJcblx0XHRpZihjbGVhckNvbG9yICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRjb2xvci5jb3B5KHJlbmRlcmVyLmdldENsZWFyQ29sb3IoKSk7XHJcblx0XHRcdGNsZWFyQWxwaGEgPSByZW5kZXJlci5nZXRDbGVhckFscGhhKCk7XHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY2xlYXJDb2xvciwgdGhpcy5jbGVhckFscGhhKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcik7XHJcblx0XHRyZW5kZXJlci5jbGVhcigpO1xyXG5cclxuXHRcdGlmKGNsZWFyQ29sb3IgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY29sb3IsIGNsZWFyQWxwaGEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IGRpc2FibGVzIHRoZSBzdGVuY2lsIG1hc2suXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjbGVhciBtYXNrIHBhc3MuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKG51bGwsIG51bGwsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJDbGVhck1hc2tQYXNzXCI7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzYWJsZXMgdGhlIHN0ZW5jaWwgdGVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlcikge1xyXG5cclxuXHRcdHJlbmRlcmVyLnN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRUZXN0KGZhbHNlKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEYXRhVGV4dHVyZSwgUkdCRm9ybWF0LCBGbG9hdFR5cGUgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgR2xpdGNoTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21JbnQobG93LCBoaWdoKSB7XHJcblxyXG5cdHJldHVybiBsb3cgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyArIDEpKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvdyAtIFRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoIC0gVGhlIGhpZ2hlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcblxyXG5mdW5jdGlvbiByYW5kb21GbG9hdChsb3csIGhpZ2gpIHtcclxuXHJcblx0cmV0dXJuIGxvdyArIE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdyk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgR2xpdGNoUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGdsaXRjaCBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7VGV4dHVyZX0gW29wdGlvbnMucGVydHVyYk1hcF0gLSBBIHBlcnR1cmJhdGlvbiBtYXAuIElmIG5vbmUgaXMgcHJvdmlkZWQsIGEgbm9pc2UgdGV4dHVyZSB3aWxsIGJlIGNyZWF0ZWQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR0U2l6ZT02NF0gLSBUaGUgc2l6ZSBvZiB0aGUgZ2VuZXJhdGVkIG5vaXNlIG1hcC4gV2lsbCBiZSBpZ25vcmVkIGlmIGEgcGVydHVyYmF0aW9uIG1hcCBpcyBwcm92aWRlZC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiR2xpdGNoUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdsaXRjaCBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBuZXcgR2xpdGNoTWF0ZXJpYWwoKTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwID0gKG9wdGlvbnMucGVydHVyYk1hcCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMucGVydHVyYk1hcCA6IHRoaXMuZ2VuZXJhdGVQZXJ0dXJiTWFwKG9wdGlvbnMuZHRTaXplKTtcclxuXHRcdHRoaXMucGVydHVyYk1hcC5uYW1lID0gXCJHbGl0Y2guUGVydHVyYmF0aW9uXCI7XHJcblx0XHR0aGlzLnBlcnR1cmJNYXAuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWZmZWN0IG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dsaXRjaE1vZGV9XHJcblx0XHQgKiBAZGVmYXVsdCBHbGl0Y2hNb2RlLlNQT1JBRElDXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1vZGUgPSBHbGl0Y2hNb2RlLlNQT1JBRElDO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ291bnRlciBmb3IgZ2xpdGNoIGFjdGl2YXRpb24gYW5kIGRlYWN0aXZhdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJhbmRvbSBicmVhayBwb2ludCBmb3IgdGhlIHNwb3JhZGljIGdsaXRjaCBhY3RpdmF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5icmVha1BvaW50ID0gcmFuZG9tSW50KDEyMCwgMjQwKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBwZXJ0dXJiYXRpb24gbWFwLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdGdldCBwZXJ0dXJiTWFwKCkgeyByZXR1cm4gdGhpcy50ZXh0dXJlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFzc2lnbmluZyBhIG5ldyBwZXJ0dXJiYXRpb24gbWFwIGRvZXMgbm90IGRlc3Ryb3kgdGhlIGN1cnJlbnQgb25lIVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCBwZXJ0dXJiTWFwKHgpIHtcclxuXHJcblx0XHR0aGlzLnRleHR1cmUgPSB4O1xyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50UGVydHVyYi52YWx1ZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhlIGN1cnJlbnQgcGVydHVyYmF0aW9uIG1hcCBhbmQgcmVwbGFjZXMgaXQgd2l0aCBhIG5ldyBvbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3NpemU9NjRdIC0gVGhlIHRleHR1cmUgc2l6ZS5cclxuXHQgKiBAcmV0dXJuIHtEYXRhVGV4dHVyZX0gVGhlIHBlcnR1cmJhdGlvbiB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRnZW5lcmF0ZVBlcnR1cmJNYXAoc2l6ZSA9IDY0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGl4ZWxzID0gc2l6ZSAqIHNpemU7XHJcblx0XHRjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShwaXhlbHMgKiAzKTtcclxuXHJcblx0XHRsZXQgZHQgPSB0aGlzLnBlcnR1cmJNYXA7XHJcblx0XHRsZXQgaSwgeDtcclxuXHJcblx0XHRmb3IoaSA9IDA7IGkgPCBwaXhlbHM7ICsraSkge1xyXG5cclxuXHRcdFx0eCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG5cdFx0XHRkYXRhW2kgKiAzXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAxXSA9IHg7XHJcblx0XHRcdGRhdGFbaSAqIDMgKyAyXSA9IHg7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGR0ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRkdC5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGR0ID0gbmV3IERhdGFUZXh0dXJlKGRhdGEsIHNpemUsIHNpemUsIFJHQkZvcm1hdCwgRmxvYXRUeXBlKTtcclxuXHRcdGR0Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLnBlcnR1cmJNYXAgPSBkdDtcclxuXHJcblx0XHRyZXR1cm4gZHQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IG1vZGUgPSB0aGlzLm1vZGU7XHJcblx0XHRjb25zdCBjb3VudGVyID0gdGhpcy5jb3VudGVyO1xyXG5cdFx0Y29uc3QgYnJlYWtQb2ludCA9IHRoaXMuYnJlYWtQb2ludDtcclxuXHRcdGNvbnN0IHVuaWZvcm1zID0gdGhpcy5tYXRlcmlhbC51bmlmb3JtcztcclxuXHJcblx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHVuaWZvcm1zLnNlZWQudmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xyXG5cdFx0dW5pZm9ybXMuYWN0aXZlLnZhbHVlID0gdHJ1ZTtcclxuXHJcblx0XHRpZihjb3VudGVyICUgYnJlYWtQb2ludCA9PT0gMCB8fCBtb2RlID09PSBHbGl0Y2hNb2RlLkNPTlNUQU5UX1dJTEQpIHtcclxuXHJcblx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyAzMC4wO1xyXG5cdFx0XHR1bmlmb3Jtcy5hbmdsZS52YWx1ZSA9IHJhbmRvbUZsb2F0KC1NYXRoLlBJLCBNYXRoLlBJKTtcclxuXHRcdFx0dW5pZm9ybXMuc2VlZFgudmFsdWUgPSByYW5kb21GbG9hdCgtMS4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0xLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWS52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHJcblx0XHRcdHRoaXMuYnJlYWtQb2ludCA9IHJhbmRvbUludCgxMjAsIDI0MCk7XHJcblx0XHRcdHRoaXMuY291bnRlciA9IDA7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmKGNvdW50ZXIgJSBicmVha1BvaW50IDwgYnJlYWtQb2ludCAvIDUgfHwgbW9kZSA9PT0gR2xpdGNoTW9kZS5DT05TVEFOVF9NSUxEKSB7XHJcblxyXG5cdFx0XHRcdHVuaWZvcm1zLmFtb3VudC52YWx1ZSA9IE1hdGgucmFuZG9tKCkgLyA5MC4wO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gcmFuZG9tRmxvYXQoLU1hdGguUEksIE1hdGguUEkpO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25YLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25ZLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cdFx0XHRcdHVuaWZvcm1zLnNlZWRYLnZhbHVlID0gcmFuZG9tRmxvYXQoLTAuMywgMC4zKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5zZWVkWS52YWx1ZSA9IHJhbmRvbUZsb2F0KC0wLjMsIDAuMyk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHQvLyBTcG9yYWRpYy5cclxuXHRcdFx0XHR1bmlmb3Jtcy5hY3RpdmUudmFsdWUgPSBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Kyt0aGlzLmNvdW50ZXI7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZ2xpdGNoIG1vZGUgZW51bWVyYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTUE9SQURJQyAtIFNwb3JhZGljIGdsaXRjaGVzLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ09OU1RBTlRfTUlMRCAtIENvbnN0YW50IG1pbGQgZ2xpdGNoZXMuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05TVEFOVF9XSUxEIC0gQ29uc3RhbnQgd2lsZCBnbGl0Y2hlcy5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgR2xpdGNoTW9kZSA9IHtcclxuXHJcblx0U1BPUkFESUM6IDAsXHJcblx0Q09OU1RBTlRfTUlMRDogMSxcclxuXHRDT05TVEFOVF9XSUxEOiAyXHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBDbGVhclBhc3MgfSBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IHJlbmRlcnMgYSBnaXZlbiBzY2VuZSBkaXJlY3RseSBvbiBzY3JlZW4gb3IgaW50byB0aGUgcmVhZCBidWZmZXJcclxuICogZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHJlbmRlciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgY2FtZXJhIHRvIHVzZSB0byByZW5kZXIgdGhlIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtNYXRlcmlhbH0gW29wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbD1udWxsXSAtIEFuIG92ZXJyaWRlIG1hdGVyaWFsIGZvciB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtDb2xvcn0gW29wdGlvbnMuY2xlYXJDb2xvcj1udWxsXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGNvbG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGVhckFscGhhPTEuMF0gLSBBbiBvdmVycmlkZSBjbGVhciBhbHBoYS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsZWFyRGVwdGg9ZmFsc2VdIC0gV2hldGhlciBkZXB0aCBzaG91bGQgYmUgY2xlYXJlZCBleHBsaWNpdGx5LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xlYXI9dHJ1ZV0gLSBXaGV0aGVyIGFsbCBidWZmZXJzIHNob3VsZCBiZSBjbGVhcmVkLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcihzY2VuZSwgY2FtZXJhLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUmVuZGVyUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjbGVhciBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDbGVhclBhc3N9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyUGFzcyA9IG5ldyBDbGVhclBhc3Mob3B0aW9ucyk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbiBvdmVycmlkZSBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TWF0ZXJpYWx9XHJcblx0XHQgKiBAZGVmYXVsdCBudWxsXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm92ZXJyaWRlTWF0ZXJpYWwgPSAob3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsIDogbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBkZXB0aCBidWZmZXIgc2hvdWxkIGJlIGNsZWFyZWQgZXhwbGljaXRseS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyRGVwdGggPSAob3B0aW9ucy5jbGVhckRlcHRoICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckRlcHRoIDogZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29sb3IsIGRlcHRoIGFuZCBzdGVuY2lsIGJ1ZmZlcnMgc2hvdWxkIGJlIGNsZWFyZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogRXZlbiB3aXRoIGNsZWFyIHNldCB0byB0cnVlIHlvdSBjYW4gcHJldmVudCBzcGVjaWZpYyBidWZmZXJzIGZyb20gYmVpbmdcclxuXHRcdCAqIGNsZWFyZWQgYnkgc2V0dGluZyBlaXRoZXIgdGhlIGF1dG9DbGVhckNvbG9yLCBhdXRvQ2xlYXJTdGVuY2lsIG9yXHJcblx0XHQgKiBhdXRvQ2xlYXJEZXB0aCBwcm9wZXJ0aWVzIG9mIHRoZSByZW5kZXJlciB0byBmYWxzZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXIgPSAob3B0aW9ucy5jbGVhciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXIgOiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIHNjZW5lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHJlYWRCdWZmZXI7XHJcblxyXG5cdFx0aWYodGhpcy5jbGVhcikge1xyXG5cclxuXHRcdFx0dGhpcy5jbGVhclBhc3MucmVuZGVyKHJlbmRlcmVyLCB0YXJnZXQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZih0aGlzLmNsZWFyRGVwdGgpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh0YXJnZXQpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhckRlcHRoKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSB0aGlzLm92ZXJyaWRlTWF0ZXJpYWw7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhLCB0YXJnZXQpO1xyXG5cdFx0c2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGw7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1hc2sgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBtYXNrIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBjYW1lcmEgdG8gdXNlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhKSB7XHJcblxyXG5cdFx0c3VwZXIoc2NlbmUsIGNhbWVyYSwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIk1hc2tQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnZlcnNlIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5pbnZlcnNlID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdGVuY2lsIGJ1ZmZlciBjbGVhciBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhclN0ZW5jaWwgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBzdGVuY2lsIGJpdCBtYXNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IGNvbnRleHQgPSByZW5kZXJlci5jb250ZXh0O1xyXG5cdFx0Y29uc3Qgc3RhdGUgPSByZW5kZXJlci5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuXHJcblx0XHRjb25zdCB3cml0ZVZhbHVlID0gdGhpcy5pbnZlcnNlID8gMCA6IDE7XHJcblx0XHRjb25zdCBjbGVhclZhbHVlID0gMSAtIHdyaXRlVmFsdWU7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgdXBkYXRlIGNvbG9yIG9yIGRlcHRoLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRNYXNrKGZhbHNlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TWFzayhmYWxzZSk7XHJcblxyXG5cdFx0Ly8gTG9jayB0aGUgYnVmZmVycy5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TG9ja2VkKHRydWUpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRMb2NrZWQodHJ1ZSk7XHJcblxyXG5cdFx0Ly8gQ29uZmlndXJlIHRoZSBzdGVuY2lsLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldFRlc3QodHJ1ZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0T3AoY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UsIGNvbnRleHQuUkVQTEFDRSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkFMV0FZUywgd3JpdGVWYWx1ZSwgMHhmZmZmZmZmZik7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0Q2xlYXIoY2xlYXJWYWx1ZSk7XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHN0ZW5jaWwuXHJcblx0XHRpZih0aGlzLmNsZWFyU3RlbmNpbCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHJlYWRCdWZmZXIpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhclN0ZW5jaWwoKTtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyU3RlbmNpbCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBEcmF3IHRoZSBtYXNrIGludG8gYm90aCBidWZmZXJzLlxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlYWRCdWZmZXIpO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHdyaXRlQnVmZmVyKTtcclxuXHJcblx0XHQvLyBVbmxvY2sgdGhlIGJ1ZmZlcnMuXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldExvY2tlZChmYWxzZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldExvY2tlZChmYWxzZSk7XHJcblxyXG5cdFx0Ly8gT25seSByZW5kZXIgd2hlcmUgdGhlIHN0ZW5jaWwgaXMgc2V0IHRvIDEuXHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRPcChjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCwgY29udGV4dC5LRUVQKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2hhZGVyIHBhc3MuXHJcbiAqXHJcbiAqIFVzZWQgdG8gcmVuZGVyIGFueSBzaGFkZXIgbWF0ZXJpYWwgYXMgYSAyRCBmaWx0ZXIuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNoYWRlclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzaGFkZXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2hhZGVyTWF0ZXJpYWx9IG1hdGVyaWFsIC0gVGhlIHNoYWRlciBtYXRlcmlhbCB0byB1c2UuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IFt0ZXh0dXJlSUQ9XCJ0RGlmZnVzZVwiXSAtIFRoZSB0ZXh0dXJlIHVuaWZvcm0gaWRlbnRpZmllci5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IobWF0ZXJpYWwsIHRleHR1cmVJRCA9IFwidERpZmZ1c2VcIikge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlNoYWRlclBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc2hhZGVyIG1hdGVyaWFsIHRvIHVzZSBmb3IgcmVuZGVyaW5nLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaGFkZXJNYXRlcmlhbH1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhlIGNvbG9yIHNhbXBsZXIgdW5pZm9ybSBvZiB0aGUgZ2l2ZW4gbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqIEBkZWZhdWx0IFwidERpZmZ1c2VcIlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlSUQgPSB0ZXh0dXJlSUQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGlmKHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbdGhpcy50ZXh0dXJlSURdICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbdGhpcy50ZXh0dXJlSURdLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsLCBTaG9ja1dhdmVNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBIYWxmIFBJLlxyXG4gKlxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IEhBTEZfUEkgPSBNYXRoLlBJICogMC41O1xyXG5cclxuLyoqXHJcbiAqIEEgdmVjdG9yLlxyXG4gKlxyXG4gKiBAdHlwZSB7VmVjdG9yM31cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbi8qKlxyXG4gKiBBIHZlY3Rvci5cclxuICpcclxuICogQHR5cGUge1ZlY3RvcjN9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgYWIgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuLyoqXHJcbiAqIEEgc2hvY2sgd2F2ZSBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTaG9ja1dhdmVQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgc2hvY2sgd2F2ZSBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBtYWluIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjN9IFtlcGljZW50ZXJdIC0gVGhlIHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBzaG9jayB3YXZlIGVwaWNlbnRlci5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNwZWVkPTEuMF0gLSBUaGUgYW5pbWF0aW9uIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhSYWRpdXM9MS4wXSAtIFRoZSBleHRlbnQgb2YgdGhlIHNob2NrIHdhdmUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndhdmVTaXplPTAuMl0gLSBUaGUgd2F2ZSBzaXplLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5hbXBsaXR1ZGU9MC4wNV0gLSBUaGUgZGlzdG9ydGlvbiBhbXBsaXR1ZGUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhbWVyYSwgZXBpY2VudGVyID0gbmV3IFZlY3RvcjMoKSwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiU2hvY2tXYXZlUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBtYWluIGNhbWVyYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0M0R9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1haW5DYW1lcmEgPSBjYW1lcmE7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZXBpY2VudGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtWZWN0b3IzfVxyXG5cdFx0ICogQGV4YW1wbGUgc2hvY2tXYXZlUGFzcy5lcGljZW50ZXIgPSBteU1lc2gucG9zaXRpb247XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmVwaWNlbnRlciA9IGVwaWNlbnRlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBvYmplY3QgcG9zaXRpb24gaW4gc2NyZWVuIHNwYWNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtWZWN0b3IzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NyZWVuUG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNwZWVkIG9mIHRoZSBzaG9jayB3YXZlIGFuaW1hdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQGRlZmF1bHQgMi4wXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNwZWVkID0gKG9wdGlvbnMuc3BlZWQgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnNwZWVkIDogMi4wO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSB0aW1lIGFjY3VtdWxhdG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50aW1lID0gMC4wO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNob2NrIHdhdmUgYW5pbWF0aW9uIGlzIGFjdGl2ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBzaG9jayB3YXZlIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hvY2tXYXZlTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbCA9IG5ldyBTaG9ja1dhdmVNYXRlcmlhbChvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zLmNlbnRlci52YWx1ZSA9IHRoaXMuc2NyZWVuUG9zaXRpb247XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb3B5TWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwgPSBuZXcgQ29weU1hdGVyaWFsKCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW1pdHMgdGhlIHNob2NrIHdhdmUuXHJcblx0ICovXHJcblxyXG5cdGV4cGxvZGUoKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gMC4wO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhIC0gVGhlIHJlbmRlciBkZWx0YSB0aW1lLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSkge1xyXG5cclxuXHRcdGNvbnN0IGVwaWNlbnRlciA9IHRoaXMuZXBpY2VudGVyO1xyXG5cdFx0Y29uc3QgbWFpbkNhbWVyYSA9IHRoaXMubWFpbkNhbWVyYTtcclxuXHRcdGNvbnN0IHNjcmVlblBvc2l0aW9uID0gdGhpcy5zY3JlZW5Qb3NpdGlvbjtcclxuXHJcblx0XHRjb25zdCBzaG9ja1dhdmVNYXRlcmlhbCA9IHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWw7XHJcblx0XHRjb25zdCB1bmlmb3JtcyA9IHNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cdFx0Y29uc3QgY2VudGVyID0gdW5pZm9ybXMuY2VudGVyO1xyXG5cdFx0Y29uc3QgcmFkaXVzID0gdW5pZm9ybXMucmFkaXVzO1xyXG5cdFx0Y29uc3QgbWF4UmFkaXVzID0gdW5pZm9ybXMubWF4UmFkaXVzO1xyXG5cdFx0Y29uc3Qgd2F2ZVNpemUgPSB1bmlmb3Jtcy53YXZlU2l6ZTtcclxuXHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuY29weU1hdGVyaWFsO1xyXG5cclxuXHRcdGlmKHRoaXMuYWN0aXZlKSB7XHJcblxyXG5cdFx0XHQvLyBDYWxjdWxhdGUgZGlyZWN0aW9uIHZlY3RvcnMuXHJcblx0XHRcdG1haW5DYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24odik7XHJcblx0XHRcdGFiLmNvcHkobWFpbkNhbWVyYS5wb3NpdGlvbikuc3ViKGVwaWNlbnRlcik7XHJcblxyXG5cdFx0XHQvLyBEb24ndCByZW5kZXIgdGhlIGVmZmVjdCBpZiB0aGUgb2JqZWN0IGlzIGJlaGluZCB0aGUgY2FtZXJhLlxyXG5cdFx0XHRpZih2LmFuZ2xlVG8oYWIpID4gSEFMRl9QSSkge1xyXG5cclxuXHRcdFx0XHQvLyBTY2FsZSB0aGUgZWZmZWN0IGJhc2VkIG9uIGRpc3RhbmNlIHRvIHRoZSBvYmplY3QuXHJcblx0XHRcdFx0dW5pZm9ybXMuY2FtZXJhRGlzdGFuY2UudmFsdWUgPSBtYWluQ2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oZXBpY2VudGVyKTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FsY3VsYXRlIHRoZSBzY3JlZW4gcG9zaXRpb24gb2YgdGhlIGVwaWNlbnRlci5cclxuXHRcdFx0XHRzY3JlZW5Qb3NpdGlvbi5jb3B5KGVwaWNlbnRlcikucHJvamVjdChtYWluQ2FtZXJhKTtcclxuXHRcdFx0XHRjZW50ZXIudmFsdWUueCA9IChzY3JlZW5Qb3NpdGlvbi54ICsgMS4wKSAqIDAuNTtcclxuXHRcdFx0XHRjZW50ZXIudmFsdWUueSA9IChzY3JlZW5Qb3NpdGlvbi55ICsgMS4wKSAqIDAuNTtcclxuXHJcblx0XHRcdFx0dW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHRcdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gc2hvY2tXYXZlTWF0ZXJpYWw7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBVcGRhdGUgdGhlIHNob2NrIHdhdmUgcmFkaXVzIGJhc2VkIG9uIHRpbWUuXHJcblx0XHRcdHRoaXMudGltZSArPSBkZWx0YTtcclxuXHRcdFx0cmFkaXVzLnZhbHVlID0gdGhpcy50aW1lICogdGhpcy5zcGVlZCAtIHdhdmVTaXplLnZhbHVlO1xyXG5cclxuXHRcdFx0aWYocmFkaXVzLnZhbHVlID49IChtYXhSYWRpdXMudmFsdWUgKyB3YXZlU2l6ZS52YWx1ZSkgKiAyKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLnNob2NrV2F2ZU1hdGVyaWFsLnVuaWZvcm1zLmFzcGVjdC52YWx1ZSA9IHdpZHRoIC8gaGVpZ2h0O1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbXBpbGF0aW9uIG9mIHRoZSBwb3N0IHByb2Nlc3NpbmcgcGFzc2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL3Bhc3Nlc1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEJsb29tUGFzcyB9IGZyb20gXCIuL2Jsb29tLmpzXCI7XHJcbmV4cG9ydCB7IEJsdXJQYXNzIH0gZnJvbSBcIi4vYmx1ci5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaFBhc3MgfSBmcm9tIFwiLi9ib2tlaC5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaDJQYXNzIH0gZnJvbSBcIi4vYm9rZWgyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyUGFzcyB9IGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyTWFza1Bhc3MgfSBmcm9tIFwiLi9jbGVhci1tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IERvdFNjcmVlblBhc3MgfSBmcm9tIFwiLi9kb3Qtc2NyZWVuLmpzXCI7XHJcbmV4cG9ydCB7IERlcHRoUGFzcyB9IGZyb20gXCIuL2RlcHRoLmpzXCI7XHJcbmV4cG9ydCB7IEZpbG1QYXNzIH0gZnJvbSBcIi4vZmlsbS5qc1wiO1xyXG5leHBvcnQgeyBHbGl0Y2hNb2RlLCBHbGl0Y2hQYXNzIH0gZnJvbSBcIi4vZ2xpdGNoLmpzXCI7XHJcbmV4cG9ydCB7IEdvZFJheXNQYXNzIH0gZnJvbSBcIi4vZ29kLXJheXMuanNcIjtcclxuZXhwb3J0IHsgTWFza1Bhc3MgfSBmcm9tIFwiLi9tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcbmV4cG9ydCB7IFBpeGVsYXRpb25QYXNzIH0gZnJvbSBcIi4vcGl4ZWxhdGlvbi5qc1wiO1xyXG5leHBvcnQgeyBSZW5kZXJQYXNzIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNhdmVQYXNzIH0gZnJvbSBcIi4vc2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTaGFkZXJQYXNzIH0gZnJvbSBcIi4vc2hhZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNob2NrV2F2ZVBhc3MgfSBmcm9tIFwiLi9zaG9jay13YXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFQYXNzIH0gZnJvbSBcIi4vc21hYS5qc1wiO1xyXG5leHBvcnQgeyBUZXh0dXJlUGFzcyB9IGZyb20gXCIuL3RleHR1cmUuanNcIjtcclxuZXhwb3J0IHsgVG9uZU1hcHBpbmdQYXNzIH0gZnJvbSBcIi4vdG9uZS1tYXBwaW5nLmpzXCI7XHJcbiIsImltcG9ydCB7XHJcblx0RGVwdGhTdGVuY2lsRm9ybWF0LFxyXG5cdERlcHRoVGV4dHVyZSxcclxuXHRMaW5lYXJGaWx0ZXIsXHJcblx0UkdCQUZvcm1hdCxcclxuXHRSR0JGb3JtYXQsXHJcblx0VW5zaWduZWRJbnQyNDhUeXBlLFxyXG5cdFdlYkdMUmVuZGVyVGFyZ2V0XHJcbn0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQgeyBDbGVhck1hc2tQYXNzLCBNYXNrUGFzcywgU2hhZGVyUGFzcyB9IGZyb20gXCIuLi9wYXNzZXNcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFZmZlY3RDb21wb3NlciBtYXkgYmUgdXNlZCBpbiBwbGFjZSBvZiBhIG5vcm1hbCBXZWJHTFJlbmRlcmVyLlxyXG4gKlxyXG4gKiBUaGUgYXV0byBjbGVhciBiZWhhdmlvdXIgb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyIHdpbGwgYmUgZGlzYWJsZWQgdG8gcHJldmVudFxyXG4gKiB1bm5lY2Vzc2FyeSBjbGVhciBvcGVyYXRpb25zLlxyXG4gKlxyXG4gKiBJdCBpcyBjb21tb24gcHJhY3RpY2UgdG8gdXNlIGEge0BsaW5rIFJlbmRlclBhc3N9IGFzIHRoZSBmaXJzdCBwYXNzIHRvXHJcbiAqIGF1dG9tYXRpY2FsbHkgY2xlYXIgdGhlIHNjcmVlbiBhbmQgcmVuZGVyIHRoZSBzY2VuZSB0byBhIHRleHR1cmUgZm9yIGZ1cnRoZXJcclxuICogcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRWZmZWN0Q29tcG9zZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGVmZmVjdCBjb21wb3Nlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gW3JlbmRlcmVyXSAtIFRoZSByZW5kZXJlciB0aGF0IHNob3VsZCBiZSB1c2VkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRlcHRoQnVmZmVyPXRydWVdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIGRlcHRoIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0ZW5jaWxCdWZmZXI9ZmFsc2VdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGVwdGhUZXh0dXJlPWZhbHNlXSAtIFNldCB0byB0cnVlIGlmIG9uZSBvZiB5b3VyIHBhc3NlcyByZWxpZXMgb24gYSBkZXB0aCB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZW5kZXJlciA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlbmRlcmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFlvdSBtYXkgcmVwbGFjZSB0aGUgcmVuZGVyZXIgYXQgYW55IHRpbWUgYnkgdXNpbmdcclxuXHRcdCAqIHtAbGluayBFZmZlY3RDb21wb3NlciNyZXBsYWNlUmVuZGVyZXJ9LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlcmVyfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlYWQgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFJlYWRpbmcgZnJvbSBhbmQgd3JpdGluZyB0byB0aGUgc2FtZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBiZSBhdm9pZGVkLlxyXG5cdFx0ICogVGhlcmVmb3JlLCB0d28gc2VwZXJhdGUgeWV0IGlkZW50aWNhbCBidWZmZXJzIGFyZSB1c2VkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0aWYodGhpcy5yZW5kZXJlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoQnVmZmVyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5kZXB0aEJ1ZmZlciA6IHRydWUsXHJcblx0XHRcdFx0KG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciA6IGZhbHNlLFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoVGV4dHVyZSAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuZGVwdGhUZXh0dXJlIDogZmFsc2VcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuY2xvbmUoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgcGFzcyB1c2VkIGZvciBjb3B5aW5nIG1hc2tlZCBzY2VuZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NoYWRlclBhc3N9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5UGFzcyA9IG5ldyBTaGFkZXJQYXNzKG5ldyBDb3B5TWF0ZXJpYWwoKSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcGFzc2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtQYXNzW119XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5wYXNzZXMgPSBbXTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZGVwdGggdGV4dHVyZSBvZiB0aGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEZXB0aFRleHR1cmV9XHJcblx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgZGVwdGhUZXh0dXJlKCkgeyByZXR1cm4gdGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycyBzaGFyZSBhIHNpbmdsZSBkZXB0aCB0ZXh0dXJlLiBEZXB0aCB3aWxsIGJlXHJcblx0ICogd3JpdHRlbiB0byB0aGlzIHRleHR1cmUgd2hlbiBzb21ldGhpbmcgaXMgcmVuZGVyZWQgaW50byBvbmUgb2YgdGhlIGJ1ZmZlcnNcclxuXHQgKiBhbmQgdGhlIGludm9sdmVkIG1hdGVyaWFscyBoYXZlIGRlcHRoIHdyaXRlIGVuYWJsZWQuXHJcblx0ICpcclxuXHQgKiBZb3UgbWF5IGVuYWJsZSB0aGlzIG1lY2hhbmlzbSBkdXJpbmcgdGhlIGluc3RhbnRpYXRpb24gb2YgdGhlIGNvbXBvc2VyIG9yXHJcblx0ICogYnkgYXNzaWduaW5nIGEgRGVwdGhUZXh0dXJlIGluc3RhbmNlIGxhdGVyIG9uLiBZb3UgbWF5IGFsc28gZGlzYWJsZSBpdCBieVxyXG5cdCAqIGFzc2lnbmluZyBudWxsLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0RlcHRoVGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IGRlcHRoVGV4dHVyZSh4KSB7XHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblx0XHR0aGlzLndyaXRlQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGN1cnJlbnQgcmVuZGVyZXIgd2l0aCB0aGUgZ2l2ZW4gb25lLiBUaGUgRE9NIGVsZW1lbnQgb2YgdGhlXHJcblx0ICogY3VycmVudCByZW5kZXJlciB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgbm9kZSBhbmQgdGhlXHJcblx0ICogRE9NIGVsZW1lbnQgb2YgdGhlIG5ldyByZW5kZXJlciB3aWxsIHRha2UgaXRzIHBsYWNlLlxyXG5cdCAqXHJcblx0ICogVGhlIGF1dG8gY2xlYXIgbWVjaGFuaXNtIG9mIHRoZSBwcm92aWRlZCByZW5kZXJlciB3aWxsIGJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogU3dpdGNoaW5nIGJldHdlZW4gcmVuZGVyZXJzIGFsbG93cyB5b3UgdG8gZHluYW1pY2FsbHkgZW5hYmxlIG9yIGRpc2FibGVcclxuXHQgKiBhbnRpYWxpYXNpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIG5ldyByZW5kZXJlci5cclxuXHQgKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmVyfSBUaGUgb2xkIHJlbmRlcmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpIHtcclxuXHJcblx0XHRjb25zdCBvbGRSZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblxyXG5cdFx0bGV0IHBhcmVudCwgb2xkU2l6ZSwgbmV3U2l6ZTtcclxuXHJcblx0XHRpZihvbGRSZW5kZXJlciAhPT0gbnVsbCAmJiBvbGRSZW5kZXJlciAhPT0gcmVuZGVyZXIpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHBhcmVudCA9IG9sZFJlbmRlcmVyLmRvbUVsZW1lbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkU2l6ZSA9IG9sZFJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdFx0bmV3U2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcclxuXHJcblx0XHRcdGlmKHBhcmVudCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQob2xkUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYob2xkU2l6ZS53aWR0aCAhPT0gbmV3U2l6ZS53aWR0aCB8fCBvbGRTaXplLmhlaWdodCAhPT0gbmV3U2l6ZS5oZWlnaHQpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zZXRTaXplKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvbGRSZW5kZXJlcjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IHJlbmRlciB0YXJnZXQgYnkgcmVwbGljYXRpbmcgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqXHJcblx0ICogVGhlIGNyZWF0ZWQgcmVuZGVyIHRhcmdldCB1c2VzIGEgbGluZWFyIGZpbHRlciBmb3IgdGV4ZWwgbWluaWZpY2F0aW9uIGFuZFxyXG5cdCAqIG1hZ25pZmljYXRpb24uIEl0cyByZW5kZXIgdGV4dHVyZSBmb3JtYXQgZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSByZW5kZXJlclxyXG5cdCAqIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwuIE1pcG1hcHMgYXJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBkZXB0aEJ1ZmZlciAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBkZXB0aCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBzdGVuY2lsQnVmZmVyIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVwdGhUZXh0dXJlIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIGRlcHRoIHRleHR1cmUuXHJcblx0ICogQHJldHVybiB7V2ViR0xSZW5kZXJUYXJnZXR9IEEgbmV3IHJlbmRlciB0YXJnZXQgdGhhdCBlcXVhbHMgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqL1xyXG5cclxuXHRjcmVhdGVCdWZmZXIoZGVwdGhCdWZmZXIsIHN0ZW5jaWxCdWZmZXIsIGRlcHRoVGV4dHVyZSkge1xyXG5cclxuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHRcdGNvbnN0IGFscGhhID0gdGhpcy5yZW5kZXJlci5jb250ZXh0LmdldENvbnRleHRBdHRyaWJ1dGVzKCkuYWxwaGE7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0ID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KHNpemUud2lkdGggKiBwaXhlbFJhdGlvLCBzaXplLmhlaWdodCAqIHBpeGVsUmF0aW8sIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRmb3JtYXQ6IGFscGhhID8gUkdCQUZvcm1hdCA6IFJHQkZvcm1hdCxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGRlcHRoQnVmZmVyLFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBzdGVuY2lsQnVmZmVyLFxyXG5cdFx0XHRkZXB0aFRleHR1cmU6IGRlcHRoVGV4dHVyZSA/IG5ldyBEZXB0aFRleHR1cmUoKSA6IG51bGxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGRlcHRoVGV4dHVyZSAmJiBzdGVuY2lsQnVmZmVyKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJUYXJnZXQuZGVwdGhUZXh0dXJlLmZvcm1hdCA9IERlcHRoU3RlbmNpbEZvcm1hdDtcclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmRlcHRoVGV4dHVyZS50eXBlID0gVW5zaWduZWRJbnQyNDhUeXBlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJUYXJnZXQudGV4dHVyZS5uYW1lID0gXCJFZmZlY3RDb21wb3Nlci5CdWZmZXJcIjtcclxuXHRcdHJlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJUYXJnZXQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIHBhc3MsIG9wdGlvbmFsbHkgYXQgYSBzcGVjaWZpYyBpbmRleC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGFzc30gcGFzcyAtIEEgbmV3IHBhc3MuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtpbmRleF0gLSBBbiBpbmRleCBhdCB3aGljaCB0aGUgcGFzcyBzaG91bGQgYmUgaW5zZXJ0ZWQuXHJcblx0ICovXHJcblxyXG5cdGFkZFBhc3MocGFzcywgaW5kZXgpIHtcclxuXHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBzaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHRwYXNzLnNldFNpemUoc2l6ZS53aWR0aCAqIHBpeGVsUmF0aW8sIHNpemUuaGVpZ2h0ICogcGl4ZWxSYXRpbyk7XHJcblx0XHRwYXNzLmluaXRpYWxpc2UocmVuZGVyZXIsIHJlbmRlcmVyLmNvbnRleHQuZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbHBoYSk7XHJcblxyXG5cdFx0aWYoaW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMuc3BsaWNlKGluZGV4LCAwLCBwYXNzKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMucHVzaChwYXNzKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1Bhc3N9IHBhc3MgLSBUaGUgcGFzcy5cclxuXHQgKi9cclxuXHJcblx0cmVtb3ZlUGFzcyhwYXNzKSB7XHJcblxyXG5cdFx0dGhpcy5wYXNzZXMuc3BsaWNlKHRoaXMucGFzc2VzLmluZGV4T2YocGFzcyksIDEpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgYWxsIGVuYWJsZWQgcGFzc2VzIGluIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgYWRkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgdGltZSBiZXR3ZWVuIHRoZSBsYXN0IGZyYW1lIGFuZCB0aGUgY3VycmVudCBvbmUgaW4gc2Vjb25kcy5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBjb3B5UGFzcyA9IHRoaXMuY29weVBhc3M7XHJcblxyXG5cdFx0bGV0IHJlYWRCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXI7XHJcblx0XHRsZXQgd3JpdGVCdWZmZXIgPSB0aGlzLndyaXRlQnVmZmVyO1xyXG5cclxuXHRcdGxldCBtYXNrQWN0aXZlID0gZmFsc2U7XHJcblx0XHRsZXQgcGFzcywgY29udGV4dCwgYnVmZmVyO1xyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0Zm9yKGkgPSAwLCBsID0gcGFzc2VzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0cGFzcyA9IHBhc3Nlc1tpXTtcclxuXHJcblx0XHRcdGlmKHBhc3MuZW5hYmxlZCkge1xyXG5cclxuXHRcdFx0XHRwYXNzLnJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlKTtcclxuXHJcblx0XHRcdFx0aWYocGFzcy5uZWVkc1N3YXApIHtcclxuXHJcblx0XHRcdFx0XHRpZihtYXNrQWN0aXZlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyhjb250ZXh0Lk5PVEVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdFx0XHRcdFx0Y29weVBhc3MucmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc3RlbmNpbEZ1bmMoY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJ1ZmZlciA9IHJlYWRCdWZmZXI7XHJcblx0XHRcdFx0XHRyZWFkQnVmZmVyID0gd3JpdGVCdWZmZXI7XHJcblx0XHRcdFx0XHR3cml0ZUJ1ZmZlciA9IGJ1ZmZlcjtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihwYXNzIGluc3RhbmNlb2YgTWFza1Bhc3MpIHtcclxuXHJcblx0XHRcdFx0XHRtYXNrQWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmKHBhc3MgaW5zdGFuY2VvZiBDbGVhck1hc2tQYXNzKSB7XHJcblxyXG5cdFx0XHRcdFx0bWFza0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGJ1ZmZlcnMgYW5kIHRoZSByZW5kZXJlcidzIG91dHB1dCBjYW52YXMuXHJcblx0ICpcclxuXHQgKiBFdmVyeSBwYXNzIHdpbGwgYmUgaW5mb3JtZWQgb2YgdGhlIG5ldyBzaXplLiBJdCdzIHVwIHRvIGVhY2ggcGFzcyBob3cgdGhhdFxyXG5cdCAqIGluZm9ybWF0aW9uIGlzIHVzZWQuXHJcblx0ICpcclxuXHQgKiBJZiBubyB3aWR0aCBvciBoZWlnaHQgaXMgc3BlY2lmaWVkLCB0aGUgcmVuZGVyIHRhcmdldHMgYW5kIHBhc3NlcyB3aWxsIGJlXHJcblx0ICogdXBkYXRlZCB3aXRoIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIHJlbmRlcmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aF0gLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdIC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblxyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0aWYod2lkdGggPT09IHVuZGVmaW5lZCB8fCBoZWlnaHQgPT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0d2lkdGggPSBzaXplLndpZHRoO1xyXG5cdFx0XHRoZWlnaHQgPSBzaXplLmhlaWdodDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdHdpZHRoICo9IHBpeGVsUmF0aW87XHJcblx0XHRoZWlnaHQgKj0gcGl4ZWxSYXRpbztcclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMud3JpdGVCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHRmb3IoaSA9IDAsIGwgPSBwYXNzZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcblxyXG5cdFx0XHRwYXNzZXNbaV0uc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoaXMgY29tcG9zZXIgYnkgZGVsZXRpbmcgYWxsIHBhc3NlcyBhbmQgY3JlYXRpbmcgbmV3IGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBzZXR0aW5ncyBvZiB0aGUgcmVuZGVyZXIgd2lsbCBiZSB1c2VkLlxyXG5cdCAqL1xyXG5cclxuXHRyZXNldChyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBkZXB0aEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5kZXB0aEJ1ZmZlcjtcclxuXHRcdGNvbnN0IHN0ZW5jaWxCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuc3RlbmNpbEJ1ZmZlcjtcclxuXHRcdGNvbnN0IGRlcHRoVGV4dHVyZSA9ICh0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlICE9PSBudWxsKTtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2UoKHJlbmRlclRhcmdldCA9PT0gdW5kZWZpbmVkKSA/XHJcblx0XHRcdHRoaXMuY3JlYXRlQnVmZmVyKGRlcHRoQnVmZmVyLCBzdGVuY2lsQnVmZmVyLCBkZXB0aFRleHR1cmUpIDpcclxuXHRcdFx0cmVuZGVyVGFyZ2V0XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIGFsbCBwYXNzZXMgYW5kIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogVGhpcyBtZXRob2QgZGVhbGxvY2F0ZXMgYWxsIHJlbmRlciB0YXJnZXRzLCB0ZXh0dXJlcyBhbmQgbWF0ZXJpYWxzIGNyZWF0ZWRcclxuXHQgKiBieSB0aGUgcGFzc2VzLiBJdCBhbHNvIGRlbGV0ZXMgdGhpcyBjb21wb3NlcidzIGZyYW1lIGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBjb21wb3NlciB3aWxsIGJlY29tZSBpbm9wZXJhdGl2ZS5cclxuXHQgKi9cclxuXHJcblx0ZGlzcG9zZShyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHJcblx0XHRpZih0aGlzLnJlYWRCdWZmZXIgIT09IG51bGwgJiYgdGhpcy53cml0ZUJ1ZmZlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyLmRpc3Bvc2UoKTtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlci5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUocGFzc2VzLmxlbmd0aCA+IDApIHtcclxuXHJcblx0XHRcdHBhc3Nlcy5wb3AoKS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHJlbmRlclRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHQvLyBSZWFuaW1hdGUuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHJlbmRlclRhcmdldDtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5jbG9uZSgpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR0aGlzLmNvcHlQYXNzLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcmUgY29tcG9uZW50cy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9jb3JlXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwiLi9lZmZlY3QtY29tcG9zZXIuanNcIjtcclxuIiwiLyoqXHJcbiAqIEV4cG9zdXJlIG9mIHRoZSBsaWJyYXJ5IGNvbXBvbmVudHMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmdcclxuICovXHJcblxyXG5leHBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCIuL2NvcmVcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0Qmxvb21QYXNzLFxyXG5cdEJsdXJQYXNzLFxyXG5cdEJva2VoUGFzcyxcclxuXHRCb2tlaDJQYXNzLFxyXG5cdENsZWFyUGFzcyxcclxuXHRDbGVhck1hc2tQYXNzLFxyXG5cdERlcHRoUGFzcyxcclxuXHREb3RTY3JlZW5QYXNzLFxyXG5cdEZpbG1QYXNzLFxyXG5cdEdsaXRjaE1vZGUsXHJcblx0R2xpdGNoUGFzcyxcclxuXHRHb2RSYXlzUGFzcyxcclxuXHRNYXNrUGFzcyxcclxuXHRQYXNzLFxyXG5cdFBpeGVsYXRpb25QYXNzLFxyXG5cdFJlbmRlclBhc3MsXHJcblx0U2F2ZVBhc3MsXHJcblx0U2hhZGVyUGFzcyxcclxuXHRTaG9ja1dhdmVQYXNzLFxyXG5cdFNNQUFQYXNzLFxyXG5cdFRleHR1cmVQYXNzLFxyXG5cdFRvbmVNYXBwaW5nUGFzc1xyXG59IGZyb20gXCIuL3Bhc3Nlc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCxcclxuXHRCb2tlaE1hdGVyaWFsLFxyXG5cdEJva2VoMk1hdGVyaWFsLFxyXG5cdENvbWJpbmVNYXRlcmlhbCxcclxuXHRDb252b2x1dGlvbk1hdGVyaWFsLFxyXG5cdENvcHlNYXRlcmlhbCxcclxuXHREZXB0aE1hdGVyaWFsLFxyXG5cdERvdFNjcmVlbk1hdGVyaWFsLFxyXG5cdEZpbG1NYXRlcmlhbCxcclxuXHRHbGl0Y2hNYXRlcmlhbCxcclxuXHRHb2RSYXlzTWF0ZXJpYWwsXHJcblx0S2VybmVsU2l6ZSxcclxuXHRMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0UGl4ZWxhdGlvbk1hdGVyaWFsLFxyXG5cdFNob2NrV2F2ZU1hdGVyaWFsLFxyXG5cdFNNQUFCbGVuZE1hdGVyaWFsLFxyXG5cdFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwsXHJcblx0U01BQVdlaWdodHNNYXRlcmlhbCxcclxuXHRUb25lTWFwcGluZ01hdGVyaWFsXHJcbn0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbiIsImltcG9ydCB7XG4gIEVmZmVjdENvbXBvc2VyLFxuICBSZW5kZXJQYXNzLFxuICBTaGFkZXJQYXNzXG59IGZyb20gJ3Bvc3Rwcm9jZXNzaW5nJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG5jb25zdCBwb2x5ZmlsbCA9IChvYmplY3QsIG1ldGhvZCwgc2hvd1dhcm4gPSB0cnVlKSA9PiB7XG4gIGlmIChvYmplY3RbbWV0aG9kXSkgcmV0dXJuO1xuICBpZiAoc2hvd1dhcm4pIGNvbnNvbGUud2FybihgQFBvc3RQcm9jZXNzb3JNb2R1bGU6IHBhc3MuJHttZXRob2R9KCkgd2FzIG5vdCBmb3VuZC5gLCBvYmplY3QpO1xuICBvYmplY3RbbWV0aG9kXSA9ICgpID0+IHt9O1xufTtcblxuZXhwb3J0IGNsYXNzIFBvc3RQcm9jZXNzb3JNb2R1bGUge1xuICBjdXJyZW50UGFzcyA9IG51bGw7XG5cbiAgZGVmZXIgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBjb25zdHJ1Y3Rvcih7ZGVidWd9ID0ge2RlYnVnOiB0cnVlfSkge1xuICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdwb3N0cHJvY2Vzc29yJyk7XG5cbiAgICB0aGlzLmVmZmVjdHMgPSBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykuZWZmZWN0cztcbiAgICB0aGlzLnJlbmRlcmVyID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5zY2VuZSA9IG1hbmFnZXIuZ2V0KCdzY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgdGhpcy5jb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3Nlcih0aGlzLnJlbmRlcmVyKTtcblxuICAgIG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5zdG9wKCk7XG5cbiAgICBjb25zdCBjb21wb3NlciA9IHRoaXMuY29tcG9zZXI7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoY2xvY2sgPT4gY29tcG9zZXIucmVuZGVyKGNsb2NrLmdldERlbHRhKCkpKS5zdGFydChtYW5hZ2VyLmhhbmRsZXIpO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgcmVuZGVyZXI6IHJlbmRlcmVyID0+IHtcbiAgICAgICAgdGhpcy5jb21wb3Nlci5yZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpO1xuICAgICAgfSxcblxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcblxuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVzb2x2ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBwYXNzID0gbmV3IFJlbmRlclBhc3ModGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEubmF0aXZlKTtcblxuICAgICAgLy8gVE9ETzogU3VwcG9ydCBmb3IgZWZmZWN0cy5cblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIHBhc3MocGFzcykge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBwb2x5ZmlsbChwYXNzLCAnc2V0U2l6ZScsIHRoaXMuZGVidWcpO1xuICAgICAgcG9seWZpbGwocGFzcywgJ2luaXRpYWxpc2UnLCB0aGlzLmRlYnVnKTtcblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNoYWRlcihtYXRlcmlhbCwgdGV4dHVyZUlEID0gJ3JlYWRCdWZmZXInKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIGlmICghbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSlcbiAgICAgICAgbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSA9IHt2YWx1ZTogbnVsbH07XG5cbiAgICAgIGNvbnN0IHBhc3MgPSBuZXcgU2hhZGVyUGFzcyhtYXRlcmlhbCwgdGV4dHVyZUlEKTtcbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBQYXNzIEFQSVxuXG4gIGdldChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWVcbiAgICAgID8gdGhpcy5jb21wb3Nlci5wYXNzZXMuZmlsdGVyKHBhc3MgPT4gcGFzcy5uYW1lID09PSBuYW1lKVswXVxuICAgICAgOiB0aGlzLmN1cnJlbnRQYXNzO1xuICB9XG5cbiAgdG8obmFtZSkge1xuICAgIHRoaXMuY3VycmVudFBhc3MgPSBuYW1lO1xuICB9XG5cbiAgcmVuZGVyVG9TY3JlZW4oYm9vbCA9IHRydWUpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFzcy5yZW5kZXJUb1NjcmVlbiA9IGJvb2w7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5hbWUobmFtZSkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzLm5hbWUgPSBuYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFdmVudHNQYXRjaE1vZHVsZSB7XG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdldmVudHMnKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICB9XG5cbiAgcGF0Y2hFdmVudHMob3JpZ2luT2JqZWN0LCBkZXN0T2JqZWN0LCBldmVudHMgPSBbXSkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICBvcmlnaW5PYmplY3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZSA9PiBkZXN0T2JqZWN0LmVtaXQoZXZlbnQsIGUpKVxuICAgICk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHtlbGVtZW50LCBwYXRjaEV2ZW50c30gPSBzZWxmO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ21vdXNlbW92ZScsXG4gICAgICAnbW91c2V1cCcsXG4gICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgJ21vdXNlZG93bicsXG4gICAgICAnY2xpY2snLFxuICAgICAgJ3doZWVsJyxcbiAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICd0b3VjaGVuZCcsXG4gICAgICAndG91Y2htb3ZlJyxcbiAgICAgICdrZXlkb3duJ1xuICAgIF0pO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ2tleWRvd24nLFxuICAgICAgJ2tleXVwJyxcbiAgICAgICdrZXlwcmVzcydcbiAgICBdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgVmVjdG9yMixcbiAgUmF5Y2FzdGVyLFxuICBQbGFuZSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG4vKipcbiAqIEBjbGFzcyBWaXJ0dWFsTW91c2VNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtCb29sZWFufSBbZ2xvYmFsTW92ZW1lbnQ9ZmFsc2VdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXh0ZW5kcyBFdmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFZpcnR1YWxNb3VzZU1vZHVsZSBleHRlbmRzIEV2ZW50cyB7XG4gIG1vdXNlID0gbmV3IFZlY3RvcjIoKTtcbiAgcmF5Y2FzdGVyID0gbmV3IFJheWNhc3RlcigpO1xuICB3b3JsZCA9IG51bGw7XG4gIGNhbnZhcyA9IG51bGw7XG4gIHByb2plY3Rpb25QbGFuZSA9IG5ldyBQbGFuZShuZXcgVmVjdG9yMygwLCAwLCAxKSwgMCk7XG5cbiAgY29uc3RydWN0b3IoZ2xvYmFsTW92ZW1lbnQgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5nbG9iYWxNb3ZlbWVudCA9IGdsb2JhbE1vdmVtZW50O1xuICB9XG5cbiAgdXBkYXRlKGUsIGN1c3RvbVgsIGN1c3RvbVkpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCB4ID0gY3VzdG9tWCB8fCBlLmNsaWVudFg7XG4gICAgY29uc3QgeSA9IGN1c3RvbVkgfHwgZS5jbGllbnRZO1xuXG4gICAgdGhpcy5tb3VzZS54ID0gKCh4IC0gcmVjdC5sZWZ0KSAvIChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSkgKiAyIC0gMTtcbiAgICB0aGlzLm1vdXNlLnkgPSAtKCh5IC0gcmVjdC50b3ApIC8gKHJlY3QuYm90dG9tIC0gcmVjdC50b3ApKSAqIDIgKyAxO1xuXG4gICAgdGhpcy5wcm9qZWN0aW9uUGxhbmUubm9ybWFsLmNvcHkodGhpcy5jYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24oKSk7XG5cbiAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKHRoaXMubW91c2UsIHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLmVtaXQoJ21vdmUnKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdtb3VzZScpO1xuICAgIG1hbmFnZXIucmVxdWlyZSgnZXZlbnRzJywgKCkgPT4gbmV3IEV2ZW50c1BhdGNoTW9kdWxlKCkpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgW1xuICAgICAgJ2NsaWNrJyxcbiAgICAgICdtb3VzZWRvd24nLFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgJ21vdXNlbW92ZSdcbiAgICBdLmZvckVhY2goZXYgPT4gdGhpcy5vbihldiwgZSA9PiBzZWxmLmVtaXQoZXYsIGUpKSk7XG5cbiAgICBzZWxmLmdsb2JhbFggPSAwO1xuICAgIHNlbGYuZ2xvYmFsWSA9IDA7XG5cbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2VsZi5nbG9iYWxYICs9IGUubW92ZW1lbnRYO1xuICAgICAgICBzZWxmLmdsb2JhbFkgKz0gZS5tb3ZlbWVudFk7XG5cbiAgICAgICAgc2VsZi51cGRhdGUoZSwgc2VsZi5nbG9iYWxYLCBzZWxmLmdsb2JhbFkpO1xuICAgICAgfSBlbHNlIHNlbGYudXBkYXRlKGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdHJhY2soY29tcG9uZW50LCBuZXN0ZWQgPSB0cnVlKSB7XG4gICAgbGV0IGlzSG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5vbignbW92ZScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhvdmVycyhjb21wb25lbnQsIG5lc3RlZCkpIHtcbiAgICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNlbW92ZScpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb21wb25lbnQuZW1pdCgnbW91c2VvdmVyJyk7XG4gICAgICAgICAgaXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0hvdmVyZWQpIHtcbiAgICAgICAgY29tcG9uZW50LmVtaXQoJ21vdXNlb3V0Jyk7XG4gICAgICAgIGlzSG92ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnY2xpY2snKTtcbiAgICAgIGVsc2UgY29tcG9uZW50LmVtaXQoJ29mZkNsaWNrJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2Vkb3duJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNldXAnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbih7bmF0aXZlfSwgbmVzdGVkID0gdHJ1ZSkge1xuICAgIGlmIChuYXRpdmUuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiBuZXN0ZWQpIHtcbiAgICAgIGNvbnN0IG9iamVjdHMgPSBbXTtcbiAgICAgIG5hdGl2ZS50cmF2ZXJzZShjaGlsZCA9PiBvYmplY3RzLnB1c2goY2hpbGQpKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMob2JqZWN0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdChuYXRpdmUpO1xuICB9XG5cbiAgcHJvamVjdChwbGFuZSA9IHRoaXMucHJvamVjdGlvblBsYW5lKSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RQbGFuZShwbGFuZSk7XG4gIH1cblxuICBob3ZlcnMoY29tcG9uZW50LCBuZXN0ZWQgPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9uKGNvbXBvbmVudCwgbmVzdGVkKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIucmF5O1xuICB9XG5cbiAgZ2V0IHgoKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2UueDtcbiAgfVxuXG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlLnk7XG4gIH1cbn1cbiIsImltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xuICBzdGF0aWMgZnJvbShjb250cm9scykge1xuICAgIHJldHVybiBuZXcgQ29udHJvbHNNb2R1bGUoe2NvbnRyb2xzfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICBmaXg6IGNvbnRyb2xzID0+IGNvbnRyb2xzLFxuXG4gICAgICB1cGRhdGUoYykge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgfVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5wYXJhbXMuY29udHJvbHM7XG4gICAgdGhpcy51cGRhdGUgPSB0aGlzLnBhcmFtcy51cGRhdGU7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnJlcXVpcmUoJ2V2ZW50cycsICgpID0+IG5ldyBFdmVudHNQYXRjaE1vZHVsZSgpKTtcbiAgfVxuXG4gIHNldENvbnRyb2xzKGNvbnRyb2xzKSB7XG4gICAgdGhpcy5jb250cm9scyA9IGNvbnRyb2xzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VXBkYXRlKHVwZGF0ZSkge1xuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLnVwZGF0ZUxvb3AgPSBuZXcgTG9vcChzZWxmLnVwZGF0ZS5iaW5kKHNlbGYpKTtcbiAgICBzZWxmLnVwZGF0ZUxvb3Auc3RhcnQodGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEZvZ0V4cDIsXG4gIEZvZ1xufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIEZvZ01vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17Y29sb3I6IDB4ZWZkMWI1LCBkZW5zaXR5OiAwLjAyMCwgbmVhcjogMTAsIGZhcjogMTAwMH1dIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlPWV4cDJdIC0gVGhlIHR5cGUgb2YgZm9nIC0gZXhwMiBvciBsaW5lYXJcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkhvdyB0byBjcmVhdGUgYW5kIGFwcGx5IGEgRm9nTW9kdWxlPC9jYXB0aW9uPlxuICogY29uc3QgZm9nTW9kdWxlID0gbmV3IEZvZ01vZHVsZSh7XG4gKiAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICBkZW5zaXR5OiAwLjAzLFxuICogICAgbmVhcjogMjAsXG4gKiAgICBmYXI6IDIwMFxuICogIH0sICdleHAyJyk7XG4gKlxuICogbmV3IEFwcChbXG4gKiAgLi4uLFxuICogIGZvZ01vZHVsZVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBGb2dNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgdHlwZSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb2xvcjogMHhlZmQxYjUsXG4gICAgICBkZW5zaXR5OiAwLjAyMCxcbiAgICAgIG5lYXI6IDEwLFxuICAgICAgZmFyOiAxMDAwXG4gICAgfSwgcGFyYW1zKTtcbiAgICBpZiAoIXR5cGUgfHwgdHlwZSA9PT0gJ2V4cDInKSB0aGlzLmZvZyA9IG5ldyBGb2dFeHAyKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5kZW5zaXR5KTtcbiAgICBlbHNlIGlmICh0eXBlID09PSAnbGluZWFyJykgdGhpcy5mb2cgPSBuZXcgRm9nKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5uZWFyLCB0aGlzLnBhcmFtcy5mYXIpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2ZvZycsIHRoaXMuZm9nKTtcbiAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKS5mb2cgPSB0aGlzLmZvZztcbiAgfVxufVxuIiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuXG5jb25zdCBpc0VxdWFsRGVmYXVsdCA9IChhLCBiKSA9PiB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgZWxzZSBpZiAoYSAmJiBhLmVxdWFscyAmJiBhLmVxdWFscyhiKSkgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBAY2xhc3MgU3RhdGVNb2R1bGVcbiAqIEBkZXNjcmlwdGlvbiBgU3RhdGVNb2R1bGVgIGlzIHVzZWZ1bCBmb3IgYXBwcywgd2hlcmUgeW91IG5lZWQgc3RhdGUgbWFuaXB1bGF0aW9uLlxuICogVGhpcyBjYW4gYmU6IF90cmFuc2l0aW9ucyBiZXR3ZWVuIHNjcmVlbnMsIGdhbWVzLCBkZXZlbG9wbWVudCBtb21lbnRzXy5cbiAqIFlvdSBjYW4gY2hlY2sgW2Jhc2ljL3N0YXRlXShodHRwczovL3docy1kZXYuc3VyZ2Uuc2gvZXhhbXBsZXMvP2Jhc2ljL3N0YXRlKSBleGFtcGxlLlxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIHN0YXRlIG1vZHVsZTwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICAvLyAuLi5cbiAqICAgbmV3IFN0YXRlTW9kdWxlKCkuZGVmYXVsdCh7XG4gKiAgICAgc3BoZXJlQ29sb3I6IDB4ZmYwMDAwXG4gKiAgIH0pXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlTW9kdWxlIHtcbiAgc3RhdGljIGFjdGlvbkdlbmVyYXRlKGlzRXF1YWwpIHtcbiAgICByZXR1cm4gKHN0YXRlID0gW3t9LCAnJ10sIHtrZXksIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoaXNFcXVhbChzdGF0ZVswXVtrZXldLCBkYXRhKSkgcmV0dXJuIHN0YXRlO1xuXG4gICAgICBzdGF0ZVswXVtrZXldID0gZGF0YTtcbiAgICAgIHN0YXRlWzFdID0ga2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVxdWFsQ2hlY2sgPSBpc0VxdWFsRGVmYXVsdCkge1xuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAgIFN0YXRlTW9kdWxlLmFjdGlvbkdlbmVyYXRlKGVxdWFsQ2hlY2spXG4gICAgKTtcblxuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHt9O1xuICAgIHRoaXMuY3VycmVudENvbmZpZyA9ICdkZWZhdWx0JztcbiAgICB0aGlzLnByZXZDb25maWcgPSAnZGVmYXVsdCc7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZhdWx0XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHNldHVwXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogbmV3IFdIUy5TdGF0ZU1vZHVsZSgpLmRlZmF1bHQoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiBVVElMUy4kY29sb3JzLm1lc2gsXG4gICAqICAgcGxhbmVDb2xvcjogMHg0NDdGOEJcbiAgICogfSlcbiAgICovXG4gIGRlZmF1bHQoZGF0YSkge1xuICAgIHRoaXMuY29uZmlnKHtkZWZhdWx0OiBkYXRhfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRFcXVhbENoZWNrXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIGFuIGVxdWFsQ2hlY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBzZXR1cFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBzZXRFcXVhbENoZWNrKGZ1bmMpIHtcbiAgICB0aGlzLnN0b3JlLnJlcGxhY2VSZWR1Y2VyKFxuICAgICAgU3RhdGVNb2R1bGUuYWN0aW9uR2VuZXJhdGUoZnVuYylcbiAgICApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3N0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb25maWdcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgY29uZmlndXJhdGlvbnMgZnJvbSBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdzIENvbmZpZ3VyYXRpb24gZGF0YVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBBZGRpbmcgYGdyZWVuYCBjb25maWd1cmF0aW9uPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS5jb25maWcoe1xuICAgKiAgIGdyZWVuOiB7XG4gICAqICAgICBzcGhlcmVDb2xvcjogMHgwMGZmMDAsXG4gICAqICAgICBwbGFuZUNvbG9yOiAweDAwZmYwMFxuICAgKiAgIH1cbiAgICogfSk7XG4gICAqL1xuICBjb25maWcoY29uZmlncykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ3MpIHtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uW2tleV0gPSBrZXkgPT09ICdkZWZhdWx0J1xuICAgICAgICAgID8gY29uZmlnc1trZXldXG4gICAgICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3VyYXRpb24uZGVmYXVsdCwgY29uZmlnc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgdXBkYXRlcyBmcm9tIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZXMgVXBkYXRlcyBkYXRhXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IFVwZGF0ZSBjYWxsYmFjayBmb3IgYHNwaGVyZUNvbG9yYDwvY2FwdGlvbj5cbiAgICogc3RhdGUudXBkYXRlKHtcbiAgICogICBzcGhlcmVDb2xvcjogY29sb3IgPT4gc3BoZXJlLm1hdGVyaWFsLmNvbG9yLnNldEhleChjb2xvcilcbiAgICogfSk7XG4gICAqL1xuICB1cGRhdGUodXBkYXRlcyA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB1cGRhdGVzW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdG9cbiAgICogQGRlc2NyaXB0aW9uIFN3aXRjaCB0byBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnTmFtZSBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IENoYW5nZXMgY29uZmlndXJhdGlvbiB0byBgZ3JlZW5gPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS50bygnZ3JlZW4nKTtcbiAgICovXG4gIHRvKGNvbmZpZ05hbWUpIHtcbiAgICB0aGlzLnByZXZDb25maWcgPSB0aGlzLmN1cnJlbnRDb25maWc7XG4gICAgdGhpcy5jdXJyZW50Q29uZmlnID0gY29uZmlnTmFtZTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgPyB0aGlzLmNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgIDogdGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHQ7XG5cbiAgICB0aGlzLnNldChjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgY3VycmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogc3RhdGUuc2V0KHtcbiAgICogICBzcGhlcmVDb2xvcjogMHgwMGZmMDBcbiAgICogfSk7XG4gICAqL1xuICBzZXQoZGF0YSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpXG4gICAgICBpZiAoa2V5KSB0aGlzLnN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnQUREJywga2V5LCBkYXRhOiBkYXRhW2tleV19KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGRhdGEgb2YgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFBhcmFtZXRlciBuYW1lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIHN0YXRlLmdldCgnc3BoZXJlQ29sb3InKTsgLy8gMHgwMGZmMDBcbiAgICovXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwcmV2XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIHByZXZpb3VzIGNvbmZpZ3VyYXRpb24sIGluIG90aGVyIGNhc2UgLSByZXR1cm4gYGZhbHNlVmFsYC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZyBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7QW55fSB0cnVlVmFsIFZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyB0cnV0aHkuXG4gICAqIEBwYXJhbSB7QW55fSBmYWxzZVZhbCBDVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIGZhbHN5LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBwcmV2KGNvbmZpZywgdHJ1ZVZhbCwgZmFsc2VWYWwpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2Q29uZmlnID09PSBjb25maWcgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjdXJyZW50XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIGN1cnJlbnQgY29uZmlndXJhdGlvbiwgaW4gb3RoZXIgY2FzZSAtIHJldHVybiBgZmFsc2VWYWxgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQHBhcmFtIHtBbnl9IHRydWVWYWwgVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIHRydXRoeS5cbiAgICogQHBhcmFtIHtBbnl9IGZhbHNlVmFsIENWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgZmFsc3kuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIGN1cnJlbnQoY29uZmlnLCB0cnVlVmFsLCBmYWxzZVZhbCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDb25maWcgPT09IGNvbmZpZyA/IHRydWVWYWwgOiBmYWxzZVZhbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTU9VU0UsXG4gIFF1YXRlcm5pb24sXG4gIFNwaGVyaWNhbCxcbiAgVmVjdG9yMixcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIE9ydGhvZ3JhcGhpY0NhbWVyYSxcbiAgRXZlbnREaXNwYXRjaGVyLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuLy8gVGhpcyBzZXQgb2YgY29udHJvbHMgcGVyZm9ybXMgb3JiaXRpbmcsIGRvbGx5aW5nICh6b29taW5nKSwgYW5kIHBhbm5pbmcuXG4vLyBVbmxpa2UgVHJhY2tiYWxsQ29udHJvbHMsIGl0IG1haW50YWlucyB0aGUgXCJ1cFwiIGRpcmVjdGlvbiBvYmplY3QudXAgKCtZIGJ5IGRlZmF1bHQpLlxuLy9cbi8vICAgIE9yYml0IC0gbGVmdCBtb3VzZSAvIHRvdWNoOiBvbmUgZmluZ2VyIG1vdmVcbi8vICAgIFpvb20gLSBtaWRkbGUgbW91c2UsIG9yIG1vdXNld2hlZWwgLyB0b3VjaDogdHdvIGZpbmdlciBzcHJlYWQgb3Igc3F1aXNoXG4vLyAgICBQYW4gLSByaWdodCBtb3VzZSwgb3IgYXJyb3cga2V5cyAvIHRvdWNoOiB0aHJlZSBmaW50ZXIgc3dpcGVcblxuZXhwb3J0IGNsYXNzIFRocmVlT3JiaXRDb250cm9scyBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCwgZG9tRWxlbWVudCwgZXZlbnRIYW5kbGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gKGRvbUVsZW1lbnQgPT09IHVuZGVmaW5lZCkgPyBkb2N1bWVudCA6IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBldmVudEhhbmRsZXI7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGNvbnRyb2xcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLy8gXCJ0YXJnZXRcIiBzZXRzIHRoZSBsb2NhdGlvbiBvZiBmb2N1cywgd2hlcmUgdGhlIG9iamVjdCBvcmJpdHMgYXJvdW5kXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIGRvbGx5IGluIGFuZCBvdXQgKCBQZXJzcGVjdGl2ZUNhbWVyYSBvbmx5IClcbiAgICB0aGlzLm1pbkRpc3RhbmNlID0gMDtcbiAgICB0aGlzLm1heERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gem9vbSBpbiBhbmQgb3V0ICggT3J0aG9ncmFwaGljQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluWm9vbSA9IDA7XG4gICAgdGhpcy5tYXhab29tID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgdmVydGljYWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBSYW5nZSBpcyAwIHRvIE1hdGguUEkgcmFkaWFucy5cbiAgICB0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IGhvcml6b250YWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBJZiBzZXQsIG11c3QgYmUgYSBzdWItaW50ZXJ2YWwgb2YgdGhlIGludGVydmFsIFsgLSBNYXRoLlBJLCBNYXRoLlBJIF0uXG4gICAgdGhpcy5taW5BemltdXRoQW5nbGUgPSAtSW5maW5pdHk7IC8vIHJhZGlhbnNcbiAgICB0aGlzLm1heEF6aW11dGhBbmdsZSA9IEluZmluaXR5OyAvLyByYWRpYW5zXG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBlbmFibGUgZGFtcGluZyAoaW5lcnRpYSlcbiAgICAvLyBJZiBkYW1waW5nIGlzIGVuYWJsZWQsIHlvdSBtdXN0IGNhbGwgY29udHJvbHMudXBkYXRlKCkgaW4geW91ciBhbmltYXRpb24gbG9vcFxuICAgIHRoaXMuZW5hYmxlRGFtcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZGFtcGluZ0ZhY3RvciA9IDAuMjU7XG5cbiAgICAvLyBUaGlzIG9wdGlvbiBhY3R1YWxseSBlbmFibGVzIGRvbGx5aW5nIGluIGFuZCBvdXQ7IGxlZnQgYXMgXCJ6b29tXCIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHpvb21pbmdcbiAgICB0aGlzLmVuYWJsZVpvb20gPSB0cnVlO1xuICAgIHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcm90YXRpbmdcbiAgICB0aGlzLmVuYWJsZVJvdGF0ZSA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHBhbm5pbmdcbiAgICB0aGlzLmVuYWJsZVBhbiA9IHRydWU7XG4gICAgdGhpcy5rZXlQYW5TcGVlZCA9IDcuMDsgLy8gcGl4ZWxzIG1vdmVkIHBlciBhcnJvdyBrZXkgcHVzaFxuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gYXV0b21hdGljYWxseSByb3RhdGUgYXJvdW5kIHRoZSB0YXJnZXRcbiAgICAvLyBJZiBhdXRvLXJvdGF0ZSBpcyBlbmFibGVkLCB5b3UgbXVzdCBjYWxsIGNvbnRyb2xzLnVwZGF0ZSgpIGluIHlvdXIgYW5pbWF0aW9uIGxvb3BcbiAgICB0aGlzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9Sb3RhdGVTcGVlZCA9IDIuMDsgLy8gMzAgc2Vjb25kcyBwZXIgcm91bmQgd2hlbiBmcHMgaXMgNjBcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHVzZSBvZiB0aGUga2V5c1xuICAgIHRoaXMuZW5hYmxlS2V5cyA9IHRydWU7XG5cbiAgICAvLyBUaGUgZm91ciBhcnJvdyBrZXlzXG4gICAgdGhpcy5rZXlzID0ge0xFRlQ6IDM3LCBVUDogMzgsIFJJR0hUOiAzOSwgQk9UVE9NOiA0MH07XG5cbiAgICAvLyBNb3VzZSBidXR0b25zXG4gICAgdGhpcy5tb3VzZUJ1dHRvbnMgPSB7T1JCSVQ6IE1PVVNFLkxFRlQsIFpPT006IE1PVVNFLk1JRERMRSwgUEFOOiBNT1VTRS5SSUdIVH07XG5cbiAgICAvLyBmb3IgcmVzZXRcbiAgICB0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLnpvb20wID0gdGhpcy5vYmplY3Quem9vbTtcblxuICAgIC8vXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvL1xuXG4gICAgdGhpcy5nZXRQb2xhckFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC5waGk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QXppbXV0aGFsQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gc3BoZXJpY2FsLnRoZXRhO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy50YXJnZXQuY29weSh0aGlzLnRhcmdldDApO1xuICAgICAgdGhpcy5vYmplY3QucG9zaXRpb24uY29weSh0aGlzLnBvc2l0aW9uMCk7XG4gICAgICB0aGlzLm9iamVjdC56b29tID0gdGhpcy56b29tMDtcblxuICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICAvLyB0aGlzIG1ldGhvZCBpcyBleHBvc2VkLCBidXQgcGVyaGFwcyBpdCB3b3VsZCBiZSBiZXR0ZXIgaWYgd2UgY2FuIG1ha2UgaXQgcHJpdmF0ZS4uLlxuICAgIHRoaXMudXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgLy8gc28gY2FtZXJhLnVwIGlzIHRoZSBvcmJpdCBheGlzXG4gICAgICBjb25zdCBxdWF0ID0gbmV3IFF1YXRlcm5pb24oKS5zZXRGcm9tVW5pdFZlY3RvcnMob2JqZWN0LnVwLCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XG4gICAgICBjb25zdCBxdWF0SW52ZXJzZSA9IHF1YXQuY2xvbmUoKS5pbnZlcnNlKCk7XG5cbiAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XG4gICAgICBjb25zdCBsYXN0UXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG5cbiAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG4gICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO1xuXG4gICAgICAgIC8vIHJvdGF0ZSBvZmZzZXQgdG8gXCJ5LWF4aXMtaXMtdXBcIiBzcGFjZVxuICAgICAgICBvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKHF1YXQpO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20gei1heGlzIGFyb3VuZCB5LWF4aXNcbiAgICAgICAgc3BoZXJpY2FsLnNldEZyb21WZWN0b3IzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1JvdGF0ZSAmJiBzdGF0ZSA9PT0gU1RBVEUuTk9ORSlcbiAgICAgICAgICByb3RhdGVMZWZ0KGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC50aGV0YSArPSBzcGhlcmljYWxEZWx0YS50aGV0YTtcbiAgICAgICAgc3BoZXJpY2FsLnBoaSArPSBzcGhlcmljYWxEZWx0YS5waGk7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgdGhldGEgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwudGhldGEgPSBNYXRoLm1heCh0aGlzLm1pbkF6aW11dGhBbmdsZSwgTWF0aC5taW4odGhpcy5tYXhBemltdXRoQW5nbGUsIHNwaGVyaWNhbC50aGV0YSkpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC5waGkgPSBNYXRoLm1heCh0aGlzLm1pblBvbGFyQW5nbGUsIE1hdGgubWluKHRoaXMubWF4UG9sYXJBbmdsZSwgc3BoZXJpY2FsLnBoaSkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5tYWtlU2FmZSgpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5yYWRpdXMgKj0gc2NhbGU7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgcmFkaXVzIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnJhZGl1cyA9IE1hdGgubWF4KHRoaXMubWluRGlzdGFuY2UsIE1hdGgubWluKHRoaXMubWF4RGlzdGFuY2UsIHNwaGVyaWNhbC5yYWRpdXMpKTtcblxuICAgICAgICAvLyBtb3ZlIHRhcmdldCB0byBwYW5uZWQgbG9jYXRpb25cbiAgICAgICAgdGhpcy50YXJnZXQuYWRkKHBhbk9mZnNldCk7XG5cbiAgICAgICAgb2Zmc2V0LnNldEZyb21TcGhlcmljYWwoc3BoZXJpY2FsKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0SW52ZXJzZSk7XG5cbiAgICAgICAgcG9zaXRpb24uY29weSh0aGlzLnRhcmdldCkuYWRkKG9mZnNldCk7XG5cbiAgICAgICAgdGhpcy5vYmplY3QubG9va0F0KHRoaXMudGFyZ2V0KTtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVEYW1waW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgKj0gKDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAqPSAoMSAtIHRoaXMuZGFtcGluZ0ZhY3Rvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnNldCgwLCAwLCAwKTtcblxuICAgICAgICBzY2FsZSA9IDE7XG4gICAgICAgIHBhbk9mZnNldC5zZXQoMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGNvbmRpdGlvbiBpczpcbiAgICAgICAgLy8gbWluKGNhbWVyYSBkaXNwbGFjZW1lbnQsIGNhbWVyYSByb3RhdGlvbiBpbiByYWRpYW5zKV4yID4gRVBTXG4gICAgICAgIC8vIHVzaW5nIHNtYWxsLWFuZ2xlIGFwcHJveGltYXRpb24gY29zKHgvMikgPSAxIC0geF4yIC8gOFxuXG4gICAgICAgIGlmICh6b29tQ2hhbmdlZFxuICAgICAgICAgIHx8IGxhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZCh0aGlzLm9iamVjdC5wb3NpdGlvbikgPiBFUFNcbiAgICAgICAgICB8fCA4ICogKDEgLSBsYXN0UXVhdGVybmlvbi5kb3QodGhpcy5vYmplY3QucXVhdGVybmlvbikpID4gRVBTKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgICAgIGxhc3RQb3NpdGlvbi5jb3B5KHRoaXMub2JqZWN0LnBvc2l0aW9uKTtcbiAgICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pO1xuICAgICAgICAgIHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcblxuICAgICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNwb3NlJyB9ICk7IC8vIHNob3VsZCB0aGlzIGJlIGFkZGVkIGhlcmU/XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gaW50ZXJuYWxzXG4gICAgLy9cblxuICAgIGNvbnN0IGNoYW5nZUV2ZW50ID0ge3R5cGU6ICdjaGFuZ2UnfTtcbiAgICBjb25zdCBzdGFydEV2ZW50ID0ge3R5cGU6ICdzdGFydCd9O1xuICAgIGNvbnN0IGVuZEV2ZW50ID0ge3R5cGU6ICdlbmQnfTtcblxuICAgIGNvbnN0IFNUQVRFID0ge05PTkU6IC0xLCBST1RBVEU6IDAsIERPTExZOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfRE9MTFk6IDQsIFRPVUNIX1BBTjogNX07XG5cbiAgICBsZXQgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgY29uc3QgRVBTID0gMC4wMDAwMDE7XG5cbiAgICAvLyBjdXJyZW50IHBvc2l0aW9uIGluIHNwaGVyaWNhbCBjb29yZGluYXRlc1xuICAgIGNvbnN0IHNwaGVyaWNhbCA9IG5ldyBTcGhlcmljYWwoKTtcbiAgICBjb25zdCBzcGhlcmljYWxEZWx0YSA9IG5ldyBTcGhlcmljYWwoKTtcblxuICAgIGxldCBzY2FsZSA9IDE7XG4gICAgY29uc3QgcGFuT2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcbiAgICBsZXQgem9vbUNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJvdGF0ZVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IHBhblN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5FbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbkRlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGRvbGx5U3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBkb2xseURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGdldEF1dG9Sb3RhdGlvbkFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC8gNjAgLyA2MCAqIHRoaXMuYXV0b1JvdGF0ZVNwZWVkO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRab29tU2NhbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coMC45NSwgdGhpcy56b29tU3BlZWQpO1xuICAgIH07XG5cbiAgICBjb25zdCByb3RhdGVMZWZ0ID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgLT0gYW5nbGU7XG4gICAgfTtcblxuICAgIGNvbnN0IHJvdGF0ZVVwID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEucGhpIC09IGFuZ2xlO1xuICAgIH07XG5cbiAgICBjb25zdCBwYW5MZWZ0ID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRpc3RhbmNlLCBvYmplY3RNYXRyaXgpID0+IHtcbiAgICAgICAgdi5zZXRGcm9tTWF0cml4Q29sdW1uKG9iamVjdE1hdHJpeCwgMCk7IC8vIGdldCBYIGNvbHVtbiBvZiBvYmplY3RNYXRyaXhcbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcigtZGlzdGFuY2UpO1xuICAgICAgICBwYW5PZmZzZXQuYWRkKHYpO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcGFuVXAgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGlzdGFuY2UsIG9iamVjdE1hdHJpeCkgPT4ge1xuICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAxKTsgLy8gZ2V0IFkgY29sdW1uIG9mIG9iamVjdE1hdHJpeFxuICAgICAgICB2Lm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8vIGRlbHRhWCBhbmQgZGVsdGFZIGFyZSBpbiBwaXhlbHM7IHJpZ2h0IGFuZCBkb3duIGFyZSBwb3NpdGl2ZVxuICAgIGNvbnN0IHBhbiA9ICgoKSA9PiB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRlbHRhWCwgZGVsdGFZKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICAgICAgICAvLyBwZXJzcGVjdGl2ZVxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XG4gICAgICAgICAgb2Zmc2V0LmNvcHkocG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCk7XG4gICAgICAgICAgbGV0IHRhcmdldERpc3RhbmNlID0gb2Zmc2V0Lmxlbmd0aCgpO1xuXG4gICAgICAgICAgLy8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXG4gICAgICAgICAgdGFyZ2V0RGlzdGFuY2UgKj0gTWF0aC50YW4oKHRoaXMub2JqZWN0LmZvdiAvIDIpICogTWF0aC5QSSAvIDE4MC4wKTtcblxuICAgICAgICAgIC8vIHdlIGFjdHVhbGx5IGRvbid0IHVzZSBzY3JlZW5XaWR0aCwgc2luY2UgcGVyc3BlY3RpdmUgY2FtZXJhIGlzIGZpeGVkIHRvIHNjcmVlbiBoZWlnaHRcbiAgICAgICAgICBwYW5MZWZ0KDIgKiBkZWx0YVggKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKDIgKiBkZWx0YVkgKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gb3J0aG9ncmFwaGljXG4gICAgICAgICAgcGFuTGVmdChkZWx0YVggKiAodGhpcy5vYmplY3QucmlnaHQgLSB0aGlzLm9iamVjdC5sZWZ0KSAvIHRoaXMub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudFdpZHRoLCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKGRlbHRhWSAqICh0aGlzLm9iamVjdC50b3AgLSB0aGlzLm9iamVjdC5ib3R0b20pIC8gdGhpcy5vYmplY3Quem9vbSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNhbWVyYSBuZWl0aGVyIG9ydGhvZ3JhcGhpYyBub3IgcGVyc3BlY3RpdmVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIHBhbiBkaXNhYmxlZC4nKTtcbiAgICAgICAgICB0aGlzLmVuYWJsZVBhbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBkb2xseUluID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgLz0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tICogZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGRvbGx5T3V0ID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgKj0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tIC8gZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gZXZlbnQgY2FsbGJhY2tzIC0gdXBkYXRlIHRoZSBvYmplY3Qgc3RhdGVcbiAgICAvL1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25Sb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93bkRvbGx5JyApO1xuXG4gICAgICBkb2xseVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25QYW4nICk7XG5cbiAgICAgIHBhblN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQpO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXG4gICAgICByb3RhdGVMZWZ0KDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgLy8gcm90YXRpbmcgdXAgYW5kIGRvd24gYWxvbmcgd2hvbGUgc2NyZWVuIGF0dGVtcHRzIHRvIGdvIDM2MCwgYnV0IGxpbWl0ZWQgdG8gMTgwXG4gICAgICByb3RhdGVVcCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICByb3RhdGVTdGFydC5jb3B5KHJvdGF0ZUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZURvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVEb2xseScgKTtcblxuICAgICAgZG9sbHlFbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZG9sbHlTdGFydC5jb3B5KGRvbGx5RW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVQYW4nICk7XG5cbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCk7XG5cbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcblxuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVVwJyApO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVdoZWVsID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVdoZWVsJyApO1xuXG4gICAgICBpZiAoZXZlbnQuZGVsdGFZIDwgMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChldmVudC5kZWx0YVkgPiAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlS2V5RG93bicgKTtcblxuICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLlVQOlxuICAgICAgICAgIHBhbigwLCB0aGlzLmtleVBhblNwZWVkKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLkJPVFRPTTpcbiAgICAgICAgICBwYW4oMCwgLXRoaXMua2V5UGFuU3BlZWQpO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuTEVGVDpcbiAgICAgICAgICBwYW4odGhpcy5rZXlQYW5TcGVlZCwgMCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5SSUdIVDpcbiAgICAgICAgICBwYW4oLXRoaXMua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydFJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlU3RhcnQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnREb2xseScgKTtcblxuICAgICAgY29uc3QgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgZG9sbHlTdGFydC5zZXQoMCwgZGlzdGFuY2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0UGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0UGFuJyApO1xuXG4gICAgICBwYW5TdGFydC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZVJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgcm90YXRlVXAoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgcm90YXRlU3RhcnQuY29weShyb3RhdGVFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVEb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlRG9sbHknICk7XG5cbiAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGRvbGx5RW5kLnNldCgwLCBkaXN0YW5jZSk7XG5cbiAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XG5cbiAgICAgIGlmIChkb2xseURlbHRhLnkgPiAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBkb2xseVN0YXJ0LmNvcHkoZG9sbHlFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZVBhbicgKTtcblxuICAgICAgcGFuRW5kLnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcblxuICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyhwYW5FbmQsIHBhblN0YXJ0KTtcblxuICAgICAgcGFuKHBhbkRlbHRhLngsIHBhbkRlbHRhLnkpO1xuXG4gICAgICBwYW5TdGFydC5jb3B5KHBhbkVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoRW5kID0gKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaEVuZCcgKTtcbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBldmVudCBoYW5kbGVycyAtIEZTTTogbGlzdGVuIGZvciBldmVudHMgYW5kIHJlc2V0IHN0YXRlXG4gICAgLy9cblxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuT1JCSVQpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93blJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5ST1RBVEU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuWk9PTSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93bkRvbGx5KGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLkRPTExZO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLlBBTikge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duUGFuKGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlBBTjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5OT05FKSB7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlUm90YXRlKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFNUQVRFLkRPTExZKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlRG9sbHkoZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVQYW4oZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlVXAgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVNb3VzZVVwKGV2ZW50KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlV2hlZWwgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlIHx8IChzdGF0ZSAhPT0gU1RBVEUuTk9ORSAmJiBzdGF0ZSAhPT0gU1RBVEUuUk9UQVRFKSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGhhbmRsZU1vdXNlV2hlZWwoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7IC8vIG5vdCBzdXJlIHdoeSB0aGVzZSBhcmUgaGVyZS4uLlxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVLZXlzID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlS2V5RG93bihldmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hTdGFydCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnREb2xseShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX0RPTExZO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0UGFuKGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUEFOO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLk5PTkUpXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaE1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUk9UQVRFKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUm90YXRlKGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX0RPTExZKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlRG9sbHkoZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9QQU4pIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVQYW4oZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoRW5kID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlVG91Y2hFbmQoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ29udGV4dE1lbnUgPSBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICAvL1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBnZXQgY2VudGVyKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmNlbnRlciBoYXMgYmVlbiByZW5hbWVkIHRvIC50YXJnZXQnKTtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQ7XG4gIH1cblxuICBnZXQgbm9ab29tKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vWm9vbSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVpvb20gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlWm9vbTtcbiAgfVxuXG4gIHNldCBub1pvb20odmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVab29tID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vUm90YXRlKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVJvdGF0ZTtcbiAgfVxuXG4gIHNldCBub1JvdGF0ZSh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVSb3RhdGUgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9QYW4oKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlUGFuO1xuICB9XG5cbiAgc2V0IG5vUGFuKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVBhbiA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub0tleXMoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9LZXlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlS2V5cyBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVLZXlzO1xuICB9XG5cbiAgc2V0IG5vS2V5cyh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vS2V5cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZUtleXMgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZUtleXMgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgc3RhdGljTW92aW5nKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlRGFtcGluZztcbiAgfVxuXG4gIHNldCBzdGF0aWNNb3ZpbmcodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5zdGF0aWNNb3ZpbmcgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVEYW1waW5nIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVEYW1waW5nID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IGR5bmFtaWNEYW1waW5nRmFjdG9yKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmR5bmFtaWNEYW1waW5nRmFjdG9yIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSAuZGFtcGluZ0ZhY3RvciBpbnN0ZWFkLicpO1xuICAgIHJldHVybiB0aGlzLmRhbXBpbmdGYWN0b3I7XG4gIH1cblxuICBzZXQgZHluYW1pY0RhbXBpbmdGYWN0b3IodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5keW5hbWljRGFtcGluZ0ZhY3RvciBoYXMgYmVlbiByZW5hbWVkLiBVc2UgLmRhbXBpbmdGYWN0b3IgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSB2YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbnRyb2xzTW9kdWxlfSBmcm9tICcuLi9Db250cm9sc01vZHVsZSc7XG5cbmltcG9ydCB7VGhyZWVPcmJpdENvbnRyb2xzfSBmcm9tICcuL2xpYi9UaHJlZU9yYml0Q29udHJvbHMnO1xuXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc01vZHVsZSBleHRlbmRzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGZvbGxvdzogZmFsc2UsXG4gICAgICBvYmplY3Q6IG51bGwsXG4gICAgICB0YXJnZXQ6IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gICAgfSwgcGFyYW1zKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIHN1cGVyLm1hbmFnZXIobWFuYWdlcik7XG5cbiAgICBjb25zdCB7b2JqZWN0OiBvYmosIGZvbGxvdywgdGFyZ2V0fSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IG9iamVjdCA9IG9iaiA/IG9iai5uYXRpdmUgOiBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlO1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgVGhyZWVPcmJpdENvbnRyb2xzKFxuICAgICAgb2JqZWN0LFxuICAgICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKSxcbiAgICAgIG1hbmFnZXIuaGFuZGxlclxuICAgICk7XG5cbiAgICBjb25zdCB1cGRhdGVQcm9jZXNzb3IgPSBmb2xsb3cgPyBjID0+IHtcbiAgICAgIGNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgICB9IDogYyA9PiB7XG4gICAgICBjb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDb250cm9scyhjb250cm9scyk7XG4gICAgdGhpcy5zZXRVcGRhdGUodXBkYXRlUHJvY2Vzc29yKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgaWYgKG9iaikgcmV0dXJuO1xuICAgICAgICBjb250cm9scy5vYmplY3QgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9hcHAvY29udHJvbHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vT3JiaXRDb250cm9sc01vZHVsZSc7XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL2FwcCAqL1xuZXhwb3J0ICogZnJvbSAnLi9FbGVtZW50TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUmVuZGVyaW5nTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vU2NlbmVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXNpemVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb3N0UHJvY2Vzc29yTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVmlydHVhbE1vdXNlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db250cm9sc01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0ZvZ01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRlTW9kdWxlJztcblxuLy8gY29udHJvbHNcbmV4cG9ydCAqIGZyb20gJy4vY29udHJvbHMvaW5kZXgnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRHluYW1pY0dlb21ldHJ5TW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17YXR0cmlidXRlczogZmFsc2V9XSAtIHBhcmFtc1xuICogQHBhcmFtIHtCb29sZWFufSBbcGF0Y2hFdmVudHM9dHJ1ZV1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljR2VvbWV0cnlNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhdHRyaWJ1dGVzOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHBhcmFtcyA9IHNlbGYucGFyYW1zO1xuXG4gICAgdGhpcy5nXyA9IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xuICAgICAgaWYgKHRoaXMuYnVpbGRHZW9tZXRyeSkge1xuICAgICAgICB0aGlzLm5hdGl2ZS5nZW9tZXRyeSA9IHRoaXMuYnVpbGRHZW9tZXRyeShcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtcyh7Z2VvbWV0cnk6IHBhcmFtc30pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChwYXJhbXMuYXR0cmlidXRlcykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wYXJhbXMuZ2VvbWV0cnkpIHtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBgZ18ke2tleX1gLCB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZS5nZW9tZXRyeS5wYXJhbWV0ZXJzW2tleV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMubmF0aXZlLmdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KHRoaXMudXBkYXRlUGFyYW1zKHtnZW9tZXRyeToge1trZXldOiB2YWx1ZX19KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBSZXBlYXRXcmFwcGluZyxcbiAgVVZNYXBwaW5nLFxuICBOZWFyZXN0RmlsdGVyLFxuICBMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIsXG4gIFRleHR1cmVMb2FkZXIsXG4gIFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBsb2FkZXIgPSBuZXcgVGV4dHVyZUxvYWRlcigpO1xuXG4vKipcbiAqIEBjbGFzcyBUZXh0dXJlTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAZGVzY3JpcHRpb24gQSBUZXh0dXJlTW9kdWxlIGNhbiBiZSBhcHBsaWVkIHRvIGFueSBNZXNoIG9yIE1vZGVsLlxuICogQHBhcmFtIHtBcnJheX0gW3RleHR1cmVzXSAtIGFycmF5IG9mIHRleHR1cmUgb2JqZWN0c1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGluc3RhbmNlLiB1cmwgdGFrZXMgYSBwYXRoLCBvciBhIGRhdGEgb2JqZWN0LjwvY2FwdGlvbj5cbiAqIHZhciB3b29kVGV4dHVyZSA9IG5ldyBUZXh0dXJlTW9kdWxlKHtcbiAqICAgdXJsOiBgJHtwcm9jZXNzLmFzc2V0c1BhdGh9L3RleHR1cmVzL3dvb2QuanBnYFxuICogfSk7XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Nb3JlIGNvbXByZWhlbnNpdmUgZXhhbXBsZSwgd29vZCB0ZXh0dXJlIGFwcGxpZWQgdG8gYSBCb3guPC9jYXB0aW9uPlxuICogbmV3IEJveCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgd2lkdGg6IDIsXG4gKiAgICAgaGVpZ2h0OiAyLFxuICogICAgIGRlcHRoOiAyXG4gKiAgIH0sXG4gKiAgIG1vZHVsZXM6IFtcbiAqICAgICBuZXcgVGV4dHVyZU1vZHVsZSh7XG4gKiAgICAgICB1cmw6IGBwYXRoL3RvL3RleHR1cmUuanBnYCxcbiAqICAgICAgIHJlcGVhdDogbmV3IFRIUkVFLlZlY3RvcjIoMSwgMSkgLy8gb3B0aW9uYWxcbiAqICAgICB9KVxuICogICBdLFxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKiAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0dXJlTW9kdWxlIHtcbiAgc3RhdGljIGxvYWQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0dXJlTW9kdWxlKHt1cmx9KS50ZXh0dXJlc1swXVsxXTtcbiAgfVxuXG4gIHRleHR1cmVzID0gW107XG5cbiAgY29uc3RydWN0b3IoLi4udGV4dHVyZXMpIHtcbiAgICB0ZXh0dXJlcy5mb3JFYWNoKCh7XG4gICAgICB1cmwsXG4gICAgICB0eXBlID0gJ21hcCcsXG4gICAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMigwLCAwKSxcbiAgICAgIHJlcGVhdCA9IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgd3JhcCA9IFJlcGVhdFdyYXBwaW5nLFxuICAgICAgbWFwcGluZyA9IFVWTWFwcGluZyxcbiAgICAgIGZpeCA9IHRleCA9PiB0ZXhcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gbG9hZGVyLmxvYWQodXJsKTtcblxuICAgICAgaWYgKHdyYXAubGVuZ3RoID4gMCkge1xuICAgICAgICB0ZXh0dXJlLndyYXBTID0gd3JhcFswXTtcbiAgICAgICAgdGV4dHVyZS53cmFwVCA9IHdyYXBbMV07XG4gICAgICB9IGVsc2VcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IHRleHR1cmUud3JhcFQgPSB3cmFwO1xuXG4gICAgICB0ZXh0dXJlLm1hcHBpbmcgPSBtYXBwaW5nO1xuXG4gICAgICB0ZXh0dXJlLm9mZnNldC5jb3B5KG9mZnNldCk7XG4gICAgICB0ZXh0dXJlLnJlcGVhdC5jb3B5KHJlcGVhdCk7XG5cbiAgICAgIHRleHR1cmUubWFnRmlsdGVyID0gTmVhcmVzdEZpbHRlcjtcbiAgICAgIHRleHR1cmUubWluRmlsdGVyID0gTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyO1xuXG4gICAgICB0aGlzLnRleHR1cmVzLnB1c2goW3R5cGUsIGZpeCh0ZXh0dXJlKV0pO1xuICAgIH0pO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1hdGVyaWFsKG1hdGVyaWFsLCBzZWxmKSB7XG4gICAgICBzZWxmLnRleHR1cmVzLmZvckVhY2godGV4dHVyZSA9PiB7XG4gICAgICAgIG1hdGVyaWFsW3RleHR1cmVbMF1dID0gdGV4dHVyZVsxXTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBbmltYXRpb25NaXhlcixcbiAgQW5pbWF0aW9uQ2xpcCxcbiAgQ2xvY2tcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbi8qKlxuICogQGNsYXNzIEFuaW1hdGlvbk1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQGRlc2NyaXB0aW9uIENvbnZlbmllbmNlIG1vZHVsZSB0aGF0IHdyYXBzIHRoZSA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI21hbnVhbC9pbnRyb2R1Y3Rpb24vQW5pbWF0aW9uLXN5c3RlbSc+dGhyZWUuanMgYW5pbWF0aW9uIHN5c3RlbTwvYT5cbiAqIEBwYXJhbSB7QXBwfSBhcHAgLSB0aGUgYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtpc0RlZmVycmVkPWZhbHNlXSAtIHNldCB0byB0cnVlIGlmIGFuaW1hdGlvbiBzaG91bGQgbm90IHN0YXJ0IGF1dG9tYXRpY2FsbHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtzcGVlZDogMX1dIC0gdGhlIHBhcmFtc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbmltYXRpb24gbW9kdWxlIGFuZCBwbGF5IGEgZ2l2ZW4gY2xpcCBvZiBhbiBpbXBvcnRlZCBtb2RlbDwvY2FwdGlvbj5cbiAqIGNvbnN0IGFuaW1hdGlvbk1vZHVsZSA9IG5ldyBBbmltYXRpb25Nb2R1bGUoYXBwLCBmYWxzZSwge1xuICogICBzcGVlZDogMS4yIC8vIHNwZWVkIHVwIGFuaW1hdGlvbiBieSAyMCVcbiAqIH0pO1xuICpcbiAqIG5ldyBJbXBvcnRlcih7XG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gKiAgICAgLy8gT3ZlcnJpZGUgcGFyc2UgdG8gZ2VuZXJhdGUgYSBza2lubmVkTWVzaCwgbmVlZGVkIGZvciBza2lubmVkIG1vZGVsc1xuICogICAgIHJldHVybiBuZXcgVEhSRUUuU2tpbm5lZE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gKiAgIH0sXG4gKlxuICogICB1cmw6IGBwYXRoL3RvL21vZGVsLmpzb25gLFxuICogICB1c2VDdXN0b21NYXRlcmlhbDogdHJ1ZSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICogICAgIHNraW5uaW5nOiB0cnVlXG4gKiAgIH0pLFxuICpcbiAqICAgbW9kdWxlczogW2FuaW1hdGlvbk1vZHVsZV1cbiAqIH0pLmFkZFRvKGFwcCkudGhlbigoKSA9PiB7XG4gKiAgIC8vIGFkZGluZyBtb2RlbCB0byBhcHAgcmV0dXJucyBhIHByb21pc2UsIHNvIHBpcGUgdGhlIGZ1bmN0aW9uIHRvIGtpY2sgb2ZmIHRoZSBhbmltYXRpb24gY2xpcFxuICogICBhbmltYXRpb25Nb2R1bGUucGxheSgnY2xpcE5hbWUnKTtcbiAqIH0pO1xuICovXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoYXBwLCBpc0RlZmVycmVkLCBwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBzcGVlZDogMVxuICAgIH0sIHBhcmFtcyk7XG4gICAgdGhpcy5jbG9jayA9IG5ldyBDbG9jaygpO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5pc0RlZmVycmVkID0gaXNEZWZlcnJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHBsYXlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBQbGF5cyB0aGUgZ2l2ZW4gY2xpcCBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGlwTmFtZSAtIHRoZSBjbGlwIHRvIHBsYXlcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICBwbGF5KGNsaXBOYW1lKSB7XG4gICAgY29uc3QgY2xpcCA9IEFuaW1hdGlvbkNsaXAuZmluZEJ5TmFtZSh0aGlzLmNsaXBzLCBjbGlwTmFtZSk7XG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5taXhlci5jbGlwQWN0aW9uKGNsaXApO1xuXG4gICAgYWN0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSB0aGUgbWl4ZXIgKGJlaW5nIGNhbGxlZCBvbiBmcmFtZSBhbmltYXRpb24gbG9vcClcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMubWl4ZXIpIHRoaXMubWl4ZXIudXBkYXRlKHRoaXMuY2xvY2suZ2V0RGVsdGEoKSAqIHRoaXMucGFyYW1zLnNwZWVkKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5sb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9KTtcblxuICAgIGlmICghc2VsZi5pc0RlZmVycmVkKSBzZWxmLmxvb3Auc3RhcnQoc2VsZi5hcHApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2FuaW1hdGlvbicpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgbWVzaC5nZW9tZXRyeS5za2VsZXRvbiA9IG1lc2guc2tlbGV0b247XG5cbiAgICAgIHNlbGYubWl4ZXIgPSBuZXcgQW5pbWF0aW9uTWl4ZXIobWVzaC5nZW9tZXRyeSk7XG4gICAgICBzZWxmLmNsaXBzID0gbWVzaC5nZW9tZXRyeS5hbmltYXRpb25zO1xuXG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvbWVzaCAqL1xuZXhwb3J0ICogZnJvbSAnLi9EeW5hbWljR2VvbWV0cnlNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0dXJlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQW5pbWF0aW9uTW9kdWxlJztcbiIsIi8qKlxuICogQGNsYXNzIERlZmluZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSBEZWZpbmVNb2R1bGUgd2l0aCBQZXJzcGVjdGl2ZUNhbWVyYSBhcyBjYW1lcmEgbW9kdWxlIGFuZCBwYXNzaW5nIGl0IHRvIEFwcCdzIG1vZHVsZXM8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgLy8gLi4uXG4gKiAgIG5ldyBEZWZpbmVNb2R1bGUoJ2NhbWVyYScsIG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZpbmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQodGhpcy5uYW1lLCB0aGlzLmRhdGEpO1xuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzICovXG5cbmV4cG9ydCAqIGZyb20gJy4vYXBwL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbWVzaC9pbmRleCc7XG5cbi8vIG1vZHVsZXNcbmV4cG9ydCAqIGZyb20gJy4vRGVmaW5lTW9kdWxlJztcbiIsImltcG9ydCB7SW1wb3J0ZXJ9IGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvSW1wb3J0ZXInO1xuaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYX0gZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvUGVyc3BlY3RpdmVDYW1lcmEnO1xuXG5leHBvcnQgY2xhc3MgTW9kZWwgZXh0ZW5kcyBJbXBvcnRlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgLi4uYWRkaXRpb25hbCkge1xuICAgIGNvbnNvbGUud2FybignTW9kZWwgaXMgZGVwcmVjYXRlZC4gVXNlIEltcG9ydGVyIGluc3RlYWQuJyk7XG5cbiAgICBpZiAocGFyYW1zLmdlb21ldHJ5KSB7XG4gICAgICBwYXJhbXMudXJsID0gcGFyYW1zLmdlb21ldHJ5LnBhdGg7XG4gICAgICBwYXJhbXMubG9hZGVyID0gcGFyYW1zLmdlb21ldHJ5LmxvYWRlcjtcbiAgICB9XG5cbiAgICBzdXBlcihwYXJhbXMsIC4uLmFkZGl0aW9uYWwpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIGNvbnNvbGUud2FybignQ2FtZXJhTW9kdWxlIGlzIGRlcHJlY2F0ZWQuIFVzZSBEZWZpbmVNb2R1bGUgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYShwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmFkZChzZWxmLmNhbWVyYSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnY2FtZXJhJywgdGhpcy5jYW1lcmEpO1xuICB9XG59XG4iLCIvKipcbiAqIE5hbWVzcGFjZSBjb250YWluaW5nIGFsbCBjbGFzc2VzIGZyb20gYWxsIG1vZHVsZXMuIFVzZWQgYXMgZ2xvYmFsIGluIFVNRCBwYXR0ZXJuLlxuICogQG5hbWVzcGFjZSBXSFNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRoZSB1c2Ugb2YgV0hTIG5hbWVzcGFjZS48L2NhcHRpb24+XG4gKiBuZXcgV0hTLkFwcCgpIC8vIGNvcmVcbiAqIG5ldyBXSFMuUGVyc3BlY3RpdmVDYW1lcmEoKSAvLyBjb21wb25lbnRzXG4gKiBuZXcgV0hTLlJlc2l6ZU1vZHVsZSgpIC8vIG1vZHVsZXNcbiAqIFdIUy5leHRlbmQoKSAvLyB1dGlsc1xuICovXG5cblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9saWdodHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9pbmRleCc7XG5cbi8vIERFUFJFQ0FUSU9OXG5leHBvcnQgKiBmcm9tICcuL2RlcHJlY2F0aW9uJztcbiJdLCJuYW1lcyI6WyJleHRlbmQiLCJvYmplY3QiLCJleHRlbnNpb25zIiwiZXh0ZW5zaW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInByb3AiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpc0FycmF5Iiwic2xpY2UiLCJpbnN0cnVjdCIsImFycmF5IiwiaW5zdEFycmF5IiwidGVtcE9iamVjdCIsImkiLCJtYXgiLCJsZW5ndGgiLCJndWlkZSIsInRyYW5zZm9ybURhdGEiLCJpbnN0cnVjdGlvbnMiLCJrZXkiLCJ0b0FycmF5IiwiaW5zdHJ1Y3Rpb24iLCJ0ZW1wQXJyYXkiLCJDb21wb3NpdGlvbkVycm9yIiwiY2xhc3NJbnN0YW5jZSIsIm1lc3NhZ2UiLCJjb21wb25lbnQiLCJzdGFja0FycmF5Iiwic3RhY2siLCJzcGxpdCIsInNwbGljZSIsImpvaW4iLCJjb25zb2xlIiwiZXJyb3IiLCJuYW1lIiwiRXJyb3IiLCJEZXBlbmRlbmN5RXJyb3IiLCJhY3RpdmVNb2R1bGUiLCJkZXBlbmRlbmN5TW9kdWxlIiwiTWFuYWdlckVycm9yIiwid2FybkRlcHMiLCJSRVZJU0lPTiIsImVyciIsIk1vZHVsZVN5c3RlbSIsInNvdXJjZSIsIm1vZHVsZXMiLCJhcHBseU1vZHVsZSIsImFwcGx5QnJpZGdlIiwib25Db3B5IiwiYnJpZGdlTWFwIiwibW9kdWxlIiwiYnJpZGdlIiwiYXBwbHkiLCJjYiIsImZ1bmMiLCJtb2R1bGVTY29wZSIsInB1c2giLCJtYW5hZ2VyIiwiYWN0aXZlIiwiaW50ZWdyYXRlIiwiYmluZCIsImRpc3Bvc2VNb2R1bGUiLCJpbmRleE9mIiwiZGlzcG9zZSIsIkV2ZW50cyIsIlN5bWJvbCIsIm9iamVjdFByb3RvIiwiaGFzT3duUHJvcGVydHkiLCJzeW1Ub1N0cmluZ1RhZyIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwicm9vdCIsInBvbnlmaWxsIiwiJCRvYnNlcnZhYmxlIiwiTW9kdWxlTWFuYWdlciIsImhhbmRsZXIiLCJjdXJyZW50TW9kdWxlIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsInN0YXRlIiwiYWN0aW9uIiwiZGF0YSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJCb29sZWFuIiwiZGVwc01hcCIsInN1YnNjcmliZSIsImNoYW5nZWRLZXkiLCJjYWxsYmFjayIsIndhcm4iLCJzZXQiLCJtb2R1bGVFeGVjdXRvciIsInVzZSIsIkNvbXBvbmVudCIsInBhcmFtcyIsImRlZmF1bHRzIiwiX3dhaXQiLCJjaGlsZHJlbiIsImludGVncmF0ZU1vZHVsZXMiLCJwcm9taXNlIiwiUHJvbWlzZSIsImFsbCIsImlzRGVmZmVyZWQiLCJ3YWl0IiwidGhlbiIsImNvcHkiLCJjdXN0b21pemUiLCJuYXRpdmUiLCJjbG9uZSIsInBhcmVudCIsInJlc29sdmUiLCJyZWplY3QiLCJkZWZlciIsImFkZFByb21pc2UiLCJvbkFkZCIsInJlc29sdmVyIiwiYWRkIiwicmVtb3ZlIiwiX21hbmFnZXIiLCJfbmF0aXZlIiwibWVzaCIsImF0dHJpYnV0ZXMiLCJtYXBwZXJzIiwidGFyZ2V0IiwibWFwcGVyIiwiayIsIm1hcCIsImF0dHJpYnV0ZSIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0dGVyIiwic2V0dGVyIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsInZhbHVlIiwibWlycm9yIiwiTWVzaENvbXBvbmVudCIsImdlb20iLCJNZXNoIiwibWF0ZXJpYWwiLCJnZW9tZXRyeSIsImN1c3RvbSIsImJ1aWxkIiwid3JhcCIsImFwcGx5Q29tbWFuZCIsInBvc2l0aW9uIiwicm90YXRpb24iLCJzY2FsZSIsInNoYWRvdyIsIngiLCJ5IiwieiIsImNhc3RTaGFkb3ciLCJjYXN0IiwicmVjZWl2ZVNoYWRvdyIsInJlY2VpdmUiLCJvbldyYXAiLCJxdWF0ZXJuaW9uIiwiZGVzdCIsIkxpZ2h0Q29tcG9uZW50IiwibWFwU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiYmlhcyIsInJhZGl1cyIsInNoYWRvd0NhbWVyYSIsImNhbWVyYSIsIm5lYXIiLCJmYXIiLCJmb3YiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJDYW1lcmFDb21wb25lbnQiLCJzeXN0ZW0iLCJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJmb3JtYW5jZSIsInByZXNlbnQiLCJBcHAiLCJsb2ciLCJ2ZXJzaW9uIiwic2ltdWxhdGUiLCJ1cGRhdGVFbmFibGVkIiwibG9vcHMiLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsInByb2Nlc3MiLCJsbCIsImUiLCJlbmFibGVkIiwiZXhlY3V0ZSIsImNsb2NrIiwibG9vcCIsImluZGV4IiwiZ2V0IiwiTG9vcCIsInVzZUNsb2NrIiwiQ2xvY2siLCJ3b3JsZCIsImFkZExvb3AiLCJzdGFydCIsInN0b3AiLCJyZW1vdmVMb29wIiwiQW1iaWVudExpZ2h0IiwibGlnaHQiLCJBbWJpZW50TGlnaHROYXRpdmUiLCJjb2xvciIsImludGVuc2l0eSIsIkRpcmVjdGlvbmFsTGlnaHQiLCJ3cmFwU2hhZG93IiwiRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSIsIkhlbWlzcGhlcmVMaWdodCIsIkhlbWlzcGhlcmVMaWdodE5hdGl2ZSIsInNreUNvbG9yIiwiZ3JvdW5kQ29sb3IiLCJQb2ludExpZ2h0IiwiUG9pbnRMaWdodE5hdGl2ZSIsImRpc3RhbmNlIiwiZGVjYXkiLCJTcG90TGlnaHQiLCJTcG90TGlnaHROYXRpdmUiLCJhbmdsZSIsImV4cG9uZW50IiwiTWF0aCIsIlBJIiwiQXJlYUxpZ2h0IiwiUmVjdEFyZWFMaWdodE5hdGl2ZSIsIkN1YmVDYW1lcmEiLCJDdWJlQ2FtZXJhTmF0aXZlIiwiY3ViZVJlc29sdXRpb24iLCJPcnRob2dyYXBoaWNDYW1lcmEiLCJPcnRob2dyYXBoaWNDYW1lcmFOYXRpdmUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIlBlcnNwZWN0aXZlQ2FtZXJhTmF0aXZlIiwiYXNwZWN0IiwiQm94IiwiYnVpbGRHZW9tZXRyeSIsImJ1ZmZlciIsIkJveEJ1ZmZlckdlb21ldHJ5IiwiQm94R2VvbWV0cnkiLCJkZXB0aCIsIndpZHRoU2VnbWVudHMiLCJoZWlnaHRTZWdtZW50cyIsImRlcHRoU2VnbWVudHMiLCJDaXJjbGUiLCJDaXJjbGVCdWZmZXJHZW9tZXRyeSIsIkNpcmNsZUdlb21ldHJ5Iiwic2VnbWVudHMiLCJ0aGV0YVN0YXJ0IiwidGhldGFMZW5ndGgiLCJDb25lIiwiQ29uZUJ1ZmZlckdlb21ldHJ5IiwiQ29uZUdlb21ldHJ5IiwicmFkaXVzU2VnbWVudHMiLCJvcGVuRW5kZWQiLCJDeWxpbmRlciIsIkN5bGluZGVyQnVmZmVyR2VvbWV0cnkiLCJDeWxpbmRlckdlb21ldHJ5IiwicmFkaXVzVG9wIiwicmFkaXVzQm90dG9tIiwiRG9kZWNhaGVkcm9uIiwiRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJEb2RlY2FoZWRyb25HZW9tZXRyeSIsImRldGFpbCIsIkV4dHJ1ZGUiLCJFeHRydWRlR2VvbWV0cnkiLCJzaGFwZXMiLCJvcHRpb25zIiwiQnVmZmVyR2VvbWV0cnkiLCJmcm9tR2VvbWV0cnkiLCJJY29zYWhlZHJvbiIsIkljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJJY29zYWhlZHJvbkdlb21ldHJ5IiwiTGF0aGUiLCJMYXRoZUJ1ZmZlckdlb21ldHJ5IiwiTGF0aGVHZW9tZXRyeSIsInBvaW50cyIsIkxpbmUiLCJMaW5lTmF0aXZlIiwiR2VvbWV0cnkiLCJwcCIsImN1cnZlIiwiZ2V0UG9pbnRzIiwidmVydHMiLCJGbG9hdDMyQXJyYXkiLCJpMyIsImFkZEF0dHJpYnV0ZSIsIkJ1ZmZlckF0dHJpYnV0ZSIsInZlcnRpY2VzIiwiSW1wb3J0ZXIiLCJmaWx0ZXIiLCJwcm9jZXNzRmlsdGVyIiwiZm9yRWFjaCIsImVsIiwidGV4dHVyZVBhdGgiLCJsYW9kZXIiLCJzZXRUZXh0dXJlUGF0aCIsImxvYWRlciIsImxvYWQiLCJ1cmwiLCJvbkxvYWQiLCJwYXJzZXIiLCJ1c2VDdXN0b21NYXRlcmlhbCIsIm1hdCIsIm9uUHJvZ3Jlc3MiLCJvbkVycm9yIiwiSlNPTkxvYWRlciIsIm1hdGVyaWFscyIsIk9jdGFoZWRyb24iLCJPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJPY3RhaGVkcm9uR2VvbWV0cnkiLCJQYXJhbWV0cmljIiwiUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5IiwiUGFyYW1ldHJpY0dlb21ldHJ5Iiwic2xpY2VzIiwic3RhY2tzIiwidSIsInYiLCJWZWN0b3IzIiwiUGxhbmUiLCJQbGFuZUJ1ZmZlckdlb21ldHJ5IiwiUGxhbmVHZW9tZXRyeSIsIndTZWdtZW50cyIsImhTZWdtZW50cyIsInZlcnRpY2VzT2ZDdWJlIiwiaW5kaWNlc09mRmFjZXMiLCJQb2x5aGVkcm9uIiwiUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiUG9seWhlZHJvbkdlb21ldHJ5IiwiUmluZyIsIlJpbmdCdWZmZXJHZW9tZXRyeSIsIlJpbmdHZW9tZXRyeSIsImlubmVyUmFkaXVzIiwib3V0ZXJSYWRpdXMiLCJ0aGV0YVNlZ21lbnRzIiwicGhpU2VnbWVudHMiLCJTaGFwZSIsIlNoYXBlQnVmZmVyR2VvbWV0cnkiLCJTaGFwZUdlb21ldHJ5IiwiU3BoZXJlIiwiU3BoZXJlQnVmZmVyR2VvbWV0cnkiLCJTcGhlcmVHZW9tZXRyeSIsIlRldHJhaGVkcm9uIiwiVGV0cmFoZWRyb25CdWZmZXJHZW9tZXRyeSIsIlRldHJhaGVkcm9uR2VvbWV0cnkiLCJUZXh0IiwicGFyYW1ldGVycyIsImZvbnQiLCJUZXh0R2VvbWV0cnkiLCJ0ZXh0IiwiRm9udExvYWRlciIsIkZvbnQiLCJUb3J1cyIsIlRvcnVzR2VvbWV0cnkiLCJ0dWJlIiwicmFkaWFsU2VnbWVudHMiLCJ0dWJ1bGFyU2VnbWVudHMiLCJhcmMiLCJUb3J1c2tub3QiLCJHQ29uc3RydWN0IiwiVG9ydXNLbm90QnVmZmVyR2VvbWV0cnkiLCJUb3J1c0tub3RHZW9tZXRyeSIsInAiLCJxIiwiVHViZSIsIlR1YmVCdWZmZXJHZW9tZXRyeSIsIlR1YmVHZW9tZXRyeSIsInBhdGgiLCJjbG9zZWQiLCJMaW5lQ3VydmUzIiwiR3JvdXAiLCJvYmplY3RzIiwib2JqIiwiYWRkVG8iLCJPYmplY3QzRCIsIkVsZW1lbnRNb2R1bGUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImJvZHkiLCJjcmVhdGVFbGVtZW50IiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwic2VsZiIsImFwcGVuZENoaWxkIiwiUmVuZGVyaW5nTW9kdWxlIiwiaXNTaGFkb3ciLCJhc3NpZ24iLCJWZWN0b3IyIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImJnQ29sb3IiLCJiZ09wYWNpdHkiLCJyZW5kZXJlciIsInBpeGVsUmF0aW8iLCJyZXNvbHV0aW9uIiwiV2ViR0xSZW5kZXJlciIsImVmZmVjdHMiLCJhcHBseUFkZGl0aW9uYWwiLCJzZXRDbGVhckNvbG9yIiwic2V0UGl4ZWxSYXRpbyIsInNldFNpemUiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwiaXNBcHBsaWVkIiwiYWRkaXRpb25hbCIsInNjZW5lIiwicmVuZGVyTG9vcCIsInJlbmRlciIsImF0dGFjaFRvQ2FudmFzIiwiZWZmZWN0Iiwic2l6ZSIsImdldFNpemUiLCJhcHAiLCJjYW52YXMiLCJkb21FbGVtZW50IiwiZGVmaW5lIiwiaW50ZWdyYXRlUmVuZGVyZXIiLCJ1cGRhdGUiLCJmb3JjZUNvbnRleHRMb3NzIiwic2hhZG93TWFwIiwiU2NlbmVNb2R1bGUiLCJ3aWxsU2NlbmVCZVJlcGxhY2VkIiwiU2NlbmUiLCJzZXRTY2VuZSIsIlJlc2l6ZU1vZHVsZSIsImNhbGxiYWNrcyIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJyZW5kZXJpbmciLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImdldENvbnRhaW5lciIsImdldFJlc29sdXRpb24iLCJhdXRvIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRyaWdnZXIiLCJhZGRBdXRvcmVzaXplIiwiZnJhZ21lbnQiLCJ2ZXJ0ZXgiLCJwb2x5ZmlsbCIsIm1ldGhvZCIsInNob3dXYXJuIiwiUG9zdFByb2Nlc3Nvck1vZHVsZSIsImRlYnVnIiwiY3VycmVudFBhc3MiLCJjb21wb3NlciIsIkVmZmVjdENvbXBvc2VyIiwiZ2V0RGVsdGEiLCJyZXBsYWNlUmVuZGVyZXIiLCJwYXNzIiwiUmVuZGVyUGFzcyIsImFkZFBhc3MiLCJ0ZXh0dXJlSUQiLCJ1bmlmb3JtcyIsIlNoYWRlclBhc3MiLCJwYXNzZXMiLCJib29sIiwicmVuZGVyVG9TY3JlZW4iLCJFdmVudHNQYXRjaE1vZHVsZSIsIm9yaWdpbk9iamVjdCIsImRlc3RPYmplY3QiLCJldmVudHMiLCJldmVudCIsImVtaXQiLCJwYXRjaEV2ZW50cyIsIlZpcnR1YWxNb3VzZU1vZHVsZSIsImdsb2JhbE1vdmVtZW50IiwibW91c2UiLCJyYXljYXN0ZXIiLCJSYXljYXN0ZXIiLCJwcm9qZWN0aW9uUGxhbmUiLCJjdXN0b21YIiwiY3VzdG9tWSIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRYIiwiY2xpZW50WSIsIm5vcm1hbCIsImdldFdvcmxkRGlyZWN0aW9uIiwic2V0RnJvbUNhbWVyYSIsInJlcXVpcmUiLCJvbiIsImV2IiwiZ2xvYmFsWCIsImdsb2JhbFkiLCJwb2ludGVyTG9ja0VsZW1lbnQiLCJtb3ZlbWVudFgiLCJtb3ZlbWVudFkiLCJuZXN0ZWQiLCJpc0hvdmVyZWQiLCJob3ZlcnMiLCJ0cmF2ZXJzZSIsImNoaWxkIiwiaW50ZXJzZWN0T2JqZWN0cyIsImludGVyc2VjdE9iamVjdCIsInBsYW5lIiwicmF5IiwiaW50ZXJzZWN0UGxhbmUiLCJpbnRlcnNlY3Rpb24iLCJDb250cm9sc01vZHVsZSIsImNvbnRyb2xzIiwiYyIsInVwZGF0ZUxvb3AiLCJGb2dNb2R1bGUiLCJ0eXBlIiwiZm9nIiwiRm9nRXhwMiIsImRlbnNpdHkiLCJGb2ciLCJpc0VxdWFsRGVmYXVsdCIsImEiLCJiIiwiZXF1YWxzIiwiU3RhdGVNb2R1bGUiLCJpc0VxdWFsIiwiZXF1YWxDaGVjayIsImFjdGlvbkdlbmVyYXRlIiwiY29uZmlndXJhdGlvbiIsImN1cnJlbnRDb25maWciLCJwcmV2Q29uZmlnIiwiY29uZmlnIiwiZGVmYXVsdCIsInJlcGxhY2VSZWR1Y2VyIiwiY29uZmlncyIsInVwZGF0ZXMiLCJjb25maWdOYW1lIiwidHJ1ZVZhbCIsImZhbHNlVmFsIiwiVGhyZWVPcmJpdENvbnRyb2xzIiwiZXZlbnRIYW5kbGVyIiwibWluRGlzdGFuY2UiLCJtYXhEaXN0YW5jZSIsIkluZmluaXR5IiwibWluWm9vbSIsIm1heFpvb20iLCJtaW5Qb2xhckFuZ2xlIiwibWF4UG9sYXJBbmdsZSIsIm1pbkF6aW11dGhBbmdsZSIsIm1heEF6aW11dGhBbmdsZSIsImVuYWJsZURhbXBpbmciLCJkYW1waW5nRmFjdG9yIiwiZW5hYmxlWm9vbSIsInpvb21TcGVlZCIsImVuYWJsZVJvdGF0ZSIsInJvdGF0ZVNwZWVkIiwiZW5hYmxlUGFuIiwia2V5UGFuU3BlZWQiLCJhdXRvUm90YXRlIiwiYXV0b1JvdGF0ZVNwZWVkIiwiZW5hYmxlS2V5cyIsImtleXMiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkJPVFRPTSIsIm1vdXNlQnV0dG9ucyIsIk9SQklUIiwiTU9VU0UiLCJaT09NIiwiTUlERExFIiwiUEFOIiwidGFyZ2V0MCIsInBvc2l0aW9uMCIsInpvb20wIiwiem9vbSIsImdldFBvbGFyQW5nbGUiLCJzcGhlcmljYWwiLCJwaGkiLCJnZXRBemltdXRoYWxBbmdsZSIsInRoZXRhIiwicmVzZXQiLCJkaXNwYXRjaEV2ZW50IiwiY2hhbmdlRXZlbnQiLCJTVEFURSIsIk5PTkUiLCJvZmZzZXQiLCJxdWF0IiwiUXVhdGVybmlvbiIsInNldEZyb21Vbml0VmVjdG9ycyIsInVwIiwicXVhdEludmVyc2UiLCJpbnZlcnNlIiwibGFzdFBvc2l0aW9uIiwibGFzdFF1YXRlcm5pb24iLCJzdWIiLCJhcHBseVF1YXRlcm5pb24iLCJzZXRGcm9tVmVjdG9yMyIsInJvdGF0ZUxlZnQiLCJnZXRBdXRvUm90YXRpb25BbmdsZSIsInNwaGVyaWNhbERlbHRhIiwibWluIiwibWFrZVNhZmUiLCJwYW5PZmZzZXQiLCJzZXRGcm9tU3BoZXJpY2FsIiwibG9va0F0Iiwiem9vbUNoYW5nZWQiLCJkaXN0YW5jZVRvU3F1YXJlZCIsIkVQUyIsImRvdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkNvbnRleHRNZW51Iiwib25Nb3VzZURvd24iLCJvbk1vdXNlV2hlZWwiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25Ub3VjaE1vdmUiLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VVcCIsIm9uS2V5RG93biIsInN0YXJ0RXZlbnQiLCJlbmRFdmVudCIsIlJPVEFURSIsIkRPTExZIiwiVE9VQ0hfUk9UQVRFIiwiVE9VQ0hfRE9MTFkiLCJUT1VDSF9QQU4iLCJTcGhlcmljYWwiLCJyb3RhdGVTdGFydCIsInJvdGF0ZUVuZCIsInJvdGF0ZURlbHRhIiwicGFuU3RhcnQiLCJwYW5FbmQiLCJwYW5EZWx0YSIsImRvbGx5U3RhcnQiLCJkb2xseUVuZCIsImRvbGx5RGVsdGEiLCJnZXRab29tU2NhbGUiLCJwb3ciLCJyb3RhdGVVcCIsInBhbkxlZnQiLCJvYmplY3RNYXRyaXgiLCJzZXRGcm9tTWF0cml4Q29sdW1uIiwibXVsdGlwbHlTY2FsYXIiLCJwYW5VcCIsInBhbiIsImRlbHRhWCIsImRlbHRhWSIsInRhcmdldERpc3RhbmNlIiwidGFuIiwiY2xpZW50SGVpZ2h0IiwibWF0cml4IiwiY2xpZW50V2lkdGgiLCJkb2xseUluIiwiZG9sbHlTY2FsZSIsImRvbGx5T3V0IiwiaGFuZGxlTW91c2VEb3duUm90YXRlIiwiaGFuZGxlTW91c2VEb3duRG9sbHkiLCJoYW5kbGVNb3VzZURvd25QYW4iLCJoYW5kbGVNb3VzZU1vdmVSb3RhdGUiLCJzdWJWZWN0b3JzIiwiaGFuZGxlTW91c2VNb3ZlRG9sbHkiLCJoYW5kbGVNb3VzZU1vdmVQYW4iLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VXaGVlbCIsImhhbmRsZUtleURvd24iLCJrZXlDb2RlIiwiaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiaGFuZGxlVG91Y2hTdGFydERvbGx5IiwiZHgiLCJkeSIsInNxcnQiLCJoYW5kbGVUb3VjaFN0YXJ0UGFuIiwiaGFuZGxlVG91Y2hNb3ZlUm90YXRlIiwiaGFuZGxlVG91Y2hNb3ZlRG9sbHkiLCJoYW5kbGVUb3VjaE1vdmVQYW4iLCJoYW5kbGVUb3VjaEVuZCIsInByZXZlbnREZWZhdWx0IiwiYnV0dG9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRXZlbnREaXNwYXRjaGVyIiwiT3JiaXRDb250cm9sc01vZHVsZSIsImZvbGxvdyIsInVwZGF0ZVByb2Nlc3NvciIsInNldENvbnRyb2xzIiwic2V0VXBkYXRlIiwiRHluYW1pY0dlb21ldHJ5TW9kdWxlIiwiZ18iLCJ1cGRhdGVQYXJhbXMiLCJUZXh0dXJlTG9hZGVyIiwiVGV4dHVyZU1vZHVsZSIsInRleHR1cmVzIiwidGV4dHVyZSIsInJlcGVhdCIsIlJlcGVhdFdyYXBwaW5nIiwibWFwcGluZyIsIlVWTWFwcGluZyIsImZpeCIsInRleCIsIndyYXBTIiwid3JhcFQiLCJtYWdGaWx0ZXIiLCJOZWFyZXN0RmlsdGVyIiwibWluRmlsdGVyIiwiTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyIiwiQW5pbWF0aW9uTW9kdWxlIiwiaXNEZWZlcnJlZCIsInNrZWxldG9uIiwibWl4ZXIiLCJBbmltYXRpb25NaXhlciIsImNsaXBzIiwiYW5pbWF0aW9ucyIsImNsaXBOYW1lIiwiY2xpcCIsIkFuaW1hdGlvbkNsaXAiLCJmaW5kQnlOYW1lIiwiY2xpcEFjdGlvbiIsInBsYXkiLCJzcGVlZCIsIkRlZmluZU1vZHVsZSIsIk1vZGVsIiwiQ2FtZXJhTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7QUFBTyxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsTUFBRCxFQUEyQjtvQ0FBZkMsVUFBZTtjQUFBOzs7Ozs7Ozs7eUJBQ3ZCQSxVQUF4Qiw4SEFBb0M7VUFBekJDLFNBQXlCOzs7OztVQUk5QixDQUFDQSxTQUFMLEVBQ0UsU0FMZ0M7Ozs7Ozs7OEJBT2ZDLE9BQU9DLG1CQUFQLENBQTJCRixTQUEzQixDQUFuQixtSUFBMEQ7Y0FBL0NHLElBQStDOztjQUNwREwsT0FBT0ssSUFBUCxNQUFpQkMsU0FBakIsSUFBOEJKLFVBQVVHLElBQVYs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R0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBQztJQUN0RDs7OztFQUlELE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQy9CLElBQUksS0FBSyxNQUFNLEdBQUcsRUFBRSxFQUFDO0lBQ3JCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLO1FBQzVCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2xEOzs7O0VBSUQsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLElBQUksQ0FBQztJQUMxQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztHQUNwRSxDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
