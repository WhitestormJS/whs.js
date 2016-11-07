import {SpotLight as SpotLightNative, SpotLightHelper} from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class SpotLight extends Component {
  static helpers = {
    default: [SpotLightHelper]
  };

  constructor(params = {}) {
    super(params, SpotLight.defaults, SpotLight.instructions);

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new SpotLightNative(
        params.light.color,
        params.light.intensity,
        params.light.distance,
        params.light.angle,
        params.light.exponent,
        params.light.decay
      );

      resolve();
    });
  }
}

export {
  SpotLight
};
