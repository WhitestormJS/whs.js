/*! Physics module "Ammonext" v0.0.1-dev.1 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("THREE"), require("WHS"));
	else if(typeof define === 'function' && define.amd)
		define(["THREE", "WHS"], factory);
	else if(typeof exports === 'object')
		exports["PHYSICS"] = factory(require("THREE"), require("WHS"));
	else
		root["PHYSICS"] = factory(root["THREE"], root["WHS"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_123__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 124);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _defineProperty = __webpack_require__(72);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var store      = __webpack_require__(31)('wks')
  , uid        = __webpack_require__(21)
  , Symbol     = __webpack_require__(6).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ },
/* 4 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_three__);
/* unused harmony export api */
/* unused harmony export properties */
/* harmony export (immutable) */ exports["c"] = wrapPhysicsPrototype;
/* harmony export (immutable) */ exports["a"] = onCopy;
/* harmony export (immutable) */ exports["b"] = onWrap;



var api = {
  // get mass() {
  //   return this._physijs.mass;
  // }

  // set mass(mass) {
  //   this._physijs.mass = mass;
  //   if (this.manager.get('module:world')) this.manager.get('module:world').execute('updateMass', {id: this._physijs.id, mass});
  // }

  applyCentralImpulse: function applyCentralImpulse(force) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('applyCentralImpulse', { id: this._physijs.id, x: force.x, y: force.y, z: force.z });
  },
  applyImpulse: function applyImpulse(force, offset) {
    if (this.manager.has('module:world')) {
      this.manager.get('module:world').execute('applyImpulse', {
        id: this._physijs.id,
        impulse_x: force.x,
        impulse_y: force.y,
        impulse_z: force.z,
        x: offset.x,
        y: offset.y,
        z: offset.z
      });
    }
  },
  applyTorque: function applyTorque(force) {
    if (this.manager.has('module:world')) {
      this.manager.get('module:world').execute('applyTorque', {
        id: this._physijs.id,
        torque_x: force.x,
        torque_y: force.y,
        torque_z: force.z
      });
    }
  },
  applyCentralForce: function applyCentralForce(force) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('applyCentralForce', { id: this._physijs.id, x: force.x, y: force.y, z: force.z });
  },
  applyForce: function applyForce(force, offset) {
    if (this.manager.has('module:world')) {
      this.manager.get('module:world').execute('applyForce', {
        id: this._physijs.id,
        force_x: force.x,
        force_y: force.y,
        force_z: force.z,
        x: offset.x,
        y: offset.y,
        z: offset.z
      });
    }
  },
  getAngularVelocity: function getAngularVelocity() {
    return this._physijs.angularVelocity;
  },
  setAngularVelocity: function setAngularVelocity(velocity) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('setAngularVelocity', { id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z });
  },
  getLinearVelocity: function getLinearVelocity() {
    return this._physijs.linearVelocity;
  },
  setLinearVelocity: function setLinearVelocity(velocity) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('setLinearVelocity', { id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z });
  },
  setAngularFactor: function setAngularFactor(factor) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('setAngularFactor', { id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z });
  },
  setLinearFactor: function setLinearFactor(factor) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('setLinearFactor', { id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z });
  },
  setDamping: function setDamping(linear, angular) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('setDamping', { id: this._physijs.id, linear: linear, angular: angular });
  },
  setCcdMotionThreshold: function setCcdMotionThreshold(threshold) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('setCcdMotionThreshold', { id: this._physijs.id, threshold: threshold });
  },
  setCcdSweptSphereRadius: function setCcdSweptSphereRadius(radius) {
    if (this.manager.has('module:world')) this.manager.get('module:world').execute('setCcdSweptSphereRadius', { id: this._physijs.id, radius: radius });
  }
};

var properties = {
  position: {
    get: function get() {
      return this._native.position;
    },
    set: function set(vector3) {
      var pos = this._native.position;
      var scope = this;

      Object.defineProperties(pos, {
        x: {
          get: function get() {
            return this._x;
          },
          set: function set(x) {
            scope.__dirtyPosition = true;
            this._x = x;
          }
        },
        y: {
          get: function get() {
            return this._y;
          },
          set: function set(y) {
            scope.__dirtyPosition = true;
            this._y = y;
          }
        },
        z: {
          get: function get() {
            return this._z;
          },
          set: function set(z) {
            scope.__dirtyPosition = true;
            this._z = z;
          }
        }
      });

      scope.__dirtyPosition = true;

      pos.copy(vector3);
    }
  },

  quaternion: {
    get: function get() {
      this.__c_rot = true;
      return this.native.quaternion;
    },
    set: function set(quaternion) {
      var _this = this;

      var quat = this._native.quaternion,
          native = this._native;

      quat.copy(quaternion);

      quat.onChange(function () {
        if (_this.__c_rot) {
          if (native.__dirtyRotation === true) {
            _this.__c_rot = false;
            native.__dirtyRotation = false;
          }
          native.__dirtyRotation = true;
        }
      });
    }
  },

  rotation: {
    get: function get() {
      this.__c_rot = true;
      return this._native.rotation;
    },
    set: function set(euler) {
      var _this2 = this;

      var rot = this._native.rotation,
          native = this._native;

      this.quaternion.copy(new __WEBPACK_IMPORTED_MODULE_1_three__["Quaternion"]().setFromEuler(euler));

      rot.onChange(function () {
        if (_this2.__c_rot) {
          _this2.quaternion.copy(new __WEBPACK_IMPORTED_MODULE_1_three__["Quaternion"]().setFromEuler(rot));
          native.__dirtyRotation = true;
        }
      });
    }
  }
};

function wrapPhysicsPrototype(scope) {
  for (var key in api) {
    scope[key] = api[key].bind(scope);
  }

  for (var _key in properties) {
    Object.defineProperty(scope, _key, {
      get: properties[_key].get.bind(scope),
      set: properties[_key].set.bind(scope),
      configurable: true,
      enumerable: true
    });
  }
}

function onCopy(source) {
  wrapPhysicsPrototype(this);
  this._physijs = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, source._physijs);
  this.position = this.position.clone();
  this.rotation = this.rotation.clone();
  this.quaternion = this.quaternion.clone();
}

function onWrap() {
  this.position = this.position.clone();
  this.rotation = this.rotation.clone();
  this.quaternion = this.quaternion.clone();
}

/***/ },
/* 6 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(42)
  , toPrimitive    = __webpack_require__(34)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return getEulerXYZFromQuaternion; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return getQuatertionFromEuler; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return temp1Quat; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return addObjectChildren; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return MESSAGE_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(exports, "f", function() { return REPORT_ITEMSIZE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "g", function() { return COLLISIONREPORT_ITEMSIZE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "h", function() { return VEHICLEREPORT_ITEMSIZE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "i", function() { return CONSTRAINTREPORT_ITEMSIZE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "j", function() { return temp1Vector3; });
/* harmony export (binding) */ __webpack_require__.d(exports, "k", function() { return temp2Vector3; });
/* harmony export (binding) */ __webpack_require__.d(exports, "l", function() { return temp1Matrix4; });
/* harmony export (binding) */ __webpack_require__.d(exports, "m", function() { return convertWorldPositionToObject; });


var MESSAGE_TYPES = {
  WORLDREPORT: 0,
  COLLISIONREPORT: 1,
  VEHICLEREPORT: 2,
  CONSTRAINTREPORT: 3,
  SOFTREPORT: 4
};

var REPORT_ITEMSIZE = 14,
    COLLISIONREPORT_ITEMSIZE = 5,
    VEHICLEREPORT_ITEMSIZE = 9,
    CONSTRAINTREPORT_ITEMSIZE = 6;

var temp1Vector3 = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](),
    temp2Vector3 = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](),
    temp1Matrix4 = new __WEBPACK_IMPORTED_MODULE_0_three__["Matrix4"](),
    temp1Quat = new __WEBPACK_IMPORTED_MODULE_0_three__["Quaternion"]();

var getEulerXYZFromQuaternion = function getEulerXYZFromQuaternion(x, y, z, w) {
  return new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](Math.atan2(2 * (x * w - y * z), w * w - x * x - y * y + z * z), Math.asin(2 * (x * z + y * w)), Math.atan2(2 * (z * w - x * y), w * w + x * x - y * y - z * z));
};

var getQuatertionFromEuler = function getQuatertionFromEuler(x, y, z) {
  var c1 = Math.cos(y);
  var s1 = Math.sin(y);
  var c2 = Math.cos(-z);
  var s2 = Math.sin(-z);
  var c3 = Math.cos(x);
  var s3 = Math.sin(x);
  var c1c2 = c1 * c2;
  var s1s2 = s1 * s2;

  return {
    w: c1c2 * c3 - s1s2 * s3,
    x: c1c2 * s3 + s1s2 * c3,
    y: s1 * c2 * c3 + c1 * s2 * s3,
    z: c1 * s2 * c3 - s1 * c2 * s3
  };
};

var convertWorldPositionToObject = function convertWorldPositionToObject(position, object) {
  temp1Matrix4.identity(); // reset temp matrix

  // Set the temp matrix's rotation to the object's rotation
  temp1Matrix4.identity().makeRotationFromQuaternion(object.quaternion);

  // Invert rotation matrix in order to "unrotate" a point back to object space
  temp1Matrix4.getInverse(temp1Matrix4);

  // Yay! Temp vars!
  temp1Vector3.copy(position);
  temp2Vector3.copy(object.position);

  // Apply the rotation
  return temp1Vector3.sub(temp2Vector3).applyMatrix4(temp1Matrix4);
};

var addObjectChildren = function addObjectChildren(parent, object) {
  for (var i = 0; i < object.children.length; i++) {
    if (object.children[i]._physijs) {
      object.children[i].updateMatrix();
      object.children[i].updateMatrixWorld();

      temp1Vector3.setFromMatrixPosition(object.children[i].matrixWorld);
      temp1Quat.setFromRotationMatrix(object.children[i].matrixWorld);

      object.children[i]._physijs.position_offset = {
        x: temp1Vector3.x,
        y: temp1Vector3.y,
        z: temp1Vector3.z
      };

      object.children[i]._physijs.rotation = {
        x: temp1Quat.x,
        y: temp1Quat.y,
        z: temp1Quat.z,
        w: temp1Quat.w
      };

      parent._physijs.children.push(object.children[i]._physijs);
    }

    addObjectChildren(parent, object.children[i]);
  }
};



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(6)
  , core      = __webpack_require__(4)
  , ctx       = __webpack_require__(23)
  , hide      = __webpack_require__(14)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ },
/* 11 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(43)
  , defined = __webpack_require__(24);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(19);
module.exports = __webpack_require__(9) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = {};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(47)
  , enumBugKeys = __webpack_require__(25);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 20 */
/***/ function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ },
/* 21 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 22 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(87);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 24 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 25 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = true;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(13)
  , dPs         = __webpack_require__(103)
  , enumBugKeys = __webpack_require__(25)
  , IE_PROTO    = __webpack_require__(30)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(41)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(93).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ },
/* 28 */
/***/ function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(11)
  , TAG = __webpack_require__(3)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(31)('keys')
  , uid    = __webpack_require__(21);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(6)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 32 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

var global         = __webpack_require__(6)
  , core           = __webpack_require__(4)
  , LIBRARY        = __webpack_require__(26)
  , wksExt         = __webpack_require__(36)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Eventable; });


var Eventable = function () {
  function Eventable() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Eventable);

    this._eventListeners = {};
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Eventable, [{
    key: "addEventListener",
    value: function addEventListener(event_name, callback) {
      if (!this._eventListeners.hasOwnProperty(event_name)) this._eventListeners[event_name] = [];

      this._eventListeners[event_name].push(callback);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event_name, callback) {
      var index = void 0;

      if (!this._eventListeners.hasOwnProperty(event_name)) return false;

      if ((index = this._eventListeners[event_name].indexOf(callback)) >= 0) {
        this._eventListeners[event_name].splice(index, 1);
        return true;
      }

      return false;
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event_name) {
      var i = void 0;
      var parameters = Array.prototype.splice.call(arguments, 1);

      if (this._eventListeners.hasOwnProperty(event_name)) {
        for (i = 0; i < this._eventListeners[event_name].length; i++) {
          this._eventListeners[event_name][i].apply(this, parameters);
        }
      }
    }
  }], [{
    key: "make",
    value: function make(obj) {
      obj.prototype.addEventListener = Eventable.prototype.addEventListener;
      obj.prototype.removeEventListener = Eventable.prototype.removeEventListener;
      obj.prototype.dispatchEvent = Eventable.prototype.dispatchEvent;
    }
  }]);

  return Eventable;
}();

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return VehicleTunning; });

var VehicleTunning = function VehicleTunning() {
  var suspension_stiffness = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5.88;
  var suspension_compression = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.83;
  var suspension_damping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.88;
  var max_suspension_travel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
  var friction_slip = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10.5;
  var max_suspension_force = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 6000;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, VehicleTunning);

  this.suspension_stiffness = suspension_stiffness;
  this.suspension_compression = suspension_compression;
  this.suspension_damping = suspension_damping;
  this.max_suspension_travel = max_suspension_travel;
  this.friction_slip = friction_slip;
  this.max_suspension_force = max_suspension_force;
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tunning__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Vehicle; });





