import {
  AnimationMixer,
  AnimationClip
} from 'three';

import {Loop} from '../../core/Loop';

/**
 * @class AnimationModule
 * @category modules/mesh
 * @description Convenience module that wraps the <a href='https://threejs.org/docs/#manual/introduction/Animation-system'>three.js animation system</a>
 * @param {App} app - the app
 * @param {Boolean} [isDeferred=false] - set to true if animation should not start automatically
 * @param {Object} [params={speed: 1}] - the params
 * @memberof module:modules/mesh
 * @example <caption>Create animation module and play a given clip of an imported model</caption>
 * const animationModule = new AnimationModule(app, false, {
 *   speed: 1.2 // speed up animation by 20%
 * });
 *
 * new Importer({
 *   parser(geometry, materials) {
 *     // Override parse to generate a skinnedMesh, needed for skinned models
 *     return new THREE.SkinnedMesh(geometry, materials);
 *   },
 *
 *   url: `path/to/model.json`,
 *   useCustomMaterial: true,
 *
 *   material: new THREE.MeshStandardMaterial({
 *     skinning: true
 *   }),
 *
 *   modules: [animationModule]
 * }).addTo(app).then(() => {
 *   // adding model to app returns a promise, so pipe the function to kick off the animation clip
 *   animationModule.play('clipName');
 * });
 */
export class AnimationModule {
  constructor(app, isDeferred, params = {}) {
    this.params = Object.assign({
      speed: 1
    }, params);

    this.app = app;
    this.isDeferred = isDeferred;
  }

  /**
   * @method play
   * @instance
   * @description Plays the given clip name
   * @param {String} clipName - the clip to play
   * @return {THREE.AnimationAction} Playing action 
   * @memberof module:modules/mesh.AnimationModule
   */
  play(clipName) {
    const clip = AnimationClip.findByName(this.clips, clipName);
    return this.mixer.clipAction(clip).play();
  }

  /**
   * @method update
   * @instance
   * @description Update the mixer (being called on frame animation loop)
   * @param {Clock} clock - the loop's clock
   * @memberof module:modules/mesh.AnimationModule
   */
  update(clock) {
    if (this.mixer) this.mixer.update(clock.getDelta() * this.params.speed);
  }

  integrate(self) {
    self.loop = new Loop((clock) => self.update(clock));

    if (!self.isDeferred) self.loop.start(self.app);
  }

  manager(manager) {
    manager.define('animation');
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
