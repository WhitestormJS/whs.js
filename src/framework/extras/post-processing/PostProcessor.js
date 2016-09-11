import * as THREE from 'three';

import { extend } from '../../utils/index';
import { CoreObject } from '../../core/CoreObject.js';
import { EffectComposer } from './EffectComposer.js';
import { RenderPass } from './pass/RenderPass.js';

class PostProcessor extends CoreObject {
  static defaults = {
    autoresize: true,

    rWidth: 1, // Resolution(width).
    rHeight: 1, // Resolution(height).

    renderTarget: {
      toScreen: true
    }
  };

  constructor(params = {}, world, localWindow = window) {
    super();

    PostProcessor.defaults.width = localWindow.innerWidth;
    PostProcessor.defaults.height = localWindow.innerHeight;

    this.params = extend(params, PostProcessor.defaults);
    const _params = this.params;

    if (_params.autoresize === "window") {
      window.addEventListener('resize', () => {
        this.setSize(
          Number(window.innerWidth * _params.rWidth).toFixed(),
          Number(window.innerHeight * _params.rHeight).toFixed()
        );

        this.emit('resize');
      });
    } else if (_params.autoresize) {
      window.addEventListener('resize', () => {
        this.setSize(
          //FIXME: cf setContainerConfig()
          // Number(_params.container.offsetWidth * _params.rWidth).toFixed(),
          // Number(_params.container.offsetHeight * _params.rHeight).toFixed()
        );

        this.emit('resize');
      });
    }

    this._initTargetRenderer();

    if (world) world.postProcessor = this;

    return this;
  }

  /**
   * Building a WebGLRenderTarget to render to.
   */
  _initTargetRenderer() {
    let params = this.params;
    let width = Number(window.innerWidth * params.rWidth).toFixed();
    let height = Number(window.innerHeight * params.rHeight).toFixed();
    this.renderTarget = new THREE.WebGLRenderTarget(width, height, params.renderTarget);
  }

  /**
   * Building an EffectComposer to chain passes.
   */
  _initComposer() {
    let _renderer = this.renderer;
    let _renderTarget = this.renderTarget;

    if (!_renderer || !_renderTarget) {
      //FIXME: throw or something here
      return;
    }

    if (!this.composer) {
      this.composer = new EffectComposer(_renderer, _renderTarget);
    }
  }

  /**
   * Create and add a WHS.Pass to the post processing pipeline.
   * @param  {Function} passCreator : A function that must return a WHS.Pass instance. It can be used to configurate the pass.
   * @return {WHS.Pass} The created WHS.Pass
   */
  createPass(passCreator) {
    if (typeof passCreator === 'function') {
      return passCreator(this.composer);
    }
  }

  /**
   * [getPass description]
   * @param  {String} name : The unique name of the pass.
   * @return {WHS.Pass} The found WHS.Pass, otherwise undefined.
   */
  getPass(name) {
    return this.composer.getPass(name);
  }

  /**
   * A helper to create a render pass (WHS.RenderPass) that will draw your geometry in the PostProcessor first pass.
   * @param  {Boolean} renderToScreen : Should the renderpass be rendered directly to screen
   */
  createRenderPass(renderToScreen = false) {
    if (this.scene && this.camera && this.composer) {
      this.createPass(composer => {
        let pass = new RenderPass('renderscene', this.scene, this.camera.native);
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
    this.composer.removePass(name);
  }

  /**
   * Used by the WHS.World instance associated with this PostProcessor to set the container.
   * @param {DOM} container : The Dom container element.
   */
  setContainerConfig(container) {
    this.container = container;
    //FIXME: handle autoresize container offset
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

  /**
   * Rendering the PostProcessor and all its passes.
   * @param  {Number} delta : The delta time between two frames.
   */
  render(delta) {
    this.composer.render(delta);
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
