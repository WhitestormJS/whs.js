import * as THREE from 'three';
import {CylinderMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import MeshComponent from '../../core/MeshComponent';
import PhysicsComponent from '../../core/PhysicsComponent';
import SoftbodyComponent from '../../core/SoftbodyComponent';
import {extend, loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Cylinder extends Component {
  constructor(params = {}) {
    super(params, Cylinder.defaults);

    extend(params.geometry, {
      radiusTop: 0,
      radiusBottom: 1,
      height: 1,
      radiusSegments: 32,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: Math.PI * 2
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics && this.params.softbody) Mesh = SoftMesh;
    else if (this.physics) Mesh = CylinderMesh;
    else Mesh = THREE.Mesh;

    return new Promise((resolve) => {
      this.native = new Mesh(
        this.buildGeometry(params),
        material,
        this.params
      );

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? THREE.CylinderBufferGeometry : THREE.CylinderGeometry;

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
