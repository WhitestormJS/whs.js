import {PointLight as PointLightNative, PointLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

/**
 * @class PointLight
 * @category components/lights
 * @description PointLight creates a light at a specific position in the scene. The light shines in all directions (roughly similar to a light bulb.)<br/><br/>
 * It has the same options as AmbientLight in light paramater, but it also supports position, distance and decay.<br/>
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1, distance: 100, decay: 1}}] - The params.
 * @extends LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a PointLight</caption>
 * new PointLight( {
 *   color: 0xff0000,
 *   intensity: 2,
 *   distance: 300
 *
 *   position: [10, 20, 10]
 * }).addTo(app);
 */
class PointLight extends LightComponent {
  static defaults= {
    ...LightComponent.defaults,

    color: 0xffffff,
    intensity: 1,
    distance: 100,
    decay: 1
  }

  constructor(params = {}) {
    super(params, PointLight.defaults);
    this.wrapShadow();
  }

  build(params = {}) {
    return this.applyBridge({light: new PointLightNative(
      params.color,
      params.intensity,
      params.distance,
      params.decay
    )}).light;
  }
}

export {
  PointLight
};
