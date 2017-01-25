import {
  Scene
} from 'three';

export class SceneModule {
  constructor(willSceneBeReplaced = false) {
    this.scene = willSceneBeReplaced ? null : new Scene();
  }

  manager(manager) {
    manager.add('scene', this.scene, {alias: '$scene'});
  }

  integrate(params, self) {
    this.children = [];

    this.add = function (object) {
      object.parent = this;

      return new Promise((resolve, reject) => {
        object.defer(() => {
          const {native} = object;
          if (!native) reject();

          const addPromise = this.applyBridge({onAdd: object}).onAdd;

          const resolver = () => {
            self.scene.add(native);
            this.children.push(object);

            resolve(object);
          };

          if (addPromise instanceof Promise)
            addPromise.then(resolver);
          else resolver();
        });
      });
    };

    this.setScene = function (scene) {
      self.scene = scene;
      this.manager.set('scene', scene);
    };
  }
}
