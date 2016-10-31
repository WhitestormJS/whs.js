import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {extend} from '../utils/index';
import {PerspectiveCamera} from '../components/cameras/PerspectiveCamera';
import {BasicRendering} from '../components/rendering/basic/BasicRendering';
import {Component} from './Component';

class World extends Component {
  static defaults = {
    stats: false,
    autoresize: false,
    softbody: false,

    helpers: {
      grid: false,
      axis: false
    },

    gravity: {
      x: 0,
      y: 0,
      z: 0
    },

    rendering: {
      shadowmap: {
        enabled: true,
        type: THREE.PCFSoftShadowMap
      },

      background: {
        color: 0x000000,
        opacity: 1
      },

      renderer: {}
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

    physics: {
      fixedTimeStep: 1 / 60,
      broadphase: {type: 'dynamic'}
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
      stats: true,
      camera: true,
      helpers: true,
      rendering: true
    }
  };

  simulate = false;
  loops = [];
  type = 'world';

  constructor(params = {}) {
    super();

    World.defaults.width = window.innerWidth;
    World.defaults.height = window.innerHeight;
    World.defaults.container = window.document.body;

    this.params = extend(params, World.defaults);

    const _params = this.params,
      _initParams = _params.init;

    // INIT.
    this._initDOM(window);
    if (_initParams.scene) this._initScene();

    if (_initParams.scene && _initParams.camera) this._initCamera(window);
    if (_initParams.scene && _initParams.rendering) this._initRendering();
    if (_initParams.scene && _initParams.helpers) this._initHelpers();

    // NOTE: ==================== Autoresize. ======================

    if (_params.autoresize === 'window') {
      window.addEventListener('resize', () => {
        this.setSize(
          Number(window.innerWidth * _params.rWidth).toFixed(),
          Number(window.innerHeight * _params.rHeight).toFixed()
        );

        this.emit('resize');
      });
    } else if (_params.autoresize) {
      window.addEventListener('resize', () => {
        // FIXME: Am I crazy or offsetHeight is increasing even when we downsize the window ?
        // console.log('height offset : ', _params.container.offsetHeight);
        this.setSize(
          Number(_params.container.offsetWidth * _params.rWidth).toFixed(),
          Number(_params.container.offsetHeight * _params.rHeight).toFixed()
        );

        this.emit('resize');
      });
    }
  }

  _initScene() {
    const params = this.params,
      scene = Physijs.default !== false
      ? new Physijs.Scene(
        {
          fixedTimeStep: params.physics.fixedTimeStep,
          broadphase: params.physics.broadphase
        },
        {
          stats: params.stats,
          world: this,
          softbody: params.softbody
        }
      ) : new THREE.Scene();

    if (Physijs.default !== false) {
      scene.setGravity(
        new THREE.Vector3(
          params.gravity.x,
          params.gravity.y,
          params.gravity.z
        )
      );

      scene.simulate();
      this.simulate = true;
    }

    if (params.fog.type === 'regular')
      scene.fog = new THREE.Fog(params.fog.hex, params.fog.near, params.fog.far);
    else if (params.fog.type === 'exp'
      || params.fog.type === 'expodential')
      scene.fog = new THREE.FogExp2(params.fog.hex, params.fog.density);

    this.importScene(scene, false);

    // Array for processing.
    this.children = [];
  }

  addLoop(loop) {
    return new Promise((resolve) => {
      this.loops.push(loop);
      resolve(loop);
    });
  }

  removeLoop(loop) {
    return new Promise((resolve) => {
      this.loops.filter((l) => l !== loop);
      resolve(loop);
    });
  }

  _initDOM() {
    const params = this.params;

    params.container.style.margin = 0;
    params.container.style.padding = 0;
    params.container.style.position = 'relative';
    params.container.style.overflow = 'hidden';

    this._dom = window.document.createElement('div');
    this._dom.className = 'whs';

    params.container.appendChild(this._dom);

    return this._dom;
  }

  _initCamera() {
    const _params = this.params;

    this.camera = new PerspectiveCamera({
      camera: {
        fov: _params.camera.aspect,
        aspect: _params.width / _params.height,
        near: _params.camera.near,
        far: _params.camera.far
      },

      position: {
        x: _params.camera.x,
        y: _params.camera.y,
        z: _params.camera.z
      }
    });

    this.camera.addTo(this);
  }

  _initRendering() {
    const _params = this.params;
    const computedWidth = Number(_params.width * _params.rWidth).toFixed();
    const computedHeight = Number(_params.height * _params.rHeight).toFixed();

    this.renderingPlugin = new BasicRendering({
      width: computedWidth,
      height: computedHeight,

      stats: _params.stats,
      init: {
        stats: _params.init.stats
      },

      background: {
        color: _params.rendering.background.color,
        opacity: _params.rendering.background.opacity
      },

      shadowmap: {
        enabled: _params.rendering.shadowmap.enabled,
        type: _params.rendering.shadowmap.type
      },

      renderer: _params.rendering.renderer
    });
  }

  _initHelpers() {
    const _params = this.params,
      _scene = this.scene;

    if (_params.helpers.axis) {
      _scene.add(
        new THREE.AxisHelper(
          _params.helpers.axis.size
          ? _params.helpers.axis.size
          : 5
        )
      );
    }

    if (_params.helpers.grid) {
      _scene.add(
        new THREE.GridHelper(
          _params.helpers.grid.size
          ? _params.helpers.grid.size
          : 10,
          _params.helpers.grid.step
          ? _params.helpers.grid.step
          : 1,
          _params.helpers.grid.color1,
          _params.helpers.grid.color2
        )
      );
    }
  }

  /**
   * Start animation.
   */
  start() {
    if (this._renderingPlugin) {
      this._renderingPlugin.start(this.onStartRendering.bind(this), this.onFinishRendering.bind(this));
    }
  }

  /**
   * Callback called immediately before Plugin Rendering.
   * @param  {Number} delta : delta time elapsed since the last frame.
   */
  onStartRendering(delta) {
    this._process(delta);
    if (this.controls) this._updateControls();
    if (this.simulate) this.scene.simulate(delta, 1);
  }

  /**
   * Callback called immediately after the Plugin Rendering.
   * @param  {Number} delta : delta time elapsed since the last frame (will be equal to onStartRendering delta).
   */
  onFinishRendering(delta) {
    this._execLoops();
  }

  /**
   * Set the current rendering plugin for this World.
   * @param  {RenderingPlugin} renderingPlugin : The RenderingPlugin instance.
   */
  set renderingPlugin(plugin) {
    this._renderingPlugin = plugin(this);
  }

  /**
   * Accesor for the currently used rendering plugin.
   * @return {RenderingPlugin} The RenderingPlugin instance.
   */
  get renderingPlugin() {
    return this._renderingPlugin;
  }

  /**
   * Retrieve the renderer used by the active rendering plugin.
   * @return {THREE.WebGLRenderer} The WebGLRenderer used by the current rendering plugin.
   */
  get renderer() {
    if (this._renderingPlugin) return this._renderingPlugin.renderer;
  }

  /**
   * Execute all loops with a specific time.
   *
   * @params {number} time - The time value that will be passed to loops.
   */
  _execLoops() {
    for (let i = 0; i < this.loops.length; i++) {
      const e = this.loops[i];
      if (e.enabled) e.execute(e.clock);
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
      if (this.children[i].type === 'morph') this.children[i].native.mixer.update(delta);
  }

  /**
   * This functon will scene properties when it's called.
   */
  setSize(width = 1, height = 1) {
    this.camera.native.aspect = width / height;
    this.camera.native.updateProjectionMatrix();

    if (this._renderingPlugin) {
      this._renderingPlugin.setSize(width, height);
    }
  }

  importScene(scene, nested = true) {
    this.scene = scene;

    if (nested) {
      this.children = [];

      const moveChildren = (object) => {
        for (let i = 0, max = object.children.length; i < max; i++) {
          const obj3D = object.children[i];
          let WHSobj;

          WHSobj = new Component(obj3D);
          WHSobj.addTo(this);

          if (obj3D.children.length) moveChildren(obj3D, WHSobj);
        }
      };

      moveChildren(scene, this);
    }

    return this.scene;
  }

  setControls(controls) {
    const recieved = controls.integrate(this);

    this.controls = recieved instanceof Array ? recieved[0] : recieved;

    if (
      recieved instanceof Array
      && typeof recieved[1] === 'function'
    ) recieved[1](this);

    return this.controls;
  }
}

export {
  World
};

