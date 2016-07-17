import {Mesh} from '../core/mesh';

export class HeightfieldMesh extends Mesh {
  constructor(geometry, material, params = {}, xdiv, ydiv) {
    console.log(params);
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geometry, material, mass);

    this._physijs.type = 'heightfield';
    this._physijs.xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    this._physijs.ysize = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    this._physijs.xpts = (typeof xdiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : xdiv + 1;
    this._physijs.ypts = (typeof ydiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : ydiv + 1;
    // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
    this._physijs.absMaxHeight = Math.max(geometry.boundingBox.max.z, Math.abs(geometry.boundingBox.min.z));

    let size = geometry.vertices.length;

    const points = new Float32Array(size),
      xpts = this._physijs.xpts,
      ypts = this._physijs.ypts;

    while (size--) {
      points[size] = geometry.vertices[
        size % xpts
        + ((ypts - Math.round((size / xpts) - ((size % xpts) / xpts)) - 1) * ypts)
      ].z;
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
