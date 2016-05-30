class FogExp2 {
	constructor(params = {}) {
    WHS.API.extend(params, {
      hex: 0x000000,
      density: 0.00025
    });

    this.fog = new THREE.FogExp2( params.hex, params.density);
    this.type = 'fogexp2';
	}

  addTo(root) {
    root.getScene().fog = this.fog;
  }
}

export {
	FogExp2 as default
};
