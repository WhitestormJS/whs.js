/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
 */

import THREE from "three";

const
  loadJson = (new THREE.JSONLoader()).load,
  loadTexture = (new THREE.TextureLoader()).load,
  loadFont = (new THREE.FontLoader()).load;

export {
  loadJson,
  loadTexture,
  loadFont
};