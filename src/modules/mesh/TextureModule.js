import {
  RepeatWrapping,
  UVMapping,
  NearestFilter,
  LinearMipMapLinearFilter,
  TextureLoader,
  Vector2
} from 'three';

const loader = new TextureLoader();

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

      return material;
    }
  }
}
