import {
  Mesh,
  CylinderBufferGeometry,
  CylinderGeometry
} from 'three';



import {MeshComponent} from '../../core/MeshComponent';

class Cylinder extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
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
    ...MeshComponent.instructions,
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

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
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

  set g_radiusTop(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusTop: val}}));
  }

  get g_radiusTop() {
    return this._native.geometry.parameters.radiusTop;
  }

  set g_radiusBottom(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusBottom: val}}));
  }

  get g_radiusBottom() {
    return this._native.geometry.parameters.radiusBottom;
  }

  set g_height(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get g_height() {
    return this._native.geometry.parameters.height;
  }

  set g_radiusSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusSegments: val}}));
  }

  get g_radiusSegments() {
    return this._native.geometry.parameters.radiusSegments;
  }
}

export {
  Cylinder
};
