import {
  Mesh,
  LineCurve3,
  Vector3,
  TubeBufferGeometry,
  TubeGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Tube
 * @category components/meshes
 * @description Tube class makes a tube that extrudes along a 3d curve.
 * @classDesc
 * <iframe src="https://threejs.org/docs/index.html#api/geometries/TubeGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Tube from a three.js Curve, and adding it to app</caption>
 * const CustomSinCurve = THREE.Curve.create(
 *   function (scale) { // custom curve constructor
 *     this.scale = (scale === undefined) ? 1 : scale;
 *   },
 *
 *   function (t) { // getPoint: t is between 0-1
 *     const tx = t * 3 - 1.5,
 *     ty = Math.sin( 2 * Math.PI * t ),
 *     tz = 0;
 *
 *     return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
 *   }
 * );
 *
 * const path = new CustomSinCurve(10);
 *
 * new Tube({
 *   geometry: {
 *     path: path
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   })
 * }).addTo(app);
 */
class Tube extends MeshComponent {
  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Tube#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     path: new THREE.LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, 1)),
   *     segments: 20,
   *     radius: 2,
   *     radiusSegments: 8,
   *     closed: false
   *   }
   * }
   * </pre>
   */
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      path: new LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, 1)),
      segments: 20,
      radius: 2,
      radiusSegments: 8,
      closed: false
    }
  };

  /**
   * Instructions
   * @member {Object} module:components/meshes.Tube#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: [
   *     'path',
   *     'segments',
   *     'radius',
   *     'radiusSegments',
   *     'closed'
   *   ]
   * }
   * </pre>
   */
  static instructions = {
    ...MeshComponent.instructions,
    geometry: [
      'path',
      'segments',
      'radius',
      'radiusSegments',
      'closed'
    ]
  };

  constructor(params = {}) {
    super(params, Tube.defaults, Tube.instructions);

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
   * @memberof module:components/meshes.Tube
   */
  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const geometry = new (params.buffer ? TubeBufferGeometry : TubeGeometry)(
      params.geometry.path,
      params.geometry.segments,
      params.geometry.radius,
      params.geometry.radiusSegments,
      params.geometry.closed
    );

    return geometry;
  }
}

export {
  Tube
};
