import {
  PositionalAudio,
  AudioListener,
  AudioLoader
} from 'three';

/**
 * @class PositionalAudioModule
 * @category modules/extra
 * @param {Object} [params={loop: true}] - The parameters object.
 * @memberof module:modules/extra
 * @example <caption>How to create and apply a PositionalAudioModule</caption>
 * const fogModule = const audioModule = new AudioModule({
 *   loop: true
 * });
 *
 * new Sphere({
 *   ...,
 *   modules: [
 *     audioModule
*    ]
 * };
 */
export default class PositionalAudioModule {
  constructor(params = {}) {
    this.params = Object.assign({
      loop: true
    }, params);

    this.audioListener = new AudioListener();
    this.audioLoader = new AudioLoader();

    this.positionalAudio = new PositionalAudio(this.audioListener);
    this.positionalAudio.setLoop(this.params.loop);
  }

  /**
   * @method addListener
   * @description Adds the listener of this audio source, usually the camera, origin of the user perspective
   * @param {Object} object The listener object
   * @memberof module:modules/extra.PositionalAudioModule
   */
  addListener(object) {
    object.native.add(this.audioListener);
  }

  /**
   * @method play
   * @description Plays the given sound
   * @param {String} path The path to the sound file
   * @memberof module:modules/extra.PositionalAudioModule
   */
  play(path) {
    const sound = this.positionalAudio;

    this.audioLoader.load(path, buffer => {
      sound.setBuffer(buffer);
      sound.setRefDistance(50);
      sound.play();
    });
  }

  bridge = {
    mesh(mesh, self) {
      mesh.add(self.positionalAudio);
      return mesh;
    }
  }
}
