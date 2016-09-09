/**
 * 清除上次的编译输出文件
 */

const fs = require('fs');
const path = require('path');
const config = require('../configs/config');

function rmFile(filePath) {
  if (!filePath) {
    return;
  }

  const hashIndex = filePath.lastIndexOf('?');
  let pureFilePath = filePath;
  if (~hashIndex) {
    pureFilePath = filePath.substr(0, hashIndex);
  }
  let fullPath = path.join(config.projectPath, pureFilePath);
  try {
    fs.accessSync(fullPath, fs.F_OK);
    fs.unlinkSync(fullPath);
    console.log(`${pureFilePath} has deleted`);
  } catch (e) {
    if (e.errno !== -2) {
      throw e;
    }
  }
};

function clearAssets(assetsMap) {
  let data;
  try {
    data = require(assetsMap);
  } catch (e) {
    return;
  }

  const entries = data["entries"];
  const assets = data["assets"];

  // del js, css
  Object.keys(entries).forEach(key => {
    rmFile(entries[key]["js"]);
    rmFile(entries[key]["css"]);
  });

  // del assets
  assets.forEach(asset => rmFile(asset.path));

  console.log('assets has cleared.\n\n');

}

module.exports = clearAssets;

if (!module.parent) {
  clearAssets(path.join(config.projectPath, 'assetsMap.json'));
}