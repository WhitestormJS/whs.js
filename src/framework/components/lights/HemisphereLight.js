import {HemisphereLight as HemisphereLightNative, HemisphereLightHelper} from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class HemisphereLight extends Component {
  static helpers = {
    default: [HemisphereLightHelper, {
      size: 0
    }, ['size']]
  };

  constructor(params = {}) {
    super(params, HemisphereLight.defaults, HemisphereLight.instructions);

    this.build(params);

    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new HemisphereLightNative(
        params.light.skyColor,
        params.light.groundColor,
        params.light.intensity
      );

      resolve();
    });
  }
}

export {
  HemisphereLight
};
