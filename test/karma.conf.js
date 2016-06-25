module.exports = (config) => {
  config.set({
    basePath: '../',

    frameworks: [
      'requirejs',
      'benchmark'
    ],

    browsers: ['Chrome'],
    reporters: ['benchmark'],

    files: [
      'test/test-main.js',
      {pattern: 'lib/index.js', included: false},
      // {pattern: 'build/whitestorm.js', included: true},
      {pattern: 'test/**/*.spec.js', included: false}
    ],

    logLevel: config.LOG_DEBUG,

    autoWatch: false,
    singleRun: true
  });
};
