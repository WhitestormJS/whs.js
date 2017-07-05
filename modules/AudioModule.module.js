/* Built for whs v1.0.0 */
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
    key: 'playAudio',
    value: function playAudio(path) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVkaW9Nb2R1bGUubW9kdWxlLmpzIiwic291cmNlcyI6WyJzcmMvQXVkaW9Nb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUG9zaXRpb25hbEF1ZGlvLFxuICBBdWRpb0xpc3RlbmVyLFxuICBBdWRpb0xvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxBdWRpb01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGxvb3A6IHRydWVcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5hdWRpb0xpc3RlbmVyID0gbmV3IEF1ZGlvTGlzdGVuZXIoKTtcbiAgICB0aGlzLmF1ZGlvTG9hZGVyID0gbmV3IEF1ZGlvTG9hZGVyKCk7XG5cbiAgICB0aGlzLnBvc2l0aW9uYWxBdWRpbyA9IG5ldyBQb3NpdGlvbmFsQXVkaW8odGhpcy5hdWRpb0xpc3RlbmVyKTtcbiAgICB0aGlzLnBvc2l0aW9uYWxBdWRpby5zZXRMb29wKHRoaXMucGFyYW1zLmxvb3ApO1xuICB9XG5cbiAgYWRkTGlzdGVuZXIob2JqZWN0KSB7XG4gICAgb2JqZWN0Lm5hdGl2ZS5hZGQodGhpcy5hdWRpb0xpc3RlbmVyKTtcbiAgfTtcblxuICBwbGF5QXVkaW8ocGF0aCkge1xuICAgIGNvbnN0IHNvdW5kID0gdGhpcy5wb3NpdGlvbmFsQXVkaW87XG5cbiAgICB0aGlzLmF1ZGlvTG9hZGVyLmxvYWQocGF0aCwgYnVmZmVyID0+IHtcbiAgICAgIHNvdW5kLnNldEJ1ZmZlcihidWZmZXIpO1xuICAgICAgc291bmQuc2V0UmVmRGlzdGFuY2UoNTApO1xuICAgICAgc291bmQucGxheSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGJyaWRnZSA9IHtcbiAgICBtZXNoKG1lc2gsIHNlbGYpIHtcbiAgICAgIG1lc2guYWRkKHNlbGYucG9zaXRpb25hbEF1ZGlvKTtcbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIlBvc2l0aW9uYWxBdWRpb01vZHVsZSIsInBhcmFtcyIsImJyaWRnZSIsIm1lc2giLCJzZWxmIiwiYWRkIiwicG9zaXRpb25hbEF1ZGlvIiwiT2JqZWN0IiwiYXNzaWduIiwiYXVkaW9MaXN0ZW5lciIsIkF1ZGlvTGlzdGVuZXIiLCJhdWRpb0xvYWRlciIsIkF1ZGlvTG9hZGVyIiwiUG9zaXRpb25hbEF1ZGlvIiwic2V0TG9vcCIsImxvb3AiLCJvYmplY3QiLCJuYXRpdmUiLCJwYXRoIiwic291bmQiLCJsb2FkIiwic2V0QnVmZmVyIiwiYnVmZmVyIiwic2V0UmVmRGlzdGFuY2UiLCJwbGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNcUJBO21DQUNNO1FBQWJDLE1BQWEsdUVBQUosRUFBSTs7U0EwQnpCQyxNQTFCeUIsR0EwQmhCO1VBQUEsZ0JBQ0ZDLEtBREUsRUFDSUMsSUFESixFQUNVO2NBQ1ZDLEdBQUwsQ0FBU0QsS0FBS0UsZUFBZDtlQUNPSCxLQUFQOztLQTdCcUI7O1NBQ2xCRixNQUFMLEdBQWNNLE9BQU9DLE1BQVAsQ0FBYztZQUNwQjtLQURNLEVBRVhQLE1BRlcsQ0FBZDs7U0FJS1EsYUFBTCxHQUFxQixJQUFJQyxhQUFKLEVBQXJCO1NBQ0tDLFdBQUwsR0FBbUIsSUFBSUMsV0FBSixFQUFuQjs7U0FFS04sZUFBTCxHQUF1QixJQUFJTyxlQUFKLENBQW9CLEtBQUtKLGFBQXpCLENBQXZCO1NBQ0tILGVBQUwsQ0FBcUJRLE9BQXJCLENBQTZCLEtBQUtiLE1BQUwsQ0FBWWMsSUFBekM7Ozs7O2dDQUdVQyxRQUFRO2FBQ1hDLE1BQVAsQ0FBY1osR0FBZCxDQUFrQixLQUFLSSxhQUF2Qjs7Ozs4QkFHUVMsTUFBTTtVQUNSQyxRQUFRLEtBQUtiLGVBQW5COztXQUVLSyxXQUFMLENBQWlCUyxJQUFqQixDQUFzQkYsSUFBdEIsRUFBNEIsa0JBQVU7Y0FDOUJHLFNBQU4sQ0FBZ0JDLE1BQWhCO2NBQ01DLGNBQU4sQ0FBcUIsRUFBckI7Y0FDTUMsSUFBTjtPQUhGOzs7Ozs7OzsifQ==
