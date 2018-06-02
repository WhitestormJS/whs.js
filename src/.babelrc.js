module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': {
        browsers: ['last 2 versions', 'safari >= 7']
      },
      modules: false
    }]
  ],
  plugins: [
    '@babel/plugin-external-helpers',
    ['@babel/plugin-transform-runtime', {
      polyfill: false,
      regenerator: true
    }],
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', {
      legacy: true
    }]
  ]
}
