/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */

import {Pass} from './Pass.js';

export class RenderPass extends Pass {
  constructor(name, scene, camera, overrideMaterial, clearColor, clearAlpha) {
    super(name);

    this.scene = scene;
    this.camera = camera;

    this.overrideMaterial = overrideMaterial;

    this.clearColor = clearColor;
    this.clearAlpha = (clearAlpha === undefined) ? 0 : clearAlpha;

    this.clear = true;
    this.needsSwap = false;
  }

  render(renderer, writeBuffer, readBuffer) {
    // REMARK: "maskActive" and "delta" never used. Removed.
    // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    let oldClearColor, oldClearAlpha;
    const oldAutoClear = renderer.autoClear;

    renderer.autoClear = false;
    this.scene.overrideMaterial = this.overrideMaterial;

    if (this.clearColor) {
      oldClearColor = renderer.getClearColor().getHex();
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

    if (this.clearColor) renderer.setClearColor(oldClearColor, oldClearAlpha);

    this.scene.overrideMaterial = null;
    renderer.autoClear = oldAutoClear;
  }
}
