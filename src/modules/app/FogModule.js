import {
  FogExp2,
  Fog
} from 'three';

export class FogModule {
  constructor(params = {}, type) {
    this.params = Object.assign({
      color: 0xefd1b5,
      density: 0.020,
      near: 10,
      far: 1000
    }, params);
    if (!type || type === 'exp2') this.fog = new FogExp2(this.params.color, this.params.density);
    else if (type === 'linear') this.fog = new Fog(this.params.color, this.params.near, this.params.far);
  }

  manager(manager) {
    manager.set('fog', this.fog);
    manager.get('scene').fog = this.fog;
  }
}
