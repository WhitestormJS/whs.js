import THREE from 'three';

const loadJson = new THREE.JSONLoader().load;
const loadTexture = new THREE.TextureLoader().load;
const loadFont = new THREE.FontLoader().load;

export {
  loadJson,
  loadTexture,
  loadFont
};
