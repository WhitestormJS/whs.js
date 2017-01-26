/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */

import {
  UniformsUtils,
  ShaderMaterial,
  OrthographicCamera,
  Scene,
  Mesh,
  PlaneBufferGeometry
} from 'three';

import {CopyShader} from '../shader/CopyShader';
import {Pass} from './Pass';

export class TexturePass extends Pass {
  constructor(name, map, opacity) {
    super(name);

    if (CopyShader === undefined)
      console.error('TexturePass relies on CopyShader');

    const shader = CopyShader;

    this.map = map;
    this.opacity = (opacity === undefined) ? 1.0 : opacity;

    this.uniforms = UniformsUtils.clone(shader.uniforms);

    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      depthTest: false,
      depthWrite: false
    });

    this.needsSwap = false;

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new Scene();

    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);
  }

  render(renderer, writeBuffer, readBuffer) {
    // REMARK: "maskActive" and "delta" never used. Removed.
    // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;

    this.quad.material = this.material;

    this.uniforms.opacity.value = this.opacity;
    this.uniforms.tDiffuse.value = this.map;
    this.material.transparent = (this.opacity < 1.0);

    renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);
    renderer.autoClear = oldAutoClear;
  }
}
