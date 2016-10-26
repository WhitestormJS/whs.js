import * as THREE from 'three';

import {loadMaterial, extend} from '../../utils/index';
import {RopeMesh} from '../../physics/index.js';
import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Line extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      curve: false,
      points: 50
    }
  }

  constructor(params) {
    super(params, Line.defaults, Line.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics) Mesh = RopeMesh;
    else Mesh = THREE.Line;

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
    const geometry = params.buffer || params.physics ? new THREE.BufferGeometry() : new THREE.Geometry();

    if (params.buffer || params.physics) {
      const pp = params.geometry.curve.getPoints(params.geometry.points);
      const verts = new Float32Array(pp.length * 3);

      for (let i = 0, max = pp.length; i < max; i++) {
        verts[i * 3] = pp[i].x;
        verts[i * 3 + 1] = pp[i].y;
        verts[i * 3 + 2] = pp[i].z;
      }

      geometry.addAttribute('position', new THREE.BufferAttribute(verts, 3));
    } else geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }
}

export {
  Line
};
