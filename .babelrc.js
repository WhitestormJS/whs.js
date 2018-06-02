module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      },
      useBuiltIns: 'usage'
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
