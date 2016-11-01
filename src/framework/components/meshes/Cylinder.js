import {
  Mesh,
  CylinderBufferGeometry,
  CylinderGeometry
} from 'three';

import {CylinderMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Cylinder extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      radiusTop: 0,
      radiusBottom: 1,
      height: 1,
      radiusSegments: 32,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: Math.PI * 2
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: [
      'radiusTop',
      'radiusBottom',
      'height',
      'radiusSegments',
      'heightSegments',
      'openEnded',
      'thetaStart',
      'thetaLength'
    ]
  };

  constructor(params = {}) {
    super(params, Cylinder.defaults, Cylinder.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let MeshNative;

    if (this.physics && this.params.softbody) MeshNative = SoftMesh;
    else if (this.physics) MeshNative = CylinderMesh;
    else MeshNative = Mesh;

    return new Promise((resolve) => {
      this.native = new MeshNative(
        this.buildGeometry(params),
        material,
        this.params
      );

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? CylinderBufferGeometry : CylinderGeometry;

    const geometry = new GConstruct(
      params.geometry.radiusTop,
      params.geometry.radiusBottom,
      params.geometry.height,
      params.geometry.radiusSegments,
      params.geometry.heightSegments,
      params.geometry.openEnded,
      params.geometry.thetaStart,
      params.geometry.thetaLength
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }

  set G_radiusTop(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusTop: val}}));
  }

  get G_radiusTop() {
    return this._native.geometry.parameters.radiusTop;
  }

  set G_radiusBottom(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusBottom: val}}));
  }

  get G_radiusBottom() {
    return this._native.geometry.parameters.radiusBottom;
  }

  set G_height(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get G_height() {
    return this._native.geometry.parameters.height;
  }

  set G_radiusSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusSegments: val}}));
  }

  get G_radiusSegments() {
    return this._native.geometry.parameters.radiusSegments;
  }

  clone() {
    return new Cylinder({build: false}).copy(this);
  }
}

export {
  Cylinder
};
