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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVkaW9Nb2R1bGUubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS9BdWRpb01vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQb3NpdGlvbmFsQXVkaW8sXG4gIEF1ZGlvTGlzdGVuZXIsXG4gIEF1ZGlvTG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3MgUG9zaXRpb25hbEF1ZGlvTW9kdWxlXG4gKiBAY2F0ZWdvcnkgbW9kdWxlcy9leHRyYVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e2xvb3A6IHRydWV9XSAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9leHRyYVxuICogQGV4YW1wbGUgPGNhcHRpb24+SG93IHRvIGNyZWF0ZSBhbmQgYXBwbHkgYSBQb3NpdGlvbmFsQXVkaW9Nb2R1bGU8L2NhcHRpb24+XG4gKiBjb25zdCBmb2dNb2R1bGUgPSBjb25zdCBhdWRpb01vZHVsZSA9IG5ldyBBdWRpb01vZHVsZSh7XG4gKiAgIGxvb3A6IHRydWVcbiAqIH0pO1xuICpcbiAqIG5ldyBTcGhlcmUoe1xuICogICAuLi4sXG4gKiAgIG1vZHVsZXM6IFtcbiAqICAgICBhdWRpb01vZHVsZVxuKiAgICBdXG4gKiB9O1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbmFsQXVkaW9Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBsb29wOiB0cnVlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuYXVkaW9MaXN0ZW5lciA9IG5ldyBBdWRpb0xpc3RlbmVyKCk7XG4gICAgdGhpcy5hdWRpb0xvYWRlciA9IG5ldyBBdWRpb0xvYWRlcigpO1xuXG4gICAgdGhpcy5wb3NpdGlvbmFsQXVkaW8gPSBuZXcgUG9zaXRpb25hbEF1ZGlvKHRoaXMuYXVkaW9MaXN0ZW5lcik7XG4gICAgdGhpcy5wb3NpdGlvbmFsQXVkaW8uc2V0TG9vcCh0aGlzLnBhcmFtcy5sb29wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFkZExpc3RlbmVyXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIHRoZSBsaXN0ZW5lciBvZiB0aGlzIGF1ZGlvIHNvdXJjZSwgdXN1YWxseSB0aGUgY2FtZXJhLCBvcmlnaW4gb2YgdGhlIHVzZXIgcGVyc3BlY3RpdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgbGlzdGVuZXIgb2JqZWN0XG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6bW9kdWxlcy9leHRyYS5Qb3NpdGlvbmFsQXVkaW9Nb2R1bGVcbiAgICovXG4gIGFkZExpc3RlbmVyKG9iamVjdCkge1xuICAgIG9iamVjdC5uYXRpdmUuYWRkKHRoaXMuYXVkaW9MaXN0ZW5lcik7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBwbGF5XG4gICAqIEBkZXNjcmlwdGlvbiBQbGF5cyB0aGUgZ2l2ZW4gc291bmRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIHNvdW5kIGZpbGVcbiAgICogQG1lbWJlcm9mIG1vZHVsZTptb2R1bGVzL2V4dHJhLlBvc2l0aW9uYWxBdWRpb01vZHVsZVxuICAgKi9cbiAgcGxheShwYXRoKSB7XG4gICAgY29uc3Qgc291bmQgPSB0aGlzLnBvc2l0aW9uYWxBdWRpbztcblxuICAgIHRoaXMuYXVkaW9Mb2FkZXIubG9hZChwYXRoLCBidWZmZXIgPT4ge1xuICAgICAgc291bmQuc2V0QnVmZmVyKGJ1ZmZlcik7XG4gICAgICBzb3VuZC5zZXRSZWZEaXN0YW5jZSg1MCk7XG4gICAgICBzb3VuZC5wbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWVzaChtZXNoLCBzZWxmKSB7XG4gICAgICBtZXNoLmFkZChzZWxmLnBvc2l0aW9uYWxBdWRpbyk7XG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJQb3NpdGlvbmFsQXVkaW9Nb2R1bGUiLCJwYXJhbXMiLCJicmlkZ2UiLCJtZXNoIiwic2VsZiIsImFkZCIsInBvc2l0aW9uYWxBdWRpbyIsIk9iamVjdCIsImFzc2lnbiIsImxvb3AiLCJhdWRpb0xpc3RlbmVyIiwiQXVkaW9MaXN0ZW5lciIsImF1ZGlvTG9hZGVyIiwiQXVkaW9Mb2FkZXIiLCJQb3NpdGlvbmFsQXVkaW8iLCJzZXRMb29wIiwib2JqZWN0IiwibmF0aXZlIiwicGF0aCIsInNvdW5kIiwibG9hZCIsInNldEJ1ZmZlciIsImJ1ZmZlciIsInNldFJlZkRpc3RhbmNlIiwicGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFpQnFCQTtFQUNuQixtQ0FBeUI7RUFBQSxRQUFiQyxNQUFhLHVFQUFKLEVBQUk7RUFBQTtFQUFBLFNBc0N6QkMsTUF0Q3lCLEdBc0NoQjtFQUNQQyxVQURPLGdCQUNGQSxLQURFLEVBQ0lDLElBREosRUFDVTtFQUNmRCxjQUFLRSxHQUFMLENBQVNELEtBQUtFLGVBQWQ7RUFDQSxlQUFPSCxLQUFQO0VBQ0Q7RUFKTSxLQXRDZ0I7O0VBQ3ZCLFNBQUtGLE1BQUwsR0FBY00sT0FBT0MsTUFBUCxDQUFjO0VBQzFCQyxZQUFNO0VBRG9CLEtBQWQsRUFFWFIsTUFGVyxDQUFkOztFQUlBLFNBQUtTLGFBQUwsR0FBcUIsSUFBSUMsbUJBQUosRUFBckI7RUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQUlDLGlCQUFKLEVBQW5COztFQUVBLFNBQUtQLGVBQUwsR0FBdUIsSUFBSVEscUJBQUosQ0FBb0IsS0FBS0osYUFBekIsQ0FBdkI7RUFDQSxTQUFLSixlQUFMLENBQXFCUyxPQUFyQixDQUE2QixLQUFLZCxNQUFMLENBQVlRLElBQXpDO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7a0NBTVlPLFFBQVE7RUFDbEJBLGFBQU9DLE1BQVAsQ0FBY1osR0FBZCxDQUFrQixLQUFLSyxhQUF2QjtFQUNEOztFQUVEOzs7Ozs7Ozs7MkJBTUtRLE1BQU07RUFDVCxVQUFNQyxRQUFRLEtBQUtiLGVBQW5COztFQUVBLFdBQUtNLFdBQUwsQ0FBaUJRLElBQWpCLENBQXNCRixJQUF0QixFQUE0QixrQkFBVTtFQUNwQ0MsY0FBTUUsU0FBTixDQUFnQkMsTUFBaEI7RUFDQUgsY0FBTUksY0FBTixDQUFxQixFQUFyQjtFQUNBSixjQUFNSyxJQUFOO0VBQ0QsT0FKRDtFQUtEOzs7Ozs7Ozs7OzsifQ==
