/* Built for whs v2.1.9 */
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
//# sourceMappingURL=LoaderModule.module.js.map
