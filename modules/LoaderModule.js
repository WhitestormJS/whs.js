/* Built for whs v2.1.8-vrfix.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LoaderModule = global.LoaderModule || {})));
}(this, (function (exports) { 'use strict';

var minivents_commonjs = function Events(target){
  var events = {}, empty = [];
  target = target || this;
  /**
   *  On: listen to events
   */
  target.on = function(type, func, ctx){
    (events[type] = events[type] || []).push([func, ctx]);
  };
  /**
   *  Off: stop listening to event / specific callback
   */
  target.off = function(type, func){
    type || (events = {});
    var list = events[type] || empty,
        i = list.length = func ? list.length : 0;
    while(i--) func == list[i][0] && list.splice(i,1);
  };
  /** 
   * Emit: send event, callbacks will be triggered
   */
  target.emit = function(type){
    var e = events[type] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i=0, j;
    while(j=list[i++]) j[0].apply(j[1], empty.slice.call(arguments, 1));
  };
};

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









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var LoaderModule = function (_Events) {
  inherits(LoaderModule, _Events);

  function LoaderModule() {
    classCallCheck(this, LoaderModule);

    var _this = possibleConstructorReturn(this, (LoaderModule.__proto__ || Object.getPrototypeOf(LoaderModule)).call(this));

    _this.promises = {};

    for (var _len = arguments.length, expecting = Array(_len), _key = 0; _key < _len; _key++) {
      expecting[_key] = arguments[_key];
    }

    _this.expecting = expecting;
    _this.resolved = [];
    return _this;
  }

  createClass(LoaderModule, [{
    key: 'expect',
    value: function expect(key) {
      this.expecting.push(key);
    }
  }, {
    key: 'resolve',
    value: function resolve(key) {
      if (this.expecting.includes(key)) {
        this.expecting = this.expecting.filter(function (item) {
          return item !== key;
        });
        this.resolved.push(key);
      }

      this.emit('step', key);

      if (this.getProgress() === 1) {
        this.emit('complete');
      }

      return this;
    }
  }, {
    key: 'promise',
    value: function promise(key, _promise) {
      var _this2 = this;

      _promise.then(function () {
        return _this2.resolve(key);
      });

      this.promises[key] = _promise;
      this.expect(key);

      return _promise;
    }
  }, {
    key: 'getProgress',
    value: function getProgress() {
      var el = this.expecting.length;
      var rl = this.resolved.length;

      return rl / (el + rl);
    }
  }]);
  return LoaderModule;
}(minivents_commonjs);

