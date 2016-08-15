import * as THREE from 'three';

// Models.
const JSONLoader = new THREE.JSONLoader();
// const OBJLoader = new THREE.OBJLoader();
// const BabylonLoader = new THREE.BabylonLoader();
const BufferGeometryLoader = new THREE.BufferGeometryLoader();
// const ColladaLoader = new THREE.ColladaLoader();
// const glTFLoader = new THREE.glTFLoader();
const ObjectLoader = new THREE.ObjectLoader();
// const PDBLoader = new THREE.PDBLoader();
// const SVGLoader = new THREE.SVGLoader();
// const TGALoader = new THREE.TGALoader();


// Other.
const TextureLoader = new THREE.TextureLoader();
const FontLoader = new THREE.FontLoader();
const XHRLoader = new THREE.XHRLoader();
const AudioLoader = new THREE.AudioLoader();
const ImageLoader = new THREE.ImageLoader();
const MaterialLoader = new THREE.MaterialLoader();
// const MTLLoader = new THREE.MTLLoader();

export {
  JSONLoader,
  // OBJLoader,
  // BabylonLoader,
  BufferGeometryLoader,
  // ColladaLoader,
  // glTFLoader,
  ObjectLoader,
  // PDBLoader,
  // SVGLoader,
  // TGALoader,
	TextureLoader,
	FontLoader,
	XHRLoader,
	AudioLoader,
	ImageLoader,
	MaterialLoader,
	// MTLLoader
};
