module.exports = function(config){
  config.set({
    basePath: '../..',
    frameworks: ['benchmark'],
    reporters: ['benchmark'],
    files: [
      '/**/*.spec.js'
    ]
  })
}
