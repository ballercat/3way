var path = require('path');

var config = {
  context: path.join(__dirname, 'src'),
  entry: [
    '../main.js'
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  target: 'electron',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  }
};
module.exports = config;

