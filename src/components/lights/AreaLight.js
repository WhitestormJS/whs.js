import {RectAreaLight as RectAreaLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

class AreaLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    light: {
      color: 0xffffff,
      intensity: 1,
      width: 10,
      height: 10
    }
  };

  constructor(params = {}) {
    super(params, AreaLight.defaults);
  }

  build(params = {}) {
    return new RectAreaLightNative(
      params.light.color,
      params.light.intensity,
      params.light.width,
      params.light.height
    );
  }
}

export {
  AreaLight
};
