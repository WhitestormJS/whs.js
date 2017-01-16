export const getTemplateData = ({devPhysics = false, devMode = false} = {devPhysics: false, devMode: false}) => ({
  scriptname: 'script.js',
  assets: '\'../../_assets\'',
  devMode,

  physicsModule: devPhysics ?
    `http://localhost:${devPhysics}/physics-module.js`
    : '../../../vendor/physics-module.js',

  ammojs: devPhysics ?
    `\'http://localhost:${devPhysics}/vendor/ammo.js\'`
    : '\`${window.location.href}../../../vendor/ammo.js\`'
})

export const framework = {
  src: './src',
  dest: './build'
};

export const examples = '../examples';
