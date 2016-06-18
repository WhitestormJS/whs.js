(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":16}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":17}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":18}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":19}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":20}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":21}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":22}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":23}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":24}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

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
},{"../core-js/object/define-property":3}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

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
},{"../core-js/object/get-own-property-descriptor":4,"../core-js/object/get-prototype-of":5}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

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
},{"../core-js/object/create":2,"../core-js/object/set-prototype-of":6,"../helpers/typeof":15}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":15}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":8,"../core-js/symbol/iterator":9}],16:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":32,"../../modules/es6.object.assign":98}],17:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":32,"../../modules/es6.object.create":99}],18:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":32,"../../modules/es6.object.define-property":100}],19:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":32,"../../modules/es6.object.get-own-property-descriptor":101}],20:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":32,"../../modules/es6.object.get-prototype-of":102}],21:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":32,"../../modules/es6.object.set-prototype-of":103}],22:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":32,"../modules/es6.object.to-string":104,"../modules/es6.promise":105,"../modules/es6.string.iterator":106,"../modules/web.dom.iterable":110}],23:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":32,"../../modules/es6.object.to-string":104,"../../modules/es6.symbol":107,"../../modules/es7.symbol.async-iterator":108,"../../modules/es7.symbol.observable":109}],24:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":94,"../../modules/es6.string.iterator":106,"../../modules/web.dom.iterable":110}],25:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],26:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],27:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],28:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":51}],29:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
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
},{"./_to-index":86,"./_to-iobject":88,"./_to-length":89}],30:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
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
},{"./_cof":31,"./_wks":95}],31:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],32:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],33:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
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
},{"./_a-function":25}],34:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],35:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":40}],36:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":42,"./_is-object":51}],37:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],38:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
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
},{"./_object-gops":69,"./_object-keys":72,"./_object-pie":73}],39:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
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
},{"./_core":32,"./_ctx":33,"./_global":42,"./_hide":44}],40:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],41:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":28,"./_ctx":33,"./_is-array-iter":49,"./_iter-call":52,"./_to-length":89,"./core.get-iterator-method":96}],42:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],43:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],44:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":35,"./_object-dp":64,"./_property-desc":75}],45:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":42}],46:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":35,"./_dom-create":36,"./_fails":40}],47:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],48:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":31}],49:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":57,"./_wks":95}],50:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":31}],51:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],52:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
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
},{"./_an-object":28}],53:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":44,"./_object-create":63,"./_property-desc":75,"./_set-to-string-tag":80,"./_wks":95}],54:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
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
},{"./_export":39,"./_has":43,"./_hide":44,"./_iter-create":53,"./_iterators":57,"./_library":59,"./_object-gpo":70,"./_redefine":77,"./_set-to-string-tag":80,"./_wks":95}],55:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
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
},{"./_wks":95}],56:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],57:[function(require,module,exports){
module.exports = {};
},{}],58:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":72,"./_to-iobject":88}],59:[function(require,module,exports){
module.exports = true;
},{}],60:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
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
},{"./_fails":40,"./_has":43,"./_is-object":51,"./_object-dp":64,"./_uid":92}],61:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":31,"./_global":42,"./_task":85}],62:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
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
},{"./_fails":40,"./_iobject":48,"./_object-gops":69,"./_object-keys":72,"./_object-pie":73,"./_to-object":90}],63:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
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
},{"./_an-object":28,"./_dom-create":36,"./_enum-bug-keys":37,"./_html":45,"./_object-dps":65,"./_shared-key":81}],64:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
},{"./_an-object":28,"./_descriptors":35,"./_ie8-dom-define":46,"./_to-primitive":91}],65:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":28,"./_descriptors":35,"./_object-dp":64,"./_object-keys":72}],66:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":35,"./_has":43,"./_ie8-dom-define":46,"./_object-pie":73,"./_property-desc":75,"./_to-iobject":88,"./_to-primitive":91}],67:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
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

},{"./_object-gopn":68,"./_to-iobject":88}],68:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":37,"./_object-keys-internal":71}],69:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],70:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":43,"./_shared-key":81,"./_to-object":90}],71:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

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
},{"./_array-includes":29,"./_has":43,"./_shared-key":81,"./_to-iobject":88}],72:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":37,"./_object-keys-internal":71}],73:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],74:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":32,"./_export":39,"./_fails":40}],75:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],76:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":44}],77:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":44}],78:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
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
},{"./_an-object":28,"./_ctx":33,"./_is-object":51,"./_object-gopd":66}],79:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":32,"./_descriptors":35,"./_global":42,"./_object-dp":64,"./_wks":95}],80:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":43,"./_object-dp":64,"./_wks":95}],81:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":82,"./_uid":92}],82:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":42}],83:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":25,"./_an-object":28,"./_wks":95}],84:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
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
},{"./_defined":34,"./_to-integer":87}],85:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":31,"./_ctx":33,"./_dom-create":36,"./_global":42,"./_html":45,"./_invoke":47}],86:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":87}],87:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],88:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":34,"./_iobject":48}],89:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":87}],90:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":34}],91:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
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
},{"./_is-object":51}],92:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],93:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":32,"./_global":42,"./_library":59,"./_object-dp":64,"./_wks-ext":94}],94:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":95}],95:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":42,"./_shared":82,"./_uid":92}],96:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":30,"./_core":32,"./_iterators":57,"./_wks":95}],97:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
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
},{"./_add-to-unscopables":26,"./_iter-define":54,"./_iter-step":56,"./_iterators":57,"./_to-iobject":88}],98:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":39,"./_object-assign":62}],99:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":39,"./_object-create":63}],100:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":35,"./_export":39,"./_object-dp":64}],101:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":66,"./_object-sap":74,"./_to-iobject":88}],102:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":70,"./_object-sap":74,"./_to-object":90}],103:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":39,"./_set-proto":78}],104:[function(require,module,exports){

},{}],105:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , anObject           = require('./_an-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , setProto           = require('./_set-proto').set
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":25,"./_an-instance":27,"./_an-object":28,"./_classof":30,"./_core":32,"./_ctx":33,"./_export":39,"./_for-of":41,"./_global":42,"./_is-object":51,"./_iter-detect":55,"./_library":59,"./_microtask":61,"./_redefine-all":76,"./_set-proto":78,"./_set-species":79,"./_set-to-string-tag":80,"./_species-constructor":83,"./_task":85,"./_wks":95}],106:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
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
},{"./_iter-define":54,"./_string-at":84}],107:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
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
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":28,"./_descriptors":35,"./_enum-keys":38,"./_export":39,"./_fails":40,"./_global":42,"./_has":43,"./_hide":44,"./_is-array":50,"./_keyof":58,"./_library":59,"./_meta":60,"./_object-create":63,"./_object-dp":64,"./_object-gopd":66,"./_object-gopn":68,"./_object-gopn-ext":67,"./_object-gops":69,"./_object-keys":72,"./_object-pie":73,"./_property-desc":75,"./_redefine":77,"./_set-to-string-tag":80,"./_shared":82,"./_to-iobject":88,"./_to-primitive":91,"./_uid":92,"./_wks":95,"./_wks-define":93,"./_wks-ext":94}],108:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":93}],109:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":93}],110:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":42,"./_hide":44,"./_iterators":57,"./_wks":95,"./es6.array.iterator":97}],111:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var THREE = _interopRequireWildcard(_three);

