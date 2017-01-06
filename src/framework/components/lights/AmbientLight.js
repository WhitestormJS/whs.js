import {AmbientLight as AmbientLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

class AmbientLight extends LightComponent {
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
