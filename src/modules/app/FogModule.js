import {
  FogExp2
} from 'three';

export class FogModule {
  constructor(params = {}) {
    this.params = Object.assign({
      color: 0xefd1b5,
      density: 0.020,
      near: 1,
      far: 100
    }, params);

    this.fog = new FogExp2(this.params.color, this.params.density);
  }

  manager(manager) {
    this.scene = manager.get('scene');
    this.scene.fog = this.fog;
  }
}