var _whitestormjsPhysijs = (typeof window !== "undefined" ? window['Physijs'] : typeof global !== "undefined" ? global['Physijs'] : null);

var Physijs = _interopRequireWildcard(_whitestormjsPhysijs);

var _whitestormjs = (typeof window !== "undefined" ? window['WHS'] : typeof global !== "undefined" ? global['WHS'] : null);

var _ShaderTerrain = require('./shaders/ShaderTerrain');

var _ShaderTerrain2 = _interopRequireDefault(_ShaderTerrain);

var _persets = require('./persets');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Terrain = function (_Shape) {
  (0, _inherits3.default)(Terrain, _Shape);

  function Terrain() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Terrain);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Terrain).call(this, params, 'terrain'));

    (0, _whitestormjs.extend)(params.geometry, {
      width: 1,
      height: 1,
      depth: 1,
      map: false
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Terrain.prototype), 'wrap', _this).call(_this, 'wait').then(function (obj) {
      console.log(obj);
      obj.rotation.set(Math.PI / 180 * -90, 0, 0);
    });
    return _this;
  }

  (0, _createClass3.default)(Terrain, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var promise = new _promise2.default(function (resolve) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', params.geometry.width);
        canvas.setAttribute('height', params.geometry.height);

        var ctx = canvas.getContext('2d');
        ctx.drawImage(params.geometry.map, 0, 0);

        var textures = typeof params.material[0] === 'string' ? (0, _persets.loadPerset)((0, _persets.persets)()[params.material[0]], params.material[1]) : params.material;

        var rx = 256,
            ry = 256;

        var pars = {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,

          format: THREE.RGBFormat
        };

        // Heightmap.
        var heightMap = new THREE.WebGLRenderTarget(rx, ry, pars);

        heightMap.texture = _whitestormjs.TextureLoader.load('../../assets/terrain/default_terrain.png');

        // Normalmap.
        var normalMap = new THREE.WebGLRenderTarget(rx, ry, pars);

        normalMap.texture = _whitestormjs.TextureLoader.load('../../assets/terrain/NormalMap.png');

        // Specularmap.
        var specularMap = new THREE.WebGLRenderTarget(256, 256, pars); // 2048

        specularMap.texture = _whitestormjs.TextureLoader.load('../../assets/terrain/default_terrain.png');

        // Terrain shader (ShaderTerrain.js).
        var terrainShader = (0, _ShaderTerrain2.default)(textures).terrain;
        var uniformsTerrain = (0, _assign2.default)(THREE.UniformsUtils.clone(terrainShader.uniforms), {
          fog: true,
          lights: true
        }, THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.ambient, THREE.UniformsLib.shadowmap, {
          ambient: { type: 'c', value: new THREE.Color(0xffffff) },
          emissive: { type: 'c', value: new THREE.Color(0x000000) },
          wrapRGB: { type: 'v3', value: new THREE.Vector3(1, 1, 1) }
        });

        uniformsTerrain.tDisplacement.value = heightMap;
        uniformsTerrain.spotShadowMap.value = [normalMap];

        uniformsTerrain.uDisplacementScale.value = 100;
        uniformsTerrain.uRepeatOverlay.value.set(6, 6);

        for (var _i = 0; _i < textures.length; _i++) {
          uniformsTerrain['textureBound' + _i] = { type: 't', value: textures[_i].texture };
        }var material = new THREE.ShaderMaterial({
          uniforms: uniformsTerrain,
          vertexShader: terrainShader.vertexShader,
          fragmentShader: terrainShader.fragmentShader,
          lights: true,
          fog: true,
          side: THREE.FrontSide,
          shading: THREE.SmoothShading
        });

        var geom = new THREE.PlaneGeometry(256, 256, 255, 255);
        geom.verticesNeedUpdate = true;

        var index = 0,
            i = 0;

        var imgdata = ctx.getImageData(0, 0, 256, 256).data;

        for (var x = 0; x <= 255; x++) {
          for (var y = 255; y >= 0; y--) {
            geom.vertices[index].z = imgdata[i] / 255 * 100;

            i += 4;
            index++;
          }
        }

        geom.computeVertexNormals();
        geom.computeFaceNormals();
        geom.computeTangents();

        _this2.setNative(new Physijs.HeightfieldMesh(geom, Physijs.createMaterial(material, 1.0, 0.8), params.mass));

        _this2.getNative().updateMatrix();

        resolve();
      });

      (0, _get3.default)((0, _getPrototypeOf2.default)(Terrain.prototype), 'wait', this).call(this, promise);
      return promise;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Terrain({ build: false }).copy(this);
    }
  }]);
  return Terrain;
}(_whitestormjs.Shape);

