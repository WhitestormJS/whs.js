import * as THREE from 'three';

export * from './cameras/index';
export * from './core/index';
export * from './extensions/index';
export * from './extras/index';
export * from './lights/index';
export * from './meshes/index';
export * from './scenes/index';

if (window) {
  window.THREE = THREE;
}
