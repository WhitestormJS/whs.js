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
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_126__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 127);
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

var _defineProperty = __webpack_require__(75);

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

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(79);
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
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

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
    var child = object.children[i];
    var _physijs = child.component._physijs;

    if (_physijs) {
      child.updateMatrix();
      child.updateMatrixWorld();

      temp1Vector3.setFromMatrixPosition(child.matrixWorld);
      temp1Quat.setFromRotationMatrix(child.matrixWorld);

      _physijs.position_offset = {
        x: temp1Vector3.x,
        y: temp1Vector3.y,
        z: temp1Vector3.z
      };

      _physijs.rotation = {
        x: temp1Quat.x,
        y: temp1Quat.y,
        z: temp1Quat.z,
        w: temp1Quat.w
      };

      parent.component._physijs.children.push(_physijs);
    }

    addObjectChildren(parent, child);
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
  , core      = __webpack_require__(5)
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
var aFunction = __webpack_require__(90);
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
  , dPs         = __webpack_require__(106)
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
  __webpack_require__(96).appendChild(iframe);
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
  , TAG = __webpack_require__(4)('toStringTag');

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
  , core           = __webpack_require__(5)
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

exports.f = __webpack_require__(4);

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

var _iterator = __webpack_require__(78);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(77);

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
  , $iterCreate    = __webpack_require__(100)
  , setToStringTag = __webpack_require__(29)
  , getPrototypeOf = __webpack_require__(108)
  , ITERATOR       = __webpack_require__(4)('iterator')
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
  , arrayIndexOf = __webpack_require__(92)(false)
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
var $at  = __webpack_require__(110)(true);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_index__ = __webpack_require__(70);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "WorldModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "BoxModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CompoundModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CapsuleModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ConcaveModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ConvexModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CylinderModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "HeightfieldModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "PlaneModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SphereModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SoftbodyModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ClothModule", function() { return __WEBPACK_IMPORTED_MODULE_3__modules_index__["l"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vehicle_index__ = __webpack_require__(71);
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
    this.worldModule = null; // Will be redefined by .addConstraint
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
      if (this.worldModule) this.worldModule.execute('conetwist_setLimit', { constraint: this.id, x: x, y: y, z: z });
    }
  }, {
    key: 'enableMotor',
    value: function enableMotor() {
      if (this.worldModule) this.worldModule.execute('conetwist_enableMotor', { constraint: this.id });
    }
  }, {
    key: 'setMaxMotorImpulse',
    value: function setMaxMotorImpulse(max_impulse) {
      if (this.worldModule) this.worldModule.execute('conetwist_setMaxMotorImpulse', { constraint: this.id, max_impulse: max_impulse });
    }
  }, {
    key: 'setMotorTarget',
    value: function setMotorTarget(target) {
      if (target instanceof THREE.Vector3) target = new THREE.Quaternion().setFromEuler(new THREE.Euler(target.x, target.y, target.z));else if (target instanceof THREE.Euler) target = new THREE.Quaternion().setFromEuler(target);else if (target instanceof THREE.Matrix4) target = new THREE.Quaternion().setFromRotationMatrix(target);

      if (this.worldModule) this.worldModule.execute('conetwist_setMotorTarget', {
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
    this.worldModule = null; // Will be redefined by .addConstraint
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
      if (this.worldModule) this.worldModule.execute('dof_setLinearLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setLinearUpperLimit',
    value: function setLinearUpperLimit(limit) {
      if (this.worldModule) this.worldModule.execute('dof_setLinearUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setAngularLowerLimit',
    value: function setAngularLowerLimit(limit) {
      if (this.worldModule) this.worldModule.execute('dof_setAngularLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'setAngularUpperLimit',
    value: function setAngularUpperLimit(limit) {
      if (this.worldModule) this.worldModule.execute('dof_setAngularUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z });
    }
  }, {
    key: 'enableAngularMotor',
    value: function enableAngularMotor(which) {
      if (this.worldModule) this.worldModule.execute('dof_enableAngularMotor', { constraint: this.id, which: which });
    }
  }, {
    key: 'configureAngularMotor',
    value: function configureAngularMotor(which, low_angle, high_angle, velocity, max_force) {
      if (this.worldModule) this.worldModule.execute('dof_configureAngularMotor', { constraint: this.id, which: which, low_angle: low_angle, high_angle: high_angle, velocity: velocity, max_force: max_force });
    }
  }, {
    key: 'disableAngularMotor',
    value: function disableAngularMotor(which) {
      if (this.worldModule) this.worldModule.execute('dof_disableAngularMotor', { constraint: this.id, which: which });
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
    this.worldModule = null; // Will be redefined by .addConstraint
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
      if (this.worldModule) this.worldModule.execute('hinge_setLimits', {
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
      if (this.worldModule) this.worldModule.execute('hinge_enableAngularMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableMotor',
    value: function disableMotor() {
      if (this.worldModule) this.worldModule.execute('hinge_disableMotor', { constraint: this.id });
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
    this.worldModule = null; // Will be redefined by .addConstraint
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
      if (this.worldModule) this.worldModule.execute('slider_setLimits', {
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
      if (this.worldModule) this.worldModule.execute('slider_setRestitution', {
        constraint: this.id,
        linear: linear,
        angular: angular
      });
    }
  }, {
    key: 'enableLinearMotor',
    value: function enableLinearMotor(velocity, acceleration) {
      if (this.worldModule) this.worldModule.execute('slider_enableLinearMotor', {
        constraint: this.id,
        velocity: velocity,
        acceleration: acceleration
      });
    }
  }, {
    key: 'disableLinearMotor',
    value: function disableLinearMotor() {
      if (this.worldModule) this.worldModule.execute('slider_disableLinearMotor', { constraint: this.id });
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
      if (this.worldModule) this.worldModule.execute('slider_disableAngularMotor', { constraint: this.id });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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
    value: function integrate(self) {
    const params = self.params;


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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
    value: function integrate(self) {
    const params = self.params;


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ClothModule, [{
    key: 'appendAnchor',
    value: function appendAnchor(object, node, influence) {
      var collisionBetweenLinkedBodies = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var o1 = this._physijs.id;
      var o2 = object._physijs.id;

      if (this.manager.has('module:world')) this.manager.get('module:world').execute('appendAnchor', {
        obj: o1,
        obj2: o2,
        node: node,
        influence: influence,
        collisionBetweenLinkedBodies: collisionBetweenLinkedBodies
      });
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
    const params = self.params;


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

      this.appendAnchor = self.appendAnchor.bind(this);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CompoundModule; });





var CompoundModule = function () {
  function CompoundModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CompoundModule);

    this.bridge = {
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

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CompoundModule, [{
    key: 'integrate',
    value: function integrate(self) {
    const params = self.params;


      this._physijs = {
        type: 'compound',
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

  return CompoundModule;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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
    value: function integrate(self) {
    const params = self.params;


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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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
    value: function integrate(self) {
    const params = self.params;


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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CylinderModule; });





var CylinderModule = function () {
  function CylinderModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CylinderModule);

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
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      margin: 0,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1)
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CylinderModule, [{
    key: 'integrate',
    value: function integrate(self) {
    const params = self.params;


      this._physijs = {
        type: 'cylinder',
        width: params.width,
        height: params.height,
        depth: params.depth,
        touches: [],
        linearVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        angularVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        group: params.group,
        mask: params.mask,
        friction: params.friction,
        restitution: params.restitution,
        damping: params.damping,
        margin: params.margin,
        mass: params.mass,
        scale: params.scale
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return CylinderModule;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HeightfieldModule; });





var HeightfieldModule = function () {
  function HeightfieldModule(params) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, HeightfieldModule);

    this.bridge = {
      geometry: function geometry(_geometry, self) {
        var isBuffer = _geometry instanceof __WEBPACK_IMPORTED_MODULE_2_three__["BufferGeometry"];
        var verts = isBuffer ? _geometry.attributes.position.array : _geometry.vertices;

        var size = isBuffer ? verts.length / 3 : verts.length;

        if (!_geometry.boundingBox) _geometry.computeBoundingBox();

        var xdiv = self.params.size.x;
        var ydiv = self.params.size.y;

        var xsize = _geometry.boundingBox.max.x - _geometry.boundingBox.min.x;
        var ysize = _geometry.boundingBox.max.z - _geometry.boundingBox.min.z;

        this._physijs.xpts = typeof xdiv === 'undefined' ? Math.sqrt(size) : xdiv + 1;
        this._physijs.ypts = typeof ydiv === 'undefined' ? Math.sqrt(size) : ydiv + 1;

        // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
        this._physijs.absMaxHeight = Math.max(_geometry.boundingBox.max.y, Math.abs(_geometry.boundingBox.min.y));

        var points = new Float32Array(size),
            xpts = this._physijs.xpts,
            ypts = this._physijs.ypts;

        while (size--) {
          var vNum = size % xpts + (ypts - Math.round(size / xpts - size % xpts / xpts) - 1) * ypts;

          if (isBuffer) points[size] = verts[vNum * 3 + 1];else points[size] = verts[vNum].y;
        }

        this._physijs.points = points;

        this._physijs.scale.multiply(new THREE.Vector3(xsize / (xpts - 1), 1, ysize / (ypts - 1)));

        if (self.params.autoAlign) _geometry.translate(xsize / -2, 0, ysize / -2);

        return _geometry;
      },


      onCopy: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["a" /* onCopy */],
      onWrap: __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["b" /* onWrap */]
    };

    this.params = Object.assign({
      mass: 10,
      scale: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](1, 1, 1),
      size: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector2"](1, 1),
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      margin: 0,
      autoAlign: false
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(HeightfieldModule, [{
    key: 'integrate',
    value: function integrate(self) {
    const params = self.params;


      this._physijs = {
        type: 'heightfield',
        friction: params.friction,
        touches: [],
        scale: params.scale,
        restitution: params.restitution,
        damping: params.damping,
        margin: params.margin,
        points: params.points,
        mass: params.mass,
        linearVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        angularVelocity: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector3"](),
        group: params.group,
        mask: params.mask
      };

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return HeightfieldModule;
}();

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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
    value: function integrate(self) {
    const params = self.params;


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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SoftbodyModule, [{
    key: 'appendAnchor',
    value: function appendAnchor(object, node, influence) {
      var collisionBetweenLinkedBodies = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var o1 = this._physijs.id;
      var o2 = object._physijs.id;

      if (this.manager.has('module:world')) this.manager.get('module:world').execute('appendAnchor', {
        obj: o1,
        obj2: o2,
        node: node,
        influence: influence,
        collisionBetweenLinkedBodies: collisionBetweenLinkedBodies
      });
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
    const params = self.params;


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

      this.appendAnchor = self.appendAnchor.bind(this);

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__physicsPrototype__["c" /* wrapPhysicsPrototype */])(this);
    }
  }]);

  return SoftbodyModule;
}();

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsPrototype__ = __webpack_require__(3);
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
    value: function integrate(self) {
    const params = self.params;


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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_whs__ = __webpack_require__(126);
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

    _this._worker = new (__webpack_require__(125))();
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
            _this.dispatchEvent('loaded');
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

        if (!_physijs.isSoftBodyReset) {
          object.position.set(0, 0, 0);
          object.quaternion.set(0, 0, 0, 0);

          _physijs.isSoftBodyReset = true;
        }

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
      constraint.worldModule = this;
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
        component.manager.add('module:world', this);
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
          component.manager.remove('module:world');
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
      _manager.add('physicsWorker', this._worker);
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
    const params = self.params;


      var _this3 = this;

      // ...

      this.setFixedTimeStep = function (fixedTimeStep) {
        if (fixedTimeStep) self.execute('setFixedTimeStep', fixedTimeStep);
      };

      this.setGravity = function (gravity) {
        if (gravity) self.execute('setGravity', gravity);
      };

      this.addConstraint = self.addConstraint.bind(self);

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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WorldModule__ = __webpack_require__(69);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__WorldModule__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__BoxModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BoxModule__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CompoundModule__ = __webpack_require__(61);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__CompoundModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CapsuleModule__ = __webpack_require__(59);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__CapsuleModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ConcaveModule__ = __webpack_require__(62);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__ConcaveModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ConvexModule__ = __webpack_require__(63);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__ConvexModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CylinderModule__ = __webpack_require__(64);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__CylinderModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__HeightfieldModule__ = __webpack_require__(65);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__HeightfieldModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__PlaneModule__ = __webpack_require__(66);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__PlaneModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__SphereModule__ = __webpack_require__(68);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "j", function() { return __WEBPACK_IMPORTED_MODULE_9__SphereModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SoftbodyModule__ = __webpack_require__(67);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__SoftbodyModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ClothModule__ = __webpack_require__(60);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "l", function() { return __WEBPACK_IMPORTED_MODULE_11__ClothModule__["a"]; });





// export * from './coneMesh';







// export * from './ropeMesh';

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tunning__ = __webpack_require__(38);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tunning__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vehicle__ = __webpack_require__(39);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__vehicle__["a"]; });



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

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _assign = __webpack_require__(73);

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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(76);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(74);

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
/* 81 */
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _from = __webpack_require__(72);

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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(113);
module.exports = __webpack_require__(5).Array.from;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(115);
module.exports = __webpack_require__(5).Object.assign;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(116);
var $Object = __webpack_require__(5).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(117);
var $Object = __webpack_require__(5).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(118);
module.exports = __webpack_require__(5).Object.setPrototypeOf;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(120);
__webpack_require__(119);
__webpack_require__(121);
__webpack_require__(122);
module.exports = __webpack_require__(5).Symbol;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(123);
module.exports = __webpack_require__(36).f('iterator');

/***/ },
/* 90 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 91 */
/***/ function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(49)
  , toIndex   = __webpack_require__(111);
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22)
  , TAG = __webpack_require__(4)('toStringTag')
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
/* 94 */
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
/* 95 */
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(17)
  , ITERATOR   = __webpack_require__(4)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(22);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ },
/* 99 */
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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var create         = __webpack_require__(27)
  , descriptor     = __webpack_require__(19)
  , setToStringTag = __webpack_require__(29)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(4)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(4)('iterator')
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
/* 102 */
/***/ function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ },
/* 103 */
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
/* 104 */
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
/* 105 */
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
/* 106 */
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
/* 107 */
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
/* 108 */
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
/* 109 */
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
/* 110 */
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(93)
  , ITERATOR  = __webpack_require__(4)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(5).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var ctx            = __webpack_require__(23)
  , $export        = __webpack_require__(10)
  , toObject       = __webpack_require__(33)
  , call           = __webpack_require__(99)
  , isArrayIter    = __webpack_require__(97)
  , toLength       = __webpack_require__(49)
  , createProperty = __webpack_require__(94)
  , getIterFn      = __webpack_require__(112);

$export($export.S + $export.F * !__webpack_require__(101)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var addToUnscopables = __webpack_require__(91)
  , step             = __webpack_require__(102)
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(10);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(105)});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(27)});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(10);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(109).set});

/***/ },
/* 119 */
/***/ function(module, exports) {



/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// ECMAScript 6 symbols shim
var global         = __webpack_require__(6)
  , has            = __webpack_require__(11)
  , DESCRIPTORS    = __webpack_require__(9)
  , $export        = __webpack_require__(10)
  , redefine       = __webpack_require__(48)
  , META           = __webpack_require__(104).KEY
  , $fails         = __webpack_require__(15)
  , shared         = __webpack_require__(31)
  , setToStringTag = __webpack_require__(29)
  , uid            = __webpack_require__(21)
  , wks            = __webpack_require__(4)
  , wksExt         = __webpack_require__(36)
  , wksDefine      = __webpack_require__(35)
  , keyOf          = __webpack_require__(103)
  , enumKeys       = __webpack_require__(95)
  , isArray        = __webpack_require__(98)
  , anObject       = __webpack_require__(13)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(34)
  , createDesc     = __webpack_require__(19)
  , _create        = __webpack_require__(27)
  , gOPNExt        = __webpack_require__(107)
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(35)('asyncIterator');

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(35)('observable');

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(114);
var global        = __webpack_require__(6)
  , hide          = __webpack_require__(14)
  , Iterators     = __webpack_require__(17)
  , TO_STRING_TAG = __webpack_require__(4)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ },
/* 124 */
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function() {
	return __webpack_require__(124)("/*! Physics module \"Ammonext\" v0.0.1-dev.1 */\n/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// identity function for calling harmony imports with the correct context\n/******/ \t__webpack_require__.i = function(value) { return value; };\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports) {\n\nvar transferableMessage = self.webkitPostMessage || self.postMessage,\n\n\n// enum\nMESSAGE_TYPES = {\n  WORLDREPORT: 0,\n  COLLISIONREPORT: 1,\n  VEHICLEREPORT: 2,\n  CONSTRAINTREPORT: 3,\n  SOFTREPORT: 4\n};\n\n// temp variables\nvar _object = void 0,\n    _vector = void 0,\n    _transform = void 0,\n    _transform_pos = void 0,\n    _softbody_enabled = false,\n    last_simulation_duration = 0,\n    _num_objects = 0,\n    _num_rigidbody_objects = 0,\n    _num_softbody_objects = 0,\n    _num_wheels = 0,\n    _num_constraints = 0,\n    _softbody_report_size = 0,\n\n\n// world variables\nfixedTimeStep = void 0,\n    // used when calling stepSimulation\nlast_simulation_time = void 0,\n    world = void 0,\n    _vec3_1 = void 0,\n    _vec3_2 = void 0,\n    _vec3_3 = void 0,\n    _quat = void 0;\n\n// private cache\nvar public_functions = {},\n    _objects = [],\n    _vehicles = [],\n    _constraints = [],\n    _objects_ammo = {},\n    _object_shapes = {},\n\n\n// The following objects are to track objects that ammo.js doesn't clean\n// up. All are cleaned up when they're corresponding body is destroyed.\n// Unfortunately, it's very difficult to get at these objects from the\n// body, so we have to track them ourselves.\n_motion_states = {},\n\n// Don't need to worry about it for cached shapes.\n_noncached_shapes = {},\n\n// A body with a compound shape always has a regular shape as well, so we\n// have track them separately.\n_compound_shapes = {};\n\n// object reporting\nvar REPORT_CHUNKSIZE = void 0,\n    // report array is increased in increments of this chunk size\nworldreport = void 0,\n    softreport = void 0,\n    collisionreport = void 0,\n    vehiclereport = void 0,\n    constraintreport = void 0;\n\nvar WORLDREPORT_ITEMSIZE = 14,\n    // how many float values each reported item needs\nCOLLISIONREPORT_ITEMSIZE = 5,\n    // one float for each object id, and a Vec3 contact normal\nVEHICLEREPORT_ITEMSIZE = 9,\n    // vehicle id, wheel index, 3 for position, 4 for rotation\nCONSTRAINTREPORT_ITEMSIZE = 6; // constraint id, offset object, offset, applied impulse\n\nvar ab = new ArrayBuffer(1);\n\ntransferableMessage(ab, [ab]);\nvar SUPPORT_TRANSFERABLE = ab.byteLength === 0;\n\nvar getShapeFromCache = function getShapeFromCache(cache_key) {\n  if (_object_shapes[cache_key] !== undefined) return _object_shapes[cache_key];\n\n  return null;\n};\n\nvar setShapeCache = function setShapeCache(cache_key, shape) {\n  _object_shapes[cache_key] = shape;\n};\n\nvar createShape = function createShape(description) {\n  var shape = void 0;\n\n  _transform.setIdentity();\n  switch (description.type) {\n    case 'compound':\n      {\n        shape = new Ammo.btCompoundShape();\n\n        break;\n      }\n    case 'plane':\n      {\n        var cache_key = 'plane_' + description.normal.x + '_' + description.normal.y + '_' + description.normal.z;\n\n        if ((shape = getShapeFromCache(cache_key)) === null) {\n          _vec3_1.setX(description.normal.x);\n          _vec3_1.setY(description.normal.y);\n          _vec3_1.setZ(description.normal.z);\n          shape = new Ammo.btStaticPlaneShape(_vec3_1, 0);\n          setShapeCache(cache_key, shape);\n        }\n\n        break;\n      }\n    case 'box':\n      {\n        var _cache_key = 'box_' + description.width + '_' + description.height + '_' + description.depth;\n\n        if ((shape = getShapeFromCache(_cache_key)) === null) {\n          _vec3_1.setX(description.width / 2);\n          _vec3_1.setY(description.height / 2);\n          _vec3_1.setZ(description.depth / 2);\n          shape = new Ammo.btBoxShape(_vec3_1);\n          setShapeCache(_cache_key, shape);\n        }\n\n        break;\n      }\n    case 'sphere':\n      {\n        var _cache_key2 = 'sphere_' + description.radius;\n\n        if ((shape = getShapeFromCache(_cache_key2)) === null) {\n          shape = new Ammo.btSphereShape(description.radius);\n          setShapeCache(_cache_key2, shape);\n        }\n\n        break;\n      }\n    case 'cylinder':\n      {\n        var _cache_key3 = 'cylinder_' + description.width + '_' + description.height + '_' + description.depth;\n\n        if ((shape = getShapeFromCache(_cache_key3)) === null) {\n          _vec3_1.setX(description.width / 2);\n          _vec3_1.setY(description.height / 2);\n          _vec3_1.setZ(description.depth / 2);\n          shape = new Ammo.btCylinderShape(_vec3_1);\n          setShapeCache(_cache_key3, shape);\n        }\n\n        break;\n      }\n    case 'capsule':\n      {\n        var _cache_key4 = 'capsule_' + description.radius + '_' + description.height;\n\n        if ((shape = getShapeFromCache(_cache_key4)) === null) {\n          // In Bullet, capsule height excludes the end spheres\n          shape = new Ammo.btCapsuleShape(description.radius, description.height - 2 * description.radius);\n          setShapeCache(_cache_key4, shape);\n        }\n\n        break;\n      }\n    case 'cone':\n      {\n        var _cache_key5 = 'cone_' + description.radius + '_' + description.height;\n\n        if ((shape = getShapeFromCache(_cache_key5)) === null) {\n          shape = new Ammo.btConeShape(description.radius, description.height);\n          setShapeCache(_cache_key5, shape);\n        }\n\n        break;\n      }\n    case 'concave':\n      {\n        var triangle_mesh = new Ammo.btTriangleMesh();\n        if (!description.data.length) return false;\n        var data = description.data;\n\n        for (var i = 0; i < data.length / 9; i++) {\n          _vec3_1.setX(data[i * 9]);\n          _vec3_1.setY(data[i * 9 + 1]);\n          _vec3_1.setZ(data[i * 9 + 2]);\n\n          _vec3_2.setX(data[i * 9 + 3]);\n          _vec3_2.setY(data[i * 9 + 4]);\n          _vec3_2.setZ(data[i * 9 + 5]);\n\n          _vec3_3.setX(data[i * 9 + 6]);\n          _vec3_3.setY(data[i * 9 + 7]);\n          _vec3_3.setZ(data[i * 9 + 8]);\n\n          triangle_mesh.addTriangle(_vec3_1, _vec3_2, _vec3_3, false);\n        }\n\n        shape = new Ammo.btBvhTriangleMeshShape(triangle_mesh, true, true);\n\n        _noncached_shapes[description.id] = shape;\n\n        break;\n      }\n    case 'convex':\n      {\n        shape = new Ammo.btConvexHullShape();\n        var _data = description.data;\n\n        for (var _i = 0; _i < _data.length / 3; _i++) {\n          _vec3_1.setX(_data[_i * 3]);\n          _vec3_1.setY(_data[_i * 3 + 1]);\n          _vec3_1.setZ(_data[_i * 3 + 2]);\n\n          shape.addPoint(_vec3_1);\n        }\n\n        _noncached_shapes[description.id] = shape;\n\n        break;\n      }\n    case 'heightfield':\n      {\n        var xpts = description.xpts,\n            ypts = description.ypts,\n            points = description.points,\n            ptr = Ammo._malloc(4 * xpts * ypts);\n\n        for (var _i2 = 0, p = 0, p2 = 0; _i2 < xpts; _i2++) {\n          for (var j = 0; j < ypts; j++) {\n            Ammo.HEAPF32[ptr + p2 >> 2] = points[p];\n\n            p++;\n            p2 += 4;\n          }\n        }\n\n        shape = new Ammo.btHeightfieldTerrainShape(description.xpts, description.ypts, ptr, 1, -description.absMaxHeight, description.absMaxHeight, 1, 'PHY_FLOAT', false);\n\n        _noncached_shapes[description.id] = shape;\n        break;\n      }\n    default:\n      // Not recognized\n      return;\n  }\n\n  return shape;\n};\n\nvar createSoftBody = function createSoftBody(description) {\n  var body = void 0;\n\n  var softBodyHelpers = new Ammo.btSoftBodyHelpers();\n\n  switch (description.type) {\n    case 'softTrimesh':\n      {\n        if (!description.aVertices.length) return false;\n\n        body = softBodyHelpers.CreateFromTriMesh(world.getWorldInfo(), description.aVertices, description.aIndices, description.aIndices.length / 3, false);\n\n        break;\n      }\n    case 'softClothMesh':\n      {\n        var cr = description.corners;\n\n        body = softBodyHelpers.CreatePatch(world.getWorldInfo(), new Ammo.btVector3(cr[0], cr[1], cr[2]), new Ammo.btVector3(cr[3], cr[4], cr[5]), new Ammo.btVector3(cr[6], cr[7], cr[8]), new Ammo.btVector3(cr[9], cr[10], cr[11]), description.segments[0], description.segments[1], 0, true);\n\n        break;\n      }\n    case 'softRopeMesh':\n      {\n        var data = description.data;\n\n        body = softBodyHelpers.CreateRope(world.getWorldInfo(), new Ammo.btVector3(data[0], data[1], data[2]), new Ammo.btVector3(data[3], data[4], data[5]), data[6] - 1, 0);\n\n        break;\n      }\n    default:\n      // Not recognized\n      return;\n  }\n\n  return body;\n};\n\npublic_functions.init = function () {\n  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  if (params.wasmBuffer) {\n    importScripts(params.ammo);\n\n    self.Ammo = loadAmmoFromBinary(params.wasmBuffer);\n    transferableMessage({ cmd: 'ammoLoaded' });\n    public_functions.makeWorld(params);\n  } else {\n    importScripts(params.ammo);\n    transferableMessage({ cmd: 'ammoLoaded' });\n    public_functions.makeWorld(params);\n  }\n};\n\npublic_functions.makeWorld = function () {\n  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  _transform = new Ammo.btTransform();\n  _transform_pos = new Ammo.btTransform();\n  _vec3_1 = new Ammo.btVector3(0, 0, 0);\n  _vec3_2 = new Ammo.btVector3(0, 0, 0);\n  _vec3_3 = new Ammo.btVector3(0, 0, 0);\n  _quat = new Ammo.btQuaternion(0, 0, 0, 0);\n\n  REPORT_CHUNKSIZE = params.reportsize || 50;\n\n  if (SUPPORT_TRANSFERABLE) {\n    // Transferable messages are supported, take advantage of them with TypedArrays\n    worldreport = new Float32Array(2 + REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE); // message id + # of objects to report + chunk size * # of values per object\n    collisionreport = new Float32Array(2 + REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE); // message id + # of collisions to report + chunk size * # of values per object\n    vehiclereport = new Float32Array(2 + REPORT_CHUNKSIZE * VEHICLEREPORT_ITEMSIZE); // message id + # of vehicles to report + chunk size * # of values per object\n    constraintreport = new Float32Array(2 + REPORT_CHUNKSIZE * CONSTRAINTREPORT_ITEMSIZE); // message id + # of constraints to report + chunk size * # of values per object\n  } else {\n    // Transferable messages are not supported, send data as normal arrays\n    worldreport = [];\n    collisionreport = [];\n    vehiclereport = [];\n    constraintreport = [];\n  }\n\n  worldreport[0] = MESSAGE_TYPES.WORLDREPORT;\n  collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;\n  vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;\n  constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;\n\n  var collisionConfiguration = params.softbody ? new Ammo.btSoftBodyRigidBodyCollisionConfiguration() : new Ammo.btDefaultCollisionConfiguration(),\n      dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),\n      solver = new Ammo.btSequentialImpulseConstraintSolver();\n\n  var broadphase = void 0;\n\n  if (!params.broadphase) params.broadphase = { type: 'dynamic' };\n  // TODO!!!\n  /* if (params.broadphase.type === 'sweepprune') {\n    extend(params.broadphase, {\n      aabbmin: {\n        x: -50,\n        y: -50,\n        z: -50\n      },\n       aabbmax: {\n        x: 50,\n        y: 50,\n        z: 50\n      },\n    });\n  }*/\n\n  switch (params.broadphase.type) {\n    case 'sweepprune':\n      _vec3_1.setX(params.broadphase.aabbmin.x);\n      _vec3_1.setY(params.broadphase.aabbmin.y);\n      _vec3_1.setZ(params.broadphase.aabbmin.z);\n\n      _vec3_2.setX(params.broadphase.aabbmax.x);\n      _vec3_2.setY(params.broadphase.aabbmax.y);\n      _vec3_2.setZ(params.broadphase.aabbmax.z);\n\n      broadphase = new Ammo.btAxisSweep3(_vec3_1, _vec3_2);\n\n      break;\n    case 'dynamic':\n    default:\n      broadphase = new Ammo.btDbvtBroadphase();\n      break;\n  }\n\n  world = params.softbody ? new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, new Ammo.btDefaultSoftBodySolver()) : new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);\n  fixedTimeStep = params.fixedTimeStep;\n\n  if (params.softbody) _softbody_enabled = true;\n\n  transferableMessage({ cmd: 'worldReady' });\n};\n\npublic_functions.setFixedTimeStep = function (description) {\n  fixedTimeStep = description;\n};\n\npublic_functions.setGravity = function (description) {\n  _vec3_1.setX(description.x);\n  _vec3_1.setY(description.y);\n  _vec3_1.setZ(description.z);\n  world.setGravity(_vec3_1);\n};\n\npublic_functions.appendAnchor = function (description) {\n  _objects[description.obj].appendAnchor(description.node, _objects[description.obj2], description.collisionBetweenLinkedBodies, description.influence);\n};\n\npublic_functions.addObject = function (description) {\n  var body = void 0,\n      motionState = void 0;\n\n  if (description.type.indexOf('soft') !== -1) {\n    body = createSoftBody(description);\n\n    var sbConfig = body.get_m_cfg();\n\n    if (description.viterations) sbConfig.set_viterations(description.viterations);\n    if (description.piterations) sbConfig.set_piterations(description.piterations);\n    if (description.diterations) sbConfig.set_diterations(description.diterations);\n    if (description.citerations) sbConfig.set_citerations(description.citerations);\n    sbConfig.set_collisions(0x11);\n    sbConfig.set_kDF(description.friction);\n    sbConfig.set_kDP(description.damping);\n    if (description.pressure) sbConfig.set_kPR(description.pressure);\n    if (description.drag) sbConfig.set_kDG(description.drag);\n    if (description.lift) sbConfig.set_kLF(description.lift);\n    if (description.anchorHardness) sbConfig.set_kAHR(description.anchorHardness);\n    if (description.rigidHardness) sbConfig.set_kCHR(description.rigidHardness);\n\n    if (description.klst) body.get_m_materials().at(0).set_m_kLST(description.klst);\n    if (description.kast) body.get_m_materials().at(0).set_m_kAST(description.kast);\n    if (description.kvst) body.get_m_materials().at(0).set_m_kVST(description.kvst);\n\n    Ammo.castObject(body, Ammo.btCollisionObject).getCollisionShape().setMargin(description.margin ? description.margin : 0.1);\n    body.setActivationState(description.state || 4);\n    body.type = 0; // SoftBody.\n    if (description.type === 'softRopeMesh') body.rope = true;\n    if (description.type === 'softClothMesh') body.cloth = true;\n\n    _transform.setIdentity();\n\n    _vec3_1.setX(description.position.x);\n    _vec3_1.setY(description.position.y);\n    _vec3_1.setZ(description.position.z);\n    _transform.setOrigin(_vec3_1);\n\n    _quat.setX(description.rotation.x);\n    _quat.setY(description.rotation.y);\n    _quat.setZ(description.rotation.z);\n    _quat.setW(description.rotation.w);\n    _transform.setRotation(_quat);\n\n    body.transform(_transform);\n\n    body.setTotalMass(description.mass, false);\n    world.addSoftBody(body, 1, -1);\n    if (description.type === 'softTrimesh') _softbody_report_size += body.get_m_faces().size() * 3;else _softbody_report_size += body.get_m_nodes().size() * 3;\n\n    _num_softbody_objects++;\n  } else {\n    var shape = createShape(description);\n\n    if (!shape) return;\n\n    // If there are children then this is a compound shape\n    if (description.children) {\n      var compound_shape = new Ammo.btCompoundShape();\n      compound_shape.addChildShape(_transform, shape);\n\n      for (var i = 0; i < description.children.length; i++) {\n        var _child = description.children[i];\n\n        var trans = new Ammo.btTransform();\n        trans.setIdentity();\n\n        _vec3_1.setX(_child.position_offset.x);\n        _vec3_1.setY(_child.position_offset.y);\n        _vec3_1.setZ(_child.position_offset.z);\n        trans.setOrigin(_vec3_1);\n\n        _quat.setX(_child.rotation.x);\n        _quat.setY(_child.rotation.y);\n        _quat.setZ(_child.rotation.z);\n        _quat.setW(_child.rotation.w);\n        trans.setRotation(_quat);\n\n        shape = createShape(description.children[i]);\n        compound_shape.addChildShape(trans, shape);\n        Ammo.destroy(trans);\n      }\n\n      shape = compound_shape;\n      _compound_shapes[description.id] = shape;\n    }\n\n    _vec3_1.setX(description.scale.x);\n    _vec3_1.setY(description.scale.y);\n    _vec3_1.setZ(description.scale.z);\n\n    shape.setLocalScaling(_vec3_1);\n\n    _vec3_1.setX(0);\n    _vec3_1.setY(0);\n    _vec3_1.setZ(0);\n    shape.calculateLocalInertia(description.mass, _vec3_1);\n\n    _transform.setIdentity();\n\n    _vec3_2.setX(description.position.x);\n    _vec3_2.setY(description.position.y);\n    _vec3_2.setZ(description.position.z);\n    _transform.setOrigin(_vec3_2);\n\n    _quat.setX(description.rotation.x);\n    _quat.setY(description.rotation.y);\n    _quat.setZ(description.rotation.z);\n    _quat.setW(description.rotation.w);\n    _transform.setRotation(_quat);\n\n    motionState = new Ammo.btDefaultMotionState(_transform); // #TODO: btDefaultMotionState supports center of mass offset as second argument - implement\n    var rbInfo = new Ammo.btRigidBodyConstructionInfo(description.mass, motionState, shape, _vec3_1);\n\n    rbInfo.set_m_friction(description.friction);\n    rbInfo.set_m_restitution(description.restitution);\n    rbInfo.set_m_linearDamping(description.damping);\n    rbInfo.set_m_angularDamping(description.damping);\n\n    body = new Ammo.btRigidBody(rbInfo);\n    Ammo.castObject(body, Ammo.btCollisionObject).getCollisionShape().setMargin(description.margin ? description.margin : 0);\n    body.setActivationState(description.state || 4);\n    Ammo.destroy(rbInfo);\n\n    if (typeof description.collision_flags !== 'undefined') body.setCollisionFlags(description.collision_flags);\n\n    if (description.group && description.mask) world.addRigidBody(body, description.group, description.mask);else world.addRigidBody(body);\n    body.type = 1; // RigidBody.\n    _num_rigidbody_objects++;\n  }\n\n  body.activate();\n\n  body.id = description.id;\n  _objects[body.id] = body;\n  _motion_states[body.id] = motionState;\n\n  _objects_ammo[body.a === undefined ? body.ptr : body.a] = body.id;\n  _num_objects++;\n\n  transferableMessage({ cmd: 'objectReady', params: body.id });\n};\n\npublic_functions.addVehicle = function (description) {\n  var vehicle_tuning = new Ammo.btVehicleTuning();\n\n  vehicle_tuning.set_m_suspensionStiffness(description.suspension_stiffness);\n  vehicle_tuning.set_m_suspensionCompression(description.suspension_compression);\n  vehicle_tuning.set_m_suspensionDamping(description.suspension_damping);\n  vehicle_tuning.set_m_maxSuspensionTravelCm(description.max_suspension_travel);\n  vehicle_tuning.set_m_maxSuspensionForce(description.max_suspension_force);\n\n  var vehicle = new Ammo.btRaycastVehicle(vehicle_tuning, _objects[description.rigidBody], new Ammo.btDefaultVehicleRaycaster(world));\n\n  vehicle.tuning = vehicle_tuning;\n  _objects[description.rigidBody].setActivationState(4);\n  vehicle.setCoordinateSystem(0, 1, 2);\n\n  world.addVehicle(vehicle);\n  _vehicles[description.id] = vehicle;\n};\npublic_functions.removeVehicle = function (description) {\n  _vehicles[description.id] = null;\n};\n\npublic_functions.addWheel = function (description) {\n  if (_vehicles[description.id] !== undefined) {\n    var tuning = _vehicles[description.id].tuning;\n    if (description.tuning !== undefined) {\n      tuning = new Ammo.btVehicleTuning();\n      tuning.set_m_suspensionStiffness(description.tuning.suspension_stiffness);\n      tuning.set_m_suspensionCompression(description.tuning.suspension_compression);\n      tuning.set_m_suspensionDamping(description.tuning.suspension_damping);\n      tuning.set_m_maxSuspensionTravelCm(description.tuning.max_suspension_travel);\n      tuning.set_m_maxSuspensionForce(description.tuning.max_suspension_force);\n    }\n\n    _vec3_1.setX(description.connection_point.x);\n    _vec3_1.setY(description.connection_point.y);\n    _vec3_1.setZ(description.connection_point.z);\n\n    _vec3_2.setX(description.wheel_direction.x);\n    _vec3_2.setY(description.wheel_direction.y);\n    _vec3_2.setZ(description.wheel_direction.z);\n\n    _vec3_3.setX(description.wheel_axle.x);\n    _vec3_3.setY(description.wheel_axle.y);\n    _vec3_3.setZ(description.wheel_axle.z);\n\n    _vehicles[description.id].addWheel(_vec3_1, _vec3_2, _vec3_3, description.suspension_rest_length, description.wheel_radius, tuning, description.is_front_wheel);\n  }\n\n  _num_wheels++;\n\n  if (SUPPORT_TRANSFERABLE) {\n    vehiclereport = new Float32Array(1 + _num_wheels * VEHICLEREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )\n    vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;\n  } else vehiclereport = [MESSAGE_TYPES.VEHICLEREPORT];\n};\n\npublic_functions.setSteering = function (details) {\n  if (_vehicles[details.id] !== undefined) _vehicles[details.id].setSteeringValue(details.steering, details.wheel);\n};\n\npublic_functions.setBrake = function (details) {\n  if (_vehicles[details.id] !== undefined) _vehicles[details.id].setBrake(details.brake, details.wheel);\n};\n\npublic_functions.applyEngineForce = function (details) {\n  if (_vehicles[details.id] !== undefined) _vehicles[details.id].applyEngineForce(details.force, details.wheel);\n};\n\npublic_functions.removeObject = function (details) {\n  if (_objects[details.id].type === 0) {\n    _num_softbody_objects--;\n    _softbody_report_size -= _objects[details.id].get_m_nodes().size();\n    world.removeSoftBody(_objects[details.id]);\n  } else if (_objects[details.id].type === 1) {\n    _num_rigidbody_objects--;\n    world.removeRigidBody(_objects[details.id]);\n    Ammo.destroy(_motion_states[details.id]);\n  }\n\n  Ammo.destroy(_objects[details.id]);\n  if (_compound_shapes[details.id]) Ammo.destroy(_compound_shapes[details.id]);\n  if (_noncached_shapes[details.id]) Ammo.destroy(_noncached_shapes[details.id]);\n\n  _objects_ammo[_objects[details.id].a === undefined ? _objects[details.id].a : _objects[details.id].ptr] = null;\n  _objects[details.id] = null;\n  _motion_states[details.id] = null;\n\n  if (_compound_shapes[details.id]) _compound_shapes[details.id] = null;\n  if (_noncached_shapes[details.id]) _noncached_shapes[details.id] = null;\n  _num_objects--;\n};\n\npublic_functions.updateTransform = function (details) {\n  _object = _objects[details.id];\n\n  if (_object.type === 1) {\n    _object.getMotionState().getWorldTransform(_transform);\n\n    if (details.pos) {\n      _vec3_1.setX(details.pos.x);\n      _vec3_1.setY(details.pos.y);\n      _vec3_1.setZ(details.pos.z);\n      _transform.setOrigin(_vec3_1);\n    }\n\n    if (details.quat) {\n      _quat.setX(details.quat.x);\n      _quat.setY(details.quat.y);\n      _quat.setZ(details.quat.z);\n      _quat.setW(details.quat.w);\n      _transform.setRotation(_quat);\n    }\n\n    _object.setWorldTransform(_transform);\n    _object.activate();\n  } else if (_object.type === 0) {\n    // _object.getWorldTransform(_transform);\n\n    if (details.pos) {\n      _vec3_1.setX(details.pos.x);\n      _vec3_1.setY(details.pos.y);\n      _vec3_1.setZ(details.pos.z);\n      _transform.setOrigin(_vec3_1);\n    }\n\n    if (details.quat) {\n      _quat.setX(details.quat.x);\n      _quat.setY(details.quat.y);\n      _quat.setZ(details.quat.z);\n      _quat.setW(details.quat.w);\n      _transform.setRotation(_quat);\n    }\n\n    _object.transform(_transform);\n  }\n};\n\npublic_functions.updateMass = function (details) {\n  // #TODO: changing a static object into dynamic is buggy\n  _object = _objects[details.id];\n\n  // Per http://www.bulletphysics.org/Bullet/phpBB3/viewtopic.php?p=&f=9&t=3663#p13816\n  world.removeRigidBody(_object);\n\n  _vec3_1.setX(0);\n  _vec3_1.setY(0);\n  _vec3_1.setZ(0);\n\n  _object.setMassProps(details.mass, _vec3_1);\n  world.addRigidBody(_object);\n  _object.activate();\n};\n\npublic_functions.applyCentralImpulse = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].applyCentralImpulse(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyImpulse = function (details) {\n  _vec3_1.setX(details.impulse_x);\n  _vec3_1.setY(details.impulse_y);\n  _vec3_1.setZ(details.impulse_z);\n\n  _vec3_2.setX(details.x);\n  _vec3_2.setY(details.y);\n  _vec3_2.setZ(details.z);\n\n  _objects[details.id].applyImpulse(_vec3_1, _vec3_2);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyTorque = function (details) {\n  _vec3_1.setX(details.torque_x);\n  _vec3_1.setY(details.torque_y);\n  _vec3_1.setZ(details.torque_z);\n\n  _objects[details.id].applyTorque(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyCentralForce = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].applyCentralForce(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.applyForce = function (details) {\n  _vec3_1.setX(details.force_x);\n  _vec3_1.setY(details.force_y);\n  _vec3_1.setZ(details.force_z);\n\n  _vec3_2.setX(details.x);\n  _vec3_2.setY(details.y);\n  _vec3_2.setZ(details.z);\n\n  _objects[details.id].applyForce(_vec3_1, _vec3_2);\n  _objects[details.id].activate();\n};\n\npublic_functions.onSimulationResume = function () {\n  last_simulation_time = Date.now();\n};\n\npublic_functions.setAngularVelocity = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setAngularVelocity(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.setLinearVelocity = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setLinearVelocity(_vec3_1);\n  _objects[details.id].activate();\n};\n\npublic_functions.setAngularFactor = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setAngularFactor(_vec3_1);\n};\n\npublic_functions.setLinearFactor = function (details) {\n  _vec3_1.setX(details.x);\n  _vec3_1.setY(details.y);\n  _vec3_1.setZ(details.z);\n\n  _objects[details.id].setLinearFactor(_vec3_1);\n};\n\npublic_functions.setDamping = function (details) {\n  _objects[details.id].setDamping(details.linear, details.angular);\n};\n\npublic_functions.setCcdMotionThreshold = function (details) {\n  _objects[details.id].setCcdMotionThreshold(details.threshold);\n};\n\npublic_functions.setCcdSweptSphereRadius = function (details) {\n  _objects[details.id].setCcdSweptSphereRadius(details.radius);\n};\n\npublic_functions.addConstraint = function (details) {\n  var constraint = void 0;\n\n  switch (details.type) {\n\n    case 'point':\n      {\n        if (details.objectb === undefined) {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          constraint = new Ammo.btPoint2PointConstraint(_objects[details.objecta], _vec3_1);\n        } else {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          constraint = new Ammo.btPoint2PointConstraint(_objects[details.objecta], _objects[details.objectb], _vec3_1, _vec3_2);\n        }\n        break;\n      }\n    case 'hinge':\n      {\n        if (details.objectb === undefined) {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          _vec3_2.setX(details.axis.x);\n          _vec3_2.setY(details.axis.y);\n          _vec3_2.setZ(details.axis.z);\n\n          constraint = new Ammo.btHingeConstraint(_objects[details.objecta], _vec3_1, _vec3_2);\n        } else {\n          _vec3_1.setX(details.positiona.x);\n          _vec3_1.setY(details.positiona.y);\n          _vec3_1.setZ(details.positiona.z);\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          _vec3_3.setX(details.axis.x);\n          _vec3_3.setY(details.axis.y);\n          _vec3_3.setZ(details.axis.z);\n\n          constraint = new Ammo.btHingeConstraint(_objects[details.objecta], _objects[details.objectb], _vec3_1, _vec3_2, _vec3_3, _vec3_3);\n        }\n        break;\n      }\n    case 'slider':\n      {\n        var transformb = void 0;\n        var transforma = new Ammo.btTransform();\n\n        _vec3_1.setX(details.positiona.x);\n        _vec3_1.setY(details.positiona.y);\n        _vec3_1.setZ(details.positiona.z);\n\n        transforma.setOrigin(_vec3_1);\n\n        var rotation = transforma.getRotation();\n        rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);\n        transforma.setRotation(rotation);\n\n        if (details.objectb) {\n          transformb = new Ammo.btTransform();\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          transformb.setOrigin(_vec3_2);\n\n          rotation = transformb.getRotation();\n          rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);\n          transformb.setRotation(rotation);\n\n          constraint = new Ammo.btSliderConstraint(_objects[details.objecta], _objects[details.objectb], transforma, transformb, true);\n        } else {\n          constraint = new Ammo.btSliderConstraint(_objects[details.objecta], transforma, true);\n        }\n\n        constraint.ta = transforma;\n        constraint.tb = transformb;\n\n        Ammo.destroy(transforma);\n        if (transformb !== undefined) Ammo.destroy(transformb);\n\n        break;\n      }\n    case 'conetwist':\n      {\n        var _transforma = new Ammo.btTransform();\n        _transforma.setIdentity();\n\n        var _transformb = new Ammo.btTransform();\n        _transformb.setIdentity();\n\n        _vec3_1.setX(details.positiona.x);\n        _vec3_1.setY(details.positiona.y);\n        _vec3_1.setZ(details.positiona.z);\n\n        _vec3_2.setX(details.positionb.x);\n        _vec3_2.setY(details.positionb.y);\n        _vec3_2.setZ(details.positionb.z);\n\n        _transforma.setOrigin(_vec3_1);\n        _transformb.setOrigin(_vec3_2);\n\n        var _rotation = _transforma.getRotation();\n        _rotation.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);\n        _transforma.setRotation(_rotation);\n\n        _rotation = _transformb.getRotation();\n        _rotation.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);\n        _transformb.setRotation(_rotation);\n\n        constraint = new Ammo.btConeTwistConstraint(_objects[details.objecta], _objects[details.objectb], _transforma, _transformb);\n\n        constraint.setLimit(Math.PI, 0, Math.PI);\n\n        constraint.ta = _transforma;\n        constraint.tb = _transformb;\n\n        Ammo.destroy(_transforma);\n        Ammo.destroy(_transformb);\n\n        break;\n      }\n    case 'dof':\n      {\n        var _transformb2 = void 0;\n\n        var _transforma2 = new Ammo.btTransform();\n        _transforma2.setIdentity();\n\n        _vec3_1.setX(details.positiona.x);\n        _vec3_1.setY(details.positiona.y);\n        _vec3_1.setZ(details.positiona.z);\n\n        _transforma2.setOrigin(_vec3_1);\n\n        var _rotation2 = _transforma2.getRotation();\n        _rotation2.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);\n        _transforma2.setRotation(_rotation2);\n\n        if (details.objectb) {\n          _transformb2 = new Ammo.btTransform();\n          _transformb2.setIdentity();\n\n          _vec3_2.setX(details.positionb.x);\n          _vec3_2.setY(details.positionb.y);\n          _vec3_2.setZ(details.positionb.z);\n\n          _transformb2.setOrigin(_vec3_2);\n\n          _rotation2 = _transformb2.getRotation();\n          _rotation2.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);\n          _transformb2.setRotation(_rotation2);\n\n          constraint = new Ammo.btGeneric6DofConstraint(_objects[details.objecta], _objects[details.objectb], _transforma2, _transformb2, true);\n        } else {\n          constraint = new Ammo.btGeneric6DofConstraint(_objects[details.objecta], _transforma2, true);\n        }\n\n        constraint.ta = _transforma2;\n        constraint.tb = _transformb2;\n\n        Ammo.destroy(_transforma2);\n        if (_transformb2 !== undefined) Ammo.destroy(_transformb2);\n\n        break;\n      }\n    default:\n      return;\n  }\n\n  world.addConstraint(constraint);\n\n  constraint.a = _objects[details.objecta];\n  constraint.b = _objects[details.objectb];\n\n  constraint.enableFeedback();\n  _constraints[details.id] = constraint;\n  _num_constraints++;\n\n  if (SUPPORT_TRANSFERABLE) {\n    constraintreport = new Float32Array(1 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )\n    constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;\n  } else constraintreport = [MESSAGE_TYPES.CONSTRAINTREPORT];\n};\n\npublic_functions.removeConstraint = function (details) {\n  var constraint = _constraints[details.id];\n\n  if (constraint !== undefined) {\n    world.removeConstraint(constraint);\n    _constraints[details.id] = null;\n    _num_constraints--;\n  }\n};\n\npublic_functions.constraint_setBreakingImpulseThreshold = function (details) {\n  var constraint = _constraints[details.id];\n  if (constraint !== undefind) constraint.setBreakingImpulseThreshold(details.threshold);\n};\n\npublic_functions.simulate = function () {\n  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  if (world) {\n    if (params.timeStep && params.timeStep < fixedTimeStep) params.timeStep = fixedTimeStep;\n\n    params.maxSubSteps = params.maxSubSteps || Math.ceil(params.timeStep / fixedTimeStep); // If maxSubSteps is not defined, keep the simulation fully up to date\n\n    world.stepSimulation(params.timeStep, params.maxSubSteps, fixedTimeStep);\n\n    if (_vehicles.length > 0) reportVehicles();\n    reportCollisions();\n    if (_constraints.length > 0) reportConstraints();\n    reportWorld();\n    if (_softbody_enabled) reportWorld_softbodies();\n  }\n};\n\n// Constraint functions\npublic_functions.hinge_setLimits = function (params) {\n  _constraints[params.constraint].setLimit(params.low, params.high, 0, params.bias_factor, params.relaxation_factor);\n};\n\npublic_functions.hinge_enableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.enableAngularMotor(true, params.velocity, params.acceleration);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.hinge_disableMotor = function (params) {\n  _constraints[params.constraint].enableMotor(false);\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_setLimits = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setLowerLinLimit(params.lin_lower || 0);\n  constraint.setUpperLinLimit(params.lin_upper || 0);\n\n  constraint.setLowerAngLimit(params.ang_lower || 0);\n  constraint.setUpperAngLimit(params.ang_upper || 0);\n};\n\npublic_functions.slider_setRestitution = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setSoftnessLimLin(params.linear || 0);\n  constraint.setSoftnessLimAng(params.angular || 0);\n};\n\npublic_functions.slider_enableLinearMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setTargetLinMotorVelocity(params.velocity);\n  constraint.setMaxLinMotorForce(params.acceleration);\n  constraint.setPoweredLinMotor(true);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_disableLinearMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setPoweredLinMotor(false);\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_enableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setTargetAngMotorVelocity(params.velocity);\n  constraint.setMaxAngMotorForce(params.acceleration);\n  constraint.setPoweredAngMotor(true);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.slider_disableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setPoweredAngMotor(false);\n  constraint.a.activate();\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.conetwist_setLimit = function (params) {\n  _constraints[params.constraint].setLimit(params.z, params.y, params.x); // ZYX order\n};\n\npublic_functions.conetwist_enableMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.enableMotor(true);\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.conetwist_setMaxMotorImpulse = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.setMaxMotorImpulse(params.max_impulse);\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.conetwist_setMotorTarget = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _quat.setX(params.x);\n  _quat.setY(params.y);\n  _quat.setZ(params.z);\n  _quat.setW(params.w);\n\n  constraint.setMotorTarget(_quat);\n\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.conetwist_disableMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n  constraint.enableMotor(false);\n  constraint.a.activate();\n  constraint.b.activate();\n};\n\npublic_functions.dof_setLinearLowerLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setLinearLowerLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_setLinearUpperLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setLinearUpperLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_setAngularLowerLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setAngularLowerLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_setAngularUpperLimit = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  _vec3_1.setX(params.x);\n  _vec3_1.setY(params.y);\n  _vec3_1.setZ(params.z);\n\n  constraint.setAngularUpperLimit(_vec3_1);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_enableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint];\n\n  var motor = constraint.getRotationalLimitMotor(params.which);\n  motor.set_m_enableMotor(true);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_configureAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint],\n      motor = constraint.getRotationalLimitMotor(params.which);\n\n  motor.set_m_loLimit(params.low_angle);\n  motor.set_m_hiLimit(params.high_angle);\n  motor.set_m_targetVelocity(params.velocity);\n  motor.set_m_maxMotorForce(params.max_force);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\npublic_functions.dof_disableAngularMotor = function (params) {\n  var constraint = _constraints[params.constraint],\n      motor = constraint.getRotationalLimitMotor(params.which);\n\n  motor.set_m_enableMotor(false);\n  constraint.a.activate();\n\n  if (constraint.b) constraint.b.activate();\n};\n\nvar reportWorld = function reportWorld() {\n  if (SUPPORT_TRANSFERABLE && worldreport.length < 2 + _num_rigidbody_objects * WORLDREPORT_ITEMSIZE) {\n    worldreport = new Float32Array(2 // message id & # objects in report\n    + Math.ceil(_num_rigidbody_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE // # of values needed * item size\n    );\n\n    worldreport[0] = MESSAGE_TYPES.WORLDREPORT;\n  }\n\n  worldreport[1] = _num_rigidbody_objects; // record how many objects we're reporting on\n\n  {\n    var i = 0,\n        index = _objects.length;\n\n    while (index--) {\n      var object = _objects[index];\n\n      if (object && object.type === 1) {\n        // RigidBodies.\n        // #TODO: we can't use center of mass transform when center of mass can change,\n        //        but getMotionState().getWorldTransform() screws up on objects that have been moved\n        // object.getMotionState().getWorldTransform( transform );\n        // object.getMotionState().getWorldTransform(_transform);\n\n        var transform = object.getCenterOfMassTransform();\n        var origin = transform.getOrigin();\n        var rotation = transform.getRotation();\n\n        // add values to report\n        var offset = 2 + i++ * WORLDREPORT_ITEMSIZE;\n\n        worldreport[offset] = object.id;\n\n        worldreport[offset + 1] = origin.x();\n        worldreport[offset + 2] = origin.y();\n        worldreport[offset + 3] = origin.z();\n\n        worldreport[offset + 4] = rotation.x();\n        worldreport[offset + 5] = rotation.y();\n        worldreport[offset + 6] = rotation.z();\n        worldreport[offset + 7] = rotation.w();\n\n        _vector = object.getLinearVelocity();\n        worldreport[offset + 8] = _vector.x();\n        worldreport[offset + 9] = _vector.y();\n        worldreport[offset + 10] = _vector.z();\n\n        _vector = object.getAngularVelocity();\n        worldreport[offset + 11] = _vector.x();\n        worldreport[offset + 12] = _vector.y();\n        worldreport[offset + 13] = _vector.z();\n      }\n    }\n  }\n\n  if (SUPPORT_TRANSFERABLE) transferableMessage(worldreport.buffer, [worldreport.buffer]);else transferableMessage(worldreport);\n};\n\nvar reportWorld_softbodies = function reportWorld_softbodies() {\n  // TODO: Add SUPPORTTRANSFERABLE.\n\n  softreport = new Float32Array(2 // message id & # objects in report\n  + _num_softbody_objects * 2 + _softbody_report_size * 6);\n\n  softreport[0] = MESSAGE_TYPES.SOFTREPORT;\n  softreport[1] = _num_softbody_objects; // record how many objects we're reporting on\n\n  {\n    var offset = 2,\n        index = _objects.length;\n\n    while (index--) {\n      var object = _objects[index];\n\n      if (object && object.type === 0) {\n        // SoftBodies.\n\n        softreport[offset] = object.id;\n\n        var offsetVert = offset + 2;\n\n        if (object.rope === true) {\n          var nodes = object.get_m_nodes();\n          var size = nodes.size();\n          softreport[offset + 1] = size;\n\n          for (var i = 0; i < size; i++) {\n            var node = nodes.at(i);\n            var vert = node.get_m_x();\n            var off = offsetVert + i * 3;\n\n            softreport[off] = vert.x();\n            softreport[off + 1] = vert.y();\n            softreport[off + 2] = vert.z();\n          }\n\n          offset += size * 6 + 2;\n        } else if (object.cloth) {\n          var _nodes = object.get_m_nodes();\n          var _size = _nodes.size();\n          softreport[offset + 1] = _size;\n\n          for (var _i3 = 0; _i3 < _size; _i3++) {\n            var _node = _nodes.at(_i3);\n            var _vert = _node.get_m_x();\n            var normal = _node.get_m_n();\n            var _off = offsetVert + _i3 * 6;\n\n            softreport[_off] = _vert.x();\n            softreport[_off + 1] = _vert.y();\n            softreport[_off + 2] = _vert.z();\n\n            softreport[_off + 3] = normal.x();\n            softreport[_off + 4] = normal.y();\n            softreport[_off + 5] = normal.z();\n          }\n\n          offset += _size * 6 + 2;\n        } else {\n          var faces = object.get_m_faces();\n          var _size2 = faces.size();\n          softreport[offset + 1] = _size2;\n\n          for (var _i4 = 0; _i4 < _size2; _i4++) {\n            var face = faces.at(_i4);\n\n            var node1 = face.get_m_n(0);\n            var node2 = face.get_m_n(1);\n            var node3 = face.get_m_n(2);\n\n            var vert1 = node1.get_m_x();\n            var vert2 = node2.get_m_x();\n            var vert3 = node3.get_m_x();\n\n            var normal1 = node1.get_m_n();\n            var normal2 = node2.get_m_n();\n            var normal3 = node3.get_m_n();\n\n            var _off2 = offsetVert + _i4 * 18;\n\n            softreport[_off2] = vert1.x();\n            softreport[_off2 + 1] = vert1.y();\n            softreport[_off2 + 2] = vert1.z();\n\n            softreport[_off2 + 3] = normal1.x();\n            softreport[_off2 + 4] = normal1.y();\n            softreport[_off2 + 5] = normal1.z();\n\n            softreport[_off2 + 6] = vert2.x();\n            softreport[_off2 + 7] = vert2.y();\n            softreport[_off2 + 8] = vert2.z();\n\n            softreport[_off2 + 9] = normal2.x();\n            softreport[_off2 + 10] = normal2.y();\n            softreport[_off2 + 11] = normal2.z();\n\n            softreport[_off2 + 12] = vert3.x();\n            softreport[_off2 + 13] = vert3.y();\n            softreport[_off2 + 14] = vert3.z();\n\n            softreport[_off2 + 15] = normal3.x();\n            softreport[_off2 + 16] = normal3.y();\n            softreport[_off2 + 17] = normal3.z();\n          }\n\n          offset += _size2 * 18 + 2;\n        }\n      }\n    }\n  }\n\n  // if (SUPPORT_TRANSFERABLE) transferableMessage(softreport.buffer, [softreport.buffer]);\n  // else transferableMessage(softreport);\n  transferableMessage(softreport);\n};\n\nvar reportCollisions = function reportCollisions() {\n  var dp = world.getDispatcher(),\n      num = dp.getNumManifolds();\n  // _collided = false;\n\n  if (SUPPORT_TRANSFERABLE) {\n    if (collisionreport.length < 2 + num * COLLISIONREPORT_ITEMSIZE) {\n      collisionreport = new Float32Array(2 // message id & # objects in report\n      + Math.ceil(_num_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE // # of values needed * item size\n      );\n      collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;\n    }\n  }\n\n  collisionreport[1] = 0; // how many collisions we're reporting on\n\n  for (var i = 0; i < num; i++) {\n    var manifold = dp.getManifoldByIndexInternal(i),\n        num_contacts = manifold.getNumContacts();\n\n    if (num_contacts === 0) continue;\n\n    for (var j = 0; j < num_contacts; j++) {\n      var pt = manifold.getContactPoint(j);\n\n      // if ( pt.getDistance() < 0 ) {\n      var offset = 2 + collisionreport[1]++ * COLLISIONREPORT_ITEMSIZE;\n      collisionreport[offset] = _objects_ammo[manifold.getBody0().ptr];\n      collisionreport[offset + 1] = _objects_ammo[manifold.getBody1().ptr];\n\n      _vector = pt.get_m_normalWorldOnB();\n      collisionreport[offset + 2] = _vector.x();\n      collisionreport[offset + 3] = _vector.y();\n      collisionreport[offset + 4] = _vector.z();\n      break;\n      // }\n      // transferableMessage(_objects_ammo);\n    }\n  }\n\n  if (SUPPORT_TRANSFERABLE) transferableMessage(collisionreport.buffer, [collisionreport.buffer]);else transferableMessage(collisionreport);\n};\n\nvar reportVehicles = function reportVehicles() {\n  if (SUPPORT_TRANSFERABLE) {\n    if (vehiclereport.length < 2 + _num_wheels * VEHICLEREPORT_ITEMSIZE) {\n      vehiclereport = new Float32Array(2 // message id & # objects in report\n      + Math.ceil(_num_wheels / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * VEHICLEREPORT_ITEMSIZE // # of values needed * item size\n      );\n      vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;\n    }\n  }\n\n  {\n    var i = 0,\n        j = 0,\n        index = _vehicles.length;\n\n    while (index--) {\n      if (_vehicles[index]) {\n        var vehicle = _vehicles[index];\n\n        for (j = 0; j < vehicle.getNumWheels(); j++) {\n          // vehicle.updateWheelTransform( j, true );\n          // transform = vehicle.getWheelTransformWS( j );\n          var transform = vehicle.getWheelInfo(j).get_m_worldTransform();\n\n          var origin = transform.getOrigin();\n          var rotation = transform.getRotation();\n\n          // add values to report\n          var offset = 1 + i++ * VEHICLEREPORT_ITEMSIZE;\n\n          vehiclereport[offset] = index;\n          vehiclereport[offset + 1] = j;\n\n          vehiclereport[offset + 2] = origin.x();\n          vehiclereport[offset + 3] = origin.y();\n          vehiclereport[offset + 4] = origin.z();\n\n          vehiclereport[offset + 5] = rotation.x();\n          vehiclereport[offset + 6] = rotation.y();\n          vehiclereport[offset + 7] = rotation.z();\n          vehiclereport[offset + 8] = rotation.w();\n        }\n      }\n    }\n\n    if (SUPPORT_TRANSFERABLE && j !== 0) transferableMessage(vehiclereport.buffer, [vehiclereport.buffer]);else if (j !== 0) transferableMessage(vehiclereport);\n  }\n};\n\nvar reportConstraints = function reportConstraints() {\n  if (SUPPORT_TRANSFERABLE) {\n    if (constraintreport.length < 2 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE) {\n      constraintreport = new Float32Array(2 // message id & # objects in report\n      + Math.ceil(_num_constraints / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE * CONSTRAINTREPORT_ITEMSIZE // # of values needed * item size\n      );\n      constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;\n    }\n  }\n\n  {\n    var offset = 0,\n        i = 0,\n        index = _constraints.lenght;\n\n    while (index--) {\n      if (_constraints[index]) {\n        var _constraint = _constraints[index];\n        var offset_body = _constraint.a;\n        var transform = _constraint.ta;\n        var origin = transform.getOrigin();\n\n        // add values to report\n        offset = 1 + i++ * CONSTRAINTREPORT_ITEMSIZE;\n\n        constraintreport[offset] = index;\n        constraintreport[offset + 1] = offset_body.id;\n        constraintreport[offset + 2] = origin.x;\n        constraintreport[offset + 3] = origin.y;\n        constraintreport[offset + 4] = origin.z;\n        constraintreport[offset + 5] = _constraint.getBreakingImpulseThreshold();\n      }\n    }\n\n    if (SUPPORT_TRANSFERABLE && i !== 0) transferableMessage(constraintreport.buffer, [constraintreport.buffer]);else if (i !== 0) transferableMessage(constraintreport);\n  }\n};\n\nself.onmessage = function (event) {\n  if (event.data instanceof Float32Array) {\n    // transferable object\n    switch (event.data[0]) {\n      case MESSAGE_TYPES.WORLDREPORT:\n        {\n          worldreport = new Float32Array(event.data);\n          break;\n        }\n      case MESSAGE_TYPES.COLLISIONREPORT:\n        {\n          collisionreport = new Float32Array(event.data);\n          break;\n        }\n      case MESSAGE_TYPES.VEHICLEREPORT:\n        {\n          vehiclereport = new Float32Array(event.data);\n          break;\n        }\n      case MESSAGE_TYPES.CONSTRAINTREPORT:\n        {\n          constraintreport = new Float32Array(event.data);\n          break;\n        }\n      default:\n    }\n\n    return;\n  } else if (event.data.cmd && public_functions[event.data.cmd]) public_functions[event.data.cmd](event.data.params);\n};\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzhmMTNkMjZhOTEyMmMxZTZhNmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci5qcyJdLCJuYW1lcyI6WyJ0cmFuc2ZlcmFibGVNZXNzYWdlIiwic2VsZiIsIndlYmtpdFBvc3RNZXNzYWdlIiwicG9zdE1lc3NhZ2UiLCJNRVNTQUdFX1RZUEVTIiwiV09STERSRVBPUlQiLCJDT0xMSVNJT05SRVBPUlQiLCJWRUhJQ0xFUkVQT1JUIiwiQ09OU1RSQUlOVFJFUE9SVCIsIlNPRlRSRVBPUlQiLCJfb2JqZWN0IiwiX3ZlY3RvciIsIl90cmFuc2Zvcm0iLCJfdHJhbnNmb3JtX3BvcyIsIl9zb2Z0Ym9keV9lbmFibGVkIiwibGFzdF9zaW11bGF0aW9uX2R1cmF0aW9uIiwiX251bV9vYmplY3RzIiwiX251bV9yaWdpZGJvZHlfb2JqZWN0cyIsIl9udW1fc29mdGJvZHlfb2JqZWN0cyIsIl9udW1fd2hlZWxzIiwiX251bV9jb25zdHJhaW50cyIsIl9zb2Z0Ym9keV9yZXBvcnRfc2l6ZSIsImZpeGVkVGltZVN0ZXAiLCJsYXN0X3NpbXVsYXRpb25fdGltZSIsIndvcmxkIiwiX3ZlYzNfMSIsIl92ZWMzXzIiLCJfdmVjM18zIiwiX3F1YXQiLCJwdWJsaWNfZnVuY3Rpb25zIiwiX29iamVjdHMiLCJfdmVoaWNsZXMiLCJfY29uc3RyYWludHMiLCJfb2JqZWN0c19hbW1vIiwiX29iamVjdF9zaGFwZXMiLCJfbW90aW9uX3N0YXRlcyIsIl9ub25jYWNoZWRfc2hhcGVzIiwiX2NvbXBvdW5kX3NoYXBlcyIsIlJFUE9SVF9DSFVOS1NJWkUiLCJ3b3JsZHJlcG9ydCIsInNvZnRyZXBvcnQiLCJjb2xsaXNpb25yZXBvcnQiLCJ2ZWhpY2xlcmVwb3J0IiwiY29uc3RyYWludHJlcG9ydCIsIldPUkxEUkVQT1JUX0lURU1TSVpFIiwiQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFIiwiVkVISUNMRVJFUE9SVF9JVEVNU0laRSIsIkNPTlNUUkFJTlRSRVBPUlRfSVRFTVNJWkUiLCJhYiIsIkFycmF5QnVmZmVyIiwiU1VQUE9SVF9UUkFOU0ZFUkFCTEUiLCJieXRlTGVuZ3RoIiwiZ2V0U2hhcGVGcm9tQ2FjaGUiLCJjYWNoZV9rZXkiLCJ1bmRlZmluZWQiLCJzZXRTaGFwZUNhY2hlIiwic2hhcGUiLCJjcmVhdGVTaGFwZSIsImRlc2NyaXB0aW9uIiwic2V0SWRlbnRpdHkiLCJ0eXBlIiwiQW1tbyIsImJ0Q29tcG91bmRTaGFwZSIsIm5vcm1hbCIsIngiLCJ5IiwieiIsInNldFgiLCJzZXRZIiwic2V0WiIsImJ0U3RhdGljUGxhbmVTaGFwZSIsIndpZHRoIiwiaGVpZ2h0IiwiZGVwdGgiLCJidEJveFNoYXBlIiwicmFkaXVzIiwiYnRTcGhlcmVTaGFwZSIsImJ0Q3lsaW5kZXJTaGFwZSIsImJ0Q2Fwc3VsZVNoYXBlIiwiYnRDb25lU2hhcGUiLCJ0cmlhbmdsZV9tZXNoIiwiYnRUcmlhbmdsZU1lc2giLCJkYXRhIiwibGVuZ3RoIiwiaSIsImFkZFRyaWFuZ2xlIiwiYnRCdmhUcmlhbmdsZU1lc2hTaGFwZSIsImlkIiwiYnRDb252ZXhIdWxsU2hhcGUiLCJhZGRQb2ludCIsInhwdHMiLCJ5cHRzIiwicG9pbnRzIiwicHRyIiwiX21hbGxvYyIsInAiLCJwMiIsImoiLCJIRUFQRjMyIiwiYnRIZWlnaHRmaWVsZFRlcnJhaW5TaGFwZSIsImFic01heEhlaWdodCIsImNyZWF0ZVNvZnRCb2R5IiwiYm9keSIsInNvZnRCb2R5SGVscGVycyIsImJ0U29mdEJvZHlIZWxwZXJzIiwiYVZlcnRpY2VzIiwiQ3JlYXRlRnJvbVRyaU1lc2giLCJnZXRXb3JsZEluZm8iLCJhSW5kaWNlcyIsImNyIiwiY29ybmVycyIsIkNyZWF0ZVBhdGNoIiwiYnRWZWN0b3IzIiwic2VnbWVudHMiLCJDcmVhdGVSb3BlIiwiaW5pdCIsInBhcmFtcyIsIndhc21CdWZmZXIiLCJpbXBvcnRTY3JpcHRzIiwiYW1tbyIsImxvYWRBbW1vRnJvbUJpbmFyeSIsImNtZCIsIm1ha2VXb3JsZCIsImJ0VHJhbnNmb3JtIiwiYnRRdWF0ZXJuaW9uIiwicmVwb3J0c2l6ZSIsIkZsb2F0MzJBcnJheSIsImNvbGxpc2lvbkNvbmZpZ3VyYXRpb24iLCJzb2Z0Ym9keSIsImJ0U29mdEJvZHlSaWdpZEJvZHlDb2xsaXNpb25Db25maWd1cmF0aW9uIiwiYnREZWZhdWx0Q29sbGlzaW9uQ29uZmlndXJhdGlvbiIsImRpc3BhdGNoZXIiLCJidENvbGxpc2lvbkRpc3BhdGNoZXIiLCJzb2x2ZXIiLCJidFNlcXVlbnRpYWxJbXB1bHNlQ29uc3RyYWludFNvbHZlciIsImJyb2FkcGhhc2UiLCJhYWJibWluIiwiYWFiYm1heCIsImJ0QXhpc1N3ZWVwMyIsImJ0RGJ2dEJyb2FkcGhhc2UiLCJidFNvZnRSaWdpZER5bmFtaWNzV29ybGQiLCJidERlZmF1bHRTb2Z0Qm9keVNvbHZlciIsImJ0RGlzY3JldGVEeW5hbWljc1dvcmxkIiwic2V0Rml4ZWRUaW1lU3RlcCIsInNldEdyYXZpdHkiLCJhcHBlbmRBbmNob3IiLCJvYmoiLCJub2RlIiwib2JqMiIsImNvbGxpc2lvbkJldHdlZW5MaW5rZWRCb2RpZXMiLCJpbmZsdWVuY2UiLCJhZGRPYmplY3QiLCJtb3Rpb25TdGF0ZSIsImluZGV4T2YiLCJzYkNvbmZpZyIsImdldF9tX2NmZyIsInZpdGVyYXRpb25zIiwic2V0X3ZpdGVyYXRpb25zIiwicGl0ZXJhdGlvbnMiLCJzZXRfcGl0ZXJhdGlvbnMiLCJkaXRlcmF0aW9ucyIsInNldF9kaXRlcmF0aW9ucyIsImNpdGVyYXRpb25zIiwic2V0X2NpdGVyYXRpb25zIiwic2V0X2NvbGxpc2lvbnMiLCJzZXRfa0RGIiwiZnJpY3Rpb24iLCJzZXRfa0RQIiwiZGFtcGluZyIsInByZXNzdXJlIiwic2V0X2tQUiIsImRyYWciLCJzZXRfa0RHIiwibGlmdCIsInNldF9rTEYiLCJhbmNob3JIYXJkbmVzcyIsInNldF9rQUhSIiwicmlnaWRIYXJkbmVzcyIsInNldF9rQ0hSIiwia2xzdCIsImdldF9tX21hdGVyaWFscyIsImF0Iiwic2V0X21fa0xTVCIsImthc3QiLCJzZXRfbV9rQVNUIiwia3ZzdCIsInNldF9tX2tWU1QiLCJjYXN0T2JqZWN0IiwiYnRDb2xsaXNpb25PYmplY3QiLCJnZXRDb2xsaXNpb25TaGFwZSIsInNldE1hcmdpbiIsIm1hcmdpbiIsInNldEFjdGl2YXRpb25TdGF0ZSIsInN0YXRlIiwicm9wZSIsImNsb3RoIiwicG9zaXRpb24iLCJzZXRPcmlnaW4iLCJyb3RhdGlvbiIsInNldFciLCJ3Iiwic2V0Um90YXRpb24iLCJ0cmFuc2Zvcm0iLCJzZXRUb3RhbE1hc3MiLCJtYXNzIiwiYWRkU29mdEJvZHkiLCJnZXRfbV9mYWNlcyIsInNpemUiLCJnZXRfbV9ub2RlcyIsImNoaWxkcmVuIiwiY29tcG91bmRfc2hhcGUiLCJhZGRDaGlsZFNoYXBlIiwiX2NoaWxkIiwidHJhbnMiLCJwb3NpdGlvbl9vZmZzZXQiLCJkZXN0cm95Iiwic2NhbGUiLCJzZXRMb2NhbFNjYWxpbmciLCJjYWxjdWxhdGVMb2NhbEluZXJ0aWEiLCJidERlZmF1bHRNb3Rpb25TdGF0ZSIsInJiSW5mbyIsImJ0UmlnaWRCb2R5Q29uc3RydWN0aW9uSW5mbyIsInNldF9tX2ZyaWN0aW9uIiwic2V0X21fcmVzdGl0dXRpb24iLCJyZXN0aXR1dGlvbiIsInNldF9tX2xpbmVhckRhbXBpbmciLCJzZXRfbV9hbmd1bGFyRGFtcGluZyIsImJ0UmlnaWRCb2R5IiwiY29sbGlzaW9uX2ZsYWdzIiwic2V0Q29sbGlzaW9uRmxhZ3MiLCJncm91cCIsIm1hc2siLCJhZGRSaWdpZEJvZHkiLCJhY3RpdmF0ZSIsImEiLCJhZGRWZWhpY2xlIiwidmVoaWNsZV90dW5pbmciLCJidFZlaGljbGVUdW5pbmciLCJzZXRfbV9zdXNwZW5zaW9uU3RpZmZuZXNzIiwic3VzcGVuc2lvbl9zdGlmZm5lc3MiLCJzZXRfbV9zdXNwZW5zaW9uQ29tcHJlc3Npb24iLCJzdXNwZW5zaW9uX2NvbXByZXNzaW9uIiwic2V0X21fc3VzcGVuc2lvbkRhbXBpbmciLCJzdXNwZW5zaW9uX2RhbXBpbmciLCJzZXRfbV9tYXhTdXNwZW5zaW9uVHJhdmVsQ20iLCJtYXhfc3VzcGVuc2lvbl90cmF2ZWwiLCJzZXRfbV9tYXhTdXNwZW5zaW9uRm9yY2UiLCJtYXhfc3VzcGVuc2lvbl9mb3JjZSIsInZlaGljbGUiLCJidFJheWNhc3RWZWhpY2xlIiwicmlnaWRCb2R5IiwiYnREZWZhdWx0VmVoaWNsZVJheWNhc3RlciIsInR1bmluZyIsInNldENvb3JkaW5hdGVTeXN0ZW0iLCJyZW1vdmVWZWhpY2xlIiwiYWRkV2hlZWwiLCJjb25uZWN0aW9uX3BvaW50Iiwid2hlZWxfZGlyZWN0aW9uIiwid2hlZWxfYXhsZSIsInN1c3BlbnNpb25fcmVzdF9sZW5ndGgiLCJ3aGVlbF9yYWRpdXMiLCJpc19mcm9udF93aGVlbCIsInNldFN0ZWVyaW5nIiwiZGV0YWlscyIsInNldFN0ZWVyaW5nVmFsdWUiLCJzdGVlcmluZyIsIndoZWVsIiwic2V0QnJha2UiLCJicmFrZSIsImFwcGx5RW5naW5lRm9yY2UiLCJmb3JjZSIsInJlbW92ZU9iamVjdCIsInJlbW92ZVNvZnRCb2R5IiwicmVtb3ZlUmlnaWRCb2R5IiwidXBkYXRlVHJhbnNmb3JtIiwiZ2V0TW90aW9uU3RhdGUiLCJnZXRXb3JsZFRyYW5zZm9ybSIsInBvcyIsInF1YXQiLCJzZXRXb3JsZFRyYW5zZm9ybSIsInVwZGF0ZU1hc3MiLCJzZXRNYXNzUHJvcHMiLCJhcHBseUNlbnRyYWxJbXB1bHNlIiwiYXBwbHlJbXB1bHNlIiwiaW1wdWxzZV94IiwiaW1wdWxzZV95IiwiaW1wdWxzZV96IiwiYXBwbHlUb3JxdWUiLCJ0b3JxdWVfeCIsInRvcnF1ZV95IiwidG9ycXVlX3oiLCJhcHBseUNlbnRyYWxGb3JjZSIsImFwcGx5Rm9yY2UiLCJmb3JjZV94IiwiZm9yY2VfeSIsImZvcmNlX3oiLCJvblNpbXVsYXRpb25SZXN1bWUiLCJEYXRlIiwibm93Iiwic2V0QW5ndWxhclZlbG9jaXR5Iiwic2V0TGluZWFyVmVsb2NpdHkiLCJzZXRBbmd1bGFyRmFjdG9yIiwic2V0TGluZWFyRmFjdG9yIiwic2V0RGFtcGluZyIsImxpbmVhciIsImFuZ3VsYXIiLCJzZXRDY2RNb3Rpb25UaHJlc2hvbGQiLCJ0aHJlc2hvbGQiLCJzZXRDY2RTd2VwdFNwaGVyZVJhZGl1cyIsImFkZENvbnN0cmFpbnQiLCJjb25zdHJhaW50Iiwib2JqZWN0YiIsInBvc2l0aW9uYSIsImJ0UG9pbnQyUG9pbnRDb25zdHJhaW50Iiwib2JqZWN0YSIsInBvc2l0aW9uYiIsImF4aXMiLCJidEhpbmdlQ29uc3RyYWludCIsInRyYW5zZm9ybWIiLCJ0cmFuc2Zvcm1hIiwiZ2V0Um90YXRpb24iLCJzZXRFdWxlciIsImJ0U2xpZGVyQ29uc3RyYWludCIsInRhIiwidGIiLCJzZXRFdWxlclpZWCIsImF4aXNhIiwiYXhpc2IiLCJidENvbmVUd2lzdENvbnN0cmFpbnQiLCJzZXRMaW1pdCIsIk1hdGgiLCJQSSIsImJ0R2VuZXJpYzZEb2ZDb25zdHJhaW50IiwiYiIsImVuYWJsZUZlZWRiYWNrIiwicmVtb3ZlQ29uc3RyYWludCIsImNvbnN0cmFpbnRfc2V0QnJlYWtpbmdJbXB1bHNlVGhyZXNob2xkIiwidW5kZWZpbmQiLCJzZXRCcmVha2luZ0ltcHVsc2VUaHJlc2hvbGQiLCJzaW11bGF0ZSIsInRpbWVTdGVwIiwibWF4U3ViU3RlcHMiLCJjZWlsIiwic3RlcFNpbXVsYXRpb24iLCJyZXBvcnRWZWhpY2xlcyIsInJlcG9ydENvbGxpc2lvbnMiLCJyZXBvcnRDb25zdHJhaW50cyIsInJlcG9ydFdvcmxkIiwicmVwb3J0V29ybGRfc29mdGJvZGllcyIsImhpbmdlX3NldExpbWl0cyIsImxvdyIsImhpZ2giLCJiaWFzX2ZhY3RvciIsInJlbGF4YXRpb25fZmFjdG9yIiwiaGluZ2VfZW5hYmxlQW5ndWxhck1vdG9yIiwiZW5hYmxlQW5ndWxhck1vdG9yIiwidmVsb2NpdHkiLCJhY2NlbGVyYXRpb24iLCJoaW5nZV9kaXNhYmxlTW90b3IiLCJlbmFibGVNb3RvciIsInNsaWRlcl9zZXRMaW1pdHMiLCJzZXRMb3dlckxpbkxpbWl0IiwibGluX2xvd2VyIiwic2V0VXBwZXJMaW5MaW1pdCIsImxpbl91cHBlciIsInNldExvd2VyQW5nTGltaXQiLCJhbmdfbG93ZXIiLCJzZXRVcHBlckFuZ0xpbWl0IiwiYW5nX3VwcGVyIiwic2xpZGVyX3NldFJlc3RpdHV0aW9uIiwic2V0U29mdG5lc3NMaW1MaW4iLCJzZXRTb2Z0bmVzc0xpbUFuZyIsInNsaWRlcl9lbmFibGVMaW5lYXJNb3RvciIsInNldFRhcmdldExpbk1vdG9yVmVsb2NpdHkiLCJzZXRNYXhMaW5Nb3RvckZvcmNlIiwic2V0UG93ZXJlZExpbk1vdG9yIiwic2xpZGVyX2Rpc2FibGVMaW5lYXJNb3RvciIsInNsaWRlcl9lbmFibGVBbmd1bGFyTW90b3IiLCJzZXRUYXJnZXRBbmdNb3RvclZlbG9jaXR5Iiwic2V0TWF4QW5nTW90b3JGb3JjZSIsInNldFBvd2VyZWRBbmdNb3RvciIsInNsaWRlcl9kaXNhYmxlQW5ndWxhck1vdG9yIiwiY29uZXR3aXN0X3NldExpbWl0IiwiY29uZXR3aXN0X2VuYWJsZU1vdG9yIiwiY29uZXR3aXN0X3NldE1heE1vdG9ySW1wdWxzZSIsInNldE1heE1vdG9ySW1wdWxzZSIsIm1heF9pbXB1bHNlIiwiY29uZXR3aXN0X3NldE1vdG9yVGFyZ2V0Iiwic2V0TW90b3JUYXJnZXQiLCJjb25ldHdpc3RfZGlzYWJsZU1vdG9yIiwiZG9mX3NldExpbmVhckxvd2VyTGltaXQiLCJzZXRMaW5lYXJMb3dlckxpbWl0IiwiZG9mX3NldExpbmVhclVwcGVyTGltaXQiLCJzZXRMaW5lYXJVcHBlckxpbWl0IiwiZG9mX3NldEFuZ3VsYXJMb3dlckxpbWl0Iiwic2V0QW5ndWxhckxvd2VyTGltaXQiLCJkb2Zfc2V0QW5ndWxhclVwcGVyTGltaXQiLCJzZXRBbmd1bGFyVXBwZXJMaW1pdCIsImRvZl9lbmFibGVBbmd1bGFyTW90b3IiLCJtb3RvciIsImdldFJvdGF0aW9uYWxMaW1pdE1vdG9yIiwid2hpY2giLCJzZXRfbV9lbmFibGVNb3RvciIsImRvZl9jb25maWd1cmVBbmd1bGFyTW90b3IiLCJzZXRfbV9sb0xpbWl0IiwibG93X2FuZ2xlIiwic2V0X21faGlMaW1pdCIsImhpZ2hfYW5nbGUiLCJzZXRfbV90YXJnZXRWZWxvY2l0eSIsInNldF9tX21heE1vdG9yRm9yY2UiLCJtYXhfZm9yY2UiLCJkb2ZfZGlzYWJsZUFuZ3VsYXJNb3RvciIsImluZGV4Iiwib2JqZWN0IiwiZ2V0Q2VudGVyT2ZNYXNzVHJhbnNmb3JtIiwib3JpZ2luIiwiZ2V0T3JpZ2luIiwib2Zmc2V0IiwiZ2V0TGluZWFyVmVsb2NpdHkiLCJnZXRBbmd1bGFyVmVsb2NpdHkiLCJidWZmZXIiLCJvZmZzZXRWZXJ0Iiwibm9kZXMiLCJ2ZXJ0IiwiZ2V0X21feCIsIm9mZiIsImdldF9tX24iLCJmYWNlcyIsImZhY2UiLCJub2RlMSIsIm5vZGUyIiwibm9kZTMiLCJ2ZXJ0MSIsInZlcnQyIiwidmVydDMiLCJub3JtYWwxIiwibm9ybWFsMiIsIm5vcm1hbDMiLCJkcCIsImdldERpc3BhdGNoZXIiLCJudW0iLCJnZXROdW1NYW5pZm9sZHMiLCJtYW5pZm9sZCIsImdldE1hbmlmb2xkQnlJbmRleEludGVybmFsIiwibnVtX2NvbnRhY3RzIiwiZ2V0TnVtQ29udGFjdHMiLCJwdCIsImdldENvbnRhY3RQb2ludCIsImdldEJvZHkwIiwiZ2V0Qm9keTEiLCJnZXRfbV9ub3JtYWxXb3JsZE9uQiIsImdldE51bVdoZWVscyIsImdldFdoZWVsSW5mbyIsImdldF9tX3dvcmxkVHJhbnNmb3JtIiwibGVuZ2h0Iiwib2Zmc2V0X2JvZHkiLCJnZXRCcmVha2luZ0ltcHVsc2VUaHJlc2hvbGQiLCJvbm1lc3NhZ2UiLCJldmVudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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WCxDQUFSO0FBQ0UsV0FBSzlFLGNBQWNDLFdBQW5CO0FBQWdDO0FBQzlCa0Msd0JBQWMsSUFBSXVGLFlBQUosQ0FBaUI0VSxNQUFNeFgsSUFBdkIsQ0FBZDtBQUNBO0FBQ0Q7QUFDRCxXQUFLOUUsY0FBY0UsZUFBbkI7QUFBb0M7QUFDbENtQyw0QkFBa0IsSUFBSXFGLFlBQUosQ0FBaUI0VSxNQUFNeFgsSUFBdkIsQ0FBbEI7QUFDQTtBQUNEO0FBQ0QsV0FBSzlFLGNBQWNHLGFBQW5CO0FBQWtDO0FBQ2hDbUMsMEJBQWdCLElBQUlvRixZQUFKLENBQWlCNFUsTUFBTXhYLElBQXZCLENBQWhCO0FBQ0E7QUFDRDtBQUNELFdBQUs5RSxjQUFjSSxnQkFBbkI7QUFBcUM7QUFDbkNtQyw2QkFBbUIsSUFBSW1GLFlBQUosQ0FBaUI0VSxNQUFNeFgsSUFBdkIsQ0FBbkI7QUFDQTtBQUNEO0FBQ0Q7QUFqQkY7O0FBb0JBO0FBQ0QsR0F2QkQsTUF1Qk8sSUFBSXdYLE1BQU14WCxJQUFOLENBQVd1QyxHQUFYLElBQWtCNUYsaUJBQWlCNmEsTUFBTXhYLElBQU4sQ0FBV3VDLEdBQTVCLENBQXRCLEVBQXdENUYsaUJBQWlCNmEsTUFBTXhYLElBQU4sQ0FBV3VDLEdBQTVCLEVBQWlDaVYsTUFBTXhYLElBQU4sQ0FBV2tDLE1BQTVDO0FBQ2hFLENBekJELEMiLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzhmMTNkMjZhOTEyMmMxZTZhNmEiLCJjb25zdCB0cmFuc2ZlcmFibGVNZXNzYWdlID0gc2VsZi53ZWJraXRQb3N0TWVzc2FnZSB8fCBzZWxmLnBvc3RNZXNzYWdlLFxuXG4gIC8vIGVudW1cbiAgTUVTU0FHRV9UWVBFUyA9IHtcbiAgICBXT1JMRFJFUE9SVDogMCxcbiAgICBDT0xMSVNJT05SRVBPUlQ6IDEsXG4gICAgVkVISUNMRVJFUE9SVDogMixcbiAgICBDT05TVFJBSU5UUkVQT1JUOiAzLFxuICAgIFNPRlRSRVBPUlQ6IDRcbiAgfTtcblxuICAvLyB0ZW1wIHZhcmlhYmxlc1xubGV0IF9vYmplY3QsXG4gIF92ZWN0b3IsXG4gIF90cmFuc2Zvcm0sXG4gIF90cmFuc2Zvcm1fcG9zLFxuICBfc29mdGJvZHlfZW5hYmxlZCA9IGZhbHNlLFxuICBsYXN0X3NpbXVsYXRpb25fZHVyYXRpb24gPSAwLFxuXG4gIF9udW1fb2JqZWN0cyA9IDAsXG4gIF9udW1fcmlnaWRib2R5X29iamVjdHMgPSAwLFxuICBfbnVtX3NvZnRib2R5X29iamVjdHMgPSAwLFxuICBfbnVtX3doZWVscyA9IDAsXG4gIF9udW1fY29uc3RyYWludHMgPSAwLFxuICBfc29mdGJvZHlfcmVwb3J0X3NpemUgPSAwLFxuXG4gIC8vIHdvcmxkIHZhcmlhYmxlc1xuICBmaXhlZFRpbWVTdGVwLCAvLyB1c2VkIHdoZW4gY2FsbGluZyBzdGVwU2ltdWxhdGlvblxuICBsYXN0X3NpbXVsYXRpb25fdGltZSxcblxuICB3b3JsZCxcbiAgX3ZlYzNfMSxcbiAgX3ZlYzNfMixcbiAgX3ZlYzNfMyxcbiAgX3F1YXQ7XG5cbiAgLy8gcHJpdmF0ZSBjYWNoZVxuY29uc3QgcHVibGljX2Z1bmN0aW9ucyA9IHt9LFxuICBfb2JqZWN0cyA9IFtdLFxuICBfdmVoaWNsZXMgPSBbXSxcbiAgX2NvbnN0cmFpbnRzID0gW10sXG4gIF9vYmplY3RzX2FtbW8gPSB7fSxcbiAgX29iamVjdF9zaGFwZXMgPSB7fSxcblxuICAvLyBUaGUgZm9sbG93aW5nIG9iamVjdHMgYXJlIHRvIHRyYWNrIG9iamVjdHMgdGhhdCBhbW1vLmpzIGRvZXNuJ3QgY2xlYW5cbiAgLy8gdXAuIEFsbCBhcmUgY2xlYW5lZCB1cCB3aGVuIHRoZXkncmUgY29ycmVzcG9uZGluZyBib2R5IGlzIGRlc3Ryb3llZC5cbiAgLy8gVW5mb3J0dW5hdGVseSwgaXQncyB2ZXJ5IGRpZmZpY3VsdCB0byBnZXQgYXQgdGhlc2Ugb2JqZWN0cyBmcm9tIHRoZVxuICAvLyBib2R5LCBzbyB3ZSBoYXZlIHRvIHRyYWNrIHRoZW0gb3Vyc2VsdmVzLlxuICBfbW90aW9uX3N0YXRlcyA9IHt9LFxuICAvLyBEb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IGl0IGZvciBjYWNoZWQgc2hhcGVzLlxuICBfbm9uY2FjaGVkX3NoYXBlcyA9IHt9LFxuICAvLyBBIGJvZHkgd2l0aCBhIGNvbXBvdW5kIHNoYXBlIGFsd2F5cyBoYXMgYSByZWd1bGFyIHNoYXBlIGFzIHdlbGwsIHNvIHdlXG4gIC8vIGhhdmUgdHJhY2sgdGhlbSBzZXBhcmF0ZWx5LlxuICBfY29tcG91bmRfc2hhcGVzID0ge307XG5cbiAgLy8gb2JqZWN0IHJlcG9ydGluZ1xubGV0IFJFUE9SVF9DSFVOS1NJWkUsIC8vIHJlcG9ydCBhcnJheSBpcyBpbmNyZWFzZWQgaW4gaW5jcmVtZW50cyBvZiB0aGlzIGNodW5rIHNpemVcbiAgd29ybGRyZXBvcnQsXG4gIHNvZnRyZXBvcnQsXG4gIGNvbGxpc2lvbnJlcG9ydCxcbiAgdmVoaWNsZXJlcG9ydCxcbiAgY29uc3RyYWludHJlcG9ydDtcblxuY29uc3QgV09STERSRVBPUlRfSVRFTVNJWkUgPSAxNCwgLy8gaG93IG1hbnkgZmxvYXQgdmFsdWVzIGVhY2ggcmVwb3J0ZWQgaXRlbSBuZWVkc1xuICBDT0xMSVNJT05SRVBPUlRfSVRFTVNJWkUgPSA1LCAvLyBvbmUgZmxvYXQgZm9yIGVhY2ggb2JqZWN0IGlkLCBhbmQgYSBWZWMzIGNvbnRhY3Qgbm9ybWFsXG4gIFZFSElDTEVSRVBPUlRfSVRFTVNJWkUgPSA5LCAvLyB2ZWhpY2xlIGlkLCB3aGVlbCBpbmRleCwgMyBmb3IgcG9zaXRpb24sIDQgZm9yIHJvdGF0aW9uXG4gIENPTlNUUkFJTlRSRVBPUlRfSVRFTVNJWkUgPSA2OyAvLyBjb25zdHJhaW50IGlkLCBvZmZzZXQgb2JqZWN0LCBvZmZzZXQsIGFwcGxpZWQgaW1wdWxzZVxuXG5jb25zdCBhYiA9IG5ldyBBcnJheUJ1ZmZlcigxKTtcblxudHJhbnNmZXJhYmxlTWVzc2FnZShhYiwgW2FiXSk7XG5jb25zdCBTVVBQT1JUX1RSQU5TRkVSQUJMRSA9IChhYi5ieXRlTGVuZ3RoID09PSAwKTtcblxuY29uc3QgZ2V0U2hhcGVGcm9tQ2FjaGUgPSAoY2FjaGVfa2V5KSA9PiB7XG4gIGlmIChfb2JqZWN0X3NoYXBlc1tjYWNoZV9rZXldICE9PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIF9vYmplY3Rfc2hhcGVzW2NhY2hlX2tleV07XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBzZXRTaGFwZUNhY2hlID0gKGNhY2hlX2tleSwgc2hhcGUpID0+IHtcbiAgX29iamVjdF9zaGFwZXNbY2FjaGVfa2V5XSA9IHNoYXBlO1xufTtcblxuY29uc3QgY3JlYXRlU2hhcGUgPSAoZGVzY3JpcHRpb24pID0+IHtcbiAgbGV0IHNoYXBlO1xuXG4gIF90cmFuc2Zvcm0uc2V0SWRlbnRpdHkoKTtcbiAgc3dpdGNoIChkZXNjcmlwdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnY29tcG91bmQnOiB7XG4gICAgICBzaGFwZSA9IG5ldyBBbW1vLmJ0Q29tcG91bmRTaGFwZSgpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAncGxhbmUnOiB7XG4gICAgICBjb25zdCBjYWNoZV9rZXkgPSBgcGxhbmVfJHtkZXNjcmlwdGlvbi5ub3JtYWwueH1fJHtkZXNjcmlwdGlvbi5ub3JtYWwueX1fJHtkZXNjcmlwdGlvbi5ub3JtYWwuen1gO1xuXG4gICAgICBpZiAoKHNoYXBlID0gZ2V0U2hhcGVGcm9tQ2FjaGUoY2FjaGVfa2V5KSkgPT09IG51bGwpIHtcbiAgICAgICAgX3ZlYzNfMS5zZXRYKGRlc2NyaXB0aW9uLm5vcm1hbC54KTtcbiAgICAgICAgX3ZlYzNfMS5zZXRZKGRlc2NyaXB0aW9uLm5vcm1hbC55KTtcbiAgICAgICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLm5vcm1hbC56KTtcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idFN0YXRpY1BsYW5lU2hhcGUoX3ZlYzNfMSwgMCk7XG4gICAgICAgIHNldFNoYXBlQ2FjaGUoY2FjaGVfa2V5LCBzaGFwZSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdib3gnOiB7XG4gICAgICBjb25zdCBjYWNoZV9rZXkgPSBgYm94XyR7ZGVzY3JpcHRpb24ud2lkdGh9XyR7ZGVzY3JpcHRpb24uaGVpZ2h0fV8ke2Rlc2NyaXB0aW9uLmRlcHRofWA7XG5cbiAgICAgIGlmICgoc2hhcGUgPSBnZXRTaGFwZUZyb21DYWNoZShjYWNoZV9rZXkpKSA9PT0gbnVsbCkge1xuICAgICAgICBfdmVjM18xLnNldFgoZGVzY3JpcHRpb24ud2lkdGggLyAyKTtcbiAgICAgICAgX3ZlYzNfMS5zZXRZKGRlc2NyaXB0aW9uLmhlaWdodCAvIDIpO1xuICAgICAgICBfdmVjM18xLnNldFooZGVzY3JpcHRpb24uZGVwdGggLyAyKTtcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idEJveFNoYXBlKF92ZWMzXzEpO1xuICAgICAgICBzZXRTaGFwZUNhY2hlKGNhY2hlX2tleSwgc2hhcGUpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnc3BoZXJlJzoge1xuICAgICAgY29uc3QgY2FjaGVfa2V5ID0gYHNwaGVyZV8ke2Rlc2NyaXB0aW9uLnJhZGl1c31gO1xuXG4gICAgICBpZiAoKHNoYXBlID0gZ2V0U2hhcGVGcm9tQ2FjaGUoY2FjaGVfa2V5KSkgPT09IG51bGwpIHtcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idFNwaGVyZVNoYXBlKGRlc2NyaXB0aW9uLnJhZGl1cyk7XG4gICAgICAgIHNldFNoYXBlQ2FjaGUoY2FjaGVfa2V5LCBzaGFwZSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdjeWxpbmRlcic6IHtcbiAgICAgIGNvbnN0IGNhY2hlX2tleSA9IGBjeWxpbmRlcl8ke2Rlc2NyaXB0aW9uLndpZHRofV8ke2Rlc2NyaXB0aW9uLmhlaWdodH1fJHtkZXNjcmlwdGlvbi5kZXB0aH1gO1xuXG4gICAgICBpZiAoKHNoYXBlID0gZ2V0U2hhcGVGcm9tQ2FjaGUoY2FjaGVfa2V5KSkgPT09IG51bGwpIHtcbiAgICAgICAgX3ZlYzNfMS5zZXRYKGRlc2NyaXB0aW9uLndpZHRoIC8gMik7XG4gICAgICAgIF92ZWMzXzEuc2V0WShkZXNjcmlwdGlvbi5oZWlnaHQgLyAyKTtcbiAgICAgICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLmRlcHRoIC8gMik7XG4gICAgICAgIHNoYXBlID0gbmV3IEFtbW8uYnRDeWxpbmRlclNoYXBlKF92ZWMzXzEpO1xuICAgICAgICBzZXRTaGFwZUNhY2hlKGNhY2hlX2tleSwgc2hhcGUpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnY2Fwc3VsZSc6IHtcbiAgICAgIGNvbnN0IGNhY2hlX2tleSA9IGBjYXBzdWxlXyR7ZGVzY3JpcHRpb24ucmFkaXVzfV8ke2Rlc2NyaXB0aW9uLmhlaWdodH1gO1xuXG4gICAgICBpZiAoKHNoYXBlID0gZ2V0U2hhcGVGcm9tQ2FjaGUoY2FjaGVfa2V5KSkgPT09IG51bGwpIHtcbiAgICAgICAgLy8gSW4gQnVsbGV0LCBjYXBzdWxlIGhlaWdodCBleGNsdWRlcyB0aGUgZW5kIHNwaGVyZXNcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idENhcHN1bGVTaGFwZShkZXNjcmlwdGlvbi5yYWRpdXMsIGRlc2NyaXB0aW9uLmhlaWdodCAtIDIgKiBkZXNjcmlwdGlvbi5yYWRpdXMpO1xuICAgICAgICBzZXRTaGFwZUNhY2hlKGNhY2hlX2tleSwgc2hhcGUpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnY29uZSc6IHtcbiAgICAgIGNvbnN0IGNhY2hlX2tleSA9IGBjb25lXyR7ZGVzY3JpcHRpb24ucmFkaXVzfV8ke2Rlc2NyaXB0aW9uLmhlaWdodH1gO1xuXG4gICAgICBpZiAoKHNoYXBlID0gZ2V0U2hhcGVGcm9tQ2FjaGUoY2FjaGVfa2V5KSkgPT09IG51bGwpIHtcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idENvbmVTaGFwZShkZXNjcmlwdGlvbi5yYWRpdXMsIGRlc2NyaXB0aW9uLmhlaWdodCk7XG4gICAgICAgIHNldFNoYXBlQ2FjaGUoY2FjaGVfa2V5LCBzaGFwZSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdjb25jYXZlJzoge1xuICAgICAgY29uc3QgdHJpYW5nbGVfbWVzaCA9IG5ldyBBbW1vLmJ0VHJpYW5nbGVNZXNoKCk7XG4gICAgICBpZiAoIWRlc2NyaXB0aW9uLmRhdGEubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zdCBkYXRhID0gZGVzY3JpcHRpb24uZGF0YTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aCAvIDk7IGkrKykge1xuICAgICAgICBfdmVjM18xLnNldFgoZGF0YVtpICogOV0pO1xuICAgICAgICBfdmVjM18xLnNldFkoZGF0YVtpICogOSArIDFdKTtcbiAgICAgICAgX3ZlYzNfMS5zZXRaKGRhdGFbaSAqIDkgKyAyXSk7XG5cbiAgICAgICAgX3ZlYzNfMi5zZXRYKGRhdGFbaSAqIDkgKyAzXSk7XG4gICAgICAgIF92ZWMzXzIuc2V0WShkYXRhW2kgKiA5ICsgNF0pO1xuICAgICAgICBfdmVjM18yLnNldFooZGF0YVtpICogOSArIDVdKTtcblxuICAgICAgICBfdmVjM18zLnNldFgoZGF0YVtpICogOSArIDZdKTtcbiAgICAgICAgX3ZlYzNfMy5zZXRZKGRhdGFbaSAqIDkgKyA3XSk7XG4gICAgICAgIF92ZWMzXzMuc2V0WihkYXRhW2kgKiA5ICsgOF0pO1xuXG4gICAgICAgIHRyaWFuZ2xlX21lc2guYWRkVHJpYW5nbGUoXG4gICAgICAgICAgX3ZlYzNfMSxcbiAgICAgICAgICBfdmVjM18yLFxuICAgICAgICAgIF92ZWMzXzMsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgc2hhcGUgPSBuZXcgQW1tby5idEJ2aFRyaWFuZ2xlTWVzaFNoYXBlKFxuICAgICAgICB0cmlhbmdsZV9tZXNoLFxuICAgICAgICB0cnVlLFxuICAgICAgICB0cnVlXG4gICAgICApO1xuXG4gICAgICBfbm9uY2FjaGVkX3NoYXBlc1tkZXNjcmlwdGlvbi5pZF0gPSBzaGFwZTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ2NvbnZleCc6IHtcbiAgICAgIHNoYXBlID0gbmV3IEFtbW8uYnRDb252ZXhIdWxsU2hhcGUoKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBkZXNjcmlwdGlvbi5kYXRhO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoIC8gMzsgaSsrKSB7XG4gICAgICAgIF92ZWMzXzEuc2V0WChkYXRhW2kgKiAzIF0pO1xuICAgICAgICBfdmVjM18xLnNldFkoZGF0YVtpICogMyArIDFdKTtcbiAgICAgICAgX3ZlYzNfMS5zZXRaKGRhdGFbaSAqIDMgKyAyXSk7XG5cbiAgICAgICAgc2hhcGUuYWRkUG9pbnQoX3ZlYzNfMSk7XG4gICAgICB9XG5cbiAgICAgIF9ub25jYWNoZWRfc2hhcGVzW2Rlc2NyaXB0aW9uLmlkXSA9IHNoYXBlO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnaGVpZ2h0ZmllbGQnOiB7XG4gICAgICBjb25zdCB4cHRzID0gZGVzY3JpcHRpb24ueHB0cyxcbiAgICAgICAgeXB0cyA9IGRlc2NyaXB0aW9uLnlwdHMsXG4gICAgICAgIHBvaW50cyA9IGRlc2NyaXB0aW9uLnBvaW50cyxcbiAgICAgICAgcHRyID0gQW1tby5fbWFsbG9jKDQgKiB4cHRzICogeXB0cyk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBwID0gMCwgcDIgPSAwOyBpIDwgeHB0czsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgeXB0czsgaisrKSB7XG4gICAgICAgICAgQW1tby5IRUFQRjMyW3B0ciArIHAyID4+IDJdID0gcG9pbnRzW3BdO1xuXG4gICAgICAgICAgcCsrO1xuICAgICAgICAgIHAyICs9IDQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2hhcGUgPSBuZXcgQW1tby5idEhlaWdodGZpZWxkVGVycmFpblNoYXBlKFxuICAgICAgICBkZXNjcmlwdGlvbi54cHRzLFxuICAgICAgICBkZXNjcmlwdGlvbi55cHRzLFxuICAgICAgICBwdHIsXG4gICAgICAgIDEsXG4gICAgICAgIC1kZXNjcmlwdGlvbi5hYnNNYXhIZWlnaHQsXG4gICAgICAgIGRlc2NyaXB0aW9uLmFic01heEhlaWdodCxcbiAgICAgICAgMSxcbiAgICAgICAgJ1BIWV9GTE9BVCcsXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuXG4gICAgICBfbm9uY2FjaGVkX3NoYXBlc1tkZXNjcmlwdGlvbi5pZF0gPSBzaGFwZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gTm90IHJlY29nbml6ZWRcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBzaGFwZTtcbn07XG5cbmNvbnN0IGNyZWF0ZVNvZnRCb2R5ID0gKGRlc2NyaXB0aW9uKSA9PiB7XG4gIGxldCBib2R5O1xuXG4gIGNvbnN0IHNvZnRCb2R5SGVscGVycyA9IG5ldyBBbW1vLmJ0U29mdEJvZHlIZWxwZXJzKCk7XG5cbiAgc3dpdGNoIChkZXNjcmlwdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnc29mdFRyaW1lc2gnOiB7XG4gICAgICBpZiAoIWRlc2NyaXB0aW9uLmFWZXJ0aWNlcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgICAgYm9keSA9IHNvZnRCb2R5SGVscGVycy5DcmVhdGVGcm9tVHJpTWVzaChcbiAgICAgICAgd29ybGQuZ2V0V29ybGRJbmZvKCksXG4gICAgICAgIGRlc2NyaXB0aW9uLmFWZXJ0aWNlcyxcbiAgICAgICAgZGVzY3JpcHRpb24uYUluZGljZXMsXG4gICAgICAgIGRlc2NyaXB0aW9uLmFJbmRpY2VzLmxlbmd0aCAvIDMsXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnc29mdENsb3RoTWVzaCc6IHtcbiAgICAgIGNvbnN0IGNyID0gZGVzY3JpcHRpb24uY29ybmVycztcblxuICAgICAgYm9keSA9IHNvZnRCb2R5SGVscGVycy5DcmVhdGVQYXRjaChcbiAgICAgICAgd29ybGQuZ2V0V29ybGRJbmZvKCksXG4gICAgICAgIG5ldyBBbW1vLmJ0VmVjdG9yMyhjclswXSwgY3JbMV0sIGNyWzJdKSxcbiAgICAgICAgbmV3IEFtbW8uYnRWZWN0b3IzKGNyWzNdLCBjcls0XSwgY3JbNV0pLFxuICAgICAgICBuZXcgQW1tby5idFZlY3RvcjMoY3JbNl0sIGNyWzddLCBjcls4XSksXG4gICAgICAgIG5ldyBBbW1vLmJ0VmVjdG9yMyhjcls5XSwgY3JbMTBdLCBjclsxMV0pLFxuICAgICAgICBkZXNjcmlwdGlvbi5zZWdtZW50c1swXSxcbiAgICAgICAgZGVzY3JpcHRpb24uc2VnbWVudHNbMV0sXG4gICAgICAgIDAsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdzb2Z0Um9wZU1lc2gnOiB7XG4gICAgICBjb25zdCBkYXRhID0gZGVzY3JpcHRpb24uZGF0YTtcblxuICAgICAgYm9keSA9IHNvZnRCb2R5SGVscGVycy5DcmVhdGVSb3BlKFxuICAgICAgICB3b3JsZC5nZXRXb3JsZEluZm8oKSxcbiAgICAgICAgbmV3IEFtbW8uYnRWZWN0b3IzKGRhdGFbMF0sIGRhdGFbMV0sIGRhdGFbMl0pLFxuICAgICAgICBuZXcgQW1tby5idFZlY3RvcjMoZGF0YVszXSwgZGF0YVs0XSwgZGF0YVs1XSksXG4gICAgICAgIGRhdGFbNl0gLSAxLFxuICAgICAgICAwXG4gICAgICApO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIE5vdCByZWNvZ25pemVkXG4gICAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gYm9keTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuaW5pdCA9IChwYXJhbXMgPSB7fSkgPT4ge1xuICBpZiAocGFyYW1zLndhc21CdWZmZXIpIHtcbiAgICBpbXBvcnRTY3JpcHRzKHBhcmFtcy5hbW1vKTtcblxuICAgIHNlbGYuQW1tbyA9IGxvYWRBbW1vRnJvbUJpbmFyeShwYXJhbXMud2FzbUJ1ZmZlcik7XG4gICAgdHJhbnNmZXJhYmxlTWVzc2FnZSh7Y21kOiAnYW1tb0xvYWRlZCd9KTtcbiAgICBwdWJsaWNfZnVuY3Rpb25zLm1ha2VXb3JsZChwYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIGltcG9ydFNjcmlwdHMocGFyYW1zLmFtbW8pO1xuICAgIHRyYW5zZmVyYWJsZU1lc3NhZ2Uoe2NtZDogJ2FtbW9Mb2FkZWQnfSk7XG4gICAgcHVibGljX2Z1bmN0aW9ucy5tYWtlV29ybGQocGFyYW1zKTtcbiAgfVxufVxuXG5wdWJsaWNfZnVuY3Rpb25zLm1ha2VXb3JsZCA9IChwYXJhbXMgPSB7fSkgPT4ge1xuICBfdHJhbnNmb3JtID0gbmV3IEFtbW8uYnRUcmFuc2Zvcm0oKTtcbiAgX3RyYW5zZm9ybV9wb3MgPSBuZXcgQW1tby5idFRyYW5zZm9ybSgpO1xuICBfdmVjM18xID0gbmV3IEFtbW8uYnRWZWN0b3IzKDAsIDAsIDApO1xuICBfdmVjM18yID0gbmV3IEFtbW8uYnRWZWN0b3IzKDAsIDAsIDApO1xuICBfdmVjM18zID0gbmV3IEFtbW8uYnRWZWN0b3IzKDAsIDAsIDApO1xuICBfcXVhdCA9IG5ldyBBbW1vLmJ0UXVhdGVybmlvbigwLCAwLCAwLCAwKTtcblxuICBSRVBPUlRfQ0hVTktTSVpFID0gcGFyYW1zLnJlcG9ydHNpemUgfHwgNTA7XG5cbiAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFKSB7XG4gICAgLy8gVHJhbnNmZXJhYmxlIG1lc3NhZ2VzIGFyZSBzdXBwb3J0ZWQsIHRha2UgYWR2YW50YWdlIG9mIHRoZW0gd2l0aCBUeXBlZEFycmF5c1xuICAgIHdvcmxkcmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheSgyICsgUkVQT1JUX0NIVU5LU0laRSAqIFdPUkxEUkVQT1JUX0lURU1TSVpFKTsgLy8gbWVzc2FnZSBpZCArICMgb2Ygb2JqZWN0cyB0byByZXBvcnQgKyBjaHVuayBzaXplICogIyBvZiB2YWx1ZXMgcGVyIG9iamVjdFxuICAgIGNvbGxpc2lvbnJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMiArIFJFUE9SVF9DSFVOS1NJWkUgKiBDT0xMSVNJT05SRVBPUlRfSVRFTVNJWkUpOyAvLyBtZXNzYWdlIGlkICsgIyBvZiBjb2xsaXNpb25zIHRvIHJlcG9ydCArIGNodW5rIHNpemUgKiAjIG9mIHZhbHVlcyBwZXIgb2JqZWN0XG4gICAgdmVoaWNsZXJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMiArIFJFUE9SVF9DSFVOS1NJWkUgKiBWRUhJQ0xFUkVQT1JUX0lURU1TSVpFKTsgLy8gbWVzc2FnZSBpZCArICMgb2YgdmVoaWNsZXMgdG8gcmVwb3J0ICsgY2h1bmsgc2l6ZSAqICMgb2YgdmFsdWVzIHBlciBvYmplY3RcbiAgICBjb25zdHJhaW50cmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheSgyICsgUkVQT1JUX0NIVU5LU0laRSAqIENPTlNUUkFJTlRSRVBPUlRfSVRFTVNJWkUpOyAvLyBtZXNzYWdlIGlkICsgIyBvZiBjb25zdHJhaW50cyB0byByZXBvcnQgKyBjaHVuayBzaXplICogIyBvZiB2YWx1ZXMgcGVyIG9iamVjdFxuICB9IGVsc2Uge1xuICAgIC8vIFRyYW5zZmVyYWJsZSBtZXNzYWdlcyBhcmUgbm90IHN1cHBvcnRlZCwgc2VuZCBkYXRhIGFzIG5vcm1hbCBhcnJheXNcbiAgICB3b3JsZHJlcG9ydCA9IFtdO1xuICAgIGNvbGxpc2lvbnJlcG9ydCA9IFtdO1xuICAgIHZlaGljbGVyZXBvcnQgPSBbXTtcbiAgICBjb25zdHJhaW50cmVwb3J0ID0gW107XG4gIH1cblxuICB3b3JsZHJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuV09STERSRVBPUlQ7XG4gIGNvbGxpc2lvbnJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuQ09MTElTSU9OUkVQT1JUO1xuICB2ZWhpY2xlcmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5WRUhJQ0xFUkVQT1JUO1xuICBjb25zdHJhaW50cmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5DT05TVFJBSU5UUkVQT1JUO1xuXG4gIGNvbnN0IGNvbGxpc2lvbkNvbmZpZ3VyYXRpb24gPSBwYXJhbXMuc29mdGJvZHlcbiAgICA/IG5ldyBBbW1vLmJ0U29mdEJvZHlSaWdpZEJvZHlDb2xsaXNpb25Db25maWd1cmF0aW9uKClcbiAgICA6IG5ldyBBbW1vLmJ0RGVmYXVsdENvbGxpc2lvbkNvbmZpZ3VyYXRpb24oKSxcbiAgICBkaXNwYXRjaGVyID0gbmV3IEFtbW8uYnRDb2xsaXNpb25EaXNwYXRjaGVyKGNvbGxpc2lvbkNvbmZpZ3VyYXRpb24pLFxuICAgIHNvbHZlciA9IG5ldyBBbW1vLmJ0U2VxdWVudGlhbEltcHVsc2VDb25zdHJhaW50U29sdmVyKCk7XG5cbiAgbGV0IGJyb2FkcGhhc2U7XG5cbiAgaWYgKCFwYXJhbXMuYnJvYWRwaGFzZSkgcGFyYW1zLmJyb2FkcGhhc2UgPSB7dHlwZTogJ2R5bmFtaWMnfTtcbiAgLy8gVE9ETyEhIVxuICAvKiBpZiAocGFyYW1zLmJyb2FkcGhhc2UudHlwZSA9PT0gJ3N3ZWVwcHJ1bmUnKSB7XG4gICAgZXh0ZW5kKHBhcmFtcy5icm9hZHBoYXNlLCB7XG4gICAgICBhYWJibWluOiB7XG4gICAgICAgIHg6IC01MCxcbiAgICAgICAgeTogLTUwLFxuICAgICAgICB6OiAtNTBcbiAgICAgIH0sXG5cbiAgICAgIGFhYmJtYXg6IHtcbiAgICAgICAgeDogNTAsXG4gICAgICAgIHk6IDUwLFxuICAgICAgICB6OiA1MFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSovXG5cbiAgc3dpdGNoIChwYXJhbXMuYnJvYWRwaGFzZS50eXBlKSB7XG4gICAgY2FzZSAnc3dlZXBwcnVuZSc6XG4gICAgICBfdmVjM18xLnNldFgocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1pbi54KTtcbiAgICAgIF92ZWMzXzEuc2V0WShwYXJhbXMuYnJvYWRwaGFzZS5hYWJibWluLnkpO1xuICAgICAgX3ZlYzNfMS5zZXRaKHBhcmFtcy5icm9hZHBoYXNlLmFhYmJtaW4ueik7XG5cbiAgICAgIF92ZWMzXzIuc2V0WChwYXJhbXMuYnJvYWRwaGFzZS5hYWJibWF4LngpO1xuICAgICAgX3ZlYzNfMi5zZXRZKHBhcmFtcy5icm9hZHBoYXNlLmFhYmJtYXgueSk7XG4gICAgICBfdmVjM18yLnNldFoocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1heC56KTtcblxuICAgICAgYnJvYWRwaGFzZSA9IG5ldyBBbW1vLmJ0QXhpc1N3ZWVwMyhcbiAgICAgICAgX3ZlYzNfMSxcbiAgICAgICAgX3ZlYzNfMlxuICAgICAgKTtcblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZHluYW1pYyc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyb2FkcGhhc2UgPSBuZXcgQW1tby5idERidnRCcm9hZHBoYXNlKCk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHdvcmxkID0gcGFyYW1zLnNvZnRib2R5XG4gICAgPyBuZXcgQW1tby5idFNvZnRSaWdpZER5bmFtaWNzV29ybGQoZGlzcGF0Y2hlciwgYnJvYWRwaGFzZSwgc29sdmVyLCBjb2xsaXNpb25Db25maWd1cmF0aW9uLCBuZXcgQW1tby5idERlZmF1bHRTb2Z0Qm9keVNvbHZlcigpKVxuICAgIDogbmV3IEFtbW8uYnREaXNjcmV0ZUR5bmFtaWNzV29ybGQoZGlzcGF0Y2hlciwgYnJvYWRwaGFzZSwgc29sdmVyLCBjb2xsaXNpb25Db25maWd1cmF0aW9uKTtcbiAgZml4ZWRUaW1lU3RlcCA9IHBhcmFtcy5maXhlZFRpbWVTdGVwO1xuXG4gIGlmIChwYXJhbXMuc29mdGJvZHkpIF9zb2Z0Ym9keV9lbmFibGVkID0gdHJ1ZTtcblxuICB0cmFuc2ZlcmFibGVNZXNzYWdlKHtjbWQ6ICd3b3JsZFJlYWR5J30pO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5zZXRGaXhlZFRpbWVTdGVwID0gKGRlc2NyaXB0aW9uKSA9PiB7XG4gIGZpeGVkVGltZVN0ZXAgPSBkZXNjcmlwdGlvbjtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuc2V0R3Jhdml0eSA9IChkZXNjcmlwdGlvbikgPT4ge1xuICBfdmVjM18xLnNldFgoZGVzY3JpcHRpb24ueCk7XG4gIF92ZWMzXzEuc2V0WShkZXNjcmlwdGlvbi55KTtcbiAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLnopO1xuICB3b3JsZC5zZXRHcmF2aXR5KF92ZWMzXzEpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5hcHBlbmRBbmNob3IgPSAoZGVzY3JpcHRpb24pID0+IHtcbiAgX29iamVjdHNbZGVzY3JpcHRpb24ub2JqXVxuICAgIC5hcHBlbmRBbmNob3IoXG4gICAgICBkZXNjcmlwdGlvbi5ub2RlLFxuICAgICAgX29iamVjdHNbZGVzY3JpcHRpb24ub2JqMl0sXG4gICAgICBkZXNjcmlwdGlvbi5jb2xsaXNpb25CZXR3ZWVuTGlua2VkQm9kaWVzLFxuICAgICAgZGVzY3JpcHRpb24uaW5mbHVlbmNlXG4gICAgKTtcbn1cblxucHVibGljX2Z1bmN0aW9ucy5hZGRPYmplY3QgPSAoZGVzY3JpcHRpb24pID0+IHtcbiAgbGV0IGJvZHksIG1vdGlvblN0YXRlO1xuXG4gIGlmIChkZXNjcmlwdGlvbi50eXBlLmluZGV4T2YoJ3NvZnQnKSAhPT0gLTEpIHtcbiAgICBib2R5ID0gY3JlYXRlU29mdEJvZHkoZGVzY3JpcHRpb24pO1xuXG4gICAgY29uc3Qgc2JDb25maWcgPSBib2R5LmdldF9tX2NmZygpO1xuXG4gICAgaWYgKGRlc2NyaXB0aW9uLnZpdGVyYXRpb25zKSBzYkNvbmZpZy5zZXRfdml0ZXJhdGlvbnMoZGVzY3JpcHRpb24udml0ZXJhdGlvbnMpO1xuICAgIGlmIChkZXNjcmlwdGlvbi5waXRlcmF0aW9ucykgc2JDb25maWcuc2V0X3BpdGVyYXRpb25zKGRlc2NyaXB0aW9uLnBpdGVyYXRpb25zKTtcbiAgICBpZiAoZGVzY3JpcHRpb24uZGl0ZXJhdGlvbnMpIHNiQ29uZmlnLnNldF9kaXRlcmF0aW9ucyhkZXNjcmlwdGlvbi5kaXRlcmF0aW9ucyk7XG4gICAgaWYgKGRlc2NyaXB0aW9uLmNpdGVyYXRpb25zKSBzYkNvbmZpZy5zZXRfY2l0ZXJhdGlvbnMoZGVzY3JpcHRpb24uY2l0ZXJhdGlvbnMpO1xuICAgIHNiQ29uZmlnLnNldF9jb2xsaXNpb25zKDB4MTEpO1xuICAgIHNiQ29uZmlnLnNldF9rREYoZGVzY3JpcHRpb24uZnJpY3Rpb24pO1xuICAgIHNiQ29uZmlnLnNldF9rRFAoZGVzY3JpcHRpb24uZGFtcGluZyk7XG4gICAgaWYgKGRlc2NyaXB0aW9uLnByZXNzdXJlKSBzYkNvbmZpZy5zZXRfa1BSKGRlc2NyaXB0aW9uLnByZXNzdXJlKTtcbiAgICBpZiAoZGVzY3JpcHRpb24uZHJhZykgc2JDb25maWcuc2V0X2tERyhkZXNjcmlwdGlvbi5kcmFnKTtcbiAgICBpZiAoZGVzY3JpcHRpb24ubGlmdCkgc2JDb25maWcuc2V0X2tMRihkZXNjcmlwdGlvbi5saWZ0KTtcbiAgICBpZiAoZGVzY3JpcHRpb24uYW5jaG9ySGFyZG5lc3MpIHNiQ29uZmlnLnNldF9rQUhSKGRlc2NyaXB0aW9uLmFuY2hvckhhcmRuZXNzKTtcbiAgICBpZiAoZGVzY3JpcHRpb24ucmlnaWRIYXJkbmVzcykgc2JDb25maWcuc2V0X2tDSFIoZGVzY3JpcHRpb24ucmlnaWRIYXJkbmVzcyk7XG5cbiAgICBpZiAoZGVzY3JpcHRpb24ua2xzdCkgYm9keS5nZXRfbV9tYXRlcmlhbHMoKS5hdCgwKS5zZXRfbV9rTFNUKGRlc2NyaXB0aW9uLmtsc3QpO1xuICAgIGlmIChkZXNjcmlwdGlvbi5rYXN0KSBib2R5LmdldF9tX21hdGVyaWFscygpLmF0KDApLnNldF9tX2tBU1QoZGVzY3JpcHRpb24ua2FzdCk7XG4gICAgaWYgKGRlc2NyaXB0aW9uLmt2c3QpIGJvZHkuZ2V0X21fbWF0ZXJpYWxzKCkuYXQoMCkuc2V0X21fa1ZTVChkZXNjcmlwdGlvbi5rdnN0KTtcblxuICAgIEFtbW8uY2FzdE9iamVjdChib2R5LCBBbW1vLmJ0Q29sbGlzaW9uT2JqZWN0KS5nZXRDb2xsaXNpb25TaGFwZSgpLnNldE1hcmdpbihkZXNjcmlwdGlvbi5tYXJnaW4gPyBkZXNjcmlwdGlvbi5tYXJnaW4gOiAwLjEpO1xuICAgIGJvZHkuc2V0QWN0aXZhdGlvblN0YXRlKGRlc2NyaXB0aW9uLnN0YXRlIHx8IDQpO1xuICAgIGJvZHkudHlwZSA9IDA7IC8vIFNvZnRCb2R5LlxuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnc29mdFJvcGVNZXNoJykgYm9keS5yb3BlID0gdHJ1ZTtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ3NvZnRDbG90aE1lc2gnKSBib2R5LmNsb3RoID0gdHJ1ZTtcblxuICAgIF90cmFuc2Zvcm0uc2V0SWRlbnRpdHkoKTtcblxuICAgIF92ZWMzXzEuc2V0WChkZXNjcmlwdGlvbi5wb3NpdGlvbi54KTtcbiAgICBfdmVjM18xLnNldFkoZGVzY3JpcHRpb24ucG9zaXRpb24ueSk7XG4gICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLnBvc2l0aW9uLnopO1xuICAgIF90cmFuc2Zvcm0uc2V0T3JpZ2luKF92ZWMzXzEpO1xuXG4gICAgX3F1YXQuc2V0WChkZXNjcmlwdGlvbi5yb3RhdGlvbi54KTtcbiAgICBfcXVhdC5zZXRZKGRlc2NyaXB0aW9uLnJvdGF0aW9uLnkpO1xuICAgIF9xdWF0LnNldFooZGVzY3JpcHRpb24ucm90YXRpb24ueik7XG4gICAgX3F1YXQuc2V0VyhkZXNjcmlwdGlvbi5yb3RhdGlvbi53KTtcbiAgICBfdHJhbnNmb3JtLnNldFJvdGF0aW9uKF9xdWF0KTtcblxuICAgIGJvZHkudHJhbnNmb3JtKF90cmFuc2Zvcm0pO1xuXG4gICAgYm9keS5zZXRUb3RhbE1hc3MoZGVzY3JpcHRpb24ubWFzcywgZmFsc2UpO1xuICAgIHdvcmxkLmFkZFNvZnRCb2R5KGJvZHksIDEsIC0xKTtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ3NvZnRUcmltZXNoJykgX3NvZnRib2R5X3JlcG9ydF9zaXplICs9IGJvZHkuZ2V0X21fZmFjZXMoKS5zaXplKCkgKiAzO1xuICAgIGVsc2UgX3NvZnRib2R5X3JlcG9ydF9zaXplICs9IGJvZHkuZ2V0X21fbm9kZXMoKS5zaXplKCkgKiAzO1xuXG4gICAgX251bV9zb2Z0Ym9keV9vYmplY3RzKys7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHNoYXBlID0gY3JlYXRlU2hhcGUoZGVzY3JpcHRpb24pO1xuXG4gICAgaWYgKCFzaGFwZSkgcmV0dXJuO1xuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGNoaWxkcmVuIHRoZW4gdGhpcyBpcyBhIGNvbXBvdW5kIHNoYXBlXG4gICAgaWYgKGRlc2NyaXB0aW9uLmNoaWxkcmVuKSB7XG4gICAgICBjb25zdCBjb21wb3VuZF9zaGFwZSA9IG5ldyBBbW1vLmJ0Q29tcG91bmRTaGFwZSgpO1xuICAgICAgY29tcG91bmRfc2hhcGUuYWRkQ2hpbGRTaGFwZShfdHJhbnNmb3JtLCBzaGFwZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzY3JpcHRpb24uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgX2NoaWxkID0gZGVzY3JpcHRpb24uY2hpbGRyZW5baV07XG5cbiAgICAgICAgY29uc3QgdHJhbnMgPSBuZXcgQW1tby5idFRyYW5zZm9ybSgpO1xuICAgICAgICB0cmFucy5zZXRJZGVudGl0eSgpO1xuXG4gICAgICAgIF92ZWMzXzEuc2V0WChfY2hpbGQucG9zaXRpb25fb2Zmc2V0LngpO1xuICAgICAgICBfdmVjM18xLnNldFkoX2NoaWxkLnBvc2l0aW9uX29mZnNldC55KTtcbiAgICAgICAgX3ZlYzNfMS5zZXRaKF9jaGlsZC5wb3NpdGlvbl9vZmZzZXQueik7XG4gICAgICAgIHRyYW5zLnNldE9yaWdpbihfdmVjM18xKTtcblxuICAgICAgICBfcXVhdC5zZXRYKF9jaGlsZC5yb3RhdGlvbi54KTtcbiAgICAgICAgX3F1YXQuc2V0WShfY2hpbGQucm90YXRpb24ueSk7XG4gICAgICAgIF9xdWF0LnNldFooX2NoaWxkLnJvdGF0aW9uLnopO1xuICAgICAgICBfcXVhdC5zZXRXKF9jaGlsZC5yb3RhdGlvbi53KTtcbiAgICAgICAgdHJhbnMuc2V0Um90YXRpb24oX3F1YXQpO1xuXG4gICAgICAgIHNoYXBlID0gY3JlYXRlU2hhcGUoZGVzY3JpcHRpb24uY2hpbGRyZW5baV0pO1xuICAgICAgICBjb21wb3VuZF9zaGFwZS5hZGRDaGlsZFNoYXBlKHRyYW5zLCBzaGFwZSk7XG4gICAgICAgIEFtbW8uZGVzdHJveSh0cmFucyk7XG4gICAgICB9XG5cbiAgICAgIHNoYXBlID0gY29tcG91bmRfc2hhcGU7XG4gICAgICBfY29tcG91bmRfc2hhcGVzW2Rlc2NyaXB0aW9uLmlkXSA9IHNoYXBlO1xuICAgIH1cblxuICAgIF92ZWMzXzEuc2V0WChkZXNjcmlwdGlvbi5zY2FsZS54KTtcbiAgICBfdmVjM18xLnNldFkoZGVzY3JpcHRpb24uc2NhbGUueSk7XG4gICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLnNjYWxlLnopO1xuXG4gICAgc2hhcGUuc2V0TG9jYWxTY2FsaW5nKF92ZWMzXzEpO1xuXG4gICAgX3ZlYzNfMS5zZXRYKDApO1xuICAgIF92ZWMzXzEuc2V0WSgwKTtcbiAgICBfdmVjM18xLnNldFooMCk7XG4gICAgc2hhcGUuY2FsY3VsYXRlTG9jYWxJbmVydGlhKGRlc2NyaXB0aW9uLm1hc3MsIF92ZWMzXzEpO1xuXG4gICAgX3RyYW5zZm9ybS5zZXRJZGVudGl0eSgpO1xuXG4gICAgX3ZlYzNfMi5zZXRYKGRlc2NyaXB0aW9uLnBvc2l0aW9uLngpO1xuICAgIF92ZWMzXzIuc2V0WShkZXNjcmlwdGlvbi5wb3NpdGlvbi55KTtcbiAgICBfdmVjM18yLnNldFooZGVzY3JpcHRpb24ucG9zaXRpb24ueik7XG4gICAgX3RyYW5zZm9ybS5zZXRPcmlnaW4oX3ZlYzNfMik7XG5cbiAgICBfcXVhdC5zZXRYKGRlc2NyaXB0aW9uLnJvdGF0aW9uLngpO1xuICAgIF9xdWF0LnNldFkoZGVzY3JpcHRpb24ucm90YXRpb24ueSk7XG4gICAgX3F1YXQuc2V0WihkZXNjcmlwdGlvbi5yb3RhdGlvbi56KTtcbiAgICBfcXVhdC5zZXRXKGRlc2NyaXB0aW9uLnJvdGF0aW9uLncpO1xuICAgIF90cmFuc2Zvcm0uc2V0Um90YXRpb24oX3F1YXQpO1xuXG4gICAgbW90aW9uU3RhdGUgPSBuZXcgQW1tby5idERlZmF1bHRNb3Rpb25TdGF0ZShfdHJhbnNmb3JtKTsgLy8gI1RPRE86IGJ0RGVmYXVsdE1vdGlvblN0YXRlIHN1cHBvcnRzIGNlbnRlciBvZiBtYXNzIG9mZnNldCBhcyBzZWNvbmQgYXJndW1lbnQgLSBpbXBsZW1lbnRcbiAgICBjb25zdCByYkluZm8gPSBuZXcgQW1tby5idFJpZ2lkQm9keUNvbnN0cnVjdGlvbkluZm8oZGVzY3JpcHRpb24ubWFzcywgbW90aW9uU3RhdGUsIHNoYXBlLCBfdmVjM18xKTtcblxuICAgIHJiSW5mby5zZXRfbV9mcmljdGlvbihkZXNjcmlwdGlvbi5mcmljdGlvbik7XG4gICAgcmJJbmZvLnNldF9tX3Jlc3RpdHV0aW9uKGRlc2NyaXB0aW9uLnJlc3RpdHV0aW9uKTtcbiAgICByYkluZm8uc2V0X21fbGluZWFyRGFtcGluZyhkZXNjcmlwdGlvbi5kYW1waW5nKTtcbiAgICByYkluZm8uc2V0X21fYW5ndWxhckRhbXBpbmcoZGVzY3JpcHRpb24uZGFtcGluZyk7XG5cbiAgICBib2R5ID0gbmV3IEFtbW8uYnRSaWdpZEJvZHkocmJJbmZvKTtcbiAgICBBbW1vLmNhc3RPYmplY3QoYm9keSwgQW1tby5idENvbGxpc2lvbk9iamVjdCkuZ2V0Q29sbGlzaW9uU2hhcGUoKS5zZXRNYXJnaW4oZGVzY3JpcHRpb24ubWFyZ2luID8gZGVzY3JpcHRpb24ubWFyZ2luIDogMCk7XG4gICAgYm9keS5zZXRBY3RpdmF0aW9uU3RhdGUoZGVzY3JpcHRpb24uc3RhdGUgfHwgNCk7XG4gICAgQW1tby5kZXN0cm95KHJiSW5mbyk7XG5cbiAgICBpZiAodHlwZW9mIGRlc2NyaXB0aW9uLmNvbGxpc2lvbl9mbGFncyAhPT0gJ3VuZGVmaW5lZCcpIGJvZHkuc2V0Q29sbGlzaW9uRmxhZ3MoZGVzY3JpcHRpb24uY29sbGlzaW9uX2ZsYWdzKTtcblxuICAgIGlmIChkZXNjcmlwdGlvbi5ncm91cCAmJiBkZXNjcmlwdGlvbi5tYXNrKSB3b3JsZC5hZGRSaWdpZEJvZHkoYm9keSwgZGVzY3JpcHRpb24uZ3JvdXAsIGRlc2NyaXB0aW9uLm1hc2spO1xuICAgIGVsc2Ugd29ybGQuYWRkUmlnaWRCb2R5KGJvZHkpO1xuICAgIGJvZHkudHlwZSA9IDE7IC8vIFJpZ2lkQm9keS5cbiAgICBfbnVtX3JpZ2lkYm9keV9vYmplY3RzKys7XG4gIH1cblxuICBib2R5LmFjdGl2YXRlKCk7XG5cbiAgYm9keS5pZCA9IGRlc2NyaXB0aW9uLmlkO1xuICBfb2JqZWN0c1tib2R5LmlkXSA9IGJvZHk7XG4gIF9tb3Rpb25fc3RhdGVzW2JvZHkuaWRdID0gbW90aW9uU3RhdGU7XG5cbiAgX29iamVjdHNfYW1tb1tib2R5LmEgPT09IHVuZGVmaW5lZCA/IGJvZHkucHRyIDogYm9keS5hXSA9IGJvZHkuaWQ7XG4gIF9udW1fb2JqZWN0cysrO1xuXG4gIHRyYW5zZmVyYWJsZU1lc3NhZ2Uoe2NtZDogJ29iamVjdFJlYWR5JywgcGFyYW1zOiBib2R5LmlkfSk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLmFkZFZlaGljbGUgPSAoZGVzY3JpcHRpb24pID0+IHtcbiAgY29uc3QgdmVoaWNsZV90dW5pbmcgPSBuZXcgQW1tby5idFZlaGljbGVUdW5pbmcoKTtcblxuICB2ZWhpY2xlX3R1bmluZy5zZXRfbV9zdXNwZW5zaW9uU3RpZmZuZXNzKGRlc2NyaXB0aW9uLnN1c3BlbnNpb25fc3RpZmZuZXNzKTtcbiAgdmVoaWNsZV90dW5pbmcuc2V0X21fc3VzcGVuc2lvbkNvbXByZXNzaW9uKGRlc2NyaXB0aW9uLnN1c3BlbnNpb25fY29tcHJlc3Npb24pO1xuICB2ZWhpY2xlX3R1bmluZy5zZXRfbV9zdXNwZW5zaW9uRGFtcGluZyhkZXNjcmlwdGlvbi5zdXNwZW5zaW9uX2RhbXBpbmcpO1xuICB2ZWhpY2xlX3R1bmluZy5zZXRfbV9tYXhTdXNwZW5zaW9uVHJhdmVsQ20oZGVzY3JpcHRpb24ubWF4X3N1c3BlbnNpb25fdHJhdmVsKTtcbiAgdmVoaWNsZV90dW5pbmcuc2V0X21fbWF4U3VzcGVuc2lvbkZvcmNlKGRlc2NyaXB0aW9uLm1heF9zdXNwZW5zaW9uX2ZvcmNlKTtcblxuICBjb25zdCB2ZWhpY2xlID0gbmV3IEFtbW8uYnRSYXljYXN0VmVoaWNsZShcbiAgICB2ZWhpY2xlX3R1bmluZyxcbiAgICBfb2JqZWN0c1tkZXNjcmlwdGlvbi5yaWdpZEJvZHldLFxuICAgIG5ldyBBbW1vLmJ0RGVmYXVsdFZlaGljbGVSYXljYXN0ZXIod29ybGQpXG4gICk7XG5cbiAgdmVoaWNsZS50dW5pbmcgPSB2ZWhpY2xlX3R1bmluZztcbiAgX29iamVjdHNbZGVzY3JpcHRpb24ucmlnaWRCb2R5XS5zZXRBY3RpdmF0aW9uU3RhdGUoNCk7XG4gIHZlaGljbGUuc2V0Q29vcmRpbmF0ZVN5c3RlbSgwLCAxLCAyKTtcblxuICB3b3JsZC5hZGRWZWhpY2xlKHZlaGljbGUpO1xuICBfdmVoaWNsZXNbZGVzY3JpcHRpb24uaWRdID0gdmVoaWNsZTtcbn07XG5wdWJsaWNfZnVuY3Rpb25zLnJlbW92ZVZlaGljbGUgPSAoZGVzY3JpcHRpb24pID0+IHtcbiAgX3ZlaGljbGVzW2Rlc2NyaXB0aW9uLmlkXSA9IG51bGw7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLmFkZFdoZWVsID0gKGRlc2NyaXB0aW9uKSA9PiB7XG4gIGlmIChfdmVoaWNsZXNbZGVzY3JpcHRpb24uaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgdHVuaW5nID0gX3ZlaGljbGVzW2Rlc2NyaXB0aW9uLmlkXS50dW5pbmc7XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR1bmluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0dW5pbmcgPSBuZXcgQW1tby5idFZlaGljbGVUdW5pbmcoKTtcbiAgICAgIHR1bmluZy5zZXRfbV9zdXNwZW5zaW9uU3RpZmZuZXNzKGRlc2NyaXB0aW9uLnR1bmluZy5zdXNwZW5zaW9uX3N0aWZmbmVzcyk7XG4gICAgICB0dW5pbmcuc2V0X21fc3VzcGVuc2lvbkNvbXByZXNzaW9uKGRlc2NyaXB0aW9uLnR1bmluZy5zdXNwZW5zaW9uX2NvbXByZXNzaW9uKTtcbiAgICAgIHR1bmluZy5zZXRfbV9zdXNwZW5zaW9uRGFtcGluZyhkZXNjcmlwdGlvbi50dW5pbmcuc3VzcGVuc2lvbl9kYW1waW5nKTtcbiAgICAgIHR1bmluZy5zZXRfbV9tYXhTdXNwZW5zaW9uVHJhdmVsQ20oZGVzY3JpcHRpb24udHVuaW5nLm1heF9zdXNwZW5zaW9uX3RyYXZlbCk7XG4gICAgICB0dW5pbmcuc2V0X21fbWF4U3VzcGVuc2lvbkZvcmNlKGRlc2NyaXB0aW9uLnR1bmluZy5tYXhfc3VzcGVuc2lvbl9mb3JjZSk7XG4gICAgfVxuXG4gICAgX3ZlYzNfMS5zZXRYKGRlc2NyaXB0aW9uLmNvbm5lY3Rpb25fcG9pbnQueCk7XG4gICAgX3ZlYzNfMS5zZXRZKGRlc2NyaXB0aW9uLmNvbm5lY3Rpb25fcG9pbnQueSk7XG4gICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLmNvbm5lY3Rpb25fcG9pbnQueik7XG5cbiAgICBfdmVjM18yLnNldFgoZGVzY3JpcHRpb24ud2hlZWxfZGlyZWN0aW9uLngpO1xuICAgIF92ZWMzXzIuc2V0WShkZXNjcmlwdGlvbi53aGVlbF9kaXJlY3Rpb24ueSk7XG4gICAgX3ZlYzNfMi5zZXRaKGRlc2NyaXB0aW9uLndoZWVsX2RpcmVjdGlvbi56KTtcblxuICAgIF92ZWMzXzMuc2V0WChkZXNjcmlwdGlvbi53aGVlbF9heGxlLngpO1xuICAgIF92ZWMzXzMuc2V0WShkZXNjcmlwdGlvbi53aGVlbF9heGxlLnkpO1xuICAgIF92ZWMzXzMuc2V0WihkZXNjcmlwdGlvbi53aGVlbF9heGxlLnopO1xuXG4gICAgX3ZlaGljbGVzW2Rlc2NyaXB0aW9uLmlkXS5hZGRXaGVlbChcbiAgICAgIF92ZWMzXzEsXG4gICAgICBfdmVjM18yLFxuICAgICAgX3ZlYzNfMyxcbiAgICAgIGRlc2NyaXB0aW9uLnN1c3BlbnNpb25fcmVzdF9sZW5ndGgsXG4gICAgICBkZXNjcmlwdGlvbi53aGVlbF9yYWRpdXMsXG4gICAgICB0dW5pbmcsXG4gICAgICBkZXNjcmlwdGlvbi5pc19mcm9udF93aGVlbFxuICAgICk7XG4gIH1cblxuICBfbnVtX3doZWVscysrO1xuXG4gIGlmIChTVVBQT1JUX1RSQU5TRkVSQUJMRSkge1xuICAgIHZlaGljbGVyZXBvcnQgPSBuZXcgRmxvYXQzMkFycmF5KDEgKyBfbnVtX3doZWVscyAqIFZFSElDTEVSRVBPUlRfSVRFTVNJWkUpOyAvLyBtZXNzYWdlIGlkICYgKCAjIG9mIG9iamVjdHMgdG8gcmVwb3J0ICogIyBvZiB2YWx1ZXMgcGVyIG9iamVjdCApXG4gICAgdmVoaWNsZXJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuVkVISUNMRVJFUE9SVDtcbiAgfSBlbHNlIHZlaGljbGVyZXBvcnQgPSBbTUVTU0FHRV9UWVBFUy5WRUhJQ0xFUkVQT1JUXTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuc2V0U3RlZXJpbmcgPSAoZGV0YWlscykgPT4ge1xuICBpZiAoX3ZlaGljbGVzW2RldGFpbHMuaWRdICE9PSB1bmRlZmluZWQpIF92ZWhpY2xlc1tkZXRhaWxzLmlkXS5zZXRTdGVlcmluZ1ZhbHVlKGRldGFpbHMuc3RlZXJpbmcsIGRldGFpbHMud2hlZWwpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5zZXRCcmFrZSA9IChkZXRhaWxzKSA9PiB7XG4gIGlmIChfdmVoaWNsZXNbZGV0YWlscy5pZF0gIT09IHVuZGVmaW5lZCkgX3ZlaGljbGVzW2RldGFpbHMuaWRdLnNldEJyYWtlKGRldGFpbHMuYnJha2UsIGRldGFpbHMud2hlZWwpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5hcHBseUVuZ2luZUZvcmNlID0gKGRldGFpbHMpID0+IHtcbiAgaWYgKF92ZWhpY2xlc1tkZXRhaWxzLmlkXSAhPT0gdW5kZWZpbmVkKSBfdmVoaWNsZXNbZGV0YWlscy5pZF0uYXBwbHlFbmdpbmVGb3JjZShkZXRhaWxzLmZvcmNlLCBkZXRhaWxzLndoZWVsKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMucmVtb3ZlT2JqZWN0ID0gKGRldGFpbHMpID0+IHtcbiAgaWYgKF9vYmplY3RzW2RldGFpbHMuaWRdLnR5cGUgPT09IDApIHtcbiAgICBfbnVtX3NvZnRib2R5X29iamVjdHMtLTtcbiAgICBfc29mdGJvZHlfcmVwb3J0X3NpemUgLT0gX29iamVjdHNbZGV0YWlscy5pZF0uZ2V0X21fbm9kZXMoKS5zaXplKCk7XG4gICAgd29ybGQucmVtb3ZlU29mdEJvZHkoX29iamVjdHNbZGV0YWlscy5pZF0pO1xuICB9IGVsc2UgaWYgKF9vYmplY3RzW2RldGFpbHMuaWRdLnR5cGUgPT09IDEpIHtcbiAgICBfbnVtX3JpZ2lkYm9keV9vYmplY3RzLS07XG4gICAgd29ybGQucmVtb3ZlUmlnaWRCb2R5KF9vYmplY3RzW2RldGFpbHMuaWRdKTtcbiAgICBBbW1vLmRlc3Ryb3koX21vdGlvbl9zdGF0ZXNbZGV0YWlscy5pZF0pO1xuICB9XG5cbiAgQW1tby5kZXN0cm95KF9vYmplY3RzW2RldGFpbHMuaWRdKTtcbiAgaWYgKF9jb21wb3VuZF9zaGFwZXNbZGV0YWlscy5pZF0pIEFtbW8uZGVzdHJveShfY29tcG91bmRfc2hhcGVzW2RldGFpbHMuaWRdKTtcbiAgaWYgKF9ub25jYWNoZWRfc2hhcGVzW2RldGFpbHMuaWRdKSBBbW1vLmRlc3Ryb3koX25vbmNhY2hlZF9zaGFwZXNbZGV0YWlscy5pZF0pO1xuXG4gIF9vYmplY3RzX2FtbW9bX29iamVjdHNbZGV0YWlscy5pZF0uYSA9PT0gdW5kZWZpbmVkID8gX29iamVjdHNbZGV0YWlscy5pZF0uYSA6IF9vYmplY3RzW2RldGFpbHMuaWRdLnB0cl0gPSBudWxsO1xuICBfb2JqZWN0c1tkZXRhaWxzLmlkXSA9IG51bGw7XG4gIF9tb3Rpb25fc3RhdGVzW2RldGFpbHMuaWRdID0gbnVsbDtcblxuICBpZiAoX2NvbXBvdW5kX3NoYXBlc1tkZXRhaWxzLmlkXSkgX2NvbXBvdW5kX3NoYXBlc1tkZXRhaWxzLmlkXSA9IG51bGw7XG4gIGlmIChfbm9uY2FjaGVkX3NoYXBlc1tkZXRhaWxzLmlkXSkgX25vbmNhY2hlZF9zaGFwZXNbZGV0YWlscy5pZF0gPSBudWxsO1xuICBfbnVtX29iamVjdHMtLTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMudXBkYXRlVHJhbnNmb3JtID0gKGRldGFpbHMpID0+IHtcbiAgX29iamVjdCA9IF9vYmplY3RzW2RldGFpbHMuaWRdO1xuXG4gIGlmIChfb2JqZWN0LnR5cGUgPT09IDEpIHtcbiAgICBfb2JqZWN0LmdldE1vdGlvblN0YXRlKCkuZ2V0V29ybGRUcmFuc2Zvcm0oX3RyYW5zZm9ybSk7XG5cbiAgICBpZiAoZGV0YWlscy5wb3MpIHtcbiAgICAgIF92ZWMzXzEuc2V0WChkZXRhaWxzLnBvcy54KTtcbiAgICAgIF92ZWMzXzEuc2V0WShkZXRhaWxzLnBvcy55KTtcbiAgICAgIF92ZWMzXzEuc2V0WihkZXRhaWxzLnBvcy56KTtcbiAgICAgIF90cmFuc2Zvcm0uc2V0T3JpZ2luKF92ZWMzXzEpO1xuICAgIH1cblxuICAgIGlmIChkZXRhaWxzLnF1YXQpIHtcbiAgICAgIF9xdWF0LnNldFgoZGV0YWlscy5xdWF0LngpO1xuICAgICAgX3F1YXQuc2V0WShkZXRhaWxzLnF1YXQueSk7XG4gICAgICBfcXVhdC5zZXRaKGRldGFpbHMucXVhdC56KTtcbiAgICAgIF9xdWF0LnNldFcoZGV0YWlscy5xdWF0LncpO1xuICAgICAgX3RyYW5zZm9ybS5zZXRSb3RhdGlvbihfcXVhdCk7XG4gICAgfVxuXG4gICAgX29iamVjdC5zZXRXb3JsZFRyYW5zZm9ybShfdHJhbnNmb3JtKTtcbiAgICBfb2JqZWN0LmFjdGl2YXRlKCk7XG4gIH0gZWxzZSBpZiAoX29iamVjdC50eXBlID09PSAwKSB7XG4gICAgLy8gX29iamVjdC5nZXRXb3JsZFRyYW5zZm9ybShfdHJhbnNmb3JtKTtcblxuICAgIGlmIChkZXRhaWxzLnBvcykge1xuICAgICAgX3ZlYzNfMS5zZXRYKGRldGFpbHMucG9zLngpO1xuICAgICAgX3ZlYzNfMS5zZXRZKGRldGFpbHMucG9zLnkpO1xuICAgICAgX3ZlYzNfMS5zZXRaKGRldGFpbHMucG9zLnopO1xuICAgICAgX3RyYW5zZm9ybS5zZXRPcmlnaW4oX3ZlYzNfMSk7XG4gICAgfVxuXG4gICAgaWYgKGRldGFpbHMucXVhdCkge1xuICAgICAgX3F1YXQuc2V0WChkZXRhaWxzLnF1YXQueCk7XG4gICAgICBfcXVhdC5zZXRZKGRldGFpbHMucXVhdC55KTtcbiAgICAgIF9xdWF0LnNldFooZGV0YWlscy5xdWF0LnopO1xuICAgICAgX3F1YXQuc2V0VyhkZXRhaWxzLnF1YXQudyk7XG4gICAgICBfdHJhbnNmb3JtLnNldFJvdGF0aW9uKF9xdWF0KTtcbiAgICB9XG5cbiAgICBfb2JqZWN0LnRyYW5zZm9ybShfdHJhbnNmb3JtKTtcbiAgfVxufTtcblxucHVibGljX2Z1bmN0aW9ucy51cGRhdGVNYXNzID0gKGRldGFpbHMpID0+IHtcbiAgLy8gI1RPRE86IGNoYW5naW5nIGEgc3RhdGljIG9iamVjdCBpbnRvIGR5bmFtaWMgaXMgYnVnZ3lcbiAgX29iamVjdCA9IF9vYmplY3RzW2RldGFpbHMuaWRdO1xuXG4gIC8vIFBlciBodHRwOi8vd3d3LmJ1bGxldHBoeXNpY3Mub3JnL0J1bGxldC9waHBCQjMvdmlld3RvcGljLnBocD9wPSZmPTkmdD0zNjYzI3AxMzgxNlxuICB3b3JsZC5yZW1vdmVSaWdpZEJvZHkoX29iamVjdCk7XG5cbiAgX3ZlYzNfMS5zZXRYKDApO1xuICBfdmVjM18xLnNldFkoMCk7XG4gIF92ZWMzXzEuc2V0WigwKTtcblxuICBfb2JqZWN0LnNldE1hc3NQcm9wcyhkZXRhaWxzLm1hc3MsIF92ZWMzXzEpO1xuICB3b3JsZC5hZGRSaWdpZEJvZHkoX29iamVjdCk7XG4gIF9vYmplY3QuYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuYXBwbHlDZW50cmFsSW1wdWxzZSA9IChkZXRhaWxzKSA9PiB7XG4gIF92ZWMzXzEuc2V0WChkZXRhaWxzLngpO1xuICBfdmVjM18xLnNldFkoZGV0YWlscy55KTtcbiAgX3ZlYzNfMS5zZXRaKGRldGFpbHMueik7XG5cbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYXBwbHlDZW50cmFsSW1wdWxzZShfdmVjM18xKTtcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuYXBwbHlJbXB1bHNlID0gKGRldGFpbHMpID0+IHtcbiAgX3ZlYzNfMS5zZXRYKGRldGFpbHMuaW1wdWxzZV94KTtcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMuaW1wdWxzZV95KTtcbiAgX3ZlYzNfMS5zZXRaKGRldGFpbHMuaW1wdWxzZV96KTtcblxuICBfdmVjM18yLnNldFgoZGV0YWlscy54KTtcbiAgX3ZlYzNfMi5zZXRZKGRldGFpbHMueSk7XG4gIF92ZWMzXzIuc2V0WihkZXRhaWxzLnopO1xuXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFwcGx5SW1wdWxzZShcbiAgICBfdmVjM18xLFxuICAgIF92ZWMzXzJcbiAgKTtcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuYXBwbHlUb3JxdWUgPSAoZGV0YWlscykgPT4ge1xuICBfdmVjM18xLnNldFgoZGV0YWlscy50b3JxdWVfeCk7XG4gIF92ZWMzXzEuc2V0WShkZXRhaWxzLnRvcnF1ZV95KTtcbiAgX3ZlYzNfMS5zZXRaKGRldGFpbHMudG9ycXVlX3opO1xuXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFwcGx5VG9ycXVlKFxuICAgIF92ZWMzXzFcbiAgKTtcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuYXBwbHlDZW50cmFsRm9yY2UgPSAoZGV0YWlscykgPT4ge1xuICBfdmVjM18xLnNldFgoZGV0YWlscy54KTtcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMueSk7XG4gIF92ZWMzXzEuc2V0WihkZXRhaWxzLnopO1xuXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFwcGx5Q2VudHJhbEZvcmNlKF92ZWMzXzEpO1xuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5hY3RpdmF0ZSgpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5hcHBseUZvcmNlID0gKGRldGFpbHMpID0+IHtcbiAgX3ZlYzNfMS5zZXRYKGRldGFpbHMuZm9yY2VfeCk7XG4gIF92ZWMzXzEuc2V0WShkZXRhaWxzLmZvcmNlX3kpO1xuICBfdmVjM18xLnNldFooZGV0YWlscy5mb3JjZV96KTtcblxuICBfdmVjM18yLnNldFgoZGV0YWlscy54KTtcbiAgX3ZlYzNfMi5zZXRZKGRldGFpbHMueSk7XG4gIF92ZWMzXzIuc2V0WihkZXRhaWxzLnopO1xuXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFwcGx5Rm9yY2UoXG4gICAgX3ZlYzNfMSxcbiAgICBfdmVjM18yXG4gICk7XG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLm9uU2ltdWxhdGlvblJlc3VtZSA9ICgpID0+IHtcbiAgbGFzdF9zaW11bGF0aW9uX3RpbWUgPSBEYXRlLm5vdygpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5zZXRBbmd1bGFyVmVsb2NpdHkgPSAoZGV0YWlscykgPT4ge1xuICBfdmVjM18xLnNldFgoZGV0YWlscy54KTtcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMueSk7XG4gIF92ZWMzXzEuc2V0WihkZXRhaWxzLnopO1xuXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLnNldEFuZ3VsYXJWZWxvY2l0eShcbiAgICBfdmVjM18xXG4gICk7XG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLnNldExpbmVhclZlbG9jaXR5ID0gKGRldGFpbHMpID0+IHtcbiAgX3ZlYzNfMS5zZXRYKGRldGFpbHMueCk7XG4gIF92ZWMzXzEuc2V0WShkZXRhaWxzLnkpO1xuICBfdmVjM18xLnNldFooZGV0YWlscy56KTtcblxuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5zZXRMaW5lYXJWZWxvY2l0eShcbiAgICBfdmVjM18xXG4gICk7XG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLnNldEFuZ3VsYXJGYWN0b3IgPSAoZGV0YWlscykgPT4ge1xuICBfdmVjM18xLnNldFgoZGV0YWlscy54KTtcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMueSk7XG4gIF92ZWMzXzEuc2V0WihkZXRhaWxzLnopO1xuXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLnNldEFuZ3VsYXJGYWN0b3IoXG4gICAgICBfdmVjM18xXG4gICk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLnNldExpbmVhckZhY3RvciA9IChkZXRhaWxzKSA9PiB7XG4gIF92ZWMzXzEuc2V0WChkZXRhaWxzLngpO1xuICBfdmVjM18xLnNldFkoZGV0YWlscy55KTtcbiAgX3ZlYzNfMS5zZXRaKGRldGFpbHMueik7XG5cbiAgX29iamVjdHNbZGV0YWlscy5pZF0uc2V0TGluZWFyRmFjdG9yKFxuICAgIF92ZWMzXzFcbiAgKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuc2V0RGFtcGluZyA9IChkZXRhaWxzKSA9PiB7XG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLnNldERhbXBpbmcoZGV0YWlscy5saW5lYXIsIGRldGFpbHMuYW5ndWxhcik7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLnNldENjZE1vdGlvblRocmVzaG9sZCA9IChkZXRhaWxzKSA9PiB7XG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLnNldENjZE1vdGlvblRocmVzaG9sZChkZXRhaWxzLnRocmVzaG9sZCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLnNldENjZFN3ZXB0U3BoZXJlUmFkaXVzID0gKGRldGFpbHMpID0+IHtcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uc2V0Q2NkU3dlcHRTcGhlcmVSYWRpdXMoZGV0YWlscy5yYWRpdXMpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5hZGRDb25zdHJhaW50ID0gKGRldGFpbHMpID0+IHtcbiAgbGV0IGNvbnN0cmFpbnQ7XG5cbiAgc3dpdGNoIChkZXRhaWxzLnR5cGUpIHtcblxuICAgIGNhc2UgJ3BvaW50Jzoge1xuICAgICAgaWYgKGRldGFpbHMub2JqZWN0YiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIF92ZWMzXzEuc2V0WChkZXRhaWxzLnBvc2l0aW9uYS54KTtcbiAgICAgICAgX3ZlYzNfMS5zZXRZKGRldGFpbHMucG9zaXRpb25hLnkpO1xuICAgICAgICBfdmVjM18xLnNldFooZGV0YWlscy5wb3NpdGlvbmEueik7XG5cbiAgICAgICAgY29uc3RyYWludCA9IG5ldyBBbW1vLmJ0UG9pbnQyUG9pbnRDb25zdHJhaW50KFxuICAgICAgICAgIF9vYmplY3RzW2RldGFpbHMub2JqZWN0YV0sXG4gICAgICAgICAgX3ZlYzNfMVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3ZlYzNfMS5zZXRYKGRldGFpbHMucG9zaXRpb25hLngpO1xuICAgICAgICBfdmVjM18xLnNldFkoZGV0YWlscy5wb3NpdGlvbmEueSk7XG4gICAgICAgIF92ZWMzXzEuc2V0WihkZXRhaWxzLnBvc2l0aW9uYS56KTtcblxuICAgICAgICBfdmVjM18yLnNldFgoZGV0YWlscy5wb3NpdGlvbmIueCk7XG4gICAgICAgIF92ZWMzXzIuc2V0WShkZXRhaWxzLnBvc2l0aW9uYi55KTtcbiAgICAgICAgX3ZlYzNfMi5zZXRaKGRldGFpbHMucG9zaXRpb25iLnopO1xuXG4gICAgICAgIGNvbnN0cmFpbnQgPSBuZXcgQW1tby5idFBvaW50MlBvaW50Q29uc3RyYWludChcbiAgICAgICAgICBfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGFdLFxuICAgICAgICAgIF9vYmplY3RzW2RldGFpbHMub2JqZWN0Yl0sXG4gICAgICAgICAgX3ZlYzNfMSxcbiAgICAgICAgICBfdmVjM18yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnaGluZ2UnOiB7XG4gICAgICBpZiAoZGV0YWlscy5vYmplY3RiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgX3ZlYzNfMS5zZXRYKGRldGFpbHMucG9zaXRpb25hLngpO1xuICAgICAgICBfdmVjM18xLnNldFkoZGV0YWlscy5wb3NpdGlvbmEueSk7XG4gICAgICAgIF92ZWMzXzEuc2V0WihkZXRhaWxzLnBvc2l0aW9uYS56KTtcblxuICAgICAgICBfdmVjM18yLnNldFgoZGV0YWlscy5heGlzLngpO1xuICAgICAgICBfdmVjM18yLnNldFkoZGV0YWlscy5heGlzLnkpO1xuICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5heGlzLnopO1xuXG4gICAgICAgIGNvbnN0cmFpbnQgPSBuZXcgQW1tby5idEhpbmdlQ29uc3RyYWludChcbiAgICAgICAgICBfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGFdLFxuICAgICAgICAgIF92ZWMzXzEsXG4gICAgICAgICAgX3ZlYzNfMlxuICAgICAgICApO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdmVjM18xLnNldFgoZGV0YWlscy5wb3NpdGlvbmEueCk7XG4gICAgICAgIF92ZWMzXzEuc2V0WShkZXRhaWxzLnBvc2l0aW9uYS55KTtcbiAgICAgICAgX3ZlYzNfMS5zZXRaKGRldGFpbHMucG9zaXRpb25hLnopO1xuXG4gICAgICAgIF92ZWMzXzIuc2V0WChkZXRhaWxzLnBvc2l0aW9uYi54KTtcbiAgICAgICAgX3ZlYzNfMi5zZXRZKGRldGFpbHMucG9zaXRpb25iLnkpO1xuICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5wb3NpdGlvbmIueik7XG5cbiAgICAgICAgX3ZlYzNfMy5zZXRYKGRldGFpbHMuYXhpcy54KTtcbiAgICAgICAgX3ZlYzNfMy5zZXRZKGRldGFpbHMuYXhpcy55KTtcbiAgICAgICAgX3ZlYzNfMy5zZXRaKGRldGFpbHMuYXhpcy56KTtcblxuICAgICAgICBjb25zdHJhaW50ID0gbmV3IEFtbW8uYnRIaW5nZUNvbnN0cmFpbnQoXG4gICAgICAgICAgX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSxcbiAgICAgICAgICBfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGJdLFxuICAgICAgICAgIF92ZWMzXzEsXG4gICAgICAgICAgX3ZlYzNfMixcbiAgICAgICAgICBfdmVjM18zLFxuICAgICAgICAgIF92ZWMzXzNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdzbGlkZXInOiB7XG4gICAgICBsZXQgdHJhbnNmb3JtYjtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybWEgPSBuZXcgQW1tby5idFRyYW5zZm9ybSgpO1xuXG4gICAgICBfdmVjM18xLnNldFgoZGV0YWlscy5wb3NpdGlvbmEueCk7XG4gICAgICBfdmVjM18xLnNldFkoZGV0YWlscy5wb3NpdGlvbmEueSk7XG4gICAgICBfdmVjM18xLnNldFooZGV0YWlscy5wb3NpdGlvbmEueik7XG5cbiAgICAgIHRyYW5zZm9ybWEuc2V0T3JpZ2luKF92ZWMzXzEpO1xuXG4gICAgICBsZXQgcm90YXRpb24gPSB0cmFuc2Zvcm1hLmdldFJvdGF0aW9uKCk7XG4gICAgICByb3RhdGlvbi5zZXRFdWxlcihkZXRhaWxzLmF4aXMueCwgZGV0YWlscy5heGlzLnksIGRldGFpbHMuYXhpcy56KTtcbiAgICAgIHRyYW5zZm9ybWEuc2V0Um90YXRpb24ocm90YXRpb24pO1xuXG4gICAgICBpZiAoZGV0YWlscy5vYmplY3RiKSB7XG4gICAgICAgIHRyYW5zZm9ybWIgPSBuZXcgQW1tby5idFRyYW5zZm9ybSgpO1xuXG4gICAgICAgIF92ZWMzXzIuc2V0WChkZXRhaWxzLnBvc2l0aW9uYi54KTtcbiAgICAgICAgX3ZlYzNfMi5zZXRZKGRldGFpbHMucG9zaXRpb25iLnkpO1xuICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5wb3NpdGlvbmIueik7XG5cbiAgICAgICAgdHJhbnNmb3JtYi5zZXRPcmlnaW4oX3ZlYzNfMik7XG5cbiAgICAgICAgcm90YXRpb24gPSB0cmFuc2Zvcm1iLmdldFJvdGF0aW9uKCk7XG4gICAgICAgIHJvdGF0aW9uLnNldEV1bGVyKGRldGFpbHMuYXhpcy54LCBkZXRhaWxzLmF4aXMueSwgZGV0YWlscy5heGlzLnopO1xuICAgICAgICB0cmFuc2Zvcm1iLnNldFJvdGF0aW9uKHJvdGF0aW9uKTtcblxuICAgICAgICBjb25zdHJhaW50ID0gbmV3IEFtbW8uYnRTbGlkZXJDb25zdHJhaW50KFxuICAgICAgICAgIF9vYmplY3RzW2RldGFpbHMub2JqZWN0YV0sXG4gICAgICAgICAgX29iamVjdHNbZGV0YWlscy5vYmplY3RiXSxcbiAgICAgICAgICB0cmFuc2Zvcm1hLFxuICAgICAgICAgIHRyYW5zZm9ybWIsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3RyYWludCA9IG5ldyBBbW1vLmJ0U2xpZGVyQ29uc3RyYWludChcbiAgICAgICAgICBfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGFdLFxuICAgICAgICAgIHRyYW5zZm9ybWEsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdHJhaW50LnRhID0gdHJhbnNmb3JtYTtcbiAgICAgIGNvbnN0cmFpbnQudGIgPSB0cmFuc2Zvcm1iO1xuXG4gICAgICBBbW1vLmRlc3Ryb3kodHJhbnNmb3JtYSk7XG4gICAgICBpZiAodHJhbnNmb3JtYiAhPT0gdW5kZWZpbmVkKSBBbW1vLmRlc3Ryb3kodHJhbnNmb3JtYik7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdjb25ldHdpc3QnOiB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1hID0gbmV3IEFtbW8uYnRUcmFuc2Zvcm0oKTtcbiAgICAgIHRyYW5zZm9ybWEuc2V0SWRlbnRpdHkoKTtcblxuICAgICAgY29uc3QgdHJhbnNmb3JtYiA9IG5ldyBBbW1vLmJ0VHJhbnNmb3JtKCk7XG4gICAgICB0cmFuc2Zvcm1iLnNldElkZW50aXR5KCk7XG5cbiAgICAgIF92ZWMzXzEuc2V0WChkZXRhaWxzLnBvc2l0aW9uYS54KTtcbiAgICAgIF92ZWMzXzEuc2V0WShkZXRhaWxzLnBvc2l0aW9uYS55KTtcbiAgICAgIF92ZWMzXzEuc2V0WihkZXRhaWxzLnBvc2l0aW9uYS56KTtcblxuICAgICAgX3ZlYzNfMi5zZXRYKGRldGFpbHMucG9zaXRpb25iLngpO1xuICAgICAgX3ZlYzNfMi5zZXRZKGRldGFpbHMucG9zaXRpb25iLnkpO1xuICAgICAgX3ZlYzNfMi5zZXRaKGRldGFpbHMucG9zaXRpb25iLnopO1xuXG4gICAgICB0cmFuc2Zvcm1hLnNldE9yaWdpbihfdmVjM18xKTtcbiAgICAgIHRyYW5zZm9ybWIuc2V0T3JpZ2luKF92ZWMzXzIpO1xuXG4gICAgICBsZXQgcm90YXRpb24gPSB0cmFuc2Zvcm1hLmdldFJvdGF0aW9uKCk7XG4gICAgICByb3RhdGlvbi5zZXRFdWxlclpZWCgtZGV0YWlscy5heGlzYS56LCAtZGV0YWlscy5heGlzYS55LCAtZGV0YWlscy5heGlzYS54KTtcbiAgICAgIHRyYW5zZm9ybWEuc2V0Um90YXRpb24ocm90YXRpb24pO1xuXG4gICAgICByb3RhdGlvbiA9IHRyYW5zZm9ybWIuZ2V0Um90YXRpb24oKTtcbiAgICAgIHJvdGF0aW9uLnNldEV1bGVyWllYKC1kZXRhaWxzLmF4aXNiLnosIC1kZXRhaWxzLmF4aXNiLnksIC1kZXRhaWxzLmF4aXNiLngpO1xuICAgICAgdHJhbnNmb3JtYi5zZXRSb3RhdGlvbihyb3RhdGlvbik7XG5cbiAgICAgIGNvbnN0cmFpbnQgPSBuZXcgQW1tby5idENvbmVUd2lzdENvbnN0cmFpbnQoXG4gICAgICAgIF9vYmplY3RzW2RldGFpbHMub2JqZWN0YV0sXG4gICAgICAgIF9vYmplY3RzW2RldGFpbHMub2JqZWN0Yl0sXG4gICAgICAgIHRyYW5zZm9ybWEsXG4gICAgICAgIHRyYW5zZm9ybWJcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0cmFpbnQuc2V0TGltaXQoTWF0aC5QSSwgMCwgTWF0aC5QSSk7XG5cbiAgICAgIGNvbnN0cmFpbnQudGEgPSB0cmFuc2Zvcm1hO1xuICAgICAgY29uc3RyYWludC50YiA9IHRyYW5zZm9ybWI7XG5cbiAgICAgIEFtbW8uZGVzdHJveSh0cmFuc2Zvcm1hKTtcbiAgICAgIEFtbW8uZGVzdHJveSh0cmFuc2Zvcm1iKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ2RvZic6IHtcbiAgICAgIGxldCB0cmFuc2Zvcm1iO1xuXG4gICAgICBjb25zdCB0cmFuc2Zvcm1hID0gbmV3IEFtbW8uYnRUcmFuc2Zvcm0oKTtcbiAgICAgIHRyYW5zZm9ybWEuc2V0SWRlbnRpdHkoKTtcblxuICAgICAgX3ZlYzNfMS5zZXRYKGRldGFpbHMucG9zaXRpb25hLngpO1xuICAgICAgX3ZlYzNfMS5zZXRZKGRldGFpbHMucG9zaXRpb25hLnkpO1xuICAgICAgX3ZlYzNfMS5zZXRaKGRldGFpbHMucG9zaXRpb25hLnopO1xuXG4gICAgICB0cmFuc2Zvcm1hLnNldE9yaWdpbihfdmVjM18xKTtcblxuICAgICAgbGV0IHJvdGF0aW9uID0gdHJhbnNmb3JtYS5nZXRSb3RhdGlvbigpO1xuICAgICAgcm90YXRpb24uc2V0RXVsZXJaWVgoLWRldGFpbHMuYXhpc2EueiwgLWRldGFpbHMuYXhpc2EueSwgLWRldGFpbHMuYXhpc2EueCk7XG4gICAgICB0cmFuc2Zvcm1hLnNldFJvdGF0aW9uKHJvdGF0aW9uKTtcblxuICAgICAgaWYgKGRldGFpbHMub2JqZWN0Yikge1xuICAgICAgICB0cmFuc2Zvcm1iID0gbmV3IEFtbW8uYnRUcmFuc2Zvcm0oKTtcbiAgICAgICAgdHJhbnNmb3JtYi5zZXRJZGVudGl0eSgpO1xuXG4gICAgICAgIF92ZWMzXzIuc2V0WChkZXRhaWxzLnBvc2l0aW9uYi54KTtcbiAgICAgICAgX3ZlYzNfMi5zZXRZKGRldGFpbHMucG9zaXRpb25iLnkpO1xuICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5wb3NpdGlvbmIueik7XG5cbiAgICAgICAgdHJhbnNmb3JtYi5zZXRPcmlnaW4oX3ZlYzNfMik7XG5cbiAgICAgICAgcm90YXRpb24gPSB0cmFuc2Zvcm1iLmdldFJvdGF0aW9uKCk7XG4gICAgICAgIHJvdGF0aW9uLnNldEV1bGVyWllYKC1kZXRhaWxzLmF4aXNiLnosIC1kZXRhaWxzLmF4aXNiLnksIC1kZXRhaWxzLmF4aXNiLngpO1xuICAgICAgICB0cmFuc2Zvcm1iLnNldFJvdGF0aW9uKHJvdGF0aW9uKTtcblxuICAgICAgICBjb25zdHJhaW50ID0gbmV3IEFtbW8uYnRHZW5lcmljNkRvZkNvbnN0cmFpbnQoXG4gICAgICAgICAgX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSxcbiAgICAgICAgICBfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGJdLFxuICAgICAgICAgIHRyYW5zZm9ybWEsXG4gICAgICAgICAgdHJhbnNmb3JtYixcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdHJhaW50ID0gbmV3IEFtbW8uYnRHZW5lcmljNkRvZkNvbnN0cmFpbnQoXG4gICAgICAgICAgX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSxcbiAgICAgICAgICB0cmFuc2Zvcm1hLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3RyYWludC50YSA9IHRyYW5zZm9ybWE7XG4gICAgICBjb25zdHJhaW50LnRiID0gdHJhbnNmb3JtYjtcblxuICAgICAgQW1tby5kZXN0cm95KHRyYW5zZm9ybWEpO1xuICAgICAgaWYgKHRyYW5zZm9ybWIgIT09IHVuZGVmaW5lZCkgQW1tby5kZXN0cm95KHRyYW5zZm9ybWIpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHdvcmxkLmFkZENvbnN0cmFpbnQoY29uc3RyYWludCk7XG5cbiAgY29uc3RyYWludC5hID0gX29iamVjdHNbZGV0YWlscy5vYmplY3RhXTtcbiAgY29uc3RyYWludC5iID0gX29iamVjdHNbZGV0YWlscy5vYmplY3RiXTtcblxuICBjb25zdHJhaW50LmVuYWJsZUZlZWRiYWNrKCk7XG4gIF9jb25zdHJhaW50c1tkZXRhaWxzLmlkXSA9IGNvbnN0cmFpbnQ7XG4gIF9udW1fY29uc3RyYWludHMrKztcblxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHtcbiAgICBjb25zdHJhaW50cmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheSgxICsgX251bV9jb25zdHJhaW50cyAqIENPTlNUUkFJTlRSRVBPUlRfSVRFTVNJWkUpOyAvLyBtZXNzYWdlIGlkICYgKCAjIG9mIG9iamVjdHMgdG8gcmVwb3J0ICogIyBvZiB2YWx1ZXMgcGVyIG9iamVjdCApXG4gICAgY29uc3RyYWludHJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuQ09OU1RSQUlOVFJFUE9SVDtcbiAgfSBlbHNlIGNvbnN0cmFpbnRyZXBvcnQgPSBbTUVTU0FHRV9UWVBFUy5DT05TVFJBSU5UUkVQT1JUXTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMucmVtb3ZlQ29uc3RyYWludCA9IChkZXRhaWxzKSA9PiB7XG4gIGNvbnN0IGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbZGV0YWlscy5pZF07XG5cbiAgaWYgKGNvbnN0cmFpbnQgIT09IHVuZGVmaW5lZCkge1xuICAgIHdvcmxkLnJlbW92ZUNvbnN0cmFpbnQoY29uc3RyYWludCk7XG4gICAgX2NvbnN0cmFpbnRzW2RldGFpbHMuaWRdID0gbnVsbDtcbiAgICBfbnVtX2NvbnN0cmFpbnRzLS07XG4gIH1cbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuY29uc3RyYWludF9zZXRCcmVha2luZ0ltcHVsc2VUaHJlc2hvbGQgPSAoZGV0YWlscykgPT4ge1xuICBjb25zdCBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW2RldGFpbHMuaWRdO1xuICBpZiAoY29uc3RyYWludCAhPT0gdW5kZWZpbmQpIGNvbnN0cmFpbnQuc2V0QnJlYWtpbmdJbXB1bHNlVGhyZXNob2xkKGRldGFpbHMudGhyZXNob2xkKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuc2ltdWxhdGUgPSAocGFyYW1zID0ge30pID0+IHtcbiAgaWYgKHdvcmxkKSB7XG4gICAgaWYgKHBhcmFtcy50aW1lU3RlcCAmJiBwYXJhbXMudGltZVN0ZXAgPCBmaXhlZFRpbWVTdGVwKVxuICAgICAgcGFyYW1zLnRpbWVTdGVwID0gZml4ZWRUaW1lU3RlcDtcblxuICAgIHBhcmFtcy5tYXhTdWJTdGVwcyA9IHBhcmFtcy5tYXhTdWJTdGVwcyB8fCBNYXRoLmNlaWwocGFyYW1zLnRpbWVTdGVwIC8gZml4ZWRUaW1lU3RlcCk7IC8vIElmIG1heFN1YlN0ZXBzIGlzIG5vdCBkZWZpbmVkLCBrZWVwIHRoZSBzaW11bGF0aW9uIGZ1bGx5IHVwIHRvIGRhdGVcblxuICAgIHdvcmxkLnN0ZXBTaW11bGF0aW9uKHBhcmFtcy50aW1lU3RlcCwgcGFyYW1zLm1heFN1YlN0ZXBzLCBmaXhlZFRpbWVTdGVwKTtcblxuICAgIGlmIChfdmVoaWNsZXMubGVuZ3RoID4gMCkgcmVwb3J0VmVoaWNsZXMoKTtcbiAgICByZXBvcnRDb2xsaXNpb25zKCk7XG4gICAgaWYgKF9jb25zdHJhaW50cy5sZW5ndGggPiAwKSByZXBvcnRDb25zdHJhaW50cygpO1xuICAgIHJlcG9ydFdvcmxkKCk7XG4gICAgaWYgKF9zb2Z0Ym9keV9lbmFibGVkKSByZXBvcnRXb3JsZF9zb2Z0Ym9kaWVzKCk7XG4gIH1cbn07XG5cbi8vIENvbnN0cmFpbnQgZnVuY3Rpb25zXG5wdWJsaWNfZnVuY3Rpb25zLmhpbmdlX3NldExpbWl0cyA9IChwYXJhbXMpID0+IHtcbiAgX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XS5zZXRMaW1pdChwYXJhbXMubG93LCBwYXJhbXMuaGlnaCwgMCwgcGFyYW1zLmJpYXNfZmFjdG9yLCBwYXJhbXMucmVsYXhhdGlvbl9mYWN0b3IpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5oaW5nZV9lbmFibGVBbmd1bGFyTW90b3IgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xuICBjb25zdHJhaW50LmVuYWJsZUFuZ3VsYXJNb3Rvcih0cnVlLCBwYXJhbXMudmVsb2NpdHksIHBhcmFtcy5hY2NlbGVyYXRpb24pO1xuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLmhpbmdlX2Rpc2FibGVNb3RvciA9IChwYXJhbXMpID0+IHtcbiAgX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XS5lbmFibGVNb3RvcihmYWxzZSk7XG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5zbGlkZXJfc2V0TGltaXRzID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcbiAgY29uc3RyYWludC5zZXRMb3dlckxpbkxpbWl0KHBhcmFtcy5saW5fbG93ZXIgfHwgMCk7XG4gIGNvbnN0cmFpbnQuc2V0VXBwZXJMaW5MaW1pdChwYXJhbXMubGluX3VwcGVyIHx8IDApO1xuXG4gIGNvbnN0cmFpbnQuc2V0TG93ZXJBbmdMaW1pdChwYXJhbXMuYW5nX2xvd2VyIHx8IDApO1xuICBjb25zdHJhaW50LnNldFVwcGVyQW5nTGltaXQocGFyYW1zLmFuZ191cHBlciB8fCAwKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuc2xpZGVyX3NldFJlc3RpdHV0aW9uID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcbiAgY29uc3RyYWludC5zZXRTb2Z0bmVzc0xpbUxpbihwYXJhbXMubGluZWFyIHx8IDApO1xuICBjb25zdHJhaW50LnNldFNvZnRuZXNzTGltQW5nKHBhcmFtcy5hbmd1bGFyIHx8IDApO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5zbGlkZXJfZW5hYmxlTGluZWFyTW90b3IgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xuICBjb25zdHJhaW50LnNldFRhcmdldExpbk1vdG9yVmVsb2NpdHkocGFyYW1zLnZlbG9jaXR5KTtcbiAgY29uc3RyYWludC5zZXRNYXhMaW5Nb3RvckZvcmNlKHBhcmFtcy5hY2NlbGVyYXRpb24pO1xuICBjb25zdHJhaW50LnNldFBvd2VyZWRMaW5Nb3Rvcih0cnVlKTtcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5zbGlkZXJfZGlzYWJsZUxpbmVhck1vdG9yID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcbiAgY29uc3RyYWludC5zZXRQb3dlcmVkTGluTW90b3IoZmFsc2UpO1xuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuc2xpZGVyX2VuYWJsZUFuZ3VsYXJNb3RvciA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XG4gIGNvbnN0cmFpbnQuc2V0VGFyZ2V0QW5nTW90b3JWZWxvY2l0eShwYXJhbXMudmVsb2NpdHkpO1xuICBjb25zdHJhaW50LnNldE1heEFuZ01vdG9yRm9yY2UocGFyYW1zLmFjY2VsZXJhdGlvbik7XG4gIGNvbnN0cmFpbnQuc2V0UG93ZXJlZEFuZ01vdG9yKHRydWUpO1xuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLnNsaWRlcl9kaXNhYmxlQW5ndWxhck1vdG9yID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcbiAgY29uc3RyYWludC5zZXRQb3dlcmVkQW5nTW90b3IoZmFsc2UpO1xuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLmNvbmV0d2lzdF9zZXRMaW1pdCA9IChwYXJhbXMpID0+IHtcbiAgX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XS5zZXRMaW1pdChwYXJhbXMueiwgcGFyYW1zLnksIHBhcmFtcy54KTsgLy8gWllYIG9yZGVyXG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLmNvbmV0d2lzdF9lbmFibGVNb3RvciA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XG4gIGNvbnN0cmFpbnQuZW5hYmxlTW90b3IodHJ1ZSk7XG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xuICBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuY29uZXR3aXN0X3NldE1heE1vdG9ySW1wdWxzZSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XG4gIGNvbnN0cmFpbnQuc2V0TWF4TW90b3JJbXB1bHNlKHBhcmFtcy5tYXhfaW1wdWxzZSk7XG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xuICBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuY29uZXR3aXN0X3NldE1vdG9yVGFyZ2V0ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcblxuICBfcXVhdC5zZXRYKHBhcmFtcy54KTtcbiAgX3F1YXQuc2V0WShwYXJhbXMueSk7XG4gIF9xdWF0LnNldFoocGFyYW1zLnopO1xuICBfcXVhdC5zZXRXKHBhcmFtcy53KTtcblxuICBjb25zdHJhaW50LnNldE1vdG9yVGFyZ2V0KF9xdWF0KTtcblxuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcbiAgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLmNvbmV0d2lzdF9kaXNhYmxlTW90b3IgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xuICBjb25zdHJhaW50LmVuYWJsZU1vdG9yKGZhbHNlKTtcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XG4gIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5kb2Zfc2V0TGluZWFyTG93ZXJMaW1pdCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XG5cbiAgX3ZlYzNfMS5zZXRYKHBhcmFtcy54KTtcbiAgX3ZlYzNfMS5zZXRZKHBhcmFtcy55KTtcbiAgX3ZlYzNfMS5zZXRaKHBhcmFtcy56KTtcblxuICBjb25zdHJhaW50LnNldExpbmVhckxvd2VyTGltaXQoX3ZlYzNfMSk7XG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xuXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5kb2Zfc2V0TGluZWFyVXBwZXJMaW1pdCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XG5cbiAgX3ZlYzNfMS5zZXRYKHBhcmFtcy54KTtcbiAgX3ZlYzNfMS5zZXRZKHBhcmFtcy55KTtcbiAgX3ZlYzNfMS5zZXRaKHBhcmFtcy56KTtcblxuICBjb25zdHJhaW50LnNldExpbmVhclVwcGVyTGltaXQoX3ZlYzNfMSk7XG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xuXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5kb2Zfc2V0QW5ndWxhckxvd2VyTGltaXQgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xuXG4gIF92ZWMzXzEuc2V0WChwYXJhbXMueCk7XG4gIF92ZWMzXzEuc2V0WShwYXJhbXMueSk7XG4gIF92ZWMzXzEuc2V0WihwYXJhbXMueik7XG5cbiAgY29uc3RyYWludC5zZXRBbmd1bGFyTG93ZXJMaW1pdChfdmVjM18xKTtcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XG5cbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XG59O1xuXG5wdWJsaWNfZnVuY3Rpb25zLmRvZl9zZXRBbmd1bGFyVXBwZXJMaW1pdCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XG5cbiAgX3ZlYzNfMS5zZXRYKHBhcmFtcy54KTtcbiAgX3ZlYzNfMS5zZXRZKHBhcmFtcy55KTtcbiAgX3ZlYzNfMS5zZXRaKHBhcmFtcy56KTtcblxuICBjb25zdHJhaW50LnNldEFuZ3VsYXJVcHBlckxpbWl0KF92ZWMzXzEpO1xuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcblxuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuZG9mX2VuYWJsZUFuZ3VsYXJNb3RvciA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XG5cbiAgY29uc3QgbW90b3IgPSBjb25zdHJhaW50LmdldFJvdGF0aW9uYWxMaW1pdE1vdG9yKHBhcmFtcy53aGljaCk7XG4gIG1vdG9yLnNldF9tX2VuYWJsZU1vdG9yKHRydWUpO1xuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcblxuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcbn07XG5cbnB1YmxpY19mdW5jdGlvbnMuZG9mX2NvbmZpZ3VyZUFuZ3VsYXJNb3RvciA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF0sXG4gICAgbW90b3IgPSBjb25zdHJhaW50LmdldFJvdGF0aW9uYWxMaW1pdE1vdG9yKHBhcmFtcy53aGljaCk7XG5cbiAgbW90b3Iuc2V0X21fbG9MaW1pdChwYXJhbXMubG93X2FuZ2xlKTtcbiAgbW90b3Iuc2V0X21faGlMaW1pdChwYXJhbXMuaGlnaF9hbmdsZSk7XG4gIG1vdG9yLnNldF9tX3RhcmdldFZlbG9jaXR5KHBhcmFtcy52ZWxvY2l0eSk7XG4gIG1vdG9yLnNldF9tX21heE1vdG9yRm9yY2UocGFyYW1zLm1heF9mb3JjZSk7XG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xuXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xufTtcblxucHVibGljX2Z1bmN0aW9ucy5kb2ZfZGlzYWJsZUFuZ3VsYXJNb3RvciA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF0sXG4gICAgbW90b3IgPSBjb25zdHJhaW50LmdldFJvdGF0aW9uYWxMaW1pdE1vdG9yKHBhcmFtcy53aGljaCk7XG5cbiAgbW90b3Iuc2V0X21fZW5hYmxlTW90b3IoZmFsc2UpO1xuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcblxuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcbn07XG5cbmNvbnN0IHJlcG9ydFdvcmxkID0gKCkgPT4ge1xuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUgJiYgd29ybGRyZXBvcnQubGVuZ3RoIDwgMiArIF9udW1fcmlnaWRib2R5X29iamVjdHMgKiBXT1JMRFJFUE9SVF9JVEVNU0laRSkge1xuICAgIHdvcmxkcmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheShcbiAgICAgIDIvLyBtZXNzYWdlIGlkICYgIyBvYmplY3RzIGluIHJlcG9ydFxuICAgICAgKyAoTWF0aC5jZWlsKF9udW1fcmlnaWRib2R5X29iamVjdHMgLyBSRVBPUlRfQ0hVTktTSVpFKSAqIFJFUE9SVF9DSFVOS1NJWkUpICogV09STERSRVBPUlRfSVRFTVNJWkUgLy8gIyBvZiB2YWx1ZXMgbmVlZGVkICogaXRlbSBzaXplXG4gICAgKTtcblxuICAgIHdvcmxkcmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5XT1JMRFJFUE9SVDtcbiAgfVxuXG4gIHdvcmxkcmVwb3J0WzFdID0gX251bV9yaWdpZGJvZHlfb2JqZWN0czsgLy8gcmVjb3JkIGhvdyBtYW55IG9iamVjdHMgd2UncmUgcmVwb3J0aW5nIG9uXG5cbiAge1xuICAgIGxldCBpID0gMCxcbiAgICAgIGluZGV4ID0gX29iamVjdHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IF9vYmplY3RzW2luZGV4XTtcblxuICAgICAgaWYgKG9iamVjdCAmJiBvYmplY3QudHlwZSA9PT0gMSkgeyAvLyBSaWdpZEJvZGllcy5cbiAgICAgICAgLy8gI1RPRE86IHdlIGNhbid0IHVzZSBjZW50ZXIgb2YgbWFzcyB0cmFuc2Zvcm0gd2hlbiBjZW50ZXIgb2YgbWFzcyBjYW4gY2hhbmdlLFxuICAgICAgICAvLyAgICAgICAgYnV0IGdldE1vdGlvblN0YXRlKCkuZ2V0V29ybGRUcmFuc2Zvcm0oKSBzY3Jld3MgdXAgb24gb2JqZWN0cyB0aGF0IGhhdmUgYmVlbiBtb3ZlZFxuICAgICAgICAvLyBvYmplY3QuZ2V0TW90aW9uU3RhdGUoKS5nZXRXb3JsZFRyYW5zZm9ybSggdHJhbnNmb3JtICk7XG4gICAgICAgIC8vIG9iamVjdC5nZXRNb3Rpb25TdGF0ZSgpLmdldFdvcmxkVHJhbnNmb3JtKF90cmFuc2Zvcm0pO1xuXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IG9iamVjdC5nZXRDZW50ZXJPZk1hc3NUcmFuc2Zvcm0oKTtcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gdHJhbnNmb3JtLmdldE9yaWdpbigpO1xuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHRyYW5zZm9ybS5nZXRSb3RhdGlvbigpO1xuXG4gICAgICAgIC8vIGFkZCB2YWx1ZXMgdG8gcmVwb3J0XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDIgKyAoaSsrKSAqIFdPUkxEUkVQT1JUX0lURU1TSVpFO1xuXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldF0gPSBvYmplY3QuaWQ7XG5cbiAgICAgICAgd29ybGRyZXBvcnRbb2Zmc2V0ICsgMV0gPSBvcmlnaW4ueCgpO1xuICAgICAgICB3b3JsZHJlcG9ydFtvZmZzZXQgKyAyXSA9IG9yaWdpbi55KCk7XG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDNdID0gb3JpZ2luLnooKTtcblxuICAgICAgICB3b3JsZHJlcG9ydFtvZmZzZXQgKyA0XSA9IHJvdGF0aW9uLngoKTtcbiAgICAgICAgd29ybGRyZXBvcnRbb2Zmc2V0ICsgNV0gPSByb3RhdGlvbi55KCk7XG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDZdID0gcm90YXRpb24ueigpO1xuICAgICAgICB3b3JsZHJlcG9ydFtvZmZzZXQgKyA3XSA9IHJvdGF0aW9uLncoKTtcblxuICAgICAgICBfdmVjdG9yID0gb2JqZWN0LmdldExpbmVhclZlbG9jaXR5KCk7XG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDhdID0gX3ZlY3Rvci54KCk7XG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDldID0gX3ZlY3Rvci55KCk7XG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDEwXSA9IF92ZWN0b3IueigpO1xuXG4gICAgICAgIF92ZWN0b3IgPSBvYmplY3QuZ2V0QW5ndWxhclZlbG9jaXR5KCk7XG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDExXSA9IF92ZWN0b3IueCgpO1xuICAgICAgICB3b3JsZHJlcG9ydFtvZmZzZXQgKyAxMl0gPSBfdmVjdG9yLnkoKTtcbiAgICAgICAgd29ybGRyZXBvcnRbb2Zmc2V0ICsgMTNdID0gX3ZlY3Rvci56KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFKSB0cmFuc2ZlcmFibGVNZXNzYWdlKHdvcmxkcmVwb3J0LmJ1ZmZlciwgW3dvcmxkcmVwb3J0LmJ1ZmZlcl0pO1xuICBlbHNlIHRyYW5zZmVyYWJsZU1lc3NhZ2Uod29ybGRyZXBvcnQpO1xufTtcblxuY29uc3QgcmVwb3J0V29ybGRfc29mdGJvZGllcyA9ICgpID0+IHtcbiAgLy8gVE9ETzogQWRkIFNVUFBPUlRUUkFOU0ZFUkFCTEUuXG5cbiAgc29mdHJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoXG4gICAgMiAvLyBtZXNzYWdlIGlkICYgIyBvYmplY3RzIGluIHJlcG9ydFxuICAgICsgX251bV9zb2Z0Ym9keV9vYmplY3RzICogMlxuICAgICsgX3NvZnRib2R5X3JlcG9ydF9zaXplICogNlxuICApO1xuXG4gIHNvZnRyZXBvcnRbMF0gPSBNRVNTQUdFX1RZUEVTLlNPRlRSRVBPUlQ7XG4gIHNvZnRyZXBvcnRbMV0gPSBfbnVtX3NvZnRib2R5X29iamVjdHM7IC8vIHJlY29yZCBob3cgbWFueSBvYmplY3RzIHdlJ3JlIHJlcG9ydGluZyBvblxuXG4gIHtcbiAgICBsZXQgb2Zmc2V0ID0gMixcbiAgICAgIGluZGV4ID0gX29iamVjdHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IF9vYmplY3RzW2luZGV4XTtcblxuICAgICAgaWYgKG9iamVjdCAmJiBvYmplY3QudHlwZSA9PT0gMCkgeyAvLyBTb2Z0Qm9kaWVzLlxuXG4gICAgICAgIHNvZnRyZXBvcnRbb2Zmc2V0XSA9IG9iamVjdC5pZDtcblxuICAgICAgICBjb25zdCBvZmZzZXRWZXJ0ID0gb2Zmc2V0ICsgMjtcblxuICAgICAgICBpZiAob2JqZWN0LnJvcGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBub2RlcyA9IG9iamVjdC5nZXRfbV9ub2RlcygpO1xuICAgICAgICAgIGNvbnN0IHNpemUgPSBub2Rlcy5zaXplKCk7XG4gICAgICAgICAgc29mdHJlcG9ydFtvZmZzZXQgKyAxXSA9IHNpemU7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzLmF0KGkpO1xuICAgICAgICAgICAgY29uc3QgdmVydCA9IG5vZGUuZ2V0X21feCgpO1xuICAgICAgICAgICAgY29uc3Qgb2ZmID0gb2Zmc2V0VmVydCArIGkgKiAzO1xuXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZl0gPSB2ZXJ0LngoKTtcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgMV0gPSB2ZXJ0LnkoKTtcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgMl0gPSB2ZXJ0LnooKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvZmZzZXQgKz0gc2l6ZSAqIDYgKyAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iamVjdC5jbG90aCkge1xuICAgICAgICAgIGNvbnN0IG5vZGVzID0gb2JqZWN0LmdldF9tX25vZGVzKCk7XG4gICAgICAgICAgY29uc3Qgc2l6ZSA9IG5vZGVzLnNpemUoKTtcbiAgICAgICAgICBzb2Z0cmVwb3J0W29mZnNldCArIDFdID0gc2l6ZTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXMuYXQoaSk7XG4gICAgICAgICAgICBjb25zdCB2ZXJ0ID0gbm9kZS5nZXRfbV94KCk7XG4gICAgICAgICAgICBjb25zdCBub3JtYWwgPSBub2RlLmdldF9tX24oKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZiA9IG9mZnNldFZlcnQgKyBpICogNjtcblxuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmZdID0gdmVydC54KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDFdID0gdmVydC55KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDJdID0gdmVydC56KCk7XG5cbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgM10gPSBub3JtYWwueCgpO1xuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmYgKyA0XSA9IG5vcm1hbC55KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDVdID0gbm9ybWFsLnooKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvZmZzZXQgKz0gc2l6ZSAqIDYgKyAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGZhY2VzID0gb2JqZWN0LmdldF9tX2ZhY2VzKCk7XG4gICAgICAgICAgY29uc3Qgc2l6ZSA9IGZhY2VzLnNpemUoKTtcbiAgICAgICAgICBzb2Z0cmVwb3J0W29mZnNldCArIDFdID0gc2l6ZTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBmYWNlID0gZmFjZXMuYXQoaSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGUxID0gZmFjZS5nZXRfbV9uKDApO1xuICAgICAgICAgICAgY29uc3Qgbm9kZTIgPSBmYWNlLmdldF9tX24oMSk7XG4gICAgICAgICAgICBjb25zdCBub2RlMyA9IGZhY2UuZ2V0X21fbigyKTtcblxuICAgICAgICAgICAgY29uc3QgdmVydDEgPSBub2RlMS5nZXRfbV94KCk7XG4gICAgICAgICAgICBjb25zdCB2ZXJ0MiA9IG5vZGUyLmdldF9tX3goKTtcbiAgICAgICAgICAgIGNvbnN0IHZlcnQzID0gbm9kZTMuZ2V0X21feCgpO1xuXG4gICAgICAgICAgICBjb25zdCBub3JtYWwxID0gbm9kZTEuZ2V0X21fbigpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsMiA9IG5vZGUyLmdldF9tX24oKTtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbDMgPSBub2RlMy5nZXRfbV9uKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG9mZiA9IG9mZnNldFZlcnQgKyBpICogMTg7XG5cbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmXSA9IHZlcnQxLngoKTtcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgMV0gPSB2ZXJ0MS55KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDJdID0gdmVydDEueigpO1xuXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDNdID0gbm9ybWFsMS54KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDRdID0gbm9ybWFsMS55KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDVdID0gbm9ybWFsMS56KCk7XG5cbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgNl0gPSB2ZXJ0Mi54KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDddID0gdmVydDIueSgpO1xuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmYgKyA4XSA9IHZlcnQyLnooKTtcblxuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmYgKyA5XSA9IG5vcm1hbDIueCgpO1xuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmYgKyAxMF0gPSBub3JtYWwyLnkoKTtcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgMTFdID0gbm9ybWFsMi56KCk7XG5cbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgMTJdID0gdmVydDMueCgpO1xuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmYgKyAxM10gPSB2ZXJ0My55KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDE0XSA9IHZlcnQzLnooKTtcblxuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmYgKyAxNV0gPSBub3JtYWwzLngoKTtcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgMTZdID0gbm9ybWFsMy55KCk7XG4gICAgICAgICAgICBzb2Z0cmVwb3J0W29mZiArIDE3XSA9IG5vcm1hbDMueigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9mZnNldCArPSBzaXplICogMTggKyAyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFKSB0cmFuc2ZlcmFibGVNZXNzYWdlKHNvZnRyZXBvcnQuYnVmZmVyLCBbc29mdHJlcG9ydC5idWZmZXJdKTtcbiAgLy8gZWxzZSB0cmFuc2ZlcmFibGVNZXNzYWdlKHNvZnRyZXBvcnQpO1xuICB0cmFuc2ZlcmFibGVNZXNzYWdlKHNvZnRyZXBvcnQpO1xufTtcblxuY29uc3QgcmVwb3J0Q29sbGlzaW9ucyA9ICgpID0+IHtcbiAgY29uc3QgZHAgPSB3b3JsZC5nZXREaXNwYXRjaGVyKCksXG4gICAgbnVtID0gZHAuZ2V0TnVtTWFuaWZvbGRzKCk7XG4gICAgLy8gX2NvbGxpZGVkID0gZmFsc2U7XG5cbiAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFKSB7XG4gICAgaWYgKGNvbGxpc2lvbnJlcG9ydC5sZW5ndGggPCAyICsgbnVtICogQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFKSB7XG4gICAgICBjb2xsaXNpb25yZXBvcnQgPSBuZXcgRmxvYXQzMkFycmF5KFxuICAgICAgICAyIC8vIG1lc3NhZ2UgaWQgJiAjIG9iamVjdHMgaW4gcmVwb3J0XG4gICAgICAgICsgKE1hdGguY2VpbChfbnVtX29iamVjdHMgLyBSRVBPUlRfQ0hVTktTSVpFKSAqIFJFUE9SVF9DSFVOS1NJWkUpICogQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFIC8vICMgb2YgdmFsdWVzIG5lZWRlZCAqIGl0ZW0gc2l6ZVxuICAgICAgKTtcbiAgICAgIGNvbGxpc2lvbnJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuQ09MTElTSU9OUkVQT1JUO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxpc2lvbnJlcG9ydFsxXSA9IDA7IC8vIGhvdyBtYW55IGNvbGxpc2lvbnMgd2UncmUgcmVwb3J0aW5nIG9uXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgIGNvbnN0IG1hbmlmb2xkID0gZHAuZ2V0TWFuaWZvbGRCeUluZGV4SW50ZXJuYWwoaSksXG4gICAgICBudW1fY29udGFjdHMgPSBtYW5pZm9sZC5nZXROdW1Db250YWN0cygpO1xuXG4gICAgaWYgKG51bV9jb250YWN0cyA9PT0gMCkgY29udGludWU7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bV9jb250YWN0czsgaisrKSB7XG4gICAgICBjb25zdCBwdCA9IG1hbmlmb2xkLmdldENvbnRhY3RQb2ludChqKTtcblxuICAgICAgLy8gaWYgKCBwdC5nZXREaXN0YW5jZSgpIDwgMCApIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IDIgKyAoY29sbGlzaW9ucmVwb3J0WzFdKyspICogQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFO1xuICAgICAgY29sbGlzaW9ucmVwb3J0W29mZnNldF0gPSBfb2JqZWN0c19hbW1vW21hbmlmb2xkLmdldEJvZHkwKCkucHRyXTtcbiAgICAgIGNvbGxpc2lvbnJlcG9ydFtvZmZzZXQgKyAxXSA9IF9vYmplY3RzX2FtbW9bbWFuaWZvbGQuZ2V0Qm9keTEoKS5wdHJdO1xuXG4gICAgICBfdmVjdG9yID0gcHQuZ2V0X21fbm9ybWFsV29ybGRPbkIoKTtcbiAgICAgIGNvbGxpc2lvbnJlcG9ydFtvZmZzZXQgKyAyXSA9IF92ZWN0b3IueCgpO1xuICAgICAgY29sbGlzaW9ucmVwb3J0W29mZnNldCArIDNdID0gX3ZlY3Rvci55KCk7XG4gICAgICBjb2xsaXNpb25yZXBvcnRbb2Zmc2V0ICsgNF0gPSBfdmVjdG9yLnooKTtcbiAgICAgIGJyZWFrO1xuICAgICAgLy8gfVxuICAgICAgLy8gdHJhbnNmZXJhYmxlTWVzc2FnZShfb2JqZWN0c19hbW1vKTtcbiAgICB9XG4gIH1cblxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHRyYW5zZmVyYWJsZU1lc3NhZ2UoY29sbGlzaW9ucmVwb3J0LmJ1ZmZlciwgW2NvbGxpc2lvbnJlcG9ydC5idWZmZXJdKTtcbiAgZWxzZSB0cmFuc2ZlcmFibGVNZXNzYWdlKGNvbGxpc2lvbnJlcG9ydCk7XG59O1xuXG5jb25zdCByZXBvcnRWZWhpY2xlcyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFKSB7XG4gICAgaWYgKHZlaGljbGVyZXBvcnQubGVuZ3RoIDwgMiArIF9udW1fd2hlZWxzICogVkVISUNMRVJFUE9SVF9JVEVNU0laRSkge1xuICAgICAgdmVoaWNsZXJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoXG4gICAgICAgIDIgLy8gbWVzc2FnZSBpZCAmICMgb2JqZWN0cyBpbiByZXBvcnRcbiAgICAgICAgKyAoTWF0aC5jZWlsKF9udW1fd2hlZWxzIC8gUkVQT1JUX0NIVU5LU0laRSkgKiBSRVBPUlRfQ0hVTktTSVpFKSAqIFZFSElDTEVSRVBPUlRfSVRFTVNJWkUgLy8gIyBvZiB2YWx1ZXMgbmVlZGVkICogaXRlbSBzaXplXG4gICAgICApO1xuICAgICAgdmVoaWNsZXJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuVkVISUNMRVJFUE9SVDtcbiAgICB9XG4gIH1cblxuICB7XG4gICAgbGV0IGkgPSAwLFxuICAgICAgaiA9IDAsXG4gICAgICBpbmRleCA9IF92ZWhpY2xlcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgaWYgKF92ZWhpY2xlc1tpbmRleF0pIHtcbiAgICAgICAgY29uc3QgdmVoaWNsZSA9IF92ZWhpY2xlc1tpbmRleF07XG5cbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHZlaGljbGUuZ2V0TnVtV2hlZWxzKCk7IGorKykge1xuICAgICAgICAgIC8vIHZlaGljbGUudXBkYXRlV2hlZWxUcmFuc2Zvcm0oIGosIHRydWUgKTtcbiAgICAgICAgICAvLyB0cmFuc2Zvcm0gPSB2ZWhpY2xlLmdldFdoZWVsVHJhbnNmb3JtV1MoIGogKTtcbiAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSB2ZWhpY2xlLmdldFdoZWVsSW5mbyhqKS5nZXRfbV93b3JsZFRyYW5zZm9ybSgpO1xuXG4gICAgICAgICAgY29uc3Qgb3JpZ2luID0gdHJhbnNmb3JtLmdldE9yaWdpbigpO1xuICAgICAgICAgIGNvbnN0IHJvdGF0aW9uID0gdHJhbnNmb3JtLmdldFJvdGF0aW9uKCk7XG5cbiAgICAgICAgICAvLyBhZGQgdmFsdWVzIHRvIHJlcG9ydFxuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IDEgKyAoaSsrKSAqIFZFSElDTEVSRVBPUlRfSVRFTVNJWkU7XG5cbiAgICAgICAgICB2ZWhpY2xlcmVwb3J0W29mZnNldF0gPSBpbmRleDtcbiAgICAgICAgICB2ZWhpY2xlcmVwb3J0W29mZnNldCArIDFdID0gajtcblxuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgMl0gPSBvcmlnaW4ueCgpO1xuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgM10gPSBvcmlnaW4ueSgpO1xuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgNF0gPSBvcmlnaW4ueigpO1xuXG4gICAgICAgICAgdmVoaWNsZXJlcG9ydFtvZmZzZXQgKyA1XSA9IHJvdGF0aW9uLngoKTtcbiAgICAgICAgICB2ZWhpY2xlcmVwb3J0W29mZnNldCArIDZdID0gcm90YXRpb24ueSgpO1xuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgN10gPSByb3RhdGlvbi56KCk7XG4gICAgICAgICAgdmVoaWNsZXJlcG9ydFtvZmZzZXQgKyA4XSA9IHJvdGF0aW9uLncoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChTVVBQT1JUX1RSQU5TRkVSQUJMRSAmJiBqICE9PSAwKSB0cmFuc2ZlcmFibGVNZXNzYWdlKHZlaGljbGVyZXBvcnQuYnVmZmVyLCBbdmVoaWNsZXJlcG9ydC5idWZmZXJdKTtcbiAgICBlbHNlIGlmIChqICE9PSAwKSB0cmFuc2ZlcmFibGVNZXNzYWdlKHZlaGljbGVyZXBvcnQpO1xuICB9XG59O1xuXG5jb25zdCByZXBvcnRDb25zdHJhaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFKSB7XG4gICAgaWYgKGNvbnN0cmFpbnRyZXBvcnQubGVuZ3RoIDwgMiArIF9udW1fY29uc3RyYWludHMgKiBDT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFKSB7XG4gICAgICBjb25zdHJhaW50cmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheShcbiAgICAgICAgMiAvLyBtZXNzYWdlIGlkICYgIyBvYmplY3RzIGluIHJlcG9ydFxuICAgICAgICArIChNYXRoLmNlaWwoX251bV9jb25zdHJhaW50cyAvIFJFUE9SVF9DSFVOS1NJWkUpICogUkVQT1JUX0NIVU5LU0laRSkgKiBDT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFIC8vICMgb2YgdmFsdWVzIG5lZWRlZCAqIGl0ZW0gc2l6ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0cmFpbnRyZXBvcnRbMF0gPSBNRVNTQUdFX1RZUEVTLkNPTlNUUkFJTlRSRVBPUlQ7XG4gICAgfVxuICB9XG5cbiAge1xuICAgIGxldCBvZmZzZXQgPSAwLFxuICAgICAgaSA9IDAsXG4gICAgICBpbmRleCA9IF9jb25zdHJhaW50cy5sZW5naHQ7XG5cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgaWYgKF9jb25zdHJhaW50c1tpbmRleF0pIHtcbiAgICAgICAgY29uc3QgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1tpbmRleF07XG4gICAgICAgIGNvbnN0IG9mZnNldF9ib2R5ID0gY29uc3RyYWludC5hO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBjb25zdHJhaW50LnRhO1xuICAgICAgICBjb25zdCBvcmlnaW4gPSB0cmFuc2Zvcm0uZ2V0T3JpZ2luKCk7XG5cbiAgICAgICAgLy8gYWRkIHZhbHVlcyB0byByZXBvcnRcbiAgICAgICAgb2Zmc2V0ID0gMSArIChpKyspICogQ09OU1RSQUlOVFJFUE9SVF9JVEVNU0laRTtcblxuICAgICAgICBjb25zdHJhaW50cmVwb3J0W29mZnNldF0gPSBpbmRleDtcbiAgICAgICAgY29uc3RyYWludHJlcG9ydFtvZmZzZXQgKyAxXSA9IG9mZnNldF9ib2R5LmlkO1xuICAgICAgICBjb25zdHJhaW50cmVwb3J0W29mZnNldCArIDJdID0gb3JpZ2luLng7XG4gICAgICAgIGNvbnN0cmFpbnRyZXBvcnRbb2Zmc2V0ICsgM10gPSBvcmlnaW4ueTtcbiAgICAgICAgY29uc3RyYWludHJlcG9ydFtvZmZzZXQgKyA0XSA9IG9yaWdpbi56O1xuICAgICAgICBjb25zdHJhaW50cmVwb3J0W29mZnNldCArIDVdID0gY29uc3RyYWludC5nZXRCcmVha2luZ0ltcHVsc2VUaHJlc2hvbGQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUgJiYgaSAhPT0gMCkgdHJhbnNmZXJhYmxlTWVzc2FnZShjb25zdHJhaW50cmVwb3J0LmJ1ZmZlciwgW2NvbnN0cmFpbnRyZXBvcnQuYnVmZmVyXSk7XG4gICAgZWxzZSBpZiAoaSAhPT0gMCkgdHJhbnNmZXJhYmxlTWVzc2FnZShjb25zdHJhaW50cmVwb3J0KTtcbiAgfVxufTtcblxuc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmRhdGEgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIHtcbiAgICAvLyB0cmFuc2ZlcmFibGUgb2JqZWN0XG4gICAgc3dpdGNoIChldmVudC5kYXRhWzBdKSB7XG4gICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuV09STERSRVBPUlQ6IHtcbiAgICAgICAgd29ybGRyZXBvcnQgPSBuZXcgRmxvYXQzMkFycmF5KGV2ZW50LmRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgTUVTU0FHRV9UWVBFUy5DT0xMSVNJT05SRVBPUlQ6IHtcbiAgICAgICAgY29sbGlzaW9ucmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheShldmVudC5kYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuVkVISUNMRVJFUE9SVDoge1xuICAgICAgICB2ZWhpY2xlcmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheShldmVudC5kYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuQ09OU1RSQUlOVFJFUE9SVDoge1xuICAgICAgICBjb25zdHJhaW50cmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheShldmVudC5kYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgIH1cblxuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChldmVudC5kYXRhLmNtZCAmJiBwdWJsaWNfZnVuY3Rpb25zW2V2ZW50LmRhdGEuY21kXSkgcHVibGljX2Z1bmN0aW9uc1tldmVudC5kYXRhLmNtZF0oZXZlbnQuZGF0YS5wYXJhbXMpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93b3JrZXIuanMiXSwic291cmNlUm9vdCI6IiJ9", __webpack_require__.p + "worker.js");
};

/***/ },
/* 126 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_126__;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(51);


/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZGM4MTI2NmY2Njc0MzU0NmNiZSIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJUSFJFRVwiIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3BoeXNpY3NQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVoaWNsZS90dW5uaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWhpY2xlL3ZlaGljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RyYWludHMvQ29uZVR3aXN0Q29uc3RyYWludC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RyYWludHMvRE9GQ29uc3RyYWludC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RyYWludHMvSGluZ2VDb25zdHJhaW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdHJhaW50cy9Qb2ludENvbnN0cmFpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0cmFpbnRzL1NsaWRlckNvbnN0cmFpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0cmFpbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL0JveE1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9DYXBzdWxlTW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL0Nsb3RoTW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL0NvbXBvdW5kTW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL0NvbmNhdmVNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvQ29udmV4TW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL0N5bGluZGVyTW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL0hlaWdodGZpZWxkTW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1BsYW5lTW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1NvZnRib2R5TW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1NwaGVyZU1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9Xb3JsZE1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVoaWNsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJXSFNcIiJdLCJuYW1lcyI6WyJhcGkiLCJhcHBseUNlbnRyYWxJbXB1bHNlIiwiZm9yY2UiLCJtYW5hZ2VyIiwiaGFzIiwiZ2V0IiwiZXhlY3V0ZSIsImlkIiwiX3BoeXNpanMiLCJ4IiwieSIsInoiLCJhcHBseUltcHVsc2UiLCJvZmZzZXQiLCJpbXB1bHNlX3giLCJpbXB1bHNlX3kiLCJpbXB1bHNlX3oiLCJhcHBseVRvcnF1ZSIsInRvcnF1ZV94IiwidG9ycXVlX3kiLCJ0b3JxdWVfeiIsImFwcGx5Q2VudHJhbEZvcmNlIiwiYXBwbHlGb3JjZSIsImZvcmNlX3giLCJmb3JjZV95IiwiZm9yY2VfeiIsImdldEFuZ3VsYXJWZWxvY2l0eSIsImFuZ3VsYXJWZWxvY2l0eSIsInNldEFuZ3VsYXJWZWxvY2l0eSIsInZlbG9jaXR5IiwiZ2V0TGluZWFyVmVsb2NpdHkiLCJsaW5lYXJWZWxvY2l0eSIsInNldExpbmVhclZlbG9jaXR5Iiwic2V0QW5ndWxhckZhY3RvciIsImZhY3RvciIsInNldExpbmVhckZhY3RvciIsInNldERhbXBpbmciLCJsaW5lYXIiLCJhbmd1bGFyIiwic2V0Q2NkTW90aW9uVGhyZXNob2xkIiwidGhyZXNob2xkIiwic2V0Q2NkU3dlcHRTcGhlcmVSYWRpdXMiLCJyYWRpdXMiLCJwcm9wZXJ0aWVzIiwicG9zaXRpb24iLCJfbmF0aXZlIiwic2V0IiwidmVjdG9yMyIsInBvcyIsInNjb3BlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsIl94IiwiX19kaXJ0eVBvc2l0aW9uIiwiX3kiLCJfeiIsImNvcHkiLCJxdWF0ZXJuaW9uIiwiX19jX3JvdCIsIm5hdGl2ZSIsInF1YXQiLCJvbkNoYW5nZSIsIl9fZGlydHlSb3RhdGlvbiIsInJvdGF0aW9uIiwiZXVsZXIiLCJyb3QiLCJzZXRGcm9tRXVsZXIiLCJ3cmFwUGh5c2ljc1Byb3RvdHlwZSIsImtleSIsImJpbmQiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJvbkNvcHkiLCJzb3VyY2UiLCJjbG9uZSIsIm9uV3JhcCIsIk1FU1NBR0VfVFlQRVMiLCJXT1JMRFJFUE9SVCIsIkNPTExJU0lPTlJFUE9SVCIsIlZFSElDTEVSRVBPUlQiLCJDT05TVFJBSU5UUkVQT1JUIiwiU09GVFJFUE9SVCIsIlJFUE9SVF9JVEVNU0laRSIsIkNPTExJU0lPTlJFUE9SVF9JVEVNU0laRSIsIlZFSElDTEVSRVBPUlRfSVRFTVNJWkUiLCJDT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFIiwidGVtcDFWZWN0b3IzIiwidGVtcDJWZWN0b3IzIiwidGVtcDFNYXRyaXg0IiwidGVtcDFRdWF0IiwiZ2V0RXVsZXJYWVpGcm9tUXVhdGVybmlvbiIsInciLCJNYXRoIiwiYXRhbjIiLCJhc2luIiwiZ2V0UXVhdGVydGlvbkZyb21FdWxlciIsImMxIiwiY29zIiwiczEiLCJzaW4iLCJjMiIsInMyIiwiYzMiLCJzMyIsImMxYzIiLCJzMXMyIiwiY29udmVydFdvcmxkUG9zaXRpb25Ub09iamVjdCIsIm9iamVjdCIsImlkZW50aXR5IiwibWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24iLCJnZXRJbnZlcnNlIiwic3ViIiwiYXBwbHlNYXRyaXg0IiwiYWRkT2JqZWN0Q2hpbGRyZW4iLCJwYXJlbnQiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGlsZCIsImNvbXBvbmVudCIsInVwZGF0ZU1hdHJpeCIsInVwZGF0ZU1hdHJpeFdvcmxkIiwic2V0RnJvbU1hdHJpeFBvc2l0aW9uIiwibWF0cml4V29ybGQiLCJzZXRGcm9tUm90YXRpb25NYXRyaXgiLCJwb3NpdGlvbl9vZmZzZXQiLCJwdXNoIiwiRXZlbnRhYmxlIiwiX2V2ZW50TGlzdGVuZXJzIiwiZXZlbnRfbmFtZSIsImNhbGxiYWNrIiwiaGFzT3duUHJvcGVydHkiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJwYXJhbWV0ZXJzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJvYmoiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpc3BhdGNoRXZlbnQiLCJWZWhpY2xlVHVubmluZyIsInN1c3BlbnNpb25fc3RpZmZuZXNzIiwic3VzcGVuc2lvbl9jb21wcmVzc2lvbiIsInN1c3BlbnNpb25fZGFtcGluZyIsIm1heF9zdXNwZW5zaW9uX3RyYXZlbCIsImZyaWN0aW9uX3NsaXAiLCJtYXhfc3VzcGVuc2lvbl9mb3JjZSIsIlZlaGljbGUiLCJtZXNoIiwidHVuaW5nIiwiVmVoaWNsZVR1bmluZyIsIndoZWVscyIsImdldE9iamVjdElkIiwicmlnaWRCb2R5Iiwid2hlZWxfZ2VvbWV0cnkiLCJ3aGVlbF9tYXRlcmlhbCIsImNvbm5lY3Rpb25fcG9pbnQiLCJ3aGVlbF9kaXJlY3Rpb24iLCJ3aGVlbF9heGxlIiwic3VzcGVuc2lvbl9yZXN0X2xlbmd0aCIsIndoZWVsX3JhZGl1cyIsImlzX2Zyb250X3doZWVsIiwid2hlZWwiLCJjYXN0U2hhZG93IiwicmVjZWl2ZVNoYWRvdyIsIm11bHRpcGx5U2NhbGFyIiwiYWRkIiwid29ybGQiLCJhbW91bnQiLCJ1bmRlZmluZWQiLCJzdGVlcmluZyIsImJyYWtlIiwiQ29uZVR3aXN0Q29uc3RyYWludCIsIm9iamEiLCJvYmpiIiwib2JqZWN0YSIsIm9iamVjdGIiLCJjb25zb2xlIiwiZXJyb3IiLCJ0eXBlIiwiYXBwbGllZEltcHVsc2UiLCJ3b3JsZE1vZHVsZSIsInBvc2l0aW9uYSIsInBvc2l0aW9uYiIsImF4aXNhIiwiYXhpc2IiLCJjb25zdHJhaW50IiwibWF4X2ltcHVsc2UiLCJ0YXJnZXQiLCJUSFJFRSIsIlZlY3RvcjMiLCJRdWF0ZXJuaW9uIiwiRXVsZXIiLCJNYXRyaXg0IiwiRE9GQ29uc3RyYWludCIsImxpbWl0Iiwid2hpY2giLCJsb3dfYW5nbGUiLCJoaWdoX2FuZ2xlIiwibWF4X2ZvcmNlIiwiSGluZ2VDb25zdHJhaW50IiwiYXhpcyIsImxvdyIsImhpZ2giLCJiaWFzX2ZhY3RvciIsInJlbGF4YXRpb25fZmFjdG9yIiwiYWNjZWxlcmF0aW9uIiwiUG9pbnRDb25zdHJhaW50IiwiU2xpZGVyQ29uc3RyYWludCIsImxpbl9sb3dlciIsImxpbl91cHBlciIsImFuZ19sb3dlciIsImFuZ191cHBlciIsInNjZW5lIiwiQm94TW9kdWxlIiwicGFyYW1zIiwiYnJpZGdlIiwiZ2VvbWV0cnkiLCJib3VuZGluZ0JveCIsImNvbXB1dGVCb3VuZGluZ0JveCIsIndpZHRoIiwibWF4IiwibWluIiwiaGVpZ2h0IiwiZGVwdGgiLCJhc3NpZ24iLCJtYXNzIiwic2NhbGUiLCJyZXN0aXR1dGlvbiIsImZyaWN0aW9uIiwiZGFtcGluZyIsIm1hcmdpbiIsInRvdWNoZXMiLCJncm91cCIsIm1hc2siLCJDYXBzdWxlTW9kdWxlIiwiQ2xvdGhNb2R1bGUiLCJzZWxmIiwiZ2VvbVBhcmFtcyIsImdlb20iLCJtZXJnZVZlcnRpY2VzIiwiYnVmZmVyR2VvbWV0cnkiLCJhZGRBdHRyaWJ1dGUiLCJGbG9hdDMyQXJyYXkiLCJ2ZXJ0aWNlcyIsImNvcHlWZWN0b3Izc0FycmF5IiwiZmFjZXMiLCJmYWNlc0xlbmd0aCIsIm5vcm1hbHNBcnJheSIsImkzIiwibm9ybWFsIiwic2V0SW5kZXgiLCJVaW50MzJBcnJheSIsIlVpbnQxNkFycmF5IiwiY29weUluZGljZXNBcnJheSIsInZlcnRzIiwiYXR0cmlidXRlcyIsImFycmF5Iiwid2lkdGhTZWdtZW50cyIsImhlaWdodFNlZ21lbnRzIiwiaWR4MDAiLCJpZHgwMSIsImlkeDEwIiwiaWR4MTEiLCJjb3JuZXJzIiwic2VnbWVudHMiLCJrbHN0Iiwia3ZzdCIsImthc3QiLCJwaXRlcmF0aW9ucyIsInZpdGVyYXRpb25zIiwiZGl0ZXJhdGlvbnMiLCJjaXRlcmF0aW9ucyIsImFuY2hvckhhcmRuZXNzIiwicmlnaWRIYXJkbmVzcyIsIm5vZGUiLCJpbmZsdWVuY2UiLCJjb2xsaXNpb25CZXR3ZWVuTGlua2VkQm9kaWVzIiwibzEiLCJvMiIsIm9iajIiLCJpc1NvZnRib2R5IiwiZHJhZyIsImxpZnQiLCJhcHBlbmRBbmNob3IiLCJDb21wb3VuZE1vZHVsZSIsIkNvbmNhdmVNb2R1bGUiLCJwYXRoIiwid2FpdCIsImdlb21ldHJ5TG9hZGVyIiwidGhlbiIsImRhdGEiLCJnZW9tZXRyeVByb2Nlc3NvciIsImxvYWRlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibG9hZCIsImlzQnVmZmVyIiwiZmFjZSIsInZBIiwiYSIsInZCIiwiYiIsInZDIiwiYyIsImk5IiwiQ29udmV4TW9kdWxlIiwiX2J1ZmZlckdlb21ldHJ5IiwiZnJvbUdlb21ldHJ5IiwiQ3lsaW5kZXJNb2R1bGUiLCJIZWlnaHRmaWVsZE1vZHVsZSIsInNpemUiLCJ4ZGl2IiwieWRpdiIsInhzaXplIiwieXNpemUiLCJ4cHRzIiwic3FydCIsInlwdHMiLCJhYnNNYXhIZWlnaHQiLCJhYnMiLCJwb2ludHMiLCJ2TnVtIiwicm91bmQiLCJtdWx0aXBseSIsImF1dG9BbGlnbiIsInRyYW5zbGF0ZSIsIlBsYW5lTW9kdWxlIiwiU29mdGJvZHlNb2R1bGUiLCJpZHhHZW9tZXRyeSIsImFWZXJ0aWNlcyIsImFJbmRpY2VzIiwibmR4R2VvbWV0cnkiLCJwcmVzc3VyZSIsIlNwaGVyZU1vZHVsZSIsImJvdW5kaW5nU3BoZXJlIiwiY29tcHV0ZUJvdW5kaW5nU3BoZXJlIiwiV29ybGRNb2R1bGUiLCJvbkFkZCIsImRlZmVyIiwib25BZGRDYWxsYmFjayIsIm9uUmVtb3ZlIiwib25SZW1vdmVDYWxsYmFjayIsImZpeGVkVGltZVN0ZXAiLCJyYXRlTGltaXQiLCJhbW1vIiwic29mdGJvZHkiLCJncmF2aXR5Iiwic3RhcnQiLCJwZXJmb3JtYW5jZSIsIm5vdyIsIl93b3JrZXIiLCJyZXF1aXJlIiwidHJhbnNmZXJhYmxlTWVzc2FnZSIsIndlYmtpdFBvc3RNZXNzYWdlIiwicG9zdE1lc3NhZ2UiLCJpc0xvYWRlZCIsIndhc20iLCJmZXRjaCIsInJlc3BvbnNlIiwiYXJyYXlCdWZmZXIiLCJ3YXNtQnVmZmVyIiwiYnVmZmVyIiwiX21hdGVyaWFsc19yZWZfY291bnRzIiwiX29iamVjdHMiLCJfdmVoaWNsZXMiLCJfY29uc3RyYWludHMiLCJfaXNfc2ltdWxhdGluZyIsIl9pZCIsImFiIiwiQXJyYXlCdWZmZXIiLCJTVVBQT1JUX1RSQU5TRkVSQUJMRSIsImJ5dGVMZW5ndGgiLCJvbm1lc3NhZ2UiLCJldmVudCIsIl90ZW1wIiwiX3VwZGF0ZVNjZW5lIiwiX3VwZGF0ZVNvZnRib2RpZXMiLCJfdXBkYXRlQ29sbGlzaW9ucyIsIl91cGRhdGVWZWhpY2xlcyIsIl91cGRhdGVDb25zdHJhaW50cyIsImNtZCIsImxvZyIsIndpbmRvdyIsInRlc3QiLCJkZWJ1ZyIsImRpciIsInZvbHVtZVBvc2l0aW9ucyIsIm9mZnNldFZlcnQiLCJpc1NvZnRCb2R5UmVzZXQiLCJ2b2x1bWVOb3JtYWxzIiwib2ZmcyIsIngxIiwieTEiLCJ6MSIsIm54MSIsIm55MSIsIm56MSIsIngyIiwieTIiLCJ6MiIsIm54MiIsIm55MiIsIm56MiIsIngzIiwieTMiLCJ6MyIsIm54MyIsIm55MyIsIm56MyIsIm5lZWRzVXBkYXRlIiwibngiLCJueSIsIm56IiwidmVoaWNsZSIsImV4dHJhY3RSb3RhdGlvbiIsIm1hdHJpeCIsImFkZFZlY3RvcnMiLCJjb2xsaXNpb25zIiwibm9ybWFsX29mZnNldHMiLCJvYmplY3QyIiwiaWQxIiwiaiIsImlkMiIsImNvbXBvbmVudDIiLCJfcGh5c2lqczIiLCJzdWJWZWN0b3JzIiwidGVtcDEiLCJ0ZW1wMiIsIm5vcm1hbF9vZmZzZXQiLCJlbWl0Iiwic2hvd19tYXJrZXIiLCJnZXREZWZpbml0aW9uIiwibWFya2VyIiwiYWRkRGVwZW5kZW5jeSIsIm1hdGVyaWFsIiwibWF0ZXJpYWxJZCIsInJlbW92ZSIsInBvcCIsInJlbW92ZURlcGVuZGVuY3kiLCJmdW5jIiwiYXJncyIsInNldEZpeGVkVGltZVN0ZXAiLCJzZXRHcmF2aXR5IiwiYWRkQ29uc3RyYWludCIsInNpbXVsYXRlIiwidGltZVN0ZXAiLCJtYXhTdWJTdGVwcyIsIl9zdGF0cyIsImJlZ2luIiwib2JqZWN0X2lkIiwidXBkYXRlIiwiZW5kIiwiV0hTIiwiTG9vcCIsImNsb2NrIiwiZ2V0RGVsdGEiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7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dUJBQXVCLDRCQUE0QixPQUFPLHVEQUF1RCw0REFBNEQsMkVBQTJFLGlEQUFpRCxtREFBbUQsK0ZBQStGLDRDQUE0QywwQ0FBMEMscURBQXFELG1EQUFtRCxtREFBbUQsdURBQXVELHFEQUFxRCxxREFBcUQscURBQXFELFdBQVcsU0FBUyxPQUFPLCtHQUErRyxxREFBcUQsS0FBSyxJQUFJLDBEQUEwRCwrQkFBK0IsdUZBQXVGLG9PQUFvTyw2REFBNkQsT0FBTyxLQUFLLE9BQU8sMkVBQTJFLHlCQUF5QixrQ0FBa0MsZ0RBQWdELDBDQUEwQyx5Q0FBeUMsNkNBQTZDLDBGQUEwRiw2Q0FBNkMsd0RBQXdELGtEQUFrRCxrREFBa0Qsa0RBQWtELG1GQUFtRixTQUFTLE9BQU8scUhBQXFILHdEQUF3RCxLQUFLLElBQUksdUNBQXVDLDZDQUE2QywwREFBMEQsa0RBQWtELHVEQUF1RCxrQkFBa0IsV0FBVyxzREFBc0QsMkRBQTJELGtCQUFrQixXQUFXLG9EQUFvRCx5REFBeUQsa0JBQWtCLFdBQVcsdURBQXVELDREQUE0RCxrQkFBa0IsV0FBVyx1QkFBdUIsZUFBZSxLQUFLLGtIQUFrSCxJQUFJLFdBQVcsY0FBYyw2Q0FBNkMsY0FBYztBQUNyeHJELEU7Ozs7OztBQ0ZBLGlEIiwiZmlsZSI6InBoeXNpY3MtbW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiVEhSRUVcIiksIHJlcXVpcmUoXCJXSFNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiVEhSRUVcIiwgXCJXSFNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUEhZU0lDU1wiXSA9IGZhY3RvcnkocmVxdWlyZShcIlRIUkVFXCIpLCByZXF1aXJlKFwiV0hTXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJQSFlTSUNTXCJdID0gZmFjdG9yeShyb290W1wiVEhSRUVcIl0sIHJvb3RbXCJXSFNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTI2X18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTI3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjZGM4MTI2NmY2Njc0MzU0NmNiZSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlRIUkVFXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtRdWF0ZXJuaW9ufSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjb25zdCBhcGkgPSB7XG4gIC8vIGdldCBtYXNzKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9waHlzaWpzLm1hc3M7XG4gIC8vIH1cblxuICAvLyBzZXQgbWFzcyhtYXNzKSB7XG4gIC8vICAgdGhpcy5fcGh5c2lqcy5tYXNzID0gbWFzcztcbiAgLy8gICBpZiAodGhpcy5tYW5hZ2VyLmdldCgnbW9kdWxlOndvcmxkJykpIHRoaXMubWFuYWdlci5nZXQoJ21vZHVsZTp3b3JsZCcpLmV4ZWN1dGUoJ3VwZGF0ZU1hc3MnLCB7aWQ6IHRoaXMuX3BoeXNpanMuaWQsIG1hc3N9KTtcbiAgLy8gfVxuXG4gIGFwcGx5Q2VudHJhbEltcHVsc2UoZm9yY2UpIHtcbiAgICBpZiAodGhpcy5tYW5hZ2VyLmhhcygnbW9kdWxlOndvcmxkJykpIHRoaXMubWFuYWdlci5nZXQoJ21vZHVsZTp3b3JsZCcpLmV4ZWN1dGUoJ2FwcGx5Q2VudHJhbEltcHVsc2UnLCB7aWQ6IHRoaXMuX3BoeXNpanMuaWQsIHg6IGZvcmNlLngsIHk6IGZvcmNlLnksIHo6IGZvcmNlLnp9KTtcbiAgfSxcblxuICBhcHBseUltcHVsc2UoZm9yY2UsIG9mZnNldCkge1xuICAgIGlmICh0aGlzLm1hbmFnZXIuaGFzKCdtb2R1bGU6d29ybGQnKSkge1xuICAgICAgdGhpcy5tYW5hZ2VyLmdldCgnbW9kdWxlOndvcmxkJykuZXhlY3V0ZSgnYXBwbHlJbXB1bHNlJywge1xuICAgICAgICBpZDogdGhpcy5fcGh5c2lqcy5pZCxcbiAgICAgICAgaW1wdWxzZV94OiBmb3JjZS54LFxuICAgICAgICBpbXB1bHNlX3k6IGZvcmNlLnksXG4gICAgICAgIGltcHVsc2VfejogZm9yY2UueixcbiAgICAgICAgeDogb2Zmc2V0LngsXG4gICAgICAgIHk6IG9mZnNldC55LFxuICAgICAgICB6OiBvZmZzZXQuelxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIGFwcGx5VG9ycXVlKGZvcmNlKSB7XG4gICAgaWYgKHRoaXMubWFuYWdlci5oYXMoJ21vZHVsZTp3b3JsZCcpKSB7XG4gICAgICB0aGlzLm1hbmFnZXIuZ2V0KCdtb2R1bGU6d29ybGQnKS5leGVjdXRlKCdhcHBseVRvcnF1ZScsIHtcbiAgICAgICAgaWQ6IHRoaXMuX3BoeXNpanMuaWQsXG4gICAgICAgIHRvcnF1ZV94OiBmb3JjZS54LFxuICAgICAgICB0b3JxdWVfeTogZm9yY2UueSxcbiAgICAgICAgdG9ycXVlX3o6IGZvcmNlLnpcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBhcHBseUNlbnRyYWxGb3JjZShmb3JjZSkge1xuICAgIGlmICh0aGlzLm1hbmFnZXIuaGFzKCdtb2R1bGU6d29ybGQnKSkgdGhpcy5tYW5hZ2VyLmdldCgnbW9kdWxlOndvcmxkJykuZXhlY3V0ZSgnYXBwbHlDZW50cmFsRm9yY2UnLCB7aWQ6IHRoaXMuX3BoeXNpanMuaWQsIHg6IGZvcmNlLngsIHk6IGZvcmNlLnksIHo6IGZvcmNlLnp9KTtcbiAgfSxcblxuICBhcHBseUZvcmNlKGZvcmNlLCBvZmZzZXQpIHtcbiAgICBpZiAodGhpcy5tYW5hZ2VyLmhhcygnbW9kdWxlOndvcmxkJykpIHtcbiAgICAgIHRoaXMubWFuYWdlci5nZXQoJ21vZHVsZTp3b3JsZCcpLmV4ZWN1dGUoJ2FwcGx5Rm9yY2UnLCB7XG4gICAgICAgIGlkOiB0aGlzLl9waHlzaWpzLmlkLFxuICAgICAgICBmb3JjZV94OiBmb3JjZS54LFxuICAgICAgICBmb3JjZV95OiBmb3JjZS55LFxuICAgICAgICBmb3JjZV96OiBmb3JjZS56LFxuICAgICAgICB4OiBvZmZzZXQueCxcbiAgICAgICAgeTogb2Zmc2V0LnksXG4gICAgICAgIHo6IG9mZnNldC56XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0QW5ndWxhclZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9waHlzaWpzLmFuZ3VsYXJWZWxvY2l0eTtcbiAgfSxcblxuICBzZXRBbmd1bGFyVmVsb2NpdHkodmVsb2NpdHkpIHtcbiAgICBpZiAodGhpcy5tYW5hZ2VyLmhhcygnbW9kdWxlOndvcmxkJykpIHRoaXMubWFuYWdlci5nZXQoJ21vZHVsZTp3b3JsZCcpLmV4ZWN1dGUoJ3NldEFuZ3VsYXJWZWxvY2l0eScsIHtpZDogdGhpcy5fcGh5c2lqcy5pZCwgeDogdmVsb2NpdHkueCwgeTogdmVsb2NpdHkueSwgejogdmVsb2NpdHkuen0pO1xuICB9LFxuXG4gIGdldExpbmVhclZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9waHlzaWpzLmxpbmVhclZlbG9jaXR5O1xuICB9LFxuXG4gIHNldExpbmVhclZlbG9jaXR5KHZlbG9jaXR5KSB7XG4gICAgaWYgKHRoaXMubWFuYWdlci5oYXMoJ21vZHVsZTp3b3JsZCcpKSB0aGlzLm1hbmFnZXIuZ2V0KCdtb2R1bGU6d29ybGQnKS5leGVjdXRlKCdzZXRMaW5lYXJWZWxvY2l0eScsIHtpZDogdGhpcy5fcGh5c2lqcy5pZCwgeDogdmVsb2NpdHkueCwgeTogdmVsb2NpdHkueSwgejogdmVsb2NpdHkuen0pO1xuICB9LFxuXG4gIHNldEFuZ3VsYXJGYWN0b3IoZmFjdG9yKSB7XG4gICAgaWYgKHRoaXMubWFuYWdlci5oYXMoJ21vZHVsZTp3b3JsZCcpKSB0aGlzLm1hbmFnZXIuZ2V0KCdtb2R1bGU6d29ybGQnKS5leGVjdXRlKCdzZXRBbmd1bGFyRmFjdG9yJywge2lkOiB0aGlzLl9waHlzaWpzLmlkLCB4OiBmYWN0b3IueCwgeTogZmFjdG9yLnksIHo6IGZhY3Rvci56fSk7XG4gIH0sXG5cbiAgc2V0TGluZWFyRmFjdG9yKGZhY3Rvcikge1xuICAgIGlmICh0aGlzLm1hbmFnZXIuaGFzKCdtb2R1bGU6d29ybGQnKSkgdGhpcy5tYW5hZ2VyLmdldCgnbW9kdWxlOndvcmxkJykuZXhlY3V0ZSgnc2V0TGluZWFyRmFjdG9yJywge2lkOiB0aGlzLl9waHlzaWpzLmlkLCB4OiBmYWN0b3IueCwgeTogZmFjdG9yLnksIHo6IGZhY3Rvci56fSk7XG4gIH0sXG5cbiAgc2V0RGFtcGluZyhsaW5lYXIsIGFuZ3VsYXIpIHtcbiAgICBpZiAodGhpcy5tYW5hZ2VyLmhhcygnbW9kdWxlOndvcmxkJykpIHRoaXMubWFuYWdlci5nZXQoJ21vZHVsZTp3b3JsZCcpLmV4ZWN1dGUoJ3NldERhbXBpbmcnLCB7aWQ6IHRoaXMuX3BoeXNpanMuaWQsIGxpbmVhciwgYW5ndWxhcn0pO1xuICB9LFxuXG4gIHNldENjZE1vdGlvblRocmVzaG9sZCh0aHJlc2hvbGQpIHtcbiAgICBpZiAodGhpcy5tYW5hZ2VyLmhhcygnbW9kdWxlOndvcmxkJykpIHRoaXMubWFuYWdlci5nZXQoJ21vZHVsZTp3b3JsZCcpLmV4ZWN1dGUoJ3NldENjZE1vdGlvblRocmVzaG9sZCcsIHtpZDogdGhpcy5fcGh5c2lqcy5pZCwgdGhyZXNob2xkfSk7XG4gIH0sXG5cbiAgc2V0Q2NkU3dlcHRTcGhlcmVSYWRpdXMocmFkaXVzKSB7XG4gICAgaWYgKHRoaXMubWFuYWdlci5oYXMoJ21vZHVsZTp3b3JsZCcpKSB0aGlzLm1hbmFnZXIuZ2V0KCdtb2R1bGU6d29ybGQnKS5leGVjdXRlKCdzZXRDY2RTd2VwdFNwaGVyZVJhZGl1cycsIHtpZDogdGhpcy5fcGh5c2lqcy5pZCwgcmFkaXVzfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHByb3BlcnRpZXMgPSB7XG4gIHBvc2l0aW9uOiB7XG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5wb3NpdGlvbjtcbiAgICB9LFxuXG4gICAgc2V0KHZlY3RvcjMpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHRoaXMuX25hdGl2ZS5wb3NpdGlvbjtcbiAgICAgIGNvbnN0IHNjb3BlID0gdGhpcztcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocG9zLCB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHgpIHtcbiAgICAgICAgICAgIHNjb3BlLl9fZGlydHlQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHkpIHtcbiAgICAgICAgICAgIHNjb3BlLl9fZGlydHlQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHo6IHtcbiAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fejtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHopIHtcbiAgICAgICAgICAgIHNjb3BlLl9fZGlydHlQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl96ID0gejtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBzY29wZS5fX2RpcnR5UG9zaXRpb24gPSB0cnVlO1xuXG4gICAgICBwb3MuY29weSh2ZWN0b3IzKTtcbiAgICB9XG4gIH0sXG5cbiAgcXVhdGVybmlvbjoge1xuICAgIGdldCgpIHtcbiAgICAgIHRoaXMuX19jX3JvdCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5uYXRpdmUucXVhdGVybmlvbjtcbiAgICB9LFxuXG4gICAgc2V0KHF1YXRlcm5pb24pIHtcbiAgICAgIGNvbnN0IHF1YXQgPSB0aGlzLl9uYXRpdmUucXVhdGVybmlvbixcbiAgICAgICAgbmF0aXZlID0gdGhpcy5fbmF0aXZlO1xuXG4gICAgICBxdWF0LmNvcHkocXVhdGVybmlvbik7XG5cbiAgICAgIHF1YXQub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fX2Nfcm90KSB7XG4gICAgICAgICAgaWYgKG5hdGl2ZS5fX2RpcnR5Um90YXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuX19jX3JvdCA9IGZhbHNlO1xuICAgICAgICAgICAgbmF0aXZlLl9fZGlydHlSb3RhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuYXRpdmUuX19kaXJ0eVJvdGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHJvdGF0aW9uOiB7XG4gICAgZ2V0KCkge1xuICAgICAgdGhpcy5fX2Nfcm90ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLl9uYXRpdmUucm90YXRpb247XG4gICAgfSxcblxuICAgIHNldChldWxlcikge1xuICAgICAgY29uc3Qgcm90ID0gdGhpcy5fbmF0aXZlLnJvdGF0aW9uLFxuICAgICAgICBuYXRpdmUgPSB0aGlzLl9uYXRpdmU7XG5cbiAgICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KG5ldyBRdWF0ZXJuaW9uKCkuc2V0RnJvbUV1bGVyKGV1bGVyKSk7XG5cbiAgICAgIHJvdC5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9fY19yb3QpIHtcbiAgICAgICAgICB0aGlzLnF1YXRlcm5pb24uY29weShuZXcgUXVhdGVybmlvbigpLnNldEZyb21FdWxlcihyb3QpKTtcbiAgICAgICAgICBuYXRpdmUuX19kaXJ0eVJvdGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUGh5c2ljc1Byb3RvdHlwZShzY29wZSkge1xuICBmb3IgKGxldCBrZXkgaW4gYXBpKSB7XG4gICAgc2NvcGVba2V5XSA9IGFwaVtrZXldLmJpbmQoc2NvcGUpO1xuICB9XG5cbiAgZm9yIChsZXQga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NvcGUsIGtleSwge1xuICAgICAgZ2V0OiBwcm9wZXJ0aWVzW2tleV0uZ2V0LmJpbmQoc2NvcGUpLFxuICAgICAgc2V0OiBwcm9wZXJ0aWVzW2tleV0uc2V0LmJpbmQoc2NvcGUpLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNvcHkoc291cmNlKSB7XG4gIHdyYXBQaHlzaWNzUHJvdG90eXBlKHRoaXMpO1xuICB0aGlzLl9waHlzaWpzID0gey4uLnNvdXJjZS5fcGh5c2lqc307XG4gIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmNsb25lKCk7XG4gIHRoaXMucm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmNsb25lKCk7XG4gIHRoaXMucXVhdGVybmlvbiA9IHRoaXMucXVhdGVybmlvbi5jbG9uZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25XcmFwKCkge1xuICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5jbG9uZSgpO1xuICB0aGlzLnJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5jbG9uZSgpO1xuICB0aGlzLnF1YXRlcm5pb24gPSB0aGlzLnF1YXRlcm5pb24uY2xvbmUoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL3BoeXNpY3NQcm90b3R5cGUuanMiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gIFZlY3RvcjMsXG4gIE1hdHJpeDQsXG4gIFF1YXRlcm5pb25cbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBNRVNTQUdFX1RZUEVTID0ge1xuICBXT1JMRFJFUE9SVDogMCxcbiAgQ09MTElTSU9OUkVQT1JUOiAxLFxuICBWRUhJQ0xFUkVQT1JUOiAyLFxuICBDT05TVFJBSU5UUkVQT1JUOiAzLFxuICBTT0ZUUkVQT1JUOiA0XG59O1xuXG5jb25zdCBSRVBPUlRfSVRFTVNJWkUgPSAxNCxcbiAgQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFID0gNSxcbiAgVkVISUNMRVJFUE9SVF9JVEVNU0laRSA9IDksXG4gIENPTlNUUkFJTlRSRVBPUlRfSVRFTVNJWkUgPSA2O1xuXG5jb25zdCB0ZW1wMVZlY3RvcjMgPSBuZXcgVmVjdG9yMygpLFxuICB0ZW1wMlZlY3RvcjMgPSBuZXcgVmVjdG9yMygpLFxuICB0ZW1wMU1hdHJpeDQgPSBuZXcgTWF0cml4NCgpLFxuICB0ZW1wMVF1YXQgPSBuZXcgUXVhdGVybmlvbigpO1xuXG5jb25zdCBnZXRFdWxlclhZWkZyb21RdWF0ZXJuaW9uID0gKHgsIHksIHosIHcpID0+IHtcbiAgcmV0dXJuIG5ldyBWZWN0b3IzKFxuICAgIE1hdGguYXRhbjIoMiAqICh4ICogdyAtIHkgKiB6KSwgKHcgKiB3IC0geCAqIHggLSB5ICogeSArIHogKiB6KSksXG4gICAgTWF0aC5hc2luKDIgKiAoeCAqIHogKyB5ICogdykpLFxuICAgIE1hdGguYXRhbjIoMiAqICh6ICogdyAtIHggKiB5KSwgKHcgKiB3ICsgeCAqIHggLSB5ICogeSAtIHogKiB6KSlcbiAgKTtcbn07XG5cbmNvbnN0IGdldFF1YXRlcnRpb25Gcm9tRXVsZXIgPSAoeCwgeSwgeikgPT4ge1xuICBjb25zdCBjMSA9IE1hdGguY29zKHkpO1xuICBjb25zdCBzMSA9IE1hdGguc2luKHkpO1xuICBjb25zdCBjMiA9IE1hdGguY29zKC16KTtcbiAgY29uc3QgczIgPSBNYXRoLnNpbigteik7XG4gIGNvbnN0IGMzID0gTWF0aC5jb3MoeCk7XG4gIGNvbnN0IHMzID0gTWF0aC5zaW4oeCk7XG4gIGNvbnN0IGMxYzIgPSBjMSAqIGMyO1xuICBjb25zdCBzMXMyID0gczEgKiBzMjtcblxuICByZXR1cm4ge1xuICAgIHc6IGMxYzIgKiBjMyAtIHMxczIgKiBzMyxcbiAgICB4OiBjMWMyICogczMgKyBzMXMyICogYzMsXG4gICAgeTogczEgKiBjMiAqIGMzICsgYzEgKiBzMiAqIHMzLFxuICAgIHo6IGMxICogczIgKiBjMyAtIHMxICogYzIgKiBzM1xuICB9O1xufTtcblxuY29uc3QgY29udmVydFdvcmxkUG9zaXRpb25Ub09iamVjdCA9IChwb3NpdGlvbiwgb2JqZWN0KSA9PiB7XG4gIHRlbXAxTWF0cml4NC5pZGVudGl0eSgpOyAvLyByZXNldCB0ZW1wIG1hdHJpeFxuXG4gIC8vIFNldCB0aGUgdGVtcCBtYXRyaXgncyByb3RhdGlvbiB0byB0aGUgb2JqZWN0J3Mgcm90YXRpb25cbiAgdGVtcDFNYXRyaXg0LmlkZW50aXR5KCkubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24ob2JqZWN0LnF1YXRlcm5pb24pO1xuXG4gIC8vIEludmVydCByb3RhdGlvbiBtYXRyaXggaW4gb3JkZXIgdG8gXCJ1bnJvdGF0ZVwiIGEgcG9pbnQgYmFjayB0byBvYmplY3Qgc3BhY2VcbiAgdGVtcDFNYXRyaXg0LmdldEludmVyc2UodGVtcDFNYXRyaXg0KTtcblxuICAvLyBZYXkhIFRlbXAgdmFycyFcbiAgdGVtcDFWZWN0b3IzLmNvcHkocG9zaXRpb24pO1xuICB0ZW1wMlZlY3RvcjMuY29weShvYmplY3QucG9zaXRpb24pO1xuXG4gIC8vIEFwcGx5IHRoZSByb3RhdGlvblxuICByZXR1cm4gdGVtcDFWZWN0b3IzLnN1Yih0ZW1wMlZlY3RvcjMpLmFwcGx5TWF0cml4NCh0ZW1wMU1hdHJpeDQpO1xufTtcblxuY29uc3QgYWRkT2JqZWN0Q2hpbGRyZW4gPSBmdW5jdGlvbiAocGFyZW50LCBvYmplY3QpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGlsZCA9IG9iamVjdC5jaGlsZHJlbltpXTtcbiAgICBjb25zdCBfcGh5c2lqcyA9IGNoaWxkLmNvbXBvbmVudC5fcGh5c2lqcztcblxuICAgIGlmIChfcGh5c2lqcykge1xuICAgICAgY2hpbGQudXBkYXRlTWF0cml4KCk7XG4gICAgICBjaGlsZC51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG4gICAgICB0ZW1wMVZlY3RvcjMuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNoaWxkLm1hdHJpeFdvcmxkKTtcbiAgICAgIHRlbXAxUXVhdC5zZXRGcm9tUm90YXRpb25NYXRyaXgoY2hpbGQubWF0cml4V29ybGQpO1xuXG4gICAgICBfcGh5c2lqcy5wb3NpdGlvbl9vZmZzZXQgPSB7XG4gICAgICAgIHg6IHRlbXAxVmVjdG9yMy54LFxuICAgICAgICB5OiB0ZW1wMVZlY3RvcjMueSxcbiAgICAgICAgejogdGVtcDFWZWN0b3IzLnpcbiAgICAgIH07XG5cbiAgICAgIF9waHlzaWpzLnJvdGF0aW9uID0ge1xuICAgICAgICB4OiB0ZW1wMVF1YXQueCxcbiAgICAgICAgeTogdGVtcDFRdWF0LnksXG4gICAgICAgIHo6IHRlbXAxUXVhdC56LFxuICAgICAgICB3OiB0ZW1wMVF1YXQud1xuICAgICAgfTtcblxuICAgICAgcGFyZW50LmNvbXBvbmVudC5fcGh5c2lqcy5jaGlsZHJlbi5wdXNoKF9waHlzaWpzKTtcbiAgICB9XG5cbiAgICBhZGRPYmplY3RDaGlsZHJlbihwYXJlbnQsIGNoaWxkKTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgZ2V0RXVsZXJYWVpGcm9tUXVhdGVybmlvbixcbiAgZ2V0UXVhdGVydGlvbkZyb21FdWxlcixcbiAgY29udmVydFdvcmxkUG9zaXRpb25Ub09iamVjdCxcbiAgYWRkT2JqZWN0Q2hpbGRyZW4sXG5cbiAgTUVTU0FHRV9UWVBFUyxcbiAgUkVQT1JUX0lURU1TSVpFLFxuICBDT0xMSVNJT05SRVBPUlRfSVRFTVNJWkUsXG4gIFZFSElDTEVSRVBPUlRfSVRFTVNJWkUsXG4gIENPTlNUUkFJTlRSRVBPUlRfSVRFTVNJWkUsXG5cbiAgdGVtcDFWZWN0b3IzLFxuICB0ZW1wMlZlY3RvcjMsXG4gIHRlbXAxTWF0cml4NCxcbiAgdGVtcDFRdWF0XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwaS5qcyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNsYXNzIEV2ZW50YWJsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzID0ge307XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGV2ZW50X25hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudExpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShldmVudF9uYW1lKSlcbiAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50X25hbWVdID0gW107XG5cbiAgICB0aGlzLl9ldmVudExpc3RlbmVyc1tldmVudF9uYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRfbmFtZSwgY2FsbGJhY2spIHtcbiAgICBsZXQgaW5kZXg7XG5cbiAgICBpZiAoIXRoaXMuX2V2ZW50TGlzdGVuZXJzLmhhc093blByb3BlcnR5KGV2ZW50X25hbWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoKGluZGV4ID0gdGhpcy5fZXZlbnRMaXN0ZW5lcnNbZXZlbnRfbmFtZV0uaW5kZXhPZihjYWxsYmFjaykpID49IDApIHtcbiAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50X25hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGV2ZW50X25hbWUpIHtcbiAgICBsZXQgaTtcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICBpZiAodGhpcy5fZXZlbnRMaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoZXZlbnRfbmFtZSkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLl9ldmVudExpc3RlbmVyc1tldmVudF9uYW1lXS5sZW5ndGg7IGkrKylcbiAgICAgICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbZXZlbnRfbmFtZV1baV0uYXBwbHkodGhpcywgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1ha2Uob2JqKSB7XG4gICAgb2JqLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gRXZlbnRhYmxlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuICAgIG9iai5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IEV2ZW50YWJsZS5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICBvYmoucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBFdmVudGFibGUucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudGFibGUuanMiLCJleHBvcnQgY2xhc3MgVmVoaWNsZVR1bm5pbmcge1xuICBjb25zdHJ1Y3RvcihzdXNwZW5zaW9uX3N0aWZmbmVzcyA9IDUuODgsIHN1c3BlbnNpb25fY29tcHJlc3Npb24gPSAwLjgzLCBzdXNwZW5zaW9uX2RhbXBpbmcgPSAwLjg4LCBtYXhfc3VzcGVuc2lvbl90cmF2ZWwgPSA1MDAsIGZyaWN0aW9uX3NsaXAgPSAxMC41LCBtYXhfc3VzcGVuc2lvbl9mb3JjZSA9IDYwMDApIHtcbiAgICB0aGlzLnN1c3BlbnNpb25fc3RpZmZuZXNzID0gc3VzcGVuc2lvbl9zdGlmZm5lc3M7XG4gICAgdGhpcy5zdXNwZW5zaW9uX2NvbXByZXNzaW9uID0gc3VzcGVuc2lvbl9jb21wcmVzc2lvbjtcbiAgICB0aGlzLnN1c3BlbnNpb25fZGFtcGluZyA9IHN1c3BlbnNpb25fZGFtcGluZztcbiAgICB0aGlzLm1heF9zdXNwZW5zaW9uX3RyYXZlbCA9IG1heF9zdXNwZW5zaW9uX3RyYXZlbDtcbiAgICB0aGlzLmZyaWN0aW9uX3NsaXAgPSBmcmljdGlvbl9zbGlwO1xuICAgIHRoaXMubWF4X3N1c3BlbnNpb25fZm9yY2UgPSBtYXhfc3VzcGVuc2lvbl9mb3JjZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZlaGljbGUvdHVubmluZy5qcyIsImltcG9ydCB7TWVzaH0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHtWZWhpY2xlVHVubmluZ30gZnJvbSAnLi90dW5uaW5nJztcblxuZXhwb3J0IGNsYXNzIFZlaGljbGUge1xuICBjb25zdHJ1Y3RvcihtZXNoLCB0dW5pbmcgPSBuZXcgVmVoaWNsZVR1bmluZygpKSB7XG4gICAgdGhpcy5tZXNoID0gbWVzaDtcbiAgICB0aGlzLndoZWVscyA9IFtdO1xuXG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIGlkOiBnZXRPYmplY3RJZCgpLFxuICAgICAgcmlnaWRCb2R5OiBtZXNoLl9waHlzaWpzLmlkLFxuICAgICAgc3VzcGVuc2lvbl9zdGlmZm5lc3M6IHR1bmluZy5zdXNwZW5zaW9uX3N0aWZmbmVzcyxcbiAgICAgIHN1c3BlbnNpb25fY29tcHJlc3Npb246IHR1bmluZy5zdXNwZW5zaW9uX2NvbXByZXNzaW9uLFxuICAgICAgc3VzcGVuc2lvbl9kYW1waW5nOiB0dW5pbmcuc3VzcGVuc2lvbl9kYW1waW5nLFxuICAgICAgbWF4X3N1c3BlbnNpb25fdHJhdmVsOiB0dW5pbmcubWF4X3N1c3BlbnNpb25fdHJhdmVsLFxuICAgICAgZnJpY3Rpb25fc2xpcDogdHVuaW5nLmZyaWN0aW9uX3NsaXAsXG4gICAgICBtYXhfc3VzcGVuc2lvbl9mb3JjZTogdHVuaW5nLm1heF9zdXNwZW5zaW9uX2ZvcmNlXG4gICAgfTtcbiAgfVxuXG4gIGFkZFdoZWVsKHdoZWVsX2dlb21ldHJ5LCB3aGVlbF9tYXRlcmlhbCwgY29ubmVjdGlvbl9wb2ludCwgd2hlZWxfZGlyZWN0aW9uLCB3aGVlbF9heGxlLCBzdXNwZW5zaW9uX3Jlc3RfbGVuZ3RoLCB3aGVlbF9yYWRpdXMsIGlzX2Zyb250X3doZWVsLCB0dW5pbmcpIHtcbiAgICBjb25zdCB3aGVlbCA9IG5ldyBNZXNoKHdoZWVsX2dlb21ldHJ5LCB3aGVlbF9tYXRlcmlhbCk7XG5cbiAgICB3aGVlbC5jYXN0U2hhZG93ID0gd2hlZWwucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgd2hlZWwucG9zaXRpb24uY29weSh3aGVlbF9kaXJlY3Rpb24pLm11bHRpcGx5U2NhbGFyKHN1c3BlbnNpb25fcmVzdF9sZW5ndGggLyAxMDApLmFkZChjb25uZWN0aW9uX3BvaW50KTtcblxuICAgIHRoaXMud29ybGQuYWRkKHdoZWVsKTtcbiAgICB0aGlzLndoZWVscy5wdXNoKHdoZWVsKTtcblxuICAgIHRoaXMud29ybGQuZXhlY3V0ZSgnYWRkV2hlZWwnLCB7XG4gICAgICBpZDogdGhpcy5fcGh5c2lqcy5pZCxcbiAgICAgIGNvbm5lY3Rpb25fcG9pbnQ6IHt4OiBjb25uZWN0aW9uX3BvaW50LngsIHk6IGNvbm5lY3Rpb25fcG9pbnQueSwgejogY29ubmVjdGlvbl9wb2ludC56fSxcbiAgICAgIHdoZWVsX2RpcmVjdGlvbjoge3g6IHdoZWVsX2RpcmVjdGlvbi54LCB5OiB3aGVlbF9kaXJlY3Rpb24ueSwgejogd2hlZWxfZGlyZWN0aW9uLnp9LFxuICAgICAgd2hlZWxfYXhsZToge3g6IHdoZWVsX2F4bGUueCwgeTogd2hlZWxfYXhsZS55LCB6OiB3aGVlbF9heGxlLnp9LFxuICAgICAgc3VzcGVuc2lvbl9yZXN0X2xlbmd0aCxcbiAgICAgIHdoZWVsX3JhZGl1cyxcbiAgICAgIGlzX2Zyb250X3doZWVsLFxuICAgICAgdHVuaW5nXG4gICAgfSk7XG4gIH1cblxuICBzZXRTdGVlcmluZyhhbW91bnQsIHdoZWVsKSB7XG4gICAgaWYgKHdoZWVsICE9PSB1bmRlZmluZWQgJiYgdGhpcy53aGVlbHNbd2hlZWxdICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLndvcmxkLmV4ZWN1dGUoJ3NldFN0ZWVyaW5nJywge2lkOiB0aGlzLl9waHlzaWpzLmlkLCB3aGVlbCwgc3RlZXJpbmc6IGFtb3VudH0pO1xuICAgIGVsc2UgaWYgKHRoaXMud2hlZWxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aGVlbHMubGVuZ3RoOyBpKyspXG4gICAgICAgIHRoaXMud29ybGQuZXhlY3V0ZSgnc2V0U3RlZXJpbmcnLCB7aWQ6IHRoaXMuX3BoeXNpanMuaWQsIHdoZWVsOiBpLCBzdGVlcmluZzogYW1vdW50fSk7XG4gICAgfVxuICB9XG5cbiAgc2V0QnJha2UoYW1vdW50LCB3aGVlbCkge1xuICAgIGlmICh3aGVlbCAhPT0gdW5kZWZpbmVkICYmIHRoaXMud2hlZWxzW3doZWVsXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy53b3JsZC5leGVjdXRlKCdzZXRCcmFrZScsIHtpZDogdGhpcy5fcGh5c2lqcy5pZCwgd2hlZWwsIGJyYWtlOiBhbW91bnR9KTtcbiAgICBlbHNlIGlmICh0aGlzLndoZWVscy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2hlZWxzLmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzLndvcmxkLmV4ZWN1dGUoJ3NldEJyYWtlJywge2lkOiB0aGlzLl9waHlzaWpzLmlkLCB3aGVlbDogaSwgYnJha2U6IGFtb3VudH0pO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5RW5naW5lRm9yY2UoYW1vdW50LCB3aGVlbCkge1xuICAgIGlmICh3aGVlbCAhPT0gdW5kZWZpbmVkICYmIHRoaXMud2hlZWxzW3doZWVsXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy53b3JsZC5leGVjdXRlKCdhcHBseUVuZ2luZUZvcmNlJywge2lkOiB0aGlzLl9waHlzaWpzLmlkLCB3aGVlbCwgZm9yY2U6IGFtb3VudH0pO1xuICAgIGVsc2UgaWYgKHRoaXMud2hlZWxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aGVlbHMubGVuZ3RoOyBpKyspXG4gICAgICAgIHRoaXMud29ybGQuZXhlY3V0ZSgnYXBwbHlFbmdpbmVGb3JjZScsIHtpZDogdGhpcy5fcGh5c2lqcy5pZCwgd2hlZWw6IGksIGZvcmNlOiBhbW91bnR9KTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92ZWhpY2xlL3ZlaGljbGUuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vYXBpJztcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnRhYmxlJztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RyYWludHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vdmVoaWNsZS9pbmRleCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQge2NvbnZlcnRXb3JsZFBvc2l0aW9uVG9PYmplY3R9IGZyb20gJy4uL2FwaSc7XG5cbmV4cG9ydCBjbGFzcyBDb25lVHdpc3RDb25zdHJhaW50IHtcbiAgY29uc3RydWN0b3Iob2JqYSwgb2JqYiwgcG9zaXRpb24pIHtcbiAgICBjb25zdCBvYmplY3RhID0gb2JqYTtcbiAgICBjb25zdCBvYmplY3RiID0gb2JqYTtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSBjb25zb2xlLmVycm9yKCdCb3RoIG9iamVjdHMgbXVzdCBiZSBkZWZpbmVkIGluIGEgQ29uZVR3aXN0Q29uc3RyYWludC4nKTtcblxuICAgIHRoaXMudHlwZSA9ICdjb25ldHdpc3QnO1xuICAgIHRoaXMuYXBwbGllZEltcHVsc2UgPSAwO1xuICAgIHRoaXMud29ybGRNb2R1bGUgPSBudWxsOyAvLyBXaWxsIGJlIHJlZGVmaW5lZCBieSAuYWRkQ29uc3RyYWludFxuICAgIHRoaXMub2JqZWN0YSA9IG9iamVjdGEuX3BoeXNpanMuaWQ7XG4gICAgdGhpcy5wb3NpdGlvbmEgPSBjb252ZXJ0V29ybGRQb3NpdGlvblRvT2JqZWN0KHBvc2l0aW9uLCBvYmplY3RhKS5jbG9uZSgpO1xuICAgIHRoaXMub2JqZWN0YiA9IG9iamVjdGIuX3BoeXNpanMuaWQ7XG4gICAgdGhpcy5wb3NpdGlvbmIgPSBjb252ZXJ0V29ybGRQb3NpdGlvblRvT2JqZWN0KHBvc2l0aW9uLCBvYmplY3RiKS5jbG9uZSgpO1xuICAgIHRoaXMuYXhpc2EgPSB7eDogb2JqZWN0YS5yb3RhdGlvbi54LCB5OiBvYmplY3RhLnJvdGF0aW9uLnksIHo6IG9iamVjdGEucm90YXRpb24uen07XG4gICAgdGhpcy5heGlzYiA9IHt4OiBvYmplY3RiLnJvdGF0aW9uLngsIHk6IG9iamVjdGIucm90YXRpb24ueSwgejogb2JqZWN0Yi5yb3RhdGlvbi56fTtcbiAgfVxuXG4gIGdldERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgb2JqZWN0YTogdGhpcy5vYmplY3RhLFxuICAgICAgb2JqZWN0YjogdGhpcy5vYmplY3RiLFxuICAgICAgcG9zaXRpb25hOiB0aGlzLnBvc2l0aW9uYSxcbiAgICAgIHBvc2l0aW9uYjogdGhpcy5wb3NpdGlvbmIsXG4gICAgICBheGlzYTogdGhpcy5heGlzYSxcbiAgICAgIGF4aXNiOiB0aGlzLmF4aXNiXG4gICAgfTtcbiAgfVxuXG4gIHNldExpbWl0KHgsIHksIHopIHtcbiAgICBpZih0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoJ2NvbmV0d2lzdF9zZXRMaW1pdCcsIHtjb25zdHJhaW50OiB0aGlzLmlkLCB4LCB5LCB6fSk7XG4gIH1cblxuICBlbmFibGVNb3RvcigpIHtcbiAgICBpZih0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoJ2NvbmV0d2lzdF9lbmFibGVNb3RvcicsIHtjb25zdHJhaW50OiB0aGlzLmlkfSk7XG4gIH1cblxuICBzZXRNYXhNb3RvckltcHVsc2UobWF4X2ltcHVsc2UpIHtcbiAgICBpZih0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoJ2NvbmV0d2lzdF9zZXRNYXhNb3RvckltcHVsc2UnLCB7Y29uc3RyYWludDogdGhpcy5pZCwgbWF4X2ltcHVsc2V9KTtcbiAgfVxuXG4gIHNldE1vdG9yVGFyZ2V0KHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBUSFJFRS5WZWN0b3IzKVxuICAgICAgdGFyZ2V0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5zZXRGcm9tRXVsZXIobmV3IFRIUkVFLkV1bGVyKHRhcmdldC54LCB0YXJnZXQueSwgdGFyZ2V0LnopKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBUSFJFRS5FdWxlcilcbiAgICAgIHRhcmdldCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuc2V0RnJvbUV1bGVyKHRhcmdldCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgVEhSRUUuTWF0cml4NClcbiAgICAgIHRhcmdldCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuc2V0RnJvbVJvdGF0aW9uTWF0cml4KHRhcmdldCk7XG5cbiAgICBpZih0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoJ2NvbmV0d2lzdF9zZXRNb3RvclRhcmdldCcsIHtcbiAgICAgIGNvbnN0cmFpbnQ6IHRoaXMuaWQsXG4gICAgICB4OiB0YXJnZXQueCxcbiAgICAgIHk6IHRhcmdldC55LFxuICAgICAgejogdGFyZ2V0LnosXG4gICAgICB3OiB0YXJnZXQud1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RyYWludHMvQ29uZVR3aXN0Q29uc3RyYWludC5qcyIsImltcG9ydCB7Y29udmVydFdvcmxkUG9zaXRpb25Ub09iamVjdH0gZnJvbSAnLi4vYXBpJztcblxuZXhwb3J0IGNsYXNzIERPRkNvbnN0cmFpbnQge1xuICBjb25zdHJ1Y3RvcihvYmphLCBvYmpiLCBwb3NpdGlvbikge1xuICAgIGNvbnN0IG9iamVjdGEgPSBvYmphO1xuICAgIGxldCBvYmplY3RiID0gb2JqYjtcblxuICAgIGlmICggcG9zaXRpb24gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHBvc2l0aW9uID0gb2JqZWN0YjtcbiAgICAgIG9iamVjdGIgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RvZic7XG4gICAgdGhpcy5hcHBsaWVkSW1wdWxzZSA9IDA7XG4gICAgdGhpcy53b3JsZE1vZHVsZSA9IG51bGw7IC8vIFdpbGwgYmUgcmVkZWZpbmVkIGJ5IC5hZGRDb25zdHJhaW50XG4gICAgdGhpcy5vYmplY3RhID0gb2JqZWN0YS5fcGh5c2lqcy5pZDtcbiAgICB0aGlzLnBvc2l0aW9uYSA9IGNvbnZlcnRXb3JsZFBvc2l0aW9uVG9PYmplY3QoIHBvc2l0aW9uLCBvYmplY3RhICkuY2xvbmUoKTtcbiAgICB0aGlzLmF4aXNhID0geyB4OiBvYmplY3RhLnJvdGF0aW9uLngsIHk6IG9iamVjdGEucm90YXRpb24ueSwgejogb2JqZWN0YS5yb3RhdGlvbi56IH07XG5cbiAgICBpZiAoIG9iamVjdGIgKSB7XG4gICAgICB0aGlzLm9iamVjdGIgPSBvYmplY3RiLl9waHlzaWpzLmlkO1xuICAgICAgdGhpcy5wb3NpdGlvbmIgPSBjb252ZXJ0V29ybGRQb3NpdGlvblRvT2JqZWN0KCBwb3NpdGlvbiwgb2JqZWN0YiApLmNsb25lKCk7XG4gICAgICB0aGlzLmF4aXNiID0geyB4OiBvYmplY3RiLnJvdGF0aW9uLngsIHk6IG9iamVjdGIucm90YXRpb24ueSwgejogb2JqZWN0Yi5yb3RhdGlvbi56IH07XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBvYmplY3RhOiB0aGlzLm9iamVjdGEsXG4gICAgICBvYmplY3RiOiB0aGlzLm9iamVjdGIsXG4gICAgICBwb3NpdGlvbmE6IHRoaXMucG9zaXRpb25hLFxuICAgICAgcG9zaXRpb25iOiB0aGlzLnBvc2l0aW9uYixcbiAgICAgIGF4aXNhOiB0aGlzLmF4aXNhLFxuICAgICAgYXhpc2I6IHRoaXMuYXhpc2JcbiAgICB9O1xuICB9XG5cbiAgc2V0TGluZWFyTG93ZXJMaW1pdChsaW1pdCkge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoICdkb2Zfc2V0TGluZWFyTG93ZXJMaW1pdCcsIHsgY29uc3RyYWludDogdGhpcy5pZCwgeDogbGltaXQueCwgeTogbGltaXQueSwgejogbGltaXQueiB9ICk7XG4gIH1cblxuICBzZXRMaW5lYXJVcHBlckxpbWl0IChsaW1pdCkge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoICdkb2Zfc2V0TGluZWFyVXBwZXJMaW1pdCcsIHsgY29uc3RyYWludDogdGhpcy5pZCwgeDogbGltaXQueCwgeTogbGltaXQueSwgejogbGltaXQueiB9ICk7XG4gIH1cblxuICBzZXRBbmd1bGFyTG93ZXJMaW1pdCAobGltaXQpIHtcbiAgICBpZiAodGhpcy53b3JsZE1vZHVsZSkgdGhpcy53b3JsZE1vZHVsZS5leGVjdXRlKCAnZG9mX3NldEFuZ3VsYXJMb3dlckxpbWl0JywgeyBjb25zdHJhaW50OiB0aGlzLmlkLCB4OiBsaW1pdC54LCB5OiBsaW1pdC55LCB6OiBsaW1pdC56IH0gKTtcbiAgfVxuXG4gIHNldEFuZ3VsYXJVcHBlckxpbWl0IChsaW1pdCkge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoICdkb2Zfc2V0QW5ndWxhclVwcGVyTGltaXQnLCB7IGNvbnN0cmFpbnQ6IHRoaXMuaWQsIHg6IGxpbWl0LngsIHk6IGxpbWl0LnksIHo6IGxpbWl0LnogfSApO1xuICB9XG5cbiAgZW5hYmxlQW5ndWxhck1vdG9yICh3aGljaCkge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoICdkb2ZfZW5hYmxlQW5ndWxhck1vdG9yJywgeyBjb25zdHJhaW50OiB0aGlzLmlkLCB3aGljaDogd2hpY2ggfSApO1xuICB9XG5cbiAgY29uZmlndXJlQW5ndWxhck1vdG9yICh3aGljaCwgbG93X2FuZ2xlLCBoaWdoX2FuZ2xlLCB2ZWxvY2l0eSwgbWF4X2ZvcmNlICkge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoICdkb2ZfY29uZmlndXJlQW5ndWxhck1vdG9yJywgeyBjb25zdHJhaW50OiB0aGlzLmlkLCB3aGljaDogd2hpY2gsIGxvd19hbmdsZTogbG93X2FuZ2xlLCBoaWdoX2FuZ2xlOiBoaWdoX2FuZ2xlLCB2ZWxvY2l0eTogdmVsb2NpdHksIG1heF9mb3JjZTogbWF4X2ZvcmNlIH0gKTtcbiAgfVxuXG4gIGRpc2FibGVBbmd1bGFyTW90b3IgKHdoaWNoKSB7XG4gICAgaWYgKHRoaXMud29ybGRNb2R1bGUpIHRoaXMud29ybGRNb2R1bGUuZXhlY3V0ZSggJ2RvZl9kaXNhYmxlQW5ndWxhck1vdG9yJywgeyBjb25zdHJhaW50OiB0aGlzLmlkLCB3aGljaDogd2hpY2ggfSApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RyYWludHMvRE9GQ29uc3RyYWludC5qcyIsImltcG9ydCB7Y29udmVydFdvcmxkUG9zaXRpb25Ub09iamVjdH0gZnJvbSAnLi4vYXBpJztcblxuZXhwb3J0IGNsYXNzIEhpbmdlQ29uc3RyYWludCB7XG4gIGNvbnN0cnVjdG9yKG9iamEsIG9iamIsIHBvc2l0aW9uLCBheGlzKSB7XG4gICAgY29uc3Qgb2JqZWN0YSA9IG9iamE7XG4gICAgbGV0IG9iamVjdGIgPSBvYmpiO1xuXG4gICAgaWYgKGF4aXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYXhpcyA9IHBvc2l0aW9uO1xuICAgICAgcG9zaXRpb24gPSBvYmplY3RiO1xuICAgICAgb2JqZWN0YiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnaGluZ2UnO1xuICAgIHRoaXMuYXBwbGllZEltcHVsc2UgPSAwO1xuICAgIHRoaXMud29ybGRNb2R1bGUgPSBudWxsOyAvLyBXaWxsIGJlIHJlZGVmaW5lZCBieSAuYWRkQ29uc3RyYWludFxuICAgIHRoaXMub2JqZWN0YSA9IG9iamVjdGEuX3BoeXNpanMuaWQ7XG4gICAgdGhpcy5wb3NpdGlvbmEgPSBjb252ZXJ0V29ybGRQb3NpdGlvblRvT2JqZWN0KHBvc2l0aW9uLCBvYmplY3RhKS5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbi5jbG9uZSgpO1xuICAgIHRoaXMuYXhpcyA9IGF4aXM7XG5cbiAgICBpZiAob2JqZWN0Yikge1xuICAgICAgdGhpcy5vYmplY3RiID0gb2JqZWN0Yi5fcGh5c2lqcy5pZDtcbiAgICAgIHRoaXMucG9zaXRpb25iID0gY29udmVydFdvcmxkUG9zaXRpb25Ub09iamVjdChwb3NpdGlvbiwgb2JqZWN0YikuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICBnZXREZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIG9iamVjdGE6IHRoaXMub2JqZWN0YSxcbiAgICAgIG9iamVjdGI6IHRoaXMub2JqZWN0YixcbiAgICAgIHBvc2l0aW9uYTogdGhpcy5wb3NpdGlvbmEsXG4gICAgICBwb3NpdGlvbmI6IHRoaXMucG9zaXRpb25iLFxuICAgICAgYXhpczogdGhpcy5heGlzXG4gICAgfTtcbiAgfVxuXG4gIHNldExpbWl0cyhsb3csIGhpZ2gsIGJpYXNfZmFjdG9yLCByZWxheGF0aW9uX2ZhY3Rvcikge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoJ2hpbmdlX3NldExpbWl0cycsIHtcbiAgICAgIGNvbnN0cmFpbnQ6IHRoaXMuaWQsXG4gICAgICBsb3csXG4gICAgICBoaWdoLFxuICAgICAgYmlhc19mYWN0b3IsXG4gICAgICByZWxheGF0aW9uX2ZhY3RvclxuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlQW5ndWxhck1vdG9yKHZlbG9jaXR5LCBhY2NlbGVyYXRpb24pIHtcbiAgICBpZiAodGhpcy53b3JsZE1vZHVsZSkgdGhpcy53b3JsZE1vZHVsZS5leGVjdXRlKCdoaW5nZV9lbmFibGVBbmd1bGFyTW90b3InLCB7XG4gICAgICBjb25zdHJhaW50OiB0aGlzLmlkLFxuICAgICAgdmVsb2NpdHksXG4gICAgICBhY2NlbGVyYXRpb25cbiAgICB9KTtcbiAgfVxuXG4gIGRpc2FibGVNb3RvcigpIHtcbiAgICBpZiAodGhpcy53b3JsZE1vZHVsZSkgdGhpcy53b3JsZE1vZHVsZS5leGVjdXRlKCdoaW5nZV9kaXNhYmxlTW90b3InLCB7Y29uc3RyYWludDogdGhpcy5pZH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RyYWludHMvSGluZ2VDb25zdHJhaW50LmpzIiwiaW1wb3J0IHtjb252ZXJ0V29ybGRQb3NpdGlvblRvT2JqZWN0fSBmcm9tICcuLi9hcGknO1xuXG5leHBvcnQgY2xhc3MgUG9pbnRDb25zdHJhaW50IHtcbiAgY29uc3RydWN0b3Iob2JqYSwgb2JqYiwgcG9zaXRpb24pIHtcbiAgICBjb25zdCBvYmplY3RhID0gb2JqYTtcbiAgICBsZXQgb2JqZWN0YiA9IG9iamI7XG5cbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcG9zaXRpb24gPSBvYmplY3RiO1xuICAgICAgb2JqZWN0YiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAncG9pbnQnO1xuICAgIHRoaXMuYXBwbGllZEltcHVsc2UgPSAwO1xuICAgIHRoaXMub2JqZWN0YSA9IG9iamVjdGEuX3BoeXNpanMuaWQ7XG4gICAgdGhpcy5wb3NpdGlvbmEgPSBjb252ZXJ0V29ybGRQb3NpdGlvblRvT2JqZWN0KHBvc2l0aW9uLCBvYmplY3RhKS5jbG9uZSgpO1xuXG4gICAgaWYgKG9iamVjdGIpIHtcbiAgICAgIHRoaXMub2JqZWN0YiA9IG9iamVjdGIuX3BoeXNpanMuaWQ7XG4gICAgICB0aGlzLnBvc2l0aW9uYiA9IGNvbnZlcnRXb3JsZFBvc2l0aW9uVG9PYmplY3QocG9zaXRpb24sIG9iamVjdGIpLmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBvYmplY3RhOiB0aGlzLm9iamVjdGEsXG4gICAgICBvYmplY3RiOiB0aGlzLm9iamVjdGIsXG4gICAgICBwb3NpdGlvbmE6IHRoaXMucG9zaXRpb25hLFxuICAgICAgcG9zaXRpb25iOiB0aGlzLnBvc2l0aW9uYlxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdHJhaW50cy9Qb2ludENvbnN0cmFpbnQuanMiLCJpbXBvcnQge2NvbnZlcnRXb3JsZFBvc2l0aW9uVG9PYmplY3R9IGZyb20gJy4uL2FwaSc7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXJDb25zdHJhaW50IHtcbiAgY29uc3RydWN0b3Iob2JqYSwgb2JqYiwgcG9zaXRpb24sIGF4aXMpIHtcbiAgICBjb25zdCBvYmplY3RhID0gb2JqYTtcbiAgICBsZXQgb2JqZWN0YiA9IG9iamI7XG5cbiAgICBpZiAoYXhpcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBheGlzID0gcG9zaXRpb247XG4gICAgICBwb3NpdGlvbiA9IG9iamVjdGI7XG4gICAgICBvYmplY3RiID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRoaXMudHlwZSA9ICdzbGlkZXInO1xuICAgIHRoaXMuYXBwbGllZEltcHVsc2UgPSAwO1xuICAgIHRoaXMud29ybGRNb2R1bGUgPSBudWxsOyAvLyBXaWxsIGJlIHJlZGVmaW5lZCBieSAuYWRkQ29uc3RyYWludFxuICAgIHRoaXMub2JqZWN0YSA9IG9iamVjdGEuX3BoeXNpanMuaWQ7XG4gICAgdGhpcy5wb3NpdGlvbmEgPSBjb252ZXJ0V29ybGRQb3NpdGlvblRvT2JqZWN0KHBvc2l0aW9uLCBvYmplY3RhKS5jbG9uZSgpO1xuICAgIHRoaXMuYXhpcyA9IGF4aXM7XG5cbiAgICBpZiAob2JqZWN0Yikge1xuICAgICAgdGhpcy5vYmplY3RiID0gb2JqZWN0Yi5fcGh5c2lqcy5pZDtcbiAgICAgIHRoaXMucG9zaXRpb25iID0gY29udmVydFdvcmxkUG9zaXRpb25Ub09iamVjdChwb3NpdGlvbiwgb2JqZWN0YikuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICBnZXREZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIG9iamVjdGE6IHRoaXMub2JqZWN0YSxcbiAgICAgIG9iamVjdGI6IHRoaXMub2JqZWN0YixcbiAgICAgIHBvc2l0aW9uYTogdGhpcy5wb3NpdGlvbmEsXG4gICAgICBwb3NpdGlvbmI6IHRoaXMucG9zaXRpb25iLFxuICAgICAgYXhpczogdGhpcy5heGlzXG4gICAgfTtcbiAgfVxuXG4gIHNldExpbWl0cyhsaW5fbG93ZXIsIGxpbl91cHBlciwgYW5nX2xvd2VyLCBhbmdfdXBwZXIpIHtcbiAgICBpZiAodGhpcy53b3JsZE1vZHVsZSkgdGhpcy53b3JsZE1vZHVsZS5leGVjdXRlKCdzbGlkZXJfc2V0TGltaXRzJywge1xuICAgICAgY29uc3RyYWludDogdGhpcy5pZCxcbiAgICAgIGxpbl9sb3dlcixcbiAgICAgIGxpbl91cHBlcixcbiAgICAgIGFuZ19sb3dlcixcbiAgICAgIGFuZ191cHBlclxuICAgIH0pO1xuICB9XG5cbiAgc2V0UmVzdGl0dXRpb24obGluZWFyLCBhbmd1bGFyKSB7XG4gICAgaWYgKHRoaXMud29ybGRNb2R1bGUpIHRoaXMud29ybGRNb2R1bGUuZXhlY3V0ZShcbiAgICAgICdzbGlkZXJfc2V0UmVzdGl0dXRpb24nLFxuICAgICAge1xuICAgICAgICBjb25zdHJhaW50OiB0aGlzLmlkLFxuICAgICAgICBsaW5lYXIsXG4gICAgICAgIGFuZ3VsYXJcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZW5hYmxlTGluZWFyTW90b3IodmVsb2NpdHksIGFjY2VsZXJhdGlvbikge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoJ3NsaWRlcl9lbmFibGVMaW5lYXJNb3RvcicsIHtcbiAgICAgIGNvbnN0cmFpbnQ6IHRoaXMuaWQsXG4gICAgICB2ZWxvY2l0eSxcbiAgICAgIGFjY2VsZXJhdGlvblxuICAgIH0pO1xuICB9XG5cbiAgZGlzYWJsZUxpbmVhck1vdG9yKCkge1xuICAgIGlmICh0aGlzLndvcmxkTW9kdWxlKSB0aGlzLndvcmxkTW9kdWxlLmV4ZWN1dGUoJ3NsaWRlcl9kaXNhYmxlTGluZWFyTW90b3InLCB7Y29uc3RyYWludDogdGhpcy5pZH0pO1xuICB9XG5cbiAgZW5hYmxlQW5ndWxhck1vdG9yKHZlbG9jaXR5LCBhY2NlbGVyYXRpb24pIHtcbiAgICB0aGlzLnNjZW5lLmV4ZWN1dGUoJ3NsaWRlcl9lbmFibGVBbmd1bGFyTW90b3InLCB7XG4gICAgICBjb25zdHJhaW50OiB0aGlzLmlkLFxuICAgICAgdmVsb2NpdHksXG4gICAgICBhY2NlbGVyYXRpb25cbiAgICB9KTtcbiAgfVxuXG4gIGRpc2FibGVBbmd1bGFyTW90b3IoKSB7XG4gICAgaWYgKHRoaXMud29ybGRNb2R1bGUpIHRoaXMud29ybGRNb2R1bGUuZXhlY3V0ZSgnc2xpZGVyX2Rpc2FibGVBbmd1bGFyTW90b3InLCB7Y29uc3RyYWludDogdGhpcy5pZH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RyYWludHMvU2xpZGVyQ29uc3RyYWludC5qcyIsImV4cG9ydCAqIGZyb20gJy4vQ29uZVR3aXN0Q29uc3RyYWludCc7XG5leHBvcnQgKiBmcm9tICcuL0hpbmdlQ29uc3RyYWludCc7XG5leHBvcnQgKiBmcm9tICcuL1BvaW50Q29uc3RyYWludCc7XG5leHBvcnQgKiBmcm9tICcuL1NsaWRlckNvbnN0cmFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9ET0ZDb25zdHJhaW50JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdHJhaW50cy9pbmRleC5qcyIsImltcG9ydCB7VmVjdG9yM30gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHt3cmFwUGh5c2ljc1Byb3RvdHlwZSwgb25Db3B5LCBvbldyYXB9IGZyb20gJy4vcGh5c2ljc1Byb3RvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBCb3hNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbWFzczogMTAsXG4gICAgICBzY2FsZTogbmV3IFZlY3RvcjMoMSwgMSwgMSksXG4gICAgICByZXN0aXR1dGlvbjogMC4zLFxuICAgICAgZnJpY3Rpb246IDAuOCxcbiAgICAgIGRhbXBpbmc6IDAsXG4gICAgICBtYXJnaW46IDBcbiAgICB9LCBwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHBhcmFtcykge1xuICAgIHRoaXMuX3BoeXNpanMgPSB7XG4gICAgICB0eXBlOiAnYm94JyxcbiAgICAgIG1hc3M6IHBhcmFtcy5tYXNzLFxuICAgICAgdG91Y2hlczogW10sXG4gICAgICBsaW5lYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGFuZ3VsYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGdyb3VwOiBwYXJhbXMuZ3JvdXAsXG4gICAgICBtYXNrOiBwYXJhbXMubWFzayxcbiAgICAgIGZyaWN0aW9uOiBwYXJhbXMuZnJpY3Rpb24sXG4gICAgICByZXN0aXR1dGlvbjogcGFyYW1zLnJlc3RpdHV0aW9uLFxuICAgICAgZGFtcGluZzogcGFyYW1zLmRhbXBpbmcsXG4gICAgICBzY2FsZTogcGFyYW1zLnNjYWxlLFxuICAgICAgbWFyZ2luOiBwYXJhbXMubWFyZ2luXG4gICAgfTtcblxuICAgIHdyYXBQaHlzaWNzUHJvdG90eXBlKHRoaXMpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIGdlb21ldHJ5KGdlb21ldHJ5KSB7XG4gICAgICBpZiAoIWdlb21ldHJ5LmJvdW5kaW5nQm94KSBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcblxuICAgICAgdGhpcy5fcGh5c2lqcy53aWR0aCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC54IC0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluLng7XG4gICAgICB0aGlzLl9waHlzaWpzLmhlaWdodCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC55IC0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluLnk7XG4gICAgICB0aGlzLl9waHlzaWpzLmRlcHRoID0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4LnogLSBnZW9tZXRyeS5ib3VuZGluZ0JveC5taW4uejtcblxuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH0sXG5cbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9Cb3hNb2R1bGUuanMiLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7d3JhcFBoeXNpY3NQcm90b3R5cGUsIG9uQ29weSwgb25XcmFwfSBmcm9tICcuL3BoeXNpY3NQcm90b3R5cGUnO1xuXG5leHBvcnQgY2xhc3MgQ2Fwc3VsZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXNzOiAxMCxcbiAgICAgIGhlaWdodDogMyxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKSxcbiAgICAgIHJhZGl1czogMyxcbiAgICAgIHJlc3RpdHV0aW9uOiAwLjMsXG4gICAgICBmcmljdGlvbjogMC44LFxuICAgICAgZGFtcGluZzogMCxcbiAgICAgIG1hcmdpbjogMFxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUocGFyYW1zKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdjYXBzdWxlJyxcbiAgICAgIHJhZGl1czogTWF0aC5tYXgocGFyYW1zLndpZHRoIC8gMiwgcGFyYW1zLmRlcHRoIC8gMiksXG4gICAgICBoZWlnaHQ6IHBhcmFtcy5oZWlnaHQsXG4gICAgICBmcmljdGlvbjogcGFyYW1zLmZyaWN0aW9uLFxuICAgICAgcmVzdGl0dXRpb246IHBhcmFtcy5yZXN0aXR1dGlvbixcbiAgICAgIGRhbXBpbmc6IHBhcmFtcy5kYW1waW5nLFxuICAgICAgbWFyZ2luOiBwYXJhbXMubWFyZ2luLFxuICAgICAgc2NhbGU6IHBhcmFtcy5zY2FsZSxcbiAgICAgIG1hc3M6IHBhcmFtcy5tYXNzXG4gICAgfTtcblxuICAgIHdyYXBQaHlzaWNzUHJvdG90eXBlKHRoaXMpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIGdlb21ldHJ5KGdlb21ldHJ5KSB7XG4gICAgICBpZiAoIWdlb21ldHJ5LmJvdW5kaW5nQm94KSBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcblxuICAgICAgdGhpcy5fcGh5c2lqcy53aWR0aCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC54IC0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluLng7XG4gICAgICB0aGlzLl9waHlzaWpzLmhlaWdodCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC55IC0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluLnk7XG4gICAgICB0aGlzLl9waHlzaWpzLmRlcHRoID0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4LnogLSBnZW9tZXRyeS5ib3VuZGluZ0JveC5taW4uejtcblxuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH0sXG5cbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9DYXBzdWxlTW9kdWxlLmpzIiwiaW1wb3J0IHtWZWN0b3IzLCBCdWZmZXJHZW9tZXRyeSwgQnVmZmVyQXR0cmlidXRlfSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge3dyYXBQaHlzaWNzUHJvdG90eXBlLCBvbkNvcHksIG9uV3JhcH0gZnJvbSAnLi9waHlzaWNzUHJvdG90eXBlJztcblxuZXhwb3J0IGNsYXNzIENsb3RoTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZnJpY3Rpb246IDAuOCxcbiAgICAgIGRhbXBpbmc6IDAsXG4gICAgICBtYXJnaW46IDAsXG4gICAgICBrbHN0OiAwLjksXG4gICAgICBrdnN0OiAwLjksXG4gICAgICBrYXN0OiAwLjksXG4gICAgICBwaXRlcmF0aW9uczogMSxcbiAgICAgIHZpdGVyYXRpb25zOiAwLFxuICAgICAgZGl0ZXJhdGlvbnM6IDAsXG4gICAgICBjaXRlcmF0aW9uczogNCxcbiAgICAgIGFuY2hvckhhcmRuZXNzOiAwLjcsXG4gICAgICByaWdpZEhhcmRuZXNzOiAxXG4gICAgfSwgcGFyYW1zKTtcbiAgfVxuXG4gIGFwcGVuZEFuY2hvcihvYmplY3QsIG5vZGUsIGluZmx1ZW5jZSwgY29sbGlzaW9uQmV0d2VlbkxpbmtlZEJvZGllcyA9IHRydWUpIHtcbiAgICBjb25zdCBvMSA9IHRoaXMuX3BoeXNpanMuaWQ7XG4gICAgY29uc3QgbzIgPSBvYmplY3QuX3BoeXNpanMuaWQ7XG5cbiAgICBpZiAodGhpcy5tYW5hZ2VyLmhhcygnbW9kdWxlOndvcmxkJykpIHRoaXMubWFuYWdlci5nZXQoJ21vZHVsZTp3b3JsZCcpLmV4ZWN1dGUoJ2FwcGVuZEFuY2hvcicsIHtcbiAgICAgIG9iajogbzEsXG4gICAgICBvYmoyOiBvMixcbiAgICAgIG5vZGUsXG4gICAgICBpbmZsdWVuY2UsXG4gICAgICBjb2xsaXNpb25CZXR3ZWVuTGlua2VkQm9kaWVzXG4gICAgfSk7XG4gIH1cblxuICBpbnRlZ3JhdGUocGFyYW1zLCBzZWxmKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdzb2Z0Q2xvdGhNZXNoJyxcbiAgICAgIG1hc3M6IHBhcmFtcy5tYXNzLFxuICAgICAgdG91Y2hlczogW10sXG4gICAgICBpc1NvZnRib2R5OiB0cnVlLFxuICAgICAgZnJpY3Rpb246IHBhcmFtcy5mcmljdGlvbixcbiAgICAgIGRhbXBpbmc6IHBhcmFtcy5kYW1waW5nLFxuICAgICAgbWFyZ2luOiBwYXJhbXMubWFyZ2luLFxuICAgICAga2xzdDogcGFyYW1zLmtsc3QsXG4gICAgICBrYXN0OiBwYXJhbXMua2FzdCxcbiAgICAgIGt2c3Q6IHBhcmFtcy5rdnN0LFxuICAgICAgZHJhZzogcGFyYW1zLmRyYWcsXG4gICAgICBsaWZ0OiBwYXJhbXMubGlmdCxcbiAgICAgIHBpdGVyYXRpb25zOiBwYXJhbXMucGl0ZXJhdGlvbnMsXG4gICAgICB2aXRlcmF0aW9uczogcGFyYW1zLnZpdGVyYXRpb25zLFxuICAgICAgZGl0ZXJhdGlvbnM6IHBhcmFtcy5kaXRlcmF0aW9ucyxcbiAgICAgIGNpdGVyYXRpb25zOiBwYXJhbXMuY2l0ZXJhdGlvbnMsXG4gICAgICBhbmNob3JIYXJkbmVzczogcGFyYW1zLmFuY2hvckhhcmRuZXNzLFxuICAgICAgcmlnaWRIYXJkbmVzczogcGFyYW1zLnJpZ2lkSGFyZG5lc3MsXG4gICAgICBzY2FsZTogcGFyYW1zLnNjYWxlXG4gICAgfTtcblxuICAgIHRoaXMuYXBwZW5kQW5jaG9yID0gc2VsZi5hcHBlbmRBbmNob3IuYmluZCh0aGlzKTtcblxuICAgIHdyYXBQaHlzaWNzUHJvdG90eXBlKHRoaXMpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIGdlb21ldHJ5KGdlb21ldHJ5LCBzZWxmKSB7XG4gICAgICBjb25zdCBnZW9tUGFyYW1zID0gZ2VvbWV0cnkucGFyYW1ldGVycztcblxuICAgICAgY29uc3QgZ2VvbSA9IGdlb21ldHJ5IGluc3RhbmNlb2YgQnVmZmVyR2VvbWV0cnlcbiAgICAgICAgPyBnZW9tZXRyeVxuICAgICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICBnZW9tZXRyeS5tZXJnZVZlcnRpY2VzKCk7XG5cbiAgICAgICAgICBjb25zdCBidWZmZXJHZW9tZXRyeSA9IG5ldyBCdWZmZXJHZW9tZXRyeSgpO1xuXG4gICAgICAgICAgYnVmZmVyR2VvbWV0cnkuYWRkQXR0cmlidXRlKFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJyxcbiAgICAgICAgICAgIG5ldyBCdWZmZXJBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoZ2VvbWV0cnkudmVydGljZXMubGVuZ3RoICogMyksXG4gICAgICAgICAgICAgIDNcbiAgICAgICAgICAgICkuY29weVZlY3RvcjNzQXJyYXkoZ2VvbWV0cnkudmVydGljZXMpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGZhY2VzID0gZ2VvbWV0cnkuZmFjZXMsIGZhY2VzTGVuZ3RoID0gZmFjZXMubGVuZ3RoO1xuICAgICAgICAgIGNvbnN0IG5vcm1hbHNBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXNMZW5ndGggKiAzKTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmFjZXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaTMgPSBpICogMztcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbCA9IGZhY2VzW2ldLm5vcm1hbCB8fCBuZXcgVmVjdG9yMygpO1xuXG4gICAgICAgICAgICBub3JtYWxzQXJyYXlbaTNdID0gbm9ybWFsLng7XG4gICAgICAgICAgICBub3JtYWxzQXJyYXlbaTMgKyAxXSA9IG5vcm1hbC55O1xuICAgICAgICAgICAgbm9ybWFsc0FycmF5W2kzICsgMl0gPSBub3JtYWwuejtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXJHZW9tZXRyeS5hZGRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAnbm9ybWFsJyxcbiAgICAgICAgICAgIG5ldyBCdWZmZXJBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIG5vcm1hbHNBcnJheSxcbiAgICAgICAgICAgICAgM1xuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBidWZmZXJHZW9tZXRyeS5zZXRJbmRleChcbiAgICAgICAgICAgIG5ldyBCdWZmZXJBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIG5ldyAoZmFjZXNMZW5ndGggKiAzID4gNjU1MzUgPyBVaW50MzJBcnJheSA6IFVpbnQxNkFycmF5KShmYWNlc0xlbmd0aCAqIDMpLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApLmNvcHlJbmRpY2VzQXJyYXkoZmFjZXMpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiBidWZmZXJHZW9tZXRyeTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgY29uc3QgdmVydHMgPSBnZW9tLmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XG5cbiAgICAgIGlmICghZ2VvbVBhcmFtcy53aWR0aFNlZ21lbnRzKSBnZW9tUGFyYW1zLndpZHRoU2VnbWVudHMgPSAxO1xuICAgICAgaWYgKCFnZW9tUGFyYW1zLmhlaWdodFNlZ21lbnRzKSBnZW9tUGFyYW1zLmhlaWdodFNlZ21lbnRzID0gMTtcblxuICAgICAgY29uc3QgaWR4MDAgPSAwO1xuICAgICAgY29uc3QgaWR4MDEgPSBnZW9tUGFyYW1zLndpZHRoU2VnbWVudHM7XG4gICAgICBjb25zdCBpZHgxMCA9IChnZW9tUGFyYW1zLmhlaWdodFNlZ21lbnRzICsgMSkgKiAoZ2VvbVBhcmFtcy53aWR0aFNlZ21lbnRzICsgMSkgLSAoZ2VvbVBhcmFtcy53aWR0aFNlZ21lbnRzICsgMSk7XG4gICAgICBjb25zdCBpZHgxMSA9IHZlcnRzLmxlbmd0aCAvIDMgLSAxO1xuXG4gICAgICB0aGlzLl9waHlzaWpzLmNvcm5lcnMgPSBbXG4gICAgICAgIHZlcnRzW2lkeDAxICogM10sIHZlcnRzW2lkeDAxICogMyArIDFdLCB2ZXJ0c1tpZHgwMSAqIDMgKyAyXSwgLy8gICDilZdcbiAgICAgICAgdmVydHNbaWR4MDAgKiAzXSwgdmVydHNbaWR4MDAgKiAzICsgMV0sIHZlcnRzW2lkeDAwICogMyArIDJdLCAvLyDilZRcbiAgICAgICAgdmVydHNbaWR4MTEgKiAzXSwgdmVydHNbaWR4MTEgKiAzICsgMV0sIHZlcnRzW2lkeDExICogMyArIDJdLCAvLyAgICAgICDilZ1cbiAgICAgICAgdmVydHNbaWR4MTAgKiAzXSwgdmVydHNbaWR4MTAgKiAzICsgMV0sIHZlcnRzW2lkeDEwICogMyArIDJdLCAvLyAgICAg4pWaXG4gICAgICBdO1xuXG4gICAgICB0aGlzLl9waHlzaWpzLnNlZ21lbnRzID0gW2dlb21QYXJhbXMud2lkdGhTZWdtZW50cyArIDEsIGdlb21QYXJhbXMuaGVpZ2h0U2VnbWVudHMgKyAxXTtcblxuICAgICAgcmV0dXJuIGdlb207XG4gICAgfSxcbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9DbG90aE1vZHVsZS5qcyIsImltcG9ydCB7VmVjdG9yM30gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHt3cmFwUGh5c2ljc1Byb3RvdHlwZSwgb25Db3B5LCBvbldyYXB9IGZyb20gJy4vcGh5c2ljc1Byb3RvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBDb21wb3VuZE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXNzOiAxMCxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKSxcbiAgICAgIHJlc3RpdHV0aW9uOiAwLjMsXG4gICAgICBmcmljdGlvbjogMC44LFxuICAgICAgZGFtcGluZzogMCxcbiAgICAgIG1hcmdpbjogMFxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUocGFyYW1zKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdjb21wb3VuZCcsXG4gICAgICBtYXNzOiBwYXJhbXMubWFzcyxcbiAgICAgIHRvdWNoZXM6IFtdLFxuICAgICAgbGluZWFyVmVsb2NpdHk6IG5ldyBWZWN0b3IzKCksXG4gICAgICBhbmd1bGFyVmVsb2NpdHk6IG5ldyBWZWN0b3IzKCksXG4gICAgICBncm91cDogcGFyYW1zLmdyb3VwLFxuICAgICAgbWFzazogcGFyYW1zLm1hc2ssXG4gICAgICBmcmljdGlvbjogcGFyYW1zLmZyaWN0aW9uLFxuICAgICAgcmVzdGl0dXRpb246IHBhcmFtcy5yZXN0aXR1dGlvbixcbiAgICAgIGRhbXBpbmc6IHBhcmFtcy5kYW1waW5nLFxuICAgICAgc2NhbGU6IHBhcmFtcy5zY2FsZSxcbiAgICAgIG1hcmdpbjogcGFyYW1zLm1hcmdpblxuICAgIH07XG5cbiAgICB3cmFwUGh5c2ljc1Byb3RvdHlwZSh0aGlzKTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9Db21wb3VuZE1vZHVsZS5qcyIsImltcG9ydCB7VmVjdG9yMywgTXVsdGlNYXRlcmlhbCwgTWVzaCwgSlNPTkxvYWRlcn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHt3cmFwUGh5c2ljc1Byb3RvdHlwZSwgb25Db3B5LCBvbldyYXB9IGZyb20gJy4vcGh5c2ljc1Byb3RvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBDb25jYXZlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG1hc3M6IDEwLFxuICAgICAgcmVzdGl0dXRpb246IDAuMyxcbiAgICAgIGZyaWN0aW9uOiAwLjgsXG4gICAgICBkYW1waW5nOiAwLFxuICAgICAgc2NhbGU6IG5ldyBWZWN0b3IzKDEsIDEsIDEpLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgbG9hZGVyOiBuZXcgSlNPTkxvYWRlcigpXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5wYXRoICYmIHRoaXMucGFyYW1zLmxvYWRlcikge1xuICAgICAgdGhpcy5nZW9tZXRyeUxvYWRlciA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5wYXJhbXMubG9hZGVyLmxvYWQoXG4gICAgICAgICAgdGhpcy5wYXJhbXMucGF0aCxcbiAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgIHJlamVjdFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2VvbWV0cnlQcm9jZXNzb3IoZ2VvbWV0cnkpIHtcbiAgICBjb25zdCBpc0J1ZmZlciA9IGdlb21ldHJ5LnR5cGUgPT09ICdCdWZmZXJHZW9tZXRyeSc7XG5cbiAgICBpZiAoIWdlb21ldHJ5LmJvdW5kaW5nQm94KSBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcblxuICAgIGNvbnN0IGRhdGEgPSBpc0J1ZmZlciA/XG4gICAgICBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5IDpcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoZ2VvbWV0cnkuZmFjZXMubGVuZ3RoICogOSk7XG5cbiAgICBpZiAoIWlzQnVmZmVyKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNlcyA9IGdlb21ldHJ5LnZlcnRpY2VzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdlb21ldHJ5LmZhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZhY2UgPSBnZW9tZXRyeS5mYWNlc1tpXTtcblxuICAgICAgICBjb25zdCB2QSA9IHZlcnRpY2VzW2ZhY2UuYV07XG4gICAgICAgIGNvbnN0IHZCID0gdmVydGljZXNbZmFjZS5iXTtcbiAgICAgICAgY29uc3QgdkMgPSB2ZXJ0aWNlc1tmYWNlLmNdO1xuXG4gICAgICAgIGNvbnN0IGk5ID0gaSAqIDk7XG5cbiAgICAgICAgZGF0YVtpOV0gPSB2QS54O1xuICAgICAgICBkYXRhW2k5ICsgMV0gPSB2QS55O1xuICAgICAgICBkYXRhW2k5ICsgMl0gPSB2QS56O1xuXG4gICAgICAgIGRhdGFbaTkgKyAzXSA9IHZCLng7XG4gICAgICAgIGRhdGFbaTkgKyA0XSA9IHZCLnk7XG4gICAgICAgIGRhdGFbaTkgKyA1XSA9IHZCLno7XG5cbiAgICAgICAgZGF0YVtpOSArIDZdID0gdkMueDtcbiAgICAgICAgZGF0YVtpOSArIDddID0gdkMueTtcbiAgICAgICAgZGF0YVtpOSArIDhdID0gdkMuejtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBpbnRlZ3JhdGUocGFyYW1zKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdjb25jYXZlJyxcbiAgICAgIG1hc3M6IHBhcmFtcy5tYXNzLFxuICAgICAgdG91Y2hlczogW10sXG4gICAgICBsaW5lYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGFuZ3VsYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGdyb3VwOiBwYXJhbXMuZ3JvdXAsXG4gICAgICBtYXNrOiBwYXJhbXMubWFzayxcbiAgICAgIGZyaWN0aW9uOiBwYXJhbXMuZnJpY3Rpb24sXG4gICAgICByZXN0aXR1dGlvbjogcGFyYW1zLnJlc3RpdHV0aW9uLFxuICAgICAgZGFtcGluZzogcGFyYW1zLmRhbXBpbmcsXG4gICAgICBtYXJnaW46IHBhcmFtcy5tYXJnaW4sXG4gICAgICBzY2FsZTogcGFyYW1zLnNjYWxlXG4gICAgfTtcblxuICAgIHdyYXBQaHlzaWNzUHJvdG90eXBlKHRoaXMpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIGdlb21ldHJ5KGdlb21ldHJ5LCBzZWxmKSB7XG4gICAgICBpZiAoc2VsZi5wYXJhbXMucGF0aCkge1xuICAgICAgICB0aGlzLndhaXQoc2VsZi5nZW9tZXRyeUxvYWRlcik7XG5cbiAgICAgICAgc2VsZi5nZW9tZXRyeUxvYWRlclxuICAgICAgICAgIC50aGVuKGdlb20gPT4ge1xuICAgICAgICAgICAgdGhpcy5fcGh5c2lqcy5kYXRhID0gc2VsZi5nZW9tZXRyeVByb2Nlc3NvcihnZW9tKVxuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGh5c2lqcy5kYXRhID0gc2VsZi5nZW9tZXRyeVByb2Nlc3NvcihnZW9tZXRyeSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICB9LFxuXG4gICAgb25Db3B5LFxuICAgIG9uV3JhcFxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9Db25jYXZlTW9kdWxlLmpzIiwiaW1wb3J0IHtWZWN0b3IzLCBCdWZmZXJHZW9tZXRyeX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHt3cmFwUGh5c2ljc1Byb3RvdHlwZSwgb25Db3B5LCBvbldyYXB9IGZyb20gJy4vcGh5c2ljc1Byb3RvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBDb252ZXhNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbWFzczogMTAsXG4gICAgICByZXN0aXR1dGlvbjogMC4zLFxuICAgICAgZnJpY3Rpb246IDAuOCxcbiAgICAgIGRhbXBpbmc6IDAsXG4gICAgICBtYXJnaW46IDAsXG4gICAgICBzY2FsZTogbmV3IFZlY3RvcjMoMSwgMSwgMSlcbiAgICB9LCBwYXJhbXMpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHBhcmFtcykge1xuICAgIHRoaXMuX3BoeXNpanMgPSB7XG4gICAgICB0eXBlOiAnY29udmV4JyxcbiAgICAgIG1hc3M6IHBhcmFtcy5tYXNzLFxuICAgICAgdG91Y2hlczogW10sXG4gICAgICBsaW5lYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGFuZ3VsYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGdyb3VwOiBwYXJhbXMuZ3JvdXAsXG4gICAgICBtYXNrOiBwYXJhbXMubWFzayxcbiAgICAgIGZyaWN0aW9uOiBwYXJhbXMuZnJpY3Rpb24sXG4gICAgICByZXN0aXR1dGlvbjogcGFyYW1zLnJlc3RpdHV0aW9uLFxuICAgICAgZGFtcGluZzogcGFyYW1zLmRhbXBpbmcsXG4gICAgICBtYXJnaW46IHBhcmFtcy5tYXJnaW4sXG4gICAgICBzY2FsZTogcGFyYW1zLnNjYWxlXG4gICAgfTtcblxuICAgIHdyYXBQaHlzaWNzUHJvdG90eXBlKHRoaXMpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1lc2gobWVzaCkge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuXG4gICAgICBpZiAoIWdlb21ldHJ5LmJvdW5kaW5nQm94KSBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcblxuICAgICAgY29uc3QgaXNCdWZmZXIgPSBnZW9tZXRyeS50eXBlID09PSAnQnVmZmVyR2VvbWV0cnknO1xuXG4gICAgICBpZiAoIWlzQnVmZmVyKSBnZW9tZXRyeS5fYnVmZmVyR2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKS5mcm9tR2VvbWV0cnkoZ2VvbWV0cnkpO1xuXG4gICAgICBjb25zdCBkYXRhID0gaXNCdWZmZXIgP1xuICAgICAgICBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5IDpcbiAgICAgICAgZ2VvbWV0cnkuX2J1ZmZlckdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XG5cbiAgICAgIHRoaXMuX3BoeXNpanMuZGF0YSA9IGRhdGE7XG5cbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH0sXG5cbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL0NvbnZleE1vZHVsZS5qcyIsImltcG9ydCB7VmVjdG9yM30gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHt3cmFwUGh5c2ljc1Byb3RvdHlwZSwgb25Db3B5LCBvbldyYXB9IGZyb20gJy4vcGh5c2ljc1Byb3RvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBDeWxpbmRlck1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXNzOiAxMCxcbiAgICAgIHJlc3RpdHV0aW9uOiAwLjMsXG4gICAgICBmcmljdGlvbjogMC44LFxuICAgICAgZGFtcGluZzogMCxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUocGFyYW1zKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdjeWxpbmRlcicsXG4gICAgICB3aWR0aDogcGFyYW1zLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwYXJhbXMuaGVpZ2h0LFxuICAgICAgZGVwdGg6IHBhcmFtcy5kZXB0aCxcbiAgICAgIHRvdWNoZXM6IFtdLFxuICAgICAgbGluZWFyVmVsb2NpdHk6IG5ldyBWZWN0b3IzKCksXG4gICAgICBhbmd1bGFyVmVsb2NpdHk6IG5ldyBWZWN0b3IzKCksXG4gICAgICBncm91cDogcGFyYW1zLmdyb3VwLFxuICAgICAgbWFzazogcGFyYW1zLm1hc2ssXG4gICAgICBmcmljdGlvbjogcGFyYW1zLmZyaWN0aW9uLFxuICAgICAgcmVzdGl0dXRpb246IHBhcmFtcy5yZXN0aXR1dGlvbixcbiAgICAgIGRhbXBpbmc6IHBhcmFtcy5kYW1waW5nLFxuICAgICAgbWFyZ2luOiBwYXJhbXMubWFyZ2luLFxuICAgICAgbWFzczogcGFyYW1zLm1hc3MsXG4gICAgICBzY2FsZTogcGFyYW1zLnNjYWxlXG4gICAgfTtcblxuICAgIHdyYXBQaHlzaWNzUHJvdG90eXBlKHRoaXMpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIGdlb21ldHJ5KGdlb21ldHJ5KSB7XG4gICAgICBpZiAoIWdlb21ldHJ5LmJvdW5kaW5nQm94KSBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcblxuICAgICAgdGhpcy5fcGh5c2lqcy53aWR0aCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC54IC0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluLng7XG4gICAgICB0aGlzLl9waHlzaWpzLmhlaWdodCA9IGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC55IC0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluLnk7XG4gICAgICB0aGlzLl9waHlzaWpzLmRlcHRoID0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4LnogLSBnZW9tZXRyeS5ib3VuZGluZ0JveC5taW4uejtcblxuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH0sXG5cbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL0N5bGluZGVyTW9kdWxlLmpzIiwiaW1wb3J0IHtWZWN0b3IyLCBWZWN0b3IzLCBCdWZmZXJHZW9tZXRyeX0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHt3cmFwUGh5c2ljc1Byb3RvdHlwZSwgb25Db3B5LCBvbldyYXB9IGZyb20gJy4vcGh5c2ljc1Byb3RvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBIZWlnaHRmaWVsZE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXNzOiAxMCxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKSxcbiAgICAgIHNpemU6IG5ldyBWZWN0b3IyKDEsIDEpLFxuICAgICAgcmVzdGl0dXRpb246IDAuMyxcbiAgICAgIGZyaWN0aW9uOiAwLjgsXG4gICAgICBkYW1waW5nOiAwLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgYXV0b0FsaWduOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUocGFyYW1zKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdoZWlnaHRmaWVsZCcsXG4gICAgICBmcmljdGlvbjogcGFyYW1zLmZyaWN0aW9uLFxuICAgICAgdG91Y2hlczogW10sXG4gICAgICBzY2FsZTogcGFyYW1zLnNjYWxlLFxuICAgICAgcmVzdGl0dXRpb246IHBhcmFtcy5yZXN0aXR1dGlvbixcbiAgICAgIGRhbXBpbmc6IHBhcmFtcy5kYW1waW5nLFxuICAgICAgbWFyZ2luOiBwYXJhbXMubWFyZ2luLFxuICAgICAgcG9pbnRzOiBwYXJhbXMucG9pbnRzLFxuICAgICAgbWFzczogcGFyYW1zLm1hc3MsXG4gICAgICBsaW5lYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGFuZ3VsYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGdyb3VwOiBwYXJhbXMuZ3JvdXAsXG4gICAgICBtYXNrOiBwYXJhbXMubWFzayxcbiAgICB9O1xuXG4gICAgd3JhcFBoeXNpY3NQcm90b3R5cGUodGhpcyk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgZ2VvbWV0cnkoZ2VvbWV0cnksIHNlbGYpIHtcbiAgICAgIGNvbnN0IGlzQnVmZmVyID0gZ2VvbWV0cnkgaW5zdGFuY2VvZiBCdWZmZXJHZW9tZXRyeTtcbiAgICAgIGNvbnN0IHZlcnRzID0gaXNCdWZmZXIgPyBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5IDogZ2VvbWV0cnkudmVydGljZXM7XG5cbiAgICAgIGxldCBzaXplID0gaXNCdWZmZXIgPyB2ZXJ0cy5sZW5ndGggLyAzIDogdmVydHMubGVuZ3RoO1xuXG4gICAgICBpZiAoIWdlb21ldHJ5LmJvdW5kaW5nQm94KSBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcblxuICAgICAgY29uc3QgeGRpdiA9IHNlbGYucGFyYW1zLnNpemUueDtcbiAgICAgIGNvbnN0IHlkaXYgPSBzZWxmLnBhcmFtcy5zaXplLnk7XG5cbiAgICAgIGNvbnN0IHhzaXplID0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4LnggLSBnZW9tZXRyeS5ib3VuZGluZ0JveC5taW4ueDtcbiAgICAgIGNvbnN0IHlzaXplID0gZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4LnogLSBnZW9tZXRyeS5ib3VuZGluZ0JveC5taW4uejtcbiAgICAgIFxuICAgICAgdGhpcy5fcGh5c2lqcy54cHRzID0gKHR5cGVvZiB4ZGl2ID09PSAndW5kZWZpbmVkJykgPyBNYXRoLnNxcnQoc2l6ZSkgOiB4ZGl2ICsgMTtcbiAgICAgIHRoaXMuX3BoeXNpanMueXB0cyA9ICh0eXBlb2YgeWRpdiA9PT0gJ3VuZGVmaW5lZCcpID8gTWF0aC5zcXJ0KHNpemUpIDogeWRpdiArIDE7XG5cbiAgICAgIC8vIG5vdGUgLSB0aGlzIGFzc3VtZXMgb3VyIHBsYW5lIGdlb21ldHJ5IGlzIHNxdWFyZSwgdW5sZXNzIHdlIHBhc3MgaW4gc3BlY2lmaWMgeGRpdiBhbmQgeWRpdlxuICAgICAgdGhpcy5fcGh5c2lqcy5hYnNNYXhIZWlnaHQgPSBNYXRoLm1heChnZW9tZXRyeS5ib3VuZGluZ0JveC5tYXgueSwgTWF0aC5hYnMoZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluLnkpKTtcblxuICAgICAgY29uc3QgcG9pbnRzID0gbmV3IEZsb2F0MzJBcnJheShzaXplKSxcbiAgICAgICAgeHB0cyA9IHRoaXMuX3BoeXNpanMueHB0cyxcbiAgICAgICAgeXB0cyA9IHRoaXMuX3BoeXNpanMueXB0cztcblxuICAgICAgd2hpbGUgKHNpemUtLSkge1xuICAgICAgICBjb25zdCB2TnVtID0gc2l6ZSAlIHhwdHMgKyAoKHlwdHMgLSBNYXRoLnJvdW5kKChzaXplIC8geHB0cykgLSAoKHNpemUgJSB4cHRzKSAvIHhwdHMpKSAtIDEpICogeXB0cyk7XG5cbiAgICAgICAgaWYgKGlzQnVmZmVyKSBwb2ludHNbc2l6ZV0gPSB2ZXJ0c1t2TnVtICogMyArIDFdO1xuICAgICAgICBlbHNlIHBvaW50c1tzaXplXSA9IHZlcnRzW3ZOdW1dLnk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3BoeXNpanMucG9pbnRzID0gcG9pbnRzO1xuXG4gICAgICB0aGlzLl9waHlzaWpzLnNjYWxlLm11bHRpcGx5KFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMyh4c2l6ZSAvICh4cHRzIC0gMSksIDEsIHlzaXplIC8gKHlwdHMgLSAxKSlcbiAgICAgICk7XG5cbiAgICAgIGlmIChzZWxmLnBhcmFtcy5hdXRvQWxpZ24pIGdlb21ldHJ5LnRyYW5zbGF0ZSh4c2l6ZSAvIC0yLCAwLCB5c2l6ZSAvIC0yKTtcblxuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH0sXG5cbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9IZWlnaHRmaWVsZE1vZHVsZS5qcyIsImltcG9ydCB7VmVjdG9yM30gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHt3cmFwUGh5c2ljc1Byb3RvdHlwZSwgb25Db3B5LCBvbldyYXB9IGZyb20gJy4vcGh5c2ljc1Byb3RvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBQbGFuZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXNzOiAxMCxcbiAgICAgIHJlc3RpdHV0aW9uOiAwLjMsXG4gICAgICBmcmljdGlvbjogMC44LFxuICAgICAgZGFtcGluZzogMCxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUocGFyYW1zKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdwbGFuZScsXG4gICAgICB0b3VjaGVzOiBbXSxcbiAgICAgIGxpbmVhclZlbG9jaXR5OiBuZXcgVmVjdG9yMygpLFxuICAgICAgYW5ndWxhclZlbG9jaXR5OiBuZXcgVmVjdG9yMygpLFxuICAgICAgZ3JvdXA6IHBhcmFtcy5ncm91cCxcbiAgICAgIG1hc2s6IHBhcmFtcy5tYXNrLFxuICAgICAgZnJpY3Rpb246IHBhcmFtcy5mcmljdGlvbixcbiAgICAgIHJlc3RpdHV0aW9uOiBwYXJhbXMucmVzdGl0dXRpb24sXG4gICAgICBkYW1waW5nOiBwYXJhbXMuZGFtcGluZyxcbiAgICAgIG1hcmdpbjogcGFyYW1zLm1hcmdpbixcbiAgICAgIHNjYWxlOiBwYXJhbXMuc2NhbGUsXG4gICAgICBtYXNzOiBwYXJhbXMubWFzc1xuICAgIH07XG5cbiAgICB3cmFwUGh5c2ljc1Byb3RvdHlwZSh0aGlzKTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBnZW9tZXRyeShnZW9tZXRyeSkge1xuICAgICAgaWYgKCFnZW9tZXRyeS5ib3VuZGluZ0JveCkgZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cbiAgICAgIHRoaXMuX3BoeXNpanMud2lkdGggPSBnZW9tZXRyeS5ib3VuZGluZ0JveC5tYXgueCAtIGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1pbi54O1xuICAgICAgdGhpcy5fcGh5c2lqcy5oZWlnaHQgPSBnZW9tZXRyeS5ib3VuZGluZ0JveC5tYXgueSAtIGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1pbi55O1xuICAgICAgdGhpcy5fcGh5c2lqcy5ub3JtYWwgPSBnZW9tZXRyeS5mYWNlc1swXS5ub3JtYWwuY2xvbmUoKTtcblxuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH0sXG5cbiAgICBvbkNvcHksXG4gICAgb25XcmFwXG4gIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvUGxhbmVNb2R1bGUuanMiLCJpbXBvcnQge1ZlY3RvcjMsIEJ1ZmZlckdlb21ldHJ5LCBCdWZmZXJBdHRyaWJ1dGV9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7d3JhcFBoeXNpY3NQcm90b3R5cGUsIG9uQ29weSwgb25XcmFwfSBmcm9tICcuL3BoeXNpY3NQcm90b3R5cGUnO1xuXG5leHBvcnQgY2xhc3MgU29mdGJvZHlNb2R1bGV7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICByZXN0aXR1dGlvbjogMC4zLFxuICAgICAgZnJpY3Rpb246IDAuOCxcbiAgICAgIGRhbXBpbmc6IDAsXG4gICAgICBwcmVzc3VyZTogMTAwLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAga2xzdDogMC45LFxuICAgICAga3ZzdDogMC45LFxuICAgICAga2FzdDogMC45LFxuICAgICAgcGl0ZXJhdGlvbnM6IDEsXG4gICAgICB2aXRlcmF0aW9uczogMCxcbiAgICAgIGRpdGVyYXRpb25zOiAwLFxuICAgICAgY2l0ZXJhdGlvbnM6IDQsXG4gICAgICBhbmNob3JIYXJkbmVzczogMC43LFxuICAgICAgcmlnaWRIYXJkbmVzczogMVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBhcHBlbmRBbmNob3Iob2JqZWN0LCBub2RlLCBpbmZsdWVuY2UsIGNvbGxpc2lvbkJldHdlZW5MaW5rZWRCb2RpZXMgPSB0cnVlKSB7XG4gICAgY29uc3QgbzEgPSB0aGlzLl9waHlzaWpzLmlkO1xuICAgIGNvbnN0IG8yID0gb2JqZWN0Ll9waHlzaWpzLmlkO1xuXG4gICAgaWYgKHRoaXMubWFuYWdlci5oYXMoJ21vZHVsZTp3b3JsZCcpKSB0aGlzLm1hbmFnZXIuZ2V0KCdtb2R1bGU6d29ybGQnKS5leGVjdXRlKCdhcHBlbmRBbmNob3InLCB7XG4gICAgICBvYmo6IG8xLFxuICAgICAgb2JqMjogbzIsXG4gICAgICBub2RlLFxuICAgICAgaW5mbHVlbmNlLFxuICAgICAgY29sbGlzaW9uQmV0d2VlbkxpbmtlZEJvZGllc1xuICAgIH0pO1xuICB9XG5cbiAgaW50ZWdyYXRlKHBhcmFtcywgc2VsZikge1xuICAgIHRoaXMuX3BoeXNpanMgPSB7XG4gICAgICB0eXBlOiAnc29mdFRyaW1lc2gnLFxuICAgICAgbWFzczogcGFyYW1zLm1hc3MsXG4gICAgICB0b3VjaGVzOiBbXSxcbiAgICAgIGZyaWN0aW9uOiBwYXJhbXMuZnJpY3Rpb24sXG4gICAgICBkYW1waW5nOiBwYXJhbXMuZGFtcGluZyxcbiAgICAgIHByZXNzdXJlOiBwYXJhbXMucHJlc3N1cmUsXG4gICAgICBtYXJnaW46IHBhcmFtcy5tYXJnaW4sXG4gICAgICBrbHN0OiBwYXJhbXMua2xzdCxcbiAgICAgIGlzU29mdGJvZHk6IHRydWUsXG4gICAgICBrYXN0OiBwYXJhbXMua2FzdCxcbiAgICAgIGt2c3Q6IHBhcmFtcy5rdnN0LFxuICAgICAgZHJhZzogcGFyYW1zLmRyYWcsXG4gICAgICBsaWZ0OiBwYXJhbXMubGlmdCxcbiAgICAgIHBpdGVyYXRpb25zOiBwYXJhbXMucGl0ZXJhdGlvbnMsXG4gICAgICB2aXRlcmF0aW9uczogcGFyYW1zLnZpdGVyYXRpb25zLFxuICAgICAgZGl0ZXJhdGlvbnM6IHBhcmFtcy5kaXRlcmF0aW9ucyxcbiAgICAgIGNpdGVyYXRpb25zOiBwYXJhbXMuY2l0ZXJhdGlvbnMsXG4gICAgICBhbmNob3JIYXJkbmVzczogcGFyYW1zLmFuY2hvckhhcmRuZXNzLFxuICAgICAgcmlnaWRIYXJkbmVzczogcGFyYW1zLnJpZ2lkSGFyZG5lc3NcbiAgICB9O1xuXG4gICAgdGhpcy5hcHBlbmRBbmNob3IgPSBzZWxmLmFwcGVuZEFuY2hvci5iaW5kKHRoaXMpO1xuXG4gICAgd3JhcFBoeXNpY3NQcm90b3R5cGUodGhpcyk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgZ2VvbWV0cnkoZ2VvbWV0cnksIHNlbGYpIHtcbiAgICAgIGNvbnN0IGlkeEdlb21ldHJ5ID0gZ2VvbWV0cnkgaW5zdGFuY2VvZiBCdWZmZXJHZW9tZXRyeVxuICAgICAgICA/IGdlb21ldHJ5XG4gICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICBnZW9tZXRyeS5tZXJnZVZlcnRpY2VzKCk7XG5cbiAgICAgICAgICBjb25zdCBidWZmZXJHZW9tZXRyeSA9IG5ldyBCdWZmZXJHZW9tZXRyeSgpO1xuXG4gICAgICAgICAgYnVmZmVyR2VvbWV0cnkuYWRkQXR0cmlidXRlKFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJyxcbiAgICAgICAgICAgIG5ldyBCdWZmZXJBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoZ2VvbWV0cnkudmVydGljZXMubGVuZ3RoICogMyksXG4gICAgICAgICAgICAgIDNcbiAgICAgICAgICAgICkuY29weVZlY3RvcjNzQXJyYXkoZ2VvbWV0cnkudmVydGljZXMpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGJ1ZmZlckdlb21ldHJ5LnNldEluZGV4KFxuICAgICAgICAgICAgbmV3IEJ1ZmZlckF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgbmV3IChnZW9tZXRyeS5mYWNlcy5sZW5ndGggKiAzID4gNjU1MzUgPyBVaW50MzJBcnJheSA6IFVpbnQxNkFycmF5KShnZW9tZXRyeS5mYWNlcy5sZW5ndGggKiAzKSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKS5jb3B5SW5kaWNlc0FycmF5KGdlb21ldHJ5LmZhY2VzKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4gYnVmZmVyR2VvbWV0cnk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgIGNvbnN0IGFWZXJ0aWNlcyA9IGlkeEdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XG4gICAgICBjb25zdCBhSW5kaWNlcyA9IGlkeEdlb21ldHJ5LmluZGV4LmFycmF5O1xuXG4gICAgICB0aGlzLl9waHlzaWpzLmFWZXJ0aWNlcyA9IGFWZXJ0aWNlcztcbiAgICAgIHRoaXMuX3BoeXNpanMuYUluZGljZXMgPSBhSW5kaWNlcztcblxuICAgICAgY29uc3QgbmR4R2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKS5mcm9tR2VvbWV0cnkoZ2VvbWV0cnkpO1xuXG4gICAgICByZXR1cm4gbmR4R2VvbWV0cnk7XG4gICAgfSxcblxuICAgIG9uQ29weSxcbiAgICBvbldyYXBcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvU29mdGJvZHlNb2R1bGUuanMiLCJpbXBvcnQge1ZlY3RvcjN9IGZyb20gJ3RocmVlJztcbmltcG9ydCB7d3JhcFBoeXNpY3NQcm90b3R5cGUsIG9uQ29weSwgb25XcmFwfSBmcm9tICcuL3BoeXNpY3NQcm90b3R5cGUnO1xuXG5leHBvcnQgY2xhc3MgU3BoZXJlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG1hc3M6IDEwLFxuICAgICAgcmVzdGl0dXRpb246IDAuMyxcbiAgICAgIGZyaWN0aW9uOiAwLjgsXG4gICAgICBkYW1waW5nOiAwLFxuICAgICAgcHJlc3N1cmU6IDEwMCxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIGtsc3Q6IDAuOSxcbiAgICAgIGt2c3Q6IDAuOSxcbiAgICAgIGthc3Q6IDAuOSxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKVxuICAgIH0sIHBhcmFtcyk7XG4gIH1cblxuICBpbnRlZ3JhdGUocGFyYW1zKSB7XG4gICAgdGhpcy5fcGh5c2lqcyA9IHtcbiAgICAgIHR5cGU6ICdzcGhlcmUnLFxuICAgICAgdG91Y2hlczogW10sXG4gICAgICBsaW5lYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGFuZ3VsYXJWZWxvY2l0eTogbmV3IFZlY3RvcjMoKSxcbiAgICAgIGdyb3VwOiBwYXJhbXMuZ3JvdXAsXG4gICAgICBtYXNrOiBwYXJhbXMubWFzayxcbiAgICAgIGZyaWN0aW9uOiBwYXJhbXMuZnJpY3Rpb24sXG4gICAgICByZXN0aXR1dGlvbjogcGFyYW1zLnJlc3RpdHV0aW9uLFxuICAgICAgZGFtcGluZzogcGFyYW1zLmRhbXBpbmcsXG4gICAgICBtYXJnaW46IHBhcmFtcy5tYXJnaW4sXG4gICAgICBzY2FsZTogcGFyYW1zLnNjYWxlLFxuICAgICAgbWFzczogcGFyYW1zLm1hc3NcbiAgICB9O1xuXG4gICAgd3JhcFBoeXNpY3NQcm90b3R5cGUodGhpcyk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgZ2VvbWV0cnkoZ2VvbWV0cnkpIHtcbiAgICAgIGlmICghZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUpIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuICAgICAgdGhpcy5fcGh5c2lqcy5yYWRpdXMgPSBnZW9tZXRyeS5ib3VuZGluZ1NwaGVyZS5yYWRpdXM7XG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfSxcblxuICAgIG9uQ29weSxcbiAgICBvbldyYXBcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvU3BoZXJlTW9kdWxlLmpzIiwiaW1wb3J0IHtcbiAgU2NlbmUgYXMgU2NlbmVOYXRpdmUsXG4gIE1lc2gsXG4gIFNwaGVyZUdlb21ldHJ5LFxuICBNZXNoTm9ybWFsTWF0ZXJpYWwsXG4gIEJveEdlb21ldHJ5LFxuICBWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtMb29wfSBmcm9tICd3aHMnO1xuXG5pbXBvcnQge1ZlaGljbGV9IGZyb20gJy4uL3ZlaGljbGUvdmVoaWNsZSc7XG5pbXBvcnQge0V2ZW50YWJsZX0gZnJvbSAnLi4vZXZlbnRhYmxlJztcblxuaW1wb3J0IHtcbiAgYWRkT2JqZWN0Q2hpbGRyZW4sXG4gIE1FU1NBR0VfVFlQRVMsXG4gIHRlbXAxVmVjdG9yMyxcbiAgdGVtcDFNYXRyaXg0LFxuICBSRVBPUlRfSVRFTVNJWkUsXG4gIENPTExJU0lPTlJFUE9SVF9JVEVNU0laRSxcbiAgVkVISUNMRVJFUE9SVF9JVEVNU0laRSxcbiAgQ09OU1RSQUlOVFJFUE9SVF9JVEVNU0laRVxufSBmcm9tICcuLi9hcGknO1xuXG5leHBvcnQgY2xhc3MgV29ybGRNb2R1bGUgZXh0ZW5kcyBFdmVudGFibGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGZpeGVkVGltZVN0ZXA6IDEvNjAsXG4gICAgICByYXRlTGltaXQ6IHRydWUsXG4gICAgICBhbW1vOiBcIlwiLFxuICAgICAgc29mdGJvZHk6IGZhbHNlLFxuICAgICAgZ3Jhdml0eTogbmV3IFZlY3RvcjMoMCwgLTEwMCwgMClcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIHRoaXMuX3dvcmtlciA9IG5ldyAocmVxdWlyZSgnd29ya2VyLWxvYWRlcj9pbmxpbmUsbmFtZT13b3JrZXIuanMhLi4vd29ya2VyLmpzJykpKCk7XG4gICAgdGhpcy5fd29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UgPSB0aGlzLl93b3JrZXIud2Via2l0UG9zdE1lc3NhZ2UgfHwgdGhpcy5fd29ya2VyLnBvc3RNZXNzYWdlO1xuXG4gICAgdGhpcy5pc0xvYWRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAocGFyYW1zLndhc20pIHtcbiAgICAgICAgZmV0Y2gocGFyYW1zLndhc20pXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgICAudGhlbihidWZmZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMud2FzbUJ1ZmZlciA9IGJ1ZmZlcjtcblxuICAgICAgICAgICAgdGhpcy5leGVjdXRlKCdpbml0JywgdGhpcy5wYXJhbXMpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQaHlzaWNzIGxvYWRpbmcgdGltZTogXCIgKyAocGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydCkgKyBcIm1zXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5leGVjdXRlKCdpbml0JywgdGhpcy5wYXJhbXMpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvYWRlci50aGVuKCgpID0+IHt0aGlzLmlzTG9hZGVkID0gdHJ1ZX0pO1xuXG4gICAgdGhpcy5fbWF0ZXJpYWxzX3JlZl9jb3VudHMgPSB7fTtcbiAgICB0aGlzLl9vYmplY3RzID0ge307XG4gICAgdGhpcy5fdmVoaWNsZXMgPSB7fTtcbiAgICB0aGlzLl9jb25zdHJhaW50cyA9IHt9O1xuICAgIHRoaXMuX2lzX3NpbXVsYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmdldE9iamVjdElkID0gKCgpID0+IHtcbiAgICAgIGxldCBfaWQgPSAxO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF9pZCsrO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgYWIgPSBuZXcgQXJyYXlCdWZmZXIoMSk7XG4gICAgdGhpcy5fd29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UoYWIsIFthYl0pO1xuICAgIHRoaXMuU1VQUE9SVF9UUkFOU0ZFUkFCTEUgPSAoYWIuYnl0ZUxlbmd0aCA9PT0gMCk7XG5cbiAgICB0aGlzLl93b3JrZXIub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBsZXQgX3RlbXAsXG4gICAgICAgIGRhdGEgPSBldmVudC5kYXRhO1xuXG4gICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyICYmIGRhdGEuYnl0ZUxlbmd0aCAhPT0gMSkvLyBieXRlTGVuZ3RoID09PSAxIGlzIHRoZSB3b3JrZXIgbWFraW5nIGEgU1VQUE9SVF9UUkFOU0ZFUkFCTEUgdGVzdFxuICAgICAgICBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShkYXRhKTtcblxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgICAgLy8gdHJhbnNmZXJhYmxlIG9iamVjdFxuICAgICAgICBzd2l0Y2ggKGRhdGFbMF0pIHtcbiAgICAgICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuV09STERSRVBPUlQ6XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTY2VuZShkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBNRVNTQUdFX1RZUEVTLlNPRlRSRVBPUlQ6XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTb2Z0Ym9kaWVzKGRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuQ09MTElTSU9OUkVQT1JUOlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29sbGlzaW9ucyhkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBNRVNTQUdFX1RZUEVTLlZFSElDTEVSRVBPUlQ6XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWZWhpY2xlcyhkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBNRVNTQUdFX1RZUEVTLkNPTlNUUkFJTlRSRVBPUlQ6XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDb25zdHJhaW50cyhkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5jbWQpIHtcbiAgICAgICAgLy8gbm9uLXRyYW5zZmVyYWJsZSBvYmplY3RcbiAgICAgICAgc3dpdGNoIChkYXRhLmNtZCkge1xuICAgICAgICAgIGNhc2UgJ29iamVjdFJlYWR5JzpcbiAgICAgICAgICAgIF90ZW1wID0gZGF0YS5wYXJhbXM7XG4gICAgICAgICAgICBpZiAodGhpcy5fb2JqZWN0c1tfdGVtcF0pIHRoaXMuX29iamVjdHNbX3RlbXBdLmRpc3BhdGNoRXZlbnQoJ3JlYWR5Jyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3dvcmxkUmVhZHknOlxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdyZWFkeScpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdhbW1vTG9hZGVkJzpcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnbG9hZGVkJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBoeXNpY3MgbG9hZGluZyB0aW1lOiBcIiArIChwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0KSArIFwibXNcIik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3ZlaGljbGUnOlxuICAgICAgICAgICAgd2luZG93LnRlc3QgPSBkYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gRG8gbm90aGluZywganVzdCBzaG93IHRoZSBtZXNzYWdlXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKGBSZWNlaXZlZDogJHtkYXRhLmNtZH1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKGRhdGEucGFyYW1zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGRhdGFbMF0pIHtcbiAgICAgICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuV09STERSRVBPUlQ6XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTY2VuZShkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBNRVNTQUdFX1RZUEVTLkNPTExJU0lPTlJFUE9SVDpcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbGxpc2lvbnMoZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgTUVTU0FHRV9UWVBFUy5WRUhJQ0xFUkVQT1JUOlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmVoaWNsZXMoZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgTUVTU0FHRV9UWVBFUy5DT05TVFJBSU5UUkVQT1JUOlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29uc3RyYWludHMoZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIF91cGRhdGVTY2VuZShkYXRhKSB7XG4gICAgbGV0IGluZGV4ID0gZGF0YVsxXTtcblxuICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSAyICsgaW5kZXggKiBSRVBPUlRfSVRFTVNJWkU7XG4gICAgICBjb25zdCBvYmplY3QgPSB0aGlzLl9vYmplY3RzW2RhdGFbb2Zmc2V0XV07XG4gICAgICBjb25zdCBjb21wb25lbnQgPSBvYmplY3QuY29tcG9uZW50O1xuICAgICAgY29uc3QgX3BoeXNpanMgPSBjb21wb25lbnQuX3BoeXNpanM7XG5cbiAgICAgIGlmIChvYmplY3QgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoY29tcG9uZW50Ll9fZGlydHlQb3NpdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgb2JqZWN0LnBvc2l0aW9uLnNldChcbiAgICAgICAgICBkYXRhW29mZnNldCArIDFdLFxuICAgICAgICAgIGRhdGFbb2Zmc2V0ICsgMl0sXG4gICAgICAgICAgZGF0YVtvZmZzZXQgKyAzXVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbXBvbmVudC5fX2RpcnR5UG9zaXRpb24gPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudC5fX2RpcnR5Um90YXRpb24gPT09IGZhbHNlKSB7XG4gICAgICAgIG9iamVjdC5xdWF0ZXJuaW9uLnNldChcbiAgICAgICAgICBkYXRhW29mZnNldCArIDRdLFxuICAgICAgICAgIGRhdGFbb2Zmc2V0ICsgNV0sXG4gICAgICAgICAgZGF0YVtvZmZzZXQgKyA2XSxcbiAgICAgICAgICBkYXRhW29mZnNldCArIDddXG4gICAgICAgICk7XG5cbiAgICAgICAgY29tcG9uZW50Ll9fZGlydHlSb3RhdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBfcGh5c2lqcy5saW5lYXJWZWxvY2l0eS5zZXQoXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgOF0sXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgOV0sXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgMTBdXG4gICAgICApO1xuXG4gICAgICBfcGh5c2lqcy5hbmd1bGFyVmVsb2NpdHkuc2V0KFxuICAgICAgICBkYXRhW29mZnNldCArIDExXSxcbiAgICAgICAgZGF0YVtvZmZzZXQgKyAxMl0sXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgMTNdXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLlNVUFBPUlRfVFJBTlNGRVJBQkxFKVxuICAgICAgdGhpcy5fd29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UoZGF0YS5idWZmZXIsIFtkYXRhLmJ1ZmZlcl0pOyAvLyBHaXZlIHRoZSB0eXBlZCBhcnJheSBiYWNrIHRvIHRoZSB3b3JrZXJcblxuICAgIHRoaXMuX2lzX3NpbXVsYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3VwZGF0ZScpO1xuICB9XG5cbiAgX3VwZGF0ZVNvZnRib2RpZXMoZGF0YSkge1xuICAgIGxldCBpbmRleCA9IGRhdGFbMV0sXG4gICAgICBvZmZzZXQgPSAyO1xuXG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IHNpemUgPSBkYXRhW29mZnNldCArIDFdO1xuICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5fb2JqZWN0c1tkYXRhW29mZnNldF1dO1xuICAgICAgY29uc3QgX3BoeXNpanMgPSBvYmplY3QuY29tcG9uZW50Ll9waHlzaWpzO1xuXG4gICAgICBpZiAob2JqZWN0ID09PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgY29uc3QgYXR0cmlidXRlcyA9IG9iamVjdC5nZW9tZXRyeS5hdHRyaWJ1dGVzO1xuICAgICAgY29uc3Qgdm9sdW1lUG9zaXRpb25zID0gYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcblxuICAgICAgY29uc3Qgb2Zmc2V0VmVydCA9IG9mZnNldCArIDI7XG5cbiAgICAgIGlmICghX3BoeXNpanMuaXNTb2Z0Qm9keVJlc2V0KSB7XG4gICAgICAgIG9iamVjdC5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICAgIG9iamVjdC5xdWF0ZXJuaW9uLnNldCgwLCAwLCAwLCAwKTtcblxuICAgICAgICBfcGh5c2lqcy5pc1NvZnRCb2R5UmVzZXQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3BoeXNpanMudHlwZSA9PT0gXCJzb2Z0VHJpbWVzaFwiKSB7XG4gICAgICAgIGNvbnN0IHZvbHVtZU5vcm1hbHMgPSBhdHRyaWJ1dGVzLm5vcm1hbC5hcnJheTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG9mZnMgPSBvZmZzZXRWZXJ0ICsgaSAqIDE4O1xuXG4gICAgICAgICAgY29uc3QgeDEgPSBkYXRhW29mZnNdO1xuICAgICAgICAgIGNvbnN0IHkxID0gZGF0YVtvZmZzICsgMV07XG4gICAgICAgICAgY29uc3QgejEgPSBkYXRhW29mZnMgKyAyXTtcblxuICAgICAgICAgIGNvbnN0IG54MSA9IGRhdGFbb2ZmcyArIDNdO1xuICAgICAgICAgIGNvbnN0IG55MSA9IGRhdGFbb2ZmcyArIDRdO1xuICAgICAgICAgIGNvbnN0IG56MSA9IGRhdGFbb2ZmcyArIDVdO1xuXG4gICAgICAgICAgY29uc3QgeDIgPSBkYXRhW29mZnMgKyA2XTtcbiAgICAgICAgICBjb25zdCB5MiA9IGRhdGFbb2ZmcyArIDddO1xuICAgICAgICAgIGNvbnN0IHoyID0gZGF0YVtvZmZzICsgOF07XG5cbiAgICAgICAgICBjb25zdCBueDIgPSBkYXRhW29mZnMgKyA5XTtcbiAgICAgICAgICBjb25zdCBueTIgPSBkYXRhW29mZnMgKyAxMF07XG4gICAgICAgICAgY29uc3QgbnoyID0gZGF0YVtvZmZzICsgMTFdO1xuXG4gICAgICAgICAgY29uc3QgeDMgPSBkYXRhW29mZnMgKyAxMl07XG4gICAgICAgICAgY29uc3QgeTMgPSBkYXRhW29mZnMgKyAxM107XG4gICAgICAgICAgY29uc3QgejMgPSBkYXRhW29mZnMgKyAxNF07XG5cbiAgICAgICAgICBjb25zdCBueDMgPSBkYXRhW29mZnMgKyAxNV07XG4gICAgICAgICAgY29uc3QgbnkzID0gZGF0YVtvZmZzICsgMTZdO1xuICAgICAgICAgIGNvbnN0IG56MyA9IGRhdGFbb2ZmcyArIDE3XTtcblxuICAgICAgICAgIGNvbnN0IGk5ID0gaSAqIDk7XG5cbiAgICAgICAgICB2b2x1bWVQb3NpdGlvbnNbaTldID0geDE7XG4gICAgICAgICAgdm9sdW1lUG9zaXRpb25zW2k5ICsgMV0gPSB5MTtcbiAgICAgICAgICB2b2x1bWVQb3NpdGlvbnNbaTkgKyAyXSA9IHoxO1xuXG4gICAgICAgICAgdm9sdW1lUG9zaXRpb25zW2k5ICsgM10gPSB4MjtcbiAgICAgICAgICB2b2x1bWVQb3NpdGlvbnNbaTkgKyA0XSA9IHkyO1xuICAgICAgICAgIHZvbHVtZVBvc2l0aW9uc1tpOSArIDVdID0gejI7XG5cbiAgICAgICAgICB2b2x1bWVQb3NpdGlvbnNbaTkgKyA2XSA9IHgzO1xuICAgICAgICAgIHZvbHVtZVBvc2l0aW9uc1tpOSArIDddID0geTM7XG4gICAgICAgICAgdm9sdW1lUG9zaXRpb25zW2k5ICsgOF0gPSB6MztcblxuICAgICAgICAgIHZvbHVtZU5vcm1hbHNbaTldID0gbngxO1xuICAgICAgICAgIHZvbHVtZU5vcm1hbHNbaTkgKyAxXSA9IG55MTtcbiAgICAgICAgICB2b2x1bWVOb3JtYWxzW2k5ICsgMl0gPSBuejE7XG5cbiAgICAgICAgICB2b2x1bWVOb3JtYWxzW2k5ICsgM10gPSBueDI7XG4gICAgICAgICAgdm9sdW1lTm9ybWFsc1tpOSArIDRdID0gbnkyO1xuICAgICAgICAgIHZvbHVtZU5vcm1hbHNbaTkgKyA1XSA9IG56MjtcblxuICAgICAgICAgIHZvbHVtZU5vcm1hbHNbaTkgKyA2XSA9IG54MztcbiAgICAgICAgICB2b2x1bWVOb3JtYWxzW2k5ICsgN10gPSBueTM7XG4gICAgICAgICAgdm9sdW1lTm9ybWFsc1tpOSArIDhdID0gbnozO1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0cmlidXRlcy5ub3JtYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoX3BoeXNpanMudHlwZSA9PT0gXCJzb2Z0Um9wZU1lc2hcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG9mZnMgPSBvZmZzZXRWZXJ0ICsgaSAqIDM7XG5cbiAgICAgICAgICBjb25zdCB4ID0gZGF0YVtvZmZzXTtcbiAgICAgICAgICBjb25zdCB5ID0gZGF0YVtvZmZzICsgMV07XG4gICAgICAgICAgY29uc3QgeiA9IGRhdGFbb2ZmcyArIDJdO1xuXG4gICAgICAgICAgdm9sdW1lUG9zaXRpb25zW2kgKiAzXSA9IHg7XG4gICAgICAgICAgdm9sdW1lUG9zaXRpb25zW2kgKiAzICsgMV0gPSB5O1xuICAgICAgICAgIHZvbHVtZVBvc2l0aW9uc1tpICogMyArIDJdID0gejtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgdm9sdW1lTm9ybWFscyA9IGF0dHJpYnV0ZXMubm9ybWFsLmFycmF5O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgb2ZmcyA9IG9mZnNldFZlcnQgKyBpICogNjtcblxuICAgICAgICAgIGNvbnN0IHggPSBkYXRhW29mZnNdO1xuICAgICAgICAgIGNvbnN0IHkgPSBkYXRhW29mZnMgKyAxXTtcbiAgICAgICAgICBjb25zdCB6ID0gZGF0YVtvZmZzICsgMl07XG5cbiAgICAgICAgICBjb25zdCBueCA9IGRhdGFbb2ZmcyArIDNdO1xuICAgICAgICAgIGNvbnN0IG55ID0gZGF0YVtvZmZzICsgNF07XG4gICAgICAgICAgY29uc3QgbnogPSBkYXRhW29mZnMgKyA1XTtcblxuICAgICAgICAgIHZvbHVtZVBvc2l0aW9uc1tpICogM10gPSB4O1xuICAgICAgICAgIHZvbHVtZVBvc2l0aW9uc1tpICogMyArIDFdID0geTtcbiAgICAgICAgICB2b2x1bWVQb3NpdGlvbnNbaSAqIDMgKyAyXSA9IHo7XG5cbiAgICAgICAgICAvLyBGSVhNRTogTm9ybWFscyBhcmUgcG9pbnRlZCB0byBsb29rIGluc2lkZTtcbiAgICAgICAgICB2b2x1bWVOb3JtYWxzW2kgKiAzXSA9IG54O1xuICAgICAgICAgIHZvbHVtZU5vcm1hbHNbaSAqIDMgKyAxXSA9IG55O1xuICAgICAgICAgIHZvbHVtZU5vcm1hbHNbaSAqIDMgKyAyXSA9IG56O1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0cmlidXRlcy5ub3JtYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBhdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgb2Zmc2V0ICs9IDIgKyBzaXplICogMTg7XG4gICAgfVxuXG4gICAgLy8gaWYgKHRoaXMuU1VQUE9SVF9UUkFOU0ZFUkFCTEUpXG4gICAgLy8gICB0aGlzLl93b3JrZXIudHJhbnNmZXJhYmxlTWVzc2FnZShkYXRhLmJ1ZmZlciwgW2RhdGEuYnVmZmVyXSk7IC8vIEdpdmUgdGhlIHR5cGVkIGFycmF5IGJhY2sgdG8gdGhlIHdvcmtlclxuXG4gICAgdGhpcy5faXNfc2ltdWxhdGluZyA9IGZhbHNlO1xuICB9XG5cbiAgX3VwZGF0ZVZlaGljbGVzKGRhdGEpIHtcbiAgICBsZXQgdmVoaWNsZSwgd2hlZWw7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IChkYXRhLmxlbmd0aCAtIDEpIC8gVkVISUNMRVJFUE9SVF9JVEVNU0laRTsgaSsrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSAxICsgaSAqIFZFSElDTEVSRVBPUlRfSVRFTVNJWkU7XG4gICAgICB2ZWhpY2xlID0gdGhpcy5fdmVoaWNsZXNbZGF0YVtvZmZzZXRdXTtcblxuICAgICAgaWYgKHZlaGljbGUgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICB3aGVlbCA9IHZlaGljbGUud2hlZWxzW2RhdGFbb2Zmc2V0ICsgMV1dO1xuXG4gICAgICB3aGVlbC5wb3NpdGlvbi5zZXQoXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgMl0sXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgM10sXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgNF1cbiAgICAgICk7XG5cbiAgICAgIHdoZWVsLnF1YXRlcm5pb24uc2V0KFxuICAgICAgICBkYXRhW29mZnNldCArIDVdLFxuICAgICAgICBkYXRhW29mZnNldCArIDZdLFxuICAgICAgICBkYXRhW29mZnNldCArIDddLFxuICAgICAgICBkYXRhW29mZnNldCArIDhdXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLlNVUFBPUlRfVFJBTlNGRVJBQkxFKVxuICAgICAgdGhpcy5fd29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UoZGF0YS5idWZmZXIsIFtkYXRhLmJ1ZmZlcl0pOyAvLyBHaXZlIHRoZSB0eXBlZCBhcnJheSBiYWNrIHRvIHRoZSB3b3JrZXJcbiAgfVxuXG4gIF91cGRhdGVDb25zdHJhaW50cyhkYXRhKSB7XG4gICAgbGV0IGNvbnN0cmFpbnQsIG9iamVjdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGRhdGEubGVuZ3RoIC0gMSkgLyBDT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFOyBpKyspIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IDEgKyBpICogQ09OU1RSQUlOVFJFUE9SVF9JVEVNU0laRTtcbiAgICAgIGNvbnN0cmFpbnQgPSB0aGlzLl9jb25zdHJhaW50c1tkYXRhW29mZnNldF1dO1xuICAgICAgb2JqZWN0ID0gdGhpcy5fb2JqZWN0c1tkYXRhW29mZnNldCArIDFdXTtcblxuICAgICAgaWYgKGNvbnN0cmFpbnQgPT09IHVuZGVmaW5lZCB8fCBvYmplY3QgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG5cbiAgICAgIHRlbXAxVmVjdG9yMy5zZXQoXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgMl0sXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgM10sXG4gICAgICAgIGRhdGFbb2Zmc2V0ICsgNF1cbiAgICAgICk7XG5cbiAgICAgIHRlbXAxTWF0cml4NC5leHRyYWN0Um90YXRpb24ob2JqZWN0Lm1hdHJpeCk7XG4gICAgICB0ZW1wMVZlY3RvcjMuYXBwbHlNYXRyaXg0KHRlbXAxTWF0cml4NCk7XG5cbiAgICAgIGNvbnN0cmFpbnQucG9zaXRpb25hLmFkZFZlY3RvcnMob2JqZWN0LnBvc2l0aW9uLCB0ZW1wMVZlY3RvcjMpO1xuICAgICAgY29uc3RyYWludC5hcHBsaWVkSW1wdWxzZSA9IGRhdGFbb2Zmc2V0ICsgNV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuU1VQUE9SVF9UUkFOU0ZFUkFCTEUpXG4gICAgICB0aGlzLl93b3JrZXIudHJhbnNmZXJhYmxlTWVzc2FnZShkYXRhLmJ1ZmZlciwgW2RhdGEuYnVmZmVyXSk7IC8vIEdpdmUgdGhlIHR5cGVkIGFycmF5IGJhY2sgdG8gdGhlIHdvcmtlclxuICB9XG5cbiAgX3VwZGF0ZUNvbGxpc2lvbnMoZGF0YSkge1xuICAgIC8qKlxuICAgICAqICNUT0RPXG4gICAgICogVGhpcyBpcyBwcm9iYWJseSB0aGUgd29yc3Qgd2F5IGV2ZXIgdG8gaGFuZGxlIGNvbGxpc2lvbnMuIFRoZSBpbmhlcmVudCBldmlsbmVzcyBpcyBhIHJlc2lkdWFsXG4gICAgICogZWZmZWN0IGZyb20gdGhlIHByZXZpb3VzIHZlcnNpb24ncyBldmlsbmVzcyB3aGljaCBtdXRhdGVkIHdoZW4gc3dpdGNoaW5nIHRvIHRyYW5zZmVyYWJsZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogSWYgeW91IGZlZWwgaW5jbGluZWQgdG8gbWFrZSB0aGlzIGJldHRlciwgcGxlYXNlIGRvIHNvLlxuICAgICAqL1xuXG4gICAgY29uc3QgY29sbGlzaW9ucyA9IHt9LFxuICAgICAgbm9ybWFsX29mZnNldHMgPSB7fTtcblxuICAgIC8vIEJ1aWxkIGNvbGxpc2lvbiBtYW5pZmVzdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVsxXTsgaSsrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSAyICsgaSAqIENPTExJU0lPTlJFUE9SVF9JVEVNU0laRTtcbiAgICAgIGNvbnN0IG9iamVjdCA9IGRhdGFbb2Zmc2V0XTtcbiAgICAgIGNvbnN0IG9iamVjdDIgPSBkYXRhW29mZnNldCArIDFdO1xuXG4gICAgICBub3JtYWxfb2Zmc2V0c1tgJHtvYmplY3R9LSR7b2JqZWN0Mn1gXSA9IG9mZnNldCArIDI7XG4gICAgICBub3JtYWxfb2Zmc2V0c1tgJHtvYmplY3QyfS0ke29iamVjdH1gXSA9IC0xICogKG9mZnNldCArIDIpO1xuXG4gICAgICAvLyBSZWdpc3RlciBjb2xsaXNpb25zIGZvciBib3RoIHRoZSBvYmplY3QgY29sbGlkaW5nIGFuZCB0aGUgb2JqZWN0IGJlaW5nIGNvbGxpZGVkIHdpdGhcbiAgICAgIGlmICghY29sbGlzaW9uc1tvYmplY3RdKSBjb2xsaXNpb25zW29iamVjdF0gPSBbXTtcbiAgICAgIGNvbGxpc2lvbnNbb2JqZWN0XS5wdXNoKG9iamVjdDIpO1xuXG4gICAgICBpZiAoIWNvbGxpc2lvbnNbb2JqZWN0Ml0pIGNvbGxpc2lvbnNbb2JqZWN0Ml0gPSBbXTtcbiAgICAgIGNvbGxpc2lvbnNbb2JqZWN0Ml0ucHVzaChvYmplY3QpO1xuICAgIH1cblxuICAgIC8vIERlYWwgd2l0aCBjb2xsaXNpb25zXG4gICAgZm9yIChjb25zdCBpZDEgaW4gdGhpcy5fb2JqZWN0cykge1xuICAgICAgaWYgKCF0aGlzLl9vYmplY3RzLmhhc093blByb3BlcnR5KGlkMSkpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5fb2JqZWN0c1tpZDFdO1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gb2JqZWN0LmNvbXBvbmVudDtcbiAgICAgIGNvbnN0IF9waHlzaWpzID0gY29tcG9uZW50Ll9waHlzaWpzO1xuICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgIC8vIElmIG9iamVjdCB0b3VjaGVzIGFueXRoaW5nLCAuLi5cbiAgICAgIGlmIChjb2xsaXNpb25zW2lkMV0pIHtcbiAgICAgICAgLy8gQ2xlYW4gdXAgdG91Y2hlcyBhcnJheVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IF9waHlzaWpzLnRvdWNoZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoY29sbGlzaW9uc1tpZDFdLmluZGV4T2YoX3BoeXNpanMudG91Y2hlc1tqXSkgPT09IC0xKVxuICAgICAgICAgICAgX3BoeXNpanMudG91Y2hlcy5zcGxpY2Uoai0tLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBlYWNoIGNvbGxpZGluZyBvYmplY3RcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xsaXNpb25zW2lkMV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBpZDIgPSBjb2xsaXNpb25zW2lkMV1bal07XG4gICAgICAgICAgY29uc3Qgb2JqZWN0MiA9IHRoaXMuX29iamVjdHNbaWQyXTtcbiAgICAgICAgICBjb25zdCBjb21wb25lbnQyID0gb2JqZWN0Mi5jb21wb25lbnQ7XG4gICAgICAgICAgY29uc3QgX3BoeXNpanMyID0gY29tcG9uZW50Mi5fcGh5c2lqcztcblxuICAgICAgICAgIGlmIChvYmplY3QyKSB7XG4gICAgICAgICAgICAvLyBJZiBvYmplY3Qgd2FzIG5vdCBhbHJlYWR5IHRvdWNoaW5nIG9iamVjdDIsIG5vdGlmeSBvYmplY3RcbiAgICAgICAgICAgIGlmIChfcGh5c2lqcy50b3VjaGVzLmluZGV4T2YoaWQyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgX3BoeXNpanMudG91Y2hlcy5wdXNoKGlkMik7XG5cbiAgICAgICAgICAgICAgdGVtcDFWZWN0b3IzLnN1YlZlY3RvcnMoY29tcG9uZW50LmdldExpbmVhclZlbG9jaXR5KCksIGNvbXBvbmVudDIuZ2V0TGluZWFyVmVsb2NpdHkoKSk7XG4gICAgICAgICAgICAgIGNvbnN0IHRlbXAxID0gdGVtcDFWZWN0b3IzLmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgdGVtcDFWZWN0b3IzLnN1YlZlY3RvcnMoY29tcG9uZW50LmdldEFuZ3VsYXJWZWxvY2l0eSgpLCBjb21wb25lbnQyLmdldEFuZ3VsYXJWZWxvY2l0eSgpKTtcbiAgICAgICAgICAgICAgY29uc3QgdGVtcDIgPSB0ZW1wMVZlY3RvcjMuY2xvbmUoKTtcblxuICAgICAgICAgICAgICBsZXQgbm9ybWFsX29mZnNldCA9IG5vcm1hbF9vZmZzZXRzW2Ake19waHlzaWpzLmlkfS0ke19waHlzaWpzMi5pZH1gXTtcblxuICAgICAgICAgICAgICBpZiAobm9ybWFsX29mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICB0ZW1wMVZlY3RvcjMuc2V0KFxuICAgICAgICAgICAgICAgICAgLWRhdGFbbm9ybWFsX29mZnNldF0sXG4gICAgICAgICAgICAgICAgICAtZGF0YVtub3JtYWxfb2Zmc2V0ICsgMV0sXG4gICAgICAgICAgICAgICAgICAtZGF0YVtub3JtYWxfb2Zmc2V0ICsgMl1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vcm1hbF9vZmZzZXQgKj0gLTE7XG5cbiAgICAgICAgICAgICAgICB0ZW1wMVZlY3RvcjMuc2V0KFxuICAgICAgICAgICAgICAgICAgZGF0YVtub3JtYWxfb2Zmc2V0XSxcbiAgICAgICAgICAgICAgICAgIGRhdGFbbm9ybWFsX29mZnNldCArIDFdLFxuICAgICAgICAgICAgICAgICAgZGF0YVtub3JtYWxfb2Zmc2V0ICsgMl1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29tcG9uZW50LmVtaXQoJ2NvbGxpc2lvbicsIG9iamVjdDIsIHRlbXAxLCB0ZW1wMiwgdGVtcDFWZWN0b3IzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBfcGh5c2lqcy50b3VjaGVzLmxlbmd0aCA9IDA7IC8vIG5vdCB0b3VjaGluZyBvdGhlciBvYmplY3RzXG4gICAgfVxuXG4gICAgdGhpcy5jb2xsaXNpb25zID0gY29sbGlzaW9ucztcblxuICAgIGlmICh0aGlzLlNVUFBPUlRfVFJBTlNGRVJBQkxFKVxuICAgICAgdGhpcy5fd29ya2VyLnRyYW5zZmVyYWJsZU1lc3NhZ2UoZGF0YS5idWZmZXIsIFtkYXRhLmJ1ZmZlcl0pOyAvLyBHaXZlIHRoZSB0eXBlZCBhcnJheSBiYWNrIHRvIHRoZSB3b3JrZXJcbiAgfVxuXG4gIGFkZENvbnN0cmFpbnQoY29uc3RyYWludCwgc2hvd19tYXJrZXIpIHtcbiAgICBjb25zdHJhaW50LmlkID0gdGhpcy5nZXRPYmplY3RJZCgpO1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzW2NvbnN0cmFpbnQuaWRdID0gY29uc3RyYWludDtcbiAgICBjb25zdHJhaW50LndvcmxkTW9kdWxlID0gdGhpcztcbiAgICB0aGlzLmV4ZWN1dGUoJ2FkZENvbnN0cmFpbnQnLCBjb25zdHJhaW50LmdldERlZmluaXRpb24oKSk7XG5cbiAgICBpZiAoc2hvd19tYXJrZXIpIHtcbiAgICAgIGxldCBtYXJrZXI7XG5cbiAgICAgIHN3aXRjaCAoY29uc3RyYWludC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3BvaW50JzpcbiAgICAgICAgICBtYXJrZXIgPSBuZXcgTWVzaChcbiAgICAgICAgICAgIG5ldyBTcGhlcmVHZW9tZXRyeSgxLjUpLFxuICAgICAgICAgICAgbmV3IE1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIG1hcmtlci5wb3NpdGlvbi5jb3B5KGNvbnN0cmFpbnQucG9zaXRpb25hKTtcbiAgICAgICAgICB0aGlzLl9vYmplY3RzW2NvbnN0cmFpbnQub2JqZWN0YV0uYWRkKG1hcmtlcik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaGluZ2UnOlxuICAgICAgICAgIG1hcmtlciA9IG5ldyBNZXNoKFxuICAgICAgICAgICAgbmV3IFNwaGVyZUdlb21ldHJ5KDEuNSksXG4gICAgICAgICAgICBuZXcgTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbWFya2VyLnBvc2l0aW9uLmNvcHkoY29uc3RyYWludC5wb3NpdGlvbmEpO1xuICAgICAgICAgIHRoaXMuX29iamVjdHNbY29uc3RyYWludC5vYmplY3RhXS5hZGQobWFya2VyKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdzbGlkZXInOlxuICAgICAgICAgIG1hcmtlciA9IG5ldyBNZXNoKFxuICAgICAgICAgICAgbmV3IEJveEdlb21ldHJ5KDEwLCAxLCAxKSxcbiAgICAgICAgICAgIG5ldyBNZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBtYXJrZXIucG9zaXRpb24uY29weShjb25zdHJhaW50LnBvc2l0aW9uYSk7XG5cbiAgICAgICAgICAvLyBUaGlzIHJvdGF0aW9uIGlzbid0IHJpZ2h0IGlmIGFsbCB0aHJlZSBheGlzIGFyZSBub24tMCB2YWx1ZXNcbiAgICAgICAgICAvLyBUT0RPOiBjaGFuZ2UgbWFya2VyJ3Mgcm90YXRpb24gb3JkZXIgdG8gWllYXG4gICAgICAgICAgbWFya2VyLnJvdGF0aW9uLnNldChcbiAgICAgICAgICAgIGNvbnN0cmFpbnQuYXhpcy55LCAvLyB5ZXMsIHkgYW5kXG4gICAgICAgICAgICBjb25zdHJhaW50LmF4aXMueCwgLy8geCBheGlzIGFyZSBzd2FwcGVkXG4gICAgICAgICAgICBjb25zdHJhaW50LmF4aXMuelxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fb2JqZWN0c1tjb25zdHJhaW50Lm9iamVjdGFdLmFkZChtYXJrZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2NvbmV0d2lzdCc6XG4gICAgICAgICAgbWFya2VyID0gbmV3IE1lc2goXG4gICAgICAgICAgICBuZXcgU3BoZXJlR2VvbWV0cnkoMS41KSxcbiAgICAgICAgICAgIG5ldyBNZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBtYXJrZXIucG9zaXRpb24uY29weShjb25zdHJhaW50LnBvc2l0aW9uYSk7XG4gICAgICAgICAgdGhpcy5fb2JqZWN0c1tjb25zdHJhaW50Lm9iamVjdGFdLmFkZChtYXJrZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2RvZic6XG4gICAgICAgICAgbWFya2VyID0gbmV3IE1lc2goXG4gICAgICAgICAgICBuZXcgU3BoZXJlR2VvbWV0cnkoMS41KSxcbiAgICAgICAgICAgIG5ldyBNZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBtYXJrZXIucG9zaXRpb24uY29weShjb25zdHJhaW50LnBvc2l0aW9uYSk7XG4gICAgICAgICAgdGhpcy5fb2JqZWN0c1tjb25zdHJhaW50Lm9iamVjdGFdLmFkZChtYXJrZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJhaW50O1xuICB9XG5cbiAgb25TaW11bGF0aW9uUmVzdW1lKCkge1xuICAgIHRoaXMuZXhlY3V0ZSgnb25TaW11bGF0aW9uUmVzdW1lJywge30pO1xuICB9XG5cbiAgcmVtb3ZlQ29uc3RyYWludChjb25zdHJhaW50KSB7XG4gICAgaWYgKHRoaXMuX2NvbnN0cmFpbnRzW2NvbnN0cmFpbnQuaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZXhlY3V0ZSgncmVtb3ZlQ29uc3RyYWludCcsIHtpZDogY29uc3RyYWludC5pZH0pO1xuICAgICAgZGVsZXRlIHRoaXMuX2NvbnN0cmFpbnRzW2NvbnN0cmFpbnQuaWRdO1xuICAgIH1cbiAgfVxuXG4gIGV4ZWN1dGUoY21kLCBwYXJhbXMpIHtcbiAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2Uoe2NtZCwgcGFyYW1zfSk7XG4gIH1cblxuICBvbkFkZENhbGxiYWNrKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IG9iamVjdCA9IGNvbXBvbmVudC5uYXRpdmU7XG4gICAgY29uc3QgX3BoeXNpanMgPSBvYmplY3QuX3BoeXNpanMgfHwgb2JqZWN0LmNvbXBvbmVudC5fcGh5c2lqcztcblxuICAgIGlmIChfcGh5c2lqcykge1xuICAgICAgY29tcG9uZW50Lm1hbmFnZXIuYWRkRGVwZW5kZW5jeSgnbW9kdWxlOndvcmxkJywgdGhpcyk7XG4gICAgICBfcGh5c2lqcy5pZCA9IHRoaXMuZ2V0T2JqZWN0SWQoKTtcblxuICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFZlaGljbGUpIHtcbiAgICAgICAgdGhpcy5vbkFkZENhbGxiYWNrKG9iamVjdC5tZXNoKTtcbiAgICAgICAgdGhpcy5fdmVoaWNsZXNbX3BoeXNpanMuaWRdID0gb2JqZWN0O1xuICAgICAgICB0aGlzLmV4ZWN1dGUoJ2FkZFZlaGljbGUnLCBfcGh5c2lqcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnQuX19kaXJ0eVBvc2l0aW9uID0gZmFsc2U7XG4gICAgICAgIGNvbXBvbmVudC5fX2RpcnR5Um90YXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fb2JqZWN0c1tfcGh5c2lqcy5pZF0gPSBvYmplY3Q7XG5cbiAgICAgICAgaWYgKG9iamVjdC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICBfcGh5c2lqcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgIGFkZE9iamVjdENoaWxkcmVuKG9iamVjdCwgb2JqZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmplY3QubWF0ZXJpYWwuX3BoeXNpanMpIHtcbiAgICAgICAgICBpZiAodGhpcy5fbWF0ZXJpYWxzX3JlZl9jb3VudHMuaGFzT3duUHJvcGVydHkob2JqZWN0Lm1hdGVyaWFsLl9waHlzaWpzLmlkKSlcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsc19yZWZfY291bnRzW29iamVjdC5tYXRlcmlhbC5fcGh5c2lqcy5pZF0rKztcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0ZSgncmVnaXN0ZXJNYXRlcmlhbCcsIG9iamVjdC5tYXRlcmlhbC5fcGh5c2lqcyk7XG4gICAgICAgICAgICBfcGh5c2lqcy5tYXRlcmlhbElkID0gb2JqZWN0Lm1hdGVyaWFsLl9waHlzaWpzLmlkO1xuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxzX3JlZl9jb3VudHNbb2JqZWN0Lm1hdGVyaWFsLl9waHlzaWpzLmlkXSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gT2JqZWN0IHN0YXJ0aW5nIHBvc2l0aW9uICsgcm90YXRpb25cbiAgICAgICAgX3BoeXNpanMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogb2JqZWN0LnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogb2JqZWN0LnBvc2l0aW9uLnksXG4gICAgICAgICAgejogb2JqZWN0LnBvc2l0aW9uLnpcbiAgICAgICAgfTtcblxuICAgICAgICBfcGh5c2lqcy5yb3RhdGlvbiA9IHtcbiAgICAgICAgICB4OiBvYmplY3QucXVhdGVybmlvbi54LFxuICAgICAgICAgIHk6IG9iamVjdC5xdWF0ZXJuaW9uLnksXG4gICAgICAgICAgejogb2JqZWN0LnF1YXRlcm5pb24ueixcbiAgICAgICAgICB3OiBvYmplY3QucXVhdGVybmlvbi53XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKF9waHlzaWpzLndpZHRoKSBfcGh5c2lqcy53aWR0aCAqPSBvYmplY3Quc2NhbGUueDtcbiAgICAgICAgaWYgKF9waHlzaWpzLmhlaWdodCkgX3BoeXNpanMuaGVpZ2h0ICo9IG9iamVjdC5zY2FsZS55O1xuICAgICAgICBpZiAoX3BoeXNpanMuZGVwdGgpIF9waHlzaWpzLmRlcHRoICo9IG9iamVjdC5zY2FsZS56O1xuXG4gICAgICAgIHRoaXMuZXhlY3V0ZSgnYWRkT2JqZWN0JywgX3BoeXNpanMpO1xuICAgICAgfVxuXG4gICAgICBjb21wb25lbnQuZW1pdCgncGh5c2ljczphZGRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIG9uUmVtb3ZlQ2FsbGJhY2soY29tcG9uZW50KSB7XG4gICAgY29uc3Qgb2JqZWN0ID0gY29tcG9uZW50Lm5hdGl2ZTtcblxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBWZWhpY2xlKSB7XG4gICAgICB0aGlzLmV4ZWN1dGUoJ3JlbW92ZVZlaGljbGUnLCB7aWQ6IG9iamVjdC5fcGh5c2lqcy5pZH0pO1xuICAgICAgd2hpbGUgKG9iamVjdC53aGVlbHMubGVuZ3RoKSB0aGlzLnJlbW92ZShvYmplY3Qud2hlZWxzLnBvcCgpKTtcblxuICAgICAgdGhpcy5yZW1vdmUob2JqZWN0Lm1lc2gpO1xuICAgICAgdGhpcy5fdmVoaWNsZXNbb2JqZWN0Ll9waHlzaWpzLmlkXSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1lc2gucHJvdG90eXBlLnJlbW92ZS5jYWxsKHRoaXMsIG9iamVjdCk7XG5cbiAgICAgIGlmIChvYmplY3QuX3BoeXNpanMpIHtcbiAgICAgICAgY29tcG9uZW50Lm1hbmFnZXIucmVtb3ZlRGVwZW5kZW5jeSgnbW9kdWxlOndvcmxkJyk7XG4gICAgICAgIHRoaXMuX29iamVjdHNbb2JqZWN0Ll9waHlzaWpzLmlkXSA9IG51bGw7XG4gICAgICAgIHRoaXMuZXhlY3V0ZSgncmVtb3ZlT2JqZWN0Jywge2lkOiBvYmplY3QuX3BoeXNpanMuaWR9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9iamVjdC5tYXRlcmlhbCAmJiBvYmplY3QubWF0ZXJpYWwuX3BoeXNpanMgJiYgdGhpcy5fbWF0ZXJpYWxzX3JlZl9jb3VudHMuaGFzT3duUHJvcGVydHkob2JqZWN0Lm1hdGVyaWFsLl9waHlzaWpzLmlkKSkge1xuICAgICAgdGhpcy5fbWF0ZXJpYWxzX3JlZl9jb3VudHNbb2JqZWN0Lm1hdGVyaWFsLl9waHlzaWpzLmlkXS0tO1xuXG4gICAgICBpZiAodGhpcy5fbWF0ZXJpYWxzX3JlZl9jb3VudHNbb2JqZWN0Lm1hdGVyaWFsLl9waHlzaWpzLmlkXSA9PT0gMCkge1xuICAgICAgICB0aGlzLmV4ZWN1dGUoJ3VuUmVnaXN0ZXJNYXRlcmlhbCcsIG9iamVjdC5tYXRlcmlhbC5fcGh5c2lqcyk7XG4gICAgICAgIHRoaXMuX21hdGVyaWFsc19yZWZfY291bnRzW29iamVjdC5tYXRlcmlhbC5fcGh5c2lqcy5pZF0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlZmVyKGZ1bmMsIGFyZ3MpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzTG9hZGVkKSB7XG4gICAgICAgIGZ1bmMoLi4uYXJncyk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB0aGlzLmxvYWRlci50aGVuKCgpID0+IHtcbiAgICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmFkZERlcGVuZGVuY3koJ3BoeXNpY3NXb3JrZXInLCB0aGlzLl93b3JrZXIpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG9uQWRkKGNvbXBvbmVudCwgc2VsZikge1xuICAgICAgaWYgKGNvbXBvbmVudC5fcGh5c2lqcykgcmV0dXJuIHNlbGYuZGVmZXIoc2VsZi5vbkFkZENhbGxiYWNrLmJpbmQoc2VsZiksIFtjb21wb25lbnRdKTtcbiAgICAgIHJldHVybjtcbiAgICB9LFxuICAgIG9uUmVtb3ZlKGNvbXBvbmVudCwgc2VsZikge1xuICAgICAgaWYgKGNvbXBvbmVudC5fcGh5c2lqcykgcmV0dXJuIHNlbGYuZGVmZXIoc2VsZi5vblJlbW92ZUNhbGxiYWNrLmJpbmQoc2VsZiksIFtjb21wb25lbnRdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgaW50ZWdyYXRlKHBhcmFtcywgc2VsZikge1xuICAgIC8vIC4uLlxuXG4gICAgdGhpcy5zZXRGaXhlZFRpbWVTdGVwID0gZnVuY3Rpb24oZml4ZWRUaW1lU3RlcCkge1xuICAgICAgaWYgKGZpeGVkVGltZVN0ZXApIHNlbGYuZXhlY3V0ZSgnc2V0Rml4ZWRUaW1lU3RlcCcsIGZpeGVkVGltZVN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc2V0R3Jhdml0eSA9IGZ1bmN0aW9uKGdyYXZpdHkpIHtcbiAgICAgIGlmIChncmF2aXR5KSBzZWxmLmV4ZWN1dGUoJ3NldEdyYXZpdHknLCBncmF2aXR5KTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENvbnN0cmFpbnQgPSBzZWxmLmFkZENvbnN0cmFpbnQuYmluZChzZWxmKTtcblxuICAgIHRoaXMuc2ltdWxhdGUgPSBmdW5jdGlvbih0aW1lU3RlcCwgbWF4U3ViU3RlcHMpIHtcbiAgICAgIGlmIChzZWxmLl9zdGF0cykgc2VsZi5fc3RhdHMuYmVnaW4oKTtcblxuICAgICAgaWYgKHNlbGYuX2lzX3NpbXVsYXRpbmcpIHJldHVybiBmYWxzZTtcblxuICAgICAgc2VsZi5faXNfc2ltdWxhdGluZyA9IHRydWU7XG5cbiAgICAgIGZvciAoY29uc3Qgb2JqZWN0X2lkIGluIHNlbGYuX29iamVjdHMpIHtcbiAgICAgICAgaWYgKCFzZWxmLl9vYmplY3RzLmhhc093blByb3BlcnR5KG9iamVjdF9pZCkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHNlbGYuX29iamVjdHNbb2JqZWN0X2lkXTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gb2JqZWN0LmNvbXBvbmVudDtcbiAgICAgICAgY29uc3QgX3BoeXNpanMgPSBjb21wb25lbnQuX3BoeXNpanM7XG5cbiAgICAgICAgaWYgKG9iamVjdCAhPT0gbnVsbCAmJiAoY29tcG9uZW50Ll9fZGlydHlQb3NpdGlvbiB8fCBjb21wb25lbnQuX19kaXJ0eVJvdGF0aW9uKSkge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IHtpZDogX3BoeXNpanMuaWR9O1xuXG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5fX2RpcnR5UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHVwZGF0ZS5wb3MgPSB7XG4gICAgICAgICAgICAgIHg6IG9iamVjdC5wb3NpdGlvbi54LFxuICAgICAgICAgICAgICB5OiBvYmplY3QucG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgejogb2JqZWN0LnBvc2l0aW9uLnpcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChfcGh5c2lqcy5pc1NvZnRib2R5KSBvYmplY3QucG9zaXRpb24uc2V0KDAsIDAsIDApO1xuXG4gICAgICAgICAgICBjb21wb25lbnQuX19kaXJ0eVBvc2l0aW9uID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5fX2RpcnR5Um90YXRpb24pIHtcbiAgICAgICAgICAgIHVwZGF0ZS5xdWF0ID0ge1xuICAgICAgICAgICAgICB4OiBvYmplY3QucXVhdGVybmlvbi54LFxuICAgICAgICAgICAgICB5OiBvYmplY3QucXVhdGVybmlvbi55LFxuICAgICAgICAgICAgICB6OiBvYmplY3QucXVhdGVybmlvbi56LFxuICAgICAgICAgICAgICB3OiBvYmplY3QucXVhdGVybmlvbi53XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoX3BoeXNpanMuaXNTb2Z0Ym9keSkgb2JqZWN0LnJvdGF0aW9uLnNldCgwLCAwLCAwKTtcblxuICAgICAgICAgICAgY29tcG9uZW50Ll9fZGlydHlSb3RhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYuZXhlY3V0ZSgndXBkYXRlVHJhbnNmb3JtJywgdXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZWxmLmV4ZWN1dGUoJ3NpbXVsYXRlJywge3RpbWVTdGVwLCBtYXhTdWJTdGVwc30pO1xuXG4gICAgICBpZiAoc2VsZi5fc3RhdHMpIHNlbGYuX3N0YXRzLmVuZCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gY29uc3Qgc2ltdWxhdGVQcm9jZXNzID0gKHQpID0+IHtcbiAgICAvLyAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2ltdWxhdGVQcm9jZXNzKTtcblxuICAgIC8vICAgdGhpcy5zaW11bGF0ZSgxLzYwLCAxKTsgLy8gZGVsdGEsIDFcbiAgICAvLyB9XG5cbiAgICAvLyBzaW11bGF0ZVByb2Nlc3MoKTtcblxuICAgIHNlbGYubG9hZGVyLnRoZW4oKCkgPT4ge1xuICAgICAgbmV3IFdIUy5Mb29wKChjbG9jaykgPT4ge1xuICAgICAgICB0aGlzLnNpbXVsYXRlKGNsb2NrLmdldERlbHRhKCksIDEpOyAvLyBkZWx0YSwgMVxuICAgICAgfSkuc3RhcnQodGhpcyk7XG5cbiAgICAgIHRoaXMuc2V0R3Jhdml0eShwYXJhbXMuZ3Jhdml0eSk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL1dvcmxkTW9kdWxlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9Xb3JsZE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0JveE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbXBvdW5kTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQ2Fwc3VsZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbmNhdmVNb2R1bGUnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9jb25lTWVzaCc7XG5leHBvcnQgKiBmcm9tICcuL0NvbnZleE1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL0N5bGluZGVyTW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vSGVpZ2h0ZmllbGRNb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9QbGFuZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1NwaGVyZU1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL1NvZnRib2R5TW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vQ2xvdGhNb2R1bGUnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9yb3BlTWVzaCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsImV4cG9ydCAqIGZyb20gJy4vdHVubmluZyc7XG5leHBvcnQgKiBmcm9tICcuL3ZlaGljbGUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZlaGljbGUvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDEwN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gMTA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKVxuICAsIGdldEl0ZXJGbiAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDExNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDExN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXR9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIE1FVEEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgd2tzRGVmaW5lICAgICAgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRrZXlzICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMzQzOTEzL2hvdy10by1jcmVhdGUtYS13ZWItd29ya2VyLWZyb20tYS1zdHJpbmdcclxuXHJcbnZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGVudCwgdXJsKSB7XHJcblx0dHJ5IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBibG9iO1xyXG5cdFx0XHR0cnkgeyAvLyBCbG9iQnVpbGRlciA9IERlcHJlY2F0ZWQsIGJ1dCB3aWRlbHkgaW1wbGVtZW50ZWRcclxuXHRcdFx0XHR2YXIgQmxvYkJ1aWxkZXIgPSB3aW5kb3cuQmxvYkJ1aWxkZXIgfHwgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8IHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlcjtcclxuXHRcdFx0XHRibG9iID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcblx0XHRcdFx0YmxvYi5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0YmxvYiA9IGJsb2IuZ2V0QmxvYigpO1xyXG5cdFx0XHR9IGNhdGNoKGUpIHsgLy8gVGhlIHByb3Bvc2VkIEFQSVxyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xyXG5cdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKCdkYXRhOmFwcGxpY2F0aW9uL2phdmFzY3JpcHQsJyArIGVuY29kZVVSSUNvbXBvbmVudChjb250ZW50KSk7XHJcblx0XHR9XHJcblx0fSBjYXRjaChlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFdvcmtlcih1cmwpO1xyXG5cdH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi93b3JrZXItbG9hZGVyL2NyZWF0ZUlubGluZVdvcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gMTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKFwiISEvVXNlcnMvYWxleDI0MDEvcGh5c2ljcy1tb2R1bGUtYW1tb25leHQvbm9kZV9tb2R1bGVzL3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzXCIpKFwiLyohIFBoeXNpY3MgbW9kdWxlIFxcXCJBbW1vbmV4dFxcXCIgdjAuMC4xLWRldi4xICovXFxuLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxcbi8qKioqKiovIFxcdC8vIFRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcXG4vKioqKioqLyBcXHRcXHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcXG4vKioqKioqLyBcXHRcXHRcXHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXFxuLyoqKioqKi8gXFx0XFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xcbi8qKioqKiovIFxcdFxcdFxcdGk6IG1vZHVsZUlkLFxcbi8qKioqKiovIFxcdFxcdFxcdGw6IGZhbHNlLFxcbi8qKioqKiovIFxcdFxcdFxcdGV4cG9ydHM6IHt9XFxuLyoqKioqKi8gXFx0XFx0fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdFxcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxcbi8qKioqKiovIFxcdFxcdG1vZHVsZS5sID0gdHJ1ZTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXFxuLyoqKioqKi8gXFx0XFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xcbi8qKioqKiovIFxcdH1cXG4vKioqKioqL1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xcbi8qKioqKiovIFxcdFxcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcXG4vKioqKioqLyBcXHRcXHRcXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xcbi8qKioqKiovIFxcdFxcdFxcdFxcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXFxuLyoqKioqKi8gXFx0XFx0XFx0XFx0ZW51bWVyYWJsZTogdHJ1ZSxcXG4vKioqKioqLyBcXHRcXHRcXHRcXHRnZXQ6IGdldHRlclxcbi8qKioqKiovIFxcdFxcdFxcdH0pO1xcbi8qKioqKiovIFxcdFxcdH1cXG4vKioqKioqLyBcXHR9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcXG4vKioqKioqLyBcXHRcXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cXG4vKioqKioqLyBcXHRcXHRcXHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxcbi8qKioqKiovIFxcdFxcdFxcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XFxuLyoqKioqKi8gXFx0XFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xcbi8qKioqKiovIFxcdFxcdHJldHVybiBnZXR0ZXI7XFxuLyoqKioqKi8gXFx0fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXFxcIlxcXCI7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcXG4vKioqKioqLyBcXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcXG4vKioqKioqLyB9KVxcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqKioqKi8gKFtcXG4vKiAwICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XFxuXFxudmFyIHRyYW5zZmVyYWJsZU1lc3NhZ2UgPSBzZWxmLndlYmtpdFBvc3RNZXNzYWdlIHx8IHNlbGYucG9zdE1lc3NhZ2UsXFxuXFxuXFxuLy8gZW51bVxcbk1FU1NBR0VfVFlQRVMgPSB7XFxuICBXT1JMRFJFUE9SVDogMCxcXG4gIENPTExJU0lPTlJFUE9SVDogMSxcXG4gIFZFSElDTEVSRVBPUlQ6IDIsXFxuICBDT05TVFJBSU5UUkVQT1JUOiAzLFxcbiAgU09GVFJFUE9SVDogNFxcbn07XFxuXFxuLy8gdGVtcCB2YXJpYWJsZXNcXG52YXIgX29iamVjdCA9IHZvaWQgMCxcXG4gICAgX3ZlY3RvciA9IHZvaWQgMCxcXG4gICAgX3RyYW5zZm9ybSA9IHZvaWQgMCxcXG4gICAgX3RyYW5zZm9ybV9wb3MgPSB2b2lkIDAsXFxuICAgIF9zb2Z0Ym9keV9lbmFibGVkID0gZmFsc2UsXFxuICAgIGxhc3Rfc2ltdWxhdGlvbl9kdXJhdGlvbiA9IDAsXFxuICAgIF9udW1fb2JqZWN0cyA9IDAsXFxuICAgIF9udW1fcmlnaWRib2R5X29iamVjdHMgPSAwLFxcbiAgICBfbnVtX3NvZnRib2R5X29iamVjdHMgPSAwLFxcbiAgICBfbnVtX3doZWVscyA9IDAsXFxuICAgIF9udW1fY29uc3RyYWludHMgPSAwLFxcbiAgICBfc29mdGJvZHlfcmVwb3J0X3NpemUgPSAwLFxcblxcblxcbi8vIHdvcmxkIHZhcmlhYmxlc1xcbmZpeGVkVGltZVN0ZXAgPSB2b2lkIDAsXFxuICAgIC8vIHVzZWQgd2hlbiBjYWxsaW5nIHN0ZXBTaW11bGF0aW9uXFxubGFzdF9zaW11bGF0aW9uX3RpbWUgPSB2b2lkIDAsXFxuICAgIHdvcmxkID0gdm9pZCAwLFxcbiAgICBfdmVjM18xID0gdm9pZCAwLFxcbiAgICBfdmVjM18yID0gdm9pZCAwLFxcbiAgICBfdmVjM18zID0gdm9pZCAwLFxcbiAgICBfcXVhdCA9IHZvaWQgMDtcXG5cXG4vLyBwcml2YXRlIGNhY2hlXFxudmFyIHB1YmxpY19mdW5jdGlvbnMgPSB7fSxcXG4gICAgX29iamVjdHMgPSBbXSxcXG4gICAgX3ZlaGljbGVzID0gW10sXFxuICAgIF9jb25zdHJhaW50cyA9IFtdLFxcbiAgICBfb2JqZWN0c19hbW1vID0ge30sXFxuICAgIF9vYmplY3Rfc2hhcGVzID0ge30sXFxuXFxuXFxuLy8gVGhlIGZvbGxvd2luZyBvYmplY3RzIGFyZSB0byB0cmFjayBvYmplY3RzIHRoYXQgYW1tby5qcyBkb2Vzbid0IGNsZWFuXFxuLy8gdXAuIEFsbCBhcmUgY2xlYW5lZCB1cCB3aGVuIHRoZXkncmUgY29ycmVzcG9uZGluZyBib2R5IGlzIGRlc3Ryb3llZC5cXG4vLyBVbmZvcnR1bmF0ZWx5LCBpdCdzIHZlcnkgZGlmZmljdWx0IHRvIGdldCBhdCB0aGVzZSBvYmplY3RzIGZyb20gdGhlXFxuLy8gYm9keSwgc28gd2UgaGF2ZSB0byB0cmFjayB0aGVtIG91cnNlbHZlcy5cXG5fbW90aW9uX3N0YXRlcyA9IHt9LFxcblxcbi8vIERvbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgaXQgZm9yIGNhY2hlZCBzaGFwZXMuXFxuX25vbmNhY2hlZF9zaGFwZXMgPSB7fSxcXG5cXG4vLyBBIGJvZHkgd2l0aCBhIGNvbXBvdW5kIHNoYXBlIGFsd2F5cyBoYXMgYSByZWd1bGFyIHNoYXBlIGFzIHdlbGwsIHNvIHdlXFxuLy8gaGF2ZSB0cmFjayB0aGVtIHNlcGFyYXRlbHkuXFxuX2NvbXBvdW5kX3NoYXBlcyA9IHt9O1xcblxcbi8vIG9iamVjdCByZXBvcnRpbmdcXG52YXIgUkVQT1JUX0NIVU5LU0laRSA9IHZvaWQgMCxcXG4gICAgLy8gcmVwb3J0IGFycmF5IGlzIGluY3JlYXNlZCBpbiBpbmNyZW1lbnRzIG9mIHRoaXMgY2h1bmsgc2l6ZVxcbndvcmxkcmVwb3J0ID0gdm9pZCAwLFxcbiAgICBzb2Z0cmVwb3J0ID0gdm9pZCAwLFxcbiAgICBjb2xsaXNpb25yZXBvcnQgPSB2b2lkIDAsXFxuICAgIHZlaGljbGVyZXBvcnQgPSB2b2lkIDAsXFxuICAgIGNvbnN0cmFpbnRyZXBvcnQgPSB2b2lkIDA7XFxuXFxudmFyIFdPUkxEUkVQT1JUX0lURU1TSVpFID0gMTQsXFxuICAgIC8vIGhvdyBtYW55IGZsb2F0IHZhbHVlcyBlYWNoIHJlcG9ydGVkIGl0ZW0gbmVlZHNcXG5DT0xMSVNJT05SRVBPUlRfSVRFTVNJWkUgPSA1LFxcbiAgICAvLyBvbmUgZmxvYXQgZm9yIGVhY2ggb2JqZWN0IGlkLCBhbmQgYSBWZWMzIGNvbnRhY3Qgbm9ybWFsXFxuVkVISUNMRVJFUE9SVF9JVEVNU0laRSA9IDksXFxuICAgIC8vIHZlaGljbGUgaWQsIHdoZWVsIGluZGV4LCAzIGZvciBwb3NpdGlvbiwgNCBmb3Igcm90YXRpb25cXG5DT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFID0gNjsgLy8gY29uc3RyYWludCBpZCwgb2Zmc2V0IG9iamVjdCwgb2Zmc2V0LCBhcHBsaWVkIGltcHVsc2VcXG5cXG52YXIgYWIgPSBuZXcgQXJyYXlCdWZmZXIoMSk7XFxuXFxudHJhbnNmZXJhYmxlTWVzc2FnZShhYiwgW2FiXSk7XFxudmFyIFNVUFBPUlRfVFJBTlNGRVJBQkxFID0gYWIuYnl0ZUxlbmd0aCA9PT0gMDtcXG5cXG52YXIgZ2V0U2hhcGVGcm9tQ2FjaGUgPSBmdW5jdGlvbiBnZXRTaGFwZUZyb21DYWNoZShjYWNoZV9rZXkpIHtcXG4gIGlmIChfb2JqZWN0X3NoYXBlc1tjYWNoZV9rZXldICE9PSB1bmRlZmluZWQpIHJldHVybiBfb2JqZWN0X3NoYXBlc1tjYWNoZV9rZXldO1xcblxcbiAgcmV0dXJuIG51bGw7XFxufTtcXG5cXG52YXIgc2V0U2hhcGVDYWNoZSA9IGZ1bmN0aW9uIHNldFNoYXBlQ2FjaGUoY2FjaGVfa2V5LCBzaGFwZSkge1xcbiAgX29iamVjdF9zaGFwZXNbY2FjaGVfa2V5XSA9IHNoYXBlO1xcbn07XFxuXFxudmFyIGNyZWF0ZVNoYXBlID0gZnVuY3Rpb24gY3JlYXRlU2hhcGUoZGVzY3JpcHRpb24pIHtcXG4gIHZhciBzaGFwZSA9IHZvaWQgMDtcXG5cXG4gIF90cmFuc2Zvcm0uc2V0SWRlbnRpdHkoKTtcXG4gIHN3aXRjaCAoZGVzY3JpcHRpb24udHlwZSkge1xcbiAgICBjYXNlICdjb21wb3VuZCc6XFxuICAgICAge1xcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idENvbXBvdW5kU2hhcGUoKTtcXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAncGxhbmUnOlxcbiAgICAgIHtcXG4gICAgICAgIHZhciBjYWNoZV9rZXkgPSAncGxhbmVfJyArIGRlc2NyaXB0aW9uLm5vcm1hbC54ICsgJ18nICsgZGVzY3JpcHRpb24ubm9ybWFsLnkgKyAnXycgKyBkZXNjcmlwdGlvbi5ub3JtYWwuejtcXG5cXG4gICAgICAgIGlmICgoc2hhcGUgPSBnZXRTaGFwZUZyb21DYWNoZShjYWNoZV9rZXkpKSA9PT0gbnVsbCkge1xcbiAgICAgICAgICBfdmVjM18xLnNldFgoZGVzY3JpcHRpb24ubm9ybWFsLngpO1xcbiAgICAgICAgICBfdmVjM18xLnNldFkoZGVzY3JpcHRpb24ubm9ybWFsLnkpO1xcbiAgICAgICAgICBfdmVjM18xLnNldFooZGVzY3JpcHRpb24ubm9ybWFsLnopO1xcbiAgICAgICAgICBzaGFwZSA9IG5ldyBBbW1vLmJ0U3RhdGljUGxhbmVTaGFwZShfdmVjM18xLCAwKTtcXG4gICAgICAgICAgc2V0U2hhcGVDYWNoZShjYWNoZV9rZXksIHNoYXBlKTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAnYm94JzpcXG4gICAgICB7XFxuICAgICAgICB2YXIgX2NhY2hlX2tleSA9ICdib3hfJyArIGRlc2NyaXB0aW9uLndpZHRoICsgJ18nICsgZGVzY3JpcHRpb24uaGVpZ2h0ICsgJ18nICsgZGVzY3JpcHRpb24uZGVwdGg7XFxuXFxuICAgICAgICBpZiAoKHNoYXBlID0gZ2V0U2hhcGVGcm9tQ2FjaGUoX2NhY2hlX2tleSkpID09PSBudWxsKSB7XFxuICAgICAgICAgIF92ZWMzXzEuc2V0WChkZXNjcmlwdGlvbi53aWR0aCAvIDIpO1xcbiAgICAgICAgICBfdmVjM18xLnNldFkoZGVzY3JpcHRpb24uaGVpZ2h0IC8gMik7XFxuICAgICAgICAgIF92ZWMzXzEuc2V0WihkZXNjcmlwdGlvbi5kZXB0aCAvIDIpO1xcbiAgICAgICAgICBzaGFwZSA9IG5ldyBBbW1vLmJ0Qm94U2hhcGUoX3ZlYzNfMSk7XFxuICAgICAgICAgIHNldFNoYXBlQ2FjaGUoX2NhY2hlX2tleSwgc2hhcGUpO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgYnJlYWs7XFxuICAgICAgfVxcbiAgICBjYXNlICdzcGhlcmUnOlxcbiAgICAgIHtcXG4gICAgICAgIHZhciBfY2FjaGVfa2V5MiA9ICdzcGhlcmVfJyArIGRlc2NyaXB0aW9uLnJhZGl1cztcXG5cXG4gICAgICAgIGlmICgoc2hhcGUgPSBnZXRTaGFwZUZyb21DYWNoZShfY2FjaGVfa2V5MikpID09PSBudWxsKSB7XFxuICAgICAgICAgIHNoYXBlID0gbmV3IEFtbW8uYnRTcGhlcmVTaGFwZShkZXNjcmlwdGlvbi5yYWRpdXMpO1xcbiAgICAgICAgICBzZXRTaGFwZUNhY2hlKF9jYWNoZV9rZXkyLCBzaGFwZSk7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBicmVhaztcXG4gICAgICB9XFxuICAgIGNhc2UgJ2N5bGluZGVyJzpcXG4gICAgICB7XFxuICAgICAgICB2YXIgX2NhY2hlX2tleTMgPSAnY3lsaW5kZXJfJyArIGRlc2NyaXB0aW9uLndpZHRoICsgJ18nICsgZGVzY3JpcHRpb24uaGVpZ2h0ICsgJ18nICsgZGVzY3JpcHRpb24uZGVwdGg7XFxuXFxuICAgICAgICBpZiAoKHNoYXBlID0gZ2V0U2hhcGVGcm9tQ2FjaGUoX2NhY2hlX2tleTMpKSA9PT0gbnVsbCkge1xcbiAgICAgICAgICBfdmVjM18xLnNldFgoZGVzY3JpcHRpb24ud2lkdGggLyAyKTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRZKGRlc2NyaXB0aW9uLmhlaWdodCAvIDIpO1xcbiAgICAgICAgICBfdmVjM18xLnNldFooZGVzY3JpcHRpb24uZGVwdGggLyAyKTtcXG4gICAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idEN5bGluZGVyU2hhcGUoX3ZlYzNfMSk7XFxuICAgICAgICAgIHNldFNoYXBlQ2FjaGUoX2NhY2hlX2tleTMsIHNoYXBlKTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAnY2Fwc3VsZSc6XFxuICAgICAge1xcbiAgICAgICAgdmFyIF9jYWNoZV9rZXk0ID0gJ2NhcHN1bGVfJyArIGRlc2NyaXB0aW9uLnJhZGl1cyArICdfJyArIGRlc2NyaXB0aW9uLmhlaWdodDtcXG5cXG4gICAgICAgIGlmICgoc2hhcGUgPSBnZXRTaGFwZUZyb21DYWNoZShfY2FjaGVfa2V5NCkpID09PSBudWxsKSB7XFxuICAgICAgICAgIC8vIEluIEJ1bGxldCwgY2Fwc3VsZSBoZWlnaHQgZXhjbHVkZXMgdGhlIGVuZCBzcGhlcmVzXFxuICAgICAgICAgIHNoYXBlID0gbmV3IEFtbW8uYnRDYXBzdWxlU2hhcGUoZGVzY3JpcHRpb24ucmFkaXVzLCBkZXNjcmlwdGlvbi5oZWlnaHQgLSAyICogZGVzY3JpcHRpb24ucmFkaXVzKTtcXG4gICAgICAgICAgc2V0U2hhcGVDYWNoZShfY2FjaGVfa2V5NCwgc2hhcGUpO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgYnJlYWs7XFxuICAgICAgfVxcbiAgICBjYXNlICdjb25lJzpcXG4gICAgICB7XFxuICAgICAgICB2YXIgX2NhY2hlX2tleTUgPSAnY29uZV8nICsgZGVzY3JpcHRpb24ucmFkaXVzICsgJ18nICsgZGVzY3JpcHRpb24uaGVpZ2h0O1xcblxcbiAgICAgICAgaWYgKChzaGFwZSA9IGdldFNoYXBlRnJvbUNhY2hlKF9jYWNoZV9rZXk1KSkgPT09IG51bGwpIHtcXG4gICAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idENvbmVTaGFwZShkZXNjcmlwdGlvbi5yYWRpdXMsIGRlc2NyaXB0aW9uLmhlaWdodCk7XFxuICAgICAgICAgIHNldFNoYXBlQ2FjaGUoX2NhY2hlX2tleTUsIHNoYXBlKTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAnY29uY2F2ZSc6XFxuICAgICAge1xcbiAgICAgICAgdmFyIHRyaWFuZ2xlX21lc2ggPSBuZXcgQW1tby5idFRyaWFuZ2xlTWVzaCgpO1xcbiAgICAgICAgaWYgKCFkZXNjcmlwdGlvbi5kYXRhLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xcbiAgICAgICAgdmFyIGRhdGEgPSBkZXNjcmlwdGlvbi5kYXRhO1xcblxcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aCAvIDk7IGkrKykge1xcbiAgICAgICAgICBfdmVjM18xLnNldFgoZGF0YVtpICogOV0pO1xcbiAgICAgICAgICBfdmVjM18xLnNldFkoZGF0YVtpICogOSArIDFdKTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRaKGRhdGFbaSAqIDkgKyAyXSk7XFxuXFxuICAgICAgICAgIF92ZWMzXzIuc2V0WChkYXRhW2kgKiA5ICsgM10pO1xcbiAgICAgICAgICBfdmVjM18yLnNldFkoZGF0YVtpICogOSArIDRdKTtcXG4gICAgICAgICAgX3ZlYzNfMi5zZXRaKGRhdGFbaSAqIDkgKyA1XSk7XFxuXFxuICAgICAgICAgIF92ZWMzXzMuc2V0WChkYXRhW2kgKiA5ICsgNl0pO1xcbiAgICAgICAgICBfdmVjM18zLnNldFkoZGF0YVtpICogOSArIDddKTtcXG4gICAgICAgICAgX3ZlYzNfMy5zZXRaKGRhdGFbaSAqIDkgKyA4XSk7XFxuXFxuICAgICAgICAgIHRyaWFuZ2xlX21lc2guYWRkVHJpYW5nbGUoX3ZlYzNfMSwgX3ZlYzNfMiwgX3ZlYzNfMywgZmFsc2UpO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idEJ2aFRyaWFuZ2xlTWVzaFNoYXBlKHRyaWFuZ2xlX21lc2gsIHRydWUsIHRydWUpO1xcblxcbiAgICAgICAgX25vbmNhY2hlZF9zaGFwZXNbZGVzY3JpcHRpb24uaWRdID0gc2hhcGU7XFxuXFxuICAgICAgICBicmVhaztcXG4gICAgICB9XFxuICAgIGNhc2UgJ2NvbnZleCc6XFxuICAgICAge1xcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idENvbnZleEh1bGxTaGFwZSgpO1xcbiAgICAgICAgdmFyIF9kYXRhID0gZGVzY3JpcHRpb24uZGF0YTtcXG5cXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBfZGF0YS5sZW5ndGggLyAzOyBfaSsrKSB7XFxuICAgICAgICAgIF92ZWMzXzEuc2V0WChfZGF0YVtfaSAqIDNdKTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRZKF9kYXRhW19pICogMyArIDFdKTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRaKF9kYXRhW19pICogMyArIDJdKTtcXG5cXG4gICAgICAgICAgc2hhcGUuYWRkUG9pbnQoX3ZlYzNfMSk7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBfbm9uY2FjaGVkX3NoYXBlc1tkZXNjcmlwdGlvbi5pZF0gPSBzaGFwZTtcXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAnaGVpZ2h0ZmllbGQnOlxcbiAgICAgIHtcXG4gICAgICAgIHZhciB4cHRzID0gZGVzY3JpcHRpb24ueHB0cyxcXG4gICAgICAgICAgICB5cHRzID0gZGVzY3JpcHRpb24ueXB0cyxcXG4gICAgICAgICAgICBwb2ludHMgPSBkZXNjcmlwdGlvbi5wb2ludHMsXFxuICAgICAgICAgICAgcHRyID0gQW1tby5fbWFsbG9jKDQgKiB4cHRzICogeXB0cyk7XFxuXFxuICAgICAgICBmb3IgKHZhciBfaTIgPSAwLCBwID0gMCwgcDIgPSAwOyBfaTIgPCB4cHRzOyBfaTIrKykge1xcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHlwdHM7IGorKykge1xcbiAgICAgICAgICAgIEFtbW8uSEVBUEYzMltwdHIgKyBwMiA+PiAyXSA9IHBvaW50c1twXTtcXG5cXG4gICAgICAgICAgICBwKys7XFxuICAgICAgICAgICAgcDIgKz0gNDtcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcblxcbiAgICAgICAgc2hhcGUgPSBuZXcgQW1tby5idEhlaWdodGZpZWxkVGVycmFpblNoYXBlKGRlc2NyaXB0aW9uLnhwdHMsIGRlc2NyaXB0aW9uLnlwdHMsIHB0ciwgMSwgLWRlc2NyaXB0aW9uLmFic01heEhlaWdodCwgZGVzY3JpcHRpb24uYWJzTWF4SGVpZ2h0LCAxLCAnUEhZX0ZMT0FUJywgZmFsc2UpO1xcblxcbiAgICAgICAgX25vbmNhY2hlZF9zaGFwZXNbZGVzY3JpcHRpb24uaWRdID0gc2hhcGU7XFxuICAgICAgICBicmVhaztcXG4gICAgICB9XFxuICAgIGRlZmF1bHQ6XFxuICAgICAgLy8gTm90IHJlY29nbml6ZWRcXG4gICAgICByZXR1cm47XFxuICB9XFxuXFxuICByZXR1cm4gc2hhcGU7XFxufTtcXG5cXG52YXIgY3JlYXRlU29mdEJvZHkgPSBmdW5jdGlvbiBjcmVhdGVTb2Z0Qm9keShkZXNjcmlwdGlvbikge1xcbiAgdmFyIGJvZHkgPSB2b2lkIDA7XFxuXFxuICB2YXIgc29mdEJvZHlIZWxwZXJzID0gbmV3IEFtbW8uYnRTb2Z0Qm9keUhlbHBlcnMoKTtcXG5cXG4gIHN3aXRjaCAoZGVzY3JpcHRpb24udHlwZSkge1xcbiAgICBjYXNlICdzb2Z0VHJpbWVzaCc6XFxuICAgICAge1xcbiAgICAgICAgaWYgKCFkZXNjcmlwdGlvbi5hVmVydGljZXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XFxuXFxuICAgICAgICBib2R5ID0gc29mdEJvZHlIZWxwZXJzLkNyZWF0ZUZyb21UcmlNZXNoKHdvcmxkLmdldFdvcmxkSW5mbygpLCBkZXNjcmlwdGlvbi5hVmVydGljZXMsIGRlc2NyaXB0aW9uLmFJbmRpY2VzLCBkZXNjcmlwdGlvbi5hSW5kaWNlcy5sZW5ndGggLyAzLCBmYWxzZSk7XFxuXFxuICAgICAgICBicmVhaztcXG4gICAgICB9XFxuICAgIGNhc2UgJ3NvZnRDbG90aE1lc2gnOlxcbiAgICAgIHtcXG4gICAgICAgIHZhciBjciA9IGRlc2NyaXB0aW9uLmNvcm5lcnM7XFxuXFxuICAgICAgICBib2R5ID0gc29mdEJvZHlIZWxwZXJzLkNyZWF0ZVBhdGNoKHdvcmxkLmdldFdvcmxkSW5mbygpLCBuZXcgQW1tby5idFZlY3RvcjMoY3JbMF0sIGNyWzFdLCBjclsyXSksIG5ldyBBbW1vLmJ0VmVjdG9yMyhjclszXSwgY3JbNF0sIGNyWzVdKSwgbmV3IEFtbW8uYnRWZWN0b3IzKGNyWzZdLCBjcls3XSwgY3JbOF0pLCBuZXcgQW1tby5idFZlY3RvcjMoY3JbOV0sIGNyWzEwXSwgY3JbMTFdKSwgZGVzY3JpcHRpb24uc2VnbWVudHNbMF0sIGRlc2NyaXB0aW9uLnNlZ21lbnRzWzFdLCAwLCB0cnVlKTtcXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAnc29mdFJvcGVNZXNoJzpcXG4gICAgICB7XFxuICAgICAgICB2YXIgZGF0YSA9IGRlc2NyaXB0aW9uLmRhdGE7XFxuXFxuICAgICAgICBib2R5ID0gc29mdEJvZHlIZWxwZXJzLkNyZWF0ZVJvcGUod29ybGQuZ2V0V29ybGRJbmZvKCksIG5ldyBBbW1vLmJ0VmVjdG9yMyhkYXRhWzBdLCBkYXRhWzFdLCBkYXRhWzJdKSwgbmV3IEFtbW8uYnRWZWN0b3IzKGRhdGFbM10sIGRhdGFbNF0sIGRhdGFbNV0pLCBkYXRhWzZdIC0gMSwgMCk7XFxuXFxuICAgICAgICBicmVhaztcXG4gICAgICB9XFxuICAgIGRlZmF1bHQ6XFxuICAgICAgLy8gTm90IHJlY29nbml6ZWRcXG4gICAgICByZXR1cm47XFxuICB9XFxuXFxuICByZXR1cm4gYm9keTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcXG4gIHZhciBwYXJhbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xcblxcbiAgaWYgKHBhcmFtcy53YXNtQnVmZmVyKSB7XFxuICAgIGltcG9ydFNjcmlwdHMocGFyYW1zLmFtbW8pO1xcblxcbiAgICBzZWxmLkFtbW8gPSBsb2FkQW1tb0Zyb21CaW5hcnkocGFyYW1zLndhc21CdWZmZXIpO1xcbiAgICB0cmFuc2ZlcmFibGVNZXNzYWdlKHsgY21kOiAnYW1tb0xvYWRlZCcgfSk7XFxuICAgIHB1YmxpY19mdW5jdGlvbnMubWFrZVdvcmxkKHBhcmFtcyk7XFxuICB9IGVsc2Uge1xcbiAgICBpbXBvcnRTY3JpcHRzKHBhcmFtcy5hbW1vKTtcXG4gICAgdHJhbnNmZXJhYmxlTWVzc2FnZSh7IGNtZDogJ2FtbW9Mb2FkZWQnIH0pO1xcbiAgICBwdWJsaWNfZnVuY3Rpb25zLm1ha2VXb3JsZChwYXJhbXMpO1xcbiAgfVxcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5tYWtlV29ybGQgPSBmdW5jdGlvbiAoKSB7XFxuICB2YXIgcGFyYW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcXG5cXG4gIF90cmFuc2Zvcm0gPSBuZXcgQW1tby5idFRyYW5zZm9ybSgpO1xcbiAgX3RyYW5zZm9ybV9wb3MgPSBuZXcgQW1tby5idFRyYW5zZm9ybSgpO1xcbiAgX3ZlYzNfMSA9IG5ldyBBbW1vLmJ0VmVjdG9yMygwLCAwLCAwKTtcXG4gIF92ZWMzXzIgPSBuZXcgQW1tby5idFZlY3RvcjMoMCwgMCwgMCk7XFxuICBfdmVjM18zID0gbmV3IEFtbW8uYnRWZWN0b3IzKDAsIDAsIDApO1xcbiAgX3F1YXQgPSBuZXcgQW1tby5idFF1YXRlcm5pb24oMCwgMCwgMCwgMCk7XFxuXFxuICBSRVBPUlRfQ0hVTktTSVpFID0gcGFyYW1zLnJlcG9ydHNpemUgfHwgNTA7XFxuXFxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHtcXG4gICAgLy8gVHJhbnNmZXJhYmxlIG1lc3NhZ2VzIGFyZSBzdXBwb3J0ZWQsIHRha2UgYWR2YW50YWdlIG9mIHRoZW0gd2l0aCBUeXBlZEFycmF5c1xcbiAgICB3b3JsZHJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMiArIFJFUE9SVF9DSFVOS1NJWkUgKiBXT1JMRFJFUE9SVF9JVEVNU0laRSk7IC8vIG1lc3NhZ2UgaWQgKyAjIG9mIG9iamVjdHMgdG8gcmVwb3J0ICsgY2h1bmsgc2l6ZSAqICMgb2YgdmFsdWVzIHBlciBvYmplY3RcXG4gICAgY29sbGlzaW9ucmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheSgyICsgUkVQT1JUX0NIVU5LU0laRSAqIENPTExJU0lPTlJFUE9SVF9JVEVNU0laRSk7IC8vIG1lc3NhZ2UgaWQgKyAjIG9mIGNvbGxpc2lvbnMgdG8gcmVwb3J0ICsgY2h1bmsgc2l6ZSAqICMgb2YgdmFsdWVzIHBlciBvYmplY3RcXG4gICAgdmVoaWNsZXJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMiArIFJFUE9SVF9DSFVOS1NJWkUgKiBWRUhJQ0xFUkVQT1JUX0lURU1TSVpFKTsgLy8gbWVzc2FnZSBpZCArICMgb2YgdmVoaWNsZXMgdG8gcmVwb3J0ICsgY2h1bmsgc2l6ZSAqICMgb2YgdmFsdWVzIHBlciBvYmplY3RcXG4gICAgY29uc3RyYWludHJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMiArIFJFUE9SVF9DSFVOS1NJWkUgKiBDT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFKTsgLy8gbWVzc2FnZSBpZCArICMgb2YgY29uc3RyYWludHMgdG8gcmVwb3J0ICsgY2h1bmsgc2l6ZSAqICMgb2YgdmFsdWVzIHBlciBvYmplY3RcXG4gIH0gZWxzZSB7XFxuICAgIC8vIFRyYW5zZmVyYWJsZSBtZXNzYWdlcyBhcmUgbm90IHN1cHBvcnRlZCwgc2VuZCBkYXRhIGFzIG5vcm1hbCBhcnJheXNcXG4gICAgd29ybGRyZXBvcnQgPSBbXTtcXG4gICAgY29sbGlzaW9ucmVwb3J0ID0gW107XFxuICAgIHZlaGljbGVyZXBvcnQgPSBbXTtcXG4gICAgY29uc3RyYWludHJlcG9ydCA9IFtdO1xcbiAgfVxcblxcbiAgd29ybGRyZXBvcnRbMF0gPSBNRVNTQUdFX1RZUEVTLldPUkxEUkVQT1JUO1xcbiAgY29sbGlzaW9ucmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5DT0xMSVNJT05SRVBPUlQ7XFxuICB2ZWhpY2xlcmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5WRUhJQ0xFUkVQT1JUO1xcbiAgY29uc3RyYWludHJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuQ09OU1RSQUlOVFJFUE9SVDtcXG5cXG4gIHZhciBjb2xsaXNpb25Db25maWd1cmF0aW9uID0gcGFyYW1zLnNvZnRib2R5ID8gbmV3IEFtbW8uYnRTb2Z0Qm9keVJpZ2lkQm9keUNvbGxpc2lvbkNvbmZpZ3VyYXRpb24oKSA6IG5ldyBBbW1vLmJ0RGVmYXVsdENvbGxpc2lvbkNvbmZpZ3VyYXRpb24oKSxcXG4gICAgICBkaXNwYXRjaGVyID0gbmV3IEFtbW8uYnRDb2xsaXNpb25EaXNwYXRjaGVyKGNvbGxpc2lvbkNvbmZpZ3VyYXRpb24pLFxcbiAgICAgIHNvbHZlciA9IG5ldyBBbW1vLmJ0U2VxdWVudGlhbEltcHVsc2VDb25zdHJhaW50U29sdmVyKCk7XFxuXFxuICB2YXIgYnJvYWRwaGFzZSA9IHZvaWQgMDtcXG5cXG4gIGlmICghcGFyYW1zLmJyb2FkcGhhc2UpIHBhcmFtcy5icm9hZHBoYXNlID0geyB0eXBlOiAnZHluYW1pYycgfTtcXG4gIC8vIFRPRE8hISFcXG4gIC8qIGlmIChwYXJhbXMuYnJvYWRwaGFzZS50eXBlID09PSAnc3dlZXBwcnVuZScpIHtcXG4gICAgZXh0ZW5kKHBhcmFtcy5icm9hZHBoYXNlLCB7XFxuICAgICAgYWFiYm1pbjoge1xcbiAgICAgICAgeDogLTUwLFxcbiAgICAgICAgeTogLTUwLFxcbiAgICAgICAgejogLTUwXFxuICAgICAgfSxcXG4gICAgICAgYWFiYm1heDoge1xcbiAgICAgICAgeDogNTAsXFxuICAgICAgICB5OiA1MCxcXG4gICAgICAgIHo6IDUwXFxuICAgICAgfSxcXG4gICAgfSk7XFxuICB9Ki9cXG5cXG4gIHN3aXRjaCAocGFyYW1zLmJyb2FkcGhhc2UudHlwZSkge1xcbiAgICBjYXNlICdzd2VlcHBydW5lJzpcXG4gICAgICBfdmVjM18xLnNldFgocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1pbi54KTtcXG4gICAgICBfdmVjM18xLnNldFkocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1pbi55KTtcXG4gICAgICBfdmVjM18xLnNldFoocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1pbi56KTtcXG5cXG4gICAgICBfdmVjM18yLnNldFgocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1heC54KTtcXG4gICAgICBfdmVjM18yLnNldFkocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1heC55KTtcXG4gICAgICBfdmVjM18yLnNldFoocGFyYW1zLmJyb2FkcGhhc2UuYWFiYm1heC56KTtcXG5cXG4gICAgICBicm9hZHBoYXNlID0gbmV3IEFtbW8uYnRBeGlzU3dlZXAzKF92ZWMzXzEsIF92ZWMzXzIpO1xcblxcbiAgICAgIGJyZWFrO1xcbiAgICBjYXNlICdkeW5hbWljJzpcXG4gICAgZGVmYXVsdDpcXG4gICAgICBicm9hZHBoYXNlID0gbmV3IEFtbW8uYnREYnZ0QnJvYWRwaGFzZSgpO1xcbiAgICAgIGJyZWFrO1xcbiAgfVxcblxcbiAgd29ybGQgPSBwYXJhbXMuc29mdGJvZHkgPyBuZXcgQW1tby5idFNvZnRSaWdpZER5bmFtaWNzV29ybGQoZGlzcGF0Y2hlciwgYnJvYWRwaGFzZSwgc29sdmVyLCBjb2xsaXNpb25Db25maWd1cmF0aW9uLCBuZXcgQW1tby5idERlZmF1bHRTb2Z0Qm9keVNvbHZlcigpKSA6IG5ldyBBbW1vLmJ0RGlzY3JldGVEeW5hbWljc1dvcmxkKGRpc3BhdGNoZXIsIGJyb2FkcGhhc2UsIHNvbHZlciwgY29sbGlzaW9uQ29uZmlndXJhdGlvbik7XFxuICBmaXhlZFRpbWVTdGVwID0gcGFyYW1zLmZpeGVkVGltZVN0ZXA7XFxuXFxuICBpZiAocGFyYW1zLnNvZnRib2R5KSBfc29mdGJvZHlfZW5hYmxlZCA9IHRydWU7XFxuXFxuICB0cmFuc2ZlcmFibGVNZXNzYWdlKHsgY21kOiAnd29ybGRSZWFkeScgfSk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNldEZpeGVkVGltZVN0ZXAgPSBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcXG4gIGZpeGVkVGltZVN0ZXAgPSBkZXNjcmlwdGlvbjtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuc2V0R3Jhdml0eSA9IGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xcbiAgX3ZlYzNfMS5zZXRYKGRlc2NyaXB0aW9uLngpO1xcbiAgX3ZlYzNfMS5zZXRZKGRlc2NyaXB0aW9uLnkpO1xcbiAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLnopO1xcbiAgd29ybGQuc2V0R3Jhdml0eShfdmVjM18xKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuYXBwZW5kQW5jaG9yID0gZnVuY3Rpb24gKGRlc2NyaXB0aW9uKSB7XFxuICBfb2JqZWN0c1tkZXNjcmlwdGlvbi5vYmpdLmFwcGVuZEFuY2hvcihkZXNjcmlwdGlvbi5ub2RlLCBfb2JqZWN0c1tkZXNjcmlwdGlvbi5vYmoyXSwgZGVzY3JpcHRpb24uY29sbGlzaW9uQmV0d2VlbkxpbmtlZEJvZGllcywgZGVzY3JpcHRpb24uaW5mbHVlbmNlKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuYWRkT2JqZWN0ID0gZnVuY3Rpb24gKGRlc2NyaXB0aW9uKSB7XFxuICB2YXIgYm9keSA9IHZvaWQgMCxcXG4gICAgICBtb3Rpb25TdGF0ZSA9IHZvaWQgMDtcXG5cXG4gIGlmIChkZXNjcmlwdGlvbi50eXBlLmluZGV4T2YoJ3NvZnQnKSAhPT0gLTEpIHtcXG4gICAgYm9keSA9IGNyZWF0ZVNvZnRCb2R5KGRlc2NyaXB0aW9uKTtcXG5cXG4gICAgdmFyIHNiQ29uZmlnID0gYm9keS5nZXRfbV9jZmcoKTtcXG5cXG4gICAgaWYgKGRlc2NyaXB0aW9uLnZpdGVyYXRpb25zKSBzYkNvbmZpZy5zZXRfdml0ZXJhdGlvbnMoZGVzY3JpcHRpb24udml0ZXJhdGlvbnMpO1xcbiAgICBpZiAoZGVzY3JpcHRpb24ucGl0ZXJhdGlvbnMpIHNiQ29uZmlnLnNldF9waXRlcmF0aW9ucyhkZXNjcmlwdGlvbi5waXRlcmF0aW9ucyk7XFxuICAgIGlmIChkZXNjcmlwdGlvbi5kaXRlcmF0aW9ucykgc2JDb25maWcuc2V0X2RpdGVyYXRpb25zKGRlc2NyaXB0aW9uLmRpdGVyYXRpb25zKTtcXG4gICAgaWYgKGRlc2NyaXB0aW9uLmNpdGVyYXRpb25zKSBzYkNvbmZpZy5zZXRfY2l0ZXJhdGlvbnMoZGVzY3JpcHRpb24uY2l0ZXJhdGlvbnMpO1xcbiAgICBzYkNvbmZpZy5zZXRfY29sbGlzaW9ucygweDExKTtcXG4gICAgc2JDb25maWcuc2V0X2tERihkZXNjcmlwdGlvbi5mcmljdGlvbik7XFxuICAgIHNiQ29uZmlnLnNldF9rRFAoZGVzY3JpcHRpb24uZGFtcGluZyk7XFxuICAgIGlmIChkZXNjcmlwdGlvbi5wcmVzc3VyZSkgc2JDb25maWcuc2V0X2tQUihkZXNjcmlwdGlvbi5wcmVzc3VyZSk7XFxuICAgIGlmIChkZXNjcmlwdGlvbi5kcmFnKSBzYkNvbmZpZy5zZXRfa0RHKGRlc2NyaXB0aW9uLmRyYWcpO1xcbiAgICBpZiAoZGVzY3JpcHRpb24ubGlmdCkgc2JDb25maWcuc2V0X2tMRihkZXNjcmlwdGlvbi5saWZ0KTtcXG4gICAgaWYgKGRlc2NyaXB0aW9uLmFuY2hvckhhcmRuZXNzKSBzYkNvbmZpZy5zZXRfa0FIUihkZXNjcmlwdGlvbi5hbmNob3JIYXJkbmVzcyk7XFxuICAgIGlmIChkZXNjcmlwdGlvbi5yaWdpZEhhcmRuZXNzKSBzYkNvbmZpZy5zZXRfa0NIUihkZXNjcmlwdGlvbi5yaWdpZEhhcmRuZXNzKTtcXG5cXG4gICAgaWYgKGRlc2NyaXB0aW9uLmtsc3QpIGJvZHkuZ2V0X21fbWF0ZXJpYWxzKCkuYXQoMCkuc2V0X21fa0xTVChkZXNjcmlwdGlvbi5rbHN0KTtcXG4gICAgaWYgKGRlc2NyaXB0aW9uLmthc3QpIGJvZHkuZ2V0X21fbWF0ZXJpYWxzKCkuYXQoMCkuc2V0X21fa0FTVChkZXNjcmlwdGlvbi5rYXN0KTtcXG4gICAgaWYgKGRlc2NyaXB0aW9uLmt2c3QpIGJvZHkuZ2V0X21fbWF0ZXJpYWxzKCkuYXQoMCkuc2V0X21fa1ZTVChkZXNjcmlwdGlvbi5rdnN0KTtcXG5cXG4gICAgQW1tby5jYXN0T2JqZWN0KGJvZHksIEFtbW8uYnRDb2xsaXNpb25PYmplY3QpLmdldENvbGxpc2lvblNoYXBlKCkuc2V0TWFyZ2luKGRlc2NyaXB0aW9uLm1hcmdpbiA/IGRlc2NyaXB0aW9uLm1hcmdpbiA6IDAuMSk7XFxuICAgIGJvZHkuc2V0QWN0aXZhdGlvblN0YXRlKGRlc2NyaXB0aW9uLnN0YXRlIHx8IDQpO1xcbiAgICBib2R5LnR5cGUgPSAwOyAvLyBTb2Z0Qm9keS5cXG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdzb2Z0Um9wZU1lc2gnKSBib2R5LnJvcGUgPSB0cnVlO1xcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ3NvZnRDbG90aE1lc2gnKSBib2R5LmNsb3RoID0gdHJ1ZTtcXG5cXG4gICAgX3RyYW5zZm9ybS5zZXRJZGVudGl0eSgpO1xcblxcbiAgICBfdmVjM18xLnNldFgoZGVzY3JpcHRpb24ucG9zaXRpb24ueCk7XFxuICAgIF92ZWMzXzEuc2V0WShkZXNjcmlwdGlvbi5wb3NpdGlvbi55KTtcXG4gICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLnBvc2l0aW9uLnopO1xcbiAgICBfdHJhbnNmb3JtLnNldE9yaWdpbihfdmVjM18xKTtcXG5cXG4gICAgX3F1YXQuc2V0WChkZXNjcmlwdGlvbi5yb3RhdGlvbi54KTtcXG4gICAgX3F1YXQuc2V0WShkZXNjcmlwdGlvbi5yb3RhdGlvbi55KTtcXG4gICAgX3F1YXQuc2V0WihkZXNjcmlwdGlvbi5yb3RhdGlvbi56KTtcXG4gICAgX3F1YXQuc2V0VyhkZXNjcmlwdGlvbi5yb3RhdGlvbi53KTtcXG4gICAgX3RyYW5zZm9ybS5zZXRSb3RhdGlvbihfcXVhdCk7XFxuXFxuICAgIGJvZHkudHJhbnNmb3JtKF90cmFuc2Zvcm0pO1xcblxcbiAgICBib2R5LnNldFRvdGFsTWFzcyhkZXNjcmlwdGlvbi5tYXNzLCBmYWxzZSk7XFxuICAgIHdvcmxkLmFkZFNvZnRCb2R5KGJvZHksIDEsIC0xKTtcXG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdzb2Z0VHJpbWVzaCcpIF9zb2Z0Ym9keV9yZXBvcnRfc2l6ZSArPSBib2R5LmdldF9tX2ZhY2VzKCkuc2l6ZSgpICogMztlbHNlIF9zb2Z0Ym9keV9yZXBvcnRfc2l6ZSArPSBib2R5LmdldF9tX25vZGVzKCkuc2l6ZSgpICogMztcXG5cXG4gICAgX251bV9zb2Z0Ym9keV9vYmplY3RzKys7XFxuICB9IGVsc2Uge1xcbiAgICB2YXIgc2hhcGUgPSBjcmVhdGVTaGFwZShkZXNjcmlwdGlvbik7XFxuXFxuICAgIGlmICghc2hhcGUpIHJldHVybjtcXG5cXG4gICAgLy8gSWYgdGhlcmUgYXJlIGNoaWxkcmVuIHRoZW4gdGhpcyBpcyBhIGNvbXBvdW5kIHNoYXBlXFxuICAgIGlmIChkZXNjcmlwdGlvbi5jaGlsZHJlbikge1xcbiAgICAgIHZhciBjb21wb3VuZF9zaGFwZSA9IG5ldyBBbW1vLmJ0Q29tcG91bmRTaGFwZSgpO1xcbiAgICAgIGNvbXBvdW5kX3NoYXBlLmFkZENoaWxkU2hhcGUoX3RyYW5zZm9ybSwgc2hhcGUpO1xcblxcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVzY3JpcHRpb24uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcXG4gICAgICAgIHZhciBfY2hpbGQgPSBkZXNjcmlwdGlvbi5jaGlsZHJlbltpXTtcXG5cXG4gICAgICAgIHZhciB0cmFucyA9IG5ldyBBbW1vLmJ0VHJhbnNmb3JtKCk7XFxuICAgICAgICB0cmFucy5zZXRJZGVudGl0eSgpO1xcblxcbiAgICAgICAgX3ZlYzNfMS5zZXRYKF9jaGlsZC5wb3NpdGlvbl9vZmZzZXQueCk7XFxuICAgICAgICBfdmVjM18xLnNldFkoX2NoaWxkLnBvc2l0aW9uX29mZnNldC55KTtcXG4gICAgICAgIF92ZWMzXzEuc2V0WihfY2hpbGQucG9zaXRpb25fb2Zmc2V0LnopO1xcbiAgICAgICAgdHJhbnMuc2V0T3JpZ2luKF92ZWMzXzEpO1xcblxcbiAgICAgICAgX3F1YXQuc2V0WChfY2hpbGQucm90YXRpb24ueCk7XFxuICAgICAgICBfcXVhdC5zZXRZKF9jaGlsZC5yb3RhdGlvbi55KTtcXG4gICAgICAgIF9xdWF0LnNldFooX2NoaWxkLnJvdGF0aW9uLnopO1xcbiAgICAgICAgX3F1YXQuc2V0VyhfY2hpbGQucm90YXRpb24udyk7XFxuICAgICAgICB0cmFucy5zZXRSb3RhdGlvbihfcXVhdCk7XFxuXFxuICAgICAgICBzaGFwZSA9IGNyZWF0ZVNoYXBlKGRlc2NyaXB0aW9uLmNoaWxkcmVuW2ldKTtcXG4gICAgICAgIGNvbXBvdW5kX3NoYXBlLmFkZENoaWxkU2hhcGUodHJhbnMsIHNoYXBlKTtcXG4gICAgICAgIEFtbW8uZGVzdHJveSh0cmFucyk7XFxuICAgICAgfVxcblxcbiAgICAgIHNoYXBlID0gY29tcG91bmRfc2hhcGU7XFxuICAgICAgX2NvbXBvdW5kX3NoYXBlc1tkZXNjcmlwdGlvbi5pZF0gPSBzaGFwZTtcXG4gICAgfVxcblxcbiAgICBfdmVjM18xLnNldFgoZGVzY3JpcHRpb24uc2NhbGUueCk7XFxuICAgIF92ZWMzXzEuc2V0WShkZXNjcmlwdGlvbi5zY2FsZS55KTtcXG4gICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLnNjYWxlLnopO1xcblxcbiAgICBzaGFwZS5zZXRMb2NhbFNjYWxpbmcoX3ZlYzNfMSk7XFxuXFxuICAgIF92ZWMzXzEuc2V0WCgwKTtcXG4gICAgX3ZlYzNfMS5zZXRZKDApO1xcbiAgICBfdmVjM18xLnNldFooMCk7XFxuICAgIHNoYXBlLmNhbGN1bGF0ZUxvY2FsSW5lcnRpYShkZXNjcmlwdGlvbi5tYXNzLCBfdmVjM18xKTtcXG5cXG4gICAgX3RyYW5zZm9ybS5zZXRJZGVudGl0eSgpO1xcblxcbiAgICBfdmVjM18yLnNldFgoZGVzY3JpcHRpb24ucG9zaXRpb24ueCk7XFxuICAgIF92ZWMzXzIuc2V0WShkZXNjcmlwdGlvbi5wb3NpdGlvbi55KTtcXG4gICAgX3ZlYzNfMi5zZXRaKGRlc2NyaXB0aW9uLnBvc2l0aW9uLnopO1xcbiAgICBfdHJhbnNmb3JtLnNldE9yaWdpbihfdmVjM18yKTtcXG5cXG4gICAgX3F1YXQuc2V0WChkZXNjcmlwdGlvbi5yb3RhdGlvbi54KTtcXG4gICAgX3F1YXQuc2V0WShkZXNjcmlwdGlvbi5yb3RhdGlvbi55KTtcXG4gICAgX3F1YXQuc2V0WihkZXNjcmlwdGlvbi5yb3RhdGlvbi56KTtcXG4gICAgX3F1YXQuc2V0VyhkZXNjcmlwdGlvbi5yb3RhdGlvbi53KTtcXG4gICAgX3RyYW5zZm9ybS5zZXRSb3RhdGlvbihfcXVhdCk7XFxuXFxuICAgIG1vdGlvblN0YXRlID0gbmV3IEFtbW8uYnREZWZhdWx0TW90aW9uU3RhdGUoX3RyYW5zZm9ybSk7IC8vICNUT0RPOiBidERlZmF1bHRNb3Rpb25TdGF0ZSBzdXBwb3J0cyBjZW50ZXIgb2YgbWFzcyBvZmZzZXQgYXMgc2Vjb25kIGFyZ3VtZW50IC0gaW1wbGVtZW50XFxuICAgIHZhciByYkluZm8gPSBuZXcgQW1tby5idFJpZ2lkQm9keUNvbnN0cnVjdGlvbkluZm8oZGVzY3JpcHRpb24ubWFzcywgbW90aW9uU3RhdGUsIHNoYXBlLCBfdmVjM18xKTtcXG5cXG4gICAgcmJJbmZvLnNldF9tX2ZyaWN0aW9uKGRlc2NyaXB0aW9uLmZyaWN0aW9uKTtcXG4gICAgcmJJbmZvLnNldF9tX3Jlc3RpdHV0aW9uKGRlc2NyaXB0aW9uLnJlc3RpdHV0aW9uKTtcXG4gICAgcmJJbmZvLnNldF9tX2xpbmVhckRhbXBpbmcoZGVzY3JpcHRpb24uZGFtcGluZyk7XFxuICAgIHJiSW5mby5zZXRfbV9hbmd1bGFyRGFtcGluZyhkZXNjcmlwdGlvbi5kYW1waW5nKTtcXG5cXG4gICAgYm9keSA9IG5ldyBBbW1vLmJ0UmlnaWRCb2R5KHJiSW5mbyk7XFxuICAgIEFtbW8uY2FzdE9iamVjdChib2R5LCBBbW1vLmJ0Q29sbGlzaW9uT2JqZWN0KS5nZXRDb2xsaXNpb25TaGFwZSgpLnNldE1hcmdpbihkZXNjcmlwdGlvbi5tYXJnaW4gPyBkZXNjcmlwdGlvbi5tYXJnaW4gOiAwKTtcXG4gICAgYm9keS5zZXRBY3RpdmF0aW9uU3RhdGUoZGVzY3JpcHRpb24uc3RhdGUgfHwgNCk7XFxuICAgIEFtbW8uZGVzdHJveShyYkluZm8pO1xcblxcbiAgICBpZiAodHlwZW9mIGRlc2NyaXB0aW9uLmNvbGxpc2lvbl9mbGFncyAhPT0gJ3VuZGVmaW5lZCcpIGJvZHkuc2V0Q29sbGlzaW9uRmxhZ3MoZGVzY3JpcHRpb24uY29sbGlzaW9uX2ZsYWdzKTtcXG5cXG4gICAgaWYgKGRlc2NyaXB0aW9uLmdyb3VwICYmIGRlc2NyaXB0aW9uLm1hc2spIHdvcmxkLmFkZFJpZ2lkQm9keShib2R5LCBkZXNjcmlwdGlvbi5ncm91cCwgZGVzY3JpcHRpb24ubWFzayk7ZWxzZSB3b3JsZC5hZGRSaWdpZEJvZHkoYm9keSk7XFxuICAgIGJvZHkudHlwZSA9IDE7IC8vIFJpZ2lkQm9keS5cXG4gICAgX251bV9yaWdpZGJvZHlfb2JqZWN0cysrO1xcbiAgfVxcblxcbiAgYm9keS5hY3RpdmF0ZSgpO1xcblxcbiAgYm9keS5pZCA9IGRlc2NyaXB0aW9uLmlkO1xcbiAgX29iamVjdHNbYm9keS5pZF0gPSBib2R5O1xcbiAgX21vdGlvbl9zdGF0ZXNbYm9keS5pZF0gPSBtb3Rpb25TdGF0ZTtcXG5cXG4gIF9vYmplY3RzX2FtbW9bYm9keS5hID09PSB1bmRlZmluZWQgPyBib2R5LnB0ciA6IGJvZHkuYV0gPSBib2R5LmlkO1xcbiAgX251bV9vYmplY3RzKys7XFxuXFxuICB0cmFuc2ZlcmFibGVNZXNzYWdlKHsgY21kOiAnb2JqZWN0UmVhZHknLCBwYXJhbXM6IGJvZHkuaWQgfSk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmFkZFZlaGljbGUgPSBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcXG4gIHZhciB2ZWhpY2xlX3R1bmluZyA9IG5ldyBBbW1vLmJ0VmVoaWNsZVR1bmluZygpO1xcblxcbiAgdmVoaWNsZV90dW5pbmcuc2V0X21fc3VzcGVuc2lvblN0aWZmbmVzcyhkZXNjcmlwdGlvbi5zdXNwZW5zaW9uX3N0aWZmbmVzcyk7XFxuICB2ZWhpY2xlX3R1bmluZy5zZXRfbV9zdXNwZW5zaW9uQ29tcHJlc3Npb24oZGVzY3JpcHRpb24uc3VzcGVuc2lvbl9jb21wcmVzc2lvbik7XFxuICB2ZWhpY2xlX3R1bmluZy5zZXRfbV9zdXNwZW5zaW9uRGFtcGluZyhkZXNjcmlwdGlvbi5zdXNwZW5zaW9uX2RhbXBpbmcpO1xcbiAgdmVoaWNsZV90dW5pbmcuc2V0X21fbWF4U3VzcGVuc2lvblRyYXZlbENtKGRlc2NyaXB0aW9uLm1heF9zdXNwZW5zaW9uX3RyYXZlbCk7XFxuICB2ZWhpY2xlX3R1bmluZy5zZXRfbV9tYXhTdXNwZW5zaW9uRm9yY2UoZGVzY3JpcHRpb24ubWF4X3N1c3BlbnNpb25fZm9yY2UpO1xcblxcbiAgdmFyIHZlaGljbGUgPSBuZXcgQW1tby5idFJheWNhc3RWZWhpY2xlKHZlaGljbGVfdHVuaW5nLCBfb2JqZWN0c1tkZXNjcmlwdGlvbi5yaWdpZEJvZHldLCBuZXcgQW1tby5idERlZmF1bHRWZWhpY2xlUmF5Y2FzdGVyKHdvcmxkKSk7XFxuXFxuICB2ZWhpY2xlLnR1bmluZyA9IHZlaGljbGVfdHVuaW5nO1xcbiAgX29iamVjdHNbZGVzY3JpcHRpb24ucmlnaWRCb2R5XS5zZXRBY3RpdmF0aW9uU3RhdGUoNCk7XFxuICB2ZWhpY2xlLnNldENvb3JkaW5hdGVTeXN0ZW0oMCwgMSwgMik7XFxuXFxuICB3b3JsZC5hZGRWZWhpY2xlKHZlaGljbGUpO1xcbiAgX3ZlaGljbGVzW2Rlc2NyaXB0aW9uLmlkXSA9IHZlaGljbGU7XFxufTtcXG5wdWJsaWNfZnVuY3Rpb25zLnJlbW92ZVZlaGljbGUgPSBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcXG4gIF92ZWhpY2xlc1tkZXNjcmlwdGlvbi5pZF0gPSBudWxsO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5hZGRXaGVlbCA9IGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xcbiAgaWYgKF92ZWhpY2xlc1tkZXNjcmlwdGlvbi5pZF0gIT09IHVuZGVmaW5lZCkge1xcbiAgICB2YXIgdHVuaW5nID0gX3ZlaGljbGVzW2Rlc2NyaXB0aW9uLmlkXS50dW5pbmc7XFxuICAgIGlmIChkZXNjcmlwdGlvbi50dW5pbmcgIT09IHVuZGVmaW5lZCkge1xcbiAgICAgIHR1bmluZyA9IG5ldyBBbW1vLmJ0VmVoaWNsZVR1bmluZygpO1xcbiAgICAgIHR1bmluZy5zZXRfbV9zdXNwZW5zaW9uU3RpZmZuZXNzKGRlc2NyaXB0aW9uLnR1bmluZy5zdXNwZW5zaW9uX3N0aWZmbmVzcyk7XFxuICAgICAgdHVuaW5nLnNldF9tX3N1c3BlbnNpb25Db21wcmVzc2lvbihkZXNjcmlwdGlvbi50dW5pbmcuc3VzcGVuc2lvbl9jb21wcmVzc2lvbik7XFxuICAgICAgdHVuaW5nLnNldF9tX3N1c3BlbnNpb25EYW1waW5nKGRlc2NyaXB0aW9uLnR1bmluZy5zdXNwZW5zaW9uX2RhbXBpbmcpO1xcbiAgICAgIHR1bmluZy5zZXRfbV9tYXhTdXNwZW5zaW9uVHJhdmVsQ20oZGVzY3JpcHRpb24udHVuaW5nLm1heF9zdXNwZW5zaW9uX3RyYXZlbCk7XFxuICAgICAgdHVuaW5nLnNldF9tX21heFN1c3BlbnNpb25Gb3JjZShkZXNjcmlwdGlvbi50dW5pbmcubWF4X3N1c3BlbnNpb25fZm9yY2UpO1xcbiAgICB9XFxuXFxuICAgIF92ZWMzXzEuc2V0WChkZXNjcmlwdGlvbi5jb25uZWN0aW9uX3BvaW50LngpO1xcbiAgICBfdmVjM18xLnNldFkoZGVzY3JpcHRpb24uY29ubmVjdGlvbl9wb2ludC55KTtcXG4gICAgX3ZlYzNfMS5zZXRaKGRlc2NyaXB0aW9uLmNvbm5lY3Rpb25fcG9pbnQueik7XFxuXFxuICAgIF92ZWMzXzIuc2V0WChkZXNjcmlwdGlvbi53aGVlbF9kaXJlY3Rpb24ueCk7XFxuICAgIF92ZWMzXzIuc2V0WShkZXNjcmlwdGlvbi53aGVlbF9kaXJlY3Rpb24ueSk7XFxuICAgIF92ZWMzXzIuc2V0WihkZXNjcmlwdGlvbi53aGVlbF9kaXJlY3Rpb24ueik7XFxuXFxuICAgIF92ZWMzXzMuc2V0WChkZXNjcmlwdGlvbi53aGVlbF9heGxlLngpO1xcbiAgICBfdmVjM18zLnNldFkoZGVzY3JpcHRpb24ud2hlZWxfYXhsZS55KTtcXG4gICAgX3ZlYzNfMy5zZXRaKGRlc2NyaXB0aW9uLndoZWVsX2F4bGUueik7XFxuXFxuICAgIF92ZWhpY2xlc1tkZXNjcmlwdGlvbi5pZF0uYWRkV2hlZWwoX3ZlYzNfMSwgX3ZlYzNfMiwgX3ZlYzNfMywgZGVzY3JpcHRpb24uc3VzcGVuc2lvbl9yZXN0X2xlbmd0aCwgZGVzY3JpcHRpb24ud2hlZWxfcmFkaXVzLCB0dW5pbmcsIGRlc2NyaXB0aW9uLmlzX2Zyb250X3doZWVsKTtcXG4gIH1cXG5cXG4gIF9udW1fd2hlZWxzKys7XFxuXFxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHtcXG4gICAgdmVoaWNsZXJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMSArIF9udW1fd2hlZWxzICogVkVISUNMRVJFUE9SVF9JVEVNU0laRSk7IC8vIG1lc3NhZ2UgaWQgJiAoICMgb2Ygb2JqZWN0cyB0byByZXBvcnQgKiAjIG9mIHZhbHVlcyBwZXIgb2JqZWN0IClcXG4gICAgdmVoaWNsZXJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuVkVISUNMRVJFUE9SVDtcXG4gIH0gZWxzZSB2ZWhpY2xlcmVwb3J0ID0gW01FU1NBR0VfVFlQRVMuVkVISUNMRVJFUE9SVF07XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNldFN0ZWVyaW5nID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcXG4gIGlmIChfdmVoaWNsZXNbZGV0YWlscy5pZF0gIT09IHVuZGVmaW5lZCkgX3ZlaGljbGVzW2RldGFpbHMuaWRdLnNldFN0ZWVyaW5nVmFsdWUoZGV0YWlscy5zdGVlcmluZywgZGV0YWlscy53aGVlbCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNldEJyYWtlID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcXG4gIGlmIChfdmVoaWNsZXNbZGV0YWlscy5pZF0gIT09IHVuZGVmaW5lZCkgX3ZlaGljbGVzW2RldGFpbHMuaWRdLnNldEJyYWtlKGRldGFpbHMuYnJha2UsIGRldGFpbHMud2hlZWwpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5hcHBseUVuZ2luZUZvcmNlID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcXG4gIGlmIChfdmVoaWNsZXNbZGV0YWlscy5pZF0gIT09IHVuZGVmaW5lZCkgX3ZlaGljbGVzW2RldGFpbHMuaWRdLmFwcGx5RW5naW5lRm9yY2UoZGV0YWlscy5mb3JjZSwgZGV0YWlscy53aGVlbCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnJlbW92ZU9iamVjdCA9IGZ1bmN0aW9uIChkZXRhaWxzKSB7XFxuICBpZiAoX29iamVjdHNbZGV0YWlscy5pZF0udHlwZSA9PT0gMCkge1xcbiAgICBfbnVtX3NvZnRib2R5X29iamVjdHMtLTtcXG4gICAgX3NvZnRib2R5X3JlcG9ydF9zaXplIC09IF9vYmplY3RzW2RldGFpbHMuaWRdLmdldF9tX25vZGVzKCkuc2l6ZSgpO1xcbiAgICB3b3JsZC5yZW1vdmVTb2Z0Qm9keShfb2JqZWN0c1tkZXRhaWxzLmlkXSk7XFxuICB9IGVsc2UgaWYgKF9vYmplY3RzW2RldGFpbHMuaWRdLnR5cGUgPT09IDEpIHtcXG4gICAgX251bV9yaWdpZGJvZHlfb2JqZWN0cy0tO1xcbiAgICB3b3JsZC5yZW1vdmVSaWdpZEJvZHkoX29iamVjdHNbZGV0YWlscy5pZF0pO1xcbiAgICBBbW1vLmRlc3Ryb3koX21vdGlvbl9zdGF0ZXNbZGV0YWlscy5pZF0pO1xcbiAgfVxcblxcbiAgQW1tby5kZXN0cm95KF9vYmplY3RzW2RldGFpbHMuaWRdKTtcXG4gIGlmIChfY29tcG91bmRfc2hhcGVzW2RldGFpbHMuaWRdKSBBbW1vLmRlc3Ryb3koX2NvbXBvdW5kX3NoYXBlc1tkZXRhaWxzLmlkXSk7XFxuICBpZiAoX25vbmNhY2hlZF9zaGFwZXNbZGV0YWlscy5pZF0pIEFtbW8uZGVzdHJveShfbm9uY2FjaGVkX3NoYXBlc1tkZXRhaWxzLmlkXSk7XFxuXFxuICBfb2JqZWN0c19hbW1vW19vYmplY3RzW2RldGFpbHMuaWRdLmEgPT09IHVuZGVmaW5lZCA/IF9vYmplY3RzW2RldGFpbHMuaWRdLmEgOiBfb2JqZWN0c1tkZXRhaWxzLmlkXS5wdHJdID0gbnVsbDtcXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdID0gbnVsbDtcXG4gIF9tb3Rpb25fc3RhdGVzW2RldGFpbHMuaWRdID0gbnVsbDtcXG5cXG4gIGlmIChfY29tcG91bmRfc2hhcGVzW2RldGFpbHMuaWRdKSBfY29tcG91bmRfc2hhcGVzW2RldGFpbHMuaWRdID0gbnVsbDtcXG4gIGlmIChfbm9uY2FjaGVkX3NoYXBlc1tkZXRhaWxzLmlkXSkgX25vbmNhY2hlZF9zaGFwZXNbZGV0YWlscy5pZF0gPSBudWxsO1xcbiAgX251bV9vYmplY3RzLS07XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uIChkZXRhaWxzKSB7XFxuICBfb2JqZWN0ID0gX29iamVjdHNbZGV0YWlscy5pZF07XFxuXFxuICBpZiAoX29iamVjdC50eXBlID09PSAxKSB7XFxuICAgIF9vYmplY3QuZ2V0TW90aW9uU3RhdGUoKS5nZXRXb3JsZFRyYW5zZm9ybShfdHJhbnNmb3JtKTtcXG5cXG4gICAgaWYgKGRldGFpbHMucG9zKSB7XFxuICAgICAgX3ZlYzNfMS5zZXRYKGRldGFpbHMucG9zLngpO1xcbiAgICAgIF92ZWMzXzEuc2V0WShkZXRhaWxzLnBvcy55KTtcXG4gICAgICBfdmVjM18xLnNldFooZGV0YWlscy5wb3Mueik7XFxuICAgICAgX3RyYW5zZm9ybS5zZXRPcmlnaW4oX3ZlYzNfMSk7XFxuICAgIH1cXG5cXG4gICAgaWYgKGRldGFpbHMucXVhdCkge1xcbiAgICAgIF9xdWF0LnNldFgoZGV0YWlscy5xdWF0LngpO1xcbiAgICAgIF9xdWF0LnNldFkoZGV0YWlscy5xdWF0LnkpO1xcbiAgICAgIF9xdWF0LnNldFooZGV0YWlscy5xdWF0LnopO1xcbiAgICAgIF9xdWF0LnNldFcoZGV0YWlscy5xdWF0LncpO1xcbiAgICAgIF90cmFuc2Zvcm0uc2V0Um90YXRpb24oX3F1YXQpO1xcbiAgICB9XFxuXFxuICAgIF9vYmplY3Quc2V0V29ybGRUcmFuc2Zvcm0oX3RyYW5zZm9ybSk7XFxuICAgIF9vYmplY3QuYWN0aXZhdGUoKTtcXG4gIH0gZWxzZSBpZiAoX29iamVjdC50eXBlID09PSAwKSB7XFxuICAgIC8vIF9vYmplY3QuZ2V0V29ybGRUcmFuc2Zvcm0oX3RyYW5zZm9ybSk7XFxuXFxuICAgIGlmIChkZXRhaWxzLnBvcykge1xcbiAgICAgIF92ZWMzXzEuc2V0WChkZXRhaWxzLnBvcy54KTtcXG4gICAgICBfdmVjM18xLnNldFkoZGV0YWlscy5wb3MueSk7XFxuICAgICAgX3ZlYzNfMS5zZXRaKGRldGFpbHMucG9zLnopO1xcbiAgICAgIF90cmFuc2Zvcm0uc2V0T3JpZ2luKF92ZWMzXzEpO1xcbiAgICB9XFxuXFxuICAgIGlmIChkZXRhaWxzLnF1YXQpIHtcXG4gICAgICBfcXVhdC5zZXRYKGRldGFpbHMucXVhdC54KTtcXG4gICAgICBfcXVhdC5zZXRZKGRldGFpbHMucXVhdC55KTtcXG4gICAgICBfcXVhdC5zZXRaKGRldGFpbHMucXVhdC56KTtcXG4gICAgICBfcXVhdC5zZXRXKGRldGFpbHMucXVhdC53KTtcXG4gICAgICBfdHJhbnNmb3JtLnNldFJvdGF0aW9uKF9xdWF0KTtcXG4gICAgfVxcblxcbiAgICBfb2JqZWN0LnRyYW5zZm9ybShfdHJhbnNmb3JtKTtcXG4gIH1cXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMudXBkYXRlTWFzcyA9IGZ1bmN0aW9uIChkZXRhaWxzKSB7XFxuICAvLyAjVE9ETzogY2hhbmdpbmcgYSBzdGF0aWMgb2JqZWN0IGludG8gZHluYW1pYyBpcyBidWdneVxcbiAgX29iamVjdCA9IF9vYmplY3RzW2RldGFpbHMuaWRdO1xcblxcbiAgLy8gUGVyIGh0dHA6Ly93d3cuYnVsbGV0cGh5c2ljcy5vcmcvQnVsbGV0L3BocEJCMy92aWV3dG9waWMucGhwP3A9JmY9OSZ0PTM2NjMjcDEzODE2XFxuICB3b3JsZC5yZW1vdmVSaWdpZEJvZHkoX29iamVjdCk7XFxuXFxuICBfdmVjM18xLnNldFgoMCk7XFxuICBfdmVjM18xLnNldFkoMCk7XFxuICBfdmVjM18xLnNldFooMCk7XFxuXFxuICBfb2JqZWN0LnNldE1hc3NQcm9wcyhkZXRhaWxzLm1hc3MsIF92ZWMzXzEpO1xcbiAgd29ybGQuYWRkUmlnaWRCb2R5KF9vYmplY3QpO1xcbiAgX29iamVjdC5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5hcHBseUNlbnRyYWxJbXB1bHNlID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcXG4gIF92ZWMzXzEuc2V0WChkZXRhaWxzLngpO1xcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMueSk7XFxuICBfdmVjM18xLnNldFooZGV0YWlscy56KTtcXG5cXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFwcGx5Q2VudHJhbEltcHVsc2UoX3ZlYzNfMSk7XFxuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5hcHBseUltcHVsc2UgPSBmdW5jdGlvbiAoZGV0YWlscykge1xcbiAgX3ZlYzNfMS5zZXRYKGRldGFpbHMuaW1wdWxzZV94KTtcXG4gIF92ZWMzXzEuc2V0WShkZXRhaWxzLmltcHVsc2VfeSk7XFxuICBfdmVjM18xLnNldFooZGV0YWlscy5pbXB1bHNlX3opO1xcblxcbiAgX3ZlYzNfMi5zZXRYKGRldGFpbHMueCk7XFxuICBfdmVjM18yLnNldFkoZGV0YWlscy55KTtcXG4gIF92ZWMzXzIuc2V0WihkZXRhaWxzLnopO1xcblxcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYXBwbHlJbXB1bHNlKF92ZWMzXzEsIF92ZWMzXzIpO1xcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYWN0aXZhdGUoKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuYXBwbHlUb3JxdWUgPSBmdW5jdGlvbiAoZGV0YWlscykge1xcbiAgX3ZlYzNfMS5zZXRYKGRldGFpbHMudG9ycXVlX3gpO1xcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMudG9ycXVlX3kpO1xcbiAgX3ZlYzNfMS5zZXRaKGRldGFpbHMudG9ycXVlX3opO1xcblxcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYXBwbHlUb3JxdWUoX3ZlYzNfMSk7XFxuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5hcHBseUNlbnRyYWxGb3JjZSA9IGZ1bmN0aW9uIChkZXRhaWxzKSB7XFxuICBfdmVjM18xLnNldFgoZGV0YWlscy54KTtcXG4gIF92ZWMzXzEuc2V0WShkZXRhaWxzLnkpO1xcbiAgX3ZlYzNfMS5zZXRaKGRldGFpbHMueik7XFxuXFxuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5hcHBseUNlbnRyYWxGb3JjZShfdmVjM18xKTtcXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiAoZGV0YWlscykge1xcbiAgX3ZlYzNfMS5zZXRYKGRldGFpbHMuZm9yY2VfeCk7XFxuICBfdmVjM18xLnNldFkoZGV0YWlscy5mb3JjZV95KTtcXG4gIF92ZWMzXzEuc2V0WihkZXRhaWxzLmZvcmNlX3opO1xcblxcbiAgX3ZlYzNfMi5zZXRYKGRldGFpbHMueCk7XFxuICBfdmVjM18yLnNldFkoZGV0YWlscy55KTtcXG4gIF92ZWMzXzIuc2V0WihkZXRhaWxzLnopO1xcblxcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYXBwbHlGb3JjZShfdmVjM18xLCBfdmVjM18yKTtcXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLm9uU2ltdWxhdGlvblJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcXG4gIGxhc3Rfc2ltdWxhdGlvbl90aW1lID0gRGF0ZS5ub3coKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuc2V0QW5ndWxhclZlbG9jaXR5ID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcXG4gIF92ZWMzXzEuc2V0WChkZXRhaWxzLngpO1xcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMueSk7XFxuICBfdmVjM18xLnNldFooZGV0YWlscy56KTtcXG5cXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLnNldEFuZ3VsYXJWZWxvY2l0eShfdmVjM18xKTtcXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNldExpbmVhclZlbG9jaXR5ID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcXG4gIF92ZWMzXzEuc2V0WChkZXRhaWxzLngpO1xcbiAgX3ZlYzNfMS5zZXRZKGRldGFpbHMueSk7XFxuICBfdmVjM18xLnNldFooZGV0YWlscy56KTtcXG5cXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLnNldExpbmVhclZlbG9jaXR5KF92ZWMzXzEpO1xcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uYWN0aXZhdGUoKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuc2V0QW5ndWxhckZhY3RvciA9IGZ1bmN0aW9uIChkZXRhaWxzKSB7XFxuICBfdmVjM18xLnNldFgoZGV0YWlscy54KTtcXG4gIF92ZWMzXzEuc2V0WShkZXRhaWxzLnkpO1xcbiAgX3ZlYzNfMS5zZXRaKGRldGFpbHMueik7XFxuXFxuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5zZXRBbmd1bGFyRmFjdG9yKF92ZWMzXzEpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5zZXRMaW5lYXJGYWN0b3IgPSBmdW5jdGlvbiAoZGV0YWlscykge1xcbiAgX3ZlYzNfMS5zZXRYKGRldGFpbHMueCk7XFxuICBfdmVjM18xLnNldFkoZGV0YWlscy55KTtcXG4gIF92ZWMzXzEuc2V0WihkZXRhaWxzLnopO1xcblxcbiAgX29iamVjdHNbZGV0YWlscy5pZF0uc2V0TGluZWFyRmFjdG9yKF92ZWMzXzEpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5zZXREYW1waW5nID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcXG4gIF9vYmplY3RzW2RldGFpbHMuaWRdLnNldERhbXBpbmcoZGV0YWlscy5saW5lYXIsIGRldGFpbHMuYW5ndWxhcik7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNldENjZE1vdGlvblRocmVzaG9sZCA9IGZ1bmN0aW9uIChkZXRhaWxzKSB7XFxuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5zZXRDY2RNb3Rpb25UaHJlc2hvbGQoZGV0YWlscy50aHJlc2hvbGQpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5zZXRDY2RTd2VwdFNwaGVyZVJhZGl1cyA9IGZ1bmN0aW9uIChkZXRhaWxzKSB7XFxuICBfb2JqZWN0c1tkZXRhaWxzLmlkXS5zZXRDY2RTd2VwdFNwaGVyZVJhZGl1cyhkZXRhaWxzLnJhZGl1cyk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmFkZENvbnN0cmFpbnQgPSBmdW5jdGlvbiAoZGV0YWlscykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSB2b2lkIDA7XFxuXFxuICBzd2l0Y2ggKGRldGFpbHMudHlwZSkge1xcblxcbiAgICBjYXNlICdwb2ludCc6XFxuICAgICAge1xcbiAgICAgICAgaWYgKGRldGFpbHMub2JqZWN0YiA9PT0gdW5kZWZpbmVkKSB7XFxuICAgICAgICAgIF92ZWMzXzEuc2V0WChkZXRhaWxzLnBvc2l0aW9uYS54KTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRZKGRldGFpbHMucG9zaXRpb25hLnkpO1xcbiAgICAgICAgICBfdmVjM18xLnNldFooZGV0YWlscy5wb3NpdGlvbmEueik7XFxuXFxuICAgICAgICAgIGNvbnN0cmFpbnQgPSBuZXcgQW1tby5idFBvaW50MlBvaW50Q29uc3RyYWludChfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGFdLCBfdmVjM18xKTtcXG4gICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgIF92ZWMzXzEuc2V0WChkZXRhaWxzLnBvc2l0aW9uYS54KTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRZKGRldGFpbHMucG9zaXRpb25hLnkpO1xcbiAgICAgICAgICBfdmVjM18xLnNldFooZGV0YWlscy5wb3NpdGlvbmEueik7XFxuXFxuICAgICAgICAgIF92ZWMzXzIuc2V0WChkZXRhaWxzLnBvc2l0aW9uYi54KTtcXG4gICAgICAgICAgX3ZlYzNfMi5zZXRZKGRldGFpbHMucG9zaXRpb25iLnkpO1xcbiAgICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5wb3NpdGlvbmIueik7XFxuXFxuICAgICAgICAgIGNvbnN0cmFpbnQgPSBuZXcgQW1tby5idFBvaW50MlBvaW50Q29uc3RyYWludChfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGFdLCBfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGJdLCBfdmVjM18xLCBfdmVjM18yKTtcXG4gICAgICAgIH1cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAnaGluZ2UnOlxcbiAgICAgIHtcXG4gICAgICAgIGlmIChkZXRhaWxzLm9iamVjdGIgPT09IHVuZGVmaW5lZCkge1xcbiAgICAgICAgICBfdmVjM18xLnNldFgoZGV0YWlscy5wb3NpdGlvbmEueCk7XFxuICAgICAgICAgIF92ZWMzXzEuc2V0WShkZXRhaWxzLnBvc2l0aW9uYS55KTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRaKGRldGFpbHMucG9zaXRpb25hLnopO1xcblxcbiAgICAgICAgICBfdmVjM18yLnNldFgoZGV0YWlscy5heGlzLngpO1xcbiAgICAgICAgICBfdmVjM18yLnNldFkoZGV0YWlscy5heGlzLnkpO1xcbiAgICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5heGlzLnopO1xcblxcbiAgICAgICAgICBjb25zdHJhaW50ID0gbmV3IEFtbW8uYnRIaW5nZUNvbnN0cmFpbnQoX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSwgX3ZlYzNfMSwgX3ZlYzNfMik7XFxuICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICBfdmVjM18xLnNldFgoZGV0YWlscy5wb3NpdGlvbmEueCk7XFxuICAgICAgICAgIF92ZWMzXzEuc2V0WShkZXRhaWxzLnBvc2l0aW9uYS55KTtcXG4gICAgICAgICAgX3ZlYzNfMS5zZXRaKGRldGFpbHMucG9zaXRpb25hLnopO1xcblxcbiAgICAgICAgICBfdmVjM18yLnNldFgoZGV0YWlscy5wb3NpdGlvbmIueCk7XFxuICAgICAgICAgIF92ZWMzXzIuc2V0WShkZXRhaWxzLnBvc2l0aW9uYi55KTtcXG4gICAgICAgICAgX3ZlYzNfMi5zZXRaKGRldGFpbHMucG9zaXRpb25iLnopO1xcblxcbiAgICAgICAgICBfdmVjM18zLnNldFgoZGV0YWlscy5heGlzLngpO1xcbiAgICAgICAgICBfdmVjM18zLnNldFkoZGV0YWlscy5heGlzLnkpO1xcbiAgICAgICAgICBfdmVjM18zLnNldFooZGV0YWlscy5heGlzLnopO1xcblxcbiAgICAgICAgICBjb25zdHJhaW50ID0gbmV3IEFtbW8uYnRIaW5nZUNvbnN0cmFpbnQoX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSwgX29iamVjdHNbZGV0YWlscy5vYmplY3RiXSwgX3ZlYzNfMSwgX3ZlYzNfMiwgX3ZlYzNfMywgX3ZlYzNfMyk7XFxuICAgICAgICB9XFxuICAgICAgICBicmVhaztcXG4gICAgICB9XFxuICAgIGNhc2UgJ3NsaWRlcic6XFxuICAgICAge1xcbiAgICAgICAgdmFyIHRyYW5zZm9ybWIgPSB2b2lkIDA7XFxuICAgICAgICB2YXIgdHJhbnNmb3JtYSA9IG5ldyBBbW1vLmJ0VHJhbnNmb3JtKCk7XFxuXFxuICAgICAgICBfdmVjM18xLnNldFgoZGV0YWlscy5wb3NpdGlvbmEueCk7XFxuICAgICAgICBfdmVjM18xLnNldFkoZGV0YWlscy5wb3NpdGlvbmEueSk7XFxuICAgICAgICBfdmVjM18xLnNldFooZGV0YWlscy5wb3NpdGlvbmEueik7XFxuXFxuICAgICAgICB0cmFuc2Zvcm1hLnNldE9yaWdpbihfdmVjM18xKTtcXG5cXG4gICAgICAgIHZhciByb3RhdGlvbiA9IHRyYW5zZm9ybWEuZ2V0Um90YXRpb24oKTtcXG4gICAgICAgIHJvdGF0aW9uLnNldEV1bGVyKGRldGFpbHMuYXhpcy54LCBkZXRhaWxzLmF4aXMueSwgZGV0YWlscy5heGlzLnopO1xcbiAgICAgICAgdHJhbnNmb3JtYS5zZXRSb3RhdGlvbihyb3RhdGlvbik7XFxuXFxuICAgICAgICBpZiAoZGV0YWlscy5vYmplY3RiKSB7XFxuICAgICAgICAgIHRyYW5zZm9ybWIgPSBuZXcgQW1tby5idFRyYW5zZm9ybSgpO1xcblxcbiAgICAgICAgICBfdmVjM18yLnNldFgoZGV0YWlscy5wb3NpdGlvbmIueCk7XFxuICAgICAgICAgIF92ZWMzXzIuc2V0WShkZXRhaWxzLnBvc2l0aW9uYi55KTtcXG4gICAgICAgICAgX3ZlYzNfMi5zZXRaKGRldGFpbHMucG9zaXRpb25iLnopO1xcblxcbiAgICAgICAgICB0cmFuc2Zvcm1iLnNldE9yaWdpbihfdmVjM18yKTtcXG5cXG4gICAgICAgICAgcm90YXRpb24gPSB0cmFuc2Zvcm1iLmdldFJvdGF0aW9uKCk7XFxuICAgICAgICAgIHJvdGF0aW9uLnNldEV1bGVyKGRldGFpbHMuYXhpcy54LCBkZXRhaWxzLmF4aXMueSwgZGV0YWlscy5heGlzLnopO1xcbiAgICAgICAgICB0cmFuc2Zvcm1iLnNldFJvdGF0aW9uKHJvdGF0aW9uKTtcXG5cXG4gICAgICAgICAgY29uc3RyYWludCA9IG5ldyBBbW1vLmJ0U2xpZGVyQ29uc3RyYWludChfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGFdLCBfb2JqZWN0c1tkZXRhaWxzLm9iamVjdGJdLCB0cmFuc2Zvcm1hLCB0cmFuc2Zvcm1iLCB0cnVlKTtcXG4gICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgIGNvbnN0cmFpbnQgPSBuZXcgQW1tby5idFNsaWRlckNvbnN0cmFpbnQoX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSwgdHJhbnNmb3JtYSwgdHJ1ZSk7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBjb25zdHJhaW50LnRhID0gdHJhbnNmb3JtYTtcXG4gICAgICAgIGNvbnN0cmFpbnQudGIgPSB0cmFuc2Zvcm1iO1xcblxcbiAgICAgICAgQW1tby5kZXN0cm95KHRyYW5zZm9ybWEpO1xcbiAgICAgICAgaWYgKHRyYW5zZm9ybWIgIT09IHVuZGVmaW5lZCkgQW1tby5kZXN0cm95KHRyYW5zZm9ybWIpO1xcblxcbiAgICAgICAgYnJlYWs7XFxuICAgICAgfVxcbiAgICBjYXNlICdjb25ldHdpc3QnOlxcbiAgICAgIHtcXG4gICAgICAgIHZhciBfdHJhbnNmb3JtYSA9IG5ldyBBbW1vLmJ0VHJhbnNmb3JtKCk7XFxuICAgICAgICBfdHJhbnNmb3JtYS5zZXRJZGVudGl0eSgpO1xcblxcbiAgICAgICAgdmFyIF90cmFuc2Zvcm1iID0gbmV3IEFtbW8uYnRUcmFuc2Zvcm0oKTtcXG4gICAgICAgIF90cmFuc2Zvcm1iLnNldElkZW50aXR5KCk7XFxuXFxuICAgICAgICBfdmVjM18xLnNldFgoZGV0YWlscy5wb3NpdGlvbmEueCk7XFxuICAgICAgICBfdmVjM18xLnNldFkoZGV0YWlscy5wb3NpdGlvbmEueSk7XFxuICAgICAgICBfdmVjM18xLnNldFooZGV0YWlscy5wb3NpdGlvbmEueik7XFxuXFxuICAgICAgICBfdmVjM18yLnNldFgoZGV0YWlscy5wb3NpdGlvbmIueCk7XFxuICAgICAgICBfdmVjM18yLnNldFkoZGV0YWlscy5wb3NpdGlvbmIueSk7XFxuICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5wb3NpdGlvbmIueik7XFxuXFxuICAgICAgICBfdHJhbnNmb3JtYS5zZXRPcmlnaW4oX3ZlYzNfMSk7XFxuICAgICAgICBfdHJhbnNmb3JtYi5zZXRPcmlnaW4oX3ZlYzNfMik7XFxuXFxuICAgICAgICB2YXIgX3JvdGF0aW9uID0gX3RyYW5zZm9ybWEuZ2V0Um90YXRpb24oKTtcXG4gICAgICAgIF9yb3RhdGlvbi5zZXRFdWxlclpZWCgtZGV0YWlscy5heGlzYS56LCAtZGV0YWlscy5heGlzYS55LCAtZGV0YWlscy5heGlzYS54KTtcXG4gICAgICAgIF90cmFuc2Zvcm1hLnNldFJvdGF0aW9uKF9yb3RhdGlvbik7XFxuXFxuICAgICAgICBfcm90YXRpb24gPSBfdHJhbnNmb3JtYi5nZXRSb3RhdGlvbigpO1xcbiAgICAgICAgX3JvdGF0aW9uLnNldEV1bGVyWllYKC1kZXRhaWxzLmF4aXNiLnosIC1kZXRhaWxzLmF4aXNiLnksIC1kZXRhaWxzLmF4aXNiLngpO1xcbiAgICAgICAgX3RyYW5zZm9ybWIuc2V0Um90YXRpb24oX3JvdGF0aW9uKTtcXG5cXG4gICAgICAgIGNvbnN0cmFpbnQgPSBuZXcgQW1tby5idENvbmVUd2lzdENvbnN0cmFpbnQoX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSwgX29iamVjdHNbZGV0YWlscy5vYmplY3RiXSwgX3RyYW5zZm9ybWEsIF90cmFuc2Zvcm1iKTtcXG5cXG4gICAgICAgIGNvbnN0cmFpbnQuc2V0TGltaXQoTWF0aC5QSSwgMCwgTWF0aC5QSSk7XFxuXFxuICAgICAgICBjb25zdHJhaW50LnRhID0gX3RyYW5zZm9ybWE7XFxuICAgICAgICBjb25zdHJhaW50LnRiID0gX3RyYW5zZm9ybWI7XFxuXFxuICAgICAgICBBbW1vLmRlc3Ryb3koX3RyYW5zZm9ybWEpO1xcbiAgICAgICAgQW1tby5kZXN0cm95KF90cmFuc2Zvcm1iKTtcXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgY2FzZSAnZG9mJzpcXG4gICAgICB7XFxuICAgICAgICB2YXIgX3RyYW5zZm9ybWIyID0gdm9pZCAwO1xcblxcbiAgICAgICAgdmFyIF90cmFuc2Zvcm1hMiA9IG5ldyBBbW1vLmJ0VHJhbnNmb3JtKCk7XFxuICAgICAgICBfdHJhbnNmb3JtYTIuc2V0SWRlbnRpdHkoKTtcXG5cXG4gICAgICAgIF92ZWMzXzEuc2V0WChkZXRhaWxzLnBvc2l0aW9uYS54KTtcXG4gICAgICAgIF92ZWMzXzEuc2V0WShkZXRhaWxzLnBvc2l0aW9uYS55KTtcXG4gICAgICAgIF92ZWMzXzEuc2V0WihkZXRhaWxzLnBvc2l0aW9uYS56KTtcXG5cXG4gICAgICAgIF90cmFuc2Zvcm1hMi5zZXRPcmlnaW4oX3ZlYzNfMSk7XFxuXFxuICAgICAgICB2YXIgX3JvdGF0aW9uMiA9IF90cmFuc2Zvcm1hMi5nZXRSb3RhdGlvbigpO1xcbiAgICAgICAgX3JvdGF0aW9uMi5zZXRFdWxlclpZWCgtZGV0YWlscy5heGlzYS56LCAtZGV0YWlscy5heGlzYS55LCAtZGV0YWlscy5heGlzYS54KTtcXG4gICAgICAgIF90cmFuc2Zvcm1hMi5zZXRSb3RhdGlvbihfcm90YXRpb24yKTtcXG5cXG4gICAgICAgIGlmIChkZXRhaWxzLm9iamVjdGIpIHtcXG4gICAgICAgICAgX3RyYW5zZm9ybWIyID0gbmV3IEFtbW8uYnRUcmFuc2Zvcm0oKTtcXG4gICAgICAgICAgX3RyYW5zZm9ybWIyLnNldElkZW50aXR5KCk7XFxuXFxuICAgICAgICAgIF92ZWMzXzIuc2V0WChkZXRhaWxzLnBvc2l0aW9uYi54KTtcXG4gICAgICAgICAgX3ZlYzNfMi5zZXRZKGRldGFpbHMucG9zaXRpb25iLnkpO1xcbiAgICAgICAgICBfdmVjM18yLnNldFooZGV0YWlscy5wb3NpdGlvbmIueik7XFxuXFxuICAgICAgICAgIF90cmFuc2Zvcm1iMi5zZXRPcmlnaW4oX3ZlYzNfMik7XFxuXFxuICAgICAgICAgIF9yb3RhdGlvbjIgPSBfdHJhbnNmb3JtYjIuZ2V0Um90YXRpb24oKTtcXG4gICAgICAgICAgX3JvdGF0aW9uMi5zZXRFdWxlclpZWCgtZGV0YWlscy5heGlzYi56LCAtZGV0YWlscy5heGlzYi55LCAtZGV0YWlscy5heGlzYi54KTtcXG4gICAgICAgICAgX3RyYW5zZm9ybWIyLnNldFJvdGF0aW9uKF9yb3RhdGlvbjIpO1xcblxcbiAgICAgICAgICBjb25zdHJhaW50ID0gbmV3IEFtbW8uYnRHZW5lcmljNkRvZkNvbnN0cmFpbnQoX29iamVjdHNbZGV0YWlscy5vYmplY3RhXSwgX29iamVjdHNbZGV0YWlscy5vYmplY3RiXSwgX3RyYW5zZm9ybWEyLCBfdHJhbnNmb3JtYjIsIHRydWUpO1xcbiAgICAgICAgfSBlbHNlIHtcXG4gICAgICAgICAgY29uc3RyYWludCA9IG5ldyBBbW1vLmJ0R2VuZXJpYzZEb2ZDb25zdHJhaW50KF9vYmplY3RzW2RldGFpbHMub2JqZWN0YV0sIF90cmFuc2Zvcm1hMiwgdHJ1ZSk7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBjb25zdHJhaW50LnRhID0gX3RyYW5zZm9ybWEyO1xcbiAgICAgICAgY29uc3RyYWludC50YiA9IF90cmFuc2Zvcm1iMjtcXG5cXG4gICAgICAgIEFtbW8uZGVzdHJveShfdHJhbnNmb3JtYTIpO1xcbiAgICAgICAgaWYgKF90cmFuc2Zvcm1iMiAhPT0gdW5kZWZpbmVkKSBBbW1vLmRlc3Ryb3koX3RyYW5zZm9ybWIyKTtcXG5cXG4gICAgICAgIGJyZWFrO1xcbiAgICAgIH1cXG4gICAgZGVmYXVsdDpcXG4gICAgICByZXR1cm47XFxuICB9XFxuXFxuICB3b3JsZC5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnQpO1xcblxcbiAgY29uc3RyYWludC5hID0gX29iamVjdHNbZGV0YWlscy5vYmplY3RhXTtcXG4gIGNvbnN0cmFpbnQuYiA9IF9vYmplY3RzW2RldGFpbHMub2JqZWN0Yl07XFxuXFxuICBjb25zdHJhaW50LmVuYWJsZUZlZWRiYWNrKCk7XFxuICBfY29uc3RyYWludHNbZGV0YWlscy5pZF0gPSBjb25zdHJhaW50O1xcbiAgX251bV9jb25zdHJhaW50cysrO1xcblxcbiAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFKSB7XFxuICAgIGNvbnN0cmFpbnRyZXBvcnQgPSBuZXcgRmxvYXQzMkFycmF5KDEgKyBfbnVtX2NvbnN0cmFpbnRzICogQ09OU1RSQUlOVFJFUE9SVF9JVEVNU0laRSk7IC8vIG1lc3NhZ2UgaWQgJiAoICMgb2Ygb2JqZWN0cyB0byByZXBvcnQgKiAjIG9mIHZhbHVlcyBwZXIgb2JqZWN0IClcXG4gICAgY29uc3RyYWludHJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuQ09OU1RSQUlOVFJFUE9SVDtcXG4gIH0gZWxzZSBjb25zdHJhaW50cmVwb3J0ID0gW01FU1NBR0VfVFlQRVMuQ09OU1RSQUlOVFJFUE9SVF07XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnJlbW92ZUNvbnN0cmFpbnQgPSBmdW5jdGlvbiAoZGV0YWlscykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbZGV0YWlscy5pZF07XFxuXFxuICBpZiAoY29uc3RyYWludCAhPT0gdW5kZWZpbmVkKSB7XFxuICAgIHdvcmxkLnJlbW92ZUNvbnN0cmFpbnQoY29uc3RyYWludCk7XFxuICAgIF9jb25zdHJhaW50c1tkZXRhaWxzLmlkXSA9IG51bGw7XFxuICAgIF9udW1fY29uc3RyYWludHMtLTtcXG4gIH1cXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuY29uc3RyYWludF9zZXRCcmVha2luZ0ltcHVsc2VUaHJlc2hvbGQgPSBmdW5jdGlvbiAoZGV0YWlscykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbZGV0YWlscy5pZF07XFxuICBpZiAoY29uc3RyYWludCAhPT0gdW5kZWZpbmQpIGNvbnN0cmFpbnQuc2V0QnJlYWtpbmdJbXB1bHNlVGhyZXNob2xkKGRldGFpbHMudGhyZXNob2xkKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuc2ltdWxhdGUgPSBmdW5jdGlvbiAoKSB7XFxuICB2YXIgcGFyYW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcXG5cXG4gIGlmICh3b3JsZCkge1xcbiAgICBpZiAocGFyYW1zLnRpbWVTdGVwICYmIHBhcmFtcy50aW1lU3RlcCA8IGZpeGVkVGltZVN0ZXApIHBhcmFtcy50aW1lU3RlcCA9IGZpeGVkVGltZVN0ZXA7XFxuXFxuICAgIHBhcmFtcy5tYXhTdWJTdGVwcyA9IHBhcmFtcy5tYXhTdWJTdGVwcyB8fCBNYXRoLmNlaWwocGFyYW1zLnRpbWVTdGVwIC8gZml4ZWRUaW1lU3RlcCk7IC8vIElmIG1heFN1YlN0ZXBzIGlzIG5vdCBkZWZpbmVkLCBrZWVwIHRoZSBzaW11bGF0aW9uIGZ1bGx5IHVwIHRvIGRhdGVcXG5cXG4gICAgd29ybGQuc3RlcFNpbXVsYXRpb24ocGFyYW1zLnRpbWVTdGVwLCBwYXJhbXMubWF4U3ViU3RlcHMsIGZpeGVkVGltZVN0ZXApO1xcblxcbiAgICBpZiAoX3ZlaGljbGVzLmxlbmd0aCA+IDApIHJlcG9ydFZlaGljbGVzKCk7XFxuICAgIHJlcG9ydENvbGxpc2lvbnMoKTtcXG4gICAgaWYgKF9jb25zdHJhaW50cy5sZW5ndGggPiAwKSByZXBvcnRDb25zdHJhaW50cygpO1xcbiAgICByZXBvcnRXb3JsZCgpO1xcbiAgICBpZiAoX3NvZnRib2R5X2VuYWJsZWQpIHJlcG9ydFdvcmxkX3NvZnRib2RpZXMoKTtcXG4gIH1cXG59O1xcblxcbi8vIENvbnN0cmFpbnQgZnVuY3Rpb25zXFxucHVibGljX2Z1bmN0aW9ucy5oaW5nZV9zZXRMaW1pdHMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdLnNldExpbWl0KHBhcmFtcy5sb3csIHBhcmFtcy5oaWdoLCAwLCBwYXJhbXMuYmlhc19mYWN0b3IsIHBhcmFtcy5yZWxheGF0aW9uX2ZhY3Rvcik7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmhpbmdlX2VuYWJsZUFuZ3VsYXJNb3RvciA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcXG4gIHZhciBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcXG4gIGNvbnN0cmFpbnQuZW5hYmxlQW5ndWxhck1vdG9yKHRydWUsIHBhcmFtcy52ZWxvY2l0eSwgcGFyYW1zLmFjY2VsZXJhdGlvbik7XFxuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5oaW5nZV9kaXNhYmxlTW90b3IgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdLmVuYWJsZU1vdG9yKGZhbHNlKTtcXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5zbGlkZXJfc2V0TGltaXRzID0gZnVuY3Rpb24gKHBhcmFtcykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xcbiAgY29uc3RyYWludC5zZXRMb3dlckxpbkxpbWl0KHBhcmFtcy5saW5fbG93ZXIgfHwgMCk7XFxuICBjb25zdHJhaW50LnNldFVwcGVyTGluTGltaXQocGFyYW1zLmxpbl91cHBlciB8fCAwKTtcXG5cXG4gIGNvbnN0cmFpbnQuc2V0TG93ZXJBbmdMaW1pdChwYXJhbXMuYW5nX2xvd2VyIHx8IDApO1xcbiAgY29uc3RyYWludC5zZXRVcHBlckFuZ0xpbWl0KHBhcmFtcy5hbmdfdXBwZXIgfHwgMCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNsaWRlcl9zZXRSZXN0aXR1dGlvbiA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcXG4gIHZhciBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcXG4gIGNvbnN0cmFpbnQuc2V0U29mdG5lc3NMaW1MaW4ocGFyYW1zLmxpbmVhciB8fCAwKTtcXG4gIGNvbnN0cmFpbnQuc2V0U29mdG5lc3NMaW1BbmcocGFyYW1zLmFuZ3VsYXIgfHwgMCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNsaWRlcl9lbmFibGVMaW5lYXJNb3RvciA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcXG4gIHZhciBjb25zdHJhaW50ID0gX2NvbnN0cmFpbnRzW3BhcmFtcy5jb25zdHJhaW50XTtcXG4gIGNvbnN0cmFpbnQuc2V0VGFyZ2V0TGluTW90b3JWZWxvY2l0eShwYXJhbXMudmVsb2NpdHkpO1xcbiAgY29uc3RyYWludC5zZXRNYXhMaW5Nb3RvckZvcmNlKHBhcmFtcy5hY2NlbGVyYXRpb24pO1xcbiAgY29uc3RyYWludC5zZXRQb3dlcmVkTGluTW90b3IodHJ1ZSk7XFxuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5zbGlkZXJfZGlzYWJsZUxpbmVhck1vdG9yID0gZnVuY3Rpb24gKHBhcmFtcykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xcbiAgY29uc3RyYWludC5zZXRQb3dlcmVkTGluTW90b3IoZmFsc2UpO1xcbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLnNsaWRlcl9lbmFibGVBbmd1bGFyTW90b3IgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XFxuICBjb25zdHJhaW50LnNldFRhcmdldEFuZ01vdG9yVmVsb2NpdHkocGFyYW1zLnZlbG9jaXR5KTtcXG4gIGNvbnN0cmFpbnQuc2V0TWF4QW5nTW90b3JGb3JjZShwYXJhbXMuYWNjZWxlcmF0aW9uKTtcXG4gIGNvbnN0cmFpbnQuc2V0UG93ZXJlZEFuZ01vdG9yKHRydWUpO1xcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XFxuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuc2xpZGVyX2Rpc2FibGVBbmd1bGFyTW90b3IgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XFxuICBjb25zdHJhaW50LnNldFBvd2VyZWRBbmdNb3RvcihmYWxzZSk7XFxuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5jb25ldHdpc3Rfc2V0TGltaXQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdLnNldExpbWl0KHBhcmFtcy56LCBwYXJhbXMueSwgcGFyYW1zLngpOyAvLyBaWVggb3JkZXJcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuY29uZXR3aXN0X2VuYWJsZU1vdG9yID0gZnVuY3Rpb24gKHBhcmFtcykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xcbiAgY29uc3RyYWludC5lbmFibGVNb3Rvcih0cnVlKTtcXG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xcbiAgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmNvbmV0d2lzdF9zZXRNYXhNb3RvckltcHVsc2UgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XFxuICBjb25zdHJhaW50LnNldE1heE1vdG9ySW1wdWxzZShwYXJhbXMubWF4X2ltcHVsc2UpO1xcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XFxuICBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuY29uZXR3aXN0X3NldE1vdG9yVGFyZ2V0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xcblxcbiAgX3F1YXQuc2V0WChwYXJhbXMueCk7XFxuICBfcXVhdC5zZXRZKHBhcmFtcy55KTtcXG4gIF9xdWF0LnNldFoocGFyYW1zLnopO1xcbiAgX3F1YXQuc2V0VyhwYXJhbXMudyk7XFxuXFxuICBjb25zdHJhaW50LnNldE1vdG9yVGFyZ2V0KF9xdWF0KTtcXG5cXG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xcbiAgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmNvbmV0d2lzdF9kaXNhYmxlTW90b3IgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XFxuICBjb25zdHJhaW50LmVuYWJsZU1vdG9yKGZhbHNlKTtcXG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xcbiAgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmRvZl9zZXRMaW5lYXJMb3dlckxpbWl0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xcblxcbiAgX3ZlYzNfMS5zZXRYKHBhcmFtcy54KTtcXG4gIF92ZWMzXzEuc2V0WShwYXJhbXMueSk7XFxuICBfdmVjM18xLnNldFoocGFyYW1zLnopO1xcblxcbiAgY29uc3RyYWludC5zZXRMaW5lYXJMb3dlckxpbWl0KF92ZWMzXzEpO1xcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XFxuXFxuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuZG9mX3NldExpbmVhclVwcGVyTGltaXQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XFxuXFxuICBfdmVjM18xLnNldFgocGFyYW1zLngpO1xcbiAgX3ZlYzNfMS5zZXRZKHBhcmFtcy55KTtcXG4gIF92ZWMzXzEuc2V0WihwYXJhbXMueik7XFxuXFxuICBjb25zdHJhaW50LnNldExpbmVhclVwcGVyTGltaXQoX3ZlYzNfMSk7XFxuICBjb25zdHJhaW50LmEuYWN0aXZhdGUoKTtcXG5cXG4gIGlmIChjb25zdHJhaW50LmIpIGNvbnN0cmFpbnQuYi5hY3RpdmF0ZSgpO1xcbn07XFxuXFxucHVibGljX2Z1bmN0aW9ucy5kb2Zfc2V0QW5ndWxhckxvd2VyTGltaXQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XFxuXFxuICBfdmVjM18xLnNldFgocGFyYW1zLngpO1xcbiAgX3ZlYzNfMS5zZXRZKHBhcmFtcy55KTtcXG4gIF92ZWMzXzEuc2V0WihwYXJhbXMueik7XFxuXFxuICBjb25zdHJhaW50LnNldEFuZ3VsYXJMb3dlckxpbWl0KF92ZWMzXzEpO1xcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XFxuXFxuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcXG59O1xcblxcbnB1YmxpY19mdW5jdGlvbnMuZG9mX3NldEFuZ3VsYXJVcHBlckxpbWl0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdO1xcblxcbiAgX3ZlYzNfMS5zZXRYKHBhcmFtcy54KTtcXG4gIF92ZWMzXzEuc2V0WShwYXJhbXMueSk7XFxuICBfdmVjM18xLnNldFoocGFyYW1zLnopO1xcblxcbiAgY29uc3RyYWludC5zZXRBbmd1bGFyVXBwZXJMaW1pdChfdmVjM18xKTtcXG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xcblxcbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmRvZl9lbmFibGVBbmd1bGFyTW90b3IgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF07XFxuXFxuICB2YXIgbW90b3IgPSBjb25zdHJhaW50LmdldFJvdGF0aW9uYWxMaW1pdE1vdG9yKHBhcmFtcy53aGljaCk7XFxuICBtb3Rvci5zZXRfbV9lbmFibGVNb3Rvcih0cnVlKTtcXG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xcblxcbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmRvZl9jb25maWd1cmVBbmd1bGFyTW90b3IgPSBmdW5jdGlvbiAocGFyYW1zKSB7XFxuICB2YXIgY29uc3RyYWludCA9IF9jb25zdHJhaW50c1twYXJhbXMuY29uc3RyYWludF0sXFxuICAgICAgbW90b3IgPSBjb25zdHJhaW50LmdldFJvdGF0aW9uYWxMaW1pdE1vdG9yKHBhcmFtcy53aGljaCk7XFxuXFxuICBtb3Rvci5zZXRfbV9sb0xpbWl0KHBhcmFtcy5sb3dfYW5nbGUpO1xcbiAgbW90b3Iuc2V0X21faGlMaW1pdChwYXJhbXMuaGlnaF9hbmdsZSk7XFxuICBtb3Rvci5zZXRfbV90YXJnZXRWZWxvY2l0eShwYXJhbXMudmVsb2NpdHkpO1xcbiAgbW90b3Iuc2V0X21fbWF4TW90b3JGb3JjZShwYXJhbXMubWF4X2ZvcmNlKTtcXG4gIGNvbnN0cmFpbnQuYS5hY3RpdmF0ZSgpO1xcblxcbiAgaWYgKGNvbnN0cmFpbnQuYikgY29uc3RyYWludC5iLmFjdGl2YXRlKCk7XFxufTtcXG5cXG5wdWJsaWNfZnVuY3Rpb25zLmRvZl9kaXNhYmxlQW5ndWxhck1vdG9yID0gZnVuY3Rpb24gKHBhcmFtcykge1xcbiAgdmFyIGNvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbcGFyYW1zLmNvbnN0cmFpbnRdLFxcbiAgICAgIG1vdG9yID0gY29uc3RyYWludC5nZXRSb3RhdGlvbmFsTGltaXRNb3RvcihwYXJhbXMud2hpY2gpO1xcblxcbiAgbW90b3Iuc2V0X21fZW5hYmxlTW90b3IoZmFsc2UpO1xcbiAgY29uc3RyYWludC5hLmFjdGl2YXRlKCk7XFxuXFxuICBpZiAoY29uc3RyYWludC5iKSBjb25zdHJhaW50LmIuYWN0aXZhdGUoKTtcXG59O1xcblxcbnZhciByZXBvcnRXb3JsZCA9IGZ1bmN0aW9uIHJlcG9ydFdvcmxkKCkge1xcbiAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFICYmIHdvcmxkcmVwb3J0Lmxlbmd0aCA8IDIgKyBfbnVtX3JpZ2lkYm9keV9vYmplY3RzICogV09STERSRVBPUlRfSVRFTVNJWkUpIHtcXG4gICAgd29ybGRyZXBvcnQgPSBuZXcgRmxvYXQzMkFycmF5KDIgLy8gbWVzc2FnZSBpZCAmICMgb2JqZWN0cyBpbiByZXBvcnRcXG4gICAgKyBNYXRoLmNlaWwoX251bV9yaWdpZGJvZHlfb2JqZWN0cyAvIFJFUE9SVF9DSFVOS1NJWkUpICogUkVQT1JUX0NIVU5LU0laRSAqIFdPUkxEUkVQT1JUX0lURU1TSVpFIC8vICMgb2YgdmFsdWVzIG5lZWRlZCAqIGl0ZW0gc2l6ZVxcbiAgICApO1xcblxcbiAgICB3b3JsZHJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuV09STERSRVBPUlQ7XFxuICB9XFxuXFxuICB3b3JsZHJlcG9ydFsxXSA9IF9udW1fcmlnaWRib2R5X29iamVjdHM7IC8vIHJlY29yZCBob3cgbWFueSBvYmplY3RzIHdlJ3JlIHJlcG9ydGluZyBvblxcblxcbiAge1xcbiAgICB2YXIgaSA9IDAsXFxuICAgICAgICBpbmRleCA9IF9vYmplY3RzLmxlbmd0aDtcXG5cXG4gICAgd2hpbGUgKGluZGV4LS0pIHtcXG4gICAgICB2YXIgb2JqZWN0ID0gX29iamVjdHNbaW5kZXhdO1xcblxcbiAgICAgIGlmIChvYmplY3QgJiYgb2JqZWN0LnR5cGUgPT09IDEpIHtcXG4gICAgICAgIC8vIFJpZ2lkQm9kaWVzLlxcbiAgICAgICAgLy8gI1RPRE86IHdlIGNhbid0IHVzZSBjZW50ZXIgb2YgbWFzcyB0cmFuc2Zvcm0gd2hlbiBjZW50ZXIgb2YgbWFzcyBjYW4gY2hhbmdlLFxcbiAgICAgICAgLy8gICAgICAgIGJ1dCBnZXRNb3Rpb25TdGF0ZSgpLmdldFdvcmxkVHJhbnNmb3JtKCkgc2NyZXdzIHVwIG9uIG9iamVjdHMgdGhhdCBoYXZlIGJlZW4gbW92ZWRcXG4gICAgICAgIC8vIG9iamVjdC5nZXRNb3Rpb25TdGF0ZSgpLmdldFdvcmxkVHJhbnNmb3JtKCB0cmFuc2Zvcm0gKTtcXG4gICAgICAgIC8vIG9iamVjdC5nZXRNb3Rpb25TdGF0ZSgpLmdldFdvcmxkVHJhbnNmb3JtKF90cmFuc2Zvcm0pO1xcblxcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IG9iamVjdC5nZXRDZW50ZXJPZk1hc3NUcmFuc2Zvcm0oKTtcXG4gICAgICAgIHZhciBvcmlnaW4gPSB0cmFuc2Zvcm0uZ2V0T3JpZ2luKCk7XFxuICAgICAgICB2YXIgcm90YXRpb24gPSB0cmFuc2Zvcm0uZ2V0Um90YXRpb24oKTtcXG5cXG4gICAgICAgIC8vIGFkZCB2YWx1ZXMgdG8gcmVwb3J0XFxuICAgICAgICB2YXIgb2Zmc2V0ID0gMiArIGkrKyAqIFdPUkxEUkVQT1JUX0lURU1TSVpFO1xcblxcbiAgICAgICAgd29ybGRyZXBvcnRbb2Zmc2V0XSA9IG9iamVjdC5pZDtcXG5cXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDFdID0gb3JpZ2luLngoKTtcXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDJdID0gb3JpZ2luLnkoKTtcXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDNdID0gb3JpZ2luLnooKTtcXG5cXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDRdID0gcm90YXRpb24ueCgpO1xcbiAgICAgICAgd29ybGRyZXBvcnRbb2Zmc2V0ICsgNV0gPSByb3RhdGlvbi55KCk7XFxuICAgICAgICB3b3JsZHJlcG9ydFtvZmZzZXQgKyA2XSA9IHJvdGF0aW9uLnooKTtcXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDddID0gcm90YXRpb24udygpO1xcblxcbiAgICAgICAgX3ZlY3RvciA9IG9iamVjdC5nZXRMaW5lYXJWZWxvY2l0eSgpO1xcbiAgICAgICAgd29ybGRyZXBvcnRbb2Zmc2V0ICsgOF0gPSBfdmVjdG9yLngoKTtcXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDldID0gX3ZlY3Rvci55KCk7XFxuICAgICAgICB3b3JsZHJlcG9ydFtvZmZzZXQgKyAxMF0gPSBfdmVjdG9yLnooKTtcXG5cXG4gICAgICAgIF92ZWN0b3IgPSBvYmplY3QuZ2V0QW5ndWxhclZlbG9jaXR5KCk7XFxuICAgICAgICB3b3JsZHJlcG9ydFtvZmZzZXQgKyAxMV0gPSBfdmVjdG9yLngoKTtcXG4gICAgICAgIHdvcmxkcmVwb3J0W29mZnNldCArIDEyXSA9IF92ZWN0b3IueSgpO1xcbiAgICAgICAgd29ybGRyZXBvcnRbb2Zmc2V0ICsgMTNdID0gX3ZlY3Rvci56KCk7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHRyYW5zZmVyYWJsZU1lc3NhZ2Uod29ybGRyZXBvcnQuYnVmZmVyLCBbd29ybGRyZXBvcnQuYnVmZmVyXSk7ZWxzZSB0cmFuc2ZlcmFibGVNZXNzYWdlKHdvcmxkcmVwb3J0KTtcXG59O1xcblxcbnZhciByZXBvcnRXb3JsZF9zb2Z0Ym9kaWVzID0gZnVuY3Rpb24gcmVwb3J0V29ybGRfc29mdGJvZGllcygpIHtcXG4gIC8vIFRPRE86IEFkZCBTVVBQT1JUVFJBTlNGRVJBQkxFLlxcblxcbiAgc29mdHJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMiAvLyBtZXNzYWdlIGlkICYgIyBvYmplY3RzIGluIHJlcG9ydFxcbiAgKyBfbnVtX3NvZnRib2R5X29iamVjdHMgKiAyICsgX3NvZnRib2R5X3JlcG9ydF9zaXplICogNik7XFxuXFxuICBzb2Z0cmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5TT0ZUUkVQT1JUO1xcbiAgc29mdHJlcG9ydFsxXSA9IF9udW1fc29mdGJvZHlfb2JqZWN0czsgLy8gcmVjb3JkIGhvdyBtYW55IG9iamVjdHMgd2UncmUgcmVwb3J0aW5nIG9uXFxuXFxuICB7XFxuICAgIHZhciBvZmZzZXQgPSAyLFxcbiAgICAgICAgaW5kZXggPSBfb2JqZWN0cy5sZW5ndGg7XFxuXFxuICAgIHdoaWxlIChpbmRleC0tKSB7XFxuICAgICAgdmFyIG9iamVjdCA9IF9vYmplY3RzW2luZGV4XTtcXG5cXG4gICAgICBpZiAob2JqZWN0ICYmIG9iamVjdC50eXBlID09PSAwKSB7XFxuICAgICAgICAvLyBTb2Z0Qm9kaWVzLlxcblxcbiAgICAgICAgc29mdHJlcG9ydFtvZmZzZXRdID0gb2JqZWN0LmlkO1xcblxcbiAgICAgICAgdmFyIG9mZnNldFZlcnQgPSBvZmZzZXQgKyAyO1xcblxcbiAgICAgICAgaWYgKG9iamVjdC5yb3BlID09PSB0cnVlKSB7XFxuICAgICAgICAgIHZhciBub2RlcyA9IG9iamVjdC5nZXRfbV9ub2RlcygpO1xcbiAgICAgICAgICB2YXIgc2l6ZSA9IG5vZGVzLnNpemUoKTtcXG4gICAgICAgICAgc29mdHJlcG9ydFtvZmZzZXQgKyAxXSA9IHNpemU7XFxuXFxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XFxuICAgICAgICAgICAgdmFyIG5vZGUgPSBub2Rlcy5hdChpKTtcXG4gICAgICAgICAgICB2YXIgdmVydCA9IG5vZGUuZ2V0X21feCgpO1xcbiAgICAgICAgICAgIHZhciBvZmYgPSBvZmZzZXRWZXJ0ICsgaSAqIDM7XFxuXFxuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmZdID0gdmVydC54KCk7XFxuICAgICAgICAgICAgc29mdHJlcG9ydFtvZmYgKyAxXSA9IHZlcnQueSgpO1xcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbb2ZmICsgMl0gPSB2ZXJ0LnooKTtcXG4gICAgICAgICAgfVxcblxcbiAgICAgICAgICBvZmZzZXQgKz0gc2l6ZSAqIDYgKyAyO1xcbiAgICAgICAgfSBlbHNlIGlmIChvYmplY3QuY2xvdGgpIHtcXG4gICAgICAgICAgdmFyIF9ub2RlcyA9IG9iamVjdC5nZXRfbV9ub2RlcygpO1xcbiAgICAgICAgICB2YXIgX3NpemUgPSBfbm9kZXMuc2l6ZSgpO1xcbiAgICAgICAgICBzb2Z0cmVwb3J0W29mZnNldCArIDFdID0gX3NpemU7XFxuXFxuICAgICAgICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IF9zaXplOyBfaTMrKykge1xcbiAgICAgICAgICAgIHZhciBfbm9kZSA9IF9ub2Rlcy5hdChfaTMpO1xcbiAgICAgICAgICAgIHZhciBfdmVydCA9IF9ub2RlLmdldF9tX3goKTtcXG4gICAgICAgICAgICB2YXIgbm9ybWFsID0gX25vZGUuZ2V0X21fbigpO1xcbiAgICAgICAgICAgIHZhciBfb2ZmID0gb2Zmc2V0VmVydCArIF9pMyAqIDY7XFxuXFxuICAgICAgICAgICAgc29mdHJlcG9ydFtfb2ZmXSA9IF92ZXJ0LngoKTtcXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYgKyAxXSA9IF92ZXJ0LnkoKTtcXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYgKyAyXSA9IF92ZXJ0LnooKTtcXG5cXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYgKyAzXSA9IG5vcm1hbC54KCk7XFxuICAgICAgICAgICAgc29mdHJlcG9ydFtfb2ZmICsgNF0gPSBub3JtYWwueSgpO1xcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZiArIDVdID0gbm9ybWFsLnooKTtcXG4gICAgICAgICAgfVxcblxcbiAgICAgICAgICBvZmZzZXQgKz0gX3NpemUgKiA2ICsgMjtcXG4gICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgIHZhciBmYWNlcyA9IG9iamVjdC5nZXRfbV9mYWNlcygpO1xcbiAgICAgICAgICB2YXIgX3NpemUyID0gZmFjZXMuc2l6ZSgpO1xcbiAgICAgICAgICBzb2Z0cmVwb3J0W29mZnNldCArIDFdID0gX3NpemUyO1xcblxcbiAgICAgICAgICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCBfc2l6ZTI7IF9pNCsrKSB7XFxuICAgICAgICAgICAgdmFyIGZhY2UgPSBmYWNlcy5hdChfaTQpO1xcblxcbiAgICAgICAgICAgIHZhciBub2RlMSA9IGZhY2UuZ2V0X21fbigwKTtcXG4gICAgICAgICAgICB2YXIgbm9kZTIgPSBmYWNlLmdldF9tX24oMSk7XFxuICAgICAgICAgICAgdmFyIG5vZGUzID0gZmFjZS5nZXRfbV9uKDIpO1xcblxcbiAgICAgICAgICAgIHZhciB2ZXJ0MSA9IG5vZGUxLmdldF9tX3goKTtcXG4gICAgICAgICAgICB2YXIgdmVydDIgPSBub2RlMi5nZXRfbV94KCk7XFxuICAgICAgICAgICAgdmFyIHZlcnQzID0gbm9kZTMuZ2V0X21feCgpO1xcblxcbiAgICAgICAgICAgIHZhciBub3JtYWwxID0gbm9kZTEuZ2V0X21fbigpO1xcbiAgICAgICAgICAgIHZhciBub3JtYWwyID0gbm9kZTIuZ2V0X21fbigpO1xcbiAgICAgICAgICAgIHZhciBub3JtYWwzID0gbm9kZTMuZ2V0X21fbigpO1xcblxcbiAgICAgICAgICAgIHZhciBfb2ZmMiA9IG9mZnNldFZlcnQgKyBfaTQgKiAxODtcXG5cXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYyXSA9IHZlcnQxLngoKTtcXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYyICsgMV0gPSB2ZXJ0MS55KCk7XFxuICAgICAgICAgICAgc29mdHJlcG9ydFtfb2ZmMiArIDJdID0gdmVydDEueigpO1xcblxcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyAzXSA9IG5vcm1hbDEueCgpO1xcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyA0XSA9IG5vcm1hbDEueSgpO1xcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyA1XSA9IG5vcm1hbDEueigpO1xcblxcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyA2XSA9IHZlcnQyLngoKTtcXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYyICsgN10gPSB2ZXJ0Mi55KCk7XFxuICAgICAgICAgICAgc29mdHJlcG9ydFtfb2ZmMiArIDhdID0gdmVydDIueigpO1xcblxcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyA5XSA9IG5vcm1hbDIueCgpO1xcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyAxMF0gPSBub3JtYWwyLnkoKTtcXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYyICsgMTFdID0gbm9ybWFsMi56KCk7XFxuXFxuICAgICAgICAgICAgc29mdHJlcG9ydFtfb2ZmMiArIDEyXSA9IHZlcnQzLngoKTtcXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYyICsgMTNdID0gdmVydDMueSgpO1xcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyAxNF0gPSB2ZXJ0My56KCk7XFxuXFxuICAgICAgICAgICAgc29mdHJlcG9ydFtfb2ZmMiArIDE1XSA9IG5vcm1hbDMueCgpO1xcbiAgICAgICAgICAgIHNvZnRyZXBvcnRbX29mZjIgKyAxNl0gPSBub3JtYWwzLnkoKTtcXG4gICAgICAgICAgICBzb2Z0cmVwb3J0W19vZmYyICsgMTddID0gbm9ybWFsMy56KCk7XFxuICAgICAgICAgIH1cXG5cXG4gICAgICAgICAgb2Zmc2V0ICs9IF9zaXplMiAqIDE4ICsgMjtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG5cXG4gIC8vIGlmIChTVVBQT1JUX1RSQU5TRkVSQUJMRSkgdHJhbnNmZXJhYmxlTWVzc2FnZShzb2Z0cmVwb3J0LmJ1ZmZlciwgW3NvZnRyZXBvcnQuYnVmZmVyXSk7XFxuICAvLyBlbHNlIHRyYW5zZmVyYWJsZU1lc3NhZ2Uoc29mdHJlcG9ydCk7XFxuICB0cmFuc2ZlcmFibGVNZXNzYWdlKHNvZnRyZXBvcnQpO1xcbn07XFxuXFxudmFyIHJlcG9ydENvbGxpc2lvbnMgPSBmdW5jdGlvbiByZXBvcnRDb2xsaXNpb25zKCkge1xcbiAgdmFyIGRwID0gd29ybGQuZ2V0RGlzcGF0Y2hlcigpLFxcbiAgICAgIG51bSA9IGRwLmdldE51bU1hbmlmb2xkcygpO1xcbiAgLy8gX2NvbGxpZGVkID0gZmFsc2U7XFxuXFxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHtcXG4gICAgaWYgKGNvbGxpc2lvbnJlcG9ydC5sZW5ndGggPCAyICsgbnVtICogQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFKSB7XFxuICAgICAgY29sbGlzaW9ucmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheSgyIC8vIG1lc3NhZ2UgaWQgJiAjIG9iamVjdHMgaW4gcmVwb3J0XFxuICAgICAgKyBNYXRoLmNlaWwoX251bV9vYmplY3RzIC8gUkVQT1JUX0NIVU5LU0laRSkgKiBSRVBPUlRfQ0hVTktTSVpFICogQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFIC8vICMgb2YgdmFsdWVzIG5lZWRlZCAqIGl0ZW0gc2l6ZVxcbiAgICAgICk7XFxuICAgICAgY29sbGlzaW9ucmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5DT0xMSVNJT05SRVBPUlQ7XFxuICAgIH1cXG4gIH1cXG5cXG4gIGNvbGxpc2lvbnJlcG9ydFsxXSA9IDA7IC8vIGhvdyBtYW55IGNvbGxpc2lvbnMgd2UncmUgcmVwb3J0aW5nIG9uXFxuXFxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bTsgaSsrKSB7XFxuICAgIHZhciBtYW5pZm9sZCA9IGRwLmdldE1hbmlmb2xkQnlJbmRleEludGVybmFsKGkpLFxcbiAgICAgICAgbnVtX2NvbnRhY3RzID0gbWFuaWZvbGQuZ2V0TnVtQ29udGFjdHMoKTtcXG5cXG4gICAgaWYgKG51bV9jb250YWN0cyA9PT0gMCkgY29udGludWU7XFxuXFxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgbnVtX2NvbnRhY3RzOyBqKyspIHtcXG4gICAgICB2YXIgcHQgPSBtYW5pZm9sZC5nZXRDb250YWN0UG9pbnQoaik7XFxuXFxuICAgICAgLy8gaWYgKCBwdC5nZXREaXN0YW5jZSgpIDwgMCApIHtcXG4gICAgICB2YXIgb2Zmc2V0ID0gMiArIGNvbGxpc2lvbnJlcG9ydFsxXSsrICogQ09MTElTSU9OUkVQT1JUX0lURU1TSVpFO1xcbiAgICAgIGNvbGxpc2lvbnJlcG9ydFtvZmZzZXRdID0gX29iamVjdHNfYW1tb1ttYW5pZm9sZC5nZXRCb2R5MCgpLnB0cl07XFxuICAgICAgY29sbGlzaW9ucmVwb3J0W29mZnNldCArIDFdID0gX29iamVjdHNfYW1tb1ttYW5pZm9sZC5nZXRCb2R5MSgpLnB0cl07XFxuXFxuICAgICAgX3ZlY3RvciA9IHB0LmdldF9tX25vcm1hbFdvcmxkT25CKCk7XFxuICAgICAgY29sbGlzaW9ucmVwb3J0W29mZnNldCArIDJdID0gX3ZlY3Rvci54KCk7XFxuICAgICAgY29sbGlzaW9ucmVwb3J0W29mZnNldCArIDNdID0gX3ZlY3Rvci55KCk7XFxuICAgICAgY29sbGlzaW9ucmVwb3J0W29mZnNldCArIDRdID0gX3ZlY3Rvci56KCk7XFxuICAgICAgYnJlYWs7XFxuICAgICAgLy8gfVxcbiAgICAgIC8vIHRyYW5zZmVyYWJsZU1lc3NhZ2UoX29iamVjdHNfYW1tbyk7XFxuICAgIH1cXG4gIH1cXG5cXG4gIGlmIChTVVBQT1JUX1RSQU5TRkVSQUJMRSkgdHJhbnNmZXJhYmxlTWVzc2FnZShjb2xsaXNpb25yZXBvcnQuYnVmZmVyLCBbY29sbGlzaW9ucmVwb3J0LmJ1ZmZlcl0pO2Vsc2UgdHJhbnNmZXJhYmxlTWVzc2FnZShjb2xsaXNpb25yZXBvcnQpO1xcbn07XFxuXFxudmFyIHJlcG9ydFZlaGljbGVzID0gZnVuY3Rpb24gcmVwb3J0VmVoaWNsZXMoKSB7XFxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHtcXG4gICAgaWYgKHZlaGljbGVyZXBvcnQubGVuZ3RoIDwgMiArIF9udW1fd2hlZWxzICogVkVISUNMRVJFUE9SVF9JVEVNU0laRSkge1xcbiAgICAgIHZlaGljbGVyZXBvcnQgPSBuZXcgRmxvYXQzMkFycmF5KDIgLy8gbWVzc2FnZSBpZCAmICMgb2JqZWN0cyBpbiByZXBvcnRcXG4gICAgICArIE1hdGguY2VpbChfbnVtX3doZWVscyAvIFJFUE9SVF9DSFVOS1NJWkUpICogUkVQT1JUX0NIVU5LU0laRSAqIFZFSElDTEVSRVBPUlRfSVRFTVNJWkUgLy8gIyBvZiB2YWx1ZXMgbmVlZGVkICogaXRlbSBzaXplXFxuICAgICAgKTtcXG4gICAgICB2ZWhpY2xlcmVwb3J0WzBdID0gTUVTU0FHRV9UWVBFUy5WRUhJQ0xFUkVQT1JUO1xcbiAgICB9XFxuICB9XFxuXFxuICB7XFxuICAgIHZhciBpID0gMCxcXG4gICAgICAgIGogPSAwLFxcbiAgICAgICAgaW5kZXggPSBfdmVoaWNsZXMubGVuZ3RoO1xcblxcbiAgICB3aGlsZSAoaW5kZXgtLSkge1xcbiAgICAgIGlmIChfdmVoaWNsZXNbaW5kZXhdKSB7XFxuICAgICAgICB2YXIgdmVoaWNsZSA9IF92ZWhpY2xlc1tpbmRleF07XFxuXFxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgdmVoaWNsZS5nZXROdW1XaGVlbHMoKTsgaisrKSB7XFxuICAgICAgICAgIC8vIHZlaGljbGUudXBkYXRlV2hlZWxUcmFuc2Zvcm0oIGosIHRydWUgKTtcXG4gICAgICAgICAgLy8gdHJhbnNmb3JtID0gdmVoaWNsZS5nZXRXaGVlbFRyYW5zZm9ybVdTKCBqICk7XFxuICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSB2ZWhpY2xlLmdldFdoZWVsSW5mbyhqKS5nZXRfbV93b3JsZFRyYW5zZm9ybSgpO1xcblxcbiAgICAgICAgICB2YXIgb3JpZ2luID0gdHJhbnNmb3JtLmdldE9yaWdpbigpO1xcbiAgICAgICAgICB2YXIgcm90YXRpb24gPSB0cmFuc2Zvcm0uZ2V0Um90YXRpb24oKTtcXG5cXG4gICAgICAgICAgLy8gYWRkIHZhbHVlcyB0byByZXBvcnRcXG4gICAgICAgICAgdmFyIG9mZnNldCA9IDEgKyBpKysgKiBWRUhJQ0xFUkVQT1JUX0lURU1TSVpFO1xcblxcbiAgICAgICAgICB2ZWhpY2xlcmVwb3J0W29mZnNldF0gPSBpbmRleDtcXG4gICAgICAgICAgdmVoaWNsZXJlcG9ydFtvZmZzZXQgKyAxXSA9IGo7XFxuXFxuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgMl0gPSBvcmlnaW4ueCgpO1xcbiAgICAgICAgICB2ZWhpY2xlcmVwb3J0W29mZnNldCArIDNdID0gb3JpZ2luLnkoKTtcXG4gICAgICAgICAgdmVoaWNsZXJlcG9ydFtvZmZzZXQgKyA0XSA9IG9yaWdpbi56KCk7XFxuXFxuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgNV0gPSByb3RhdGlvbi54KCk7XFxuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgNl0gPSByb3RhdGlvbi55KCk7XFxuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgN10gPSByb3RhdGlvbi56KCk7XFxuICAgICAgICAgIHZlaGljbGVyZXBvcnRbb2Zmc2V0ICsgOF0gPSByb3RhdGlvbi53KCk7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICB9XFxuXFxuICAgIGlmIChTVVBQT1JUX1RSQU5TRkVSQUJMRSAmJiBqICE9PSAwKSB0cmFuc2ZlcmFibGVNZXNzYWdlKHZlaGljbGVyZXBvcnQuYnVmZmVyLCBbdmVoaWNsZXJlcG9ydC5idWZmZXJdKTtlbHNlIGlmIChqICE9PSAwKSB0cmFuc2ZlcmFibGVNZXNzYWdlKHZlaGljbGVyZXBvcnQpO1xcbiAgfVxcbn07XFxuXFxudmFyIHJlcG9ydENvbnN0cmFpbnRzID0gZnVuY3Rpb24gcmVwb3J0Q29uc3RyYWludHMoKSB7XFxuICBpZiAoU1VQUE9SVF9UUkFOU0ZFUkFCTEUpIHtcXG4gICAgaWYgKGNvbnN0cmFpbnRyZXBvcnQubGVuZ3RoIDwgMiArIF9udW1fY29uc3RyYWludHMgKiBDT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFKSB7XFxuICAgICAgY29uc3RyYWludHJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoMiAvLyBtZXNzYWdlIGlkICYgIyBvYmplY3RzIGluIHJlcG9ydFxcbiAgICAgICsgTWF0aC5jZWlsKF9udW1fY29uc3RyYWludHMgLyBSRVBPUlRfQ0hVTktTSVpFKSAqIFJFUE9SVF9DSFVOS1NJWkUgKiBDT05TVFJBSU5UUkVQT1JUX0lURU1TSVpFIC8vICMgb2YgdmFsdWVzIG5lZWRlZCAqIGl0ZW0gc2l6ZVxcbiAgICAgICk7XFxuICAgICAgY29uc3RyYWludHJlcG9ydFswXSA9IE1FU1NBR0VfVFlQRVMuQ09OU1RSQUlOVFJFUE9SVDtcXG4gICAgfVxcbiAgfVxcblxcbiAge1xcbiAgICB2YXIgb2Zmc2V0ID0gMCxcXG4gICAgICAgIGkgPSAwLFxcbiAgICAgICAgaW5kZXggPSBfY29uc3RyYWludHMubGVuZ2h0O1xcblxcbiAgICB3aGlsZSAoaW5kZXgtLSkge1xcbiAgICAgIGlmIChfY29uc3RyYWludHNbaW5kZXhdKSB7XFxuICAgICAgICB2YXIgX2NvbnN0cmFpbnQgPSBfY29uc3RyYWludHNbaW5kZXhdO1xcbiAgICAgICAgdmFyIG9mZnNldF9ib2R5ID0gX2NvbnN0cmFpbnQuYTtcXG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSBfY29uc3RyYWludC50YTtcXG4gICAgICAgIHZhciBvcmlnaW4gPSB0cmFuc2Zvcm0uZ2V0T3JpZ2luKCk7XFxuXFxuICAgICAgICAvLyBhZGQgdmFsdWVzIHRvIHJlcG9ydFxcbiAgICAgICAgb2Zmc2V0ID0gMSArIGkrKyAqIENPTlNUUkFJTlRSRVBPUlRfSVRFTVNJWkU7XFxuXFxuICAgICAgICBjb25zdHJhaW50cmVwb3J0W29mZnNldF0gPSBpbmRleDtcXG4gICAgICAgIGNvbnN0cmFpbnRyZXBvcnRbb2Zmc2V0ICsgMV0gPSBvZmZzZXRfYm9keS5pZDtcXG4gICAgICAgIGNvbnN0cmFpbnRyZXBvcnRbb2Zmc2V0ICsgMl0gPSBvcmlnaW4ueDtcXG4gICAgICAgIGNvbnN0cmFpbnRyZXBvcnRbb2Zmc2V0ICsgM10gPSBvcmlnaW4ueTtcXG4gICAgICAgIGNvbnN0cmFpbnRyZXBvcnRbb2Zmc2V0ICsgNF0gPSBvcmlnaW4uejtcXG4gICAgICAgIGNvbnN0cmFpbnRyZXBvcnRbb2Zmc2V0ICsgNV0gPSBfY29uc3RyYWludC5nZXRCcmVha2luZ0ltcHVsc2VUaHJlc2hvbGQoKTtcXG4gICAgICB9XFxuICAgIH1cXG5cXG4gICAgaWYgKFNVUFBPUlRfVFJBTlNGRVJBQkxFICYmIGkgIT09IDApIHRyYW5zZmVyYWJsZU1lc3NhZ2UoY29uc3RyYWludHJlcG9ydC5idWZmZXIsIFtjb25zdHJhaW50cmVwb3J0LmJ1ZmZlcl0pO2Vsc2UgaWYgKGkgIT09IDApIHRyYW5zZmVyYWJsZU1lc3NhZ2UoY29uc3RyYWludHJlcG9ydCk7XFxuICB9XFxufTtcXG5cXG5zZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xcbiAgaWYgKGV2ZW50LmRhdGEgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIHtcXG4gICAgLy8gdHJhbnNmZXJhYmxlIG9iamVjdFxcbiAgICBzd2l0Y2ggKGV2ZW50LmRhdGFbMF0pIHtcXG4gICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuV09STERSRVBPUlQ6XFxuICAgICAgICB7XFxuICAgICAgICAgIHdvcmxkcmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheShldmVudC5kYXRhKTtcXG4gICAgICAgICAgYnJlYWs7XFxuICAgICAgICB9XFxuICAgICAgY2FzZSBNRVNTQUdFX1RZUEVTLkNPTExJU0lPTlJFUE9SVDpcXG4gICAgICAgIHtcXG4gICAgICAgICAgY29sbGlzaW9ucmVwb3J0ID0gbmV3IEZsb2F0MzJBcnJheShldmVudC5kYXRhKTtcXG4gICAgICAgICAgYnJlYWs7XFxuICAgICAgICB9XFxuICAgICAgY2FzZSBNRVNTQUdFX1RZUEVTLlZFSElDTEVSRVBPUlQ6XFxuICAgICAgICB7XFxuICAgICAgICAgIHZlaGljbGVyZXBvcnQgPSBuZXcgRmxvYXQzMkFycmF5KGV2ZW50LmRhdGEpO1xcbiAgICAgICAgICBicmVhaztcXG4gICAgICAgIH1cXG4gICAgICBjYXNlIE1FU1NBR0VfVFlQRVMuQ09OU1RSQUlOVFJFUE9SVDpcXG4gICAgICAgIHtcXG4gICAgICAgICAgY29uc3RyYWludHJlcG9ydCA9IG5ldyBGbG9hdDMyQXJyYXkoZXZlbnQuZGF0YSk7XFxuICAgICAgICAgIGJyZWFrO1xcbiAgICAgICAgfVxcbiAgICAgIGRlZmF1bHQ6XFxuICAgIH1cXG5cXG4gICAgcmV0dXJuO1xcbiAgfSBlbHNlIGlmIChldmVudC5kYXRhLmNtZCAmJiBwdWJsaWNfZnVuY3Rpb25zW2V2ZW50LmRhdGEuY21kXSkgcHVibGljX2Z1bmN0aW9uc1tldmVudC5kYXRhLmNtZF0oZXZlbnQuZGF0YS5wYXJhbXMpO1xcbn07XFxuXFxuLyoqKi8gfVxcbi8qKioqKiovIF0pO1xcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdOemhtTVROa01qWmhPVEV5TW1NeFpUWmhObUVpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDNkdmNtdGxjaTVxY3lKZExDSnVZVzFsY3lJNld5SjBjbUZ1YzJabGNtRmliR1ZOWlhOellXZGxJaXdpYzJWc1ppSXNJbmRsWW10cGRGQnZjM1JOWlhOellXZGxJaXdpY0c5emRFMWxjM05oWjJVaUxDSk5SVk5UUVVkRlgxUlpVRVZUSWl3aVYwOVNURVJTUlZCUFVsUWlMQ0pEVDB4TVNWTkpUMDVTUlZCUFVsUWlMQ0pXUlVoSlEweEZVa1ZRVDFKVUlpd2lRMDlPVTFSU1FVbE9WRkpGVUU5U1ZDSXNJbE5QUmxSU1JWQlBVbFFpTENKZmIySnFaV04wSWl3aVgzWmxZM1J2Y2lJc0lsOTBjbUZ1YzJadmNtMGlMQ0pmZEhKaGJuTm1iM0p0WDNCdmN5SXNJbDl6YjJaMFltOWtlVjlsYm1GaWJHVmtJaXdpYkdGemRGOXphVzExYkdGMGFXOXVYMlIxY21GMGFXOXVJaXdpWDI1MWJWOXZZbXBsWTNSeklpd2lYMjUxYlY5eWFXZHBaR0p2WkhsZmIySnFaV04wY3lJc0lsOXVkVzFmYzI5bWRHSnZaSGxmYjJKcVpXTjBjeUlzSWw5dWRXMWZkMmhsWld4eklpd2lYMjUxYlY5amIyNXpkSEpoYVc1MGN5SXNJbDl6YjJaMFltOWtlVjl5WlhCdmNuUmZjMmw2WlNJc0ltWnBlR1ZrVkdsdFpWTjBaWEFpTENKc1lYTjBYM05wYlhWc1lYUnBiMjVmZEdsdFpTSXNJbmR2Y214a0lpd2lYM1psWXpOZk1TSXNJbDkyWldNelh6SWlMQ0pmZG1Wak0xOHpJaXdpWDNGMVlYUWlMQ0p3ZFdKc2FXTmZablZ1WTNScGIyNXpJaXdpWDI5aWFtVmpkSE1pTENKZmRtVm9hV05zWlhNaUxDSmZZMjl1YzNSeVlXbHVkSE1pTENKZmIySnFaV04wYzE5aGJXMXZJaXdpWDI5aWFtVmpkRjl6YUdGd1pYTWlMQ0pmYlc5MGFXOXVYM04wWVhSbGN5SXNJbDl1YjI1allXTm9aV1JmYzJoaGNHVnpJaXdpWDJOdmJYQnZkVzVrWDNOb1lYQmxjeUlzSWxKRlVFOVNWRjlEU0ZWT1MxTkpXa1VpTENKM2IzSnNaSEpsY0c5eWRDSXNJbk52Wm5SeVpYQnZjblFpTENKamIyeHNhWE5wYjI1eVpYQnZjblFpTENKMlpXaHBZMnhsY21Wd2IzSjBJaXdpWTI5dWMzUnlZV2x1ZEhKbGNHOXlkQ0lzSWxkUFVreEVVa1ZRVDFKVVgwbFVSVTFUU1ZwRklpd2lRMDlNVEVsVFNVOU9Va1ZRVDFKVVgwbFVSVTFUU1ZwRklpd2lWa1ZJU1VOTVJWSkZVRTlTVkY5SlZFVk5VMGxhUlNJc0lrTlBUbE5VVWtGSlRsUlNSVkJQVWxSZlNWUkZUVk5KV2tVaUxDSmhZaUlzSWtGeWNtRjVRblZtWm1WeUlpd2lVMVZRVUU5U1ZGOVVVa0ZPVTBaRlVrRkNURVVpTENKaWVYUmxUR1Z1WjNSb0lpd2laMlYwVTJoaGNHVkdjbTl0UTJGamFHVWlMQ0pqWVdOb1pWOXJaWGtpTENKMWJtUmxabWx1WldRaUxDSnpaWFJUYUdGd1pVTmhZMmhsSWl3aWMyaGhjR1VpTENKamNtVmhkR1ZUYUdGd1pTSXNJbVJsYzJOeWFYQjBhVzl1SWl3aWMyVjBTV1JsYm5ScGRIa2lMQ0owZVhCbElpd2lRVzF0YnlJc0ltSjBRMjl0Y0c5MWJtUlRhR0Z3WlNJc0ltNXZjbTFoYkNJc0luZ2lMQ0o1SWl3aWVpSXNJbk5sZEZnaUxDSnpaWFJaSWl3aWMyVjBXaUlzSW1KMFUzUmhkR2xqVUd4aGJtVlRhR0Z3WlNJc0luZHBaSFJvSWl3aWFHVnBaMmgwSWl3aVpHVndkR2dpTENKaWRFSnZlRk5vWVhCbElpd2ljbUZrYVhWeklpd2lZblJUY0dobGNtVlRhR0Z3WlNJc0ltSjBRM2xzYVc1a1pYSlRhR0Z3WlNJc0ltSjBRMkZ3YzNWc1pWTm9ZWEJsSWl3aVluUkRiMjVsVTJoaGNHVWlMQ0owY21saGJtZHNaVjl0WlhOb0lpd2lZblJVY21saGJtZHNaVTFsYzJnaUxDSmtZWFJoSWl3aWJHVnVaM1JvSWl3aWFTSXNJbUZrWkZSeWFXRnVaMnhsSWl3aVluUkNkbWhVY21saGJtZHNaVTFsYzJoVGFHRndaU0lzSW1sa0lpd2lZblJEYjI1MlpYaElkV3hzVTJoaGNHVWlMQ0poWkdSUWIybHVkQ0lzSW5od2RITWlMQ0o1Y0hSeklpd2ljRzlwYm5Seklpd2ljSFJ5SWl3aVgyMWhiR3h2WXlJc0luQWlMQ0p3TWlJc0ltb2lMQ0pJUlVGUVJqTXlJaXdpWW5SSVpXbG5hSFJtYVdWc1pGUmxjbkpoYVc1VGFHRndaU0lzSW1GaWMwMWhlRWhsYVdkb2RDSXNJbU55WldGMFpWTnZablJDYjJSNUlpd2lZbTlrZVNJc0luTnZablJDYjJSNVNHVnNjR1Z5Y3lJc0ltSjBVMjltZEVKdlpIbElaV3h3WlhKeklpd2lZVlpsY25ScFkyVnpJaXdpUTNKbFlYUmxSbkp2YlZSeWFVMWxjMmdpTENKblpYUlhiM0pzWkVsdVptOGlMQ0poU1c1a2FXTmxjeUlzSW1OeUlpd2lZMjl5Ym1WeWN5SXNJa055WldGMFpWQmhkR05vSWl3aVluUldaV04wYjNJeklpd2ljMlZuYldWdWRITWlMQ0pEY21WaGRHVlNiM0JsSWl3aWFXNXBkQ0lzSW5CaGNtRnRjeUlzSW5kaGMyMUNkV1ptWlhJaUxDSnBiWEJ2Y25SVFkzSnBjSFJ6SWl3aVlXMXRieUlzSW14dllXUkJiVzF2Um5KdmJVSnBibUZ5ZVNJc0ltTnRaQ0lzSW0xaGEyVlhiM0pzWkNJc0ltSjBWSEpoYm5ObWIzSnRJaXdpWW5SUmRXRjBaWEp1YVc5dUlpd2ljbVZ3YjNKMGMybDZaU0lzSWtac2IyRjBNekpCY25KaGVTSXNJbU52Ykd4cGMybHZia052Ym1acFozVnlZWFJwYjI0aUxDSnpiMlowWW05a2VTSXNJbUowVTI5bWRFSnZaSGxTYVdkcFpFSnZaSGxEYjJ4c2FYTnBiMjVEYjI1bWFXZDFjbUYwYVc5dUlpd2lZblJFWldaaGRXeDBRMjlzYkdsemFXOXVRMjl1Wm1sbmRYSmhkR2x2YmlJc0ltUnBjM0JoZEdOb1pYSWlMQ0ppZEVOdmJHeHBjMmx2YmtScGMzQmhkR05vWlhJaUxDSnpiMngyWlhJaUxDSmlkRk5sY1hWbGJuUnBZV3hKYlhCMWJITmxRMjl1YzNSeVlXbHVkRk52YkhabGNpSXNJbUp5YjJGa2NHaGhjMlVpTENKaFlXSmliV2x1SWl3aVlXRmlZbTFoZUNJc0ltSjBRWGhwYzFOM1pXVndNeUlzSW1KMFJHSjJkRUp5YjJGa2NHaGhjMlVpTENKaWRGTnZablJTYVdkcFpFUjVibUZ0YVdOelYyOXliR1FpTENKaWRFUmxabUYxYkhSVGIyWjBRbTlrZVZOdmJIWmxjaUlzSW1KMFJHbHpZM0psZEdWRWVXNWhiV2xqYzFkdmNteGtJaXdpYzJWMFJtbDRaV1JVYVcxbFUzUmxjQ0lzSW5ObGRFZHlZWFpwZEhraUxDSmhjSEJsYm1SQmJtTm9iM0lpTENKdlltb2lMQ0p1YjJSbElpd2liMkpxTWlJc0ltTnZiR3hwYzJsdmJrSmxkSGRsWlc1TWFXNXJaV1JDYjJScFpYTWlMQ0pwYm1ac2RXVnVZMlVpTENKaFpHUlBZbXBsWTNRaUxDSnRiM1JwYjI1VGRHRjBaU0lzSW1sdVpHVjRUMllpTENKellrTnZibVpwWnlJc0ltZGxkRjl0WDJObVp5SXNJblpwZEdWeVlYUnBiMjV6SWl3aWMyVjBYM1pwZEdWeVlYUnBiMjV6SWl3aWNHbDBaWEpoZEdsdmJuTWlMQ0p6WlhSZmNHbDBaWEpoZEdsdmJuTWlMQ0prYVhSbGNtRjBhVzl1Y3lJc0luTmxkRjlrYVhSbGNtRjBhVzl1Y3lJc0ltTnBkR1Z5WVhScGIyNXpJaXdpYzJWMFgyTnBkR1Z5WVhScGIyNXpJaXdpYzJWMFgyTnZiR3hwYzJsdmJuTWlMQ0p6WlhSZmEwUkdJaXdpWm5KcFkzUnBiMjRpTENKelpYUmZhMFJRSWl3aVpHRnRjR2x1WnlJc0luQnlaWE56ZFhKbElpd2ljMlYwWDJ0UVVpSXNJbVJ5WVdjaUxDSnpaWFJmYTBSSElpd2liR2xtZENJc0luTmxkRjlyVEVZaUxDSmhibU5vYjNKSVlYSmtibVZ6Y3lJc0luTmxkRjlyUVVoU0lpd2ljbWxuYVdSSVlYSmtibVZ6Y3lJc0luTmxkRjlyUTBoU0lpd2lhMnh6ZENJc0ltZGxkRjl0WDIxaGRHVnlhV0ZzY3lJc0ltRjBJaXdpYzJWMFgyMWZhMHhUVkNJc0ltdGhjM1FpTENKelpYUmZiVjlyUVZOVUlpd2lhM1p6ZENJc0luTmxkRjl0WDJ0V1UxUWlMQ0pqWVhOMFQySnFaV04wSWl3aVluUkRiMnhzYVhOcGIyNVBZbXBsWTNRaUxDSm5aWFJEYjJ4c2FYTnBiMjVUYUdGd1pTSXNJbk5sZEUxaGNtZHBiaUlzSW0xaGNtZHBiaUlzSW5ObGRFRmpkR2wyWVhScGIyNVRkR0YwWlNJc0luTjBZWFJsSWl3aWNtOXdaU0lzSW1Oc2IzUm9JaXdpY0c5emFYUnBiMjRpTENKelpYUlBjbWxuYVc0aUxDSnliM1JoZEdsdmJpSXNJbk5sZEZjaUxDSjNJaXdpYzJWMFVtOTBZWFJwYjI0aUxDSjBjbUZ1YzJadmNtMGlMQ0p6WlhSVWIzUmhiRTFoYzNNaUxDSnRZWE56SWl3aVlXUmtVMjltZEVKdlpIa2lMQ0puWlhSZmJWOW1ZV05sY3lJc0luTnBlbVVpTENKblpYUmZiVjl1YjJSbGN5SXNJbU5vYVd4a2NtVnVJaXdpWTI5dGNHOTFibVJmYzJoaGNHVWlMQ0poWkdSRGFHbHNaRk5vWVhCbElpd2lYMk5vYVd4a0lpd2lkSEpoYm5NaUxDSndiM05wZEdsdmJsOXZabVp6WlhRaUxDSmtaWE4wY205NUlpd2ljMk5oYkdVaUxDSnpaWFJNYjJOaGJGTmpZV3hwYm1jaUxDSmpZV3hqZFd4aGRHVk1iMk5oYkVsdVpYSjBhV0VpTENKaWRFUmxabUYxYkhSTmIzUnBiMjVUZEdGMFpTSXNJbkppU1c1bWJ5SXNJbUowVW1sbmFXUkNiMlI1UTI5dWMzUnlkV04wYVc5dVNXNW1ieUlzSW5ObGRGOXRYMlp5YVdOMGFXOXVJaXdpYzJWMFgyMWZjbVZ6ZEdsMGRYUnBiMjRpTENKeVpYTjBhWFIxZEdsdmJpSXNJbk5sZEY5dFgyeHBibVZoY2tSaGJYQnBibWNpTENKelpYUmZiVjloYm1kMWJHRnlSR0Z0Y0dsdVp5SXNJbUowVW1sbmFXUkNiMlI1SWl3aVkyOXNiR2x6YVc5dVgyWnNZV2R6SWl3aWMyVjBRMjlzYkdsemFXOXVSbXhoWjNNaUxDSm5jbTkxY0NJc0ltMWhjMnNpTENKaFpHUlNhV2RwWkVKdlpIa2lMQ0poWTNScGRtRjBaU0lzSW1FaUxDSmhaR1JXWldocFkyeGxJaXdpZG1Wb2FXTnNaVjkwZFc1cGJtY2lMQ0ppZEZabGFHbGpiR1ZVZFc1cGJtY2lMQ0p6WlhSZmJWOXpkWE53Wlc1emFXOXVVM1JwWm1adVpYTnpJaXdpYzNWemNHVnVjMmx2Ymw5emRHbG1abTVsYzNNaUxDSnpaWFJmYlY5emRYTndaVzV6YVc5dVEyOXRjSEpsYzNOcGIyNGlMQ0p6ZFhOd1pXNXphVzl1WDJOdmJYQnlaWE56YVc5dUlpd2ljMlYwWDIxZmMzVnpjR1Z1YzJsdmJrUmhiWEJwYm1jaUxDSnpkWE53Wlc1emFXOXVYMlJoYlhCcGJtY2lMQ0p6WlhSZmJWOXRZWGhUZFhOd1pXNXphVzl1VkhKaGRtVnNRMjBpTENKdFlYaGZjM1Z6Y0dWdWMybHZibDkwY21GMlpXd2lMQ0p6WlhSZmJWOXRZWGhUZFhOd1pXNXphVzl1Um05eVkyVWlMQ0p0WVhoZmMzVnpjR1Z1YzJsdmJsOW1iM0pqWlNJc0luWmxhR2xqYkdVaUxDSmlkRkpoZVdOaGMzUldaV2hwWTJ4bElpd2ljbWxuYVdSQ2IyUjVJaXdpWW5SRVpXWmhkV3gwVm1Wb2FXTnNaVkpoZVdOaGMzUmxjaUlzSW5SMWJtbHVaeUlzSW5ObGRFTnZiM0prYVc1aGRHVlRlWE4wWlcwaUxDSnlaVzF2ZG1WV1pXaHBZMnhsSWl3aVlXUmtWMmhsWld3aUxDSmpiMjV1WldOMGFXOXVYM0J2YVc1MElpd2lkMmhsWld4ZlpHbHlaV04wYVc5dUlpd2lkMmhsWld4ZllYaHNaU0lzSW5OMWMzQmxibk5wYjI1ZmNtVnpkRjlzWlc1bmRHZ2lMQ0ozYUdWbGJGOXlZV1JwZFhNaUxDSnBjMTltY205dWRGOTNhR1ZsYkNJc0luTmxkRk4wWldWeWFXNW5JaXdpWkdWMFlXbHNjeUlzSW5ObGRGTjBaV1Z5YVc1blZtRnNkV1VpTENKemRHVmxjbWx1WnlJc0luZG9aV1ZzSWl3aWMyVjBRbkpoYTJVaUxDSmljbUZyWlNJc0ltRndjR3g1Ulc1bmFXNWxSbTl5WTJVaUxDSm1iM0pqWlNJc0luSmxiVzkyWlU5aWFtVmpkQ0lzSW5KbGJXOTJaVk52Wm5SQ2IyUjVJaXdpY21WdGIzWmxVbWxuYVdSQ2IyUjVJaXdpZFhCa1lYUmxWSEpoYm5ObWIzSnRJaXdpWjJWMFRXOTBhVzl1VTNSaGRHVWlMQ0puWlhSWGIzSnNaRlJ5WVc1elptOXliU0lzSW5CdmN5SXNJbkYxWVhRaUxDSnpaWFJYYjNKc1pGUnlZVzV6Wm05eWJTSXNJblZ3WkdGMFpVMWhjM01pTENKelpYUk5ZWE56VUhKdmNITWlMQ0poY0hCc2VVTmxiblJ5WVd4SmJYQjFiSE5sSWl3aVlYQndiSGxKYlhCMWJITmxJaXdpYVcxd2RXeHpaVjk0SWl3aWFXMXdkV3h6WlY5NUlpd2lhVzF3ZFd4elpWOTZJaXdpWVhCd2JIbFViM0p4ZFdVaUxDSjBiM0p4ZFdWZmVDSXNJblJ2Y25GMVpWOTVJaXdpZEc5eWNYVmxYM29pTENKaGNIQnNlVU5sYm5SeVlXeEdiM0pqWlNJc0ltRndjR3g1Um05eVkyVWlMQ0ptYjNKalpWOTRJaXdpWm05eVkyVmZlU0lzSW1admNtTmxYM29pTENKdmJsTnBiWFZzWVhScGIyNVNaWE4xYldVaUxDSkVZWFJsSWl3aWJtOTNJaXdpYzJWMFFXNW5kV3hoY2xabGJHOWphWFI1SWl3aWMyVjBUR2x1WldGeVZtVnNiMk5wZEhraUxDSnpaWFJCYm1kMWJHRnlSbUZqZEc5eUlpd2ljMlYwVEdsdVpXRnlSbUZqZEc5eUlpd2ljMlYwUkdGdGNHbHVaeUlzSW14cGJtVmhjaUlzSW1GdVozVnNZWElpTENKelpYUkRZMlJOYjNScGIyNVVhSEpsYzJodmJHUWlMQ0owYUhKbGMyaHZiR1FpTENKelpYUkRZMlJUZDJWd2RGTndhR1Z5WlZKaFpHbDFjeUlzSW1Ga1pFTnZibk4wY21GcGJuUWlMQ0pqYjI1emRISmhhVzUwSWl3aWIySnFaV04wWWlJc0luQnZjMmwwYVc5dVlTSXNJbUowVUc5cGJuUXlVRzlwYm5SRGIyNXpkSEpoYVc1MElpd2liMkpxWldOMFlTSXNJbkJ2YzJsMGFXOXVZaUlzSW1GNGFYTWlMQ0ppZEVocGJtZGxRMjl1YzNSeVlXbHVkQ0lzSW5SeVlXNXpabTl5YldJaUxDSjBjbUZ1YzJadmNtMWhJaXdpWjJWMFVtOTBZWFJwYjI0aUxDSnpaWFJGZFd4bGNpSXNJbUowVTJ4cFpHVnlRMjl1YzNSeVlXbHVkQ0lzSW5SaElpd2lkR0lpTENKelpYUkZkV3hsY2xwWldDSXNJbUY0YVhOaElpd2lZWGhwYzJJaUxDSmlkRU52Ym1WVWQybHpkRU52Ym5OMGNtRnBiblFpTENKelpYUk1hVzFwZENJc0lrMWhkR2dpTENKUVNTSXNJbUowUjJWdVpYSnBZelpFYjJaRGIyNXpkSEpoYVc1MElpd2lZaUlzSW1WdVlXSnNaVVpsWldSaVlXTnJJaXdpY21WdGIzWmxRMjl1YzNSeVlXbHVkQ0lzSW1OdmJuTjBjbUZwYm5SZmMyVjBRbkpsWVd0cGJtZEpiWEIxYkhObFZHaHlaWE5vYjJ4a0lpd2lkVzVrWldacGJtUWlMQ0p6WlhSQ2NtVmhhMmx1WjBsdGNIVnNjMlZVYUhKbGMyaHZiR1FpTENKemFXMTFiR0YwWlNJc0luUnBiV1ZUZEdWd0lpd2liV0Y0VTNWaVUzUmxjSE1pTENKalpXbHNJaXdpYzNSbGNGTnBiWFZzWVhScGIyNGlMQ0p5WlhCdmNuUldaV2hwWTJ4bGN5SXNJbkpsY0c5eWRFTnZiR3hwYzJsdmJuTWlMQ0p5WlhCdmNuUkRiMjV6ZEhKaGFXNTBjeUlzSW5KbGNHOXlkRmR2Y214a0lpd2ljbVZ3YjNKMFYyOXliR1JmYzI5bWRHSnZaR2xsY3lJc0ltaHBibWRsWDNObGRFeHBiV2wwY3lJc0lteHZkeUlzSW1ocFoyZ2lMQ0ppYVdGelgyWmhZM1J2Y2lJc0luSmxiR0Y0WVhScGIyNWZabUZqZEc5eUlpd2lhR2x1WjJWZlpXNWhZbXhsUVc1bmRXeGhjazF2ZEc5eUlpd2laVzVoWW14bFFXNW5kV3hoY2sxdmRHOXlJaXdpZG1Wc2IyTnBkSGtpTENKaFkyTmxiR1Z5WVhScGIyNGlMQ0pvYVc1blpWOWthWE5oWW14bFRXOTBiM0lpTENKbGJtRmliR1ZOYjNSdmNpSXNJbk5zYVdSbGNsOXpaWFJNYVcxcGRITWlMQ0p6WlhSTWIzZGxja3hwYmt4cGJXbDBJaXdpYkdsdVgyeHZkMlZ5SWl3aWMyVjBWWEJ3WlhKTWFXNU1hVzFwZENJc0lteHBibDkxY0hCbGNpSXNJbk5sZEV4dmQyVnlRVzVuVEdsdGFYUWlMQ0poYm1kZmJHOTNaWElpTENKelpYUlZjSEJsY2tGdVoweHBiV2wwSWl3aVlXNW5YM1Z3Y0dWeUlpd2ljMnhwWkdWeVgzTmxkRkpsYzNScGRIVjBhVzl1SWl3aWMyVjBVMjltZEc1bGMzTk1hVzFNYVc0aUxDSnpaWFJUYjJaMGJtVnpjMHhwYlVGdVp5SXNJbk5zYVdSbGNsOWxibUZpYkdWTWFXNWxZWEpOYjNSdmNpSXNJbk5sZEZSaGNtZGxkRXhwYmsxdmRHOXlWbVZzYjJOcGRIa2lMQ0p6WlhSTllYaE1hVzVOYjNSdmNrWnZjbU5sSWl3aWMyVjBVRzkzWlhKbFpFeHBiazF2ZEc5eUlpd2ljMnhwWkdWeVgyUnBjMkZpYkdWTWFXNWxZWEpOYjNSdmNpSXNJbk5zYVdSbGNsOWxibUZpYkdWQmJtZDFiR0Z5VFc5MGIzSWlMQ0p6WlhSVVlYSm5aWFJCYm1kTmIzUnZjbFpsYkc5amFYUjVJaXdpYzJWMFRXRjRRVzVuVFc5MGIzSkdiM0pqWlNJc0luTmxkRkJ2ZDJWeVpXUkJibWROYjNSdmNpSXNJbk5zYVdSbGNsOWthWE5oWW14bFFXNW5kV3hoY2sxdmRHOXlJaXdpWTI5dVpYUjNhWE4wWDNObGRFeHBiV2wwSWl3aVkyOXVaWFIzYVhOMFgyVnVZV0pzWlUxdmRHOXlJaXdpWTI5dVpYUjNhWE4wWDNObGRFMWhlRTF2ZEc5eVNXMXdkV3h6WlNJc0luTmxkRTFoZUUxdmRHOXlTVzF3ZFd4elpTSXNJbTFoZUY5cGJYQjFiSE5sSWl3aVkyOXVaWFIzYVhOMFgzTmxkRTF2ZEc5eVZHRnlaMlYwSWl3aWMyVjBUVzkwYjNKVVlYSm5aWFFpTENKamIyNWxkSGRwYzNSZlpHbHpZV0pzWlUxdmRHOXlJaXdpWkc5bVgzTmxkRXhwYm1WaGNreHZkMlZ5VEdsdGFYUWlMQ0p6WlhSTWFXNWxZWEpNYjNkbGNreHBiV2wwSWl3aVpHOW1YM05sZEV4cGJtVmhjbFZ3Y0dWeVRHbHRhWFFpTENKelpYUk1hVzVsWVhKVmNIQmxja3hwYldsMElpd2laRzltWDNObGRFRnVaM1ZzWVhKTWIzZGxja3hwYldsMElpd2ljMlYwUVc1bmRXeGhja3h2ZDJWeVRHbHRhWFFpTENKa2IyWmZjMlYwUVc1bmRXeGhjbFZ3Y0dWeVRHbHRhWFFpTENKelpYUkJibWQxYkdGeVZYQndaWEpNYVcxcGRDSXNJbVJ2Wmw5bGJtRmliR1ZCYm1kMWJHRnlUVzkwYjNJaUxDSnRiM1J2Y2lJc0ltZGxkRkp2ZEdGMGFXOXVZV3hNYVcxcGRFMXZkRzl5SWl3aWQyaHBZMmdpTENKelpYUmZiVjlsYm1GaWJHVk5iM1J2Y2lJc0ltUnZabDlqYjI1bWFXZDFjbVZCYm1kMWJHRnlUVzkwYjNJaUxDSnpaWFJmYlY5c2IweHBiV2wwSWl3aWJHOTNYMkZ1WjJ4bElpd2ljMlYwWDIxZmFHbE1hVzFwZENJc0ltaHBaMmhmWVc1bmJHVWlMQ0p6WlhSZmJWOTBZWEpuWlhSV1pXeHZZMmwwZVNJc0luTmxkRjl0WDIxaGVFMXZkRzl5Um05eVkyVWlMQ0p0WVhoZlptOXlZMlVpTENKa2IyWmZaR2x6WVdKc1pVRnVaM1ZzWVhKTmIzUnZjaUlzSW1sdVpHVjRJaXdpYjJKcVpXTjBJaXdpWjJWMFEyVnVkR1Z5VDJaTllYTnpWSEpoYm5ObWIzSnRJaXdpYjNKcFoybHVJaXdpWjJWMFQzSnBaMmx1SWl3aWIyWm1jMlYwSWl3aVoyVjBUR2x1WldGeVZtVnNiMk5wZEhraUxDSm5aWFJCYm1kMWJHRnlWbVZzYjJOcGRIa2lMQ0ppZFdabVpYSWlMQ0p2Wm1aelpYUldaWEowSWl3aWJtOWtaWE1pTENKMlpYSjBJaXdpWjJWMFgyMWZlQ0lzSW05bVppSXNJbWRsZEY5dFgyNGlMQ0ptWVdObGN5SXNJbVpoWTJVaUxDSnViMlJsTVNJc0ltNXZaR1V5SWl3aWJtOWtaVE1pTENKMlpYSjBNU0lzSW5abGNuUXlJaXdpZG1WeWRETWlMQ0p1YjNKdFlXd3hJaXdpYm05eWJXRnNNaUlzSW01dmNtMWhiRE1pTENKa2NDSXNJbWRsZEVScGMzQmhkR05vWlhJaUxDSnVkVzBpTENKblpYUk9kVzFOWVc1cFptOXNaSE1pTENKdFlXNXBabTlzWkNJc0ltZGxkRTFoYm1sbWIyeGtRbmxKYm1SbGVFbHVkR1Z5Ym1Gc0lpd2liblZ0WDJOdmJuUmhZM1J6SWl3aVoyVjBUblZ0UTI5dWRHRmpkSE1pTENKd2RDSXNJbWRsZEVOdmJuUmhZM1JRYjJsdWRDSXNJbWRsZEVKdlpIa3dJaXdpWjJWMFFtOWtlVEVpTENKblpYUmZiVjl1YjNKdFlXeFhiM0pzWkU5dVFpSXNJbWRsZEU1MWJWZG9aV1ZzY3lJc0ltZGxkRmRvWldWc1NXNW1ieUlzSW1kbGRGOXRYM2R2Y214a1ZISmhibk5tYjNKdElpd2liR1Z1WjJoMElpd2liMlptYzJWMFgySnZaSGtpTENKblpYUkNjbVZoYTJsdVowbHRjSFZzYzJWVWFISmxjMmh2YkdRaUxDSnZibTFsYzNOaFoyVWlMQ0psZG1WdWRDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3pzN1FVRkhRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3h0UkVGQk1rTXNZMEZCWXpzN1FVRkZla1E3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hoUVVGTE8wRkJRMHc3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h0UTBGQk1rSXNNRUpCUVRCQ0xFVkJRVVU3UVVGRGRrUXNlVU5CUVdsRExHVkJRV1U3UVVGRGFFUTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzT0VSQlFYTkVMQ3RFUVVFclJEczdRVUZGY2tnN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3pzN096czdPMEZEYUVWQkxFbEJRVTFCTEhOQ1FVRnpRa01zUzBGQlMwTXNhVUpCUVV3c1NVRkJNRUpFTEV0QlFVdEZMRmRCUVRORU96czdRVUZGUlR0QlFVTkJReXhuUWtGQlowSTdRVUZEWkVNc1pVRkJZU3hEUVVSRE8wRkJSV1JETEcxQ1FVRnBRaXhEUVVaSU8wRkJSMlJETEdsQ1FVRmxMRU5CU0VRN1FVRkpaRU1zYjBKQlFXdENMRU5CU2tvN1FVRkxaRU1zWTBGQldUdEJRVXhGTEVOQlNHeENPenRCUVZkRk8wRkJRMFlzU1VGQlNVTXNaMEpCUVVvN1FVRkJRU3hKUVVORlF5eG5Ra0ZFUmp0QlFVRkJMRWxCUlVWRExHMUNRVVpHTzBGQlFVRXNTVUZIUlVNc2RVSkJTRVk3UVVGQlFTeEpRVWxGUXl4dlFrRkJiMElzUzBGS2RFSTdRVUZCUVN4SlFVdEZReXd5UWtGQk1rSXNRMEZNTjBJN1FVRkJRU3hKUVU5RlF5eGxRVUZsTEVOQlVHcENPMEZCUVVFc1NVRlJSVU1zZVVKQlFYbENMRU5CVWpOQ08wRkJRVUVzU1VGVFJVTXNkMEpCUVhkQ0xFTkJWREZDTzBGQlFVRXNTVUZWUlVNc1kwRkJZeXhEUVZab1FqdEJRVUZCTEVsQlYwVkRMRzFDUVVGdFFpeERRVmh5UWp0QlFVRkJMRWxCV1VWRExIZENRVUYzUWl4RFFWb3hRanM3TzBGQlkwVTdRVUZEUVVNc2MwSkJaa1k3UVVGQlFTeEpRV1ZwUWp0QlFVTm1ReXcyUWtGb1FrWTdRVUZCUVN4SlFXdENSVU1zWTBGc1FrWTdRVUZCUVN4SlFXMUNSVU1zWjBKQmJrSkdPMEZCUVVFc1NVRnZRa1ZETEdkQ1FYQkNSanRCUVVGQkxFbEJjVUpGUXl4blFrRnlRa1k3UVVGQlFTeEpRWE5DUlVNc1kwRjBRa1k3TzBGQmQwSkZPMEZCUTBZc1NVRkJUVU1zYlVKQlFXMUNMRVZCUVhwQ08wRkJRVUVzU1VGRFJVTXNWMEZCVnl4RlFVUmlPMEZCUVVFc1NVRkZSVU1zV1VGQldTeEZRVVprTzBGQlFVRXNTVUZIUlVNc1pVRkJaU3hGUVVocVFqdEJRVUZCTEVsQlNVVkRMR2RDUVVGblFpeEZRVXBzUWp0QlFVRkJMRWxCUzBWRExHbENRVUZwUWl4RlFVeHVRanM3TzBGQlQwVTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVU1zYVVKQlFXbENMRVZCV0c1Q096dEJRVmxGTzBGQlEwRkRMRzlDUVVGdlFpeEZRV0owUWpzN1FVRmpSVHRCUVVOQk8wRkJRMEZETEcxQ1FVRnRRaXhGUVdoQ2NrSTdPMEZCYTBKRk8wRkJRMFlzU1VGQlNVTXNlVUpCUVVvN1FVRkJRU3hKUVVGelFqdEJRVU53UWtNc2IwSkJSRVk3UVVGQlFTeEpRVVZGUXl4dFFrRkdSanRCUVVGQkxFbEJSMFZETEhkQ1FVaEdPMEZCUVVFc1NVRkpSVU1zYzBKQlNrWTdRVUZCUVN4SlFVdEZReXg1UWtGTVJqczdRVUZQUVN4SlFVRk5ReXgxUWtGQmRVSXNSVUZCTjBJN1FVRkJRU3hKUVVGcFF6dEJRVU12UWtNc01rSkJRVEpDTEVOQlJEZENPMEZCUVVFc1NVRkRaME03UVVGRE9VSkRMSGxDUVVGNVFpeERRVVl6UWp0QlFVRkJMRWxCUlRoQ08wRkJRelZDUXl3MFFrRkJORUlzUTBGSU9VSXNReXhEUVVkcFF6czdRVUZGYWtNc1NVRkJUVU1zUzBGQlN5eEpRVUZKUXl4WFFVRktMRU5CUVdkQ0xFTkJRV2hDTEVOQlFWZzdPMEZCUlVGcVJDeHZRa0ZCYjBKblJDeEZRVUZ3UWl4RlFVRjNRaXhEUVVGRFFTeEZRVUZFTEVOQlFYaENPMEZCUTBFc1NVRkJUVVVzZFVKQlFYZENSaXhIUVVGSFJ5eFZRVUZJTEV0QlFXdENMRU5CUVdoRU96dEJRVVZCTEVsQlFVMURMRzlDUVVGdlFpeFRRVUZ3UWtFc2FVSkJRVzlDTEVOQlFVTkRMRk5CUVVRc1JVRkJaVHRCUVVOMlF5eE5RVUZKYmtJc1pVRkJaVzFDTEZOQlFXWXNUVUZCT0VKRExGTkJRV3hETEVWQlEwVXNUMEZCVDNCQ0xHVkJRV1Z0UWl4VFFVRm1MRU5CUVZBN08wRkJSVVlzVTBGQlR5eEpRVUZRTzBGQlEwUXNRMEZNUkRzN1FVRlBRU3hKUVVGTlJTeG5Ra0ZCWjBJc1UwRkJhRUpCTEdGQlFXZENMRU5CUVVOR0xGTkJRVVFzUlVGQldVY3NTMEZCV2l4RlFVRnpRanRCUVVNeFEzUkNMR2xDUVVGbGJVSXNVMEZCWml4SlFVRTBRa2NzUzBGQk5VSTdRVUZEUkN4RFFVWkVPenRCUVVsQkxFbEJRVTFETEdOQlFXTXNVMEZCWkVFc1YwRkJZeXhEUVVGRFF5eFhRVUZFTEVWQlFXbENPMEZCUTI1RExFMUJRVWxHTEdOQlFVbzdPMEZCUlVFMVF5eGhRVUZYSzBNc1YwRkJXRHRCUVVOQkxGVkJRVkZFTEZsQlFWbEZMRWxCUVhCQ08wRkJRMFVzVTBGQlN5eFZRVUZNTzBGQlFXbENPMEZCUTJaS0xHZENRVUZSTEVsQlFVbExMRXRCUVV0RExHVkJRVlFzUlVGQlVqczdRVUZGUVR0QlFVTkVPMEZCUTBRc1UwRkJTeXhQUVVGTU8wRkJRV003UVVGRFdpeFpRVUZOVkN4MVFrRkJjVUpMTEZsQlFWbExMRTFCUVZvc1EwRkJiVUpETEVOQlFYaERMRk5CUVRaRFRpeFpRVUZaU3l4TlFVRmFMRU5CUVcxQ1JTeERRVUZvUlN4VFFVRnhSVkFzV1VGQldVc3NUVUZCV2l4RFFVRnRRa2NzUTBGQk9VWTdPMEZCUlVFc1dVRkJTU3hEUVVGRFZpeFJRVUZSU2l4clFrRkJhMEpETEZOQlFXeENMRU5CUVZRc1RVRkJNa01zU1VGQkwwTXNSVUZCY1VRN1FVRkRia1ExUWl4clFrRkJVVEJETEVsQlFWSXNRMEZCWVZRc1dVRkJXVXNzVFVGQldpeERRVUZ0UWtNc1EwRkJhRU03UVVGRFFYWkRMR3RDUVVGUk1rTXNTVUZCVWl4RFFVRmhWaXhaUVVGWlN5eE5RVUZhTEVOQlFXMUNSU3hEUVVGb1F6dEJRVU5CZUVNc2EwSkJRVkUwUXl4SlFVRlNMRU5CUVdGWUxGbEJRVmxMTEUxQlFWb3NRMEZCYlVKSExFTkJRV2hETzBGQlEwRldMR3RDUVVGUkxFbEJRVWxMTEV0QlFVdFRMR3RDUVVGVUxFTkJRVFJDTjBNc1QwRkJOVUlzUlVGQmNVTXNRMEZCY2tNc1EwRkJVanRCUVVOQk9FSXNkMEpCUVdOR0xGTkJRV1FzUlVGQmVVSkhMRXRCUVhwQ08wRkJRMFE3TzBGQlJVUTdRVUZEUkR0QlFVTkVMRk5CUVVzc1MwRkJURHRCUVVGWk8wRkJRMVlzV1VGQlRVZ3NjMEpCUVcxQ1N5eFpRVUZaWVN4TFFVRXZRaXhUUVVGM1EySXNXVUZCV1dNc1RVRkJjRVFzVTBGQk9FUmtMRmxCUVZsbExFdEJRV2hHT3p0QlFVVkJMRmxCUVVrc1EwRkJRMnBDTEZGQlFWRktMR3RDUVVGclFrTXNWVUZCYkVJc1EwRkJWQ3hOUVVFeVF5eEpRVUV2UXl4RlFVRnhSRHRCUVVOdVJEVkNMR3RDUVVGUk1FTXNTVUZCVWl4RFFVRmhWQ3haUVVGWllTeExRVUZhTEVkQlFXOUNMRU5CUVdwRE8wRkJRMEU1UXl4clFrRkJVVEpETEVsQlFWSXNRMEZCWVZZc1dVRkJXV01zVFVGQldpeEhRVUZ4UWl4RFFVRnNRenRCUVVOQkwwTXNhMEpCUVZFMFF5eEpRVUZTTEVOQlFXRllMRmxCUVZsbExFdEJRVm9zUjBGQmIwSXNRMEZCYWtNN1FVRkRRV3BDTEd0Q1FVRlJMRWxCUVVsTExFdEJRVXRoTEZWQlFWUXNRMEZCYjBKcVJDeFBRVUZ3UWl4RFFVRlNPMEZCUTBFNFFpeDNRa0ZCWTBZc1ZVRkJaQ3hGUVVGNVFrY3NTMEZCZWtJN1FVRkRSRHM3UVVGRlJEdEJRVU5FTzBGQlEwUXNVMEZCU3l4UlFVRk1PMEZCUVdVN1FVRkRZaXhaUVVGTlNDd3dRa0ZCYzBKTExGbEJRVmxwUWl4TlFVRjRRenM3UVVGRlFTeFpRVUZKTEVOQlFVTnVRaXhSUVVGUlNpeHJRa0ZCYTBKRExGZEJRV3hDTEVOQlFWUXNUVUZCTWtNc1NVRkJMME1zUlVGQmNVUTdRVUZEYmtSSExHdENRVUZSTEVsQlFVbExMRXRCUVV0bExHRkJRVlFzUTBGQmRVSnNRaXhaUVVGWmFVSXNUVUZCYmtNc1EwRkJVanRCUVVOQmNFSXNkMEpCUVdOR0xGZEJRV1FzUlVGQmVVSkhMRXRCUVhwQ08wRkJRMFE3TzBGQlJVUTdRVUZEUkR0QlFVTkVMRk5CUVVzc1ZVRkJURHRCUVVGcFFqdEJRVU5tTEZsQlFVMUlMRFJDUVVGM1Frc3NXVUZCV1dFc1MwRkJjRU1zVTBGQk5rTmlMRmxCUVZsakxFMUJRWHBFTEZOQlFXMUZaQ3haUVVGWlpTeExRVUZ5UmpzN1FVRkZRU3haUVVGSkxFTkJRVU5xUWl4UlFVRlJTaXhyUWtGQmEwSkRMRmRCUVd4Q0xFTkJRVlFzVFVGQk1rTXNTVUZCTDBNc1JVRkJjVVE3UVVGRGJrUTFRaXhyUWtGQlVUQkRMRWxCUVZJc1EwRkJZVlFzV1VGQldXRXNTMEZCV2l4SFFVRnZRaXhEUVVGcVF6dEJRVU5CT1VNc2EwSkJRVkV5UXl4SlFVRlNMRU5CUVdGV0xGbEJRVmxqTEUxQlFWb3NSMEZCY1VJc1EwRkJiRU03UVVGRFFTOURMR3RDUVVGUk5FTXNTVUZCVWl4RFFVRmhXQ3haUVVGWlpTeExRVUZhTEVkQlFXOUNMRU5CUVdwRE8wRkJRMEZxUWl4clFrRkJVU3hKUVVGSlN5eExRVUZMWjBJc1pVRkJWQ3hEUVVGNVFuQkVMRTlCUVhwQ0xFTkJRVkk3UVVGRFFUaENMSGRDUVVGalJpeFhRVUZrTEVWQlFYbENSeXhMUVVGNlFqdEJRVU5FT3p0QlFVVkVPMEZCUTBRN1FVRkRSQ3hUUVVGTExGTkJRVXc3UVVGQlowSTdRVUZEWkN4WlFVRk5TQ3d5UWtGQmRVSkxMRmxCUVZscFFpeE5RVUZ1UXl4VFFVRTJRMnBDTEZsQlFWbGpMRTFCUVM5RU96dEJRVVZCTEZsQlFVa3NRMEZCUTJoQ0xGRkJRVkZLTEd0Q1FVRnJRa01zVjBGQmJFSXNRMEZCVkN4TlFVRXlReXhKUVVFdlF5eEZRVUZ4UkR0QlFVTnVSRHRCUVVOQlJ5eHJRa0ZCVVN4SlFVRkpTeXhMUVVGTGFVSXNZMEZCVkN4RFFVRjNRbkJDTEZsQlFWbHBRaXhOUVVGd1F5eEZRVUUwUTJwQ0xGbEJRVmxqTEUxQlFWb3NSMEZCY1VJc1NVRkJTV1FzV1VGQldXbENMRTFCUVdwR0xFTkJRVkk3UVVGRFFYQkNMSGRDUVVGalJpeFhRVUZrTEVWQlFYbENSeXhMUVVGNlFqdEJRVU5FT3p0QlFVVkVPMEZCUTBRN1FVRkRSQ3hUUVVGTExFMUJRVXc3UVVGQllUdEJRVU5ZTEZsQlFVMUlMSGRDUVVGdlFrc3NXVUZCV1dsQ0xFMUJRV2hETEZOQlFUQkRha0lzV1VGQldXTXNUVUZCTlVRN08wRkJSVUVzV1VGQlNTeERRVUZEYUVJc1VVRkJVVW9zYTBKQlFXdENReXhYUVVGc1FpeERRVUZVTEUxQlFUSkRMRWxCUVM5RExFVkJRWEZFTzBGQlEyNUVSeXhyUWtGQlVTeEpRVUZKU3l4TFFVRkxhMElzVjBGQlZDeERRVUZ4UW5KQ0xGbEJRVmxwUWl4TlFVRnFReXhGUVVGNVEycENMRmxCUVZsakxFMUJRWEpFTEVOQlFWSTdRVUZEUVdwQ0xIZENRVUZqUml4WFFVRmtMRVZCUVhsQ1J5eExRVUY2UWp0QlFVTkVPenRCUVVWRU8wRkJRMFE3UVVGRFJDeFRRVUZMTEZOQlFVdzdRVUZCWjBJN1FVRkRaQ3haUVVGTmQwSXNaMEpCUVdkQ0xFbEJRVWx1UWl4TFFVRkxiMElzWTBGQlZDeEZRVUYwUWp0QlFVTkJMRmxCUVVrc1EwRkJRM1pDTEZsQlFWbDNRaXhKUVVGYUxFTkJRV2xDUXl4TlFVRjBRaXhGUVVFNFFpeFBRVUZQTEV0QlFWQTdRVUZET1VJc1dVRkJUVVFzVDBGQlQzaENMRmxCUVZsM1FpeEpRVUY2UWpzN1FVRkZRU3hoUVVGTExFbEJRVWxGTEVsQlFVa3NRMEZCWWl4RlFVRm5Ra0VzU1VGQlNVWXNTMEZCUzBNc1RVRkJUQ3hIUVVGakxFTkJRV3hETEVWQlFYRkRReXhIUVVGeVF5eEZRVUV3UXp0QlFVTjRRek5FTEd0Q1FVRlJNRU1zU1VGQlVpeERRVUZoWlN4TFFVRkxSU3hKUVVGSkxFTkJRVlFzUTBGQllqdEJRVU5CTTBRc2EwSkJRVkV5UXl4SlFVRlNMRU5CUVdGakxFdEJRVXRGTEVsQlFVa3NRMEZCU2l4SFFVRlJMRU5CUVdJc1EwRkJZanRCUVVOQk0wUXNhMEpCUVZFMFF5eEpRVUZTTEVOQlFXRmhMRXRCUVV0RkxFbEJRVWtzUTBGQlNpeEhRVUZSTEVOQlFXSXNRMEZCWWpzN1FVRkZRVEZFTEd0Q1FVRlJlVU1zU1VGQlVpeERRVUZoWlN4TFFVRkxSU3hKUVVGSkxFTkJRVW9zUjBGQlVTeERRVUZpTEVOQlFXSTdRVUZEUVRGRUxHdENRVUZSTUVNc1NVRkJVaXhEUVVGaFl5eExRVUZMUlN4SlFVRkpMRU5CUVVvc1IwRkJVU3hEUVVGaUxFTkJRV0k3UVVGRFFURkVMR3RDUVVGUk1rTXNTVUZCVWl4RFFVRmhZU3hMUVVGTFJTeEpRVUZKTEVOQlFVb3NSMEZCVVN4RFFVRmlMRU5CUVdJN08wRkJSVUY2UkN4clFrRkJVWGRETEVsQlFWSXNRMEZCWVdVc1MwRkJTMFVzU1VGQlNTeERRVUZLTEVkQlFWRXNRMEZCWWl4RFFVRmlPMEZCUTBGNlJDeHJRa0ZCVVhsRExFbEJRVklzUTBGQllXTXNTMEZCUzBVc1NVRkJTU3hEUVVGS0xFZEJRVkVzUTBGQllpeERRVUZpTzBGQlEwRjZSQ3hyUWtGQlVUQkRMRWxCUVZJc1EwRkJZV0VzUzBGQlMwVXNTVUZCU1N4RFFVRktMRWRCUVZFc1EwRkJZaXhEUVVGaU96dEJRVVZCU2l4M1FrRkJZMHNzVjBGQlpDeERRVU5GTlVRc1QwRkVSaXhGUVVWRlF5eFBRVVpHTEVWQlIwVkRMRTlCU0VZc1JVRkpSU3hMUVVwR08wRkJUVVE3TzBGQlJVUTJRaXhuUWtGQlVTeEpRVUZKU3l4TFFVRkxlVUlzYzBKQlFWUXNRMEZEVGs0c1lVRkVUU3hGUVVWT0xFbEJSazBzUlVGSFRpeEpRVWhOTEVOQlFWSTdPMEZCVFVFMVF5d3dRa0ZCYTBKelFpeFpRVUZaTmtJc1JVRkJPVUlzU1VGQmIwTXZRaXhMUVVGd1F6czdRVUZGUVR0QlFVTkVPMEZCUTBRc1UwRkJTeXhSUVVGTU8wRkJRV1U3UVVGRFlrRXNaMEpCUVZFc1NVRkJTVXNzUzBGQlN6SkNMR2xDUVVGVUxFVkJRVkk3UVVGRFFTeFpRVUZOVGl4UlFVRlBlRUlzV1VGQldYZENMRWxCUVhwQ096dEJRVVZCTEdGQlFVc3NTVUZCU1VVc1MwRkJTU3hEUVVGaUxFVkJRV2RDUVN4TFFVRkpSaXhOUVVGTFF5eE5RVUZNTEVkQlFXTXNRMEZCYkVNc1JVRkJjVU5ETEVsQlFYSkRMRVZCUVRCRE8wRkJRM2hETTBRc2EwSkJRVkV3UXl4SlFVRlNMRU5CUVdGbExFMUJRVXRGTEV0QlFVa3NRMEZCVkN4RFFVRmlPMEZCUTBFelJDeHJRa0ZCVVRKRExFbEJRVklzUTBGQllXTXNUVUZCUzBVc1MwRkJTU3hEUVVGS0xFZEJRVkVzUTBGQllpeERRVUZpTzBGQlEwRXpSQ3hyUWtGQlVUUkRMRWxCUVZJc1EwRkJZV0VzVFVGQlMwVXNTMEZCU1N4RFFVRktMRWRCUVZFc1EwRkJZaXhEUVVGaU96dEJRVVZCTlVJc1owSkJRVTFwUXl4UlFVRk9MRU5CUVdWb1JTeFBRVUZtTzBGQlEwUTdPMEZCUlVSWExEQkNRVUZyUW5OQ0xGbEJRVmsyUWl4RlFVRTVRaXhKUVVGdlF5OUNMRXRCUVhCRE96dEJRVVZCTzBGQlEwUTdRVUZEUkN4VFFVRkxMR0ZCUVV3N1FVRkJiMEk3UVVGRGJFSXNXVUZCVFd0RExFOUJRVTlvUXl4WlFVRlpaME1zU1VGQmVrSTdRVUZCUVN4WlFVTkZReXhQUVVGUGFrTXNXVUZCV1dsRExFbEJSSEpDTzBGQlFVRXNXVUZGUlVNc1UwRkJVMnhETEZsQlFWbHJReXhOUVVaMlFqdEJRVUZCTEZsQlIwVkRMRTFCUVUxb1F5eExRVUZMYVVNc1QwRkJUQ3hEUVVGaExFbEJRVWxLTEVsQlFVb3NSMEZCVjBNc1NVRkJlRUlzUTBGSVVqczdRVUZMUVN4aFFVRkxMRWxCUVVsUUxFMUJRVWtzUTBGQlVpeEZRVUZYVnl4SlFVRkpMRU5CUVdZc1JVRkJhMEpETEV0QlFVc3NRMEZCTlVJc1JVRkJLMEphTEUxQlFVbE5MRWxCUVc1RExFVkJRWGxEVGl4TFFVRjZReXhGUVVFNFF6dEJRVU0xUXl4bFFVRkxMRWxCUVVsaExFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTVTRzU1VGQmNFSXNSVUZCTUVKTkxFZEJRVEZDTEVWQlFTdENPMEZCUXpkQ2NFTXNhVUpCUVV0eFF5eFBRVUZNTEVOQlFXRk1MRTFCUVUxSExFVkJRVTRzU1VGQldTeERRVUY2UWl4SlFVRTRRa29zVDBGQlQwY3NRMEZCVUN4RFFVRTVRanM3UVVGRlFVRTdRVUZEUVVNc2EwSkJRVTBzUTBGQlRqdEJRVU5FTzBGQlEwWTdPMEZCUlVSNFF5eG5Ra0ZCVVN4SlFVRkpTeXhMUVVGTGMwTXNlVUpCUVZRc1EwRkRUbnBETEZsQlFWbG5ReXhKUVVST0xFVkJSVTVvUXl4WlFVRlphVU1zU1VGR1RpeEZRVWRPUlN4SFFVaE5MRVZCU1U0c1EwRktUU3hGUVV0T0xFTkJRVU51UXl4WlFVRlpNRU1zV1VGTVVDeEZRVTFPTVVNc1dVRkJXVEJETEZsQlRrNHNSVUZQVGl4RFFWQk5MRVZCVVU0c1YwRlNUU3hGUVZOT0xFdEJWRTBzUTBGQlVqczdRVUZaUVdoRkxEQkNRVUZyUW5OQ0xGbEJRVmsyUWl4RlFVRTVRaXhKUVVGdlF5OUNMRXRCUVhCRE8wRkJRMEU3UVVGRFJEdEJRVU5FTzBGQlEwVTdRVUZEUVR0QlFXaExTanM3UVVGdFMwRXNVMEZCVDBFc1MwRkJVRHRCUVVORUxFTkJlRXRFT3p0QlFUQkxRU3hKUVVGTk5rTXNhVUpCUVdsQ0xGTkJRV3BDUVN4alFVRnBRaXhEUVVGRE0wTXNWMEZCUkN4RlFVRnBRanRCUVVOMFF5eE5RVUZKTkVNc1lVRkJTanM3UVVGRlFTeE5RVUZOUXl4clFrRkJhMElzU1VGQlNURkRMRXRCUVVzeVF5eHBRa0ZCVkN4RlFVRjRRanM3UVVGRlFTeFZRVUZST1VNc1dVRkJXVVVzU1VGQmNFSTdRVUZEUlN4VFFVRkxMR0ZCUVV3N1FVRkJiMEk3UVVGRGJFSXNXVUZCU1N4RFFVRkRSaXhaUVVGWkswTXNVMEZCV2l4RFFVRnpRblJDTEUxQlFUTkNMRVZCUVcxRExFOUJRVThzUzBGQlVEczdRVUZGYmtOdFFpeGxRVUZQUXl4blFrRkJaMEpITEdsQ1FVRm9RaXhEUVVOTWJFWXNUVUZCVFcxR0xGbEJRVTRzUlVGRVN5eEZRVVZNYWtRc1dVRkJXU3RETEZOQlJsQXNSVUZIVEM5RExGbEJRVmxyUkN4UlFVaFFMRVZCU1V4c1JDeFpRVUZaYTBRc1VVRkJXaXhEUVVGeFFucENMRTFCUVhKQ0xFZEJRVGhDTEVOQlNucENMRVZCUzB3c1MwRk1TeXhEUVVGUU96dEJRVkZCTzBGQlEwUTdRVUZEUkN4VFFVRkxMR1ZCUVV3N1FVRkJjMEk3UVVGRGNFSXNXVUZCVFRCQ0xFdEJRVXR1UkN4WlFVRlpiMFFzVDBGQmRrSTdPMEZCUlVGU0xHVkJRVTlETEdkQ1FVRm5RbEVzVjBGQmFFSXNRMEZEVEhaR0xFMUJRVTF0Uml4WlFVRk9MRVZCUkVzc1JVRkZUQ3hKUVVGSk9VTXNTMEZCUzIxRUxGTkJRVlFzUTBGQmJVSklMRWRCUVVjc1EwRkJTQ3hEUVVGdVFpeEZRVUV3UWtFc1IwRkJSeXhEUVVGSUxFTkJRVEZDTEVWQlFXbERRU3hIUVVGSExFTkJRVWdzUTBGQmFrTXNRMEZHU3l4RlFVZE1MRWxCUVVsb1JDeExRVUZMYlVRc1UwRkJWQ3hEUVVGdFFrZ3NSMEZCUnl4RFFVRklMRU5CUVc1Q0xFVkJRVEJDUVN4SFFVRkhMRU5CUVVnc1EwRkJNVUlzUlVGQmFVTkJMRWRCUVVjc1EwRkJTQ3hEUVVGcVF5eERRVWhMTEVWQlNVd3NTVUZCU1doRUxFdEJRVXR0UkN4VFFVRlVMRU5CUVcxQ1NDeEhRVUZITEVOQlFVZ3NRMEZCYmtJc1JVRkJNRUpCTEVkQlFVY3NRMEZCU0N4RFFVRXhRaXhGUVVGcFEwRXNSMEZCUnl4RFFVRklMRU5CUVdwRExFTkJTa3NzUlVGTFRDeEpRVUZKYUVRc1MwRkJTMjFFTEZOQlFWUXNRMEZCYlVKSUxFZEJRVWNzUTBGQlNDeERRVUZ1UWl4RlFVRXdRa0VzUjBGQlJ5eEZRVUZJTEVOQlFURkNMRVZCUVd0RFFTeEhRVUZITEVWQlFVZ3NRMEZCYkVNc1EwRk1TeXhGUVUxTWJrUXNXVUZCV1hWRUxGRkJRVm9zUTBGQmNVSXNRMEZCY2tJc1EwRk9TeXhGUVU5TWRrUXNXVUZCV1hWRUxGRkJRVm9zUTBGQmNVSXNRMEZCY2tJc1EwRlFTeXhGUVZGTUxFTkJVa3NzUlVGVFRDeEpRVlJMTEVOQlFWQTdPMEZCV1VFN1FVRkRSRHRCUVVORUxGTkJRVXNzWTBGQlREdEJRVUZ4UWp0QlFVTnVRaXhaUVVGTkwwSXNUMEZCVDNoQ0xGbEJRVmwzUWl4SlFVRjZRanM3UVVGRlFXOUNMR1ZCUVU5RExHZENRVUZuUWxjc1ZVRkJhRUlzUTBGRFRERkdMRTFCUVUxdFJpeFpRVUZPTEVWQlJFc3NSVUZGVEN4SlFVRkpPVU1zUzBGQlMyMUVMRk5CUVZRc1EwRkJiVUk1UWl4TFFVRkxMRU5CUVV3c1EwRkJia0lzUlVGQk5FSkJMRXRCUVVzc1EwRkJUQ3hEUVVFMVFpeEZRVUZ4UTBFc1MwRkJTeXhEUVVGTUxFTkJRWEpETEVOQlJrc3NSVUZIVEN4SlFVRkpja0lzUzBGQlMyMUVMRk5CUVZRc1EwRkJiVUk1UWl4TFFVRkxMRU5CUVV3c1EwRkJia0lzUlVGQk5FSkJMRXRCUVVzc1EwRkJUQ3hEUVVFMVFpeEZRVUZ4UTBFc1MwRkJTeXhEUVVGTUxFTkJRWEpETEVOQlNFc3NSVUZKVEVFc1MwRkJTeXhEUVVGTUxFbEJRVlVzUTBGS1RDeEZRVXRNTEVOQlRFc3NRMEZCVURzN1FVRlJRVHRCUVVORU8wRkJRMFE3UVVGRFJUdEJRVU5CTzBGQk9VTktPenRCUVdsRVFTeFRRVUZQYjBJc1NVRkJVRHRCUVVORUxFTkJka1JFT3p0QlFYbEVRWHBGTEdsQ1FVRnBRbk5HTEVsQlFXcENMRWRCUVhkQ0xGbEJRV2xDTzBGQlFVRXNUVUZCYUVKRExFMUJRV2RDTEhWRlFVRlFMRVZCUVU4N08wRkJRM1pETEUxQlFVbEJMRTlCUVU5RExGVkJRVmdzUlVGQmRVSTdRVUZEY2tKRExHdENRVUZqUml4UFFVRlBSeXhKUVVGeVFqczdRVUZGUVhSSUxGTkJRVXMwUkN4SlFVRk1MRWRCUVZreVJDeHRRa0ZCYlVKS0xFOUJRVTlETEZWQlFURkNMRU5CUVZvN1FVRkRRWEpJTEhkQ1FVRnZRaXhGUVVGRGVVZ3NTMEZCU3l4WlFVRk9MRVZCUVhCQ08wRkJRMEUxUml4eFFrRkJhVUkyUml4VFFVRnFRaXhEUVVFeVFrNHNUVUZCTTBJN1FVRkRSQ3hIUVU1RUxFMUJUVTg3UVVGRFRFVXNhMEpCUVdOR0xFOUJRVTlITEVsQlFYSkNPMEZCUTBGMlNDeDNRa0ZCYjBJc1JVRkJRM2xJTEV0QlFVc3NXVUZCVGl4RlFVRndRanRCUVVOQk5VWXNjVUpCUVdsQ05rWXNVMEZCYWtJc1EwRkJNa0pPTEUxQlFUTkNPMEZCUTBRN1FVRkRSaXhEUVZwRU96dEJRV05CZGtZc2FVSkJRV2xDTmtZc1UwRkJha0lzUjBGQk5rSXNXVUZCYVVJN1FVRkJRU3hOUVVGb1FrNHNUVUZCWjBJc2RVVkJRVkFzUlVGQlR6czdRVUZETlVONFJ5eGxRVUZoTEVsQlFVbHBSQ3hMUVVGTE9FUXNWMEZCVkN4RlFVRmlPMEZCUTBFNVJ5eHRRa0ZCYVVJc1NVRkJTV2RFTEV0QlFVczRSQ3hYUVVGVUxFVkJRV3BDTzBGQlEwRnNSeXhaUVVGVkxFbEJRVWx2UXl4TFFVRkxiVVFzVTBGQlZDeERRVUZ0UWl4RFFVRnVRaXhGUVVGelFpeERRVUYwUWl4RlFVRjVRaXhEUVVGNlFpeERRVUZXTzBGQlEwRjBSaXhaUVVGVkxFbEJRVWx0UXl4TFFVRkxiVVFzVTBGQlZDeERRVUZ0UWl4RFFVRnVRaXhGUVVGelFpeERRVUYwUWl4RlFVRjVRaXhEUVVGNlFpeERRVUZXTzBGQlEwRnlSaXhaUVVGVkxFbEJRVWxyUXl4TFFVRkxiVVFzVTBGQlZDeERRVUZ0UWl4RFFVRnVRaXhGUVVGelFpeERRVUYwUWl4RlFVRjVRaXhEUVVGNlFpeERRVUZXTzBGQlEwRndSaXhWUVVGUkxFbEJRVWxwUXl4TFFVRkxLMFFzV1VGQlZDeERRVUZ6UWl4RFFVRjBRaXhGUVVGNVFpeERRVUY2UWl4RlFVRTBRaXhEUVVFMVFpeEZRVUVyUWl4RFFVRXZRaXhEUVVGU096dEJRVVZCZEVZc2NVSkJRVzFDT0VVc1QwRkJUMU1zVlVGQlVDeEpRVUZ4UWl4RlFVRjRRenM3UVVGRlFTeE5RVUZKTTBVc2IwSkJRVW9zUlVGQk1FSTdRVUZEZUVJN1FVRkRRVmdzYTBKQlFXTXNTVUZCU1hWR0xGbEJRVW9zUTBGQmFVSXNTVUZCU1hoR0xHMUNRVUZ0UWswc2IwSkJRWGhETEVOQlFXUXNRMEZHZDBJc1EwRkZjVVE3UVVGRE4wVklMSE5DUVVGclFpeEpRVUZKY1VZc1dVRkJTaXhEUVVGcFFpeEpRVUZKZUVZc2JVSkJRVzFDVHl4M1FrRkJlRU1zUTBGQmJFSXNRMEZJZDBJc1EwRkhOa1E3UVVGRGNrWklMRzlDUVVGblFpeEpRVUZKYjBZc1dVRkJTaXhEUVVGcFFpeEpRVUZKZUVZc2JVSkJRVzFDVVN4elFrRkJlRU1zUTBGQmFFSXNRMEZLZDBJc1EwRkplVVE3UVVGRGFrWklMSFZDUVVGdFFpeEpRVUZKYlVZc1dVRkJTaXhEUVVGcFFpeEpRVUZKZUVZc2JVSkJRVzFDVXl4NVFrRkJlRU1zUTBGQmJrSXNRMEZNZDBJc1EwRkxLMFE3UVVGRGVFWXNSMEZPUkN4TlFVMVBPMEZCUTB3N1FVRkRRVklzYTBKQlFXTXNSVUZCWkR0QlFVTkJSU3h6UWtGQmEwSXNSVUZCYkVJN1FVRkRRVU1zYjBKQlFXZENMRVZCUVdoQ08wRkJRMEZETEhWQ1FVRnRRaXhGUVVGdVFqdEJRVU5FT3p0QlFVVkVTaXhqUVVGWkxFTkJRVm9zU1VGQmFVSnVReXhqUVVGalF5eFhRVUV2UWp0QlFVTkJiME1zYTBKQlFXZENMRU5CUVdoQ0xFbEJRWEZDY2tNc1kwRkJZMFVzWlVGQmJrTTdRVUZEUVc5RExHZENRVUZqTEVOQlFXUXNTVUZCYlVKMFF5eGpRVUZqUnl4aFFVRnFRenRCUVVOQmIwTXNiVUpCUVdsQ0xFTkJRV3BDTEVsQlFYTkNka01zWTBGQlkwa3NaMEpCUVhCRE96dEJRVVZCTEUxQlFVMTFTQ3g1UWtGQmVVSllMRTlCUVU5WkxGRkJRVkFzUjBGRE0wSXNTVUZCU1c1RkxFdEJRVXR2UlN4NVEwRkJWQ3hGUVVReVFpeEhRVVV6UWl4SlFVRkpjRVVzUzBGQlMzRkZMQ3RDUVVGVUxFVkJSa283UVVGQlFTeE5RVWRGUXl4aFFVRmhMRWxCUVVsMFJTeExRVUZMZFVVc2NVSkJRVlFzUTBGQkswSk1MSE5DUVVFdlFpeERRVWhtTzBGQlFVRXNUVUZKUlUwc1UwRkJVeXhKUVVGSmVFVXNTMEZCUzNsRkxHMURRVUZVTEVWQlNsZzdPMEZCVFVFc1RVRkJTVU1zYlVKQlFVbzdPMEZCUlVFc1RVRkJTU3hEUVVGRGJrSXNUMEZCVDIxQ0xGVkJRVm9zUlVGQmQwSnVRaXhQUVVGUGJVSXNWVUZCVUN4SFFVRnZRaXhGUVVGRE0wVXNUVUZCVFN4VFFVRlFMRVZCUVhCQ08wRkJRM2hDTzBGQlEwRTdPenM3T3pzN096czdPenM3T3p0QlFXZENRU3hWUVVGUmQwUXNUMEZCVDIxQ0xGVkJRVkFzUTBGQmEwSXpSU3hKUVVFeFFqdEJRVU5GTEZOQlFVc3NXVUZCVER0QlFVTkZia01zWTBGQlVUQkRMRWxCUVZJc1EwRkJZV2xFTEU5QlFVOXRRaXhWUVVGUUxFTkJRV3RDUXl4UFFVRnNRaXhEUVVFd1FuaEZMRU5CUVhaRE8wRkJRMEYyUXl4alFVRlJNa01zU1VGQlVpeERRVUZoWjBRc1QwRkJUMjFDTEZWQlFWQXNRMEZCYTBKRExFOUJRV3hDTEVOQlFUQkNka1VzUTBGQmRrTTdRVUZEUVhoRExHTkJRVkUwUXl4SlFVRlNMRU5CUVdFclF5eFBRVUZQYlVJc1ZVRkJVQ3hEUVVGclFrTXNUMEZCYkVJc1EwRkJNRUowUlN4RFFVRjJRenM3UVVGRlFYaERMR05CUVZGNVF5eEpRVUZTTEVOQlFXRnBSQ3hQUVVGUGJVSXNWVUZCVUN4RFFVRnJRa1VzVDBGQmJFSXNRMEZCTUVKNlJTeERRVUYyUXp0QlFVTkJkRU1zWTBGQlVUQkRMRWxCUVZJc1EwRkJZV2RFTEU5QlFVOXRRaXhWUVVGUUxFTkJRV3RDUlN4UFFVRnNRaXhEUVVFd1FuaEZMRU5CUVhaRE8wRkJRMEYyUXl4alFVRlJNa01zU1VGQlVpeERRVUZoSzBNc1QwRkJUMjFDTEZWQlFWQXNRMEZCYTBKRkxFOUJRV3hDTEVOQlFUQkNka1VzUTBGQmRrTTdPMEZCUlVGeFJTeHRRa0ZCWVN4SlFVRkpNVVVzUzBGQlN6WkZMRmxCUVZRc1EwRkRXR3BJTEU5QlJGY3NSVUZGV0VNc1QwRkdWeXhEUVVGaU96dEJRVXRCTzBGQlEwWXNVMEZCU3l4VFFVRk1PMEZCUTBFN1FVRkRSVFpITEcxQ1FVRmhMRWxCUVVreFJTeExRVUZMT0VVc1owSkJRVlFzUlVGQllqdEJRVU5CTzBGQmJrSktPenRCUVhOQ1FXNUlMRlZCUVZFMFJpeFBRVUZQV1N4UlFVRlFMRWRCUTBvc1NVRkJTVzVGTEV0QlFVc3JSU3gzUWtGQlZDeERRVUZyUTFRc1ZVRkJiRU1zUlVGQk9FTkpMRlZCUVRsRExFVkJRVEJFUml4TlFVRXhSQ3hGUVVGclJVNHNjMEpCUVd4RkxFVkJRVEJHTEVsQlFVbHNSU3hMUVVGTFowWXNkVUpCUVZRc1JVRkJNVVlzUTBGRVNTeEhRVVZLTEVsQlFVbG9SaXhMUVVGTGFVWXNkVUpCUVZRc1EwRkJhVU5ZTEZWQlFXcERMRVZCUVRaRFNTeFZRVUUzUXl4RlFVRjVSRVlzVFVGQmVrUXNSVUZCYVVWT0xITkNRVUZxUlN4RFFVWktPMEZCUjBGNlJ5eHJRa0ZCWjBJNFJpeFBRVUZQT1VZc1lVRkJka0k3TzBGQlJVRXNUVUZCU1RoR0xFOUJRVTlaTEZGQlFWZ3NSVUZCY1VKc1NDeHZRa0ZCYjBJc1NVRkJjRUk3TzBGQlJYSkNaQ3h6UWtGQmIwSXNSVUZCUTNsSUxFdEJRVXNzV1VGQlRpeEZRVUZ3UWp0QlFVTkVMRU5CY2taRU96dEJRWFZHUVRWR0xHbENRVUZwUW10SUxHZENRVUZxUWl4SFFVRnZReXhWUVVGRGNrWXNWMEZCUkN4RlFVRnBRanRCUVVOdVJIQkRMR3RDUVVGblFtOURMRmRCUVdoQ08wRkJRMFFzUTBGR1JEczdRVUZKUVRkQ0xHbENRVUZwUW0xSUxGVkJRV3BDTEVkQlFUaENMRlZCUVVOMFJpeFhRVUZFTEVWQlFXbENPMEZCUXpkRGFrTXNWVUZCVVRCRExFbEJRVklzUTBGQllWUXNXVUZCV1Uwc1EwRkJla0k3UVVGRFFYWkRMRlZCUVZFeVF5eEpRVUZTTEVOQlFXRldMRmxCUVZsUExFTkJRWHBDTzBGQlEwRjRReXhWUVVGUk5FTXNTVUZCVWl4RFFVRmhXQ3haUVVGWlVTeERRVUY2UWp0QlFVTkJNVU1zVVVGQlRYZElMRlZCUVU0c1EwRkJhVUoyU0N4UFFVRnFRanRCUVVORUxFTkJURVE3TzBGQlQwRkpMR2xDUVVGcFFtOUlMRmxCUVdwQ0xFZEJRV2RETEZWQlFVTjJSaXhYUVVGRUxFVkJRV2xDTzBGQlF5OUROVUlzVjBGQlV6UkNMRmxCUVZsM1JpeEhRVUZ5UWl4RlFVTkhSQ3haUVVSSUxFTkJSVWwyUml4WlFVRlplVVlzU1VGR2FFSXNSVUZIU1hKSUxGTkJRVk0wUWl4WlFVRlpNRVlzU1VGQmNrSXNRMEZJU2l4RlFVbEpNVVlzV1VGQldUSkdMRFJDUVVwb1FpeEZRVXRKTTBZc1dVRkJXVFJHTEZOQlRHaENPMEZCVDBRc1EwRlNSRHM3UVVGVlFYcElMR2xDUVVGcFFqQklMRk5CUVdwQ0xFZEJRVFpDTEZWQlFVTTNSaXhYUVVGRUxFVkJRV2xDTzBGQlF6VkRMRTFCUVVrMFF5eGhRVUZLTzBGQlFVRXNUVUZCVld0RUxHOUNRVUZXT3p0QlFVVkJMRTFCUVVrNVJpeFpRVUZaUlN4SlFVRmFMRU5CUVdsQ05rWXNUMEZCYWtJc1EwRkJlVUlzVFVGQmVrSXNUVUZCY1VNc1EwRkJReXhEUVVFeFF5eEZRVUUyUXp0QlFVTXpRMjVFTEZkQlFVOUVMR1ZCUVdVelF5eFhRVUZtTEVOQlFWQTdPMEZCUlVFc1VVRkJUV2RITEZkQlFWZHdSQ3hMUVVGTGNVUXNVMEZCVEN4RlFVRnFRanM3UVVGRlFTeFJRVUZKYWtjc1dVRkJXV3RITEZkQlFXaENMRVZCUVRaQ1JpeFRRVUZUUnl4bFFVRlVMRU5CUVhsQ2JrY3NXVUZCV1d0SExGZEJRWEpETzBGQlF6ZENMRkZCUVVsc1J5eFpRVUZaYjBjc1YwRkJhRUlzUlVGQk5rSktMRk5CUVZOTExHVkJRVlFzUTBGQmVVSnlSeXhaUVVGWmIwY3NWMEZCY2tNN1FVRkROMElzVVVGQlNYQkhMRmxCUVZselJ5eFhRVUZvUWl4RlFVRTJRazRzVTBGQlUwOHNaVUZCVkN4RFFVRjVRblpITEZsQlFWbHpSeXhYUVVGeVF6dEJRVU0zUWl4UlFVRkpkRWNzV1VGQldYZEhMRmRCUVdoQ0xFVkJRVFpDVWl4VFFVRlRVeXhsUVVGVUxFTkJRWGxDZWtjc1dVRkJXWGRITEZkQlFYSkRPMEZCUXpkQ1VpeGhRVUZUVlN4alFVRlVMRU5CUVhkQ0xFbEJRWGhDTzBGQlEwRldMR0ZCUVZOWExFOUJRVlFzUTBGQmFVSXpSeXhaUVVGWk5FY3NVVUZCTjBJN1FVRkRRVm9zWVVGQlUyRXNUMEZCVkN4RFFVRnBRamRITEZsQlFWazRSeXhQUVVFM1FqdEJRVU5CTEZGQlFVazVSeXhaUVVGWkswY3NVVUZCYUVJc1JVRkJNRUptTEZOQlFWTm5RaXhQUVVGVUxFTkJRV2xDYUVnc1dVRkJXU3RITEZGQlFUZENPMEZCUXpGQ0xGRkJRVWt2Unl4WlFVRlphVWdzU1VGQmFFSXNSVUZCYzBKcVFpeFRRVUZUYTBJc1QwRkJWQ3hEUVVGcFFteElMRmxCUVZscFNDeEpRVUUzUWp0QlFVTjBRaXhSUVVGSmFrZ3NXVUZCV1cxSUxFbEJRV2hDTEVWQlFYTkNia0lzVTBGQlUyOUNMRTlCUVZRc1EwRkJhVUp3U0N4WlFVRlpiVWdzU1VGQk4wSTdRVUZEZEVJc1VVRkJTVzVJTEZsQlFWbHhTQ3hqUVVGb1FpeEZRVUZuUTNKQ0xGTkJRVk56UWl4UlFVRlVMRU5CUVd0Q2RFZ3NXVUZCV1hGSUxHTkJRVGxDTzBGQlEyaERMRkZCUVVseVNDeFpRVUZaZFVnc1lVRkJhRUlzUlVGQkswSjJRaXhUUVVGVGQwSXNVVUZCVkN4RFFVRnJRbmhJTEZsQlFWbDFTQ3hoUVVFNVFqczdRVUZGTDBJc1VVRkJTWFpJTEZsQlFWbDVTQ3hKUVVGb1FpeEZRVUZ6UWpkRkxFdEJRVXM0UlN4bFFVRk1MRWRCUVhWQ1F5eEZRVUYyUWl4RFFVRXdRaXhEUVVFeFFpeEZRVUUyUWtNc1ZVRkJOMElzUTBGQmQwTTFTQ3haUVVGWmVVZ3NTVUZCY0VRN1FVRkRkRUlzVVVGQlNYcElMRmxCUVZrMlNDeEpRVUZvUWl4RlFVRnpRbXBHTEV0QlFVczRSU3hsUVVGTUxFZEJRWFZDUXl4RlFVRjJRaXhEUVVFd1FpeERRVUV4UWl4RlFVRTJRa2NzVlVGQk4wSXNRMEZCZDBNNVNDeFpRVUZaTmtnc1NVRkJjRVE3UVVGRGRFSXNVVUZCU1RkSUxGbEJRVmtyU0N4SlFVRm9RaXhGUVVGelFtNUdMRXRCUVVzNFJTeGxRVUZNTEVkQlFYVkNReXhGUVVGMlFpeERRVUV3UWl4RFFVRXhRaXhGUVVFMlFrc3NWVUZCTjBJc1EwRkJkME5vU1N4WlFVRlpLMGdzU1VGQmNFUTdPMEZCUlhSQ05VZ3NVMEZCU3poSUxGVkJRVXdzUTBGQlowSnlSaXhKUVVGb1FpeEZRVUZ6UW5wRExFdEJRVXNyU0N4cFFrRkJNMElzUlVGQk9FTkRMR2xDUVVFNVF5eEhRVUZyUlVNc1UwRkJiRVVzUTBGQk5FVndTU3haUVVGWmNVa3NUVUZCV2l4SFFVRnhRbkpKTEZsQlFWbHhTU3hOUVVGcVF5eEhRVUV3UXl4SFFVRjBTRHRCUVVOQmVrWXNVMEZCU3pCR0xHdENRVUZNTEVOQlFYZENkRWtzV1VGQldYVkpMRXRCUVZvc1NVRkJjVUlzUTBGQk4wTTdRVUZEUVROR0xGTkJRVXN4UXl4SlFVRk1MRWRCUVZrc1EwRkJXaXhEUVhoQ01rTXNRMEYzUWpWQ08wRkJRMllzVVVGQlNVWXNXVUZCV1VVc1NVRkJXaXhMUVVGeFFpeGpRVUY2UWl4RlFVRjVRekJETEV0QlFVczBSaXhKUVVGTUxFZEJRVmtzU1VGQldqdEJRVU42UXl4UlFVRkplRWtzV1VGQldVVXNTVUZCV2l4TFFVRnhRaXhsUVVGNlFpeEZRVUV3UXpCRExFdEJRVXMyUml4TFFVRk1MRWRCUVdFc1NVRkJZanM3UVVGRk1VTjJUQ3hsUVVGWEswTXNWMEZCV0RzN1FVRkZRV3hETEZsQlFWRXdReXhKUVVGU0xFTkJRV0ZVTEZsQlFWa3dTU3hSUVVGYUxFTkJRWEZDY0Vrc1EwRkJiRU03UVVGRFFYWkRMRmxCUVZFeVF5eEpRVUZTTEVOQlFXRldMRmxCUVZrd1NTeFJRVUZhTEVOQlFYRkNia2tzUTBGQmJFTTdRVUZEUVhoRExGbEJRVkUwUXl4SlFVRlNMRU5CUVdGWUxGbEJRVmt3U1N4UlFVRmFMRU5CUVhGQ2JFa3NRMEZCYkVNN1FVRkRRWFJFTEdWQlFWZDVUQ3hUUVVGWUxFTkJRWEZDTlVzc1QwRkJja0k3TzBGQlJVRkhMRlZCUVUxMVF5eEpRVUZPTEVOQlFWZFVMRmxCUVZrMFNTeFJRVUZhTEVOQlFYRkNkRWtzUTBGQmFFTTdRVUZEUVhCRExGVkJRVTEzUXl4SlFVRk9MRU5CUVZkV0xGbEJRVmswU1N4UlFVRmFMRU5CUVhGQ2Nra3NRMEZCYUVNN1FVRkRRWEpETEZWQlFVMTVReXhKUVVGT0xFTkJRVmRZTEZsQlFWazBTU3hSUVVGYUxFTkJRWEZDY0Vrc1EwRkJhRU03UVVGRFFYUkRMRlZCUVUweVN5eEpRVUZPTEVOQlFWYzNTU3haUVVGWk5Fa3NVVUZCV2l4RFFVRnhRa1VzUTBGQmFFTTdRVUZEUVRWTUxHVkJRVmMyVEN4WFFVRllMRU5CUVhWQ04wc3NTMEZCZGtJN08wRkJSVUV3UlN4VFFVRkxiMGNzVTBGQlRDeERRVUZsT1V3c1ZVRkJaanM3UVVGRlFUQkdMRk5CUVV0eFJ5eFpRVUZNTEVOQlFXdENha29zV1VGQldXdEtMRWxCUVRsQ0xFVkJRVzlETEV0QlFYQkRPMEZCUTBGd1RDeFZRVUZOY1V3c1YwRkJUaXhEUVVGclFuWkhMRWxCUVd4Q0xFVkJRWGRDTEVOQlFYaENMRVZCUVRKQ0xFTkJRVU1zUTBGQk5VSTdRVUZEUVN4UlFVRkpOVU1zV1VGQldVVXNTVUZCV2l4TFFVRnhRaXhoUVVGNlFpeEZRVUYzUTNaRExIbENRVUY1UW1sR0xFdEJRVXQzUnl4WFFVRk1MRWRCUVcxQ1F5eEpRVUZ1UWl4TFFVRTBRaXhEUVVGeVJDeERRVUY0UXl4TFFVTkxNVXdzZVVKQlFYbENhVVlzUzBGQlN6QkhMRmRCUVV3c1IwRkJiVUpFTEVsQlFXNUNMRXRCUVRSQ0xFTkJRWEpFT3p0QlFVVk1OMHc3UVVGRFJDeEhRV3BFUkN4TlFXbEVUenRCUVVOTUxGRkJRVWx6UXl4UlFVRlJReXhaUVVGWlF5eFhRVUZhTEVOQlFWbzdPMEZCUlVFc1VVRkJTU3hEUVVGRFJpeExRVUZNTEVWQlFWazdPMEZCUlZvN1FVRkRRU3hSUVVGSlJTeFpRVUZaZFVvc1VVRkJhRUlzUlVGQk1FSTdRVUZEZUVJc1ZVRkJUVU1zYVVKQlFXbENMRWxCUVVseVNpeExRVUZMUXl4bFFVRlVMRVZCUVhaQ08wRkJRMEZ2U2l4eFFrRkJaVU1zWVVGQlppeERRVUUyUW5aTkxGVkJRVGRDTEVWQlFYbERORU1zUzBGQmVrTTdPMEZCUlVFc1YwRkJTeXhKUVVGSk5FSXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKTVVJc1dVRkJXWFZLTEZGQlFWb3NRMEZCY1VJNVNDeE5RVUY2UXl4RlFVRnBSRU1zUjBGQmFrUXNSVUZCYzBRN1FVRkRjRVFzV1VGQlRXZEpMRk5CUVZNeFNpeFpRVUZaZFVvc1VVRkJXaXhEUVVGeFFqZElMRU5CUVhKQ0xFTkJRV1k3TzBGQlJVRXNXVUZCVFdsSkxGRkJRVkVzU1VGQlNYaEtMRXRCUVVzNFJDeFhRVUZVTEVWQlFXUTdRVUZEUVRCR0xHTkJRVTB4U2l4WFFVRk9PenRCUVVWQmJFTXNaMEpCUVZFd1F5eEpRVUZTTEVOQlFXRnBTaXhQUVVGUFJTeGxRVUZRTEVOQlFYVkNkRW9zUTBGQmNFTTdRVUZEUVhaRExHZENRVUZSTWtNc1NVRkJVaXhEUVVGaFowb3NUMEZCVDBVc1pVRkJVQ3hEUVVGMVFuSktMRU5CUVhCRE8wRkJRMEY0UXl4blFrRkJVVFJETEVsQlFWSXNRMEZCWVN0SkxFOUJRVTlGTEdWQlFWQXNRMEZCZFVKd1NpeERRVUZ3UXp0QlFVTkJiVW9zWTBGQlRXaENMRk5CUVU0c1EwRkJaMEkxU3l4UFFVRm9RanM3UVVGRlFVY3NZMEZCVFhWRExFbEJRVTRzUTBGQlYybEtMRTlCUVU5a0xGRkJRVkFzUTBGQlowSjBTU3hEUVVFelFqdEJRVU5CY0VNc1kwRkJUWGRETEVsQlFVNHNRMEZCVjJkS0xFOUJRVTlrTEZGQlFWQXNRMEZCWjBKeVNTeERRVUV6UWp0QlFVTkJja01zWTBGQlRYbERMRWxCUVU0c1EwRkJWeXRKTEU5QlFVOWtMRkZCUVZBc1EwRkJaMEp3U1N4RFFVRXpRanRCUVVOQmRFTXNZMEZCVFRKTExFbEJRVTRzUTBGQlYyRXNUMEZCVDJRc1VVRkJVQ3hEUVVGblFrVXNRMEZCTTBJN1FVRkRRV0VzWTBGQlRWb3NWMEZCVGl4RFFVRnJRamRMTEV0QlFXeENPenRCUVVWQk5FSXNaMEpCUVZGRExGbEJRVmxETEZsQlFWbDFTaXhSUVVGYUxFTkJRWEZDTjBnc1EwRkJja0lzUTBGQldpeERRVUZTTzBGQlEwRTRTQ3gxUWtGQlpVTXNZVUZCWml4RFFVRTJRa1VzUzBGQk4wSXNSVUZCYjBNM1NpeExRVUZ3UXp0QlFVTkJTeXhoUVVGTE1Fb3NUMEZCVEN4RFFVRmhSaXhMUVVGaU8wRkJRMFE3TzBGQlJVUTNTaXhqUVVGUk1Fb3NZMEZCVWp0QlFVTkJOMHNzZFVKQlFXbENjVUlzV1VGQldUWkNMRVZCUVRkQ0xFbEJRVzFETDBJc1MwRkJia003UVVGRFJEczdRVUZGUkM5Q0xGbEJRVkV3UXl4SlFVRlNMRU5CUVdGVUxGbEJRVms0U2l4TFFVRmFMRU5CUVd0Q2VFb3NRMEZCTDBJN1FVRkRRWFpETEZsQlFWRXlReXhKUVVGU0xFTkJRV0ZXTEZsQlFWazRTaXhMUVVGYUxFTkJRV3RDZGtvc1EwRkJMMEk3UVVGRFFYaERMRmxCUVZFMFF5eEpRVUZTTEVOQlFXRllMRmxCUVZrNFNpeExRVUZhTEVOQlFXdENkRW9zUTBGQkwwSTdPMEZCUlVGV0xGVkJRVTFwU3l4bFFVRk9MRU5CUVhOQ2FFMHNUMEZCZEVJN08wRkJSVUZCTEZsQlFWRXdReXhKUVVGU0xFTkJRV0VzUTBGQllqdEJRVU5CTVVNc1dVRkJVVEpETEVsQlFWSXNRMEZCWVN4RFFVRmlPMEZCUTBFelF5eFpRVUZSTkVNc1NVRkJVaXhEUVVGaExFTkJRV0k3UVVGRFFXSXNWVUZCVFd0TExIRkNRVUZPTEVOQlFUUkNhRXNzV1VGQldXdEtMRWxCUVhoRExFVkJRVGhEYmt3c1QwRkJPVU03TzBGQlJVRmlMR1ZCUVZjclF5eFhRVUZZT3p0QlFVVkJha01zV1VGQlVYbERMRWxCUVZJc1EwRkJZVlFzV1VGQldUQkpMRkZCUVZvc1EwRkJjVUp3U1N4RFFVRnNRenRCUVVOQmRFTXNXVUZCVVRCRExFbEJRVklzUTBGQllWWXNXVUZCV1RCSkxGRkJRVm9zUTBGQmNVSnVTU3hEUVVGc1F6dEJRVU5CZGtNc1dVRkJVVEpETEVsQlFWSXNRMEZCWVZnc1dVRkJXVEJKTEZGQlFWb3NRMEZCY1VKc1NTeERRVUZzUXp0QlFVTkJkRVFzWlVGQlYzbE1MRk5CUVZnc1EwRkJjVUl6U3l4UFFVRnlRanM3UVVGRlFVVXNWVUZCVFhWRExFbEJRVTRzUTBGQlYxUXNXVUZCV1RSSkxGRkJRVm9zUTBGQmNVSjBTU3hEUVVGb1F6dEJRVU5CY0VNc1ZVRkJUWGRETEVsQlFVNHNRMEZCVjFZc1dVRkJXVFJKTEZGQlFWb3NRMEZCY1VKeVNTeERRVUZvUXp0QlFVTkJja01zVlVGQlRYbERMRWxCUVU0c1EwRkJWMWdzV1VGQldUUkpMRkZCUVZvc1EwRkJjVUp3U1N4RFFVRm9RenRCUVVOQmRFTXNWVUZCVFRKTExFbEJRVTRzUTBGQlZ6ZEpMRmxCUVZrMFNTeFJRVUZhTEVOQlFYRkNSU3hEUVVGb1F6dEJRVU5CTlV3c1pVRkJWelpNTEZkQlFWZ3NRMEZCZFVJM1N5eExRVUYyUWpzN1FVRkZRVFJJTEd0Q1FVRmpMRWxCUVVrelJpeExRVUZMT0Vvc2IwSkJRVlFzUTBGQk9FSXZUU3hWUVVFNVFpeERRVUZrTEVOQk5VUkxMRU5CTkVSdlJEdEJRVU42UkN4UlFVRk5aMDRzVTBGQlV5eEpRVUZKTDBvc1MwRkJTMmRMTERKQ1FVRlVMRU5CUVhGRGJrc3NXVUZCV1d0S0xFbEJRV3BFTEVWQlFYVkVjRVFzVjBGQmRrUXNSVUZCYjBWb1J5eExRVUZ3UlN4RlFVRXlSUzlDTEU5QlFUTkZMRU5CUVdZN08wRkJSVUZ0VFN4WFFVRlBSU3hqUVVGUUxFTkJRWE5DY0Vzc1dVRkJXVFJITEZGQlFXeERPMEZCUTBGelJDeFhRVUZQUnl4cFFrRkJVQ3hEUVVGNVFuSkxMRmxCUVZselN5eFhRVUZ5UXp0QlFVTkJTaXhYUVVGUFN5eHRRa0ZCVUN4RFFVRXlRblpMTEZsQlFWazRSeXhQUVVGMlF6dEJRVU5CYjBRc1YwRkJUMDBzYjBKQlFWQXNRMEZCTkVKNFN5eFpRVUZaT0Vjc1QwRkJlRU03TzBGQlJVRnNSU3hYUVVGUExFbEJRVWw2UXl4TFFVRkxjMHNzVjBGQlZDeERRVUZ4UWxBc1RVRkJja0lzUTBGQlVEdEJRVU5CTDBvc1UwRkJTemhJTEZWQlFVd3NRMEZCWjBKeVJpeEpRVUZvUWl4RlFVRnpRbnBETEV0QlFVc3JTQ3hwUWtGQk0wSXNSVUZCT0VORExHbENRVUU1UXl4SFFVRnJSVU1zVTBGQmJFVXNRMEZCTkVWd1NTeFpRVUZaY1Vrc1RVRkJXaXhIUVVGeFFuSkpMRmxCUVZseFNTeE5RVUZxUXl4SFFVRXdReXhEUVVGMFNEdEJRVU5CZWtZc1UwRkJTekJHTEd0Q1FVRk1MRU5CUVhkQ2RFa3NXVUZCV1hWSkxFdEJRVm9zU1VGQmNVSXNRMEZCTjBNN1FVRkRRWEJKTEZOQlFVc3dTaXhQUVVGTUxFTkJRV0ZMTEUxQlFXSTdPMEZCUlVFc1VVRkJTU3hQUVVGUGJFc3NXVUZCV1RCTExHVkJRVzVDTEV0QlFYVkRMRmRCUVRORExFVkJRWGRFT1Vnc1MwRkJTeXRJTEdsQ1FVRk1MRU5CUVhWQ00wc3NXVUZCV1RCTExHVkJRVzVET3p0QlFVVjRSQ3hSUVVGSk1Vc3NXVUZCV1RSTExFdEJRVm9zU1VGQmNVSTFTeXhaUVVGWk5rc3NTVUZCY2tNc1JVRkJNa012VFN4TlFVRk5aMDRzV1VGQlRpeERRVUZ0UW14SkxFbEJRVzVDTEVWQlFYbENOVU1zV1VGQldUUkxMRXRCUVhKRExFVkJRVFJETlVzc1dVRkJXVFpMTEVsQlFYaEVMRVZCUVRORExFdEJRMHN2VFN4TlFVRk5aMDRzV1VGQlRpeERRVUZ0UW14SkxFbEJRVzVDTzBGQlEweEJMRk5CUVVzeFF5eEpRVUZNTEVkQlFWa3NRMEZCV2l4RFFUZEZTeXhEUVRaRlZUdEJRVU5tTTBNN1FVRkRSRHM3UVVGRlJIRkdMRTlCUVV0dFNTeFJRVUZNT3p0QlFVVkJia2tzVDBGQlMyWXNSVUZCVEN4SFFVRlZOMElzV1VGQldUWkNMRVZCUVhSQ08wRkJRMEY2UkN4WFFVRlRkMFVzUzBGQlMyWXNSVUZCWkN4SlFVRnZRbVVzU1VGQmNFSTdRVUZEUVc1RkxHbENRVUZsYlVVc1MwRkJTMllzUlVGQmNFSXNTVUZCTUVKcFJTeFhRVUV4UWpzN1FVRkZRWFpJTEdkQ1FVRmpjVVVzUzBGQlMyOUpMRU5CUVV3c1MwRkJWM0JNTEZOQlFWZ3NSMEZCZFVKblJDeExRVUZMVkN4SFFVRTFRaXhIUVVGclExTXNTMEZCUzI5SkxFTkJRWEpFTEVsQlFUQkVjRWtzUzBGQlMyWXNSVUZCTDBRN1FVRkRRWFpGT3p0QlFVVkJhRUlzYzBKQlFXOUNMRVZCUVVONVNDeExRVUZMTEdGQlFVNHNSVUZCY1VKTUxGRkJRVkZrTEV0QlFVdG1MRVZCUVd4RExFVkJRWEJDTzBGQlEwUXNRMEV2U1VRN08wRkJhVXBCTVVRc2FVSkJRV2xDT0Uwc1ZVRkJha0lzUjBGQk9FSXNWVUZCUTJwTUxGZEJRVVFzUlVGQmFVSTdRVUZETjBNc1RVRkJUV3RNTEdsQ1FVRnBRaXhKUVVGSkwwc3NTMEZCUzJkTUxHVkJRVlFzUlVGQmRrSTdPMEZCUlVGRUxHbENRVUZsUlN4NVFrRkJaaXhEUVVGNVEzQk1MRmxCUVZseFRDeHZRa0ZCY2tRN1FVRkRRVWdzYVVKQlFXVkpMREpDUVVGbUxFTkJRVEpEZEV3c1dVRkJXWFZNTEhOQ1FVRjJSRHRCUVVOQlRDeHBRa0ZCWlUwc2RVSkJRV1lzUTBGQmRVTjRUQ3haUVVGWmVVd3NhMEpCUVc1RU8wRkJRMEZRTEdsQ1FVRmxVU3d5UWtGQlppeERRVUV5UXpGTUxGbEJRVmt5VEN4eFFrRkJka1E3UVVGRFFWUXNhVUpCUVdWVkxIZENRVUZtTEVOQlFYZEROVXdzV1VGQldUWk1MRzlDUVVGd1JEczdRVUZGUVN4TlFVRk5ReXhWUVVGVkxFbEJRVWt6VEN4TFFVRkxORXdzWjBKQlFWUXNRMEZEWkdJc1kwRkVZeXhGUVVWa09VMHNVMEZCVXpSQ0xGbEJRVmxuVFN4VFFVRnlRaXhEUVVaakxFVkJSMlFzU1VGQlNUZE1MRXRCUVVzNFRDeDVRa0ZCVkN4RFFVRnRRMjVQTEV0QlFXNURMRU5CU0dNc1EwRkJhRUk3TzBGQlRVRm5UeXhWUVVGUlNTeE5RVUZTTEVkQlFXbENhRUlzWTBGQmFrSTdRVUZEUVRsTkxGZEJRVk0wUWl4WlFVRlpaMDBzVTBGQmNrSXNSVUZCWjBNeFJDeHJRa0ZCYUVNc1EwRkJiVVFzUTBGQmJrUTdRVUZEUVhkRUxGVkJRVkZMTEcxQ1FVRlNMRU5CUVRSQ0xFTkJRVFZDTEVWQlFTdENMRU5CUVM5Q0xFVkJRV3RETEVOQlFXeERPenRCUVVWQmNrOHNVVUZCVFcxT0xGVkJRVTRzUTBGQmFVSmhMRTlCUVdwQ08wRkJRMEY2VGl4WlFVRlZNa0lzV1VGQldUWkNMRVZCUVhSQ0xFbEJRVFJDYVVzc1QwRkJOVUk3UVVGRFJDeERRWEpDUkR0QlFYTkNRVE5PTEdsQ1FVRnBRbWxQTEdGQlFXcENMRWRCUVdsRExGVkJRVU53VFN4WFFVRkVMRVZCUVdsQ08wRkJRMmhFTTBJc1dVRkJWVEpDTEZsQlFWazJRaXhGUVVGMFFpeEpRVUUwUWl4SlFVRTFRanRCUVVORUxFTkJSa1E3TzBGQlNVRXhSQ3hwUWtGQmFVSnJUeXhSUVVGcVFpeEhRVUUwUWl4VlFVRkRjazBzVjBGQlJDeEZRVUZwUWp0QlFVTXpReXhOUVVGSk0wSXNWVUZCVlRKQ0xGbEJRVmsyUWl4RlFVRjBRaXhOUVVFNFFtcERMRk5CUVd4RExFVkJRVFpETzBGQlF6TkRMRkZCUVVselRTeFRRVUZUTjA0c1ZVRkJWVEpDTEZsQlFWazJRaXhGUVVGMFFpeEZRVUV3UW5GTExFMUJRWFpETzBGQlEwRXNVVUZCU1d4TkxGbEJRVmxyVFN4TlFVRmFMRXRCUVhWQ2RFMHNVMEZCTTBJc1JVRkJjME03UVVGRGNFTnpUU3hsUVVGVExFbEJRVWt2VEN4TFFVRkxaMHdzWlVGQlZDeEZRVUZVTzBGQlEwRmxMR0ZCUVU5a0xIbENRVUZRTEVOQlFXbERjRXdzV1VGQldXdE5MRTFCUVZvc1EwRkJiVUppTEc5Q1FVRndSRHRCUVVOQllTeGhRVUZQV2l3eVFrRkJVQ3hEUVVGdFEzUk1MRmxCUVZsclRTeE5RVUZhTEVOQlFXMUNXQ3h6UWtGQmRFUTdRVUZEUVZjc1lVRkJUMVlzZFVKQlFWQXNRMEZCSzBKNFRDeFpRVUZaYTAwc1RVRkJXaXhEUVVGdFFsUXNhMEpCUVd4RU8wRkJRMEZUTEdGQlFVOVNMREpDUVVGUUxFTkJRVzFETVV3c1dVRkJXV3ROTEUxQlFWb3NRMEZCYlVKUUxIRkNRVUYwUkR0QlFVTkJUeXhoUVVGUFRpeDNRa0ZCVUN4RFFVRm5RelZNTEZsQlFWbHJUU3hOUVVGYUxFTkJRVzFDVEN4dlFrRkJia1E3UVVGRFJEczdRVUZGUkRsT0xGbEJRVkV3UXl4SlFVRlNMRU5CUVdGVUxGbEJRVmx6VFN4blFrRkJXaXhEUVVFMlFtaE5MRU5CUVRGRE8wRkJRMEYyUXl4WlFVRlJNa01zU1VGQlVpeERRVUZoVml4WlFVRlpjMDBzWjBKQlFWb3NRMEZCTmtJdlRDeERRVUV4UXp0QlFVTkJlRU1zV1VGQlVUUkRMRWxCUVZJc1EwRkJZVmdzV1VGQldYTk5MR2RDUVVGYUxFTkJRVFpDT1V3c1EwRkJNVU03TzBGQlJVRjRReXhaUVVGUmVVTXNTVUZCVWl4RFFVRmhWQ3haUVVGWmRVMHNaVUZCV2l4RFFVRTBRbXBOTEVOQlFYcERPMEZCUTBGMFF5eFpRVUZSTUVNc1NVRkJVaXhEUVVGaFZpeFpRVUZaZFUwc1pVRkJXaXhEUVVFMFFtaE5MRU5CUVhwRE8wRkJRMEYyUXl4WlFVRlJNa01zU1VGQlVpeERRVUZoV0N4WlFVRlpkVTBzWlVGQldpeERRVUUwUWk5TUxFTkJRWHBET3p0QlFVVkJka01zV1VGQlVYZERMRWxCUVZJc1EwRkJZVlFzV1VGQldYZE5MRlZCUVZvc1EwRkJkVUpzVFN4RFFVRndRenRCUVVOQmNrTXNXVUZCVVhsRExFbEJRVklzUTBGQllWWXNXVUZCV1hkTkxGVkJRVm9zUTBGQmRVSnFUU3hEUVVGd1F6dEJRVU5CZEVNc1dVRkJVVEJETEVsQlFWSXNRMEZCWVZnc1dVRkJXWGROTEZWQlFWb3NRMEZCZFVKb1RTeERRVUZ3UXpzN1FVRkZRVzVETEdOQlFWVXlRaXhaUVVGWk5rSXNSVUZCZEVJc1JVRkJNRUozU3l4UlFVRXhRaXhEUVVORmRFOHNUMEZFUml4RlFVVkZReXhQUVVaR0xFVkJSMFZETEU5QlNFWXNSVUZKUlN0Q0xGbEJRVmw1VFN4elFrRktaQ3hGUVV0RmVrMHNXVUZCV1RCTkxGbEJUR1FzUlVGTlJWSXNUVUZPUml4RlFVOUZiRTBzV1VGQldUSk5MR05CVUdRN1FVRlRSRHM3UVVGRlJHeFFPenRCUVVWQkxFMUJRVWtyUWl4dlFrRkJTaXhGUVVFd1FqdEJRVU40UWxJc2IwSkJRV2RDTEVsQlFVbHZSaXhaUVVGS0xFTkJRV2xDTEVsQlFVa3pSeXhqUVVGak1rSXNjMEpCUVc1RExFTkJRV2hDTEVOQlJIZENMRU5CUTI5RU8wRkJRelZGU2l4clFrRkJZeXhEUVVGa0xFbEJRVzFDZEVNc1kwRkJZMGNzWVVGQmFrTTdRVUZEUkN4SFFVaEVMRTFCUjA5dFF5eG5Ra0ZCWjBJc1EwRkJRM1JETEdOQlFXTkhMR0ZCUVdZc1EwRkJhRUk3UVVGRFVpeERRWHBEUkRzN1FVRXlRMEZ6UWl4cFFrRkJhVUo1VHl4WFFVRnFRaXhIUVVFclFpeFZRVUZEUXl4UFFVRkVMRVZCUVdFN1FVRkRNVU1zVFVGQlNYaFBMRlZCUVZWM1R5eFJRVUZSYUV3c1JVRkJiRUlzVFVGQk1FSnFReXhUUVVFNVFpeEZRVUY1UTNaQ0xGVkJRVlYzVHl4UlFVRlJhRXdzUlVGQmJFSXNSVUZCYzBKcFRDeG5Ra0ZCZEVJc1EwRkJkVU5FTEZGQlFWRkZMRkZCUVM5RExFVkJRWGxFUml4UlFVRlJSeXhMUVVGcVJUdEJRVU14UXl4RFFVWkVPenRCUVVsQk4wOHNhVUpCUVdsQ09FOHNVVUZCYWtJc1IwRkJORUlzVlVGQlEwb3NUMEZCUkN4RlFVRmhPMEZCUTNaRExFMUJRVWw0VHl4VlFVRlZkMDhzVVVGQlVXaE1MRVZCUVd4Q0xFMUJRVEJDYWtNc1UwRkJPVUlzUlVGQmVVTjJRaXhWUVVGVmQwOHNVVUZCVVdoTUxFVkJRV3hDTEVWQlFYTkNiMHdzVVVGQmRFSXNRMEZCSzBKS0xGRkJRVkZMTEV0QlFYWkRMRVZCUVRoRFRDeFJRVUZSUnl4TFFVRjBSRHRCUVVNeFF5eERRVVpFT3p0QlFVbEJOMDhzYVVKQlFXbENaMUFzWjBKQlFXcENMRWRCUVc5RExGVkJRVU5PTEU5QlFVUXNSVUZCWVR0QlFVTXZReXhOUVVGSmVFOHNWVUZCVlhkUExGRkJRVkZvVEN4RlFVRnNRaXhOUVVFd1FtcERMRk5CUVRsQ0xFVkJRWGxEZGtJc1ZVRkJWWGRQTEZGQlFWRm9UQ3hGUVVGc1FpeEZRVUZ6UW5OTUxHZENRVUYwUWl4RFFVRjFRMDRzVVVGQlVVOHNTMEZCTDBNc1JVRkJjMFJRTEZGQlFWRkhMRXRCUVRsRU8wRkJRekZETEVOQlJrUTdPMEZCU1VFM1R5eHBRa0ZCYVVKclVDeFpRVUZxUWl4SFFVRm5ReXhWUVVGRFVpeFBRVUZFTEVWQlFXRTdRVUZETTBNc1RVRkJTWHBQTEZOQlFWTjVUeXhSUVVGUmFFd3NSVUZCYWtJc1JVRkJjVUl6UWl4SlFVRnlRaXhMUVVFNFFpeERRVUZzUXl4RlFVRnhRenRCUVVOdVF6RkRPMEZCUTBGSExEWkNRVUY1UWxNc1UwRkJVM2xQTEZGQlFWRm9UQ3hGUVVGcVFpeEZRVUZ4UW5sSUxGZEJRWEpDTEVkQlFXMURSQ3hKUVVGdVF5eEZRVUY2UWp0QlFVTkJka3dzVlVGQlRYZFFMR05CUVU0c1EwRkJjVUpzVUN4VFFVRlRlVThzVVVGQlVXaE1MRVZCUVdwQ0xFTkJRWEpDTzBGQlEwUXNSMEZLUkN4TlFVbFBMRWxCUVVsNlJDeFRRVUZUZVU4c1VVRkJVV2hNTEVWQlFXcENMRVZCUVhGQ00wSXNTVUZCY2tJc1MwRkJPRUlzUTBGQmJFTXNSVUZCY1VNN1FVRkRNVU16UXp0QlFVTkJUeXhWUVVGTmVWQXNaVUZCVGl4RFFVRnpRbTVRTEZOQlFWTjVUeXhSUVVGUmFFd3NSVUZCYWtJc1EwRkJkRUk3UVVGRFFURkNMRk5CUVVzd1NpeFBRVUZNTEVOQlFXRndUQ3hsUVVGbGIwOHNVVUZCVVdoTUxFVkJRWFpDTEVOQlFXSTdRVUZEUkRzN1FVRkZSREZDTEU5QlFVc3dTaXhQUVVGTUxFTkJRV0Y2VEN4VFFVRlRlVThzVVVGQlVXaE1MRVZCUVdwQ0xFTkJRV0k3UVVGRFFTeE5RVUZKYkVRc2FVSkJRV2xDYTA4c1VVRkJVV2hNTEVWQlFYcENMRU5CUVVvc1JVRkJhME14UWl4TFFVRkxNRW9zVDBGQlRDeERRVUZoYkV3c2FVSkJRV2xDYTA4c1VVRkJVV2hNTEVWQlFYcENMRU5CUVdJN1FVRkRiRU1zVFVGQlNXNUVMR3RDUVVGclFtMVBMRkZCUVZGb1RDeEZRVUV4UWl4RFFVRktMRVZCUVcxRE1VSXNTMEZCU3pCS0xFOUJRVXdzUTBGQllXNU1MR3RDUVVGclFtMVBMRkZCUVZGb1RDeEZRVUV4UWl4RFFVRmlPenRCUVVWdVEzUkVMR2RDUVVGalNDeFRRVUZUZVU4c1VVRkJVV2hNTEVWQlFXcENMRVZCUVhGQ2JVb3NRMEZCY2tJc1MwRkJNa0p3VEN4VFFVRXpRaXhIUVVGMVEzaENMRk5CUVZONVR5eFJRVUZSYUV3c1JVRkJha0lzUlVGQmNVSnRTaXhEUVVFMVJDeEhRVUZuUlRWTkxGTkJRVk41VHl4UlFVRlJhRXdzUlVGQmFrSXNSVUZCY1VKTkxFZEJRVzVITEVsQlFUQkhMRWxCUVRGSE8wRkJRMEV2UkN4WFFVRlRlVThzVVVGQlVXaE1MRVZCUVdwQ0xFbEJRWFZDTEVsQlFYWkNPMEZCUTBGd1JDeHBRa0ZCWlc5UExGRkJRVkZvVEN4RlFVRjJRaXhKUVVFMlFpeEpRVUUzUWpzN1FVRkZRU3hOUVVGSmJFUXNhVUpCUVdsQ2EwOHNVVUZCVVdoTUxFVkJRWHBDTEVOQlFVb3NSVUZCYTBOc1JDeHBRa0ZCYVVKclR5eFJRVUZSYUV3c1JVRkJla0lzU1VGQkswSXNTVUZCTDBJN1FVRkRiRU1zVFVGQlNXNUVMR3RDUVVGclFtMVBMRkZCUVZGb1RDeEZRVUV4UWl4RFFVRktMRVZCUVcxRGJrUXNhMEpCUVd0Q2JVOHNVVUZCVVdoTUxFVkJRVEZDTEVsQlFXZERMRWxCUVdoRE8wRkJRMjVEZGtVN1FVRkRSQ3hEUVhSQ1JEczdRVUYzUWtGaExHbENRVUZwUW5GUUxHVkJRV3BDTEVkQlFXMURMRlZCUVVOWUxFOUJRVVFzUlVGQllUdEJRVU01UXpkUUxGbEJRVlZ2UWl4VFFVRlRlVThzVVVGQlVXaE1MRVZCUVdwQ0xFTkJRVlk3TzBGQlJVRXNUVUZCU1RkRkxGRkJRVkZyUkN4SlFVRlNMRXRCUVdsQ0xFTkJRWEpDTEVWQlFYZENPMEZCUTNSQ2JFUXNXVUZCVVhsUkxHTkJRVklzUjBGQmVVSkRMR2xDUVVGNlFpeERRVUV5UTNoUkxGVkJRVE5ET3p0QlFVVkJMRkZCUVVreVVDeFJRVUZSWXl4SFFVRmFMRVZCUVdsQ08wRkJRMlkxVUN4alFVRlJNRU1zU1VGQlVpeERRVUZoYjAwc1VVRkJVV01zUjBGQlVpeERRVUZaY2s0c1EwRkJla0k3UVVGRFFYWkRMR05CUVZFeVF5eEpRVUZTTEVOQlFXRnRUU3hSUVVGUll5eEhRVUZTTEVOQlFWbHdUaXhEUVVGNlFqdEJRVU5CZUVNc1kwRkJVVFJETEVsQlFWSXNRMEZCWVd0TkxGRkJRVkZqTEVkQlFWSXNRMEZCV1c1T0xFTkJRWHBDTzBGQlEwRjBSQ3hwUWtGQlYzbE1MRk5CUVZnc1EwRkJjVUkxU3l4UFFVRnlRanRCUVVORU96dEJRVVZFTEZGQlFVazRUeXhSUVVGUlpTeEpRVUZhTEVWQlFXdENPMEZCUTJoQ01WQXNXVUZCVFhWRExFbEJRVTRzUTBGQlYyOU5MRkZCUVZGbExFbEJRVklzUTBGQllYUk9MRU5CUVhoQ08wRkJRMEZ3UXl4WlFVRk5kME1zU1VGQlRpeERRVUZYYlUwc1VVRkJVV1VzU1VGQlVpeERRVUZoY2s0c1EwRkJlRUk3UVVGRFFYSkRMRmxCUVUxNVF5eEpRVUZPTEVOQlFWZHJUU3hSUVVGUlpTeEpRVUZTTEVOQlFXRndUaXhEUVVGNFFqdEJRVU5CZEVNc1dVRkJUVEpMTEVsQlFVNHNRMEZCVjJkRkxGRkJRVkZsTEVsQlFWSXNRMEZCWVRsRkxFTkJRWGhDTzBGQlEwRTFUQ3hwUWtGQlZ6Wk1MRmRCUVZnc1EwRkJkVUkzU3l4TFFVRjJRanRCUVVORU96dEJRVVZFYkVJc1dVRkJVVFpSTEdsQ1FVRlNMRU5CUVRCQ00xRXNWVUZCTVVJN1FVRkRRVVlzV1VGQlVTdE9MRkZCUVZJN1FVRkRSQ3hIUVhCQ1JDeE5RVzlDVHl4SlFVRkpMMDRzVVVGQlVXdEVMRWxCUVZJc1MwRkJhVUlzUTBGQmNrSXNSVUZCZDBJN1FVRkROMEk3TzBGQlJVRXNVVUZCU1RKTkxGRkJRVkZqTEVkQlFWb3NSVUZCYVVJN1FVRkRaalZRTEdOQlFWRXdReXhKUVVGU0xFTkJRV0Z2VFN4UlFVRlJZeXhIUVVGU0xFTkJRVmx5VGl4RFFVRjZRanRCUVVOQmRrTXNZMEZCVVRKRExFbEJRVklzUTBGQllXMU5MRkZCUVZGakxFZEJRVklzUTBGQldYQk9MRU5CUVhwQ08wRkJRMEY0UXl4alFVRlJORU1zU1VGQlVpeERRVUZoYTAwc1VVRkJVV01zUjBGQlVpeERRVUZaYms0c1EwRkJla0k3UVVGRFFYUkVMR2xDUVVGWGVVd3NVMEZCV0N4RFFVRnhRalZMTEU5QlFYSkNPMEZCUTBRN08wRkJSVVFzVVVGQlNUaFBMRkZCUVZGbExFbEJRVm9zUlVGQmEwSTdRVUZEYUVJeFVDeFpRVUZOZFVNc1NVRkJUaXhEUVVGWGIwMHNVVUZCVVdVc1NVRkJVaXhEUVVGaGRFNHNRMEZCZUVJN1FVRkRRWEJETEZsQlFVMTNReXhKUVVGT0xFTkJRVmR0VFN4UlFVRlJaU3hKUVVGU0xFTkJRV0Z5VGl4RFFVRjRRanRCUVVOQmNrTXNXVUZCVFhsRExFbEJRVTRzUTBGQlYydE5MRkZCUVZGbExFbEJRVklzUTBGQllYQk9MRU5CUVhoQ08wRkJRMEYwUXl4WlFVRk5Na3NzU1VGQlRpeERRVUZYWjBVc1VVRkJVV1VzU1VGQlVpeERRVUZoT1VVc1EwRkJlRUk3UVVGRFFUVk1MR2xDUVVGWE5rd3NWMEZCV0N4RFFVRjFRamRMTEV0QlFYWkNPMEZCUTBRN08wRkJSVVJzUWl4WlFVRlJaMDBzVTBGQlVpeERRVUZyUWpsTUxGVkJRV3hDTzBGQlEwUTdRVUZEUml4RFFUTkRSRHM3UVVFMlEwRnBRaXhwUWtGQmFVSXlVQ3hWUVVGcVFpeEhRVUU0UWl4VlFVRkRha0lzVDBGQlJDeEZRVUZoTzBGQlEzcERPMEZCUTBFM1VDeFpRVUZWYjBJc1UwRkJVM2xQTEZGQlFWRm9UQ3hGUVVGcVFpeERRVUZXT3p0QlFVVkJPMEZCUTBFdlJDeFJRVUZOZVZBc1pVRkJUaXhEUVVGelFuWlJMRTlCUVhSQ096dEJRVVZCWlN4VlFVRlJNRU1zU1VGQlVpeERRVUZoTEVOQlFXSTdRVUZEUVRGRExGVkJRVkV5UXl4SlFVRlNMRU5CUVdFc1EwRkJZanRCUVVOQk0wTXNWVUZCVVRSRExFbEJRVklzUTBGQllTeERRVUZpT3p0QlFVVkJNMFFzVlVGQlVTdFJMRmxCUVZJc1EwRkJjVUpzUWl4UlFVRlJNMFFzU1VGQk4wSXNSVUZCYlVOdVRDeFBRVUZ1UXp0QlFVTkJSQ3hSUVVGTlowNHNXVUZCVGl4RFFVRnRRamxPTEU5QlFXNUNPMEZCUTBGQkxGVkJRVkVyVGl4UlFVRlNPMEZCUTBRc1EwRmtSRHM3UVVGblFrRTFUU3hwUWtGQmFVSTJVQ3h0UWtGQmFrSXNSMEZCZFVNc1ZVRkJRMjVDTEU5QlFVUXNSVUZCWVR0QlFVTnNSRGxQTEZWQlFWRXdReXhKUVVGU0xFTkJRV0Z2VFN4UlFVRlJkazBzUTBGQmNrSTdRVUZEUVhaRExGVkJRVkV5UXl4SlFVRlNMRU5CUVdGdFRTeFJRVUZSZEUwc1EwRkJja0k3UVVGRFFYaERMRlZCUVZFMFF5eEpRVUZTTEVOQlFXRnJUU3hSUVVGUmNrMHNRMEZCY2tJN08wRkJSVUZ3UXl4WFFVRlRlVThzVVVGQlVXaE1MRVZCUVdwQ0xFVkJRWEZDYlUwc2JVSkJRWEpDTEVOQlFYbERhbEVzVDBGQmVrTTdRVUZEUVVzc1YwRkJVM2xQTEZGQlFWRm9UQ3hGUVVGcVFpeEZRVUZ4UW10S0xGRkJRWEpDTzBGQlEwUXNRMEZRUkRzN1FVRlRRVFZOTEdsQ1FVRnBRamhRTEZsQlFXcENMRWRCUVdkRExGVkJRVU53UWl4UFFVRkVMRVZCUVdFN1FVRkRNME01VHl4VlFVRlJNRU1zU1VGQlVpeERRVUZoYjAwc1VVRkJVWEZDTEZOQlFYSkNPMEZCUTBGdVVTeFZRVUZSTWtNc1NVRkJVaXhEUVVGaGJVMHNVVUZCVVhOQ0xGTkJRWEpDTzBGQlEwRndVU3hWUVVGUk5FTXNTVUZCVWl4RFFVRmhhMDBzVVVGQlVYVkNMRk5CUVhKQ096dEJRVVZCY0ZFc1ZVRkJVWGxETEVsQlFWSXNRMEZCWVc5TkxGRkJRVkYyVFN4RFFVRnlRanRCUVVOQmRFTXNWVUZCVVRCRExFbEJRVklzUTBGQllXMU5MRkZCUVZGMFRTeERRVUZ5UWp0QlFVTkJka01zVlVGQlVUSkRMRWxCUVZJc1EwRkJZV3ROTEZGQlFWRnlUU3hEUVVGeVFqczdRVUZGUVhCRExGZEJRVk41VHl4UlFVRlJhRXdzUlVGQmFrSXNSVUZCY1VKdlRTeFpRVUZ5UWl4RFFVTkZiRkVzVDBGRVJpeEZRVVZGUXl4UFFVWkdPMEZCU1VGSkxGZEJRVk41VHl4UlFVRlJhRXdzUlVGQmFrSXNSVUZCY1VKclNpeFJRVUZ5UWp0QlFVTkVMRU5CWkVRN08wRkJaMEpCTlUwc2FVSkJRV2xDYTFFc1YwRkJha0lzUjBGQkswSXNWVUZCUTNoQ0xFOUJRVVFzUlVGQllUdEJRVU14UXpsUExGVkJRVkV3UXl4SlFVRlNMRU5CUVdGdlRTeFJRVUZSZVVJc1VVRkJja0k3UVVGRFFYWlJMRlZCUVZFeVF5eEpRVUZTTEVOQlFXRnRUU3hSUVVGUk1FSXNVVUZCY2tJN1FVRkRRWGhSTEZWQlFWRTBReXhKUVVGU0xFTkJRV0ZyVFN4UlFVRlJNa0lzVVVGQmNrSTdPMEZCUlVGd1VTeFhRVUZUZVU4c1VVRkJVV2hNTEVWQlFXcENMRVZCUVhGQ2QwMHNWMEZCY2tJc1EwRkRSWFJSTEU5QlJFWTdRVUZIUVVzc1YwRkJVM2xQTEZGQlFWRm9UQ3hGUVVGcVFpeEZRVUZ4UW10S0xGRkJRWEpDTzBGQlEwUXNRMEZVUkRzN1FVRlhRVFZOTEdsQ1FVRnBRbk5STEdsQ1FVRnFRaXhIUVVGeFF5eFZRVUZETlVJc1QwRkJSQ3hGUVVGaE8wRkJRMmhFT1U4c1ZVRkJVVEJETEVsQlFWSXNRMEZCWVc5TkxGRkJRVkYyVFN4RFFVRnlRanRCUVVOQmRrTXNWVUZCVVRKRExFbEJRVklzUTBGQllXMU5MRkZCUVZGMFRTeERRVUZ5UWp0QlFVTkJlRU1zVlVGQlVUUkRMRWxCUVZJc1EwRkJZV3ROTEZGQlFWRnlUU3hEUVVGeVFqczdRVUZGUVhCRExGZEJRVk41VHl4UlFVRlJhRXdzUlVGQmFrSXNSVUZCY1VJMFRTeHBRa0ZCY2tJc1EwRkJkVU14VVN4UFFVRjJRenRCUVVOQlN5eFhRVUZUZVU4c1VVRkJVV2hNTEVWQlFXcENMRVZCUVhGQ2Ewb3NVVUZCY2tJN1FVRkRSQ3hEUVZCRU96dEJRVk5CTlUwc2FVSkJRV2xDZFZFc1ZVRkJha0lzUjBGQk9FSXNWVUZCUXpkQ0xFOUJRVVFzUlVGQllUdEJRVU42UXpsUExGVkJRVkV3UXl4SlFVRlNMRU5CUVdGdlRTeFJRVUZST0VJc1QwRkJja0k3UVVGRFFUVlJMRlZCUVZFeVF5eEpRVUZTTEVOQlFXRnRUU3hSUVVGUkswSXNUMEZCY2tJN1FVRkRRVGRSTEZWQlFWRTBReXhKUVVGU0xFTkJRV0ZyVFN4UlFVRlJaME1zVDBGQmNrSTdPMEZCUlVFM1VTeFZRVUZSZVVNc1NVRkJVaXhEUVVGaGIwMHNVVUZCVVhaTkxFTkJRWEpDTzBGQlEwRjBReXhWUVVGUk1FTXNTVUZCVWl4RFFVRmhiVTBzVVVGQlVYUk5MRU5CUVhKQ08wRkJRMEYyUXl4VlFVRlJNa01zU1VGQlVpeERRVUZoYTAwc1VVRkJVWEpOTEVOQlFYSkNPenRCUVVWQmNFTXNWMEZCVTNsUExGRkJRVkZvVEN4RlFVRnFRaXhGUVVGeFFqWk5MRlZCUVhKQ0xFTkJRMFV6VVN4UFFVUkdMRVZCUlVWRExFOUJSa1k3UVVGSlFVa3NWMEZCVTNsUExGRkJRVkZvVEN4RlFVRnFRaXhGUVVGeFFtdEtMRkZCUVhKQ08wRkJRMFFzUTBGa1JEczdRVUZuUWtFMVRTeHBRa0ZCYVVJeVVTeHJRa0ZCYWtJc1IwRkJjME1zV1VGQlRUdEJRVU14UTJwU0xIbENRVUYxUW10U0xFdEJRVXRETEVkQlFVd3NSVUZCZGtJN1FVRkRSQ3hEUVVaRU96dEJRVWxCTjFFc2FVSkJRV2xDT0ZFc2EwSkJRV3BDTEVkQlFYTkRMRlZCUVVOd1F5eFBRVUZFTEVWQlFXRTdRVUZEYWtRNVR5eFZRVUZSTUVNc1NVRkJVaXhEUVVGaGIwMHNVVUZCVVhaTkxFTkJRWEpDTzBGQlEwRjJReXhWUVVGUk1rTXNTVUZCVWl4RFFVRmhiVTBzVVVGQlVYUk5MRU5CUVhKQ08wRkJRMEY0UXl4VlFVRlJORU1zU1VGQlVpeERRVUZoYTAwc1VVRkJVWEpOTEVOQlFYSkNPenRCUVVWQmNFTXNWMEZCVTNsUExGRkJRVkZvVEN4RlFVRnFRaXhGUVVGeFFtOU9MR3RDUVVGeVFpeERRVU5GYkZJc1QwRkVSanRCUVVkQlN5eFhRVUZUZVU4c1VVRkJVV2hNTEVWQlFXcENMRVZCUVhGQ2Ewb3NVVUZCY2tJN1FVRkRSQ3hEUVZSRU96dEJRVmRCTlUwc2FVSkJRV2xDSzFFc2FVSkJRV3BDTEVkQlFYRkRMRlZCUVVOeVF5eFBRVUZFTEVWQlFXRTdRVUZEYUVRNVR5eFZRVUZSTUVNc1NVRkJVaXhEUVVGaGIwMHNVVUZCVVhaTkxFTkJRWEpDTzBGQlEwRjJReXhWUVVGUk1rTXNTVUZCVWl4RFFVRmhiVTBzVVVGQlVYUk5MRU5CUVhKQ08wRkJRMEY0UXl4VlFVRlJORU1zU1VGQlVpeERRVUZoYTAwc1VVRkJVWEpOTEVOQlFYSkNPenRCUVVWQmNFTXNWMEZCVTNsUExGRkJRVkZvVEN4RlFVRnFRaXhGUVVGeFFuRk9MR2xDUVVGeVFpeERRVU5GYmxJc1QwRkVSanRCUVVkQlN5eFhRVUZUZVU4c1VVRkJVV2hNTEVWQlFXcENMRVZCUVhGQ2Ewb3NVVUZCY2tJN1FVRkRSQ3hEUVZSRU96dEJRVmRCTlUwc2FVSkJRV2xDWjFJc1owSkJRV3BDTEVkQlFXOURMRlZCUVVOMFF5eFBRVUZFTEVWQlFXRTdRVUZETDBNNVR5eFZRVUZSTUVNc1NVRkJVaXhEUVVGaGIwMHNVVUZCVVhaTkxFTkJRWEpDTzBGQlEwRjJReXhWUVVGUk1rTXNTVUZCVWl4RFFVRmhiVTBzVVVGQlVYUk5MRU5CUVhKQ08wRkJRMEY0UXl4VlFVRlJORU1zU1VGQlVpeERRVUZoYTAwc1VVRkJVWEpOTEVOQlFYSkNPenRCUVVWQmNFTXNWMEZCVTNsUExGRkJRVkZvVEN4RlFVRnFRaXhGUVVGeFFuTk9MR2RDUVVGeVFpeERRVU5KY0ZJc1QwRkVTanRCUVVkRUxFTkJVa1E3TzBGQlZVRkpMR2xDUVVGcFFtbFNMR1ZCUVdwQ0xFZEJRVzFETEZWQlFVTjJReXhQUVVGRUxFVkJRV0U3UVVGRE9VTTVUeXhWUVVGUk1FTXNTVUZCVWl4RFFVRmhiMDBzVVVGQlVYWk5MRU5CUVhKQ08wRkJRMEYyUXl4VlFVRlJNa01zU1VGQlVpeERRVUZoYlUwc1VVRkJVWFJOTEVOQlFYSkNPMEZCUTBGNFF5eFZRVUZSTkVNc1NVRkJVaXhEUVVGaGEwMHNVVUZCVVhKTkxFTkJRWEpDT3p0QlFVVkJjRU1zVjBGQlUzbFBMRkZCUVZGb1RDeEZRVUZxUWl4RlFVRnhRblZPTEdWQlFYSkNMRU5CUTBWeVVpeFBRVVJHTzBGQlIwUXNRMEZTUkRzN1FVRlZRVWtzYVVKQlFXbENhMUlzVlVGQmFrSXNSMEZCT0VJc1ZVRkJRM2hETEU5QlFVUXNSVUZCWVR0QlFVTjZRM3BQTEZkQlFWTjVUeXhSUVVGUmFFd3NSVUZCYWtJc1JVRkJjVUozVGl4VlFVRnlRaXhEUVVGblEzaERMRkZCUVZGNVF5eE5RVUY0UXl4RlFVRm5SSHBETEZGQlFWRXdReXhQUVVGNFJEdEJRVU5FTEVOQlJrUTdPMEZCU1VGd1VpeHBRa0ZCYVVKeFVpeHhRa0ZCYWtJc1IwRkJlVU1zVlVGQlF6TkRMRTlCUVVRc1JVRkJZVHRCUVVOd1JIcFBMRmRCUVZONVR5eFJRVUZSYUV3c1JVRkJha0lzUlVGQmNVSXlUaXh4UWtGQmNrSXNRMEZCTWtNelF5eFJRVUZSTkVNc1UwRkJia1E3UVVGRFJDeERRVVpFT3p0QlFVbEJkRklzYVVKQlFXbENkVklzZFVKQlFXcENMRWRCUVRKRExGVkJRVU0zUXl4UFFVRkVMRVZCUVdFN1FVRkRkRVI2VHl4WFFVRlRlVThzVVVGQlVXaE1MRVZCUVdwQ0xFVkJRWEZDTms0c2RVSkJRWEpDTEVOQlFUWkROME1zVVVGQlVUVk1MRTFCUVhKRU8wRkJRMFFzUTBGR1JEczdRVUZKUVRsRExHbENRVUZwUW5kU0xHRkJRV3BDTEVkQlFXbERMRlZCUVVNNVF5eFBRVUZFTEVWQlFXRTdRVUZETlVNc1RVRkJTU3RETEcxQ1FVRktPenRCUVVWQkxGVkJRVkV2UXl4UlFVRlJNMDBzU1VGQmFFSTdPMEZCUlVVc1UwRkJTeXhQUVVGTU8wRkJRV003UVVGRFdpeFpRVUZKTWswc1VVRkJVV2RFTEU5QlFWSXNTMEZCYjBKcVVTeFRRVUY0UWl4RlFVRnRRenRCUVVOcVF6ZENMR3RDUVVGUk1FTXNTVUZCVWl4RFFVRmhiMDBzVVVGQlVXbEVMRk5CUVZJc1EwRkJhMEo0VUN4RFFVRXZRanRCUVVOQmRrTXNhMEpCUVZFeVF5eEpRVUZTTEVOQlFXRnRUU3hSUVVGUmFVUXNVMEZCVWl4RFFVRnJRblpRTEVOQlFTOUNPMEZCUTBGNFF5eHJRa0ZCVVRSRExFbEJRVklzUTBGQllXdE5MRkZCUVZGcFJDeFRRVUZTTEVOQlFXdENkRkFzUTBGQkwwSTdPMEZCUlVGdlVDeDFRa0ZCWVN4SlFVRkplbEFzUzBGQlN6UlFMSFZDUVVGVUxFTkJRMWd6VWl4VFFVRlRlVThzVVVGQlVXMUVMRTlCUVdwQ0xFTkJSRmNzUlVGRldHcFRMRTlCUmxjc1EwRkJZanRCUVVsRUxGTkJWRVFzVFVGVFR6dEJRVU5NUVN4clFrRkJVVEJETEVsQlFWSXNRMEZCWVc5TkxGRkJRVkZwUkN4VFFVRlNMRU5CUVd0Q2VGQXNRMEZCTDBJN1FVRkRRWFpETEd0Q1FVRlJNa01zU1VGQlVpeERRVUZoYlUwc1VVRkJVV2xFTEZOQlFWSXNRMEZCYTBKMlVDeERRVUV2UWp0QlFVTkJlRU1zYTBKQlFWRTBReXhKUVVGU0xFTkJRV0ZyVFN4UlFVRlJhVVFzVTBGQlVpeERRVUZyUW5SUUxFTkJRUzlDT3p0QlFVVkJlRU1zYTBKQlFWRjVReXhKUVVGU0xFTkJRV0Z2VFN4UlFVRlJiMFFzVTBGQlVpeERRVUZyUWpOUUxFTkJRUzlDTzBGQlEwRjBReXhyUWtGQlVUQkRMRWxCUVZJc1EwRkJZVzFOTEZGQlFWRnZSQ3hUUVVGU0xFTkJRV3RDTVZBc1EwRkJMMEk3UVVGRFFYWkRMR3RDUVVGUk1rTXNTVUZCVWl4RFFVRmhhMDBzVVVGQlVXOUVMRk5CUVZJc1EwRkJhMEo2VUN4RFFVRXZRanM3UVVGRlFXOVFMSFZDUVVGaExFbEJRVWw2VUN4TFFVRkxORkFzZFVKQlFWUXNRMEZEV0ROU0xGTkJRVk41VHl4UlFVRlJiVVFzVDBGQmFrSXNRMEZFVnl4RlFVVllOVklzVTBGQlUzbFBMRkZCUVZGblJDeFBRVUZxUWl4RFFVWlhMRVZCUjFnNVVpeFBRVWhYTEVWQlNWaERMRTlCU2xjc1EwRkJZanRCUVUxRU8wRkJRMFE3UVVGRFJEdEJRVU5FTEZOQlFVc3NUMEZCVER0QlFVRmpPMEZCUTFvc1dVRkJTVFpQTEZGQlFWRm5SQ3hQUVVGU0xFdEJRVzlDYWxFc1UwRkJlRUlzUlVGQmJVTTdRVUZEYWtNM1FpeHJRa0ZCVVRCRExFbEJRVklzUTBGQllXOU5MRkZCUVZGcFJDeFRRVUZTTEVOQlFXdENlRkFzUTBGQkwwSTdRVUZEUVhaRExHdENRVUZSTWtNc1NVRkJVaXhEUVVGaGJVMHNVVUZCVVdsRUxGTkJRVklzUTBGQmEwSjJVQ3hEUVVFdlFqdEJRVU5CZUVNc2EwSkJRVkUwUXl4SlFVRlNMRU5CUVdGclRTeFJRVUZSYVVRc1UwRkJVaXhEUVVGclFuUlFMRU5CUVM5Q096dEJRVVZCZUVNc2EwSkJRVkY1UXl4SlFVRlNMRU5CUVdGdlRTeFJRVUZSY1VRc1NVRkJVaXhEUVVGaE5WQXNRMEZCTVVJN1FVRkRRWFJETEd0Q1FVRlJNRU1zU1VGQlVpeERRVUZoYlUwc1VVRkJVWEZFTEVsQlFWSXNRMEZCWVROUUxFTkJRVEZDTzBGQlEwRjJReXhyUWtGQlVUSkRMRWxCUVZJc1EwRkJZV3ROTEZGQlFWRnhSQ3hKUVVGU0xFTkJRV0V4VUN4RFFVRXhRanM3UVVGRlFXOVFMSFZDUVVGaExFbEJRVWw2VUN4TFFVRkxaMUVzYVVKQlFWUXNRMEZEV0M5U0xGTkJRVk41VHl4UlFVRlJiVVFzVDBGQmFrSXNRMEZFVnl4RlFVVllhbE1zVDBGR1Z5eEZRVWRZUXl4UFFVaFhMRU5CUVdJN1FVRk5SQ3hUUVdaRUxFMUJaVTg3UVVGRFRFUXNhMEpCUVZFd1F5eEpRVUZTTEVOQlFXRnZUU3hSUVVGUmFVUXNVMEZCVWl4RFFVRnJRbmhRTEVOQlFTOUNPMEZCUTBGMlF5eHJRa0ZCVVRKRExFbEJRVklzUTBGQllXMU5MRkZCUVZGcFJDeFRRVUZTTEVOQlFXdENkbEFzUTBGQkwwSTdRVUZEUVhoRExHdENRVUZSTkVNc1NVRkJVaXhEUVVGaGEwMHNVVUZCVVdsRUxGTkJRVklzUTBGQmEwSjBVQ3hEUVVFdlFqczdRVUZGUVhoRExHdENRVUZSZVVNc1NVRkJVaXhEUVVGaGIwMHNVVUZCVVc5RUxGTkJRVklzUTBGQmEwSXpVQ3hEUVVFdlFqdEJRVU5CZEVNc2EwSkJRVkV3UXl4SlFVRlNMRU5CUVdGdFRTeFJRVUZSYjBRc1UwRkJVaXhEUVVGclFqRlFMRU5CUVM5Q08wRkJRMEYyUXl4clFrRkJVVEpETEVsQlFWSXNRMEZCWVd0TkxGRkJRVkZ2UkN4VFFVRlNMRU5CUVd0Q2VsQXNRMEZCTDBJN08wRkJSVUYyUXl4clFrRkJVWGRETEVsQlFWSXNRMEZCWVc5TkxGRkJRVkZ4UkN4SlFVRlNMRU5CUVdFMVVDeERRVUV4UWp0QlFVTkJja01zYTBKQlFWRjVReXhKUVVGU0xFTkJRV0Z0VFN4UlFVRlJjVVFzU1VGQlVpeERRVUZoTTFBc1EwRkJNVUk3UVVGRFFYUkRMR3RDUVVGUk1FTXNTVUZCVWl4RFFVRmhhMDBzVVVGQlVYRkVMRWxCUVZJc1EwRkJZVEZRTEVOQlFURkNPenRCUVVWQmIxQXNkVUpCUVdFc1NVRkJTWHBRTEV0QlFVdG5VU3hwUWtGQlZDeERRVU5ZTDFJc1UwRkJVM2xQTEZGQlFWRnRSQ3hQUVVGcVFpeERRVVJYTEVWQlJWZzFVaXhUUVVGVGVVOHNVVUZCVVdkRUxFOUJRV3BDTEVOQlJsY3NSVUZIV0RsU0xFOUJTRmNzUlVGSldFTXNUMEZLVnl4RlFVdFlReXhQUVV4WExFVkJUVmhCTEU5QlRsY3NRMEZCWWp0QlFWRkVPMEZCUTBRN1FVRkRSRHRCUVVORUxGTkJRVXNzVVVGQlREdEJRVUZsTzBGQlEySXNXVUZCU1cxVExHMUNRVUZLTzBGQlEwRXNXVUZCVFVNc1lVRkJZU3hKUVVGSmJGRXNTMEZCU3poRUxGZEJRVlFzUlVGQmJrSTdPMEZCUlVGc1J5eG5Ra0ZCVVRCRExFbEJRVklzUTBGQllXOU5MRkZCUVZGcFJDeFRRVUZTTEVOQlFXdENlRkFzUTBGQkwwSTdRVUZEUVhaRExHZENRVUZSTWtNc1NVRkJVaXhEUVVGaGJVMHNVVUZCVVdsRUxGTkJRVklzUTBGQmEwSjJVQ3hEUVVFdlFqdEJRVU5CZUVNc1owSkJRVkUwUXl4SlFVRlNMRU5CUVdGclRTeFJRVUZSYVVRc1UwRkJVaXhEUVVGclFuUlFMRU5CUVM5Q096dEJRVVZCTmxBc2JVSkJRVmN4U0N4VFFVRllMRU5CUVhGQ05Vc3NUMEZCY2tJN08wRkJSVUVzV1VGQlNUWkxMRmRCUVZkNVNDeFhRVUZYUXl4WFFVRllMRVZCUVdZN1FVRkRRVEZJTEdsQ1FVRlRNa2dzVVVGQlZDeERRVUZyUWpGRUxGRkJRVkZ4UkN4SlFVRlNMRU5CUVdFMVVDeERRVUV2UWl4RlFVRnJRM1ZOTEZGQlFWRnhSQ3hKUVVGU0xFTkJRV0V6VUN4RFFVRXZReXhGUVVGclJITk5MRkZCUVZGeFJDeEpRVUZTTEVOQlFXRXhVQ3hEUVVFdlJEdEJRVU5CTmxBc2JVSkJRVmQwU0N4WFFVRllMRU5CUVhWQ1NDeFJRVUYyUWpzN1FVRkZRU3haUVVGSmFVVXNVVUZCVVdkRUxFOUJRVm9zUlVGQmNVSTdRVUZEYmtKUExIVkNRVUZoTEVsQlFVbHFVU3hMUVVGTE9FUXNWMEZCVkN4RlFVRmlPenRCUVVWQmFrY3NhMEpCUVZGNVF5eEpRVUZTTEVOQlFXRnZUU3hSUVVGUmIwUXNVMEZCVWl4RFFVRnJRak5RTEVOQlFTOUNPMEZCUTBGMFF5eHJRa0ZCVVRCRExFbEJRVklzUTBGQllXMU5MRkZCUVZGdlJDeFRRVUZTTEVOQlFXdENNVkFzUTBGQkwwSTdRVUZEUVhaRExHdENRVUZSTWtNc1NVRkJVaXhEUVVGaGEwMHNVVUZCVVc5RUxGTkJRVklzUTBGQmEwSjZVQ3hEUVVFdlFqczdRVUZGUVRSUUxIRkNRVUZYZWtnc1UwRkJXQ3hEUVVGeFFqTkxMRTlCUVhKQ096dEJRVVZCTkVzc2NVSkJRVmQzU0N4WFFVRlhSU3hYUVVGWUxFVkJRVmc3UVVGRFFURklMRzFDUVVGVE1rZ3NVVUZCVkN4RFFVRnJRakZFTEZGQlFWRnhSQ3hKUVVGU0xFTkJRV0UxVUN4RFFVRXZRaXhGUVVGclEzVk5MRkZCUVZGeFJDeEpRVUZTTEVOQlFXRXpVQ3hEUVVFdlF5eEZRVUZyUkhOTkxGRkJRVkZ4UkN4SlFVRlNMRU5CUVdFeFVDeERRVUV2UkR0QlFVTkJORkFzY1VKQlFWZHlTQ3hYUVVGWUxFTkJRWFZDU0N4UlFVRjJRanM3UVVGRlFXZElMSFZDUVVGaExFbEJRVWw2VUN4TFFVRkxjVkVzYTBKQlFWUXNRMEZEV0hCVExGTkJRVk41VHl4UlFVRlJiVVFzVDBGQmFrSXNRMEZFVnl4RlFVVllOVklzVTBGQlUzbFBMRkZCUVZGblJDeFBRVUZxUWl4RFFVWlhMRVZCUjFoUkxGVkJTRmNzUlVGSldFUXNWVUZLVnl4RlFVdFlMRWxCVEZjc1EwRkJZanRCUVU5RUxGTkJjRUpFTEUxQmIwSlBPMEZCUTB4U0xIVkNRVUZoTEVsQlFVbDZVQ3hMUVVGTGNWRXNhMEpCUVZRc1EwRkRXSEJUTEZOQlFWTjVUeXhSUVVGUmJVUXNUMEZCYWtJc1EwRkVWeXhGUVVWWVN5eFZRVVpYTEVWQlIxZ3NTVUZJVnl4RFFVRmlPMEZCUzBRN08wRkJSVVJVTEcxQ1FVRlhZU3hGUVVGWUxFZEJRV2RDU2l4VlFVRm9RanRCUVVOQlZDeHRRa0ZCVjJNc1JVRkJXQ3hIUVVGblFrNHNWVUZCYUVJN08wRkJSVUZxVVN4aFFVRkxNRW9zVDBGQlRDeERRVUZoZDBjc1ZVRkJZanRCUVVOQkxGbEJRVWxFTEdWQlFXVjRVU3hUUVVGdVFpeEZRVUU0UWs4c1MwRkJTekJLTEU5QlFVd3NRMEZCWVhWSExGVkJRV0k3TzBGQlJUbENPMEZCUTBRN1FVRkRSQ3hUUVVGTExGZEJRVXc3UVVGQmEwSTdRVUZEYUVJc1dVRkJUVU1zWTBGQllTeEpRVUZKYkZFc1MwRkJTemhFTEZkQlFWUXNSVUZCYmtJN1FVRkRRVzlOTEc5Q1FVRlhjRkVzVjBGQldEczdRVUZGUVN4WlFVRk5iVkVzWTBGQllTeEpRVUZKYWxFc1MwRkJTemhFTEZkQlFWUXNSVUZCYmtJN1FVRkRRVzFOTEc5Q1FVRlhibEVzVjBGQldEczdRVUZGUVd4RExHZENRVUZSTUVNc1NVRkJVaXhEUVVGaGIwMHNVVUZCVVdsRUxGTkJRVklzUTBGQmEwSjRVQ3hEUVVFdlFqdEJRVU5CZGtNc1owSkJRVkV5UXl4SlFVRlNMRU5CUVdGdFRTeFJRVUZSYVVRc1UwRkJVaXhEUVVGclFuWlFMRU5CUVM5Q08wRkJRMEY0UXl4blFrRkJVVFJETEVsQlFWSXNRMEZCWVd0TkxGRkJRVkZwUkN4VFFVRlNMRU5CUVd0Q2RGQXNRMEZCTDBJN08wRkJSVUY0UXl4blFrRkJVWGxETEVsQlFWSXNRMEZCWVc5TkxGRkJRVkZ2UkN4VFFVRlNMRU5CUVd0Q00xQXNRMEZCTDBJN1FVRkRRWFJETEdkQ1FVRlJNRU1zU1VGQlVpeERRVUZoYlUwc1VVRkJVVzlFTEZOQlFWSXNRMEZCYTBJeFVDeERRVUV2UWp0QlFVTkJka01zWjBKQlFWRXlReXhKUVVGU0xFTkJRV0ZyVFN4UlFVRlJiMFFzVTBGQlVpeERRVUZyUW5wUUxFTkJRUzlDT3p0QlFVVkJObEFzYjBKQlFWY3hTQ3hUUVVGWUxFTkJRWEZDTlVzc1QwRkJja0k3UVVGRFFYRlRMRzlDUVVGWGVrZ3NVMEZCV0N4RFFVRnhRak5MTEU5QlFYSkNPenRCUVVWQkxGbEJRVWswU3l4WlFVRlhlVWdzV1VGQlYwTXNWMEZCV0N4RlFVRm1PMEZCUTBFeFNDeHJRa0ZCVXl0SUxGZEJRVlFzUTBGQmNVSXNRMEZCUXpsRUxGRkJRVkVyUkN4TFFVRlNMRU5CUVdOd1VTeERRVUZ3UXl4RlFVRjFReXhEUVVGRGNVMHNVVUZCVVN0RUxFdEJRVklzUTBGQlkzSlJMRU5CUVhSRUxFVkJRWGxFTEVOQlFVTnpUU3hSUVVGUkswUXNTMEZCVWl4RFFVRmpkRkVzUTBGQmVFVTdRVUZEUVN0UUxHOUNRVUZYZEVnc1YwRkJXQ3hEUVVGMVFrZ3NVMEZCZGtJN08wRkJSVUZCTEc5Q1FVRlhkMGdzV1VGQlYwVXNWMEZCV0N4RlFVRllPMEZCUTBFeFNDeHJRa0ZCVXl0SUxGZEJRVlFzUTBGQmNVSXNRMEZCUXpsRUxGRkJRVkZuUlN4TFFVRlNMRU5CUVdOeVVTeERRVUZ3UXl4RlFVRjFReXhEUVVGRGNVMHNVVUZCVVdkRkxFdEJRVklzUTBGQlkzUlJMRU5CUVhSRUxFVkJRWGxFTEVOQlFVTnpUU3hSUVVGUlowVXNTMEZCVWl4RFFVRmpkbEVzUTBGQmVFVTdRVUZEUVRoUUxHOUNRVUZYY2tnc1YwRkJXQ3hEUVVGMVFrZ3NVMEZCZGtJN08wRkJSVUZuU0N4eFFrRkJZU3hKUVVGSmVsQXNTMEZCU3pKUkxIRkNRVUZVTEVOQlExZ3hVeXhUUVVGVGVVOHNVVUZCVVcxRUxFOUJRV3BDTEVOQlJGY3NSVUZGV0RWU0xGTkJRVk41VHl4UlFVRlJaMFFzVDBGQmFrSXNRMEZHVnl4RlFVZFlVU3hYUVVoWExFVkJTVmhFTEZkQlNsY3NRMEZCWWpzN1FVRlBRVklzYlVKQlFWZHRRaXhSUVVGWUxFTkJRVzlDUXl4TFFVRkxReXhGUVVGNlFpeEZRVUUyUWl4RFFVRTNRaXhGUVVGblEwUXNTMEZCUzBNc1JVRkJja003TzBGQlJVRnlRaXh0UWtGQlYyRXNSVUZCV0N4SFFVRm5Ra29zVjBGQmFFSTdRVUZEUVZRc2JVSkJRVmRqTEVWQlFWZ3NSMEZCWjBKT0xGZEJRV2hDT3p0QlFVVkJhbEVzWVVGQlN6QktMRTlCUVV3c1EwRkJZWGRITEZkQlFXSTdRVUZEUVd4UkxHRkJRVXN3U2l4UFFVRk1MRU5CUVdGMVJ5eFhRVUZpT3p0QlFVVkJPMEZCUTBRN1FVRkRSQ3hUUVVGTExFdEJRVXc3UVVGQldUdEJRVU5XTEZsQlFVbEJMSEZDUVVGS096dEJRVVZCTEZsQlFVMURMR1ZCUVdFc1NVRkJTV3hSTEV0QlFVczRSQ3hYUVVGVUxFVkJRVzVDTzBGQlEwRnZUU3h4UWtGQlYzQlJMRmRCUVZnN08wRkJSVUZzUXl4blFrRkJVVEJETEVsQlFWSXNRMEZCWVc5TkxGRkJRVkZwUkN4VFFVRlNMRU5CUVd0Q2VGQXNRMEZCTDBJN1FVRkRRWFpETEdkQ1FVRlJNa01zU1VGQlVpeERRVUZoYlUwc1VVRkJVV2xFTEZOQlFWSXNRMEZCYTBKMlVDeERRVUV2UWp0QlFVTkJlRU1zWjBKQlFWRTBReXhKUVVGU0xFTkJRV0ZyVFN4UlFVRlJhVVFzVTBGQlVpeERRVUZyUW5SUUxFTkJRUzlDT3p0QlFVVkJObEFzY1VKQlFWY3hTQ3hUUVVGWUxFTkJRWEZDTlVzc1QwRkJja0k3TzBGQlJVRXNXVUZCU1RaTExHRkJRVmQ1U0N4aFFVRlhReXhYUVVGWUxFVkJRV1k3UVVGRFFURklMRzFDUVVGVEswZ3NWMEZCVkN4RFFVRnhRaXhEUVVGRE9VUXNVVUZCVVN0RUxFdEJRVklzUTBGQlkzQlJMRU5CUVhCRExFVkJRWFZETEVOQlFVTnhUU3hSUVVGUkswUXNTMEZCVWl4RFFVRmpjbEVzUTBGQmRFUXNSVUZCZVVRc1EwRkJRM05OTEZGQlFWRXJSQ3hMUVVGU0xFTkJRV04wVVN4RFFVRjRSVHRCUVVOQksxQXNjVUpCUVZkMFNDeFhRVUZZTEVOQlFYVkNTQ3hWUVVGMlFqczdRVUZGUVN4WlFVRkphVVVzVVVGQlVXZEVMRTlCUVZvc1JVRkJjVUk3UVVGRGJrSlBMSGxDUVVGaExFbEJRVWxxVVN4TFFVRkxPRVFzVjBGQlZDeEZRVUZpTzBGQlEwRnRUU3gxUWtGQlYyNVJMRmRCUVZnN08wRkJSVUZxUXl4clFrRkJVWGxETEVsQlFWSXNRMEZCWVc5TkxGRkJRVkZ2UkN4VFFVRlNMRU5CUVd0Q00xQXNRMEZCTDBJN1FVRkRRWFJETEd0Q1FVRlJNRU1zU1VGQlVpeERRVUZoYlUwc1VVRkJVVzlFTEZOQlFWSXNRMEZCYTBJeFVDeERRVUV2UWp0QlFVTkJka01zYTBKQlFWRXlReXhKUVVGU0xFTkJRV0ZyVFN4UlFVRlJiMFFzVTBGQlVpeERRVUZyUW5wUUxFTkJRUzlDT3p0QlFVVkJORkFzZFVKQlFWZDZTQ3hUUVVGWUxFTkJRWEZDTTBzc1QwRkJja0k3TzBGQlJVRTBTeXgxUWtGQlYzZElMR0ZCUVZkRkxGZEJRVmdzUlVGQldEdEJRVU5CTVVnc2NVSkJRVk1yU0N4WFFVRlVMRU5CUVhGQ0xFTkJRVU01UkN4UlFVRlJaMFVzUzBGQlVpeERRVUZqY2xFc1EwRkJjRU1zUlVGQmRVTXNRMEZCUTNGTkxGRkJRVkZuUlN4TFFVRlNMRU5CUVdOMFVTeERRVUYwUkN4RlFVRjVSQ3hEUVVGRGMwMHNVVUZCVVdkRkxFdEJRVklzUTBGQlkzWlJMRU5CUVhoRk8wRkJRMEU0VUN4MVFrRkJWM0pJTEZkQlFWZ3NRMEZCZFVKSUxGVkJRWFpDT3p0QlFVVkJaMGdzZFVKQlFXRXNTVUZCU1hwUUxFdEJRVXNyVVN4MVFrRkJWQ3hEUVVOWU9WTXNVMEZCVTNsUExGRkJRVkZ0UkN4UFFVRnFRaXhEUVVSWExFVkJSVmcxVWl4VFFVRlRlVThzVVVGQlVXZEVMRTlCUVdwQ0xFTkJSbGNzUlVGSFdGRXNXVUZJVnl4RlFVbFlSQ3haUVVwWExFVkJTMWdzU1VGTVZ5eERRVUZpTzBGQlQwUXNVMEZ5UWtRc1RVRnhRazg3UVVGRFRGSXNkVUpCUVdFc1NVRkJTWHBRTEV0QlFVc3JVU3gxUWtGQlZDeERRVU5ZT1ZNc1UwRkJVM2xQTEZGQlFWRnRSQ3hQUVVGcVFpeERRVVJYTEVWQlJWaExMRmxCUmxjc1JVRkhXQ3hKUVVoWExFTkJRV0k3UVVGTFJEczdRVUZGUkZRc2JVSkJRVmRoTEVWQlFWZ3NSMEZCWjBKS0xGbEJRV2hDTzBGQlEwRlVMRzFDUVVGWFl5eEZRVUZZTEVkQlFXZENUaXhaUVVGb1FqczdRVUZGUVdwUkxHRkJRVXN3U2l4UFFVRk1MRU5CUVdGM1J5eFpRVUZpTzBGQlEwRXNXVUZCU1VRc2FVSkJRV1Y0VVN4VFFVRnVRaXhGUVVFNFFrOHNTMEZCU3pCS0xFOUJRVXdzUTBGQllYVkhMRmxCUVdJN08wRkJSVGxDTzBGQlEwUTdRVUZEUkR0QlFVTkZPMEZCZWs1S096dEJRVFJPUVhSVExGRkJRVTAyVWl4aFFVRk9MRU5CUVc5Q1F5eFZRVUZ3UWpzN1FVRkZRVUVzWVVGQlZ6VkZMRU5CUVZnc1IwRkJaVFZOTEZOQlFWTjVUeXhSUVVGUmJVUXNUMEZCYWtJc1EwRkJaanRCUVVOQlNpeGhRVUZYZFVJc1EwRkJXQ3hIUVVGbEwxTXNVMEZCVTNsUExGRkJRVkZuUkN4UFFVRnFRaXhEUVVGbU96dEJRVVZCUkN4aFFVRlhkMElzWTBGQldEdEJRVU5CT1ZNc1pVRkJZWFZQTEZGQlFWRm9UQ3hGUVVGeVFpeEpRVUV5UWl0T0xGVkJRVE5DTzBGQlEwRnNVenM3UVVGRlFTeE5RVUZKT0VJc2IwSkJRVW9zUlVGQk1FSTdRVUZEZUVKUUxIVkNRVUZ0UWl4SlFVRkpiVVlzV1VGQlNpeERRVUZwUWl4SlFVRkpNVWNzYlVKQlFXMUNNa0lzZVVKQlFYaERMRU5CUVc1Q0xFTkJSSGRDTEVOQlF5dEVPMEZCUTNaR1NpeHhRa0ZCYVVJc1EwRkJha0lzU1VGQmMwSjJReXhqUVVGalNTeG5Ra0ZCY0VNN1FVRkRSQ3hIUVVoRUxFMUJSMDl0UXl4dFFrRkJiVUlzUTBGQlEzWkRMR05CUVdOSkxHZENRVUZtTEVOQlFXNUNPMEZCUTFJc1EwRTFUMFE3TzBGQk9FOUJjVUlzYVVKQlFXbENhMVFzWjBKQlFXcENMRWRCUVc5RExGVkJRVU40UlN4UFFVRkVMRVZCUVdFN1FVRkRMME1zVFVGQlRTdERMR0ZCUVdGMFVpeGhRVUZoZFU4c1VVRkJVV2hNTEVWQlFYSkNMRU5CUVc1Q096dEJRVVZCTEUxQlFVa3JUaXhsUVVGbGFGRXNVMEZCYmtJc1JVRkJPRUk3UVVGRE5VSTVRaXhWUVVGTmRWUXNaMEpCUVU0c1EwRkJkVUo2UWl4VlFVRjJRanRCUVVOQmRGSXNhVUpCUVdGMVR5eFJRVUZSYUV3c1JVRkJja0lzU1VGQk1rSXNTVUZCTTBJN1FVRkRRVzVGTzBGQlEwUTdRVUZEUml4RFFWSkVPenRCUVZWQlV5eHBRa0ZCYVVKdFZDeHpRMEZCYWtJc1IwRkJNRVFzVlVGQlEzcEZMRTlCUVVRc1JVRkJZVHRCUVVOeVJTeE5RVUZOSzBNc1lVRkJZWFJTTEdGQlFXRjFUeXhSUVVGUmFFd3NSVUZCY2tJc1EwRkJia0k3UVVGRFFTeE5RVUZKSzA0c1pVRkJaVEpDTEZGQlFXNUNMRVZCUVRaQ00wSXNWMEZCVnpSQ0xESkNRVUZZTEVOQlFYVkRNMFVzVVVGQlVUUkRMRk5CUVM5RE8wRkJRemxDTEVOQlNFUTdPMEZCUzBGMFVpeHBRa0ZCYVVKelZDeFJRVUZxUWl4SFFVRTBRaXhaUVVGcFFqdEJRVUZCTEUxQlFXaENMMDRzVFVGQlowSXNkVVZCUVZBc1JVRkJUenM3UVVGRE0wTXNUVUZCU1RWR0xFdEJRVW9zUlVGQlZ6dEJRVU5VTEZGQlFVazBSaXhQUVVGUFowOHNVVUZCVUN4SlFVRnRRbWhQTEU5QlFVOW5UeXhSUVVGUUxFZEJRV3RDT1ZRc1lVRkJla01zUlVGRFJUaEdMRTlCUVU5blR5eFJRVUZRTEVkQlFXdENPVlFzWVVGQmJFSTdPMEZCUlVZNFJpeFhRVUZQYVU4c1YwRkJVQ3hIUVVGeFFtcFBMRTlCUVU5cFR5eFhRVUZRTEVsQlFYTkNXQ3hMUVVGTFdTeEpRVUZNTEVOQlFWVnNUeXhQUVVGUFowOHNVVUZCVUN4SFFVRnJRamxVTEdGQlFUVkNMRU5CUVRORExFTkJTbE1zUTBGSk9FVTdPMEZCUlhaR1JTeFZRVUZOSzFRc1kwRkJUaXhEUVVGeFFtNVBMRTlCUVU5blR5eFJRVUUxUWl4RlFVRnpRMmhQTEU5QlFVOXBUeXhYUVVFM1F5eEZRVUV3UkM5VUxHRkJRVEZFT3p0QlFVVkJMRkZCUVVsVExGVkJRVlZ2UkN4TlFVRldMRWRCUVcxQ0xFTkJRWFpDTEVWQlFUQkNjVkU3UVVGRE1VSkRPMEZCUTBFc1VVRkJTWHBVTEdGQlFXRnRSQ3hOUVVGaUxFZEJRWE5DTEVOQlFURkNMRVZCUVRaQ2RWRTdRVUZETjBKRE8wRkJRMEVzVVVGQlNUZFZMR2xDUVVGS0xFVkJRWFZDT0ZVN1FVRkRlRUk3UVVGRFJpeERRV1pFT3p0QlFXbENRVHRCUVVOQkwxUXNhVUpCUVdsQ1oxVXNaVUZCYWtJc1IwRkJiVU1zVlVGQlEzcFBMRTFCUVVRc1JVRkJXVHRCUVVNM1EzQkdMR1ZCUVdGdlJpeFBRVUZQYTAwc1ZVRkJjRUlzUlVGQlowTnRRaXhSUVVGb1F5eERRVUY1UTNKT0xFOUJRVTh3VHl4SFFVRm9SQ3hGUVVGeFJERlBMRTlCUVU4eVR5eEpRVUUxUkN4RlFVRnJSU3hEUVVGc1JTeEZRVUZ4UlROUExFOUJRVTgwVHl4WFFVRTFSU3hGUVVGNVJqVlBMRTlCUVU4MlR5eHBRa0ZCYUVjN1FVRkRSQ3hEUVVaRU96dEJRVWxCY0ZVc2FVSkJRV2xDY1ZVc2QwSkJRV3BDTEVkQlFUUkRMRlZCUVVNNVR5eE5RVUZFTEVWQlFWazdRVUZEZEVRc1RVRkJUV3ROTEdGQlFXRjBVaXhoUVVGaGIwWXNUMEZCVDJ0TkxGVkJRWEJDTEVOQlFXNUNPMEZCUTBGQkxHRkJRVmMyUXl4clFrRkJXQ3hEUVVFNFFpeEpRVUU1UWl4RlFVRnZReTlQTEU5QlFVOW5VQ3hSUVVFelF5eEZRVUZ4UkdoUUxFOUJRVTlwVUN4WlFVRTFSRHRCUVVOQkwwTXNZVUZCVnpWRkxFTkJRVmdzUTBGQllVUXNVVUZCWWp0QlFVTkJMRTFCUVVrMlJTeFhRVUZYZFVJc1EwRkJaaXhGUVVGclFuWkNMRmRCUVZkMVFpeERRVUZZTEVOQlFXRndSeXhSUVVGaU8wRkJRMjVDTEVOQlRFUTdPMEZCVDBFMVRTeHBRa0ZCYVVKNVZTeHJRa0ZCYWtJc1IwRkJjME1zVlVGQlEyeFFMRTFCUVVRc1JVRkJXVHRCUVVOb1JIQkdMR1ZCUVdGdlJpeFBRVUZQYTAwc1ZVRkJjRUlzUlVGQlowTnBSQ3hYUVVGb1F5eERRVUUwUXl4TFFVRTFRenRCUVVOQkxFMUJRVWxxUkN4WFFVRlhkVUlzUTBGQlppeEZRVUZyUW5aQ0xGZEJRVmQxUWl4RFFVRllMRU5CUVdGd1J5eFJRVUZpTzBGQlEyNUNMRU5CU0VRN08wRkJTMEUxVFN4cFFrRkJhVUl5VlN4blFrRkJha0lzUjBGQmIwTXNWVUZCUTNCUUxFMUJRVVFzUlVGQldUdEJRVU01UXl4TlFVRk5hMDBzWVVGQllYUlNMR0ZCUVdGdlJpeFBRVUZQYTAwc1ZVRkJjRUlzUTBGQmJrSTdRVUZEUVVFc1lVRkJWMjFFTEdkQ1FVRllMRU5CUVRSQ2NsQXNUMEZCVDNOUUxGTkJRVkFzU1VGQmIwSXNRMEZCYUVRN1FVRkRRWEJFTEdGQlFWZHhSQ3huUWtGQldDeERRVUUwUW5aUUxFOUJRVTkzVUN4VFFVRlFMRWxCUVc5Q0xFTkJRV2hFT3p0QlFVVkJkRVFzWVVGQlYzVkVMR2RDUVVGWUxFTkJRVFJDZWxBc1QwRkJUekJRTEZOQlFWQXNTVUZCYjBJc1EwRkJhRVE3UVVGRFFYaEVMR0ZCUVZkNVJDeG5Ra0ZCV0N4RFFVRTBRak5RTEU5QlFVODBVQ3hUUVVGUUxFbEJRVzlDTEVOQlFXaEVPMEZCUTBRc1EwRlFSRHM3UVVGVFFXNVdMR2xDUVVGcFFtOVdMSEZDUVVGcVFpeEhRVUY1UXl4VlFVRkROMUFzVFVGQlJDeEZRVUZaTzBGQlEyNUVMRTFCUVUxclRTeGhRVUZoZEZJc1lVRkJZVzlHTEU5QlFVOXJUU3hWUVVGd1FpeERRVUZ1UWp0QlFVTkJRU3hoUVVGWE5FUXNhVUpCUVZnc1EwRkJOa0k1VUN4UFFVRlBORXdzVFVGQlVDeEpRVUZwUWl4RFFVRTVRenRCUVVOQlRTeGhRVUZYTmtRc2FVSkJRVmdzUTBGQk5rSXZVQ3hQUVVGUE5rd3NUMEZCVUN4SlFVRnJRaXhEUVVFdlF6dEJRVU5FTEVOQlNrUTdPMEZCVFVGd1VpeHBRa0ZCYVVKMVZpeDNRa0ZCYWtJc1IwRkJORU1zVlVGQlEyaFJMRTFCUVVRc1JVRkJXVHRCUVVOMFJDeE5RVUZOYTAwc1lVRkJZWFJTTEdGQlFXRnZSaXhQUVVGUGEwMHNWVUZCY0VJc1EwRkJia0k3UVVGRFFVRXNZVUZCVnl0RUxIbENRVUZZTEVOQlFYRkRhbEVzVDBGQlQyZFFMRkZCUVRWRE8wRkJRMEU1UXl4aFFVRlhaMFVzYlVKQlFWZ3NRMEZCSzBKc1VTeFBRVUZQYVZBc1dVRkJkRU03UVVGRFFTOURMR0ZCUVZkcFJTeHJRa0ZCV0N4RFFVRTRRaXhKUVVFNVFqdEJRVU5CYWtVc1lVRkJWelZGTEVOQlFWZ3NRMEZCWVVRc1VVRkJZanRCUVVOQkxFMUJRVWsyUlN4WFFVRlhkVUlzUTBGQlppeEZRVUZyUW5aQ0xGZEJRVmQxUWl4RFFVRllMRU5CUVdGd1J5eFJRVUZpTzBGQlEyNUNMRU5CVUVRN08wRkJVMEUxVFN4cFFrRkJhVUl5Vml4NVFrRkJha0lzUjBGQk5rTXNWVUZCUTNCUkxFMUJRVVFzUlVGQldUdEJRVU4yUkN4TlFVRk5hMDBzWVVGQllYUlNMR0ZCUVdGdlJpeFBRVUZQYTAwc1ZVRkJjRUlzUTBGQmJrSTdRVUZEUVVFc1lVRkJWMmxGTEd0Q1FVRllMRU5CUVRoQ0xFdEJRVGxDTzBGQlEwRXNUVUZCU1dwRkxGZEJRVmQxUWl4RFFVRm1MRVZCUVd0Q2RrSXNWMEZCVjNWQ0xFTkJRVmdzUTBGQllYQkhMRkZCUVdJN1FVRkRia0lzUTBGS1JEczdRVUZOUVRWTkxHbENRVUZwUWpSV0xIbENRVUZxUWl4SFFVRTJReXhWUVVGRGNsRXNUVUZCUkN4RlFVRlpPMEZCUTNaRUxFMUJRVTFyVFN4aFFVRmhkRklzWVVGQllXOUdMRTlCUVU5clRTeFZRVUZ3UWl4RFFVRnVRanRCUVVOQlFTeGhRVUZYYjBVc2VVSkJRVmdzUTBGQmNVTjBVU3hQUVVGUFoxQXNVVUZCTlVNN1FVRkRRVGxETEdGQlFWZHhSU3h0UWtGQldDeERRVUVyUW5aUkxFOUJRVTlwVUN4WlFVRjBRenRCUVVOQkwwTXNZVUZCVjNORkxHdENRVUZZTEVOQlFUaENMRWxCUVRsQ08wRkJRMEYwUlN4aFFVRlhOVVVzUTBGQldDeERRVUZoUkN4UlFVRmlPMEZCUTBFc1RVRkJTVFpGTEZkQlFWZDFRaXhEUVVGbUxFVkJRV3RDZGtJc1YwRkJWM1ZDTEVOQlFWZ3NRMEZCWVhCSExGRkJRV0k3UVVGRGJrSXNRMEZRUkRzN1FVRlRRVFZOTEdsQ1FVRnBRbWRYTERCQ1FVRnFRaXhIUVVFNFF5eFZRVUZEZWxFc1RVRkJSQ3hGUVVGWk8wRkJRM2hFTEUxQlFVMXJUU3hoUVVGaGRGSXNZVUZCWVc5R0xFOUJRVTlyVFN4VlFVRndRaXhEUVVGdVFqdEJRVU5CUVN4aFFVRlhjMFVzYTBKQlFWZ3NRMEZCT0VJc1MwRkJPVUk3UVVGRFFYUkZMR0ZCUVZjMVJTeERRVUZZTEVOQlFXRkVMRkZCUVdJN1FVRkRRU3hOUVVGSk5rVXNWMEZCVjNWQ0xFTkJRV1lzUlVGQmEwSjJRaXhYUVVGWGRVSXNRMEZCV0N4RFFVRmhjRWNzVVVGQllqdEJRVU51UWl4RFFVeEVPenRCUVU5Qk5VMHNhVUpCUVdsQ2FWY3NhMEpCUVdwQ0xFZEJRWE5ETEZWQlFVTXhVU3hOUVVGRUxFVkJRVms3UVVGRGFFUndSaXhsUVVGaGIwWXNUMEZCVDJ0TkxGVkJRWEJDTEVWQlFXZERiVUlzVVVGQmFFTXNRMEZCZVVOeVRpeFBRVUZQYkVRc1EwRkJhRVFzUlVGQmJVUnJSQ3hQUVVGUGJrUXNRMEZCTVVRc1JVRkJOa1J0UkN4UFFVRlBjRVFzUTBGQmNFVXNSVUZFWjBRc1EwRkRkMEk3UVVGRGVrVXNRMEZHUkRzN1FVRkpRVzVETEdsQ1FVRnBRbXRYTEhGQ1FVRnFRaXhIUVVGNVF5eFZRVUZETTFFc1RVRkJSQ3hGUVVGWk8wRkJRMjVFTEUxQlFVMXJUU3hoUVVGaGRGSXNZVUZCWVc5R0xFOUJRVTlyVFN4VlFVRndRaXhEUVVGdVFqdEJRVU5CUVN4aFFVRlhhVVFzVjBGQldDeERRVUYxUWl4SlFVRjJRanRCUVVOQmFrUXNZVUZCVnpWRkxFTkJRVmdzUTBGQllVUXNVVUZCWWp0QlFVTkJOa1VzWVVGQlYzVkNMRU5CUVZnc1EwRkJZWEJITEZGQlFXSTdRVUZEUkN4RFFVeEVPenRCUVU5Qk5VMHNhVUpCUVdsQ2JWY3NORUpCUVdwQ0xFZEJRV2RFTEZWQlFVTTFVU3hOUVVGRUxFVkJRVms3UVVGRE1VUXNUVUZCVFd0TkxHRkJRV0YwVWl4aFFVRmhiMFlzVDBGQlQydE5MRlZCUVhCQ0xFTkJRVzVDTzBGQlEwRkJMR0ZCUVZjeVJTeHJRa0ZCV0N4RFFVRTRRamRSTEU5QlFVODRVU3hYUVVGeVF6dEJRVU5CTlVVc1lVRkJWelZGTEVOQlFWZ3NRMEZCWVVRc1VVRkJZanRCUVVOQk5rVXNZVUZCVjNWQ0xFTkJRVmdzUTBGQllYQkhMRkZCUVdJN1FVRkRSQ3hEUVV4RU96dEJRVTlCTlUwc2FVSkJRV2xDYzFjc2QwSkJRV3BDTEVkQlFUUkRMRlZCUVVNdlVTeE5RVUZFTEVWQlFWazdRVUZEZEVRc1RVRkJUV3ROTEdGQlFXRjBVaXhoUVVGaGIwWXNUMEZCVDJ0TkxGVkJRWEJDTEVOQlFXNUNPenRCUVVWQk1WSXNVVUZCVFhWRExFbEJRVTRzUTBGQlYybEVMRTlCUVU5d1JDeERRVUZzUWp0QlFVTkJjRU1zVVVGQlRYZERMRWxCUVU0c1EwRkJWMmRFTEU5QlFVOXVSQ3hEUVVGc1FqdEJRVU5CY2tNc1VVRkJUWGxETEVsQlFVNHNRMEZCVnl0RExFOUJRVTlzUkN4RFFVRnNRanRCUVVOQmRFTXNVVUZCVFRKTExFbEJRVTRzUTBGQlYyNUdMRTlCUVU5dlJpeERRVUZzUWpzN1FVRkZRVGhITEdGQlFWYzRSU3hqUVVGWUxFTkJRVEJDZUZjc1MwRkJNVUk3TzBGQlJVRXdVaXhoUVVGWE5VVXNRMEZCV0N4RFFVRmhSQ3hSUVVGaU8wRkJRMEUyUlN4aFFVRlhkVUlzUTBGQldDeERRVUZoY0Vjc1VVRkJZanRCUVVORUxFTkJXa1E3TzBGQlkwRTFUU3hwUWtGQmFVSjNWeXh6UWtGQmFrSXNSMEZCTUVNc1ZVRkJRMnBTTEUxQlFVUXNSVUZCV1R0QlFVTndSQ3hOUVVGTmEwMHNZVUZCWVhSU0xHRkJRV0Z2Uml4UFFVRlBhMDBzVlVGQmNFSXNRMEZCYmtJN1FVRkRRVUVzWVVGQlYybEVMRmRCUVZnc1EwRkJkVUlzUzBGQmRrSTdRVUZEUVdwRUxHRkJRVmMxUlN4RFFVRllMRU5CUVdGRUxGRkJRV0k3UVVGRFFUWkZMR0ZCUVZkMVFpeERRVUZZTEVOQlFXRndSeXhSUVVGaU8wRkJRMFFzUTBGTVJEczdRVUZQUVRWTkxHbENRVUZwUW5sWExIVkNRVUZxUWl4SFFVRXlReXhWUVVGRGJGSXNUVUZCUkN4RlFVRlpPMEZCUTNKRUxFMUJRVTFyVFN4aFFVRmhkRklzWVVGQllXOUdMRTlCUVU5clRTeFZRVUZ3UWl4RFFVRnVRanM3UVVGRlFUZFNMRlZCUVZFd1F5eEpRVUZTTEVOQlFXRnBSQ3hQUVVGUGNFUXNRMEZCY0VJN1FVRkRRWFpETEZWQlFWRXlReXhKUVVGU0xFTkJRV0ZuUkN4UFFVRlBia1FzUTBGQmNFSTdRVUZEUVhoRExGVkJRVkUwUXl4SlFVRlNMRU5CUVdFclF5eFBRVUZQYkVRc1EwRkJjRUk3TzBGQlJVRnZVQ3hoUVVGWGFVWXNiVUpCUVZnc1EwRkJLMEk1Vnl4UFFVRXZRanRCUVVOQk5sSXNZVUZCVnpWRkxFTkJRVmdzUTBGQllVUXNVVUZCWWpzN1FVRkZRU3hOUVVGSk5rVXNWMEZCVjNWQ0xFTkJRV1lzUlVGQmEwSjJRaXhYUVVGWGRVSXNRMEZCV0N4RFFVRmhjRWNzVVVGQllqdEJRVU51UWl4RFFWaEVPenRCUVdGQk5VMHNhVUpCUVdsQ01sY3NkVUpCUVdwQ0xFZEJRVEpETEZWQlFVTndVaXhOUVVGRUxFVkJRVms3UVVGRGNrUXNUVUZCVFd0TkxHRkJRV0YwVWl4aFFVRmhiMFlzVDBGQlQydE5MRlZCUVhCQ0xFTkJRVzVDT3p0QlFVVkJOMUlzVlVGQlVUQkRMRWxCUVZJc1EwRkJZV2xFTEU5QlFVOXdSQ3hEUVVGd1FqdEJRVU5CZGtNc1ZVRkJVVEpETEVsQlFWSXNRMEZCWVdkRUxFOUJRVTl1UkN4RFFVRndRanRCUVVOQmVFTXNWVUZCVVRSRExFbEJRVklzUTBGQllTdERMRTlCUVU5c1JDeERRVUZ3UWpzN1FVRkZRVzlRTEdGQlFWZHRSaXh0UWtGQldDeERRVUVyUW1oWUxFOUJRUzlDTzBGQlEwRTJVaXhoUVVGWE5VVXNRMEZCV0N4RFFVRmhSQ3hSUVVGaU96dEJRVVZCTEUxQlFVazJSU3hYUVVGWGRVSXNRMEZCWml4RlFVRnJRblpDTEZkQlFWZDFRaXhEUVVGWUxFTkJRV0Z3Unl4UlFVRmlPMEZCUTI1Q0xFTkJXRVE3TzBGQllVRTFUU3hwUWtGQmFVSTJWeXgzUWtGQmFrSXNSMEZCTkVNc1ZVRkJRM1JTTEUxQlFVUXNSVUZCV1R0QlFVTjBSQ3hOUVVGTmEwMHNZVUZCWVhSU0xHRkJRV0Z2Uml4UFFVRlBhMDBzVlVGQmNFSXNRMEZCYmtJN08wRkJSVUUzVWl4VlFVRlJNRU1zU1VGQlVpeERRVUZoYVVRc1QwRkJUM0JFTEVOQlFYQkNPMEZCUTBGMlF5eFZRVUZSTWtNc1NVRkJVaXhEUVVGaFowUXNUMEZCVDI1RUxFTkJRWEJDTzBGQlEwRjRReXhWUVVGUk5FTXNTVUZCVWl4RFFVRmhLME1zVDBGQlQyeEVMRU5CUVhCQ096dEJRVVZCYjFBc1lVRkJWM0ZHTEc5Q1FVRllMRU5CUVdkRGJGZ3NUMEZCYUVNN1FVRkRRVFpTTEdGQlFWYzFSU3hEUVVGWUxFTkJRV0ZFTEZGQlFXSTdPMEZCUlVFc1RVRkJTVFpGTEZkQlFWZDFRaXhEUVVGbUxFVkJRV3RDZGtJc1YwRkJWM1ZDTEVOQlFWZ3NRMEZCWVhCSExGRkJRV0k3UVVGRGJrSXNRMEZZUkRzN1FVRmhRVFZOTEdsQ1FVRnBRaXRYTEhkQ1FVRnFRaXhIUVVFMFF5eFZRVUZEZUZJc1RVRkJSQ3hGUVVGWk8wRkJRM1JFTEUxQlFVMXJUU3hoUVVGaGRGSXNZVUZCWVc5R0xFOUJRVTlyVFN4VlFVRndRaXhEUVVGdVFqczdRVUZGUVRkU0xGVkJRVkV3UXl4SlFVRlNMRU5CUVdGcFJDeFBRVUZQY0VRc1EwRkJjRUk3UVVGRFFYWkRMRlZCUVZFeVF5eEpRVUZTTEVOQlFXRm5SQ3hQUVVGUGJrUXNRMEZCY0VJN1FVRkRRWGhETEZWQlFWRTBReXhKUVVGU0xFTkJRV0VyUXl4UFFVRlBiRVFzUTBGQmNFSTdPMEZCUlVGdlVDeGhRVUZYZFVZc2IwSkJRVmdzUTBGQlowTndXQ3hQUVVGb1F6dEJRVU5CTmxJc1lVRkJWelZGTEVOQlFWZ3NRMEZCWVVRc1VVRkJZanM3UVVGRlFTeE5RVUZKTmtVc1YwRkJWM1ZDTEVOQlFXWXNSVUZCYTBKMlFpeFhRVUZYZFVJc1EwRkJXQ3hEUVVGaGNFY3NVVUZCWWp0QlFVTnVRaXhEUVZoRU96dEJRV0ZCTlUwc2FVSkJRV2xDYVZnc2MwSkJRV3BDTEVkQlFUQkRMRlZCUVVNeFVpeE5RVUZFTEVWQlFWazdRVUZEY0VRc1RVRkJUV3ROTEdGQlFXRjBVaXhoUVVGaGIwWXNUMEZCVDJ0TkxGVkJRWEJDTEVOQlFXNUNPenRCUVVWQkxFMUJRVTE1Uml4UlFVRlJla1lzVjBGQlZ6QkdMSFZDUVVGWUxFTkJRVzFETlZJc1QwRkJUelpTTEV0QlFURkRMRU5CUVdRN1FVRkRRVVlzVVVGQlRVY3NhVUpCUVU0c1EwRkJkMElzU1VGQmVFSTdRVUZEUVRWR0xHRkJRVmMxUlN4RFFVRllMRU5CUVdGRUxGRkJRV0k3TzBGQlJVRXNUVUZCU1RaRkxGZEJRVmQxUWl4RFFVRm1MRVZCUVd0Q2RrSXNWMEZCVjNWQ0xFTkJRVmdzUTBGQllYQkhMRkZCUVdJN1FVRkRia0lzUTBGU1JEczdRVUZWUVRWTkxHbENRVUZwUW5OWUxIbENRVUZxUWl4SFFVRTJReXhWUVVGREwxSXNUVUZCUkN4RlFVRlpPMEZCUTNaRUxFMUJRVTFyVFN4aFFVRmhkRklzWVVGQllXOUdMRTlCUVU5clRTeFZRVUZ3UWl4RFFVRnVRanRCUVVGQkxFMUJRMFY1Uml4UlFVRlJla1lzVjBGQlZ6QkdMSFZDUVVGWUxFTkJRVzFETlZJc1QwRkJUelpTTEV0QlFURkRMRU5CUkZZN08wRkJSMEZHTEZGQlFVMUxMR0ZCUVU0c1EwRkJiMEpvVXl4UFFVRlBhVk1zVTBGQk0wSTdRVUZEUVU0c1VVRkJUVThzWVVGQlRpeERRVUZ2UW14VExFOUJRVTl0VXl4VlFVRXpRanRCUVVOQlVpeFJRVUZOVXl4dlFrRkJUaXhEUVVFeVFuQlRMRTlCUVU5blVDeFJRVUZzUXp0QlFVTkJNa01zVVVGQlRWVXNiVUpCUVU0c1EwRkJNRUp5VXl4UFFVRlBjMU1zVTBGQmFrTTdRVUZEUVhCSExHRkJRVmMxUlN4RFFVRllMRU5CUVdGRUxGRkJRV0k3TzBGQlJVRXNUVUZCU1RaRkxGZEJRVmQxUWl4RFFVRm1MRVZCUVd0Q2RrSXNWMEZCVjNWQ0xFTkJRVmdzUTBGQllYQkhMRkZCUVdJN1FVRkRia0lzUTBGWVJEczdRVUZoUVRWTkxHbENRVUZwUWpoWUxIVkNRVUZxUWl4SFFVRXlReXhWUVVGRGRsTXNUVUZCUkN4RlFVRlpPMEZCUTNKRUxFMUJRVTFyVFN4aFFVRmhkRklzWVVGQllXOUdMRTlCUVU5clRTeFZRVUZ3UWl4RFFVRnVRanRCUVVGQkxFMUJRMFY1Uml4UlFVRlJla1lzVjBGQlZ6QkdMSFZDUVVGWUxFTkJRVzFETlZJc1QwRkJUelpTTEV0QlFURkRMRU5CUkZZN08wRkJSMEZHTEZGQlFVMUhMR2xDUVVGT0xFTkJRWGRDTEV0QlFYaENPMEZCUTBFMVJpeGhRVUZYTlVVc1EwRkJXQ3hEUVVGaFJDeFJRVUZpT3p0QlFVVkJMRTFCUVVrMlJTeFhRVUZYZFVJc1EwRkJaaXhGUVVGclFuWkNMRmRCUVZkMVFpeERRVUZZTEVOQlFXRndSeXhSUVVGaU8wRkJRMjVDTEVOQlVrUTdPMEZCVlVFc1NVRkJUV3RJTEdOQlFXTXNVMEZCWkVFc1YwRkJZeXhIUVVGTk8wRkJRM2hDTEUxQlFVbDZVeXgzUWtGQmQwSllMRmxCUVZrMFF5eE5RVUZhTEVkQlFYRkNMRWxCUVVsc1JTeDVRa0ZCZVVJeVFpeHZRa0ZCT1VVc1JVRkJiMGM3UVVGRGJFZE1MR3RDUVVGakxFbEJRVWwxUml4WlFVRktMRU5CUTFvc1JVRkJRenRCUVVGRUxFMUJRMGMwVFN4TFFVRkxXU3hKUVVGTUxFTkJRVlZ5VlN4NVFrRkJlVUp4UWl4blFrRkJia01zU1VGQmRVUkJMR2RDUVVGNFJDeEhRVUUwUlUwc2IwSkJSbXhGTEVOQlJYVkdPMEZCUm5aR0xFdEJRV1E3TzBGQlMwRk1MR2RDUVVGWkxFTkJRVm9zU1VGQmFVSnVReXhqUVVGalF5eFhRVUV2UWp0QlFVTkVPenRCUVVWRWEwTXNZMEZCV1N4RFFVRmFMRWxCUVdsQ2RFSXNjMEpCUVdwQ0xFTkJWbmRDTEVOQlZXbENPenRCUVVWNlF6dEJRVU5GTEZGQlFVbHRSU3hKUVVGSkxFTkJRVkk3UVVGQlFTeFJRVU5GZDFVc1VVRkJVVGxZTEZOQlFWTnhSQ3hOUVVSdVFqczdRVUZIUVN4WFFVRlBlVlVzVDBGQlVDeEZRVUZuUWp0QlFVTmtMRlZCUVUxRExGTkJRVk12V0N4VFFVRlRPRmdzUzBGQlZDeERRVUZtT3p0QlFVVkJMRlZCUVVsRExGVkJRVlZCTEU5QlFVOXFWeXhKUVVGUUxFdEJRV2RDTEVOQlFUbENMRVZCUVdsRE8wRkJRVVU3UVVGRGFrTTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUVzV1VGQlRUaEpMRmxCUVZsdFRpeFBRVUZQUXl4M1FrRkJVQ3hGUVVGc1FqdEJRVU5CTEZsQlFVMURMRk5CUVZOeVRpeFZRVUZWYzA0c1UwRkJWaXhGUVVGbU8wRkJRMEVzV1VGQlRURk9MRmRCUVZkSkxGVkJRVlZ6U0N4WFFVRldMRVZCUVdwQ096dEJRVVZCTzBGQlEwRXNXVUZCVFdsSExGTkJRVk1zU1VGQlN6ZFZMRWRCUVVRc1IwRkJVWGhETEc5Q1FVRXpRanM3UVVGRlFVd3NiMEpCUVZrd1dDeE5RVUZhTEVsQlFYTkNTaXhQUVVGUGRGVXNSVUZCTjBJN08wRkJSVUZvUkN4dlFrRkJXVEJZTEZOQlFWTXNRMEZCY2tJc1NVRkJNRUpHTEU5QlFVOHZWaXhEUVVGUUxFVkJRVEZDTzBGQlEwRjZRaXh2UWtGQldUQllMRk5CUVZNc1EwRkJja0lzU1VGQk1FSkdMRTlCUVU4NVZpeERRVUZRTEVWQlFURkNPMEZCUTBFeFFpeHZRa0ZCV1RCWUxGTkJRVk1zUTBGQmNrSXNTVUZCTUVKR0xFOUJRVTgzVml4RFFVRlFMRVZCUVRGQ096dEJRVVZCTTBJc2IwSkJRVmt3V0N4VFFVRlRMRU5CUVhKQ0xFbEJRVEJDTTA0c1UwRkJVM1JKTEVOQlFWUXNSVUZCTVVJN1FVRkRRWHBDTEc5Q1FVRlpNRmdzVTBGQlV5eERRVUZ5UWl4SlFVRXdRak5PTEZOQlFWTnlTU3hEUVVGVUxFVkJRVEZDTzBGQlEwRXhRaXh2UWtGQldUQllMRk5CUVZNc1EwRkJja0lzU1VGQk1FSXpUaXhUUVVGVGNFa3NRMEZCVkN4RlFVRXhRanRCUVVOQk0wSXNiMEpCUVZrd1dDeFRRVUZUTEVOQlFYSkNMRWxCUVRCQ00wNHNVMEZCVTBVc1EwRkJWQ3hGUVVFeFFqczdRVUZGUVRkTUxHdENRVUZWYTFvc1QwRkJUMHNzYVVKQlFWQXNSVUZCVmp0QlFVTkJNMWdzYjBKQlFWa3dXQ3hUUVVGVExFTkJRWEpDTEVsQlFUQkNkRm9zVVVGQlVYRkVMRU5CUVZJc1JVRkJNVUk3UVVGRFFYcENMRzlDUVVGWk1GZ3NVMEZCVXl4RFFVRnlRaXhKUVVFd1FuUmFMRkZCUVZGelJDeERRVUZTTEVWQlFURkNPMEZCUTBFeFFpeHZRa0ZCV1RCWUxGTkJRVk1zUlVGQmNrSXNTVUZCTWtKMFdpeFJRVUZSZFVRc1EwRkJVaXhGUVVFelFqczdRVUZGUVhaRUxHdENRVUZWYTFvc1QwRkJUMDBzYTBKQlFWQXNSVUZCVmp0QlFVTkJOVmdzYjBKQlFWa3dXQ3hUUVVGVExFVkJRWEpDTEVsQlFUSkNkRm9zVVVGQlVYRkVMRU5CUVZJc1JVRkJNMEk3UVVGRFFYcENMRzlDUVVGWk1GZ3NVMEZCVXl4RlFVRnlRaXhKUVVFeVFuUmFMRkZCUVZGelJDeERRVUZTTEVWQlFUTkNPMEZCUTBFeFFpeHZRa0ZCV1RCWUxGTkJRVk1zUlVGQmNrSXNTVUZCTWtKMFdpeFJRVUZSZFVRc1EwRkJVaXhGUVVFelFqdEJRVU5FTzBGQlEwWTdRVUZEUmpzN1FVRkZSQ3hOUVVGSmFFSXNiMEpCUVVvc1JVRkJNRUpzUkN4dlFrRkJiMEoxUXl4WlFVRlpObGdzVFVGQmFFTXNSVUZCZDBNc1EwRkJRemRZTEZsQlFWazJXQ3hOUVVGaUxFTkJRWGhETEVWQlFURkNMRXRCUTB0d1lTeHZRa0ZCYjBKMVF5eFhRVUZ3UWp0QlFVTk9MRU5CTVVSRU96dEJRVFJFUVN4SlFVRk5jVlFzZVVKQlFYbENMRk5CUVhwQ1FTeHpRa0ZCZVVJc1IwRkJUVHRCUVVOdVF6czdRVUZGUVhCVUxHVkJRV0VzU1VGQlNYTkdMRmxCUVVvc1EwRkRXQ3hGUVVGRk8wRkJRVVlzU1VGRFJUVkhMSGRDUVVGM1FpeERRVVF4UWl4SFFVVkZSeXgzUWtGQmQwSXNRMEZJWml4RFFVRmlPenRCUVUxQmJVSXNZVUZCVnl4RFFVRllMRWxCUVdkQ2NFTXNZMEZCWTBzc1ZVRkJPVUk3UVVGRFFTdENMR0ZCUVZjc1EwRkJXQ3hKUVVGblFuUkNMSEZDUVVGb1FpeERRVlp0UXl4RFFWVkpPenRCUVVWMlF6dEJRVU5GTEZGQlFVa3JXU3hUUVVGVExFTkJRV0k3UVVGQlFTeFJRVU5GVEN4UlFVRlJPVmdzVTBGQlUzRkVMRTFCUkc1Q096dEJRVWRCTEZkQlFVOTVWU3hQUVVGUUxFVkJRV2RDTzBGQlEyUXNWVUZCVFVNc1UwRkJVeTlZTEZOQlFWTTRXQ3hMUVVGVUxFTkJRV1k3TzBGQlJVRXNWVUZCU1VNc1ZVRkJWVUVzVDBGQlQycFhMRWxCUVZBc1MwRkJaMElzUTBGQk9VSXNSVUZCYVVNN1FVRkJSVHM3UVVGRmFrTndRaXh0UWtGQlYzbFlMRTFCUVZnc1NVRkJjVUpLTEU5QlFVOTBWU3hGUVVFMVFqczdRVUZGUVN4WlFVRk5PRlVzWVVGQllVb3NVMEZCVXl4RFFVRTFRanM3UVVGRlFTeFpRVUZKU2l4UFFVRlBNMDRzU1VGQlVDeExRVUZuUWl4SlFVRndRaXhGUVVFd1FqdEJRVU40UWl4alFVRk5iMDhzVVVGQlVWUXNUMEZCVHpkTkxGZEJRVkFzUlVGQlpEdEJRVU5CTEdOQlFVMUVMRTlCUVU5MVRpeE5RVUZOZGs0c1NVRkJUaXhGUVVGaU8wRkJRMEYyU3l4eFFrRkJWM2xZTEZOQlFWTXNRMEZCY0VJc1NVRkJlVUpzVGl4SlFVRjZRanM3UVVGRlFTeGxRVUZMTEVsQlFVa3pTQ3hKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVreVNDeEpRVUZ3UWl4RlFVRXdRak5JTEVkQlFURkNMRVZCUVN0Q08wRkJRemRDTEdkQ1FVRk5LMFFzVDBGQlQyMVNMRTFCUVUxcVVDeEZRVUZPTEVOQlFWTnFSeXhEUVVGVUxFTkJRV0k3UVVGRFFTeG5Ra0ZCVFcxV0xFOUJRVTl3VWl4TFFVRkxjVklzVDBGQlRDeEZRVUZpTzBGQlEwRXNaMEpCUVUxRExFMUJRVTFLTEdGQlFXRnFWaXhKUVVGSkxFTkJRVGRDT3p0QlFVVkJOVU1zZFVKQlFWZHBXU3hIUVVGWUxFbEJRV3RDUml4TFFVRkxkbGNzUTBGQlRDeEZRVUZzUWp0QlFVTkJlRUlzZFVKQlFWZHBXU3hOUVVGTkxFTkJRV3BDTEVsQlFYTkNSaXhMUVVGTGRGY3NRMEZCVEN4RlFVRjBRanRCUVVOQmVrSXNkVUpCUVZkcFdTeE5RVUZOTEVOQlFXcENMRWxCUVhOQ1JpeExRVUZMY2xjc1EwRkJUQ3hGUVVGMFFqdEJRVU5FT3p0QlFVVkVLMVlzYjBKQlFWVnNUaXhQUVVGUExFTkJRVkFzUjBGQlZ5eERRVUZ5UWp0QlFVTkVMRk5CYUVKRUxFMUJhVUpMTEVsQlFVazRUU3hQUVVGUE1VNHNTMEZCV0N4RlFVRnJRanRCUVVOeVFpeGpRVUZOYlU4c1UwRkJVVlFzVDBGQlR6ZE5MRmRCUVZBc1JVRkJaRHRCUVVOQkxHTkJRVTFFTEZGQlFVOTFUaXhQUVVGTmRrNHNTVUZCVGl4RlFVRmlPMEZCUTBGMlN5eHhRa0ZCVjNsWUxGTkJRVk1zUTBGQmNFSXNTVUZCZVVKc1RpeExRVUY2UWpzN1FVRkZRU3hsUVVGTExFbEJRVWt6U0N4TlFVRkpMRU5CUVdJc1JVRkJaMEpCTEUxQlFVa3lTQ3hMUVVGd1FpeEZRVUV3UWpOSUxFdEJRVEZDTEVWQlFTdENPMEZCUXpkQ0xHZENRVUZOSzBRc1VVRkJUMjFTTEU5QlFVMXFVQ3hGUVVGT0xFTkJRVk5xUnl4SFFVRlVMRU5CUVdJN1FVRkRRU3huUWtGQlRXMVdMRkZCUVU5d1VpeE5RVUZMY1ZJc1QwRkJUQ3hGUVVGaU8wRkJRMEVzWjBKQlFVMTZWeXhUUVVGVGIwWXNUVUZCUzNWU0xFOUJRVXdzUlVGQlpqdEJRVU5CTEdkQ1FVRk5SQ3hQUVVGTlNpeGhRVUZoYWxZc1RVRkJTU3hEUVVFM1FqczdRVUZGUVRWRExIVkNRVUZYYVZrc1NVRkJXQ3hKUVVGclFrWXNUVUZCUzNaWExFTkJRVXdzUlVGQmJFSTdRVUZEUVhoQ0xIVkNRVUZYYVZrc1QwRkJUU3hEUVVGcVFpeEpRVUZ6UWtZc1RVRkJTM1JYTEVOQlFVd3NSVUZCZEVJN1FVRkRRWHBDTEhWQ1FVRlhhVmtzVDBGQlRTeERRVUZxUWl4SlFVRnpRa1lzVFVGQlMzSlhMRU5CUVV3c1JVRkJkRUk3TzBGQlJVRXhRaXgxUWtGQlYybFpMRTlCUVUwc1EwRkJha0lzU1VGQmMwSXhWeXhQUVVGUFF5eERRVUZRTEVWQlFYUkNPMEZCUTBGNFFpeDFRa0ZCVjJsWkxFOUJRVTBzUTBGQmFrSXNTVUZCYzBJeFZ5eFBRVUZQUlN4RFFVRlFMRVZCUVhSQ08wRkJRMEY2UWl4MVFrRkJWMmxaTEU5QlFVMHNRMEZCYWtJc1NVRkJjMEl4Vnl4UFFVRlBSeXhEUVVGUUxFVkJRWFJDTzBGQlEwUTdPMEZCUlVRclZpeHZRa0ZCVld4T0xGRkJRVThzUTBGQlVDeEhRVUZYTEVOQlFYSkNPMEZCUTBRc1UwRnlRa2tzVFVGelFrRTdRVUZEU0N4alFVRk5ORTRzVVVGQlVXUXNUMEZCVHk5TkxGZEJRVkFzUlVGQlpEdEJRVU5CTEdOQlFVMURMRk5CUVU4MFRpeE5RVUZOTlU0c1NVRkJUaXhGUVVGaU8wRkJRMEYyU3l4eFFrRkJWM2xZTEZOQlFWTXNRMEZCY0VJc1NVRkJlVUpzVGl4TlFVRjZRanM3UVVGRlFTeGxRVUZMTEVsQlFVa3pTQ3hOUVVGSkxFTkJRV0lzUlVGQlowSkJMRTFCUVVreVNDeE5RVUZ3UWl4RlFVRXdRak5JTEV0QlFURkNMRVZCUVN0Q08wRkJRemRDTEdkQ1FVRk5kMVlzVDBGQlQwUXNUVUZCVFhSUUxFVkJRVTRzUTBGQlUycEhMRWRCUVZRc1EwRkJZanM3UVVGRlFTeG5Ra0ZCVFhsV0xGRkJRVkZFTEV0QlFVdEdMRTlCUVV3c1EwRkJZU3hEUVVGaUxFTkJRV1E3UVVGRFFTeG5Ra0ZCVFVrc1VVRkJVVVlzUzBGQlMwWXNUMEZCVEN4RFFVRmhMRU5CUVdJc1EwRkJaRHRCUVVOQkxHZENRVUZOU3l4UlFVRlJTQ3hMUVVGTFJpeFBRVUZNTEVOQlFXRXNRMEZCWWl4RFFVRmtPenRCUVVWQkxHZENRVUZOVFN4UlFVRlJTQ3hOUVVGTlRDeFBRVUZPTEVWQlFXUTdRVUZEUVN4blFrRkJUVk1zVVVGQlVVZ3NUVUZCVFU0c1QwRkJUaXhGUVVGa08wRkJRMEVzWjBKQlFVMVZMRkZCUVZGSUxFMUJRVTFRTEU5QlFVNHNSVUZCWkRzN1FVRkZRU3huUWtGQlRWY3NWVUZCVlU0c1RVRkJUVWdzVDBGQlRpeEZRVUZvUWp0QlFVTkJMR2RDUVVGTlZTeFZRVUZWVGl4TlFVRk5TaXhQUVVGT0xFVkJRV2hDTzBGQlEwRXNaMEpCUVUxWExGVkJRVlZPTEUxQlFVMU1MRTlCUVU0c1JVRkJhRUk3TzBGQlJVRXNaMEpCUVUxRUxGRkJRVTFLTEdGQlFXRnFWaXhOUVVGSkxFVkJRVGRDT3p0QlFVVkJOVU1zZFVKQlFWZHBXU3hMUVVGWUxFbEJRV3RDVHl4TlFVRk5hRmdzUTBGQlRpeEZRVUZzUWp0QlFVTkJlRUlzZFVKQlFWZHBXU3hSUVVGTkxFTkJRV3BDTEVsQlFYTkNUeXhOUVVGTkwxY3NRMEZCVGl4RlFVRjBRanRCUVVOQmVrSXNkVUpCUVZkcFdTeFJRVUZOTEVOQlFXcENMRWxCUVhOQ1R5eE5RVUZOT1Zjc1EwRkJUaXhGUVVGMFFqczdRVUZGUVRGQ0xIVkNRVUZYYVZrc1VVRkJUU3hEUVVGcVFpeEpRVUZ6UWxVc1VVRkJVVzVZTEVOQlFWSXNSVUZCZEVJN1FVRkRRWGhDTEhWQ1FVRlhhVmtzVVVGQlRTeERRVUZxUWl4SlFVRnpRbFVzVVVGQlVXeFlMRU5CUVZJc1JVRkJkRUk3UVVGRFFYcENMSFZDUVVGWGFWa3NVVUZCVFN4RFFVRnFRaXhKUVVGelFsVXNVVUZCVVdwWUxFTkJRVklzUlVGQmRFSTdPMEZCUlVFeFFpeDFRa0ZCVjJsWkxGRkJRVTBzUTBGQmFrSXNTVUZCYzBKUkxFMUJRVTFxV0N4RFFVRk9MRVZCUVhSQ08wRkJRMEY0UWl4MVFrRkJWMmxaTEZGQlFVMHNRMEZCYWtJc1NVRkJjMEpSTEUxQlFVMW9XQ3hEUVVGT0xFVkJRWFJDTzBGQlEwRjZRaXgxUWtGQlYybFpMRkZCUVUwc1EwRkJha0lzU1VGQmMwSlJMRTFCUVUwdlZ5eERRVUZPTEVWQlFYUkNPenRCUVVWQk1VSXNkVUpCUVZkcFdTeFJRVUZOTEVOQlFXcENMRWxCUVhOQ1Z5eFJRVUZSY0Znc1EwRkJVaXhGUVVGMFFqdEJRVU5CZUVJc2RVSkJRVmRwV1N4UlFVRk5MRVZCUVdwQ0xFbEJRWFZDVnl4UlFVRlJibGdzUTBGQlVpeEZRVUYyUWp0QlFVTkJla0lzZFVKQlFWZHBXU3hSUVVGTkxFVkJRV3BDTEVsQlFYVkNWeXhSUVVGUmJGZ3NRMEZCVWl4RlFVRjJRanM3UVVGRlFURkNMSFZDUVVGWGFWa3NVVUZCVFN4RlFVRnFRaXhKUVVGMVFsTXNUVUZCVFd4WUxFTkJRVTRzUlVGQmRrSTdRVUZEUVhoQ0xIVkNRVUZYYVZrc1VVRkJUU3hGUVVGcVFpeEpRVUYxUWxNc1RVRkJUV3BZTEVOQlFVNHNSVUZCZGtJN1FVRkRRWHBDTEhWQ1FVRlhhVmtzVVVGQlRTeEZRVUZxUWl4SlFVRjFRbE1zVFVGQlRXaFlMRU5CUVU0c1JVRkJka0k3TzBGQlJVRXhRaXgxUWtGQlYybFpMRkZCUVUwc1JVRkJha0lzU1VGQmRVSlpMRkZCUVZGeVdDeERRVUZTTEVWQlFYWkNPMEZCUTBGNFFpeDFRa0ZCVjJsWkxGRkJRVTBzUlVGQmFrSXNTVUZCZFVKWkxGRkJRVkZ3V0N4RFFVRlNMRVZCUVhaQ08wRkJRMEY2UWl4MVFrRkJWMmxaTEZGQlFVMHNSVUZCYWtJc1NVRkJkVUpaTEZGQlFWRnVXQ3hEUVVGU0xFVkJRWFpDTzBGQlEwUTdPMEZCUlVRclZpeHZRa0ZCVld4T0xGTkJRVThzUlVGQlVDeEhRVUZaTEVOQlFYUkNPMEZCUTBRN1FVRkRSanRCUVVOR08wRkJRMFk3TzBGQlJVUTdRVUZEUVR0QlFVTkJMMDBzYzBKQlFXOUNkME1zVlVGQmNFSTdRVUZEUkN4RFFYaElSRHM3UVVFd1NFRXNTVUZCVFdsVUxHMUNRVUZ0UWl4VFFVRnVRa0VzWjBKQlFXMUNMRWRCUVUwN1FVRkROMElzVFVGQlRUWkdMRXRCUVVzNVdpeE5RVUZOSzFvc1lVRkJUaXhGUVVGWU8wRkJRVUVzVFVGRFJVTXNUVUZCVFVZc1IwRkJSMGNzWlVGQlNDeEZRVVJTTzBGQlJVVTdPMEZCUlVZc1RVRkJTWFpaTEc5Q1FVRktMRVZCUVRCQ08wRkJRM2hDTEZGQlFVbFVMR2RDUVVGblFqQkRMRTFCUVdoQ0xFZEJRWGxDTEVsQlFVbHhWeXhOUVVGTk0xa3NkMEpCUVhaRExFVkJRV2xGTzBGQlF5OUVTaXgzUWtGQmEwSXNTVUZCU1hGR0xGbEJRVW9zUTBGRGFFSXNSVUZCUlR0QlFVRkdMRkZCUTBjMFRTeExRVUZMV1N4SlFVRk1MRU5CUVZWMFZTeGxRVUZsYzBJc1owSkJRWHBDTEVsQlFUWkRRU3huUWtGQk9VTXNSMEZCYTBWUExIZENRVVp3UkN4RFFVVTJSVHRCUVVZM1JTeFBRVUZzUWp0QlFVbEJTaXh6UWtGQlowSXNRMEZCYUVJc1NVRkJjVUp5UXl4alFVRmpSU3hsUVVGdVF6dEJRVU5FTzBGQlEwWTdPMEZCUlVSdFF5eHJRa0ZCWjBJc1EwRkJhRUlzU1VGQmNVSXNRMEZCY2tJc1EwRm1Oa0lzUTBGbFREczdRVUZGZUVJc1QwRkJTeXhKUVVGSk1rTXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKYjFjc1IwRkJjRUlzUlVGQmVVSndWeXhIUVVGNlFpeEZRVUU0UWp0QlFVTTFRaXhSUVVGTmMxY3NWMEZCVjBvc1IwRkJSMHNzTUVKQlFVZ3NRMEZCT0VKMlZ5eERRVUU1UWl4RFFVRnFRanRCUVVGQkxGRkJRMFYzVnl4bFFVRmxSaXhUUVVGVFJ5eGpRVUZVTEVWQlJHcENPenRCUVVkQkxGRkJRVWxFTEdsQ1FVRnBRaXhEUVVGeVFpeEZRVUYzUWpzN1FVRkZlRUlzVTBGQlN5eEpRVUZKTTFZc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpNbFlzV1VGQmNFSXNSVUZCYTBNelZpeEhRVUZzUXl4RlFVRjFRenRCUVVOeVF5eFZRVUZOTmxZc1MwRkJTMG9zVTBGQlUwc3NaVUZCVkN4RFFVRjVRamxXTEVOQlFYcENMRU5CUVZnN08wRkJSVUU3UVVGRFFTeFZRVUZOWjFVc1UwRkJVeXhKUVVGTGVGZ3NaMEpCUVdkQ0xFTkJRV2hDTEVkQlFVUXNSMEZCZVVKSkxIZENRVUUxUXp0QlFVTkJTaXh6UWtGQlowSjNXQ3hOUVVGb1FpeEpRVUV3UW1oWkxHTkJRV041V2l4VFFVRlRUU3hSUVVGVUxFZEJRVzlDYmxjc1IwRkJiRU1zUTBGQk1VSTdRVUZEUVhCRUxITkNRVUZuUW5kWUxGTkJRVk1zUTBGQmVrSXNTVUZCT0VKb1dTeGpRVUZqZVZvc1UwRkJVMDhzVVVGQlZDeEhRVUZ2UW5CWExFZEJRV3hETEVOQlFUbENPenRCUVVWQmJFWXNaMEpCUVZWdFlpeEhRVUZIU1N4dlFrRkJTQ3hGUVVGV08wRkJRMEY2V2l4elFrRkJaMEozV0N4VFFVRlRMRU5CUVhwQ0xFbEJRVGhDZEZvc1VVRkJVWEZFTEVOQlFWSXNSVUZCT1VJN1FVRkRRWFpDTEhOQ1FVRm5RbmRZTEZOQlFWTXNRMEZCZWtJc1NVRkJPRUowV2l4UlFVRlJjMFFzUTBGQlVpeEZRVUU1UWp0QlFVTkJlRUlzYzBKQlFXZENkMWdzVTBGQlV5eERRVUY2UWl4SlFVRTRRblJhTEZGQlFWRjFSQ3hEUVVGU0xFVkJRVGxDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBRN1FVRkRSanM3UVVGRlJDeE5RVUZKYUVJc2IwSkJRVW9zUlVGQk1FSnNSQ3h2UWtGQmIwSjVReXhuUWtGQlowSXlXQ3hOUVVGd1F5eEZRVUUwUXl4RFFVRkRNMWdzWjBKQlFXZENNbGdzVFVGQmFrSXNRMEZCTlVNc1JVRkJNVUlzUzBGRFMzQmhMRzlDUVVGdlFubERMR1ZCUVhCQ08wRkJRMDRzUTBFelEwUTdPMEZCTmtOQkxFbEJRVTByVXl4cFFrRkJhVUlzVTBGQmFrSkJMR05CUVdsQ0xFZEJRVms3UVVGRGFrTXNUVUZCU1hSVExHOUNRVUZLTEVWQlFUQkNPMEZCUTNoQ0xGRkJRVWxTTEdOQlFXTjVReXhOUVVGa0xFZEJRWFZDTEVsQlFVbG9SU3hqUVVGak1rSXNjMEpCUVRkRExFVkJRWEZGTzBGQlEyNUZTaXh6UWtGQlowSXNTVUZCU1c5R0xGbEJRVW9zUTBGRFpDeEZRVUZGTzBGQlFVWXNVVUZEUnpSTkxFdEJRVXRaTEVsQlFVd3NRMEZCVlc1VkxHTkJRV050UWl4blFrRkJlRUlzU1VGQk5FTkJMR2RDUVVFM1F5eEhRVUZwUlZFc2MwSkJSbkpFTEVOQlJUUkZPMEZCUmpWRkxFOUJRV2hDTzBGQlNVRktMRzlDUVVGakxFTkJRV1FzU1VGQmJVSjBReXhqUVVGalJ5eGhRVUZxUXp0QlFVTkVPMEZCUTBZN08wRkJSVVE3UVVGRFJTeFJRVUZKTmtVc1NVRkJTU3hEUVVGU08wRkJRVUVzVVVGRFJXRXNTVUZCU1N4RFFVUk9PMEZCUVVFc1VVRkZSVEpVTEZGQlFWRTNXQ3hWUVVGVmIwUXNUVUZHY0VJN08wRkJTVUVzVjBGQlQzbFZMRTlCUVZBc1JVRkJaMEk3UVVGRFpDeFZRVUZKTjFnc1ZVRkJWVFpZTEV0QlFWWXNRMEZCU2l4RlFVRnpRanRCUVVOd1FpeFpRVUZOY0Vzc1ZVRkJWWHBPTEZWQlFWVTJXQ3hMUVVGV0xFTkJRV2hDT3p0QlFVVkJMR0ZCUVVzelZDeEpRVUZKTEVOQlFWUXNSVUZCV1VFc1NVRkJTWFZLTEZGQlFWRXlUU3haUVVGU0xFVkJRV2hDTEVWQlFYZERiRmNzUjBGQmVFTXNSVUZCTmtNN1FVRkRNME03UVVGRFFUdEJRVU5CTEdOQlFVMTVSeXhaUVVGWk9FTXNVVUZCVVRSTkxGbEJRVklzUTBGQmNVSnVWeXhEUVVGeVFpeEZRVUYzUW05WExHOUNRVUY0UWl4RlFVRnNRanM3UVVGRlFTeGpRVUZOZEVNc1UwRkJVM0pPTEZWQlFWVnpUaXhUUVVGV0xFVkJRV1k3UVVGRFFTeGpRVUZOTVU0c1YwRkJWMGtzVlVGQlZYTklMRmRCUVZZc1JVRkJha0k3TzBGQlJVRTdRVUZEUVN4alFVRk5hVWNzVTBGQlV5eEpRVUZMTjFVc1IwRkJSQ3hIUVVGUmRFTXNjMEpCUVROQ096dEJRVVZCU2l4M1FrRkJZM1ZZTEUxQlFXUXNTVUZCZDBKTUxFdEJRWGhDTzBGQlEwRnNXQ3gzUWtGQlkzVllMRk5CUVZNc1EwRkJka0lzU1VGQk5FSm9WU3hEUVVFMVFqczdRVUZGUVhaRUxIZENRVUZqZFZnc1UwRkJVeXhEUVVGMlFpeEpRVUUwUWtZc1QwRkJUeTlXTEVOQlFWQXNSVUZCTlVJN1FVRkRRWFJDTEhkQ1FVRmpkVmdzVTBGQlV5eERRVUYyUWl4SlFVRTBRa1lzVDBGQlR6bFdMRU5CUVZBc1JVRkJOVUk3UVVGRFFYWkNMSGRDUVVGamRWZ3NVMEZCVXl4RFFVRjJRaXhKUVVFMFFrWXNUMEZCVHpkV0xFTkJRVkFzUlVGQk5VSTdPMEZCUlVGNFFpeDNRa0ZCWTNWWUxGTkJRVk1zUTBGQmRrSXNTVUZCTkVJelRpeFRRVUZUZEVrc1EwRkJWQ3hGUVVFMVFqdEJRVU5CZEVJc2QwSkJRV04xV0N4VFFVRlRMRU5CUVhaQ0xFbEJRVFJDTTA0c1UwRkJVM0pKTEVOQlFWUXNSVUZCTlVJN1FVRkRRWFpDTEhkQ1FVRmpkVmdzVTBGQlV5eERRVUYyUWl4SlFVRTBRak5PTEZOQlFWTndTU3hEUVVGVUxFVkJRVFZDTzBGQlEwRjRRaXgzUWtGQlkzVllMRk5CUVZNc1EwRkJka0lzU1VGQk5FSXpUaXhUUVVGVFJTeERRVUZVTEVWQlFUVkNPMEZCUTBRN1FVRkRSanRCUVVOR096dEJRVVZFTEZGQlFVbDBTaXgzUWtGQmQwSXJReXhOUVVGTkxFTkJRV3hETEVWQlFYRkRha2NzYjBKQlFXOUNNRU1zWTBGQll6QllMRTFCUVd4RExFVkJRVEJETEVOQlFVTXhXQ3hqUVVGak1GZ3NUVUZCWml4RFFVRXhReXhGUVVGeVF5eExRVU5MTEVsQlFVbHVWU3hOUVVGTkxFTkJRVllzUlVGQllXcEhMRzlDUVVGdlFqQkRMR0ZCUVhCQ08wRkJRMjVDTzBGQlEwWXNRMEZxUkVRN08wRkJiVVJCTEVsQlFVMW5WQ3h2UWtGQmIwSXNVMEZCY0VKQkxHbENRVUZ2UWl4SFFVRlpPMEZCUTNCRExFMUJRVWw0VXl4dlFrRkJTaXhGUVVFd1FqdEJRVU40UWl4UlFVRkpVQ3hwUWtGQmFVSjNReXhOUVVGcVFpeEhRVUV3UWl4SlFVRkpMMFFzYlVKQlFXMUNNa0lzZVVKQlFYSkVMRVZCUVdkR08wRkJRemxGU2l4NVFrRkJiVUlzU1VGQlNXMUdMRmxCUVVvc1EwRkRha0lzUlVGQlJUdEJRVUZHTEZGQlEwYzBUU3hMUVVGTFdTeEpRVUZNTEVOQlFWVnNWU3h0UWtGQmJVSnJRaXhuUWtGQk4wSXNTVUZCYVVSQkxHZENRVUZzUkN4SFFVRnpSVk1zZVVKQlJuWkVMRU5CUldsR08wRkJSbXBHTEU5QlFXNUNPMEZCU1VGS0xIVkNRVUZwUWl4RFFVRnFRaXhKUVVGelFuWkRMR05CUVdOSkxHZENRVUZ3UXp0QlFVTkVPMEZCUTBZN08wRkJSVVE3UVVGRFJTeFJRVUZKZVZvc1UwRkJVeXhEUVVGaU8wRkJRVUVzVVVGRFJUZFZMRWxCUVVrc1EwRkVUanRCUVVGQkxGRkJSVVYzVlN4UlFVRlJOVmdzWVVGQllYTmhMRTFCUm5aQ096dEJRVWxCTEZkQlFVOHhReXhQUVVGUUxFVkJRV2RDTzBGQlEyUXNWVUZCU1RWWUxHRkJRV0UwV0N4TFFVRmlMRU5CUVVvc1JVRkJlVUk3UVVGRGRrSXNXVUZCVFhSSExHTkJRV0YwVWl4aFFVRmhORmdzUzBGQllpeERRVUZ1UWp0QlFVTkJMRmxCUVUweVF5eGpRVUZqYWtvc1dVRkJWelZGTEVOQlFTOUNPMEZCUTBFc1dVRkJUV2hETEZsQlFWazBSeXhaUVVGWFlTeEZRVUUzUWp0QlFVTkJMRmxCUVUwMFJpeFRRVUZUY2s0c1ZVRkJWWE5PTEZOQlFWWXNSVUZCWmpzN1FVRkZRVHRCUVVOQlF5eHBRa0ZCVXl4SlFVRkxOMVVzUjBGQlJDeEhRVUZSY2tNc2VVSkJRWEpDT3p0QlFVVkJTaXg1UWtGQmFVSnpXQ3hOUVVGcVFpeEpRVUV5UWt3c1MwRkJNMEk3UVVGRFFXcFlMSGxDUVVGcFFuTllMRk5CUVZNc1EwRkJNVUlzU1VGQkswSnpReXhaUVVGWmFGZ3NSVUZCTTBNN1FVRkRRVFZETEhsQ1FVRnBRbk5ZTEZOQlFWTXNRMEZCTVVJc1NVRkJLMEpHTEU5QlFVOHZWaXhEUVVGMFF6dEJRVU5CY2tJc2VVSkJRV2xDYzFnc1UwRkJVeXhEUVVFeFFpeEpRVUVyUWtZc1QwRkJUemxXTEVOQlFYUkRPMEZCUTBGMFFpeDVRa0ZCYVVKeldDeFRRVUZUTEVOQlFURkNMRWxCUVN0Q1JpeFBRVUZQTjFZc1EwRkJkRU03UVVGRFFYWkNMSGxDUVVGcFFuTllMRk5CUVZNc1EwRkJNVUlzU1VGQkswSXpSeXhaUVVGWGEwb3NNa0pCUVZnc1JVRkJMMEk3UVVGRFJEdEJRVU5HT3p0QlFVVkVMRkZCUVVsMFdpeDNRa0ZCZDBKclF5eE5RVUZOTEVOQlFXeERMRVZCUVhGRGNFWXNiMEpCUVc5Q01rTXNhVUpCUVdsQ2VWZ3NUVUZCY2tNc1JVRkJOa01zUTBGQlEzcFlMR2xDUVVGcFFubFlMRTFCUVd4Q0xFTkJRVGRETEVWQlFYSkRMRXRCUTBzc1NVRkJTV2hXTEUxQlFVMHNRMEZCVml4RlFVRmhjRVlzYjBKQlFXOUNNa01zWjBKQlFYQkNPMEZCUTI1Q08wRkJRMFlzUTBGMFEwUTdPMEZCZDBOQk1VTXNTMEZCUzNkakxGTkJRVXdzUjBGQmFVSXNWVUZCVlVNc1MwRkJWaXhGUVVGcFFqdEJRVU5vUXl4TlFVRkpRU3hOUVVGTmVGZ3NTVUZCVGl4WlFVRnpRalJETEZsQlFURkNMRVZCUVhkRE8wRkJRM1JETzBGQlEwRXNXVUZCVVRSVkxFMUJRVTE0V0N4SlFVRk9MRU5CUVZjc1EwRkJXQ3hEUVVGU08wRkJRMFVzVjBGQlN6bEZMR05CUVdORExGZEJRVzVDTzBGQlFXZERPMEZCUXpsQ2EwTXNkMEpCUVdNc1NVRkJTWFZHTEZsQlFVb3NRMEZCYVVJMFZTeE5RVUZOZUZnc1NVRkJka0lzUTBGQlpEdEJRVU5CTzBGQlEwUTdRVUZEUkN4WFFVRkxPVVVzWTBGQlkwVXNaVUZCYmtJN1FVRkJiME03UVVGRGJFTnRReXcwUWtGQmEwSXNTVUZCU1hGR0xGbEJRVW9zUTBGQmFVSTBWU3hOUVVGTmVGZ3NTVUZCZGtJc1EwRkJiRUk3UVVGRFFUdEJRVU5FTzBGQlEwUXNWMEZCU3psRkxHTkJRV05ITEdGQlFXNUNPMEZCUVd0RE8wRkJRMmhEYlVNc01FSkJRV2RDTEVsQlFVbHZSaXhaUVVGS0xFTkJRV2xDTkZVc1RVRkJUWGhZTEVsQlFYWkNMRU5CUVdoQ08wRkJRMEU3UVVGRFJEdEJRVU5FTEZkQlFVczVSU3hqUVVGalNTeG5Ra0ZCYmtJN1FVRkJjVU03UVVGRGJrTnRReXcyUWtGQmJVSXNTVUZCU1cxR0xGbEJRVW9zUTBGQmFVSTBWU3hOUVVGTmVGZ3NTVUZCZGtJc1EwRkJia0k3UVVGRFFUdEJRVU5FTzBGQlEwUTdRVUZxUWtZN08wRkJiMEpCTzBGQlEwUXNSMEYyUWtRc1RVRjFRazhzU1VGQlNYZFlMRTFCUVUxNFdDeEpRVUZPTEVOQlFWZDFReXhIUVVGWUxFbEJRV3RDTlVZc2FVSkJRV2xDTm1Fc1RVRkJUWGhZTEVsQlFVNHNRMEZCVjNWRExFZEJRVFZDTEVOQlFYUkNMRVZCUVhkRU5VWXNhVUpCUVdsQ05tRXNUVUZCVFhoWUxFbEJRVTRzUTBGQlYzVkRMRWRCUVRWQ0xFVkJRV2xEYVZZc1RVRkJUWGhZTEVsQlFVNHNRMEZCVjJ0RExFMUJRVFZETzBGQlEyaEZMRU5CZWtKRUxFTWlMQ0ptYVd4bElqb2lkMjl5YTJWeUxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSUZ4MEx5OGdWR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwZG1GeUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNZ1BTQjdmVHRjYmx4dUlGeDBMeThnVkdobElISmxjWFZwY21VZ1puVnVZM1JwYjI1Y2JpQmNkR1oxYm1OMGFXOXVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvYlc5a2RXeGxTV1FwSUh0Y2JseHVJRngwWEhRdkx5QkRhR1ZqYXlCcFppQnRiMlIxYkdVZ2FYTWdhVzRnWTJGamFHVmNiaUJjZEZ4MGFXWW9hVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHBYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNWNiaUJjZEZ4MEx5OGdRM0psWVhSbElHRWdibVYzSUcxdlpIVnNaU0FvWVc1a0lIQjFkQ0JwZENCcGJuUnZJSFJvWlNCallXTm9aU2xjYmlCY2RGeDBkbUZ5SUcxdlpIVnNaU0E5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkSUQwZ2UxeHVJRngwWEhSY2RHazZJRzF2WkhWc1pVbGtMRnh1SUZ4MFhIUmNkR3c2SUdaaGJITmxMRnh1SUZ4MFhIUmNkR1Y0Y0c5eWRITTZJSHQ5WEc0Z1hIUmNkSDA3WEc1Y2JpQmNkRngwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNGdYSFJjZEcxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1OaGJHd29iVzlrZFd4bExtVjRjRzl5ZEhNc0lHMXZaSFZzWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cE8xeHVYRzRnWEhSY2RDOHZJRVpzWVdjZ2RHaGxJRzF2WkhWc1pTQmhjeUJzYjJGa1pXUmNiaUJjZEZ4MGJXOWtkV3hsTG13Z1BTQjBjblZsTzF4dVhHNGdYSFJjZEM4dklGSmxkSFZ5YmlCMGFHVWdaWGh3YjNKMGN5QnZaaUIwYUdVZ2JXOWtkV3hsWEc0Z1hIUmNkSEpsZEhWeWJpQnRiMlIxYkdVdVpYaHdiM0owY3p0Y2JpQmNkSDFjYmx4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlhNZ2IySnFaV04wSUNoZlgzZGxZbkJoWTJ0ZmJXOWtkV3hsYzE5ZktWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dElEMGdiVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVWdZMkZqYUdWY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WXlBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNN1hHNWNiaUJjZEM4dklHbGtaVzUwYVhSNUlHWjFibU4wYVc5dUlHWnZjaUJqWVd4c2FXNW5JR2hoY20xdmJua2dhVzF3YjNKMGN5QjNhWFJvSUhSb1pTQmpiM0p5WldOMElHTnZiblJsZUhSY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YVNBOUlHWjFibU4wYVc5dUtIWmhiSFZsS1NCN0lISmxkSFZ5YmlCMllXeDFaVHNnZlR0Y2JseHVJRngwTHk4Z1pHVm1hVzVsSUdkbGRIUmxjaUJtZFc1amRHbHZiaUJtYjNJZ2FHRnliVzl1ZVNCbGVIQnZjblJ6WEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFnUFNCbWRXNWpkR2x2YmlobGVIQnZjblJ6TENCdVlXMWxMQ0JuWlhSMFpYSXBJSHRjYmlCY2RGeDBhV1lvSVY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJ5aGxlSEJ2Y25SekxDQnVZVzFsS1NrZ2UxeHVJRngwWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0J1WVcxbExDQjdYRzRnWEhSY2RGeDBYSFJqYjI1bWFXZDFjbUZpYkdVNklHWmhiSE5sTEZ4dUlGeDBYSFJjZEZ4MFpXNTFiV1Z5WVdKc1pUb2dkSEoxWlN4Y2JpQmNkRngwWEhSY2RHZGxkRG9nWjJWMGRHVnlYRzRnWEhSY2RGeDBmU2s3WEc0Z1hIUmNkSDFjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR2RsZEVSbFptRjFiSFJGZUhCdmNuUWdablZ1WTNScGIyNGdabTl5SUdOdmJYQmhkR2xpYVd4cGRIa2dkMmwwYUNCdWIyNHRhR0Z5Ylc5dWVTQnRiMlIxYkdWelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG00Z1BTQm1kVzVqZEdsdmJpaHRiMlIxYkdVcElIdGNiaUJjZEZ4MGRtRnlJR2RsZEhSbGNpQTlJRzF2WkhWc1pTQW1KaUJ0YjJSMWJHVXVYMTlsYzAxdlpIVnNaU0EvWEc0Z1hIUmNkRngwWm5WdVkzUnBiMjRnWjJWMFJHVm1ZWFZzZENncElIc2djbVYwZFhKdUlHMXZaSFZzWlZzblpHVm1ZWFZzZENkZE95QjlJRHBjYmlCY2RGeDBYSFJtZFc1amRHbHZiaUJuWlhSTmIyUjFiR1ZGZUhCdmNuUnpLQ2tnZXlCeVpYUjFjbTRnYlc5a2RXeGxPeUI5TzF4dUlGeDBYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb1oyVjBkR1Z5TENBbllTY3NJR2RsZEhSbGNpazdYRzRnWEhSY2RISmxkSFZ5YmlCblpYUjBaWEk3WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3hjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieUE5SUdaMWJtTjBhVzl1S0c5aWFtVmpkQ3dnY0hKdmNHVnlkSGtwSUhzZ2NtVjBkWEp1SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNodlltcGxZM1FzSUhCeWIzQmxjblI1S1RzZ2ZUdGNibHh1SUZ4MEx5OGdYMTkzWldKd1lXTnJYM0IxWW14cFkxOXdZWFJvWDE5Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y0NBOUlGd2lYQ0k3WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9YMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV6SUQwZ01DazdYRzVjYmx4dVhHNHZMeUJYUlVKUVFVTkxJRVpQVDFSRlVpQXZMMXh1THk4Z2QyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ056aG1NVE5rTWpaaE9URXlNbU14WlRaaE5tRWlMQ0pqYjI1emRDQjBjbUZ1YzJabGNtRmliR1ZOWlhOellXZGxJRDBnYzJWc1ppNTNaV0pyYVhSUWIzTjBUV1Z6YzJGblpTQjhmQ0J6Wld4bUxuQnZjM1JOWlhOellXZGxMRnh1WEc0Z0lDOHZJR1Z1ZFcxY2JpQWdUVVZUVTBGSFJWOVVXVkJGVXlBOUlIdGNiaUFnSUNCWFQxSk1SRkpGVUU5U1ZEb2dNQ3hjYmlBZ0lDQkRUMHhNU1ZOSlQwNVNSVkJQVWxRNklERXNYRzRnSUNBZ1ZrVklTVU5NUlZKRlVFOVNWRG9nTWl4Y2JpQWdJQ0JEVDA1VFZGSkJTVTVVVWtWUVQxSlVPaUF6TEZ4dUlDQWdJRk5QUmxSU1JWQlBVbFE2SURSY2JpQWdmVHRjYmx4dUlDQXZMeUIwWlcxd0lIWmhjbWxoWW14bGMxeHViR1YwSUY5dlltcGxZM1FzWEc0Z0lGOTJaV04wYjNJc1hHNGdJRjkwY21GdWMyWnZjbTBzWEc0Z0lGOTBjbUZ1YzJadmNtMWZjRzl6TEZ4dUlDQmZjMjltZEdKdlpIbGZaVzVoWW14bFpDQTlJR1poYkhObExGeHVJQ0JzWVhOMFgzTnBiWFZzWVhScGIyNWZaSFZ5WVhScGIyNGdQU0F3TEZ4dVhHNGdJRjl1ZFcxZmIySnFaV04wY3lBOUlEQXNYRzRnSUY5dWRXMWZjbWxuYVdSaWIyUjVYMjlpYW1WamRITWdQU0F3TEZ4dUlDQmZiblZ0WDNOdlpuUmliMlI1WDI5aWFtVmpkSE1nUFNBd0xGeHVJQ0JmYm5WdFgzZG9aV1ZzY3lBOUlEQXNYRzRnSUY5dWRXMWZZMjl1YzNSeVlXbHVkSE1nUFNBd0xGeHVJQ0JmYzI5bWRHSnZaSGxmY21Wd2IzSjBYM05wZW1VZ1BTQXdMRnh1WEc0Z0lDOHZJSGR2Y214a0lIWmhjbWxoWW14bGMxeHVJQ0JtYVhobFpGUnBiV1ZUZEdWd0xDQXZMeUIxYzJWa0lIZG9aVzRnWTJGc2JHbHVaeUJ6ZEdWd1UybHRkV3hoZEdsdmJseHVJQ0JzWVhOMFgzTnBiWFZzWVhScGIyNWZkR2x0WlN4Y2JseHVJQ0IzYjNKc1pDeGNiaUFnWDNabFl6TmZNU3hjYmlBZ1gzWmxZek5mTWl4Y2JpQWdYM1psWXpOZk15eGNiaUFnWDNGMVlYUTdYRzVjYmlBZ0x5OGdjSEpwZG1GMFpTQmpZV05vWlZ4dVkyOXVjM1FnY0hWaWJHbGpYMloxYm1OMGFXOXVjeUE5SUh0OUxGeHVJQ0JmYjJKcVpXTjBjeUE5SUZ0ZExGeHVJQ0JmZG1Wb2FXTnNaWE1nUFNCYlhTeGNiaUFnWDJOdmJuTjBjbUZwYm5SeklEMGdXMTBzWEc0Z0lGOXZZbXBsWTNSelgyRnRiVzhnUFNCN2ZTeGNiaUFnWDI5aWFtVmpkRjl6YUdGd1pYTWdQU0I3ZlN4Y2JseHVJQ0F2THlCVWFHVWdabTlzYkc5M2FXNW5JRzlpYW1WamRITWdZWEpsSUhSdklIUnlZV05ySUc5aWFtVmpkSE1nZEdoaGRDQmhiVzF2TG1weklHUnZaWE51SjNRZ1kyeGxZVzVjYmlBZ0x5OGdkWEF1SUVGc2JDQmhjbVVnWTJ4bFlXNWxaQ0IxY0NCM2FHVnVJSFJvWlhrbmNtVWdZMjl5Y21WemNHOXVaR2x1WnlCaWIyUjVJR2x6SUdSbGMzUnliM2xsWkM1Y2JpQWdMeThnVlc1bWIzSjBkVzVoZEdWc2VTd2dhWFFuY3lCMlpYSjVJR1JwWm1acFkzVnNkQ0IwYnlCblpYUWdZWFFnZEdobGMyVWdiMkpxWldOMGN5Qm1jbTl0SUhSb1pWeHVJQ0F2THlCaWIyUjVMQ0J6YnlCM1pTQm9ZWFpsSUhSdklIUnlZV05ySUhSb1pXMGdiM1Z5YzJWc2RtVnpMbHh1SUNCZmJXOTBhVzl1WDNOMFlYUmxjeUE5SUh0OUxGeHVJQ0F2THlCRWIyNG5kQ0J1WldWa0lIUnZJSGR2Y25KNUlHRmliM1YwSUdsMElHWnZjaUJqWVdOb1pXUWdjMmhoY0dWekxseHVJQ0JmYm05dVkyRmphR1ZrWDNOb1lYQmxjeUE5SUh0OUxGeHVJQ0F2THlCQklHSnZaSGtnZDJsMGFDQmhJR052YlhCdmRXNWtJSE5vWVhCbElHRnNkMkY1Y3lCb1lYTWdZU0J5WldkMWJHRnlJSE5vWVhCbElHRnpJSGRsYkd3c0lITnZJSGRsWEc0Z0lDOHZJR2hoZG1VZ2RISmhZMnNnZEdobGJTQnpaWEJoY21GMFpXeDVMbHh1SUNCZlkyOXRjRzkxYm1SZmMyaGhjR1Z6SUQwZ2UzMDdYRzVjYmlBZ0x5OGdiMkpxWldOMElISmxjRzl5ZEdsdVoxeHViR1YwSUZKRlVFOVNWRjlEU0ZWT1MxTkpXa1VzSUM4dklISmxjRzl5ZENCaGNuSmhlU0JwY3lCcGJtTnlaV0Z6WldRZ2FXNGdhVzVqY21WdFpXNTBjeUJ2WmlCMGFHbHpJR05vZFc1cklITnBlbVZjYmlBZ2QyOXliR1J5WlhCdmNuUXNYRzRnSUhOdlpuUnlaWEJ2Y25Rc1hHNGdJR052Ykd4cGMybHZibkpsY0c5eWRDeGNiaUFnZG1Wb2FXTnNaWEpsY0c5eWRDeGNiaUFnWTI5dWMzUnlZV2x1ZEhKbGNHOXlkRHRjYmx4dVkyOXVjM1FnVjA5U1RFUlNSVkJQVWxSZlNWUkZUVk5KV2tVZ1BTQXhOQ3dnTHk4Z2FHOTNJRzFoYm5rZ1pteHZZWFFnZG1Gc2RXVnpJR1ZoWTJnZ2NtVndiM0owWldRZ2FYUmxiU0J1WldWa2MxeHVJQ0JEVDB4TVNWTkpUMDVTUlZCUFVsUmZTVlJGVFZOSldrVWdQU0ExTENBdkx5QnZibVVnWm14dllYUWdabTl5SUdWaFkyZ2diMkpxWldOMElHbGtMQ0JoYm1RZ1lTQldaV016SUdOdmJuUmhZM1FnYm05eWJXRnNYRzRnSUZaRlNFbERURVZTUlZCUFVsUmZTVlJGVFZOSldrVWdQU0E1TENBdkx5QjJaV2hwWTJ4bElHbGtMQ0IzYUdWbGJDQnBibVJsZUN3Z015Qm1iM0lnY0c5emFYUnBiMjRzSURRZ1ptOXlJSEp2ZEdGMGFXOXVYRzRnSUVOUFRsTlVVa0ZKVGxSU1JWQlBVbFJmU1ZSRlRWTkpXa1VnUFNBMk95QXZMeUJqYjI1emRISmhhVzUwSUdsa0xDQnZabVp6WlhRZ2IySnFaV04wTENCdlptWnpaWFFzSUdGd2NHeHBaV1FnYVcxd2RXeHpaVnh1WEc1amIyNXpkQ0JoWWlBOUlHNWxkeUJCY25KaGVVSjFabVpsY2lneEtUdGNibHh1ZEhKaGJuTm1aWEpoWW14bFRXVnpjMkZuWlNoaFlpd2dXMkZpWFNrN1hHNWpiMjV6ZENCVFZWQlFUMUpVWDFSU1FVNVRSa1ZTUVVKTVJTQTlJQ2hoWWk1aWVYUmxUR1Z1WjNSb0lEMDlQU0F3S1R0Y2JseHVZMjl1YzNRZ1oyVjBVMmhoY0dWR2NtOXRRMkZqYUdVZ1BTQW9ZMkZqYUdWZmEyVjVLU0E5UGlCN1hHNGdJR2xtSUNoZmIySnFaV04wWDNOb1lYQmxjMXRqWVdOb1pWOXJaWGxkSUNFOVBTQjFibVJsWm1sdVpXUXBYRzRnSUNBZ2NtVjBkWEp1SUY5dlltcGxZM1JmYzJoaGNHVnpXMk5oWTJobFgydGxlVjA3WEc1Y2JpQWdjbVYwZFhKdUlHNTFiR3c3WEc1OU8xeHVYRzVqYjI1emRDQnpaWFJUYUdGd1pVTmhZMmhsSUQwZ0tHTmhZMmhsWDJ0bGVTd2djMmhoY0dVcElEMCtJSHRjYmlBZ1gyOWlhbVZqZEY5emFHRndaWE5iWTJGamFHVmZhMlY1WFNBOUlITm9ZWEJsTzF4dWZUdGNibHh1WTI5dWMzUWdZM0psWVhSbFUyaGhjR1VnUFNBb1pHVnpZM0pwY0hScGIyNHBJRDArSUh0Y2JpQWdiR1YwSUhOb1lYQmxPMXh1WEc0Z0lGOTBjbUZ1YzJadmNtMHVjMlYwU1dSbGJuUnBkSGtvS1R0Y2JpQWdjM2RwZEdOb0lDaGtaWE5qY21sd2RHbHZiaTUwZVhCbEtTQjdYRzRnSUNBZ1kyRnpaU0FuWTI5dGNHOTFibVFuT2lCN1hHNGdJQ0FnSUNCemFHRndaU0E5SUc1bGR5QkJiVzF2TG1KMFEyOXRjRzkxYm1SVGFHRndaU2dwTzF4dVhHNGdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQjlYRzRnSUNBZ1kyRnpaU0FuY0d4aGJtVW5PaUI3WEc0Z0lDQWdJQ0JqYjI1emRDQmpZV05vWlY5clpYa2dQU0JnY0d4aGJtVmZKSHRrWlhOamNtbHdkR2x2Ymk1dWIzSnRZV3d1ZUgxZkpIdGtaWE5qY21sd2RHbHZiaTV1YjNKdFlXd3VlWDFmSkh0a1pYTmpjbWx3ZEdsdmJpNXViM0p0WVd3dWVuMWdPMXh1WEc0Z0lDQWdJQ0JwWmlBb0tITm9ZWEJsSUQwZ1oyVjBVMmhoY0dWR2NtOXRRMkZqYUdVb1kyRmphR1ZmYTJWNUtTa2dQVDA5SUc1MWJHd3BJSHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNUzV6WlhSWUtHUmxjMk55YVhCMGFXOXVMbTV2Y20xaGJDNTRLVHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNUzV6WlhSWktHUmxjMk55YVhCMGFXOXVMbTV2Y20xaGJDNTVLVHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNUzV6WlhSYUtHUmxjMk55YVhCMGFXOXVMbTV2Y20xaGJDNTZLVHRjYmlBZ0lDQWdJQ0FnYzJoaGNHVWdQU0J1WlhjZ1FXMXRieTVpZEZOMFlYUnBZMUJzWVc1bFUyaGhjR1VvWDNabFl6TmZNU3dnTUNrN1hHNGdJQ0FnSUNBZ0lITmxkRk5vWVhCbFEyRmphR1VvWTJGamFHVmZhMlY1TENCemFHRndaU2s3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lIMWNiaUFnSUNCallYTmxJQ2RpYjNnbk9pQjdYRzRnSUNBZ0lDQmpiMjV6ZENCallXTm9aVjlyWlhrZ1BTQmdZbTk0WHlSN1pHVnpZM0pwY0hScGIyNHVkMmxrZEdoOVh5UjdaR1Z6WTNKcGNIUnBiMjR1YUdWcFoyaDBmVjhrZTJSbGMyTnlhWEIwYVc5dUxtUmxjSFJvZldBN1hHNWNiaUFnSUNBZ0lHbG1JQ2dvYzJoaGNHVWdQU0JuWlhSVGFHRndaVVp5YjIxRFlXTm9aU2hqWVdOb1pWOXJaWGtwS1NBOVBUMGdiblZzYkNrZ2UxeHVJQ0FnSUNBZ0lDQmZkbVZqTTE4eExuTmxkRmdvWkdWelkzSnBjSFJwYjI0dWQybGtkR2dnTHlBeUtUdGNiaUFnSUNBZ0lDQWdYM1psWXpOZk1TNXpaWFJaS0dSbGMyTnlhWEIwYVc5dUxtaGxhV2RvZENBdklESXBPMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHhMbk5sZEZvb1pHVnpZM0pwY0hScGIyNHVaR1Z3ZEdnZ0x5QXlLVHRjYmlBZ0lDQWdJQ0FnYzJoaGNHVWdQU0J1WlhjZ1FXMXRieTVpZEVKdmVGTm9ZWEJsS0Y5MlpXTXpYekVwTzF4dUlDQWdJQ0FnSUNCelpYUlRhR0Z3WlVOaFkyaGxLR05oWTJobFgydGxlU3dnYzJoaGNHVXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JpY21WaGF6dGNiaUFnSUNCOVhHNGdJQ0FnWTJGelpTQW5jM0JvWlhKbEp6b2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ1kyRmphR1ZmYTJWNUlEMGdZSE53YUdWeVpWOGtlMlJsYzJOeWFYQjBhVzl1TG5KaFpHbDFjMzFnTzF4dVhHNGdJQ0FnSUNCcFppQW9LSE5vWVhCbElEMGdaMlYwVTJoaGNHVkdjbTl0UTJGamFHVW9ZMkZqYUdWZmEyVjVLU2tnUFQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ2MyaGhjR1VnUFNCdVpYY2dRVzF0Ynk1aWRGTndhR1Z5WlZOb1lYQmxLR1JsYzJOeWFYQjBhVzl1TG5KaFpHbDFjeWs3WEc0Z0lDQWdJQ0FnSUhObGRGTm9ZWEJsUTJGamFHVW9ZMkZqYUdWZmEyVjVMQ0J6YUdGd1pTazdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUgxY2JpQWdJQ0JqWVhObElDZGplV3hwYm1SbGNpYzZJSHRjYmlBZ0lDQWdJR052Ym5OMElHTmhZMmhsWDJ0bGVTQTlJR0JqZVd4cGJtUmxjbDhrZTJSbGMyTnlhWEIwYVc5dUxuZHBaSFJvZlY4a2UyUmxjMk55YVhCMGFXOXVMbWhsYVdkb2RIMWZKSHRrWlhOamNtbHdkR2x2Ymk1a1pYQjBhSDFnTzF4dVhHNGdJQ0FnSUNCcFppQW9LSE5vWVhCbElEMGdaMlYwVTJoaGNHVkdjbTl0UTJGamFHVW9ZMkZqYUdWZmEyVjVLU2tnUFQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ1gzWmxZek5mTVM1elpYUllLR1JsYzJOeWFYQjBhVzl1TG5kcFpIUm9JQzhnTWlrN1hHNGdJQ0FnSUNBZ0lGOTJaV016WHpFdWMyVjBXU2hrWlhOamNtbHdkR2x2Ymk1b1pXbG5hSFFnTHlBeUtUdGNiaUFnSUNBZ0lDQWdYM1psWXpOZk1TNXpaWFJhS0dSbGMyTnlhWEIwYVc5dUxtUmxjSFJvSUM4Z01pazdYRzRnSUNBZ0lDQWdJSE5vWVhCbElEMGdibVYzSUVGdGJXOHVZblJEZVd4cGJtUmxjbE5vWVhCbEtGOTJaV016WHpFcE8xeHVJQ0FnSUNBZ0lDQnpaWFJUYUdGd1pVTmhZMmhsS0dOaFkyaGxYMnRsZVN3Z2MyaGhjR1VwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQjlYRzRnSUNBZ1kyRnpaU0FuWTJGd2MzVnNaU2M2SUh0Y2JpQWdJQ0FnSUdOdmJuTjBJR05oWTJobFgydGxlU0E5SUdCallYQnpkV3hsWHlSN1pHVnpZM0pwY0hScGIyNHVjbUZrYVhWemZWOGtlMlJsYzJOeWFYQjBhVzl1TG1obGFXZG9kSDFnTzF4dVhHNGdJQ0FnSUNCcFppQW9LSE5vWVhCbElEMGdaMlYwVTJoaGNHVkdjbTl0UTJGamFHVW9ZMkZqYUdWZmEyVjVLU2tnUFQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ0x5OGdTVzRnUW5Wc2JHVjBMQ0JqWVhCemRXeGxJR2hsYVdkb2RDQmxlR05zZFdSbGN5QjBhR1VnWlc1a0lITndhR1Z5WlhOY2JpQWdJQ0FnSUNBZ2MyaGhjR1VnUFNCdVpYY2dRVzF0Ynk1aWRFTmhjSE4xYkdWVGFHRndaU2hrWlhOamNtbHdkR2x2Ymk1eVlXUnBkWE1zSUdSbGMyTnlhWEIwYVc5dUxtaGxhV2RvZENBdElESWdLaUJrWlhOamNtbHdkR2x2Ymk1eVlXUnBkWE1wTzF4dUlDQWdJQ0FnSUNCelpYUlRhR0Z3WlVOaFkyaGxLR05oWTJobFgydGxlU3dnYzJoaGNHVXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JpY21WaGF6dGNiaUFnSUNCOVhHNGdJQ0FnWTJGelpTQW5ZMjl1WlNjNklIdGNiaUFnSUNBZ0lHTnZibk4wSUdOaFkyaGxYMnRsZVNBOUlHQmpiMjVsWHlSN1pHVnpZM0pwY0hScGIyNHVjbUZrYVhWemZWOGtlMlJsYzJOeWFYQjBhVzl1TG1obGFXZG9kSDFnTzF4dVhHNGdJQ0FnSUNCcFppQW9LSE5vWVhCbElEMGdaMlYwVTJoaGNHVkdjbTl0UTJGamFHVW9ZMkZqYUdWZmEyVjVLU2tnUFQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ2MyaGhjR1VnUFNCdVpYY2dRVzF0Ynk1aWRFTnZibVZUYUdGd1pTaGtaWE5qY21sd2RHbHZiaTV5WVdScGRYTXNJR1JsYzJOeWFYQjBhVzl1TG1obGFXZG9kQ2s3WEc0Z0lDQWdJQ0FnSUhObGRGTm9ZWEJsUTJGamFHVW9ZMkZqYUdWZmEyVjVMQ0J6YUdGd1pTazdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUgxY2JpQWdJQ0JqWVhObElDZGpiMjVqWVhabEp6b2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ2RISnBZVzVuYkdWZmJXVnphQ0E5SUc1bGR5QkJiVzF2TG1KMFZISnBZVzVuYkdWTlpYTm9LQ2s3WEc0Z0lDQWdJQ0JwWmlBb0lXUmxjMk55YVhCMGFXOXVMbVJoZEdFdWJHVnVaM1JvS1NCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ0lDQmpiMjV6ZENCa1lYUmhJRDBnWkdWelkzSnBjSFJwYjI0dVpHRjBZVHRjYmx4dUlDQWdJQ0FnWm05eUlDaHNaWFFnYVNBOUlEQTdJR2tnUENCa1lYUmhMbXhsYm1kMGFDQXZJRGs3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHhMbk5sZEZnb1pHRjBZVnRwSUNvZ09WMHBPMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHhMbk5sZEZrb1pHRjBZVnRwSUNvZ09TQXJJREZkS1R0Y2JpQWdJQ0FnSUNBZ1gzWmxZek5mTVM1elpYUmFLR1JoZEdGYmFTQXFJRGtnS3lBeVhTazdYRzVjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNaTV6WlhSWUtHUmhkR0ZiYVNBcUlEa2dLeUF6WFNrN1hHNGdJQ0FnSUNBZ0lGOTJaV016WHpJdWMyVjBXU2hrWVhSaFcya2dLaUE1SUNzZ05GMHBPMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHlMbk5sZEZvb1pHRjBZVnRwSUNvZ09TQXJJRFZkS1R0Y2JseHVJQ0FnSUNBZ0lDQmZkbVZqTTE4ekxuTmxkRmdvWkdGMFlWdHBJQ29nT1NBcklEWmRLVHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNeTV6WlhSWktHUmhkR0ZiYVNBcUlEa2dLeUEzWFNrN1hHNGdJQ0FnSUNBZ0lGOTJaV016WHpNdWMyVjBXaWhrWVhSaFcya2dLaUE1SUNzZ09GMHBPMXh1WEc0Z0lDQWdJQ0FnSUhSeWFXRnVaMnhsWDIxbGMyZ3VZV1JrVkhKcFlXNW5iR1VvWEc0Z0lDQWdJQ0FnSUNBZ1gzWmxZek5mTVN4Y2JpQWdJQ0FnSUNBZ0lDQmZkbVZqTTE4eUxGeHVJQ0FnSUNBZ0lDQWdJRjkyWldNelh6TXNYRzRnSUNBZ0lDQWdJQ0FnWm1Gc2MyVmNiaUFnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYzJoaGNHVWdQU0J1WlhjZ1FXMXRieTVpZEVKMmFGUnlhV0Z1WjJ4bFRXVnphRk5vWVhCbEtGeHVJQ0FnSUNBZ0lDQjBjbWxoYm1kc1pWOXRaWE5vTEZ4dUlDQWdJQ0FnSUNCMGNuVmxMRnh1SUNBZ0lDQWdJQ0IwY25WbFhHNGdJQ0FnSUNBcE8xeHVYRzRnSUNBZ0lDQmZibTl1WTJGamFHVmtYM05vWVhCbGMxdGtaWE5qY21sd2RHbHZiaTVwWkYwZ1BTQnphR0Z3WlR0Y2JseHVJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdmVnh1SUNBZ0lHTmhjMlVnSjJOdmJuWmxlQ2M2SUh0Y2JpQWdJQ0FnSUhOb1lYQmxJRDBnYm1WM0lFRnRiVzh1WW5SRGIyNTJaWGhJZFd4c1UyaGhjR1VvS1R0Y2JpQWdJQ0FnSUdOdmJuTjBJR1JoZEdFZ1BTQmtaWE5qY21sd2RHbHZiaTVrWVhSaE8xeHVYRzRnSUNBZ0lDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJR1JoZEdFdWJHVnVaM1JvSUM4Z016c2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lGOTJaV016WHpFdWMyVjBXQ2hrWVhSaFcya2dLaUF6SUYwcE8xeHVJQ0FnSUNBZ0lDQmZkbVZqTTE4eExuTmxkRmtvWkdGMFlWdHBJQ29nTXlBcklERmRLVHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNUzV6WlhSYUtHUmhkR0ZiYVNBcUlETWdLeUF5WFNrN1hHNWNiaUFnSUNBZ0lDQWdjMmhoY0dVdVlXUmtVRzlwYm5Rb1gzWmxZek5mTVNrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lGOXViMjVqWVdOb1pXUmZjMmhoY0dWelcyUmxjMk55YVhCMGFXOXVMbWxrWFNBOUlITm9ZWEJsTzF4dVhHNGdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQjlYRzRnSUNBZ1kyRnpaU0FuYUdWcFoyaDBabWxsYkdRbk9pQjdYRzRnSUNBZ0lDQmpiMjV6ZENCNGNIUnpJRDBnWkdWelkzSnBjSFJwYjI0dWVIQjBjeXhjYmlBZ0lDQWdJQ0FnZVhCMGN5QTlJR1JsYzJOeWFYQjBhVzl1TG5sd2RITXNYRzRnSUNBZ0lDQWdJSEJ2YVc1MGN5QTlJR1JsYzJOeWFYQjBhVzl1TG5CdmFXNTBjeXhjYmlBZ0lDQWdJQ0FnY0hSeUlEMGdRVzF0Ynk1ZmJXRnNiRzlqS0RRZ0tpQjRjSFJ6SUNvZ2VYQjBjeWs3WEc1Y2JpQWdJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQXdMQ0J3SUQwZ01Dd2djRElnUFNBd095QnBJRHdnZUhCMGN6c2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElHb2dQU0F3T3lCcUlEd2dlWEIwY3pzZ2Fpc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ1FXMXRieTVJUlVGUVJqTXlXM0IwY2lBcklIQXlJRDQrSURKZElEMGdjRzlwYm5SelczQmRPMXh1WEc0Z0lDQWdJQ0FnSUNBZ2NDc3JPMXh1SUNBZ0lDQWdJQ0FnSUhBeUlDczlJRFE3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2MyaGhjR1VnUFNCdVpYY2dRVzF0Ynk1aWRFaGxhV2RvZEdacFpXeGtWR1Z5Y21GcGJsTm9ZWEJsS0Z4dUlDQWdJQ0FnSUNCa1pYTmpjbWx3ZEdsdmJpNTRjSFJ6TEZ4dUlDQWdJQ0FnSUNCa1pYTmpjbWx3ZEdsdmJpNTVjSFJ6TEZ4dUlDQWdJQ0FnSUNCd2RISXNYRzRnSUNBZ0lDQWdJREVzWEc0Z0lDQWdJQ0FnSUMxa1pYTmpjbWx3ZEdsdmJpNWhZbk5OWVhoSVpXbG5hSFFzWEc0Z0lDQWdJQ0FnSUdSbGMyTnlhWEIwYVc5dUxtRmljMDFoZUVobGFXZG9kQ3hjYmlBZ0lDQWdJQ0FnTVN4Y2JpQWdJQ0FnSUNBZ0oxQklXVjlHVEU5QlZDY3NYRzRnSUNBZ0lDQWdJR1poYkhObFhHNGdJQ0FnSUNBcE8xeHVYRzRnSUNBZ0lDQmZibTl1WTJGamFHVmtYM05vWVhCbGMxdGtaWE5qY21sd2RHbHZiaTVwWkYwZ1BTQnphR0Z3WlR0Y2JpQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lIMWNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnTHk4Z1RtOTBJSEpsWTI5bmJtbDZaV1JjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQnphR0Z3WlR0Y2JuMDdYRzVjYm1OdmJuTjBJR055WldGMFpWTnZablJDYjJSNUlEMGdLR1JsYzJOeWFYQjBhVzl1S1NBOVBpQjdYRzRnSUd4bGRDQmliMlI1TzF4dVhHNGdJR052Ym5OMElITnZablJDYjJSNVNHVnNjR1Z5Y3lBOUlHNWxkeUJCYlcxdkxtSjBVMjltZEVKdlpIbElaV3h3WlhKektDazdYRzVjYmlBZ2MzZHBkR05vSUNoa1pYTmpjbWx3ZEdsdmJpNTBlWEJsS1NCN1hHNGdJQ0FnWTJGelpTQW5jMjltZEZSeWFXMWxjMmduT2lCN1hHNGdJQ0FnSUNCcFppQW9JV1JsYzJOeWFYQjBhVzl1TG1GV1pYSjBhV05sY3k1c1pXNW5kR2dwSUhKbGRIVnliaUJtWVd4elpUdGNibHh1SUNBZ0lDQWdZbTlrZVNBOUlITnZablJDYjJSNVNHVnNjR1Z5Y3k1RGNtVmhkR1ZHY205dFZISnBUV1Z6YUNoY2JpQWdJQ0FnSUNBZ2QyOXliR1F1WjJWMFYyOXliR1JKYm1adktDa3NYRzRnSUNBZ0lDQWdJR1JsYzJOeWFYQjBhVzl1TG1GV1pYSjBhV05sY3l4Y2JpQWdJQ0FnSUNBZ1pHVnpZM0pwY0hScGIyNHVZVWx1WkdsalpYTXNYRzRnSUNBZ0lDQWdJR1JsYzJOeWFYQjBhVzl1TG1GSmJtUnBZMlZ6TG14bGJtZDBhQ0F2SURNc1hHNGdJQ0FnSUNBZ0lHWmhiSE5sWEc0Z0lDQWdJQ0FwTzF4dVhHNGdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQjlYRzRnSUNBZ1kyRnpaU0FuYzI5bWRFTnNiM1JvVFdWemFDYzZJSHRjYmlBZ0lDQWdJR052Ym5OMElHTnlJRDBnWkdWelkzSnBjSFJwYjI0dVkyOXlibVZ5Y3p0Y2JseHVJQ0FnSUNBZ1ltOWtlU0E5SUhOdlpuUkNiMlI1U0dWc2NHVnljeTVEY21WaGRHVlFZWFJqYUNoY2JpQWdJQ0FnSUNBZ2QyOXliR1F1WjJWMFYyOXliR1JKYm1adktDa3NYRzRnSUNBZ0lDQWdJRzVsZHlCQmJXMXZMbUowVm1WamRHOXlNeWhqY2xzd1hTd2dZM0piTVYwc0lHTnlXekpkS1N4Y2JpQWdJQ0FnSUNBZ2JtVjNJRUZ0Ylc4dVluUldaV04wYjNJektHTnlXek5kTENCamNsczBYU3dnWTNKYk5WMHBMRnh1SUNBZ0lDQWdJQ0J1WlhjZ1FXMXRieTVpZEZabFkzUnZjak1vWTNKYk5sMHNJR055V3pkZExDQmpjbHM0WFNrc1hHNGdJQ0FnSUNBZ0lHNWxkeUJCYlcxdkxtSjBWbVZqZEc5eU15aGpjbHM1WFN3Z1kzSmJNVEJkTENCamNsc3hNVjBwTEZ4dUlDQWdJQ0FnSUNCa1pYTmpjbWx3ZEdsdmJpNXpaV2R0Wlc1MGMxc3dYU3hjYmlBZ0lDQWdJQ0FnWkdWelkzSnBjSFJwYjI0dWMyVm5iV1Z1ZEhOYk1WMHNYRzRnSUNBZ0lDQWdJREFzWEc0Z0lDQWdJQ0FnSUhSeWRXVmNiaUFnSUNBZ0lDazdYRzVjYmlBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUgxY2JpQWdJQ0JqWVhObElDZHpiMlowVW05d1pVMWxjMmduT2lCN1hHNGdJQ0FnSUNCamIyNXpkQ0JrWVhSaElEMGdaR1Z6WTNKcGNIUnBiMjR1WkdGMFlUdGNibHh1SUNBZ0lDQWdZbTlrZVNBOUlITnZablJDYjJSNVNHVnNjR1Z5Y3k1RGNtVmhkR1ZTYjNCbEtGeHVJQ0FnSUNBZ0lDQjNiM0pzWkM1blpYUlhiM0pzWkVsdVptOG9LU3hjYmlBZ0lDQWdJQ0FnYm1WM0lFRnRiVzh1WW5SV1pXTjBiM0l6S0dSaGRHRmJNRjBzSUdSaGRHRmJNVjBzSUdSaGRHRmJNbDBwTEZ4dUlDQWdJQ0FnSUNCdVpYY2dRVzF0Ynk1aWRGWmxZM1J2Y2pNb1pHRjBZVnN6WFN3Z1pHRjBZVnMwWFN3Z1pHRjBZVnMxWFNrc1hHNGdJQ0FnSUNBZ0lHUmhkR0ZiTmwwZ0xTQXhMRnh1SUNBZ0lDQWdJQ0F3WEc0Z0lDQWdJQ0FwTzF4dVhHNGdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQjlYRzRnSUNBZ1pHVm1ZWFZzZERwY2JpQWdJQ0FnSUM4dklFNXZkQ0J5WldOdloyNXBlbVZrWEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdZbTlrZVR0Y2JuMDdYRzVjYm5CMVlteHBZMTltZFc1amRHbHZibk11YVc1cGRDQTlJQ2h3WVhKaGJYTWdQU0I3ZlNrZ1BUNGdlMXh1SUNCcFppQW9jR0Z5WVcxekxuZGhjMjFDZFdabVpYSXBJSHRjYmlBZ0lDQnBiWEJ2Y25SVFkzSnBjSFJ6S0hCaGNtRnRjeTVoYlcxdktUdGNibHh1SUNBZ0lITmxiR1l1UVcxdGJ5QTlJR3h2WVdSQmJXMXZSbkp2YlVKcGJtRnllU2h3WVhKaGJYTXVkMkZ6YlVKMVptWmxjaWs3WEc0Z0lDQWdkSEpoYm5ObVpYSmhZbXhsVFdWemMyRm5aU2g3WTIxa09pQW5ZVzF0YjB4dllXUmxaQ2Q5S1R0Y2JpQWdJQ0J3ZFdKc2FXTmZablZ1WTNScGIyNXpMbTFoYTJWWGIzSnNaQ2h3WVhKaGJYTXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR2x0Y0c5eWRGTmpjbWx3ZEhNb2NHRnlZVzF6TG1GdGJXOHBPMXh1SUNBZ0lIUnlZVzV6Wm1WeVlXSnNaVTFsYzNOaFoyVW9lMk50WkRvZ0oyRnRiVzlNYjJGa1pXUW5mU2s3WEc0Z0lDQWdjSFZpYkdsalgyWjFibU4wYVc5dWN5NXRZV3RsVjI5eWJHUW9jR0Z5WVcxektUdGNiaUFnZlZ4dWZWeHVYRzV3ZFdKc2FXTmZablZ1WTNScGIyNXpMbTFoYTJWWGIzSnNaQ0E5SUNod1lYSmhiWE1nUFNCN2ZTa2dQVDRnZTF4dUlDQmZkSEpoYm5ObWIzSnRJRDBnYm1WM0lFRnRiVzh1WW5SVWNtRnVjMlp2Y20wb0tUdGNiaUFnWDNSeVlXNXpabTl5YlY5d2IzTWdQU0J1WlhjZ1FXMXRieTVpZEZSeVlXNXpabTl5YlNncE8xeHVJQ0JmZG1Wak0xOHhJRDBnYm1WM0lFRnRiVzh1WW5SV1pXTjBiM0l6S0RBc0lEQXNJREFwTzF4dUlDQmZkbVZqTTE4eUlEMGdibVYzSUVGdGJXOHVZblJXWldOMGIzSXpLREFzSURBc0lEQXBPMXh1SUNCZmRtVmpNMTh6SUQwZ2JtVjNJRUZ0Ylc4dVluUldaV04wYjNJektEQXNJREFzSURBcE8xeHVJQ0JmY1hWaGRDQTlJRzVsZHlCQmJXMXZMbUowVVhWaGRHVnlibWx2Ymlnd0xDQXdMQ0F3TENBd0tUdGNibHh1SUNCU1JWQlBVbFJmUTBoVlRrdFRTVnBGSUQwZ2NHRnlZVzF6TG5KbGNHOXlkSE5wZW1VZ2ZId2dOVEE3WEc1Y2JpQWdhV1lnS0ZOVlVGQlBVbFJmVkZKQlRsTkdSVkpCUWt4RktTQjdYRzRnSUNBZ0x5OGdWSEpoYm5ObVpYSmhZbXhsSUcxbGMzTmhaMlZ6SUdGeVpTQnpkWEJ3YjNKMFpXUXNJSFJoYTJVZ1lXUjJZVzUwWVdkbElHOW1JSFJvWlcwZ2QybDBhQ0JVZVhCbFpFRnljbUY1YzF4dUlDQWdJSGR2Y214a2NtVndiM0owSUQwZ2JtVjNJRVpzYjJGME16SkJjbkpoZVNneUlDc2dVa1ZRVDFKVVgwTklWVTVMVTBsYVJTQXFJRmRQVWt4RVVrVlFUMUpVWDBsVVJVMVRTVnBGS1RzZ0x5OGdiV1Z6YzJGblpTQnBaQ0FySUNNZ2IyWWdiMkpxWldOMGN5QjBieUJ5WlhCdmNuUWdLeUJqYUhWdWF5QnphWHBsSUNvZ0l5QnZaaUIyWVd4MVpYTWdjR1Z5SUc5aWFtVmpkRnh1SUNBZ0lHTnZiR3hwYzJsdmJuSmxjRzl5ZENBOUlHNWxkeUJHYkc5aGRETXlRWEp5WVhrb01pQXJJRkpGVUU5U1ZGOURTRlZPUzFOSldrVWdLaUJEVDB4TVNWTkpUMDVTUlZCUFVsUmZTVlJGVFZOSldrVXBPeUF2THlCdFpYTnpZV2RsSUdsa0lDc2dJeUJ2WmlCamIyeHNhWE5wYjI1eklIUnZJSEpsY0c5eWRDQXJJR05vZFc1cklITnBlbVVnS2lBaklHOW1JSFpoYkhWbGN5QndaWElnYjJKcVpXTjBYRzRnSUNBZ2RtVm9hV05zWlhKbGNHOXlkQ0E5SUc1bGR5QkdiRzloZERNeVFYSnlZWGtvTWlBcklGSkZVRTlTVkY5RFNGVk9TMU5KV2tVZ0tpQldSVWhKUTB4RlVrVlFUMUpVWDBsVVJVMVRTVnBGS1RzZ0x5OGdiV1Z6YzJGblpTQnBaQ0FySUNNZ2IyWWdkbVZvYVdOc1pYTWdkRzhnY21Wd2IzSjBJQ3NnWTJoMWJtc2djMmw2WlNBcUlDTWdiMllnZG1Gc2RXVnpJSEJsY2lCdlltcGxZM1JjYmlBZ0lDQmpiMjV6ZEhKaGFXNTBjbVZ3YjNKMElEMGdibVYzSUVac2IyRjBNekpCY25KaGVTZ3lJQ3NnVWtWUVQxSlVYME5JVlU1TFUwbGFSU0FxSUVOUFRsTlVVa0ZKVGxSU1JWQlBVbFJmU1ZSRlRWTkpXa1VwT3lBdkx5QnRaWE56WVdkbElHbGtJQ3NnSXlCdlppQmpiMjV6ZEhKaGFXNTBjeUIwYnlCeVpYQnZjblFnS3lCamFIVnVheUJ6YVhwbElDb2dJeUJ2WmlCMllXeDFaWE1nY0dWeUlHOWlhbVZqZEZ4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUM4dklGUnlZVzV6Wm1WeVlXSnNaU0J0WlhOellXZGxjeUJoY21VZ2JtOTBJSE4xY0hCdmNuUmxaQ3dnYzJWdVpDQmtZWFJoSUdGeklHNXZjbTFoYkNCaGNuSmhlWE5jYmlBZ0lDQjNiM0pzWkhKbGNHOXlkQ0E5SUZ0ZE8xeHVJQ0FnSUdOdmJHeHBjMmx2Ym5KbGNHOXlkQ0E5SUZ0ZE8xeHVJQ0FnSUhabGFHbGpiR1Z5WlhCdmNuUWdQU0JiWFR0Y2JpQWdJQ0JqYjI1emRISmhhVzUwY21Wd2IzSjBJRDBnVzEwN1hHNGdJSDFjYmx4dUlDQjNiM0pzWkhKbGNHOXlkRnN3WFNBOUlFMUZVMU5CUjBWZlZGbFFSVk11VjA5U1RFUlNSVkJQVWxRN1hHNGdJR052Ykd4cGMybHZibkpsY0c5eWRGc3dYU0E5SUUxRlUxTkJSMFZmVkZsUVJWTXVRMDlNVEVsVFNVOU9Va1ZRVDFKVU8xeHVJQ0IyWldocFkyeGxjbVZ3YjNKMFd6QmRJRDBnVFVWVFUwRkhSVjlVV1ZCRlV5NVdSVWhKUTB4RlVrVlFUMUpVTzF4dUlDQmpiMjV6ZEhKaGFXNTBjbVZ3YjNKMFd6QmRJRDBnVFVWVFUwRkhSVjlVV1ZCRlV5NURUMDVUVkZKQlNVNVVVa1ZRVDFKVU8xeHVYRzRnSUdOdmJuTjBJR052Ykd4cGMybHZia052Ym1acFozVnlZWFJwYjI0Z1BTQndZWEpoYlhNdWMyOW1kR0p2WkhsY2JpQWdJQ0EvSUc1bGR5QkJiVzF2TG1KMFUyOW1kRUp2WkhsU2FXZHBaRUp2WkhsRGIyeHNhWE5wYjI1RGIyNW1hV2QxY21GMGFXOXVLQ2xjYmlBZ0lDQTZJRzVsZHlCQmJXMXZMbUowUkdWbVlYVnNkRU52Ykd4cGMybHZia052Ym1acFozVnlZWFJwYjI0b0tTeGNiaUFnSUNCa2FYTndZWFJqYUdWeUlEMGdibVYzSUVGdGJXOHVZblJEYjJ4c2FYTnBiMjVFYVhOd1lYUmphR1Z5S0dOdmJHeHBjMmx2YmtOdmJtWnBaM1Z5WVhScGIyNHBMRnh1SUNBZ0lITnZiSFpsY2lBOUlHNWxkeUJCYlcxdkxtSjBVMlZ4ZFdWdWRHbGhiRWx0Y0hWc2MyVkRiMjV6ZEhKaGFXNTBVMjlzZG1WeUtDazdYRzVjYmlBZ2JHVjBJR0p5YjJGa2NHaGhjMlU3WEc1Y2JpQWdhV1lnS0NGd1lYSmhiWE11WW5KdllXUndhR0Z6WlNrZ2NHRnlZVzF6TG1KeWIyRmtjR2hoYzJVZ1BTQjdkSGx3WlRvZ0oyUjVibUZ0YVdNbmZUdGNiaUFnTHk4Z1ZFOUVUeUVoSVZ4dUlDQXZLaUJwWmlBb2NHRnlZVzF6TG1KeWIyRmtjR2hoYzJVdWRIbHdaU0E5UFQwZ0ozTjNaV1Z3Y0hKMWJtVW5LU0I3WEc0Z0lDQWdaWGgwWlc1a0tIQmhjbUZ0Y3k1aWNtOWhaSEJvWVhObExDQjdYRzRnSUNBZ0lDQmhZV0ppYldsdU9pQjdYRzRnSUNBZ0lDQWdJSGc2SUMwMU1DeGNiaUFnSUNBZ0lDQWdlVG9nTFRVd0xGeHVJQ0FnSUNBZ0lDQjZPaUF0TlRCY2JpQWdJQ0FnSUgwc1hHNWNiaUFnSUNBZ0lHRmhZbUp0WVhnNklIdGNiaUFnSUNBZ0lDQWdlRG9nTlRBc1hHNGdJQ0FnSUNBZ0lIazZJRFV3TEZ4dUlDQWdJQ0FnSUNCNk9pQTFNRnh1SUNBZ0lDQWdmU3hjYmlBZ0lDQjlLVHRjYmlBZ2ZTb3ZYRzVjYmlBZ2MzZHBkR05vSUNod1lYSmhiWE11WW5KdllXUndhR0Z6WlM1MGVYQmxLU0I3WEc0Z0lDQWdZMkZ6WlNBbmMzZGxaWEJ3Y25WdVpTYzZYRzRnSUNBZ0lDQmZkbVZqTTE4eExuTmxkRmdvY0dGeVlXMXpMbUp5YjJGa2NHaGhjMlV1WVdGaVltMXBiaTU0S1R0Y2JpQWdJQ0FnSUY5MlpXTXpYekV1YzJWMFdTaHdZWEpoYlhNdVluSnZZV1J3YUdGelpTNWhZV0ppYldsdUxua3BPMXh1SUNBZ0lDQWdYM1psWXpOZk1TNXpaWFJhS0hCaGNtRnRjeTVpY205aFpIQm9ZWE5sTG1GaFltSnRhVzR1ZWlrN1hHNWNiaUFnSUNBZ0lGOTJaV016WHpJdWMyVjBXQ2h3WVhKaGJYTXVZbkp2WVdSd2FHRnpaUzVoWVdKaWJXRjRMbmdwTzF4dUlDQWdJQ0FnWDNabFl6TmZNaTV6WlhSWktIQmhjbUZ0Y3k1aWNtOWhaSEJvWVhObExtRmhZbUp0WVhndWVTazdYRzRnSUNBZ0lDQmZkbVZqTTE4eUxuTmxkRm9vY0dGeVlXMXpMbUp5YjJGa2NHaGhjMlV1WVdGaVltMWhlQzU2S1R0Y2JseHVJQ0FnSUNBZ1luSnZZV1J3YUdGelpTQTlJRzVsZHlCQmJXMXZMbUowUVhocGMxTjNaV1Z3TXloY2JpQWdJQ0FnSUNBZ1gzWmxZek5mTVN4Y2JpQWdJQ0FnSUNBZ1gzWmxZek5mTWx4dUlDQWdJQ0FnS1R0Y2JseHVJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdZMkZ6WlNBblpIbHVZVzFwWXljNlhHNGdJQ0FnWkdWbVlYVnNkRHBjYmlBZ0lDQWdJR0p5YjJGa2NHaGhjMlVnUFNCdVpYY2dRVzF0Ynk1aWRFUmlkblJDY205aFpIQm9ZWE5sS0NrN1hHNGdJQ0FnSUNCaWNtVmhhenRjYmlBZ2ZWeHVYRzRnSUhkdmNteGtJRDBnY0dGeVlXMXpMbk52Wm5SaWIyUjVYRzRnSUNBZ1B5QnVaWGNnUVcxdGJ5NWlkRk52Wm5SU2FXZHBaRVI1Ym1GdGFXTnpWMjl5YkdRb1pHbHpjR0YwWTJobGNpd2dZbkp2WVdSd2FHRnpaU3dnYzI5c2RtVnlMQ0JqYjJ4c2FYTnBiMjVEYjI1bWFXZDFjbUYwYVc5dUxDQnVaWGNnUVcxdGJ5NWlkRVJsWm1GMWJIUlRiMlowUW05a2VWTnZiSFpsY2lncEtWeHVJQ0FnSURvZ2JtVjNJRUZ0Ylc4dVluUkVhWE5qY21WMFpVUjVibUZ0YVdOelYyOXliR1FvWkdsemNHRjBZMmhsY2l3Z1luSnZZV1J3YUdGelpTd2djMjlzZG1WeUxDQmpiMnhzYVhOcGIyNURiMjVtYVdkMWNtRjBhVzl1S1R0Y2JpQWdabWw0WldSVWFXMWxVM1JsY0NBOUlIQmhjbUZ0Y3k1bWFYaGxaRlJwYldWVGRHVndPMXh1WEc0Z0lHbG1JQ2h3WVhKaGJYTXVjMjltZEdKdlpIa3BJRjl6YjJaMFltOWtlVjlsYm1GaWJHVmtJRDBnZEhKMVpUdGNibHh1SUNCMGNtRnVjMlpsY21GaWJHVk5aWE56WVdkbEtIdGpiV1E2SUNkM2IzSnNaRkpsWVdSNUozMHBPMXh1ZlR0Y2JseHVjSFZpYkdsalgyWjFibU4wYVc5dWN5NXpaWFJHYVhobFpGUnBiV1ZUZEdWd0lEMGdLR1JsYzJOeWFYQjBhVzl1S1NBOVBpQjdYRzRnSUdacGVHVmtWR2x0WlZOMFpYQWdQU0JrWlhOamNtbHdkR2x2Ymp0Y2JuMDdYRzVjYm5CMVlteHBZMTltZFc1amRHbHZibk11YzJWMFIzSmhkbWwwZVNBOUlDaGtaWE5qY21sd2RHbHZiaWtnUFQ0Z2UxeHVJQ0JmZG1Wak0xOHhMbk5sZEZnb1pHVnpZM0pwY0hScGIyNHVlQ2s3WEc0Z0lGOTJaV016WHpFdWMyVjBXU2hrWlhOamNtbHdkR2x2Ymk1NUtUdGNiaUFnWDNabFl6TmZNUzV6WlhSYUtHUmxjMk55YVhCMGFXOXVMbm9wTzF4dUlDQjNiM0pzWkM1elpYUkhjbUYyYVhSNUtGOTJaV016WHpFcE8xeHVmVHRjYmx4dWNIVmliR2xqWDJaMWJtTjBhVzl1Y3k1aGNIQmxibVJCYm1Ob2IzSWdQU0FvWkdWelkzSnBjSFJwYjI0cElEMCtJSHRjYmlBZ1gyOWlhbVZqZEhOYlpHVnpZM0pwY0hScGIyNHViMkpxWFZ4dUlDQWdJQzVoY0hCbGJtUkJibU5vYjNJb1hHNGdJQ0FnSUNCa1pYTmpjbWx3ZEdsdmJpNXViMlJsTEZ4dUlDQWdJQ0FnWDI5aWFtVmpkSE5iWkdWelkzSnBjSFJwYjI0dWIySnFNbDBzWEc0Z0lDQWdJQ0JrWlhOamNtbHdkR2x2Ymk1amIyeHNhWE5wYjI1Q1pYUjNaV1Z1VEdsdWEyVmtRbTlrYVdWekxGeHVJQ0FnSUNBZ1pHVnpZM0pwY0hScGIyNHVhVzVtYkhWbGJtTmxYRzRnSUNBZ0tUdGNibjFjYmx4dWNIVmliR2xqWDJaMWJtTjBhVzl1Y3k1aFpHUlBZbXBsWTNRZ1BTQW9aR1Z6WTNKcGNIUnBiMjRwSUQwK0lIdGNiaUFnYkdWMElHSnZaSGtzSUcxdmRHbHZibE4wWVhSbE8xeHVYRzRnSUdsbUlDaGtaWE5qY21sd2RHbHZiaTUwZVhCbExtbHVaR1Y0VDJZb0ozTnZablFuS1NBaFBUMGdMVEVwSUh0Y2JpQWdJQ0JpYjJSNUlEMGdZM0psWVhSbFUyOW1kRUp2Wkhrb1pHVnpZM0pwY0hScGIyNHBPMXh1WEc0Z0lDQWdZMjl1YzNRZ2MySkRiMjVtYVdjZ1BTQmliMlI1TG1kbGRGOXRYMk5tWnlncE8xeHVYRzRnSUNBZ2FXWWdLR1JsYzJOeWFYQjBhVzl1TG5acGRHVnlZWFJwYjI1ektTQnpZa052Ym1acFp5NXpaWFJmZG1sMFpYSmhkR2x2Ym5Nb1pHVnpZM0pwY0hScGIyNHVkbWwwWlhKaGRHbHZibk1wTzF4dUlDQWdJR2xtSUNoa1pYTmpjbWx3ZEdsdmJpNXdhWFJsY21GMGFXOXVjeWtnYzJKRGIyNW1hV2N1YzJWMFgzQnBkR1Z5WVhScGIyNXpLR1JsYzJOeWFYQjBhVzl1TG5CcGRHVnlZWFJwYjI1ektUdGNiaUFnSUNCcFppQW9aR1Z6WTNKcGNIUnBiMjR1WkdsMFpYSmhkR2x2Ym5NcElITmlRMjl1Wm1sbkxuTmxkRjlrYVhSbGNtRjBhVzl1Y3loa1pYTmpjbWx3ZEdsdmJpNWthWFJsY21GMGFXOXVjeWs3WEc0Z0lDQWdhV1lnS0dSbGMyTnlhWEIwYVc5dUxtTnBkR1Z5WVhScGIyNXpLU0J6WWtOdmJtWnBaeTV6WlhSZlkybDBaWEpoZEdsdmJuTW9aR1Z6WTNKcGNIUnBiMjR1WTJsMFpYSmhkR2x2Ym5NcE8xeHVJQ0FnSUhOaVEyOXVabWxuTG5ObGRGOWpiMnhzYVhOcGIyNXpLREI0TVRFcE8xeHVJQ0FnSUhOaVEyOXVabWxuTG5ObGRGOXJSRVlvWkdWelkzSnBjSFJwYjI0dVpuSnBZM1JwYjI0cE8xeHVJQ0FnSUhOaVEyOXVabWxuTG5ObGRGOXJSRkFvWkdWelkzSnBjSFJwYjI0dVpHRnRjR2x1WnlrN1hHNGdJQ0FnYVdZZ0tHUmxjMk55YVhCMGFXOXVMbkJ5WlhOemRYSmxLU0J6WWtOdmJtWnBaeTV6WlhSZmExQlNLR1JsYzJOeWFYQjBhVzl1TG5CeVpYTnpkWEpsS1R0Y2JpQWdJQ0JwWmlBb1pHVnpZM0pwY0hScGIyNHVaSEpoWnlrZ2MySkRiMjVtYVdjdWMyVjBYMnRFUnloa1pYTmpjbWx3ZEdsdmJpNWtjbUZuS1R0Y2JpQWdJQ0JwWmlBb1pHVnpZM0pwY0hScGIyNHViR2xtZENrZ2MySkRiMjVtYVdjdWMyVjBYMnRNUmloa1pYTmpjbWx3ZEdsdmJpNXNhV1owS1R0Y2JpQWdJQ0JwWmlBb1pHVnpZM0pwY0hScGIyNHVZVzVqYUc5eVNHRnlaRzVsYzNNcElITmlRMjl1Wm1sbkxuTmxkRjlyUVVoU0tHUmxjMk55YVhCMGFXOXVMbUZ1WTJodmNraGhjbVJ1WlhOektUdGNiaUFnSUNCcFppQW9aR1Z6WTNKcGNIUnBiMjR1Y21sbmFXUklZWEprYm1WemN5a2djMkpEYjI1bWFXY3VjMlYwWDJ0RFNGSW9aR1Z6WTNKcGNIUnBiMjR1Y21sbmFXUklZWEprYm1WemN5azdYRzVjYmlBZ0lDQnBaaUFvWkdWelkzSnBjSFJwYjI0dWEyeHpkQ2tnWW05a2VTNW5aWFJmYlY5dFlYUmxjbWxoYkhNb0tTNWhkQ2d3S1M1elpYUmZiVjlyVEZOVUtHUmxjMk55YVhCMGFXOXVMbXRzYzNRcE8xeHVJQ0FnSUdsbUlDaGtaWE5qY21sd2RHbHZiaTVyWVhOMEtTQmliMlI1TG1kbGRGOXRYMjFoZEdWeWFXRnNjeWdwTG1GMEtEQXBMbk5sZEY5dFgydEJVMVFvWkdWelkzSnBjSFJwYjI0dWEyRnpkQ2s3WEc0Z0lDQWdhV1lnS0dSbGMyTnlhWEIwYVc5dUxtdDJjM1FwSUdKdlpIa3VaMlYwWDIxZmJXRjBaWEpwWVd4ektDa3VZWFFvTUNrdWMyVjBYMjFmYTFaVFZDaGtaWE5qY21sd2RHbHZiaTVyZG5OMEtUdGNibHh1SUNBZ0lFRnRiVzh1WTJGemRFOWlhbVZqZENoaWIyUjVMQ0JCYlcxdkxtSjBRMjlzYkdsemFXOXVUMkpxWldOMEtTNW5aWFJEYjJ4c2FYTnBiMjVUYUdGd1pTZ3BMbk5sZEUxaGNtZHBiaWhrWlhOamNtbHdkR2x2Ymk1dFlYSm5hVzRnUHlCa1pYTmpjbWx3ZEdsdmJpNXRZWEpuYVc0Z09pQXdMakVwTzF4dUlDQWdJR0p2WkhrdWMyVjBRV04wYVhaaGRHbHZibE4wWVhSbEtHUmxjMk55YVhCMGFXOXVMbk4wWVhSbElIeDhJRFFwTzF4dUlDQWdJR0p2WkhrdWRIbHdaU0E5SURBN0lDOHZJRk52Wm5SQ2IyUjVMbHh1SUNBZ0lHbG1JQ2hrWlhOamNtbHdkR2x2Ymk1MGVYQmxJRDA5UFNBbmMyOW1kRkp2Y0dWTlpYTm9KeWtnWW05a2VTNXliM0JsSUQwZ2RISjFaVHRjYmlBZ0lDQnBaaUFvWkdWelkzSnBjSFJwYjI0dWRIbHdaU0E5UFQwZ0ozTnZablJEYkc5MGFFMWxjMmduS1NCaWIyUjVMbU5zYjNSb0lEMGdkSEoxWlR0Y2JseHVJQ0FnSUY5MGNtRnVjMlp2Y20wdWMyVjBTV1JsYm5ScGRIa29LVHRjYmx4dUlDQWdJRjkyWldNelh6RXVjMlYwV0Noa1pYTmpjbWx3ZEdsdmJpNXdiM05wZEdsdmJpNTRLVHRjYmlBZ0lDQmZkbVZqTTE4eExuTmxkRmtvWkdWelkzSnBjSFJwYjI0dWNHOXphWFJwYjI0dWVTazdYRzRnSUNBZ1gzWmxZek5mTVM1elpYUmFLR1JsYzJOeWFYQjBhVzl1TG5CdmMybDBhVzl1TG5vcE8xeHVJQ0FnSUY5MGNtRnVjMlp2Y20wdWMyVjBUM0pwWjJsdUtGOTJaV016WHpFcE8xeHVYRzRnSUNBZ1gzRjFZWFF1YzJWMFdDaGtaWE5qY21sd2RHbHZiaTV5YjNSaGRHbHZiaTU0S1R0Y2JpQWdJQ0JmY1hWaGRDNXpaWFJaS0dSbGMyTnlhWEIwYVc5dUxuSnZkR0YwYVc5dUxua3BPMXh1SUNBZ0lGOXhkV0YwTG5ObGRGb29aR1Z6WTNKcGNIUnBiMjR1Y205MFlYUnBiMjR1ZWlrN1hHNGdJQ0FnWDNGMVlYUXVjMlYwVnloa1pYTmpjbWx3ZEdsdmJpNXliM1JoZEdsdmJpNTNLVHRjYmlBZ0lDQmZkSEpoYm5ObWIzSnRMbk5sZEZKdmRHRjBhVzl1S0Y5eGRXRjBLVHRjYmx4dUlDQWdJR0p2WkhrdWRISmhibk5tYjNKdEtGOTBjbUZ1YzJadmNtMHBPMXh1WEc0Z0lDQWdZbTlrZVM1elpYUlViM1JoYkUxaGMzTW9aR1Z6WTNKcGNIUnBiMjR1YldGemN5d2dabUZzYzJVcE8xeHVJQ0FnSUhkdmNteGtMbUZrWkZOdlpuUkNiMlI1S0dKdlpIa3NJREVzSUMweEtUdGNiaUFnSUNCcFppQW9aR1Z6WTNKcGNIUnBiMjR1ZEhsd1pTQTlQVDBnSjNOdlpuUlVjbWx0WlhOb0p5a2dYM052Wm5SaWIyUjVYM0psY0c5eWRGOXphWHBsSUNzOUlHSnZaSGt1WjJWMFgyMWZabUZqWlhNb0tTNXphWHBsS0NrZ0tpQXpPMXh1SUNBZ0lHVnNjMlVnWDNOdlpuUmliMlI1WDNKbGNHOXlkRjl6YVhwbElDczlJR0p2WkhrdVoyVjBYMjFmYm05a1pYTW9LUzV6YVhwbEtDa2dLaUF6TzF4dVhHNGdJQ0FnWDI1MWJWOXpiMlowWW05a2VWOXZZbXBsWTNSekt5czdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdiR1YwSUhOb1lYQmxJRDBnWTNKbFlYUmxVMmhoY0dVb1pHVnpZM0pwY0hScGIyNHBPMXh1WEc0Z0lDQWdhV1lnS0NGemFHRndaU2tnY21WMGRYSnVPMXh1WEc0Z0lDQWdMeThnU1dZZ2RHaGxjbVVnWVhKbElHTm9hV3hrY21WdUlIUm9aVzRnZEdocGN5QnBjeUJoSUdOdmJYQnZkVzVrSUhOb1lYQmxYRzRnSUNBZ2FXWWdLR1JsYzJOeWFYQjBhVzl1TG1Ob2FXeGtjbVZ1S1NCN1hHNGdJQ0FnSUNCamIyNXpkQ0JqYjIxd2IzVnVaRjl6YUdGd1pTQTlJRzVsZHlCQmJXMXZMbUowUTI5dGNHOTFibVJUYUdGd1pTZ3BPMXh1SUNBZ0lDQWdZMjl0Y0c5MWJtUmZjMmhoY0dVdVlXUmtRMmhwYkdSVGFHRndaU2hmZEhKaGJuTm1iM0p0TENCemFHRndaU2s3WEc1Y2JpQWdJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z1pHVnpZM0pwY0hScGIyNHVZMmhwYkdSeVpXNHViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWDJOb2FXeGtJRDBnWkdWelkzSnBjSFJwYjI0dVkyaHBiR1J5Wlc1YmFWMDdYRzVjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdkSEpoYm5NZ1BTQnVaWGNnUVcxdGJ5NWlkRlJ5WVc1elptOXliU2dwTzF4dUlDQWdJQ0FnSUNCMGNtRnVjeTV6WlhSSlpHVnVkR2wwZVNncE8xeHVYRzRnSUNBZ0lDQWdJRjkyWldNelh6RXVjMlYwV0NoZlkyaHBiR1F1Y0c5emFYUnBiMjVmYjJabWMyVjBMbmdwTzF4dUlDQWdJQ0FnSUNCZmRtVmpNMTh4TG5ObGRGa29YMk5vYVd4a0xuQnZjMmwwYVc5dVgyOW1abk5sZEM1NUtUdGNiaUFnSUNBZ0lDQWdYM1psWXpOZk1TNXpaWFJhS0Y5amFHbHNaQzV3YjNOcGRHbHZibDl2Wm1aelpYUXVlaWs3WEc0Z0lDQWdJQ0FnSUhSeVlXNXpMbk5sZEU5eWFXZHBiaWhmZG1Wak0xOHhLVHRjYmx4dUlDQWdJQ0FnSUNCZmNYVmhkQzV6WlhSWUtGOWphR2xzWkM1eWIzUmhkR2x2Ymk1NEtUdGNiaUFnSUNBZ0lDQWdYM0YxWVhRdWMyVjBXU2hmWTJocGJHUXVjbTkwWVhScGIyNHVlU2s3WEc0Z0lDQWdJQ0FnSUY5eGRXRjBMbk5sZEZvb1gyTm9hV3hrTG5KdmRHRjBhVzl1TG5vcE8xeHVJQ0FnSUNBZ0lDQmZjWFZoZEM1elpYUlhLRjlqYUdsc1pDNXliM1JoZEdsdmJpNTNLVHRjYmlBZ0lDQWdJQ0FnZEhKaGJuTXVjMlYwVW05MFlYUnBiMjRvWDNGMVlYUXBPMXh1WEc0Z0lDQWdJQ0FnSUhOb1lYQmxJRDBnWTNKbFlYUmxVMmhoY0dVb1pHVnpZM0pwY0hScGIyNHVZMmhwYkdSeVpXNWJhVjBwTzF4dUlDQWdJQ0FnSUNCamIyMXdiM1Z1WkY5emFHRndaUzVoWkdSRGFHbHNaRk5vWVhCbEtIUnlZVzV6TENCemFHRndaU2s3WEc0Z0lDQWdJQ0FnSUVGdGJXOHVaR1Z6ZEhKdmVTaDBjbUZ1Y3lrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lITm9ZWEJsSUQwZ1kyOXRjRzkxYm1SZmMyaGhjR1U3WEc0Z0lDQWdJQ0JmWTI5dGNHOTFibVJmYzJoaGNHVnpXMlJsYzJOeWFYQjBhVzl1TG1sa1hTQTlJSE5vWVhCbE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUY5MlpXTXpYekV1YzJWMFdDaGtaWE5qY21sd2RHbHZiaTV6WTJGc1pTNTRLVHRjYmlBZ0lDQmZkbVZqTTE4eExuTmxkRmtvWkdWelkzSnBjSFJwYjI0dWMyTmhiR1V1ZVNrN1hHNGdJQ0FnWDNabFl6TmZNUzV6WlhSYUtHUmxjMk55YVhCMGFXOXVMbk5qWVd4bExub3BPMXh1WEc0Z0lDQWdjMmhoY0dVdWMyVjBURzlqWVd4VFkyRnNhVzVuS0Y5MlpXTXpYekVwTzF4dVhHNGdJQ0FnWDNabFl6TmZNUzV6WlhSWUtEQXBPMXh1SUNBZ0lGOTJaV016WHpFdWMyVjBXU2d3S1R0Y2JpQWdJQ0JmZG1Wak0xOHhMbk5sZEZvb01DazdYRzRnSUNBZ2MyaGhjR1V1WTJGc1kzVnNZWFJsVEc5allXeEpibVZ5ZEdsaEtHUmxjMk55YVhCMGFXOXVMbTFoYzNNc0lGOTJaV016WHpFcE8xeHVYRzRnSUNBZ1gzUnlZVzV6Wm05eWJTNXpaWFJKWkdWdWRHbDBlU2dwTzF4dVhHNGdJQ0FnWDNabFl6TmZNaTV6WlhSWUtHUmxjMk55YVhCMGFXOXVMbkJ2YzJsMGFXOXVMbmdwTzF4dUlDQWdJRjkyWldNelh6SXVjMlYwV1Noa1pYTmpjbWx3ZEdsdmJpNXdiM05wZEdsdmJpNTVLVHRjYmlBZ0lDQmZkbVZqTTE4eUxuTmxkRm9vWkdWelkzSnBjSFJwYjI0dWNHOXphWFJwYjI0dWVpazdYRzRnSUNBZ1gzUnlZVzV6Wm05eWJTNXpaWFJQY21sbmFXNG9YM1psWXpOZk1pazdYRzVjYmlBZ0lDQmZjWFZoZEM1elpYUllLR1JsYzJOeWFYQjBhVzl1TG5KdmRHRjBhVzl1TG5ncE8xeHVJQ0FnSUY5eGRXRjBMbk5sZEZrb1pHVnpZM0pwY0hScGIyNHVjbTkwWVhScGIyNHVlU2s3WEc0Z0lDQWdYM0YxWVhRdWMyVjBXaWhrWlhOamNtbHdkR2x2Ymk1eWIzUmhkR2x2Ymk1NktUdGNiaUFnSUNCZmNYVmhkQzV6WlhSWEtHUmxjMk55YVhCMGFXOXVMbkp2ZEdGMGFXOXVMbmNwTzF4dUlDQWdJRjkwY21GdWMyWnZjbTB1YzJWMFVtOTBZWFJwYjI0b1gzRjFZWFFwTzF4dVhHNGdJQ0FnYlc5MGFXOXVVM1JoZEdVZ1BTQnVaWGNnUVcxdGJ5NWlkRVJsWm1GMWJIUk5iM1JwYjI1VGRHRjBaU2hmZEhKaGJuTm1iM0p0S1RzZ0x5OGdJMVJQUkU4NklHSjBSR1ZtWVhWc2RFMXZkR2x2YmxOMFlYUmxJSE4xY0hCdmNuUnpJR05sYm5SbGNpQnZaaUJ0WVhOeklHOW1abk5sZENCaGN5QnpaV052Ym1RZ1lYSm5kVzFsYm5RZ0xTQnBiWEJzWlcxbGJuUmNiaUFnSUNCamIyNXpkQ0J5WWtsdVptOGdQU0J1WlhjZ1FXMXRieTVpZEZKcFoybGtRbTlrZVVOdmJuTjBjblZqZEdsdmJrbHVabThvWkdWelkzSnBjSFJwYjI0dWJXRnpjeXdnYlc5MGFXOXVVM1JoZEdVc0lITm9ZWEJsTENCZmRtVmpNMTh4S1R0Y2JseHVJQ0FnSUhKaVNXNW1ieTV6WlhSZmJWOW1jbWxqZEdsdmJpaGtaWE5qY21sd2RHbHZiaTVtY21samRHbHZiaWs3WEc0Z0lDQWdjbUpKYm1adkxuTmxkRjl0WDNKbGMzUnBkSFYwYVc5dUtHUmxjMk55YVhCMGFXOXVMbkpsYzNScGRIVjBhVzl1S1R0Y2JpQWdJQ0J5WWtsdVptOHVjMlYwWDIxZmJHbHVaV0Z5UkdGdGNHbHVaeWhrWlhOamNtbHdkR2x2Ymk1a1lXMXdhVzVuS1R0Y2JpQWdJQ0J5WWtsdVptOHVjMlYwWDIxZllXNW5kV3hoY2tSaGJYQnBibWNvWkdWelkzSnBjSFJwYjI0dVpHRnRjR2x1WnlrN1hHNWNiaUFnSUNCaWIyUjVJRDBnYm1WM0lFRnRiVzh1WW5SU2FXZHBaRUp2Wkhrb2NtSkpibVp2S1R0Y2JpQWdJQ0JCYlcxdkxtTmhjM1JQWW1wbFkzUW9ZbTlrZVN3Z1FXMXRieTVpZEVOdmJHeHBjMmx2Yms5aWFtVmpkQ2t1WjJWMFEyOXNiR2x6YVc5dVUyaGhjR1VvS1M1elpYUk5ZWEpuYVc0b1pHVnpZM0pwY0hScGIyNHViV0Z5WjJsdUlEOGdaR1Z6WTNKcGNIUnBiMjR1YldGeVoybHVJRG9nTUNrN1hHNGdJQ0FnWW05a2VTNXpaWFJCWTNScGRtRjBhVzl1VTNSaGRHVW9aR1Z6WTNKcGNIUnBiMjR1YzNSaGRHVWdmSHdnTkNrN1hHNGdJQ0FnUVcxdGJ5NWtaWE4wY205NUtISmlTVzVtYnlrN1hHNWNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHUmxjMk55YVhCMGFXOXVMbU52Ykd4cGMybHZibDltYkdGbmN5QWhQVDBnSjNWdVpHVm1hVzVsWkNjcElHSnZaSGt1YzJWMFEyOXNiR2x6YVc5dVJteGhaM01vWkdWelkzSnBjSFJwYjI0dVkyOXNiR2x6YVc5dVgyWnNZV2R6S1R0Y2JseHVJQ0FnSUdsbUlDaGtaWE5qY21sd2RHbHZiaTVuY205MWNDQW1KaUJrWlhOamNtbHdkR2x2Ymk1dFlYTnJLU0IzYjNKc1pDNWhaR1JTYVdkcFpFSnZaSGtvWW05a2VTd2daR1Z6WTNKcGNIUnBiMjR1WjNKdmRYQXNJR1JsYzJOeWFYQjBhVzl1TG0xaGMyc3BPMXh1SUNBZ0lHVnNjMlVnZDI5eWJHUXVZV1JrVW1sbmFXUkNiMlI1S0dKdlpIa3BPMXh1SUNBZ0lHSnZaSGt1ZEhsd1pTQTlJREU3SUM4dklGSnBaMmxrUW05a2VTNWNiaUFnSUNCZmJuVnRYM0pwWjJsa1ltOWtlVjl2WW1wbFkzUnpLeXM3WEc0Z0lIMWNibHh1SUNCaWIyUjVMbUZqZEdsMllYUmxLQ2s3WEc1Y2JpQWdZbTlrZVM1cFpDQTlJR1JsYzJOeWFYQjBhVzl1TG1sa08xeHVJQ0JmYjJKcVpXTjBjMXRpYjJSNUxtbGtYU0E5SUdKdlpIazdYRzRnSUY5dGIzUnBiMjVmYzNSaGRHVnpXMkp2WkhrdWFXUmRJRDBnYlc5MGFXOXVVM1JoZEdVN1hHNWNiaUFnWDI5aWFtVmpkSE5mWVcxdGIxdGliMlI1TG1FZ1BUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdKdlpIa3VjSFJ5SURvZ1ltOWtlUzVoWFNBOUlHSnZaSGt1YVdRN1hHNGdJRjl1ZFcxZmIySnFaV04wY3lzck8xeHVYRzRnSUhSeVlXNXpabVZ5WVdKc1pVMWxjM05oWjJVb2UyTnRaRG9nSjI5aWFtVmpkRkpsWVdSNUp5d2djR0Z5WVcxek9pQmliMlI1TG1sa2ZTazdYRzU5TzF4dVhHNXdkV0pzYVdOZlpuVnVZM1JwYjI1ekxtRmtaRlpsYUdsamJHVWdQU0FvWkdWelkzSnBjSFJwYjI0cElEMCtJSHRjYmlBZ1kyOXVjM1FnZG1Wb2FXTnNaVjkwZFc1cGJtY2dQU0J1WlhjZ1FXMXRieTVpZEZabGFHbGpiR1ZVZFc1cGJtY29LVHRjYmx4dUlDQjJaV2hwWTJ4bFgzUjFibWx1Wnk1elpYUmZiVjl6ZFhOd1pXNXphVzl1VTNScFptWnVaWE56S0dSbGMyTnlhWEIwYVc5dUxuTjFjM0JsYm5OcGIyNWZjM1JwWm1adVpYTnpLVHRjYmlBZ2RtVm9hV05zWlY5MGRXNXBibWN1YzJWMFgyMWZjM1Z6Y0dWdWMybHZia052YlhCeVpYTnphVzl1S0dSbGMyTnlhWEIwYVc5dUxuTjFjM0JsYm5OcGIyNWZZMjl0Y0hKbGMzTnBiMjRwTzF4dUlDQjJaV2hwWTJ4bFgzUjFibWx1Wnk1elpYUmZiVjl6ZFhOd1pXNXphVzl1UkdGdGNHbHVaeWhrWlhOamNtbHdkR2x2Ymk1emRYTndaVzV6YVc5dVgyUmhiWEJwYm1jcE8xeHVJQ0IyWldocFkyeGxYM1IxYm1sdVp5NXpaWFJmYlY5dFlYaFRkWE53Wlc1emFXOXVWSEpoZG1Wc1EyMG9aR1Z6WTNKcGNIUnBiMjR1YldGNFgzTjFjM0JsYm5OcGIyNWZkSEpoZG1Wc0tUdGNiaUFnZG1Wb2FXTnNaVjkwZFc1cGJtY3VjMlYwWDIxZmJXRjRVM1Z6Y0dWdWMybHZia1p2Y21ObEtHUmxjMk55YVhCMGFXOXVMbTFoZUY5emRYTndaVzV6YVc5dVgyWnZjbU5sS1R0Y2JseHVJQ0JqYjI1emRDQjJaV2hwWTJ4bElEMGdibVYzSUVGdGJXOHVZblJTWVhsallYTjBWbVZvYVdOc1pTaGNiaUFnSUNCMlpXaHBZMnhsWDNSMWJtbHVaeXhjYmlBZ0lDQmZiMkpxWldOMGMxdGtaWE5qY21sd2RHbHZiaTV5YVdkcFpFSnZaSGxkTEZ4dUlDQWdJRzVsZHlCQmJXMXZMbUowUkdWbVlYVnNkRlpsYUdsamJHVlNZWGxqWVhOMFpYSW9kMjl5YkdRcFhHNGdJQ2s3WEc1Y2JpQWdkbVZvYVdOc1pTNTBkVzVwYm1jZ1BTQjJaV2hwWTJ4bFgzUjFibWx1Wnp0Y2JpQWdYMjlpYW1WamRITmJaR1Z6WTNKcGNIUnBiMjR1Y21sbmFXUkNiMlI1WFM1elpYUkJZM1JwZG1GMGFXOXVVM1JoZEdVb05DazdYRzRnSUhabGFHbGpiR1V1YzJWMFEyOXZjbVJwYm1GMFpWTjVjM1JsYlNnd0xDQXhMQ0F5S1R0Y2JseHVJQ0IzYjNKc1pDNWhaR1JXWldocFkyeGxLSFpsYUdsamJHVXBPMXh1SUNCZmRtVm9hV05zWlhOYlpHVnpZM0pwY0hScGIyNHVhV1JkSUQwZ2RtVm9hV05zWlR0Y2JuMDdYRzV3ZFdKc2FXTmZablZ1WTNScGIyNXpMbkpsYlc5MlpWWmxhR2xqYkdVZ1BTQW9aR1Z6WTNKcGNIUnBiMjRwSUQwK0lIdGNiaUFnWDNabGFHbGpiR1Z6VzJSbGMyTnlhWEIwYVc5dUxtbGtYU0E5SUc1MWJHdzdYRzU5TzF4dVhHNXdkV0pzYVdOZlpuVnVZM1JwYjI1ekxtRmtaRmRvWldWc0lEMGdLR1JsYzJOeWFYQjBhVzl1S1NBOVBpQjdYRzRnSUdsbUlDaGZkbVZvYVdOc1pYTmJaR1Z6WTNKcGNIUnBiMjR1YVdSZElDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0JzWlhRZ2RIVnVhVzVuSUQwZ1gzWmxhR2xqYkdWelcyUmxjMk55YVhCMGFXOXVMbWxrWFM1MGRXNXBibWM3WEc0Z0lDQWdhV1lnS0dSbGMyTnlhWEIwYVc5dUxuUjFibWx1WnlBaFBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0IwZFc1cGJtY2dQU0J1WlhjZ1FXMXRieTVpZEZabGFHbGpiR1ZVZFc1cGJtY29LVHRjYmlBZ0lDQWdJSFIxYm1sdVp5NXpaWFJmYlY5emRYTndaVzV6YVc5dVUzUnBabVp1WlhOektHUmxjMk55YVhCMGFXOXVMblIxYm1sdVp5NXpkWE53Wlc1emFXOXVYM04wYVdabWJtVnpjeWs3WEc0Z0lDQWdJQ0IwZFc1cGJtY3VjMlYwWDIxZmMzVnpjR1Z1YzJsdmJrTnZiWEJ5WlhOemFXOXVLR1JsYzJOeWFYQjBhVzl1TG5SMWJtbHVaeTV6ZFhOd1pXNXphVzl1WDJOdmJYQnlaWE56YVc5dUtUdGNiaUFnSUNBZ0lIUjFibWx1Wnk1elpYUmZiVjl6ZFhOd1pXNXphVzl1UkdGdGNHbHVaeWhrWlhOamNtbHdkR2x2Ymk1MGRXNXBibWN1YzNWemNHVnVjMmx2Ymw5a1lXMXdhVzVuS1R0Y2JpQWdJQ0FnSUhSMWJtbHVaeTV6WlhSZmJWOXRZWGhUZFhOd1pXNXphVzl1VkhKaGRtVnNRMjBvWkdWelkzSnBjSFJwYjI0dWRIVnVhVzVuTG0xaGVGOXpkWE53Wlc1emFXOXVYM1J5WVhabGJDazdYRzRnSUNBZ0lDQjBkVzVwYm1jdWMyVjBYMjFmYldGNFUzVnpjR1Z1YzJsdmJrWnZjbU5sS0dSbGMyTnlhWEIwYVc5dUxuUjFibWx1Wnk1dFlYaGZjM1Z6Y0dWdWMybHZibDltYjNKalpTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1gzWmxZek5mTVM1elpYUllLR1JsYzJOeWFYQjBhVzl1TG1OdmJtNWxZM1JwYjI1ZmNHOXBiblF1ZUNrN1hHNGdJQ0FnWDNabFl6TmZNUzV6WlhSWktHUmxjMk55YVhCMGFXOXVMbU52Ym01bFkzUnBiMjVmY0c5cGJuUXVlU2s3WEc0Z0lDQWdYM1psWXpOZk1TNXpaWFJhS0dSbGMyTnlhWEIwYVc5dUxtTnZibTVsWTNScGIyNWZjRzlwYm5RdWVpazdYRzVjYmlBZ0lDQmZkbVZqTTE4eUxuTmxkRmdvWkdWelkzSnBjSFJwYjI0dWQyaGxaV3hmWkdseVpXTjBhVzl1TG5ncE8xeHVJQ0FnSUY5MlpXTXpYekl1YzJWMFdTaGtaWE5qY21sd2RHbHZiaTUzYUdWbGJGOWthWEpsWTNScGIyNHVlU2s3WEc0Z0lDQWdYM1psWXpOZk1pNXpaWFJhS0dSbGMyTnlhWEIwYVc5dUxuZG9aV1ZzWDJScGNtVmpkR2x2Ymk1NktUdGNibHh1SUNBZ0lGOTJaV016WHpNdWMyVjBXQ2hrWlhOamNtbHdkR2x2Ymk1M2FHVmxiRjloZUd4bExuZ3BPMXh1SUNBZ0lGOTJaV016WHpNdWMyVjBXU2hrWlhOamNtbHdkR2x2Ymk1M2FHVmxiRjloZUd4bExua3BPMXh1SUNBZ0lGOTJaV016WHpNdWMyVjBXaWhrWlhOamNtbHdkR2x2Ymk1M2FHVmxiRjloZUd4bExub3BPMXh1WEc0Z0lDQWdYM1psYUdsamJHVnpXMlJsYzJOeWFYQjBhVzl1TG1sa1hTNWhaR1JYYUdWbGJDaGNiaUFnSUNBZ0lGOTJaV016WHpFc1hHNGdJQ0FnSUNCZmRtVmpNMTh5TEZ4dUlDQWdJQ0FnWDNabFl6TmZNeXhjYmlBZ0lDQWdJR1JsYzJOeWFYQjBhVzl1TG5OMWMzQmxibk5wYjI1ZmNtVnpkRjlzWlc1bmRHZ3NYRzRnSUNBZ0lDQmtaWE5qY21sd2RHbHZiaTUzYUdWbGJGOXlZV1JwZFhNc1hHNGdJQ0FnSUNCMGRXNXBibWNzWEc0Z0lDQWdJQ0JrWlhOamNtbHdkR2x2Ymk1cGMxOW1jbTl1ZEY5M2FHVmxiRnh1SUNBZ0lDazdYRzRnSUgxY2JseHVJQ0JmYm5WdFgzZG9aV1ZzY3lzck8xeHVYRzRnSUdsbUlDaFRWVkJRVDFKVVgxUlNRVTVUUmtWU1FVSk1SU2tnZTF4dUlDQWdJSFpsYUdsamJHVnlaWEJ2Y25RZ1BTQnVaWGNnUm14dllYUXpNa0Z5Y21GNUtERWdLeUJmYm5WdFgzZG9aV1ZzY3lBcUlGWkZTRWxEVEVWU1JWQlBVbFJmU1ZSRlRWTkpXa1VwT3lBdkx5QnRaWE56WVdkbElHbGtJQ1lnS0NBaklHOW1JRzlpYW1WamRITWdkRzhnY21Wd2IzSjBJQ29nSXlCdlppQjJZV3gxWlhNZ2NHVnlJRzlpYW1WamRDQXBYRzRnSUNBZ2RtVm9hV05zWlhKbGNHOXlkRnN3WFNBOUlFMUZVMU5CUjBWZlZGbFFSVk11VmtWSVNVTk1SVkpGVUU5U1ZEdGNiaUFnZlNCbGJITmxJSFpsYUdsamJHVnlaWEJ2Y25RZ1BTQmJUVVZUVTBGSFJWOVVXVkJGVXk1V1JVaEpRMHhGVWtWUVQxSlVYVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVjMlYwVTNSbFpYSnBibWNnUFNBb1pHVjBZV2xzY3lrZ1BUNGdlMXh1SUNCcFppQW9YM1psYUdsamJHVnpXMlJsZEdGcGJITXVhV1JkSUNFOVBTQjFibVJsWm1sdVpXUXBJRjkyWldocFkyeGxjMXRrWlhSaGFXeHpMbWxrWFM1elpYUlRkR1ZsY21sdVoxWmhiSFZsS0dSbGRHRnBiSE11YzNSbFpYSnBibWNzSUdSbGRHRnBiSE11ZDJobFpXd3BPMXh1ZlR0Y2JseHVjSFZpYkdsalgyWjFibU4wYVc5dWN5NXpaWFJDY21GclpTQTlJQ2hrWlhSaGFXeHpLU0E5UGlCN1hHNGdJR2xtSUNoZmRtVm9hV05zWlhOYlpHVjBZV2xzY3k1cFpGMGdJVDA5SUhWdVpHVm1hVzVsWkNrZ1gzWmxhR2xqYkdWelcyUmxkR0ZwYkhNdWFXUmRMbk5sZEVKeVlXdGxLR1JsZEdGcGJITXVZbkpoYTJVc0lHUmxkR0ZwYkhNdWQyaGxaV3dwTzF4dWZUdGNibHh1Y0hWaWJHbGpYMloxYm1OMGFXOXVjeTVoY0hCc2VVVnVaMmx1WlVadmNtTmxJRDBnS0dSbGRHRnBiSE1wSUQwK0lIdGNiaUFnYVdZZ0tGOTJaV2hwWTJ4bGMxdGtaWFJoYVd4ekxtbGtYU0FoUFQwZ2RXNWtaV1pwYm1Wa0tTQmZkbVZvYVdOc1pYTmJaR1YwWVdsc2N5NXBaRjB1WVhCd2JIbEZibWRwYm1WR2IzSmpaU2hrWlhSaGFXeHpMbVp2Y21ObExDQmtaWFJoYVd4ekxuZG9aV1ZzS1R0Y2JuMDdYRzVjYm5CMVlteHBZMTltZFc1amRHbHZibk11Y21WdGIzWmxUMkpxWldOMElEMGdLR1JsZEdGcGJITXBJRDArSUh0Y2JpQWdhV1lnS0Y5dlltcGxZM1J6VzJSbGRHRnBiSE11YVdSZExuUjVjR1VnUFQwOUlEQXBJSHRjYmlBZ0lDQmZiblZ0WDNOdlpuUmliMlI1WDI5aWFtVmpkSE10TFR0Y2JpQWdJQ0JmYzI5bWRHSnZaSGxmY21Wd2IzSjBYM05wZW1VZ0xUMGdYMjlpYW1WamRITmJaR1YwWVdsc2N5NXBaRjB1WjJWMFgyMWZibTlrWlhNb0tTNXphWHBsS0NrN1hHNGdJQ0FnZDI5eWJHUXVjbVZ0YjNabFUyOW1kRUp2Wkhrb1gyOWlhbVZqZEhOYlpHVjBZV2xzY3k1cFpGMHBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tGOXZZbXBsWTNSelcyUmxkR0ZwYkhNdWFXUmRMblI1Y0dVZ1BUMDlJREVwSUh0Y2JpQWdJQ0JmYm5WdFgzSnBaMmxrWW05a2VWOXZZbXBsWTNSekxTMDdYRzRnSUNBZ2QyOXliR1F1Y21WdGIzWmxVbWxuYVdSQ2IyUjVLRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkS1R0Y2JpQWdJQ0JCYlcxdkxtUmxjM1J5YjNrb1gyMXZkR2x2Ymw5emRHRjBaWE5iWkdWMFlXbHNjeTVwWkYwcE8xeHVJQ0I5WEc1Y2JpQWdRVzF0Ynk1a1pYTjBjbTk1S0Y5dlltcGxZM1J6VzJSbGRHRnBiSE11YVdSZEtUdGNiaUFnYVdZZ0tGOWpiMjF3YjNWdVpGOXphR0Z3WlhOYlpHVjBZV2xzY3k1cFpGMHBJRUZ0Ylc4dVpHVnpkSEp2ZVNoZlkyOXRjRzkxYm1SZmMyaGhjR1Z6VzJSbGRHRnBiSE11YVdSZEtUdGNiaUFnYVdZZ0tGOXViMjVqWVdOb1pXUmZjMmhoY0dWelcyUmxkR0ZwYkhNdWFXUmRLU0JCYlcxdkxtUmxjM1J5YjNrb1gyNXZibU5oWTJobFpGOXphR0Z3WlhOYlpHVjBZV2xzY3k1cFpGMHBPMXh1WEc0Z0lGOXZZbXBsWTNSelgyRnRiVzliWDI5aWFtVmpkSE5iWkdWMFlXbHNjeTVwWkYwdVlTQTlQVDBnZFc1a1pXWnBibVZrSUQ4Z1gyOWlhbVZqZEhOYlpHVjBZV2xzY3k1cFpGMHVZU0E2SUY5dlltcGxZM1J6VzJSbGRHRnBiSE11YVdSZExuQjBjbDBnUFNCdWRXeHNPMXh1SUNCZmIySnFaV04wYzF0a1pYUmhhV3h6TG1sa1hTQTlJRzUxYkd3N1hHNGdJRjl0YjNScGIyNWZjM1JoZEdWelcyUmxkR0ZwYkhNdWFXUmRJRDBnYm5Wc2JEdGNibHh1SUNCcFppQW9YMk52YlhCdmRXNWtYM05vWVhCbGMxdGtaWFJoYVd4ekxtbGtYU2tnWDJOdmJYQnZkVzVrWDNOb1lYQmxjMXRrWlhSaGFXeHpMbWxrWFNBOUlHNTFiR3c3WEc0Z0lHbG1JQ2hmYm05dVkyRmphR1ZrWDNOb1lYQmxjMXRrWlhSaGFXeHpMbWxrWFNrZ1gyNXZibU5oWTJobFpGOXphR0Z3WlhOYlpHVjBZV2xzY3k1cFpGMGdQU0J1ZFd4c08xeHVJQ0JmYm5WdFgyOWlhbVZqZEhNdExUdGNibjA3WEc1Y2JuQjFZbXhwWTE5bWRXNWpkR2x2Ym5NdWRYQmtZWFJsVkhKaGJuTm1iM0p0SUQwZ0tHUmxkR0ZwYkhNcElEMCtJSHRjYmlBZ1gyOWlhbVZqZENBOUlGOXZZbXBsWTNSelcyUmxkR0ZwYkhNdWFXUmRPMXh1WEc0Z0lHbG1JQ2hmYjJKcVpXTjBMblI1Y0dVZ1BUMDlJREVwSUh0Y2JpQWdJQ0JmYjJKcVpXTjBMbWRsZEUxdmRHbHZibE4wWVhSbEtDa3VaMlYwVjI5eWJHUlVjbUZ1YzJadmNtMG9YM1J5WVc1elptOXliU2s3WEc1Y2JpQWdJQ0JwWmlBb1pHVjBZV2xzY3k1d2IzTXBJSHRjYmlBZ0lDQWdJRjkyWldNelh6RXVjMlYwV0Noa1pYUmhhV3h6TG5CdmN5NTRLVHRjYmlBZ0lDQWdJRjkyWldNelh6RXVjMlYwV1Noa1pYUmhhV3h6TG5CdmN5NTVLVHRjYmlBZ0lDQWdJRjkyWldNelh6RXVjMlYwV2loa1pYUmhhV3h6TG5CdmN5NTZLVHRjYmlBZ0lDQWdJRjkwY21GdWMyWnZjbTB1YzJWMFQzSnBaMmx1S0Y5MlpXTXpYekVwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNoa1pYUmhhV3h6TG5GMVlYUXBJSHRjYmlBZ0lDQWdJRjl4ZFdGMExuTmxkRmdvWkdWMFlXbHNjeTV4ZFdGMExuZ3BPMXh1SUNBZ0lDQWdYM0YxWVhRdWMyVjBXU2hrWlhSaGFXeHpMbkYxWVhRdWVTazdYRzRnSUNBZ0lDQmZjWFZoZEM1elpYUmFLR1JsZEdGcGJITXVjWFZoZEM1NktUdGNiaUFnSUNBZ0lGOXhkV0YwTG5ObGRGY29aR1YwWVdsc2N5NXhkV0YwTG5jcE8xeHVJQ0FnSUNBZ1gzUnlZVzV6Wm05eWJTNXpaWFJTYjNSaGRHbHZiaWhmY1hWaGRDazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1gyOWlhbVZqZEM1elpYUlhiM0pzWkZSeVlXNXpabTl5YlNoZmRISmhibk5tYjNKdEtUdGNiaUFnSUNCZmIySnFaV04wTG1GamRHbDJZWFJsS0NrN1hHNGdJSDBnWld4elpTQnBaaUFvWDI5aWFtVmpkQzUwZVhCbElEMDlQU0F3S1NCN1hHNGdJQ0FnTHk4Z1gyOWlhbVZqZEM1blpYUlhiM0pzWkZSeVlXNXpabTl5YlNoZmRISmhibk5tYjNKdEtUdGNibHh1SUNBZ0lHbG1JQ2hrWlhSaGFXeHpMbkJ2Y3lrZ2UxeHVJQ0FnSUNBZ1gzWmxZek5mTVM1elpYUllLR1JsZEdGcGJITXVjRzl6TG5ncE8xeHVJQ0FnSUNBZ1gzWmxZek5mTVM1elpYUlpLR1JsZEdGcGJITXVjRzl6TG5rcE8xeHVJQ0FnSUNBZ1gzWmxZek5mTVM1elpYUmFLR1JsZEdGcGJITXVjRzl6TG5vcE8xeHVJQ0FnSUNBZ1gzUnlZVzV6Wm05eWJTNXpaWFJQY21sbmFXNG9YM1psWXpOZk1TazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR1JsZEdGcGJITXVjWFZoZENrZ2UxeHVJQ0FnSUNBZ1gzRjFZWFF1YzJWMFdDaGtaWFJoYVd4ekxuRjFZWFF1ZUNrN1hHNGdJQ0FnSUNCZmNYVmhkQzV6WlhSWktHUmxkR0ZwYkhNdWNYVmhkQzU1S1R0Y2JpQWdJQ0FnSUY5eGRXRjBMbk5sZEZvb1pHVjBZV2xzY3k1eGRXRjBMbm9wTzF4dUlDQWdJQ0FnWDNGMVlYUXVjMlYwVnloa1pYUmhhV3h6TG5GMVlYUXVkeWs3WEc0Z0lDQWdJQ0JmZEhKaGJuTm1iM0p0TG5ObGRGSnZkR0YwYVc5dUtGOXhkV0YwS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JmYjJKcVpXTjBMblJ5WVc1elptOXliU2hmZEhKaGJuTm1iM0p0S1R0Y2JpQWdmVnh1ZlR0Y2JseHVjSFZpYkdsalgyWjFibU4wYVc5dWN5NTFjR1JoZEdWTllYTnpJRDBnS0dSbGRHRnBiSE1wSUQwK0lIdGNiaUFnTHk4Z0kxUlBSRTg2SUdOb1lXNW5hVzVuSUdFZ2MzUmhkR2xqSUc5aWFtVmpkQ0JwYm5SdklHUjVibUZ0YVdNZ2FYTWdZblZuWjNsY2JpQWdYMjlpYW1WamRDQTlJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTzF4dVhHNGdJQzh2SUZCbGNpQm9kSFJ3T2k4dmQzZDNMbUoxYkd4bGRIQm9lWE5wWTNNdWIzSm5MMEoxYkd4bGRDOXdhSEJDUWpNdmRtbGxkM1J2Y0dsakxuQm9jRDl3UFNabVBUa21kRDB6TmpZekkzQXhNemd4Tmx4dUlDQjNiM0pzWkM1eVpXMXZkbVZTYVdkcFpFSnZaSGtvWDI5aWFtVmpkQ2s3WEc1Y2JpQWdYM1psWXpOZk1TNXpaWFJZS0RBcE8xeHVJQ0JmZG1Wak0xOHhMbk5sZEZrb01DazdYRzRnSUY5MlpXTXpYekV1YzJWMFdpZ3dLVHRjYmx4dUlDQmZiMkpxWldOMExuTmxkRTFoYzNOUWNtOXdjeWhrWlhSaGFXeHpMbTFoYzNNc0lGOTJaV016WHpFcE8xeHVJQ0IzYjNKc1pDNWhaR1JTYVdkcFpFSnZaSGtvWDI5aWFtVmpkQ2s3WEc0Z0lGOXZZbXBsWTNRdVlXTjBhWFpoZEdVb0tUdGNibjA3WEc1Y2JuQjFZbXhwWTE5bWRXNWpkR2x2Ym5NdVlYQndiSGxEWlc1MGNtRnNTVzF3ZFd4elpTQTlJQ2hrWlhSaGFXeHpLU0E5UGlCN1hHNGdJRjkyWldNelh6RXVjMlYwV0Noa1pYUmhhV3h6TG5ncE8xeHVJQ0JmZG1Wak0xOHhMbk5sZEZrb1pHVjBZV2xzY3k1NUtUdGNiaUFnWDNabFl6TmZNUzV6WlhSYUtHUmxkR0ZwYkhNdWVpazdYRzVjYmlBZ1gyOWlhbVZqZEhOYlpHVjBZV2xzY3k1cFpGMHVZWEJ3YkhsRFpXNTBjbUZzU1cxd2RXeHpaU2hmZG1Wak0xOHhLVHRjYmlBZ1gyOWlhbVZqZEhOYlpHVjBZV2xzY3k1cFpGMHVZV04wYVhaaGRHVW9LVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVZWEJ3YkhsSmJYQjFiSE5sSUQwZ0tHUmxkR0ZwYkhNcElEMCtJSHRjYmlBZ1gzWmxZek5mTVM1elpYUllLR1JsZEdGcGJITXVhVzF3ZFd4elpWOTRLVHRjYmlBZ1gzWmxZek5mTVM1elpYUlpLR1JsZEdGcGJITXVhVzF3ZFd4elpWOTVLVHRjYmlBZ1gzWmxZek5mTVM1elpYUmFLR1JsZEdGcGJITXVhVzF3ZFd4elpWOTZLVHRjYmx4dUlDQmZkbVZqTTE4eUxuTmxkRmdvWkdWMFlXbHNjeTU0S1R0Y2JpQWdYM1psWXpOZk1pNXpaWFJaS0dSbGRHRnBiSE11ZVNrN1hHNGdJRjkyWldNelh6SXVjMlYwV2loa1pYUmhhV3h6TG5vcE8xeHVYRzRnSUY5dlltcGxZM1J6VzJSbGRHRnBiSE11YVdSZExtRndjR3g1U1cxd2RXeHpaU2hjYmlBZ0lDQmZkbVZqTTE4eExGeHVJQ0FnSUY5MlpXTXpYekpjYmlBZ0tUdGNiaUFnWDI5aWFtVmpkSE5iWkdWMFlXbHNjeTVwWkYwdVlXTjBhWFpoZEdVb0tUdGNibjA3WEc1Y2JuQjFZbXhwWTE5bWRXNWpkR2x2Ym5NdVlYQndiSGxVYjNKeGRXVWdQU0FvWkdWMFlXbHNjeWtnUFQ0Z2UxeHVJQ0JmZG1Wak0xOHhMbk5sZEZnb1pHVjBZV2xzY3k1MGIzSnhkV1ZmZUNrN1hHNGdJRjkyWldNelh6RXVjMlYwV1Noa1pYUmhhV3h6TG5SdmNuRjFaVjk1S1R0Y2JpQWdYM1psWXpOZk1TNXpaWFJhS0dSbGRHRnBiSE11ZEc5eWNYVmxYM29wTzF4dVhHNGdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTG1Gd2NHeDVWRzl5Y1hWbEtGeHVJQ0FnSUY5MlpXTXpYekZjYmlBZ0tUdGNiaUFnWDI5aWFtVmpkSE5iWkdWMFlXbHNjeTVwWkYwdVlXTjBhWFpoZEdVb0tUdGNibjA3WEc1Y2JuQjFZbXhwWTE5bWRXNWpkR2x2Ym5NdVlYQndiSGxEWlc1MGNtRnNSbTl5WTJVZ1BTQW9aR1YwWVdsc2N5a2dQVDRnZTF4dUlDQmZkbVZqTTE4eExuTmxkRmdvWkdWMFlXbHNjeTU0S1R0Y2JpQWdYM1psWXpOZk1TNXpaWFJaS0dSbGRHRnBiSE11ZVNrN1hHNGdJRjkyWldNelh6RXVjMlYwV2loa1pYUmhhV3h6TG5vcE8xeHVYRzRnSUY5dlltcGxZM1J6VzJSbGRHRnBiSE11YVdSZExtRndjR3g1UTJWdWRISmhiRVp2Y21ObEtGOTJaV016WHpFcE8xeHVJQ0JmYjJKcVpXTjBjMXRrWlhSaGFXeHpMbWxrWFM1aFkzUnBkbUYwWlNncE8xeHVmVHRjYmx4dWNIVmliR2xqWDJaMWJtTjBhVzl1Y3k1aGNIQnNlVVp2Y21ObElEMGdLR1JsZEdGcGJITXBJRDArSUh0Y2JpQWdYM1psWXpOZk1TNXpaWFJZS0dSbGRHRnBiSE11Wm05eVkyVmZlQ2s3WEc0Z0lGOTJaV016WHpFdWMyVjBXU2hrWlhSaGFXeHpMbVp2Y21ObFgza3BPMXh1SUNCZmRtVmpNMTh4TG5ObGRGb29aR1YwWVdsc2N5NW1iM0pqWlY5NktUdGNibHh1SUNCZmRtVmpNMTh5TG5ObGRGZ29aR1YwWVdsc2N5NTRLVHRjYmlBZ1gzWmxZek5mTWk1elpYUlpLR1JsZEdGcGJITXVlU2s3WEc0Z0lGOTJaV016WHpJdWMyVjBXaWhrWlhSaGFXeHpMbm9wTzF4dVhHNGdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTG1Gd2NHeDVSbTl5WTJVb1hHNGdJQ0FnWDNabFl6TmZNU3hjYmlBZ0lDQmZkbVZqTTE4eVhHNGdJQ2s3WEc0Z0lGOXZZbXBsWTNSelcyUmxkR0ZwYkhNdWFXUmRMbUZqZEdsMllYUmxLQ2s3WEc1OU8xeHVYRzV3ZFdKc2FXTmZablZ1WTNScGIyNXpMbTl1VTJsdGRXeGhkR2x2YmxKbGMzVnRaU0E5SUNncElEMCtJSHRjYmlBZ2JHRnpkRjl6YVcxMWJHRjBhVzl1WDNScGJXVWdQU0JFWVhSbExtNXZkeWdwTzF4dWZUdGNibHh1Y0hWaWJHbGpYMloxYm1OMGFXOXVjeTV6WlhSQmJtZDFiR0Z5Vm1Wc2IyTnBkSGtnUFNBb1pHVjBZV2xzY3lrZ1BUNGdlMXh1SUNCZmRtVmpNMTh4TG5ObGRGZ29aR1YwWVdsc2N5NTRLVHRjYmlBZ1gzWmxZek5mTVM1elpYUlpLR1JsZEdGcGJITXVlU2s3WEc0Z0lGOTJaV016WHpFdWMyVjBXaWhrWlhSaGFXeHpMbm9wTzF4dVhHNGdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTG5ObGRFRnVaM1ZzWVhKV1pXeHZZMmwwZVNoY2JpQWdJQ0JmZG1Wak0xOHhYRzRnSUNrN1hHNGdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTG1GamRHbDJZWFJsS0NrN1hHNTlPMXh1WEc1d2RXSnNhV05mWm5WdVkzUnBiMjV6TG5ObGRFeHBibVZoY2xabGJHOWphWFI1SUQwZ0tHUmxkR0ZwYkhNcElEMCtJSHRjYmlBZ1gzWmxZek5mTVM1elpYUllLR1JsZEdGcGJITXVlQ2s3WEc0Z0lGOTJaV016WHpFdWMyVjBXU2hrWlhSaGFXeHpMbmtwTzF4dUlDQmZkbVZqTTE4eExuTmxkRm9vWkdWMFlXbHNjeTU2S1R0Y2JseHVJQ0JmYjJKcVpXTjBjMXRrWlhSaGFXeHpMbWxrWFM1elpYUk1hVzVsWVhKV1pXeHZZMmwwZVNoY2JpQWdJQ0JmZG1Wak0xOHhYRzRnSUNrN1hHNGdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTG1GamRHbDJZWFJsS0NrN1hHNTlPMXh1WEc1d2RXSnNhV05mWm5WdVkzUnBiMjV6TG5ObGRFRnVaM1ZzWVhKR1lXTjBiM0lnUFNBb1pHVjBZV2xzY3lrZ1BUNGdlMXh1SUNCZmRtVmpNMTh4TG5ObGRGZ29aR1YwWVdsc2N5NTRLVHRjYmlBZ1gzWmxZek5mTVM1elpYUlpLR1JsZEdGcGJITXVlU2s3WEc0Z0lGOTJaV016WHpFdWMyVjBXaWhrWlhSaGFXeHpMbm9wTzF4dVhHNGdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTG5ObGRFRnVaM1ZzWVhKR1lXTjBiM0lvWEc0Z0lDQWdJQ0JmZG1Wak0xOHhYRzRnSUNrN1hHNTlPMXh1WEc1d2RXSnNhV05mWm5WdVkzUnBiMjV6TG5ObGRFeHBibVZoY2taaFkzUnZjaUE5SUNoa1pYUmhhV3h6S1NBOVBpQjdYRzRnSUY5MlpXTXpYekV1YzJWMFdDaGtaWFJoYVd4ekxuZ3BPMXh1SUNCZmRtVmpNMTh4TG5ObGRGa29aR1YwWVdsc2N5NTVLVHRjYmlBZ1gzWmxZek5mTVM1elpYUmFLR1JsZEdGcGJITXVlaWs3WEc1Y2JpQWdYMjlpYW1WamRITmJaR1YwWVdsc2N5NXBaRjB1YzJWMFRHbHVaV0Z5Um1GamRHOXlLRnh1SUNBZ0lGOTJaV016WHpGY2JpQWdLVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVjMlYwUkdGdGNHbHVaeUE5SUNoa1pYUmhhV3h6S1NBOVBpQjdYRzRnSUY5dlltcGxZM1J6VzJSbGRHRnBiSE11YVdSZExuTmxkRVJoYlhCcGJtY29aR1YwWVdsc2N5NXNhVzVsWVhJc0lHUmxkR0ZwYkhNdVlXNW5kV3hoY2lrN1hHNTlPMXh1WEc1d2RXSnNhV05mWm5WdVkzUnBiMjV6TG5ObGRFTmpaRTF2ZEdsdmJsUm9jbVZ6YUc5c1pDQTlJQ2hrWlhSaGFXeHpLU0E5UGlCN1hHNGdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXVhV1JkTG5ObGRFTmpaRTF2ZEdsdmJsUm9jbVZ6YUc5c1pDaGtaWFJoYVd4ekxuUm9jbVZ6YUc5c1pDazdYRzU5TzF4dVhHNXdkV0pzYVdOZlpuVnVZM1JwYjI1ekxuTmxkRU5qWkZOM1pYQjBVM0JvWlhKbFVtRmthWFZ6SUQwZ0tHUmxkR0ZwYkhNcElEMCtJSHRjYmlBZ1gyOWlhbVZqZEhOYlpHVjBZV2xzY3k1cFpGMHVjMlYwUTJOa1UzZGxjSFJUY0dobGNtVlNZV1JwZFhNb1pHVjBZV2xzY3k1eVlXUnBkWE1wTzF4dWZUdGNibHh1Y0hWaWJHbGpYMloxYm1OMGFXOXVjeTVoWkdSRGIyNXpkSEpoYVc1MElEMGdLR1JsZEdGcGJITXBJRDArSUh0Y2JpQWdiR1YwSUdOdmJuTjBjbUZwYm5RN1hHNWNiaUFnYzNkcGRHTm9JQ2hrWlhSaGFXeHpMblI1Y0dVcElIdGNibHh1SUNBZ0lHTmhjMlVnSjNCdmFXNTBKem9nZTF4dUlDQWdJQ0FnYVdZZ0tHUmxkR0ZwYkhNdWIySnFaV04wWWlBOVBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0FnSUY5MlpXTXpYekV1YzJWMFdDaGtaWFJoYVd4ekxuQnZjMmwwYVc5dVlTNTRLVHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNUzV6WlhSWktHUmxkR0ZwYkhNdWNHOXphWFJwYjI1aExua3BPMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHhMbk5sZEZvb1pHVjBZV2xzY3k1d2IzTnBkR2x2Ym1FdWVpazdYRzVjYmlBZ0lDQWdJQ0FnWTI5dWMzUnlZV2x1ZENBOUlHNWxkeUJCYlcxdkxtSjBVRzlwYm5ReVVHOXBiblJEYjI1emRISmhhVzUwS0Z4dUlDQWdJQ0FnSUNBZ0lGOXZZbXBsWTNSelcyUmxkR0ZwYkhNdWIySnFaV04wWVYwc1hHNGdJQ0FnSUNBZ0lDQWdYM1psWXpOZk1WeHVJQ0FnSUNBZ0lDQXBPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdYM1psWXpOZk1TNXpaWFJZS0dSbGRHRnBiSE11Y0c5emFYUnBiMjVoTG5ncE8xeHVJQ0FnSUNBZ0lDQmZkbVZqTTE4eExuTmxkRmtvWkdWMFlXbHNjeTV3YjNOcGRHbHZibUV1ZVNrN1hHNGdJQ0FnSUNBZ0lGOTJaV016WHpFdWMyVjBXaWhrWlhSaGFXeHpMbkJ2YzJsMGFXOXVZUzU2S1R0Y2JseHVJQ0FnSUNBZ0lDQmZkbVZqTTE4eUxuTmxkRmdvWkdWMFlXbHNjeTV3YjNOcGRHbHZibUl1ZUNrN1hHNGdJQ0FnSUNBZ0lGOTJaV016WHpJdWMyVjBXU2hrWlhSaGFXeHpMbkJ2YzJsMGFXOXVZaTU1S1R0Y2JpQWdJQ0FnSUNBZ1gzWmxZek5mTWk1elpYUmFLR1JsZEdGcGJITXVjRzl6YVhScGIyNWlMbm9wTzF4dVhHNGdJQ0FnSUNBZ0lHTnZibk4wY21GcGJuUWdQU0J1WlhjZ1FXMXRieTVpZEZCdmFXNTBNbEJ2YVc1MFEyOXVjM1J5WVdsdWRDaGNiaUFnSUNBZ0lDQWdJQ0JmYjJKcVpXTjBjMXRrWlhSaGFXeHpMbTlpYW1WamRHRmRMRnh1SUNBZ0lDQWdJQ0FnSUY5dlltcGxZM1J6VzJSbGRHRnBiSE11YjJKcVpXTjBZbDBzWEc0Z0lDQWdJQ0FnSUNBZ1gzWmxZek5mTVN4Y2JpQWdJQ0FnSUNBZ0lDQmZkbVZqTTE4eVhHNGdJQ0FnSUNBZ0lDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQmljbVZoYXp0Y2JpQWdJQ0I5WEc0Z0lDQWdZMkZ6WlNBbmFHbHVaMlVuT2lCN1hHNGdJQ0FnSUNCcFppQW9aR1YwWVdsc2N5NXZZbXBsWTNSaUlEMDlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ1gzWmxZek5mTVM1elpYUllLR1JsZEdGcGJITXVjRzl6YVhScGIyNWhMbmdwTzF4dUlDQWdJQ0FnSUNCZmRtVmpNMTh4TG5ObGRGa29aR1YwWVdsc2N5NXdiM05wZEdsdmJtRXVlU2s3WEc0Z0lDQWdJQ0FnSUY5MlpXTXpYekV1YzJWMFdpaGtaWFJoYVd4ekxuQnZjMmwwYVc5dVlTNTZLVHRjYmx4dUlDQWdJQ0FnSUNCZmRtVmpNMTh5TG5ObGRGZ29aR1YwWVdsc2N5NWhlR2x6TG5ncE8xeHVJQ0FnSUNBZ0lDQmZkbVZqTTE4eUxuTmxkRmtvWkdWMFlXbHNjeTVoZUdsekxua3BPMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHlMbk5sZEZvb1pHVjBZV2xzY3k1aGVHbHpMbm9wTzF4dVhHNGdJQ0FnSUNBZ0lHTnZibk4wY21GcGJuUWdQU0J1WlhjZ1FXMXRieTVpZEVocGJtZGxRMjl1YzNSeVlXbHVkQ2hjYmlBZ0lDQWdJQ0FnSUNCZmIySnFaV04wYzF0a1pYUmhhV3h6TG05aWFtVmpkR0ZkTEZ4dUlDQWdJQ0FnSUNBZ0lGOTJaV016WHpFc1hHNGdJQ0FnSUNBZ0lDQWdYM1psWXpOZk1seHVJQ0FnSUNBZ0lDQXBPMXh1WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHhMbk5sZEZnb1pHVjBZV2xzY3k1d2IzTnBkR2x2Ym1FdWVDazdYRzRnSUNBZ0lDQWdJRjkyWldNelh6RXVjMlYwV1Noa1pYUmhhV3h6TG5CdmMybDBhVzl1WVM1NUtUdGNiaUFnSUNBZ0lDQWdYM1psWXpOZk1TNXpaWFJhS0dSbGRHRnBiSE11Y0c5emFYUnBiMjVoTG5vcE8xeHVYRzRnSUNBZ0lDQWdJRjkyWldNelh6SXVjMlYwV0Noa1pYUmhhV3h6TG5CdmMybDBhVzl1WWk1NEtUdGNiaUFnSUNBZ0lDQWdYM1psWXpOZk1pNXpaWFJaS0dSbGRHRnBiSE11Y0c5emFYUnBiMjVpTG5rcE8xeHVJQ0FnSUNBZ0lDQmZkbVZqTTE4eUxuTmxkRm9vWkdWMFlXbHNjeTV3YjNOcGRHbHZibUl1ZWlrN1hHNWNiaUFnSUNBZ0lDQWdYM1psWXpOZk15NXpaWFJZS0dSbGRHRnBiSE11WVhocGN5NTRLVHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNeTV6WlhSWktHUmxkR0ZwYkhNdVlYaHBjeTU1S1R0Y2JpQWdJQ0FnSUNBZ1gzWmxZek5mTXk1elpYUmFLR1JsZEdGcGJITXVZWGhwY3k1NktUdGNibHh1SUNBZ0lDQWdJQ0JqYjI1emRISmhhVzUwSUQwZ2JtVjNJRUZ0Ylc4dVluUklhVzVuWlVOdmJuTjBjbUZwYm5Rb1hHNGdJQ0FnSUNBZ0lDQWdYMjlpYW1WamRITmJaR1YwWVdsc2N5NXZZbXBsWTNSaFhTeGNiaUFnSUNBZ0lDQWdJQ0JmYjJKcVpXTjBjMXRrWlhSaGFXeHpMbTlpYW1WamRHSmRMRnh1SUNBZ0lDQWdJQ0FnSUY5MlpXTXpYekVzWEc0Z0lDQWdJQ0FnSUNBZ1gzWmxZek5mTWl4Y2JpQWdJQ0FnSUNBZ0lDQmZkbVZqTTE4ekxGeHVJQ0FnSUNBZ0lDQWdJRjkyWldNelh6TmNiaUFnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUgxY2JpQWdJQ0JqWVhObElDZHpiR2xrWlhJbk9pQjdYRzRnSUNBZ0lDQnNaWFFnZEhKaGJuTm1iM0p0WWp0Y2JpQWdJQ0FnSUdOdmJuTjBJSFJ5WVc1elptOXliV0VnUFNCdVpYY2dRVzF0Ynk1aWRGUnlZVzV6Wm05eWJTZ3BPMXh1WEc0Z0lDQWdJQ0JmZG1Wak0xOHhMbk5sZEZnb1pHVjBZV2xzY3k1d2IzTnBkR2x2Ym1FdWVDazdYRzRnSUNBZ0lDQmZkbVZqTTE4eExuTmxkRmtvWkdWMFlXbHNjeTV3YjNOcGRHbHZibUV1ZVNrN1hHNGdJQ0FnSUNCZmRtVmpNMTh4TG5ObGRGb29aR1YwWVdsc2N5NXdiM05wZEdsdmJtRXVlaWs3WEc1Y2JpQWdJQ0FnSUhSeVlXNXpabTl5YldFdWMyVjBUM0pwWjJsdUtGOTJaV016WHpFcE8xeHVYRzRnSUNBZ0lDQnNaWFFnY205MFlYUnBiMjRnUFNCMGNtRnVjMlp2Y20xaExtZGxkRkp2ZEdGMGFXOXVLQ2s3WEc0Z0lDQWdJQ0J5YjNSaGRHbHZiaTV6WlhSRmRXeGxjaWhrWlhSaGFXeHpMbUY0YVhNdWVDd2daR1YwWVdsc2N5NWhlR2x6TG5rc0lHUmxkR0ZwYkhNdVlYaHBjeTU2S1R0Y2JpQWdJQ0FnSUhSeVlXNXpabTl5YldFdWMyVjBVbTkwWVhScGIyNG9jbTkwWVhScGIyNHBPMXh1WEc0Z0lDQWdJQ0JwWmlBb1pHVjBZV2xzY3k1dlltcGxZM1JpS1NCN1hHNGdJQ0FnSUNBZ0lIUnlZVzV6Wm05eWJXSWdQU0J1WlhjZ1FXMXRieTVpZEZSeVlXNXpabTl5YlNncE8xeHVYRzRnSUNBZ0lDQWdJRjkyWldNelh6SXVjMlYwV0Noa1pYUmhhV3h6TG5CdmMybDBhVzl1WWk1NEtUdGNiaUFnSUNBZ0lDQWdYM1psWXpOZk1pNXpaWFJaS0dSbGRHRnBiSE11Y0c5emFYUnBiMjVpTG5rcE8xeHVJQ0FnSUNBZ0lDQmZkbVZqTTE4eUxuTmxkRm9vWkdWMFlXbHNjeTV3YjNOcGRHbHZibUl1ZWlrN1hHNWNiaUFnSUNBZ0lDQWdkSEpoYm5ObWIzSnRZaTV6WlhSUGNtbG5hVzRvWDNabFl6TmZNaWs3WEc1Y2JpQWdJQ0FnSUNBZ2NtOTBZWFJwYjI0Z1BTQjBjbUZ1YzJadmNtMWlMbWRsZEZKdmRHRjBhVzl1S0NrN1hHNGdJQ0FnSUNBZ0lISnZkR0YwYVc5dUxuTmxkRVYxYkdWeUtHUmxkR0ZwYkhNdVlYaHBjeTU0TENCa1pYUmhhV3h6TG1GNGFYTXVlU3dnWkdWMFlXbHNjeTVoZUdsekxub3BPMXh1SUNBZ0lDQWdJQ0IwY21GdWMyWnZjbTFpTG5ObGRGSnZkR0YwYVc5dUtISnZkR0YwYVc5dUtUdGNibHh1SUNBZ0lDQWdJQ0JqYjI1emRISmhhVzUwSUQwZ2JtVjNJRUZ0Ylc4dVluUlRiR2xrWlhKRGIyNXpkSEpoYVc1MEtGeHVJQ0FnSUNBZ0lDQWdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXViMkpxWldOMFlWMHNYRzRnSUNBZ0lDQWdJQ0FnWDI5aWFtVmpkSE5iWkdWMFlXbHNjeTV2WW1wbFkzUmlYU3hjYmlBZ0lDQWdJQ0FnSUNCMGNtRnVjMlp2Y20xaExGeHVJQ0FnSUNBZ0lDQWdJSFJ5WVc1elptOXliV0lzWEc0Z0lDQWdJQ0FnSUNBZ2RISjFaVnh1SUNBZ0lDQWdJQ0FwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUnlZV2x1ZENBOUlHNWxkeUJCYlcxdkxtSjBVMnhwWkdWeVEyOXVjM1J5WVdsdWRDaGNiaUFnSUNBZ0lDQWdJQ0JmYjJKcVpXTjBjMXRrWlhSaGFXeHpMbTlpYW1WamRHRmRMRnh1SUNBZ0lDQWdJQ0FnSUhSeVlXNXpabTl5YldFc1hHNGdJQ0FnSUNBZ0lDQWdkSEoxWlZ4dUlDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQmpiMjV6ZEhKaGFXNTBMblJoSUQwZ2RISmhibk5tYjNKdFlUdGNiaUFnSUNBZ0lHTnZibk4wY21GcGJuUXVkR0lnUFNCMGNtRnVjMlp2Y20xaU8xeHVYRzRnSUNBZ0lDQkJiVzF2TG1SbGMzUnliM2tvZEhKaGJuTm1iM0p0WVNrN1hHNGdJQ0FnSUNCcFppQW9kSEpoYm5ObWIzSnRZaUFoUFQwZ2RXNWtaV1pwYm1Wa0tTQkJiVzF2TG1SbGMzUnliM2tvZEhKaGJuTm1iM0p0WWlrN1hHNWNiaUFnSUNBZ0lHSnlaV0ZyTzF4dUlDQWdJSDFjYmlBZ0lDQmpZWE5sSUNkamIyNWxkSGRwYzNRbk9pQjdYRzRnSUNBZ0lDQmpiMjV6ZENCMGNtRnVjMlp2Y20xaElEMGdibVYzSUVGdGJXOHVZblJVY21GdWMyWnZjbTBvS1R0Y2JpQWdJQ0FnSUhSeVlXNXpabTl5YldFdWMyVjBTV1JsYm5ScGRIa29LVHRjYmx4dUlDQWdJQ0FnWTI5dWMzUWdkSEpoYm5ObWIzSnRZaUE5SUc1bGR5QkJiVzF2TG1KMFZISmhibk5tYjNKdEtDazdYRzRnSUNBZ0lDQjBjbUZ1YzJadmNtMWlMbk5sZEVsa1pXNTBhWFI1S0NrN1hHNWNiaUFnSUNBZ0lGOTJaV016WHpFdWMyVjBXQ2hrWlhSaGFXeHpMbkJ2YzJsMGFXOXVZUzU0S1R0Y2JpQWdJQ0FnSUY5MlpXTXpYekV1YzJWMFdTaGtaWFJoYVd4ekxuQnZjMmwwYVc5dVlTNTVLVHRjYmlBZ0lDQWdJRjkyWldNelh6RXVjMlYwV2loa1pYUmhhV3h6TG5CdmMybDBhVzl1WVM1NktUdGNibHh1SUNBZ0lDQWdYM1psWXpOZk1pNXpaWFJZS0dSbGRHRnBiSE11Y0c5emFYUnBiMjVpTG5ncE8xeHVJQ0FnSUNBZ1gzWmxZek5mTWk1elpYUlpLR1JsZEdGcGJITXVjRzl6YVhScGIyNWlMbmtwTzF4dUlDQWdJQ0FnWDNabFl6TmZNaTV6WlhSYUtHUmxkR0ZwYkhNdWNHOXphWFJwYjI1aUxub3BPMXh1WEc0Z0lDQWdJQ0IwY21GdWMyWnZjbTFoTG5ObGRFOXlhV2RwYmloZmRtVmpNMTh4S1R0Y2JpQWdJQ0FnSUhSeVlXNXpabTl5YldJdWMyVjBUM0pwWjJsdUtGOTJaV016WHpJcE8xeHVYRzRnSUNBZ0lDQnNaWFFnY205MFlYUnBiMjRnUFNCMGNtRnVjMlp2Y20xaExtZGxkRkp2ZEdGMGFXOXVLQ2s3WEc0Z0lDQWdJQ0J5YjNSaGRHbHZiaTV6WlhSRmRXeGxjbHBaV0NndFpHVjBZV2xzY3k1aGVHbHpZUzU2TENBdFpHVjBZV2xzY3k1aGVHbHpZUzU1TENBdFpHVjBZV2xzY3k1aGVHbHpZUzU0S1R0Y2JpQWdJQ0FnSUhSeVlXNXpabTl5YldFdWMyVjBVbTkwWVhScGIyNG9jbTkwWVhScGIyNHBPMXh1WEc0Z0lDQWdJQ0J5YjNSaGRHbHZiaUE5SUhSeVlXNXpabTl5YldJdVoyVjBVbTkwWVhScGIyNG9LVHRjYmlBZ0lDQWdJSEp2ZEdGMGFXOXVMbk5sZEVWMWJHVnlXbGxZS0Mxa1pYUmhhV3h6TG1GNGFYTmlMbm9zSUMxa1pYUmhhV3h6TG1GNGFYTmlMbmtzSUMxa1pYUmhhV3h6TG1GNGFYTmlMbmdwTzF4dUlDQWdJQ0FnZEhKaGJuTm1iM0p0WWk1elpYUlNiM1JoZEdsdmJpaHliM1JoZEdsdmJpazdYRzVjYmlBZ0lDQWdJR052Ym5OMGNtRnBiblFnUFNCdVpYY2dRVzF0Ynk1aWRFTnZibVZVZDJsemRFTnZibk4wY21GcGJuUW9YRzRnSUNBZ0lDQWdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXViMkpxWldOMFlWMHNYRzRnSUNBZ0lDQWdJRjl2WW1wbFkzUnpXMlJsZEdGcGJITXViMkpxWldOMFlsMHNYRzRnSUNBZ0lDQWdJSFJ5WVc1elptOXliV0VzWEc0Z0lDQWdJQ0FnSUhSeVlXNXpabTl5YldKY2JpQWdJQ0FnSUNrN1hHNWNiaUFnSUNBZ0lHTnZibk4wY21GcGJuUXVjMlYwVEdsdGFYUW9UV0YwYUM1UVNTd2dNQ3dnVFdGMGFDNVFTU2s3WEc1Y2JpQWdJQ0FnSUdOdmJuTjBjbUZwYm5RdWRHRWdQU0IwY21GdWMyWnZjbTFoTzF4dUlDQWdJQ0FnWTI5dWMzUnlZV2x1ZEM1MFlpQTlJSFJ5WVc1elptOXliV0k3WEc1Y2JpQWdJQ0FnSUVGdGJXOHVaR1Z6ZEhKdmVTaDBjbUZ1YzJadmNtMWhLVHRjYmlBZ0lDQWdJRUZ0Ylc4dVpHVnpkSEp2ZVNoMGNtRnVjMlp2Y20xaUtUdGNibHh1SUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnZlZ4dUlDQWdJR05oYzJVZ0oyUnZaaWM2SUh0Y2JpQWdJQ0FnSUd4bGRDQjBjbUZ1YzJadmNtMWlPMXh1WEc0Z0lDQWdJQ0JqYjI1emRDQjBjbUZ1YzJadmNtMWhJRDBnYm1WM0lFRnRiVzh1WW5SVWNtRnVjMlp2Y20wb0tUdGNiaUFnSUNBZ0lIUnlZVzV6Wm05eWJXRXVjMlYwU1dSbGJuUnBkSGtvS1R0Y2JseHVJQ0FnSUNBZ1gzWmxZek5mTVM1elpYUllLR1JsZEdGcGJITXVjRzl6YVhScGIyNWhMbmdwTzF4dUlDQWdJQ0FnWDNabFl6TmZNUzV6WlhSWktHUmxkR0ZwYkhNdWNHOXphWFJwYjI1aExua3BPMXh1SUNBZ0lDQWdYM1psWXpOZk1TNXpaWFJhS0dSbGRHRnBiSE11Y0c5emFYUnBiMjVoTG5vcE8xeHVYRzRnSUNBZ0lDQjBjbUZ1YzJadmNtMWhMbk5sZEU5eWFXZHBiaWhmZG1Wak0xOHhLVHRjYmx4dUlDQWdJQ0FnYkdWMElISnZkR0YwYVc5dUlEMGdkSEpoYm5ObWIzSnRZUzVuWlhSU2IzUmhkR2x2YmlncE8xeHVJQ0FnSUNBZ2NtOTBZWFJwYjI0dWMyVjBSWFZzWlhKYVdWZ29MV1JsZEdGcGJITXVZWGhwYzJFdWVpd2dMV1JsZEdGcGJITXVZWGhwYzJFdWVTd2dMV1JsZEdGcGJITXVZWGhwYzJFdWVDazdYRzRnSUNBZ0lDQjBjbUZ1YzJadmNtMWhMbk5sZEZKdmRHRjBhVzl1S0hKdmRHRjBhVzl1S1R0Y2JseHVJQ0FnSUNBZ2FXWWdLR1JsZEdGcGJITXViMkpxWldOMFlpa2dlMXh1SUNBZ0lDQWdJQ0IwY21GdWMyWnZjbTFpSUQwZ2JtVjNJRUZ0Ylc4dVluUlVjbUZ1YzJadmNtMG9LVHRjYmlBZ0lDQWdJQ0FnZEhKaGJuTm1iM0p0WWk1elpYUkpaR1Z1ZEdsMGVTZ3BPMXh1WEc0Z0lDQWdJQ0FnSUY5MlpXTXpYekl1YzJWMFdDaGtaWFJoYVd4ekxuQnZjMmwwYVc5dVlpNTRLVHRjYmlBZ0lDQWdJQ0FnWDNabFl6TmZNaTV6WlhSWktHUmxkR0ZwYkhNdWNHOXphWFJwYjI1aUxua3BPMXh1SUNBZ0lDQWdJQ0JmZG1Wak0xOHlMbk5sZEZvb1pHVjBZV2xzY3k1d2IzTnBkR2x2Ym1JdWVpazdYRzVjYmlBZ0lDQWdJQ0FnZEhKaGJuTm1iM0p0WWk1elpYUlBjbWxuYVc0b1gzWmxZek5mTWlrN1hHNWNiaUFnSUNBZ0lDQWdjbTkwWVhScGIyNGdQU0IwY21GdWMyWnZjbTFpTG1kbGRGSnZkR0YwYVc5dUtDazdYRzRnSUNBZ0lDQWdJSEp2ZEdGMGFXOXVMbk5sZEVWMWJHVnlXbGxZS0Mxa1pYUmhhV3h6TG1GNGFYTmlMbm9zSUMxa1pYUmhhV3h6TG1GNGFYTmlMbmtzSUMxa1pYUmhhV3h6TG1GNGFYTmlMbmdwTzF4dUlDQWdJQ0FnSUNCMGNtRnVjMlp2Y20xaUxuTmxkRkp2ZEdGMGFXOXVLSEp2ZEdGMGFXOXVLVHRjYmx4dUlDQWdJQ0FnSUNCamIyNXpkSEpoYVc1MElEMGdibVYzSUVGdGJXOHVZblJIWlc1bGNtbGpOa1J2WmtOdmJuTjBjbUZwYm5Rb1hHNGdJQ0FnSUNBZ0lDQWdYMjlpYW1WamRITmJaR1YwWVdsc2N5NXZZbXBsWTNSaFhTeGNiaUFnSUNBZ0lDQWdJQ0JmYjJKcVpXTjBjMXRrWlhSaGFXeHpMbTlpYW1WamRHSmRMRnh1SUNBZ0lDQWdJQ0FnSUhSeVlXNXpabTl5YldFc1hHNGdJQ0FnSUNBZ0lDQWdkSEpoYm5ObWIzSnRZaXhjYmlBZ0lDQWdJQ0FnSUNCMGNuVmxYRzRnSUNBZ0lDQWdJQ2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0JqYjI1emRISmhhVzUwSUQwZ2JtVjNJRUZ0Ylc4dVluUkhaVzVsY21sak5rUnZaa052Ym5OMGNtRnBiblFvWEc0Z0lDQWdJQ0FnSUNBZ1gyOWlhbVZqZEhOYlpHVjBZV2xzY3k1dlltcGxZM1JoWFN4Y2JpQWdJQ0FnSUNBZ0lDQjBjbUZ1YzJadmNtMWhMRnh1SUNBZ0lDQWdJQ0FnSUhSeWRXVmNiaUFnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnWTI5dWMzUnlZV2x1ZEM1MFlTQTlJSFJ5WVc1elptOXliV0U3WEc0Z0lDQWdJQ0JqYjI1emRISmhhVzUwTG5SaUlEMGdkSEpoYm5ObWIzSnRZanRjYmx4dUlDQWdJQ0FnUVcxdGJ5NWtaWE4wY205NUtIUnlZVzV6Wm05eWJXRXBPMXh1SUNBZ0lDQWdhV1lnS0hSeVlXNXpabTl5YldJZ0lUMDlJSFZ1WkdWbWFXNWxaQ2tnUVcxdGJ5NWtaWE4wY205NUtIUnlZVzV6Wm05eWJXSXBPMXh1WEc0Z0lDQWdJQ0JpY21WaGF6dGNiaUFnSUNCOVhHNGdJQ0FnWkdWbVlYVnNkRHBjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dVhHNGdJSGR2Y214a0xtRmtaRU52Ym5OMGNtRnBiblFvWTI5dWMzUnlZV2x1ZENrN1hHNWNiaUFnWTI5dWMzUnlZV2x1ZEM1aElEMGdYMjlpYW1WamRITmJaR1YwWVdsc2N5NXZZbXBsWTNSaFhUdGNiaUFnWTI5dWMzUnlZV2x1ZEM1aUlEMGdYMjlpYW1WamRITmJaR1YwWVdsc2N5NXZZbXBsWTNSaVhUdGNibHh1SUNCamIyNXpkSEpoYVc1MExtVnVZV0pzWlVabFpXUmlZV05yS0NrN1hHNGdJRjlqYjI1emRISmhhVzUwYzF0a1pYUmhhV3h6TG1sa1hTQTlJR052Ym5OMGNtRnBiblE3WEc0Z0lGOXVkVzFmWTI5dWMzUnlZV2x1ZEhNckt6dGNibHh1SUNCcFppQW9VMVZRVUU5U1ZGOVVVa0ZPVTBaRlVrRkNURVVwSUh0Y2JpQWdJQ0JqYjI1emRISmhhVzUwY21Wd2IzSjBJRDBnYm1WM0lFWnNiMkYwTXpKQmNuSmhlU2d4SUNzZ1gyNTFiVjlqYjI1emRISmhhVzUwY3lBcUlFTlBUbE5VVWtGSlRsUlNSVkJQVWxSZlNWUkZUVk5KV2tVcE95QXZMeUJ0WlhOellXZGxJR2xrSUNZZ0tDQWpJRzltSUc5aWFtVmpkSE1nZEc4Z2NtVndiM0owSUNvZ0l5QnZaaUIyWVd4MVpYTWdjR1Z5SUc5aWFtVmpkQ0FwWEc0Z0lDQWdZMjl1YzNSeVlXbHVkSEpsY0c5eWRGc3dYU0E5SUUxRlUxTkJSMFZmVkZsUVJWTXVRMDlPVTFSU1FVbE9WRkpGVUU5U1ZEdGNiaUFnZlNCbGJITmxJR052Ym5OMGNtRnBiblJ5WlhCdmNuUWdQU0JiVFVWVFUwRkhSVjlVV1ZCRlV5NURUMDVUVkZKQlNVNVVVa1ZRVDFKVVhUdGNibjA3WEc1Y2JuQjFZbXhwWTE5bWRXNWpkR2x2Ym5NdWNtVnRiM1psUTI5dWMzUnlZV2x1ZENBOUlDaGtaWFJoYVd4ektTQTlQaUI3WEc0Z0lHTnZibk4wSUdOdmJuTjBjbUZwYm5RZ1BTQmZZMjl1YzNSeVlXbHVkSE5iWkdWMFlXbHNjeTVwWkYwN1hHNWNiaUFnYVdZZ0tHTnZibk4wY21GcGJuUWdJVDA5SUhWdVpHVm1hVzVsWkNrZ2UxeHVJQ0FnSUhkdmNteGtMbkpsYlc5MlpVTnZibk4wY21GcGJuUW9ZMjl1YzNSeVlXbHVkQ2s3WEc0Z0lDQWdYMk52Ym5OMGNtRnBiblJ6VzJSbGRHRnBiSE11YVdSZElEMGdiblZzYkR0Y2JpQWdJQ0JmYm5WdFgyTnZibk4wY21GcGJuUnpMUzA3WEc0Z0lIMWNibjA3WEc1Y2JuQjFZbXhwWTE5bWRXNWpkR2x2Ym5NdVkyOXVjM1J5WVdsdWRGOXpaWFJDY21WaGEybHVaMGx0Y0hWc2MyVlVhSEpsYzJodmJHUWdQU0FvWkdWMFlXbHNjeWtnUFQ0Z2UxeHVJQ0JqYjI1emRDQmpiMjV6ZEhKaGFXNTBJRDBnWDJOdmJuTjBjbUZwYm5SelcyUmxkR0ZwYkhNdWFXUmRPMXh1SUNCcFppQW9ZMjl1YzNSeVlXbHVkQ0FoUFQwZ2RXNWtaV1pwYm1RcElHTnZibk4wY21GcGJuUXVjMlYwUW5KbFlXdHBibWRKYlhCMWJITmxWR2h5WlhOb2IyeGtLR1JsZEdGcGJITXVkR2h5WlhOb2IyeGtLVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVjMmx0ZFd4aGRHVWdQU0FvY0dGeVlXMXpJRDBnZTMwcElEMCtJSHRjYmlBZ2FXWWdLSGR2Y214a0tTQjdYRzRnSUNBZ2FXWWdLSEJoY21GdGN5NTBhVzFsVTNSbGNDQW1KaUJ3WVhKaGJYTXVkR2x0WlZOMFpYQWdQQ0JtYVhobFpGUnBiV1ZUZEdWd0tWeHVJQ0FnSUNBZ2NHRnlZVzF6TG5ScGJXVlRkR1Z3SUQwZ1ptbDRaV1JVYVcxbFUzUmxjRHRjYmx4dUlDQWdJSEJoY21GdGN5NXRZWGhUZFdKVGRHVndjeUE5SUhCaGNtRnRjeTV0WVhoVGRXSlRkR1Z3Y3lCOGZDQk5ZWFJvTG1ObGFXd29jR0Z5WVcxekxuUnBiV1ZUZEdWd0lDOGdabWw0WldSVWFXMWxVM1JsY0NrN0lDOHZJRWxtSUcxaGVGTjFZbE4wWlhCeklHbHpJRzV2ZENCa1pXWnBibVZrTENCclpXVndJSFJvWlNCemFXMTFiR0YwYVc5dUlHWjFiR3g1SUhWd0lIUnZJR1JoZEdWY2JseHVJQ0FnSUhkdmNteGtMbk4wWlhCVGFXMTFiR0YwYVc5dUtIQmhjbUZ0Y3k1MGFXMWxVM1JsY0N3Z2NHRnlZVzF6TG0xaGVGTjFZbE4wWlhCekxDQm1hWGhsWkZScGJXVlRkR1Z3S1R0Y2JseHVJQ0FnSUdsbUlDaGZkbVZvYVdOc1pYTXViR1Z1WjNSb0lENGdNQ2tnY21Wd2IzSjBWbVZvYVdOc1pYTW9LVHRjYmlBZ0lDQnlaWEJ2Y25SRGIyeHNhWE5wYjI1ektDazdYRzRnSUNBZ2FXWWdLRjlqYjI1emRISmhhVzUwY3k1c1pXNW5kR2dnUGlBd0tTQnlaWEJ2Y25SRGIyNXpkSEpoYVc1MGN5Z3BPMXh1SUNBZ0lISmxjRzl5ZEZkdmNteGtLQ2s3WEc0Z0lDQWdhV1lnS0Y5emIyWjBZbTlrZVY5bGJtRmliR1ZrS1NCeVpYQnZjblJYYjNKc1pGOXpiMlowWW05a2FXVnpLQ2s3WEc0Z0lIMWNibjA3WEc1Y2JpOHZJRU52Ym5OMGNtRnBiblFnWm5WdVkzUnBiMjV6WEc1d2RXSnNhV05mWm5WdVkzUnBiMjV6TG1ocGJtZGxYM05sZEV4cGJXbDBjeUE5SUNod1lYSmhiWE1wSUQwK0lIdGNiaUFnWDJOdmJuTjBjbUZwYm5SelczQmhjbUZ0Y3k1amIyNXpkSEpoYVc1MFhTNXpaWFJNYVcxcGRDaHdZWEpoYlhNdWJHOTNMQ0J3WVhKaGJYTXVhR2xuYUN3Z01Dd2djR0Z5WVcxekxtSnBZWE5mWm1GamRHOXlMQ0J3WVhKaGJYTXVjbVZzWVhoaGRHbHZibDltWVdOMGIzSXBPMXh1ZlR0Y2JseHVjSFZpYkdsalgyWjFibU4wYVc5dWN5NW9hVzVuWlY5bGJtRmliR1ZCYm1kMWJHRnlUVzkwYjNJZ1BTQW9jR0Z5WVcxektTQTlQaUI3WEc0Z0lHTnZibk4wSUdOdmJuTjBjbUZwYm5RZ1BTQmZZMjl1YzNSeVlXbHVkSE5iY0dGeVlXMXpMbU52Ym5OMGNtRnBiblJkTzF4dUlDQmpiMjV6ZEhKaGFXNTBMbVZ1WVdKc1pVRnVaM1ZzWVhKTmIzUnZjaWgwY25WbExDQndZWEpoYlhNdWRtVnNiMk5wZEhrc0lIQmhjbUZ0Y3k1aFkyTmxiR1Z5WVhScGIyNHBPMXh1SUNCamIyNXpkSEpoYVc1MExtRXVZV04wYVhaaGRHVW9LVHRjYmlBZ2FXWWdLR052Ym5OMGNtRnBiblF1WWlrZ1kyOXVjM1J5WVdsdWRDNWlMbUZqZEdsMllYUmxLQ2s3WEc1OU8xeHVYRzV3ZFdKc2FXTmZablZ1WTNScGIyNXpMbWhwYm1kbFgyUnBjMkZpYkdWTmIzUnZjaUE5SUNod1lYSmhiWE1wSUQwK0lIdGNiaUFnWDJOdmJuTjBjbUZwYm5SelczQmhjbUZ0Y3k1amIyNXpkSEpoYVc1MFhTNWxibUZpYkdWTmIzUnZjaWhtWVd4elpTazdYRzRnSUdsbUlDaGpiMjV6ZEhKaGFXNTBMbUlwSUdOdmJuTjBjbUZwYm5RdVlpNWhZM1JwZG1GMFpTZ3BPMXh1ZlR0Y2JseHVjSFZpYkdsalgyWjFibU4wYVc5dWN5NXpiR2xrWlhKZmMyVjBUR2x0YVhSeklEMGdLSEJoY21GdGN5a2dQVDRnZTF4dUlDQmpiMjV6ZENCamIyNXpkSEpoYVc1MElEMGdYMk52Ym5OMGNtRnBiblJ6VzNCaGNtRnRjeTVqYjI1emRISmhhVzUwWFR0Y2JpQWdZMjl1YzNSeVlXbHVkQzV6WlhSTWIzZGxja3hwYmt4cGJXbDBLSEJoY21GdGN5NXNhVzVmYkc5M1pYSWdmSHdnTUNrN1hHNGdJR052Ym5OMGNtRnBiblF1YzJWMFZYQndaWEpNYVc1TWFXMXBkQ2h3WVhKaGJYTXViR2x1WDNWd2NHVnlJSHg4SURBcE8xeHVYRzRnSUdOdmJuTjBjbUZwYm5RdWMyVjBURzkzWlhKQmJtZE1hVzFwZENod1lYSmhiWE11WVc1blgyeHZkMlZ5SUh4OElEQXBPMXh1SUNCamIyNXpkSEpoYVc1MExuTmxkRlZ3Y0dWeVFXNW5UR2x0YVhRb2NHRnlZVzF6TG1GdVoxOTFjSEJsY2lCOGZDQXdLVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVjMnhwWkdWeVgzTmxkRkpsYzNScGRIVjBhVzl1SUQwZ0tIQmhjbUZ0Y3lrZ1BUNGdlMXh1SUNCamIyNXpkQ0JqYjI1emRISmhhVzUwSUQwZ1gyTnZibk4wY21GcGJuUnpXM0JoY21GdGN5NWpiMjV6ZEhKaGFXNTBYVHRjYmlBZ1kyOXVjM1J5WVdsdWRDNXpaWFJUYjJaMGJtVnpjMHhwYlV4cGJpaHdZWEpoYlhNdWJHbHVaV0Z5SUh4OElEQXBPMXh1SUNCamIyNXpkSEpoYVc1MExuTmxkRk52Wm5SdVpYTnpUR2x0UVc1bktIQmhjbUZ0Y3k1aGJtZDFiR0Z5SUh4OElEQXBPMXh1ZlR0Y2JseHVjSFZpYkdsalgyWjFibU4wYVc5dWN5NXpiR2xrWlhKZlpXNWhZbXhsVEdsdVpXRnlUVzkwYjNJZ1BTQW9jR0Z5WVcxektTQTlQaUI3WEc0Z0lHTnZibk4wSUdOdmJuTjBjbUZwYm5RZ1BTQmZZMjl1YzNSeVlXbHVkSE5iY0dGeVlXMXpMbU52Ym5OMGNtRnBiblJkTzF4dUlDQmpiMjV6ZEhKaGFXNTBMbk5sZEZSaGNtZGxkRXhwYmsxdmRHOXlWbVZzYjJOcGRIa29jR0Z5WVcxekxuWmxiRzlqYVhSNUtUdGNiaUFnWTI5dWMzUnlZV2x1ZEM1elpYUk5ZWGhNYVc1TmIzUnZja1p2Y21ObEtIQmhjbUZ0Y3k1aFkyTmxiR1Z5WVhScGIyNHBPMXh1SUNCamIyNXpkSEpoYVc1MExuTmxkRkJ2ZDJWeVpXUk1hVzVOYjNSdmNpaDBjblZsS1R0Y2JpQWdZMjl1YzNSeVlXbHVkQzVoTG1GamRHbDJZWFJsS0NrN1hHNGdJR2xtSUNoamIyNXpkSEpoYVc1MExtSXBJR052Ym5OMGNtRnBiblF1WWk1aFkzUnBkbUYwWlNncE8xeHVmVHRjYmx4dWNIVmliR2xqWDJaMWJtTjBhVzl1Y3k1emJHbGtaWEpmWkdsellXSnNaVXhwYm1WaGNrMXZkRzl5SUQwZ0tIQmhjbUZ0Y3lrZ1BUNGdlMXh1SUNCamIyNXpkQ0JqYjI1emRISmhhVzUwSUQwZ1gyTnZibk4wY21GcGJuUnpXM0JoY21GdGN5NWpiMjV6ZEhKaGFXNTBYVHRjYmlBZ1kyOXVjM1J5WVdsdWRDNXpaWFJRYjNkbGNtVmtUR2x1VFc5MGIzSW9abUZzYzJVcE8xeHVJQ0JwWmlBb1kyOXVjM1J5WVdsdWRDNWlLU0JqYjI1emRISmhhVzUwTG1JdVlXTjBhWFpoZEdVb0tUdGNibjA3WEc1Y2JuQjFZbXhwWTE5bWRXNWpkR2x2Ym5NdWMyeHBaR1Z5WDJWdVlXSnNaVUZ1WjNWc1lYSk5iM1J2Y2lBOUlDaHdZWEpoYlhNcElEMCtJSHRjYmlBZ1kyOXVjM1FnWTI5dWMzUnlZV2x1ZENBOUlGOWpiMjV6ZEhKaGFXNTBjMXR3WVhKaGJYTXVZMjl1YzNSeVlXbHVkRjA3WEc0Z0lHTnZibk4wY21GcGJuUXVjMlYwVkdGeVoyVjBRVzVuVFc5MGIzSldaV3h2WTJsMGVTaHdZWEpoYlhNdWRtVnNiMk5wZEhrcE8xeHVJQ0JqYjI1emRISmhhVzUwTG5ObGRFMWhlRUZ1WjAxdmRHOXlSbTl5WTJVb2NHRnlZVzF6TG1GalkyVnNaWEpoZEdsdmJpazdYRzRnSUdOdmJuTjBjbUZwYm5RdWMyVjBVRzkzWlhKbFpFRnVaMDF2ZEc5eUtIUnlkV1VwTzF4dUlDQmpiMjV6ZEhKaGFXNTBMbUV1WVdOMGFYWmhkR1VvS1R0Y2JpQWdhV1lnS0dOdmJuTjBjbUZwYm5RdVlpa2dZMjl1YzNSeVlXbHVkQzVpTG1GamRHbDJZWFJsS0NrN1hHNTlPMXh1WEc1d2RXSnNhV05mWm5WdVkzUnBiMjV6TG5Oc2FXUmxjbDlrYVhOaFlteGxRVzVuZFd4aGNrMXZkRzl5SUQwZ0tIQmhjbUZ0Y3lrZ1BUNGdlMXh1SUNCamIyNXpkQ0JqYjI1emRISmhhVzUwSUQwZ1gyTnZibk4wY21GcGJuUnpXM0JoY21GdGN5NWpiMjV6ZEhKaGFXNTBYVHRjYmlBZ1kyOXVjM1J5WVdsdWRDNXpaWFJRYjNkbGNtVmtRVzVuVFc5MGIzSW9abUZzYzJVcE8xeHVJQ0JqYjI1emRISmhhVzUwTG1FdVlXTjBhWFpoZEdVb0tUdGNiaUFnYVdZZ0tHTnZibk4wY21GcGJuUXVZaWtnWTI5dWMzUnlZV2x1ZEM1aUxtRmpkR2wyWVhSbEtDazdYRzU5TzF4dVhHNXdkV0pzYVdOZlpuVnVZM1JwYjI1ekxtTnZibVYwZDJsemRGOXpaWFJNYVcxcGRDQTlJQ2h3WVhKaGJYTXBJRDArSUh0Y2JpQWdYMk52Ym5OMGNtRnBiblJ6VzNCaGNtRnRjeTVqYjI1emRISmhhVzUwWFM1elpYUk1hVzFwZENod1lYSmhiWE11ZWl3Z2NHRnlZVzF6TG5rc0lIQmhjbUZ0Y3k1NEtUc2dMeThnV2xsWUlHOXlaR1Z5WEc1OU8xeHVYRzV3ZFdKc2FXTmZablZ1WTNScGIyNXpMbU52Ym1WMGQybHpkRjlsYm1GaWJHVk5iM1J2Y2lBOUlDaHdZWEpoYlhNcElEMCtJSHRjYmlBZ1kyOXVjM1FnWTI5dWMzUnlZV2x1ZENBOUlGOWpiMjV6ZEhKaGFXNTBjMXR3WVhKaGJYTXVZMjl1YzNSeVlXbHVkRjA3WEc0Z0lHTnZibk4wY21GcGJuUXVaVzVoWW14bFRXOTBiM0lvZEhKMVpTazdYRzRnSUdOdmJuTjBjbUZwYm5RdVlTNWhZM1JwZG1GMFpTZ3BPMXh1SUNCamIyNXpkSEpoYVc1MExtSXVZV04wYVhaaGRHVW9LVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVZMjl1WlhSM2FYTjBYM05sZEUxaGVFMXZkRzl5U1cxd2RXeHpaU0E5SUNod1lYSmhiWE1wSUQwK0lIdGNiaUFnWTI5dWMzUWdZMjl1YzNSeVlXbHVkQ0E5SUY5amIyNXpkSEpoYVc1MGMxdHdZWEpoYlhNdVkyOXVjM1J5WVdsdWRGMDdYRzRnSUdOdmJuTjBjbUZwYm5RdWMyVjBUV0Y0VFc5MGIzSkpiWEIxYkhObEtIQmhjbUZ0Y3k1dFlYaGZhVzF3ZFd4elpTazdYRzRnSUdOdmJuTjBjbUZwYm5RdVlTNWhZM1JwZG1GMFpTZ3BPMXh1SUNCamIyNXpkSEpoYVc1MExtSXVZV04wYVhaaGRHVW9LVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVZMjl1WlhSM2FYTjBYM05sZEUxdmRHOXlWR0Z5WjJWMElEMGdLSEJoY21GdGN5a2dQVDRnZTF4dUlDQmpiMjV6ZENCamIyNXpkSEpoYVc1MElEMGdYMk52Ym5OMGNtRnBiblJ6VzNCaGNtRnRjeTVqYjI1emRISmhhVzUwWFR0Y2JseHVJQ0JmY1hWaGRDNXpaWFJZS0hCaGNtRnRjeTU0S1R0Y2JpQWdYM0YxWVhRdWMyVjBXU2h3WVhKaGJYTXVlU2s3WEc0Z0lGOXhkV0YwTG5ObGRGb29jR0Z5WVcxekxub3BPMXh1SUNCZmNYVmhkQzV6WlhSWEtIQmhjbUZ0Y3k1M0tUdGNibHh1SUNCamIyNXpkSEpoYVc1MExuTmxkRTF2ZEc5eVZHRnlaMlYwS0Y5eGRXRjBLVHRjYmx4dUlDQmpiMjV6ZEhKaGFXNTBMbUV1WVdOMGFYWmhkR1VvS1R0Y2JpQWdZMjl1YzNSeVlXbHVkQzVpTG1GamRHbDJZWFJsS0NrN1hHNTlPMXh1WEc1d2RXSnNhV05mWm5WdVkzUnBiMjV6TG1OdmJtVjBkMmx6ZEY5a2FYTmhZbXhsVFc5MGIzSWdQU0FvY0dGeVlXMXpLU0E5UGlCN1hHNGdJR052Ym5OMElHTnZibk4wY21GcGJuUWdQU0JmWTI5dWMzUnlZV2x1ZEhOYmNHRnlZVzF6TG1OdmJuTjBjbUZwYm5SZE8xeHVJQ0JqYjI1emRISmhhVzUwTG1WdVlXSnNaVTF2ZEc5eUtHWmhiSE5sS1R0Y2JpQWdZMjl1YzNSeVlXbHVkQzVoTG1GamRHbDJZWFJsS0NrN1hHNGdJR052Ym5OMGNtRnBiblF1WWk1aFkzUnBkbUYwWlNncE8xeHVmVHRjYmx4dWNIVmliR2xqWDJaMWJtTjBhVzl1Y3k1a2IyWmZjMlYwVEdsdVpXRnlURzkzWlhKTWFXMXBkQ0E5SUNod1lYSmhiWE1wSUQwK0lIdGNiaUFnWTI5dWMzUWdZMjl1YzNSeVlXbHVkQ0E5SUY5amIyNXpkSEpoYVc1MGMxdHdZWEpoYlhNdVkyOXVjM1J5WVdsdWRGMDdYRzVjYmlBZ1gzWmxZek5mTVM1elpYUllLSEJoY21GdGN5NTRLVHRjYmlBZ1gzWmxZek5mTVM1elpYUlpLSEJoY21GdGN5NTVLVHRjYmlBZ1gzWmxZek5mTVM1elpYUmFLSEJoY21GdGN5NTZLVHRjYmx4dUlDQmpiMjV6ZEhKaGFXNTBMbk5sZEV4cGJtVmhja3h2ZDJWeVRHbHRhWFFvWDNabFl6TmZNU2s3WEc0Z0lHTnZibk4wY21GcGJuUXVZUzVoWTNScGRtRjBaU2dwTzF4dVhHNGdJR2xtSUNoamIyNXpkSEpoYVc1MExtSXBJR052Ym5OMGNtRnBiblF1WWk1aFkzUnBkbUYwWlNncE8xeHVmVHRjYmx4dWNIVmliR2xqWDJaMWJtTjBhVzl1Y3k1a2IyWmZjMlYwVEdsdVpXRnlWWEJ3WlhKTWFXMXBkQ0E5SUNod1lYSmhiWE1wSUQwK0lIdGNiaUFnWTI5dWMzUWdZMjl1YzNSeVlXbHVkQ0E5SUY5amIyNXpkSEpoYVc1MGMxdHdZWEpoYlhNdVkyOXVjM1J5WVdsdWRGMDdYRzVjYmlBZ1gzWmxZek5mTVM1elpYUllLSEJoY21GdGN5NTRLVHRjYmlBZ1gzWmxZek5mTVM1elpYUlpLSEJoY21GdGN5NTVLVHRjYmlBZ1gzWmxZek5mTVM1elpYUmFLSEJoY21GdGN5NTZLVHRjYmx4dUlDQmpiMjV6ZEhKaGFXNTBMbk5sZEV4cGJtVmhjbFZ3Y0dWeVRHbHRhWFFvWDNabFl6TmZNU2s3WEc0Z0lHTnZibk4wY21GcGJuUXVZUzVoWTNScGRtRjBaU2dwTzF4dVhHNGdJR2xtSUNoamIyNXpkSEpoYVc1MExtSXBJR052Ym5OMGNtRnBiblF1WWk1aFkzUnBkbUYwWlNncE8xeHVmVHRjYmx4dWNIVmliR2xqWDJaMWJtTjBhVzl1Y3k1a2IyWmZjMlYwUVc1bmRXeGhja3h2ZDJWeVRHbHRhWFFnUFNBb2NHRnlZVzF6S1NBOVBpQjdYRzRnSUdOdmJuTjBJR052Ym5OMGNtRnBiblFnUFNCZlkyOXVjM1J5WVdsdWRITmJjR0Z5WVcxekxtTnZibk4wY21GcGJuUmRPMXh1WEc0Z0lGOTJaV016WHpFdWMyVjBXQ2h3WVhKaGJYTXVlQ2s3WEc0Z0lGOTJaV016WHpFdWMyVjBXU2h3WVhKaGJYTXVlU2s3WEc0Z0lGOTJaV016WHpFdWMyVjBXaWh3WVhKaGJYTXVlaWs3WEc1Y2JpQWdZMjl1YzNSeVlXbHVkQzV6WlhSQmJtZDFiR0Z5VEc5M1pYSk1hVzFwZENoZmRtVmpNMTh4S1R0Y2JpQWdZMjl1YzNSeVlXbHVkQzVoTG1GamRHbDJZWFJsS0NrN1hHNWNiaUFnYVdZZ0tHTnZibk4wY21GcGJuUXVZaWtnWTI5dWMzUnlZV2x1ZEM1aUxtRmpkR2wyWVhSbEtDazdYRzU5TzF4dVhHNXdkV0pzYVdOZlpuVnVZM1JwYjI1ekxtUnZabDl6WlhSQmJtZDFiR0Z5VlhCd1pYSk1hVzFwZENBOUlDaHdZWEpoYlhNcElEMCtJSHRjYmlBZ1kyOXVjM1FnWTI5dWMzUnlZV2x1ZENBOUlGOWpiMjV6ZEhKaGFXNTBjMXR3WVhKaGJYTXVZMjl1YzNSeVlXbHVkRjA3WEc1Y2JpQWdYM1psWXpOZk1TNXpaWFJZS0hCaGNtRnRjeTU0S1R0Y2JpQWdYM1psWXpOZk1TNXpaWFJaS0hCaGNtRnRjeTU1S1R0Y2JpQWdYM1psWXpOZk1TNXpaWFJhS0hCaGNtRnRjeTU2S1R0Y2JseHVJQ0JqYjI1emRISmhhVzUwTG5ObGRFRnVaM1ZzWVhKVmNIQmxja3hwYldsMEtGOTJaV016WHpFcE8xeHVJQ0JqYjI1emRISmhhVzUwTG1FdVlXTjBhWFpoZEdVb0tUdGNibHh1SUNCcFppQW9ZMjl1YzNSeVlXbHVkQzVpS1NCamIyNXpkSEpoYVc1MExtSXVZV04wYVhaaGRHVW9LVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVaRzltWDJWdVlXSnNaVUZ1WjNWc1lYSk5iM1J2Y2lBOUlDaHdZWEpoYlhNcElEMCtJSHRjYmlBZ1kyOXVjM1FnWTI5dWMzUnlZV2x1ZENBOUlGOWpiMjV6ZEhKaGFXNTBjMXR3WVhKaGJYTXVZMjl1YzNSeVlXbHVkRjA3WEc1Y2JpQWdZMjl1YzNRZ2JXOTBiM0lnUFNCamIyNXpkSEpoYVc1MExtZGxkRkp2ZEdGMGFXOXVZV3hNYVcxcGRFMXZkRzl5S0hCaGNtRnRjeTUzYUdsamFDazdYRzRnSUcxdmRHOXlMbk5sZEY5dFgyVnVZV0pzWlUxdmRHOXlLSFJ5ZFdVcE8xeHVJQ0JqYjI1emRISmhhVzUwTG1FdVlXTjBhWFpoZEdVb0tUdGNibHh1SUNCcFppQW9ZMjl1YzNSeVlXbHVkQzVpS1NCamIyNXpkSEpoYVc1MExtSXVZV04wYVhaaGRHVW9LVHRjYm4wN1hHNWNibkIxWW14cFkxOW1kVzVqZEdsdmJuTXVaRzltWDJOdmJtWnBaM1Z5WlVGdVozVnNZWEpOYjNSdmNpQTlJQ2h3WVhKaGJYTXBJRDArSUh0Y2JpQWdZMjl1YzNRZ1kyOXVjM1J5WVdsdWRDQTlJRjlqYjI1emRISmhhVzUwYzF0d1lYSmhiWE11WTI5dWMzUnlZV2x1ZEYwc1hHNGdJQ0FnYlc5MGIzSWdQU0JqYjI1emRISmhhVzUwTG1kbGRGSnZkR0YwYVc5dVlXeE1hVzFwZEUxdmRHOXlLSEJoY21GdGN5NTNhR2xqYUNrN1hHNWNiaUFnYlc5MGIzSXVjMlYwWDIxZmJHOU1hVzFwZENod1lYSmhiWE11Ykc5M1gyRnVaMnhsS1R0Y2JpQWdiVzkwYjNJdWMyVjBYMjFmYUdsTWFXMXBkQ2h3WVhKaGJYTXVhR2xuYUY5aGJtZHNaU2s3WEc0Z0lHMXZkRzl5TG5ObGRGOXRYM1JoY21kbGRGWmxiRzlqYVhSNUtIQmhjbUZ0Y3k1MlpXeHZZMmwwZVNrN1hHNGdJRzF2ZEc5eUxuTmxkRjl0WDIxaGVFMXZkRzl5Um05eVkyVW9jR0Z5WVcxekxtMWhlRjltYjNKalpTazdYRzRnSUdOdmJuTjBjbUZwYm5RdVlTNWhZM1JwZG1GMFpTZ3BPMXh1WEc0Z0lHbG1JQ2hqYjI1emRISmhhVzUwTG1JcElHTnZibk4wY21GcGJuUXVZaTVoWTNScGRtRjBaU2dwTzF4dWZUdGNibHh1Y0hWaWJHbGpYMloxYm1OMGFXOXVjeTVrYjJaZlpHbHpZV0pzWlVGdVozVnNZWEpOYjNSdmNpQTlJQ2h3WVhKaGJYTXBJRDArSUh0Y2JpQWdZMjl1YzNRZ1kyOXVjM1J5WVdsdWRDQTlJRjlqYjI1emRISmhhVzUwYzF0d1lYSmhiWE11WTI5dWMzUnlZV2x1ZEYwc1hHNGdJQ0FnYlc5MGIzSWdQU0JqYjI1emRISmhhVzUwTG1kbGRGSnZkR0YwYVc5dVlXeE1hVzFwZEUxdmRHOXlLSEJoY21GdGN5NTNhR2xqYUNrN1hHNWNiaUFnYlc5MGIzSXVjMlYwWDIxZlpXNWhZbXhsVFc5MGIzSW9abUZzYzJVcE8xeHVJQ0JqYjI1emRISmhhVzUwTG1FdVlXTjBhWFpoZEdVb0tUdGNibHh1SUNCcFppQW9ZMjl1YzNSeVlXbHVkQzVpS1NCamIyNXpkSEpoYVc1MExtSXVZV04wYVhaaGRHVW9LVHRjYm4wN1hHNWNibU52Ym5OMElISmxjRzl5ZEZkdmNteGtJRDBnS0NrZ1BUNGdlMXh1SUNCcFppQW9VMVZRVUU5U1ZGOVVVa0ZPVTBaRlVrRkNURVVnSmlZZ2QyOXliR1J5WlhCdmNuUXViR1Z1WjNSb0lEd2dNaUFySUY5dWRXMWZjbWxuYVdSaWIyUjVYMjlpYW1WamRITWdLaUJYVDFKTVJGSkZVRTlTVkY5SlZFVk5VMGxhUlNrZ2UxeHVJQ0FnSUhkdmNteGtjbVZ3YjNKMElEMGdibVYzSUVac2IyRjBNekpCY25KaGVTaGNiaUFnSUNBZ0lESXZMeUJ0WlhOellXZGxJR2xrSUNZZ0l5QnZZbXBsWTNSeklHbHVJSEpsY0c5eWRGeHVJQ0FnSUNBZ0t5QW9UV0YwYUM1alpXbHNLRjl1ZFcxZmNtbG5hV1JpYjJSNVgyOWlhbVZqZEhNZ0x5QlNSVkJQVWxSZlEwaFZUa3RUU1ZwRktTQXFJRkpGVUU5U1ZGOURTRlZPUzFOSldrVXBJQ29nVjA5U1RFUlNSVkJQVWxSZlNWUkZUVk5KV2tVZ0x5OGdJeUJ2WmlCMllXeDFaWE1nYm1WbFpHVmtJQ29nYVhSbGJTQnphWHBsWEc0Z0lDQWdLVHRjYmx4dUlDQWdJSGR2Y214a2NtVndiM0owV3pCZElEMGdUVVZUVTBGSFJWOVVXVkJGVXk1WFQxSk1SRkpGVUU5U1ZEdGNiaUFnZlZ4dVhHNGdJSGR2Y214a2NtVndiM0owV3pGZElEMGdYMjUxYlY5eWFXZHBaR0p2WkhsZmIySnFaV04wY3pzZ0x5OGdjbVZqYjNKa0lHaHZkeUJ0WVc1NUlHOWlhbVZqZEhNZ2QyVW5jbVVnY21Wd2IzSjBhVzVuSUc5dVhHNWNiaUFnZTF4dUlDQWdJR3hsZENCcElEMGdNQ3hjYmlBZ0lDQWdJR2x1WkdWNElEMGdYMjlpYW1WamRITXViR1Z1WjNSb08xeHVYRzRnSUNBZ2QyaHBiR1VnS0dsdVpHVjRMUzBwSUh0Y2JpQWdJQ0FnSUdOdmJuTjBJRzlpYW1WamRDQTlJRjl2WW1wbFkzUnpXMmx1WkdWNFhUdGNibHh1SUNBZ0lDQWdhV1lnS0c5aWFtVmpkQ0FtSmlCdlltcGxZM1F1ZEhsd1pTQTlQVDBnTVNrZ2V5QXZMeUJTYVdkcFpFSnZaR2xsY3k1Y2JpQWdJQ0FnSUNBZ0x5OGdJMVJQUkU4NklIZGxJR05oYmlkMElIVnpaU0JqWlc1MFpYSWdiMllnYldGemN5QjBjbUZ1YzJadmNtMGdkMmhsYmlCalpXNTBaWElnYjJZZ2JXRnpjeUJqWVc0Z1kyaGhibWRsTEZ4dUlDQWdJQ0FnSUNBdkx5QWdJQ0FnSUNBZ1luVjBJR2RsZEUxdmRHbHZibE4wWVhSbEtDa3VaMlYwVjI5eWJHUlVjbUZ1YzJadmNtMG9LU0J6WTNKbGQzTWdkWEFnYjI0Z2IySnFaV04wY3lCMGFHRjBJR2hoZG1VZ1ltVmxiaUJ0YjNabFpGeHVJQ0FnSUNBZ0lDQXZMeUJ2WW1wbFkzUXVaMlYwVFc5MGFXOXVVM1JoZEdVb0tTNW5aWFJYYjNKc1pGUnlZVzV6Wm05eWJTZ2dkSEpoYm5ObWIzSnRJQ2s3WEc0Z0lDQWdJQ0FnSUM4dklHOWlhbVZqZEM1blpYUk5iM1JwYjI1VGRHRjBaU2dwTG1kbGRGZHZjbXhrVkhKaGJuTm1iM0p0S0Y5MGNtRnVjMlp2Y20wcE8xeHVYRzRnSUNBZ0lDQWdJR052Ym5OMElIUnlZVzV6Wm05eWJTQTlJRzlpYW1WamRDNW5aWFJEWlc1MFpYSlBaazFoYzNOVWNtRnVjMlp2Y20wb0tUdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2IzSnBaMmx1SUQwZ2RISmhibk5tYjNKdExtZGxkRTl5YVdkcGJpZ3BPMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnliM1JoZEdsdmJpQTlJSFJ5WVc1elptOXliUzVuWlhSU2IzUmhkR2x2YmlncE8xeHVYRzRnSUNBZ0lDQWdJQzh2SUdGa1pDQjJZV3gxWlhNZ2RHOGdjbVZ3YjNKMFhHNGdJQ0FnSUNBZ0lHTnZibk4wSUc5bVpuTmxkQ0E5SURJZ0t5QW9hU3NyS1NBcUlGZFBVa3hFVWtWUVQxSlVYMGxVUlUxVFNWcEZPMXh1WEc0Z0lDQWdJQ0FnSUhkdmNteGtjbVZ3YjNKMFcyOW1abk5sZEYwZ1BTQnZZbXBsWTNRdWFXUTdYRzVjYmlBZ0lDQWdJQ0FnZDI5eWJHUnlaWEJ2Y25SYmIyWm1jMlYwSUNzZ01WMGdQU0J2Y21sbmFXNHVlQ2dwTzF4dUlDQWdJQ0FnSUNCM2IzSnNaSEpsY0c5eWRGdHZabVp6WlhRZ0t5QXlYU0E5SUc5eWFXZHBiaTU1S0NrN1hHNGdJQ0FnSUNBZ0lIZHZjbXhrY21Wd2IzSjBXMjltWm5ObGRDQXJJRE5kSUQwZ2IzSnBaMmx1TG5vb0tUdGNibHh1SUNBZ0lDQWdJQ0IzYjNKc1pISmxjRzl5ZEZ0dlptWnpaWFFnS3lBMFhTQTlJSEp2ZEdGMGFXOXVMbmdvS1R0Y2JpQWdJQ0FnSUNBZ2QyOXliR1J5WlhCdmNuUmJiMlptYzJWMElDc2dOVjBnUFNCeWIzUmhkR2x2Ymk1NUtDazdYRzRnSUNBZ0lDQWdJSGR2Y214a2NtVndiM0owVzI5bVpuTmxkQ0FySURaZElEMGdjbTkwWVhScGIyNHVlaWdwTzF4dUlDQWdJQ0FnSUNCM2IzSnNaSEpsY0c5eWRGdHZabVp6WlhRZ0t5QTNYU0E5SUhKdmRHRjBhVzl1TG5jb0tUdGNibHh1SUNBZ0lDQWdJQ0JmZG1WamRHOXlJRDBnYjJKcVpXTjBMbWRsZEV4cGJtVmhjbFpsYkc5amFYUjVLQ2s3WEc0Z0lDQWdJQ0FnSUhkdmNteGtjbVZ3YjNKMFcyOW1abk5sZENBcklEaGRJRDBnWDNabFkzUnZjaTU0S0NrN1hHNGdJQ0FnSUNBZ0lIZHZjbXhrY21Wd2IzSjBXMjltWm5ObGRDQXJJRGxkSUQwZ1gzWmxZM1J2Y2k1NUtDazdYRzRnSUNBZ0lDQWdJSGR2Y214a2NtVndiM0owVzI5bVpuTmxkQ0FySURFd1hTQTlJRjkyWldOMGIzSXVlaWdwTzF4dVhHNGdJQ0FnSUNBZ0lGOTJaV04wYjNJZ1BTQnZZbXBsWTNRdVoyVjBRVzVuZFd4aGNsWmxiRzlqYVhSNUtDazdYRzRnSUNBZ0lDQWdJSGR2Y214a2NtVndiM0owVzI5bVpuTmxkQ0FySURFeFhTQTlJRjkyWldOMGIzSXVlQ2dwTzF4dUlDQWdJQ0FnSUNCM2IzSnNaSEpsY0c5eWRGdHZabVp6WlhRZ0t5QXhNbDBnUFNCZmRtVmpkRzl5TG5rb0tUdGNiaUFnSUNBZ0lDQWdkMjl5YkdSeVpYQnZjblJiYjJabWMyVjBJQ3NnTVROZElEMGdYM1psWTNSdmNpNTZLQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnYVdZZ0tGTlZVRkJQVWxSZlZGSkJUbE5HUlZKQlFreEZLU0IwY21GdWMyWmxjbUZpYkdWTlpYTnpZV2RsS0hkdmNteGtjbVZ3YjNKMExtSjFabVpsY2l3Z1czZHZjbXhrY21Wd2IzSjBMbUoxWm1abGNsMHBPMXh1SUNCbGJITmxJSFJ5WVc1elptVnlZV0pzWlUxbGMzTmhaMlVvZDI5eWJHUnlaWEJ2Y25RcE8xeHVmVHRjYmx4dVkyOXVjM1FnY21Wd2IzSjBWMjl5YkdSZmMyOW1kR0p2WkdsbGN5QTlJQ2dwSUQwK0lIdGNiaUFnTHk4Z1ZFOUVUem9nUVdSa0lGTlZVRkJQVWxSVVVrRk9VMFpGVWtGQ1RFVXVYRzVjYmlBZ2MyOW1kSEpsY0c5eWRDQTlJRzVsZHlCR2JHOWhkRE15UVhKeVlYa29YRzRnSUNBZ01pQXZMeUJ0WlhOellXZGxJR2xrSUNZZ0l5QnZZbXBsWTNSeklHbHVJSEpsY0c5eWRGeHVJQ0FnSUNzZ1gyNTFiVjl6YjJaMFltOWtlVjl2WW1wbFkzUnpJQ29nTWx4dUlDQWdJQ3NnWDNOdlpuUmliMlI1WDNKbGNHOXlkRjl6YVhwbElDb2dObHh1SUNBcE8xeHVYRzRnSUhOdlpuUnlaWEJ2Y25SYk1GMGdQU0JOUlZOVFFVZEZYMVJaVUVWVExsTlBSbFJTUlZCUFVsUTdYRzRnSUhOdlpuUnlaWEJ2Y25SYk1WMGdQU0JmYm5WdFgzTnZablJpYjJSNVgyOWlhbVZqZEhNN0lDOHZJSEpsWTI5eVpDQm9iM2NnYldGdWVTQnZZbXBsWTNSeklIZGxKM0psSUhKbGNHOXlkR2x1WnlCdmJseHVYRzRnSUh0Y2JpQWdJQ0JzWlhRZ2IyWm1jMlYwSUQwZ01peGNiaUFnSUNBZ0lHbHVaR1Y0SUQwZ1gyOWlhbVZqZEhNdWJHVnVaM1JvTzF4dVhHNGdJQ0FnZDJocGJHVWdLR2x1WkdWNExTMHBJSHRjYmlBZ0lDQWdJR052Ym5OMElHOWlhbVZqZENBOUlGOXZZbXBsWTNSelcybHVaR1Y0WFR0Y2JseHVJQ0FnSUNBZ2FXWWdLRzlpYW1WamRDQW1KaUJ2WW1wbFkzUXVkSGx3WlNBOVBUMGdNQ2tnZXlBdkx5QlRiMlowUW05a2FXVnpMbHh1WEc0Z0lDQWdJQ0FnSUhOdlpuUnlaWEJ2Y25SYmIyWm1jMlYwWFNBOUlHOWlhbVZqZEM1cFpEdGNibHh1SUNBZ0lDQWdJQ0JqYjI1emRDQnZabVp6WlhSV1pYSjBJRDBnYjJabWMyVjBJQ3NnTWp0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvYjJKcVpXTjBMbkp2Y0dVZ1BUMDlJSFJ5ZFdVcElIdGNiaUFnSUNBZ0lDQWdJQ0JqYjI1emRDQnViMlJsY3lBOUlHOWlhbVZqZEM1blpYUmZiVjl1YjJSbGN5Z3BPMXh1SUNBZ0lDQWdJQ0FnSUdOdmJuTjBJSE5wZW1VZ1BTQnViMlJsY3k1emFYcGxLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ2MyOW1kSEpsY0c5eWRGdHZabVp6WlhRZ0t5QXhYU0E5SUhOcGVtVTdYRzVjYmlBZ0lDQWdJQ0FnSUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElITnBlbVU3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnYm05a1pTQTlJRzV2WkdWekxtRjBLR2twTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2RtVnlkQ0E5SUc1dlpHVXVaMlYwWDIxZmVDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnYjJabUlEMGdiMlptYzJWMFZtVnlkQ0FySUdrZ0tpQXpPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpiMlowY21Wd2IzSjBXMjltWmwwZ1BTQjJaWEowTG5nb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOdlpuUnlaWEJ2Y25SYmIyWm1JQ3NnTVYwZ1BTQjJaWEowTG5rb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOdlpuUnlaWEJ2Y25SYmIyWm1JQ3NnTWwwZ1BTQjJaWEowTG5vb0tUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQnZabVp6WlhRZ0t6MGdjMmw2WlNBcUlEWWdLeUF5TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHVnNjMlVnYVdZZ0tHOWlhbVZqZEM1amJHOTBhQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lHTnZibk4wSUc1dlpHVnpJRDBnYjJKcVpXTjBMbWRsZEY5dFgyNXZaR1Z6S0NrN1hHNGdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2MybDZaU0E5SUc1dlpHVnpMbk5wZW1Vb0tUdGNiaUFnSUNBZ0lDQWdJQ0J6YjJaMGNtVndiM0owVzI5bVpuTmxkQ0FySURGZElEMGdjMmw2WlR0Y2JseHVJQ0FnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJR2tnUFNBd095QnBJRHdnYzJsNlpUc2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQnViMlJsSUQwZ2JtOWtaWE11WVhRb2FTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0IyWlhKMElEMGdibTlrWlM1blpYUmZiVjk0S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQnViM0p0WVd3Z1BTQnViMlJsTG1kbGRGOXRYMjRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElHOW1aaUE5SUc5bVpuTmxkRlpsY25RZ0t5QnBJQ29nTmp0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnYzI5bWRISmxjRzl5ZEZ0dlptWmRJRDBnZG1WeWRDNTRLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpiMlowY21Wd2IzSjBXMjltWmlBcklERmRJRDBnZG1WeWRDNTVLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpiMlowY21Wd2IzSjBXMjltWmlBcklESmRJRDBnZG1WeWRDNTZLQ2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSE52Wm5SeVpYQnZjblJiYjJabUlDc2dNMTBnUFNCdWIzSnRZV3d1ZUNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYzI5bWRISmxjRzl5ZEZ0dlptWWdLeUEwWFNBOUlHNXZjbTFoYkM1NUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCemIyWjBjbVZ3YjNKMFcyOW1aaUFySURWZElEMGdibTl5YldGc0xub29LVHRjYmlBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0J2Wm1aelpYUWdLejBnYzJsNlpTQXFJRFlnS3lBeU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJR052Ym5OMElHWmhZMlZ6SUQwZ2IySnFaV04wTG1kbGRGOXRYMlpoWTJWektDazdYRzRnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdjMmw2WlNBOUlHWmhZMlZ6TG5OcGVtVW9LVHRjYmlBZ0lDQWdJQ0FnSUNCemIyWjBjbVZ3YjNKMFcyOW1abk5sZENBcklERmRJRDBnYzJsNlpUdGNibHh1SUNBZ0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2MybDZaVHNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0JtWVdObElEMGdabUZqWlhNdVlYUW9hU2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElHNXZaR1V4SUQwZ1ptRmpaUzVuWlhSZmJWOXVLREFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2JtOWtaVElnUFNCbVlXTmxMbWRsZEY5dFgyNG9NU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCdWIyUmxNeUE5SUdaaFkyVXVaMlYwWDIxZmJpZ3lLVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2RtVnlkREVnUFNCdWIyUmxNUzVuWlhSZmJWOTRLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCMlpYSjBNaUE5SUc1dlpHVXlMbWRsZEY5dFgzZ29LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUhabGNuUXpJRDBnYm05a1pUTXVaMlYwWDIxZmVDZ3BPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCdWIzSnRZV3d4SUQwZ2JtOWtaVEV1WjJWMFgyMWZiaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2JtOXliV0ZzTWlBOUlHNXZaR1V5TG1kbGRGOXRYMjRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElHNXZjbTFoYkRNZ1BTQnViMlJsTXk1blpYUmZiVjl1S0NrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJRzltWmlBOUlHOW1abk5sZEZabGNuUWdLeUJwSUNvZ01UZzdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lITnZablJ5WlhCdmNuUmJiMlptWFNBOUlIWmxjblF4TG5nb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOdlpuUnlaWEJ2Y25SYmIyWm1JQ3NnTVYwZ1BTQjJaWEowTVM1NUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCemIyWjBjbVZ3YjNKMFcyOW1aaUFySURKZElEMGdkbVZ5ZERFdWVpZ3BPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpiMlowY21Wd2IzSjBXMjltWmlBcklETmRJRDBnYm05eWJXRnNNUzU0S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6YjJaMGNtVndiM0owVzI5bVppQXJJRFJkSUQwZ2JtOXliV0ZzTVM1NUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCemIyWjBjbVZ3YjNKMFcyOW1aaUFySURWZElEMGdibTl5YldGc01TNTZLQ2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSE52Wm5SeVpYQnZjblJiYjJabUlDc2dObDBnUFNCMlpYSjBNaTU0S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6YjJaMGNtVndiM0owVzI5bVppQXJJRGRkSUQwZ2RtVnlkREl1ZVNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYzI5bWRISmxjRzl5ZEZ0dlptWWdLeUE0WFNBOUlIWmxjblF5TG5vb0tUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2MyOW1kSEpsY0c5eWRGdHZabVlnS3lBNVhTQTlJRzV2Y20xaGJESXVlQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjMjltZEhKbGNHOXlkRnR2Wm1ZZ0t5QXhNRjBnUFNCdWIzSnRZV3d5TG5rb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOdlpuUnlaWEJ2Y25SYmIyWm1JQ3NnTVRGZElEMGdibTl5YldGc01pNTZLQ2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSE52Wm5SeVpYQnZjblJiYjJabUlDc2dNVEpkSUQwZ2RtVnlkRE11ZUNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYzI5bWRISmxjRzl5ZEZ0dlptWWdLeUF4TTEwZ1BTQjJaWEowTXk1NUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCemIyWjBjbVZ3YjNKMFcyOW1aaUFySURFMFhTQTlJSFpsY25Rekxub29LVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdjMjltZEhKbGNHOXlkRnR2Wm1ZZ0t5QXhOVjBnUFNCdWIzSnRZV3d6TG5nb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOdlpuUnlaWEJ2Y25SYmIyWm1JQ3NnTVRaZElEMGdibTl5YldGc015NTVLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpiMlowY21Wd2IzSjBXMjltWmlBcklERTNYU0E5SUc1dmNtMWhiRE11ZWlncE8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lHOW1abk5sZENBclBTQnphWHBsSUNvZ01UZ2dLeUF5TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ0x5OGdhV1lnS0ZOVlVGQlBVbFJmVkZKQlRsTkdSVkpCUWt4RktTQjBjbUZ1YzJabGNtRmliR1ZOWlhOellXZGxLSE52Wm5SeVpYQnZjblF1WW5WbVptVnlMQ0JiYzI5bWRISmxjRzl5ZEM1aWRXWm1aWEpkS1R0Y2JpQWdMeThnWld4elpTQjBjbUZ1YzJabGNtRmliR1ZOWlhOellXZGxLSE52Wm5SeVpYQnZjblFwTzF4dUlDQjBjbUZ1YzJabGNtRmliR1ZOWlhOellXZGxLSE52Wm5SeVpYQnZjblFwTzF4dWZUdGNibHh1WTI5dWMzUWdjbVZ3YjNKMFEyOXNiR2x6YVc5dWN5QTlJQ2dwSUQwK0lIdGNiaUFnWTI5dWMzUWdaSEFnUFNCM2IzSnNaQzVuWlhSRWFYTndZWFJqYUdWeUtDa3NYRzRnSUNBZ2JuVnRJRDBnWkhBdVoyVjBUblZ0VFdGdWFXWnZiR1J6S0NrN1hHNGdJQ0FnTHk4Z1gyTnZiR3hwWkdWa0lEMGdabUZzYzJVN1hHNWNiaUFnYVdZZ0tGTlZVRkJQVWxSZlZGSkJUbE5HUlZKQlFreEZLU0I3WEc0Z0lDQWdhV1lnS0dOdmJHeHBjMmx2Ym5KbGNHOXlkQzVzWlc1bmRHZ2dQQ0F5SUNzZ2JuVnRJQ29nUTA5TVRFbFRTVTlPVWtWUVQxSlVYMGxVUlUxVFNWcEZLU0I3WEc0Z0lDQWdJQ0JqYjJ4c2FYTnBiMjV5WlhCdmNuUWdQU0J1WlhjZ1JteHZZWFF6TWtGeWNtRjVLRnh1SUNBZ0lDQWdJQ0F5SUM4dklHMWxjM05oWjJVZ2FXUWdKaUFqSUc5aWFtVmpkSE1nYVc0Z2NtVndiM0owWEc0Z0lDQWdJQ0FnSUNzZ0tFMWhkR2d1WTJWcGJDaGZiblZ0WDI5aWFtVmpkSE1nTHlCU1JWQlBVbFJmUTBoVlRrdFRTVnBGS1NBcUlGSkZVRTlTVkY5RFNGVk9TMU5KV2tVcElDb2dRMDlNVEVsVFNVOU9Va1ZRVDFKVVgwbFVSVTFUU1ZwRklDOHZJQ01nYjJZZ2RtRnNkV1Z6SUc1bFpXUmxaQ0FxSUdsMFpXMGdjMmw2WlZ4dUlDQWdJQ0FnS1R0Y2JpQWdJQ0FnSUdOdmJHeHBjMmx2Ym5KbGNHOXlkRnN3WFNBOUlFMUZVMU5CUjBWZlZGbFFSVk11UTA5TVRFbFRTVTlPVWtWUVQxSlVPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR052Ykd4cGMybHZibkpsY0c5eWRGc3hYU0E5SURBN0lDOHZJR2h2ZHlCdFlXNTVJR052Ykd4cGMybHZibk1nZDJVbmNtVWdjbVZ3YjNKMGFXNW5JRzl1WEc1Y2JpQWdabTl5SUNoc1pYUWdhU0E5SURBN0lHa2dQQ0J1ZFcwN0lHa3JLeWtnZTF4dUlDQWdJR052Ym5OMElHMWhibWxtYjJ4a0lEMGdaSEF1WjJWMFRXRnVhV1p2YkdSQ2VVbHVaR1Y0U1c1MFpYSnVZV3dvYVNrc1hHNGdJQ0FnSUNCdWRXMWZZMjl1ZEdGamRITWdQU0J0WVc1cFptOXNaQzVuWlhST2RXMURiMjUwWVdOMGN5Z3BPMXh1WEc0Z0lDQWdhV1lnS0c1MWJWOWpiMjUwWVdOMGN5QTlQVDBnTUNrZ1kyOXVkR2x1ZFdVN1hHNWNiaUFnSUNCbWIzSWdLR3hsZENCcUlEMGdNRHNnYWlBOElHNTFiVjlqYjI1MFlXTjBjenNnYWlzcktTQjdYRzRnSUNBZ0lDQmpiMjV6ZENCd2RDQTlJRzFoYm1sbWIyeGtMbWRsZEVOdmJuUmhZM1JRYjJsdWRDaHFLVHRjYmx4dUlDQWdJQ0FnTHk4Z2FXWWdLQ0J3ZEM1blpYUkVhWE4wWVc1alpTZ3BJRHdnTUNBcElIdGNiaUFnSUNBZ0lHTnZibk4wSUc5bVpuTmxkQ0E5SURJZ0t5QW9ZMjlzYkdsemFXOXVjbVZ3YjNKMFd6RmRLeXNwSUNvZ1EwOU1URWxUU1U5T1VrVlFUMUpVWDBsVVJVMVRTVnBGTzF4dUlDQWdJQ0FnWTI5c2JHbHphVzl1Y21Wd2IzSjBXMjltWm5ObGRGMGdQU0JmYjJKcVpXTjBjMTloYlcxdlcyMWhibWxtYjJ4a0xtZGxkRUp2Wkhrd0tDa3VjSFJ5WFR0Y2JpQWdJQ0FnSUdOdmJHeHBjMmx2Ym5KbGNHOXlkRnR2Wm1aelpYUWdLeUF4WFNBOUlGOXZZbXBsWTNSelgyRnRiVzliYldGdWFXWnZiR1F1WjJWMFFtOWtlVEVvS1M1d2RISmRPMXh1WEc0Z0lDQWdJQ0JmZG1WamRHOXlJRDBnY0hRdVoyVjBYMjFmYm05eWJXRnNWMjl5YkdSUGJrSW9LVHRjYmlBZ0lDQWdJR052Ykd4cGMybHZibkpsY0c5eWRGdHZabVp6WlhRZ0t5QXlYU0E5SUY5MlpXTjBiM0l1ZUNncE8xeHVJQ0FnSUNBZ1kyOXNiR2x6YVc5dWNtVndiM0owVzI5bVpuTmxkQ0FySUROZElEMGdYM1psWTNSdmNpNTVLQ2s3WEc0Z0lDQWdJQ0JqYjJ4c2FYTnBiMjV5WlhCdmNuUmJiMlptYzJWMElDc2dORjBnUFNCZmRtVmpkRzl5TG5vb0tUdGNiaUFnSUNBZ0lHSnlaV0ZyTzF4dUlDQWdJQ0FnTHk4Z2ZWeHVJQ0FnSUNBZ0x5OGdkSEpoYm5ObVpYSmhZbXhsVFdWemMyRm5aU2hmYjJKcVpXTjBjMTloYlcxdktUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnBaaUFvVTFWUVVFOVNWRjlVVWtGT1UwWkZVa0ZDVEVVcElIUnlZVzV6Wm1WeVlXSnNaVTFsYzNOaFoyVW9ZMjlzYkdsemFXOXVjbVZ3YjNKMExtSjFabVpsY2l3Z1cyTnZiR3hwYzJsdmJuSmxjRzl5ZEM1aWRXWm1aWEpkS1R0Y2JpQWdaV3h6WlNCMGNtRnVjMlpsY21GaWJHVk5aWE56WVdkbEtHTnZiR3hwYzJsdmJuSmxjRzl5ZENrN1hHNTlPMXh1WEc1amIyNXpkQ0J5WlhCdmNuUldaV2hwWTJ4bGN5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdhV1lnS0ZOVlVGQlBVbFJmVkZKQlRsTkdSVkpCUWt4RktTQjdYRzRnSUNBZ2FXWWdLSFpsYUdsamJHVnlaWEJ2Y25RdWJHVnVaM1JvSUR3Z01pQXJJRjl1ZFcxZmQyaGxaV3h6SUNvZ1ZrVklTVU5NUlZKRlVFOVNWRjlKVkVWTlUwbGFSU2tnZTF4dUlDQWdJQ0FnZG1Wb2FXTnNaWEpsY0c5eWRDQTlJRzVsZHlCR2JHOWhkRE15UVhKeVlYa29YRzRnSUNBZ0lDQWdJRElnTHk4Z2JXVnpjMkZuWlNCcFpDQW1JQ01nYjJKcVpXTjBjeUJwYmlCeVpYQnZjblJjYmlBZ0lDQWdJQ0FnS3lBb1RXRjBhQzVqWldsc0tGOXVkVzFmZDJobFpXeHpJQzhnVWtWUVQxSlVYME5JVlU1TFUwbGFSU2tnS2lCU1JWQlBVbFJmUTBoVlRrdFRTVnBGS1NBcUlGWkZTRWxEVEVWU1JWQlBVbFJmU1ZSRlRWTkpXa1VnTHk4Z0l5QnZaaUIyWVd4MVpYTWdibVZsWkdWa0lDb2dhWFJsYlNCemFYcGxYRzRnSUNBZ0lDQXBPMXh1SUNBZ0lDQWdkbVZvYVdOc1pYSmxjRzl5ZEZzd1hTQTlJRTFGVTFOQlIwVmZWRmxRUlZNdVZrVklTVU5NUlZKRlVFOVNWRHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0I3WEc0Z0lDQWdiR1YwSUdrZ1BTQXdMRnh1SUNBZ0lDQWdhaUE5SURBc1hHNGdJQ0FnSUNCcGJtUmxlQ0E5SUY5MlpXaHBZMnhsY3k1c1pXNW5kR2c3WEc1Y2JpQWdJQ0IzYUdsc1pTQW9hVzVrWlhndExTa2dlMXh1SUNBZ0lDQWdhV1lnS0Y5MlpXaHBZMnhsYzF0cGJtUmxlRjBwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnZG1Wb2FXTnNaU0E5SUY5MlpXaHBZMnhsYzF0cGJtUmxlRjA3WEc1Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2hxSUQwZ01Ec2dhaUE4SUhabGFHbGpiR1V1WjJWMFRuVnRWMmhsWld4ektDazdJR29yS3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQzh2SUhabGFHbGpiR1V1ZFhCa1lYUmxWMmhsWld4VWNtRnVjMlp2Y20wb0lHb3NJSFJ5ZFdVZ0tUdGNiaUFnSUNBZ0lDQWdJQ0F2THlCMGNtRnVjMlp2Y20wZ1BTQjJaV2hwWTJ4bExtZGxkRmRvWldWc1ZISmhibk5tYjNKdFYxTW9JR29nS1R0Y2JpQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCMGNtRnVjMlp2Y20wZ1BTQjJaV2hwWTJ4bExtZGxkRmRvWldWc1NXNW1ieWhxS1M1blpYUmZiVjkzYjNKc1pGUnlZVzV6Wm05eWJTZ3BPMXh1WEc0Z0lDQWdJQ0FnSUNBZ1kyOXVjM1FnYjNKcFoybHVJRDBnZEhKaGJuTm1iM0p0TG1kbGRFOXlhV2RwYmlncE8xeHVJQ0FnSUNBZ0lDQWdJR052Ym5OMElISnZkR0YwYVc5dUlEMGdkSEpoYm5ObWIzSnRMbWRsZEZKdmRHRjBhVzl1S0NrN1hHNWNiaUFnSUNBZ0lDQWdJQ0F2THlCaFpHUWdkbUZzZFdWeklIUnZJSEpsY0c5eWRGeHVJQ0FnSUNBZ0lDQWdJR052Ym5OMElHOW1abk5sZENBOUlERWdLeUFvYVNzcktTQXFJRlpGU0VsRFRFVlNSVkJQVWxSZlNWUkZUVk5KV2tVN1hHNWNiaUFnSUNBZ0lDQWdJQ0IyWldocFkyeGxjbVZ3YjNKMFcyOW1abk5sZEYwZ1BTQnBibVJsZUR0Y2JpQWdJQ0FnSUNBZ0lDQjJaV2hwWTJ4bGNtVndiM0owVzI5bVpuTmxkQ0FySURGZElEMGdhanRjYmx4dUlDQWdJQ0FnSUNBZ0lIWmxhR2xqYkdWeVpYQnZjblJiYjJabWMyVjBJQ3NnTWwwZ1BTQnZjbWxuYVc0dWVDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUhabGFHbGpiR1Z5WlhCdmNuUmJiMlptYzJWMElDc2dNMTBnUFNCdmNtbG5hVzR1ZVNncE8xeHVJQ0FnSUNBZ0lDQWdJSFpsYUdsamJHVnlaWEJ2Y25SYmIyWm1jMlYwSUNzZ05GMGdQU0J2Y21sbmFXNHVlaWdwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdkbVZvYVdOc1pYSmxjRzl5ZEZ0dlptWnpaWFFnS3lBMVhTQTlJSEp2ZEdGMGFXOXVMbmdvS1R0Y2JpQWdJQ0FnSUNBZ0lDQjJaV2hwWTJ4bGNtVndiM0owVzI5bVpuTmxkQ0FySURaZElEMGdjbTkwWVhScGIyNHVlU2dwTzF4dUlDQWdJQ0FnSUNBZ0lIWmxhR2xqYkdWeVpYQnZjblJiYjJabWMyVjBJQ3NnTjEwZ1BTQnliM1JoZEdsdmJpNTZLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ2RtVm9hV05zWlhKbGNHOXlkRnR2Wm1aelpYUWdLeUE0WFNBOUlISnZkR0YwYVc5dUxuY29LVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNoVFZWQlFUMUpVWDFSU1FVNVRSa1ZTUVVKTVJTQW1KaUJxSUNFOVBTQXdLU0IwY21GdWMyWmxjbUZpYkdWTlpYTnpZV2RsS0habGFHbGpiR1Z5WlhCdmNuUXVZblZtWm1WeUxDQmJkbVZvYVdOc1pYSmxjRzl5ZEM1aWRXWm1aWEpkS1R0Y2JpQWdJQ0JsYkhObElHbG1JQ2hxSUNFOVBTQXdLU0IwY21GdWMyWmxjbUZpYkdWTlpYTnpZV2RsS0habGFHbGpiR1Z5WlhCdmNuUXBPMXh1SUNCOVhHNTlPMXh1WEc1amIyNXpkQ0J5WlhCdmNuUkRiMjV6ZEhKaGFXNTBjeUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnYVdZZ0tGTlZVRkJQVWxSZlZGSkJUbE5HUlZKQlFreEZLU0I3WEc0Z0lDQWdhV1lnS0dOdmJuTjBjbUZwYm5SeVpYQnZjblF1YkdWdVozUm9JRHdnTWlBcklGOXVkVzFmWTI5dWMzUnlZV2x1ZEhNZ0tpQkRUMDVUVkZKQlNVNVVVa1ZRVDFKVVgwbFVSVTFUU1ZwRktTQjdYRzRnSUNBZ0lDQmpiMjV6ZEhKaGFXNTBjbVZ3YjNKMElEMGdibVYzSUVac2IyRjBNekpCY25KaGVTaGNiaUFnSUNBZ0lDQWdNaUF2THlCdFpYTnpZV2RsSUdsa0lDWWdJeUJ2WW1wbFkzUnpJR2x1SUhKbGNHOXlkRnh1SUNBZ0lDQWdJQ0FySUNoTllYUm9MbU5sYVd3b1gyNTFiVjlqYjI1emRISmhhVzUwY3lBdklGSkZVRTlTVkY5RFNGVk9TMU5KV2tVcElDb2dVa1ZRVDFKVVgwTklWVTVMVTBsYVJTa2dLaUJEVDA1VFZGSkJTVTVVVWtWUVQxSlVYMGxVUlUxVFNWcEZJQzh2SUNNZ2IyWWdkbUZzZFdWeklHNWxaV1JsWkNBcUlHbDBaVzBnYzJsNlpWeHVJQ0FnSUNBZ0tUdGNiaUFnSUNBZ0lHTnZibk4wY21GcGJuUnlaWEJ2Y25SYk1GMGdQU0JOUlZOVFFVZEZYMVJaVUVWVExrTlBUbE5VVWtGSlRsUlNSVkJQVWxRN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2UxeHVJQ0FnSUd4bGRDQnZabVp6WlhRZ1BTQXdMRnh1SUNBZ0lDQWdhU0E5SURBc1hHNGdJQ0FnSUNCcGJtUmxlQ0E5SUY5amIyNXpkSEpoYVc1MGN5NXNaVzVuYUhRN1hHNWNiaUFnSUNCM2FHbHNaU0FvYVc1a1pYZ3RMU2tnZTF4dUlDQWdJQ0FnYVdZZ0tGOWpiMjV6ZEhKaGFXNTBjMXRwYm1SbGVGMHBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdZMjl1YzNSeVlXbHVkQ0E5SUY5amIyNXpkSEpoYVc1MGMxdHBibVJsZUYwN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUc5bVpuTmxkRjlpYjJSNUlEMGdZMjl1YzNSeVlXbHVkQzVoTzF4dUlDQWdJQ0FnSUNCamIyNXpkQ0IwY21GdWMyWnZjbTBnUFNCamIyNXpkSEpoYVc1MExuUmhPMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnZjbWxuYVc0Z1BTQjBjbUZ1YzJadmNtMHVaMlYwVDNKcFoybHVLQ2s3WEc1Y2JpQWdJQ0FnSUNBZ0x5OGdZV1JrSUhaaGJIVmxjeUIwYnlCeVpYQnZjblJjYmlBZ0lDQWdJQ0FnYjJabWMyVjBJRDBnTVNBcklDaHBLeXNwSUNvZ1EwOU9VMVJTUVVsT1ZGSkZVRTlTVkY5SlZFVk5VMGxhUlR0Y2JseHVJQ0FnSUNBZ0lDQmpiMjV6ZEhKaGFXNTBjbVZ3YjNKMFcyOW1abk5sZEYwZ1BTQnBibVJsZUR0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1J5WVdsdWRISmxjRzl5ZEZ0dlptWnpaWFFnS3lBeFhTQTlJRzltWm5ObGRGOWliMlI1TG1sa08xeHVJQ0FnSUNBZ0lDQmpiMjV6ZEhKaGFXNTBjbVZ3YjNKMFcyOW1abk5sZENBcklESmRJRDBnYjNKcFoybHVMbmc3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBjbUZwYm5SeVpYQnZjblJiYjJabWMyVjBJQ3NnTTEwZ1BTQnZjbWxuYVc0dWVUdGNiaUFnSUNBZ0lDQWdZMjl1YzNSeVlXbHVkSEpsY0c5eWRGdHZabVp6WlhRZ0t5QTBYU0E5SUc5eWFXZHBiaTU2TzF4dUlDQWdJQ0FnSUNCamIyNXpkSEpoYVc1MGNtVndiM0owVzI5bVpuTmxkQ0FySURWZElEMGdZMjl1YzNSeVlXbHVkQzVuWlhSQ2NtVmhhMmx1WjBsdGNIVnNjMlZVYUhKbGMyaHZiR1FvS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb1UxVlFVRTlTVkY5VVVrRk9VMFpGVWtGQ1RFVWdKaVlnYVNBaFBUMGdNQ2tnZEhKaGJuTm1aWEpoWW14bFRXVnpjMkZuWlNoamIyNXpkSEpoYVc1MGNtVndiM0owTG1KMVptWmxjaXdnVzJOdmJuTjBjbUZwYm5SeVpYQnZjblF1WW5WbVptVnlYU2s3WEc0Z0lDQWdaV3h6WlNCcFppQW9hU0FoUFQwZ01Da2dkSEpoYm5ObVpYSmhZbXhsVFdWemMyRm5aU2hqYjI1emRISmhhVzUwY21Wd2IzSjBLVHRjYmlBZ2ZWeHVmVHRjYmx4dWMyVnNaaTV2Ym0xbGMzTmhaMlVnUFNCbWRXNWpkR2x2YmlBb1pYWmxiblFwSUh0Y2JpQWdhV1lnS0dWMlpXNTBMbVJoZEdFZ2FXNXpkR0Z1WTJWdlppQkdiRzloZERNeVFYSnlZWGtwSUh0Y2JpQWdJQ0F2THlCMGNtRnVjMlpsY21GaWJHVWdiMkpxWldOMFhHNGdJQ0FnYzNkcGRHTm9JQ2hsZG1WdWRDNWtZWFJoV3pCZEtTQjdYRzRnSUNBZ0lDQmpZWE5sSUUxRlUxTkJSMFZmVkZsUVJWTXVWMDlTVEVSU1JWQlBVbFE2SUh0Y2JpQWdJQ0FnSUNBZ2QyOXliR1J5WlhCdmNuUWdQU0J1WlhjZ1JteHZZWFF6TWtGeWNtRjVLR1YyWlc1MExtUmhkR0VwTzF4dUlDQWdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR05oYzJVZ1RVVlRVMEZIUlY5VVdWQkZVeTVEVDB4TVNWTkpUMDVTUlZCUFVsUTZJSHRjYmlBZ0lDQWdJQ0FnWTI5c2JHbHphVzl1Y21Wd2IzSjBJRDBnYm1WM0lFWnNiMkYwTXpKQmNuSmhlU2hsZG1WdWRDNWtZWFJoS1R0Y2JpQWdJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JqWVhObElFMUZVMU5CUjBWZlZGbFFSVk11VmtWSVNVTk1SVkpGVUU5U1ZEb2dlMXh1SUNBZ0lDQWdJQ0IyWldocFkyeGxjbVZ3YjNKMElEMGdibVYzSUVac2IyRjBNekpCY25KaGVTaGxkbVZ1ZEM1a1lYUmhLVHRjYmlBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQmpZWE5sSUUxRlUxTkJSMFZmVkZsUVJWTXVRMDlPVTFSU1FVbE9WRkpGVUU5U1ZEb2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRISmhhVzUwY21Wd2IzSjBJRDBnYm1WM0lFWnNiMkYwTXpKQmNuSmhlU2hsZG1WdWRDNWtZWFJoS1R0Y2JpQWdJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5Ymp0Y2JpQWdmU0JsYkhObElHbG1JQ2hsZG1WdWRDNWtZWFJoTG1OdFpDQW1KaUJ3ZFdKc2FXTmZablZ1WTNScGIyNXpXMlYyWlc1MExtUmhkR0V1WTIxa1hTa2djSFZpYkdsalgyWjFibU4wYVc5dWMxdGxkbVZ1ZEM1a1lYUmhMbU50WkYwb1pYWmxiblF1WkdGMFlTNXdZWEpoYlhNcE8xeHVmVHRjYmx4dVhHNWNiaTh2SUZkRlFsQkJRMHNnUms5UFZFVlNJQzh2WEc0dkx5QXVMM055WXk5M2IzSnJaWEl1YW5NaVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOVwiLCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwid29ya2VyLmpzXCIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd29ya2VyLWxvYWRlcj9pbmxpbmUsbmFtZT13b3JrZXIuanMhLi9zcmMvd29ya2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEyNl9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiV0hTXCJcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9