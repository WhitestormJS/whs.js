import {
  Mesh,
  TorusBufferGeometry,
  TorusGeometry
} from 'three';



import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

@MeshComponent
class Torus extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      radius: 100,
      tube: 40,
      radialSegments: 8,
      tubularSegments: 6,
      arc: Math.PI * 2
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...Component.instructions,
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
    const material = loadMaterial(params.material);

    return new Promise((resolve) => {
      this.native = this.isPhysics ?
        params.physics.create.bind(this)(params, material)
        : new Mesh(
          this.buildGeometry(params),
          material
        );

      resolve();
    });
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
