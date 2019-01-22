import {
  Mesh,
  ConeBufferGeometry,
  ConeGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Cone
 * @category components/meshes
 * @description A cylinder is one of the most basic curvilinear geometric shapes, the surface formed by the points at a fixed distance from a given straight line, the axis of the cylinder. <br/><br/>
 * The solid enclosed by this surface and by two planes perpendicular to the axis is also called a cylinder.<br/>
 * The surface area and the volume of a cylinder have been known since deep antiquity.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#ConeGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Cone, and adding to app</caption>
 * new Cone({
 *   geometry: {
 *     radiusTop: 2,
 *     radiusBottom: 4,
 *     height: 5
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   pos: [0, 100, 0]
 * }).addTo(app);
 */
class Cone extends MeshComponent {

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Cone#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 20,
   *     height: 100,
   *     radiusSegments: 32,
   *     heightSegments: 1,
   *     openEnded: false,
   *     thetaStart: 0,
   *     thetaLength: Math.PI * 2
   *   }
   * }</pre>
   */
  static defaults = {
    ...MeshComponent.defaults,

    geometry: {
      radius: 20,
      height: 100,
      radiusSegments: 32,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: Math.PI * 2
    }
  };

  /**
   * Instructions
   * @member {Object} module:components/meshes.Cone#instructions
   * @static
   * @default <pre>
   * geometry: [
   *   'radius',
   *   'height',
   *   'radiusSegments',
   *   'heightSegments',
   *   'openEnded',
   *   'thetaStart',
   *   'thetaLength'
   * ]
   * </pre>
   */
  static instructions = {
    ...MeshComponent.instructions,
    geometry: [
      'radius',
      'height',
      'radiusSegments',
      'heightSegments',
      'openEnded',
      'thetaStart',
      'thetaLength'
    ]
  };

  constructor(params = {}) {
    super(params, Cone.defaults, Cone.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  /**
   * @method build
   * @description Build lifecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Cone
   */
  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const geometry = new (params.buffer ? ConeBufferGeometry : ConeGeometry)(
      params.geometry.radius,
      params.geometry.height,
      params.geometry.radiusSegments,
      params.geometry.heightSegments,
      params.geometry.openEnded,
      params.geometry.thetaStart,
      params.geometry.thetaLength
    );

    return geometry;
  }
}

export {
  Cone
};
