/* Built for whs v2.1.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('dat-gui'), require('three')) :
	typeof define === 'function' && define.amd ? define(['dat-gui', 'three'], factory) :
	(global.DatGUIModule = factory(global.dat,global.THREE));
}(this, (function (dat,three) { 'use strict';

dat = dat && 'default' in dat ? dat['default'] : dat;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var additional = {
  wireframe: {
    wireframe: 'boolean',
    wireframeLinecap: ['butt', 'round', 'square'],
    wireframeLinejoin: ['round', 'bevel', 'miter'],
    wireframeLinewidth: 'number'
  },

  refr: {
    reflectivity: 'number',
    refractionRatio: 'number'
  },

  light: {
    lightMap: 'texture',
    lightMapIntensity: 'number'
  },

  displacement: {
    displacementScale: 'number',
    displacementBias: 'number',
    displacementMap: 'texture'
  },

  emissive: {
    emissive: 'color',
    emissiveMap: 'texture',
    emissiveIntensity: 'number'
  }
};

var add = function add(origin) {
  for (var _len = arguments.length, addv = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    addv[_key - 1] = arguments[_key];
  }

  return Object.assign.apply(Object, [origin].concat(toConsumableArray(addv.map(function (value) {
    return additional[value];
  }))));
};

var materials = {
  any: add({
    side: { FrontSide: three.FrontSide, BackSide: three.BackSide, DoubleSide: three.DoubleSide },
    shading: { SmoothShading: three.SmoothShading, FlatShading: three.FlatShading },
    blending: {
      NoBlending: three.NoBlending, NormalBlending: three.NormalBlending, AdditiveBlending: three.AdditiveBlending, SubtractiveBlending: three.SubtractiveBlending, MultiplyBlending: three.MultiplyBlending, CustomBlending: three.CustomBlending
    },
    depthFunc: {
      NeverDepth: three.NeverDepth, AlwaysDepth: three.AlwaysDepth, LessDepth: three.LessDepth, LessEqualDepth: three.LessEqualDepth, GreaterEqualDepth: three.GreaterEqualDepth, GreaterDepth: three.GreaterDepth, NotEqualDepth: three.NotEqualDepth
    }
  }, 'wireframe'),

  MeshBasicMaterial: {
    color: 'color',
    lights: 'boolean',
    linewidth: 'number',
    linecap: ['butt', 'round', 'square'],
    linejoin: ['round', 'bevel', 'miter']
  },

  MeshLambertMaterial: add({
    color: 'color'
  }, 'emissive', 'refr', 'light'),

  MeshPhongMaterial: add({
    color: 'color'
  }, 'displacement', 'emissive'),

  MeshDepthMaterial: {}
  // To be continued...
};

var DatAPI = function () {
  function DatAPI() {
    classCallCheck(this, DatAPI);
  }

  createClass(DatAPI, [{
    key: 'foldObject',
    value: function foldObject(object, origin) {
      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;
      var onChange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

      for (var key in origin) {
        var value = object[key];
        if (!value) continue;

        if (value.isColor) {
          this.addColor(object, key, instance);
        } else if (_typeof(origin[key]) === 'object') {
          if (object[key] === object) continue;
          this.foldObject(object[key], origin[key], instance.addFolder(key));
        } else {
          var range = '1' + '0'.repeat(value.toString().length);

          instance.add(object, key).min(0).step(range > 10 ? 1 : 0.1).onChange(onChange);
        }
      }
    }
  }, {
    key: 'guiTransforms',
    value: function guiTransforms(native) {
      var instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fold;

      if (!this.params.transforms) return;

      var controller = instance.addFolder('transforms');

      // position
      var position = controller.addFolder('position');
      position.add(native.position, 'x');
      position.add(native.position, 'y');
      position.add(native.position, 'z');

      // rotation
      var rotation = controller.addFolder('rotation');
      rotation.add(native.rotation, 'x').step(0.1);
      rotation.add(native.rotation, 'y').step(0.1);
      rotation.add(native.rotation, 'z').step(0.1);

      // scale
      if (!native.scale) return;
      var scale = controller.addFolder('scale');
      scale.add(native.scale, 'x').step(0.1);
      scale.add(native.scale, 'y').step(0.1);
      scale.add(native.scale, 'z').step(0.1);
    }
  }]);
  return DatAPI;
}();

var DatMeshModule = function (_DatAPI) {
  inherits(DatMeshModule, _DatAPI);

  function DatMeshModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gui = arguments[1];
    classCallCheck(this, DatMeshModule);

    var _this = possibleConstructorReturn(this, (DatMeshModule.__proto__ || Object.getPrototypeOf(DatMeshModule)).call(this));

    _this.bridge = {
      material: function material(_material, self) {
        if (!self.params.material) return _material;

        var folder = self.fold.addFolder('material');
        self.guiMaterial(this, _material, folder);

        return _material;
      },
      geometry: function geometry(_geometry, self) {
        if (!self.params.geometry) return _geometry;
        if (!this.g_) throw new Error('WHS.DynamicGeometryModule should be used in a component (before gui)');

        var folder = self.fold.addFolder('geometry');
        self.guiGeometry(this, folder);

        return _geometry;
      },
      mesh: function mesh(_mesh, self) {
        var _this2 = this;

        if (!self.customMaterials) return _mesh;

        self.customMaterials.current = _mesh.material;

        // const matAlias = {material: 'current'};
        var keys = Object.keys(self.customMaterials);
        var folder = self.fold;

        folder.add({ type: 'current' }, 'type', keys).onChange(function (v) {
          _mesh.material = self.customMaterials[v];
          folder.removeFolder('material');
          self.guiMaterial(_this2, _mesh.material, folder.addFolder('material'));
        });

        return _mesh;
      },
      onWrap: function onWrap(a, self) {
        self.guiTransforms(this.native, self.fold);
      }
    };


    _this.params = Object.assign({
      name: 'Unknown mesh',
      geometry: true,
      material: true,
      transforms: true,
      gui: false
    }, params);

    _this.gui = gui;
    _this.fold = _this.gui.addFolder(_this.params.name);
    _this.customMaterials = false;
    return _this;
  }

  createClass(DatMeshModule, [{
    key: 'addColor',
    value: function addColor(object, property) {
      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;

      var color = object[property];

      instance.addColor(defineProperty({}, property, color.getHex()), property).onChange(function (value) {
        if (typeof value === 'string') value.replace('#', '0x');
        color.setHex(value);
      });
    }
  }, {
    key: 'guiMaterial',
    value: function guiMaterial(component, material) {
      var _this3 = this;

      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;

      var paramsProcessor = function paramsProcessor(params) {
        for (var key in params) {
          if (params[key] && material[key] !== undefined) {
            switch (params[key]) {
              case 'color':
                _this3.addColor(material, key, instance);
                break;
              case 'boolean':
                instance.add(material, key);
                break;
              case 'number':
                instance.add(material, key);
                break;
              case 'texture':
                // TODO
                break;
              default:
                instance.add(material, key, params[key]);
            }
          }
        }
      };

      paramsProcessor(materials[material.type]);
      paramsProcessor(materials.any);
    }
  }, {
    key: 'guiGeometry',
    value: function guiGeometry(component) {
      var instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fold;

      if (!component.g_) throw new Error('DatGUIModule requires WHS.DynamicGeometryModule for geometry updates.');

      var geomParams = component.params.geometry;
      var geomData = this.params.geometry;

      var _loop = function _loop(key) {
        var data = geomData[key];

        var range = data && data.range ? data.range : [0, 100];

        instance.add(geomParams, key).min(range[0]).max(range[1]).step(key.indexOf('Segments') > 0 ? 1 : 0.1).onChange(function (value) {
          component.g_(defineProperty({}, key, value));
        });
      };

      for (var key in geomParams) {
        _loop(key);
      }
    }
  }, {
    key: 'materials',
    value: function materials$$1() {
      var _materials = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.customMaterials = _materials;

      return this;
    }
  }]);
  return DatMeshModule;
}(DatAPI);

var DatLightModule = function (_DatAPI) {
  inherits(DatLightModule, _DatAPI);

  function DatLightModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gui = arguments[1];
    classCallCheck(this, DatLightModule);

    var _this = possibleConstructorReturn(this, (DatLightModule.__proto__ || Object.getPrototypeOf(DatLightModule)).call(this));

    _this.bridge = {
      light: function light(_light, self) {
        if (!self.params.light) return _light;

        self.foldObject(_light, this.params, self.fold.addFolder('light'));
        self.foldObject(_light.shadow, this.params.shadow, self.fold.addFolder('shadow'));

        return _light;
      },
      onWrap: function onWrap(a, self) {
        self.guiTransforms(this.native, self.fold);
      }
    };


    _this.params = Object.assign({
      name: 'Unknown light',
      light: true,
      shadow: true,
      transforms: true,
      gui: false
    }, params);

    _this.gui = gui;
    _this.fold = _this.gui.addFolder(_this.params.name);
    return _this;
  }

  createClass(DatLightModule, [{
    key: 'addColor',
    value: function addColor(object, property) {
      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;

      var color = object[property];

      instance.addColor(defineProperty({}, property, color.getHex()), property).onChange(function (value) {
        if (typeof value === 'string') value.replace('#', '0x');
        color.setHex(value);
      });
    }
  }]);
  return DatLightModule;
}(DatAPI);

var DatCameraModule = function (_DatAPI) {
  inherits(DatCameraModule, _DatAPI);

  function DatCameraModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gui = arguments[1];
    classCallCheck(this, DatCameraModule);

    var _this = possibleConstructorReturn(this, (DatCameraModule.__proto__ || Object.getPrototypeOf(DatCameraModule)).call(this));

    _this.bridge = {
      camera: function camera(_camera, self) {
        if (!self.params.camera) return _camera;
        self.foldObject(_camera, this.params, self.fold, function () {
          _camera.updateProjectionMatrix();
        });

        return _camera;
      },
      onWrap: function onWrap(a, self) {
        self.guiTransforms(this.native, self.fold);
      }
    };


    _this.params = Object.assign({
      name: 'Unknown camera',
      transforms: true,
      camera: true
    }, params);

    _this.gui = gui;
    _this.fold = _this.gui.addFolder(_this.params.name);
    return _this;
  }

  return DatCameraModule;
}(DatAPI);

var DatCustomModule = function () {
  function DatCustomModule() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var gui = arguments[1];
    classCallCheck(this, DatCustomModule);

    this.props = props;
    this.gui = gui;

    props.forEach(this.add.bind(this));
  }

  createClass(DatCustomModule, [{
    key: "add",
    value: function add(_ref) {
      var name = _ref.name,
          value = _ref.value,
          _ref$range = _ref.range,
          range = _ref$range === undefined ? [false, false] : _ref$range,
          _ref$step = _ref.step,
          step = _ref$step === undefined ? 1 : _ref$step,
          onChange = _ref.onChange,
          onFinishChange = _ref.onFinishChange,
          _ref$listen = _ref.listen,
          listen = _ref$listen === undefined ? false : _ref$listen;

      var controller = this.gui.add(defineProperty({}, name, value), name);

      if (range[0] !== false) controller.min(range[0]);
      if (range[1] !== false) controller.max(range[1]);

      controller.step(step);

      if (onChange) controller.onChange(onChange);
      if (onFinishChange) controller.onFinishChange(onFinishChange);
      if (listen) controller.listen();

      return controller;
    }
  }]);
  return DatCustomModule;
}();

// Polyfill
dat.GUI.prototype.removeFolder = function (name) {
  var folder = this.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.__ul.removeChild(folder.domElement.parentNode);
  delete this.__folders[name];
  this.onResize();
};

var DatGUIModule = function () {
  createClass(DatGUIModule, null, [{
    key: 'new',
    value: function _new(params) {
      return new DatGUIModule(new dat.GUI(params));
    }
  }]);

  function DatGUIModule() {
    var gui = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new dat.GUI({ autoPlace: false });
    classCallCheck(this, DatGUIModule);

    this.gui = gui;
  }

  createClass(DatGUIModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('gui/dat.gui');
      var dom = this.gui.domElement;
      var style = dom.style;

      style.position = 'absolute';
      style.top = 0;
      style.right = '20px';

      _manager.get('element').appendChild(this.gui.domElement);
    }
  }, {
    key: 'set',
    value: function set$$1(gui) {
      this.gui = gui;
      return this;
    }
  }, {
    key: 'folder',
    value: function folder() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'folder';

      return new DatGUIModule(this.gui.addFolder(name));
    }
  }, {
    key: 'Mesh',
    value: function Mesh() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatMeshModule(params, gui);
    }
  }, {
    key: 'Light',
    value: function Light() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatLightModule(params, gui);
    }
  }, {
    key: 'Camera',
    value: function Camera() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatCameraModule(params, gui);
    }
  }, {
    key: 'Custom',
    value: function Custom() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatCustomModule(params, gui);
    }
  }]);
  return DatGUIModule;
}();

DatGUIModule.dat = dat;

return DatGUIModule;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0R1VJTW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvbWF0ZXJpYWxzLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdEFQSS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRNZXNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdExpZ2h0TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdENhbWVyYU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRDdXN0b21Nb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9EYXRHVUlNb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRnJvbnRTaWRlLFxuICBCYWNrU2lkZSxcbiAgRG91YmxlU2lkZSxcblxuICBTbW9vdGhTaGFkaW5nLFxuICBGbGF0U2hhZGluZyxcblxuICBOb0JsZW5kaW5nLFxuICBOb3JtYWxCbGVuZGluZyxcbiAgQWRkaXRpdmVCbGVuZGluZyxcbiAgU3VidHJhY3RpdmVCbGVuZGluZyxcbiAgTXVsdGlwbHlCbGVuZGluZyxcbiAgQ3VzdG9tQmxlbmRpbmcsXG5cbiAgTmV2ZXJEZXB0aCxcbiAgQWx3YXlzRGVwdGgsXG4gIExlc3NEZXB0aCxcbiAgTGVzc0VxdWFsRGVwdGgsXG4gIEdyZWF0ZXJFcXVhbERlcHRoLFxuICBHcmVhdGVyRGVwdGgsXG4gIE5vdEVxdWFsRGVwdGhcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBhZGRpdGlvbmFsID0ge1xuICB3aXJlZnJhbWU6IHtcbiAgICB3aXJlZnJhbWU6ICdib29sZWFuJyxcbiAgICB3aXJlZnJhbWVMaW5lY2FwOiBbJ2J1dHQnLCAncm91bmQnLCAnc3F1YXJlJ10sXG4gICAgd2lyZWZyYW1lTGluZWpvaW46IFsncm91bmQnLCAnYmV2ZWwnLCAnbWl0ZXInXSxcbiAgICB3aXJlZnJhbWVMaW5ld2lkdGg6ICdudW1iZXInXG4gIH0sXG5cbiAgcmVmcjoge1xuICAgIHJlZmxlY3Rpdml0eTogJ251bWJlcicsXG4gICAgcmVmcmFjdGlvblJhdGlvOiAnbnVtYmVyJ1xuICB9LFxuXG4gIGxpZ2h0OiB7XG4gICAgbGlnaHRNYXA6ICd0ZXh0dXJlJyxcbiAgICBsaWdodE1hcEludGVuc2l0eTogJ251bWJlcidcbiAgfSxcblxuICBkaXNwbGFjZW1lbnQ6IHtcbiAgICBkaXNwbGFjZW1lbnRTY2FsZTogJ251bWJlcicsXG4gICAgZGlzcGxhY2VtZW50QmlhczogJ251bWJlcicsXG4gICAgZGlzcGxhY2VtZW50TWFwOiAndGV4dHVyZSdcbiAgfSxcblxuICBlbWlzc2l2ZToge1xuICAgIGVtaXNzaXZlOiAnY29sb3InLFxuICAgIGVtaXNzaXZlTWFwOiAndGV4dHVyZScsXG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6ICdudW1iZXInXG4gIH1cbn1cblxuY29uc3QgYWRkID0gKG9yaWdpbiwgLi4uYWRkdikgPT4ge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihvcmlnaW4sIC4uLmFkZHYubWFwKHZhbHVlID0+IGFkZGl0aW9uYWxbdmFsdWVdKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhbnk6IGFkZCh7XG4gICAgc2lkZToge0Zyb250U2lkZSwgQmFja1NpZGUsIERvdWJsZVNpZGV9LFxuICAgIHNoYWRpbmc6IHtTbW9vdGhTaGFkaW5nLCBGbGF0U2hhZGluZ30sXG4gICAgYmxlbmRpbmc6IHtcbiAgICAgIE5vQmxlbmRpbmcsIE5vcm1hbEJsZW5kaW5nLCBBZGRpdGl2ZUJsZW5kaW5nLCBTdWJ0cmFjdGl2ZUJsZW5kaW5nLCBNdWx0aXBseUJsZW5kaW5nLCBDdXN0b21CbGVuZGluZ1xuICAgIH0sXG4gICAgZGVwdGhGdW5jOiB7XG4gICAgICBOZXZlckRlcHRoLCBBbHdheXNEZXB0aCwgTGVzc0RlcHRoLCBMZXNzRXF1YWxEZXB0aCwgR3JlYXRlckVxdWFsRGVwdGgsIEdyZWF0ZXJEZXB0aCwgTm90RXF1YWxEZXB0aFxuICAgIH1cbiAgfSwgJ3dpcmVmcmFtZScpLFxuXG4gIE1lc2hCYXNpY01hdGVyaWFsOiB7XG4gICAgY29sb3I6ICdjb2xvcicsXG4gICAgbGlnaHRzOiAnYm9vbGVhbicsXG4gICAgbGluZXdpZHRoOiAnbnVtYmVyJyxcbiAgICBsaW5lY2FwOiBbJ2J1dHQnLCAncm91bmQnLCAnc3F1YXJlJ10sXG4gICAgbGluZWpvaW46IFsncm91bmQnLCAnYmV2ZWwnLCAnbWl0ZXInXVxuICB9LFxuXG4gIE1lc2hMYW1iZXJ0TWF0ZXJpYWw6IGFkZCh7XG4gICAgY29sb3I6ICdjb2xvcidcbiAgfSwgJ2VtaXNzaXZlJywgJ3JlZnInLCAnbGlnaHQnKSxcblxuICBNZXNoUGhvbmdNYXRlcmlhbDogYWRkKHtcbiAgICBjb2xvcjogJ2NvbG9yJ1xuICB9LCAnZGlzcGxhY2VtZW50JywgJ2VtaXNzaXZlJyksXG5cbiAgTWVzaERlcHRoTWF0ZXJpYWw6IHtcblxuICB9XG4gIC8vIFRvIGJlIGNvbnRpbnVlZC4uLlxufVxuIiwiZXhwb3J0IGNsYXNzIERhdEFQSSB7XG4gIGZvbGRPYmplY3Qob2JqZWN0LCBvcmlnaW4sIGluc3RhbmNlID0gdGhpcy5mb2xkLCBvbkNoYW5nZSA9ICgpID0+IHt9KSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9yaWdpbikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgIGlmICghdmFsdWUpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAodmFsdWUuaXNDb2xvcikge1xuICAgICAgICB0aGlzLmFkZENvbG9yKG9iamVjdCwga2V5LCBpbnN0YW5jZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcmlnaW5ba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKG9iamVjdFtrZXldID09PSBvYmplY3QpIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmZvbGRPYmplY3Qob2JqZWN0W2tleV0sIG9yaWdpbltrZXldLCBpbnN0YW5jZS5hZGRGb2xkZXIoa2V5KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByYW5nZSA9ICcxJyArICcwJy5yZXBlYXQodmFsdWUudG9TdHJpbmcoKS5sZW5ndGgpO1xuXG4gICAgICAgIGluc3RhbmNlLmFkZChvYmplY3QsIGtleSlcbiAgICAgICAgICAubWluKDApXG4gICAgICAgICAgLnN0ZXAocmFuZ2UgPiAxMCA/IDEgOiAwLjEpXG4gICAgICAgICAgLm9uQ2hhbmdlKG9uQ2hhbmdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBndWlUcmFuc2Zvcm1zKG5hdGl2ZSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zLnRyYW5zZm9ybXMpIHJldHVybjtcblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBpbnN0YW5jZS5hZGRGb2xkZXIoJ3RyYW5zZm9ybXMnKTtcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgY29uc3QgcG9zaXRpb24gPSBjb250cm9sbGVyLmFkZEZvbGRlcigncG9zaXRpb24nKTtcbiAgICBwb3NpdGlvbi5hZGQobmF0aXZlLnBvc2l0aW9uLCAneCcpO1xuICAgIHBvc2l0aW9uLmFkZChuYXRpdmUucG9zaXRpb24sICd5Jyk7XG4gICAgcG9zaXRpb24uYWRkKG5hdGl2ZS5wb3NpdGlvbiwgJ3onKTtcblxuICAgIC8vIHJvdGF0aW9uXG4gICAgY29uc3Qgcm90YXRpb24gPSBjb250cm9sbGVyLmFkZEZvbGRlcigncm90YXRpb24nKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneCcpLnN0ZXAoMC4xKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneScpLnN0ZXAoMC4xKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneicpLnN0ZXAoMC4xKTtcblxuICAgIC8vIHNjYWxlXG4gICAgaWYgKCFuYXRpdmUuc2NhbGUpIHJldHVybjtcbiAgICBjb25zdCBzY2FsZSA9IGNvbnRyb2xsZXIuYWRkRm9sZGVyKCdzY2FsZScpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd4Jykuc3RlcCgwLjEpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd5Jykuc3RlcCgwLjEpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd6Jykuc3RlcCgwLjEpO1xuICB9XG59XG4iLCJpbXBvcnQgbWF0ZXJpYWxzIGZyb20gJy4vbWF0ZXJpYWxzJztcbmltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRNZXNoTW9kdWxlIGV4dGVuZHMgRGF0QVBJIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGd1aSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbmFtZTogJ1Vua25vd24gbWVzaCcsXG4gICAgICBnZW9tZXRyeTogdHJ1ZSxcbiAgICAgIG1hdGVyaWFsOiB0cnVlLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGd1aTogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgdGhpcy5mb2xkID0gdGhpcy5ndWkuYWRkRm9sZGVyKHRoaXMucGFyYW1zLm5hbWUpO1xuICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWxzID0gZmFsc2U7XG4gIH1cblxuICBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5LCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IGNvbG9yID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIGluc3RhbmNlLmFkZENvbG9yKHtbcHJvcGVydHldOiBjb2xvci5nZXRIZXgoKX0sIHByb3BlcnR5KS5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUucmVwbGFjZSgnIycsICcweCcpO1xuICAgICAgY29sb3Iuc2V0SGV4KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGd1aU1hdGVyaWFsKGNvbXBvbmVudCwgbWF0ZXJpYWwsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgY29uc3QgcGFyYW1zUHJvY2Vzc29yID0gcGFyYW1zID0+IHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zW2tleV0gJiYgbWF0ZXJpYWxba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3dpdGNoIChwYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgICAgICB0aGlzLmFkZENvbG9yKG1hdGVyaWFsLCBrZXksIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkKG1hdGVyaWFsLCBrZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHBhcmFtc1Byb2Nlc3NvcihtYXRlcmlhbHNbbWF0ZXJpYWwudHlwZV0pO1xuICAgIHBhcmFtc1Byb2Nlc3NvcihtYXRlcmlhbHMuYW55KTtcbiAgfVxuXG4gIGd1aUdlb21ldHJ5KGNvbXBvbmVudCwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBpZiAoIWNvbXBvbmVudC5nXykgdGhyb3cgbmV3IEVycm9yKCdEYXRHVUlNb2R1bGUgcmVxdWlyZXMgV0hTLkR5bmFtaWNHZW9tZXRyeU1vZHVsZSBmb3IgZ2VvbWV0cnkgdXBkYXRlcy4nKTtcblxuICAgIGNvbnN0IGdlb21QYXJhbXMgPSBjb21wb25lbnQucGFyYW1zLmdlb21ldHJ5O1xuICAgIGNvbnN0IGdlb21EYXRhID0gdGhpcy5wYXJhbXMuZ2VvbWV0cnk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBnZW9tUGFyYW1zKSB7XG4gICAgICBjb25zdCBkYXRhID0gZ2VvbURhdGFba2V5XTtcblxuICAgICAgY29uc3QgcmFuZ2UgPSBkYXRhICYmIGRhdGEucmFuZ2UgPyBkYXRhLnJhbmdlIDogWzAsIDEwMF07XG5cbiAgICAgIGluc3RhbmNlLmFkZChnZW9tUGFyYW1zLCBrZXkpXG4gICAgICAgIC5taW4ocmFuZ2VbMF0pXG4gICAgICAgIC5tYXgocmFuZ2VbMV0pXG4gICAgICAgIC5zdGVwKGtleS5pbmRleE9mKCdTZWdtZW50cycpID4gMCA/IDEgOiAwLjEpXG4gICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50LmdfKHtba2V5XTogdmFsdWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbWF0ZXJpYWxzKG1hdGVyaWFscyA9IHt9KSB7XG4gICAgdGhpcy5jdXN0b21NYXRlcmlhbHMgPSBtYXRlcmlhbHM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtYXRlcmlhbChtYXRlcmlhbCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5tYXRlcmlhbCkgcmV0dXJuIG1hdGVyaWFsO1xuXG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQuYWRkRm9sZGVyKCdtYXRlcmlhbCcpO1xuICAgICAgc2VsZi5ndWlNYXRlcmlhbCh0aGlzLCBtYXRlcmlhbCwgZm9sZGVyKTtcblxuICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgIH0sXG5cbiAgICBnZW9tZXRyeShnZW9tZXRyeSwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5nZW9tZXRyeSkgcmV0dXJuIGdlb21ldHJ5O1xuICAgICAgaWYgKCF0aGlzLmdfKSB0aHJvdyBuZXcgRXJyb3IoJ1dIUy5EeW5hbWljR2VvbWV0cnlNb2R1bGUgc2hvdWxkIGJlIHVzZWQgaW4gYSBjb21wb25lbnQgKGJlZm9yZSBndWkpJyk7XG5cbiAgICAgIGNvbnN0IGZvbGRlciA9IHNlbGYuZm9sZC5hZGRGb2xkZXIoJ2dlb21ldHJ5Jyk7XG4gICAgICBzZWxmLmd1aUdlb21ldHJ5KHRoaXMsIGZvbGRlcik7XG5cbiAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICB9LFxuXG4gICAgbWVzaChtZXNoLCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYuY3VzdG9tTWF0ZXJpYWxzKSByZXR1cm4gbWVzaDtcblxuICAgICAgc2VsZi5jdXN0b21NYXRlcmlhbHMuY3VycmVudCA9IG1lc2gubWF0ZXJpYWw7XG5cbiAgICAgIC8vIGNvbnN0IG1hdEFsaWFzID0ge21hdGVyaWFsOiAnY3VycmVudCd9O1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGYuY3VzdG9tTWF0ZXJpYWxzKTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IHNlbGYuZm9sZDtcblxuICAgICAgZm9sZGVyLmFkZCh7dHlwZTogJ2N1cnJlbnQnfSwgJ3R5cGUnLCBrZXlzKS5vbkNoYW5nZSh2ID0+IHtcbiAgICAgICAgbWVzaC5tYXRlcmlhbCA9IHNlbGYuY3VzdG9tTWF0ZXJpYWxzW3ZdO1xuICAgICAgICBmb2xkZXIucmVtb3ZlRm9sZGVyKCdtYXRlcmlhbCcpO1xuICAgICAgICBzZWxmLmd1aU1hdGVyaWFsKHRoaXMsIG1lc2gubWF0ZXJpYWwsIGZvbGRlci5hZGRGb2xkZXIoJ21hdGVyaWFsJykpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtEYXRBUEl9IGZyb20gJy4vRGF0QVBJJztcblxuZXhwb3J0IGNsYXNzIERhdExpZ2h0TW9kdWxlIGV4dGVuZHMgRGF0QVBJIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGd1aSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbmFtZTogJ1Vua25vd24gbGlnaHQnLFxuICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICBzaGFkb3c6IHRydWUsXG4gICAgICB0cmFuc2Zvcm1zOiB0cnVlLFxuICAgICAgZ3VpOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gIH1cblxuICBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5LCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IGNvbG9yID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIGluc3RhbmNlLmFkZENvbG9yKHtbcHJvcGVydHldOiBjb2xvci5nZXRIZXgoKX0sIHByb3BlcnR5KS5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUucmVwbGFjZSgnIycsICcweCcpO1xuICAgICAgY29sb3Iuc2V0SGV4KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBsaWdodChsaWdodCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5saWdodCkgcmV0dXJuIGxpZ2h0O1xuXG4gICAgICBzZWxmLmZvbGRPYmplY3QobGlnaHQsIHRoaXMucGFyYW1zLCBzZWxmLmZvbGQuYWRkRm9sZGVyKCdsaWdodCcpKTtcbiAgICAgIHNlbGYuZm9sZE9iamVjdChsaWdodC5zaGFkb3csIHRoaXMucGFyYW1zLnNoYWRvdywgc2VsZi5mb2xkLmFkZEZvbGRlcignc2hhZG93JykpO1xuXG4gICAgICByZXR1cm4gbGlnaHQ7XG4gICAgfSxcblxuICAgIG9uV3JhcChhLCBzZWxmKSB7XG4gICAgICBzZWxmLmd1aVRyYW5zZm9ybXModGhpcy5uYXRpdmUsIHNlbGYuZm9sZCk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHtEYXRBUEl9IGZyb20gJy4vRGF0QVBJJztcblxuZXhwb3J0IGNsYXNzIERhdENhbWVyYU1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIGNhbWVyYScsXG4gICAgICB0cmFuc2Zvcm1zOiB0cnVlLFxuICAgICAgY2FtZXJhOiB0cnVlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICAgIHRoaXMuZm9sZCA9IHRoaXMuZ3VpLmFkZEZvbGRlcih0aGlzLnBhcmFtcy5uYW1lKTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBjYW1lcmEoY2FtZXJhLCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYucGFyYW1zLmNhbWVyYSkgcmV0dXJuIGNhbWVyYTtcbiAgICAgIHNlbGYuZm9sZE9iamVjdChjYW1lcmEsIHRoaXMucGFyYW1zLCBzZWxmLmZvbGQsICgpID0+IHtcbiAgICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2FtZXJhO1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufTtcbiIsImV4cG9ydCBjbGFzcyBEYXRDdXN0b21Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IFtdLCBndWkpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5ndWkgPSBndWk7XG5cbiAgICBwcm9wcy5mb3JFYWNoKHRoaXMuYWRkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgYWRkKHtcbiAgICBuYW1lLFxuICAgIHZhbHVlLFxuICAgIHJhbmdlID0gW2ZhbHNlLCBmYWxzZV0sXG4gICAgc3RlcCA9IDEsXG4gICAgb25DaGFuZ2UsXG4gICAgb25GaW5pc2hDaGFuZ2UsXG4gICAgbGlzdGVuID0gZmFsc2VcbiAgfSkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmd1aS5hZGQoe1tuYW1lXTogdmFsdWV9LCBuYW1lKTtcblxuICAgIGlmIChyYW5nZVswXSAhPT0gZmFsc2UpIGNvbnRyb2xsZXIubWluKHJhbmdlWzBdKVxuICAgIGlmIChyYW5nZVsxXSAhPT0gZmFsc2UpIGNvbnRyb2xsZXIubWF4KHJhbmdlWzFdKVxuXG4gICAgY29udHJvbGxlci5zdGVwKHN0ZXApO1xuXG4gICAgaWYgKG9uQ2hhbmdlKSBjb250cm9sbGVyLm9uQ2hhbmdlKG9uQ2hhbmdlKTtcbiAgICBpZiAob25GaW5pc2hDaGFuZ2UpIGNvbnRyb2xsZXIub25GaW5pc2hDaGFuZ2Uob25GaW5pc2hDaGFuZ2UpO1xuICAgIGlmIChsaXN0ZW4pIGNvbnRyb2xsZXIubGlzdGVuKCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgfVxufTtcbiIsImltcG9ydCBkYXQgZnJvbSAnZGF0LWd1aSc7XG5cbmltcG9ydCB7RGF0TWVzaE1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0TWVzaE1vZHVsZSc7XG5pbXBvcnQge0RhdExpZ2h0TW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRMaWdodE1vZHVsZSc7XG5pbXBvcnQge0RhdENhbWVyYU1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0Q2FtZXJhTW9kdWxlJztcbmltcG9ydCB7RGF0Q3VzdG9tTW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRDdXN0b21Nb2R1bGUnO1xuXG4vLyBQb2x5ZmlsbFxuZGF0LkdVSS5wcm90b3R5cGUucmVtb3ZlRm9sZGVyID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZm9sZGVyID0gdGhpcy5fX2ZvbGRlcnNbbmFtZV07XG4gIGlmICghZm9sZGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvbGRlci5jbG9zZSgpO1xuICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoZm9sZGVyLmRvbUVsZW1lbnQucGFyZW50Tm9kZSk7XG4gIGRlbGV0ZSB0aGlzLl9fZm9sZGVyc1tuYW1lXTtcbiAgdGhpcy5vblJlc2l6ZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRHVUlNb2R1bGUge1xuICBzdGF0aWMgbmV3KHBhcmFtcykge1xuICAgIHJldHVybiBuZXcgRGF0R1VJTW9kdWxlKG5ldyBkYXQuR1VJKHBhcmFtcykpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZ3VpID0gbmV3IGRhdC5HVUkoe2F1dG9QbGFjZTogZmFsc2V9KSkge1xuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2d1aS9kYXQuZ3VpJyk7XG4gICAgY29uc3QgZG9tID0gdGhpcy5ndWkuZG9tRWxlbWVudDtcbiAgICBjb25zdCBzdHlsZSA9IGRvbS5zdHlsZTtcblxuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS50b3AgPSAwO1xuICAgIHN0eWxlLnJpZ2h0ID0gJzIwcHgnO1xuXG4gICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKS5hcHBlbmRDaGlsZCh0aGlzLmd1aS5kb21FbGVtZW50KTtcbiAgfVxuXG4gIHNldChndWkpIHtcbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvbGRlcihuYW1lID0gJ2ZvbGRlcicpIHtcbiAgICByZXR1cm4gbmV3IERhdEdVSU1vZHVsZSh0aGlzLmd1aS5hZGRGb2xkZXIobmFtZSkpO1xuICB9XG5cbiAgTWVzaChwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdE1lc2hNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgTGlnaHQocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRMaWdodE1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cblxuICBDYW1lcmEocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRDYW1lcmFNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgQ3VzdG9tKHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0Q3VzdG9tTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxufVxuXG5EYXRHVUlNb2R1bGUuZGF0ID0gZGF0O1xuIl0sIm5hbWVzIjpbImFkZGl0aW9uYWwiLCJhZGQiLCJvcmlnaW4iLCJhZGR2IiwiT2JqZWN0IiwiYXNzaWduIiwibWFwIiwidmFsdWUiLCJGcm9udFNpZGUiLCJCYWNrU2lkZSIsIkRvdWJsZVNpZGUiLCJTbW9vdGhTaGFkaW5nIiwiRmxhdFNoYWRpbmciLCJOb3JtYWxCbGVuZGluZyIsIkFkZGl0aXZlQmxlbmRpbmciLCJTdWJ0cmFjdGl2ZUJsZW5kaW5nIiwiTXVsdGlwbHlCbGVuZGluZyIsIkN1c3RvbUJsZW5kaW5nIiwiQWx3YXlzRGVwdGgiLCJMZXNzRGVwdGgiLCJMZXNzRXF1YWxEZXB0aCIsIkdyZWF0ZXJFcXVhbERlcHRoIiwiR3JlYXRlckRlcHRoIiwiTm90RXF1YWxEZXB0aCIsIkRhdEFQSSIsIm9iamVjdCIsImluc3RhbmNlIiwiZm9sZCIsIm9uQ2hhbmdlIiwia2V5IiwiaXNDb2xvciIsImFkZENvbG9yIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsImZvbGRPYmplY3QiLCJhZGRGb2xkZXIiLCJyYW5nZSIsInJlcGVhdCIsInRvU3RyaW5nIiwibGVuZ3RoIiwibWluIiwic3RlcCIsIm5hdGl2ZSIsInBhcmFtcyIsInRyYW5zZm9ybXMiLCJjb250cm9sbGVyIiwicG9zaXRpb24iLCJyb3RhdGlvbiIsInNjYWxlIiwiRGF0TWVzaE1vZHVsZSIsImd1aSIsImJyaWRnZSIsIm1hdGVyaWFsIiwic2VsZiIsImZvbGRlciIsImd1aU1hdGVyaWFsIiwiZ2VvbWV0cnkiLCJnXyIsIkVycm9yIiwiZ3VpR2VvbWV0cnkiLCJtZXNoIiwiY3VzdG9tTWF0ZXJpYWxzIiwiY3VycmVudCIsImtleXMiLCJ0eXBlIiwidiIsInJlbW92ZUZvbGRlciIsImEiLCJndWlUcmFuc2Zvcm1zIiwibmFtZSIsInByb3BlcnR5IiwiY29sb3IiLCJnZXRIZXgiLCJyZXBsYWNlIiwic2V0SGV4IiwiY29tcG9uZW50IiwicGFyYW1zUHJvY2Vzc29yIiwidW5kZWZpbmVkIiwibWF0ZXJpYWxzIiwiYW55IiwiZ2VvbVBhcmFtcyIsImdlb21EYXRhIiwiZGF0YSIsIm1heCIsImluZGV4T2YiLCJEYXRMaWdodE1vZHVsZSIsImxpZ2h0Iiwic2hhZG93IiwiRGF0Q2FtZXJhTW9kdWxlIiwiY2FtZXJhIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkRhdEN1c3RvbU1vZHVsZSIsInByb3BzIiwiZm9yRWFjaCIsImJpbmQiLCJvbkZpbmlzaENoYW5nZSIsImxpc3RlbiIsImRhdCIsIkdVSSIsInByb3RvdHlwZSIsIl9fZm9sZGVycyIsImNsb3NlIiwiX191bCIsInJlbW92ZUNoaWxkIiwiZG9tRWxlbWVudCIsInBhcmVudE5vZGUiLCJvblJlc2l6ZSIsIkRhdEdVSU1vZHVsZSIsImF1dG9QbGFjZSIsIm1hbmFnZXIiLCJkZWZpbmUiLCJkb20iLCJzdHlsZSIsInRvcCIsInJpZ2h0IiwiZ2V0IiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
