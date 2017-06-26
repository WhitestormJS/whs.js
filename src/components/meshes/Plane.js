import {
  Mesh,
  PlaneBufferGeometry,
  PlaneGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Plane
 * @category components/meshes
 * @description `Plane` is used for creating planes given some `width` and `height`.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#PlaneGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Plane, and adding to app</caption>
 * new Plane({
 *   geometry: {
 *     width: 20,
 *     height: 30
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   })
 * }).addTo(app);
 */
class Plane extends MeshComponent {
  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Plane#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     width: 10,
   *     height: 10,
   *     wSegments: 1,
   *     hSegments: 1
   *   }
   * }
   * </pre>
   */
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      width: 10,
      height: 10,
      wSegments: 1,
      hSegments: 1
    }
  };

  /**
   * Instructions
   * @member {Object} module:components/meshes.Plane#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['width', 'height', 'wSegments', 'hSegments']
   * }
   * </pre>
   */
  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['width', 'height', 'wSegments', 'hSegments']
  };

  constructor(params = {}) {
    super(params, Plane.defaults, Plane.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer || params.softbody ? PlaneBufferGeometry : PlaneGeometry;

    const geometry = new GConstruct(
      params.geometry.width,
      params.geometry.height,
      params.geometry.wSegments,
      params.geometry.hSegments
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }
}

export {
  Plane
};
