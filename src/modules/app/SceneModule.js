import {
  Scene
} from 'three';

/**
 * @class SceneModule
 * @category Modules/App
 * @param {Boolean} [willSceneBeReplaced=false] willSceneBeReplaced should be true only if you are going to overwrite scene dependency even without the use of default one.
 * @memberof module:modules/app
 */
export class SceneModule {
  constructor(willSceneBeReplaced = false) {
    this.scene = willSceneBeReplaced ? null : new Scene();
  }

  manager(manager) {
    manager.add('scene', this.scene, {alias: '$scene'});
  }

  integrate(self) {
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

    this.remove = function (object) {
      object.parent = null;
      self.scene.remove(object.native);
    };

    this.setScene = function (scene) {
      self.scene = scene;
      this.manager.set('scene', scene);
    };
  }
}
