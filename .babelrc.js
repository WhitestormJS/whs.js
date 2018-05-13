module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          },
          modules: 'commonjs',
          useBuiltIns: false,
          debug: false
        }]
      ],
      "plugins": [
        "@babel/plugin-transform-modules-commonjs",
        "istanbul"
      ]
    }
  }
}
