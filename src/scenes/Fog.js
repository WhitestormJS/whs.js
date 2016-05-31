import {Fog as _Fog} from 'three';

class Fog {
  constructor(params = {}) {
    WHS.API.extend(params, {
      hex: 0x000000,
      near: 1,
      far: 1000
    });

    this.fog = new _Fog(params.hex, params.near, params.far);
    this.type = 'fog';
  }

  addTo(root) {
    root.getScene().fog = this.fog;
  }
}

export {
	Fog as default
};
