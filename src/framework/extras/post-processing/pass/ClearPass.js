/**
 * @author mrdoob / http://mrdoob.com/
 * @author yannis torres / es6 migration
 */

import { Pass } from './Pass.js';

export class ClearPass extends Pass {
  constructor(name, clearColor, clearAlpha) {
    super(name);

    this.needsSwap = false;
    this.clearColor = (clearColor !== undefined) ? clearColor : 0x000000;
    this.clearAlpha = (clearAlpha !== undefined) ? clearAlpha : 0;
  }

  render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    let oldClearColor, oldClearAlpha;

    if (this.clearColor) {
      oldClearColor = renderer.getClearColor().getHex();
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    renderer.clear();

    if (this.clearColor) {
      renderer.setClearColor(oldClearColor, oldClearAlpha);
    }
  }
}
