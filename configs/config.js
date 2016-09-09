const path = require('path');

const projectPath = path.resolve(__dirname, '..');

const config = {
  projectPath,
  modulePath: `${projectPath}/modules`,
  distPath: `${projectPath}/dist`,
  publicPath: '/static/',
};

// 需要 webpakc 编译的目录
config.srcPath = [ 
  `${projectPath}/configs`,
  `${projectPath}/modules`,
  `${projectPath}/client`,
  `${projectPath}/server`,
]

config.resolve = {
  root: [
    // 模块路径 待定
    config.modulePath
  ],
  alias: {
    server: `${config.projectPath}/server`,
    client: `${config.projectPath}/client`,
    libs: config.libPath
  }
};

module.exports = config;