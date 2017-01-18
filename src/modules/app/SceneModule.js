import {
  Scene
} from 'three';

export class SceneModule {
  constructor() {
    this.scene = new Scene();
  }

  manager(manager) {
    manager.addDependency('scene', this.scene, {alias: '$scene'});
  }

  integrate(params, self) {
    this.children = [];

    this.add = function (object) {
      object.parent = this;

      return new Promise((resolve, reject) => {
        const _add = () => {
          const {native} = object;
          if (!native) reject();

          const addPromise = this.applyBridge({onAdd: object}).onAdd;

          const resolver = () => {
            self.scene.add(native);
            this.children.push(object);

            resolve(object);
          };

          if (addPromise instanceof Promise) {
            addPromise.then(resolver);
          } else resolver();
        };

        if (object._wait.length > 0) Promise.all(object._wait).then(_add);
        else _add();
      });
    }
  }
}
