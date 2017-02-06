module.exports = {
  // Modules:App

  '@whs:app/element': 'whs/src/modules/app/ElementModule',
  '@whs:app/scene': 'whs/src/modules/app/SceneModule',
  '@whs:app/camera': 'whs/src/modules/app/CameraModule',
  '@whs:app/rendering': 'whs/src/modules/app/RenderingModule',

  // Modules:Mesh

  '@whs:mesh/texture': 'whs/src/modules/mesh/TextureModule',
  '@whs:mesh/dynamic': 'whs/src/modules/mesh/DynamicGeometryModule',

  // Modules:Controls

  '@whs:controls/orbit': 'whs/src/modules/controls/OrbitModule',

  // Presets

  '@whs:presets/basic': 'whs/src/modules/presets/app/basic',

  // Paths

  '@whs$': 'whs/src/index',
  '@three$': 'whs/src/three.js',

  '@whs/core$': 'whs/src/core/index',
  '@whs/core': 'whs/src/core',

  '@whs:app$': 'whs/src/modules/app/export',
  '@whs:app': 'whs/src/modules/app',

  '@whs:mesh$': 'whs/src/modules/mesh/export',
  '@whs:mesh': 'whs/src/modules/mesh',

  '@whs:controls$': 'whs/src/modules/controls/export',
  '@whs:controls': 'whs/src/modules/controls',

  '@whs:presets$': 'whs/src/modules/presets/index',
  '@whs:presets': 'whs/src/modules/presets',

  '@whs+meshes$': 'whs/src/components/meshes/index',
  '@whs+meshes': 'whs/src/components/meshes',

  '@whs+lights$': 'whs/src/components/lights/index',
  '@whs+lights': 'whs/src/components/lights',

  '@whs+cameras$': 'whs/src/components/cameras/index',
  '@whs+cameras': 'whs/src/components/cameras'
};
