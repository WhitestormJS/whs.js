// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------
const conf = {
  shaders: {
    bluriness: 2,
    additiveCoef: 1.0,
    bleachOpacity: 0.5,
    vignetteDarkness: 1.0
  },
  world: {
    stats: "fps",
    autoresize: true,

    gravity: {
      x: 0,
      y: 0,
      z: 0
    },

    camera: {
      far: 10000,
      position: [0, 10, 30]
    },

    renderer: {
      autoClear: false
    }
  },
  glowSphere: {
    geometry: {
      radius: 10,
      widthSegments: 16,
      heightSegments: 16
    },

    mass: 10,

    material: {
      color: 0xff0000,
      kind: 'basic'
    },

    pos: {
      x: 0,
      y: 20,
      z: 0
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
      color: 0xcccccc,
      kind: 'basic'
    },

    pos: {
      x: 0,
      y: 20,
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

    pos: {
      x: 0,
      y: 0,
      z: 0
    },

    rot: {
      x: -Math.PI / 2
    }
  },
  glowPostProcessor: {

  },
  postProcessor: {

  }
};


// -----------------------------------------------------------------------------
// Glow related shaders
// -----------------------------------------------------------------------------
const BleachBypassShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "opacity": { value: 1.0 }

  },

  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [

    "uniform float opacity;",

    "uniform sampler2D tDiffuse;",

    "varying vec2 vUv;",

    "void main() {",

    "vec4 base = texture2D( tDiffuse, vUv );",

    "vec3 lumCoeff = vec3( 0.25, 0.65, 0.1 );",
    "float lum = dot( lumCoeff, base.rgb );",
    "vec3 blend = vec3( lum );",

    "float L = min( 1.0, max( 0.0, 10.0 * ( lum - 0.45 ) ) );",

    "vec3 result1 = 2.0 * base.rgb * blend;",
    "vec3 result2 = 1.0 - 2.0 * ( 1.0 - blend ) * ( 1.0 - base.rgb );",

    "vec3 newColor = mix( result1, result2, L );",

    "float A2 = opacity * base.a;",
    "vec3 mixRGB = A2 * newColor.rgb;",
    "mixRGB += ( ( 1.0 - A2 ) * base.rgb );",

    "gl_FragColor = vec4( mixRGB, base.a );",

    "}"

  ].join("\n")
};

const VerticalBlurShader = {
  uniforms: {

    "tDiffuse": { value: null },
    "v": { value: 1.0 / 512.0 }

  },
  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),
  fragmentShader: [

    "uniform sampler2D tDiffuse;",
    "uniform float v;",

    "varying vec2 vUv;",

    "void main() {",

    "vec4 sum = vec4( 0.0 );",

    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;",
    "gl_FragColor = sum;",
    "}"
  ].join("\n")
};

const HorizontalBlurShader = {
  uniforms: {

    "tDiffuse": { value: null },
    "h": { value: 1.0 / 512.0 }
  },
  vertexShader: [
    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"
  ].join("\n"),
  fragmentShader: [

    "uniform sampler2D tDiffuse;",
    "uniform float h;",

    "varying vec2 vUv;",

    "void main() {",

    "vec4 sum = vec4( 0.0 );",

    "sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;",
    "sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;",
    "sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;",
    "sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;",
    "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
    "sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;",
    "sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;",
    "sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;",
    "sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;",

    "gl_FragColor = sum;",

    "}"
  ].join("\n")
};

const VignetteShader = {
  uniforms: {
    "tDiffuse": { value: null },
    "offset": { value: 1.0 },
    "darkness": { value: 1.0 }
  },

  vertexShader: [
    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"
  ].join("\n"),
  fragmentShader: [
    "uniform float offset;",
    "uniform float darkness;",

    "uniform sampler2D tDiffuse;",

    "varying vec2 vUv;",

    "void main() {",

    // Eskil's vignette

    "vec4 texel = texture2D( tDiffuse, vUv );",
    "vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );",
    "gl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );",

    /*
    // alternative version from glfx.js
    // this one makes more "dusty" look (as opposed to "burned")

    "vec4 color = texture2D( tDiffuse, vUv );",
    "float dist = distance( vUv, vec2( 0.5 ) );",
    "color.rgb *= smoothstep( 0.8, offset * 0.799, dist *( darkness + offset ) );",
    "gl_FragColor = color;",
    */
    "}"
  ].join("\n")
};

const AdditiveShader = {

  uniforms: {
    tDiffuse: {
      type: "t",
      value: null
    },
    tAdd: {
      type: "t",
      value: null
    },
    fCoeff: {
      type: "f",
      value: 1.5
    }
  },

  vertexShader: [
    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"
  ].join("\n"),

  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform sampler2D tAdd;",
    "uniform float fCoeff;",

    "varying vec2 vUv;",

    "void main() {",

    "vec4 texel = texture2D( tDiffuse, vUv );",
    "vec4 add = texture2D( tAdd, vUv );",
    "gl_FragColor = texel + add * fCoeff;",

    "}"
  ].join("\n")
};

