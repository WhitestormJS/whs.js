import {
  Mesh,
  ExtrudeBufferGeometry,
  ExtrudeGeometry
} from 'three';



import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

@MeshComponent
class Extrude extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      shapes: [],
      options: {}
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['shapes', 'options']
  };

  constructor(params = {}) {
    super(params, Extrude.defaults, Extrude.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = this.params) {
    return new Promise((resolve) => {
      let {geometry, material} = this.applyBridge({
        geometry: this.buildGeometry(params),
        material: loadMaterial(params.material)
      });

      this.native = new Mesh(
        geometry,
        material
      );

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? ExtrudeBufferGeometry : ExtrudeGeometry;

    return new GConstruct(
      params.geometry.shapes,
      params.geometry.options
    );
  }

  set g_shapes(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {shapes: val}}));
  }

  get g_shapes() {
    return this._native.geometry.parameters.shapes;
  }

  set g_options(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {options: val}}));
  }

  get g_options() {
    return this._native.geometry.parameters.options;
  }

  clone() {
    return new Extrude({build: false}).copy(this);
  }
}

export {
  Extrude
};
