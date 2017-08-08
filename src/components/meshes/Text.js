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
 *     text: 'Some text',
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
   *   text: 'Hello World!',
   *   font: null,
   *
   *   geometry: {
   *     size: 12,
   *     height: 50,
   *     curveSegments: 12,
   *     font: new Font(),
   *     bevelEnabled: false,
   *     bevelThickness: 10,
   *     bevelSize: 8
   *   }
   * }
   * </pre>
   */
  static defaults = {
    ...MeshComponent.defaults,
    text: 'Hello World!',
    font: null,

    geometry: {
      size: 12,
      height: 50,
      curveSegments: 12,
      font: new Font(),
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8
    }
  };

  static instructions = {
    ...MeshComponent.instructions
  };

  /**
   * Default FontLoader
   * @member {Object} module:components/meshes.Text#loader
   * @static
   * @default new FontLoader()
   */
  static loader = new FontLoader();

  /**
   * @method load
   * @static
   * @description load() preloads a Font object and returns a Promise with it.
   * @param {String} path Path to the font
   * @return {Promise} A promise resolved with a font
   * @memberof module:components/meshes.Text
   */
  static load(path, loader = Text.loader) {
    return new Promise(resolve => {
      loader.load(path, resolve);
    });
  }

  constructor(params = {}) {
    super(params, Text.defaults, Text.instructions);
  }

  /**
   * @method build
   * @description Build is called as part of the lifecycle to create a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Text
   */
  build(params = this.params) {
    const promise = new Promise(resolve => {
      (params.font instanceof Promise ? params.font : Promise.resolve(params.font))
      .then(font => {
        const {geometry, material} = this.applyBridge({
          geometry: new TextGeometry(
            params.text,
            Object.assign(
              params.geometry,
              {font}
            )
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
