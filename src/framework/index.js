import * as THREE from 'three';
import * as Physijs from './physics/index.js';

export * from './cameras/index';
export * from './core/index';
export * from './extras/index';
export * from './lights/index';
export * from './meshes/index';

// UTILS
export * from './utils/Loop';
export * from './utils/List';

// DEPRECATION
export * from './deprecation';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
  window.Physijs = Physijs;
} else if (typeof global !== 'undefined') {
  global.THREE = THREE;
  global.Physijs = Physijs;
}
