import {DirectionalLight as DirectionalLightNative, DirectionalLightHelper} from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class DirectionalLight extends Component {
  static helpers = {
    default: [DirectionalLightHelper, {
      size: 0
    }, ['size']]
  };

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

      resolve();
    });
  }
}

export {
  DirectionalLight
};
