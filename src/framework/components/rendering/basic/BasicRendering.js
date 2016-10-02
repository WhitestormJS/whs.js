import * as THREE from 'three';
import Stats from 'stats.js';

import { Component } from '../../../core/Component';
import { RenderingComponent } from '../../../core/RenderingComponent';

@RenderingComponent
class BasicRendering extends Component {
  constructor(params = {}, world) {
    super(params, BasicRendering.defaults);

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
     // Renderer.
    this.renderer = new THREE.WebGLRenderer(this.params.renderer);

    const _renderer = this.renderer;
    _renderer.setClearColor(this.params.background.color, this.params.background.opacity);

    // Shadowmap.
    _renderer.shadowMap.enabled = this.params.shadowmap.enabled;
    _renderer.shadowMap.type = this.params.shadowmap.type;
    _renderer.shadowMap.cascade = true;

    _renderer.setSize(
      Number(this.params.width * this.params.rWidth).toFixed(),
      Number(this.params.height * this.params.rHeight).toFixed()
    );

    // _renderer.render(this.scene, this.camera.native);

    this.parentWorld._dom.appendChild(_renderer.domElement);

    _renderer.domElement.style.width = '100%';
    _renderer.domElement.style.height = '100%';
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
    this.render(0);
  }

  render(time) {
    window.requestAnimFrame(this.render.bind(this));

    const delta = this.clock.getDelta();
    const _scene = this.parentWorld.scene;
    const _cameraNative = this.parentWorld.camera.native;

    // Init stats.
    if (this.stats) this.stats.begin();

    if (this.onStartRendering) this.onStartRendering(delta);

    this.renderer.render(_scene, _cameraNative);

    if (this.onFinishRendering) this.onFinishRendering(delta);

    // End helper.
    if (this.stats) this.stats.end();
  }
}

export {
  BasicRendering
};
