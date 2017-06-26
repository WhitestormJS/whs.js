import {
  Mesh,
  OctahedronBufferGeometry,
  OctahedronGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Octahedron
 * @category components/meshes
 * @description In geometry, an octahedron is a polyhedron with eight faces.
 * A regular octahedron is a Platonic solid composed of eight equilateral triangles, four of which meet at each vertex.
 * <br/><br/>
 * `Octahedron` creates an Octahedron object by its `radius` and `detail`.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#OctahedronGeometry"></iframe>
 * @param {Object} [params] - The params.
 * @extends MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating an Octahedron, and adding to app</caption>
 * new Octahedron({
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
class Octahedron extends MeshComponent {
  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Octahedron#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 1,
   *     detail: 0
   *   }
   * }
   * </pre>
   */
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 1,
      detail: 0
    }
  }

  constructor(params = {}) {
    super(params, Octahedron.defaults, Octahedron.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? OctahedronBufferGeometry : OctahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }
}

export {
  Octahedron
};
