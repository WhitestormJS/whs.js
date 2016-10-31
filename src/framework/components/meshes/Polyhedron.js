import * as THREE from 'three';
import {ConvexMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';

const [verticesOfCube, indicesOfFaces] = [
  [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1
  ],
  [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    0, 1, 5, 5, 4, 0,
    1, 2, 6, 6, 5, 1,
    2, 3, 7, 7, 6, 2,
    4, 5, 6, 6, 7, 4
  ]
];

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Polyhedron extends Component {
  static verticesOfCube = verticesOfCube;
  static indicesOfFaces = indicesOfFaces;

  static defaults = {
    ...Component.defaults,
    geometry: {
      verticesOfCube: verticesOfCube,
      indicesOfFaces: indicesOfFaces,
      radius: 6,
      detail: 2
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['verticesOfCube', 'indicesOfFaces', 'radius', 'detail']
  };

  constructor(params = {}) {
    super(params, Polyhedron.defaults, Polyhedron.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics && this.params.softbody) Mesh = SoftMesh;
    else if (this.physics) Mesh = ConvexMesh;
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
    const GConstruct = params.buffer && !params.softbody ? THREE.PolyhedronBufferGeometry : THREE.PolyhedronGeometry;

    return new GConstruct(
      params.geometry.verticesOfCube,
      params.geometry.indicesOfFaces,
      params.geometry.radius,
      params.geometry.detail
    );
  }

  set G_verticesOfCube(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {verticesOfCube: val}}));
  }

  get G_verticesOfCube() {
    return this._native.geometry.parameters.verticesOfCube;
  }

  set G_indicesOfFaces(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {indicesOfFaces: val}}));
  }

  get G_indicesOfFaces() {
    return this._native.geometry.parameters.indicesOfFaces;
  }

  set G_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get G_radius() {
    return this._native.geometry.parameters.radius;
  }

  set G_detail(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {detail: val}}));
  }

  get G_detail() {
    return this._native.geometry.parameters.detail;
  }

  clone() {
    return new Polyhedron({build: false}).copy(this);
  }
}

export {
  Polyhedron
};
