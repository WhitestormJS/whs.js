import {
  Mesh,
  SphereBufferGeometry,
  SphereGeometry
} from 'three';



import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

@MeshComponent
class Sphere extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      radius: 1,
      widthSegments: 8,
      heightSegments: 6
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['radius', 'widthSegments', 'heightSegments']
  };

  constructor(params = {}) {
    super(params, Sphere.defaults, Sphere.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? SphereBufferGeometry : SphereGeometry;

    const geometry = new GConstruct(
      params.geometry.radius,
      params.geometry.widthSegments,
      params.geometry.heightSegments
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }

  set g_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get g_radius() {
    return this._native.geometry.parameters.radius;
  }

  set g_widthSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {widthSegments: val}}));
  }

  get g_widthSegments() {
    return this._native.geometry.parameters.widthSegments;
  }

  set g_heightSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {widthSegments: val}}));
  }

  get g_heightSegments() {
    return this._native.geometry.parameters.widthSegments;
  }

  clone() {
    return this.params.softbody ? new Sphere(this.params) : new Sphere({build: false}).copy(this);
  }
}

export {
  Sphere
};
