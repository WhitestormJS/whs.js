import {HemisphereLight as HemisphereLightNative, HemisphereLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

/**
 * @class HemisphereLight
 * @category components/lights
 * @description HemisphereLight is a light source positioned directly above the scene.<br/>
 * It also doesn't need position and target properties.
 * @classDesc
 * <iframe src="https://threejs.org/examples/webgl_lights_hemisphere.html"></iframe>
 * @param {Object} [params={light: {skyColor: 0xffffff, groundColor: 0xffffff, intensity: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a HemisphereLight</caption>
 * new HemisphereLight({
 *   skyColor: 0xff0000,
 *   groundColor: 0x0000ff,
 *   intensity: 0.2
 * }).addTo(app);
 */
class HemisphereLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    skyColor: 0xffffff,
    groundColor: 0xffffff,
    intensity: 1
  }

  constructor(params = {}) {
    super(params, HemisphereLight.defaults);
  }

  build(params = {}) {
    return this.applyBridge({light: new HemisphereLightNative(
      params.skyColor,
      params.groundColor,
      params.intensity
    )}).light;
  }
}

export {
  HemisphereLight
};
