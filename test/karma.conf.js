module.exports = function(config){
  config.set({
    basePath: '../',
    frameworks: ['benchmark'],
    reporters: ['benchmark'],
    files: [
      'test/**/*.spec.js'
    ],
    brosers: [
      'Chrome'
    ],
    autoWatch: false,
    singleRun: true
  })
}
