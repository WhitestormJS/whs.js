import THREE from 'three';
import Shape from '../core/Shape';

class Group extends Shape {
  constructor() {
    super({}, 'group');

    super.setNative(new Object3D());
    super.wrap();
  }
}

export {
  Group as default
};
