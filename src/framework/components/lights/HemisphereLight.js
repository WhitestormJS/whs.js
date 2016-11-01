import {HemisphereLight as HemisphereLightNative, HemisphereLightHelper} from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class HemisphereLight extends Component {
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

      if (params.helper) {
        this.helper = new HemisphereLightHelper(
          this.native,
          params.helper.size ? params.helper.size : 0
        );
      }

      resolve();
    });
  }
}

export {
  HemisphereLight
};
