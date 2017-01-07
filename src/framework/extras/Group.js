import {Object3D} from 'three';
import {MeshComponent} from '../core/MeshComponent';

class Group extends MeshComponent {
  constructor(...objects) {
    super({});

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj instanceof Component) obj.addTo(this);
      else if (obj instanceof Object3D) this.native.add(obj);
    }
  }

  build() {
    return new Object3D();
  }
}

export {
  Group
};
