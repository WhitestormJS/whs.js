import {SpotLight as SpotLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

class SpotLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    light: {
      color: 0xffffff,
      intensity: 1,
      distance: 100,
      angle: Math.PI / 3,
      exponent: 0,
      decay: 1
    }
  };

  constructor(params = {}) {
    super(params, SpotLight.defaults);
    this.wrapShadow();
  }

  build(params = {}) {
    return this.applyBridge({light: new SpotLightNative(
      params.light.color,
      params.light.intensity,
      params.light.distance,
      params.light.angle,
      params.light.exponent,
      params.light.decay
    )}).light;
  }
}

export {
  SpotLight
};
