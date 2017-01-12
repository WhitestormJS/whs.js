import {HemisphereLight as HemisphereLightNative, HemisphereLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

class HemisphereLight extends LightComponent {
  // static helpers = {
  //   default: [HemisphereLightHelper, {
  //     size: 0
  //   }, ['size']]
  // };

  constructor(params = {}) {
    super(params);
    this.wrapShadow();
  }

  build(params = {}) {
    return new HemisphereLightNative(
      params.light.skyColor,
      params.light.groundColor,
      params.light.intensity
    );
  }
}

export {
  HemisphereLight
};
