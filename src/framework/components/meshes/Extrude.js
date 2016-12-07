import {
  Mesh,
  ExtrudeBufferGeometry,
  ExtrudeGeometry
} from 'three';

import {create} from '../../physics/create/meshes/ConvexConcave';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Extrude extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      shapes: [],
      options: {}
    },

    physics: {
      create: create
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