var Vehicle = function () {
  function Vehicle(mesh) {
    var tuning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new VehicleTuning();

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Vehicle);

    this.mesh = mesh;
    this.wheels = [];

    this._physijs = {
      id: getObjectId(),
      rigidBody: mesh._physijs.id,
      suspension_stiffness: tuning.suspension_stiffness,
      suspension_compression: tuning.suspension_compression,
      suspension_damping: tuning.suspension_damping,
      max_suspension_travel: tuning.max_suspension_travel,
      friction_slip: tuning.friction_slip,
      max_suspension_force: tuning.max_suspension_force
    };
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Vehicle, [{
    key: 'addWheel',
    value: function addWheel(wheel_geometry, wheel_material, connection_point, wheel_direction, wheel_axle, suspension_rest_length, wheel_radius, is_front_wheel, tuning) {
      var wheel = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](wheel_geometry, wheel_material);

      wheel.castShadow = wheel.receiveShadow = true;
      wheel.position.copy(wheel_direction).multiplyScalar(suspension_rest_length / 100).add(connection_point);

      this.world.add(wheel);
      this.wheels.push(wheel);

      this.world.execute('addWheel', {
        id: this._physijs.id,
        connection_point: { x: connection_point.x, y: connection_point.y, z: connection_point.z },
        wheel_direction: { x: wheel_direction.x, y: wheel_direction.y, z: wheel_direction.z },
        wheel_axle: { x: wheel_axle.x, y: wheel_axle.y, z: wheel_axle.z },
        suspension_rest_length: suspension_rest_length,
        wheel_radius: wheel_radius,
        is_front_wheel: is_front_wheel,
        tuning: tuning
      });
    }
  }, {
    key: 'setSteering',
    value: function setSteering(amount, wheel) {
      if (wheel !== undefined && this.wheels[wheel] !== undefined) this.world.execute('setSteering', { id: this._physijs.id, wheel: wheel, steering: amount });else if (this.wheels.length > 0) {
        for (var i = 0; i < this.wheels.length; i++) {
          this.world.execute('setSteering', { id: this._physijs.id, wheel: i, steering: amount });
        }
      }
    }
  }, {
    key: 'setBrake',
    value: function setBrake(amount, wheel) {
      if (wheel !== undefined && this.wheels[wheel] !== undefined) this.world.execute('setBrake', { id: this._physijs.id, wheel: wheel, brake: amount });else if (this.wheels.length > 0) {
        for (var i = 0; i < this.wheels.length; i++) {
          this.world.execute('setBrake', { id: this._physijs.id, wheel: i, brake: amount });
        }
      }
    }
  }, {
    key: 'applyEngineForce',
    value: function applyEngineForce(amount, wheel) {
      if (wheel !== undefined && this.wheels[wheel] !== undefined) this.world.execute('applyEngineForce', { id: this._physijs.id, wheel: wheel, force: amount });else if (this.wheels.length > 0) {
        for (var i = 0; i < this.wheels.length; i++) {
          this.world.execute('applyEngineForce', { id: this._physijs.id, wheel: i, force: amount });
        }
      }
    }
  }]);

  return Vehicle;
}();

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _iterator = __webpack_require__(75);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(74);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(6).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(15)(function(){
  return Object.defineProperty(__webpack_require__(41)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var LIBRARY        = __webpack_require__(26)
  , $export        = __webpack_require__(10)
  , redefine       = __webpack_require__(48)
  , hide           = __webpack_require__(14)
  , has            = __webpack_require__(11)
  , Iterators      = __webpack_require__(17)
  , $iterCreate    = __webpack_require__(97)
  , setToStringTag = __webpack_require__(29)
  , getPrototypeOf = __webpack_require__(105)
  , ITERATOR       = __webpack_require__(3)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(20)
  , createDesc     = __webpack_require__(19)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(34)
  , has            = __webpack_require__(11)
  , IE8_DOM_DEFINE = __webpack_require__(42)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(47)
  , hiddenKeys = __webpack_require__(25).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(11)
  , toIObject    = __webpack_require__(12)
  , arrayIndexOf = __webpack_require__(89)(false)
  , IE_PROTO     = __webpack_require__(30)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var $at  = __webpack_require__(107)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(44)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "getEulerXYZFromQuaternion", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "getQuatertionFromEuler", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "temp1Quat", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "addObjectChildren", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "MESSAGE_TYPES", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "REPORT_ITEMSIZE", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "COLLISIONREPORT_ITEMSIZE", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "VEHICLEREPORT_ITEMSIZE", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CONSTRAINTREPORT_ITEMSIZE", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "temp1Vector3", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "temp2Vector3", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "temp1Matrix4", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "convertWorldPositionToObject", function() { return __WEBPACK_IMPORTED_MODULE_0__api__["m"]; });
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventable__ = __webpack_require__(37);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Eventable", function() { return __WEBPACK_IMPORTED_MODULE_1__eventable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constraints_index__ = __webpack_require__(57);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ConeTwistConstraint", function() { return __WEBPACK_IMPORTED_MODULE_2__constraints_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "HingeConstraint", function() { return __WEBPACK_IMPORTED_MODULE_2__constraints_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "PointConstraint", function() { return __WEBPACK_IMPORTED_MODULE_2__constraints_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SliderConstraint", function() { return __WEBPACK_IMPORTED_MODULE_2__constraints_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "DOFConstraint", function() { return __WEBPACK_IMPORTED_MODULE_2__constraints_index__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_index__ = __webpack_require__(67);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "WorldModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "BoxModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CapsuleModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ConcaveModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ConvexModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "PlaneModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SphereModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SoftbodyModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ClothModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vehicle_index__ = __webpack_require__(68);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "VehicleTunning", function() { return __WEBPACK_IMPORTED_MODULE_4__vehicle_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Vehicle", function() { return __WEBPACK_IMPORTED_MODULE_4__vehicle_index__["b"]; });






/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ConeTwistConstraint; });




var ConeTwistConstraint = function () {
  function ConeTwistConstraint(obja, objb, position) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ConeTwistConstraint);

    var objecta = obja;
    var objectb = obja;

    if (position === undefined) console.error('Both objects must be defined in a ConeTwistConstraint.');

    this.type = 'conetwist';
    this.appliedImpulse = 0;
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objecta).clone();
    this.objectb = objectb._physijs.id;
    this.positionb = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objectb).clone();
    this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };
    this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ConeTwistConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb,
        axisa: this.axisa,
        axisb: this.axisb
      };
    }
  }, {
    key: 'setLimit',
    value: function setLimit(x, y, z) {
      this.scene.execute('conetwist_setLimit', { constraint: this.id, x: x, y: y, z: z });
    }
  }, {
    key: 'enableMotor',
    value: function enableMotor() {
      this.scene.execute('conetwist_enableMotor', { constraint: this.id });
    }
  }, {
    key: 'setMaxMotorImpulse',
    value: function setMaxMotorImpulse(max_impulse) {
      this.scene.execute('conetwist_setMaxMotorImpulse', { constraint: this.id, max_impulse: max_impulse });
    }
  }, {
    key: 'setMotorTarget',
    value: function setMotorTarget(target) {
      if (target instanceof THREE.Vector3) target = new THREE.Quaternion().setFromEuler(new THREE.Euler(target.x, target.y, target.z));else if (target instanceof THREE.Euler) target = new THREE.Quaternion().setFromEuler(target);else if (target instanceof THREE.Matrix4) target = new THREE.Quaternion().setFromRotationMatrix(target);

      this.scene.execute('conetwist_setMotorTarget', {
        constraint: this.id,
        x: target.x,
        y: target.y,
        z: target.z,
        w: target.w
      });
    }
  }]);

  return ConeTwistConstraint;
}();

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DOFConstraint; });




var DOFConstraint = function () {
  function DOFConstraint(obja, objb, position) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DOFConstraint);

    var objecta = obja;
    var objectb = objb;

    if (position === undefined) {
      position = objectb;
      objectb = undefined;
    }

    this.type = 'dof';
    this.appliedImpulse = 0;
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objecta).clone();
    this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objectb).clone();
      this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
    }
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DOFConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb,
        axisa: this.axisa,
        axisb: this.axisb
      };
    }
  }, {
    key: 'setLinearLowerLimit',
    value: function setLinearLowerLimit(limit) {
      this.scene.execute('dof_setLinearLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setLinearUpperLimit',
    value: function setLinearUpperLimit(limit) {
      this.scene.execute('dof_setLinearUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setAngularLowerLimit',
    value: function setAngularLowerLimit(limit) {
      this.scene.execute('dof_setAngularLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setAngularUpperLimit',
    value: function setAngularUpperLimit(limit) {
      this.scene.execute('dof_setAngularUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'enableAngularMotor',
    value: function enableAngularMotor(which) {
      this.scene.execute('dof_enableAngularMotor', { constraint: this.id, which: which });
    }
  }, {
    key: 'configureAngularMotor',
    value: function configureAngularMotor(which, low_angle, high_angle, velocity, max_force) {
      this.scene.execute('dof_configureAngularMotor', { constraint: this.id, which: which, low_angle: low_angle, high_angle: high_angle, velocity: velocity, max_force: max_force });
    }
  }, {
    key: 'disableAngularMotor',
    value: function disableAngularMotor(which) {
      this.scene.execute('dof_disableAngularMotor', { constraint: this.id, which: which });
    }
  }]);

  return DOFConstraint;
}();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HingeConstraint; });




var HingeConstraint = function () {
  function HingeConstraint(obja, objb, position, axis) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, HingeConstraint);

    var objecta = obja;
    var objectb = objb;

    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'hinge';
    this.appliedImpulse = 0;
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objecta).clone();
    this.position = position.clone();
    this.axis = axis;

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objectb).clone();
    }
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(HingeConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb,
        axis: this.axis
      };
    }
  }, {
    key: 'setLimits',
    value: function setLimits(low, high, bias_factor, relaxation_factor) {
      this.scene.execute('hinge_setLimits', {
        constraint: this.id,
        low: low,
        high: high,
        bias_factor: bias_factor,
        relaxation_factor: relaxation_factor
      });
    }
  }, {
    key: 'enableAngularMotor',
    value: function enableAngularMotor(velocity, acceleration) {
      this.scene.execute('hinge_enableAngularMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableMotor',
    value: function disableMotor() {
      this.scene.execute('hinge_disableMotor', { constraint: this.id });
    }
  }]);

  return HingeConstraint;
}();

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PointConstraint; });




var PointConstraint = function () {
  function PointConstraint(obja, objb, position) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PointConstraint);

    var objecta = obja;
    var objectb = objb;

    if (position === undefined) {
      position = objectb;
      objectb = undefined;
    }

    this.type = 'point';
    this.appliedImpulse = 0;
    this.objecta = objecta._physijs.id;
    this.positiona = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objecta).clone();

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objectb).clone();
    }
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PointConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb
      };
    }
  }]);

  return PointConstraint;
}();

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SliderConstraint; });




var SliderConstraint = function () {
  function SliderConstraint(obja, objb, position, axis) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, SliderConstraint);

    var objecta = obja;
    var objectb = objb;

    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'slider';
    this.appliedImpulse = 0;
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objecta).clone();
    this.axis = axis;

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["m" /* convertWorldPositionToObject */])(position, objectb).clone();
    }
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SliderConstraint, [{
    key: 'getDefinition',
    value: function getDefinition() {
      return {
        type: this.type,
        id: this.id,
        objecta: this.objecta,
        objectb: this.objectb,
        positiona: this.positiona,
        positionb: this.positionb,
        axis: this.axis
      };
    }
  }, {
    key: 'setLimits',
    value: function setLimits(lin_lower, lin_upper, ang_lower, ang_upper) {
      this.scene.execute('slider_setLimits', {
        constraint: this.id,
        lin_lower: lin_lower,
        lin_upper: lin_upper,
        ang_lower: ang_lower,
        ang_upper: ang_upper
      });
    }
  }, {
    key: 'setRestitution',
    value: function setRestitution(linear, angular) {
      this.scene.execute('slider_setRestitution', {
        constraint: this.id,
        linear: linear,
        angular: angular
      });
    }
  }, {
    key: 'enableLinearMotor',
    value: function enableLinearMotor(velocity, acceleration) {
      this.scene.execute('slider_enableLinearMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableLinearMotor',
    value: function disableLinearMotor() {
      this.scene.execute('slider_disableLinearMotor', { constraint: this.id });
    }
  }, {
    key: 'enableAngularMotor',
    value: function enableAngularMotor(velocity, acceleration) {
      this.scene.execute('slider_enableAngularMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableAngularMotor',
    value: function disableAngularMotor() {
      this.scene.execute('slider_disableAngularMotor', { constraint: this.id });
    }
  }]);

  return SliderConstraint;
}();

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConeTwistConstraint__ = __webpack_require__(52);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ConeTwistConstraint__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HingeConstraint__ = __webpack_require__(54);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__HingeConstraint__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PointConstraint__ = __webpack_require__(55);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__PointConstraint__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SliderConstraint__ = __webpack_require__(56);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__SliderConstraint__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DOFConstraint__ = __webpack_require__(53);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__DOFConstraint__["a"]; });






/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BoxModule; });





var BoxModule = function () {
  function BoxModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, BoxModule);

    this.bridge = {
      geometry: function geometry(_geometry) {
        if (!_geometry.boundingBox) _geometry.computeBoundingBox();

        this._physijs.width = _geometry.boundingBox.max.x - _geometry.boundingBox.min.x;
        this._physijs.height = _geometry.boundingBox.max.y - _geometry.boundingBox.min.y;
        this._physijs.depth = _geometry.boundingBox.max.z - _geometry.boundingBox.min.z;

        return _geometry;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      mass: 10,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1),
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      margin: 0
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(BoxModule, [{
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'box',
        mass: params.mass,
        touches: [],
        linearVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        angularVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        group: params.group,
        mask: params.mask,
        friction: params.friction,
        restitution: params.restitution,
        damping: params.damping,
        scale: params.scale,
        margin: params.margin
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return BoxModule;
}();

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CapsuleModule; });





var CapsuleModule = function () {
  function CapsuleModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CapsuleModule);

    this.bridge = {
      geometry: function geometry(_geometry) {
        if (!_geometry.boundingBox) _geometry.computeBoundingBox();

        this._physijs.width = _geometry.boundingBox.max.x - _geometry.boundingBox.min.x;
        this._physijs.height = _geometry.boundingBox.max.y - _geometry.boundingBox.min.y;
        this._physijs.depth = _geometry.boundingBox.max.z - _geometry.boundingBox.min.z;

        return _geometry;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      mass: 10,
      height: 3,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1),
      radius: 3,
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      margin: 0
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CapsuleModule, [{
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'capsule',
        radius: Math.max(params.width / 2, params.depth / 2),
        height: params.height,
        friction: params.friction,
        restitution: params.restitution,
        damping: params.damping,
        margin: params.margin,
        scale: params.scale,
        mass: params.mass
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return CapsuleModule;
}();

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ClothModule; });





var ClothModule = function () {
  function ClothModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ClothModule);

    this.bridge = {
      geometry: function geometry(_geometry, self) {
        var geomParams = _geometry.parameters;

        var geom = _geometry instanceof __WEBPACK_IMPORTED_MODULE_2_three__["BufferGeometry"] ? _geometry : function () {
          _geometry.mergeVertices();

          var bufferGeometry = new __WEBPACK_IMPORTED_MODULE_2_three__["BufferGeometry"]();

          bufferGeometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_2_three__["BufferAttribute"](new Float32Array(_geometry.vertices.length * 3), 3).copyVector3sArray(_geometry.vertices));

          var faces = _geometry.faces,
              facesLength = faces.length;
          var normalsArray = new Float32Array(facesLength * 3);

          for (var i = 0; i < facesLength; i++) {
            var i3 = i * 3;
            var normal = faces[i].normal || new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"]();

            normalsArray[i3] = normal.x;
            normalsArray[i3 + 1] = normal.y;
            normalsArray[i3 + 2] = normal.z;
          }

          bufferGeometry.addAttribute('normal', new __WEBPACK_IMPORTED_MODULE_2_three__["BufferAttribute"](normalsArray, 3));

          bufferGeometry.setIndex(new __WEBPACK_IMPORTED_MODULE_2_three__["BufferAttribute"](new (facesLength * 3 > 65535 ? Uint32Array : Uint16Array)(facesLength * 3), 1).copyIndicesArray(faces));

          return bufferGeometry;
        }();

        var verts = geom.attributes.position.array;

        if (!geomParams.widthSegments) geomParams.widthSegments = 1;
        if (!geomParams.heightSegments) geomParams.heightSegments = 1;

        var idx00 = 0;
        var idx01 = geomParams.widthSegments;
        var idx10 = (geomParams.heightSegments + 1) * (geomParams.widthSegments + 1) - (geomParams.widthSegments + 1);
        var idx11 = verts.length / 3 - 1;

        this._physijs.corners = [verts[idx01 * 3], verts[idx01 * 3 + 1], verts[idx01 * 3 + 2], //   ╗
        verts[idx00 * 3], verts[idx00 * 3 + 1], verts[idx00 * 3 + 2], // ╔
        verts[idx11 * 3], verts[idx11 * 3 + 1], verts[idx11 * 3 + 2], //       ╝
        verts[idx10 * 3], verts[idx10 * 3 + 1], verts[idx10 * 3 + 2]];

        this._physijs.segments = [geomParams.widthSegments + 1, geomParams.heightSegments + 1];

        return geom;
      },

      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      friction: 0.8,
      damping: 0,
      margin: 0,
      klst: 0.9,
      kvst: 0.9,
      kast: 0.9,
      piterations: 1,
      viterations: 0,
      diterations: 0,
      citerations: 4,
      anchorHardness: 0.7,
      rigidHardness: 1
    }, params);
  }

  // appendAnchor(world, object, node, influence, collisionBetweenLinkedBodies = true) {
  //   const o1 = this._physijs.id;
  //   const o2 = object._physijs.id;
  //
  //   world.execute('appendAnchor', {
  //     obj: o1,
  //     obj2: o2,
  //     node,
  //     influence,
  //     collisionBetweenLinkedBodies
  //   });
  // }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ClothModule, [{
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'softClothMesh',
        mass: params.mass,
        touches: [],
        isSoftbody: true,
        friction: params.friction,
        damping: params.damping,
        margin: params.margin,
        klst: params.klst,
        kast: params.kast,
        kvst: params.kvst,
        drag: params.drag,
        lift: params.lift,
        piterations: params.piterations,
        viterations: params.viterations,
        diterations: params.diterations,
        citerations: params.citerations,
        anchorHardness: params.anchorHardness,
        rigidHardness: params.rigidHardness,
        scale: params.scale
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return ClothModule;
}();;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ConcaveModule; });





