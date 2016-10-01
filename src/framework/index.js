import * as THREE from 'three';
import * as Physijs from './physics/index.js';

export * from './core/index';
export * from './components/lights/index';
export * from './components/cameras/index';
export * from './components/meshes/index';
export * from './extras/index';
export * from './utils/index';

// DEPRECATION
export * from './deprecation';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
  window.Physijs = Physijs;
} else if (typeof global !== 'undefined') {
  global.THREE = THREE;
  global.Physijs = Physijs;
}
