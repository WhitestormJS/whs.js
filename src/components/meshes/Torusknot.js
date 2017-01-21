import {
  Mesh,
  TorusKnotBufferGeometry,
  TorusKnotGeometry
} from 'three';



import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

class Torusknot extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 100,
      tube: 40,
      radialSegments: 64,
      tubularSegments: 8,
      p: 2,
      q: 3
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: [
      'radius',
      'tube',
      'radialSegments',
      'tubularSegments',
      'p',
      'q'
    ]
  };

  constructor(params = {}) {
    super(params, Torusknot.defaults, Torusknot.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? TorusKnotBufferGeometry : TorusKnotGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.tube,
      params.geometry.radialSegments,
      params.geometry.tubularSegments,
      params.geometry.p,
      params.geometry.q
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

  set g_p(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {p: val}}));
  }

  get g_p() {
    return this._native.geometry.parameters.p;
  }

  set g_q(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {q: val}}));
  }

  get g_q() {
    return this._native.geometry.parameters.q;
  }

  set g_heightScale(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {heightScale: val}}));
  }

  get g_heightScale() {
    return this._native.geometry.parameters.heightScale;
  }
}

export {
  Torusknot
};
