/**
 * @author alteredq / http://alteredqualia.com/
 * @author yannis torres / es6 migration
 */

import * as THREE from 'three';
import { Pass } from './Pass.js';
import { CopyShader } from '../shader/CopyShader.js';

export class TexturePass extends Pass {
  constructor(name, map, opacity) {

    super(name);

    if (CopyShader === undefined) {
      console.error("TexturePass relies on CopyShader");
    }

    let shader = CopyShader;

    this.map = map;
    this.opacity = (opacity !== undefined) ? opacity : 1.0;

    this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      depthTest: false,
      depthWrite: false
    });

    this.needsSwap = false;

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();

    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);

  }

  render(renderer, writeBuffer, readBuffer, delta, maskActive) {

    let oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;

    this.quad.material = this.material;

    this.uniforms["opacity"].value = this.opacity;
    this.uniforms["tDiffuse"].value = this.map;
    this.material.transparent = (this.opacity < 1.0);

    renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);
    renderer.autoClear = oldAutoClear;
  }
};
