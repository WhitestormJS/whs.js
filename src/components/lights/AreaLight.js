import {RectAreaLight as RectAreaLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

class AreaLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    color: 0xffffff,
    intensity: 1,
    width: 10,
    height: 10
  };

  constructor(params = {}) {
    super(params, AreaLight.defaults);
  }

  build(params = {}) {
    return this.applyBridge({light: new RectAreaLightNative(
      params.color,
      params.intensity,
      params.width,
      params.height
    )}).light;
  }
}

export {
  AreaLight
};
