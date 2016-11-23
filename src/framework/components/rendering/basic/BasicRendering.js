import * as THREE from 'three';

import { RenderingPlugin } from '../RenderingPlugin';

class BasicRendering extends RenderingPlugin {
  constructor(params = {}) {
    super(params);
    return (world) => {
      this.world = world;
      return this;
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

    this.setSize(this.params.width, this.params.height);
  }

  renderPlugin(delta) {
    const _scene = this.world.$scene;
    const _cameraNative = this.world.$camera.native;

    this.renderer.render(_scene, _cameraNative);
  }

  setSize(width, height) {
    if (this.renderer) this.renderer.setSize(width, height);
  }

  // static creator(params) {
  //   return (params) => {
  //     return new BasicRendering(params); }
  // }
}

export {
  BasicRendering
};
