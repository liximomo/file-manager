const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const vendor = [
  'react',
  'react-dom',
  'react-router',
];

module.exports = {
  entry: {
    vendor: vendor
  },

  output: {
    path: config.distPath,
    filename: '[name].dll.js',
    library: '[name]'
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production'),
    //   }
    // }),
    new webpack.DllPlugin({
      context: config.projectPath,
      path: path.join(config.projectPath, '[name]-manifest.json'),
      name: '[name]'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false,
    //     //drop_console: true
    //   }
    // }),
  ]
}