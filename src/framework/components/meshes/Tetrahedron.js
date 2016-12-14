import {
  Mesh,
  TetrahedronBufferGeometry,
  TetrahedronGeometry
} from 'three';



import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

@MeshComponent
class Tetrahedron extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      radius: 1,
      detail: 0
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['radius', 'detail']
  };

  constructor(params = {}) {
    super(params, Tetrahedron.defaults, Tetrahedron.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? TetrahedronBufferGeometry : TetrahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }

  set g_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get g_radius() {
    return this._native.geometry.parameters.radius;
  }

  set g_detail(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {detail: val}}));
  }

  get g_detail() {
    return this._native.geometry.parameters.detail;
  }

  clone() {
    return new Tetrahedron({build: false}).copy(this);
  }
}

export {
  Tetrahedron
};
