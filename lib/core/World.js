'use strict';

_Object3.default.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = undefined;

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

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _PerspectiveCamera = require('../cameras/PerspectiveCamera');

var _PerspectiveCamera2 = _interopRequireDefault(_PerspectiveCamera);

var _Camera = require('./Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _Object2 = require('./Object');

var _Object3 = _interopRequireDefault(_Object2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var World = function (_Object) {
  (0, _inherits3.default)(World, _Object);

  /**
   * Create a 3D world and define defaults.
   *
   * @param {object} params - The scene settings object.
   * @return {World} A 3D world whs object.
   */

  function World() {
    var _ret;

    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, World);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Object3.default.getPrototypeOf(World).call(this, {

      stats: false,
      autoresize: false,

      shadowmap: {
        enabled: true,
        type: _three2.default.PCFSoftShadowMap
      },

      helpers: {
        grid: false,
        axis: false
      },

      gravity: {
        x: 0,
        y: 0,
        z: 0
      },

      camera: {
        aspect: 75,
        near: 1,
        far: 1000,

        x: 0,
        y: 0,
        z: 0
      },

      rWidth: 1, // Resolution(width).
      rHeight: 1, // Resolution(height).

      width: window.innerWidth, // Container(width).
      height: window.innerHeight, // Container(height).

      physics: {

        quatNormalizeSkip: 0,
        quatNormalizeFast: false,

        solver: {
          iterations: 20,
          tolerance: 0
        },

        defMaterial: {
          contactEquationStiffness: 1e8,
          contactEquationRegularizationTime: 3
        }

      },

      background: 0x000000,
      assets: './assets',
      container: document.body,

      paths: {
        worker: '../libs/physijs_worker.js',
        ammo: '../libs/ammo.js'
      }

    }));

    (0, _get3.default)(_Object3.default.getPrototypeOf(World.prototype), 'setParams', _this).call(_this, params);

    native.set(_this, {});

    // INIT.
    _this._initScene();
    _this._initDOM();
    _this._initStats();
    _this._initCamera();
    _this._initRenderer();
    _this._initHelpers();

    // NOTE: ==================== Autoresize. ======================
    var scope = _this;

    if (_this.getParams().autoresize) {
      window.addEventListener('resize', function () {
        scope.setSize(window.innerWidth, window.innerHeight);
      });
    }

    scope.loops = [];

    return _ret = scope, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * Initialize Three.js scene object.
   */


  (0, _createClass3.default)(World, [{
    key: '_initScene',
    value: function _initScene() {
      this._initPhysiJS();

      var scene = new Physijs.Scene();

      scene.setGravity(new _three2.default.Vector3(this.getParams().gravity.x, this.getParams().gravity.y, this.getParams().gravity.z));

      this.setScene(scene);

      // Array for processing.
      this.children = [];
    }
  }, {
    key: 'addLoop',
    value: function addLoop(loop) {
      this.loops.push(loop); // TODO: Process loops on start
      // like: this.loops.forEach((elem) => elem.start());
    }
  }, {
    key: 'removeLoop',
    value: function removeLoop(loop) {
      this.loops.filter(function (l) {
        return l !== loop;
      });
    }

    /**
     * Set Physi.js scripts pathes.
     */

  }, {
    key: '_initPhysiJS',
    value: function _initPhysiJS() {
      this.simulate = true;

      Physijs.scripts.worker = this.getParams().paths.worker;
      Physijs.scripts.ammo = this.getParams().paths.ammo;
    }

    /**
     * Initialize DOM structure for whitestorm.
     */

  }, {
    key: '_initDOM',
    value: function _initDOM() {
      this.getParams().container.style.margin = 0;
      this.getParams().container.style.padding = 0;
      this.getParams().container.style.position = 'relative';
      this.getParams().container.style.overflow = 'hidden';

      this._dom = document.createElement('div');
      this._dom.className = 'whs';

      this.getParams().container.appendChild(this._dom);

      return this._dom;
    }

    /**
     * Inititialize stats plugin.
     */

  }, {
    key: '_initStats',
    value: function _initStats() {
      // Debug Renderer
      if (this.getParams().stats) {
        this._stats = new Stats();

        if (this.getParams().stats === 'fps') this._stats.setMode(0);else if (this.getParams().stats === 'ms') this._stats.setMode(1);else if (this.getParams().stats === 'mb') this._stats.setMode(1);else {
          this._stats.setMode(0);
          console.warn([this._stats], 'Please, apply stats mode [fps, ms, mb] .');
        }

        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '0px';
        this._stats.domElement.style.bottom = '0px';

        this._dom.appendChild(this._stats.domElement);
      }
    }

    /**
     * Create a camera and add it to scene.
     */

  }, {
    key: '_initCamera',
    value: function _initCamera() {
      this.setCamera(new _PerspectiveCamera2.default({
        camera: {
          fov: this.getParams().camera.aspect,
          aspect: this.getParams().width / this.getParams().height,
          near: this.getParams().camera.near,
          far: this.getParams().camera.far
        },

        pos: {
          x: this.getParams().camera.x,
          y: this.getParams().camera.y,
          z: this.getParams().camera.z
        }
      }));

      this.getCamera().addTo(this);
    }

    /**
     * Create a renderer and apply it's options.
     */

  }, {
    key: '_initRenderer',
    value: function _initRenderer() {
      this.render = true;

      // Renderer.
      this.setRenderer(new _three2.default.WebGLRenderer());
      this.getRenderer().setClearColor(this.getParams().background);

      // Shadowmap.
      this.getRenderer().shadowMap.enabled = this.getParams().shadowmap.enabled;
      this.getRenderer().shadowMap.type = this.getParams().shadowmap.type;
      this.getRenderer().shadowMap.cascade = true;

      this.getRenderer().setSize(Number(this.getParams().width * this.getParams().rWidth).toFixed(), Number(this.getParams().height * this.getParams().rHeight).toFixed());

      this.getRenderer().render(this.getScene(), this.getCamera().getNative());

      this._dom.appendChild(this.getRenderer().domElement);

      this.getRenderer().domElement.style.width = '100%';
      this.getRenderer().domElement.style.height = '100%';
    }

    /**
     * Add helpers to scene.
     */

  }, {
    key: '_initHelpers',
    value: function _initHelpers() {
      if (this.getParams().helpers.axis) {
        this.getScene().add(new _three2.default.AxisHelper(this.getParams().helpers.axis.size ? this.getParams().helpers.axis.size : 5));
      }

      if (this.getParams().helpers.grid) {
        this.getScene().add(new _three2.default.GridHelper(this.getParams().helpers.grid.size ? this.getParams().helpers.grid.size : 10, this.getParams().helpers.grid.step ? this.getParams().helpers.grid.step : 1));
      }
    }

    /**
     * Start animation.
     */

  }, {
    key: 'start',
    value: function start() {
      var clock = new _three2.default.Clock(),
          scope = this,
          scene = scope.getScene(),
          cameraNative = scope.getCamera().getNative(),
          renderer = scope.getRenderer();

      window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      }();

      function reDraw(time) {
        window.requestAnimFrame(reDraw);

        // Init stats.
        if (scope._stats) scope._stats.begin();

        scope._process(clock);

        if (scope.simulate) scene.simulate();
        if (scope.controls) scope._updateControls();

        // Effects rendering.
        if (scope._composer && scope.render) {
          scope._composer.reset();
          scope._composer.render(scene, cameraNative);
          scope._composer.pass(scope._composer.stack);
          scope._composer.toScreen();
        } else if (scope.render) renderer.render(scene, cameraNative);

        scope._execLoops(time);

        // End helper.
        if (scope._stats) scope._stats.end();
      }

      this._update = reDraw;

      scope._update();
    }

    /**
     * Execute all loops with a specific time.
     *
     * @params {number} time - The time value that will be passed to loops.
     */

  }, {
    key: '_execLoops',
    value: function _execLoops(time) {
      for (var i = 0; i < this.loops.length; i++) {
        var e = this.loops[i];
        if (e.enabled) e.execute(e.clock, time);
      }
    }

    /**
     * Update controls time values.
     */

  }, {
    key: '_updateControls',
    value: function _updateControls() {
      this.controls.update(Date.now() - this.time);
      this.time = Date.now();
    }

    /**
     * Update morphs animations.
     *
     * @params {THREE.Clock} clock - The clock object, which.
     */

  }, {
    key: '_process',
    value: function _process(clock) {
      var delta = clock.getDelta();

      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i]._type === 'morph') this.children[i].getNative().mixer.update(delta);
      }
    }

    /**
     * This functon will scene properties when it's called.
     */

  }, {
    key: 'setSize',
    value: function setSize() {
      var width = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var height = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.getCamera().getNative().aspect = width / height;
      this.getCamera().getNative().updateProjectionMatrix();

      this.getRenderer().setSize(Number(width * this.getParams().rWidth).toFixed(), Number(height * this.getParams().rHeight).toFixed());
    }
  }, {
    key: 'setScene',
    value: function setScene(scene) {
      native.get(this).scene = scene;
      return native.get(this).scene;
    }
  }, {
    key: 'getScene',
    value: function getScene() {
      return native.get(this).scene;
    }
  }, {
    key: 'setRenderer',
    value: function setRenderer(renderer) {
      native.get(this).renderer = renderer;
      return native.get(this).renderer;
    }
  }, {
    key: 'getRenderer',
    value: function getRenderer() {
      return native.get(this).renderer;
    }

    /**
     * Set a camera for rendering world.
     *
     * @params {WHS.Camera} camera - The camera to be rendered.
     */

  }, {
    key: 'setCamera',
    value: function setCamera(camera) {
      if (camera instanceof _Camera2.default) native.get(this).camera = camera;else console.error('@WHS.World: camera in not an instance of WHS.Camera.');
    }
  }, {
    key: 'getCamera',
    value: function getCamera() {
      return native.get(this).camera;
    }
  }]);
  return World;
}(_Object3.default);

exports.default = World;
//# sourceMappingURL=World.js.map
