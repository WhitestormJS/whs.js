import {
  Mesh,
  JSONLoader
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Importer
 * @category components/meshes
 * @description Importer is a loader for meshes and any other data to your scene
 * @param {Object} [params] - The params.
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Importer, and adding to app</caption>
 * new Importer({
 *   loader: new THREE.OBJLoader(),
 *
 *   parser(geometry, material) { // data from loader
 *     return new THREE.Mesh(geometry, material); // should return your .native (mesh in this case)
 *   },
 *
 *   position: [0, 100, 0]
 * }).addTo(app);
 */
class Importer extends MeshComponent {

  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Importer#defaults
   * @static
   * @default <pre>
   * {
   *   url: '',
   *   loader: new JSONLoader(),
   *
   *   onLoad() {},
   *   onProgress() {},
   *   onError() {},
   *
   *   texturePath: null,
   *   useCustomMaterial: false,
   *
   *   parser(geometry, materials) {
   *     return new Mesh(geometry, materials);
   *   }
   * }</pre>
   */
  static defaults = {
    ...MeshComponent.defaults,

    url: '',
    loader: new JSONLoader(),

    onLoad() {},
    onProgress() {},
    onError() {},

    texturePath: null,
    useCustomMaterial: false,

    parser(geometry, materials) {
      return new Mesh(geometry, materials);
    }
  };

  static instructions = {
    ...MeshComponent.instructions
  };

  /**
   * @method filter
   * @description Default values for parameters
   * @static
   * @param {THREE.Mesh} object Instance for iterating through it's children.
   * @param {Function} filter Function with child as argument, should return a boolean whether include the child or not.
   * @return {THREE.Mesh} object with children
   * @memberof module:components/meshes.Importer
   * @example <caption>Removing unnecessary lights from children</caption>
   * new Icosahedron({
   *   loader: new THREE.OBJLoader(),
   *
   *   parse(group) { // data from loader
   *     return Importer.filter(group, child => !child.isLight); // remove lights
   *   },
   *
   *   position: [0, 100, 0]
   * }).addTo(app);
   */
  static filter(object, filter) {
    const processFilter = object => {
      object.children.forEach((el, index) => {
        if (el.children) processFilter(el);
        if (!filter(el)) object.children.splice(index, 1);
      });

      return object;
    };

    return processFilter(object);
  }

  constructor(params = {}) {
    super(params, Importer.defaults, Importer.instructions, false);
  }

  /**
   * @method build
   * @description Build livecycle creates a mesh using input params.
   * @param {Object} params Component parameters.
   * @return {THREE.Mesh} Built mesh
   * @memberof module:components/meshes.Importer
   */
  build(params = {}) {
    const promise = new Promise(resolve => {
      if (params.texturePath) params.laoder.setTexturePath(params.texturePath);

      params.loader.load(params.url, (...data) => { // geometry, materials
        params.onLoad(...data);

        const object = this.applyBridge({mesh: params.parser(...data)}).mesh;

        const {geometry: geom, material: mat} = this.applyBridge({
          geometry: object.geometry,
          material: params.useCustomMaterial ? params.material : object.material
        });

        if (object.geometry) object.geometry = geom;
        if (object.material) object.material = mat;

        resolve(object);
      }, params.onProgress, params.onError);
    });

    super.wait(promise);

    return promise;
  }
}

export {
  Importer
};
