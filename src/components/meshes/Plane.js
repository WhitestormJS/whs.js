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
    const {geometry, material} = this.applyBridge({
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
}

export {
  Plane
};
