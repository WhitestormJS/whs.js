import {Vector3} from 'three';
import {ControlsModule} from '../ControlsModule';

import {ThreeOrbitControls} from './lib/ThreeOrbitControls';

export class OrbitControlsModule extends ControlsModule {
  constructor(params = {}) {
    super(params);

    this.params = Object.assign({
      follow: false,
      object: null,
      target: new Vector3(0, 0, 0)
    }, params);
  }

  manager(manager) {
    super.manager(manager);

    const {object: obj, follow, target} = this.params;
    const object = obj ? obj.native : manager.get('camera').native;

    const controls = new ThreeOrbitControls(
      object,
      manager.get('element'),
      manager.handler
    );

    const updateProcessor = follow ? c => {
      controls.update(c.getDelta());
      controls.target.copy(target);
    } : c => {
      controls.update(c.getDelta());
    };

    this.setControls(controls);
    this.setUpdate(updateProcessor);

    manager.update({
      camera: camera => {
        if (obj) return;
        controls.object = camera.native;
      }
    });

    controls.target.copy(target);
  }
}
