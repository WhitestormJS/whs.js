import {DirectionalLight as DirectionalLightNative, DirectionalLightHelper} from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class DirectionalLight extends Component {
  constructor(params = {}) {
    super(params, DirectionalLight.defaults, DirectionalLight.instructions);

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new DirectionalLightNative(
        params.light.color,
        params.light.intensity
      );

      if (params.helper) {
        this.helper = new DirectionalLightHelper(
          this.native,
          params.helper.size ? params.helper.size : 0
        );
      }

      resolve();
    });
  }
}

export {
  DirectionalLight
};
