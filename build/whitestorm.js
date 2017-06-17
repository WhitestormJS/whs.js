/*! WhitestormJS Framework v2.0.0-beta.9.1 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["three"], factory);
	else if(typeof exports === 'object')
		exports["WHS"] = factory(require("three"));
	else
		root["WHS"] = factory(root["THREE"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 258);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(69);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(155);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(152);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(70);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(70);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(151);

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

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Component__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__prototype_attributes__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__errors__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeshComponent; });







var _dec, _class, _class2, _temp;







var MeshComponent = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__prototype_attributes__["a" /* attributes */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__prototype_attributes__["b" /* copy */])('position', 'rotation', 'quaternion', 'scale'), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__prototype_attributes__["c" /* mirror */])('material', 'geometry')), _dec(_class = (_temp = _class2 = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(MeshComponent, _Component);

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(MeshComponent, null, [{
    key: 'custom',


    // CUSTOM GEOMETRY HANDLING

    value: function custom(geom) {
      var constructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"];

      return function (_MeshComponent) {
        __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_class3, _MeshComponent);

        function _class3() {
          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, _class3);

          return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
        }

        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(_class3, [{
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
  }, {
    key: 'create',
    value: function create(geom, params, constructor) {
      return new (MeshComponent.custom(geom, constructor))(params);
    }
  }]);

  function MeshComponent(params) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MeshComponent.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MeshComponent.instructions;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, MeshComponent);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (MeshComponent.__proto__ || Object.getPrototypeOf(MeshComponent)).call(this, params, defaults, instructions));

    if (_this.params.build) {
      var build = _this.build(_this.params);

      if (!build) {
        throw new __WEBPACK_IMPORTED_MODULE_9__errors__["a" /* CompositionError */]('MeshComponent', '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.', _this);
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

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(MeshComponent, [{
    key: 'build',
    value: function build() {
      throw new __WEBPACK_IMPORTED_MODULE_9__errors__["a" /* CompositionError */]('MeshComponent', 'Instance should have it\'s own .build().', this);
    }
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

  }, {
    key: 'copy',
    value: function copy(source) {
      var _this4 = this;

      return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default()(MeshComponent.prototype.__proto__ || Object.getPrototypeOf(MeshComponent.prototype), 'copy', this).call(this, source, function () {
        _this4.position.copy(source.position);
        _this4.rotation.copy(source.rotation);
        _this4.quaternion.copy(source.quaternion);
      });
    }
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
}(__WEBPACK_IMPORTED_MODULE_7__Component__["a" /* Component */]), _class2.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__Component__["a" /* Component */].defaults, {

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
}, _temp)) || _class);




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


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
		scene = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"](),
		camera = new __WEBPACK_IMPORTED_MODULE_0_three__["OrthographicCamera"](-1, 1, 1, -1, 0, 1),
		quad = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_0_three__["PlaneBufferGeometry"](2, 2), null)
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Pass;



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(154);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(153);

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

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adaptive_luminosity_js__ = __webpack_require__(212);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__adaptive_luminosity_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bokeh_js__ = __webpack_require__(213);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_1__bokeh_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bokeh2_js__ = __webpack_require__(214);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_2__bokeh2_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__combine_js__ = __webpack_require__(215);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_3__combine_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__convolution_js__ = __webpack_require__(216);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_4__convolution_js__["a"]; });
/* unused harmony reexport KernelSize */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__copy_js__ = __webpack_require__(217);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__copy_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__depth_js__ = __webpack_require__(218);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_6__depth_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dot_screen_js__ = __webpack_require__(219);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_7__dot_screen_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__film_js__ = __webpack_require__(220);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_8__film_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__glitch_js__ = __webpack_require__(221);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_9__glitch_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__god_rays_js__ = __webpack_require__(222);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_10__god_rays_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__luminosity_js__ = __webpack_require__(225);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_11__luminosity_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pixelation_js__ = __webpack_require__(226);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_12__pixelation_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shock_wave_js__ = __webpack_require__(227);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_13__shock_wave_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__smaa_blend_js__ = __webpack_require__(228);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_14__smaa_blend_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__smaa_color_edges_js__ = __webpack_require__(229);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_15__smaa_color_edges_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__smaa_weights_js__ = __webpack_require__(230);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_16__smaa_weights_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__tone_mapping_js__ = __webpack_require__(231);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_17__tone_mapping_js__["a"]; });
/**
 * A collection of shader materials that are used in the post processing passes.
 *
 * @module postprocessing/materials
 */





















/***/ }),
/* 10 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(52)('wks')
  , uid        = __webpack_require__(32)
  , Symbol     = __webpack_require__(12).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(75)
  , defined = __webpack_require__(44);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Component__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__prototype_attributes__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__errors__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LightComponent; });







var _dec, _class, _class2, _temp;






var LightComponent = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__prototype_attributes__["a" /* attributes */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__prototype_attributes__["b" /* copy */])('position', 'rotation', 'quaternion', 'target')), _dec(_class = (_temp = _class2 = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(LightComponent, _Component);

  function LightComponent(params) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LightComponent.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LightComponent.instructions;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, LightComponent);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (LightComponent.__proto__ || Object.getPrototypeOf(LightComponent)).call(this, params, defaults, instructions));

    if (_this.params.build) {
      var build = _this.build(_this.params);

      if (!build) {
        throw new __WEBPACK_IMPORTED_MODULE_8__errors__["a" /* CompositionError */]('LightComponent', '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.', _this);
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

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(LightComponent, [{
    key: 'build',
    value: function build() {
      throw new __WEBPACK_IMPORTED_MODULE_8__errors__["a" /* CompositionError */]('MeshComponent', 'Instance should have it\'s own .build().', this);
    }
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

  }, {
    key: 'copy',
    value: function copy(source) {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get___default()(LightComponent.prototype.__proto__ || Object.getPrototypeOf(LightComponent.prototype), 'copy', this).call(this, source, function () {
        if (_this3.target) _this3.target.copy(source.target());

        _this3.position.copy(source.position);
        _this3.rotation.copy(source.rotation);
        _this3.quaternion.copy(source.quaternion);
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor({ build: false }).copy(this);
    }
  }]);

  return LightComponent;
}(__WEBPACK_IMPORTED_MODULE_6__Component__["a" /* Component */]), _class2.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__Component__["a" /* Component */].defaults, {

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
}), _class2.instructions = {
  position: ['x', 'y', 'z'],
  rotation: ['x', 'y', 'z'],
  scale: ['x', 'y', 'z']
}, _temp)) || _class);




/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(22)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(12)
  , core      = __webpack_require__(10)
  , ctx       = __webpack_require__(72)
  , hide      = __webpack_require__(23)
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

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(21)
  , IE8_DOM_DEFINE = __webpack_require__(74)
  , toPrimitive    = __webpack_require__(55)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(15) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompositionError; });
/* unused harmony export DependencyError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ManagerError; });



var CompositionError = function (_Error) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(CompositionError, _Error);

  function CompositionError(classInstance, message, component) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CompositionError);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CompositionError.__proto__ || Object.getPrototypeOf(CompositionError)).call(this, '@' + classInstance + ': ' + message));

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
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(DependencyError, _Error2);

  function DependencyError(classInstance, message, activeModule) {
    var dependencyModule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DependencyError);

    var _this2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (DependencyError.__proto__ || Object.getPrototypeOf(DependencyError)).call(this, '@' + classInstance + ': ' + message));

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
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(ManagerError, _Error3);

  function ManagerError(classInstance, message, component) {
    var activeModule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ManagerError);

    var _this3 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ManagerError.__proto__ || Object.getPrototypeOf(ManagerError)).call(this, '@' + classInstance + ': ' + message));

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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(61)))

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pass; });


var Pass = function () {
  function Pass(name) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Pass);

    this.uniqName = name === undefined ? 'pass_' + ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1) : name;

    // if set to true, the pass is processed by the composer
    this.enabled = true;

    // if set to true, the pass indicates to swap read and write buffer after rendering
    this.needsSwap = true;

    // if set to true, the pass clears its buffer before rendering
    this.clear = false;

    // if set to true, the result of the pass is rendered to screen
    this.renderToScreen = false;
  }

  /**
   * Resize a pass.
   * @param {Number} width : in pixels.
   * @param {Number} height : in pixels.
   */


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Pass, [{
    key: "setSize",
    value: function setSize(width, height) {}

    /**
     * Render a pass
     * @param  {THREE.WebGLRenderer} renderer : The renderer used to render the pass objects.
     * @param  {THREE.WebGLRenderTarget.Buffer} writeBuffer : The write buffer used to do buffer swapping.
     * @param  {THREE.WebGLRenderTarget.Buffer} readBuffer  : The read buffer used to do buffer swapping.
     * @param  {Number} delta : The delta time since the previous frame.
     * @param  {Boolean} maskActive : Flag indicating the Composer that this pass use masking.
     */

  }, {
    key: "render",
    value: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {
      console.error("Pass: .render() must be implemented in derived pass.");
    }

    /**
     * Get the name of the pass
     * @return {String} Unique name
     */

  }, {
    key: "name",
    get: function get() {
      return this.uniqName;
    }
  }]);

  return Pass;
}();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(25);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(18)
  , createDesc = __webpack_require__(31);
module.exports = __webpack_require__(15) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_index__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ModuleSystem__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ModuleManager__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__errors__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });






var _class, _temp;






var Component = (_temp = _class = function (_ModuleSystem) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Component, _ModuleSystem);

  // For keeping children components;

  // Collection of promises;
  function Component() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Component.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Component.instructions;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Component);

    // Apply polyfilled parameters to .params;
    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    _this._wait = [];
    _this.modules = [];
    _this.children = [];
    _this.params = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_index__["a" /* extend */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_index__["c" /* transformData */])(params, instructions), defaults);
    if (_this.params.manager) _this.manager = new __WEBPACK_IMPORTED_MODULE_7__ModuleManager__["a" /* ModuleManager */]();

    _this.modules = _this.params.modules;

    _this.integrateModules();
    return _this;
  }

  // PROMISES (Asynchronous code)

  // FIXME: possible use of Promise.all(this._wait) only in .defer();
  // Collection of modules;


  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Component, [{
    key: 'wait',
    value: function wait(promise) {
      if (promise) this._wait.push(promise);
      return Promise.all(this._wait);
    }
  }, {
    key: 'defer',
    value: function defer(func) {
      var _this2 = this;

      if (this.isDeffered) this.wait().then(function () {
        return func(_this2);
      });else func(this);
    }

    // PARAMETERS

  }, {
    key: 'updateParams',
    value: function updateParams() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.params = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_index__["a" /* extend */])(params, this.params);
      return this.params;
    }

    // COPYING & CLONING

  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor(this.params).copy(this);
    }
  }, {
    key: 'copy',
    value: function copy(source, customize) {
      this.params = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, source.params);

      if (source.native) this.native = source.native.clone(source.params);
      if (customize) customize();
      this.integrateModules(source);

      return this;
    }

    // ADD

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
  }, {
    key: 'remove',
    value: function remove(object) {
      object.parent = null;
      this.native.remove(object.native);
    }
  }, {
    key: 'addTo',
    value: function addTo(object) {
      return object.add(this);
    }

    // GETTERS & SETTERS

  }, {
    key: 'isDeffered',
    get: function get() {
      return this._wait.length > 0;
    }

    // .manager

  }, {
    key: 'manager',
    get: function get() {
      if (this._manager) return this._manager;

      throw new __WEBPACK_IMPORTED_MODULE_8__errors__["b" /* ManagerError */]('Component', 'ModuleManager is not used in this component. \'manager\' parameter should be set as \'true\'', this);
    },
    set: function set(manager) {
      this._manager = manager;
    }

    // .native

  }, {
    key: 'native',
    get: function get() {
      return this._native;
    },
    set: function set(mesh) {
      this._native = mesh;
      this._native.component = this;
      return this._native;
    }
  }]);

  return Component;
}(__WEBPACK_IMPORTED_MODULE_6__ModuleSystem__["a" /* ModuleSystem */]), _class.defaults = {
  modules: [],
  manager: true
}, _class.instructions = {}, _temp);




/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(79)
  , enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Component__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__prototype_attributes__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__errors__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraComponent; });







var _dec, _class, _class2, _temp;






var CameraComponent = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__prototype_attributes__["a" /* attributes */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__prototype_attributes__["b" /* copy */])('position', 'rotation', 'quaternion', 'target')), _dec(_class = (_temp = _class2 = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(CameraComponent, _Component);

  function CameraComponent(params) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CameraComponent.defaults;
    var instructions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CameraComponent.instructions;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, CameraComponent);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CameraComponent.__proto__ || Object.getPrototypeOf(CameraComponent)).call(this, params, defaults, instructions));

    if (_this.params.build) {
      var build = _this.build(_this.params);

      if (!build) {
        throw new __WEBPACK_IMPORTED_MODULE_8__errors__["a" /* CompositionError */]('CameraComponent', '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.', _this);
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

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(CameraComponent, [{
    key: 'build',
    value: function build() {
      throw new __WEBPACK_IMPORTED_MODULE_8__errors__["a" /* CompositionError */]('CameraComponent', 'Instance should have it\'s own .build().', this);
    }
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

    // COPYING & CLONING

  }, {
    key: 'copy',
    value: function copy(source) {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get___default()(CameraComponent.prototype.__proto__ || Object.getPrototypeOf(CameraComponent.prototype), 'copy', this).call(this, source, function () {
        if (_this3.target) _this3.target.copy(source.target());

        _this3.position.copy(source.position);
        _this3.rotation.copy(source.rotation);
        _this3.quaternion.copy(source.quaternion);
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor({ build: false }).copy(this);
    }
  }]);

  return CameraComponent;
}(__WEBPACK_IMPORTED_MODULE_6__Component__["a" /* Component */]), _class2.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__Component__["a" /* Component */].defaults, {

  build: true,

  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
}), _class2.instructions = {
  position: ['x', 'y', 'z'],
  rotation: ['x', 'y', 'z'],
  scale: ['x', 'y', 'z']
}, _temp)) || _class);




/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loop; });




var Loop = function () {
  function Loop(func) {
    var useClock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Loop);

    this.func = func;
    this.clock = useClock ? new __WEBPACK_IMPORTED_MODULE_2_three__["Clock"]() : null;
    this.enabled = false;
  }

  // CONTROLS

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Loop, [{
    key: 'start',
    value: function start(world) {
      if (this.enabled) return;

      if (world) world.addLoop(this);

      if (this.clock) this.clock.start();
      this.enabled = true;
    }
  }, {
    key: 'stop',
    value: function stop(world) {
      if (!this.enabled) return;

      if (this.clock) this.clock.stop();
      this.enabled = false;

      if (world) world.removeLoop(this);
    }

    // EXECUTION

  }, {
    key: 'execute',
    value: function execute() {
      return this.func(this.clock);
    }
  }]);

  return Loop;
}();



/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleManager; });






var ModuleManager = function () {
  function ModuleManager(object) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ModuleManager);

    this.handler = object;
    this.currentModule = null;

    this.store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_redux__["a" /* createStore */])(function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}, ''];
      var action = arguments[1];

      state[0][action.key] = action.data;
      state[1] = action.key;

      return state;
    });

    this.modules = {};
  }

  // SETTING ACTIVE MODULE

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ModuleManager, [{
    key: 'active',
    value: function active(module) {
      this.currentModule = module;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.currentModule = null;
    }

    // MODULES

  }, {
    key: 'define',
    value: function define(name) {
      this.modules[name] = this.currentModule;
    }
  }, {
    key: 'use',
    value: function use(name) {
      return this.modules[name];
    }

    // DEPENDENCIES

  }, {
    key: 'set',
    value: function set(key, data) {
      this.store.dispatch({
        type: 'ADD',
        key: key,
        data: data
      });
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this.store.getState()[0][key];
    }
  }, {
    key: 'has',
    value: function has(key) {
      return Boolean(this.store.getState()[0][key]);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      var depsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.store.subscribe(function () {
        var _store$getState = _this.store.getState(),
            _store$getState2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_store$getState, 2),
            data = _store$getState2[0],
            changedKey = _store$getState2[1];

        var callback = depsMap[changedKey];

        if (callback) callback(data[changedKey]);
      });
    }
  }, {
    key: 'add',
    value: function add() {
      console.warn('.add() method is deprecated. Use .set() instead');
      return this.set.apply(this, arguments);
    }
  }]);

  return ModuleManager;
}();

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = attributes;
/* harmony export (immutable) */ __webpack_exports__["b"] = copy;
/* harmony export (immutable) */ __webpack_exports__["c"] = mirror;
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

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_cameras_PerspectiveCamera__ = __webpack_require__(62);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraModule; });




var CameraModule = function () {
  function CameraModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CameraModule);

    this.params = Object.assign({
      fov: 75,
      near: 1,
      far: 1000,

      position: {
        x: 0,
        y: 0,
        z: 0
      }
    }, params);

    this.camera = new __WEBPACK_IMPORTED_MODULE_2__components_cameras_PerspectiveCamera__["a" /* PerspectiveCamera */]({
      camera: {
        fov: this.params.fov,
        aspect: this.params.aspect,
        near: this.params.near,
        far: this.params.far
      },

      modules: [],

      position: {
        x: this.params.position.x,
        y: this.params.position.y,
        z: this.params.position.z
      }
    });
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CameraModule, [{
    key: 'integrate',
    value: function integrate(self) {
      this.add(self.camera);
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      _manager.add('camera', this.camera);
    }
  }]);

  return CameraModule;
}();



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementModule; });



var ElementModule = function () {
  function ElementModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ElementModule);

    this.params = Object.assign({
      container: document.body
    }, params);

    this.element = window.document.createElement('div');
    this.element.className = 'whs';
    this.element.style.width = 'inherit';
    this.element.style.height = 'inherit';
    this.element.style.position = 'relative';
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ElementModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.add('element', this.element);
      _manager.add('container', this.params.container);
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      self.params.container.appendChild(self.element);
    }
  }]);

  return ElementModule;
}();



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPatchModule; });



var EventsPatchModule = function () {
  function EventsPatchModule() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, EventsPatchModule);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(EventsPatchModule, [{
    key: 'manager',
    value: function manager(_manager) {
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



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_Loop__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderingModule; });



var _class, _temp;





var RenderingModule = (_temp = _class = function () {
  function RenderingModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { shadow: false },
        isShadow = _ref.shadow;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, RenderingModule);

    this.params = Object.assign({
      width: window.innerWidth,
      height: window.innerHeight,

      resolution: new __WEBPACK_IMPORTED_MODULE_2_three__["Vector2"](1, 1),
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


    this.renderer = new __WEBPACK_IMPORTED_MODULE_2_three__["WebGLRenderer"](renderer);
    this.applyAdditional('shadow', isShadow);

    this.renderer.setClearColor(bgColor, bgOpacity);

    if (pixelRatio) this.renderer.setPixelRatio(pixelRatio);

    this.setSize(Number(width * resolution.x).toFixed(), Number(height * resolution.y).toFixed());
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(RenderingModule, [{
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
      this.renderLoop = new __WEBPACK_IMPORTED_MODULE_3__core_Loop__["a" /* Loop */](function () {
        return _this.renderer.render(_this.scene, _this.camera);
      });
      this.attachToCanvas(element);

      return this.renderLoop;
    }
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
      this.renderLoop.stop();
    }
  }, {
    key: 'play',
    value: function play() {
      this.renderLoop.start();
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
      var _this2 = this;

      _manager.define('rendering');
      _manager.set('renderer', this.renderer);

      this.renderLoop = this.integrateRenderer(_manager.get('element'), _manager.get('scene'), _manager.get('camera').native);

      _manager.update({
        element: function element(_element) {
          _this2.attachToCanvas(_element);
        },
        scene: function scene(_scene) {
          _this2.scene = _scene;
        },
        camera: function camera(_camera) {
          _this2.camera = _camera.native;
        }
      });
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      self.renderLoop.start(this);
    }
  }, {
    key: 'dispose',
    value: function dispose(self) {
      self.renderLoop.stop(this);
      self.renderer.forceContextLoss();
    }
  }]);

  return RenderingModule;
}(), _class.additional = {
  shadow: function shadow(renderer) {
    renderer.shadowMap.enabled = true;
  }
}, _temp);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResizeModule; });



// import {addResizeListener} from 'detect-element-resize';

var ResizeModule = function () {
  function ResizeModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ResizeModule);

    this.params = Object.assign({
      auto: true
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ResizeModule, [{
    key: 'setSize',
    value: function setSize() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      this.camera.native.aspect = width / height;
      this.camera.native.updateProjectionMatrix();

      if (this.rendering) this.rendering.setSize(width, height);
    }
  }, {
    key: 'trigger',
    value: function trigger() {
      var _container = this.container,
          offsetWidth = _container.offsetWidth,
          offsetHeight = _container.offsetHeight,
          resolution = this.resolution;


      this.setSize(Number(offsetWidth * resolution.x).toFixed(), Number(offsetHeight * resolution.y).toFixed());
    }
  }, {
    key: 'addAutoresize',
    value: function addAutoresize() {
      this.container = this.getContainer();
      this.resolution = this.getResolution();

      if (this.params.auto) window.addEventListener('resize', this.trigger.bind(this));
    }
  }, {
    key: 'manager',
    value: function manager(_manager) {
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



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SceneModule; });




var SceneModule = function () {
  function SceneModule() {
    var willSceneBeReplaced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, SceneModule);

    this.scene = willSceneBeReplaced ? null : new __WEBPACK_IMPORTED_MODULE_2_three__["Scene"]();
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SceneModule, [{
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



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_present__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_present___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_present__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return system; });


var system = {
  window: typeof window === 'undefined' ? global : window
};

global.performance = {
  now: __WEBPACK_IMPORTED_MODULE_0_present___default.a
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(33)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(21)
  , dPs         = __webpack_require__(181)
  , enumBugKeys = __webpack_require__(45)
  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(73)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(174).appendChild(iframe);
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


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(30)
  , createDesc     = __webpack_require__(31)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(55)
  , has            = __webpack_require__(17)
  , IE8_DOM_DEFINE = __webpack_require__(74)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(15) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(18).f
  , has = __webpack_require__(17)
  , TAG = __webpack_require__(11)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(52)('keys')
  , uid    = __webpack_require__(32);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(44);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(25);
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

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(12)
  , core           = __webpack_require__(10)
  , LIBRARY        = __webpack_require__(46)
  , wksExt         = __webpack_require__(57)
  , defineProperty = __webpack_require__(18).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(184)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(76)(String, 'String', function(iterated){
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

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(190);
var global        = __webpack_require__(12)
  , hide          = __webpack_require__(23)
  , Iterators     = __webpack_require__(26)
  , TO_STRING_TAG = __webpack_require__(11)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pass_js__ = __webpack_require__(7);




/**
 * A blur pass.
 */

class BlurPass extends __WEBPACK_IMPORTED_MODULE_2__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new blur pass.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.resolutionScale=0.5] - The render texture resolution scale, relative to the screen render size.
	 * @param {Number} [options.kernelSize=KernelSize.LARGE] - The blur kernel size.
	 */

	constructor(options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "BlurPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A render target.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetX = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderTarget"](1, 1, {
			minFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			magFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			stencilBuffer: false,
			depthBuffer: false
		});

		this.renderTargetX.texture.name = "Blur.TargetX";
		this.renderTargetX.texture.generateMipmaps = false;

		/**
		 * A second render target.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetY = this.renderTargetX.clone();

		this.renderTargetY.texture.name = "Blur.TargetY";

		/**
		 * The resolution scale.
		 *
		 * You need to call {@link EffectComposer#setSize} after changing this value.
		 *
		 * @type {Number}
		 * @default 0.5
		 */

		this.resolutionScale = (options.resolutionScale !== undefined) ? options.resolutionScale : 0.5;

		/**
		 * A convolution shader material.
		 *
		 * @type {ConvolutionMaterial}
		 * @private
		 */

		this.convolutionMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["l" /* ConvolutionMaterial */]();

		this.kernelSize = options.kernelSize;

		this.quad.material = this.convolutionMaterial;

	}

	/**
	 * The kernel size.
	 *
	 * @type {KernelSize}
	 * @default KernelSize.LARGE
	 */

	get kernelSize() { return this.convolutionMaterial.kernelSize; }

	/**
	 * @type {KernelSize}
	 */

	set kernelSize(x) {

		if(typeof x === "number") {

			this.convolutionMaterial.kernelSize = x;

		}

	}

	/**
	 * Blurs the read buffer.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		const scene = this.scene;
		const camera = this.camera;

		const renderTargetX = this.renderTargetX;
		const renderTargetY = this.renderTargetY;

		const material = this.convolutionMaterial;
		const uniforms = material.uniforms;
		const kernel = material.getKernel();

		let lastRT = readBuffer;
		let destRT;
		let i, l;

		// Apply the multi-pass blur.
		for(i = 0, l = kernel.length - 1; i < l; ++i) {

			// Alternate between targets.
			destRT = ((i % 2) === 0) ? renderTargetX : renderTargetY;

			uniforms.kernel.value = kernel[i];
			uniforms.tDiffuse.value = lastRT.texture;
			renderer.render(scene, camera, destRT);

			lastRT = destRT;

		}

		uniforms.kernel.value = kernel[i];
		uniforms.tDiffuse.value = lastRT.texture;
		renderer.render(scene, camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Adjusts the format of the render targets.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
	 */

	initialise(renderer, alpha) {

		if(!alpha) {

			this.renderTargetX.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];
			this.renderTargetY.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];

		}

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		width = Math.max(1, Math.floor(width * this.resolutionScale));
		height = Math.max(1, Math.floor(height * this.resolutionScale));

		this.renderTargetX.setSize(width, height);
		this.renderTargetY.setSize(width, height);

		this.convolutionMaterial.setTexelSize(1.0 / width, 1.0 / height);

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlurPass;



/***/ }),
/* 61 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__polyfill__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerspectiveCamera; });






var _class, _temp;





var PerspectiveCamera = (_temp = _class = function (_CameraComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(PerspectiveCamera, _CameraComponent);

  function PerspectiveCamera() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PerspectiveCamera);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PerspectiveCamera.__proto__ || Object.getPrototypeOf(PerspectiveCamera)).call(this, params, PerspectiveCamera.defaults));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PerspectiveCamera, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ camera: new __WEBPACK_IMPORTED_MODULE_5_three__["PerspectiveCamera"](params.camera.fov, params.camera.aspect, params.camera.near, params.camera.far) }).camera;
    }
  }]);

  return PerspectiveCamera;
}(__WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__["a" /* CameraComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__["a" /* CameraComponent */].defaults, {

  camera: {
    near: 1,
    far: 1000,
    fov: 45,
    aspect: __WEBPACK_IMPORTED_MODULE_7__polyfill__["a" /* system */].window.innerWidth / __WEBPACK_IMPORTED_MODULE_7__polyfill__["a" /* system */].window.innerHeight
  }
}), _temp);




/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Importer; });







var _class, _temp;





