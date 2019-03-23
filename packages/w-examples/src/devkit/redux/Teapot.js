import {
  Component
} from '@whs/core';

export default class Teapot extends Component.Mesh {
  constructor(options) {
    super(async () => ({
      geometry: (new THREE.ObjectLoader).parse(
        await fetch('https://threejs.org/examples/models/json/teapot-claraio.json')
          .then(res => res.json())
      ).geometry,
      material: new THREE.MeshBasicMaterial({color: 0x00ff00}),
      ...options
    }));
  }

  async changeColorFromInt(integer) {
    const material = (await this.native).material;

    material.color.setHex([
      0xff0000,
      0x00ff00,
      0x0000ff
    ][integer % 3]);

    console.log(material.color);

    material.needsUpdate = true;
  }
}