exports.default = Terrain;
module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./persets":112,"./shaders/ShaderTerrain":113,"babel-runtime/core-js/object/assign":1,"babel-runtime/core-js/object/get-prototype-of":5,"babel-runtime/core-js/promise":7,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/helpers/get":12,"babel-runtime/helpers/inherits":13,"babel-runtime/helpers/possibleConstructorReturn":14}],112:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persets = persets;
exports.loadPerset = loadPerset;
function persets() {
  return {
    default: [{
      from: [0.1, 0.25],
      to: [0.24, 0.26],
      scale: 10.0
    }, {
      from: [0.24, 0.27],
      to: [0.28, 0.31],
      scale: 10.0
    }, {
      from: [0.28, 0.32],
      to: [0.35, 0.40],
      scale: 20.0
    }, {
      from: [0.30, 0.40],
      to: [0.40, 0.70],
      scale: 20.0
    }, {
      from: [0.42, 0.45],
      scale: 10.0
    }]
  };
}

function loadPerset(perset, textures) {
  for (var i = 0; i < perset.length; i++) {
    perset[i].texture = textures[i];
  }return perset;
}


},{}],113:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shaderTerrain;

var _three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function shaderTerrain(textures) {
  var defineTex = [];
  var typeTex = [];
  var nameTex = [];

  for (var i = 0; i < textures.length; i++) {
    defineTex.push('uniform sampler2D textureBound' + i + ';');

    if (textures[i].to) {
      typeTex.push('\n        vec4 tex' + i + ' = (smoothstep(' + textures[i].from[0] + (textures[i].from[0] % 1 === 0 ? '.0' : '') + ', ' + textures[i].from[1] + (textures[i].from[1] % 1 === 0 ? '.0' : '') + ', vAmount)\n        - smoothstep(' + textures[i].to[0] + (textures[i].to[0] % 1 === 0 ? '.0' : '') + ', ' + textures[i].to[1] + (textures[i].to[1] % 1 === 0 ? '.0' : '') + ', vAmount))\n        * texture2D( textureBound' + i + ', vUv * ' + textures[i].scale + (textures[i].scale % 1 === 0 ? '.0' : '') + ' );\n      ');
    } else {
      typeTex.push('\n        vec4 tex' + i + ' = (smoothstep(' + textures[i].from[0] + (textures[i].from[0] % 1 === 0 ? '.0' : '') + ', ' + textures[i].from[1] + (textures[i].from[1] % 1 === 0 ? '.0' : '') + ', vAmount))\n        * texture2D( textureBound' + i + ', vUv * ' + textures[i].scale + (textures[i].scale % 1 === 0 ? '.0' : '') + ' );\n      ');
    }

    nameTex.push(' + tex' + i);
  }

  return {
    terrain: {
      uniforms: _three2.default.UniformsUtils.merge([_three2.default.UniformsLib.fog, _three2.default.UniformsLib.lighta, _three2.default.UniformsLib.shadowmap, {
        enableDiffuse1: { type: 'i', value: 0 },
        enableDiffuse2: { type: 'i', value: 0 },
        enableSpecular: { type: 'i', value: 0 },
        enableReflection: { type: 'i', value: 0 },

        tDiffuse1: { type: 't', value: null },
        tDiffuse2: { type: 't', value: null },
        tDetail: { type: 't', value: null },
        tNormal: { type: 't', value: null },
        tSpecular: { type: 't', value: null },
        tDisplacement: { type: 't', value: null },

        uNormalScale: { type: 'f', value: 1.0 },

        uDisplacementBias: { type: 'f', value: 0.0 },
        uDisplacementScale: { type: 'f', value: 1.0 },

        diffuse: { type: 'c', value: new _three2.default.Color(0xeeeeee) },
        specular: { type: 'c', value: new _three2.default.Color(0x111111) },
        shininess: { type: 'f', value: 30 },
        opacity: { type: 'f', value: 1 },

        uRepeatBase: { type: 'v2', value: new _three2.default.Vector2(1, 1) },
        uRepeatOverlay: { type: 'v2', value: new _three2.default.Vector2(1, 1) },

        uOffset: { type: 'v2', value: new _three2.default.Vector2(0, 0) }
      }]),

      fragmentShader: '\n        uniform vec3 diffuse;\n        uniform vec3 emissive;\n        uniform float opacity;\n        varying vec3 vLightFront;\n        varying vec3 vLightBack;\n        uniform vec2 uRepeatOverlay;\n        uniform vec2 uRepeatBase;\n        uniform vec2 uOffset;\n        uniform float uNormalScale;\n        uniform sampler2D tNormal;\n        ' + defineTex.join('\n') + '\n        varying vec3 vTangent;\n        varying vec3 vBinormal;\n        varying vec3 vNormal;\n        varying vec3 vViewPosition;\n      \n      ' + [_three2.default.ShaderChunk.common, _three2.default.ShaderChunk.packing, _three2.default.ShaderChunk.color_pars_fragment, _three2.default.ShaderChunk.uv_pars_fragment, _three2.default.ShaderChunk.uv2_pars_fragment, _three2.default.ShaderChunk.map_pars_fragment, _three2.default.ShaderChunk.alphamap_pars_fragment, _three2.default.ShaderChunk.aomap_pars_fragment, _three2.default.ShaderChunk.lightmap_pars_fragment, _three2.default.ShaderChunk.emissivemap_pars_fragment, _three2.default.ShaderChunk.envmap_pars_fragment, _three2.default.ShaderChunk.bsdfs, _three2.default.ShaderChunk.ambient_pars, _three2.default.ShaderChunk.lights_pars, _three2.default.ShaderChunk.fog_pars_fragment, _three2.default.ShaderChunk.shadowmap_pars_fragment, _three2.default.ShaderChunk.shadowmask_pars_fragment, _three2.default.ShaderChunk.specularmap_pars_fragment].join('\n') + '\n\n        varying vec2 vUv;\n        varying float vAmount;\n        void main() {\n          // UVs.\n          vec2 uvOverlay = uRepeatOverlay * vUv + uOffset;\n          vec2 uvBase = uRepeatBase * vUv;\n          vec3 specularTex = vec3( 1.0 );\n          vec3 normalTex = texture2D( tNormal, uvOverlay ).xyz * 2.0 - 1.0;\n          normalTex.xy *= uNormalScale;\n          normalTex = normalize( normalTex );\n          mat3 tsb = mat3( vTangent, vBinormal, vNormal );\n\n          vec3 finalNormal = tsb * normalTex;\n          vec3 normal = normalize( finalNormal );\n          vec3 viewPosition = normalize( vViewPosition );\n          vec3 shadowMask = vec3( 1.0 );\n          vec3 totalAmbientLight = ambientLightColor;\n          vec4 diffuseColor = vec4(0.0);\n\n          // Color by texture.\n          ' + typeTex.join('\n') + '\n\n          diffuseColor = vec4(0.0, 0.0, 0.0, 1.0)\n          ' + nameTex.join('') + ';\n\n          ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n          vec3 totalEmissiveLight = emissive;\n      ' + [_three2.default.ShaderChunk.logdepthbuf_fragment, _three2.default.ShaderChunk.map_fragment, _three2.default.ShaderChunk.color_fragment, _three2.default.ShaderChunk.alphamap_fragment, _three2.default.ShaderChunk.alphatest_fragment, _three2.default.ShaderChunk.specularmap_fragment, _three2.default.ShaderChunk.emissivemap_fragment].join('\n') + '\n          reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n     \n\n      ' + _three2.default.ShaderChunk.lightmap_fragment + '\n\n          reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\n          #ifdef DOUBLE_SIDED\n\n            reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\n          #else\n\n            reflectedLight.directDiffuse = vLightFront;\n\n          #endif\n\n          reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n      \n      ' + _three2.default.ShaderChunk.aomap_fragment + '\n\n          vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveLight;\n\n          gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n      \n      ' + [_three2.default.ShaderChunk.envmap_fragment, _three2.default.ShaderChunk.linear_to_gamma_fragment, _three2.default.ShaderChunk.fog_fragment].join('\n') + '\n\n          }\n      ',

      vertexShader: '\n        #define TERRAIN;\n        varying vec3 vLightFront;\n        #ifdef DOUBLE_SIDED\n          varying vec3 vLightBack;\n        #endif\n        \n        varying float vAmount;\n        attribute vec4 tangent;\n        uniform vec2 uRepeatBase;\n        uniform sampler2D tNormal;\n        #ifdef VERTEX_TEXTURES\n          uniform sampler2D tDisplacement;\n          uniform float uDisplacementScale;\n          uniform float uDisplacementBias;\n        #endif\n        varying vec3 vTangent;\n        varying vec3 vBinormal;\n        varying vec3 vNormal;\n        varying vec2 vUv;\n        varying vec3 vViewPosition;\n      \n      ' + [_three2.default.ShaderChunk.common, _three2.default.ShaderChunk.uv_pars_vertex, _three2.default.ShaderChunk.uv2_pars_vertex, _three2.default.ShaderChunk.envmap_pars_vertex, _three2.default.ShaderChunk.bsdfs, _three2.default.ShaderChunk.lights_pars, _three2.default.ShaderChunk.color_pars_vertex, _three2.default.ShaderChunk.morphtarget_pars_vertex, _three2.default.ShaderChunk.skinning_pars_vertex, _three2.default.ShaderChunk.shadowmap_pars_vertex, _three2.default.ShaderChunk.logdepthbuf_pars_vertex].join('\n') + '\n\n        void main() {\n      \n      ' + [_three2.default.ShaderChunk.uv_vertex, _three2.default.ShaderChunk.uv2_vertex, _three2.default.ShaderChunk.color_vertex, _three2.default.ShaderChunk.beginnormal_vertex, _three2.default.ShaderChunk.morphnormal_vertex, _three2.default.ShaderChunk.skinbase_vertex, _three2.default.ShaderChunk.skinnormal_vertex, _three2.default.ShaderChunk.defaultnormal_vertex, _three2.default.ShaderChunk.begin_vertex, _three2.default.ShaderChunk.morphtarget_vertex, _three2.default.ShaderChunk.skinning_vertex, _three2.default.ShaderChunk.project_vertex, _three2.default.ShaderChunk.logdepthbuf_vertex, _three2.default.ShaderChunk.worldpos_vertex].join('\n') + '\n\n          vNormal = normalize( normalMatrix * normal);\n          // Tangent and binormal vectors.\n          vTangent = normalize( normalMatrix * tangent.xyz );\n          vBinormal = cross( vNormal, vTangent ) * tangent.w;\n          vBinormal = normalize( vBinormal );\n          // Texture coordinates.\n          vUv = uv;\n          vec2 uvBase = uv * uRepeatBase;\n          // displacement mapping\n          // worldPosition = modelMatrix * vec4( position.xyz, 1.0 );\n          mvPosition = modelViewMatrix * vec4( position, 1.0 );\n          transformedNormal = normalize( normalMatrix * normal );\n          gl_Position = projectionMatrix * mvPosition;\n          vViewPosition = -mvPosition.xyz;\n          vAmount = position.z * 0.005 + 0.1;\n      \n      ' + [_three2.default.ShaderChunk.envmap_vertex, _three2.default.ShaderChunk.lights_lambert_vertex, _three2.default.ShaderChunk.shadowmap_vertex].join('\n') + '\n\n         }\n      ',

      side: _three2.default.DoubleSide,
      shading: _three2.default.SmoothShading
    }
  };
}
module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],114:[function(require,module,exports){
'use strict';

var defaultTerrainMap = new Image();
defaultTerrainMap.src = 'data:image/png;base64,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';

module.exports = defaultTerrainMap;

},{}],115:[function(require,module,exports){
'use strict';

var _whsTerrain = require('whs-terrain');

var _whsTerrain2 = _interopRequireDefault(_whsTerrain);

var _default_terrain = require('./_assets/terrain/default_terrain');

var _default_terrain2 = _interopRequireDefault(_default_terrain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  },

  rWidth: 1,
  rHeight: 1,

  background: 0x70DBFF
});

