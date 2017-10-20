/* Built for whs v2.1.8-vrfix.3 */
import { Vector3 } from 'three';

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
    this.offset = new Vector3();
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

export default DragModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ01vZHVsZS5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzL2V4dHJhL0RyYWdNb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWZWN0b3IzfSBmcm9tICd0aHJlZSc7XG5cbmNsYXNzIE1lc2hEcmFnTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobW91c2UpIHtcbiAgICB0aGlzLm1vdXNlID0gbW91c2U7XG4gICAgdGhpcy5vZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuICB9XG5cbiAgcG9zdEludGVncmF0ZShzZWxmKSB7XG4gICAgdGhpcy5kZWZlcigoKSA9PiB7XG4gICAgICBjb25zdCB7bW91c2UsIG9mZnNldH0gPSBzZWxmO1xuICAgICAgbW91c2UudHJhY2sodGhpcyk7XG5cbiAgICAgIG9mZnNldC5jb3B5KHRoaXMucG9zaXRpb24pO1xuXG4gICAgICBsZXQgZHJhZ1Bvc3NpYmxlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgZHJhZ1Bvc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgb2Zmc2V0LmNvcHkodGhpcy5wb3NpdGlvbi5jbG9uZSgpLnN1Yihtb3VzZS5wcm9qZWN0KCkpKTtcbiAgICAgIH0pO1xuXG4gICAgICBtb3VzZS5vbignbW91c2V1cCcsICgpID0+IHtkcmFnUG9zc2libGUgPSBmYWxzZX0pO1xuXG4gICAgICBtb3VzZS5vbignbW92ZScsICgpID0+IHtcbiAgICAgICAgaWYgKGRyYWdQb3NzaWJsZSkgdGhpcy5wb3NpdGlvbi5jb3B5KG1vdXNlLnByb2plY3QoKS5hZGQob2Zmc2V0KSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb3VzZSA9IG51bGw7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnZHJhZycpO1xuICAgIHRoaXMubW91c2UgPSBtYW5hZ2VyLnVzZSgnbW91c2UnKTtcbiAgfVxuXG4gIG1lc2goKSB7XG4gICAgcmV0dXJuIG5ldyBNZXNoRHJhZ01vZHVsZSh0aGlzLm1vdXNlKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk1lc2hEcmFnTW9kdWxlIiwibW91c2UiLCJvZmZzZXQiLCJWZWN0b3IzIiwic2VsZiIsImRlZmVyIiwidHJhY2siLCJjb3B5IiwicG9zaXRpb24iLCJkcmFnUG9zc2libGUiLCJvbiIsImNsb25lIiwic3ViIiwicHJvamVjdCIsImFkZCIsIkRyYWdNb2R1bGUiLCJtYW5hZ2VyIiwiZGVmaW5lIiwidXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUE7MEJBQ1FDLEtBQVosRUFBbUI7OztTQUNaQSxLQUFMLEdBQWFBLEtBQWI7U0FDS0MsTUFBTCxHQUFjLElBQUlDLE9BQUosRUFBZDs7Ozs7a0NBR1lDLE1BQU07OztXQUNiQyxLQUFMLENBQVcsWUFBTTtZQUNSSixLQURRLEdBQ1NHLElBRFQsQ0FDUkgsS0FEUTtZQUNEQyxNQURDLEdBQ1NFLElBRFQsQ0FDREYsTUFEQzs7Y0FFVEksS0FBTjs7ZUFFT0MsSUFBUCxDQUFZLE1BQUtDLFFBQWpCOztZQUVJQyxlQUFlLEtBQW5COztjQUVLQyxFQUFMLENBQVEsV0FBUixFQUFxQixZQUFNO3lCQUNWLElBQWY7aUJBQ09ILElBQVAsQ0FBWSxNQUFLQyxRQUFMLENBQWNHLEtBQWQsR0FBc0JDLEdBQXRCLENBQTBCWCxNQUFNWSxPQUFOLEVBQTFCLENBQVo7U0FGRjs7Y0FLTUgsRUFBTixDQUFTLFNBQVQsRUFBb0IsWUFBTTt5QkFBZ0IsS0FBZjtTQUEzQjs7Y0FFTUEsRUFBTixDQUFTLE1BQVQsRUFBaUIsWUFBTTtjQUNqQkQsWUFBSixFQUFrQixNQUFLRCxRQUFMLENBQWNELElBQWQsQ0FBbUJOLE1BQU1ZLE9BQU4sR0FBZ0JDLEdBQWhCLENBQW9CWixNQUFwQixDQUFuQjtTQURwQjtPQWZGOzs7Ozs7SUFzQmlCYTt3QkFDTDs7O1NBQ1BkLEtBQUwsR0FBYSxJQUFiOzs7Ozs0QkFHTWUsVUFBUztlQUNQQyxNQUFSLENBQWUsTUFBZjtXQUNLaEIsS0FBTCxHQUFhZSxTQUFRRSxHQUFSLENBQVksT0FBWixDQUFiOzs7OzJCQUdLO2FBQ0UsSUFBSWxCLGNBQUosQ0FBbUIsS0FBS0MsS0FBeEIsQ0FBUDs7Ozs7Ozs7In0=
