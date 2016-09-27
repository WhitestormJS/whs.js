import * as THREE from 'three';
import {Component} from '../core/Component';
import MeshComponent from '../core/MeshComponent';

@MeshComponent
class Group extends Component {
  constructor(...objects) {
    super({}, Group.defaults);

    super.native = new THREE.Object3D();
    super.wrap();

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj instanceof Component) obj.addTo(this);
      else if (obj instanceof THREE.Object3D) this.native.add(obj);
    }
  }
}

export {
  Group
};
