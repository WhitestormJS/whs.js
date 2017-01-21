import * as THREE from 'three';

export * from './core/index';
export * from './components/lights/index';
export * from './components/cameras/index';
export * from './components/meshes/index';
export * from './extras/index';
export * from './utils/index';
export * from './modules/app/index';
export * from './modules/presets/index';

// DEPRECATION
export * from './deprecation';

if (typeof window !== 'undefined') window.THREE = THREE;
else if (typeof global !== 'undefined') global.THREE = THREE;
