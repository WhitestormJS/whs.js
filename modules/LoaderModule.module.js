/* Built for whs v1.0.0 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyTW9kdWxlLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsInNyYy9Mb2FkZXJNb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFdmVudHModGFyZ2V0KXtcbiAgdmFyIGV2ZW50cyA9IHt9LCBlbXB0eSA9IFtdO1xuICB0YXJnZXQgPSB0YXJnZXQgfHwgdGhpc1xuICAvKipcbiAgICogIE9uOiBsaXN0ZW4gdG8gZXZlbnRzXG4gICAqL1xuICB0YXJnZXQub24gPSBmdW5jdGlvbih0eXBlLCBmdW5jLCBjdHgpe1xuICAgIChldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW10pLnB1c2goW2Z1bmMsIGN0eF0pXG4gIH1cbiAgLyoqXG4gICAqICBPZmY6IHN0b3AgbGlzdGVuaW5nIHRvIGV2ZW50IC8gc3BlY2lmaWMgY2FsbGJhY2tcbiAgICovXG4gIHRhcmdldC5vZmYgPSBmdW5jdGlvbih0eXBlLCBmdW5jKXtcbiAgICB0eXBlIHx8IChldmVudHMgPSB7fSlcbiAgICB2YXIgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSxcbiAgICAgICAgaSA9IGxpc3QubGVuZ3RoID0gZnVuYyA/IGxpc3QubGVuZ3RoIDogMDtcbiAgICB3aGlsZShpLS0pIGZ1bmMgPT0gbGlzdFtpXVswXSAmJiBsaXN0LnNwbGljZShpLDEpXG4gIH1cbiAgLyoqIFxuICAgKiBFbWl0OiBzZW5kIGV2ZW50LCBjYWxsYmFja3Mgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICovXG4gIHRhcmdldC5lbWl0ID0gZnVuY3Rpb24odHlwZSl7XG4gICAgdmFyIGUgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksIGxpc3QgPSBlLmxlbmd0aCA+IDAgPyBlLnNsaWNlKDAsIGUubGVuZ3RoKSA6IGUsIGk9MCwgajtcbiAgICB3aGlsZShqPWxpc3RbaSsrXSkgalswXS5hcHBseShqWzFdLCBlbXB0eS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpXG4gIH07XG59OyIsImltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcblxuZXhwb3J0IGNsYXNzIExvYWRlck1vZHVsZSBleHRlbmRzIEV2ZW50cyB7XG4gIGNvbnN0cnVjdG9yKC4uLmV4cGVjdGluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnByb21pc2VzID0ge307XG5cbiAgICB0aGlzLmV4cGVjdGluZyA9IGV4cGVjdGluZztcbiAgICB0aGlzLnJlc29sdmVkID0gW107XG4gIH1cblxuICBleHBlY3Qoa2V5KSB7XG4gICAgdGhpcy5leHBlY3RpbmcucHVzaChrZXkpO1xuICB9XG5cbiAgcmVzb2x2ZShrZXkpIHtcbiAgICBpZiAodGhpcy5leHBlY3RpbmcuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgdGhpcy5leHBlY3RpbmcgPSB0aGlzLmV4cGVjdGluZy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBrZXkpO1xuICAgICAgdGhpcy5yZXNvbHZlZC5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbWl0KCdzdGVwJywga2V5KTtcblxuICAgIGlmICh0aGlzLmdldFByb2dyZXNzKCkgPT09IDEpIHtcbiAgICAgIHRoaXMuZW1pdCgnY29tcGxldGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByb21pc2Uoa2V5LCBwcm9taXNlKSB7XG4gICAgcHJvbWlzZS50aGVuKCgpID0+IHRoaXMucmVzb2x2ZShrZXkpKTtcblxuICAgIHRoaXMucHJvbWlzZXNba2V5XSA9IHByb21pc2U7XG4gICAgdGhpcy5leHBlY3Qoa2V5KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0UHJvZ3Jlc3MoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmV4cGVjdGluZy5sZW5ndGg7XG4gICAgY29uc3QgcmwgPSB0aGlzLnJlc29sdmVkLmxlbmd0aDtcblxuICAgIHJldHVybiBybCAvIChlbCArIHJsKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkxvYWRlck1vZHVsZSIsInByb21pc2VzIiwiZXhwZWN0aW5nIiwicmVzb2x2ZWQiLCJrZXkiLCJwdXNoIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJpdGVtIiwiZW1pdCIsImdldFByb2dyZXNzIiwicHJvbWlzZSIsInRoZW4iLCJyZXNvbHZlIiwiZXhwZWN0IiwiZWwiLCJsZW5ndGgiLCJybCIsIkV2ZW50cyJdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFjLEdBQUcsU0FBUyxNQUFNLENBQUMsTUFBTSxDQUFDO0VBQ3RDLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDO0VBQzVCLE1BQU0sR0FBRyxNQUFNLElBQUksS0FBSTs7OztFQUl2QixNQUFNLENBQUMsRUFBRSxHQUFHLFNBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7SUFDbkMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUM7SUFDdEQ7Ozs7RUFJRCxNQUFNLENBQUMsR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUMvQixJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsRUFBQztJQUNyQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSztRQUM1QixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNsRDs7OztFQUlELE1BQU0sQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUM7SUFDMUIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7R0FDcEUsQ0FBQztDQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3ZCWUE7OzswQkFDZTs7Ozs7VUFHbkJDLFFBQUwsR0FBZ0IsRUFBaEI7O3NDQUhhQyxTQUFXO2VBQUE7OztVQUtuQkEsU0FBTCxHQUFpQkEsU0FBakI7VUFDS0MsUUFBTCxHQUFnQixFQUFoQjs7Ozs7OzJCQUdLQyxLQUFLO1dBQ0xGLFNBQUwsQ0FBZUcsSUFBZixDQUFvQkQsR0FBcEI7Ozs7NEJBR01BLEtBQUs7VUFDUCxLQUFLRixTQUFMLENBQWVJLFFBQWYsQ0FBd0JGLEdBQXhCLENBQUosRUFBa0M7YUFDM0JGLFNBQUwsR0FBaUIsS0FBS0EsU0FBTCxDQUFlSyxNQUFmLENBQXNCO2lCQUFRQyxTQUFTSixHQUFqQjtTQUF0QixDQUFqQjthQUNLRCxRQUFMLENBQWNFLElBQWQsQ0FBbUJELEdBQW5COzs7V0FHR0ssSUFBTCxDQUFVLE1BQVYsRUFBa0JMLEdBQWxCOztVQUVJLEtBQUtNLFdBQUwsT0FBdUIsQ0FBM0IsRUFBOEI7YUFDdkJELElBQUwsQ0FBVSxVQUFWOzs7YUFHSyxJQUFQOzs7OzRCQUdNTCxLQUFLTyxVQUFTOzs7ZUFDWkMsSUFBUixDQUFhO2VBQU0sT0FBS0MsT0FBTCxDQUFhVCxHQUFiLENBQU47T0FBYjs7V0FFS0gsUUFBTCxDQUFjRyxHQUFkLElBQXFCTyxRQUFyQjtXQUNLRyxNQUFMLENBQVlWLEdBQVo7O2FBRU9PLFFBQVA7Ozs7a0NBR1k7VUFDTkksS0FBSyxLQUFLYixTQUFMLENBQWVjLE1BQTFCO1VBQ01DLEtBQUssS0FBS2QsUUFBTCxDQUFjYSxNQUF6Qjs7YUFFT0MsTUFBTUYsS0FBS0UsRUFBWCxDQUFQOzs7O0VBMUM4QkM7Ozs7In0=
