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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0R1VJTW9kdWxlLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL21hdGVyaWFscy5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRBUEkuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvRGF0TWVzaE1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRMaWdodE1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRDYW1lcmFNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvRGF0Q3VzdG9tTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvRGF0R1VJTW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZyb250U2lkZSxcbiAgQmFja1NpZGUsXG4gIERvdWJsZVNpZGUsXG5cbiAgU21vb3RoU2hhZGluZyxcbiAgRmxhdFNoYWRpbmcsXG5cbiAgTm9CbGVuZGluZyxcbiAgTm9ybWFsQmxlbmRpbmcsXG4gIEFkZGl0aXZlQmxlbmRpbmcsXG4gIFN1YnRyYWN0aXZlQmxlbmRpbmcsXG4gIE11bHRpcGx5QmxlbmRpbmcsXG4gIEN1c3RvbUJsZW5kaW5nLFxuXG4gIE5ldmVyRGVwdGgsXG4gIEFsd2F5c0RlcHRoLFxuICBMZXNzRGVwdGgsXG4gIExlc3NFcXVhbERlcHRoLFxuICBHcmVhdGVyRXF1YWxEZXB0aCxcbiAgR3JlYXRlckRlcHRoLFxuICBOb3RFcXVhbERlcHRoXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgYWRkaXRpb25hbCA9IHtcbiAgd2lyZWZyYW1lOiB7XG4gICAgd2lyZWZyYW1lOiAnYm9vbGVhbicsXG4gICAgd2lyZWZyYW1lTGluZWNhcDogWydidXR0JywgJ3JvdW5kJywgJ3NxdWFyZSddLFxuICAgIHdpcmVmcmFtZUxpbmVqb2luOiBbJ3JvdW5kJywgJ2JldmVsJywgJ21pdGVyJ10sXG4gICAgd2lyZWZyYW1lTGluZXdpZHRoOiAnbnVtYmVyJ1xuICB9LFxuXG4gIHJlZnI6IHtcbiAgICByZWZsZWN0aXZpdHk6ICdudW1iZXInLFxuICAgIHJlZnJhY3Rpb25SYXRpbzogJ251bWJlcidcbiAgfSxcblxuICBtYXBzOiB7XG4gICAgbWFwOiAndGV4dHVyZScsXG4gICAgYWxwaGFNYXA6ICd0ZXh0dXJlJyxcbiAgICBlbnZNYXA6ICd0ZXh0dXJlJyxcbiAgICBsaWdodE1hcDogJ3RleHR1cmUnLFxuICAgIGxpZ2h0TWFwSW50ZW5zaXR5OiAnbnVtYmVyJ1xuICB9LFxuXG4gIG5vcm1hbDoge1xuICAgIG5vcm1hbE1hcDogJ3RleHR1cmUnLFxuICAgIG5vcm1hbFNjYWxlOiAnbnVtYmVyJ1xuICB9LFxuXG4gIGRpc3BsYWNlbWVudDoge1xuICAgIGRpc3BsYWNlbWVudFNjYWxlOiAnbnVtYmVyJyxcbiAgICBkaXNwbGFjZW1lbnRCaWFzOiAnbnVtYmVyJyxcbiAgICBkaXNwbGFjZW1lbnRNYXA6ICd0ZXh0dXJlJ1xuICB9LFxuXG4gIGVtaXNzaXZlOiB7XG4gICAgZW1pc3NpdmU6ICdjb2xvcicsXG4gICAgZW1pc3NpdmVNYXA6ICd0ZXh0dXJlJyxcbiAgICBlbWlzc2l2ZUludGVuc2l0eTogJ251bWJlcidcbiAgfSxcblxuICBzcGVjdWxhcjoge1xuICAgIHNwZWN1bGFyOiAnY29sb3InLFxuICAgIHNwZWN1bGFyTWFwOiAndGV4dHVyZSdcbiAgfSxcblxuICBhbzoge1xuICAgIGFvTWFwOiAndGV4dHVyZScsXG4gICAgYW9NYXBJbnRlbnNpdHk6ICdudW1iZXInXG4gIH1cbn1cblxuY29uc3QgYWRkID0gKG9yaWdpbiwgLi4uYWRkdikgPT4ge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihvcmlnaW4sIC4uLmFkZHYubWFwKHZhbHVlID0+IGFkZGl0aW9uYWxbdmFsdWVdKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhbnk6IGFkZCh7XG4gICAgc2lkZToge0Zyb250U2lkZSwgQmFja1NpZGUsIERvdWJsZVNpZGV9LFxuICAgIHNoYWRpbmc6IHtTbW9vdGhTaGFkaW5nLCBGbGF0U2hhZGluZ30sXG4gICAgYmxlbmRpbmc6IHtcbiAgICAgIE5vQmxlbmRpbmcsIE5vcm1hbEJsZW5kaW5nLCBBZGRpdGl2ZUJsZW5kaW5nLCBTdWJ0cmFjdGl2ZUJsZW5kaW5nLCBNdWx0aXBseUJsZW5kaW5nLCBDdXN0b21CbGVuZGluZ1xuICAgIH0sXG4gICAgZGVwdGhGdW5jOiB7XG4gICAgICBOZXZlckRlcHRoLCBBbHdheXNEZXB0aCwgTGVzc0RlcHRoLCBMZXNzRXF1YWxEZXB0aCwgR3JlYXRlckVxdWFsRGVwdGgsIEdyZWF0ZXJEZXB0aCwgTm90RXF1YWxEZXB0aFxuICAgIH1cbiAgfSwgJ3dpcmVmcmFtZScpLFxuXG4gIE1lc2hCYXNpY01hdGVyaWFsOiB7XG4gICAgY29sb3I6ICdjb2xvcicsXG4gICAgbGlnaHRzOiAnYm9vbGVhbicsXG4gICAgbGluZXdpZHRoOiAnbnVtYmVyJyxcbiAgICBsaW5lY2FwOiBbJ2J1dHQnLCAncm91bmQnLCAnc3F1YXJlJ10sXG4gICAgbGluZWpvaW46IFsncm91bmQnLCAnYmV2ZWwnLCAnbWl0ZXInXVxuICB9LFxuXG4gIE1lc2hMYW1iZXJ0TWF0ZXJpYWw6IGFkZCh7XG4gICAgY29sb3I6ICdjb2xvcicsXG4gICAgc2tpbm5pbmc6ICdib29sZWFuJyxcbiAgICBtb3JwaFRhcmdldHM6ICdib29sZWFuJyxcbiAgICBtb3JwaE5vcm1hbHM6ICdib29sZWFuJ1xuICB9LCAnZW1pc3NpdmUnLCAncmVmcicsICdtYXBzJywgJ25vcm1hbCcsICdzcGVjdWxhcicsICdhbycpLFxuXG4gIE1lc2hQaG9uZ01hdGVyaWFsOiBhZGQoe1xuICAgIGNvbG9yOiAnY29sb3InLFxuICAgIHNraW5uaW5nOiAnYm9vbGVhbicsXG4gICAgbW9ycGhUYXJnZXRzOiAnYm9vbGVhbicsXG4gICAgbW9ycGhOb3JtYWxzOiAnYm9vbGVhbidcbiAgfSwgJ2Rpc3BsYWNlbWVudCcsICdlbWlzc2l2ZScsICdtYXBzJywgJ3JlZnInLCAnc3BlY3VsYXInLCAnYW8nKSxcblxuICBNZXNoRGVwdGhNYXRlcmlhbDoge1xuXG4gIH1cbiAgLy8gVG8gYmUgY29udGludWVkLi4uXG59XG4iLCJleHBvcnQgY2xhc3MgRGF0QVBJIHtcbiAgZm9sZE9iamVjdChvYmplY3QsIG9yaWdpbiwgaW5zdGFuY2UgPSB0aGlzLmZvbGQsIG9uQ2hhbmdlID0gKCkgPT4ge30pIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb3JpZ2luKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgaWYgKCF2YWx1ZSkgY29udGludWU7XG5cbiAgICAgIGlmICh2YWx1ZS5pc0NvbG9yKSB7XG4gICAgICAgIHRoaXMuYWRkQ29sb3Iob2JqZWN0LCBrZXksIGluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9yaWdpbltrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAob2JqZWN0W2tleV0gPT09IG9iamVjdCkgY29udGludWU7XG4gICAgICAgIHRoaXMuZm9sZE9iamVjdChvYmplY3Rba2V5XSwgb3JpZ2luW2tleV0sIGluc3RhbmNlLmFkZEZvbGRlcihrZXkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxldCByYW5nZSA9ICcxJyArICcwJy5yZXBlYXQodmFsdWUudG9TdHJpbmcoKS5sZW5ndGgpO1xuICAgICAgICAvLyBpZiAodmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCcuJykgIT09IC0xKSByYW5nZSA9IDE7XG5cbiAgICAgICAgaW5zdGFuY2UuYWRkKG9iamVjdCwga2V5KVxuICAgICAgICAgIC5taW4oMClcbiAgICAgICAgICAuc3RlcCgwLjAwMSlcbiAgICAgICAgICAub25DaGFuZ2Uob25DaGFuZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGd1aVRyYW5zZm9ybXMobmF0aXZlLCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGlmICghdGhpcy5wYXJhbXMudHJhbnNmb3JtcykgcmV0dXJuO1xuXG4gICAgY29uc3QgY29udHJvbGxlciA9IGluc3RhbmNlLmFkZEZvbGRlcigndHJhbnNmb3JtcycpO1xuXG4gICAgLy8gcG9zaXRpb25cbiAgICBjb25zdCBwb3NpdGlvbiA9IGNvbnRyb2xsZXIuYWRkRm9sZGVyKCdwb3NpdGlvbicpO1xuICAgIHBvc2l0aW9uLmFkZChuYXRpdmUucG9zaXRpb24sICd4Jyk7XG4gICAgcG9zaXRpb24uYWRkKG5hdGl2ZS5wb3NpdGlvbiwgJ3knKTtcbiAgICBwb3NpdGlvbi5hZGQobmF0aXZlLnBvc2l0aW9uLCAneicpO1xuXG4gICAgLy8gcm90YXRpb25cbiAgICBjb25zdCByb3RhdGlvbiA9IGNvbnRyb2xsZXIuYWRkRm9sZGVyKCdyb3RhdGlvbicpO1xuICAgIHJvdGF0aW9uLmFkZChuYXRpdmUucm90YXRpb24sICd4Jykuc3RlcCgwLjEpO1xuICAgIHJvdGF0aW9uLmFkZChuYXRpdmUucm90YXRpb24sICd5Jykuc3RlcCgwLjEpO1xuICAgIHJvdGF0aW9uLmFkZChuYXRpdmUucm90YXRpb24sICd6Jykuc3RlcCgwLjEpO1xuXG4gICAgLy8gc2NhbGVcbiAgICBpZiAoIW5hdGl2ZS5zY2FsZSkgcmV0dXJuO1xuICAgIGNvbnN0IHNjYWxlID0gY29udHJvbGxlci5hZGRGb2xkZXIoJ3NjYWxlJyk7XG4gICAgc2NhbGUuYWRkKG5hdGl2ZS5zY2FsZSwgJ3gnKS5zdGVwKDAuMSk7XG4gICAgc2NhbGUuYWRkKG5hdGl2ZS5zY2FsZSwgJ3knKS5zdGVwKDAuMSk7XG4gICAgc2NhbGUuYWRkKG5hdGl2ZS5zY2FsZSwgJ3onKS5zdGVwKDAuMSk7XG4gIH1cbn1cbiIsImltcG9ydCBtYXRlcmlhbHMgZnJvbSAnLi9tYXRlcmlhbHMnO1xuaW1wb3J0IHtEYXRBUEl9IGZyb20gJy4vRGF0QVBJJztcblxuZXhwb3J0IGNsYXNzIERhdE1lc2hNb2R1bGUgZXh0ZW5kcyBEYXRBUEkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZ3VpKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBuYW1lOiAnVW5rbm93biBtZXNoJyxcbiAgICAgIGdlb21ldHJ5OiB0cnVlLFxuICAgICAgbWF0ZXJpYWw6IHRydWUsXG4gICAgICB0cmFuc2Zvcm1zOiB0cnVlLFxuICAgICAgZ3VpOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gICAgdGhpcy5jdXN0b21NYXRlcmlhbHMgPSBmYWxzZTtcbiAgfVxuXG4gIGFkZENvbG9yKG9iamVjdCwgcHJvcGVydHksIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgY29uc3QgY29sb3IgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgaW5zdGFuY2UuYWRkQ29sb3Ioe1twcm9wZXJ0eV06IGNvbG9yLmdldEhleCgpfSwgcHJvcGVydHkpLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB2YWx1ZS5yZXBsYWNlKCcjJywgJzB4Jyk7XG4gICAgICBjb2xvci5zZXRIZXgodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZ3VpTWF0ZXJpYWwoY29tcG9uZW50LCBtYXRlcmlhbCwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBjb25zdCBwYXJhbXNQcm9jZXNzb3IgPSBwYXJhbXMgPT4ge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXNba2V5XSAmJiBtYXRlcmlhbFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzd2l0Y2ggKHBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgICAgICAgIHRoaXMuYWRkQ29sb3IobWF0ZXJpYWwsIGtleSwgaW5zdGFuY2UpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICBpbnN0YW5jZS5hZGQobWF0ZXJpYWwsIGtleSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkKG1hdGVyaWFsLCBrZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkKG1hdGVyaWFsLCBrZXksIHBhcmFtc1trZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcGFyYW1zUHJvY2Vzc29yKG1hdGVyaWFsc1ttYXRlcmlhbC50eXBlXSk7XG4gICAgcGFyYW1zUHJvY2Vzc29yKG1hdGVyaWFscy5hbnkpO1xuICB9XG5cbiAgZ3VpR2VvbWV0cnkoY29tcG9uZW50LCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGlmICghY29tcG9uZW50LmdfKSB0aHJvdyBuZXcgRXJyb3IoJ0RhdEdVSU1vZHVsZSByZXF1aXJlcyBXSFMuRHluYW1pY0dlb21ldHJ5TW9kdWxlIGZvciBnZW9tZXRyeSB1cGRhdGVzLicpO1xuXG4gICAgY29uc3QgZ2VvbVBhcmFtcyA9IGNvbXBvbmVudC5wYXJhbXMuZ2VvbWV0cnk7XG4gICAgY29uc3QgZ2VvbURhdGEgPSB0aGlzLnBhcmFtcy5nZW9tZXRyeTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGdlb21QYXJhbXMpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBnZW9tRGF0YVtrZXldO1xuXG4gICAgICBjb25zdCByYW5nZSA9IGRhdGEgJiYgZGF0YS5yYW5nZSA/IGRhdGEucmFuZ2UgOiBbMCwgMTAwXTtcblxuICAgICAgaW5zdGFuY2UuYWRkKGdlb21QYXJhbXMsIGtleSlcbiAgICAgICAgLm1pbihyYW5nZVswXSlcbiAgICAgICAgLm1heChyYW5nZVsxXSlcbiAgICAgICAgLnN0ZXAoa2V5LmluZGV4T2YoJ1NlZ21lbnRzJykgPiAwID8gMSA6IDAuMSlcbiAgICAgICAgLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgICAgICBjb21wb25lbnQuZ18oe1trZXldOiB2YWx1ZX0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBtYXRlcmlhbHMobWF0ZXJpYWxzID0ge30pIHtcbiAgICB0aGlzLmN1c3RvbU1hdGVyaWFscyA9IG1hdGVyaWFscztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIG1hdGVyaWFsKG1hdGVyaWFsLCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYucGFyYW1zLm1hdGVyaWFsKSByZXR1cm4gbWF0ZXJpYWw7XG5cbiAgICAgIGNvbnN0IGZvbGRlciA9IHNlbGYuZm9sZC5hZGRGb2xkZXIoJ21hdGVyaWFsJyk7XG4gICAgICBzZWxmLmd1aU1hdGVyaWFsKHRoaXMsIG1hdGVyaWFsLCBmb2xkZXIpO1xuXG4gICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfSxcblxuICAgIGdlb21ldHJ5KGdlb21ldHJ5LCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYucGFyYW1zLmdlb21ldHJ5KSByZXR1cm4gZ2VvbWV0cnk7XG4gICAgICBpZiAoIXRoaXMuZ18pIHRocm93IG5ldyBFcnJvcignV0hTLkR5bmFtaWNHZW9tZXRyeU1vZHVsZSBzaG91bGQgYmUgdXNlZCBpbiBhIGNvbXBvbmVudCAoYmVmb3JlIGd1aSknKTtcblxuICAgICAgY29uc3QgZm9sZGVyID0gc2VsZi5mb2xkLmFkZEZvbGRlcignZ2VvbWV0cnknKTtcbiAgICAgIHNlbGYuZ3VpR2VvbWV0cnkodGhpcywgZm9sZGVyKTtcblxuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH0sXG5cbiAgICBtZXNoKG1lc2gsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5jdXN0b21NYXRlcmlhbHMpIHJldHVybiBtZXNoO1xuXG4gICAgICBzZWxmLmN1c3RvbU1hdGVyaWFscy5jdXJyZW50ID0gbWVzaC5tYXRlcmlhbDtcblxuICAgICAgLy8gY29uc3QgbWF0QWxpYXMgPSB7bWF0ZXJpYWw6ICdjdXJyZW50J307XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2VsZi5jdXN0b21NYXRlcmlhbHMpO1xuICAgICAgY29uc3QgZm9sZGVyID0gc2VsZi5mb2xkO1xuXG4gICAgICBmb2xkZXIuYWRkKHt0eXBlOiAnY3VycmVudCd9LCAndHlwZScsIGtleXMpLm9uQ2hhbmdlKHYgPT4ge1xuICAgICAgICBtZXNoLm1hdGVyaWFsID0gc2VsZi5jdXN0b21NYXRlcmlhbHNbdl07XG4gICAgICAgIGZvbGRlci5yZW1vdmVGb2xkZXIoJ21hdGVyaWFsJyk7XG4gICAgICAgIHNlbGYuZ3VpTWF0ZXJpYWwodGhpcywgbWVzaC5tYXRlcmlhbCwgZm9sZGVyLmFkZEZvbGRlcignbWF0ZXJpYWwnKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfSxcblxuICAgIG9uV3JhcChhLCBzZWxmKSB7XG4gICAgICBzZWxmLmd1aVRyYW5zZm9ybXModGhpcy5uYXRpdmUsIHNlbGYuZm9sZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0RhdEFQSX0gZnJvbSAnLi9EYXRBUEknO1xuXG5leHBvcnQgY2xhc3MgRGF0TGlnaHRNb2R1bGUgZXh0ZW5kcyBEYXRBUEkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZ3VpKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBuYW1lOiAnVW5rbm93biBsaWdodCcsXG4gICAgICBsaWdodDogdHJ1ZSxcbiAgICAgIHNoYWRvdzogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybXM6IHRydWUsXG4gICAgICBndWk6IGZhbHNlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICAgIHRoaXMuZm9sZCA9IHRoaXMuZ3VpLmFkZEZvbGRlcih0aGlzLnBhcmFtcy5uYW1lKTtcbiAgfVxuXG4gIGFkZENvbG9yKG9iamVjdCwgcHJvcGVydHksIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgY29uc3QgY29sb3IgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgaW5zdGFuY2UuYWRkQ29sb3Ioe1twcm9wZXJ0eV06IGNvbG9yLmdldEhleCgpfSwgcHJvcGVydHkpLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB2YWx1ZS5yZXBsYWNlKCcjJywgJzB4Jyk7XG4gICAgICBjb2xvci5zZXRIZXgodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIGxpZ2h0KGxpZ2h0LCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYucGFyYW1zLmxpZ2h0KSByZXR1cm4gbGlnaHQ7XG5cbiAgICAgIGNvbnN0IGxpZ2h0UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXJhbXMpO1xuICAgICAgZGVsZXRlIGxpZ2h0UGFyYW1zLnBvc2l0aW9uO1xuICAgICAgZGVsZXRlIGxpZ2h0UGFyYW1zLnJvdGF0aW9uO1xuICAgICAgZGVsZXRlIGxpZ2h0UGFyYW1zLnNoYWRvdztcblxuICAgICAgc2VsZi5mb2xkT2JqZWN0KGxpZ2h0LCBsaWdodFBhcmFtcywgc2VsZi5mb2xkLmFkZEZvbGRlcignbGlnaHQnKSk7XG5cbiAgICAgIGlmIChsaWdodC5zaGFkb3cpIHtcbiAgICAgICAgY29uc3Qgc2hhZG93Rm9sZGVyID0gc2VsZi5mb2xkLmFkZEZvbGRlcignc2hhZG93Jyk7XG4gICAgICAgIHNlbGYuZm9sZE9iamVjdChsaWdodC5zaGFkb3csIHRoaXMucGFyYW1zLnNoYWRvdywgc2hhZG93Rm9sZGVyKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhsaWdodCk7XG5cbiAgICAgICAgc2hhZG93Rm9sZGVyLmFkZChsaWdodCwgJ2Nhc3RTaGFkb3cnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxpZ2h0O1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRDYW1lcmFNb2R1bGUgZXh0ZW5kcyBEYXRBUEkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZ3VpKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBuYW1lOiAnVW5rbm93biBjYW1lcmEnLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGNhbWVyYTogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgY2FtZXJhKGNhbWVyYSwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5jYW1lcmEpIHJldHVybiBjYW1lcmE7XG4gICAgICBzZWxmLmZvbGRPYmplY3QoY2FtZXJhLCB0aGlzLnBhcmFtcywgc2VsZi5mb2xkLCAoKSA9PiB7XG4gICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNhbWVyYTtcbiAgICB9LFxuXG4gICAgb25XcmFwKGEsIHNlbGYpIHtcbiAgICAgIHNlbGYuZ3VpVHJhbnNmb3Jtcyh0aGlzLm5hdGl2ZSwgc2VsZi5mb2xkKTtcbiAgICB9XG4gIH1cbn07XG4iLCJleHBvcnQgY2xhc3MgRGF0Q3VzdG9tTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJvcHMgPSBbXSwgZ3VpKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZ3VpID0gZ3VpO1xuXG4gICAgcHJvcHMuZm9yRWFjaCh0aGlzLmFkZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFkZCh7XG4gICAgbmFtZSxcbiAgICB2YWx1ZSxcbiAgICByYW5nZSA9IFtmYWxzZSwgZmFsc2VdLFxuICAgIHN0ZXAgPSAxLFxuICAgIG9uQ2hhbmdlLFxuICAgIG9uRmluaXNoQ2hhbmdlLFxuICAgIGxpc3RlbiA9IGZhbHNlXG4gIH0pIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5ndWkuYWRkKHtbbmFtZV06IHZhbHVlfSwgbmFtZSwgcmFuZ2VbMF0gfHwgMCwgcmFuZ2VbMV0gfHwgMSk7XG5cbiAgICBjb250cm9sbGVyLm9uQ2hhbmdlKG9uQ2hhbmdlKTtcbiAgICBpZiAob25GaW5pc2hDaGFuZ2UpIGNvbnRyb2xsZXIub25GaW5pc2hDaGFuZ2Uob25GaW5pc2hDaGFuZ2UpO1xuICAgIGlmIChsaXN0ZW4pIGNvbnRyb2xsZXIubGlzdGVuKCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgfVxufTtcbiIsImltcG9ydCBkYXQgZnJvbSAnZGF0LWd1aSc7XG5cbmltcG9ydCB7RGF0TWVzaE1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0TWVzaE1vZHVsZSc7XG5pbXBvcnQge0RhdExpZ2h0TW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRMaWdodE1vZHVsZSc7XG5pbXBvcnQge0RhdENhbWVyYU1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0Q2FtZXJhTW9kdWxlJztcbmltcG9ydCB7RGF0Q3VzdG9tTW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRDdXN0b21Nb2R1bGUnO1xuXG4vLyBQb2x5ZmlsbFxuZGF0LkdVSS5wcm90b3R5cGUucmVtb3ZlRm9sZGVyID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZm9sZGVyID0gdGhpcy5fX2ZvbGRlcnNbbmFtZV07XG4gIGlmICghZm9sZGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvbGRlci5jbG9zZSgpO1xuICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoZm9sZGVyLmRvbUVsZW1lbnQucGFyZW50Tm9kZSk7XG4gIGRlbGV0ZSB0aGlzLl9fZm9sZGVyc1tuYW1lXTtcbiAgdGhpcy5vblJlc2l6ZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRHVUlNb2R1bGUge1xuICBzdGF0aWMgbmV3KHBhcmFtcykge1xuICAgIHJldHVybiBuZXcgRGF0R1VJTW9kdWxlKG5ldyBkYXQuR1VJKHBhcmFtcykpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZ3VpID0gbmV3IGRhdC5HVUkoe2F1dG9QbGFjZTogZmFsc2V9KSkge1xuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ2d1aS9kYXQuZ3VpJyk7XG4gICAgY29uc3QgZG9tID0gdGhpcy5ndWkuZG9tRWxlbWVudDtcbiAgICBjb25zdCBzdHlsZSA9IGRvbS5zdHlsZTtcblxuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS50b3AgPSAwO1xuICAgIHN0eWxlLnJpZ2h0ID0gJzIwcHgnO1xuXG4gICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKS5hcHBlbmRDaGlsZCh0aGlzLmd1aS5kb21FbGVtZW50KTtcbiAgfVxuXG4gIHNldChndWkpIHtcbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvbGRlcihuYW1lID0gJ2ZvbGRlcicpIHtcbiAgICByZXR1cm4gbmV3IERhdEdVSU1vZHVsZSh0aGlzLmd1aS5hZGRGb2xkZXIobmFtZSkpO1xuICB9XG5cbiAgTWVzaChwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdE1lc2hNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgTGlnaHQocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRMaWdodE1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cblxuICBDYW1lcmEocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRDYW1lcmFNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgQ3VzdG9tKHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0Q3VzdG9tTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxufVxuXG5EYXRHVUlNb2R1bGUuZGF0ID0gZGF0O1xuIl0sIm5hbWVzIjpbImFkZGl0aW9uYWwiLCJ3aXJlZnJhbWUiLCJ3aXJlZnJhbWVMaW5lY2FwIiwid2lyZWZyYW1lTGluZWpvaW4iLCJ3aXJlZnJhbWVMaW5ld2lkdGgiLCJyZWZyIiwicmVmbGVjdGl2aXR5IiwicmVmcmFjdGlvblJhdGlvIiwibWFwcyIsIm1hcCIsImFscGhhTWFwIiwiZW52TWFwIiwibGlnaHRNYXAiLCJsaWdodE1hcEludGVuc2l0eSIsIm5vcm1hbCIsIm5vcm1hbE1hcCIsIm5vcm1hbFNjYWxlIiwiZGlzcGxhY2VtZW50IiwiZGlzcGxhY2VtZW50U2NhbGUiLCJkaXNwbGFjZW1lbnRCaWFzIiwiZGlzcGxhY2VtZW50TWFwIiwiZW1pc3NpdmUiLCJlbWlzc2l2ZU1hcCIsImVtaXNzaXZlSW50ZW5zaXR5Iiwic3BlY3VsYXIiLCJzcGVjdWxhck1hcCIsImFvIiwiYW9NYXAiLCJhb01hcEludGVuc2l0eSIsImFkZCIsIm9yaWdpbiIsImFkZHYiLCJPYmplY3QiLCJhc3NpZ24iLCJ2YWx1ZSIsImFueSIsInNpZGUiLCJGcm9udFNpZGUiLCJCYWNrU2lkZSIsIkRvdWJsZVNpZGUiLCJzaGFkaW5nIiwiU21vb3RoU2hhZGluZyIsIkZsYXRTaGFkaW5nIiwiYmxlbmRpbmciLCJOb0JsZW5kaW5nIiwiTm9ybWFsQmxlbmRpbmciLCJBZGRpdGl2ZUJsZW5kaW5nIiwiU3VidHJhY3RpdmVCbGVuZGluZyIsIk11bHRpcGx5QmxlbmRpbmciLCJDdXN0b21CbGVuZGluZyIsImRlcHRoRnVuYyIsIk5ldmVyRGVwdGgiLCJBbHdheXNEZXB0aCIsIkxlc3NEZXB0aCIsIkxlc3NFcXVhbERlcHRoIiwiR3JlYXRlckVxdWFsRGVwdGgiLCJHcmVhdGVyRGVwdGgiLCJOb3RFcXVhbERlcHRoIiwiTWVzaEJhc2ljTWF0ZXJpYWwiLCJjb2xvciIsImxpZ2h0cyIsImxpbmV3aWR0aCIsImxpbmVjYXAiLCJsaW5lam9pbiIsIk1lc2hMYW1iZXJ0TWF0ZXJpYWwiLCJza2lubmluZyIsIm1vcnBoVGFyZ2V0cyIsIm1vcnBoTm9ybWFscyIsIk1lc2hQaG9uZ01hdGVyaWFsIiwiTWVzaERlcHRoTWF0ZXJpYWwiLCJEYXRBUEkiLCJvYmplY3QiLCJpbnN0YW5jZSIsImZvbGQiLCJvbkNoYW5nZSIsImtleSIsImlzQ29sb3IiLCJhZGRDb2xvciIsImJhYmVsSGVscGVycy50eXBlb2YiLCJmb2xkT2JqZWN0IiwiYWRkRm9sZGVyIiwibWluIiwic3RlcCIsIm5hdGl2ZSIsInBhcmFtcyIsInRyYW5zZm9ybXMiLCJjb250cm9sbGVyIiwicG9zaXRpb24iLCJyb3RhdGlvbiIsInNjYWxlIiwiRGF0TWVzaE1vZHVsZSIsImd1aSIsImJyaWRnZSIsIm1hdGVyaWFsIiwic2VsZiIsImZvbGRlciIsImd1aU1hdGVyaWFsIiwiZ2VvbWV0cnkiLCJnXyIsIkVycm9yIiwiZ3VpR2VvbWV0cnkiLCJtZXNoIiwiY3VzdG9tTWF0ZXJpYWxzIiwiY3VycmVudCIsImtleXMiLCJ0eXBlIiwidiIsInJlbW92ZUZvbGRlciIsIm9uV3JhcCIsImEiLCJndWlUcmFuc2Zvcm1zIiwibmFtZSIsInByb3BlcnR5IiwiZ2V0SGV4IiwicmVwbGFjZSIsInNldEhleCIsImNvbXBvbmVudCIsInBhcmFtc1Byb2Nlc3NvciIsInVuZGVmaW5lZCIsIm1hdGVyaWFscyIsImdlb21QYXJhbXMiLCJnZW9tRGF0YSIsImRhdGEiLCJyYW5nZSIsIm1heCIsImluZGV4T2YiLCJEYXRMaWdodE1vZHVsZSIsImxpZ2h0IiwibGlnaHRQYXJhbXMiLCJzaGFkb3ciLCJzaGFkb3dGb2xkZXIiLCJjb25zb2xlIiwibG9nIiwiRGF0Q2FtZXJhTW9kdWxlIiwiY2FtZXJhIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkRhdEN1c3RvbU1vZHVsZSIsInByb3BzIiwiZm9yRWFjaCIsImJpbmQiLCJvbkZpbmlzaENoYW5nZSIsImxpc3RlbiIsImRhdCIsIkdVSSIsInByb3RvdHlwZSIsIl9fZm9sZGVycyIsImNsb3NlIiwiX191bCIsInJlbW92ZUNoaWxkIiwiZG9tRWxlbWVudCIsInBhcmVudE5vZGUiLCJvblJlc2l6ZSIsIkRhdEdVSU1vZHVsZSIsImF1dG9QbGFjZSIsIm1hbmFnZXIiLCJkZWZpbmUiLCJkb20iLCJzdHlsZSIsInRvcCIsInJpZ2h0IiwiZ2V0IiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF3QkEsSUFBTUEsYUFBYTtFQUNqQkMsYUFBVztFQUNUQSxlQUFXLFNBREY7RUFFVEMsc0JBQWtCLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsUUFBbEIsQ0FGVDtFQUdUQyx1QkFBbUIsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixPQUFuQixDQUhWO0VBSVRDLHdCQUFvQjtFQUpYLEdBRE07O0VBUWpCQyxRQUFNO0VBQ0pDLGtCQUFjLFFBRFY7RUFFSkMscUJBQWlCO0VBRmIsR0FSVzs7RUFhakJDLFFBQU07RUFDSkMsU0FBSyxTQUREO0VBRUpDLGNBQVUsU0FGTjtFQUdKQyxZQUFRLFNBSEo7RUFJSkMsY0FBVSxTQUpOO0VBS0pDLHVCQUFtQjtFQUxmLEdBYlc7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
