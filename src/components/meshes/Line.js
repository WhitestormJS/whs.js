import {
  Line as LineNative,
  BufferGeometry,
  Geometry,
  BufferAttribute
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Line extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      curve: false,
      points: 50
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['curve', 'points']
  };

  constructor(params) {
    super(params, Line.defaults, Line.instructions);
  }

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new LineNative(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const geometry = params.buffer ? new BufferGeometry() : new Geometry();

    if (params.buffer) {
      const pp = params.geometry.curve.getPoints(params.geometry.points);
      const verts = new Float32Array(pp.length * 3);

      for (let i = 0, max = pp.length; i < max; i++) {
        verts[i * 3] = pp[i].x;
        verts[i * 3 + 1] = pp[i].y;
        verts[i * 3 + 2] = pp[i].z;
      }

      geometry.addAttribute('position', new BufferAttribute(verts, 3));
    } else geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

    return geometry;
  }
}

export {
  Line
};
