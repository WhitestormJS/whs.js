import {
  JSONLoader as JSONLoaderNative,
  BufferGeometryLoader as BufferGeometryLoaderNative,
  ObjectLoader as ObjectLoaderNative,
  TextureLoader as TextureLoaderNative,
  FontLoader as FontLoaderNative,
  XHRLoader as XHRLoaderNative,
  AudioLoader as AudioLoaderNative,
  ImageLoader as ImageLoaderNative,
  MaterialLoader as MaterialLoaderNative
} as from 'three';

// Models.
const JSONLoader = new JSONLoaderNative();
// const OBJLoader = new OBJLoaderNative();
// const BabylonLoader = new BabylonLoaderNative();
const BufferGeometryLoader = new BufferGeometryLoaderNative();
// const ColladaLoader = new ColladaLoaderNative();
// const glTFLoader = new glTFLoaderNative();
const ObjectLoader = new ObjectLoaderNative();
// const PDBLoader = new PDBLoaderNative();
// const SVGLoader = new SVGLoaderNative();
// const TGALoader = new TGALoaderNative();


// Other.
const TextureLoader = new TextureLoaderNative();
const FontLoader = new FontLoaderNative();
const XHRLoader = new XHRLoaderNative();
const AudioLoader = new AudioLoaderNative();
const ImageLoader = new ImageLoaderNative();
const MaterialLoader = new MaterialLoaderNative();
// const MTLLoader = new MTLLoaderNative();

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