var ConcaveModule = function () {
  function ConcaveModule(params) {
    var _this2 = this;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ConcaveModule);

    this.bridge = {
      geometry: function geometry(_geometry, self) {
        var _this = this;

        if (self.params.path) {
          this.wait(self.geometryLoader);

          self.geometryLoader.then(function (geom) {
            _this._physijs.data = self.geometryProcessor(geom);
          });
        } else {
          this._physijs.data = self.geometryProcessor(_geometry);
        }

        return _geometry;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      mass: 10,
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1),
      margin: 0,
      loader: new __WEBPACK_IMPORTED_MODULE_2_three__["JSONLoader"]()
    }, params);

    if (this.params.path && this.params.loader) {
      this.geometryLoader = new Promise(function (resolve, reject) {
        _this2.params.loader.load(_this2.params.path, resolve, function () {}, reject);
      });
    }
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ConcaveModule, [{
    key: 'geometryProcessor',
    value: function geometryProcessor(geometry) {
      var isBuffer = geometry.type === 'BufferGeometry';

      if (!geometry.boundingBox) geometry.computeBoundingBox();

      var data = isBuffer ? geometry.attributes.position.array : new Float32Array(geometry.faces.length * 9);

      if (!isBuffer) {
        var vertices = geometry.vertices;

        for (var i = 0; i < geometry.faces.length; i++) {
          var face = geometry.faces[i];

          var vA = vertices[face.a];
          var vB = vertices[face.b];
          var vC = vertices[face.c];

          var i9 = i * 9;

          data[i9] = vA.x;
          data[i9 + 1] = vA.y;
          data[i9 + 2] = vA.z;

          data[i9 + 3] = vB.x;
          data[i9 + 4] = vB.y;
          data[i9 + 5] = vB.z;

          data[i9 + 6] = vC.x;
          data[i9 + 7] = vC.y;
          data[i9 + 8] = vC.z;
        }
      }

      return data;
    }
  }, {
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'concave',
        mass: params.mass,
        touches: [],
        linearVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        angularVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        group: params.group,
        mask: params.mask,
        friction: params.friction,
        restitution: params.restitution,
        damping: params.damping,
        margin: params.margin,
        scale: params.scale
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return ConcaveModule;
}();

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ConvexModule; });





var ConvexModule = function () {
  function ConvexModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ConvexModule);

    this.bridge = {
      mesh: function mesh(_mesh) {
        var geometry = _mesh.geometry;

        if (!geometry.boundingBox) geometry.computeBoundingBox();

        var isBuffer = geometry.type === 'BufferGeometry';

        if (!isBuffer) geometry._bufferGeometry = new __WEBPACK_IMPORTED_MODULE_2_three__["BufferGeometry"]().fromGeometry(geometry);

        var data = isBuffer ? geometry.attributes.position.array : geometry._bufferGeometry.attributes.position.array;

        this._physijs.data = data;

        return _mesh;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      mass: 10,
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      margin: 0,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1)
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ConvexModule, [{
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'convex',
        mass: params.mass,
        touches: [],
        linearVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        angularVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        group: params.group,
        mask: params.mask,
        friction: params.friction,
        restitution: params.restitution,
        damping: params.damping,
        margin: params.margin,
        scale: params.scale
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return ConvexModule;
}();

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PlaneModule; });





var PlaneModule = function () {
  function PlaneModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PlaneModule);

    this.bridge = {
      geometry: function geometry(_geometry) {
        if (!_geometry.boundingBox) _geometry.computeBoundingBox();

        this._physijs.width = _geometry.boundingBox.max.x - _geometry.boundingBox.min.x;
        this._physijs.height = _geometry.boundingBox.max.y - _geometry.boundingBox.min.y;
        this._physijs.normal = _geometry.faces[0].normal.clone();

        return _geometry;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      mass: 10,
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      margin: 0,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1)
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PlaneModule, [{
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'plane',
        touches: [],
        linearVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        angularVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        group: params.group,
        mask: params.mask,
        friction: params.friction,
        restitution: params.restitution,
        damping: params.damping,
        margin: params.margin,
        scale: params.scale,
        mass: params.mass
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return PlaneModule;
}();

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SoftbodyModule; });





var SoftbodyModule = function () {
  function SoftbodyModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, SoftbodyModule);

    this.bridge = {
      geometry: function geometry(_geometry, self) {
        var idxGeometry = _geometry instanceof __WEBPACK_IMPORTED_MODULE_2_three__["BufferGeometry"] ? _geometry : function () {
          _geometry.mergeVertices();

          var bufferGeometry = new __WEBPACK_IMPORTED_MODULE_2_three__["BufferGeometry"]();

          bufferGeometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_2_three__["BufferAttribute"](new Float32Array(_geometry.vertices.length * 3), 3).copyVector3sArray(_geometry.vertices));

          bufferGeometry.setIndex(new __WEBPACK_IMPORTED_MODULE_2_three__["BufferAttribute"](new (_geometry.faces.length * 3 > 65535 ? Uint32Array : Uint16Array)(_geometry.faces.length * 3), 1).copyIndicesArray(_geometry.faces));

          return bufferGeometry;
        }();

        var aVertices = idxGeometry.attributes.position.array;
        var aIndices = idxGeometry.index.array;

        this._physijs.aVertices = aVertices;
        this._physijs.aIndices = aIndices;

        var ndxGeometry = new __WEBPACK_IMPORTED_MODULE_2_three__["BufferGeometry"]().fromGeometry(_geometry);

        return ndxGeometry;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      pressure: 100,
      margin: 0,
      klst: 0.9,
      kvst: 0.9,
      kast: 0.9,
      piterations: 1,
      viterations: 0,
      diterations: 0,
      citerations: 4,
      anchorHardness: 0.7,
      rigidHardness: 1
    }, params);
  }

  // createIndexedBufferGeometryFromGeometry(geometry) {
  //   const numVertices = geometry.vertices.length;
  //   const numFaces = geometry.faces.length;
  //   const bufferGeom = new BufferGeometry();
  //   const vertices = new Float32Array(numVertices * 3);
  //   const indices = new (numFaces * 3 > 65535 ? Uint32Array : Uint16Array)(numFaces * 3);

  //   for (let i = 0; i < numVertices; i++) {
  //     const p = geometry.vertices[i];
  //     const i3 = i * 3;

  //     vertices[i3] = p.x;
  //     vertices[i3 + 1] = p.y;
  //     vertices[i3 + 2] = p.z;
  //   }

  //   for (let i = 0; i < numFaces; i++) {
  //     const f = geometry.faces[i];
  //     const i3 = i * 3;

  //     indices[i3] = f.a;
  //     indices[i3 + 1] = f.b;
  //     indices[i3 + 2] = f.c;
  //   }

  //   bufferGeom.setIndex(new BufferAttribute(indices, 1));
  //   bufferGeom.addAttribute('position', new BufferAttribute(vertices, 3));

  //   return bufferGeom;
  // }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SoftbodyModule, [{
    key: 'isEqual',
    value: function isEqual(x1, y1, z1, x2, y2, z2) {
      var delta = 0.000001;

      return Math.abs(x2 - x1) < delta && Math.abs(y2 - y1) < delta && Math.abs(z2 - z1) < delta;
    }

    // appendAnchor(world, object, node, influence, collisionBetweenLinkedBodies = true) {
    //   const o1 = this._physijs.id;
    //   const o2 = object._physijs.id;

    //   world.execute('appendAnchor', {
    //     obj: o1,
    //     obj2: o2,
    //     node,
    //     influence,
    //     collisionBetweenLinkedBodies
    //   });
    // }

  }, {
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'softTrimesh',
        mass: params.mass,
        touches: [],
        friction: params.friction,
        damping: params.damping,
        pressure: params.pressure,
        margin: params.margin,
        klst: params.klst,
        isSoftbody: true,
        kast: params.kast,
        kvst: params.kvst,
        drag: params.drag,
        lift: params.lift,
        piterations: params.piterations,
        viterations: params.viterations,
        diterations: params.diterations,
        citerations: params.citerations,
        anchorHardness: params.anchorHardness,
        rigidHardness: params.rigidHardness
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return SoftbodyModule;
}();

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SphereModule; });





