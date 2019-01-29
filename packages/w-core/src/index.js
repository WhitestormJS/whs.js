/**
 * Namespace containing all classes from all modules. Used as global in UMD pattern.
 * @namespace WHS
 * @example <caption>The use of WHS namespace.</caption>
 * new WHS.App() // core
 * new WHS.PerspectiveCamera() // components
 * new WHS.ResizeModule() // modules
 * WHS.extend() // utils
 */

import {REVISION} from 'three';

// Check for Three.js
const warnDeps = () => {
  throw new Error('WhitestormJS Framework requires Three.js https://threejs.org/');
};

try {
  if (!REVISION) warnDeps();
} catch (err) {
  warnDeps();
}

export * from './core/index';
export * from './components';
export * from './modules';
// export * from './components/cameras/index';
// export * from './components/meshes/index';
// export * from './utils/index';
// export * from './modules/index';

// DEPRECATION
// export * from './deprecation';
