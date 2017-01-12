import {
  PCFSoftShadowMap
} from 'three';

import {Loop} from '../../extras/Loop';

export class PostProcessingModule {
  constructor(params = {}) {
    this.params = Object.assign({
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
      toScreen: true
    }, params);

    this.renderer = new THREE.WebGLRenderer(this.params.renderer);

    this.renderer.setClearColor(
      this.params.background.color,
      this.params.background.opacity
    );

    // Shadowmap.
    this.renderer.shadowMap.enabled = this.params.shadowmap.enabled;
    this.renderer.shadowMap.type = this.params.shadowmap.type;
    this.renderer.shadowMap.cascade = true;

    this.setSize(this.params.width, this.params.height);
  }
}
