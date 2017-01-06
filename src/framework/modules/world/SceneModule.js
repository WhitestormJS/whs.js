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
    this.add = function (object) {
      object.parent = this;

      return new Promise((resolve, reject) => {
        const _add = () => {
          const {native, parent} = object;
          if (!native) reject();

          this.applyBridge({onAdd: object});

          self.scene.add(native);
          resolve(object);
        };

        if (object._wait.length > 0) Promise.all(object._wait).then(_add);
        else _add();
      });
    }
  }
}
