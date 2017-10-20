/* Built for whs v2.1.8-vrfix.3 */
import events from 'events';

var inherits_1 = inherits;

function inherits (c, p, proto) {
  proto = proto || {};
  var e = {};[c.prototype, proto].forEach(function (s) {
    Object.getOwnPropertyNames(s).forEach(function (k) {
      e[k] = Object.getOwnPropertyDescriptor(s, k);
    });
  });
  c.prototype = Object.create(p.prototype, e);
  c.super = p;
}

//function Child () {
//  Child.super.call(this)
//  console.error([this
//                ,this.constructor
//                ,this.constructor === Child
//                ,this.constructor.super === Parent
//                ,Object.getPrototypeOf(this) === Child.prototype
//                ,Object.getPrototypeOf(Object.getPrototypeOf(this))
//                 === Parent.prototype
//                ,this instanceof Child
//                ,this instanceof Parent])
//}
//function Parent () {}
//inherits(Child, Parent)
//new Child

var EventEmitter = events.EventEmitter;

var index = fps;

// Try use performance.now(), otherwise try
// +new Date.
var now = (
  (function(){ return this }()).performance &&
  'function' === typeof performance.now
) ? function() { return performance.now() }
  : Date.now || function() { return +new Date };

function fps(opts) {
  if (!(this instanceof fps)) return new fps(opts)
  EventEmitter.call(this);

  opts = opts || {};
  this.last = now();
  this.rate = 0;
  this.time = 0;
  this.decay = opts.decay || 1;
  this.every = opts.every || 1;
  this.ticks = 0;
}
inherits_1(fps, EventEmitter);

fps.prototype.tick = function() {
  var time = now()
    , diff = time - this.last
    , fps = diff;

  this.ticks += 1;
  this.last = time;
  this.time += (fps - this.time) * this.decay;
  this.rate = 1000 / this.time;
  if (!(this.ticks % this.every)) this.emit('data', this.rate);
};

