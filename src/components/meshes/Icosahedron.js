import {
  Mesh,
  IcosahedronBufferGeometry,
  IcosahedronGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Icosahedron
 * @category components/meshes
 * @description In geometry, an icosahedron is a polyhedron with 20 faces.<br/>
 * There are many kinds of icosahedra, with some being more symmetrical than others. The most well known is the Platonic, convex regular icosahedron.<br/>
 * `Icosahedron` creates an Icosahedron object by its radius and detail.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Icosahedron, and adding to app</caption>
 * new Icosahedron({
 *   geometry: {
 *     radius: 2,
 *     detail: 1
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: [0, 100, 0]
 * }).addTo(app);
 */
class Icosahedron extends MeshComponent {
  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Icosahedron#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 1,
   *     detail: 0
   *   }
   * }</pre>
   */
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 1,
      detail: 0
    }
  };

  /**
   * Instructions
   * @member {Object} module:components/meshes.Icosahedron#instructions
   * @static
   * @default {geometry: ['radius', 'detail']}
   */
  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['radius', 'detail']
  };

  constructor(params = {}) {
    super(params, Icosahedron.defaults, Icosahedron.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? IcosahedronBufferGeometry : IcosahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }
}

export {
  Icosahedron
};
