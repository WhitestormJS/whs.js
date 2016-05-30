import {JSONLoader, TextureLoader, FontLoader} from 'three';

const loadJson = new JSONLoader().load;
const loadTexture = new TextureLoader().load;
const loadFont = new FontLoader().load;

export {
  loadJson,
  loadTexture,
  loadFont
};
