  import {
  Mesh,
  RingGeometry,
  RingBufferGeometry
} from 'three';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial} from '../../utils/index';

@MeshComponent
class Ring extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      innerRadius: 0,
      outerRadius: 50,
      thetaSegments: 8,
      phiSegments: 8,
      thetaStart: 0,
      thetaLength: Math.PI * 2
    }
  };

  static defaults = {
    ...Component.defaults,
    geometry: [
      'innerRadius',
      'outerRadius',
      'thetaSegments',
      'phiSegments',
      'thetaStart',
      'thetaLength'
    ]
  };

  constructor(params = {}) {
    super(params, Ring.defaults, Ring.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    return new Promise((resolve) => {
      this.native = new Mesh(
        new RingGeometry(
          params.geometry.innerRadius,
          params.geometry.outerRadius,
          params.geometry.thetaSegments,
          params.geometry.phiSegments,
          params.geometry.thetaStart,
          params.geometry.thetaLength
        ),

        material
      );

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? RingBufferGeometry : RingGeometry;

    return new GConstruct(
      params.geometry.innerRadius,
      params.geometry.outerRadius,
      params.geometry.thetaSegments,
      params.geometry.phiSegments,
      params.geometry.thetaStart,
      params.geometry.thetaLength
    );
  }

  set g_innerRadius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {innerRadius: val}}));
  }

  get g_innerRadius() {
    return this._native.geometry.parameters.innerRadius;
  }

  set g_outerRadius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {outerRadius: val}}));
  }

  get g_outerRadius() {
    return this._native.geometry.parameters.outerRadius;
  }

  set g_thetaSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {thetaSegments: val}}));
  }

  get g_thetaSegments() {
    return this._native.geometry.parameters.thetaSegments;
  }

  set g_phiSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {phiSegments: val}}));
  }

  get g_phiSegments() {
    return this._native.geometry.parameters.phiSegments;
  }

  set g_thetaStart(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {thetaStart: val}}));
  }

  get g_thetaStart() {
    return this._native.geometry.parameters.thetaStart;
  }

  set g_thetaLength(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {thetaLength: val}}));
  }

  get g_thetaLength() {
    return this._native.geometry.parameters.thetaLength;
  }

  clone() {
    return new Ring({build: false}).copy(this);
  }
}

export {
  Ring
};
