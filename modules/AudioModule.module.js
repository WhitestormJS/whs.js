/* Built for whs v2.1.9 */
import { AudioListener, AudioLoader, PositionalAudio } from 'three';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var PositionalAudioModule = function () {
  function PositionalAudioModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, PositionalAudioModule);
    this.bridge = {
      mesh: function mesh(_mesh, self) {
        _mesh.add(self.positionalAudio);
        return _mesh;
      }
    };

    this.params = Object.assign({
      loop: true
    }, params);

    this.audioListener = new AudioListener();
    this.audioLoader = new AudioLoader();

    this.positionalAudio = new PositionalAudio(this.audioListener);
    this.positionalAudio.setLoop(this.params.loop);
  }

  createClass(PositionalAudioModule, [{
    key: 'addListener',
    value: function addListener(object) {
      object.native.add(this.audioListener);
    }
  }, {
    key: 'play',
    value: function play(path) {
      var sound = this.positionalAudio;

      this.audioLoader.load(path, function (buffer) {
        sound.setBuffer(buffer);
        sound.setRefDistance(50);
        sound.play();
      });
    }
  }]);
  return PositionalAudioModule;
}();

export default PositionalAudioModule;
//# sourceMappingURL=AudioModule.module.js.map
