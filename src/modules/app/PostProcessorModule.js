import {
  WebGLRenderTarget
} from 'three';

import {CopyShader} from '../../extras/shader/CopyShader';
import {ShaderPass} from '../../extras/pass/ShaderPass';
import {RenderPass} from '../../extras/pass/RenderPass';
import {MaskPass, ClearMaskPass} from '../../extras/pass/MaskPass';
import {Loop} from '../../core/Loop';

// TODO: Rewrite deprecated API
export class PostProcessorModule {
  renderTargetA = null;
  renderTargetB = null;

  writeBuffer = null;
  readBuffer = null;

  passes = [];
  copyPass = new ShaderPass(CopyShader);

  constructor() {
    this.params = {};
  }

  manager(manager) {
    this.renderer = manager.get('renderer');
    this.scene = manager.get('scene');
    this.camera = manager.get('camera');
    this.oldLoop = manager.get('renderer', true).renderLoop;
    this.renderLoop = new Loop(clock => this.render(clock.getDelta()));
    this.configure();
  }

  integrate(self) {
    self.oldLoop.stop(this);
    self.renderLoop.start(this);
  }

  configure() {
    const size = this.renderer.getSize();

    // TODO: Remove "THREE." declaration.
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

  swapBuffers() {
    const tmp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = tmp;
  }

  addPass(pass) {
    if (!pass) return;
    const size = this.renderer ? this.renderer.getSize() : {width: 0, height: 0};
    pass.setSize(size.width, size.height);
    this.passes.push(pass);
  }

  getPass(name) {
    return this.passes.filter(v => v.name === name)[0];
  }

  getPassIndex(passIndicator) {
    const passName = typeof passIndicator === 'string' ? passIndicator : passIndicator.name;
    return this.passes.indexOf(this.getPass(passName));
  }

  addPassAfter(previousPassIndicator, pass) {
    if (!pass) return;
    let index = this.getPassIndex(previousPassIndicator);
    index = index < 0 ? 0 : index + 1;
    this.insertPass(pass, index);
  }

  insertPass(pass, index) {
    if (pass) this.passes.splice(index, 0, pass);
  }

  removePass(passIndicator) {
    const index = this.getPassIndex(passIndicator);
    if (index > -1) this.passes.splice(index, 1);
  }

  createRenderPass(renderToScreen = false) {
    if (this.scene && this.camera) {
      const pass = new RenderPass('renderscene', this.scene, this.camera.native);
      pass.renderToScreen = renderToScreen;
      this.addPass(pass);
    }
  }

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

  setSize(width, height) {
    this.renderTarget1.setSize(width, height);
    this.renderTarget2.setSize(width, height);

    for (let i = 0; i < this.passes.length; i++) this.passes[i].setSize(width, height);
  }
}
