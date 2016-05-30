import {BoxGeometry, Mesh} from 'three';
import {BoxMesh} from 'whitestormjs-physijs';
import Shape from '../core/Shape';

class Box extends Shape {
	constructor(params = {}) {
		super(params, 'box');

		WHS.API.extend(params.geometry, {
      width: 1,
      height: 1,
      depth: 1
	  });

    this.build(params);
    super.wrap();
	}

  build(params = {}) {
		const PhysicsMesh = this.physics ? BoxMesh : Mesh;
    const material = super._initMaterial(params.material);

    return new Promise((resolve, reject) => {
      this.setNative(new PhysicsMesh(
        new BoxGeometry(
          params.geometry.width,
          params.geometry.height,
          params.geometry.depth
        ),
        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Box(this.getParams(), this._type).copy(this);
  }
}
