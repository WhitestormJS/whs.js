import {
  Scene,
  // Fog,
  // FogExp2
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
          const {native, parent} = object;
          if (!native) reject();

          this.applyBridge({onAdd: object});

          self.scene.add(native);
          this.children.push(object);

          resolve(object);
        };

        if (object._wait.length > 0) Promise.all(object._wait).then(_add);
        else _add();
      });
    }
  }
}