var minivents_commonjs = function Events(target){
  var events$$1 = {}, empty = [];
  target = target || this;
  /**
   *  On: listen to events
   */
  target.on = function(type, func, ctx){
    (events$$1[type] = events$$1[type] || []).push([func, ctx]);
  };
  /**
   *  Off: stop listening to event / specific callback
   */
  target.off = function(type, func){
    type || (events$$1 = {});
    var list = events$$1[type] || empty,
        i = list.length = func ? list.length : 0;
    while(i--) func == list[i][0] && list.splice(i,1);
  };
  /** 
   * Emit: send event, callbacks will be triggered
   */
  target.emit = function(type){
    var e = events$$1[type] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i=0, j;
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









var inherits$2 = function (subClass, superClass) {
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

var PerformanceModule = function (_Events) {
  inherits$2(PerformanceModule, _Events);

  function PerformanceModule(config) {
    var iterationStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
    var framesToUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
    var blockTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    classCallCheck(this, PerformanceModule);

    var _this = possibleConstructorReturn(this, (PerformanceModule.__proto__ || Object.getPrototypeOf(PerformanceModule)).call(this));

    _this.config = config;
    _this.enabled = {};
    _this.iterationStart = iterationStart;
    _this.framesToUpdate = framesToUpdate;
    _this.blockTimeout = blockTimeout;
    _this.iteration = 0;
    _this.avgRate = 60;
    _this.block = false;

    for (var key in config) {
      if (config[key]) _this.enabled[key] = true;
    }_this.ticker = index();
    _this.rate = 60;
    return _this;
  }

  createClass(PerformanceModule, [{
    key: 'manager',
    value: function manager(_manager) {
      var _this2 = this;

      _manager.define('performance');
      var ticker = this.ticker,
          config = this.config;


      this.app = _manager.handler;

      this.loop = new WHS.Loop(function () {
        ticker.tick();
        _this2.rate = ticker.rate;

        _this2.avgRate = (_this2.iteration * _this2.avgRate + _this2.rate) / (_this2.iteration + 1);

        if (_this2.iteration % _this2.framesToUpdate === 0 && _this2.iteration > _this2.iterationStart && !_this2.block) {
          for (var key in config) {
            if (config[key]) {
              var erate = config[key];

              _this2.enable(key);

              if (_this2.enabled[key] && erate > _this2.avgRate) {
                _this2.disable(key);
                _this2.block = true;
                _this2.iteration = 1;
                _this2.avgRate = 60;

                setTimeout(function () {
                  _this2.block = false;
                }, _this2.blockTimeout);

                delete config[key];
              }

              break;
            }
          }
        }

        _this2.iteration++;
      });
    }
  }, {
    key: 'start',
    value: function start() {
      this.loop.start(this.app);
    }
  }, {
    key: 'disable',
    value: function disable(key) {
      this.enabled[key] = false;
      this.emit(key, false);
    }
  }, {
    key: 'enable',
    value: function enable(key) {
      this.enabled[key] = true;
      this.emit(key, true);
    }
  }]);
  return PerformanceModule;
}(minivents_commonjs);

export default PerformanceModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyZm9ybWFuY2VNb2R1bGUubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHMuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9ub2RlX21vZHVsZXMvZnBzL2luZGV4LmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvbm9kZV9tb2R1bGVzL21pbml2ZW50cy9kaXN0L21pbml2ZW50cy5jb21tb25qcy5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL1BlcmZvcm1hbmNlTW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gaW5oZXJpdHNcblxuZnVuY3Rpb24gaW5oZXJpdHMgKGMsIHAsIHByb3RvKSB7XG4gIHByb3RvID0gcHJvdG8gfHwge31cbiAgdmFyIGUgPSB7fVxuICA7W2MucHJvdG90eXBlLCBwcm90b10uZm9yRWFjaChmdW5jdGlvbiAocykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgIGVba10gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHMsIGspXG4gICAgfSlcbiAgfSlcbiAgYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHAucHJvdG90eXBlLCBlKVxuICBjLnN1cGVyID0gcFxufVxuXG4vL2Z1bmN0aW9uIENoaWxkICgpIHtcbi8vICBDaGlsZC5zdXBlci5jYWxsKHRoaXMpXG4vLyAgY29uc29sZS5lcnJvcihbdGhpc1xuLy8gICAgICAgICAgICAgICAgLHRoaXMuY29uc3RydWN0b3Jcbi8vICAgICAgICAgICAgICAgICx0aGlzLmNvbnN0cnVjdG9yID09PSBDaGlsZFxuLy8gICAgICAgICAgICAgICAgLHRoaXMuY29uc3RydWN0b3Iuc3VwZXIgPT09IFBhcmVudFxuLy8gICAgICAgICAgICAgICAgLE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSA9PT0gQ2hpbGQucHJvdG90eXBlXG4vLyAgICAgICAgICAgICAgICAsT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSlcbi8vICAgICAgICAgICAgICAgICA9PT0gUGFyZW50LnByb3RvdHlwZVxuLy8gICAgICAgICAgICAgICAgLHRoaXMgaW5zdGFuY2VvZiBDaGlsZFxuLy8gICAgICAgICAgICAgICAgLHRoaXMgaW5zdGFuY2VvZiBQYXJlbnRdKVxuLy99XG4vL2Z1bmN0aW9uIFBhcmVudCAoKSB7fVxuLy9pbmhlcml0cyhDaGlsZCwgUGFyZW50KVxuLy9uZXcgQ2hpbGRcbiIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcblxubW9kdWxlLmV4cG9ydHMgPSBmcHNcblxuLy8gVHJ5IHVzZSBwZXJmb3JtYW5jZS5ub3coKSwgb3RoZXJ3aXNlIHRyeVxuLy8gK25ldyBEYXRlLlxudmFyIG5vdyA9IChcbiAgKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzIH0oKSkucGVyZm9ybWFuY2UgJiZcbiAgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHBlcmZvcm1hbmNlLm5vd1xuKSA/IGZ1bmN0aW9uKCkgeyByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgfVxuICA6IERhdGUubm93IHx8IGZ1bmN0aW9uKCkgeyByZXR1cm4gK25ldyBEYXRlIH1cblxuZnVuY3Rpb24gZnBzKG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIGZwcykpIHJldHVybiBuZXcgZnBzKG9wdHMpXG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpXG5cbiAgb3B0cyA9IG9wdHMgfHwge31cbiAgdGhpcy5sYXN0ID0gbm93KClcbiAgdGhpcy5yYXRlID0gMFxuICB0aGlzLnRpbWUgPSAwXG4gIHRoaXMuZGVjYXkgPSBvcHRzLmRlY2F5IHx8IDFcbiAgdGhpcy5ldmVyeSA9IG9wdHMuZXZlcnkgfHwgMVxuICB0aGlzLnRpY2tzID0gMFxufVxuaW5oZXJpdHMoZnBzLCBFdmVudEVtaXR0ZXIpXG5cbmZwcy5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGltZSA9IG5vdygpXG4gICAgLCBkaWZmID0gdGltZSAtIHRoaXMubGFzdFxuICAgICwgZnBzID0gZGlmZlxuXG4gIHRoaXMudGlja3MgKz0gMVxuICB0aGlzLmxhc3QgPSB0aW1lXG4gIHRoaXMudGltZSArPSAoZnBzIC0gdGhpcy50aW1lKSAqIHRoaXMuZGVjYXlcbiAgdGhpcy5yYXRlID0gMTAwMCAvIHRoaXMudGltZVxuICBpZiAoISh0aGlzLnRpY2tzICUgdGhpcy5ldmVyeSkpIHRoaXMuZW1pdCgnZGF0YScsIHRoaXMucmF0ZSlcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFdmVudHModGFyZ2V0KXtcbiAgdmFyIGV2ZW50cyA9IHt9LCBlbXB0eSA9IFtdO1xuICB0YXJnZXQgPSB0YXJnZXQgfHwgdGhpc1xuICAvKipcbiAgICogIE9uOiBsaXN0ZW4gdG8gZXZlbnRzXG4gICAqL1xuICB0YXJnZXQub24gPSBmdW5jdGlvbih0eXBlLCBmdW5jLCBjdHgpe1xuICAgIChldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW10pLnB1c2goW2Z1bmMsIGN0eF0pXG4gIH1cbiAgLyoqXG4gICAqICBPZmY6IHN0b3AgbGlzdGVuaW5nIHRvIGV2ZW50IC8gc3BlY2lmaWMgY2FsbGJhY2tcbiAgICovXG4gIHRhcmdldC5vZmYgPSBmdW5jdGlvbih0eXBlLCBmdW5jKXtcbiAgICB0eXBlIHx8IChldmVudHMgPSB7fSlcbiAgICB2YXIgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSxcbiAgICAgICAgaSA9IGxpc3QubGVuZ3RoID0gZnVuYyA/IGxpc3QubGVuZ3RoIDogMDtcbiAgICB3aGlsZShpLS0pIGZ1bmMgPT0gbGlzdFtpXVswXSAmJiBsaXN0LnNwbGljZShpLDEpXG4gIH1cbiAgLyoqIFxuICAgKiBFbWl0OiBzZW5kIGV2ZW50LCBjYWxsYmFja3Mgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICovXG4gIHRhcmdldC5lbWl0ID0gZnVuY3Rpb24odHlwZSl7XG4gICAgdmFyIGUgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksIGxpc3QgPSBlLmxlbmd0aCA+IDAgPyBlLnNsaWNlKDAsIGUubGVuZ3RoKSA6IGUsIGk9MCwgajtcbiAgICB3aGlsZShqPWxpc3RbaSsrXSkgalswXS5hcHBseShqWzFdLCBlbXB0eS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpXG4gIH07XG59OyIsImltcG9ydCBmcHMgZnJvbSAnZnBzJztcbmltcG9ydCBFdmVudHMgZnJvbSAnbWluaXZlbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyZm9ybWFuY2VNb2R1bGUgZXh0ZW5kcyBFdmVudHMge1xuICBjb25zdHJ1Y3Rvcihjb25maWcsIGl0ZXJhdGlvblN0YXJ0ID0gNjAsIGZyYW1lc1RvVXBkYXRlID0gNjAsIGJsb2NrVGltZW91dCA9IDApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5lbmFibGVkID0ge307XG4gICAgdGhpcy5pdGVyYXRpb25TdGFydCA9IGl0ZXJhdGlvblN0YXJ0O1xuICAgIHRoaXMuZnJhbWVzVG9VcGRhdGUgPSBmcmFtZXNUb1VwZGF0ZTtcbiAgICB0aGlzLmJsb2NrVGltZW91dCA9IGJsb2NrVGltZW91dDtcbiAgICB0aGlzLml0ZXJhdGlvbiA9IDA7XG4gICAgdGhpcy5hdmdSYXRlID0gNjA7XG4gICAgdGhpcy5ibG9jayA9IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlnKVxuICAgICAgaWYgKGNvbmZpZ1trZXldKSB0aGlzLmVuYWJsZWRba2V5XSA9IHRydWU7XG5cbiAgICB0aGlzLnRpY2tlciA9IGZwcygpO1xuICAgIHRoaXMucmF0ZSA9IDYwO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3BlcmZvcm1hbmNlJyk7XG4gICAgY29uc3Qge3RpY2tlciwgY29uZmlnfSA9IHRoaXM7XG5cbiAgICB0aGlzLmFwcCA9IG1hbmFnZXIuaGFuZGxlcjtcblxuICAgIHRoaXMubG9vcCA9IG5ldyBXSFMuTG9vcCgoKSA9PiB7XG4gICAgICB0aWNrZXIudGljaygpO1xuICAgICAgdGhpcy5yYXRlID0gdGlja2VyLnJhdGU7XG5cbiAgICAgIHRoaXMuYXZnUmF0ZSA9ICh0aGlzLml0ZXJhdGlvbiAqIHRoaXMuYXZnUmF0ZSArIHRoaXMucmF0ZSkgLyAodGhpcy5pdGVyYXRpb24gKyAxKTtcblxuICAgICAgaWYgKHRoaXMuaXRlcmF0aW9uICUgdGhpcy5mcmFtZXNUb1VwZGF0ZSA9PT0gMCAmJiB0aGlzLml0ZXJhdGlvbiA+IHRoaXMuaXRlcmF0aW9uU3RhcnQgJiYgIXRoaXMuYmxvY2spIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgaWYgKGNvbmZpZ1trZXldKSB7XG4gICAgICAgICAgICBjb25zdCBlcmF0ZSA9IGNvbmZpZ1trZXldO1xuXG4gICAgICAgICAgICB0aGlzLmVuYWJsZShrZXkpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5lbmFibGVkW2tleV0gJiYgZXJhdGUgPiB0aGlzLmF2Z1JhdGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKGtleSk7XG4gICAgICAgICAgICAgIHRoaXMuYmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLml0ZXJhdGlvbiA9IDE7XG4gICAgICAgICAgICAgIHRoaXMuYXZnUmF0ZSA9IDYwO1xuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSwgdGhpcy5ibG9ja1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAgIGRlbGV0ZSBjb25maWdba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaXRlcmF0aW9uKys7XG4gICAgfSk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmxvb3Auc3RhcnQodGhpcy5hcHApO1xuICB9XG5cbiAgZGlzYWJsZShrZXkpIHtcbiAgICB0aGlzLmVuYWJsZWRba2V5XSA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChrZXksIGZhbHNlKTtcbiAgfVxuXG4gIGVuYWJsZShrZXkpIHtcbiAgICB0aGlzLmVuYWJsZWRba2V5XSA9IHRydWU7XG4gICAgdGhpcy5lbWl0KGtleSwgdHJ1ZSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwiaW5oZXJpdHMiLCJldmVudHMiLCJQZXJmb3JtYW5jZU1vZHVsZSIsImNvbmZpZyIsIml0ZXJhdGlvblN0YXJ0IiwiZnJhbWVzVG9VcGRhdGUiLCJibG9ja1RpbWVvdXQiLCJlbmFibGVkIiwiaXRlcmF0aW9uIiwiYXZnUmF0ZSIsImJsb2NrIiwia2V5IiwidGlja2VyIiwiZnBzIiwicmF0ZSIsIm1hbmFnZXIiLCJkZWZpbmUiLCJhcHAiLCJoYW5kbGVyIiwibG9vcCIsIldIUyIsIkxvb3AiLCJ0aWNrIiwiZXJhdGUiLCJlbmFibGUiLCJkaXNhYmxlIiwic3RhcnQiLCJlbWl0IiwiRXZlbnRzIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxjQUFjLEdBQUcsU0FBUTs7QUFFekIsU0FBUyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7RUFDOUIsS0FBSyxHQUFHLEtBQUssSUFBSSxHQUFFO0VBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FDVCxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQ3pDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7TUFDakQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDO0tBQzdDLEVBQUM7R0FDSCxFQUFDO0VBQ0YsQ0FBQyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDO0VBQzNDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBQztDQUNaOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JVOztBQzVCWCxJQUFJLFlBQVksR0FBR0EsTUFBaUIsQ0FBQyxhQUFZOztBQUdqRCxTQUFjLEdBQUcsSUFBRzs7OztBQUlwQixJQUFJLEdBQUcsR0FBRztFQUNSLENBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxFQUFFLEVBQUUsRUFBRSxXQUFXO0VBQ3pDLFVBQVUsS0FBSyxPQUFPLFdBQVcsQ0FBQyxHQUFHO0lBQ25DLFdBQVcsRUFBRSxPQUFPLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUN2QyxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLEdBQUU7O0FBRS9DLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRTtFQUNqQixJQUFJLEVBQUUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO0VBQ2hELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDOztFQUV2QixJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUU7RUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUU7RUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFDO0VBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFDO0VBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUM7RUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUM7RUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDO0NBQ2Y7QUFDREMsVUFBUSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUM7O0FBRTNCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFdBQVc7RUFDOUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO01BQ1osSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTtNQUN2QixHQUFHLEdBQUcsS0FBSTs7RUFFZCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUM7RUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUk7RUFDaEIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFLO0VBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFJO0VBQzVCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDO0NBQzdEOztBQ3JDRCxzQkFBYyxHQUFHLFNBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUN0QyxJQUFJQyxTQUFNLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUM7RUFDNUIsTUFBTSxHQUFHLE1BQU0sSUFBSSxLQUFJOzs7O0VBSXZCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsU0FBUyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUNuQyxDQUFDQSxTQUFNLENBQUMsSUFBSSxDQUFDLEdBQUdBLFNBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFDO0lBQ3REOzs7O0VBSUQsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLENBQUM7SUFDL0IsSUFBSSxLQUFLQSxTQUFNLEdBQUcsRUFBRSxFQUFDO0lB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
