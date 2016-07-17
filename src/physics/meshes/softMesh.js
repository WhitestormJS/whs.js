import {Mesh} from '../core/mesh';

export class SoftMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    const tempGeometry = geometry.clone();

    if (!(geometry instanceof THREE.BufferGeometry)) // Converts to BufferGeometry.
      geometry = new THREE.BufferGeometry().fromGeometry(geometry);

    super(geometry, material, mass);

    tempGeometry.mergeVertices();
    const idxGeometry = this.createIndexedBufferGeometryFromGeometry(tempGeometry);
    if (!tempGeometry.boundingBox) tempGeometry.computeBoundingBox();
    this.tempGeometry = tempGeometry;

    const aVertices = idxGeometry.attributes.position.array;
    const aIndices = idxGeometry.index.array;
    const aIdxAssoc = [];
    const vertices = geometry.attributes.position.array;

    const numIdxVertices = aVertices.length / 3;
    const numVertices = vertices.length / 3;

    for (let i = 0; i < numIdxVertices; i++) {
      const association = [];
      aIdxAssoc.push(association);

      const i3 = i * 3;

      for (let j = 0; j < numVertices; j++) {
        const j3 = j * 3;

        if (this.isEqual(aVertices[i3], aVertices[i3 + 1], aVertices[i3 + 2], vertices[j3], vertices[j3 + 1], vertices[j3 + 2]))
          association.push(j3);
      }
    }

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'softbody';
    this._physijs.aVertices = aVertices;
    this._physijs.aIndices = aIndices;
    this._physijs.aIdxAssoc = aIdxAssoc;


    this._physijs.params = {
      friction: physParams.friction,
      damping: physParams.damping,
      pressure: physParams.pressure,
      margin: physParams.margin,
    };

    this._physijs.mass = mass;
  }

  createIndexedBufferGeometryFromGeometry(geometry) {
    const numVertices = geometry.vertices.length;
    const numFaces = geometry.faces.length;
    const bufferGeom = new THREE.BufferGeometry();
    const vertices = new Float32Array(numVertices * 3);
    const indices = new (numFaces * 3 > 65535 ? Uint32Array : Uint16Array)(numFaces * 3);

    for (let i = 0; i < numVertices; i++) {
      const p = geometry.vertices[i];
      const i3 = i * 3;

      vertices[i3] = p.x;
      vertices[i3 + 1] = p.y;
      vertices[i3 + 2] = p.z;
    }

    for (let i = 0; i < numFaces; i++) {
      const f = geometry.faces[i];
      const i3 = i * 3;

      indices[i3] = f.a;
      indices[i3 + 1] = f.b;
      indices[i3 + 2] = f.c;
    }

    bufferGeom.setIndex(new THREE.BufferAttribute(indices, 1));
    bufferGeom.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

    return bufferGeom;
  }

  isEqual(x1, y1, z1, x2, y2, z2) {
    const delta = 0.000001;

    return Math.abs(x2 - x1) < delta
      && Math.abs(y2 - y1) < delta
      && Math.abs(z2 - z1) < delta;
  }
}
