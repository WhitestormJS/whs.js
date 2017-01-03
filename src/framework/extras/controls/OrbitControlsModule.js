import { ThreeOrbitControls } from './lib/ThreeOrbitControls';
import { Vector3 } from 'three';

export class OrbitControlsModule {
  constructor(params = {}) {
    this.params = Object.assign({
      target: new Vector3(0, 0, 0),
      follow: false
    }, params);
  }

  manager(manager) {
    this.controls = new ThreeOrbitControls(
      manager.get('camera').native,
      manager.get('rendering').$renderer.domElement
    );

    manager.onDependencyUpdate({
      camera: (camera) => {
        this.controls.object = camera.native;
      }
    })
  }

  integrate(params, self) {
    const controls = self.controls;

    const updateProcessor = params.follow ? (c) => {
      controls.update(c.getDelta());
      controls.target.copy(params.target);
    } : (c) => {
      controls.update(c.getDelta());
    };

    self.updateLoop = new WHS.Loop(updateProcessor).start(this);

    controls.target.copy(params.target);
  }
}