exports.LoaderModule = LoaderModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyTW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS9ub2RlX21vZHVsZXMvbWluaXZlbnRzL2Rpc3QvbWluaXZlbnRzLmNvbW1vbmpzLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvTG9hZGVyTW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRXZlbnRzKHRhcmdldCl7XG4gIHZhciBldmVudHMgPSB7fSwgZW1wdHkgPSBbXTtcbiAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHRoaXNcbiAgLyoqXG4gICAqICBPbjogbGlzdGVuIHRvIGV2ZW50c1xuICAgKi9cbiAgdGFyZ2V0Lm9uID0gZnVuY3Rpb24odHlwZSwgZnVuYywgY3R4KXtcbiAgICAoZXZlbnRzW3R5cGVdID0gZXZlbnRzW3R5cGVdIHx8IFtdKS5wdXNoKFtmdW5jLCBjdHhdKVxuICB9XG4gIC8qKlxuICAgKiAgT2ZmOiBzdG9wIGxpc3RlbmluZyB0byBldmVudCAvIHNwZWNpZmljIGNhbGxiYWNrXG4gICAqL1xuICB0YXJnZXQub2ZmID0gZnVuY3Rpb24odHlwZSwgZnVuYyl7XG4gICAgdHlwZSB8fCAoZXZlbnRzID0ge30pXG4gICAgdmFyIGxpc3QgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksXG4gICAgICAgIGkgPSBsaXN0Lmxlbmd0aCA9IGZ1bmMgPyBsaXN0Lmxlbmd0aCA6IDA7XG4gICAgd2hpbGUoaS0tKSBmdW5jID09IGxpc3RbaV1bMF0gJiYgbGlzdC5zcGxpY2UoaSwxKVxuICB9XG4gIC8qKiBcbiAgICogRW1pdDogc2VuZCBldmVudCwgY2FsbGJhY2tzIHdpbGwgYmUgdHJpZ2dlcmVkXG4gICAqL1xuICB0YXJnZXQuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICAgIHZhciBlID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LCBsaXN0ID0gZS5sZW5ndGggPiAwID8gZS5zbGljZSgwLCBlLmxlbmd0aCkgOiBlLCBpPTAsIGo7XG4gICAgd2hpbGUoaj1saXN0W2krK10pIGpbMF0uYXBwbHkoalsxXSwgZW1wdHkuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuICB9O1xufTsiLCJpbXBvcnQgRXZlbnRzIGZyb20gJ21pbml2ZW50cyc7XG5cbmV4cG9ydCBjbGFzcyBMb2FkZXJNb2R1bGUgZXh0ZW5kcyBFdmVudHMge1xuICBjb25zdHJ1Y3RvciguLi5leHBlY3RpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wcm9taXNlcyA9IHt9O1xuXG4gICAgdGhpcy5leHBlY3RpbmcgPSBleHBlY3Rpbmc7XG4gICAgdGhpcy5yZXNvbHZlZCA9IFtdO1xuICB9XG5cbiAgZXhwZWN0KGtleSkge1xuICAgIHRoaXMuZXhwZWN0aW5nLnB1c2goa2V5KTtcbiAgfVxuXG4gIHJlc29sdmUoa2V5KSB7XG4gICAgaWYgKHRoaXMuZXhwZWN0aW5nLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIHRoaXMuZXhwZWN0aW5nID0gdGhpcy5leHBlY3RpbmcuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0ga2V5KTtcbiAgICAgIHRoaXMucmVzb2x2ZWQucHVzaChrZXkpO1xuICAgIH1cblxuICAgIHRoaXMuZW1pdCgnc3RlcCcsIGtleSk7XG5cbiAgICBpZiAodGhpcy5nZXRQcm9ncmVzcygpID09PSAxKSB7XG4gICAgICB0aGlzLmVtaXQoJ2NvbXBsZXRlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcm9taXNlKGtleSwgcHJvbWlzZSkge1xuICAgIHByb21pc2UudGhlbigoKSA9PiB0aGlzLnJlc29sdmUoa2V5KSk7XG5cbiAgICB0aGlzLnByb21pc2VzW2tleV0gPSBwcm9taXNlO1xuICAgIHRoaXMuZXhwZWN0KGtleSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFByb2dyZXNzKCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5leHBlY3RpbmcubGVuZ3RoO1xuICAgIGNvbnN0IHJsID0gdGhpcy5yZXNvbHZlZC5sZW5ndGg7XG5cbiAgICByZXR1cm4gcmwgLyAoZWwgKyBybCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJMb2FkZXJNb2R1bGUiLCJwcm9taXNlcyIsImV4cGVjdGluZyIsInJlc29sdmVkIiwia2V5IiwicHVzaCIsImluY2x1ZGVzIiwiZmlsdGVyIiwiaXRlbSIsImVtaXQiLCJnZXRQcm9ncmVzcyIsInByb21pc2UiLCJ0aGVuIiwicmVzb2x2ZSIsImV4cGVjdCIsImVsIiwibGVuZ3RoIiwicmwiLCJFdmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxzQkFBYyxHQUFHLFNBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUN0QyxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztFQUM1QixNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUk7Ozs7RUFJdkIsTUFBTSxDQUFDLEVBQUUsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ25DLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFDO0lBQ3REOzs7O0VBSUQsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLENBQUM7SUFDL0IsSUFBSSxLQUFLLE1BQU0sR0FBRyxFQUFFLEVBQUM7SUFDckIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUs7UUFDNUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDbEQ7Ozs7RUFJRCxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDO0lBQzFCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEYsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0dBQ3BFLENBQUM7Q0FDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2QllBOzs7MEJBQ2U7Ozs7O1VBR25CQyxRQUFMLEdBQWdCLEVBQWhCOztzQ0FIYUMsU0FBVztlQUFBOzs7VUFLbkJBLFNBQUwsR0FBaUJBLFNBQWpCO1VBQ0tDLFFBQUwsR0FBZ0IsRUFBaEI7Ozs7OzsyQkFHS0MsS0FBSztXQUNMRixTQUFMLENBQWVHLElBQWYsQ0FBb0JELEdBQXBCOzs7OzRCQUdNQSxLQUFLO1VBQ1AsS0FBS0YsU0FBTCxDQUFlSSxRQUFmLENBQXdCRixHQUF4QixDQUFKLEVBQWtDO2FBQzNCRixTQUFMLEdBQWlCLEtBQUtBLFNBQUwsQ0FBZUssTUFBZixDQUFzQjtpQkFBUUMsU0FBU0osR0FBakI7U0FBdEIsQ0FBakI7YUFDS0QsUUFBTCxDQUFjRSxJQUFkLENBQW1CRCxHQUFuQjs7O1dBR0dLLElBQUwsQ0FBVSxNQUFWLEVBQWtCTCxHQUFsQjs7VUFFSSxLQUFLTSxXQUFMLE9BQXVCLENBQTNCLEVBQThCO2FBQ3ZCRCxJQUFMLENBQVUsVUFBVjs7O2FBR0ssSUFBUDs7Ozs0QkFHTUwsS0FBS08sVUFBUzs7O2VBQ1pDLElBQVIsQ0FBYTtlQUFNLE9BQUtDLE9BQUwsQ0FBYVQsR0FBYixDQUFOO09BQWI7O1dBRUtILFFBQUwsQ0FBY0csR0FBZCxJQUFxQk8sUUFBckI7V0FDS0csTUFBTCxDQUFZVixHQUFaOzthQUVPTyxRQUFQOzs7O2tDQUdZO1VBQ05JLEtBQUssS0FBS2IsU0FBTCxDQUFlYyxNQUExQjtVQUNNQyxLQUFLLEtBQUtkLFFBQUwsQ0FBY2EsTUFBekI7O2FBRU9DLE1BQU1GLEtBQUtFLEVBQVgsQ0FBUDs7OztFQTFDOEJDOzs7Ozs7Ozs7Ozs7In0=
