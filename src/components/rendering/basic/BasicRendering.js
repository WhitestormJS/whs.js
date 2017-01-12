import * as THREE from 'three';

import {Renderer} from '../Renderer';

class BasicRendering extends Renderer {
  constructor(params = {}) {
    super(params);

    // Renderer.
    this.$renderer = new THREE.WebGLRenderer(this.params.renderer);

    const renderer = this.$renderer;

    renderer.setClearColor(
      this.params.background.color,
      this.params.background.opacity
    );

    // Shadowmap.
    renderer.shadowMap.enabled = this.params.shadowmap.enabled;
    renderer.shadowMap.type = this.params.shadowmap.type;
    renderer.shadowMap.cascade = true;

    this.setSize(this.params.width, this.params.height);
  }

  renderModule(scene, camera, delta) {
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
