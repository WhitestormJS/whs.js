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
    this.audioLoader = new AudioLoader();

    this.positionalAudio = new PositionalAudio(this.audioListener);
    this.positionalAudio.setLoop(this.params.loop);
  }

  addListener(object) {
    object.native.add(this.audioListener);
  };

  playAudio(path) {
    const sound = this.positionalAudio;

    this.audioLoader.load(path, buffer => {
      sound.setBuffer(buffer);
      sound.setRefDistance(50);
      sound.play();
    });
  };

  }
}
