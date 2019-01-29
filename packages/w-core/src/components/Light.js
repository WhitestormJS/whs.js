import {Component} from '../core/Component';
import {applyTransform} from '../utils';

export class LightComponent extends Component {
  build(options) {
    const light = options.light;

    applyTransform(light, options);

    return this.bridge('light', light);
  }
}

Component.Light = LightComponent;
