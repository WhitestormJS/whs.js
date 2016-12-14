import {
  Mesh,
  BoxBufferGeometry,
  BoxGeometry
} from 'three';



import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

@MeshComponent
class Box extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      width: 1,
      height: 1,
      depth: 1
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['width', 'height', 'depth']
  };

  constructor(params = {}) {
    super(params, Box.defaults, Box.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? BoxBufferGeometry : BoxGeometry;

    const geometry = new GConstruct(
      params.geometry.width,
      params.geometry.height,
      params.geometry.depth
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }

  set g_width(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {width: val}}));
  }

  get g_width() {
    return this._native.geometry.parameters.width;
  }

  set g_height(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get g_height() {
    return this._native.geometry.parameters.height;
  }

  set g_depth(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {depth: val}}));
  }

  get g_depth() {
    return this._native.geometry.parameters.depth;
  }

  // clone() {
  //   return this.params.softbody ? new Box(this.params) : new Box({build: false}).copy(this);
  // }
}

export {
  Box
};