var Importer = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Importer, _MeshComponent);

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Importer, null, [{
    key: 'filter',
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

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Importer);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Importer.__proto__ || Object.getPrototypeOf(Importer)).call(this, params, Importer.defaults, Importer.instructions, false));
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Importer, [{
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

      __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default()(Importer.prototype.__proto__ || Object.getPrototypeOf(Importer.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }]);

  return Importer;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {

  url: '',
  loader: new __WEBPACK_IMPORTED_MODULE_6_three__["JSONLoader"](),

  onLoad: function onLoad() {},
  onProgress: function onProgress() {},
  onError: function onError() {},


  texturePath: null,
  useCustomMaterial: false,

  parser: function parser(geometry, materials) {
    return new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, materials);
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions), _temp);




/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__polyfill__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ModuleSystem__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ModuleManager__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });








var App = function (_ModuleSystem) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(App, _ModuleSystem);

  function App() {
    var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, App);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.simulate = false;
    _this.updateEnabled = true;
    _this.loops = [];

    _this.manager = new __WEBPACK_IMPORTED_MODULE_6__ModuleManager__["a" /* ModuleManager */](_this);
    _this.modules = modules;

    _this.integrateModules();
    return _this;
  }

  // CONTROLS & UPDATING

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(App, [{
    key: 'start',
    value: function start() {
      var requestAnimFrame = function () {
        return __WEBPACK_IMPORTED_MODULE_4__polyfill__["a" /* system */].window.requestAnimationFrame || __WEBPACK_IMPORTED_MODULE_4__polyfill__["a" /* system */].window.webkitRequestAnimationFrame || __WEBPACK_IMPORTED_MODULE_4__polyfill__["a" /* system */].window.mozRequestAnimationFrame || function (callback) {
          __WEBPACK_IMPORTED_MODULE_4__polyfill__["a" /* system */].window.setTimeout(callback, 1000 / 60);
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
  }, {
    key: 'stop',
    value: function stop() {
      this.updateEnabled = false;
    }
  }, {
    key: 'addLoop',
    value: function addLoop(loop) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.loops.push(loop);
        resolve(loop);
      });
    }
  }, {
    key: 'removeLoop',
    value: function removeLoop(loop) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.loops.filter(function (l) {
          return l !== loop;
        });
        resolve(loop);
      });
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_5__ModuleSystem__["a" /* ModuleSystem */]);



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_minivents__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_minivents___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_minivents__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__errors__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleSystem; });








// Check for Three.js
var warnDeps = function warnDeps() {
  throw new Error('WhitestormJS Framework requires Three.js r84. https://threejs.org/');
};

try {
  if (!__WEBPACK_IMPORTED_MODULE_4_three__["REVISION"]) warnDeps();
} catch (err) {
  warnDeps();
}

var ModuleSystem = function (_Events) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ModuleSystem, _Events);

  function ModuleSystem() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ModuleSystem);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ModuleSystem.__proto__ || Object.getPrototypeOf(ModuleSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ModuleSystem, [{
    key: 'integrateModules',

    // INTEGRATING

    value: function integrateModules(source) {
      if (source) this.modules = source.modules.slice(0);

      for (var i = 0, max = this.modules.length; i < max; i++) {
        this.applyModule(this.modules[i], false);
      }if (source) this.applyBridge({ onCopy: source });
    }

    // APPLYING MODULE (...and a "bridge" for module)

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
  }, {
    key: 'applyModule',
    value: function applyModule(module) {
      var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!module) return;
      if (push) this.modules.push(module);

      if (this.manager) this.manager.active(module);

      if (module.manager && this.manager) module.manager(this.manager);else if (module.manager) {
        throw new __WEBPACK_IMPORTED_MODULE_6__errors__["b" /* ManagerError */]('Component', 'Module requires ModuleManager that is turned off for this component', this, module);
      }

      if (module.integrate) module.integrate.bind(this)(module);

      return module;
    }
  }, {
    key: 'applyModuleOnce',
    value: function applyModuleOnce(ModuleConstructor, getModule) {
      var push = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var isAlreadyIncluded = this.modules.some(function (m) {
        return m instanceof ModuleConstructor;
      });
      if (!isAlreadyIncluded) return this.applyModule(getModule(), push);
    }
  }, {
    key: 'disposeModules',
    value: function disposeModules() {
      while (this.modules.length) {
        this.disposeModule(this.modules[0]);
      }
    }
  }, {
    key: 'disposeModule',
    value: function disposeModule(module) {
      if (!module) return;

      this.modules.splice(this.modules.indexOf(module), 1);

      if (module.dispose) module.dispose.bind(this)(module);

      return module;
    }

    // PIPED METHOD

  }, {
    key: 'module',
    value: function module(_module) {
      this.applyModule(_module);
      return this;
    }
  }]);

  return ModuleSystem;
}(__WEBPACK_IMPORTED_MODULE_5_minivents___default.a);



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CopyShader; });
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

var CopyShader = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1.0 }
  },

  vertexShader: "\n    varying vec2 vUv;\n\n    void main() {\n\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n    }\n",

  fragmentShader: "\n    uniform float opacity;\n\n    uniform sampler2D tDiffuse;\n\n    varying vec2 vUv;\n\n    void main() {\n\n      vec4 texel = texture2D( tDiffuse, vUv );\n      gl_FragColor = opacity * texel;\n\n    }\n"
};



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Loop__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EventsPatchModule__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlsModule; });





var ControlsModule = function () {
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ControlsModule, null, [{
    key: 'from',
    value: function from(controls) {
      return new ControlsModule({ controls: controls });
    }
  }]);

  function ControlsModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var patchEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ControlsModule);

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
    this.patchEvents = patchEvents;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ControlsModule, [{
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
      if (self.patchEvents) this.applyModuleOnce(__WEBPACK_IMPORTED_MODULE_3__EventsPatchModule__["a" /* EventsPatchModule */], function () {
        return new __WEBPACK_IMPORTED_MODULE_3__EventsPatchModule__["a" /* EventsPatchModule */]();
      });
      self.updateLoop = new __WEBPACK_IMPORTED_MODULE_2__core_Loop__["a" /* Loop */](self.update.bind(self)).start(this);
    }
  }]);

  return ControlsModule;
}();

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__extend__ = __webpack_require__(147);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__extend__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transformData__ = __webpack_require__(148);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__transformData__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__transformData__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__transformData__["c"]; });



/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(157);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(156);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(43)
  , TAG = __webpack_require__(11)('toStringTag')
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

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(170);
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

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(25)
  , document = __webpack_require__(12).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(15) && !__webpack_require__(22)(function(){
  return Object.defineProperty(__webpack_require__(73)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(43);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(46)
  , $export        = __webpack_require__(16)
  , redefine       = __webpack_require__(81)
  , hide           = __webpack_require__(23)
  , has            = __webpack_require__(17)
  , Iterators      = __webpack_require__(26)
  , $iterCreate    = __webpack_require__(176)
  , setToStringTag = __webpack_require__(50)
  , getPrototypeOf = __webpack_require__(78)
  , ITERATOR       = __webpack_require__(11)('iterator')
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

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(79)
  , hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(17)
  , toObject    = __webpack_require__(54)
  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(17)
  , toIObject    = __webpack_require__(13)
  , arrayIndexOf = __webpack_require__(172)(false)
  , IE_PROTO     = __webpack_require__(51)('IE_PROTO');

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

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(16)
  , core    = __webpack_require__(10)
  , fails   = __webpack_require__(22);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(207);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(208);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

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
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports=function(n){var t={},e=[];n=n||this,n.on=function(n,e,l){(t[n]=t[n]||[]).push([e,l])},n.off=function(n,l){n||(t={});for(var o=t[n]||e,i=o.length=l?o.length:0;i--;)l==o[i][0]&&o.splice(i,1)},n.emit=function(n){for(var l,o=t[n]||e,i=o.length>0?o.slice(0,o.length):o,c=0;l=i[c++];)l[0].apply(l[1],e.slice.call(arguments,1))}};

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * Used for saving the original clear color of the renderer.
 *
 * @type Color
 * @private
 * @static
 */

const color = new __WEBPACK_IMPORTED_MODULE_0_three__["Color"]();

/**
 * A clear pass.
 *
 * You can prevent specific buffers from being cleared by setting either the
 * autoClearColor, autoClearStencil or autoClearDepth properties of the renderer
 * to false.
 */

class ClearPass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = ClearPass;



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bloom_js__ = __webpack_require__(232);
/* unused harmony reexport BloomPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blur_js__ = __webpack_require__(60);
/* unused harmony reexport BlurPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bokeh_js__ = __webpack_require__(233);
/* unused harmony reexport BokehPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bokeh2_js__ = __webpack_require__(234);
/* unused harmony reexport Bokeh2Pass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__clear_js__ = __webpack_require__(85);
/* unused harmony reexport ClearPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clear_mask_js__ = __webpack_require__(235);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__clear_mask_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dot_screen_js__ = __webpack_require__(237);
/* unused harmony reexport DotScreenPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__depth_js__ = __webpack_require__(236);
/* unused harmony reexport DepthPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__film_js__ = __webpack_require__(238);
/* unused harmony reexport FilmPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__glitch_js__ = __webpack_require__(239);
/* unused harmony reexport GlitchMode */
/* unused harmony reexport GlitchPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__god_rays_js__ = __webpack_require__(240);
/* unused harmony reexport GodRaysPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mask_js__ = __webpack_require__(241);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_11__mask_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pass_js__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_12__pass_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pixelation_js__ = __webpack_require__(242);
/* unused harmony reexport PixelationPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__render_js__ = __webpack_require__(87);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_14__render_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__save_js__ = __webpack_require__(243);
/* unused harmony reexport SavePass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shader_js__ = __webpack_require__(244);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_16__shader_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shock_wave_js__ = __webpack_require__(245);
/* unused harmony reexport ShockWavePass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__smaa_js__ = __webpack_require__(246);
/* unused harmony reexport SMAAPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__texture_js__ = __webpack_require__(247);
/* unused harmony reexport TexturePass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__tone_mapping_js__ = __webpack_require__(248);
/* unused harmony reexport ToneMappingPass */
/**
 * A compilation of the post processing passes.
 *
 * @module postprocessing/passes
 */
























/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clear_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * A pass that renders a given scene directly on screen or into the read buffer
 * for further processing.
 */

class RenderPass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

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

		this.clearPass = new __WEBPACK_IMPORTED_MODULE_0__clear_js__["a" /* ClearPass */](options);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = RenderPass;



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
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

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

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
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
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
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
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
      listeners[i]();
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
   * https://github.com/zenparsing/es-observable
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
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
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
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
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

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_index__ = __webpack_require__(124);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MeshComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LightComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CameraComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "App", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TestApp", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Loop", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModuleManager", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["h"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_lights_index__ = __webpack_require__(101);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AmbientLight", function() { return __WEBPACK_IMPORTED_MODULE_1__components_lights_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DirectionalLight", function() { return __WEBPACK_IMPORTED_MODULE_1__components_lights_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HemisphereLight", function() { return __WEBPACK_IMPORTED_MODULE_1__components_lights_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PointLight", function() { return __WEBPACK_IMPORTED_MODULE_1__components_lights_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SpotLight", function() { return __WEBPACK_IMPORTED_MODULE_1__components_lights_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AreaLight", function() { return __WEBPACK_IMPORTED_MODULE_1__components_lights_index__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_cameras_index__ = __webpack_require__(94);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CubeCamera", function() { return __WEBPACK_IMPORTED_MODULE_2__components_cameras_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "OrthographicCamera", function() { return __WEBPACK_IMPORTED_MODULE_2__components_cameras_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PerspectiveCamera", function() { return __WEBPACK_IMPORTED_MODULE_2__components_cameras_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__ = __webpack_require__(122);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Cylinder", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Dodecahedron", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Extrude", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Icosahedron", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Lathe", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Importer", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Octahedron", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Parametric", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Plane", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Polyhedron", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Ring", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Sphere", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Tetrahedron", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Torus", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Torusknot", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Tube", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return __WEBPACK_IMPORTED_MODULE_3__components_meshes_index__["u"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__extras_index__ = __webpack_require__(126);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ClearPass", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MaskPass", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ClearMaskPass", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Pass", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RenderPass", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ShaderPass", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TexturePass", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CopyShader", function() { return __WEBPACK_IMPORTED_MODULE_4__extras_index__["h"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_index__ = __webpack_require__(68);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return __WEBPACK_IMPORTED_MODULE_5__utils_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "instruct", function() { return __WEBPACK_IMPORTED_MODULE_5__utils_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "transformData", function() { return __WEBPACK_IMPORTED_MODULE_5__utils_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return __WEBPACK_IMPORTED_MODULE_5__utils_index__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_app_index__ = __webpack_require__(140);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ElementModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CameraModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RenderingModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SceneModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResizeModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PostProcessorModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VirtualMouseModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EventsPatchModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ControlsModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FogModule", function() { return __WEBPACK_IMPORTED_MODULE_6__modules_app_index__["j"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_app_controls_index__ = __webpack_require__(138);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "OrbitControlsModule", function() { return __WEBPACK_IMPORTED_MODULE_7__modules_app_controls_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_mesh_index__ = __webpack_require__(143);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DynamicGeometryModule", function() { return __WEBPACK_IMPORTED_MODULE_8__modules_mesh_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TextureModule", function() { return __WEBPACK_IMPORTED_MODULE_8__modules_mesh_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_presets_index__ = __webpack_require__(146);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BasicAppPreset", function() { return __WEBPACK_IMPORTED_MODULE_9__modules_presets_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__deprecation__ = __webpack_require__(125);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return __WEBPACK_IMPORTED_MODULE_10__deprecation__["a"]; });











// DEPRECATION


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeCamera; });






var _class, _temp;




var CubeCamera = (_temp = _class = function (_CameraComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(CubeCamera, _CameraComponent);

  function CubeCamera() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, CubeCamera);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CubeCamera.__proto__ || Object.getPrototypeOf(CubeCamera)).call(this, params, CubeCamera.defaults));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(CubeCamera, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ camera: new __WEBPACK_IMPORTED_MODULE_5_three__["CubeCamera"](params.camera.near, params.camera.far, params.camera.cubeResolution) }).camera;
    }
  }]);

  return CubeCamera;
}(__WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__["a" /* CameraComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__["a" /* CameraComponent */].defaults, {

  camera: {
    near: 1,
    far: 1000,
    cubeResolution: 128
  }
}), _temp);




/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__polyfill__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrthographicCamera; });






var _class, _temp;





var OrthographicCamera = (_temp = _class = function (_CameraComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(OrthographicCamera, _CameraComponent);

  function OrthographicCamera() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, OrthographicCamera);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (OrthographicCamera.__proto__ || Object.getPrototypeOf(OrthographicCamera)).call(this, params, OrthographicCamera.defaults));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(OrthographicCamera, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ camera: new __WEBPACK_IMPORTED_MODULE_5_three__["OrthographicCamera"](params.camera.left, params.camera.right, params.camera.top, params.camera.bottom, params.camera.near, params.camera.far) }).camera;
    }
  }]);

  return OrthographicCamera;
}(__WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__["a" /* CameraComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_CameraComponent__["a" /* CameraComponent */].defaults, {

  camera: {
    near: 1,
    far: 1000,
    left: __WEBPACK_IMPORTED_MODULE_7__polyfill__["a" /* system */].window.innerWidth / -2,
    right: __WEBPACK_IMPORTED_MODULE_7__polyfill__["a" /* system */].window.innerWidth / 2,
    top: __WEBPACK_IMPORTED_MODULE_7__polyfill__["a" /* system */].window.innerHeight / 2,
    bottom: __WEBPACK_IMPORTED_MODULE_7__polyfill__["a" /* system */].window.innerHeight / -2
  }
}), _temp);




/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CubeCamera__ = __webpack_require__(92);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__CubeCamera__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OrthographicCamera__ = __webpack_require__(93);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__OrthographicCamera__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PerspectiveCamera__ = __webpack_require__(62);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__PerspectiveCamera__["a"]; });




/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AmbientLight; });






var _class, _temp;




var AmbientLight = (_temp = _class = function (_LightComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(AmbientLight, _LightComponent);

  function AmbientLight() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AmbientLight);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AmbientLight.__proto__ || Object.getPrototypeOf(AmbientLight)).call(this, params, AmbientLight.defaults));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AmbientLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new __WEBPACK_IMPORTED_MODULE_5_three__["AmbientLight"](params.light.color, params.light.intensity) }).light;
    }
  }]);

  return AmbientLight;
}(__WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */].defaults, {

  light: {
    color: 0xffffff,
    intensity: 1
  }
}), _temp);




/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaLight; });






var _class, _temp;




var AreaLight = (_temp = _class = function (_LightComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(AreaLight, _LightComponent);

  function AreaLight() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AreaLight);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AreaLight.__proto__ || Object.getPrototypeOf(AreaLight)).call(this, params, AreaLight.defaults));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AreaLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new __WEBPACK_IMPORTED_MODULE_5_three__["RectAreaLight"](params.light.color, params.light.intensity, params.light.width, params.light.height) }).light;
    }
  }]);

  return AreaLight;
}(__WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */].defaults, {

  light: {
    color: 0xffffff,
    intensity: 1,
    width: 10,
    height: 10
  }
}), _temp);




/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectionalLight; });






var _class, _temp;




var DirectionalLight = (_temp = _class = function (_LightComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(DirectionalLight, _LightComponent);

  function DirectionalLight() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DirectionalLight);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (DirectionalLight.__proto__ || Object.getPrototypeOf(DirectionalLight)).call(this, params, DirectionalLight.defaults));

    _this.wrapShadow();
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DirectionalLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new __WEBPACK_IMPORTED_MODULE_5_three__["DirectionalLight"](params.light.color, params.light.intensity) }).light;
    }
  }]);

  return DirectionalLight;
}(__WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */].defaults, {

  light: {
    color: 0xffffff,
    intensity: 1
  }
}), _temp);




/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HemisphereLight; });






var _class, _temp;




var HemisphereLight = (_temp = _class = function (_LightComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(HemisphereLight, _LightComponent);

  function HemisphereLight() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, HemisphereLight);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HemisphereLight.__proto__ || Object.getPrototypeOf(HemisphereLight)).call(this, params, HemisphereLight.defaults));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(HemisphereLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new __WEBPACK_IMPORTED_MODULE_5_three__["HemisphereLight"](params.light.skyColor, params.light.groundColor, params.light.intensity) }).light;
    }
  }]);

  return HemisphereLight;
}(__WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */].defaults, {
  light: {
    skyColor: 0xffffff,
    groundColor: 0xffffff,

    intensity: 1
  }
}), _temp);




/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointLight; });






var _class, _temp;




var PointLight = (_temp = _class = function (_LightComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(PointLight, _LightComponent);

  function PointLight() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PointLight);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PointLight.__proto__ || Object.getPrototypeOf(PointLight)).call(this, params, PointLight.defaults));

    _this.wrapShadow();
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PointLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new __WEBPACK_IMPORTED_MODULE_5_three__["PointLight"](params.light.color, params.light.intensity, params.light.distance, params.light.decay) }).light;
    }
  }]);

  return PointLight;
}(__WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */].defaults, {
  light: {
    color: 0xffffff,
    intensity: 1,
    distance: 100,
    decay: 1
  }
}), _temp);




/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpotLight; });






var _class, _temp;




var SpotLight = (_temp = _class = function (_LightComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(SpotLight, _LightComponent);

  function SpotLight() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SpotLight);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SpotLight.__proto__ || Object.getPrototypeOf(SpotLight)).call(this, params, SpotLight.defaults));

    _this.wrapShadow();
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(SpotLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.applyBridge({ light: new __WEBPACK_IMPORTED_MODULE_5_three__["SpotLight"](params.light.color, params.light.intensity, params.light.distance, params.light.angle, params.light.exponent, params.light.decay) }).light;
    }
  }]);

  return SpotLight;
}(__WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_LightComponent__["a" /* LightComponent */].defaults, {

  light: {
    color: 0xffffff,
    intensity: 1,
    distance: 100,
    angle: Math.PI / 3,
    exponent: 0,
    decay: 1
  }
}), _temp);




/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AmbientLight__ = __webpack_require__(95);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__AmbientLight__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DirectionalLight__ = __webpack_require__(97);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__DirectionalLight__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HemisphereLight__ = __webpack_require__(98);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__HemisphereLight__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PointLight__ = __webpack_require__(99);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__PointLight__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SpotLight__ = __webpack_require__(100);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__SpotLight__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AreaLight__ = __webpack_require__(96);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__AreaLight__["a"]; });







/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Box; });






var _class, _temp;





var Box = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Box, _MeshComponent);

  function Box() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Box);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, params, Box.defaults, Box.instructions));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Box, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer ? __WEBPACK_IMPORTED_MODULE_5_three__["BoxBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_5_three__["BoxGeometry"];

      var geometry = new GConstruct(params.geometry.width, params.geometry.height, params.geometry.depth, params.geometry.widthSegments, params.geometry.heightSegments, params.geometry.depthSegments);

      return geometry;
    }
  }]);

  return Box;
}(__WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['width', 'height', 'depth', 'widthSegments', 'heightSegments', 'depthSegements']
}), _temp);




/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cylinder; });







var _class, _temp;





var Cylinder = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Cylinder, _MeshComponent);

  function Cylinder() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Cylinder);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Cylinder.__proto__ || Object.getPrototypeOf(Cylinder)).call(this, params, Cylinder.defaults, Cylinder.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Cylinder.prototype.__proto__ || Object.getPrototypeOf(Cylinder.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Cylinder, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["CylinderBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["CylinderGeometry"];

      var geometry = new GConstruct(params.geometry.radiusTop, params.geometry.radiusBottom, params.geometry.height, params.geometry.radiusSegments, params.geometry.heightSegments, params.geometry.openEnded, params.geometry.thetaStart, params.geometry.thetaLength);

      if (params.softbody) this.proccessSoftbodyGeometry(geometry);

      return geometry;
    }
  }]);

  return Cylinder;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
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
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['radiusTop', 'radiusBottom', 'height', 'radiusSegments', 'heightSegments', 'openEnded', 'thetaStart', 'thetaLength']
}), _temp);




/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dodecahedron; });







var _class, _temp;





var Dodecahedron = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Dodecahedron, _MeshComponent);

  function Dodecahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Dodecahedron);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Dodecahedron.__proto__ || Object.getPrototypeOf(Dodecahedron)).call(this, params, Dodecahedron.defaults, Dodecahedron.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Dodecahedron.prototype.__proto__ || Object.getPrototypeOf(Dodecahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Dodecahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["DodecahedronBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["DodecahedronGeometry"];

      return new GConstruct(params.geometry.radius, params.geometry.detail);
    }
  }]);

  return Dodecahedron;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    radius: 1,
    detail: 0
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['radius', 'detail']
}), _temp);




/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Extrude; });







var _class, _temp;





var Extrude = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Extrude, _MeshComponent);

  function Extrude() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Extrude);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Extrude.__proto__ || Object.getPrototypeOf(Extrude)).call(this, params, Extrude.defaults, Extrude.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Extrude.prototype.__proto__ || Object.getPrototypeOf(Extrude.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Extrude, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var extrudeGeometry = new __WEBPACK_IMPORTED_MODULE_6_three__["ExtrudeGeometry"](params.geometry.shapes, params.geometry.options);

      return params.buffer ? new __WEBPACK_IMPORTED_MODULE_6_three__["BufferGeometry"]().fromGeometry(extrudeGeometry) : extrudeGeometry;
    }
  }]);

  return Extrude;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    shapes: [],
    options: {}
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['shapes', 'options']
}), _temp);




/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_MeshComponent__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_Component__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Group; });








var Group = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Group, _MeshComponent);

  function Group() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Group);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, {}));

    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }

    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];

      if (obj instanceof __WEBPACK_IMPORTED_MODULE_6__core_Component__["a" /* Component */]) obj.addTo(_this);else if (obj instanceof __WEBPACK_IMPORTED_MODULE_4_three__["Object3D"]) _this.native.add(obj);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Group, [{
    key: 'build',
    value: function build() {
      return new __WEBPACK_IMPORTED_MODULE_4_three__["Object3D"]();
    }
  }]);

  return Group;
}(__WEBPACK_IMPORTED_MODULE_5__core_MeshComponent__["a" /* MeshComponent */]);



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Icosahedron; });







var _class, _temp;





var Icosahedron = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Icosahedron, _MeshComponent);

  function Icosahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Icosahedron);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Icosahedron.__proto__ || Object.getPrototypeOf(Icosahedron)).call(this, params, Icosahedron.defaults, Icosahedron.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Icosahedron.prototype.__proto__ || Object.getPrototypeOf(Icosahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Icosahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["IcosahedronBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["IcosahedronGeometry"];

      return new GConstruct(params.geometry.radius, params.geometry.detail);
    }
  }]);

  return Icosahedron;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    radius: 1,
    detail: 0
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['radius', 'detail']
}), _temp);




/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Lathe; });







var _class, _temp;





var Lathe = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Lathe, _MeshComponent);

  function Lathe() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Lathe);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Lathe.__proto__ || Object.getPrototypeOf(Lathe)).call(this, params, Lathe.defaults, Lathe.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Lathe.prototype.__proto__ || Object.getPrototypeOf(Lathe.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Lathe, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["LatheBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["LatheGeometry"];

      return new GConstruct(params.geometry.points);
    }
  }]);

  return Lathe;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    points: []
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['points']
}), _temp);




/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Line; });






var _class, _temp;





var Line = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Line, _MeshComponent);

  function Line(params) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Line);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, params, Line.defaults, Line.instructions));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Line, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_5_three__["Line"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var geometry = params.buffer ? new __WEBPACK_IMPORTED_MODULE_5_three__["BufferGeometry"]() : new __WEBPACK_IMPORTED_MODULE_5_three__["Geometry"]();

      if (params.geometry.curve === false) {
        geometry.vertices.push(params.geometry.start);
        geometry.vertices.push(params.geometry.end);

        return geometry;
      }

      if (params.buffer) {
        var pp = params.geometry.curve.getPoints(params.geometry.points);
        var verts = new Float32Array(pp.length * 3);

        for (var i = 0, max = pp.length; i < max; i++) {
          var i3 = i * 3;

          verts[i3] = pp[i].x;
          verts[i3 + 1] = pp[i].y;
          verts[i3 + 2] = pp[i].z;
        }

        geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_5_three__["BufferAttribute"](verts, 3));
      } else geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

      return geometry;
    }
  }]);

  return Line;
}(__WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    curve: false,
    points: 50,
    start: new __WEBPACK_IMPORTED_MODULE_5_three__["Vector3"](0, 0, 0),
    end: new __WEBPACK_IMPORTED_MODULE_5_three__["Vector3"](10, 0, 0)
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['curve', 'points']
}), _temp);




/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Octahedron; });







var _class, _temp;





var Octahedron = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Octahedron, _MeshComponent);

  function Octahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Octahedron);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Octahedron.__proto__ || Object.getPrototypeOf(Octahedron)).call(this, params, Octahedron.defaults, Octahedron.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Octahedron.prototype.__proto__ || Object.getPrototypeOf(Octahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Octahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["OctahedronBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["OctahedronGeometry"];

      return new GConstruct(params.geometry.radius, params.geometry.detail);
    }
  }]);

  return Octahedron;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    radius: 1,
    detail: 0
  }
}), _temp);




/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parametric; });






