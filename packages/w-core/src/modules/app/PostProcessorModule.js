import {EffectComposer} from 'postprocessing/src/core/EffectComposer';
import {RenderPass} from 'postprocessing/src/passes/RenderPass';
import {ShaderPass} from 'postprocessing/src/passes/ShaderPass';

import {Loop} from '../../core/Loop';

const polyfill = (object, method, showWarn = true) => {
  if (object[method]) return;
  if (showWarn) console.warn(`@PostProcessorModule: pass.${method}() was not found.`, object);
  object[method] = () => {};
};

/**
 * @class PostProcessorModule
 * @category modules/app
 * @param {Object} [params]
 * @memberof module:modules/app
 * @example <caption> Creating a rendering module and passing it to App's modules</caption>
 * new App([
 *   new ElementModule(),
 *   new SceneModule(),
 *   new DefineModule('camera', new WHS.PerspectiveCamera({
 *     position: new THREE.Vector3(0, 6, 18),
 *     far: 10000
 *   })),
 *   new RenderingModule(),
 *   new PostProcessorModule()
 * ]);
 *
 * const processor = app.use('postprocessor');
 *
 * processor
 *   .render()
 *   .pass(new GlitchPass())
 *   .renderToScreen()
 */
export class PostProcessorModule {
  currentPass = null;

  defer = new Promise(resolve => {
    this.resolve = resolve;
  });

  static defaults = {
    debug: true
  };

  constructor(params = PostProcessorModule.defaults) {
    this.debug = params.debug;
    this.params = params;
  }

  manager(manager) {
    manager.define('postprocessor');

    this.effects = manager.use('rendering').effects;
    this.renderer = manager.get('renderer');
    this.scene = manager.get('scene');
    this.camera = manager.get('camera');

    this.composer = new EffectComposer(this.renderer, this.params);

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

  /**
   * @method render
   * @description Adds RenderPass
   * @return {this}
   * @memberof module:modules/app.PostProcessorModule
   */
  render() {
    this.defer.then(() => {
      const pass = new RenderPass(this.scene, this.camera.native);

      // TODO: Support for effects.

      this.composer.addPass(pass);
      this.currentPass = pass;
    });

    return this;
  }

  /**
   * @method pass
   * @description Adds your custom pass
   * @param {Pass} pass A custom pass
   * @return {this}
   * @memberof module:modules/app.PostProcessorModule
   */
  pass(pass) {
    this.defer.then(() => {
      polyfill(pass, 'setSize', this.debug);
      polyfill(pass, 'initialise', this.debug);

      this.composer.addPass(pass);
      this.currentPass = pass;
    });

    return this;
  }

  /**
   * @method shader
   * @description Adds a pass made from shader material
   * @param {Material} material A ShaderMaterial
   * @param {String} textureID Name of the readBuffer uniform
   * @return {this}
   * @memberof module:modules/app.PostProcessorModule
   */
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

  /**
   * @method get
   * @description Returns a pass by the given name
   * @param {String} name The name of the pass
   * @return {this}
   * @memberof module:modules/app.PostProcessorModule
   */
  get(name) {
    return name
      ? this.composer.passes.filter(pass => pass.name === name)[0]
      : this.currentPass;
  }

  /**
   * @method renderToScreen
   * @description Sets the renderToScreen property of currentPass
   * @param {String} [name=true] The name of the pass
   * @return {this}
   * @memberof module:modules/app.PostProcessorModule
   */
  renderToScreen(bool = true) {
    this.defer.then(() => {
      this.currentPass.renderToScreen = bool;
    });

    return this;
  }
}
