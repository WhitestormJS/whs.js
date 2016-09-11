import * as THREE from 'three';

import {extend} from '../../utils/index';
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

  constructor(params = {}, localWindow = window) {
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

    return this;
  }

  /**
   * [_initTargetRenderer description]
   * @return {[type]} [description]
   */
  _initTargetRenderer() {
    let params = this.params;
    let width = Number(window.innerWidth * params.rWidth).toFixed();
    let height = Number(window.innerHeight * params.rHeight).toFixed();
    this.setRenderTarget(new THREE.WebGLRenderTarget(width, height, params.renderTarget));
  }

  /**
   * [_initComposer description]
   * @return {[type]} [description]
   */
  _initComposer() {
    let _renderer = this.getRenderer();
    let _renderTarget = this.getRenderTarget();

    if (!_renderer || !_renderTarget) {
      //FIXME: throw or something here
      return;
    }

    if (!this.composer) {
      this.setComposer(new EffectComposer(_renderer, _renderTarget));
    }
  }

  /**
   * [createPass description]
   * @param  {[type]} passCreator [description]
   * @return {[type]}             [description]
   */
  createPass(passCreator) {
    if (typeof passCreator === 'function') {
      return passCreator(this.composer);
    }
  }

  /**
   * [getPass description]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  getPass(name) {
    return this.composer.getPass(name);
  }

  /**
   * [createRenderPass description]
   * @return {[type]} [description]
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
   * [getRenderPass description]
   * @return {[type]} [description]
   */
  getRenderPass() {
    return this.getPass('renderscene');
  }

  /**
   * [removePass description]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  removePass(name) {
    this.composer.removePass(name);
  }

  /**
   * [getRenderPass description]
   * @return {[type]} [description]
   */
  setContainerConfig(container) {
    this.container = container;
    //FIXME: handle autoresize container offset
  }

  /**
   * [getRenderPass description]
   * @return {[type]} [description]
   */
  setRenderScene(scene, camera) {
    this.scene = scene;
    this.camera = camera;
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render(delta) {
    this.composer.render(delta);
  }

  /**
   * [setRenderer description]
   * @param {[type]} renderer [description]
   */
  setRenderer(renderer) {
    this.renderer = renderer;
    this._initComposer();
  }

  /**
   * [getRenderer description]
   * @param  {[type]} renderer [description]
   * @return {[type]}          [description]
   */
  getRenderer(renderer) {
    return this.renderer;
  }

  /**
   * [setRenderTarget description]
   * @param {[type]} renderTarget [description]
   */
  setRenderTarget(renderTarget) {
    this.renderTarget = renderTarget;
    this._initComposer();
  }

  /**
   * [getRenderTarget description]
   * @return {[type]} [description]
   */
  getRenderTarget() {
    return this.renderTarget;
  }

  /**
   * [setComposer description]
   * @param {[type]} composer [description]
   */
  setComposer(composer) {
    this.composer = composer;
  }

  /**
   * [getComposer description]
   * @return {[type]} [description]
   */
  getComposer() {
    return this.composer;
  }



}

export {
  PostProcessor
};
