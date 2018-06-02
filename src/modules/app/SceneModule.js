import {
  Scene,
} from 'three';

const SYMBOL_CHILDREN_FOR_SCENE = Symbol('SYMBOL_CHILDREN_FOR_SCENE')

/**
 * @class SceneModule
 * @category modules/app
 * @param {Boolean} [willSceneBeReplaced=false] willSceneBeReplaced should be true only if you are going to overwrite scene dependency even without the use of default one.
 * @memberof module:modules/app
 */
export class SceneModule {
  constructor(willSceneBeReplaced = false) {
    this.scene = willSceneBeReplaced ? null : new Scene();
  }

  manager(manager) {
    manager.set('scene', this.scene);
  }

  integrate(self) {
    Object.assign(
      this,
      {
        async add(object) {
          if (object.parent) await object.parent.remove(object);
      
          await object.wait();
      
          if (!object.native) {
            throw new CompositionError(
              'SceneModule',
              'there is no object.native',
              this
            );
          }
      
          object.parent = this;
          await this.applyBridge({onAdd: object}).onAdd;
          self.scene.add(object.native);
          this.children.push(object);
      
          return object;
        },
        async remove(object) {
          if (object.parent !== this) return;
      
          await object.wait();
          this.applyBridge({onRemove: object});
      
          object.parent = null;
          self.scene.remove(object.native);
          this.children.splice(this.children.indexOf(object), 1);
        },
        _setScene(scene) {
          this.children = scene[SYMBOL_CHILDREN_FOR_SCENE] = scene[SYMBOL_CHILDREN_FOR_SCENE] || []
          self.scene = scene;
        },
        setScene(scene) {
          this._setScene(scene);
          this.manager.set('scene', scene);
        },
        getScene() {
          return self.scene;
        },
      },
    );
    if (self.scene) this._setScene(self.scene);
  }
}
