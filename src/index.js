import * as THREE from 'three';
import * as Physijs from './physics/index.js';

export * from './cameras/index';
export * from './core/index';
export * from './extensions/index';
export * from './extras/index';
export * from './lights/index';
export * from './meshes/index';
export * from './scenes/index';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
  window.Physijs = Physijs;
} else if (typeof global !== 'undefined') {
  global.THREE = THREE;
  global.Physijs = Physijs;
}
