/* Built for whs v1.0.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define(['three'], factory) :
	(global.AudioModule = factory(global.THREE));
}(this, (function (three) { 'use strict';

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

    this.audioListener = new three.AudioListener();
    this.audioLoader = new three.AudioLoader();

    this.positionalAudio = new three.PositionalAudio(this.audioListener);
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

return PositionalAudioModule;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVkaW9Nb2R1bGUuanMiLCJzb3VyY2VzIjpbInNyYy9BdWRpb01vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQb3NpdGlvbmFsQXVkaW8sXG4gIEF1ZGlvTGlzdGVuZXIsXG4gIEF1ZGlvTG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb25hbEF1ZGlvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbG9vcDogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmF1ZGlvTGlzdGVuZXIgPSBuZXcgQXVkaW9MaXN0ZW5lcigpO1xuICAgIHRoaXMuYXVkaW9Mb2FkZXIgPSBuZXcgQXVkaW9Mb2FkZXIoKTtcblxuICAgIHRoaXMucG9zaXRpb25hbEF1ZGlvID0gbmV3IFBvc2l0aW9uYWxBdWRpbyh0aGlzLmF1ZGlvTGlzdGVuZXIpO1xuICAgIHRoaXMucG9zaXRpb25hbEF1ZGlvLnNldExvb3AodGhpcy5wYXJhbXMubG9vcCk7XG4gIH1cblxuICBhZGRMaXN0ZW5lcihvYmplY3QpIHtcbiAgICBvYmplY3QubmF0aXZlLmFkZCh0aGlzLmF1ZGlvTGlzdGVuZXIpO1xuICB9O1xuXG4gIHBsYXlBdWRpbyhwYXRoKSB7XG4gICAgY29uc3Qgc291bmQgPSB0aGlzLnBvc2l0aW9uYWxBdWRpbztcblxuICAgIHRoaXMuYXVkaW9Mb2FkZXIubG9hZChwYXRoLCBidWZmZXIgPT4ge1xuICAgICAgc291bmQuc2V0QnVmZmVyKGJ1ZmZlcik7XG4gICAgICBzb3VuZC5zZXRSZWZEaXN0YW5jZSg1MCk7XG4gICAgICBzb3VuZC5wbGF5KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgYnJpZGdlID0ge1xuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgbWVzaC5hZGQoc2VsZi5wb3NpdGlvbmFsQXVkaW8pO1xuICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiUG9zaXRpb25hbEF1ZGlvTW9kdWxlIiwicGFyYW1zIiwiYnJpZGdlIiwibWVzaCIsInNlbGYiLCJhZGQiLCJwb3NpdGlvbmFsQXVkaW8iLCJPYmplY3QiLCJhc3NpZ24iLCJhdWRpb0xpc3RlbmVyIiwiQXVkaW9MaXN0ZW5lciIsImF1ZGlvTG9hZGVyIiwiQXVkaW9Mb2FkZXIiLCJQb3NpdGlvbmFsQXVkaW8iLCJzZXRMb29wIiwibG9vcCIsIm9iamVjdCIsIm5hdGl2ZSIsInBhdGgiLCJzb3VuZCIsImxvYWQiLCJzZXRCdWZmZXIiLCJidWZmZXIiLCJzZXRSZWZEaXN0YW5jZSIsInBsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNcUJBO21DQUNNO1FBQWJDLE1BQWEsdUVBQUosRUFBSTs7U0EwQnpCQyxNQTFCeUIsR0EwQmhCO1VBQUEsZ0JBQ0ZDLEtBREUsRUFDSUMsSUFESixFQUNVO2NBQ1ZDLEdBQUwsQ0FBU0QsS0FBS0UsZUFBZDtlQUNPSCxLQUFQOztLQTdCcUI7O1NBQ2xCRixNQUFMLEdBQWNNLE9BQU9DLE1BQVAsQ0FBYztZQUNwQjtLQURNLEVBRVhQLE1BRlcsQ0FBZDs7U0FJS1EsYUFBTCxHQUFxQixJQUFJQyxtQkFBSixFQUFyQjtTQUNLQyxXQUFMLEdBQW1CLElBQUlDLGlCQUFKLEVBQW5COztTQUVLTixlQUFMLEdBQXVCLElBQUlPLHFCQUFKLENBQW9CLEtBQUtKLGFBQXpCLENBQXZCO1NBQ0tILGVBQUwsQ0FBcUJRLE9BQXJCLENBQTZCLEtBQUtiLE1BQUwsQ0FBWWMsSUFBekM7Ozs7O2dDQUdVQyxRQUFRO2FBQ1hDLE1BQVAsQ0FBY1osR0FBZCxDQUFrQixLQUFLSSxhQUF2Qjs7Ozs4QkFHUVMsTUFBTTtVQUNSQyxRQUFRLEtBQUtiLGVBQW5COztXQUVLSyxXQUFMLENBQWlCUyxJQUFqQixDQUFzQkYsSUFBdEIsRUFBNEIsa0JBQVU7Y0FDOUJHLFNBQU4sQ0FBZ0JDLE1BQWhCO2NBQ01DLGNBQU4sQ0FBcUIsRUFBckI7Y0FDTUMsSUFBTjtPQUhGOzs7Ozs7Ozs7Ozs7In0=
