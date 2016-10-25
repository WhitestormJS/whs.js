(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------
var conf = {
  world: {
    stats: "fps",
    autoresize: true,

    gravity: {
      x: 0,
      y: -100,
      z: 0
    },

    camera: {
      far: 10000,
      y: 10,
      z: 30
    }
  },
  sphere: {
    geometry: {
      radius: 5,
      widthSegments: 16,
      heightSegments: 16
    },

    mass: 10,

    material: {
      color: 0xffffff,
      kind: 'basic'
    },

    position: {
      x: 0,
      y: 50,
      z: 0
    }
  },
  plane: {
    geometry: {
      width: 250,
      height: 250
    },

    mass: 0,

    material: {
      color: 0xff0000,
      kind: "basic"
    },

    position: {
      x: 0,
      y: 0,
      z: 0
    },

    rotation: {
      x: -Math.PI / 2
    }
  },
  postProcessor: {
    renderTarget: {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    }
  }
};

// -----------------------------------------------------------------------------
// Glitch Pass
// -----------------------------------------------------------------------------
var DigitalGlitchShader = {

  uniforms: {

    "tDiffuse": { value: null }, //diffuse texture
    "tDisp": { value: null }, //displacement texture for digital glitch squares
    "byp": { value: 0 }, //apply the glitch ?
    "amount": { value: 0.08 },
    "angle": { value: 0.02 },
    "seed": { value: 0.02 },
    "seed_x": { value: 0.02 }, //-1,1
    "seed_y": { value: 0.02 }, //-1,1
    "distortion_x": { value: 0.5 },
    "distortion_y": { value: 0.6 },
    "col_s": { value: 0.05 }
  },

  vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

  fragmentShader: ["uniform int byp;", //should we apply the glitch ?

  "uniform sampler2D tDiffuse;", "uniform sampler2D tDisp;", "uniform float amount;", "uniform float angle;", "uniform float seed;", "uniform float seed_x;", "uniform float seed_y;", "uniform float distortion_x;", "uniform float distortion_y;", "uniform float col_s;", "varying vec2 vUv;", "float rand(vec2 co){", "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);", "}", "void main() {", "if(byp<1) {", "vec2 p = vUv;", "float xs = floor(gl_FragCoord.x / 0.5);", "float ys = floor(gl_FragCoord.y / 0.5);",
  //based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
  "vec4 normal = texture2D (tDisp, p*seed*seed);", "if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {", "if(seed_x>0.){", "p.y = 1. - (p.y + distortion_y);", "}", "else {", "p.y = distortion_y;", "}", "}", "if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {", "if(seed_y>0.){", "p.x=distortion_x;", "}", "else {", "p.x = 1. - (p.x + distortion_x);", "}", "}", "p.x+=normal.x*seed_x*(seed/5.);", "p.y+=normal.y*seed_y*(seed/5.);",
  //base from RGB shift shader
  "vec2 offset = amount * vec2( cos(angle), sin(angle));", "vec4 cr = texture2D(tDiffuse, p + offset);", "vec4 cga = texture2D(tDiffuse, p);", "vec4 cb = texture2D(tDiffuse, p - offset);", "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",
  //add noise
  "vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);", "gl_FragColor = gl_FragColor+ snow;", "}", "else {", "gl_FragColor=texture2D (tDiffuse, vUv);", "}", "}"].join("\n")
};

var GlitchPass = function (_WHS$Pass) {
  _inherits(GlitchPass, _WHS$Pass);

  function GlitchPass(name, dt_size) {
    _classCallCheck(this, GlitchPass);

    var _this = _possibleConstructorReturn(this, (GlitchPass.__proto__ || Object.getPrototypeOf(GlitchPass)).call(this, name));

    if (DigitalGlitchShader === undefined) console.error("THREE.GlitchPass relies on DigitalGlitchShader");

    var shader = DigitalGlitchShader;
    _this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    if (dt_size == undefined) dt_size = 64;

    _this.uniforms["tDisp"].value = _this.generateHeightmap(dt_size);

    _this.material = new THREE.ShaderMaterial({
      uniforms: _this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });

    _this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    _this.scene = new THREE.Scene();

    _this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
    _this.scene.add(_this.quad);

    _this.goWild = false;
    _this.curF = 0;
    _this.generateTrigger();
    return _this;
  }

  _createClass(GlitchPass, [{
    key: "render",
    value: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {
      this.uniforms["tDiffuse"].value = readBuffer.texture;
      this.uniforms['seed'].value = Math.random(); //default seeding
      this.uniforms['byp'].value = 0;

      if (this.curF % this.randX == 0 || this.goWild == true) {
        this.uniforms['amount'].value = Math.random() / 30;
        this.uniforms['angle'].value = THREE.Math.randFloat(-Math.PI, Math.PI);
        this.uniforms['seed_x'].value = THREE.Math.randFloat(-1, 1);
        this.uniforms['seed_y'].value = THREE.Math.randFloat(-1, 1);
        this.uniforms['distortion_x'].value = THREE.Math.randFloat(0, 1);
        this.uniforms['distortion_y'].value = THREE.Math.randFloat(0, 1);
        this.curF = 0;
        this.generateTrigger();
      } else if (this.curF % this.randX < this.randX / 5) {
        this.uniforms['amount'].value = Math.random() / 90;
        this.uniforms['angle'].value = THREE.Math.randFloat(-Math.PI, Math.PI);
        this.uniforms['distortion_x'].value = THREE.Math.randFloat(0, 1);
        this.uniforms['distortion_y'].value = THREE.Math.randFloat(0, 1);
        this.uniforms['seed_x'].value = THREE.Math.randFloat(-0.3, 0.3);
        this.uniforms['seed_y'].value = THREE.Math.randFloat(-0.3, 0.3);
      } else if (this.goWild == false) {
        this.uniforms['byp'].value = 1;
      }

      this.curF++;
      this.quad.material = this.material;

      if (this.renderToScreen) {
        renderer.render(this.scene, this.camera);
      } else {
        renderer.render(this.scene, this.camera, writeBuffer, this.clear);
      }
    }
  }, {
    key: "generateTrigger",
    value: function generateTrigger() {
      this.randX = THREE.Math.randInt(120, 240);
    }
  }, {
    key: "generateHeightmap",
    value: function generateHeightmap(dt_size) {
      var data_arr = new Float32Array(dt_size * dt_size * 3);
      var length = dt_size * dt_size;

      for (var i = 0; i < length; i++) {
        var val = THREE.Math.randFloat(0, 1);
        data_arr[i * 3 + 0] = val;
        data_arr[i * 3 + 1] = val;
        data_arr[i * 3 + 2] = val;
      }

      var texture = new THREE.DataTexture(data_arr, dt_size, dt_size, THREE.RGBFormat, THREE.FloatType);
      texture.needsUpdate = true;
      return texture;
    }
  }]);

  return GlitchPass;
}(WHS.Pass);

// -----------------------------------------------------------------------------
// Game class
// -----------------------------------------------------------------------------


var Game = function () {
  function Game(options) {
    _classCallCheck(this, Game);

    this.options = options;

    this.world = new WHS.World(options.world);

    this.createPostProcessing();
    this.createGeometry();
  }

  _createClass(Game, [{
    key: "createPostProcessing",
    value: function createPostProcessing() {
      this.postProcessor = new WHS.PostProcessor(this.options.postProcessor, this.world);

      this.postProcessor.createRenderPass();

      this.postProcessor.createPass(function (composer) {
        var pass = new GlitchPass('Glitch');
        pass.renderToScreen = true;
        composer.addPass(pass);
      });
    }
  }, {
    key: "createGeometry",
    value: function createGeometry() {
      this.plane = new WHS.Plane(this.options.plane);
      this.plane.addTo(this.world);

      this.sphere = new WHS.Sphere(this.options.sphere);
      this.sphere.addTo(this.world);
    }
  }, {
    key: "start",
    value: function start() {
      this.world.start();
    }
  }]);

  return Game;
}();

// -----------------------------------------------------------------------------
// Application bootstrap
// -----------------------------------------------------------------------------


var app = null;

function bootstrap() {
  app.start();
}

function configure() {
  return new Promise(function (resolve) {
    // some async config fetch could be done from here
    // ...

    // Create a Game instance with its conf
    app = new Game(conf);
    resolve(true);
  });
}

configure().then(function () {
  return bootstrap();
});

},{}]},{},[1]);
