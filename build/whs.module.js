/* WhitestormJS Framework v2.1.3 */
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
            if (object[prop].constructor === Object) extend(object[prop], extension[prop]);
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
      if (source && source.modules) this.modules = source.modules.slice(0);

      if (this.modules) {
        for (var i = 0, max = this.modules.length; i < max; i++) {
          this.applyModule(this.modules[i], false);
        }
      }

      if (source) this.applyBridge({ onCopy: source });
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

const version = "2.1.3";

var system = {
  window: typeof window === 'undefined' ? global : window
};

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
   * @description Build as part of lifecycle creates a mesh using input params.
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

var _class$36;
var _temp$36;

var polyfill = function polyfill(object, method) {
  var showWarn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (object[method]) return;
  if (showWarn) console.warn('@PostProcessorModule: pass.' + method + '() was not found.', object);
  object[method] = function () {};
};

var PostProcessorModule = (_temp$36 = _class$36 = function () {
  function PostProcessorModule() {
    var _this = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PostProcessorModule.defaults;
    classCallCheck(this, PostProcessorModule);
    this.currentPass = null;
    this.defer = new Promise(function (resolve) {
      _this.resolve = resolve;
    });

    this.debug = params.debug;
    this.params = params;
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

      this.composer = new EffectComposer(this.renderer, this.params);

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
}(), _class$36.defaults = {
  debug: true
}, _temp$36);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzL2V4dGVuZC5qcyIsIi4uL3NyYy91dGlscy90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsIi4uL3NyYy9jb3JlL2Vycm9ycy5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZU1hbmFnZXIuanMiLCIuLi9zcmMvY29yZS9Db21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9wcm90b3R5cGUvYXR0cmlidXRlcy5qcyIsIi4uL3NyYy9jb3JlL01lc2hDb21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9MaWdodENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0NhbWVyYUNvbXBvbmVudC5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9BbWJpZW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9IZW1pc3BoZXJlTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvUG9pbnRMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9TcG90TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQXJlYUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9DdWJlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9PcnRob2dyYXBoaWNDYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Cb3guanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ2lyY2xlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NvbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ3lsaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvRG9kZWNhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0V4dHJ1ZGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSWNvc2FoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGF0aGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGluZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9PY3RhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BhcmFtZXRyaWMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUGxhbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUG9seWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9SaW5nLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NoYXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NwaGVyZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXRyYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXh0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVza25vdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UdWJlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0dyb3VwLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0VsZW1lbnRNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1NjZW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvbnZvbHV0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvY29weS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvcGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2NsZWFyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvY2xlYXItbWFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dsaXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3JlbmRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL21hc2suanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaGFkZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zaG9jay13YXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL2NvcmUvZWZmZWN0LWNvbXBvc2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Qb3N0UHJvY2Vzc29yTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0V2ZW50c1BhdGNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1ZpcnR1YWxNb3VzZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Gb2dNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvU3RhdGVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvbGliL1RocmVlT3JiaXRDb250cm9scy5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9PcmJpdENvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9EeW5hbWljR2VvbWV0cnlNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL1RleHR1cmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL0FuaW1hdGlvbk1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIi4uL3NyYy9kZXByZWNhdGlvbi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZXh0ZW5kID0gKG9iamVjdCwgLi4uZXh0ZW5zaW9ucykgPT4geyAvLyAkLmV4dGVuZCBhbHRlcm5hdGl2ZSwgLi4uIGlzIHRoZSBzcHJlYWQgb3BlcmF0b3IuXG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhleHRlbnNpb24pO1xuICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBleHRlbnNpb24pO1xuXG4gICAgaWYgKCFleHRlbnNpb24pXG4gICAgICBjb250aW51ZTsgLy8gSWdub3JlIG51bGwgYW5kIHVuZGVmaW5lZCBvYmplY3RzIGFuZCBwYXJhbWV0ZXJzLlxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4dGVuc2lvbikpIHsgLy8gRG8gbm90IHRyYXZlcnNlIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICBpZiAob2JqZWN0W3Byb3BdICE9PSB1bmRlZmluZWQgJiYgZXh0ZW5zaW9uW3Byb3BdXG4gICAgICAgICYmIG9iamVjdFtwcm9wXS50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAmJiBleHRlbnNpb25bcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgLy8gR29lcyBkZWVwIG9ubHkgaWYgb2JqZWN0W3Byb3BdIGFuZCBleHRlbnNpb25bcHJvcF0gYXJlIGJvdGggb2JqZWN0cyAhXG4gICAgICAgIGlmIChvYmplY3RbcHJvcF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkgZXh0ZW5kKG9iamVjdFtwcm9wXSwgZXh0ZW5zaW9uW3Byb3BdKTtcbiAgICAgIH0gZWxzZVxuICAgICAgICBvYmplY3RbcHJvcF0gPSB0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyA/IGV4dGVuc2lvbltwcm9wXSA6IG9iamVjdFtwcm9wXTtcblxuICAgICAgaWYgKHR5cGVvZiBvYmplY3RbcHJvcF0gPT09ICd1bmRlZmluZWQnICYmIEFycmF5LmlzQXJyYXkoZXh0ZW5zaW9uW3Byb3BdKSkgb2JqZWN0W3Byb3BdID0gZXh0ZW5zaW9uW3Byb3BdLnNsaWNlKCk7IC8vIEFkZCB2YWx1ZXMgdGhhdCBkbyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmplY3RbcHJvcF0gPT09ICd1bmRlZmluZWQnICYmIEFycmF5LmlzQXJyYXkoZXh0ZW5zaW9uW3Byb3BdKSkgb2JqZWN0W3Byb3BdID0gZXh0ZW5zaW9uW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGluc3RydWN0ID0gKGFycmF5LCBpbnN0QXJyYXkpID0+IHtcbiAgY29uc3QgdGVtcE9iamVjdCA9IHt9O1xuXG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnN0QXJyYXkubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICBjb25zdCBndWlkZSA9IGluc3RBcnJheVtpXTtcblxuICAgIHRlbXBPYmplY3RbZ3VpZGVdID0gYXJyYXlbaV07XG4gIH1cblxuICByZXR1cm4gdGVtcE9iamVjdDtcbn07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1EYXRhID0gKG9iamVjdCwgaW5zdHJ1Y3Rpb25zKSA9PiB7XG4gIGZvciAoY29uc3Qga2V5IGluIGluc3RydWN0aW9ucykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdFtrZXldKSlcbiAgICAgIG9iamVjdFtrZXldID0gaW5zdHJ1Y3Qob2JqZWN0W2tleV0sIGluc3RydWN0aW9uc1trZXldKTtcbiAgICBlbHNlIGlmIChvYmplY3Rba2V5XSBpbnN0YW5jZW9mIE9iamVjdCAmJiAhKEFycmF5LmlzQXJyYXkoaW5zdHJ1Y3Rpb25zW2tleV0pKSlcbiAgICAgIG9iamVjdFtrZXldID0gdHJhbnNmb3JtRGF0YShvYmplY3Rba2V5XSwgaW5zdHJ1Y3Rpb25zW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cbmV4cG9ydCBjb25zdCB0b0FycmF5ID0gKG9iamVjdCwgaW5zdHJ1Y3Rpb24pID0+IHtcbiAgY29uc3QgdGVtcEFycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGluc3RydWN0aW9uLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgY29uc3QgZ3VpZGUgPSBpbnN0cnVjdGlvbltpXTtcblxuICAgIHRlbXBBcnJheVtpXSA9IG9iamVjdFtndWlkZV07XG4gIH1cblxuICByZXR1cm4gdGVtcEFycmF5O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRXZlbnRzKHRhcmdldCl7XG4gIHZhciBldmVudHMgPSB7fSwgZW1wdHkgPSBbXTtcbiAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHRoaXNcbiAgLyoqXG4gICAqICBPbjogbGlzdGVuIHRvIGV2ZW50c1xuICAgKi9cbiAgdGFyZ2V0Lm9uID0gZnVuY3Rpb24odHlwZSwgZnVuYywgY3R4KXtcbiAgICAoZXZlbnRzW3R5cGVdID0gZXZlbnRzW3R5cGVdIHx8IFtdKS5wdXNoKFtmdW5jLCBjdHhdKVxuICB9XG4gIC8qKlxuICAgKiAgT2ZmOiBzdG9wIGxpc3RlbmluZyB0byBldmVudCAvIHNwZWNpZmljIGNhbGxiYWNrXG4gICAqL1xuICB0YXJnZXQub2ZmID0gZnVuY3Rpb24odHlwZSwgZnVuYyl7XG4gICAgdHlwZSB8fCAoZXZlbnRzID0ge30pXG4gICAgdmFyIGxpc3QgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksXG4gICAgICAgIGkgPSBsaXN0Lmxlbmd0aCA9IGZ1bmMgPyBsaXN0Lmxlbmd0aCA6IDA7XG4gICAgd2hpbGUoaS0tKSBmdW5jID09IGxpc3RbaV1bMF0gJiYgbGlzdC5zcGxpY2UoaSwxKVxuICB9XG4gIC8qKiBcbiAgICogRW1pdDogc2VuZCBldmVudCwgY2FsbGJhY2tzIHdpbGwgYmUgdHJpZ2dlcmVkXG4gICAqL1xuICB0YXJnZXQuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICAgIHZhciBlID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LCBsaXN0ID0gZS5sZW5ndGggPiAwID8gZS5zbGljZSgwLCBlLmxlbmd0aCkgOiBlLCBpPTAsIGo7XG4gICAgd2hpbGUoaj1saXN0W2krK10pIGpbMF0uYXBwbHkoalsxXSwgZW1wdHkuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuICB9O1xufTsiLCJleHBvcnQgY2xhc3MgQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgY29tcG9uZW50KSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdDb21wb25lbnQ6JywgY29tcG9uZW50KTtcblxuICAgIHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jeUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBhY3RpdmVNb2R1bGUsIGRlcGVuZGVuY3lNb2R1bGUgPSBmYWxzZSkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQWN0aXZlIG1vZHVsZTonLCBhY3RpdmVNb2R1bGUpO1xuICAgIGlmIChjb25zb2xlICYmIGRlcGVuZGVuY3lNb2R1bGUpIGNvbnNvbGUuZXJyb3IoJ0RlcGVuZGVuY3kgcHVibGlzaGVkIGJ5IG1vZHVsZTonLCBkZXBlbmRlbmN5TW9kdWxlKTtcblxuICAgIHRoaXMubmFtZSA9ICdEZXBlbmRlbmN5RXJyb3InO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGNvbXBvbmVudCwgYWN0aXZlTW9kdWxlID0gZmFsc2UpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0NvbXBvbmVudDonLCBjb21wb25lbnQpO1xuICAgIGlmIChjb25zb2xlICYmIGFjdGl2ZU1vZHVsZSkgY29uc29sZS5lcnJvcignQWN0aXZlIG1vZHVsZTonLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgdGhpcy5uYW1lID0gJ01hbmFnZXJFcnJvcic7XG4gIH1cbn1cbiIsImltcG9ydCB7UkVWSVNJT059IGZyb20gJ3RocmVlJztcbmltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcbmltcG9ydCB7TWFuYWdlckVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8vIENoZWNrIGZvciBUaHJlZS5qc1xuY29uc3Qgd2FybkRlcHMgPSAoKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcignV2hpdGVzdG9ybUpTIEZyYW1ld29yayByZXF1aXJlcyBUaHJlZS5qcyByODQuIGh0dHBzOi8vdGhyZWVqcy5vcmcvJyk7XG59O1xuXG50cnkge1xuICBpZiAoIVJFVklTSU9OKSB3YXJuRGVwcygpO1xufSBjYXRjaCAoZXJyKSB7XG4gIHdhcm5EZXBzKCk7XG59XG5cbi8qKlxuICogQGNsYXNzIE1vZHVsZVN5c3RlbVxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBkZXNjcmlwdGlvbiAgUHJvdmlkZXMgQVBJIGZvciBjbGFzc2VzIHRoYXQgd2lsbCB1c2UgTW9kdWxlcy48YnIvPlxuICogVGhpcyBjbGFzcyBpbmNsdWRlcyBiYXNpYyBldmVudCBzeXN0ZW0gd2l0aCB0aG9zZSBzdXBwb3J0ZWQgbWV0aG9kczpcbiAqIDxwcmU+Lm9uKCk8L3ByZT48cHJlPi5vZmYoKTwvcHJlPjxwcmU+LmVtaXQoKTwvcHJlPlxuICogQGV4dGVuZHMgRXZlbnRzXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZHVsZVN5c3RlbSBleHRlbmRzIEV2ZW50cyB7XG4gIC8vIElOVEVHUkFUSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaW50ZWdyYXRlTW9kdWxlc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIGFwcGxpZXMgYWxsIG1vZHVsZXMgZnJvbSAubW9kdWxlcyBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3NvdXJjZV0gSWYgc291cmNlIChzaG91bGQgYmUgYSBjb21wb25lbnQpIGlzIHByb3ZpZGVkLCB3aWxsIHJlcGxhY2UgLm1vZHVsZXMgd2l0aCBzb3VyY2UncyBvbmUgYmVmb3JlIGV4ZWN1dGluZyBtb2R1bGVzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBpbnRlZ3JhdGVNb2R1bGVzKHNvdXJjZSkge1xuICAgIGlmICghdGhpcy5tb2R1bGVzICYmICFzb3VyY2UpIHJldHVybjtcbiAgICBpZiAoc291cmNlICYmIHNvdXJjZS5tb2R1bGVzKSB0aGlzLm1vZHVsZXMgPSBzb3VyY2UubW9kdWxlcy5zbGljZSgwKTtcblxuICAgIGlmICh0aGlzLm1vZHVsZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspXG4gICAgICAgIHRoaXMuYXBwbHlNb2R1bGUodGhpcy5tb2R1bGVzW2ldLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZSkgdGhpcy5hcHBseUJyaWRnZSh7b25Db3B5OiBzb3VyY2V9KTtcbiAgfVxuXG4gIC8vIEFQUExZSU5HIE1PRFVMRSAoLi4uYW5kIGEgXCJicmlkZ2VcIiBmb3IgbW9kdWxlKVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5QnJpZGdlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZXMgY29tcG9uZW50LXNwZWNpZmljIEFQSSB0byB3b3JrIHdpdGggbW9kdWxlcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJyaWRnZU1hcFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgb2JqZWN0IHdpdGggbW9kaWZpZWQgdmFsdWVzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBhcHBseUJyaWRnZShicmlkZ2VNYXAgPSB7fSkge1xuICAgIGNvbnN0IG1vZHVsZXMgPSB0aGlzLm1vZHVsZXM7XG4gICAgaWYgKCFtb2R1bGVzKSByZXR1cm4gYnJpZGdlTWFwO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IG1vZHVsZXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGJyaWRnZU1hcCkge1xuICAgICAgICBpZiAoYnJpZGdlTWFwW2tleV0pIHtcbiAgICAgICAgICBjb25zdCBtb2R1bGUgPSBtb2R1bGVzW2ldO1xuXG4gICAgICAgICAgaWYgKG1vZHVsZSAmJiBtb2R1bGUuYnJpZGdlICYmIG1vZHVsZS5icmlkZ2Vba2V5XSlcbiAgICAgICAgICAgIGJyaWRnZU1hcFtrZXldID0gbW9kdWxlLmJyaWRnZVtrZXldLmFwcGx5KHRoaXMsIFticmlkZ2VNYXBba2V5XSwgbW9kdWxlXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnJpZGdlTWFwO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlDb21tYW5kXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gLmFwcGx5Q29tbWFuZCBydW5zIGEgbWV0aG9kIGNhbGxlZCBgbmFtZWAgb24gYWxsIG1vZHVsZXMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIHRoZSBtZXRob2QgbmFtZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiPShmdW5jLCBtb2R1bGVTY29wZSkgPT4gZnVuYy5hcHBseSh0aGlzLCBbbW9kdWxlU2NvcGVdKV0gSG93IHRoZSBmdW5jdGlvbiBpcyB3cmFwcGVkL1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBhcHBseUNvbW1hbmQobmFtZSwgY2IgPSAoZnVuYywgbW9kdWxlU2NvcGUpID0+IGZ1bmMuYXBwbHkodGhpcywgW21vZHVsZVNjb3BlXSkpIHtcbiAgICBjb25zdCBtb2R1bGVzID0gdGhpcy5tb2R1bGVzO1xuICAgIGlmICghbW9kdWxlcykgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IG1vZHVsZXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXNbaV07XG4gICAgICBpZiAobmFtZSBpbiBtb2R1bGUpIGNiKG1vZHVsZVtuYW1lXSwgbW9kdWxlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseU1vZHVsZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIC5hcHBseU1vZHVsZSBpcyBhbHNvIHVzZWQgaW4gLmludGVncmF0ZU1vZHVsZXMoKSBmdW5jdGlvbi5cbiAgICogSXQgZG9lcyBleGFjdGx5IHdoYXQgaXRzIG5hbWUgc2F5cyAoYXBwbGllcyBtb2R1bGUgdG8gY29tcG9uZW50IG9yIGFwcCkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBhcHBseVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwdXNoPXRydWVdXG4gICAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBtb2R1bGUgdGhhdCB3YXMgYXBwbGllZC5cbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlU3lzdGVtXG4gICAqL1xuICBhcHBseU1vZHVsZShtb2R1bGUsIHB1c2ggPSB0cnVlKSB7XG4gICAgaWYgKCFtb2R1bGUpIHJldHVybjtcbiAgICBpZiAocHVzaCAmJiB0aGlzLm1vZHVsZXMpIHRoaXMubW9kdWxlcy5wdXNoKG1vZHVsZSk7XG4gICAgZWxzZSBpZiAocHVzaCkgdGhpcy5tb2R1bGVzID0gW21vZHVsZV07XG5cbiAgICBpZiAodGhpcy5tYW5hZ2VyKSB0aGlzLm1hbmFnZXIuYWN0aXZlKG1vZHVsZSk7XG5cbiAgICBpZiAobW9kdWxlLm1hbmFnZXIgJiYgdGhpcy5tYW5hZ2VyKSBtb2R1bGUubWFuYWdlcih0aGlzLm1hbmFnZXIpO1xuICAgIGVsc2UgaWYgKG1vZHVsZS5tYW5hZ2VyKSB7XG4gICAgICB0aHJvdyBuZXcgTWFuYWdlckVycm9yKFxuICAgICAgICAnQ29tcG9uZW50JyxcbiAgICAgICAgYE1vZHVsZSByZXF1aXJlcyBNb2R1bGVNYW5hZ2VyIHRoYXQgaXMgdHVybmVkIG9mZiBmb3IgdGhpcyBjb21wb25lbnRgLFxuICAgICAgICB0aGlzLCBtb2R1bGVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG1vZHVsZS5pbnRlZ3JhdGUpIG1vZHVsZS5pbnRlZ3JhdGUuYmluZCh0aGlzKShtb2R1bGUpO1xuXG4gICAgcmV0dXJuIG1vZHVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRpc3Bvc2VNb2R1bGVzXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGlzcG9zZXMgb2YgYWxsIG1vZHVsZXNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgZGlzcG9zZU1vZHVsZXMoKSB7XG4gICAgd2hpbGUgKHRoaXMubW9kdWxlcy5sZW5ndGgpXG4gICAgICB0aGlzLmRpc3Bvc2VNb2R1bGUodGhpcy5tb2R1bGVzWzBdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRpc3Bvc2VNb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwb3NlcyBvZiB0aGUgZ2l2ZW4gbW9kdWxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBkaXNwb3NlXG4gICAqIEByZXR1cm4ge01vZHVsZX0gUmV0dXJucyBtb2R1bGUgdGhhdCB3YXMgcmVtb3ZlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgZGlzcG9zZU1vZHVsZShtb2R1bGUpIHtcbiAgICBpZiAoIW1vZHVsZSkgcmV0dXJuO1xuXG4gICAgdGhpcy5tb2R1bGVzLnNwbGljZSh0aGlzLm1vZHVsZXMuaW5kZXhPZihtb2R1bGUpLCAxKTtcblxuICAgIGlmIChtb2R1bGUuZGlzcG9zZSkgbW9kdWxlLmRpc3Bvc2UuYmluZCh0aGlzKShtb2R1bGUpO1xuXG4gICAgcmV0dXJuIG1vZHVsZTtcbiAgfVxuXG4gIC8vIFBJUEVEIE1FVEhPRFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIG1vZHVsZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIHBpcGVkIHZlcnNpb24gb2YgLmFwcGx5TW9kdWxlKCkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBhcHBseVxuICAgKiBAcmV0dXJuIHt0aGlzfSByZXR1cm5zIHRoaXMgLSBhcHAvY29tcG9uZW50XG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5QaXBlZCBtb2R1bGVzPC9jYXB0aW9uPlxuICAgKiBjb21wb25lbnRcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUxKCkpXG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMigpKVxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTMoKSlcbiAgICovXG4gIG1vZHVsZShtb2R1bGUpIHtcbiAgICB0aGlzLmFwcGx5TW9kdWxlKG1vZHVsZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbmV4cG9ydCBkZWZhdWx0IGZyZWVHbG9iYWw7XG4iLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb290O1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFRvU3RyaW5nO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlckFyZztcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJvdG90eXBlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0U3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5pbXBvcnQgcG9ueWZpbGwgZnJvbSAnLi9wb255ZmlsbCc7XG5cbnZhciByb290O1xuXG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gbW9kdWxlO1xufSBlbHNlIHtcbiAgcm9vdCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG59XG5cbnZhciByZXN1bHQgPSBwb255ZmlsbChyb290KTtcbmV4cG9ydCBkZWZhdWx0IHJlc3VsdDtcbiIsImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0JztcbmltcG9ydCAkJG9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnO1xuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xuZXhwb3J0IHZhciBBY3Rpb25UeXBlcyA9IHtcbiAgSU5JVDogJ0BAcmVkdXgvSU5JVCdcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFJlZHV4IHN0b3JlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIHRyZWUuXG4gICAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICAgKlxuICAgKiBUaGVyZSBzaG91bGQgb25seSBiZSBhIHNpbmdsZSBzdG9yZSBpbiB5b3VyIGFwcC4gVG8gc3BlY2lmeSBob3cgZGlmZmVyZW50XG4gICAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAgICogaW50byBhIHNpbmdsZSByZWR1Y2VyIGZ1bmN0aW9uIGJ5IHVzaW5nIGBjb21iaW5lUmVkdWNlcnNgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gICAqIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBhY3Rpb24gdG8gaGFuZGxlLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAgICogdG8gaHlkcmF0ZSB0aGUgc3RhdGUgZnJvbSB0aGUgc2VydmVyIGluIHVuaXZlcnNhbCBhcHBzLCBvciB0byByZXN0b3JlIGFcbiAgICogcHJldmlvdXNseSBzZXJpYWxpemVkIHVzZXIgc2Vzc2lvbi5cbiAgICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICAgKiBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZSBhcyBgY29tYmluZVJlZHVjZXJzYCBrZXlzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZW5oYW5jZXJdIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAgICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICAgKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG4gICAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG4gICAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAgICovXG59O2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgY3VycmVudCBzdGF0ZSB0cmVlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgbmV4dExpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgbGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBuZXh0UmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbmV4dFJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UmVkdWNlciA9IG5leHRSZWR1Y2VyO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cbiAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIG9ic2VydmFibGUgcHJvcG9zYWw6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9ic2VydmFibGVcbiAgICovXG4gIGZ1bmN0aW9uIG9ic2VydmFibGUoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmV0dXJuIF9yZWYgPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYnNlcnZlciBBbnkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gb2JzZXJ2ZXIuXG4gICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cbiAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG4gICAgICAgKiBiZSB1c2VkIHRvIHVuc3Vic2NyaWJlIHRoZSBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgcHJldmVudCBmdXJ0aGVyXG4gICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAqL1xuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGdldFN0YXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVTdGF0ZSgpO1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUgfTtcbiAgICAgIH1cbiAgICB9LCBfcmVmWyQkb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9XG5cbiAgLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG4gIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbJCRvYnNlcnZhYmxlXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufSIsIi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59IiwiLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGEoYi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xufSIsImltcG9ydCBjcmVhdGVTdG9yZSBmcm9tICcuL2NyZWF0ZVN0b3JlJztcbmltcG9ydCBjb21iaW5lUmVkdWNlcnMgZnJvbSAnLi9jb21iaW5lUmVkdWNlcnMnO1xuaW1wb3J0IGJpbmRBY3Rpb25DcmVhdG9ycyBmcm9tICcuL2JpbmRBY3Rpb25DcmVhdG9ycyc7XG5pbXBvcnQgYXBwbHlNaWRkbGV3YXJlIGZyb20gJy4vYXBwbHlNaWRkbGV3YXJlJztcbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG4vKlxuKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4qIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICB3YXJuaW5nKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFxcJ3Byb2R1Y3Rpb25cXCcuICcgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlU3RvcmUsIGNvbWJpbmVSZWR1Y2VycywgYmluZEFjdGlvbkNyZWF0b3JzLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UgfTsiLCJpbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge0RlcGVuZGVuY3lFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEBjbGFzcyBNb2R1bGVNYW5hZ2VyXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBoYW5kbGVyXG4gKiBAZGVzY3JpcHRpb24gIFNvbHZlcyBtb2R1bGVzIGRlcGVuZGVuY2llc1xuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgdGhpcy5oYW5kbGVyID0gb2JqZWN0O1xuICAgIHRoaXMuY3VycmVudE1vZHVsZSA9IG51bGw7XG5cbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU3RvcmUoKHN0YXRlID0gW3t9LCAnJ10sIGFjdGlvbikgPT4ge1xuICAgICAgc3RhdGVbMF1bYWN0aW9uLmtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgIHN0YXRlWzFdID0gYWN0aW9uLmtleTtcblxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb2R1bGVzID0ge307XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhY3RpdmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIC5jdXJyZW50TW9kdWxlIHRvIHByb3ZpZGVkIG1vZHVsZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSB0aGUgbW9kdWxlIHRvIG1ha2UgY3VycmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgYWN0aXZlKG1vZHVsZSkge1xuICAgIHRoaXMuY3VycmVudE1vZHVsZSA9IG1vZHVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0J3MgLmN1cnJlbnRNb2R1bGUgdG8gbnVsbC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuY3VycmVudE1vZHVsZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZpbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBEZWZpbmUgdGhlIG1vZHVsZSBpbiBtYW5hZ2VyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBtb2R1bGUgbmFtZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgZGVmaW5lKG5hbWUpIHtcbiAgICB0aGlzLm1vZHVsZXNbbmFtZV0gPSB0aGlzLmN1cnJlbnRNb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1c2VcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGRlZmluZWQgbW9kdWxlIGZyb20gbWFuYWdlclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbW9kdWxlIG5hbWVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHVzZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kdWxlc1tuYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFuIGFsaWFzIGZvciAuYWRkKCkgPGJyLz48YnIvPlxuICAgKiBVc2UgdGhpcyBtZXRob2QgaWYgeW91IGtub3cgdGhhdCB5b3Ugd2lsbCBvdmVyd3JpdGUgZXhpc3RpbmcgZGVwZW5kZW5jeS48YnIvPlxuICAgKiBVc2UgaXQgaW4geW91ciBhcHAsIGJ1dCBub3QgaW4gbW9kdWxlIHRoYXQgeW91IHByb3ZpZGUgdG8gb3RoZXIgcGVvcGxlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgdGhlIHZhbHVlIG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBzZXQoa2V5LCBkYXRhKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnQUREJyxcbiAgICAgIGtleSxcbiAgICAgIGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgZGVwZW5kZW5jeSBpbiBzdG9yZSBvYmplY3QsIGJ5IGtleS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqIEByZXR1cm4ge09iamVjdHxNb2R1bGV9XG4gICAqIEB0aHJvd3Mge0RlcGVuZGVuY3lFcnJvcn0gaWYgZGVwZW5kZW5jeSBpcyBub3QgaW4gdGhlIHN0b3JlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkdldCB0aGUgJ2hlbGxvJyBkZXBlbmRlbmN5PC9jYXB0aW9uPlxuICAgKiBtYW5hZ2VyLmdldCgnaGVsbG8nKTsgLy8gLT4ge3dvcmxkOiB0cnVlfVxuICAgKi9cbiAgZ2V0KGtleSkge1xuICAgIGlmICghdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV0pIHtcbiAgICAgIHRocm93IG5ldyBEZXBlbmRlbmN5RXJyb3IoXG4gICAgICAgICdNb2R1bGVNYW5hZ2VyJyxcbiAgICAgICAgYE1vZHVsZSByZXF1aXJlcyAnJHtrZXl9JyBkZXBlbmRlbmN5YCxcbiAgICAgICAgdGhpcy5jdXJyZW50TW9kdWxlXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGhhc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgd2hldGhlciBtYW5hZ2VyIGhhcyBhIGRlcGVuZGVuY3kgd2l0aCB0aGUgZ2l2ZW4ga2V5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5DaGVjayB3aGV0aGVyIHRoZSBzdG9yZSBoYXMgdGhlICdoZWxsbycgZGVwZW5kZW5jeTwvY2FwdGlvbj5cbiAgICogbWFuYWdlci5oYXMoJ2hlbGxvJyk7IC8vIC0+IHRydWVcbiAgICovXG4gIGhhcyhrZXkpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnN0b3JlLmdldFN0YXRlKClbMF1ba2V5XSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGVzIGRlcHNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtkZXBzTWFwPXt9XVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgdXBkYXRlKGRlcHNNYXAgPSB7fSkge1xuICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IFtkYXRhLCBjaGFuZ2VkS2V5XSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gZGVwc01hcFtjaGFuZ2VkS2V5XTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhW2NoYW5nZWRLZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZFxuICAgKiBAYWxpYXMgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlciNzZXRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGFkZCguLi5kYXRhKSB7XG4gICAgY29uc29sZS53YXJuKCcuYWRkKCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuIFVzZSAuc2V0KCkgaW5zdGVhZCcpO1xuICAgIHJldHVybiB0aGlzLnNldCguLi5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlcXVpcmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXF1aXJlIG1vZHVsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBEZWZpbmVkIG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kdWxlRXhlY3V0b3IgRnVuY3Rpb24gdGhhdCByZXR1cm5zIGFwcGxpZWQgbW9kdWxlXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICByZXF1aXJlKG5hbWUsIG1vZHVsZUV4ZWN1dG9yKSB7XG4gICAgaWYgKHRoaXMudXNlKG5hbWUpID09PSB1bmRlZmluZWQpIHRoaXMuaGFuZGxlci5hcHBseU1vZHVsZShtb2R1bGVFeGVjdXRvcigpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtleHRlbmQsIHRyYW5zZm9ybURhdGF9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcbmltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJ9IGZyb20gJy4vTW9kdWxlTWFuYWdlcic7XG5pbXBvcnQge01hbmFnZXJFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIE1vZHVsZVN5c3RlbVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIE1vZHVsZVN5c3RlbSB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHtcbiAgICogICBtb2R1bGVzOiBbXSxcbiAgICogICBtYW5hZ2VyOiB0cnVlXG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICBtb2R1bGVzOiBudWxsLFxuICAgIG1hbmFnZXI6IHRydWVcbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCB7fVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHt9O1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBwcm9taXNlcyB0aGF0IHNob3VsZCBiZSByZXNvbHZlZCBiZWZvcmUgQ29tcG9uZW50IGlzIHJlYWR5LlxuICAgKiBAbWVtYmVyIHtBcnJheX0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I193YWl0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd2FpdCA9IFtdOyAvLyBDb2xsZWN0aW9uIG9mIHByb21pc2VzO1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGBtb2R1bGVzYC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNtb2R1bGVzXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIG1vZHVsZXMgPSBbXTsgLy8gQ29sbGVjdGlvbiBvZiBtb2R1bGVzO1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGBjaGlsZGAgQ29tcG9uZW50cy5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNjaGlsZHJlblxuICAgKiBAcHVibGljXG4gICAqL1xuICBjaGlsZHJlbiA9IFtdOyAvLyBGb3Iga2VlcGluZyBjaGlsZHJlbiBjb21wb25lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBkZWZhdWx0cyA9IENvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gQ29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBBcHBseSBwb2x5ZmlsbGVkIHBhcmFtZXRlcnMgdG8gLnBhcmFtcztcbiAgICB0aGlzLnBhcmFtcyA9IGV4dGVuZCh0cmFuc2Zvcm1EYXRhKHBhcmFtcywgaW5zdHJ1Y3Rpb25zKSwgZGVmYXVsdHMpO1xuICAgIGlmICh0aGlzLnBhcmFtcy5tYW5hZ2VyKSB0aGlzLm1hbmFnZXIgPSBuZXcgTW9kdWxlTWFuYWdlcigpO1xuXG4gICAgdGhpcy5tb2R1bGVzID0gdGhpcy5wYXJhbXMubW9kdWxlcztcblxuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd2FpdFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdhaXQgZm9yIGEgcHJvbWlzZS5cbiAgICogQHBhcmFtIHtQcm9taXNlfSBbcHJvbWlzZV0gLSBUaGUgcHJvbWlzZSB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byBhIHF1ZXVlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICB3YWl0KHByb21pc2UpIHtcbiAgICBpZiAocHJvbWlzZSkgdGhpcy5fd2FpdC5wdXNoKHByb21pc2UpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl93YWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlZmVyXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRXhlY3V0ZSBgZnVuY2AgKENhbGxiYWNrKSB3aGVuIENvbXBvbmVudCBpcyByZWFkeS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIENhbGxiYWNrLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBkZWZlcihmdW5jKSB7XG4gICAgaWYgKHRoaXMuaXNEZWZmZXJlZCkgdGhpcy53YWl0KCkudGhlbigoKSA9PiBmdW5jKHRoaXMpKTtcbiAgICBlbHNlIGZ1bmModGhpcyk7XG4gIH1cblxuICAvLyBQQVJBTUVURVJTXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlUGFyYW1zXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyBwYXJhbWV0ZXJzIG9mIHRoZSBDb21wb25lbnQuXG4gICAqIEByZXR1cm4ge09iamVjdH0gUGFyYW1zIG9mIHRoaXMgQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIHVwZGF0ZVBhcmFtcyhwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gZXh0ZW5kKHBhcmFtcywgdGhpcy5wYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLnBhcmFtcztcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDbG9uZSB0aGlzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHtvYmplY3R9IGEgY2xvbmVkIGNvbXBvbmVudCB3aXRoIGFsbCBpdHMgc291cmNlIGNvbXBvbmVudCcgcGFyYW1zIGNvcGllZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMucGFyYW1zKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIG5hdGl2ZSBhbmQgaW50ZWdyYXRlIGBtb2R1bGVzYCB0byBpdC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IHNvdXJjZSAtIFNvdXJjZSBjb21wb25lbnQgdGhhdCBpcyB1c2VkIGZvciBgY29weSgpYCBhY3Rpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVdIC0gQ2FsbGJhY2sgZXhlY3V0ZWQgYmVmb3JlIG1vZHVsZXMgaW50ZWdyYXRpb24gcHJvY2Vzcy5cbiAgICogQHJldHVybiB7dGhpc30gQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlLCBjdXN0b21pemUpIHtcbiAgICB0aGlzLnBhcmFtcyA9IHsuLi5zb3VyY2UucGFyYW1zfTtcblxuICAgIGlmIChzb3VyY2UubmF0aXZlKSB0aGlzLm5hdGl2ZSA9IHNvdXJjZS5uYXRpdmUuY2xvbmUoc291cmNlLnBhcmFtcyk7XG4gICAgaWYgKGN1c3RvbWl6ZSkgY3VzdG9taXplKCk7XG4gICAgdGhpcy5pbnRlZ3JhdGVNb2R1bGVzKHNvdXJjZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBhIGNoaWxkIGBDb21wb25lbnRgLlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gb2JqZWN0IC0gQ29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIGFkZGVkIGFzIGEgYGNoaWxkYC5cbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgZG9uZS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgYWRkKG9iamVjdCkge1xuICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgICBjb25zdCB7bmF0aXZlfSA9IG9iamVjdDtcbiAgICAgICAgaWYgKCFuYXRpdmUpIHJlamVjdCgpO1xuXG4gICAgICAgIGNvbnN0IGFkZFByb21pc2UgPSB0aGlzLmFwcGx5QnJpZGdlKHtvbkFkZDogb2JqZWN0fSkub25BZGQ7XG5cbiAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUuYWRkKG5hdGl2ZSk7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICByZXNvbHZlKG9iamVjdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGFkZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSBhZGRQcm9taXNlLnRoZW4ocmVzb2x2ZXIpO1xuICAgICAgICBlbHNlIHJlc29sdmVyKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZSBhIGNoaWxkIGBDb21wb25lbnRgLlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gb2JqZWN0IC0gQ29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIGEgKipjaGlsZCoqIG9mIHRoaXMgQ29tcG9uZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICByZW1vdmUob2JqZWN0KSB7XG4gICAgb2JqZWN0LnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5uYXRpdmUucmVtb3ZlKG9iamVjdC5uYXRpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkVG9cbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGB0aGlzYCBDb21wb25lbnQgdG8gc3BlY2lmaWVkIGBBcHBgL2BDb21wb25lbnRgLlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gb2JqZWN0IC0gQ29tcG9uZW50IHRoYXQgd2lsbCBiZSBhIHBhcmVudCBvZiBgdGhpc2AuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGFkZFRvKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QuYWRkKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgb2JqZWN0IGlzIGBhc3luY2AgKGB3YWl0YCBwcm9taXNlcyBhcmUgbW9yZSB0aGFuIGAwYCkuXG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNpc0RlZmZlcmVkXG4gICAqL1xuICBnZXQgaXNEZWZmZXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2FpdC5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBNb2R1bGVNYW5hZ2VyYCB1c2VkIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICogQG1lbWJlciB7TW9kdWxlTWFuYWdlcn0gbW9kdWxlOmNvcmUuQ29tcG9uZW50I21hbmFnZXJcbiAgICogQHRocm93cyB7TWFuYWdlckVycm9yfVxuICAgKi9cbiAgZ2V0IG1hbmFnZXIoKSB7XG4gICAgaWYgKHRoaXMuX21hbmFnZXIpIHJldHVybiB0aGlzLl9tYW5hZ2VyO1xuXG4gICAgdGhyb3cgbmV3IE1hbmFnZXJFcnJvcihcbiAgICAgICdDb21wb25lbnQnLFxuICAgICAgYE1vZHVsZU1hbmFnZXIgaXMgbm90IHVzZWQgaW4gdGhpcyBjb21wb25lbnQuICdtYW5hZ2VyJyBwYXJhbWV0ZXIgc2hvdWxkIGJlIHNldCBhcyAndHJ1ZSdgLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICBzZXQgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgdGhpcy5fbWFuYWdlciA9IG1hbmFnZXI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYG5hdGl2ZWAgb2JqZWN0IHVzZWQgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNuYXRpdmVcbiAgICovXG4gIGdldCBuYXRpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZTtcbiAgfVxuXG4gIHNldCBuYXRpdmUobWVzaCkge1xuICAgIHRoaXMuX25hdGl2ZSA9IG1lc2g7XG4gICAgdGhpcy5fbmF0aXZlLmNvbXBvbmVudCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDb21wb25lbnRcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlcyguLi5tYXBwZXJzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtYXBwZXIgPSBtYXBwZXJzW2ldO1xuXG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1hcHBlci5tYXAubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbWFwcGVyLm1hcFtrXTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LnByb3RvdHlwZSwgYXR0cmlidXRlLCB7XG4gICAgICAgICAgZ2V0OiBtYXBwZXIuZ2V0dGVyKGF0dHJpYnV0ZSksXG4gICAgICAgICAgc2V0OiBtYXBwZXIuc2V0dGVyKGF0dHJpYnV0ZSksXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBtYXBwZXIuY29uZmlndXJhYmxlLFxuICAgICAgICAgIGVudW1lcmFibGU6IG1hcHBlci5lbnVtZXJhYmxlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoLi4ubWFwKSB7XG4gIHJldHVybiB7XG4gICAgbWFwLFxuICAgIGdldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVbbmFtZV07XG4gICAgICB9O1xuICAgIH0sXG4gICAgc2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVbbmFtZV0uY29weSh2YWx1ZSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pcnJvciguLi5tYXApIHtcbiAgcmV0dXJuIHtcbiAgICBtYXAsXG4gICAgZ2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVtuYW1lXTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBzZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLm5hdGl2ZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH07XG59XG4iLCJpbXBvcnQge01lc2h9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weSwgbWlycm9yfSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICdzY2FsZScpLFxuICBtaXJyb3IoJ21hdGVyaWFsJywgJ2dlb21ldHJ5Jylcbilcbi8qKlxuICogQGNsYXNzIE1lc2hDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIE1lc2hDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKiAgIGdlb21ldHJ5OiB7fSxcbiAgICogICBtYXRlcmlhbDogZmFsc2UsXG4gICAqXG4gICAqICAgc2hhZG93OiB7XG4gICAqICAgICBjYXN0OiB0cnVlLFxuICAgKiAgICAgcmVjZWl2ZTogdHJ1ZVxuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHNjYWxlOiB7eDogMSwgeTogMSwgejogMX1cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGJ1aWxkOiB0cnVlLFxuICAgIGdlb21ldHJ5OiB7fSxcbiAgICBtYXRlcmlhbDogZmFsc2UsXG5cbiAgICBzaGFkb3c6IHtcbiAgICAgIGNhc3Q6IHRydWUsXG4gICAgICByZWNlaXZlOiB0cnVlXG4gICAgfSxcblxuICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICBzY2FsZToge3g6IDEsIHk6IDEsIHo6IDF9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gIH07XG5cbiAgLy8gQ1VTVE9NIEdFT01FVFJZIEhBTkRMSU5HXG5cbiAgc3RhdGljIGN1c3RvbShnZW9tLCBjb25zdHJ1Y3RvciA9IE1lc2gpIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgICAgIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IGdlb20sXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IGNvbnN0cnVjdG9yKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKGdlb20sIHBhcmFtcywgY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IChNZXNoQ29tcG9uZW50LmN1c3RvbShnZW9tLCBjb25zdHJ1Y3RvcikpKHBhcmFtcyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gTWVzaENvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB0aGlzLndhaXQoYnVpbGQpO1xuXG4gICAgICAgIHRoaXMud2FpdChuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgICAgIHRoaXMud3JhcCgpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubmF0aXZlID0gYnVpbGQ7XG4gICAgICAgIHRoaXMud2FpdCh0aGlzLndyYXAoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseUNvbW1hbmQoJ3Bvc3RJbnRlZ3JhdGUnKTtcbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAnSW5zdGFuY2Ugc2hvdWxkIGhhdmUgaXRcXCdzIG93biAuYnVpbGQoKS4nLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgdHJhbnNmb3JtcyAoYHBvc2l0aW9uYCAmIGByb3RhdGlvbmApXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGNvbXBsZXRlZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvLyBUT0RPOiBGaXggZGVmZXIgd2l0aCBwaHlzaWNzXG4gICAgICAvLyB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHtwb3NpdGlvbiwgcm90YXRpb24sIHNjYWxlLCBzaGFkb3d9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLnopO1xuICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XG4gICAgICB0aGlzLnNjYWxlLnNldChzY2FsZS54LCBzY2FsZS55LCBzY2FsZS56KTtcblxuICAgICAgdGhpcy5uYXRpdmUuY2FzdFNoYWRvdyA9IHNoYWRvdy5jYXN0O1xuICAgICAgdGhpcy5uYXRpdmUucmVjZWl2ZVNoYWRvdyA9IHNoYWRvdy5yZWNlaXZlO1xuXG4gICAgICB0aGlzLmFwcGx5QnJpZGdlKHtvbldyYXA6IDF9KTtcblxuICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIC8vIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gQ09QWUlORyAmIENMT05JTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgdHJhbnNmb3JtcyAmIGV4ZWN1dGUgYENvbXBvbmVudC5jb3B5KClgXG4gICAqIEByZXR1cm4ge3RoaXN9IE1lc2hDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICB0aGlzLnBvc2l0aW9uLmNvcHkoc291cmNlLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucm90YXRpb24uY29weShzb3VyY2Uucm90YXRpb24pO1xuICAgICAgdGhpcy5xdWF0ZXJuaW9uLmNvcHkoc291cmNlLnF1YXRlcm5pb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlIGEgY2xvbmUgb2YgdGhpcyBNZXNoQ29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtNZXNoQ29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoZ2VvbWV0cnksIG1hdGVyaWFsKSB7XG4gICAgY29uc3QgZGVzdCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtidWlsZDogZmFsc2V9KS5jb3B5KHRoaXMpO1xuXG4gICAgaWYgKGdlb21ldHJ5KSBkZXN0Lmdlb21ldHJ5ID0gZGVzdC5nZW9tZXRyeS5jbG9uZSgpO1xuICAgIGlmIChtYXRlcmlhbCkgZGVzdC5tYXRlcmlhbCA9IGRlc3QubWF0ZXJpYWwuY2xvbmUoKTtcblxuICAgIHJldHVybiBkZXN0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE1lc2hDb21wb25lbnRcbn07XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHl9IGZyb20gJy4vcHJvdG90eXBlL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHtDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbkBhdHRyaWJ1dGVzKFxuICBjb3B5KCdwb3NpdGlvbicsICdyb3RhdGlvbicsICdxdWF0ZXJuaW9uJywgJ3RhcmdldCcpXG4pXG4vKipcbiAqIEBjbGFzcyBMaWdodENvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTGlnaHRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICpcbiAgICogICBzaGFkb3c6IHtcbiAgICogICAgIGNhc3Q6IHRydWUsXG4gICAqXG4gICAqICAgICBiaWFzOiAwLFxuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKlxuICAgKiAgICAgbWFwU2l6ZToge1xuICAgKiAgICAgICB3aWR0aDogMTAyNCxcbiAgICogICAgICAgaGVpZ2h0OiAxMDI0XG4gICAqICAgICB9LFxuICAgKlxuICAgKiAgICAgY2FtZXJhOiB7XG4gICAqICAgICAgIG5lYXI6IHRydWUsXG4gICAqICAgICAgIGZhcjogNDAwLFxuICAgKiAgICAgICBmb3Y6IDkwLFxuICAgKlxuICAgKiAgICAgICB0b3A6IDIwMCxcbiAgICogICAgICAgYm90dG9tOiAtMjAwLFxuICAgKiAgICAgICBsZWZ0OiAtMjAwLFxuICAgKiAgICAgICByaWdodDogMjAwXG4gICAqICAgICB9XG4gICAqICAgfSxcbiAgICpcbiAgICogICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgKiAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGJ1aWxkOiB0cnVlLFxuXG4gICAgc2hhZG93OiB7XG4gICAgICBjYXN0OiB0cnVlLFxuXG4gICAgICBiaWFzOiAwLFxuICAgICAgcmFkaXVzOiAxLFxuXG4gICAgICBtYXBTaXplOiB7XG4gICAgICAgIHdpZHRoOiAxMDI0LFxuICAgICAgICBoZWlnaHQ6IDEwMjRcbiAgICAgIH0sXG5cbiAgICAgIGNhbWVyYToge1xuICAgICAgICBuZWFyOiB0cnVlLFxuICAgICAgICBmYXI6IDQwMCxcbiAgICAgICAgZm92OiA5MCxcblxuICAgICAgICB0b3A6IDIwMCxcbiAgICAgICAgYm90dG9tOiAtMjAwLFxuICAgICAgICBsZWZ0OiAtMjAwLFxuICAgICAgICByaWdodDogMjAwXG4gICAgICB9XG4gICAgfSxcblxuICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBMaWdodENvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gTGlnaHRDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnTGlnaHRDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgdGhpcy5uYXRpdmUgPSBidWlsZDtcblxuICAgICAgdGhpcy53YWl0KHRoaXMud3JhcCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5Q29tbWFuZCgncG9zdEludGVncmF0ZScpO1xuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICB3cmFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgICBjb25zdCB7cG9zaXRpb24sIHJvdGF0aW9ufSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLnopO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldChyb3RhdGlvbi54LCByb3RhdGlvbi55LCByb3RhdGlvbi56KTtcblxuICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtvbldyYXA6IDF9KTtcblxuICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwU2hhZG93XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgc2hhZG93IHByb3BlcnRpZXNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICB3cmFwU2hhZG93KCkge1xuICAgIGNvbnN0IHtuYXRpdmUsIHBhcmFtczoge3NoYWRvd319ID0gdGhpcztcblxuICAgIG5hdGl2ZS5jYXN0U2hhZG93ID0gc2hhZG93LmNhc3Q7XG4gICAgbmF0aXZlLnNoYWRvdy5tYXBTaXplLndpZHRoID0gc2hhZG93Lm1hcFNpemUud2lkdGg7XG4gICAgbmF0aXZlLnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IHNoYWRvdy5tYXBTaXplLmhlaWdodDtcbiAgICBuYXRpdmUuc2hhZG93LmJpYXMgPSBzaGFkb3cuYmlhcztcbiAgICBuYXRpdmUuc2hhZG93LnJhZGl1cyA9IHNoYWRvdy5yYWRpdXM7XG5cbiAgICBjb25zdCBzaGFkb3dDYW1lcmEgPSBuYXRpdmUuc2hhZG93LmNhbWVyYTtcbiAgICBjb25zdCBjYW1lcmEgPSBzaGFkb3cuY2FtZXJhO1xuXG4gICAgc2hhZG93Q2FtZXJhLm5lYXIgPSBjYW1lcmEubmVhcjtcbiAgICBzaGFkb3dDYW1lcmEuZmFyID0gY2FtZXJhLmZhcjtcbiAgICBzaGFkb3dDYW1lcmEuZm92ID0gY2FtZXJhLmZvdjtcblxuICAgIHNoYWRvd0NhbWVyYS5sZWZ0ID0gY2FtZXJhLmxlZnQ7XG4gICAgc2hhZG93Q2FtZXJhLnJpZ2h0ID0gY2FtZXJhLnJpZ2h0O1xuICAgIHNoYWRvd0NhbWVyYS50b3AgPSBjYW1lcmEudG9wO1xuICAgIHNoYWRvd0NhbWVyYS5ib3R0b20gPSBjYW1lcmEuYm90dG9tO1xuICB9XG5cbiAgLy8gQ09QWUlORyAmIENMT05JTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBjb3B5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ29weSBzb3VyY2UgdHJhbnNmb3JtcyAmIGV4ZWN1dGUgYENvbXBvbmVudC5jb3B5KClgXG4gICAqIEByZXR1cm4ge3RoaXN9IExpZ2h0Q29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UpIHtcbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRhcmdldCkgdGhpcy50YXJnZXQuY29weShzb3VyY2UudGFyZ2V0KCkpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLmNvcHkoc291cmNlLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucm90YXRpb24uY29weShzb3VyY2Uucm90YXRpb24pO1xuICAgICAgdGhpcy5xdWF0ZXJuaW9uLmNvcHkoc291cmNlLnF1YXRlcm5pb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlIGEgY2xvbmUgb2YgdGhpcyBMaWdodENvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7TGlnaHRDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtidWlsZDogZmFsc2V9KS5jb3B5KHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExpZ2h0Q29tcG9uZW50XG59O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5fSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICd0YXJnZXQnKVxuKVxuLyoqXG4gKiBAY2xhc3MgQ2FtZXJhQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBDYW1lcmFDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcblxuICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAqICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIHBvc2l0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgcm90YXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICBzY2FsZTogWyd4JywgJ3knLCAneiddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IENhbWVyYUNvbXBvbmVudC5kZWZhdWx0cywgaW5zdHJ1Y3Rpb25zID0gQ2FtZXJhQ29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ0NhbWVyYUNvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlID0gbmF0aXZlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuXG4gICAgICB0aGlzLndhaXQodGhpcy53cmFwKCkpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwbHlDb21tYW5kKCdwb3N0SW50ZWdyYXRlJyk7XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgc2hvdWxkIHJldHVybiBhIG5hdGl2ZSBvYmplY3QuXG4gICAqIEB0aHJvd3Mge0NvbXBvc2l0aW9uRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ0NhbWVyYUNvbXBvbmVudCcsXG4gICAgICAnSW5zdGFuY2Ugc2hvdWxkIGhhdmUgaXRcXCdzIG93biAuYnVpbGQoKS4nLFxuICAgICAgdGhpc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3cmFwXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gV3JhcHMgdHJhbnNmb3JtcyAoYHBvc2l0aW9uYCAmIGByb3RhdGlvbmApXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGNvbXBsZXRlZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICB3cmFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuZGVmZXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldCh0aGlzLnBhcmFtcy5wb3NpdGlvbi54LCB0aGlzLnBhcmFtcy5wb3NpdGlvbi55LCB0aGlzLnBhcmFtcy5wb3NpdGlvbi56KTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQodGhpcy5wYXJhbXMucm90YXRpb24ueCwgdGhpcy5wYXJhbXMucm90YXRpb24ueSwgdGhpcy5wYXJhbXMucm90YXRpb24ueik7XG5cbiAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBDYW1lcmFDb21wb25lbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgY29weShzb3VyY2UpIHtcbiAgICByZXR1cm4gc3VwZXIuY29weShzb3VyY2UsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRhcmdldCkgdGhpcy50YXJnZXQuY29weShzb3VyY2UudGFyZ2V0KCkpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLmNvcHkoc291cmNlLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucm90YXRpb24uY29weShzb3VyY2Uucm90YXRpb24pO1xuICAgICAgdGhpcy5xdWF0ZXJuaW9uLmNvcHkoc291cmNlLnF1YXRlcm5pb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBNYWtlIGEgY2xvbmUgb2YgdGhpcyBDYW1lcmFDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge0NhbWVyYUNvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtidWlsZDogZmFsc2V9KS5jb3B5KHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENhbWVyYUNvbXBvbmVudFxufTtcbiIsImV4cG9ydCBjb25zdCBzeXN0ZW0gPSB7XG4gIHdpbmRvdzogdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbn07XG4iLCJpbXBvcnQge3ZlcnNpb259IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vcG9seWZpbGwnO1xuaW1wb3J0IHtNb2R1bGVTeXN0ZW19IGZyb20gJy4vTW9kdWxlU3lzdGVtJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcblxuLyoqXG4gKiBAY2xhc3MgQXBwXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gcHJlcGFyZSBhIHdvcmxkIHNjZW5lLCBzZXR1cCBwaHlzaWNzLCBjYW1lcmEsIHJlbmRlcmVyIGFuZCBhbGwgb3RoZXIgdGhpbmdzIHRoYXQgeW91IHVzdWFsbHkgZG8gYmVmb3JlIG1ha2luZyBtZXNoZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbbW9kdWxlcz1bXV0gLSBBcnJheSBvZiBNb2R1bGVzXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogU2ltdWxhdGUgZmxhZ1xuICAgKiBAZGVzY3JpcHRpb24gU2FtZSBhcyAudXBkYXRlRW5hYmxlZCwgYnV0IGZvciBwaHlzaWNzLiBEZWZpbmVzIGlmIHBoeXNpY3MgaXMgc2ltdWxhdGVkIGVhY2ggZnJhbWUuXG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkFwcCNzaW11bGF0ZVxuICAgKiBAcHVibGljXG4gICAqL1xuICBzaW11bGF0ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lcyB3aGV0aGVyIHRoZSBzY2VuZSBzaG91bGQgcmVuZGVyIG9yIG5vdFxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjdXBkYXRlRW5hYmxlZFxuICAgKiBAcHVibGljXG4gICAqL1xuICB1cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgLyoqXG4gICAqIExvb3BzIGluIHRoaXMgYXBwXG4gICAqIEBkZXNjcmlwdGlvbiBBcnJheSBvZiBsb29wcyB0aGF0IGFyZSBleGVjdXRlZCBieSB0aGlzIGFwcC5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkFwcCNsb29wc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBsb29wcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMgPSBbXSkge1xuICAgIGNvbnNvbGUubG9nKGBXSFMuQXBwICR7dmVyc2lvbn1gKTtcblxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIodGhpcyk7XG4gICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcztcblxuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcygpO1xuICB9XG5cbiAgLy8gQ09OVFJPTFMgJiBVUERBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0YXJ0XG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydCByZW5kZXJpbmcgbG9vcCBhbmQgcGh5c2ljcyBzaW11bGF0aW9uIChpZiB5b3UgdXNlIHZlcnNpb24gd2l0aCBwaHlzaWNzKS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgcmVxdWVzdEFuaW1GcmFtZSA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gc3lzdGVtLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgc3lzdGVtLndpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3lzdGVtLndpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB7bG9vcHMsIHVwZGF0ZUVuYWJsZWR9ID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHByb2Nlc3MpO1xuICAgICAgaWYgKCF1cGRhdGVFbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsbCA9IGxvb3BzLmxlbmd0aDsgaSA8IGxsOyBpKyspIHtcbiAgICAgICAgY29uc3QgZSA9IGxvb3BzW2ldO1xuICAgICAgICBpZiAoZS5lbmFibGVkKSBlLmV4ZWN1dGUoZS5jbG9jayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyByZW5kZXJpbmcgbG9vcHNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnVwZGF0ZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZExvb3BcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgbG9vcCB0byB0aGlzIGFwcC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGxvb3AgLSB0aGUgbG9vcCB0byBhZGRcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkFkZGluZyBhIGxvb3AgdG8gYW4gYXBwPC9jYXB0aW9uPlxuICAgKiBjb25zdCBsb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgKiAgLy8gLi4uXG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4gICAqXG4gICAqIGFwcC5hZGRMb29wKGxvb3ApO1xuICAgKiBsb29wLnN0YXJ0KCk7XG4gICAqL1xuICBhZGRMb29wKGxvb3ApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmxvb3BzLnB1c2gobG9vcCk7XG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlTG9vcFxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBsb29wIGZyb20gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKi9cbiAgcmVtb3ZlTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvb3BzLmluZGV4T2YobG9vcCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLmxvb3BzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgIHJlc29sdmUobG9vcCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXQoa2V5KTtcbiAgfVxuXG4gIHVzZShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLnVzZShrZXkpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFwcFxufTtcbiIsImltcG9ydCB7Q2xvY2t9IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgTG9vcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBlYWNoIGFuaW1hdGlvbiBmcmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2xvY2s9dHJ1ZV0gcGFzc2VzIGEgQ2xvY2sgdG8gdGhlIGZ1bmN0aW9uIHdoZW4gY2FsbGVkLCBpZiB0cnVlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgTG9vcCB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMsIHVzZUNsb2NrID0gdHJ1ZSkge1xuICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgdGhpcy5jbG9jayA9IHVzZUNsb2NrID8gbmV3IENsb2NrKCkgOiBudWxsO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQ09OVFJPTFNcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0cyB0aGlzIGxvb3AsIGNsb2NrIGlmIGl0IGhhcyBvbmUuIFdvbid0IGRvIGFueXRoaW5nIGlmIGxvb3AgZW5hYmxlZCBhbHJlYWR5LlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gYWRkIHRoaXMgbG9vcCB0bywgaWYgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Mb29wXG4gICAqL1xuICBzdGFydCh3b3JsZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh3b3JsZCkgd29ybGQuYWRkTG9vcCh0aGlzKTtcblxuICAgIGlmICh0aGlzLmNsb2NrKSB0aGlzLmNsb2NrLnN0YXJ0KCk7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHN0b3BcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wcyB0aGlzIGxvb3AgYW5kIGl0cyBjbG9jayBpZiBpdCBoYXMgb25lLCB3b24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGxvb3AgaXMgbm90IGVuYWJsZWQpXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBbd29ybGRdIGFwcCB0byByZW1vdmUgdGhpcyBsb29wIGZyb20sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RvcCh3b3JsZCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdG9wKCk7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLnJlbW92ZUxvb3AodGhpcyk7XG4gIH1cblxuICAvLyBFWEVDVVRJT05cblxuICAvKipcbiAgICogQG1ldGhvZCBleGVjdXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKiBAcmV0dXJucyB7Kn0gd2hhdGV2ZXIgdGhlIGZ1bmN0aW9uIG9mIHRoaXMgbG9vcCByZXR1cm5zXG4gICAqL1xuICBleGVjdXRlKCkge1xuICAgIHJldHVybiB0aGlzLmZ1bmModGhpcy5jbG9jayk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTG9vcFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvcmUgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWVzaENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0xpZ2h0Q29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQ2FtZXJhQ29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXBwJztcbmV4cG9ydCAqIGZyb20gJy4vTG9vcCc7XG5leHBvcnQgKiBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuIiwiaW1wb3J0IHtBbWJpZW50TGlnaHQgYXMgQW1iaWVudExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQW1iaWVudExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBBbWJpZW50TGlnaHQgaXMgYSBzaW1wbGUgY2xhc3MsIGl0IGV4dGVuZHMgTGlnaHQgYW5kIGluaGVyaXRzIGFsbCBpdHMgbWV0aG9kcy5cbiAqIEFtYmllbnRMaWdodCBjcmVhdGVzIGJhc2ljIGxpZ2h0IGFyb3VuZCBhbGwgc2NlbmUsIHNvIGl0IGRvZXNuJ3QgbmVlZCBwcm9wZXJ0aWVzIGxpa2UgcG9zIG9yIHRhcmdldC5cbiAqIEl0IHN1cHBvcnRzIG9ubHkgY29sb3IgYW5kIGludGVuc2l0eSBhcyBwYXJhbWV0ZXJzLCB3aGljaCBkZWZpbmVzIHRoZSBjb2xvciBvZiB0aGUgc3Vycm91bmRlZCBsaWdodCBhbmQgaW50ZW5zaXR5IG9mIGxpZ2h0LlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIEFtYmllbnRMaWdodCA8L2NhcHRpb24+XG4gKiBuZXcgQW1iaWVudExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8od29ybGQpO1xuICovXG5jbGFzcyBBbWJpZW50TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQW1iaWVudExpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgQW1iaWVudExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBbWJpZW50TGlnaHRcbn07XG4iLCJpbXBvcnQge0RpcmVjdGlvbmFsTGlnaHQgYXMgRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSwgRGlyZWN0aW9uYWxMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERpcmVjdGlvbmFsTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIERpcmVjdGluYWxMaWdodCBjcmVhdGVzIGEgbGlnaHQgdGhhdCBzaGluZXMgZnJvbSBhIHNwZWNpZmljIGRpcmVjdGlvbiBub3QgZnJvbSBhIHNwZWNpZmljIHBvc2l0aW9uLjxici8+PGJyLz5cbiAqIFRoaXMgbGlnaHQgd2lsbCBiZWhhdmUgYXMgdGhvdWdoIGl0IGlzIGluZmluaXRlbHkgZmFyIGF3YXkgYW5kIHRoZSByYXlzIHByb2R1Y2VkIGZyb20gaXQgYXJlIGFsbCBwYXJhbGxlbC4gPGJyLz48YnIvPlxuICogVGhlIGJlc3QgYW5hbG9neSB3b3VsZCBiZSBhIGxpZ2h0IHNvdXJjZSB0aGF0IGFjdHMgbGlrZSB0aGUgc3VuOiB0aGUgc3VuIGlzIHNvIGZhciBhd2F5IHRoYXQgYWxsIHN1bmxpZ2h0IGhpdHRpbmcgb2JqZWN0cyBjb21lcyBmcm9tIHRoZSBzYW1lIGFuZ2xlLjxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBvcHRpb25zIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCBwYXJhbWF0ZXIsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0IHBhcmFtYXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBEaXJlY3Rpb25hbExpZ2h0IHRvIGZhbGwgZG93biBmcm9tIHZlYzMoMTAsIDIwLCAxMCkgdG8gdmVjMygwLCAwLCAwKTwvY2FwdGlvbj5cbiAqIG5ldyBEaXJlY3Rpb25hbExpZ2h0KHtcbiAqICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICBpbnRlbnNpdHk6IDAuMixcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMTAsIDIwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERpcmVjdGlvbmFsTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRGlyZWN0aW9uYWxMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IERpcmVjdGlvbmFsTGlnaHROYXRpdmUoXG4gICAgICBwYXJhbXMuY29sb3IsXG4gICAgICBwYXJhbXMuaW50ZW5zaXR5XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIERpcmVjdGlvbmFsTGlnaHRcbn07XG4iLCJpbXBvcnQge0hlbWlzcGhlcmVMaWdodCBhcyBIZW1pc3BoZXJlTGlnaHROYXRpdmUsIEhlbWlzcGhlcmVMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEhlbWlzcGhlcmVMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gSGVtaXNwaGVyZUxpZ2h0IGlzIGEgbGlnaHQgc291cmNlIHBvc2l0aW9uZWQgZGlyZWN0bHkgYWJvdmUgdGhlIHNjZW5lLjxici8+XG4gKiBJdCBhbHNvIGRvZXNuJ3QgbmVlZCBwb3NpdGlvbiBhbmQgdGFyZ2V0IHByb3BlcnRpZXMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfbGlnaHRzX2hlbWlzcGhlcmUuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7c2t5Q29sb3I6IDB4ZmZmZmZmLCBncm91bmRDb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBIZW1pc3BoZXJlTGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgSGVtaXNwaGVyZUxpZ2h0KHtcbiAqICAgc2t5Q29sb3I6IDB4ZmYwMDAwLFxuICogICBncm91bmRDb2xvcjogMHgwMDAwZmYsXG4gKiAgIGludGVuc2l0eTogMC4yXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBIZW1pc3BoZXJlTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHNreUNvbG9yOiAweGZmZmZmZixcbiAgICBncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSGVtaXNwaGVyZUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLnNreUNvbG9yLFxuICAgICAgcGFyYW1zLmdyb3VuZENvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBIZW1pc3BoZXJlTGlnaHRcbn07XG4iLCJpbXBvcnQge1BvaW50TGlnaHQgYXMgUG9pbnRMaWdodE5hdGl2ZSwgUG9pbnRMaWdodEhlbHBlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBvaW50TGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIFBvaW50TGlnaHQgY3JlYXRlcyBhIGxpZ2h0IGF0IGEgc3BlY2lmaWMgcG9zaXRpb24gaW4gdGhlIHNjZW5lLiBUaGUgbGlnaHQgc2hpbmVzIGluIGFsbCBkaXJlY3Rpb25zIChyb3VnaGx5IHNpbWlsYXIgdG8gYSBsaWdodCBidWxiLik8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3NpdGlvbiwgZGlzdGFuY2UgYW5kIGRlY2F5Ljxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bGlnaHQ6IHtjb2xvcjogMHhmZmZmZmYsIGludGVuc2l0eTogMSwgZGlzdGFuY2U6IDEwMCwgZGVjYXk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgUG9pbnRMaWdodDwvY2FwdGlvbj5cbiAqIG5ldyBQb2ludExpZ2h0KCB7XG4gKiAgIGNvbG9yOiAweGZmMDAwMCxcbiAqICAgaW50ZW5zaXR5OiAyLFxuICogICBkaXN0YW5jZTogMzAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2ludExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHM9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBkZWNheTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBvaW50TGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBQb2ludExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQb2ludExpZ2h0XG59O1xuIiwiaW1wb3J0IHtTcG90TGlnaHQgYXMgU3BvdExpZ2h0TmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0xpZ2h0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0xpZ2h0Q29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BvdExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBTcG90TGlnaHQgY3JlYXRlcyBzcG90IGxpZ2h0IHRoYXQgY2FuIGNhc3Qgc2hhZG93IGluIG9uZSBkaXJlY3Rpb24uIDxici8+PGJyLz5cbiAqIEl0IGhhcyB0aGUgc2FtZSBwYXJhbWV0ZXJzIGFzIEFtYmllbnRMaWdodCBpbiBsaWdodCwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zIGFuZCB0YXJnZXQuIDxici8+PGJyLz5cbiAqIFNwb3RMaWdodCBhZmZlY3RzIG1lc2hlcyB3aXRoIGxhbWJlcnQgYW5kIHBob25nIG1hdGVyaWFsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19zcG90bGlnaHQuaHRtbFwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGFuZ2xlOiBNYXRoLlBJIC8gMywgZXhwb25lbnQ6IDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwb3RMaWdodCB0aGF0IGZhbGxzIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgU3BvdExpZ2h0KHtcbiAqICAgY29sb3I6IDB4MDBmZjAwLFxuICogICBpbnRlbnNpdHk6IDMsXG4gKiAgIGRpc3RhbmNlOiAxMDAwXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBTcG90TGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBhbmdsZTogTWF0aC5QSSAvIDMsXG4gICAgZXhwb25lbnQ6IDAsXG4gICAgZGVjYXk6IDFcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU3BvdExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgU3BvdExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy5kaXN0YW5jZSxcbiAgICAgIHBhcmFtcy5hbmdsZSxcbiAgICAgIHBhcmFtcy5leHBvbmVudCxcbiAgICAgIHBhcmFtcy5kZWNheVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcG90TGlnaHRcbn07XG4iLCJpbXBvcnQge1JlY3RBcmVhTGlnaHQgYXMgUmVjdEFyZWFMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbmNsYXNzIEFyZWFMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkxpZ2h0Q29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMSxcbiAgICB3aWR0aDogMTAsXG4gICAgaGVpZ2h0OiAxMFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBBcmVhTGlnaHQuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBSZWN0QXJlYUxpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eSxcbiAgICAgIHBhcmFtcy53aWR0aCxcbiAgICAgIHBhcmFtcy5oZWlnaHRcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQXJlYUxpZ2h0XG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9saWdodHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQW1iaWVudExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vRGlyZWN0aW9uYWxMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0hlbWlzcGhlcmVMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL1BvaW50TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9TcG90TGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9BcmVhTGlnaHQnO1xuIiwiaW1wb3J0IHtDdWJlQ2FtZXJhIGFzIEN1YmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN1YmVDYW1lcmFcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIDYgY2FtZXJhcyB0aGF0IHJlbmRlciB0byBhIFdlYkdMUmVuZGVyVGFyZ2V0Q3ViZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlcyBhIEN1YmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgQ3ViZUNhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGN1YmVSZXNvbHV0aW9uOiAyNTZcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KTtcbiAqXG4gKiBhcHAuY2FtZXJhID0gY2FtZXJhO1xuICovXG5jbGFzcyBDdWJlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLkN1YmVDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgY2FtZXJhOiB7XG4gICAqICAgICBuZWFyOiAxLFxuICAgKiAgICAgZmFyOiAxMDAwLFxuICAgKiAgICAgY3ViZVJlc29sdXRpb246IDEyOFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ3ViZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBDdWJlQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyLFxuICAgICAgcGFyYW1zLmN1YmVSZXNvbHV0aW9uXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDdWJlQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtPcnRob2dyYXBoaWNDYW1lcmEgYXMgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uLy4uL3BvbHlmaWxsJztcblxuLyoqXG4gKiBAY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggb3J0aG9ncmFwaGljIHByb2plY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gT3J0aG9ncmFwaGljQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYSh7XG4gKiAgIGNhbWVyYToge1xuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogNTBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5PcnRob2dyYXBoaWNDYW1lcmEjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgbmVhcjogMSxcbiAgICogICBmYXI6IDEwMDAsXG4gICAqICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAqICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAqICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICogICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgbGVmdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gLTIsXG4gICAgcmlnaHQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgdG9wOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICBib3R0b206IHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHQgLyAtMlxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBPcnRob2dyYXBoaWNDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlKFxuICAgICAgcGFyYW1zLmxlZnQsXG4gICAgICBwYXJhbXMucmlnaHQsXG4gICAgICBwYXJhbXMudG9wLFxuICAgICAgcGFyYW1zLmJvdHRvbSxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgT3J0aG9ncmFwaGljQ2FtZXJhXG59O1xuIiwiaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYSBhcyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhXG4gKiBAZGVzY3JpcHRpb24gQ2FtZXJhIHdpdGggcGVyc3BlY3RpdmUgcHJvamVjdGlvbi5cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbiBQZXJzcGVjdGl2ZUNhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSh7XG4gKiAgIGZvdjogNzUsXG4gKiAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmEgZXh0ZW5kcyBDYW1lcmFDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzLlBlcnNwZWN0aXZlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGZvdjogNzUsXG4gICAqICAgYXNwZWN0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBmb3Y6IDc1LFxuICAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQZXJzcGVjdGl2ZUNhbWVyYS5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtjYW1lcmE6IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5mb3YsXG4gICAgICBwYXJhbXMuYXNwZWN0LFxuICAgICAgcGFyYW1zLm5lYXIsXG4gICAgICBwYXJhbXMuZmFyXG4gICAgKX0pLmNhbWVyYTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQZXJzcGVjdGl2ZUNhbWVyYVxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvY2FtZXJhcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9DdWJlQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vT3J0aG9ncmFwaGljQ2FtZXJhJztcbmV4cG9ydCAqIGZyb20gJy4vUGVyc3BlY3RpdmVDYW1lcmEnO1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQm94QnVmZmVyR2VvbWV0cnksXG4gIEJveEdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBCb3hcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEFzIHRvbGQgb24gQ29tcG9uZW50IGRlZmluaXRpb24sIHdoaWxlIHlvdSBjYW4gcGFzcyBhbnkgb2YgdGhlIGluaGVyaXRlZCBwYXJhbXMgZm9yIHRoaXMgY29tcG9uZW50IGNvbnN0cnVjdGlvbiwgeW91IHdpbGwgbmVlZCB0b1xuICogcGFzcyBzcGVjaWZpYyBwYXJhbWV0ZXJzIHRvIGJ1aWxkIHRoaXMgbWVzaCBhcyBhIGdlb21ldHJ5IG9iamVjdC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjQm94R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEJveCwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiAgbmV3IEJveCh7XG4gKiAgICBnZW9tZXRyeToge1xuICogICAgICB3aWR0aDogMixcbiAqICAgICAgaGVpZ2h0OiAyLFxuICogICAgICBkZXB0aDogMlxuICogICAgfSxcbiAqXG4gKiAgICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgICB9KSxcbiAqXG4gKiAgICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBCb3ggZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB3aWR0aDogMSxcbiAgICogICAgIGhlaWdodDogMSxcbiAgICogICAgIGRlcHRoOiAxLFxuICAgKiAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgZGVwdGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgZGVwdGg6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiAxLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBkZXB0aFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ2RlcHRoJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnLCAnZGVwdGhTZWdlbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBCb3guZGVmYXVsdHMsIEJveC5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Cb3hcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEJveEJ1ZmZlckdlb21ldHJ5IDogQm94R2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRlcHRoU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEJveFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENpcmNsZUJ1ZmZlckdlb21ldHJ5LFxuICBDaXJjbGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ2lyY2xlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NpcmNsZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDaXJjbGUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBDaXJjbGUoe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgcmFkaXVzOiA0LFxuICogICAgICBzZWdtZW50czogMTZcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQ2lyY2xlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiA1MCxcbiAgICogICAgIHNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiA1MCxcbiAgICAgIHNlZ21lbnRzOiA4LFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdzZWdtZW50cycsICd0aGV0YVN0YXJ0JywgJ3RoZXRhTGVuZ3RoJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ2lyY2xlLmRlZmF1bHRzLCBDaXJjbGUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ2lyY2xlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDaXJjbGVCdWZmZXJHZW9tZXRyeSA6IENpcmNsZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ2lyY2xlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ29uZUJ1ZmZlckdlb21ldHJ5LFxuICBDb25lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENvbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0NvbmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ29uZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ29uZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENvbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICAgICdvcGVuRW5kZWQnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQ29uZS5kZWZhdWx0cywgQ29uZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ29uZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ29uZUJ1ZmZlckdlb21ldHJ5IDogQ29uZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm9wZW5FbmRlZCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDb25lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQ3lsaW5kZXJCdWZmZXJHZW9tZXRyeSxcbiAgQ3lsaW5kZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQ3lsaW5kZXJcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgY3lsaW5kZXIgaXMgb25lIG9mIHRoZSBtb3N0IGJhc2ljIGN1cnZpbGluZWFyIGdlb21ldHJpYyBzaGFwZXMsIHRoZSBzdXJmYWNlIGZvcm1lZCBieSB0aGUgcG9pbnRzIGF0IGEgZml4ZWQgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0cmFpZ2h0IGxpbmUsIHRoZSBheGlzIG9mIHRoZSBjeWxpbmRlci4gPGJyLz48YnIvPlxuICogVGhlIHNvbGlkIGVuY2xvc2VkIGJ5IHRoaXMgc3VyZmFjZSBhbmQgYnkgdHdvIHBsYW5lcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIGlzIGFsc28gY2FsbGVkIGEgY3lsaW5kZXIuPGJyLz5cbiAqIFRoZSBzdXJmYWNlIGFyZWEgYW5kIHRoZSB2b2x1bWUgb2YgYSBjeWxpbmRlciBoYXZlIGJlZW4ga25vd24gc2luY2UgZGVlcCBhbnRpcXVpdHkuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0N5bGluZGVyR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEN5bGluZGVyLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBDeWxpbmRlcih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzVG9wOiAyLFxuICogICAgIHJhZGl1c0JvdHRvbTogNCxcbiAqICAgICBoZWlnaHQ6IDVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEN5bGluZGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXNUb3A6IDIwLFxuICAgKiAgICAgcmFkaXVzQm90dG9tOiAyMCxcbiAgICogICAgIGhlaWdodDogMTAwLFxuICAgKiAgICAgcmFkaXVzU2VnbWVudHM6IDMyLFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDEsXG4gICAqICAgICBvcGVuRW5kZWQ6IGZhbHNlLFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1c1RvcDogMCxcbiAgICAgIHJhZGl1c0JvdHRvbTogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeTogW1xuICAgKiAgICdyYWRpdXNUb3AnLFxuICAgKiAgICdyYWRpdXNCb3R0b20nLFxuICAgKiAgICdoZWlnaHQnLFxuICAgKiAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgJ2hlaWdodFNlZ21lbnRzJyxcbiAgICogICAnb3BlbkVuZGVkJyxcbiAgICogICAndGhldGFTdGFydCcsXG4gICAqICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiBdXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1c1RvcCcsXG4gICAgICAncmFkaXVzQm90dG9tJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN5bGluZGVyLmRlZmF1bHRzLCBDeWxpbmRlci5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXJcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IEN5bGluZGVyQnVmZmVyR2VvbWV0cnkgOiBDeWxpbmRlckdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNUb3AsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzQm90dG9tLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3lsaW5kZXJcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgRG9kZWNhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIERvZGVjYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgZG9kZWNhaGVkcm9uIGlzIGFueSBwb2x5aGVkcm9uIHdpdGggdHdlbHZlIGZsYXQgZmFjZXMuIDxici8+PGJyLz5cbiAqIFRoZSBtb3N0IGZhbWlsaWFyIGRvZGVjYWhlZHJvbiBpcyB0aGUgcmVndWxhciBkb2RlY2FoZWRyb24sIHdoaWNoIGlzIGEgUGxhdG9uaWMgc29saWQuIDxici8+XG4gKiBUaGVyZSBhcmUgYWxzbyB0aHJlZSByZWd1bGFyIHN0YXIgZG9kZWNhaGVkcmEsIHdoaWNoIGFyZSBjb25zdHJ1Y3RlZCBhcyBzdGVsbGF0aW9ucyBvZiB0aGUgY29udmV4IGZvcm0uIDxici8+XG4gKiBBbGwgb2YgdGhlc2UgaGF2ZSBpY29zYWhlZHJhbCBzeW1tZXRyeSwgb3JkZXIgMTIwLlxuICogRG9kZWNhaGVkcm9uIGNyZWF0ZXMgRG9kZWNhaGVkcm9uIG9iamVjdCBieSBpdCdzIHJhZGl1cyBhbmQgZGV0YWlsLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNEb2RlY2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRG9kZWNhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBEb2RlY2FoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAxMFxuICogICB9XG4gICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRG9kZWNhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiBnZW9tZXRyeToge1xuICAgKiAgIHJhZGl1czogMSxcbiAgICogICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRG9kZWNhaGVkcm9uLmRlZmF1bHRzLCBEb2RlY2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkRvZGVjYWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBEb2RlY2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IERvZGVjYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEb2RlY2FoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBCdWZmZXJHZW9tZXRyeSxcbiAgRXh0cnVkZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBFeHRydWRlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBFeHRydWRlIGdlb21ldHJ5IG1lYW5zIHRoYXQgeW91IGNhbiBjcmVhdGUgYSAzRCBtZXNoIGZyb20gYW55IDJEIHNoYXBlIHVzaW5nIHRocmVlLmpzIGdlb21ldHJ5IGJhc2VkIG9uIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL21hdGgvVmVjdG9yMic+VEhSRUUuVmVjdG9yMi48L2E+IDxici8+XG4gKiBTdWNoIGltcGxlbWVudGF0aW9uIHdpbGwgaGVscCB5b3UgdG8gbWFrZSB2b2x1bWVkIHNoYXBlcyB0aGF0IGhhdmUgdGhlaXIgb3duIGRlcHRoIGFuZCBjYW4gYmUgc2VlbiBmcm9tIGFsbCBhbmdlbHMuPGJyLz48YnIvPlxuICogWW91IGNhbiBhbHNvIGZpbmQgc29tZSBpbnRlcmVzdGluZyBleGFtcGxlcyBtYWRlIHVzaW5nIDxhIGhyZWY9J3RocmVlanMub3JnJz50aHJlZS5qczwvYT4gd2hpY2ggaXMgYSBjb3JlIG9mIHdocy5qcywgc3VjaCBhczpcbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc2hhcGVzLmh0bWwnPldlYmdsIGdlb21ldHJ5IGV4dHJ1ZGU8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlczIuaHRtbCc+RXh0cnVkZSBzaGFwZXMgZnJvbSBnZW9kYXRhPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zcGxpbmVzLmh0bWwnPkV4dHJ1ZGUgc3BsaW5lczwvYT5cbiAqXG4gKiBTdWNoIGV4YW1wbGVzIGNhbiBiZSBlYXNpbHkgaW1wbGVtZW50ZWQgdXNpbmcgd2hpdGVzdG9ybS5qcyBvciBpdCdzIHBsdWdpbnMuIFVzZSBgRXh0cnVkZWAgY2xhc3Mgd2l0aCA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9leHRyYXMvY29yZS9TaGFwZSc+VEhSRUUuU2hhcGU8L2E+IHRvIGdldCBleHRydWRlIGVmZmVjdCBvZiBzaGFwZSBkZWZpbmVkIGJ5IDJEIHZlY3RvcnMuXG4gKiBUaGlzIGNsYXNzIGlzIHNpbWlsYXIgdG8gPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZ2VvbWV0cmllcy9FeHRydWRlR2VvbWV0cnknPlRIUkVFLkV4dHJ1ZGVHZW9tZXRyeTwvYT4sXG4gKiBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgcHJvcGVydGllcywgYXBwbGllZCBieSBgU2hhcGVgLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNFeHRydWRlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIHNoYXBlLCB0aGVuIGFuIEV4dHJ1ZGUgZnJvbSBpdDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKFtcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigtMiwwKSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsMiksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsNCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKDQsLTQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLC0yKVxuICogXSk7XG4gKlxuICogY29uc3QgZXh0cnVkZSA9IG5ldyBFeHRydWRlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZXM6IHNoYXBlLFxuICogICAgIG9wdGlvbnM6IHtcbiAqICAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gKiAgICAgICBiZXZlbFNpemU6IDAsXG4gKiAgICAgICBhbW91bnQ6IDJcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pO1xuICpcbiAqIGV4dHJ1ZGUuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgRXh0cnVkZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXSxcbiAgICogICAgIG9wdGlvbnM6IHt9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW10sXG4gICAgICBvcHRpb25zOiB7fVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJywgJ29wdGlvbnMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBFeHRydWRlLmRlZmF1bHRzLCBFeHRydWRlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRXh0cnVkZUdlb21ldHJ5KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNoYXBlcyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcHRpb25zXG4gICAgKTtcblxuICAgIHJldHVybiBwYXJhbXMuYnVmZmVyID8gbmV3IEJ1ZmZlckdlb21ldHJ5KCkuZnJvbUdlb21ldHJ5KGdlb21ldHJ5KSA6IGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEV4dHJ1ZGVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBJY29zYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBJY29zYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGFuIGljb3NhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiB3aXRoIDIwIGZhY2VzLjxici8+XG4gKiBUaGVyZSBhcmUgbWFueSBraW5kcyBvZiBpY29zYWhlZHJhLCB3aXRoIHNvbWUgYmVpbmcgbW9yZSBzeW1tZXRyaWNhbCB0aGFuIG90aGVycy4gVGhlIG1vc3Qgd2VsbCBrbm93biBpcyB0aGUgUGxhdG9uaWMsIGNvbnZleCByZWd1bGFyIGljb3NhaGVkcm9uLjxici8+XG4gKiBgSWNvc2FoZWRyb25gIGNyZWF0ZXMgYW4gSWNvc2FoZWRyb24gb2JqZWN0IGJ5IGl0cyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjSWNvc2FoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSWNvc2FoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IEljb3NhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEljb3NhaGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JY29zYWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge2dlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXX1cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEljb3NhaGVkcm9uLmRlZmF1bHRzLCBJY29zYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSA6IEljb3NhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEljb3NhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGF0aGVCdWZmZXJHZW9tZXRyeSxcbiAgTGF0aGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgTGF0aGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEEgYExhdGhlR2VvbWV0cnlgIGFsbG93cyB5b3UgdG8gY3JlYXRlIHNoYXBlcyBmcm9tIGEgc21vb3RoIGN1cnZlLlxuICogVGhpcyBjdXJ2ZSBpcyBkZWZpbmVkIGJ5IGEgbnVtYmVyIG9mIHBvaW50cyAoYWxzbyBjYWxsZWQga25vdHMpIGFuZCBpcyBtb3N0IG9mdGVuIGNhbGxlZCBhIHNwbGluZS4gVGhpcyBzcGxpbmUgaXMgcm90YXRlZCBhcm91bmQgYSBmaXhlZCBwb2ludCBhbmQgcmVzdWx0cyBpbiB2YXNlLSBhbmQgYmVsbC1saWtlIHNoYXBlcy48YnIvPjxici8+XG4gKiBJbiAzRCBjb21wdXRlciBncmFwaGljcywgYSBsYXRoZWQgb2JqZWN0IGlzIGEgM0QgbW9kZWwgd2hvc2UgdmVydGV4IGdlb21ldHJ5IGlzIHByb2R1Y2VkIGJ5IHJvdGF0aW5nIHRoZSBwb2ludHMgb2YgYSBzcGxpbmUgb3Igb3RoZXIgcG9pbnQgc2V0IGFyb3VuZCBhIGZpeGVkIGF4aXMuXG4gKiBUaGUgbGF0aGluZyBtYXkgYmUgcGFydGlhbDsgdGhlIGFtb3VudCBvZiByb3RhdGlvbiBpcyBub3QgbmVjZXNzYXJpbHkgYSBmdWxsIDM2MCBkZWdyZWVzLlxuICogVGhlIHBvaW50IHNldCBwcm92aWRpbmcgdGhlIGluaXRpYWwgc291cmNlIGRhdGEgY2FuIGJlIHRob3VnaHQgb2YgYXMgYSBjcm9zcyBzZWN0aW9uIHRocm91Z2ggdGhlIG9iamVjdCBhbG9uZyBhIHBsYW5lIGNvbnRhaW5pbmcgaXRzIGF4aXMgb2YgcmFkaWFsIHN5bW1ldHJ5LiA8YnIvPjxici8+XG4gKiBUaGUgPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5Jz5mb2xsb3dpbmcgZXhhbXBsZTwvYT4gc2hvd3MgYSBnZW9tZXRyeSB3aGljaCBjYW4gYmUgZ2VuZXJhdGVkIHVzaW5nIGBMYXRoZWAgY2xhc3MuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0xhdGhlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExhdGgsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcG9pbnRzID0gW107XG4gKlxuICogZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gKiAgIHBvaW50cy5wdXNoKFxuICogICAgIG5ldyBUSFJFRS5WZWN0b3IyKFxuICogICAgICAgKE1hdGguc2luKGkgKiAwLjcpICogMTUgKyA1MCkgLyAxMCxcbiAqICAgICAgIChpIC0gNSkgKiAwLjJcbiAqICAgICApXG4gKiAgICk7XG4gKiB9XG4gKlxuICogY29uc3QgbGF0aGUgPSBuZXcgTGF0aGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBvaW50czogcG9pbnRzXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDUwLCAxMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIExhdGhlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcG9pbnRzOiBbXVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwb2ludHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT57XG4gICAqICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncG9pbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgTGF0aGUuZGVmYXVsdHMsIExhdGhlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MYXRoZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBMYXRoZUJ1ZmZlckdlb21ldHJ5IDogTGF0aGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucG9pbnRzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMYXRoZVxufTtcbiIsImltcG9ydCB7XG4gIExpbmUgYXMgTGluZU5hdGl2ZSxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEdlb21ldHJ5LFxuICBCdWZmZXJBdHRyaWJ1dGUsXG4gIExpbmVDdXJ2ZTMsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExpbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIExpbmUgY29tcG9uZW50IGlzIGdlbmVyYXRlZCBmcm9tIGEgY3VydmUvbGluZSBhbmQgYW1vdW50IG9mIHZlY3RvcnMgdGhhdCBzaG91bGQgYmUgdXNlZCAocG9pbnRzKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIExpbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IExpbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGN1cnZlOiBuZXcgVEhSRUUuTGluZUN1cnZlMyhuZXcgVEhSRUUuVmVjdG9yMygxMCwgMTAsIDApLCBuZXcgVEhSRUUuVmVjdG9yMygxMCwgMzAsIDApKVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMaW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGN1cnZlOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMTAsIDAsIDApKSxcbiAgICogICBwb2ludHM6IDUwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGN1cnZlOiBudWxsLFxuICAgIHBvaW50czogNTBcbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT57XG4gICAqICAgZ2VvbWV0cnk6IFsnY3VydmUnLCAncG9pbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnY3VydmUnLCAncG9pbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMsIExpbmUuZGVmYXVsdHMsIExpbmUuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBMaW5lTmF0aXZlKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gcGFyYW1zLmJ1ZmZlciA/IG5ldyBCdWZmZXJHZW9tZXRyeSgpIDogbmV3IEdlb21ldHJ5KCk7XG5cbiAgICBpZiAocGFyYW1zLmJ1ZmZlcikge1xuICAgICAgY29uc3QgcHAgPSBwYXJhbXMuY3VydmUuZ2V0UG9pbnRzKHBhcmFtcy5wb2ludHMpO1xuICAgICAgY29uc3QgdmVydHMgPSBuZXcgRmxvYXQzMkFycmF5KHBwLmxlbmd0aCAqIDMpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gcHAubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgICAgY29uc3QgaTMgPSBpICogMztcblxuICAgICAgICB2ZXJ0c1tpM10gPSBwcFtpXS54O1xuICAgICAgICB2ZXJ0c1tpMyArIDFdID0gcHBbaV0ueTtcbiAgICAgICAgdmVydHNbaTMgKyAyXSA9IHBwW2ldLno7XG4gICAgICB9XG5cbiAgICAgIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgQnVmZmVyQXR0cmlidXRlKHZlcnRzLCAzKSk7XG4gICAgfSBlbHNlIGdlb21ldHJ5LnZlcnRpY2VzID0gcGFyYW1zLmN1cnZlLmdldFBvaW50cyhwYXJhbXMucG9pbnRzKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMaW5lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgSlNPTkxvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSW1wb3J0ZXJcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEltcG9ydGVyIGlzIGEgbG9hZGVyIGZvciBtZXNoZXMgYW5kIGFueSBvdGhlciBkYXRhIHRvIHlvdXIgc2NlbmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEltcG9ydGVyLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBJbXBvcnRlcih7XG4gKiAgIGxvYWRlcjogbmV3IFRIUkVFLk9CSkxvYWRlcigpLFxuICpcbiAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbCkgeyAvLyBkYXRhIGZyb20gbG9hZGVyXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7IC8vIHNob3VsZCByZXR1cm4geW91ciAubmF0aXZlIChtZXNoIGluIHRoaXMgY2FzZSlcbiAqICAgfSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSW1wb3J0ZXIgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSW1wb3J0ZXIjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgdXJsOiAnJyxcbiAgICogICBsb2FkZXI6IG5ldyBKU09OTG9hZGVyKCksXG4gICAqXG4gICAqICAgb25Mb2FkKCkge30sXG4gICAqICAgb25Qcm9ncmVzcygpIHt9LFxuICAgKiAgIG9uRXJyb3IoKSB7fSxcbiAgICpcbiAgICogICB0ZXh0dXJlUGF0aDogbnVsbCxcbiAgICogICB1c2VDdXN0b21NYXRlcmlhbDogZmFsc2UsXG4gICAqXG4gICAqICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAgICogICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgdXJsOiAnJyxcbiAgICBsb2FkZXI6IG5ldyBKU09OTG9hZGVyKCksXG5cbiAgICBvbkxvYWQoKSB7fSxcbiAgICBvblByb2dyZXNzKCkge30sXG4gICAgb25FcnJvcigpIHt9LFxuXG4gICAgdGV4dHVyZVBhdGg6IG51bGwsXG4gICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IGZhbHNlLFxuXG4gICAgcGFyc2VyKGdlb21ldHJ5LCBtYXRlcmlhbHMpIHtcbiAgICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICB9XG4gIH07XG5cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9uc1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpbHRlclxuICAgKiBAZGVzY3JpcHRpb24gRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge1RIUkVFLk1lc2h9IG9iamVjdCBJbnN0YW5jZSBmb3IgaXRlcmF0aW5nIHRocm91Z2ggaXQncyBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZmlsdGVyIEZ1bmN0aW9uIHdpdGggY2hpbGQgYXMgYXJndW1lbnQsIHNob3VsZCByZXR1cm4gYSBib29sZWFuIHdoZXRoZXIgaW5jbHVkZSB0aGUgY2hpbGQgb3Igbm90LlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBvYmplY3Qgd2l0aCBjaGlsZHJlblxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlJlbW92aW5nIHVubmVjZXNzYXJ5IGxpZ2h0cyBmcm9tIGNoaWxkcmVuPC9jYXB0aW9uPlxuICAgKiBuZXcgSWNvc2FoZWRyb24oe1xuICAgKiAgIGxvYWRlcjogbmV3IFRIUkVFLk9CSkxvYWRlcigpLFxuICAgKlxuICAgKiAgIHBhcnNlKGdyb3VwKSB7IC8vIGRhdGEgZnJvbSBsb2FkZXJcbiAgICogICAgIHJldHVybiBJbXBvcnRlci5maWx0ZXIoZ3JvdXAsIGNoaWxkID0+ICFjaGlsZC5pc0xpZ2h0KTsgLy8gcmVtb3ZlIGxpZ2h0c1xuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gICAqIH0pLmFkZFRvKGFwcCk7XG4gICAqL1xuICBzdGF0aWMgZmlsdGVyKG9iamVjdCwgZmlsdGVyKSB7XG4gICAgY29uc3QgcHJvY2Vzc0ZpbHRlciA9IG9iamVjdCA9PiB7XG4gICAgICBvYmplY3QuY2hpbGRyZW4uZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChlbC5jaGlsZHJlbikgcHJvY2Vzc0ZpbHRlcihlbCk7XG4gICAgICAgIGlmICghZmlsdGVyKGVsKSkgb2JqZWN0LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb2Nlc3NGaWx0ZXIob2JqZWN0KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBJbXBvcnRlci5kZWZhdWx0cywgSW1wb3J0ZXIuaW5zdHJ1Y3Rpb25zLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChwYXJhbXMudGV4dHVyZVBhdGgpIHBhcmFtcy5sYW9kZXIuc2V0VGV4dHVyZVBhdGgocGFyYW1zLnRleHR1cmVQYXRoKTtcblxuICAgICAgcGFyYW1zLmxvYWRlci5sb2FkKHBhcmFtcy51cmwsICguLi5kYXRhKSA9PiB7IC8vIGdlb21ldHJ5LCBtYXRlcmlhbHNcbiAgICAgICAgcGFyYW1zLm9uTG9hZCguLi5kYXRhKTtcblxuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBwYXJhbXMucGFyc2VyKC4uLmRhdGEpfSkubWVzaDtcblxuICAgICAgICBjb25zdCB7Z2VvbWV0cnk6IGdlb20sIG1hdGVyaWFsOiBtYXR9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG9iamVjdC5nZW9tZXRyeSxcbiAgICAgICAgICBtYXRlcmlhbDogcGFyYW1zLnVzZUN1c3RvbU1hdGVyaWFsID8gcGFyYW1zLm1hdGVyaWFsIDogb2JqZWN0Lm1hdGVyaWFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChvYmplY3QuZ2VvbWV0cnkpIG9iamVjdC5nZW9tZXRyeSA9IGdlb207XG4gICAgICAgIGlmIChvYmplY3QubWF0ZXJpYWwpIG9iamVjdC5tYXRlcmlhbCA9IG1hdDtcblxuICAgICAgICByZXNvbHZlKG9iamVjdCk7XG4gICAgICB9LCBwYXJhbXMub25Qcm9ncmVzcywgcGFyYW1zLm9uRXJyb3IpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEltcG9ydGVyXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgT2N0YWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBPY3RhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIE9jdGFoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhbiBvY3RhaGVkcm9uIGlzIGEgcG9seWhlZHJvbiB3aXRoIGVpZ2h0IGZhY2VzLlxuICogQSByZWd1bGFyIG9jdGFoZWRyb24gaXMgYSBQbGF0b25pYyBzb2xpZCBjb21wb3NlZCBvZiBlaWdodCBlcXVpbGF0ZXJhbCB0cmlhbmdsZXMsIGZvdXIgb2Ygd2hpY2ggbWVldCBhdCBlYWNoIHZlcnRleC5cbiAqIDxici8+PGJyLz5cbiAqIGBPY3RhaGVkcm9uYCBjcmVhdGVzIGFuIE9jdGFoZWRyb24gb2JqZWN0IGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGAuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI09jdGFoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIE9jdGFoZWRyb24sIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IE9jdGFoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgT2N0YWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuT2N0YWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxLFxuICAgKiAgICAgZGV0YWlsOiAwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBPY3RhaGVkcm9uLmRlZmF1bHRzLCBPY3RhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5PY3RhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IE9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSA6IE9jdGFoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgT2N0YWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBhcmFtZXRyaWNCdWZmZXJHZW9tZXRyeSxcbiAgUGFyYW1ldHJpY0dlb21ldHJ5LFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQYXJhbWV0cmljXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBgUGFyYW1ldHJpY2AgZ2VuZXJhdGVzIGEgZ2VvbWV0cnkgcmVwcmVzZW50aW5nIGEgPGEgaHJlZj0naHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUGFyYW1ldHJpY19zdXJmYWNlJz5QYXJhbWV0cmljIHN1cmZhY2U8L2E+XG4gKiA8YnIvPjxici8+XG4gKiBJdCBpcyB1c3VhbGx5IHVzZWQgdG8gZGV2ZWxvcCBkaWZmZXJlbnQga2luZHMgb2YgaGlnaGZpZWxkcyBvciB2aXN1YWxpemUgYSA8YSBocmVmPSdodHRwczovL3N0ZW1rb3NraS5naXRodWIuaW8vVGhyZWUuanMvR3JhcGh1bHVzLUZ1bmN0aW9uLmh0bWwnPm1hdGggZnVuY3Rpb248L2E+LlxuICogPGJyLz5cbiAqIC0gPGEgaHJlZj0naHR0cDovL21hdGguaHdzLmVkdS9ncmFwaGljc2Jvb2svc291cmNlL3RocmVlanMvY3VydmVzLWFuZC1zdXJmYWNlcy5odG1sJz5QYXJhbWV0cmljIHN1cmZhY2U8L2E+XG4gKiAtIDxhIGhyZWY9J2h0dHBzOi8vc3RlbWtvc2tpLmdpdGh1Yi5pby9UaHJlZS5qcy9HcmFwaHVsdXMtU3VyZmFjZS5odG1sJz5cIkdyYXBodWx1c1wiPC9hPlxuICogPGJyLz48YnIvPlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNQYXJhbWV0cmljR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FeGFtcGxlIGNyZWF0aW5nIGFuIGhlaWdodGZpZWxkLWxpa2UgZ2VvbWV0cnkuIGB1YCBhbmQgYHZgIGFyZSBsaWtlIGB4YCBhbmQgYHlgIGluIHNoYXBlLCBidXQgdGhlaXIgdmFsdWVzIGFyZSBhbHdheXMgZnJvbSBgMGAgdG8gYDFgLlxuICogV2UgdXNlIHRoZW0gaW4gYFRIUkVFLlZlY3RvcjNgIGxpa2UgYHhgIGFuZCBgemAgYW5kIGBNYXRoLnJhbmRvbSgpICogNWAgZm9yIGB5YC48L2NhcHRpb24+XG4gKiBjb25zdCBjcmVhdGVQYXJhbWV0cmljID0gKHUsIHYpID0+IHtcbiAqICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHUgKiAzMCwgTWF0aC5yYW5kb20oKSAqIDUsIHYgKiAzMCk7XG4gKiB9XG4gKlxuICogbmV3IFBhcmFtZXRyaWMoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGZ1bmM6IGNyZWF0ZVBhcmFtZXRyaWNcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGVcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgLTEwMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBhcmFtZXRyaWMgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBhcmFtZXRyaWMjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGZ1bmM6ICh1LCB2KSA9PiBuZXcgVmVjdG9yMyh1LCB2LCAwKSxcbiAgICogICAgIHNsaWNlczogMTAsXG4gICAqICAgICB0YWNrczogMTBcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgZnVuYzogKHUsIHYpID0+IG5ldyBWZWN0b3IzKHUsIHYsIDApLFxuICAgICAgc2xpY2VzOiAxMCxcbiAgICAgIHN0YWNrczogMTBcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGFyYW1ldHJpYy5kZWZhdWx0cywgUGFyYW1ldHJpYy5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QYXJhbWV0cmljXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBhcmFtZXRyaWNCdWZmZXJHZW9tZXRyeSA6IFBhcmFtZXRyaWNHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZnVuYyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zbGljZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc3RhY2tzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQYXJhbWV0cmljXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUGxhbmVCdWZmZXJHZW9tZXRyeSxcbiAgUGxhbmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUGxhbmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIGBQbGFuZWAgaXMgdXNlZCBmb3IgY3JlYXRpbmcgcGxhbmVzIGdpdmVuIHNvbWUgYHdpZHRoYCBhbmQgYGhlaWdodGAuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1BsYW5lR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFBsYW5lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBQbGFuZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgd2lkdGg6IDIwLFxuICogICAgIGhlaWdodDogMzBcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUGxhbmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB3aWR0aDogMTAsXG4gICAqICAgICBoZWlnaHQ6IDEwLFxuICAgKiAgICAgd1NlZ21lbnRzOiAxLFxuICAgKiAgICAgaFNlZ21lbnRzOiAxXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHdpZHRoOiAxMCxcbiAgICAgIGhlaWdodDogMTAsXG4gICAgICB3U2VnbWVudHM6IDEsXG4gICAgICBoU2VnbWVudHM6IDFcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3dTZWdtZW50cycsICdoU2VnbWVudHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnd1NlZ21lbnRzJywgJ2hTZWdtZW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBsYW5lLmRlZmF1bHRzLCBQbGFuZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBsYW5lQnVmZmVyR2VvbWV0cnkgOiBQbGFuZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud1NlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhTZWdtZW50c1xuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGxhbmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIFBvbHloZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuY29uc3QgW3ZlcnRpY2VzT2ZDdWJlLCBpbmRpY2VzT2ZGYWNlc10gPSBbXG4gIFtcbiAgICAtMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAtMSwgMSwgLTEsXG4gICAgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMSwgMSwgMSwgLTEsIDEsIDFcbiAgXSxcbiAgW1xuICAgIDIsIDEsIDAsIDAsIDMsIDIsXG4gICAgMCwgNCwgNywgNywgMywgMCxcbiAgICAwLCAxLCA1LCA1LCA0LCAwLFxuICAgIDEsIDIsIDYsIDYsIDUsIDEsXG4gICAgMiwgMywgNywgNywgNiwgMixcbiAgICA0LCA1LCA2LCA2LCA3LCA0XG4gIF1cbl07XG5cbi8qKlxuICogQGNsYXNzIFBvbHloZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGVsZW1lbnRhcnkgZ2VvbWV0cnksIGEgcG9seWhlZHJvbiBpcyBhIHNvbGlkIGluIHRocmVlIGRpbWVuc2lvbnMgd2l0aCBmbGF0IHBvbHlnb25hbCBmYWNlcywgc3RyYWlnaHQgZWRnZXMgYW5kIHNoYXJwIGNvcm5lcnMgb3IgdmVydGljZXMuXG4gKiA8YnIvPjxici8+XG4gKiBgUG9seWhlZHJvbmAgY3JlYXRlcyBhIFBvbHloZWRyb24gYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYC5cbiAqIDxici8+PGJyLz5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBQb2x5aGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBQb2x5aGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBvbHloZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgc3RhdGljIHZlcnRpY2VzT2ZDdWJlID0gdmVydGljZXNPZkN1YmU7XG4gIHN0YXRpYyBpbmRpY2VzT2ZGYWNlcyA9IGluZGljZXNPZkZhY2VzO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICB2ZXJ0aWNlc09mQ3ViZTogW1xuICAgKiAgICAgICAtMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAtMSwgMSwgLTEsXG4gICAqICAgICAgIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxXG4gICAqICAgICBdLFxuICAgKlxuICAgKiAgICAgaW5kaWNlc09mRmFjZXM6IFtcbiAgICogICAgICAgMiwgMSwgMCwgMCwgMywgMixcbiAgICogICAgICAgMCwgNCwgNywgNywgMywgMCxcbiAgICogICAgICAgMCwgMSwgNSwgNSwgNCwgMCxcbiAgICogICAgICAgMSwgMiwgNiwgNiwgNSwgMSxcbiAgICogICAgICAgMiwgMywgNywgNywgNiwgMixcbiAgICogICAgICAgNCwgNSwgNiwgNiwgNywgNFxuICAgKiAgICAgXSxcbiAgICpcbiAgICogICAgIHJhZGl1czogNixcbiAgICogICAgIGRldGFpbDogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB2ZXJ0aWNlc09mQ3ViZSxcbiAgICAgIGluZGljZXNPZkZhY2VzLFxuICAgICAgcmFkaXVzOiA2LFxuICAgICAgZGV0YWlsOiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsndmVydGljZXNPZkN1YmUnLCAnaW5kaWNlc09mRmFjZXMnLCAncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3ZlcnRpY2VzT2ZDdWJlJywgJ2luZGljZXNPZkZhY2VzJywgJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQb2x5aGVkcm9uLmRlZmF1bHRzLCBQb2x5aGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Qb2x5aGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSA6IFBvbHloZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudmVydGljZXNPZkN1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaW5kaWNlc09mRmFjZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUG9seWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFJpbmdHZW9tZXRyeSxcbiAgUmluZ0J1ZmZlckdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBSaW5nXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBSaW5nIGNsYXNzIGNyZWF0ZXMgYSBjaXJjbGUgb3IganVzdCAyRCBUb3J1cy4gRG9lcyBub3Qgc3VwcG9ydCBwaHlzaWNzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNSaW5nR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFJpbmcsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFJpbmcoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIGlubmVyUmFkaXVzOiA1LFxuICogICAgIG91dGVyUmFkaXVzOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgICBzaWRlIFRIUkVFLkRvdWJsZVNpZGVcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDgsIDBdLFxuICpcbiAqICAgcm90YXRpb246IHtcbiAqICAgICB4OiBNYXRoLlBJLzRcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUmluZyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZyNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgaW5uZXJSYWRpdXM6IDAsXG4gICAqICAgICBvdXRlclJhZGl1czogNTAsXG4gICAqICAgICB0aGV0YVNlZ21lbnRzOiA4LFxuICAgKiAgICAgcGhpU2VnbWVudHM6IDgsXG4gICAqICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgKiAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGlubmVyUmFkaXVzOiAwLFxuICAgICAgb3V0ZXJSYWRpdXM6IDUwLFxuICAgICAgdGhldGFTZWdtZW50czogOCxcbiAgICAgIHBoaVNlZ21lbnRzOiA4LFxuICAgICAgdGhldGFTdGFydDogMCxcbiAgICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmcjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAnaW5uZXJSYWRpdXMnLFxuICAgKiAgICAgJ291dGVyUmFkaXVzJyxcbiAgICogICAgICd0aGV0YVNlZ21lbnRzJyxcbiAgICogICAgICdwaGlTZWdtZW50cycsXG4gICAqICAgICAndGhldGFTdGFydCcsXG4gICAqICAgICAndGhldGFMZW5ndGgnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAnaW5uZXJSYWRpdXMnLFxuICAgICAgJ291dGVyUmFkaXVzJyxcbiAgICAgICd0aGV0YVNlZ21lbnRzJyxcbiAgICAgICdwaGlTZWdtZW50cycsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBSaW5nLmRlZmF1bHRzLCBSaW5nLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFJpbmdCdWZmZXJHZW9tZXRyeSA6IFJpbmdHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaW5uZXJSYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3V0ZXJSYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5waGlTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YVN0YXJ0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhTGVuZ3RoXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBSaW5nXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgU2hhcGVCdWZmZXJHZW9tZXRyeSxcbiAgU2hhcGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU2hhcGVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNoYXBlIGlzIGEgdW5pdmVyc2FsIGNsYXNzLiBJdCBhbGxvd3MgeW91IHRvIGNyZWF0ZSBkaWZmZXJlbnQgMkQgc2hhcGVzIGluIDNEIHNjZW5lLjxici8+XG4gKiBVbmZvcnR1bmF0ZWx5LCBub3QgYWxsIG9mIHRoZW0gc3VwcG9ydCBwaHlzaWNzLCBhbiBhbHRlcm5hdGl2ZSBpcyB0byBtYWtlIGEgc2ltaWxhciAzRCBvYmplY3QgYW5kIHNjYWxlIGl0cyB3aWR0aCBkb3duIHRvIG5lYXIgemVyby5cbiAqIDxici8+PGJyLz5cbiAqIGBTaGFwZWAgY29uc2lzdHMgb2Ygc2hhcGVzIHRoYXQgYXJlIGluIGl0cyBzaGFwZXMgcGFyYW1ldGVyLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNTaGFwZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBwbGFuZSBsb29raW5nIFNoYXBlIGZyb20gYSBUSFJFRS5TaGFwZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCByZWN0V2lkdGggPSAxMCxcbiAqIHJlY3RMZW5ndGggPSA1O1xuICpcbiAqIGNvbnN0IHJlY3RTaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICogcmVjdFNoYXBlLm1vdmVUbygwLDApO1xuICogcmVjdFNoYXBlLmxpbmVUbygwLCByZWN0V2lkdGgpO1xuICogcmVjdFNoYXBlLmxpbmVUbyhyZWN0TGVuZ3RoLCByZWN0V2lkdGgpO1xuICogcmVjdFNoYXBlLmxpbmVUbyhyZWN0TGVuZ3RoLCAwKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8oMCwgMCk7XG4gKlxuICogY29uc3QgcGxhbmUgPSBuZXcgU2hhcGUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHNoYXBlOiByZWN0U2hhcGVcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU2hhcGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBzaGFwZXM6IFtdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgc2hhcGVzOiBbXVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydzaGFwZXMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydzaGFwZXMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTaGFwZS5kZWZhdWx0cywgU2hhcGUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNoYXBlXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFNoYXBlQnVmZmVyR2VvbWV0cnkgOiBTaGFwZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zaGFwZXNcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFNoYXBlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgU3BoZXJlQnVmZmVyR2VvbWV0cnksXG4gIFNwaGVyZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBTcGhlcmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNwaGVyZSBjbGFzcyBpcyB1c2VkIHRvIGNyZWF0ZSBzcGhlcmUgb2JqZWN0cyBieSBpdHMgcmFkaXVzIHByb3BlcnR5IGFuZCBvdGhlciB2YWx1ZXMgdGhhdCBkZXRlcm1pbmVzIGl0cyBkZXRhbGl0eS5cbiAqIDxici8+PGJyLz5cbiAqIEl0IGlzIHNpbWlsYXIgdG8gVEhSRUUuU3BoZXJlR2VvbWV0cnksIGJ1dCBpdCBhbHNvIGNvbnRhaW5zIGFsbCBgU2hhcGVgIHByb3BlcnRpZXMsIHN1Y2ggYXMgbWF0ZXJpYWwsIG1hc3MgYW5kIHZlY3RvcnMgbGlrZSBwb3NpdGlvbiAocG9zKSBhbmQgcm90YXRpb24gKHJvdCkuXG4gKiA8YnIvPjxici8+XG4gKiBUaGVuIGl0IGNyZWF0ZXMgYW4gYFRocmVlLmpzIG1lc2hgIG9yIGEgYFBoeXNpanMgbWVzaGAsIHRoYXQgaXMgc2ltaWxhciB0byBgVGhyZWUuanMgbWVzaGAsIGJ1dCBpdCBhbHNvIHRha2UgaW50byBjb25zaWRlcmF0aW9uIGNvbGxpc2lvbiBjYWxjdWxhdGlvbnMuXG4gKiBUaGlzIG1lc2ggaXMgYSBjb21iaW5hdGlvbiBvZiBgVGhyZWUuanMgZ2VvbWV0cnlgIGFuZCBgUGh5c2lqcyBtYXRlcmlhbGAgKFRoZSBzYW1lIGFzIGluIHRocmVlLmpzLCBidXQgd2l0aCBmcmljdGlvbiBhbmQgcmVzdGl0dXRpb24pLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNTcGhlcmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgU3BoZXJlLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBTcGhlcmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAxMDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU3BoZXJlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIHdpZHRoU2VnbWVudHM6IDgsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogNlxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIHdpZHRoU2VnbWVudHM6IDgsXG4gICAgICBoZWlnaHRTZWdtZW50czogNlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNwaGVyZS5kZWZhdWx0cywgU3BoZXJlLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlNwaGVyZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gU3BoZXJlQnVmZmVyR2VvbWV0cnkgOiBTcGhlcmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndpZHRoU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFNwaGVyZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIFRldHJhaGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRldHJhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYSB0ZXRyYWhlZHJvbiBpcyBhIHBvbHloZWRyb24gY29tcG9zZWQgb2YgZm91ciB0cmlhbmd1bGFyIGZhY2VzLCBzaXggc3RyYWlnaHQgZWRnZXMsIGFuZCBmb3VyIHZlcnRleCBjb3JuZXJzLlxuICogVGhlIHRldHJhaGVkcm9uIGlzIHRoZSBzaW1wbGVzdCBvZiBhbGwgdGhlIG9yZGluYXJ5IGNvbnZleCBwb2x5aGVkcmEgYW5kIHRoZSBvbmx5IG9uZSB0aGF0IGhhcyBmZXdlciB0aGFuIDUgZmFjZXMuXG4gKiA8YnIvPjxici8+XG4gKiBgVGV0cmFoZWRyb25gIGNyZWF0ZXMgYSBUZXRyYWhlZHJvbiBvYmplY3QgYnkgaXRzIGByYWRpdXNgIGFuZCBgZGV0YWlsYFxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUZXRyYWhlZHJvbkdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUZXRyYWhlZHJvbiwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVGV0cmFoZWRyb24oe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czogMixcbiAqICAgICBkZXRhaWw6IDFcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogMCxcbiAqICAgICB5OiAxMDAsXG4gKiAgICAgejogMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUZXRyYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRldHJhaGVkcm9uLmRlZmF1bHRzLCBUZXRyYWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV0cmFoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gVGV0cmFoZWRyb25CdWZmZXJHZW9tZXRyeSA6IFRldHJhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRldHJhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgRm9udCxcbiAgTWVzaCxcbiAgVGV4dEdlb21ldHJ5LFxuICBGb250TG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUZXh0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUZXh0IGNsYXNzIGlzIG1hZGUgZm9yIGNyZWF0aW5nIDNEIHRleHQgb2JqZWN0cy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVGV4dEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiA8YnIvPjxici8+XG4gKiBQaHlzaWNzIHRleHQgb2JqZWN0IGNhbiBiZSBjb252ZXggb3IgY29uY2F2ZS4gQnkgZGVmYXVsdCBpdCdzIGNvbnZleCBidXQgeW91IGNhbiBhbHNvIHN3aXRjaCB0byBjb25jYXZlLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVGV4dCwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVGV4dCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgdGV4dDogJ2hlbGxvIHdvcmxkJyxcbiAqICAgICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgICBmb250OiAncGF0aC90by9mb250LnR5cGVmYWNlLmpzJyxcbiAqICAgICAgIHNpemU6IDIwLFxuICogICAgICAgaGVpZ2h0OiA1LFxuICogICAgICAgY3VydmVTZWdtZW50czogNlxuICogICAgIH1cbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeDogLTQwLFxuICogICAgIHk6IDIwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVGV4dCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV4dCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICB0ZXh0OiAnSGVsbG8gV29ybGQhJyxcbiAgICogICBsb2FkZXI6IG5ldyBGb250TG9hZGVyKCksXG4gICAqXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgc2l6ZTogMTIsXG4gICAqICAgICBoZWlnaHQ6IDUwLFxuICAgKiAgICAgY3VydmVTZWdtZW50czogMTIsXG4gICAqICAgICBmb250OiBuZXcgRm9udCgpLFxuICAgKiAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICogICAgIGJldmVsVGhpY2tuZXNzOiAxMCxcbiAgICogICAgIGJldmVsU2l6ZTogOFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIHRleHQ6ICdIZWxsbyBXb3JsZCEnLFxuICAgIGxvYWRlcjogbmV3IEZvbnRMb2FkZXIoKSxcblxuICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgIHNpemU6IDEyLFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGN1cnZlU2VnbWVudHM6IDEyLFxuICAgICAgZm9udDogbmV3IEZvbnQoKSxcbiAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gICAgICBiZXZlbFRoaWNrbmVzczogMTAsXG4gICAgICBiZXZlbFNpemU6IDhcbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRleHQuZGVmYXVsdHMsIE1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYXMgcGFydCBvZiBsaWZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVGV4dFxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBwYXJhbXMubG9hZGVyLmxvYWQocGFyYW1zLnBhcmFtZXRlcnMuZm9udCwgZm9udCA9PiB7XG4gICAgICAgIHBhcmFtcy5wYXJhbWV0ZXJzLmZvbnQgPSBmb250O1xuXG4gICAgICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG5ldyBUZXh0R2VvbWV0cnkoXG4gICAgICAgICAgICBwYXJhbXMudGV4dCxcbiAgICAgICAgICAgIHBhcmFtcy5wYXJhbWV0ZXJzXG4gICAgICAgICAgKSxcblxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICAgIG1lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICAgICAgICB9KS5tZXNoXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHN1cGVyLndhaXQocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUZXh0XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVG9ydXNHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVG9ydXNcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRvcnVzIGNsYXNzIG1ha2VzIGEgdG9ydXMgZmlndXJlLiBBIGRvbnV0IGlzIGEgdG9ydXMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9pbmRleC5odG1sI2FwaS9nZW9tZXRyaWVzL1RvcnVzR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRvcnVzLCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUb3J1cyh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiA1LFxuICogICAgIHR1YmU6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMzVcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVG9ydXMgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEwMCxcbiAgICogICAgIHR1YmU6IDQwLFxuICAgKiAgICAgcmFkaWFsU2VnbWVudHM6IDgsXG4gICAqICAgICB0dWJ1bGFyU2VnbWVudHM6IDYsXG4gICAqICAgICBhcmM6IE1hdGguUEkgKiAyXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMTAwLFxuICAgICAgdHViZTogNDAsXG4gICAgICByYWRpYWxTZWdtZW50czogOCxcbiAgICAgIHR1YnVsYXJTZWdtZW50czogNixcbiAgICAgIGFyYzogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1cyNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3R1YmUnLFxuICAgKiAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICogICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgKiAgICAgJ2FyYydcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICd0dWJlJyxcbiAgICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICAgICdhcmMnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUb3J1cy5kZWZhdWx0cywgVG9ydXMuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBUb3J1c0dlb21ldHJ5KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGlhbFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YnVsYXJTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5hcmNcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRvcnVzXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgVG9ydXNLbm90QnVmZmVyR2VvbWV0cnksXG4gIFRvcnVzS25vdEdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUb3J1c2tub3RcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFRvcnVza25vdCBjbGFzcyBtYWtlcyBhIHRvcnVza25vdCBmaWd1cmUuIEl0J3MgbGlrZSBhIGNyb29rZWQgZG9udXQsIHZlcnkgY3Jvb2tlZC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVG9ydXNLbm90R2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRvcnVza25vdCwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgVG9ydXNrbm90KHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6NSxcbiAqICAgICB0dWJlOiAyXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IHtcbiAqICAgICB5OiAxMDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVG9ydXNrbm90IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3QjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMTAwLFxuICAgKiAgICAgdHViZTogNDAsXG4gICAqICAgICByYWRpYWxTZWdtZW50czogNjQsXG4gICAqICAgICB0dWJ1bGFyU2VnbWVudHM6IDgsXG4gICAqICAgICBwOiAyLFxuICAgKiAgICAgcTogM1xuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEwMCxcbiAgICAgIHR1YmU6IDQwLFxuICAgICAgcmFkaWFsU2VnbWVudHM6IDY0LFxuICAgICAgdHVidWxhclNlZ21lbnRzOiA4LFxuICAgICAgcDogMixcbiAgICAgIHE6IDNcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3QjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICd0dWJlJyxcbiAgICogICAgICdyYWRpYWxTZWdtZW50cycsXG4gICAqICAgICAndHVidWxhclNlZ21lbnRzJyxcbiAgICogICAgICdwJyxcbiAgICogICAgICdxJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3R1YmUnLFxuICAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgICAgJ3AnLFxuICAgICAgJ3EnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUb3J1c2tub3QuZGVmYXVsdHMsIFRvcnVza25vdC5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNrbm90XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgR0NvbnN0cnVjdCA9IHBhcmFtcy5idWZmZXIgPyBUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSA6IFRvcnVzS25vdEdlb21ldHJ5O1xuXG4gICAgcmV0dXJuIG5ldyBHQ29uc3RydWN0KFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50dWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGlhbFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YnVsYXJTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnFcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRvcnVza25vdFxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIExpbmVDdXJ2ZTMsXG4gIFZlY3RvcjMsXG4gIFR1YmVCdWZmZXJHZW9tZXRyeSxcbiAgVHViZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUdWJlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBUdWJlIGNsYXNzIG1ha2VzIGEgdHViZSB0aGF0IGV4dHJ1ZGVzIGFsb25nIGEgM2QgY3VydmUuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9pbmRleC5odG1sI2FwaS9nZW9tZXRyaWVzL1R1YmVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVHViZSBmcm9tIGEgdGhyZWUuanMgQ3VydmUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgQ3VzdG9tU2luQ3VydmUgPSBUSFJFRS5DdXJ2ZS5jcmVhdGUoXG4gKiAgIGZ1bmN0aW9uIChzY2FsZSkgeyAvLyBjdXN0b20gY3VydmUgY29uc3RydWN0b3JcbiAqICAgICB0aGlzLnNjYWxlID0gKHNjYWxlID09PSB1bmRlZmluZWQpID8gMSA6IHNjYWxlO1xuICogICB9LFxuICpcbiAqICAgZnVuY3Rpb24gKHQpIHsgLy8gZ2V0UG9pbnQ6IHQgaXMgYmV0d2VlbiAwLTFcbiAqICAgICBjb25zdCB0eCA9IHQgKiAzIC0gMS41LFxuICogICAgIHR5ID0gTWF0aC5zaW4oIDIgKiBNYXRoLlBJICogdCApLFxuICogICAgIHR6ID0gMDtcbiAqXG4gKiAgICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHR4LCB0eSwgdHopLm11bHRpcGx5U2NhbGFyKHRoaXMuc2NhbGUpO1xuICogICB9XG4gKiApO1xuICpcbiAqIGNvbnN0IHBhdGggPSBuZXcgQ3VzdG9tU2luQ3VydmUoMTApO1xuICpcbiAqIG5ldyBUdWJlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBwYXRoOiBwYXRoXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFR1YmUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHBhdGg6IG5ldyBUSFJFRS5MaW5lQ3VydmUzKG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAxKSksXG4gICAqICAgICBzZWdtZW50czogMjAsXG4gICAqICAgICByYWRpdXM6IDIsXG4gICAqICAgICByYWRpdXNTZWdtZW50czogOCxcbiAgICogICAgIGNsb3NlZDogZmFsc2VcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcGF0aDogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSxcbiAgICAgIHNlZ21lbnRzOiAyMCxcbiAgICAgIHJhZGl1czogMixcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiA4LFxuICAgICAgY2xvc2VkOiBmYWxzZVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbXG4gICAqICAgICAncGF0aCcsXG4gICAqICAgICAnc2VnbWVudHMnLFxuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICAgJ2Nsb3NlZCdcbiAgICogICBdXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncGF0aCcsXG4gICAgICAnc2VnbWVudHMnLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAncmFkaXVzU2VnbWVudHMnLFxuICAgICAgJ2Nsb3NlZCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFR1YmUuZGVmYXVsdHMsIFR1YmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlR1YmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFR1YmVCdWZmZXJHZW9tZXRyeSA6IFR1YmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucGF0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuY2xvc2VkXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUdWJlXG59O1xuIiwiaW1wb3J0IHtPYmplY3QzRH0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgR3JvdXBcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFNvbWV0aW1lcyB5b3UgbmVlZCB0byBtYWtlIGdyb3VwcyBvZiBvYmplY3RzIChpdCdzIG5vdCBjb252ZW5pZW50bHkgdG8gYXBwbHkgdHJhbnNmb3JtcyB0byBlYWNoIG9iamVjdCB3aGVuIGNhbiBtYWtlIGp1c3Qgb25lIHRvIGEgZ3JvdXApLjxici8+XG4gKiBJbiBUaHJlZS5qcyB5b3UgbWFrZSBpdCB1c2luZyBgVEhSRUUuT2JqZWN0M0RgIGFuZCBpdCdzIGNoaWxkcmVuLiA8YnIvPjxici8+XG4gKiBJbiB3aHMuanMgd2UgaGF2ZSBgR3JvdXBgXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BcHByb2FjaCAyIC0gQWRkaW5nIG9iamVjdHMgdG8gYW4gZW1wdHkgZ3JvdXA8L2NhcHRpb24+XG4gKiBjb25zdCBzcGhlcmUgPSBuZXcgU3BoZXJlKCk7XG4gKiBjb25zdCBib3ggPSBuZXcgQm94KCk7XG4gKiBjb25zdCBncm91cCA9IG5ldyBHcm91cCgpO1xuICpcbiAqIHNwaGVyZS5hZGRUbyhncm91cCk7XG4gKiBib3guYWRkVG8oZ3JvdXApO1xuKiBAZXhhbXBsZSA8Y2FwdGlvbj5BcHByb2FjaCAyIC0gTWFraW5nIGEgZ3JvdXAgZnJvbSBvYmplY3RzPC9jYXB0aW9uPlxuICogY29uc3Qgc3BoZXJlID0gbmV3IFNwaGVyZSgpO1xuICogY29uc3QgYm94ID0gbmV3IEJveCgpO1xuICogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoYm94LCBzcGhlcmUpO1xuICogLy8gT1I6IGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKFtib3gsIHNwaGVyZV0pO1xuICovXG5jbGFzcyBHcm91cCBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciguLi5vYmplY3RzKSB7XG4gICAgc3VwZXIoe30pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvYmogPSBvYmplY3RzW2ldO1xuXG4gICAgICBpZiAob2JqIGluc3RhbmNlb2YgQ29tcG9uZW50KSBvYmouYWRkVG8odGhpcyk7XG4gICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QzRCkgdGhpcy5uYXRpdmUuYWRkKG9iaik7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3QzRCgpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEdyb3VwXG59O1xuIiwiLyoqIEBtb2R1bGUgY29tcG9uZW50cy9tZXNoZXMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQm94JztcbmV4cG9ydCAqIGZyb20gJy4vQ2lyY2xlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29uZSc7XG5leHBvcnQgKiBmcm9tICcuL0N5bGluZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vRG9kZWNhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0cnVkZSc7XG5leHBvcnQgKiBmcm9tICcuL0ljb3NhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vTGF0aGUnO1xuZXhwb3J0ICogZnJvbSAnLi9MaW5lJztcbmV4cG9ydCAqIGZyb20gJy4vSW1wb3J0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9PY3RhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vUGFyYW1ldHJpYyc7XG5leHBvcnQgKiBmcm9tICcuL1BsYW5lJztcbmV4cG9ydCAqIGZyb20gJy4vUG9seWhlZHJvbic7XG5leHBvcnQgKiBmcm9tICcuL1JpbmcnO1xuZXhwb3J0ICogZnJvbSAnLi9TaGFwZSc7XG5leHBvcnQgKiBmcm9tICcuL1NwaGVyZSc7XG5leHBvcnQgKiBmcm9tICcuL1RldHJhaGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vVGV4dCc7XG5leHBvcnQgKiBmcm9tICcuL1RvcnVzJztcbmV4cG9ydCAqIGZyb20gJy4vVG9ydXNrbm90JztcbmV4cG9ydCAqIGZyb20gJy4vVHViZSc7XG5leHBvcnQgKiBmcm9tICcuL0dyb3VwJztcbiIsIi8qKlxuICogQGNsYXNzIEVsZW1lbnRNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtjb250YWluZXI9ZG9jdW1lbnQuYm9keV0gY29udGFpbmVyIGlzIHRoZSBET00gb2JqZWN0IHRvIHdoaWNoIGFwcGxpY2F0aW9uJ3MgY2FudmFzIHdpbGwgYmUgYWRkZWQgdG8uXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBlbGVtZW50IG1vZHVsZSwgcGFzc2luZyBpdCB0byB0aGUgQXBwPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIG5ldyBFbGVtZW50TW9kdWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRWxlbWVudE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5lcikge1xuICAgICAgY29uc29sZS53YXJuKCdFbGVtZW50TW9kdWxlIG5vdyBhY2NlcHRzIG9ubHkgYXJndW1lbnQgd2hpY2ggaXMgYSBET00gb2JqZWN0LCBub3QgYSBwYXJhbXMgb2JqZWN0LicpO1xuICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXIuY29udGFpbmVyO1xuICAgIH0gZWxzZSB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgIHRoaXMuY3JlYXRlRWxlbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY3JlYXRlRWxlbWVudFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYSBjYW52YXMgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICd3aHMtYXBwJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAnaW5oZXJpdCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICdpbmhlcml0JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2VsZW1lbnQnLCB0aGlzLmVsZW1lbnQpO1xuICAgIG1hbmFnZXIuc2V0KCdjb250YWluZXInLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWxlbWVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFdlYkdMUmVuZGVyZXIsXG4gIFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbi8qKlxuICogQGNsYXNzIFJlbmRlcmluZ01vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIHJlbmRlcmluZyBtb2R1bGUgYW5kIHBhc3NpbmcgaXQgdG8gQXBwJ3MgbW9kdWxlczwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICBuZXcgRWxlbWVudE1vZHVsZSgpLFxuICogICBuZXcgU2NlbmVNb2R1bGUoKSxcbiAqICAgbmV3IENhbWVyYU1vZHVsZSh7XG4gKiAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDYsIDE4KSxcbiAqICAgICBmYXI6IDEwMDAwXG4gKiAgIH0pLFxuICogICBuZXcgUmVuZGVyaW5nTW9kdWxlKHtcbiAqICAgICBiZ0NvbG9yOiAweDE2MjEyOSxcbiAqXG4gKiAgICAgcmVuZGVyZXI6IHtcbiAqICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAqICAgICAgIHNoYWRvd21hcDoge1xuICogICAgICAgICB0eXBlOiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gKiAgICAgICB9XG4gKiAgICAgfVxuICogICB9LCB7c2hhZG93OiB0cnVlfSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTW9kdWxlIHtcbiAgc3RhdGljIGFkZGl0aW9uYWwgPSB7XG4gICAgc2hhZG93KHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlZCA9IHRydWU7XG5cbiAgZGVmZXIgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwge3NoYWRvdzogaXNTaGFkb3d9ID0ge3NoYWRvdzogZmFsc2V9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXG4gICAgICByZXNvbHV0aW9uOiBuZXcgVmVjdG9yMigxLCAxKSxcbiAgICAgIHBpeGVsUmF0aW86IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxuXG4gICAgICBiZ0NvbG9yOiAweDAwMDAwMCxcbiAgICAgIGJnT3BhY2l0eTogMSxcblxuICAgICAgcmVuZGVyZXI6IHt9XG4gICAgfSwgcGFyYW1zKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGJnQ29sb3IsXG4gICAgICBiZ09wYWNpdHksXG4gICAgICByZW5kZXJlcixcbiAgICAgIHBpeGVsUmF0aW8sXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHJlc29sdXRpb25cbiAgICB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIocmVuZGVyZXIpO1xuICAgIHRoaXMuZWZmZWN0cyA9IFtdO1xuICAgIHRoaXMuYXBwbHlBZGRpdGlvbmFsKCdzaGFkb3cnLCBpc1NoYWRvdyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoXG4gICAgICBiZ0NvbG9yLFxuICAgICAgYmdPcGFjaXR5XG4gICAgKTtcblxuICAgIGlmIChwaXhlbFJhdGlvKSB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8ocGl4ZWxSYXRpbyk7XG5cbiAgICB0aGlzLnNldFNpemUoXG4gICAgICBOdW1iZXIod2lkdGggKiByZXNvbHV0aW9uLngpLnRvRml4ZWQoKSxcbiAgICAgIE51bWJlcihoZWlnaHQgKiByZXNvbHV0aW9uLnkpLnRvRml4ZWQoKVxuICAgICk7XG4gIH1cblxuICBhcHBseUFkZGl0aW9uYWwobmFtZSwgaXNBcHBsaWVkID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzQXBwbGllZCkgcmV0dXJuO1xuICAgIFJlbmRlcmluZ01vZHVsZS5hZGRpdGlvbmFsW25hbWVdLmFwcGx5KHRoaXMsIFt0aGlzLnJlbmRlcmVyXSk7XG4gIH1cblxuICBpbnRlZ3JhdGVSZW5kZXJlcihlbGVtZW50LCBzY2VuZSwgY2FtZXJhKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMucmVuZGVyTG9vcCA9IG5ldyBMb29wKCgpID0+IHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKSk7XG4gICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50KTtcblxuICAgIHJldHVybiB0aGlzLnJlbmRlckxvb3A7XG4gIH1cblxuICBlZmZlY3QoZWZmZWN0LCBjYikge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlckxvb3Auc3RvcCgpO1xuXG4gICAgICBjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XG4gICAgICBlZmZlY3Quc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGxvb3AgPSBuZXcgTG9vcChjYiA/IGNiIDogKCkgPT4ge1xuICAgICAgICBlZmZlY3QucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmVmZmVjdHMucHVzaChsb29wKTtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIGxvb3Auc3RhcnQodGhpcy5hcHApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0U2l6ZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIHJlbmRlciB0YXJnZXQgd2lkdGggYW5kIGhlaWdodC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZW5kZXJpbmdNb2R1bGVcbiAgICovXG4gIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGlmICh0aGlzLnJlbmRlcmVyKSB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBhdHRhY2hUb0NhbnZhcyhlbGVtZW50KSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuXG4gICAgLy8gYXR0YWNoIHRvIG5ldyBwYXJlbnQgd29ybGQgZG9tXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlbmRlckxvb3Auc3RvcCgpO1xuICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdG9wKCkpO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnJlbmRlckxvb3Auc3RhcnQoKTtcbiAgICB0aGlzLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RhcnQoKSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncmVuZGVyaW5nJyk7XG4gICAgbWFuYWdlci5zZXQoJ3JlbmRlcmVyJywgdGhpcy5yZW5kZXJlcik7XG5cbiAgICB0aGlzLmFwcCA9IG1hbmFnZXIuaGFuZGxlcjtcblxuICAgIHRoaXMucmVuZGVyTG9vcCA9IHRoaXMuaW50ZWdyYXRlUmVuZGVyZXIoXG4gICAgICBtYW5hZ2VyLmdldCgnZWxlbWVudCcpLFxuICAgICAgbWFuYWdlci5nZXQoJ3NjZW5lJyksXG4gICAgICBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlXG4gICAgKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQgPT4ge1xuICAgICAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpO1xuICAgICAgfSxcbiAgICAgIHNjZW5lOiBzY2VuZSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICAgIH0sXG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhLm5hdGl2ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVzb2x2ZSgpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLnJlbmRlckxvb3Auc3RhcnQodGhpcyk7XG4gICAgc2VsZi5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0YXJ0KHRoaXMpKTtcbiAgfVxuXG4gIGRpc3Bvc2Uoc2VsZikge1xuICAgIHNlbGYucmVuZGVyTG9vcC5zdG9wKHRoaXMpO1xuICAgIHNlbGYuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdG9wKHRoaXMpKTtcbiAgICBzZWxmLnJlbmRlcmVyLmZvcmNlQ29udGV4dExvc3MoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgU2NlbmVcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBTY2VuZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3aWxsU2NlbmVCZVJlcGxhY2VkPWZhbHNlXSB3aWxsU2NlbmVCZVJlcGxhY2VkIHNob3VsZCBiZSB0cnVlIG9ubHkgaWYgeW91IGFyZSBnb2luZyB0byBvdmVyd3JpdGUgc2NlbmUgZGVwZW5kZW5jeSBldmVuIHdpdGhvdXQgdGhlIHVzZSBvZiBkZWZhdWx0IG9uZS5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqL1xuZXhwb3J0IGNsYXNzIFNjZW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3Iod2lsbFNjZW5lQmVSZXBsYWNlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5zY2VuZSA9IHdpbGxTY2VuZUJlUmVwbGFjZWQgPyBudWxsIDogbmV3IFNjZW5lKCk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnc2NlbmUnLCB0aGlzLnNjZW5lKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuXG4gICAgdGhpcy5hZGQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBvYmplY3QucGFyZW50ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgb2JqZWN0LmRlZmVyKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB7bmF0aXZlfSA9IG9iamVjdDtcbiAgICAgICAgICBpZiAoIW5hdGl2ZSkgcmVqZWN0KCk7XG5cbiAgICAgICAgICBjb25zdCBhZGRQcm9taXNlID0gdGhpcy5hcHBseUJyaWRnZSh7b25BZGQ6IG9iamVjdH0pLm9uQWRkO1xuXG4gICAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLnNjZW5lLmFkZChuYXRpdmUpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG9iamVjdCk7XG5cbiAgICAgICAgICAgIHJlc29sdmUob2JqZWN0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGFkZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgYWRkUHJvbWlzZS50aGVuKHJlc29sdmVyKTtcbiAgICAgICAgICBlbHNlIHJlc29sdmVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgb2JqZWN0LnBhcmVudCA9IG51bGw7XG4gICAgICBzZWxmLnNjZW5lLnJlbW92ZShvYmplY3QubmF0aXZlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRTY2VuZSA9IGZ1bmN0aW9uIChzY2VuZSkge1xuICAgICAgc2VsZi5zY2VuZSA9IHNjZW5lO1xuICAgICAgdGhpcy5tYW5hZ2VyLnNldCgnc2NlbmUnLCBzY2VuZSk7XG4gICAgfTtcbiAgfVxufVxuIiwiLy8gaW1wb3J0IHthZGRSZXNpemVMaXN0ZW5lcn0gZnJvbSAnZGV0ZWN0LWVsZW1lbnQtcmVzaXplJztcblxuLyoqXG4gKiBAY2xhc3MgUmVzaXplTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXthdXRvOiB0cnVlfV0gLSBJZiBhdXRvIGlzIHNldCB0byB0cnVlIC0gcmVzaXplIHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gY29udGFpbmVyIHJlc2l6ZXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc2l6ZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGF1dG86IHRydWVcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbdGhpcy5zZXRTaXplLmJpbmQodGhpcyldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiBzZXRTaXplXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwcm92aWRlZCB3aWR0aCAmIGhlaWdodCB0byB0aGUgcmVuZGVyZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gW3dpZHRoPTFdIC0gVGhlIHByb21pc2UgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gYSBxdWV1ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHQ9MV0gLSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIHNldFNpemUod2lkdGggPSAxLCBoZWlnaHQgPSAxKSB7XG4gICAgdGhpcy5jYW1lcmEubmF0aXZlLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgIHRoaXMuY2FtZXJhLm5hdGl2ZS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHRoaXMucmVuZGVyaW5nLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB0cmlnZ2VyXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVHJpZ2dlcnMgcmVzaXplIHdoZW4gY2FsbGVkLiB3aWR0aCAmIGhlaWdodCBhcmUgZGV0ZXJtaW5lZCBhdXRvbWF0aWNhbGx5XG4gICAqIFRoaXMgaW52b2tlcyBlYWNoIGNhbGxiYWNrcyB3aXRoIHRoZSBuZXcgd2lkdGggYW5kIGhlaWdodCBhcyBwYXJhbXNcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIHRyaWdnZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgIG9mZnNldFdpZHRoLFxuICAgICAgICBvZmZzZXRIZWlnaHRcbiAgICAgIH0sXG4gICAgICByZXNvbHV0aW9uXG4gICAgfSA9IHRoaXM7XG5cbiAgICBjb25zdCB3aWR0aCA9IE51bWJlcihvZmZzZXRXaWR0aCAqIHJlc29sdXRpb24ueCkudG9GaXhlZCgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcihvZmZzZXRIZWlnaHQgKiByZXNvbHV0aW9uLnkpLnRvRml4ZWQoKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzLmZvckVhY2goY2IgPT4ge1xuICAgICAgY2Iod2lkdGgsIGhlaWdodCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRBdXRvcmVzaXplXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyBtb2R1bGUgdG8gYXV0b3Jlc2l6ZSwgdGhpcyBhZGRzIGFuIGV2ZW50IGxpc3RlbmUgb24gd2luZG93IHJlc2l6ZSB0byB0cmlnZ2VyIHRoZSByZXNpemVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5SZXNpemVNb2R1bGVcbiAgICovXG4gIGFkZEF1dG9yZXNpemUoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbnRhaW5lcigpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRoaXMuZ2V0UmVzb2x1dGlvbigpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmF1dG8pIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnRyaWdnZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRDYWxsYmFja1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBjYWxsIGJhY2sgZnVuY3Rpb24gdG8gdGhlIGV4aXN0aW5nIGNhbGxiYWNrcyBsaXN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFkZFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgYWRkQ2FsbGJhY2soZnVuYykge1xuICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goZnVuYyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncmVzaXplJyk7XG5cbiAgICB0aGlzLnJlbmRlcmluZyA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgdGhpcy5nZXRSZXNvbHV0aW9uID0gKCkgPT4gbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLnBhcmFtcy5yZXNvbHV0aW9uO1xuICAgIHRoaXMuZ2V0Q29udGFpbmVyID0gKCkgPT4gbWFuYWdlci5nZXQoJ2NvbnRhaW5lcicpO1xuXG4gICAgdGhpcy5hZGRBdXRvcmVzaXplKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjA7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjE7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjI7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjM7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdC8vIFNhbXBsZSB0b3AgbGVmdCB0ZXhlbC5cXHJcXG5cXHR2ZWM0IHN1bSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2MCk7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIHRvcCByaWdodCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYxKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgYm90dG9tIHJpZ2h0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjIpO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSBib3R0b20gbGVmdCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYzKTtcXHJcXG5cXHJcXG5cXHQvLyBDb21wdXRlIHRoZSBhdmVyYWdlLlxcclxcblxcdGdsX0ZyYWdDb2xvciA9IHN1bSAqIDAuMjU7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInVuaWZvcm0gdmVjMiB0ZXhlbFNpemU7XFxyXFxudW5pZm9ybSB2ZWMyIGhhbGZUZXhlbFNpemU7XFxyXFxudW5pZm9ybSBmbG9hdCBrZXJuZWw7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjA7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjE7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjI7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjM7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzIgZFV2ID0gKHRleGVsU2l6ZSAqIHZlYzIoa2VybmVsKSkgKyBoYWxmVGV4ZWxTaXplO1xcclxcblxcclxcblxcdHZVdjAgPSB2ZWMyKHV2LnggLSBkVXYueCwgdXYueSArIGRVdi55KTtcXHJcXG5cXHR2VXYxID0gdmVjMih1di54ICsgZFV2LngsIHV2LnkgKyBkVXYueSk7XFxyXFxuXFx0dlV2MiA9IHZlYzIodXYueCArIGRVdi54LCB1di55IC0gZFV2LnkpO1xcclxcblxcdHZVdjMgPSB2ZWMyKHV2LnggLSBkVXYueCwgdXYueSAtIGRVdi55KTtcXHJcXG5cXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBvcHRpbWlzZWQgY29udm9sdXRpb24gc2hhZGVyIG1hdGVyaWFsLlxyXG4gKlxyXG4gKiBCYXNlZCBvbiB0aGUgR0RDMjAwMyBQcmVzZW50YXRpb24gYnkgTWFzYWtpIEthd2FzZSwgQnVua2FzaGEgR2FtZXM6XHJcbiAqICBGcmFtZSBCdWZmZXIgUG9zdHByb2Nlc3NpbmcgRWZmZWN0cyBpbiBET1VCTEUtUy5ULkUuQS5MIChXcmVja2xlc3MpXHJcbiAqIGFuZCBhbiBhcnRpY2xlIGJ5IEZpbGlwIFN0cnVnYXIsIEludGVsOlxyXG4gKiAgQW4gaW52ZXN0aWdhdGlvbiBvZiBmYXN0IHJlYWwtdGltZSBHUFUtYmFzZWQgaW1hZ2UgYmx1ciBhbGdvcml0aG1zXHJcbiAqXHJcbiAqIEZ1cnRoZXIgbW9kaWZpZWQgYWNjb3JkaW5nIHRvIEFwcGxlJ3NcclxuICogW0Jlc3QgUHJhY3RpY2VzIGZvciBTaGFkZXJzXShodHRwczovL2dvby5nbC9sbVJvTTUpLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb252b2x1dGlvbk1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNvbnZvbHV0aW9uIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbdGV4ZWxTaXplXSAtIFRoZSBhYnNvbHV0ZSBzY3JlZW4gdGV4ZWwgc2l6ZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IodGV4ZWxTaXplID0gbmV3IFZlY3RvcjIoKSkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQ29udm9sdXRpb25NYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblx0XHRcdFx0aGFsZlRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblx0XHRcdFx0a2VybmVsOiBuZXcgVW5pZm9ybSgwLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5zZXRUZXhlbFNpemUodGV4ZWxTaXplLngsIHRleGVsU2l6ZS55KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjdXJyZW50IGtlcm5lbCBzaXplLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtLZXJuZWxTaXplfVxyXG5cdFx0ICogQGRlZmF1bHQgS2VybmVsU2l6ZS5MQVJHRVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5rZXJuZWxTaXplID0gS2VybmVsU2l6ZS5MQVJHRTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBrZXJuZWwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtGbG9hdDMyQXJyYXl9IFRoZSBrZXJuZWwuXHJcblx0ICovXHJcblxyXG5cdGdldEtlcm5lbCgpIHsgcmV0dXJuIGtlcm5lbFByZXNldHNbdGhpcy5rZXJuZWxTaXplXTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB0ZXhlbCBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHggLSBUaGUgdGV4ZWwgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgLSBUaGUgdGV4ZWwgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRUZXhlbFNpemUoeCwgeSkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXMudGV4ZWxTaXplLnZhbHVlLnNldCh4LCB5KTtcclxuXHRcdHRoaXMudW5pZm9ybXMuaGFsZlRleGVsU2l6ZS52YWx1ZS5zZXQoeCwgeSkubXVsdGlwbHlTY2FsYXIoMC41KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBLYXdhc2UgYmx1ciBrZXJuZWwgcHJlc2V0cy5cclxuICpcclxuICogQHR5cGUge0Zsb2F0MzJBcnJheVtdfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmNvbnN0IGtlcm5lbFByZXNldHMgPSBbXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMS4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDEuMCwgMi4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMi4wLCAzLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAzLjAsIDQuMCwgNC4wLCA1LjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAzLjAsIDQuMCwgNS4wLCA3LjAsIDguMCwgOS4wLCAxMC4wXSlcclxuXTtcclxuXHJcbi8qKlxyXG4gKiBBIGtlcm5lbCBzaXplIGVudW1lcmF0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gVkVSWV9TTUFMTCAtIEEgdmVyeSBzbWFsbCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgN3g3IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gU01BTEwgLSBBIHNtYWxsIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAxNXgxNSBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IE1FRElVTSAtIEEgbWVkaXVtIHNpemVkIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAyM3gyMyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IExBUkdFIC0gQSBsYXJnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMzV4MzUgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJZX0xBUkdFIC0gQSB2ZXJ5IGxhcmdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSA2M3g2MyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IEhVR0UgLSBBIGh1Z2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDEyN3gxMjcgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEtlcm5lbFNpemUgPSB7XHJcblxyXG5cdFZFUllfU01BTEw6IDAsXHJcblx0U01BTEw6IDEsXHJcblx0TUVESVVNOiAyLFxyXG5cdExBUkdFOiAzLFxyXG5cdFZFUllfTEFSR0U6IDQsXHJcblx0SFVHRTogNVxyXG5cclxufTtcclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIGZsb2F0IG9wYWNpdHk7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBvcGFjaXR5ICogdGV4ZWw7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2ltcGxlIGNvcHkgc2hhZGVyIG1hdGVyaWFsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3B5TWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY29weSBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJDb3B5TWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRvcGFjaXR5OiBuZXcgVW5pZm9ybSgxLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGFkZXIgbWF0ZXJpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHBvc3QgcHJvY2Vzc2luZyBwYXNzZXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvbWF0ZXJpYWxzXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgQWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwgfSBmcm9tIFwiLi9hZGFwdGl2ZS1sdW1pbm9zaXR5LmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoTWF0ZXJpYWwgfSBmcm9tIFwiLi9ib2tlaC5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaDJNYXRlcmlhbCB9IGZyb20gXCIuL2Jva2VoMi5qc1wiO1xyXG5leHBvcnQgeyBDb21iaW5lTWF0ZXJpYWwgfSBmcm9tIFwiLi9jb21iaW5lLmpzXCI7XHJcbmV4cG9ydCB7IENvbnZvbHV0aW9uTWF0ZXJpYWwsIEtlcm5lbFNpemUgfSBmcm9tIFwiLi9jb252b2x1dGlvbi5qc1wiO1xyXG5leHBvcnQgeyBDb3B5TWF0ZXJpYWwgfSBmcm9tIFwiLi9jb3B5LmpzXCI7XHJcbmV4cG9ydCB7IERlcHRoTWF0ZXJpYWwgfSBmcm9tIFwiLi9kZXB0aC5qc1wiO1xyXG5leHBvcnQgeyBEb3RTY3JlZW5NYXRlcmlhbCB9IGZyb20gXCIuL2RvdC1zY3JlZW4uanNcIjtcclxuZXhwb3J0IHsgRmlsbU1hdGVyaWFsIH0gZnJvbSBcIi4vZmlsbS5qc1wiO1xyXG5leHBvcnQgeyBHbGl0Y2hNYXRlcmlhbCB9IGZyb20gXCIuL2dsaXRjaC5qc1wiO1xyXG5leHBvcnQgeyBHb2RSYXlzTWF0ZXJpYWwgfSBmcm9tIFwiLi9nb2QtcmF5cy5qc1wiO1xyXG5leHBvcnQgeyBMdW1pbm9zaXR5TWF0ZXJpYWwgfSBmcm9tIFwiLi9sdW1pbm9zaXR5LmpzXCI7XHJcbmV4cG9ydCB7IFBpeGVsYXRpb25NYXRlcmlhbCB9IGZyb20gXCIuL3BpeGVsYXRpb24uanNcIjtcclxuZXhwb3J0IHsgU2hvY2tXYXZlTWF0ZXJpYWwgfSBmcm9tIFwiLi9zaG9jay13YXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFCbGVuZE1hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS1ibGVuZC5qc1wiO1xyXG5leHBvcnQgeyBTTUFBQ29sb3JFZGdlc01hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS1jb2xvci1lZGdlcy5qc1wiO1xyXG5leHBvcnQgeyBTTUFBV2VpZ2h0c01hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS13ZWlnaHRzLmpzXCI7XHJcbmV4cG9ydCB7IFRvbmVNYXBwaW5nTWF0ZXJpYWwgfSBmcm9tIFwiLi90b25lLW1hcHBpbmcuanNcIjtcclxuIiwiaW1wb3J0IHsgU2NlbmUsIE1lc2gsIE9ydGhvZ3JhcGhpY0NhbWVyYSwgUGxhbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IHBhc3MuXHJcbiAqXHJcbiAqIFBhc3NlcyB0aGF0IGRvIG5vdCByZWx5IG9uIHRoZSBkZXB0aCBidWZmZXIgc2hvdWxkIGV4cGxpY2l0bHkgZGlzYWJsZSB0aGVcclxuICogZGVwdGggdGVzdCBhbmQgZGVwdGggd3JpdGUgaW4gdGhlaXIgcmVzcGVjdGl2ZSBzaGFkZXIgbWF0ZXJpYWxzLlxyXG4gKlxyXG4gKiBUaGlzIGNsYXNzIGltcGxlbWVudHMgYSB7QGxpbmsgUGFzcyNkaXNwb3NlfSBtZXRob2QgdGhhdCBmcmVlcyBtZW1vcnkgb25cclxuICogZGVtYW5kLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gW3NjZW5lXSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IFtjYW1lcmFdIC0gVGhlIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge01lc2h9IFtxdWFkXSAtIEEgcXVhZCB0aGF0IGZpbGxzIHRoZSBzY3JlZW4gdG8gcmVuZGVyIDJEIGZpbHRlciBlZmZlY3RzLiBTZXQgdGhpcyB0byBudWxsLCBpZiB5b3UgZG9uJ3QgbmVlZCBpdCAoc2VlIHtAbGluayBSZW5kZXJQYXNzfSkuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0c2NlbmUgPSBuZXcgU2NlbmUoKSxcclxuXHRcdGNhbWVyYSA9IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIDEsIC0xLCAwLCAxKSxcclxuXHRcdHF1YWQgPSBuZXcgTWVzaChuZXcgUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgbnVsbClcclxuXHQpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTY2VuZX1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBTY2VuZSgpXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY2FtZXJhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDYW1lcmF9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAxLCAtMSwgMCwgMSlcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBxdWFkIG1lc2ggdGhhdCBmaWxscyB0aGUgc2NyZWVuLlxyXG5cdFx0ICpcclxuXHRcdCAqIEFzc2lnbiB5b3VyIHNoYWRlciBtYXRlcmlhbCB0byB0aGlzIG1lc2ghXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge01lc2h9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgTWVzaChuZXcgUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgbnVsbClcclxuXHRcdCAqIEBleGFtcGxlIHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubXlNYXRlcmlhbDtcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucXVhZCA9IHF1YWQ7XHJcblxyXG5cdFx0aWYodGhpcy5xdWFkICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHR0aGlzLnF1YWQuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYodGhpcy5zY2VuZSAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHR0aGlzLnNjZW5lLmFkZCh0aGlzLnF1YWQpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSByZWFkIGFuZCB3cml0ZSBidWZmZXJzIHNob3VsZCBiZSBzd2FwcGVkIGFmdGVyIHRoaXNcclxuXHRcdCAqIHBhc3MgaGFzIGZpbmlzaGVkIHJlbmRlcmluZy5cclxuXHRcdCAqXHJcblx0XHQgKiBTZXQgdGhpcyB0byB0cnVlIGlmIHRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIgc28gdGhhdCBhXHJcblx0XHQgKiBmb2xsb3dpbmcgcGFzcyBjYW4gZmluZCB0aGUgcmVzdWx0IGluIHRoZSByZWFkIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRW5hYmxlZCBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbmRlciB0byBzY3JlZW4gZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRvU2NyZWVuID0gZmFsc2U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogVGhpcyBpcyBhbiBhYnN0cmFjdCBtZXRob2QgdGhhdCBtdXN0IGJlIG92ZXJyaWRkZW4uXHJcblx0ICpcclxuXHQgKiBAYWJzdHJhY3RcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gQW4gZXJyb3IgaXMgdGhyb3duIGlmIHRoZSBtZXRob2QgaXMgbm90IG92ZXJyaWRkZW4uXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gQSByZWFkIGJ1ZmZlci4gQ29udGFpbnMgdGhlIHJlc3VsdCBvZiB0aGUgcHJldmlvdXMgcGFzcy5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIEEgd3JpdGUgYnVmZmVyLiBOb3JtYWxseSB1c2VkIGFzIHRoZSByZW5kZXIgdGFyZ2V0IHdoZW4gdGhlIHJlYWQgYnVmZmVyIGlzIHVzZWQgYXMgaW5wdXQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YV0gLSBUaGUgZGVsdGEgdGltZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrQWN0aXZlXSAtIEluZGljYXRlcyB3aGV0aGVyIGEgc3RlbmNpbCB0ZXN0IG1hc2sgaXMgYWN0aXZlIG9yIG5vdC5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEsIG1hc2tBY3RpdmUpIHtcclxuXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZW5kZXIgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCFcIik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogWW91IG1heSBvdmVycmlkZSB0aGlzIG1ldGhvZCBpbiBjYXNlIHlvdSB3YW50IHRvIGJlIGluZm9ybWVkIGFib3V0IHRoZSBtYWluXHJcblx0ICogcmVuZGVyIHNpemUuXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCBiZWZvcmUgdGhpcyBwYXNzIGlzXHJcblx0ICogaW5pdGlhbGlzZWQgYW5kIGV2ZXJ5IHRpbWUgaXRzIG93biBzaXplIGlzIHVwZGF0ZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgcmVuZGVyZXIncyB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIHJlbmRlcmVyJ3MgaGVpZ2h0LlxyXG5cdCAqIEBleGFtcGxlIHRoaXMubXlSZW5kZXJUYXJnZXQuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtcyBpbml0aWFsaXNhdGlvbiB0YXNrcy5cclxuXHQgKlxyXG5cdCAqIEJ5IG92ZXJyaWRpbmcgdGhpcyBtZXRob2QgeW91IGdhaW4gYWNjZXNzIHRvIHRoZSByZW5kZXJlci4gWW91J2xsIGFsc28gYmVcclxuXHQgKiBhYmxlIHRvIGNvbmZpZ3VyZSB5b3VyIGN1c3RvbSByZW5kZXIgdGFyZ2V0cyB0byB1c2UgdGhlIGFwcHJvcHJpYXRlIGZvcm1hdFxyXG5cdCAqIChSR0Igb3IgUkdCQSkuXHJcblx0ICpcclxuXHQgKiBUaGUgcHJvdmlkZWQgcmVuZGVyZXIgY2FuIGJlIHVzZWQgdG8gd2FybSB1cCBzcGVjaWFsIG9mZi1zY3JlZW4gcmVuZGVyXHJcblx0ICogdGFyZ2V0cyBieSBwZXJmb3JtaW5nIGEgcHJlbGltaW5hcnkgcmVuZGVyIG9wZXJhdGlvbi5cclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gdGhpcyBwYXNzIGlzIGFkZGVkIHRvIGl0c1xyXG5cdCAqIHF1ZXVlLlxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBpbml0aWFsaXNlXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFscGhhIC0gV2hldGhlciB0aGUgcmVuZGVyZXIgdXNlcyB0aGUgYWxwaGEgY2hhbm5lbCBvciBub3QuXHJcblx0ICogQGV4YW1wbGUgaWYoIWFscGhhKSB7IHRoaXMubXlSZW5kZXJUYXJnZXQudGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7IH1cclxuXHQgKi9cclxuXHJcblx0aW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIGEgc2hhbGxvdyBzZWFyY2ggZm9yIHByb3BlcnRpZXMgdGhhdCBkZWZpbmUgYSBkaXNwb3NlIG1ldGhvZCBhbmRcclxuXHQgKiBkZWxldGVzIHRoZW0uIFRoZSBwYXNzIHdpbGwgYmUgaW5vcGVyYXRpdmUgYWZ0ZXIgdGhpcyBtZXRob2Qgd2FzIGNhbGxlZCFcclxuXHQgKlxyXG5cdCAqIERpc3Bvc2FibGUgb2JqZWN0czpcclxuXHQgKiAgLSByZW5kZXIgdGFyZ2V0c1xyXG5cdCAqICAtIG1hdGVyaWFsc1xyXG5cdCAqICAtIHRleHR1cmVzXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIGl0IGlzIGJlaW5nIGRlc3Ryb3llZC5cclxuXHQgKiBZb3UgbWF5LCBob3dldmVyLCB1c2UgaXQgaW5kZXBlbmRlbnRseSB0byBmcmVlIG1lbW9yeSB3aGVuIHlvdSBhcmUgY2VydGFpblxyXG5cdCAqIHRoYXQgeW91IGRvbid0IG5lZWQgdGhpcyBwYXNzIGFueW1vcmUuXHJcblx0ICovXHJcblxyXG5cdGRpc3Bvc2UoKSB7XHJcblxyXG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cclxuXHRcdGxldCBrZXk7XHJcblxyXG5cdFx0Zm9yKGtleSBvZiBrZXlzKSB7XHJcblxyXG5cdFx0XHRpZih0aGlzW2tleV0gIT09IG51bGwgJiYgdHlwZW9mIHRoaXNba2V5XS5kaXNwb3NlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHJcblx0XHRcdFx0dGhpc1trZXldLmRpc3Bvc2UoKTtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBudWxsO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFVzZWQgZm9yIHNhdmluZyB0aGUgb3JpZ2luYWwgY2xlYXIgY29sb3Igb2YgdGhlIHJlbmRlcmVyLlxyXG4gKlxyXG4gKiBAdHlwZSBDb2xvclxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5cclxuY29uc3QgY29sb3IgPSBuZXcgQ29sb3IoKTtcclxuXHJcbi8qKlxyXG4gKiBBIGNsZWFyIHBhc3MuXHJcbiAqXHJcbiAqIFlvdSBjYW4gcHJldmVudCBzcGVjaWZpYyBidWZmZXJzIGZyb20gYmVpbmcgY2xlYXJlZCBieSBzZXR0aW5nIGVpdGhlciB0aGVcclxuICogYXV0b0NsZWFyQ29sb3IsIGF1dG9DbGVhclN0ZW5jaWwgb3IgYXV0b0NsZWFyRGVwdGggcHJvcGVydGllcyBvZiB0aGUgcmVuZGVyZXJcclxuICogdG8gZmFsc2UuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNsZWFyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7Q29sb3J9IFtvcHRpb25zLmNsZWFyQ29sb3I9bnVsbF0gLSBBbiBvdmVycmlkZSBjbGVhciBjb2xvci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2xlYXJBbHBoYT0wLjBdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgYWxwaGEuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKG51bGwsIG51bGwsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJDbGVhclBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFyIGNvbG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb2xvcn1cclxuXHRcdCAqIEBkZWZhdWx0IG51bGxcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJDb2xvciA9IChvcHRpb25zLmNsZWFyQ29sb3IgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyQ29sb3IgOiBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXIgYWxwaGEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBkZWZhdWx0IDAuMFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckFscGhhID0gKG9wdGlvbnMuY2xlYXJBbHBoYSAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJBbHBoYSA6IDAuMDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbGVhcnMgdGhlIHJlYWQgYnVmZmVyIG9yIHRoZSBzY3JlZW4uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IGNsZWFyQ29sb3IgPSB0aGlzLmNsZWFyQ29sb3I7XHJcblxyXG5cdFx0bGV0IGNsZWFyQWxwaGE7XHJcblxyXG5cdFx0aWYoY2xlYXJDb2xvciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0Y29sb3IuY29weShyZW5kZXJlci5nZXRDbGVhckNvbG9yKCkpO1xyXG5cdFx0XHRjbGVhckFscGhhID0gcmVuZGVyZXIuZ2V0Q2xlYXJBbHBoYSgpO1xyXG5cdFx0XHRyZW5kZXJlci5zZXRDbGVhckNvbG9yKGNsZWFyQ29sb3IsIHRoaXMuY2xlYXJBbHBoYSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHJlYWRCdWZmZXIpO1xyXG5cdFx0cmVuZGVyZXIuY2xlYXIoKTtcclxuXHJcblx0XHRpZihjbGVhckNvbG9yICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRDbGVhckNvbG9yKGNvbG9yLCBjbGVhckFscGhhKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHBhc3MgdGhhdCBkaXNhYmxlcyB0aGUgc3RlbmNpbCBtYXNrLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGVhck1hc2tQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY2xlYXIgbWFzayBwYXNzLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcihudWxsLCBudWxsLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQ2xlYXJNYXNrUGFzc1wiO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc2FibGVzIHRoZSBzdGVuY2lsIHRlc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIpIHtcclxuXHJcblx0XHRyZW5kZXJlci5zdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0VGVzdChmYWxzZSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGF0YVRleHR1cmUsIFJHQkZvcm1hdCwgRmxvYXRUeXBlIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IEdsaXRjaE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsb3cgLSBUaGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGlnaCAtIFRoZSBoaWdoZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByYW5kb20gdmFsdWUuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcmFuZG9tSW50KGxvdywgaGlnaCkge1xyXG5cclxuXHRyZXR1cm4gbG93ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGhpZ2ggLSBsb3cgKyAxKSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsb3cgLSBUaGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGlnaCAtIFRoZSBoaWdoZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByYW5kb20gdmFsdWUuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcmFuZG9tRmxvYXQobG93LCBoaWdoKSB7XHJcblxyXG5cdHJldHVybiBsb3cgKyBNYXRoLnJhbmRvbSgpICogKGhpZ2ggLSBsb3cpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZ2xpdGNoIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEdsaXRjaFBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBnbGl0Y2ggcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge1RleHR1cmV9IFtvcHRpb25zLnBlcnR1cmJNYXBdIC0gQSBwZXJ0dXJiYXRpb24gbWFwLiBJZiBub25lIGlzIHByb3ZpZGVkLCBhIG5vaXNlIHRleHR1cmUgd2lsbCBiZSBjcmVhdGVkLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdFNpemU9NjRdIC0gVGhlIHNpemUgb2YgdGhlIGdlbmVyYXRlZCBub2lzZSBtYXAuIFdpbGwgYmUgaWdub3JlZCBpZiBhIHBlcnR1cmJhdGlvbiBtYXAgaXMgcHJvdmlkZWQuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkdsaXRjaFBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHbGl0Y2ggc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtHbGl0Y2hNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbmV3IEdsaXRjaE1hdGVyaWFsKCk7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcGVydHVyYmF0aW9uIG1hcC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRleHR1cmUgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMucGVydHVyYk1hcCA9IChvcHRpb25zLnBlcnR1cmJNYXAgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnBlcnR1cmJNYXAgOiB0aGlzLmdlbmVyYXRlUGVydHVyYk1hcChvcHRpb25zLmR0U2l6ZSk7XHJcblx0XHR0aGlzLnBlcnR1cmJNYXAubmFtZSA9IFwiR2xpdGNoLlBlcnR1cmJhdGlvblwiO1xyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVmZmVjdCBtb2RlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtHbGl0Y2hNb2RlfVxyXG5cdFx0ICogQGRlZmF1bHQgR2xpdGNoTW9kZS5TUE9SQURJQ1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tb2RlID0gR2xpdGNoTW9kZS5TUE9SQURJQztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENvdW50ZXIgZm9yIGdsaXRjaCBhY3RpdmF0aW9uIGFuZCBkZWFjdGl2YXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvdW50ZXIgPSAwO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSByYW5kb20gYnJlYWsgcG9pbnQgZm9yIHRoZSBzcG9yYWRpYyBnbGl0Y2ggYWN0aXZhdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYnJlYWtQb2ludCA9IHJhbmRvbUludCgxMjAsIDI0MCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgcGVydHVyYmF0aW9uIG1hcC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdCAqL1xyXG5cclxuXHRnZXQgcGVydHVyYk1hcCgpIHsgcmV0dXJuIHRoaXMudGV4dHVyZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBc3NpZ25pbmcgYSBuZXcgcGVydHVyYmF0aW9uIG1hcCBkb2VzIG5vdCBkZXN0cm95IHRoZSBjdXJyZW50IG9uZSFcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtUZXh0dXJlfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgcGVydHVyYk1hcCh4KSB7XHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlID0geDtcclxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudFBlcnR1cmIudmFsdWUgPSB4O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IHBlcnR1cmJhdGlvbiBtYXAgYW5kIHJlcGxhY2VzIGl0IHdpdGggYSBuZXcgb25lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtzaXplPTY0XSAtIFRoZSB0ZXh0dXJlIHNpemUuXHJcblx0ICogQHJldHVybiB7RGF0YVRleHR1cmV9IFRoZSBwZXJ0dXJiYXRpb24gdGV4dHVyZS5cclxuXHQgKi9cclxuXHJcblx0Z2VuZXJhdGVQZXJ0dXJiTWFwKHNpemUgPSA2NCkge1xyXG5cclxuXHRcdGNvbnN0IHBpeGVscyA9IHNpemUgKiBzaXplO1xyXG5cdFx0Y29uc3QgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkocGl4ZWxzICogMyk7XHJcblxyXG5cdFx0bGV0IGR0ID0gdGhpcy5wZXJ0dXJiTWFwO1xyXG5cdFx0bGV0IGksIHg7XHJcblxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgcGl4ZWxzOyArK2kpIHtcclxuXHJcblx0XHRcdHggPSBNYXRoLnJhbmRvbSgpO1xyXG5cclxuXHRcdFx0ZGF0YVtpICogM10gPSB4O1xyXG5cdFx0XHRkYXRhW2kgKiAzICsgMV0gPSB4O1xyXG5cdFx0XHRkYXRhW2kgKiAzICsgMl0gPSB4O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZihkdCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0ZHQuZGlzcG9zZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRkdCA9IG5ldyBEYXRhVGV4dHVyZShkYXRhLCBzaXplLCBzaXplLCBSR0JGb3JtYXQsIEZsb2F0VHlwZSk7XHJcblx0XHRkdC5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwID0gZHQ7XHJcblxyXG5cdFx0cmV0dXJuIGR0O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBtb2RlID0gdGhpcy5tb2RlO1xyXG5cdFx0Y29uc3QgY291bnRlciA9IHRoaXMuY291bnRlcjtcclxuXHRcdGNvbnN0IGJyZWFrUG9pbnQgPSB0aGlzLmJyZWFrUG9pbnQ7XHJcblx0XHRjb25zdCB1bmlmb3JtcyA9IHRoaXMubWF0ZXJpYWwudW5pZm9ybXM7XHJcblxyXG5cdFx0dW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR1bmlmb3Jtcy5zZWVkLnZhbHVlID0gTWF0aC5yYW5kb20oKTtcclxuXHRcdHVuaWZvcm1zLmFjdGl2ZS52YWx1ZSA9IHRydWU7XHJcblxyXG5cdFx0aWYoY291bnRlciAlIGJyZWFrUG9pbnQgPT09IDAgfHwgbW9kZSA9PT0gR2xpdGNoTW9kZS5DT05TVEFOVF9XSUxEKSB7XHJcblxyXG5cdFx0XHR1bmlmb3Jtcy5hbW91bnQudmFsdWUgPSBNYXRoLnJhbmRvbSgpIC8gMzAuMDtcclxuXHRcdFx0dW5pZm9ybXMuYW5nbGUudmFsdWUgPSByYW5kb21GbG9hdCgtTWF0aC5QSSwgTWF0aC5QSSk7XHJcblx0XHRcdHVuaWZvcm1zLnNlZWRYLnZhbHVlID0gcmFuZG9tRmxvYXQoLTEuMCwgMS4wKTtcclxuXHRcdFx0dW5pZm9ybXMuc2VlZFkudmFsdWUgPSByYW5kb21GbG9hdCgtMS4wLCAxLjApO1xyXG5cdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWC52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblkudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblxyXG5cdFx0XHR0aGlzLmJyZWFrUG9pbnQgPSByYW5kb21JbnQoMTIwLCAyNDApO1xyXG5cdFx0XHR0aGlzLmNvdW50ZXIgPSAwO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZihjb3VudGVyICUgYnJlYWtQb2ludCA8IGJyZWFrUG9pbnQgLyA1IHx8IG1vZGUgPT09IEdsaXRjaE1vZGUuQ09OU1RBTlRfTUlMRCkge1xyXG5cclxuXHRcdFx0XHR1bmlmb3Jtcy5hbW91bnQudmFsdWUgPSBNYXRoLnJhbmRvbSgpIC8gOTAuMDtcclxuXHRcdFx0XHR1bmlmb3Jtcy5hbmdsZS52YWx1ZSA9IHJhbmRvbUZsb2F0KC1NYXRoLlBJLCBNYXRoLlBJKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWC52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5kaXN0b3J0aW9uWS52YWx1ZSA9IHJhbmRvbUZsb2F0KDAuMCwgMS4wKTtcclxuXHRcdFx0XHR1bmlmb3Jtcy5zZWVkWC52YWx1ZSA9IHJhbmRvbUZsb2F0KC0wLjMsIDAuMyk7XHJcblx0XHRcdFx0dW5pZm9ybXMuc2VlZFkudmFsdWUgPSByYW5kb21GbG9hdCgtMC4zLCAwLjMpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gU3BvcmFkaWMuXHJcblx0XHRcdFx0dW5pZm9ybXMuYWN0aXZlLnZhbHVlID0gZmFsc2U7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdCsrdGhpcy5jb3VudGVyO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGdsaXRjaCBtb2RlIGVudW1lcmF0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gU1BPUkFESUMgLSBTcG9yYWRpYyBnbGl0Y2hlcy5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENPTlNUQU5UX01JTEQgLSBDb25zdGFudCBtaWxkIGdsaXRjaGVzLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ09OU1RBTlRfV0lMRCAtIENvbnN0YW50IHdpbGQgZ2xpdGNoZXMuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEdsaXRjaE1vZGUgPSB7XHJcblxyXG5cdFNQT1JBRElDOiAwLFxyXG5cdENPTlNUQU5UX01JTEQ6IDEsXHJcblx0Q09OU1RBTlRfV0lMRDogMlxyXG5cclxufTtcclxuIiwiaW1wb3J0IHsgQ2xlYXJQYXNzIH0gZnJvbSBcIi4vY2xlYXIuanNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHBhc3MgdGhhdCByZW5kZXJzIGEgZ2l2ZW4gc2NlbmUgZGlyZWN0bHkgb24gc2NyZWVuIG9yIGludG8gdGhlIHJlYWQgYnVmZmVyXHJcbiAqIGZvciBmdXJ0aGVyIHByb2Nlc3NpbmcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyByZW5kZXIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lIC0gVGhlIHNjZW5lIHRvIHJlbmRlci5cclxuXHQgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIC0gVGhlIGNhbWVyYSB0byB1c2UgdG8gcmVuZGVyIHRoZSBzY2VuZS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TWF0ZXJpYWx9IFtvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWw9bnVsbF0gLSBBbiBvdmVycmlkZSBtYXRlcmlhbCBmb3IgdGhlIHNjZW5lLlxyXG5cdCAqIEBwYXJhbSB7Q29sb3J9IFtvcHRpb25zLmNsZWFyQ29sb3I9bnVsbF0gLSBBbiBvdmVycmlkZSBjbGVhciBjb2xvci5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2xlYXJBbHBoYT0xLjBdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgYWxwaGEuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGVhckRlcHRoPWZhbHNlXSAtIFdoZXRoZXIgZGVwdGggc2hvdWxkIGJlIGNsZWFyZWQgZXhwbGljaXRseS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsZWFyPXRydWVdIC0gV2hldGhlciBhbGwgYnVmZmVycyBzaG91bGQgYmUgY2xlYXJlZC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIGNhbWVyYSwgb3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoc2NlbmUsIGNhbWVyYSwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlJlbmRlclBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY2xlYXIgcGFzcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q2xlYXJQYXNzfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhclBhc3MgPSBuZXcgQ2xlYXJQYXNzKG9wdGlvbnMpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQW4gb3ZlcnJpZGUgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge01hdGVyaWFsfVxyXG5cdFx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5vdmVycmlkZU1hdGVyaWFsID0gKG9wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMub3ZlcnJpZGVNYXRlcmlhbCA6IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZGVwdGggYnVmZmVyIHNob3VsZCBiZSBjbGVhcmVkIGV4cGxpY2l0bHkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhckRlcHRoID0gKG9wdGlvbnMuY2xlYXJEZXB0aCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuY2xlYXJEZXB0aCA6IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvbG9yLCBkZXB0aCBhbmQgc3RlbmNpbCBidWZmZXJzIHNob3VsZCBiZSBjbGVhcmVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEV2ZW4gd2l0aCBjbGVhciBzZXQgdG8gdHJ1ZSB5b3UgY2FuIHByZXZlbnQgc3BlY2lmaWMgYnVmZmVycyBmcm9tIGJlaW5nXHJcblx0XHQgKiBjbGVhcmVkIGJ5IHNldHRpbmcgZWl0aGVyIHRoZSBhdXRvQ2xlYXJDb2xvciwgYXV0b0NsZWFyU3RlbmNpbCBvclxyXG5cdFx0ICogYXV0b0NsZWFyRGVwdGggcHJvcGVydGllcyBvZiB0aGUgcmVuZGVyZXIgdG8gZmFsc2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyID0gKG9wdGlvbnMuY2xlYXIgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyIDogdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBzY2VuZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiByZWFkQnVmZmVyO1xyXG5cclxuXHRcdGlmKHRoaXMuY2xlYXIpIHtcclxuXHJcblx0XHRcdHRoaXMuY2xlYXJQYXNzLnJlbmRlcihyZW5kZXJlciwgdGFyZ2V0KTtcclxuXHJcblx0XHR9IGVsc2UgaWYodGhpcy5jbGVhckRlcHRoKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQodGFyZ2V0KTtcclxuXHRcdFx0cmVuZGVyZXIuY2xlYXJEZXB0aCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gdGhpcy5vdmVycmlkZU1hdGVyaWFsO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSwgdGFyZ2V0KTtcclxuXHRcdHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBtYXNrIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hc2tQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgbWFzayBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgLSBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgY2FtZXJhIHRvIHVzZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIGNhbWVyYSkge1xyXG5cclxuXHRcdHN1cGVyKHNjZW5lLCBjYW1lcmEsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJNYXNrUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW52ZXJzZSBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuaW52ZXJzZSA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU3RlbmNpbCBidWZmZXIgY2xlYXIgZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IHRydWVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJTdGVuY2lsID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgc3RlbmNpbCBiaXQgbWFzay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHRcdGNvbnN0IHN0YXRlID0gcmVuZGVyZXIuc3RhdGU7XHJcblxyXG5cdFx0Y29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG5cdFx0Y29uc3QgY2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcblxyXG5cdFx0Y29uc3Qgd3JpdGVWYWx1ZSA9IHRoaXMuaW52ZXJzZSA/IDAgOiAxO1xyXG5cdFx0Y29uc3QgY2xlYXJWYWx1ZSA9IDEgLSB3cml0ZVZhbHVlO1xyXG5cclxuXHRcdC8vIERvbid0IHVwZGF0ZSBjb2xvciBvciBkZXB0aC5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TWFzayhmYWxzZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldE1hc2soZmFsc2UpO1xyXG5cclxuXHRcdC8vIExvY2sgdGhlIGJ1ZmZlcnMuXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldExvY2tlZCh0cnVlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TG9ja2VkKHRydWUpO1xyXG5cclxuXHRcdC8vIENvbmZpZ3VyZSB0aGUgc3RlbmNpbC5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRUZXN0KHRydWUpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldE9wKGNvbnRleHQuUkVQTEFDRSwgY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldEZ1bmMoY29udGV4dC5BTFdBWVMsIHdyaXRlVmFsdWUsIDB4ZmZmZmZmZmYpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldENsZWFyKGNsZWFyVmFsdWUpO1xyXG5cclxuXHRcdC8vIENsZWFyIHRoZSBzdGVuY2lsLlxyXG5cdFx0aWYodGhpcy5jbGVhclN0ZW5jaWwpIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldChyZWFkQnVmZmVyKTtcclxuXHRcdFx0cmVuZGVyZXIuY2xlYXJTdGVuY2lsKCk7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQod3JpdGVCdWZmZXIpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhclN0ZW5jaWwoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgbWFzayBpbnRvIGJvdGggYnVmZmVycy5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCByZWFkQnVmZmVyKTtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdFx0Ly8gVW5sb2NrIHRoZSBidWZmZXJzLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRMb2NrZWQoZmFsc2UpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRMb2NrZWQoZmFsc2UpO1xyXG5cclxuXHRcdC8vIE9ubHkgcmVuZGVyIHdoZXJlIHRoZSBzdGVuY2lsIGlzIHNldCB0byAxLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldEZ1bmMoY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0T3AoY29udGV4dC5LRUVQLCBjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHNoYWRlciBwYXNzLlxyXG4gKlxyXG4gKiBVc2VkIHRvIHJlbmRlciBhbnkgc2hhZGVyIG1hdGVyaWFsIGFzIGEgMkQgZmlsdGVyLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgc2hhZGVyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NoYWRlck1hdGVyaWFsfSBtYXRlcmlhbCAtIFRoZSBzaGFkZXIgbWF0ZXJpYWwgdG8gdXNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbdGV4dHVyZUlEPVwidERpZmZ1c2VcIl0gLSBUaGUgdGV4dHVyZSB1bmlmb3JtIGlkZW50aWZpZXIuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsLCB0ZXh0dXJlSUQgPSBcInREaWZmdXNlXCIpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTaGFkZXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNoYWRlciBtYXRlcmlhbCB0byB1c2UgZm9yIHJlbmRlcmluZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hhZGVyTWF0ZXJpYWx9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoZSBjb2xvciBzYW1wbGVyIHVuaWZvcm0gb2YgdGhlIGdpdmVuIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKiBAZGVmYXVsdCBcInREaWZmdXNlXCJcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZUlEID0gdGV4dHVyZUlEO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRpZih0aGlzLm1hdGVyaWFsLnVuaWZvcm1zW3RoaXMudGV4dHVyZUlEXSAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zW3RoaXMudGV4dHVyZUlEXS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IENvcHlNYXRlcmlhbCwgU2hvY2tXYXZlTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogSGFsZiBQSS5cclxuICpcclxuICogQHR5cGUge051bWJlcn1cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCBIQUxGX1BJID0gTWF0aC5QSSAqIDAuNTtcclxuXHJcbi8qKlxyXG4gKiBBIHZlY3Rvci5cclxuICpcclxuICogQHR5cGUge1ZlY3RvcjN9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG4vKipcclxuICogQSB2ZWN0b3IuXHJcbiAqXHJcbiAqIEB0eXBlIHtWZWN0b3IzfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IGFiID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbi8qKlxyXG4gKiBBIHNob2NrIHdhdmUgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2hvY2tXYXZlUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHNob2NrIHdhdmUgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgbWFpbiBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtWZWN0b3IzfSBbZXBpY2VudGVyXSAtIFRoZSB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgc2hvY2sgd2F2ZSBlcGljZW50ZXIuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zcGVlZD0xLjBdIC0gVGhlIGFuaW1hdGlvbiBzcGVlZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UmFkaXVzPTEuMF0gLSBUaGUgZXh0ZW50IG9mIHRoZSBzaG9jayB3YXZlLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53YXZlU2l6ZT0wLjJdIC0gVGhlIHdhdmUgc2l6ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYW1wbGl0dWRlPTAuMDVdIC0gVGhlIGRpc3RvcnRpb24gYW1wbGl0dWRlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYW1lcmEsIGVwaWNlbnRlciA9IG5ldyBWZWN0b3IzKCksIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlNob2NrV2F2ZVBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbWFpbiBjYW1lcmEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdDNEfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYWluQ2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVwaWNlbnRlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VmVjdG9yM31cclxuXHRcdCAqIEBleGFtcGxlIHNob2NrV2F2ZVBhc3MuZXBpY2VudGVyID0gbXlNZXNoLnBvc2l0aW9uO1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5lcGljZW50ZXIgPSBlcGljZW50ZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgb2JqZWN0IHBvc2l0aW9uIGluIHNjcmVlbiBzcGFjZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VmVjdG9yM31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjcmVlblBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzcGVlZCBvZiB0aGUgc2hvY2sgd2F2ZSBhbmltYXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBkZWZhdWx0IDIuMFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zcGVlZCA9IChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5zcGVlZCA6IDIuMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgdGltZSBhY2N1bXVsYXRvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGltZSA9IDAuMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzaG9jayB3YXZlIGFuaW1hdGlvbiBpcyBhY3RpdmUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgc2hvY2sgd2F2ZSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1Nob2NrV2F2ZU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwgPSBuZXcgU2hvY2tXYXZlTWF0ZXJpYWwob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbC51bmlmb3Jtcy5jZW50ZXIudmFsdWUgPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb3B5IHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29weU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsID0gbmV3IENvcHlNYXRlcmlhbCgpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVtaXRzIHRoZSBzaG9jayB3YXZlLlxyXG5cdCAqL1xyXG5cclxuXHRleHBsb2RlKCkge1xyXG5cclxuXHRcdHRoaXMudGltZSA9IDAuMDtcclxuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YSAtIFRoZSByZW5kZXIgZGVsdGEgdGltZS5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEpIHtcclxuXHJcblx0XHRjb25zdCBlcGljZW50ZXIgPSB0aGlzLmVwaWNlbnRlcjtcclxuXHRcdGNvbnN0IG1haW5DYW1lcmEgPSB0aGlzLm1haW5DYW1lcmE7XHJcblx0XHRjb25zdCBzY3JlZW5Qb3NpdGlvbiA9IHRoaXMuc2NyZWVuUG9zaXRpb247XHJcblxyXG5cdFx0Y29uc3Qgc2hvY2tXYXZlTWF0ZXJpYWwgPSB0aGlzLnNob2NrV2F2ZU1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSBzaG9ja1dhdmVNYXRlcmlhbC51bmlmb3JtcztcclxuXHRcdGNvbnN0IGNlbnRlciA9IHVuaWZvcm1zLmNlbnRlcjtcclxuXHRcdGNvbnN0IHJhZGl1cyA9IHVuaWZvcm1zLnJhZGl1cztcclxuXHRcdGNvbnN0IG1heFJhZGl1cyA9IHVuaWZvcm1zLm1heFJhZGl1cztcclxuXHRcdGNvbnN0IHdhdmVTaXplID0gdW5pZm9ybXMud2F2ZVNpemU7XHJcblxyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLmNvcHlNYXRlcmlhbDtcclxuXHJcblx0XHRpZih0aGlzLmFjdGl2ZSkge1xyXG5cclxuXHRcdFx0Ly8gQ2FsY3VsYXRlIGRpcmVjdGlvbiB2ZWN0b3JzLlxyXG5cdFx0XHRtYWluQ2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKHYpO1xyXG5cdFx0XHRhYi5jb3B5KG1haW5DYW1lcmEucG9zaXRpb24pLnN1YihlcGljZW50ZXIpO1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgcmVuZGVyIHRoZSBlZmZlY3QgaWYgdGhlIG9iamVjdCBpcyBiZWhpbmQgdGhlIGNhbWVyYS5cclxuXHRcdFx0aWYodi5hbmdsZVRvKGFiKSA+IEhBTEZfUEkpIHtcclxuXHJcblx0XHRcdFx0Ly8gU2NhbGUgdGhlIGVmZmVjdCBiYXNlZCBvbiBkaXN0YW5jZSB0byB0aGUgb2JqZWN0LlxyXG5cdFx0XHRcdHVuaWZvcm1zLmNhbWVyYURpc3RhbmNlLnZhbHVlID0gbWFpbkNhbWVyYS5wb3NpdGlvbi5kaXN0YW5jZVRvKGVwaWNlbnRlcik7XHJcblxyXG5cdFx0XHRcdC8vIENhbGN1bGF0ZSB0aGUgc2NyZWVuIHBvc2l0aW9uIG9mIHRoZSBlcGljZW50ZXIuXHJcblx0XHRcdFx0c2NyZWVuUG9zaXRpb24uY29weShlcGljZW50ZXIpLnByb2plY3QobWFpbkNhbWVyYSk7XHJcblx0XHRcdFx0Y2VudGVyLnZhbHVlLnggPSAoc2NyZWVuUG9zaXRpb24ueCArIDEuMCkgKiAwLjU7XHJcblx0XHRcdFx0Y2VudGVyLnZhbHVlLnkgPSAoc2NyZWVuUG9zaXRpb24ueSArIDEuMCkgKiAwLjU7XHJcblxyXG5cdFx0XHRcdHVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0XHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHNob2NrV2F2ZU1hdGVyaWFsO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBzaG9jayB3YXZlIHJhZGl1cyBiYXNlZCBvbiB0aW1lLlxyXG5cdFx0XHR0aGlzLnRpbWUgKz0gZGVsdGE7XHJcblx0XHRcdHJhZGl1cy52YWx1ZSA9IHRoaXMudGltZSAqIHRoaXMuc3BlZWQgLSB3YXZlU2l6ZS52YWx1ZTtcclxuXHJcblx0XHRcdGlmKHJhZGl1cy52YWx1ZSA+PSAobWF4UmFkaXVzLnZhbHVlICsgd2F2ZVNpemUudmFsdWUpICogMikge1xyXG5cclxuXHRcdFx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbC51bmlmb3Jtcy5hc3BlY3QudmFsdWUgPSB3aWR0aCAvIGhlaWdodDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQSBjb21waWxhdGlvbiBvZiB0aGUgcG9zdCBwcm9jZXNzaW5nIHBhc3Nlcy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9wYXNzZXNcclxuICovXHJcblxyXG5leHBvcnQgeyBCbG9vbVBhc3MgfSBmcm9tIFwiLi9ibG9vbS5qc1wiO1xyXG5leHBvcnQgeyBCbHVyUGFzcyB9IGZyb20gXCIuL2JsdXIuanNcIjtcclxuZXhwb3J0IHsgQm9rZWhQYXNzIH0gZnJvbSBcIi4vYm9rZWguanNcIjtcclxuZXhwb3J0IHsgQm9rZWgyUGFzcyB9IGZyb20gXCIuL2Jva2VoMi5qc1wiO1xyXG5leHBvcnQgeyBDbGVhclBhc3MgfSBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5leHBvcnQgeyBDbGVhck1hc2tQYXNzIH0gZnJvbSBcIi4vY2xlYXItbWFzay5qc1wiO1xyXG5leHBvcnQgeyBEb3RTY3JlZW5QYXNzIH0gZnJvbSBcIi4vZG90LXNjcmVlbi5qc1wiO1xyXG5leHBvcnQgeyBEZXB0aFBhc3MgfSBmcm9tIFwiLi9kZXB0aC5qc1wiO1xyXG5leHBvcnQgeyBGaWxtUGFzcyB9IGZyb20gXCIuL2ZpbG0uanNcIjtcclxuZXhwb3J0IHsgR2xpdGNoTW9kZSwgR2xpdGNoUGFzcyB9IGZyb20gXCIuL2dsaXRjaC5qc1wiO1xyXG5leHBvcnQgeyBHb2RSYXlzUGFzcyB9IGZyb20gXCIuL2dvZC1yYXlzLmpzXCI7XHJcbmV4cG9ydCB7IE1hc2tQYXNzIH0gZnJvbSBcIi4vbWFzay5qc1wiO1xyXG5leHBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5leHBvcnQgeyBQaXhlbGF0aW9uUGFzcyB9IGZyb20gXCIuL3BpeGVsYXRpb24uanNcIjtcclxuZXhwb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gXCIuL3JlbmRlci5qc1wiO1xyXG5leHBvcnQgeyBTYXZlUGFzcyB9IGZyb20gXCIuL3NhdmUuanNcIjtcclxuZXhwb3J0IHsgU2hhZGVyUGFzcyB9IGZyb20gXCIuL3NoYWRlci5qc1wiO1xyXG5leHBvcnQgeyBTaG9ja1dhdmVQYXNzIH0gZnJvbSBcIi4vc2hvY2std2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTTUFBUGFzcyB9IGZyb20gXCIuL3NtYWEuanNcIjtcclxuZXhwb3J0IHsgVGV4dHVyZVBhc3MgfSBmcm9tIFwiLi90ZXh0dXJlLmpzXCI7XHJcbmV4cG9ydCB7IFRvbmVNYXBwaW5nUGFzcyB9IGZyb20gXCIuL3RvbmUtbWFwcGluZy5qc1wiO1xyXG4iLCJpbXBvcnQge1xyXG5cdERlcHRoU3RlbmNpbEZvcm1hdCxcclxuXHREZXB0aFRleHR1cmUsXHJcblx0TGluZWFyRmlsdGVyLFxyXG5cdFJHQkFGb3JtYXQsXHJcblx0UkdCRm9ybWF0LFxyXG5cdFVuc2lnbmVkSW50MjQ4VHlwZSxcclxuXHRXZWJHTFJlbmRlclRhcmdldFxyXG59IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IHsgQ2xlYXJNYXNrUGFzcywgTWFza1Bhc3MsIFNoYWRlclBhc3MgfSBmcm9tIFwiLi4vcGFzc2VzXCI7XHJcbmltcG9ydCB7IENvcHlNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRWZmZWN0Q29tcG9zZXIgbWF5IGJlIHVzZWQgaW4gcGxhY2Ugb2YgYSBub3JtYWwgV2ViR0xSZW5kZXJlci5cclxuICpcclxuICogVGhlIGF1dG8gY2xlYXIgYmVoYXZpb3VyIG9mIHRoZSBwcm92aWRlZCByZW5kZXJlciB3aWxsIGJlIGRpc2FibGVkIHRvIHByZXZlbnRcclxuICogdW5uZWNlc3NhcnkgY2xlYXIgb3BlcmF0aW9ucy5cclxuICpcclxuICogSXQgaXMgY29tbW9uIHByYWN0aWNlIHRvIHVzZSBhIHtAbGluayBSZW5kZXJQYXNzfSBhcyB0aGUgZmlyc3QgcGFzcyB0b1xyXG4gKiBhdXRvbWF0aWNhbGx5IGNsZWFyIHRoZSBzY3JlZW4gYW5kIHJlbmRlciB0aGUgc2NlbmUgdG8gYSB0ZXh0dXJlIGZvciBmdXJ0aGVyXHJcbiAqIHByb2Nlc3NpbmcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEVmZmVjdENvbXBvc2VyIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBlZmZlY3QgY29tcG9zZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IFtyZW5kZXJlcl0gLSBUaGUgcmVuZGVyZXIgdGhhdCBzaG91bGQgYmUgdXNlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kZXB0aEJ1ZmZlcj10cnVlXSAtIFdoZXRoZXIgdGhlIG1haW4gcmVuZGVyIHRhcmdldHMgc2hvdWxkIGhhdmUgYSBkZXB0aCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zdGVuY2lsQnVmZmVyPWZhbHNlXSAtIFdoZXRoZXIgdGhlIG1haW4gcmVuZGVyIHRhcmdldHMgc2hvdWxkIGhhdmUgYSBzdGVuY2lsIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRlcHRoVGV4dHVyZT1mYWxzZV0gLSBTZXQgdG8gdHJ1ZSBpZiBvbmUgb2YgeW91ciBwYXNzZXMgcmVsaWVzIG9uIGEgZGVwdGggdGV4dHVyZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IocmVuZGVyZXIgPSBudWxsLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZW5kZXJlci5cclxuXHRcdCAqXHJcblx0XHQgKiBZb3UgbWF5IHJlcGxhY2UgdGhlIHJlbmRlcmVyIGF0IGFueSB0aW1lIGJ5IHVzaW5nXHJcblx0XHQgKiB7QGxpbmsgRWZmZWN0Q29tcG9zZXIjcmVwbGFjZVJlbmRlcmVyfS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJlcn1cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZWFkIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBSZWFkaW5nIGZyb20gYW5kIHdyaXRpbmcgdG8gdGhlIHNhbWUgcmVuZGVyIHRhcmdldCBzaG91bGQgYmUgYXZvaWRlZC5cclxuXHRcdCAqIFRoZXJlZm9yZSwgdHdvIHNlcGVyYXRlIHlldCBpZGVudGljYWwgYnVmZmVycyBhcmUgdXNlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMud3JpdGVCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdGlmKHRoaXMucmVuZGVyZXIgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcihcclxuXHRcdFx0XHQob3B0aW9ucy5kZXB0aEJ1ZmZlciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuZGVwdGhCdWZmZXIgOiB0cnVlLFxyXG5cdFx0XHRcdChvcHRpb25zLnN0ZW5jaWxCdWZmZXIgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnN0ZW5jaWxCdWZmZXIgOiBmYWxzZSxcclxuXHRcdFx0XHQob3B0aW9ucy5kZXB0aFRleHR1cmUgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmRlcHRoVGV4dHVyZSA6IGZhbHNlXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLmNsb25lKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb3B5IHBhc3MgdXNlZCBmb3IgY29weWluZyBtYXNrZWQgc2NlbmVzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTaGFkZXJQYXNzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weVBhc3MgPSBuZXcgU2hhZGVyUGFzcyhuZXcgQ29weU1hdGVyaWFsKCkpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHBhc3Nlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UGFzc1tdfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucGFzc2VzID0gW107XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRlcHRoIHRleHR1cmUgb2YgdGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7RGVwdGhUZXh0dXJlfVxyXG5cdCAqIEBkZWZhdWx0IG51bGxcclxuXHQgKi9cclxuXHJcblx0Z2V0IGRlcHRoVGV4dHVyZSgpIHsgcmV0dXJuIHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJlYWQgYW5kIHdyaXRlIGJ1ZmZlcnMgc2hhcmUgYSBzaW5nbGUgZGVwdGggdGV4dHVyZS4gRGVwdGggd2lsbCBiZVxyXG5cdCAqIHdyaXR0ZW4gdG8gdGhpcyB0ZXh0dXJlIHdoZW4gc29tZXRoaW5nIGlzIHJlbmRlcmVkIGludG8gb25lIG9mIHRoZSBidWZmZXJzXHJcblx0ICogYW5kIHRoZSBpbnZvbHZlZCBtYXRlcmlhbHMgaGF2ZSBkZXB0aCB3cml0ZSBlbmFibGVkLlxyXG5cdCAqXHJcblx0ICogWW91IG1heSBlbmFibGUgdGhpcyBtZWNoYW5pc20gZHVyaW5nIHRoZSBpbnN0YW50aWF0aW9uIG9mIHRoZSBjb21wb3NlciBvclxyXG5cdCAqIGJ5IGFzc2lnbmluZyBhIERlcHRoVGV4dHVyZSBpbnN0YW5jZSBsYXRlciBvbi4gWW91IG1heSBhbHNvIGRpc2FibGUgaXQgYnlcclxuXHQgKiBhc3NpZ25pbmcgbnVsbC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEZXB0aFRleHR1cmV9XHJcblx0ICovXHJcblxyXG5cdHNldCBkZXB0aFRleHR1cmUoeCkge1xyXG5cclxuXHRcdHRoaXMucmVhZEJ1ZmZlci5kZXB0aFRleHR1cmUgPSB4O1xyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlci5kZXB0aFRleHR1cmUgPSB4O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBjdXJyZW50IHJlbmRlcmVyIHdpdGggdGhlIGdpdmVuIG9uZS4gVGhlIERPTSBlbGVtZW50IG9mIHRoZVxyXG5cdCAqIGN1cnJlbnQgcmVuZGVyZXIgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IG5vZGUgYW5kIHRoZVxyXG5cdCAqIERPTSBlbGVtZW50IG9mIHRoZSBuZXcgcmVuZGVyZXIgd2lsbCB0YWtlIGl0cyBwbGFjZS5cclxuXHQgKlxyXG5cdCAqIFRoZSBhdXRvIGNsZWFyIG1lY2hhbmlzbSBvZiB0aGUgcHJvdmlkZWQgcmVuZGVyZXIgd2lsbCBiZSBkaXNhYmxlZC5cclxuXHQgKlxyXG5cdCAqIFN3aXRjaGluZyBiZXR3ZWVuIHJlbmRlcmVycyBhbGxvd3MgeW91IHRvIGR5bmFtaWNhbGx5IGVuYWJsZSBvciBkaXNhYmxlXHJcblx0ICogYW50aWFsaWFzaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSBuZXcgcmVuZGVyZXIuXHJcblx0ICogQHJldHVybiB7V2ViR0xSZW5kZXJlcn0gVGhlIG9sZCByZW5kZXJlci5cclxuXHQgKi9cclxuXHJcblx0cmVwbGFjZVJlbmRlcmVyKHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0Y29uc3Qgb2xkUmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cclxuXHRcdGxldCBwYXJlbnQsIG9sZFNpemUsIG5ld1NpemU7XHJcblxyXG5cdFx0aWYob2xkUmVuZGVyZXIgIT09IG51bGwgJiYgb2xkUmVuZGVyZXIgIT09IHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHRwYXJlbnQgPSBvbGRSZW5kZXJlci5kb21FbGVtZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdG9sZFNpemUgPSBvbGRSZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRcdG5ld1NpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XHJcblxyXG5cdFx0XHRpZihwYXJlbnQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKG9sZFJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG9sZFNpemUud2lkdGggIT09IG5ld1NpemUud2lkdGggfHwgb2xkU2l6ZS5oZWlnaHQgIT09IG5ld1NpemUuaGVpZ2h0KSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2V0U2l6ZSgpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gb2xkUmVuZGVyZXI7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyByZW5kZXIgdGFyZ2V0IGJ5IHJlcGxpY2F0aW5nIHRoZSByZW5kZXJlcidzIGNhbnZhcy5cclxuXHQgKlxyXG5cdCAqIFRoZSBjcmVhdGVkIHJlbmRlciB0YXJnZXQgdXNlcyBhIGxpbmVhciBmaWx0ZXIgZm9yIHRleGVsIG1pbmlmaWNhdGlvbiBhbmRcclxuXHQgKiBtYWduaWZpY2F0aW9uLiBJdHMgcmVuZGVyIHRleHR1cmUgZm9ybWF0IGRlcGVuZHMgb24gd2hldGhlciB0aGUgcmVuZGVyZXJcclxuXHQgKiB1c2VzIHRoZSBhbHBoYSBjaGFubmVsLiBNaXBtYXBzIGFyZSBkaXNhYmxlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVwdGhCdWZmZXIgLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBoYXZlIGEgZGVwdGggYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RlbmNpbEJ1ZmZlciAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBzdGVuY2lsIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGRlcHRoVGV4dHVyZSAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBkZXB0aCB0ZXh0dXJlLlxyXG5cdCAqIEByZXR1cm4ge1dlYkdMUmVuZGVyVGFyZ2V0fSBBIG5ldyByZW5kZXIgdGFyZ2V0IHRoYXQgZXF1YWxzIHRoZSByZW5kZXJlcidzIGNhbnZhcy5cclxuXHQgKi9cclxuXHJcblx0Y3JlYXRlQnVmZmVyKGRlcHRoQnVmZmVyLCBzdGVuY2lsQnVmZmVyLCBkZXB0aFRleHR1cmUpIHtcclxuXHJcblx0XHRjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblx0XHRjb25zdCBhbHBoYSA9IHRoaXMucmVuZGVyZXIuY29udGV4dC5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFscGhhO1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldCA9IG5ldyBXZWJHTFJlbmRlclRhcmdldChzaXplLndpZHRoICogcGl4ZWxSYXRpbywgc2l6ZS5oZWlnaHQgKiBwaXhlbFJhdGlvLCB7XHJcblx0XHRcdG1pbkZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRtYWdGaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0Zm9ybWF0OiBhbHBoYSA/IFJHQkFGb3JtYXQgOiBSR0JGb3JtYXQsXHJcblx0XHRcdGRlcHRoQnVmZmVyOiBkZXB0aEJ1ZmZlcixcclxuXHRcdFx0c3RlbmNpbEJ1ZmZlcjogc3RlbmNpbEJ1ZmZlcixcclxuXHRcdFx0ZGVwdGhUZXh0dXJlOiBkZXB0aFRleHR1cmUgPyBuZXcgRGVwdGhUZXh0dXJlKCkgOiBudWxsXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihkZXB0aFRleHR1cmUgJiYgc3RlbmNpbEJ1ZmZlcikge1xyXG5cclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmRlcHRoVGV4dHVyZS5mb3JtYXQgPSBEZXB0aFN0ZW5jaWxGb3JtYXQ7XHJcblx0XHRcdHJlbmRlclRhcmdldC5kZXB0aFRleHR1cmUudHlwZSA9IFVuc2lnbmVkSW50MjQ4VHlwZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyVGFyZ2V0LnRleHR1cmUubmFtZSA9IFwiRWZmZWN0Q29tcG9zZXIuQnVmZmVyXCI7XHJcblx0XHRyZW5kZXJUYXJnZXQudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyVGFyZ2V0O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBwYXNzLCBvcHRpb25hbGx5IGF0IGEgc3BlY2lmaWMgaW5kZXguXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1Bhc3N9IHBhc3MgLSBBIG5ldyBwYXNzLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbaW5kZXhdIC0gQW4gaW5kZXggYXQgd2hpY2ggdGhlIHBhc3Mgc2hvdWxkIGJlIGluc2VydGVkLlxyXG5cdCAqL1xyXG5cclxuXHRhZGRQYXNzKHBhc3MsIGluZGV4KSB7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblxyXG5cdFx0cGFzcy5zZXRTaXplKHNpemUud2lkdGggKiBwaXhlbFJhdGlvLCBzaXplLmhlaWdodCAqIHBpeGVsUmF0aW8pO1xyXG5cdFx0cGFzcy5pbml0aWFsaXNlKHJlbmRlcmVyLCByZW5kZXJlci5jb250ZXh0LmdldENvbnRleHRBdHRyaWJ1dGVzKCkuYWxwaGEpO1xyXG5cclxuXHRcdGlmKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHRoaXMucGFzc2VzLnNwbGljZShpbmRleCwgMCwgcGFzcyk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHRoaXMucGFzc2VzLnB1c2gocGFzcyk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQYXNzfSBwYXNzIC0gVGhlIHBhc3MuXHJcblx0ICovXHJcblxyXG5cdHJlbW92ZVBhc3MocGFzcykge1xyXG5cclxuXHRcdHRoaXMucGFzc2VzLnNwbGljZSh0aGlzLnBhc3Nlcy5pbmRleE9mKHBhc3MpLCAxKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIGFsbCBlbmFibGVkIHBhc3NlcyBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIGFkZGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhIC0gVGhlIHRpbWUgYmV0d2VlbiB0aGUgbGFzdCBmcmFtZSBhbmQgdGhlIGN1cnJlbnQgb25lIGluIHNlY29uZHMuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihkZWx0YSkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG5cdFx0Y29uc3QgY29weVBhc3MgPSB0aGlzLmNvcHlQYXNzO1xyXG5cclxuXHRcdGxldCByZWFkQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyO1xyXG5cdFx0bGV0IHdyaXRlQnVmZmVyID0gdGhpcy53cml0ZUJ1ZmZlcjtcclxuXHJcblx0XHRsZXQgbWFza0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0bGV0IHBhc3MsIGNvbnRleHQsIGJ1ZmZlcjtcclxuXHRcdGxldCBpLCBsO1xyXG5cclxuXHRcdGZvcihpID0gMCwgbCA9IHBhc3Nlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuXHJcblx0XHRcdHBhc3MgPSBwYXNzZXNbaV07XHJcblxyXG5cdFx0XHRpZihwYXNzLmVuYWJsZWQpIHtcclxuXHJcblx0XHRcdFx0cGFzcy5yZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSwgbWFza0FjdGl2ZSk7XHJcblxyXG5cdFx0XHRcdGlmKHBhc3MubmVlZHNTd2FwKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYobWFza0FjdGl2ZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0Y29udGV4dCA9IHJlbmRlcmVyLmNvbnRleHQ7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc3RlbmNpbEZ1bmMoY29udGV4dC5OT1RFUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblx0XHRcdFx0XHRcdGNvcHlQYXNzLnJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpO1xyXG5cdFx0XHRcdFx0XHRjb250ZXh0LnN0ZW5jaWxGdW5jKGNvbnRleHQuRVFVQUwsIDEsIDB4ZmZmZmZmZmYpO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidWZmZXIgPSByZWFkQnVmZmVyO1xyXG5cdFx0XHRcdFx0cmVhZEJ1ZmZlciA9IHdyaXRlQnVmZmVyO1xyXG5cdFx0XHRcdFx0d3JpdGVCdWZmZXIgPSBidWZmZXI7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYocGFzcyBpbnN0YW5jZW9mIE1hc2tQYXNzKSB7XHJcblxyXG5cdFx0XHRcdFx0bWFza0FjdGl2ZSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSBpZihwYXNzIGluc3RhbmNlb2YgQ2xlYXJNYXNrUGFzcykge1xyXG5cclxuXHRcdFx0XHRcdG1hc2tBY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBidWZmZXJzIGFuZCB0aGUgcmVuZGVyZXIncyBvdXRwdXQgY2FudmFzLlxyXG5cdCAqXHJcblx0ICogRXZlcnkgcGFzcyB3aWxsIGJlIGluZm9ybWVkIG9mIHRoZSBuZXcgc2l6ZS4gSXQncyB1cCB0byBlYWNoIHBhc3MgaG93IHRoYXRcclxuXHQgKiBpbmZvcm1hdGlvbiBpcyB1c2VkLlxyXG5cdCAqXHJcblx0ICogSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGlzIHNwZWNpZmllZCwgdGhlIHJlbmRlciB0YXJnZXRzIGFuZCBwYXNzZXMgd2lsbCBiZVxyXG5cdCAqIHVwZGF0ZWQgd2l0aCB0aGUgY3VycmVudCBzaXplIG9mIHRoZSByZW5kZXJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGhdIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XSAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdGNvbnN0IHBhc3NlcyA9IHRoaXMucGFzc2VzO1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHRoaXMucmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xyXG5cclxuXHRcdGxldCBpLCBsO1xyXG5cclxuXHRcdGlmKHdpZHRoID09PSB1bmRlZmluZWQgfHwgaGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdHdpZHRoID0gc2l6ZS53aWR0aDtcclxuXHRcdFx0aGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR3aWR0aCAqPSBwaXhlbFJhdGlvO1xyXG5cdFx0aGVpZ2h0ICo9IHBpeGVsUmF0aW87XHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLndyaXRlQnVmZmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0Zm9yKGkgPSAwLCBsID0gcGFzc2VzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0cGFzc2VzW2ldLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGlzIGNvbXBvc2VyIGJ5IGRlbGV0aW5nIGFsbCBwYXNzZXMgYW5kIGNyZWF0aW5nIG5ldyBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gW3JlbmRlclRhcmdldF0gLSBBIG5ldyByZW5kZXIgdGFyZ2V0LiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgc2V0dGluZ3Mgb2YgdGhlIHJlbmRlcmVyIHdpbGwgYmUgdXNlZC5cclxuXHQgKi9cclxuXHJcblx0cmVzZXQocmVuZGVyVGFyZ2V0KSB7XHJcblxyXG5cdFx0Y29uc3QgZGVwdGhCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuZGVwdGhCdWZmZXI7XHJcblx0XHRjb25zdCBzdGVuY2lsQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLnN0ZW5jaWxCdWZmZXI7XHJcblx0XHRjb25zdCBkZXB0aFRleHR1cmUgPSAodGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZSAhPT0gbnVsbCk7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlKChyZW5kZXJUYXJnZXQgPT09IHVuZGVmaW5lZCkgP1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUJ1ZmZlcihkZXB0aEJ1ZmZlciwgc3RlbmNpbEJ1ZmZlciwgZGVwdGhUZXh0dXJlKSA6XHJcblx0XHRcdHJlbmRlclRhcmdldFxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXN0cm95cyBhbGwgcGFzc2VzIGFuZCByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIFRoaXMgbWV0aG9kIGRlYWxsb2NhdGVzIGFsbCByZW5kZXIgdGFyZ2V0cywgdGV4dHVyZXMgYW5kIG1hdGVyaWFscyBjcmVhdGVkXHJcblx0ICogYnkgdGhlIHBhc3Nlcy4gSXQgYWxzbyBkZWxldGVzIHRoaXMgY29tcG9zZXIncyBmcmFtZSBidWZmZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gW3JlbmRlclRhcmdldF0gLSBBIG5ldyByZW5kZXIgdGFyZ2V0LiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgY29tcG9zZXIgd2lsbCBiZWNvbWUgaW5vcGVyYXRpdmUuXHJcblx0ICovXHJcblxyXG5cdGRpc3Bvc2UocmVuZGVyVGFyZ2V0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblxyXG5cdFx0aWYodGhpcy5yZWFkQnVmZmVyICE9PSBudWxsICYmIHRoaXMud3JpdGVCdWZmZXIgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlci5kaXNwb3NlKCk7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyID0gbnVsbDtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlKHBhc3Nlcy5sZW5ndGggPiAwKSB7XHJcblxyXG5cdFx0XHRwYXNzZXMucG9wKCkuZGlzcG9zZSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZihyZW5kZXJUYXJnZXQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0Ly8gUmVhbmltYXRlLlxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSByZW5kZXJUYXJnZXQ7XHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuY2xvbmUoKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dGhpcy5jb3B5UGFzcy5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3JlIGNvbXBvbmVudHMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvY29yZVxyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSBcIi4vZWZmZWN0LWNvbXBvc2VyLmpzXCI7XHJcbiIsIi8qKlxyXG4gKiBFeHBvc3VyZSBvZiB0aGUgbGlicmFyeSBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwiLi9jb3JlXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdEJsb29tUGFzcyxcclxuXHRCbHVyUGFzcyxcclxuXHRCb2tlaFBhc3MsXHJcblx0Qm9rZWgyUGFzcyxcclxuXHRDbGVhclBhc3MsXHJcblx0Q2xlYXJNYXNrUGFzcyxcclxuXHREZXB0aFBhc3MsXHJcblx0RG90U2NyZWVuUGFzcyxcclxuXHRGaWxtUGFzcyxcclxuXHRHbGl0Y2hNb2RlLFxyXG5cdEdsaXRjaFBhc3MsXHJcblx0R29kUmF5c1Bhc3MsXHJcblx0TWFza1Bhc3MsXHJcblx0UGFzcyxcclxuXHRQaXhlbGF0aW9uUGFzcyxcclxuXHRSZW5kZXJQYXNzLFxyXG5cdFNhdmVQYXNzLFxyXG5cdFNoYWRlclBhc3MsXHJcblx0U2hvY2tXYXZlUGFzcyxcclxuXHRTTUFBUGFzcyxcclxuXHRUZXh0dXJlUGFzcyxcclxuXHRUb25lTWFwcGluZ1Bhc3NcclxufSBmcm9tIFwiLi9wYXNzZXNcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0QWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0Qm9rZWhNYXRlcmlhbCxcclxuXHRCb2tlaDJNYXRlcmlhbCxcclxuXHRDb21iaW5lTWF0ZXJpYWwsXHJcblx0Q29udm9sdXRpb25NYXRlcmlhbCxcclxuXHRDb3B5TWF0ZXJpYWwsXHJcblx0RGVwdGhNYXRlcmlhbCxcclxuXHREb3RTY3JlZW5NYXRlcmlhbCxcclxuXHRGaWxtTWF0ZXJpYWwsXHJcblx0R2xpdGNoTWF0ZXJpYWwsXHJcblx0R29kUmF5c01hdGVyaWFsLFxyXG5cdEtlcm5lbFNpemUsXHJcblx0THVtaW5vc2l0eU1hdGVyaWFsLFxyXG5cdFBpeGVsYXRpb25NYXRlcmlhbCxcclxuXHRTaG9ja1dhdmVNYXRlcmlhbCxcclxuXHRTTUFBQmxlbmRNYXRlcmlhbCxcclxuXHRTTUFBQ29sb3JFZGdlc01hdGVyaWFsLFxyXG5cdFNNQUFXZWlnaHRzTWF0ZXJpYWwsXHJcblx0VG9uZU1hcHBpbmdNYXRlcmlhbFxyXG59IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG4iLCJpbXBvcnQge1xuICBFZmZlY3RDb21wb3NlcixcbiAgUmVuZGVyUGFzcyxcbiAgU2hhZGVyUGFzc1xufSBmcm9tICdwb3N0cHJvY2Vzc2luZyc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuY29uc3QgcG9seWZpbGwgPSAob2JqZWN0LCBtZXRob2QsIHNob3dXYXJuID0gdHJ1ZSkgPT4ge1xuICBpZiAob2JqZWN0W21ldGhvZF0pIHJldHVybjtcbiAgaWYgKHNob3dXYXJuKSBjb25zb2xlLndhcm4oYEBQb3N0UHJvY2Vzc29yTW9kdWxlOiBwYXNzLiR7bWV0aG9kfSgpIHdhcyBub3QgZm91bmQuYCwgb2JqZWN0KTtcbiAgb2JqZWN0W21ldGhvZF0gPSAoKSA9PiB7fTtcbn07XG5cbmV4cG9ydCBjbGFzcyBQb3N0UHJvY2Vzc29yTW9kdWxlIHtcbiAgY3VycmVudFBhc3MgPSBudWxsO1xuXG4gIGRlZmVyID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIGRlYnVnOiB0cnVlXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0gUG9zdFByb2Nlc3Nvck1vZHVsZS5kZWZhdWx0cykge1xuICAgIHRoaXMuZGVidWcgPSBwYXJhbXMuZGVidWc7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncG9zdHByb2Nlc3NvcicpO1xuXG4gICAgdGhpcy5lZmZlY3RzID0gbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLmVmZmVjdHM7XG4gICAgdGhpcy5yZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHRoaXMuc2NlbmUgPSBtYW5hZ2VyLmdldCgnc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHRoaXMuY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIodGhpcy5yZW5kZXJlciwgdGhpcy5wYXJhbXMpO1xuXG4gICAgbWFuYWdlci51c2UoJ3JlbmRlcmluZycpLnN0b3AoKTtcblxuICAgIGNvbnN0IGNvbXBvc2VyID0gdGhpcy5jb21wb3NlcjtcbiAgICB0aGlzLnJlbmRlckxvb3AgPSBuZXcgTG9vcChjbG9jayA9PiBjb21wb3Nlci5yZW5kZXIoY2xvY2suZ2V0RGVsdGEoKSkpLnN0YXJ0KG1hbmFnZXIuaGFuZGxlcik7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICByZW5kZXJlcjogcmVuZGVyZXIgPT4ge1xuICAgICAgICB0aGlzLmNvbXBvc2VyLnJlcGxhY2VSZW5kZXJlcihyZW5kZXJlcik7XG4gICAgICB9LFxuXG4gICAgICBzY2VuZTogc2NlbmUgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICB9LFxuXG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNvbHZlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHBhc3MgPSBuZXcgUmVuZGVyUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYS5uYXRpdmUpO1xuXG4gICAgICAvLyBUT0RPOiBTdXBwb3J0IGZvciBlZmZlY3RzLlxuXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gQVBJXG5cbiAgcGFzcyhwYXNzKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHBvbHlmaWxsKHBhc3MsICdzZXRTaXplJywgdGhpcy5kZWJ1Zyk7XG4gICAgICBwb2x5ZmlsbChwYXNzLCAnaW5pdGlhbGlzZScsIHRoaXMuZGVidWcpO1xuXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2hhZGVyKG1hdGVyaWFsLCB0ZXh0dXJlSUQgPSAncmVhZEJ1ZmZlcicpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKCFtYXRlcmlhbC51bmlmb3Jtc1t0ZXh0dXJlSURdKVxuICAgICAgICBtYXRlcmlhbC51bmlmb3Jtc1t0ZXh0dXJlSURdID0ge3ZhbHVlOiBudWxsfTtcblxuICAgICAgY29uc3QgcGFzcyA9IG5ldyBTaGFkZXJQYXNzKG1hdGVyaWFsLCB0ZXh0dXJlSUQpO1xuXG4gICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MocGFzcyk7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzID0gcGFzcztcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gUGFzcyBBUElcblxuICBnZXQobmFtZSkge1xuICAgIHJldHVybiBuYW1lXG4gICAgICA/IHRoaXMuY29tcG9zZXIucGFzc2VzLmZpbHRlcihwYXNzID0+IHBhc3MubmFtZSA9PT0gbmFtZSlbMF1cbiAgICAgIDogdGhpcy5jdXJyZW50UGFzcztcbiAgfVxuXG4gIHRvKG5hbWUpIHtcbiAgICB0aGlzLmN1cnJlbnRQYXNzID0gbmFtZTtcbiAgfVxuXG4gIHJlbmRlclRvU2NyZWVuKGJvb2wgPSB0cnVlKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MucmVuZGVyVG9TY3JlZW4gPSBib29sO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuYW1lKG5hbWUpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFzcy5uYW1lID0gbmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRXZlbnRzUGF0Y2hNb2R1bGUge1xuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnZXZlbnRzJyk7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJykuZG9tRWxlbWVudDtcbiAgfVxuXG4gIHBhdGNoRXZlbnRzKG9yaWdpbk9iamVjdCwgZGVzdE9iamVjdCwgZXZlbnRzID0gW10pIHtcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxuICAgICAgb3JpZ2luT2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGUgPT4gZGVzdE9iamVjdC5lbWl0KGV2ZW50LCBlKSlcbiAgICApO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBjb25zdCB7ZWxlbWVudCwgcGF0Y2hFdmVudHN9ID0gc2VsZjtcblxuICAgIHBhdGNoRXZlbnRzKGVsZW1lbnQsIHRoaXMsIFtcbiAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgJ2NvbnRleHRtZW51JyxcbiAgICAgICdtb3VzZWRvd24nLFxuICAgICAgJ2NsaWNrJyxcbiAgICAgICd3aGVlbCcsXG4gICAgICAndG91Y2hzdGFydCcsXG4gICAgICAndG91Y2hlbmQnLFxuICAgICAgJ3RvdWNobW92ZScsXG4gICAgICAna2V5ZG93bidcbiAgICBdKTtcblxuICAgIHBhdGNoRXZlbnRzKGVsZW1lbnQsIHRoaXMsIFtcbiAgICAgICdrZXlkb3duJyxcbiAgICAgICdrZXl1cCcsXG4gICAgICAna2V5cHJlc3MnXG4gICAgXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFZlY3RvcjIsXG4gIFJheWNhc3RlcixcbiAgUGxhbmUsXG4gIFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge0V2ZW50c1BhdGNoTW9kdWxlfSBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcblxuLyoqXG4gKiBAY2xhc3MgVmlydHVhbE1vdXNlTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2dsb2JhbE1vdmVtZW50PWZhbHNlXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4dGVuZHMgRXZlbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsTW91c2VNb2R1bGUgZXh0ZW5kcyBFdmVudHMge1xuICBtb3VzZSA9IG5ldyBWZWN0b3IyKCk7XG4gIHJheWNhc3RlciA9IG5ldyBSYXljYXN0ZXIoKTtcbiAgd29ybGQgPSBudWxsO1xuICBjYW52YXMgPSBudWxsO1xuICBwcm9qZWN0aW9uUGxhbmUgPSBuZXcgUGxhbmUobmV3IFZlY3RvcjMoMCwgMCwgMSksIDApO1xuXG4gIGNvbnN0cnVjdG9yKGdsb2JhbE1vdmVtZW50ID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ2xvYmFsTW92ZW1lbnQgPSBnbG9iYWxNb3ZlbWVudDtcbiAgfVxuXG4gIHVwZGF0ZShlLCBjdXN0b21YLCBjdXN0b21ZKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgeCA9IGN1c3RvbVggfHwgZS5jbGllbnRYO1xuICAgIGNvbnN0IHkgPSBjdXN0b21ZIHx8IGUuY2xpZW50WTtcblxuICAgIHRoaXMubW91c2UueCA9ICgoeCAtIHJlY3QubGVmdCkgLyAocmVjdC5yaWdodCAtIHJlY3QubGVmdCkpICogMiAtIDE7XG4gICAgdGhpcy5tb3VzZS55ID0gLSgoeSAtIHJlY3QudG9wKSAvIChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSkgKiAyICsgMTtcblxuICAgIHRoaXMucHJvamVjdGlvblBsYW5lLm5vcm1hbC5jb3B5KHRoaXMuY2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKCkpO1xuXG4gICAgdGhpcy5yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSh0aGlzLm1vdXNlLCB0aGlzLmNhbWVyYSk7XG4gICAgdGhpcy5lbWl0KCdtb3ZlJyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnbW91c2UnKTtcbiAgICBtYW5hZ2VyLnJlcXVpcmUoJ2V2ZW50cycsICgpID0+IG5ldyBFdmVudHNQYXRjaE1vZHVsZSgpKTtcblxuICAgIHRoaXMuY2FudmFzID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJykuZG9tRWxlbWVudDtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmU7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIFtcbiAgICAgICdjbGljaycsXG4gICAgICAnbW91c2Vkb3duJyxcbiAgICAgICdtb3VzZXVwJyxcbiAgICAgICdtb3VzZW1vdmUnXG4gICAgXS5mb3JFYWNoKGV2ID0+IHRoaXMub24oZXYsIGUgPT4gc2VsZi5lbWl0KGV2LCBlKSkpO1xuXG4gICAgc2VsZi5nbG9iYWxYID0gMDtcbiAgICBzZWxmLmdsb2JhbFkgPSAwO1xuXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQucG9pbnRlckxvY2tFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNlbGYuZ2xvYmFsWCArPSBlLm1vdmVtZW50WDtcbiAgICAgICAgc2VsZi5nbG9iYWxZICs9IGUubW92ZW1lbnRZO1xuXG4gICAgICAgIHNlbGYudXBkYXRlKGUsIHNlbGYuZ2xvYmFsWCwgc2VsZi5nbG9iYWxZKTtcbiAgICAgIH0gZWxzZSBzZWxmLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRyYWNrKGNvbXBvbmVudCwgbmVzdGVkID0gdHJ1ZSkge1xuICAgIGxldCBpc0hvdmVyZWQgPSBmYWxzZTtcblxuICAgIHRoaXMub24oJ21vdmUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ob3ZlcnMoY29tcG9uZW50LCBuZXN0ZWQpKSB7XG4gICAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZW1vdmUnKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29tcG9uZW50LmVtaXQoJ21vdXNlb3ZlcicpO1xuICAgICAgICAgIGlzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNIb3ZlcmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC5lbWl0KCdtb3VzZW91dCcpO1xuICAgICAgICBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ2NsaWNrJyk7XG4gICAgICBlbHNlIGNvbXBvbmVudC5lbWl0KCdvZmZDbGljaycpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNlZG93bicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIGlmIChpc0hvdmVyZWQpIGNvbXBvbmVudC5lbWl0KCdtb3VzZXVwJyk7XG4gICAgfSk7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oe25hdGl2ZX0sIG5lc3RlZCA9IHRydWUpIHtcbiAgICBpZiAobmF0aXZlLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgbmVzdGVkKSB7XG4gICAgICBjb25zdCBvYmplY3RzID0gW107XG4gICAgICBuYXRpdmUudHJhdmVyc2UoY2hpbGQgPT4gb2JqZWN0cy5wdXNoKGNoaWxkKSk7XG5cbiAgICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKG9iamVjdHMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3QobmF0aXZlKTtcbiAgfVxuXG4gIHByb2plY3QocGxhbmUgPSB0aGlzLnByb2plY3Rpb25QbGFuZSkge1xuICAgIHJldHVybiB0aGlzLnJheWNhc3Rlci5yYXkuaW50ZXJzZWN0UGxhbmUocGxhbmUpO1xuICB9XG5cbiAgaG92ZXJzKGNvbXBvbmVudCwgbmVzdGVkID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLmludGVyc2VjdGlvbihjb21wb25lbnQsIG5lc3RlZCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCByYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLnJheTtcbiAgfVxuXG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlLng7XG4gIH1cblxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5tb3VzZS55O1xuICB9XG59XG4iLCJpbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5pbXBvcnQge0V2ZW50c1BhdGNoTW9kdWxlfSBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xzTW9kdWxlIHtcbiAgc3RhdGljIGZyb20oY29udHJvbHMpIHtcbiAgICByZXR1cm4gbmV3IENvbnRyb2xzTW9kdWxlKHtjb250cm9sc30pO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY29udHJvbHM6IGZhbHNlLFxuICAgICAgZml4OiBjb250cm9scyA9PiBjb250cm9scyxcblxuICAgICAgdXBkYXRlKGMpIHtcbiAgICAgICAgdGhpcy5jb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICAgIH1cbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5jb250cm9scyA9IHRoaXMucGFyYW1zLmNvbnRyb2xzO1xuICAgIHRoaXMudXBkYXRlID0gdGhpcy5wYXJhbXMudXBkYXRlO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5yZXF1aXJlKCdldmVudHMnLCAoKSA9PiBuZXcgRXZlbnRzUGF0Y2hNb2R1bGUoKSk7XG4gIH1cblxuICBzZXRDb250cm9scyhjb250cm9scykge1xuICAgIHRoaXMuY29udHJvbHMgPSBjb250cm9scztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFVwZGF0ZSh1cGRhdGUpIHtcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi51cGRhdGVMb29wID0gbmV3IExvb3Aoc2VsZi51cGRhdGUuYmluZChzZWxmKSk7XG4gICAgc2VsZi51cGRhdGVMb29wLnN0YXJ0KHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBGb2dFeHAyLFxuICBGb2dcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBGb2dNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2NvbG9yOiAweGVmZDFiNSwgZGVuc2l0eTogMC4wMjAsIG5lYXI6IDEwLCBmYXI6IDEwMDB9XSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbdHlwZT1leHAyXSAtIFRoZSB0eXBlIG9mIGZvZyAtIGV4cDIgb3IgbGluZWFyXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Ib3cgdG8gY3JlYXRlIGFuZCBhcHBseSBhIEZvZ01vZHVsZTwvY2FwdGlvbj5cbiAqIGNvbnN0IGZvZ01vZHVsZSA9IG5ldyBGb2dNb2R1bGUoe1xuICogICAgY29sb3I6IDB4ZmZmZmZmLFxuICogICAgZGVuc2l0eTogMC4wMyxcbiAqICAgIG5lYXI6IDIwLFxuICogICAgZmFyOiAyMDBcbiAqICB9LCAnZXhwMicpO1xuICpcbiAqIG5ldyBBcHAoW1xuICogIC4uLixcbiAqICBmb2dNb2R1bGVcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRm9nTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIHR5cGUpIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY29sb3I6IDB4ZWZkMWI1LFxuICAgICAgZGVuc2l0eTogMC4wMjAsXG4gICAgICBuZWFyOiAxMCxcbiAgICAgIGZhcjogMTAwMFxuICAgIH0sIHBhcmFtcyk7XG4gICAgaWYgKCF0eXBlIHx8IHR5cGUgPT09ICdleHAyJykgdGhpcy5mb2cgPSBuZXcgRm9nRXhwMih0aGlzLnBhcmFtcy5jb2xvciwgdGhpcy5wYXJhbXMuZGVuc2l0eSk7XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ2xpbmVhcicpIHRoaXMuZm9nID0gbmV3IEZvZyh0aGlzLnBhcmFtcy5jb2xvciwgdGhpcy5wYXJhbXMubmVhciwgdGhpcy5wYXJhbXMuZmFyKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdmb2cnLCB0aGlzLmZvZyk7XG4gICAgbWFuYWdlci5nZXQoJ3NjZW5lJykuZm9nID0gdGhpcy5mb2c7XG4gIH1cbn1cbiIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gJ3JlZHV4JztcblxuY29uc3QgaXNFcXVhbERlZmF1bHQgPSAoYSwgYikgPT4ge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYgKGEgJiYgYS5lcXVhbHMgJiYgYS5lcXVhbHMoYikpIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQGNsYXNzIFN0YXRlTW9kdWxlXG4gKiBAZGVzY3JpcHRpb24gYFN0YXRlTW9kdWxlYCBpcyB1c2VmdWwgZm9yIGFwcHMsIHdoZXJlIHlvdSBuZWVkIHN0YXRlIG1hbmlwdWxhdGlvbi5cbiAqIFRoaXMgY2FuIGJlOiBfdHJhbnNpdGlvbnMgYmV0d2VlbiBzY3JlZW5zLCBnYW1lcywgZGV2ZWxvcG1lbnQgbW9tZW50c18uXG4gKiBZb3UgY2FuIGNoZWNrIFtiYXNpYy9zdGF0ZV0oaHR0cHM6Ly93aHMtZGV2LnN1cmdlLnNoL2V4YW1wbGVzLz9iYXNpYy9zdGF0ZSkgZXhhbXBsZS5cbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSBzdGF0ZSBtb2R1bGU8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgLy8gLi4uXG4gKiAgIG5ldyBTdGF0ZU1vZHVsZSgpLmRlZmF1bHQoe1xuICogICAgIHNwaGVyZUNvbG9yOiAweGZmMDAwMFxuICogICB9KVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0ZU1vZHVsZSB7XG4gIHN0YXRpYyBhY3Rpb25HZW5lcmF0ZShpc0VxdWFsKSB7XG4gICAgcmV0dXJuIChzdGF0ZSA9IFt7fSwgJyddLCB7a2V5LCBkYXRhfSkgPT4ge1xuICAgICAgaWYgKGlzRXF1YWwoc3RhdGVbMF1ba2V5XSwgZGF0YSkpIHJldHVybiBzdGF0ZTtcblxuICAgICAgc3RhdGVbMF1ba2V5XSA9IGRhdGE7XG4gICAgICBzdGF0ZVsxXSA9IGtleTtcblxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlcXVhbENoZWNrID0gaXNFcXVhbERlZmF1bHQpIHtcbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgICBTdGF0ZU1vZHVsZS5hY3Rpb25HZW5lcmF0ZShlcXVhbENoZWNrKVxuICAgICk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICB0aGlzLmN1cnJlbnRDb25maWcgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5wcmV2Q29uZmlnID0gJ2RlZmF1bHQnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmYXVsdFxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBzZXR1cFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIG5ldyBXSFMuU3RhdGVNb2R1bGUoKS5kZWZhdWx0KHtcbiAgICogICBzcGhlcmVDb2xvcjogVVRJTFMuJGNvbG9ycy5tZXNoLFxuICAgKiAgIHBsYW5lQ29sb3I6IDB4NDQ3RjhCXG4gICAqIH0pXG4gICAqL1xuICBkZWZhdWx0KGRhdGEpIHtcbiAgICB0aGlzLmNvbmZpZyh7ZGVmYXVsdDogZGF0YX0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0RXF1YWxDaGVja1xuICAgKiBAZGVzY3JpcHRpb24gU2V0cyBhbiBlcXVhbENoZWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbmZpZ3VyYXRpb24gc2V0dXBcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgc2V0RXF1YWxDaGVjayhmdW5jKSB7XG4gICAgdGhpcy5zdG9yZS5yZXBsYWNlUmVkdWNlcihcbiAgICAgIFN0YXRlTW9kdWxlLmFjdGlvbkdlbmVyYXRlKGZ1bmMpXG4gICAgKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdzdGF0ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29uZmlnXG4gICAqIEBkZXNjcmlwdGlvbiBMb2FkIGNvbmZpZ3VyYXRpb25zIGZyb20gb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlncyBDb25maWd1cmF0aW9uIGRhdGFcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQWRkaW5nIGBncmVlbmAgY29uZmlndXJhdGlvbjwvY2FwdGlvbj5cbiAgICogc3RhdGUuY29uZmlnKHtcbiAgICogICBncmVlbjoge1xuICAgKiAgICAgc3BoZXJlQ29sb3I6IDB4MDBmZjAwLFxuICAgKiAgICAgcGxhbmVDb2xvcjogMHgwMGZmMDBcbiAgICogICB9XG4gICAqIH0pO1xuICAgKi9cbiAgY29uZmlnKGNvbmZpZ3MpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWdzKSB7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbltrZXldID0ga2V5ID09PSAnZGVmYXVsdCdcbiAgICAgICAgICA/IGNvbmZpZ3Nba2V5XVxuICAgICAgICAgIDogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHQsIGNvbmZpZ3Nba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBMb2FkIHVwZGF0ZXMgZnJvbSBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB1cGRhdGVzIFVwZGF0ZXMgZGF0YVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBVcGRhdGUgY2FsbGJhY2sgZm9yIGBzcGhlcmVDb2xvcmA8L2NhcHRpb24+XG4gICAqIHN0YXRlLnVwZGF0ZSh7XG4gICAqICAgc3BoZXJlQ29sb3I6IGNvbG9yID0+IHNwaGVyZS5tYXRlcmlhbC5jb2xvci5zZXRIZXgoY29sb3IpXG4gICAqIH0pO1xuICAgKi9cbiAgdXBkYXRlKHVwZGF0ZXMgPSB7fSkge1xuICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IFtkYXRhLCBjaGFuZ2VkS2V5XSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdXBkYXRlc1tjaGFuZ2VkS2V5XTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhW2NoYW5nZWRLZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHRvXG4gICAqIEBkZXNjcmlwdGlvbiBTd2l0Y2ggdG8gY29uZmlndXJhdGlvbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZ05hbWUgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBDaGFuZ2VzIGNvbmZpZ3VyYXRpb24gdG8gYGdyZWVuYDwvY2FwdGlvbj5cbiAgICogc3RhdGUudG8oJ2dyZWVuJyk7XG4gICAqL1xuICB0byhjb25maWdOYW1lKSB7XG4gICAgdGhpcy5wcmV2Q29uZmlnID0gdGhpcy5jdXJyZW50Q29uZmlnO1xuICAgIHRoaXMuY3VycmVudENvbmZpZyA9IGNvbmZpZ05hbWU7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgID8gdGhpcy5jb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdXG4gICAgICA6IHRoaXMuY29uZmlndXJhdGlvbi5kZWZhdWx0O1xuXG4gICAgdGhpcy5zZXQoY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IGN1cnJlbnQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIHN0YXRlLnNldCh7XG4gICAqICAgc3BoZXJlQ29sb3I6IDB4MDBmZjAwXG4gICAqIH0pO1xuICAgKi9cbiAgc2V0KGRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKVxuICAgICAgaWYgKGtleSkgdGhpcy5zdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0FERCcsIGtleSwgZGF0YTogZGF0YVtrZXldfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybiBkYXRhIG9mIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBQYXJhbWV0ZXIgbmFtZS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKiBAZXhhbXBsZVxuICAgKiBzdGF0ZS5nZXQoJ3NwaGVyZUNvbG9yJyk7IC8vIDB4MDBmZjAwXG4gICAqL1xuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcHJldlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGB0cnVlVmFsYCBpZiBgY29uZmlnYCBtYXRjaCBwcmV2aW91cyBjb25maWd1cmF0aW9uLCBpbiBvdGhlciBjYXNlIC0gcmV0dXJuIGBmYWxzZVZhbGAuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcgQ29uZmlndXJhdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge0FueX0gdHJ1ZVZhbCBWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgdHJ1dGh5LlxuICAgKiBAcGFyYW0ge0FueX0gZmFsc2VWYWwgQ1ZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyBmYWxzeS5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcC5TdGF0ZU1vZHVsZVxuICAgKi9cbiAgcHJldihjb25maWcsIHRydWVWYWwsIGZhbHNlVmFsKSB7XG4gICAgcmV0dXJuIHRoaXMucHJldkNvbmZpZyA9PT0gY29uZmlnID8gdHJ1ZVZhbCA6IGZhbHNlVmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY3VycmVudFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGB0cnVlVmFsYCBpZiBgY29uZmlnYCBtYXRjaCBjdXJyZW50IGNvbmZpZ3VyYXRpb24sIGluIG90aGVyIGNhc2UgLSByZXR1cm4gYGZhbHNlVmFsYC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZyBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7QW55fSB0cnVlVmFsIFZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyB0cnV0aHkuXG4gICAqIEBwYXJhbSB7QW55fSBmYWxzZVZhbCBDVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIGZhbHN5LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBjdXJyZW50KGNvbmZpZywgdHJ1ZVZhbCwgZmFsc2VWYWwpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q29uZmlnID09PSBjb25maWcgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIE1PVVNFLFxuICBRdWF0ZXJuaW9uLFxuICBTcGhlcmljYWwsXG4gIFZlY3RvcjIsXG4gIFBlcnNwZWN0aXZlQ2FtZXJhLFxuICBPcnRob2dyYXBoaWNDYW1lcmEsXG4gIEV2ZW50RGlzcGF0Y2hlcixcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbi8vIFRoaXMgc2V0IG9mIGNvbnRyb2xzIHBlcmZvcm1zIG9yYml0aW5nLCBkb2xseWluZyAoem9vbWluZyksIGFuZCBwYW5uaW5nLlxuLy8gVW5saWtlIFRyYWNrYmFsbENvbnRyb2xzLCBpdCBtYWludGFpbnMgdGhlIFwidXBcIiBkaXJlY3Rpb24gb2JqZWN0LnVwICgrWSBieSBkZWZhdWx0KS5cbi8vXG4vLyAgICBPcmJpdCAtIGxlZnQgbW91c2UgLyB0b3VjaDogb25lIGZpbmdlciBtb3ZlXG4vLyAgICBab29tIC0gbWlkZGxlIG1vdXNlLCBvciBtb3VzZXdoZWVsIC8gdG91Y2g6IHR3byBmaW5nZXIgc3ByZWFkIG9yIHNxdWlzaFxuLy8gICAgUGFuIC0gcmlnaHQgbW91c2UsIG9yIGFycm93IGtleXMgLyB0b3VjaDogdGhyZWUgZmludGVyIHN3aXBlXG5cbmV4cG9ydCBjbGFzcyBUaHJlZU9yYml0Q29udHJvbHMgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcihvYmplY3QsIGRvbUVsZW1lbnQsIGV2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IChkb21FbGVtZW50ID09PSB1bmRlZmluZWQpID8gZG9jdW1lbnQgOiBkb21FbGVtZW50O1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gZXZlbnRIYW5kbGVyO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIC8vIFwidGFyZ2V0XCIgc2V0cyB0aGUgbG9jYXRpb24gb2YgZm9jdXMsIHdoZXJlIHRoZSBvYmplY3Qgb3JiaXRzIGFyb3VuZFxuICAgIHRoaXMudGFyZ2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBkb2xseSBpbiBhbmQgb3V0ICggUGVyc3BlY3RpdmVDYW1lcmEgb25seSApXG4gICAgdGhpcy5taW5EaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIHpvb20gaW4gYW5kIG91dCAoIE9ydGhvZ3JhcGhpY0NhbWVyYSBvbmx5IClcbiAgICB0aGlzLm1pblpvb20gPSAwO1xuICAgIHRoaXMubWF4Wm9vbSA9IEluZmluaXR5O1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IHZlcnRpY2FsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgLy8gUmFuZ2UgaXMgMCB0byBNYXRoLlBJIHJhZGlhbnMuXG4gICAgdGhpcy5taW5Qb2xhckFuZ2xlID0gMDsgLy8gcmFkaWFuc1xuICAgIHRoaXMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEk7IC8vIHJhZGlhbnNcblxuICAgIC8vIEhvdyBmYXIgeW91IGNhbiBvcmJpdCBob3Jpem9udGFsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgLy8gSWYgc2V0LCBtdXN0IGJlIGEgc3ViLWludGVydmFsIG9mIHRoZSBpbnRlcnZhbCBbIC0gTWF0aC5QSSwgTWF0aC5QSSBdLlxuICAgIHRoaXMubWluQXppbXV0aEFuZ2xlID0gLUluZmluaXR5OyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhBemltdXRoQW5nbGUgPSBJbmZpbml0eTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gZW5hYmxlIGRhbXBpbmcgKGluZXJ0aWEpXG4gICAgLy8gSWYgZGFtcGluZyBpcyBlbmFibGVkLCB5b3UgbXVzdCBjYWxsIGNvbnRyb2xzLnVwZGF0ZSgpIGluIHlvdXIgYW5pbWF0aW9uIGxvb3BcbiAgICB0aGlzLmVuYWJsZURhbXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSAwLjI1O1xuXG4gICAgLy8gVGhpcyBvcHRpb24gYWN0dWFsbHkgZW5hYmxlcyBkb2xseWluZyBpbiBhbmQgb3V0OyBsZWZ0IGFzIFwiem9vbVwiIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB6b29taW5nXG4gICAgdGhpcy5lbmFibGVab29tID0gdHJ1ZTtcbiAgICB0aGlzLnpvb21TcGVlZCA9IDEuMDtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHJvdGF0aW5nXG4gICAgdGhpcy5lbmFibGVSb3RhdGUgPSB0cnVlO1xuICAgIHRoaXMucm90YXRlU3BlZWQgPSAxLjA7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSBwYW5uaW5nXG4gICAgdGhpcy5lbmFibGVQYW4gPSB0cnVlO1xuICAgIHRoaXMua2V5UGFuU3BlZWQgPSA3LjA7IC8vIHBpeGVscyBtb3ZlZCBwZXIgYXJyb3cga2V5IHB1c2hcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgcm90YXRlIGFyb3VuZCB0aGUgdGFyZ2V0XG4gICAgLy8gSWYgYXV0by1yb3RhdGUgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG4gICAgdGhpcy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgdGhpcy5hdXRvUm90YXRlU3BlZWQgPSAyLjA7IC8vIDMwIHNlY29uZHMgcGVyIHJvdW5kIHdoZW4gZnBzIGlzIDYwXG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB1c2Ugb2YgdGhlIGtleXNcbiAgICB0aGlzLmVuYWJsZUtleXMgPSB0cnVlO1xuXG4gICAgLy8gVGhlIGZvdXIgYXJyb3cga2V5c1xuICAgIHRoaXMua2V5cyA9IHtMRUZUOiAzNywgVVA6IDM4LCBSSUdIVDogMzksIEJPVFRPTTogNDB9O1xuXG4gICAgLy8gTW91c2UgYnV0dG9uc1xuICAgIHRoaXMubW91c2VCdXR0b25zID0ge09SQklUOiBNT1VTRS5MRUZULCBaT09NOiBNT1VTRS5NSURETEUsIFBBTjogTU9VU0UuUklHSFR9O1xuXG4gICAgLy8gZm9yIHJlc2V0XG4gICAgdGhpcy50YXJnZXQwID0gdGhpcy50YXJnZXQuY2xvbmUoKTtcbiAgICB0aGlzLnBvc2l0aW9uMCA9IHRoaXMub2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG4gICAgdGhpcy56b29tMCA9IHRoaXMub2JqZWN0Lnpvb207XG5cbiAgICAvL1xuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy9cblxuICAgIHRoaXMuZ2V0UG9sYXJBbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBzcGhlcmljYWwucGhpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEF6aW11dGhhbEFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC50aGV0YTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNldCA9ICgpID0+IHtcbiAgICAgIHRoaXMudGFyZ2V0LmNvcHkodGhpcy50YXJnZXQwKTtcbiAgICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLmNvcHkodGhpcy5wb3NpdGlvbjApO1xuICAgICAgdGhpcy5vYmplY3Quem9vbSA9IHRoaXMuem9vbTA7XG5cbiAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgLy8gdGhpcyBtZXRob2QgaXMgZXhwb3NlZCwgYnV0IHBlcmhhcHMgaXQgd291bGQgYmUgYmV0dGVyIGlmIHdlIGNhbiBtYWtlIGl0IHByaXZhdGUuLi5cbiAgICB0aGlzLnVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIC8vIHNvIGNhbWVyYS51cCBpcyB0aGUgb3JiaXQgYXhpc1xuICAgICAgY29uc3QgcXVhdCA9IG5ldyBRdWF0ZXJuaW9uKCkuc2V0RnJvbVVuaXRWZWN0b3JzKG9iamVjdC51cCwgbmV3IFZlY3RvcjMoMCwgMSwgMCkpO1xuICAgICAgY29uc3QgcXVhdEludmVyc2UgPSBxdWF0LmNsb25lKCkuaW52ZXJzZSgpO1xuXG4gICAgICBjb25zdCBsYXN0UG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xuICAgICAgY29uc3QgbGFzdFF1YXRlcm5pb24gPSBuZXcgUXVhdGVybmlvbigpO1xuXG4gICAgICByZXR1cm4gKCgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm9iamVjdC5wb3NpdGlvbjtcblxuICAgICAgICBvZmZzZXQuY29weShwb3NpdGlvbikuc3ViKHRoaXMudGFyZ2V0KTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IHRvIFwieS1heGlzLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0KTtcblxuICAgICAgICAvLyBhbmdsZSBmcm9tIHotYXhpcyBhcm91bmQgeS1heGlzXG4gICAgICAgIHNwaGVyaWNhbC5zZXRGcm9tVmVjdG9yMyhvZmZzZXQpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9Sb3RhdGUgJiYgc3RhdGUgPT09IFNUQVRFLk5PTkUpXG4gICAgICAgICAgcm90YXRlTGVmdChnZXRBdXRvUm90YXRpb25BbmdsZSgpKTtcblxuICAgICAgICBzcGhlcmljYWwudGhldGEgKz0gc3BoZXJpY2FsRGVsdGEudGhldGE7XG4gICAgICAgIHNwaGVyaWNhbC5waGkgKz0gc3BoZXJpY2FsRGVsdGEucGhpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHRoZXRhIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnRoZXRhID0gTWF0aC5tYXgodGhpcy5taW5BemltdXRoQW5nbGUsIE1hdGgubWluKHRoaXMubWF4QXppbXV0aEFuZ2xlLCBzcGhlcmljYWwudGhldGEpKTtcblxuICAgICAgICAvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwucGhpID0gTWF0aC5tYXgodGhpcy5taW5Qb2xhckFuZ2xlLCBNYXRoLm1pbih0aGlzLm1heFBvbGFyQW5nbGUsIHNwaGVyaWNhbC5waGkpKTtcblxuICAgICAgICBzcGhlcmljYWwubWFrZVNhZmUoKTtcblxuICAgICAgICBzcGhlcmljYWwucmFkaXVzICo9IHNjYWxlO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHJhZGl1cyB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC5yYWRpdXMgPSBNYXRoLm1heCh0aGlzLm1pbkRpc3RhbmNlLCBNYXRoLm1pbih0aGlzLm1heERpc3RhbmNlLCBzcGhlcmljYWwucmFkaXVzKSk7XG5cbiAgICAgICAgLy8gbW92ZSB0YXJnZXQgdG8gcGFubmVkIGxvY2F0aW9uXG4gICAgICAgIHRoaXMudGFyZ2V0LmFkZChwYW5PZmZzZXQpO1xuXG4gICAgICAgIG9mZnNldC5zZXRGcm9tU3BoZXJpY2FsKHNwaGVyaWNhbCk7XG5cbiAgICAgICAgLy8gcm90YXRlIG9mZnNldCBiYWNrIHRvIFwiY2FtZXJhLXVwLXZlY3Rvci1pcy11cFwiIHNwYWNlXG4gICAgICAgIG9mZnNldC5hcHBseVF1YXRlcm5pb24ocXVhdEludmVyc2UpO1xuXG4gICAgICAgIHBvc2l0aW9uLmNvcHkodGhpcy50YXJnZXQpLmFkZChvZmZzZXQpO1xuXG4gICAgICAgIHRoaXMub2JqZWN0Lmxvb2tBdCh0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlRGFtcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhICo9ICgxIC0gdGhpcy5kYW1waW5nRmFjdG9yKTtcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS5waGkgKj0gKDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICBzcGhlcmljYWxEZWx0YS5zZXQoMCwgMCwgMCk7XG5cbiAgICAgICAgc2NhbGUgPSAxO1xuICAgICAgICBwYW5PZmZzZXQuc2V0KDAsIDAsIDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBjb25kaXRpb24gaXM6XG4gICAgICAgIC8vIG1pbihjYW1lcmEgZGlzcGxhY2VtZW50LCBjYW1lcmEgcm90YXRpb24gaW4gcmFkaWFucyleMiA+IEVQU1xuICAgICAgICAvLyB1c2luZyBzbWFsbC1hbmdsZSBhcHByb3hpbWF0aW9uIGNvcyh4LzIpID0gMSAtIHheMiAvIDhcblxuICAgICAgICBpZiAoem9vbUNoYW5nZWRcbiAgICAgICAgICB8fCBsYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQodGhpcy5vYmplY3QucG9zaXRpb24pID4gRVBTXG4gICAgICAgICAgfHwgOCAqICgxIC0gbGFzdFF1YXRlcm5pb24uZG90KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pKSA+IEVQUykge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cbiAgICAgICAgICBsYXN0UG9zaXRpb24uY29weSh0aGlzLm9iamVjdC5wb3NpdGlvbik7XG4gICAgICAgICAgbGFzdFF1YXRlcm5pb24uY29weSh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKTtcbiAgICAgICAgICB6b29tQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KSgpO1xuICAgIH07XG5cbiAgICB0aGlzLmRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51LCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIG9uTW91c2VXaGVlbCwgZmFsc2UpO1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAgIC8vIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZGlzcG9zZScgfSApOyAvLyBzaG91bGQgdGhpcyBiZSBhZGRlZCBoZXJlP1xuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGludGVybmFsc1xuICAgIC8vXG5cbiAgICBjb25zdCBjaGFuZ2VFdmVudCA9IHt0eXBlOiAnY2hhbmdlJ307XG4gICAgY29uc3Qgc3RhcnRFdmVudCA9IHt0eXBlOiAnc3RhcnQnfTtcbiAgICBjb25zdCBlbmRFdmVudCA9IHt0eXBlOiAnZW5kJ307XG5cbiAgICBjb25zdCBTVEFURSA9IHtOT05FOiAtMSwgUk9UQVRFOiAwLCBET0xMWTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX0RPTExZOiA0LCBUT1VDSF9QQU46IDV9O1xuXG4gICAgbGV0IHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgIGNvbnN0IEVQUyA9IDAuMDAwMDAxO1xuXG4gICAgLy8gY3VycmVudCBwb3NpdGlvbiBpbiBzcGhlcmljYWwgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBzcGhlcmljYWwgPSBuZXcgU3BoZXJpY2FsKCk7XG4gICAgY29uc3Qgc3BoZXJpY2FsRGVsdGEgPSBuZXcgU3BoZXJpY2FsKCk7XG5cbiAgICBsZXQgc2NhbGUgPSAxO1xuICAgIGNvbnN0IHBhbk9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG4gICAgbGV0IHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBjb25zdCByb3RhdGVTdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3Qgcm90YXRlRW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVEZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBwYW5TdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgcGFuRW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5EZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBkb2xseVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBkb2xseUVuZCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlEZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdCBnZXRBdXRvUm90YXRpb25BbmdsZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiAyICogTWF0aC5QSSAvIDYwIC8gNjAgKiB0aGlzLmF1dG9Sb3RhdGVTcGVlZDtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Wm9vbVNjYWxlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGgucG93KDAuOTUsIHRoaXMuem9vbVNwZWVkKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgcm90YXRlTGVmdCA9IGFuZ2xlID0+IHtcbiAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhIC09IGFuZ2xlO1xuICAgIH07XG5cbiAgICBjb25zdCByb3RhdGVVcCA9IGFuZ2xlID0+IHtcbiAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAtPSBhbmdsZTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFuTGVmdCA9ICgoKSA9PiB7XG4gICAgICBjb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkaXN0YW5jZSwgb2JqZWN0TWF0cml4KSA9PiB7XG4gICAgICAgIHYuc2V0RnJvbU1hdHJpeENvbHVtbihvYmplY3RNYXRyaXgsIDApOyAvLyBnZXQgWCBjb2x1bW4gb2Ygb2JqZWN0TWF0cml4XG4gICAgICAgIHYubXVsdGlwbHlTY2FsYXIoLWRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHBhblVwID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRpc3RhbmNlLCBvYmplY3RNYXRyaXgpID0+IHtcbiAgICAgICAgdi5zZXRGcm9tTWF0cml4Q29sdW1uKG9iamVjdE1hdHJpeCwgMSk7IC8vIGdldCBZIGNvbHVtbiBvZiBvYmplY3RNYXRyaXhcbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XG4gICAgICAgIHBhbk9mZnNldC5hZGQodik7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICAvLyBkZWx0YVggYW5kIGRlbHRhWSBhcmUgaW4gcGl4ZWxzOyByaWdodCBhbmQgZG93biBhcmUgcG9zaXRpdmVcbiAgICBjb25zdCBwYW4gPSAoKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgcmV0dXJuIChkZWx0YVgsIGRlbHRhWSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gcGVyc3BlY3RpdmVcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuICAgICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO1xuICAgICAgICAgIGxldCB0YXJnZXREaXN0YW5jZSA9IG9mZnNldC5sZW5ndGgoKTtcblxuICAgICAgICAgIC8vIGhhbGYgb2YgdGhlIGZvdiBpcyBjZW50ZXIgdG8gdG9wIG9mIHNjcmVlblxuICAgICAgICAgIHRhcmdldERpc3RhbmNlICo9IE1hdGgudGFuKCh0aGlzLm9iamVjdC5mb3YgLyAyKSAqIE1hdGguUEkgLyAxODAuMCk7XG5cbiAgICAgICAgICAvLyB3ZSBhY3R1YWxseSBkb24ndCB1c2Ugc2NyZWVuV2lkdGgsIHNpbmNlIHBlcnNwZWN0aXZlIGNhbWVyYSBpcyBmaXhlZCB0byBzY3JlZW4gaGVpZ2h0XG4gICAgICAgICAgcGFuTGVmdCgyICogZGVsdGFYICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcCgyICogZGVsdGFZICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0NhbWVyYSkge1xuICAgICAgICAgIC8vIG9ydGhvZ3JhcGhpY1xuICAgICAgICAgIHBhbkxlZnQoZGVsdGFYICogKHRoaXMub2JqZWN0LnJpZ2h0IC0gdGhpcy5vYmplY3QubGVmdCkgLyB0aGlzLm9iamVjdC56b29tIC8gZWxlbWVudC5jbGllbnRXaWR0aCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcChkZWx0YVkgKiAodGhpcy5vYmplY3QudG9wIC0gdGhpcy5vYmplY3QuYm90dG9tKSAvIHRoaXMub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy5vYmplY3QubWF0cml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjYW1lcmEgbmVpdGhlciBvcnRob2dyYXBoaWMgbm9yIHBlcnNwZWN0aXZlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzTW9kdWxlLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBwYW4gZGlzYWJsZWQuJyk7XG4gICAgICAgICAgdGhpcy5lbmFibGVQYW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgZG9sbHlJbiA9IGRvbGx5U2NhbGUgPT4ge1xuICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpXG4gICAgICAgIHNjYWxlIC89IGRvbGx5U2NhbGU7XG5cbiAgICAgIGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSBNYXRoLm1heCh0aGlzLm1pblpvb20sIE1hdGgubWluKHRoaXMubWF4Wm9vbSwgdGhpcy5vYmplY3Quem9vbSAqIGRvbGx5U2NhbGUpKTtcbiAgICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICB6b29tQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyk7XG4gICAgICAgIHRoaXMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBkb2xseU91dCA9IGRvbGx5U2NhbGUgPT4ge1xuICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpXG4gICAgICAgIHNjYWxlICo9IGRvbGx5U2NhbGU7XG5cbiAgICAgIGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSBNYXRoLm1heCh0aGlzLm1pblpvb20sIE1hdGgubWluKHRoaXMubWF4Wm9vbSwgdGhpcy5vYmplY3Quem9vbSAvIGRvbGx5U2NhbGUpKTtcbiAgICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICB6b29tQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyk7XG4gICAgICAgIHRoaXMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGV2ZW50IGNhbGxiYWNrcyAtIHVwZGF0ZSB0aGUgb2JqZWN0IHN0YXRlXG4gICAgLy9cblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93blJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVTdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93bkRvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25Eb2xseScgKTtcblxuICAgICAgZG9sbHlTdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93blBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VEb3duUGFuJyApO1xuXG4gICAgICBwYW5TdGFydC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZVJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgcm90YXRlVXAoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgcm90YXRlU3RhcnQuY29weShyb3RhdGVFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmVEb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlRG9sbHknICk7XG5cbiAgICAgIGRvbGx5RW5kLnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKGRvbGx5RW5kLCBkb2xseVN0YXJ0KTtcblxuICAgICAgaWYgKGRvbGx5RGVsdGEueSA+IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZVBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VNb3ZlUGFuJyApO1xuXG4gICAgICBwYW5FbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKHBhbkVuZCwgcGFuU3RhcnQpO1xuXG4gICAgICBwYW4ocGFuRGVsdGEueCwgcGFuRGVsdGEueSk7XG5cbiAgICAgIHBhblN0YXJ0LmNvcHkocGFuRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VVcCcgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VXaGVlbCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlTW91c2VXaGVlbCcgKTtcblxuICAgICAgaWYgKGV2ZW50LmRlbHRhWSA8IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZWxzZSBpZiAoZXZlbnQuZGVsdGFZID4gMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZUtleURvd24nICk7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIHRoaXMua2V5cy5VUDpcbiAgICAgICAgICBwYW4oMCwgdGhpcy5rZXlQYW5TcGVlZCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5CT1RUT006XG4gICAgICAgICAgcGFuKDAsIC10aGlzLmtleVBhblNwZWVkKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLkxFRlQ6XG4gICAgICAgICAgcGFuKHRoaXMua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuUklHSFQ6XG4gICAgICAgICAgcGFuKC10aGlzLmtleVBhblNwZWVkLCAwKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnRSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnRSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydERvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0RG9sbHknICk7XG5cbiAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGRvbGx5U3RhcnQuc2V0KDAsIGRpc3RhbmNlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydFBhbiA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydFBhbicgKTtcblxuICAgICAgcGFuU3RhcnQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVSb3RhdGUgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZVJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlRW5kLnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICAgIHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMocm90YXRlRW5kLCByb3RhdGVTdGFydCk7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcbiAgICAgIHJvdGF0ZUxlZnQoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcbiAgICAgIHJvdGF0ZVVwKDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkocm90YXRlRW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZURvbGx5JyApO1xuXG4gICAgICBjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICBkb2xseUVuZC5zZXQoMCwgZGlzdGFuY2UpO1xuXG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZG9sbHlTdGFydC5jb3B5KGRvbGx5RW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaE1vdmVQYW4nICk7XG5cbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCk7XG5cbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcblxuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaEVuZCA9ICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hFbmQnICk7XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gZXZlbnQgaGFuZGxlcnMgLSBGU006IGxpc3RlbiBmb3IgZXZlbnRzIGFuZCByZXNldCBzdGF0ZVxuICAgIC8vXG5cbiAgICBjb25zdCBvbk1vdXNlRG93biA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLk9SQklUKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25Sb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIHN0YXRlID0gU1RBVEUuUk9UQVRFO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLlpPT00pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZURvd25Eb2xseShldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5ET0xMWTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuYnV0dG9uID09PSB0aGlzLm1vdXNlQnV0dG9ucy5QQU4pIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93blBhbihldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5QQU47XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuTk9ORSkge1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKHN0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZVJvdGF0ZShldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBTVEFURS5ET0xMWSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlTW92ZURvbGx5KGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFNUQVRFLlBBTikge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlUGFuKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlTW91c2VVcChldmVudCk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVdoZWVsID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVab29tID09PSBmYWxzZSB8fCAoc3RhdGUgIT09IFNUQVRFLk5PTkUgJiYgc3RhdGUgIT09IFNUQVRFLlJPVEFURSkpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBoYW5kbGVNb3VzZVdoZWVsKGV2ZW50KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpOyAvLyBub3Qgc3VyZSB3aHkgdGhlc2UgYXJlIGhlcmUuLi5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlIHx8IHRoaXMuZW5hYmxlS2V5cyA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZUtleURvd24oZXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnRSb3RhdGUoZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkoZXZlbnQpO1xuXG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ET0xMWTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydFBhbihldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1BBTjtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5OT05FKVxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX1JPVEFURSkgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZVJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9ET0xMWSkgcmV0dXJuOyAvLyBpcyB0aGlzIG5lZWRlZD8uLi5cblxuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZURvbGx5KGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUEFOKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUGFuKGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaEVuZCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIGhhbmRsZVRvdWNoRW5kKGV2ZW50KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNvbnRleHRNZW51ID0gZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAgLy9cblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd3aGVlbCcsIG9uTW91c2VXaGVlbCwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuXG4gICAgLy8gZm9yY2UgYW4gdXBkYXRlIGF0IHN0YXJ0XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0IGNlbnRlcigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5jZW50ZXIgaGFzIGJlZW4gcmVuYW1lZCB0byAudGFyZ2V0Jyk7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0O1xuICB9XG5cbiAgZ2V0IG5vWm9vbSgpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVpvb207XG4gIH1cblxuICBzZXQgbm9ab29tKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9ab29tIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlWm9vbSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlWm9vbSA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub1JvdGF0ZSgpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1JvdGF0ZSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVJvdGF0ZSBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVSb3RhdGU7XG4gIH1cblxuICBzZXQgbm9Sb3RhdGUodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1JvdGF0ZSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVJvdGF0ZSBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlUm90YXRlID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vUGFuKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUGFuIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUGFuIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVBhbjtcbiAgfVxuXG4gIHNldCBub1Bhbih2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUGFuIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUGFuIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVQYW4gPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9LZXlzKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vS2V5cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZUtleXMgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlS2V5cztcbiAgfVxuXG4gIHNldCBub0tleXModmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub0tleXMgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVLZXlzIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVLZXlzID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0YXRpY01vdmluZygpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5zdGF0aWNNb3ZpbmcgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVEYW1waW5nIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZURhbXBpbmc7XG4gIH1cblxuICBzZXQgc3RhdGljTW92aW5nKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuc3RhdGljTW92aW5nIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlRGFtcGluZyBpbnN0ZWFkLicpO1xuICAgIHRoaXMuZW5hYmxlRGFtcGluZyA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBkeW5hbWljRGFtcGluZ0ZhY3RvcigpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5keW5hbWljRGFtcGluZ0ZhY3RvciBoYXMgYmVlbiByZW5hbWVkLiBVc2UgLmRhbXBpbmdGYWN0b3IgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gdGhpcy5kYW1waW5nRmFjdG9yO1xuICB9XG5cbiAgc2V0IGR5bmFtaWNEYW1waW5nRmFjdG9yKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAuZHluYW1pY0RhbXBpbmdGYWN0b3IgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIC5kYW1waW5nRmFjdG9yIGluc3RlYWQuJyk7XG4gICAgdGhpcy5kYW1waW5nRmFjdG9yID0gdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7VmVjdG9yM30gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDb250cm9sc01vZHVsZX0gZnJvbSAnLi4vQ29udHJvbHNNb2R1bGUnO1xuXG5pbXBvcnQge1RocmVlT3JiaXRDb250cm9sc30gZnJvbSAnLi9saWIvVGhyZWVPcmJpdENvbnRyb2xzJztcblxuZXhwb3J0IGNsYXNzIE9yYml0Q29udHJvbHNNb2R1bGUgZXh0ZW5kcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBmb2xsb3c6IGZhbHNlLFxuICAgICAgb2JqZWN0OiBudWxsLFxuICAgICAgdGFyZ2V0OiBuZXcgVmVjdG9yMygwLCAwLCAwKVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBzdXBlci5tYW5hZ2VyKG1hbmFnZXIpO1xuXG4gICAgY29uc3Qge29iamVjdDogb2JqLCBmb2xsb3csIHRhcmdldH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBvYmplY3QgPSBvYmogPyBvYmoubmF0aXZlIDogbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZTtcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IFRocmVlT3JiaXRDb250cm9scyhcbiAgICAgIG9iamVjdCxcbiAgICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JyksXG4gICAgICBtYW5hZ2VyLmhhbmRsZXJcbiAgICApO1xuXG4gICAgY29uc3QgdXBkYXRlUHJvY2Vzc29yID0gZm9sbG93ID8gYyA9PiB7XG4gICAgICBjb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICAgIGNvbnRyb2xzLnRhcmdldC5jb3B5KHRhcmdldCk7XG4gICAgfSA6IGMgPT4ge1xuICAgICAgY29udHJvbHMudXBkYXRlKGMuZ2V0RGVsdGEoKSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0Q29udHJvbHMoY29udHJvbHMpO1xuICAgIHRoaXMuc2V0VXBkYXRlKHVwZGF0ZVByb2Nlc3Nvcik7XG5cbiAgICBtYW5hZ2VyLnVwZGF0ZSh7XG4gICAgICBjYW1lcmE6IGNhbWVyYSA9PiB7XG4gICAgICAgIGlmIChvYmopIHJldHVybjtcbiAgICAgICAgY29udHJvbHMub2JqZWN0ID0gY2FtZXJhLm5hdGl2ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRyb2xzLnRhcmdldC5jb3B5KHRhcmdldCk7XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvYXBwL2NvbnRyb2xzICovXG5leHBvcnQgKiBmcm9tICcuL09yYml0Q29udHJvbHNNb2R1bGUnO1xuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9hcHAgKi9cbmV4cG9ydCAqIGZyb20gJy4vRWxlbWVudE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1JlbmRlcmluZ01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1NjZW5lTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUmVzaXplTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUG9zdFByb2Nlc3Nvck1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1ZpcnR1YWxNb3VzZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50c1BhdGNoTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29udHJvbHNNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Gb2dNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0ZU1vZHVsZSc7XG5cbi8vIGNvbnRyb2xzXG5leHBvcnQgKiBmcm9tICcuL2NvbnRyb2xzL2luZGV4JztcbiIsIi8qKlxuICogQGNsYXNzIER5bmFtaWNHZW9tZXRyeU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2F0dHJpYnV0ZXM6IGZhbHNlfV0gLSBwYXJhbXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhdGNoRXZlbnRzPXRydWVdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvbWVzaFxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0dlb21ldHJ5TW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYXR0cmlidXRlczogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzZWxmLnBhcmFtcztcblxuICAgIHRoaXMuZ18gPSBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcbiAgICAgIGlmICh0aGlzLmJ1aWxkR2VvbWV0cnkpIHtcbiAgICAgICAgdGhpcy5uYXRpdmUuZ2VvbWV0cnkgPSB0aGlzLmJ1aWxkR2VvbWV0cnkoXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbXMoe2dlb21ldHJ5OiBwYXJhbXN9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAocGFyYW1zLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucGFyYW1zLmdlb21ldHJ5KSB7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgYGdfJHtrZXl9YCwge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmUuZ2VvbWV0cnkucGFyYW1ldGVyc1trZXldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLm5hdGl2ZS5nZW9tZXRyeSA9IHRoaXMuYnVpbGRHZW9tZXRyeSh0aGlzLnVwZGF0ZVBhcmFtcyh7Z2VvbWV0cnk6IHtba2V5XTogdmFsdWV9fSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUmVwZWF0V3JhcHBpbmcsXG4gIFVWTWFwcGluZyxcbiAgTmVhcmVzdEZpbHRlcixcbiAgTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyLFxuICBUZXh0dXJlTG9hZGVyLFxuICBWZWN0b3IyXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgbG9hZGVyID0gbmV3IFRleHR1cmVMb2FkZXIoKTtcblxuLyoqXG4gKiBAY2xhc3MgVGV4dHVyZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQGRlc2NyaXB0aW9uIEEgVGV4dHVyZU1vZHVsZSBjYW4gYmUgYXBwbGllZCB0byBhbnkgTWVzaCBvciBNb2RlbC5cbiAqIEBwYXJhbSB7QXJyYXl9IFt0ZXh0dXJlc10gLSBhcnJheSBvZiB0ZXh0dXJlIG9iamVjdHNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBpbnN0YW5jZS4gdXJsIHRha2VzIGEgcGF0aCwgb3IgYSBkYXRhIG9iamVjdC48L2NhcHRpb24+XG4gKiB2YXIgd29vZFRleHR1cmUgPSBuZXcgVGV4dHVyZU1vZHVsZSh7XG4gKiAgIHVybDogYCR7cHJvY2Vzcy5hc3NldHNQYXRofS90ZXh0dXJlcy93b29kLmpwZ2BcbiAqIH0pO1xuICogQGV4YW1wbGUgPGNhcHRpb24+TW9yZSBjb21wcmVoZW5zaXZlIGV4YW1wbGUsIHdvb2QgdGV4dHVyZSBhcHBsaWVkIHRvIGEgQm94LjwvY2FwdGlvbj5cbiAqIG5ldyBCb3goe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHdpZHRoOiAyLFxuICogICAgIGhlaWdodDogMixcbiAqICAgICBkZXB0aDogMlxuICogICB9LFxuICogICBtb2R1bGVzOiBbXG4gKiAgICAgbmV3IFRleHR1cmVNb2R1bGUoe1xuICogICAgICAgdXJsOiBgcGF0aC90by90ZXh0dXJlLmpwZ2AsXG4gKiAgICAgICByZXBlYXQ6IG5ldyBUSFJFRS5WZWN0b3IyKDEsIDEpIC8vIG9wdGlvbmFsXG4gKiAgICAgfSlcbiAqICAgXSxcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICogICBwb3NpdGlvbjogWzUwLCA2MCwgNzBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5leHBvcnQgY2xhc3MgVGV4dHVyZU1vZHVsZSB7XG4gIHN0YXRpYyBsb2FkKHVybCkge1xuICAgIHJldHVybiBuZXcgVGV4dHVyZU1vZHVsZSh7dXJsfSkudGV4dHVyZXNbMF1bMV07XG4gIH1cblxuICB0ZXh0dXJlcyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKC4uLnRleHR1cmVzKSB7XG4gICAgdGV4dHVyZXMuZm9yRWFjaCgoe1xuICAgICAgdXJsLFxuICAgICAgdHlwZSA9ICdtYXAnLFxuICAgICAgb2Zmc2V0ID0gbmV3IFZlY3RvcjIoMCwgMCksXG4gICAgICByZXBlYXQgPSBuZXcgVmVjdG9yMigxLCAxKSxcbiAgICAgIHdyYXAgPSBSZXBlYXRXcmFwcGluZyxcbiAgICAgIG1hcHBpbmcgPSBVVk1hcHBpbmcsXG4gICAgICBmaXggPSB0ZXggPT4gdGV4XG4gICAgfSkgPT4ge1xuICAgICAgY29uc3QgdGV4dHVyZSA9IGxvYWRlci5sb2FkKHVybCk7XG5cbiAgICAgIGlmICh3cmFwLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IHdyYXBbMF07XG4gICAgICAgIHRleHR1cmUud3JhcFQgPSB3cmFwWzFdO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHRleHR1cmUud3JhcFMgPSB0ZXh0dXJlLndyYXBUID0gd3JhcDtcblxuICAgICAgdGV4dHVyZS5tYXBwaW5nID0gbWFwcGluZztcblxuICAgICAgdGV4dHVyZS5vZmZzZXQuY29weShvZmZzZXQpO1xuICAgICAgdGV4dHVyZS5yZXBlYXQuY29weShyZXBlYXQpO1xuXG4gICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IE5lYXJlc3RGaWx0ZXI7XG4gICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IExpbmVhck1pcE1hcExpbmVhckZpbHRlcjtcblxuICAgICAgdGhpcy50ZXh0dXJlcy5wdXNoKFt0eXBlLCBmaXgodGV4dHVyZSldKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtYXRlcmlhbChtYXRlcmlhbCwgc2VsZikge1xuICAgICAgc2VsZi50ZXh0dXJlcy5mb3JFYWNoKHRleHR1cmUgPT4ge1xuICAgICAgICBtYXRlcmlhbFt0ZXh0dXJlWzBdXSA9IHRleHR1cmVbMV07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQW5pbWF0aW9uTWl4ZXIsXG4gIEFuaW1hdGlvbkNsaXAsXG4gIENsb2NrXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG4vKipcbiAqIEBjbGFzcyBBbmltYXRpb25Nb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL21lc2hcbiAqIEBkZXNjcmlwdGlvbiBDb252ZW5pZW5jZSBtb2R1bGUgdGhhdCB3cmFwcyB0aGUgPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNtYW51YWwvaW50cm9kdWN0aW9uL0FuaW1hdGlvbi1zeXN0ZW0nPnRocmVlLmpzIGFuaW1hdGlvbiBzeXN0ZW08L2E+XG4gKiBAcGFyYW0ge0FwcH0gYXBwIC0gdGhlIGFwcFxuICogQHBhcmFtIHtCb29sZWFufSBbaXNEZWZlcnJlZD1mYWxzZV0gLSBzZXQgdG8gdHJ1ZSBpZiBhbmltYXRpb24gc2hvdWxkIG5vdCBzdGFydCBhdXRvbWF0aWNhbGx5XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17c3BlZWQ6IDF9XSAtIHRoZSBwYXJhbXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW5pbWF0aW9uIG1vZHVsZSBhbmQgcGxheSBhIGdpdmVuIGNsaXAgb2YgYW4gaW1wb3J0ZWQgbW9kZWw8L2NhcHRpb24+XG4gKiBjb25zdCBhbmltYXRpb25Nb2R1bGUgPSBuZXcgQW5pbWF0aW9uTW9kdWxlKGFwcCwgZmFsc2UsIHtcbiAqICAgc3BlZWQ6IDEuMiAvLyBzcGVlZCB1cCBhbmltYXRpb24gYnkgMjAlXG4gKiB9KTtcbiAqXG4gKiBuZXcgSW1wb3J0ZXIoe1xuICogICBwYXJzZXIoZ2VvbWV0cnksIG1hdGVyaWFscykge1xuICogICAgIC8vIE92ZXJyaWRlIHBhcnNlIHRvIGdlbmVyYXRlIGEgc2tpbm5lZE1lc2gsIG5lZWRlZCBmb3Igc2tpbm5lZCBtb2RlbHNcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLlNraW5uZWRNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICogICB9LFxuICpcbiAqICAgdXJsOiBgcGF0aC90by9tb2RlbC5qc29uYCxcbiAqICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IHRydWUsXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAqICAgICBza2lubmluZzogdHJ1ZVxuICogICB9KSxcbiAqXG4gKiAgIG1vZHVsZXM6IFthbmltYXRpb25Nb2R1bGVdXG4gKiB9KS5hZGRUbyhhcHApLnRoZW4oKCkgPT4ge1xuICogICAvLyBhZGRpbmcgbW9kZWwgdG8gYXBwIHJldHVybnMgYSBwcm9taXNlLCBzbyBwaXBlIHRoZSBmdW5jdGlvbiB0byBraWNrIG9mZiB0aGUgYW5pbWF0aW9uIGNsaXBcbiAqICAgYW5pbWF0aW9uTW9kdWxlLnBsYXkoJ2NsaXBOYW1lJyk7XG4gKiB9KTtcbiAqL1xuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGFwcCwgaXNEZWZlcnJlZCwgcGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgc3BlZWQ6IDFcbiAgICB9LCBwYXJhbXMpO1xuICAgIHRoaXMuY2xvY2sgPSBuZXcgQ2xvY2soKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuaXNEZWZlcnJlZCA9IGlzRGVmZXJyZWQ7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwbGF5XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUGxheXMgdGhlIGdpdmVuIGNsaXAgbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xpcE5hbWUgLSB0aGUgY2xpcCB0byBwbGF5XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoLkFuaW1hdGlvbk1vZHVsZVxuICAgKi9cbiAgcGxheShjbGlwTmFtZSkge1xuICAgIGNvbnN0IGNsaXAgPSBBbmltYXRpb25DbGlwLmZpbmRCeU5hbWUodGhpcy5jbGlwcywgY2xpcE5hbWUpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMubWl4ZXIuY2xpcEFjdGlvbihjbGlwKTtcblxuICAgIGFjdGlvbi5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgdGhlIG1peGVyIChiZWluZyBjYWxsZWQgb24gZnJhbWUgYW5pbWF0aW9uIGxvb3ApXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoLkFuaW1hdGlvbk1vZHVsZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLm1peGVyKSB0aGlzLm1peGVyLnVwZGF0ZSh0aGlzLmNsb2NrLmdldERlbHRhKCkgKiB0aGlzLnBhcmFtcy5zcGVlZCk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYubG9vcCA9IG5ldyBMb29wKCgpID0+IHtcbiAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXNlbGYuaXNEZWZlcnJlZCkgc2VsZi5sb29wLnN0YXJ0KHNlbGYuYXBwKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdhbmltYXRpb24nKTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtZXNoKG1lc2gsIHNlbGYpIHtcbiAgICAgIG1lc2guZ2VvbWV0cnkuc2tlbGV0b24gPSBtZXNoLnNrZWxldG9uO1xuXG4gICAgICBzZWxmLm1peGVyID0gbmV3IEFuaW1hdGlvbk1peGVyKG1lc2guZ2VvbWV0cnkpO1xuICAgICAgc2VsZi5jbGlwcyA9IG1lc2guZ2VvbWV0cnkuYW5pbWF0aW9ucztcblxuICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL21lc2ggKi9cbmV4cG9ydCAqIGZyb20gJy4vRHluYW1pY0dlb21ldHJ5TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVGV4dHVyZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0FuaW1hdGlvbk1vZHVsZSc7XG4iLCIvKipcbiAqIEBjbGFzcyBEZWZpbmVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgRGVmaW5lTW9kdWxlIHdpdGggUGVyc3BlY3RpdmVDYW1lcmEgYXMgY2FtZXJhIG1vZHVsZSBhbmQgcGFzc2luZyBpdCB0byBBcHAncyBtb2R1bGVzPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIC8vIC4uLlxuICogICBuZXcgRGVmaW5lTW9kdWxlKCdjYW1lcmEnLCBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoKSlcbiAqIF0pO1xuICovXG5leHBvcnQgY2xhc3MgRGVmaW5lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KHRoaXMubmFtZSwgdGhpcy5kYXRhKTtcbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcyAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2FwcC9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL21lc2gvaW5kZXgnO1xuXG4vLyBtb2R1bGVzXG5leHBvcnQgKiBmcm9tICcuL0RlZmluZU1vZHVsZSc7XG4iLCJpbXBvcnQge0ltcG9ydGVyfSBmcm9tICcuL2NvbXBvbmVudHMvbWVzaGVzL0ltcG9ydGVyJztcbmltcG9ydCB7UGVyc3BlY3RpdmVDYW1lcmF9IGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhJztcblxuZXhwb3J0IGNsYXNzIE1vZGVsIGV4dGVuZHMgSW1wb3J0ZXIge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMsIC4uLmFkZGl0aW9uYWwpIHtcbiAgICBjb25zb2xlLndhcm4oJ01vZGVsIGlzIGRlcHJlY2F0ZWQuIFVzZSBJbXBvcnRlciBpbnN0ZWFkLicpO1xuXG4gICAgaWYgKHBhcmFtcy5nZW9tZXRyeSkge1xuICAgICAgcGFyYW1zLnVybCA9IHBhcmFtcy5nZW9tZXRyeS5wYXRoO1xuICAgICAgcGFyYW1zLmxvYWRlciA9IHBhcmFtcy5nZW9tZXRyeS5sb2FkZXI7XG4gICAgfVxuXG4gICAgc3VwZXIocGFyYW1zLCAuLi5hZGRpdGlvbmFsKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FtZXJhTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBjb25zb2xlLndhcm4oJ0NhbWVyYU1vZHVsZSBpcyBkZXByZWNhdGVkLiBVc2UgRGVmaW5lTW9kdWxlIGluc3RlYWQuJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEocGFyYW1zKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgdGhpcy5hZGQoc2VsZi5jYW1lcmEpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2NhbWVyYScsIHRoaXMuY2FtZXJhKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBOYW1lc3BhY2UgY29udGFpbmluZyBhbGwgY2xhc3NlcyBmcm9tIGFsbCBtb2R1bGVzLiBVc2VkIGFzIGdsb2JhbCBpbiBVTUQgcGF0dGVybi5cbiAqIEBuYW1lc3BhY2UgV0hTXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgdXNlIG9mIFdIUyBuYW1lc3BhY2UuPC9jYXB0aW9uPlxuICogbmV3IFdIUy5BcHAoKSAvLyBjb3JlXG4gKiBuZXcgV0hTLlBlcnNwZWN0aXZlQ2FtZXJhKCkgLy8gY29tcG9uZW50c1xuICogbmV3IFdIUy5SZXNpemVNb2R1bGUoKSAvLyBtb2R1bGVzXG4gKiBXSFMuZXh0ZW5kKCkgLy8gdXRpbHNcbiAqL1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vY29yZS9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMvaW5kZXgnO1xuXG4vLyBERVBSRUNBVElPTlxuZXhwb3J0ICogZnJvbSAnLi9kZXByZWNhdGlvbic7XG4iXSwibmFtZXMiOlsiZXh0ZW5kIiwib2JqZWN0IiwiZXh0ZW5zaW9ucyIsImV4dGVuc2lvbiIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJwcm9wIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwiaW5zdHJ1Y3QiLCJhcnJheSIsImluc3RBcnJheSIsInRlbXBPYmplY3QiLCJpIiwibWF4IiwibGVuZ3RoIiwiZ3VpZGUiLCJ0cmFuc2Zvcm1EYXRhIiwiaW5zdHJ1Y3Rpb25zIiwia2V5IiwidG9BcnJheSIsImluc3RydWN0aW9uIiwidGVtcEFycmF5IiwiQ29tcG9zaXRpb25FcnJvciIsImNsYXNzSW5zdGFuY2UiLCJtZXNzYWdlIiwiY29tcG9uZW50Iiwic3RhY2tBcnJheSIsInN0YWNrIiwic3BsaXQiLCJzcGxpY2UiLCJqb2luIiwiY29uc29sZSIsImVycm9yIiwibmFtZSIsIkVycm9yIiwiRGVwZW5kZW5jeUVycm9yIiwiYWN0aXZlTW9kdWxlIiwiZGVwZW5kZW5jeU1vZHVsZSIsIk1hbmFnZXJFcnJvciIsIndhcm5EZXBzIiwiUkVWSVNJT04iLCJlcnIiLCJNb2R1bGVTeXN0ZW0iLCJzb3VyY2UiLCJtb2R1bGVzIiwiYXBwbHlNb2R1bGUiLCJhcHBseUJyaWRnZSIsIm9uQ29weSIsImJyaWRnZU1hcCIsIm1vZHVsZSIsImJyaWRnZSIsImFwcGx5IiwiY2IiLCJmdW5jIiwibW9kdWxlU2NvcGUiLCJwdXNoIiwibWFuYWdlciIsImFjdGl2ZSIsImludGVncmF0ZSIsImJpbmQiLCJkaXNwb3NlTW9kdWxlIiwiaW5kZXhPZiIsImRpc3Bvc2UiLCJFdmVudHMiLCJTeW1ib2wiLCJvYmplY3RQcm90byIsImhhc093blByb3BlcnR5Iiwic3ltVG9TdHJpbmdUYWciLCJuYXRpdmVPYmplY3RUb1N0cmluZyIsInJvb3QiLCJwb255ZmlsbCIsIiQkb2JzZXJ2YWJsZSIsIk1vZHVsZU1hbmFnZXIiLCJoYW5kbGVyIiwiY3VycmVudE1vZHVsZSIsInN0b3JlIiwiY3JlYXRlU3RvcmUiLCJzdGF0ZSIsImFjdGlvbiIsImRhdGEiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiQm9vbGVhbiIsImRlcHNNYXAiLCJzdWJzY3JpYmUiLCJjaGFuZ2VkS2V5IiwiY2FsbGJhY2siLCJ3YXJuIiwic2V0IiwibW9kdWxlRXhlY3V0b3IiLCJ1c2UiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJkZWZhdWx0cyIsIl93YWl0IiwiY2hpbGRyZW4iLCJpbnRlZ3JhdGVNb2R1bGVzIiwicHJvbWlzZSIsIlByb21pc2UiLCJhbGwiLCJpc0RlZmZlcmVkIiwid2FpdCIsInRoZW4iLCJjb3B5IiwiY3VzdG9taXplIiwibmF0aXZlIiwiY2xvbmUiLCJwYXJlbnQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGVmZXIiLCJhZGRQcm9taXNlIiwib25BZGQiLCJyZXNvbHZlciIsImFkZCIsInJlbW92ZSIsIl9tYW5hZ2VyIiwiX25hdGl2ZSIsIm1lc2giLCJhdHRyaWJ1dGVzIiwibWFwcGVycyIsInRhcmdldCIsIm1hcHBlciIsImsiLCJtYXAiLCJhdHRyaWJ1dGUiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldHRlciIsInNldHRlciIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ2YWx1ZSIsIm1pcnJvciIsIk1lc2hDb21wb25lbnQiLCJnZW9tIiwiTWVzaCIsIm1hdGVyaWFsIiwiZ2VvbWV0cnkiLCJjdXN0b20iLCJidWlsZCIsIndyYXAiLCJhcHBseUNvbW1hbmQiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJzaGFkb3ciLCJ4IiwieSIsInoiLCJjYXN0U2hhZG93IiwiY2FzdCIsInJlY2VpdmVTaGFkb3ciLCJyZWNlaXZlIiwib25XcmFwIiwicXVhdGVybmlvbiIsImRlc3QiLCJMaWdodENvbXBvbmVudCIsIm1hcFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJpYXMiLCJyYWRpdXMiLCJzaGFkb3dDYW1lcmEiLCJjYW1lcmEiLCJuZWFyIiwiZmFyIiwiZm92IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiQ2FtZXJhQ29tcG9uZW50Iiwic3lzdGVtIiwid2luZG93IiwiZ2xvYmFsIiwiQXBwIiwibG9nIiwidmVyc2lvbiIsInNpbXVsYXRlIiwidXBkYXRlRW5hYmxlZCIsImxvb3BzIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFRpbWVvdXQiLCJwcm9jZXNzIiwibGwiLCJlIiwiZW5hYmxlZCIsImV4ZWN1dGUiLCJjbG9jayIsImxvb3AiLCJpbmRleCIsImdldCIsIkxvb3AiLCJ1c2VDbG9jayIsIkNsb2NrIiwid29ybGQiLCJhZGRMb29wIiwic3RhcnQiLCJzdG9wIiwicmVtb3ZlTG9vcCIsIkFtYmllbnRMaWdodCIsImxpZ2h0IiwiQW1iaWVudExpZ2h0TmF0aXZlIiwiY29sb3IiLCJpbnRlbnNpdHkiLCJEaXJlY3Rpb25hbExpZ2h0Iiwid3JhcFNoYWRvdyIsIkRpcmVjdGlvbmFsTGlnaHROYXRpdmUiLCJIZW1pc3BoZXJlTGlnaHQiLCJIZW1pc3BoZXJlTGlnaHROYXRpdmUiLCJza3lDb2xvciIsImdyb3VuZENvbG9yIiwiUG9pbnRMaWdodCIsIlBvaW50TGlnaHROYXRpdmUiLCJkaXN0YW5jZSIsImRlY2F5IiwiU3BvdExpZ2h0IiwiU3BvdExpZ2h0TmF0aXZlIiwiYW5nbGUiLCJleHBvbmVudCIsIk1hdGgiLCJQSSIsIkFyZWFMaWdodCIsIlJlY3RBcmVhTGlnaHROYXRpdmUiLCJDdWJlQ2FtZXJhIiwiQ3ViZUNhbWVyYU5hdGl2ZSIsImN1YmVSZXNvbHV0aW9uIiwiT3J0aG9ncmFwaGljQ2FtZXJhIiwiT3J0aG9ncmFwaGljQ2FtZXJhTmF0aXZlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJQZXJzcGVjdGl2ZUNhbWVyYU5hdGl2ZSIsImFzcGVjdCIsIkJveCIsImJ1aWxkR2VvbWV0cnkiLCJidWZmZXIiLCJCb3hCdWZmZXJHZW9tZXRyeSIsIkJveEdlb21ldHJ5IiwiZGVwdGgiLCJ3aWR0aFNlZ21lbnRzIiwiaGVpZ2h0U2VnbWVudHMiLCJkZXB0aFNlZ21lbnRzIiwiQ2lyY2xlIiwiQ2lyY2xlQnVmZmVyR2VvbWV0cnkiLCJDaXJjbGVHZW9tZXRyeSIsInNlZ21lbnRzIiwidGhldGFTdGFydCIsInRoZXRhTGVuZ3RoIiwiQ29uZSIsIkNvbmVCdWZmZXJHZW9tZXRyeSIsIkNvbmVHZW9tZXRyeSIsInJhZGl1c1NlZ21lbnRzIiwib3BlbkVuZGVkIiwiQ3lsaW5kZXIiLCJDeWxpbmRlckJ1ZmZlckdlb21ldHJ5IiwiQ3lsaW5kZXJHZW9tZXRyeSIsInJhZGl1c1RvcCIsInJhZGl1c0JvdHRvbSIsIkRvZGVjYWhlZHJvbiIsIkRvZGVjYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiRG9kZWNhaGVkcm9uR2VvbWV0cnkiLCJkZXRhaWwiLCJFeHRydWRlIiwiRXh0cnVkZUdlb21ldHJ5Iiwic2hhcGVzIiwib3B0aW9ucyIsIkJ1ZmZlckdlb21ldHJ5IiwiZnJvbUdlb21ldHJ5IiwiSWNvc2FoZWRyb24iLCJJY29zYWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiSWNvc2FoZWRyb25HZW9tZXRyeSIsIkxhdGhlIiwiTGF0aGVCdWZmZXJHZW9tZXRyeSIsIkxhdGhlR2VvbWV0cnkiLCJwb2ludHMiLCJMaW5lIiwiTGluZU5hdGl2ZSIsIkdlb21ldHJ5IiwicHAiLCJjdXJ2ZSIsImdldFBvaW50cyIsInZlcnRzIiwiRmxvYXQzMkFycmF5IiwiaTMiLCJhZGRBdHRyaWJ1dGUiLCJCdWZmZXJBdHRyaWJ1dGUiLCJ2ZXJ0aWNlcyIsIkltcG9ydGVyIiwiZmlsdGVyIiwicHJvY2Vzc0ZpbHRlciIsImZvckVhY2giLCJlbCIsInRleHR1cmVQYXRoIiwibGFvZGVyIiwic2V0VGV4dHVyZVBhdGgiLCJsb2FkZXIiLCJsb2FkIiwidXJsIiwib25Mb2FkIiwicGFyc2VyIiwidXNlQ3VzdG9tTWF0ZXJpYWwiLCJtYXQiLCJvblByb2dyZXNzIiwib25FcnJvciIsIkpTT05Mb2FkZXIiLCJtYXRlcmlhbHMiLCJPY3RhaGVkcm9uIiwiT2N0YWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiT2N0YWhlZHJvbkdlb21ldHJ5IiwiUGFyYW1ldHJpYyIsIlBhcmFtZXRyaWNCdWZmZXJHZW9tZXRyeSIsIlBhcmFtZXRyaWNHZW9tZXRyeSIsInNsaWNlcyIsInN0YWNrcyIsInUiLCJ2IiwiVmVjdG9yMyIsIlBsYW5lIiwiUGxhbmVCdWZmZXJHZW9tZXRyeSIsIlBsYW5lR2VvbWV0cnkiLCJ3U2VnbWVudHMiLCJoU2VnbWVudHMiLCJ2ZXJ0aWNlc09mQ3ViZSIsImluZGljZXNPZkZhY2VzIiwiUG9seWhlZHJvbiIsIlBvbHloZWRyb25CdWZmZXJHZW9tZXRyeSIsIlBvbHloZWRyb25HZW9tZXRyeSIsIlJpbmciLCJSaW5nQnVmZmVyR2VvbWV0cnkiLCJSaW5nR2VvbWV0cnkiLCJpbm5lclJhZGl1cyIsIm91dGVyUmFkaXVzIiwidGhldGFTZWdtZW50cyIsInBoaVNlZ21lbnRzIiwiU2hhcGUiLCJTaGFwZUJ1ZmZlckdlb21ldHJ5IiwiU2hhcGVHZW9tZXRyeSIsIlNwaGVyZSIsIlNwaGVyZUJ1ZmZlckdlb21ldHJ5IiwiU3BoZXJlR2VvbWV0cnkiLCJUZXRyYWhlZHJvbiIsIlRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJUZXRyYWhlZHJvbkdlb21ldHJ5IiwiVGV4dCIsInBhcmFtZXRlcnMiLCJmb250IiwiVGV4dEdlb21ldHJ5IiwidGV4dCIsIkZvbnRMb2FkZXIiLCJGb250IiwiVG9ydXMiLCJUb3J1c0dlb21ldHJ5IiwidHViZSIsInJhZGlhbFNlZ21lbnRzIiwidHVidWxhclNlZ21lbnRzIiwiYXJjIiwiVG9ydXNrbm90IiwiR0NvbnN0cnVjdCIsIlRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IiwiVG9ydXNLbm90R2VvbWV0cnkiLCJwIiwicSIsIlR1YmUiLCJUdWJlQnVmZmVyR2VvbWV0cnkiLCJUdWJlR2VvbWV0cnkiLCJwYXRoIiwiY2xvc2VkIiwiTGluZUN1cnZlMyIsIkdyb3VwIiwib2JqZWN0cyIsIm9iaiIsImFkZFRvIiwiT2JqZWN0M0QiLCJFbGVtZW50TW9kdWxlIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJib2R5IiwiY3JlYXRlRWxlbWVudCIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInNlbGYiLCJhcHBlbmRDaGlsZCIsIlJlbmRlcmluZ01vZHVsZSIsImlzU2hhZG93IiwiYXNzaWduIiwiVmVjdG9yMiIsImRldmljZVBpeGVsUmF0aW8iLCJiZ0NvbG9yIiwiYmdPcGFjaXR5IiwicmVuZGVyZXIiLCJwaXhlbFJhdGlvIiwicmVzb2x1dGlvbiIsIldlYkdMUmVuZGVyZXIiLCJlZmZlY3RzIiwiYXBwbHlBZGRpdGlvbmFsIiwic2V0Q2xlYXJDb2xvciIsInNldFBpeGVsUmF0aW8iLCJzZXRTaXplIiwiTnVtYmVyIiwidG9GaXhlZCIsImlzQXBwbGllZCIsImFkZGl0aW9uYWwiLCJzY2VuZSIsInJlbmRlckxvb3AiLCJyZW5kZXIiLCJhdHRhY2hUb0NhbnZhcyIsImVmZmVjdCIsInNpemUiLCJnZXRTaXplIiwiYXBwIiwiY2FudmFzIiwiZG9tRWxlbWVudCIsImRlZmluZSIsImludGVncmF0ZVJlbmRlcmVyIiwidXBkYXRlIiwiZm9yY2VDb250ZXh0TG9zcyIsInNoYWRvd01hcCIsIlNjZW5lTW9kdWxlIiwid2lsbFNjZW5lQmVSZXBsYWNlZCIsIlNjZW5lIiwic2V0U2NlbmUiLCJSZXNpemVNb2R1bGUiLCJjYWxsYmFja3MiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwicmVuZGVyaW5nIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJnZXRDb250YWluZXIiLCJnZXRSZXNvbHV0aW9uIiwiYXV0byIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyIiwiYWRkQXV0b3Jlc2l6ZSIsImZyYWdtZW50IiwidmVydGV4IiwicG9seWZpbGwiLCJtZXRob2QiLCJzaG93V2FybiIsIlBvc3RQcm9jZXNzb3JNb2R1bGUiLCJjdXJyZW50UGFzcyIsImRlYnVnIiwiY29tcG9zZXIiLCJFZmZlY3RDb21wb3NlciIsImdldERlbHRhIiwicmVwbGFjZVJlbmRlcmVyIiwicGFzcyIsIlJlbmRlclBhc3MiLCJhZGRQYXNzIiwidGV4dHVyZUlEIiwidW5pZm9ybXMiLCJTaGFkZXJQYXNzIiwicGFzc2VzIiwiYm9vbCIsInJlbmRlclRvU2NyZWVuIiwiRXZlbnRzUGF0Y2hNb2R1bGUiLCJvcmlnaW5PYmplY3QiLCJkZXN0T2JqZWN0IiwiZXZlbnRzIiwiZXZlbnQiLCJlbWl0IiwicGF0Y2hFdmVudHMiLCJWaXJ0dWFsTW91c2VNb2R1bGUiLCJnbG9iYWxNb3ZlbWVudCIsIm1vdXNlIiwicmF5Y2FzdGVyIiwiUmF5Y2FzdGVyIiwicHJvamVjdGlvblBsYW5lIiwiY3VzdG9tWCIsImN1c3RvbVkiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WCIsImNsaWVudFkiLCJub3JtYWwiLCJnZXRXb3JsZERpcmVjdGlvbiIsInNldEZyb21DYW1lcmEiLCJyZXF1aXJlIiwib24iLCJldiIsImdsb2JhbFgiLCJnbG9iYWxZIiwicG9pbnRlckxvY2tFbGVtZW50IiwibW92ZW1lbnRYIiwibW92ZW1lbnRZIiwibmVzdGVkIiwiaXNIb3ZlcmVkIiwiaG92ZXJzIiwidHJhdmVyc2UiLCJjaGlsZCIsImludGVyc2VjdE9iamVjdHMiLCJpbnRlcnNlY3RPYmplY3QiLCJwbGFuZSIsInJheSIsImludGVyc2VjdFBsYW5lIiwiaW50ZXJzZWN0aW9uIiwiQ29udHJvbHNNb2R1bGUiLCJjb250cm9scyIsImMiLCJ1cGRhdGVMb29wIiwiRm9nTW9kdWxlIiwidHlwZSIsImZvZyIsIkZvZ0V4cDIiLCJkZW5zaXR5IiwiRm9nIiwiaXNFcXVhbERlZmF1bHQiLCJhIiwiYiIsImVxdWFscyIsIlN0YXRlTW9kdWxlIiwiaXNFcXVhbCIsImVxdWFsQ2hlY2siLCJhY3Rpb25HZW5lcmF0ZSIsImNvbmZpZ3VyYXRpb24iLCJjdXJyZW50Q29uZmlnIiwicHJldkNvbmZpZyIsImNvbmZpZyIsImRlZmF1bHQiLCJyZXBsYWNlUmVkdWNlciIsImNvbmZpZ3MiLCJ1cGRhdGVzIiwiY29uZmlnTmFtZSIsInRydWVWYWwiLCJmYWxzZVZhbCIsIlRocmVlT3JiaXRDb250cm9scyIsImV2ZW50SGFuZGxlciIsIm1pbkRpc3RhbmNlIiwibWF4RGlzdGFuY2UiLCJJbmZpbml0eSIsIm1pblpvb20iLCJtYXhab29tIiwibWluUG9sYXJBbmdsZSIsIm1heFBvbGFyQW5nbGUiLCJtaW5BemltdXRoQW5nbGUiLCJtYXhBemltdXRoQW5nbGUiLCJlbmFibGVEYW1waW5nIiwiZGFtcGluZ0ZhY3RvciIsImVuYWJsZVpvb20iLCJ6b29tU3BlZWQiLCJlbmFibGVSb3RhdGUiLCJyb3RhdGVTcGVlZCIsImVuYWJsZVBhbiIsImtleVBhblNwZWVkIiwiYXV0b1JvdGF0ZSIsImF1dG9Sb3RhdGVTcGVlZCIsImVuYWJsZUtleXMiLCJrZXlzIiwiTEVGVCIsIlVQIiwiUklHSFQiLCJCT1RUT00iLCJtb3VzZUJ1dHRvbnMiLCJPUkJJVCIsIk1PVVNFIiwiWk9PTSIsIk1JRERMRSIsIlBBTiIsInRhcmdldDAiLCJwb3NpdGlvbjAiLCJ6b29tMCIsInpvb20iLCJnZXRQb2xhckFuZ2xlIiwic3BoZXJpY2FsIiwicGhpIiwiZ2V0QXppbXV0aGFsQW5nbGUiLCJ0aGV0YSIsInJlc2V0IiwiZGlzcGF0Y2hFdmVudCIsImNoYW5nZUV2ZW50IiwiU1RBVEUiLCJOT05FIiwib2Zmc2V0IiwicXVhdCIsIlF1YXRlcm5pb24iLCJzZXRGcm9tVW5pdFZlY3RvcnMiLCJ1cCIsInF1YXRJbnZlcnNlIiwiaW52ZXJzZSIsImxhc3RQb3NpdGlvbiIsImxhc3RRdWF0ZXJuaW9uIiwic3ViIiwiYXBwbHlRdWF0ZXJuaW9uIiwic2V0RnJvbVZlY3RvcjMiLCJyb3RhdGVMZWZ0IiwiZ2V0QXV0b1JvdGF0aW9uQW5nbGUiLCJzcGhlcmljYWxEZWx0YSIsIm1pbiIsIm1ha2VTYWZlIiwicGFuT2Zmc2V0Iiwic2V0RnJvbVNwaGVyaWNhbCIsImxvb2tBdCIsInpvb21DaGFuZ2VkIiwiZGlzdGFuY2VUb1NxdWFyZWQiLCJFUFMiLCJkb3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Db250ZXh0TWVudSIsIm9uTW91c2VEb3duIiwib25Nb3VzZVdoZWVsIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaEVuZCIsIm9uVG91Y2hNb3ZlIiwib25Nb3VzZU1vdmUiLCJvbk1vdXNlVXAiLCJvbktleURvd24iLCJzdGFydEV2ZW50IiwiZW5kRXZlbnQiLCJST1RBVEUiLCJET0xMWSIsIlRPVUNIX1JPVEFURSIsIlRPVUNIX0RPTExZIiwiVE9VQ0hfUEFOIiwiU3BoZXJpY2FsIiwicm90YXRlU3RhcnQiLCJyb3RhdGVFbmQiLCJyb3RhdGVEZWx0YSIsInBhblN0YXJ0IiwicGFuRW5kIiwicGFuRGVsdGEiLCJkb2xseVN0YXJ0IiwiZG9sbHlFbmQiLCJkb2xseURlbHRhIiwiZ2V0Wm9vbVNjYWxlIiwicG93Iiwicm90YXRlVXAiLCJwYW5MZWZ0Iiwib2JqZWN0TWF0cml4Iiwic2V0RnJvbU1hdHJpeENvbHVtbiIsIm11bHRpcGx5U2NhbGFyIiwicGFuVXAiLCJwYW4iLCJkZWx0YVgiLCJkZWx0YVkiLCJ0YXJnZXREaXN0YW5jZSIsInRhbiIsImNsaWVudEhlaWdodCIsIm1hdHJpeCIsImNsaWVudFdpZHRoIiwiZG9sbHlJbiIsImRvbGx5U2NhbGUiLCJkb2xseU91dCIsImhhbmRsZU1vdXNlRG93blJvdGF0ZSIsImhhbmRsZU1vdXNlRG93bkRvbGx5IiwiaGFuZGxlTW91c2VEb3duUGFuIiwiaGFuZGxlTW91c2VNb3ZlUm90YXRlIiwic3ViVmVjdG9ycyIsImhhbmRsZU1vdXNlTW92ZURvbGx5IiwiaGFuZGxlTW91c2VNb3ZlUGFuIiwiaGFuZGxlTW91c2VVcCIsImhhbmRsZU1vdXNlV2hlZWwiLCJoYW5kbGVLZXlEb3duIiwia2V5Q29kZSIsImhhbmRsZVRvdWNoU3RhcnRSb3RhdGUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImhhbmRsZVRvdWNoU3RhcnREb2xseSIsImR4IiwiZHkiLCJzcXJ0IiwiaGFuZGxlVG91Y2hTdGFydFBhbiIsImhhbmRsZVRvdWNoTW92ZVJvdGF0ZSIsImhhbmRsZVRvdWNoTW92ZURvbGx5IiwiaGFuZGxlVG91Y2hNb3ZlUGFuIiwiaGFuZGxlVG91Y2hFbmQiLCJwcmV2ZW50RGVmYXVsdCIsImJ1dHRvbiIsInN0b3BQcm9wYWdhdGlvbiIsIkV2ZW50RGlzcGF0Y2hlciIsIk9yYml0Q29udHJvbHNNb2R1bGUiLCJmb2xsb3ciLCJ1cGRhdGVQcm9jZXNzb3IiLCJzZXRDb250cm9scyIsInNldFVwZGF0ZSIsIkR5bmFtaWNHZW9tZXRyeU1vZHVsZSIsImdfIiwidXBkYXRlUGFyYW1zIiwiVGV4dHVyZUxvYWRlciIsIlRleHR1cmVNb2R1bGUiLCJ0ZXh0dXJlcyIsInRleHR1cmUiLCJyZXBlYXQiLCJSZXBlYXRXcmFwcGluZyIsIm1hcHBpbmciLCJVVk1hcHBpbmciLCJmaXgiLCJ0ZXgiLCJ3cmFwUyIsIndyYXBUIiwibWFnRmlsdGVyIiwiTmVhcmVzdEZpbHRlciIsIm1pbkZpbHRlciIsIkxpbmVhck1pcE1hcExpbmVhckZpbHRlciIsIkFuaW1hdGlvbk1vZHVsZSIsImlzRGVmZXJyZWQiLCJza2VsZXRvbiIsIm1peGVyIiwiQW5pbWF0aW9uTWl4ZXIiLCJjbGlwcyIsImFuaW1hdGlvbnMiLCJjbGlwTmFtZSIsImNsaXAiLCJBbmltYXRpb25DbGlwIiwiZmluZEJ5TmFtZSIsImNsaXBBY3Rpb24iLCJwbGF5Iiwic3BlZWQiLCJEZWZpbmVNb2R1bGUiLCJNb2RlbCIsIkNhbWVyYU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sSUFBTUEsU0FBUyxTQUFUQSxNQUFTLENBQUNDLE1BQUQsRUFBMkI7b0NBQWZDLFVBQWU7Y0FBQTs7Ozs7Ozs7O3lCQUN2QkEsVUFBeEIsOEhBQW9DO1VBQXpCQyxTQUF5Qjs7Ozs7VUFJOUIsQ0FBQ0EsU0FBTCxFQUNFLFNBTGdDOzs7Ozs7OzhCQU9mQyxPQUFPQyxtQkFBUCxDQUEyQkYsU0FBM0IsQ0FBbkIsbUlBQTBEO2NBQS9DRyxJQUErQzs7Y0FDcERMLE9BQU9LLElBQVAsTUFBaUJDLFNBQWpCLElBQThCSixVQUFVRyxJQUFWLENBQTlCLElBQ0NMLE9BQU9LLElBQVAsRUFBYUUsUUFBYixPQUE0QixpQkFEN0IsSUFFQ0wsVUFBVUcsSUFBVixFQUFnQkUsUUFBaEIsT0FBK0IsaUJBRnBDLEVBRXVEOztnQkFFakRQLE9BQU9LLElBQVAsRUFBYUcsV0FBYixLQUE2QkwsTUFBakMsRUFBeUNKLE9BQU9DLE9BQU9LLElBQVAsQ0FBUCxFQUFxQkgsVUFBVUcs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
