import {
  Scene,
  // Fog,
  // FogExp2
} from 'three';

export class SceneModule {
  integrate() {
    this.$scene = new Scene();

    console.log(this);

    this.add = function (object) {
      object.parent = this;

      return new Promise((resolve, reject) => {
        const _add = () => {
          const {native, params, parent} = object;

          if (!native) reject();

          const parentNative = '$scene' in parent ? parent.$scene : parent.native;
          const modules = this.modules;

          for (let i = 0, max = modules.length; i < max; i++) {
            if (modules[i].bridge && modules[i].bridge.onAdd) {
              modules[i].bridge.onAdd.apply(this, [object, modules[i]]);
            }
          }

          parentNative.add(native);

          if (typeof params.helpers === 'undefined')
            params.helpers = {};

          for (const key in object._helpers)
            if (object._helpers[key]) parentNative.add(object._helpers[key]);

          object.callAddTo(object);
          resolve(object);
        };

        if (object._wait.length > 0) Promise.all(object._wait).then(_add);
        else _add();
      });
    }
  }
}
