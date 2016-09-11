import * as THREE from 'three';

import { CopyShader } from './shader/CopyShader.js';
import { ShaderPass } from './pass/ShaderPass.js';
import { MaskPass, ClearMaskPass } from './pass/MaskPass.js';

export class EffectComposer {
  constructor(renderer, renderTarget) {
    this.renderer = renderer;

    if (renderTarget === undefined) {
      let parameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      };

      let size = renderer.getSize();

      renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
    }

    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();
    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
    this.passes = [];

    if (CopyShader === undefined) console.error('EffectComposer relies on CopyShader"');

    this.copyPass = new ShaderPass(CopyShader);
  }

  swapBuffers() {
    let tmp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = tmp;
  }

  addPass(pass) {
    let size = this.renderer.getSize();
    pass.setSize(size.width, size.height);
    this.passes.push(pass);
  }

  getPass(name) {
    return this.passes.filter(v => v.name === name)[0];
  }

  getPassIndex(passIndicator) {
    let passName = typeof passIndicator === 'string' ? passIndicator : passIndicator.name;
    return this.passes.indexOf(this.getPass(passName));
  }

  addPassAfter(previousPassIndicator, pass) {
    let index = this.getPassIndex(previousPassIndicator);
    index = index < 0 ? 0 : index + 1;
    this.insertPass(pass, index);
  }

  insertPass(pass, index) {
    this.passes.splice(index, 0, pass);
  }

  removePass(passIndicator) {
    let index = this.getPassIndex(passIndicator);
    if (index > -1) {
      this.passes.splice(index, 1);
    }
  }

  render(delta) {
    let maskActive = false;
    let pass, i, il = this.passes.length;

    for (i = 0; i < il; i++) {
      pass = this.passes[i];

      if (pass.enabled === false) {
        continue;
      }

      pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);

      if (pass.needsSwap) {
        if (maskActive) {
          let context = this.renderer.context;
          context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);
          this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);
          context.stencilFunc(context.EQUAL, 1, 0xffffffff);
        }
        this.swapBuffers();
      }

      if (MaskPass !== undefined) {
        if (pass instanceof MaskPass) {
          maskActive = true;
        } else if (pass instanceof ClearMaskPass) {
          maskActive = false;
        }
      }
    }
  }

  reset(renderTarget) {
    if (renderTarget === undefined) {
      let size = this.renderer.getSize();

      renderTarget = this.renderTarget1.clone();
      renderTarget.setSize(size.width, size.height);
    }

    this.renderTarget1.dispose();
    this.renderTarget2.dispose();
    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();

    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
  }

  setSize(width, height) {
    this.renderTarget1.setSize(width, height);
    this.renderTarget2.setSize(width, height);

    for (let i = 0; i < this.passes.length; i++) {
      this.passes[i].setSize(width, height);
    }
  }
}