var _class, _temp;





var Parametric = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Parametric, _MeshComponent);

  function Parametric() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Parametric);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Parametric.__proto__ || Object.getPrototypeOf(Parametric)).call(this, params, Parametric.defaults, Parametric.instructions));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Parametric, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_5_three__["ParametricBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_5_three__["ParametricGeometry"];

      return new GConstruct(params.geometry.func, params.geometry.slices, params.geometry.stacks);
    }
  }]);

  return Parametric;
}(__WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    func: function func(u, v) {
      return new __WEBPACK_IMPORTED_MODULE_5_three__["Vector3"](u, v, 0);
    },
    slices: 10,
    stacks: 10
  }
}), _temp);




/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plane; });







var _class, _temp;





var Plane = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Plane, _MeshComponent);

  function Plane() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Plane);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Plane.__proto__ || Object.getPrototypeOf(Plane)).call(this, params, Plane.defaults, Plane.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Plane.prototype.__proto__ || Object.getPrototypeOf(Plane.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Plane, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer || params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["PlaneBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["PlaneGeometry"];

      var geometry = new GConstruct(params.geometry.width, params.geometry.height, params.geometry.wSegments, params.geometry.hSegments);

      if (params.softbody) this.proccessSoftbodyGeometry(geometry);

      return geometry;
    }
  }]);

  return Plane;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    width: 10,
    height: 10,
    wSegments: 1,
    hSegments: 1
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['width', 'height', 'wSegments', 'hSegments']
}), _temp);




/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Polyhedron; });







var _class, _temp;





var verticesOfCube = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1],
    indicesOfFaces = [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4];
var Polyhedron = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Polyhedron, _MeshComponent);

  function Polyhedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Polyhedron);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Polyhedron.__proto__ || Object.getPrototypeOf(Polyhedron)).call(this, params, Polyhedron.defaults, Polyhedron.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Polyhedron.prototype.__proto__ || Object.getPrototypeOf(Polyhedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Polyhedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["PolyhedronBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["PolyhedronGeometry"];

      return new GConstruct(params.geometry.verticesOfCube, params.geometry.indicesOfFaces, params.geometry.radius, params.geometry.detail);
    }
  }]);

  return Polyhedron;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.verticesOfCube = verticesOfCube, _class.indicesOfFaces = indicesOfFaces, _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    verticesOfCube: verticesOfCube,
    indicesOfFaces: indicesOfFaces,
    radius: 6,
    detail: 2
  },

  physics: {
    create: false
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['verticesOfCube', 'indicesOfFaces', 'radius', 'detail']
}), _temp);




/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ring; });







var _class, _temp;





var Ring = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Ring, _MeshComponent);

  function Ring() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Ring);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Ring.__proto__ || Object.getPrototypeOf(Ring)).call(this, params, Ring.defaults, Ring.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Ring.prototype.__proto__ || Object.getPrototypeOf(Ring.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Ring, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["RingBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["RingGeometry"];

      return new GConstruct(params.geometry.innerRadius, params.geometry.outerRadius, params.geometry.thetaSegments, params.geometry.phiSegments, params.geometry.thetaStart, params.geometry.thetaLength);
    }
  }]);

  return Ring;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    innerRadius: 0,
    outerRadius: 50,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  }
}), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: ['innerRadius', 'outerRadius', 'thetaSegments', 'phiSegments', 'thetaStart', 'thetaLength']
}), _temp);




/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shape; });







var _class, _temp;





var Shape = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Shape, _MeshComponent);

  function Shape() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Shape);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, params, Shape.defaults, Shape.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Shape.prototype.__proto__ || Object.getPrototypeOf(Shape.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Shape, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["ShapeBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["ShapeGeometry"];

      return new GConstruct(params.geometry.shapes);
    }
  }]);

  return Shape;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    shapes: []
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['shapes']
}), _temp);




/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sphere; });






var _class, _temp;





var Sphere = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Sphere, _MeshComponent);

  function Sphere() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Sphere);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Sphere.__proto__ || Object.getPrototypeOf(Sphere)).call(this, params, Sphere.defaults, Sphere.instructions));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Sphere, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_5_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_5_three__["SphereBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_5_three__["SphereGeometry"];

      var geometry = new GConstruct(params.geometry.radius, params.geometry.widthSegments, params.geometry.heightSegments);

      if (params.softbody) this.proccessSoftbodyGeometry(geometry);

      return geometry;
    }
  }]);

  return Sphere;
}(__WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    radius: 1,
    widthSegments: 8,
    heightSegments: 6
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_6__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['radius', 'widthSegments', 'heightSegments']
}), _temp);




/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tetrahedron; });







var _class, _temp;





var Tetrahedron = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Tetrahedron, _MeshComponent);

  function Tetrahedron() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Tetrahedron);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Tetrahedron.__proto__ || Object.getPrototypeOf(Tetrahedron)).call(this, params, Tetrahedron.defaults, Tetrahedron.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Tetrahedron.prototype.__proto__ || Object.getPrototypeOf(Tetrahedron.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Tetrahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["TetrahedronBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["TetrahedronGeometry"];

      return new GConstruct(params.geometry.radius, params.geometry.detail);
    }
  }]);

  return Tetrahedron;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    radius: 1,
    detail: 0
  },

  physics: {
    create: false
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['radius', 'detail']
}), _temp);




/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Text; });







var _class, _temp;





var Text = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Text, _MeshComponent);

  function Text() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Text);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, params, Text.defaults, Text.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Text, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var promise = new Promise(function (resolve) {
        __WEBPACK_IMPORTED_MODULE_6_three__["FontLoader"].load(params.geometry.parameters.font, function (font) {
          params.geometry.parameters.font = font;

          var _applyBridge = _this2.applyBridge({
            geometry: new __WEBPACK_IMPORTED_MODULE_6_three__["TextGeometry"](params.geometry.text, params.geometry.parameters),
            material: params.material
          }),
              geometry = _applyBridge.geometry,
              material = _applyBridge.material;

          resolve(_this2.applyBridge({
            mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material)
          }).mesh);
        });
      });

      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }]);

  return Text;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    text: 'Hello World!',
    loader: new __WEBPACK_IMPORTED_MODULE_6_three__["FontLoader"](),

    parameters: {
      size: 12,
      height: 50,
      curveSegments: 12,
      font: new __WEBPACK_IMPORTED_MODULE_6_three__["Font"](),
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8
    }
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['text', 'parameters']
}), _temp);




/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Torus; });







var _class, _temp;





var Torus = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Torus, _MeshComponent);

  function Torus() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Torus);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Torus.__proto__ || Object.getPrototypeOf(Torus)).call(this, params, Torus.defaults, Torus.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Torus.prototype.__proto__ || Object.getPrototypeOf(Torus.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Torus, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new __WEBPACK_IMPORTED_MODULE_6_three__["TorusGeometry"](params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.arc);
    }
  }]);

  return Torus;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    radius: 100,
    tube: 40,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['radius', 'tube', 'radialSegments', 'tubularSegments', 'arc']
}), _temp);




/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Torusknot; });







var _class, _temp;





var Torusknot = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Torusknot, _MeshComponent);

  function Torusknot() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Torusknot);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Torusknot.__proto__ || Object.getPrototypeOf(Torusknot)).call(this, params, Torusknot.defaults, Torusknot.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Torusknot.prototype.__proto__ || Object.getPrototypeOf(Torusknot.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Torusknot, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["TorusKnotBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["TorusKnotGeometry"];

      return new GConstruct(params.geometry.radius, params.geometry.tube, params.geometry.radialSegments, params.geometry.tubularSegments, params.geometry.p, params.geometry.q);
    }
  }]);

  return Torusknot;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    radius: 100,
    tube: 40,
    radialSegments: 64,
    tubularSegments: 8,
    p: 2,
    q: 3
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['radius', 'tube', 'radialSegments', 'tubularSegments', 'p', 'q']
}), _temp);




/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tube; });







var _class, _temp;





var Tube = (_temp = _class = function (_MeshComponent) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Tube, _MeshComponent);

  function Tube() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Tube);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Tube.__proto__ || Object.getPrototypeOf(Tube)).call(this, params, Tube.defaults, Tube.instructions));

    if (params.build) {
      _this.build(params);
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Tube.prototype.__proto__ || Object.getPrototypeOf(Tube.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Tube, [{
    key: 'build',
    value: function build() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;

      var _applyBridge = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: params.material
      }),
          geometry = _applyBridge.geometry,
          material = _applyBridge.material;

      return this.applyBridge({ mesh: new __WEBPACK_IMPORTED_MODULE_6_three__["Mesh"](geometry, material) }).mesh;
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var GConstruct = params.buffer && !params.softbody ? __WEBPACK_IMPORTED_MODULE_6_three__["TubeBufferGeometry"] : __WEBPACK_IMPORTED_MODULE_6_three__["TubeGeometry"];

      var geometry = new GConstruct(params.geometry.path, params.geometry.segments, params.geometry.radius, params.geometry.radiusSegments, params.geometry.closed);

      if (params.softbody) this.proccessSoftbodyGeometry(geometry);

      return geometry;
    }
  }]);

  return Tube;
}(__WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */]), _class.defaults = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].defaults, {
  geometry: {
    path: new __WEBPACK_IMPORTED_MODULE_6_three__["LineCurve3"](new __WEBPACK_IMPORTED_MODULE_6_three__["Vector3"](0, 0, 0), new __WEBPACK_IMPORTED_MODULE_6_three__["Vector3"](0, 0, 1)),
    segments: 20,
    radius: 2,
    radiusSegments: 8,
    closed: false
  }
}), _class.instructions = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__core_MeshComponent__["a" /* MeshComponent */].instructions, {
  geometry: ['path', 'segments', 'radius', 'radiusSegments', 'closed']
}), _temp);




/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Box__ = __webpack_require__(102);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Box__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cylinder__ = __webpack_require__(103);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Cylinder__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Dodecahedron__ = __webpack_require__(104);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__Dodecahedron__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Extrude__ = __webpack_require__(105);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__Extrude__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Icosahedron__ = __webpack_require__(107);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__Icosahedron__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Lathe__ = __webpack_require__(108);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__Lathe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Line__ = __webpack_require__(109);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__Line__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Importer__ = __webpack_require__(63);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__Importer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Octahedron__ = __webpack_require__(110);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__Octahedron__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Parametric__ = __webpack_require__(111);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_9__Parametric__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Plane__ = __webpack_require__(112);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__Plane__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Polyhedron__ = __webpack_require__(113);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_11__Polyhedron__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Ring__ = __webpack_require__(114);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_12__Ring__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Shape__ = __webpack_require__(115);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_13__Shape__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Sphere__ = __webpack_require__(116);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_14__Sphere__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Tetrahedron__ = __webpack_require__(117);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_15__Tetrahedron__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Text__ = __webpack_require__(118);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_16__Text__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Torus__ = __webpack_require__(119);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_17__Torus__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Torusknot__ = __webpack_require__(120);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_18__Torusknot__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Tube__ = __webpack_require__(121);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_19__Tube__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Group__ = __webpack_require__(106);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_20__Group__["a"]; });






















/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_app_ElementModule__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_app_SceneModule__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_app_CameraModule__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_app_RenderingModule__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_app_ResizeModule__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__App__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestApp; });











var TestApp = function (_App) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(TestApp, _App);

  function TestApp() {
    var modulesAdditional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TestApp);

    var modules = [new __WEBPACK_IMPORTED_MODULE_3__modules_app_ElementModule__["a" /* ElementModule */](), new __WEBPACK_IMPORTED_MODULE_4__modules_app_SceneModule__["a" /* SceneModule */](), new __WEBPACK_IMPORTED_MODULE_5__modules_app_CameraModule__["a" /* CameraModule */](), new __WEBPACK_IMPORTED_MODULE_6__modules_app_RenderingModule__["a" /* RenderingModule */]({}, {
      shadow: true
    }), new __WEBPACK_IMPORTED_MODULE_7__modules_app_ResizeModule__["a" /* ResizeModule */]()].concat(modulesAdditional);

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TestApp.__proto__ || Object.getPrototypeOf(TestApp)).call(this, modules));
  }

  return TestApp;
}(__WEBPACK_IMPORTED_MODULE_8__App__["a" /* App */]);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(24);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MeshComponent__ = __webpack_require__(6);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__MeshComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LightComponent__ = __webpack_require__(14);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__LightComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CameraComponent__ = __webpack_require__(28);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__CameraComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__App__ = __webpack_require__(64);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__App__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TestApp__ = __webpack_require__(123);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__TestApp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Loop__ = __webpack_require__(29);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__Loop__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ModuleManager__ = __webpack_require__(34);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__ModuleManager__["a"]; });









/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_meshes_Importer__ = __webpack_require__(63);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Model; });





var Model = function (_Importer) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Model, _Importer);

  function Model(params) {
    var _ref;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Model);

    console.warn('Model is deprecated. Use Importer instead.');

    if (params.geometry) {
      params.url = params.geometry.path;
      params.loader = params.geometry.loader;
    }

    for (var _len = arguments.length, additional = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      additional[_key - 1] = arguments[_key];
    }

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Model.__proto__ || Object.getPrototypeOf(Model)).call.apply(_ref, [this, params].concat(additional)));
  }

  return Model;
}(__WEBPACK_IMPORTED_MODULE_3__components_meshes_Importer__["a" /* Importer */]);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pass_index__ = __webpack_require__(132);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__pass_index__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__pass_index__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__pass_index__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__pass_index__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__pass_index__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__pass_index__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__pass_index__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shader_index__ = __webpack_require__(133);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__shader_index__["a"]; });



/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pass_js__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClearPass; });




/**
 * @author mrdoob / http://mrdoob.com/
 * @author yannis torres / es6 migration
 */



var ClearPass = function (_Pass) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ClearPass, _Pass);

  function ClearPass(name, clearColor, clearAlpha) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ClearPass);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ClearPass.__proto__ || Object.getPrototypeOf(ClearPass)).call(this, name));

    _this.needsSwap = false;
    _this.clearColor = clearColor === undefined ? 0x000000 : clearColor;
    _this.clearAlpha = clearAlpha === undefined ? 0 : clearAlpha;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ClearPass, [{
    key: 'render',
    value: function render(renderer, writeBuffer, readBuffer) {
      // REMARK: "maskActive" and "delta" never used. Removed.
      // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

      var oldClearColor = void 0,
          oldClearAlpha = void 0;

      if (this.clearColor) {
        oldClearColor = renderer.getClearColor().getHex();
        oldClearAlpha = renderer.getClearAlpha();
        renderer.setClearColor(this.clearColor, this.clearAlpha);
      }

      renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
      renderer.clear();

      if (this.clearColor) renderer.setClearColor(oldClearColor, oldClearAlpha);
    }
  }]);

  return ClearPass;
}(__WEBPACK_IMPORTED_MODULE_4__Pass_js__["a" /* Pass */]);

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pass_js__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaskPass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ClearMaskPass; });




/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */



var MaskPass = function (_Pass) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(MaskPass, _Pass);

  function MaskPass(name, scene, camera) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, MaskPass);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (MaskPass.__proto__ || Object.getPrototypeOf(MaskPass)).call(this, name));

    _this.scene = scene;
    _this.camera = camera;

    _this.clear = true;
    _this.needsSwap = false;
    _this.inverse = false;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(MaskPass, [{
    key: 'render',
    value: function render(renderer, writeBuffer, readBuffer) {
      // REMARK: "maskActive" and "delta" never used. Removed.
      // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

      var context = renderer.context;
      var state = renderer.state;

      // don't update color or depth
      state.buffers.color.setMask(false);
      state.buffers.depth.setMask(false);

      // lock buffers
      state.buffers.color.setLocked(true);
      state.buffers.depth.setLocked(true);

      // set up stencil
      var writeValue = this.inverse ? 0 : 1;
      var clearValue = this.inverse ? 1 : 0;

      state.buffers.stencil.setTest(true);
      state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
      state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
      state.buffers.stencil.setClear(clearValue);

      // draw into the stencil buffer
      renderer.render(this.scene, this.camera, readBuffer, this.clear);
      renderer.render(this.scene, this.camera, writeBuffer, this.clear);

      // unlock color and depth buffer for subsequent rendering
      state.buffers.color.setLocked(false);
      state.buffers.depth.setLocked(false);

      // only render where stencil is set to 1
      state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1
      state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
    }
  }]);

  return MaskPass;
}(__WEBPACK_IMPORTED_MODULE_4__Pass_js__["a" /* Pass */]);

var ClearMaskPass = function (_Pass2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ClearMaskPass, _Pass2);

  function ClearMaskPass(name) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ClearMaskPass);

    var _this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ClearMaskPass.__proto__ || Object.getPrototypeOf(ClearMaskPass)).call(this, name));

    _this2.needsSwap = false;
    return _this2;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ClearMaskPass, [{
    key: 'render',
    value: function render(renderer) {
      // REMARK: "writeBuffer", "readBuffer", "maskActive" and "delta" never used. Removed.
      // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

      renderer.state.buffers.stencil.setTest(false);
    }
  }]);

  return ClearMaskPass;
}(__WEBPACK_IMPORTED_MODULE_4__Pass_js__["a" /* Pass */]);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pass_js__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderPass; });




/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */



var RenderPass = function (_Pass) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(RenderPass, _Pass);

  function RenderPass(name, scene, camera, overrideMaterial, clearColor, clearAlpha) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, RenderPass);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (RenderPass.__proto__ || Object.getPrototypeOf(RenderPass)).call(this, name));

    _this.scene = scene;
    _this.camera = camera;

    _this.overrideMaterial = overrideMaterial;

    _this.clearColor = clearColor;
    _this.clearAlpha = clearAlpha === undefined ? 0 : clearAlpha;

    _this.clear = true;
    _this.needsSwap = false;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(RenderPass, [{
    key: 'render',
    value: function render(renderer, writeBuffer, readBuffer) {
      var oldClearColor = void 0,
          oldClearAlpha = void 0;
      var oldAutoClear = renderer.autoClear;

      renderer.autoClear = false;
      this.scene.overrideMaterial = this.overrideMaterial;

      if (this.clearColor) {
        oldClearColor = renderer.getClearColor().getHex();
        oldClearAlpha = renderer.getClearAlpha();
        renderer.setClearColor(this.clearColor, this.clearAlpha);
      }

      renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

      if (this.clearColor) renderer.setClearColor(oldClearColor, oldClearAlpha);

      this.scene.overrideMaterial = null;
      renderer.autoClear = oldAutoClear;
    }
  }]);

  return RenderPass;
}(__WEBPACK_IMPORTED_MODULE_4__Pass_js__["a" /* Pass */]);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Pass__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShaderPass; });




/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */





var ShaderPass = function (_Pass) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ShaderPass, _Pass);

  function ShaderPass(name, shader, textureID) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ShaderPass);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ShaderPass.__proto__ || Object.getPrototypeOf(ShaderPass)).call(this, name));

    _this.textureID = textureID === undefined ? 'tDiffuse' : textureID;

    if (shader instanceof __WEBPACK_IMPORTED_MODULE_4_three__["ShaderMaterial"]) {
      _this.uniforms = shader.uniforms;
      _this.material = shader;
    } else if (shader) {
      _this.uniforms = __WEBPACK_IMPORTED_MODULE_4_three__["UniformsUtils"].clone(shader.uniforms);
      _this.material = new __WEBPACK_IMPORTED_MODULE_4_three__["ShaderMaterial"]({
        defines: shader.defines || {},
        uniforms: _this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      });
    }

    _this.camera = new __WEBPACK_IMPORTED_MODULE_4_three__["OrthographicCamera"](-1, 1, 1, -1, 0, 1);
    _this.scene = new __WEBPACK_IMPORTED_MODULE_4_three__["Scene"]();

    _this.quad = new __WEBPACK_IMPORTED_MODULE_4_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_4_three__["PlaneBufferGeometry"](2, 2), null);
    _this.scene.add(_this.quad);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ShaderPass, [{
    key: 'render',
    value: function render(renderer, writeBuffer, readBuffer) {
      // REMARK: "maskActive" and "delta" never used. Removed.
      // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

      if (this.uniforms[this.textureID]) this.uniforms[this.textureID].value = readBuffer.texture;

      this.quad.material = this.material;

      if (this.renderToScreen) renderer.render(this.scene, this.camera);else renderer.render(this.scene, this.camera, writeBuffer, this.clear);
    }
  }]);

  return ShaderPass;
}(__WEBPACK_IMPORTED_MODULE_5__Pass__["a" /* Pass */]);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shader_CopyShader__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Pass__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TexturePass; });




/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */






var TexturePass = function (_Pass) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(TexturePass, _Pass);

  function TexturePass(name, map, opacity) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TexturePass);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TexturePass.__proto__ || Object.getPrototypeOf(TexturePass)).call(this, name));

    if (__WEBPACK_IMPORTED_MODULE_5__shader_CopyShader__["a" /* CopyShader */] === undefined) console.error('TexturePass relies on CopyShader');

    var shader = __WEBPACK_IMPORTED_MODULE_5__shader_CopyShader__["a" /* CopyShader */];

    _this.map = map;
    _this.opacity = opacity === undefined ? 1.0 : opacity;

    _this.uniforms = __WEBPACK_IMPORTED_MODULE_4_three__["UniformsUtils"].clone(shader.uniforms);

    _this.material = new __WEBPACK_IMPORTED_MODULE_4_three__["ShaderMaterial"]({
      uniforms: _this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      depthTest: false,
      depthWrite: false
    });

    _this.needsSwap = false;

    _this.camera = new __WEBPACK_IMPORTED_MODULE_4_three__["OrthographicCamera"](-1, 1, 1, -1, 0, 1);
    _this.scene = new __WEBPACK_IMPORTED_MODULE_4_three__["Scene"]();

    _this.quad = new __WEBPACK_IMPORTED_MODULE_4_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_4_three__["PlaneBufferGeometry"](2, 2), null);
    _this.scene.add(_this.quad);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TexturePass, [{
    key: 'render',
    value: function render(renderer, writeBuffer, readBuffer) {
      // REMARK: "maskActive" and "delta" never used. Removed.
      // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

      var oldAutoClear = renderer.autoClear;
      renderer.autoClear = false;

      this.quad.material = this.material;

      this.uniforms.opacity.value = this.opacity;
      this.uniforms.tDiffuse.value = this.map;
      this.material.transparent = this.opacity < 1.0;

      renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);
      renderer.autoClear = oldAutoClear;
    }
  }]);

  return TexturePass;
}(__WEBPACK_IMPORTED_MODULE_6__Pass__["a" /* Pass */]);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ClearPass_js__ = __webpack_require__(127);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ClearPass_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaskPass_js__ = __webpack_require__(128);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__MaskPass_js__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__MaskPass_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pass_js__ = __webpack_require__(20);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__Pass_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__RenderPass_js__ = __webpack_require__(129);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__RenderPass_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ShaderPass_js__ = __webpack_require__(130);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__ShaderPass_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TexturePass_js__ = __webpack_require__(131);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__TexturePass_js__["a"]; });







/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CopyShader_js__ = __webpack_require__(66);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__CopyShader_js__["a"]; });


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FogModule; });




var FogModule = function () {
  function FogModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var type = arguments[1];

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, FogModule);

    this.params = Object.assign({
      color: 0xefd1b5,
      density: 0.020,
      near: 10,
      far: 1000
    }, params);
    if (!type || type === 'exp2') this.fog = new __WEBPACK_IMPORTED_MODULE_2_three__["FogExp2"](this.params.color, this.params.density);else if (type === 'linear') this.fog = new __WEBPACK_IMPORTED_MODULE_2_three__["Fog"](this.params.color, this.params.near, this.params.far);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(FogModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.set('fog', this.fog);
      _manager.get('scene').fog = this.fog;
    }
  }]);

  return FogModule;
}();



/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postprocessing__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_Loop__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostProcessorModule; });





var _class, _temp;







// console.log(Pass);

var ShaderPass = function (_Pass) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ShaderPass, _Pass);

  function ShaderPass() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ShaderPass);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ShaderPass.__proto__ || Object.getPrototypeOf(ShaderPass)).apply(this, arguments));
  }

  return ShaderPass;
}(__WEBPACK_IMPORTED_MODULE_4_postprocessing__["a" /* Pass */]);

console.log(new ShaderPass());

var PostProcessorModule = (_temp = _class = function () {
  function PostProcessorModule() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PostProcessorModule);
  }

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass___default()(PostProcessorModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('postprocessor');

      this.renderer = _manager.get('renderer');
      this.scene = _manager.get('scene');
      this.camera = _manager.get('camera');

      this.composer = new __WEBPACK_IMPORTED_MODULE_4_postprocessing__["b" /* EffectComposer */](this.renderer);

      _manager.use('rendering').renderLoop.stop();

      var composer = this.composer;
      this.renderLoop = new __WEBPACK_IMPORTED_MODULE_5__core_Loop__["a" /* Loop */](function (clock) {
        return composer.render(clock.getDelta());
      }).start(_manager.handler);

      this.setup();
    }
  }, {
    key: 'setup',
    value: function setup() {
      var renderPass = new __WEBPACK_IMPORTED_MODULE_4_postprocessing__["c" /* RenderPass */](this.scene, this.camera.native);
      // renderPass.renderToScreen = true;
      this.composer.addPass(renderPass);
    }
  }, {
    key: 'pass',
    value: function pass(_pass) {
      this.composer.addPass(_pass);
    }
  }]);

  return PostProcessorModule;
}(), _class.ShaderPass = ShaderPass, _temp);


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_minivents__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_minivents___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_minivents__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EventsPatchModule__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualMouseModule; });









var VirtualMouseModule = function (_Events) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(VirtualMouseModule, _Events);

  function VirtualMouseModule() {
    var globalMovement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var patchEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, VirtualMouseModule);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (VirtualMouseModule.__proto__ || Object.getPrototypeOf(VirtualMouseModule)).call(this));

    _this.mouse = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();
    _this.raycaster = new __WEBPACK_IMPORTED_MODULE_4_three__["Raycaster"]();
    _this.world = null;
    _this.canvas = null;
    _this.projectionPlane = new __WEBPACK_IMPORTED_MODULE_4_three__["Plane"](new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"](0, 0, 1), 0);

    _this.globalMovement = globalMovement;
    _this.patchEvents = patchEvents;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(VirtualMouseModule, [{
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

      this.canvas = _manager.get('renderer').domElement;
      this.camera = _manager.get('camera').native;
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      var _this2 = this;

      if (self.patchEvents) this.applyModuleOnce(__WEBPACK_IMPORTED_MODULE_6__EventsPatchModule__["a" /* EventsPatchModule */], function () {
        return new __WEBPACK_IMPORTED_MODULE_6__EventsPatchModule__["a" /* EventsPatchModule */]();
      });

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
    get: function get() {
      return this.raycaster.ray;
    }
  }, {
    key: 'x',
    get: function get() {
      return this.mouse.x;
    }
  }, {
    key: 'y',
    get: function get() {
      return this.mouse.y;
    }
  }]);

  return VirtualMouseModule;
}(__WEBPACK_IMPORTED_MODULE_5_minivents___default.a);



/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ControlsModule__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_ThreeOrbitControls__ = __webpack_require__(139);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrbitControlsModule; });









