/* Built for whs v2.1.9 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('whs')) :
	typeof define === 'function' && define.amd ? define(['whs'], factory) :
	(global.StatsModule = factory(global.WHS));
}(this, (function (whs) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stats_min = createCommonjsModule(function (module, exports) {
// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){module.exports=e();})(commonjsGlobal,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a;}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length);},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now();},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576);}return c},update:function(){k=this.end();},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p));}}};return f});
});

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

var _class;
var _temp;

var StatsModule = (_temp = _class = function () {
  function StatsModule() {
    var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    classCallCheck(this, StatsModule);

    this.stats = new stats_min();
    this.stats.showPanel(code);
  }

  createClass(StatsModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.get('container').appendChild(this.stats.dom);
      _manager.add('stats', this.stats, { alias: '$stats' });
    }
  }, {
    key: 'integrate',
    value: function integrate(self) {
      var stats = self.stats;

      var preProcess = new whs.Loop(function () {
        return stats.begin();
      });
      var postProcess = new whs.Loop(function () {
        return stats.end();
      });

      this.loops.unshift(preProcess);
      this.loops.push(postProcess);

      // Patch method
      self.addLoop = function (loop) {
        var _this = this;

        return new Promise(function (resolve) {
          if (_this.loops[_this.loops.length - 1] === postProcess) _this.loops.pop();
          _this.loops.push(loop);
          _this.loops.push(postProcess);
          resolve(loop);
        });
      };

      preProcess.start();
      postProcess.start();
    }
  }]);
  return StatsModule;
}(), _class.codes = {
  fps: 0,
  ms: 1,
  mb: 2,
  custom: 3
}, _temp);

return StatsModule;

})));
//# sourceMappingURL=StatsModule.js.map