window.terrain = new _whsTerrain2.default({
  geometry: {
    map: _default_terrain2.default,
    depth: 100,
    width: 256,
    height: 256
  },

  mass: 0,

  material: ['default', [WHS.texture('../../_assets/textures/terrain/dirt-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/sand-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/grass-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/rock-512.jpg', {}), WHS.texture('../../_assets/textures/terrain/snow-512.jpg', {})]],

  pos: {
    x: 0,
    y: 0,
    z: 0
  }
});
window.terrain.addTo(GAME, 'wait');

// NOTE: Default light.
new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.2
  },

  pos: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
}).addTo(GAME);

// NOTE: Default light.
new WHS.SpotLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 0.3,
    distance: 500
  },

  shadowmap: {
    width: 2048,
    height: 2048,
    top: 0,
    fov: 90
  },

  pos: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
}).addTo(GAME);

var parrot = new WHS.Morph({

  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: '../../_assets/models/morph/parrot.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  pos: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 0.4,
    speed: 200
  }

});

var parrotPath = [new THREE.CubicBezierCurve3(new THREE.Vector3(-100, 100, 50), new THREE.Vector3(-200, 120, -50), new THREE.Vector3(200, 120, -50), new THREE.Vector3(100, 100, 50)), new THREE.CubicBezierCurve3(new THREE.Vector3(100, 100, 50), new THREE.Vector3(-200, 80, 150), new THREE.Vector3(200, 60, 150), new THREE.Vector3(-100, 100, 50))];

