import {
  Font,
  Mesh,
  TextGeometry,
  FontLoader
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Text
 * @category components/meshes
 * @description Text class is made for creating 3D text objects.
 * @classDesc
 * <iframe src="https://threejs.org/docs/scenes/geometry-browser.html#TextGeometry"></iframe>
 * <br/><br/>
 * Physics text object can be convex or concave. By default it's convex but you can also switch to concave.
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Text, and adding it to app</caption>
 * new Text({
 *   geometry: {
 *     text: 'hello world',
 *     parameters: {
 *       font: 'path/to/font.typeface.js',
 *       size: 20,
 *       height: 5,
 *       curveSegments: 6
 *     }
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: {
 *     x: -40,
 *     y: 20,
 *     z: 0
 *   }
 * }).addTo(app);
 */
class Text extends MeshComponent {
  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Text#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     text: 'Hello World!',
   *     loader: new FontLoader(),
   *
   *     parameters: {
   *       size: 12,
   *       height: 50,
   *       curveSegments: 12,
   *       font: new Font(),
   *       bevelEnabled: false,
   *       bevelThickness: 10,
   *       bevelSize: 8
   *     }
   *   }
   * }
   * </pre>
   */
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      text: 'Hello World!',
      loader: new FontLoader(),

      parameters: {
        size: 12,
        height: 50,
        curveSegments: 12,
        font: new Font(),
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8
      }
    }
  };

  /**
   * Instructions
   * @member {Object} module:components/meshes.Text#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['text', 'loader', 'parameters']
   * }
   * </pre>
   */
  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['text', 'loader', 'parameters']
  }

  constructor(params = {}) {
    super(params, Text.defaults, Text.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Text
   */
  build(params = {}) {
    const promise = new Promise(resolve => {
      FontLoader.load(params.geometry.parameters.font, font => {
        params.geometry.parameters.font = font;

        const {geometry, material} = this.applyBridge({
          geometry: new TextGeometry(
            params.geometry.text,
            params.geometry.parameters
          ),

          material: params.material
        });

        resolve(
          this.applyBridge({
            mesh: new Mesh(geometry, material)
          }).mesh
        );
      });
    });

    super.wait(promise);

    return promise;
  }
}

export {
  Text
};
