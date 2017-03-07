import {RectAreaLight as RectAreaLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

class AreaLight extends LightComponent {
  constructor(params = {}) {
    super(params);
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
