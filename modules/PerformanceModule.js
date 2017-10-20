/* Built for whs v2.1.8-vrfix.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('events')) :
	typeof define === 'function' && define.amd ? define(['events'], factory) :
	(global.PerformanceModule = factory(global.events));
}(this, (function (events) { 'use strict';

events = events && 'default' in events ? events['default'] : events;

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

return PerformanceModule;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyZm9ybWFuY2VNb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzL2V4dHJhL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0cy5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL25vZGVfbW9kdWxlcy9mcHMvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9ub2RlX21vZHVsZXMvbWluaXZlbnRzL2Rpc3QvbWluaXZlbnRzLmNvbW1vbmpzLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvUGVyZm9ybWFuY2VNb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBpbmhlcml0c1xuXG5mdW5jdGlvbiBpbmhlcml0cyAoYywgcCwgcHJvdG8pIHtcbiAgcHJvdG8gPSBwcm90byB8fCB7fVxuICB2YXIgZSA9IHt9XG4gIDtbYy5wcm90b3R5cGUsIHByb3RvXS5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgZVtrXSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocywgaylcbiAgICB9KVxuICB9KVxuICBjLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocC5wcm90b3R5cGUsIGUpXG4gIGMuc3VwZXIgPSBwXG59XG5cbi8vZnVuY3Rpb24gQ2hpbGQgKCkge1xuLy8gIENoaWxkLnN1cGVyLmNhbGwodGhpcylcbi8vICBjb25zb2xlLmVycm9yKFt0aGlzXG4vLyAgICAgICAgICAgICAgICAsdGhpcy5jb25zdHJ1Y3RvclxuLy8gICAgICAgICAgICAgICAgLHRoaXMuY29uc3RydWN0b3IgPT09IENoaWxkXG4vLyAgICAgICAgICAgICAgICAsdGhpcy5jb25zdHJ1Y3Rvci5zdXBlciA9PT0gUGFyZW50XG4vLyAgICAgICAgICAgICAgICAsT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpID09PSBDaGlsZC5wcm90b3R5cGVcbi8vICAgICAgICAgICAgICAgICxPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpKVxuLy8gICAgICAgICAgICAgICAgID09PSBQYXJlbnQucHJvdG90eXBlXG4vLyAgICAgICAgICAgICAgICAsdGhpcyBpbnN0YW5jZW9mIENoaWxkXG4vLyAgICAgICAgICAgICAgICAsdGhpcyBpbnN0YW5jZW9mIFBhcmVudF0pXG4vL31cbi8vZnVuY3Rpb24gUGFyZW50ICgpIHt9XG4vL2luaGVyaXRzKENoaWxkLCBQYXJlbnQpXG4vL25ldyBDaGlsZFxuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZwc1xuXG4vLyBUcnkgdXNlIHBlcmZvcm1hbmNlLm5vdygpLCBvdGhlcndpc2UgdHJ5XG4vLyArbmV3IERhdGUuXG52YXIgbm93ID0gKFxuICAoZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMgfSgpKS5wZXJmb3JtYW5jZSAmJlxuICAnZnVuY3Rpb24nID09PSB0eXBlb2YgcGVyZm9ybWFuY2Uubm93XG4pID8gZnVuY3Rpb24oKSB7IHJldHVybiBwZXJmb3JtYW5jZS5ub3coKSB9XG4gIDogRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7IHJldHVybiArbmV3IERhdGUgfVxuXG5mdW5jdGlvbiBmcHMob3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgZnBzKSkgcmV0dXJuIG5ldyBmcHMob3B0cylcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcylcblxuICBvcHRzID0gb3B0cyB8fCB7fVxuICB0aGlzLmxhc3QgPSBub3coKVxuICB0aGlzLnJhdGUgPSAwXG4gIHRoaXMudGltZSA9IDBcbiAgdGhpcy5kZWNheSA9IG9wdHMuZGVjYXkgfHwgMVxuICB0aGlzLmV2ZXJ5ID0gb3B0cy5ldmVyeSB8fCAxXG4gIHRoaXMudGlja3MgPSAwXG59XG5pbmhlcml0cyhmcHMsIEV2ZW50RW1pdHRlcilcblxuZnBzLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aW1lID0gbm93KClcbiAgICAsIGRpZmYgPSB0aW1lIC0gdGhpcy5sYXN0XG4gICAgLCBmcHMgPSBkaWZmXG5cbiAgdGhpcy50aWNrcyArPSAxXG4gIHRoaXMubGFzdCA9IHRpbWVcbiAgdGhpcy50aW1lICs9IChmcHMgLSB0aGlzLnRpbWUpICogdGhpcy5kZWNheVxuICB0aGlzLnJhdGUgPSAxMDAwIC8gdGhpcy50aW1lXG4gIGlmICghKHRoaXMudGlja3MgJSB0aGlzLmV2ZXJ5KSkgdGhpcy5lbWl0KCdkYXRhJywgdGhpcy5yYXRlKVxufVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEV2ZW50cyh0YXJnZXQpe1xuICB2YXIgZXZlbnRzID0ge30sIGVtcHR5ID0gW107XG4gIHRhcmdldCA9IHRhcmdldCB8fCB0aGlzXG4gIC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMsIGN0eCl7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSlcbiAgfVxuICAvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZ1bmMpe1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgICAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuICAgIHdoaWxlKGktLSkgZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfVxuICAvKiogXG4gICAqIEVtaXQ6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgZSA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgbGlzdCA9IGUubGVuZ3RoID4gMCA/IGUuc2xpY2UoMCwgZS5sZW5ndGgpIDogZSwgaT0wLCBqO1xuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgfTtcbn07IiwiaW1wb3J0IGZwcyBmcm9tICdmcHMnO1xuaW1wb3J0IEV2ZW50cyBmcm9tICdtaW5pdmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJmb3JtYW5jZU1vZHVsZSBleHRlbmRzIEV2ZW50cyB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgaXRlcmF0aW9uU3RhcnQgPSA2MCwgZnJhbWVzVG9VcGRhdGUgPSA2MCwgYmxvY2tUaW1lb3V0ID0gMCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLmVuYWJsZWQgPSB7fTtcbiAgICB0aGlzLml0ZXJhdGlvblN0YXJ0ID0gaXRlcmF0aW9uU3RhcnQ7XG4gICAgdGhpcy5mcmFtZXNUb1VwZGF0ZSA9IGZyYW1lc1RvVXBkYXRlO1xuICAgIHRoaXMuYmxvY2tUaW1lb3V0ID0gYmxvY2tUaW1lb3V0O1xuICAgIHRoaXMuaXRlcmF0aW9uID0gMDtcbiAgICB0aGlzLmF2Z1JhdGUgPSA2MDtcbiAgICB0aGlzLmJsb2NrID0gZmFsc2U7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWcpXG4gICAgICBpZiAoY29uZmlnW2tleV0pIHRoaXMuZW5hYmxlZFtrZXldID0gdHJ1ZTtcblxuICAgIHRoaXMudGlja2VyID0gZnBzKCk7XG4gICAgdGhpcy5yYXRlID0gNjA7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgncGVyZm9ybWFuY2UnKTtcbiAgICBjb25zdCB7dGlja2VyLCBjb25maWd9ID0gdGhpcztcblxuICAgIHRoaXMuYXBwID0gbWFuYWdlci5oYW5kbGVyO1xuXG4gICAgdGhpcy5sb29wID0gbmV3IFdIUy5Mb29wKCgpID0+IHtcbiAgICAgIHRpY2tlci50aWNrKCk7XG4gICAgICB0aGlzLnJhdGUgPSB0aWNrZXIucmF0ZTtcblxuICAgICAgdGhpcy5hdmdSYXRlID0gKHRoaXMuaXRlcmF0aW9uICogdGhpcy5hdmdSYXRlICsgdGhpcy5yYXRlKSAvICh0aGlzLml0ZXJhdGlvbiArIDEpO1xuXG4gICAgICBpZiAodGhpcy5pdGVyYXRpb24gJSB0aGlzLmZyYW1lc1RvVXBkYXRlID09PSAwICYmIHRoaXMuaXRlcmF0aW9uID4gdGhpcy5pdGVyYXRpb25TdGFydCAmJiAhdGhpcy5ibG9jaykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWcpIHtcbiAgICAgICAgICBpZiAoY29uZmlnW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGVyYXRlID0gY29uZmlnW2tleV07XG5cbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKGtleSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVuYWJsZWRba2V5XSAmJiBlcmF0ZSA+IHRoaXMuYXZnUmF0ZSkge1xuICAgICAgICAgICAgICB0aGlzLmRpc2FibGUoa2V5KTtcbiAgICAgICAgICAgICAgdGhpcy5ibG9jayA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuaXRlcmF0aW9uID0gMTtcbiAgICAgICAgICAgICAgdGhpcy5hdmdSYXRlID0gNjA7XG5cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgICB9LCB0aGlzLmJsb2NrVGltZW91dCk7XG5cbiAgICAgICAgICAgICAgZGVsZXRlIGNvbmZpZ1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5pdGVyYXRpb24rKztcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMubG9vcC5zdGFydCh0aGlzLmFwcCk7XG4gIH1cblxuICBkaXNhYmxlKGtleSkge1xuICAgIHRoaXMuZW5hYmxlZFtrZXldID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KGtleSwgZmFsc2UpO1xuICB9XG5cbiAgZW5hYmxlKGtleSkge1xuICAgIHRoaXMuZW5hYmxlZFtrZXldID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoa2V5LCB0cnVlKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJpbmhlcml0cyIsImV2ZW50cyIsIlBlcmZvcm1hbmNlTW9kdWxlIiwiY29uZmlnIiwiaXRlcmF0aW9uU3RhcnQiLCJmcmFtZXNUb1VwZGF0ZSIsImJsb2NrVGltZW91dCIsImVuYWJsZWQiLCJpdGVyYXRpb24iLCJhdmdSYXRlIiwiYmxvY2siLCJrZXkiLCJ0aWNrZXIiLCJmcHMiLCJyYXRlIiwibWFuYWdlciIsImRlZmluZSIsImFwcCIsImhhbmRsZXIiLCJsb29wIiwiV0hTIiwiTG9vcCIsInRpY2siLCJlcmF0ZSIsImVuYWJsZSIsImRpc2FibGUiLCJzdGFydCIsImVtaXQiLCJFdmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWMsR0FBRyxTQUFROztBQUV6QixTQUFTLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtFQUM5QixLQUFLLEdBQUcsS0FBSyxJQUFJLEdBQUU7RUFDbkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUNULENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDekMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxV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