// -----------------------------------------------------------------------------
// Glow Object wrapping geometries in both normal and glow worlds
// -----------------------------------------------------------------------------
class GlowObject {
  constructor(options, glowOptions, geometryWorld, glowWorld) {
    this._options = options;
    this._glowOptions = glowOptions;
    this._geometryWorld = geometryWorld;
    this._glowWorld = glowWorld;

    this._init();
  }

  _init() {
    this.geometryObject = new WHS.Sphere(this._options);
    this.geometryObject.addTo(this._geometryWorld);

    this.glowObject = new WHS.Sphere(this._glowOptions);
    this.glowObject.addTo(this._glowWorld);
  }
}

// -----------------------------------------------------------------------------
// Game class
// -----------------------------------------------------------------------------
class Game {
  constructor(options) {
    this.options = options;

    this.world = new (PHYSICS.$world(WHS.World))(options.world);
    this.glowWorld = new (PHYSICS.$world(WHS.World))({ init: { render: false } });
    this.world.attachWorld(this.glowWorld);

    this.createGlowPostProcessing();
    this.createPostProcessing();

    this.createGeometry();
  }

  createGlowPostProcessing() {
    this.glowPostProcessor = new WHS.PostProcessor(this.options.glowPostProcessor, this.glowWorld);

    // render geometry
    this.glowPostProcessor.createRenderPass();

    // blur passes that will stretch the glow-shapes geometry
    this.glowPostProcessor.createPass(composer => {
      let pass = new WHS.ShaderPass('hblur_1', HorizontalBlurShader);
      pass.uniforms['h'].value = this.options.shaders.bluriness / window.innerWidth * 2;
      composer.addPass(pass);
    });

    this.glowPostProcessor.createPass(composer => {
      let pass = new WHS.ShaderPass('vblur_1', VerticalBlurShader);
      pass.uniforms['v'].value = this.options.shaders.bluriness / window.innerHeight * 2;
      composer.addPass(pass);
    });

    this.glowPostProcessor.createPass(composer => {
      let pass = new WHS.ShaderPass('hblur_2', HorizontalBlurShader);
      pass.uniforms['h'].value = this.options.shaders.bluriness / window.innerWidth * 2;
      composer.addPass(pass);
    });

    this.glowPostProcessor.createPass(composer => {
      let pass = new WHS.ShaderPass('vblur_2', VerticalBlurShader);
      pass.renderToScreen = false;
      pass.uniforms['v'].value = this.options.shaders.bluriness / window.innerHeight * 2;
      composer.addPass(pass);
    });
  }

  createPostProcessing() {
    this.postProcessor = new WHS.PostProcessor(this.options.postProcessor, this.world);

    // render geometry
    this.postProcessor.createRenderPass();

    // applying glow effect
    this.postProcessor.createPass(composer => {
      let pass = new WHS.ShaderPass('glow_additive', AdditiveShader);
      pass.renderToScreen = true;
      pass.needsSwap = true;
      pass.uniforms['fCoeff'].value = this.options.shaders.additiveCoef;
      pass.uniforms['tAdd'].value = this.glowPostProcessor.composer.renderTarget2.texture;
      composer.addPass(pass);
    });

    // this.postProcessor.createPass(composer => {
    //   let pass = new WHS.TexturePass('rtt1', this.glowPostProcessor.composer.renderTarget1.texture);
    //   pass.renderToScreen = true;
    //   composer.addPass(pass);
    // })

    // bleach bypass
    // this.postProcessor.createPass(composer => {
    //   let pass = new WHS.ShaderPass('bleach_bypass', BleachBypassShader);
    //   pass.renderToScreen = false;
    //   pass.uniforms['opacity'].value = this.options.shaders.bleachOpacity;
    //   composer.addPass(pass);
    // });

    // vignetting
    // this.postProcessor.createPass(composer => {
    //   let pass = new WHS.ShaderPass('vignette', VignetteShader);
    //   pass.renderToScreen = true;
    //   pass.uniforms['darkness'].value = this.options.shaders.vignetteDarkness;
    //   composer.addPass(pass);
    // });
  }

  createGeometry() {
    this.plane = new WHS.Plane(this.options.plane);
    this.plane.addTo(this.world);

    // create random glow objects here
    this.glowSpheres = [];
    this.glowSpheres.push(new GlowObject(this.options.sphere, this.options.glowSphere, this.world, this.glowWorld));
  }

  start() {
    this.world.setControls(WHS.orbitControls());
    this.world.start();
  }
}

// -----------------------------------------------------------------------------
// Application bootstrap
// -----------------------------------------------------------------------------
var app = null;

function bootstrap() {
  app.start()
}

function configure() {
  return new Promise((resolve) => {
    // some async config fetch could be done from here
    // ...

    // Create a Game instance with its conf
    app = new Game(conf);
    resolve(true);
  });
}

configure().then(() => bootstrap());
