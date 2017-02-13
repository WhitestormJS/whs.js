import {Vector3} from 'three';

import {Loop} from '../../core/Loop';
import {EventsPatchModule} from '../app/EventsPatchModule';
import {ThreeOrbitControls} from './lib/ThreeOrbitControls';

export class OrbitModule {
  constructor(params = {}, patchEvents = true) {
    this.params = Object.assign({
      target: new Vector3(0, 0, 0),
      follow: false
    }, params);

    this.patchEvents = patchEvents;
  }

  manager(manager) {
    this.controls = new ThreeOrbitControls(
      manager.get('camera').native,
      manager.get('element'),
      manager.handler
    );

    manager.update({
      camera: camera => {
        this.controls.object = camera.native;
      }
    });
  }

  integrate(self) {
    if (self.patchEvents) this.applyModuleOnce(EventsPatchModule, () => new EventsPatchModule());
    const {params, controls} = self;

    const updateProcessor = params.follow ? c => {
      controls.update(c.getDelta());
      controls.target.copy(params.target);
    } : c => {
      controls.update(c.getDelta());
    };

    self.updateLoop = new Loop(updateProcessor).start(this);

    controls.target.copy(params.target);
  }
}
