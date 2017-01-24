import {
  Mesh,
  LineCurve3,
  Vector3,
  TubeBufferGeometry,
  TubeGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Tube extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      path: new LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, 1)),
      segments: 20,
      radius: 2,
      radiusSegments: 8,
      closed: false
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: [
      'path',
      'segments',
      'radius',
      'radiusSegments',
      'closed'
    ]
  };

  constructor(params = {}) {
    super(params, Tube.defaults, Tube.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? TubeBufferGeometry : TubeGeometry;

    const geometry = new GConstruct(
      params.geometry.path,
      params.geometry.segments,
      params.geometry.radius,
      params.geometry.radiusSegments,
      params.geometry.closed
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }
}

export {
  Tube
};
