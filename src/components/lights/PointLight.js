import {PointLight as PointLightNative, PointLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

class PointLight extends LightComponent {
  static defaults= {
    ...LightComponent.defaults,
    light: {
      color: 0xffffff,
      intensity: 1,
      distance: 100,
      decay: 1
    }
  }

  constructor(params = {}) {
    super(params);
    this.wrapShadow();
  }

  build(params = {}) {
    return new PointLightNative(
      params.light.color,
      params.light.intensity,
      params.light.distance,
      params.light.decay
    );
  }
}

export {
  PointLight
};