var OrbitControlsModule = function (_ControlsModule) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(OrbitControlsModule, _ControlsModule);

  function OrbitControlsModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var patchEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, OrbitControlsModule);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (OrbitControlsModule.__proto__ || Object.getPrototypeOf(OrbitControlsModule)).call(this, params, patchEvents));

    _this.params = Object.assign({
      follow: false,
      target: new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"](0, 0, 0)
    }, params);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(OrbitControlsModule, [{
    key: 'manager',
    value: function manager(_manager) {
      var controls = new __WEBPACK_IMPORTED_MODULE_6__lib_ThreeOrbitControls__["a" /* ThreeOrbitControls */](_manager.get('camera').native, _manager.get('element'), _manager.handler);

      var params = this.params;


      var updateProcessor = params.follow ? function (c) {
        controls.update(c.getDelta());
        controls.target.copy(params.target);
      } : function (c) {
        controls.update(c.getDelta());
      };

      this.setControls(controls);
      this.setUpdate(updateProcessor);

      _manager.update({
        camera: function camera(_camera) {
          controls.object = _camera.native;
        }
      });

      controls.target.copy(params.target);
    }
  }]);

  return OrbitControlsModule;
}(__WEBPACK_IMPORTED_MODULE_5__ControlsModule__["a" /* ControlsModule */]);



/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OrbitControlsModule__ = __webpack_require__(137);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__OrbitControlsModule__["a"]; });


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreeOrbitControls; });






// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

var ThreeOrbitControls = function (_EventDispatcher) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ThreeOrbitControls, _EventDispatcher);

  function ThreeOrbitControls(object, domElement, eventHandler) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ThreeOrbitControls);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ThreeOrbitControls.__proto__ || Object.getPrototypeOf(ThreeOrbitControls)).call(this));

    _this.object = object;

    _this.domElement = domElement === undefined ? document : domElement;
    _this.eventHandler = eventHandler;

    // Set to false to disable this control
    _this.enabled = true;

    // "target" sets the location of focus, where the object orbits around
    _this.target = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"]();

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
    _this.mouseButtons = { ORBIT: __WEBPACK_IMPORTED_MODULE_4_three__["MOUSE"].LEFT, ZOOM: __WEBPACK_IMPORTED_MODULE_4_three__["MOUSE"].MIDDLE, PAN: __WEBPACK_IMPORTED_MODULE_4_three__["MOUSE"].RIGHT };

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
      var offset = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"]();

      // so camera.up is the orbit axis
      var quat = new __WEBPACK_IMPORTED_MODULE_4_three__["Quaternion"]().setFromUnitVectors(object.up, new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"](0, 1, 0));
      var quatInverse = quat.clone().inverse();

      var lastPosition = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"]();
      var lastQuaternion = new __WEBPACK_IMPORTED_MODULE_4_three__["Quaternion"]();

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
    var spherical = new __WEBPACK_IMPORTED_MODULE_4_three__["Spherical"]();
    var sphericalDelta = new __WEBPACK_IMPORTED_MODULE_4_three__["Spherical"]();

    var scale = 1;
    var panOffset = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"]();
    var zoomChanged = false;

    var rotateStart = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();
    var rotateEnd = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();
    var rotateDelta = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();

    var panStart = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();
    var panEnd = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();
    var panDelta = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();

    var dollyStart = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();
    var dollyEnd = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();
    var dollyDelta = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector2"]();

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
      var v = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"]();

      return function (distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }();

    var panUp = function () {
      var v = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"]();

      return function (distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    }();

    // deltaX and deltaY are in pixels; right and down are positive
    var pan = function () {
      var offset = new __WEBPACK_IMPORTED_MODULE_4_three__["Vector3"]();

      return function (deltaX, deltaY) {
        var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

        if (_this.object instanceof __WEBPACK_IMPORTED_MODULE_4_three__["PerspectiveCamera"]) {
          // perspective
          var position = _this.object.position;
          offset.copy(position).sub(_this.target);
          var targetDistance = offset.length();

          // half of the fov is center to top of screen
          targetDistance *= Math.tan(_this.object.fov / 2 * Math.PI / 180.0);

          // we actually don't use screenWidth, since perspective camera is fixed to screen height
          panLeft(2 * deltaX * targetDistance / element.clientHeight, _this.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, _this.object.matrix);
        } else if (_this.object instanceof __WEBPACK_IMPORTED_MODULE_4_three__["OrthographicCamera"]) {
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
      if (_this.object instanceof __WEBPACK_IMPORTED_MODULE_4_three__["PerspectiveCamera"]) scale /= dollyScale;else if (_this.object instanceof __WEBPACK_IMPORTED_MODULE_4_three__["OrthographicCamera"]) {
        _this.object.zoom = Math.max(_this.minZoom, Math.min(_this.maxZoom, _this.object.zoom * dollyScale));
        _this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControlsModule.js encountered an unknown camera type - dolly/zoom disabled.');
        _this.enableZoom = false;
      }
    };

    var dollyOut = function dollyOut(dollyScale) {
      if (_this.object instanceof __WEBPACK_IMPORTED_MODULE_4_three__["PerspectiveCamera"]) scale *= dollyScale;else if (_this.object instanceof __WEBPACK_IMPORTED_MODULE_4_three__["OrthographicCamera"]) {
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

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ThreeOrbitControls, [{
    key: 'center',
    get: function get() {
      console.warn('OrbitControls: .center has been renamed to .target');
      return this.target;
    }
  }, {
    key: 'noZoom',
    get: function get() {
      console.warn('OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
      return !this.enableZoom;
    },
    set: function set(value) {
      console.warn('OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
      this.enableZoom = !value;
    }
  }, {
    key: 'noRotate',
    get: function get() {
      console.warn('OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
      return !this.enableRotate;
    },
    set: function set(value) {
      console.warn('OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
      this.enableRotate = !value;
    }
  }, {
    key: 'noPan',
    get: function get() {
      console.warn('OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
      return !this.enablePan;
    },
    set: function set(value) {
      console.warn('OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
      this.enablePan = !value;
    }
  }, {
    key: 'noKeys',
    get: function get() {
      console.warn('OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
      return !this.enableKeys;
    },
    set: function set(value) {
      console.warn('OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
      this.enableKeys = !value;
    }
  }, {
    key: 'staticMoving',
    get: function get() {
      console.warn('OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      return !this.enableDamping;
    },
    set: function set(value) {
      console.warn('OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      this.enableDamping = !value;
    }
  }, {
    key: 'dynamicDampingFactor',
    get: function get() {
      console.warn('OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      return this.dampingFactor;
    },
    set: function set(value) {
      console.warn('OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      this.dampingFactor = value;
    }
  }]);

  return ThreeOrbitControls;
}(__WEBPACK_IMPORTED_MODULE_4_three__["EventDispatcher"]);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementModule__ = __webpack_require__(37);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ElementModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CameraModule__ = __webpack_require__(36);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__CameraModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RenderingModule__ = __webpack_require__(39);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__RenderingModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SceneModule__ = __webpack_require__(41);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__SceneModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ResizeModule__ = __webpack_require__(40);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__ResizeModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PostProcessorModule2__ = __webpack_require__(135);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__PostProcessorModule2__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VirtualMouseModule__ = __webpack_require__(136);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__VirtualMouseModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__EventsPatchModule__ = __webpack_require__(38);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__EventsPatchModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ControlsModule__ = __webpack_require__(67);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__ControlsModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__FogModule__ = __webpack_require__(134);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_9__FogModule__["a"]; });











/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicGeometryModule; });



var DynamicGeometryModule = function () {
  function DynamicGeometryModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DynamicGeometryModule);

    this.params = Object.assign({
      attributes: false
    }, params);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DynamicGeometryModule, [{
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
              get: function get() {
                return this.native.geometry.parameters[key];
              },
              set: function set(value) {
                this.native.geometry = this.buildGeometry(this.updateParams({ geometry: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, key, value) }));
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

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextureModule; });




var loader = new __WEBPACK_IMPORTED_MODULE_2_three__["TextureLoader"]();

var TextureModule = function () {
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TextureModule, null, [{
    key: 'load',
    value: function load(url) {
      return new TextureModule({ url: url }).textures[0][1];
    }
  }]);

  function TextureModule() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TextureModule);

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
          offset = _ref$offset === undefined ? new __WEBPACK_IMPORTED_MODULE_2_three__["Vector2"](0, 0) : _ref$offset,
          _ref$repeat = _ref.repeat,
          repeat = _ref$repeat === undefined ? new __WEBPACK_IMPORTED_MODULE_2_three__["Vector2"](1, 1) : _ref$repeat,
          _ref$wrap = _ref.wrap,
          wrap = _ref$wrap === undefined ? __WEBPACK_IMPORTED_MODULE_2_three__["RepeatWrapping"] : _ref$wrap,
          _ref$mapping = _ref.mapping,
          mapping = _ref$mapping === undefined ? __WEBPACK_IMPORTED_MODULE_2_three__["UVMapping"] : _ref$mapping,
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

      texture.magFilter = __WEBPACK_IMPORTED_MODULE_2_three__["NearestFilter"];
      texture.minFilter = __WEBPACK_IMPORTED_MODULE_2_three__["LinearMipMapLinearFilter"];

      _this.textures.push([type, fix(texture)]);
    });
  }

  return TextureModule;
}();

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DynamicGeometryModule__ = __webpack_require__(141);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__DynamicGeometryModule__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextureModule__ = __webpack_require__(142);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__TextureModule__["a"]; });



/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Preset; });


var Preset = function () {
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Preset, null, [{
    key: "Array",
    value: function Array() {
      var array = [];

      for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
        modules[_key] = arguments[_key];
      }

      modules.forEach(function (module) {
        if (module[0]) array.push(module[1]());
      });

      return array;
    }
  }]);

  function Preset(modules) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Preset);

    this.modules = modules;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Preset, [{
    key: "get",
    value: function get() {
      return this.modules;
    }
  }, {
    key: "extend",
    value: function extend(modules) {
      this.modules = this.modules.concat(modules);
      return this;
    }
  }]);

  return Preset;
}();

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Preset__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_ElementModule__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_SceneModule__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_CameraModule__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_RenderingModule__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_ResizeModule__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicAppPreset; });












var BasicAppPreset = function (_Preset) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(BasicAppPreset, _Preset);

  function BasicAppPreset() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        camera = _ref.camera,
        rendering = _ref.rendering,
        element = _ref.element;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, BasicAppPreset);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (BasicAppPreset.__proto__ || Object.getPrototypeOf(BasicAppPreset)).call(this, [new __WEBPACK_IMPORTED_MODULE_5__app_ElementModule__["a" /* ElementModule */](element), new __WEBPACK_IMPORTED_MODULE_6__app_SceneModule__["a" /* SceneModule */](), new __WEBPACK_IMPORTED_MODULE_7__app_CameraModule__["a" /* CameraModule */](camera), new __WEBPACK_IMPORTED_MODULE_8__app_RenderingModule__["a" /* RenderingModule */](rendering, {
      shadow: true
    })]));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(BasicAppPreset, [{
    key: 'autoresize',
    value: function autoresize() {
      this.modules.push(new __WEBPACK_IMPORTED_MODULE_9__app_ResizeModule__["a" /* ResizeModule */]());
      return this;
    }
  }]);

  return BasicAppPreset;
}(__WEBPACK_IMPORTED_MODULE_4__Preset__["a" /* Preset */]);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_basic__ = __webpack_require__(145);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_basic__["a"]; });


/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extend; });
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

      if (!extension) continue; // Ignore null and undefined objects and paramaters.

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

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return instruct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return transformData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return toArray; });
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

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(161), __esModule: true };

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(163), __esModule: true };

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(166), __esModule: true };

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(167), __esModule: true };

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(168), __esModule: true };

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(69);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
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

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(150);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(149);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
__webpack_require__(58);
module.exports = __webpack_require__(188);

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
__webpack_require__(58);
module.exports = __webpack_require__(189);

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(191);
module.exports = __webpack_require__(10).Object.assign;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(192);
var $Object = __webpack_require__(10).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(193);
var $Object = __webpack_require__(10).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(194);
var $Object = __webpack_require__(10).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(195);
module.exports = __webpack_require__(10).Object.getPrototypeOf;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(196);
module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(198);
__webpack_require__(197);
__webpack_require__(199);
__webpack_require__(200);
module.exports = __webpack_require__(10).Symbol;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
__webpack_require__(59);
module.exports = __webpack_require__(57).f('iterator');

/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13)
  , toLength  = __webpack_require__(186)
  , toIndex   = __webpack_require__(185);
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

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(27)
  , gOPS    = __webpack_require__(49)
  , pIE     = __webpack_require__(30);
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

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12).document && document.documentElement;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(43);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(47)
  , descriptor     = __webpack_require__(31)
  , setToStringTag = __webpack_require__(50)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(23)(IteratorPrototype, __webpack_require__(11)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(27)
  , toIObject = __webpack_require__(13);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(32)('meta')
  , isObject = __webpack_require__(25)
  , has      = __webpack_require__(17)
  , setDesc  = __webpack_require__(18).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(22)(function(){
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

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(27)
  , gOPS     = __webpack_require__(49)
  , pIE      = __webpack_require__(30)
  , toObject = __webpack_require__(54)
  , IObject  = __webpack_require__(75)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(22)(function(){
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

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(18)
  , anObject = __webpack_require__(21)
  , getKeys  = __webpack_require__(27);

module.exports = __webpack_require__(15) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13)
  , gOPN      = __webpack_require__(77).f
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


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(25)
  , anObject = __webpack_require__(21);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(72)(Function.call, __webpack_require__(48).f(Object.prototype, '__proto__').set, 2);
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

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(53)
  , defined   = __webpack_require__(44);
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

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(53)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(53)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(71)
  , ITERATOR  = __webpack_require__(11)('iterator')
  , Iterators = __webpack_require__(26);
module.exports = __webpack_require__(10).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(21)
  , get      = __webpack_require__(187);
module.exports = __webpack_require__(10).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(71)
  , ITERATOR  = __webpack_require__(11)('iterator')
  , Iterators = __webpack_require__(26);
module.exports = __webpack_require__(10).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(171)
  , step             = __webpack_require__(177)
  , Iterators        = __webpack_require__(26)
  , toIObject        = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(76)(Array, 'Array', function(iterated, kind){
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

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(16);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(180)});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(16)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(47)});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(16);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(15), 'Object', {defineProperty: __webpack_require__(18).f});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(13)
  , $getOwnPropertyDescriptor = __webpack_require__(48).f;

__webpack_require__(80)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(54)
  , $getPrototypeOf = __webpack_require__(78);

__webpack_require__(80)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(16);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(183).set});

/***/ }),
/* 197 */
/***/ (function(module, exports) {



/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(12)
  , has            = __webpack_require__(17)
  , DESCRIPTORS    = __webpack_require__(15)
  , $export        = __webpack_require__(16)
  , redefine       = __webpack_require__(81)
  , META           = __webpack_require__(179).KEY
  , $fails         = __webpack_require__(22)
  , shared         = __webpack_require__(52)
  , setToStringTag = __webpack_require__(50)
  , uid            = __webpack_require__(32)
  , wks            = __webpack_require__(11)
  , wksExt         = __webpack_require__(57)
  , wksDefine      = __webpack_require__(56)
  , keyOf          = __webpack_require__(178)
  , enumKeys       = __webpack_require__(173)
  , isArray        = __webpack_require__(175)
  , anObject       = __webpack_require__(21)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(55)
  , createDesc     = __webpack_require__(31)
  , _create        = __webpack_require__(47)
  , gOPNExt        = __webpack_require__(182)
  , $GOPD          = __webpack_require__(48)
  , $DP            = __webpack_require__(18)
  , $keys          = __webpack_require__(27)
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
  __webpack_require__(77).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f  = $propertyIsEnumerable;
  __webpack_require__(49).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(46)){
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(23)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56)('asyncIterator');

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56)('observable');

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(205);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

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
    ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(33)))

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(206);


/** Built-in value references. */
var getPrototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(82);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(202);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__passes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__materials__ = __webpack_require__(9);





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

		this.copyPass = new __WEBPACK_IMPORTED_MODULE_1__passes__["c" /* ShaderPass */](new __WEBPACK_IMPORTED_MODULE_2__materials__["a" /* CopyMaterial */]());

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

		const renderTarget = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderTarget"](size.width * pixelRatio, size.height * pixelRatio, {
			minFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			magFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			format: alpha ? __WEBPACK_IMPORTED_MODULE_0_three__["RGBAFormat"] : __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"],
			depthBuffer: depthBuffer,
			stencilBuffer: stencilBuffer,
			depthTexture: depthTexture ? new __WEBPACK_IMPORTED_MODULE_0_three__["DepthTexture"]() : null
		});

		if(depthTexture && stencilBuffer) {

			renderTarget.depthTexture.format = __WEBPACK_IMPORTED_MODULE_0_three__["DepthStencilFormat"];
			renderTarget.depthTexture.type = __WEBPACK_IMPORTED_MODULE_0_three__["UnsignedInt248Type"];

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

				if(pass instanceof __WEBPACK_IMPORTED_MODULE_1__passes__["d" /* MaskPass */]) {

					maskActive = true;

				} else if(pass instanceof __WEBPACK_IMPORTED_MODULE_1__passes__["e" /* ClearMaskPass */]) {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = EffectComposer;



/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_composer_js__ = __webpack_require__(209);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__effect_composer_js__["a"]; });
/**
 * Core components.
 *
 * @module postprocessing/core
 */




/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(210);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__core__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__passes__ = __webpack_require__(86);
/* unused harmony reexport BloomPass */
/* unused harmony reexport BlurPass */
/* unused harmony reexport BokehPass */
/* unused harmony reexport Bokeh2Pass */
/* unused harmony reexport ClearPass */
/* unused harmony reexport ClearMaskPass */
/* unused harmony reexport DepthPass */
/* unused harmony reexport DotScreenPass */
/* unused harmony reexport FilmPass */
/* unused harmony reexport GlitchMode */
/* unused harmony reexport GlitchPass */
/* unused harmony reexport GodRaysPass */
/* unused harmony reexport MaskPass */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__passes__["a"]; });
/* unused harmony reexport PixelationPass */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__passes__["b"]; });
/* unused harmony reexport SavePass */
/* unused harmony reexport ShaderPass */
/* unused harmony reexport ShockWavePass */
/* unused harmony reexport SMAAPass */
/* unused harmony reexport TexturePass */
/* unused harmony reexport ToneMappingPass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__materials__ = __webpack_require__(9);
/* unused harmony reexport AdaptiveLuminosityMaterial */
/* unused harmony reexport BokehMaterial */
/* unused harmony reexport Bokeh2Material */
/* unused harmony reexport CombineMaterial */
/* unused harmony reexport ConvolutionMaterial */
/* unused harmony reexport CopyMaterial */
/* unused harmony reexport DepthMaterial */
/* unused harmony reexport DotScreenMaterial */
/* unused harmony reexport FilmMaterial */
/* unused harmony reexport GlitchMaterial */
/* unused harmony reexport GodRaysMaterial */
/* unused harmony reexport KernelSize */
/* unused harmony reexport LuminosityMaterial */
/* unused harmony reexport PixelationMaterial */
/* unused harmony reexport ShockWaveMaterial */
/* unused harmony reexport SMAABlendMaterial */
/* unused harmony reexport SMAAColorEdgesMaterial */
/* unused harmony reexport SMAAWeightsMaterial */
/* unused harmony reexport ToneMappingMaterial */
/**
 * Exposure of the library components.
 *
 * @module postprocessing
 */








/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tPreviousLum;\r\nuniform sampler2D tCurrentLum;\r\nuniform float minLuminance;\r\nuniform float delta;\r\nuniform float tau;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tfloat previousLum = texture2D(tPreviousLum, vUv, MIP_LEVEL_1X1).r;\r\n\tfloat currentLum = texture2D(tCurrentLum, vUv, MIP_LEVEL_1X1).r;\r\n\r\n\tpreviousLum = max(minLuminance, previousLum);\r\n\tcurrentLum = max(minLuminance, currentLum);\r\n\r\n\t// Adapt the luminance using Pattanaik's technique.\r\n\tfloat adaptedLum = previousLum + (currentLum - previousLum) * (1.0 - exp(-delta * tau));\r\n\r\n\tgl_FragColor.r = adaptedLum;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * An adaptive luminosity shader material.
 */

class AdaptiveLuminosityMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new adaptive luminosity material.
	 */

	constructor() {

		super({

			type: "AdaptiveLuminosityMaterial",

			defines: {

				MIP_LEVEL_1X1: "0.0"

			},

			uniforms: {

				tPreviousLum: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				tCurrentLum: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				minLuminance: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.01),
				delta: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.0),
				tau: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = AdaptiveLuminosityMaterial;



/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform sampler2D tDepth;\r\n\r\nuniform float focus;\r\nuniform float aspect;\r\nuniform float aperture;\r\nuniform float maxBlur;\r\n\r\nvarying vec2 vUv;\r\n\r\n#ifndef USE_LOGDEPTHBUF\r\n\r\n\t#include <packing>\r\n\r\n\tuniform float cameraNear;\r\n\tuniform float cameraFar;\r\n\r\n\tfloat readDepth(sampler2D depthSampler, vec2 coord) {\r\n\r\n\t\tfloat fragCoordZ = texture2D(depthSampler, coord).x;\r\n\t\tfloat viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\r\n\r\n\t\treturn viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\nvoid main() {\r\n\r\n\tvec2 aspectCorrection = vec2(1.0, aspect);\r\n\r\n\t#ifdef USE_LOGDEPTHBUF\r\n\r\n\t\tfloat depth = texture2D(tDepth, vUv).x;\r\n\r\n\t#else\r\n\r\n\t\tfloat depth = readDepth(tDepth, vUv);\r\n\r\n\t#endif\r\n\r\n\tfloat factor = depth - focus;\r\n\r\n\tvec2 dofBlur = vec2(clamp(factor * aperture, -maxBlur, maxBlur));\r\n\r\n\tvec2 dofblur9 = dofBlur * 0.9;\r\n\tvec2 dofblur7 = dofBlur * 0.7;\r\n\tvec2 dofblur4 = dofBlur * 0.4;\r\n\r\n\tvec4 color = vec4(0.0);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15,  0.37) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29,  0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37,  0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.40,  0.0 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37, -0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29, -0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15, -0.37) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15,  0.37) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29,  0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37,  0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37, -0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29, -0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15, -0.37) * aspectCorrection) * dofBlur);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15,  0.37) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37,  0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37, -0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15, -0.37) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15,  0.37) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37,  0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37, -0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15, -0.37) * aspectCorrection) * dofblur9);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29,  0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.40,  0.0 ) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29, -0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29,  0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29, -0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofblur7);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29,  0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.4,   0.0 ) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29, -0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29,  0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29, -0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofblur4);\r\n\r\n\tgl_FragColor = color / 41.0;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Depth of Field shader (Bokeh).
 *
 * Original shader code by Martins Upitis:
 *  http://artmartinsh.blogspot.com/2010/02/glsl-lens-blur-filter-with-bokeh.html
 */

class BokehMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new bokeh material.
	 *
	 * @param {PerspectiveCamera} [camera] - A camera.
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.focus=1.0] - Focus distance.
	 * @param {Number} [options.aperture=0.025] - Camera aperture scale. Bigger values for shallower depth of field.
	 * @param {Number} [options.maxBlur=1.0] - Maximum blur strength.
	 */

	constructor(camera = null, options = {}) {

		if(options.focus === undefined) { options.focus = 1.0; }
		if(options.aperture === undefined) { options.aperture = 0.025; }
		if(options.maxBlur === undefined) { options.maxBlur = 1.0; }

		super({

			type: "BokehMaterial",

			uniforms: {

				cameraNear: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.1),
				cameraFar: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](2000),
				aspect: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				tDepth: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),

				focus: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.focus),
				aperture: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.aperture),
				maxBlur: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.maxBlur)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		if(camera !== null) { this.adoptCameraSettings(camera); }

	}

	/**
	 * Adopts the settings of the given camera.
	 *
	 * @param {PerspectiveCamera} camera - A camera.
	 */

	adoptCameraSettings(camera) {

		this.uniforms.cameraNear.value = camera.near;
		this.uniforms.cameraFar.value = camera.far;
		this.uniforms.aspect.value = camera.aspect;

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BokehMaterial;



/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform sampler2D tDepth;\r\n\r\nuniform vec2 texelSize;\r\nuniform vec2 halfTexelSize;\r\n\r\nuniform float cameraNear;\r\nuniform float cameraFar;\r\n\r\nuniform float focalLength;\r\nuniform float focalStop;\r\n\r\nuniform float maxBlur;\r\nuniform float luminanceThreshold;\r\nuniform float luminanceGain;\r\nuniform float bias;\r\nuniform float fringe;\r\nuniform float ditherStrength;\r\n\r\n#ifdef SHADER_FOCUS\r\n\r\n\tuniform vec2 focusCoords;\r\n\r\n#else\r\n\r\n\tuniform float focalDepth;\r\n\r\n#endif\r\n\r\nvarying vec2 vUv;\r\n\r\n#ifndef USE_LOGDEPTHBUF\r\n\r\n\t#include <packing>\r\n\r\n\tfloat readDepth(sampler2D depthSampler, vec2 coord) {\r\n\r\n\t\tfloat fragCoordZ = texture2D(depthSampler, coord).x;\r\n\t\tfloat viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\r\n\r\n\t\treturn viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\n#ifdef PENTAGON\r\n\r\n\tfloat penta(vec2 coords) {\r\n\r\n\t\tconst vec4 HS0 = vec4( 1.0,          0.0,         0.0, 1.0);\r\n\t\tconst vec4 HS1 = vec4( 0.309016994,  0.951056516, 0.0, 1.0);\r\n\t\tconst vec4 HS2 = vec4(-0.809016994,  0.587785252, 0.0, 1.0);\r\n\t\tconst vec4 HS3 = vec4(-0.809016994, -0.587785252, 0.0, 1.0);\r\n\t\tconst vec4 HS4 = vec4( 0.309016994, -0.951056516, 0.0, 1.0);\r\n\t\tconst vec4 HS5 = vec4( 0.0,          0.0,         1.0, 1.0);\r\n\r\n\t\tconst vec4 ONE = vec4(1.0);\r\n\r\n\t\tconst float P_FEATHER = 0.4;\r\n\t\tconst float N_FEATHER = -P_FEATHER;\r\n\r\n\t\tfloat inOrOut = -4.0;\r\n\r\n\t\tvec4 P = vec4(coords, vec2(RINGS_FLOAT - 1.3));\r\n\r\n\t\tvec4 dist = vec4(\r\n\t\t\tdot(P, HS0),\r\n\t\t\tdot(P, HS1),\r\n\t\t\tdot(P, HS2),\r\n\t\t\tdot(P, HS3)\r\n\t\t);\r\n\r\n\t\tdist = smoothstep(N_FEATHER, P_FEATHER, dist);\r\n\r\n\t\tinOrOut += dot(dist, ONE);\r\n\r\n\t\tdist.x = dot(P, HS4);\r\n\t\tdist.y = HS5.w - abs(P.z);\r\n\r\n\t\tdist = smoothstep(N_FEATHER, P_FEATHER, dist);\r\n\t\tinOrOut += dist.x;\r\n\r\n\t\treturn clamp(inOrOut, 0.0, 1.0);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\n#ifdef SHOW_FOCUS\r\n\r\n\tvec3 debugFocus(vec3 c, float blur, float depth) {\r\n\r\n\t\tfloat edge = 0.002 * depth;\r\n\t\tfloat m = clamp(smoothstep(0.0, edge, blur), 0.0, 1.0);\r\n\t\tfloat e = clamp(smoothstep(1.0 - edge, 1.0, blur), 0.0, 1.0);\r\n\r\n\t\tc = mix(c, vec3(1.0, 0.5, 0.0), (1.0 - m) * 0.6);\r\n\t\tc = mix(c, vec3(0.0, 0.5, 1.0), ((1.0 - e) - (1.0 - m)) * 0.2);\r\n\r\n\t\treturn c;\r\n\r\n\t}\r\n\r\n#endif\r\n\r\n#ifdef VIGNETTE\r\n\r\n\tfloat vignette() {\r\n\r\n\t\tconst vec2 CENTER = vec2(0.5);\r\n\r\n\t\tconst float VIGNETTE_OUT = 1.3;\r\n\t\tconst float VIGNETTE_IN = 0.0;\r\n\t\tconst float VIGNETTE_FADE = 22.0; \r\n\r\n\t\tfloat d = distance(vUv, CENTER);\r\n\t\td = smoothstep(VIGNETTE_OUT + (focalStop / VIGNETTE_FADE), VIGNETTE_IN + (focalStop / VIGNETTE_FADE), d);\r\n\r\n\t\treturn clamp(d, 0.0, 1.0);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\nvec2 rand(vec2 coord) {\r\n\r\n\tvec2 noise;\r\n\r\n\t#ifdef NOISE\r\n\r\n\t\tconst float a = 12.9898;\r\n\t\tconst float b = 78.233;\r\n\t\tconst float c = 43758.5453;\r\n\r\n\t\tnoise.x = clamp(fract(sin(mod(dot(coord, vec2(a, b)), 3.14)) * c), 0.0, 1.0) * 2.0 - 1.0;\r\n\t\tnoise.y = clamp(fract(sin(mod(dot(coord, vec2(a, b) * 2.0), 3.14)) * c), 0.0, 1.0) * 2.0 - 1.0;\r\n\r\n\t#else\r\n\r\n\t\tnoise.x = ((fract(1.0 - coord.s * halfTexelSize.x) * 0.25) + (fract(coord.t * halfTexelSize.y) * 0.75)) * 2.0 - 1.0;\r\n\t\tnoise.y = ((fract(1.0 - coord.s * halfTexelSize.x) * 0.75) + (fract(coord.t * halfTexelSize.y) * 0.25)) * 2.0 - 1.0;\r\n\r\n\t#endif\r\n\r\n\treturn noise;\r\n\r\n}\r\n\r\nvec3 processTexel(vec2 coords, float blur) {\r\n\r\n\tconst vec3 LUM_COEFF = vec3(0.299, 0.587, 0.114);\r\n\r\n\tvec3 c;\r\n\tc.r = texture2D(tDiffuse, coords + vec2(0.0, 1.0) * texelSize * fringe * blur).r;\r\n\tc.g = texture2D(tDiffuse, coords + vec2(-0.866, -0.5) * texelSize * fringe * blur).g;\r\n\tc.b = texture2D(tDiffuse, coords + vec2(0.866, -0.5) * texelSize * fringe * blur).b;\r\n\r\n\t// Calculate the luminance of the constructed colour.\r\n\tfloat luminance = dot(c.rgb, LUM_COEFF);\r\n\tfloat threshold = max((luminance - luminanceThreshold) * luminanceGain, 0.0);\r\n\r\n\treturn c + mix(vec3(0.0), c, threshold * blur);\r\n\r\n}\r\n\r\nfloat linearize(float depth) {\r\n\r\n\treturn -cameraFar * cameraNear / (depth * (cameraFar - cameraNear) - cameraFar);\r\n\r\n}\r\n\r\nfloat gather(float i, float j, float ringSamples, inout vec3 color, float w, float h, float blur) {\r\n\r\n\tconst float TWO_PI = 6.28318531;\r\n\r\n\tfloat step = TWO_PI / ringSamples;\r\n\tfloat pw = cos(j * step) * i;\r\n\tfloat ph = sin(j * step) * i;\r\n\r\n\t#ifdef PENTAGON\r\n\r\n\t\tfloat p = penta(vec2(pw, ph));\r\n\r\n\t#else\r\n\r\n\t\tfloat p = 1.0;\r\n\r\n\t#endif\r\n\r\n\tcolor += processTexel(vUv + vec2(pw * w, ph * h), blur) * mix(1.0, i / RINGS_FLOAT, bias) * p;\r\n\r\n\treturn mix(1.0, i / RINGS_FLOAT, bias) * p;\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\t#ifdef USE_LOGDEPTHBUF\r\n\r\n\t\tfloat depth = linearize(texture2D(tDepth, vUv).x);\r\n\r\n\t#else\r\n\r\n\t\tfloat depth = linearize(readDepth(tDepth, vUv));\r\n\r\n\t#endif\r\n\r\n\t#ifdef SHADER_FOCUS\r\n\r\n\t\t#ifdef USE_LOGDEPTHBUF\r\n\r\n\t\t\tfloat fDepth = linearize(texture2D(tDepth, focusCoords).x);\r\n\r\n\t\t#else\r\n\r\n\t\t\tfloat fDepth = linearize(readDepth(tDepth, focusCoords));\r\n\r\n\t\t#endif\r\n\r\n\t#else\r\n\r\n\t\tfloat fDepth = focalDepth;\r\n\r\n\t#endif\r\n\r\n\t#ifdef MANUAL_DOF\r\n\r\n\t\tconst float nDoFStart = 1.0; \r\n\t\tconst float nDoFDist = 2.0;\r\n\t\tconst float fDoFStart = 1.0;\r\n\t\tconst float fDoFDist = 3.0;\r\n\r\n\t\tfloat focalPlane = depth - fDepth;\r\n\t\tfloat farDoF = (focalPlane - fDoFStart) / fDoFDist;\r\n\t\tfloat nearDoF = (-focalPlane - nDoFStart) / nDoFDist;\r\n\r\n\t\tfloat blur = (focalPlane > 0.0) ? farDoF : nearDoF;\r\n\r\n\t#else\r\n\r\n\t\tconst float CIRCLE_OF_CONFUSION = 0.03; // 35mm film = 0.03mm CoC.\r\n\r\n\t\tfloat focalPlaneMM = fDepth * 1000.0;\r\n\t\tfloat depthMM = depth * 1000.0;\r\n\r\n\t\tfloat focalPlane = (depthMM * focalLength) / (depthMM - focalLength);\r\n\t\tfloat farDoF = (focalPlaneMM * focalLength) / (focalPlaneMM - focalLength);\r\n\t\tfloat nearDoF = (focalPlaneMM - focalLength) / (focalPlaneMM * focalStop * CIRCLE_OF_CONFUSION);\r\n\r\n\t\tfloat blur = abs(focalPlane - farDoF) * nearDoF;\r\n\r\n\t#endif\r\n\r\n\tblur = clamp(blur, 0.0, 1.0);\r\n\r\n\t// Dithering.\r\n\tvec2 noise = rand(vUv) * ditherStrength * blur;\r\n\r\n\tfloat blurFactorX = texelSize.x * blur * maxBlur + noise.x;\r\n\tfloat blurFactorY = texelSize.y * blur * maxBlur + noise.y;\r\n\r\n\tconst int MAX_RING_SAMPLES = RINGS_INT * SAMPLES_INT;\r\n\r\n\t// Calculation of final color.\r\n\tvec4 color;\r\n\r\n\tif(blur < 0.05) {\r\n\r\n\t\tcolor = texture2D(tDiffuse, vUv);\r\n\r\n\t} else {\r\n\r\n\t\tcolor = texture2D(tDiffuse, vUv);\r\n\r\n\t\tfloat s = 1.0;\r\n\t\tint ringSamples;\r\n\r\n\t\tfor(int i = 1; i <= RINGS_INT; ++i) {\r\n\r\n\t\t\tringSamples = i * SAMPLES_INT;\r\n\r\n\t\t\t// Constant loop.\r\n\t\t\tfor(int j = 0; j < MAX_RING_SAMPLES; ++j) {\r\n\r\n\t\t\t\t// Break earlier.\r\n\t\t\t\tif(j >= ringSamples) { break; }\r\n\r\n\t\t\t\ts += gather(float(i), float(j), float(ringSamples), color.rgb, blurFactorX, blurFactorY, blur);\r\n\r\n\t\t\t}\r\n\r\n\t\t}\r\n\r\n\t\tcolor.rgb /= s; // Divide by sample count.\r\n\r\n\t}\r\n\r\n\t#ifdef SHOW_FOCUS\r\n\r\n\t\tcolor.rgb = debugFocus(color.rgb, blur, depth);\r\n\r\n\t#endif\r\n\r\n\t#ifdef VIGNETTE\r\n\r\n\t\tcolor.rgb *= vignette();\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = color;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Depth of Field shader version 2.4.
 *
 * Original shader code by Martins Upitis:
 *  http://blenderartists.org/forum/showthread.php?237488-GLSL-depth-of-field-with-bokeh-v2-4-(update)
 */

class Bokeh2Material extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new bokeh2 material.
	 *
	 * @param {PerspectiveCamera} [camera] - The main camera.
	 * @param {Object} [options] - Additional options.
	 * @param {Vector2} [options.texelSize] - The absolute screen texel size.
	 * @param {Boolean} [options.showFocus=false] - Whether the focus point should be highlighted.
	 * @param {Boolean} [options.manualDoF=false] - Enables manual depth of field blur.
	 * @param {Boolean} [options.vignette=false] - Enables a vignette effect.
	 * @param {Boolean} [options.pentagon=false] - Enable to use a pentagonal shape to scale gathered texels.
	 * @param {Boolean} [options.shaderFocus=true] - Disable if you compute your own focalDepth (in metres!).
	 * @param {Boolean} [options.noise=true] - Disable if you don't want noise patterns for dithering.
	 */

	constructor(camera = null, options = {}) {

		if(options.rings === undefined) { options.rings = 3; }
		if(options.samples === undefined) { options.samples = 2; }
		if(options.showFocus === undefined) { options.showFocus = false; }
		if(options.showFocus === undefined) { options.showFocus = false; }
		if(options.manualDoF === undefined) { options.manualDoF = false; }
		if(options.vignette === undefined) { options.vignette = false; }
		if(options.pentagon === undefined) { options.pentagon = false; }
		if(options.shaderFocus === undefined) { options.shaderFocus = true; }
		if(options.noise === undefined) { options.noise = true; }

		super({

			type: "Bokeh2Material",

			defines: {

				RINGS_INT: options.rings.toFixed(0),
				RINGS_FLOAT: options.rings.toFixed(1),
				SAMPLES_INT: options.samples.toFixed(0),
				SAMPLES_FLOAT: options.samples.toFixed(1)

			},

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				tDepth: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),

				texelSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()),
				halfTexelSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()),

				cameraNear: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.1),
				cameraFar: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](2000),

				focalLength: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](24.0),
				focalStop: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.9),

				maxBlur: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				luminanceThreshold: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.5),
				luminanceGain: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](2.0),
				bias: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.5),
				fringe: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.7),
				ditherStrength: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.0001),

				focusCoords: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](0.5, 0.5)),
				focalDepth: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		if(options.showFocus) { this.defines.SHOW_FOCUS = "1"; }
		if(options.manualDoF) { this.defines.MANUAL_DOF = "1"; }
		if(options.vignette) { this.defines.VIGNETTE = "1"; }
		if(options.pentagon) { this.defines.PENTAGON = "1"; }
		if(options.shaderFocus) { this.defines.SHADER_FOCUS = "1"; }
		if(options.noise) { this.defines.NOISE = "1"; }

		if(options.texelSize !== undefined) { this.setTexelSize(options.texelSize.x, options.texelSize.y); }
		if(camera !== null) { this.adoptCameraSettings(camera); }

	}

	/**
	 * Sets the texel size.
	 *
	 * @param {Number} x - The texel width.
	 * @param {Number} y - The texel height.
	 */

	setTexelSize(x, y) {

		this.uniforms.texelSize.value.set(x, y);
		this.uniforms.halfTexelSize.value.set(x, y).multiplyScalar(0.5);

	}

	/**
	 * Adopts the near and far plane and the focal length of the given camera.
	 *
	 * @param {PerspectiveCamera} camera - The main camera.
	 */

	adoptCameraSettings(camera) {

		this.uniforms.cameraNear.value = camera.near;
		this.uniforms.cameraFar.value = camera.far;
		this.uniforms.focalLength.value = camera.getFocalLength(); // unit: mm.

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bokeh2Material;



/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D texture1;\r\nuniform sampler2D texture2;\r\n\r\nuniform float opacity1;\r\nuniform float opacity2;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel1 = opacity1 * texture2D(texture1, vUv);\r\n\tvec4 texel2 = opacity2 * texture2D(texture2, vUv);\r\n\r\n\t#ifdef SCREEN_MODE\r\n\r\n\t\tvec3 invTexel1 = vec3(1.0) - texel1.rgb;\r\n\t\tvec3 invTexel2 = vec3(1.0) - texel2.rgb;\r\n\r\n\t\tvec4 color = vec4(\r\n\t\t\tvec3(1.0) - invTexel1 * invTexel2,\r\n\t\t\ttexel1.a + texel2.a\r\n\t\t);\r\n\r\n\t#else\r\n\r\n\t\tvec4 color = texel1 + texel2;\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = color;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A material for combining two textures.
 *
 * This material supports the two blend modes Add and Screen.
 *
 * In Screen mode, the two textures are effectively projected on a white screen
 * simultaneously. In Add mode, the textures are simply added together which
 * often produces undesired, washed out results.
 */

class CombineMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new combine material.
	 *
	 * @param {Boolean} [screenMode=false] - Whether the screen blend mode should be used.
	 */

	constructor(screenMode = false) {

		super({

			type: "CombineMaterial",

			uniforms: {

				texture1: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				texture2: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),

				opacity1: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				opacity2: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		if(screenMode) { this.defines.SCREEN_MODE = "1"; }

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CombineMaterial;



/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\n\r\nvarying vec2 vUv0;\r\nvarying vec2 vUv1;\r\nvarying vec2 vUv2;\r\nvarying vec2 vUv3;\r\n\r\nvoid main() {\r\n\r\n\t// Sample top left texel.\r\n\tvec4 sum = texture2D(tDiffuse, vUv0);\r\n\r\n\t// Sample top right texel.\r\n\tsum += texture2D(tDiffuse, vUv1);\r\n\r\n\t// Sample bottom right texel.\r\n\tsum += texture2D(tDiffuse, vUv2);\r\n\r\n\t// Sample bottom left texel.\r\n\tsum += texture2D(tDiffuse, vUv3);\r\n\r\n\t// Compute the average.\r\n\tgl_FragColor = sum * 0.25;\r\n\r\n}\r\n";
const vertex = "uniform vec2 texelSize;\r\nuniform vec2 halfTexelSize;\r\nuniform float kernel;\r\n\r\nvarying vec2 vUv0;\r\nvarying vec2 vUv1;\r\nvarying vec2 vUv2;\r\nvarying vec2 vUv3;\r\n\r\nvoid main() {\r\n\r\n\tvec2 dUv = (texelSize * vec2(kernel)) + halfTexelSize;\r\n\r\n\tvUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);\r\n\tvUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);\r\n\tvUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);\r\n\tvUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);\r\n\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

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

class ConvolutionMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new convolution material.
	 *
	 * @param {Vector2} [texelSize] - The absolute screen texel size.
	 */

	constructor(texelSize = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()) {

		super({

			type: "ConvolutionMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				texelSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()),
				halfTexelSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()),
				kernel: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		this.setTexelSize(texelSize.x, texelSize.y);

		/**
		 * The current kernel size.
		 *
		 * @type {KernelSize}
		 * @default KernelSize.LARGE
		 */

		this.kernelSize = KernelSize.LARGE;

	}

	/**
	 * Returns the kernel.
	 *
	 * @return {Float32Array} The kernel.
	 */

	getKernel() { return kernelPresets[this.kernelSize]; }

	/**
	 * Sets the texel size.
	 *
	 * @param {Number} x - The texel width.
	 * @param {Number} y - The texel height.
	 */

	setTexelSize(x, y) {

		this.uniforms.texelSize.value.set(x, y);
		this.uniforms.halfTexelSize.value.set(x, y).multiplyScalar(0.5);

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConvolutionMaterial;


/**
 * The Kawase blur kernel presets.
 *
 * @type {Float32Array[]}
 * @private
 * @static
 */

const kernelPresets = [
	new Float32Array([0.0, 0.0]),
	new Float32Array([0.0, 1.0, 1.0]),
	new Float32Array([0.0, 1.0, 1.0, 2.0]),
	new Float32Array([0.0, 1.0, 2.0, 2.0, 3.0]),
	new Float32Array([0.0, 1.0, 2.0, 3.0, 4.0, 4.0, 5.0]),
	new Float32Array([0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 7.0, 8.0, 9.0, 10.0])
];

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

const KernelSize = {

	VERY_SMALL: 0,
	SMALL: 1,
	MEDIUM: 2,
	LARGE: 3,
	VERY_LARGE: 4,
	HUGE: 5

};
/* unused harmony export KernelSize */



/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform float opacity;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tgl_FragColor = opacity * texel;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A simple copy shader material.
 */

class CopyMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new copy material.
	 */

	constructor() {

		super({

			type: "CopyMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				opacity: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CopyMaterial;



/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDepth;\r\n\r\nvarying vec2 vUv;\r\n\r\n#ifndef USE_LOGDEPTHBUF\r\n\r\n\t#include <packing>\r\n\r\n\tuniform float cameraNear;\r\n\tuniform float cameraFar;\r\n\r\n\tfloat readDepth(sampler2D depthSampler, vec2 coord) {\r\n\r\n\t\tfloat fragCoordZ = texture2D(depthSampler, coord).x;\r\n\t\tfloat viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\r\n\r\n\t\treturn viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\nvoid main() {\r\n\r\n\t#ifdef USE_LOGDEPTHBUF\r\n\r\n\t\tfloat depth = texture2D(tDepth, vUv).x;\r\n\r\n\t#else\r\n\r\n\t\tfloat depth = readDepth(tDepth, vUv);\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = vec4(depth, depth, depth, 1.0);\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A depth shader material.
 */

class DepthMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new depth material.
	 *
	 * @param {PerspectiveCamera} [camera] - A camera.
	 */

	constructor(camera = null) {

		super({

			type: "DepthMaterial",

			uniforms: {

				cameraNear: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.1),
				cameraFar: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](2000),

				tDepth: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		if(camera !== null) { this.adoptCameraSettings(camera); }

	}

	/**
	 * Adopts the settings of the given camera.
	 *
	 * @param {PerspectiveCamera} camera - A camera.
	 */

	adoptCameraSettings(camera) {

		this.uniforms.cameraNear.value = camera.near;
		this.uniforms.cameraFar.value = camera.far;

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DepthMaterial;



/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\n\r\nuniform float angle;\r\nuniform float scale;\r\nuniform float intensity;\r\n\r\nvarying vec2 vUv;\r\nvarying vec2 vUvPattern;\r\n\r\nfloat pattern() {\r\n\r\n\tfloat s = sin(angle);\r\n\tfloat c = cos(angle);\r\n\r\n\tvec2 point = vec2(c * vUvPattern.x - s * vUvPattern.y, s * vUvPattern.x + c * vUvPattern.y) * scale;\r\n\r\n\treturn (sin(point.x) * sin(point.y)) * 4.0;\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tvec3 color = texel.rgb;\r\n\r\n\t#ifdef AVERAGE\r\n\r\n\t\tcolor = vec3((color.r + color.g + color.b) / 3.0);\r\n\r\n\t#endif\r\n\r\n\tcolor = vec3(color * 10.0 - 5.0 + pattern());\r\n\tcolor = texel.rgb + (color - texel.rgb) * intensity;\r\n\r\n\tgl_FragColor = vec4(color, texel.a);\r\n\r\n}\r\n";
const vertex = "uniform vec4 offsetRepeat;\r\n\r\nvarying vec2 vUv;\r\nvarying vec2 vUvPattern;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tvUvPattern = uv * offsetRepeat.zw + offsetRepeat.xy;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A dot screen shader material.
 */

class DotScreenMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new dot screen material.
	 *
	 * @param {Boolean} [average=false] - Whether the shader should output the colour average (black and white).
	 */

	constructor(average = false) {

		super({

			type: "DotScreenMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),

				angle: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.57),
				scale: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				intensity: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),

				offsetRepeat: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector4"](0.5, 0.5, 1.0, 1.0))

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		if(average) { this.defines.AVERAGE = "1"; }

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DotScreenMaterial;



/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform float time;\r\n\r\nvarying vec2 vUv;\r\n\r\n#ifdef NOISE\r\n\r\n\tuniform float noiseIntensity;\r\n\r\n#endif\r\n\r\n#ifdef SCANLINES\r\n\r\n\tuniform float scanlineIntensity;\r\n\tuniform float scanlineCount;\r\n\r\n#endif\r\n\r\n#ifdef GREYSCALE\r\n\r\n\tuniform float greyscaleIntensity;\r\n\r\n\tconst vec3 LUM_COEFF = vec3(0.299, 0.587, 0.114);\r\n\r\n#elif defined(SEPIA)\r\n\r\n\tuniform float sepiaIntensity;\r\n\r\n#endif\r\n\r\n#ifdef VIGNETTE\r\n\r\n\tuniform float vignetteOffset;\r\n\tuniform float vignetteDarkness;\r\n\r\n#endif\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tvec3 color = texel.rgb;\r\n\r\n\t#ifdef SCREEN_MODE\r\n\r\n\t\tvec3 invColor;\r\n\r\n\t#endif\r\n\r\n\t#ifdef NOISE\r\n\r\n\t\tfloat x = vUv.x * vUv.y * time * 1000.0;\r\n\t\tx = mod(x, 13.0) * mod(x, 123.0);\r\n\t\tx = mod(x, 0.01);\r\n\r\n\t\tvec3 noise = texel.rgb * clamp(0.1 + x * 100.0, 0.0, 1.0) * noiseIntensity;\r\n\r\n\t\t#ifdef SCREEN_MODE\r\n\r\n\t\t\tinvColor = vec3(1.0) - color;\r\n\t\t\tvec3 invNoise = vec3(1.0) - noise;\r\n\r\n\t\t\tcolor = vec3(1.0) - invColor * invNoise;\r\n\r\n\t\t#else\r\n\r\n\t\t\tcolor += noise;\r\n\r\n\t\t#endif\r\n\r\n\t#endif\r\n\r\n\t#ifdef SCANLINES\r\n\r\n\t\tvec2 sl = vec2(sin(vUv.y * scanlineCount), cos(vUv.y * scanlineCount));\r\n\t\tvec3 scanlines = texel.rgb * vec3(sl.x, sl.y, sl.x) * scanlineIntensity;\r\n\r\n\t\t#ifdef SCREEN_MODE\r\n\r\n\t\t\tinvColor = vec3(1.0) - color;\r\n\t\t\tvec3 invScanlines = vec3(1.0) - scanlines;\r\n\r\n\t\t\tcolor = vec3(1.0) - invColor * invScanlines;\r\n\r\n\t\t#else\r\n\r\n\t\t\tcolor += scanlines;\r\n\r\n\t\t#endif\r\n\r\n\t#endif\r\n\r\n\t#ifdef GREYSCALE\r\n\r\n\t\tcolor = mix(color, vec3(dot(color, LUM_COEFF)), greyscaleIntensity);\r\n\r\n\t#elif defined(SEPIA)\r\n\r\n\t\tvec3 c = color.rgb;\r\n\r\n\t\tcolor.r = dot(c, vec3(1.0 - 0.607 * sepiaIntensity, 0.769 * sepiaIntensity, 0.189 * sepiaIntensity));\r\n\t\tcolor.g = dot(c, vec3(0.349 * sepiaIntensity, 1.0 - 0.314 * sepiaIntensity, 0.168 * sepiaIntensity));\r\n\t\tcolor.b = dot(c, vec3(0.272 * sepiaIntensity, 0.534 * sepiaIntensity, 1.0 - 0.869 * sepiaIntensity));\r\n\r\n\t#endif\r\n\r\n\t#ifdef VIGNETTE\r\n\r\n\t\tconst vec2 CENTER = vec2(0.5);\r\n\r\n\t\t#ifdef ESKIL\r\n\r\n\t\t\tvec2 uv = (vUv - CENTER) * vec2(vignetteOffset);\r\n\t\t\tcolor = mix(color.rgb, vec3(1.0 - vignetteDarkness), dot(uv, uv));\r\n\r\n\t\t#else\r\n\r\n\t\t\tfloat dist = distance(vUv, CENTER);\r\n\t\t\tcolor *= smoothstep(0.8, vignetteOffset * 0.799, dist * (vignetteDarkness + vignetteOffset));\r\n\r\n\t\t#endif\t\t\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = vec4(clamp(color, 0.0, 1.0), texel.a);\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

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

class FilmMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new film material.
	 *
	 * @param {Object} [options] - The options. Disabled effects will not be included in the final shader and have no negative impact on performance.
	 * @param {Boolean} [options.greyscale=false] - Enable greyscale effect. Greyscale and sepia are mutually exclusive.
	 * @param {Boolean} [options.sepia=false] - Enable sepia effect. Greyscale and sepia are mutually exclusive.
	 * @param {Boolean} [options.vignette=false] - Apply vignette effect.
	 * @param {Boolean} [options.eskil=false] - Use Eskil's vignette approach. The default looks dusty while Eskil looks burned out.
	 * @param {Boolean} [options.screenMode=true] - Whether the screen blend mode should be used for noise and scanlines. Both of these effects are computed independently.
	 * @param {Boolean} [options.noise=true] - Show noise-based film grain.
	 * @param {Boolean} [options.scanlines=true] - Show scanlines.
	 * @param {Number} [options.noiseIntensity=0.5] - The noise intensity. 0.0 to 1.0.
	 * @param {Number} [options.scanlineIntensity=0.05] - The scanline intensity. 0.0 to 1.0.
	 * @param {Number} [options.greyscaleIntensity=1.0] - The intensity of the greyscale effect.
	 * @param {Number} [options.sepiaIntensity=1.0] - The intensity of the sepia effect.
	 * @param {Number} [options.vignetteOffset=1.0] - The offset of the vignette effect.
	 * @param {Number} [options.vignetteDarkness=1.0] - The darkness of the vignette effect.
	 */

	constructor(options = {}) {

		if(options.screenMode === undefined) { options.screenMode = true; }
		if(options.noise === undefined) { options.noise = true; }
		if(options.scanlines === undefined) { options.scanlines = true; }

		if(options.greyscale === undefined) { options.greyscale = false; }
		if(options.sepia === undefined) { options.sepia = false; }
		if(options.vignette === undefined) { options.vignette = false; }
		if(options.eskil === undefined) { options.eskil = false; }

		if(options.noiseIntensity === undefined) { options.noiseIntensity = 0.5; }
		if(options.scanlineIntensity === undefined) { options.scanlineIntensity = 0.05; }
		if(options.greyscaleIntensity === undefined) { options.greyscaleIntensity = 1.0; }
		if(options.sepiaIntensity === undefined) { options.sepiaIntensity = 1.0; }

		if(options.vignetteOffset === undefined) { options.vignetteOffset = 1.0; }
		if(options.vignetteDarkness === undefined) { options.vignetteDarkness = 1.0; }

		super({

			type: "FilmMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				time: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.0),

				noiseIntensity: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.noiseIntensity),
				scanlineIntensity: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.scanlineIntensity),
				scanlineCount: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.0),

				greyscaleIntensity: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.greyscaleIntensity),
				sepiaIntensity: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.sepiaIntensity),

				vignetteOffset: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.vignetteOffset),
				vignetteDarkness: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.vignetteDarkness)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		if(options.greyscale) { this.defines.GREYSCALE = "1"; }
		if(options.sepia) { this.defines.SEPIA = "1"; }
		if(options.vignette) { this.defines.VIGNETTE = "1"; }
		if(options.eskil) { this.defines.ESKIL = "1"; }

		if(options.screenMode) { this.defines.SCREEN_MODE = "1"; }
		if(options.noise) { this.defines.NOISE = "1"; }
		if(options.scanlines) { this.defines.SCANLINES = "1"; }

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = FilmMaterial;



/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform sampler2D tPerturb;\r\n\r\nuniform bool active;\r\n\r\nuniform float amount;\r\nuniform float angle;\r\nuniform float seed;\r\nuniform float seedX;\r\nuniform float seedY;\r\nuniform float distortionX;\r\nuniform float distortionY;\r\nuniform float colS;\r\n\r\nvarying vec2 vUv;\r\n\r\nfloat rand(vec2 tc) {\r\n\r\n\tconst float a = 12.9898;\r\n\tconst float b = 78.233;\r\n\tconst float c = 43758.5453;\r\n\r\n\tfloat dt = dot(tc, vec2(a, b));\r\n\tfloat sn = mod(dt, 3.14);\r\n\r\n\treturn fract(sin(sn) * c);\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\tvec2 coord = vUv;\r\n\r\n\tfloat xs, ys;\r\n\tvec4 normal;\r\n\r\n\tvec2 offset;\r\n\tvec4 cr, cga, cb;\r\n\tvec4 snow, color;\r\n\r\n\tfloat sx, sy;\r\n\r\n\tif(active) {\r\n\r\n\t\txs = floor(gl_FragCoord.x / 0.5);\r\n\t\tys = floor(gl_FragCoord.y / 0.5);\r\n\r\n\t\tnormal = texture2D(tPerturb, coord * seed * seed);\r\n\r\n\t\tif(coord.y < distortionX + colS && coord.y > distortionX - colS * seed) {\r\n\r\n\t\t\tsx = clamp(ceil(seedX), 0.0, 1.0);\r\n\t\t\tcoord.y = sx * (1.0 - (coord.y + distortionY)) + (1.0 - sx) * distortionY;\r\n\r\n\t\t}\r\n\r\n\t\tif(coord.x < distortionY + colS && coord.x > distortionY - colS * seed) {\r\n\r\n\t\t\tsy = clamp(ceil(seedY), 0.0, 1.0);\r\n\t\t\tcoord.x = sy * distortionX + (1.0 - sy) * (1.0 - (coord.x + distortionX));\r\n\r\n\t\t}\r\n\r\n\t\tcoord.x += normal.x * seedX * (seed / 5.0);\r\n\t\tcoord.y += normal.y * seedY * (seed / 5.0);\r\n\r\n\t\toffset = amount * vec2(cos(angle), sin(angle));\r\n\r\n\t\tcr = texture2D(tDiffuse, coord + offset);\r\n\t\tcga = texture2D(tDiffuse, coord);\r\n\t\tcb = texture2D(tDiffuse, coord - offset);\r\n\r\n\t\tcolor = vec4(cr.r, cga.g, cb.b, cga.a);\r\n\t\tsnow = 200.0 * amount * vec4(rand(vec2(xs * seed, ys * seed * 50.0)) * 0.2);\r\n\t\tcolor += snow;\r\n\r\n\t} else {\r\n\r\n\t\tcolor = texture2D(tDiffuse, vUv);\r\n\r\n\t}\r\n\r\n\tgl_FragColor = color;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A glitch shader material.
 *
 * Reference:
 *  https://github.com/staffantan/unityglitch
 */

class GlitchMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new glitch material.
	 */

	constructor() {

		super({

			type: "GlitchMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				tPerturb: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),

				active: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1),

				amount: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.8),
				angle: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.02),
				seed: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.02),
				seedX: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.02),
				seedY: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.02),
				distortionX: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.5),
				distortionY: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.6),
				colS: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.05)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GlitchMaterial;



/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform vec3 lightPosition;\r\n\r\nuniform float exposure;\r\nuniform float decay;\r\nuniform float density;\r\nuniform float weight;\r\nuniform float clampMax;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec2 texCoord = vUv;\r\n\r\n\t// Calculate vector from pixel to light source in screen space.\r\n\tvec2 deltaTexCoord = texCoord - lightPosition.st;\r\n\tdeltaTexCoord *= 1.0 / NUM_SAMPLES_FLOAT * density;\r\n\r\n\t// A decreasing illumination factor.\r\n\tfloat illuminationDecay = 1.0;\r\n\r\n\tvec4 sample;\r\n\tvec4 color = vec4(0.0);\r\n\r\n\t// Estimate the probability of occlusion at each pixel by summing samples along a ray to the light source.\r\n\tfor(int i = 0; i < NUM_SAMPLES_INT; ++i) {\r\n\r\n\t\ttexCoord -= deltaTexCoord;\r\n\t\tsample = texture2D(tDiffuse, texCoord);\r\n\r\n\t\t// Apply sample attenuation scale/decay factors.\r\n\t\tsample *= illuminationDecay * weight;\r\n\r\n\t\tcolor += sample;\r\n\r\n\t\t// Update exponential decay factor.\r\n\t\tilluminationDecay *= decay;\r\n\r\n\t}\r\n\r\n\tgl_FragColor = clamp(color * exposure, 0.0, clampMax);\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

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

class GodRaysMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new god rays material.
	 */

	constructor() {

		super({

			type: "GodRaysMaterial",

			defines: {

				NUM_SAMPLES_FLOAT: "60.0",
				NUM_SAMPLES_INT: "60"

			},

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				lightPosition: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),

				exposure: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.6),
				decay: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.93),
				density: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.96),
				weight: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.4),
				clampMax: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GodRaysMaterial;



/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/png;base64,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");


/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII=");


/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform float distinction;\r\nuniform vec2 range;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tconst vec4 LUM_COEFF = vec4(0.299, 0.587, 0.114, 0.0);\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tfloat v = dot(texel, LUM_COEFF);\r\n\r\n\t#ifdef RANGE\r\n\r\n\t\tfloat low = step(range.x, v);\r\n\t\tfloat high = step(v, range.y);\r\n\r\n\t\t// Apply the mask.\r\n\t\tv *= low * high;\r\n\r\n\t#endif\r\n\r\n\tv = pow(abs(v), distinction);\r\n\r\n\t#ifdef COLOR\r\n\r\n\t\tgl_FragColor = vec4(texel.rgb * v, texel.a);\r\n\r\n\t#else\r\n\r\n\t\tgl_FragColor = vec4(v, v, v, texel.a);\r\n\r\n\t#endif\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

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

class LuminosityMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new luminosity material.
	 *
	 * @param {Boolean} [color=false] - Defines whether the shader should output colours scaled with their luminance value.
	 * @param {Vector2} [range] - If provided, the shader will mask out texels that aren't in the specified luminance range.
	 */

	constructor(color = false, range = null) {

		super({

			type: "LuminosityMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				distinction: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				range: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"]((range !== null) ? range : new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]())

			},

			fragmentShader: fragment,
			vertexShader: vertex

		});

		if(color) { this.defines.COLOR = "1"; }
		if(range !== null) { this.defines.RANGE = "1"; }

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LuminosityMaterial;



/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform float granularity;\r\nuniform float dx;\r\nuniform float dy;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel;\r\n\r\n\tif(granularity > 0.0) {\r\n\r\n\t\tvec2 coord = vec2(\r\n\t\t\tdx * (floor(vUv.x / dx) + 0.5),\r\n\t\t\tdy * (floor(vUv.y / dy) + 0.5)\r\n\t\t);\r\n\r\n\t\ttexel = texture2D(tDiffuse, coord);\r\n\r\n\t} else {\r\n\r\n\t\ttexel = texture2D(tDiffuse, vUv);\r\n\r\n\t}\r\n\r\n\tgl_FragColor = texel;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A pixelation shader material.
 *
 * Original shader code by Robert Casanova:
 *  https://github.com/robertcasanova/pixelate-shader
 */

class PixelationMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new pixelation material.
	 */

	constructor() {

		super({

			type: "PixelationMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				granularity: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				resolution: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](1.0, 1.0)),
				dx: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				dy: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

	/**
	 * The pixel granularity.
	 *
	 * @type {Number}
	 */

	get granularity() { return this.uniforms.granularity.value; }

	/**
	 * A higher value yields coarser visuals.
	 *
	 * @type {Number}
	 */

	set granularity(x) {

		const uniforms = this.uniforms;
		const resolution = uniforms.resolution.value;

		uniforms.granularity.value = x;
		uniforms.dx.value = x / resolution.x;
		uniforms.dy.value = x / resolution.y;

	}

	/**
	 * Sets the resolution.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setResolution(width, height) {

		this.uniforms.resolution.value.set(width, height);
		this.granularity = this.granularity;

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = PixelationMaterial;



/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "#include <common>\r\n\r\nuniform sampler2D tDiffuse;\r\nuniform vec2 center;\r\nuniform float aspect;\r\nuniform float waveSize;\r\nuniform float radius;\r\nuniform float maxRadius;\r\nuniform float amplitude;\r\n\r\nvarying vec2 vUv;\r\nvarying float vSize;\r\n\r\nvoid main() {\r\n\r\n\tvec2 aspectCorrection = vec2(aspect, 1.0);\r\n\r\n\tvec2 difference = vUv * aspectCorrection - center * aspectCorrection;\r\n\tfloat distance = sqrt(dot(difference, difference)) * vSize;\r\n\r\n\tvec2 displacement = vec2(0.0);\r\n\r\n\tif(distance > radius) {\r\n\r\n\t\tif(distance < radius + waveSize) {\r\n\r\n\t\t\tfloat angle = (distance - radius) * PI2 / waveSize;\r\n\t\t\tfloat cosSin = (1.0 - cos(angle)) * 0.5;\r\n\r\n\t\t\tfloat extent = maxRadius + waveSize;\r\n\t\t\tfloat decay = max(extent - distance * distance, 0.0) / extent;\r\n\r\n\t\t\tdisplacement = ((cosSin * amplitude * difference) / distance) * decay;\r\n\r\n\t\t}\r\n\r\n\t}\r\n\r\n\tgl_FragColor = texture2D(tDiffuse, vUv - displacement);\r\n\r\n}\r\n";
const vertex = "uniform float size;\r\nuniform float scale;\r\nuniform float cameraDistance;\r\n\r\nvarying vec2 vUv;\r\nvarying float vSize;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tvSize = (0.1 * cameraDistance) / size;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A shock wave shader material.
 *
 * Based on a Gist by Jean-Philippe Sarda:
 *  https://gist.github.com/jpsarda/33cea67a9f2ecb0a0eda
 */

class ShockWaveMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new shock wave material.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.waveSize=0.2] - The wave size.
	 * @param {Number} [options.amplitude=0.05] - The distortion amplitude.
	 */

	constructor(options = {}) {

		if(options.maxRadius === undefined) { options.maxRadius = 1.0; }
		if(options.waveSize === undefined) { options.waveSize = 0.2; }
		if(options.amplitude === undefined) { options.amplitude = 0.05; }

		super({

			type: "ShockWaveMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),

				center: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](0.5, 0.5)),
				aspect: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				cameraDistance: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),

				size: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				radius: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](-options.waveSize),
				maxRadius: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.maxRadius),
				waveSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.waveSize),
				amplitude: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](options.amplitude)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShockWaveMaterial;



