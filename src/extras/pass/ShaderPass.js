/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */

import {
  ShaderMaterial,
  UniformsUtils,
  OrthographicCamera,
  Scene,
  Mesh,
  PlaneBufferGeometry
} from 'three';

import {Pass} from './Pass';

export class ShaderPass extends Pass {
  constructor(name, shader, textureID) {
    super(name);

    this.textureID = (textureID === undefined) ? 'tDiffuse' : textureID;

    if (shader instanceof ShaderMaterial) {
      this.uniforms = shader.uniforms;
      this.material = shader;
    } else if (shader) {
      this.uniforms = UniformsUtils.clone(shader.uniforms);
      this.material = new ShaderMaterial({
        defines: shader.defines || {},
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      });
    }

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new Scene();

    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);
  }

  render(renderer, writeBuffer, readBuffer) {
    // REMARK: "maskActive" and "delta" never used. Removed.
    // render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    if (this.uniforms[this.textureID])
      this.uniforms[this.textureID].value = readBuffer.texture;

    this.quad.material = this.material;

    if (this.renderToScreen) renderer.render(this.scene, this.camera);
    else renderer.render(this.scene, this.camera, writeBuffer, this.clear);
  }
}
