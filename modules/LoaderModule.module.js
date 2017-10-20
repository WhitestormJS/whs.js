/* Built for whs v2.1.8-vrfix.3 */
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

export { LoaderModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyTW9kdWxlLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZXMvZXh0cmEvbm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL0xvYWRlck1vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiaW1wb3J0IEV2ZW50cyBmcm9tICdtaW5pdmVudHMnO1xuXG5leHBvcnQgY2xhc3MgTG9hZGVyTW9kdWxlIGV4dGVuZHMgRXZlbnRzIHtcbiAgY29uc3RydWN0b3IoLi4uZXhwZWN0aW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucHJvbWlzZXMgPSB7fTtcblxuICAgIHRoaXMuZXhwZWN0aW5nID0gZXhwZWN0aW5nO1xuICAgIHRoaXMucmVzb2x2ZWQgPSBbXTtcbiAgfVxuXG4gIGV4cGVjdChrZXkpIHtcbiAgICB0aGlzLmV4cGVjdGluZy5wdXNoKGtleSk7XG4gIH1cblxuICByZXNvbHZlKGtleSkge1xuICAgIGlmICh0aGlzLmV4cGVjdGluZy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICB0aGlzLmV4cGVjdGluZyA9IHRoaXMuZXhwZWN0aW5nLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGtleSk7XG4gICAgICB0aGlzLnJlc29sdmVkLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICB0aGlzLmVtaXQoJ3N0ZXAnLCBrZXkpO1xuXG4gICAgaWYgKHRoaXMuZ2V0UHJvZ3Jlc3MoKSA9PT0gMSkge1xuICAgICAgdGhpcy5lbWl0KCdjb21wbGV0ZScpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJvbWlzZShrZXksIHByb21pc2UpIHtcbiAgICBwcm9taXNlLnRoZW4oKCkgPT4gdGhpcy5yZXNvbHZlKGtleSkpO1xuXG4gICAgdGhpcy5wcm9taXNlc1trZXldID0gcHJvbWlzZTtcbiAgICB0aGlzLmV4cGVjdChrZXkpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRQcm9ncmVzcygpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZXhwZWN0aW5nLmxlbmd0aDtcbiAgICBjb25zdCBybCA9IHRoaXMucmVzb2x2ZWQubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHJsIC8gKGVsICsgcmwpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTG9hZGVyTW9kdWxlIiwicHJvbWlzZXMiLCJleHBlY3RpbmciLCJyZXNvbHZlZCIsImtleSIsInB1c2giLCJpbmNsdWRlcyIsImZpbHRlciIsIml0ZW0iLCJlbWl0IiwiZ2V0UHJvZ3Jlc3MiLCJwcm9taXNlIiwidGhlbiIsInJlc29sdmUiLCJleHBlY3QiLCJlbCIsImxlbmd0aCIsInJsIiwiRXZlbnRzIl0sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQWMsR0FBRyxTQUFTLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDdEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUM7RUFDNUIsTUFBTSxHQUFHLE1BQU0sSUFBSSxLQUFJOzs7O0VBSXZCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsU0FBUyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUNuQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBQztJQUN0RDs7OztFQUlELE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQy9CLElBQUksS0FBSyxNQUFNLEdBQUcsRUFBRSxFQUFDO0lBQ3JCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLO1FBQzVCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2xEOzs7O0VBSUQsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLElBQUksQ0FBQztJQUMxQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztHQUNwRSxDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdkJZQTs7OzBCQUNlOzs7OztVQUduQkMsUUFBTCxHQUFnQixFQUFoQjs7c0NBSGFDLFNBQVc7ZUFBQTs7O1VBS25CQSxTQUFMLEdBQWlCQSxTQUFqQjtVQUNLQyxRQUFMLEdBQWdCLEVBQWhCOzs7Ozs7MkJBR0tDLEtBQUs7V0FDTEYsU0FBTCxDQUFlRyxJQUFmLENBQW9CRCxHQUFwQjs7Ozs0QkFHTUEsS0FBSztVQUNQLEtBQUtGLFNBQUwsQ0FBZUksUUFBZixDQUF3QkYsR0FBeEIsQ0FBSixFQUFrQzthQUMzQkYsU0FBTCxHQUFpQixLQUFLQSxTQUFMLENBQWVLLE1BQWYsQ0FBc0I7aUJBQVFDLFNBQVNKLEdBQWpCO1NBQXRCLENBQWpCO2FBQ0tELFFBQUwsQ0FBY0UsSUFBZCxDQUFtQkQsR0FBbkI7OztXQUdHSyxJQUFMLENBQVUsTUFBVixFQUFrQkwsR0FBbEI7O1VBRUksS0FBS00sV0FBTCxPQUF1QixDQUEzQixFQUE4QjthQUN2QkQsSUFBTCxDQUFVLFVBQVY7OzthQUdLLElBQVA7Ozs7NEJBR01MLEtBQUtPLFVBQVM7OztlQUNaQyxJQUFSLENBQWE7ZUFBTSxPQUFLQyxPQUFMLENBQWFULEdBQWIsQ0FBTjtPQUFiOztXQUVLSCxRQUFMLENBQWNHLEdBQWQsSUFBcUJPLFFBQXJCO1dBQ0tHLE1BQUwsQ0FBWVYsR0FBWjs7YUFFT08sUUFBUDs7OztrQ0FHWTtVQUNOSSxLQUFLLEtBQUtiLFNBQUwsQ0FBZWMsTUFBMUI7VUFDTUMsS0FBSyxLQUFLZCxRQUFMLENBQWNhLE1BQXpCOzthQUVPQyxNQUFNRixLQUFLRSxFQUFYLENBQVA7Ozs7RUExQzhCQzs7OzsifQ==
