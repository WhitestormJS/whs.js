import * as THREE from 'three';

import { extend } from '../../../utils/index';
import { RenderingPlugin } from '../RenderingPlugin';
import { EffectComposer } from './EffectComposer.js';
import { RenderPass } from './pass/RenderPass.js';

class PostProcessor extends RenderingPlugin {
  static defaults = {
    autoresize: true,

    rWidth: 1, // Resolution(width).
    rHeight: 1, // Resolution(height).

    renderTarget: {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
      toScreen: true
    }
  };

  constructor(params = {}, world, localWindow = window) {
    super(params, world);

    PostProcessor.defaults.width = localWindow.innerWidth;
    PostProcessor.defaults.height = localWindow.innerHeight;

    this.params = extend(params, PostProcessor.defaults, PostProcessor.instructions);
    const _params = this.params;

    if (_params.autoresize === 'window') {
      window.addEventListener('resize', () => {
        this.setSize(
          Number(window.innerWidth * _params.rWidth).toFixed(),
          Number(window.innerHeight * _params.rHeight).toFixed()
        );

        this.emit('resize');
      });
    } else if (_params.autoresize) {
      window.addEventListener('resize', () => {
        // TODO: cf setContainerConfig()
        // this.setSize(
        //  Number(_params.container.offsetWidth * _params.rWidth).toFixed(),
        //  Number(_params.container.offsetHeight * _params.rHeight).toFixed()
        // );

        this.emit('resize');
      });
    }
  }

  build() {
    const params = this.params;

    const width = Number(window.innerWidth * params.rWidth).toFixed();
    const height = Number(window.innerHeight * params.rHeight).toFixed();

    // Renderer.
    this.renderer = new THREE.WebGLRenderer(this.params.renderer);

    const _renderer = this.renderer;
    _renderer.setClearColor(this.params.background.color, this.params.background.opacity);

    // Shadowmap.
    _renderer.shadowMap.enabled = this.params.shadowmap.enabled;
    _renderer.shadowMap.type = this.params.shadowmap.type;
    _renderer.shadowMap.cascade = true;

    this.setSize(this.params.width, this.params.height);

    this.parentWorld._dom.appendChild(_renderer.domElement);

    _renderer.domElement.style.width = '100%';
    _renderer.domElement.style.height = '100%';

    // RenderTarget
    this.renderTarget = new THREE.WebGLRenderTarget(width, height, params.renderTarget);

    // Scene and camera
    this.setRenderScene(this.parentWorld.scene, this.parentWorld.camera);

    // EffectComposer
    if (this.parentWorld) { this._initComposer(); }
  }

  _initComposer() {
    const _renderer = this.renderer;
    const _renderTarget = this.renderTarget;

    // TODO: throw or something here
    if (!_renderer || !_renderTarget) return;

    if (!this.composer)
      this.composer = new EffectComposer(_renderer, _renderTarget);
  }

  /**
   * Create and add a WHS.Pass to the post processing pipeline.
   * @param  {Function} passCreator : A function that must return a WHS.Pass instance. It can be used to configurate the pass.
   * @return {WHS.Pass} The created WHS.Pass
   */
  createPass(passCreator) {
    if (typeof passCreator === 'function') return passCreator(this.composer);
  }

  /**
   * [getPass description]
   * @param  {String} name : The unique name of the pass.
   * @return {WHS.Pass} The found WHS.Pass, otherwise undefined.
   */
  getPass(name) {
    return this.composer ? this.composer.getPass(name) : undefined;
  }

  /**
   * A helper to create a render pass (WHS.RenderPass) that will draw your geometry in the PostProcessor first pass.
   * @param  {Boolean} renderToScreen : Should the renderpass be rendered directly to screen
   */
  createRenderPass(renderToScreen = false) {
    if (this.scene && this.camera && this.composer) {
      this.createPass(composer => {
        const pass = new RenderPass('renderscene', this.scene, this.camera.native);
        pass.renderToScreen = renderToScreen;
        composer.addPass(pass);
      });
    }
  }

  /**
   * A helper to get the render pass of this PostProcessor.
   * @return {WHS.RenderPass} The render pass found, otherwise undefined.
   */
  getRenderPass() {
    return this.getPass('renderscene');
  }

  /**
   * Remove a pass from the PostProcessor
   * @param  {String} name : The unique name of the pass
   */
  removePass(name) {
    if (this.composer) this.composer.removePass(name);
  }

  /**
   * Used by the WHS.World instance associated with this PostProcessor to set the container.
   * @param {DOM} container : The Dom container element.
   */
  setContainerConfig(container) {
    this.container = container;
    // TODO: handle autoresize container offset
  }

  /**
   * Set the Scene and camera used by the renderTarget in this PostProcessor.
   * @param {THREE.Scene} scene : The scenagraph containing the geometry.
   * @param {THREE.Camera} camera : The camera used for the rendering point of view.
   */
  setRenderScene(scene, camera) {
    this.scene = scene;
    this.camera = camera;
  }

  setSize(width, height) {
    if (this.renderer) this.renderer.setSize(width, height);
  }

  /**
   * Rendering the PostProcessor and all its passes.
   * @param  {Number} delta : The delta time between two frames.
   */
  renderPlugin(delta) {
    if (this.composer) this.composer.render(delta);
  }

  /**
   * Set the renderer to use.
   * @param {THREE.WebGLRenderer} renderer : The renderer instance.
   */
  set renderer(renderer) {
    this._renderer = renderer;
    this._initComposer();
  }

  /**
   * Get the renderer used by this PostProcessor to render.
   * @return {THREE.WebGLRenderer} The WebGLRenderer.
   */
  get renderer() {
    return this._renderer;
  }

  /**
   * Set renderTarget, this will rebuild the internal EffectComposer.
   * @param  {THREE.WebGLRenderTarget} renderTarget : The WebGLRenderTarget to use.
   */
  set renderTarget(renderTarget) {
    this._renderTarget = renderTarget;
    this._initComposer();
  }

  /**
   * Get renderTarget used by this PostProcessor to render to.
   * @return {THREE.WebGLRenderTarget} The WebGLRenderTarget.
   */
  get renderTarget() {
    return this._renderTarget;
  }

  /**
   * Set composer, by default PostProcessor instanciate its own instance of EffectComposer.
   * @param  {EffectComposer} composer : The composer instance to use.
   */
  set composer(composer) {
    this._composer = composer;
  }

  /**
   * Get composer attribute
   * @return {EffectCompost} The EffectComposer managed by this PostProcessor.
   */
  get composer() {
    return this._composer;
  }

}

export {
  PostProcessor
};
