import {DirectionalLight as DirectionalLightNative, DirectionalLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

/**
 * @class DirectionalLight
 * @category components/lights
 * @description DirectinalLight creates a light that shines from a specific direction not from a specific position.<br/><br/>
 * This light will behave as though it is infinitely far away and the rays produced from it are all parallel. <br/><br/>
 * The best analogy would be a light source that acts like the sun: the sun is so far away that all sunlight hitting objects comes from the same angle.<br/><br/>
 * It has the same options as AmbientLight in light paramater, but it also supports pos and target paramaters.
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a DirectionalLight to fall down from vec3(10, 20, 10) to vec3(0, 0, 0)</caption>
 * new DirectionalLight({
 *   color: 0xffffff,
 *   intensity: 0.2,
 *
 *   position: [10, 20, 10]
 * }).addTo(app);
 */
class DirectionalLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    color: 0xffffff,
    intensity: 1
  };

  constructor(params = {}) {
    super(params, DirectionalLight.defaults);
    this.wrapShadow();
  }

  build(params = {}) {
    return this.applyBridge({light: new DirectionalLightNative(
      params.color,
      params.intensity
    )}).light;
  }
}

export {
  DirectionalLight
};
