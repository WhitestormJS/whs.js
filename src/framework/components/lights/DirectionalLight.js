import {DirectionalLight as DirectionalLightNative, DirectionalLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

class DirectionalLight extends LightComponent {
  // static helpers = {
  //   default: [DirectionalLightHelper, {
  //     size: 0
  //   }, ['size']]
  // };

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
