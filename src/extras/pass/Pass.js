export class Pass {
  constructor(name) {
    this.uniqName = (name === undefined ? 'pass_' + (((1+Math.random())*0x10000)|0).toString(16).substring(1) : name);

    // if set to true, the pass is processed by the composer
    this.enabled = true;

    // if set to true, the pass indicates to swap read and write buffer after rendering
    this.needsSwap = true;

    // if set to true, the pass clears its buffer before rendering
    this.clear = false;

    // if set to true, the result of the pass is rendered to screen
    this.renderToScreen = false;
  }

  /**
   * Resize a pass.
   * @param {Number} width : in pixels.
   * @param {Number} height : in pixels.
   */
  setSize(width, height) {}

  /**
   * Render a pass
   * @param  {THREE.WebGLRenderer} renderer : The renderer used to render the pass objects.
   * @param  {THREE.WebGLRenderTarget.Buffer} writeBuffer : The write buffer used to do buffer swapping.
   * @param  {THREE.WebGLRenderTarget.Buffer} readBuffer  : The read buffer used to do buffer swapping.
   * @param  {Number} delta : The delta time since the previous frame.
   * @param  {Boolean} maskActive : Flag indicating the Composer that this pass use masking.
   */
  render(renderer, writeBuffer, readBuffer, delta, maskActive) {
    console.error("Pass: .render() must be implemented in derived pass.");
  }

  /**
   * Get the name of the pass
   * @return {String} Unique name
   */
  get name() {
    return this.uniqName;
  }
}