var SphereModule = function () {
  function SphereModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, SphereModule);

    this.bridge = {
      geometry: function geometry(_geometry) {
        if (!_geometry.boundingSphere) _geometry.computeBoundingSphere();
        this._physijs.radius = _geometry.boundingSphere.radius;
        return _geometry;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      mass: 10,
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      pressure: 100,
      margin: 0,
      klst: 0.9,
      kvst: 0.9,
      kast: 0.9,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1)
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SphereModule, [{
    key: 'integrate',
    value: function integrate(params) {
      this._physijs = {
        type: 'sphere',
        touches: [],
        linearVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        angularVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        group: params.group,
        mask: params.mask,
        friction: params.friction,
        restitution: params.restitution,
        damping: params.damping,
        margin: params.margin,
        scale: params.scale,
        mass: params.mass
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return SphereModule;
}();

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_whs__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_whs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_whs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vehicle_vehicle__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__eventable__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return WorldModule; });














var WorldModule = function (_Eventable) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(WorldModule, _Eventable);

  function WorldModule(params) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, WorldModule);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (WorldModule.__proto__ || Object.getPrototypeOf(WorldModule)).call(this));

    _this.bridge = {
      onAdd: function onAdd(component, self) {
        if (component._physijs) return self.defer(self.onAddCallback.bind(self), [component]);
        return;
      },
      onRemove: function onRemove(component, self) {
        if (component._physijs) return self.defer(self.onRemoveCallback.bind(self), [component]);
        return;
      }
    };


    _this.params = Object.assign({
      fixedTimeStep: 1 / 60,
      rateLimit: true,
      ammo: "",
      softbody: false,
      gravity: new __WEBPACK_IMPORTED_MODULE_5_three__["Vector3"](0, -100, 0)
    }, params);

    var start = performance.now();

    _this._worker = new (__webpack_require__(122))();
    _this._worker.transferableMessage = _this._worker.webkitPostMessage || _this._worker.postMessage;

    _this.isLoaded = false;

    _this.loader = new Promise(function (resolve, reject) {
      if (params.wasm) {
        fetch(params.wasm).then(function (response) {
          return response.arrayBuffer();
        }).then(function (buffer) {
          _this.params.wasmBuffer = buffer;

          _this.execute('init', _this.params);
          // console.log("Physics loading time: " + (performance.now() - start) + "ms");
          resolve();
        });
      } else {
        _this.execute('init', _this.params);
        resolve();
      }
    });

    _this.loader.then(function () {
      _this.isLoaded = true;
    });

    _this._materials_ref_counts = {};
    _this._objects = {};
    _this._vehicles = {};
    _this._constraints = {};
    _this._is_simulating = false;
    _this.getObjectId = function () {
      var _id = 1;
      return function () {
        return _id++;
      };
    }();

    var ab = new ArrayBuffer(1);
    _this._worker.transferableMessage(ab, [ab]);
    _this.SUPPORT_TRANSFERABLE = ab.byteLength === 0;

    _this._worker.onmessage = function (event) {
      var _temp = void 0,
          data = event.data;

      if (data instanceof ArrayBuffer && data.byteLength !== 1) // byteLength === 1 is the worker making a SUPPORT_TRANSFERABLE test
        data = new Float32Array(data);

      if (data instanceof Float32Array) {
        // transferable object
        switch (data[0]) {
          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].WORLDREPORT:
            _this._updateScene(data);
            break;

          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].SOFTREPORT:
            _this._updateSoftbodies(data);
            break;

          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].COLLISIONREPORT:
            _this._updateCollisions(data);
            break;

          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].VEHICLEREPORT:
            _this._updateVehicles(data);
            break;

          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].CONSTRAINTREPORT:
            _this._updateConstraints(data);
            break;
          default:
        }
      } else if (data.cmd) {
        // non-transferable object
        switch (data.cmd) {
          case 'objectReady':
            _temp = data.params;
            if (_this._objects[_temp]) _this._objects[_temp].dispatchEvent('ready');
            break;

          case 'worldReady':
            _this.dispatchEvent('ready');
            break;

          case 'ammoLoaded':
            console.log("Physics loading time: " + (performance.now() - start) + "ms");
            break;

          case 'vehicle':
            window.test = data;
            break;

          default:
            // Do nothing, just show the message
            console.debug('Received: ' + data.cmd);
            console.dir(data.params);
            break;
        }
      } else {
        switch (data[0]) {
          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].WORLDREPORT:
            _this._updateScene(data);
            break;

          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].COLLISIONREPORT:
            _this._updateCollisions(data);
            break;

          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].VEHICLEREPORT:
            _this._updateVehicles(data);
            break;

          case __WEBPACK_IMPORTED_MODULE_9__api__["e" /* MESSAGE_TYPES */].CONSTRAINTREPORT:
            _this._updateConstraints(data);
            break;
          default:
        }
      }
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(WorldModule, [{
    key: '_updateScene',
    value: function _updateScene(data) {
      var index = data[1];

      while (index--) {
        var offset = 2 + index * __WEBPACK_IMPORTED_MODULE_9__api__["f" /* REPORT_ITEMSIZE */];
        var object = this._objects[data[offset]];
        var component = object.component;
        var _physijs = component._physijs;

        if (object === null) continue;

        if (component.__dirtyPosition === false) {
          object.position.set(data[offset + 1], data[offset + 2], data[offset + 3]);

          component.__dirtyPosition = false;
        }

        if (component.__dirtyRotation === false) {
          object.quaternion.set(data[offset + 4], data[offset + 5], data[offset + 6], data[offset + 7]);

          component.__dirtyRotation = false;
        }

        _physijs.linearVelocity.set(data[offset + 8], data[offset + 9], data[offset + 10]);

        _physijs.angularVelocity.set(data[offset + 11], data[offset + 12], data[offset + 13]);
      }

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker

      this._is_simulating = false;
      this.dispatchEvent('update');
    }
  }, {
    key: '_updateSoftbodies',
    value: function _updateSoftbodies(data) {
      var index = data[1],
          offset = 2;

      while (index--) {
        var size = data[offset + 1];
        var object = this._objects[data[offset]];
        var _physijs = object.component._physijs;

        if (object === null) continue;

        var attributes = object.geometry.attributes;
        var volumePositions = attributes.position.array;

        var offsetVert = offset + 2;

        if (_physijs.type === "softTrimesh") {
          var volumeNormals = attributes.normal.array;

          for (var i = 0; i < size; i++) {
            var offs = offsetVert + i * 18;

            var x1 = data[offs];
            var y1 = data[offs + 1];
            var z1 = data[offs + 2];

            var nx1 = data[offs + 3];
            var ny1 = data[offs + 4];
            var nz1 = data[offs + 5];

            var x2 = data[offs + 6];
            var y2 = data[offs + 7];
            var z2 = data[offs + 8];

            var nx2 = data[offs + 9];
            var ny2 = data[offs + 10];
            var nz2 = data[offs + 11];

            var x3 = data[offs + 12];
            var y3 = data[offs + 13];
            var z3 = data[offs + 14];

            var nx3 = data[offs + 15];
            var ny3 = data[offs + 16];
            var nz3 = data[offs + 17];

            var i9 = i * 9;

            volumePositions[i9] = x1;
            volumePositions[i9 + 1] = y1;
            volumePositions[i9 + 2] = z1;

            volumePositions[i9 + 3] = x2;
            volumePositions[i9 + 4] = y2;
            volumePositions[i9 + 5] = z2;

            volumePositions[i9 + 6] = x3;
            volumePositions[i9 + 7] = y3;
            volumePositions[i9 + 8] = z3;

            volumeNormals[i9] = nx1;
            volumeNormals[i9 + 1] = ny1;
            volumeNormals[i9 + 2] = nz1;

            volumeNormals[i9 + 3] = nx2;
            volumeNormals[i9 + 4] = ny2;
            volumeNormals[i9 + 5] = nz2;

            volumeNormals[i9 + 6] = nx3;
            volumeNormals[i9 + 7] = ny3;
            volumeNormals[i9 + 8] = nz3;
          }

          attributes.normal.needsUpdate = true;
        } else if (_physijs.type === "softRopeMesh") {
          for (var _i = 0; _i < size; _i++) {
            var _offs = offsetVert + _i * 3;

            var x = data[_offs];
            var y = data[_offs + 1];
            var z = data[_offs + 2];

            volumePositions[_i * 3] = x;
            volumePositions[_i * 3 + 1] = y;
            volumePositions[_i * 3 + 2] = z;
          }
        } else {
          var _volumeNormals = attributes.normal.array;

          for (var _i2 = 0; _i2 < size; _i2++) {
            var _offs2 = offsetVert + _i2 * 6;

            var _x = data[_offs2];
            var _y = data[_offs2 + 1];
            var _z = data[_offs2 + 2];

            var nx = data[_offs2 + 3];
            var ny = data[_offs2 + 4];
            var nz = data[_offs2 + 5];

            volumePositions[_i2 * 3] = _x;
            volumePositions[_i2 * 3 + 1] = _y;
            volumePositions[_i2 * 3 + 2] = _z;

            // FIXME: Normals are pointed to look inside;
            _volumeNormals[_i2 * 3] = nx;
            _volumeNormals[_i2 * 3 + 1] = ny;
            _volumeNormals[_i2 * 3 + 2] = nz;
          }

          attributes.normal.needsUpdate = true;
        }

        attributes.position.needsUpdate = true;

        offset += 2 + size * 18;
      }

      // if (this.SUPPORT_TRANSFERABLE)
      //   this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker

      this._is_simulating = false;
    }
  }, {
    key: '_updateVehicles',
    value: function _updateVehicles(data) {
      var vehicle = void 0,
          wheel = void 0;

      for (var i = 0; i < (data.length - 1) / __WEBPACK_IMPORTED_MODULE_9__api__["h" /* VEHICLEREPORT_ITEMSIZE */]; i++) {
        var offset = 1 + i * __WEBPACK_IMPORTED_MODULE_9__api__["h" /* VEHICLEREPORT_ITEMSIZE */];
        vehicle = this._vehicles[data[offset]];

        if (vehicle === null) continue;

        wheel = vehicle.wheels[data[offset + 1]];

        wheel.position.set(data[offset + 2], data[offset + 3], data[offset + 4]);

        wheel.quaternion.set(data[offset + 5], data[offset + 6], data[offset + 7], data[offset + 8]);
      }

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: '_updateConstraints',
    value: function _updateConstraints(data) {
      var constraint = void 0,
          object = void 0;

      for (var i = 0; i < (data.length - 1) / __WEBPACK_IMPORTED_MODULE_9__api__["i" /* CONSTRAINTREPORT_ITEMSIZE */]; i++) {
        var offset = 1 + i * __WEBPACK_IMPORTED_MODULE_9__api__["i" /* CONSTRAINTREPORT_ITEMSIZE */];
        constraint = this._constraints[data[offset]];
        object = this._objects[data[offset + 1]];

        if (constraint === undefined || object === undefined) continue;

        __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].set(data[offset + 2], data[offset + 3], data[offset + 4]);

        __WEBPACK_IMPORTED_MODULE_9__api__["l" /* temp1Matrix4 */].extractRotation(object.matrix);
        __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].applyMatrix4(__WEBPACK_IMPORTED_MODULE_9__api__["l" /* temp1Matrix4 */]);

        constraint.positiona.addVectors(object.position, __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */]);
        constraint.appliedImpulse = data[offset + 5];
      }

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: '_updateCollisions',
    value: function _updateCollisions(data) {
      /**
       * #TODO
       * This is probably the worst way ever to handle collisions. The inherent evilness is a residual
       * effect from the previous version's evilness which mutated when switching to transferable objects.
       *
       * If you feel inclined to make this better, please do so.
       */

      var collisions = {},
          normal_offsets = {};

      // Build collision manifest
      for (var i = 0; i < data[1]; i++) {
        var offset = 2 + i * __WEBPACK_IMPORTED_MODULE_9__api__["g" /* COLLISIONREPORT_ITEMSIZE */];
        var object = data[offset];
        var object2 = data[offset + 1];

        normal_offsets[object + '-' + object2] = offset + 2;
        normal_offsets[object2 + '-' + object] = -1 * (offset + 2);

        // Register collisions for both the object colliding and the object being collided with
        if (!collisions[object]) collisions[object] = [];
        collisions[object].push(object2);

        if (!collisions[object2]) collisions[object2] = [];
        collisions[object2].push(object);
      }

      // Deal with collisions
      for (var id1 in this._objects) {
        if (!this._objects.hasOwnProperty(id1)) continue;
        var _object = this._objects[id1];
        var component = _object.component;
        var _physijs = component._physijs;
        if (_object === null) continue;

        // If object touches anything, ...
        if (collisions[id1]) {
          // Clean up touches array
          for (var j = 0; j < _physijs.touches.length; j++) {
            if (collisions[id1].indexOf(_physijs.touches[j]) === -1) _physijs.touches.splice(j--, 1);
          }

          // Handle each colliding object
          for (var _j = 0; _j < collisions[id1].length; _j++) {
            var id2 = collisions[id1][_j];
            var _object2 = this._objects[id2];
            var component2 = _object2.component;
            var _physijs2 = component2._physijs;

            if (_object2) {
              // If object was not already touching object2, notify object
              if (_physijs.touches.indexOf(id2) === -1) {
                _physijs.touches.push(id2);

                __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].subVectors(component.getLinearVelocity(), component2.getLinearVelocity());
                var temp1 = __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].clone();

                __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].subVectors(component.getAngularVelocity(), component2.getAngularVelocity());
                var temp2 = __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].clone();

                var normal_offset = normal_offsets[_physijs.id + '-' + _physijs2.id];

                if (normal_offset > 0) {
                  __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].set(-data[normal_offset], -data[normal_offset + 1], -data[normal_offset + 2]);
                } else {
                  normal_offset *= -1;

                  __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */].set(data[normal_offset], data[normal_offset + 1], data[normal_offset + 2]);
                }

                component.emit('collision', _object2, temp1, temp2, __WEBPACK_IMPORTED_MODULE_9__api__["j" /* temp1Vector3 */]);
              }
            }
          }
        } else _physijs.touches.length = 0; // not touching other objects
      }

      this.collisions = collisions;

      if (this.SUPPORT_TRANSFERABLE) this._worker.transferableMessage(data.buffer, [data.buffer]); // Give the typed array back to the worker
    }
  }, {
    key: 'addConstraint',
    value: function addConstraint(constraint, show_marker) {
      constraint.id = this.getObjectId();
      this._constraints[constraint.id] = constraint;
      this.execute('addConstraint', constraint.getDefinition());

      if (show_marker) {
        var marker = void 0;

        switch (constraint.type) {
          case 'point':
            marker = new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_5_three__["SphereGeometry"](1.5), new __WEBPACK_IMPORTED_MODULE_5_three__["MeshNormalMaterial"]());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'hinge':
            marker = new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_5_three__["SphereGeometry"](1.5), new __WEBPACK_IMPORTED_MODULE_5_three__["MeshNormalMaterial"]());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'slider':
            marker = new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_5_three__["BoxGeometry"](10, 1, 1), new __WEBPACK_IMPORTED_MODULE_5_three__["MeshNormalMaterial"]());

            marker.position.copy(constraint.positiona);

            // This rotation isn't right if all three axis are non-0 values
            // TODO: change marker's rotation order to ZYX
            marker.rotation.set(constraint.axis.y, // yes, y and
            constraint.axis.x, // x axis are swapped
            constraint.axis.z);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'conetwist':
            marker = new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_5_three__["SphereGeometry"](1.5), new __WEBPACK_IMPORTED_MODULE_5_three__["MeshNormalMaterial"]());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
            break;

          case 'dof':
            marker = new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_5_three__["SphereGeometry"](1.5), new __WEBPACK_IMPORTED_MODULE_5_three__["MeshNormalMaterial"]());

            marker.position.copy(constraint.positiona);
            this._objects[constraint.objecta].add(marker);
            break;
          default:
        }
      }

      return constraint;
    }
  }, {
    key: 'onSimulationResume',
    value: function onSimulationResume() {
      this.execute('onSimulationResume', {});
    }
  }, {
    key: 'removeConstraint',
    value: function removeConstraint(constraint) {
      if (this._constraints[constraint.id] !== undefined) {
        this.execute('removeConstraint', { id: constraint.id });
        delete this._constraints[constraint.id];
      }
    }
  }, {
    key: 'execute',
    value: function execute(cmd, params) {
      this._worker.postMessage({ cmd: cmd, params: params });
    }
  }, {
    key: 'onAddCallback',
    value: function onAddCallback(component) {
      var object = component.native;
      var _physijs = object._physijs || object.component._physijs;

      if (_physijs) {
        component.manager.addDependency('module:world', this);
        _physijs.id = this.getObjectId();

        if (object instanceof __WEBPACK_IMPORTED_MODULE_7__vehicle_vehicle__["a" /* Vehicle */]) {
          this.onAddCallback(object.mesh);
          this._vehicles[_physijs.id] = object;
          this.execute('addVehicle', _physijs);
        } else {
          component.__dirtyPosition = false;
          component.__dirtyRotation = false;
          this._objects[_physijs.id] = object;

          if (object.children.length) {
            _physijs.children = [];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__api__["d" /* addObjectChildren */])(object, object);
          }

          if (object.material._physijs) {
            if (this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) this._materials_ref_counts[object.material._physijs.id]++;else {
              this.execute('registerMaterial', object.material._physijs);
              _physijs.materialId = object.material._physijs.id;
              this._materials_ref_counts[object.material._physijs.id] = 1;
            }
          }

          // Object starting position + rotation
          _physijs.position = {
            x: object.position.x,
            y: object.position.y,
            z: object.position.z
          };

          _physijs.rotation = {
            x: object.quaternion.x,
            y: object.quaternion.y,
            z: object.quaternion.z,
            w: object.quaternion.w
          };

          if (_physijs.isSoftbody) {
            object.position.set(0, 0, 0);
            object.quaternion.set(0, 0, 0, 1);
          }

          // Check for scaling
          // var mass_scaling = new Vector3(1, 1, 1);

          if (_physijs.width) _physijs.width *= object.scale.x;
          if (_physijs.height) _physijs.height *= object.scale.y;
          if (_physijs.depth) _physijs.depth *= object.scale.z;

          this.execute('addObject', _physijs);
        }

        component.emit('physics:added');
      }
    }
  }, {
    key: 'onRemoveCallback',
    value: function onRemoveCallback(component) {
      var object = component.native;

      if (object instanceof __WEBPACK_IMPORTED_MODULE_7__vehicle_vehicle__["a" /* Vehicle */]) {
        this.execute('removeVehicle', { id: object._physijs.id });
        while (object.wheels.length) {
          this.remove(object.wheels.pop());
        }this.remove(object.mesh);
        this._vehicles[object._physijs.id] = null;
      } else {
        // Mesh.prototype.remove.call(this, object);

        if (object._physijs) {
          component.manager.removeDependency('module:world');
          this._objects[object._physijs.id] = null;
          this.execute('removeObject', { id: object._physijs.id });
        }
      }
      if (object.material && object.material._physijs && this._materials_ref_counts.hasOwnProperty(object.material._physijs.id)) {
        this._materials_ref_counts[object.material._physijs.id]--;

        if (this._materials_ref_counts[object.material._physijs.id] === 0) {
          this.execute('unRegisterMaterial', object.material._physijs);
          this._materials_ref_counts[object.material._physijs.id] = null;
        }
      }
    }
  }, {
    key: 'defer',
    value: function defer(func, args) {
      var _this2 = this;

      return new Promise(function (resolve) {
        if (_this2.isLoaded) {
          func.apply(undefined, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(args));
          resolve();
        } else _this2.loader.then(function () {
          func.apply(undefined, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(args));
          resolve();
        });
      });
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.addDependency('physicsWorker', this._worker);
    }
  }, {
    key: 'integrate',
    value: function integrate(params, self) {
      var _this3 = this;

      // ...

      this.setFixedTimeStep = function (fixedTimeStep) {
        if (fixedTimeStep) self.execute('setFixedTimeStep', fixedTimeStep);
      };

      this.setGravity = function (gravity) {
        if (gravity) self.execute('setGravity', gravity);
      };

      this.simulate = function (timeStep, maxSubSteps) {
        if (self._stats) self._stats.begin();

        if (self._is_simulating) return false;

        self._is_simulating = true;

        for (var object_id in self._objects) {
          if (!self._objects.hasOwnProperty(object_id)) continue;

          var object = self._objects[object_id];
          var component = object.component;
          var _physijs = component._physijs;

          if (object !== null && (component.__dirtyPosition || component.__dirtyRotation)) {
            var update = { id: _physijs.id };

            if (component.__dirtyPosition) {
              update.pos = {
                x: object.position.x,
                y: object.position.y,
                z: object.position.z
              };

              if (_physijs.isSoftbody) object.position.set(0, 0, 0);

              component.__dirtyPosition = false;
            }

            if (component.__dirtyRotation) {
              update.quat = {
                x: object.quaternion.x,
                y: object.quaternion.y,
                z: object.quaternion.z,
                w: object.quaternion.w
              };

              if (_physijs.isSoftbody) object.rotation.set(0, 0, 0);

              component.__dirtyRotation = false;
            }

            self.execute('updateTransform', update);
          }
        }

        self.execute('simulate', { timeStep: timeStep, maxSubSteps: maxSubSteps });

        if (self._stats) self._stats.end();
        return true;
      };

      // const simulateProcess = (t) => {
      //   window.requestAnimationFrame(simulateProcess);

      //   this.simulate(1/60, 1); // delta, 1
      // }

      // simulateProcess();

      self.loader.then(function () {
        new WHS.Loop(function (clock) {
          _this3.simulate(clock.getDelta(), 1); // delta, 1
        }).start(_this3);

        _this3.setGravity(params.gravity);
      });
    }
  }]);

  return WorldModule;
}(__WEBPACK_IMPORTED_MODULE_8__eventable__["a" /* Eventable */]);



