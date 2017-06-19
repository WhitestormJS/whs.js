import {
  AnimationMixer,
  AnimationClip,
  Clock
} from 'three';

import {Loop} from '../../core/Loop';

export class AnimationModule {
  constructor(app, isDeferred, params = {}) {
    this.params = Object.assign({
      speed: 1
    }, params);
    this.clock = new Clock();

    this.app = app;
    this.isDeferred = isDeferred;
  }

  play(clipName) {
    const clip = AnimationClip.findByName(this.clips, clipName);
    const action = this.mixer.clipAction(clip);

    action.play();
  }

  update() {
    if (this.mixer) this.mixer.update(this.clock.getDelta() * this.params.speed);
  }

  integrate(self) {
    self.loop = new Loop(() => {
      self.update();
    });

    if (!self.isDeferred) self.loop.start(self.app);
  }

  manager(manager) {
    manager.add('animation', this);
  }

  bridge = {
    mesh(mesh, self) {
      mesh.geometry.skeleton = mesh.skeleton;

      self.mixer = new AnimationMixer(mesh.geometry);
      self.clips = mesh.geometry.animations;

      return mesh;
    }
  }
}
