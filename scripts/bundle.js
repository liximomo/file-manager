import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../configs';
import varConfig from '../configs/config';
import clearAssets from '../scripts/clearAssets';

clearAssets(path.join(varConfig.projectPath, 'assetsMap.json'));

const compiler = webpack([webpackConfig.client, webpackConfig.server]);

export default function bunlder(cb) {
  compiler.plugin('done', () => cb());

  compiler.run(function(err, stats) {
    if(err) {
      throw new Error(`webpack:build${err}`); 
    }

    const log = stats.toString({
      // colors: true
    });

    fs.writeFile(`${varConfig.projectPath}/bundleInfo.txt`, log, function(err) {
      return console.log('bundleInfo has writed to bundleInfo.txt');
    });
  });
}


