import {Vector3} from 'three';
import {ControlsModule} from '../ControlsModule';

import {ThreeOrbitControls} from './lib/ThreeOrbitControls';

export class OrbitControlsModule extends ControlsModule {
  constructor(params = {}, patchEvents = true) {
    super(params, patchEvents);

    this.params = Object.assign({
      follow: false,
      target: new Vector3(0, 0, 0)
    }, params);
  }

  manager(manager) {
    const controls = new ThreeOrbitControls(
      manager.get('camera').native,
      manager.get('element'),
      manager.handler
    );

    const {params} = this;

    const updateProcessor = params.follow ? c => {
      controls.update(c.getDelta());
      controls.target.copy(params.target);
    } : c => {
      controls.update(c.getDelta());
    };

    this.setControls(controls);
    this.setUpdate(updateProcessor);

    manager.update({
      camera: camera => {
        controls.object = camera.native;
      }
    });

    controls.target.copy(params.target);
  }
}
