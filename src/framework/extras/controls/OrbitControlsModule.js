import { ThreeOrbitControls } from './lib/ThreeOrbitControls';
import { Vector3 } from 'three';

export class OrbitControlsModule {
  constructor(params = {}) {
    this.params = Object.assign({
      target: new Vector3(0, 0, 0),
      follow: false
    }, params);
  }

  integrate(params, self) {
    const controls = new ThreeOrbitControls(
      this.$camera.native,
      this.$rendering.$renderer.domElement
    );

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
