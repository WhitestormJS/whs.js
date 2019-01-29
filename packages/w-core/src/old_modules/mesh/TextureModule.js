import {
  RepeatWrapping,
  UVMapping,
  NearestFilter,
  LinearMipMapLinearFilter,
  TextureLoader,
  Vector2
} from 'three';

const loader = new TextureLoader();

/**
 * @class TextureModule
 * @category modules/mesh
 * @description A TextureModule can be applied to any Mesh or Model.
 * @param {Array} [textures] - array of texture objects
 * @memberof module:modules/mesh
 * @example <caption>Creating an instance. url takes a path, or a data object.</caption>
 * var woodTexture = new TextureModule({
 *   url: `${process.assetsPath}/textures/wood.jpg`
 * });
 * @example <caption>More comprehensive example, wood texture applied to a Box.</caption>
 * new Box({
 *   geometry: {
 *     width: 2,
 *     height: 2,
 *     depth: 2
 *   },
 *   modules: [
 *     new TextureModule({
 *       url: `path/to/texture.jpg`,
 *       repeat: new THREE.Vector2(1, 1) // optional
 *     })
 *   ],
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *   position: [50, 60, 70]
 * }).addTo(app);
 */
export class TextureModule {
  static load(url) {
    return new TextureModule({url}).textures[0][1];
  }

  textures = [];

  constructor(...textures) {
    textures.forEach(({
      url,
      type = 'map',
      offset = new Vector2(0, 0),
      repeat = new Vector2(1, 1),
      wrap = RepeatWrapping,
      mapping = UVMapping,
      fix = tex => tex
    }) => {
      const texture = loader.load(url);

      if (wrap.length > 0) {
        texture.wrapS = wrap[0];
        texture.wrapT = wrap[1];
      } else
        texture.wrapS = texture.wrapT = wrap;

      texture.mapping = mapping;

      texture.offset.copy(offset);
      texture.repeat.copy(repeat);

      texture.magFilter = NearestFilter;
      texture.minFilter = LinearMipMapLinearFilter;

      this.textures.push([type, fix(texture)]);
    });
  }

  bridge = {
    material(material, self) {
      self.textures.forEach(texture => {
        material[texture[0]] = texture[1];
      });

      material.needsUpdate = true;
      return material;
    }
  }
}
