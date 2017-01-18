import * as THREE from 'three';

import { extend } from '../../../utils/index';
import { Renderer } from '../Renderer';
import { EffectComposer } from './EffectComposer.js';
import { RenderPass } from './pass/RenderPass.js';

// TODO: Fix PostProcessor.
class PostProcessor extends Renderer {
  static defaults = {
    autoresize: true,

    width: window.innerWidth,
    height: window.innerHeight,

    resolution: {
      width: 1,
      height: 1
    },

    renderTarget: {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
      toScreen: true
    }
  };

  constructor(params = {}) {
    super(extend(params, PostProcessor.defaults));

    return (world) => {
      this.world = world;
      return this;
    }
  }

  build() {
    const renderParams = this.params.rendering;

    const width = Number(this.params.width * this.params.resolution.width).toFixed();
    const height = Number(this.params.height * this.params.resolution.height).toFixed();

    // Renderer.
    this.$renderer = new THREE.WebGLRenderer(renderParams.renderer);

    const renderer = this.$renderer;
    renderer.setClearColor(renderParams.background.color, renderParams.background.opacity);

    // Shadowmap.
    renderer.shadowMap.enabled = renderParams.shadowmap.enabled;
    renderer.shadowMap.type = renderParams.shadowmap.type;
    renderer.shadowMap.cascade = true;

    this.setSize(this.params.width, this.params.height);

    // RenderTarget
    this.$renderTarget = new THREE.WebGLRenderTarget(width, height, this.params.renderTarget);
  }

  make$composer() {
    // TODO:10 throw or something here
    if (!this.$renderer || !this.$renderTarget || this.$composer) return;
    this.$composer = new EffectComposer(this.$renderer, this.$renderTarget);
  }

  onParentWorldChanged() {
    // EffectComposer
    if (this.world) this.make$composer();
    else this.$composer = undefined;
  }

  /**
   * Create and add a WHS.Pass to the post processing pipeline.
   * @param  {Function} passCreator : A function that must return a WHS.Pass instance. It can be used to configurate the pass.
   * @return {WHS.Pass} The created WHS.Pass
   */
  createPass(passCreator) {
    if (typeof passCreator === 'function') return passCreator(this.$composer);
  }

  /**
   * [getPass description]
   * @param  {String} name : The unique name of the pass.
   * @return {WHS.Pass} The found WHS.Pass, otherwise undefined.
   */
  getPass(name) {
    return this.$composer ? this.$composer.getPass(name) : undefined;
  }

  /**
   * A helper to create a render pass (WHS.RenderPass) that will draw your geometry in the PostProcessor first pass.
   * @param  {Boolean} renderToScreen : Should the renderpass be rendered directly to screen
   */
  createRenderPass(renderToScreen = false) {
    const world = this.world;

    if (world.$scene && world.$camera && this.$composer) {
      this.createPass(composer => {
        const pass = new RenderPass('renderscene', world.$scene, world.$camera.native);
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
    if (this.$composer) this.$composer.removePass(name);
  }

  /**
   * Used by the WHS.World instance associated with this PostProcessor to set the container.
   * @param {DOM} container : The Dom container element.
   */
  setContainerConfig(container) {
    this.container = container;
    // TODO:0 handle autoresize container offset
  }

  setSize(width, height) {
    if (this.$renderer) {
      this.$renderer.setSize(width, height);
      if (this.$composer) this.$composer.setSize(width, height);
    }
  }

  /**
   * Rendering the PostProcessor and all its passes.
   * @param  {Number} delta : The delta time between two frames.
   */
  renderModule(delta) {
    if (this.$composer) this.$composer.render(delta);
  }

  /**
   * Set the renderer to use.
   * @param {THREE.WebGLRenderer} renderer : The renderer instance.
   */
  set $renderer(renderer) {
    this._renderer = renderer;
    this.make$composer();
  }

  /**
   * Get the renderer used by this PostProcessor to render.
   * @return {THREE.WebGLRenderer} The WebGLRenderer.
   */
  get $renderer() {
    return this._renderer;
  }

  /**
   * Set renderTarget, this will rebuild the internal EffectComposer.
   * @param  {THREE.WebGLRenderTarget} renderTarget : The WebGLRenderTarget to use.
   */
  set $renderTarget(renderTarget) {
    this._renderTarget = renderTarget;
    this.make$composer();
  }

  /**
   * Get renderTarget used by this PostProcessor to render to.
   * @return {THREE.WebGLRenderTarget} The WebGLRenderTarget.
   */
  get $renderTarget() {
    return this._renderTarget;
  }

  /**
   * Set composer, by default PostProcessor instanciate its own instance of EffectComposer.
   * @param  {EffectComposer} composer : The composer instance to use.
   */
  set $composer(composer) {
    this._composer = composer;
  }

  /**
   * Get composer attribute
   * @return {EffectCompost} The EffectComposer managed by this PostProcessor.
   */
  get $composer() {
    return this._composer;
  }
}

export {
  PostProcessor
};
