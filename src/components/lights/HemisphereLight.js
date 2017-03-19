import {HemisphereLight as HemisphereLightNative, HemisphereLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

class HemisphereLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,
    light: {
      skyColor: 0xffffff,
      groundColor: 0xffffff,

      intensity: 1
    }
  }

  constructor(params = {}) {
    super(params, HemisphereLight.defaults);
  }

  build(params = {}) {
    return this.applyBridge({light: new HemisphereLightNative(
      params.light.skyColor,
      params.light.groundColor,
      params.light.intensity
    )}).light;
  }
}

export {
  HemisphereLight
};
