import {
  WebGLRenderTarget
} from 'three';

import {CopyShader} from '../../extras/shader/CopyShader.js';
import {ShaderPass} from '../../extras/pass/ShaderPass.js';
import {RenderPass} from '../../extras//pass/RenderPass.js';
import {MaskPass, ClearMaskPass} from '../../extras/pass/MaskPass.js';
import {Loop} from '../../core/Loop';

// TODO: Rewrite deprecated API
export class PostProcessorModule {
  renderTargetA = null;
  renderTargetB = null;

  writeBuffer = null;
  readBuffer = null;

  passes = [];
  copyPass = new ShaderPass(CopyShader);

  constructor(params = {}) {
    this.params = {};
  }

  manager(manager) {
    this.renderer = manager.get('renderer');
    this.scene = manager.get('scene');
    this.camera = manager.get('camera');
    this.oldLoop = manager.get('renderer', true).renderLoop;
    this.renderLoop = new Loop((clock) => this.render(clock.getDelta()));
    this.configure();
  }

  integrate(params, self) {
    self.oldLoop.stop(this);
    self.renderLoop.start(this);
  }

  configure() {
    const size = this.renderer.getSize();

    this.renderTargetA = new WebGLRenderTarget(
      size.width,
      size.height,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      }
    );

    this.renderTargetB = this.renderTargetA.clone();
    this.writeBuffer = this.renderTargetA;
    this.readBuffer = this.renderTargetB;
  }

  /**
   * Swap drawing buffers
   */
  swapBuffers() {
    const tmp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = tmp;
  }

  /**
   * Add a WHS.Pass to the composer, after all existing passes.
   * @param {WHS.Pass} pass : The pass to be added
   */
  addPass(pass) {
    if (!pass) return;
    const size = this.renderer ? this.renderer.getSize() : {width: 0, height: 0};
    pass.setSize(size.width, size.height);
    this.passes.push(pass);
  }

  /**
   * Get the pass of the same unique name, otherwise undefined.
   * @param  {String} name : the unique name of the pass to find.
   * @return {WHS.Pass} The found Pass or undefined.
   */
  getPass(name) {
    return this.passes.filter(v => v.name === name)[0];
  }

  /**
   * Get the pass index in the internal passes array.
   * @param  {String|WHS.Pass} passIndicator : The pass name or the pass instance.
   * @return {Number} The pass index or -1.
   */
  getPassIndex(passIndicator) {
    const passName = typeof passIndicator === 'string' ? passIndicator : passIndicator.name;
    return this.passes.indexOf(this.getPass(passName));
  }

  /**
   * Add a pass after another one. Add the pass in first position if previous is not found.
   * @param {String|WHS.Pass} previousPassIndicator : The previous pass name or the previous pass instance.
   */
  addPassAfter(previousPassIndicator, pass) {
    if (!pass) return;
    let index = this.getPassIndex(previousPassIndicator);
    index = index < 0 ? 0 : index + 1;
    this.insertPass(pass, index);
  }

  /**
   * Add a pass at the specified index.
   * @param  {WHS.Pass} pass : The pass instance to insert
   * @param  {Number} index : The index.
   */
  insertPass(pass, index) {
    if (pass) this.passes.splice(index, 0, pass);
  }

  /**
   * Remove a pass from this ser.
   * @param  {String|WHS.Pass} passIndicator : The pass name or the pass instance.
   */
  removePass(passIndicator) {
    const index = this.getPassIndex(passIndicator);
    if (index > -1) this.passes.splice(index, 1);
  }

  /**
   * A helper to create a render pass (WHS.RenderPass) that will draw your geometry in the PostProcessor first pass.
   * @param  {Boolean} renderToScreen : Should the renderpass be rendered directly to screen
   */
  createRenderPass(renderToScreen = false) {
    if (this.scene && this.camera) {
      const pass = new RenderPass('renderscene', this.scene, this.camera.native);
      pass.renderToScreen = renderToScreen;
      this.addPass(pass);
    }
  }

  /**
   * Render the EffectComposer, and all its passes.
   * @param  {Number} delta : The delta time since the last frame.
   */
  render(delta) {
    for (let i = 0, il = this.passes.length, pass, maskActive = false; i < il; i++) {
      pass = this.passes[i];

      if (pass.enabled === false) continue;

      pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);

      if (pass.needsSwap) {
        if (maskActive) {
          const context = this.renderer.context;

          context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);
          this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);
          context.stencilFunc(context.EQUAL, 1, 0xffffffff);
        }

        this.swapBuffers();
      }

      if (MaskPass !== undefined) {
        if (pass instanceof MaskPass) maskActive = true;
        else if (pass instanceof ClearMaskPass) maskActive = false;
      }
    }
  }

  /**
   * Set another renderTarget.
   * @param  {THREE.WebGLRenderTarget} renderTarget : The new renderTarget to use.
   */
  reset(renderTarget) {
    if (renderTarget === undefined) {
      const size = this.renderer.getSize();

      renderTarget = this.renderTarget1.clone();
      renderTarget.setSize(size.width, size.height);
    }

    this.renderTarget1.dispose();
    this.renderTarget2.dispose();
    this.renderTarget1 = renderTarget;
    this.$renderTarget2 = renderTarget.clone();

    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.$renderTarget2;
  }

  /**
   * Resize the renderTarget and all the EffectComposer passes.
   * @param {Number} width : The width in pixels
   * @param {Number} height : The height in pixels
   */
  setSize(width, height) {
    this.renderTarget1.setSize(width, height);
    this.renderTarget2.setSize(width, height);

    for (let i = 0; i < this.passes.length; i++) this.passes[i].setSize(width, height);
  }
}
