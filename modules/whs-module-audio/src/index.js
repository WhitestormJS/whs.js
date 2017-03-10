import {
  PositionalAudio,
  AudioListener,
  AudioLoader
} from 'three';

export default class PositionalAudioModule {
  constructor(params = {}) {
    this.params = Object.assign({
      loop: true
    }, params);

    this.audioListener = new AudioListener();
    this.positionalAudio = new PositionalAudio(this.audioListener);
    this.positionalAudio.setLoop(this.params.loop);
    this.audioLoader = new AudioLoader();
  }

  integrate(self) {
    this.addAudioListener = function (cameraModule) {
      this.native.add(self.positionalAudio);
      cameraModule.camera.native.add(self.audioListener);
    };

    this.playAudio = function (path) {
      const sound = self.positionalAudio;

      self.audioLoader.load(path, buffer => {
        sound.setBuffer(buffer);
        sound.setRefDistance(50);
        sound.play();
      });
    };
  }
}
