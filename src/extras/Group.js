import * as THREE from 'three';
import {Shape} from '../core/Shape';

class Group extends Shape {
  constructor(...objects) {
    super({}, 'group');

    super.setNative(new THREE.Object3D());
    super.wrap();

    for (let i = 0; i < objects.length; i++) {
    	objects[i].addTo(this);
    }
  }
}

export {
  Group
};