/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WorldModule__ = __webpack_require__(66);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__WorldModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BoxModule__ = __webpack_require__(58);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__BoxModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CapsuleModule__ = __webpack_require__(59);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__CapsuleModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ConcaveModule__ = __webpack_require__(61);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__ConcaveModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ConvexModule__ = __webpack_require__(62);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__ConvexModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PlaneModule__ = __webpack_require__(63);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__PlaneModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SphereModule__ = __webpack_require__(65);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__SphereModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SoftbodyModule__ = __webpack_require__(64);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__SoftbodyModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ClothModule__ = __webpack_require__(60);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__ClothModule__["a"]; });




// export * from './coneMesh';

// export * from './cylinderMesh';
// export * from './heightfieldMesh';




// export * from './ropeMesh';

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tunning__ = __webpack_require__(38);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tunning__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vehicle__ = __webpack_require__(39);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__vehicle__["a"]; });



/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _assign = __webpack_require__(70);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
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

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(73);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(71);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(40);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _typeof2 = __webpack_require__(40);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _from = __webpack_require__(69);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(110);
module.exports = __webpack_require__(4).Array.from;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(112);
module.exports = __webpack_require__(4).Object.assign;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(113);
var $Object = __webpack_require__(4).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(114);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(115);
module.exports = __webpack_require__(4).Object.setPrototypeOf;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(117);
__webpack_require__(116);
__webpack_require__(118);
__webpack_require__(119);
module.exports = __webpack_require__(4).Symbol;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(120);
module.exports = __webpack_require__(36).f('iterator');

/***/ },
/* 87 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 88 */
/***/ function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(49)
  , toIndex   = __webpack_require__(108);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22)
  , TAG = __webpack_require__(3)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(19);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18)
  , gOPS    = __webpack_require__(28)
  , pIE     = __webpack_require__(20);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(17)
  , ITERATOR   = __webpack_require__(3)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(22);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var create         = __webpack_require__(27)
  , descriptor     = __webpack_require__(19)
  , setToStringTag = __webpack_require__(29)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(3)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(3)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ },
/* 99 */
/***/ function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(18)
  , toIObject = __webpack_require__(12);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

var META     = __webpack_require__(21)('meta')
  , isObject = __webpack_require__(16)
  , has      = __webpack_require__(11)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(15)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(18)
  , gOPS     = __webpack_require__(28)
  , pIE      = __webpack_require__(20)
  , toObject = __webpack_require__(33)
  , IObject  = __webpack_require__(43)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(15)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(13)
  , getKeys  = __webpack_require__(18);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12)
  , gOPN      = __webpack_require__(46).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(11)
  , toObject    = __webpack_require__(33)
  , IE_PROTO    = __webpack_require__(30)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16)
  , anObject = __webpack_require__(13);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(23)(Function.call, __webpack_require__(45).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(90)
  , ITERATOR  = __webpack_require__(3)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(4).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var ctx            = __webpack_require__(23)
  , $export        = __webpack_require__(10)
  , toObject       = __webpack_require__(33)
  , call           = __webpack_require__(96)
  , isArrayIter    = __webpack_require__(94)
  , toLength       = __webpack_require__(49)
  , createProperty = __webpack_require__(91)
  , getIterFn      = __webpack_require__(109);

$export($export.S + $export.F * !__webpack_require__(98)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var addToUnscopables = __webpack_require__(88)
  , step             = __webpack_require__(99)
  , Iterators        = __webpack_require__(17)
  , toIObject        = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(44)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(10);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(102)});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(27)});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(10);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(106).set});

/***/ },
/* 116 */
/***/ function(module, exports) {



/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// ECMAScript 6 symbols shim
var global         = __webpack_require__(6)
  , has            = __webpack_require__(11)
  , DESCRIPTORS    = __webpack_require__(9)
  , $export        = __webpack_require__(10)
  , redefine       = __webpack_require__(48)
  , META           = __webpack_require__(101).KEY
  , $fails         = __webpack_require__(15)
  , shared         = __webpack_require__(31)
  , setToStringTag = __webpack_require__(29)
  , uid            = __webpack_require__(21)
  , wks            = __webpack_require__(3)
  , wksExt         = __webpack_require__(36)
  , wksDefine      = __webpack_require__(35)
  , keyOf          = __webpack_require__(100)
  , enumKeys       = __webpack_require__(92)
  , isArray        = __webpack_require__(95)
  , anObject       = __webpack_require__(13)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(34)
  , createDesc     = __webpack_require__(19)
  , _create        = __webpack_require__(27)
  , gOPNExt        = __webpack_require__(104)
  , $GOPD          = __webpack_require__(45)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(18)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(46).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(20).f  = $propertyIsEnumerable;
  __webpack_require__(28).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(26)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(35)('asyncIterator');

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(35)('observable');

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(111);
var global        = __webpack_require__(6)
  , hide          = __webpack_require__(14)
  , Iterators     = __webpack_require__(17)
  , TO_STRING_TAG = __webpack_require__(3)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ },
