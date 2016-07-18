import * as THREE from 'three';
import {Shape} from '../core/Shape';
import {WHSObject} from '../core/Object';

class Group extends Shape {
  constructor(...objects) {
    super({}, 'group');

    super.setNative(new THREE.Object3D());
    super.wrap();

    for (let i = 0; i < objects.length; i++) {
    	const obj = objects[i];

    	if (obj instanceof WHSObject) obj.addTo(this);
    	else if (obj instanceof THREE.Object3D) this.getNative().add(obj);
    }
  }
}

export {
  Group
};
