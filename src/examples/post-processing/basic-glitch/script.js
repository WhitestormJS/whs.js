// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------
const conf = {
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

    pos: {
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

    pos: {
      x: 0,
      y: 0,
      z: 0
    },

    rot: {
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
const DigitalGlitchShader = {

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

  vertexShader: [

    "varying vec2 vUv;",
    "void main() {",
    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),

  fragmentShader: [
    "uniform int byp;", //should we apply the glitch ?

    "uniform sampler2D tDiffuse;",
    "uniform sampler2D tDisp;",

    "uniform float amount;",
    "uniform float angle;",
    "uniform float seed;",
    "uniform float seed_x;",
    "uniform float seed_y;",
    "uniform float distortion_x;",
    "uniform float distortion_y;",
    "uniform float col_s;",

    "varying vec2 vUv;",


    "float rand(vec2 co){",
    "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
    "}",

    "void main() {",
    "if(byp<1) {",
    "vec2 p = vUv;",
    "float xs = floor(gl_FragCoord.x / 0.5);",
    "float ys = floor(gl_FragCoord.y / 0.5);",
    //based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
    "vec4 normal = texture2D (tDisp, p*seed*seed);",
    "if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {",
    "if(seed_x>0.){",
    "p.y = 1. - (p.y + distortion_y);",
    "}",
    "else {",
    "p.y = distortion_y;",
    "}",
    "}",
    "if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {",
    "if(seed_y>0.){",
    "p.x=distortion_x;",
    "}",
    "else {",
    "p.x = 1. - (p.x + distortion_x);",
    "}",
    "}",
    "p.x+=normal.x*seed_x*(seed/5.);",
    "p.y+=normal.y*seed_y*(seed/5.);",
    //base from RGB shift shader
    "vec2 offset = amount * vec2( cos(angle), sin(angle));",
    "vec4 cr = texture2D(tDiffuse, p + offset);",
    "vec4 cga = texture2D(tDiffuse, p);",
    "vec4 cb = texture2D(tDiffuse, p - offset);",
    "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",
    //add noise
    "vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);",
    "gl_FragColor = gl_FragColor+ snow;",
    "}",
    "else {",
    "gl_FragColor=texture2D (tDiffuse, vUv);",
    "}",
    "}"

  ].join("\n")
};

class GlitchPass extends WHS.Pass {
  constructor(name, dt_size) {

    super(name);

    if (DigitalGlitchShader === undefined) console.error("THREE.GlitchPass relies on DigitalGlitchShader");

    var shader = DigitalGlitchShader;
    this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    if (dt_size == undefined) dt_size = 64;

    this.uniforms["tDisp"].value = this.generateHeightmap(dt_size);

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();

    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);

    this.goWild = false;
    this.curF = 0;
    this.generateTrigger();
  }

  render(renderer, writeBuffer, readBuffer, delta, maskActive) {
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

  generateTrigger() {
    this.randX = THREE.Math.randInt(120, 240);
  }

  generateHeightmap(dt_size) {
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
}


// -----------------------------------------------------------------------------
// Game class
// -----------------------------------------------------------------------------
class Game {
  constructor(options) {
    this.options = options;

    this.world = new WHS.World(options.world);

    this.createPostProcessing();
    this.createGeometry();
  }

  createPostProcessing() {
    this.postProcessor = new WHS.PostProcessor(this.options.postProcessor);
    this.world.setPostProcessor(this.postProcessor);

    this.postProcessor.createRenderPass();

    this.postProcessor.createPass(composer => {
      let pass = new GlitchPass('Glitch');
      pass.renderToScreen = true;
      composer.addPass(pass);
    });
  }

  createGeometry() {
    this.plane = new WHS.Plane(this.options.plane);
    this.plane.addTo(this.world);

    this.sphere = new WHS.Sphere(this.options.sphere);
    this.sphere.addTo(this.world);
  }

  start() {
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