var parrotgoes = new THREE.CurvePath();

parrotgoes.add(parrotPath[0]);
parrotgoes.add(parrotPath[1]);

var flamingo = new WHS.Morph({
  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: '../../_assets/models/morph/flamingo.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  pos: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 2,
    speed: 50
  }
});

var flamingoPath = [new THREE.CubicBezierCurve3(new THREE.Vector3(-100, 100, 50), new THREE.Vector3(-100, 160, 300), new THREE.Vector3(200, 180, 30), new THREE.Vector3(100, 140, 80)), new THREE.CubicBezierCurve3(new THREE.Vector3(100, 140, 80), new THREE.Vector3(200, 80, 150), new THREE.Vector3(-200, 60, -100), new THREE.Vector3(200, 100, 350)), new THREE.CubicBezierCurve3(new THREE.Vector3(200, 100, 350), new THREE.Vector3(200, 80, 150), new THREE.Vector3(-200, 60, -100), new THREE.Vector3(-100, 100, 50))];

var flamingogoes = new THREE.CurvePath();

flamingogoes.add(flamingoPath[0]);
flamingogoes.add(flamingoPath[1]);
flamingogoes.add(flamingoPath[2]);

flamingo.addTo(GAME, 'wait').then(function (obj) {
  obj.follow(parrotgoes, // flamingogoes
  26000, true);
});