/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform sampler2D tWeights;\r\n\r\nuniform vec2 texelSize;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset;\r\n\r\nvoid main() {\r\n\r\n\t// Fetch the blending weights for current pixel.\r\n\tvec4 a;\r\n\ta.xz = texture2D(tWeights, vUv).xz;\r\n\ta.y = texture2D(tWeights, vOffset.zw).g;\r\n\ta.w = texture2D(tWeights, vOffset.xy).a;\r\n\r\n\tvec4 color;\r\n\r\n\t// Check if there is any blending weight with a value greater than 0.0.\r\n\tif(dot(a, vec4(1.0)) < 1e-5) {\r\n\r\n\t\tcolor = texture2D(tDiffuse, vUv, 0.0);\r\n\r\n\t} else {\r\n\r\n\t\t/* Up to four lines can be crossing a pixel (one through each edge). We favor\r\n\t\t * blending by choosing the line with the maximum weight for each direction.\r\n\t\t */\r\n\r\n\t\tvec2 offset;\r\n\t\toffset.x = a.a > a.b ? a.a : -a.b; // Left vs. right.\r\n\t\toffset.y = a.g > a.r ? -a.g : a.r; // Top vs. bottom (changed signs).\r\n\r\n\t\t// Then we go in the direction that has the maximum weight (horizontal vs. vertical).\r\n\t\tif(abs(offset.x) > abs(offset.y)) {\r\n\r\n\t\t\toffset.y = 0.0;\r\n\r\n\t\t} else {\r\n\r\n\t\t\toffset.x = 0.0;\r\n\r\n\t\t}\r\n\r\n\t\t// Fetch the opposite color and lerp by hand.\r\n\t\tcolor = texture2D(tDiffuse, vUv, 0.0);\r\n\t\tvec2 coord = vUv + sign(offset) * texelSize;\r\n\t\tvec4 oppositeColor = texture2D(tDiffuse, coord, 0.0);\r\n\t\tfloat s = abs(offset.x) > abs(offset.y) ? abs(offset.x) : abs(offset.y);\r\n\r\n\t\t// Gamma correction.\r\n\t\tcolor.rgb = pow(abs(color.rgb), vec3(2.2));\r\n\t\toppositeColor.rgb = pow(abs(oppositeColor.rgb), vec3(2.2));\r\n\t\tcolor = mix(color, oppositeColor, s);\r\n\t\tcolor.rgb = pow(abs(color.rgb), vec3(1.0 / 2.2));\r\n\r\n\t}\r\n\r\n\tgl_FragColor = color;\r\n\r\n}\r\n";
const vertex = "uniform vec2 texelSize;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\r\n\tvOffset = uv.xyxy + texelSize.xyxy * vec4(1.0, 0.0, 0.0, -1.0); // Changed sign in W component.\r\n\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Subpixel Morphological Antialiasing.
 *
 * This material is used to render the final antialiasing.
 */

class SMAABlendMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new SMAA blend material.
	 *
	 * @param {Vector2} [texelSize] - The absolute screen texel size.
	 */

	constructor(texelSize = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()) {

		super({

			type: "SMAABlendMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				tWeights: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				texelSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](texelSize)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SMAABlendMaterial;



/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\n\r\nvoid main() {\r\n\r\n\tconst vec2 THRESHOLD = vec2(EDGE_THRESHOLD);\r\n\r\n\t// Calculate color deltas.\r\n\tvec4 delta;\r\n\tvec3 c = texture2D(tDiffuse, vUv).rgb;\r\n\r\n\tvec3 cLeft = texture2D(tDiffuse, vOffset[0].xy).rgb;\r\n\tvec3 t = abs(c - cLeft);\r\n\tdelta.x = max(max(t.r, t.g), t.b);\r\n\r\n\tvec3 cTop = texture2D(tDiffuse, vOffset[0].zw).rgb;\r\n\tt = abs(c - cTop);\r\n\tdelta.y = max(max(t.r, t.g), t.b);\r\n\r\n\t// We do the usual threshold.\r\n\tvec2 edges = step(THRESHOLD, delta.xy);\r\n\r\n\t// Then discard if there is no edge.\r\n\tif(dot(edges, vec2(1.0)) == 0.0) {\r\n\r\n\t\tdiscard;\r\n\r\n\t}\r\n\r\n\t// Calculate right and bottom deltas.\r\n\tvec3 cRight = texture2D(tDiffuse, vOffset[1].xy).rgb;\r\n\tt = abs(c - cRight);\r\n\tdelta.z = max(max(t.r, t.g), t.b);\r\n\r\n\tvec3 cBottom  = texture2D(tDiffuse, vOffset[1].zw).rgb;\r\n\tt = abs(c - cBottom);\r\n\tdelta.w = max(max(t.r, t.g), t.b);\r\n\r\n\t// Calculate the maximum delta in the direct neighborhood.\r\n\tfloat maxDelta = max(max(max(delta.x, delta.y), delta.z), delta.w);\r\n\r\n\t// Calculate left-left and top-top deltas.\r\n\tvec3 cLeftLeft  = texture2D(tDiffuse, vOffset[2].xy).rgb;\r\n\tt = abs(c - cLeftLeft);\r\n\tdelta.z = max(max(t.r, t.g), t.b);\r\n\r\n\tvec3 cTopTop = texture2D(tDiffuse, vOffset[2].zw).rgb;\r\n\tt = abs(c - cTopTop);\r\n\tdelta.w = max(max(t.r, t.g), t.b);\r\n\r\n\t// Calculate the final maximum delta.\r\n\tmaxDelta = max(max(maxDelta, delta.z), delta.w);\r\n\r\n\t// Local contrast adaptation in action.\r\n\tedges.xy *= step(0.5 * maxDelta, delta.xy);\r\n\r\n\tgl_FragColor = vec4(edges, 0.0, 0.0);\r\n\r\n}\r\n";
const vertex = "uniform vec2 texelSize;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\r\n\tvOffset[0] = uv.xyxy + texelSize.xyxy * vec4(-1.0, 0.0, 0.0, 1.0); // Changed sign in W component.\r\n\tvOffset[1] = uv.xyxy + texelSize.xyxy * vec4(1.0, 0.0, 0.0, -1.0); // Changed sign in W component.\r\n\tvOffset[2] = uv.xyxy + texelSize.xyxy * vec4(-2.0, 0.0, 0.0, 2.0); // Changed sign in W component.\r\n\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Subpixel Morphological Antialiasing.
 *
 * This material detects edges in a color texture.
 */

class SMAAColorEdgesMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new SMAA color edges material.
	 *
	 * @param {Vector2} [texelSize] - The absolute screen texel size.
	 */

	constructor(texelSize = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()) {

		super({

			type: "SMAAColorEdgesMaterial",

			defines: {

				EDGE_THRESHOLD: "0.1"

			},

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				texelSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](texelSize)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SMAAColorEdgesMaterial;



/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_smaa_area_image_js__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_smaa_search_image_js__ = __webpack_require__(224);





const fragment = "#define sampleLevelZeroOffset(t, coord, offset) texture2D(t, coord + float(offset) * texelSize, 0.0)\r\n\r\nuniform sampler2D tDiffuse;\r\nuniform sampler2D tArea;\r\nuniform sampler2D tSearch;\r\n\r\nuniform vec2 texelSize;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\nvarying vec2 vPixCoord;\r\n\r\nvec2 round(vec2 x) {\r\n\r\n\treturn sign(x) * floor(abs(x) + 0.5);\r\n\r\n}\r\n\r\nfloat searchLength(vec2 e, float bias, float scale) {\r\n\r\n\t// Not required if tSearch accesses are set to point.\r\n\t// const vec2 SEARCH_TEX_PIXEL_SIZE = 1.0 / vec2(66.0, 33.0);\r\n\t// e = vec2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE + e * vec2(scale, 1.0) * vec2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;\r\n\r\n\te.r = bias + e.r * scale;\r\n\r\n\treturn 255.0 * texture2D(tSearch, e, 0.0).r;\r\n\r\n}\r\n\r\nfloat searchXLeft(vec2 texCoord, float end) {\r\n\r\n\t/* @PSEUDO_GATHER4\r\n\t * This texCoord has been offset by (-0.25, -0.125) in the vertex shader to\r\n\t * sample between edge, thus fetching four edges in a row.\r\n\t * Sampling with different offsets in each direction allows to disambiguate\r\n\t * which edges are active from the four fetched ones.\r\n\t */\r\n\r\n\tvec2 e = vec2(0.0, 1.0);\r\n\r\n\tfor(int i = 0; i < SMAA_MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n\t\te = texture2D(tDiffuse, texCoord, 0.0).rg;\r\n\t\ttexCoord -= vec2(2.0, 0.0) * texelSize;\r\n\r\n\t\tif(!(texCoord.x > end && e.g > 0.8281 && e.r == 0.0)) { break; }\r\n\r\n\t}\r\n\r\n\t// Correct the previously applied offset (-0.25, -0.125).\r\n\ttexCoord.x += 0.25 * texelSize.x;\r\n\r\n\t// The searches are biased by 1, so adjust the coords accordingly.\r\n\ttexCoord.x += texelSize.x;\r\n\r\n\t// Disambiguate the length added by the last step.\r\n\ttexCoord.x += 2.0 * texelSize.x; // Undo last step.\r\n\ttexCoord.x -= texelSize.x * searchLength(e, 0.0, 0.5);\r\n\r\n\treturn texCoord.x;\r\n\r\n}\r\n\r\nfloat searchXRight(vec2 texCoord, float end) {\r\n\r\n\tvec2 e = vec2(0.0, 1.0);\r\n\r\n\tfor(int i = 0; i < SMAA_MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n\t\te = texture2D(tDiffuse, texCoord, 0.0).rg;\r\n\t\ttexCoord += vec2(2.0, 0.0) * texelSize;\r\n\r\n\t\tif(!(texCoord.x < end && e.g > 0.8281 && e.r == 0.0)) { break; }\r\n\r\n\t}\r\n\r\n\ttexCoord.x -= 0.25 * texelSize.x;\r\n\ttexCoord.x -= texelSize.x;\r\n\ttexCoord.x -= 2.0 * texelSize.x;\r\n\ttexCoord.x += texelSize.x * searchLength(e, 0.5, 0.5);\r\n\r\n\treturn texCoord.x;\r\n\r\n}\r\n\r\nfloat searchYUp(vec2 texCoord, float end) {\r\n\r\n\tvec2 e = vec2(1.0, 0.0);\r\n\r\n\tfor(int i = 0; i < SMAA_MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n\t\te = texture2D(tDiffuse, texCoord, 0.0).rg;\r\n\t\ttexCoord += vec2(0.0, 2.0) * texelSize; // Changed sign.\r\n\r\n\t\tif(!(texCoord.y > end && e.r > 0.8281 && e.g == 0.0)) { break; }\r\n\r\n\t}\r\n\r\n\ttexCoord.y -= 0.25 * texelSize.y; // Changed sign.\r\n\ttexCoord.y -= texelSize.y; // Changed sign.\r\n\ttexCoord.y -= 2.0 * texelSize.y; // Changed sign.\r\n\ttexCoord.y += texelSize.y * searchLength(e.gr, 0.0, 0.5); // Changed sign.\r\n\r\n\treturn texCoord.y;\r\n\r\n}\r\n\r\nfloat searchYDown(vec2 texCoord, float end) {\r\n\r\n\tvec2 e = vec2(1.0, 0.0);\r\n\r\n\tfor(int i = 0; i < SMAA_MAX_SEARCH_STEPS_INT; ++i ) {\r\n\r\n\t\te = texture2D(tDiffuse, texCoord, 0.0).rg;\r\n\t\ttexCoord -= vec2(0.0, 2.0) * texelSize; // Changed sign.\r\n\r\n\t\tif(!(texCoord.y < end && e.r > 0.8281 && e.g == 0.0)) { break; }\r\n\r\n\t}\r\n\r\n\ttexCoord.y += 0.25 * texelSize.y; // Changed sign.\r\n\ttexCoord.y += texelSize.y; // Changed sign.\r\n\ttexCoord.y += 2.0 * texelSize.y; // Changed sign.\r\n\ttexCoord.y -= texelSize.y * searchLength(e.gr, 0.5, 0.5); // Changed sign.\r\n\r\n\treturn texCoord.y;\r\n\r\n}\r\n\r\nvec2 area(vec2 dist, float e1, float e2, float offset) {\r\n\r\n\t// Rounding prevents precision errors of bilinear filtering.\r\n\tvec2 texCoord = SMAA_AREATEX_MAX_DISTANCE * round(4.0 * vec2(e1, e2)) + dist;\r\n\r\n\t// Scale and bias for texel space translation.\r\n\ttexCoord = SMAA_AREATEX_PIXEL_SIZE * texCoord + (0.5 * SMAA_AREATEX_PIXEL_SIZE);\r\n\r\n\t// Move to proper place, according to the subpixel offset.\r\n\ttexCoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;\r\n\r\n\treturn texture2D(tArea, texCoord, 0.0).rg;\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\tvec4 weights = vec4(0.0);\r\n\tvec4 subsampleIndices = vec4(0.0);\r\n\tvec2 e = texture2D(tDiffuse, vUv).rg;\r\n\r\n\tif(e.g > 0.0) {\r\n\r\n\t\t// Edge at north.\r\n\t\tvec2 d;\r\n\r\n\t\t// Find the distance to the left.\r\n\t\tvec2 coords;\r\n\t\tcoords.x = searchXLeft(vOffset[0].xy, vOffset[2].x);\r\n\t\tcoords.y = vOffset[1].y; // vOffset[1].y = vUv.y - 0.25 * texelSize.y (@CROSSING_OFFSET)\r\n\t\td.x = coords.x;\r\n\r\n\t\t/* Now fetch the left crossing edges, two at a time using bilinear filtering.\r\n\t\t * Sampling at -0.25 (see @CROSSING_OFFSET) enables to discern what value each edge has.\r\n\t\t */\r\n\r\n\t\tfloat e1 = texture2D(tDiffuse, coords, 0.0).r;\r\n\r\n\t\t// Find the distance to the right.\r\n\t\tcoords.x = searchXRight(vOffset[0].zw, vOffset[2].y);\r\n\t\td.y = coords.x;\r\n\r\n\t\t// Translate distances to pixel units for better interleave arithmetic and memory accesses.\r\n\t\td = d / texelSize.x - vPixCoord.x;\r\n\r\n\t\t// The area below needs a sqrt, as the areas texture is compressed quadratically.\r\n\t\tvec2 sqrtD = sqrt(abs(d));\r\n\r\n\t\t// Fetch the right crossing edges.\r\n\t\tcoords.y -= texelSize.y; // WebGL port note: Added.\r\n\t\tfloat e2 = sampleLevelZeroOffset(tDiffuse, coords, ivec2(1, 0)).r;\r\n\r\n\t\t// Pattern recognised, now get the actual area.\r\n\t\tweights.rg = area(sqrtD, e1, e2, subsampleIndices.y);\r\n\r\n\t}\r\n\r\n\tif(e.r > 0.0) {\r\n\r\n\t\t// Edge at west.\r\n\t\tvec2 d;\r\n\r\n\t\t// Find the distance to the top.\r\n\t\tvec2 coords;\r\n\r\n\t\tcoords.y = searchYUp(vOffset[1].xy, vOffset[2].z);\r\n\t\tcoords.x = vOffset[0].x; // vOffset[1].x = vUv.x - 0.25 * texelSize.x;\r\n\t\td.x = coords.y;\r\n\r\n\t\t// Fetch the top crossing edges.\r\n\t\tfloat e1 = texture2D(tDiffuse, coords, 0.0).g;\r\n\r\n\t\t// Find the distance to the bottom.\r\n\t\tcoords.y = searchYDown(vOffset[1].zw, vOffset[2].w);\r\n\t\td.y = coords.y;\r\n\r\n\t\t// Distances in pixel units.\r\n\t\td = d / texelSize.y - vPixCoord.y;\r\n\r\n\t\t// The area below needs a sqrt, as the areas texture is compressed quadratically.\r\n\t\tvec2 sqrtD = sqrt(abs(d));\r\n\r\n\t\t// Fetch the bottom crossing edges.\r\n\t\tcoords.y -= texelSize.y; // WebGL port note: Added.\r\n\t\tfloat e2 = sampleLevelZeroOffset(tDiffuse, coords, ivec2(0, 1)).g;\r\n\r\n\t\t// Get the area for this direction.\r\n\t\tweights.ba = area(sqrtD, e1, e2, subsampleIndices.x);\r\n\r\n\t}\r\n\r\n\tgl_FragColor = weights;\r\n\r\n}\r\n";
const vertex = "uniform vec2 texelSize;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\nvarying vec2 vPixCoord;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\r\n\tvPixCoord = uv / texelSize;\r\n\r\n\t// Offsets for the searches (see @PSEUDO_GATHER4).\r\n\tvOffset[0] = uv.xyxy + texelSize.xyxy * vec4(-0.25, 0.125, 1.25, 0.125); // Changed sign in Y and W components.\r\n\tvOffset[1] = uv.xyxy + texelSize.xyxy * vec4(-0.125, 0.25, -0.125, -1.25); //Changed sign in Y and W components.\r\n\r\n\t// This indicates the ends of the loops.\r\n\tvOffset[2] = vec4(vOffset[0].xz, vOffset[1].yw) + vec4(-2.0, 2.0, -2.0, 2.0) * texelSize.xxyy * SMAA_MAX_SEARCH_STEPS_FLOAT;\r\n\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Subpixel Morphological Antialiasing.
 *
 * This material computes weights for detected edges.
 */

class SMAAWeightsMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new SMAA weights material.
	 *
	 * @param {Vector2} [texelSize] - The absolute screen texel size.
	 */

	constructor(texelSize = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]()) {

		super({

			type: "SMAAWeightsMaterial",

			defines: {

				SMAA_MAX_SEARCH_STEPS_INT: "8",
				SMAA_MAX_SEARCH_STEPS_FLOAT: "8.0",

				SMAA_AREATEX_MAX_DISTANCE: "16.0",

				SMAA_AREATEX_PIXEL_SIZE: "(1.0 / vec2(160.0, 560.0))",
				SMAA_AREATEX_SUBTEX_SIZE: "(1.0 / 7.0)"

			},

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				tArea: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				tSearch: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				texelSize: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](texelSize)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		/**
		 * The area pattern recognition image. Encoded as base64.
		 *
		 * @type {String}
		 */

		this.areaImage = __WEBPACK_IMPORTED_MODULE_1__images_smaa_area_image_js__["a" /* default */];

		/**
		 * The search image. Encoded as base64.
		 *
		 * @type {String}
		 */

		this.searchImage = __WEBPACK_IMPORTED_MODULE_2__images_smaa_search_image_js__["a" /* default */];

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SMAAWeightsMaterial;



/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);


const fragment = "uniform sampler2D tDiffuse;\r\nuniform float middleGrey;\r\nuniform float maxLuminance;\r\n\r\n#ifdef ADAPTED_LUMINANCE\r\n\r\n\tuniform sampler2D luminanceMap;\r\n\r\n#else\r\n\r\n\tuniform float averageLuminance;\r\n\r\n#endif\r\n\r\nvarying vec2 vUv;\r\n\r\nconst vec3 LUM_COEFF = vec3(0.299, 0.587, 0.114);\r\nconst vec2 CENTER = vec2(0.5, 0.5);\r\n\r\nvec3 toneMap(vec3 c) {\r\n\r\n\t#ifdef ADAPTED_LUMINANCE\r\n\r\n\t\t// Get the calculated average luminance.\r\n\t\tfloat lumAvg = texture2D(luminanceMap, CENTER).r;\r\n\r\n\t#else\r\n\r\n\t\tfloat lumAvg = averageLuminance;\r\n\r\n\t#endif\r\n\r\n\t// Calculate the luminance of the current pixel.\r\n\tfloat lumPixel = dot(c, LUM_COEFF);\r\n\r\n\t// Apply the modified operator (Reinhard Eq. 4).\r\n\tfloat lumScaled = (lumPixel * middleGrey) / lumAvg;\r\n\r\n\tfloat lumCompressed = (lumScaled * (1.0 + (lumScaled / (maxLuminance * maxLuminance)))) / (1.0 + lumScaled);\r\n\r\n\treturn lumCompressed * c;\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tgl_FragColor = vec4(toneMap(texel.rgb), texel.a);\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Full-screen tone-mapping shader material.
 *
 * Reference:
 *  http://www.cis.rit.edu/people/faculty/ferwerda/publications/sig02_paper.pdf
 */

class ToneMappingMaterial extends __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"] {

	/**
	 * Constructs a new tone mapping material.
	 */

	constructor() {

		super({

			type: "ToneMappingMaterial",

			uniforms: {

				tDiffuse: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				luminanceMap: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](null),
				averageLuminance: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](1.0),
				maxLuminance: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](16.0),
				middleGrey: new __WEBPACK_IMPORTED_MODULE_0_three__["Uniform"](0.6)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ToneMappingMaterial;



/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blur_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pass_js__ = __webpack_require__(7);





/**
 * A bloom pass.
 *
 * This pass renders a scene with superimposed blur by utilising the fast Kawase
 * convolution approach.
 */

class BloomPass extends __WEBPACK_IMPORTED_MODULE_3__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new bloom pass.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.resolutionScale=0.5] - The render texture resolution scale, relative to the screen render size.
	 * @param {Number} [options.kernelSize=KernelSize.LARGE] - The blur kernel size.
	 * @param {Number} [options.intensity=1.0] - The strength of the bloom effect.
	 * @param {Number} [options.distinction=1.0] - The luminance distinction factor. Raise this value to bring out the brighter elements in the scene.
	 * @param {Number} [options.screenMode=true] - Whether the screen blend mode should be used for combining the bloom texture with the scene colors.
	 */

	constructor(options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "BloomPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A blur pass.
		 *
		 * @type {BlurPass}
		 * @private
		 */

		this.blurPass = new __WEBPACK_IMPORTED_MODULE_2__blur_js__["a" /* BlurPass */](options);

		/**
		 * A render target.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetX = this.blurPass.renderTargetX.clone();

		this.renderTargetX.texture.name = "Bloom.TargetX";

		/**
		 * A second render target.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetY = this.blurPass.renderTargetY.clone();

		this.renderTargetY.texture.name = "Bloom.TargetY";

		/**
		 * A combine shader material.
		 *
		 * @type {CombineMaterial}
		 * @private
		 */

		this.combineMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["k" /* CombineMaterial */]((options.screenMode !== undefined) ? options.screenMode : true);

		this.intensity = options.intensity;

		/**
		 * A luminosity shader material.
		 *
		 * @type {LuminosityMaterial}
		 * @private
		 */

		this.luminosityMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["b" /* LuminosityMaterial */](true);

		this.distinction = options.distinction;

	}

	/**
	 * The resolution scale.
	 *
	 * @type {Number}
	 * @default 0.5
	 */

	get resolutionScale() { return this.blurPass.resolutionScale; }

	/**
	 * You need to call {@link EffectComposer#setSize} after changing this value.
	 *
	 * @type {Number}
	 */

	set resolutionScale(x) {

		this.blurPass.resolutionScale = x;

	}

	/**
	 * The blur kernel size.
	 *
	 * @type {KernelSize}
	 * @default KernelSize.LARGE
	 */

	get kernelSize() { return this.blurPass.kernelSize; }

	/**
	 * @type {KernelSize}
	 */

	set kernelSize(x) {

		this.blurPass.kernelSize = x;

	}

	/**
	 * The overall intensity of the effect.
	 *
	 * @type {Number}
	 * @default 1.0
	 */

	get intensity() { return this.combineMaterial.uniforms.opacity2.value; }

	/**
	 * @type {Number}
	 */

	set intensity(x) {

		if(typeof x === "number") {

			this.combineMaterial.uniforms.opacity2.value = x;

		}

	}

	/**
	 * The luminance distinction factor.
	 *
	 * @type {Number}
	 * @default 1.0
	 */

	get distinction() { return this.luminosityMaterial.uniforms.distinction.value; }

	/**
	 * @type {Number}
	 */

	set distinction(x) {

		if(typeof x === "number") {

			this.luminosityMaterial.uniforms.distinction.value = x;

		}

	}

	/**
	 * Renders the effect.
	 *
	 * Extracts a luminance map from the read buffer, blurs it and combines it
	 * with the read buffer.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		const quad = this.quad;
		const scene = this.scene;
		const camera = this.camera;
		const blurPass = this.blurPass;

		const luminosityMaterial = this.luminosityMaterial;
		const combineMaterial = this.combineMaterial;

		const renderTargetX = this.renderTargetX;
		const renderTargetY = this.renderTargetY;

		// Luminance filter.
		quad.material = luminosityMaterial;
		luminosityMaterial.uniforms.tDiffuse.value = readBuffer.texture;
		renderer.render(scene, camera, renderTargetX);

		// Convolution phase.
		blurPass.render(renderer, renderTargetX, renderTargetY);

		// Render the original scene with superimposed blur.
		quad.material = combineMaterial;
		combineMaterial.uniforms.texture1.value = readBuffer.texture;
		combineMaterial.uniforms.texture2.value = renderTargetY.texture;

		renderer.render(scene, camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Adjusts the format of the render targets.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
	 */

	initialise(renderer, alpha) {

		this.blurPass.initialise(renderer, alpha);

		if(!alpha) {

			this.renderTargetX.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];
			this.renderTargetY.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];

		}

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.blurPass.setSize(width, height);

		width = this.blurPass.renderTargetX.width;
		height = this.blurPass.renderTargetX.height;

		this.renderTargetX.setSize(width, height);
		this.renderTargetY.setSize(width, height);

	}

}
/* unused harmony export BloomPass */



/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * A Depth of Field (DoF) pass using a bokeh shader.
 *
 * This pass requires a {@link EffectComposer#depthTexture}.
 */

class BokehPass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new bokeh pass.
	 *
	 * @param {PerspectiveCamera} camera - The main camera. Used to obtain the aspect ratio and the near and far plane settings.
	 * @param {Object} [options] - Additional parameters.
	 * @param {Number} [options.focus=1.0] - Focus distance.
	 * @param {Number} [options.aperture=0.025] - Camera aperture scale. Bigger values for shallower depth of field.
	 * @param {Number} [options.maxBlur=1.0] - Maximum blur strength.
	 */

	constructor(camera, options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "BokehPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A bokeh shader material.
		 *
		 * @type {BokehMaterial}
		 * @private
		 */

		this.bokehMaterial = new __WEBPACK_IMPORTED_MODULE_0__materials__["r" /* BokehMaterial */](camera, options);

		this.quad.material = this.bokehMaterial;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		this.bokehMaterial.uniforms.tDiffuse.value = readBuffer.texture;
		this.bokehMaterial.uniforms.tDepth.value = readBuffer.depthTexture;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.bokehMaterial.uniforms.aspect.value = width / height;

	}

}
/* unused harmony export BokehPass */



/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * An advanced Depth of Field (DoF) pass.
 *
 * Yields more realistic results but is also more demanding.
 *
 * This pass requires a {@link EffectComposer#depthTexture}.
 */

class Bokeh2Pass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new bokeh2 pass.
	 *
	 * @param {PerspectiveCamera} camera - The main camera. Used to obtain the focal length and the near and far plane settings.
	 * @param {Object} [options] - Additional parameters.
	 * @param {Number} [options.rings=3] - The amount of blur rings.
	 * @param {Number} [options.samples=4] - The amount of samples per ring.
	 * @param {Boolean} [options.showFocus=false] - Whether the focus point should be highlighted.
	 * @param {Boolean} [options.manualDoF=false] - Enables manual depth of field blur.
	 * @param {Boolean} [options.vignette=false] - Enables a vignette effect.
	 * @param {Boolean} [options.pentagon=false] - Enable to use a pentagonal shape to scale gathered texels.
	 * @param {Boolean} [options.shaderFocus=true] - Disable if you compute your own focalDepth (in metres!).
	 * @param {Boolean} [options.noise=true] - Disable if you don't want noise patterns for dithering.
	 */

	constructor(camera, options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "Bokeh2Pass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A bokeh shader material.
		 *
		 * @type {BokehMaterial}
		 * @private
		 */

		this.bokehMaterial = new __WEBPACK_IMPORTED_MODULE_0__materials__["q" /* Bokeh2Material */](camera, options);

		this.quad.material = this.bokehMaterial;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		this.bokehMaterial.uniforms.tDiffuse.value = readBuffer.texture;
		this.bokehMaterial.uniforms.tDepth.value = readBuffer.depthTexture;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.bokehMaterial.setTexelSize(1.0 / width, 1.0 / height);

	}

}
/* unused harmony export Bokeh2Pass */



/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pass_js__ = __webpack_require__(7);


/**
 * A pass that disables the stencil mask.
 */

class ClearMaskPass extends __WEBPACK_IMPORTED_MODULE_0__pass_js__["a" /* Pass */] {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = ClearMaskPass;



/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * A depth pass.
 *
 * Reads the depth from a depth texture and renders it.
 *
 * This pass requires a {@link EffectComposer#depthTexture}.
 */

class DepthPass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new depth pass.
	 *
	 * @param {PerspectiveCamera} camera - The main camera. Used to obtain the near and far plane settings.
	 */

	constructor(camera) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "DepthPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A depth shader material.
		 *
		 * @type {DepthMaterial}
		 * @private
		 */

		this.depthMaterial = new __WEBPACK_IMPORTED_MODULE_0__materials__["o" /* DepthMaterial */](camera);

		this.quad.material = this.depthMaterial;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		this.depthMaterial.uniforms.tDepth.value = readBuffer.depthTexture;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

}
/* unused harmony export DepthPass */



/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * A dot screen pass.
 */

class DotScreenPass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new dot screen pass.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.angle=1.57] - The angle of the pattern.
	 * @param {Number} [options.scale=1.0] - The scale of the overall effect.
	 * @param {Number} [options.intensity=1.0] - The intensity of the effect.
	 * @param {Boolean} [options.average=false] - Whether the shader should output a colour average (black and white).
	 */

	constructor(options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "DotScreenPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A dot screen shader material.
		 *
		 * @type {DotScreenMaterial}
		 * @private
		 */

		this.material = new __WEBPACK_IMPORTED_MODULE_0__materials__["p" /* DotScreenMaterial */](options.average);

		if(options.angle !== undefined) { this.material.uniforms.angle.value = options.angle; }
		if(options.scale !== undefined) { this.material.uniforms.scale.value = options.scale; }
		if(options.intensity !== undefined) { this.material.uniforms.intensity.value = options.intensity; }

		this.quad.material = this.material;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		this.material.uniforms.tDiffuse.value = readBuffer.texture;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} heght - The height.
	 */

	setSize(width, height) {

		width = Math.max(1, width);
		height = Math.max(1, height);

		this.material.uniforms.offsetRepeat.value.z = width;
		this.material.uniforms.offsetRepeat.value.w = height;

	}

}
/* unused harmony export DotScreenPass */



/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * A film pass.
 *
 * Provides various cinematic effects.
 */

class FilmPass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new film pass.
	 *
	 * @param {Object} [options] - The options. Disabled effects have no negative impact on performance.
	 * @param {Boolean} [options.greyscale=false] - Enable greyscale effect. Greyscale and sepia are mutually exclusive.
	 * @param {Boolean} [options.sepia=false] - Enable sepia effect. Greyscale and sepia are mutually exclusive.
	 * @param {Boolean} [options.vignette=false] - Apply vignette effect.
	 * @param {Boolean} [options.eskil=false] - Use Eskil's vignette approach. The default looks dusty while Eskil looks more burned out.
	 * @param {Boolean} [options.screenMode=true] - Whether the screen blend mode should be used for noise and scanlines.
	 * @param {Boolean} [options.scanlines=true] - Show scanlines.
	 * @param {Boolean} [options.noise=true] - Show noise-based film grain.
	 * @param {Number} [options.noiseIntensity=0.5] - The noise intensity. 0.0 to 1.0.
	 * @param {Number} [options.scanlineIntensity=0.05] - The scanline intensity. 0.0 to 1.0.
	 * @param {Number} [options.scanlineDensity=1.0] - The number of scanlines in percent, relative to the screen height.
	 * @param {Number} [options.greyscaleIntensity=1.0] - The intensity of the greyscale effect.
	 * @param {Number} [options.sepiaIntensity=1.0] - The intensity of the sepia effect.
	 * @param {Number} [options.vignetteOffset=1.0] - The offset of the vignette effect.
	 * @param {Number} [options.vignetteDarkness=1.0] - The darkness of the vignette effect.
	 */

	constructor(options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "FilmPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * Film shader material.
		 *
		 * @type {FilmMaterial}
		 * @private
		 */

		this.material = new __WEBPACK_IMPORTED_MODULE_0__materials__["n" /* FilmMaterial */](options);

		this.quad.material = this.material;

		/**
		 * The amount of scanlines in percent, relative to the screen height.
		 *
		 * You need to call {@link EffectComposer#setSize} after changing this value.
		 *
		 * @type {Number}
		 * @default 1.25
		 */

		this.scanlineDensity = (options.scanlineDensity === undefined) ? 1.25 : options.scanlineDensity;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 * @param {Number} delta - The render delta time.
	 */

	render(renderer, readBuffer, writeBuffer, delta) {

		this.material.uniforms.tDiffuse.value = readBuffer.texture;
		this.material.uniforms.time.value += delta;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Adjusts the scanline count using the renderer's height.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.material.uniforms.scanlineCount.value = Math.round(height * this.scanlineDensity);

	}

}
/* unused harmony export FilmPass */



/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pass_js__ = __webpack_require__(7);




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

class GlitchPass extends __WEBPACK_IMPORTED_MODULE_2__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new glitch pass.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Texture} [options.perturbMap] - A perturbation map. If none is provided, a noise texture will be created.
	 * @param {Number} [options.dtSize=64] - The size of the generated noise map. Will be ignored if a perturbation map is provided.
	 */

	constructor(options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "GlitchPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * Glitch shader material.
		 *
		 * @type {GlitchMaterial}
		 * @private
		 */

		this.material = new __WEBPACK_IMPORTED_MODULE_1__materials__["m" /* GlitchMaterial */]();

		this.quad.material = this.material;

		/**
		 * A perturbation map.
		 *
		 * @type {Texture}
		 * @private
		 */

		this.texture = null;

		this.perturbMap = (options.perturbMap !== undefined) ? options.perturbMap : this.generatePerturbMap(options.dtSize);
		this.perturbMap.name = "Glitch.Perturbation";
		this.perturbMap.generateMipmaps = false;

		/**
		 * The effect mode.
		 *
		 * @type {GlitchMode}
		 * @default GlitchMode.SPORADIC
		 */

		this.mode = GlitchMode.SPORADIC;

		/**
		 * Counter for glitch activation and deactivation.
		 *
		 * @type {Number}
		 * @private
		 */

		this.counter = 0;

		/**
		 * A random break point for the sporadic glitch activation.
		 *
		 * @type {Number}
		 * @private
		 */

		this.breakPoint = randomInt(120, 240);

	}

	/**
	 * The current perturbation map.
	 *
	 * @type {Texture}
	 */

	get perturbMap() { return this.texture; }

	/**
	 * Assigning a new perturbation map does not destroy the current one!
	 *
	 * @type {Texture}
	 */

	set perturbMap(x) {

		this.texture = x;
		this.material.uniforms.tPerturb.value = x;

	}

	/**
	 * Destroys the current perturbation map and replaces it with a new one.
	 *
	 * @param {Number} [size=64] - The texture size.
	 * @return {DataTexture} The perturbation texture.
	 */

	generatePerturbMap(size = 64) {

		const pixels = size * size;
		const data = new Float32Array(pixels * 3);

		let dt = this.perturbMap;
		let i, x;

		for(i = 0; i < pixels; ++i) {

			x = Math.random();

			data[i * 3] = x;
			data[i * 3 + 1] = x;
			data[i * 3 + 2] = x;

		}

		if(dt !== null) {

			dt.dispose();

		}

		dt = new __WEBPACK_IMPORTED_MODULE_0_three__["DataTexture"](data, size, size, __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"], __WEBPACK_IMPORTED_MODULE_0_three__["FloatType"]);
		dt.needsUpdate = true;

		this.perturbMap = dt;

		return dt;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		const mode = this.mode;
		const counter = this.counter;
		const breakPoint = this.breakPoint;
		const uniforms = this.material.uniforms;

		uniforms.tDiffuse.value = readBuffer.texture;
		uniforms.seed.value = Math.random();
		uniforms.active.value = true;

		if(counter % breakPoint === 0 || mode === GlitchMode.CONSTANT_WILD) {

			uniforms.amount.value = Math.random() / 30.0;
			uniforms.angle.value = randomFloat(-Math.PI, Math.PI);
			uniforms.seedX.value = randomFloat(-1.0, 1.0);
			uniforms.seedY.value = randomFloat(-1.0, 1.0);
			uniforms.distortionX.value = randomFloat(0.0, 1.0);
			uniforms.distortionY.value = randomFloat(0.0, 1.0);

			this.breakPoint = randomInt(120, 240);
			this.counter = 0;

		} else {

			if(counter % breakPoint < breakPoint / 5 || mode === GlitchMode.CONSTANT_MILD) {

				uniforms.amount.value = Math.random() / 90.0;
				uniforms.angle.value = randomFloat(-Math.PI, Math.PI);
				uniforms.distortionX.value = randomFloat(0.0, 1.0);
				uniforms.distortionY.value = randomFloat(0.0, 1.0);
				uniforms.seedX.value = randomFloat(-0.3, 0.3);
				uniforms.seedY.value = randomFloat(-0.3, 0.3);

			} else {

				// Sporadic.
				uniforms.active.value = false;

			}

		}

		++this.counter;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

}
/* unused harmony export GlitchPass */


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
/* unused harmony export GlitchMode */



/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_js__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blur_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pass_js__ = __webpack_require__(7);







/**
 * Clamps a given value.
 *
 * @private
 * @static
 * @param {Number} value - The value to clamp.
 * @param {Number} min - The lowest possible value.
 * @param {Number} max - The highest possible value.
 * @return {Number} The clamped value.
 */

function clamp(value, min, max) {

	return Math.max(min, Math.min(max, value));

}

/**
 * A crepuscular rays pass.
 */

class GodRaysPass extends __WEBPACK_IMPORTED_MODULE_4__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new god rays pass.
	 *
	 * @param {Scene} scene - The main scene.
	 * @param {Camera} camera - The main camera.
	 * @param {Object3D} lightSource - The main light source.
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.density=0.96] - The density of the light rays.
	 * @param {Number} [options.decay=0.93] - An illumination decay factor.
	 * @param {Number} [options.weight=0.4] - A light ray weight factor.
	 * @param {Number} [options.exposure=0.6] - A constant attenuation coefficient.
	 * @param {Number} [options.clampMax=1.0] - An upper bound for the saturation of the overall effect.
	 * @param {Number} [options.intensity=1.0] - A constant factor for additive blending.
	 * @param {Number} [options.resolutionScale=0.5] - The render texture resolution scale, relative to the screen render size.
	 * @param {Number} [options.kernelSize=KernelSize.LARGE] - The blur kernel size.
	 * @param {Number} [options.samples=60] - The number of samples per pixel.
	 * @param {Number} [options.screenMode=true] - Whether the screen blend mode should be used for combining the god rays texture with the scene colors.
	 */

	constructor(scene, camera, lightSource, options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "GodRaysPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A scene that only contains the light source.
		 *
		 * @type {Scene}
		 * @private
		 */

		this.lightScene = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();

		/**
		 * The main scene.
		 *
		 * @type {Scene}
		 * @private
		 */

		this.mainScene = scene;

		/**
		 * The main camera.
		 *
		 * @type {Camera}
		 * @private
		 */

		this.mainCamera = camera;

		/**
		 * A pass that only renders the light source.
		 *
		 * @type {RenderPass}
		 * @private
		 */

		this.renderPassLight = new __WEBPACK_IMPORTED_MODULE_2__render_js__["a" /* RenderPass */](this.lightScene, this.mainCamera);

		/**
		 * A pass that renders the masked scene over the light.
		 *
		 * @type {RenderPass}
		 * @private
		 */

		this.renderPassMask = new __WEBPACK_IMPORTED_MODULE_2__render_js__["a" /* RenderPass */](this.mainScene, this.mainCamera, {
			overrideMaterial: new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({ color: 0x000000 }),
			clearColor: new __WEBPACK_IMPORTED_MODULE_0_three__["Color"](0x000000)
		});

		this.renderPassMask.clear = false;

		/**
		 * A blur pass.
		 *
		 * @type {BlurPass}
		 * @private
		 */

		this.blurPass = new __WEBPACK_IMPORTED_MODULE_3__blur_js__["a" /* BlurPass */](options);

		/**
		 * A render target.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetX = this.blurPass.renderTargetX.clone();

		this.renderTargetX.texture.name = "GodRays.TargetX";

		/**
		 * A second render target.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetY = this.blurPass.renderTargetY.clone();

		this.renderTargetY.texture.name = "GodRays.TargetY";

		/**
		 * A render target for the masked light scene.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetMask = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderTarget"](1, 1, {
			minFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			magFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"]
		});

		this.renderTargetMask.texture.name = "GodRays.Mask";
		this.renderTargetMask.texture.generateMipmaps = false;

		/**
		 * The light source.
		 *
		 * @type {Object3D}
		 */

		this.lightSource = lightSource;

		/**
		 * The light position in screen space.
		 *
		 * @type {Vector3}
		 * @private
		 */

		this.screenPosition = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"]();

		/**
		 * A god rays shader material.
		 *
		 * @type {GodRaysMaterial}
		 * @private
		 */

		this.godRaysMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["j" /* GodRaysMaterial */]();
		this.godRaysMaterial.uniforms.lightPosition.value = this.screenPosition;

		if(options.exposure !== undefined) { this.godRaysMaterial.uniforms.exposure.value = options.exposure; }
		if(options.density !== undefined) { this.godRaysMaterial.uniforms.density.value = options.density; }
		if(options.decay !== undefined) { this.godRaysMaterial.uniforms.decay.value = options.decay; }
		if(options.weight !== undefined) { this.godRaysMaterial.uniforms.weight.value = options.weight; }
		if(options.clampMax !== undefined) { this.godRaysMaterial.uniforms.clampMax.value = options.clampMax; }

		this.samples = options.samples;

		/**
		 * A combine shader material.
		 *
		 * @type {CombineMaterial}
		 * @private
		 */

		this.combineMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["k" /* CombineMaterial */]((options.screenMode !== undefined) ? options.screenMode : true);

		this.intensity = options.intensity;

	}

	/**
	 * The resolution scale.
	 *
	 * @type {Number}
	 * @default 0.5
	 */

	get resolutionScale() { return this.blurPass.resolutionScale; }

	/**
	 * You need to call {@link EffectComposer#setSize} after changing this value.
	 *
	 * @type {Number}
	 */

	set resolutionScale(x) {

		this.blurPass.resolutionScale = x;

	}

	/**
	 * The blur kernel size.
	 *
	 * @type {KernelSize}
	 * @default KernelSize.LARGE
	 */

	get kernelSize() { return this.blurPass.kernelSize; }

	/**
	 * @type {KernelSize}
	 */

	set kernelSize(x) {

		this.blurPass.kernelSize = x;

	}

	/**
	 * The overall intensity of the effect.
	 *
	 * @type {Number}
	 * @default 1.0
	 */

	get intensity() { return this.combineMaterial.uniforms.opacity2.value; }

	/**
	 * @type {Number}
	 */

	set intensity(x) {

		if(typeof x === "number") {

			this.combineMaterial.uniforms.opacity2.value = x;

		}

	}

	/**
	 * The number of samples per pixel.
	 *
	 * @type {Number}
	 * @default 60
	 */

	get samples() { return Number.parseInt(this.godRaysMaterial.defines.NUM_SAMPLES_INT); }

	/**
	 * This value must be carefully chosen. A higher value directly increases the
	 * GPU load.
	 *
	 * @type {Number}
	 */

	set samples(x) {

		if(typeof x === "number") {

			x = Math.floor(x);

			this.godRaysMaterial.defines.NUM_SAMPLES_FLOAT = x.toFixed(1);
			this.godRaysMaterial.defines.NUM_SAMPLES_INT = x.toFixed(0);
			this.godRaysMaterial.needsUpdate = true;

		}

	}

	/**
	 * Renders the scene.
	 *
	 * The god rays pass has four phases:
	 *
	 * Mask Phase:
	 *  First, the light source is rendered. Then the scene is rendered into the
	 *  same buffer using a mask override material with depth test enabled.
	 *
	 * Preliminary Blur Phase:
	 *  The masked scene is blurred.
	 *
	 * God Rays Phase:
	 *  The blurred scene is blurred again, but this time along radial lines
	 *  towards the light source.
	 *
	 * Composite Phase:
	 *  The final result is combined with the read buffer.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		const quad = this.quad;
		const scene = this.scene;
		const camera = this.camera;
		const mainScene = this.mainScene;

		const lightSource = this.lightSource;
		const screenPosition = this.screenPosition;

		const godRaysMaterial = this.godRaysMaterial;
		const combineMaterial = this.combineMaterial;

		const renderTargetMask = this.renderTargetMask;
		const renderTargetX = this.renderTargetX;
		const renderTargetY = this.renderTargetY;

		let background, parent;

		// Compute the screen light position and translate it to [0, 1].
		screenPosition.copy(lightSource.position).project(this.mainCamera);
		screenPosition.x = clamp((screenPosition.x + 1.0) * 0.5, 0.0, 1.0);
		screenPosition.y = clamp((screenPosition.y + 1.0) * 0.5, 0.0, 1.0);

		// Render the masked scene.
		parent = lightSource.parent;
		background = mainScene.background;
		mainScene.background = null;
		this.lightScene.add(lightSource);

		this.renderPassLight.render(renderer, renderTargetMask);
		this.renderPassMask.render(renderer, renderTargetMask);

		if(parent !== null) {

			parent.add(lightSource);

		}

		mainScene.background = background;

		// Convolution phase.
		this.blurPass.render(renderer, renderTargetMask, renderTargetX);

		// God rays pass.
		quad.material = godRaysMaterial;
		godRaysMaterial.uniforms.tDiffuse.value = renderTargetX.texture;
		renderer.render(scene, camera, renderTargetY);

		// Final pass - composite god rays onto colours.
		quad.material = combineMaterial;
		combineMaterial.uniforms.texture1.value = readBuffer.texture;
		combineMaterial.uniforms.texture2.value = renderTargetY.texture;

		renderer.render(scene, camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Adjusts the format of the render targets.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
	 */

	initialise(renderer, alpha) {

		this.renderPassLight.initialise(renderer, alpha);
		this.renderPassMask.initialise(renderer, alpha);
		this.blurPass.initialise(renderer, alpha);

		if(!alpha) {

			this.renderTargetMask.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];
			this.renderTargetX.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];
			this.renderTargetY.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];

		}

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.renderPassLight.setSize(width, height);
		this.renderPassMask.setSize(width, height);
		this.blurPass.setSize(width, height);

		width = this.blurPass.renderTargetX.width;
		height = this.blurPass.renderTargetX.height;

		this.renderTargetMask.setSize(width, height);
		this.renderTargetX.setSize(width, height);
		this.renderTargetY.setSize(width, height);

	}

}
/* unused harmony export GodRaysPass */



