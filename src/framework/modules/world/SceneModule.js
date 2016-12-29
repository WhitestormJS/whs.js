import {
  Scene,
  Fog,
  FogExp2
} from 'three';

export class SceneModule {
  integrate() {
    const params = this.params;

    const scene = (params.physics && params.physics.create) ? params.physics.create.bind(this)() : new Scene();

    this.simulate = (params.physics && params.physics.create);

    if (params.fog.type === 'regular')
      scene.fog = new Fog(params.fog.hex, params.fog.near, params.fog.far);
    else if (params.fog.type === 'exp'
      || params.fog.type === 'expodential')
      scene.fog = new FogExp2(params.fog.hex, params.fog.density);

    this.importScene(scene, false);
  }
}
