/* WhitestormJS Framework v2.1.1 */
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

// Check for Three.js
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

const version = "2.1.1";

var system = {
  window: typeof window === 'undefined' ? global : window
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzL2V4dGVuZC5qcyIsIi4uL3NyYy91dGlscy90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsIi4uL3NyYy9jb3JlL2Vycm9ycy5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZU1hbmFnZXIuanMiLCIuLi9zcmMvY29yZS9Db21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9wcm90b3R5cGUvYXR0cmlidXRlcy5qcyIsIi4uL3NyYy9jb3JlL01lc2hDb21wb25lbnQuanMiLCIuLi9zcmMvY29yZS9MaWdodENvbXBvbmVudC5qcyIsIi4uL3NyYy9jb3JlL0NhbWVyYUNvbXBvbmVudC5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9jb3JlL0FwcC5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9BbWJpZW50TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9IZW1pc3BoZXJlTGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvUG9pbnRMaWdodC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2xpZ2h0cy9TcG90TGlnaHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9saWdodHMvQXJlYUxpZ2h0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbGlnaHRzL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9DdWJlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9PcnRob2dyYXBoaWNDYW1lcmEuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2FtZXJhcy9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9Cb3guanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ2lyY2xlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0NvbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvQ3lsaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvRG9kZWNhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0V4dHJ1ZGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvSWNvc2FoZWRyb24uanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGF0aGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvTGluZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9JbXBvcnRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9PY3RhaGVkcm9uLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1BhcmFtZXRyaWMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUGxhbmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tZXNoZXMvUG9seWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9SaW5nLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NoYXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1NwaGVyZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXRyYWhlZHJvbi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UZXh0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL1RvcnVza25vdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21lc2hlcy9UdWJlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL0dyb3VwLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbWVzaGVzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0VsZW1lbnRNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1NjZW5lTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1Jlc2l6ZU1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2FkYXB0aXZlLWx1bWlub3NpdHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9ib2tlaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2Jva2VoMi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvbWJpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9jb252b2x1dGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2NvcHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9kZXB0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2RvdC1zY3JlZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9maWxtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvZ2xpdGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvZ29kLXJheXMuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9sdW1pbm9zaXR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvcGl4ZWxhdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL3Nob2NrLXdhdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL21hdGVyaWFscy9zbWFhLWJsZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9tYXRlcmlhbHMvc21hYS1jb2xvci1lZGdlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL3NtYWEtd2VpZ2h0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL3RvbmUtbWFwcGluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvbWF0ZXJpYWxzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvcGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2JsdXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9ibG9vbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2Jva2VoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvYm9rZWgyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvY2xlYXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9jbGVhci1tYXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvZG90LXNjcmVlbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2RlcHRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvZmlsbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dsaXRjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3JlbmRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL2dvZC1yYXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvbWFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3BpeGVsYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy9zYXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hhZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvc2hvY2std2F2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb3N0cHJvY2Vzc2luZy9zcmMvcGFzc2VzL3NtYWEuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL3Bhc3Nlcy90ZXh0dXJlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvdG9uZS1tYXBwaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9wYXNzZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcG9zdHByb2Nlc3Npbmcvc3JjL2NvcmUvZWZmZWN0LWNvbXBvc2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bvc3Rwcm9jZXNzaW5nL3NyYy9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Qb3N0UHJvY2Vzc29yTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL0V2ZW50c1BhdGNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL1ZpcnR1YWxNb3VzZU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Db250cm9sc01vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9Gb2dNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvU3RhdGVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9hcHAvY29udHJvbHMvbGliL1RocmVlT3JiaXRDb250cm9scy5qcyIsIi4uL3NyYy9tb2R1bGVzL2FwcC9jb250cm9scy9PcmJpdENvbnRyb2xzTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2NvbnRyb2xzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvYXBwL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvbWVzaC9EeW5hbWljR2VvbWV0cnlNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL1RleHR1cmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9tZXNoL0FuaW1hdGlvbk1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL21lc2gvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9EZWZpbmVNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIi4uL3NyYy9kZXByZWNhdGlvbi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZXh0ZW5kID0gKG9iamVjdCwgLi4uZXh0ZW5zaW9ucykgPT4geyAvLyAkLmV4dGVuZCBhbHRlcm5hdGl2ZSwgLi4uIGlzIHRoZSBzcHJlYWQgb3BlcmF0b3IuXG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhleHRlbnNpb24pO1xuICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBleHRlbnNpb24pO1xuXG4gICAgaWYgKCFleHRlbnNpb24pXG4gICAgICBjb250aW51ZTsgLy8gSWdub3JlIG51bGwgYW5kIHVuZGVmaW5lZCBvYmplY3RzIGFuZCBwYXJhbWV0ZXJzLlxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4dGVuc2lvbikpIHsgLy8gRG8gbm90IHRyYXZlcnNlIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICBpZiAob2JqZWN0W3Byb3BdICE9PSB1bmRlZmluZWQgJiYgZXh0ZW5zaW9uW3Byb3BdXG4gICAgICAgICYmIG9iamVjdFtwcm9wXS50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAmJiBleHRlbnNpb25bcHJvcF0udG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgLy8gR29lcyBkZWVwIG9ubHkgaWYgb2JqZWN0W3Byb3BdIGFuZCBleHRlbnNpb25bcHJvcF0gYXJlIGJvdGggb2JqZWN0cyAhXG4gICAgICAgIGlmIChleHRlbnNpb25bcHJvcF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkgZXh0ZW5kKG9iamVjdFtwcm9wXSwgZXh0ZW5zaW9uW3Byb3BdKTtcbiAgICAgICAgZWxzZSBvYmplY3RbcHJvcF0gPSBleHRlbnNpb25bcHJvcF07XG4gICAgICB9IGVsc2VcbiAgICAgICAgb2JqZWN0W3Byb3BdID0gdHlwZW9mIG9iamVjdFtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgPyBleHRlbnNpb25bcHJvcF0gOiBvYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXS5zbGljZSgpOyAvLyBBZGQgdmFsdWVzIHRoYXQgZG8gbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KGV4dGVuc2lvbltwcm9wXSkpIG9iamVjdFtwcm9wXSA9IGV4dGVuc2lvbltwcm9wXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsImV4cG9ydCBjb25zdCBpbnN0cnVjdCA9IChhcnJheSwgaW5zdEFycmF5KSA9PiB7XG4gIGNvbnN0IHRlbXBPYmplY3QgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5zdEFycmF5Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgY29uc3QgZ3VpZGUgPSBpbnN0QXJyYXlbaV07XG5cbiAgICB0ZW1wT2JqZWN0W2d1aWRlXSA9IGFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBPYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtRGF0YSA9IChvYmplY3QsIGluc3RydWN0aW9ucykgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0cnVjdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkpXG4gICAgICBvYmplY3Rba2V5XSA9IGluc3RydWN0KG9iamVjdFtrZXldLCBpbnN0cnVjdGlvbnNba2V5XSk7XG4gICAgZWxzZSBpZiAob2JqZWN0W2tleV0gaW5zdGFuY2VvZiBPYmplY3QgJiYgIShBcnJheS5pc0FycmF5KGluc3RydWN0aW9uc1trZXldKSkpXG4gICAgICBvYmplY3Rba2V5XSA9IHRyYW5zZm9ybURhdGEob2JqZWN0W2tleV0sIGluc3RydWN0aW9uc1trZXldKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgdG9BcnJheSA9IChvYmplY3QsIGluc3RydWN0aW9uKSA9PiB7XG4gIGNvbnN0IHRlbXBBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnN0cnVjdGlvbi5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IGd1aWRlID0gaW5zdHJ1Y3Rpb25baV07XG5cbiAgICB0ZW1wQXJyYXlbaV0gPSBvYmplY3RbZ3VpZGVdO1xuICB9XG5cbiAgcmV0dXJuIHRlbXBBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGNsYXNzSW5zdGFuY2UsIG1lc3NhZ2UsIGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGBAJHtjbGFzc0luc3RhbmNlfTogJHttZXNzYWdlfWApO1xuXG4gICAgY29uc3Qgc3RhY2tBcnJheSA9IHRoaXMuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIHN0YWNrQXJyYXkuc3BsaWNlKDEsIDIpO1xuXG4gICAgdGhpcy5zdGFjayA9IHN0YWNrQXJyYXkuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY29uc29sZSkgY29uc29sZS5lcnJvcignQ29tcG9uZW50OicsIGNvbXBvbmVudCk7XG5cbiAgICB0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY3lFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY2xhc3NJbnN0YW5jZSwgbWVzc2FnZSwgYWN0aXZlTW9kdWxlLCBkZXBlbmRlbmN5TW9kdWxlID0gZmFsc2UpIHtcbiAgICBzdXBlcihgQCR7Y2xhc3NJbnN0YW5jZX06ICR7bWVzc2FnZX1gKTtcblxuICAgIGNvbnN0IHN0YWNrQXJyYXkgPSB0aGlzLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBzdGFja0FycmF5LnNwbGljZSgxLCAyKTtcblxuICAgIHRoaXMuc3RhY2sgPSBzdGFja0FycmF5LmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcbiAgICBpZiAoY29uc29sZSAmJiBkZXBlbmRlbmN5TW9kdWxlKSBjb25zb2xlLmVycm9yKCdEZXBlbmRlbmN5IHB1Ymxpc2hlZCBieSBtb2R1bGU6JywgZGVwZW5kZW5jeU1vZHVsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnRGVwZW5kZW5jeUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihjbGFzc0luc3RhbmNlLCBtZXNzYWdlLCBjb21wb25lbnQsIGFjdGl2ZU1vZHVsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYEAke2NsYXNzSW5zdGFuY2V9OiAke21lc3NhZ2V9YCk7XG5cbiAgICBjb25zdCBzdGFja0FycmF5ID0gdGhpcy5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgc3RhY2tBcnJheS5zcGxpY2UoMSwgMik7XG5cbiAgICB0aGlzLnN0YWNrID0gc3RhY2tBcnJheS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjb25zb2xlKSBjb25zb2xlLmVycm9yKCdDb21wb25lbnQ6JywgY29tcG9uZW50KTtcbiAgICBpZiAoY29uc29sZSAmJiBhY3RpdmVNb2R1bGUpIGNvbnNvbGUuZXJyb3IoJ0FjdGl2ZSBtb2R1bGU6JywgYWN0aXZlTW9kdWxlKTtcblxuICAgIHRoaXMubmFtZSA9ICdNYW5hZ2VyRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5pbXBvcnQge01hbmFnZXJFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vLyBDaGVjayBmb3IgVGhyZWUuanNcbmNvbnN0IHdhcm5EZXBzID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1doaXRlc3Rvcm1KUyBGcmFtZXdvcmsgcmVxdWlyZXMgVGhyZWUuanMgcjg0LiBodHRwczovL3RocmVlanMub3JnLycpO1xufTtcblxudHJ5IHtcbiAgaWYgKCFSRVZJU0lPTikgd2FybkRlcHMoKTtcbn0gY2F0Y2ggKGVycikge1xuICB3YXJuRGVwcygpO1xufVxuXG4vKipcbiAqIEBjbGFzcyBNb2R1bGVTeXN0ZW1cbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAZGVzY3JpcHRpb24gIFByb3ZpZGVzIEFQSSBmb3IgY2xhc3NlcyB0aGF0IHdpbGwgdXNlIE1vZHVsZXMuPGJyLz5cbiAqIFRoaXMgY2xhc3MgaW5jbHVkZXMgYmFzaWMgZXZlbnQgc3lzdGVtIHdpdGggdGhvc2Ugc3VwcG9ydGVkIG1ldGhvZHM6XG4gKiA8cHJlPi5vbigpPC9wcmU+PHByZT4ub2ZmKCk8L3ByZT48cHJlPi5lbWl0KCk8L3ByZT5cbiAqIEBleHRlbmRzIEV2ZW50c1xuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVTeXN0ZW0gZXh0ZW5kcyBFdmVudHMge1xuICAvLyBJTlRFR1JBVElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGludGVncmF0ZU1vZHVsZXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBhcHBsaWVzIGFsbCBtb2R1bGVzIGZyb20gLm1vZHVsZXMgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2VdIElmIHNvdXJjZSAoc2hvdWxkIGJlIGEgY29tcG9uZW50KSBpcyBwcm92aWRlZCwgd2lsbCByZXBsYWNlIC5tb2R1bGVzIHdpdGggc291cmNlJ3Mgb25lIGJlZm9yZSBleGVjdXRpbmcgbW9kdWxlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpIHtcbiAgICBpZiAoIXRoaXMubW9kdWxlcyAmJiAhc291cmNlKSByZXR1cm47XG4gICAgaWYgKHNvdXJjZSAmJiBzb3VyY2UubW9kdWxlcykgdGhpcy5tb2R1bGVzID0gc291cmNlLm1vZHVsZXMuc2xpY2UoMCk7XG5cbiAgICBpZiAodGhpcy5tb2R1bGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKVxuICAgICAgICB0aGlzLmFwcGx5TW9kdWxlKHRoaXMubW9kdWxlc1tpXSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2UpIHRoaXMuYXBwbHlCcmlkZ2Uoe29uQ29weTogc291cmNlfSk7XG4gIH1cblxuICAvLyBBUFBMWUlORyBNT0RVTEUgKC4uLmFuZCBhIFwiYnJpZGdlXCIgZm9yIG1vZHVsZSlcblxuICAvKipcbiAgICogQG1ldGhvZCBhcHBseUJyaWRnZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE1ha2VzIGNvbXBvbmVudC1zcGVjaWZpYyBBUEkgdG8gd29yayB3aXRoIG1vZHVsZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBicmlkZ2VNYXBcbiAgICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIG9iamVjdCB3aXRoIG1vZGlmaWVkIHZhbHVlcy5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlCcmlkZ2UoYnJpZGdlTWFwID0ge30pIHtcbiAgICBjb25zdCBtb2R1bGVzID0gdGhpcy5tb2R1bGVzO1xuICAgIGlmICghbW9kdWxlcykgcmV0dXJuIGJyaWRnZU1hcDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBicmlkZ2VNYXApIHtcbiAgICAgICAgaWYgKGJyaWRnZU1hcFtrZXldKSB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlc1tpXTtcblxuICAgICAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLmJyaWRnZSAmJiBtb2R1bGUuYnJpZGdlW2tleV0pXG4gICAgICAgICAgICBicmlkZ2VNYXBba2V5XSA9IG1vZHVsZS5icmlkZ2Vba2V5XS5hcHBseSh0aGlzLCBbYnJpZGdlTWFwW2tleV0sIG1vZHVsZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJyaWRnZU1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFwcGx5Q29tbWFuZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIC5hcHBseUNvbW1hbmQgcnVucyBhIG1ldGhvZCBjYWxsZWQgYG5hbWVgIG9uIGFsbCBtb2R1bGVzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgbWV0aG9kIG5hbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYj0oZnVuYywgbW9kdWxlU2NvcGUpID0+IGZ1bmMuYXBwbHkodGhpcywgW21vZHVsZVNjb3BlXSldIEhvdyB0aGUgZnVuY3Rpb24gaXMgd3JhcHBlZC9cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlDb21tYW5kKG5hbWUsIGNiID0gKGZ1bmMsIG1vZHVsZVNjb3BlKSA9PiBmdW5jLmFwcGx5KHRoaXMsIFttb2R1bGVTY29wZV0pKSB7XG4gICAgY29uc3QgbW9kdWxlcyA9IHRoaXMubW9kdWxlcztcbiAgICBpZiAoIW1vZHVsZXMpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtb2R1bGVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBjb25zdCBtb2R1bGUgPSBtb2R1bGVzW2ldO1xuICAgICAgaWYgKG5hbWUgaW4gbW9kdWxlKSBjYihtb2R1bGVbbmFtZV0sIG1vZHVsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlNb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiAuYXBwbHlNb2R1bGUgaXMgYWxzbyB1c2VkIGluIC5pbnRlZ3JhdGVNb2R1bGVzKCkgZnVuY3Rpb24uXG4gICAqIEl0IGRvZXMgZXhhY3RseSB3aGF0IGl0cyBuYW1lIHNheXMgKGFwcGxpZXMgbW9kdWxlIHRvIGNvbXBvbmVudCBvciBhcHApLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHBhcmFtIHtCb29sZWFufSBbcHVzaD10cnVlXVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIGFwcGxpZWQuXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZVN5c3RlbVxuICAgKi9cbiAgYXBwbHlNb2R1bGUobW9kdWxlLCBwdXNoID0gdHJ1ZSkge1xuICAgIGlmICghbW9kdWxlKSByZXR1cm47XG4gICAgaWYgKHB1c2ggJiYgdGhpcy5tb2R1bGVzKSB0aGlzLm1vZHVsZXMucHVzaChtb2R1bGUpO1xuICAgIGVsc2UgaWYgKHB1c2gpIHRoaXMubW9kdWxlcyA9IFttb2R1bGVdO1xuXG4gICAgaWYgKHRoaXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyLmFjdGl2ZShtb2R1bGUpO1xuXG4gICAgaWYgKG1vZHVsZS5tYW5hZ2VyICYmIHRoaXMubWFuYWdlcikgbW9kdWxlLm1hbmFnZXIodGhpcy5tYW5hZ2VyKTtcbiAgICBlbHNlIGlmIChtb2R1bGUubWFuYWdlcikge1xuICAgICAgdGhyb3cgbmV3IE1hbmFnZXJFcnJvcihcbiAgICAgICAgJ0NvbXBvbmVudCcsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgTW9kdWxlTWFuYWdlciB0aGF0IGlzIHR1cm5lZCBvZmYgZm9yIHRoaXMgY29tcG9uZW50YCxcbiAgICAgICAgdGhpcywgbW9kdWxlXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUuaW50ZWdyYXRlKSBtb2R1bGUuaW50ZWdyYXRlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIERpc3Bvc2VzIG9mIGFsbCBtb2R1bGVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGVzKCkge1xuICAgIHdoaWxlICh0aGlzLm1vZHVsZXMubGVuZ3RoKVxuICAgICAgdGhpcy5kaXNwb3NlTW9kdWxlKHRoaXMubW9kdWxlc1swXSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkaXNwb3NlTW9kdWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGlzcG9zZXMgb2YgdGhlIGdpdmVuIG1vZHVsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gZGlzcG9zZVxuICAgKiBAcmV0dXJuIHtNb2R1bGV9IFJldHVybnMgbW9kdWxlIHRoYXQgd2FzIHJlbW92ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICovXG4gIGRpc3Bvc2VNb2R1bGUobW9kdWxlKSB7XG4gICAgaWYgKCFtb2R1bGUpIHJldHVybjtcblxuICAgIHRoaXMubW9kdWxlcy5zcGxpY2UodGhpcy5tb2R1bGVzLmluZGV4T2YobW9kdWxlKSwgMSk7XG5cbiAgICBpZiAobW9kdWxlLmRpc3Bvc2UpIG1vZHVsZS5kaXNwb3NlLmJpbmQodGhpcykobW9kdWxlKTtcblxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvLyBQSVBFRCBNRVRIT0RcblxuICAvKipcbiAgICogQG1ldGhvZCBtb2R1bGVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBwaXBlZCB2ZXJzaW9uIG9mIC5hcHBseU1vZHVsZSgpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIHRoZSBtb2R1bGUgdG8gYXBwbHlcbiAgICogQHJldHVybiB7dGhpc30gcmV0dXJucyB0aGlzIC0gYXBwL2NvbXBvbmVudFxuICAgKiBAdGhyb3dzIHtNYW5hZ2VyRXJyb3J9XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVTeXN0ZW1cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UGlwZWQgbW9kdWxlczwvY2FwdGlvbj5cbiAgICogY29tcG9uZW50XG4gICAqICAgLm1vZHVsZShuZXcgTW9kdWxlMSgpKVxuICAgKiAgIC5tb2R1bGUobmV3IE1vZHVsZTIoKSlcbiAgICogICAubW9kdWxlKG5ldyBNb2R1bGUzKCkpXG4gICAqL1xuICBtb2R1bGUobW9kdWxlKSB7XG4gICAgdGhpcy5hcHBseU1vZHVsZShtb2R1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IGJhc2VHZXRUYWcodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJlxuICAgIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUGxhaW5PYmplY3Q7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFN5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG4iLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICAgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAgICpcbiAgICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICAgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gICAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gICAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gICAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAgICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICAgKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICAgKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gICAqL1xufTtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn0iLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufSIsIi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn0iLCJpbXBvcnQgY3JlYXRlU3RvcmUgZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgY29tYmluZVJlZHVjZXJzIGZyb20gJy4vY29tYmluZVJlZHVjZXJzJztcbmltcG9ydCBiaW5kQWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi9iaW5kQWN0aW9uQ3JlYXRvcnMnO1xuaW1wb3J0IGFwcGx5TWlkZGxld2FyZSBmcm9tICcuL2FwcGx5TWlkZGxld2FyZSc7XG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZygnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGJpbmRBY3Rpb25DcmVhdG9ycywgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH07IiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtEZXBlbmRlbmN5RXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgTW9kdWxlTWFuYWdlclxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgaGFuZGxlclxuICogQGRlc2NyaXB0aW9uICBTb2x2ZXMgbW9kdWxlcyBkZXBlbmRlbmNpZXNcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgIHRoaXMuaGFuZGxlciA9IG9iamVjdDtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuXG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKChzdGF0ZSA9IFt7fSwgJyddLCBhY3Rpb24pID0+IHtcbiAgICAgIHN0YXRlWzBdW2FjdGlvbi5rZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICBzdGF0ZVsxXSA9IGFjdGlvbi5rZXk7XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWN0aXZlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyAuY3VycmVudE1vZHVsZSB0byBwcm92aWRlZCBtb2R1bGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgdGhlIG1vZHVsZSB0byBtYWtlIGN1cnJlbnRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGFjdGl2ZShtb2R1bGUpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFNldCdzIC5jdXJyZW50TW9kdWxlIHRvIG51bGwuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVmaW5lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lIHRoZSBtb2R1bGUgaW4gbWFuYWdlclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbW9kdWxlIG5hbWVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIGRlZmluZShuYW1lKSB7XG4gICAgdGhpcy5tb2R1bGVzW25hbWVdID0gdGhpcy5jdXJyZW50TW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXNlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBkZWZpbmVkIG1vZHVsZSBmcm9tIG1hbmFnZXJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG1vZHVsZSBuYW1lXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICB1c2UobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1vZHVsZXNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBbiBhbGlhcyBmb3IgLmFkZCgpIDxici8+PGJyLz5cbiAgICogVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSBrbm93IHRoYXQgeW91IHdpbGwgb3ZlcndyaXRlIGV4aXN0aW5nIGRlcGVuZGVuY3kuPGJyLz5cbiAgICogVXNlIGl0IGluIHlvdXIgYXBwLCBidXQgbm90IGluIG1vZHVsZSB0aGF0IHlvdSBwcm92aWRlIHRvIG90aGVyIHBlb3BsZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IG9mIHRoZSBkZXBlbmRlbmN5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHRoZSB2YWx1ZSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgc2V0KGtleSwgZGF0YSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ0FERCcsXG4gICAgICBrZXksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGRlcGVuZGVuY3kgaW4gc3RvcmUgb2JqZWN0LCBieSBrZXkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgdGhlIGtleSBvZiB0aGUgZGVwZW5kZW5jeVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKiBAcmV0dXJuIHtPYmplY3R8TW9kdWxlfVxuICAgKiBAdGhyb3dzIHtEZXBlbmRlbmN5RXJyb3J9IGlmIGRlcGVuZGVuY3kgaXMgbm90IGluIHRoZSBzdG9yZVxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXQgdGhlICdoZWxsbycgZGVwZW5kZW5jeTwvY2FwdGlvbj5cbiAgICogbWFuYWdlci5nZXQoJ2hlbGxvJyk7IC8vIC0+IHt3b3JsZDogdHJ1ZX1cbiAgICovXG4gIGdldChrZXkpIHtcbiAgICBpZiAoIXRoaXMuc3RvcmUuZ2V0U3RhdGUoKVswXVtrZXldKSB7XG4gICAgICB0aHJvdyBuZXcgRGVwZW5kZW5jeUVycm9yKFxuICAgICAgICAnTW9kdWxlTWFuYWdlcicsXG4gICAgICAgIGBNb2R1bGUgcmVxdWlyZXMgJyR7a2V5fScgZGVwZW5kZW5jeWAsXG4gICAgICAgIHRoaXMuY3VycmVudE1vZHVsZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBoYXNcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHdoZXRoZXIgbWFuYWdlciBoYXMgYSBkZXBlbmRlbmN5IHdpdGggdGhlIGdpdmVuIGtleVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgb2YgdGhlIGRlcGVuZGVuY3lcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQGV4YW1wbGUgPGNhcHRpb24+Q2hlY2sgd2hldGhlciB0aGUgc3RvcmUgaGFzIHRoZSAnaGVsbG8nIGRlcGVuZGVuY3k8L2NhcHRpb24+XG4gICAqIG1hbmFnZXIuaGFzKCdoZWxsbycpOyAvLyAtPiB0cnVlXG4gICAqL1xuICBoYXMoa2V5KSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyBkZXBzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbZGVwc01hcD17fV1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXJcbiAgICovXG4gIHVwZGF0ZShkZXBzTWFwID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBbZGF0YSwgY2hhbmdlZEtleV0gPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGRlcHNNYXBbY2hhbmdlZEtleV07XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YVtjaGFuZ2VkS2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGFsaWFzIG1vZHVsZTpjb3JlLk1vZHVsZU1hbmFnZXIjc2V0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Nb2R1bGVNYW5hZ2VyXG4gICAqL1xuICBhZGQoLi4uZGF0YSkge1xuICAgIGNvbnNvbGUud2FybignLmFkZCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBVc2UgLnNldCgpIGluc3RlYWQnKTtcbiAgICByZXR1cm4gdGhpcy5zZXQoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXF1aXJlXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUmVxdWlyZSBtb2R1bGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgRGVmaW5lZCBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZHVsZUV4ZWN1dG9yIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhcHBsaWVkIG1vZHVsZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTW9kdWxlTWFuYWdlclxuICAgKi9cbiAgcmVxdWlyZShuYW1lLCBtb2R1bGVFeGVjdXRvcikge1xuICAgIGlmICh0aGlzLnVzZShuYW1lKSA9PT0gdW5kZWZpbmVkKSB0aGlzLmhhbmRsZXIuYXBwbHlNb2R1bGUobW9kdWxlRXhlY3V0b3IoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7ZXh0ZW5kLCB0cmFuc2Zvcm1EYXRhfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5pbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuaW1wb3J0IHtNb2R1bGVNYW5hZ2VyfSBmcm9tICcuL01vZHVsZU1hbmFnZXInO1xuaW1wb3J0IHtNYW5hZ2VyRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCB7XG4gICAqICAgbW9kdWxlczogW10sXG4gICAqICAgbWFuYWdlcjogdHJ1ZVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgbW9kdWxlczogbnVsbCxcbiAgICBtYW5hZ2VyOiB0cnVlXG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBpbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQge31cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7fTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgcHJvbWlzZXMgdGhhdCBzaG91bGQgYmUgcmVzb2x2ZWQgYmVmb3JlIENvbXBvbmVudCBpcyByZWFkeS5cbiAgICogQG1lbWJlciB7QXJyYXl9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNfd2FpdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3dhaXQgPSBbXTsgLy8gQ29sbGVjdGlvbiBvZiBwcm9taXNlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgbW9kdWxlc2AuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbW9kdWxlc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBtb2R1bGVzID0gW107IC8vIENvbGxlY3Rpb24gb2YgbW9kdWxlcztcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBgY2hpbGRgIENvbXBvbmVudHMuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjY2hpbGRyZW5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2hpbGRyZW4gPSBbXTsgLy8gRm9yIGtlZXBpbmcgY2hpbGRyZW4gY29tcG9uZW50cztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZGVmYXVsdHMgPSBDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gQXBwbHkgcG9seWZpbGxlZCBwYXJhbWV0ZXJzIHRvIC5wYXJhbXM7XG4gICAgdGhpcy5wYXJhbXMgPSBleHRlbmQodHJhbnNmb3JtRGF0YShwYXJhbXMsIGluc3RydWN0aW9ucyksIGRlZmF1bHRzKTtcbiAgICBpZiAodGhpcy5wYXJhbXMubWFuYWdlcikgdGhpcy5tYW5hZ2VyID0gbmV3IE1vZHVsZU1hbmFnZXIoKTtcblxuICAgIHRoaXMubW9kdWxlcyA9IHRoaXMucGFyYW1zLm1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdhaXRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXYWl0IGZvciBhIHByb21pc2UuXG4gICAqIEBwYXJhbSB7UHJvbWlzZX0gW3Byb21pc2VdIC0gVGhlIHByb21pc2UgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gYSBxdWV1ZS5cbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgd2FpdChwcm9taXNlKSB7XG4gICAgaWYgKHByb21pc2UpIHRoaXMuX3dhaXQucHVzaChwcm9taXNlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fd2FpdCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZlclxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGUgYGZ1bmNgIChDYWxsYmFjaykgd2hlbiBDb21wb25lbnQgaXMgcmVhZHkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBDYWxsYmFjay5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgZGVmZXIoZnVuYykge1xuICAgIGlmICh0aGlzLmlzRGVmZmVyZWQpIHRoaXMud2FpdCgpLnRoZW4oKCkgPT4gZnVuYyh0aGlzKSk7XG4gICAgZWxzZSBmdW5jKHRoaXMpO1xuICB9XG5cbiAgLy8gUEFSQU1FVEVSU1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVBhcmFtc1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgcGFyYW1ldGVycyBvZiB0aGUgQ29tcG9uZW50LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFBhcmFtcyBvZiB0aGlzIENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICB1cGRhdGVQYXJhbXMocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IGV4dGVuZChwYXJhbXMsIHRoaXMucGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXM7XG4gIH1cblxuICAvLyBDT1BZSU5HICYgQ0xPTklOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ2xvbmUgdGhpcyBjb21wb25lbnRcbiAgICogQHJldHVybiB7b2JqZWN0fSBhIGNsb25lZCBjb21wb25lbnQgd2l0aCBhbGwgaXRzIHNvdXJjZSBjb21wb25lbnQnIHBhcmFtcyBjb3BpZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnBhcmFtcykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSBuYXRpdmUgYW5kIGludGVncmF0ZSBgbW9kdWxlc2AgdG8gaXQuXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBzb3VyY2UgLSBTb3VyY2UgY29tcG9uZW50IHRoYXQgaXMgdXNlZCBmb3IgYGNvcHkoKWAgYWN0aW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplXSAtIENhbGxiYWNrIGV4ZWN1dGVkIGJlZm9yZSBtb2R1bGVzIGludGVncmF0aW9uIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge3RoaXN9IENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSwgY3VzdG9taXplKSB7XG4gICAgdGhpcy5wYXJhbXMgPSB7Li4uc291cmNlLnBhcmFtc307XG5cbiAgICBpZiAoc291cmNlLm5hdGl2ZSkgdGhpcy5uYXRpdmUgPSBzb3VyY2UubmF0aXZlLmNsb25lKHNvdXJjZS5wYXJhbXMpO1xuICAgIGlmIChjdXN0b21pemUpIGN1c3RvbWl6ZSgpO1xuICAgIHRoaXMuaW50ZWdyYXRlTW9kdWxlcyhzb3VyY2UpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhZGRlZCBhcyBhIGBjaGlsZGAuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVkIHdoZW4gYWN0aW9uIGlzIGRvbmUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAgICovXG4gIGFkZChvYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge25hdGl2ZX0gPSBvYmplY3Q7XG4gICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9taXNlID0gdGhpcy5hcHBseUJyaWRnZSh7b25BZGQ6IG9iamVjdH0pLm9uQWRkO1xuXG4gICAgICAgIGNvbnN0IHJlc29sdmVyID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmF0aXZlLmFkZChuYXRpdmUpO1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhZGRQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgYWRkUHJvbWlzZS50aGVuKHJlc29sdmVyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgYSBjaGlsZCBgQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSBhICoqY2hpbGQqKiBvZiB0aGlzIENvbXBvbmVudC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICAgKi9cbiAgcmVtb3ZlKG9iamVjdCkge1xuICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMubmF0aXZlLnJlbW92ZShvYmplY3QubmF0aXZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZFRvXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBgdGhpc2AgQ29tcG9uZW50IHRvIHNwZWNpZmllZCBgQXBwYC9gQ29tcG9uZW50YC5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IG9iamVjdCAtIENvbXBvbmVudCB0aGF0IHdpbGwgYmUgYSBwYXJlbnQgb2YgYHRoaXNgLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gICAqL1xuICBhZGRUbyhvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0LmFkZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBgYXN5bmNgIChgd2FpdGAgcHJvbWlzZXMgYXJlIG1vcmUgdGhhbiBgMGApLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5Db21wb25lbnQjaXNEZWZmZXJlZFxuICAgKi9cbiAgZ2V0IGlzRGVmZmVyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhaXQubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgTW9kdWxlTWFuYWdlcmAgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqIEBtZW1iZXIge01vZHVsZU1hbmFnZXJ9IG1vZHVsZTpjb3JlLkNvbXBvbmVudCNtYW5hZ2VyXG4gICAqIEB0aHJvd3Mge01hbmFnZXJFcnJvcn1cbiAgICovXG4gIGdldCBtYW5hZ2VyKCkge1xuICAgIGlmICh0aGlzLl9tYW5hZ2VyKSByZXR1cm4gdGhpcy5fbWFuYWdlcjtcblxuICAgIHRocm93IG5ldyBNYW5hZ2VyRXJyb3IoXG4gICAgICAnQ29tcG9uZW50JyxcbiAgICAgIGBNb2R1bGVNYW5hZ2VyIGlzIG5vdCB1c2VkIGluIHRoaXMgY29tcG9uZW50LiAnbWFuYWdlcicgcGFyYW1ldGVyIHNob3VsZCBiZSBzZXQgYXMgJ3RydWUnYCxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgc2V0IG1hbmFnZXIobWFuYWdlcikge1xuICAgIHRoaXMuX21hbmFnZXIgPSBtYW5hZ2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBuYXRpdmVgIG9iamVjdCB1c2VkIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29yZS5Db21wb25lbnQjbmF0aXZlXG4gICAqL1xuICBnZXQgbmF0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cblxuICBzZXQgbmF0aXZlKG1lc2gpIHtcbiAgICB0aGlzLl9uYXRpdmUgPSBtZXNoO1xuICAgIHRoaXMuX25hdGl2ZS5jb21wb25lbnQgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmU7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29tcG9uZW50XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGF0dHJpYnV0ZXMoLi4ubWFwcGVycykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWFwcGVyID0gbWFwcGVyc1tpXTtcblxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtYXBwZXIubWFwLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG1hcHBlci5tYXBba107XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldC5wcm90b3R5cGUsIGF0dHJpYnV0ZSwge1xuICAgICAgICAgIGdldDogbWFwcGVyLmdldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIHNldDogbWFwcGVyLnNldHRlcihhdHRyaWJ1dGUpLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogbWFwcGVyLmNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBtYXBwZXIuZW51bWVyYWJsZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KC4uLm1hcCkge1xuICByZXR1cm4ge1xuICAgIG1hcCxcbiAgICBnZXR0ZXIobmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlW25hbWVdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlW25hbWVdLmNvcHkodmFsdWUpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXJyb3IoLi4ubWFwKSB7XG4gIHJldHVybiB7XG4gICAgbWFwLFxuICAgIGdldHRlcihuYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVbbmFtZV07XG4gICAgICB9O1xuICAgIH0sXG4gICAgc2V0dGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufVxuIiwiaW1wb3J0IHtNZXNofSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG5pbXBvcnQge2F0dHJpYnV0ZXMsIGNvcHksIG1pcnJvcn0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAnc2NhbGUnKSxcbiAgbWlycm9yKCdtYXRlcmlhbCcsICdnZW9tZXRyeScpXG4pXG4vKipcbiAqIEBjbGFzcyBNZXNoQ29tcG9uZW50XG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0cnVjdGlvbnNdIC0gVGhlIGluc3RydWN0aW9ucyBvYmplY3QuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5Db21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBNZXNoQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBidWlsZDogdHJ1ZSxcbiAgICogICBnZW9tZXRyeToge30sXG4gICAqICAgbWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHNoYWRvdzoge1xuICAgKiAgICAgY2FzdDogdHJ1ZSxcbiAgICogICAgIHJlY2VpdmU6IHRydWVcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICBzY2FsZToge3g6IDEsIHk6IDEsIHo6IDF9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcbiAgICBnZW9tZXRyeToge30sXG4gICAgbWF0ZXJpYWw6IGZhbHNlLFxuXG4gICAgc2hhZG93OiB7XG4gICAgICBjYXN0OiB0cnVlLFxuICAgICAgcmVjZWl2ZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgc2NhbGU6IHt4OiAxLCB5OiAxLCB6OiAxfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgaW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIC8vIENVU1RPTSBHRU9NRVRSWSBIQU5ETElOR1xuXG4gIHN0YXRpYyBjdXN0b20oZ2VvbSwgY29uc3RydWN0b3IgPSBNZXNoKSB7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gICAgICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgICAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBnZW9tLFxuICAgICAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBjb25zdHJ1Y3RvcihnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShnZW9tLCBwYXJhbXMsIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoTWVzaENvbXBvbmVudC5jdXN0b20oZ2VvbSwgY29uc3RydWN0b3IpKShwYXJhbXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZhdWx0cyA9IE1lc2hDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IE1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBkZWZhdWx0cywgaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5idWlsZCkge1xuICAgICAgY29uc3QgYnVpbGQgPSB0aGlzLmJ1aWxkKHRoaXMucGFyYW1zKTtcblxuICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICAgICAnTWVzaENvbXBvbmVudCcsXG4gICAgICAgICAgJy5idWlsZCgpIG1ldGhvZCBzaG91bGQgcmV0dXJuIGEgVEhSRUUuT2JqZWN0M0Qgb3IgYSBQcm9taXNlIHJlc29sdmVkIHdpdGggVEhSRUUuT2JqZWN0M0QuJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWlsZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdGhpcy53YWl0KGJ1aWxkKTtcblxuICAgICAgICB0aGlzLndhaXQobmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgYnVpbGQudGhlbihuYXRpdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgICAgICB0aGlzLndyYXAoKS50aGVuKHJlc29sdmUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5hdGl2ZSA9IGJ1aWxkO1xuICAgICAgICB0aGlzLndhaXQodGhpcy53cmFwKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXBwbHlDb21tYW5kKCdwb3N0SW50ZWdyYXRlJyk7XG4gIH1cblxuICAvLyBCVUlMRElORyAmIFdSQVBQSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgJ01lc2hDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIHdyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gVE9ETzogRml4IGRlZmVyIHdpdGggcGh5c2ljc1xuICAgICAgLy8gdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICBjb25zdCB7cG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZSwgc2hhZG93fSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnopO1xuICAgICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUueCwgc2NhbGUueSwgc2NhbGUueik7XG5cbiAgICAgIHRoaXMubmF0aXZlLmNhc3RTaGFkb3cgPSBzaGFkb3cuY2FzdDtcbiAgICAgIHRoaXMubmF0aXZlLnJlY2VpdmVTaGFkb3cgPSBzaGFkb3cucmVjZWl2ZTtcblxuICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAvLyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBNZXNoQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gICAqL1xuICBjb3B5KHNvdXJjZSkge1xuICAgIHJldHVybiBzdXBlci5jb3B5KHNvdXJjZSwgKCkgPT4ge1xuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTWVzaENvbXBvbmVudCB1c2luZyBgLmNvcHkoKWBcbiAgICogQHJldHVybiB7TWVzaENvbXBvbmVudH0gY2xvbmUgb2YgdGhpcyBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAgICovXG4gIGNsb25lKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgIGNvbnN0IGRlc3QgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcblxuICAgIGlmIChnZW9tZXRyeSkgZGVzdC5nZW9tZXRyeSA9IGRlc3QuZ2VvbWV0cnkuY2xvbmUoKTtcbiAgICBpZiAobWF0ZXJpYWwpIGRlc3QubWF0ZXJpYWwgPSBkZXN0Lm1hdGVyaWFsLmNsb25lKCk7XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBNZXNoQ29tcG9uZW50XG59O1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuaW1wb3J0IHthdHRyaWJ1dGVzLCBjb3B5fSBmcm9tICcuL3Byb3RvdHlwZS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7Q29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5AYXR0cmlidXRlcyhcbiAgY29weSgncG9zaXRpb24nLCAncm90YXRpb24nLCAncXVhdGVybmlvbicsICd0YXJnZXQnKVxuKVxuLyoqXG4gKiBAY2xhc3MgTGlnaHRDb21wb25lbnRcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RydWN0aW9uc10gLSBUaGUgaW5zdHJ1Y3Rpb25zIG9iamVjdC5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExpZ2h0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgYnVpbGQ6IHRydWUsXG4gICAqXG4gICAqICAgc2hhZG93OiB7XG4gICAqICAgICBjYXN0OiB0cnVlLFxuICAgKlxuICAgKiAgICAgYmlhczogMCxcbiAgICogICAgIHJhZGl1czogMSxcbiAgICpcbiAgICogICAgIG1hcFNpemU6IHtcbiAgICogICAgICAgd2lkdGg6IDEwMjQsXG4gICAqICAgICAgIGhlaWdodDogMTAyNFxuICAgKiAgICAgfSxcbiAgICpcbiAgICogICAgIGNhbWVyYToge1xuICAgKiAgICAgICBuZWFyOiB0cnVlLFxuICAgKiAgICAgICBmYXI6IDQwMCxcbiAgICogICAgICAgZm92OiA5MCxcbiAgICpcbiAgICogICAgICAgdG9wOiAyMDAsXG4gICAqICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICogICAgICAgbGVmdDogLTIwMCxcbiAgICogICAgICAgcmlnaHQ6IDIwMFxuICAgKiAgICAgfVxuICAgKiAgIH0sXG4gICAqXG4gICAqICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICogICByb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9XG4gICAqIH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5Db21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBidWlsZDogdHJ1ZSxcblxuICAgIHNoYWRvdzoge1xuICAgICAgY2FzdDogdHJ1ZSxcblxuICAgICAgYmlhczogMCxcbiAgICAgIHJhZGl1czogMSxcblxuICAgICAgbWFwU2l6ZToge1xuICAgICAgICB3aWR0aDogMTAyNCxcbiAgICAgICAgaGVpZ2h0OiAxMDI0XG4gICAgICB9LFxuXG4gICAgICBjYW1lcmE6IHtcbiAgICAgICAgbmVhcjogdHJ1ZSxcbiAgICAgICAgZmFyOiA0MDAsXG4gICAgICAgIGZvdjogOTAsXG5cbiAgICAgICAgdG9wOiAyMDAsXG4gICAgICAgIGJvdHRvbTogLTIwMCxcbiAgICAgICAgbGVmdDogLTIwMCxcbiAgICAgICAgcmlnaHQ6IDIwMFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50I2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0XG4gICAqIHtcbiAgICogICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmF1bHRzID0gTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IExpZ2h0Q29tcG9uZW50Lmluc3RydWN0aW9ucykge1xuICAgIHN1cGVyKHBhcmFtcywgZGVmYXVsdHMsIGluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYnVpbGQpIHtcbiAgICAgIGNvbnN0IGJ1aWxkID0gdGhpcy5idWlsZCh0aGlzLnBhcmFtcyk7XG5cbiAgICAgIGlmICghYnVpbGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoXG4gICAgICAgICAgJ0xpZ2h0Q29tcG9uZW50JyxcbiAgICAgICAgICAnLmJ1aWxkKCkgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBUSFJFRS5PYmplY3QzRCBvciBhIFByb21pc2UgcmVzb2x2ZWQgd2l0aCBUSFJFRS5PYmplY3QzRC4nLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1aWxkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBidWlsZC50aGVuKG5hdGl2ZSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHRoaXMubmF0aXZlID0gYnVpbGQ7XG5cbiAgICAgIHRoaXMud2FpdCh0aGlzLndyYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseUNvbW1hbmQoJ3Bvc3RJbnRlZ3JhdGUnKTtcbiAgfVxuXG4gIC8vIEJVSUxESU5HICYgV1JBUFBJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBzaG91bGQgcmV0dXJuIGEgbmF0aXZlIG9iamVjdC5cbiAgICogQHRocm93cyB7Q29tcG9zaXRpb25FcnJvcn1cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdNZXNoQ29tcG9uZW50JyxcbiAgICAgICdJbnN0YW5jZSBzaG91bGQgaGF2ZSBpdFxcJ3Mgb3duIC5idWlsZCgpLicsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdyYXBcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBXcmFwcyB0cmFuc2Zvcm1zIChgcG9zaXRpb25gICYgYHJvdGF0aW9uYClcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZWQgd2hlbiBhY3Rpb24gaXMgY29tcGxldGVkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9uLCByb3RhdGlvbn0gPSB0aGlzLnBhcmFtcztcblxuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XG5cbiAgICAgICAgdGhpcy5hcHBseUJyaWRnZSh7b25XcmFwOiAxfSk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFNoYWRvd1xuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHNoYWRvdyBwcm9wZXJ0aWVzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICAgKi9cbiAgd3JhcFNoYWRvdygpIHtcbiAgICBjb25zdCB7bmF0aXZlLCBwYXJhbXM6IHtzaGFkb3d9fSA9IHRoaXM7XG5cbiAgICBuYXRpdmUuY2FzdFNoYWRvdyA9IHNoYWRvdy5jYXN0O1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IHNoYWRvdy5tYXBTaXplLndpZHRoO1xuICAgIG5hdGl2ZS5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSBzaGFkb3cubWFwU2l6ZS5oZWlnaHQ7XG4gICAgbmF0aXZlLnNoYWRvdy5iaWFzID0gc2hhZG93LmJpYXM7XG4gICAgbmF0aXZlLnNoYWRvdy5yYWRpdXMgPSBzaGFkb3cucmFkaXVzO1xuXG4gICAgY29uc3Qgc2hhZG93Q2FtZXJhID0gbmF0aXZlLnNoYWRvdy5jYW1lcmE7XG4gICAgY29uc3QgY2FtZXJhID0gc2hhZG93LmNhbWVyYTtcblxuICAgIHNoYWRvd0NhbWVyYS5uZWFyID0gY2FtZXJhLm5lYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZhciA9IGNhbWVyYS5mYXI7XG4gICAgc2hhZG93Q2FtZXJhLmZvdiA9IGNhbWVyYS5mb3Y7XG5cbiAgICBzaGFkb3dDYW1lcmEubGVmdCA9IGNhbWVyYS5sZWZ0O1xuICAgIHNoYWRvd0NhbWVyYS5yaWdodCA9IGNhbWVyYS5yaWdodDtcbiAgICBzaGFkb3dDYW1lcmEudG9wID0gY2FtZXJhLnRvcDtcbiAgICBzaGFkb3dDYW1lcmEuYm90dG9tID0gY2FtZXJhLmJvdHRvbTtcbiAgfVxuXG4gIC8vIENPUFlJTkcgJiBDTE9OSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY29weVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIENvcHkgc291cmNlIHRyYW5zZm9ybXMgJiBleGVjdXRlIGBDb21wb25lbnQuY29weSgpYFxuICAgKiBAcmV0dXJuIHt0aGlzfSBMaWdodENvbXBvbmVudFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgTGlnaHRDb21wb25lbnQgdXNpbmcgYC5jb3B5KClgXG4gICAqIEByZXR1cm4ge0xpZ2h0Q29tcG9uZW50fSBjbG9uZSBvZiB0aGlzIG9iamVjdFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBMaWdodENvbXBvbmVudFxufTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmltcG9ydCB7YXR0cmlidXRlcywgY29weX0gZnJvbSAnLi9wcm90b3R5cGUvYXR0cmlidXRlcyc7XG5pbXBvcnQge0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuQGF0dHJpYnV0ZXMoXG4gIGNvcHkoJ3Bvc2l0aW9uJywgJ3JvdGF0aW9uJywgJ3F1YXRlcm5pb24nLCAndGFyZ2V0Jylcbilcbi8qKlxuICogQGNsYXNzIENhbWVyYUNvbXBvbmVudFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdHJ1Y3Rpb25zXSAtIFRoZSBpbnN0cnVjdGlvbnMgb2JqZWN0LlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQ2FtZXJhQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50I2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHRcbiAgICoge1xuICAgKiAgIGJ1aWxkOiB0cnVlLFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAqICAgcm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxuICAgKiB9XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgYnVpbGQ6IHRydWUsXG5cbiAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhdGljIGluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdFxuICAgKiB7XG4gICAqICAgcG9zaXRpb246IFsneCcsICd5JywgJ3onXSxcbiAgICogICByb3RhdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgKiAgIHNjYWxlOiBbJ3gnLCAneScsICd6J11cbiAgICogfVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICBwb3NpdGlvbjogWyd4JywgJ3knLCAneiddLFxuICAgIHJvdGF0aW9uOiBbJ3gnLCAneScsICd6J10sXG4gICAgc2NhbGU6IFsneCcsICd5JywgJ3onXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmYXVsdHMgPSBDYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsIGluc3RydWN0aW9ucyA9IENhbWVyYUNvbXBvbmVudC5pbnN0cnVjdGlvbnMpIHtcbiAgICBzdXBlcihwYXJhbXMsIGRlZmF1bHRzLCBpbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmJ1aWxkKSB7XG4gICAgICBjb25zdCBidWlsZCA9IHRoaXMuYnVpbGQodGhpcy5wYXJhbXMpO1xuXG4gICAgICBpZiAoIWJ1aWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKFxuICAgICAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgICAgICcuYnVpbGQoKSBtZXRob2Qgc2hvdWxkIHJldHVybiBhIFRIUkVFLk9iamVjdDNEIG9yIGEgUHJvbWlzZSByZXNvbHZlZCB3aXRoIFRIUkVFLk9iamVjdDNELicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVpbGQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGJ1aWxkLnRoZW4obmF0aXZlID0+IHtcbiAgICAgICAgICB0aGlzLm5hdGl2ZSA9IG5hdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgdGhpcy5uYXRpdmUgPSBidWlsZDtcblxuICAgICAgdGhpcy53YWl0KHRoaXMud3JhcCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5Q29tbWFuZCgncG9zdEludGVncmF0ZScpO1xuICB9XG5cbiAgLy8gQlVJTERJTkcgJiBXUkFQUElOR1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIHNob3VsZCByZXR1cm4gYSBuYXRpdmUgb2JqZWN0LlxuICAgKiBAdGhyb3dzIHtDb21wb3NpdGlvbkVycm9yfVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihcbiAgICAgICdDYW1lcmFDb21wb25lbnQnLFxuICAgICAgJ0luc3RhbmNlIHNob3VsZCBoYXZlIGl0XFwncyBvd24gLmJ1aWxkKCkuJyxcbiAgICAgIHRoaXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd3JhcFxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFdyYXBzIHRyYW5zZm9ybXMgKGBwb3NpdGlvbmAgJiBgcm90YXRpb25gKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlZCB3aGVuIGFjdGlvbiBpcyBjb21wbGV0ZWRcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICAgKi9cbiAgd3JhcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQodGhpcy5wYXJhbXMucG9zaXRpb24ueCwgdGhpcy5wYXJhbXMucG9zaXRpb24ueSwgdGhpcy5wYXJhbXMucG9zaXRpb24ueik7XG4gICAgICAgIHRoaXMucm90YXRpb24uc2V0KHRoaXMucGFyYW1zLnJvdGF0aW9uLngsIHRoaXMucGFyYW1zLnJvdGF0aW9uLnksIHRoaXMucGFyYW1zLnJvdGF0aW9uLnopO1xuXG4gICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe29uV3JhcDogMX0pO1xuXG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvcHlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBDb3B5IHNvdXJjZSB0cmFuc2Zvcm1zICYgZXhlY3V0ZSBgQ29tcG9uZW50LmNvcHkoKWBcbiAgICogQHJldHVybiB7dGhpc30gQ2FtZXJhQ29tcG9uZW50XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNvcHkoc291cmNlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNvcHkoc291cmNlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50YXJnZXQpIHRoaXMudGFyZ2V0LmNvcHkoc291cmNlLnRhcmdldCgpKTtcblxuICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHNvdXJjZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLnJvdGF0aW9uLmNvcHkoc291cmNlLnJvdGF0aW9uKTtcbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KHNvdXJjZS5xdWF0ZXJuaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsb25lXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gTWFrZSBhIGNsb25lIG9mIHRoaXMgQ2FtZXJhQ29tcG9uZW50IHVzaW5nIGAuY29weSgpYFxuICAgKiBAcmV0dXJuIHtDYW1lcmFDb21wb25lbnR9IGNsb25lIG9mIHRoaXMgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7YnVpbGQ6IGZhbHNlfSkuY29weSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBDYW1lcmFDb21wb25lbnRcbn07XG4iLCJleHBvcnQgY29uc3Qgc3lzdGVtID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG59O1xuIiwiaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHtzeXN0ZW19IGZyb20gJy4uL3BvbHlmaWxsJztcbmltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJ9IGZyb20gJy4vTW9kdWxlTWFuYWdlcic7XG5cbi8qKlxuICogQGNsYXNzIEFwcFxuICogQGNhdGVnb3J5IGNvcmVcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIHByZXBhcmUgYSB3b3JsZCBzY2VuZSwgc2V0dXAgcGh5c2ljcywgY2FtZXJhLCByZW5kZXJlciBhbmQgYWxsIG90aGVyIHRoaW5ncyB0aGF0IHlvdSB1c3VhbGx5IGRvIGJlZm9yZSBtYWtpbmcgbWVzaGVzLlxuICogQHBhcmFtIHtBcnJheX0gW21vZHVsZXM9W11dIC0gQXJyYXkgb2YgTW9kdWxlc1xuICogQGV4dGVuZHMgTW9kdWxlU3lzdGVtXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgLyoqXG4gICAqIFNpbXVsYXRlIGZsYWdcbiAgICogQGRlc2NyaXB0aW9uIFNhbWUgYXMgLnVwZGF0ZUVuYWJsZWQsIGJ1dCBmb3IgcGh5c2ljcy4gRGVmaW5lcyBpZiBwaHlzaWNzIGlzIHNpbXVsYXRlZCBlYWNoIGZyYW1lLlxuICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb2R1bGU6Y29yZS5BcHAjc2ltdWxhdGVcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2ltdWxhdGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERlZmluZXMgd2hldGhlciB0aGUgc2NlbmUgc2hvdWxkIHJlbmRlciBvciBub3RcbiAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kdWxlOmNvcmUuQXBwI3VwZGF0ZUVuYWJsZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gIC8qKlxuICAgKiBMb29wcyBpbiB0aGlzIGFwcFxuICAgKiBAZGVzY3JpcHRpb24gQXJyYXkgb2YgbG9vcHMgdGhhdCBhcmUgZXhlY3V0ZWQgYnkgdGhpcyBhcHAuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5BcHAjbG9vcHNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbG9vcHMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihtb2R1bGVzID0gW10pIHtcbiAgICBjb25zb2xlLmxvZyhgV0hTLkFwcCAke3ZlcnNpb259YCk7XG5cbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFuYWdlciA9IG5ldyBNb2R1bGVNYW5hZ2VyKHRoaXMpO1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG5cbiAgICB0aGlzLmludGVncmF0ZU1vZHVsZXMoKTtcbiAgfVxuXG4gIC8vIENPTlRST0xTICYgVVBEQVRJTkdcblxuICAvKipcbiAgICogQG1ldGhvZCBzdGFydFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgcmVuZGVyaW5nIGxvb3AgYW5kIHBoeXNpY3Mgc2ltdWxhdGlvbiAoaWYgeW91IHVzZSB2ZXJzaW9uIHdpdGggcGh5c2ljcykuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHN5c3RlbS53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IHN5c3RlbS53aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHN5c3RlbS53aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3Qge2xvb3BzLCB1cGRhdGVFbmFibGVkfSA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzKCkge1xuICAgICAgcmVxdWVzdEFuaW1GcmFtZShwcm9jZXNzKTtcbiAgICAgIGlmICghdXBkYXRlRW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGwgPSBsb29wcy5sZW5ndGg7IGkgPCBsbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGUgPSBsb29wc1tpXTtcbiAgICAgICAgaWYgKGUuZW5hYmxlZCkgZS5leGVjdXRlKGUuY2xvY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRW5hYmxlZCA9IHRydWU7XG4gICAgcHJvY2VzcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RvcFxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgcmVuZGVyaW5nIGxvb3BzXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy51cGRhdGVFbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBhZGRMb29wXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGxvb3AgdG8gdGhpcyBhcHAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb29wIC0gdGhlIGxvb3AgdG8gYWRkXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHByb21pc2VzIGNvbXBsZXRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkFwcFxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5BZGRpbmcgYSBsb29wIHRvIGFuIGFwcDwvY2FwdGlvbj5cbiAgICogY29uc3QgbG9vcCA9IG5ldyBMb29wKCgpID0+IHtcbiAgICogIC8vIC4uLlxuICAgKiB9KTtcbiAgICpcbiAgICogY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICAgKlxuICAgKiBhcHAuYWRkTG9vcChsb29wKTtcbiAgICogbG9vcC5zdGFydCgpO1xuICAgKi9cbiAgYWRkTG9vcChsb29wKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5sb29wcy5wdXNoKGxvb3ApO1xuICAgICAgcmVzb2x2ZShsb29wKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZUxvb3BcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgbG9vcCBmcm9tIHRoaXMgYXBwLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbG9vcCAtIHRoZSBsb29wIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBwcm9taXNlcyBjb21wbGV0ZWQuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5BcHBcbiAgICovXG4gIHJlbW92ZUxvb3AobG9vcCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb29wcy5pbmRleE9mKGxvb3ApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkgdGhpcy5sb29wcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICByZXNvbHZlKGxvb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0KGtleSk7XG4gIH1cblxuICB1c2Uoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci51c2Uoa2V5KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcHBcbn07XG4iLCJpbXBvcnQge0Nsb2NrfSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIExvb3BcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZWFjaCBhbmltYXRpb24gZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNsb2NrPXRydWVdIHBhc3NlcyBhIENsb2NrIHRvIHRoZSBmdW5jdGlvbiB3aGVuIGNhbGxlZCwgaWYgdHJ1ZVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3RvcihmdW5jLCB1c2VDbG9jayA9IHRydWUpIHtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgIHRoaXMuY2xvY2sgPSB1c2VDbG9jayA/IG5ldyBDbG9jaygpIDogbnVsbDtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIENPTlRST0xTXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydHMgdGhpcyBsb29wLCBjbG9jayBpZiBpdCBoYXMgb25lLiBXb24ndCBkbyBhbnl0aGluZyBpZiBsb29wIGVuYWJsZWQgYWxyZWFkeS5cbiAgICogQHBhcmFtIHtDb21wb25lbnR9IFt3b3JsZF0gYXBwIHRvIGFkZCB0aGlzIGxvb3AgdG8sIGlmIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuTG9vcFxuICAgKi9cbiAgc3RhcnQod29ybGQpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBpZiAod29ybGQpIHdvcmxkLmFkZExvb3AodGhpcyk7XG5cbiAgICBpZiAodGhpcy5jbG9jaykgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gU3RvcHMgdGhpcyBsb29wIGFuZCBpdHMgY2xvY2sgaWYgaXQgaGFzIG9uZSwgd29uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBsb29wIGlzIG5vdCBlbmFibGVkKVxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gW3dvcmxkXSBhcHAgdG8gcmVtb3ZlIHRoaXMgbG9vcCBmcm9tLCBpZiBwcm92aWRlZC5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICovXG4gIHN0b3Aod29ybGQpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuY2xvY2spIHRoaXMuY2xvY2suc3RvcCgpO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHdvcmxkKSB3b3JsZC5yZW1vdmVMb29wKHRoaXMpO1xuICB9XG5cbiAgLy8gRVhFQ1VUSU9OXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZXhlY3V0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3BcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlLkxvb3BcbiAgICogQHJldHVybnMgeyp9IHdoYXRldmVyIHRoZSBmdW5jdGlvbiBvZiB0aGlzIGxvb3AgcmV0dXJuc1xuICAgKi9cbiAgZXhlY3V0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mdW5jKHRoaXMuY2xvY2spO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExvb3Bcbn07XG4iLCIvKiogQG1vZHVsZSBjb3JlICovXG5leHBvcnQgKiBmcm9tICcuL0NvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL01lc2hDb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9MaWdodENvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0NhbWVyYUNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0FwcCc7XG5leHBvcnQgKiBmcm9tICcuL0xvb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9Nb2R1bGVNYW5hZ2VyJztcbiIsImltcG9ydCB7QW1iaWVudExpZ2h0IGFzIEFtYmllbnRMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEFtYmllbnRMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gQW1iaWVudExpZ2h0IGlzIGEgc2ltcGxlIGNsYXNzLCBpdCBleHRlbmRzIExpZ2h0IGFuZCBpbmhlcml0cyBhbGwgaXRzIG1ldGhvZHMuXG4gKiBBbWJpZW50TGlnaHQgY3JlYXRlcyBiYXNpYyBsaWdodCBhcm91bmQgYWxsIHNjZW5lLCBzbyBpdCBkb2Vzbid0IG5lZWQgcHJvcGVydGllcyBsaWtlIHBvcyBvciB0YXJnZXQuXG4gKiBJdCBzdXBwb3J0cyBvbmx5IGNvbG9yIGFuZCBpbnRlbnNpdHkgYXMgcGFyYW1ldGVycywgd2hpY2ggZGVmaW5lcyB0aGUgY29sb3Igb2YgdGhlIHN1cnJvdW5kZWQgbGlnaHQgYW5kIGludGVuc2l0eSBvZiBsaWdodC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkxpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBBbWJpZW50TGlnaHQgPC9jYXB0aW9uPlxuICogbmV3IEFtYmllbnRMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjJcbiAqIH0pLmFkZFRvKHdvcmxkKTtcbiAqL1xuY2xhc3MgQW1iaWVudExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEFtYmllbnRMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEFtYmllbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQW1iaWVudExpZ2h0XG59O1xuIiwiaW1wb3J0IHtEaXJlY3Rpb25hbExpZ2h0IGFzIERpcmVjdGlvbmFsTGlnaHROYXRpdmUsIERpcmVjdGlvbmFsTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEaXJlY3Rpb25hbExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBEaXJlY3RpbmFsTGlnaHQgY3JlYXRlcyBhIGxpZ2h0IHRoYXQgc2hpbmVzIGZyb20gYSBzcGVjaWZpYyBkaXJlY3Rpb24gbm90IGZyb20gYSBzcGVjaWZpYyBwb3NpdGlvbi48YnIvPjxici8+XG4gKiBUaGlzIGxpZ2h0IHdpbGwgYmVoYXZlIGFzIHRob3VnaCBpdCBpcyBpbmZpbml0ZWx5IGZhciBhd2F5IGFuZCB0aGUgcmF5cyBwcm9kdWNlZCBmcm9tIGl0IGFyZSBhbGwgcGFyYWxsZWwuIDxici8+PGJyLz5cbiAqIFRoZSBiZXN0IGFuYWxvZ3kgd291bGQgYmUgYSBsaWdodCBzb3VyY2UgdGhhdCBhY3RzIGxpa2UgdGhlIHN1bjogdGhlIHN1biBpcyBzbyBmYXIgYXdheSB0aGF0IGFsbCBzdW5saWdodCBoaXR0aW5nIG9iamVjdHMgY29tZXMgZnJvbSB0aGUgc2FtZSBhbmdsZS48YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQgcGFyYW1hdGVyLCBidXQgaXQgYWxzbyBzdXBwb3J0cyBwb3MgYW5kIHRhcmdldCBwYXJhbWF0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgRGlyZWN0aW9uYWxMaWdodCB0byBmYWxsIGRvd24gZnJvbSB2ZWMzKDEwLCAyMCwgMTApIHRvIHZlYzMoMCwgMCwgMCk8L2NhcHRpb24+XG4gKiBuZXcgRGlyZWN0aW9uYWxMaWdodCh7XG4gKiAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgaW50ZW5zaXR5OiAwLjIsXG4gKlxuICogICBwb3NpdGlvbjogWzEwLCAyMCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBEaXJlY3Rpb25hbExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERpcmVjdGlvbmFsTGlnaHQuZGVmYXVsdHMpO1xuICAgIHRoaXMud3JhcFNoYWRvdygpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bGlnaHQ6IG5ldyBEaXJlY3Rpb25hbExpZ2h0TmF0aXZlKFxuICAgICAgcGFyYW1zLmNvbG9yLFxuICAgICAgcGFyYW1zLmludGVuc2l0eVxuICAgICl9KS5saWdodDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBEaXJlY3Rpb25hbExpZ2h0XG59O1xuIiwiaW1wb3J0IHtIZW1pc3BoZXJlTGlnaHQgYXMgSGVtaXNwaGVyZUxpZ2h0TmF0aXZlLCBIZW1pc3BoZXJlTGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBIZW1pc3BoZXJlTGlnaHRcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL2xpZ2h0c1xuICogQGRlc2NyaXB0aW9uIEhlbWlzcGhlcmVMaWdodCBpcyBhIGxpZ2h0IHNvdXJjZSBwb3NpdGlvbmVkIGRpcmVjdGx5IGFib3ZlIHRoZSBzY2VuZS48YnIvPlxuICogSXQgYWxzbyBkb2Vzbid0IG5lZWQgcG9zaXRpb24gYW5kIHRhcmdldCBwcm9wZXJ0aWVzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2xpZ2h0c19oZW1pc3BoZXJlLmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge3NreUNvbG9yOiAweGZmZmZmZiwgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDF9fV0gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTGlnaHRDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9saWdodHNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgSGVtaXNwaGVyZUxpZ2h0PC9jYXB0aW9uPlxuICogbmV3IEhlbWlzcGhlcmVMaWdodCh7XG4gKiAgIHNreUNvbG9yOiAweGZmMDAwMCxcbiAqICAgZ3JvdW5kQ29sb3I6IDB4MDAwMGZmLFxuICogICBpbnRlbnNpdHk6IDAuMlxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgSGVtaXNwaGVyZUxpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBza3lDb2xvcjogMHhmZmZmZmYsXG4gICAgZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEhlbWlzcGhlcmVMaWdodC5kZWZhdWx0cyk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IEhlbWlzcGhlcmVMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5za3lDb2xvcixcbiAgICAgIHBhcmFtcy5ncm91bmRDb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgSGVtaXNwaGVyZUxpZ2h0XG59O1xuIiwiaW1wb3J0IHtQb2ludExpZ2h0IGFzIFBvaW50TGlnaHROYXRpdmUsIFBvaW50TGlnaHRIZWxwZXJ9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBQb2ludExpZ2h0XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9saWdodHNcbiAqIEBkZXNjcmlwdGlvbiBQb2ludExpZ2h0IGNyZWF0ZXMgYSBsaWdodCBhdCBhIHNwZWNpZmljIHBvc2l0aW9uIGluIHRoZSBzY2VuZS4gVGhlIGxpZ2h0IHNoaW5lcyBpbiBhbGwgZGlyZWN0aW9ucyAocm91Z2hseSBzaW1pbGFyIHRvIGEgbGlnaHQgYnVsYi4pPGJyLz48YnIvPlxuICogSXQgaGFzIHRoZSBzYW1lIG9wdGlvbnMgYXMgQW1iaWVudExpZ2h0IGluIGxpZ2h0IHBhcmFtYXRlciwgYnV0IGl0IGFsc28gc3VwcG9ydHMgcG9zaXRpb24sIGRpc3RhbmNlIGFuZCBkZWNheS48YnIvPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xpZ2h0OiB7Y29sb3I6IDB4ZmZmZmZmLCBpbnRlbnNpdHk6IDEsIGRpc3RhbmNlOiAxMDAsIGRlY2F5OiAxfX1dIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIExpZ2h0Q29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFBvaW50TGlnaHQ8L2NhcHRpb24+XG4gKiBuZXcgUG9pbnRMaWdodCgge1xuICogICBjb2xvcjogMHhmZjAwMDAsXG4gKiAgIGludGVuc2l0eTogMixcbiAqICAgZGlzdGFuY2U6IDMwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgUG9pbnRMaWdodCBleHRlbmRzIExpZ2h0Q29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRzPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgZGVjYXk6IDFcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQb2ludExpZ2h0LmRlZmF1bHRzKTtcbiAgICB0aGlzLndyYXBTaGFkb3coKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUG9pbnRMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUG9pbnRMaWdodFxufTtcbiIsImltcG9ydCB7U3BvdExpZ2h0IGFzIFNwb3RMaWdodE5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtMaWdodENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9MaWdodENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNwb3RMaWdodFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbGlnaHRzXG4gKiBAZGVzY3JpcHRpb24gU3BvdExpZ2h0IGNyZWF0ZXMgc3BvdCBsaWdodCB0aGF0IGNhbiBjYXN0IHNoYWRvdyBpbiBvbmUgZGlyZWN0aW9uLiA8YnIvPjxici8+XG4gKiBJdCBoYXMgdGhlIHNhbWUgcGFyYW1ldGVycyBhcyBBbWJpZW50TGlnaHQgaW4gbGlnaHQsIGJ1dCBpdCBhbHNvIHN1cHBvcnRzIHBvcyBhbmQgdGFyZ2V0LiA8YnIvPjxici8+XG4gKiBTcG90TGlnaHQgYWZmZWN0cyBtZXNoZXMgd2l0aCBsYW1iZXJ0IGFuZCBwaG9uZyBtYXRlcmlhbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9saWdodHNfc3BvdGxpZ2h0Lmh0bWxcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtsaWdodDoge2NvbG9yOiAweGZmZmZmZiwgaW50ZW5zaXR5OiAxLCBkaXN0YW5jZTogMTAwLCBhbmdsZTogTWF0aC5QSSAvIDMsIGV4cG9uZW50OiAwLCBkZWNheTogMX19XSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5MaWdodENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2xpZ2h0c1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBTcG90TGlnaHQgdGhhdCBmYWxscyBkb3duIGZyb20gdmVjMygxMCwgMjAsIDEwKSB0byB2ZWMzKDAsIDAsIDApPC9jYXB0aW9uPlxuICogbmV3IFNwb3RMaWdodCh7XG4gKiAgIGNvbG9yOiAweDAwZmYwMCxcbiAqICAgaW50ZW5zaXR5OiAzLFxuICogICBkaXN0YW5jZTogMTAwMFxuICpcbiAqICAgcG9zaXRpb246IFsxMCwgMjAsIDEwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgU3BvdExpZ2h0IGV4dGVuZHMgTGlnaHRDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTGlnaHRDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAxLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgYW5nbGU6IE1hdGguUEkgLyAzLFxuICAgIGV4cG9uZW50OiAwLFxuICAgIGRlY2F5OiAxXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFNwb3RMaWdodC5kZWZhdWx0cyk7XG4gICAgdGhpcy53cmFwU2hhZG93KCk7XG4gIH1cblxuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHtsaWdodDogbmV3IFNwb3RMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMuZGlzdGFuY2UsXG4gICAgICBwYXJhbXMuYW5nbGUsXG4gICAgICBwYXJhbXMuZXhwb25lbnQsXG4gICAgICBwYXJhbXMuZGVjYXlcbiAgICApfSkubGlnaHQ7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgU3BvdExpZ2h0XG59O1xuIiwiaW1wb3J0IHtSZWN0QXJlYUxpZ2h0IGFzIFJlY3RBcmVhTGlnaHROYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7TGlnaHRDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTGlnaHRDb21wb25lbnQnO1xuXG5jbGFzcyBBcmVhTGlnaHQgZXh0ZW5kcyBMaWdodENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5MaWdodENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgd2lkdGg6IDEwLFxuICAgIGhlaWdodDogMTBcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQXJlYUxpZ2h0LmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2xpZ2h0OiBuZXcgUmVjdEFyZWFMaWdodE5hdGl2ZShcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIHBhcmFtcy5pbnRlbnNpdHksXG4gICAgICBwYXJhbXMud2lkdGgsXG4gICAgICBwYXJhbXMuaGVpZ2h0XG4gICAgKX0pLmxpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEFyZWFMaWdodFxufTtcbiIsIi8qKiBAbW9kdWxlIGNvbXBvbmVudHMvbGlnaHRzICovXG5leHBvcnQgKiBmcm9tICcuL0FtYmllbnRMaWdodCc7XG5leHBvcnQgKiBmcm9tICcuL0RpcmVjdGlvbmFsTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9IZW1pc3BoZXJlTGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2ludExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vU3BvdExpZ2h0JztcbmV4cG9ydCAqIGZyb20gJy4vQXJlYUxpZ2h0JztcbiIsImltcG9ydCB7Q3ViZUNhbWVyYSBhcyBDdWJlQ2FtZXJhTmF0aXZlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NhbWVyYUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9DYW1lcmFDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDdWJlQ2FtZXJhXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyA2IGNhbWVyYXMgdGhhdCByZW5kZXIgdG8gYSBXZWJHTFJlbmRlclRhcmdldEN1YmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9jYW1lcmFzXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5DYW1lcmFDb21wb25lbnRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZXMgYSBDdWJlQ2FtZXJhIGFuZCBzZXQgaXQgYXMgYXBwJ3MgY2FtZXJhPC9jYXB0aW9uPlxuICogY29uc3QgY2FtZXJhID0gbmV3IEN1YmVDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBjdWJlUmVzb2x1dGlvbjogMjU2XG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSk7XG4gKlxuICogYXBwLmNhbWVyYSA9IGNhbWVyYTtcbiAqL1xuY2xhc3MgQ3ViZUNhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5DdWJlQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGNhbWVyYToge1xuICAgKiAgICAgbmVhcjogMSxcbiAgICogICAgIGZhcjogMTAwMCxcbiAgICogICAgIGN1YmVSZXNvbHV0aW9uOiAxMjhcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5DYW1lcmFDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBuZWFyOiAxLFxuICAgIGZhcjogMTAwMCxcbiAgICBjdWJlUmVzb2x1dGlvbjogMTI4XG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIEN1YmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgQ3ViZUNhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhcixcbiAgICAgIHBhcmFtcy5jdWJlUmVzb2x1dGlvblxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ3ViZUNhbWVyYVxufTtcbiIsImltcG9ydCB7T3J0aG9ncmFwaGljQ2FtZXJhIGFzIE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtDYW1lcmFDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvQ2FtZXJhQ29tcG9uZW50JztcbmltcG9ydCB7c3lzdGVtfSBmcm9tICcuLi8uLi9wb2x5ZmlsbCc7XG5cbi8qKlxuICogQGNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvY2FtZXJhc1xuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIG9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXNcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLkNhbWVyYUNvbXBvbmVudFxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFuIE9ydGhvZ3JhcGhpY0NhbWVyYSBhbmQgc2V0IGl0IGFzIGFwcCdzIGNhbWVyYTwvY2FwdGlvbj5cbiAqIGNvbnN0IGNhbWVyYSA9IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoe1xuICogICBjYW1lcmE6IHtcbiAqICAgICBmYXI6IDEwMDAwXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHk6IDUwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIE9ydGhvZ3JhcGhpY0NhbWVyYSBleHRlbmRzIENhbWVyYUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL2NhbWVyYXMuT3J0aG9ncmFwaGljQ2FtZXJhI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIG5lYXI6IDEsXG4gICAqICAgZmFyOiAxMDAwLFxuICAgKiAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgKiAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgKiAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAqICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLkNhbWVyYUNvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIG5lYXI6IDEsXG4gICAgZmFyOiAxMDAwLFxuICAgIGxlZnQ6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIC0yLFxuICAgIHJpZ2h0OiBzeXN0ZW0ud2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgIHRvcDogc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBzeXN0ZW0ud2luZG93LmlubmVySGVpZ2h0IC8gLTJcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT3J0aG9ncmFwaGljQ2FtZXJhLmRlZmF1bHRzKTtcbiAgfVxuXG4gIGJ1aWxkKHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe2NhbWVyYTogbmV3IE9ydGhvZ3JhcGhpY0NhbWVyYU5hdGl2ZShcbiAgICAgIHBhcmFtcy5sZWZ0LFxuICAgICAgcGFyYW1zLnJpZ2h0LFxuICAgICAgcGFyYW1zLnRvcCxcbiAgICAgIHBhcmFtcy5ib3R0b20sXG4gICAgICBwYXJhbXMubmVhcixcbiAgICAgIHBhcmFtcy5mYXJcbiAgICApfSkuY2FtZXJhO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9ydGhvZ3JhcGhpY0NhbWVyYVxufTtcbiIsImltcG9ydCB7UGVyc3BlY3RpdmVDYW1lcmEgYXMgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7Q2FtZXJhQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL0NhbWVyYUNvbXBvbmVudCc7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vLi4vcG9seWZpbGwnO1xuXG4vKipcbiAqIEBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYVxuICogQGRlc2NyaXB0aW9uIENhbWVyYSB3aXRoIHBlcnNwZWN0aXZlIHByb2plY3Rpb24uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9jYW1lcmFzXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1ldGVycyBvYmplY3QuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhc1xuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuQ2FtZXJhQ29tcG9uZW50XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGUgYW4gUGVyc3BlY3RpdmVDYW1lcmEgYW5kIHNldCBpdCBhcyBhcHAncyBjYW1lcmE8L2NhcHRpb24+XG4gKiBjb25zdCBjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoe1xuICogICBmb3Y6IDc1LFxuICogICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB4OiAwLFxuICogICAgIHk6IDEwMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGFwcC5jYW1lcmEgPSBjYW1lcmE7XG4gKi9cbmNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvY2FtZXJhcy5QZXJzcGVjdGl2ZUNhbWVyYSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBuZWFyOiAxLFxuICAgKiAgIGZhcjogMTAwMCxcbiAgICogICBmb3Y6IDc1LFxuICAgKiAgIGFzcGVjdDogc3lzdGVtLndpbmRvdy5pbm5lcldpZHRoIC8gc3lzdGVtLndpbmRvdy5pbm5lckhlaWdodFxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uQ2FtZXJhQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgbmVhcjogMSxcbiAgICBmYXI6IDEwMDAsXG4gICAgZm92OiA3NSxcbiAgICBhc3BlY3Q6IHN5c3RlbS53aW5kb3cuaW5uZXJXaWR0aCAvIHN5c3RlbS53aW5kb3cuaW5uZXJIZWlnaHRcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUGVyc3BlY3RpdmVDYW1lcmEuZGVmYXVsdHMpO1xuICB9XG5cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7Y2FtZXJhOiBuZXcgUGVyc3BlY3RpdmVDYW1lcmFOYXRpdmUoXG4gICAgICBwYXJhbXMuZm92LFxuICAgICAgcGFyYW1zLmFzcGVjdCxcbiAgICAgIHBhcmFtcy5uZWFyLFxuICAgICAgcGFyYW1zLmZhclxuICAgICl9KS5jYW1lcmE7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGVyc3BlY3RpdmVDYW1lcmFcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL2NhbWVyYXMgKi9cbmV4cG9ydCAqIGZyb20gJy4vQ3ViZUNhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL09ydGhvZ3JhcGhpY0NhbWVyYSc7XG5leHBvcnQgKiBmcm9tICcuL1BlcnNwZWN0aXZlQ2FtZXJhJztcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEJveEJ1ZmZlckdlb21ldHJ5LFxuICBCb3hHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgQm94XG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBcyB0b2xkIG9uIENvbXBvbmVudCBkZWZpbml0aW9uLCB3aGlsZSB5b3UgY2FuIHBhc3MgYW55IG9mIHRoZSBpbmhlcml0ZWQgcGFyYW1zIGZvciB0aGlzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24sIHlvdSB3aWxsIG5lZWQgdG9cbiAqIHBhc3Mgc3BlY2lmaWMgcGFyYW1ldGVycyB0byBidWlsZCB0aGlzIG1lc2ggYXMgYSBnZW9tZXRyeSBvYmplY3QuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0JveEdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBCb3gsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogIG5ldyBCb3goe1xuICogICAgZ2VvbWV0cnk6IHtcbiAqICAgICAgd2lkdGg6IDIsXG4gKiAgICAgIGhlaWdodDogMixcbiAqICAgICAgZGVwdGg6IDJcbiAqICAgIH0sXG4gKlxuICogICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgIGNvbG9yOiAweGZmZmZmZlxuICogICAgfSksXG4gKlxuICogICAgcG9zaXRpb246IFs1MCwgNjAsIDcwXVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgQm94IGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEsXG4gICAqICAgICBoZWlnaHQ6IDEsXG4gICAqICAgICBkZXB0aDogMSxcbiAgICogICAgIHdpZHRoU2VnbWVudHM6IDEsXG4gICAqICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICogICAgIGRlcHRoU2VnbWVudHM6IDFcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIGRlcHRoOiAxLFxuICAgICAgd2lkdGhTZWdtZW50czogMSxcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgZGVwdGhTZWdtZW50czogMVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkJveCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCBnZW9tZXRyeTogWyd3aWR0aCcsICdoZWlnaHQnLCAnZGVwdGgnLCAnd2lkdGhTZWdtZW50cycsICdoZWlnaHRTZWdtZW50cycsICdkZXB0aFNlZ2VtZW50cyddXG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICdkZXB0aCcsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJywgJ2RlcHRoU2VnZW1lbnRzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgQm94LmRlZmF1bHRzLCBCb3guaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQm94XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBCb3hCdWZmZXJHZW9tZXRyeSA6IEJveEdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGVwdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGhTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXB0aFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBCb3hcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBDaXJjbGVCdWZmZXJHZW9tZXRyeSxcbiAgQ2lyY2xlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIENpcmNsZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gQXMgdG9sZCBvbiBDb21wb25lbnQgZGVmaW5pdGlvbiwgd2hpbGUgeW91IGNhbiBwYXNzIGFueSBvZiB0aGUgaW5oZXJpdGVkIHBhcmFtcyBmb3IgdGhpcyBjb21wb25lbnQgY29uc3RydWN0aW9uLCB5b3Ugd2lsbCBuZWVkIHRvXG4gKiBwYXNzIHNwZWNpZmljIHBhcmFtZXRlcnMgdG8gYnVpbGQgdGhpcyBtZXNoIGFzIGEgZ2VvbWV0cnkgb2JqZWN0LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDaXJjbGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgQ2lyY2xlLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqICBuZXcgQ2lyY2xlKHtcbiAqICAgIGdlb21ldHJ5OiB7XG4gKiAgICAgIHJhZGl1czogNCxcbiAqICAgICAgc2VnbWVudHM6IDE2XG4gKiAgICB9LFxuICpcbiAqICAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgIH0pLFxuICpcbiAqICAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIENpcmNsZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogNTAsXG4gICAqICAgICBzZWdtZW50czogOCxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogNTAsXG4gICAgICBzZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DaXJjbGUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3NlZ21lbnRzJywgJ3RoZXRhU3RhcnQnLCAndGhldGFMZW5ndGgnXVxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWydyYWRpdXMnLCAnc2VnbWVudHMnLCAndGhldGFTdGFydCcsICd0aGV0YUxlbmd0aCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENpcmNsZS5kZWZhdWx0cywgQ2lyY2xlLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNpcmNsZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gQ2lyY2xlQnVmZmVyR2VvbWV0cnkgOiBDaXJjbGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIENpcmNsZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIENvbmVCdWZmZXJHZW9tZXRyeSxcbiAgQ29uZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBDb25lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDb25lR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIENvbmUsIGFuZCBhZGRpbmcgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IENvbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDb25lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Db25lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbXG4gICAqICAgJ3JhZGl1cycsXG4gICAqICAgJ2hlaWdodCcsXG4gICAqICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICogICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgKiAgICdvcGVuRW5kZWQnLFxuICAgKiAgICd0aGV0YVN0YXJ0JyxcbiAgICogICAndGhldGFMZW5ndGgnXG4gICAqIF1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1c1NlZ21lbnRzJyxcbiAgICAgICdoZWlnaHRTZWdtZW50cycsXG4gICAgICAnb3BlbkVuZGVkJyxcbiAgICAgICd0aGV0YVN0YXJ0JyxcbiAgICAgICd0aGV0YUxlbmd0aCdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIENvbmUuZGVmYXVsdHMsIENvbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkNvbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IENvbmVCdWZmZXJHZW9tZXRyeSA6IENvbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHRTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5vcGVuRW5kZWQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29uZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEN5bGluZGVyQnVmZmVyR2VvbWV0cnksXG4gIEN5bGluZGVyR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEN5bGluZGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGN5bGluZGVyIGlzIG9uZSBvZiB0aGUgbW9zdCBiYXNpYyBjdXJ2aWxpbmVhciBnZW9tZXRyaWMgc2hhcGVzLCB0aGUgc3VyZmFjZSBmb3JtZWQgYnkgdGhlIHBvaW50cyBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gYSBnaXZlbiBzdHJhaWdodCBsaW5lLCB0aGUgYXhpcyBvZiB0aGUgY3lsaW5kZXIuIDxici8+PGJyLz5cbiAqIFRoZSBzb2xpZCBlbmNsb3NlZCBieSB0aGlzIHN1cmZhY2UgYW5kIGJ5IHR3byBwbGFuZXMgcGVycGVuZGljdWxhciB0byB0aGUgYXhpcyBpcyBhbHNvIGNhbGxlZCBhIGN5bGluZGVyLjxici8+XG4gKiBUaGUgc3VyZmFjZSBhcmVhIGFuZCB0aGUgdm9sdW1lIG9mIGEgY3lsaW5kZXIgaGF2ZSBiZWVuIGtub3duIHNpbmNlIGRlZXAgYW50aXF1aXR5LlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNDeWxpbmRlckdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBDeWxpbmRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgQ3lsaW5kZXIoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1c1RvcDogMixcbiAqICAgICByYWRpdXNCb3R0b206IDQsXG4gKiAgICAgaGVpZ2h0OiA1XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3M6IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBDeWxpbmRlciBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5DeWxpbmRlciNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzVG9wOiAyMCxcbiAgICogICAgIHJhZGl1c0JvdHRvbTogMjAsXG4gICAqICAgICBoZWlnaHQ6IDEwMCxcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiAzMixcbiAgICogICAgIGhlaWdodFNlZ21lbnRzOiAxLFxuICAgKiAgICAgb3BlbkVuZGVkOiBmYWxzZSxcbiAgICogICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAqICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH08L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXNUb3A6IDAsXG4gICAgICByYWRpdXNCb3R0b206IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICByYWRpdXNTZWdtZW50czogMzIsXG4gICAgICBoZWlnaHRTZWdtZW50czogMSxcbiAgICAgIG9wZW5FbmRlZDogZmFsc2UsXG4gICAgICB0aGV0YVN0YXJ0OiAwLFxuICAgICAgdGhldGFMZW5ndGg6IE1hdGguUEkgKiAyXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuQ3lsaW5kZXIjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IFtcbiAgICogICAncmFkaXVzVG9wJyxcbiAgICogICAncmFkaXVzQm90dG9tJyxcbiAgICogICAnaGVpZ2h0JyxcbiAgICogICAncmFkaXVzU2VnbWVudHMnLFxuICAgKiAgICdoZWlnaHRTZWdtZW50cycsXG4gICAqICAgJ29wZW5FbmRlZCcsXG4gICAqICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICd0aGV0YUxlbmd0aCdcbiAgICogXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXNUb3AnLFxuICAgICAgJ3JhZGl1c0JvdHRvbScsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnaGVpZ2h0U2VnbWVudHMnLFxuICAgICAgJ29wZW5FbmRlZCcsXG4gICAgICAndGhldGFTdGFydCcsXG4gICAgICAndGhldGFMZW5ndGgnXG4gICAgXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBDeWxpbmRlci5kZWZhdWx0cywgQ3lsaW5kZXIuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkN5bGluZGVyXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBDeWxpbmRlckJ1ZmZlckdlb21ldHJ5IDogQ3lsaW5kZXJHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzVG9wLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1c0JvdHRvbSxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oZWlnaHQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0U2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3BlbkVuZGVkLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU3RhcnQsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFMZW5ndGhcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIEN5bGluZGVyXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnksXG4gIERvZGVjYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2RlY2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhIGRvZGVjYWhlZHJvbiBpcyBhbnkgcG9seWhlZHJvbiB3aXRoIHR3ZWx2ZSBmbGF0IGZhY2VzLiA8YnIvPjxici8+XG4gKiBUaGUgbW9zdCBmYW1pbGlhciBkb2RlY2FoZWRyb24gaXMgdGhlIHJlZ3VsYXIgZG9kZWNhaGVkcm9uLCB3aGljaCBpcyBhIFBsYXRvbmljIHNvbGlkLiA8YnIvPlxuICogVGhlcmUgYXJlIGFsc28gdGhyZWUgcmVndWxhciBzdGFyIGRvZGVjYWhlZHJhLCB3aGljaCBhcmUgY29uc3RydWN0ZWQgYXMgc3RlbGxhdGlvbnMgb2YgdGhlIGNvbnZleCBmb3JtLiA8YnIvPlxuICogQWxsIG9mIHRoZXNlIGhhdmUgaWNvc2FoZWRyYWwgc3ltbWV0cnksIG9yZGVyIDEyMC5cbiAqIERvZGVjYWhlZHJvbiBjcmVhdGVzIERvZGVjYWhlZHJvbiBvYmplY3QgYnkgaXQncyByYWRpdXMgYW5kIGRldGFpbC5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRG9kZWNhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIERvZGVjYWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgRG9kZWNhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTBcbiAqICAgfVxuICAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIERvZGVjYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICogZ2VvbWV0cnk6IHtcbiAgICogICByYWRpdXM6IDEsXG4gICAqICAgZGV0YWlsOiAwXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxLFxuICAgICAgZGV0YWlsOiAwXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRG9kZWNhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIERvZGVjYWhlZHJvbi5kZWZhdWx0cywgRG9kZWNhaGVkcm9uLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Eb2RlY2FoZWRyb25cbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBEb2RlY2FoZWRyb25HZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmRldGFpbFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgRG9kZWNhaGVkcm9uXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgQnVmZmVyR2VvbWV0cnksXG4gIEV4dHJ1ZGVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgRXh0cnVkZVxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gRXh0cnVkZSBnZW9tZXRyeSBtZWFucyB0aGF0IHlvdSBjYW4gY3JlYXRlIGEgM0QgbWVzaCBmcm9tIGFueSAyRCBzaGFwZSB1c2luZyB0aHJlZS5qcyBnZW9tZXRyeSBiYXNlZCBvbiA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9tYXRoL1ZlY3RvcjInPlRIUkVFLlZlY3RvcjIuPC9hPiA8YnIvPlxuICogU3VjaCBpbXBsZW1lbnRhdGlvbiB3aWxsIGhlbHAgeW91IHRvIG1ha2Ugdm9sdW1lZCBzaGFwZXMgdGhhdCBoYXZlIHRoZWlyIG93biBkZXB0aCBhbmQgY2FuIGJlIHNlZW4gZnJvbSBhbGwgYW5nZWxzLjxici8+PGJyLz5cbiAqIFlvdSBjYW4gYWxzbyBmaW5kIHNvbWUgaW50ZXJlc3RpbmcgZXhhbXBsZXMgbWFkZSB1c2luZyA8YSBocmVmPSd0aHJlZWpzLm9yZyc+dGhyZWUuanM8L2E+IHdoaWNoIGlzIGEgY29yZSBvZiB3aHMuanMsIHN1Y2ggYXM6XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy93ZWJnbF9nZW9tZXRyeV9leHRydWRlX3NoYXBlcy5odG1sJz5XZWJnbCBnZW9tZXRyeSBleHRydWRlPC9hPlxuICogLSA8YSBocmVmPSdodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvd2ViZ2xfZ2VvbWV0cnlfZXh0cnVkZV9zaGFwZXMyLmh0bWwnPkV4dHJ1ZGUgc2hhcGVzIGZyb20gZ2VvZGF0YTwvYT5cbiAqIC0gPGEgaHJlZj0naHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL3dlYmdsX2dlb21ldHJ5X2V4dHJ1ZGVfc3BsaW5lcy5odG1sJz5FeHRydWRlIHNwbGluZXM8L2E+XG4gKlxuICogU3VjaCBleGFtcGxlcyBjYW4gYmUgZWFzaWx5IGltcGxlbWVudGVkIHVzaW5nIHdoaXRlc3Rvcm0uanMgb3IgaXQncyBwbHVnaW5zLiBVc2UgYEV4dHJ1ZGVgIGNsYXNzIHdpdGggPGEgaHJlZj0naHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZXh0cmFzL2NvcmUvU2hhcGUnPlRIUkVFLlNoYXBlPC9hPiB0byBnZXQgZXh0cnVkZSBlZmZlY3Qgb2Ygc2hhcGUgZGVmaW5lZCBieSAyRCB2ZWN0b3JzLlxuICogVGhpcyBjbGFzcyBpcyBzaW1pbGFyIHRvIDxhIGhyZWY9J2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2dlb21ldHJpZXMvRXh0cnVkZUdlb21ldHJ5Jz5USFJFRS5FeHRydWRlR2VvbWV0cnk8L2E+LFxuICogYnV0IGl0IGFsc28gY29udGFpbnMgYWxsIHByb3BlcnRpZXMsIGFwcGxpZWQgYnkgYFNoYXBlYCwgc3VjaCBhcyBtYXRlcmlhbCwgbWFzcyBhbmQgdmVjdG9ycyBsaWtlIHBvc2l0aW9uIChwb3MpIGFuZCByb3RhdGlvbiAocm90KS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjRXh0cnVkZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBzaGFwZSwgdGhlbiBhbiBFeHRydWRlIGZyb20gaXQ8L2NhcHRpb24+XG4gKiBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZShbXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoLTIsMCksXG4gKiAgIG5ldyBUSFJFRS5WZWN0b3IyKC00LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigwLDIpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LDQpLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMigyLDApLFxuICogICBuZXcgVEhSRUUuVmVjdG9yMig0LC00KSxcbiAqICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwtMilcbiAqIF0pO1xuICpcbiAqIGNvbnN0IGV4dHJ1ZGUgPSBuZXcgRXh0cnVkZSh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgc2hhcGVzOiBzaGFwZSxcbiAqICAgICBvcHRpb25zOiB7XG4gKiAgICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICogICAgICAgYmV2ZWxTaXplOiAwLFxuICogICAgICAgYW1vdW50OiAyXG4gKiAgICAgfVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KTtcbiAqXG4gKiBleHRydWRlLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEV4dHJ1ZGUgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkV4dHJ1ZGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHNoYXBlczogW10sXG4gICAqICAgICBvcHRpb25zOiB7fVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBzaGFwZXM6IFtdLFxuICAgICAgb3B0aW9uczoge31cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5FeHRydWRlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogWydzaGFwZXMnLCAnb3B0aW9ucyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3NoYXBlcycsICdvcHRpb25zJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgRXh0cnVkZS5kZWZhdWx0cywgRXh0cnVkZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuRXh0cnVkZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEV4dHJ1ZGVHZW9tZXRyeShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5zaGFwZXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkub3B0aW9uc1xuICAgICk7XG5cbiAgICByZXR1cm4gcGFyYW1zLmJ1ZmZlciA/IG5ldyBCdWZmZXJHZW9tZXRyeSgpLmZyb21HZW9tZXRyeShnZW9tZXRyeSkgOiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBFeHRydWRlXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgSWNvc2FoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgSWNvc2FoZWRyb25HZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgSWNvc2FoZWRyb25cbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIEluIGdlb21ldHJ5LCBhbiBpY29zYWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCAyMCBmYWNlcy48YnIvPlxuICogVGhlcmUgYXJlIG1hbnkga2luZHMgb2YgaWNvc2FoZWRyYSwgd2l0aCBzb21lIGJlaW5nIG1vcmUgc3ltbWV0cmljYWwgdGhhbiBvdGhlcnMuIFRoZSBtb3N0IHdlbGwga25vd24gaXMgdGhlIFBsYXRvbmljLCBjb252ZXggcmVndWxhciBpY29zYWhlZHJvbi48YnIvPlxuICogYEljb3NhaGVkcm9uYCBjcmVhdGVzIGFuIEljb3NhaGVkcm9uIG9iamVjdCBieSBpdHMgcmFkaXVzIGFuZCBkZXRhaWwuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI0ljb3NhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIEljb3NhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBJY29zYWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBJY29zYWhlZHJvbiBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuSWNvc2FoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfTwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMSxcbiAgICAgIGRldGFpbDogMFxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IHtnZW9tZXRyeTogWydyYWRpdXMnLCAnZGV0YWlsJ119XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBJY29zYWhlZHJvbi5kZWZhdWx0cywgSWNvc2FoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkljb3NhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IEljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBJY29zYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJY29zYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIExhdGhlQnVmZmVyR2VvbWV0cnksXG4gIExhdGhlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIExhdGhlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBBIGBMYXRoZUdlb21ldHJ5YCBhbGxvd3MgeW91IHRvIGNyZWF0ZSBzaGFwZXMgZnJvbSBhIHNtb290aCBjdXJ2ZS5cbiAqIFRoaXMgY3VydmUgaXMgZGVmaW5lZCBieSBhIG51bWJlciBvZiBwb2ludHMgKGFsc28gY2FsbGVkIGtub3RzKSBhbmQgaXMgbW9zdCBvZnRlbiBjYWxsZWQgYSBzcGxpbmUuIFRoaXMgc3BsaW5lIGlzIHJvdGF0ZWQgYXJvdW5kIGEgZml4ZWQgcG9pbnQgYW5kIHJlc3VsdHMgaW4gdmFzZS0gYW5kIGJlbGwtbGlrZSBzaGFwZXMuPGJyLz48YnIvPlxuICogSW4gM0QgY29tcHV0ZXIgZ3JhcGhpY3MsIGEgbGF0aGVkIG9iamVjdCBpcyBhIDNEIG1vZGVsIHdob3NlIHZlcnRleCBnZW9tZXRyeSBpcyBwcm9kdWNlZCBieSByb3RhdGluZyB0aGUgcG9pbnRzIG9mIGEgc3BsaW5lIG9yIG90aGVyIHBvaW50IHNldCBhcm91bmQgYSBmaXhlZCBheGlzLlxuICogVGhlIGxhdGhpbmcgbWF5IGJlIHBhcnRpYWw7IHRoZSBhbW91bnQgb2Ygcm90YXRpb24gaXMgbm90IG5lY2Vzc2FyaWx5IGEgZnVsbCAzNjAgZGVncmVlcy5cbiAqIFRoZSBwb2ludCBzZXQgcHJvdmlkaW5nIHRoZSBpbml0aWFsIHNvdXJjZSBkYXRhIGNhbiBiZSB0aG91Z2h0IG9mIGFzIGEgY3Jvc3Mgc2VjdGlvbiB0aHJvdWdoIHRoZSBvYmplY3QgYWxvbmcgYSBwbGFuZSBjb250YWluaW5nIGl0cyBheGlzIG9mIHJhZGlhbCBzeW1tZXRyeS4gPGJyLz48YnIvPlxuICogVGhlIDxhIGhyZWY9J2h0dHA6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjTGF0aGVHZW9tZXRyeSc+Zm9sbG93aW5nIGV4YW1wbGU8L2E+IHNob3dzIGEgZ2VvbWV0cnkgd2hpY2ggY2FuIGJlIGdlbmVyYXRlZCB1c2luZyBgTGF0aGVgIGNsYXNzLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNMYXRoZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMYXRoLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIGNvbnN0IHBvaW50cyA9IFtdO1xuICpcbiAqIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICogICBwb2ludHMucHVzaChcbiAqICAgICBuZXcgVEhSRUUuVmVjdG9yMihcbiAqICAgICAgIChNYXRoLnNpbihpICogMC43KSAqIDE1ICsgNTApIC8gMTAsXG4gKiAgICAgICAoaSAtIDUpICogMC4yXG4gKiAgICAgKVxuICogICApO1xuICogfVxuICpcbiAqIGNvbnN0IGxhdGhlID0gbmV3IExhdGhlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBwb2ludHM6IHBvaW50c1xuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA1MCwgMTBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBMYXRoZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGUjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHBvaW50czogW11cbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcG9pbnRzOiBbXVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxhdGhlI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIExhdGhlLmRlZmF1bHRzLCBMYXRoZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGF0aGVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IChwYXJhbXMuYnVmZmVyID8gTGF0aGVCdWZmZXJHZW9tZXRyeSA6IExhdGhlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnBvaW50c1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGF0aGVcbn07XG4iLCJpbXBvcnQge1xuICBMaW5lIGFzIExpbmVOYXRpdmUsXG4gIEJ1ZmZlckdlb21ldHJ5LFxuICBHZW9tZXRyeSxcbiAgQnVmZmVyQXR0cmlidXRlLFxuICBMaW5lQ3VydmUzLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBMaW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBMaW5lIGNvbXBvbmVudCBpcyBnZW5lcmF0ZWQgZnJvbSBhIGN1cnZlL2xpbmUgYW5kIGFtb3VudCBvZiB2ZWN0b3JzIHRoYXQgc2hvdWxkIGJlIHVzZWQgKHBvaW50cykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBMaW5lLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBMaW5lKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBjdXJ2ZTogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFRIUkVFLlZlY3RvcjMoMTAsIDEwLCAwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMTAsIDMwLCAwKSlcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgTGluZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuTGluZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBjdXJ2ZTogbmV3IExpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDEwLCAwLCAwKSksXG4gICAqICAgcG9pbnRzOiA1MFxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG5cbiAgICBjdXJ2ZTogbnVsbCxcbiAgICBwb2ludHM6IDUwXG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5MaW5lI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+e1xuICAgKiAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ2N1cnZlJywgJ3BvaW50cyddXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zLCBMaW5lLmRlZmF1bHRzLCBMaW5lLmluc3RydWN0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkxpbmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTGluZU5hdGl2ZShnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IHBhcmFtcy5idWZmZXIgPyBuZXcgQnVmZmVyR2VvbWV0cnkoKSA6IG5ldyBHZW9tZXRyeSgpO1xuXG4gICAgaWYgKHBhcmFtcy5idWZmZXIpIHtcbiAgICAgIGNvbnN0IHBwID0gcGFyYW1zLmN1cnZlLmdldFBvaW50cyhwYXJhbXMucG9pbnRzKTtcbiAgICAgIGNvbnN0IHZlcnRzID0gbmV3IEZsb2F0MzJBcnJheShwcC5sZW5ndGggKiAzKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHBwLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGkzID0gaSAqIDM7XG5cbiAgICAgICAgdmVydHNbaTNdID0gcHBbaV0ueDtcbiAgICAgICAgdmVydHNbaTMgKyAxXSA9IHBwW2ldLnk7XG4gICAgICAgIHZlcnRzW2kzICsgMl0gPSBwcFtpXS56O1xuICAgICAgfVxuXG4gICAgICBnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IEJ1ZmZlckF0dHJpYnV0ZSh2ZXJ0cywgMykpO1xuICAgIH0gZWxzZSBnZW9tZXRyeS52ZXJ0aWNlcyA9IHBhcmFtcy5jdXJ2ZS5nZXRQb2ludHMocGFyYW1zLnBvaW50cyk7XG5cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgTGluZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIEpTT05Mb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIEltcG9ydGVyXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbXBvcnRlciBpcyBhIGxvYWRlciBmb3IgbWVzaGVzIGFuZCBhbnkgb3RoZXIgZGF0YSB0byB5b3VyIHNjZW5lXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBJbXBvcnRlciwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgSW1wb3J0ZXIoe1xuICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAqXG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWwpIHsgLy8gZGF0YSBmcm9tIGxvYWRlclxuICogICAgIHJldHVybiBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpOyAvLyBzaG91bGQgcmV0dXJuIHlvdXIgLm5hdGl2ZSAobWVzaCBpbiB0aGlzIGNhc2UpXG4gKiAgIH0sXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIEltcG9ydGVyIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLkltcG9ydGVyI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIHVybDogJycsXG4gICAqICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuICAgKlxuICAgKiAgIG9uTG9hZCgpIHt9LFxuICAgKiAgIG9uUHJvZ3Jlc3MoKSB7fSxcbiAgICogICBvbkVycm9yKCkge30sXG4gICAqXG4gICAqICAgdGV4dHVyZVBhdGg6IG51bGwsXG4gICAqICAgdXNlQ3VzdG9tTWF0ZXJpYWw6IGZhbHNlLFxuICAgKlxuICAgKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAqICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAqICAgfVxuICAgKiB9PC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcblxuICAgIHVybDogJycsXG4gICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpLFxuXG4gICAgb25Mb2FkKCkge30sXG4gICAgb25Qcm9ncmVzcygpIHt9LFxuICAgIG9uRXJyb3IoKSB7fSxcblxuICAgIHRleHR1cmVQYXRoOiBudWxsLFxuICAgIHVzZUN1c3RvbU1hdGVyaWFsOiBmYWxzZSxcblxuICAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gICAgfVxuICB9O1xuXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnNcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZCBmaWx0ZXJcbiAgICogQGRlc2NyaXB0aW9uIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtUSFJFRS5NZXNofSBvYmplY3QgSW5zdGFuY2UgZm9yIGl0ZXJhdGluZyB0aHJvdWdoIGl0J3MgY2hpbGRyZW4uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlciBGdW5jdGlvbiB3aXRoIGNoaWxkIGFzIGFyZ3VtZW50LCBzaG91bGQgcmV0dXJuIGEgYm9vbGVhbiB3aGV0aGVyIGluY2x1ZGUgdGhlIGNoaWxkIG9yIG5vdC5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gb2JqZWN0IHdpdGggY2hpbGRyZW5cbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZW1vdmluZyB1bm5lY2Vzc2FyeSBsaWdodHMgZnJvbSBjaGlsZHJlbjwvY2FwdGlvbj5cbiAgICogbmV3IEljb3NhaGVkcm9uKHtcbiAgICogICBsb2FkZXI6IG5ldyBUSFJFRS5PQkpMb2FkZXIoKSxcbiAgICpcbiAgICogICBwYXJzZShncm91cCkgeyAvLyBkYXRhIGZyb20gbG9hZGVyXG4gICAqICAgICByZXR1cm4gSW1wb3J0ZXIuZmlsdGVyKGdyb3VwLCBjaGlsZCA9PiAhY2hpbGQuaXNMaWdodCk7IC8vIHJlbW92ZSBsaWdodHNcbiAgICogICB9LFxuICAgKlxuICAgKiAgIHBvc2l0aW9uOiBbMCwgMTAwLCAwXVxuICAgKiB9KS5hZGRUbyhhcHApO1xuICAgKi9cbiAgc3RhdGljIGZpbHRlcihvYmplY3QsIGZpbHRlcikge1xuICAgIGNvbnN0IHByb2Nlc3NGaWx0ZXIgPSBvYmplY3QgPT4ge1xuICAgICAgb2JqZWN0LmNoaWxkcmVuLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2hpbGRyZW4pIHByb2Nlc3NGaWx0ZXIoZWwpO1xuICAgICAgICBpZiAoIWZpbHRlcihlbCkpIG9iamVjdC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9jZXNzRmlsdGVyKG9iamVjdCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgSW1wb3J0ZXIuZGVmYXVsdHMsIEltcG9ydGVyLmluc3RydWN0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5JbXBvcnRlclxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAocGFyYW1zLnRleHR1cmVQYXRoKSBwYXJhbXMubGFvZGVyLnNldFRleHR1cmVQYXRoKHBhcmFtcy50ZXh0dXJlUGF0aCk7XG5cbiAgICAgIHBhcmFtcy5sb2FkZXIubG9hZChwYXJhbXMudXJsLCAoLi4uZGF0YSkgPT4geyAvLyBnZW9tZXRyeSwgbWF0ZXJpYWxzXG4gICAgICAgIHBhcmFtcy5vbkxvYWQoLi4uZGF0YSk7XG5cbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogcGFyYW1zLnBhcnNlciguLi5kYXRhKX0pLm1lc2g7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5OiBnZW9tLCBtYXRlcmlhbDogbWF0fSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgIGdlb21ldHJ5OiBvYmplY3QuZ2VvbWV0cnksXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy51c2VDdXN0b21NYXRlcmlhbCA/IHBhcmFtcy5tYXRlcmlhbCA6IG9iamVjdC5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob2JqZWN0Lmdlb21ldHJ5KSBvYmplY3QuZ2VvbWV0cnkgPSBnZW9tO1xuICAgICAgICBpZiAob2JqZWN0Lm1hdGVyaWFsKSBvYmplY3QubWF0ZXJpYWwgPSBtYXQ7XG5cbiAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgfSwgcGFyYW1zLm9uUHJvZ3Jlc3MsIHBhcmFtcy5vbkVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBJbXBvcnRlclxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIE9jdGFoZWRyb25CdWZmZXJHZW9tZXRyeSxcbiAgT2N0YWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBPY3RhaGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBnZW9tZXRyeSwgYW4gb2N0YWhlZHJvbiBpcyBhIHBvbHloZWRyb24gd2l0aCBlaWdodCBmYWNlcy5cbiAqIEEgcmVndWxhciBvY3RhaGVkcm9uIGlzIGEgUGxhdG9uaWMgc29saWQgY29tcG9zZWQgb2YgZWlnaHQgZXF1aWxhdGVyYWwgdHJpYW5nbGVzLCBmb3VyIG9mIHdoaWNoIG1lZXQgYXQgZWFjaCB2ZXJ0ZXguXG4gKiA8YnIvPjxici8+XG4gKiBgT2N0YWhlZHJvbmAgY3JlYXRlcyBhbiBPY3RhaGVkcm9uIG9iamVjdCBieSBpdHMgYHJhZGl1c2AgYW5kIGBkZXRhaWxgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNPY3RhaGVkcm9uR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhbiBPY3RhaGVkcm9uLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBPY3RhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjogWzAsIDEwMCwgMF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIE9jdGFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLk9jdGFoZWRyb24jZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMSxcbiAgICogICAgIGRldGFpbDogMFxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgT2N0YWhlZHJvbi5kZWZhdWx0cywgT2N0YWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuT2N0YWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBPY3RhaGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIE9jdGFoZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnksXG4gIFBhcmFtZXRyaWNHZW9tZXRyeSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUGFyYW1ldHJpY1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gYFBhcmFtZXRyaWNgIGdlbmVyYXRlcyBhIGdlb21ldHJ5IHJlcHJlc2VudGluZyBhIDxhIGhyZWY9J2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhcmFtZXRyaWNfc3VyZmFjZSc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogPGJyLz48YnIvPlxuICogSXQgaXMgdXN1YWxseSB1c2VkIHRvIGRldmVsb3AgZGlmZmVyZW50IGtpbmRzIG9mIGhpZ2hmaWVsZHMgb3IgdmlzdWFsaXplIGEgPGEgaHJlZj0naHR0cHM6Ly9zdGVta29za2kuZ2l0aHViLmlvL1RocmVlLmpzL0dyYXBodWx1cy1GdW5jdGlvbi5odG1sJz5tYXRoIGZ1bmN0aW9uPC9hPi5cbiAqIDxici8+XG4gKiAtIDxhIGhyZWY9J2h0dHA6Ly9tYXRoLmh3cy5lZHUvZ3JhcGhpY3Nib29rL3NvdXJjZS90aHJlZWpzL2N1cnZlcy1hbmQtc3VyZmFjZXMuaHRtbCc+UGFyYW1ldHJpYyBzdXJmYWNlPC9hPlxuICogLSA8YSBocmVmPSdodHRwczovL3N0ZW1rb3NraS5naXRodWIuaW8vVGhyZWUuanMvR3JhcGh1bHVzLVN1cmZhY2UuaHRtbCc+XCJHcmFwaHVsdXNcIjwvYT5cbiAqIDxici8+PGJyLz5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUGFyYW1ldHJpY0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+RXhhbXBsZSBjcmVhdGluZyBhbiBoZWlnaHRmaWVsZC1saWtlIGdlb21ldHJ5LiBgdWAgYW5kIGB2YCBhcmUgbGlrZSBgeGAgYW5kIGB5YCBpbiBzaGFwZSwgYnV0IHRoZWlyIHZhbHVlcyBhcmUgYWx3YXlzIGZyb20gYDBgIHRvIGAxYC5cbiAqIFdlIHVzZSB0aGVtIGluIGBUSFJFRS5WZWN0b3IzYCBsaWtlIGB4YCBhbmQgYHpgIGFuZCBgTWF0aC5yYW5kb20oKSAqIDVgIGZvciBgeWAuPC9jYXB0aW9uPlxuICogY29uc3QgY3JlYXRlUGFyYW1ldHJpYyA9ICh1LCB2KSA9PiB7XG4gKiAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyh1ICogMzAsIE1hdGgucmFuZG9tKCkgKiA1LCB2ICogMzApO1xuICogfVxuICpcbiAqIG5ldyBQYXJhbWV0cmljKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBmdW5jOiBjcmVhdGVQYXJhbWV0cmljXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZixcbiAqICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIC0xMDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQYXJhbWV0cmljIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QYXJhbWV0cmljI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICBmdW5jOiAodSwgdikgPT4gbmV3IFZlY3RvcjModSwgdiwgMCksXG4gICAqICAgICBzbGljZXM6IDEwLFxuICAgKiAgICAgdGFja3M6IDEwXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGZ1bmM6ICh1LCB2KSA9PiBuZXcgVmVjdG9yMyh1LCB2LCAwKSxcbiAgICAgIHNsaWNlczogMTAsXG4gICAgICBzdGFja3M6IDEwXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFBhcmFtZXRyaWMuZGVmYXVsdHMsIFBhcmFtZXRyaWMuaW5zdHJ1Y3Rpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGFyYW1ldHJpY1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQYXJhbWV0cmljQnVmZmVyR2VvbWV0cnkgOiBQYXJhbWV0cmljR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmZ1bmMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2xpY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnN0YWNrc1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGFyYW1ldHJpY1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFBsYW5lQnVmZmVyR2VvbWV0cnksXG4gIFBsYW5lR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFBsYW5lXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBgUGxhbmVgIGlzIHVzZWQgZm9yIGNyZWF0aW5nIHBsYW5lcyBnaXZlbiBzb21lIGB3aWR0aGAgYW5kIGBoZWlnaHRgLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNQbGFuZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBQbGFuZSwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUGxhbmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHdpZHRoOiAyMCxcbiAqICAgICBoZWlnaHQ6IDMwXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFBsYW5lIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5QbGFuZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgd2lkdGg6IDEwLFxuICAgKiAgICAgaGVpZ2h0OiAxMCxcbiAgICogICAgIHdTZWdtZW50czogMSxcbiAgICogICAgIGhTZWdtZW50czogMVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB3aWR0aDogMTAsXG4gICAgICBoZWlnaHQ6IDEwLFxuICAgICAgd1NlZ21lbnRzOiAxLFxuICAgICAgaFNlZ21lbnRzOiAxXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUGxhbmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3dpZHRoJywgJ2hlaWdodCcsICd3U2VnbWVudHMnLCAnaFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnd2lkdGgnLCAnaGVpZ2h0JywgJ3dTZWdtZW50cycsICdoU2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBQbGFuZS5kZWZhdWx0cywgUGxhbmUuaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBsYW5lXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgKHBhcmFtcy5idWZmZXIgPyBQbGFuZUJ1ZmZlckdlb21ldHJ5IDogUGxhbmVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkud2lkdGgsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuaGVpZ2h0LFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LndTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5oU2VnbWVudHNcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBsYW5lXG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBQb2x5aGVkcm9uR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbmNvbnN0IFt2ZXJ0aWNlc09mQ3ViZSwgaW5kaWNlc09mRmFjZXNdID0gW1xuICBbXG4gICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxXG4gIF0sXG4gIFtcbiAgICAyLCAxLCAwLCAwLCAzLCAyLFxuICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAgMCwgMSwgNSwgNSwgNCwgMCxcbiAgICAxLCAyLCA2LCA2LCA1LCAxLFxuICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAgNCwgNSwgNiwgNiwgNywgNFxuICBdXG5dO1xuXG4vKipcbiAqIEBjbGFzcyBQb2x5aGVkcm9uXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBJbiBlbGVtZW50YXJ5IGdlb21ldHJ5LCBhIHBvbHloZWRyb24gaXMgYSBzb2xpZCBpbiB0aHJlZSBkaW1lbnNpb25zIHdpdGggZmxhdCBwb2x5Z29uYWwgZmFjZXMsIHN0cmFpZ2h0IGVkZ2VzIGFuZCBzaGFycCBjb3JuZXJzIG9yIHZlcnRpY2VzLlxuICogPGJyLz48YnIvPlxuICogYFBvbHloZWRyb25gIGNyZWF0ZXMgYSBQb2x5aGVkcm9uIGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGAuXG4gKiA8YnIvPjxici8+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYW4gUG9seWhlZHJvbiwgYW5kIGFkZGluZyB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgUG9seWhlZHJvbih7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgcmFkaXVzOiAyLFxuICogICAgIGRldGFpbDogMVxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCAxMDAsIDBdXG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBQb2x5aGVkcm9uIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIHN0YXRpYyB2ZXJ0aWNlc09mQ3ViZSA9IHZlcnRpY2VzT2ZDdWJlO1xuICBzdGF0aWMgaW5kaWNlc09mRmFjZXMgPSBpbmRpY2VzT2ZGYWNlcztcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvbiNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgdmVydGljZXNPZkN1YmU6IFtcbiAgICogICAgICAgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgLTEsIDEsIC0xLFxuICAgKiAgICAgICAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAxLCAxLCAtMSwgMSwgMVxuICAgKiAgICAgXSxcbiAgICpcbiAgICogICAgIGluZGljZXNPZkZhY2VzOiBbXG4gICAqICAgICAgIDIsIDEsIDAsIDAsIDMsIDIsXG4gICAqICAgICAgIDAsIDQsIDcsIDcsIDMsIDAsXG4gICAqICAgICAgIDAsIDEsIDUsIDUsIDQsIDAsXG4gICAqICAgICAgIDEsIDIsIDYsIDYsIDUsIDEsXG4gICAqICAgICAgIDIsIDMsIDcsIDcsIDYsIDIsXG4gICAqICAgICAgIDQsIDUsIDYsIDYsIDcsIDRcbiAgICogICAgIF0sXG4gICAqXG4gICAqICAgICByYWRpdXM6IDYsXG4gICAqICAgICBkZXRhaWw6IDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdmVydGljZXNPZkN1YmUsXG4gICAgICBpbmRpY2VzT2ZGYWNlcyxcbiAgICAgIHJhZGl1czogNixcbiAgICAgIGRldGFpbDogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlBvbHloZWRyb24jaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3ZlcnRpY2VzT2ZDdWJlJywgJ2luZGljZXNPZkZhY2VzJywgJ3JhZGl1cycsICdkZXRhaWwnXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogWyd2ZXJ0aWNlc09mQ3ViZScsICdpbmRpY2VzT2ZGYWNlcycsICdyYWRpdXMnLCAnZGV0YWlsJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUG9seWhlZHJvbi5kZWZhdWx0cywgUG9seWhlZHJvbi5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUG9seWhlZHJvblxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBQb2x5aGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBQb2x5aGVkcm9uR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnZlcnRpY2VzT2ZDdWJlLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmluZGljZXNPZkZhY2VzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5kZXRhaWxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBvbHloZWRyb25cbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBSaW5nR2VvbWV0cnksXG4gIFJpbmdCdWZmZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgUmluZ1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gUmluZyBjbGFzcyBjcmVhdGVzIGEgY2lyY2xlIG9yIGp1c3QgMkQgVG9ydXMuIERvZXMgbm90IHN1cHBvcnQgcGh5c2ljcy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjUmluZ0dlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBSaW5nLCBhbmQgYWRkaW5nIHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBSaW5nKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBpbm5lclJhZGl1czogNSxcbiAqICAgICBvdXRlclJhZGl1czogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICAgc2lkZSBUSFJFRS5Eb3VibGVTaWRlXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IFswLCA4LCAwXSxcbiAqXG4gKiAgIHJvdGF0aW9uOiB7XG4gKiAgICAgeDogTWF0aC5QSS80XG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFJpbmcgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlJpbmcjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIGlubmVyUmFkaXVzOiAwLFxuICAgKiAgICAgb3V0ZXJSYWRpdXM6IDUwLFxuICAgKiAgICAgdGhldGFTZWdtZW50czogOCxcbiAgICogICAgIHBoaVNlZ21lbnRzOiA4LFxuICAgKiAgICAgdGhldGFTdGFydDogMCxcbiAgICogICAgIHRoZXRhTGVuZ3RoOiBNYXRoLlBJICogMlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBpbm5lclJhZGl1czogMCxcbiAgICAgIG91dGVyUmFkaXVzOiA1MCxcbiAgICAgIHRoZXRhU2VnbWVudHM6IDgsXG4gICAgICBwaGlTZWdtZW50czogOCxcbiAgICAgIHRoZXRhU3RhcnQ6IDAsXG4gICAgICB0aGV0YUxlbmd0aDogTWF0aC5QSSAqIDJcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5SaW5nI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICogICAgICdvdXRlclJhZGl1cycsXG4gICAqICAgICAndGhldGFTZWdtZW50cycsXG4gICAqICAgICAncGhpU2VnbWVudHMnLFxuICAgKiAgICAgJ3RoZXRhU3RhcnQnLFxuICAgKiAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ2lubmVyUmFkaXVzJyxcbiAgICAgICdvdXRlclJhZGl1cycsXG4gICAgICAndGhldGFTZWdtZW50cycsXG4gICAgICAncGhpU2VnbWVudHMnLFxuICAgICAgJ3RoZXRhU3RhcnQnLFxuICAgICAgJ3RoZXRhTGVuZ3RoJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgUmluZy5kZWZhdWx0cywgUmluZy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuUmluZ1xuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBSaW5nQnVmZmVyR2VvbWV0cnkgOiBSaW5nR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmlubmVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5Lm91dGVyUmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnRoZXRhU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucGhpU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudGhldGFTdGFydCxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS50aGV0YUxlbmd0aFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUmluZ1xufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNoYXBlQnVmZmVyR2VvbWV0cnksXG4gIFNoYXBlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFNoYXBlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTaGFwZSBpcyBhIHVuaXZlcnNhbCBjbGFzcy4gSXQgYWxsb3dzIHlvdSB0byBjcmVhdGUgZGlmZmVyZW50IDJEIHNoYXBlcyBpbiAzRCBzY2VuZS48YnIvPlxuICogVW5mb3J0dW5hdGVseSwgbm90IGFsbCBvZiB0aGVtIHN1cHBvcnQgcGh5c2ljcywgYW4gYWx0ZXJuYXRpdmUgaXMgdG8gbWFrZSBhIHNpbWlsYXIgM0Qgb2JqZWN0IGFuZCBzY2FsZSBpdHMgd2lkdGggZG93biB0byBuZWFyIHplcm8uXG4gKiA8YnIvPjxici8+XG4gKiBgU2hhcGVgIGNvbnNpc3RzIG9mIHNoYXBlcyB0aGF0IGFyZSBpbiBpdHMgc2hhcGVzIHBhcmFtZXRlci5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU2hhcGVHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgcGxhbmUgbG9va2luZyBTaGFwZSBmcm9tIGEgVEhSRUUuU2hhcGUsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogY29uc3QgcmVjdFdpZHRoID0gMTAsXG4gKiByZWN0TGVuZ3RoID0gNTtcbiAqXG4gKiBjb25zdCByZWN0U2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAqIHJlY3RTaGFwZS5tb3ZlVG8oMCwwKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8oMCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgcmVjdFdpZHRoKTtcbiAqIHJlY3RTaGFwZS5saW5lVG8ocmVjdExlbmd0aCwgMCk7XG4gKiByZWN0U2hhcGUubGluZVRvKDAsIDApO1xuICpcbiAqIGNvbnN0IHBsYW5lID0gbmV3IFNoYXBlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICBzaGFwZTogcmVjdFNoYXBlXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSlcbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNoYXBlIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHZhbHVlcyBmb3IgcGFyYW1ldGVyc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgc2hhcGVzOiBbXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHNoYXBlczogW11cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsnc2hhcGVzJ11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgU2hhcGUuZGVmYXVsdHMsIFNoYXBlLmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TaGFwZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgKHBhcmFtcy5idWZmZXIgPyBTaGFwZUJ1ZmZlckdlb21ldHJ5IDogU2hhcGVHZW9tZXRyeSkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuc2hhcGVzXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTaGFwZVxufTtcbiIsImltcG9ydCB7XG4gIE1lc2gsXG4gIFNwaGVyZUJ1ZmZlckdlb21ldHJ5LFxuICBTcGhlcmVHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgU3BoZXJlXG4gKiBAY2F0ZWdvcnkgY29tcG9uZW50cy9tZXNoZXNcbiAqIEBkZXNjcmlwdGlvbiBTcGhlcmUgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgc3BoZXJlIG9iamVjdHMgYnkgaXRzIHJhZGl1cyBwcm9wZXJ0eSBhbmQgb3RoZXIgdmFsdWVzIHRoYXQgZGV0ZXJtaW5lcyBpdHMgZGV0YWxpdHkuXG4gKiA8YnIvPjxici8+XG4gKiBJdCBpcyBzaW1pbGFyIHRvIFRIUkVFLlNwaGVyZUdlb21ldHJ5LCBidXQgaXQgYWxzbyBjb250YWlucyBhbGwgYFNoYXBlYCBwcm9wZXJ0aWVzLCBzdWNoIGFzIG1hdGVyaWFsLCBtYXNzIGFuZCB2ZWN0b3JzIGxpa2UgcG9zaXRpb24gKHBvcykgYW5kIHJvdGF0aW9uIChyb3QpLlxuICogPGJyLz48YnIvPlxuICogVGhlbiBpdCBjcmVhdGVzIGFuIGBUaHJlZS5qcyBtZXNoYCBvciBhIGBQaHlzaWpzIG1lc2hgLCB0aGF0IGlzIHNpbWlsYXIgdG8gYFRocmVlLmpzIG1lc2hgLCBidXQgaXQgYWxzbyB0YWtlIGludG8gY29uc2lkZXJhdGlvbiBjb2xsaXNpb24gY2FsY3VsYXRpb25zLlxuICogVGhpcyBtZXNoIGlzIGEgY29tYmluYXRpb24gb2YgYFRocmVlLmpzIGdlb21ldHJ5YCBhbmQgYFBoeXNpanMgbWF0ZXJpYWxgIChUaGUgc2FtZSBhcyBpbiB0aHJlZS5qcywgYnV0IHdpdGggZnJpY3Rpb24gYW5kIHJlc3RpdHV0aW9uKS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjU3BoZXJlR2VvbWV0cnlcIj48L2lmcmFtZT5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFNwaGVyZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBuZXcgU3BoZXJlKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvc2l0aW9uOiB7XG4gKiAgICAgeTogMTAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFNwaGVyZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuU3BoZXJlI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgKiAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICB3aWR0aFNlZ21lbnRzOiA4LFxuICAgICAgaGVpZ2h0U2VnbWVudHM6IDZcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmUjaW5zdHJ1Y3Rpb25zXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICd3aWR0aFNlZ21lbnRzJywgJ2hlaWdodFNlZ21lbnRzJ11cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ3dpZHRoU2VnbWVudHMnLCAnaGVpZ2h0U2VnbWVudHMnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBTcGhlcmUuZGVmYXVsdHMsIFNwaGVyZS5pbnN0cnVjdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5TcGhlcmVcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyAocGFyYW1zLmJ1ZmZlciA/IFNwaGVyZUJ1ZmZlckdlb21ldHJ5IDogU3BoZXJlR2VvbWV0cnkpKFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS53aWR0aFNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmhlaWdodFNlZ21lbnRzXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBTcGhlcmVcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUZXRyYWhlZHJvbkJ1ZmZlckdlb21ldHJ5LFxuICBUZXRyYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUZXRyYWhlZHJvblxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gSW4gZ2VvbWV0cnksIGEgdGV0cmFoZWRyb24gaXMgYSBwb2x5aGVkcm9uIGNvbXBvc2VkIG9mIGZvdXIgdHJpYW5ndWxhciBmYWNlcywgc2l4IHN0cmFpZ2h0IGVkZ2VzLCBhbmQgZm91ciB2ZXJ0ZXggY29ybmVycy5cbiAqIFRoZSB0ZXRyYWhlZHJvbiBpcyB0aGUgc2ltcGxlc3Qgb2YgYWxsIHRoZSBvcmRpbmFyeSBjb252ZXggcG9seWhlZHJhIGFuZCB0aGUgb25seSBvbmUgdGhhdCBoYXMgZmV3ZXIgdGhhbiA1IGZhY2VzLlxuICogPGJyLz48YnIvPlxuICogYFRldHJhaGVkcm9uYCBjcmVhdGVzIGEgVGV0cmFoZWRyb24gb2JqZWN0IGJ5IGl0cyBgcmFkaXVzYCBhbmQgYGRldGFpbGBcbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL3NjZW5lcy9nZW9tZXRyeS1icm93c2VyLmh0bWwjVGV0cmFoZWRyb25HZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVGV0cmFoZWRyb24sIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRldHJhaGVkcm9uKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDIsXG4gKiAgICAgZGV0YWlsOiAxXG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IDAsXG4gKiAgICAgeTogMTAwLFxuICogICAgIHo6IDBcbiAqICAgfVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVGV0cmFoZWRyb24gZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uI2RlZmF1bHRzXG4gICAqIEBzdGF0aWNcbiAgICogQGRlZmF1bHQgPHByZT5cbiAgICoge1xuICAgKiAgIGdlb21ldHJ5OiB7XG4gICAqICAgICByYWRpdXM6IDEsXG4gICAqICAgICBkZXRhaWw6IDBcbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICByYWRpdXM6IDEsXG4gICAgICBkZXRhaWw6IDBcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uc1xuICAgKiBAbWVtYmVyIHtPYmplY3R9IG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXRyYWhlZHJvbiNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFsncmFkaXVzJywgJ2RldGFpbCddXG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgaW5zdHJ1Y3Rpb25zID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuaW5zdHJ1Y3Rpb25zLFxuICAgIGdlb21ldHJ5OiBbJ3JhZGl1cycsICdkZXRhaWwnXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXRyYWhlZHJvbi5kZWZhdWx0cywgVGV0cmFoZWRyb24uaW5zdHJ1Y3Rpb25zKTtcblxuICAgIGlmIChwYXJhbXMuYnVpbGQpIHtcbiAgICAgIHRoaXMuYnVpbGQocGFyYW1zKTtcbiAgICAgIHN1cGVyLndyYXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBidWlsZFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgbGl2ZWN5Y2xlIGNyZWF0ZXMgYSBtZXNoIHVzaW5nIGlucHV0IHBhcmFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBDb21wb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHJldHVybiB7VEhSRUUuTWVzaH0gQnVpbHQgbWVzaFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRldHJhaGVkcm9uXG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB0aGlzLnBhcmFtcykge1xuICAgIGNvbnN0IHtnZW9tZXRyeSwgbWF0ZXJpYWx9ID0gdGhpcy5hcHBseUJyaWRnZSh7XG4gICAgICBnZW9tZXRyeTogdGhpcy5idWlsZEdlb21ldHJ5KHBhcmFtcyksXG4gICAgICBtYXRlcmlhbDogcGFyYW1zLm1hdGVyaWFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBseUJyaWRnZSh7bWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKX0pLm1lc2g7XG4gIH1cblxuICBidWlsZEdlb21ldHJ5KHBhcmFtcyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyAocGFyYW1zLmJ1ZmZlciA/IFRldHJhaGVkcm9uQnVmZmVyR2VvbWV0cnkgOiBUZXRyYWhlZHJvbkdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkuZGV0YWlsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUZXRyYWhlZHJvblxufTtcbiIsImltcG9ydCB7XG4gIEZvbnQsXG4gIE1lc2gsXG4gIFRleHRHZW9tZXRyeSxcbiAgRm9udExvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TWVzaENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9NZXNoQ29tcG9uZW50JztcblxuLyoqXG4gKiBAY2xhc3MgVGV4dFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVGV4dCBjbGFzcyBpcyBtYWRlIGZvciBjcmVhdGluZyAzRCB0ZXh0IG9iamVjdHMuXG4gKiBAY2xhc3NEZXNjXG4gKiA8aWZyYW1lIHNyYz1cImh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9zY2VuZXMvZ2VvbWV0cnktYnJvd3Nlci5odG1sI1RleHRHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogPGJyLz48YnIvPlxuICogUGh5c2ljcyB0ZXh0IG9iamVjdCBjYW4gYmUgY29udmV4IG9yIGNvbmNhdmUuIEJ5IGRlZmF1bHQgaXQncyBjb252ZXggYnV0IHlvdSBjYW4gYWxzbyBzd2l0Y2ggdG8gY29uY2F2ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIFRoZSBwYXJhbXMuXG4gKiBAZXh0ZW5kcyBtb2R1bGU6Y29yZS5NZXNoQ29tcG9uZW50XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DcmVhdGluZyBhIFRleHQsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRleHQoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHRleHQ6ICdoZWxsbyB3b3JsZCcsXG4gKiAgICAgcGFyYW1ldGVyczoge1xuICogICAgICAgZm9udDogJ3BhdGgvdG8vZm9udC50eXBlZmFjZS5qcycsXG4gKiAgICAgICBzaXplOiAyMCxcbiAqICAgICAgIGhlaWdodDogNSxcbiAqICAgICAgIGN1cnZlU2VnbWVudHM6IDZcbiAqICAgICB9XG4gKiAgIH0sXG4gKlxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKlxuICogICBwb3NpdGlvbjoge1xuICogICAgIHg6IC00MCxcbiAqICAgICB5OiAyMCxcbiAqICAgICB6OiAwXG4gKiAgIH1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRleHQjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgdGV4dDogJ0hlbGxvIFdvcmxkIScsXG4gICAqICAgbG9hZGVyOiBuZXcgRm9udExvYWRlcigpLFxuICAgKlxuICAgKiAgIHBhcmFtZXRlcnM6IHtcbiAgICogICAgIHNpemU6IDEyLFxuICAgKiAgICAgaGVpZ2h0OiA1MCxcbiAgICogICAgIGN1cnZlU2VnbWVudHM6IDEyLFxuICAgKiAgICAgZm9udDogbmV3IEZvbnQoKSxcbiAgICogICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gICAqICAgICBiZXZlbFRoaWNrbmVzczogMTAsXG4gICAqICAgICBiZXZlbFNpemU6IDhcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICB0ZXh0OiAnSGVsbG8gV29ybGQhJyxcbiAgICBsb2FkZXI6IG5ldyBGb250TG9hZGVyKCksXG5cbiAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICBzaXplOiAxMixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjdXJ2ZVNlZ21lbnRzOiAxMixcbiAgICAgIGZvbnQ6IG5ldyBGb250KCksXG4gICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgYmV2ZWxUaGlja25lc3M6IDEwLFxuICAgICAgYmV2ZWxTaXplOiA4XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zLCBUZXh0LmRlZmF1bHRzLCBNZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5UZXh0XG4gICAqL1xuICBidWlsZChwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHBhcmFtcy5sb2FkZXIubG9hZChwYXJhbXMucGFyYW1ldGVycy5mb250LCBmb250ID0+IHtcbiAgICAgICAgcGFyYW1zLnBhcmFtZXRlcnMuZm9udCA9IGZvbnQ7XG5cbiAgICAgICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgICAgICBnZW9tZXRyeTogbmV3IFRleHRHZW9tZXRyeShcbiAgICAgICAgICAgIHBhcmFtcy50ZXh0LFxuICAgICAgICAgICAgcGFyYW1zLnBhcmFtZXRlcnNcbiAgICAgICAgICApLFxuXG4gICAgICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlKFxuICAgICAgICAgIHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgICAgICAgbWVzaDogbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgICAgICAgIH0pLm1lc2hcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc3VwZXIud2FpdChwcm9taXNlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFRleHRcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0dlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtNZXNoQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL01lc2hDb21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBUb3J1c1xuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXMgY2xhc3MgbWFrZXMgYSB0b3J1cyBmaWd1cmUuIEEgZG9udXQgaXMgYSB0b3J1cy5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVG9ydXNHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXMsIGFuZCBhZGRpbmcgaXQgdG8gYXBwPC9jYXB0aW9uPlxuICogbmV3IFRvcnVzKHtcbiAqICAgZ2VvbWV0cnk6IHtcbiAqICAgICByYWRpdXM6IDUsXG4gKiAgICAgdHViZTogMlxuICogICB9LFxuICpcbiAqICAgbWF0ZXJpYWw6IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gKiAgICAgY29sb3I6IDB4ZmZmZmZmXG4gKiAgIH0pLFxuICpcbiAqICAgcG9zaXRpb246IHtcbiAqICAgICB5OiAzNVxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1cyBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXMjZGVmYXVsdHNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IHtcbiAgICogICAgIHJhZGl1czogMTAwLFxuICAgKiAgICAgdHViZTogNDAsXG4gICAqICAgICByYWRpYWxTZWdtZW50czogOCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogNixcbiAgICogICAgIGFyYzogTWF0aC5QSSAqIDJcbiAgICogICB9XG4gICAqIH1cbiAgICogPC9wcmU+XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5kZWZhdWx0cyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgcmFkaXVzOiAxMDAsXG4gICAgICB0dWJlOiA0MCxcbiAgICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgICAgdHVidWxhclNlZ21lbnRzOiA2LFxuICAgICAgYXJjOiBNYXRoLlBJICogMlxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVzI2luc3RydWN0aW9uc1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeTogW1xuICAgKiAgICAgJ3JhZGl1cycsXG4gICAqICAgICAndHViZScsXG4gICAqICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgKiAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAqICAgICAnYXJjJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3R1YmUnLFxuICAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgICAgJ2FyYydcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVzLmRlZmF1bHRzLCBUb3J1cy5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVG9ydXNcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFRvcnVzR2VvbWV0cnkoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LmFyY1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNcbn07XG4iLCJpbXBvcnQge1xuICBNZXNoLFxuICBUb3J1c0tub3RCdWZmZXJHZW9tZXRyeSxcbiAgVG9ydXNLbm90R2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFRvcnVza25vdFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gVG9ydXNrbm90IGNsYXNzIG1ha2VzIGEgdG9ydXNrbm90IGZpZ3VyZS4gSXQncyBsaWtlIGEgY3Jvb2tlZCBkb251dCwgdmVyeSBjcm9va2VkLlxuICogQGNsYXNzRGVzY1xuICogPGlmcmFtZSBzcmM9XCJodHRwczovL3RocmVlanMub3JnL2RvY3Mvc2NlbmVzL2dlb21ldHJ5LWJyb3dzZXIuaHRtbCNUb3J1c0tub3RHZW9tZXRyeVwiPjwvaWZyYW1lPlxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIC0gVGhlIHBhcmFtcy5cbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGEgVG9ydXNrbm90LCBhbmQgYWRkaW5nIGl0IHRvIGFwcDwvY2FwdGlvbj5cbiAqIG5ldyBUb3J1c2tub3Qoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHJhZGl1czo1LFxuICogICAgIHR1YmU6IDJcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KSxcbiAqXG4gKiAgIHBvczoge1xuICogICAgIHk6IDEwMFxuICogICB9XG4gKiB9KS5hZGRUbyhhcHApO1xuICovXG5jbGFzcyBUb3J1c2tub3QgZXh0ZW5kcyBNZXNoQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcmFkaXVzOiAxMDAsXG4gICAqICAgICB0dWJlOiA0MCxcbiAgICogICAgIHJhZGlhbFNlZ21lbnRzOiA2NCxcbiAgICogICAgIHR1YnVsYXJTZWdtZW50czogOCxcbiAgICogICAgIHA6IDIsXG4gICAqICAgICBxOiAzXG4gICAqICAgfVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIC4uLk1lc2hDb21wb25lbnQuZGVmYXVsdHMsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHJhZGl1czogMTAwLFxuICAgICAgdHViZTogNDAsXG4gICAgICByYWRpYWxTZWdtZW50czogNjQsXG4gICAgICB0dWJ1bGFyU2VnbWVudHM6IDgsXG4gICAgICBwOiAyLFxuICAgICAgcTogM1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb25zXG4gICAqIEBtZW1iZXIge09iamVjdH0gbW9kdWxlOmNvbXBvbmVudHMvbWVzaGVzLlRvcnVza25vdCNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdyYWRpdXMnLFxuICAgKiAgICAgJ3R1YmUnLFxuICAgKiAgICAgJ3JhZGlhbFNlZ21lbnRzJyxcbiAgICogICAgICd0dWJ1bGFyU2VnbWVudHMnLFxuICAgKiAgICAgJ3AnLFxuICAgKiAgICAgJ3EnXG4gICAqICAgXVxuICAgKiB9XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgc3RhdGljIGluc3RydWN0aW9ucyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50Lmluc3RydWN0aW9ucyxcbiAgICBnZW9tZXRyeTogW1xuICAgICAgJ3JhZGl1cycsXG4gICAgICAndHViZScsXG4gICAgICAncmFkaWFsU2VnbWVudHMnLFxuICAgICAgJ3R1YnVsYXJTZWdtZW50cycsXG4gICAgICAncCcsXG4gICAgICAncSdcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMsIFRvcnVza25vdC5kZWZhdWx0cywgVG9ydXNrbm90Lmluc3RydWN0aW9ucyk7XG5cbiAgICBpZiAocGFyYW1zLmJ1aWxkKSB7XG4gICAgICB0aGlzLmJ1aWxkKHBhcmFtcyk7XG4gICAgICBzdXBlci53cmFwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVpbGRcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGxpdmVjeWNsZSBjcmVhdGVzIGEgbWVzaCB1c2luZyBpbnB1dCBwYXJhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQ29tcG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEByZXR1cm4ge1RIUkVFLk1lc2h9IEJ1aWx0IG1lc2hcbiAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlcy5Ub3J1c2tub3RcbiAgICovXG4gIGJ1aWxkKHBhcmFtcyA9IHRoaXMucGFyYW1zKSB7XG4gICAgY29uc3Qge2dlb21ldHJ5LCBtYXRlcmlhbH0gPSB0aGlzLmFwcGx5QnJpZGdlKHtcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmJ1aWxkR2VvbWV0cnkocGFyYW1zKSxcbiAgICAgIG1hdGVyaWFsOiBwYXJhbXMubWF0ZXJpYWxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmFwcGx5QnJpZGdlKHttZXNoOiBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpfSkubWVzaDtcbiAgfVxuXG4gIGJ1aWxkR2VvbWV0cnkocGFyYW1zID0ge30pIHtcbiAgICBjb25zdCBHQ29uc3RydWN0ID0gcGFyYW1zLmJ1ZmZlciA/IFRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5IDogVG9ydXNLbm90R2VvbWV0cnk7XG5cbiAgICByZXR1cm4gbmV3IEdDb25zdHJ1Y3QoXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaXVzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnR1YmUsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucmFkaWFsU2VnbWVudHMsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkudHVidWxhclNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnAsXG4gICAgICBwYXJhbXMuZ2VvbWV0cnkucVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVG9ydXNrbm90XG59O1xuIiwiaW1wb3J0IHtcbiAgTWVzaCxcbiAgTGluZUN1cnZlMyxcbiAgVmVjdG9yMyxcbiAgVHViZUJ1ZmZlckdlb21ldHJ5LFxuICBUdWJlR2VvbWV0cnlcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5cbi8qKlxuICogQGNsYXNzIFR1YmVcbiAqIEBjYXRlZ29yeSBjb21wb25lbnRzL21lc2hlc1xuICogQGRlc2NyaXB0aW9uIFR1YmUgY2xhc3MgbWFrZXMgYSB0dWJlIHRoYXQgZXh0cnVkZXMgYWxvbmcgYSAzZCBjdXJ2ZS5cbiAqIEBjbGFzc0Rlc2NcbiAqIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzL2luZGV4Lmh0bWwjYXBpL2dlb21ldHJpZXMvVHViZUdlb21ldHJ5XCI+PC9pZnJhbWU+XG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gLSBUaGUgcGFyYW1zLlxuICogQGV4dGVuZHMgbW9kdWxlOmNvcmUuTWVzaENvbXBvbmVudFxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21wb25lbnRzL21lc2hlc1xuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRpbmcgYSBUdWJlIGZyb20gYSB0aHJlZS5qcyBDdXJ2ZSwgYW5kIGFkZGluZyBpdCB0byBhcHA8L2NhcHRpb24+XG4gKiBjb25zdCBDdXN0b21TaW5DdXJ2ZSA9IFRIUkVFLkN1cnZlLmNyZWF0ZShcbiAqICAgZnVuY3Rpb24gKHNjYWxlKSB7IC8vIGN1c3RvbSBjdXJ2ZSBjb25zdHJ1Y3RvclxuICogICAgIHRoaXMuc2NhbGUgPSAoc2NhbGUgPT09IHVuZGVmaW5lZCkgPyAxIDogc2NhbGU7XG4gKiAgIH0sXG4gKlxuICogICBmdW5jdGlvbiAodCkgeyAvLyBnZXRQb2ludDogdCBpcyBiZXR3ZWVuIDAtMVxuICogICAgIGNvbnN0IHR4ID0gdCAqIDMgLSAxLjUsXG4gKiAgICAgdHkgPSBNYXRoLnNpbiggMiAqIE1hdGguUEkgKiB0ICksXG4gKiAgICAgdHogPSAwO1xuICpcbiAqICAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjModHgsIHR5LCB0eikubXVsdGlwbHlTY2FsYXIodGhpcy5zY2FsZSk7XG4gKiAgIH1cbiAqICk7XG4gKlxuICogY29uc3QgcGF0aCA9IG5ldyBDdXN0b21TaW5DdXJ2ZSgxMCk7XG4gKlxuICogbmV3IFR1YmUoe1xuICogICBnZW9tZXRyeToge1xuICogICAgIHBhdGg6IHBhdGhcbiAqICAgfSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICogICAgIGNvbG9yOiAweGZmZmZmZlxuICogICB9KVxuICogfSkuYWRkVG8oYXBwKTtcbiAqL1xuY2xhc3MgVHViZSBleHRlbmRzIE1lc2hDb21wb25lbnQge1xuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNkZWZhdWx0c1xuICAgKiBAc3RhdGljXG4gICAqIEBkZWZhdWx0IDxwcmU+XG4gICAqIHtcbiAgICogICBnZW9tZXRyeToge1xuICAgKiAgICAgcGF0aDogbmV3IFRIUkVFLkxpbmVDdXJ2ZTMobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSxcbiAgICogICAgIHNlZ21lbnRzOiAyMCxcbiAgICogICAgIHJhZGl1czogMixcbiAgICogICAgIHJhZGl1c1NlZ21lbnRzOiA4LFxuICAgKiAgICAgY2xvc2VkOiBmYWxzZVxuICAgKiAgIH1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICAuLi5NZXNoQ29tcG9uZW50LmRlZmF1bHRzLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICBwYXRoOiBuZXcgTGluZUN1cnZlMyhuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMSkpLFxuICAgICAgc2VnbWVudHM6IDIwLFxuICAgICAgcmFkaXVzOiAyLFxuICAgICAgcmFkaXVzU2VnbWVudHM6IDgsXG4gICAgICBjbG9zZWQ6IGZhbHNlXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbnNcbiAgICogQG1lbWJlciB7T2JqZWN0fSBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZSNpbnN0cnVjdGlvbnNcbiAgICogQHN0YXRpY1xuICAgKiBAZGVmYXVsdCA8cHJlPlxuICAgKiB7XG4gICAqICAgZ2VvbWV0cnk6IFtcbiAgICogICAgICdwYXRoJyxcbiAgICogICAgICdzZWdtZW50cycsXG4gICAqICAgICAncmFkaXVzJyxcbiAgICogICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAqICAgICAnY2xvc2VkJ1xuICAgKiAgIF1cbiAgICogfVxuICAgKiA8L3ByZT5cbiAgICovXG4gIHN0YXRpYyBpbnN0cnVjdGlvbnMgPSB7XG4gICAgLi4uTWVzaENvbXBvbmVudC5pbnN0cnVjdGlvbnMsXG4gICAgZ2VvbWV0cnk6IFtcbiAgICAgICdwYXRoJyxcbiAgICAgICdzZWdtZW50cycsXG4gICAgICAncmFkaXVzJyxcbiAgICAgICdyYWRpdXNTZWdtZW50cycsXG4gICAgICAnY2xvc2VkJ1xuICAgIF1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcywgVHViZS5kZWZhdWx0cywgVHViZS5pbnN0cnVjdGlvbnMpO1xuXG4gICAgaWYgKHBhcmFtcy5idWlsZCkge1xuICAgICAgdGhpcy5idWlsZChwYXJhbXMpO1xuICAgICAgc3VwZXIud3JhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGJ1aWxkXG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBsaXZlY3ljbGUgY3JlYXRlcyBhIG1lc2ggdXNpbmcgaW5wdXQgcGFyYW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIENvbXBvbmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtUSFJFRS5NZXNofSBCdWlsdCBtZXNoXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXMuVHViZVxuICAgKi9cbiAgYnVpbGQocGFyYW1zID0gdGhpcy5wYXJhbXMpIHtcbiAgICBjb25zdCB7Z2VvbWV0cnksIG1hdGVyaWFsfSA9IHRoaXMuYXBwbHlCcmlkZ2Uoe1xuICAgICAgZ2VvbWV0cnk6IHRoaXMuYnVpbGRHZW9tZXRyeShwYXJhbXMpLFxuICAgICAgbWF0ZXJpYWw6IHBhcmFtcy5tYXRlcmlhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlCcmlkZ2Uoe21lc2g6IG5ldyBNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCl9KS5tZXNoO1xuICB9XG5cbiAgYnVpbGRHZW9tZXRyeShwYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IChwYXJhbXMuYnVmZmVyID8gVHViZUJ1ZmZlckdlb21ldHJ5IDogVHViZUdlb21ldHJ5KShcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5wYXRoLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnNlZ21lbnRzLFxuICAgICAgcGFyYW1zLmdlb21ldHJ5LnJhZGl1cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5yYWRpdXNTZWdtZW50cyxcbiAgICAgIHBhcmFtcy5nZW9tZXRyeS5jbG9zZWRcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIFR1YmVcbn07XG4iLCJpbXBvcnQge09iamVjdDNEfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge01lc2hDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvTWVzaENvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9Db21wb25lbnQnO1xuXG4vKipcbiAqIEBjbGFzcyBHcm91cFxuICogQGNhdGVnb3J5IGNvbXBvbmVudHMvbWVzaGVzXG4gKiBAZGVzY3JpcHRpb24gU29tZXRpbWVzIHlvdSBuZWVkIHRvIG1ha2UgZ3JvdXBzIG9mIG9iamVjdHMgKGl0J3Mgbm90IGNvbnZlbmllbnRseSB0byBhcHBseSB0cmFuc2Zvcm1zIHRvIGVhY2ggb2JqZWN0IHdoZW4gY2FuIG1ha2UganVzdCBvbmUgdG8gYSBncm91cCkuPGJyLz5cbiAqIEluIFRocmVlLmpzIHlvdSBtYWtlIGl0IHVzaW5nIGBUSFJFRS5PYmplY3QzRGAgYW5kIGl0J3MgY2hpbGRyZW4uIDxici8+PGJyLz5cbiAqIEluIHdocy5qcyB3ZSBoYXZlIGBHcm91cGBcbiAqIEBleHRlbmRzIG1vZHVsZTpjb3JlLk1lc2hDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tcG9uZW50cy9tZXNoZXNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBBZGRpbmcgb2JqZWN0cyB0byBhbiBlbXB0eSBncm91cDwvY2FwdGlvbj5cbiAqIGNvbnN0IHNwaGVyZSA9IG5ldyBTcGhlcmUoKTtcbiAqIGNvbnN0IGJveCA9IG5ldyBCb3goKTtcbiAqIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gKlxuICogc3BoZXJlLmFkZFRvKGdyb3VwKTtcbiAqIGJveC5hZGRUbyhncm91cCk7XG4qIEBleGFtcGxlIDxjYXB0aW9uPkFwcHJvYWNoIDIgLSBNYWtpbmcgYSBncm91cCBmcm9tIG9iamVjdHM8L2NhcHRpb24+XG4gKiBjb25zdCBzcGhlcmUgPSBuZXcgU3BoZXJlKCk7XG4gKiBjb25zdCBib3ggPSBuZXcgQm94KCk7XG4gKiBjb25zdCBncm91cCA9IG5ldyBHcm91cChib3gsIHNwaGVyZSk7XG4gKiAvLyBPUjogY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoW2JveCwgc3BoZXJlXSk7XG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgTWVzaENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKC4uLm9iamVjdHMpIHtcbiAgICBzdXBlcih7fSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG9iaiA9IG9iamVjdHNbaV07XG5cbiAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBDb21wb25lbnQpIG9iai5hZGRUbyh0aGlzKTtcbiAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdDNEKSB0aGlzLm5hdGl2ZS5hZGQob2JqKTtcbiAgICB9XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdDNEKCk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgR3JvdXBcbn07XG4iLCIvKiogQG1vZHVsZSBjb21wb25lbnRzL21lc2hlcyAqL1xuZXhwb3J0ICogZnJvbSAnLi9Cb3gnO1xuZXhwb3J0ICogZnJvbSAnLi9DaXJjbGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db25lJztcbmV4cG9ydCAqIGZyb20gJy4vQ3lsaW5kZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Eb2RlY2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9FeHRydWRlJztcbmV4cG9ydCAqIGZyb20gJy4vSWNvc2FoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9MYXRoZSc7XG5leHBvcnQgKiBmcm9tICcuL0xpbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9JbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL09jdGFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9QYXJhbWV0cmljJztcbmV4cG9ydCAqIGZyb20gJy4vUGxhbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb2x5aGVkcm9uJztcbmV4cG9ydCAqIGZyb20gJy4vUmluZyc7XG5leHBvcnQgKiBmcm9tICcuL1NoYXBlJztcbmV4cG9ydCAqIGZyb20gJy4vU3BoZXJlJztcbmV4cG9ydCAqIGZyb20gJy4vVGV0cmFoZWRyb24nO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0JztcbmV4cG9ydCAqIGZyb20gJy4vVG9ydXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Ub3J1c2tub3QnO1xuZXhwb3J0ICogZnJvbSAnLi9UdWJlJztcbmV4cG9ydCAqIGZyb20gJy4vR3JvdXAnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRWxlbWVudE1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRhaW5lcj1kb2N1bWVudC5ib2R5XSBjb250YWluZXIgaXMgdGhlIERPTSBvYmplY3QgdG8gd2hpY2ggYXBwbGljYXRpb24ncyBjYW52YXMgd2lsbCBiZSBhZGRlZCB0by5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGVsZW1lbnQgbW9kdWxlLCBwYXNzaW5nIGl0IHRvIHRoZSBBcHA8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgbmV3IEVsZW1lbnRNb2R1bGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVtZW50TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSkge1xuICAgIGlmIChjb250YWluZXIuY29udGFpbmVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0VsZW1lbnRNb2R1bGUgbm93IGFjY2VwdHMgb25seSBhcmd1bWVudCB3aGljaCBpcyBhIERPTSBvYmplY3QsIG5vdCBhIHBhcmFtcyBvYmplY3QuJyk7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lci5jb250YWluZXI7XG4gICAgfSBlbHNlIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjcmVhdGVFbGVtZW50XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIGNhbnZhcyBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3docy1hcHAnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICdpbmhlcml0JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJ2luaGVyaXQnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnZWxlbWVudCcsIHRoaXMuZWxlbWVudCk7XG4gICAgbWFuYWdlci5zZXQoJ2NvbnRhaW5lcicsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgV2ViR0xSZW5kZXJlcixcbiAgVmVjdG9yMlxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcblxuLyoqXG4gKiBAY2xhc3MgUmVuZGVyaW5nTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICogQGV4YW1wbGUgPGNhcHRpb24+IENyZWF0aW5nIGEgcmVuZGVyaW5nIG1vZHVsZSBhbmQgcGFzc2luZyBpdCB0byBBcHAncyBtb2R1bGVzPC9jYXB0aW9uPlxuICogbmV3IEFwcChbXG4gKiAgIG5ldyBFbGVtZW50TW9kdWxlKCksXG4gKiAgIG5ldyBTY2VuZU1vZHVsZSgpLFxuICogICBuZXcgQ2FtZXJhTW9kdWxlKHtcbiAqICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgNiwgMTgpLFxuICogICAgIGZhcjogMTAwMDBcbiAqICAgfSksXG4gKiAgIG5ldyBSZW5kZXJpbmdNb2R1bGUoe1xuICogICAgIGJnQ29sb3I6IDB4MTYyMTI5LFxuICpcbiAqICAgICByZW5kZXJlcjoge1xuICogICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICogICAgICAgc2hhZG93bWFwOiB7XG4gKiAgICAgICAgIHR5cGU6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiAgIH0sIHtzaGFkb3c6IHRydWV9KVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJpbmdNb2R1bGUge1xuICBzdGF0aWMgYWRkaXRpb25hbCA9IHtcbiAgICBzaGFkb3cocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBlbmFibGVkID0gdHJ1ZTtcblxuICBkZWZlciA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCB7c2hhZG93OiBpc1NoYWRvd30gPSB7c2hhZG93OiBmYWxzZX0pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cbiAgICAgIHJlc29sdXRpb246IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgcGl4ZWxSYXRpbzogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG5cbiAgICAgIGJnQ29sb3I6IDB4MDAwMDAwLFxuICAgICAgYmdPcGFjaXR5OiAxLFxuXG4gICAgICByZW5kZXJlcjoge31cbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgY29uc3Qge1xuICAgICAgYmdDb2xvcixcbiAgICAgIGJnT3BhY2l0eSxcbiAgICAgIHJlbmRlcmVyLFxuICAgICAgcGl4ZWxSYXRpbyxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcmVzb2x1dGlvblxuICAgIH0gPSB0aGlzLnBhcmFtcztcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcihyZW5kZXJlcik7XG4gICAgdGhpcy5lZmZlY3RzID0gW107XG4gICAgdGhpcy5hcHBseUFkZGl0aW9uYWwoJ3NoYWRvdycsIGlzU2hhZG93KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihcbiAgICAgIGJnQ29sb3IsXG4gICAgICBiZ09wYWNpdHlcbiAgICApO1xuXG4gICAgaWYgKHBpeGVsUmF0aW8pIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhwaXhlbFJhdGlvKTtcblxuICAgIHRoaXMuc2V0U2l6ZShcbiAgICAgIE51bWJlcih3aWR0aCAqIHJlc29sdXRpb24ueCkudG9GaXhlZCgpLFxuICAgICAgTnVtYmVyKGhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpXG4gICAgKTtcbiAgfVxuXG4gIGFwcGx5QWRkaXRpb25hbChuYW1lLCBpc0FwcGxpZWQgPSBmYWxzZSkge1xuICAgIGlmICghaXNBcHBsaWVkKSByZXR1cm47XG4gICAgUmVuZGVyaW5nTW9kdWxlLmFkZGl0aW9uYWxbbmFtZV0uYXBwbHkodGhpcywgW3RoaXMucmVuZGVyZXJdKTtcbiAgfVxuXG4gIGludGVncmF0ZVJlbmRlcmVyKGVsZW1lbnQsIHNjZW5lLCBjYW1lcmEpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoKCkgPT4gdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpKTtcbiAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTG9vcDtcbiAgfVxuXG4gIGVmZmVjdChlZmZlY3QsIGNiKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG5cbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcbiAgICAgIGVmZmVjdC5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblxuICAgICAgY29uc3QgbG9vcCA9IG5ldyBMb29wKGNiID8gY2IgOiAoKSA9PiB7XG4gICAgICAgIGVmZmVjdC5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKGxvb3ApO1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkgbG9vcC5zdGFydCh0aGlzLmFwcCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRTaXplXG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgcmVuZGVyIHRhcmdldCB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlbmRlcmluZ01vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGF0dGFjaFRvQ2FudmFzKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cbiAgICAvLyBhdHRhY2ggdG8gbmV3IHBhcmVudCB3b3JsZCBkb21cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdG9wKCk7XG4gICAgdGhpcy5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AoKSk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucmVuZGVyTG9vcC5zdGFydCgpO1xuICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGxvb3AgPT4gbG9vcC5zdGFydCgpKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZW5kZXJpbmcnKTtcbiAgICBtYW5hZ2VyLnNldCgncmVuZGVyZXInLCB0aGlzLnJlbmRlcmVyKTtcblxuICAgIHRoaXMuYXBwID0gbWFuYWdlci5oYW5kbGVyO1xuXG4gICAgdGhpcy5yZW5kZXJMb29wID0gdGhpcy5pbnRlZ3JhdGVSZW5kZXJlcihcbiAgICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JyksXG4gICAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKSxcbiAgICAgIG1hbmFnZXIuZ2V0KCdjYW1lcmEnKS5uYXRpdmVcbiAgICApO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgZWxlbWVudDogZWxlbWVudCA9PiB7XG4gICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCk7XG4gICAgICB9LFxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNvbHZlKCk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIHNlbGYucmVuZGVyTG9vcC5zdGFydCh0aGlzKTtcbiAgICBzZWxmLmVmZmVjdHMuZm9yRWFjaChsb29wID0+IGxvb3Auc3RhcnQodGhpcykpO1xuICB9XG5cbiAgZGlzcG9zZShzZWxmKSB7XG4gICAgc2VsZi5yZW5kZXJMb29wLnN0b3AodGhpcyk7XG4gICAgc2VsZi5lZmZlY3RzLmZvckVhY2gobG9vcCA9PiBsb29wLnN0b3AodGhpcykpO1xuICAgIHNlbGYucmVuZGVyZXIuZm9yY2VDb250ZXh0TG9zcygpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBTY2VuZVxufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIFNjZW5lTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9hcHBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpbGxTY2VuZUJlUmVwbGFjZWQ9ZmFsc2VdIHdpbGxTY2VuZUJlUmVwbGFjZWQgc2hvdWxkIGJlIHRydWUgb25seSBpZiB5b3UgYXJlIGdvaW5nIHRvIG92ZXJ3cml0ZSBzY2VuZSBkZXBlbmRlbmN5IGV2ZW4gd2l0aG91dCB0aGUgdXNlIG9mIGRlZmF1bHQgb25lLlxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgU2NlbmVNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih3aWxsU2NlbmVCZVJlcGxhY2VkID0gZmFsc2UpIHtcbiAgICB0aGlzLnNjZW5lID0gd2lsbFNjZW5lQmVSZXBsYWNlZCA/IG51bGwgOiBuZXcgU2NlbmUoKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuc2V0KCdzY2VuZScsIHRoaXMuc2NlbmUpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG5cbiAgICB0aGlzLmFkZCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBvYmplY3QuZGVmZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtuYXRpdmV9ID0gb2JqZWN0O1xuICAgICAgICAgIGlmICghbmF0aXZlKSByZWplY3QoKTtcblxuICAgICAgICAgIGNvbnN0IGFkZFByb21pc2UgPSB0aGlzLmFwcGx5QnJpZGdlKHtvbkFkZDogb2JqZWN0fSkub25BZGQ7XG5cbiAgICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuc2NlbmUuYWRkKG5hdGl2ZSk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgcmVzb2x2ZShvYmplY3QpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoYWRkUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICBhZGRQcm9taXNlLnRoZW4ocmVzb2x2ZXIpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICAgIHNlbGYuc2NlbmUucmVtb3ZlKG9iamVjdC5uYXRpdmUpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldFNjZW5lID0gZnVuY3Rpb24gKHNjZW5lKSB7XG4gICAgICBzZWxmLnNjZW5lID0gc2NlbmU7XG4gICAgICB0aGlzLm1hbmFnZXIuc2V0KCdzY2VuZScsIHNjZW5lKTtcbiAgICB9O1xuICB9XG59XG4iLCIvLyBpbXBvcnQge2FkZFJlc2l6ZUxpc3RlbmVyfSBmcm9tICdkZXRlY3QtZWxlbWVudC1yZXNpemUnO1xuXG4vKipcbiAqIEBjbGFzcyBSZXNpemVNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2F1dG86IHRydWV9XSAtIElmIGF1dG8gaXMgc2V0IHRvIHRydWUgLSByZXNpemUgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBjb250YWluZXIgcmVzaXplc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2FwcFxuICovXG5leHBvcnQgY2xhc3MgUmVzaXplTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYXV0bzogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IFt0aGlzLnNldFNpemUuYmluZCh0aGlzKV07XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIHNldFNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHByb3ZpZGVkIHdpZHRoICYgaGVpZ2h0IHRvIHRoZSByZW5kZXJlciBvYmplY3QuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGg9MV0gLSBUaGUgcHJvbWlzZSB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byBhIHF1ZXVlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodD0xXSAtIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgY29tcGxldGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgc2V0U2l6ZSh3aWR0aCA9IDEsIGhlaWdodCA9IDEpIHtcbiAgICB0aGlzLmNhbWVyYS5uYXRpdmUuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgdGhpcy5jYW1lcmEubmF0aXZlLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmluZykgdGhpcy5yZW5kZXJpbmcuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHRyaWdnZXJcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBUcmlnZ2VycyByZXNpemUgd2hlbiBjYWxsZWQuIHdpZHRoICYgaGVpZ2h0IGFyZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHlcbiAgICogVGhpcyBpbnZva2VzIGVhY2ggY2FsbGJhY2tzIHdpdGggdGhlIG5ldyB3aWR0aCBhbmQgaGVpZ2h0IGFzIHBhcmFtc1xuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgdHJpZ2dlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXI6IHtcbiAgICAgICAgb2Zmc2V0V2lkdGgsXG4gICAgICAgIG9mZnNldEhlaWdodFxuICAgICAgfSxcbiAgICAgIHJlc29sdXRpb25cbiAgICB9ID0gdGhpcztcblxuICAgIGNvbnN0IHdpZHRoID0gTnVtYmVyKG9mZnNldFdpZHRoICogcmVzb2x1dGlvbi54KS50b0ZpeGVkKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKG9mZnNldEhlaWdodCAqIHJlc29sdXRpb24ueSkudG9GaXhlZCgpO1xuXG4gICAgdGhpcy5jYWxsYmFja3MuZm9yRWFjaChjYiA9PiB7XG4gICAgICBjYih3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZEF1dG9yZXNpemVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIG1vZHVsZSB0byBhdXRvcmVzaXplLCB0aGlzIGFkZHMgYW4gZXZlbnQgbGlzdGVuZSBvbiB3aW5kb3cgcmVzaXplIHRvIHRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlJlc2l6ZU1vZHVsZVxuICAgKi9cbiAgYWRkQXV0b3Jlc2l6ZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29udGFpbmVyKCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGhpcy5nZXRSZXNvbHV0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuYXV0bykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudHJpZ2dlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZENhbGxiYWNrXG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIGNhbGwgYmFjayBmdW5jdGlvbiB0byB0aGUgZXhpc3RpbmcgY2FsbGJhY2tzIGxpc3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYWRkXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuUmVzaXplTW9kdWxlXG4gICAqL1xuICBhZGRDYWxsYmFjayhmdW5jKSB7XG4gICAgdGhpcy5jYWxsYmFja3MucHVzaChmdW5jKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdyZXNpemUnKTtcblxuICAgIHRoaXMucmVuZGVyaW5nID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJyk7XG5cbiAgICB0aGlzLmdldFJlc29sdXRpb24gPSAoKSA9PiBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykucGFyYW1zLnJlc29sdXRpb247XG4gICAgdGhpcy5nZXRDb250YWluZXIgPSAoKSA9PiBtYW5hZ2VyLmdldCgnY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmFkZEF1dG9yZXNpemUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0UHJldmlvdXNMdW07XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdEN1cnJlbnRMdW07XFxyXFxudW5pZm9ybSBmbG9hdCBtaW5MdW1pbmFuY2U7XFxyXFxudW5pZm9ybSBmbG9hdCBkZWx0YTtcXHJcXG51bmlmb3JtIGZsb2F0IHRhdTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHRmbG9hdCBwcmV2aW91c0x1bSA9IHRleHR1cmUyRCh0UHJldmlvdXNMdW0sIHZVdiwgTUlQX0xFVkVMXzFYMSkucjtcXHJcXG5cXHRmbG9hdCBjdXJyZW50THVtID0gdGV4dHVyZTJEKHRDdXJyZW50THVtLCB2VXYsIE1JUF9MRVZFTF8xWDEpLnI7XFxyXFxuXFxyXFxuXFx0cHJldmlvdXNMdW0gPSBtYXgobWluTHVtaW5hbmNlLCBwcmV2aW91c0x1bSk7XFxyXFxuXFx0Y3VycmVudEx1bSA9IG1heChtaW5MdW1pbmFuY2UsIGN1cnJlbnRMdW0pO1xcclxcblxcclxcblxcdC8vIEFkYXB0IHRoZSBsdW1pbmFuY2UgdXNpbmcgUGF0dGFuYWlrJ3MgdGVjaG5pcXVlLlxcclxcblxcdGZsb2F0IGFkYXB0ZWRMdW0gPSBwcmV2aW91c0x1bSArIChjdXJyZW50THVtIC0gcHJldmlvdXNMdW0pICogKDEuMCAtIGV4cCgtZGVsdGEgKiB0YXUpKTtcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IuciA9IGFkYXB0ZWRMdW07XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFkYXB0aXZlIGx1bWlub3NpdHkgc2hhZGVyIG1hdGVyaWFsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBhZGFwdGl2ZSBsdW1pbm9zaXR5IG1hdGVyaWFsLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHRkZWZpbmVzOiB7XHJcblxyXG5cdFx0XHRcdE1JUF9MRVZFTF8xWDE6IFwiMC4wXCJcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0UHJldmlvdXNMdW06IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRDdXJyZW50THVtOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRtaW5MdW1pbmFuY2U6IG5ldyBVbmlmb3JtKDAuMDEpLFxyXG5cdFx0XHRcdGRlbHRhOiBuZXcgVW5pZm9ybSgwLjApLFxyXG5cdFx0XHRcdHRhdTogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdERlcHRoO1xcclxcblxcclxcbnVuaWZvcm0gZmxvYXQgZm9jdXM7XFxyXFxudW5pZm9ybSBmbG9hdCBhc3BlY3Q7XFxyXFxudW5pZm9ybSBmbG9hdCBhcGVydHVyZTtcXHJcXG51bmlmb3JtIGZsb2F0IG1heEJsdXI7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG4jaWZuZGVmIFVTRV9MT0dERVBUSEJVRlxcclxcblxcclxcblxcdCNpbmNsdWRlIDxwYWNraW5nPlxcclxcblxcclxcblxcdHVuaWZvcm0gZmxvYXQgY2FtZXJhTmVhcjtcXHJcXG5cXHR1bmlmb3JtIGZsb2F0IGNhbWVyYUZhcjtcXHJcXG5cXHJcXG5cXHRmbG9hdCByZWFkRGVwdGgoc2FtcGxlcjJEIGRlcHRoU2FtcGxlciwgdmVjMiBjb29yZCkge1xcclxcblxcclxcblxcdFxcdGZsb2F0IGZyYWdDb29yZFogPSB0ZXh0dXJlMkQoZGVwdGhTYW1wbGVyLCBjb29yZCkueDtcXHJcXG5cXHRcXHRmbG9hdCB2aWV3WiA9IHBlcnNwZWN0aXZlRGVwdGhUb1ZpZXdaKGZyYWdDb29yZFosIGNhbWVyYU5lYXIsIGNhbWVyYUZhcik7XFxyXFxuXFxyXFxuXFx0XFx0cmV0dXJuIHZpZXdaVG9PcnRob2dyYXBoaWNEZXB0aCh2aWV3WiwgY2FtZXJhTmVhciwgY2FtZXJhRmFyKTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzIgYXNwZWN0Q29ycmVjdGlvbiA9IHZlYzIoMS4wLCBhc3BlY3QpO1xcclxcblxcclxcblxcdCNpZmRlZiBVU0VfTE9HREVQVEhCVUZcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBkZXB0aCA9IHRleHR1cmUyRCh0RGVwdGgsIHZVdikueDtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdGZsb2F0IGRlcHRoID0gcmVhZERlcHRoKHREZXB0aCwgdlV2KTtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRmbG9hdCBmYWN0b3IgPSBkZXB0aCAtIGZvY3VzO1xcclxcblxcclxcblxcdHZlYzIgZG9mQmx1ciA9IHZlYzIoY2xhbXAoZmFjdG9yICogYXBlcnR1cmUsIC1tYXhCbHVyLCBtYXhCbHVyKSk7XFxyXFxuXFxyXFxuXFx0dmVjMiBkb2ZibHVyOSA9IGRvZkJsdXIgKiAwLjk7XFxyXFxuXFx0dmVjMiBkb2ZibHVyNyA9IGRvZkJsdXIgKiAwLjc7XFxyXFxuXFx0dmVjMiBkb2ZibHVyNCA9IGRvZkJsdXIgKiAwLjQ7XFxyXFxuXFxyXFxuXFx0dmVjNCBjb2xvciA9IHZlYzQoMC4wKTtcXHJcXG5cXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4wLCAgIDAuNCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjE1LCAgMC4zNykgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoIDAuMjksICAwLjI5KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4zNywgIDAuMTUpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjQwLCAgMC4wICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoIDAuMzcsIC0wLjE1KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4yOSwgLTAuMjkpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjE1LCAtMC4zNykgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoIDAuMCwgIC0wLjQgKSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC4xNSwgIDAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjI5LCAgMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoIDAuMzcsICAwLjE1KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMigtMC40LCAgIDAuMCApICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjM3LCAtMC4xNSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZkJsdXIpO1xcclxcblxcdGNvbG9yICs9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgKHZlYzIoLTAuMjksIC0wLjI5KSAqIGFzcGVjdENvcnJlY3Rpb24pICogZG9mQmx1cik7XFxyXFxuXFx0Y29sb3IgKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYgKyAodmVjMiggMC4xNSwgLTAuMzcpICogYXNwZWN0Q29ycmVjdGlvbikgKiBkb2ZCbHVyKTtcXHJcXG5cXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjE1LCAgMC4zNykgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjM3LCAgMC4xNSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjM3LCAtMC4xNSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjE1LCAtMC4zNykgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjE1LCAgMC4zNykgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjM3LCAgMC4xNSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjM3LCAtMC4xNSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjE1LCAtMC4zNykgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI5KTtcXHJcXG5cXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjI5LCAgMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjQwLCAgMC4wICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjI5LCAtMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjAsICAtMC40ICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjI5LCAgMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjQsICAgMC4wICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjI5LCAtMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjAsICAgMC40ICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI3KTtcXHJcXG5cXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjI5LCAgMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjQsICAgMC4wICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjI5LCAtMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjAsICAtMC40ICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjI5LCAgMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjQsICAgMC4wICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKC0wLjI5LCAtMC4yOSkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHRjb2xvciArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiArICh2ZWMyKCAwLjAsICAgMC40ICkgKiBhc3BlY3RDb3JyZWN0aW9uKSAqIGRvZmJsdXI0KTtcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBjb2xvciAvIDQxLjA7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIERlcHRoIG9mIEZpZWxkIHNoYWRlciAoQm9rZWgpLlxyXG4gKlxyXG4gKiBPcmlnaW5hbCBzaGFkZXIgY29kZSBieSBNYXJ0aW5zIFVwaXRpczpcclxuICogIGh0dHA6Ly9hcnRtYXJ0aW5zaC5ibG9nc3BvdC5jb20vMjAxMC8wMi9nbHNsLWxlbnMtYmx1ci1maWx0ZXItd2l0aC1ib2tlaC5odG1sXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEJva2VoTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgYm9rZWggbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1BlcnNwZWN0aXZlQ2FtZXJhfSBbY2FtZXJhXSAtIEEgY2FtZXJhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZm9jdXM9MS4wXSAtIEZvY3VzIGRpc3RhbmNlLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5hcGVydHVyZT0wLjAyNV0gLSBDYW1lcmEgYXBlcnR1cmUgc2NhbGUuIEJpZ2dlciB2YWx1ZXMgZm9yIHNoYWxsb3dlciBkZXB0aCBvZiBmaWVsZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4Qmx1cj0xLjBdIC0gTWF4aW11bSBibHVyIHN0cmVuZ3RoLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYW1lcmEgPSBudWxsLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRpZihvcHRpb25zLmZvY3VzID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5mb2N1cyA9IDEuMDsgfVxyXG5cdFx0aWYob3B0aW9ucy5hcGVydHVyZSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuYXBlcnR1cmUgPSAwLjAyNTsgfVxyXG5cdFx0aWYob3B0aW9ucy5tYXhCbHVyID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5tYXhCbHVyID0gMS4wOyB9XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJCb2tlaE1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHRjYW1lcmFOZWFyOiBuZXcgVW5pZm9ybSgwLjEpLFxyXG5cdFx0XHRcdGNhbWVyYUZhcjogbmV3IFVuaWZvcm0oMjAwMCksXHJcblx0XHRcdFx0YXNwZWN0OiBuZXcgVW5pZm9ybSgxLjApLFxyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dERlcHRoOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHJcblx0XHRcdFx0Zm9jdXM6IG5ldyBVbmlmb3JtKG9wdGlvbnMuZm9jdXMpLFxyXG5cdFx0XHRcdGFwZXJ0dXJlOiBuZXcgVW5pZm9ybShvcHRpb25zLmFwZXJ0dXJlKSxcclxuXHRcdFx0XHRtYXhCbHVyOiBuZXcgVW5pZm9ybShvcHRpb25zLm1heEJsdXIpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYoY2FtZXJhICE9PSBudWxsKSB7IHRoaXMuYWRvcHRDYW1lcmFTZXR0aW5ncyhjYW1lcmEpOyB9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRvcHRzIHRoZSBzZXR0aW5ncyBvZiB0aGUgZ2l2ZW4gY2FtZXJhLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQZXJzcGVjdGl2ZUNhbWVyYX0gY2FtZXJhIC0gQSBjYW1lcmEuXHJcblx0ICovXHJcblxyXG5cdGFkb3B0Q2FtZXJhU2V0dGluZ3MoY2FtZXJhKSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy5jYW1lcmFOZWFyLnZhbHVlID0gY2FtZXJhLm5lYXI7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmNhbWVyYUZhci52YWx1ZSA9IGNhbWVyYS5mYXI7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmFzcGVjdC52YWx1ZSA9IGNhbWVyYS5hc3BlY3Q7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIHNhbXBsZXIyRCB0RGVwdGg7XFxyXFxuXFxyXFxudW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG51bmlmb3JtIHZlYzIgaGFsZlRleGVsU2l6ZTtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IGNhbWVyYU5lYXI7XFxyXFxudW5pZm9ybSBmbG9hdCBjYW1lcmFGYXI7XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBmb2NhbExlbmd0aDtcXHJcXG51bmlmb3JtIGZsb2F0IGZvY2FsU3RvcDtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IG1heEJsdXI7XFxyXFxudW5pZm9ybSBmbG9hdCBsdW1pbmFuY2VUaHJlc2hvbGQ7XFxyXFxudW5pZm9ybSBmbG9hdCBsdW1pbmFuY2VHYWluO1xcclxcbnVuaWZvcm0gZmxvYXQgYmlhcztcXHJcXG51bmlmb3JtIGZsb2F0IGZyaW5nZTtcXHJcXG51bmlmb3JtIGZsb2F0IGRpdGhlclN0cmVuZ3RoO1xcclxcblxcclxcbiNpZmRlZiBTSEFERVJfRk9DVVNcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIHZlYzIgZm9jdXNDb29yZHM7XFxyXFxuXFxyXFxuI2Vsc2VcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IGZvY2FsRGVwdGg7XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG4jaWZuZGVmIFVTRV9MT0dERVBUSEJVRlxcclxcblxcclxcblxcdCNpbmNsdWRlIDxwYWNraW5nPlxcclxcblxcclxcblxcdGZsb2F0IHJlYWREZXB0aChzYW1wbGVyMkQgZGVwdGhTYW1wbGVyLCB2ZWMyIGNvb3JkKSB7XFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZnJhZ0Nvb3JkWiA9IHRleHR1cmUyRChkZXB0aFNhbXBsZXIsIGNvb3JkKS54O1xcclxcblxcdFxcdGZsb2F0IHZpZXdaID0gcGVyc3BlY3RpdmVEZXB0aFRvVmlld1ooZnJhZ0Nvb3JkWiwgY2FtZXJhTmVhciwgY2FtZXJhRmFyKTtcXHJcXG5cXHJcXG5cXHRcXHRyZXR1cm4gdmlld1pUb09ydGhvZ3JhcGhpY0RlcHRoKHZpZXdaLCBjYW1lcmFOZWFyLCBjYW1lcmFGYXIpO1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG4jZW5kaWZcXHJcXG5cXHJcXG4jaWZkZWYgUEVOVEFHT05cXHJcXG5cXHJcXG5cXHRmbG9hdCBwZW50YSh2ZWMyIGNvb3Jkcykge1xcclxcblxcclxcblxcdFxcdGNvbnN0IHZlYzQgSFMwID0gdmVjNCggMS4wLCAgICAgICAgICAwLjAsICAgICAgICAgMC4wLCAxLjApO1xcclxcblxcdFxcdGNvbnN0IHZlYzQgSFMxID0gdmVjNCggMC4zMDkwMTY5OTQsICAwLjk1MTA1NjUxNiwgMC4wLCAxLjApO1xcclxcblxcdFxcdGNvbnN0IHZlYzQgSFMyID0gdmVjNCgtMC44MDkwMTY5OTQsICAwLjU4Nzc4NTI1MiwgMC4wLCAxLjApO1xcclxcblxcdFxcdGNvbnN0IHZlYzQgSFMzID0gdmVjNCgtMC44MDkwMTY5OTQsIC0wLjU4Nzc4NTI1MiwgMC4wLCAxLjApO1xcclxcblxcdFxcdGNvbnN0IHZlYzQgSFM0ID0gdmVjNCggMC4zMDkwMTY5OTQsIC0wLjk1MTA1NjUxNiwgMC4wLCAxLjApO1xcclxcblxcdFxcdGNvbnN0IHZlYzQgSFM1ID0gdmVjNCggMC4wLCAgICAgICAgICAwLjAsICAgICAgICAgMS4wLCAxLjApO1xcclxcblxcclxcblxcdFxcdGNvbnN0IHZlYzQgT05FID0gdmVjNCgxLjApO1xcclxcblxcclxcblxcdFxcdGNvbnN0IGZsb2F0IFBfRkVBVEhFUiA9IDAuNDtcXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBOX0ZFQVRIRVIgPSAtUF9GRUFUSEVSO1xcclxcblxcclxcblxcdFxcdGZsb2F0IGluT3JPdXQgPSAtNC4wO1xcclxcblxcclxcblxcdFxcdHZlYzQgUCA9IHZlYzQoY29vcmRzLCB2ZWMyKFJJTkdTX0ZMT0FUIC0gMS4zKSk7XFxyXFxuXFxyXFxuXFx0XFx0dmVjNCBkaXN0ID0gdmVjNChcXHJcXG5cXHRcXHRcXHRkb3QoUCwgSFMwKSxcXHJcXG5cXHRcXHRcXHRkb3QoUCwgSFMxKSxcXHJcXG5cXHRcXHRcXHRkb3QoUCwgSFMyKSxcXHJcXG5cXHRcXHRcXHRkb3QoUCwgSFMzKVxcclxcblxcdFxcdCk7XFxyXFxuXFxyXFxuXFx0XFx0ZGlzdCA9IHNtb290aHN0ZXAoTl9GRUFUSEVSLCBQX0ZFQVRIRVIsIGRpc3QpO1xcclxcblxcclxcblxcdFxcdGluT3JPdXQgKz0gZG90KGRpc3QsIE9ORSk7XFxyXFxuXFxyXFxuXFx0XFx0ZGlzdC54ID0gZG90KFAsIEhTNCk7XFxyXFxuXFx0XFx0ZGlzdC55ID0gSFM1LncgLSBhYnMoUC56KTtcXHJcXG5cXHJcXG5cXHRcXHRkaXN0ID0gc21vb3Roc3RlcChOX0ZFQVRIRVIsIFBfRkVBVEhFUiwgZGlzdCk7XFxyXFxuXFx0XFx0aW5Pck91dCArPSBkaXN0Lng7XFxyXFxuXFxyXFxuXFx0XFx0cmV0dXJuIGNsYW1wKGluT3JPdXQsIDAuMCwgMS4wKTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxuI2lmZGVmIFNIT1dfRk9DVVNcXHJcXG5cXHJcXG5cXHR2ZWMzIGRlYnVnRm9jdXModmVjMyBjLCBmbG9hdCBibHVyLCBmbG9hdCBkZXB0aCkge1xcclxcblxcclxcblxcdFxcdGZsb2F0IGVkZ2UgPSAwLjAwMiAqIGRlcHRoO1xcclxcblxcdFxcdGZsb2F0IG0gPSBjbGFtcChzbW9vdGhzdGVwKDAuMCwgZWRnZSwgYmx1ciksIDAuMCwgMS4wKTtcXHJcXG5cXHRcXHRmbG9hdCBlID0gY2xhbXAoc21vb3Roc3RlcCgxLjAgLSBlZGdlLCAxLjAsIGJsdXIpLCAwLjAsIDEuMCk7XFxyXFxuXFxyXFxuXFx0XFx0YyA9IG1peChjLCB2ZWMzKDEuMCwgMC41LCAwLjApLCAoMS4wIC0gbSkgKiAwLjYpO1xcclxcblxcdFxcdGMgPSBtaXgoYywgdmVjMygwLjAsIDAuNSwgMS4wKSwgKCgxLjAgLSBlKSAtICgxLjAgLSBtKSkgKiAwLjIpO1xcclxcblxcclxcblxcdFxcdHJldHVybiBjO1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG4jZW5kaWZcXHJcXG5cXHJcXG4jaWZkZWYgVklHTkVUVEVcXHJcXG5cXHJcXG5cXHRmbG9hdCB2aWduZXR0ZSgpIHtcXHJcXG5cXHJcXG5cXHRcXHRjb25zdCB2ZWMyIENFTlRFUiA9IHZlYzIoMC41KTtcXHJcXG5cXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBWSUdORVRURV9PVVQgPSAxLjM7XFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgVklHTkVUVEVfSU4gPSAwLjA7XFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgVklHTkVUVEVfRkFERSA9IDIyLjA7IFxcclxcblxcclxcblxcdFxcdGZsb2F0IGQgPSBkaXN0YW5jZSh2VXYsIENFTlRFUik7XFxyXFxuXFx0XFx0ZCA9IHNtb290aHN0ZXAoVklHTkVUVEVfT1VUICsgKGZvY2FsU3RvcCAvIFZJR05FVFRFX0ZBREUpLCBWSUdORVRURV9JTiArIChmb2NhbFN0b3AgLyBWSUdORVRURV9GQURFKSwgZCk7XFxyXFxuXFxyXFxuXFx0XFx0cmV0dXJuIGNsYW1wKGQsIDAuMCwgMS4wKTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxudmVjMiByYW5kKHZlYzIgY29vcmQpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIG5vaXNlO1xcclxcblxcclxcblxcdCNpZmRlZiBOT0lTRVxcclxcblxcclxcblxcdFxcdGNvbnN0IGZsb2F0IGEgPSAxMi45ODk4O1xcclxcblxcdFxcdGNvbnN0IGZsb2F0IGIgPSA3OC4yMzM7XFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgYyA9IDQzNzU4LjU0NTM7XFxyXFxuXFxyXFxuXFx0XFx0bm9pc2UueCA9IGNsYW1wKGZyYWN0KHNpbihtb2QoZG90KGNvb3JkLCB2ZWMyKGEsIGIpKSwgMy4xNCkpICogYyksIDAuMCwgMS4wKSAqIDIuMCAtIDEuMDtcXHJcXG5cXHRcXHRub2lzZS55ID0gY2xhbXAoZnJhY3Qoc2luKG1vZChkb3QoY29vcmQsIHZlYzIoYSwgYikgKiAyLjApLCAzLjE0KSkgKiBjKSwgMC4wLCAxLjApICogMi4wIC0gMS4wO1xcclxcblxcclxcblxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0bm9pc2UueCA9ICgoZnJhY3QoMS4wIC0gY29vcmQucyAqIGhhbGZUZXhlbFNpemUueCkgKiAwLjI1KSArIChmcmFjdChjb29yZC50ICogaGFsZlRleGVsU2l6ZS55KSAqIDAuNzUpKSAqIDIuMCAtIDEuMDtcXHJcXG5cXHRcXHRub2lzZS55ID0gKChmcmFjdCgxLjAgLSBjb29yZC5zICogaGFsZlRleGVsU2l6ZS54KSAqIDAuNzUpICsgKGZyYWN0KGNvb3JkLnQgKiBoYWxmVGV4ZWxTaXplLnkpICogMC4yNSkpICogMi4wIC0gMS4wO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdHJldHVybiBub2lzZTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxudmVjMyBwcm9jZXNzVGV4ZWwodmVjMiBjb29yZHMsIGZsb2F0IGJsdXIpIHtcXHJcXG5cXHJcXG5cXHRjb25zdCB2ZWMzIExVTV9DT0VGRiA9IHZlYzMoMC4yOTksIDAuNTg3LCAwLjExNCk7XFxyXFxuXFxyXFxuXFx0dmVjMyBjO1xcclxcblxcdGMuciA9IHRleHR1cmUyRCh0RGlmZnVzZSwgY29vcmRzICsgdmVjMigwLjAsIDEuMCkgKiB0ZXhlbFNpemUgKiBmcmluZ2UgKiBibHVyKS5yO1xcclxcblxcdGMuZyA9IHRleHR1cmUyRCh0RGlmZnVzZSwgY29vcmRzICsgdmVjMigtMC44NjYsIC0wLjUpICogdGV4ZWxTaXplICogZnJpbmdlICogYmx1cikuZztcXHJcXG5cXHRjLmIgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkcyArIHZlYzIoMC44NjYsIC0wLjUpICogdGV4ZWxTaXplICogZnJpbmdlICogYmx1cikuYjtcXHJcXG5cXHJcXG5cXHQvLyBDYWxjdWxhdGUgdGhlIGx1bWluYW5jZSBvZiB0aGUgY29uc3RydWN0ZWQgY29sb3VyLlxcclxcblxcdGZsb2F0IGx1bWluYW5jZSA9IGRvdChjLnJnYiwgTFVNX0NPRUZGKTtcXHJcXG5cXHRmbG9hdCB0aHJlc2hvbGQgPSBtYXgoKGx1bWluYW5jZSAtIGx1bWluYW5jZVRocmVzaG9sZCkgKiBsdW1pbmFuY2VHYWluLCAwLjApO1xcclxcblxcclxcblxcdHJldHVybiBjICsgbWl4KHZlYzMoMC4wKSwgYywgdGhyZXNob2xkICogYmx1cik7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbmZsb2F0IGxpbmVhcml6ZShmbG9hdCBkZXB0aCkge1xcclxcblxcclxcblxcdHJldHVybiAtY2FtZXJhRmFyICogY2FtZXJhTmVhciAvIChkZXB0aCAqIChjYW1lcmFGYXIgLSBjYW1lcmFOZWFyKSAtIGNhbWVyYUZhcik7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbmZsb2F0IGdhdGhlcihmbG9hdCBpLCBmbG9hdCBqLCBmbG9hdCByaW5nU2FtcGxlcywgaW5vdXQgdmVjMyBjb2xvciwgZmxvYXQgdywgZmxvYXQgaCwgZmxvYXQgYmx1cikge1xcclxcblxcclxcblxcdGNvbnN0IGZsb2F0IFRXT19QSSA9IDYuMjgzMTg1MzE7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgc3RlcCA9IFRXT19QSSAvIHJpbmdTYW1wbGVzO1xcclxcblxcdGZsb2F0IHB3ID0gY29zKGogKiBzdGVwKSAqIGk7XFxyXFxuXFx0ZmxvYXQgcGggPSBzaW4oaiAqIHN0ZXApICogaTtcXHJcXG5cXHJcXG5cXHQjaWZkZWYgUEVOVEFHT05cXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBwID0gcGVudGEodmVjMihwdywgcGgpKTtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdGZsb2F0IHAgPSAxLjA7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0Y29sb3IgKz0gcHJvY2Vzc1RleGVsKHZVdiArIHZlYzIocHcgKiB3LCBwaCAqIGgpLCBibHVyKSAqIG1peCgxLjAsIGkgLyBSSU5HU19GTE9BVCwgYmlhcykgKiBwO1xcclxcblxcclxcblxcdHJldHVybiBtaXgoMS4wLCBpIC8gUklOR1NfRkxPQVQsIGJpYXMpICogcDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdCNpZmRlZiBVU0VfTE9HREVQVEhCVUZcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBkZXB0aCA9IGxpbmVhcml6ZSh0ZXh0dXJlMkQodERlcHRoLCB2VXYpLngpO1xcclxcblxcclxcblxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZGVwdGggPSBsaW5lYXJpemUocmVhZERlcHRoKHREZXB0aCwgdlV2KSk7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2lmZGVmIFNIQURFUl9GT0NVU1xcclxcblxcclxcblxcdFxcdCNpZmRlZiBVU0VfTE9HREVQVEhCVUZcXHJcXG5cXHJcXG5cXHRcXHRcXHRmbG9hdCBmRGVwdGggPSBsaW5lYXJpemUodGV4dHVyZTJEKHREZXB0aCwgZm9jdXNDb29yZHMpLngpO1xcclxcblxcclxcblxcdFxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0XFx0ZmxvYXQgZkRlcHRoID0gbGluZWFyaXplKHJlYWREZXB0aCh0RGVwdGgsIGZvY3VzQ29vcmRzKSk7XFxyXFxuXFxyXFxuXFx0XFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBmRGVwdGggPSBmb2NhbERlcHRoO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdCNpZmRlZiBNQU5VQUxfRE9GXFxyXFxuXFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgbkRvRlN0YXJ0ID0gMS4wOyBcXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBuRG9GRGlzdCA9IDIuMDtcXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBmRG9GU3RhcnQgPSAxLjA7XFxyXFxuXFx0XFx0Y29uc3QgZmxvYXQgZkRvRkRpc3QgPSAzLjA7XFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZm9jYWxQbGFuZSA9IGRlcHRoIC0gZkRlcHRoO1xcclxcblxcdFxcdGZsb2F0IGZhckRvRiA9IChmb2NhbFBsYW5lIC0gZkRvRlN0YXJ0KSAvIGZEb0ZEaXN0O1xcclxcblxcdFxcdGZsb2F0IG5lYXJEb0YgPSAoLWZvY2FsUGxhbmUgLSBuRG9GU3RhcnQpIC8gbkRvRkRpc3Q7XFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgYmx1ciA9IChmb2NhbFBsYW5lID4gMC4wKSA/IGZhckRvRiA6IG5lYXJEb0Y7XFxyXFxuXFxyXFxuXFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRjb25zdCBmbG9hdCBDSVJDTEVfT0ZfQ09ORlVTSU9OID0gMC4wMzsgLy8gMzVtbSBmaWxtID0gMC4wM21tIENvQy5cXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBmb2NhbFBsYW5lTU0gPSBmRGVwdGggKiAxMDAwLjA7XFxyXFxuXFx0XFx0ZmxvYXQgZGVwdGhNTSA9IGRlcHRoICogMTAwMC4wO1xcclxcblxcclxcblxcdFxcdGZsb2F0IGZvY2FsUGxhbmUgPSAoZGVwdGhNTSAqIGZvY2FsTGVuZ3RoKSAvIChkZXB0aE1NIC0gZm9jYWxMZW5ndGgpO1xcclxcblxcdFxcdGZsb2F0IGZhckRvRiA9IChmb2NhbFBsYW5lTU0gKiBmb2NhbExlbmd0aCkgLyAoZm9jYWxQbGFuZU1NIC0gZm9jYWxMZW5ndGgpO1xcclxcblxcdFxcdGZsb2F0IG5lYXJEb0YgPSAoZm9jYWxQbGFuZU1NIC0gZm9jYWxMZW5ndGgpIC8gKGZvY2FsUGxhbmVNTSAqIGZvY2FsU3RvcCAqIENJUkNMRV9PRl9DT05GVVNJT04pO1xcclxcblxcclxcblxcdFxcdGZsb2F0IGJsdXIgPSBhYnMoZm9jYWxQbGFuZSAtIGZhckRvRikgKiBuZWFyRG9GO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdGJsdXIgPSBjbGFtcChibHVyLCAwLjAsIDEuMCk7XFxyXFxuXFxyXFxuXFx0Ly8gRGl0aGVyaW5nLlxcclxcblxcdHZlYzIgbm9pc2UgPSByYW5kKHZVdikgKiBkaXRoZXJTdHJlbmd0aCAqIGJsdXI7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgYmx1ckZhY3RvclggPSB0ZXhlbFNpemUueCAqIGJsdXIgKiBtYXhCbHVyICsgbm9pc2UueDtcXHJcXG5cXHRmbG9hdCBibHVyRmFjdG9yWSA9IHRleGVsU2l6ZS55ICogYmx1ciAqIG1heEJsdXIgKyBub2lzZS55O1xcclxcblxcclxcblxcdGNvbnN0IGludCBNQVhfUklOR19TQU1QTEVTID0gUklOR1NfSU5UICogU0FNUExFU19JTlQ7XFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRpb24gb2YgZmluYWwgY29sb3IuXFxyXFxuXFx0dmVjNCBjb2xvcjtcXHJcXG5cXHJcXG5cXHRpZihibHVyIDwgMC4wNSkge1xcclxcblxcclxcblxcdFxcdGNvbG9yID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcclxcblxcdH0gZWxzZSB7XFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgcyA9IDEuMDtcXHJcXG5cXHRcXHRpbnQgcmluZ1NhbXBsZXM7XFxyXFxuXFxyXFxuXFx0XFx0Zm9yKGludCBpID0gMTsgaSA8PSBSSU5HU19JTlQ7ICsraSkge1xcclxcblxcclxcblxcdFxcdFxcdHJpbmdTYW1wbGVzID0gaSAqIFNBTVBMRVNfSU5UO1xcclxcblxcclxcblxcdFxcdFxcdC8vIENvbnN0YW50IGxvb3AuXFxyXFxuXFx0XFx0XFx0Zm9yKGludCBqID0gMDsgaiA8IE1BWF9SSU5HX1NBTVBMRVM7ICsraikge1xcclxcblxcclxcblxcdFxcdFxcdFxcdC8vIEJyZWFrIGVhcmxpZXIuXFxyXFxuXFx0XFx0XFx0XFx0aWYoaiA+PSByaW5nU2FtcGxlcykgeyBicmVhazsgfVxcclxcblxcclxcblxcdFxcdFxcdFxcdHMgKz0gZ2F0aGVyKGZsb2F0KGkpLCBmbG9hdChqKSwgZmxvYXQocmluZ1NhbXBsZXMpLCBjb2xvci5yZ2IsIGJsdXJGYWN0b3JYLCBibHVyRmFjdG9yWSwgYmx1cik7XFxyXFxuXFxyXFxuXFx0XFx0XFx0fVxcclxcblxcclxcblxcdFxcdH1cXHJcXG5cXHJcXG5cXHRcXHRjb2xvci5yZ2IgLz0gczsgLy8gRGl2aWRlIGJ5IHNhbXBsZSBjb3VudC5cXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0I2lmZGVmIFNIT1dfRk9DVVNcXHJcXG5cXHJcXG5cXHRcXHRjb2xvci5yZ2IgPSBkZWJ1Z0ZvY3VzKGNvbG9yLnJnYiwgYmx1ciwgZGVwdGgpO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdCNpZmRlZiBWSUdORVRURVxcclxcblxcclxcblxcdFxcdGNvbG9yLnJnYiAqPSB2aWduZXR0ZSgpO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdGdsX0ZyYWdDb2xvciA9IGNvbG9yO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBEZXB0aCBvZiBGaWVsZCBzaGFkZXIgdmVyc2lvbiAyLjQuXHJcbiAqXHJcbiAqIE9yaWdpbmFsIHNoYWRlciBjb2RlIGJ5IE1hcnRpbnMgVXBpdGlzOlxyXG4gKiAgaHR0cDovL2JsZW5kZXJhcnRpc3RzLm9yZy9mb3J1bS9zaG93dGhyZWFkLnBocD8yMzc0ODgtR0xTTC1kZXB0aC1vZi1maWVsZC13aXRoLWJva2VoLXYyLTQtKHVwZGF0ZSlcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQm9rZWgyTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgYm9rZWgyIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQZXJzcGVjdGl2ZUNhbWVyYX0gW2NhbWVyYV0gLSBUaGUgbWFpbiBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjJ9IFtvcHRpb25zLnRleGVsU2l6ZV0gLSBUaGUgYWJzb2x1dGUgc2NyZWVuIHRleGVsIHNpemUuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zaG93Rm9jdXM9ZmFsc2VdIC0gV2hldGhlciB0aGUgZm9jdXMgcG9pbnQgc2hvdWxkIGJlIGhpZ2hsaWdodGVkLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFudWFsRG9GPWZhbHNlXSAtIEVuYWJsZXMgbWFudWFsIGRlcHRoIG9mIGZpZWxkIGJsdXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy52aWduZXR0ZT1mYWxzZV0gLSBFbmFibGVzIGEgdmlnbmV0dGUgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucGVudGFnb249ZmFsc2VdIC0gRW5hYmxlIHRvIHVzZSBhIHBlbnRhZ29uYWwgc2hhcGUgdG8gc2NhbGUgZ2F0aGVyZWQgdGV4ZWxzLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2hhZGVyRm9jdXM9dHJ1ZV0gLSBEaXNhYmxlIGlmIHlvdSBjb21wdXRlIHlvdXIgb3duIGZvY2FsRGVwdGggKGluIG1ldHJlcyEpLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubm9pc2U9dHJ1ZV0gLSBEaXNhYmxlIGlmIHlvdSBkb24ndCB3YW50IG5vaXNlIHBhdHRlcm5zIGZvciBkaXRoZXJpbmcuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhbWVyYSA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdGlmKG9wdGlvbnMucmluZ3MgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnJpbmdzID0gMzsgfVxyXG5cdFx0aWYob3B0aW9ucy5zYW1wbGVzID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5zYW1wbGVzID0gMjsgfVxyXG5cdFx0aWYob3B0aW9ucy5zaG93Rm9jdXMgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnNob3dGb2N1cyA9IGZhbHNlOyB9XHJcblx0XHRpZihvcHRpb25zLnNob3dGb2N1cyA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuc2hvd0ZvY3VzID0gZmFsc2U7IH1cclxuXHRcdGlmKG9wdGlvbnMubWFudWFsRG9GID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5tYW51YWxEb0YgPSBmYWxzZTsgfVxyXG5cdFx0aWYob3B0aW9ucy52aWduZXR0ZSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMudmlnbmV0dGUgPSBmYWxzZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5wZW50YWdvbiA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMucGVudGFnb24gPSBmYWxzZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5zaGFkZXJGb2N1cyA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuc2hhZGVyRm9jdXMgPSB0cnVlOyB9XHJcblx0XHRpZihvcHRpb25zLm5vaXNlID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5ub2lzZSA9IHRydWU7IH1cclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkJva2VoMk1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHRkZWZpbmVzOiB7XHJcblxyXG5cdFx0XHRcdFJJTkdTX0lOVDogb3B0aW9ucy5yaW5ncy50b0ZpeGVkKDApLFxyXG5cdFx0XHRcdFJJTkdTX0ZMT0FUOiBvcHRpb25zLnJpbmdzLnRvRml4ZWQoMSksXHJcblx0XHRcdFx0U0FNUExFU19JTlQ6IG9wdGlvbnMuc2FtcGxlcy50b0ZpeGVkKDApLFxyXG5cdFx0XHRcdFNBTVBMRVNfRkxPQVQ6IG9wdGlvbnMuc2FtcGxlcy50b0ZpeGVkKDEpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHREZXB0aDogbmV3IFVuaWZvcm0obnVsbCksXHJcblxyXG5cdFx0XHRcdHRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblx0XHRcdFx0aGFsZlRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblxyXG5cdFx0XHRcdGNhbWVyYU5lYXI6IG5ldyBVbmlmb3JtKDAuMSksXHJcblx0XHRcdFx0Y2FtZXJhRmFyOiBuZXcgVW5pZm9ybSgyMDAwKSxcclxuXHJcblx0XHRcdFx0Zm9jYWxMZW5ndGg6IG5ldyBVbmlmb3JtKDI0LjApLFxyXG5cdFx0XHRcdGZvY2FsU3RvcDogbmV3IFVuaWZvcm0oMC45KSxcclxuXHJcblx0XHRcdFx0bWF4Qmx1cjogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRsdW1pbmFuY2VUaHJlc2hvbGQ6IG5ldyBVbmlmb3JtKDAuNSksXHJcblx0XHRcdFx0bHVtaW5hbmNlR2FpbjogbmV3IFVuaWZvcm0oMi4wKSxcclxuXHRcdFx0XHRiaWFzOiBuZXcgVW5pZm9ybSgwLjUpLFxyXG5cdFx0XHRcdGZyaW5nZTogbmV3IFVuaWZvcm0oMC43KSxcclxuXHRcdFx0XHRkaXRoZXJTdHJlbmd0aDogbmV3IFVuaWZvcm0oMC4wMDAxKSxcclxuXHJcblx0XHRcdFx0Zm9jdXNDb29yZHM6IG5ldyBVbmlmb3JtKG5ldyBWZWN0b3IyKDAuNSwgMC41KSksXHJcblx0XHRcdFx0Zm9jYWxEZXB0aDogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuc2hvd0ZvY3VzKSB7IHRoaXMuZGVmaW5lcy5TSE9XX0ZPQ1VTID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMubWFudWFsRG9GKSB7IHRoaXMuZGVmaW5lcy5NQU5VQUxfRE9GID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMudmlnbmV0dGUpIHsgdGhpcy5kZWZpbmVzLlZJR05FVFRFID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMucGVudGFnb24pIHsgdGhpcy5kZWZpbmVzLlBFTlRBR09OID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2hhZGVyRm9jdXMpIHsgdGhpcy5kZWZpbmVzLlNIQURFUl9GT0NVUyA9IFwiMVwiOyB9XHJcblx0XHRpZihvcHRpb25zLm5vaXNlKSB7IHRoaXMuZGVmaW5lcy5OT0lTRSA9IFwiMVwiOyB9XHJcblxyXG5cdFx0aWYob3B0aW9ucy50ZXhlbFNpemUgIT09IHVuZGVmaW5lZCkgeyB0aGlzLnNldFRleGVsU2l6ZShvcHRpb25zLnRleGVsU2l6ZS54LCBvcHRpb25zLnRleGVsU2l6ZS55KTsgfVxyXG5cdFx0aWYoY2FtZXJhICE9PSBudWxsKSB7IHRoaXMuYWRvcHRDYW1lcmFTZXR0aW5ncyhjYW1lcmEpOyB9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgdGV4ZWwgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gVGhlIHRleGVsIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gVGhlIHRleGVsIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0VGV4ZWxTaXplKHgsIHkpIHtcclxuXHJcblx0XHR0aGlzLnVuaWZvcm1zLnRleGVsU2l6ZS52YWx1ZS5zZXQoeCwgeSk7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmhhbGZUZXhlbFNpemUudmFsdWUuc2V0KHgsIHkpLm11bHRpcGx5U2NhbGFyKDAuNSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRvcHRzIHRoZSBuZWFyIGFuZCBmYXIgcGxhbmUgYW5kIHRoZSBmb2NhbCBsZW5ndGggb2YgdGhlIGdpdmVuIGNhbWVyYS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGVyc3BlY3RpdmVDYW1lcmF9IGNhbWVyYSAtIFRoZSBtYWluIGNhbWVyYS5cclxuXHQgKi9cclxuXHJcblx0YWRvcHRDYW1lcmFTZXR0aW5ncyhjYW1lcmEpIHtcclxuXHJcblx0XHR0aGlzLnVuaWZvcm1zLmNhbWVyYU5lYXIudmFsdWUgPSBjYW1lcmEubmVhcjtcclxuXHRcdHRoaXMudW5pZm9ybXMuY2FtZXJhRmFyLnZhbHVlID0gY2FtZXJhLmZhcjtcclxuXHRcdHRoaXMudW5pZm9ybXMuZm9jYWxMZW5ndGgudmFsdWUgPSBjYW1lcmEuZ2V0Rm9jYWxMZW5ndGgoKTsgLy8gdW5pdDogbW0uXHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlMTtcXHJcXG51bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlMjtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IG9wYWNpdHkxO1xcclxcbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTI7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbDEgPSBvcGFjaXR5MSAqIHRleHR1cmUyRCh0ZXh0dXJlMSwgdlV2KTtcXHJcXG5cXHR2ZWM0IHRleGVsMiA9IG9wYWNpdHkyICogdGV4dHVyZTJEKHRleHR1cmUyLCB2VXYpO1xcclxcblxcclxcblxcdCNpZmRlZiBTQ1JFRU5fTU9ERVxcclxcblxcclxcblxcdFxcdHZlYzMgaW52VGV4ZWwxID0gdmVjMygxLjApIC0gdGV4ZWwxLnJnYjtcXHJcXG5cXHRcXHR2ZWMzIGludlRleGVsMiA9IHZlYzMoMS4wKSAtIHRleGVsMi5yZ2I7XFxyXFxuXFxyXFxuXFx0XFx0dmVjNCBjb2xvciA9IHZlYzQoXFxyXFxuXFx0XFx0XFx0dmVjMygxLjApIC0gaW52VGV4ZWwxICogaW52VGV4ZWwyLFxcclxcblxcdFxcdFxcdHRleGVsMS5hICsgdGV4ZWwyLmFcXHJcXG5cXHRcXHQpO1xcclxcblxcclxcblxcdCNlbHNlXFxyXFxuXFxyXFxuXFx0XFx0dmVjNCBjb2xvciA9IHRleGVsMSArIHRleGVsMjtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBtYXRlcmlhbCBmb3IgY29tYmluaW5nIHR3byB0ZXh0dXJlcy5cclxuICpcclxuICogVGhpcyBtYXRlcmlhbCBzdXBwb3J0cyB0aGUgdHdvIGJsZW5kIG1vZGVzIEFkZCBhbmQgU2NyZWVuLlxyXG4gKlxyXG4gKiBJbiBTY3JlZW4gbW9kZSwgdGhlIHR3byB0ZXh0dXJlcyBhcmUgZWZmZWN0aXZlbHkgcHJvamVjdGVkIG9uIGEgd2hpdGUgc2NyZWVuXHJcbiAqIHNpbXVsdGFuZW91c2x5LiBJbiBBZGQgbW9kZSwgdGhlIHRleHR1cmVzIGFyZSBzaW1wbHkgYWRkZWQgdG9nZXRoZXIgd2hpY2hcclxuICogb2Z0ZW4gcHJvZHVjZXMgdW5kZXNpcmVkLCB3YXNoZWQgb3V0IHJlc3VsdHMuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbWJpbmVNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjb21iaW5lIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbc2NyZWVuTW9kZT1mYWxzZV0gLSBXaGV0aGVyIHRoZSBzY3JlZW4gYmxlbmQgbW9kZSBzaG91bGQgYmUgdXNlZC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Ioc2NyZWVuTW9kZSA9IGZhbHNlKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJDb21iaW5lTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHRleHR1cmUxOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0ZXh0dXJlMjogbmV3IFVuaWZvcm0obnVsbCksXHJcblxyXG5cdFx0XHRcdG9wYWNpdHkxOiBuZXcgVW5pZm9ybSgxLjApLFxyXG5cdFx0XHRcdG9wYWNpdHkyOiBuZXcgVW5pZm9ybSgxLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYoc2NyZWVuTW9kZSkgeyB0aGlzLmRlZmluZXMuU0NSRUVOX01PREUgPSBcIjFcIjsgfVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjA7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjE7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjI7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjM7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdC8vIFNhbXBsZSB0b3AgbGVmdCB0ZXhlbC5cXHJcXG5cXHR2ZWM0IHN1bSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2MCk7XFxyXFxuXFxyXFxuXFx0Ly8gU2FtcGxlIHRvcCByaWdodCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYxKTtcXHJcXG5cXHJcXG5cXHQvLyBTYW1wbGUgYm90dG9tIHJpZ2h0IHRleGVsLlxcclxcblxcdHN1bSArPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdjIpO1xcclxcblxcclxcblxcdC8vIFNhbXBsZSBib3R0b20gbGVmdCB0ZXhlbC5cXHJcXG5cXHRzdW0gKz0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYzKTtcXHJcXG5cXHJcXG5cXHQvLyBDb21wdXRlIHRoZSBhdmVyYWdlLlxcclxcblxcdGdsX0ZyYWdDb2xvciA9IHN1bSAqIDAuMjU7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInVuaWZvcm0gdmVjMiB0ZXhlbFNpemU7XFxyXFxudW5pZm9ybSB2ZWMyIGhhbGZUZXhlbFNpemU7XFxyXFxudW5pZm9ybSBmbG9hdCBrZXJuZWw7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjA7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjE7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjI7XFxyXFxudmFyeWluZyB2ZWMyIHZVdjM7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzIgZFV2ID0gKHRleGVsU2l6ZSAqIHZlYzIoa2VybmVsKSkgKyBoYWxmVGV4ZWxTaXplO1xcclxcblxcclxcblxcdHZVdjAgPSB2ZWMyKHV2LnggLSBkVXYueCwgdXYueSArIGRVdi55KTtcXHJcXG5cXHR2VXYxID0gdmVjMih1di54ICsgZFV2LngsIHV2LnkgKyBkVXYueSk7XFxyXFxuXFx0dlV2MiA9IHZlYzIodXYueCArIGRVdi54LCB1di55IC0gZFV2LnkpO1xcclxcblxcdHZVdjMgPSB2ZWMyKHV2LnggLSBkVXYueCwgdXYueSAtIGRVdi55KTtcXHJcXG5cXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBvcHRpbWlzZWQgY29udm9sdXRpb24gc2hhZGVyIG1hdGVyaWFsLlxyXG4gKlxyXG4gKiBCYXNlZCBvbiB0aGUgR0RDMjAwMyBQcmVzZW50YXRpb24gYnkgTWFzYWtpIEthd2FzZSwgQnVua2FzaGEgR2FtZXM6XHJcbiAqICBGcmFtZSBCdWZmZXIgUG9zdHByb2Nlc3NpbmcgRWZmZWN0cyBpbiBET1VCTEUtUy5ULkUuQS5MIChXcmVja2xlc3MpXHJcbiAqIGFuZCBhbiBhcnRpY2xlIGJ5IEZpbGlwIFN0cnVnYXIsIEludGVsOlxyXG4gKiAgQW4gaW52ZXN0aWdhdGlvbiBvZiBmYXN0IHJlYWwtdGltZSBHUFUtYmFzZWQgaW1hZ2UgYmx1ciBhbGdvcml0aG1zXHJcbiAqXHJcbiAqIEZ1cnRoZXIgbW9kaWZpZWQgYWNjb3JkaW5nIHRvIEFwcGxlJ3NcclxuICogW0Jlc3QgUHJhY3RpY2VzIGZvciBTaGFkZXJzXShodHRwczovL2dvby5nbC9sbVJvTTUpLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb252b2x1dGlvbk1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNvbnZvbHV0aW9uIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbdGV4ZWxTaXplXSAtIFRoZSBhYnNvbHV0ZSBzY3JlZW4gdGV4ZWwgc2l6ZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IodGV4ZWxTaXplID0gbmV3IFZlY3RvcjIoKSkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiQ29udm9sdXRpb25NYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblx0XHRcdFx0aGFsZlRleGVsU2l6ZTogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjIoKSksXHJcblx0XHRcdFx0a2VybmVsOiBuZXcgVW5pZm9ybSgwLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5zZXRUZXhlbFNpemUodGV4ZWxTaXplLngsIHRleGVsU2l6ZS55KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjdXJyZW50IGtlcm5lbCBzaXplLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtLZXJuZWxTaXplfVxyXG5cdFx0ICogQGRlZmF1bHQgS2VybmVsU2l6ZS5MQVJHRVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5rZXJuZWxTaXplID0gS2VybmVsU2l6ZS5MQVJHRTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBrZXJuZWwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtGbG9hdDMyQXJyYXl9IFRoZSBrZXJuZWwuXHJcblx0ICovXHJcblxyXG5cdGdldEtlcm5lbCgpIHsgcmV0dXJuIGtlcm5lbFByZXNldHNbdGhpcy5rZXJuZWxTaXplXTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB0ZXhlbCBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHggLSBUaGUgdGV4ZWwgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgLSBUaGUgdGV4ZWwgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRUZXhlbFNpemUoeCwgeSkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXMudGV4ZWxTaXplLnZhbHVlLnNldCh4LCB5KTtcclxuXHRcdHRoaXMudW5pZm9ybXMuaGFsZlRleGVsU2l6ZS52YWx1ZS5zZXQoeCwgeSkubXVsdGlwbHlTY2FsYXIoMC41KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBLYXdhc2UgYmx1ciBrZXJuZWwgcHJlc2V0cy5cclxuICpcclxuICogQHR5cGUge0Zsb2F0MzJBcnJheVtdfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmNvbnN0IGtlcm5lbFByZXNldHMgPSBbXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAwLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMS4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDEuMCwgMi4wXSksXHJcblx0bmV3IEZsb2F0MzJBcnJheShbMC4wLCAxLjAsIDIuMCwgMi4wLCAzLjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAzLjAsIDQuMCwgNC4wLCA1LjBdKSxcclxuXHRuZXcgRmxvYXQzMkFycmF5KFswLjAsIDEuMCwgMi4wLCAzLjAsIDQuMCwgNS4wLCA3LjAsIDguMCwgOS4wLCAxMC4wXSlcclxuXTtcclxuXHJcbi8qKlxyXG4gKiBBIGtlcm5lbCBzaXplIGVudW1lcmF0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gVkVSWV9TTUFMTCAtIEEgdmVyeSBzbWFsbCBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgN3g3IEdhdXNzIGJsdXIga2VybmVsLlxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gU01BTEwgLSBBIHNtYWxsIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAxNXgxNSBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IE1FRElVTSAtIEEgbWVkaXVtIHNpemVkIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSAyM3gyMyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IExBUkdFIC0gQSBsYXJnZSBrZXJuZWwgdGhhdCBtYXRjaGVzIGEgMzV4MzUgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJZX0xBUkdFIC0gQSB2ZXJ5IGxhcmdlIGtlcm5lbCB0aGF0IG1hdGNoZXMgYSA2M3g2MyBHYXVzcyBibHVyIGtlcm5lbC5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IEhVR0UgLSBBIGh1Z2Uga2VybmVsIHRoYXQgbWF0Y2hlcyBhIDEyN3gxMjcgR2F1c3MgYmx1ciBrZXJuZWwuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEtlcm5lbFNpemUgPSB7XHJcblxyXG5cdFZFUllfU01BTEw6IDAsXHJcblx0U01BTEw6IDEsXHJcblx0TUVESVVNOiAyLFxyXG5cdExBUkdFOiAzLFxyXG5cdFZFUllfTEFSR0U6IDQsXHJcblx0SFVHRTogNVxyXG5cclxufTtcclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIGZsb2F0IG9wYWNpdHk7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBvcGFjaXR5ICogdGV4ZWw7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2ltcGxlIGNvcHkgc2hhZGVyIG1hdGVyaWFsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3B5TWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgY29weSBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJDb3B5TWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRvcGFjaXR5OiBuZXcgVW5pZm9ybSgxLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGVwdGg7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG4jaWZuZGVmIFVTRV9MT0dERVBUSEJVRlxcclxcblxcclxcblxcdCNpbmNsdWRlIDxwYWNraW5nPlxcclxcblxcclxcblxcdHVuaWZvcm0gZmxvYXQgY2FtZXJhTmVhcjtcXHJcXG5cXHR1bmlmb3JtIGZsb2F0IGNhbWVyYUZhcjtcXHJcXG5cXHJcXG5cXHRmbG9hdCByZWFkRGVwdGgoc2FtcGxlcjJEIGRlcHRoU2FtcGxlciwgdmVjMiBjb29yZCkge1xcclxcblxcclxcblxcdFxcdGZsb2F0IGZyYWdDb29yZFogPSB0ZXh0dXJlMkQoZGVwdGhTYW1wbGVyLCBjb29yZCkueDtcXHJcXG5cXHRcXHRmbG9hdCB2aWV3WiA9IHBlcnNwZWN0aXZlRGVwdGhUb1ZpZXdaKGZyYWdDb29yZFosIGNhbWVyYU5lYXIsIGNhbWVyYUZhcik7XFxyXFxuXFxyXFxuXFx0XFx0cmV0dXJuIHZpZXdaVG9PcnRob2dyYXBoaWNEZXB0aCh2aWV3WiwgY2FtZXJhTmVhciwgY2FtZXJhRmFyKTtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdCNpZmRlZiBVU0VfTE9HREVQVEhCVUZcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCBkZXB0aCA9IHRleHR1cmUyRCh0RGVwdGgsIHZVdikueDtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdGZsb2F0IGRlcHRoID0gcmVhZERlcHRoKHREZXB0aCwgdlV2KTtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KGRlcHRoLCBkZXB0aCwgZGVwdGgsIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgZGVwdGggc2hhZGVyIG1hdGVyaWFsLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBEZXB0aE1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGRlcHRoIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQZXJzcGVjdGl2ZUNhbWVyYX0gW2NhbWVyYV0gLSBBIGNhbWVyYS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhID0gbnVsbCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiRGVwdGhNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0Y2FtZXJhTmVhcjogbmV3IFVuaWZvcm0oMC4xKSxcclxuXHRcdFx0XHRjYW1lcmFGYXI6IG5ldyBVbmlmb3JtKDIwMDApLFxyXG5cclxuXHRcdFx0XHR0RGVwdGg6IG5ldyBVbmlmb3JtKG51bGwpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYoY2FtZXJhICE9PSBudWxsKSB7IHRoaXMuYWRvcHRDYW1lcmFTZXR0aW5ncyhjYW1lcmEpOyB9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRvcHRzIHRoZSBzZXR0aW5ncyBvZiB0aGUgZ2l2ZW4gY2FtZXJhLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQZXJzcGVjdGl2ZUNhbWVyYX0gY2FtZXJhIC0gQSBjYW1lcmEuXHJcblx0ICovXHJcblxyXG5cdGFkb3B0Q2FtZXJhU2V0dGluZ3MoY2FtZXJhKSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy5jYW1lcmFOZWFyLnZhbHVlID0gY2FtZXJhLm5lYXI7XHJcblx0XHR0aGlzLnVuaWZvcm1zLmNhbWVyYUZhci52YWx1ZSA9IGNhbWVyYS5mYXI7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjQgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IGFuZ2xlO1xcclxcbnVuaWZvcm0gZmxvYXQgc2NhbGU7XFxyXFxudW5pZm9ybSBmbG9hdCBpbnRlbnNpdHk7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG52YXJ5aW5nIHZlYzIgdlV2UGF0dGVybjtcXHJcXG5cXHJcXG5mbG9hdCBwYXR0ZXJuKCkge1xcclxcblxcclxcblxcdGZsb2F0IHMgPSBzaW4oYW5nbGUpO1xcclxcblxcdGZsb2F0IGMgPSBjb3MoYW5nbGUpO1xcclxcblxcclxcblxcdHZlYzIgcG9pbnQgPSB2ZWMyKGMgKiB2VXZQYXR0ZXJuLnggLSBzICogdlV2UGF0dGVybi55LCBzICogdlV2UGF0dGVybi54ICsgYyAqIHZVdlBhdHRlcm4ueSkgKiBzY2FsZTtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gKHNpbihwb2ludC54KSAqIHNpbihwb2ludC55KSkgKiA0LjA7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcdHZlYzMgY29sb3IgPSB0ZXhlbC5yZ2I7XFxyXFxuXFxyXFxuXFx0I2lmZGVmIEFWRVJBR0VcXHJcXG5cXHJcXG5cXHRcXHRjb2xvciA9IHZlYzMoKGNvbG9yLnIgKyBjb2xvci5nICsgY29sb3IuYikgLyAzLjApO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdGNvbG9yID0gdmVjMyhjb2xvciAqIDEwLjAgLSA1LjAgKyBwYXR0ZXJuKCkpO1xcclxcblxcdGNvbG9yID0gdGV4ZWwucmdiICsgKGNvbG9yIC0gdGV4ZWwucmdiKSAqIGludGVuc2l0eTtcXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCB0ZXhlbC5hKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSB2ZWM0IG9mZnNldFJlcGVhdDtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcbnZhcnlpbmcgdmVjMiB2VXZQYXR0ZXJuO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHR2VXZQYXR0ZXJuID0gdXYgKiBvZmZzZXRSZXBlYXQuencgKyBvZmZzZXRSZXBlYXQueHk7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBkb3Qgc2NyZWVuIHNoYWRlciBtYXRlcmlhbC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRG90U2NyZWVuTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZG90IHNjcmVlbiBtYXRlcmlhbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F2ZXJhZ2U9ZmFsc2VdIC0gV2hldGhlciB0aGUgc2hhZGVyIHNob3VsZCBvdXRwdXQgdGhlIGNvbG91ciBhdmVyYWdlIChibGFjayBhbmQgd2hpdGUpLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhdmVyYWdlID0gZmFsc2UpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIkRvdFNjcmVlbk1hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblxyXG5cdFx0XHRcdGFuZ2xlOiBuZXcgVW5pZm9ybSgxLjU3KSxcclxuXHRcdFx0XHRzY2FsZTogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRpbnRlbnNpdHk6IG5ldyBVbmlmb3JtKDEuMCksXHJcblxyXG5cdFx0XHRcdG9mZnNldFJlcGVhdDogbmV3IFVuaWZvcm0obmV3IFZlY3RvcjQoMC41LCAwLjUsIDEuMCwgMS4wKSlcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihhdmVyYWdlKSB7IHRoaXMuZGVmaW5lcy5BVkVSQUdFID0gXCIxXCI7IH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gZmxvYXQgdGltZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbiNpZmRlZiBOT0lTRVxcclxcblxcclxcblxcdHVuaWZvcm0gZmxvYXQgbm9pc2VJbnRlbnNpdHk7XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxuI2lmZGVmIFNDQU5MSU5FU1xcclxcblxcclxcblxcdHVuaWZvcm0gZmxvYXQgc2NhbmxpbmVJbnRlbnNpdHk7XFxyXFxuXFx0dW5pZm9ybSBmbG9hdCBzY2FubGluZUNvdW50O1xcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbiNpZmRlZiBHUkVZU0NBTEVcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IGdyZXlzY2FsZUludGVuc2l0eTtcXHJcXG5cXHJcXG5cXHRjb25zdCB2ZWMzIExVTV9DT0VGRiA9IHZlYzMoMC4yOTksIDAuNTg3LCAwLjExNCk7XFxyXFxuXFxyXFxuI2VsaWYgZGVmaW5lZChTRVBJQSlcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IHNlcGlhSW50ZW5zaXR5O1xcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbiNpZmRlZiBWSUdORVRURVxcclxcblxcclxcblxcdHVuaWZvcm0gZmxvYXQgdmlnbmV0dGVPZmZzZXQ7XFxyXFxuXFx0dW5pZm9ybSBmbG9hdCB2aWduZXR0ZURhcmtuZXNzO1xcclxcblxcclxcbiNlbmRpZlxcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcdHZlYzMgY29sb3IgPSB0ZXhlbC5yZ2I7XFxyXFxuXFxyXFxuXFx0I2lmZGVmIFNDUkVFTl9NT0RFXFxyXFxuXFxyXFxuXFx0XFx0dmVjMyBpbnZDb2xvcjtcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHQjaWZkZWYgTk9JU0VcXHJcXG5cXHJcXG5cXHRcXHRmbG9hdCB4ID0gdlV2LnggKiB2VXYueSAqIHRpbWUgKiAxMDAwLjA7XFxyXFxuXFx0XFx0eCA9IG1vZCh4LCAxMy4wKSAqIG1vZCh4LCAxMjMuMCk7XFxyXFxuXFx0XFx0eCA9IG1vZCh4LCAwLjAxKTtcXHJcXG5cXHJcXG5cXHRcXHR2ZWMzIG5vaXNlID0gdGV4ZWwucmdiICogY2xhbXAoMC4xICsgeCAqIDEwMC4wLCAwLjAsIDEuMCkgKiBub2lzZUludGVuc2l0eTtcXHJcXG5cXHJcXG5cXHRcXHQjaWZkZWYgU0NSRUVOX01PREVcXHJcXG5cXHJcXG5cXHRcXHRcXHRpbnZDb2xvciA9IHZlYzMoMS4wKSAtIGNvbG9yO1xcclxcblxcdFxcdFxcdHZlYzMgaW52Tm9pc2UgPSB2ZWMzKDEuMCkgLSBub2lzZTtcXHJcXG5cXHJcXG5cXHRcXHRcXHRjb2xvciA9IHZlYzMoMS4wKSAtIGludkNvbG9yICogaW52Tm9pc2U7XFxyXFxuXFxyXFxuXFx0XFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRcXHRjb2xvciArPSBub2lzZTtcXHJcXG5cXHJcXG5cXHRcXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHQjZW5kaWZcXHJcXG5cXHJcXG5cXHQjaWZkZWYgU0NBTkxJTkVTXFxyXFxuXFxyXFxuXFx0XFx0dmVjMiBzbCA9IHZlYzIoc2luKHZVdi55ICogc2NhbmxpbmVDb3VudCksIGNvcyh2VXYueSAqIHNjYW5saW5lQ291bnQpKTtcXHJcXG5cXHRcXHR2ZWMzIHNjYW5saW5lcyA9IHRleGVsLnJnYiAqIHZlYzMoc2wueCwgc2wueSwgc2wueCkgKiBzY2FubGluZUludGVuc2l0eTtcXHJcXG5cXHJcXG5cXHRcXHQjaWZkZWYgU0NSRUVOX01PREVcXHJcXG5cXHJcXG5cXHRcXHRcXHRpbnZDb2xvciA9IHZlYzMoMS4wKSAtIGNvbG9yO1xcclxcblxcdFxcdFxcdHZlYzMgaW52U2NhbmxpbmVzID0gdmVjMygxLjApIC0gc2NhbmxpbmVzO1xcclxcblxcclxcblxcdFxcdFxcdGNvbG9yID0gdmVjMygxLjApIC0gaW52Q29sb3IgKiBpbnZTY2FubGluZXM7XFxyXFxuXFxyXFxuXFx0XFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRcXHRjb2xvciArPSBzY2FubGluZXM7XFxyXFxuXFxyXFxuXFx0XFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2lmZGVmIEdSRVlTQ0FMRVxcclxcblxcclxcblxcdFxcdGNvbG9yID0gbWl4KGNvbG9yLCB2ZWMzKGRvdChjb2xvciwgTFVNX0NPRUZGKSksIGdyZXlzY2FsZUludGVuc2l0eSk7XFxyXFxuXFxyXFxuXFx0I2VsaWYgZGVmaW5lZChTRVBJQSlcXHJcXG5cXHJcXG5cXHRcXHR2ZWMzIGMgPSBjb2xvci5yZ2I7XFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IuciA9IGRvdChjLCB2ZWMzKDEuMCAtIDAuNjA3ICogc2VwaWFJbnRlbnNpdHksIDAuNzY5ICogc2VwaWFJbnRlbnNpdHksIDAuMTg5ICogc2VwaWFJbnRlbnNpdHkpKTtcXHJcXG5cXHRcXHRjb2xvci5nID0gZG90KGMsIHZlYzMoMC4zNDkgKiBzZXBpYUludGVuc2l0eSwgMS4wIC0gMC4zMTQgKiBzZXBpYUludGVuc2l0eSwgMC4xNjggKiBzZXBpYUludGVuc2l0eSkpO1xcclxcblxcdFxcdGNvbG9yLmIgPSBkb3QoYywgdmVjMygwLjI3MiAqIHNlcGlhSW50ZW5zaXR5LCAwLjUzNCAqIHNlcGlhSW50ZW5zaXR5LCAxLjAgLSAwLjg2OSAqIHNlcGlhSW50ZW5zaXR5KSk7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0I2lmZGVmIFZJR05FVFRFXFxyXFxuXFxyXFxuXFx0XFx0Y29uc3QgdmVjMiBDRU5URVIgPSB2ZWMyKDAuNSk7XFxyXFxuXFxyXFxuXFx0XFx0I2lmZGVmIEVTS0lMXFxyXFxuXFxyXFxuXFx0XFx0XFx0dmVjMiB1diA9ICh2VXYgLSBDRU5URVIpICogdmVjMih2aWduZXR0ZU9mZnNldCk7XFxyXFxuXFx0XFx0XFx0Y29sb3IgPSBtaXgoY29sb3IucmdiLCB2ZWMzKDEuMCAtIHZpZ25ldHRlRGFya25lc3MpLCBkb3QodXYsIHV2KSk7XFxyXFxuXFxyXFxuXFx0XFx0I2Vsc2VcXHJcXG5cXHJcXG5cXHRcXHRcXHRmbG9hdCBkaXN0ID0gZGlzdGFuY2UodlV2LCBDRU5URVIpO1xcclxcblxcdFxcdFxcdGNvbG9yICo9IHNtb290aHN0ZXAoMC44LCB2aWduZXR0ZU9mZnNldCAqIDAuNzk5LCBkaXN0ICogKHZpZ25ldHRlRGFya25lc3MgKyB2aWduZXR0ZU9mZnNldCkpO1xcclxcblxcclxcblxcdFxcdCNlbmRpZlxcdFxcdFxcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdGdsX0ZyYWdDb2xvciA9IHZlYzQoY2xhbXAoY29sb3IsIDAuMCwgMS4wKSwgdGV4ZWwuYSk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgY2luZW1hdGljIHNoYWRlciB0aGF0IHByb3ZpZGVzIHRoZSBmb2xsb3dpbmcgZWZmZWN0czpcclxuICogIC0gRmlsbSBHcmFpblxyXG4gKiAgLSBTY2FubGluZXNcclxuICogIC0gVmlnbmV0dGVcclxuICogIC0gR3JleXNjYWxlXHJcbiAqICAtIFNlcGlhXHJcbiAqXHJcbiAqIE9yaWdpbmFsIHNjYW5saW5lcyBhbGdvcml0aG0gYnkgUGF0IFwiSGF3dGhvcm5lXCIgU2hlYXJvbi5cclxuICogIGh0dHA6Ly93d3cudHJ1ZXZpc2lvbjNkLmNvbS9mb3J1bXMvc2hvd2Nhc2Uvc3RhdGljbm9pc2VfY29sb3JibGFja3doaXRlX3NjYW5saW5lX3NoYWRlcnMtdDE4Njk4LjAuaHRtbFxyXG4gKlxyXG4gKiBPcHRpbWlzZWQgc2NhbmxpbmVzIGFuZCBub2lzZSB3aXRoIGludGVuc2l0eSBzY2FsaW5nIGJ5IEdlb3JnIFwiTGV2aWF0aGFuXCJcclxuICogU3RlaW5yb2hkZXIuIFRoaXMgdmVyc2lvbiB3YXMgcHJvdmlkZWQgdW5kZXIgYSBDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uXHJcbiAqIDMuMCBMaWNlbnNlOiBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS8zLjAuXHJcbiAqXHJcbiAqIFRoZSBzZXBpYSBlZmZlY3QgaXMgYmFzZWQgb246XHJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vZXZhbncvZ2xmeC5qc1xyXG4gKlxyXG4gKiBUaGUgdmlnbmV0dGUgY29kZSBpcyBiYXNlZCBvbiBQYWludEVmZmVjdCBwb3N0cHJvY2VzcyBmcm9tIHJvLm1lOlxyXG4gKiAgaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wLzMtZHJlYW1zLW9mLWJsYWNrL3NvdXJjZS9icm93c2UvZGVwbG95L2pzL2VmZmVjdHMvUGFpbnRFZmZlY3QuanNcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRmlsbU1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGZpbG0gbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuIERpc2FibGVkIGVmZmVjdHMgd2lsbCBub3QgYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHNoYWRlciBhbmQgaGF2ZSBubyBuZWdhdGl2ZSBpbXBhY3Qgb24gcGVyZm9ybWFuY2UuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ncmV5c2NhbGU9ZmFsc2VdIC0gRW5hYmxlIGdyZXlzY2FsZSBlZmZlY3QuIEdyZXlzY2FsZSBhbmQgc2VwaWEgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNlcGlhPWZhbHNlXSAtIEVuYWJsZSBzZXBpYSBlZmZlY3QuIEdyZXlzY2FsZSBhbmQgc2VwaWEgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnZpZ25ldHRlPWZhbHNlXSAtIEFwcGx5IHZpZ25ldHRlIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmVza2lsPWZhbHNlXSAtIFVzZSBFc2tpbCdzIHZpZ25ldHRlIGFwcHJvYWNoLiBUaGUgZGVmYXVsdCBsb29rcyBkdXN0eSB3aGlsZSBFc2tpbCBsb29rcyBidXJuZWQgb3V0LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2NyZWVuTW9kZT10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcmVlbiBibGVuZCBtb2RlIHNob3VsZCBiZSB1c2VkIGZvciBub2lzZSBhbmQgc2NhbmxpbmVzLiBCb3RoIG9mIHRoZXNlIGVmZmVjdHMgYXJlIGNvbXB1dGVkIGluZGVwZW5kZW50bHkuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ub2lzZT10cnVlXSAtIFNob3cgbm9pc2UtYmFzZWQgZmlsbSBncmFpbi5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNjYW5saW5lcz10cnVlXSAtIFNob3cgc2NhbmxpbmVzLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ub2lzZUludGVuc2l0eT0wLjVdIC0gVGhlIG5vaXNlIGludGVuc2l0eS4gMC4wIHRvIDEuMC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2NhbmxpbmVJbnRlbnNpdHk9MC4wNV0gLSBUaGUgc2NhbmxpbmUgaW50ZW5zaXR5LiAwLjAgdG8gMS4wLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ncmV5c2NhbGVJbnRlbnNpdHk9MS4wXSAtIFRoZSBpbnRlbnNpdHkgb2YgdGhlIGdyZXlzY2FsZSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNlcGlhSW50ZW5zaXR5PTEuMF0gLSBUaGUgaW50ZW5zaXR5IG9mIHRoZSBzZXBpYSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnZpZ25ldHRlT2Zmc2V0PTEuMF0gLSBUaGUgb2Zmc2V0IG9mIHRoZSB2aWduZXR0ZSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnZpZ25ldHRlRGFya25lc3M9MS4wXSAtIFRoZSBkYXJrbmVzcyBvZiB0aGUgdmlnbmV0dGUgZWZmZWN0LlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRpZihvcHRpb25zLnNjcmVlbk1vZGUgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnNjcmVlbk1vZGUgPSB0cnVlOyB9XHJcblx0XHRpZihvcHRpb25zLm5vaXNlID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5ub2lzZSA9IHRydWU7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2NhbmxpbmVzID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5zY2FubGluZXMgPSB0cnVlOyB9XHJcblxyXG5cdFx0aWYob3B0aW9ucy5ncmV5c2NhbGUgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLmdyZXlzY2FsZSA9IGZhbHNlOyB9XHJcblx0XHRpZihvcHRpb25zLnNlcGlhID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5zZXBpYSA9IGZhbHNlOyB9XHJcblx0XHRpZihvcHRpb25zLnZpZ25ldHRlID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy52aWduZXR0ZSA9IGZhbHNlOyB9XHJcblx0XHRpZihvcHRpb25zLmVza2lsID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5lc2tpbCA9IGZhbHNlOyB9XHJcblxyXG5cdFx0aWYob3B0aW9ucy5ub2lzZUludGVuc2l0eSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMubm9pc2VJbnRlbnNpdHkgPSAwLjU7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2NhbmxpbmVJbnRlbnNpdHkgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLnNjYW5saW5lSW50ZW5zaXR5ID0gMC4wNTsgfVxyXG5cdFx0aWYob3B0aW9ucy5ncmV5c2NhbGVJbnRlbnNpdHkgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLmdyZXlzY2FsZUludGVuc2l0eSA9IDEuMDsgfVxyXG5cdFx0aWYob3B0aW9ucy5zZXBpYUludGVuc2l0eSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuc2VwaWFJbnRlbnNpdHkgPSAxLjA7IH1cclxuXHJcblx0XHRpZihvcHRpb25zLnZpZ25ldHRlT2Zmc2V0ID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy52aWduZXR0ZU9mZnNldCA9IDEuMDsgfVxyXG5cdFx0aWYob3B0aW9ucy52aWduZXR0ZURhcmtuZXNzID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy52aWduZXR0ZURhcmtuZXNzID0gMS4wOyB9XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJGaWxtTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0aW1lOiBuZXcgVW5pZm9ybSgwLjApLFxyXG5cclxuXHRcdFx0XHRub2lzZUludGVuc2l0eTogbmV3IFVuaWZvcm0ob3B0aW9ucy5ub2lzZUludGVuc2l0eSksXHJcblx0XHRcdFx0c2NhbmxpbmVJbnRlbnNpdHk6IG5ldyBVbmlmb3JtKG9wdGlvbnMuc2NhbmxpbmVJbnRlbnNpdHkpLFxyXG5cdFx0XHRcdHNjYW5saW5lQ291bnQ6IG5ldyBVbmlmb3JtKDAuMCksXHJcblxyXG5cdFx0XHRcdGdyZXlzY2FsZUludGVuc2l0eTogbmV3IFVuaWZvcm0ob3B0aW9ucy5ncmV5c2NhbGVJbnRlbnNpdHkpLFxyXG5cdFx0XHRcdHNlcGlhSW50ZW5zaXR5OiBuZXcgVW5pZm9ybShvcHRpb25zLnNlcGlhSW50ZW5zaXR5KSxcclxuXHJcblx0XHRcdFx0dmlnbmV0dGVPZmZzZXQ6IG5ldyBVbmlmb3JtKG9wdGlvbnMudmlnbmV0dGVPZmZzZXQpLFxyXG5cdFx0XHRcdHZpZ25ldHRlRGFya25lc3M6IG5ldyBVbmlmb3JtKG9wdGlvbnMudmlnbmV0dGVEYXJrbmVzcylcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihvcHRpb25zLmdyZXlzY2FsZSkgeyB0aGlzLmRlZmluZXMuR1JFWVNDQUxFID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2VwaWEpIHsgdGhpcy5kZWZpbmVzLlNFUElBID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMudmlnbmV0dGUpIHsgdGhpcy5kZWZpbmVzLlZJR05FVFRFID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMuZXNraWwpIHsgdGhpcy5kZWZpbmVzLkVTS0lMID0gXCIxXCI7IH1cclxuXHJcblx0XHRpZihvcHRpb25zLnNjcmVlbk1vZGUpIHsgdGhpcy5kZWZpbmVzLlNDUkVFTl9NT0RFID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMubm9pc2UpIHsgdGhpcy5kZWZpbmVzLk5PSVNFID0gXCIxXCI7IH1cclxuXHRcdGlmKG9wdGlvbnMuc2NhbmxpbmVzKSB7IHRoaXMuZGVmaW5lcy5TQ0FOTElORVMgPSBcIjFcIjsgfVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdFBlcnR1cmI7XFxyXFxuXFxyXFxudW5pZm9ybSBib29sIGFjdGl2ZTtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IGFtb3VudDtcXHJcXG51bmlmb3JtIGZsb2F0IGFuZ2xlO1xcclxcbnVuaWZvcm0gZmxvYXQgc2VlZDtcXHJcXG51bmlmb3JtIGZsb2F0IHNlZWRYO1xcclxcbnVuaWZvcm0gZmxvYXQgc2VlZFk7XFxyXFxudW5pZm9ybSBmbG9hdCBkaXN0b3J0aW9uWDtcXHJcXG51bmlmb3JtIGZsb2F0IGRpc3RvcnRpb25ZO1xcclxcbnVuaWZvcm0gZmxvYXQgY29sUztcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbmZsb2F0IHJhbmQodmVjMiB0Yykge1xcclxcblxcclxcblxcdGNvbnN0IGZsb2F0IGEgPSAxMi45ODk4O1xcclxcblxcdGNvbnN0IGZsb2F0IGIgPSA3OC4yMzM7XFxyXFxuXFx0Y29uc3QgZmxvYXQgYyA9IDQzNzU4LjU0NTM7XFxyXFxuXFxyXFxuXFx0ZmxvYXQgZHQgPSBkb3QodGMsIHZlYzIoYSwgYikpO1xcclxcblxcdGZsb2F0IHNuID0gbW9kKGR0LCAzLjE0KTtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gZnJhY3Qoc2luKHNuKSAqIGMpO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiBjb29yZCA9IHZVdjtcXHJcXG5cXHJcXG5cXHRmbG9hdCB4cywgeXM7XFxyXFxuXFx0dmVjNCBub3JtYWw7XFxyXFxuXFxyXFxuXFx0dmVjMiBvZmZzZXQ7XFxyXFxuXFx0dmVjNCBjciwgY2dhLCBjYjtcXHJcXG5cXHR2ZWM0IHNub3csIGNvbG9yO1xcclxcblxcclxcblxcdGZsb2F0IHN4LCBzeTtcXHJcXG5cXHJcXG5cXHRpZihhY3RpdmUpIHtcXHJcXG5cXHJcXG5cXHRcXHR4cyA9IGZsb29yKGdsX0ZyYWdDb29yZC54IC8gMC41KTtcXHJcXG5cXHRcXHR5cyA9IGZsb29yKGdsX0ZyYWdDb29yZC55IC8gMC41KTtcXHJcXG5cXHJcXG5cXHRcXHRub3JtYWwgPSB0ZXh0dXJlMkQodFBlcnR1cmIsIGNvb3JkICogc2VlZCAqIHNlZWQpO1xcclxcblxcclxcblxcdFxcdGlmKGNvb3JkLnkgPCBkaXN0b3J0aW9uWCArIGNvbFMgJiYgY29vcmQueSA+IGRpc3RvcnRpb25YIC0gY29sUyAqIHNlZWQpIHtcXHJcXG5cXHJcXG5cXHRcXHRcXHRzeCA9IGNsYW1wKGNlaWwoc2VlZFgpLCAwLjAsIDEuMCk7XFxyXFxuXFx0XFx0XFx0Y29vcmQueSA9IHN4ICogKDEuMCAtIChjb29yZC55ICsgZGlzdG9ydGlvblkpKSArICgxLjAgLSBzeCkgKiBkaXN0b3J0aW9uWTtcXHJcXG5cXHJcXG5cXHRcXHR9XFxyXFxuXFxyXFxuXFx0XFx0aWYoY29vcmQueCA8IGRpc3RvcnRpb25ZICsgY29sUyAmJiBjb29yZC54ID4gZGlzdG9ydGlvblkgLSBjb2xTICogc2VlZCkge1xcclxcblxcclxcblxcdFxcdFxcdHN5ID0gY2xhbXAoY2VpbChzZWVkWSksIDAuMCwgMS4wKTtcXHJcXG5cXHRcXHRcXHRjb29yZC54ID0gc3kgKiBkaXN0b3J0aW9uWCArICgxLjAgLSBzeSkgKiAoMS4wIC0gKGNvb3JkLnggKyBkaXN0b3J0aW9uWCkpO1xcclxcblxcclxcblxcdFxcdH1cXHJcXG5cXHJcXG5cXHRcXHRjb29yZC54ICs9IG5vcm1hbC54ICogc2VlZFggKiAoc2VlZCAvIDUuMCk7XFxyXFxuXFx0XFx0Y29vcmQueSArPSBub3JtYWwueSAqIHNlZWRZICogKHNlZWQgLyA1LjApO1xcclxcblxcclxcblxcdFxcdG9mZnNldCA9IGFtb3VudCAqIHZlYzIoY29zKGFuZ2xlKSwgc2luKGFuZ2xlKSk7XFxyXFxuXFxyXFxuXFx0XFx0Y3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkICsgb2Zmc2V0KTtcXHJcXG5cXHRcXHRjZ2EgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkKTtcXHJcXG5cXHRcXHRjYiA9IHRleHR1cmUyRCh0RGlmZnVzZSwgY29vcmQgLSBvZmZzZXQpO1xcclxcblxcclxcblxcdFxcdGNvbG9yID0gdmVjNChjci5yLCBjZ2EuZywgY2IuYiwgY2dhLmEpO1xcclxcblxcdFxcdHNub3cgPSAyMDAuMCAqIGFtb3VudCAqIHZlYzQocmFuZCh2ZWMyKHhzICogc2VlZCwgeXMgKiBzZWVkICogNTAuMCkpICogMC4yKTtcXHJcXG5cXHRcXHRjb2xvciArPSBzbm93O1xcclxcblxcclxcblxcdH0gZWxzZSB7XFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcblxcdGdsX0ZyYWdDb2xvciA9IGNvbG9yO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIGdsaXRjaCBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIFJlZmVyZW5jZTpcclxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9zdGFmZmFudGFuL3VuaXR5Z2xpdGNoXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEdsaXRjaE1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGdsaXRjaCBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJHbGl0Y2hNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRQZXJ0dXJiOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHJcblx0XHRcdFx0YWN0aXZlOiBuZXcgVW5pZm9ybSgxKSxcclxuXHJcblx0XHRcdFx0YW1vdW50OiBuZXcgVW5pZm9ybSgwLjgpLFxyXG5cdFx0XHRcdGFuZ2xlOiBuZXcgVW5pZm9ybSgwLjAyKSxcclxuXHRcdFx0XHRzZWVkOiBuZXcgVW5pZm9ybSgwLjAyKSxcclxuXHRcdFx0XHRzZWVkWDogbmV3IFVuaWZvcm0oMC4wMiksXHJcblx0XHRcdFx0c2VlZFk6IG5ldyBVbmlmb3JtKDAuMDIpLFxyXG5cdFx0XHRcdGRpc3RvcnRpb25YOiBuZXcgVW5pZm9ybSgwLjUpLFxyXG5cdFx0XHRcdGRpc3RvcnRpb25ZOiBuZXcgVW5pZm9ybSgwLjYpLFxyXG5cdFx0XHRcdGNvbFM6IG5ldyBVbmlmb3JtKDAuMDUpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0gfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIHZlYzMgbGlnaHRQb3NpdGlvbjtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IGV4cG9zdXJlO1xcclxcbnVuaWZvcm0gZmxvYXQgZGVjYXk7XFxyXFxudW5pZm9ybSBmbG9hdCBkZW5zaXR5O1xcclxcbnVuaWZvcm0gZmxvYXQgd2VpZ2h0O1xcclxcbnVuaWZvcm0gZmxvYXQgY2xhbXBNYXg7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dmVjMiB0ZXhDb29yZCA9IHZVdjtcXHJcXG5cXHJcXG5cXHQvLyBDYWxjdWxhdGUgdmVjdG9yIGZyb20gcGl4ZWwgdG8gbGlnaHQgc291cmNlIGluIHNjcmVlbiBzcGFjZS5cXHJcXG5cXHR2ZWMyIGRlbHRhVGV4Q29vcmQgPSB0ZXhDb29yZCAtIGxpZ2h0UG9zaXRpb24uc3Q7XFxyXFxuXFx0ZGVsdGFUZXhDb29yZCAqPSAxLjAgLyBOVU1fU0FNUExFU19GTE9BVCAqIGRlbnNpdHk7XFxyXFxuXFxyXFxuXFx0Ly8gQSBkZWNyZWFzaW5nIGlsbHVtaW5hdGlvbiBmYWN0b3IuXFxyXFxuXFx0ZmxvYXQgaWxsdW1pbmF0aW9uRGVjYXkgPSAxLjA7XFxyXFxuXFxyXFxuXFx0dmVjNCBzYW1wbGU7XFxyXFxuXFx0dmVjNCBjb2xvciA9IHZlYzQoMC4wKTtcXHJcXG5cXHJcXG5cXHQvLyBFc3RpbWF0ZSB0aGUgcHJvYmFiaWxpdHkgb2Ygb2NjbHVzaW9uIGF0IGVhY2ggcGl4ZWwgYnkgc3VtbWluZyBzYW1wbGVzIGFsb25nIGEgcmF5IHRvIHRoZSBsaWdodCBzb3VyY2UuXFxyXFxuXFx0Zm9yKGludCBpID0gMDsgaSA8IE5VTV9TQU1QTEVTX0lOVDsgKytpKSB7XFxyXFxuXFxyXFxuXFx0XFx0dGV4Q29vcmQgLT0gZGVsdGFUZXhDb29yZDtcXHJcXG5cXHRcXHRzYW1wbGUgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHRleENvb3JkKTtcXHJcXG5cXHJcXG5cXHRcXHQvLyBBcHBseSBzYW1wbGUgYXR0ZW51YXRpb24gc2NhbGUvZGVjYXkgZmFjdG9ycy5cXHJcXG5cXHRcXHRzYW1wbGUgKj0gaWxsdW1pbmF0aW9uRGVjYXkgKiB3ZWlnaHQ7XFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IgKz0gc2FtcGxlO1xcclxcblxcclxcblxcdFxcdC8vIFVwZGF0ZSBleHBvbmVudGlhbCBkZWNheSBmYWN0b3IuXFxyXFxuXFx0XFx0aWxsdW1pbmF0aW9uRGVjYXkgKj0gZGVjYXk7XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcblxcdGdsX0ZyYWdDb2xvciA9IGNsYW1wKGNvbG9yICogZXhwb3N1cmUsIDAuMCwgY2xhbXBNYXgpO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBBIGNyZXB1c2N1bGFyIHJheXMgc2hhZGVyIG1hdGVyaWFsLlxyXG4gKlxyXG4gKiBSZWZlcmVuY2VzOlxyXG4gKlxyXG4gKiBUaGliYXV0IERlc3BvdWxhaW4sIDIwMTI6XHJcbiAqICBbKFdlYkdMKSBWb2x1bWV0cmljIExpZ2h0IEFwcHJveGltYXRpb24gaW4gVGhyZWUuanNdKFxyXG4gKiAgaHR0cDovL2JrY29yZS5jb20vYmxvZy8zZC93ZWJnbC10aHJlZS1qcy12b2x1bWV0cmljLWxpZ2h0LWdvZHJheXMuaHRtbClcclxuICpcclxuICogTnZpZGlhLCBHUFUgR2VtcyAzLCAyMDA4OlxyXG4gKiAgW0NoYXB0ZXIgMTMuIFZvbHVtZXRyaWMgTGlnaHQgU2NhdHRlcmluZyBhcyBhIFBvc3QtUHJvY2Vzc10oXHJcbiAqICBodHRwczovL2RldmVsb3Blci5udmlkaWEuY29tL2dwdWdlbXMvR1BVR2VtczMvZ3B1Z2VtczNfY2gxMy5odG1sKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHb2RSYXlzTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZ29kIHJheXMgbWF0ZXJpYWwuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiR29kUmF5c01hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHRkZWZpbmVzOiB7XHJcblxyXG5cdFx0XHRcdE5VTV9TQU1QTEVTX0ZMT0FUOiBcIjYwLjBcIixcclxuXHRcdFx0XHROVU1fU0FNUExFU19JTlQ6IFwiNjBcIlxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRsaWdodFBvc2l0aW9uOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHJcblx0XHRcdFx0ZXhwb3N1cmU6IG5ldyBVbmlmb3JtKDAuNiksXHJcblx0XHRcdFx0ZGVjYXk6IG5ldyBVbmlmb3JtKDAuOTMpLFxyXG5cdFx0XHRcdGRlbnNpdHk6IG5ldyBVbmlmb3JtKDAuOTYpLFxyXG5cdFx0XHRcdHdlaWdodDogbmV3IFVuaWZvcm0oMC40KSxcclxuXHRcdFx0XHRjbGFtcE1heDogbmV3IFVuaWZvcm0oMS4wKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBmbG9hdCBkaXN0aW5jdGlvbjtcXHJcXG51bmlmb3JtIHZlYzIgcmFuZ2U7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0Y29uc3QgdmVjNCBMVU1fQ09FRkYgPSB2ZWM0KDAuMjk5LCAwLjU4NywgMC4xMTQsIDAuMCk7XFxyXFxuXFxyXFxuXFx0dmVjNCB0ZXhlbCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KTtcXHJcXG5cXHRmbG9hdCB2ID0gZG90KHRleGVsLCBMVU1fQ09FRkYpO1xcclxcblxcclxcblxcdCNpZmRlZiBSQU5HRVxcclxcblxcclxcblxcdFxcdGZsb2F0IGxvdyA9IHN0ZXAocmFuZ2UueCwgdik7XFxyXFxuXFx0XFx0ZmxvYXQgaGlnaCA9IHN0ZXAodiwgcmFuZ2UueSk7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gQXBwbHkgdGhlIG1hc2suXFxyXFxuXFx0XFx0diAqPSBsb3cgKiBoaWdoO1xcclxcblxcclxcblxcdCNlbmRpZlxcclxcblxcclxcblxcdHYgPSBwb3coYWJzKHYpLCBkaXN0aW5jdGlvbik7XFxyXFxuXFxyXFxuXFx0I2lmZGVmIENPTE9SXFxyXFxuXFxyXFxuXFx0XFx0Z2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXhlbC5yZ2IgKiB2LCB0ZXhlbC5hKTtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdGdsX0ZyYWdDb2xvciA9IHZlYzQodiwgdiwgdiwgdGV4ZWwuYSk7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5jb25zdCB2ZXJ0ZXggPSBcInZhcnlpbmcgdmVjMiB2VXY7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbHVtaW5vc2l0eSBzaGFkZXIgbWF0ZXJpYWwuXHJcbiAqXHJcbiAqIFRoaXMgc2hhZGVyIHByb2R1Y2VzIGEgZ3JleXNjYWxlIGx1bWluYW5jZSBtYXAuIEl0IGNhbiBhbHNvIGJlIGNvbmZpZ3VyZWQgdG9cclxuICogb3V0cHV0IGNvbG91cnMgdGhhdCBhcmUgc2NhbGVkIHdpdGggdGhlaXIgcmVzcGVjdGl2ZSBsdW1pbmFuY2UgdmFsdWUuXHJcbiAqIEFkZGl0aW9uYWxseSwgYSByYW5nZSBtYXkgYmUgcHJvdmlkZWQgdG8gbWFzayBvdXQgdW5kZXNpcmVkIHRleGVscy5cclxuICpcclxuICogVGhlIGFscGhhIGNoYW5uZWwgd2lsbCByZW1haW4gdW5hZmZlY3RlZCBpbiBhbGwgY2FzZXMuXHJcbiAqXHJcbiAqIEx1bWluYW5jZSByYW5nZSByZWZlcmVuY2U6XHJcbiAqICBodHRwczovL2N5Y2xpbmc3NC5jb20vMjAwNy8wNS8yMy95b3VyLWZpcnN0LXNoYWRlci8jLlZ0eTlGZmtyTDRaXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEx1bWlub3NpdHlNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBsdW1pbm9zaXR5IG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbY29sb3I9ZmFsc2VdIC0gRGVmaW5lcyB3aGV0aGVyIHRoZSBzaGFkZXIgc2hvdWxkIG91dHB1dCBjb2xvdXJzIHNjYWxlZCB3aXRoIHRoZWlyIGx1bWluYW5jZSB2YWx1ZS5cclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjJ9IFtyYW5nZV0gLSBJZiBwcm92aWRlZCwgdGhlIHNoYWRlciB3aWxsIG1hc2sgb3V0IHRleGVscyB0aGF0IGFyZW4ndCBpbiB0aGUgc3BlY2lmaWVkIGx1bWluYW5jZSByYW5nZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY29sb3IgPSBmYWxzZSwgcmFuZ2UgPSBudWxsKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJMdW1pbm9zaXR5TWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRkaXN0aW5jdGlvbjogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRyYW5nZTogbmV3IFVuaWZvcm0oKHJhbmdlICE9PSBudWxsKSA/IHJhbmdlIDogbmV3IFZlY3RvcjIoKSlcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYoY29sb3IpIHsgdGhpcy5kZWZpbmVzLkNPTE9SID0gXCIxXCI7IH1cclxuXHRcdGlmKHJhbmdlICE9PSBudWxsKSB7IHRoaXMuZGVmaW5lcy5SQU5HRSA9IFwiMVwiOyB9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2hhZGVyTWF0ZXJpYWwsIFVuaWZvcm0sIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIGZsb2F0IGdyYW51bGFyaXR5O1xcclxcbnVuaWZvcm0gZmxvYXQgZHg7XFxyXFxudW5pZm9ybSBmbG9hdCBkeTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHRleGVsO1xcclxcblxcclxcblxcdGlmKGdyYW51bGFyaXR5ID4gMC4wKSB7XFxyXFxuXFxyXFxuXFx0XFx0dmVjMiBjb29yZCA9IHZlYzIoXFxyXFxuXFx0XFx0XFx0ZHggKiAoZmxvb3IodlV2LnggLyBkeCkgKyAwLjUpLFxcclxcblxcdFxcdFxcdGR5ICogKGZsb29yKHZVdi55IC8gZHkpICsgMC41KVxcclxcblxcdFxcdCk7XFxyXFxuXFxyXFxuXFx0XFx0dGV4ZWwgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkKTtcXHJcXG5cXHJcXG5cXHR9IGVsc2Uge1xcclxcblxcclxcblxcdFxcdHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB0ZXhlbDtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBwaXhlbGF0aW9uIHNoYWRlciBtYXRlcmlhbC5cclxuICpcclxuICogT3JpZ2luYWwgc2hhZGVyIGNvZGUgYnkgUm9iZXJ0IENhc2Fub3ZhOlxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL3JvYmVydGNhc2Fub3ZhL3BpeGVsYXRlLXNoYWRlclxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQaXhlbGF0aW9uTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcGl4ZWxhdGlvbiBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJQaXhlbGF0aW9uTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRncmFudWxhcml0eTogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRyZXNvbHV0aW9uOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigxLjAsIDEuMCkpLFxyXG5cdFx0XHRcdGR4OiBuZXcgVW5pZm9ybSgxLjApLFxyXG5cdFx0XHRcdGR5OiBuZXcgVW5pZm9ybSgxLjApXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHBpeGVsIGdyYW51bGFyaXR5LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0Z2V0IGdyYW51bGFyaXR5KCkgeyByZXR1cm4gdGhpcy51bmlmb3Jtcy5ncmFudWxhcml0eS52YWx1ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGhpZ2hlciB2YWx1ZSB5aWVsZHMgY29hcnNlciB2aXN1YWxzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IGdyYW51bGFyaXR5KHgpIHtcclxuXHJcblx0XHRjb25zdCB1bmlmb3JtcyA9IHRoaXMudW5pZm9ybXM7XHJcblx0XHRjb25zdCByZXNvbHV0aW9uID0gdW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZTtcclxuXHJcblx0XHR1bmlmb3Jtcy5ncmFudWxhcml0eS52YWx1ZSA9IHg7XHJcblx0XHR1bmlmb3Jtcy5keC52YWx1ZSA9IHggLyByZXNvbHV0aW9uLng7XHJcblx0XHR1bmlmb3Jtcy5keS52YWx1ZSA9IHggLyByZXNvbHV0aW9uLnk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgcmVzb2x1dGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0UmVzb2x1dGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlLnNldCh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMuZ3JhbnVsYXJpdHkgPSB0aGlzLmdyYW51bGFyaXR5O1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNoYWRlck1hdGVyaWFsLCBVbmlmb3JtLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IFwiI2luY2x1ZGUgPGNvbW1vbj5cXHJcXG5cXHJcXG51bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcXHJcXG51bmlmb3JtIHZlYzIgY2VudGVyO1xcclxcbnVuaWZvcm0gZmxvYXQgYXNwZWN0O1xcclxcbnVuaWZvcm0gZmxvYXQgd2F2ZVNpemU7XFxyXFxudW5pZm9ybSBmbG9hdCByYWRpdXM7XFxyXFxudW5pZm9ybSBmbG9hdCBtYXhSYWRpdXM7XFxyXFxudW5pZm9ybSBmbG9hdCBhbXBsaXR1ZGU7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG52YXJ5aW5nIGZsb2F0IHZTaXplO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGFzcGVjdENvcnJlY3Rpb24gPSB2ZWMyKGFzcGVjdCwgMS4wKTtcXHJcXG5cXHJcXG5cXHR2ZWMyIGRpZmZlcmVuY2UgPSB2VXYgKiBhc3BlY3RDb3JyZWN0aW9uIC0gY2VudGVyICogYXNwZWN0Q29ycmVjdGlvbjtcXHJcXG5cXHRmbG9hdCBkaXN0YW5jZSA9IHNxcnQoZG90KGRpZmZlcmVuY2UsIGRpZmZlcmVuY2UpKSAqIHZTaXplO1xcclxcblxcclxcblxcdHZlYzIgZGlzcGxhY2VtZW50ID0gdmVjMigwLjApO1xcclxcblxcclxcblxcdGlmKGRpc3RhbmNlID4gcmFkaXVzKSB7XFxyXFxuXFxyXFxuXFx0XFx0aWYoZGlzdGFuY2UgPCByYWRpdXMgKyB3YXZlU2l6ZSkge1xcclxcblxcclxcblxcdFxcdFxcdGZsb2F0IGFuZ2xlID0gKGRpc3RhbmNlIC0gcmFkaXVzKSAqIFBJMiAvIHdhdmVTaXplO1xcclxcblxcdFxcdFxcdGZsb2F0IGNvc1NpbiA9ICgxLjAgLSBjb3MoYW5nbGUpKSAqIDAuNTtcXHJcXG5cXHJcXG5cXHRcXHRcXHRmbG9hdCBleHRlbnQgPSBtYXhSYWRpdXMgKyB3YXZlU2l6ZTtcXHJcXG5cXHRcXHRcXHRmbG9hdCBkZWNheSA9IG1heChleHRlbnQgLSBkaXN0YW5jZSAqIGRpc3RhbmNlLCAwLjApIC8gZXh0ZW50O1xcclxcblxcclxcblxcdFxcdFxcdGRpc3BsYWNlbWVudCA9ICgoY29zU2luICogYW1wbGl0dWRlICogZGlmZmVyZW5jZSkgLyBkaXN0YW5jZSkgKiBkZWNheTtcXHJcXG5cXHJcXG5cXHRcXHR9XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcblxcdGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2IC0gZGlzcGxhY2VtZW50KTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSBmbG9hdCBzaXplO1xcclxcbnVuaWZvcm0gZmxvYXQgc2NhbGU7XFxyXFxudW5pZm9ybSBmbG9hdCBjYW1lcmFEaXN0YW5jZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcbnZhcnlpbmcgZmxvYXQgdlNpemU7XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZVdiA9IHV2O1xcclxcblxcdHZTaXplID0gKDAuMSAqIGNhbWVyYURpc3RhbmNlKSAvIHNpemU7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogQSBzaG9jayB3YXZlIHNoYWRlciBtYXRlcmlhbC5cclxuICpcclxuICogQmFzZWQgb24gYSBHaXN0IGJ5IEplYW4tUGhpbGlwcGUgU2FyZGE6XHJcbiAqICBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qcHNhcmRhLzMzY2VhNjdhOWYyZWNiMGEwZWRhXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNob2NrV2F2ZU1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHNob2NrIHdhdmUgbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndhdmVTaXplPTAuMl0gLSBUaGUgd2F2ZSBzaXplLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5hbXBsaXR1ZGU9MC4wNV0gLSBUaGUgZGlzdG9ydGlvbiBhbXBsaXR1ZGUuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdGlmKG9wdGlvbnMubWF4UmFkaXVzID09PSB1bmRlZmluZWQpIHsgb3B0aW9ucy5tYXhSYWRpdXMgPSAxLjA7IH1cclxuXHRcdGlmKG9wdGlvbnMud2F2ZVNpemUgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLndhdmVTaXplID0gMC4yOyB9XHJcblx0XHRpZihvcHRpb25zLmFtcGxpdHVkZSA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuYW1wbGl0dWRlID0gMC4wNTsgfVxyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiU2hvY2tXYXZlTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHJcblx0XHRcdFx0Y2VudGVyOiBuZXcgVW5pZm9ybShuZXcgVmVjdG9yMigwLjUsIDAuNSkpLFxyXG5cdFx0XHRcdGFzcGVjdDogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRjYW1lcmFEaXN0YW5jZTogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHJcblx0XHRcdFx0c2l6ZTogbmV3IFVuaWZvcm0oMS4wKSxcclxuXHRcdFx0XHRyYWRpdXM6IG5ldyBVbmlmb3JtKC1vcHRpb25zLndhdmVTaXplKSxcclxuXHRcdFx0XHRtYXhSYWRpdXM6IG5ldyBVbmlmb3JtKG9wdGlvbnMubWF4UmFkaXVzKSxcclxuXHRcdFx0XHR3YXZlU2l6ZTogbmV3IFVuaWZvcm0ob3B0aW9ucy53YXZlU2l6ZSksXHJcblx0XHRcdFx0YW1wbGl0dWRlOiBuZXcgVW5pZm9ybShvcHRpb25zLmFtcGxpdHVkZSlcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHRXZWlnaHRzO1xcclxcblxcclxcbnVuaWZvcm0gdmVjMiB0ZXhlbFNpemU7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG52YXJ5aW5nIHZlYzQgdk9mZnNldDtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0Ly8gRmV0Y2ggdGhlIGJsZW5kaW5nIHdlaWdodHMgZm9yIGN1cnJlbnQgcGl4ZWwuXFxyXFxuXFx0dmVjNCBhO1xcclxcblxcdGEueHogPSB0ZXh0dXJlMkQodFdlaWdodHMsIHZVdikueHo7XFxyXFxuXFx0YS55ID0gdGV4dHVyZTJEKHRXZWlnaHRzLCB2T2Zmc2V0Lnp3KS5nO1xcclxcblxcdGEudyA9IHRleHR1cmUyRCh0V2VpZ2h0cywgdk9mZnNldC54eSkuYTtcXHJcXG5cXHJcXG5cXHR2ZWM0IGNvbG9yO1xcclxcblxcclxcblxcdC8vIENoZWNrIGlmIHRoZXJlIGlzIGFueSBibGVuZGluZyB3ZWlnaHQgd2l0aCBhIHZhbHVlIGdyZWF0ZXIgdGhhbiAwLjAuXFxyXFxuXFx0aWYoZG90KGEsIHZlYzQoMS4wKSkgPCAxZS01KSB7XFxyXFxuXFxyXFxuXFx0XFx0Y29sb3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiwgMC4wKTtcXHJcXG5cXHJcXG5cXHR9IGVsc2Uge1xcclxcblxcclxcblxcdFxcdC8qIFVwIHRvIGZvdXIgbGluZXMgY2FuIGJlIGNyb3NzaW5nIGEgcGl4ZWwgKG9uZSB0aHJvdWdoIGVhY2ggZWRnZSkuIFdlIGZhdm9yXFxyXFxuXFx0XFx0ICogYmxlbmRpbmcgYnkgY2hvb3NpbmcgdGhlIGxpbmUgd2l0aCB0aGUgbWF4aW11bSB3ZWlnaHQgZm9yIGVhY2ggZGlyZWN0aW9uLlxcclxcblxcdFxcdCAqL1xcclxcblxcclxcblxcdFxcdHZlYzIgb2Zmc2V0O1xcclxcblxcdFxcdG9mZnNldC54ID0gYS5hID4gYS5iID8gYS5hIDogLWEuYjsgLy8gTGVmdCB2cy4gcmlnaHQuXFxyXFxuXFx0XFx0b2Zmc2V0LnkgPSBhLmcgPiBhLnIgPyAtYS5nIDogYS5yOyAvLyBUb3AgdnMuIGJvdHRvbSAoY2hhbmdlZCBzaWducykuXFxyXFxuXFxyXFxuXFx0XFx0Ly8gVGhlbiB3ZSBnbyBpbiB0aGUgZGlyZWN0aW9uIHRoYXQgaGFzIHRoZSBtYXhpbXVtIHdlaWdodCAoaG9yaXpvbnRhbCB2cy4gdmVydGljYWwpLlxcclxcblxcdFxcdGlmKGFicyhvZmZzZXQueCkgPiBhYnMob2Zmc2V0LnkpKSB7XFxyXFxuXFxyXFxuXFx0XFx0XFx0b2Zmc2V0LnkgPSAwLjA7XFxyXFxuXFxyXFxuXFx0XFx0fSBlbHNlIHtcXHJcXG5cXHJcXG5cXHRcXHRcXHRvZmZzZXQueCA9IDAuMDtcXHJcXG5cXHJcXG5cXHRcXHR9XFxyXFxuXFxyXFxuXFx0XFx0Ly8gRmV0Y2ggdGhlIG9wcG9zaXRlIGNvbG9yIGFuZCBsZXJwIGJ5IGhhbmQuXFxyXFxuXFx0XFx0Y29sb3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiwgMC4wKTtcXHJcXG5cXHRcXHR2ZWMyIGNvb3JkID0gdlV2ICsgc2lnbihvZmZzZXQpICogdGV4ZWxTaXplO1xcclxcblxcdFxcdHZlYzQgb3Bwb3NpdGVDb2xvciA9IHRleHR1cmUyRCh0RGlmZnVzZSwgY29vcmQsIDAuMCk7XFxyXFxuXFx0XFx0ZmxvYXQgcyA9IGFicyhvZmZzZXQueCkgPiBhYnMob2Zmc2V0LnkpID8gYWJzKG9mZnNldC54KSA6IGFicyhvZmZzZXQueSk7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gR2FtbWEgY29ycmVjdGlvbi5cXHJcXG5cXHRcXHRjb2xvci5yZ2IgPSBwb3coYWJzKGNvbG9yLnJnYiksIHZlYzMoMi4yKSk7XFxyXFxuXFx0XFx0b3Bwb3NpdGVDb2xvci5yZ2IgPSBwb3coYWJzKG9wcG9zaXRlQ29sb3IucmdiKSwgdmVjMygyLjIpKTtcXHJcXG5cXHRcXHRjb2xvciA9IG1peChjb2xvciwgb3Bwb3NpdGVDb2xvciwgcyk7XFxyXFxuXFx0XFx0Y29sb3IucmdiID0gcG93KGFicyhjb2xvci5yZ2IpLCB2ZWMzKDEuMCAvIDIuMikpO1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcbnZhcnlpbmcgdmVjNCB2T2Zmc2V0O1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHJcXG5cXHR2T2Zmc2V0ID0gdXYueHl4eSArIHRleGVsU2l6ZS54eXh5ICogdmVjNCgxLjAsIDAuMCwgMC4wLCAtMS4wKTsgLy8gQ2hhbmdlZCBzaWduIGluIFcgY29tcG9uZW50LlxcclxcblxcclxcblxcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxyXFxuXFxyXFxufVxcclxcblwiO1xyXG5cclxuLyoqXHJcbiAqIFN1YnBpeGVsIE1vcnBob2xvZ2ljYWwgQW50aWFsaWFzaW5nLlxyXG4gKlxyXG4gKiBUaGlzIG1hdGVyaWFsIGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBmaW5hbCBhbnRpYWxpYXNpbmcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNNQUFCbGVuZE1hdGVyaWFsIGV4dGVuZHMgU2hhZGVyTWF0ZXJpYWwge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IFNNQUEgYmxlbmQgbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjJ9IFt0ZXhlbFNpemVdIC0gVGhlIGFic29sdXRlIHNjcmVlbiB0ZXhlbCBzaXplLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0ZXhlbFNpemUgPSBuZXcgVmVjdG9yMigpKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJTTUFBQmxlbmRNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0dW5pZm9ybXM6IHtcclxuXHJcblx0XHRcdFx0dERpZmZ1c2U6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRXZWlnaHRzOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0ZXhlbFNpemU6IG5ldyBVbmlmb3JtKHRleGVsU2l6ZSlcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxudmFyeWluZyB2ZWM0IHZPZmZzZXRbM107XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdGNvbnN0IHZlYzIgVEhSRVNIT0xEID0gdmVjMihFREdFX1RIUkVTSE9MRCk7XFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRlIGNvbG9yIGRlbHRhcy5cXHJcXG5cXHR2ZWM0IGRlbHRhO1xcclxcblxcdHZlYzMgYyA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2KS5yZ2I7XFxyXFxuXFxyXFxuXFx0dmVjMyBjTGVmdCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdk9mZnNldFswXS54eSkucmdiO1xcclxcblxcdHZlYzMgdCA9IGFicyhjIC0gY0xlZnQpO1xcclxcblxcdGRlbHRhLnggPSBtYXgobWF4KHQuciwgdC5nKSwgdC5iKTtcXHJcXG5cXHJcXG5cXHR2ZWMzIGNUb3AgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZPZmZzZXRbMF0uencpLnJnYjtcXHJcXG5cXHR0ID0gYWJzKGMgLSBjVG9wKTtcXHJcXG5cXHRkZWx0YS55ID0gbWF4KG1heCh0LnIsIHQuZyksIHQuYik7XFxyXFxuXFxyXFxuXFx0Ly8gV2UgZG8gdGhlIHVzdWFsIHRocmVzaG9sZC5cXHJcXG5cXHR2ZWMyIGVkZ2VzID0gc3RlcChUSFJFU0hPTEQsIGRlbHRhLnh5KTtcXHJcXG5cXHJcXG5cXHQvLyBUaGVuIGRpc2NhcmQgaWYgdGhlcmUgaXMgbm8gZWRnZS5cXHJcXG5cXHRpZihkb3QoZWRnZXMsIHZlYzIoMS4wKSkgPT0gMC4wKSB7XFxyXFxuXFxyXFxuXFx0XFx0ZGlzY2FyZDtcXHJcXG5cXHJcXG5cXHR9XFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRlIHJpZ2h0IGFuZCBib3R0b20gZGVsdGFzLlxcclxcblxcdHZlYzMgY1JpZ2h0ID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2T2Zmc2V0WzFdLnh5KS5yZ2I7XFxyXFxuXFx0dCA9IGFicyhjIC0gY1JpZ2h0KTtcXHJcXG5cXHRkZWx0YS56ID0gbWF4KG1heCh0LnIsIHQuZyksIHQuYik7XFxyXFxuXFxyXFxuXFx0dmVjMyBjQm90dG9tICA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdk9mZnNldFsxXS56dykucmdiO1xcclxcblxcdHQgPSBhYnMoYyAtIGNCb3R0b20pO1xcclxcblxcdGRlbHRhLncgPSBtYXgobWF4KHQuciwgdC5nKSwgdC5iKTtcXHJcXG5cXHJcXG5cXHQvLyBDYWxjdWxhdGUgdGhlIG1heGltdW0gZGVsdGEgaW4gdGhlIGRpcmVjdCBuZWlnaGJvcmhvb2QuXFxyXFxuXFx0ZmxvYXQgbWF4RGVsdGEgPSBtYXgobWF4KG1heChkZWx0YS54LCBkZWx0YS55KSwgZGVsdGEueiksIGRlbHRhLncpO1xcclxcblxcclxcblxcdC8vIENhbGN1bGF0ZSBsZWZ0LWxlZnQgYW5kIHRvcC10b3AgZGVsdGFzLlxcclxcblxcdHZlYzMgY0xlZnRMZWZ0ICA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdk9mZnNldFsyXS54eSkucmdiO1xcclxcblxcdHQgPSBhYnMoYyAtIGNMZWZ0TGVmdCk7XFxyXFxuXFx0ZGVsdGEueiA9IG1heChtYXgodC5yLCB0LmcpLCB0LmIpO1xcclxcblxcclxcblxcdHZlYzMgY1RvcFRvcCA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdk9mZnNldFsyXS56dykucmdiO1xcclxcblxcdHQgPSBhYnMoYyAtIGNUb3BUb3ApO1xcclxcblxcdGRlbHRhLncgPSBtYXgobWF4KHQuciwgdC5nKSwgdC5iKTtcXHJcXG5cXHJcXG5cXHQvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG1heGltdW0gZGVsdGEuXFxyXFxuXFx0bWF4RGVsdGEgPSBtYXgobWF4KG1heERlbHRhLCBkZWx0YS56KSwgZGVsdGEudyk7XFxyXFxuXFxyXFxuXFx0Ly8gTG9jYWwgY29udHJhc3QgYWRhcHRhdGlvbiBpbiBhY3Rpb24uXFxyXFxuXFx0ZWRnZXMueHkgKj0gc3RlcCgwLjUgKiBtYXhEZWx0YSwgZGVsdGEueHkpO1xcclxcblxcclxcblxcdGdsX0ZyYWdDb2xvciA9IHZlYzQoZWRnZXMsIDAuMCwgMC4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidW5pZm9ybSB2ZWMyIHRleGVsU2l6ZTtcXHJcXG5cXHJcXG52YXJ5aW5nIHZlYzIgdlV2O1xcclxcbnZhcnlpbmcgdmVjNCB2T2Zmc2V0WzNdO1xcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2VXYgPSB1djtcXHJcXG5cXHJcXG5cXHR2T2Zmc2V0WzBdID0gdXYueHl4eSArIHRleGVsU2l6ZS54eXh5ICogdmVjNCgtMS4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gQ2hhbmdlZCBzaWduIGluIFcgY29tcG9uZW50LlxcclxcblxcdHZPZmZzZXRbMV0gPSB1di54eXh5ICsgdGV4ZWxTaXplLnh5eHkgKiB2ZWM0KDEuMCwgMC4wLCAwLjAsIC0xLjApOyAvLyBDaGFuZ2VkIHNpZ24gaW4gVyBjb21wb25lbnQuXFxyXFxuXFx0dk9mZnNldFsyXSA9IHV2Lnh5eHkgKyB0ZXhlbFNpemUueHl4eSAqIHZlYzQoLTIuMCwgMC4wLCAwLjAsIDIuMCk7IC8vIENoYW5nZWQgc2lnbiBpbiBXIGNvbXBvbmVudC5cXHJcXG5cXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBTdWJwaXhlbCBNb3JwaG9sb2dpY2FsIEFudGlhbGlhc2luZy5cclxuICpcclxuICogVGhpcyBtYXRlcmlhbCBkZXRlY3RzIGVkZ2VzIGluIGEgY29sb3IgdGV4dHVyZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU01BQUNvbG9yRWRnZXNNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBTTUFBIGNvbG9yIGVkZ2VzIG1hdGVyaWFsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtWZWN0b3IyfSBbdGV4ZWxTaXplXSAtIFRoZSBhYnNvbHV0ZSBzY3JlZW4gdGV4ZWwgc2l6ZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IodGV4ZWxTaXplID0gbmV3IFZlY3RvcjIoKSkge1xyXG5cclxuXHRcdHN1cGVyKHtcclxuXHJcblx0XHRcdHR5cGU6IFwiU01BQUNvbG9yRWRnZXNNYXRlcmlhbFwiLFxyXG5cclxuXHRcdFx0ZGVmaW5lczoge1xyXG5cclxuXHRcdFx0XHRFREdFX1RIUkVTSE9MRDogXCIwLjFcIlxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHR0ZXhlbFNpemU6IG5ldyBVbmlmb3JtKHRleGVsU2l6ZSlcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnQsXHJcblx0XHRcdHZlcnRleFNoYWRlcjogdmVydGV4LFxyXG5cclxuXHRcdFx0ZGVwdGhXcml0ZTogZmFsc2UsXHJcblx0XHRcdGRlcHRoVGVzdDogZmFsc2VcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSwgVmVjdG9yMiB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IGFyZWFJbWFnZSBmcm9tIFwiLi9pbWFnZXMvc21hYS9hcmVhLWltYWdlLmpzXCI7XHJcbmltcG9ydCBzZWFyY2hJbWFnZSBmcm9tIFwiLi9pbWFnZXMvc21hYS9zZWFyY2gtaW1hZ2UuanNcIjtcclxuXHJcbmNvbnN0IGZyYWdtZW50ID0gXCIjZGVmaW5lIHNhbXBsZUxldmVsWmVyb09mZnNldCh0LCBjb29yZCwgb2Zmc2V0KSB0ZXh0dXJlMkQodCwgY29vcmQgKyBmbG9hdChvZmZzZXQpICogdGV4ZWxTaXplLCAwLjApXFxyXFxuXFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdEFyZWE7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdFNlYXJjaDtcXHJcXG5cXHJcXG51bmlmb3JtIHZlYzIgdGV4ZWxTaXplO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxudmFyeWluZyB2ZWM0IHZPZmZzZXRbM107XFxyXFxudmFyeWluZyB2ZWMyIHZQaXhDb29yZDtcXHJcXG5cXHJcXG52ZWMyIHJvdW5kKHZlYzIgeCkge1xcclxcblxcclxcblxcdHJldHVybiBzaWduKHgpICogZmxvb3IoYWJzKHgpICsgMC41KTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuZmxvYXQgc2VhcmNoTGVuZ3RoKHZlYzIgZSwgZmxvYXQgYmlhcywgZmxvYXQgc2NhbGUpIHtcXHJcXG5cXHJcXG5cXHQvLyBOb3QgcmVxdWlyZWQgaWYgdFNlYXJjaCBhY2Nlc3NlcyBhcmUgc2V0IHRvIHBvaW50LlxcclxcblxcdC8vIGNvbnN0IHZlYzIgU0VBUkNIX1RFWF9QSVhFTF9TSVpFID0gMS4wIC8gdmVjMig2Ni4wLCAzMy4wKTtcXHJcXG5cXHQvLyBlID0gdmVjMihiaWFzLCAwLjApICsgMC41ICogU0VBUkNIX1RFWF9QSVhFTF9TSVpFICsgZSAqIHZlYzIoc2NhbGUsIDEuMCkgKiB2ZWMyKDY0LjAsIDMyLjApICogU0VBUkNIX1RFWF9QSVhFTF9TSVpFO1xcclxcblxcclxcblxcdGUuciA9IGJpYXMgKyBlLnIgKiBzY2FsZTtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gMjU1LjAgKiB0ZXh0dXJlMkQodFNlYXJjaCwgZSwgMC4wKS5yO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCBzZWFyY2hYTGVmdCh2ZWMyIHRleENvb3JkLCBmbG9hdCBlbmQpIHtcXHJcXG5cXHJcXG5cXHQvKiBAUFNFVURPX0dBVEhFUjRcXHJcXG5cXHQgKiBUaGlzIHRleENvb3JkIGhhcyBiZWVuIG9mZnNldCBieSAoLTAuMjUsIC0wLjEyNSkgaW4gdGhlIHZlcnRleCBzaGFkZXIgdG9cXHJcXG5cXHQgKiBzYW1wbGUgYmV0d2VlbiBlZGdlLCB0aHVzIGZldGNoaW5nIGZvdXIgZWRnZXMgaW4gYSByb3cuXFxyXFxuXFx0ICogU2FtcGxpbmcgd2l0aCBkaWZmZXJlbnQgb2Zmc2V0cyBpbiBlYWNoIGRpcmVjdGlvbiBhbGxvd3MgdG8gZGlzYW1iaWd1YXRlXFxyXFxuXFx0ICogd2hpY2ggZWRnZXMgYXJlIGFjdGl2ZSBmcm9tIHRoZSBmb3VyIGZldGNoZWQgb25lcy5cXHJcXG5cXHQgKi9cXHJcXG5cXHJcXG5cXHR2ZWMyIGUgPSB2ZWMyKDAuMCwgMS4wKTtcXHJcXG5cXHJcXG5cXHRmb3IoaW50IGkgPSAwOyBpIDwgU01BQV9NQVhfU0VBUkNIX1NURVBTX0lOVDsgKytpKSB7XFxyXFxuXFxyXFxuXFx0XFx0ZSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdGV4Q29vcmQsIDAuMCkucmc7XFxyXFxuXFx0XFx0dGV4Q29vcmQgLT0gdmVjMigyLjAsIDAuMCkgKiB0ZXhlbFNpemU7XFxyXFxuXFxyXFxuXFx0XFx0aWYoISh0ZXhDb29yZC54ID4gZW5kICYmIGUuZyA+IDAuODI4MSAmJiBlLnIgPT0gMC4wKSkgeyBicmVhazsgfVxcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHQvLyBDb3JyZWN0IHRoZSBwcmV2aW91c2x5IGFwcGxpZWQgb2Zmc2V0ICgtMC4yNSwgLTAuMTI1KS5cXHJcXG5cXHR0ZXhDb29yZC54ICs9IDAuMjUgKiB0ZXhlbFNpemUueDtcXHJcXG5cXHJcXG5cXHQvLyBUaGUgc2VhcmNoZXMgYXJlIGJpYXNlZCBieSAxLCBzbyBhZGp1c3QgdGhlIGNvb3JkcyBhY2NvcmRpbmdseS5cXHJcXG5cXHR0ZXhDb29yZC54ICs9IHRleGVsU2l6ZS54O1xcclxcblxcclxcblxcdC8vIERpc2FtYmlndWF0ZSB0aGUgbGVuZ3RoIGFkZGVkIGJ5IHRoZSBsYXN0IHN0ZXAuXFxyXFxuXFx0dGV4Q29vcmQueCArPSAyLjAgKiB0ZXhlbFNpemUueDsgLy8gVW5kbyBsYXN0IHN0ZXAuXFxyXFxuXFx0dGV4Q29vcmQueCAtPSB0ZXhlbFNpemUueCAqIHNlYXJjaExlbmd0aChlLCAwLjAsIDAuNSk7XFxyXFxuXFxyXFxuXFx0cmV0dXJuIHRleENvb3JkLng7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbmZsb2F0IHNlYXJjaFhSaWdodCh2ZWMyIHRleENvb3JkLCBmbG9hdCBlbmQpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGUgPSB2ZWMyKDAuMCwgMS4wKTtcXHJcXG5cXHJcXG5cXHRmb3IoaW50IGkgPSAwOyBpIDwgU01BQV9NQVhfU0VBUkNIX1NURVBTX0lOVDsgKytpKSB7XFxyXFxuXFxyXFxuXFx0XFx0ZSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdGV4Q29vcmQsIDAuMCkucmc7XFxyXFxuXFx0XFx0dGV4Q29vcmQgKz0gdmVjMigyLjAsIDAuMCkgKiB0ZXhlbFNpemU7XFxyXFxuXFxyXFxuXFx0XFx0aWYoISh0ZXhDb29yZC54IDwgZW5kICYmIGUuZyA+IDAuODI4MSAmJiBlLnIgPT0gMC4wKSkgeyBicmVhazsgfVxcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHR0ZXhDb29yZC54IC09IDAuMjUgKiB0ZXhlbFNpemUueDtcXHJcXG5cXHR0ZXhDb29yZC54IC09IHRleGVsU2l6ZS54O1xcclxcblxcdHRleENvb3JkLnggLT0gMi4wICogdGV4ZWxTaXplLng7XFxyXFxuXFx0dGV4Q29vcmQueCArPSB0ZXhlbFNpemUueCAqIHNlYXJjaExlbmd0aChlLCAwLjUsIDAuNSk7XFxyXFxuXFxyXFxuXFx0cmV0dXJuIHRleENvb3JkLng7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbmZsb2F0IHNlYXJjaFlVcCh2ZWMyIHRleENvb3JkLCBmbG9hdCBlbmQpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGUgPSB2ZWMyKDEuMCwgMC4wKTtcXHJcXG5cXHJcXG5cXHRmb3IoaW50IGkgPSAwOyBpIDwgU01BQV9NQVhfU0VBUkNIX1NURVBTX0lOVDsgKytpKSB7XFxyXFxuXFxyXFxuXFx0XFx0ZSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdGV4Q29vcmQsIDAuMCkucmc7XFxyXFxuXFx0XFx0dGV4Q29vcmQgKz0gdmVjMigwLjAsIDIuMCkgKiB0ZXhlbFNpemU7IC8vIENoYW5nZWQgc2lnbi5cXHJcXG5cXHJcXG5cXHRcXHRpZighKHRleENvb3JkLnkgPiBlbmQgJiYgZS5yID4gMC44MjgxICYmIGUuZyA9PSAwLjApKSB7IGJyZWFrOyB9XFxyXFxuXFxyXFxuXFx0fVxcclxcblxcclxcblxcdHRleENvb3JkLnkgLT0gMC4yNSAqIHRleGVsU2l6ZS55OyAvLyBDaGFuZ2VkIHNpZ24uXFxyXFxuXFx0dGV4Q29vcmQueSAtPSB0ZXhlbFNpemUueTsgLy8gQ2hhbmdlZCBzaWduLlxcclxcblxcdHRleENvb3JkLnkgLT0gMi4wICogdGV4ZWxTaXplLnk7IC8vIENoYW5nZWQgc2lnbi5cXHJcXG5cXHR0ZXhDb29yZC55ICs9IHRleGVsU2l6ZS55ICogc2VhcmNoTGVuZ3RoKGUuZ3IsIDAuMCwgMC41KTsgLy8gQ2hhbmdlZCBzaWduLlxcclxcblxcclxcblxcdHJldHVybiB0ZXhDb29yZC55O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5mbG9hdCBzZWFyY2hZRG93bih2ZWMyIHRleENvb3JkLCBmbG9hdCBlbmQpIHtcXHJcXG5cXHJcXG5cXHR2ZWMyIGUgPSB2ZWMyKDEuMCwgMC4wKTtcXHJcXG5cXHJcXG5cXHRmb3IoaW50IGkgPSAwOyBpIDwgU01BQV9NQVhfU0VBUkNIX1NURVBTX0lOVDsgKytpICkge1xcclxcblxcclxcblxcdFxcdGUgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHRleENvb3JkLCAwLjApLnJnO1xcclxcblxcdFxcdHRleENvb3JkIC09IHZlYzIoMC4wLCAyLjApICogdGV4ZWxTaXplOyAvLyBDaGFuZ2VkIHNpZ24uXFxyXFxuXFxyXFxuXFx0XFx0aWYoISh0ZXhDb29yZC55IDwgZW5kICYmIGUuciA+IDAuODI4MSAmJiBlLmcgPT0gMC4wKSkgeyBicmVhazsgfVxcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHR0ZXhDb29yZC55ICs9IDAuMjUgKiB0ZXhlbFNpemUueTsgLy8gQ2hhbmdlZCBzaWduLlxcclxcblxcdHRleENvb3JkLnkgKz0gdGV4ZWxTaXplLnk7IC8vIENoYW5nZWQgc2lnbi5cXHJcXG5cXHR0ZXhDb29yZC55ICs9IDIuMCAqIHRleGVsU2l6ZS55OyAvLyBDaGFuZ2VkIHNpZ24uXFxyXFxuXFx0dGV4Q29vcmQueSAtPSB0ZXhlbFNpemUueSAqIHNlYXJjaExlbmd0aChlLmdyLCAwLjUsIDAuNSk7IC8vIENoYW5nZWQgc2lnbi5cXHJcXG5cXHJcXG5cXHRyZXR1cm4gdGV4Q29vcmQueTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxudmVjMiBhcmVhKHZlYzIgZGlzdCwgZmxvYXQgZTEsIGZsb2F0IGUyLCBmbG9hdCBvZmZzZXQpIHtcXHJcXG5cXHJcXG5cXHQvLyBSb3VuZGluZyBwcmV2ZW50cyBwcmVjaXNpb24gZXJyb3JzIG9mIGJpbGluZWFyIGZpbHRlcmluZy5cXHJcXG5cXHR2ZWMyIHRleENvb3JkID0gU01BQV9BUkVBVEVYX01BWF9ESVNUQU5DRSAqIHJvdW5kKDQuMCAqIHZlYzIoZTEsIGUyKSkgKyBkaXN0O1xcclxcblxcclxcblxcdC8vIFNjYWxlIGFuZCBiaWFzIGZvciB0ZXhlbCBzcGFjZSB0cmFuc2xhdGlvbi5cXHJcXG5cXHR0ZXhDb29yZCA9IFNNQUFfQVJFQVRFWF9QSVhFTF9TSVpFICogdGV4Q29vcmQgKyAoMC41ICogU01BQV9BUkVBVEVYX1BJWEVMX1NJWkUpO1xcclxcblxcclxcblxcdC8vIE1vdmUgdG8gcHJvcGVyIHBsYWNlLCBhY2NvcmRpbmcgdG8gdGhlIHN1YnBpeGVsIG9mZnNldC5cXHJcXG5cXHR0ZXhDb29yZC55ICs9IFNNQUFfQVJFQVRFWF9TVUJURVhfU0laRSAqIG9mZnNldDtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gdGV4dHVyZTJEKHRBcmVhLCB0ZXhDb29yZCwgMC4wKS5yZztcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxudm9pZCBtYWluKCkge1xcclxcblxcclxcblxcdHZlYzQgd2VpZ2h0cyA9IHZlYzQoMC4wKTtcXHJcXG5cXHR2ZWM0IHN1YnNhbXBsZUluZGljZXMgPSB2ZWM0KDAuMCk7XFxyXFxuXFx0dmVjMiBlID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpLnJnO1xcclxcblxcclxcblxcdGlmKGUuZyA+IDAuMCkge1xcclxcblxcclxcblxcdFxcdC8vIEVkZ2UgYXQgbm9ydGguXFxyXFxuXFx0XFx0dmVjMiBkO1xcclxcblxcclxcblxcdFxcdC8vIEZpbmQgdGhlIGRpc3RhbmNlIHRvIHRoZSBsZWZ0LlxcclxcblxcdFxcdHZlYzIgY29vcmRzO1xcclxcblxcdFxcdGNvb3Jkcy54ID0gc2VhcmNoWExlZnQodk9mZnNldFswXS54eSwgdk9mZnNldFsyXS54KTtcXHJcXG5cXHRcXHRjb29yZHMueSA9IHZPZmZzZXRbMV0ueTsgLy8gdk9mZnNldFsxXS55ID0gdlV2LnkgLSAwLjI1ICogdGV4ZWxTaXplLnkgKEBDUk9TU0lOR19PRkZTRVQpXFxyXFxuXFx0XFx0ZC54ID0gY29vcmRzLng7XFxyXFxuXFxyXFxuXFx0XFx0LyogTm93IGZldGNoIHRoZSBsZWZ0IGNyb3NzaW5nIGVkZ2VzLCB0d28gYXQgYSB0aW1lIHVzaW5nIGJpbGluZWFyIGZpbHRlcmluZy5cXHJcXG5cXHRcXHQgKiBTYW1wbGluZyBhdCAtMC4yNSAoc2VlIEBDUk9TU0lOR19PRkZTRVQpIGVuYWJsZXMgdG8gZGlzY2VybiB3aGF0IHZhbHVlIGVhY2ggZWRnZSBoYXMuXFxyXFxuXFx0XFx0ICovXFxyXFxuXFxyXFxuXFx0XFx0ZmxvYXQgZTEgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIGNvb3JkcywgMC4wKS5yO1xcclxcblxcclxcblxcdFxcdC8vIEZpbmQgdGhlIGRpc3RhbmNlIHRvIHRoZSByaWdodC5cXHJcXG5cXHRcXHRjb29yZHMueCA9IHNlYXJjaFhSaWdodCh2T2Zmc2V0WzBdLnp3LCB2T2Zmc2V0WzJdLnkpO1xcclxcblxcdFxcdGQueSA9IGNvb3Jkcy54O1xcclxcblxcclxcblxcdFxcdC8vIFRyYW5zbGF0ZSBkaXN0YW5jZXMgdG8gcGl4ZWwgdW5pdHMgZm9yIGJldHRlciBpbnRlcmxlYXZlIGFyaXRobWV0aWMgYW5kIG1lbW9yeSBhY2Nlc3Nlcy5cXHJcXG5cXHRcXHRkID0gZCAvIHRleGVsU2l6ZS54IC0gdlBpeENvb3JkLng7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gVGhlIGFyZWEgYmVsb3cgbmVlZHMgYSBzcXJ0LCBhcyB0aGUgYXJlYXMgdGV4dHVyZSBpcyBjb21wcmVzc2VkIHF1YWRyYXRpY2FsbHkuXFxyXFxuXFx0XFx0dmVjMiBzcXJ0RCA9IHNxcnQoYWJzKGQpKTtcXHJcXG5cXHJcXG5cXHRcXHQvLyBGZXRjaCB0aGUgcmlnaHQgY3Jvc3NpbmcgZWRnZXMuXFxyXFxuXFx0XFx0Y29vcmRzLnkgLT0gdGV4ZWxTaXplLnk7IC8vIFdlYkdMIHBvcnQgbm90ZTogQWRkZWQuXFxyXFxuXFx0XFx0ZmxvYXQgZTIgPSBzYW1wbGVMZXZlbFplcm9PZmZzZXQodERpZmZ1c2UsIGNvb3JkcywgaXZlYzIoMSwgMCkpLnI7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gUGF0dGVybiByZWNvZ25pc2VkLCBub3cgZ2V0IHRoZSBhY3R1YWwgYXJlYS5cXHJcXG5cXHRcXHR3ZWlnaHRzLnJnID0gYXJlYShzcXJ0RCwgZTEsIGUyLCBzdWJzYW1wbGVJbmRpY2VzLnkpO1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHRpZihlLnIgPiAwLjApIHtcXHJcXG5cXHJcXG5cXHRcXHQvLyBFZGdlIGF0IHdlc3QuXFxyXFxuXFx0XFx0dmVjMiBkO1xcclxcblxcclxcblxcdFxcdC8vIEZpbmQgdGhlIGRpc3RhbmNlIHRvIHRoZSB0b3AuXFxyXFxuXFx0XFx0dmVjMiBjb29yZHM7XFxyXFxuXFxyXFxuXFx0XFx0Y29vcmRzLnkgPSBzZWFyY2hZVXAodk9mZnNldFsxXS54eSwgdk9mZnNldFsyXS56KTtcXHJcXG5cXHRcXHRjb29yZHMueCA9IHZPZmZzZXRbMF0ueDsgLy8gdk9mZnNldFsxXS54ID0gdlV2LnggLSAwLjI1ICogdGV4ZWxTaXplLng7XFxyXFxuXFx0XFx0ZC54ID0gY29vcmRzLnk7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gRmV0Y2ggdGhlIHRvcCBjcm9zc2luZyBlZGdlcy5cXHJcXG5cXHRcXHRmbG9hdCBlMSA9IHRleHR1cmUyRCh0RGlmZnVzZSwgY29vcmRzLCAwLjApLmc7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gRmluZCB0aGUgZGlzdGFuY2UgdG8gdGhlIGJvdHRvbS5cXHJcXG5cXHRcXHRjb29yZHMueSA9IHNlYXJjaFlEb3duKHZPZmZzZXRbMV0uencsIHZPZmZzZXRbMl0udyk7XFxyXFxuXFx0XFx0ZC55ID0gY29vcmRzLnk7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gRGlzdGFuY2VzIGluIHBpeGVsIHVuaXRzLlxcclxcblxcdFxcdGQgPSBkIC8gdGV4ZWxTaXplLnkgLSB2UGl4Q29vcmQueTtcXHJcXG5cXHJcXG5cXHRcXHQvLyBUaGUgYXJlYSBiZWxvdyBuZWVkcyBhIHNxcnQsIGFzIHRoZSBhcmVhcyB0ZXh0dXJlIGlzIGNvbXByZXNzZWQgcXVhZHJhdGljYWxseS5cXHJcXG5cXHRcXHR2ZWMyIHNxcnREID0gc3FydChhYnMoZCkpO1xcclxcblxcclxcblxcdFxcdC8vIEZldGNoIHRoZSBib3R0b20gY3Jvc3NpbmcgZWRnZXMuXFxyXFxuXFx0XFx0Y29vcmRzLnkgLT0gdGV4ZWxTaXplLnk7IC8vIFdlYkdMIHBvcnQgbm90ZTogQWRkZWQuXFxyXFxuXFx0XFx0ZmxvYXQgZTIgPSBzYW1wbGVMZXZlbFplcm9PZmZzZXQodERpZmZ1c2UsIGNvb3JkcywgaXZlYzIoMCwgMSkpLmc7XFxyXFxuXFxyXFxuXFx0XFx0Ly8gR2V0IHRoZSBhcmVhIGZvciB0aGlzIGRpcmVjdGlvbi5cXHJcXG5cXHRcXHR3ZWlnaHRzLmJhID0gYXJlYShzcXJ0RCwgZTEsIGUyLCBzdWJzYW1wbGVJbmRpY2VzLngpO1xcclxcblxcclxcblxcdH1cXHJcXG5cXHJcXG5cXHRnbF9GcmFnQ29sb3IgPSB3ZWlnaHRzO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuY29uc3QgdmVydGV4ID0gXCJ1bmlmb3JtIHZlYzIgdGV4ZWxTaXplO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMiB2VXY7XFxyXFxudmFyeWluZyB2ZWM0IHZPZmZzZXRbM107XFxyXFxudmFyeWluZyB2ZWMyIHZQaXhDb29yZDtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFxyXFxuXFx0dlBpeENvb3JkID0gdXYgLyB0ZXhlbFNpemU7XFxyXFxuXFxyXFxuXFx0Ly8gT2Zmc2V0cyBmb3IgdGhlIHNlYXJjaGVzIChzZWUgQFBTRVVET19HQVRIRVI0KS5cXHJcXG5cXHR2T2Zmc2V0WzBdID0gdXYueHl4eSArIHRleGVsU2l6ZS54eXh5ICogdmVjNCgtMC4yNSwgMC4xMjUsIDEuMjUsIDAuMTI1KTsgLy8gQ2hhbmdlZCBzaWduIGluIFkgYW5kIFcgY29tcG9uZW50cy5cXHJcXG5cXHR2T2Zmc2V0WzFdID0gdXYueHl4eSArIHRleGVsU2l6ZS54eXh5ICogdmVjNCgtMC4xMjUsIDAuMjUsIC0wLjEyNSwgLTEuMjUpOyAvL0NoYW5nZWQgc2lnbiBpbiBZIGFuZCBXIGNvbXBvbmVudHMuXFxyXFxuXFxyXFxuXFx0Ly8gVGhpcyBpbmRpY2F0ZXMgdGhlIGVuZHMgb2YgdGhlIGxvb3BzLlxcclxcblxcdHZPZmZzZXRbMl0gPSB2ZWM0KHZPZmZzZXRbMF0ueHosIHZPZmZzZXRbMV0ueXcpICsgdmVjNCgtMi4wLCAyLjAsIC0yLjAsIDIuMCkgKiB0ZXhlbFNpemUueHh5eSAqIFNNQUFfTUFYX1NFQVJDSF9TVEVQU19GTE9BVDtcXHJcXG5cXHJcXG5cXHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcclxcblxcclxcbn1cXHJcXG5cIjtcclxuXHJcbi8qKlxyXG4gKiBTdWJwaXhlbCBNb3JwaG9sb2dpY2FsIEFudGlhbGlhc2luZy5cclxuICpcclxuICogVGhpcyBtYXRlcmlhbCBjb21wdXRlcyB3ZWlnaHRzIGZvciBkZXRlY3RlZCBlZGdlcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU01BQVdlaWdodHNNYXRlcmlhbCBleHRlbmRzIFNoYWRlck1hdGVyaWFsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBTTUFBIHdlaWdodHMgbWF0ZXJpYWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1ZlY3RvcjJ9IFt0ZXhlbFNpemVdIC0gVGhlIGFic29sdXRlIHNjcmVlbiB0ZXhlbCBzaXplLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0ZXhlbFNpemUgPSBuZXcgVmVjdG9yMigpKSB7XHJcblxyXG5cdFx0c3VwZXIoe1xyXG5cclxuXHRcdFx0dHlwZTogXCJTTUFBV2VpZ2h0c01hdGVyaWFsXCIsXHJcblxyXG5cdFx0XHRkZWZpbmVzOiB7XHJcblxyXG5cdFx0XHRcdFNNQUFfTUFYX1NFQVJDSF9TVEVQU19JTlQ6IFwiOFwiLFxyXG5cdFx0XHRcdFNNQUFfTUFYX1NFQVJDSF9TVEVQU19GTE9BVDogXCI4LjBcIixcclxuXHJcblx0XHRcdFx0U01BQV9BUkVBVEVYX01BWF9ESVNUQU5DRTogXCIxNi4wXCIsXHJcblxyXG5cdFx0XHRcdFNNQUFfQVJFQVRFWF9QSVhFTF9TSVpFOiBcIigxLjAgLyB2ZWMyKDE2MC4wLCA1NjAuMCkpXCIsXHJcblx0XHRcdFx0U01BQV9BUkVBVEVYX1NVQlRFWF9TSVpFOiBcIigxLjAgLyA3LjApXCJcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR1bmlmb3Jtczoge1xyXG5cclxuXHRcdFx0XHR0RGlmZnVzZTogbmV3IFVuaWZvcm0obnVsbCksXHJcblx0XHRcdFx0dEFyZWE6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRTZWFyY2g6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdHRleGVsU2l6ZTogbmV3IFVuaWZvcm0odGV4ZWxTaXplKVxyXG5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudCxcclxuXHRcdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXgsXHJcblxyXG5cdFx0XHRkZXB0aFdyaXRlOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGFyZWEgcGF0dGVybiByZWNvZ25pdGlvbiBpbWFnZS4gRW5jb2RlZCBhcyBiYXNlNjQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYXJlYUltYWdlID0gYXJlYUltYWdlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNlYXJjaCBpbWFnZS4gRW5jb2RlZCBhcyBiYXNlNjQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2VhcmNoSW1hZ2UgPSBzZWFyY2hJbWFnZTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCwgVW5pZm9ybSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuY29uc3QgZnJhZ21lbnQgPSBcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xcclxcbnVuaWZvcm0gZmxvYXQgbWlkZGxlR3JleTtcXHJcXG51bmlmb3JtIGZsb2F0IG1heEx1bWluYW5jZTtcXHJcXG5cXHJcXG4jaWZkZWYgQURBUFRFRF9MVU1JTkFOQ0VcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIHNhbXBsZXIyRCBsdW1pbmFuY2VNYXA7XFxyXFxuXFxyXFxuI2Vsc2VcXHJcXG5cXHJcXG5cXHR1bmlmb3JtIGZsb2F0IGF2ZXJhZ2VMdW1pbmFuY2U7XFxyXFxuXFxyXFxuI2VuZGlmXFxyXFxuXFxyXFxudmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG5jb25zdCB2ZWMzIExVTV9DT0VGRiA9IHZlYzMoMC4yOTksIDAuNTg3LCAwLjExNCk7XFxyXFxuY29uc3QgdmVjMiBDRU5URVIgPSB2ZWMyKDAuNSwgMC41KTtcXHJcXG5cXHJcXG52ZWMzIHRvbmVNYXAodmVjMyBjKSB7XFxyXFxuXFxyXFxuXFx0I2lmZGVmIEFEQVBURURfTFVNSU5BTkNFXFxyXFxuXFxyXFxuXFx0XFx0Ly8gR2V0IHRoZSBjYWxjdWxhdGVkIGF2ZXJhZ2UgbHVtaW5hbmNlLlxcclxcblxcdFxcdGZsb2F0IGx1bUF2ZyA9IHRleHR1cmUyRChsdW1pbmFuY2VNYXAsIENFTlRFUikucjtcXHJcXG5cXHJcXG5cXHQjZWxzZVxcclxcblxcclxcblxcdFxcdGZsb2F0IGx1bUF2ZyA9IGF2ZXJhZ2VMdW1pbmFuY2U7XFxyXFxuXFxyXFxuXFx0I2VuZGlmXFxyXFxuXFxyXFxuXFx0Ly8gQ2FsY3VsYXRlIHRoZSBsdW1pbmFuY2Ugb2YgdGhlIGN1cnJlbnQgcGl4ZWwuXFxyXFxuXFx0ZmxvYXQgbHVtUGl4ZWwgPSBkb3QoYywgTFVNX0NPRUZGKTtcXHJcXG5cXHJcXG5cXHQvLyBBcHBseSB0aGUgbW9kaWZpZWQgb3BlcmF0b3IgKFJlaW5oYXJkIEVxLiA0KS5cXHJcXG5cXHRmbG9hdCBsdW1TY2FsZWQgPSAobHVtUGl4ZWwgKiBtaWRkbGVHcmV5KSAvIGx1bUF2ZztcXHJcXG5cXHJcXG5cXHRmbG9hdCBsdW1Db21wcmVzc2VkID0gKGx1bVNjYWxlZCAqICgxLjAgKyAobHVtU2NhbGVkIC8gKG1heEx1bWluYW5jZSAqIG1heEx1bWluYW5jZSkpKSkgLyAoMS4wICsgbHVtU2NhbGVkKTtcXHJcXG5cXHJcXG5cXHRyZXR1cm4gbHVtQ29tcHJlc3NlZCAqIGM7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbnZvaWQgbWFpbigpIHtcXHJcXG5cXHJcXG5cXHR2ZWM0IHRleGVsID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2VXYpO1xcclxcblxcdGdsX0ZyYWdDb2xvciA9IHZlYzQodG9uZU1hcCh0ZXhlbC5yZ2IpLCB0ZXhlbC5hKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcbmNvbnN0IHZlcnRleCA9IFwidmFyeWluZyB2ZWMyIHZVdjtcXHJcXG5cXHJcXG52b2lkIG1haW4oKSB7XFxyXFxuXFxyXFxuXFx0dlV2ID0gdXY7XFxyXFxuXFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXHJcXG5cXHJcXG59XFxyXFxuXCI7XHJcblxyXG4vKipcclxuICogRnVsbC1zY3JlZW4gdG9uZS1tYXBwaW5nIHNoYWRlciBtYXRlcmlhbC5cclxuICpcclxuICogUmVmZXJlbmNlOlxyXG4gKiAgaHR0cDovL3d3dy5jaXMucml0LmVkdS9wZW9wbGUvZmFjdWx0eS9mZXJ3ZXJkYS9wdWJsaWNhdGlvbnMvc2lnMDJfcGFwZXIucGRmXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvbmVNYXBwaW5nTWF0ZXJpYWwgZXh0ZW5kcyBTaGFkZXJNYXRlcmlhbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgdG9uZSBtYXBwaW5nIG1hdGVyaWFsLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcih7XHJcblxyXG5cdFx0XHR0eXBlOiBcIlRvbmVNYXBwaW5nTWF0ZXJpYWxcIixcclxuXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblxyXG5cdFx0XHRcdHREaWZmdXNlOiBuZXcgVW5pZm9ybShudWxsKSxcclxuXHRcdFx0XHRsdW1pbmFuY2VNYXA6IG5ldyBVbmlmb3JtKG51bGwpLFxyXG5cdFx0XHRcdGF2ZXJhZ2VMdW1pbmFuY2U6IG5ldyBVbmlmb3JtKDEuMCksXHJcblx0XHRcdFx0bWF4THVtaW5hbmNlOiBuZXcgVW5pZm9ybSgxNi4wKSxcclxuXHRcdFx0XHRtaWRkbGVHcmV5OiBuZXcgVW5pZm9ybSgwLjYpXHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50LFxyXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleCxcclxuXHJcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aFRlc3Q6IGZhbHNlXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGFkZXIgbWF0ZXJpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHBvc3QgcHJvY2Vzc2luZyBwYXNzZXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmcvbWF0ZXJpYWxzXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgQWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwgfSBmcm9tIFwiLi9hZGFwdGl2ZS1sdW1pbm9zaXR5LmpzXCI7XHJcbmV4cG9ydCB7IEJva2VoTWF0ZXJpYWwgfSBmcm9tIFwiLi9ib2tlaC5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaDJNYXRlcmlhbCB9IGZyb20gXCIuL2Jva2VoMi5qc1wiO1xyXG5leHBvcnQgeyBDb21iaW5lTWF0ZXJpYWwgfSBmcm9tIFwiLi9jb21iaW5lLmpzXCI7XHJcbmV4cG9ydCB7IENvbnZvbHV0aW9uTWF0ZXJpYWwsIEtlcm5lbFNpemUgfSBmcm9tIFwiLi9jb252b2x1dGlvbi5qc1wiO1xyXG5leHBvcnQgeyBDb3B5TWF0ZXJpYWwgfSBmcm9tIFwiLi9jb3B5LmpzXCI7XHJcbmV4cG9ydCB7IERlcHRoTWF0ZXJpYWwgfSBmcm9tIFwiLi9kZXB0aC5qc1wiO1xyXG5leHBvcnQgeyBEb3RTY3JlZW5NYXRlcmlhbCB9IGZyb20gXCIuL2RvdC1zY3JlZW4uanNcIjtcclxuZXhwb3J0IHsgRmlsbU1hdGVyaWFsIH0gZnJvbSBcIi4vZmlsbS5qc1wiO1xyXG5leHBvcnQgeyBHbGl0Y2hNYXRlcmlhbCB9IGZyb20gXCIuL2dsaXRjaC5qc1wiO1xyXG5leHBvcnQgeyBHb2RSYXlzTWF0ZXJpYWwgfSBmcm9tIFwiLi9nb2QtcmF5cy5qc1wiO1xyXG5leHBvcnQgeyBMdW1pbm9zaXR5TWF0ZXJpYWwgfSBmcm9tIFwiLi9sdW1pbm9zaXR5LmpzXCI7XHJcbmV4cG9ydCB7IFBpeGVsYXRpb25NYXRlcmlhbCB9IGZyb20gXCIuL3BpeGVsYXRpb24uanNcIjtcclxuZXhwb3J0IHsgU2hvY2tXYXZlTWF0ZXJpYWwgfSBmcm9tIFwiLi9zaG9jay13YXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFCbGVuZE1hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS1ibGVuZC5qc1wiO1xyXG5leHBvcnQgeyBTTUFBQ29sb3JFZGdlc01hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS1jb2xvci1lZGdlcy5qc1wiO1xyXG5leHBvcnQgeyBTTUFBV2VpZ2h0c01hdGVyaWFsIH0gZnJvbSBcIi4vc21hYS13ZWlnaHRzLmpzXCI7XHJcbmV4cG9ydCB7IFRvbmVNYXBwaW5nTWF0ZXJpYWwgfSBmcm9tIFwiLi90b25lLW1hcHBpbmcuanNcIjtcclxuIiwiaW1wb3J0IHsgU2NlbmUsIE1lc2gsIE9ydGhvZ3JhcGhpY0NhbWVyYSwgUGxhbmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IHBhc3MuXHJcbiAqXHJcbiAqIFBhc3NlcyB0aGF0IGRvIG5vdCByZWx5IG9uIHRoZSBkZXB0aCBidWZmZXIgc2hvdWxkIGV4cGxpY2l0bHkgZGlzYWJsZSB0aGVcclxuICogZGVwdGggdGVzdCBhbmQgZGVwdGggd3JpdGUgaW4gdGhlaXIgcmVzcGVjdGl2ZSBzaGFkZXIgbWF0ZXJpYWxzLlxyXG4gKlxyXG4gKiBUaGlzIGNsYXNzIGltcGxlbWVudHMgYSB7QGxpbmsgUGFzcyNkaXNwb3NlfSBtZXRob2QgdGhhdCBmcmVlcyBtZW1vcnkgb25cclxuICogZGVtYW5kLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtTY2VuZX0gW3NjZW5lXSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IFtjYW1lcmFdIC0gVGhlIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge01lc2h9IFtxdWFkXSAtIEEgcXVhZCB0aGF0IGZpbGxzIHRoZSBzY3JlZW4gdG8gcmVuZGVyIDJEIGZpbHRlciBlZmZlY3RzLiBTZXQgdGhpcyB0byBudWxsLCBpZiB5b3UgZG9uJ3QgbmVlZCBpdCAoc2VlIHtAbGluayBSZW5kZXJQYXNzfSkuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0c2NlbmUgPSBuZXcgU2NlbmUoKSxcclxuXHRcdGNhbWVyYSA9IG5ldyBPcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIDEsIC0xLCAwLCAxKSxcclxuXHRcdHF1YWQgPSBuZXcgTWVzaChuZXcgUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgbnVsbClcclxuXHQpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgc2NlbmUgdG8gcmVuZGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTY2VuZX1cclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBkZWZhdWx0IG5ldyBTY2VuZSgpXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY2FtZXJhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDYW1lcmF9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAxLCAtMSwgMCwgMSlcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBxdWFkIG1lc2ggdGhhdCBmaWxscyB0aGUgc2NyZWVuLlxyXG5cdFx0ICpcclxuXHRcdCAqIEFzc2lnbiB5b3VyIHNoYWRlciBtYXRlcmlhbCB0byB0aGlzIG1lc2ghXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge01lc2h9XHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAZGVmYXVsdCBuZXcgTWVzaChuZXcgUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgbnVsbClcclxuXHRcdCAqIEBleGFtcGxlIHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubXlNYXRlcmlhbDtcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucXVhZCA9IHF1YWQ7XHJcblxyXG5cdFx0aWYodGhpcy5xdWFkICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHR0aGlzLnF1YWQuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYodGhpcy5zY2VuZSAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHR0aGlzLnNjZW5lLmFkZCh0aGlzLnF1YWQpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSByZWFkIGFuZCB3cml0ZSBidWZmZXJzIHNob3VsZCBiZSBzd2FwcGVkIGFmdGVyIHRoaXNcclxuXHRcdCAqIHBhc3MgaGFzIGZpbmlzaGVkIHJlbmRlcmluZy5cclxuXHRcdCAqXHJcblx0XHQgKiBTZXQgdGhpcyB0byB0cnVlIGlmIHRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIgc28gdGhhdCBhXHJcblx0XHQgKiBmb2xsb3dpbmcgcGFzcyBjYW4gZmluZCB0aGUgcmVzdWx0IGluIHRoZSByZWFkIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRW5hYmxlZCBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbmRlciB0byBzY3JlZW4gZmxhZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cclxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRvU2NyZWVuID0gZmFsc2U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogVGhpcyBpcyBhbiBhYnN0cmFjdCBtZXRob2QgdGhhdCBtdXN0IGJlIG92ZXJyaWRkZW4uXHJcblx0ICpcclxuXHQgKiBAYWJzdHJhY3RcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gQW4gZXJyb3IgaXMgdGhyb3duIGlmIHRoZSBtZXRob2QgaXMgbm90IG92ZXJyaWRkZW4uXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gQSByZWFkIGJ1ZmZlci4gQ29udGFpbnMgdGhlIHJlc3VsdCBvZiB0aGUgcHJldmlvdXMgcGFzcy5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIEEgd3JpdGUgYnVmZmVyLiBOb3JtYWxseSB1c2VkIGFzIHRoZSByZW5kZXIgdGFyZ2V0IHdoZW4gdGhlIHJlYWQgYnVmZmVyIGlzIHVzZWQgYXMgaW5wdXQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YV0gLSBUaGUgZGVsdGEgdGltZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrQWN0aXZlXSAtIEluZGljYXRlcyB3aGV0aGVyIGEgc3RlbmNpbCB0ZXN0IG1hc2sgaXMgYWN0aXZlIG9yIG5vdC5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEsIG1hc2tBY3RpdmUpIHtcclxuXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZW5kZXIgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCFcIik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogWW91IG1heSBvdmVycmlkZSB0aGlzIG1ldGhvZCBpbiBjYXNlIHlvdSB3YW50IHRvIGJlIGluZm9ybWVkIGFib3V0IHRoZSBtYWluXHJcblx0ICogcmVuZGVyIHNpemUuXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCBiZWZvcmUgdGhpcyBwYXNzIGlzXHJcblx0ICogaW5pdGlhbGlzZWQgYW5kIGV2ZXJ5IHRpbWUgaXRzIG93biBzaXplIGlzIHVwZGF0ZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgcmVuZGVyZXIncyB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIHJlbmRlcmVyJ3MgaGVpZ2h0LlxyXG5cdCAqIEBleGFtcGxlIHRoaXMubXlSZW5kZXJUYXJnZXQuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtcyBpbml0aWFsaXNhdGlvbiB0YXNrcy5cclxuXHQgKlxyXG5cdCAqIEJ5IG92ZXJyaWRpbmcgdGhpcyBtZXRob2QgeW91IGdhaW4gYWNjZXNzIHRvIHRoZSByZW5kZXJlci4gWW91J2xsIGFsc28gYmVcclxuXHQgKiBhYmxlIHRvIGNvbmZpZ3VyZSB5b3VyIGN1c3RvbSByZW5kZXIgdGFyZ2V0cyB0byB1c2UgdGhlIGFwcHJvcHJpYXRlIGZvcm1hdFxyXG5cdCAqIChSR0Igb3IgUkdCQSkuXHJcblx0ICpcclxuXHQgKiBUaGUgcHJvdmlkZWQgcmVuZGVyZXIgY2FuIGJlIHVzZWQgdG8gd2FybSB1cCBzcGVjaWFsIG9mZi1zY3JlZW4gcmVuZGVyXHJcblx0ICogdGFyZ2V0cyBieSBwZXJmb3JtaW5nIGEgcHJlbGltaW5hcnkgcmVuZGVyIG9wZXJhdGlvbi5cclxuXHQgKlxyXG5cdCAqIFRoZSB7QGxpbmsgRWZmZWN0Q29tcG9zZXJ9IGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gdGhpcyBwYXNzIGlzIGFkZGVkIHRvIGl0c1xyXG5cdCAqIHF1ZXVlLlxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBpbml0aWFsaXNlXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFscGhhIC0gV2hldGhlciB0aGUgcmVuZGVyZXIgdXNlcyB0aGUgYWxwaGEgY2hhbm5lbCBvciBub3QuXHJcblx0ICogQGV4YW1wbGUgaWYoIWFscGhhKSB7IHRoaXMubXlSZW5kZXJUYXJnZXQudGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7IH1cclxuXHQgKi9cclxuXHJcblx0aW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIGEgc2hhbGxvdyBzZWFyY2ggZm9yIHByb3BlcnRpZXMgdGhhdCBkZWZpbmUgYSBkaXNwb3NlIG1ldGhvZCBhbmRcclxuXHQgKiBkZWxldGVzIHRoZW0uIFRoZSBwYXNzIHdpbGwgYmUgaW5vcGVyYXRpdmUgYWZ0ZXIgdGhpcyBtZXRob2Qgd2FzIGNhbGxlZCFcclxuXHQgKlxyXG5cdCAqIERpc3Bvc2FibGUgb2JqZWN0czpcclxuXHQgKiAgLSByZW5kZXIgdGFyZ2V0c1xyXG5cdCAqICAtIG1hdGVyaWFsc1xyXG5cdCAqICAtIHRleHR1cmVzXHJcblx0ICpcclxuXHQgKiBUaGUge0BsaW5rIEVmZmVjdENvbXBvc2VyfSBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIGl0IGlzIGJlaW5nIGRlc3Ryb3llZC5cclxuXHQgKiBZb3UgbWF5LCBob3dldmVyLCB1c2UgaXQgaW5kZXBlbmRlbnRseSB0byBmcmVlIG1lbW9yeSB3aGVuIHlvdSBhcmUgY2VydGFpblxyXG5cdCAqIHRoYXQgeW91IGRvbid0IG5lZWQgdGhpcyBwYXNzIGFueW1vcmUuXHJcblx0ICovXHJcblxyXG5cdGRpc3Bvc2UoKSB7XHJcblxyXG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cclxuXHRcdGxldCBrZXk7XHJcblxyXG5cdFx0Zm9yKGtleSBvZiBrZXlzKSB7XHJcblxyXG5cdFx0XHRpZih0aGlzW2tleV0gIT09IG51bGwgJiYgdHlwZW9mIHRoaXNba2V5XS5kaXNwb3NlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHJcblx0XHRcdFx0dGhpc1trZXldLmRpc3Bvc2UoKTtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBudWxsO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBMaW5lYXJGaWx0ZXIsIFJHQkZvcm1hdCwgV2ViR0xSZW5kZXJUYXJnZXQgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgQ29udm9sdXRpb25NYXRlcmlhbCwgS2VybmVsU2l6ZSB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGJsdXIgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQmx1clBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBibHVyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlc29sdXRpb25TY2FsZT0wLjVdIC0gVGhlIHJlbmRlciB0ZXh0dXJlIHJlc29sdXRpb24gc2NhbGUsIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW4gcmVuZGVyIHNpemUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmtlcm5lbFNpemU9S2VybmVsU2l6ZS5MQVJHRV0gLSBUaGUgYmx1ciBrZXJuZWwgc2l6ZS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQmx1clBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJlbmRlciB0YXJnZXQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WCA9IG5ldyBXZWJHTFJlbmRlclRhcmdldCgxLCAxLCB7XHJcblx0XHRcdG1pbkZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRtYWdGaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0c3RlbmNpbEJ1ZmZlcjogZmFsc2UsXHJcblx0XHRcdGRlcHRoQnVmZmVyOiBmYWxzZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRYLnRleHR1cmUubmFtZSA9IFwiQmx1ci5UYXJnZXRYXCI7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFgudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgc2Vjb25kIHJlbmRlciB0YXJnZXQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WSA9IHRoaXMucmVuZGVyVGFyZ2V0WC5jbG9uZSgpO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WS50ZXh0dXJlLm5hbWUgPSBcIkJsdXIuVGFyZ2V0WVwiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlc29sdXRpb24gc2NhbGUuXHJcblx0XHQgKlxyXG5cdFx0ICogWW91IG5lZWQgdG8gY2FsbCB7QGxpbmsgRWZmZWN0Q29tcG9zZXIjc2V0U2l6ZX0gYWZ0ZXIgY2hhbmdpbmcgdGhpc1xyXG5cdFx0ICogdmFsdWUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBkZWZhdWx0IDAuNVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZXNvbHV0aW9uU2NhbGUgPSAob3B0aW9ucy5yZXNvbHV0aW9uU2NhbGUgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnJlc29sdXRpb25TY2FsZSA6IDAuNTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY29udm9sdXRpb24gc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb252b2x1dGlvbk1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29udm9sdXRpb25NYXRlcmlhbCA9IG5ldyBDb252b2x1dGlvbk1hdGVyaWFsKCk7XHJcblxyXG5cdFx0dGhpcy5rZXJuZWxTaXplID0gb3B0aW9ucy5rZXJuZWxTaXplO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuY29udm9sdXRpb25NYXRlcmlhbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYWJzb2x1dGUgd2lkdGggb2YgdGhlIGludGVybmFsIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0Z2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5yZW5kZXJUYXJnZXRYLndpZHRoOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBhYnNvbHV0ZSBoZWlnaHQgb2YgdGhlIGludGVybmFsIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0Z2V0IGhlaWdodCgpIHsgcmV0dXJuIHRoaXMucmVuZGVyVGFyZ2V0WC5oZWlnaHQ7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGtlcm5lbCBzaXplLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0ICogQGRlZmF1bHQgS2VybmVsU2l6ZS5MQVJHRVxyXG5cdCAqL1xyXG5cclxuXHRnZXQga2VybmVsU2l6ZSgpIHsgcmV0dXJuIHRoaXMuY29udm9sdXRpb25NYXRlcmlhbC5rZXJuZWxTaXplOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtLZXJuZWxTaXplfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQga2VybmVsU2l6ZSh4ID0gS2VybmVsU2l6ZS5MQVJHRSkgeyB0aGlzLmNvbnZvbHV0aW9uTWF0ZXJpYWwua2VybmVsU2l6ZSA9IHg7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQmx1cnMgdGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xyXG5cclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldFggPSB0aGlzLnJlbmRlclRhcmdldFg7XHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXRZID0gdGhpcy5yZW5kZXJUYXJnZXRZO1xyXG5cclxuXHRcdGNvbnN0IG1hdGVyaWFsID0gdGhpcy5jb252b2x1dGlvbk1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSBtYXRlcmlhbC51bmlmb3JtcztcclxuXHRcdGNvbnN0IGtlcm5lbCA9IG1hdGVyaWFsLmdldEtlcm5lbCgpO1xyXG5cclxuXHRcdGxldCBsYXN0UlQgPSByZWFkQnVmZmVyO1xyXG5cdFx0bGV0IGRlc3RSVDtcclxuXHRcdGxldCBpLCBsO1xyXG5cclxuXHRcdC8vIEFwcGx5IHRoZSBtdWx0aS1wYXNzIGJsdXIuXHJcblx0XHRmb3IoaSA9IDAsIGwgPSBrZXJuZWwubGVuZ3RoIC0gMTsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0Ly8gQWx0ZXJuYXRlIGJldHdlZW4gdGFyZ2V0cy5cclxuXHRcdFx0ZGVzdFJUID0gKChpICUgMikgPT09IDApID8gcmVuZGVyVGFyZ2V0WCA6IHJlbmRlclRhcmdldFk7XHJcblxyXG5cdFx0XHR1bmlmb3Jtcy5rZXJuZWwudmFsdWUgPSBrZXJuZWxbaV07XHJcblx0XHRcdHVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gbGFzdFJULnRleHR1cmU7XHJcblx0XHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCBkZXN0UlQpO1xyXG5cclxuXHRcdFx0bGFzdFJUID0gZGVzdFJUO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR1bmlmb3Jtcy5rZXJuZWwudmFsdWUgPSBrZXJuZWxbaV07XHJcblx0XHR1bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IGxhc3RSVC50ZXh0dXJlO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkanVzdHMgdGhlIGZvcm1hdCBvZiB0aGUgcmVuZGVyIHRhcmdldHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxwaGEgLSBXaGV0aGVyIHRoZSByZW5kZXJlciB1c2VzIHRoZSBhbHBoYSBjaGFubmVsIG9yIG5vdC5cclxuXHQgKi9cclxuXHJcblx0aW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpIHtcclxuXHJcblx0XHRpZighYWxwaGEpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyVGFyZ2V0WC50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDtcclxuXHRcdFx0dGhpcy5yZW5kZXJUYXJnZXRZLnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHdpZHRoID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcih3aWR0aCAqIHRoaXMucmVzb2x1dGlvblNjYWxlKSk7XHJcblx0XHRoZWlnaHQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKGhlaWdodCAqIHRoaXMucmVzb2x1dGlvblNjYWxlKSk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRYLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFkuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR0aGlzLmNvbnZvbHV0aW9uTWF0ZXJpYWwuc2V0VGV4ZWxTaXplKDEuMCAvIHdpZHRoLCAxLjAgLyBoZWlnaHQpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IExpbmVhckZpbHRlciwgUkdCRm9ybWF0LCBXZWJHTFJlbmRlclRhcmdldCB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBDb21iaW5lTWF0ZXJpYWwsIEtlcm5lbFNpemUsIEx1bWlub3NpdHlNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgQmx1clBhc3MgfSBmcm9tIFwiLi9ibHVyLmpzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBibG9vbSBwYXNzLlxyXG4gKlxyXG4gKiBUaGlzIHBhc3MgcmVuZGVycyBhIHNjZW5lIHdpdGggc3VwZXJpbXBvc2VkIGJsdXIgYnkgdXRpbGlzaW5nIHRoZSBmYXN0IEthd2FzZVxyXG4gKiBjb252b2x1dGlvbiBhcHByb2FjaC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQmxvb21QYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgYmxvb20gcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVzb2x1dGlvblNjYWxlPTAuNV0gLSBUaGUgcmVuZGVyIHRleHR1cmUgcmVzb2x1dGlvbiBzY2FsZSwgcmVsYXRpdmUgdG8gdGhlIHNjcmVlbiByZW5kZXIgc2l6ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMua2VybmVsU2l6ZT1LZXJuZWxTaXplLkxBUkdFXSAtIFRoZSBibHVyIGtlcm5lbCBzaXplLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5pbnRlbnNpdHk9MS4wXSAtIFRoZSBzdHJlbmd0aCBvZiB0aGUgYmxvb20gZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kaXN0aW5jdGlvbj0xLjBdIC0gVGhlIGx1bWluYW5jZSBkaXN0aW5jdGlvbiBmYWN0b3IuIFJhaXNlIHRoaXMgdmFsdWUgdG8gYnJpbmcgb3V0IHRoZSBicmlnaHRlciBlbGVtZW50cyBpbiB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjcmVlbk1vZGU9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JlZW4gYmxlbmQgbW9kZSBzaG91bGQgYmUgdXNlZCBmb3IgY29tYmluaW5nIHRoZSBibG9vbSB0ZXh0dXJlIHdpdGggdGhlIHNjZW5lIGNvbG9ycy5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQmxvb21QYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBibHVyIHBhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0JsdXJQYXNzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYmx1clBhc3MgPSBuZXcgQmx1clBhc3Mob3B0aW9ucyk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJlbmRlciB0YXJnZXQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0ID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KDEsIDEsIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGZhbHNlXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldC50ZXh0dXJlLm5hbWUgPSBcIkJsb29tLlRhcmdldFwiO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXQudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgY29tYmluZSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvbWJpbmVNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNvbWJpbmVNYXRlcmlhbCA9IG5ldyBDb21iaW5lTWF0ZXJpYWwoKG9wdGlvbnMuc2NyZWVuTW9kZSAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc2NyZWVuTW9kZSA6IHRydWUpO1xyXG5cclxuXHRcdHRoaXMuaW50ZW5zaXR5ID0gb3B0aW9ucy5pbnRlbnNpdHk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGx1bWlub3NpdHkgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtMdW1pbm9zaXR5TWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5sdW1pbm9zaXR5TWF0ZXJpYWwgPSBuZXcgTHVtaW5vc2l0eU1hdGVyaWFsKHRydWUpO1xyXG5cclxuXHRcdHRoaXMuZGlzdGluY3Rpb24gPSBvcHRpb25zLmRpc3RpbmN0aW9uO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByZXNvbHV0aW9uIHNjYWxlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKiBAZGVmYXVsdCAwLjVcclxuXHQgKi9cclxuXHJcblx0Z2V0IHJlc29sdXRpb25TY2FsZSgpIHsgcmV0dXJuIHRoaXMuYmx1clBhc3MucmVzb2x1dGlvblNjYWxlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFlvdSBuZWVkIHRvIGNhbGwge0BsaW5rIEVmZmVjdENvbXBvc2VyI3NldFNpemV9IGFmdGVyIGNoYW5naW5nIHRoaXMgdmFsdWUuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgcmVzb2x1dGlvblNjYWxlKHggPSAwLjUpIHsgdGhpcy5ibHVyUGFzcy5yZXNvbHV0aW9uU2NhbGUgPSB4OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBibHVyIGtlcm5lbCBzaXplLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0ICogQGRlZmF1bHQgS2VybmVsU2l6ZS5MQVJHRVxyXG5cdCAqL1xyXG5cclxuXHRnZXQga2VybmVsU2l6ZSgpIHsgcmV0dXJuIHRoaXMuYmx1clBhc3Mua2VybmVsU2l6ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBAdHlwZSB7S2VybmVsU2l6ZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IGtlcm5lbFNpemUoeCA9IEtlcm5lbFNpemUuTEFSR0UpIHsgdGhpcy5ibHVyUGFzcy5rZXJuZWxTaXplID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgb3ZlcmFsbCBpbnRlbnNpdHkgb2YgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICogQGRlZmF1bHQgMS4wXHJcblx0ICovXHJcblxyXG5cdGdldCBpbnRlbnNpdHkoKSB7IHJldHVybiB0aGlzLmNvbWJpbmVNYXRlcmlhbC51bmlmb3Jtcy5vcGFjaXR5Mi52YWx1ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgaW50ZW5zaXR5KHggPSAxLjApIHsgdGhpcy5jb21iaW5lTWF0ZXJpYWwudW5pZm9ybXMub3BhY2l0eTIudmFsdWUgPSB4OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsdW1pbmFuY2UgZGlzdGluY3Rpb24gZmFjdG9yLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKiBAZGVmYXVsdCAxLjBcclxuXHQgKi9cclxuXHJcblx0Z2V0IGRpc3RpbmN0aW9uKCkgeyByZXR1cm4gdGhpcy5sdW1pbm9zaXR5TWF0ZXJpYWwudW5pZm9ybXMuZGlzdGluY3Rpb24udmFsdWU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IGRpc3RpbmN0aW9uKHggPSAxLjApIHsgdGhpcy5sdW1pbm9zaXR5TWF0ZXJpYWwudW5pZm9ybXMuZGlzdGluY3Rpb24udmFsdWUgPSB4OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEV4dHJhY3RzIGEgbHVtaW5hbmNlIG1hcCBmcm9tIHRoZSByZWFkIGJ1ZmZlciwgYmx1cnMgaXQgYW5kIGNvbWJpbmVzIGl0XHJcblx0ICogd2l0aCB0aGUgcmVhZCBidWZmZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgcXVhZCA9IHRoaXMucXVhZDtcclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xyXG5cdFx0Y29uc3QgYmx1clBhc3MgPSB0aGlzLmJsdXJQYXNzO1xyXG5cclxuXHRcdGNvbnN0IGx1bWlub3NpdHlNYXRlcmlhbCA9IHRoaXMubHVtaW5vc2l0eU1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgY29tYmluZU1hdGVyaWFsID0gdGhpcy5jb21iaW5lTWF0ZXJpYWw7XHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXQgPSB0aGlzLnJlbmRlclRhcmdldDtcclxuXHJcblx0XHQvLyBMdW1pbmFuY2UgZmlsdGVyLlxyXG5cdFx0cXVhZC5tYXRlcmlhbCA9IGx1bWlub3NpdHlNYXRlcmlhbDtcclxuXHRcdGx1bWlub3NpdHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCByZW5kZXJUYXJnZXQpO1xyXG5cclxuXHRcdC8vIENvbnZvbHV0aW9uIHBoYXNlLlxyXG5cdFx0Ymx1clBhc3MucmVuZGVyKHJlbmRlcmVyLCByZW5kZXJUYXJnZXQsIHJlbmRlclRhcmdldCk7XHJcblxyXG5cdFx0Ly8gUmVuZGVyIHRoZSBvcmlnaW5hbCBzY2VuZSB3aXRoIHN1cGVyaW1wb3NlZCBibHVyLlxyXG5cdFx0cXVhZC5tYXRlcmlhbCA9IGNvbWJpbmVNYXRlcmlhbDtcclxuXHRcdGNvbWJpbmVNYXRlcmlhbC51bmlmb3Jtcy50ZXh0dXJlMS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdGNvbWJpbmVNYXRlcmlhbC51bmlmb3Jtcy50ZXh0dXJlMi52YWx1ZSA9IHJlbmRlclRhcmdldC50ZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBmb3JtYXQgb2YgdGhlIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFscGhhIC0gV2hldGhlciB0aGUgcmVuZGVyZXIgdXNlcyB0aGUgYWxwaGEgY2hhbm5lbCBvciBub3QuXHJcblx0ICovXHJcblxyXG5cdGluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKSB7XHJcblxyXG5cdFx0dGhpcy5ibHVyUGFzcy5pbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSk7XHJcblxyXG5cdFx0aWYoIWFscGhhKSB7IHRoaXMucmVuZGVyVGFyZ2V0LnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0OyB9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLmJsdXJQYXNzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0d2lkdGggPSB0aGlzLmJsdXJQYXNzLndpZHRoO1xyXG5cdFx0aGVpZ2h0ID0gdGhpcy5ibHVyUGFzcy5oZWlnaHQ7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXQuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBCb2tlaE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgRGVwdGggb2YgRmllbGQgKERvRikgcGFzcyB1c2luZyBhIGJva2VoIHNoYWRlci5cclxuICpcclxuICogVGhpcyBwYXNzIHJlcXVpcmVzIGEge0BsaW5rIEVmZmVjdENvbXBvc2VyI2RlcHRoVGV4dHVyZX0uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEJva2VoUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGJva2VoIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1BlcnNwZWN0aXZlQ2FtZXJhfSBjYW1lcmEgLSBUaGUgbWFpbiBjYW1lcmEuIFVzZWQgdG8gb2J0YWluIHRoZSBhc3BlY3QgcmF0aW8gYW5kIHRoZSBuZWFyIGFuZCBmYXIgcGxhbmUgc2V0dGluZ3MuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZm9jdXM9MS4wXSAtIEZvY3VzIGRpc3RhbmNlLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5hcGVydHVyZT0wLjAyNV0gLSBDYW1lcmEgYXBlcnR1cmUgc2NhbGUuIEJpZ2dlciB2YWx1ZXMgZm9yIHNoYWxsb3dlciBkZXB0aCBvZiBmaWVsZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4Qmx1cj0xLjBdIC0gTWF4aW11bSBibHVyIHN0cmVuZ3RoLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYW1lcmEsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkJva2VoUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgYm9rZWggc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb2tlaE1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuYm9rZWhNYXRlcmlhbCA9IG5ldyBCb2tlaE1hdGVyaWFsKGNhbWVyYSwgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5ib2tlaE1hdGVyaWFsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHR0aGlzLmJva2VoTWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR0aGlzLmJva2VoTWF0ZXJpYWwudW5pZm9ybXMudERlcHRoLnZhbHVlID0gcmVhZEJ1ZmZlci5kZXB0aFRleHR1cmU7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMuYm9rZWhNYXRlcmlhbC51bmlmb3Jtcy5hc3BlY3QudmFsdWUgPSB3aWR0aCAvIGhlaWdodDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBCb2tlaDJNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBbiBhZHZhbmNlZCBEZXB0aCBvZiBGaWVsZCAoRG9GKSBwYXNzLlxyXG4gKlxyXG4gKiBZaWVsZHMgbW9yZSByZWFsaXN0aWMgcmVzdWx0cyBidXQgaXMgYWxzbyBtb3JlIGRlbWFuZGluZy5cclxuICpcclxuICogVGhpcyBwYXNzIHJlcXVpcmVzIGEge0BsaW5rIEVmZmVjdENvbXBvc2VyI2RlcHRoVGV4dHVyZX0uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEJva2VoMlBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBib2tlaDIgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGVyc3BlY3RpdmVDYW1lcmF9IGNhbWVyYSAtIFRoZSBtYWluIGNhbWVyYS4gVXNlZCB0byBvYnRhaW4gdGhlIGZvY2FsIGxlbmd0aCBhbmQgdGhlIG5lYXIgYW5kIGZhciBwbGFuZSBzZXR0aW5ncy5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yaW5ncz0zXSAtIFRoZSBhbW91bnQgb2YgYmx1ciByaW5ncy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2FtcGxlcz00XSAtIFRoZSBhbW91bnQgb2Ygc2FtcGxlcyBwZXIgcmluZy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNob3dGb2N1cz1mYWxzZV0gLSBXaGV0aGVyIHRoZSBmb2N1cyBwb2ludCBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYW51YWxEb0Y9ZmFsc2VdIC0gRW5hYmxlcyBtYW51YWwgZGVwdGggb2YgZmllbGQgYmx1ci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnZpZ25ldHRlPWZhbHNlXSAtIEVuYWJsZXMgYSB2aWduZXR0ZSBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5wZW50YWdvbj1mYWxzZV0gLSBFbmFibGUgdG8gdXNlIGEgcGVudGFnb25hbCBzaGFwZSB0byBzY2FsZSBnYXRoZXJlZCB0ZXhlbHMuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zaGFkZXJGb2N1cz10cnVlXSAtIERpc2FibGUgaWYgeW91IGNvbXB1dGUgeW91ciBvd24gZm9jYWxEZXB0aCAoaW4gbWV0cmVzISkuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ub2lzZT10cnVlXSAtIERpc2FibGUgaWYgeW91IGRvbid0IHdhbnQgbm9pc2UgcGF0dGVybnMgZm9yIGRpdGhlcmluZy5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoY2FtZXJhLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJCb2tlaDJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBib2tlaCBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jva2VoTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5ib2tlaE1hdGVyaWFsID0gbmV3IEJva2VoMk1hdGVyaWFsKGNhbWVyYSwgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5ib2tlaE1hdGVyaWFsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHR0aGlzLmJva2VoTWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR0aGlzLmJva2VoTWF0ZXJpYWwudW5pZm9ybXMudERlcHRoLnZhbHVlID0gcmVhZEJ1ZmZlci5kZXB0aFRleHR1cmU7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMuYm9rZWhNYXRlcmlhbC5zZXRUZXhlbFNpemUoMS4wIC8gd2lkdGgsIDEuMCAvIGhlaWdodCk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIGZvciBzYXZpbmcgdGhlIG9yaWdpbmFsIGNsZWFyIGNvbG9yIG9mIHRoZSByZW5kZXJlci5cclxuICpcclxuICogQHR5cGUgQ29sb3JcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKi9cclxuXHJcbmNvbnN0IGNvbG9yID0gbmV3IENvbG9yKCk7XHJcblxyXG4vKipcclxuICogQSBjbGVhciBwYXNzLlxyXG4gKlxyXG4gKiBZb3UgY2FuIHByZXZlbnQgc3BlY2lmaWMgYnVmZmVycyBmcm9tIGJlaW5nIGNsZWFyZWQgYnkgc2V0dGluZyBlaXRoZXIgdGhlXHJcbiAqIGF1dG9DbGVhckNvbG9yLCBhdXRvQ2xlYXJTdGVuY2lsIG9yIGF1dG9DbGVhckRlcHRoIHByb3BlcnRpZXMgb2YgdGhlIHJlbmRlcmVyXHJcbiAqIHRvIGZhbHNlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGVhclBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBjbGVhciBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0NvbG9yfSBbb3B0aW9ucy5jbGVhckNvbG9yPW51bGxdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgY29sb3IuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmNsZWFyQWxwaGE9MC4wXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGFscGhhLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcihudWxsLCBudWxsLCBudWxsKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiQ2xlYXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhciBjb2xvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29sb3J9XHJcblx0XHQgKiBAZGVmYXVsdCBudWxsXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmNsZWFyQ29sb3IgPSAob3B0aW9ucy5jbGVhckNvbG9yICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhckNvbG9yIDogbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFyIGFscGhhLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAZGVmYXVsdCAwLjBcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJBbHBoYSA9IChvcHRpb25zLmNsZWFyQWxwaGEgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyQWxwaGEgOiAwLjA7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYXJzIHRoZSByZWFkIGJ1ZmZlciBvciB0aGUgc2NyZWVuLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHRjb25zdCBjbGVhckNvbG9yID0gdGhpcy5jbGVhckNvbG9yO1xyXG5cclxuXHRcdGxldCBjbGVhckFscGhhO1xyXG5cclxuXHRcdGlmKGNsZWFyQ29sb3IgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdGNvbG9yLmNvcHkocmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcigpKTtcclxuXHRcdFx0Y2xlYXJBbHBoYSA9IHJlbmRlcmVyLmdldENsZWFyQWxwaGEoKTtcclxuXHRcdFx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihjbGVhckNvbG9yLCB0aGlzLmNsZWFyQWxwaGEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQodGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiByZWFkQnVmZmVyKTtcclxuXHRcdHJlbmRlcmVyLmNsZWFyKCk7XHJcblxyXG5cdFx0aWYoY2xlYXJDb2xvciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihjb2xvciwgY2xlYXJBbHBoYSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwYXNzIHRoYXQgZGlzYWJsZXMgdGhlIHN0ZW5jaWwgbWFzay5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJNYXNrUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGNsZWFyIG1hc2sgcGFzcy5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkNsZWFyTWFza1Bhc3NcIjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNhYmxlcyB0aGUgc3RlbmNpbCB0ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyKSB7XHJcblxyXG5cdFx0cmVuZGVyZXIuc3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldFRlc3QoZmFsc2UpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERvdFNjcmVlbk1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgZG90IHNjcmVlbiBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBEb3RTY3JlZW5QYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZG90IHNjcmVlbiBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5hbmdsZT0xLjU3XSAtIFRoZSBhbmdsZSBvZiB0aGUgcGF0dGVybi5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2NhbGU9MS4wXSAtIFRoZSBzY2FsZSBvZiB0aGUgb3ZlcmFsbCBlZmZlY3QuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmludGVuc2l0eT0xLjBdIC0gVGhlIGludGVuc2l0eSBvZiB0aGUgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYXZlcmFnZT1mYWxzZV0gLSBXaGV0aGVyIHRoZSBzaGFkZXIgc2hvdWxkIG91dHB1dCBhIGNvbG91ciBhdmVyYWdlIChibGFjayBhbmQgd2hpdGUpLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJEb3RTY3JlZW5QYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBkb3Qgc2NyZWVuIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7RG90U2NyZWVuTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG5ldyBEb3RTY3JlZW5NYXRlcmlhbChvcHRpb25zLmF2ZXJhZ2UpO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuYW5nbGUgIT09IHVuZGVmaW5lZCkgeyB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gb3B0aW9ucy5hbmdsZTsgfVxyXG5cdFx0aWYob3B0aW9ucy5zY2FsZSAhPT0gdW5kZWZpbmVkKSB7IHRoaXMubWF0ZXJpYWwudW5pZm9ybXMuc2NhbGUudmFsdWUgPSBvcHRpb25zLnNjYWxlOyB9XHJcblx0XHRpZihvcHRpb25zLmludGVuc2l0eSAhPT0gdW5kZWZpbmVkKSB7IHRoaXMubWF0ZXJpYWwudW5pZm9ybXMuaW50ZW5zaXR5LnZhbHVlID0gb3B0aW9ucy5pbnRlbnNpdHk7IH1cclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHdpZHRoID0gTWF0aC5tYXgoMSwgd2lkdGgpO1xyXG5cdFx0aGVpZ2h0ID0gTWF0aC5tYXgoMSwgaGVpZ2h0KTtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLm9mZnNldFJlcGVhdC52YWx1ZS56ID0gd2lkdGg7XHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLm9mZnNldFJlcGVhdC52YWx1ZS53ID0gaGVpZ2h0O1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERlcHRoTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBkZXB0aCBwYXNzLlxyXG4gKlxyXG4gKiBSZWFkcyB0aGUgZGVwdGggZnJvbSBhIGRlcHRoIHRleHR1cmUgYW5kIHJlbmRlcnMgaXQuXHJcbiAqXHJcbiAqIFRoaXMgcGFzcyByZXF1aXJlcyBhIHtAbGluayBFZmZlY3RDb21wb3NlciNkZXB0aFRleHR1cmV9LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBEZXB0aFBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBkZXB0aCBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtQZXJzcGVjdGl2ZUNhbWVyYX0gY2FtZXJhIC0gVGhlIG1haW4gY2FtZXJhLiBVc2VkIHRvIG9idGFpbiB0aGUgbmVhciBhbmQgZmFyIHBsYW5lIHNldHRpbmdzLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYW1lcmEpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJEZXB0aFBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGRlcHRoIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7RGVwdGhNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmRlcHRoTWF0ZXJpYWwgPSBuZXcgRGVwdGhNYXRlcmlhbChjYW1lcmEpO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMuZGVwdGhNYXRlcmlhbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0dGhpcy5kZXB0aE1hdGVyaWFsLnVuaWZvcm1zLnREZXB0aC52YWx1ZSA9IHJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRmlsbU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgZmlsbSBwYXNzLlxyXG4gKlxyXG4gKiBQcm92aWRlcyB2YXJpb3VzIGNpbmVtYXRpYyBlZmZlY3RzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxtUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGZpbG0gcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy4gRGlzYWJsZWQgZWZmZWN0cyBoYXZlIG5vIG5lZ2F0aXZlIGltcGFjdCBvbiBwZXJmb3JtYW5jZS5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmdyZXlzY2FsZT1mYWxzZV0gLSBFbmFibGUgZ3JleXNjYWxlIGVmZmVjdC4gR3JleXNjYWxlIGFuZCBzZXBpYSBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2VwaWE9ZmFsc2VdIC0gRW5hYmxlIHNlcGlhIGVmZmVjdC4gR3JleXNjYWxlIGFuZCBzZXBpYSBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudmlnbmV0dGU9ZmFsc2VdIC0gQXBwbHkgdmlnbmV0dGUgZWZmZWN0LlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZXNraWw9ZmFsc2VdIC0gVXNlIEVza2lsJ3MgdmlnbmV0dGUgYXBwcm9hY2guIFRoZSBkZWZhdWx0IGxvb2tzIGR1c3R5IHdoaWxlIEVza2lsIGxvb2tzIG1vcmUgYnVybmVkIG91dC5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNjcmVlbk1vZGU9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JlZW4gYmxlbmQgbW9kZSBzaG91bGQgYmUgdXNlZCBmb3Igbm9pc2UgYW5kIHNjYW5saW5lcy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNjYW5saW5lcz10cnVlXSAtIFNob3cgc2NhbmxpbmVzLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubm9pc2U9dHJ1ZV0gLSBTaG93IG5vaXNlLWJhc2VkIGZpbG0gZ3JhaW4uXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm5vaXNlSW50ZW5zaXR5PTAuNV0gLSBUaGUgbm9pc2UgaW50ZW5zaXR5LiAwLjAgdG8gMS4wLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FubGluZUludGVuc2l0eT0wLjA1XSAtIFRoZSBzY2FubGluZSBpbnRlbnNpdHkuIDAuMCB0byAxLjAuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYW5saW5lRGVuc2l0eT0xLjBdIC0gVGhlIG51bWJlciBvZiBzY2FubGluZXMgaW4gcGVyY2VudCwgcmVsYXRpdmUgdG8gdGhlIHNjcmVlbiBoZWlnaHQuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmdyZXlzY2FsZUludGVuc2l0eT0xLjBdIC0gVGhlIGludGVuc2l0eSBvZiB0aGUgZ3JleXNjYWxlIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2VwaWFJbnRlbnNpdHk9MS4wXSAtIFRoZSBpbnRlbnNpdHkgb2YgdGhlIHNlcGlhIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudmlnbmV0dGVPZmZzZXQ9MS4wXSAtIFRoZSBvZmZzZXQgb2YgdGhlIHZpZ25ldHRlIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudmlnbmV0dGVEYXJrbmVzcz0xLjBdIC0gVGhlIGRhcmtuZXNzIG9mIHRoZSB2aWduZXR0ZSBlZmZlY3QuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIkZpbG1QYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRmlsbSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0ZpbG1NYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbmV3IEZpbG1NYXRlcmlhbChvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGFtb3VudCBvZiBzY2FubGluZXMgaW4gcGVyY2VudCwgcmVsYXRpdmUgdG8gdGhlIHNjcmVlbiBoZWlnaHQuXHJcblx0XHQgKlxyXG5cdFx0ICogWW91IG5lZWQgdG8gY2FsbCB7QGxpbmsgRWZmZWN0Q29tcG9zZXIjc2V0U2l6ZX0gYWZ0ZXIgY2hhbmdpbmcgdGhpc1xyXG5cdFx0ICogdmFsdWUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBkZWZhdWx0IDEuMjVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NhbmxpbmVEZW5zaXR5ID0gKG9wdGlvbnMuc2NhbmxpbmVEZW5zaXR5ID09PSB1bmRlZmluZWQpID8gMS4yNSA6IG9wdGlvbnMuc2NhbmxpbmVEZW5zaXR5O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhIC0gVGhlIHJlbmRlciBkZWx0YSB0aW1lLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyLCBkZWx0YSkge1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnRpbWUudmFsdWUgKz0gZGVsdGE7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBzY2FubGluZSBjb3VudCB1c2luZyB0aGUgcmVuZGVyZXIncyBoZWlnaHQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMuc2NhbmxpbmVDb3VudC52YWx1ZSA9IE1hdGgucm91bmQoaGVpZ2h0ICogdGhpcy5zY2FubGluZURlbnNpdHkpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERhdGFUZXh0dXJlLCBSR0JGb3JtYXQsIEZsb2F0VHlwZSB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBHbGl0Y2hNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbG93IC0gVGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZ2ggLSBUaGUgaGlnaGVzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmFuZG9tIHZhbHVlLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUludChsb3csIGhpZ2gpIHtcclxuXHJcblx0cmV0dXJuIGxvdyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChoaWdoIC0gbG93ICsgMSkpO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSByYW5kb20gZmxvYXQgaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbG93IC0gVGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZ2ggLSBUaGUgaGlnaGVzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmFuZG9tIHZhbHVlLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUZsb2F0KGxvdywgaGlnaCkge1xyXG5cclxuXHRyZXR1cm4gbG93ICsgTWF0aC5yYW5kb20oKSAqIChoaWdoIC0gbG93KTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGdsaXRjaCBwYXNzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHbGl0Y2hQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZ2xpdGNoIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtUZXh0dXJlfSBbb3B0aW9ucy5wZXJ0dXJiTWFwXSAtIEEgcGVydHVyYmF0aW9uIG1hcC4gSWYgbm9uZSBpcyBwcm92aWRlZCwgYSBub2lzZSB0ZXh0dXJlIHdpbGwgYmUgY3JlYXRlZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHRTaXplPTY0XSAtIFRoZSBzaXplIG9mIHRoZSBnZW5lcmF0ZWQgbm9pc2UgbWFwLiBXaWxsIGJlIGlnbm9yZWQgaWYgYSBwZXJ0dXJiYXRpb24gbWFwIGlzIHByb3ZpZGVkLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJHbGl0Y2hQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2xpdGNoIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7R2xpdGNoTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG5ldyBHbGl0Y2hNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHBlcnR1cmJhdGlvbiBtYXAuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1RleHR1cmV9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLnBlcnR1cmJNYXAgPSAob3B0aW9ucy5wZXJ0dXJiTWFwICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5wZXJ0dXJiTWFwIDogdGhpcy5nZW5lcmF0ZVBlcnR1cmJNYXAob3B0aW9ucy5kdFNpemUpO1xyXG5cdFx0dGhpcy5wZXJ0dXJiTWFwLm5hbWUgPSBcIkdsaXRjaC5QZXJ0dXJiYXRpb25cIjtcclxuXHRcdHRoaXMucGVydHVyYk1hcC5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZmZlY3QgbW9kZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7R2xpdGNoTW9kZX1cclxuXHRcdCAqIEBkZWZhdWx0IEdsaXRjaE1vZGUuU1BPUkFESUNcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubW9kZSA9IEdsaXRjaE1vZGUuU1BPUkFESUM7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDb3VudGVyIGZvciBnbGl0Y2ggYWN0aXZhdGlvbiBhbmQgZGVhY3RpdmF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3VudGVyID0gMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcmFuZG9tIGJyZWFrIHBvaW50IGZvciB0aGUgc3BvcmFkaWMgZ2xpdGNoIGFjdGl2YXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmJyZWFrUG9pbnQgPSByYW5kb21JbnQoMTIwLCAyNDApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IHBlcnR1cmJhdGlvbiBtYXAuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0Z2V0IHBlcnR1cmJNYXAoKSB7IHJldHVybiB0aGlzLnRleHR1cmU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQXNzaWduaW5nIGEgbmV3IHBlcnR1cmJhdGlvbiBtYXAgZG9lcyBub3QgZGVzdHJveSB0aGUgY3VycmVudCBvbmUhXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IHBlcnR1cmJNYXAoeCkge1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZSA9IHg7XHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnRQZXJ0dXJiLnZhbHVlID0geDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXN0cm95cyB0aGUgY3VycmVudCBwZXJ0dXJiYXRpb24gbWFwIGFuZCByZXBsYWNlcyBpdCB3aXRoIGEgbmV3IG9uZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbc2l6ZT02NF0gLSBUaGUgdGV4dHVyZSBzaXplLlxyXG5cdCAqIEByZXR1cm4ge0RhdGFUZXh0dXJlfSBUaGUgcGVydHVyYmF0aW9uIHRleHR1cmUuXHJcblx0ICovXHJcblxyXG5cdGdlbmVyYXRlUGVydHVyYk1hcChzaXplID0gNjQpIHtcclxuXHJcblx0XHRjb25zdCBwaXhlbHMgPSBzaXplICogc2l6ZTtcclxuXHRcdGNvbnN0IGRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHBpeGVscyAqIDMpO1xyXG5cclxuXHRcdGxldCBkdCA9IHRoaXMucGVydHVyYk1hcDtcclxuXHRcdGxldCBpLCB4O1xyXG5cclxuXHRcdGZvcihpID0gMDsgaSA8IHBpeGVsczsgKytpKSB7XHJcblxyXG5cdFx0XHR4ID0gTWF0aC5yYW5kb20oKTtcclxuXHJcblx0XHRcdGRhdGFbaSAqIDNdID0geDtcclxuXHRcdFx0ZGF0YVtpICogMyArIDFdID0geDtcclxuXHRcdFx0ZGF0YVtpICogMyArIDJdID0geDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZHQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdGR0LmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0ZHQgPSBuZXcgRGF0YVRleHR1cmUoZGF0YSwgc2l6ZSwgc2l6ZSwgUkdCRm9ybWF0LCBGbG9hdFR5cGUpO1xyXG5cdFx0ZHQubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMucGVydHVyYk1hcCA9IGR0O1xyXG5cclxuXHRcdHJldHVybiBkdDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgbW9kZSA9IHRoaXMubW9kZTtcclxuXHRcdGNvbnN0IGNvdW50ZXIgPSB0aGlzLmNvdW50ZXI7XHJcblx0XHRjb25zdCBicmVha1BvaW50ID0gdGhpcy5icmVha1BvaW50O1xyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cclxuXHRcdHVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0dW5pZm9ybXMuc2VlZC52YWx1ZSA9IE1hdGgucmFuZG9tKCk7XHJcblx0XHR1bmlmb3Jtcy5hY3RpdmUudmFsdWUgPSB0cnVlO1xyXG5cclxuXHRcdGlmKGNvdW50ZXIgJSBicmVha1BvaW50ID09PSAwIHx8IG1vZGUgPT09IEdsaXRjaE1vZGUuQ09OU1RBTlRfV0lMRCkge1xyXG5cclxuXHRcdFx0dW5pZm9ybXMuYW1vdW50LnZhbHVlID0gTWF0aC5yYW5kb20oKSAvIDMwLjA7XHJcblx0XHRcdHVuaWZvcm1zLmFuZ2xlLnZhbHVlID0gcmFuZG9tRmxvYXQoLU1hdGguUEksIE1hdGguUEkpO1xyXG5cdFx0XHR1bmlmb3Jtcy5zZWVkWC52YWx1ZSA9IHJhbmRvbUZsb2F0KC0xLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLnNlZWRZLnZhbHVlID0gcmFuZG9tRmxvYXQoLTEuMCwgMS4wKTtcclxuXHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblgudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdHVuaWZvcm1zLmRpc3RvcnRpb25ZLnZhbHVlID0gcmFuZG9tRmxvYXQoMC4wLCAxLjApO1xyXG5cclxuXHRcdFx0dGhpcy5icmVha1BvaW50ID0gcmFuZG9tSW50KDEyMCwgMjQwKTtcclxuXHRcdFx0dGhpcy5jb3VudGVyID0gMDtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYoY291bnRlciAlIGJyZWFrUG9pbnQgPCBicmVha1BvaW50IC8gNSB8fCBtb2RlID09PSBHbGl0Y2hNb2RlLkNPTlNUQU5UX01JTEQpIHtcclxuXHJcblx0XHRcdFx0dW5pZm9ybXMuYW1vdW50LnZhbHVlID0gTWF0aC5yYW5kb20oKSAvIDkwLjA7XHJcblx0XHRcdFx0dW5pZm9ybXMuYW5nbGUudmFsdWUgPSByYW5kb21GbG9hdCgtTWF0aC5QSSwgTWF0aC5QSSk7XHJcblx0XHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblgudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdFx0dW5pZm9ybXMuZGlzdG9ydGlvblkudmFsdWUgPSByYW5kb21GbG9hdCgwLjAsIDEuMCk7XHJcblx0XHRcdFx0dW5pZm9ybXMuc2VlZFgudmFsdWUgPSByYW5kb21GbG9hdCgtMC4zLCAwLjMpO1xyXG5cdFx0XHRcdHVuaWZvcm1zLnNlZWRZLnZhbHVlID0gcmFuZG9tRmxvYXQoLTAuMywgMC4zKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdC8vIFNwb3JhZGljLlxyXG5cdFx0XHRcdHVuaWZvcm1zLmFjdGl2ZS52YWx1ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQrK3RoaXMuY291bnRlcjtcclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBnbGl0Y2ggbW9kZSBlbnVtZXJhdGlvbi5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFNQT1JBRElDIC0gU3BvcmFkaWMgZ2xpdGNoZXMuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05TVEFOVF9NSUxEIC0gQ29uc3RhbnQgbWlsZCBnbGl0Y2hlcy5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENPTlNUQU5UX1dJTEQgLSBDb25zdGFudCB3aWxkIGdsaXRjaGVzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBHbGl0Y2hNb2RlID0ge1xyXG5cclxuXHRTUE9SQURJQzogMCxcclxuXHRDT05TVEFOVF9NSUxEOiAxLFxyXG5cdENPTlNUQU5UX1dJTEQ6IDJcclxuXHJcbn07XHJcbiIsImltcG9ydCB7IENsZWFyUGFzcyB9IGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwYXNzIHRoYXQgcmVuZGVycyBhIGdpdmVuIHNjZW5lIGRpcmVjdGx5IG9uIHNjcmVlbiBvciBpbnRvIHRoZSByZWFkIGJ1ZmZlclxyXG4gKiBmb3IgZnVydGhlciBwcm9jZXNzaW5nLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcmVuZGVyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBjYW1lcmEgdG8gdXNlIHRvIHJlbmRlciB0aGUgc2NlbmUuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge01hdGVyaWFsfSBbb3B0aW9ucy5vdmVycmlkZU1hdGVyaWFsPW51bGxdIC0gQW4gb3ZlcnJpZGUgbWF0ZXJpYWwgZm9yIHRoZSBzY2VuZS5cclxuXHQgKiBAcGFyYW0ge0NvbG9yfSBbb3B0aW9ucy5jbGVhckNvbG9yPW51bGxdIC0gQW4gb3ZlcnJpZGUgY2xlYXIgY29sb3IuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmNsZWFyQWxwaGE9MS4wXSAtIEFuIG92ZXJyaWRlIGNsZWFyIGFscGhhLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xlYXJEZXB0aD1mYWxzZV0gLSBXaGV0aGVyIGRlcHRoIHNob3VsZCBiZSBjbGVhcmVkIGV4cGxpY2l0bHkuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGVhcj10cnVlXSAtIFdoZXRoZXIgYWxsIGJ1ZmZlcnMgc2hvdWxkIGJlIGNsZWFyZWQuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjZW5lLCBjYW1lcmEsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKHNjZW5lLCBjYW1lcmEsIG51bGwpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJSZW5kZXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNsZWFyIHBhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NsZWFyUGFzc31cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJQYXNzID0gbmV3IENsZWFyUGFzcyhvcHRpb25zKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFuIG92ZXJyaWRlIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtNYXRlcmlhbH1cclxuXHRcdCAqIEBkZWZhdWx0IG51bGxcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMub3ZlcnJpZGVNYXRlcmlhbCA9IChvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWwgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLm92ZXJyaWRlTWF0ZXJpYWwgOiBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRlcHRoIGJ1ZmZlciBzaG91bGQgYmUgY2xlYXJlZCBleHBsaWNpdGx5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY2xlYXJEZXB0aCA9IChvcHRpb25zLmNsZWFyRGVwdGggIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmNsZWFyRGVwdGggOiBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2xvciwgZGVwdGggYW5kIHN0ZW5jaWwgYnVmZmVycyBzaG91bGQgYmUgY2xlYXJlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBFdmVuIHdpdGggY2xlYXIgc2V0IHRvIHRydWUgeW91IGNhbiBwcmV2ZW50IHNwZWNpZmljIGJ1ZmZlcnMgZnJvbSBiZWluZ1xyXG5cdFx0ICogY2xlYXJlZCBieSBzZXR0aW5nIGVpdGhlciB0aGUgYXV0b0NsZWFyQ29sb3IsIGF1dG9DbGVhclN0ZW5jaWwgb3JcclxuXHRcdCAqIGF1dG9DbGVhckRlcHRoIHByb3BlcnRpZXMgb2YgdGhlIHJlbmRlcmVyIHRvIGZhbHNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhciA9IChvcHRpb25zLmNsZWFyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5jbGVhciA6IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgc2NlbmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogcmVhZEJ1ZmZlcjtcclxuXHJcblx0XHRpZih0aGlzLmNsZWFyKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNsZWFyUGFzcy5yZW5kZXIocmVuZGVyZXIsIHRhcmdldCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmKHRoaXMuY2xlYXJEZXB0aCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRhcmdldCk7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0c2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IHRoaXMub3ZlcnJpZGVNYXRlcmlhbDtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEsIHRhcmdldCk7XHJcblx0XHRzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdENvbG9yLFxyXG5cdExpbmVhckZpbHRlcixcclxuXHRNZXNoQmFzaWNNYXRlcmlhbCxcclxuXHRSR0JGb3JtYXQsXHJcblx0U2NlbmUsXHJcblx0VmVjdG9yMyxcclxuXHRXZWJHTFJlbmRlclRhcmdldFxyXG59IGZyb20gXCJ0aHJlZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29tYmluZU1hdGVyaWFsLCBHb2RSYXlzTWF0ZXJpYWwsIEtlcm5lbFNpemUgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tIFwiLi9yZW5kZXIuanNcIjtcclxuaW1wb3J0IHsgQmx1clBhc3MgfSBmcm9tIFwiLi9ibHVyLmpzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQ2xhbXBzIGEgZ2l2ZW4gdmFsdWUuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNsYW1wLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbWluIC0gVGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCAtIFRoZSBoaWdoZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjbGFtcGVkIHZhbHVlLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xyXG5cclxuXHRyZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHZhbHVlKSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQSBjcmVwdXNjdWxhciByYXlzIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvZFJheXNQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgZ29kIHJheXMgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lIC0gVGhlIG1haW4gc2NlbmUuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBtYWluIGNhbWVyYS5cclxuXHQgKiBAcGFyYW0ge09iamVjdDNEfSBsaWdodFNvdXJjZSAtIFRoZSBtYWluIGxpZ2h0IHNvdXJjZS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gVGhlIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlbnNpdHk9MC45Nl0gLSBUaGUgZGVuc2l0eSBvZiB0aGUgbGlnaHQgcmF5cy5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVjYXk9MC45M10gLSBBbiBpbGx1bWluYXRpb24gZGVjYXkgZmFjdG9yLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53ZWlnaHQ9MC40XSAtIEEgbGlnaHQgcmF5IHdlaWdodCBmYWN0b3IuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmV4cG9zdXJlPTAuNl0gLSBBIGNvbnN0YW50IGF0dGVudWF0aW9uIGNvZWZmaWNpZW50LlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jbGFtcE1heD0xLjBdIC0gQW4gdXBwZXIgYm91bmQgZm9yIHRoZSBzYXR1cmF0aW9uIG9mIHRoZSBvdmVyYWxsIGVmZmVjdC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaW50ZW5zaXR5PTEuMF0gLSBBIGNvbnN0YW50IGZhY3RvciBmb3IgYWRkaXRpdmUgYmxlbmRpbmcuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlc29sdXRpb25TY2FsZT0wLjVdIC0gVGhlIHJlbmRlciB0ZXh0dXJlIHJlc29sdXRpb24gc2NhbGUsIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW4gcmVuZGVyIHNpemUuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmtlcm5lbFNpemU9S2VybmVsU2l6ZS5MQVJHRV0gLSBUaGUgYmx1ciBrZXJuZWwgc2l6ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2FtcGxlcz02MF0gLSBUaGUgbnVtYmVyIG9mIHNhbXBsZXMgcGVyIHBpeGVsLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY3JlZW5Nb2RlPXRydWVdIC0gV2hldGhlciB0aGUgc2NyZWVuIGJsZW5kIG1vZGUgc2hvdWxkIGJlIHVzZWQgZm9yIGNvbWJpbmluZyB0aGUgZ29kIHJheXMgdGV4dHVyZSB3aXRoIHRoZSBzY2VuZSBjb2xvcnMuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjZW5lLCBjYW1lcmEsIGxpZ2h0U291cmNlLCBvcHRpb25zID0ge30pIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJHb2RSYXlzUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgc2NlbmUgdGhhdCBvbmx5IGNvbnRhaW5zIHRoZSBsaWdodCBzb3VyY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NjZW5lfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubGlnaHRTY2VuZSA9IG5ldyBTY2VuZSgpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG1haW4gc2NlbmUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NjZW5lfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubWFpblNjZW5lID0gc2NlbmU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbWFpbiBjYW1lcmEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NhbWVyYX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1haW5DYW1lcmEgPSBjYW1lcmE7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHBhc3MgdGhhdCBvbmx5IHJlbmRlcnMgdGhlIGxpZ2h0IHNvdXJjZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UmVuZGVyUGFzc31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclBhc3NMaWdodCA9IG5ldyBSZW5kZXJQYXNzKHRoaXMubGlnaHRTY2VuZSwgdGhpcy5tYWluQ2FtZXJhKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcGFzcyB0aGF0IHJlbmRlcnMgdGhlIG1hc2tlZCBzY2VuZSBvdmVyIHRoZSBsaWdodC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UmVuZGVyUGFzc31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclBhc3NNYXNrID0gbmV3IFJlbmRlclBhc3ModGhpcy5tYWluU2NlbmUsIHRoaXMubWFpbkNhbWVyYSwge1xyXG5cdFx0XHRvdmVycmlkZU1hdGVyaWFsOiBuZXcgTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwMDAgfSksXHJcblx0XHRcdGNsZWFyQ29sb3I6IG5ldyBDb2xvcigweDAwMDAwMClcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyUGFzc01hc2suY2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgYmx1ciBwYXNzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCbHVyUGFzc31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmJsdXJQYXNzID0gbmV3IEJsdXJQYXNzKG9wdGlvbnMpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSByZW5kZXIgdGFyZ2V0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFggPSBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoMSwgMSwge1xyXG5cdFx0XHRtaW5GaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0bWFnRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WC50ZXh0dXJlLm5hbWUgPSBcIkdvZFJheXMuVGFyZ2V0WFwiO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRYLnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHNlY29uZCByZW5kZXIgdGFyZ2V0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFkgPSB0aGlzLnJlbmRlclRhcmdldFguY2xvbmUoKTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFkudGV4dHVyZS5uYW1lID0gXCJHb2RSYXlzLlRhcmdldFlcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcmVuZGVyIHRhcmdldCBmb3IgdGhlIG1hc2tlZCBsaWdodCBzY2VuZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRNYXNrID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KDEsIDEsIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldE1hc2sudGV4dHVyZS5uYW1lID0gXCJHb2RSYXlzLk1hc2tcIjtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0TWFzay50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGxpZ2h0IHNvdXJjZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0M0R9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmxpZ2h0U291cmNlID0gbGlnaHRTb3VyY2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbGlnaHQgcG9zaXRpb24gaW4gc2NyZWVuIHNwYWNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtWZWN0b3IzfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2NyZWVuUG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBnb2QgcmF5cyBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0dvZFJheXNNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLmdvZFJheXNNYXRlcmlhbCA9IG5ldyBHb2RSYXlzTWF0ZXJpYWwoKTtcclxuXHRcdHRoaXMuZ29kUmF5c01hdGVyaWFsLnVuaWZvcm1zLmxpZ2h0UG9zaXRpb24udmFsdWUgPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuZXhwb3N1cmUgIT09IHVuZGVmaW5lZCkgeyB0aGlzLmdvZFJheXNNYXRlcmlhbC51bmlmb3Jtcy5leHBvc3VyZS52YWx1ZSA9IG9wdGlvbnMuZXhwb3N1cmU7IH1cclxuXHRcdGlmKG9wdGlvbnMuZGVuc2l0eSAhPT0gdW5kZWZpbmVkKSB7IHRoaXMuZ29kUmF5c01hdGVyaWFsLnVuaWZvcm1zLmRlbnNpdHkudmFsdWUgPSBvcHRpb25zLmRlbnNpdHk7IH1cclxuXHRcdGlmKG9wdGlvbnMuZGVjYXkgIT09IHVuZGVmaW5lZCkgeyB0aGlzLmdvZFJheXNNYXRlcmlhbC51bmlmb3Jtcy5kZWNheS52YWx1ZSA9IG9wdGlvbnMuZGVjYXk7IH1cclxuXHRcdGlmKG9wdGlvbnMud2VpZ2h0ICE9PSB1bmRlZmluZWQpIHsgdGhpcy5nb2RSYXlzTWF0ZXJpYWwudW5pZm9ybXMud2VpZ2h0LnZhbHVlID0gb3B0aW9ucy53ZWlnaHQ7IH1cclxuXHRcdGlmKG9wdGlvbnMuY2xhbXBNYXggIT09IHVuZGVmaW5lZCkgeyB0aGlzLmdvZFJheXNNYXRlcmlhbC51bmlmb3Jtcy5jbGFtcE1heC52YWx1ZSA9IG9wdGlvbnMuY2xhbXBNYXg7IH1cclxuXHJcblx0XHR0aGlzLnNhbXBsZXMgPSBvcHRpb25zLnNhbXBsZXM7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvbWJpbmUgc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb21iaW5lTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb21iaW5lTWF0ZXJpYWwgPSBuZXcgQ29tYmluZU1hdGVyaWFsKChvcHRpb25zLnNjcmVlbk1vZGUgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLnNjcmVlbk1vZGUgOiB0cnVlKTtcclxuXHJcblx0XHR0aGlzLmludGVuc2l0eSA9IG9wdGlvbnMuaW50ZW5zaXR5O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByZXNvbHV0aW9uIHNjYWxlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKiBAZGVmYXVsdCAwLjVcclxuXHQgKi9cclxuXHJcblx0Z2V0IHJlc29sdXRpb25TY2FsZSgpIHsgcmV0dXJuIHRoaXMuYmx1clBhc3MucmVzb2x1dGlvblNjYWxlOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFlvdSBuZWVkIHRvIGNhbGwge0BsaW5rIEVmZmVjdENvbXBvc2VyI3NldFNpemV9IGFmdGVyIGNoYW5naW5nIHRoaXMgdmFsdWUuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgcmVzb2x1dGlvblNjYWxlKHggPSAwLjUpIHsgdGhpcy5ibHVyUGFzcy5yZXNvbHV0aW9uU2NhbGUgPSB4OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBibHVyIGtlcm5lbCBzaXplLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0tlcm5lbFNpemV9XHJcblx0ICogQGRlZmF1bHQgS2VybmVsU2l6ZS5MQVJHRVxyXG5cdCAqL1xyXG5cclxuXHRnZXQga2VybmVsU2l6ZSgpIHsgcmV0dXJuIHRoaXMuYmx1clBhc3Mua2VybmVsU2l6ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBAdHlwZSB7S2VybmVsU2l6ZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IGtlcm5lbFNpemUoeCA9IEtlcm5lbFNpemUuTEFSR0UpIHsgdGhpcy5ibHVyUGFzcy5rZXJuZWxTaXplID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgb3ZlcmFsbCBpbnRlbnNpdHkgb2YgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICogQGRlZmF1bHQgMS4wXHJcblx0ICovXHJcblxyXG5cdGdldCBpbnRlbnNpdHkoKSB7IHJldHVybiB0aGlzLmNvbWJpbmVNYXRlcmlhbC51bmlmb3Jtcy5vcGFjaXR5Mi52YWx1ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cclxuXHRzZXQgaW50ZW5zaXR5KHggPSAxLjApIHsgdGhpcy5jb21iaW5lTWF0ZXJpYWwudW5pZm9ybXMub3BhY2l0eTIudmFsdWUgPSB4OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBudW1iZXIgb2Ygc2FtcGxlcyBwZXIgcGl4ZWwuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqIEBkZWZhdWx0IDYwXHJcblx0ICovXHJcblxyXG5cdGdldCBzYW1wbGVzKCkgeyByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHRoaXMuZ29kUmF5c01hdGVyaWFsLmRlZmluZXMuTlVNX1NBTVBMRVNfSU5UKTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGlzIHZhbHVlIG11c3QgYmUgY2FyZWZ1bGx5IGNob3Nlbi4gQSBoaWdoZXIgdmFsdWUgZGlyZWN0bHkgaW5jcmVhc2VzIHRoZVxyXG5cdCAqIEdQVSBsb2FkLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IHNhbXBsZXMoeCA9IDYwKSB7XHJcblxyXG5cdFx0eCA9IE1hdGguZmxvb3IoeCk7XHJcblxyXG5cdFx0dGhpcy5nb2RSYXlzTWF0ZXJpYWwuZGVmaW5lcy5OVU1fU0FNUExFU19GTE9BVCA9IHgudG9GaXhlZCgxKTtcclxuXHRcdHRoaXMuZ29kUmF5c01hdGVyaWFsLmRlZmluZXMuTlVNX1NBTVBMRVNfSU5UID0geC50b0ZpeGVkKDApO1xyXG5cdFx0dGhpcy5nb2RSYXlzTWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIHNjZW5lLlxyXG5cdCAqXHJcblx0ICogVGhlIGdvZCByYXlzIHBhc3MgaGFzIGZvdXIgcGhhc2VzOlxyXG5cdCAqXHJcblx0ICogTWFzayBQaGFzZTpcclxuXHQgKiAgRmlyc3QsIHRoZSBsaWdodCBzb3VyY2UgaXMgcmVuZGVyZWQuIFRoZW4gdGhlIHNjZW5lIGlzIHJlbmRlcmVkIGludG8gdGhlXHJcblx0ICogIHNhbWUgYnVmZmVyIHVzaW5nIGEgbWFzayBvdmVycmlkZSBtYXRlcmlhbCB3aXRoIGRlcHRoIHRlc3QgZW5hYmxlZC5cclxuXHQgKlxyXG5cdCAqIFByZWxpbWluYXJ5IEJsdXIgUGhhc2U6XHJcblx0ICogIFRoZSBtYXNrZWQgc2NlbmUgaXMgYmx1cnJlZC5cclxuXHQgKlxyXG5cdCAqIEdvZCBSYXlzIFBoYXNlOlxyXG5cdCAqICBUaGUgYmx1cnJlZCBzY2VuZSBpcyBibHVycmVkIGFnYWluLCBidXQgdGhpcyB0aW1lIGFsb25nIHJhZGlhbCBsaW5lc1xyXG5cdCAqICB0b3dhcmRzIHRoZSBsaWdodCBzb3VyY2UuXHJcblx0ICpcclxuXHQgKiBDb21wb3NpdGUgUGhhc2U6XHJcblx0ICogIFRoZSBmaW5hbCByZXN1bHQgaXMgY29tYmluZWQgd2l0aCB0aGUgcmVhZCBidWZmZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIsIHdyaXRlQnVmZmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgcXVhZCA9IHRoaXMucXVhZDtcclxuXHRcdGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcclxuXHRcdGNvbnN0IGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xyXG5cdFx0Y29uc3QgbWFpblNjZW5lID0gdGhpcy5tYWluU2NlbmU7XHJcblxyXG5cdFx0Y29uc3QgbGlnaHRTb3VyY2UgPSB0aGlzLmxpZ2h0U291cmNlO1xyXG5cdFx0Y29uc3Qgc2NyZWVuUG9zaXRpb24gPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdGNvbnN0IGdvZFJheXNNYXRlcmlhbCA9IHRoaXMuZ29kUmF5c01hdGVyaWFsO1xyXG5cdFx0Y29uc3QgY29tYmluZU1hdGVyaWFsID0gdGhpcy5jb21iaW5lTWF0ZXJpYWw7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0TWFzayA9IHRoaXMucmVuZGVyVGFyZ2V0TWFzaztcclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldFggPSB0aGlzLnJlbmRlclRhcmdldFg7XHJcblx0XHRjb25zdCByZW5kZXJUYXJnZXRZID0gdGhpcy5yZW5kZXJUYXJnZXRZO1xyXG5cclxuXHRcdGxldCBiYWNrZ3JvdW5kLCBwYXJlbnQ7XHJcblxyXG5cdFx0Ly8gQ29tcHV0ZSB0aGUgc2NyZWVuIGxpZ2h0IHBvc2l0aW9uIGFuZCB0cmFuc2xhdGUgaXQgdG8gWzAsIDFdLlxyXG5cdFx0c2NyZWVuUG9zaXRpb24uY29weShsaWdodFNvdXJjZS5wb3NpdGlvbikucHJvamVjdCh0aGlzLm1haW5DYW1lcmEpO1xyXG5cdFx0c2NyZWVuUG9zaXRpb24ueCA9IGNsYW1wKChzY3JlZW5Qb3NpdGlvbi54ICsgMS4wKSAqIDAuNSwgMC4wLCAxLjApO1xyXG5cdFx0c2NyZWVuUG9zaXRpb24ueSA9IGNsYW1wKChzY3JlZW5Qb3NpdGlvbi55ICsgMS4wKSAqIDAuNSwgMC4wLCAxLjApO1xyXG5cclxuXHRcdC8vIFJlbmRlciB0aGUgbWFza2VkIHNjZW5lLlxyXG5cdFx0cGFyZW50ID0gbGlnaHRTb3VyY2UucGFyZW50O1xyXG5cdFx0YmFja2dyb3VuZCA9IG1haW5TY2VuZS5iYWNrZ3JvdW5kO1xyXG5cdFx0bWFpblNjZW5lLmJhY2tncm91bmQgPSBudWxsO1xyXG5cdFx0dGhpcy5saWdodFNjZW5lLmFkZChsaWdodFNvdXJjZSk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJQYXNzTGlnaHQucmVuZGVyKHJlbmRlcmVyLCByZW5kZXJUYXJnZXRNYXNrKTtcclxuXHRcdHRoaXMucmVuZGVyUGFzc01hc2sucmVuZGVyKHJlbmRlcmVyLCByZW5kZXJUYXJnZXRNYXNrKTtcclxuXHJcblx0XHRpZihwYXJlbnQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdHBhcmVudC5hZGQobGlnaHRTb3VyY2UpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRtYWluU2NlbmUuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XHJcblxyXG5cdFx0Ly8gQ29udm9sdXRpb24gcGhhc2UuXHJcblx0XHR0aGlzLmJsdXJQYXNzLnJlbmRlcihyZW5kZXJlciwgcmVuZGVyVGFyZ2V0TWFzaywgcmVuZGVyVGFyZ2V0WCk7XHJcblxyXG5cdFx0Ly8gR29kIHJheXMgcGFzcy5cclxuXHRcdHF1YWQubWF0ZXJpYWwgPSBnb2RSYXlzTWF0ZXJpYWw7XHJcblx0XHRnb2RSYXlzTWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZW5kZXJUYXJnZXRYLnRleHR1cmU7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0WSk7XHJcblxyXG5cdFx0Ly8gRmluYWwgcGFzcyAtIGNvbXBvc2l0ZSBnb2QgcmF5cyBvbnRvIGNvbG91cnMuXHJcblx0XHRxdWFkLm1hdGVyaWFsID0gY29tYmluZU1hdGVyaWFsO1xyXG5cdFx0Y29tYmluZU1hdGVyaWFsLnVuaWZvcm1zLnRleHR1cmUxLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0Y29tYmluZU1hdGVyaWFsLnVuaWZvcm1zLnRleHR1cmUyLnZhbHVlID0gcmVuZGVyVGFyZ2V0WS50ZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBmb3JtYXQgb2YgdGhlIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFscGhhIC0gV2hldGhlciB0aGUgcmVuZGVyZXIgdXNlcyB0aGUgYWxwaGEgY2hhbm5lbCBvciBub3QuXHJcblx0ICovXHJcblxyXG5cdGluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKSB7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJQYXNzTGlnaHQuaW5pdGlhbGlzZShyZW5kZXJlciwgYWxwaGEpO1xyXG5cdFx0dGhpcy5yZW5kZXJQYXNzTWFzay5pbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSk7XHJcblx0XHR0aGlzLmJsdXJQYXNzLmluaXRpYWxpc2UocmVuZGVyZXIsIGFscGhhKTtcclxuXHJcblx0XHRpZighYWxwaGEpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyVGFyZ2V0TWFzay50ZXh0dXJlLmZvcm1hdCA9IFJHQkZvcm1hdDtcclxuXHRcdFx0dGhpcy5yZW5kZXJUYXJnZXRYLnRleHR1cmUuZm9ybWF0ID0gUkdCRm9ybWF0O1xyXG5cdFx0XHR0aGlzLnJlbmRlclRhcmdldFkudGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJQYXNzTGlnaHQuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMucmVuZGVyUGFzc01hc2suc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMuYmx1clBhc3Muc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR3aWR0aCA9IHRoaXMuYmx1clBhc3Mud2lkdGg7XHJcblx0XHRoZWlnaHQgPSB0aGlzLmJsdXJQYXNzLmhlaWdodDtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldE1hc2suc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0WC5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRZLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1hc2sgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgTWFza1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBtYXNrIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSAtIFRoZSBzY2VuZSB0byByZW5kZXIuXHJcblx0ICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSAtIFRoZSBjYW1lcmEgdG8gdXNlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihzY2VuZSwgY2FtZXJhKSB7XHJcblxyXG5cdFx0c3VwZXIoc2NlbmUsIGNhbWVyYSwgbnVsbCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIk1hc2tQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnZlcnNlIGZsYWcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5pbnZlcnNlID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdGVuY2lsIGJ1ZmZlciBjbGVhciBmbGFnLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jbGVhclN0ZW5jaWwgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBzdGVuY2lsIGJpdCBtYXNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdGNvbnN0IGNvbnRleHQgPSByZW5kZXJlci5jb250ZXh0O1xyXG5cdFx0Y29uc3Qgc3RhdGUgPSByZW5kZXJlci5zdGF0ZTtcclxuXHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XHJcblx0XHRjb25zdCBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuXHJcblx0XHRjb25zdCB3cml0ZVZhbHVlID0gdGhpcy5pbnZlcnNlID8gMCA6IDE7XHJcblx0XHRjb25zdCBjbGVhclZhbHVlID0gMSAtIHdyaXRlVmFsdWU7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgdXBkYXRlIGNvbG9yIG9yIGRlcHRoLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5jb2xvci5zZXRNYXNrKGZhbHNlKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuZGVwdGguc2V0TWFzayhmYWxzZSk7XHJcblxyXG5cdFx0Ly8gTG9jayB0aGUgYnVmZmVycy5cclxuXHRcdHN0YXRlLmJ1ZmZlcnMuY29sb3Iuc2V0TG9ja2VkKHRydWUpO1xyXG5cdFx0c3RhdGUuYnVmZmVycy5kZXB0aC5zZXRMb2NrZWQodHJ1ZSk7XHJcblxyXG5cdFx0Ly8gQ29uZmlndXJlIHRoZSBzdGVuY2lsLlxyXG5cdFx0c3RhdGUuYnVmZmVycy5zdGVuY2lsLnNldFRlc3QodHJ1ZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0T3AoY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UsIGNvbnRleHQuUkVQTEFDRSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkFMV0FZUywgd3JpdGVWYWx1ZSwgMHhmZmZmZmZmZik7XHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0Q2xlYXIoY2xlYXJWYWx1ZSk7XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHN0ZW5jaWwuXHJcblx0XHRpZih0aGlzLmNsZWFyU3RlbmNpbCkge1xyXG5cclxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHJlYWRCdWZmZXIpO1xyXG5cdFx0XHRyZW5kZXJlci5jbGVhclN0ZW5jaWwoKTtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCh3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdHJlbmRlcmVyLmNsZWFyU3RlbmNpbCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBEcmF3IHRoZSBtYXNrIGludG8gYm90aCBidWZmZXJzLlxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlYWRCdWZmZXIpO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHdyaXRlQnVmZmVyKTtcclxuXHJcblx0XHQvLyBVbmxvY2sgdGhlIGJ1ZmZlcnMuXHJcblx0XHRzdGF0ZS5idWZmZXJzLmNvbG9yLnNldExvY2tlZChmYWxzZSk7XHJcblx0XHRzdGF0ZS5idWZmZXJzLmRlcHRoLnNldExvY2tlZChmYWxzZSk7XHJcblxyXG5cdFx0Ly8gT25seSByZW5kZXIgd2hlcmUgdGhlIHN0ZW5jaWwgaXMgc2V0IHRvIDEuXHJcblx0XHRzdGF0ZS5idWZmZXJzLnN0ZW5jaWwuc2V0RnVuYyhjb250ZXh0LkVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdHN0YXRlLmJ1ZmZlcnMuc3RlbmNpbC5zZXRPcChjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCwgY29udGV4dC5LRUVQKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQaXhlbGF0aW9uTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwaXhlbGF0aW9uIHBhc3MuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpeGVsYXRpb25QYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgcGl4ZWxhdGlvbiBwYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtncmFudWxhcml0eT0zMC4wXSAtIFRoZSBpbnRlbnNpdHkgb2YgdGhlIGVmZmVjdC5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IoZ3JhbnVsYXJpdHkgPSAzMC4wKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoaXMgcGFzcy5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IFwiUGl4ZWxhdGlvblBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHBpeGVsYXRpb24gc2hhZGVyIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtQaXhlbGF0aW9uTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5waXhlbGF0aW9uTWF0ZXJpYWwgPSBuZXcgUGl4ZWxhdGlvbk1hdGVyaWFsKCk7XHJcblxyXG5cdFx0dGhpcy5ncmFudWxhcml0eSA9IGdyYW51bGFyaXR5O1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMucGl4ZWxhdGlvbk1hdGVyaWFsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBwaXhlbCBncmFudWxhcml0eS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICogQGRlZmF1bHQgMzAuMFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgZ3JhbnVsYXJpdHkoKSB7IHJldHVybiB0aGlzLnBpeGVsYXRpb25NYXRlcmlhbC5ncmFudWxhcml0eTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGhpZ2hlciB2YWx1ZSB5aWVsZHMgY29hcnNlciB2aXN1YWxzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IGdyYW51bGFyaXR5KHggPSAzMCkge1xyXG5cclxuXHRcdHggPSBNYXRoLmZsb29yKHgpO1xyXG5cclxuXHRcdGlmKHggJSAyID4gMCkge1xyXG5cclxuXHRcdFx0eCArPSAxO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBpeGVsYXRpb25NYXRlcmlhbC5ncmFudWxhcml0eSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgZWZmZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHdyaXRlQnVmZmVyIC0gVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcikge1xyXG5cclxuXHRcdHRoaXMucGl4ZWxhdGlvbk1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGlzIHBhc3Mgd2l0aCB0aGUgcmVuZGVyZXIncyBzaXplLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cclxuXHRzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcblx0XHR0aGlzLnBpeGVsYXRpb25NYXRlcmlhbC5zZXRSZXNvbHV0aW9uKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IExpbmVhckZpbHRlciwgUkdCRm9ybWF0LCBXZWJHTFJlbmRlclRhcmdldCB9IGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBDb3B5TWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogQSBwYXNzIHRoYXQgcmVuZGVycyB0aGUgcmVzdWx0IGZyb20gYSBwcmV2aW91cyBwYXNzIHRvIGFub3RoZXIgcmVuZGVyIHRhcmdldC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2F2ZVBhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyBzYXZlIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIFRoZSByZW5kZXIgdGFyZ2V0IHRvIHVzZSBmb3Igc2F2aW5nIHRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtyZXNpemU9dHJ1ZV0gLSBXaGV0aGVyIHRoZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBhZGp1c3QgdG8gdGhlIHNpemUgb2YgdGhlIHJlYWQvd3JpdGUgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZW5kZXJUYXJnZXQsIHJlc2l6ZSA9IHRydWUpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTYXZlUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ29weSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0NvcHlNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbmV3IENvcHlNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVuZGVyIHRhcmdldC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldCA9IChyZW5kZXJUYXJnZXQgIT09IHVuZGVmaW5lZCkgPyByZW5kZXJUYXJnZXQgOiBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoMSwgMSwge1xyXG5cdFx0XHRtaW5GaWx0ZXI6IExpbmVhckZpbHRlcixcclxuXHRcdFx0bWFnRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxyXG5cdFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0LnRleHR1cmUubmFtZSA9IFwiU2F2ZS5UYXJnZXRcIjtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0LnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgYmUgcmVzaXplZCB3aGVuIHRoZSBzaXplIG9mXHJcblx0XHQgKiB0aGUgY29tcG9zZXIncyByZWFkL3dyaXRlIGJ1ZmZlciBjaGFuZ2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxyXG5cdFx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZXNpemUgPSByZXNpemU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2F2ZXMgdGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSByZWFkQnVmZmVyIC0gVGhlIHJlYWQgYnVmZmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZW5kZXIocmVuZGVyZXIsIHJlYWRCdWZmZXIpIHtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUYXJnZXQpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkanVzdHMgdGhlIGZvcm1hdCBvZiB0aGUgcmVuZGVyIHRhcmdldC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBhbHBoYSAtIFdoZXRoZXIgdGhlIHJlbmRlcmVyIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwgb3Igbm90LlxyXG5cdCAqL1xyXG5cclxuXHRpbml0aWFsaXNlKHJlbmRlcmVyLCBhbHBoYSkge1xyXG5cclxuXHRcdGlmKCFhbHBoYSkge1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJUYXJnZXQudGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0aWYodGhpcy5yZXNpemUpIHtcclxuXHJcblx0XHRcdHdpZHRoID0gTWF0aC5tYXgoMSwgd2lkdGgpO1xyXG5cdFx0XHRoZWlnaHQgPSBNYXRoLm1heCgxLCBoZWlnaHQpO1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJUYXJnZXQuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUGFzcyB9IGZyb20gXCIuL3Bhc3MuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBBIHNoYWRlciBwYXNzLlxyXG4gKlxyXG4gKiBVc2VkIHRvIHJlbmRlciBhbnkgc2hhZGVyIG1hdGVyaWFsIGFzIGEgMkQgZmlsdGVyLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJQYXNzIGV4dGVuZHMgUGFzcyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdHMgYSBuZXcgc2hhZGVyIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1NoYWRlck1hdGVyaWFsfSBtYXRlcmlhbCAtIFRoZSBzaGFkZXIgbWF0ZXJpYWwgdG8gdXNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbdGV4dHVyZUlEPVwidERpZmZ1c2VcIl0gLSBUaGUgdGV4dHVyZSB1bmlmb3JtIGlkZW50aWZpZXIuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsLCB0ZXh0dXJlSUQgPSBcInREaWZmdXNlXCIpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWUgb2YgdGhpcyBwYXNzLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gXCJTaGFkZXJQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNoYWRlciBtYXRlcmlhbCB0byB1c2UgZm9yIHJlbmRlcmluZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U2hhZGVyTWF0ZXJpYWx9XHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBuYW1lIG9mIHRoZSBjb2xvciBzYW1wbGVyIHVuaWZvcm0gb2YgdGhlIGdpdmVuIG1hdGVyaWFsLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtTdHJpbmd9XHJcblx0XHQgKiBAZGVmYXVsdCBcInREaWZmdXNlXCJcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGV4dHVyZUlEID0gdGV4dHVyZUlEO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIGVmZmVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHRpZih0aGlzLm1hdGVyaWFsLnVuaWZvcm1zW3RoaXMudGV4dHVyZUlEXSAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zW3RoaXMudGV4dHVyZUlEXS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IENvcHlNYXRlcmlhbCwgU2hvY2tXYXZlTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogSGFsZiBQSS5cclxuICpcclxuICogQHR5cGUge051bWJlcn1cclxuICogQHByaXZhdGVcclxuICogQHN0YXRpY1xyXG4gKiBAZmluYWxcclxuICovXHJcblxyXG5jb25zdCBIQUxGX1BJID0gTWF0aC5QSSAqIDAuNTtcclxuXHJcbi8qKlxyXG4gKiBBIHZlY3Rvci5cclxuICpcclxuICogQHR5cGUge1ZlY3RvcjN9XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBzdGF0aWNcclxuICogQGZpbmFsXHJcbiAqL1xyXG5cclxuY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XHJcblxyXG4vKipcclxuICogQSB2ZWN0b3IuXHJcbiAqXHJcbiAqIEB0eXBlIHtWZWN0b3IzfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBmaW5hbFxyXG4gKi9cclxuXHJcbmNvbnN0IGFiID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcbi8qKlxyXG4gKiBBIHNob2NrIHdhdmUgcGFzcy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2hvY2tXYXZlUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHNob2NrIHdhdmUgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgLSBUaGUgbWFpbiBjYW1lcmEuXHJcblx0ICogQHBhcmFtIHtWZWN0b3IzfSBbZXBpY2VudGVyXSAtIFRoZSB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgc2hvY2sgd2F2ZSBlcGljZW50ZXIuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zcGVlZD0xLjBdIC0gVGhlIGFuaW1hdGlvbiBzcGVlZC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UmFkaXVzPTEuMF0gLSBUaGUgZXh0ZW50IG9mIHRoZSBzaG9jayB3YXZlLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53YXZlU2l6ZT0wLjJdIC0gVGhlIHdhdmUgc2l6ZS5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYW1wbGl0dWRlPTAuMDVdIC0gVGhlIGRpc3RvcnRpb24gYW1wbGl0dWRlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYW1lcmEsIGVwaWNlbnRlciA9IG5ldyBWZWN0b3IzKCksIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlNob2NrV2F2ZVBhc3NcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoaXMgcGFzcyByZW5kZXJzIHRvIHRoZSB3cml0ZSBidWZmZXIuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbWFpbiBjYW1lcmEuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdDNEfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5tYWluQ2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVwaWNlbnRlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VmVjdG9yM31cclxuXHRcdCAqIEBleGFtcGxlIHNob2NrV2F2ZVBhc3MuZXBpY2VudGVyID0gbXlNZXNoLnBvc2l0aW9uO1xyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5lcGljZW50ZXIgPSBlcGljZW50ZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgb2JqZWN0IHBvc2l0aW9uIGluIHNjcmVlbiBzcGFjZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VmVjdG9yM31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnNjcmVlblBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzcGVlZCBvZiB0aGUgc2hvY2sgd2F2ZSBhbmltYXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge051bWJlcn1cclxuXHRcdCAqIEBkZWZhdWx0IDIuMFxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5zcGVlZCA9IChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5zcGVlZCA6IDIuMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgdGltZSBhY2N1bXVsYXRvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMudGltZSA9IDAuMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzaG9jayB3YXZlIGFuaW1hdGlvbiBpcyBhY3RpdmUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgc2hvY2sgd2F2ZSBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1Nob2NrV2F2ZU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuc2hvY2tXYXZlTWF0ZXJpYWwgPSBuZXcgU2hvY2tXYXZlTWF0ZXJpYWwob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbC51bmlmb3Jtcy5jZW50ZXIudmFsdWUgPSB0aGlzLnNjcmVlblBvc2l0aW9uO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjb3B5IHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29weU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsID0gbmV3IENvcHlNYXRlcmlhbCgpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVtaXRzIHRoZSBzaG9jayB3YXZlLlxyXG5cdCAqL1xyXG5cclxuXHRleHBsb2RlKCkge1xyXG5cclxuXHRcdHRoaXMudGltZSA9IDAuMDtcclxuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YSAtIFRoZSByZW5kZXIgZGVsdGEgdGltZS5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEpIHtcclxuXHJcblx0XHRjb25zdCBlcGljZW50ZXIgPSB0aGlzLmVwaWNlbnRlcjtcclxuXHRcdGNvbnN0IG1haW5DYW1lcmEgPSB0aGlzLm1haW5DYW1lcmE7XHJcblx0XHRjb25zdCBzY3JlZW5Qb3NpdGlvbiA9IHRoaXMuc2NyZWVuUG9zaXRpb247XHJcblxyXG5cdFx0Y29uc3Qgc2hvY2tXYXZlTWF0ZXJpYWwgPSB0aGlzLnNob2NrV2F2ZU1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSBzaG9ja1dhdmVNYXRlcmlhbC51bmlmb3JtcztcclxuXHRcdGNvbnN0IGNlbnRlciA9IHVuaWZvcm1zLmNlbnRlcjtcclxuXHRcdGNvbnN0IHJhZGl1cyA9IHVuaWZvcm1zLnJhZGl1cztcclxuXHRcdGNvbnN0IG1heFJhZGl1cyA9IHVuaWZvcm1zLm1heFJhZGl1cztcclxuXHRcdGNvbnN0IHdhdmVTaXplID0gdW5pZm9ybXMud2F2ZVNpemU7XHJcblxyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLmNvcHlNYXRlcmlhbDtcclxuXHJcblx0XHRpZih0aGlzLmFjdGl2ZSkge1xyXG5cclxuXHRcdFx0Ly8gQ2FsY3VsYXRlIGRpcmVjdGlvbiB2ZWN0b3JzLlxyXG5cdFx0XHRtYWluQ2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKHYpO1xyXG5cdFx0XHRhYi5jb3B5KG1haW5DYW1lcmEucG9zaXRpb24pLnN1YihlcGljZW50ZXIpO1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgcmVuZGVyIHRoZSBlZmZlY3QgaWYgdGhlIG9iamVjdCBpcyBiZWhpbmQgdGhlIGNhbWVyYS5cclxuXHRcdFx0aWYodi5hbmdsZVRvKGFiKSA+IEhBTEZfUEkpIHtcclxuXHJcblx0XHRcdFx0Ly8gU2NhbGUgdGhlIGVmZmVjdCBiYXNlZCBvbiBkaXN0YW5jZSB0byB0aGUgb2JqZWN0LlxyXG5cdFx0XHRcdHVuaWZvcm1zLmNhbWVyYURpc3RhbmNlLnZhbHVlID0gbWFpbkNhbWVyYS5wb3NpdGlvbi5kaXN0YW5jZVRvKGVwaWNlbnRlcik7XHJcblxyXG5cdFx0XHRcdC8vIENhbGN1bGF0ZSB0aGUgc2NyZWVuIHBvc2l0aW9uIG9mIHRoZSBlcGljZW50ZXIuXHJcblx0XHRcdFx0c2NyZWVuUG9zaXRpb24uY29weShlcGljZW50ZXIpLnByb2plY3QobWFpbkNhbWVyYSk7XHJcblx0XHRcdFx0Y2VudGVyLnZhbHVlLnggPSAoc2NyZWVuUG9zaXRpb24ueCArIDEuMCkgKiAwLjU7XHJcblx0XHRcdFx0Y2VudGVyLnZhbHVlLnkgPSAoc2NyZWVuUG9zaXRpb24ueSArIDEuMCkgKiAwLjU7XHJcblxyXG5cdFx0XHRcdHVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0XHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IHNob2NrV2F2ZU1hdGVyaWFsO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBzaG9jayB3YXZlIHJhZGl1cyBiYXNlZCBvbiB0aW1lLlxyXG5cdFx0XHR0aGlzLnRpbWUgKz0gZGVsdGE7XHJcblx0XHRcdHJhZGl1cy52YWx1ZSA9IHRoaXMudGltZSAqIHRoaXMuc3BlZWQgLSB3YXZlU2l6ZS52YWx1ZTtcclxuXHJcblx0XHRcdGlmKHJhZGl1cy52YWx1ZSA+PSAobWF4UmFkaXVzLnZhbHVlICsgd2F2ZVNpemUudmFsdWUpICogMikge1xyXG5cclxuXHRcdFx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVG9TY3JlZW4gPyBudWxsIDogd3JpdGVCdWZmZXIpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhpcyBwYXNzIHdpdGggdGhlIHJlbmRlcmVyJ3Mgc2l6ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0dGhpcy5zaG9ja1dhdmVNYXRlcmlhbC51bmlmb3Jtcy5hc3BlY3QudmFsdWUgPSB3aWR0aCAvIGhlaWdodDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdExpbmVhckZpbHRlcixcclxuXHROZWFyZXN0RmlsdGVyLFxyXG5cdFJHQkFGb3JtYXQsXHJcblx0UkdCRm9ybWF0LFxyXG5cdFRleHR1cmUsXHJcblx0V2ViR0xSZW5kZXJUYXJnZXRcclxufSBmcm9tIFwidGhyZWVcIjtcclxuXHJcbmltcG9ydCB7IFNNQUFCbGVuZE1hdGVyaWFsLCBTTUFBQ29sb3JFZGdlc01hdGVyaWFsLCBTTUFBV2VpZ2h0c01hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFN1YnBpeGVsIE1vcnBob2xvZ2ljYWwgQW50aWFsaWFzaW5nIChTTUFBKSB2Mi44LlxyXG4gKlxyXG4gKiBQcmVzZXQ6IFNNQUEgMXggTWVkaXVtICh3aXRoIGNvbG9yIGVkZ2UgZGV0ZWN0aW9uKS5cclxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9pcnlva3Uvc21hYS9yZWxlYXNlcy90YWcvdjIuOFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTTUFBUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IFNNQUEgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7SW1hZ2V9IEltYWdlIC0gVGhpcyBwYXNzIHJlcXVpcmVzIGFuIEltYWdlIGNsYXNzIHRvIGNyZWF0ZSBpbnRlcm5hbCB0ZXh0dXJlcy4gUHJvdmlkZSB3aW5kb3cuSW1hZ2UgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihJbWFnZSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlNNQUFQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGlzIHBhc3MgcmVuZGVycyB0byB0aGUgd3JpdGUgYnVmZmVyLlxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5uZWVkc1N3YXAgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSByZW5kZXIgdGFyZ2V0IGZvciB0aGUgY29sb3IgZWRnZSBkZXRlY3Rpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dlYkdMUmVuZGVyVGFyZ2V0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0Q29sb3JFZGdlcyA9IG5ldyBXZWJHTFJlbmRlclRhcmdldCgxLCAxLCB7XHJcblx0XHRcdG1pbkZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRmb3JtYXQ6IFJHQkZvcm1hdCxcclxuXHRcdFx0c3RlbmNpbEJ1ZmZlcjogZmFsc2UsXHJcblx0XHRcdGRlcHRoQnVmZmVyOiBmYWxzZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRDb2xvckVkZ2VzLnRleHR1cmUubmFtZSA9IFwiU01BQS5Db2xvckVkZ2VzXCI7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldENvbG9yRWRnZXMudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgcmVuZGVyIHRhcmdldCBmb3IgdGhlIFNNQUEgd2VpZ2h0cy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRXZWlnaHRzID0gdGhpcy5yZW5kZXJUYXJnZXRDb2xvckVkZ2VzLmNsb25lKCk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRXZWlnaHRzLnRleHR1cmUubmFtZSA9IFwiU01BQS5XZWlnaHRzXCI7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFdlaWdodHMudGV4dHVyZS5mb3JtYXQgPSBSR0JBRm9ybWF0O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU01BQSBjb2xvciBlZGdlIGRldGVjdGlvbiBzaGFkZXIgbWF0ZXJpYWwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NNQUFDb2xvckVkZ2VzTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb2xvckVkZ2VzTWF0ZXJpYWwgPSBuZXcgU01BQUNvbG9yRWRnZXNNYXRlcmlhbCgpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU01BQSB3ZWlnaHRzIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U01BQVdlaWdodHNNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLndlaWdodHNNYXRlcmlhbCA9IG5ldyBTTUFBV2VpZ2h0c01hdGVyaWFsKCk7XHJcblxyXG5cdFx0Y29uc3QgYXJlYUltYWdlID0gbmV3IEltYWdlKCk7XHJcblx0XHRhcmVhSW1hZ2Uuc3JjID0gdGhpcy53ZWlnaHRzTWF0ZXJpYWwuYXJlYUltYWdlO1xyXG5cclxuXHRcdGNvbnN0IGFyZWFUZXh0dXJlID0gbmV3IFRleHR1cmUoKTtcclxuXHRcdGFyZWFUZXh0dXJlLmltYWdlID0gYXJlYUltYWdlO1xyXG5cdFx0YXJlYVRleHR1cmUubmFtZSA9IFwiU01BQS5BcmVhXCI7XHJcblx0XHRhcmVhVGV4dHVyZS5taW5GaWx0ZXIgPSBMaW5lYXJGaWx0ZXI7XHJcblx0XHRhcmVhVGV4dHVyZS5mb3JtYXQgPSBSR0JGb3JtYXQ7XHJcblx0XHRhcmVhVGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHRcdGFyZWFUZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHRcdGFyZWFUZXh0dXJlLmZsaXBZID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3Qgc2VhcmNoSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdHNlYXJjaEltYWdlLnNyYyA9IHRoaXMud2VpZ2h0c01hdGVyaWFsLnNlYXJjaEltYWdlO1xyXG5cclxuXHRcdGNvbnN0IHNlYXJjaFRleHR1cmUgPSBuZXcgVGV4dHVyZSgpO1xyXG5cdFx0c2VhcmNoVGV4dHVyZS5pbWFnZSA9IHNlYXJjaEltYWdlO1xyXG5cdFx0c2VhcmNoVGV4dHVyZS5uYW1lID0gXCJTTUFBLlNlYXJjaFwiO1xyXG5cdFx0c2VhcmNoVGV4dHVyZS5tYWdGaWx0ZXIgPSBOZWFyZXN0RmlsdGVyO1xyXG5cdFx0c2VhcmNoVGV4dHVyZS5taW5GaWx0ZXIgPSBOZWFyZXN0RmlsdGVyO1xyXG5cdFx0c2VhcmNoVGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcclxuXHRcdHNlYXJjaFRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdFx0c2VhcmNoVGV4dHVyZS5mbGlwWSA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMud2VpZ2h0c01hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gdGhpcy5yZW5kZXJUYXJnZXRDb2xvckVkZ2VzLnRleHR1cmU7XHJcblx0XHR0aGlzLndlaWdodHNNYXRlcmlhbC51bmlmb3Jtcy50QXJlYS52YWx1ZSA9IGFyZWFUZXh0dXJlO1xyXG5cdFx0dGhpcy53ZWlnaHRzTWF0ZXJpYWwudW5pZm9ybXMudFNlYXJjaC52YWx1ZSA9IHNlYXJjaFRleHR1cmU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTTUFBIGJsZW5kIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7U01BQUJsZW5kTWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5ibGVuZE1hdGVyaWFsID0gbmV3IFNNQUFCbGVuZE1hdGVyaWFsKCk7XHJcblxyXG5cdFx0dGhpcy5ibGVuZE1hdGVyaWFsLnVuaWZvcm1zLnRXZWlnaHRzLnZhbHVlID0gdGhpcy5yZW5kZXJUYXJnZXRXZWlnaHRzLnRleHR1cmU7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5ibGVuZE1hdGVyaWFsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFudGlhbGlhc2VzIHRoZSBzY2VuZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gcmVhZEJ1ZmZlciAtIFRoZSByZWFkIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSB3cml0ZUJ1ZmZlciAtIFRoZSB3cml0ZSBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIpIHtcclxuXHJcblx0XHQvLyBEZXRlY3QgY29sb3IgZWRnZXMuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLmNvbG9yRWRnZXNNYXRlcmlhbDtcclxuXHRcdHRoaXMuY29sb3JFZGdlc01hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRhcmdldENvbG9yRWRnZXMsIHRydWUpO1xyXG5cclxuXHRcdC8vIENvbXB1dGUgZWRnZSB3ZWlnaHRzLlxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy53ZWlnaHRzTWF0ZXJpYWw7XHJcblx0XHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyVGFyZ2V0V2VpZ2h0cywgZmFsc2UpO1xyXG5cclxuXHRcdC8vIEFwcGx5IHRoZSBhbnRpYWxpYXNpbmcgZmlsdGVyIHRvIHRoZSBjb2xvcnMuXHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwgPSB0aGlzLmJsZW5kTWF0ZXJpYWw7XHJcblx0XHR0aGlzLmJsZW5kTWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XHJcblxyXG5cdFx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHdyaXRlQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoaXMgcGFzcyB3aXRoIHRoZSByZW5kZXJlcidzIHNpemUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQuXHJcblx0ICovXHJcblxyXG5cdHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0Q29sb3JFZGdlcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRXZWlnaHRzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0dGhpcy5jb2xvckVkZ2VzTWF0ZXJpYWwudW5pZm9ybXMudGV4ZWxTaXplLnZhbHVlLmNvcHkoXHJcblx0XHRcdHRoaXMud2VpZ2h0c01hdGVyaWFsLnVuaWZvcm1zLnRleGVsU2l6ZS52YWx1ZS5jb3B5KFxyXG5cdFx0XHRcdHRoaXMuYmxlbmRNYXRlcmlhbC51bmlmb3Jtcy50ZXhlbFNpemUudmFsdWUuc2V0KFxyXG5cdFx0XHRcdFx0MS4wIC8gd2lkdGgsIDEuMCAvIGhlaWdodFxyXG5cdFx0KSkpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEFkZGl0aXZlQmxlbmRpbmcgfSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBQYXNzIH0gZnJvbSBcIi4vcGFzcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEEgcGFzcyB0aGF0IHJlbmRlcnMgYSBnaXZlbiB0ZXh0dXJlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0dXJlUGFzcyBleHRlbmRzIFBhc3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IHRleHR1cmUgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7VGV4dHVyZX0gdGV4dHVyZSAtIFRoZSB0ZXh0dXJlLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3BhY2l0eT0xLjBdIC0gVGhlIHRleHR1cmUgb3BhY2l0eS5cclxuXHQgKi9cclxuXHJcblx0Y29uc3RydWN0b3IodGV4dHVyZSwgb3BhY2l0eSA9IDEuMCkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlRleHR1cmVQYXNzXCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgc2hhZGVyIG1hdGVyaWFsIHVzZWQgZm9yIHJlbmRlcmluZyB0byB0ZXh0dXJlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtDb3B5TWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5TWF0ZXJpYWwgPSBuZXcgQ29weU1hdGVyaWFsKCk7XHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbC5ibGVuZGluZyA9IEFkZGl0aXZlQmxlbmRpbmc7XHJcblx0XHR0aGlzLmNvcHlNYXRlcmlhbC50cmFuc3BhcmVudCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuXHRcdHRoaXMub3BhY2l0eSA9IG9wYWNpdHk7XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5jb3B5TWF0ZXJpYWw7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHRleHR1cmUuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0Z2V0IHRleHR1cmUoKSB7IHJldHVybiB0aGlzLmNvcHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBAdHlwZSB7VGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IHRleHR1cmUoeCkgeyB0aGlzLmNvcHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHg7IH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG9wYWNpdHkuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7TnVtYmVyfVxyXG5cdCAqIEBkZWZhdWx0IDEuMFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgb3BhY2l0eSgpIHsgcmV0dXJuIHRoaXMuY29weU1hdGVyaWFsLnVuaWZvcm1zLm9wYWNpdHkudmFsdWU7IH1cclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGUge051bWJlcn1cclxuXHQgKi9cclxuXHJcblx0c2V0IG9wYWNpdHkoeCA9IDEuMCkgeyB0aGlzLmNvcHlNYXRlcmlhbC51bmlmb3Jtcy5vcGFjaXR5LnZhbHVlID0geDsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICovXHJcblxyXG5cdHJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlcikge1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiByZWFkQnVmZmVyKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdExpbmVhckZpbHRlcixcclxuXHRMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIsXHJcblx0TWVzaEJhc2ljTWF0ZXJpYWwsXHJcblx0UkdCRm9ybWF0LFxyXG5cdFdlYkdMUmVuZGVyVGFyZ2V0XHJcbn0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQge1xyXG5cdEFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsLFxyXG5cdENvcHlNYXRlcmlhbCxcclxuXHRMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0VG9uZU1hcHBpbmdNYXRlcmlhbFxyXG59IGZyb20gXCIuLi9tYXRlcmlhbHNcIjtcclxuXHJcbmltcG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcblxyXG4vKipcclxuICogUm91bmRzIHRoZSBnaXZlbiBudW1iZXIgdXAgdG8gdGhlIG5leHQgcG93ZXIgb2YgdHdvLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIC0gQSBudW1iZXIuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIG5leHQgcG93ZXIgb2YgdHdvLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGNlaWwyKG4pIHsgcmV0dXJuIE1hdGgucG93KDIsIE1hdGgubWF4KDAsIE1hdGguY2VpbChNYXRoLmxvZzIobikpKSk7IH1cclxuXHJcbi8qKlxyXG4gKiBBIHRvbmUgbWFwcGluZyBwYXNzIHRoYXQgc3VwcG9ydHMgYWRhcHRpdmUgbHVtaW5vc2l0eS5cclxuICpcclxuICogSWYgYWRhcHRpdml0eSBpcyBlbmFibGVkLCB0aGlzIHBhc3MgZ2VuZXJhdGVzIGEgdGV4dHVyZSB0aGF0IHJlcHJlc2VudHMgdGhlXHJcbiAqIGx1bWlub3NpdHkgb2YgdGhlIGN1cnJlbnQgc2NlbmUgYW5kIGFkanVzdHMgaXQgb3ZlciB0aW1lIHRvIHNpbXVsYXRlIHRoZVxyXG4gKiBvcHRpYyBuZXJ2ZSByZXNwb25kaW5nIHRvIHRoZSBhbW91bnQgb2YgbGlnaHQgaXQgaXMgcmVjZWl2aW5nLlxyXG4gKlxyXG4gKiBSZWZlcmVuY2U6XHJcbiAqICBHREMyMDA3IC0gV29sZmdhbmcgRW5nZWwsIFBvc3QtUHJvY2Vzc2luZyBQaXBlbGluZVxyXG4gKiAgaHR0cDovL3BlcnNvLnVuaXYtbHlvbjEuZnIvamVhbi1jbGF1ZGUuaWVobC9QdWJsaWMvZWR1Yy9HQU1BLzIwMDcvZ2RjMDcvUG9zdC1Qcm9jZXNzaW5nX1BpcGVsaW5lLnBkZlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBUb25lTWFwcGluZ1Bhc3MgZXh0ZW5kcyBQYXNzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0cyBhIG5ldyB0b25lIG1hcHBpbmcgcGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkYXB0aXZlPXRydWVdIC0gV2hldGhlciB0aGUgdG9uZSBtYXBwaW5nIHNob3VsZCB1c2UgYW4gYWRhcHRpdmUgbHVtaW5hbmNlIG1hcC5cclxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVzb2x1dGlvbj0yNTZdIC0gVGhlIHJlbmRlciB0ZXh0dXJlIHJlc29sdXRpb24uXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRpc3RpbmN0aW9uPTEuMF0gLSBBIGx1bWluYW5jZSBkaXN0aW5jdGlvbiBmYWN0b3IuXHJcblx0ICovXHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbmFtZSBvZiB0aGlzIHBhc3MuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLm5hbWUgPSBcIlRvbmVNYXBwaW5nUGFzc1wiO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhpcyBwYXNzIHJlbmRlcnMgdG8gdGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubmVlZHNTd2FwID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSByZW5kZXIgdGFyZ2V0IGZvciB0aGUgY3VycmVudCBsdW1pbm9zaXR5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKiBAdG9kbyBVc2UgUkVEIGZvcm1hdCBpbiBXZWJHTCAyLjAuXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldEx1bWlub3NpdHkgPSBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoMSwgMSwge1xyXG5cdFx0XHRtaW5GaWx0ZXI6IExpbmVhck1pcE1hcExpbmVhckZpbHRlcixcclxuXHRcdFx0bWFnRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdGZvcm1hdDogUkdCRm9ybWF0LFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBmYWxzZSxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGZhbHNlXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldEx1bWlub3NpdHkudGV4dHVyZS5uYW1lID0gXCJUb25lTWFwcGluZy5MdW1pbm9zaXR5XCI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVuZGVyIHRhcmdldCBmb3IgYWRhcHRlZCBsdW1pbm9zaXR5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldEFkYXB0ZWQgPSB0aGlzLnJlbmRlclRhcmdldEx1bWlub3NpdHkuY2xvbmUoKTtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldEFkYXB0ZWQudGV4dHVyZS5uYW1lID0gXCJUb25lTWFwcGluZy5BZGFwdGVkTHVtaW5vc2l0eVwiO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRBZGFwdGVkLnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldEFkYXB0ZWQudGV4dHVyZS5taW5GaWx0ZXIgPSBMaW5lYXJGaWx0ZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIHJlbmRlciB0YXJnZXQgdGhhdCBob2xkcyBhIGNvcHkgb2YgdGhlIGFkYXB0ZWQgbGltb25vc2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRQcmV2aW91cyA9IHRoaXMucmVuZGVyVGFyZ2V0QWRhcHRlZC5jbG9uZSgpO1xyXG5cclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0UHJldmlvdXMudGV4dHVyZS5uYW1lID0gXCJUb25lTWFwcGluZy5QcmV2aW91c0x1bWlub3NpdHlcIjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENvcHkgc2hhZGVyIG1hdGVyaWFsIHVzZWQgZm9yIHNhdmluZyB0aGUgbHVtaW5hbmNlIG1hcC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Q29weU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMuY29weU1hdGVyaWFsID0gbmV3IENvcHlNYXRlcmlhbCgpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQSBsdW1pbm9zaXR5IHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7THVtaW5vc2l0eU1hdGVyaWFsfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cclxuXHRcdHRoaXMubHVtaW5vc2l0eU1hdGVyaWFsID0gbmV3IEx1bWlub3NpdHlNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMubHVtaW5vc2l0eU1hdGVyaWFsLnVuaWZvcm1zLmRpc3RpbmN0aW9uLnZhbHVlID0gKG9wdGlvbnMuZGlzdGluY3Rpb24gIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmRpc3RpbmN0aW9uIDogMS4wO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQW4gYWRhcHRpdmUgbHVtaW5hbmNlIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7QWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWx9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5hZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCA9IG5ldyBBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMucmVzb2x1dGlvbiA9IG9wdGlvbnMucmVzb2x1dGlvbjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEEgdG9uZSBtYXBwaW5nIHNoYWRlciBtYXRlcmlhbC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7VG9uZU1hcHBpbmdNYXRlcmlhbH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnRvbmVNYXBwaW5nTWF0ZXJpYWwgPSBuZXcgVG9uZU1hcHBpbmdNYXRlcmlhbCgpO1xyXG5cclxuXHRcdHRoaXMuYWRhcHRpdmUgPSBvcHRpb25zLmFkYXB0aXZlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByZXNvbHV0aW9uIG9mIHRoZSByZW5kZXIgdGFyZ2V0cy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICogQGRlZmF1bHQgMjU2XHJcblx0ICovXHJcblxyXG5cdGdldCByZXNvbHV0aW9uKCkgeyByZXR1cm4gdGhpcy5yZW5kZXJUYXJnZXRMdW1pbm9zaXR5LndpZHRoOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByZXNvbHV0aW9uIG9mIHRoZSByZW5kZXIgdGFyZ2V0cy4gTXVzdCBiZSBhIHBvd2VyIG9mIHR3byBmb3IgbWlwbWFwcy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOdW1iZXJ9XHJcblx0ICovXHJcblxyXG5cdHNldCByZXNvbHV0aW9uKHggPSAyNTYpIHtcclxuXHJcblx0XHR4ID0gY2VpbDIoeCk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRMdW1pbm9zaXR5LnNldFNpemUoeCwgeCk7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldFByZXZpb3VzLnNldFNpemUoeCwgeCk7XHJcblx0XHR0aGlzLnJlbmRlclRhcmdldEFkYXB0ZWQuc2V0U2l6ZSh4LCB4KTtcclxuXHJcblx0XHR0aGlzLmFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsLmRlZmluZXMuTUlQX0xFVkVMXzFYMSA9IChNYXRoLnJvdW5kKE1hdGgubG9nKHgpKSAvIE1hdGgubG9nKDIpKS50b0ZpeGVkKDEpO1xyXG5cdFx0dGhpcy5hZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciB0aGlzIHBhc3MgdXNlcyBhZGFwdGl2ZSBsdW1pbm9zaXR5LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdCAqL1xyXG5cclxuXHRnZXQgYWRhcHRpdmUoKSB7IHJldHVybiAodGhpcy50b25lTWFwcGluZ01hdGVyaWFsLmRlZmluZXMuQURBUFRFRF9MVU1JTkFOQ0UgIT09IHVuZGVmaW5lZCk7IH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciB0aGlzIHBhc3Mgc2hvdWxkIHVzZSBhZGFwdGl2ZSBsdW1pbm9zaXR5LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0Jvb2xlYW59XHJcblx0ICovXHJcblxyXG5cdHNldCBhZGFwdGl2ZSh4ID0gdHJ1ZSkge1xyXG5cclxuXHRcdGlmKHgpIHtcclxuXHJcblx0XHRcdHRoaXMudG9uZU1hcHBpbmdNYXRlcmlhbC5kZWZpbmVzLkFEQVBURURfTFVNSU5BTkNFID0gXCIxXCI7XHJcblx0XHRcdHRoaXMudG9uZU1hcHBpbmdNYXRlcmlhbC51bmlmb3Jtcy5sdW1pbmFuY2VNYXAudmFsdWUgPSB0aGlzLnJlbmRlclRhcmdldEFkYXB0ZWQudGV4dHVyZTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0ZGVsZXRlIHRoaXMudG9uZU1hcHBpbmdNYXRlcmlhbC5kZWZpbmVzLkFEQVBURURfTFVNSU5BTkNFO1xyXG5cdFx0XHR0aGlzLnRvbmVNYXBwaW5nTWF0ZXJpYWwudW5pZm9ybXMubHVtaW5hbmNlTWFwLnZhbHVlID0gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50b25lTWFwcGluZ01hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBlZmZlY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIHJlbmRlcmVyLlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJUYXJnZXR9IHJlYWRCdWZmZXIgLSBUaGUgcmVhZCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlclRhcmdldH0gd3JpdGVCdWZmZXIgLSBUaGUgd3JpdGUgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YSAtIFRoZSByZW5kZXIgZGVsdGEgdGltZS5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlciwgZGVsdGEpIHtcclxuXHJcblx0XHRjb25zdCBxdWFkID0gdGhpcy5xdWFkO1xyXG5cdFx0Y29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG5cdFx0Y29uc3QgY2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcblxyXG5cdFx0Y29uc3QgYWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWwgPSB0aGlzLmFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsO1xyXG5cdFx0Y29uc3QgbHVtaW5vc2l0eU1hdGVyaWFsID0gdGhpcy5sdW1pbm9zaXR5TWF0ZXJpYWw7XHJcblx0XHRjb25zdCB0b25lTWFwcGluZ01hdGVyaWFsID0gdGhpcy50b25lTWFwcGluZ01hdGVyaWFsO1xyXG5cdFx0Y29uc3QgY29weU1hdGVyaWFsID0gdGhpcy5jb3B5TWF0ZXJpYWw7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0UHJldmlvdXMgPSB0aGlzLnJlbmRlclRhcmdldFByZXZpb3VzO1xyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0THVtaW5vc2l0eSA9IHRoaXMucmVuZGVyVGFyZ2V0THVtaW5vc2l0eTtcclxuXHRcdGNvbnN0IHJlbmRlclRhcmdldEFkYXB0ZWQgPSB0aGlzLnJlbmRlclRhcmdldEFkYXB0ZWQ7XHJcblxyXG5cdFx0aWYodGhpcy5hZGFwdGl2ZSkge1xyXG5cclxuXHRcdFx0Ly8gUmVuZGVyIHRoZSBsdW1pbmFuY2Ugb2YgdGhlIGN1cnJlbnQgc2NlbmUgaW50byBhIHJlbmRlciB0YXJnZXQgd2l0aCBtaXBtYXBwaW5nIGVuYWJsZWQuXHJcblx0XHRcdHF1YWQubWF0ZXJpYWwgPSBsdW1pbm9zaXR5TWF0ZXJpYWw7XHJcblx0XHRcdGx1bWlub3NpdHlNYXRlcmlhbC51bmlmb3Jtcy50RGlmZnVzZS52YWx1ZSA9IHJlYWRCdWZmZXIudGV4dHVyZTtcclxuXHRcdFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldEx1bWlub3NpdHkpO1xyXG5cclxuXHRcdFx0Ly8gVXNlIHRoZSBuZXcgbHVtaW5hbmNlIHZhbHVlcywgdGhlIHByZXZpb3VzIGx1bWluYW5jZSBhbmQgdGhlIGZyYW1lIGRlbHRhIHRvIGFkYXB0IHRoZSBsdW1pbmFuY2Ugb3ZlciB0aW1lLlxyXG5cdFx0XHRxdWFkLm1hdGVyaWFsID0gYWRhcHRpdmVMdW1pbm9zaXR5TWF0ZXJpYWw7XHJcblx0XHRcdGFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsLnVuaWZvcm1zLmRlbHRhLnZhbHVlID0gZGVsdGE7XHJcblx0XHRcdGFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsLnVuaWZvcm1zLnRQcmV2aW91c0x1bS52YWx1ZSA9IHJlbmRlclRhcmdldFByZXZpb3VzLnRleHR1cmU7XHJcblx0XHRcdGFkYXB0aXZlTHVtaW5vc2l0eU1hdGVyaWFsLnVuaWZvcm1zLnRDdXJyZW50THVtLnZhbHVlID0gcmVuZGVyVGFyZ2V0THVtaW5vc2l0eS50ZXh0dXJlO1xyXG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0QWRhcHRlZCk7XHJcblxyXG5cdFx0XHQvLyBDb3B5IHRoZSBuZXcgYWRhcHRlZCBsdW1pbmFuY2UgdmFsdWUgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBieSB0aGUgbmV4dCBmcmFtZS5cclxuXHRcdFx0cXVhZC5tYXRlcmlhbCA9IGNvcHlNYXRlcmlhbDtcclxuXHRcdFx0Y29weU1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVuZGVyVGFyZ2V0QWRhcHRlZC50ZXh0dXJlO1xyXG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0UHJldmlvdXMpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBBcHBseSB0aGUgdG9uZSBtYXBwaW5nIHRvIHRoZSBjb2xvdXJzLlxyXG5cdFx0cXVhZC5tYXRlcmlhbCA9IHRvbmVNYXBwaW5nTWF0ZXJpYWw7XHJcblx0XHR0b25lTWFwcGluZ01hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUb1NjcmVlbiA/IG51bGwgOiB3cml0ZUJ1ZmZlcik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyBzb21ldGhpbmcgaW50byB0aGUgcHJldmlvdXMgbHVtaW5vc2l0eSB0ZXh0dXJlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtXZWJHTFJlbmRlcmVyfSByZW5kZXJlciAtIFRoZSByZW5kZXJlci5cclxuXHQgKi9cclxuXHJcblx0aW5pdGlhbGlzZShyZW5kZXJlcikge1xyXG5cclxuXHRcdHRoaXMucXVhZC5tYXRlcmlhbCA9IG5ldyBNZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDdmZmZmZiB9KTtcclxuXHRcdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJUYXJnZXRQcmV2aW91cyk7XHJcblx0XHR0aGlzLnF1YWQubWF0ZXJpYWwuZGlzcG9zZSgpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbXBpbGF0aW9uIG9mIHRoZSBwb3N0IHByb2Nlc3NpbmcgcGFzc2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIHBvc3Rwcm9jZXNzaW5nL3Bhc3Nlc1xyXG4gKi9cclxuXHJcbmV4cG9ydCB7IEJsb29tUGFzcyB9IGZyb20gXCIuL2Jsb29tLmpzXCI7XHJcbmV4cG9ydCB7IEJsdXJQYXNzIH0gZnJvbSBcIi4vYmx1ci5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaFBhc3MgfSBmcm9tIFwiLi9ib2tlaC5qc1wiO1xyXG5leHBvcnQgeyBCb2tlaDJQYXNzIH0gZnJvbSBcIi4vYm9rZWgyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyUGFzcyB9IGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmV4cG9ydCB7IENsZWFyTWFza1Bhc3MgfSBmcm9tIFwiLi9jbGVhci1tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IERvdFNjcmVlblBhc3MgfSBmcm9tIFwiLi9kb3Qtc2NyZWVuLmpzXCI7XHJcbmV4cG9ydCB7IERlcHRoUGFzcyB9IGZyb20gXCIuL2RlcHRoLmpzXCI7XHJcbmV4cG9ydCB7IEZpbG1QYXNzIH0gZnJvbSBcIi4vZmlsbS5qc1wiO1xyXG5leHBvcnQgeyBHbGl0Y2hNb2RlLCBHbGl0Y2hQYXNzIH0gZnJvbSBcIi4vZ2xpdGNoLmpzXCI7XHJcbmV4cG9ydCB7IEdvZFJheXNQYXNzIH0gZnJvbSBcIi4vZ29kLXJheXMuanNcIjtcclxuZXhwb3J0IHsgTWFza1Bhc3MgfSBmcm9tIFwiLi9tYXNrLmpzXCI7XHJcbmV4cG9ydCB7IFBhc3MgfSBmcm9tIFwiLi9wYXNzLmpzXCI7XHJcbmV4cG9ydCB7IFBpeGVsYXRpb25QYXNzIH0gZnJvbSBcIi4vcGl4ZWxhdGlvbi5qc1wiO1xyXG5leHBvcnQgeyBSZW5kZXJQYXNzIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNhdmVQYXNzIH0gZnJvbSBcIi4vc2F2ZS5qc1wiO1xyXG5leHBvcnQgeyBTaGFkZXJQYXNzIH0gZnJvbSBcIi4vc2hhZGVyLmpzXCI7XHJcbmV4cG9ydCB7IFNob2NrV2F2ZVBhc3MgfSBmcm9tIFwiLi9zaG9jay13YXZlLmpzXCI7XHJcbmV4cG9ydCB7IFNNQUFQYXNzIH0gZnJvbSBcIi4vc21hYS5qc1wiO1xyXG5leHBvcnQgeyBUZXh0dXJlUGFzcyB9IGZyb20gXCIuL3RleHR1cmUuanNcIjtcclxuZXhwb3J0IHsgVG9uZU1hcHBpbmdQYXNzIH0gZnJvbSBcIi4vdG9uZS1tYXBwaW5nLmpzXCI7XHJcbiIsImltcG9ydCB7XHJcblx0RGVwdGhTdGVuY2lsRm9ybWF0LFxyXG5cdERlcHRoVGV4dHVyZSxcclxuXHRMaW5lYXJGaWx0ZXIsXHJcblx0UkdCQUZvcm1hdCxcclxuXHRSR0JGb3JtYXQsXHJcblx0VW5zaWduZWRJbnQyNDhUeXBlLFxyXG5cdFdlYkdMUmVuZGVyVGFyZ2V0XHJcbn0gZnJvbSBcInRocmVlXCI7XHJcblxyXG5pbXBvcnQgeyBDbGVhck1hc2tQYXNzLCBNYXNrUGFzcywgU2hhZGVyUGFzcyB9IGZyb20gXCIuLi9wYXNzZXNcIjtcclxuaW1wb3J0IHsgQ29weU1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFZmZlY3RDb21wb3NlciBtYXkgYmUgdXNlZCBpbiBwbGFjZSBvZiBhIG5vcm1hbCBXZWJHTFJlbmRlcmVyLlxyXG4gKlxyXG4gKiBUaGUgYXV0byBjbGVhciBiZWhhdmlvdXIgb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyIHdpbGwgYmUgZGlzYWJsZWQgdG8gcHJldmVudFxyXG4gKiB1bm5lY2Vzc2FyeSBjbGVhciBvcGVyYXRpb25zLlxyXG4gKlxyXG4gKiBJdCBpcyBjb21tb24gcHJhY3RpY2UgdG8gdXNlIGEge0BsaW5rIFJlbmRlclBhc3N9IGFzIHRoZSBmaXJzdCBwYXNzIHRvXHJcbiAqIGF1dG9tYXRpY2FsbHkgY2xlYXIgdGhlIHNjcmVlbiBhbmQgcmVuZGVyIHRoZSBzY2VuZSB0byBhIHRleHR1cmUgZm9yIGZ1cnRoZXJcclxuICogcHJvY2Vzc2luZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRWZmZWN0Q29tcG9zZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RzIGEgbmV3IGVmZmVjdCBjb21wb3Nlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7V2ViR0xSZW5kZXJlcn0gW3JlbmRlcmVyXSAtIFRoZSByZW5kZXJlciB0aGF0IHNob3VsZCBiZSB1c2VkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucy5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRlcHRoQnVmZmVyPXRydWVdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIGRlcHRoIGJ1ZmZlci5cclxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0ZW5jaWxCdWZmZXI9ZmFsc2VdIC0gV2hldGhlciB0aGUgbWFpbiByZW5kZXIgdGFyZ2V0cyBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGVwdGhUZXh0dXJlPWZhbHNlXSAtIFNldCB0byB0cnVlIGlmIG9uZSBvZiB5b3VyIHBhc3NlcyByZWxpZXMgb24gYSBkZXB0aCB0ZXh0dXJlLlxyXG5cdCAqL1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZW5kZXJlciA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlbmRlcmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFlvdSBtYXkgcmVwbGFjZSB0aGUgcmVuZGVyZXIgYXQgYW55IHRpbWUgYnkgdXNpbmdcclxuXHRcdCAqIHtAbGluayBFZmZlY3RDb21wb3NlciNyZXBsYWNlUmVuZGVyZXJ9LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlcmVyfVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHJlYWQgYnVmZmVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFJlYWRpbmcgZnJvbSBhbmQgd3JpdGluZyB0byB0aGUgc2FtZSByZW5kZXIgdGFyZ2V0IHNob3VsZCBiZSBhdm9pZGVkLlxyXG5cdFx0ICogVGhlcmVmb3JlLCB0d28gc2VwZXJhdGUgeWV0IGlkZW50aWNhbCBidWZmZXJzIGFyZSB1c2VkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXZWJHTFJlbmRlclRhcmdldH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHdyaXRlIGJ1ZmZlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2ViR0xSZW5kZXJUYXJnZXR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlciA9IG51bGw7XHJcblxyXG5cdFx0aWYodGhpcy5yZW5kZXJlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHRoaXMuY3JlYXRlQnVmZmVyKFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoQnVmZmVyICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5kZXB0aEJ1ZmZlciA6IHRydWUsXHJcblx0XHRcdFx0KG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuc3RlbmNpbEJ1ZmZlciA6IGZhbHNlLFxyXG5cdFx0XHRcdChvcHRpb25zLmRlcHRoVGV4dHVyZSAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuZGVwdGhUZXh0dXJlIDogZmFsc2VcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuY2xvbmUoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNvcHkgcGFzcyB1c2VkIGZvciBjb3B5aW5nIG1hc2tlZCBzY2VuZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1NoYWRlclBhc3N9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5jb3B5UGFzcyA9IG5ldyBTaGFkZXJQYXNzKG5ldyBDb3B5TWF0ZXJpYWwoKSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcGFzc2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtQYXNzW119XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblxyXG5cdFx0dGhpcy5wYXNzZXMgPSBbXTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZGVwdGggdGV4dHVyZSBvZiB0aGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycy5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEZXB0aFRleHR1cmV9XHJcblx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdCAqL1xyXG5cclxuXHRnZXQgZGVwdGhUZXh0dXJlKCkgeyByZXR1cm4gdGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVhZCBhbmQgd3JpdGUgYnVmZmVycyBzaGFyZSBhIHNpbmdsZSBkZXB0aCB0ZXh0dXJlLiBEZXB0aCB3aWxsIGJlXHJcblx0ICogd3JpdHRlbiB0byB0aGlzIHRleHR1cmUgd2hlbiBzb21ldGhpbmcgaXMgcmVuZGVyZWQgaW50byBvbmUgb2YgdGhlIGJ1ZmZlcnNcclxuXHQgKiBhbmQgdGhlIGludm9sdmVkIG1hdGVyaWFscyBoYXZlIGRlcHRoIHdyaXRlIGVuYWJsZWQuXHJcblx0ICpcclxuXHQgKiBZb3UgbWF5IGVuYWJsZSB0aGlzIG1lY2hhbmlzbSBkdXJpbmcgdGhlIGluc3RhbnRpYXRpb24gb2YgdGhlIGNvbXBvc2VyIG9yXHJcblx0ICogYnkgYXNzaWduaW5nIGEgRGVwdGhUZXh0dXJlIGluc3RhbmNlIGxhdGVyIG9uLiBZb3UgbWF5IGFsc28gZGlzYWJsZSBpdCBieVxyXG5cdCAqIGFzc2lnbmluZyBudWxsLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0RlcHRoVGV4dHVyZX1cclxuXHQgKi9cclxuXHJcblx0c2V0IGRlcHRoVGV4dHVyZSh4KSB7XHJcblxyXG5cdFx0dGhpcy5yZWFkQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblx0XHR0aGlzLndyaXRlQnVmZmVyLmRlcHRoVGV4dHVyZSA9IHg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGN1cnJlbnQgcmVuZGVyZXIgd2l0aCB0aGUgZ2l2ZW4gb25lLiBUaGUgRE9NIGVsZW1lbnQgb2YgdGhlXHJcblx0ICogY3VycmVudCByZW5kZXJlciB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgbm9kZSBhbmQgdGhlXHJcblx0ICogRE9NIGVsZW1lbnQgb2YgdGhlIG5ldyByZW5kZXJlciB3aWxsIHRha2UgaXRzIHBsYWNlLlxyXG5cdCAqXHJcblx0ICogVGhlIGF1dG8gY2xlYXIgbWVjaGFuaXNtIG9mIHRoZSBwcm92aWRlZCByZW5kZXJlciB3aWxsIGJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogU3dpdGNoaW5nIGJldHdlZW4gcmVuZGVyZXJzIGFsbG93cyB5b3UgdG8gZHluYW1pY2FsbHkgZW5hYmxlIG9yIGRpc2FibGVcclxuXHQgKiBhbnRpYWxpYXNpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVGhlIG5ldyByZW5kZXJlci5cclxuXHQgKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmVyfSBUaGUgb2xkIHJlbmRlcmVyLlxyXG5cdCAqL1xyXG5cclxuXHRyZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpIHtcclxuXHJcblx0XHRjb25zdCBvbGRSZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblxyXG5cdFx0bGV0IHBhcmVudCwgb2xkU2l6ZSwgbmV3U2l6ZTtcclxuXHJcblx0XHRpZihvbGRSZW5kZXJlciAhPT0gbnVsbCAmJiBvbGRSZW5kZXJlciAhPT0gcmVuZGVyZXIpIHtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHBhcmVudCA9IG9sZFJlbmRlcmVyLmRvbUVsZW1lbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0b2xkU2l6ZSA9IG9sZFJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdFx0bmV3U2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcclxuXHJcblx0XHRcdGlmKHBhcmVudCAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQob2xkUmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYob2xkU2l6ZS53aWR0aCAhPT0gbmV3U2l6ZS53aWR0aCB8fCBvbGRTaXplLmhlaWdodCAhPT0gbmV3U2l6ZS5oZWlnaHQpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zZXRTaXplKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvbGRSZW5kZXJlcjtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IHJlbmRlciB0YXJnZXQgYnkgcmVwbGljYXRpbmcgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqXHJcblx0ICogVGhlIGNyZWF0ZWQgcmVuZGVyIHRhcmdldCB1c2VzIGEgbGluZWFyIGZpbHRlciBmb3IgdGV4ZWwgbWluaWZpY2F0aW9uIGFuZFxyXG5cdCAqIG1hZ25pZmljYXRpb24uIEl0cyByZW5kZXIgdGV4dHVyZSBmb3JtYXQgZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSByZW5kZXJlclxyXG5cdCAqIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwuIE1pcG1hcHMgYXJlIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBkZXB0aEJ1ZmZlciAtIFdoZXRoZXIgdGhlIHJlbmRlciB0YXJnZXQgc2hvdWxkIGhhdmUgYSBkZXB0aCBidWZmZXIuXHJcblx0ICogQHBhcmFtIHtCb29sZWFufSBzdGVuY2lsQnVmZmVyIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIHN0ZW5jaWwgYnVmZmVyLlxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVwdGhUZXh0dXJlIC0gV2hldGhlciB0aGUgcmVuZGVyIHRhcmdldCBzaG91bGQgaGF2ZSBhIGRlcHRoIHRleHR1cmUuXHJcblx0ICogQHJldHVybiB7V2ViR0xSZW5kZXJUYXJnZXR9IEEgbmV3IHJlbmRlciB0YXJnZXQgdGhhdCBlcXVhbHMgdGhlIHJlbmRlcmVyJ3MgY2FudmFzLlxyXG5cdCAqL1xyXG5cclxuXHRjcmVhdGVCdWZmZXIoZGVwdGhCdWZmZXIsIHN0ZW5jaWxCdWZmZXIsIGRlcHRoVGV4dHVyZSkge1xyXG5cclxuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcclxuXHRcdGNvbnN0IHBpeGVsUmF0aW8gPSB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHRcdGNvbnN0IGFscGhhID0gdGhpcy5yZW5kZXJlci5jb250ZXh0LmdldENvbnRleHRBdHRyaWJ1dGVzKCkuYWxwaGE7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyVGFyZ2V0ID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KHNpemUud2lkdGggKiBwaXhlbFJhdGlvLCBzaXplLmhlaWdodCAqIHBpeGVsUmF0aW8sIHtcclxuXHRcdFx0bWluRmlsdGVyOiBMaW5lYXJGaWx0ZXIsXHJcblx0XHRcdG1hZ0ZpbHRlcjogTGluZWFyRmlsdGVyLFxyXG5cdFx0XHRmb3JtYXQ6IGFscGhhID8gUkdCQUZvcm1hdCA6IFJHQkZvcm1hdCxcclxuXHRcdFx0ZGVwdGhCdWZmZXI6IGRlcHRoQnVmZmVyLFxyXG5cdFx0XHRzdGVuY2lsQnVmZmVyOiBzdGVuY2lsQnVmZmVyLFxyXG5cdFx0XHRkZXB0aFRleHR1cmU6IGRlcHRoVGV4dHVyZSA/IG5ldyBEZXB0aFRleHR1cmUoKSA6IG51bGxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGRlcHRoVGV4dHVyZSAmJiBzdGVuY2lsQnVmZmVyKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJUYXJnZXQuZGVwdGhUZXh0dXJlLmZvcm1hdCA9IERlcHRoU3RlbmNpbEZvcm1hdDtcclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmRlcHRoVGV4dHVyZS50eXBlID0gVW5zaWduZWRJbnQyNDhUeXBlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJUYXJnZXQudGV4dHVyZS5uYW1lID0gXCJFZmZlY3RDb21wb3Nlci5CdWZmZXJcIjtcclxuXHRcdHJlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJUYXJnZXQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIHBhc3MsIG9wdGlvbmFsbHkgYXQgYSBzcGVjaWZpYyBpbmRleC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7UGFzc30gcGFzcyAtIEEgbmV3IHBhc3MuXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtpbmRleF0gLSBBbiBpbmRleCBhdCB3aGljaCB0aGUgcGFzcyBzaG91bGQgYmUgaW5zZXJ0ZWQuXHJcblx0ICovXHJcblxyXG5cdGFkZFBhc3MocGFzcywgaW5kZXgpIHtcclxuXHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBzaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xyXG5cdFx0Y29uc3QgcGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHRwYXNzLnNldFNpemUoc2l6ZS53aWR0aCAqIHBpeGVsUmF0aW8sIHNpemUuaGVpZ2h0ICogcGl4ZWxSYXRpbyk7XHJcblx0XHRwYXNzLmluaXRpYWxpc2UocmVuZGVyZXIsIHJlbmRlcmVyLmNvbnRleHQuZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbHBoYSk7XHJcblxyXG5cdFx0aWYoaW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMuc3BsaWNlKGluZGV4LCAwLCBwYXNzKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dGhpcy5wYXNzZXMucHVzaChwYXNzKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIHBhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1Bhc3N9IHBhc3MgLSBUaGUgcGFzcy5cclxuXHQgKi9cclxuXHJcblx0cmVtb3ZlUGFzcyhwYXNzKSB7XHJcblxyXG5cdFx0dGhpcy5wYXNzZXMuc3BsaWNlKHRoaXMucGFzc2VzLmluZGV4T2YocGFzcyksIDEpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgYWxsIGVuYWJsZWQgcGFzc2VzIGluIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgYWRkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVsdGEgLSBUaGUgdGltZSBiZXR3ZWVuIHRoZSBsYXN0IGZyYW1lIGFuZCB0aGUgY3VycmVudCBvbmUgaW4gc2Vjb25kcy5cclxuXHQgKi9cclxuXHJcblx0cmVuZGVyKGRlbHRhKSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcblx0XHRjb25zdCBjb3B5UGFzcyA9IHRoaXMuY29weVBhc3M7XHJcblxyXG5cdFx0bGV0IHJlYWRCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXI7XHJcblx0XHRsZXQgd3JpdGVCdWZmZXIgPSB0aGlzLndyaXRlQnVmZmVyO1xyXG5cclxuXHRcdGxldCBtYXNrQWN0aXZlID0gZmFsc2U7XHJcblx0XHRsZXQgcGFzcywgY29udGV4dCwgYnVmZmVyO1xyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0Zm9yKGkgPSAwLCBsID0gcGFzc2VzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG5cclxuXHRcdFx0cGFzcyA9IHBhc3Nlc1tpXTtcclxuXHJcblx0XHRcdGlmKHBhc3MuZW5hYmxlZCkge1xyXG5cclxuXHRcdFx0XHRwYXNzLnJlbmRlcihyZW5kZXJlciwgcmVhZEJ1ZmZlciwgd3JpdGVCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlKTtcclxuXHJcblx0XHRcdFx0aWYocGFzcy5uZWVkc1N3YXApIHtcclxuXHJcblx0XHRcdFx0XHRpZihtYXNrQWN0aXZlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyhjb250ZXh0Lk5PVEVRVUFMLCAxLCAweGZmZmZmZmZmKTtcclxuXHRcdFx0XHRcdFx0Y29weVBhc3MucmVuZGVyKHJlbmRlcmVyLCByZWFkQnVmZmVyLCB3cml0ZUJ1ZmZlcik7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc3RlbmNpbEZ1bmMoY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZik7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJ1ZmZlciA9IHJlYWRCdWZmZXI7XHJcblx0XHRcdFx0XHRyZWFkQnVmZmVyID0gd3JpdGVCdWZmZXI7XHJcblx0XHRcdFx0XHR3cml0ZUJ1ZmZlciA9IGJ1ZmZlcjtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihwYXNzIGluc3RhbmNlb2YgTWFza1Bhc3MpIHtcclxuXHJcblx0XHRcdFx0XHRtYXNrQWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmKHBhc3MgaW5zdGFuY2VvZiBDbGVhck1hc2tQYXNzKSB7XHJcblxyXG5cdFx0XHRcdFx0bWFza0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGJ1ZmZlcnMgYW5kIHRoZSByZW5kZXJlcidzIG91dHB1dCBjYW52YXMuXHJcblx0ICpcclxuXHQgKiBFdmVyeSBwYXNzIHdpbGwgYmUgaW5mb3JtZWQgb2YgdGhlIG5ldyBzaXplLiBJdCdzIHVwIHRvIGVhY2ggcGFzcyBob3cgdGhhdFxyXG5cdCAqIGluZm9ybWF0aW9uIGlzIHVzZWQuXHJcblx0ICpcclxuXHQgKiBJZiBubyB3aWR0aCBvciBoZWlnaHQgaXMgc3BlY2lmaWVkLCB0aGUgcmVuZGVyIHRhcmdldHMgYW5kIHBhc3NlcyB3aWxsIGJlXHJcblx0ICogdXBkYXRlZCB3aXRoIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIHJlbmRlcmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aF0gLSBUaGUgd2lkdGguXHJcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdIC0gVGhlIGhlaWdodC5cclxuXHQgKi9cclxuXHJcblx0c2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG5cdFx0Y29uc3QgcGFzc2VzID0gdGhpcy5wYXNzZXM7XHJcblx0XHRjb25zdCBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XHJcblx0XHRjb25zdCBwaXhlbFJhdGlvID0gdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XHJcblxyXG5cdFx0bGV0IGksIGw7XHJcblxyXG5cdFx0aWYod2lkdGggPT09IHVuZGVmaW5lZCB8fCBoZWlnaHQgPT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdFx0d2lkdGggPSBzaXplLndpZHRoO1xyXG5cdFx0XHRoZWlnaHQgPSBzaXplLmhlaWdodDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdHdpZHRoICo9IHBpeGVsUmF0aW87XHJcblx0XHRoZWlnaHQgKj0gcGl4ZWxSYXRpbztcclxuXHJcblx0XHR0aGlzLnJlYWRCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdHRoaXMud3JpdGVCdWZmZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHRmb3IoaSA9IDAsIGwgPSBwYXNzZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcblxyXG5cdFx0XHRwYXNzZXNbaV0uc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoaXMgY29tcG9zZXIgYnkgZGVsZXRpbmcgYWxsIHBhc3NlcyBhbmQgY3JlYXRpbmcgbmV3IGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBzZXR0aW5ncyBvZiB0aGUgcmVuZGVyZXIgd2lsbCBiZSB1c2VkLlxyXG5cdCAqL1xyXG5cclxuXHRyZXNldChyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBkZXB0aEJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5kZXB0aEJ1ZmZlcjtcclxuXHRcdGNvbnN0IHN0ZW5jaWxCdWZmZXIgPSB0aGlzLnJlYWRCdWZmZXIuc3RlbmNpbEJ1ZmZlcjtcclxuXHRcdGNvbnN0IGRlcHRoVGV4dHVyZSA9ICh0aGlzLnJlYWRCdWZmZXIuZGVwdGhUZXh0dXJlICE9PSBudWxsKTtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2UoKHJlbmRlclRhcmdldCA9PT0gdW5kZWZpbmVkKSA/XHJcblx0XHRcdHRoaXMuY3JlYXRlQnVmZmVyKGRlcHRoQnVmZmVyLCBzdGVuY2lsQnVmZmVyLCBkZXB0aFRleHR1cmUpIDpcclxuXHRcdFx0cmVuZGVyVGFyZ2V0XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIGFsbCBwYXNzZXMgYW5kIHJlbmRlciB0YXJnZXRzLlxyXG5cdCAqXHJcblx0ICogVGhpcyBtZXRob2QgZGVhbGxvY2F0ZXMgYWxsIHJlbmRlciB0YXJnZXRzLCB0ZXh0dXJlcyBhbmQgbWF0ZXJpYWxzIGNyZWF0ZWRcclxuXHQgKiBieSB0aGUgcGFzc2VzLiBJdCBhbHNvIGRlbGV0ZXMgdGhpcyBjb21wb3NlcidzIGZyYW1lIGJ1ZmZlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1dlYkdMUmVuZGVyVGFyZ2V0fSBbcmVuZGVyVGFyZ2V0XSAtIEEgbmV3IHJlbmRlciB0YXJnZXQuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBjb21wb3NlciB3aWxsIGJlY29tZSBpbm9wZXJhdGl2ZS5cclxuXHQgKi9cclxuXHJcblx0ZGlzcG9zZShyZW5kZXJUYXJnZXQpIHtcclxuXHJcblx0XHRjb25zdCBwYXNzZXMgPSB0aGlzLnBhc3NlcztcclxuXHJcblx0XHRpZih0aGlzLnJlYWRCdWZmZXIgIT09IG51bGwgJiYgdGhpcy53cml0ZUJ1ZmZlciAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkQnVmZmVyLmRpc3Bvc2UoKTtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlci5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRCdWZmZXIgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndyaXRlQnVmZmVyID0gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUocGFzc2VzLmxlbmd0aCA+IDApIHtcclxuXHJcblx0XHRcdHBhc3Nlcy5wb3AoKS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHJlbmRlclRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0XHQvLyBSZWFuaW1hdGUuXHJcblx0XHRcdHRoaXMucmVhZEJ1ZmZlciA9IHJlbmRlclRhcmdldDtcclxuXHRcdFx0dGhpcy53cml0ZUJ1ZmZlciA9IHRoaXMucmVhZEJ1ZmZlci5jbG9uZSgpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR0aGlzLmNvcHlQYXNzLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcmUgY29tcG9uZW50cy5cclxuICpcclxuICogQG1vZHVsZSBwb3N0cHJvY2Vzc2luZy9jb3JlXHJcbiAqL1xyXG5cclxuZXhwb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwiLi9lZmZlY3QtY29tcG9zZXIuanNcIjtcclxuIiwiLyoqXHJcbiAqIEV4cG9zdXJlIG9mIHRoZSBsaWJyYXJ5IGNvbXBvbmVudHMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgcG9zdHByb2Nlc3NpbmdcclxuICovXHJcblxyXG5leHBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gXCIuL2NvcmVcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0Qmxvb21QYXNzLFxyXG5cdEJsdXJQYXNzLFxyXG5cdEJva2VoUGFzcyxcclxuXHRCb2tlaDJQYXNzLFxyXG5cdENsZWFyUGFzcyxcclxuXHRDbGVhck1hc2tQYXNzLFxyXG5cdERlcHRoUGFzcyxcclxuXHREb3RTY3JlZW5QYXNzLFxyXG5cdEZpbG1QYXNzLFxyXG5cdEdsaXRjaE1vZGUsXHJcblx0R2xpdGNoUGFzcyxcclxuXHRHb2RSYXlzUGFzcyxcclxuXHRNYXNrUGFzcyxcclxuXHRQYXNzLFxyXG5cdFBpeGVsYXRpb25QYXNzLFxyXG5cdFJlbmRlclBhc3MsXHJcblx0U2F2ZVBhc3MsXHJcblx0U2hhZGVyUGFzcyxcclxuXHRTaG9ja1dhdmVQYXNzLFxyXG5cdFNNQUFQYXNzLFxyXG5cdFRleHR1cmVQYXNzLFxyXG5cdFRvbmVNYXBwaW5nUGFzc1xyXG59IGZyb20gXCIuL3Bhc3Nlc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRBZGFwdGl2ZUx1bWlub3NpdHlNYXRlcmlhbCxcclxuXHRCb2tlaE1hdGVyaWFsLFxyXG5cdEJva2VoMk1hdGVyaWFsLFxyXG5cdENvbWJpbmVNYXRlcmlhbCxcclxuXHRDb252b2x1dGlvbk1hdGVyaWFsLFxyXG5cdENvcHlNYXRlcmlhbCxcclxuXHREZXB0aE1hdGVyaWFsLFxyXG5cdERvdFNjcmVlbk1hdGVyaWFsLFxyXG5cdEZpbG1NYXRlcmlhbCxcclxuXHRHbGl0Y2hNYXRlcmlhbCxcclxuXHRHb2RSYXlzTWF0ZXJpYWwsXHJcblx0S2VybmVsU2l6ZSxcclxuXHRMdW1pbm9zaXR5TWF0ZXJpYWwsXHJcblx0UGl4ZWxhdGlvbk1hdGVyaWFsLFxyXG5cdFNob2NrV2F2ZU1hdGVyaWFsLFxyXG5cdFNNQUFCbGVuZE1hdGVyaWFsLFxyXG5cdFNNQUFDb2xvckVkZ2VzTWF0ZXJpYWwsXHJcblx0U01BQVdlaWdodHNNYXRlcmlhbCxcclxuXHRUb25lTWFwcGluZ01hdGVyaWFsXHJcbn0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbiIsImltcG9ydCB7XG4gIEVmZmVjdENvbXBvc2VyLFxuICBSZW5kZXJQYXNzLFxuICBTaGFkZXJQYXNzXG59IGZyb20gJ3Bvc3Rwcm9jZXNzaW5nJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICcuLi8uLi9jb3JlL0xvb3AnO1xuXG5jb25zdCBwb2x5ZmlsbCA9IChvYmplY3QsIG1ldGhvZCwgc2hvd1dhcm4gPSB0cnVlKSA9PiB7XG4gIGlmIChvYmplY3RbbWV0aG9kXSkgcmV0dXJuO1xuICBpZiAoc2hvd1dhcm4pIGNvbnNvbGUud2FybihgQFBvc3RQcm9jZXNzb3JNb2R1bGU6IHBhc3MuJHttZXRob2R9KCkgd2FzIG5vdCBmb3VuZC5gLCBvYmplY3QpO1xuICBvYmplY3RbbWV0aG9kXSA9ICgpID0+IHt9O1xufTtcblxuZXhwb3J0IGNsYXNzIFBvc3RQcm9jZXNzb3JNb2R1bGUge1xuICBjdXJyZW50UGFzcyA9IG51bGw7XG5cbiAgZGVmZXIgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICB9KTtcblxuICBjb25zdHJ1Y3Rvcih7ZGVidWd9ID0ge2RlYnVnOiB0cnVlfSkge1xuICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdwb3N0cHJvY2Vzc29yJyk7XG5cbiAgICB0aGlzLmVmZmVjdHMgPSBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJykuZWZmZWN0cztcbiAgICB0aGlzLnJlbmRlcmVyID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgdGhpcy5zY2VuZSA9IG1hbmFnZXIuZ2V0KCdzY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgdGhpcy5jb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3Nlcih0aGlzLnJlbmRlcmVyKTtcblxuICAgIG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKS5zdG9wKCk7XG5cbiAgICBjb25zdCBjb21wb3NlciA9IHRoaXMuY29tcG9zZXI7XG4gICAgdGhpcy5yZW5kZXJMb29wID0gbmV3IExvb3AoY2xvY2sgPT4gY29tcG9zZXIucmVuZGVyKGNsb2NrLmdldERlbHRhKCkpKS5zdGFydChtYW5hZ2VyLmhhbmRsZXIpO1xuXG4gICAgbWFuYWdlci51cGRhdGUoe1xuICAgICAgcmVuZGVyZXI6IHJlbmRlcmVyID0+IHtcbiAgICAgICAgdGhpcy5jb21wb3Nlci5yZXBsYWNlUmVuZGVyZXIocmVuZGVyZXIpO1xuICAgICAgfSxcblxuICAgICAgc2NlbmU6IHNjZW5lID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgfSxcblxuICAgICAgY2FtZXJhOiBjYW1lcmEgPT4ge1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVzb2x2ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBwYXNzID0gbmV3IFJlbmRlclBhc3ModGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEubmF0aXZlKTtcblxuICAgICAgLy8gVE9ETzogU3VwcG9ydCBmb3IgZWZmZWN0cy5cblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIHBhc3MocGFzcykge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICBwb2x5ZmlsbChwYXNzLCAnc2V0U2l6ZScsIHRoaXMuZGVidWcpO1xuICAgICAgcG9seWZpbGwocGFzcywgJ2luaXRpYWxpc2UnLCB0aGlzLmRlYnVnKTtcblxuICAgICAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKHBhc3MpO1xuICAgICAgdGhpcy5jdXJyZW50UGFzcyA9IHBhc3M7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNoYWRlcihtYXRlcmlhbCwgdGV4dHVyZUlEID0gJ3JlYWRCdWZmZXInKSB7XG4gICAgdGhpcy5kZWZlci50aGVuKCgpID0+IHtcbiAgICAgIGlmICghbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSlcbiAgICAgICAgbWF0ZXJpYWwudW5pZm9ybXNbdGV4dHVyZUlEXSA9IHt2YWx1ZTogbnVsbH07XG5cbiAgICAgIGNvbnN0IHBhc3MgPSBuZXcgU2hhZGVyUGFzcyhtYXRlcmlhbCwgdGV4dHVyZUlEKTtcbiAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhwYXNzKTtcbiAgICAgIHRoaXMuY3VycmVudFBhc3MgPSBwYXNzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBQYXNzIEFQSVxuXG4gIGdldChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWVcbiAgICAgID8gdGhpcy5jb21wb3Nlci5wYXNzZXMuZmlsdGVyKHBhc3MgPT4gcGFzcy5uYW1lID09PSBuYW1lKVswXVxuICAgICAgOiB0aGlzLmN1cnJlbnRQYXNzO1xuICB9XG5cbiAgdG8obmFtZSkge1xuICAgIHRoaXMuY3VycmVudFBhc3MgPSBuYW1lO1xuICB9XG5cbiAgcmVuZGVyVG9TY3JlZW4oYm9vbCA9IHRydWUpIHtcbiAgICB0aGlzLmRlZmVyLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFzcy5yZW5kZXJUb1NjcmVlbiA9IGJvb2w7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5hbWUobmFtZSkge1xuICAgIHRoaXMuZGVmZXIudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYXNzLm5hbWUgPSBuYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFdmVudHNQYXRjaE1vZHVsZSB7XG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdldmVudHMnKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICB9XG5cbiAgcGF0Y2hFdmVudHMob3JpZ2luT2JqZWN0LCBkZXN0T2JqZWN0LCBldmVudHMgPSBbXSkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICBvcmlnaW5PYmplY3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZSA9PiBkZXN0T2JqZWN0LmVtaXQoZXZlbnQsIGUpKVxuICAgICk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHtlbGVtZW50LCBwYXRjaEV2ZW50c30gPSBzZWxmO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ21vdXNlbW92ZScsXG4gICAgICAnbW91c2V1cCcsXG4gICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgJ21vdXNlZG93bicsXG4gICAgICAnY2xpY2snLFxuICAgICAgJ3doZWVsJyxcbiAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICd0b3VjaGVuZCcsXG4gICAgICAndG91Y2htb3ZlJyxcbiAgICAgICdrZXlkb3duJ1xuICAgIF0pO1xuXG4gICAgcGF0Y2hFdmVudHMoZWxlbWVudCwgdGhpcywgW1xuICAgICAgJ2tleWRvd24nLFxuICAgICAgJ2tleXVwJyxcbiAgICAgICdrZXlwcmVzcydcbiAgICBdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgVmVjdG9yMixcbiAgUmF5Y2FzdGVyLFxuICBQbGFuZSxcbiAgVmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG4vKipcbiAqIEBjbGFzcyBWaXJ0dWFsTW91c2VNb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2FwcFxuICogQHBhcmFtIHtCb29sZWFufSBbZ2xvYmFsTW92ZW1lbnQ9ZmFsc2VdXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwXG4gKiBAZXh0ZW5kcyBFdmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFZpcnR1YWxNb3VzZU1vZHVsZSBleHRlbmRzIEV2ZW50cyB7XG4gIG1vdXNlID0gbmV3IFZlY3RvcjIoKTtcbiAgcmF5Y2FzdGVyID0gbmV3IFJheWNhc3RlcigpO1xuICB3b3JsZCA9IG51bGw7XG4gIGNhbnZhcyA9IG51bGw7XG4gIHByb2plY3Rpb25QbGFuZSA9IG5ldyBQbGFuZShuZXcgVmVjdG9yMygwLCAwLCAxKSwgMCk7XG5cbiAgY29uc3RydWN0b3IoZ2xvYmFsTW92ZW1lbnQgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5nbG9iYWxNb3ZlbWVudCA9IGdsb2JhbE1vdmVtZW50O1xuICB9XG5cbiAgdXBkYXRlKGUsIGN1c3RvbVgsIGN1c3RvbVkpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCB4ID0gY3VzdG9tWCB8fCBlLmNsaWVudFg7XG4gICAgY29uc3QgeSA9IGN1c3RvbVkgfHwgZS5jbGllbnRZO1xuXG4gICAgdGhpcy5tb3VzZS54ID0gKCh4IC0gcmVjdC5sZWZ0KSAvIChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSkgKiAyIC0gMTtcbiAgICB0aGlzLm1vdXNlLnkgPSAtKCh5IC0gcmVjdC50b3ApIC8gKHJlY3QuYm90dG9tIC0gcmVjdC50b3ApKSAqIDIgKyAxO1xuXG4gICAgdGhpcy5wcm9qZWN0aW9uUGxhbmUubm9ybWFsLmNvcHkodGhpcy5jYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24oKSk7XG5cbiAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKHRoaXMubW91c2UsIHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLmVtaXQoJ21vdmUnKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdtb3VzZScpO1xuICAgIG1hbmFnZXIucmVxdWlyZSgnZXZlbnRzJywgKCkgPT4gbmV3IEV2ZW50c1BhdGNoTW9kdWxlKCkpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKS5kb21FbGVtZW50O1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpLm5hdGl2ZTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgW1xuICAgICAgJ2NsaWNrJyxcbiAgICAgICdtb3VzZWRvd24nLFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgJ21vdXNlbW92ZSdcbiAgICBdLmZvckVhY2goZXYgPT4gdGhpcy5vbihldiwgZSA9PiBzZWxmLmVtaXQoZXYsIGUpKSk7XG5cbiAgICBzZWxmLmdsb2JhbFggPSAwO1xuICAgIHNlbGYuZ2xvYmFsWSA9IDA7XG5cbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2VsZi5nbG9iYWxYICs9IGUubW92ZW1lbnRYO1xuICAgICAgICBzZWxmLmdsb2JhbFkgKz0gZS5tb3ZlbWVudFk7XG5cbiAgICAgICAgc2VsZi51cGRhdGUoZSwgc2VsZi5nbG9iYWxYLCBzZWxmLmdsb2JhbFkpO1xuICAgICAgfSBlbHNlIHNlbGYudXBkYXRlKGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdHJhY2soY29tcG9uZW50LCBuZXN0ZWQgPSB0cnVlKSB7XG4gICAgbGV0IGlzSG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5vbignbW92ZScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmhvdmVycyhjb21wb25lbnQsIG5lc3RlZCkpIHtcbiAgICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNlbW92ZScpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb21wb25lbnQuZW1pdCgnbW91c2VvdmVyJyk7XG4gICAgICAgICAgaXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0hvdmVyZWQpIHtcbiAgICAgICAgY29tcG9uZW50LmVtaXQoJ21vdXNlb3V0Jyk7XG4gICAgICAgIGlzSG92ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnY2xpY2snKTtcbiAgICAgIGVsc2UgY29tcG9uZW50LmVtaXQoJ29mZkNsaWNrJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICBpZiAoaXNIb3ZlcmVkKSBjb21wb25lbnQuZW1pdCgnbW91c2Vkb3duJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgaWYgKGlzSG92ZXJlZCkgY29tcG9uZW50LmVtaXQoJ21vdXNldXAnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbih7bmF0aXZlfSwgbmVzdGVkID0gdHJ1ZSkge1xuICAgIGlmIChuYXRpdmUuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiBuZXN0ZWQpIHtcbiAgICAgIGNvbnN0IG9iamVjdHMgPSBbXTtcbiAgICAgIG5hdGl2ZS50cmF2ZXJzZShjaGlsZCA9PiBvYmplY3RzLnB1c2goY2hpbGQpKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMob2JqZWN0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdChuYXRpdmUpO1xuICB9XG5cbiAgcHJvamVjdChwbGFuZSA9IHRoaXMucHJvamVjdGlvblBsYW5lKSB7XG4gICAgcmV0dXJuIHRoaXMucmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RQbGFuZShwbGFuZSk7XG4gIH1cblxuICBob3ZlcnMoY29tcG9uZW50LCBuZXN0ZWQgPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9uKGNvbXBvbmVudCwgbmVzdGVkKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5yYXljYXN0ZXIucmF5O1xuICB9XG5cbiAgZ2V0IHgoKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2UueDtcbiAgfVxuXG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlLnk7XG4gIH1cbn1cbiIsImltcG9ydCB7TG9vcH0gZnJvbSAnLi4vLi4vY29yZS9Mb29wJztcbmltcG9ydCB7RXZlbnRzUGF0Y2hNb2R1bGV9IGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xuICBzdGF0aWMgZnJvbShjb250cm9scykge1xuICAgIHJldHVybiBuZXcgQ29udHJvbHNNb2R1bGUoe2NvbnRyb2xzfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICBmaXg6IGNvbnRyb2xzID0+IGNvbnRyb2xzLFxuXG4gICAgICB1cGRhdGUoYykge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgfVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5wYXJhbXMuY29udHJvbHM7XG4gICAgdGhpcy51cGRhdGUgPSB0aGlzLnBhcmFtcy51cGRhdGU7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnJlcXVpcmUoJ2V2ZW50cycsICgpID0+IG5ldyBFdmVudHNQYXRjaE1vZHVsZSgpKTtcbiAgfVxuXG4gIHNldENvbnRyb2xzKGNvbnRyb2xzKSB7XG4gICAgdGhpcy5jb250cm9scyA9IGNvbnRyb2xzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VXBkYXRlKHVwZGF0ZSkge1xuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICBzZWxmLnVwZGF0ZUxvb3AgPSBuZXcgTG9vcChzZWxmLnVwZGF0ZS5iaW5kKHNlbGYpKTtcbiAgICBzZWxmLnVwZGF0ZUxvb3Auc3RhcnQodGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEZvZ0V4cDIsXG4gIEZvZ1xufSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzIEZvZ01vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17Y29sb3I6IDB4ZWZkMWI1LCBkZW5zaXR5OiAwLjAyMCwgbmVhcjogMTAsIGZhcjogMTAwMH1dIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlPWV4cDJdIC0gVGhlIHR5cGUgb2YgZm9nIC0gZXhwMiBvciBsaW5lYXJcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkhvdyB0byBjcmVhdGUgYW5kIGFwcGx5IGEgRm9nTW9kdWxlPC9jYXB0aW9uPlxuICogY29uc3QgZm9nTW9kdWxlID0gbmV3IEZvZ01vZHVsZSh7XG4gKiAgICBjb2xvcjogMHhmZmZmZmYsXG4gKiAgICBkZW5zaXR5OiAwLjAzLFxuICogICAgbmVhcjogMjAsXG4gKiAgICBmYXI6IDIwMFxuICogIH0sICdleHAyJyk7XG4gKlxuICogbmV3IEFwcChbXG4gKiAgLi4uLFxuICogIGZvZ01vZHVsZVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBGb2dNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgdHlwZSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjb2xvcjogMHhlZmQxYjUsXG4gICAgICBkZW5zaXR5OiAwLjAyMCxcbiAgICAgIG5lYXI6IDEwLFxuICAgICAgZmFyOiAxMDAwXG4gICAgfSwgcGFyYW1zKTtcbiAgICBpZiAoIXR5cGUgfHwgdHlwZSA9PT0gJ2V4cDInKSB0aGlzLmZvZyA9IG5ldyBGb2dFeHAyKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5kZW5zaXR5KTtcbiAgICBlbHNlIGlmICh0eXBlID09PSAnbGluZWFyJykgdGhpcy5mb2cgPSBuZXcgRm9nKHRoaXMucGFyYW1zLmNvbG9yLCB0aGlzLnBhcmFtcy5uZWFyLCB0aGlzLnBhcmFtcy5mYXIpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQoJ2ZvZycsIHRoaXMuZm9nKTtcbiAgICBtYW5hZ2VyLmdldCgnc2NlbmUnKS5mb2cgPSB0aGlzLmZvZztcbiAgfVxufVxuIiwiaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSAncmVkdXgnO1xuXG5jb25zdCBpc0VxdWFsRGVmYXVsdCA9IChhLCBiKSA9PiB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgZWxzZSBpZiAoYSAmJiBhLmVxdWFscyAmJiBhLmVxdWFscyhiKSkgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBAY2xhc3MgU3RhdGVNb2R1bGVcbiAqIEBkZXNjcmlwdGlvbiBgU3RhdGVNb2R1bGVgIGlzIHVzZWZ1bCBmb3IgYXBwcywgd2hlcmUgeW91IG5lZWQgc3RhdGUgbWFuaXB1bGF0aW9uLlxuICogVGhpcyBjYW4gYmU6IF90cmFuc2l0aW9ucyBiZXR3ZWVuIHNjcmVlbnMsIGdhbWVzLCBkZXZlbG9wbWVudCBtb21lbnRzXy5cbiAqIFlvdSBjYW4gY2hlY2sgW2Jhc2ljL3N0YXRlXShodHRwczovL3docy1kZXYuc3VyZ2Uuc2gvZXhhbXBsZXMvP2Jhc2ljL3N0YXRlKSBleGFtcGxlLlxuICogQGNhdGVnb3J5IG1vZHVsZXMvYXBwXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHBcbiAqIEBleGFtcGxlIDxjYXB0aW9uPiBDcmVhdGluZyBhIHN0YXRlIG1vZHVsZTwvY2FwdGlvbj5cbiAqIG5ldyBBcHAoW1xuICogICAvLyAuLi5cbiAqICAgbmV3IFN0YXRlTW9kdWxlKCkuZGVmYXVsdCh7XG4gKiAgICAgc3BoZXJlQ29sb3I6IDB4ZmYwMDAwXG4gKiAgIH0pXG4gKiBdKTtcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlTW9kdWxlIHtcbiAgc3RhdGljIGFjdGlvbkdlbmVyYXRlKGlzRXF1YWwpIHtcbiAgICByZXR1cm4gKHN0YXRlID0gW3t9LCAnJ10sIHtrZXksIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoaXNFcXVhbChzdGF0ZVswXVtrZXldLCBkYXRhKSkgcmV0dXJuIHN0YXRlO1xuXG4gICAgICBzdGF0ZVswXVtrZXldID0gZGF0YTtcbiAgICAgIHN0YXRlWzFdID0ga2V5O1xuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVxdWFsQ2hlY2sgPSBpc0VxdWFsRGVmYXVsdCkge1xuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAgIFN0YXRlTW9kdWxlLmFjdGlvbkdlbmVyYXRlKGVxdWFsQ2hlY2spXG4gICAgKTtcblxuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHt9O1xuICAgIHRoaXMuY3VycmVudENvbmZpZyA9ICdkZWZhdWx0JztcbiAgICB0aGlzLnByZXZDb25maWcgPSAnZGVmYXVsdCc7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZWZhdWx0XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHNldHVwXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogbmV3IFdIUy5TdGF0ZU1vZHVsZSgpLmRlZmF1bHQoe1xuICAgKiAgIHNwaGVyZUNvbG9yOiBVVElMUy4kY29sb3JzLm1lc2gsXG4gICAqICAgcGxhbmVDb2xvcjogMHg0NDdGOEJcbiAgICogfSlcbiAgICovXG4gIGRlZmF1bHQoZGF0YSkge1xuICAgIHRoaXMuY29uZmlnKHtkZWZhdWx0OiBkYXRhfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRFcXVhbENoZWNrXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIGFuIGVxdWFsQ2hlY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29uZmlndXJhdGlvbiBzZXR1cFxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBzZXRFcXVhbENoZWNrKGZ1bmMpIHtcbiAgICB0aGlzLnN0b3JlLnJlcGxhY2VSZWR1Y2VyKFxuICAgICAgU3RhdGVNb2R1bGUuYWN0aW9uR2VuZXJhdGUoZnVuYylcbiAgICApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3N0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjb25maWdcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgY29uZmlndXJhdGlvbnMgZnJvbSBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdzIENvbmZpZ3VyYXRpb24gZGF0YVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPiBBZGRpbmcgYGdyZWVuYCBjb25maWd1cmF0aW9uPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS5jb25maWcoe1xuICAgKiAgIGdyZWVuOiB7XG4gICAqICAgICBzcGhlcmVDb2xvcjogMHgwMGZmMDAsXG4gICAqICAgICBwbGFuZUNvbG9yOiAweDAwZmYwMFxuICAgKiAgIH1cbiAgICogfSk7XG4gICAqL1xuICBjb25maWcoY29uZmlncykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ3MpIHtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uW2tleV0gPSBrZXkgPT09ICdkZWZhdWx0J1xuICAgICAgICAgID8gY29uZmlnc1trZXldXG4gICAgICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3VyYXRpb24uZGVmYXVsdCwgY29uZmlnc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIExvYWQgdXBkYXRlcyBmcm9tIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZXMgVXBkYXRlcyBkYXRhXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IFVwZGF0ZSBjYWxsYmFjayBmb3IgYHNwaGVyZUNvbG9yYDwvY2FwdGlvbj5cbiAgICogc3RhdGUudXBkYXRlKHtcbiAgICogICBzcGhlcmVDb2xvcjogY29sb3IgPT4gc3BoZXJlLm1hdGVyaWFsLmNvbG9yLnNldEhleChjb2xvcilcbiAgICogfSk7XG4gICAqL1xuICB1cGRhdGUodXBkYXRlcyA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgW2RhdGEsIGNoYW5nZWRLZXldID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB1cGRhdGVzW2NoYW5nZWRLZXldO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGFbY2hhbmdlZEtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdG9cbiAgICogQGRlc2NyaXB0aW9uIFN3aXRjaCB0byBjb25maWd1cmF0aW9uLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnTmFtZSBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+IENoYW5nZXMgY29uZmlndXJhdGlvbiB0byBgZ3JlZW5gPC9jYXB0aW9uPlxuICAgKiBzdGF0ZS50bygnZ3JlZW4nKTtcbiAgICovXG4gIHRvKGNvbmZpZ05hbWUpIHtcbiAgICB0aGlzLnByZXZDb25maWcgPSB0aGlzLmN1cnJlbnRDb25maWc7XG4gICAgdGhpcy5jdXJyZW50Q29uZmlnID0gY29uZmlnTmFtZTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgPyB0aGlzLmNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgIDogdGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHQ7XG5cbiAgICB0aGlzLnNldChjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgY3VycmVudCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb25maWd1cmF0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICogQGV4YW1wbGVcbiAgICogc3RhdGUuc2V0KHtcbiAgICogICBzcGhlcmVDb2xvcjogMHgwMGZmMDBcbiAgICogfSk7XG4gICAqL1xuICBzZXQoZGF0YSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpXG4gICAgICBpZiAoa2V5KSB0aGlzLnN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnQUREJywga2V5LCBkYXRhOiBkYXRhW2tleV19KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJuIGRhdGEgb2YgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFBhcmFtZXRlciBuYW1lLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqIEBleGFtcGxlXG4gICAqIHN0YXRlLmdldCgnc3BoZXJlQ29sb3InKTsgLy8gMHgwMGZmMDBcbiAgICovXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpWzBdW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwcmV2XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIHByZXZpb3VzIGNvbmZpZ3VyYXRpb24sIGluIG90aGVyIGNhc2UgLSByZXR1cm4gYGZhbHNlVmFsYC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZyBDb25maWd1cmF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7QW55fSB0cnVlVmFsIFZhbHVlIHJldHVybmVkIGlmIGNvbmRpdGlvbiBpcyB0cnV0aHkuXG4gICAqIEBwYXJhbSB7QW55fSBmYWxzZVZhbCBDVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIGZhbHN5LlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvYXBwLlN0YXRlTW9kdWxlXG4gICAqL1xuICBwcmV2KGNvbmZpZywgdHJ1ZVZhbCwgZmFsc2VWYWwpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2Q29uZmlnID09PSBjb25maWcgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjdXJyZW50XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm4gYHRydWVWYWxgIGlmIGBjb25maWdgIG1hdGNoIGN1cnJlbnQgY29uZmlndXJhdGlvbiwgaW4gb3RoZXIgY2FzZSAtIHJldHVybiBgZmFsc2VWYWxgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnIENvbmZpZ3VyYXRpb24gbmFtZS5cbiAgICogQHBhcmFtIHtBbnl9IHRydWVWYWwgVmFsdWUgcmV0dXJuZWQgaWYgY29uZGl0aW9uIGlzIHRydXRoeS5cbiAgICogQHBhcmFtIHtBbnl9IGZhbHNlVmFsIENWYWx1ZSByZXR1cm5lZCBpZiBjb25kaXRpb24gaXMgZmFsc3kuXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9hcHAuU3RhdGVNb2R1bGVcbiAgICovXG4gIGN1cnJlbnQoY29uZmlnLCB0cnVlVmFsLCBmYWxzZVZhbCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDb25maWcgPT09IGNvbmZpZyA/IHRydWVWYWwgOiBmYWxzZVZhbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTU9VU0UsXG4gIFF1YXRlcm5pb24sXG4gIFNwaGVyaWNhbCxcbiAgVmVjdG9yMixcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIE9ydGhvZ3JhcGhpY0NhbWVyYSxcbiAgRXZlbnREaXNwYXRjaGVyLFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuLy8gVGhpcyBzZXQgb2YgY29udHJvbHMgcGVyZm9ybXMgb3JiaXRpbmcsIGRvbGx5aW5nICh6b29taW5nKSwgYW5kIHBhbm5pbmcuXG4vLyBVbmxpa2UgVHJhY2tiYWxsQ29udHJvbHMsIGl0IG1haW50YWlucyB0aGUgXCJ1cFwiIGRpcmVjdGlvbiBvYmplY3QudXAgKCtZIGJ5IGRlZmF1bHQpLlxuLy9cbi8vICAgIE9yYml0IC0gbGVmdCBtb3VzZSAvIHRvdWNoOiBvbmUgZmluZ2VyIG1vdmVcbi8vICAgIFpvb20gLSBtaWRkbGUgbW91c2UsIG9yIG1vdXNld2hlZWwgLyB0b3VjaDogdHdvIGZpbmdlciBzcHJlYWQgb3Igc3F1aXNoXG4vLyAgICBQYW4gLSByaWdodCBtb3VzZSwgb3IgYXJyb3cga2V5cyAvIHRvdWNoOiB0aHJlZSBmaW50ZXIgc3dpcGVcblxuZXhwb3J0IGNsYXNzIFRocmVlT3JiaXRDb250cm9scyBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCwgZG9tRWxlbWVudCwgZXZlbnRIYW5kbGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gKGRvbUVsZW1lbnQgPT09IHVuZGVmaW5lZCkgPyBkb2N1bWVudCA6IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBldmVudEhhbmRsZXI7XG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGNvbnRyb2xcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLy8gXCJ0YXJnZXRcIiBzZXRzIHRoZSBsb2NhdGlvbiBvZiBmb2N1cywgd2hlcmUgdGhlIG9iamVjdCBvcmJpdHMgYXJvdW5kXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIGRvbGx5IGluIGFuZCBvdXQgKCBQZXJzcGVjdGl2ZUNhbWVyYSBvbmx5IClcbiAgICB0aGlzLm1pbkRpc3RhbmNlID0gMDtcbiAgICB0aGlzLm1heERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gem9vbSBpbiBhbmQgb3V0ICggT3J0aG9ncmFwaGljQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluWm9vbSA9IDA7XG4gICAgdGhpcy5tYXhab29tID0gSW5maW5pdHk7XG5cbiAgICAvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgdmVydGljYWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBSYW5nZSBpcyAwIHRvIE1hdGguUEkgcmFkaWFucy5cbiAgICB0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IGhvcml6b250YWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBJZiBzZXQsIG11c3QgYmUgYSBzdWItaW50ZXJ2YWwgb2YgdGhlIGludGVydmFsIFsgLSBNYXRoLlBJLCBNYXRoLlBJIF0uXG4gICAgdGhpcy5taW5BemltdXRoQW5nbGUgPSAtSW5maW5pdHk7IC8vIHJhZGlhbnNcbiAgICB0aGlzLm1heEF6aW11dGhBbmdsZSA9IEluZmluaXR5OyAvLyByYWRpYW5zXG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBlbmFibGUgZGFtcGluZyAoaW5lcnRpYSlcbiAgICAvLyBJZiBkYW1waW5nIGlzIGVuYWJsZWQsIHlvdSBtdXN0IGNhbGwgY29udHJvbHMudXBkYXRlKCkgaW4geW91ciBhbmltYXRpb24gbG9vcFxuICAgIHRoaXMuZW5hYmxlRGFtcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZGFtcGluZ0ZhY3RvciA9IDAuMjU7XG5cbiAgICAvLyBUaGlzIG9wdGlvbiBhY3R1YWxseSBlbmFibGVzIGRvbGx5aW5nIGluIGFuZCBvdXQ7IGxlZnQgYXMgXCJ6b29tXCIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHpvb21pbmdcbiAgICB0aGlzLmVuYWJsZVpvb20gPSB0cnVlO1xuICAgIHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcm90YXRpbmdcbiAgICB0aGlzLmVuYWJsZVJvdGF0ZSA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHBhbm5pbmdcbiAgICB0aGlzLmVuYWJsZVBhbiA9IHRydWU7XG4gICAgdGhpcy5rZXlQYW5TcGVlZCA9IDcuMDsgLy8gcGl4ZWxzIG1vdmVkIHBlciBhcnJvdyBrZXkgcHVzaFxuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gYXV0b21hdGljYWxseSByb3RhdGUgYXJvdW5kIHRoZSB0YXJnZXRcbiAgICAvLyBJZiBhdXRvLXJvdGF0ZSBpcyBlbmFibGVkLCB5b3UgbXVzdCBjYWxsIGNvbnRyb2xzLnVwZGF0ZSgpIGluIHlvdXIgYW5pbWF0aW9uIGxvb3BcbiAgICB0aGlzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9Sb3RhdGVTcGVlZCA9IDIuMDsgLy8gMzAgc2Vjb25kcyBwZXIgcm91bmQgd2hlbiBmcHMgaXMgNjBcblxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHVzZSBvZiB0aGUga2V5c1xuICAgIHRoaXMuZW5hYmxlS2V5cyA9IHRydWU7XG5cbiAgICAvLyBUaGUgZm91ciBhcnJvdyBrZXlzXG4gICAgdGhpcy5rZXlzID0ge0xFRlQ6IDM3LCBVUDogMzgsIFJJR0hUOiAzOSwgQk9UVE9NOiA0MH07XG5cbiAgICAvLyBNb3VzZSBidXR0b25zXG4gICAgdGhpcy5tb3VzZUJ1dHRvbnMgPSB7T1JCSVQ6IE1PVVNFLkxFRlQsIFpPT006IE1PVVNFLk1JRERMRSwgUEFOOiBNT1VTRS5SSUdIVH07XG5cbiAgICAvLyBmb3IgcmVzZXRcbiAgICB0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLnpvb20wID0gdGhpcy5vYmplY3Quem9vbTtcblxuICAgIC8vXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvL1xuXG4gICAgdGhpcy5nZXRQb2xhckFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC5waGk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QXppbXV0aGFsQW5nbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gc3BoZXJpY2FsLnRoZXRhO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy50YXJnZXQuY29weSh0aGlzLnRhcmdldDApO1xuICAgICAgdGhpcy5vYmplY3QucG9zaXRpb24uY29weSh0aGlzLnBvc2l0aW9uMCk7XG4gICAgICB0aGlzLm9iamVjdC56b29tID0gdGhpcy56b29tMDtcblxuICAgICAgdGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICAvLyB0aGlzIG1ldGhvZCBpcyBleHBvc2VkLCBidXQgcGVyaGFwcyBpdCB3b3VsZCBiZSBiZXR0ZXIgaWYgd2UgY2FuIG1ha2UgaXQgcHJpdmF0ZS4uLlxuICAgIHRoaXMudXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcblxuICAgICAgLy8gc28gY2FtZXJhLnVwIGlzIHRoZSBvcmJpdCBheGlzXG4gICAgICBjb25zdCBxdWF0ID0gbmV3IFF1YXRlcm5pb24oKS5zZXRGcm9tVW5pdFZlY3RvcnMob2JqZWN0LnVwLCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XG4gICAgICBjb25zdCBxdWF0SW52ZXJzZSA9IHF1YXQuY2xvbmUoKS5pbnZlcnNlKCk7XG5cbiAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XG4gICAgICBjb25zdCBsYXN0UXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG5cbiAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG4gICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO1xuXG4gICAgICAgIC8vIHJvdGF0ZSBvZmZzZXQgdG8gXCJ5LWF4aXMtaXMtdXBcIiBzcGFjZVxuICAgICAgICBvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKHF1YXQpO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20gei1heGlzIGFyb3VuZCB5LWF4aXNcbiAgICAgICAgc3BoZXJpY2FsLnNldEZyb21WZWN0b3IzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1JvdGF0ZSAmJiBzdGF0ZSA9PT0gU1RBVEUuTk9ORSlcbiAgICAgICAgICByb3RhdGVMZWZ0KGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC50aGV0YSArPSBzcGhlcmljYWxEZWx0YS50aGV0YTtcbiAgICAgICAgc3BoZXJpY2FsLnBoaSArPSBzcGhlcmljYWxEZWx0YS5waGk7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgdGhldGEgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBzcGhlcmljYWwudGhldGEgPSBNYXRoLm1heCh0aGlzLm1pbkF6aW11dGhBbmdsZSwgTWF0aC5taW4odGhpcy5tYXhBemltdXRoQW5nbGUsIHNwaGVyaWNhbC50aGV0YSkpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHNwaGVyaWNhbC5waGkgPSBNYXRoLm1heCh0aGlzLm1pblBvbGFyQW5nbGUsIE1hdGgubWluKHRoaXMubWF4UG9sYXJBbmdsZSwgc3BoZXJpY2FsLnBoaSkpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5tYWtlU2FmZSgpO1xuXG4gICAgICAgIHNwaGVyaWNhbC5yYWRpdXMgKj0gc2NhbGU7XG5cbiAgICAgICAgLy8gcmVzdHJpY3QgcmFkaXVzIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcbiAgICAgICAgc3BoZXJpY2FsLnJhZGl1cyA9IE1hdGgubWF4KHRoaXMubWluRGlzdGFuY2UsIE1hdGgubWluKHRoaXMubWF4RGlzdGFuY2UsIHNwaGVyaWNhbC5yYWRpdXMpKTtcblxuICAgICAgICAvLyBtb3ZlIHRhcmdldCB0byBwYW5uZWQgbG9jYXRpb25cbiAgICAgICAgdGhpcy50YXJnZXQuYWRkKHBhbk9mZnNldCk7XG5cbiAgICAgICAgb2Zmc2V0LnNldEZyb21TcGhlcmljYWwoc3BoZXJpY2FsKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0SW52ZXJzZSk7XG5cbiAgICAgICAgcG9zaXRpb24uY29weSh0aGlzLnRhcmdldCkuYWRkKG9mZnNldCk7XG5cbiAgICAgICAgdGhpcy5vYmplY3QubG9va0F0KHRoaXMudGFyZ2V0KTtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVEYW1waW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgKj0gKDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAqPSAoMSAtIHRoaXMuZGFtcGluZ0ZhY3Rvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnNldCgwLCAwLCAwKTtcblxuICAgICAgICBzY2FsZSA9IDE7XG4gICAgICAgIHBhbk9mZnNldC5zZXQoMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGNvbmRpdGlvbiBpczpcbiAgICAgICAgLy8gbWluKGNhbWVyYSBkaXNwbGFjZW1lbnQsIGNhbWVyYSByb3RhdGlvbiBpbiByYWRpYW5zKV4yID4gRVBTXG4gICAgICAgIC8vIHVzaW5nIHNtYWxsLWFuZ2xlIGFwcHJveGltYXRpb24gY29zKHgvMikgPSAxIC0geF4yIC8gOFxuXG4gICAgICAgIGlmICh6b29tQ2hhbmdlZFxuICAgICAgICAgIHx8IGxhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZCh0aGlzLm9iamVjdC5wb3NpdGlvbikgPiBFUFNcbiAgICAgICAgICB8fCA4ICogKDEgLSBsYXN0UXVhdGVybmlvbi5kb3QodGhpcy5vYmplY3QucXVhdGVybmlvbikpID4gRVBTKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuICAgICAgICAgIGxhc3RQb3NpdGlvbi5jb3B5KHRoaXMub2JqZWN0LnBvc2l0aW9uKTtcbiAgICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pO1xuICAgICAgICAgIHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcblxuICAgICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNwb3NlJyB9ICk7IC8vIHNob3VsZCB0aGlzIGJlIGFkZGVkIGhlcmU/XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gaW50ZXJuYWxzXG4gICAgLy9cblxuICAgIGNvbnN0IGNoYW5nZUV2ZW50ID0ge3R5cGU6ICdjaGFuZ2UnfTtcbiAgICBjb25zdCBzdGFydEV2ZW50ID0ge3R5cGU6ICdzdGFydCd9O1xuICAgIGNvbnN0IGVuZEV2ZW50ID0ge3R5cGU6ICdlbmQnfTtcblxuICAgIGNvbnN0IFNUQVRFID0ge05PTkU6IC0xLCBST1RBVEU6IDAsIERPTExZOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfRE9MTFk6IDQsIFRPVUNIX1BBTjogNX07XG5cbiAgICBsZXQgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgY29uc3QgRVBTID0gMC4wMDAwMDE7XG5cbiAgICAvLyBjdXJyZW50IHBvc2l0aW9uIGluIHNwaGVyaWNhbCBjb29yZGluYXRlc1xuICAgIGNvbnN0IHNwaGVyaWNhbCA9IG5ldyBTcGhlcmljYWwoKTtcbiAgICBjb25zdCBzcGhlcmljYWxEZWx0YSA9IG5ldyBTcGhlcmljYWwoKTtcblxuICAgIGxldCBzY2FsZSA9IDE7XG4gICAgY29uc3QgcGFuT2Zmc2V0ID0gbmV3IFZlY3RvcjMoKTtcbiAgICBsZXQgem9vbUNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJvdGF0ZVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IHBhblN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5FbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbkRlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGRvbGx5U3RhcnQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBkb2xseURlbHRhID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0IGdldEF1dG9Sb3RhdGlvbkFuZ2xlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC8gNjAgLyA2MCAqIHRoaXMuYXV0b1JvdGF0ZVNwZWVkO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRab29tU2NhbGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coMC45NSwgdGhpcy56b29tU3BlZWQpO1xuICAgIH07XG5cbiAgICBjb25zdCByb3RhdGVMZWZ0ID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEudGhldGEgLT0gYW5nbGU7XG4gICAgfTtcblxuICAgIGNvbnN0IHJvdGF0ZVVwID0gYW5nbGUgPT4ge1xuICAgICAgc3BoZXJpY2FsRGVsdGEucGhpIC09IGFuZ2xlO1xuICAgIH07XG5cbiAgICBjb25zdCBwYW5MZWZ0ID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRpc3RhbmNlLCBvYmplY3RNYXRyaXgpID0+IHtcbiAgICAgICAgdi5zZXRGcm9tTWF0cml4Q29sdW1uKG9iamVjdE1hdHJpeCwgMCk7IC8vIGdldCBYIGNvbHVtbiBvZiBvYmplY3RNYXRyaXhcbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcigtZGlzdGFuY2UpO1xuICAgICAgICBwYW5PZmZzZXQuYWRkKHYpO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcGFuVXAgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgdiA9IG5ldyBWZWN0b3IzKCk7XG5cbiAgICAgIHJldHVybiAoZGlzdGFuY2UsIG9iamVjdE1hdHJpeCkgPT4ge1xuICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAxKTsgLy8gZ2V0IFkgY29sdW1uIG9mIG9iamVjdE1hdHJpeFxuICAgICAgICB2Lm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8vIGRlbHRhWCBhbmQgZGVsdGFZIGFyZSBpbiBwaXhlbHM7IHJpZ2h0IGFuZCBkb3duIGFyZSBwb3NpdGl2ZVxuICAgIGNvbnN0IHBhbiA9ICgoKSA9PiB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuXG4gICAgICByZXR1cm4gKGRlbHRhWCwgZGVsdGFZKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gdGhpcy5kb21FbGVtZW50LmJvZHkgOiB0aGlzLmRvbUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICAgICAgICAvLyBwZXJzcGVjdGl2ZVxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XG4gICAgICAgICAgb2Zmc2V0LmNvcHkocG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCk7XG4gICAgICAgICAgbGV0IHRhcmdldERpc3RhbmNlID0gb2Zmc2V0Lmxlbmd0aCgpO1xuXG4gICAgICAgICAgLy8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXG4gICAgICAgICAgdGFyZ2V0RGlzdGFuY2UgKj0gTWF0aC50YW4oKHRoaXMub2JqZWN0LmZvdiAvIDIpICogTWF0aC5QSSAvIDE4MC4wKTtcblxuICAgICAgICAgIC8vIHdlIGFjdHVhbGx5IGRvbid0IHVzZSBzY3JlZW5XaWR0aCwgc2luY2UgcGVyc3BlY3RpdmUgY2FtZXJhIGlzIGZpeGVkIHRvIHNjcmVlbiBoZWlnaHRcbiAgICAgICAgICBwYW5MZWZ0KDIgKiBkZWx0YVggKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKDIgKiBkZWx0YVkgKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gb3J0aG9ncmFwaGljXG4gICAgICAgICAgcGFuTGVmdChkZWx0YVggKiAodGhpcy5vYmplY3QucmlnaHQgLSB0aGlzLm9iamVjdC5sZWZ0KSAvIHRoaXMub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudFdpZHRoLCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICAgIHBhblVwKGRlbHRhWSAqICh0aGlzLm9iamVjdC50b3AgLSB0aGlzLm9iamVjdC5ib3R0b20pIC8gdGhpcy5vYmplY3Quem9vbSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCB0aGlzLm9iamVjdC5tYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNhbWVyYSBuZWl0aGVyIG9ydGhvZ3JhcGhpYyBub3IgcGVyc3BlY3RpdmVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IE9yYml0Q29udHJvbHNNb2R1bGUuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIHBhbiBkaXNhYmxlZC4nKTtcbiAgICAgICAgICB0aGlzLmVuYWJsZVBhbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBkb2xseUluID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgLz0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tICogZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGRvbGx5T3V0ID0gZG9sbHlTY2FsZSA9PiB7XG4gICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBQZXJzcGVjdGl2ZUNhbWVyYSlcbiAgICAgICAgc2NhbGUgKj0gZG9sbHlTY2FsZTtcblxuICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5vYmplY3Quem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgTWF0aC5taW4odGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tIC8gZG9sbHlTY2FsZSkpO1xuICAgICAgICB0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9sc01vZHVsZS5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgdGhpcy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy8gZXZlbnQgY2FsbGJhY2tzIC0gdXBkYXRlIHRoZSBvYmplY3Qgc3RhdGVcbiAgICAvL1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25Sb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duRG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZU1vdXNlRG93bkRvbGx5JyApO1xuXG4gICAgICBkb2xseVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZURvd25QYW4nICk7XG5cbiAgICAgIHBhblN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUm90YXRlID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVSb3RhdGUnICk7XG5cbiAgICAgIHJvdGF0ZUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQpO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHRoaXMuZG9tRWxlbWVudC5ib2R5IDogdGhpcy5kb21FbGVtZW50O1xuXG4gICAgICAvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXG4gICAgICByb3RhdGVMZWZ0KDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgLy8gcm90YXRpbmcgdXAgYW5kIGRvd24gYWxvbmcgd2hvbGUgc2NyZWVuIGF0dGVtcHRzIHRvIGdvIDM2MCwgYnV0IGxpbWl0ZWQgdG8gMTgwXG4gICAgICByb3RhdGVVcCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHRoaXMucm90YXRlU3BlZWQpO1xuXG4gICAgICByb3RhdGVTdGFydC5jb3B5KHJvdGF0ZUVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZURvbGx5ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVEb2xseScgKTtcblxuICAgICAgZG9sbHlFbmQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMClcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgZG9sbHlTdGFydC5jb3B5KGRvbGx5RW5kKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlUGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZU1vdmVQYW4nICk7XG5cbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCk7XG5cbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcblxuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVVwJyApO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZVdoZWVsID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVNb3VzZVdoZWVsJyApO1xuXG4gICAgICBpZiAoZXZlbnQuZGVsdGFZIDwgMClcbiAgICAgICAgZG9sbHlPdXQoZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBlbHNlIGlmIChldmVudC5kZWx0YVkgPiAwKVxuICAgICAgICBkb2xseUluKGdldFpvb21TY2FsZSgpKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlS2V5RG93bicgKTtcblxuICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLlVQOlxuICAgICAgICAgIHBhbigwLCB0aGlzLmtleVBhblNwZWVkKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdGhpcy5rZXlzLkJPVFRPTTpcbiAgICAgICAgICBwYW4oMCwgLXRoaXMua2V5UGFuU3BlZWQpO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0aGlzLmtleXMuTEVGVDpcbiAgICAgICAgICBwYW4odGhpcy5rZXlQYW5TcGVlZCwgMCk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRoaXMua2V5cy5SSUdIVDpcbiAgICAgICAgICBwYW4oLXRoaXMua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hTdGFydFJvdGF0ZScgKTtcblxuICAgICAgcm90YXRlU3RhcnQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkgPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoU3RhcnREb2xseScgKTtcblxuICAgICAgY29uc3QgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgZG9sbHlTdGFydC5zZXQoMCwgZGlzdGFuY2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0UGFuID0gZXZlbnQgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaFN0YXJ0UGFuJyApO1xuXG4gICAgICBwYW5TdGFydC5zZXQoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoTW92ZVJvdGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlUm90YXRlJyApO1xuXG4gICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyB0aGlzLmRvbUVsZW1lbnQuYm9keSA6IHRoaXMuZG9tRWxlbWVudDtcblxuICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogdGhpcy5yb3RhdGVTcGVlZCk7XG5cbiAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgcm90YXRlVXAoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiB0aGlzLnJvdGF0ZVNwZWVkKTtcblxuICAgICAgcm90YXRlU3RhcnQuY29weShyb3RhdGVFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVEb2xseSA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCAnaGFuZGxlVG91Y2hNb3ZlRG9sbHknICk7XG5cbiAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGRvbGx5RW5kLnNldCgwLCBkaXN0YW5jZSk7XG5cbiAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XG5cbiAgICAgIGlmIChkb2xseURlbHRhLnkgPiAwKVxuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG5cbiAgICAgIGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApXG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuXG4gICAgICBkb2xseVN0YXJ0LmNvcHkoZG9sbHlFbmQpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmVQYW4gPSBldmVudCA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyggJ2hhbmRsZVRvdWNoTW92ZVBhbicgKTtcblxuICAgICAgcGFuRW5kLnNldChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcblxuICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyhwYW5FbmQsIHBhblN0YXJ0KTtcblxuICAgICAgcGFuKHBhbkRlbHRhLngsIHBhbkRlbHRhLnkpO1xuXG4gICAgICBwYW5TdGFydC5jb3B5KHBhbkVuZCk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVRvdWNoRW5kID0gKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdoYW5kbGVUb3VjaEVuZCcgKTtcbiAgICB9O1xuXG4gICAgLy9cbiAgICAvLyBldmVudCBoYW5kbGVycyAtIEZTTTogbGlzdGVuIGZvciBldmVudHMgYW5kIHJlc2V0IHN0YXRlXG4gICAgLy9cblxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuT1JCSVQpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93blJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgc3RhdGUgPSBTVEFURS5ST1RBVEU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gdGhpcy5tb3VzZUJ1dHRvbnMuWk9PTSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVab29tID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZU1vdXNlRG93bkRvbGx5KGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLkRPTExZO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IHRoaXMubW91c2VCdXR0b25zLlBBTikge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VEb3duUGFuKGV2ZW50KTtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLlBBTjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5OT05FKSB7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlUm90YXRlKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFNUQVRFLkRPTExZKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgaGFuZGxlTW91c2VNb3ZlRG9sbHkoZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICBoYW5kbGVNb3VzZU1vdmVQYW4oZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlVXAgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBoYW5kbGVNb3VzZVVwKGV2ZW50KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlV2hlZWwgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVpvb20gPT09IGZhbHNlIHx8IChzdGF0ZSAhPT0gU1RBVEUuTk9ORSAmJiBzdGF0ZSAhPT0gU1RBVEUuUk9UQVRFKSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGhhbmRsZU1vdXNlV2hlZWwoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7IC8vIG5vdCBzdXJlIHdoeSB0aGVzZSBhcmUgaGVyZS4uLlxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UgfHwgdGhpcy5lbmFibGVLZXlzID09PSBmYWxzZSB8fCB0aGlzLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlS2V5RG93bihldmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hTdGFydCA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgICAgaGFuZGxlVG91Y2hTdGFydFJvdGF0ZShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnREb2xseShldmVudCk7XG5cbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX0RPTExZO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0UGFuKGV2ZW50KTtcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUEFOO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLk5PTkUpXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaE1vdmUgPSBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiAvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUk9UQVRFKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUm90YXRlKGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLlRPVUNIX0RPTExZKSByZXR1cm47IC8vIGlzIHRoaXMgbmVlZGVkPy4uLlxuXG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlRG9sbHkoZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICBpZiAodGhpcy5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaWYgKHN0YXRlICE9PSBTVEFURS5UT1VDSF9QQU4pIHJldHVybjsgLy8gaXMgdGhpcyBuZWVkZWQ/Li4uXG5cbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVQYW4oZXZlbnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoRW5kID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaGFuZGxlVG91Y2hFbmQoZXZlbnQpO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ29udGV4dE1lbnUgPSBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICAvL1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSwgZmFsc2UpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24oJ3doZWVsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5vbigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG5cbiAgICAvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBnZXQgY2VudGVyKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmNlbnRlciBoYXMgYmVlbiByZW5hbWVkIHRvIC50YXJnZXQnKTtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQ7XG4gIH1cblxuICBnZXQgbm9ab29tKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vWm9vbSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVpvb20gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlWm9vbTtcbiAgfVxuXG4gIHNldCBub1pvb20odmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVab29tID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IG5vUm90YXRlKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZVJvdGF0ZTtcbiAgfVxuXG4gIHNldCBub1JvdGF0ZSh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVSb3RhdGUgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgbm9QYW4oKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlUGFuO1xuICB9XG5cbiAgc2V0IG5vUGFuKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9QYW4gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVQYW4gaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZVBhbiA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBub0tleXMoKSB7XG4gICAgY29uc29sZS53YXJuKCdPcmJpdENvbnRyb2xzOiAubm9LZXlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlS2V5cyBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5lbmFibGVLZXlzO1xuICB9XG5cbiAgc2V0IG5vS2V5cyh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLm5vS2V5cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZUtleXMgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmVuYWJsZUtleXMgPSAhdmFsdWU7XG4gIH1cblxuICBnZXQgc3RhdGljTW92aW5nKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlRGFtcGluZztcbiAgfVxuXG4gIHNldCBzdGF0aWNNb3ZpbmcodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5zdGF0aWNNb3ZpbmcgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVEYW1waW5nIGluc3RlYWQuJyk7XG4gICAgdGhpcy5lbmFibGVEYW1waW5nID0gIXZhbHVlO1xuICB9XG5cbiAgZ2V0IGR5bmFtaWNEYW1waW5nRmFjdG9yKCkge1xuICAgIGNvbnNvbGUud2FybignT3JiaXRDb250cm9sczogLmR5bmFtaWNEYW1waW5nRmFjdG9yIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSAuZGFtcGluZ0ZhY3RvciBpbnN0ZWFkLicpO1xuICAgIHJldHVybiB0aGlzLmRhbXBpbmdGYWN0b3I7XG4gIH1cblxuICBzZXQgZHluYW1pY0RhbXBpbmdGYWN0b3IodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ09yYml0Q29udHJvbHM6IC5keW5hbWljRGFtcGluZ0ZhY3RvciBoYXMgYmVlbiByZW5hbWVkLiBVc2UgLmRhbXBpbmdGYWN0b3IgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSB2YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtWZWN0b3IzfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge0NvbnRyb2xzTW9kdWxlfSBmcm9tICcuLi9Db250cm9sc01vZHVsZSc7XG5cbmltcG9ydCB7VGhyZWVPcmJpdENvbnRyb2xzfSBmcm9tICcuL2xpYi9UaHJlZU9yYml0Q29udHJvbHMnO1xuXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc01vZHVsZSBleHRlbmRzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGZvbGxvdzogZmFsc2UsXG4gICAgICBvYmplY3Q6IG51bGwsXG4gICAgICB0YXJnZXQ6IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gICAgfSwgcGFyYW1zKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIHN1cGVyLm1hbmFnZXIobWFuYWdlcik7XG5cbiAgICBjb25zdCB7b2JqZWN0OiBvYmosIGZvbGxvdywgdGFyZ2V0fSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IG9iamVjdCA9IG9iaiA/IG9iai5uYXRpdmUgOiBtYW5hZ2VyLmdldCgnY2FtZXJhJykubmF0aXZlO1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgVGhyZWVPcmJpdENvbnRyb2xzKFxuICAgICAgb2JqZWN0LFxuICAgICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKSxcbiAgICAgIG1hbmFnZXIuaGFuZGxlclxuICAgICk7XG5cbiAgICBjb25zdCB1cGRhdGVQcm9jZXNzb3IgPSBmb2xsb3cgPyBjID0+IHtcbiAgICAgIGNvbnRyb2xzLnVwZGF0ZShjLmdldERlbHRhKCkpO1xuICAgICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgICB9IDogYyA9PiB7XG4gICAgICBjb250cm9scy51cGRhdGUoYy5nZXREZWx0YSgpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDb250cm9scyhjb250cm9scyk7XG4gICAgdGhpcy5zZXRVcGRhdGUodXBkYXRlUHJvY2Vzc29yKTtcblxuICAgIG1hbmFnZXIudXBkYXRlKHtcbiAgICAgIGNhbWVyYTogY2FtZXJhID0+IHtcbiAgICAgICAgaWYgKG9iaikgcmV0dXJuO1xuICAgICAgICBjb250cm9scy5vYmplY3QgPSBjYW1lcmEubmF0aXZlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udHJvbHMudGFyZ2V0LmNvcHkodGFyZ2V0KTtcbiAgfVxufVxuIiwiLyoqIEBtb2R1bGUgbW9kdWxlcy9hcHAvY29udHJvbHMgKi9cbmV4cG9ydCAqIGZyb20gJy4vT3JiaXRDb250cm9sc01vZHVsZSc7XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzL2FwcCAqL1xuZXhwb3J0ICogZnJvbSAnLi9FbGVtZW50TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vUmVuZGVyaW5nTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vU2NlbmVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXNpemVNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Qb3N0UHJvY2Vzc29yTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vVmlydHVhbE1vdXNlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzUGF0Y2hNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9Db250cm9sc01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0ZvZ01vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRlTW9kdWxlJztcblxuLy8gY29udHJvbHNcbmV4cG9ydCAqIGZyb20gJy4vY29udHJvbHMvaW5kZXgnO1xuIiwiLyoqXG4gKiBAY2xhc3MgRHluYW1pY0dlb21ldHJ5TW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17YXR0cmlidXRlczogZmFsc2V9XSAtIHBhcmFtc1xuICogQHBhcmFtIHtCb29sZWFufSBbcGF0Y2hFdmVudHM9dHJ1ZV1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9tZXNoXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljR2VvbWV0cnlNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhdHRyaWJ1dGVzOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGNvbnN0IHBhcmFtcyA9IHNlbGYucGFyYW1zO1xuXG4gICAgdGhpcy5nXyA9IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xuICAgICAgaWYgKHRoaXMuYnVpbGRHZW9tZXRyeSkge1xuICAgICAgICB0aGlzLm5hdGl2ZS5nZW9tZXRyeSA9IHRoaXMuYnVpbGRHZW9tZXRyeShcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtcyh7Z2VvbWV0cnk6IHBhcmFtc30pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChwYXJhbXMuYXR0cmlidXRlcykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wYXJhbXMuZ2VvbWV0cnkpIHtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBgZ18ke2tleX1gLCB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZS5nZW9tZXRyeS5wYXJhbWV0ZXJzW2tleV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMubmF0aXZlLmdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KHRoaXMudXBkYXRlUGFyYW1zKHtnZW9tZXRyeToge1trZXldOiB2YWx1ZX19KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBSZXBlYXRXcmFwcGluZyxcbiAgVVZNYXBwaW5nLFxuICBOZWFyZXN0RmlsdGVyLFxuICBMaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIsXG4gIFRleHR1cmVMb2FkZXIsXG4gIFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBsb2FkZXIgPSBuZXcgVGV4dHVyZUxvYWRlcigpO1xuXG4vKipcbiAqIEBjbGFzcyBUZXh0dXJlTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9tZXNoXG4gKiBAZGVzY3JpcHRpb24gQSBUZXh0dXJlTW9kdWxlIGNhbiBiZSBhcHBsaWVkIHRvIGFueSBNZXNoIG9yIE1vZGVsLlxuICogQHBhcmFtIHtBcnJheX0gW3RleHR1cmVzXSAtIGFycmF5IG9mIHRleHR1cmUgb2JqZWN0c1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0aW5nIGFuIGluc3RhbmNlLiB1cmwgdGFrZXMgYSBwYXRoLCBvciBhIGRhdGEgb2JqZWN0LjwvY2FwdGlvbj5cbiAqIHZhciB3b29kVGV4dHVyZSA9IG5ldyBUZXh0dXJlTW9kdWxlKHtcbiAqICAgdXJsOiBgJHtwcm9jZXNzLmFzc2V0c1BhdGh9L3RleHR1cmVzL3dvb2QuanBnYFxuICogfSk7XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Nb3JlIGNvbXByZWhlbnNpdmUgZXhhbXBsZSwgd29vZCB0ZXh0dXJlIGFwcGxpZWQgdG8gYSBCb3guPC9jYXB0aW9uPlxuICogbmV3IEJveCh7XG4gKiAgIGdlb21ldHJ5OiB7XG4gKiAgICAgd2lkdGg6IDIsXG4gKiAgICAgaGVpZ2h0OiAyLFxuICogICAgIGRlcHRoOiAyXG4gKiAgIH0sXG4gKiAgIG1vZHVsZXM6IFtcbiAqICAgICBuZXcgVGV4dHVyZU1vZHVsZSh7XG4gKiAgICAgICB1cmw6IGBwYXRoL3RvL3RleHR1cmUuanBnYCxcbiAqICAgICAgIHJlcGVhdDogbmV3IFRIUkVFLlZlY3RvcjIoMSwgMSkgLy8gb3B0aW9uYWxcbiAqICAgICB9KVxuICogICBdLFxuICogICBtYXRlcmlhbDogbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAqICAgICBjb2xvcjogMHhmZmZmZmZcbiAqICAgfSksXG4gKiAgIHBvc2l0aW9uOiBbNTAsIDYwLCA3MF1cbiAqIH0pLmFkZFRvKGFwcCk7XG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0dXJlTW9kdWxlIHtcbiAgc3RhdGljIGxvYWQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0dXJlTW9kdWxlKHt1cmx9KS50ZXh0dXJlc1swXVsxXTtcbiAgfVxuXG4gIHRleHR1cmVzID0gW107XG5cbiAgY29uc3RydWN0b3IoLi4udGV4dHVyZXMpIHtcbiAgICB0ZXh0dXJlcy5mb3JFYWNoKCh7XG4gICAgICB1cmwsXG4gICAgICB0eXBlID0gJ21hcCcsXG4gICAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMigwLCAwKSxcbiAgICAgIHJlcGVhdCA9IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgd3JhcCA9IFJlcGVhdFdyYXBwaW5nLFxuICAgICAgbWFwcGluZyA9IFVWTWFwcGluZyxcbiAgICAgIGZpeCA9IHRleCA9PiB0ZXhcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gbG9hZGVyLmxvYWQodXJsKTtcblxuICAgICAgaWYgKHdyYXAubGVuZ3RoID4gMCkge1xuICAgICAgICB0ZXh0dXJlLndyYXBTID0gd3JhcFswXTtcbiAgICAgICAgdGV4dHVyZS53cmFwVCA9IHdyYXBbMV07XG4gICAgICB9IGVsc2VcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IHRleHR1cmUud3JhcFQgPSB3cmFwO1xuXG4gICAgICB0ZXh0dXJlLm1hcHBpbmcgPSBtYXBwaW5nO1xuXG4gICAgICB0ZXh0dXJlLm9mZnNldC5jb3B5KG9mZnNldCk7XG4gICAgICB0ZXh0dXJlLnJlcGVhdC5jb3B5KHJlcGVhdCk7XG5cbiAgICAgIHRleHR1cmUubWFnRmlsdGVyID0gTmVhcmVzdEZpbHRlcjtcbiAgICAgIHRleHR1cmUubWluRmlsdGVyID0gTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyO1xuXG4gICAgICB0aGlzLnRleHR1cmVzLnB1c2goW3R5cGUsIGZpeCh0ZXh0dXJlKV0pO1xuICAgIH0pO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1hdGVyaWFsKG1hdGVyaWFsLCBzZWxmKSB7XG4gICAgICBzZWxmLnRleHR1cmVzLmZvckVhY2godGV4dHVyZSA9PiB7XG4gICAgICAgIG1hdGVyaWFsW3RleHR1cmVbMF1dID0gdGV4dHVyZVsxXTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBbmltYXRpb25NaXhlcixcbiAgQW5pbWF0aW9uQ2xpcCxcbiAgQ2xvY2tcbn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge0xvb3B9IGZyb20gJy4uLy4uL2NvcmUvTG9vcCc7XG5cbi8qKlxuICogQGNsYXNzIEFuaW1hdGlvbk1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXMvbWVzaFxuICogQGRlc2NyaXB0aW9uIENvbnZlbmllbmNlIG1vZHVsZSB0aGF0IHdyYXBzIHRoZSA8YSBocmVmPSdodHRwczovL3RocmVlanMub3JnL2RvY3MvI21hbnVhbC9pbnRyb2R1Y3Rpb24vQW5pbWF0aW9uLXN5c3RlbSc+dGhyZWUuanMgYW5pbWF0aW9uIHN5c3RlbTwvYT5cbiAqIEBwYXJhbSB7QXBwfSBhcHAgLSB0aGUgYXBwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtpc0RlZmVycmVkPWZhbHNlXSAtIHNldCB0byB0cnVlIGlmIGFuaW1hdGlvbiBzaG91bGQgbm90IHN0YXJ0IGF1dG9tYXRpY2FsbHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXtzcGVlZDogMX1dIC0gdGhlIHBhcmFtc1xuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2hcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNyZWF0ZSBhbmltYXRpb24gbW9kdWxlIGFuZCBwbGF5IGEgZ2l2ZW4gY2xpcCBvZiBhbiBpbXBvcnRlZCBtb2RlbDwvY2FwdGlvbj5cbiAqIGNvbnN0IGFuaW1hdGlvbk1vZHVsZSA9IG5ldyBBbmltYXRpb25Nb2R1bGUoYXBwLCBmYWxzZSwge1xuICogICBzcGVlZDogMS4yIC8vIHNwZWVkIHVwIGFuaW1hdGlvbiBieSAyMCVcbiAqIH0pO1xuICpcbiAqIG5ldyBJbXBvcnRlcih7XG4gKiAgIHBhcnNlcihnZW9tZXRyeSwgbWF0ZXJpYWxzKSB7XG4gKiAgICAgLy8gT3ZlcnJpZGUgcGFyc2UgdG8gZ2VuZXJhdGUgYSBza2lubmVkTWVzaCwgbmVlZGVkIGZvciBza2lubmVkIG1vZGVsc1xuICogICAgIHJldHVybiBuZXcgVEhSRUUuU2tpbm5lZE1lc2goZ2VvbWV0cnksIG1hdGVyaWFscyk7XG4gKiAgIH0sXG4gKlxuICogICB1cmw6IGBwYXRoL3RvL21vZGVsLmpzb25gLFxuICogICB1c2VDdXN0b21NYXRlcmlhbDogdHJ1ZSxcbiAqXG4gKiAgIG1hdGVyaWFsOiBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICogICAgIHNraW5uaW5nOiB0cnVlXG4gKiAgIH0pLFxuICpcbiAqICAgbW9kdWxlczogW2FuaW1hdGlvbk1vZHVsZV1cbiAqIH0pLmFkZFRvKGFwcCkudGhlbigoKSA9PiB7XG4gKiAgIC8vIGFkZGluZyBtb2RlbCB0byBhcHAgcmV0dXJucyBhIHByb21pc2UsIHNvIHBpcGUgdGhlIGZ1bmN0aW9uIHRvIGtpY2sgb2ZmIHRoZSBhbmltYXRpb24gY2xpcFxuICogICBhbmltYXRpb25Nb2R1bGUucGxheSgnY2xpcE5hbWUnKTtcbiAqIH0pO1xuICovXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoYXBwLCBpc0RlZmVycmVkLCBwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBzcGVlZDogMVxuICAgIH0sIHBhcmFtcyk7XG4gICAgdGhpcy5jbG9jayA9IG5ldyBDbG9jaygpO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5pc0RlZmVycmVkID0gaXNEZWZlcnJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHBsYXlcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBQbGF5cyB0aGUgZ2l2ZW4gY2xpcCBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGlwTmFtZSAtIHRoZSBjbGlwIHRvIHBsYXlcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICBwbGF5KGNsaXBOYW1lKSB7XG4gICAgY29uc3QgY2xpcCA9IEFuaW1hdGlvbkNsaXAuZmluZEJ5TmFtZSh0aGlzLmNsaXBzLCBjbGlwTmFtZSk7XG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5taXhlci5jbGlwQWN0aW9uKGNsaXApO1xuXG4gICAgYWN0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSB0aGUgbWl4ZXIgKGJlaW5nIGNhbGxlZCBvbiBmcmFtZSBhbmltYXRpb24gbG9vcClcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL21lc2guQW5pbWF0aW9uTW9kdWxlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMubWl4ZXIpIHRoaXMubWl4ZXIudXBkYXRlKHRoaXMuY2xvY2suZ2V0RGVsdGEoKSAqIHRoaXMucGFyYW1zLnNwZWVkKTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgc2VsZi5sb29wID0gbmV3IExvb3AoKCkgPT4ge1xuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9KTtcblxuICAgIGlmICghc2VsZi5pc0RlZmVycmVkKSBzZWxmLmxvb3Auc3RhcnQoc2VsZi5hcHApO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2FuaW1hdGlvbicpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgbWVzaC5nZW9tZXRyeS5za2VsZXRvbiA9IG1lc2guc2tlbGV0b247XG5cbiAgICAgIHNlbGYubWl4ZXIgPSBuZXcgQW5pbWF0aW9uTWl4ZXIobWVzaC5nZW9tZXRyeSk7XG4gICAgICBzZWxmLmNsaXBzID0gbWVzaC5nZW9tZXRyeS5hbmltYXRpb25zO1xuXG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKiBAbW9kdWxlIG1vZHVsZXMvbWVzaCAqL1xuZXhwb3J0ICogZnJvbSAnLi9EeW5hbWljR2VvbWV0cnlNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9UZXh0dXJlTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQW5pbWF0aW9uTW9kdWxlJztcbiIsIi8qKlxuICogQGNsYXNzIERlZmluZU1vZHVsZVxuICogQGNhdGVnb3J5IG1vZHVsZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj4gQ3JlYXRpbmcgYSBEZWZpbmVNb2R1bGUgd2l0aCBQZXJzcGVjdGl2ZUNhbWVyYSBhcyBjYW1lcmEgbW9kdWxlIGFuZCBwYXNzaW5nIGl0IHRvIEFwcCdzIG1vZHVsZXM8L2NhcHRpb24+XG4gKiBuZXcgQXBwKFtcbiAqICAgLy8gLi4uXG4gKiAgIG5ldyBEZWZpbmVNb2R1bGUoJ2NhbWVyYScsIG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpKVxuICogXSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZpbmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5zZXQodGhpcy5uYW1lLCB0aGlzLmRhdGEpO1xuICB9XG59XG4iLCIvKiogQG1vZHVsZSBtb2R1bGVzICovXG5cbmV4cG9ydCAqIGZyb20gJy4vYXBwL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbWVzaC9pbmRleCc7XG5cbi8vIG1vZHVsZXNcbmV4cG9ydCAqIGZyb20gJy4vRGVmaW5lTW9kdWxlJztcbiIsImltcG9ydCB7SW1wb3J0ZXJ9IGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvSW1wb3J0ZXInO1xuaW1wb3J0IHtQZXJzcGVjdGl2ZUNhbWVyYX0gZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvUGVyc3BlY3RpdmVDYW1lcmEnO1xuXG5leHBvcnQgY2xhc3MgTW9kZWwgZXh0ZW5kcyBJbXBvcnRlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgLi4uYWRkaXRpb25hbCkge1xuICAgIGNvbnNvbGUud2FybignTW9kZWwgaXMgZGVwcmVjYXRlZC4gVXNlIEltcG9ydGVyIGluc3RlYWQuJyk7XG5cbiAgICBpZiAocGFyYW1zLmdlb21ldHJ5KSB7XG4gICAgICBwYXJhbXMudXJsID0gcGFyYW1zLmdlb21ldHJ5LnBhdGg7XG4gICAgICBwYXJhbXMubG9hZGVyID0gcGFyYW1zLmdlb21ldHJ5LmxvYWRlcjtcbiAgICB9XG5cbiAgICBzdXBlcihwYXJhbXMsIC4uLmFkZGl0aW9uYWwpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmFNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIGNvbnNvbGUud2FybignQ2FtZXJhTW9kdWxlIGlzIGRlcHJlY2F0ZWQuIFVzZSBEZWZpbmVNb2R1bGUgaW5zdGVhZC4nKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYShwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmFkZChzZWxmLmNhbWVyYSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLnNldCgnY2FtZXJhJywgdGhpcy5jYW1lcmEpO1xuICB9XG59XG4iLCIvKipcbiAqIE5hbWVzcGFjZSBjb250YWluaW5nIGFsbCBjbGFzc2VzIGZyb20gYWxsIG1vZHVsZXMuIFVzZWQgYXMgZ2xvYmFsIGluIFVNRCBwYXR0ZXJuLlxuICogQG5hbWVzcGFjZSBXSFNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRoZSB1c2Ugb2YgV0hTIG5hbWVzcGFjZS48L2NhcHRpb24+XG4gKiBuZXcgV0hTLkFwcCgpIC8vIGNvcmVcbiAqIG5ldyBXSFMuUGVyc3BlY3RpdmVDYW1lcmEoKSAvLyBjb21wb25lbnRzXG4gKiBuZXcgV0hTLlJlc2l6ZU1vZHVsZSgpIC8vIG1vZHVsZXNcbiAqIFdIUy5leHRlbmQoKSAvLyB1dGlsc1xuICovXG5cblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9saWdodHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NhbWVyYXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21lc2hlcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9pbmRleCc7XG5cbi8vIERFUFJFQ0FUSU9OXG5leHBvcnQgKiBmcm9tICcuL2RlcHJlY2F0aW9uJztcbiJdLCJuYW1lcyI6WyJleHRlbmQiLCJvYmplY3QiLCJleHRlbnNpb25zIiwiZXh0ZW5zaW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInByb3AiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpc0FycmF5Iiwic2xpY2UiLCJpbnN0cnVjdCIsImFycmF5IiwiaW5zdEFycmF5IiwidGVtcE9iamVjdCIsImkiLCJtYXgiLCJsZW5ndGgiLCJndWlkZSIsInRyYW5zZm9ybURhdGEiLCJpbnN0cnVjdGlvbnMiLCJrZXkiLCJ0b0FycmF5IiwiaW5zdHJ1Y3Rpb24iLCJ0ZW1wQXJyYXkiLCJDb21wb3NpdGlvbkVycm9yIiwiY2xhc3NJbnN0YW5jZSIsIm1lc3NhZ2UiLCJjb21wb25lbnQiLCJzdGFja0FycmF5Iiwic3RhY2siLCJzcGxpdCIsInNwbGljZSIsImpvaW4iLCJjb25zb2xlIiwiZXJyb3IiLCJuYW1lIiwiRXJyb3IiLCJEZXBlbmRlbmN5RXJyb3IiLCJhY3RpdmVNb2R1bGUiLCJkZXBlbmRlbmN5TW9kdWxlIiwiTWFuYWdlckVycm9yIiwid2FybkRlcHMiLCJSRVZJU0lPTiIsImVyciIsIk1vZHVsZVN5c3RlbSIsInNvdXJjZSIsIm1vZHVsZXMiLCJhcHBseU1vZHVsZSIsImFwcGx5QnJpZGdlIiwib25Db3B5IiwiYnJpZGdlTWFwIiwibW9kdWxlIiwiYnJpZGdlIiwiYXBwbHkiLCJjYiIsImZ1bmMiLCJtb2R1bGVTY29wZSIsInB1c2giLCJtYW5hZ2VyIiwiYWN0aXZlIiwiaW50ZWdyYXRlIiwiYmluZCIsImRpc3Bvc2VNb2R1bGUiLCJpbmRleE9mIiwiZGlzcG9zZSIsIkV2ZW50cyIsIlN5bWJvbCIsIm9iamVjdFByb3RvIiwiaGFzT3duUHJvcGVydHkiLCJzeW1Ub1N0cmluZ1RhZyIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwicm9vdCIsInBvbnlmaWxsIiwiJCRvYnNlcnZhYmxlIiwiTW9kdWxlTWFuYWdlciIsImhhbmRsZXIiLCJjdXJyZW50TW9kdWxlIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsInN0YXRlIiwiYWN0aW9uIiwiZGF0YSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJCb29sZWFuIiwiZGVwc01hcCIsInN1YnNjcmliZSIsImNoYW5nZWRLZXkiLCJjYWxsYmFjayIsIndhcm4iLCJzZXQiLCJtb2R1bGVFeGVjdXRvciIsInVzZSIsIkNvbXBvbmVudCIsInBhcmFtcyIsImRlZmF1bHRzIiwiX3dhaXQiLCJjaGlsZHJlbiIsImludGVncmF0ZU1vZHVsZXMiLCJwcm9taXNlIiwiUHJvbWlzZSIsImFsbCIsImlzRGVmZmVyZWQiLCJ3YWl0IiwidGhlbiIsImNvcHkiLCJjdXN0b21pemUiLCJuYXRpdmUiLCJjbG9uZSIsInBhcmVudCIsInJlc29sdmUiLCJyZWplY3QiLCJkZWZlciIsImFkZFByb21pc2UiLCJvbkFkZCIsInJlc29sdmVyIiwiYWRkIiwicmVtb3ZlIiwiX21hbmFnZXIiLCJfbmF0aXZlIiwibWVzaCIsImF0dHJpYnV0ZXMiLCJtYXBwZXJzIiwidGFyZ2V0IiwibWFwcGVyIiwiayIsIm1hcCIsImF0dHJpYnV0ZSIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0dGVyIiwic2V0dGVyIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsInZhbHVlIiwibWlycm9yIiwiTWVzaENvbXBvbmVudCIsImdlb20iLCJNZXNoIiwibWF0ZXJpYWwiLCJnZW9tZXRyeSIsImN1c3RvbSIsImJ1aWxkIiwid3JhcCIsImFwcGx5Q29tbWFuZCIsInBvc2l0aW9uIiwicm90YXRpb24iLCJzY2FsZSIsInNoYWRvdyIsIngiLCJ5IiwieiIsImNhc3RTaGFkb3ciLCJjYXN0IiwicmVjZWl2ZVNoYWRvdyIsInJlY2VpdmUiLCJvbldyYXAiLCJxdWF0ZXJuaW9uIiwiZGVzdCIsIkxpZ2h0Q29tcG9uZW50IiwibWFwU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiYmlhcyIsInJhZGl1cyIsInNoYWRvd0NhbWVyYSIsImNhbWVyYSIsIm5lYXIiLCJmYXIiLCJmb3YiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJDYW1lcmFDb21wb25lbnQiLCJzeXN0ZW0iLCJ3aW5kb3ciLCJnbG9iYWwiLCJBcHAiLCJsb2ciLCJ2ZXJzaW9uIiwic2ltdWxhdGUiLCJ1cGRhdGVFbmFibGVkIiwibG9vcHMiLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsInByb2Nlc3MiLCJsbCIsImUiLCJlbmFibGVkIiwiZXhlY3V0ZSIsImNsb2NrIiwibG9vcCIsImluZGV4IiwiZ2V0IiwiTG9vcCIsInVzZUNsb2NrIiwiQ2xvY2siLCJ3b3JsZCIsImFkZExvb3AiLCJzdGFydCIsInN0b3AiLCJyZW1vdmVMb29wIiwiQW1iaWVudExpZ2h0IiwibGlnaHQiLCJBbWJpZW50TGlnaHROYXRpdmUiLCJjb2xvciIsImludGVuc2l0eSIsIkRpcmVjdGlvbmFsTGlnaHQiLCJ3cmFwU2hhZG93IiwiRGlyZWN0aW9uYWxMaWdodE5hdGl2ZSIsIkhlbWlzcGhlcmVMaWdodCIsIkhlbWlzcGhlcmVMaWdodE5hdGl2ZSIsInNreUNvbG9yIiwiZ3JvdW5kQ29sb3IiLCJQb2ludExpZ2h0IiwiUG9pbnRMaWdodE5hdGl2ZSIsImRpc3RhbmNlIiwiZGVjYXkiLCJTcG90TGlnaHQiLCJTcG90TGlnaHROYXRpdmUiLCJhbmdsZSIsImV4cG9uZW50IiwiTWF0aCIsIlBJIiwiQXJlYUxpZ2h0IiwiUmVjdEFyZWFMaWdodE5hdGl2ZSIsIkN1YmVDYW1lcmEiLCJDdWJlQ2FtZXJhTmF0aXZlIiwiY3ViZVJlc29sdXRpb24iLCJPcnRob2dyYXBoaWNDYW1lcmEiLCJPcnRob2dyYXBoaWNDYW1lcmFOYXRpdmUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIlBlcnNwZWN0aXZlQ2FtZXJhTmF0aXZlIiwiYXNwZWN0IiwiQm94IiwiYnVpbGRHZW9tZXRyeSIsImJ1ZmZlciIsIkJveEJ1ZmZlckdlb21ldHJ5IiwiQm94R2VvbWV0cnkiLCJkZXB0aCIsIndpZHRoU2VnbWVudHMiLCJoZWlnaHRTZWdtZW50cyIsImRlcHRoU2VnbWVudHMiLCJDaXJjbGUiLCJDaXJjbGVCdWZmZXJHZW9tZXRyeSIsIkNpcmNsZUdlb21ldHJ5Iiwic2VnbWVudHMiLCJ0aGV0YVN0YXJ0IiwidGhldGFMZW5ndGgiLCJDb25lIiwiQ29uZUJ1ZmZlckdlb21ldHJ5IiwiQ29uZUdlb21ldHJ5IiwicmFkaXVzU2VnbWVudHMiLCJvcGVuRW5kZWQiLCJDeWxpbmRlciIsIkN5bGluZGVyQnVmZmVyR2VvbWV0cnkiLCJDeWxpbmRlckdlb21ldHJ5IiwicmFkaXVzVG9wIiwicmFkaXVzQm90dG9tIiwiRG9kZWNhaGVkcm9uIiwiRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJEb2RlY2FoZWRyb25HZW9tZXRyeSIsImRldGFpbCIsIkV4dHJ1ZGUiLCJFeHRydWRlR2VvbWV0cnkiLCJzaGFwZXMiLCJvcHRpb25zIiwiQnVmZmVyR2VvbWV0cnkiLCJmcm9tR2VvbWV0cnkiLCJJY29zYWhlZHJvbiIsIkljb3NhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJJY29zYWhlZHJvbkdlb21ldHJ5IiwiTGF0aGUiLCJMYXRoZUJ1ZmZlckdlb21ldHJ5IiwiTGF0aGVHZW9tZXRyeSIsInBvaW50cyIsIkxpbmUiLCJMaW5lTmF0aXZlIiwiR2VvbWV0cnkiLCJwcCIsImN1cnZlIiwiZ2V0UG9pbnRzIiwidmVydHMiLCJGbG9hdDMyQXJyYXkiLCJpMyIsImFkZEF0dHJpYnV0ZSIsIkJ1ZmZlckF0dHJpYnV0ZSIsInZlcnRpY2VzIiwiSW1wb3J0ZXIiLCJmaWx0ZXIiLCJwcm9jZXNzRmlsdGVyIiwiZm9yRWFjaCIsImVsIiwidGV4dHVyZVBhdGgiLCJsYW9kZXIiLCJzZXRUZXh0dXJlUGF0aCIsImxvYWRlciIsImxvYWQiLCJ1cmwiLCJvbkxvYWQiLCJwYXJzZXIiLCJ1c2VDdXN0b21NYXRlcmlhbCIsIm1hdCIsIm9uUHJvZ3Jlc3MiLCJvbkVycm9yIiwiSlNPTkxvYWRlciIsIm1hdGVyaWFscyIsIk9jdGFoZWRyb24iLCJPY3RhaGVkcm9uQnVmZmVyR2VvbWV0cnkiLCJPY3RhaGVkcm9uR2VvbWV0cnkiLCJQYXJhbWV0cmljIiwiUGFyYW1ldHJpY0J1ZmZlckdlb21ldHJ5IiwiUGFyYW1ldHJpY0dlb21ldHJ5Iiwic2xpY2VzIiwic3RhY2tzIiwidSIsInYiLCJWZWN0b3IzIiwiUGxhbmUiLCJQbGFuZUJ1ZmZlckdlb21ldHJ5IiwiUGxhbmVHZW9tZXRyeSIsIndTZWdtZW50cyIsImhTZWdtZW50cyIsInZlcnRpY2VzT2ZDdWJlIiwiaW5kaWNlc09mRmFjZXMiLCJQb2x5aGVkcm9uIiwiUG9seWhlZHJvbkJ1ZmZlckdlb21ldHJ5IiwiUG9seWhlZHJvbkdlb21ldHJ5IiwiUmluZyIsIlJpbmdCdWZmZXJHZW9tZXRyeSIsIlJpbmdHZW9tZXRyeSIsImlubmVyUmFkaXVzIiwib3V0ZXJSYWRpdXMiLCJ0aGV0YVNlZ21lbnRzIiwicGhpU2VnbWVudHMiLCJTaGFwZSIsIlNoYXBlQnVmZmVyR2VvbWV0cnkiLCJTaGFwZUdlb21ldHJ5IiwiU3BoZXJlIiwiU3BoZXJlQnVmZmVyR2VvbWV0cnkiLCJTcGhlcmVHZW9tZXRyeSIsIlRldHJhaGVkcm9uIiwiVGV0cmFoZWRyb25CdWZmZXJHZW9tZXRyeSIsIlRldHJhaGVkcm9uR2VvbWV0cnkiLCJUZXh0IiwicGFyYW1ldGVycyIsImZvbnQiLCJUZXh0R2VvbWV0cnkiLCJ0ZXh0IiwiRm9udExvYWRlciIsIkZvbnQiLCJUb3J1cyIsIlRvcnVzR2VvbWV0cnkiLCJ0dWJlIiwicmFkaWFsU2VnbWVudHMiLCJ0dWJ1bGFyU2VnbWVudHMiLCJhcmMiLCJUb3J1c2tub3QiLCJHQ29uc3RydWN0IiwiVG9ydXNLbm90QnVmZmVyR2VvbWV0cnkiLCJUb3J1c0tub3RHZW9tZXRyeSIsInAiLCJxIiwiVHViZSIsIlR1YmVCdWZmZXJHZW9tZXRyeSIsIlR1YmVHZW9tZXRyeSIsInBhdGgiLCJjbG9zZWQiLCJMaW5lQ3VydmUzIiwiR3JvdXAiLCJvYmplY3RzIiwib2JqIiwiYWRkVG8iLCJPYmplY3QzRCIsIkVsZW1lbnRNb2R1bGUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImJvZHkiLCJjcmVhdGVFbGVtZW50IiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwic2VsZiIsImFwcGVuZENoaWxkIiwiUmVuZGVyaW5nTW9kdWxlIiwiaXNTaGFkb3ciLCJhc3NpZ24iLCJWZWN0b3IyIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImJnQ29sb3IiLCJiZ09wYWNpdHkiLCJyZW5kZXJlciIsInBpeGVsUmF0aW8iLCJyZXNvbHV0aW9uIiwiV2ViR0xSZW5kZXJlciIsImVmZmVjdHMiLCJhcHBseUFkZGl0aW9uYWwiLCJzZXRDbGVhckNvbG9yIiwic2V0UGl4ZWxSYXRpbyIsInNldFNpemUiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwiaXNBcHBsaWVkIiwiYWRkaXRpb25hbCIsInNjZW5lIiwicmVuZGVyTG9vcCIsInJlbmRlciIsImF0dGFjaFRvQ2FudmFzIiwiZWZmZWN0Iiwic2l6ZSIsImdldFNpemUiLCJhcHAiLCJjYW52YXMiLCJkb21FbGVtZW50IiwiZGVmaW5lIiwiaW50ZWdyYXRlUmVuZGVyZXIiLCJ1cGRhdGUiLCJmb3JjZUNvbnRleHRMb3NzIiwic2hhZG93TWFwIiwiU2NlbmVNb2R1bGUiLCJ3aWxsU2NlbmVCZVJlcGxhY2VkIiwiU2NlbmUiLCJzZXRTY2VuZSIsIlJlc2l6ZU1vZHVsZSIsImNhbGxiYWNrcyIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJyZW5kZXJpbmciLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImdldENvbnRhaW5lciIsImdldFJlc29sdXRpb24iLCJhdXRvIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRyaWdnZXIiLCJhZGRBdXRvcmVzaXplIiwiZnJhZ21lbnQiLCJ2ZXJ0ZXgiLCJwb2x5ZmlsbCIsIm1ldGhvZCIsInNob3dXYXJuIiwiUG9zdFByb2Nlc3Nvck1vZHVsZSIsImRlYnVnIiwiY3VycmVudFBhc3MiLCJjb21wb3NlciIsIkVmZmVjdENvbXBvc2VyIiwiZ2V0RGVsdGEiLCJyZXBsYWNlUmVuZGVyZXIiLCJwYXNzIiwiUmVuZGVyUGFzcyIsImFkZFBhc3MiLCJ0ZXh0dXJlSUQiLCJ1bmlmb3JtcyIsIlNoYWRlclBhc3MiLCJwYXNzZXMiLCJib29sIiwicmVuZGVyVG9TY3JlZW4iLCJFdmVudHNQYXRjaE1vZHVsZSIsIm9yaWdpbk9iamVjdCIsImRlc3RPYmplY3QiLCJldmVudHMiLCJldmVudCIsImVtaXQiLCJwYXRjaEV2ZW50cyIsIlZpcnR1YWxNb3VzZU1vZHVsZSIsImdsb2JhbE1vdmVtZW50IiwibW91c2UiLCJyYXljYXN0ZXIiLCJSYXljYXN0ZXIiLCJwcm9qZWN0aW9uUGxhbmUiLCJjdXN0b21YIiwiY3VzdG9tWSIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRYIiwiY2xpZW50WSIsIm5vcm1hbCIsImdldFdvcmxkRGlyZWN0aW9uIiwic2V0RnJvbUNhbWVyYSIsInJlcXVpcmUiLCJvbiIsImV2IiwiZ2xvYmFsWCIsImdsb2JhbFkiLCJwb2ludGVyTG9ja0VsZW1lbnQiLCJtb3ZlbWVudFgiLCJtb3ZlbWVudFkiLCJuZXN0ZWQiLCJpc0hvdmVyZWQiLCJob3ZlcnMiLCJ0cmF2ZXJzZSIsImNoaWxkIiwiaW50ZXJzZWN0T2JqZWN0cyIsImludGVyc2VjdE9iamVjdCIsInBsYW5lIiwicmF5IiwiaW50ZXJzZWN0UGxhbmUiLCJpbnRlcnNlY3Rpb24iLCJDb250cm9sc01vZHVsZSIsImNvbnRyb2xzIiwiYyIsInVwZGF0ZUxvb3AiLCJGb2dNb2R1bGUiLCJ0eXBlIiwiZm9nIiwiRm9nRXhwMiIsImRlbnNpdHkiLCJGb2ciLCJpc0VxdWFsRGVmYXVsdCIsImEiLCJiIiwiZXF1YWxzIiwiU3RhdGVNb2R1bGUiLCJpc0VxdWFsIiwiZXF1YWxDaGVjayIsImFjdGlvbkdlbmVyYXRlIiwiY29uZmlndXJhdGlvbiIsImN1cnJlbnRDb25maWciLCJwcmV2Q29uZmlnIiwiY29uZmlnIiwiZGVmYXVsdCIsInJlcGxhY2VSZWR1Y2VyIiwiY29uZmlncyIsInVwZGF0ZXMiLCJjb25maWdOYW1lIiwidHJ1ZVZhbCIsImZhbHNlVmFsIiwiVGhyZWVPcmJpdENvbnRyb2xzIiwiZXZlbnRIYW5kbGVyIiwibWluRGlzdGFuY2UiLCJtYXhEaXN0YW5jZSIsIkluZmluaXR5IiwibWluWm9vbSIsIm1heFpvb20iLCJtaW5Qb2xhckFuZ2xlIiwibWF4UG9sYXJBbmdsZSIsIm1pbkF6aW11dGhBbmdsZSIsIm1heEF6aW11dGhBbmdsZSIsImVuYWJsZURhbXBpbmciLCJkYW1waW5nRmFjdG9yIiwiZW5hYmxlWm9vbSIsInpvb21TcGVlZCIsImVuYWJsZVJvdGF0ZSIsInJvdGF0ZVNwZWVkIiwiZW5hYmxlUGFuIiwia2V5UGFuU3BlZWQiLCJhdXRvUm90YXRlIiwiYXV0b1JvdGF0ZVNwZWVkIiwiZW5hYmxlS2V5cyIsImtleXMiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkJPVFRPTSIsIm1vdXNlQnV0dG9ucyIsIk9SQklUIiwiTU9VU0UiLCJaT09NIiwiTUlERExFIiwiUEFOIiwidGFyZ2V0MCIsInBvc2l0aW9uMCIsInpvb20wIiwiem9vbSIsImdldFBvbGFyQW5nbGUiLCJzcGhlcmljYWwiLCJwaGkiLCJnZXRBemltdXRoYWxBbmdsZSIsInRoZXRhIiwicmVzZXQiLCJkaXNwYXRjaEV2ZW50IiwiY2hhbmdlRXZlbnQiLCJTVEFURSIsIk5PTkUiLCJvZmZzZXQiLCJxdWF0IiwiUXVhdGVybmlvbiIsInNldEZyb21Vbml0VmVjdG9ycyIsInVwIiwicXVhdEludmVyc2UiLCJpbnZlcnNlIiwibGFzdFBvc2l0aW9uIiwibGFzdFF1YXRlcm5pb24iLCJzdWIiLCJhcHBseVF1YXRlcm5pb24iLCJzZXRGcm9tVmVjdG9yMyIsInJvdGF0ZUxlZnQiLCJnZXRBdXRvUm90YXRpb25BbmdsZSIsInNwaGVyaWNhbERlbHRhIiwibWluIiwibWFrZVNhZmUiLCJwYW5PZmZzZXQiLCJzZXRGcm9tU3BoZXJpY2FsIiwibG9va0F0Iiwiem9vbUNoYW5nZWQiLCJkaXN0YW5jZVRvU3F1YXJlZCIsIkVQUyIsImRvdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkNvbnRleHRNZW51Iiwib25Nb3VzZURvd24iLCJvbk1vdXNlV2hlZWwiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25Ub3VjaE1vdmUiLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VVcCIsIm9uS2V5RG93biIsInN0YXJ0RXZlbnQiLCJlbmRFdmVudCIsIlJPVEFURSIsIkRPTExZIiwiVE9VQ0hfUk9UQVRFIiwiVE9VQ0hfRE9MTFkiLCJUT1VDSF9QQU4iLCJTcGhlcmljYWwiLCJyb3RhdGVTdGFydCIsInJvdGF0ZUVuZCIsInJvdGF0ZURlbHRhIiwicGFuU3RhcnQiLCJwYW5FbmQiLCJwYW5EZWx0YSIsImRvbGx5U3RhcnQiLCJkb2xseUVuZCIsImRvbGx5RGVsdGEiLCJnZXRab29tU2NhbGUiLCJwb3ciLCJyb3RhdGVVcCIsInBhbkxlZnQiLCJvYmplY3RNYXRyaXgiLCJzZXRGcm9tTWF0cml4Q29sdW1uIiwibXVsdGlwbHlTY2FsYXIiLCJwYW5VcCIsInBhbiIsImRlbHRhWCIsImRlbHRhWSIsInRhcmdldERpc3RhbmNlIiwidGFuIiwiY2xpZW50SGVpZ2h0IiwibWF0cml4IiwiY2xpZW50V2lkdGgiLCJkb2xseUluIiwiZG9sbHlTY2FsZSIsImRvbGx5T3V0IiwiaGFuZGxlTW91c2VEb3duUm90YXRlIiwiaGFuZGxlTW91c2VEb3duRG9sbHkiLCJoYW5kbGVNb3VzZURvd25QYW4iLCJoYW5kbGVNb3VzZU1vdmVSb3RhdGUiLCJzdWJWZWN0b3JzIiwiaGFuZGxlTW91c2VNb3ZlRG9sbHkiLCJoYW5kbGVNb3VzZU1vdmVQYW4iLCJoYW5kbGVNb3VzZVVwIiwiaGFuZGxlTW91c2VXaGVlbCIsImhhbmRsZUtleURvd24iLCJrZXlDb2RlIiwiaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiaGFuZGxlVG91Y2hTdGFydERvbGx5IiwiZHgiLCJkeSIsInNxcnQiLCJoYW5kbGVUb3VjaFN0YXJ0UGFuIiwiaGFuZGxlVG91Y2hNb3ZlUm90YXRlIiwiaGFuZGxlVG91Y2hNb3ZlRG9sbHkiLCJoYW5kbGVUb3VjaE1vdmVQYW4iLCJoYW5kbGVUb3VjaEVuZCIsInByZXZlbnREZWZhdWx0IiwiYnV0dG9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRXZlbnREaXNwYXRjaGVyIiwiT3JiaXRDb250cm9sc01vZHVsZSIsImZvbGxvdyIsInVwZGF0ZVByb2Nlc3NvciIsInNldENvbnRyb2xzIiwic2V0VXBkYXRlIiwiRHluYW1pY0dlb21ldHJ5TW9kdWxlIiwiZ18iLCJ1cGRhdGVQYXJhbXMiLCJUZXh0dXJlTG9hZGVyIiwiVGV4dHVyZU1vZHVsZSIsInRleHR1cmVzIiwidGV4dHVyZSIsInJlcGVhdCIsIlJlcGVhdFdyYXBwaW5nIiwibWFwcGluZyIsIlVWTWFwcGluZyIsImZpeCIsInRleCIsIndyYXBTIiwid3JhcFQiLCJtYWdGaWx0ZXIiLCJOZWFyZXN0RmlsdGVyIiwibWluRmlsdGVyIiwiTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyIiwiQW5pbWF0aW9uTW9kdWxlIiwiaXNEZWZlcnJlZCIsInNrZWxldG9uIiwibWl4ZXIiLCJBbmltYXRpb25NaXhlciIsImNsaXBzIiwiYW5pbWF0aW9ucyIsImNsaXBOYW1lIiwiY2xpcCIsIkFuaW1hdGlvbkNsaXAiLCJmaW5kQnlOYW1lIiwiY2xpcEFjdGlvbiIsInBsYXkiLCJzcGVlZCIsIkRlZmluZU1vZHVsZSIsIk1vZGVsIiwiQ2FtZXJhTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7QUFBTyxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsTUFBRCxFQUEyQjtvQ0FBZkMsVUFBZTtjQUFBOzs7Ozs7Ozs7eUJBQ3ZCQSxVQUF4Qiw4SEFBb0M7VUFBekJDLFNBQXlCOzs7OztVQUk5QixDQUFDQSxTQUFMLEVBQ0UsU0FMZ0M7Ozs7Ozs7OEJBT2ZDLE9BQU9DLG1CQUFQLENBQTJCRixTQUEzQixDQUFuQixtSUFBMEQ7Y0FBL0NHLElBQStDOztjQUNwREwsT0FBT0ssSUFBUCxNQUFpQkMsU0FBakIsSUFBOEJKLFVBQVVHLElBQVYsQ0FBOUIsSUFDQ0wsT0FBT0ssSUFBUCxFQUFhRSxRQUFiLE9BQTRCLGlCQUQ3QixJQUVDTCxVQUFVRyxJQUFWLEVBQWdCRSxRQUFoQixPQUErQixpQkFGcEMsRUFFdUQ7O2dCQUVqREwsVUFBVUcsSUFBVixFQUFnQkcsV0FBaEIsS0FBZ0NMLE1BQXBDLEVBQTRDSixPQUFPQyxPQUFPSyxJQUFQLENBQVAsRUFBcUJILFVBQVVHLElBQVYsQ0FBckIsRUFBNUMsS0FDS0wsT0FBT0ssSUFBUCxJQUFlSCxVQUFVRyxJQUFWLENBQWY7V0FMUCxNQU9FTCxPQUFPSyxJQUFQLElBQWUsT0FBT0wsT0FBT0ssSUFBUCxDQUFQLEtBQXdCLFdBQXhCLEdBQXNDSCxVQUFVRyxJQUFWLENBQXRDLEdBQXdETCxPQUFPSyxJQUFQLENBQXZFOztjQUVFLE9BQU9MLE9BQU9LLElBQVAsQ0FBUCxLQUF3QixXQUF4QixJQUF1Q0ksTUFBTUMsT0FBTixDQUFjUixVQUFVRyxJQUFWLENBQWQsQ0FBM0MsRUFBMkVMLE9BQU9LLElBQVAsSUFBZUgsVUFBVUcsSUFBVixFQUFnQk0sS0FBaEIsRUFBZixDQUEzRTtlQUNLLElBQUksT0FBT1gsT0FBT0ssSUFBUCxDQUFQLEtBQXdCLFdBQXhCLElBQXVDSSxNQUFNQyxPQUFOLENBQWNSLFVBQVVH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
