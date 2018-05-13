/* Built for whs v2.1.9 */
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

    /**
     * @method addListener
     * @description Adds the listener of this audio source, usually the camera, origin of the user perspective
     * @param {Object} object The listener object
     * @memberof module:modules/extra.PositionalAudioModule
     */


    createClass(PositionalAudioModule, [{
      key: 'addListener',
      value: function addListener(object) {
        object.native.add(this.audioListener);
      }

      /**
       * @method play
       * @description Plays the given sound
       * @param {String} path The path to the sound file
       * @memberof module:modules/extra.PositionalAudioModule
       */

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

  return PositionalAudioModule;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVkaW9Nb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzL2V4dHJhL0F1ZGlvTW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBvc2l0aW9uYWxBdWRpbyxcbiAgQXVkaW9MaXN0ZW5lcixcbiAgQXVkaW9Mb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzcyBQb3NpdGlvbmFsQXVkaW9Nb2R1bGVcbiAqIEBjYXRlZ29yeSBtb2R1bGVzL2V4dHJhXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17bG9vcDogdHJ1ZX1dIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2V4dHJhXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Ib3cgdG8gY3JlYXRlIGFuZCBhcHBseSBhIFBvc2l0aW9uYWxBdWRpb01vZHVsZTwvY2FwdGlvbj5cbiAqIGNvbnN0IGZvZ01vZHVsZSA9IGNvbnN0IGF1ZGlvTW9kdWxlID0gbmV3IEF1ZGlvTW9kdWxlKHtcbiAqICAgbG9vcDogdHJ1ZVxuICogfSk7XG4gKlxuICogbmV3IFNwaGVyZSh7XG4gKiAgIC4uLixcbiAqICAgbW9kdWxlczogW1xuICogICAgIGF1ZGlvTW9kdWxlXG4qICAgIF1cbiAqIH07XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxBdWRpb01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGxvb3A6IHRydWVcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5hdWRpb0xpc3RlbmVyID0gbmV3IEF1ZGlvTGlzdGVuZXIoKTtcbiAgICB0aGlzLmF1ZGlvTG9hZGVyID0gbmV3IEF1ZGlvTG9hZGVyKCk7XG5cbiAgICB0aGlzLnBvc2l0aW9uYWxBdWRpbyA9IG5ldyBQb3NpdGlvbmFsQXVkaW8odGhpcy5hdWRpb0xpc3RlbmVyKTtcbiAgICB0aGlzLnBvc2l0aW9uYWxBdWRpby5zZXRMb29wKHRoaXMucGFyYW1zLmxvb3ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYWRkTGlzdGVuZXJcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgdGhlIGxpc3RlbmVyIG9mIHRoaXMgYXVkaW8gc291cmNlLCB1c3VhbGx5IHRoZSBjYW1lcmEsIG9yaWdpbiBvZiB0aGUgdXNlciBwZXJzcGVjdGl2ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBsaXN0ZW5lciBvYmplY3RcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2V4dHJhLlBvc2l0aW9uYWxBdWRpb01vZHVsZVxuICAgKi9cbiAgYWRkTGlzdGVuZXIob2JqZWN0KSB7XG4gICAgb2JqZWN0Lm5hdGl2ZS5hZGQodGhpcy5hdWRpb0xpc3RlbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHBsYXlcbiAgICogQGRlc2NyaXB0aW9uIFBsYXlzIHRoZSBnaXZlbiBzb3VuZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgc291bmQgZmlsZVxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOm1vZHVsZXMvZXh0cmEuUG9zaXRpb25hbEF1ZGlvTW9kdWxlXG4gICAqL1xuICBwbGF5KHBhdGgpIHtcbiAgICBjb25zdCBzb3VuZCA9IHRoaXMucG9zaXRpb25hbEF1ZGlvO1xuXG4gICAgdGhpcy5hdWRpb0xvYWRlci5sb2FkKHBhdGgsIGJ1ZmZlciA9PiB7XG4gICAgICBzb3VuZC5zZXRCdWZmZXIoYnVmZmVyKTtcbiAgICAgIHNvdW5kLnNldFJlZkRpc3RhbmNlKDUwKTtcbiAgICAgIHNvdW5kLnBsYXkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtZXNoKG1lc2gsIHNlbGYpIHtcbiAgICAgIG1lc2guYWRkKHNlbGYucG9zaXRpb25hbEF1ZGlvKTtcbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIlBvc2l0aW9uYWxBdWRpb01vZHVsZSIsInBhcmFtcyIsImJyaWRnZSIsIm1lc2giLCJzZWxmIiwiYWRkIiwicG9zaXRpb25hbEF1ZGlvIiwiT2JqZWN0IiwiYXNzaWduIiwibG9vcCIsImF1ZGlvTGlzdGVuZXIiLCJBdWRpb0xpc3RlbmVyIiwiYXVkaW9Mb2FkZXIiLCJBdWRpb0xvYWRlciIsIlBvc2l0aW9uYWxBdWRpbyIsInNldExvb3AiLCJvYmplY3QiLCJuYXRpdmUiLCJwYXRoIiwic291bmQiLCJsb2FkIiwic2V0QnVmZmVyIiwiYnVmZmVyIiwic2V0UmVmRGlzdGFuY2UiLCJwbGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQWlCcUJBO0VBQ25CLG1DQUF5QjtFQUFBLFFBQWJDLE1BQWEsdUVBQUosRUFBSTtFQUFBO0VBQUEsU0FzQ3pCQyxNQXRDeUIsR0FzQ2hCO0VBQ1BDLFVBRE8sZ0JBQ0ZBLEtBREUsRUFDSUMsSUFESixFQUNVO0VBQ2ZELGNBQUtFLEdBQUwsQ0FBU0QsS0FBS0UsZUFBZDtFQUNBLGVBQU9ILEtBQVA7RUFDRDtFQUpNLEtBdENnQjs7RUFDdkIsU0FBS0YsTUFBTCxHQUFjTSxPQUFPQyxNQUFQLENBQWM7RUFDMUJDLFlBQU07RUFEb0IsS0FBZCxFQUVYUixNQUZXLENBQWQ7O0VBSUEsU0FBS1MsYUFBTCxHQUFxQixJQUFJQyxtQkFBSixFQUFyQjtFQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMsaUJBQUosRUFBbkI7O0VBRUEsU0FBS1AsZUFBTCxHQUF1QixJQUFJUSxxQkFBSixDQUFvQixLQUFLSixhQUF6QixDQUF2QjtFQUNBLFNBQUtKLGVBQUwsQ0FBcUJTLE9BQXJCLENBQTZCLEtBQUtkLE1BQUwsQ0FBWVEsSUFBekM7RUFDRDs7RUFFRDs7Ozs7Ozs7OztrQ0FNWU8sUUFBUTtFQUNsQkEsYUFBT0MsTUFBUCxDQUFjWixHQUFkLENBQWtCLEtBQUtLLGFBQXZCO0VBQ0Q7O0VBRUQ7Ozs7Ozs7OzsyQkFNS1EsTUFBTTtFQUNULFVBQU1DLFFBQVEsS0FBS2IsZUFBbkI7O0VBRUEsV0FBS00sV0FBTCxDQUFpQlEsSUFBakIsQ0FBc0JGLElBQXRCLEVBQTRCLGtCQUFVO0VBQ3BDQyxjQUFNRSxTQUFOLENBQWdCQyxNQUFoQjtFQUNBSCxjQUFNSSxjQUFOLENBQXFCLEVBQXJCO0VBQ0FKLGNBQU1LLElBQU47RUFDRCxPQUpEO0VBS0Q7Ozs7Ozs7Ozs7OyJ9
