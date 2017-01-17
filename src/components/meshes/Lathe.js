import {
  Mesh,
  LatheBufferGeometry,
  LatheGeometry
} from 'three';



import {MeshComponent} from '../../core/MeshComponent';

class Lathe extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      points: []
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
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
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
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
