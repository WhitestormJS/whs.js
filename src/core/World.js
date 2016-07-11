import * as THREE from 'three';
import Stats from 'stats.js';
import * as Physijs from '../physics/index.js';

import {PerspectiveCamera} from '../cameras/PerspectiveCamera';
import {Camera} from './Camera';
import {Shape} from './Shape';
import {Light} from './Light';
import {WHSObject} from './Object';

class World extends WHSObject {
  /**
   * Create a 3D world and define defaults.
   *
   * @param {object} params - The scene settings object.
   * @return {World} A 3D world whs object.
   */
  constructor(params = {}) {
    super({
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
        fixedTimeStep: 1 / 60
      },

      fog: {
        type: false,

        density: 0.00025,
        hex: 0x000000,
        near: 1,
        far: 1000
      },

      init: {
        scene: true,
        camera: true,
        helpers: true,
        renderer: true
      },

      background: {
        color: 0x000000,
        opacity: 1
      },

      renderer: {},
      container: document.body
    });

    super.setParams(params);

    const initParams = this.getParams().init;

    // INIT.
    this._initDOM();
    if (initParams.scene) this._initScene();

    if (!(
      typeof process === 'object'
      && Object.prototype.toString.call(process) === '[object process]'
      )) this._initStats();

    if (initParams.scene && initParams.camera) this._initCamera();
    if (initParams.scene && initParams.renderer) this._initRenderer();
    if (initParams.scene && initParams.helpers) this._initHelpers();

    // NOTE: ==================== Autoresize. ======================
    const scope = this;

    if (this.getParams().autoresize) {
      window.addEventListener('resize', () => {
        scope.setSize(window.innerWidth, window.innerHeight);
      });
    }

    scope.loops = [];

