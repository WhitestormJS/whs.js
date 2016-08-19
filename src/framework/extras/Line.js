import * as THREE from 'three';

import {loadMaterial, extend} from './api';
import {RopeMesh} from '../physics/index.js';
import {Shape} from '../core/Shape';

class Line extends Shape {
  constructor(params) {
    super(params, 'line');

    extend(params.geometry, {
      curve: false,
      points: 50
    });

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
      this.setNative(new Mesh(
        this.buildGeometry(params),
        material,
        this.getParams()
      ));

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
