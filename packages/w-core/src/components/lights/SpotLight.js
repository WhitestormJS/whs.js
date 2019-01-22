import {SpotLight as SpotLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

/**
 * @class SpotLight
 * @category components/lights
 * @description SpotLight creates spot light that can cast shadow in one direction. <br/><br/>
 * It has the same parameters as AmbientLight in light, but it also supports pos and target. <br/><br/>
 * SpotLight affects meshes with lambert and phong material.
 * @classDesc
 * <iframe src="https://threejs.org/examples/webgl_lights_spotlight.html"></iframe>
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1, distance: 100, angle: Math.PI / 3, exponent: 0, decay: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a SpotLight that falls down from vec3(10, 20, 10) to vec3(0, 0, 0)</caption>
 * new SpotLight({
 *   color: 0x00ff00,
 *   intensity: 3,
 *   distance: 1000
 *
 *   position: [10, 20, 10]
 * }).addTo(app);
 */
class SpotLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    color: 0xffffff,
    intensity: 1,
    distance: 100,
    angle: Math.PI / 3,
    exponent: 0,
    decay: 1
  };

  constructor(params = {}) {
    super(params, SpotLight.defaults);
    this.wrapShadow();
  }

  build(params = {}) {
    return this.applyBridge({light: new SpotLightNative(
      params.color,
      params.intensity,
      params.distance,
      params.angle,
      params.exponent,
      params.decay
    )}).light;
  }
}

export {
  SpotLight
};
