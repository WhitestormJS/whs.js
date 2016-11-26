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
    const renderParams = this.params.rendering;

    // Renderer.
    this.$renderer = new THREE.WebGLRenderer(renderParams.renderer);

    const renderer = this.$renderer;

    renderer.setClearColor(
      renderParams.background.color,
      renderParams.background.opacity
    );

    // Shadowmap.
    renderer.shadowMap.enabled = renderParams.shadowmap.enabled;
    renderer.shadowMap.type = renderParams.shadowmap.type;
    renderer.shadowMap.cascade = true;

    this.setSize(this.params.width, this.params.height);
  }

  renderPlugin(scene, camera, delta) {
    this.$renderer.render(scene, camera);
  }

  setSize(width, height) {
    if (this.$renderer) this.$renderer.setSize(width, height);
  }

  // static creator(params) {
  //   return (params) => {
  //     return new BasicRendering(params); }
  // }
}

export {
  BasicRendering
};
