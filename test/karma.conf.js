module.exports = (config) => {
  config.set({
    basePath: '../',
    frameworks: ['benchmark'],
    browsers: ['Chrome'],
    reporters: ['benchmark'],
    files: [
      'test/**/*.spec.js'
    ],
    brosers: [
      'Chrome'
    ],
    autoWatch: false,
    singleRun: true
  });
};
