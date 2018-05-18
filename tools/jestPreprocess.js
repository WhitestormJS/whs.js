const babelConfig = require('../.babelrc').env.test;
module.exports = require('babel-jest').createTransformer(babelConfig);
