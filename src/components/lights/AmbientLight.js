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

  build(params = {}) {
    return new AmbientLightNative(
      params.light.color,
      params.light.intensity
    );
  }
}

export {
  AmbientLight
};
