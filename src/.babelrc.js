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
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', {
      legacy: true
    }]
  ]
}
