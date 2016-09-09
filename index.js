/**
 * Entry Script
 */

// Babel polyfill to convert ES6 code in runtime
require('babel-register')
const runServer = require('./scripts/runServer').default;
if (process.env.NODE_ENV === 'production') {
  // process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
  // process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  const bunler = require('./scripts/bundle').default;
  bunler(runServer);
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./configs');
  const Browsersync = require('browser-sync');

  const compiler = webpack([webpackConfig.client, webpackConfig.server]);
  compiler.plugin('done', () => handleServerBundleComplete());

  const wpMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true, 
    //colors: true,
    publicPath: webpackConfig.client.output.publicPath
  });
  const hotMiddleware = webpackHotMiddleware(compiler.compilers[0]);

  let handleServerBundleComplete = () => {
    runServer((err, host) => {
      if (err) {
        console.log(err.stack);
        retrun;
      }

      const bs = Browsersync.create();
      bs.init({
        proxy: {
          target: host,
          middleware: [wpMiddleware, hotMiddleware],
        },

        // no need to watch '*.js' here, webpack will take care of it for us,
        // including full page reloads if HMR won't work
        files: ['dist/server.bundle.js'],
      });
      handleServerBundleComplete = runServer;
    });
  };
}