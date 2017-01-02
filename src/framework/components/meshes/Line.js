import {
  Line as LineNative,
  BufferGeometry,
  Geometry,
  BufferAttribute
} from 'three';



import {loadMaterial} from '../../utils/index';
import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';

@MeshComponent
class Line extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      curve: false,
      points: 50
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['curve', 'points']
  };

  constructor(params) {
    super(params, Line.defaults, Line.instructions);

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
    const geometry = params.buffer || params.physics ? new BufferGeometry() : new Geometry();

    if (params.buffer || params.physics) {
      const pp = params.geometry.curve.getPoints(params.geometry.points);
      const verts = new Float32Array(pp.length * 3);

      for (let i = 0, max = pp.length; i < max; i++) {
        verts[i * 3] = pp[i].x;
        verts[i * 3 + 1] = pp[i].y;
        verts[i * 3 + 2] = pp[i].z;
      }

      geometry.addAttribute('position', new BufferAttribute(verts, 3));
    } else geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }
}

export {
  Line
};
