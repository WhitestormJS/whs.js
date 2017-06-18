import {
  AnimationMixer,
  AnimationClip,
  Clock
} from 'three';

export class AnimationModule {
  constructor(params = {}) {
    this.params = Object.assign(params);
    this.clock = new Clock();
  }

  play(clipName) {
    const clip = AnimationClip.findByName(this.clips, clipName);
    const action = this.mixer.clipAction(clip);
    action.play();
  }

  update() {
    if (this.mixer) this.mixer.update(this.clock.getDelta());
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
