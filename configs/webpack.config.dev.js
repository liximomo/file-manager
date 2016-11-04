const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('../modules/assets-webpack-plugin');
const config = require('./config');

const baseCfg = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    main: [
      // 'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      './client/index.js',
    ],
  },
  
  output: {
    path: config.distPath,
    filename: "[name].js",
    chunkFilename: '[name].chunk.js',
    publicPath: config.publicPath
  },
  
  module: {
    noParse: /libs\/.+\.min\..+/,
    loaders: [
      {
        test: /\.js?$/,
        include: config.srcPath,
        loader: 'babel'
      },
      {
        test:   /\.s?css$/,
        include: config.srcPath,
        loader: 'style-loader!css-loader?modules&localIdentName=[path][name]_[local]_[hash:base64:3]!postcss-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        include: config.srcPath,
        loader: `url?limit=10000&name=img/[name].[ext]`
      },    
    ]
  },

  resolve: config.resolve,

  sassLoader: {
    // includePaths: [
    //   config.modulePath,
    // ],
    //precision:2
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'PLANTFORM': JSON.stringify('web'),
        'NODE_ENV': JSON.stringify('development'),
        'HOSTNAME': JSON.stringify('http://localhost:8080'),
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    // boost build time
    new webpack.DllReferencePlugin({
      context: config.projectPath,
      manifest: require("../vendor-manifest.json"),
    }),
    // enable hot module replacement
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      assetsRegex: /\.(jpe?g|png|gif|svg|swf)$/,
      prettyPrint: true
    }),
  ]

}

module.exports =  baseCfg;