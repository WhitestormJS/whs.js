'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.World = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var THREE = _interopRequireWildcard(_three);

var _stats = require('stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _index = require('../physics/index.js');

var Physijs = _interopRequireWildcard(_index);

var _PerspectiveCamera = require('../cameras/PerspectiveCamera');

var _Camera = require('./Camera');

var _Object = require('./Object');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var World = function (_WHSObject) {
  (0, _inherits3.default)(World, _WHSObject);

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

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(World).call(this, {
      stats: false,
      autoresize: false,
      softbody: false,

      shadowmap: {
        enabled: true,
        type: THREE.PCFSoftShadowMap
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
        fixedTimeStep: 1 / 60,

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

      fog: {
        type: false,

        density: 0.00025,
        hex: 0x000000,
        near: 1,
        far: 1000
      },

      background: {
        color: 0x000000,
        opacity: 1
      },

      renderer: {},

      assets: './assets',
      container: document.body
    }));

    (0, _get3.default)(Object.getPrototypeOf(World.prototype), 'setParams', _this).call(_this, params);

    // INIT.
    _this._initDOM();
    _this._initScene();

    if (!((typeof process === 'undefined' ? 'undefined' : (0, _typeof3.default)(process)) === 'object' && Object.prototype.toString.call(process) === '[object process]')) _this._initStats();

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
   * Initialize THREE.js scene object.
   */


  (0, _createClass3.default)(World, [{
    key: '_initScene',
    value: function _initScene() {
      var _this2 = this;

      var params = this.getParams(),
          scene = !!'physics' ? new Physijs.Scene({
        fixedTimeStep: params.physics.fixedTimeStep
      }, {
        stats: params.stats,
        world: this,
        softbody: params.softbody
      }) : new THREE.Scene();

      if (!!'physics') {
        scene.setGravity(new THREE.Vector3(params.gravity.x, params.gravity.y, params.gravity.z));

        this.simulate = true;
        scene.addEventListener('update', function () {
          if (_this2.simulate) scene.simulate(undefined, 1);
        });

        scene.simulate();
      } else this.simulate = false;

      if (params.fog.type === 'regular') scene.fog = new THREE.Fog(params.fog.hex, params.fog.near, params.fog.far);else if (params.fog.type === 'exp' || params.fog.type === 'expodential') scene.fog = new THREE.FogExp2(params.fog.hex, params.fog.density);

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
     * Initialize DOM structure for whitestorm.
     */

  }, {
    key: '_initDOM',
    value: function _initDOM() {
      var params = this.getParams();

      params.container.style.margin = 0;
      params.container.style.padding = 0;
      params.container.style.position = 'relative';
      params.container.style.overflow = 'hidden';

      this._dom = document.createElement('div');
      this._dom.className = 'whs';

      params.container.appendChild(this._dom);

      return this._dom;
    }

    /**
     * Inititialize stats plugin.
     */

  }, {
    key: '_initStats',
    value: function _initStats() {
      var params = this.getParams();

      if (params.stats) {
        this._stats = new _stats2.default();

        if (params.stats === 'fps') this._stats.setMode(0);else if (params.stats === 'ms') this._stats.setMode(1);else if (params.stats === 'mb') this._stats.setMode(1);else {
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
      var params = this.getParams();

      this.setCamera(new _PerspectiveCamera.PerspectiveCamera({
        camera: {
          fov: params.camera.aspect,
          aspect: params.width / params.height,
          near: params.camera.near,
          far: params.camera.far
        },

        pos: {
          x: params.camera.x,
          y: params.camera.y,
          z: params.camera.z
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
      this.setRenderer(new THREE.WebGLRenderer(this.getParams().renderer));

      var renderer = this.getRenderer();
      renderer.setClearColor(this.getParams().background.color, this.getParams().background.opacity);

      // Shadowmap.
      renderer.shadowMap.enabled = this.getParams().shadowmap.enabled;
      renderer.shadowMap.type = this.getParams().shadowmap.type;
      renderer.shadowMap.cascade = true;

      renderer.setSize(Number(this.getParams().width * this.getParams().rWidth).toFixed(), Number(this.getParams().height * this.getParams().rHeight).toFixed());

      renderer.render(this.getScene(), this.getCamera().getNative());

      this._dom.appendChild(renderer.domElement);

      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    }

    /**
     * Add helpers to scene.
     */

  }, {
    key: '_initHelpers',
    value: function _initHelpers() {
      var params = this.getParams(),
          scene = this.getScene();

      if (params.helpers.axis) {
        scene.add(new THREE.AxisHelper(params.helpers.axis.size ? params.helpers.axis.size : 5));
      }

      if (params.helpers.grid) {
        scene.add(new THREE.GridHelper(params.helpers.grid.size ? params.helpers.grid.size : 10, params.helpers.grid.step ? params.helpers.grid.step : 1));
      }
    }

    /**
     * Start animation.
     */

  }, {
    key: 'start',
    value: function start() {
      var clock = new THREE.Clock(),
          _scope = this,
          scene = _scope.getScene(),
          cameraNative = _scope.getCamera().getNative(),
          renderer = _scope.getRenderer();

      window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      }();

      function reDraw(time) {
        window.requestAnimFrame(reDraw);

        // Init stats.
        if (_scope._stats) _scope._stats.begin();

        _scope._process(clock.getDelta());
        if (_scope.controls) _scope._updateControls();

        // Effects rendering.
        if (_scope._composer && _scope.render) {
          _scope._composer.reset();
          _scope._composer.render(scene, cameraNative);
          _scope._composer.pass(_scope._composer.stack);
          _scope._composer.toScreen();
        } else if (_scope.render) renderer.render(scene, cameraNative);

        _scope._execLoops(time);

        // End helper.
        if (_scope._stats) _scope._stats.end();
      }

      this._update = reDraw;

      _scope._update();
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
    value: function _process(delta) {
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
      this.scene = scene;
      return this.scene;
    }
  }, {
    key: 'getScene',
    value: function getScene() {
      return this.scene;
    }
  }, {
    key: 'setRenderer',
    value: function setRenderer(renderer) {
      this.renderer = renderer;
      return this.renderer;
    }
  }, {
    key: 'getRenderer',
    value: function getRenderer() {
      return this.renderer;
    }
  }, {
    key: 'setControls',
    value: function setControls(controls) {
      var recieved = controls(this);

      this.controls = recieved instanceof Array ? recieved[0] : recieved;

      if (recieved instanceof Array && typeof recieved[1] === 'function') recieved[1](this);

      return this.controls;
    }

    /**
     * Set a camera for rendering world.
     *
     * @params {WHS.Camera} camera - The camera to be rendered.
     */

  }, {
    key: 'setCamera',
    value: function setCamera(camera) {
      if (camera instanceof _Camera.Camera) this.camera = camera;else console.error('@WHS.World: camera in not an instance of WHS.Camera.');
    }
  }, {
    key: 'getCamera',
    value: function getCamera() {
      return this.camera;
    }
  }]);
  return World;
}(_Object.WHSObject);

exports.World = World;
//# sourceMappingURL=World.js.map
