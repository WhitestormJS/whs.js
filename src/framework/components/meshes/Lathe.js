import {
  Mesh,
  LatheBufferGeometry,
  LatheGeometry
} from 'three';



import {Component} from '../../core/Component';
import {loadMaterial} from '../../utils/index';
import {MeshComponent} from '../../core/MeshComponent';

@MeshComponent
class Lathe extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      points: []
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['points']
  };

  constructor(params = {}) {
    super(params, Lathe.defaults, Lathe.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? LatheBufferGeometry : LatheGeometry;

    return new GConstruct(
      params.geometry.points
    );
  }

  set g_points(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {points: val}}));
  }

  get g_points() {
    return this._native.geometry.parameters.points;
  }

  clone() {
    return new Lathe({build: false}).copy(this);
  }
}

export {
  Lathe
};
