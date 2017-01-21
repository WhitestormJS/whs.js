import {
  Mesh,
  LineCurve3,
  Vector3,
  TubeBufferGeometry,
  TubeGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

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

  set g_path(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {path: val}}));
  }

  get g_path() {
    return this._native.geometry.parameters.path;
  }

  set g_segments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {segments: val}}));
  }

  get g_segments() {
    return this._native.geometry.parameters.segments;
  }

  set g_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get g_radius() {
    return this._native.geometry.parameters.radius;
  }

  set g_radiusSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusSegments: val}}));
  }

  get g_radiusSegments() {
    return this._native.geometry.parameters.radiusSegments;
  }

  set g_closed(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {closed: val}}));
  }

  get g_closed() {
    return this._native.geometry.parameters.closed;
  }
}

export {
  Tube
};
