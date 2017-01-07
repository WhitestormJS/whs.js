import {SpotLight as SpotLightNative, SpotLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

class SpotLight extends LightComponent {
  static helpers = {
    default: [SpotLightHelper]
  };

  constructor(params = {}) {
    super(params);
    this.wrapShadow();
  }

  build(params = {}) {
    return new SpotLightNative(
      params.light.color,
      params.light.intensity,
      params.light.distance,
      params.light.angle,
      params.light.exponent,
      params.light.decay
    );
  }
}

export {
  SpotLight
};
