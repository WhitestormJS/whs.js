import {
  EffectComposer,
  RenderPass,
  ShaderPass
} from 'postprocessing';

import {Loop} from '../../core/Loop';

const polyfill = (object, method, showWarn = true) => {
  if (object[method]) return;
  if (showWarn) console.warn(`@PostProcessorModule: pass.${method}() was not found.`, object);
  object[method] = () => {};
};

export class PostProcessorModule {
  currentPass = null;

  defer = new Promise(resolve => {
    this.resolve = resolve;
  });

  constructor({debug} = {debug: true}) {
    this.debug = debug;
  }

  manager(manager) {
    manager.define('postprocessor');

    this.effects = manager.use('rendering').effects;
    this.renderer = manager.get('renderer');
    this.scene = manager.get('scene');
    this.camera = manager.get('camera');

    this.composer = new EffectComposer(this.renderer);

    manager.use('rendering').stop();

    const composer = this.composer;
    this.renderLoop = new Loop(clock => composer.render(clock.getDelta())).start(manager.handler);

    manager.update({
      renderer: renderer => {
        this.composer.replaceRenderer(renderer);
      },

      scene: scene => {
        this.scene = scene;
      },

      camera: camera => {
        this.camera = camera;
      }
    });

    this.resolve();
  }

  render() {
    this.defer.then(() => {
      const pass = new RenderPass(this.scene, this.camera.native);

      // TODO: Support for effects.

      this.composer.addPass(pass);
      this.currentPass = pass;
    });

    return this;
  }

  // API

  pass(pass) {
    this.defer.then(() => {
      polyfill(pass, 'setSize', this.debug);
      polyfill(pass, 'initialise', this.debug);

      this.composer.addPass(pass);
      this.currentPass = pass;
    });

    return this;
  }

  shader(material, textureID = 'readBuffer') {
    this.defer.then(() => {
      if (!material.uniforms[textureID])
        material.uniforms[textureID] = {value: null};

      const pass = new ShaderPass(material, textureID);
      this.composer.addPass(pass);
      this.currentPass = pass;
    });

    return this;
  }

  // Pass API

  get(name) {
    return name
      ? this.composer.passes.filter(pass => pass.name === name)[0]
      : this.currentPass;
  }

  to(name) {
    this.currentPass = name;
  }

  renderToScreen(bool = true) {
    this.defer.then(() => {
      this.currentPass.renderToScreen = bool;
    });

    return this;
  }

  name(name) {
    this.defer.then(() => {
      this.currentPass.name = name;
    });

    return this;
  }
}