    return scope;
  }

  /**
   * Initialize THREE.js scene object.
   */
  _initScene() {
    const params = this.getParams(),
      scene = !!'physics'
      ? new Physijs.Scene(
        {
          fixedTimeStep: params.physics.fixedTimeStep
        },
        {
          stats: params.stats,
          world: this,
          softbody: params.softbody
        }
      ) : new THREE.Scene();

    if (!!'physics') {
      scene.setGravity(
        new THREE.Vector3(
          params.gravity.x,
          params.gravity.y,
          params.gravity.z
        )
      );

      this.simulate = true;
      scene.addEventListener('update', () => {
        if (this.simulate) scene.simulate(undefined, 1);
      });

      scene.simulate();
    } else this.simulate = false;

    if (params.fog.type === 'regular')
      scene.fog = new THREE.Fog(params.fog.hex, params.fog.near, params.fog.far);
    else if (params.fog.type === 'exp'
      || params.fog.type === 'expodential')
      scene.fog = new THREE.FogExp2(params.fog.hex, params.fog.density);

    this.setScene(scene, false);

    // Array for processing.
    this.children = [];
  }

  addLoop(loop) {
    this.loops.push(loop); // TODO: Process loops on start
    // like: this.loops.forEach((elem) => elem.start());
  }

  removeLoop(loop) {
    this.loops.filter((l) => l !== loop);
  }

  /**
   * Initialize DOM structure for whitestorm.
   */
  _initDOM() {
    const params = this.getParams();

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
  _initStats() {
    const params = this.getParams();

    if (params.stats) {
      this._stats = new Stats();

      if (params.stats === 'fps')
        this._stats.setMode(0);

      else if (params.stats === 'ms')
        this._stats.setMode(1);

      else if (params.stats === 'mb')
        this._stats.setMode(1);

      else {
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
  _initCamera() {
    const params = this.getParams();

    this.setCamera(new PerspectiveCamera({
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
  _initRenderer() {
    this.render = true;

    // Renderer.
    this.setRenderer(new THREE.WebGLRenderer(this.getParams().renderer));

    const renderer = this.getRenderer();
    renderer.setClearColor(this.getParams().background.color, this.getParams().background.opacity);

    // Shadowmap.
    renderer.shadowMap.enabled = this.getParams().shadowmap.enabled;
    renderer.shadowMap.type = this.getParams().shadowmap.type;
    renderer.shadowMap.cascade = true;

    renderer.setSize(
      Number(this.getParams().width * this.getParams().rWidth).toFixed(),
      Number(this.getParams().height * this.getParams().rHeight).toFixed()
    );

    renderer.render(this.getScene(), this.getCamera().getNative());

    this._dom.appendChild(renderer.domElement);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
  }

  /**
   * Add helpers to scene.
   */
  _initHelpers() {
    const params = this.getParams(),
      scene = this.getScene();

    if (params.helpers.axis) {
      scene.add(
        new THREE.AxisHelper(
          params.helpers.axis.size
          ? params.helpers.axis.size
          : 5
        )
      );
    }

    if (params.helpers.grid) {
      scene.add(
        new THREE.GridHelper(
          params.helpers.grid.size
          ? params.helpers.grid.size
          : 10,
          params.helpers.grid.step
          ? params.helpers.grid.step
          : 1
        )
      );
    }
  }

  /**
   * Start animation.
   */
  start() {
    const clock = new THREE.Clock(),
      _scope = this,
      scene = _scope.getScene(),
      cameraNative = _scope.getCamera().getNative(),
      renderer = _scope.getRenderer();

    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

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
  _execLoops(time) {
    for (let i = 0; i < this.loops.length; i++) {
      const e = this.loops[i];
      if (e.enabled) e.execute(e.clock, time);
    }
  }

  /**
   * Update controls time values.
   */
  _updateControls() {
    this.controls.update(Date.now() - this.time);
    this.time = Date.now();
  }

  /**
   * Update morphs animations.
   *
   * @params {THREE.Clock} clock - The clock object, which.
   */
  _process(delta) {
    for (let i = 0; i < this.children.length; i++)
      if (this.children[i]._type === 'morph') this.children[i].getNative().mixer.update(delta);
  }

  /**
   * This functon will scene properties when it's called.
   */
  setSize(width = 1, height = 1) {
    this.getCamera().getNative().aspect = width / height;
    this.getCamera().getNative().updateProjectionMatrix();

    this.getRenderer().setSize(
      Number(width * this.getParams().rWidth).toFixed(),
      Number(height * this.getParams().rHeight).toFixed()
    );
  }

  setScene(scene, import_three = true) {
    this.scene = scene;

    if (import_three) {
      this.children = [];

      const moveChildren = (object) => {
        for (let i = 0, max = object.children.length; i < max; i++) {
          const obj3D = object.children[i];
          let WHSobj;

          if (obj3D instanceof THREE.Light) WHSobj = new Light(obj3D);
          else WHSobj = new Shape(obj3D);

          WHSobj.addTo(this);

          if (obj3D.children.length) moveChildren(obj3D, WHSobj);
        }
      }

      moveChildren(scene, this);
    }

    return this.scene;
  }

  getScene() {
    return this.scene;
  }

  setRenderer(renderer) {
    this.renderer = renderer;
    return this.renderer;
  }

  getRenderer() {
    return this.renderer;
  }

  setControls(controls) {
    const recieved = controls(this);

    this.controls = recieved instanceof Array ? recieved[0] : recieved;

    if (
      recieved instanceof Array
      && typeof recieved[1] === 'function'
    ) recieved[1](this);

    return this.controls;
  }

  /**
   * Set a camera for rendering world.
   *
   * @params {WHS.Camera} camera - The camera to be rendered.
   */
  setCamera(camera) {
    if (camera instanceof Camera)
      this.camera = camera;
    else
      console.error('@WHS.World: camera in not an instance of WHS.Camera.');
  }

  getCamera() {
    return this.camera;
  }

  /**
   * Remove this shape from world.
   *
   * @return {WHS.Shape} - this.
   */
  remove(source) {
    this.getScene().remove(source.getNative());

    this.children.splice(this.children.indexOf(source), 1);
    source.parent = null;

    source.emit('remove');

    if (WHS.debug) {
      console.debug(
        `@WHS.Shape: Shape ${source._type} was removed from world`,
        [source]
      );
    }

    return this;
  }
}

export {
  World
};

