import Mesh from '../core/mesh';

export default class HeightfieldMesh extends Mesh {
  constructor(geometry, material, mass, xdiv, ydiv) {
    super(this, geometry, material, mass);

    this._physijs.type = 'heightfield';
    this._physijs.xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    this._physijs.ysize = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    this._physijs.xpts = (typeof xdiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : xdiv + 1;
    this._physijs.ypts = (typeof ydiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : ydiv + 1;
    // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
    this._physijs.absMaxHeight = Math.max(geometry.boundingBox.max.z, Math.abs(geometry.boundingBox.min.z));

    const points = [];

    for (let i = 0; i < geometry.vertices.length; i++) {
      const a = i % this._physijs.xpts;
      const b = Math.round((i / this._physijs.xpts) - ((i % this._physijs.xpts) / this._physijs.xpts));
      points[i] = geometry.vertices[a +  ((this._physijs.ypts - b - 1) * this._physijs.ypts)].z;
    }

    this._physijs.points = points;
  }
}
