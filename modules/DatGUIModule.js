/* Built for whs v2.1.9 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three'), require('dat-gui')) :
  typeof define === 'function' && define.amd ? define(['three', 'dat-gui'], factory) :
  (global.DatGUIModule = factory(global.THREE,null));
}(this, (function (three,dat) { 'use strict';

  dat = dat && dat.hasOwnProperty('default') ? dat['default'] : dat;

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

    maps: {
      map: 'texture',
      alphaMap: 'texture',
      envMap: 'texture',
      lightMap: 'texture',
      lightMapIntensity: 'number'
    },

    normal: {
      normalMap: 'texture',
      normalScale: 'number'
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
    },

    specular: {
      specular: 'color',
      specularMap: 'texture'
    },

    ao: {
      aoMap: 'texture',
      aoMapIntensity: 'number'
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
      color: 'color',
      skinning: 'boolean',
      morphTargets: 'boolean',
      morphNormals: 'boolean'
    }, 'emissive', 'refr', 'maps', 'normal', 'specular', 'ao'),

    MeshPhongMaterial: add({
      color: 'color',
      skinning: 'boolean',
      morphTargets: 'boolean',
      morphNormals: 'boolean'
    }, 'displacement', 'emissive', 'maps', 'refr', 'specular', 'ao'),

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
            // let range = '1' + '0'.repeat(value.toString().length);
            // if (value.toString().indexOf('.') !== -1) range = 1;

            instance.add(object, key).min(0).step(0.001).onChange(onChange);
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

          var lightParams = Object.assign({}, this.params);
          delete lightParams.position;
          delete lightParams.rotation;
          delete lightParams.shadow;

          self.foldObject(_light, lightParams, self.fold.addFolder('light'));

          if (_light.shadow) {
            var shadowFolder = self.fold.addFolder('shadow');
            self.foldObject(_light.shadow, this.params.shadow, shadowFolder);

            console.log(_light);

            shadowFolder.add(_light, 'castShadow');
          }

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
            onChange = _ref.onChange,
            onFinishChange = _ref.onFinishChange,
            _ref$listen = _ref.listen,
            listen = _ref$listen === undefined ? false : _ref$listen;

        var controller = this.gui.add(defineProperty({}, name, value), name, range[0] || 0, range[1] || 1);

        controller.onChange(onChange);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0R1VJTW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvbWF0ZXJpYWxzLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdEFQSS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRNZXNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdExpZ2h0TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdENhbWVyYU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRDdXN0b21Nb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9EYXRHVUlNb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRnJvbnRTaWRlLFxuICBCYWNrU2lkZSxcbiAgRG91YmxlU2lkZSxcblxuICBTbW9vdGhTaGFkaW5nLFxuICBGbGF0U2hhZGluZyxcblxuICBOb0JsZW5kaW5nLFxuICBOb3JtYWxCbGVuZGluZyxcbiAgQWRkaXRpdmVCbGVuZGluZyxcbiAgU3VidHJhY3RpdmVCbGVuZGluZyxcbiAgTXVsdGlwbHlCbGVuZGluZyxcbiAgQ3VzdG9tQmxlbmRpbmcsXG5cbiAgTmV2ZXJEZXB0aCxcbiAgQWx3YXlzRGVwdGgsXG4gIExlc3NEZXB0aCxcbiAgTGVzc0VxdWFsRGVwdGgsXG4gIEdyZWF0ZXJFcXVhbERlcHRoLFxuICBHcmVhdGVyRGVwdGgsXG4gIE5vdEVxdWFsRGVwdGhcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBhZGRpdGlvbmFsID0ge1xuICB3aXJlZnJhbWU6IHtcbiAgICB3aXJlZnJhbWU6ICdib29sZWFuJyxcbiAgICB3aXJlZnJhbWVMaW5lY2FwOiBbJ2J1dHQnLCAncm91bmQnLCAnc3F1YXJlJ10sXG4gICAgd2lyZWZyYW1lTGluZWpvaW46IFsncm91bmQnLCAnYmV2ZWwnLCAnbWl0ZXInXSxcbiAgICB3aXJlZnJhbWVMaW5ld2lkdGg6ICdudW1iZXInXG4gIH0sXG5cbiAgcmVmcjoge1xuICAgIHJlZmxlY3Rpdml0eTogJ251bWJlcicsXG4gICAgcmVmcmFjdGlvblJhdGlvOiAnbnVtYmVyJ1xuICB9LFxuXG4gIG1hcHM6IHtcbiAgICBtYXA6ICd0ZXh0dXJlJyxcbiAgICBhbHBoYU1hcDogJ3RleHR1cmUnLFxuICAgIGVudk1hcDogJ3RleHR1cmUnLFxuICAgIGxpZ2h0TWFwOiAndGV4dHVyZScsXG4gICAgbGlnaHRNYXBJbnRlbnNpdHk6ICdudW1iZXInXG4gIH0sXG5cbiAgbm9ybWFsOiB7XG4gICAgbm9ybWFsTWFwOiAndGV4dHVyZScsXG4gICAgbm9ybWFsU2NhbGU6ICdudW1iZXInXG4gIH0sXG5cbiAgZGlzcGxhY2VtZW50OiB7XG4gICAgZGlzcGxhY2VtZW50U2NhbGU6ICdudW1iZXInLFxuICAgIGRpc3BsYWNlbWVudEJpYXM6ICdudW1iZXInLFxuICAgIGRpc3BsYWNlbWVudE1hcDogJ3RleHR1cmUnXG4gIH0sXG5cbiAgZW1pc3NpdmU6IHtcbiAgICBlbWlzc2l2ZTogJ2NvbG9yJyxcbiAgICBlbWlzc2l2ZU1hcDogJ3RleHR1cmUnLFxuICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAnbnVtYmVyJ1xuICB9LFxuXG4gIHNwZWN1bGFyOiB7XG4gICAgc3BlY3VsYXI6ICdjb2xvcicsXG4gICAgc3BlY3VsYXJNYXA6ICd0ZXh0dXJlJ1xuICB9LFxuXG4gIGFvOiB7XG4gICAgYW9NYXA6ICd0ZXh0dXJlJyxcbiAgICBhb01hcEludGVuc2l0eTogJ251bWJlcidcbiAgfVxufVxuXG5jb25zdCBhZGQgPSAob3JpZ2luLCAuLi5hZGR2KSA9PiB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG9yaWdpbiwgLi4uYWRkdi5tYXAodmFsdWUgPT4gYWRkaXRpb25hbFt2YWx1ZV0pKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFueTogYWRkKHtcbiAgICBzaWRlOiB7RnJvbnRTaWRlLCBCYWNrU2lkZSwgRG91YmxlU2lkZX0sXG4gICAgc2hhZGluZzoge1Ntb290aFNoYWRpbmcsIEZsYXRTaGFkaW5nfSxcbiAgICBibGVuZGluZzoge1xuICAgICAgTm9CbGVuZGluZywgTm9ybWFsQmxlbmRpbmcsIEFkZGl0aXZlQmxlbmRpbmcsIFN1YnRyYWN0aXZlQmxlbmRpbmcsIE11bHRpcGx5QmxlbmRpbmcsIEN1c3RvbUJsZW5kaW5nXG4gICAgfSxcbiAgICBkZXB0aEZ1bmM6IHtcbiAgICAgIE5ldmVyRGVwdGgsIEFsd2F5c0RlcHRoLCBMZXNzRGVwdGgsIExlc3NFcXVhbERlcHRoLCBHcmVhdGVyRXF1YWxEZXB0aCwgR3JlYXRlckRlcHRoLCBOb3RFcXVhbERlcHRoXG4gICAgfVxuICB9LCAnd2lyZWZyYW1lJyksXG5cbiAgTWVzaEJhc2ljTWF0ZXJpYWw6IHtcbiAgICBjb2xvcjogJ2NvbG9yJyxcbiAgICBsaWdodHM6ICdib29sZWFuJyxcbiAgICBsaW5ld2lkdGg6ICdudW1iZXInLFxuICAgIGxpbmVjYXA6IFsnYnV0dCcsICdyb3VuZCcsICdzcXVhcmUnXSxcbiAgICBsaW5lam9pbjogWydyb3VuZCcsICdiZXZlbCcsICdtaXRlciddXG4gIH0sXG5cbiAgTWVzaExhbWJlcnRNYXRlcmlhbDogYWRkKHtcbiAgICBjb2xvcjogJ2NvbG9yJyxcbiAgICBza2lubmluZzogJ2Jvb2xlYW4nLFxuICAgIG1vcnBoVGFyZ2V0czogJ2Jvb2xlYW4nLFxuICAgIG1vcnBoTm9ybWFsczogJ2Jvb2xlYW4nXG4gIH0sICdlbWlzc2l2ZScsICdyZWZyJywgJ21hcHMnLCAnbm9ybWFsJywgJ3NwZWN1bGFyJywgJ2FvJyksXG5cbiAgTWVzaFBob25nTWF0ZXJpYWw6IGFkZCh7XG4gICAgY29sb3I6ICdjb2xvcicsXG4gICAgc2tpbm5pbmc6ICdib29sZWFuJyxcbiAgICBtb3JwaFRhcmdldHM6ICdib29sZWFuJyxcbiAgICBtb3JwaE5vcm1hbHM6ICdib29sZWFuJ1xuICB9LCAnZGlzcGxhY2VtZW50JywgJ2VtaXNzaXZlJywgJ21hcHMnLCAncmVmcicsICdzcGVjdWxhcicsICdhbycpLFxuXG4gIE1lc2hEZXB0aE1hdGVyaWFsOiB7XG5cbiAgfVxuICAvLyBUbyBiZSBjb250aW51ZWQuLi5cbn1cbiIsImV4cG9ydCBjbGFzcyBEYXRBUEkge1xuICBmb2xkT2JqZWN0KG9iamVjdCwgb3JpZ2luLCBpbnN0YW5jZSA9IHRoaXMuZm9sZCwgb25DaGFuZ2UgPSAoKSA9PiB7fSkge1xuICAgIGZvciAobGV0IGtleSBpbiBvcmlnaW4pIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICBpZiAoIXZhbHVlKSBjb250aW51ZTtcblxuICAgICAgaWYgKHZhbHVlLmlzQ29sb3IpIHtcbiAgICAgICAgdGhpcy5hZGRDb2xvcihvYmplY3QsIGtleSwgaW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3JpZ2luW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChvYmplY3Rba2V5XSA9PT0gb2JqZWN0KSBjb250aW51ZTtcbiAgICAgICAgdGhpcy5mb2xkT2JqZWN0KG9iamVjdFtrZXldLCBvcmlnaW5ba2V5XSwgaW5zdGFuY2UuYWRkRm9sZGVyKGtleSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbGV0IHJhbmdlID0gJzEnICsgJzAnLnJlcGVhdCh2YWx1ZS50b1N0cmluZygpLmxlbmd0aCk7XG4gICAgICAgIC8vIGlmICh2YWx1ZS50b1N0cmluZygpLmluZGV4T2YoJy4nKSAhPT0gLTEpIHJhbmdlID0gMTtcblxuICAgICAgICBpbnN0YW5jZS5hZGQob2JqZWN0LCBrZXkpXG4gICAgICAgICAgLm1pbigwKVxuICAgICAgICAgIC5zdGVwKDAuMDAxKVxuICAgICAgICAgIC5vbkNoYW5nZShvbkNoYW5nZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ3VpVHJhbnNmb3JtcyhuYXRpdmUsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgaWYgKCF0aGlzLnBhcmFtcy50cmFuc2Zvcm1zKSByZXR1cm47XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gaW5zdGFuY2UuYWRkRm9sZGVyKCd0cmFuc2Zvcm1zJyk7XG5cbiAgICAvLyBwb3NpdGlvblxuICAgIGNvbnN0IHBvc2l0aW9uID0gY29udHJvbGxlci5hZGRGb2xkZXIoJ3Bvc2l0aW9uJyk7XG4gICAgcG9zaXRpb24uYWRkKG5hdGl2ZS5wb3NpdGlvbiwgJ3gnKTtcbiAgICBwb3NpdGlvbi5hZGQobmF0aXZlLnBvc2l0aW9uLCAneScpO1xuICAgIHBvc2l0aW9uLmFkZChuYXRpdmUucG9zaXRpb24sICd6Jyk7XG5cbiAgICAvLyByb3RhdGlvblxuICAgIGNvbnN0IHJvdGF0aW9uID0gY29udHJvbGxlci5hZGRGb2xkZXIoJ3JvdGF0aW9uJyk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3gnKS5zdGVwKDAuMSk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3knKS5zdGVwKDAuMSk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3onKS5zdGVwKDAuMSk7XG5cbiAgICAvLyBzY2FsZVxuICAgIGlmICghbmF0aXZlLnNjYWxlKSByZXR1cm47XG4gICAgY29uc3Qgc2NhbGUgPSBjb250cm9sbGVyLmFkZEZvbGRlcignc2NhbGUnKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneCcpLnN0ZXAoMC4xKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneScpLnN0ZXAoMC4xKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneicpLnN0ZXAoMC4xKTtcbiAgfVxufVxuIiwiaW1wb3J0IG1hdGVyaWFscyBmcm9tICcuL21hdGVyaWFscyc7XG5pbXBvcnQge0RhdEFQSX0gZnJvbSAnLi9EYXRBUEknO1xuXG5leHBvcnQgY2xhc3MgRGF0TWVzaE1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIG1lc2gnLFxuICAgICAgZ2VvbWV0cnk6IHRydWUsXG4gICAgICBtYXRlcmlhbDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybXM6IHRydWUsXG4gICAgICBndWk6IGZhbHNlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICAgIHRoaXMuZm9sZCA9IHRoaXMuZ3VpLmFkZEZvbGRlcih0aGlzLnBhcmFtcy5uYW1lKTtcbiAgICB0aGlzLmN1c3RvbU1hdGVyaWFscyA9IGZhbHNlO1xuICB9XG5cbiAgYWRkQ29sb3Iob2JqZWN0LCBwcm9wZXJ0eSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBjb25zdCBjb2xvciA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICBpbnN0YW5jZS5hZGRDb2xvcih7W3Byb3BlcnR5XTogY29sb3IuZ2V0SGV4KCl9LCBwcm9wZXJ0eSkub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlLnJlcGxhY2UoJyMnLCAnMHgnKTtcbiAgICAgIGNvbG9yLnNldEhleCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBndWlNYXRlcmlhbChjb21wb25lbnQsIG1hdGVyaWFsLCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IHBhcmFtc1Byb2Nlc3NvciA9IHBhcmFtcyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtc1trZXldICYmIG1hdGVyaWFsW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN3aXRjaCAocGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgICAgdGhpcy5hZGRDb2xvcihtYXRlcmlhbCwga2V5LCBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICBpbnN0YW5jZS5hZGQobWF0ZXJpYWwsIGtleSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBpbnN0YW5jZS5hZGQobWF0ZXJpYWwsIGtleSwgcGFyYW1zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBwYXJhbXNQcm9jZXNzb3IobWF0ZXJpYWxzW21hdGVyaWFsLnR5cGVdKTtcbiAgICBwYXJhbXNQcm9jZXNzb3IobWF0ZXJpYWxzLmFueSk7XG4gIH1cblxuICBndWlHZW9tZXRyeShjb21wb25lbnQsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgaWYgKCFjb21wb25lbnQuZ18pIHRocm93IG5ldyBFcnJvcignRGF0R1VJTW9kdWxlIHJlcXVpcmVzIFdIUy5EeW5hbWljR2VvbWV0cnlNb2R1bGUgZm9yIGdlb21ldHJ5IHVwZGF0ZXMuJyk7XG5cbiAgICBjb25zdCBnZW9tUGFyYW1zID0gY29tcG9uZW50LnBhcmFtcy5nZW9tZXRyeTtcbiAgICBjb25zdCBnZW9tRGF0YSA9IHRoaXMucGFyYW1zLmdlb21ldHJ5O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZ2VvbVBhcmFtcykge1xuICAgICAgY29uc3QgZGF0YSA9IGdlb21EYXRhW2tleV07XG5cbiAgICAgIGNvbnN0IHJhbmdlID0gZGF0YSAmJiBkYXRhLnJhbmdlID8gZGF0YS5yYW5nZSA6IFswLCAxMDBdO1xuXG4gICAgICBpbnN0YW5jZS5hZGQoZ2VvbVBhcmFtcywga2V5KVxuICAgICAgICAubWluKHJhbmdlWzBdKVxuICAgICAgICAubWF4KHJhbmdlWzFdKVxuICAgICAgICAuc3RlcChrZXkuaW5kZXhPZignU2VnbWVudHMnKSA+IDAgPyAxIDogMC4xKVxuICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudC5nXyh7W2tleV06IHZhbHVlfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1hdGVyaWFscyhtYXRlcmlhbHMgPSB7fSkge1xuICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWxzID0gbWF0ZXJpYWxzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWF0ZXJpYWwobWF0ZXJpYWwsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMubWF0ZXJpYWwpIHJldHVybiBtYXRlcmlhbDtcblxuICAgICAgY29uc3QgZm9sZGVyID0gc2VsZi5mb2xkLmFkZEZvbGRlcignbWF0ZXJpYWwnKTtcbiAgICAgIHNlbGYuZ3VpTWF0ZXJpYWwodGhpcywgbWF0ZXJpYWwsIGZvbGRlcik7XG5cbiAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9LFxuXG4gICAgZ2VvbWV0cnkoZ2VvbWV0cnksIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMuZ2VvbWV0cnkpIHJldHVybiBnZW9tZXRyeTtcbiAgICAgIGlmICghdGhpcy5nXykgdGhyb3cgbmV3IEVycm9yKCdXSFMuRHluYW1pY0dlb21ldHJ5TW9kdWxlIHNob3VsZCBiZSB1c2VkIGluIGEgY29tcG9uZW50IChiZWZvcmUgZ3VpKScpO1xuXG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQuYWRkRm9sZGVyKCdnZW9tZXRyeScpO1xuICAgICAgc2VsZi5ndWlHZW9tZXRyeSh0aGlzLCBmb2xkZXIpO1xuXG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfSxcblxuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLmN1c3RvbU1hdGVyaWFscykgcmV0dXJuIG1lc2g7XG5cbiAgICAgIHNlbGYuY3VzdG9tTWF0ZXJpYWxzLmN1cnJlbnQgPSBtZXNoLm1hdGVyaWFsO1xuXG4gICAgICAvLyBjb25zdCBtYXRBbGlhcyA9IHttYXRlcmlhbDogJ2N1cnJlbnQnfTtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxmLmN1c3RvbU1hdGVyaWFscyk7XG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQ7XG5cbiAgICAgIGZvbGRlci5hZGQoe3R5cGU6ICdjdXJyZW50J30sICd0eXBlJywga2V5cykub25DaGFuZ2UodiA9PiB7XG4gICAgICAgIG1lc2gubWF0ZXJpYWwgPSBzZWxmLmN1c3RvbU1hdGVyaWFsc1t2XTtcbiAgICAgICAgZm9sZGVyLnJlbW92ZUZvbGRlcignbWF0ZXJpYWwnKTtcbiAgICAgICAgc2VsZi5ndWlNYXRlcmlhbCh0aGlzLCBtZXNoLm1hdGVyaWFsLCBmb2xkZXIuYWRkRm9sZGVyKCdtYXRlcmlhbCcpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9LFxuXG4gICAgb25XcmFwKGEsIHNlbGYpIHtcbiAgICAgIHNlbGYuZ3VpVHJhbnNmb3Jtcyh0aGlzLm5hdGl2ZSwgc2VsZi5mb2xkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRMaWdodE1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIGxpZ2h0JyxcbiAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgc2hhZG93OiB0cnVlLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGd1aTogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgdGhpcy5mb2xkID0gdGhpcy5ndWkuYWRkRm9sZGVyKHRoaXMucGFyYW1zLm5hbWUpO1xuICB9XG5cbiAgYWRkQ29sb3Iob2JqZWN0LCBwcm9wZXJ0eSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBjb25zdCBjb2xvciA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICBpbnN0YW5jZS5hZGRDb2xvcih7W3Byb3BlcnR5XTogY29sb3IuZ2V0SGV4KCl9LCBwcm9wZXJ0eSkub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlLnJlcGxhY2UoJyMnLCAnMHgnKTtcbiAgICAgIGNvbG9yLnNldEhleCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbGlnaHQobGlnaHQsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMubGlnaHQpIHJldHVybiBsaWdodDtcblxuICAgICAgY29uc3QgbGlnaHRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhcmFtcyk7XG4gICAgICBkZWxldGUgbGlnaHRQYXJhbXMucG9zaXRpb247XG4gICAgICBkZWxldGUgbGlnaHRQYXJhbXMucm90YXRpb247XG4gICAgICBkZWxldGUgbGlnaHRQYXJhbXMuc2hhZG93O1xuXG4gICAgICBzZWxmLmZvbGRPYmplY3QobGlnaHQsIGxpZ2h0UGFyYW1zLCBzZWxmLmZvbGQuYWRkRm9sZGVyKCdsaWdodCcpKTtcblxuICAgICAgaWYgKGxpZ2h0LnNoYWRvdykge1xuICAgICAgICBjb25zdCBzaGFkb3dGb2xkZXIgPSBzZWxmLmZvbGQuYWRkRm9sZGVyKCdzaGFkb3cnKTtcbiAgICAgICAgc2VsZi5mb2xkT2JqZWN0KGxpZ2h0LnNoYWRvdywgdGhpcy5wYXJhbXMuc2hhZG93LCBzaGFkb3dGb2xkZXIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGxpZ2h0KTtcblxuICAgICAgICBzaGFkb3dGb2xkZXIuYWRkKGxpZ2h0LCAnY2FzdFNoYWRvdycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGlnaHQ7XG4gICAgfSxcblxuICAgIG9uV3JhcChhLCBzZWxmKSB7XG4gICAgICBzZWxmLmd1aVRyYW5zZm9ybXModGhpcy5uYXRpdmUsIHNlbGYuZm9sZCk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHtEYXRBUEl9IGZyb20gJy4vRGF0QVBJJztcblxuZXhwb3J0IGNsYXNzIERhdENhbWVyYU1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIGNhbWVyYScsXG4gICAgICB0cmFuc2Zvcm1zOiB0cnVlLFxuICAgICAgY2FtZXJhOiB0cnVlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICAgIHRoaXMuZm9sZCA9IHRoaXMuZ3VpLmFkZEZvbGRlcih0aGlzLnBhcmFtcy5uYW1lKTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBjYW1lcmEoY2FtZXJhLCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYucGFyYW1zLmNhbWVyYSkgcmV0dXJuIGNhbWVyYTtcbiAgICAgIHNlbGYuZm9sZE9iamVjdChjYW1lcmEsIHRoaXMucGFyYW1zLCBzZWxmLmZvbGQsICgpID0+IHtcbiAgICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2FtZXJhO1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufTtcbiIsImV4cG9ydCBjbGFzcyBEYXRDdXN0b21Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IFtdLCBndWkpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5ndWkgPSBndWk7XG5cbiAgICBwcm9wcy5mb3JFYWNoKHRoaXMuYWRkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgYWRkKHtcbiAgICBuYW1lLFxuICAgIHZhbHVlLFxuICAgIHJhbmdlID0gW2ZhbHNlLCBmYWxzZV0sXG4gICAgc3RlcCA9IDEsXG4gICAgb25DaGFuZ2UsXG4gICAgb25GaW5pc2hDaGFuZ2UsXG4gICAgbGlzdGVuID0gZmFsc2VcbiAgfSkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmd1aS5hZGQoe1tuYW1lXTogdmFsdWV9LCBuYW1lLCByYW5nZVswXSB8fCAwLCByYW5nZVsxXSB8fCAxKTtcblxuICAgIGNvbnRyb2xsZXIub25DaGFuZ2Uob25DaGFuZ2UpO1xuICAgIGlmIChvbkZpbmlzaENoYW5nZSkgY29udHJvbGxlci5vbkZpbmlzaENoYW5nZShvbkZpbmlzaENoYW5nZSk7XG4gICAgaWYgKGxpc3RlbikgY29udHJvbGxlci5saXN0ZW4oKTtcblxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9XG59O1xuIiwiaW1wb3J0IGRhdCBmcm9tICdkYXQtZ3VpJztcblxuaW1wb3J0IHtEYXRNZXNoTW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRNZXNoTW9kdWxlJztcbmltcG9ydCB7RGF0TGlnaHRNb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdExpZ2h0TW9kdWxlJztcbmltcG9ydCB7RGF0Q2FtZXJhTW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRDYW1lcmFNb2R1bGUnO1xuaW1wb3J0IHtEYXRDdXN0b21Nb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdEN1c3RvbU1vZHVsZSc7XG5cbi8vIFBvbHlmaWxsXG5kYXQuR1VJLnByb3RvdHlwZS5yZW1vdmVGb2xkZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBmb2xkZXIgPSB0aGlzLl9fZm9sZGVyc1tuYW1lXTtcbiAgaWYgKCFmb2xkZXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9sZGVyLmNsb3NlKCk7XG4gIHRoaXMuX191bC5yZW1vdmVDaGlsZChmb2xkZXIuZG9tRWxlbWVudC5wYXJlbnROb2RlKTtcbiAgZGVsZXRlIHRoaXMuX19mb2xkZXJzW25hbWVdO1xuICB0aGlzLm9uUmVzaXplKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdEdVSU1vZHVsZSB7XG4gIHN0YXRpYyBuZXcocGFyYW1zKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRHVUlNb2R1bGUobmV3IGRhdC5HVUkocGFyYW1zKSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihndWkgPSBuZXcgZGF0LkdVSSh7YXV0b1BsYWNlOiBmYWxzZX0pKSB7XG4gICAgdGhpcy5ndWkgPSBndWk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgnZ3VpL2RhdC5ndWknKTtcbiAgICBjb25zdCBkb20gPSB0aGlzLmd1aS5kb21FbGVtZW50O1xuICAgIGNvbnN0IHN0eWxlID0gZG9tLnN0eWxlO1xuXG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN0eWxlLnRvcCA9IDA7XG4gICAgc3R5bGUucmlnaHQgPSAnMjBweCc7XG5cbiAgICBtYW5hZ2VyLmdldCgnZWxlbWVudCcpLmFwcGVuZENoaWxkKHRoaXMuZ3VpLmRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc2V0KGd1aSkge1xuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9sZGVyKG5hbWUgPSAnZm9sZGVyJykge1xuICAgIHJldHVybiBuZXcgRGF0R1VJTW9kdWxlKHRoaXMuZ3VpLmFkZEZvbGRlcihuYW1lKSk7XG4gIH1cblxuICBNZXNoKHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0TWVzaE1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cblxuICBMaWdodChwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdExpZ2h0TW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxuXG4gIENhbWVyYShwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdENhbWVyYU1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cblxuICBDdXN0b20ocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRDdXN0b21Nb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG59XG5cbkRhdEdVSU1vZHVsZS5kYXQgPSBkYXQ7XG4iXSwibmFtZXMiOlsiYWRkaXRpb25hbCIsIndpcmVmcmFtZSIsIndpcmVmcmFtZUxpbmVjYXAiLCJ3aXJlZnJhbWVMaW5lam9pbiIsIndpcmVmcmFtZUxpbmV3aWR0aCIsInJlZnIiLCJyZWZsZWN0aXZpdHkiLCJyZWZyYWN0aW9uUmF0aW8iLCJtYXBzIiwibWFwIiwiYWxwaGFNYXAiLCJlbnZNYXAiLCJsaWdodE1hcCIsImxpZ2h0TWFwSW50ZW5zaXR5Iiwibm9ybWFsIiwibm9ybWFsTWFwIiwibm9ybWFsU2NhbGUiLCJkaXNwbGFjZW1lbnQiLCJkaXNwbGFjZW1lbnRTY2FsZSIsImRpc3BsYWNlbWVudEJpYXMiLCJkaXNwbGFjZW1lbnRNYXAiLCJlbWlzc2l2ZSIsImVtaXNzaXZlTWFwIiwiZW1pc3NpdmVJbnRlbnNpdHkiLCJzcGVjdWxhciIsInNwZWN1bGFyTWFwIiwiYW8iLCJhb01hcCIsImFvTWFwSW50ZW5zaXR5IiwiYWRkIiwib3JpZ2luIiwiYWRkdiIsIk9iamVjdCIsImFzc2lnbiIsInZhbHVlIiwiYW55Iiwic2lkZSIsIkZyb250U2lkZSIsIkJhY2tTaWRlIiwiRG91YmxlU2lkZSIsInNoYWRpbmciLCJTbW9vdGhTaGFkaW5nIiwiRmxhdFNoYWRpbmciLCJibGVuZGluZyIsIk5vQmxlbmRpbmciLCJOb3JtYWxCbGVuZGluZyIsIkFkZGl0aXZlQmxlbmRpbmciLCJTdWJ0cmFjdGl2ZUJsZW5kaW5nIiwiTXVsdGlwbHlCbGVuZGluZyIsIkN1c3RvbUJsZW5kaW5nIiwiZGVwdGhGdW5jIiwiTmV2ZXJEZXB0aCIsIkFsd2F5c0RlcHRoIiwiTGVzc0RlcHRoIiwiTGVzc0VxdWFsRGVwdGgiLCJHcmVhdGVyRXF1YWxEZXB0aCIsIkdyZWF0ZXJEZXB0aCIsIk5vdEVxdWFsRGVwdGgiLCJNZXNoQmFzaWNNYXRlcmlhbCIsImNvbG9yIiwibGlnaHRzIiwibGluZXdpZHRoIiwibGluZWNhcCIsImxpbmVqb2luIiwiTWVzaExhbWJlcnRNYXRlcmlhbCIsInNraW5uaW5nIiwibW9ycGhUYXJnZXRzIiwibW9ycGhOb3JtYWxzIiwiTWVzaFBob25nTWF0ZXJpYWwiLCJNZXNoRGVwdGhNYXRlcmlhbCIsIkRhdEFQSSIsIm9iamVjdCIsImluc3RhbmNlIiwiZm9sZCIsIm9uQ2hhbmdlIiwia2V5IiwiaXNDb2xvciIsImFkZENvbG9yIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsImZvbGRPYmplY3QiLCJhZGRGb2xkZXIiLCJtaW4iLCJzdGVwIiwibmF0aXZlIiwicGFyYW1zIiwidHJhbnNmb3JtcyIsImNvbnRyb2xsZXIiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJEYXRNZXNoTW9kdWxlIiwiZ3VpIiwiYnJpZGdlIiwibWF0ZXJpYWwiLCJzZWxmIiwiZm9sZGVyIiwiZ3VpTWF0ZXJpYWwiLCJnZW9tZXRyeSIsImdfIiwiRXJyb3IiLCJndWlHZW9tZXRyeSIsIm1lc2giLCJjdXN0b21NYXRlcmlhbHMiLCJjdXJyZW50Iiwia2V5cyIsInR5cGUiLCJ2IiwicmVtb3ZlRm9sZGVyIiwib25XcmFwIiwiYSIsImd1aVRyYW5zZm9ybXMiLCJuYW1lIiwicHJvcGVydHkiLCJnZXRIZXgiLCJyZXBsYWNlIiwic2V0SGV4IiwiY29tcG9uZW50IiwicGFyYW1zUHJvY2Vzc29yIiwidW5kZWZpbmVkIiwibWF0ZXJpYWxzIiwiZ2VvbVBhcmFtcyIsImdlb21EYXRhIiwiZGF0YSIsInJhbmdlIiwibWF4IiwiaW5kZXhPZiIsIkRhdExpZ2h0TW9kdWxlIiwibGlnaHQiLCJsaWdodFBhcmFtcyIsInNoYWRvdyIsInNoYWRvd0ZvbGRlciIsImNvbnNvbGUiLCJsb2ciLCJEYXRDYW1lcmFNb2R1bGUiLCJjYW1lcmEiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwiRGF0Q3VzdG9tTW9kdWxlIiwicHJvcHMiLCJmb3JFYWNoIiwiYmluZCIsIm9uRmluaXNoQ2hhbmdlIiwibGlzdGVuIiwiZGF0IiwiR1VJIiwicHJvdG90eXBlIiwiX19mb2xkZXJzIiwiY2xvc2UiLCJfX3VsIiwicmVtb3ZlQ2hpbGQiLCJkb21FbGVtZW50IiwicGFyZW50Tm9kZSIsIm9uUmVzaXplIiwiRGF0R1VJTW9kdWxlIiwiYXV0b1BsYWNlIiwibWFuYWdlciIsImRlZmluZSIsImRvbSIsInN0eWxlIiwidG9wIiwicmlnaHQiLCJnZXQiLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdCQSxJQUFNQSxhQUFhO0VBQ2pCQyxhQUFXO0VBQ1RBLGVBQVcsU0FERjtFQUVUQyxzQkFBa0IsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixRQUFsQixDQUZUO0VBR1RDLHVCQUFtQixDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLE9BQW5CLENBSFY7RUFJVEMsd0JBQW9CO0VBSlgsR0FETTs7RUFRakJDLFFBQU07RUFDSkMsa0JBQWMsUUFEVjtFQUVKQyxxQkFBaUI7RUFGYixHQVJXOztFQWFqQkMsUUFBTTtFQUNKQyxTQUFLLFNBREQ7RUFFSkMsY0FBVSxTQUZOO0VBR0pDLFlBQVEsU0FISjtFQUlKQyxjQUFVLFNBSk47RUFLSkMsdUJBQW1CO0VBTGYsR0FiVzs7RUFxQmpC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
