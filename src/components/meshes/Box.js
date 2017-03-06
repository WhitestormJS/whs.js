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
      depth: 1,
      widthSegments: 1,
      heightSegments: 1,
      depthSegements: 1
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['width', 'height', 'depth', 'widthSegments', 'heightSegments', 'depthSegements']
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
      params.geometry.depth,
      params.geometry.widthSegments,
      params.geometry.heightSegments,
      params.geometry.depthSegments
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }
}

export {
  Box
};
