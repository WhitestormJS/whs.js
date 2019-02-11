module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions', 'safari >= 7']
      }
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true,
      helpers: true
    }],
    '@babel/plugin-proposal-class-properties'
  ]
}
