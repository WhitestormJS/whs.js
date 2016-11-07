import {PointLight as PointLightNative, PointLightHelper} from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class PointLight extends Component {
  static helpers = {
    default: [PointLightHelper, {
      size: 0
    }, ['size']]
  };

  constructor(params = {}) {
    super(params, PointLight.defaults, PointLight.instructions);

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new PointLightNative(
        params.light.color,
        params.light.intensity,
        params.light.distance,
        params.light.decay
      );

      resolve();
    });
  }
}

export {
  PointLight
};
