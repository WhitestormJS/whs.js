import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Polyhedron extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'polyhedron');

    WHS.API.extend(params.geometry, {

      verticesOfCube: this.verticesOfCube,
      indicesOfFaces: this.indicesOfFaces,
      radius: 6,
      detail: 2

    });

    this.build(params);

    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.PolyhedronGeometry(

          params.geometry.verticesOfCube,
          params.geometry.indicesOfFaces,
          params.geometry.radius,
          params.geometry.detail

        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  get verticesOfCube() {
    return [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
      -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1
    ];
  }

  get indicesOfFaces() {
    return [
      2, 1, 0, 0, 3, 2,
      0, 4, 7, 7, 3, 0,
      0, 1, 5, 5, 4, 0,
      1, 2, 6, 6, 5, 1,
      2, 3, 7, 7, 6, 2,
      4, 5, 6, 6, 7, 4
    ];
  }

  clone() {
    return new WHS.Polyhedron(this.getParams(), this._type).copy(this);
  }
}

export {
  Polyhedron as default
};
