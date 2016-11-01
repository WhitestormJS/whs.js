import {
  RepeatWrapping,
  NearestFilter,
  LinearMipMapLinearFilter
} from 'three';

import {TextureLoader} from './loaders';
import {extend} from './extend';

export const texture = (url, repeat = {}) => {
  const texture = TextureLoader.load(url);

  if (repeat) {
    const opt = extend(repeat, {
      offset: {
        x: 0,
        y: 0
      },
      repeat: {
        x: 1,
        y: 1
      }
    });

    texture.wrapS = texture.wrapT = RepeatWrapping;

    texture.offset.set(opt.offset.x, opt.offset.y);
    texture.repeat.set(opt.repeat.x, opt.repeat.y);

    texture.magFilter = NearestFilter;
    texture.minFilter = LinearMipMapLinearFilter;
  }

  return texture;
};
