/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */

import {Pass} from './Pass.js';

export class MaskPass extends Pass {

  constructor(name, scene, camera) {
    super(name);

    this.scene = scene;
    this.camera = camera;

    this.clear = true;
    this.needsSwap = false;
    this.inverse = false;
  }

  render(renderer, writeBuffer, readBuffer) {
    // REMARK: "maskActive" and "delta" never used. Removed.
    // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    const context = renderer.context;
    const state = renderer.state;

    // don't update color or depth
    state.buffers.color.setMask(false);
    state.buffers.depth.setMask(false);

    // lock buffers
    state.buffers.color.setLocked(true);
    state.buffers.depth.setLocked(true);

    // set up stencil
    const writeValue = this.inverse ? 0 : 1;
    const clearValue = this.inverse ? 1 : 0;

    state.buffers.stencil.setTest(true);
    state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
    state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
    state.buffers.stencil.setClear(clearValue);

    // draw into the stencil buffer
    renderer.render(this.scene, this.camera, readBuffer, this.clear);
    renderer.render(this.scene, this.camera, writeBuffer, this.clear);

    // unlock color and depth buffer for subsequent rendering
    state.buffers.color.setLocked(false);
    state.buffers.depth.setLocked(false);

    // only render where stencil is set to 1
    state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1
    state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
  }
}

export class ClearMaskPass extends Pass {
  constructor(name) {
    super(name);
    this.needsSwap = false;
  }

  render(renderer) {
    // REMARK: "writeBuffer", "readBuffer", "maskActive" and "delta" never used. Removed.
    // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    renderer.state.buffers.stencil.setTest(false);
  }
}
