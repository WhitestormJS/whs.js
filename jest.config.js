module.exports = {
  transform: {
    '.js$': './tools/jestPreprocess.js'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!postprocessing)/'
  ]
};
