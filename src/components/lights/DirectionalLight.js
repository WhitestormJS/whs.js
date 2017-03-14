import {DirectionalLight as DirectionalLightNative, DirectionalLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

class DirectionalLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    light: {
      color: 0xffffff,
      intensity: 1
    }
  };

  constructor(params = {}) {
    super(params);
    this.wrapShadow();
  }

  build(params = {}) {
    return new DirectionalLightNative(
      params.light.color,
      params.light.intensity
    );
  }
}

export {
  DirectionalLight
};
