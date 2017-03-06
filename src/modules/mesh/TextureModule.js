import {
  RepeatWrapping,
  NearestFilter,
  LinearMipMapLinearFilter,
  TextureLoader,
  Vector2
} from 'three';

const loader = new TextureLoader();

export class TextureModule {
  static load(url) {
    return new TextureModule({url}).texture;
  }

  textures = [];

  constructor(...textures) {
    textures.forEach(({url, type = 'map', offset = new Vector2(0, 0), repeat = new Vector2(1, 1)}) => {
      const texture = loader.load(url);

      texture.wrapS = texture.wrapT = RepeatWrapping;

      texture.offset.copy(offset);
      texture.repeat.copy(repeat);

      texture.magFilter = NearestFilter;
      texture.minFilter = LinearMipMapLinearFilter;

      this.textures.push([type, texture]);
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
