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

  constructor({url, offset = new Vector2(0, 0), repeat = new Vector2(1, 1)}) {
    const texture = loader.load(url);

    texture.wrapS = texture.wrapT = RepeatWrapping;

    texture.offset.copy(offset);
    texture.repeat.copy(repeat);

    texture.magFilter = NearestFilter;
    texture.minFilter = LinearMipMapLinearFilter;

    this.texture = texture;
  }

  bridge = {
    material(material, self) {
      material.map = self.texture;

      return material;
    }
  }
}
