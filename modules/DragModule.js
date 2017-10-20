/* Built for whs v2.1.8-vrfix.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define(['three'], factory) :
	(global.DragModule = factory(global.THREE));
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

var MeshDragModule = function () {
  function MeshDragModule(mouse) {
    classCallCheck(this, MeshDragModule);

    this.mouse = mouse;
    this.offset = new three.Vector3();
  }

  createClass(MeshDragModule, [{
    key: 'postIntegrate',
    value: function postIntegrate(self) {
      var _this = this;

      this.defer(function () {
        var mouse = self.mouse,
            offset = self.offset;

        mouse.track(_this);

        offset.copy(_this.position);

        var dragPossible = false;

        _this.on('mousedown', function () {
          dragPossible = true;
          offset.copy(_this.position.clone().sub(mouse.project()));
        });

        mouse.on('mouseup', function () {
          dragPossible = false;
        });

        mouse.on('move', function () {
          if (dragPossible) _this.position.copy(mouse.project().add(offset));
        });
      });
    }
  }]);
  return MeshDragModule;
}();

var DragModule = function () {
  function DragModule() {
    classCallCheck(this, DragModule);

    this.mouse = null;
  }

  createClass(DragModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('drag');
      this.mouse = _manager.use('mouse');
    }
  }, {
    key: 'mesh',
    value: function mesh() {
      return new MeshDragModule(this.mouse);
    }
  }]);
  return DragModule;
}();

return DragModule;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ01vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZXMvZXh0cmEvRHJhZ01vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZlY3RvcjN9IGZyb20gJ3RocmVlJztcblxuY2xhc3MgTWVzaERyYWdNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihtb3VzZSkge1xuICAgIHRoaXMubW91c2UgPSBtb3VzZTtcbiAgICB0aGlzLm9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG4gIH1cblxuICBwb3N0SW50ZWdyYXRlKHNlbGYpIHtcbiAgICB0aGlzLmRlZmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHttb3VzZSwgb2Zmc2V0fSA9IHNlbGY7XG4gICAgICBtb3VzZS50cmFjayh0aGlzKTtcblxuICAgICAgb2Zmc2V0LmNvcHkodGhpcy5wb3NpdGlvbik7XG5cbiAgICAgIGxldCBkcmFnUG9zc2libGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICBkcmFnUG9zc2libGUgPSB0cnVlO1xuICAgICAgICBvZmZzZXQuY29weSh0aGlzLnBvc2l0aW9uLmNsb25lKCkuc3ViKG1vdXNlLnByb2plY3QoKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIG1vdXNlLm9uKCdtb3VzZXVwJywgKCkgPT4ge2RyYWdQb3NzaWJsZSA9IGZhbHNlfSk7XG5cbiAgICAgIG1vdXNlLm9uKCdtb3ZlJywgKCkgPT4ge1xuICAgICAgICBpZiAoZHJhZ1Bvc3NpYmxlKSB0aGlzLnBvc2l0aW9uLmNvcHkobW91c2UucHJvamVjdCgpLmFkZChvZmZzZXQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1vdXNlID0gbnVsbDtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdkcmFnJyk7XG4gICAgdGhpcy5tb3VzZSA9IG1hbmFnZXIudXNlKCdtb3VzZScpO1xuICB9XG5cbiAgbWVzaCgpIHtcbiAgICByZXR1cm4gbmV3IE1lc2hEcmFnTW9kdWxlKHRoaXMubW91c2UpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWVzaERyYWdNb2R1bGUiLCJtb3VzZSIsIm9mZnNldCIsIlZlY3RvcjMiLCJzZWxmIiwiZGVmZXIiLCJ0cmFjayIsImNvcHkiLCJwb3NpdGlvbiIsImRyYWdQb3NzaWJsZSIsIm9uIiwiY2xvbmUiLCJzdWIiLCJwcm9qZWN0IiwiYWRkIiwiRHJhZ01vZHVsZSIsIm1hbmFnZXIiLCJkZWZpbmUiLCJ1c2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUE7MEJBQ1FDLEtBQVosRUFBbUI7OztTQUNaQSxLQUFMLEdBQWFBLEtBQWI7U0FDS0MsTUFBTCxHQUFjLElBQUlDLGFBQUosRUFBZDs7Ozs7a0NBR1lDLE1BQU07OztXQUNiQyxLQUFMLENBQVcsWUFBTTtZQUNSSixLQURRLEdBQ1NHLElBRFQsQ0FDUkgsS0FEUTtZQUNEQyxNQURDLEdBQ1NFLElBRFQsQ0FDREYsTUFEQzs7Y0FFVEksS0FBTjs7ZUFFT0MsSUFBUCxDQUFZLE1BQUtDLFFBQWpCOztZQUVJQyxlQUFlLEtBQW5COztjQUVLQyxFQUFMLENBQVEsV0FBUixFQUFxQixZQUFNO3lCQUNWLElBQWY7aUJBQ09ILElBQVAsQ0FBWSxNQUFLQyxRQUFMLENBQWNHLEtBQWQsR0FBc0JDLEdBQXRCLENBQTBCWCxNQUFNWSxPQUFOLEVBQTFCLENBQVo7U0FGRjs7Y0FLTUgsRUFBTixDQUFTLFNBQVQsRUFBb0IsWUFBTTt5QkFBZ0IsS0FBZjtTQUEzQjs7Y0FFTUEsRUFBTixDQUFTLE1BQVQsRUFBaUIsWUFBTTtjQUNqQkQsWUFBSixFQUFrQixNQUFLRCxRQUFMLENBQWNELElBQWQsQ0FBbUJOLE1BQU1ZLE9BQU4sR0FBZ0JDLEdBQWhCLENBQW9CWixNQUFwQixDQUFuQjtTQURwQjtPQWZGOzs7Ozs7SUFzQmlCYTt3QkFDTDs7O1NBQ1BkLEtBQUwsR0FBYSxJQUFiOzs7Ozs0QkFHTWUsVUFBUztlQUNQQyxNQUFSLENBQWUsTUFBZjtXQUNLaEIsS0FBTCxHQUFhZSxTQUFRRSxHQUFSLENBQVksT0FBWixDQUFiOzs7OzJCQUdLO2FBQ0UsSUFBSWxCLGNBQUosQ0FBbUIsS0FBS0MsS0FBeEIsQ0FBUDs7Ozs7Ozs7Ozs7OyJ9
