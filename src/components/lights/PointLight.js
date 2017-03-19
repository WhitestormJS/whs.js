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
    super(params, PointLight.defaults);
    this.wrapShadow();
  }

  build(params = {}) {
    return this.applyBridge({light: new PointLightNative(
      params.light.color,
      params.light.intensity,
      params.light.distance,
      params.light.decay
    )}).light;
  }
}

export {
  PointLight
};
