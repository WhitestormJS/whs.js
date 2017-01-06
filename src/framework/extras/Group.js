import {Object3D} from 'three';
import {MeshComponent} from '../core/MeshComponent';

class Group extends MeshComponent {
  constructor(...objects) {
    super({}, Group.defaults);

    super.native = new Object3D();
    super.wrap();

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj instanceof Component) obj.addTo(this);
      else if (obj instanceof Object3D) this.native.add(obj);
    }
  }

  add(object) {
    object.parent = this;

    return new Promise((resolve, reject) => {
      const _add = () => {
        const {native, parent} = object;
        if (!native) reject();

        this.applyBridge({onAdd: object});

        this.native.add(native);
        resolve(object);
      };

      if (object._wait.length > 0) Promise.all(object._wait).then(_add);
      else _add();
    });
  }
}

export {
  Group
};
