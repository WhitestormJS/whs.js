import {
  Mesh,
  PlaneBufferGeometry,
  PlaneGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Plane extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      width: 10,
      height: 10,
      widthSegments: 1,
      heightSegments: 1
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['width', 'height', 'wSegments', 'hSegments']
  };

  constructor(params = {}) {
    super(params, Plane.defaults, Plane.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = this.params) {
    let {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer || params.softbody ? PlaneBufferGeometry : PlaneGeometry;

    const geometry = new GConstruct(
      params.geometry.width,
      params.geometry.height,
      params.geometry.wSegments,
      params.geometry.hSegments
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

  set g_segments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {segments: val}}));
  }

  get g_segments() {
    return this._native.geometry.parameters.segments;
  }

  clone() {
    return new Plane({build: false}).copy(this);
  }
}

export {
  Plane
};
