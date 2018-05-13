export const getTemplateData = ({devPhysics = false, devMode = false} = {devPhysics: false, devMode: false}) => ({
  scriptname: 'bundle.js',
  assets: '\'../../assets\'',
  devMode,

  physicsModule: devPhysics > 0
    ? `http://localhost:${devPhysics}/physics-module.js`
    : '../../assets/physics-module.js',

  ammojs: devPhysics > 0
    ? `'http://localhost:${devPhysics}/vendor/ammo.js'`
    : 'window.location.href + \'../../assets/ammo.js\''
});

export const examples = '../examples';
