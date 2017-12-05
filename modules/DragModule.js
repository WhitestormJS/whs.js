/* Built for whs v2.1.9 */
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
//# sourceMappingURL=DragModule.js.map
