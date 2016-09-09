const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const StylePlugin = new ExtractTextPlugin('critical', 'style.css', { allChunks: true });

const autoprefixer = require('autoprefixer');

const webpack = require('webpack');

const AssetsPlugin = require('../modules/assets-webpack-plugin');
const config = require('./config');

const baseCfg = {
  devtool: 'source-map',

  entry: {
    main: [
      './client/index.js',
    ],
  },

  output: {
    path: config.distPath,
    filename: "[name].js",
    chunkFilename: '[name].chunk.js?[chunkhash]',
    publicPath: config.publicPath
  },
  
  externals: {
    "jquery": "jQuery"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: config.srcPath,
        loader: 'babel'
      },
      // {
      //   test:   /\.s?css$/,
      //   exclude: /shared\/routes/,
      //   loader: StylePlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
      // },
      {
        test:   /\.s?css$/,
        // include: /shared\/routes/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader!sass-loader'
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
    //   `${config.projectPath}/pageShare/style`,
    //   `${config.projectPath}/node_modules/bootstrap-sass/assets/stylesheets`
    // ]
  },

  postcss: function () {
    // return [autoprefixer({ browsers: ['> 5% in CN', 'IE 9'], outputStyle: 'expanded'})];
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'PLANTFORM': JSON.stringify('web'),
        'NODE_ENV': JSON.stringify('production'),
        'HOSTNAME': JSON.stringify('http://localhost:8080'),
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true
      }
    }),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      assetsRegex: /\.(jpe?g|png|gif|svg|swf)\??/,
      prettyPrint: true,
    }),
    // StylePlugin,
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',

    //   children: true,
    //   // (use all children of the chunk)

    //   async: true,
    //   // (create an async commons chunk)

    //   // minChunks: 3,
    //   // // (3 children must share the module before it's separated)
    // }),
  ]

}

module.exports =  baseCfg;