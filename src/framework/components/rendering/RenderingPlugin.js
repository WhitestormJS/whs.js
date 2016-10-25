import * as THREE from 'three';
import Stats from 'stats.js';

import { Component } from '../../core/Component';
import { RenderingComponent } from '../../core/RenderingComponent';

@RenderingComponent
class RenderingPlugin extends Component {
  constructor(params = {}, world) {
    super(params, RenderingPlugin.defaults, RenderingPlugin.instructions);

    this.parentWorld = world;

    this.build(params);
    super.wrap();

    if (params.init.stats) this._initStats();
  }

  _initStats() {
    const params = this.params;

    if (params.stats) {
      this.stats = new Stats();

      if (params.stats === 'fps')
        this.stats.setMode(0);

      else if (params.stats === 'ms')
        this.stats.setMode(1);

      else if (params.stats === 'mb')
        this.stats.setMode(1);

      else {
        this.stats.setMode(0);
        console.warn([this.stats], 'Please, apply stats mode [fps, ms, mb] .');
      }

      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.left = '0px';
      this.stats.domElement.style.bottom = '0px';

      this.parentWorld._dom.appendChild(this.stats.domElement);
    }
  }

  build(params = {}) {
     throw new Error('Build method has to be re-implemented in each rendering plugin (use it to initialize your rendering plugin!)');
  }

  renderPlugin(delta) {
    throw new Error('renderPlugin method has to be re-implemented in each rendering plugin (or else your plugin won\'t do anything!)');
  }

  setSize(width, height) {
    throw new Error('setSize method has to be re-implemented in each rendering plugin (or else your plugin won\'t resize!)');
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
    this.render();
  }

  render() {
    window.requestAnimFrame(this.render.bind(this));

    const delta = this.clock.getDelta();

    // Init stats.
    if (this.stats) this.stats.begin();

    if (this.onStartRendering) this.onStartRendering(delta);

    this.renderPlugin();

    if (this.onFinishRendering) this.onFinishRendering(delta);

    // End helper.
    if (this.stats) this.stats.end();
  }
}

export {
  RenderingPlugin
};
