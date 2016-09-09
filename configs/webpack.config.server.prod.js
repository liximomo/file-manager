const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExternalsPlugin = require('webpack-externals-plugin');
const config = require('./config');

module.exports = {

  entry: [
    './server/index.js',
  ],

  output: {
    path: config.distPath,
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: config.resolve,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test:   /\.s?css$/,
        // include: /shared\/routes/,
        loader: 'css-loader/locals?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        include: config.srcPath,
        loader: `url?emitFile=false&limit=10000&name=img/[name].[ext]`
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'PLANTFORM': JSON.stringify('node'),
      }
    }),
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(config.projectPath, './node_modules/'),
    }),
  ],
};