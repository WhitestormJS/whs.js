import * as THREE from 'three';

import { RenderingPlugin } from '../RenderingPlugin';

class BasicRendering extends RenderingPlugin {
  constructor(params = {}, world) {
    super(params, world);
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

  renderPlugin(delta) {
    const _scene = this.parentWorld.scene;
    const _cameraNative = this.parentWorld.camera.native;

    this.renderer.render(_scene, _cameraNative);
  }
}

export {
  BasicRendering
};
