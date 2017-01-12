/**
 * @author mrdoob / http://mrdoob.com/
 * @author yannis torres / es6 migration
 */

import {Pass} from './Pass.js';

export class ClearPass extends Pass {
  constructor(name, clearColor, clearAlpha) {
    super(name);

    this.needsSwap = false;
    this.clearColor = (clearColor === undefined) ? 0x000000 : clearColor;
    this.clearAlpha = (clearAlpha === undefined) ? 0 : clearAlpha;
  }

  render(renderer, writeBuffer, readBuffer) {
    // REMARK: "maskActive" and "delta" never used. Removed.
    // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    let oldClearColor, oldClearAlpha;

    if (this.clearColor) {
      oldClearColor = renderer.getClearColor().getHex();
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    renderer.clear();

    if (this.clearColor) renderer.setClearColor(oldClearColor, oldClearAlpha);
  }
}
