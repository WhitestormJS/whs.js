import {
  Mesh,
  TorusBufferGeometry,
  TorusGeometry
} from 'three';



import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

class Torus extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 100,
      tube: 40,
      radialSegments: 8,
      tubularSegments: 6,
      arc: Math.PI * 2
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: [
      'radius',
      'tube',
      'radialSegments',
      'tubularSegments',
      'arc'
    ]
  };

  constructor(params = {}) {
    super(params, Torus.defaults, Torus.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? TorusBufferGeometry : TorusGeometry;

    return new TorusGeometry(
      params.geometry.radius,
      params.geometry.tube,
      params.geometry.radialSegments,
      params.geometry.tubularSegments,
      params.geometry.arc
    );
  }

  set g_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get g_radius() {
    return this._native.geometry.parameters.radius;
  }

  set g_tube(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {tube: val}}));
  }

  get g_tube() {
    return this._native.geometry.parameters.tube;
  }

  set g_radialSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radialSegments: val}}));
  }

  get g_radialSegments() {
    return this._native.geometry.parameters.radialSegments;
  }

  set g_tubularSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {tubularSegments: val}}));
  }

  get g_tubularSegments() {
    return this._native.geometry.parameters.tubularSegments;
  }

  set g_arc(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {arc: val}}));
  }

  get g_arc() {
    return this._native.geometry.parameters.arc;
  }

  clone() {
    return new Torus({build: false}).copy(this);
  }
}

export {
  Torus
};