/* 121 */
/***/ function(module, exports) {

// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;
module.exports = function(content, url) {
	try {
		try {
			var blob;
			try { // BlobBuilder = Deprecated, but widely implemented
				var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
				blob = new BlobBuilder();
				blob.append(content);
				blob = blob.getBlob();
			} catch(e) { // The proposed API
				blob = new Blob([content]);
			}
			return new Worker(URL.createObjectURL(blob));
		} catch(e) {
			return new Worker('data:application/javascript,' + encodeURIComponent(content));
		}
	} catch(e) {
		return new Worker(url);
	}
}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function() {
	return __webpack_require__(121)("/*! Physics module \"Ammonext\" v0.0.1-dev.1 */\n/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// identity function for calling harmony imports with the correct context\n/******/ \t__webpack_require__.i = function(value) { return value; };\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports) {\n\n// const Ammo = require('ammonext');\n\nvar transferableMessage = self.webkitPostMessage || self.postMessage,\n\n\n// enum\nMESSAGE_TYPES = {\n  WORLDREPORT: 0,\n  COLLISIONREPORT: 1,\n  VEHICLEREPORT: 2,\n  CONSTRAINTREPORT: 3,\n  SOFTREPORT: 4\n};\n\n// temp variables\nvar _object = void 0,\n    _vector = void 0,\n    _transform = void 0,\n    _transform_pos = void 0,\n    _softbody_enabled = false,\n    last_simulation_duration = 0,\n    _num_objects = 0,\n    _num_rigidbody_objects = 0,\n    _num_softbody_objects = 0,\n    _num_wheels = 0,\n    _num_constraints = 0,\n    _softbody_report_size = 0,\n\n\n// world variables\nfixedTimeStep = void 0,\n    // used when calling stepSimulation\nlast_simulation_time = void 0,\n    world = void 0,\n    _vec3_1 = void 0,\n    _vec3_2 = void 0,\n    _vec3_3 = void 0,\n    _quat = void 0;\n\n// private cache\nvar public_functions = {},\n    _objects = [],\n    _vehicles = [],\n    _constraints = [],\n    _objects_ammo = {},\n    _object_shapes = {},\n\n\n// The following objects are to track objects that ammo.js doesn't clean\n// up. All are cleaned up when they're corresponding body is destroyed.\n// Unfortunately, it's very difficult to get at these objects from the\n// body, so we have to track them ourselves.\n_motion_states = {},\n\n// Don't need to worry about it for cached shapes.\n_noncached_shapes = {},\n\n// A body with a compound shape always has a regular shape as well, so we\n// have track them separately.\n_compound_shapes = {};\n\n// object reporting\nvar REPORT_CHUNKSIZE = void 0,\n    // report array is increased in increments of this chunk size\nworldreport = void 0,\n    softreport = void 0,\n    collisionreport = void 0,\n    vehiclereport = void 0,\n    constraintreport = void 0;\n\nvar WORLDREPORT_ITEMSIZE = 14,\n    // how many float values each reported item needs\nCOLLISIONREPORT_ITEMSIZE = 5,\n    // one float for each object id, and a Vec3 contact normal\nVEHICLEREPORT_ITEMSIZE = 9,\n    // vehicle id, wheel index, 3 for position, 4 for rotation\nCONSTRAINTREPORT_ITEMSIZE = 6; // constraint id, offset object, offset, applied impulse\n\nvar ab = new ArrayBuffer(1);\n\ntransferableMessage(ab, [ab]);\nvar SUPPORT_TRANSFERABLE = ab.byteLength === 0;\n\nvar getShapeFromCache = function getShapeFromCache(cache_key) {\n  if (_object_shapes[cache_key] !== undefined) return _object_shapes[cache_key];\n\n  return null;\n};\n\nvar setShapeCache = function setShapeCache(cache_key, shape) {\n  _object_shapes[cache_key] = shape;\n};\n\nvar createShape = function createShape(description) {\n  var shape = void 0;\n\n  _transform.setIdentity();\n  switch (description.type) {\n    case 'plane':\n      {\n        var cache_key = 'plane_' + description.normal.x + '_' + description.normal.y + '_' + description.normal.z;\n\n        if ((shape = getShapeFromCache(cache_key)) === null) {\n          _vec3_1.setX(description.normal.x);\n          _vec3_1.setY(description.normal.y);\n          _vec3_1.setZ(description.normal.z);\n          shape = new Ammo.btStaticPlaneShape(_vec3_1, 0);\n          setShapeCache(cache_key, shape);\n        }\n\n        break;\n      }\n    case 'box':\n      {\n        var _cache_key = 'box_' + description.width + '_' + description.height + '_' + description.depth;\n\n        if ((shape = getShapeFromCache(_cache_key)) === null) {\n          _vec3_1.setX(description.width / 2);\n          _vec3_1.setY(description.height / 2);\n          _vec3_1.setZ(description.depth / 2);\n          shape = new Ammo.btBoxShape(_vec3_1);\n          setShapeCache(_cache_key, shape);\n        }\n\n        break;\n      }\n    case 'sphere':\n      {\n        var _cache_key2 = 'sphere_' + description.radius;\n\n        if ((shape = getShapeFromCache(_cache_key2)) === null) {\n          shape = new Ammo.btSphereShape(description.radius);\n          setShapeCache(_cache_key2, shape);\n        }\n\n        break;\n      }\n    case 'cylinder':\n      {\n        var _cache_key3 = 'cylinder_' + description.width + '_' + description.height + '_' + description.depth;\n\n        if ((shape = getShapeFromCache(_cache_key3)) === null) {\n          _vec3_1.setX(description.width / 2);\n          _vec3_1.setY(description.height / 2);\n          _vec3_1.setZ(description.depth / 2);\n          shape = new Ammo.btCylinderShape(_vec3_1);\n          setShapeCache(_cache_key3, shape);\n        }\n\n        break;\n      }\n    case 'capsule':\n      {\n        var _cache_key4 = 'capsule_' + description.radius + '_' + description.height;\n\n        if ((shape = getShapeFromCache(_cache_key4)) === null) {\n          // In Bullet, capsule height excludes the end spheres\n          shape = new Ammo.btCapsuleShape(description.radius, description.height - 2 * description.radius);\n          setShapeCache(_cache_key4, shape);\n        }\n\n        break;\n      }\n    case 'cone':\n      {\n        var _cache_key5 = 'cone_' + description.radius + '_' + description.height;\n\n        if ((shape = getShapeFromCache(_cache_key5)) === null) {\n          shape = new Ammo.btConeShape(description.radius, description.height);\n          setShapeCache(_cache_key5, shape);\n        }\n\n        break;\n      }\n    case 'concave':\n      {\n        var triangle_mesh = new Ammo.btTriangleMesh();\n        if (!description.data.length) return false;\n        var data = description.data;\n\n        for (var i = 0; i < data.length / 9; i++) {\n          _vec3_1.setX(data[i * 9]);\n          _vec3_1.setY(data[i * 9 + 1]);\n          _vec3_1.setZ(data[i * 9 + 2]);\n\n          _vec3_2.setX(data[i * 9 + 3]);\n          _vec3_2.setY(data[i * 9 + 4]);\n          _vec3_2.setZ(data[i * 9 + 5]);\n\n          _vec3_3.setX(data[i * 9 + 6]);\n          _vec3_3.setY(data[i * 9 + 7]);\n          _vec3_3.setZ(data[i * 9 + 8]);\n\n          triangle_mesh.addTriangle(_vec3_1, _vec3_2, _vec3_3, false);\n        }\n\n        shape = new Ammo.btBvhTriangleMeshShape(triangle_mesh, true, true);\n\n        _noncached_shapes[description.id] = shape;\n\n        break;\n      }\n    case 'convex':\n      {\n        shape = new Ammo.btConvexHullShape();\n        var _data = description.data;\n\n        for (var _i = 0; _i < _data.length / 3; _i++) {\n          _vec3_1.setX(_data[_i * 3]);\n          _vec3_1.setY(_data[_i * 3 + 1]);\n          _vec3_1.setZ(_data[_i * 3 + 2]);\n\n          shape.addPoint(_vec3_1);\n        }\n\n        _noncached_shapes[description.id] = shape;\n\n        break;\n      }\n    case 'heightfield':\n      {\n        var xpts = description.xpts,\n            ypts = description.ypts,\n            points = description.points,\n            ptr = Ammo._malloc(4 * xpts * ypts);\n\n        for (var _i2 = 0, p = 0, p2 = 0; _i2 < xpts; _i2++) {\n          for (var j = 0; j < ypts; j++) {\n            Ammo.HEAPF32[ptr + p2 >> 2] = points[p];\n\n            p++;\n            p2 += 4;\n          }\n        }\n\n        shape = new Ammo.btHeightfieldTerrainShape(description.xpts, description.ypts, ptr, 1, -description.absMaxHeight, description.absMaxHeight, 2, 'PHY_FLOAT', false);\n\n        _vec3_1.setX(description.xsize / (description.xpts - 1));\n        _vec3_1.setY(description.ysize / (description.ypts - 1));\n        _vec3_1.setZ(1);\n\n        shape.setLocalScaling(_vec3_1);\n        _noncached_shapes[description.id] = shape;\n        break;\n      }\n    default:\n      // Not recognized\n      return;\n  }\n\n  return shape;\n};\n\nvar createSoftBody = function createSoftBody(description) {\n  var body = void 0;\n\n  var softBodyHelpers = new Ammo.btSoftBodyHelpers();\n\n  switch (description.type) {\n    case 'softTrimesh':\n      {\n        if (!description.aVertices.length) return false;\n\n        body = softBodyHelpers.CreateFromTriMesh(world.getWorldInfo(), description.aVertices, description.aIndices, description.aIndices.length / 3, false);\n\n        break;\n      }\n    case 'softClothMesh':\n      {\n        var cr = description.corners;\n\n        body = softBodyHelpers.CreatePatch(world.getWorldInfo(), new Ammo.btVector3(cr[0], cr[1], cr[2]), new Ammo.btVector3(cr[3], cr[4], cr[5]), new Ammo.btVector3(cr[6], cr[7], cr[8]), new Ammo.btVector3(cr[9], cr[10], cr[11]), description.segments[0], description.segments[1], 0, true);\n\n        break;\n      }\n    case 'softRopeMesh':\n      {\n        var data = description.data;\n\n        body = softBodyHelpers.CreateRope(world.getWorldInfo(), new Ammo.btVector3(data[0], data[1], data[2]), new Ammo.btVector3(data[3], data[4], data[5]), data[6] - 1, 0);\n\n        break;\n      }\n    default:\n      // Not recognized\n      return;\n  }\n\n  return body;\n};\n\npublic_functions.init = function () {\n  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  if (params.wasmBuffer) {\n    importScripts(params.ammo);\n\n    self.Ammo = loadAmmoFromBinary(params.wasmBuffer);\n    transferableMessage({ cmd: 'ammoLoaded' });\n    public_functions.makeWorld(params);\n  } else {\n    importScripts(params.ammo);\n    transferableMessage({ cmd: 'ammoLoaded' });\n    public_functions.makeWorld(params);\n  }\n};\n\npublic_functions.makeWorld = function () {\n  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  _transform = new Ammo.btTransform();\n  _transform_pos = new Ammo.btTransform();\n  _vec3_1 = new Ammo.btVector3(0, 0, 0);\n  _vec3_2 = new Ammo.btVector3(0, 0, 0);\n  _vec3_3 = new Ammo.btVector3(0, 0, 0);\n  _quat = new Ammo.btQuaternion(0, 0, 0, 0);\n\n  REPORT_CHUNKSIZE = params.reportsize || 50;\n\n  if (SUPPORT_TRANSFERABLE) {\n    // Transferable messages are supported, take advantage of them with TypedArrays\n    worldreport = new Float32Array(2 + REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE); // message id + # of objects to report + chunk size * # of values per object\n    collisionreport = new Float32Array(2 + REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE); // message id + # of collisions to report + chunk size * # of values per object\n    vehiclereport = new Float32Array(2 + REPORT_CHUNKSIZE * VEHICLEREPORT_ITEMSIZE); // message id + # of vehicles to report + chunk size * # of values per object\n    constraintreport = new Float32Array(2 + REPORT_CHUNKSIZE * CONSTRAINTREPORT_ITEMSIZE); // message id + # of constraints to report + chunk size * # of values per object\n  } else {\n    // Transferable messages are not supported, send data as normal arrays\n    worldreport = [];\n    collisionreport = [];\n    vehiclereport = [];\n    constraintreport = [];\n  }\n\n  worldreport[0] = MESSAGE_TYPES.WORLDREPORT;\n  collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;\n  vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;\n  constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;\n\n  var collisionConfiguration = params.softbody ? new Ammo.btSoftBodyRigidBodyCollisionConfiguration() : new Ammo.btDefaultCollisionConfiguration(),\n      dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),\n      solver = new Ammo.btSequentialImpulseConstraintSolver();\n\n  var broadphase = void 0;\n\n  if (!params.broadphase) params.broadphase = { type: 'dynamic' };\n  // TODO!!!\n  /* if (params.broadphase.type === 'sweepprune') {\r\n    extend(params.broadphase, {\r\n      aabbmin: {\r\n        x: -50,\r\n        y: -50,\r\n        z: -50\r\n      },\r\n        aabbmax: {\r\n        x: 50,\r\n        y: 50,\r\n        z: 50\r\n      },\r\n    });\r\n  }*/\n\n  switch (params.broadphase.type) {\n    case 'sweepprune':\n      _vec3_1.setX(params.broadphase.aabbmin.x);\n      _vec3_1.setY(params.broadphase.aabbmin.y);\n      _vec3_1.setZ(params.broadphase.aabbmin.z);\n\n      _vec3_2.setX(params.broadphase.aabbmax.x);\n      _vec3_2.setY(params.broadphase.aabbmax.y);\n      _vec3_2.setZ(params.broadphase.aabbmax.z);\n\n      broadphase = new Ammo.btAxisSweep3(_vec3_1, _vec3_2);\n\n      break;\n    case 'dynamic':\n    default:\n      broadphase = new Ammo.btDbvtBroadphase();\n      break;\n  }\n\n  world = params.softbody ? new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, new Ammo.btDefaultSoftBodySolver()) : new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);\n  fixedTimeStep = params.fixedTimeStep;\n\n  if (params.softbody) _softbody_enabled = true;\n\n  transferableMessage({ cmd: 'worldReady' });\n};\n\npublic_functions.setFixedTimeStep = function (description) {\n  fixedTimeStep = description;\n};\n\npublic_functions.setGravity = function (description) {\n  _vec3_1.setX(description.x);\n  _vec3_1.setY(description.y);\n  _vec3_1.setZ(description.z);\n  world.setGravity(_vec3_1);\n};\n\npublic_functions.appendAnchor = function (description) {\n  _objects[description.obj].appendAnchor(description.node, _objects[description.obj2], description.collisionBetweenLinkedBodies, description.influence);\n};\n\npublic_functions.addObject = function (description) {\n  var body = void 0,\n      motionState = void 0;\n\n  if (description.type.indexOf('soft') !== -1) {\n    body = createSoftBody(description);\n\n    var sbConfig = body.get_m_cfg();\n\n    if (description.viterations) sbConfig.set_viterations(description.viterations);\n    if (description.piterations) sbConfig.set_piterations(description.piterations);\n    if (description.diterations) sbConfig.set_diterations(description.diterations);\n    if (description.citerations) sbConfig.set_citerations(description.citerations);\n    sbConfig.set_collisions(0x11);\n    sbConfig.set_kDF(description.friction);\n    sbConfig.set_kDP(description.damping);\n    if (description.pressure) sbConfig.set_kPR(description.pressure);\n    if (description.drag) sbConfig.set_kDG(description.drag);\n    if (description.lift) sbConfig.set_kLF(description.lift);\n    if (description.anchorHardness) sbConfig.set_kAHR(description.anchorHardness);\n    if (description.rigidHardness) sbConfig.set_kCHR(description.rigidHardness);\n\n    if (description.klst) body.get_m_materials().at(0).set_m_kLST(description.klst);\n    if (description.kast) body.get_m_materials().at(0).set_m_kAST(description.kast);\n    if (description.kvst) body.get_m_materials().at(0).set_m_kVST(description.kvst);\n\n    Ammo.castObject(body, Ammo.btCollisionObject).getCollisionShape().setMargin(description.margin ? description.margin : 0.1);\n    body.setActivationState(description.state || 4);\n    body.type = 0; // SoftBody.\n    if (description.type === 'softRopeMesh') body.rope = true;\n    if (description.type === 'softClothMesh') body.cloth = true;\n\n    _transform.setIdentity();\n\n    _vec3_1.setX(description.position.x);\n    _vec3_1.setY(description.position.y);\n    _vec3_1.setZ(description.position.z);\n    _transform.setOrigin(_vec3_1);\n\n    _quat.setX(description.rotation.x);\n    _quat.setY(description.rotation.y);\n    _quat.setZ(description.rotation.z);\n    _quat.setW(description.rotation.w);\n    _transform.setRotation(_quat);\n\n    body.transform(_transform);\n\n    body.setTotalMass(description.mass, false);\n    world.addSoftBody(body, 1, -1);\n    if (description.type === 'softTrimesh') _softbody_report_size += body.get_m_faces().size() * 3;else _softbody_report_size += body.get_m_nodes().size() * 3;\n\n    _num_softbody_objects++;\n  } else {\n    var shape = createShape(description);\n\n    if (!shape) return;\n\n    // If there are children then this is a compound shape\n    if (description.children) {\n      var compound_shape = new Ammo.btCompoundShape();\n      compound_shape.addChildShape(_transform, shape);\n\n      for (var i = 0; i < description.children.length; i++) {\n        var _child = description.children[i];\n\n        var trans = new Ammo.btTransform();\n        trans.setIdentity();\n\n        _vec3_1.setX(_child.position_offset.x);\n        _vec3_1.setY(_child.position_offset.y);\n        _vec3_1.setZ(_child.position_offset.z);\n        trans.setOrigin(_vec3_1);\n\n        _quat.setX(_child.rotation.x);\n        _quat.setY(_child.rotation.y);\n        _quat.setZ(_child.rotation.z);\n        _quat.setW(_child.rotation.w);\n        trans.setRotation(_quat);\n\n        shape = createShape(description.children[i]);\n        compound_shape.addChildShape(trans, shape);\n        Ammo.destroy(trans);\n      }\n\n      shape = compound_shape;\n      _compound_shapes[description.id] = shape;\n    }\n\n    _vec3_1.setX(description.scale.x);\n    _vec3_1.setY(description.scale.y);\n    _vec3_1.setZ(description.scale.z);\n\n    shape.setLocalScaling(_vec3_1);\n\n    _vec3_1.setX(0);\n    _vec3_1.setY(0);\n    _vec3_1.setZ(0);\n    shape.calculateLocalInertia(description.mass, _vec3_1);\n\n    _transform.setIdentity();\n\n    _vec3_2.setX(description.position.x);\n    _vec3_2.setY(description.position.y);\n    _vec3_2.setZ(description.position.z);\n    _transform.setOrigin(_vec3_2);\n\n    _quat.setX(description.rotation.x);\n    _quat.setY(description.rotation.y);\n    _quat.setZ(description.rotation.z);\n    _quat.setW(description.rotation.w);\n    _transform.setRotation(_quat);\n\n    motionState = new Ammo.btDefaultMotionState(_transform); // #TODO: btDefaultMotionState supports center of mass offset as second argument - implement\n    var rbInfo = new Ammo.btRigidBodyConstructionInfo(description.mass, motionState, shape, _vec3_1);\n\n    rbInfo.set_m_friction(description.friction);\n    rbInfo.set_m_restitution(description.restitution);\n    rbInfo.set_m_linearDamping(description.damping);\n    rbInfo.set_m_angularDamping(description.damping);\n\n    body = new Ammo.btRigidBody(rbInfo);\n    Ammo.castObject(body, Ammo.btCollisionObject).getCollisionShape().setMargin(description.margin ? description.margin : 0);\n    body.setActivationState(description.state || 4);\n    Ammo.destroy(rbInfo);\n\n    if (typeof description.collision_flags !== 'undefined') body.setCollisionFlags(description.collision_flags);\n\n    if (description.group && description.mask) world.addRigidBody(body, description.group, description.mask);else world.addRigidBody(body);\n    body.type = 1; // RigidBody.\n    _num_rigidbody_objects++;\n  }\n\n  body.activate();\n\n  body.id = description.id;\n  _objects[body.id] = body;\n  _motion_states[body.id] = motionState;\n\n  _objects_ammo[body.a === undefined ? body.ptr : body.a] = body.id;\n  _num_objects++;\n\n  transferableMessage({ cmd: 'objectReady', params: body.id });\n};\n\npublic_functions.addVehicle = function (description) {\n  var vehicle_tuning = new Ammo.btVehicleTuning();\n\n  vehicle_tuning.set_m_suspensionStiffness(description.suspension_stiffness);\n  vehicle_tuning.set_m_suspensionCompression(description.suspension_compression);\n  vehicle_tuning.set_m_suspensionDamping(description.suspension_damping);\n  vehicle_tuning.set_m_maxSuspensionTravelCm(description.max_suspension_travel);\n  vehicle_tuning.set_m_maxSuspensionForce(description.max_suspension_force);\n\n  var vehicle = new Ammo.btRaycastVehicle(vehicle_tuning, _objects[description.rigidBody], new Ammo.btDefaultVehicleRaycaster(world));\n\n  vehicle.tuning = vehicle_tuning;\n  _objects[description.rigidBody].setActivationState(4);\n  vehicle.setCoordinateSystem(0, 1, 2);\n\n  world.addVehicle(vehicle);\n  _vehicles[description.id] = vehicle;\n};\npublic_functions.removeVehicle = function (description) {\n  _vehicles[description.id] = null;\n};\n\npublic_functions.addWheel = function (description) {\n  if (_vehicles[description.id] !== undefined) {\n    var tuning = _vehicles[description.id].tuning;\n    if (description.tuning !== undefined) {\n      tuning = new Ammo.btVehicleTuning();\n      tuning.set_m_suspensionStiffness(description.tuning.suspension_stiffness);\n      tuning.set_m_suspensionCompression(description.tuning.suspension_compression);\n      tuning.set_m_suspensionDamping(description.tuning.suspension_damping);\n      tuning.set_m_maxSuspensionTravelCm(description.tuning.max_suspension_travel);\n      tuning.set_m_maxSuspensionForce(description.tuning.max_suspension_force);\n    }\n\n    _vec3_1.setX(description.connection_point.x);\n    _vec3_1.setY(description.connection_point.y);\n    _vec3_1.setZ(description.connection_point.z);\n\n    _vec3_2.setX(description.wheel_direction.x);\n    _vec3_2.setY(description.wheel_direction.y);\n    _vec3_2.setZ(description.wheel_direction.z);\n\n    _vec3_3.setX(description.wheel_axle.x);\n    _vec3_3.setY(description.wheel_axle.y);\n    _vec3_3.setZ(description.wheel_axle.z);\n\n    _vehicles[description.id].addWheel(_vec3_1, _vec3_2, _vec3_3, description.suspension_rest_length, description.wheel_radius, tuning, description.is_front_wheel);\n  }\n\n  _num_wheels++;\n\n  if (SUPPORT_TRANSFERABLE) {\n    vehiclereport = new Float32Array(1 + _num_wheels * VEHICLEREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )\n    vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;\n  } else vehiclereport = [MESSAGE_TYPES.VEHICLEREPORT];\n};\n\npublic_functions.setSteering = function (details) {\n  if (_vehicles[details.id] !== undefined) _vehicles[details.id].setSteeringValue(details.steering, details.wheel);\n};\n\npublic_functions.setBrake = function (details) {\n  if (_vehicles[details.id] !== undefined) _vehicles[details.id].setBrake(details.brake, details.wheel);\n};\n\npublic_functions.applyEngineForce = function (details) {\n  if (_vehicles[details.id] !== undefined) _vehicles[details.id].applyEngineForce(details.force, details.wheel);\n};\n\npublic_functions.removeObject = function (details) {\n  if (_objects[details.id].type === 0) {\n    _num_softbody_objects--;\n    _softbody_report_size -= _objects[details.id].get_m_nodes().size();\n    world.removeSoftBody(_objects[details.id]);\n  } else if (_objects[details.id].type === 1) {\n    _num_rigidbody_objects--;\n    world.removeRigidBody(_objects[details.id]);\n    Ammo.destroy(_motion_states[details.id]);\n  }\n\n  Ammo.destroy(_objects[details.id]);\n  if (_compound_shapes[details.id]) Ammo.destroy(_compound_shapes[details.id]);\n  if (_noncached_shapes[details.id]) Ammo.destroy(_noncached_shapes[details.id]);\n\n  _objects_ammo[_objects[details.id].a === undefined ? _objects[details.id].a : _objects[details.id].ptr] = null;\n  _objects[details.id] = null;\n  _motion_states[details.id] = null;\n\n  if (_compound_shapes[details.id]) _compound_shapes[details.id] = null;\n  if (_noncached_shapes[details.id]) _noncached_shapes[details.id] = null;\n  _num_objects--;\n};\n\npublic_functions.updateTransform = function (details) {\n  _object = _objects[details.id];\n\n  if (_object.type === 1) {\n    _object.getMotionState().getWorldTransform(_transform);\n\n    if (details.pos) {\n      _vec3_1.setX(details.pos.x);\n      _vec3_1.setY(details.pos.y);\n      _vec3_1.setZ(details.pos.z);\n      _transform.setOrigin(_vec3_1);\n    }\n\n    if (details.quat) {\n      _quat.setX(details.quat.x);\n      _quat.setY(details.quat.y);\n      _quat.setZ(details.quat.z);\n      _quat.setW(details.quat.w);\n      _transform.setRotation(_quat);\n    }\n\n    _object.setWorldTransform(_transform);\n    _object.activate();\n  } else if (_object.type === 0) {\n    // _object.getWorldTransform(_transform);\n\n    if (details.pos) {\n      _vec3_1.setX(details.pos.x);\n      _vec3_1.setY(details.pos.y);\n      _vec3_1.setZ(details.pos.z);\n      _transform.setOrigin(_vec3_1);\n    }\n\n    if (details.quat) {\n      _quat.setX(details.quat.x);\n      _quat.setY(details.quat.y);\n      _quat.setZ(details.quat.z);\n      _quat.setW(details.quat.w);\n      _transform.setRotation(_quat);\n    }\n\n    _object.transform(_transform);\n  }\n};\n\npublic_functions.updateMass = function (details) {\n  // #TODO: changing a static object into dynamic is buggy\n  _object = _objects[details.id];\n\n  // Per http://www.bulletphysics.org/Bullet/phpBB3/viewtopic.php?p=&f=9&t=3663#p13816\n  world.removeRigidBody(_object);\n\n  _vec3_1.setX(0);\n  _vec3_1.setY(0);\n  _vec3_1.setZ(0);\n\n  _object.setMassProps(details.mass, _vec3_1);\n  world.addRigidBody(_object);\n  _object.activate();\n};\n\npublic_functions.applyCentralImpulse = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].applyCentralImpulse(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyImpulse = function (details) {\n  _vec3_1.setX(details.impulse_x);\n  _vec3_1.setY(details.impulse_y);\n  _vec3_1.setZ(details.impulse_z);\n\n  _vec3_2.setX(details.x);\n  _vec3_2.setY(details.y);\n  _vec3_2.setZ(details.z);\n\n  _objects[details.id].applyImpulse(_vec3_1, _vec3_2);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyTorque = function (details) {\n  _vec3_1.setX(details.torque_x);\n  _vec3_1.setY(details.torque_y);\n  _vec3_1.setZ(details.torque_z);\n\n  _objects[details.id].applyTorque(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyCentralForce = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].applyCentralForce(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyForce = function (details) {\n  _vec3_1.setX(details.force_x);\n  _vec3_1.setY(details.force_y);\n  _vec3_1.setZ(details.force_z);\n\n  _vec3_2.setX(details.x);\n  _vec3_2.setY(details.y);\n  _vec3_2.setZ(details.z);\n\n  _objects[details.id].applyForce(_vec3_1, _vec3_2);\n  _objects[details.id].activate();\n};\n\npublic_functions.onSimulationResume = function () {\n  last_simulation_time = Date.now();\n};\n\npublic_functions.setAngularVelocity = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setAngularVelocity(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.setLinearVelocity = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setLinearVelocity(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.setAngularFactor = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setAngularFactor(_vec3_1);\n};\n\npublic_functions.setLinearFactor = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setLinearFactor(_vec3_1);\n};\n\npublic_functions.setDamping = function (details) {\n  _objects[details.id].setDamping(details.linear, details.angular);\n};\n\npublic_functions.setCcdMotionThreshold = function (details) {\n  _objects[details.id].setCcdMotionThreshold(details.threshold);\n};\n\npublic_functions.setCcdSweptSphereRadius = function (details) {\n  _objects[details.id].setCcdSweptSphereRadius(details.radius);\n};\n\npublic_functions.addConstraint = function (details) {\n  var constraint = void 0;\n\n  switch (details.type) {\n\n    case 'point':\n      {\n        if (details.objectb === undefined) {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          constraint = new Ammo.btPoint2PointConstraint(_objects[details.objecta], _vec3_1);\n        } else {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          constraint = new Ammo.btPoint2PointConstraint(_objects[details.objecta], _objects[details.objectb], _vec3_1, _vec3_2);\n        }\n        break;\n      }\n    case 'hinge':\n      {\n        if (details.objectb === undefined) {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          _vec3_2.setX(details.axis.x);\n          _vec3_2.setY(details.axis.y);\n          _vec3_2.setZ(details.axis.z);\n\n          constraint = new Ammo.btHingeConstraint(_objects[details.objecta], _vec3_1, _vec3_2);\n        } else {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          _vec3_3.setX(details.axis.x);\n          _vec3_3.setY(details.axis.y);\n          _vec3_3.setZ(details.axis.z);\n\n          constraint = new Ammo.btHingeConstraint(_objects[details.objecta], _objects[details.objectb], _vec3_1, _vec3_2, _vec3_3, _vec3_3);\n        }\n        break;\n      }\n    case 'slider':\n      {\n        var transformb = void 0;\n        var transforma = new Ammo.btTransform();\n\n        _vec3_1.setX(details.positiona.x);\n        _vec3_1.setY(details.positiona.y);\n        _vec3_1.setZ(details.positiona.z);\n\n        transforma.setOrigin(_vec3_1);\n\n        var rotation = transforma.getRotation();\n        rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);\n        transforma.setRotation(rotation);\n\n        if (details.objectb) {\n          transformb = new Ammo.btTransform();\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          transformb.setOrigin(_vec3_2);\n\n          rotation = transformb.getRotation();\n          rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);\n          transformb.setRotation(rotation);\n\n          constraint = new Ammo.btSliderConstraint(_objects[details.objecta], _objects[details.objectb], transforma, transformb, true);\n        } else {\n          constraint = new Ammo.btSliderConstraint(_objects[details.objecta], transforma, true);\n        }\n\n        constraint.ta = transforma;\n        constraint.tb = transformb;\n\n        Ammo.destroy(transforma);\n        if (transformb !== undefined) Ammo.destroy(transformb);\n\n        break;\n      }\n    case 'conetwist':\n      {\n        var _transforma = new Ammo.btTransform();\n        _transforma.setIdentity();\n\n        var _transformb = new Ammo.btTransform();\n        _transformb.setIdentity();\n\n        _vec3_1.setX(details.positiona.x);\n        _vec3_1.setY(details.positiona.y);\n        _vec3_1.setZ(details.positiona.z);\n\n        _vec3_2.setX(details.positionb.x);\n        _vec3_2.setY(details.positionb.y);\n        _vec3_2.setZ(details.positionb.z);\n\n        _transforma.setOrigin(_vec3_1);\n        _transformb.setOrigin(_vec3_2);\n\n        var _rotation = _transforma.getRotation();\n        _rotation.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);\n        _transforma.setRotation(_rotation);\n\n        _rotation = _transformb.getRotation();\n        _rotation.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);\n        _transformb.setRotation(_rotation);\n\n        constraint = new Ammo.btConeTwistConstraint(_objects[details.objecta], _objects[details.objectb], _transforma, _transformb);\n\n        constraint.setLimit(Math.PI, 0, Math.PI);\n\n        constraint.ta = _transforma;\n        constraint.tb = _transformb;\n\n        Ammo.destroy(_transforma);\n        Ammo.destroy(_transformb);\n\n        break;\n      }\n    case 'dof':\n      {\n        var _transformb2 = void 0;\n\n        var _transforma2 = new Ammo.btTransform();\n        _transforma2.setIdentity();\n\n        _vec3_1.setX(details.positiona.x);\n        _vec3_1.setY(details.positiona.y);\n        _vec3_1.setZ(details.positiona.z);\n\n        _transforma2.setOrigin(_vec3_1);\n\n        var _rotation2 = _transforma2.getRotation();\n        _rotation2.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);\n        _transforma2.setRotation(_rotation2);\n\n        if (details.objectb) {\n          _transformb2 = new Ammo.btTransform();\n          _transformb2.setIdentity();\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          _transformb2.setOrigin(_vec3_2);\n\n          _rotation2 = _transformb2.getRotation();\n          _rotation2.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);\n          _transformb2.setRotation(_rotation2);\n\n          constraint = new Ammo.btGeneric6DofConstraint(_objects[details.objecta], _objects[details.objectb], _transforma2, _transformb2, true);\n        } else {\n          constraint = new Ammo.btGeneric6DofConstraint(_objects[details.objecta], _transforma2, true);\n        }\n\n        constraint.ta = _transforma2;\n        constraint.tb = _transformb2;\n\n        Ammo.destroy(_transforma2);\n        if (_transformb2 !== undefined) Ammo.destroy(_transformb2);\n\n        break;\n      }\n    default:\n      return;\n  }\n\n  world.addConstraint(constraint);\n\n  constraint.a = _objects[details.objecta];\n  constraint.b = _objects[details.objectb];\n\n  constraint.enableFeedback();\n  _constraints[details.id] = constraint;\n  _num_constraints++;\n\n  if (SUPPORT_TRANSFERABLE) {\n    constraintreport = new Float32Array(1 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )\n    constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;\n  } else constraintreport = [MESSAGE_TYPES.CONSTRAINTREPORT];\n};\n\npublic_functions.removeConstraint = function (details) {\n  var constraint = _constraints[details.id];\n\n  if (constraint !== undefined) {\n    world.removeConstraint(constraint);\n    _constraints[details.id] = null;\n    _num_constraints--;\n  }\n};\n\npublic_functions.constraint_setBreakingImpulseThreshold = function (details) {\n  var constraint = _constraints[details.id];\n  if (constraint !== undefind) constraint.setBreakingImpulseThreshold(details.threshold);\n};\n\npublic_functions.simulate = function () {\n  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  if (world) {\n    if (params.timeStep && params.timeStep < fixedTimeStep) params.timeStep = fixedTimeStep;\n\n    params.maxSubSteps = params.maxSubSteps || Math.ceil(params.timeStep / fixedTimeStep); // If maxSubSteps is not defined, keep the simulation fully up to date\n\n    world.stepSimulation(params.timeStep, params.maxSubSteps, fixedTimeStep);\n\n    if (_vehicles.length > 0) reportVehicles();\n    reportCollisions();\n    if (_constraints.length > 0) reportConstraints();\n    reportWorld();\n    if (_softbody_enabled) reportWorld_softbodies();\n  }\n};\n\n// Constraint functions\npublic_functions.hinge_setLimits = function (params) {\n  _constraints[params.constraint].setLimit(params.low, params.high, 0, params.bias_factor, params.relaxation_factor);\n};\n\npublic_functions.hinge_enableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.enableAngularMotor(true, params.velocity, params.acceleration);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.hinge_disableMotor = function (params) {\n  _constraints[params.constraint].enableMotor(false);\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_setLimits = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setLowerLinLimit(params.lin_lower || 0);\n  constraint.setUpperLinLimit(params.lin_upper || 0);\n\n  constraint.setLowerAngLimit(params.ang_lower || 0);\n  constraint.setUpperAngLimit(params.ang_upper || 0);\n};\n\npublic_functions.slider_setRestitution = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setSoftnessLimLin(params.linear || 0);\n  constraint.setSoftnessLimAng(params.angular || 0);\n};\n\npublic_functions.slider_enableLinearMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setTargetLinMotorVelocity(params.velocity);\n  constraint.setMaxLinMotorForce(params.acceleration);\n  constraint.setPoweredLinMotor(true);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_disableLinearMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setPoweredLinMotor(false);\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_enableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setTargetAngMotorVelocity(params.velocity);\n  constraint.setMaxAngMotorForce(params.acceleration);\n  constraint.setPoweredAngMotor(true);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_disableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setPoweredAngMotor(false);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.conetwist_setLimit = function (params) {\n  _constraints[params.constraint].setLimit(params.z, params.y, params.x); // ZYX order\n};\n\npublic_functions.conetwist_enableMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.enableMotor(true);\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.conetwist_setMaxMotorImpulse = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setMaxMotorImpulse(params.max_impulse);\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.conetwist_setMotorTarget = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _quat.setX(params.x);\n  _quat.setY(params.y);\n  _quat.setZ(params.z);\n  _quat.setW(params.w);\n\n  constraint.setMotorTarget(_quat);\n\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.conetwist_disableMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.enableMotor(false);\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.dof_setLinearLowerLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setLinearLowerLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_setLinearUpperLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setLinearUpperLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_setAngularLowerLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setAngularLowerLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_setAngularUpperLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setAngularUpperLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_enableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  var motor = constraint.getRotationalLimitMotor(params.which);\n  motor.set_m_enableMotor(true);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_configureAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint],\n      motor = constraint.getRotationalLimitMotor(params.which);\n\n  motor.set_m_loLimit(params.low_angle);\n  motor.set_m_hiLimit(params.high_angle);\n  motor.set_m_targetVelocity(params.velocity);\n  motor.set_m_maxMotorForce(params.max_force);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_disableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint],\n      motor = constraint.getRotationalLimitMotor(params.which);\n\n  motor.set_m_enableMotor(false);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\nvar reportWorld = function reportWorld() {\n  if (SUPPORT_TRANSFERABLE && worldreport.length < 2 + _num_rigidbody_objects * WORLDREPORT_ITEMSIZE) {\n    worldreport = new Float32Array(2 // message id & # objects in report\n    + Math.ceil(_num_rigidbody_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE // # of values needed * item size\n    );\n\n    worldreport[0] = MESSAGE_TYPES.WORLDREPORT;\n  }\n\n  worldreport[1] = _num_rigidbody_objects; // record how many objects we're reporting on\n\n  {\n    var i = 0,\n        index = _objects.length;\n\n    while (index--) {\n      var object = _objects[index];\n\n      if (object && object.type === 1) {\n        // RigidBodies.\n        // #TODO: we can't use center of mass transform when center of mass can change,\n        //        but getMotionState().getWorldTransform() screws up on objects that have been moved\n        // object.getMotionState().getWorldTransform( transform );\n        // object.getMotionState().getWorldTransform(_transform);\n\n        var transform = object.getCenterOfMassTransform();\n        var origin = transform.getOrigin();\n        var rotation = transform.getRotation();\n\n        // add values to report\n        var offset = 2 + i++ * WORLDREPORT_ITEMSIZE;\n\n        worldreport[offset] = object.id;\n\n        worldreport[offset + 1] = origin.x();\n        worldreport[offset + 2] = origin.y();\n        worldreport[offset + 3] = origin.z();\n\n        worldreport[offset + 4] = rotation.x();\n        worldreport[offset + 5] = rotation.y();\n        worldreport[offset + 6] = rotation.z();\n        worldreport[offset + 7] = rotation.w();\n\n        _vector = object.getLinearVelocity();\n        worldreport[offset + 8] = _vector.x();\n        worldreport[offset + 9] = _vector.y();\n        worldreport[offset + 10] = _vector.z();\n\n        _vector = object.getAngularVelocity();\n        worldreport[offset + 11] = _vector.x();\n        worldreport[offset + 12] = _vector.y();\n        worldreport[offset + 13] = _vector.z();\n      }\n    }\n  }\n\n  if (SUPPORT_TRANSFERABLE) transferableMessage(worldreport.buffer, [worldreport.buffer]);else transferableMessage(worldreport);\n};\n\nvar reportWorld_softbodies = function reportWorld_softbodies() {\n  // TODO: Add SUPPORTTRANSFERABLE.\n\n  softreport = new Float32Array(2 // message id & # objects in report\n  + _num_softbody_objects * 2 + _softbody_report_size * 6);\n\n  softreport[0] = MESSAGE_TYPES.SOFTREPORT;\n  softreport[1] = _num_softbody_objects; // record how many objects we're reporting on\n\n  {\n    var offset = 2,\n        index = _objects.length;\n\n    while (index--) {\n      var object = _objects[index];\n\n      if (object && object.type === 0) {\n        // SoftBodies.\n\n        softreport[offset] = object.id;\n\n        var offsetVert = offset + 2;\n\n        if (object.rope === true) {\n          var nodes = object.get_m_nodes();\n          var size = nodes.size();\n          softreport[offset + 1] = size;\n\n          for (var i = 0; i < size; i++) {\n            var node = nodes.at(i);\n            var vert = node.get_m_x();\n            var off = offsetVert + i * 3;\n\n            softreport[off] = vert.x();\n            softreport[off + 1] = vert.y();\n            softreport[off + 2] = vert.z();\n          }\n\n          offset += size * 6 + 2;\n        } else if (object.cloth) {\n          var _nodes = object.get_m_nodes();\n          var _size = _nodes.size();\n          softreport[offset + 1] = _size;\n\n          for (var _i3 = 0; _i3 < _size; _i3++) {\n            var _node = _nodes.at(_i3);\n            var _vert = _node.get_m_x();\n            var normal = _node.get_m_n();\n            var _off = offsetVert + _i3 * 6;\n\n            softreport[_off] = _vert.x();\n            softreport[_off + 1] = _vert.y();\n            softreport[_off + 2] = _vert.z();\n\n            softreport[_off + 3] = normal.x();\n            softreport[_off + 4] = normal.y();\n            softreport[_off + 5] = normal.z();\n          }\n\n          offset += _size * 6 + 2;\n        } else {\n          var faces = object.get_m_faces();\n          var _size2 = faces.size();\n          softreport[offset + 1] = _size2;\n\n          for (var _i4 = 0; _i4 < _size2; _i4++) {\n            var face = faces.at(_i4);\n\n            var node1 = face.get_m_n(0);\n            var node2 = face.get_m_n(1);\n            var node3 = face.get_m_n(2);\n\n            var vert1 = node1.get_m_x();\n            var vert2 = node2.get_m_x();\n            var vert3 = node3.get_m_x();\n\n            var normal1 = node1.get_m_n();\n            var normal2 = node2.get_m_n();\n            var normal3 = node3.get_m_n();\n\n            var _off2 = offsetVert + _i4 * 18;\n\n            softreport[_off2] = vert1.x();\n            softreport[_off2 + 1] = vert1.y();\n            softreport[_off2 + 2] = vert1.z();\n\n            softreport[_off2 + 3] = normal1.x();\n            softreport[_off2 + 4] = normal1.y();\n            softreport[_off2 + 5] = normal1.z();\n\n            softreport[_off2 + 6] = vert2.x();\n            softreport[_off2 + 7] = vert2.y();\n            softreport[_off2 + 8] = vert2.z();\n\n            softreport[_off2 + 9] = normal2.x();\n            softreport[_off2 + 10] = normal2.y();\n            softreport[_off2 + 11] = normal2.z();\n\n            softreport[_off2 + 12] = vert3.x();\n            softreport[_off2 + 13] = vert3.y();\n            softreport[_off2 + 14] = vert3.z();\n\n            softreport[_off2 + 15] = normal3.x();\n            softreport[_off2 + 16] = normal3.y();\n            softreport[_off2 + 17] = normal3.z();\n          }\n\n          offset += _size2 * 18 + 2;\n        }\n      }\n    }\n  }\n\n  // if (SUPPORT_TRANSFERABLE) transferableMessage(softreport.buffer, [softreport.buffer]);\n  // else transferableMessage(softreport);\n  transferableMessage(softreport);\n};\n\nvar reportCollisions = function reportCollisions() {\n  var dp = world.getDispatcher(),\n      num = dp.getNumManifolds();\n  // _collided = false;\n\n  if (SUPPORT_TRANSFERABLE) {\n    if (collisionreport.length < 2 + num * COLLISIONREPORT_ITEMSIZE) {\n      collisionreport = new Float32Array(2 // message id & # objects in report\n      + Math.ceil(_num_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE // # of values needed * item size\n      );\n      collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;\n    }\n  }\n\n  collisionreport[1] = 0; // how many collisions we're reporting on\n\n  for (var i = 0; i < num; i++) {\n    var manifold = dp.getManifoldByIndexInternal(i),\n        num_contacts = manifold.getNumContacts();\n\n    if (num_contacts === 0) continue;\n\n    for (var j = 0; j < num_contacts; j++) {\n      var pt = manifold.getContactPoint(j);\n\n      // if ( pt.getDistance() < 0 ) {\n      var offset = 2 + collisionreport[1]++ * COLLISIONREPORT_ITEMSIZE;\n      collisionreport[offset] = _objects_ammo[manifold.getBody0().ptr];\n      collisionreport[offset + 1] = _objects_ammo[manifold.getBody1().ptr];\n\n      _vector = pt.get_m_normalWorldOnB();\n      collisionreport[offset + 2] = _vector.x();\n      collisionreport[offset + 3] = _vector.y();\n      collisionreport[offset + 4] = _vector.z();\n      break;\n      // }\n      // transferableMessage(_objects_ammo);\n    }\n  }\n\n  if (SUPPORT_TRANSFERABLE) transferableMessage(collisionreport.buffer, [collisionreport.buffer]);else transferableMessage(collisionreport);\n};\n\nvar reportVehicles = function reportVehicles() {\n  if (SUPPORT_TRANSFERABLE) {\n    if (vehiclereport.length < 2 + _num_wheels * VEHICLEREPORT_ITEMSIZE) {\n      vehiclereport = new Float32Array(2 // message id & # objects in report\n      + Math.ceil(_num_wheels / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * VEHICLEREPORT_ITEMSIZE // # of values needed * item size\n      );\n      vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;\n    }\n  }\n\n  {\n    var i = 0,\n        j = 0,\n        index = _vehicles.length;\n\n    while (index--) {\n      if (_vehicles[index]) {\n        var vehicle = _vehicles[index];\n\n        for (j = 0; j < vehicle.getNumWheels(); j++) {\n          // vehicle.updateWheelTransform( j, true );\n          // transform = vehicle.getWheelTransformWS( j );\n          var transform = vehicle.getWheelInfo(j).get_m_worldTransform();\n\n          var origin = transform.getOrigin();\n          var rotation = transform.getRotation();\n\n          // add values to report\n          var offset = 1 + i++ * VEHICLEREPORT_ITEMSIZE;\n\n          vehiclereport[offset] = index;\n          vehiclereport[offset + 1] = j;\n\n          vehiclereport[offset + 2] = origin.x();\n          vehiclereport[offset + 3] = origin.y();\n          vehiclereport[offset + 4] = origin.z();\n\n          vehiclereport[offset + 5] = rotation.x();\n          vehiclereport[offset + 6] = rotation.y();\n          vehiclereport[offset + 7] = rotation.z();\n          vehiclereport[offset + 8] = rotation.w();\n        }\n      }\n    }\n\n    if (SUPPORT_TRANSFERABLE && j !== 0) transferableMessage(vehiclereport.buffer, [vehiclereport.buffer]);else if (j !== 0) transferableMessage(vehiclereport);\n  }\n};\n\nvar reportConstraints = function reportConstraints() {\n  if (SUPPORT_TRANSFERABLE) {\n    if (constraintreport.length < 2 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE) {\n      constraintreport = new Float32Array(2 // message id & # objects in report\n      + Math.ceil(_num_constraints / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * CONSTRAINTREPORT_ITEMSIZE // # of values needed * item size\n      );\n      constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;\n    }\n  }\n\n  {\n    var offset = 0,\n        i = 0,\n        index = _constraints.lenght;\n\n    while (index--) {\n      if (_constraints[index]) {\n        var _constraint = _constraints[index];\n        var offset_body = _constraint.a;\n        var transform = _constraint.ta;\n        var origin = transform.getOrigin();\n\n        // add values to report\n        offset = 1 + i++ * CONSTRAINTREPORT_ITEMSIZE;\n\n        constraintreport[offset] = index;\n        constraintreport[offset + 1] = offset_body.id;\n        constraintreport[offset + 2] = origin.x;\n        constraintreport[offset + 3] = origin.y;\n        constraintreport[offset + 4] = origin.z;\n        constraintreport[offset + 5] = _constraint.getBreakingImpulseThreshold();\n      }\n    }\n\n    if (SUPPORT_TRANSFERABLE && i !== 0) transferableMessage(constraintreport.buffer, [constraintreport.buffer]);else if (i !== 0) transferableMessage(constraintreport);\n  }\n};\n\nself.onmessage = function (event) {\n  if (event.data instanceof Float32Array) {\n    // transferable object\n    switch (event.data[0]) {\n      case MESSAGE_TYPES.WORLDREPORT:\n        {\n          worldreport = new Float32Array(event.data);\n          break;\n        }\n      case MESSAGE_TYPES.COLLISIONREPORT:\n        {\n          collisionreport = new Float32Array(event.data);\n          break;\n        }\n      case MESSAGE_TYPES.VEHICLEREPORT:\n        {\n          vehiclereport = new Float32Array(event.data);\n          break;\n        }\n      case MESSAGE_TYPES.CONSTRAINTREPORT:\n        {\n          constraintreport = new Float32Array(event.data);\n          break;\n        }\n      default:\n    }\n\n    return;\n  } else if (event.data.cmd && public_functions[event.data.cmd]) public_functions[event.data.cmd](event.data.params);\n};\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=68fad31bda45670a363c.worker.js.map", __webpack_require__.p + "68fad31bda45670a363c.worker.js");
};

/***/ },
/* 123 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_123__;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(51);


/***/ }
/******/ ]);
});
//# sourceMappingURL=physics-module.js.map