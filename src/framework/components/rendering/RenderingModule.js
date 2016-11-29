import * as THREE from 'three';
import Stats from 'stats.js';

import { Component } from '../../core/Component';

class RenderingModule extends Component {
  static defaults = {
    rendering: {
      background: {
        color: 0x000000,
        opacity: 1
      },

      shadowmap: {
        enabled: true,
        type: THREE.PCFSoftShadowMap
      },

      renderer: {}
    }
  }

  constructor(params = {}) {
    super(params, RenderingModule.defaults, RenderingModule.instructions);

    this.build(params);
    super.wrap();
  }

  get world() {
    return this._world;
  }

  set world(world) {
    const params = this.params;

    this._world = world;
    this.attachToCanvas();

    if (params.modules && params.modules.stats) this.make$stats();

    this.emit('worldchange');
  }

  attachToCanvas() {
    if (this.world) {
      // TODO: detach from dom
    }

    const canvas = this.$renderer.domElement;
    this.world.$canvas = canvas;

    // attach to new parent world dom
    this.world.$element.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }

  make$stats() {
    const statsData = this.params.stats;

    if (statsData) {
      const stats = new Stats();
      this.$stats = stats;

      if (statsData === 'fps') stats.setMode(0);
      else if (statsData === 'ms') stats.setMode(1);
      else if (statsData === 'mb') stats.setMode(1);
      else stats.setMode(0);

      const stStyle = stats.domElement.style;

      stStyle.position = 'absolute';
      stStyle.left = '0px';
      stStyle.top = '0px';

      this.world.$element.appendChild(stats.domElement);
    }
  }

  build(params = {}) {
    throw new Error('Build method has to be re-implemented in each rendering module (use it to initialize your rendering module!)');
  }

  renderModule(scene, camera, delta) {
    throw new Error('renderModule method has to be re-implemented in each rendering module (or else your module won\'t do anything!)');
  }

  setSize(width, height) {
    throw new Error('setSize method has to be re-implemented in each rendering module (or else your module won\'t resize!)');
  }

  start(onStartRendering, onFinishRendering) {
    this.clock = new THREE.Clock();

    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    this.onStartRendering = onStartRendering;
    this.onFinishRendering = onFinishRendering;
    if (this.world.render) this.render(this.world.$scene, this.world.$camera.native);
  }

  render(cachedScene, cachedCamera) {
    const scene = cachedScene;
    const camera = cachedCamera;
    const clock = this.clock;
    const stats = this.$stats;

    const onStartRendering = this.onStartRendering;
    const onFinishRendering = this.onFinishRendering;

    function render() {
      window.requestAnimFrame(render.bind(this));

      const delta = clock.getDelta();

      // Init stats.
      if (stats) stats.begin();
      if (onStartRendering) onStartRendering(delta);

      this.renderModule(scene, camera, delta);

      if (onFinishRendering) onFinishRendering(delta);

      // End helper.
      if (stats) stats.end();
    }

    (render.bind(this))();
  }
}

export {
  RenderingModule
};
