import {
  Mesh,
  BoxBufferGeometry,
  BoxGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Box extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      width: 1,
      height: 1,
      depth: 1
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['width', 'height', 'depth']
  };

  constructor(params = {}) {
    super(params, Box.defaults, Box.instructions);
  }

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? BoxBufferGeometry : BoxGeometry;

    const geometry = new GConstruct(
      params.geometry.width,
      params.geometry.height,
      params.geometry.depth
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }

  set g_width(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {width: val}}));
  }

  get g_width() {
    return this._native.geometry.parameters.width;
  }

  set g_height(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get g_height() {
    return this._native.geometry.parameters.height;
  }

  set g_depth(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {depth: val}}));
  }

  get g_depth() {
    return this._native.geometry.parameters.depth;
  }
}

export {
  Box
};
