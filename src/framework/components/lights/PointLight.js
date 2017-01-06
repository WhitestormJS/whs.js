import {PointLight as PointLightNative, PointLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

class PointLight extends LightComponent {
  // static helpers = {
  //   default: [PointLightHelper, {
  //     size: 0
  //   }, ['size']]
  // };

  constructor(params = {}) {
    super(params);
    this.wrapShadow();
  }

  build(params = {}) {
    return new PointLightNative(
      params.light.color,
      params.light.intensity,
      params.light.distance,
      params.light.decay
    );
  }
}

export {
  PointLight
};