/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pass_js__ = __webpack_require__(7);


/**
 * A mask pass.
 */

class MaskPass extends __WEBPACK_IMPORTED_MODULE_0__pass_js__["a" /* Pass */] {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = MaskPass;



/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_js__ = __webpack_require__(7);



/**
 * A pixelation pass.
 */

class PixelationPass extends __WEBPACK_IMPORTED_MODULE_1__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new pixelation pass.
	 *
	 * @param {Number} [granularity=30.0] - The intensity of the effect.
	 */

	constructor(granularity = 30.0) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "PixelationPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A pixelation shader material.
		 *
		 * @type {PixelationMaterial}
		 * @private
		 */

		this.pixelationMaterial = new __WEBPACK_IMPORTED_MODULE_0__materials__["i" /* PixelationMaterial */]();

		this.granularity = granularity;

		this.quad.material = this.pixelationMaterial;

	}

	/**
	 * The pixel granularity.
	 *
	 * @type {Number}
	 * @default 30.0
	 */

	get granularity() { return this.pixelationMaterial.granularity; }

	/**
	 * A higher value yields coarser visuals.
	 *
	 * @type {Number}
	 */

	set granularity(x) {

		if(typeof x === "number") {

			x = Math.floor(x);

			if(x % 2 > 0) {

				x += 1;

			}

			this.pixelationMaterial.granularity = x;

		}

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		this.pixelationMaterial.uniforms.tDiffuse.value = readBuffer.texture;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.pixelationMaterial.setResolution(width, height);

	}

}
/* unused harmony export PixelationPass */



