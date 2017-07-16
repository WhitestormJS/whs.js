/* Built for whs v2.1.3 */
import dat from 'dat-gui';
import { AdditiveBlending, AlwaysDepth, BackSide, CustomBlending, DoubleSide, FlatShading, FrontSide, GreaterDepth, GreaterEqualDepth, LessDepth, LessEqualDepth, MultiplyBlending, NeverDepth, NoBlending, NormalBlending, NotEqualDepth, SmoothShading, SubtractiveBlending } from 'three';

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
    side: { FrontSide: FrontSide, BackSide: BackSide, DoubleSide: DoubleSide },
    shading: { SmoothShading: SmoothShading, FlatShading: FlatShading },
    blending: {
      NoBlending: NoBlending, NormalBlending: NormalBlending, AdditiveBlending: AdditiveBlending, SubtractiveBlending: SubtractiveBlending, MultiplyBlending: MultiplyBlending, CustomBlending: CustomBlending
    },
    depthFunc: {
      NeverDepth: NeverDepth, AlwaysDepth: AlwaysDepth, LessDepth: LessDepth, LessEqualDepth: LessEqualDepth, GreaterEqualDepth: GreaterEqualDepth, GreaterDepth: GreaterDepth, NotEqualDepth: NotEqualDepth
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

export default DatGUIModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0R1VJTW9kdWxlLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL21hdGVyaWFscy5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRBUEkuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvRGF0TWVzaE1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRMaWdodE1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRDYW1lcmFNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvRGF0Q3VzdG9tTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvRGF0R1VJTW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZyb250U2lkZSxcbiAgQmFja1NpZGUsXG4gIERvdWJsZVNpZGUsXG5cbiAgU21vb3RoU2hhZGluZyxcbiAgRmxhdFNoYWRpbmcsXG5cbiAgTm9CbGVuZGluZyxcbiAgTm9ybWFsQmxlbmRpbmcsXG4gIEFkZGl0aXZlQmxlbmRpbmcsXG4gIFN1YnRyYWN0aXZlQmxlbmRpbmcsXG4gIE11bHRpcGx5QmxlbmRpbmcsXG4gIEN1c3RvbUJsZW5kaW5nLFxuXG4gIE5ldmVyRGVwdGgsXG4gIEFsd2F5c0RlcHRoLFxuICBMZXNzRGVwdGgsXG4gIExlc3NFcXVhbERlcHRoLFxuICBHcmVhdGVyRXF1YWxEZXB0aCxcbiAgR3JlYXRlckRlcHRoLFxuICBOb3RFcXVhbERlcHRoXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgYWRkaXRpb25hbCA9IHtcbiAgd2lyZWZyYW1lOiB7XG4gICAgd2lyZWZyYW1lOiAnYm9vbGVhbicsXG4gICAgd2lyZWZyYW1lTGluZWNhcDogWydidXR0JywgJ3JvdW5kJywgJ3NxdWFyZSddLFxuICAgIHdpcmVmcmFtZUxpbmVqb2luOiBbJ3JvdW5kJywgJ2JldmVsJywgJ21pdGVyJ10sXG4gICAgd2lyZWZyYW1lTGluZXdpZHRoOiAnbnVtYmVyJ1xuICB9LFxuXG4gIHJlZnI6IHtcbiAgICByZWZsZWN0aXZpdHk6ICdudW1iZXInLFxuICAgIHJlZnJhY3Rpb25SYXRpbzogJ251bWJlcidcbiAgfSxcblxuICBsaWdodDoge1xuICAgIGxpZ2h0TWFwOiAndGV4dHVyZScsXG4gICAgbGlnaHRNYXBJbnRlbnNpdHk6ICdudW1iZXInXG4gIH0sXG5cbiAgZGlzcGxhY2VtZW50OiB7XG4gICAgZGlzcGxhY2VtZW50U2NhbGU6ICdudW1iZXInLFxuICAgIGRpc3BsYWNlbWVudEJpYXM6ICdudW1iZXInLFxuICAgIGRpc3BsYWNlbWVudE1hcDogJ3RleHR1cmUnXG4gIH0sXG5cbiAgZW1pc3NpdmU6IHtcbiAgICBlbWlzc2l2ZTogJ2NvbG9yJyxcbiAgICBlbWlzc2l2ZU1hcDogJ3RleHR1cmUnLFxuICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAnbnVtYmVyJ1xuICB9XG59XG5cbmNvbnN0IGFkZCA9IChvcmlnaW4sIC4uLmFkZHYpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3JpZ2luLCAuLi5hZGR2Lm1hcCh2YWx1ZSA9PiBhZGRpdGlvbmFsW3ZhbHVlXSkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYW55OiBhZGQoe1xuICAgIHNpZGU6IHtGcm9udFNpZGUsIEJhY2tTaWRlLCBEb3VibGVTaWRlfSxcbiAgICBzaGFkaW5nOiB7U21vb3RoU2hhZGluZywgRmxhdFNoYWRpbmd9LFxuICAgIGJsZW5kaW5nOiB7XG4gICAgICBOb0JsZW5kaW5nLCBOb3JtYWxCbGVuZGluZywgQWRkaXRpdmVCbGVuZGluZywgU3VidHJhY3RpdmVCbGVuZGluZywgTXVsdGlwbHlCbGVuZGluZywgQ3VzdG9tQmxlbmRpbmdcbiAgICB9LFxuICAgIGRlcHRoRnVuYzoge1xuICAgICAgTmV2ZXJEZXB0aCwgQWx3YXlzRGVwdGgsIExlc3NEZXB0aCwgTGVzc0VxdWFsRGVwdGgsIEdyZWF0ZXJFcXVhbERlcHRoLCBHcmVhdGVyRGVwdGgsIE5vdEVxdWFsRGVwdGhcbiAgICB9XG4gIH0sICd3aXJlZnJhbWUnKSxcblxuICBNZXNoQmFzaWNNYXRlcmlhbDoge1xuICAgIGNvbG9yOiAnY29sb3InLFxuICAgIGxpZ2h0czogJ2Jvb2xlYW4nLFxuICAgIGxpbmV3aWR0aDogJ251bWJlcicsXG4gICAgbGluZWNhcDogWydidXR0JywgJ3JvdW5kJywgJ3NxdWFyZSddLFxuICAgIGxpbmVqb2luOiBbJ3JvdW5kJywgJ2JldmVsJywgJ21pdGVyJ11cbiAgfSxcblxuICBNZXNoTGFtYmVydE1hdGVyaWFsOiBhZGQoe1xuICAgIGNvbG9yOiAnY29sb3InXG4gIH0sICdlbWlzc2l2ZScsICdyZWZyJywgJ2xpZ2h0JyksXG5cbiAgTWVzaFBob25nTWF0ZXJpYWw6IGFkZCh7XG4gICAgY29sb3I6ICdjb2xvcidcbiAgfSwgJ2Rpc3BsYWNlbWVudCcsICdlbWlzc2l2ZScpLFxuXG4gIE1lc2hEZXB0aE1hdGVyaWFsOiB7XG5cbiAgfVxuICAvLyBUbyBiZSBjb250aW51ZWQuLi5cbn1cbiIsImV4cG9ydCBjbGFzcyBEYXRBUEkge1xuICBmb2xkT2JqZWN0KG9iamVjdCwgb3JpZ2luLCBpbnN0YW5jZSA9IHRoaXMuZm9sZCwgb25DaGFuZ2UgPSAoKSA9PiB7fSkge1xuICAgIGZvciAobGV0IGtleSBpbiBvcmlnaW4pIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICBpZiAoIXZhbHVlKSBjb250aW51ZTtcblxuICAgICAgaWYgKHZhbHVlLmlzQ29sb3IpIHtcbiAgICAgICAgdGhpcy5hZGRDb2xvcihvYmplY3QsIGtleSwgaW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3JpZ2luW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChvYmplY3Rba2V5XSA9PT0gb2JqZWN0KSBjb250aW51ZTtcbiAgICAgICAgdGhpcy5mb2xkT2JqZWN0KG9iamVjdFtrZXldLCBvcmlnaW5ba2V5XSwgaW5zdGFuY2UuYWRkRm9sZGVyKGtleSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSAnMScgKyAnMCcucmVwZWF0KHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKTtcblxuICAgICAgICBpbnN0YW5jZS5hZGQob2JqZWN0LCBrZXkpXG4gICAgICAgICAgLm1pbigwKVxuICAgICAgICAgIC5zdGVwKHJhbmdlID4gMTAgPyAxIDogMC4xKVxuICAgICAgICAgIC5vbkNoYW5nZShvbkNoYW5nZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ3VpVHJhbnNmb3JtcyhuYXRpdmUsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgaWYgKCF0aGlzLnBhcmFtcy50cmFuc2Zvcm1zKSByZXR1cm47XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gaW5zdGFuY2UuYWRkRm9sZGVyKCd0cmFuc2Zvcm1zJyk7XG5cbiAgICAvLyBwb3NpdGlvblxuICAgIGNvbnN0IHBvc2l0aW9uID0gY29udHJvbGxlci5hZGRGb2xkZXIoJ3Bvc2l0aW9uJyk7XG4gICAgcG9zaXRpb24uYWRkKG5hdGl2ZS5wb3NpdGlvbiwgJ3gnKTtcbiAgICBwb3NpdGlvbi5hZGQobmF0aXZlLnBvc2l0aW9uLCAneScpO1xuICAgIHBvc2l0aW9uLmFkZChuYXRpdmUucG9zaXRpb24sICd6Jyk7XG5cbiAgICAvLyByb3RhdGlvblxuICAgIGNvbnN0IHJvdGF0aW9uID0gY29udHJvbGxlci5hZGRGb2xkZXIoJ3JvdGF0aW9uJyk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3gnKS5zdGVwKDAuMSk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3knKS5zdGVwKDAuMSk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3onKS5zdGVwKDAuMSk7XG5cbiAgICAvLyBzY2FsZVxuICAgIGlmICghbmF0aXZlLnNjYWxlKSByZXR1cm47XG4gICAgY29uc3Qgc2NhbGUgPSBjb250cm9sbGVyLmFkZEZvbGRlcignc2NhbGUnKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneCcpLnN0ZXAoMC4xKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneScpLnN0ZXAoMC4xKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneicpLnN0ZXAoMC4xKTtcbiAgfVxufVxuIiwiaW1wb3J0IG1hdGVyaWFscyBmcm9tICcuL21hdGVyaWFscyc7XG5pbXBvcnQge0RhdEFQSX0gZnJvbSAnLi9EYXRBUEknO1xuXG5leHBvcnQgY2xhc3MgRGF0TWVzaE1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIG1lc2gnLFxuICAgICAgZ2VvbWV0cnk6IHRydWUsXG4gICAgICBtYXRlcmlhbDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybXM6IHRydWUsXG4gICAgICBndWk6IGZhbHNlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICAgIHRoaXMuZm9sZCA9IHRoaXMuZ3VpLmFkZEZvbGRlcih0aGlzLnBhcmFtcy5uYW1lKTtcbiAgICB0aGlzLmN1c3RvbU1hdGVyaWFscyA9IGZhbHNlO1xuICB9XG5cbiAgYWRkQ29sb3Iob2JqZWN0LCBwcm9wZXJ0eSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBjb25zdCBjb2xvciA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICBpbnN0YW5jZS5hZGRDb2xvcih7W3Byb3BlcnR5XTogY29sb3IuZ2V0SGV4KCl9LCBwcm9wZXJ0eSkub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlLnJlcGxhY2UoJyMnLCAnMHgnKTtcbiAgICAgIGNvbG9yLnNldEhleCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBndWlNYXRlcmlhbChjb21wb25lbnQsIG1hdGVyaWFsLCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IHBhcmFtc1Byb2Nlc3NvciA9IHBhcmFtcyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtc1trZXldICYmIG1hdGVyaWFsW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN3aXRjaCAocGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgICAgdGhpcy5hZGRDb2xvcihtYXRlcmlhbCwga2V5LCBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICBpbnN0YW5jZS5hZGQobWF0ZXJpYWwsIGtleSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBpbnN0YW5jZS5hZGQobWF0ZXJpYWwsIGtleSwgcGFyYW1zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBwYXJhbXNQcm9jZXNzb3IobWF0ZXJpYWxzW21hdGVyaWFsLnR5cGVdKTtcbiAgICBwYXJhbXNQcm9jZXNzb3IobWF0ZXJpYWxzLmFueSk7XG4gIH1cblxuICBndWlHZW9tZXRyeShjb21wb25lbnQsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgaWYgKCFjb21wb25lbnQuZ18pIHRocm93IG5ldyBFcnJvcignRGF0R1VJTW9kdWxlIHJlcXVpcmVzIFdIUy5EeW5hbWljR2VvbWV0cnlNb2R1bGUgZm9yIGdlb21ldHJ5IHVwZGF0ZXMuJyk7XG5cbiAgICBjb25zdCBnZW9tUGFyYW1zID0gY29tcG9uZW50LnBhcmFtcy5nZW9tZXRyeTtcbiAgICBjb25zdCBnZW9tRGF0YSA9IHRoaXMucGFyYW1zLmdlb21ldHJ5O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZ2VvbVBhcmFtcykge1xuICAgICAgY29uc3QgZGF0YSA9IGdlb21EYXRhW2tleV07XG5cbiAgICAgIGNvbnN0IHJhbmdlID0gZGF0YSAmJiBkYXRhLnJhbmdlID8gZGF0YS5yYW5nZSA6IFswLCAxMDBdO1xuXG4gICAgICBpbnN0YW5jZS5hZGQoZ2VvbVBhcmFtcywga2V5KVxuICAgICAgICAubWluKHJhbmdlWzBdKVxuICAgICAgICAubWF4KHJhbmdlWzFdKVxuICAgICAgICAuc3RlcChrZXkuaW5kZXhPZignU2VnbWVudHMnKSA+IDAgPyAxIDogMC4xKVxuICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudC5nXyh7W2tleV06IHZhbHVlfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1hdGVyaWFscyhtYXRlcmlhbHMgPSB7fSkge1xuICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWxzID0gbWF0ZXJpYWxzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWF0ZXJpYWwobWF0ZXJpYWwsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMubWF0ZXJpYWwpIHJldHVybiBtYXRlcmlhbDtcblxuICAgICAgY29uc3QgZm9sZGVyID0gc2VsZi5mb2xkLmFkZEZvbGRlcignbWF0ZXJpYWwnKTtcbiAgICAgIHNlbGYuZ3VpTWF0ZXJpYWwodGhpcywgbWF0ZXJpYWwsIGZvbGRlcik7XG5cbiAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9LFxuXG4gICAgZ2VvbWV0cnkoZ2VvbWV0cnksIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMuZ2VvbWV0cnkpIHJldHVybiBnZW9tZXRyeTtcbiAgICAgIGlmICghdGhpcy5nXykgdGhyb3cgbmV3IEVycm9yKCdXSFMuRHluYW1pY0dlb21ldHJ5TW9kdWxlIHNob3VsZCBiZSB1c2VkIGluIGEgY29tcG9uZW50IChiZWZvcmUgZ3VpKScpO1xuXG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQuYWRkRm9sZGVyKCdnZW9tZXRyeScpO1xuICAgICAgc2VsZi5ndWlHZW9tZXRyeSh0aGlzLCBmb2xkZXIpO1xuXG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfSxcblxuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLmN1c3RvbU1hdGVyaWFscykgcmV0dXJuIG1lc2g7XG5cbiAgICAgIHNlbGYuY3VzdG9tTWF0ZXJpYWxzLmN1cnJlbnQgPSBtZXNoLm1hdGVyaWFsO1xuXG4gICAgICAvLyBjb25zdCBtYXRBbGlhcyA9IHttYXRlcmlhbDogJ2N1cnJlbnQnfTtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxmLmN1c3RvbU1hdGVyaWFscyk7XG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQ7XG5cbiAgICAgIGZvbGRlci5hZGQoe3R5cGU6ICdjdXJyZW50J30sICd0eXBlJywga2V5cykub25DaGFuZ2UodiA9PiB7XG4gICAgICAgIG1lc2gubWF0ZXJpYWwgPSBzZWxmLmN1c3RvbU1hdGVyaWFsc1t2XTtcbiAgICAgICAgZm9sZGVyLnJlbW92ZUZvbGRlcignbWF0ZXJpYWwnKTtcbiAgICAgICAgc2VsZi5ndWlNYXRlcmlhbCh0aGlzLCBtZXNoLm1hdGVyaWFsLCBmb2xkZXIuYWRkRm9sZGVyKCdtYXRlcmlhbCcpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9LFxuXG4gICAgb25XcmFwKGEsIHNlbGYpIHtcbiAgICAgIHNlbGYuZ3VpVHJhbnNmb3Jtcyh0aGlzLm5hdGl2ZSwgc2VsZi5mb2xkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRMaWdodE1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIGxpZ2h0JyxcbiAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgc2hhZG93OiB0cnVlLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGd1aTogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgdGhpcy5mb2xkID0gdGhpcy5ndWkuYWRkRm9sZGVyKHRoaXMucGFyYW1zLm5hbWUpO1xuICB9XG5cbiAgYWRkQ29sb3Iob2JqZWN0LCBwcm9wZXJ0eSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBjb25zdCBjb2xvciA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICBpbnN0YW5jZS5hZGRDb2xvcih7W3Byb3BlcnR5XTogY29sb3IuZ2V0SGV4KCl9LCBwcm9wZXJ0eSkub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlLnJlcGxhY2UoJyMnLCAnMHgnKTtcbiAgICAgIGNvbG9yLnNldEhleCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbGlnaHQobGlnaHQsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMubGlnaHQpIHJldHVybiBsaWdodDtcblxuICAgICAgc2VsZi5mb2xkT2JqZWN0KGxpZ2h0LCB0aGlzLnBhcmFtcywgc2VsZi5mb2xkLmFkZEZvbGRlcignbGlnaHQnKSk7XG4gICAgICBzZWxmLmZvbGRPYmplY3QobGlnaHQuc2hhZG93LCB0aGlzLnBhcmFtcy5zaGFkb3csIHNlbGYuZm9sZC5hZGRGb2xkZXIoJ3NoYWRvdycpKTtcblxuICAgICAgcmV0dXJuIGxpZ2h0O1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRDYW1lcmFNb2R1bGUgZXh0ZW5kcyBEYXRBUEkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZ3VpKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBuYW1lOiAnVW5rbm93biBjYW1lcmEnLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGNhbWVyYTogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgY2FtZXJhKGNhbWVyYSwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5jYW1lcmEpIHJldHVybiBjYW1lcmE7XG4gICAgICBzZWxmLmZvbGRPYmplY3QoY2FtZXJhLCB0aGlzLnBhcmFtcywgc2VsZi5mb2xkLCAoKSA9PiB7XG4gICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNhbWVyYTtcbiAgICB9LFxuXG4gICAgb25XcmFwKGEsIHNlbGYpIHtcbiAgICAgIHNlbGYuZ3VpVHJhbnNmb3Jtcyh0aGlzLm5hdGl2ZSwgc2VsZi5mb2xkKTtcbiAgICB9XG4gIH1cbn07XG4iLCJleHBvcnQgY2xhc3MgRGF0Q3VzdG9tTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJvcHMgPSBbXSwgZ3VpKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZ3VpID0gZ3VpO1xuXG4gICAgcHJvcHMuZm9yRWFjaCh0aGlzLmFkZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFkZCh7XG4gICAgbmFtZSxcbiAgICB2YWx1ZSxcbiAgICByYW5nZSA9IFtmYWxzZSwgZmFsc2VdLFxuICAgIHN0ZXAgPSAxLFxuICAgIG9uQ2hhbmdlLFxuICAgIG9uRmluaXNoQ2hhbmdlLFxuICAgIGxpc3RlbiA9IGZhbHNlXG4gIH0pIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5ndWkuYWRkKHtbbmFtZV06IHZhbHVlfSwgbmFtZSk7XG5cbiAgICBpZiAocmFuZ2VbMF0gIT09IGZhbHNlKSBjb250cm9sbGVyLm1pbihyYW5nZVswXSlcbiAgICBpZiAocmFuZ2VbMV0gIT09IGZhbHNlKSBjb250cm9sbGVyLm1heChyYW5nZVsxXSlcblxuICAgIGNvbnRyb2xsZXIuc3RlcChzdGVwKTtcblxuICAgIGlmIChvbkNoYW5nZSkgY29udHJvbGxlci5vbkNoYW5nZShvbkNoYW5nZSk7XG4gICAgaWYgKG9uRmluaXNoQ2hhbmdlKSBjb250cm9sbGVyLm9uRmluaXNoQ2hhbmdlKG9uRmluaXNoQ2hhbmdlKTtcbiAgICBpZiAobGlzdGVuKSBjb250cm9sbGVyLmxpc3RlbigpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgZGF0IGZyb20gJ2RhdC1ndWknO1xuXG5pbXBvcnQge0RhdE1lc2hNb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdE1lc2hNb2R1bGUnO1xuaW1wb3J0IHtEYXRMaWdodE1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0TGlnaHRNb2R1bGUnO1xuaW1wb3J0IHtEYXRDYW1lcmFNb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdENhbWVyYU1vZHVsZSc7XG5pbXBvcnQge0RhdEN1c3RvbU1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0Q3VzdG9tTW9kdWxlJztcblxuLy8gUG9seWZpbGxcbmRhdC5HVUkucHJvdG90eXBlLnJlbW92ZUZvbGRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGZvbGRlciA9IHRoaXMuX19mb2xkZXJzW25hbWVdO1xuICBpZiAoIWZvbGRlcikge1xuICAgIHJldHVybjtcbiAgfVxuICBmb2xkZXIuY2xvc2UoKTtcbiAgdGhpcy5fX3VsLnJlbW92ZUNoaWxkKGZvbGRlci5kb21FbGVtZW50LnBhcmVudE5vZGUpO1xuICBkZWxldGUgdGhpcy5fX2ZvbGRlcnNbbmFtZV07XG4gIHRoaXMub25SZXNpemUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0R1VJTW9kdWxlIHtcbiAgc3RhdGljIG5ldyhwYXJhbXMpIHtcbiAgICByZXR1cm4gbmV3IERhdEdVSU1vZHVsZShuZXcgZGF0LkdVSShwYXJhbXMpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGd1aSA9IG5ldyBkYXQuR1VJKHthdXRvUGxhY2U6IGZhbHNlfSkpIHtcbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdndWkvZGF0Lmd1aScpO1xuICAgIGNvbnN0IGRvbSA9IHRoaXMuZ3VpLmRvbUVsZW1lbnQ7XG4gICAgY29uc3Qgc3R5bGUgPSBkb20uc3R5bGU7XG5cbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudG9wID0gMDtcbiAgICBzdHlsZS5yaWdodCA9ICcyMHB4JztcblxuICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JykuYXBwZW5kQ2hpbGQodGhpcy5ndWkuZG9tRWxlbWVudCk7XG4gIH1cblxuICBzZXQoZ3VpKSB7XG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb2xkZXIobmFtZSA9ICdmb2xkZXInKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRHVUlNb2R1bGUodGhpcy5ndWkuYWRkRm9sZGVyKG5hbWUpKTtcbiAgfVxuXG4gIE1lc2gocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRNZXNoTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxuXG4gIExpZ2h0KHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0TGlnaHRNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgQ2FtZXJhKHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0Q2FtZXJhTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxuXG4gIEN1c3RvbShwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdEN1c3RvbU1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cbn1cblxuRGF0R1VJTW9kdWxlLmRhdCA9IGRhdDtcbiJdLCJuYW1lcyI6WyJhZGRpdGlvbmFsIiwiYWRkIiwib3JpZ2luIiwiYWRkdiIsIk9iamVjdCIsImFzc2lnbiIsIm1hcCIsInZhbHVlIiwiRnJvbnRTaWRlIiwiQmFja1NpZGUiLCJEb3VibGVTaWRlIiwiU21vb3RoU2hhZGluZyIsIkZsYXRTaGFkaW5nIiwiTm9ybWFsQmxlbmRpbmciLCJBZGRpdGl2ZUJsZW5kaW5nIiwiU3VidHJhY3RpdmVCbGVuZGluZyIsIk11bHRpcGx5QmxlbmRpbmciLCJDdXN0b21CbGVuZGluZyIsIkFsd2F5c0RlcHRoIiwiTGVzc0RlcHRoIiwiTGVzc0VxdWFsRGVwdGgiLCJHcmVhdGVyRXF1YWxEZXB0aCIsIkdyZWF0ZXJEZXB0aCIsIk5vdEVxdWFsRGVwdGgiLCJEYXRBUEkiLCJvYmplY3QiLCJpbnN0YW5jZSIsImZvbGQiLCJvbkNoYW5nZSIsImtleSIsImlzQ29sb3IiLCJhZGRDb2xvciIsImJhYmVsSGVscGVycy50eXBlb2YiLCJmb2xkT2JqZWN0IiwiYWRkRm9sZGVyIiwicmFuZ2UiLCJyZXBlYXQiLCJ0b1N0cmluZyIsImxlbmd0aCIsIm1pbiIsInN0ZXAiLCJuYXRpdmUiLCJwYXJhbXMiLCJ0cmFuc2Zvcm1zIiwiY29udHJvbGxlciIsInBvc2l0aW9uIiwicm90YXRpb24iLCJzY2FsZSIsIkRhdE1lc2hNb2R1bGUiLCJndWkiLCJicmlkZ2UiLCJtYXRlcmlhbCIsInNlbGYiLCJmb2xkZXIiLCJndWlNYXRlcmlhbCIsImdlb21ldHJ5IiwiZ18iLCJFcnJvciIsImd1aUdlb21ldHJ5IiwibWVzaCIsImN1c3RvbU1hdGVyaWFscyIsImN1cnJlbnQiLCJrZXlzIiwidHlwZSIsInYiLCJyZW1vdmVGb2xkZXIiLCJhIiwiZ3VpVHJhbnNmb3JtcyIsIm5hbWUiLCJwcm9wZXJ0eSIsImNvbG9yIiwiZ2V0SGV4IiwicmVwbGFjZSIsInNldEhleCIsImNvbXBvbmVudCIsInBhcmFtc1Byb2Nlc3NvciIsInVuZGVmaW5lZCIsIm1hdGVyaWFscyIsImFueSIsImdlb21QYXJhbXMiLCJnZW9tRGF0YSIsImRhdGEiLCJtYXgiLCJpbmRleE9mIiwiRGF0TGlnaHRNb2R1bGUiLCJsaWdodCIsInNoYWRvdyIsIkRhdENhbWVyYU1vZHVsZSIsImNhbWVyYSIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJEYXRDdXN0b21Nb2R1bGUiLCJwcm9wcyIsImZvckVhY2giLCJiaW5kIiwib25GaW5pc2hDaGFuZ2UiLCJsaXN0ZW4iLCJkYXQiLCJHVUkiLCJwcm90b3R5cGUiLCJfX2ZvbGRlcnMiLCJjbG9zZSIsIl9fdWwiLCJyZW1vdmVDaGlsZCIsImRvbUVsZW1lbnQiLCJwYXJlbnROb2RlIiwib25SZXNpemUiLCJEYXRHVUlNb2R1bGUiLCJhdXRvUGxhY2UiLCJtYW5hZ2VyIiwiZGVmaW5lIiwiZG9tIiwic3R5bGUiLCJ0b3AiLCJyaWdodCIsImdldCIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
