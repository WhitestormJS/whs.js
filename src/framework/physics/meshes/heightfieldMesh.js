import {Mesh} from '../core/mesh';

export class HeightfieldMesh extends Mesh {
  constructor(geometry, material, params = {}, xdiv, ydiv) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geometry, material, mass, physParams);

    geometry.computeBoundingBox();

    const isBuffer = geometry instanceof THREE.BufferGeometry;
    const verts = isBuffer ? geometry.attributes.position.array : geometry.vertices;

    let size = isBuffer ? verts.length / 3 : verts.length;

    this._physijs.type = 'heightfield';
    this._physijs.xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    this._physijs.ysize = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    this._physijs.xpts = (typeof xdiv === 'undefined') ? Math.sqrt(size) : xdiv + 1;
    this._physijs.ypts = (typeof ydiv === 'undefined') ? Math.sqrt(size) : ydiv + 1;

    // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
    this._physijs.absMaxHeight = Math.max(geometry.boundingBox.max.z, Math.abs(geometry.boundingBox.min.z));

    const points = new Float32Array(size),
      xpts = this._physijs.xpts,
      ypts = this._physijs.ypts;

    while (size--) {
      const vNum = size % xpts + ((ypts - Math.round((size / xpts) - ((size % xpts) / xpts)) - 1) * ypts);

      if (isBuffer) points[size] = verts[vNum * 3 + 2];
      else points[size] = verts[vNum].z;
    }

    this._physijs.points = points;

    this._physijs.params = {
      friction: physParams.friction,
      restitution: physParams.restitution,
      damping: physParams.damping,
      margin: physParams.margin
    };

    this._physijs.mass = mass;
  }
}