/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pass_js__ = __webpack_require__(7);




/**
 * A pass that renders the result from a previous pass to another render target.
 */

class SavePass extends __WEBPACK_IMPORTED_MODULE_2__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new save pass.
	 *
	 * @param {WebGLRenderTarget} [renderTarget] - The render target to use for saving the read buffer.
	 * @param {Boolean} [resize=true] - Whether the render target should adjust to the size of the read/write buffer.
	 */

	constructor(renderTarget, resize = true) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "SavePass";

		/**
		 * Copy shader material.
		 *
		 * @type {CopyMaterial}
		 * @private
		 */

		this.material = new __WEBPACK_IMPORTED_MODULE_1__materials__["a" /* CopyMaterial */]();

		this.quad.material = this.material;

		/**
		 * The render target.
		 *
		 * @type {WebGLRenderTarget}
		 */

		this.renderTarget = (renderTarget !== undefined) ? renderTarget : new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderTarget"](1, 1, {
			minFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			magFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			stencilBuffer: false,
			depthBuffer: false
		});

		this.renderTarget.texture.name = "Save.Target";
		this.renderTarget.texture.generateMipmaps = false;

		/**
		 * Indicates whether the render target should be resized when the size of
		 * the composer's read/write buffer changes.
		 *
		 * @type {Boolean}
		 * @default true
		 */

		this.resize = resize;

	}

	/**
	 * Saves the read buffer.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 */

	render(renderer, readBuffer) {

		this.material.uniforms.tDiffuse.value = readBuffer.texture;

		renderer.render(this.scene, this.camera, this.renderTarget);

	}

	/**
	 * Adjusts the format of the render target.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
	 */

	initialise(renderer, alpha) {

		if(!alpha) {

			this.renderTarget.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];

		}

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		if(this.resize) {

			width = Math.max(1, width);
			height = Math.max(1, height);

			this.renderTarget.setSize(width, height);

		}

	}

}
/* unused harmony export SavePass */



/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pass_js__ = __webpack_require__(7);


/**
 * A shader pass.
 *
 * Used to render any shader material as a 2D filter.
 */

class ShaderPass extends __WEBPACK_IMPORTED_MODULE_0__pass_js__["a" /* Pass */] {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = ShaderPass;



/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pass_js__ = __webpack_require__(7);




/**
 * Half PI.
 *
 * @type {Number}
 * @private
 * @static
 * @final
 */

const HALF_PI = Math.PI * 0.5;

/**
 * A vector.
 *
 * @type {Vector3}
 * @private
 * @static
 * @final
 */

const v = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"]();

/**
 * A vector.
 *
 * @type {Vector3}
 * @private
 * @static
 * @final
 */

const ab = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"]();

/**
 * A shock wave pass.
 */

class ShockWavePass extends __WEBPACK_IMPORTED_MODULE_2__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new shock wave pass.
	 *
	 * @param {Camera} camera - The main camera.
	 * @param {Vector3} [epicenter] - The world position of the shock wave epicenter.
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.speed=1.0] - The animation speed.
	 * @param {Number} [options.maxRadius=1.0] - The extent of the shock wave.
	 * @param {Number} [options.waveSize=0.2] - The wave size.
	 * @param {Number} [options.amplitude=0.05] - The distortion amplitude.
	 */

	constructor(camera, epicenter = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](), options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "ShockWavePass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * The main camera.
		 *
		 * @type {Object3D}
		 */

		this.mainCamera = camera;

		/**
		 * The epicenter.
		 *
		 * @type {Vector3}
		 * @example shockWavePass.epicenter = myMesh.position;
		 */

		this.epicenter = epicenter;

		/**
		 * The object position in screen space.
		 *
		 * @type {Vector3}
		 * @private
		 */

		this.screenPosition = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"]();

		/**
		 * The speed of the shock wave animation.
		 *
		 * @type {Number}
		 * @default 2.0
		 */

		this.speed = (options.speed !== undefined) ? options.speed : 2.0;

		/**
		 * A time accumulator.
		 *
		 * @type {Number}
		 * @private
		 */

		this.time = 0.0;

		/**
		 * Indicates whether the shock wave animation is active.
		 *
		 * @type {Boolean}
		 * @private
		 */

		this.active = false;

		/**
		 * A shock wave shader material.
		 *
		 * @type {ShockWaveMaterial}
		 * @private
		 */

		this.shockWaveMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["h" /* ShockWaveMaterial */](options);

		this.shockWaveMaterial.uniforms.center.value = this.screenPosition;

		/**
		 * A copy shader material.
		 *
		 * @type {CopyMaterial}
		 * @private
		 */

		this.copyMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["a" /* CopyMaterial */]();

	}

	/**
	 * Emits the shock wave.
	 */

	explode() {

		this.time = 0.0;
		this.active = true;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 * @param {Number} delta - The render delta time.
	 */

	render(renderer, readBuffer, writeBuffer, delta) {

		const epicenter = this.epicenter;
		const mainCamera = this.mainCamera;
		const screenPosition = this.screenPosition;

		const shockWaveMaterial = this.shockWaveMaterial;
		const uniforms = shockWaveMaterial.uniforms;
		const center = uniforms.center;
		const radius = uniforms.radius;
		const maxRadius = uniforms.maxRadius;
		const waveSize = uniforms.waveSize;

		this.copyMaterial.uniforms.tDiffuse.value = readBuffer.texture;
		this.quad.material = this.copyMaterial;

		if(this.active) {

			// Calculate direction vectors.
			mainCamera.getWorldDirection(v);
			ab.copy(mainCamera.position).sub(epicenter);

			// Don't render the effect if the object is behind the camera.
			if(v.angleTo(ab) > HALF_PI) {

				// Scale the effect based on distance to the object.
				uniforms.cameraDistance.value = mainCamera.position.distanceTo(epicenter);

				// Calculate the screen position of the epicenter.
				screenPosition.copy(epicenter).project(mainCamera);
				center.value.x = (screenPosition.x + 1.0) * 0.5;
				center.value.y = (screenPosition.y + 1.0) * 0.5;

				uniforms.tDiffuse.value = readBuffer.texture;
				this.quad.material = shockWaveMaterial;

			}

			// Update the shock wave radius based on time.
			this.time += delta;
			radius.value = this.time * this.speed - waveSize.value;

			if(radius.value >= (maxRadius.value + waveSize.value) * 2) {

				this.active = false;

			}

		}

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.shockWaveMaterial.uniforms.aspect.value = width / height;

	}

}
/* unused harmony export ShockWavePass */



/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pass_js__ = __webpack_require__(7);





/**
 * Subpixel Morphological Antialiasing (SMAA) v2.8.
 *
 * Preset: SMAA 1x Medium (with color edge detection).
 *  https://github.com/iryoku/smaa/releases/tag/v2.8
 */

class SMAAPass extends __WEBPACK_IMPORTED_MODULE_2__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new SMAA pass.
	 *
	 * @param {Image} Image - This pass requires an Image class to create internal textures. Provide window.Image in a browser environment.
	 */

	constructor(Image) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "SMAAPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * A render target for the color edge detection.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetColorEdges = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderTarget"](1, 1, {
			minFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			format: __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"],
			stencilBuffer: false,
			depthBuffer: false
		});

		this.renderTargetColorEdges.texture.name = "SMAA.ColorEdges";
		this.renderTargetColorEdges.texture.generateMipmaps = false;

		/**
		 * A render target for the SMAA weights.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetWeights = this.renderTargetColorEdges.clone();

		this.renderTargetWeights.texture.name = "SMAA.Weights";
		this.renderTargetWeights.texture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBAFormat"];

		/**
		 * SMAA color edge detection shader material.
		 *
		 * @type {SMAAColorEdgesMaterial}
		 * @private
		 */

		this.colorEdgesMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["e" /* SMAAColorEdgesMaterial */]();

		/**
		 * SMAA weights shader material.
		 *
		 * @type {SMAAWeightsMaterial}
		 * @private
		 */

		this.weightsMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["f" /* SMAAWeightsMaterial */]();

		const areaImage = new Image();
		areaImage.src = this.weightsMaterial.areaImage;

		const areaTexture = new __WEBPACK_IMPORTED_MODULE_0_three__["Texture"]();
		areaTexture.image = areaImage;
		areaTexture.name = "SMAA.Area";
		areaTexture.minFilter = __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"];
		areaTexture.format = __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"];
		areaTexture.generateMipmaps = false;
		areaTexture.needsUpdate = true;
		areaTexture.flipY = false;

		const searchImage = new Image();
		searchImage.src = this.weightsMaterial.searchImage;

		const searchTexture = new __WEBPACK_IMPORTED_MODULE_0_three__["Texture"]();
		searchTexture.image = searchImage;
		searchTexture.name = "SMAA.Search";
		searchTexture.magFilter = __WEBPACK_IMPORTED_MODULE_0_three__["NearestFilter"];
		searchTexture.minFilter = __WEBPACK_IMPORTED_MODULE_0_three__["NearestFilter"];
		searchTexture.generateMipmaps = false;
		searchTexture.needsUpdate = true;
		searchTexture.flipY = false;

		this.weightsMaterial.uniforms.tDiffuse.value = this.renderTargetColorEdges.texture;
		this.weightsMaterial.uniforms.tArea.value = areaTexture;
		this.weightsMaterial.uniforms.tSearch.value = searchTexture;

		/**
		 * SMAA blend shader material.
		 *
		 * @type {SMAABlendMaterial}
		 * @private
		 */

		this.blendMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["g" /* SMAABlendMaterial */]();

		this.blendMaterial.uniforms.tWeights.value = this.renderTargetWeights.texture;

		this.quad.material = this.blendMaterial;

	}

	/**
	 * Antialiases the scene.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 */

	render(renderer, readBuffer, writeBuffer) {

		// Detect color edges.
		this.quad.material = this.colorEdgesMaterial;
		this.colorEdgesMaterial.uniforms.tDiffuse.value = readBuffer.texture;
		renderer.render(this.scene, this.camera, this.renderTargetColorEdges, true);

		// Compute edge weights.
		this.quad.material = this.weightsMaterial;
		renderer.render(this.scene, this.camera, this.renderTargetWeights, false);

		// Apply the antialiasing filter to the colors.
		this.quad.material = this.blendMaterial;
		this.blendMaterial.uniforms.tDiffuse.value = readBuffer.texture;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Updates this pass with the renderer's size.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		this.renderTargetColorEdges.setSize(width, height);
		this.renderTargetWeights.setSize(width, height);

		this.colorEdgesMaterial.uniforms.texelSize.value.copy(
			this.weightsMaterial.uniforms.texelSize.value.copy(
				this.blendMaterial.uniforms.texelSize.value.set(
					1.0 / width, 1.0 / height
		)));

	}

}
/* unused harmony export SMAAPass */



/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pass_js__ = __webpack_require__(7);




/**
 * A pass that renders a given texture.
 */

class TexturePass extends __WEBPACK_IMPORTED_MODULE_2__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new texture pass.
	 *
	 * @param {Texture} texture - The texture.
	 * @param {Number} [opacity=1.0] - The texture opacity.
	 */

	constructor(texture, opacity = 1.0) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "TexturePass";

		/**
		 * A copy shader material used for rendering to texture.
		 *
		 * @type {CopyMaterial}
		 * @private
		 */

		this.copyMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["a" /* CopyMaterial */]();
		this.copyMaterial.blending = __WEBPACK_IMPORTED_MODULE_0_three__["AdditiveBlending"];
		this.copyMaterial.transparent = true;

		this.texture = texture;
		this.opacity = opacity;

		this.quad.material = this.copyMaterial;

	}

	/**
	 * The texture.
	 *
	 * @type {Texture}
	 */

	get texture() { return this.copyMaterial.uniforms.tDiffuse.value; }

	/**
	 * @type {Texture}
	 */

	set texture(x) {

		this.copyMaterial.uniforms.tDiffuse.value = x;

	}

	/**
	 * The opacity.
	 *
	 * @type {Number}
	 * @default 1.0
	 */

	get opacity() { return this.copyMaterial.uniforms.opacity.value; }

	/**
	 * @type {Number}
	 */

	set opacity(x) {

		this.copyMaterial.uniforms.opacity.value = x;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 */

	render(renderer, readBuffer) {

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer);

	}

}
/* unused harmony export TexturePass */



/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__materials__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pass_js__ = __webpack_require__(7);






/**
 * Rounds the given number up to the next power of two.
 *
 * @private
 * @static
 * @param {Number} n - A number.
 * @return {Number} The next power of two.
 */

function ceil2(n) { return Math.pow(2, Math.max(0, Math.ceil(Math.log2(n)))); }

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

class ToneMappingPass extends __WEBPACK_IMPORTED_MODULE_2__pass_js__["a" /* Pass */] {

	/**
	 * Constructs a new tone mapping pass.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Boolean} [options.adaptive=true] - Whether the tone mapping should use an adaptive luminance map.
	 * @param {Number} [options.resolution=256] - The render texture resolution.
	 * @param {Number} [options.distinction=1.0] - A luminance distinction factor.
	 */

	constructor(options = {}) {

		super();

		/**
		 * The name of this pass.
		 */

		this.name = "ToneMappingPass";

		/**
		 * This pass renders to the write buffer.
		 */

		this.needsSwap = true;

		/**
		 * The render target for the current luminosity.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 * @todo Use RED format in WebGL 2.0.
		 */

		this.renderTargetLuminosity = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderTarget"](1, 1, {
			minFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearMipMapLinearFilter"],
			magFilter: __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"],
			format: __WEBPACK_IMPORTED_MODULE_0_three__["RGBFormat"],
			stencilBuffer: false,
			depthBuffer: false
		});

		this.renderTargetLuminosity.texture.name = "ToneMapping.Luminosity";

		/**
		 * The render target for adapted luminosity.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetAdapted = this.renderTargetLuminosity.clone();

		this.renderTargetAdapted.texture.name = "ToneMapping.AdaptedLuminosity";
		this.renderTargetAdapted.texture.generateMipmaps = false;
		this.renderTargetAdapted.texture.minFilter = __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"];

		/**
		 * A render target that holds a copy of the adapted limonosity.
		 *
		 * @type {WebGLRenderTarget}
		 * @private
		 */

		this.renderTargetPrevious = this.renderTargetAdapted.clone();

		this.renderTargetPrevious.texture.name = "ToneMapping.PreviousLuminosity";

		/**
		 * Copy shader material used for saving the luminance map.
		 *
		 * @type {CopyMaterial}
		 * @private
		 */

		this.copyMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["a" /* CopyMaterial */]();

		/**
		 * A luminosity shader material.
		 *
		 * @type {LuminosityMaterial}
		 * @private
		 */

		this.luminosityMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["b" /* LuminosityMaterial */]();

		this.luminosityMaterial.uniforms.distinction.value = (options.distinction !== undefined) ? options.distinction : 1.0;

		/**
		 * An adaptive luminance shader material.
		 *
		 * @type {AdaptiveLuminosityMaterial}
		 * @private
		 */

		this.adaptiveLuminosityMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["c" /* AdaptiveLuminosityMaterial */]();

		this.resolution = (options.resolution !== undefined) ? options.resolution : 256;

		/**
		 * A tone mapping shader material.
		 *
		 * @type {ToneMappingMaterial}
		 * @private
		 */

		this.toneMappingMaterial = new __WEBPACK_IMPORTED_MODULE_1__materials__["d" /* ToneMappingMaterial */]();

		this.adaptive = (options.adaptive !== undefined) ? options.adaptive : true;

	}

	/**
	 * The resolution of the render targets.
	 *
	 * @type {Number}
	 * @default 256
	 */

	get resolution() { return this.renderTargetLuminosity.width; }

	/**
	 * The resolution of the render targets. Must be a power of two and will be
	 * rounded up if it isn't.
	 *
	 * @type {Number}
	 */

	set resolution(x) {

		x = ceil2(x);

		this.renderTargetLuminosity.setSize(x, x);
		this.renderTargetPrevious.setSize(x, x);
		this.renderTargetAdapted.setSize(x, x);

		this.adaptiveLuminosityMaterial.defines.MIP_LEVEL_1X1 = (Math.round(Math.log(x)) / Math.log(2)).toFixed(1);
		this.adaptiveLuminosityMaterial.needsUpdate = true;

	}

	/**
	 * Whether this pass uses adaptive luminosity.
	 *
	 * @type {Boolean}
	 */

	get adaptive() { return this.toneMappingMaterial.defines.ADAPTED_LUMINANCE !== undefined; }

	/**
	 * Whether this pass should use adaptive luminosity.
	 *
	 * @type {Boolean}
	 */

	set adaptive(x) {

		if(x) {

			this.toneMappingMaterial.defines.ADAPTED_LUMINANCE = "1";
			this.toneMappingMaterial.uniforms.luminanceMap.value = this.renderTargetAdapted.texture;

		} else {

			delete this.toneMappingMaterial.defines.ADAPTED_LUMINANCE;
			this.toneMappingMaterial.uniforms.luminanceMap.value = null;

		}

		this.toneMappingMaterial.needsUpdate = true;

	}

	/**
	 * Renders the effect.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer.
	 * @param {Number} delta - The render delta time.
	 */

	render(renderer, readBuffer, writeBuffer, delta) {

		const quad = this.quad;
		const scene = this.scene;
		const camera = this.camera;

		const adaptiveLuminosityMaterial = this.adaptiveLuminosityMaterial;
		const luminosityMaterial = this.luminosityMaterial;
		const toneMappingMaterial = this.toneMappingMaterial;
		const copyMaterial = this.copyMaterial;

		const renderTargetPrevious = this.renderTargetPrevious;
		const renderTargetLuminosity = this.renderTargetLuminosity;
		const renderTargetAdapted = this.renderTargetAdapted;

		if(this.adaptive) {

			// Render the luminance of the current scene into a render target with mipmapping enabled.
			quad.material = luminosityMaterial;
			luminosityMaterial.uniforms.tDiffuse.value = readBuffer.texture;
			renderer.render(scene, camera, renderTargetLuminosity);

			// Use the new luminance values, the previous luminance and the frame delta to adapt the luminance over time.
			quad.material = adaptiveLuminosityMaterial;
			adaptiveLuminosityMaterial.uniforms.delta.value = delta;
			adaptiveLuminosityMaterial.uniforms.tPreviousLum.value = renderTargetPrevious.texture;
			adaptiveLuminosityMaterial.uniforms.tCurrentLum.value = renderTargetLuminosity.texture;
			renderer.render(scene, camera, renderTargetAdapted);

			// Copy the new adapted luminance value so that it can be used by the next frame.
			quad.material = copyMaterial;
			copyMaterial.uniforms.tDiffuse.value = renderTargetAdapted.texture;
			renderer.render(scene, camera, renderTargetPrevious);

		}

		// Apply the tone mapping to the colours.
		quad.material = toneMappingMaterial;
		toneMappingMaterial.uniforms.tDiffuse.value = readBuffer.texture;

		renderer.render(this.scene, this.camera, this.renderToScreen ? null : writeBuffer);

	}

	/**
	 * Renders something into the previous luminosity texture.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 */

	initialise(renderer) {

		this.quad.material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({ color: 0x7fffff });
		renderer.render(this.scene, this.camera, this.renderTargetPrevious);
		this.quad.material.dispose();

	}

}
/* unused harmony export ToneMappingPass */



/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var performance = global.performance || {};

var present = (function () {
  var names = ['now', 'webkitNow', 'msNow', 'mozNow', 'oNow'];
  while (names.length) {
    var name = names.shift();
    if (name in performance) {
      return performance[name].bind(performance);
    }
  }

  var dateNow = Date.now || function () { return new Date().getTime(); };
  var navigationStart = (performance.timing || {}).navigationStart || dateNow();
  return function () {
    return dateNow() - navigationStart;
  };
}());

present.performanceNow = performance.now;
present.noConflict = function () {
  performance.now = present.performanceNow;
};
present.conflict = function () {
  performance.now = present;
};
present.conflict();

module.exports = present;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(88);
/* unused harmony export default */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(90);
/* unused harmony export default */




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(61)))

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(90);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["a"]; });
/* unused harmony reexport combineReducers */
/* unused harmony reexport bindActionCreators */
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(61)))

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(255);


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(256);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33), __webpack_require__(257)(module)))

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(91);


/***/ })
/******/ ]);
});
//# sourceMappingURL=whitestorm.js.map