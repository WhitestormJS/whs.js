module.exports = {
  // Modules:App

  '@whs:app/element': 'whs/src/modules/app/ElementModule',
  '@whs:app/scene': 'whs/src/modules/app/SceneModule',
  '@whs:app/camera': 'whs/src/modules/app/CameraModule',
  '@whs:app/rendering': 'whs/src/modules/app/RenderingModule',

  // Modules:Controls

  '@whs:controls/orbit': 'whs/src/modules/controls/OrbitModule',
  '@whs:controls/firstperson': 'whs/src/modules/controls/FirstPersonModule',

  '@whs$': 'whs/src/index',
  '@three$': 'whs/src/three.js',
  '@whs/core$': 'whs/src/core/index',
  '@whs/core': 'whs/src/core',
  '@whs:app$': 'whs/src/modules/app/export',
  '@whs:app': 'whs/src/modules/app',
  '@whs:controls$': 'whs/src/modules/controls/export',
  '@whs:controls': 'whs/src/modules/controls',
  '@whs+meshes': 'whs/src/components/meshes',
  '@whs+lights': 'whs/src/components/lights',
};
