import * as THREE from 'three';
import {Shape} from '../core/Shape';

class Group extends Shape {
  constructor() {
    super({}, 'group');

    super.setNative(new THREE.Object3D());
    super.wrap();
  }
}

export {
  Group
};
