import {AmbientLight as AmbientLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

class AmbientLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    light: {
      color: 0xffffff,
      intensity: 1
    }
  };

  constructor(params = {}) {
    super(params, AmbientLight.defaults);
  }

  build(params = {}) {
    return this.applyBridge({light: new AmbientLightNative(
      params.light.color,
      params.light.intensity
    )}).light;
  }
}

export {
  AmbientLight
};
