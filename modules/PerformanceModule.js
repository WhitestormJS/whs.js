/* Built for whs v2.1.9 */
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
//# sourceMappingURL=PerformanceModule.js.map