parrot.addTo(GAME, 'wait').then(function (obj) {
  obj.follow(flamingogoes, 20000, true);
});

new WHS.Skybox({
  path: '../../_assets/textures/skybox/skymap',
  imgSuffix: '.png',
  skyType: 'sphere',
  radius: GAME.getCamera().__params.camera.far,
  rot: { y: Math.PI / 180 * -90 },
  pos: { y: -200 }
}).addTo(GAME);

var box = new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,
  onlyvis: false,

  material: {
    kind: 'lambert',
    map: WHS.texture('../../_assets/textures/box.jpg')
  },

  pos: {
    x: 50,
    y: 70,
    z: 60
  }
});

GAME.add(box).then(function () {
  var checker1 = new WHS.Loop(function () {
    if (box.position.y < -200) {
      box.position.set(50, 70, 60);

      box.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      box.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  GAME.addLoop(checker1);

  checker1.start();
});

new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,

  material: {
    kind: 'lambert',
    map: WHS.texture('../../_assets/textures/box.jpg')
  },

  pos: {
    x: 30,
    y: 50,
    z: 0
  }
}).addTo(GAME);

var person = new WHS.Sphere({
  geometry: {
    radius: 2
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'lambert',
    rest: 0,
    fri: 1
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
});

GAME.add(person).then(function () {
  var checker2 = new WHS.Loop(function () {
    if (person.position.y < -200) {
      person.position.set(0, 100, 0);

      person.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      person.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  GAME.addLoop(checker2);

  checker2.start();
});

// EFFECTS.
// const effects = new WHS.Wagner(GAME);

// effects.add( "ZoomBlurPass", {} );
// effects.add('VignettePass', {});

// var directionalblurEffect = GAME.addWagner( "motionBlurPass", {} ).apply();

GAME.setControls(WHS.firstPersonControls(person, { // *WHS* object, Pointer lock controls object, Jquery blocker div selector.
  speed: 5 // 5
}));

/* var grasscoords = [];

for (var x = 0; x < 20; x++) {
  for (var y = 0; y < 15; y++) {
  grasscoords.push({
    x: x,
    y: y
  });

  }
}*/
/*
var curve = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( -100, 100, 50 ),
      new THREE.Vector3( -100, 160, 300 ),
      new THREE.Vector3( 200, 180, 30 ),
      new THREE.Vector3( 100, 140, 80 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0xff0000
  }
});

var curve2 = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( 100, 140, 80 ),
      new THREE.Vector3( 200, 80, 150 ),
      new THREE.Vector3( -200, 60, -100 ),
      new THREE.Vector3( 200, 100, 350 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0x00ff00
  }
});

var curve3 = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( 200, 100, 350 ),
      new THREE.Vector3( 200, 80, 150 ),
      new THREE.Vector3( -200, 60, -100 ),
      new THREE.Vector3( -100, 100, 50 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0x0000ff
  }
});

curve.addTo( GAME );
curve2.addTo( GAME );
curve3.addTo( GAME );
*/
GAME.start();

},{"./_assets/terrain/default_terrain":114,"whs-terrain":111}]},{},[115]);
