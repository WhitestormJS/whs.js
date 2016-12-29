import {
  PCFSoftShadowMap,
  // Scene,
  Vector3,
  // Fog,
  // FogExp2,
  AxisHelper,
  GridHelper
} from 'three';

import { addResizeListener } from 'detect-element-resize';

import { extend } from '../utils/index';
// import { PerspectiveCamera } from '../components/cameras/PerspectiveCamera';
// import { BasicRendering } from '../components/rendering/basic/BasicRendering';
import { Component } from './Component';

class App extends Component {
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
        type: PCFSoftShadowMap
      },

      background: {
        color: 0x000000,
        opacity: 1
      },

      renderer: {}
    },

    camera: {
      fov: 75,
      near: 1,
      far: 1000,

      position: {
        x: 0,
        y: 0,
        z: 0
      }
    },

    width: window.innerWidth,
    height: window.innerHeight,
    container: window.document.body,

    resolution: {
      width: 1,
      height: 1
    },

    physics: {
      create: false,
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

    modules: []
  };

  static instructions = {
    camera: {
      position: ['x', 'y', 'z']
    },

    gravity: ['x', 'y', 'z']
  };

  static helpers = {
    axis: [AxisHelper, {
      size: 5
    }, ['size']],

    grid: [GridHelper, {
      size: 10,
      step: 1,
      color1: 0xffffff,
      color2: 0xffffff
    }, ['size', 'step', 'color1', 'color2']]
  };

  simulate = false;
  render = true;
  loops = [];

  constructor(params = {}) {
    super(params, App.defaults, App.instructions);

    for (let i = 0, max = this.params.modules.length; i < max; i++) {
      this.params.modules[i].integrate.bind(this)();
    }

    if (params.autoresize) {
      const container = params.container;

      const resizeCallback = () => {
        // FIXME: Am I crazy or offsetHeight is increasing even when we downsize the window ?
        // console.log('height offset : ', params.container.offsetHeight);

        this.setSize(
          Number(container.offsetWidth * params.resolution.width).toFixed(),
          Number(container.offsetHeight * params.resolution.height).toFixed()
        );

        this.emit('resize');
      }

      if (params.autoresize === 'window') window.addEventListener('resize', resizeCallback);
      else {
        if (params.autoresize.delay) {
          let resize = true;

          addResizeListener(container, () => {
            window.clearTimeout(resize);
            resize = window.setTimeout(resizeCallback, params.autoresize.delay);
          });
        }
        else addResizeListener(container, resizeCallback);
      }
    }
  }

  /**
   * Start animation.
   */
  start() {
    if (this.$rendering) this.$rendering.start(this.beforeRender.bind(this), this.afterRender.bind(this));
  }

  /**
   * Callback called immediately before Plugin Rendering.
   * @param  {Number} delta : delta time elapsed since the last frame.
   */
  beforeRender(delta) {
    for (let i = 0; i < this.children.length; i++)
      if (this.children[i].type === 'morph') this.children[i].native.mixer.update(delta);

    if (this.controls) {
      this.controls.update(Date.now() - this.time);
      this.time = Date.now();
    };

    if (this.simulate) this.$scene.simulate(delta, 1);
  }

  /**
   * Callback called immediately after the Plugin Rendering.
   * @param  {Number} delta : delta time elapsed since the last frame (will be equal to beforeRender delta).
   */
  afterRender(delta) {
    for (let i = 0; i < this.loops.length; i++) {
      const e = this.loops[i];
      if (e.enabled) e.execute(e.clock);
    }
  }

  /**
   * Retrieve the renderer used by the active rendering plugin.
   * @return {THREE.WebGLRenderer} The WebGLRenderer used by the current rendering plugin.
   */
  get renderer() {
    if (this.$rendering) return this.$rendering.$renderer;
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

  addHelper(name, params = {}, helpers = App.helpers) {
    super.addHelper(name, params, helpers);
  }

  addConstraint(constraint) {
    this.$scene.addConstraint(constraint);
  }

  /**
   * This functon will scene properties when it's called.
   */
  setSize(width = 1, height = 1) {
    this.$camera.native.aspect = width / height;
    this.$camera.native.updateProjectionMatrix();

    if (this.$rendering) {
      this.$rendering.setSize(width, height);
    }
  }

  importScene(scene, nested = true) {
    this.$scene = scene;

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

    return this.$scene;
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
  App
};

