import {
  Mesh,
  CircleBufferGeometry,
  CircleGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Circle
 * @category components/meshes
 * @description As told on Component definition, while you can pass any of the inherited params for this component construction, you will need to
 * pass specific parameters to build this mesh as a geometry object.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#CircleGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Circle, and adding to app</caption>
 *  new Circle({
 *    geometry: {
 *      radius: 4,
 *      segments: 16
 *    },
 *
 *    material: new THREE.MeshBasicMaterial({
 *      color: 0xffffff
 *    }),
 *
 *    position: [50, 60, 70]
 * }).addTo(app);
 */
class Circle extends MeshComponent {

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Circle#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 50,
   *     segments: 8,
   *     thetaStart: 0,
   *     thetaLength: Math.PI * 2
   *   }
   * }</pre>
   */
  static defaults = {
    ...MeshComponent.defaults,

    geometry: {
      radius: 50,
      segments: 8,
      thetaStart: 0,
      thetaLength: Math.PI * 2
    }
  };

  /**
   * Instructions
   * @member {Object} module:components/meshes.Circle#instructions
   * @static
   * @default geometry: ['radius', 'segments', 'thetaStart', 'thetaLength']
   */
  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['radius', 'segments', 'thetaStart', 'thetaLength']
  };

  constructor(params = {}) {
    super(params, Circle.defaults, Circle.instructions);
  }

  /**
   * @method build
   * @description Build lifecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Circle
   */
  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const geometry = new (params.buffer ? CircleBufferGeometry : CircleGeometry)(
      params.geometry.radius,
      params.geometry.segments,
      params.geometry.thetaStart,
      params.geometry.thetaLength
    );

    return geometry;
  }
}

export {
  Circle
};
